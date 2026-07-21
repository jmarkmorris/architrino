#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/JointAccelerationSnapshot.hpp"
#include "architrino/eom/JointEndpointCorrector.hpp"
#include "architrino/eom/MultiprecisionAcceleration.hpp"

#include <algorithm>
#include <array>
#include <charconv>
#include <chrono>
#include <cmath>
#include <cstddef>
#include <cstdlib>
#include <functional>
#include <limits>
#include <map>
#include <optional>
#include <set>
#include <stdexcept>
#include <string>
#include <tuple>
#include <utility>
#include <vector>

namespace architrino::eom {
namespace {

using SteadyClock = std::chrono::steady_clock;

std::uint64_t saturating_add(std::uint64_t left, std::uint64_t right) {
  if (right > std::numeric_limits<std::uint64_t>::max() - left) {
    return std::numeric_limits<std::uint64_t>::max();
  }
  return left + right;
}

std::uint64_t saturating_multiply(
    std::uint64_t left, std::uint64_t right) {
  if (left != 0U &&
      right > std::numeric_limits<std::uint64_t>::max() / left) {
    return std::numeric_limits<std::uint64_t>::max();
  }
  return left * right;
}

std::uint64_t estimate_coupled_working_set_bytes(
    const NativeCoupledEvolutionRequest& request) {
  // This estimate deliberately includes both retained token storage and the
  // largest dense pair workspace used by the selected grade. It is an
  // admission bound, not a process-resident-set measurement.
  std::uint64_t bytes = 64U * 1024U;
  std::uint64_t segment_count = 0U;
  std::uint64_t token_bytes = 0U;
  for (const auto& path : request.paths) {
    segment_count = saturating_add(
        segment_count, path.history.segments().size());
    token_bytes = saturating_add(
        token_bytes, path.path_id.size() + path.charge.size() + 128U);
    for (const auto& segment : path.history.segments()) {
      token_bytes = saturating_add(
          token_bytes,
          segment.t_start_token().size() + segment.t_end_token().size());
      for (const auto& token : segment.position_error_tokens()) {
        token_bytes = saturating_add(token_bytes, token.size());
      }
      for (const auto& token : segment.velocity_error_tokens()) {
        token_bytes = saturating_add(token_bytes, token.size());
      }
      for (const auto& axis : segment.coefficient_tokens()) {
        for (const auto& token : axis) {
          token_bytes = saturating_add(token_bytes, token.size());
        }
      }
    }
  }
  bytes = saturating_add(bytes, token_bytes);
  bytes = saturating_add(
      bytes, saturating_multiply(
                 segment_count,
                 static_cast<std::uint64_t>(sizeof(CubicHistorySegment)) +
                     256U));
  const std::uint64_t path_count = request.paths.size();
  bytes = saturating_add(bytes, saturating_multiply(path_count, 2048U));
  const std::uint64_t pair_count = saturating_multiply(
      path_count, path_count);
  const std::uint64_t pair_workspace = 1024U;
  bytes = saturating_add(
      bytes, saturating_multiply(pair_count, pair_workspace));
  return bytes;
}

double elapsed_seconds(const SteadyClock::time_point& start) {
  return std::chrono::duration<double>(SteadyClock::now() - start).count();
}

double upward_nonnegative_sum(double left, double right) {
  if (!(left >= 0.0) || !(right >= 0.0) || !std::isfinite(left) ||
      !std::isfinite(right)) {
    return std::numeric_limits<double>::infinity();
  }
  const double sum = left + right;
  if (!std::isfinite(sum)) {
    return std::numeric_limits<double>::infinity();
  }
  return std::nextafter(sum, std::numeric_limits<double>::infinity());
}

using SnapshotTotals = std::map<std::string, IntervalVector>;

struct SubstepAttempt {
  NativeCorrectedSubstepCertificate certificate;
  std::optional<std::vector<NativePublishedPath>> histories;
  std::optional<std::map<std::string, JointAffineRetainedHistory>>
      joint_histories;
};

void accumulate_substep_snapshot_timing(
    NativeCorrectedSubstepTiming& total,
    const NativeAccelerationSnapshotCertificate& snapshot) {
  ++total.snapshot_count;
  total.snapshot_total_wall_seconds += snapshot.timing.total_wall_seconds;
  total.history_window_wall_seconds +=
      snapshot.timing.history_window_wall_seconds;
  total.traversal_wall_seconds += snapshot.timing.traversal_wall_seconds;
  total.exact_root_batch_wall_seconds +=
      snapshot.timing.exact_root_batch_wall_seconds;
  total.root_binary64_cpu_seconds +=
      snapshot.timing.root_binary64_cpu_seconds;
  total.root_pair_count += snapshot.timing.root_pair_count;
  total.root_reevaluated_cells += snapshot.timing.root_reevaluated_cells;
  total.root_warm_excluded_cells += snapshot.timing.root_warm_excluded_cells;
  total.root_mpfr_cpu_seconds += snapshot.timing.root_mpfr_cpu_seconds;
  total.root_mpfr_pair_count += snapshot.timing.root_mpfr_pair_count;
  total.root_mpfr_attempt_count += snapshot.timing.root_mpfr_attempt_count;
  total.root_mpfr_escalation_cpu_seconds +=
      snapshot.timing.root_mpfr_escalation_cpu_seconds;
  total.root_mpfr_escalation_attempt_count +=
      snapshot.timing.root_mpfr_escalation_attempt_count;
  total.acceleration_wall_seconds += snapshot.timing.acceleration_wall_seconds;
  total.finite_width_execution_union_wall_seconds +=
      snapshot.timing.finite_width_execution_union_wall_seconds;
  total.sharp_execution_union_wall_seconds +=
      snapshot.timing.sharp_execution_union_wall_seconds;
  total.finite_width_sharp_overlap_wall_seconds +=
      snapshot.timing.finite_width_sharp_overlap_wall_seconds;
  total.acceleration_worker_idle_orchestration_wall_seconds +=
      snapshot.timing.acceleration_worker_idle_orchestration_wall_seconds;
  total.acceleration_precision_escalation_worker_seconds +=
      snapshot.timing.acceleration_precision_escalation_worker_seconds;
  total.acceleration_precision_escalation_attempt_count +=
      snapshot.timing.acceleration_precision_escalation_attempt_count;
}

const NativePairAccelerationCertificate& snapshot_pair(
    const NativeAccelerationSnapshotCertificate& snapshot,
    const std::string& receiver,
    const std::string& source);
const NativeSnapshotRootRow* snapshot_root_row(
    const NativeAccelerationSnapshotCertificate& snapshot,
    const std::string& receiver,
    const std::string& source);

std::array<Interval, 4> coefficient_intervals(
    const std::array<std::string, 4>& tokens);
Interval evaluate_cubic(
    const std::array<Interval, 4>& coefficients,
    const Interval& local_time);
Interval evaluate_cubic_velocity(
    const std::array<Interval, 4>& coefficients,
    const Interval& local_time);

const char* integration_method(
    const NativeCoupledEvolutionRequest& request) {
  if (request.use_synchronized_multirate_publication) {
    return kNativeMultirateIntegrationMethod;
  }
  return request.use_pinned_fold_aware_temporal_step
      ? kNativeIntegrationMethod
      : kLegacyNativeIntegrationMethod;
}

double scalar_token(const std::string& token) {
  return Interval::decimal_token(token).midpoint();
}

double absolute_time_rounding_envelope(double start, double end) {
  const double scale = std::max({1.0, std::abs(start), std::abs(end)});
  return 8.0 * std::numeric_limits<double>::epsilon() * scale;
}

double exact_decimal_value(const std::string& token) {
  double value = 0.0;
  const auto result = std::from_chars(
      token.data(), token.data() + token.size(), value,
      std::chars_format::general);
  if (result.ec != std::errc{} || result.ptr != token.data() + token.size() ||
      !std::isfinite(value)) {
    throw std::invalid_argument("invalid finite decimal token: " + token);
  }
  return value;
}

std::string decimal_token(double value) {
  if (!std::isfinite(value)) {
    throw std::invalid_argument("coupled evolution requires finite numeric values");
  }
  std::array<char, 64> buffer{};
  const auto result = std::to_chars(
      buffer.data(), buffer.data() + buffer.size(), value,
      std::chars_format::general, std::numeric_limits<double>::max_digits10);
  if (result.ec != std::errc{}) {
    throw std::runtime_error("failed to serialize coupled evolution decimal");
  }
  return std::string(buffer.data(), result.ptr);
}

std::string shortest_decimal_token(double value) {
  if (!std::isfinite(value)) {
    throw std::invalid_argument("regulator refinement requires finite values");
  }
  std::array<char, 64> buffer{};
  const auto result = std::to_chars(
      buffer.data(), buffer.data() + buffer.size(), value,
      std::chars_format::general);
  if (result.ec != std::errc{}) {
    throw std::runtime_error("failed to serialize regulator refinement");
  }
  return std::string(buffer.data(), result.ptr);
}

double downward_nonnegative_product(double left, double right) {
  const double product = left * right;
  if (!(product > 0.0)) {
    return product;
  }
  return std::nextafter(product, 0.0);
}

double downward_nonnegative_quotient(double numerator, std::size_t divisor) {
  const double quotient = numerator / static_cast<double>(divisor);
  if (divisor == 1U || !(quotient > 0.0)) {
    return quotient;
  }
  return std::nextafter(quotient, 0.0);
}

std::string error_token(double value) {
  if (value == 0.0) {
    return "0";
  }
  return decimal_token(std::max(value, std::numeric_limits<double>::min()));
}

double tolerance_value(const std::string& token, const char* label) {
  const Interval value = Interval::decimal_token(token);
  if (value.lower() <= 0.0) {
    throw std::invalid_argument(std::string(label) + " must be positive");
  }
  return value.lower();
}

bool numeric_equal(const std::string& left, const std::string& right) {
  return scalar_token(left) == scalar_token(right);
}

const NativePublishedPath& path_history(
    const std::vector<NativePublishedPath>& histories,
    const std::string& path_id) {
  const auto found = std::find_if(
      histories.begin(), histories.end(), [&](const auto& item) {
        return item.path_id == path_id;
      });
  if (found == histories.end()) {
    throw std::invalid_argument("coupled history path identity is missing");
  }
  return *found;
}

const std::string& path_charge(
    const NativeCoupledEvolutionRequest& request,
    const std::string& path_id) {
  const auto found = std::find_if(
      request.paths.begin(), request.paths.end(), [&](const auto& item) {
        return item.path_id == path_id;
      });
  if (found == request.paths.end()) {
    throw std::invalid_argument("coupled charge path identity is missing");
  }
  return found->charge;
}

NativeCoupledEvolutionRequest receiver_pair_budget_request(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<std::pair<std::string, std::string>>& pairs,
    const std::string& receiver_id) {
  if (request.certified_budget_schema.empty()) {
    return request;
  }
  const std::size_t receiver_pair_count = static_cast<std::size_t>(
      std::count_if(pairs.begin(), pairs.end(), [&](const auto& pair) {
        return pair.first == receiver_id;
      }));
  if (receiver_pair_count == 0U) {
    throw std::invalid_argument(
        "receiver event allocation requires at least one routed pair");
  }
  auto pair_request = request;
  const double impulse_total = downward_nonnegative_quotient(
      tolerance_value(request.event_impulse_budget, "event impulse budget"),
      receiver_pair_count);
  const double moment_total = downward_nonnegative_quotient(
      tolerance_value(
          request.event_position_moment_budget,
          "event position-moment budget"),
      receiver_pair_count);
  const double quadrature_fraction = exact_decimal_value(
      request.event_quadrature_fraction);
  const double regulator_fraction = std::min(
      exact_decimal_value(request.event_causal_regulator_fraction),
      exact_decimal_value(request.event_core_regulator_fraction));
  pair_request.event_impulse_budget = shortest_decimal_token(impulse_total);
  pair_request.event_position_moment_budget =
      shortest_decimal_token(moment_total);
  pair_request.resolved_receiver_event_pair_count = receiver_pair_count;
  pair_request.resolved_receiver_event_pair_weight = shortest_decimal_token(
      1.0 / static_cast<double>(receiver_pair_count));
  pair_request.event_impulse_tolerance = shortest_decimal_token(
      downward_nonnegative_product(impulse_total, quadrature_fraction));
  pair_request.event_position_moment_tolerance = shortest_decimal_token(
      downward_nonnegative_product(moment_total, quadrature_fraction));
  pair_request.regulator_convergence_tolerance = shortest_decimal_token(
      downward_nonnegative_product(
          std::min(impulse_total, moment_total), regulator_fraction));
  return pair_request;
}

std::vector<std::string> path_ids(
    const NativeCoupledEvolutionRequest& request) {
  std::vector<std::string> result;
  result.reserve(request.paths.size());
  for (const auto& path : request.paths) {
    result.push_back(path.path_id);
  }
  return result;
}

std::vector<NativeHistoryFingerprint> fingerprints(
    const std::vector<NativePublishedPath>& histories) {
  std::vector<NativeHistoryFingerprint> result;
  result.reserve(histories.size());
  for (const auto& path : histories) {
    result.push_back({path.path_id, path.history.provenance_fingerprint()});
  }
  return result;
}

bool same_fingerprints(
    const std::vector<NativeHistoryFingerprint>& left,
    const std::vector<NativeHistoryFingerprint>& right) {
  if (left.size() != right.size()) {
    return false;
  }
  for (std::size_t index = 0; index < left.size(); ++index) {
    if (left[index].path_id != right[index].path_id ||
        left[index].fingerprint != right[index].fingerprint) {
      return false;
    }
  }
  return true;
}

std::array<double, 3> midpoints(const IntervalVector& vector) {
  return {vector[0].midpoint(), vector[1].midpoint(), vector[2].midpoint()};
}

std::array<double, 3> component_radii(const IntervalVector& vector) {
  return {
      vector[0].width() * 0.5,
      vector[1].width() * 0.5,
      vector[2].width() * 0.5,
  };
}

SnapshotTotals snapshot_totals(
    const NativeAccelerationSnapshotCertificate& snapshot) {
  SnapshotTotals result;
  for (const auto& total : snapshot.acceleration.receiver_totals) {
    result.emplace(total.receiver_path_id, total.acceleration);
  }
  return result;
}

struct JointAccelerationAffineState {
  std::array<double, 3> center{};
  std::vector<std::array<double, 3>> coefficients;
  std::array<double, 3> remainder_radii{};
};

using JointAccelerationAffineStates =
    std::map<std::string, JointAccelerationAffineState>;

double interval_radius_upper(const Interval& value) {
  return std::max(std::abs(value.lower()), std::abs(value.upper()));
}

double outward_radius_sum(const std::vector<double>& terms) {
  Interval result = Interval::point(0.0);
  bool initialized = false;
  for (const double term : terms) {
    if (!(term >= 0.0) || !std::isfinite(term)) {
      throw std::invalid_argument(
          "joint affine radius term must be finite and nonnegative");
    }
    if (term == 0.0) continue;
    result = initialized
        ? result + Interval::point(term)
        : Interval::point(term);
    initialized = true;
  }
  return initialized ? result.upper() : 0.0;
}

JointAccelerationAffineStates joint_acceleration_states(
    const JointAccelerationSnapshotCertificate& snapshot) {
  if (!snapshot.certified) {
    throw std::invalid_argument(
        "joint acceleration states require a certified snapshot");
  }
  JointAccelerationAffineStates result;
  for (const auto& receiver : snapshot.receivers) {
    JointAccelerationAffineState state{
        .center = receiver.center,
        .coefficients = receiver.shared_symbol_coefficients,
        .remainder_radii = receiver.independent_remainder_radii,
    };
    for (std::size_t symbol = 0U;
         symbol < receiver.shared_symbol_coefficients.size(); ++symbol) {
      for (std::size_t axis = 0U; axis < 3U; ++axis) {
        state.remainder_radii[axis] = outward_radius_sum({
            state.remainder_radii[axis],
            interval_radius_upper(
                receiver.shared_symbol_coefficient_enclosures[symbol][axis] -
                Interval::point(
                    receiver.shared_symbol_coefficients[symbol][axis])),
        });
      }
    }
    result.emplace(receiver.path_id, std::move(state));
  }
  return result;
}

std::map<std::string, JointAffineRetainedHistory>
append_joint_candidate_segments(
    const std::vector<NativePublishedPath>& ordinary_histories,
    const std::map<std::string, JointAffineRetainedHistory>& joint_histories,
    const std::string& start_time,
    const std::string& end_time,
    const JointAccelerationAffineStates& start_acceleration,
    const JointAccelerationAffineStates& end_acceleration,
    const std::set<std::string>& right_endpoint_acceleration_paths) {
  const double start = scalar_token(start_time);
  const double end = scalar_token(end_time);
  const double step = end - start;
  if (!(step > 0.0) || joint_histories.size() != ordinary_histories.size()) {
    throw std::invalid_argument(
        "joint candidate segment domain is invalid");
  }
  std::map<std::string, JointAffineRetainedHistory> result;
  for (const auto& ordinary : ordinary_histories) {
    const auto joint_found = joint_histories.find(ordinary.path_id);
    const auto start_found = start_acceleration.find(ordinary.path_id);
    const auto end_found = end_acceleration.find(ordinary.path_id);
    if (joint_found == joint_histories.end() ||
        start_found == start_acceleration.end() ||
        end_found == end_acceleration.end()) {
      throw std::invalid_argument(
          "joint candidate segment lacks a path state");
    }
    const std::size_t symbol_count =
        joint_found->second.symbol_registry().size();
    if (start_found->second.coefficients.size() != symbol_count ||
        end_found->second.coefficients.size() != symbol_count) {
      throw std::invalid_argument(
          "joint candidate acceleration registry is not aligned");
    }
    const Interval start_point = Interval::point(start);
    const auto position_box =
        ordinary.history.correlated_position_hull(start_point);
    const auto velocity_box = ordinary.history.velocity_hull(start_point);
    const auto initial = joint_found->second.evaluate(
        start, component_radii(position_box), component_radii(velocity_box));
    if (!initial.position_fallback_dominates ||
        !initial.velocity_fallback_dominates) {
      throw std::invalid_argument(
          "joint candidate initial state exceeds ordinary fallback");
    }
    JointAffineCubicSegment segment;
    segment.start_time = start;
    segment.end_time = end;
    const bool right_endpoint =
        right_endpoint_acceleration_paths.contains(ordinary.path_id);
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      for (std::size_t degree = 0U; degree < 4U; ++degree) {
        segment.position_coefficients[axis][degree].assign(
            symbol_count, 0.0);
      }
      for (std::size_t symbol = 0U; symbol < symbol_count; ++symbol) {
        const double acceleration_start = right_endpoint
            ? end_found->second.coefficients[symbol][axis]
            : start_found->second.coefficients[symbol][axis];
        const double acceleration_end =
            end_found->second.coefficients[symbol][axis];
        segment.position_coefficients[axis][0U][symbol] =
            initial.position.shared_symbol_coefficients[symbol][axis];
        segment.position_coefficients[axis][1U][symbol] =
            initial.velocity_shared_coefficients[symbol][axis];
        segment.position_coefficients[axis][2U][symbol] =
            0.5 * acceleration_start;
        segment.position_coefficients[axis][3U][symbol] =
            (acceleration_end - acceleration_start) / (6.0 * step);
      }
      const double acceleration_start_remainder = right_endpoint
          ? end_found->second.remainder_radii[axis]
          : start_found->second.remainder_radii[axis];
      const double acceleration_end_remainder =
          end_found->second.remainder_radii[axis];
      if (right_endpoint) {
        segment.position_remainder_radii[axis] = outward_radius_sum({
            initial.position.independent_remainder_radii[axis],
            step * initial.velocity_remainder_radii[axis],
            0.5 * step * step * acceleration_end_remainder,
        });
        segment.velocity_remainder_radii[axis] = outward_radius_sum({
            initial.velocity_remainder_radii[axis],
            step * acceleration_end_remainder,
        });
      } else {
        segment.position_remainder_radii[axis] = outward_radius_sum({
            initial.position.independent_remainder_radii[axis],
            step * initial.velocity_remainder_radii[axis],
            (step * step / 3.0) * acceleration_start_remainder,
            (step * step / 6.0) * acceleration_end_remainder,
        });
        segment.velocity_remainder_radii[axis] = outward_radius_sum({
            initial.velocity_remainder_radii[axis],
            0.5 * step * acceleration_start_remainder,
            0.5 * step * acceleration_end_remainder,
        });
      }
    }
    result.emplace(
        ordinary.path_id,
        joint_found->second.appended(std::move(segment)));
  }
  return result;
}

struct JointEndpointContraction {
  bool certified = false;
  std::string failure_code;
  std::map<std::string, JointAffineRetainedHistory> histories;
};

JointEndpointContraction contract_joint_endpoint(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& input_ordinary_histories,
    const std::vector<NativePublishedPath>& candidate_ordinary_histories,
    const std::string& start_time,
    const std::string& end_time,
    const NativeAccelerationSnapshotCertificate& endpoint_snapshot,
    const JointAccelerationAffineStates& start_acceleration,
    const JointAccelerationAffineStates& endpoint_acceleration,
    const SnapshotTotals& endpoint_centers,
    const std::set<std::string>& right_endpoint_acceleration_paths) {
  JointEndpointContraction result;
  if (request.joint_histories.empty()) {
    result.certified = true;
    return result;
  }
  auto endpoint_without_remainder = endpoint_acceleration;
  for (auto& [path_id, state] : endpoint_without_remainder) {
    static_cast<void>(path_id);
    state.remainder_radii = {0.0, 0.0, 0.0};
  }
  const auto base_histories = append_joint_candidate_segments(
      input_ordinary_histories, request.joint_histories,
      start_time, end_time, start_acceleration, endpoint_without_remainder,
      right_endpoint_acceleration_paths);
  const auto ids = path_ids(request);
  const std::size_t dimension = 3U * ids.size();
  const std::size_t retained_symbol_count =
      request.joint_histories.begin()->second.symbol_registry().size();
  std::vector<double> radii(dimension, 0.0);
  std::vector<std::string> corrector_symbols;
  corrector_symbols.reserve(dimension);
  for (std::size_t path = 0U; path < ids.size(); ++path) {
    const auto center_found = endpoint_centers.find(ids[path]);
    if (center_found == endpoint_centers.end()) {
      throw std::invalid_argument(
          "joint endpoint contraction lacks an endpoint center");
    }
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      const std::size_t index = 3U * path + axis;
      const double endpoint_center =
          center_found->second[axis].midpoint();
      const double endpoint_radius = interval_radius_upper(
          center_found->second[axis] -
          Interval::point(endpoint_center));
      radii[index] = std::max(
          std::numeric_limits<double>::denorm_min(),
          outward_radius_sum({
              endpoint_radius,
              joint_acceleration_representation_rounding_envelope(
                  center_found->second[axis], ids.size() - 1U),
          }));
      corrector_symbols.push_back(
          "endpoint-corrector/" + end_time + "/" + ids[path] + "/" +
          std::to_string(axis));
    }
  }

  std::map<std::string, JointAffineRetainedHistory> extended_histories;
  const double step = scalar_token(end_time) - scalar_token(start_time);
  for (std::size_t path = 0U; path < ids.size(); ++path) {
    auto expanded = base_histories.at(ids[path]).with_appended_symbols(
        corrector_symbols);
    auto segments = expanded.segments();
    auto& segment = segments.back();
    const bool right_endpoint =
        right_endpoint_acceleration_paths.contains(ids[path]);
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      const std::size_t column = 3U * path + axis;
      const std::size_t symbol = retained_symbol_count + column;
      if (right_endpoint) {
        segment.position_coefficients[axis][2U][symbol] =
            0.5 * radii[column];
      } else {
        segment.position_coefficients[axis][3U][symbol] =
            radii[column] / (6.0 * step);
      }
    }
    extended_histories.emplace(
        ids[path], JointAffineRetainedHistory(
            ids[path], expanded.symbol_registry(), std::move(segments)));
  }
  const auto evaluated = certify_joint_acceleration_snapshot(
      Interval::decimal_token(request.field_speed), endpoint_snapshot,
      candidate_ordinary_histories, extended_histories);
  if (!evaluated.certified) {
    result.failure_code = evaluated.failure_code + "/ratio=" +
        (std::isfinite(
             evaluated.failure_max_projection_to_ordinary_ratio)
             ? decimal_token(
                   evaluated.failure_max_projection_to_ordinary_ratio)
             : "infinite") +
        "/projection=" +
        decimal_token(evaluated.failure_projection_upper) +
        "/ordinary=" +
        decimal_token(evaluated.failure_ordinary_radius) +
        "/state=" + evaluated.failure_state;
    return result;
  }
  std::map<std::string, std::array<double, 3>> centers;
  std::map<std::string, std::vector<std::array<double, 3>>> coefficients;
  for (const auto& id : ids) {
    centers.emplace(id, midpoints(endpoint_centers.at(id)));
    coefficients.emplace(id, endpoint_acceleration.at(id).coefficients);
  }
  const auto corrector = certify_joint_endpoint_corrector({
      .path_ids = ids,
      .endpoint_centers = std::move(centers),
      .endpoint_shared_coefficients = std::move(coefficients),
      .evaluated_snapshot = evaluated,
      .retained_symbol_count = retained_symbol_count,
      .corrector_variable_radii = radii,
  });
  if (!corrector.certified) {
    double minimum_radius = std::numeric_limits<double>::infinity();
    double maximum_radius = 0.0;
    double maximum_image_radius = 0.0;
    double maximum_residual_radius = 0.0;
    std::size_t minimum_margin_index = 0U;
    for (const double radius : radii) {
      minimum_radius = std::min(minimum_radius, radius);
      maximum_radius = std::max(maximum_radius, radius);
    }
    for (std::size_t index = 0U;
         index < corrector.krawczyk.image.size(); ++index) {
      const auto& image = corrector.krawczyk.image[index];
      maximum_image_radius = std::max(
          maximum_image_radius, interval_radius_upper(image));
      const double margin = std::min(
          corrector.krawczyk.lower_containment_margins[index],
          corrector.krawczyk.upper_containment_margins[index]);
      const double current_margin = std::min(
          corrector.krawczyk.lower_containment_margins[
              minimum_margin_index],
          corrector.krawczyk.upper_containment_margins[
              minimum_margin_index]);
      if (margin < current_margin) minimum_margin_index = index;
    }
    for (const auto& residual : corrector.parametric_residual_at_center) {
      maximum_residual_radius = std::max(
          maximum_residual_radius, interval_radius_upper(residual));
    }
    result.failure_code = corrector.failure_code +
        "/minimum_radius=" + decimal_token(minimum_radius) +
        "/maximum_radius=" + decimal_token(maximum_radius) +
        "/maximum_image=" + decimal_token(maximum_image_radius) +
        "/maximum_residual=" + decimal_token(maximum_residual_radius) +
        "/minimum_margin=" +
        decimal_token(corrector.krawczyk.minimum_containment_margin) +
        "/minimum_margin_path=" + ids[minimum_margin_index / 3U] +
        "/minimum_margin_axis=" +
        std::to_string(minimum_margin_index % 3U) +
        "/minimum_margin_radius=" +
        decimal_token(radii[minimum_margin_index]) +
        "/minimum_margin_image=" +
        decimal_token(
            corrector.krawczyk.image[minimum_margin_index].lower()) +
        "," + decimal_token(
            corrector.krawczyk.image[minimum_margin_index].upper()) +
        "/minimum_margin_residual=" +
        decimal_token(
            corrector.parametric_residual_at_center[
                minimum_margin_index].lower()) +
        "," + decimal_token(
            corrector.parametric_residual_at_center[
                minimum_margin_index].upper());
    return result;
  }
  auto contracted_endpoint = endpoint_acceleration;
  for (const auto& id : ids) {
    contracted_endpoint.at(id).remainder_radii =
        corrector.endpoint_remainder_radii.at(id);
  }
  result.histories = append_joint_candidate_segments(
      input_ordinary_histories, request.joint_histories,
      start_time, end_time, start_acceleration, contracted_endpoint,
      right_endpoint_acceleration_paths);
  result.certified = true;
  return result;
}

double acceleration_correction_error(
    const SnapshotTotals& guess,
    const SnapshotTotals& evaluated) {
  if (guess.size() != evaluated.size()) {
    throw std::invalid_argument("acceleration correction path domain mismatch");
  }
  double result = 0.0;
  for (const auto& [path_id, guess_vector] : guess) {
    const auto found = evaluated.find(path_id);
    if (found == evaluated.end()) {
      throw std::invalid_argument("acceleration correction path is missing");
    }
    for (std::size_t axis = 0; axis < 3; ++axis) {
      result = std::max(
          result,
          std::abs(guess_vector[axis].midpoint() -
                   found->second[axis].midpoint()));
    }
  }
  return result;
}

double acceleration_enclosure_error(
    const SnapshotTotals& corrected,
    const SnapshotTotals& recertified) {
  if (corrected.size() != recertified.size()) {
    throw std::invalid_argument(
        "acceleration enclosure path domain mismatch");
  }
  double result = 0.0;
  for (const auto& [path_id, corrected_vector] : corrected) {
    const auto found = recertified.find(path_id);
    if (found == recertified.end()) {
      throw std::invalid_argument("acceleration enclosure path is missing");
    }
    for (std::size_t axis = 0; axis < 3; ++axis) {
      const double corrected_midpoint = corrected_vector[axis].midpoint();
      const Interval& enclosure = found->second[axis];
      result = std::max(
          result,
          std::max(
              {0.0, enclosure.lower() - corrected_midpoint,
               corrected_midpoint - enclosure.upper()}));
    }
  }
  return result;
}

bool step_has_growth_headroom(
    const NativeCoupledEvolutionRequest& request,
    const NativeAtomicStepCertificate& step) {
  constexpr double kGrowthBudgetFraction = 0.125;
  const double position_limit = kGrowthBudgetFraction * tolerance_value(
      request.position_tolerance, "position tolerance");
  const double velocity_limit = kGrowthBudgetFraction * tolerance_value(
      request.velocity_tolerance, "velocity tolerance");
  return std::all_of(
      step.local_errors.begin(), step.local_errors.end(),
      [&](const auto& error) {
        return error.position_error <= position_limit &&
            error.velocity_error <= velocity_limit;
      });
}

double step_error_ratio(
    const NativeCoupledEvolutionRequest& request,
    const NativeAtomicStepCertificate& step) {
  const double position_tolerance = tolerance_value(
      request.position_tolerance, "position tolerance");
  const double velocity_tolerance = tolerance_value(
      request.velocity_tolerance, "velocity tolerance");
  double ratio = 0.0;
  for (const auto& error : step.local_errors) {
    ratio = std::max(
        ratio,
        std::max(
            error.position_error / position_tolerance,
            error.velocity_error / velocity_tolerance));
  }
  return ratio;
}

double accepted_root_time_pressure_ratio(
    const NativeCoupledEvolutionRequest& request,
    const NativeAtomicStepCertificate& step) {
  if (!step.accepted_snapshot.has_value()) return 0.0;
  const double tolerance = tolerance_value(
      request.root_tolerance, "root-time tolerance");
  const double reception = scalar_token(
      step.accepted_snapshot->reception_time);
  double result = 0.0;
  for (const auto& pair :
       step.accepted_snapshot->acceleration.pair_certificates) {
    for (const auto& row : pair.rows) {
      if (row.chart != "sharp_root" ||
          !row.transmitter_factor.has_value()) {
        continue;
      }
      const double emission = row.evaluation_emission.has_value()
          ? row.evaluation_emission->midpoint()
          : 0.5 * (
                scalar_token(row.emission_lower) +
                scalar_token(row.emission_upper));
      const auto& receiver = path_history(
          step.published_histories, row.receiver_path_id).history;
      const auto& transmitter = path_history(
          step.published_histories, row.transmitter_path_id).history;
      if (!receiver.covers(Interval::point(reception)) ||
          !transmitter.covers(Interval::point(emission))) {
        continue;
      }
      const auto receiver_center = receiver.nominal_position(reception);
      const auto transmitter_center = transmitter.nominal_position(emission);
      const auto receiver_box = receiver.position_hull(
          Interval::point(reception));
      const auto transmitter_box = transmitter.position_hull(
          Interval::point(emission));
      std::array<double, 3> displacement{};
      std::array<double, 3> remainder{};
      for (std::size_t axis = 0U; axis < 3U; ++axis) {
        displacement[axis] =
            receiver_center[axis] - transmitter_center[axis];
        const double receiver_radius = std::max(
            receiver_center[axis] - receiver_box[axis].lower(),
            receiver_box[axis].upper() - receiver_center[axis]);
        const double transmitter_radius = std::max(
            transmitter_center[axis] - transmitter_box[axis].lower(),
            transmitter_box[axis].upper() - transmitter_center[axis]);
        remainder[axis] = outward_radius_sum({
            std::max(0.0, receiver_radius),
            std::max(0.0, transmitter_radius),
        });
      }
      const auto budget = certify_root_time_budget({
          .nominal_displacement = displacement,
          .shared_symbol_coefficients = {},
          .independent_remainder_radii = remainder,
          .transmitter_factor = *row.transmitter_factor,
          .root_time_tolerance = tolerance,
      });
      result = std::max(
          result, budget.root_time_width_upper / tolerance);
    }
  }
  return result;
}

double root_pressure_step_scale(double ratio) {
  if (ratio > 0.3) return 0.125;
  if (ratio > 0.2) return 0.25;
  if (ratio > 0.1) return 0.5;
  return 1.0;
}

double continuous_step_scale(
    const NativeCoupledEvolutionRequest& request,
    const NativeAtomicStepCertificate& step,
    bool accepted) {
  const double safety = exact_decimal_value(
      request.adaptive_step_safety_factor);
  const double requested_minimum = exact_decimal_value(
      request.adaptive_step_minimum_scale);
  const double requested_maximum = exact_decimal_value(
      request.adaptive_step_maximum_scale);
  const double minimum_scale = accepted
      ? requested_minimum
      : std::min(requested_minimum, 0.5);
  const double maximum_scale = accepted
      ? requested_maximum
      : 0.5;
  const double ratio = step_error_ratio(request, step);
  if (!(ratio > 0.0)) {
    return maximum_scale;
  }
  // The legacy 1/8 growth gate encodes the observed h^3 step-doubling
  // local-error law: doubling is allowed only when eight times the current
  // error remains inside the unchanged acceptance budget.
  const double proposed = safety * std::pow(1.0 / ratio, 1.0 / 3.0);
  return std::clamp(proposed, minimum_scale, maximum_scale);
}

double correction_retry_scale(
    const NativeCoupledEvolutionRequest& request,
    const NativeAtomicStepCertificate& step) {
  constexpr double kOrdinaryRetryScale = 0.5;
  if (step.failure_code != "coupled_correction_failed" ||
      !step.correction_residual.has_value()) {
    return kOrdinaryRetryScale;
  }
  const double residual = *step.correction_residual;
  const double tolerance = tolerance_value(
      request.correction_tolerance, "correction tolerance");
  if (!std::isfinite(residual) || !(residual > tolerance)) {
    return kOrdinaryRetryScale;
  }
  const double safety = exact_decimal_value(
      request.adaptive_step_safety_factor);
  const double proposed = safety * std::sqrt(tolerance / residual);
  if (!std::isfinite(proposed) || !(proposed > 0.0)) {
    return kOrdinaryRetryScale;
  }
  return std::min(kOrdinaryRetryScale, proposed);
}

std::vector<std::pair<std::string, std::string>> changed_topology_pairs(
    const NativeAccelerationSnapshotCertificate& start,
    const NativeAccelerationSnapshotCertificate& end) {
  std::set<std::pair<std::string, std::string>> enclosed_pairs;
  for (const auto* snapshot : {&start, &end}) {
    for (const auto& row : snapshot->root_certificates) {
      if (row.certificate.schema == "eom_native_enclosed_pair_marker/v1") {
        enclosed_pairs.emplace(row.receiver_path_id, row.transmitter_path_id);
      }
    }
  }
  std::map<std::pair<std::string, std::string>, std::vector<int>> start_rows;
  for (const auto& row : start.root_certificates) {
    const auto key =
        std::make_pair(row.receiver_path_id, row.transmitter_path_id);
    if (enclosed_pairs.contains(key)) {
      continue;
    }
    std::vector<int> signs;
    for (const auto& root : row.certificate.roots) {
      signs.push_back(root.transmitter_factor_sign);
    }
    start_rows[key] = std::move(signs);
  }
  std::vector<std::pair<std::string, std::string>> changed;
  for (const auto& row : end.root_certificates) {
    std::vector<int> signs;
    for (const auto& root : row.certificate.roots) {
      signs.push_back(root.transmitter_factor_sign);
    }
    const auto key = std::make_pair(
        row.receiver_path_id, row.transmitter_path_id);
    if (enclosed_pairs.contains(key)) {
      continue;
    }
    const auto found = start_rows.find(key);
    if (found == start_rows.end() || found->second != signs) {
      changed.push_back(key);
    }
  }
  return changed;
}

bool snapshot_evaluation_succeeded(
    const NativeCoupledEvolutionRequest&,
    const NativeAccelerationSnapshotCertificate& snapshot) {
  return snapshot.status == "certified_complete";
}

bool step_contains_caustic_entry_trigger(
    const NativeAtomicStepCertificate& step) {
  const auto snapshot_contains_trigger = [](const auto& snapshot) {
    return std::any_of(
        snapshot.root_certificates.begin(),
        snapshot.root_certificates.end(),
        [](const auto& row) {
          return row.certificate.status == "caustic_route_required";
        });
  };
  return std::any_of(
      step.substeps.begin(), step.substeps.end(), [&](const auto& substep) {
        return snapshot_contains_trigger(substep.start_snapshot) ||
            (substep.endpoint_snapshot.has_value() &&
             snapshot_contains_trigger(*substep.endpoint_snapshot));
      });
}

bool pair_is_adjudicated_finite_width(
    const NativeCoupledEvolutionRequest& request,
    const std::string& receiver,
    const std::string& source);

bool pair_is_adjudicated_finite_width(
    const NativeCoupledEvolutionRequest& request,
    const std::string& receiver,
    const std::string& source) {
  return std::binary_search(
      request.adjudicated_finite_width_pairs.begin(),
      request.adjudicated_finite_width_pairs.end(),
      std::make_pair(receiver, source));
}

void insert_sorted_pair(
    std::vector<std::pair<std::string, std::string>>& pairs,
    std::pair<std::string, std::string> pair) {
  const auto insertion = std::lower_bound(pairs.begin(), pairs.end(), pair);
  if (insertion == pairs.end() || *insertion != pair) {
    pairs.insert(insertion, std::move(pair));
  }
}

std::vector<std::pair<std::string, std::string>>
certified_opposite_polarity_core_pairs(
    const NativeCoupledEvolutionRequest& request,
    const NativeAccelerationSnapshotCertificate& snapshot) {
  const Interval core_scale = Interval::decimal_token(request.core_scale);
  std::vector<std::pair<std::string, std::string>> result;
  for (const auto& pair : snapshot.acceleration.pair_certificates) {
    const Interval charge_product =
        Interval::decimal_token(path_charge(request, pair.receiver_path_id)) *
        Interval::decimal_token(path_charge(request, pair.transmitter_path_id));
    if (!(charge_product.upper() < 0.0) || pair.status == "uncertified") {
      continue;
    }
    const bool intersects_core = std::any_of(
        pair.rows.begin(), pair.rows.end(), [&](const auto& row) {
          return row.separation.has_value() &&
              row.separation->lower() <= core_scale.upper();
        });
    if (intersects_core) {
      result.emplace_back(pair.receiver_path_id, pair.transmitter_path_id);
    }
  }
  return result;
}

std::vector<std::pair<std::string, std::string>> finite_width_pairs(
    const NativeAccelerationSnapshotCertificate& snapshot) {
  std::vector<std::pair<std::string, std::string>> result;
  for (std::size_t index = 0;
       index < snapshot.acceleration.pair_certificates.size(); ++index) {
    const auto& pair = snapshot.acceleration.pair_certificates[index];
    const auto* root = index < snapshot.root_certificates.size()
        ? &snapshot.root_certificates[index]
        : nullptr;
    if (pair.chart == "finite_width" && pair.status != "uncertified" &&
        root != nullptr &&
        root->receiver_path_id == pair.receiver_path_id &&
        root->transmitter_path_id == pair.transmitter_path_id &&
        root->certificate.status == "caustic_route_required") {
      result.emplace_back(pair.receiver_path_id, pair.transmitter_path_id);
    }
  }
  return result;
}

std::optional<NativeEndpointRootContinuationCertificate>
certify_coincident_endpoint_root_continuation_impl(
    const NativeAccelerationSnapshotCertificate& start,
    const NativeAccelerationSnapshotCertificate& end,
    const std::string& receiver_id,
    const std::string& transmitter_id) {
  if (receiver_id != transmitter_id) return std::nullopt;
  const auto find_row = [&](const auto& snapshot)
      -> const NativeSnapshotRootRow* {
    const auto found = std::find_if(
        snapshot.root_certificates.begin(),
        snapshot.root_certificates.end(), [&](const auto& row) {
          return row.receiver_path_id == receiver_id &&
              row.transmitter_path_id == transmitter_id;
        });
    return found == snapshot.root_certificates.end() ? nullptr : &*found;
  };
  const auto* start_row = find_row(start);
  const auto* end_row = find_row(end);
  if (start_row == nullptr || end_row == nullptr) return std::nullopt;
  const auto& start_certificate = start_row->certificate;
  const auto& end_certificate = end_row->certificate;
  if (start_certificate.status != "certified_complete" ||
      end_certificate.status != "certified_complete" ||
      !start_certificate.root_free_complement ||
      !end_certificate.root_free_complement ||
      start_certificate.memory_boundary_contact ||
      end_certificate.memory_boundary_contact ||
      !start_certificate.coincident_endpoint_excluded ||
      !end_certificate.coincident_endpoint_excluded) {
    return std::nullopt;
  }
  std::vector<int> start_signs;
  std::vector<int> end_signs;
  for (const auto& root : start_certificate.roots) {
    start_signs.push_back(root.transmitter_factor_sign);
  }
  for (const auto& root : end_certificate.roots) {
    end_signs.push_back(root.transmitter_factor_sign);
  }
  std::sort(start_signs.begin(), start_signs.end());
  std::sort(end_signs.begin(), end_signs.end());
  const auto& smaller = start_signs.size() < end_signs.size()
      ? start_signs : end_signs;
  const auto& larger = start_signs.size() < end_signs.size()
      ? end_signs : start_signs;
  if (larger.size() != smaller.size() + 1U) return std::nullopt;
  int boundary_sign = 0;
  bool matched = false;
  for (std::size_t omitted = 0; omitted < larger.size(); ++omitted) {
    std::vector<int> candidate = larger;
    boundary_sign = candidate[omitted];
    candidate.erase(candidate.begin() + static_cast<std::ptrdiff_t>(omitted));
    if (candidate == smaller) {
      matched = true;
      break;
    }
  }
  if (!matched || boundary_sign == 0) return std::nullopt;
  // Complete complements rule out a missed interior root, and the clear
  // memory boundary rules out entry from retained-history truncation.  An
  // interior fold creates or removes an opposite-sign pair.  The sole
  // remaining boundary for this one-root self-pair change is the explicitly
  // excluded coincident endpoint.
  return NativeEndpointRootContinuationCertificate{
      .schema = "eom_native_endpoint_root_continuation_certificate/v1",
      .status = "certified_complete",
      .receiver_path_id = receiver_id,
      .transmitter_path_id = transmitter_id,
      .start_root_count = start_signs.size(),
      .end_root_count = end_signs.size(),
      .boundary_branch_sign = boundary_sign,
      .start_root_free_complement = true,
      .end_root_free_complement = true,
      .memory_boundary_clear = true,
      .coincident_endpoint_excluded = true,
      .classification = "coincident_endpoint_root_continuation",
      .failure_code = "",
  };
}

std::vector<NativePublishedPath> append_candidate_segments(
    const std::vector<NativePublishedPath>& histories,
    const std::string& start_time,
    const std::string& end_time,
    const SnapshotTotals& start_acceleration,
    const SnapshotTotals& end_acceleration,
    const std::set<std::string>& right_endpoint_acceleration_paths,
    NativeCorrectedSubstepTiming* timing) {
  const auto timing_start = SteadyClock::now();
  const double start = scalar_token(start_time);
  const double end = scalar_token(end_time);
  const double step = end - start;
  if (!(step > 0.0)) {
    throw std::invalid_argument(
        "candidate segment requires a positive step: start=" + start_time +
        ", end=" + end_time);
  }
  std::vector<NativePublishedPath> result;
  result.reserve(histories.size());
  for (const auto& path : histories) {
    const Interval time = Interval::point(start);
    const IntervalVector position_interval =
        path.history.correlated_position_hull(time);
    const IntervalVector velocity_interval =
        path.history.correlated_velocity_hull(time);
    const auto position = midpoints(position_interval);
    const auto velocity = midpoints(velocity_interval);
    const auto start_found = start_acceleration.find(path.path_id);
    const auto end_found = end_acceleration.find(path.path_id);
    if (start_found == start_acceleration.end() ||
        end_found == end_acceleration.end()) {
      throw std::invalid_argument("candidate segment lacks path acceleration");
    }
    CubicCoefficientTokens coefficients{};
    for (std::size_t axis = 0; axis < 3; ++axis) {
      const double acceleration_start =
          right_endpoint_acceleration_paths.contains(path.path_id)
          ? end_found->second[axis].midpoint()
          : start_found->second[axis].midpoint();
      const double acceleration_end = end_found->second[axis].midpoint();
      coefficients[axis] = {
          decimal_token(position[axis]),
          decimal_token(velocity[axis]),
          decimal_token(acceleration_start * 0.5),
          decimal_token(
              (acceleration_end - acceleration_start) / (6.0 * step)),
      };
    }
    const auto position_radii = component_radii(position_interval);
    const auto velocity_radii = component_radii(velocity_interval);
    const auto acceleration_start_radii = component_radii(
        right_endpoint_acceleration_paths.contains(path.path_id)
            ? end_found->second
            : start_found->second);
    const auto acceleration_end_radii = component_radii(end_found->second);
    // The published cubic uses acceleration midpoints.  Its explicit error
    // radius must therefore carry the entire interval input through the
    // accepted step: integral_0^h a_err dt <= h r_a and
    // integral_0^h (h-t) a_err dt <= h^2 r_a / 2.  Retained position and
    // velocity radii propagate through the same map.
    HistoryErrorTokens position_error_tokens{};
    HistoryErrorTokens velocity_error_tokens{};
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      const double acceleration_radius = std::max(
          acceleration_start_radii[axis], acceleration_end_radii[axis]);
      position_error_tokens[axis] = error_token(upward_nonnegative_sum(
          upward_nonnegative_sum(
              position_radii[axis], step * velocity_radii[axis]),
          0.5 * step * step * acceleration_radius));
      velocity_error_tokens[axis] = error_token(upward_nonnegative_sum(
          velocity_radii[axis], step * acceleration_radius));
    }
    CubicHistorySegment segment(
        start_time, end_time, coefficients, position_error_tokens,
        velocity_error_tokens);
    result.push_back({
        path.path_id,
        path.history.appended(std::move(segment)),
    });
  }
  if (timing != nullptr) {
    timing->history_copy_hash_wall_seconds += elapsed_seconds(timing_start);
  }
  return result;
}

struct EventAwareCandidate {
  std::vector<NativePublishedPath> histories;
  std::map<std::string, IntervalVector> background_impulses;
  std::map<std::string, IntervalVector> background_position_moments;
  std::map<std::string, IntervalVector> endpoint_positions;
  std::map<std::string, IntervalVector> endpoint_velocities;
};

EventAwareCandidate append_event_aware_candidate_segments(
    const std::vector<NativePublishedPath>& histories,
    const std::string& start_time,
    const std::string& end_time,
    const NativeAccelerationSnapshotCertificate& start_snapshot,
    const NativeAccelerationSnapshotCertificate& end_snapshot,
    const std::vector<std::pair<std::string, std::string>>& event_pairs,
    const std::vector<NativeFoldCausticImpulseCertificate>& events,
    NativeCorrectedSubstepTiming* timing) {
  if (event_pairs.size() != events.size()) {
    throw std::invalid_argument(
        "event-aware reconstruction pair/event domain mismatch");
  }
  const auto timing_start = SteadyClock::now();
  const double start = scalar_token(start_time);
  const double end = scalar_token(end_time);
  const double step = end - start;
  if (!(step > 0.0)) {
    throw std::invalid_argument(
        "event-aware reconstruction requires a positive step");
  }
  const SnapshotTotals start_totals = snapshot_totals(start_snapshot);
  const SnapshotTotals end_totals = snapshot_totals(end_snapshot);
  const Interval zero = Interval::point(0.0);
  const IntervalVector zero_vector{zero, zero, zero};
  EventAwareCandidate result;
  result.histories.reserve(histories.size());
  for (const auto& path : histories) {
    const Interval start_point = Interval::point(start);
    const IntervalVector x0 =
        path.history.correlated_position_hull(start_point);
    const IntervalVector v0 =
        path.history.correlated_velocity_hull(start_point);
    IntervalVector background_start = start_totals.at(path.path_id);
    IntervalVector background_end = end_totals.at(path.path_id);
    IntervalVector event_impulse = zero_vector;
    IntervalVector event_moment = zero_vector;
    bool has_event = false;
    for (std::size_t index = 0; index < event_pairs.size(); ++index) {
      const auto& pair = event_pairs[index];
      if (pair.first != path.path_id) continue;
      const auto& event = events[index];
      if (!event.impulse.has_value() ||
          !event.position_moment.has_value()) {
        throw std::invalid_argument(
            "event-aware reconstruction requires certified event rows");
      }
      const auto& start_pair =
          snapshot_pair(start_snapshot, pair.first, pair.second);
      const auto& end_pair =
          snapshot_pair(end_snapshot, pair.first, pair.second);
      if (!start_pair.total_acceleration.has_value() ||
          !end_pair.total_acceleration.has_value()) {
        throw std::invalid_argument(
            "event-aware reconstruction lacks endpoint pair acceleration");
      }
      background_start = subtract(
          background_start, *start_pair.total_acceleration);
      background_end = subtract(
          background_end, *end_pair.total_acceleration);
      event_impulse = add(event_impulse, *event.impulse);
      event_moment = add(event_moment, *event.position_moment);
      has_event = true;
    }
    if (!has_event) {
      auto ordinary = append_candidate_segments(
          {path}, start_time, end_time,
          {{path.path_id, start_totals.at(path.path_id)}},
          {{path.path_id, end_totals.at(path.path_id)}}, {}, nullptr);
      result.histories.push_back(std::move(ordinary.front()));
      continue;
    }

    const IntervalVector background_impulse = scale(
        Interval::point(step * 0.5),
        add(background_start, background_end));
    const IntervalVector background_moment = scale(
        Interval::point(step * step / 6.0),
        add(scale(Interval::point(2.0), background_start), background_end));
    const IntervalVector v1 = add(v0, add(background_impulse, event_impulse));
    const IntervalVector x1 = add(
        add(x0, scale(Interval::point(step), v0)),
        add(background_moment, event_moment));
    result.background_impulses.insert_or_assign(
        path.path_id, background_impulse);
    result.background_position_moments.insert_or_assign(
        path.path_id, background_moment);
    result.endpoint_positions.insert_or_assign(path.path_id, x1);
    result.endpoint_velocities.insert_or_assign(path.path_id, v1);

    CubicCoefficientTokens coefficients{};
    for (std::size_t axis = 0; axis < 3U; ++axis) {
      const double x0_mid = x0[axis].midpoint();
      const double v0_mid = v0[axis].midpoint();
      const double x1_mid = x1[axis].midpoint();
      const double v1_mid = v1[axis].midpoint();
      coefficients[axis] = {
          decimal_token(x0_mid),
          decimal_token(v0_mid),
          decimal_token(
              (3.0 * (x1_mid - x0_mid) -
               step * (2.0 * v0_mid + v1_mid)) /
              (step * step)),
          decimal_token(
              (2.0 * (x0_mid - x1_mid) +
               step * (v0_mid + v1_mid)) /
              (step * step * step)),
      };
    }
    const auto x0_radii = component_radii(x0);
    const auto v0_radii = component_radii(v0);
    const auto x1_radii = component_radii(x1);
    const auto v1_radii = component_radii(v1);
    // These are uniform Hermite-basis bounds, not endpoint-only radii.  They
    // enclose every convex position basis term and every differentiated basis
    // term on 0 <= (T-T0)/h <= 1.
    HistoryErrorTokens position_error_tokens{};
    HistoryErrorTokens velocity_error_tokens{};
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      position_error_tokens[axis] = error_token(upward_nonnegative_sum(
          upward_nonnegative_sum(x0_radii[axis], x1_radii[axis]),
          step * upward_nonnegative_sum(
              v0_radii[axis], v1_radii[axis])));
      velocity_error_tokens[axis] = error_token(upward_nonnegative_sum(
          1.5 * (x0_radii[axis] + x1_radii[axis]) / step,
          2.0 * (v0_radii[axis] + v1_radii[axis])));
    }
    result.histories.push_back({
        path.path_id,
        path.history.appended(CubicHistorySegment(
            start_time, end_time, coefficients,
            position_error_tokens, velocity_error_tokens)),
    });
  }
  if (timing != nullptr) {
    timing->history_copy_hash_wall_seconds += elapsed_seconds(timing_start);
  }
  return result;
}

const NativeSnapshotRootRow* snapshot_root_row(
    const NativeAccelerationSnapshotCertificate& snapshot,
    const std::string& receiver,
    const std::string& source) {
  const auto found = std::find_if(
      snapshot.root_certificates.begin(), snapshot.root_certificates.end(),
      [&](const auto& row) {
        return row.receiver_path_id == receiver &&
            row.transmitter_path_id == source;
      });
  return found == snapshot.root_certificates.end() ? nullptr : &*found;
}

bool vector_contains(
    const IntervalVector& enclosure, const IntervalVector& candidate) {
  for (std::size_t axis = 0; axis < 3U; ++axis) {
    if (!candidate[axis].subset_of(enclosure[axis])) return false;
  }
  return true;
}

IntervalVector midpoint_vector(const IntervalVector& value) {
  return {Interval::point(value[0].midpoint()),
          Interval::point(value[1].midpoint()),
          Interval::point(value[2].midpoint())};
}

bool certify_finite_width_exit(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    const NativeAccelerationSnapshotCertificate& endpoint,
    const std::string& receiver,
    const std::string& source) {
  const auto* root_row = snapshot_root_row(endpoint, receiver, source);
  if (root_row == nullptr) return false;
  const auto& roots = root_row->certificate;
  if (roots.status != "certified_complete" ||
      !roots.root_free_complement || roots.memory_boundary_contact) {
    return false;
  }
  const auto pair = certify_pair_acceleration({
      .row_id = roots.row_id + "/fwc-exit-sharp",
      .receiver_path_id = receiver,
      .transmitter_path_id = source,
      .receiver_history = &path_history(histories, receiver).history,
      .transmitter_history = &path_history(histories, source).history,
      .root_certificate = &roots,
      .receiver_charge = path_charge(request, receiver),
      .transmitter_charge = path_charge(request, source),
      .coupling = request.coupling,
      .chart = "sharp",
      .transmitter_factor_floor = request.transmitter_factor_floor,
      .causal_width = request.causal_width,
      .core_scale = request.core_scale,
      .acceleration_tolerance = request.acceleration_tolerance,
      .quadrature_tolerance = request.quadrature_tolerance,
      .quadrature_max_depth = request.quadrature_max_depth,
      .quadrature_max_cells = request.quadrature_max_cells,
      .initial_mpfr_bits = request.initial_mpfr_bits,
      .maximum_mpfr_bits = request.maximum_mpfr_bits,
      .use_analytic_pinned_fold = request.use_analytic_pinned_fold,
      .use_correlated_self_chord = request.use_correlated_self_chord,
      .use_stable_circular_residual =
          request.use_stable_circular_residual,
  });
  if (pair.status == "uncertified" || pair.chart != "sharp" ||
      !pair.total_acceleration.has_value() ||
      pair.rows.size() != roots.roots.size()) {
    return false;
  }
  const Interval transmitter_factor_floor =
      Interval::decimal_token(request.transmitter_factor_floor);
  const Interval core_scale = Interval::decimal_token(request.core_scale);
  for (const auto& row : pair.rows) {
    if (!row.transmitter_factor.has_value() ||
        row.transmitter_factor->contains_zero() ||
        interval_absolute(*row.transmitter_factor).lower() <
            transmitter_factor_floor.upper() ||
        !row.separation.has_value() ||
        row.separation->lower() <= core_scale.upper()) {
      return false;
    }
  }
  return true;
}

struct NominalHistoryState {
  IntervalVector position;
  IntervalVector velocity;
  IntervalVector acceleration;
  IntervalVector jerk;
};

std::optional<NominalHistoryState> nominal_history_state(
    const RetainedHistory& history, const Interval& time) {
  for (const auto& segment : history.segments()) {
    if (time.lower() < segment.t_start_interval().lower() ||
        time.upper() > segment.t_end_interval().upper()) {
      continue;
    }
    const Interval local = time - segment.t_start_interval();
    NominalHistoryState state{
        .position = {Interval::point(0.0), Interval::point(0.0),
                     Interval::point(0.0)},
        .velocity = {Interval::point(0.0), Interval::point(0.0),
                     Interval::point(0.0)},
        .acceleration = {Interval::point(0.0), Interval::point(0.0),
                         Interval::point(0.0)},
        .jerk = {Interval::point(0.0), Interval::point(0.0),
                 Interval::point(0.0)},
    };
    for (std::size_t axis = 0; axis < 3U; ++axis) {
      const auto c = coefficient_intervals(
          segment.coefficient_tokens()[axis]);
      state.position[axis] = evaluate_cubic(c, local);
      state.velocity[axis] = evaluate_cubic_velocity(c, local);
      state.acceleration[axis] =
          Interval::point(2.0) * c[2] +
          Interval::point(6.0) * c[3] * local;
      state.jerk[axis] = Interval::point(6.0) * c[3];
    }
    return state;
  }
  return std::nullopt;
}

struct Jet2 {
  Interval value;
  Interval first;
  Interval second;
};

Jet2 jet_add(const Jet2& left, const Jet2& right) {
  return {left.value + right.value, left.first + right.first,
          left.second + right.second};
}

Jet2 jet_subtract(const Jet2& left, const Jet2& right) {
  return {left.value - right.value, left.first - right.first,
          left.second - right.second};
}

Jet2 jet_multiply(const Jet2& left, const Jet2& right) {
  return {
      left.value * right.value,
      left.first * right.value + left.value * right.first,
      left.second * right.value +
          Interval::point(2.0) * left.first * right.first +
          left.value * right.second,
  };
}

Jet2 jet_inverse(const Jet2& value) {
  const Interval square = interval_square(value.value);
  const Interval cube = square * value.value;
  return {
      Interval::point(1.0) / value.value,
      (Interval::point(0.0) - value.first) / square,
      Interval::point(2.0) * interval_square(value.first) / cube -
          value.second / square,
  };
}

Jet2 jet_divide(const Jet2& numerator, const Jet2& denominator) {
  return jet_multiply(numerator, jet_inverse(denominator));
}

Jet2 jet_sqrt(const Jet2& value) {
  const Interval root = interval_sqrt(value.value);
  return {
      root,
      value.first / (Interval::point(2.0) * root),
      value.second / (Interval::point(2.0) * root) -
          interval_square(value.first) /
              (Interval::point(4.0) * root * root * root),
  };
}

Jet2 jet_absolute(const Jet2& value) {
  if (value.value.lower() > 0.0) return value;
  if (value.value.upper() < 0.0) {
    const Interval minus_one = Interval::point(-1.0);
    return {minus_one * value.value, minus_one * value.first,
            minus_one * value.second};
  }
  throw std::runtime_error(
      "common-domain nominal branch orientation contains zero");
}

using JetVector = std::array<Jet2, 3>;

Jet2 jet_dot(const JetVector& left, const JetVector& right) {
  Jet2 result{Interval::point(0.0), Interval::point(0.0),
              Interval::point(0.0)};
  for (std::size_t axis = 0; axis < 3U; ++axis) {
    result = jet_add(result, jet_multiply(left[axis], right[axis]));
  }
  return result;
}

JetVector jet_scale(const Jet2& factor, const JetVector& value) {
  return {jet_multiply(factor, value[0]),
          jet_multiply(factor, value[1]),
          jet_multiply(factor, value[2])};
}

JetVector jet_subtract_vector(
    const JetVector& left, const JetVector& right) {
  return {jet_subtract(left[0], right[0]),
          jet_subtract(left[1], right[1]),
          jet_subtract(left[2], right[2])};
}

struct CommonRootTube {
  Interval emission;
  Interval separation;
  IntervalVector acceleration_hull;
  JetVector nominal_acceleration;
  JetVector emission_coordinate_sharp_acceleration;
  double transmitter_factor_absolute_lower;
  double separation_lower;
};

std::optional<CommonRootTube> certify_common_root_tube(
    const NativeCoupledEvolutionRequest& request,
    const NativePublishedPath& receiver,
    const NativePublishedPath& source,
    const NativeRootBracket& endpoint_root,
    const Interval& reception,
    double common_width) {
  const Interval field_speed = Interval::decimal_token(request.field_speed);
  const Interval core_scale = Interval::decimal_token(request.core_scale);
  const Interval normal_floor =
      Interval::decimal_token(request.transmitter_factor_floor);
  const Interval root_bracket(
      Interval::decimal_token(endpoint_root.lower).lower(),
      Interval::decimal_token(endpoint_root.upper).upper());
  const Interval endpoint_transmitter_factor(
      Interval::decimal_token(endpoint_root.transmitter_factor_lower).lower(),
      Interval::decimal_token(endpoint_root.transmitter_factor_upper).upper());
  const Interval endpoint_receiver_factor(
      Interval::decimal_token(endpoint_root.receiver_factor_lower).lower(),
      Interval::decimal_token(endpoint_root.receiver_factor_upper).upper());
  if (endpoint_transmitter_factor.contains_zero()) return std::nullopt;
  double slope_bound = interval_absolute(
      endpoint_receiver_factor / endpoint_transmitter_factor).upper();
  Interval emission = root_bracket;
  IntervalVector displacement{Interval::point(0.0), Interval::point(0.0),
                              Interval::point(0.0)};
  Interval separation = Interval::point(0.0);
  Interval transmitter_factor = endpoint_transmitter_factor;
  Interval receiver_factor = endpoint_receiver_factor;
  bool self_consistent = false;
  for (std::size_t iteration = 0; iteration < 8U; ++iteration) {
    const double padding = std::nextafter(
        common_width * slope_bound + root_bracket.width(),
        std::numeric_limits<double>::infinity());
    const double lower = root_bracket.lower() - padding;
    const double upper = root_bracket.upper() + padding;
    if (!(lower < upper) || lower < source.history.t_start() ||
        upper > source.history.t_end() || upper > reception.upper()) {
      return std::nullopt;
    }
    emission = Interval(lower, upper);
    displacement = subtract(
        receiver.history.position_hull(reception),
        source.history.position_hull(emission));
    separation = norm(displacement);
    if (separation.lower() <= core_scale.upper() ||
        separation.contains_zero()) {
      return std::nullopt;
    }
    const IntervalVector direction = divide(displacement, separation);
    transmitter_factor = field_speed - dot(
        direction, source.history.velocity_hull(emission));
    receiver_factor = field_speed - dot(
        direction, receiver.history.velocity_hull(reception));
    if (transmitter_factor.contains_zero() ||
        interval_absolute(transmitter_factor).lower() < normal_floor.upper()) {
      return std::nullopt;
    }
    const double updated = interval_absolute(
        receiver_factor / transmitter_factor).upper();
    if (updated <= slope_bound) {
      self_consistent = true;
      break;
    }
    slope_bound = std::nextafter(
        updated, std::numeric_limits<double>::infinity());
  }
  if (!self_consistent) return std::nullopt;

  const Interval acceleration_weight =
      field_speed / interval_absolute(transmitter_factor);
  const Interval radial_denominator =
      interval_square(separation) * separation;
  const Interval signed_scale =
      Interval::decimal_token(request.coupling) *
      Interval::decimal_token(path_charge(request, receiver.path_id)) *
      Interval::decimal_token(path_charge(request, source.path_id));
  const IntervalVector acceleration_hull = scale(
      signed_scale * acceleration_weight,
      divide(displacement, radial_denominator));

  const auto receiver_state = nominal_history_state(
      receiver.history, reception);
  const auto transmitter_state = nominal_history_state(source.history, emission);
  if (!receiver_state.has_value() || !transmitter_state.has_value()) {
    return std::nullopt;
  }
  const IntervalVector nominal_displacement = subtract(
      receiver_state->position, transmitter_state->position);
  const Interval nominal_separation = norm(nominal_displacement);
  if (nominal_separation.contains_zero()) return std::nullopt;
  const IntervalVector nominal_direction =
      divide(nominal_displacement, nominal_separation);
  const Interval nominal_ds = field_speed -
      dot(nominal_direction, transmitter_state->velocity);
  const Interval nominal_dr = field_speed -
      dot(nominal_direction, receiver_state->velocity);
  if (nominal_ds.contains_zero()) {
    return std::nullopt;
  }
  const Interval s1 = nominal_dr / nominal_ds;
  const IntervalVector d1 = subtract(
      receiver_state->velocity,
      scale(s1, transmitter_state->velocity));
  const IntervalVector base_d2 = subtract(
      receiver_state->acceleration,
      scale(interval_square(s1), transmitter_state->acceleration));
  const Interval base_r2 =
      (dot(d1, d1) + dot(nominal_displacement, base_d2)) /
          nominal_separation -
      interval_square(dot(nominal_displacement, d1)) /
          (interval_square(nominal_separation) * nominal_separation);
  const Interval s2 =
      (Interval::point(0.0) - base_r2) / nominal_ds;

  const Interval zero = Interval::point(0.0);
  const Jet2 zero_jet{zero, zero, zero};
  JetVector receiver_position_jet{zero_jet, zero_jet, zero_jet};
  JetVector transmitter_position_jet{zero_jet, zero_jet, zero_jet};
  JetVector transmitter_velocity_jet{zero_jet, zero_jet, zero_jet};
  for (std::size_t axis = 0; axis < 3U; ++axis) {
    receiver_position_jet[axis] = {
        receiver_state->position[axis], receiver_state->velocity[axis],
        receiver_state->acceleration[axis]};
    transmitter_position_jet[axis] = {
        transmitter_state->position[axis],
        transmitter_state->velocity[axis] * s1,
        transmitter_state->acceleration[axis] * interval_square(s1) +
            transmitter_state->velocity[axis] * s2};
    transmitter_velocity_jet[axis] = {
        transmitter_state->velocity[axis],
        transmitter_state->acceleration[axis] * s1,
        transmitter_state->jerk[axis] * interval_square(s1) +
            transmitter_state->acceleration[axis] * s2};
  }
  const JetVector d_jet = jet_subtract_vector(
      receiver_position_jet, transmitter_position_jet);
  const Jet2 r_jet = jet_sqrt(jet_dot(d_jet, d_jet));
  const JetVector n_jet = jet_scale(jet_inverse(r_jet), d_jet);
  const Jet2 c_jet{field_speed, Interval::point(0.0),
                   Interval::point(0.0)};
  const Jet2 ds_jet = jet_subtract(
      c_jet, jet_dot(n_jet, transmitter_velocity_jet));
  const Jet2 strength_jet = jet_absolute(jet_divide(c_jet, ds_jet));
  const Jet2 radial_cubed = jet_multiply(
      jet_multiply(r_jet, r_jet), r_jet);
  const Jet2 scale_jet = jet_multiply(
      Jet2{signed_scale, Interval::point(0.0), Interval::point(0.0)},
      strength_jet);
  const JetVector nominal_acceleration = jet_scale(
      jet_divide(scale_jet, radial_cubed), d_jet);

  // Amendment 1 requires the second derivative of the sharp branch
  // integrand in the residual coordinate u=g(T,S), not in reception time.
  // Build the sharp quotient as an S-jet first, then apply
  //   d2/du2 = d2/dS2 / Ds^2 - (d/dS)(dDs/dS) / Ds^3.
  // Every value below is evaluated on the certified common root tube.
  JetVector receiver_position_s_jet{zero_jet, zero_jet, zero_jet};
  JetVector transmitter_position_s_jet{zero_jet, zero_jet, zero_jet};
  JetVector transmitter_velocity_s_jet{zero_jet, zero_jet, zero_jet};
  for (std::size_t axis = 0; axis < 3U; ++axis) {
    receiver_position_s_jet[axis] = {
        receiver_state->position[axis], zero, zero};
    transmitter_position_s_jet[axis] = {
        transmitter_state->position[axis], transmitter_state->velocity[axis],
        transmitter_state->acceleration[axis]};
    transmitter_velocity_s_jet[axis] = {
        transmitter_state->velocity[axis], transmitter_state->acceleration[axis],
        transmitter_state->jerk[axis]};
  }
  const JetVector d_s_jet = jet_subtract_vector(
      receiver_position_s_jet, transmitter_position_s_jet);
  const Jet2 r_s_jet = jet_sqrt(jet_dot(d_s_jet, d_s_jet));
  const JetVector n_s_jet = jet_scale(jet_inverse(r_s_jet), d_s_jet);
  const Jet2 ds_s_jet = jet_subtract(
      c_jet, jet_dot(n_s_jet, transmitter_velocity_s_jet));
  if (ds_s_jet.value.contains_zero()) {
    return std::nullopt;
  }
  const Jet2 s_strength_jet = jet_absolute(
      jet_divide(c_jet, ds_s_jet));
  const Jet2 s_radial_cubed = jet_multiply(
      jet_multiply(r_s_jet, r_s_jet), r_s_jet);
  const Jet2 s_scale_jet = jet_multiply(
      Jet2{signed_scale, zero, zero}, s_strength_jet);
  const JetVector sharp_s_jet = jet_scale(
      jet_divide(s_scale_jet, s_radial_cubed), d_s_jet);
  JetVector sharp_u_jet{zero_jet, zero_jet, zero_jet};
  const Interval ds_square = interval_square(ds_s_jet.value);
  const Interval ds_cube = ds_square * ds_s_jet.value;
  for (std::size_t axis = 0; axis < 3U; ++axis) {
    sharp_u_jet[axis] = {
        sharp_s_jet[axis].value,
        sharp_s_jet[axis].first / ds_s_jet.value,
        sharp_s_jet[axis].second / ds_square -
            sharp_s_jet[axis].first * ds_s_jet.first / ds_cube};
  }
  return CommonRootTube{
      .emission = emission,
      .separation = separation,
      .acceleration_hull = acceleration_hull,
      .nominal_acceleration = nominal_acceleration,
      .emission_coordinate_sharp_acceleration = sharp_u_jet,
      .transmitter_factor_absolute_lower =
          interval_absolute(transmitter_factor).lower(),
      .separation_lower = separation.lower(),
  };
}

bool certify_common_root_free_complement(
    const NativeCoupledEvolutionRequest& request,
    const NativePublishedPath& receiver,
    const NativePublishedPath& source,
    const ExactPairCertificate& endpoint_roots,
    const Interval& reception,
    const std::vector<CommonRootTube>& tubes) {
  const double search_lower =
      Interval::decimal_token(endpoint_roots.searched_lower).lower();
  const double search_upper = reception.upper();
  std::set<double> boundaries{search_lower, search_upper};
  for (const auto& segment : source.history.segments()) {
    if (search_lower < segment.t_start() &&
        segment.t_start() < search_upper) {
      boundaries.insert(segment.t_start());
    }
    if (search_lower < segment.t_end() && segment.t_end() < search_upper) {
      boundaries.insert(segment.t_end());
    }
  }
  for (const auto& tube : tubes) {
    boundaries.insert(std::max(search_lower, tube.emission.lower()));
    boundaries.insert(std::min(search_upper, tube.emission.upper()));
  }
  struct Cell {
    double lower;
    double upper;
    std::size_t depth;
  };
  std::vector<Cell> stack;
  for (auto it = boundaries.begin(); std::next(it) != boundaries.end(); ++it) {
    const double lower = *it;
    const double upper = *std::next(it);
    if (!(lower < upper)) continue;
    const double midpoint = lower + 0.5 * (upper - lower);
    const bool inside_tube = std::any_of(
        tubes.begin(), tubes.end(), [&](const auto& tube) {
          return tube.emission.lower() <= midpoint &&
              midpoint <= tube.emission.upper();
        });
    if (!inside_tube) stack.push_back({lower, upper, 0U});
  }
  const Interval field_speed = Interval::decimal_token(request.field_speed);
  const double resolution = tolerance_value(
      request.root_tolerance, "root tolerance");
  std::size_t visited = 0U;
  while (!stack.empty()) {
    const Cell cell = stack.back();
    stack.pop_back();
    if (++visited > request.root_max_cells) return false;
    const Interval emission(cell.lower, cell.upper);
    const Interval residual = norm(subtract(
        receiver.history.position_hull(reception),
        source.history.position_hull(emission))) -
        field_speed * (reception - emission);
    if (residual.excludes_zero()) continue;
    if (cell.depth >= request.root_max_depth ||
        cell.upper - cell.lower <= resolution) {
      return false;
    }
    const double midpoint = cell.lower + 0.5 * (cell.upper - cell.lower);
    if (!(cell.lower < midpoint && midpoint < cell.upper)) return false;
    stack.push_back({midpoint, cell.upper, cell.depth + 1U});
    stack.push_back({cell.lower, midpoint, cell.depth + 1U});
  }
  return true;
}

Interval symmetric_interval(double radius) {
  const double outward = std::nextafter(
      std::max(0.0, radius), std::numeric_limits<double>::infinity());
  return Interval(-outward, outward);
}

std::optional<NativeCommonDomainChartCertificate>
certify_common_domain_interval(
    const NativeCoupledEvolutionRequest& request,
    const NativePublishedPath& receiver,
    const NativePublishedPath& source,
    const NativeAccelerationSnapshotCertificate& endpoint_snapshot,
    const Interval& common_reception,
    double event_end) {
  NativeCommonDomainChartCertificate certificate{
      .status = "uncertified",
      .reception_lower = decimal_token(common_reception.lower()),
      .reception_upper = decimal_token(common_reception.upper()),
      .failure_code = "common_domain_not_certified",
  };
  const auto* root_row = snapshot_root_row(
      endpoint_snapshot, receiver.path_id, source.path_id);
  if (root_row == nullptr ||
      root_row->certificate.status != "certified_complete" ||
      !root_row->certificate.root_free_complement ||
      root_row->certificate.memory_boundary_contact) {
    certificate.failure_code = "common_domain_endpoint_roots_uncertified";
    return certificate;
  }
  const auto& roots = root_row->certificate;
  std::vector<CommonRootTube> tubes;
  tubes.reserve(roots.roots.size());
  for (const auto& root : roots.roots) {
    auto tube = certify_common_root_tube(
        request, receiver, source, root, common_reception,
        common_reception.width());
    if (!tube.has_value()) {
      certificate.failure_code = "common_domain_root_tube_uncertified";
      return certificate;
    }
    tubes.push_back(std::move(*tube));
  }
  std::sort(tubes.begin(), tubes.end(), [](const auto& left,
                                          const auto& right) {
    return left.emission.lower() < right.emission.lower();
  });
  for (std::size_t index = 1; index < tubes.size(); ++index) {
    if (tubes[index - 1U].emission.upper() >=
        tubes[index].emission.lower()) {
      certificate.failure_code = "common_domain_root_tubes_not_isolated";
      return certificate;
    }
  }
  if (!certify_common_root_free_complement(
          request, receiver, source, roots, common_reception, tubes)) {
    certificate.failure_code = "common_domain_complement_uncertified";
    return certificate;
  }
  certificate.certified_root_count = tubes.size();
  certificate.transmitter_factor_absolute_lower = tubes.empty()
      ? std::numeric_limits<double>::infinity()
      : std::min_element(
            tubes.begin(), tubes.end(), [](const auto& left,
                                           const auto& right) {
              return left.transmitter_factor_absolute_lower <
                  right.transmitter_factor_absolute_lower;
            })->transmitter_factor_absolute_lower;
  certificate.separation_lower = tubes.empty()
      ? std::numeric_limits<double>::infinity()
      : std::min_element(
            tubes.begin(), tubes.end(), [](const auto& left,
                                           const auto& right) {
              return left.separation_lower < right.separation_lower;
            })->separation_lower;

  const Interval zero = Interval::point(0.0);
  IntervalVector full_acceleration{zero, zero, zero};
  JetVector nominal_acceleration{
      Jet2{zero, zero, zero}, Jet2{zero, zero, zero},
      Jet2{zero, zero, zero}};
  for (const auto& tube : tubes) {
    full_acceleration = add(full_acceleration, tube.acceleration_hull);
    for (std::size_t axis = 0; axis < 3U; ++axis) {
      nominal_acceleration[axis] = jet_add(
          nominal_acceleration[axis], tube.nominal_acceleration[axis]);
    }
  }
  IntervalVector second_derivative_bound{zero, zero, zero};
  IntervalVector impulse_remainder{zero, zero, zero};
  IntervalVector moment_remainder{zero, zero, zero};
  IntervalVector track_impulse_remainder{zero, zero, zero};
  IntervalVector track_moment_remainder{zero, zero, zero};
  IntervalVector emission_second_derivative_bound{zero, zero, zero};
  IntervalVector regulator_leading_acceleration{zero, zero, zero};
  IntervalVector sharp_impulse{zero, zero, zero};
  IntervalVector sharp_local_moment{zero, zero, zero};
  const double width = common_reception.width();
  const double offset = std::max(0.0, event_end - common_reception.upper());
  const Interval eta = Interval::decimal_token(request.causal_width);
  const Interval epsilon = Interval::decimal_token(request.core_scale);
  for (const auto& tube : tubes) {
    for (std::size_t axis = 0; axis < 3U; ++axis) {
      const Interval d2u =
          tube.emission_coordinate_sharp_acceleration[axis].second;
      emission_second_derivative_bound[axis] =
          emission_second_derivative_bound[axis] +
          Interval(0.0, interval_absolute(d2u).upper());
      const Interval core_leading =
          Interval::point(-1.5) * interval_square(epsilon) /
          interval_square(tube.separation) *
          tube.emission_coordinate_sharp_acceleration[axis].value;
      const Interval gaussian_leading =
          Interval::point(0.5) * interval_square(eta) * d2u;
      regulator_leading_acceleration[axis] =
          regulator_leading_acceleration[axis] + core_leading +
          gaussian_leading;
    }
  }
  for (std::size_t axis = 0; axis < 3U; ++axis) {
    const double l2 = interval_absolute(
        nominal_acceleration[axis].second).upper();
    const double shortcut_i = width * width * width * l2 / 12.0;
    const double shortcut_m =
        width * width * width * width * l2 / 24.0;
    const double track_bound = interval_absolute(
        full_acceleration[axis] -
        nominal_acceleration[axis].value).upper();
    const double track_i = width * track_bound;
    const double track_m = 0.5 * width * width * track_bound;
    second_derivative_bound[axis] = Interval(0.0, l2);
    impulse_remainder[axis] = symmetric_interval(shortcut_i);
    moment_remainder[axis] = symmetric_interval(shortcut_m);
    track_impulse_remainder[axis] = symmetric_interval(track_i);
    track_moment_remainder[axis] = symmetric_interval(track_m);
    sharp_impulse[axis] =
        (Interval::point(width) * nominal_acceleration[axis].value)
            .inflate(shortcut_i + track_i);
    sharp_local_moment[axis] =
        (Interval::point(0.5 * width * width) *
         nominal_acceleration[axis].value)
            .inflate(shortcut_m + track_m);
  }
  IntervalVector sharp_moment = add(
      sharp_local_moment,
      scale(Interval::point(offset), sharp_impulse));
  const IntervalVector regulator_leading_impulse = scale(
      Interval::point(width), regulator_leading_acceleration);
  const IntervalVector regulator_leading_local_moment = scale(
      Interval::point(0.5 * width * width),
      regulator_leading_acceleration);
  const IntervalVector regulator_leading_moment = add(
      regulator_leading_local_moment,
      scale(Interval::point(offset), regulator_leading_impulse));

  auto finite = certify_native_fold_caustic_impulse(
      request, receiver, source, path_charge(request, receiver.path_id),
      path_charge(request, source.path_id), certificate.reception_lower,
      certificate.reception_upper);
  if (finite.status != "certified_complete" ||
      !finite.impulse.has_value() || !finite.position_moment.has_value()) {
    certificate.failure_code = finite.failure_code.empty()
        ? "common_domain_finite_width_uncertified"
        : finite.failure_code;
    return certificate;
  }
  const IntervalVector finite_moment = add(
      *finite.position_moment,
      scale(Interval::point(offset), *finite.impulse));
  certificate.sharp_impulse = sharp_impulse;
  certificate.finite_width_impulse = *finite.impulse;
  certificate.sharp_position_moment = sharp_moment;
  certificate.finite_width_position_moment = finite_moment;
  certificate.acceleration_second_derivative_bound =
      second_derivative_bound;
  certificate.impulse_shortcut_remainder = impulse_remainder;
  certificate.position_moment_shortcut_remainder = moment_remainder;
  certificate.track_impulse_remainder = track_impulse_remainder;
  certificate.track_position_moment_remainder = track_moment_remainder;
  certificate.emission_second_derivative_bound =
      emission_second_derivative_bound;
  certificate.regulator_leading_impulse = regulator_leading_impulse;
  certificate.regulator_leading_position_moment =
      regulator_leading_moment;

  const IntervalVector impulse_difference = subtract(
      *finite.impulse, sharp_impulse);
  const IntervalVector moment_difference = subtract(
      finite_moment, sharp_moment);
  const IntervalVector higher_impulse = subtract(
      impulse_difference, regulator_leading_impulse);
  const IntervalVector higher_moment = subtract(
      moment_difference, regulator_leading_moment);
  IntervalVector higher_impulse_remainder{zero, zero, zero};
  IntervalVector higher_moment_remainder{zero, zero, zero};
  IntervalVector regulator_impulse_remainder{zero, zero, zero};
  IntervalVector regulator_moment_remainder{zero, zero, zero};
  for (std::size_t axis = 0; axis < 3U; ++axis) {
    const double higher_i = interval_absolute(higher_impulse[axis]).upper();
    const double higher_m = interval_absolute(higher_moment[axis]).upper();
    higher_impulse_remainder[axis] = symmetric_interval(higher_i);
    higher_moment_remainder[axis] = symmetric_interval(higher_m);
    regulator_impulse_remainder[axis] = symmetric_interval(
        upward_nonnegative_sum(
            interval_absolute(regulator_leading_impulse[axis]).upper(),
            higher_i));
    regulator_moment_remainder[axis] = symmetric_interval(
        upward_nonnegative_sum(
            interval_absolute(regulator_leading_moment[axis]).upper(),
            higher_m));
  }
  certificate.regulator_higher_order_impulse_remainder =
      higher_impulse_remainder;
  certificate.regulator_higher_order_position_moment_remainder =
      higher_moment_remainder;
  certificate.regulator_impulse_remainder = regulator_impulse_remainder;
  certificate.regulator_position_moment_remainder =
      regulator_moment_remainder;

  const auto interval_distance = [](const Interval& left,
                                    const Interval& right) {
    if (left.intersection(right).has_value()) return 0.0;
    return left.upper() < right.lower()
        ? right.lower() - left.upper()
        : left.lower() - right.upper();
  };
  const double impulse_budget = tolerance_value(
      request.event_impulse_budget, "event impulse budget");
  const double moment_budget = tolerance_value(
      request.event_position_moment_budget,
      "event position-moment budget");
  const double state_fraction = exact_decimal_value(
      request.event_state_numerical_fraction);
  const double matching_fraction = exact_decimal_value(
      request.event_matching_fraction);
  const bool allocated_budget = !request.certified_budget_schema.empty();
  const auto certify_matching_row = [&](const IntervalVector& sharp,
                                        const IntervalVector& regulated,
                                        const IntervalVector& regulator,
                                        bool moment) {
    for (std::size_t axis = 0; axis < 3U; ++axis) {
      const double raw_distance = interval_distance(
          sharp[axis], regulated[axis]);
      const double numeric = moment
          ? interval_absolute(moment_remainder[axis]).upper() +
                interval_absolute(track_moment_remainder[axis]).upper() +
                offset * (
                    interval_absolute(impulse_remainder[axis]).upper() +
                    interval_absolute(track_impulse_remainder[axis]).upper())
          : interval_absolute(impulse_remainder[axis]).upper() +
                interval_absolute(track_impulse_remainder[axis]).upper();
      const double regulator_radius =
          interval_absolute(regulator[axis]).upper();
      const double total = upward_nonnegative_sum(numeric, regulator_radius);
      const double post = std::max(0.0, raw_distance - total);
      if (certificate.disjoint_component == 3U && raw_distance > 0.0) {
        certificate.disjoint_component = axis;
        certificate.disjoint_width = raw_distance;
        certificate.applicable_remainder_budget = numeric;
        certificate.applicable_regulator_remainder_budget =
            regulator_radius;
        certificate.applicable_total_remainder_budget = total;
        certificate.post_accounting_distance = post;
      }
      const double row_budget = moment ? moment_budget : impulse_budget;
      if (allocated_budget && numeric > row_budget * state_fraction) {
        certificate.failure_code = moment
            ? "common_domain_position_moment_state_budget_exceeded"
            : "common_domain_impulse_state_budget_exceeded";
        return false;
      }
      if (allocated_budget &&
          regulator_radius > row_budget * matching_fraction) {
        certificate.failure_code = moment
            ? "common_domain_position_moment_regulator_budget_exceeded"
            : "common_domain_impulse_regulator_budget_exceeded";
        return false;
      }
      const double total_limit = allocated_budget
          ? row_budget * (state_fraction + matching_fraction)
          : row_budget;
      if (total > total_limit) {
        certificate.failure_code = moment
            ? "common_domain_position_moment_remainder_budget_exceeded"
            : "common_domain_impulse_remainder_budget_exceeded";
        return false;
      }
      if (post > 0.0) {
        certificate.failure_code = moment
            ? "common_domain_position_moment_regulator_match_failed"
            : "common_domain_impulse_regulator_match_failed";
        return false;
      }
    }
    return true;
  };
  if (!certify_matching_row(
          sharp_impulse, *finite.impulse,
          regulator_impulse_remainder, false)) {
    return certificate;
  }
  if (!certify_matching_row(
          sharp_moment, finite_moment,
          regulator_moment_remainder, true)) {
    return certificate;
  }
  certificate.status = "certified_regulator_match";
  certificate.failure_code.clear();
  return certificate;
}

std::vector<NativeCommonDomainChartCertificate> certify_common_domains(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    const NativeAccelerationSnapshotCertificate& start_snapshot,
    const NativeAccelerationSnapshotCertificate& endpoint_snapshot,
    const std::string& receiver_id,
    const std::string& transmitter_id,
    const std::string& start_time,
    const std::string& end_time) {
  const double start = scalar_token(start_time);
  const double end = scalar_token(end_time);
  const double step = end - start;
  const auto& receiver = path_history(histories, receiver_id);
  const auto& source = path_history(histories, transmitter_id);
  std::vector<NativeCommonDomainChartCertificate> result;
  const auto try_side = [&](bool left) {
    for (std::size_t refinement = 0; refinement < 12U; ++refinement) {
      const double width = step / std::ldexp(8.0, refinement);
      if (!(width > 0.0)) break;
      const Interval common = left
          ? Interval(start, std::min(end, start + width))
          : Interval(std::max(start, end - width), end);
      const auto& endpoint = left ? start_snapshot : endpoint_snapshot;
      auto certificate = certify_common_domain_interval(
          request, receiver, source, endpoint, common, end);
      if (certificate.has_value() &&
          certificate->status == "certified_regulator_match") {
        result.push_back(std::move(*certificate));
        return;
      }
      if (refinement == 11U && certificate.has_value()) {
        result.push_back(std::move(*certificate));
      }
    }
  };
  try_side(true);
  try_side(false);
  return result;
}

std::vector<NativePathLocalError> endpoint_local_errors(
    const std::vector<NativePublishedPath>& full_histories,
    const std::vector<NativePublishedPath>& fine_histories,
    const std::string& end_time) {
  const Interval time = Interval::point(scalar_token(end_time));
  std::vector<NativePathLocalError> result;
  result.reserve(full_histories.size());
  for (const auto& full : full_histories) {
    const auto& fine = path_history(fine_histories, full.path_id);
    const IntervalVector full_position = full.history.position_hull(time);
    const IntervalVector full_velocity = full.history.velocity_hull(time);
    const IntervalVector fine_position = fine.history.position_hull(time);
    const IntervalVector fine_velocity = fine.history.velocity_hull(time);
    double position_error = 0.0;
    double velocity_error = 0.0;
    std::array<double, 3> position_errors{};
    std::array<double, 3> velocity_errors{};
    for (std::size_t axis = 0; axis < 3; ++axis) {
      position_errors[axis] = std::abs(
          full_position[axis].midpoint() - fine_position[axis].midpoint());
      velocity_errors[axis] = std::abs(
          full_velocity[axis].midpoint() - fine_velocity[axis].midpoint());
      position_error = std::max(position_error, position_errors[axis]);
      velocity_error = std::max(velocity_error, velocity_errors[axis]);
    }
    result.push_back({
        full.path_id, position_error, velocity_error,
        position_errors, velocity_errors});
  }
  return result;
}

std::vector<NativePublishedPath> inflate_fine_histories(
    const std::vector<NativePublishedPath>& input_histories,
    const std::vector<NativePublishedPath>& fine_histories,
    const std::vector<NativePathLocalError>& local_errors) {
  std::vector<NativePublishedPath> result;
  result.reserve(fine_histories.size());
  for (const auto& fine : fine_histories) {
    const auto& input = path_history(input_histories, fine.path_id);
    const auto error_found = std::find_if(
        local_errors.begin(), local_errors.end(), [&](const auto& error) {
          return error.path_id == fine.path_id;
        });
    if (error_found == local_errors.end()) {
      throw std::invalid_argument("fine history lacks local error record");
    }
    RetainedHistory inflated = input.history;
    for (std::size_t index = input.history.segments().size();
         index < fine.history.segments().size(); ++index) {
      const auto& segment = fine.history.segments()[index];
      HistoryErrorTokens position_error_tokens{};
      HistoryErrorTokens velocity_error_tokens{};
      for (std::size_t axis = 0U; axis < 3U; ++axis) {
        position_error_tokens[axis] = error_token(
            scalar_token(segment.position_error_tokens()[axis]) +
            error_found->position_errors[axis]);
        velocity_error_tokens[axis] = error_token(
            scalar_token(segment.velocity_error_tokens()[axis]) +
            error_found->velocity_errors[axis]);
      }
      inflated = inflated.appended(CubicHistorySegment(
          segment.t_start_token(), segment.t_end_token(),
          segment.coefficient_tokens(), position_error_tokens,
          velocity_error_tokens));
    }
    result.push_back({
        fine.path_id,
        std::move(inflated),
    });
  }
  return result;
}

std::map<std::string, JointAffineRetainedHistory> inflate_joint_histories(
    const std::map<std::string, JointAffineRetainedHistory>& input_histories,
    const std::map<std::string, JointAffineRetainedHistory>& fine_histories,
    const std::vector<NativePathLocalError>& local_errors) {
  if (input_histories.empty()) return {};
  std::map<std::string, JointAffineRetainedHistory> result;
  for (const auto& [path_id, fine] : fine_histories) {
    const auto input_found = input_histories.find(path_id);
    const auto error_found = std::find_if(
        local_errors.begin(), local_errors.end(), [&](const auto& error) {
          return error.path_id == path_id;
        });
    if (input_found == input_histories.end() ||
        error_found == local_errors.end() ||
        input_found->second.symbol_registry() != fine.symbol_registry()) {
      throw std::invalid_argument(
          "joint fine history inflation domain is not aligned");
    }
    auto segments = fine.segments();
    for (std::size_t index = input_found->second.segments().size();
         index < segments.size(); ++index) {
      for (std::size_t axis = 0U; axis < 3U; ++axis) {
        segments[index].position_remainder_radii[axis] = outward_radius_sum({
            segments[index].position_remainder_radii[axis],
            error_found->position_errors[axis],
        });
        segments[index].velocity_remainder_radii[axis] = outward_radius_sum({
            segments[index].velocity_remainder_radii[axis],
            error_found->velocity_errors[axis],
        });
      }
    }
    result.emplace(
        path_id, JointAffineRetainedHistory(
            path_id, fine.symbol_registry(), std::move(segments)));
  }
  if (result.size() != input_histories.size()) {
    throw std::invalid_argument(
        "joint fine history inflation lacks a path");
  }
  return result;
}

std::pair<double, double> joint_symbol_segment_bounds(
    const JointAffineCubicSegment& segment,
    std::size_t axis,
    std::size_t symbol) {
  const auto& rows = segment.position_coefficients[axis];
  const bool structurally_zero = std::all_of(
      rows.begin(), rows.end(), [&](const auto& row) {
        return row[symbol] == 0.0;
      });
  if (structurally_zero) return {0.0, 0.0};
  const Interval local(0.0, segment.end_time - segment.start_time);
  Interval position = Interval::point(rows[3U][symbol]);
  for (int degree = 2; degree >= 0; --degree) {
    position = position * local + Interval::point(
        rows[static_cast<std::size_t>(degree)][symbol]);
  }
  Interval velocity = Interval::point(3.0) *
      Interval::point(rows[3U][symbol]);
  velocity = velocity * local +
      Interval::point(2.0) * Interval::point(rows[2U][symbol]);
  velocity = velocity * local + Interval::point(rows[1U][symbol]);
  return {
      interval_radius_upper(position), interval_radius_upper(velocity)};
}

std::map<std::string, JointAffineRetainedHistory> condense_joint_histories(
    const std::map<std::string, JointAffineRetainedHistory>& histories,
    std::size_t maximum_symbols) {
  if (histories.empty()) return {};
  const auto& registry = histories.begin()->second.symbol_registry();
  for (const auto& [path_id, history] : histories) {
    static_cast<void>(path_id);
    if (history.symbol_registry() != registry) {
      throw std::invalid_argument(
          "joint condensation symbol registries are not aligned");
    }
  }
  if (registry.size() <= maximum_symbols) return histories;

  std::vector<double> scores(registry.size(), 0.0);
  for (const auto& [path_id, history] : histories) {
    static_cast<void>(path_id);
    for (const auto& segment : history.segments()) {
      const double span = segment.end_time - segment.start_time;
      for (std::size_t axis = 0U; axis < 3U; ++axis) {
        const auto& rows = segment.position_coefficients[axis];
        for (std::size_t symbol = 0U; symbol < registry.size(); ++symbol) {
          const double c0 = std::abs(rows[0U][symbol]);
          const double c1h = std::abs(rows[1U][symbol]) * span;
          const double c2h2 =
              std::abs(rows[2U][symbol]) * span * span;
          const double c3h3 =
              std::abs(rows[3U][symbol]) * span * span * span;
          scores[symbol] = std::max(
              scores[symbol], c0 + c1h + c2h2 + c3h3);
        }
      }
    }
    if (history.endpoint_override().has_value()) {
      const auto& endpoint = *history.endpoint_override();
      for (std::size_t symbol = 0U; symbol < registry.size(); ++symbol) {
        for (std::size_t axis = 0U; axis < 3U; ++axis) {
          scores[symbol] = std::max({
              scores[symbol],
              std::abs(
                  endpoint.position_shared_symbol_coefficients[symbol][axis]),
              std::abs(
                  endpoint.velocity_shared_symbol_coefficients[symbol][axis]),
          });
        }
      }
    }
  }
  std::vector<std::size_t> ranked(registry.size());
  for (std::size_t symbol = 0U; symbol < registry.size(); ++symbol) {
    ranked[symbol] = symbol;
  }
  std::stable_sort(
      ranked.begin(), ranked.end(), [&](std::size_t left, std::size_t right) {
        return scores[left] > scores[right];
      });
  ranked.resize(maximum_symbols);
  std::sort(ranked.begin(), ranked.end());
  std::vector<bool> retained(registry.size(), false);
  std::vector<std::string> retained_registry;
  retained_registry.reserve(maximum_symbols);
  for (const std::size_t symbol : ranked) {
    retained[symbol] = true;
    retained_registry.push_back(registry[symbol]);
  }

  std::map<std::string, JointAffineRetainedHistory> result;
  for (const auto& [path_id, history] : histories) {
    auto segments = history.segments();
    for (auto& segment : segments) {
      for (std::size_t axis = 0U; axis < 3U; ++axis) {
        std::vector<double> removed_position_bounds;
        std::vector<double> removed_velocity_bounds;
        removed_position_bounds.reserve(registry.size() - maximum_symbols);
        removed_velocity_bounds.reserve(registry.size() - maximum_symbols);
        for (std::size_t symbol = 0U; symbol < registry.size(); ++symbol) {
          if (retained[symbol]) continue;
          const auto [position_bound, velocity_bound] =
              joint_symbol_segment_bounds(segment, axis, symbol);
          removed_position_bounds.push_back(position_bound);
          removed_velocity_bounds.push_back(velocity_bound);
        }
        removed_position_bounds.push_back(
            segment.position_remainder_radii[axis]);
        removed_velocity_bounds.push_back(
            segment.velocity_remainder_radii[axis]);
        segment.position_remainder_radii[axis] =
            outward_radius_sum(removed_position_bounds);
        segment.velocity_remainder_radii[axis] =
            outward_radius_sum(removed_velocity_bounds);
        for (std::size_t degree = 0U; degree < 4U; ++degree) {
          JointCoefficientRow next;
          next.reserve(maximum_symbols);
          for (const std::size_t symbol : ranked) {
            next.push_back(
                segment.position_coefficients[axis][degree][symbol]);
          }
          segment.position_coefficients[axis][degree] = std::move(next);
        }
      }
    }
    auto endpoint = history.endpoint_override();
    if (endpoint.has_value()) {
      std::vector<std::array<double, 3>> positions;
      std::vector<std::array<double, 3>> velocities;
      positions.reserve(maximum_symbols);
      velocities.reserve(maximum_symbols);
      for (std::size_t axis = 0U; axis < 3U; ++axis) {
        std::vector<double> position_terms{
            endpoint->position_remainder_radii[axis]};
        std::vector<double> velocity_terms{
            endpoint->velocity_remainder_radii[axis]};
        for (std::size_t symbol = 0U; symbol < registry.size(); ++symbol) {
          if (retained[symbol]) continue;
          position_terms.push_back(std::abs(
              endpoint->position_shared_symbol_coefficients[symbol][axis]));
          velocity_terms.push_back(std::abs(
              endpoint->velocity_shared_symbol_coefficients[symbol][axis]));
        }
        endpoint->position_remainder_radii[axis] =
            outward_radius_sum(position_terms);
        endpoint->velocity_remainder_radii[axis] =
            outward_radius_sum(velocity_terms);
      }
      for (const std::size_t symbol : ranked) {
        positions.push_back(
            endpoint->position_shared_symbol_coefficients[symbol]);
        velocities.push_back(
            endpoint->velocity_shared_symbol_coefficients[symbol]);
      }
      endpoint->position_shared_symbol_coefficients = std::move(positions);
      endpoint->velocity_shared_symbol_coefficients = std::move(velocities);
    }
    result.emplace(
        path_id, JointAffineRetainedHistory(
            path_id, retained_registry, std::move(segments),
            std::move(endpoint)));
  }
  return result;
}

std::map<std::string, JointAffineRetainedHistory>
lift_joint_endpoint_remainders(
    const std::vector<NativePublishedPath>& ordinary_histories,
    const std::map<std::string, JointAffineRetainedHistory>& joint_histories,
    const std::string& endpoint_time) {
  if (joint_histories.empty()) return {};
  if (joint_histories.size() != ordinary_histories.size()) {
    throw std::invalid_argument(
        "joint endpoint lift domain is not aligned");
  }
  const double endpoint = scalar_token(endpoint_time);
  const auto& input_registry =
      joint_histories.begin()->second.symbol_registry();
  for (const auto& [path_id, history] : joint_histories) {
    static_cast<void>(path_id);
    if (history.symbol_registry() != input_registry) {
      throw std::invalid_argument(
          "joint endpoint lift symbol registries are not aligned");
    }
  }

  std::vector<std::string> endpoint_symbols;
  endpoint_symbols.reserve(6U * ordinary_histories.size());
  for (const auto& ordinary : ordinary_histories) {
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      endpoint_symbols.push_back(
          "endpoint-state/" + endpoint_time + "/" + ordinary.path_id +
          "/position/" + std::to_string(axis));
      endpoint_symbols.push_back(
          "endpoint-state/" + endpoint_time + "/" + ordinary.path_id +
          "/velocity/" + std::to_string(axis));
    }
  }
  for (const auto& symbol : endpoint_symbols) {
    if (std::find(input_registry.begin(), input_registry.end(), symbol) !=
        input_registry.end()) {
      throw std::invalid_argument(
          "joint endpoint lift would duplicate a retained symbol");
    }
  }

  std::map<std::string, JointAffineRetainedHistory> result;
  for (std::size_t path = 0U; path < ordinary_histories.size(); ++path) {
    const auto& ordinary = ordinary_histories[path];
    const auto joint_found = joint_histories.find(ordinary.path_id);
    if (joint_found == joint_histories.end()) {
      throw std::invalid_argument(
          "joint endpoint lift lacks a path history");
    }
    const Interval endpoint_point = Interval::point(endpoint);
    const auto position_box =
        ordinary.history.correlated_position_hull(endpoint_point);
    const auto velocity_box = ordinary.history.velocity_hull(endpoint_point);
    const auto position_radii = component_radii(position_box);
    const auto velocity_radii = component_radii(velocity_box);
    const auto evaluation = joint_found->second.evaluate(
        endpoint, position_radii, velocity_radii);
    if (!evaluation.position_fallback_dominates ||
        !evaluation.velocity_fallback_dominates) {
      throw std::invalid_argument(
          "joint endpoint lift input exceeds ordinary fallback");
    }

    auto expanded =
        joint_found->second.with_appended_symbols(endpoint_symbols);
    JointAffineEndpointOverride lifted{
        .time = endpoint,
        .position_shared_symbol_coefficients =
            evaluation.position.shared_symbol_coefficients,
        .velocity_shared_symbol_coefficients =
            evaluation.velocity_shared_coefficients,
        .position_remainder_radii = {0.0, 0.0, 0.0},
        .velocity_remainder_radii = {0.0, 0.0, 0.0},
    };
    lifted.position_shared_symbol_coefficients.resize(
        expanded.symbol_registry().size(),
        std::array<double, 3>{0.0, 0.0, 0.0});
    lifted.velocity_shared_symbol_coefficients.resize(
        expanded.symbol_registry().size(),
        std::array<double, 3>{0.0, 0.0, 0.0});
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      const std::size_t position_symbol =
          input_registry.size() + 6U * path + 2U * axis;
      const std::size_t velocity_symbol = position_symbol + 1U;
      lifted.position_shared_symbol_coefficients[position_symbol][axis] =
          evaluation.position.independent_remainder_radii[axis];
      lifted.velocity_shared_symbol_coefficients[velocity_symbol][axis] =
          evaluation.velocity_remainder_radii[axis];
    }
    auto lifted_history = JointAffineRetainedHistory(
        ordinary.path_id, expanded.symbol_registry(), expanded.segments(),
        std::move(lifted));
    const auto check = lifted_history.evaluate(
        endpoint, position_radii, velocity_radii);
    if (!check.position_fallback_dominates ||
        !check.velocity_fallback_dominates) {
      throw std::invalid_argument(
          "joint endpoint lift exceeds ordinary fallback");
    }
    result.emplace(ordinary.path_id, std::move(lifted_history));
  }
  return result;
}

std::array<Interval, 4> coefficient_intervals(
    const std::array<std::string, 4>& tokens) {
  return {
      Interval::decimal_token(tokens[0]),
      Interval::decimal_token(tokens[1]),
      Interval::decimal_token(tokens[2]),
      Interval::decimal_token(tokens[3]),
  };
}

std::array<Interval, 4> rebase_cubic(
    const std::array<Interval, 4>& coefficients,
    const Interval& offset) {
  return {
      coefficients[0] + coefficients[1] * offset +
          coefficients[2] * interval_square(offset) +
          coefficients[3] * interval_square(offset) * offset,
      coefficients[1] + Interval::point(2.0) * coefficients[2] * offset +
          Interval::point(3.0) * coefficients[3] * interval_square(offset),
      coefficients[2] + Interval::point(3.0) * coefficients[3] * offset,
      coefficients[3],
  };
}

Interval evaluate_cubic(
    const std::array<Interval, 4>& coefficients,
    const Interval& local_time) {
  Interval result = coefficients[3];
  for (int index = 2; index >= 0; --index) {
    result = result * local_time + coefficients[static_cast<std::size_t>(index)];
  }
  return result;
}

Interval evaluate_cubic_velocity(
    const std::array<Interval, 4>& coefficients,
    const Interval& local_time) {
  Interval result = Interval::point(3.0) * coefficients[3];
  result = result * local_time + Interval::point(2.0) * coefficients[2];
  return result * local_time + coefficients[1];
}

struct MultiratePublication {
  std::vector<NativePublishedPath> histories;
  std::vector<NativePathLocalError> synchronization_errors;
  std::vector<std::string> coarse_path_ids;
};

MultiratePublication synchronized_multirate_histories(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& input_histories,
    const std::vector<NativePublishedPath>& full_histories,
    const std::vector<NativePublishedPath>& fine_histories,
    const std::vector<NativePathLocalError>& endpoint_errors) {
  MultiratePublication result{
      .histories = inflate_fine_histories(
          input_histories, fine_histories, endpoint_errors),
  };
  const double fraction = exact_decimal_value(
      request.multirate_synchronization_fraction);
  const double position_limit = fraction * tolerance_value(
      request.position_tolerance, "position tolerance");
  const double velocity_limit = fraction * tolerance_value(
      request.velocity_tolerance, "velocity tolerance");

  for (std::size_t path_index = 0; path_index < input_histories.size();
       ++path_index) {
    const auto& input = input_histories[path_index];
    const auto& full = path_history(full_histories, input.path_id);
    const auto& fine = path_history(fine_histories, input.path_id);
    const std::size_t first_new = input.history.segments().size();
    if (full.history.segments().size() != first_new + 1U ||
        fine.history.segments().size() != first_new + 2U) {
      throw std::invalid_argument(
          "multirate publication requires one full and two half segments");
    }
    const auto& coarse_segment = full.history.segments()[first_new];
    double dense_position_error = 0.0;
    double dense_velocity_error = 0.0;
    std::array<double, 3> dense_position_errors{};
    std::array<double, 3> dense_velocity_errors{};
    std::array<double, 3> maximum_fine_position_errors{};
    std::array<double, 3> maximum_fine_velocity_errors{};
    for (std::size_t half = 0; half < 2U; ++half) {
      const auto& fine_segment = fine.history.segments()[first_new + half];
      const Interval offset =
          fine_segment.t_start_interval() -
          coarse_segment.t_start_interval();
      const Interval fine_duration =
          fine_segment.t_end_interval() -
          fine_segment.t_start_interval();
      const Interval local_span(0.0, fine_duration.upper());
      for (std::size_t axis = 0; axis < 3U; ++axis) {
        const auto coarse_coefficients = rebase_cubic(
            coefficient_intervals(coarse_segment.coefficient_tokens()[axis]),
            offset);
        const auto fine_coefficients = coefficient_intervals(
            fine_segment.coefficient_tokens()[axis]);
        std::array<Interval, 4> difference{
            Interval::point(0.0), Interval::point(0.0),
            Interval::point(0.0), Interval::point(0.0)};
        for (std::size_t coefficient = 0; coefficient < 4U;
             ++coefficient) {
          difference[coefficient] =
              coarse_coefficients[coefficient] - fine_coefficients[coefficient];
        }
        dense_position_errors[axis] = std::max(
            dense_position_errors[axis],
            interval_absolute(evaluate_cubic(difference, local_span)).upper());
        dense_velocity_errors[axis] = std::max(
            dense_velocity_errors[axis],
            interval_absolute(
                evaluate_cubic_velocity(difference, local_span)).upper());
      }
      for (std::size_t axis = 0U; axis < 3U; ++axis) {
        maximum_fine_position_errors[axis] = std::max(
            maximum_fine_position_errors[axis],
            fine_segment.position_errors()[axis]);
        maximum_fine_velocity_errors[axis] = std::max(
            maximum_fine_velocity_errors[axis],
            fine_segment.velocity_errors()[axis]);
        dense_position_error = std::max(
            dense_position_error, dense_position_errors[axis]);
        dense_velocity_error = std::max(
            dense_velocity_error, dense_velocity_errors[axis]);
      }
    }
    result.synchronization_errors.push_back({
        input.path_id, dense_position_error, dense_velocity_error,
        dense_position_errors, dense_velocity_errors});
    if (dense_position_error > position_limit ||
        dense_velocity_error > velocity_limit) {
      continue;
    }
    HistoryErrorTokens coarse_position_error_tokens{};
    HistoryErrorTokens coarse_velocity_error_tokens{};
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      coarse_position_error_tokens[axis] = error_token(std::max(
          coarse_segment.position_errors()[axis],
          maximum_fine_position_errors[axis] + dense_position_errors[axis]));
      coarse_velocity_error_tokens[axis] = error_token(std::max(
          coarse_segment.velocity_errors()[axis],
          maximum_fine_velocity_errors[axis] + dense_velocity_errors[axis]));
    }
    RetainedHistory coarse_history = input.history.appended(
        CubicHistorySegment(
            coarse_segment.t_start_token(), coarse_segment.t_end_token(),
            coarse_segment.coefficient_tokens(),
            coarse_position_error_tokens, coarse_velocity_error_tokens));
    result.histories[path_index] = {
        input.path_id, std::move(coarse_history)};
    result.coarse_path_ids.push_back(input.path_id);
  }
  return result;
}

NativeCorrectedSubstepCertificate failed_substep_certificate(
    const std::string& start_time,
    const std::string& end_time,
    NativeAccelerationSnapshotCertificate start_snapshot,
    std::optional<NativeAccelerationSnapshotCertificate> endpoint_snapshot,
    std::size_t correction_iterations,
    std::optional<double> correction_error,
    const std::string& failure_code,
    const std::optional<std::vector<NativePublishedPath>>& candidate_histories,
    std::vector<NativePinnedFoldTemporalStepCertificate>
        pinned_fold_onset_certificates = {}) {
  return {
      .schema = "eom_native_corrected_substep_certificate/v1",
      .status = "rejected",
      .start_time = start_time,
      .end_time = end_time,
      .start_snapshot = std::move(start_snapshot),
      .endpoint_snapshot = std::move(endpoint_snapshot),
      .correction_iterations = correction_iterations,
      .correction_error = correction_error,
      .failure_code = failure_code,
      .event_impulses = {},
      .regulator_convergence_certificates = {},
      .endpoint_root_continuations = {},
      .pinned_fold_onset_certificates =
          std::move(pinned_fold_onset_certificates),
      .candidate_history_fingerprints =
          candidate_histories.has_value()
              ? fingerprints(*candidate_histories)
              : std::vector<NativeHistoryFingerprint>{},
  };
}

std::vector<NativePinnedFoldTemporalStepCertificate>
certified_pinned_fold_onset_certificates(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    const NativeAccelerationSnapshotCertificate& start_snapshot,
    const std::string& start_time) {
  std::vector<NativePinnedFoldTemporalStepCertificate> result;
  if (!request.use_pinned_fold_aware_temporal_step ||
      !request.use_analytic_pinned_fold ||
      request.chart_policy != "sharp_with_finite_width_fallback" ||
      start_snapshot.status != "certified_complete") {
    return result;
  }
  for (const auto& path : histories) {
    const auto& circular =
        path.history.uniform_circular_endpoint_certificate();
    if (!circular.has_value() ||
        !numeric_equal(circular->valid_reception_time, start_time) ||
        !numeric_equal(circular->tangential_speed, request.field_speed)) {
      continue;
    }
    const auto root = std::find_if(
        start_snapshot.root_certificates.begin(),
        start_snapshot.root_certificates.end(), [&](const auto& row) {
          return row.receiver_path_id == path.path_id &&
              row.transmitter_path_id == path.path_id;
        });
    if (root == start_snapshot.root_certificates.end() ||
        root->certificate.status != "certified_complete" ||
        !root->certificate.root_free_complement ||
        root->certificate.memory_boundary_contact ||
        !root->certificate.coincident_endpoint_excluded ||
        !root->certificate.roots.empty() ||
        snapshot_pair(start_snapshot, path.path_id, path.path_id).chart !=
            "sharp") {
      continue;
    }
    result.push_back({
        .schema = "eom_native_pinned_fold_temporal_step_certificate/v1",
        .status = "certified_complete",
        .path_id = path.path_id,
        .onset_time = start_time,
        .history_fingerprint = path.history.provenance_fingerprint(),
        .tangential_speed = circular->tangential_speed,
        .field_speed = request.field_speed,
        .start_root_status = root->certificate.status,
        .start_root_count = root->certificate.roots.size(),
        .start_root_free_complement =
            root->certificate.root_free_complement,
        .memory_boundary_clear = !root->certificate.memory_boundary_contact,
        .coincident_endpoint_excluded =
            root->certificate.coincident_endpoint_excluded,
        .start_acceleration_chart = "sharp",
        .temporal_rule =
            "right_endpoint_acceleration_on_measure_zero_onset",
    });
  }
  return result;
}

SubstepAttempt corrected_substep_impl(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    const std::string& start_time,
    const std::string& end_time,
    NativeCorrectedSubstepTiming* timing,
    const NativeAccelerationSnapshotCertificate* reusable_start_snapshot,
    bool defer_endpoint_root_precision_escalation) {
  NativeAccelerationSnapshotCertificate start_snapshot;
  if (reusable_start_snapshot != nullptr) {
    if (!snapshot_evaluation_succeeded(request, *reusable_start_snapshot) ||
        !numeric_equal(reusable_start_snapshot->reception_time, start_time) ||
        reusable_start_snapshot->root_certificates.size() !=
            histories.size() * histories.size()) {
      throw std::invalid_argument(
          "reusable start snapshot does not match the requested substep");
    }
    for (const auto& row : reusable_start_snapshot->root_certificates) {
      const auto& receiver = path_history(histories, row.receiver_path_id);
      const auto& source = path_history(histories, row.transmitter_path_id);
      if (row.certificate.receiver_history_fingerprint !=
              receiver.history.provenance_fingerprint() ||
          row.certificate.transmitter_history_fingerprint !=
              source.history.provenance_fingerprint()) {
        throw std::invalid_argument(
            "reusable start snapshot history fingerprints do not match");
      }
    }
    start_snapshot = *reusable_start_snapshot;
    start_snapshot.timing = {};
    ++timing->reused_start_snapshot_count;
  } else {
    start_snapshot = certify_native_acceleration_snapshot(
        request, histories, start_time);
    accumulate_substep_snapshot_timing(*timing, start_snapshot);
  }
  if (!snapshot_evaluation_succeeded(request, start_snapshot)) {
    const std::string failure =
        !request.adjudicated_finite_width_pairs.empty()
        ? "caustic_entry_not_certified"
        : (start_snapshot.failure_code.empty()
            ? "root_completeness_not_certified"
            : start_snapshot.failure_code);
    return {
        failed_substep_certificate(
            start_time, end_time, std::move(start_snapshot), std::nullopt, 0,
            std::nullopt, failure, std::nullopt),
        std::nullopt,
    };
  }
  const auto pinned_fold_onset_certificates =
      certified_pinned_fold_onset_certificates(
          request, histories, start_snapshot, start_time);
  std::set<std::string> pinned_fold_onset_path_set;
  for (const auto& certificate : pinned_fold_onset_certificates) {
    pinned_fold_onset_path_set.insert(certificate.path_id);
  }
  const bool joint_enabled = !request.joint_histories.empty();
  JointAccelerationAffineStates start_joint_states;
  if (joint_enabled) {
    const auto joint_start = certify_joint_acceleration_snapshot(
        Interval::decimal_token(request.field_speed), start_snapshot,
        histories, request.joint_histories);
    if (!joint_start.certified) {
      return {
          failed_substep_certificate(
              start_time, end_time, std::move(start_snapshot), std::nullopt,
              0U, std::nullopt, joint_start.failure_code, std::nullopt,
              pinned_fold_onset_certificates),
          std::nullopt,
          std::nullopt,
      };
    }
    start_joint_states = joint_acceleration_states(joint_start);
  }
  const SnapshotTotals start_totals = snapshot_totals(start_snapshot);
  auto predictor_histories = append_candidate_segments(
      histories, start_time, end_time, start_totals, start_totals, {},
      timing);
  std::map<std::string, JointAffineRetainedHistory>
      predictor_joint_histories;
  auto predictor_request = request;
  if (joint_enabled) {
    predictor_joint_histories = append_joint_candidate_segments(
        histories, request.joint_histories, start_time, end_time,
        start_joint_states, start_joint_states, {});
    predictor_request.joint_histories = predictor_joint_histories;
  }
  auto predictor_snapshot = certify_native_acceleration_snapshot(
      predictor_request, predictor_histories, end_time,
      request.use_warm_root_exclusion ? &start_snapshot : nullptr,
      request.use_warm_root_exclusion ? &histories : nullptr,
      defer_endpoint_root_precision_escalation);
  accumulate_substep_snapshot_timing(*timing, predictor_snapshot);
  if (!snapshot_evaluation_succeeded(request, predictor_snapshot)) {
    const std::string failure =
        !request.adjudicated_finite_width_pairs.empty()
        ? "caustic_exit_not_certified"
        : (predictor_snapshot.failure_code.empty()
            ? "root_completeness_not_certified"
            : predictor_snapshot.failure_code);
    if (request.failed_substep_candidate_callback) {
      request.failed_substep_candidate_callback(
          start_time, end_time, failure, 0U, predictor_histories);
    }
    return {
        failed_substep_certificate(
            start_time, end_time, std::move(start_snapshot),
            std::move(predictor_snapshot), 0, std::nullopt, failure,
            predictor_histories, pinned_fold_onset_certificates),
        std::nullopt,
    };
  }

  SnapshotTotals endpoint_guess = snapshot_totals(predictor_snapshot);
  JointAccelerationAffineStates endpoint_joint_guess;
  if (joint_enabled) {
    const auto joint_predictor = certify_joint_acceleration_snapshot(
        Interval::decimal_token(request.field_speed), predictor_snapshot,
        predictor_histories, predictor_joint_histories);
    if (!joint_predictor.certified) {
      return {
          failed_substep_certificate(
              start_time, end_time, std::move(start_snapshot),
              std::move(predictor_snapshot), 0U, std::nullopt,
              joint_predictor.failure_code, predictor_histories,
              pinned_fold_onset_certificates),
          std::nullopt,
          std::nullopt,
      };
    }
    endpoint_joint_guess = joint_acceleration_states(joint_predictor);
  }
  auto last_histories = predictor_histories;
  auto last_snapshot = predictor_snapshot;
  std::optional<double> correction_error;
  const double correction_tolerance = tolerance_value(
      request.correction_tolerance, "correction tolerance");
  for (std::size_t iteration = 1;
       iteration <= request.max_correction_iterations; ++iteration) {
    auto candidate_histories = append_candidate_segments(
        histories, start_time, end_time, start_totals, endpoint_guess,
        pinned_fold_onset_path_set, timing);
    std::map<std::string, JointAffineRetainedHistory>
        candidate_joint_histories;
    auto candidate_request = request;
    if (joint_enabled) {
      candidate_joint_histories = append_joint_candidate_segments(
          histories, request.joint_histories, start_time, end_time,
          start_joint_states, endpoint_joint_guess,
          pinned_fold_onset_path_set);
      candidate_request.joint_histories = candidate_joint_histories;
    }
    auto endpoint_snapshot = certify_native_acceleration_snapshot(
        candidate_request, candidate_histories, end_time,
        request.use_warm_root_exclusion ? &last_snapshot : nullptr,
        request.use_warm_root_exclusion ? &last_histories : nullptr,
        defer_endpoint_root_precision_escalation);
    accumulate_substep_snapshot_timing(*timing, endpoint_snapshot);
    if (!snapshot_evaluation_succeeded(request, endpoint_snapshot)) {
      const std::string failure =
          !request.adjudicated_finite_width_pairs.empty()
          ? "caustic_exit_not_certified"
          : (endpoint_snapshot.failure_code.empty()
              ? "root_completeness_not_certified"
              : endpoint_snapshot.failure_code);
      if (request.failed_substep_candidate_callback) {
        request.failed_substep_candidate_callback(
            start_time, end_time, failure, iteration, candidate_histories);
      }
      return {
          failed_substep_certificate(
              start_time, end_time, std::move(start_snapshot),
              std::move(endpoint_snapshot), iteration, correction_error,
              failure, candidate_histories, pinned_fold_onset_certificates),
          std::nullopt,
      };
    }
    const SnapshotTotals evaluated = snapshot_totals(endpoint_snapshot);
    JointAccelerationAffineStates evaluated_joint_states;
    if (joint_enabled) {
      const auto evaluated_joint = certify_joint_acceleration_snapshot(
          Interval::decimal_token(request.field_speed), endpoint_snapshot,
          candidate_histories, candidate_joint_histories);
      if (!evaluated_joint.certified) {
        return {
            failed_substep_certificate(
                start_time, end_time, std::move(start_snapshot),
                std::move(endpoint_snapshot), iteration, correction_error,
                evaluated_joint.failure_code, candidate_histories,
                pinned_fold_onset_certificates),
            std::nullopt,
            std::nullopt,
        };
      }
      evaluated_joint_states = joint_acceleration_states(evaluated_joint);
    }
    correction_error = acceleration_correction_error(endpoint_guess, evaluated);
    last_histories = candidate_histories;
    last_snapshot = endpoint_snapshot;
    const bool joint_center_settled =
        !joint_enabled || *correction_error <= 1e-13;
    if (*correction_error <= correction_tolerance && joint_center_settled) {
      std::optional<std::map<std::string, JointAffineRetainedHistory>>
          contracted_joint_histories;
      if (joint_enabled) {
        const auto contraction = contract_joint_endpoint(
            request, histories, candidate_histories, start_time, end_time,
            endpoint_snapshot, start_joint_states, endpoint_joint_guess,
            endpoint_guess, pinned_fold_onset_path_set);
        if (!contraction.certified) {
          return {
              failed_substep_certificate(
                  start_time, end_time, std::move(start_snapshot),
                  std::move(endpoint_snapshot), iteration, correction_error,
                  contraction.failure_code, candidate_histories,
                  pinned_fold_onset_certificates),
              std::nullopt,
              std::nullopt,
          };
        }
        contracted_joint_histories = contraction.histories;
      }
      std::vector<NativeFoldCausticImpulseCertificate> event_impulses;
      std::vector<NativeRegulatorConvergenceCertificate>
          regulator_convergence_certificates;
      std::vector<std::pair<std::string, std::string>> routed_event_pairs;
      std::vector<NativeEndpointRootContinuationCertificate>
          endpoint_root_continuations;
      auto event_pairs = changed_topology_pairs(
          start_snapshot, endpoint_snapshot);
      const auto topology_event_pairs = event_pairs;
      std::set<std::pair<std::string, std::string>> event_pair_index(
          event_pairs.begin(), event_pairs.end());
      const std::set<std::pair<std::string, std::string>>
          topology_event_pair_index(
              topology_event_pairs.begin(), topology_event_pairs.end());
      for (const auto& pair : request.adjudicated_finite_width_pairs) {
        if (event_pair_index.insert(pair).second) {
          event_pairs.push_back(pair);
        }
      }
      const auto append_finite_width_pairs = [&](const auto& snapshot) {
        for (const auto& pair : finite_width_pairs(snapshot)) {
          if (pair.first == pair.second &&
              !pair_is_adjudicated_finite_width(
                  request, pair.first, pair.second)) {
            continue;
          }
          if (event_pair_index.insert(pair).second) {
            event_pairs.push_back(pair);
          }
        }
      };
      append_finite_width_pairs(start_snapshot);
      append_finite_width_pairs(endpoint_snapshot);
      if (!event_pairs.empty()) {
        if (request.chart_policy == "sharp") {
          return {
              failed_substep_certificate(
                  start_time, end_time, std::move(start_snapshot),
                  std::move(endpoint_snapshot), iteration, correction_error,
                  "root_event_requires_subdivision", candidate_histories,
                  pinned_fold_onset_certificates),
              std::nullopt,
          };
        }
        for (const auto& [receiver_id, transmitter_id] : event_pairs) {
          const bool topology_changed = topology_event_pair_index.contains(
              std::make_pair(receiver_id, transmitter_id));
          if (topology_changed) {
            const auto endpoint_continuation =
                certify_coincident_endpoint_root_continuation_impl(
                    start_snapshot, endpoint_snapshot,
                    receiver_id, transmitter_id);
            if (endpoint_continuation.has_value()) {
              endpoint_root_continuations.push_back(*endpoint_continuation);
              auto failed = failed_substep_certificate(
                  start_time, end_time, std::move(start_snapshot),
                  std::move(endpoint_snapshot), iteration, correction_error,
                  "coincident_same_transmitter_birth_uncertified",
                  candidate_histories, pinned_fold_onset_certificates);
              failed.endpoint_root_continuations =
                  std::move(endpoint_root_continuations);
              if (request.failed_substep_candidate_callback) {
                request.failed_substep_candidate_callback(
                    start_time, end_time,
                    "coincident_same_transmitter_birth_uncertified", iteration,
                    candidate_histories);
              }
              return {std::move(failed), std::nullopt};
            }
          }
          const auto pair_request = receiver_pair_budget_request(
              request, event_pairs, receiver_id);
          const JointAffineRetainedHistory* event_joint_receiver =
              joint_enabled
              ? &candidate_joint_histories.at(receiver_id)
              : nullptr;
          const JointAffineRetainedHistory* event_joint_transmitter =
              joint_enabled
              ? &candidate_joint_histories.at(transmitter_id)
              : nullptr;
          const auto regulator_timing_start = SteadyClock::now();
          auto regulator = certify_native_regulator_convergence(
              pair_request,
              path_history(candidate_histories, receiver_id),
              path_history(candidate_histories, transmitter_id),
              path_charge(request, receiver_id),
              path_charge(request, transmitter_id),
              start_time, end_time,
              event_joint_receiver, event_joint_transmitter);
          timing->regulator_ladder_wall_seconds +=
              elapsed_seconds(regulator_timing_start);
          auto event = regulator.accepted_event_impulse;
          if (regulator.status != "certified_convergent" ||
              event.status != "certified_complete" ||
              !event.impulse.has_value() ||
              !event.position_moment.has_value()) {
            const std::string failure =
                event.failure_code == "insufficient_history_depth"
                ? "insufficient_history_depth"
                : "caustic_eta_convergence_failed";
            event_impulses.push_back(std::move(event));
            regulator_convergence_certificates.push_back(
                std::move(regulator));
            auto failed = failed_substep_certificate(
                start_time, end_time, std::move(start_snapshot),
                std::move(endpoint_snapshot), iteration, correction_error,
                failure, candidate_histories,
                pinned_fold_onset_certificates);
            failed.event_impulses = std::move(event_impulses);
            failed.regulator_convergence_certificates =
                std::move(regulator_convergence_certificates);
            failed.endpoint_root_continuations =
                std::move(endpoint_root_continuations);
            if (request.failed_substep_candidate_callback) {
              request.failed_substep_candidate_callback(
                  start_time, end_time, failure, iteration,
                  candidate_histories);
            }
            return {std::move(failed), std::nullopt};
          }
          event_impulses.push_back(std::move(event));
          regulator_convergence_certificates.push_back(
              std::move(regulator));
          routed_event_pairs.emplace_back(receiver_id, transmitter_id);
        }
      }
      std::vector<NativeFiniteWidthStateCertificate> state_certificates;
      if (!routed_event_pairs.empty()) {
        auto event_histories = candidate_histories;
        auto event_endpoint_snapshot = endpoint_snapshot;
        EventAwareCandidate assembly;
        bool state_settled = false;
        for (std::size_t event_iteration = 0;
             event_iteration < request.max_correction_iterations;
             ++event_iteration) {
          assembly = append_event_aware_candidate_segments(
              histories, start_time, end_time, start_snapshot,
              event_endpoint_snapshot, routed_event_pairs, event_impulses,
              timing);
          const Interval endpoint =
              Interval::point(scalar_token(end_time));
          state_settled = true;
          for (const auto& [receiver_id, transmitter_id] : routed_event_pairs) {
            static_cast<void>(transmitter_id);
            const auto& candidate = path_history(
                event_histories, receiver_id);
            const IntervalVector candidate_position = midpoint_vector(
                candidate.history.position_hull(endpoint));
            const IntervalVector candidate_velocity = midpoint_vector(
                candidate.history.velocity_hull(endpoint));
            state_settled = state_settled && vector_contains(
                assembly.endpoint_positions.at(receiver_id),
                candidate_position) && vector_contains(
                assembly.endpoint_velocities.at(receiver_id),
                candidate_velocity);
          }
          if (state_settled) break;

          event_histories = std::move(assembly.histories);
          event_endpoint_snapshot = certify_native_acceleration_snapshot(
              request, event_histories, end_time,
              request.use_warm_root_exclusion ? &endpoint_snapshot : nullptr,
              request.use_warm_root_exclusion ? &candidate_histories : nullptr,
              defer_endpoint_root_precision_escalation);
          accumulate_substep_snapshot_timing(
              *timing, event_endpoint_snapshot);
          if (!snapshot_evaluation_succeeded(
                  request, event_endpoint_snapshot)) {
            auto failed = failed_substep_certificate(
                start_time, end_time, start_snapshot,
                event_endpoint_snapshot, iteration + event_iteration + 1U,
                correction_error, "caustic_state_reconstruction_failed",
                event_histories, pinned_fold_onset_certificates);
            failed.event_impulses = event_impulses;
            failed.regulator_convergence_certificates =
                regulator_convergence_certificates;
            failed.endpoint_root_continuations = endpoint_root_continuations;
            return {std::move(failed), std::nullopt};
          }
          std::vector<NativeFoldCausticImpulseCertificate> refined_events;
          std::vector<NativeRegulatorConvergenceCertificate>
              refined_regulators;
          for (const auto& [receiver_id, transmitter_id] : routed_event_pairs) {
            const auto pair_request = receiver_pair_budget_request(
                request, routed_event_pairs, receiver_id);
            const auto regulator_timing_start = SteadyClock::now();
            auto regulator = certify_native_regulator_convergence(
                pair_request, path_history(event_histories, receiver_id),
                path_history(event_histories, transmitter_id),
                path_charge(request, receiver_id),
                path_charge(request, transmitter_id), start_time, end_time);
            timing->regulator_ladder_wall_seconds +=
                elapsed_seconds(regulator_timing_start);
            if (regulator.status != "certified_convergent" ||
                regulator.accepted_event_impulse.status !=
                    "certified_complete" ||
                !regulator.accepted_event_impulse.impulse.has_value() ||
                !regulator.accepted_event_impulse.position_moment.has_value()) {
              refined_events.push_back(regulator.accepted_event_impulse);
              refined_regulators.push_back(std::move(regulator));
              auto failed = failed_substep_certificate(
                  start_time, end_time, start_snapshot,
                  event_endpoint_snapshot,
                  iteration + event_iteration + 1U, correction_error,
                  "caustic_eta_convergence_failed", event_histories,
                  pinned_fold_onset_certificates);
              failed.event_impulses = std::move(refined_events);
              failed.regulator_convergence_certificates =
                  std::move(refined_regulators);
              failed.endpoint_root_continuations =
                  endpoint_root_continuations;
              if (request.failed_substep_candidate_callback) {
                request.failed_substep_candidate_callback(
                    start_time, end_time,
                    "caustic_eta_convergence_failed",
                    iteration + event_iteration + 1U,
                    event_histories);
              }
              return {std::move(failed), std::nullopt};
            }
            refined_events.push_back(regulator.accepted_event_impulse);
            refined_regulators.push_back(std::move(regulator));
          }
          event_impulses = std::move(refined_events);
          regulator_convergence_certificates =
              std::move(refined_regulators);
        }
        if (!state_settled) {
          auto failed = failed_substep_certificate(
              start_time, end_time, start_snapshot, event_endpoint_snapshot,
              request.max_correction_iterations, correction_error,
              "caustic_correction_failed", event_histories,
              pinned_fold_onset_certificates);
          failed.event_impulses = event_impulses;
          failed.regulator_convergence_certificates =
              regulator_convergence_certificates;
          failed.endpoint_root_continuations = endpoint_root_continuations;
          return {std::move(failed), std::nullopt};
        }

        const Interval endpoint = Interval::point(scalar_token(end_time));
        for (const auto& [receiver_id, transmitter_id] : routed_event_pairs) {
          const auto& candidate = path_history(event_histories, receiver_id);
          const auto pair_request = receiver_pair_budget_request(
              request, routed_event_pairs, receiver_id);
          const auto receiver_pair_count = static_cast<std::size_t>(
              std::count_if(
                  routed_event_pairs.begin(), routed_event_pairs.end(),
                  [&](const auto& pair) {
                    return pair.first == receiver_id;
                  }));
          const double impulse_row_budget = tolerance_value(
              pair_request.event_impulse_budget,
              "event impulse row budget");
          const double moment_row_budget = tolerance_value(
              pair_request.event_position_moment_budget,
              "event position-moment row budget");
          const auto row_token = [&](double total,
                                     const std::string& fraction) {
            return shortest_decimal_token(
                downward_nonnegative_product(
                    total, exact_decimal_value(fraction)));
          };
          NativeFiniteWidthStateCertificate state{
              .status = "uncertified",
              .receiver_path_id = receiver_id,
              .transmitter_path_id = transmitter_id,
              .reception_lower = start_time,
              .reception_upper = end_time,
              .receiver_routed_pair_count = receiver_pair_count,
              .receiver_pair_allocation_weight =
                  1.0 / static_cast<double>(receiver_pair_count),
              .receiver_event_impulse_total = request.event_impulse_budget,
              .receiver_event_position_moment_total =
                  request.event_position_moment_budget,
              .event_impulse_row_budget = pair_request.event_impulse_budget,
              .event_position_moment_row_budget =
                  pair_request.event_position_moment_budget,
              .quadrature_impulse_row_budget = row_token(
                  impulse_row_budget, request.event_quadrature_fraction),
              .quadrature_position_moment_row_budget = row_token(
                  moment_row_budget, request.event_quadrature_fraction),
              .causal_regulator_impulse_row_budget = row_token(
                  impulse_row_budget,
                  request.event_causal_regulator_fraction),
              .causal_regulator_position_moment_row_budget = row_token(
                  moment_row_budget,
                  request.event_causal_regulator_fraction),
              .core_regulator_impulse_row_budget = row_token(
                  impulse_row_budget, request.event_core_regulator_fraction),
              .core_regulator_position_moment_row_budget = row_token(
                  moment_row_budget, request.event_core_regulator_fraction),
              .state_numerical_impulse_row_budget = row_token(
                  impulse_row_budget, request.event_state_numerical_fraction),
              .state_numerical_position_moment_row_budget = row_token(
                  moment_row_budget, request.event_state_numerical_fraction),
              .matching_impulse_row_budget = row_token(
                  impulse_row_budget, request.event_matching_fraction),
              .matching_position_moment_row_budget = row_token(
                  moment_row_budget, request.event_matching_fraction),
              .routed_pair_pinned = true,
              .event_pair_excluded_from_background = true,
              .background_impulse =
                  assembly.background_impulses.at(receiver_id),
              .background_position_moment =
                  assembly.background_position_moments.at(receiver_id),
              .reconstructed_endpoint_position =
                  assembly.endpoint_positions.at(receiver_id),
              .reconstructed_endpoint_velocity =
                  assembly.endpoint_velocities.at(receiver_id),
              .candidate_endpoint_position =
                  midpoint_vector(candidate.history.position_hull(endpoint)),
              .candidate_endpoint_velocity =
                  midpoint_vector(candidate.history.velocity_hull(endpoint)),
              .endpoint_reconstruction_passed = true,
          };
          const auto common_domain_timing_start = SteadyClock::now();
          state.common_domains = certify_common_domains(
              pair_request, event_histories, start_snapshot,
              event_endpoint_snapshot, receiver_id, transmitter_id,
              start_time, end_time);
          timing->common_domain_wall_seconds +=
              elapsed_seconds(common_domain_timing_start);
          state.common_domain_chart_overlap_passed = std::any_of(
              state.common_domains.begin(), state.common_domains.end(),
              [](const auto& row) {
                return row.status == "certified_regulator_match";
              });
          state.exit_passed = certify_finite_width_exit(
              request, event_histories, event_endpoint_snapshot,
              receiver_id, transmitter_id);
          if (!state.common_domain_chart_overlap_passed) {
            state.failure_code = "caustic_state_reconstruction_failed";
          } else if (!state.exit_passed) {
            state.failure_code = "caustic_exit_not_certified";
            if (request.allow_pending_finite_width_exit) {
              state.status = "certified_state_exit_pending";
            }
          } else {
            state.status = "certified_complete";
          }
          state_certificates.push_back(std::move(state));
        }
        const auto failed_state = std::find_if(
            state_certificates.begin(), state_certificates.end(),
            [&](const auto& state) {
              return state.status != "certified_complete" &&
                  !(request.allow_pending_finite_width_exit &&
                    state.status == "certified_state_exit_pending");
            });
        if (failed_state != state_certificates.end()) {
          const std::string failure = failed_state->failure_code;
          auto failed = failed_substep_certificate(
              start_time, end_time, start_snapshot, event_endpoint_snapshot,
              iteration, correction_error, failure, event_histories,
              pinned_fold_onset_certificates);
          failed.event_impulses = event_impulses;
          failed.regulator_convergence_certificates =
              regulator_convergence_certificates;
          failed.endpoint_root_continuations = endpoint_root_continuations;
          failed.finite_width_state_certificates = state_certificates;
          return {std::move(failed), std::nullopt};
        }
        candidate_histories = std::move(event_histories);
        endpoint_snapshot = std::move(event_endpoint_snapshot);
      }
      NativeCorrectedSubstepCertificate certificate{
          .schema = "eom_native_corrected_substep_certificate/v1",
          .status = "accepted_candidate",
          .start_time = start_time,
          .end_time = end_time,
          .start_snapshot = std::move(start_snapshot),
          .endpoint_snapshot = std::move(endpoint_snapshot),
          .correction_iterations = iteration,
          .correction_error = correction_error,
          .failure_code = "",
          .event_impulses = std::move(event_impulses),
          .regulator_convergence_certificates =
              std::move(regulator_convergence_certificates),
          .endpoint_root_continuations =
              std::move(endpoint_root_continuations),
          .pinned_fold_onset_certificates = pinned_fold_onset_certificates,
          .finite_width_state_certificates =
              std::move(state_certificates),
          .candidate_history_fingerprints = fingerprints(candidate_histories),
      };
      return {
          std::move(certificate), std::move(candidate_histories),
          std::move(contracted_joint_histories)};
    }
    endpoint_guess = evaluated;
    if (joint_enabled) {
      endpoint_joint_guess = std::move(evaluated_joint_states);
    }
  }
  auto failed = failed_substep_certificate(
      start_time, end_time, std::move(start_snapshot),
      std::move(last_snapshot), request.max_correction_iterations,
      correction_error,
      request.adjudicated_finite_width_pairs.empty()
          ? "coupled_correction_failed"
          : "caustic_correction_failed",
      last_histories, pinned_fold_onset_certificates);
  if (!request.adjudicated_finite_width_pairs.empty()) {
    for (const auto& [receiver_id, transmitter_id] :
         request.adjudicated_finite_width_pairs) {
      const auto pair_request = receiver_pair_budget_request(
          request, request.adjudicated_finite_width_pairs, receiver_id);
      const auto regulator_timing_start = SteadyClock::now();
      auto regulator = certify_native_regulator_convergence(
          pair_request,
          path_history(last_histories, receiver_id),
          path_history(last_histories, transmitter_id),
          path_charge(request, receiver_id),
          path_charge(request, transmitter_id),
          start_time, end_time);
      timing->regulator_ladder_wall_seconds +=
          elapsed_seconds(regulator_timing_start);
      failed.event_impulses.push_back(regulator.accepted_event_impulse);
      if (regulator.status != "certified_convergent") {
        failed.failure_code = "caustic_eta_convergence_failed";
      }
      failed.regulator_convergence_certificates.push_back(
          std::move(regulator));
    }
  }
  return {std::move(failed), std::nullopt};
}

SubstepAttempt corrected_substep(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    const std::string& start_time,
    const std::string& end_time,
    const NativeAccelerationSnapshotCertificate* reusable_start_snapshot =
        nullptr,
    bool defer_endpoint_root_precision_escalation = false) {
  const auto timing_start = SteadyClock::now();
  NativeCorrectedSubstepTiming timing;
  auto attempt = corrected_substep_impl(
      request, histories, start_time, end_time, &timing,
      reusable_start_snapshot, defer_endpoint_root_precision_escalation);
  timing.total_wall_seconds = elapsed_seconds(timing_start);
  attempt.certificate.timing = timing;
  return attempt;
}

void validate_request(const NativeCoupledEvolutionRequest& request) {
  if (request.run_id.empty() || request.paths.empty()) {
    throw std::invalid_argument(
        "coupled evolution requires a run identity and paths");
  }
  if (request.memory_budget_bytes == 0U) {
    throw std::invalid_argument("coupled evolution memory budget must be positive");
  }
  std::set<std::string> ids;
  std::set<std::string> history_ids;
  for (const auto& path : request.paths) {
    if (path.path_id.empty() || !ids.insert(path.path_id).second) {
      throw std::invalid_argument(
          "coupled evolution path identities must be nonempty and unique");
    }
    if (!history_ids.insert(path.history.history_id()).second) {
      throw std::invalid_argument(
          "coupled evolution history identities must be unique");
    }
    const Interval charge = Interval::decimal_token(path.charge);
    if (charge.contains_zero()) {
      throw std::invalid_argument("coupled evolution charges require certified sign");
    }
    if (!numeric_equal(path.history.segments().back().t_end_token(),
                       request.start_time)) {
      throw std::invalid_argument(
          "input histories must end exactly at the evolution start");
    }
    if (!(path.history.t_start() < scalar_token(request.start_time))) {
      throw std::invalid_argument("each path requires positive retained prehistory");
    }
  }
  const double start = scalar_token(request.start_time);
  const double end = scalar_token(request.end_time);
  const double initial_step = scalar_token(request.initial_step);
  const double minimum_step = scalar_token(request.minimum_step);
  const double maximum_step = request.maximum_step.empty()
      ? initial_step
      : scalar_token(request.maximum_step);
  if (!(end > start) || !(initial_step > 0.0) || !(minimum_step > 0.0) ||
      !(maximum_step > 0.0) || minimum_step > initial_step ||
      initial_step > maximum_step) {
    throw std::invalid_argument("invalid coupled evolution time or step domain");
  }
  const bool has_certified_budget =
      !request.certified_budget_schema.empty() ||
      !request.certified_budget_preset_id.empty() ||
      !request.certified_budget_allocation_hash.empty() ||
      !request.certified_budget_allocation_json.empty();
  if (has_certified_budget) {
    if (request.certified_budget_schema != "borg_certified_budget/v1" ||
        request.certified_budget_preset_id.empty() ||
        request.certified_budget_allocation_hash.size() != 64U ||
        request.certified_budget_allocation_json.size() < 2U ||
        request.certified_budget_allocation_json.front() != '{' ||
        request.certified_budget_allocation_json.back() != '}' ||
        request.certified_budget_allocation_json.find_first_of("\t\r\n") !=
            std::string::npos) {
      throw std::invalid_argument(
          "certified budget provenance is incomplete or malformed");
    }
    const auto hexadecimal = [](char value) {
      return (value >= '0' && value <= '9') ||
          (value >= 'a' && value <= 'f');
    };
    if (!std::all_of(
            request.certified_budget_allocation_hash.begin(),
            request.certified_budget_allocation_hash.end(), hexadecimal)) {
      throw std::invalid_argument(
          "certified budget allocation hash must be lowercase SHA-256");
    }
    const double quadrature = exact_decimal_value(
        request.event_quadrature_fraction);
    const double causal_regulator = exact_decimal_value(
        request.event_causal_regulator_fraction);
    const double core_regulator = exact_decimal_value(
        request.event_core_regulator_fraction);
    const double state_numerical = exact_decimal_value(
        request.event_state_numerical_fraction);
    const double matching = exact_decimal_value(
        request.event_matching_fraction);
    const double fraction_sum = quadrature + causal_regulator +
        core_regulator + state_numerical + matching;
    if (quadrature <= 0.0 || causal_regulator <= 0.0 ||
        core_regulator <= 0.0 || state_numerical <= 0.0 ||
        matching <= 0.0 || std::abs(fraction_sum - 1.0) > 1e-12 ||
        exact_decimal_value(request.independent_overlap_budget) != 0.0 ||
        request.deterministic_reduction_policy != "fixed-pairwise" ||
        request.rounding_mode != "outward" ||
        request.receiver_event_allocation_rule !=
            "equal-routed-pair-weight/v1") {
      throw std::invalid_argument(
          "certified event budget allocation does not close");
    }
    const double acceleration = tolerance_value(
        request.acceleration_tolerance, "acceleration tolerance");
    const double correction = tolerance_value(
        request.correction_tolerance, "correction tolerance");
    const double ordinary_position = tolerance_value(
        request.position_tolerance, "position tolerance");
    const double ordinary_velocity = tolerance_value(
        request.velocity_tolerance, "velocity tolerance");
    const double event_impulse = tolerance_value(
        request.event_impulse_budget, "event impulse budget");
    const double event_moment = tolerance_value(
        request.event_position_moment_budget,
        "event position-moment budget");
    const double position_bound = ordinary_position +
        0.5 * maximum_step * maximum_step * (acceleration + correction) +
        event_moment;
    const double velocity_bound = ordinary_velocity +
        maximum_step * (acceleration + correction) + event_impulse;
    if (!(position_bound < tolerance_value(
              request.position_increment_budget,
              "position increment budget")) ||
        !(velocity_bound < tolerance_value(
              request.velocity_increment_budget,
              "velocity increment budget"))) {
      throw std::invalid_argument(
          "certified state increment allocation exceeds its top-level bound");
    }
  }
  tolerance_value(request.field_speed, "field speed");
  tolerance_value(request.coupling, "coupling");
  tolerance_value(request.root_tolerance, "root tolerance");
  tolerance_value(request.transmitter_factor_floor, "transmitter-side factor floor");
  tolerance_value(request.acceleration_tolerance, "acceleration tolerance");
  if (!std::is_sorted(
          request.adjudicated_finite_width_pairs.begin(),
          request.adjudicated_finite_width_pairs.end()) ||
      std::adjacent_find(
          request.adjudicated_finite_width_pairs.begin(),
          request.adjudicated_finite_width_pairs.end()) !=
          request.adjudicated_finite_width_pairs.end()) {
    throw std::invalid_argument(
        "coupled evolution pair ledgers must be sorted and unique");
  }
  const double far_field_fraction =
      exact_decimal_value(request.far_field_enclosure_fraction);
  if (!(far_field_fraction >= 0.0 && far_field_fraction < 1.0)) {
    throw std::invalid_argument(
        "far-field enclosure fraction must lie in [0, 1)");
  }
  if (request.chart_policy != "sharp" &&
      request.chart_policy != "finite_width" &&
      request.chart_policy != "sharp_with_finite_width_fallback") {
    throw std::invalid_argument("unsupported coupled evolution chart policy");
  }
  if (request.chart_policy != "sharp") {
    tolerance_value(request.causal_width, "causal width");
    tolerance_value(request.core_scale, "core scale");
    tolerance_value(request.quadrature_tolerance, "quadrature tolerance");
    tolerance_value(request.event_impulse_tolerance, "event impulse tolerance");
    tolerance_value(
        request.event_position_moment_tolerance,
        "event position-moment tolerance");
    const double refinement_ratio =
        exact_decimal_value(request.regulator_refinement_ratio);
    if (!(refinement_ratio > 0.0 && refinement_ratio < 1.0)) {
      throw std::invalid_argument(
          "regulator refinement ratio must be between zero and one");
    }
    tolerance_value(
        request.regulator_convergence_tolerance,
        "regulator convergence tolerance");
    if (request.regulator_refinement_levels < 3U) {
      throw std::invalid_argument(
          "regulator convergence requires at least three levels");
    }
  }
  tolerance_value(request.position_tolerance, "position tolerance");
  tolerance_value(request.velocity_tolerance, "velocity tolerance");
  tolerance_value(request.correction_tolerance, "correction tolerance");
  const double adaptive_safety = exact_decimal_value(
      request.adaptive_step_safety_factor);
  const double adaptive_minimum_scale = exact_decimal_value(
      request.adaptive_step_minimum_scale);
  const double adaptive_maximum_scale = exact_decimal_value(
      request.adaptive_step_maximum_scale);
  const double multirate_fraction = exact_decimal_value(
      request.multirate_synchronization_fraction);
  const double certificate_cost_probe_scale = exact_decimal_value(
      request.certificate_cost_probe_scale);
  if (!(adaptive_safety > 0.0 && adaptive_safety < 1.0) ||
      !(adaptive_minimum_scale > 0.0 &&
        adaptive_minimum_scale <= 1.0) ||
      !(adaptive_maximum_scale >= 1.0) ||
      adaptive_minimum_scale > adaptive_maximum_scale ||
      (request.use_continuous_adaptive_step &&
       !request.use_adaptive_step_growth)) {
    throw std::invalid_argument("invalid adaptive step controller policy");
  }
  if (!(multirate_fraction > 0.0 && multirate_fraction <= 1.0)) {
    throw std::invalid_argument("invalid multirate synchronization fraction");
  }
  if (!(certificate_cost_probe_scale > 0.0) ||
      certificate_cost_probe_scale == 1.0 ||
      (request.use_certificate_cost_feedback &&
       (!request.use_continuous_adaptive_step ||
        request.certificate_cost_maximum_probe_adjustments == 0U ||
        request.certificate_cost_unavoidable_cooldown_steps == 0U ||
        request.certificate_cost_initial_cooldown_steps >
            request.certificate_cost_unavoidable_cooldown_steps)) ||
      (!request.use_certificate_cost_feedback &&
       request.certificate_cost_initial_cooldown_steps > 0U)) {
    throw std::invalid_argument("invalid certificate cost feedback policy");
  }
  if (request.root_max_depth == 0U || request.root_max_cells == 0U ||
      request.quadrature_max_depth == 0U ||
      request.quadrature_max_cells == 0U ||
      request.event_max_depth == 0U || request.event_max_cells == 0U ||
      request.initial_mpfr_bits == 0U ||
      request.initial_mpfr_bits > request.maximum_mpfr_bits ||
      request.max_correction_iterations == 0U ||
      request.max_step_attempts == 0U ||
      request.max_rejected_steps == 0U || request.thread_count == 0U ||
      (request.use_certified_traversal &&
       (request.traversal_exact_tile_pair_limit == 0U ||
        request.traversal_maximum_nodes == 0U ||
        request.traversal_maximum_exact_pairs == 0U))) {
    throw std::invalid_argument(
        "coupled evolution resource limits must be positive");
  }
}

void validate_step_inputs(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    const std::string& start_time,
    const std::string& end_time) {
  if (histories.size() != request.paths.size()) {
    throw std::invalid_argument("atomic step history path domain mismatch");
  }
  for (std::size_t index = 0; index < histories.size(); ++index) {
    if (histories[index].path_id != request.paths[index].path_id) {
      throw std::invalid_argument(
          "atomic step histories must match ordered path identities");
    }
    if (!numeric_equal(histories[index].history.segments().back().t_end_token(),
                       start_time)) {
      throw std::invalid_argument(
          "atomic step histories must end at the attempted start");
    }
  }
  const double start = scalar_token(start_time);
  const double end = scalar_token(end_time);
  if (!(end > start) || start < scalar_token(request.start_time) ||
      end > scalar_token(request.end_time)) {
    throw std::invalid_argument(
        "atomic step lies outside the requested evolution interval");
  }
}

NativeAtomicStepCertificate rejected_step(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& input_histories,
    std::size_t step_index,
    const std::string& start_time,
    const std::string& end_time,
    std::vector<NativeCorrectedSubstepCertificate> substeps,
    const std::string& failure_code,
    const std::optional<std::vector<NativePublishedPath>>& candidate_histories =
        std::nullopt,
    std::vector<NativePathLocalError> local_errors = {},
    std::optional<NativeAccelerationSnapshotCertificate>
        recertification_snapshot = std::nullopt) {
  const auto input_fingerprints = fingerprints(input_histories);
  const auto published_fingerprints = fingerprints(input_histories);
  std::optional<double> correction_residual;
  if (failure_code == "coupled_correction_failed") {
    for (auto substep = substeps.rbegin(); substep != substeps.rend();
         ++substep) {
      if (substep->correction_error.has_value()) {
        correction_residual = substep->correction_error;
        break;
      }
    }
  }
  return {
      .schema = "eom_native_atomic_coupled_step_certificate/v1",
      .status = "rejected",
      .run_id = request.run_id,
      .step_index = step_index,
      .attempted_start = start_time,
      .attempted_end = end_time,
      .accepted_time = start_time,
      .input_history_fingerprints = input_fingerprints,
      .published_histories = input_histories,
      .published_joint_histories = request.joint_histories,
      .diagnostic_candidate_histories =
          request.retain_diagnostic_candidate_histories &&
                  candidate_histories.has_value()
              ? candidate_histories
              : std::nullopt,
      .candidate_history_fingerprints =
          candidate_histories.has_value()
              ? fingerprints(*candidate_histories)
              : std::vector<NativeHistoryFingerprint>{},
      .substeps = std::move(substeps),
      .accepted_snapshot = std::nullopt,
      .recertification_snapshot = std::move(recertification_snapshot),
      .local_errors = std::move(local_errors),
      .failure_code = failure_code,
      .correction_residual = correction_residual,
      .correction_retry_scale = 0.0,
      .evidence_status = "failed",
      .integration_method = integration_method(request),
      .reduction_policy = kDeterministicReductionPolicy,
      .publication_atomic = same_fingerprints(
          input_fingerprints, published_fingerprints),
  };
}

NativeCausalPrefixExclusionCertificate certify_causal_prefix_exclusion(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    const std::string& common_start,
    const std::string& reception_time,
    bool common_history_start) {
  NativeCausalPrefixExclusionCertificate certificate{
      .schema = "eom_native_causal_prefix_exclusion/v1",
      .status = "not_applied",
      .original_search_lower = common_start,
      .active_search_lower = common_start,
      .reception_time = reception_time,
  };
  if (!request.use_certified_history_window || !common_history_start ||
      histories.empty()) {
    return certificate;
  }

  const Interval reception = Interval::decimal_token(reception_time);
  const Interval field_speed = Interval::decimal_token(request.field_speed);
  double receiver_radius_upper = 0.0;
  double transmitter_radius_upper = 0.0;
  for (const auto& path : histories) {
    receiver_radius_upper = std::max(
        receiver_radius_upper,
        norm(path.history.position_hull(reception)).upper());
    for (const auto& segment : path.history.segments()) {
      const Interval segment_time(
          segment.t_start_interval().lower(),
          segment.t_end_interval().upper());
      transmitter_radius_upper = std::max(
          transmitter_radius_upper,
          norm(segment.position_interval(segment_time)).upper());
    }
  }
  const Interval separation = Interval::point(receiver_radius_upper) +
      Interval::point(transmitter_radius_upper);
  certificate.separation_upper = separation.upper();

  const double start = scalar_token(common_start);
  const double reception_value = scalar_token(reception_time);
  const double scale =
      std::max({1.0, std::abs(start), std::abs(reception_value)});
  const double safety_time = std::max(
      4.0 * tolerance_value(request.root_tolerance, "root tolerance"),
      64.0 * std::numeric_limits<double>::epsilon() * scale);
  double candidate = reception.lower() -
      separation.upper() / field_speed.lower() - safety_time;
  candidate = std::min(candidate, reception.lower() - safety_time);
  if (!(candidate > start + safety_time)) {
    return certificate;
  }

  for (std::size_t attempt = 0U; attempt < 8U; ++attempt) {
    const std::string candidate_token = decimal_token(candidate);
    const Interval candidate_interval =
        Interval::decimal_token(candidate_token);
    if (candidate_interval.lower() <=
            Interval::decimal_token(common_start).upper() ||
        candidate_interval.upper() >= reception.lower()) {
      return certificate;
    }
    const Interval emission(
        Interval::decimal_token(common_start).lower(),
        candidate_interval.upper());
    const Interval causal_distance = field_speed * (reception - emission);
    const Interval residual = separation - causal_distance;
    if (residual.upper() < 0.0) {
      certificate.status = "certified_complete";
      certificate.active_search_lower = candidate_token;
      certificate.excluded_duration = candidate_interval.lower() - start;
      certificate.causal_distance_lower = causal_distance.lower();
      certificate.residual_upper = residual.upper();
      certificate.full_ordered_pair_prefix_excluded = true;
      return certificate;
    }
    candidate -= safety_time * std::ldexp(1.0, static_cast<int>(attempt));
    if (!(candidate > start + safety_time)) {
      return certificate;
    }
  }
  return certificate;
}

Interval causal_domain_area(
    double reception_lower,
    double reception_upper,
    double emission_lower,
    double emission_upper) {
  const long double a = reception_lower;
  const long double b = reception_upper;
  const long double c = emission_lower;
  const long double d = emission_upper;
  const long double ramp_lower = std::max(a, c);
  const long double ramp_upper = std::min(b, d);
  long double area = 0.0L;
  if (ramp_lower < ramp_upper) {
    area += ((ramp_upper - c) * (ramp_upper - c) -
             (ramp_lower - c) * (ramp_lower - c)) /
            2.0L;
  }
  const long double plateau_lower = std::max(a, d);
  if (plateau_lower < b) {
    area += (b - plateau_lower) * (d - c);
  }
  if (area == 0.0L) {
    return Interval::point(0.0);
  }
  return Interval::decimal_token(decimal_token(static_cast<double>(area)));
}

IntervalVector softened_kernel_enclosure(
    const IntervalVector& displacement,
    const Interval& core_scale) {
  const Interval separation = norm(displacement);
  const Interval radial_square =
      interval_square(separation) + interval_square(core_scale);
  const Interval radial_three_halves =
      radial_square * interval_sqrt(radial_square);
  const Interval radial_five_halves =
      interval_square(radial_square) * interval_sqrt(radial_square);
  const IntervalVector direct = divide(displacement, radial_three_halves);

  IntervalVector midpoint{
      Interval::point(displacement[0].midpoint()),
      Interval::point(displacement[1].midpoint()),
      Interval::point(displacement[2].midpoint())};
  const Interval midpoint_separation = norm(midpoint);
  const Interval midpoint_radial_square =
      interval_square(midpoint_separation) + interval_square(core_scale);
  const IntervalVector midpoint_kernel = divide(
      midpoint,
      midpoint_radial_square * interval_sqrt(midpoint_radial_square));
  IntervalVector centered = midpoint_kernel;
  for (std::size_t axis = 0; axis < 3U; ++axis) {
    for (std::size_t derivative_axis = 0; derivative_axis < 3U;
         ++derivative_axis) {
      Interval jacobian =
          Interval::point(axis == derivative_axis ? 1.0 : 0.0) /
              radial_three_halves -
          Interval::point(3.0) * displacement[axis] *
              displacement[derivative_axis] / radial_five_halves;
      centered[axis] = centered[axis] +
          jacobian * (displacement[derivative_axis] -
                      midpoint[derivative_axis]);
    }
    const auto intersection = direct[axis].intersection(centered[axis]);
    if (!intersection.has_value()) {
      throw std::runtime_error(
          "event softened-kernel mean-value enclosures disagree");
    }
    centered[axis] = *intersection;
  }
  return centered;
}

IntervalVector unit_direction_enclosure(
    const IntervalVector& displacement,
    const Interval& separation) {
  const IntervalVector direct = divide(displacement, separation);
  if (separation.contains_zero()) return direct;

  IntervalVector midpoint{
      Interval::point(displacement[0].midpoint()),
      Interval::point(displacement[1].midpoint()),
      Interval::point(displacement[2].midpoint())};
  const Interval midpoint_separation = norm(midpoint);
  if (midpoint_separation.contains_zero()) return direct;
  IntervalVector centered = divide(midpoint, midpoint_separation);
  const Interval separation_cubed =
      separation * separation * separation;
  for (std::size_t axis = 0; axis < 3U; ++axis) {
    for (std::size_t derivative_axis = 0; derivative_axis < 3U;
         ++derivative_axis) {
      const Interval jacobian =
          Interval::point(axis == derivative_axis ? 1.0 : 0.0) /
              separation -
          displacement[axis] * displacement[derivative_axis] /
              separation_cubed;
      centered[axis] = centered[axis] +
          jacobian * (displacement[derivative_axis] -
                      midpoint[derivative_axis]);
    }
    const auto intersection = direct[axis].intersection(centered[axis]);
    if (!intersection.has_value()) {
      throw std::runtime_error(
          "event unit-direction mean-value enclosures disagree");
    }
    centered[axis] = *intersection;
  }
  return centered;
}

IntervalVector event_prefactor_enclosure(
    const IntervalVector& displacement,
    const Interval& field_speed,
    const Interval& core_scale) {
  const IntervalVector kernel =
      softened_kernel_enclosure(displacement, core_scale);
  return scale(field_speed, kernel);
}

struct EventJointDisplacementCache {
  const NativePublishedPath& receiver;
  const NativePublishedPath& source;
  const JointAffineRetainedHistory& joint_receiver;
  const JointAffineRetainedHistory& joint_source;
  std::map<std::pair<std::size_t, std::size_t>, IntervalVector> error_hulls;

  const JointAffineCubicSegment& joint_segment(
      const JointAffineRetainedHistory& history,
      const CubicHistorySegment& ordinary_segment) const {
    const auto found = std::lower_bound(
        history.segments().begin(), history.segments().end(),
        ordinary_segment.t_start(),
        [](const auto& candidate, double start) {
          return candidate.start_time < start;
        });
    if (found == history.segments().end() ||
        found->start_time != ordinary_segment.t_start() ||
        found->end_time != ordinary_segment.t_end()) {
      throw std::invalid_argument(
          "joint event and ordinary segment registries disagree");
    }
    return *found;
  }

  IntervalVector displacement(
      const Interval& reception,
      const Interval& emission) {
    const std::size_t receiver_index =
        receiver.history.segment_index_at(reception.midpoint());
    const std::size_t source_index =
        source.history.segment_index_at(emission.midpoint());
    const auto& receiver_segment =
        receiver.history.segments()[receiver_index];
    const auto& source_segment = source.history.segments()[source_index];
    if (reception.lower() < receiver_segment.t_start() ||
        reception.upper() > receiver_segment.t_end() ||
        emission.lower() < source_segment.t_start() ||
        emission.upper() > source_segment.t_end()) {
      throw std::invalid_argument(
          "joint event cell crosses a retained segment boundary");
    }
    const auto key = std::make_pair(receiver_index, source_index);
    const auto [found, inserted] = error_hulls.try_emplace(
        key, IntervalVector{
            Interval::point(0.0), Interval::point(0.0),
            Interval::point(0.0)});
    if (inserted) {
      found->second = joint_affine_segment_pair_error_hull(
          joint_segment(joint_receiver, receiver_segment),
          joint_segment(joint_source, source_segment),
          joint_receiver.symbol_registry().size());
    }
    IntervalVector result = add(
        subtract(
            receiver_segment.nominal_position_interval(reception),
            source_segment.nominal_position_interval(emission)),
        found->second);
    const IntervalVector ordinary = subtract(
        receiver.history.position_hull(reception),
        source.history.position_hull(emission));
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      const auto intersection = result[axis].intersection(ordinary[axis]);
      if (!intersection.has_value()) {
        throw std::runtime_error(
            "joint event and ordinary displacement enclosures disagree");
      }
      result[axis] = *intersection;
    }
    return result;
  }
};

IntervalVector event_displacement(
    const NativePublishedPath& receiver,
    const NativePublishedPath& source,
    EventJointDisplacementCache* joint_cache,
    const Interval& reception,
    const Interval& emission) {
  return joint_cache == nullptr
      ? subtract(
            receiver.history.position_hull(reception),
            source.history.position_hull(emission))
      : joint_cache->displacement(reception, emission);
}

IntervalVector event_integrand(
    const NativeCoupledEvolutionRequest& request,
    const NativePublishedPath& receiver,
    const NativePublishedPath& source,
    EventJointDisplacementCache* joint_cache,
    const std::string& receiver_charge,
    const std::string& transmitter_charge,
    const Interval& reception,
    const Interval& emission) {
  const IntervalVector displacement = event_displacement(
      receiver, source, joint_cache, reception, emission);
  const Interval separation = norm(displacement);
  const Interval core_scale = Interval::decimal_token(request.core_scale);
  const Interval field_speed = Interval::decimal_token(request.field_speed);
  const IntervalVector prefactor = event_prefactor_enclosure(
      displacement, field_speed, core_scale);
  const Interval residual =
      separation - field_speed * (reception - emission);
  const Interval eta = Interval::decimal_token(request.causal_width);
  const Interval exponent =
      Interval::point(0.0) -
      interval_square(residual) /
          (Interval::point(2.0) * interval_square(eta));
  const Interval pi(3.1415926535897931, 3.1415926535897936);
  const Interval mollifier =
      interval_exp(exponent) /
      (interval_sqrt(Interval::point(2.0) * pi) * eta);
  const Interval signed_scale =
      Interval::decimal_token(request.coupling) *
      Interval::decimal_token(receiver_charge) *
      Interval::decimal_token(transmitter_charge) * mollifier;
  return scale(signed_scale, prefactor);
}

std::optional<IntervalVector> centered_event_rectangle_integral(
    const NativeCoupledEvolutionRequest& request,
    const NativePublishedPath& receiver,
    const NativePublishedPath& source,
    EventJointDisplacementCache* joint_cache,
    const std::string& receiver_charge,
    const std::string& transmitter_charge,
    const Interval& reception,
    const Interval& emission) {
  const IntervalVector transmitter_velocity =
      source.history.velocity_hull(emission);
  const IntervalVector displacement = event_displacement(
      receiver, source, joint_cache, reception, emission);
  const Interval separation = norm(displacement);
  if (separation.contains_zero()) return std::nullopt;

  const IntervalVector direction =
      unit_direction_enclosure(displacement, separation);
  const Interval transmitter_radial_speed = dot(direction, transmitter_velocity);
  const Interval field_speed = Interval::decimal_token(request.field_speed);
  const Interval residual_derivative = field_speed - transmitter_radial_speed;
  const IntervalVector displacement_derivative =
      scale(Interval::point(-1.0), transmitter_velocity);
  const Interval core_scale = Interval::decimal_token(request.core_scale);
  const Interval radial_square =
      interval_square(separation) + interval_square(core_scale);
  const Interval radial_three_halves =
      radial_square * interval_sqrt(radial_square);
  const Interval radial_five_halves =
      interval_square(radial_square) * interval_sqrt(radial_square);
  const IntervalVector kernel =
      softened_kernel_enclosure(displacement, core_scale);
  const Interval displacement_dot_derivative =
      dot(displacement, displacement_derivative);
  const IntervalVector kernel_derivative = add(
      divide(displacement_derivative, radial_three_halves),
      scale(
          Interval::point(-3.0) * displacement_dot_derivative /
              radial_five_halves,
          displacement));

  const Interval residual =
      separation - field_speed * (reception - emission);
  const Interval causal_width =
      Interval::decimal_token(request.causal_width);
  const Interval exponent =
      Interval::point(0.0) -
      interval_square(residual) /
          (Interval::point(2.0) * interval_square(causal_width));
  const Interval pi(3.1415926535897931, 3.1415926535897936);
  const Interval mollifier =
      interval_exp(exponent) /
      (interval_sqrt(Interval::point(2.0) * pi) * causal_width);
  const Interval mollifier_derivative =
      mollifier *
      (Interval::point(0.0) -
       residual * residual_derivative / interval_square(causal_width));
  const Interval signed_charge_scale =
      Interval::decimal_token(request.coupling) *
      Interval::decimal_token(receiver_charge) *
      Interval::decimal_token(transmitter_charge);
  const IntervalVector derivative = scale(
      signed_charge_scale * field_speed,
      add(
          scale(mollifier, kernel_derivative),
          scale(mollifier_derivative, kernel)));

  const double midpoint = emission.midpoint();
  IntervalVector result = scale(
      Interval::point(emission.upper() - emission.lower()),
      event_integrand(
          request, receiver, source, joint_cache,
          receiver_charge, transmitter_charge, reception,
          Interval::point(midpoint)));
  const double emission_width = emission.upper() - emission.lower();
  const double remainder_scale =
      emission_width * emission_width * 0.25;
  for (std::size_t axis = 0; axis < 3; ++axis) {
    const double derivative_bound = std::max(
        std::abs(derivative[axis].lower()),
        std::abs(derivative[axis].upper()));
    result[axis] =
        result[axis].inflate(derivative_bound * remainder_scale);
  }
  return scale(Interval::point(reception.width()), result);
}

Interval normal_cdf_interval(
    const Interval& residual, const Interval& causal_width) {
  const Interval argument = residual /
      (interval_sqrt(Interval::point(2.0)) * causal_width);
  return Interval::point(0.5) *
      (Interval::point(1.0) + interval_erf(argument));
}

Interval normal_cdf_difference_enclosure(
    const IntervalVector& receiver_position,
    const IntervalVector& first_source_position,
    const IntervalVector& second_source_position,
    const Interval& reception,
    double first_emission,
    double second_emission,
    const Interval& field_speed,
    const Interval& causal_width,
    const std::optional<IntervalVector>& correlated_source_delta) {
  const IntervalVector first_displacement =
      subtract(receiver_position, first_source_position);
  const IntervalVector second_displacement =
      subtract(receiver_position, second_source_position);
  const Interval first_separation = norm(first_displacement);
  const Interval second_separation = norm(second_displacement);
  const Interval first_residual = first_separation -
      field_speed * (reception - Interval::point(first_emission));
  const Interval second_residual = second_separation -
      field_speed * (reception - Interval::point(second_emission));
  const Interval direct =
      normal_cdf_interval(second_residual, causal_width) -
      normal_cdf_interval(first_residual, causal_width);
  if (first_separation.contains_zero() ||
      second_separation.contains_zero()) {
    return direct;
  }

  IntervalVector midpoint_receiver{
      Interval::point(receiver_position[0].midpoint()),
      Interval::point(receiver_position[1].midpoint()),
      Interval::point(receiver_position[2].midpoint())};
  IntervalVector midpoint_first_source{
      Interval::point(first_source_position[0].midpoint()),
      Interval::point(first_source_position[1].midpoint()),
      Interval::point(first_source_position[2].midpoint())};
  IntervalVector midpoint_second_source{
      Interval::point(second_source_position[0].midpoint()),
      Interval::point(second_source_position[1].midpoint()),
      Interval::point(second_source_position[2].midpoint())};
  IntervalVector midpoint_source_delta{
      Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
  if (correlated_source_delta.has_value()) {
    for (std::size_t axis = 0; axis < 3U; ++axis) {
      midpoint_source_delta[axis] =
          Interval::point((*correlated_source_delta)[axis].midpoint());
      midpoint_second_source[axis] =
          midpoint_first_source[axis] + midpoint_source_delta[axis];
    }
  }
  const Interval midpoint_reception = Interval::point(reception.midpoint());
  const Interval midpoint_first_residual =
      norm(subtract(midpoint_receiver, midpoint_first_source)) -
      field_speed *
          (midpoint_reception - Interval::point(first_emission));
  const Interval midpoint_second_residual =
      norm(subtract(midpoint_receiver, midpoint_second_source)) -
      field_speed *
          (midpoint_reception - Interval::point(second_emission));
  Interval centered =
      normal_cdf_interval(midpoint_second_residual, causal_width) -
      normal_cdf_interval(midpoint_first_residual, causal_width);

  const auto normal_density = [&](const Interval& residual) {
    const Interval exponent = Interval::point(0.0) -
        interval_square(residual) /
            (Interval::point(2.0) * interval_square(causal_width));
    const Interval pi(3.1415926535897931, 3.1415926535897936);
    return interval_exp(exponent) /
        (interval_sqrt(Interval::point(2.0) * pi) * causal_width);
  };
  const Interval first_density = normal_density(first_residual);
  const Interval second_density = normal_density(second_residual);
  const IntervalVector first_direction =
      unit_direction_enclosure(first_displacement, first_separation);
  const IntervalVector second_direction =
      unit_direction_enclosure(second_displacement, second_separation);
  for (std::size_t axis = 0; axis < 3U; ++axis) {
    const Interval receiver_derivative =
        second_density * second_direction[axis] -
        first_density * first_direction[axis];
    centered = centered + receiver_derivative *
        (receiver_position[axis] - midpoint_receiver[axis]);
    if (correlated_source_delta.has_value()) {
      centered = centered +
          (first_density * first_direction[axis] -
           second_density * second_direction[axis]) *
              (first_source_position[axis] - midpoint_first_source[axis]);
      centered = centered - second_density * second_direction[axis] *
          ((*correlated_source_delta)[axis] -
           midpoint_source_delta[axis]);
    } else {
      centered = centered + first_density * first_direction[axis] *
          (first_source_position[axis] - midpoint_first_source[axis]);
      centered = centered - second_density * second_direction[axis] *
          (second_source_position[axis] - midpoint_second_source[axis]);
    }
  }
  const Interval reception_derivative =
      field_speed * (first_density - second_density);
  centered = centered + reception_derivative *
      (reception - midpoint_reception);
  const auto intersection = direct.intersection(centered);
  if (!intersection.has_value()) {
    throw std::runtime_error(
        "event Gaussian-CDF mean-value enclosures disagree");
  }
  return *intersection;
}

std::optional<IntervalVector> monotone_event_rectangle_integral(
    const NativeCoupledEvolutionRequest& request,
    const NativePublishedPath& receiver,
    const NativePublishedPath& source,
    EventJointDisplacementCache* joint_cache,
    const std::string& receiver_charge,
    const std::string& transmitter_charge,
    const Interval& reception,
    const Interval& emission) {
  const IntervalVector receiver_position =
      receiver.history.position_hull(reception);
  const IntervalVector transmitter_velocity =
      source.history.velocity_hull(emission);
  const IntervalVector displacement = event_displacement(
      receiver, source, joint_cache, reception, emission);
  const Interval separation = norm(displacement);
  if (separation.contains_zero()) return std::nullopt;
  const IntervalVector direction =
      unit_direction_enclosure(displacement, separation);
  const Interval field_speed = Interval::decimal_token(request.field_speed);
  const Interval residual_derivative =
      field_speed - dot(direction, transmitter_velocity);
  if (residual_derivative.contains_zero()) return std::nullopt;

  double first_emission = emission.lower();
  double second_emission = emission.upper();
  IntervalVector first_source_position =
      source.history.position_hull(Interval::point(first_emission));
  IntervalVector second_source_position =
      source.history.position_hull(Interval::point(second_emission));
  if (residual_derivative.upper() < 0.0) {
    std::swap(first_emission, second_emission);
    std::swap(first_source_position, second_source_position);
  }
  const Interval causal_width =
      Interval::decimal_token(request.causal_width);
  std::optional<IntervalVector> correlated_source_delta;
  const double transmitter_lower = std::min(first_emission, second_emission);
  const double transmitter_upper = std::max(first_emission, second_emission);
  if (const auto ordered_delta =
          source.history.same_segment_correlated_displacement(
              Interval::point(transmitter_upper), Interval::point(transmitter_lower));
      ordered_delta.has_value()) {
    correlated_source_delta = second_emission >= first_emission
        ? *ordered_delta
        : scale(Interval::point(-1.0), *ordered_delta);
  }
  const Interval raw_mass = normal_cdf_difference_enclosure(
      receiver_position, first_source_position, second_source_position,
      reception, first_emission, second_emission,
      field_speed, causal_width, correlated_source_delta);
  const Interval mass(
      std::max(0.0, raw_mass.lower()),
      std::max(0.0, raw_mass.upper()));
  const Interval mollifier_integral =
      mass / interval_absolute(residual_derivative);

  const Interval core_scale = Interval::decimal_token(request.core_scale);
  const Interval radial_square =
      interval_square(separation) + interval_square(core_scale);
  const Interval signed_charge_scale =
      Interval::decimal_token(request.coupling) *
      Interval::decimal_token(receiver_charge) *
      Interval::decimal_token(transmitter_charge);
  IntervalVector result = scale(
      Interval::point(reception.width()),
      scale(
          signed_charge_scale * mollifier_integral,
          event_prefactor_enclosure(
              displacement, field_speed, core_scale)));

  const IntervalVector displacement_derivative =
      scale(Interval::point(-1.0), transmitter_velocity);
  const Interval radial_five_halves =
      interval_square(radial_square) * interval_sqrt(radial_square);
  const IntervalVector kernel_derivative = add(
      divide(displacement_derivative,
             radial_square * interval_sqrt(radial_square)),
      scale(
          Interval::point(-3.0) *
              dot(displacement, displacement_derivative) /
              radial_five_halves,
          displacement));
  const IntervalVector prefactor_derivative = scale(
      signed_charge_scale * field_speed,
      kernel_derivative);

  const double midpoint = emission.midpoint();
  const Interval midpoint_emission = Interval::point(midpoint);
  const IntervalVector midpoint_displacement = event_displacement(
      receiver, source, joint_cache, reception,
      midpoint_emission);
  const Interval midpoint_separation = norm(midpoint_displacement);
  if (!midpoint_separation.contains_zero()) {
    IntervalVector centered = scale(
        signed_charge_scale * mollifier_integral,
        event_prefactor_enclosure(
            midpoint_displacement, field_speed, core_scale));
    const double remainder_scale =
        0.5 * emission.width() * mollifier_integral.upper();
    for (std::size_t axis = 0; axis < 3; ++axis) {
      const double derivative_bound = std::max(
          std::abs(prefactor_derivative[axis].lower()),
          std::abs(prefactor_derivative[axis].upper()));
      centered[axis] =
          centered[axis].inflate(derivative_bound * remainder_scale);
    }
    centered = scale(Interval::point(reception.width()), centered);
    for (std::size_t axis = 0; axis < 3; ++axis) {
      const auto intersection = result[axis].intersection(centered[axis]);
      if (!intersection.has_value()) {
        throw std::runtime_error(
            "event monotone prefactor enclosures disagree");
      }
      result[axis] = *intersection;
    }
  }
  return result;
}

const NativePairAccelerationCertificate& snapshot_pair(
    const NativeAccelerationSnapshotCertificate& snapshot,
    const std::string& receiver,
    const std::string& source) {
  const auto found = std::find_if(
      snapshot.acceleration.pair_certificates.begin(),
      snapshot.acceleration.pair_certificates.end(), [&](const auto& pair) {
        return pair.receiver_path_id == receiver &&
               pair.transmitter_path_id == source;
      });
  if (found == snapshot.acceleration.pair_certificates.end()) {
    throw std::invalid_argument("event pair is absent from acceleration snapshot");
  }
  return *found;
}

}  // namespace

std::optional<NativeEndpointRootContinuationCertificate>
certify_native_coincident_endpoint_root_continuation(
    const NativeAccelerationSnapshotCertificate& start,
    const NativeAccelerationSnapshotCertificate& end,
    const std::string& receiver_path_id,
    const std::string& transmitter_path_id) {
  return certify_coincident_endpoint_root_continuation_impl(
      start, end, receiver_path_id, transmitter_path_id);
}

std::vector<NativePinnedFoldTemporalStepCertificate>
certify_native_pinned_fold_temporal_onset(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    const NativeAccelerationSnapshotCertificate& start_snapshot,
    const std::string& start_time) {
  return certified_pinned_fold_onset_certificates(
      request, histories, start_snapshot, start_time);
}

NativeCommonDomainChartCertificate certify_native_common_domain_chart(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    const std::string& receiver_path_id,
    const std::string& transmitter_path_id,
    const std::string& reception_lower,
    const std::string& reception_upper,
    const std::string& event_end) {
  const auto endpoint_snapshot = certify_native_acceleration_snapshot(
      request, histories, reception_upper);
  const Interval common(
      scalar_token(reception_lower), scalar_token(reception_upper));
  auto certificate = certify_common_domain_interval(
      request, path_history(histories, receiver_path_id),
      path_history(histories, transmitter_path_id), endpoint_snapshot,
      common, scalar_token(event_end));
  if (!certificate.has_value()) {
    NativeCommonDomainChartCertificate failure;
    failure.status = "uncertified";
    failure.reception_lower = reception_lower;
    failure.reception_upper = reception_upper;
    failure.failure_code = "common_domain_not_certified";
    return failure;
  }
  return std::move(*certificate);
}

static NativeFoldCausticImpulseCertificate
certify_binary64_fold_caustic_impulse(
    const NativeCoupledEvolutionRequest& request,
    const NativePublishedPath& receiver,
    const NativePublishedPath& source,
    const std::string& receiver_charge,
    const std::string& transmitter_charge,
    const std::string& reception_lower_token,
    const std::string& reception_upper_token,
    const JointAffineRetainedHistory* joint_receiver,
    const JointAffineRetainedHistory* joint_source) {
  NativeFoldCausticImpulseCertificate certificate{
      .schema = "eom_native_fold_caustic_impulse_certificate/v1",
      .status = "uncertified",
      .receiver_path_id = receiver.path_id,
      .transmitter_path_id = source.path_id,
      .reception_lower = reception_lower_token,
      .reception_upper = reception_upper_token,
      .causal_width = request.causal_width,
      .core_scale = request.core_scale,
      .impulse = std::nullopt,
      .position_moment = std::nullopt,
      .visited_cells = 0,
      .precision_route = "binary64_outward_mean_value_joint_quadrature",
      .precision_bits = 53,
      .failure_code = "numeric_event_impulse_uncertified",
  };
  try {
    if ((joint_receiver == nullptr) != (joint_source == nullptr)) {
      throw std::invalid_argument(
          "event displacement requires both joint histories or neither");
    }
    if (joint_receiver != nullptr &&
        joint_receiver->symbol_registry() != joint_source->symbol_registry()) {
      throw std::invalid_argument(
          "event joint histories require aligned shared symbols");
    }
    std::optional<EventJointDisplacementCache> joint_cache;
    if (joint_receiver != nullptr) {
      joint_cache.emplace(EventJointDisplacementCache{
          .receiver = receiver,
          .source = source,
          .joint_receiver = *joint_receiver,
          .joint_source = *joint_source,
          .error_hulls = {},
      });
    }
    EventJointDisplacementCache* joint_cache_pointer =
        joint_cache.has_value() ? &*joint_cache : nullptr;
    const double reception_lower = scalar_token(reception_lower_token);
    const double reception_upper = scalar_token(reception_upper_token);
    const double search_lower = source.history.t_start();
    if (!(reception_upper > reception_lower) ||
        !(search_lower < reception_lower) ||
        !receiver.history.covers(Interval(reception_lower, reception_upper)) ||
        !source.history.covers(Interval(search_lower, reception_upper))) {
      certificate.failure_code = "event_impulse_history_coverage_invalid";
      return certificate;
    }
    const Interval reception_all(reception_lower, reception_upper);
    for (const auto& segment : receiver.history.segments()) {
      if (segment.t_end() < reception_lower ||
          segment.t_start() > reception_upper) {
        continue;
      }
      certificate.receiver_position_error_upper = std::max(
          certificate.receiver_position_error_upper, segment.position_error());
      certificate.receiver_velocity_error_upper = std::max(
          certificate.receiver_velocity_error_upper, segment.velocity_error());
    }
    for (const auto& segment : source.history.segments()) {
      certificate.transmitter_position_error_upper = std::max(
          certificate.transmitter_position_error_upper, segment.position_error());
      certificate.transmitter_velocity_error_upper = std::max(
          certificate.transmitter_velocity_error_upper, segment.velocity_error());
    }
    const Interval emission_boundary = Interval::point(search_lower);
    const Interval boundary_residual =
        norm(event_displacement(
            receiver, source, joint_cache_pointer,
            reception_all, emission_boundary)) -
        Interval::decimal_token(request.field_speed) *
            (reception_all - emission_boundary);
    if (boundary_residual.contains_zero()) {
      certificate.failure_code = "insufficient_history_depth";
      return certificate;
    }
    const double tolerance = tolerance_value(
        request.event_impulse_tolerance, "event impulse tolerance");
    const double position_moment_tolerance = tolerance_value(
        request.event_position_moment_tolerance,
        "event position-moment tolerance");
    double active_search_lower = search_lower;
    double tail_impulse_bound = 0.0;
    const Interval field_speed = Interval::decimal_token(request.field_speed);
    const Interval causal_width = Interval::decimal_token(request.causal_width);
    const Interval core_scale = Interval::decimal_token(request.core_scale);
    const IntervalVector receiver_position =
        receiver.history.position_hull(reception_all);
    const IntervalVector transmitter_position =
        source.history.full_position_hull();
    const Interval separation =
        norm(subtract(receiver_position, transmitter_position));
    const double eta = causal_width.upper();
    double residual_margin = 6.0 * eta;
    for (std::size_t attempt = 0; attempt < 12U; ++attempt) {
      const double candidate = reception_lower -
          (separation.upper() + residual_margin) / field_speed.lower();
      if (!(candidate > search_lower && candidate < reception_lower)) {
        residual_margin *= 1.25;
        continue;
      }
      const Interval prefix_emission(search_lower, candidate);
      const Interval prefix_residual = separation -
          field_speed * (reception_all - prefix_emission);
      if (!(prefix_residual.upper() < 0.0) ||
          -prefix_residual.upper() < residual_margin) {
        residual_margin *= 1.25;
        continue;
      }
      const double normalized =
          -prefix_residual.upper() / causal_width.upper();
      const double pi_lower = 3.1415926535897931;
      const double mollifier_upper =
          std::exp(-0.5 * normalized * normalized) /
          (std::sqrt(2.0 * pi_lower) * causal_width.lower());
      const double kernel_component_bound =
          1.0 / (core_scale.lower() * core_scale.lower());
      const double acceleration_weight_bound = field_speed.upper();
      const double signed_scale_bound =
          interval_absolute(Interval::decimal_token(request.coupling)).upper() *
          interval_absolute(Interval::decimal_token(receiver_charge)).upper() *
          interval_absolute(Interval::decimal_token(transmitter_charge)).upper();
      const double prefix_area = causal_domain_area(
          reception_lower, reception_upper, search_lower, candidate).upper();
      const double candidate_tail_bound =
          prefix_area * signed_scale_bound * acceleration_weight_bound *
          mollifier_upper * kernel_component_bound;
      if (2.0 * candidate_tail_bound <= tolerance * 0.5) {
        active_search_lower = candidate;
        tail_impulse_bound = candidate_tail_bound;
        break;
      }
      residual_margin *= 1.25;
    }
    const double active_tolerance = tolerance - 2.0 * tail_impulse_bound;
    if (!(active_tolerance > 0.0)) {
      certificate.failure_code = "event_impulse_tail_bound_exceeds_tolerance";
      return certificate;
    }

    struct EventCell {
      double t_lower;
      double t_upper;
      double s_lower;
      double s_upper;
      std::size_t depth;
      std::size_t id;
      IntervalVector integral;
      IntervalVector position_moment;

      [[nodiscard]] double score() const {
        return std::max(
            {integral[0].width(), integral[1].width(),
             integral[2].width(), position_moment[0].width(),
             position_moment[1].width(), position_moment[2].width()});
      }
    };
    struct EventCellOrder {
      bool operator()(const EventCell& left, const EventCell& right) const {
        if (left.score() != right.score()) {
          return left.score() < right.score();
        }
        return left.id < right.id;
      }
    };
    std::size_t next_cell_id = 0U;
    const auto make_cell = [&](double t_lower, double t_upper,
                               double s_lower, double s_upper,
                               std::size_t depth) {
      ++certificate.visited_cells;
      if (certificate.visited_cells > request.event_max_cells) {
        throw std::runtime_error("event_impulse_cell_limit_exhausted");
      }
      const Interval area =
          causal_domain_area(t_lower, t_upper, s_lower, s_upper);
      const Interval reception_cell(t_lower, t_upper);
      const Interval emission_cell(s_lower, s_upper);
      const IntervalVector cell_displacement = event_displacement(
          receiver, source, joint_cache_pointer,
          reception_cell, emission_cell);
      if (joint_cache_pointer != nullptr) {
        ++certificate.joint_displacement_cells;
      }
      const Interval cell_separation = norm(cell_displacement);
      const Interval cell_residual =
          cell_separation -
          field_speed * (reception_cell - emission_cell);
      double residual_distance = 0.0;
      if (cell_residual.upper() < 0.0) {
        residual_distance = -cell_residual.upper();
      } else if (cell_residual.lower() > 0.0) {
        residual_distance = cell_residual.lower();
      }
      IntervalVector integral{
          Interval::point(0.0), Interval::point(0.0),
          Interval::point(0.0)};
      const auto centered_rectangle = s_upper <= t_lower
          ? centered_event_rectangle_integral(
                request, receiver, source, joint_cache_pointer,
                receiver_charge, transmitter_charge, reception_cell,
                emission_cell)
          : std::nullopt;
      const auto monotone_rectangle = s_upper <= t_lower
          ? monotone_event_rectangle_integral(
                request, receiver, source, joint_cache_pointer,
                receiver_charge, transmitter_charge, reception_cell,
                emission_cell)
          : std::nullopt;
      if (residual_distance > 0.0) {
        ++certificate.gaussian_tail_cells;
        const double normalized =
            residual_distance / causal_width.upper();
        const double mollifier_upper =
            std::exp(-0.5 * normalized * normalized) /
            (std::sqrt(2.0 * 3.1415926535897931) *
             causal_width.lower());
        const Interval radial_square =
            interval_square(cell_separation) + interval_square(core_scale);
        const double separation_aware_kernel_bound =
            (cell_separation /
             (radial_square * interval_sqrt(radial_square))).upper();
        const double global_kernel_bound =
            1.0 / (core_scale.lower() * core_scale.lower());
        const double kernel_component_bound =
            std::min(global_kernel_bound, separation_aware_kernel_bound);
        const double acceleration_weight_bound = field_speed.upper();
        const double signed_scale_bound =
            interval_absolute(
                Interval::decimal_token(request.coupling)).upper() *
            interval_absolute(
                Interval::decimal_token(receiver_charge)).upper() *
            interval_absolute(
                Interval::decimal_token(transmitter_charge)).upper();
        const double component_bound =
            area.upper() * signed_scale_bound * acceleration_weight_bound *
            mollifier_upper * kernel_component_bound;
        const Interval tail(-component_bound, component_bound);
        integral = {tail, tail, tail};
        if (centered_rectangle.has_value()) {
          for (std::size_t axis = 0; axis < 3; ++axis) {
            const auto intersection =
                integral[axis].intersection((*centered_rectangle)[axis]);
            if (!intersection.has_value()) {
              throw std::runtime_error(
                  "event centered and Gaussian-tail enclosures disagree");
            }
            integral[axis] = *intersection;
          }
        }
      } else if (centered_rectangle.has_value()) {
        ++certificate.centered_emission_cells;
        integral = *centered_rectangle;
      } else {
        ++certificate.direct_joint_cells;
        integral = scale(
            area,
            event_integrand(
                request, receiver, source, joint_cache_pointer,
                receiver_charge, transmitter_charge, reception_cell,
                emission_cell));
      }
      if (monotone_rectangle.has_value()) {
        ++certificate.monotone_residual_cells;
        for (std::size_t axis = 0; axis < 3; ++axis) {
          const auto intersection =
              integral[axis].intersection((*monotone_rectangle)[axis]);
          if (!intersection.has_value()) {
            throw std::runtime_error(
                "event monotone-residual enclosure disagrees with direct enclosure");
          }
          integral[axis] = *intersection;
        }
      }
      const Interval position_weight(
          reception_upper - t_upper, reception_upper - t_lower);
      const IntervalVector position_moment =
          scale(position_weight, integral);
      return EventCell{
          .t_lower = t_lower,
          .t_upper = t_upper,
          .s_lower = s_lower,
          .s_upper = s_upper,
          .depth = depth,
          .id = next_cell_id++,
          .integral = integral,
          .position_moment = position_moment,
      };
    };

    std::set<double> reception_points{reception_lower, reception_upper};
    std::set<double> emission_points{active_search_lower, reception_upper};
    for (const auto& segment : receiver.history.segments()) {
      if (reception_lower < segment.t_start() &&
          segment.t_start() < reception_upper) {
        reception_points.insert(segment.t_start());
      }
      if (reception_lower < segment.t_end() &&
          segment.t_end() < reception_upper) {
        reception_points.insert(segment.t_end());
      }
    }
    for (const auto& segment : source.history.segments()) {
      if (active_search_lower < segment.t_start() &&
          segment.t_start() < reception_upper) {
        emission_points.insert(segment.t_start());
      }
      if (active_search_lower < segment.t_end() &&
          segment.t_end() < reception_upper) {
        emission_points.insert(segment.t_end());
      }
    }
    std::multiset<EventCell, EventCellOrder> cells;
    for (auto t = reception_points.begin(); std::next(t) != reception_points.end();
         ++t) {
      for (auto s = emission_points.begin(); std::next(s) != emission_points.end();
           ++s) {
        if (!causal_domain_area(
                 *t, *std::next(t), *s, *std::next(s)).is_exact_zero()) {
          cells.insert(make_cell(
              *t, *std::next(t), *s, *std::next(s), 0U));
        }
      }
    }
    if (cells.empty()) {
      certificate.failure_code = "event_impulse_empty_causal_domain";
      return certificate;
    }
    IntervalVector total{
        Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
    IntervalVector total_position_moment{
        Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
    while (true) {
      std::vector<const EventCell*> chronological;
      chronological.reserve(cells.size());
      for (const auto& cell : cells) chronological.push_back(&cell);
      std::sort(
          chronological.begin(), chronological.end(),
          [](const EventCell* left, const EventCell* right) {
            if (left->t_lower != right->t_lower) {
              return left->t_lower < right->t_lower;
            }
            if (left->s_lower != right->s_lower) {
              return left->s_lower < right->s_lower;
            }
            return left->id < right->id;
          });
      std::vector<IntervalVector> totals;
      std::vector<IntervalVector> position_moment_totals;
      totals.reserve(chronological.size());
      position_moment_totals.reserve(chronological.size());
      for (const EventCell* cell : chronological) {
        totals.push_back(cell->integral);
        position_moment_totals.push_back(cell->position_moment);
      }
      total = fixed_pairwise_sum(totals);
      total_position_moment = fixed_pairwise_sum(position_moment_totals);
      certificate.last_maximum_component_width = std::max(
          {total[0].width(), total[1].width(), total[2].width()});
      certificate.last_maximum_position_moment_component_width = std::max(
          {total_position_moment[0].width(),
           total_position_moment[1].width(),
           total_position_moment[2].width()});
      certificate.last_largest_cell_width = cells.rbegin()->score();
      if (std::all_of(
              total.begin(), total.end(), [&](const Interval& component) {
                return component.width() <= active_tolerance;
              }) &&
          std::all_of(
              total_position_moment.begin(), total_position_moment.end(),
              [&](const Interval& component) {
                return component.width() <= position_moment_tolerance;
              })) {
        break;
      }
      const std::size_t splits_before_reduction =
          std::max<std::size_t>(64U, cells.size() / 16U);
      for (std::size_t split = 0; split < splits_before_reduction; ++split) {
        const auto found = std::prev(cells.end());
        const EventCell parent = *found;
        cells.erase(found);
        if (parent.depth >= request.event_max_depth) {
          throw std::runtime_error("event_impulse_depth_exhausted");
        }
        // The monotone-residual enclosure analytically integrates the
        // Gaussian along emission time. Spend the remaining mesh budget more
        // densely on reception time, whose shared receiver state is otherwise
        // re-enclosed in every active cell.
        constexpr double kReceptionSubdivisionBias = 16.0;
        if (kReceptionSubdivisionBias *
                (parent.t_upper - parent.t_lower) >=
            (parent.s_upper - parent.s_lower)) {
          const double midpoint =
              parent.t_lower + (parent.t_upper - parent.t_lower) * 0.5;
          if (!(midpoint > parent.t_lower && midpoint < parent.t_upper)) {
            throw std::runtime_error(
                "event_impulse_time_resolution_exhausted");
          }
          for (const auto& bounds :
               {std::pair{parent.t_lower, midpoint},
                std::pair{midpoint, parent.t_upper}}) {
            if (!causal_domain_area(
                     bounds.first, bounds.second, parent.s_lower,
                     parent.s_upper).is_exact_zero()) {
              cells.insert(make_cell(
                  bounds.first, bounds.second, parent.s_lower,
                  parent.s_upper, parent.depth + 1U));
            }
          }
        } else {
          const double midpoint =
              parent.s_lower + (parent.s_upper - parent.s_lower) * 0.5;
          if (!(midpoint > parent.s_lower && midpoint < parent.s_upper)) {
            throw std::runtime_error(
                "event_impulse_time_resolution_exhausted");
          }
          for (const auto& bounds :
               {std::pair{parent.s_lower, midpoint},
                std::pair{midpoint, parent.s_upper}}) {
            if (!causal_domain_area(
                     parent.t_lower, parent.t_upper, bounds.first,
                     bounds.second).is_exact_zero()) {
              cells.insert(make_cell(
                  parent.t_lower, parent.t_upper, bounds.first,
                  bounds.second, parent.depth + 1U));
            }
          }
        }
      }
    }
    if (tail_impulse_bound > 0.0) {
      const Interval tail(-tail_impulse_bound, tail_impulse_bound);
      total = add(total, IntervalVector{tail, tail, tail});
      const double moment_tail_bound =
          (reception_upper - reception_lower) * tail_impulse_bound;
      const Interval moment_tail(-moment_tail_bound, moment_tail_bound);
      total_position_moment = add(
          total_position_moment,
          IntervalVector{moment_tail, moment_tail, moment_tail});
    }
    if (std::any_of(
            total.begin(), total.end(), [&](const Interval& component) {
              return component.width() > tolerance;
            })) {
      certificate.failure_code =
          "event_impulse_enclosure_exceeds_tolerance";
      return certificate;
    }
    if (std::any_of(
            total_position_moment.begin(), total_position_moment.end(),
            [&](const Interval& component) {
              return component.width() > position_moment_tolerance;
            })) {
      certificate.failure_code =
          "event_position_moment_enclosure_exceeds_tolerance";
      return certificate;
    }
    certificate.status = "certified_complete";
    certificate.impulse = total;
    certificate.position_moment = total_position_moment;
    certificate.failure_code.clear();
    return certificate;
  } catch (const std::exception& error) {
    certificate.failure_code = error.what();
    return certificate;
  }
}

NativeFoldCausticImpulseCertificate certify_native_fold_caustic_impulse(
    const NativeCoupledEvolutionRequest& request,
    const NativePublishedPath& receiver,
    const NativePublishedPath& source,
    const std::string& receiver_charge,
    const std::string& transmitter_charge,
    const std::string& reception_lower_token,
    const std::string& reception_upper_token,
    const JointAffineRetainedHistory* joint_receiver,
    const JointAffineRetainedHistory* joint_source) {
  tolerance_value(request.causal_width, "causal width");
  tolerance_value(request.core_scale, "core scale");
  tolerance_value(request.event_impulse_tolerance, "event impulse tolerance");
  tolerance_value(
      request.event_position_moment_tolerance,
      "event position-moment tolerance");
  if (request.event_max_depth == 0U || request.event_max_cells == 0U ||
      request.initial_mpfr_bits == 0U ||
      request.initial_mpfr_bits > request.maximum_mpfr_bits) {
    throw std::invalid_argument("invalid event resource or precision policy");
  }
  NativeFoldCausticImpulseCertificate certificate =
      certify_binary64_fold_caustic_impulse(
          request, receiver, source, receiver_charge, transmitter_charge,
          reception_lower_token, reception_upper_token,
          joint_receiver, joint_source);
  if (certificate.status == "certified_complete" &&
      !request.force_event_precision_escalation) {
    return certificate;
  }
  if (certificate.failure_code == "event_impulse_history_coverage_invalid" ||
      certificate.failure_code == "insufficient_history_depth") {
    return certificate;
  }
  if (!request.force_event_precision_escalation &&
      (certificate.failure_code == "event_impulse_cell_limit_exhausted" ||
       certificate.failure_code == "event_impulse_depth_exhausted" ||
       certificate.failure_code == "event_impulse_time_resolution_exhausted")) {
    return certificate;
  }
  unsigned bits = request.initial_mpfr_bits;
  for (;;) {
    const auto attempt = certify_mpfr_event_impulse(
        {
            .receiver_history = &receiver.history,
            .transmitter_history = &source.history,
            .receiver_charge = receiver_charge,
            .transmitter_charge = transmitter_charge,
            .reception_lower = reception_lower_token,
            .reception_upper = reception_upper_token,
            .search_lower =
                source.history.segments().front().t_start_token(),
            .field_speed = request.field_speed,
            .coupling = request.coupling,
            .causal_width = request.causal_width,
            .core_scale = request.core_scale,
            .impulse_tolerance = request.event_impulse_tolerance,
            .position_moment_tolerance =
                request.event_position_moment_tolerance,
            .max_depth = request.event_max_depth,
            .max_cells = request.event_max_cells,
        },
        bits);
    certificate.visited_cells = attempt.visited_cells;
    certificate.precision_route = "mpfr_outward_joint_quadrature";
    certificate.precision_bits = bits;
    certificate.failure_code = attempt.failure_code;
    certificate.impulse = std::nullopt;
    certificate.position_moment = std::nullopt;
    certificate.status = "uncertified";
    if (attempt.certified) {
      certificate.status = "certified_complete";
      certificate.impulse = attempt.impulse;
      certificate.position_moment = attempt.position_moment;
      certificate.failure_code.clear();
      return certificate;
    }
    if (bits >= request.maximum_mpfr_bits) {
      return certificate;
    }
    const unsigned next = bits > request.maximum_mpfr_bits / 2U
        ? request.maximum_mpfr_bits
        : bits * 2U;
    if (next <= bits) {
      return certificate;
    }
    bits = next;
  }
}

NativeRegulatorConvergenceCertificate certify_native_regulator_convergence(
    const NativeCoupledEvolutionRequest& request,
    const NativePublishedPath& receiver,
    const NativePublishedPath& source,
    const std::string& receiver_charge,
    const std::string& transmitter_charge,
    const std::string& reception_lower,
    const std::string& reception_upper,
    const JointAffineRetainedHistory* joint_receiver,
    const JointAffineRetainedHistory* joint_source) {
  const double ratio = exact_decimal_value(request.regulator_refinement_ratio);
  const double tolerance = tolerance_value(
      request.regulator_convergence_tolerance,
      "regulator convergence tolerance");
  if (!(ratio > 0.0 && ratio < 1.0) ||
      request.regulator_refinement_levels < 3U) {
    throw std::invalid_argument(
        "regulator convergence requires a ratio between zero and one and "
        "at least three levels");
  }
  const auto base_event = certify_native_fold_caustic_impulse(
      request, receiver, source, receiver_charge, transmitter_charge,
      reception_lower, reception_upper, joint_receiver, joint_source);
  NativeRegulatorConvergenceCertificate certificate{
      .schema = "eom_native_regulator_convergence_certificate/v1",
      .status = "uncertified",
      .receiver_path_id = receiver.path_id,
      .transmitter_path_id = source.path_id,
      .required_levels = request.regulator_refinement_levels,
      .refinement_ratio = request.regulator_refinement_ratio,
      .convergence_tolerance = request.regulator_convergence_tolerance,
      .receiver_routed_pair_count =
          request.resolved_receiver_event_pair_count,
      .receiver_pair_allocation_weight =
          request.resolved_receiver_event_pair_weight,
      .event_impulse_row_budget = request.event_impulse_budget,
      .event_position_moment_row_budget =
          request.event_position_moment_budget,
      .quadrature_impulse_row_budget = request.event_impulse_tolerance,
      .quadrature_position_moment_row_budget =
          request.event_position_moment_tolerance,
      .accepted_event_impulse = base_event,
      .refinement_series = {},
      .failure_code = "regulator_convergence_failed",
  };
  if (base_event.status != "certified_complete" ||
      !base_event.impulse.has_value() ||
      !base_event.position_moment.has_value()) {
    certificate.failure_code = base_event.failure_code.empty()
        ? "numeric_event_impulse_uncertified"
        : base_event.failure_code;
    return certificate;
  }
  const double base_causal_width = exact_decimal_value(request.causal_width);
  const double base_core_scale = exact_decimal_value(request.core_scale);

  const auto maximum_delta = [](const IntervalVector& left,
                                const IntervalVector& right) {
    double result = 0.0;
    for (std::size_t axis = 0; axis < 3; ++axis) {
      result = std::max(
          result,
          std::max(
              std::abs(left[axis].lower() - right[axis].upper()),
              std::abs(left[axis].upper() - right[axis].lower())));
    }
    return result;
  };

  for (const std::string& control_id :
       {std::string("causal_width_refinement"),
        std::string("core_scale_refinement")}) {
    NativeRegulatorRefinementSeries series{
        .control_id = control_id,
        .levels = {{
            .level = 0,
            .causal_width = request.causal_width,
            .core_scale = request.core_scale,
            .event_impulse = base_event,
            .maximum_impulse_delta_from_previous = std::nullopt,
            .maximum_position_moment_delta_from_previous = std::nullopt,
        }},
        .final_impulse_delta = std::nullopt,
        .maximum_ladder_impulse_delta = std::nullopt,
        .final_position_moment_delta = std::nullopt,
        .maximum_ladder_position_moment_delta = std::nullopt,
        .converged = false,
    };
    double scale = 1.0;
    bool all_levels_certified = true;
    double previous_delta = 0.0;
    double previous_position_moment_delta = 0.0;
    for (std::size_t level = 1;
         level < request.regulator_refinement_levels; ++level) {
      scale *= ratio;
      auto refined_request = request;
      if (control_id == "causal_width_refinement") {
        refined_request.causal_width =
            shortest_decimal_token(base_causal_width * scale);
      } else {
        refined_request.core_scale =
            shortest_decimal_token(base_core_scale * scale);
      }
      auto event = certify_native_fold_caustic_impulse(
          refined_request, receiver, source, receiver_charge, transmitter_charge,
          reception_lower, reception_upper, joint_receiver, joint_source);
      std::optional<double> delta;
      std::optional<double> position_moment_delta;
      if (event.status == "certified_complete" && event.impulse.has_value() &&
          event.position_moment.has_value()) {
        delta = maximum_delta(
            *series.levels.back().event_impulse.impulse, *event.impulse);
        position_moment_delta = maximum_delta(
            *series.levels.back().event_impulse.position_moment,
            *event.position_moment);
        previous_delta = *delta;
        previous_position_moment_delta = *position_moment_delta;
      } else {
        all_levels_certified = false;
      }
      series.levels.push_back({
          .level = level,
          .causal_width = refined_request.causal_width,
          .core_scale = refined_request.core_scale,
          .event_impulse = std::move(event),
          .maximum_impulse_delta_from_previous = delta,
          .maximum_position_moment_delta_from_previous =
              position_moment_delta,
      });
      if (!all_levels_certified) {
        break;
      }
    }
    if (all_levels_certified &&
        series.levels.size() == request.regulator_refinement_levels) {
      series.final_impulse_delta = previous_delta;
      series.final_position_moment_delta =
          previous_position_moment_delta;
      double maximum_ladder_delta = 0.0;
      double maximum_ladder_position_moment_delta = 0.0;
      for (std::size_t left = 0; left < series.levels.size(); ++left) {
        for (std::size_t right = left + 1U; right < series.levels.size();
             ++right) {
          maximum_ladder_delta = std::max(
              maximum_ladder_delta,
              maximum_delta(
                  *series.levels[left].event_impulse.impulse,
                  *series.levels[right].event_impulse.impulse));
          maximum_ladder_position_moment_delta = std::max(
              maximum_ladder_position_moment_delta,
              maximum_delta(
                  *series.levels[left].event_impulse.position_moment,
                  *series.levels[right].event_impulse.position_moment));
        }
      }
      series.maximum_ladder_impulse_delta = maximum_ladder_delta;
      series.maximum_ladder_position_moment_delta =
          maximum_ladder_position_moment_delta;
      series.converged = maximum_ladder_delta <= tolerance &&
          maximum_ladder_position_moment_delta <= tolerance;
    }
    certificate.refinement_series.push_back(std::move(series));
  }
  if (certificate.refinement_series.size() == 2U &&
      std::all_of(
          certificate.refinement_series.begin(),
          certificate.refinement_series.end(),
          [](const auto& series) { return series.converged; })) {
    certificate.status = "certified_convergent";
    certificate.failure_code.clear();
  }
  return certificate;
}

NativeFarFieldEnclosureCertificate certify_far_field_enclosure(
    const NativeCoupledEvolutionRequest& request,
    const NativePublishedPath& receiver,
    const NativePublishedPath& source,
    const std::string& emission_lower,
    const std::string& reception_time,
    std::size_t transmitter_count) {
  NativeFarFieldEnclosureCertificate certificate{
      .schema = "eom_native_far_field_enclosure_certificate/v1",
      .row_id = receiver.path_id + "/" + source.path_id + "/" +
          reception_time + "/far-field",
      .receiver_path_id = receiver.path_id,
      .transmitter_path_id = source.path_id,
      .receiver_history_id = receiver.history.history_id(),
      .transmitter_history_id = source.history.history_id(),
      .receiver_history_fingerprint =
          receiver.history.provenance_fingerprint(),
      .transmitter_history_fingerprint = source.history.provenance_fingerprint(),
      .reception_time = reception_time,
      .emission_lower = emission_lower,
      .emission_upper = reception_time,
      .status = "exact_fallback",
      .failure_code = "far_field_enclosure_not_attempted",
  };
  try {
    const Interval reception = Interval::decimal_token(reception_time);
    const Interval lower = Interval::decimal_token(emission_lower);
    const Interval emission(lower.lower(), reception.upper());
    const IntervalVector receiver_position =
        receiver.history.position_hull(reception);
    const IntervalVector transmitter_position = source.history.position_hull(emission);
    const IntervalVector displacement =
        subtract(receiver_position, transmitter_position);
    const Interval separation = norm(displacement);
    certificate.displacement_hull = displacement;
    certificate.separation = separation;
    if (!(separation.lower() > 0.0)) {
      certificate.failure_code = "FFE-GEO-01";
      return certificate;
    }

    const Interval receiver_speed =
        norm(receiver.history.velocity_hull(reception));
    const Interval transmitter_speed = norm(source.history.velocity_hull(emission));
    const Interval field_speed = Interval::decimal_token(request.field_speed);
    const Interval transmitter_factor = field_speed - transmitter_speed;
    certificate.receiver_speed = receiver_speed;
    certificate.transmitter_speed = transmitter_speed;
    certificate.transmitter_factor_lower_bound = transmitter_factor;
    if (!(transmitter_factor.lower() > 0.0)) {
      certificate.failure_code = "FFE-NORMAL-01";
      return certificate;
    }

    const Interval coupling =
        interval_absolute(Interval::decimal_token(request.coupling));
    const Interval charge_product = interval_absolute(
        Interval::decimal_token(path_charge(request, receiver.path_id)) *
        Interval::decimal_token(path_charge(request, source.path_id)));
    const Interval denominator =
        interval_square(separation) * transmitter_factor;
    const Interval raw_bound =
        coupling * charge_product * field_speed / denominator;
    const Interval magnitude_bound(0.0, raw_bound.upper());
    certificate.pair_magnitude_bound = magnitude_bound;
    if (!std::isfinite(magnitude_bound.upper())) {
      certificate.failure_code = "FFE-BOUND-01";
      return certificate;
    }

    const Interval fraction =
        Interval::decimal_token(request.far_field_enclosure_fraction);
    const Interval acceleration_tolerance =
        Interval::decimal_token(request.acceleration_tolerance);
    const Interval pair_width_budget =
        fraction * acceleration_tolerance /
        Interval::point(static_cast<double>(transmitter_count));
    certificate.pair_width_budget = pair_width_budget;
    const Interval cutoff = interval_sqrt(
        Interval::point(2.0) * coupling * charge_product *
        field_speed /
        (pair_width_budget * transmitter_factor));
    certificate.derived_cutoff_radius = cutoff;
    const double radius = magnitude_bound.upper();
    const IntervalVector acceleration{
        Interval(-radius, radius), Interval(-radius, radius),
        Interval(-radius, radius)};
    certificate.acceleration = acceleration;
    if (acceleration.front().width() > pair_width_budget.lower()) {
      certificate.failure_code = "FFE-BUDGET-01";
      return certificate;
    }

    certificate.status = "certified_enclosed";
    certificate.failure_code.clear();
    return certificate;
  } catch (const std::exception&) {
    certificate.failure_code = "FFE-BOUND-01";
    return certificate;
  }
}

ExactPairCertificate enclosed_pair_marker(
    const NativeCoupledEvolutionRequest& request,
    const NativePublishedPath& receiver,
    const NativePublishedPath& source,
    const NativeFarFieldEnclosureCertificate& enclosure) {
  return {
      .schema = "eom_native_enclosed_pair_marker/v1",
      .row_id = enclosure.row_id,
      .receiver_history_id = receiver.history.history_id(),
      .transmitter_history_id = source.history.history_id(),
      .receiver_history_fingerprint =
          receiver.history.provenance_fingerprint(),
      .transmitter_history_fingerprint = source.history.provenance_fingerprint(),
      .reception_time = enclosure.reception_time,
      .searched_lower = enclosure.emission_lower,
      .searched_upper = enclosure.emission_upper,
      .field_speed = request.field_speed,
      .root_tolerance = request.root_tolerance,
      .status = "certified_enclosed",
      .failure_code = "",
      .root_free_complement = false,
      .memory_boundary_contact = false,
      .coincident_endpoint_excluded = false,
      .precision_escalated = false,
      .achieved_precision_bits = 53,
      .visited_cells = 0,
      .excluded_cells = 0,
      .difficult_cells = 0,
      .diagnostic_detail = "root search bypassed by FFE-BUDGET-01",
      .roots = {},
  };
}

NativeAccelerationSnapshotCertificate certify_native_acceleration_snapshot(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    const std::string& reception_time,
    const NativeAccelerationSnapshotCertificate* warm_snapshot,
    const std::vector<NativePublishedPath>* warm_histories,
    bool defer_root_precision_escalation) {
  const auto total_timing_start = SteadyClock::now();
  NativeSnapshotTiming timing;
  const std::size_t logical_pair_count = histories.size() * histories.size();
  std::vector<ExactPairCertificate> root_certificates;
  root_certificates.reserve(logical_pair_count);
  std::optional<CertifiedTraversalCertificate> traversal_certificate;
  std::uint64_t traversal_excluded_pairs = 0;
  std::uint64_t traversal_exact_pairs = logical_pair_count;
  std::uint64_t traversal_enclosed_pairs = 0;
  std::uint64_t traversal_unresolved_pairs = 0;
  double enclosed_error_width_total = 0.0;
  double enclosed_error_width_max_receiver = 0.0;
  std::vector<NativeFarFieldEnclosureCertificate>
      far_field_enclosure_certificates;
  std::string pair_selection_route = "exhaustive_exact_pair_batch";
  std::string traversal_failure;
  const auto joint_root_state = [&](const std::string& row_id)
      -> const JointRootBracketRequest* {
    const auto found = request.joint_root_point_states.find(row_id);
    return found == request.joint_root_point_states.end()
        ? nullptr
        : &found->second;
  };
  const auto joint_history = [&](const std::string& path_id)
      -> const JointAffineRetainedHistory* {
    const auto found = request.joint_histories.find(path_id);
    return found == request.joint_histories.end() ? nullptr : &found->second;
  };
  std::vector<ExactPairWarmStart> warm_starts(logical_pair_count);
  std::map<std::string, const NativePublishedPath*> warm_history_by_id;
  std::map<std::pair<std::string, std::string>,
           const NativeSnapshotRootRow*> warm_root_by_pair;
  if (warm_snapshot != nullptr && warm_histories != nullptr) {
    for (const auto& path : *warm_histories) {
      warm_history_by_id.emplace(path.path_id, &path);
    }
    for (const auto& row : warm_snapshot->root_certificates) {
      warm_root_by_pair.emplace(
          std::make_pair(row.receiver_path_id, row.transmitter_path_id), &row);
    }
    std::size_t logical_index = 0;
    for (const auto& receiver : histories) {
      for (const auto& source : histories) {
        const auto prior_row = warm_root_by_pair.find(
            std::make_pair(receiver.path_id, source.path_id));
        const auto prior_receiver = warm_history_by_id.find(receiver.path_id);
        const auto prior_source = warm_history_by_id.find(source.path_id);
        if (prior_row != warm_root_by_pair.end() &&
            prior_row->second->certificate.schema ==
                "eom_native_exact_pair_certificate/v1" &&
            prior_receiver != warm_history_by_id.end() &&
            prior_source != warm_history_by_id.end()) {
          warm_starts[logical_index] = {
              .certificate = &prior_row->second->certificate,
              .receiver = &prior_receiver->second->history,
              .source = &prior_source->second->history,
          };
        }
        ++logical_index;
      }
    }
  }

  bool common_history_start = !histories.empty();
  const std::string common_start = histories.empty()
      ? reception_time
      : histories.front().history.segments().front().t_start_token();
  for (const auto& path : histories) {
    common_history_start = common_history_start && numeric_equal(
        path.history.segments().front().t_start_token(), common_start);
  }
  const auto history_window_timing_start = SteadyClock::now();
  auto causal_prefix_exclusion = certify_causal_prefix_exclusion(
      request, histories, common_start, reception_time, common_history_start);
  timing.history_window_wall_seconds +=
      elapsed_seconds(history_window_timing_start);
  const std::string active_search_lower =
      causal_prefix_exclusion.status == "certified_complete"
      ? causal_prefix_exclusion.active_search_lower
      : common_start;

  const bool use_far_field_enclosure =
      request.use_far_field_enclosure_in_evolution &&
      exact_decimal_value(request.far_field_enclosure_fraction) > 0.0 &&
      common_history_start;
  if (use_far_field_enclosure &&
      !(request.use_certified_traversal && common_history_start)) {
    pair_selection_route = "certified_far_field_then_exact_pair_batch";
    far_field_enclosure_certificates.reserve(logical_pair_count);
    std::vector<std::optional<ExactPairCertificate>> selected_certificates(
        logical_pair_count);
    std::vector<ExactPairRequest> root_requests;
    std::vector<std::size_t> root_request_logical_indices;
    root_requests.reserve(logical_pair_count);
    root_request_logical_indices.reserve(logical_pair_count);
    std::size_t logical_index = 0U;
    std::size_t receiver_index = 0U;
    std::vector<double> receiver_enclosed_widths(histories.size(), 0.0);
    for (const auto& receiver : histories) {
      for (const auto& source : histories) {
        auto enclosure = certify_far_field_enclosure(
            request, receiver, source, common_start, reception_time,
            histories.size());
        far_field_enclosure_certificates.push_back(std::move(enclosure));
        const auto& stored_enclosure =
            far_field_enclosure_certificates.back();
        if (stored_enclosure.status == "certified_enclosed") {
          selected_certificates[logical_index] = enclosed_pair_marker(
              request, receiver, source, stored_enclosure);
          ++traversal_enclosed_pairs;
          const double width =
              stored_enclosure.acceleration->front().width();
          enclosed_error_width_total = upward_nonnegative_sum(
              enclosed_error_width_total, width);
          receiver_enclosed_widths[receiver_index] = upward_nonnegative_sum(
              receiver_enclosed_widths[receiver_index], width);
        } else {
          root_request_logical_indices.push_back(logical_index);
          root_requests.push_back({
              .row_id = receiver.path_id + "/" + source.path_id + "/" +
                  reception_time,
              .receiver = &receiver.history,
              .source = &source.history,
              .receiver_path_id = receiver.path_id,
              .source_path_id = source.path_id,
              .reception_time = reception_time,
              .search_lower = active_search_lower,
              .search_upper = reception_time,
              .field_speed = request.field_speed,
              .root_tolerance = request.root_tolerance,
              .max_depth = request.root_max_depth,
              .max_cells = request.root_max_cells,
              .initial_mpfr_bits = request.initial_mpfr_bits,
              .maximum_mpfr_bits = request.maximum_mpfr_bits,
              .force_precision_escalation = false,
              .defer_precision_escalation =
                  defer_root_precision_escalation,
              .warm_start = warm_snapshot != nullptr &&
                      warm_histories != nullptr
                  ? &warm_starts[logical_index]
                  : nullptr,
              .joint_root_point_state = joint_root_state(
                  receiver.path_id + "/" + source.path_id + "/" +
                  reception_time),
              .joint_receiver_history = joint_history(receiver.path_id),
              .joint_transmitter_history = joint_history(source.path_id),
          });
        }
        ++logical_index;
      }
      ++receiver_index;
    }
    for (const double width : receiver_enclosed_widths) {
      enclosed_error_width_max_receiver =
          std::max(enclosed_error_width_max_receiver, width);
    }
    traversal_exact_pairs = root_requests.size();
    const auto exact_root_timing_start = SteadyClock::now();
    const auto exact_certificates =
        certify_exact_pair_batch(root_requests, request.thread_count);
    timing.exact_root_batch_wall_seconds +=
        elapsed_seconds(exact_root_timing_start);
    if (exact_certificates.size() != root_request_logical_indices.size()) {
      traversal_failure = "far_field_exact_fallback_coverage_incomplete";
    } else {
      for (std::size_t exact_index = 0U;
           exact_index < exact_certificates.size(); ++exact_index) {
        selected_certificates[root_request_logical_indices[exact_index]] =
            exact_certificates[exact_index];
      }
    }
    root_certificates.reserve(logical_pair_count);
    for (auto& certificate : selected_certificates) {
      if (!certificate.has_value()) {
        ++traversal_unresolved_pairs;
        continue;
      }
      root_certificates.push_back(std::move(*certificate));
    }
    if (root_certificates.size() != logical_pair_count) {
      traversal_failure = "far_field_pair_coverage_incomplete";
    }
  } else if (request.use_certified_traversal && common_history_start) {
    std::vector<MovingHistoryMember> members;
    members.reserve(histories.size());
    for (const auto& path : histories) {
      members.push_back({path.path_id, &path.history, true});
    }
    CertifiedTraversalRequest traversal_request{
        .traversal_id = request.run_id + "/snapshot/" + reception_time,
        .receivers = members,
        .sources = members,
        .reception = {reception_time, reception_time},
        .emission = {active_search_lower, reception_time},
        .field_speed = request.field_speed,
        .exact_tile_pair_limit = request.traversal_exact_tile_pair_limit,
        .maximum_nodes = request.traversal_maximum_nodes,
    };
    const auto traversal_timing_start = SteadyClock::now();
    traversal_certificate =
        certify_moving_history_traversal(traversal_request);
    timing.traversal_wall_seconds += elapsed_seconds(traversal_timing_start);
    traversal_excluded_pairs = traversal_certificate->excluded_pairs;
    traversal_exact_pairs = traversal_certificate->exact_fallback_pairs;
    traversal_enclosed_pairs = traversal_certificate->enclosed_pairs;
    traversal_unresolved_pairs = traversal_certificate->unresolved_pairs;
    pair_selection_route = use_far_field_enclosure
        ? "certified_traversal_then_far_field_then_exact_pair_batch"
        : "certified_moving_history_traversal";

    CertifiedTraversalExactBatchCertificate exact_batch{
        .schema = "eom_certified_traversal_exact_pair_batch/v1",
        .traversal_id = traversal_request.traversal_id,
        .status = "uncertified",
        .failure_code = "traversal_not_certified",
        .logical_ordered_pairs = traversal_certificate->logical_ordered_pairs,
        .excluded_pairs = traversal_certificate->excluded_pairs,
        .exact_pairs_requested = traversal_certificate->exact_fallback_pairs,
        .exact_pairs_completed = 0,
        .coverage_disjoint_complete = false,
        .exact_pair_certificates = {},
    };
    if (traversal_certificate->status == "certified_complete" &&
        !use_far_field_enclosure) {
      const auto exact_root_timing_start = SteadyClock::now();
      exact_batch = certify_traversal_exact_pair_batch({
          .traversal_request = &traversal_request,
          .traversal_certificate = &*traversal_certificate,
          .reception_time = reception_time,
          .search_lower = active_search_lower,
          .search_upper = reception_time,
          .root_tolerance = request.root_tolerance,
          .root_max_depth = request.root_max_depth,
          .root_max_cells = request.root_max_cells,
          .initial_mpfr_bits = request.initial_mpfr_bits,
          .maximum_mpfr_bits = request.maximum_mpfr_bits,
          .defer_precision_escalation =
              defer_root_precision_escalation,
          .maximum_exact_pairs = request.traversal_maximum_exact_pairs,
          .thread_count = request.thread_count,
          .warm_starts = warm_snapshot != nullptr && warm_histories != nullptr
              ? &warm_starts
              : nullptr,
      });
      timing.exact_root_batch_wall_seconds +=
          elapsed_seconds(exact_root_timing_start);
    }

    std::map<std::pair<std::size_t, std::size_t>, ExactPairCertificate>
        certificates_by_index;
    if (use_far_field_enclosure &&
        traversal_certificate->status == "certified_complete") {
      far_field_enclosure_certificates.resize(logical_pair_count);
      std::vector<ExactPairRequest> root_requests;
      std::vector<std::pair<std::size_t, std::size_t>> root_coordinates;
      std::vector<double> receiver_enclosed_widths(histories.size(), 0.0);
      for (const auto& tile : traversal_certificate->exact_tiles) {
        for (std::size_t receiver_index = tile.receiver_begin;
             receiver_index < tile.receiver_end; ++receiver_index) {
          for (std::size_t transmitter_index = tile.transmitter_begin;
               transmitter_index < tile.transmitter_end; ++transmitter_index) {
            const std::size_t logical_index =
                receiver_index * histories.size() + transmitter_index;
            const auto& receiver = histories[receiver_index];
            const auto& source = histories[transmitter_index];
            auto enclosure = certify_far_field_enclosure(
                request, receiver, source, common_start, reception_time,
                histories.size());
            far_field_enclosure_certificates[logical_index] =
                std::move(enclosure);
            const auto& stored =
                far_field_enclosure_certificates[logical_index];
            if (stored.status == "certified_enclosed") {
              certificates_by_index.emplace(
                  std::make_pair(receiver_index, transmitter_index),
                  enclosed_pair_marker(request, receiver, source, stored));
              ++traversal_enclosed_pairs;
              const double width = stored.acceleration->front().width();
              enclosed_error_width_total = upward_nonnegative_sum(
                  enclosed_error_width_total, width);
              receiver_enclosed_widths[receiver_index] =
                  upward_nonnegative_sum(
                      receiver_enclosed_widths[receiver_index], width);
              continue;
            }
            root_coordinates.emplace_back(receiver_index, transmitter_index);
            root_requests.push_back({
                .row_id = receiver.path_id + "/" + source.path_id + "/" +
                    reception_time,
                .receiver = &receiver.history,
                .source = &source.history,
                .receiver_path_id = receiver.path_id,
                .source_path_id = source.path_id,
                .reception_time = reception_time,
                .search_lower = active_search_lower,
                .search_upper = reception_time,
                .field_speed = request.field_speed,
                .root_tolerance = request.root_tolerance,
                .max_depth = request.root_max_depth,
                .max_cells = request.root_max_cells,
                .initial_mpfr_bits = request.initial_mpfr_bits,
                .maximum_mpfr_bits = request.maximum_mpfr_bits,
                .force_precision_escalation = false,
                .defer_precision_escalation =
                    defer_root_precision_escalation,
                .warm_start = warm_snapshot != nullptr &&
                        warm_histories != nullptr
                    ? &warm_starts[logical_index]
                    : nullptr,
                .joint_root_point_state = joint_root_state(
                    receiver.path_id + "/" + source.path_id + "/" +
                    reception_time),
                .joint_receiver_history = joint_history(receiver.path_id),
                .joint_transmitter_history = joint_history(source.path_id),
            });
          }
        }
      }
      for (const double width : receiver_enclosed_widths) {
        enclosed_error_width_max_receiver = std::max(
            enclosed_error_width_max_receiver, width);
      }
      traversal_exact_pairs = root_requests.size();
      const auto exact_root_timing_start = SteadyClock::now();
      const auto exact_certificates = certify_exact_pair_batch(
          root_requests, request.thread_count);
      timing.exact_root_batch_wall_seconds +=
          elapsed_seconds(exact_root_timing_start);
      if (exact_certificates.size() != root_coordinates.size()) {
        traversal_failure =
            "traversal_far_field_exact_fallback_coverage_incomplete";
      } else {
        for (std::size_t exact_index = 0U;
             exact_index < exact_certificates.size(); ++exact_index) {
          certificates_by_index.emplace(
              root_coordinates[exact_index], exact_certificates[exact_index]);
        }
      }
    } else {
      std::size_t exact_index = 0;
      for (const auto& tile : traversal_certificate->exact_tiles) {
        for (std::size_t receiver_index = tile.receiver_begin;
             receiver_index < tile.receiver_end; ++receiver_index) {
          for (std::size_t transmitter_index = tile.transmitter_begin;
               transmitter_index < tile.transmitter_end; ++transmitter_index) {
            if (exact_index < exact_batch.exact_pair_certificates.size()) {
              certificates_by_index.emplace(
                  std::make_pair(receiver_index, transmitter_index),
                  exact_batch.exact_pair_certificates[exact_index]);
            }
            ++exact_index;
          }
        }
      }
    }
    for (const auto& node : traversal_certificate->nodes) {
      if (node.status != "excluded") {
        continue;
      }
      for (std::size_t receiver_index = node.receiver_begin;
           receiver_index < node.receiver_end; ++receiver_index) {
        for (std::size_t transmitter_index = node.transmitter_begin;
             transmitter_index < node.transmitter_end; ++transmitter_index) {
          const auto& receiver = histories[receiver_index];
          const auto& source = histories[transmitter_index];
          certificates_by_index.emplace(
              std::make_pair(receiver_index, transmitter_index),
              ExactPairCertificate{
                  .schema = "eom_native_exact_pair_certificate/v1",
                  .row_id = traversal_request.traversal_id + "/excluded/" +
                      node.node_id + "/" + receiver.path_id + "/" +
                      source.path_id,
                  .receiver_history_id = receiver.history.history_id(),
                  .transmitter_history_id = source.history.history_id(),
                  .receiver_history_fingerprint =
                      receiver.history.provenance_fingerprint(),
                  .transmitter_history_fingerprint =
                      source.history.provenance_fingerprint(),
                  .reception_time = reception_time,
                  .searched_lower = active_search_lower,
                  .searched_upper = reception_time,
                  .field_speed = request.field_speed,
                  .root_tolerance = request.root_tolerance,
                  .status = "certified_complete",
                  .failure_code = "",
                  .root_free_complement = true,
                  .memory_boundary_contact = false,
                  .coincident_endpoint_excluded = false,
                  .precision_escalated = false,
                  .achieved_precision_bits = 53,
                  .visited_cells = 0,
                  .excluded_cells = 1,
                  .difficult_cells = 0,
                  .roots = {},
              });
        }
      }
    }
    if (traversal_certificate->status != "certified_complete" ||
        certificates_by_index.size() != logical_pair_count) {
      if (traversal_failure.empty()) {
        traversal_failure = traversal_certificate->failure_code.empty()
            ? exact_batch.failure_code
            : traversal_certificate->failure_code;
      }
      if (traversal_failure.empty()) {
        traversal_failure = "pair_coverage_incomplete";
      }
    }
    for (std::size_t receiver_index = 0;
         receiver_index < histories.size(); ++receiver_index) {
      for (std::size_t transmitter_index = 0;
           transmitter_index < histories.size(); ++transmitter_index) {
        auto found = certificates_by_index.find({receiver_index, transmitter_index});
        if (found != certificates_by_index.end()) {
          root_certificates.push_back(std::move(found->second));
          continue;
        }
        const auto& receiver = histories[receiver_index];
        const auto& source = histories[transmitter_index];
        root_certificates.push_back({
            .schema = "eom_native_exact_pair_certificate/v1",
            .row_id = traversal_request.traversal_id + "/unresolved/" +
                receiver.path_id + "/" + source.path_id,
            .receiver_history_id = receiver.history.history_id(),
            .transmitter_history_id = source.history.history_id(),
            .receiver_history_fingerprint =
                receiver.history.provenance_fingerprint(),
            .transmitter_history_fingerprint =
                source.history.provenance_fingerprint(),
            .reception_time = reception_time,
            .searched_lower = active_search_lower,
            .searched_upper = reception_time,
            .field_speed = request.field_speed,
            .root_tolerance = request.root_tolerance,
            .status = "uncertified",
            .failure_code = traversal_failure,
            .root_free_complement = false,
            .memory_boundary_contact = false,
            .coincident_endpoint_excluded = false,
            .precision_escalated = false,
            .achieved_precision_bits = 0,
            .visited_cells = 0,
            .excluded_cells = 0,
            .difficult_cells = 1,
            .roots = {},
        });
      }
    }
  } else {
    // Warm-history token equality is a property of each source path, not of
    // each ordered pair; certify it once per path here so the pair batch does
    // not repeat an O(retained-window) token walk per pair per snapshot.
    std::vector<WarmSourceEqualityBounds> warm_source_equality;
    const bool warm_equality_available =
        warm_snapshot != nullptr && warm_histories != nullptr;
    if (warm_equality_available) {
      warm_source_equality.reserve(histories.size());
      for (const auto& source : histories) {
        const auto warm_source = warm_history_by_id.find(source.path_id);
        if (warm_source == warm_history_by_id.end()) {
          warm_source_equality.push_back(
              {-std::numeric_limits<double>::infinity(), 0});
          continue;
        }
        const std::string transmitter_search_lower =
            causal_prefix_exclusion.status == "certified_complete"
            ? active_search_lower
            : source.history.segments().front().t_start_token();
        warm_source_equality.push_back(compute_warm_source_equality_bounds(
            source.history, warm_source->second->history,
            std::strtod(transmitter_search_lower.c_str(), nullptr)));
      }
    }
    std::vector<ExactPairRequest> root_requests;
    root_requests.reserve(logical_pair_count);
    std::size_t transmitter_index = 0;
    for (const auto& receiver : histories) {
      transmitter_index = 0;
      for (const auto& source : histories) {
        root_requests.push_back({
            .row_id = receiver.path_id + "/" + source.path_id + "/" +
                reception_time,
            .receiver = &receiver.history,
            .source = &source.history,
            .receiver_path_id = receiver.path_id,
            .source_path_id = source.path_id,
            .reception_time = reception_time,
            .search_lower =
                causal_prefix_exclusion.status == "certified_complete"
                ? active_search_lower
                : source.history.segments().front().t_start_token(),
            .search_upper = reception_time,
            .field_speed = request.field_speed,
            .root_tolerance = request.root_tolerance,
            .max_depth = request.root_max_depth,
            .max_cells = request.root_max_cells,
            .initial_mpfr_bits = request.initial_mpfr_bits,
            .maximum_mpfr_bits = request.maximum_mpfr_bits,
            .force_precision_escalation = false,
            .defer_precision_escalation =
                defer_root_precision_escalation,
            .warm_start = warm_equality_available
                ? &warm_starts[root_requests.size()]
                : nullptr,
            .warm_source_equality_precomputed = warm_equality_available,
            .warm_source_prefix_token_stable_upper = warm_equality_available
                ? warm_source_equality[transmitter_index].prefix_token_stable_upper
                : -std::numeric_limits<double>::infinity(),
            .warm_source_aligned_equal_segments = warm_equality_available
                ? warm_source_equality[transmitter_index].aligned_equal_segments
                : 0,
            .joint_root_point_state = joint_root_state(
                receiver.path_id + "/" + source.path_id + "/" +
                reception_time),
            .joint_receiver_history = joint_history(receiver.path_id),
            .joint_transmitter_history = joint_history(source.path_id),
        });
        ++transmitter_index;
      }
    }
    const auto exact_root_timing_start = SteadyClock::now();
    root_certificates =
        certify_exact_pair_batch(root_requests, request.thread_count);
    timing.exact_root_batch_wall_seconds +=
        elapsed_seconds(exact_root_timing_start);
  }
  for (const auto& root : root_certificates) {
    if (root.schema == "eom_native_enclosed_pair_marker/v1") {
      continue;
    }
    ++timing.root_pair_count;
    timing.root_reevaluated_cells += root.reevaluated_cells;
    timing.root_warm_excluded_cells += root.warm_excluded_cells;
    timing.root_binary64_cpu_seconds += root.binary64_cpu_seconds;
    timing.root_mpfr_cpu_seconds += root.mpfr_cpu_seconds;
    timing.root_mpfr_pair_count += root.mpfr_attempt_count > 0U ? 1U : 0U;
    timing.root_mpfr_attempt_count += root.mpfr_attempt_count;
    timing.root_mpfr_escalation_cpu_seconds +=
        root.mpfr_escalation_cpu_seconds;
    timing.root_mpfr_escalation_attempt_count +=
        root.mpfr_escalation_attempt_count;
  }
  const bool root_precision_escalation_deferred = std::any_of(
      root_certificates.begin(), root_certificates.end(),
      [](const auto& root) {
        return root.failure_code ==
            "numeric_precision_escalation_deferred_for_cost_feedback";
      });
  std::vector<NativePairAccelerationRequest> pair_requests;
  pair_requests.reserve(root_certificates.size());
  std::vector<NativeSnapshotRootRow> root_rows;
  root_rows.reserve(root_certificates.size());
  std::size_t index = 0;
  for (const auto& receiver : histories) {
    for (const auto& source : histories) {
      const auto& root = root_certificates[index];
      const Interval reception = Interval::decimal_token(reception_time);
      const Interval receiver_speed =
          norm(receiver.history.velocity_hull(reception));
      const Interval field_speed =
          Interval::decimal_token(request.field_speed);
      const bool self_pair_on_or_above_rail =
          receiver.path_id == source.path_id &&
          root.coincident_endpoint_excluded &&
          !root.roots.empty() &&
          receiver_speed.upper() >= field_speed.lower();
      pair_requests.push_back({
          .row_id = root.row_id,
          .receiver_path_id = receiver.path_id,
          .transmitter_path_id = source.path_id,
          .receiver_history = &receiver.history,
          .transmitter_history = &source.history,
          .root_certificate = &root,
          .far_field_enclosure =
              root.schema == "eom_native_enclosed_pair_marker/v1" &&
                      index < far_field_enclosure_certificates.size()
                  ? &far_field_enclosure_certificates[index]
                  : nullptr,
          .receiver_charge = path_charge(request, receiver.path_id),
          .transmitter_charge = path_charge(request, source.path_id),
          .coupling = request.coupling,
          .chart = root.schema == "eom_native_enclosed_pair_marker/v1"
              ? "far_field_enclosure"
              : request.chart_policy == "finite_width" ||
                      (request.chart_policy ==
                           "sharp_with_finite_width_fallback" &&
                       (pair_is_adjudicated_finite_width(
                            request, receiver.path_id, source.path_id) ||
                        (self_pair_on_or_above_rail &&
                         root.status == "certified_complete" &&
                         !root.memory_boundary_contact) ||
                        (root.status == "caustic_route_required" &&
                         (root.failure_code ==
                              "numeric_transmitter_factor_sign_uncertified" ||
                          root.failure_code ==
                              "numeric_self_root_cluster_uncertified") &&
                         !root.memory_boundary_contact)))
                  ? "finite_width"
                  : "sharp",
          .transmitter_factor_floor = request.transmitter_factor_floor,
          .causal_width = request.causal_width,
          .core_scale = request.core_scale,
          .acceleration_tolerance = request.acceleration_tolerance,
          .quadrature_tolerance = request.quadrature_tolerance,
          .quadrature_max_depth = request.quadrature_max_depth,
          .quadrature_max_cells = request.quadrature_max_cells,
          .initial_mpfr_bits = request.initial_mpfr_bits,
          .maximum_mpfr_bits = request.maximum_mpfr_bits,
          .force_precision_escalation = false,
          .use_analytic_pinned_fold = request.use_analytic_pinned_fold,
          .use_correlated_self_chord = request.use_correlated_self_chord,
          .use_stable_circular_residual =
              request.use_stable_circular_residual,
      });
      root_rows.push_back({receiver.path_id, source.path_id, root});
      ++index;
    }
  }
  const auto acceleration_timing_start = SteadyClock::now();
  auto acceleration = certify_acceleration_reconstruction(
      path_ids(request), pair_requests, request.thread_count);
  const auto accumulate_acceleration_detail = [&](const auto& reconstruction) {
    timing.finite_width_execution_union_wall_seconds +=
        reconstruction.finite_width_execution_union_wall_seconds;
    timing.sharp_execution_union_wall_seconds +=
        reconstruction.sharp_execution_union_wall_seconds;
    timing.finite_width_sharp_overlap_wall_seconds +=
        reconstruction.finite_width_sharp_overlap_wall_seconds;
    timing.acceleration_worker_idle_orchestration_wall_seconds +=
        reconstruction.worker_idle_orchestration_wall_seconds;
    for (const auto& pair : reconstruction.pair_certificates) {
      timing.acceleration_precision_escalation_worker_seconds +=
          pair.precision_escalation_wall_seconds;
      timing.acceleration_precision_escalation_attempt_count +=
          pair.precision_escalation_attempt_count;
    }
  };
  if (request.chart_policy == "sharp_with_finite_width_fallback") {
    bool retry_acceleration = false;
    for (std::size_t pair_index = 0;
         pair_index < acceleration.pair_certificates.size(); ++pair_index) {
      const auto& pair = acceleration.pair_certificates[pair_index];
      if (pair.status == "uncertified" && pair.chart == "sharp" &&
          pair.failure_code ==
              "sharp acceleration enclosure exceeds the declared tolerance" &&
          !root_certificates[pair_index].memory_boundary_contact) {
        bool refined_sharp_certified = false;
        double refined_root_tolerance =
            scalar_token(root_certificates[pair_index].root_tolerance);
        for (std::size_t level = 0; level < 2U; ++level) {
          refined_root_tolerance *= 0.1;
          const auto refined_root_timing_start = SteadyClock::now();
          const auto refined_root = certify_exact_pair({
              .row_id = root_certificates[pair_index].row_id +
                  "/acceleration-refinement-" + std::to_string(level + 1U),
              .receiver = pair_requests[pair_index].receiver_history,
              .source = pair_requests[pair_index].transmitter_history,
              .reception_time = reception_time,
              .search_lower = root_certificates[pair_index].searched_lower,
              .search_upper = root_certificates[pair_index].searched_upper,
              .field_speed = request.field_speed,
              .root_tolerance = decimal_token(refined_root_tolerance),
              .max_depth = request.root_max_depth,
              .max_cells = request.root_max_cells,
              .initial_mpfr_bits = request.initial_mpfr_bits,
              .maximum_mpfr_bits = request.maximum_mpfr_bits,
              .force_precision_escalation = false,
          });
          timing.exact_root_batch_wall_seconds +=
              elapsed_seconds(refined_root_timing_start);
          ++timing.root_pair_count;
          timing.root_reevaluated_cells += refined_root.reevaluated_cells;
          timing.root_warm_excluded_cells += refined_root.warm_excluded_cells;
          timing.root_binary64_cpu_seconds +=
              refined_root.binary64_cpu_seconds;
          timing.root_mpfr_cpu_seconds += refined_root.mpfr_cpu_seconds;
          timing.root_mpfr_pair_count +=
              refined_root.mpfr_attempt_count > 0U ? 1U : 0U;
          timing.root_mpfr_attempt_count += refined_root.mpfr_attempt_count;
          timing.root_mpfr_escalation_cpu_seconds +=
              refined_root.mpfr_escalation_cpu_seconds;
          timing.root_mpfr_escalation_attempt_count +=
              refined_root.mpfr_escalation_attempt_count;
          if (refined_root.status != "certified_complete" ||
              !refined_root.root_free_complement ||
              refined_root.memory_boundary_contact) {
            break;
          }
          root_certificates[pair_index] = refined_root;
          const auto refined_pair =
              certify_pair_acceleration(pair_requests[pair_index]);
          if (refined_pair.status != "uncertified") {
            refined_sharp_certified = true;
            break;
          }
        }
        if (!refined_sharp_certified) {
          pair_requests[pair_index].chart = "finite_width";
        }
        root_rows[pair_index].certificate = root_certificates[pair_index];
        retry_acceleration = true;
      }
    }
    if (retry_acceleration) {
      accumulate_acceleration_detail(acceleration);
      acceleration = certify_acceleration_reconstruction(
          path_ids(request), pair_requests, request.thread_count);
    }
  }
  accumulate_acceleration_detail(acceleration);
  timing.acceleration_wall_seconds +=
      elapsed_seconds(acceleration_timing_start);
  const std::uint64_t acceleration_unresolved_pairs =
      static_cast<std::uint64_t>(std::count_if(
          acceleration.pair_certificates.begin(),
          acceleration.pair_certificates.end(), [](const auto& pair) {
            return pair.status == "uncertified" ||
                !pair.total_acceleration.has_value();
          }));
  if (acceleration_unresolved_pairs > traversal_unresolved_pairs) {
    const std::uint64_t newly_unresolved =
        acceleration_unresolved_pairs - traversal_unresolved_pairs;
    if (newly_unresolved <= traversal_exact_pairs) {
      traversal_exact_pairs -= newly_unresolved;
      traversal_unresolved_pairs = acceleration_unresolved_pairs;
    }
  }
  const bool pair_ledger_complete =
      traversal_excluded_pairs + traversal_exact_pairs +
          traversal_enclosed_pairs + traversal_unresolved_pairs ==
      logical_pair_count;
  const double far_field_fraction =
      exact_decimal_value(request.far_field_enclosure_fraction);
  const double enclosed_width_budget = far_field_fraction == 0.0
      ? 0.0
      : (Interval::decimal_token(request.far_field_enclosure_fraction) *
         Interval::decimal_token(request.acceleration_tolerance)).lower();
  std::string failure_code;
  if (!pair_ledger_complete) {
    failure_code = "FFE-LEDGER-01";
  } else if (enclosed_error_width_max_receiver > enclosed_width_budget) {
    failure_code = "FFE-SUM-01";
  } else if (root_precision_escalation_deferred) {
    failure_code = "root_precision_escalation_deferred_for_cost_feedback";
  } else if (!traversal_failure.empty()) {
    failure_code = traversal_failure;
  } else if (std::any_of(
          root_certificates.begin(), root_certificates.end(),
          [](const auto& root) { return root.memory_boundary_contact; })) {
    failure_code = "insufficient_history_depth";
  } else if (acceleration.status != "certified_complete") {
    failure_code = "root_completeness_not_certified";
  }
  timing.total_wall_seconds = elapsed_seconds(total_timing_start);
  return {
      .schema = "eom_native_acceleration_snapshot_certificate/v1",
      .status = failure_code.empty() ? "certified_complete" : "uncertified",
      .reception_time = reception_time,
      .failure_code = failure_code,
      .pair_selection_route = pair_selection_route,
      .logical_ordered_pairs = logical_pair_count,
      .traversal_excluded_pairs = traversal_excluded_pairs,
      .traversal_exact_pairs = traversal_exact_pairs,
      .traversal_enclosed_pairs = traversal_enclosed_pairs,
      .traversal_unresolved_pairs = traversal_unresolved_pairs,
      .enclosed_error_width_total = enclosed_error_width_total,
      .enclosed_error_width_max_receiver =
          enclosed_error_width_max_receiver,
      .traversal_certificate = std::move(traversal_certificate),
      .far_field_enclosure_certificates =
          std::move(far_field_enclosure_certificates),
      .causal_prefix_exclusion = std::move(causal_prefix_exclusion),
      .root_certificates = std::move(root_rows),
      .acceleration = std::move(acceleration),
      .timing = timing,
  };
}

NativeAtomicStepCertificate certify_native_atomic_coupled_step_impl(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    std::size_t step_index,
    const std::string& start_time,
    const std::string& end_time,
    NativeAtomicStepTiming* timing,
    const NativeAccelerationSnapshotCertificate* reusable_start_snapshot,
    bool defer_endpoint_root_precision_escalation) {
  validate_request(request);
  validate_step_inputs(request, histories, start_time, end_time);
  auto full = corrected_substep(
      request, histories, start_time, end_time, reusable_start_snapshot,
      defer_endpoint_root_precision_escalation);
  timing->corrected_substeps_wall_seconds +=
      full.certificate.timing.total_wall_seconds;
  timing->history_copy_hash_wall_seconds +=
      full.certificate.timing.history_copy_hash_wall_seconds;
  timing->reused_start_snapshot_count +=
      full.certificate.timing.reused_start_snapshot_count;
  if (!full.histories.has_value()) {
    const std::string failure = full.certificate.failure_code.empty()
        ? "coupled_correction_failed"
        : full.certificate.failure_code;
    std::vector<NativeCorrectedSubstepCertificate> substeps;
    substeps.push_back(std::move(full.certificate));
    return rejected_step(
        request, histories, step_index, start_time, end_time,
        std::move(substeps), failure);
  }

  const double midpoint_value =
      (scalar_token(start_time) + scalar_token(end_time)) * 0.5;
  const std::string midpoint = decimal_token(midpoint_value);
  auto first_half_request = request;
  first_half_request.allow_pending_finite_width_exit = true;
  auto first_half = corrected_substep(
      first_half_request, histories, start_time, midpoint,
      &full.certificate.start_snapshot,
      defer_endpoint_root_precision_escalation);
  timing->corrected_substeps_wall_seconds +=
      first_half.certificate.timing.total_wall_seconds;
  timing->history_copy_hash_wall_seconds +=
      first_half.certificate.timing.history_copy_hash_wall_seconds;
  timing->reused_start_snapshot_count +=
      first_half.certificate.timing.reused_start_snapshot_count;
  if (!first_half.histories.has_value()) {
    const std::string failure = first_half.certificate.failure_code.empty()
        ? "coupled_correction_failed"
        : first_half.certificate.failure_code;
    std::vector<NativeCorrectedSubstepCertificate> substeps;
    substeps.push_back(std::move(full.certificate));
    substeps.push_back(std::move(first_half.certificate));
    return rejected_step(
        request, histories, step_index, start_time, end_time,
        std::move(substeps), failure, full.histories);
  }
  if (!first_half.certificate.endpoint_snapshot.has_value()) {
    throw std::runtime_error(
        "accepted first-half substep lacks a reusable endpoint snapshot");
  }
  auto second_half_request = request;
  if (!request.joint_histories.empty()) {
    if (!first_half.joint_histories.has_value()) {
      throw std::runtime_error(
          "accepted first-half substep lacks joint histories");
    }
    second_half_request.joint_histories = *first_half.joint_histories;
  }
  for (const auto& state :
       first_half.certificate.finite_width_state_certificates) {
    const auto pair = std::make_pair(
        state.receiver_path_id, state.transmitter_path_id);
    insert_sorted_pair(
        second_half_request.adjudicated_finite_width_pairs, pair);
  }
  auto second_half = corrected_substep(
      second_half_request, *first_half.histories, midpoint, end_time,
      &*first_half.certificate.endpoint_snapshot,
      defer_endpoint_root_precision_escalation);
  timing->corrected_substeps_wall_seconds +=
      second_half.certificate.timing.total_wall_seconds;
  timing->history_copy_hash_wall_seconds +=
      second_half.certificate.timing.history_copy_hash_wall_seconds;
  timing->reused_start_snapshot_count +=
      second_half.certificate.timing.reused_start_snapshot_count;
  if (!second_half.histories.has_value()) {
    const std::string failure = second_half.certificate.failure_code.empty()
        ? "coupled_correction_failed"
        : second_half.certificate.failure_code;
    std::vector<NativeCorrectedSubstepCertificate> substeps;
    substeps.push_back(std::move(full.certificate));
    substeps.push_back(std::move(first_half.certificate));
    substeps.push_back(std::move(second_half.certificate));
    return rejected_step(
        request, histories, step_index, start_time, end_time,
        std::move(substeps), failure, first_half.histories);
  }

  std::vector<SubstepAttempt> quarter_attempts;
  quarter_attempts.reserve(4U);
  if (request.use_quarter_step_publication) {
    const double start_value = scalar_token(start_time);
    const double end_value = scalar_token(end_time);
    const double span = end_value - start_value;
    const std::array<std::string, 5> quarter_times{
        start_time,
        decimal_token(start_value + 0.25 * span),
        midpoint,
        decimal_token(start_value + 0.75 * span),
        end_time};
    const std::vector<NativePublishedPath>* quarter_input = &histories;
    const NativeAccelerationSnapshotCertificate* quarter_start_snapshot =
        &full.certificate.start_snapshot;
    for (std::size_t quarter = 0U; quarter < 4U; ++quarter) {
      auto quarter_request = request;
      if (!request.joint_histories.empty() && !quarter_attempts.empty()) {
        if (!quarter_attempts.back().joint_histories.has_value()) {
          throw std::runtime_error(
              "accepted quarter substep lacks joint histories");
        }
        quarter_request.joint_histories =
            *quarter_attempts.back().joint_histories;
      }
      quarter_request.allow_pending_finite_width_exit = quarter < 3U;
      if (!quarter_attempts.empty()) {
        for (const auto& state : quarter_attempts.back()
                                     .certificate
                                     .finite_width_state_certificates) {
          insert_sorted_pair(
              quarter_request.adjudicated_finite_width_pairs,
              std::make_pair(state.receiver_path_id, state.transmitter_path_id));
        }
      }
      auto attempt = corrected_substep(
          quarter_request, *quarter_input, quarter_times[quarter],
          quarter_times[quarter + 1U], quarter_start_snapshot,
          defer_endpoint_root_precision_escalation);
      timing->corrected_substeps_wall_seconds +=
          attempt.certificate.timing.total_wall_seconds;
      timing->history_copy_hash_wall_seconds +=
          attempt.certificate.timing.history_copy_hash_wall_seconds;
      timing->reused_start_snapshot_count +=
          attempt.certificate.timing.reused_start_snapshot_count;
      const bool succeeded = attempt.histories.has_value();
      quarter_attempts.push_back(std::move(attempt));
      if (!succeeded) {
        const std::string failure =
            quarter_attempts.back().certificate.failure_code.empty()
            ? "coupled_correction_failed"
            : quarter_attempts.back().certificate.failure_code;
        const std::optional<std::vector<NativePublishedPath>> candidate =
            quarter_attempts.size() > 1U
            ? quarter_attempts[quarter_attempts.size() - 2U].histories
            : full.histories;
        std::vector<NativeCorrectedSubstepCertificate> substeps;
        substeps.push_back(std::move(full.certificate));
        substeps.push_back(std::move(first_half.certificate));
        substeps.push_back(std::move(second_half.certificate));
        for (auto& quarter_attempt : quarter_attempts) {
          substeps.push_back(std::move(quarter_attempt.certificate));
        }
        return rejected_step(
            request, histories, step_index, start_time, end_time,
            std::move(substeps), failure, candidate);
      }
      if (!quarter_attempts.back().certificate.endpoint_snapshot.has_value()) {
        throw std::runtime_error(
            "accepted quarter substep lacks a reusable endpoint snapshot");
      }
      quarter_input = &*quarter_attempts.back().histories;
      quarter_start_snapshot =
          &*quarter_attempts.back().certificate.endpoint_snapshot;
    }
  }

  const auto& coarse_histories = request.use_quarter_step_publication
      ? *second_half.histories
      : *full.histories;
  const auto& fine_histories = request.use_quarter_step_publication
      ? *quarter_attempts.back().histories
      : *second_half.histories;
  const std::map<std::string, JointAffineRetainedHistory>*
      fine_joint_histories = nullptr;
  if (!request.joint_histories.empty()) {
    const auto& selected_joint = request.use_quarter_step_publication
        ? quarter_attempts.back().joint_histories
        : second_half.joint_histories;
    if (!selected_joint.has_value()) {
      throw std::runtime_error(
          "accepted fine candidate lacks joint histories");
    }
    fine_joint_histories = &*selected_joint;
  }
  auto local_errors = endpoint_local_errors(
      coarse_histories, fine_histories, end_time);
  std::vector<NativeCorrectedSubstepCertificate> substeps;
  substeps.push_back(std::move(full.certificate));
  substeps.push_back(std::move(first_half.certificate));
  substeps.push_back(std::move(second_half.certificate));
  for (auto& quarter_attempt : quarter_attempts) {
    substeps.push_back(std::move(quarter_attempt.certificate));
  }
  const double position_tolerance = tolerance_value(
      request.position_tolerance, "position tolerance");
  const double velocity_tolerance = tolerance_value(
      request.velocity_tolerance, "velocity tolerance");
  if (std::any_of(
          local_errors.begin(), local_errors.end(), [&](const auto& error) {
            return error.position_error > position_tolerance ||
                   error.velocity_error > velocity_tolerance;
          })) {
    return rejected_step(
        request, histories, step_index, start_time, end_time,
        std::move(substeps), "numeric_step_budget_exceeded",
        fine_histories, std::move(local_errors));
  }

  const auto inflation_timing_start = SteadyClock::now();
  MultiratePublication multirate_publication;
  if (!request.joint_histories.empty() &&
      request.use_synchronized_multirate_publication) {
    throw std::invalid_argument(
        "joint-state publication does not yet support multirate selection");
  }
  auto accepted_histories = request.use_synchronized_multirate_publication
      ? (multirate_publication = synchronized_multirate_histories(
             request, histories, *full.histories, *second_half.histories,
             local_errors),
         multirate_publication.histories)
      : inflate_fine_histories(
            histories, fine_histories, local_errors);
  auto accepted_joint_histories = fine_joint_histories == nullptr
      ? std::map<std::string, JointAffineRetainedHistory>{}
      : inflate_joint_histories(
            request.joint_histories, *fine_joint_histories, local_errors);
  timing->history_copy_hash_wall_seconds +=
      elapsed_seconds(inflation_timing_start);
  if (!substeps.back().endpoint_snapshot.has_value()) {
    throw std::runtime_error("accepted candidate substep lacks endpoint snapshot");
  }
  const auto recertification_timing_start = SteadyClock::now();
  auto recertification_request = request;
  recertification_request.joint_histories = accepted_joint_histories;
  auto accepted_snapshot = certify_native_acceleration_snapshot(
      recertification_request, accepted_histories, end_time,
      request.use_warm_root_exclusion
          ? &*substeps.back().endpoint_snapshot
          : nullptr,
      request.use_warm_root_exclusion ? &fine_histories : nullptr,
      defer_endpoint_root_precision_escalation);
  timing->recertification_wall_seconds +=
      elapsed_seconds(recertification_timing_start);
  if (!snapshot_evaluation_succeeded(request, accepted_snapshot)) {
    const std::string failure = accepted_snapshot.failure_code.empty()
        ? "root_completeness_not_certified"
        : accepted_snapshot.failure_code;
    return rejected_step(
        request, histories, step_index, start_time, end_time,
        std::move(substeps), failure, accepted_histories,
        std::move(local_errors), std::move(accepted_snapshot));
  }
  const double accepted_correction_error = acceleration_enclosure_error(
      snapshot_totals(*substeps.back().endpoint_snapshot),
      snapshot_totals(accepted_snapshot));
  if (accepted_correction_error > tolerance_value(
          request.correction_tolerance, "correction tolerance")) {
    auto rejection = rejected_step(
        request, histories, step_index, start_time, end_time,
        std::move(substeps), "coupled_correction_failed", accepted_histories,
        std::move(local_errors));
    rejection.correction_residual = accepted_correction_error;
    return rejection;
  }

  const auto fingerprint_timing_start = SteadyClock::now();
  const auto input_fingerprints = fingerprints(histories);
  const auto candidate_fingerprints = fingerprints(accepted_histories);
  const auto published_fingerprints = fingerprints(accepted_histories);
  timing->history_copy_hash_wall_seconds +=
      elapsed_seconds(fingerprint_timing_start);
  return {
      .schema = "eom_native_atomic_coupled_step_certificate/v1",
      .status = "accepted",
      .run_id = request.run_id,
      .step_index = step_index,
      .attempted_start = start_time,
      .attempted_end = end_time,
      .accepted_time = end_time,
      .input_history_fingerprints = input_fingerprints,
      .published_histories = std::move(accepted_histories),
      .published_joint_histories = std::move(accepted_joint_histories),
      .diagnostic_candidate_histories = std::nullopt,
      .candidate_history_fingerprints = candidate_fingerprints,
      .substeps = std::move(substeps),
      .accepted_snapshot = std::move(accepted_snapshot),
      .recertification_snapshot = std::nullopt,
      .local_errors = std::move(local_errors),
      .multirate_synchronization_errors =
          std::move(multirate_publication.synchronization_errors),
      .multirate_coarse_path_ids =
          std::move(multirate_publication.coarse_path_ids),
      .failure_code = "",
      .correction_residual = std::nullopt,
      .correction_retry_scale = 0.0,
      .evidence_status = "executable_architecture_evidence",
      .integration_method = integration_method(request),
      .reduction_policy = kDeterministicReductionPolicy,
      .publication_atomic = same_fingerprints(
          candidate_fingerprints, published_fingerprints),
  };
}

NativeAtomicStepCertificate certify_native_atomic_coupled_step(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    std::size_t step_index,
    const std::string& start_time,
    const std::string& end_time,
    const NativeAccelerationSnapshotCertificate* reusable_start_snapshot,
    bool defer_endpoint_root_precision_escalation) {
  const auto timing_start = SteadyClock::now();
  NativeAtomicStepTiming timing;
  auto certificate = certify_native_atomic_coupled_step_impl(
      request, histories, step_index, start_time, end_time, &timing,
      reusable_start_snapshot, defer_endpoint_root_precision_escalation);
  timing.total_wall_seconds = elapsed_seconds(timing_start);
  if (certificate.status == "rejected") {
    timing.rejection_wall_seconds = timing.total_wall_seconds;
  }
  certificate.timing = timing;
  return certificate;
}

void accumulate_snapshot_timing(
    NativeEvolutionTiming& total,
    const NativeAccelerationSnapshotCertificate& snapshot) {
  ++total.snapshot_count;
  total.snapshot_total_wall_seconds += snapshot.timing.total_wall_seconds;
  total.history_window_wall_seconds +=
      snapshot.timing.history_window_wall_seconds;
  total.traversal_wall_seconds += snapshot.timing.traversal_wall_seconds;
  total.exact_root_batch_wall_seconds +=
      snapshot.timing.exact_root_batch_wall_seconds;
  total.root_binary64_cpu_seconds +=
      snapshot.timing.root_binary64_cpu_seconds;
  total.root_pair_count += snapshot.timing.root_pair_count;
  total.root_reevaluated_cells += snapshot.timing.root_reevaluated_cells;
  total.root_warm_excluded_cells += snapshot.timing.root_warm_excluded_cells;
  total.root_mpfr_cpu_seconds += snapshot.timing.root_mpfr_cpu_seconds;
  total.root_mpfr_pair_count += snapshot.timing.root_mpfr_pair_count;
  total.root_mpfr_attempt_count += snapshot.timing.root_mpfr_attempt_count;
  total.root_mpfr_escalation_cpu_seconds +=
      snapshot.timing.root_mpfr_escalation_cpu_seconds;
  total.root_mpfr_escalation_attempt_count +=
      snapshot.timing.root_mpfr_escalation_attempt_count;
  total.acceleration_wall_seconds += snapshot.timing.acceleration_wall_seconds;
  total.finite_width_execution_union_wall_seconds +=
      snapshot.timing.finite_width_execution_union_wall_seconds;
  total.sharp_execution_union_wall_seconds +=
      snapshot.timing.sharp_execution_union_wall_seconds;
  total.finite_width_sharp_overlap_wall_seconds +=
      snapshot.timing.finite_width_sharp_overlap_wall_seconds;
  total.acceleration_worker_idle_orchestration_wall_seconds +=
      snapshot.timing.acceleration_worker_idle_orchestration_wall_seconds;
  total.acceleration_precision_escalation_worker_seconds +=
      snapshot.timing.acceleration_precision_escalation_worker_seconds;
  total.acceleration_precision_escalation_attempt_count +=
      snapshot.timing.acceleration_precision_escalation_attempt_count;
}

void accumulate_corrected_substep_timing(
    NativeEvolutionTiming& total,
    const NativeCorrectedSubstepTiming& substep) {
  total.snapshot_count += substep.snapshot_count;
  total.snapshot_total_wall_seconds += substep.snapshot_total_wall_seconds;
  total.history_window_wall_seconds += substep.history_window_wall_seconds;
  total.traversal_wall_seconds += substep.traversal_wall_seconds;
  total.exact_root_batch_wall_seconds +=
      substep.exact_root_batch_wall_seconds;
  total.root_binary64_cpu_seconds += substep.root_binary64_cpu_seconds;
  total.root_pair_count += substep.root_pair_count;
  total.root_reevaluated_cells += substep.root_reevaluated_cells;
  total.root_warm_excluded_cells += substep.root_warm_excluded_cells;
  total.root_mpfr_cpu_seconds += substep.root_mpfr_cpu_seconds;
  total.root_mpfr_pair_count += substep.root_mpfr_pair_count;
  total.root_mpfr_attempt_count += substep.root_mpfr_attempt_count;
  total.root_mpfr_escalation_cpu_seconds +=
      substep.root_mpfr_escalation_cpu_seconds;
  total.root_mpfr_escalation_attempt_count +=
      substep.root_mpfr_escalation_attempt_count;
  total.acceleration_wall_seconds += substep.acceleration_wall_seconds;
  total.finite_width_execution_union_wall_seconds +=
      substep.finite_width_execution_union_wall_seconds;
  total.sharp_execution_union_wall_seconds +=
      substep.sharp_execution_union_wall_seconds;
  total.finite_width_sharp_overlap_wall_seconds +=
      substep.finite_width_sharp_overlap_wall_seconds;
  total.acceleration_worker_idle_orchestration_wall_seconds +=
      substep.acceleration_worker_idle_orchestration_wall_seconds;
  total.acceleration_precision_escalation_worker_seconds +=
      substep.acceleration_precision_escalation_worker_seconds;
  total.acceleration_precision_escalation_attempt_count +=
      substep.acceleration_precision_escalation_attempt_count;
  total.regulator_ladder_wall_seconds +=
      substep.regulator_ladder_wall_seconds;
  total.common_domain_wall_seconds += substep.common_domain_wall_seconds;
}

NativeEvolutionTiming summarize_evolution_timing(
    const std::vector<NativeAtomicStepCertificate>& steps) {
  NativeEvolutionTiming timing;
  for (const auto& step : steps) {
    timing.history_copy_hash_wall_seconds +=
        step.timing.history_copy_hash_wall_seconds;
    timing.correction_wall_seconds +=
        step.timing.corrected_substeps_wall_seconds;
    timing.reused_start_snapshot_count +=
        step.timing.reused_start_snapshot_count;
    timing.recertification_wall_seconds +=
        step.timing.recertification_wall_seconds;
    timing.rejection_wall_seconds += step.timing.rejection_wall_seconds;
    for (const auto& substep : step.substeps) {
      accumulate_corrected_substep_timing(timing, substep.timing);
    }
    if (step.accepted_snapshot.has_value()) {
      accumulate_snapshot_timing(timing, *step.accepted_snapshot);
    }
    if (step.recertification_snapshot.has_value()) {
      accumulate_snapshot_timing(timing, *step.recertification_snapshot);
    }
  }
  return timing;
}

struct CertificateCostSignal {
  std::size_t deferred_pair_count = 0;
  std::size_t mpfr_attempt_count = 0;
};

void accumulate_certificate_cost_signal(
    CertificateCostSignal& signal,
    const NativeAccelerationSnapshotCertificate& snapshot) {
  signal.mpfr_attempt_count += snapshot.timing.root_mpfr_attempt_count;
  signal.deferred_pair_count += static_cast<std::size_t>(std::count_if(
      snapshot.root_certificates.begin(),
      snapshot.root_certificates.end(),
      [](const auto& row) {
        return row.certificate.failure_code ==
            "numeric_precision_escalation_deferred_for_cost_feedback";
      }));
}

CertificateCostSignal certificate_cost_signal(
    const NativeAtomicStepCertificate& step) {
  CertificateCostSignal signal;
  for (const auto& substep : step.substeps) {
    if (substep.endpoint_snapshot.has_value()) {
      accumulate_certificate_cost_signal(
          signal, *substep.endpoint_snapshot);
    }
  }
  if (step.accepted_snapshot.has_value()) {
    accumulate_certificate_cost_signal(signal, *step.accepted_snapshot);
  }
  if (step.recertification_snapshot.has_value()) {
    accumulate_certificate_cost_signal(
        signal, *step.recertification_snapshot);
  }
  return signal;
}

NativeCoupledEvolutionCertificate evolve_native_coupled_histories(
    const NativeCoupledEvolutionRequest& request,
    const NativeAccelerationSnapshotCertificate* reusable_initial_snapshot) {
  const auto timing_start = SteadyClock::now();
  validate_request(request);
  std::vector<NativePublishedPath> histories;
  histories.reserve(request.paths.size());
  for (const auto& path : request.paths) {
    histories.push_back({path.path_id, path.history});
  }
  auto joint_histories = request.joint_histories;
  const auto boundary_joint_histories = lift_joint_endpoint_remainders(
      histories, condense_joint_histories(joint_histories, 220U),
      request.start_time);
  const std::uint64_t memory_estimate_bytes =
      estimate_coupled_working_set_bytes(request);
  if (memory_estimate_bytes > request.memory_budget_bytes) {
    NativeEvolutionTiming memory_timing;
    memory_timing.total_wall_seconds = elapsed_seconds(timing_start);
    return {
        .schema = "eom_native_coupled_evolution_certificate/v1",
        .status = "halted",
        .run_id = request.run_id,
        .start_time = request.start_time,
        .requested_end_time = request.end_time,
        .accepted_end_time = request.start_time,
        .histories = std::move(histories),
        .joint_histories = std::move(joint_histories),
        .steps = {},
        .accepted_step_count = 0U,
        .rejected_step_count = 0U,
        .controller_step_size = request.initial_step,
        .halt_code = "memory_budget_exhausted",
        .evidence_status = "failed",
        .memory_budget_bytes = request.memory_budget_bytes,
        .memory_estimate_bytes = memory_estimate_bytes,
        .all_steps_atomic = true,
        .timing = memory_timing,
    };
  }
  double current_time = scalar_token(request.start_time);
  const double requested_end = scalar_token(request.end_time);
  double step_size = scalar_token(request.initial_step);
  const double minimum_step = scalar_token(request.minimum_step);
  const double maximum_step = request.maximum_step.empty()
      ? step_size
      : scalar_token(request.maximum_step);
  std::vector<NativeAtomicStepCertificate> steps;
  std::size_t accepted_count = 0;
  std::size_t rejected_count = 0;
  std::string halt_code;
  std::string current_time_token = request.start_time;
  std::size_t consecutive_growth_headroom_steps = 0U;
  std::size_t certificate_cost_probe_adjustments = 0U;
  std::set<std::pair<std::string, std::string>>
      adjudicated_finite_width_pairs;
  std::size_t certificate_cost_cooldown_remaining =
      request.certificate_cost_initial_cooldown_steps;

  while (current_time < requested_end &&
         (request.diagnostic_maximum_accepted_steps == 0U ||
          accepted_count < request.diagnostic_maximum_accepted_steps)) {
    if (steps.size() >= request.max_step_attempts) {
      halt_code = "numeric_resource_limit_exhausted";
      break;
    }
    const double remaining = requested_end - current_time;
    const bool reaches_end =
        remaining <= step_size +
            absolute_time_rounding_envelope(current_time, requested_end);
    const double attempted_step = reaches_end ? remaining : step_size;
    const std::string attempted_end = reaches_end
        ? request.end_time
        : decimal_token(current_time + attempted_step);
    const NativeAccelerationSnapshotCertificate* reusable_start_snapshot =
        nullptr;
    if (steps.empty() && reusable_initial_snapshot != nullptr) {
      reusable_start_snapshot = reusable_initial_snapshot;
    }
    for (auto found = steps.rbegin(); found != steps.rend(); ++found) {
      if (found->status == "accepted" &&
          numeric_equal(found->accepted_time, current_time_token) &&
          found->accepted_snapshot.has_value()) {
        reusable_start_snapshot = &*found->accepted_snapshot;
        break;
      }
    }
    const bool certificate_cost_probe =
        request.use_certificate_cost_feedback &&
        certificate_cost_cooldown_remaining == 0U &&
        certificate_cost_probe_adjustments <
            request.certificate_cost_maximum_probe_adjustments &&
        attempted_step > minimum_step +
            absolute_time_rounding_envelope(
                current_time, current_time + attempted_step);
    auto step_request = request;
    step_request.joint_histories = accepted_count == 0U
        ? boundary_joint_histories
        : joint_histories;
    step_request.adjudicated_finite_width_pairs.assign(
        adjudicated_finite_width_pairs.begin(),
        adjudicated_finite_width_pairs.end());
    auto step = certify_native_atomic_coupled_step(
        step_request, histories, steps.size(), current_time_token, attempted_end,
        reusable_start_snapshot, certificate_cost_probe);
    const CertificateCostSignal cost_signal = certificate_cost_signal(step);
    step.certificate_cost_probe = certificate_cost_probe;
    step.certificate_cost_deferred_pair_count =
        cost_signal.deferred_pair_count;
    step.certificate_cost_mpfr_attempt_count =
        cost_signal.mpfr_attempt_count;
    if (step.status == "accepted") {
      adjudicated_finite_width_pairs.clear();
      const bool accepted_after_certificate_cost_adjustment =
          certificate_cost_probe_adjustments > 0U;
      const double root_time_pressure_ratio =
          accepted_root_time_pressure_ratio(request, step);
      const double root_pressure_maximum_step = std::max(
          minimum_step,
          maximum_step * root_pressure_step_scale(
              root_time_pressure_ratio));
      step.root_time_pressure_ratio = root_time_pressure_ratio;
      step.root_pressure_step_cap = root_pressure_maximum_step;
      const bool growth_headroom = request.use_adaptive_step_growth &&
          step_has_growth_headroom(request, step);
      const double accepted_step_scale =
          request.use_continuous_adaptive_step &&
              !accepted_after_certificate_cost_adjustment
          ? continuous_step_scale(request, step, true)
          : 1.0;
      histories = step.published_histories;
      joint_histories = step.published_joint_histories;
      current_time_token = step.accepted_time;
      current_time = scalar_token(current_time_token);
      ++accepted_count;
      if (request.use_certificate_cost_feedback) {
        if (accepted_after_certificate_cost_adjustment) {
          certificate_cost_cooldown_remaining =
              request.certificate_cost_unavoidable_cooldown_steps;
        } else if (certificate_cost_cooldown_remaining > 0U) {
          --certificate_cost_cooldown_remaining;
        }
      }
      certificate_cost_probe_adjustments = 0U;
      step.certificate_cost_cooldown_remaining =
          certificate_cost_cooldown_remaining;
      steps.push_back(std::move(step));
      if (request.accepted_step_callback) {
        request.accepted_step_callback(accepted_count, current_time_token);
      }
      if (request.use_continuous_adaptive_step) {
        if (!reaches_end) {
          step_size = std::clamp(
              attempted_step * accepted_step_scale,
              minimum_step, root_pressure_maximum_step);
        }
        consecutive_growth_headroom_steps = 0U;
        continue;
      }
      consecutive_growth_headroom_steps = growth_headroom
          ? consecutive_growth_headroom_steps + 1U
          : 0U;
      step_size = std::min(step_size, root_pressure_maximum_step);
      if (consecutive_growth_headroom_steps >= 2U &&
          step_size < root_pressure_maximum_step) {
        step_size = std::min(
            root_pressure_maximum_step, step_size * 2.0);
        consecutive_growth_headroom_steps = 0U;
      }
      continue;
    }
    consecutive_growth_headroom_steps = 0U;
    ++rejected_count;
    const bool certificate_cost_deferred =
        step.failure_code ==
            "root_precision_escalation_deferred_for_cost_feedback";
    for (const auto& substep : step.substeps) {
      for (const auto& state : substep.finite_width_state_certificates) {
        const auto pair = std::make_pair(
            state.receiver_path_id, state.transmitter_path_id);
        adjudicated_finite_width_pairs.insert(pair);
      }
      for (const auto& regulator :
           substep.regulator_convergence_certificates) {
        const auto pair = std::make_pair(
            regulator.receiver_path_id, regulator.transmitter_path_id);
        adjudicated_finite_width_pairs.insert(pair);
      }
    }
    step.certificate_cost_cooldown_remaining =
        certificate_cost_cooldown_remaining;
    const double retry_scale =
        correction_retry_scale(request, step);
    if (step.failure_code == "coupled_correction_failed") {
      step.correction_retry_scale = retry_scale;
    }
    steps.push_back(std::move(step));
    if (rejected_count > request.max_rejected_steps) {
      halt_code = "numeric_resource_limit_exhausted";
      break;
    }
    if (certificate_cost_deferred) {
      ++certificate_cost_probe_adjustments;
      step_size = std::clamp(
          attempted_step * exact_decimal_value(
              request.certificate_cost_probe_scale),
          minimum_step, maximum_step);
      continue;
    }
    const bool residual_scaled_correction =
        steps.back().failure_code == "coupled_correction_failed";
    const double next_step = attempted_step *
        (residual_scaled_correction
             ? retry_scale
             : (request.use_continuous_adaptive_step &&
                        steps.back().failure_code ==
                            "numeric_step_budget_exceeded" &&
                        !steps.back().local_errors.empty()
                    ? continuous_step_scale(request, steps.back(), false)
                    : 0.5));
    if (next_step < minimum_step &&
        attempted_step > minimum_step +
            absolute_time_rounding_envelope(
                current_time, current_time + attempted_step)) {
      step_size = minimum_step;
      continue;
    }
    if (next_step < minimum_step &&
        adjudicated_finite_width_pairs.empty() &&
        steps.back().failure_code == "coupled_correction_failed") {
      const NativeAccelerationSnapshotCertificate* diagnostic_snapshot =
          nullptr;
      for (auto substep = steps.back().substeps.rbegin();
           substep != steps.back().substeps.rend(); ++substep) {
        if (substep->endpoint_snapshot.has_value()) {
          diagnostic_snapshot = &*substep->endpoint_snapshot;
          break;
        }
        if (substep->start_snapshot.status == "certified_complete") {
          diagnostic_snapshot = &substep->start_snapshot;
          break;
        }
      }
      if (diagnostic_snapshot != nullptr) {
        const auto diagnostic_pairs = certified_opposite_polarity_core_pairs(
            request, *diagnostic_snapshot);
        adjudicated_finite_width_pairs.insert(
            diagnostic_pairs.begin(), diagnostic_pairs.end());
      }
      if (!adjudicated_finite_width_pairs.empty()) {
        step_size = attempted_step;
        continue;
      }
    }
    if (next_step < minimum_step) {
      if (steps.back().failure_code.rfind("caustic_", 0U) == 0U) {
        halt_code = "caustic_transit_uncertified";
      } else if (
          request.chart_policy == "sharp_with_finite_width_fallback" &&
          steps.back().failure_code == "root_completeness_not_certified" &&
          (!adjudicated_finite_width_pairs.empty() ||
           step_contains_caustic_entry_trigger(steps.back()))) {
        halt_code = "caustic_entry_uncertified";
      } else if (
          steps.back().failure_code == "root_completeness_not_certified") {
        halt_code = "root_completeness_not_certified";
      } else if (
          steps.back().failure_code == "coupled_correction_failed") {
        halt_code = "coupled_correction_failed";
      } else {
        halt_code = "minimum_step_exhausted";
      }
      break;
    }
    step_size = next_step;
  }
  const bool completed = current_time == requested_end;
  const bool diagnostic_step_limit_reached =
      !completed && request.diagnostic_maximum_accepted_steps > 0U &&
      accepted_count >= request.diagnostic_maximum_accepted_steps;
  if (diagnostic_step_limit_reached) {
    halt_code = "diagnostic_accepted_step_limit_reached";
  }
  const bool all_atomic = std::all_of(
      steps.begin(), steps.end(),
      [](const auto& step) { return step.publication_atomic; });
  NativeEvolutionTiming timing = summarize_evolution_timing(steps);
  timing.total_wall_seconds = elapsed_seconds(timing_start);
  return {
      .schema = "eom_native_coupled_evolution_certificate/v1",
      .status = completed ? "completed" : "halted",
      .run_id = request.run_id,
      .start_time = request.start_time,
      .requested_end_time = request.end_time,
      .accepted_end_time = current_time_token,
      .histories = std::move(histories),
      .joint_histories = std::move(joint_histories),
      .steps = std::move(steps),
      .accepted_step_count = accepted_count,
      .rejected_step_count = rejected_count,
      .controller_step_size = decimal_token(step_size),
      .controller_certificate_cost_cooldown_remaining =
          certificate_cost_cooldown_remaining,
      .halt_code = completed ? "" : halt_code,
      .evidence_status =
          completed ? "executable_architecture_evidence" : "failed",
      .memory_budget_bytes = request.memory_budget_bytes,
      .memory_estimate_bytes = memory_estimate_bytes,
      .all_steps_atomic = all_atomic,
      .timing = timing,
  };
}

}  // namespace architrino::eom
