#include "architrino/eom/CoupledEvolution.hpp"
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

double elapsed_seconds(const SteadyClock::time_point& start) {
  return std::chrono::duration<double>(SteadyClock::now() - start).count();
}

using SnapshotTotals = std::map<std::string, IntervalVector>;
using TopologySignature =
    std::vector<std::tuple<std::string, std::string, std::vector<int>>>;

struct SubstepAttempt {
  NativeCorrectedSubstepCertificate certificate;
  std::optional<std::vector<NativePublishedPath>> histories;
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

bool vectors_overlap(
    const IntervalVector& left, const IntervalVector& right);

const NativePairAccelerationCertificate& snapshot_pair(
    const NativeAccelerationSnapshotCertificate& snapshot,
    const std::string& receiver,
    const std::string& source);

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

double vector_radius(const IntervalVector& vector) {
  double result = 0.0;
  for (const auto& component : vector) {
    result = std::max(result, component.width() * 0.5);
  }
  return result;
}

SnapshotTotals snapshot_totals(
    const NativeAccelerationSnapshotCertificate& snapshot) {
  SnapshotTotals result;
  for (const auto& total : snapshot.acceleration.receiver_totals) {
    result.emplace(total.receiver_path_id, total.acceleration);
  }
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

TopologySignature topology_signature(
    const NativeAccelerationSnapshotCertificate& snapshot) {
  TopologySignature signature;
  signature.reserve(snapshot.root_certificates.size());
  for (const auto& row : snapshot.root_certificates) {
    std::vector<int> signs;
    signs.reserve(row.certificate.roots.size());
    for (const auto& root : row.certificate.roots) {
      signs.push_back(root.source_normal_sign);
    }
    signature.emplace_back(
        row.receiver_path_id, row.source_path_id, std::move(signs));
  }
  return signature;
}

std::vector<std::pair<std::string, std::string>> changed_topology_pairs(
    const NativeAccelerationSnapshotCertificate& start,
    const NativeAccelerationSnapshotCertificate& end) {
  std::map<std::pair<std::string, std::string>, std::vector<int>> start_rows;
  for (const auto& row : start.root_certificates) {
    std::vector<int> signs;
    for (const auto& root : row.certificate.roots) {
      signs.push_back(root.source_normal_sign);
    }
    start_rows[{row.receiver_path_id, row.source_path_id}] = std::move(signs);
  }
  std::vector<std::pair<std::string, std::string>> changed;
  for (const auto& row : end.root_certificates) {
    std::vector<int> signs;
    for (const auto& root : row.certificate.roots) {
      signs.push_back(root.source_normal_sign);
    }
    const auto key = std::make_pair(
        row.receiver_path_id, row.source_path_id);
    const auto found = start_rows.find(key);
    if (found == start_rows.end() || found->second != signs) {
      changed.push_back(key);
    }
  }
  return changed;
}

bool pair_is_adjudicated_finite_width(
    const NativeCoupledEvolutionRequest& request,
    const std::string& receiver,
    const std::string& source) {
  return std::find(
      request.adjudicated_finite_width_pairs.begin(),
      request.adjudicated_finite_width_pairs.end(),
      std::make_pair(receiver, source)) !=
      request.adjudicated_finite_width_pairs.end();
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
        Interval::decimal_token(path_charge(request, pair.source_path_id));
    if (!(charge_product.upper() < 0.0) || pair.status == "uncertified") {
      continue;
    }
    const bool intersects_core = std::any_of(
        pair.rows.begin(), pair.rows.end(), [&](const auto& row) {
          return row.separation.has_value() &&
              row.separation->lower() <= core_scale.upper();
        });
    if (intersects_core) {
      result.emplace_back(pair.receiver_path_id, pair.source_path_id);
    }
  }
  return result;
}

std::vector<std::pair<std::string, std::string>> finite_width_pairs(
    const NativeAccelerationSnapshotCertificate& snapshot) {
  std::vector<std::pair<std::string, std::string>> result;
  for (const auto& pair : snapshot.acceleration.pair_certificates) {
    if (pair.chart == "finite_width" && pair.status != "uncertified") {
      result.emplace_back(pair.receiver_path_id, pair.source_path_id);
    }
  }
  return result;
}

std::optional<NativeEndpointRootContinuationCertificate>
certify_coincident_endpoint_root_continuation_impl(
    const NativeAccelerationSnapshotCertificate& start,
    const NativeAccelerationSnapshotCertificate& end,
    const std::string& receiver_id,
    const std::string& source_id) {
  if (receiver_id != source_id) return std::nullopt;
  const auto find_row = [&](const auto& snapshot)
      -> const NativeSnapshotRootRow* {
    const auto found = std::find_if(
        snapshot.root_certificates.begin(),
        snapshot.root_certificates.end(), [&](const auto& row) {
          return row.receiver_path_id == receiver_id &&
              row.source_path_id == source_id;
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
    start_signs.push_back(root.source_normal_sign);
  }
  for (const auto& root : end_certificate.roots) {
    end_signs.push_back(root.source_normal_sign);
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
      .schema = "eom_native_endpoint_root_continuation_certificate/v0",
      .status = "certified_complete",
      .receiver_path_id = receiver_id,
      .source_path_id = source_id,
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
    const IntervalVector position_interval = path.history.position_hull(time);
    const IntervalVector velocity_interval = path.history.velocity_hull(time);
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
    const double position_error = vector_radius(position_interval);
    const double velocity_error = vector_radius(velocity_interval);
    CubicHistorySegment segment(
        start_time, end_time, coefficients, error_token(position_error),
        error_token(velocity_error));
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
    for (std::size_t axis = 0; axis < 3; ++axis) {
      position_error = std::max(
          position_error,
          std::abs(full_position[axis].midpoint() -
                   fine_position[axis].midpoint()));
      velocity_error = std::max(
          velocity_error,
          std::abs(full_velocity[axis].midpoint() -
                   fine_velocity[axis].midpoint()));
    }
    result.push_back({full.path_id, position_error, velocity_error});
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
      const double position_error =
          scalar_token(segment.position_error_token()) +
          error_found->position_error;
      const double velocity_error =
          scalar_token(segment.velocity_error_token()) +
          error_found->velocity_error;
      inflated = inflated.appended(CubicHistorySegment(
          segment.t_start_token(), segment.t_end_token(),
          segment.coefficient_tokens(), error_token(position_error),
          error_token(velocity_error)));
    }
    result.push_back({
        fine.path_id,
        std::move(inflated),
    });
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
    double maximum_fine_position_error = 0.0;
    double maximum_fine_velocity_error = 0.0;
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
        dense_position_error = std::max(
            dense_position_error,
            interval_absolute(
                evaluate_cubic(difference, local_span)).upper());
        dense_velocity_error = std::max(
            dense_velocity_error,
            interval_absolute(
                evaluate_cubic_velocity(difference, local_span)).upper());
      }
      maximum_fine_position_error = std::max(
          maximum_fine_position_error, fine_segment.position_error());
      maximum_fine_velocity_error = std::max(
          maximum_fine_velocity_error, fine_segment.velocity_error());
    }
    result.synchronization_errors.push_back({
        input.path_id, dense_position_error, dense_velocity_error});
    if (dense_position_error > position_limit ||
        dense_velocity_error > velocity_limit) {
      continue;
    }
    RetainedHistory coarse_history = input.history.appended(
        CubicHistorySegment(
            coarse_segment.t_start_token(), coarse_segment.t_end_token(),
            coarse_segment.coefficient_tokens(),
            error_token(std::max(
                coarse_segment.position_error(),
                maximum_fine_position_error + dense_position_error)),
            error_token(std::max(
                coarse_segment.velocity_error(),
                maximum_fine_velocity_error + dense_velocity_error))));
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
      .schema = "eom_native_corrected_substep_certificate/v0",
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
              row.source_path_id == path.path_id;
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
        .schema = "eom_native_pinned_fold_temporal_step_certificate/v0",
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
    if (reusable_start_snapshot->status != "certified_complete" ||
        !numeric_equal(reusable_start_snapshot->reception_time, start_time) ||
        reusable_start_snapshot->root_certificates.size() !=
            histories.size() * histories.size()) {
      throw std::invalid_argument(
          "reusable start snapshot does not match the requested substep");
    }
    for (const auto& row : reusable_start_snapshot->root_certificates) {
      const auto& receiver = path_history(histories, row.receiver_path_id);
      const auto& source = path_history(histories, row.source_path_id);
      if (row.certificate.receiver_history_fingerprint !=
              receiver.history.provenance_fingerprint() ||
          row.certificate.source_history_fingerprint !=
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
  if (start_snapshot.status != "certified_complete") {
    const std::string failure = start_snapshot.failure_code.empty()
        ? "root_completeness_not_certified"
        : start_snapshot.failure_code;
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
  const SnapshotTotals start_totals = snapshot_totals(start_snapshot);
  auto predictor_histories = append_candidate_segments(
      histories, start_time, end_time, start_totals, start_totals, {}, timing);
  auto predictor_snapshot = certify_native_acceleration_snapshot(
      request, predictor_histories, end_time,
      request.use_warm_root_exclusion ? &start_snapshot : nullptr,
      request.use_warm_root_exclusion ? &histories : nullptr,
      defer_endpoint_root_precision_escalation);
  accumulate_substep_snapshot_timing(*timing, predictor_snapshot);
  if (predictor_snapshot.status != "certified_complete") {
    const std::string failure = predictor_snapshot.failure_code.empty()
        ? "root_completeness_not_certified"
        : predictor_snapshot.failure_code;
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
    auto endpoint_snapshot = certify_native_acceleration_snapshot(
        request, candidate_histories, end_time,
        request.use_warm_root_exclusion ? &last_snapshot : nullptr,
        request.use_warm_root_exclusion ? &last_histories : nullptr,
        defer_endpoint_root_precision_escalation);
    accumulate_substep_snapshot_timing(*timing, endpoint_snapshot);
    if (endpoint_snapshot.status != "certified_complete") {
      const std::string failure = endpoint_snapshot.failure_code.empty()
          ? "root_completeness_not_certified"
          : endpoint_snapshot.failure_code;
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
    correction_error = acceleration_correction_error(endpoint_guess, evaluated);
    last_histories = candidate_histories;
    last_snapshot = endpoint_snapshot;
    if (*correction_error <= correction_tolerance) {
      std::vector<NativeFoldCausticImpulseCertificate> event_impulses;
      std::vector<NativeRegulatorConvergenceCertificate>
          regulator_convergence_certificates;
      std::vector<NativeEndpointRootContinuationCertificate>
          endpoint_root_continuations;
      const bool topology_changed =
          topology_signature(start_snapshot) !=
          topology_signature(endpoint_snapshot);
      auto event_pairs = changed_topology_pairs(
          start_snapshot, endpoint_snapshot);
      const auto append_finite_width_pairs = [&](const auto& snapshot) {
        for (const auto& pair : finite_width_pairs(snapshot)) {
          if (std::find(event_pairs.begin(), event_pairs.end(), pair) ==
              event_pairs.end()) {
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
        const double step = scalar_token(end_time) - scalar_token(start_time);
        for (const auto& [receiver_id, source_id] : event_pairs) {
          if (topology_changed) {
            const auto endpoint_continuation =
                certify_coincident_endpoint_root_continuation_impl(
                    start_snapshot, endpoint_snapshot,
                    receiver_id, source_id);
            if (endpoint_continuation.has_value()) {
              endpoint_root_continuations.push_back(*endpoint_continuation);
              continue;
            }
          }
          auto regulator = certify_native_regulator_convergence(
              request,
              path_history(candidate_histories, receiver_id),
              path_history(candidate_histories, source_id),
              path_charge(request, receiver_id),
              path_charge(request, source_id),
              start_time, end_time);
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
            return {std::move(failed), std::nullopt};
          }
          const auto& start_pair =
              snapshot_pair(start_snapshot, receiver_id, source_id);
          const auto& end_pair =
              snapshot_pair(endpoint_snapshot, receiver_id, source_id);
          if (!start_pair.total_acceleration.has_value() ||
              !end_pair.total_acceleration.has_value()) {
            throw std::runtime_error(
                "event pair lacks reconstructed endpoint acceleration");
          }
          const IntervalVector trapezoid = scale(
              Interval::point(step * 0.5),
              add(*start_pair.total_acceleration,
                  *end_pair.total_acceleration));
          const IntervalVector trapezoid_position_moment = scale(
              Interval::point(step * step / 6.0),
              add(
                  scale(
                      Interval::point(2.0),
                      *start_pair.total_acceleration),
                  *end_pair.total_acceleration));
          if (!vectors_overlap(trapezoid, *event.impulse) ||
              !vectors_overlap(
                  trapezoid_position_moment,
                  *event.position_moment)) {
            event_impulses.push_back(std::move(event));
            regulator_convergence_certificates.push_back(
                std::move(regulator));
            auto failed = failed_substep_certificate(
                start_time, end_time, std::move(start_snapshot),
                std::move(endpoint_snapshot), iteration, correction_error,
                "caustic_state_reconstruction_failed", candidate_histories,
                pinned_fold_onset_certificates);
            failed.event_impulses = std::move(event_impulses);
            failed.regulator_convergence_certificates =
                std::move(regulator_convergence_certificates);
            failed.endpoint_root_continuations =
                std::move(endpoint_root_continuations);
            return {std::move(failed), std::nullopt};
          }
          event_impulses.push_back(std::move(event));
          regulator_convergence_certificates.push_back(
              std::move(regulator));
        }
      }
      NativeCorrectedSubstepCertificate certificate{
          .schema = "eom_native_corrected_substep_certificate/v0",
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
          .candidate_history_fingerprints = fingerprints(candidate_histories),
      };
      return {std::move(certificate), std::move(candidate_histories)};
    }
    endpoint_guess = evaluated;
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
    for (const auto& [receiver_id, source_id] :
         request.adjudicated_finite_width_pairs) {
      auto regulator = certify_native_regulator_convergence(
          request,
          path_history(last_histories, receiver_id),
          path_history(last_histories, source_id),
          path_charge(request, receiver_id),
          path_charge(request, source_id),
          start_time, end_time);
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
  tolerance_value(request.field_speed, "field speed");
  tolerance_value(request.coupling, "coupling");
  tolerance_value(request.root_tolerance, "root tolerance");
  tolerance_value(request.source_normal_floor, "source-normal floor");
  tolerance_value(request.acceleration_tolerance, "acceleration tolerance");
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
  return {
      .schema = "eom_native_atomic_coupled_step_certificate/v0",
      .status = "rejected",
      .run_id = request.run_id,
      .step_index = step_index,
      .attempted_start = start_time,
      .attempted_end = end_time,
      .accepted_time = start_time,
      .input_history_fingerprints = input_fingerprints,
      .published_histories = input_histories,
      .candidate_history_fingerprints =
          candidate_histories.has_value()
              ? fingerprints(*candidate_histories)
              : std::vector<NativeHistoryFingerprint>{},
      .substeps = std::move(substeps),
      .accepted_snapshot = std::nullopt,
      .recertification_snapshot = std::move(recertification_snapshot),
      .local_errors = std::move(local_errors),
      .failure_code = failure_code,
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
      .schema = "eom_native_causal_prefix_exclusion/v0",
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
  double source_radius_upper = 0.0;
  for (const auto& path : histories) {
    receiver_radius_upper = std::max(
        receiver_radius_upper,
        norm(path.history.position_hull(reception)).upper());
    for (const auto& segment : path.history.segments()) {
      const Interval segment_time(
          segment.t_start_interval().lower(),
          segment.t_end_interval().upper());
      source_radius_upper = std::max(
          source_radius_upper,
          norm(segment.position_interval(segment_time)).upper());
    }
  }
  const Interval separation = Interval::point(receiver_radius_upper) +
      Interval::point(source_radius_upper);
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

IntervalVector event_integrand(
    const NativeCoupledEvolutionRequest& request,
    const NativePublishedPath& receiver,
    const NativePublishedPath& source,
    const std::string& receiver_charge,
    const std::string& source_charge,
    const Interval& reception,
    const Interval& emission) {
  const IntervalVector receiver_position =
      receiver.history.position_hull(reception);
  const IntervalVector receiver_velocity =
      receiver.history.velocity_hull(reception);
  const IntervalVector source_position = source.history.position_hull(emission);
  const IntervalVector displacement =
      subtract(receiver_position, source_position);
  const Interval separation = norm(displacement);
  const Interval core_scale = Interval::decimal_token(request.core_scale);
  const Interval radial_square =
      interval_square(separation) + interval_square(core_scale);
  const IntervalVector kernel = divide(
      displacement, radial_square * interval_sqrt(radial_square));
  const Interval field_speed = Interval::decimal_token(request.field_speed);
  Interval receiver_strength = Interval::point(0.0);
  if (separation.contains_zero()) {
    receiver_strength = Interval(
        0.0, (field_speed + norm(receiver_velocity)).upper());
  } else {
    receiver_strength = interval_absolute(
        field_speed -
        dot(divide(displacement, separation), receiver_velocity));
  }
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
      Interval::decimal_token(source_charge) * receiver_strength * mollifier;
  return scale(signed_scale, kernel);
}

std::optional<IntervalVector> centered_event_rectangle_integral(
    const NativeCoupledEvolutionRequest& request,
    const NativePublishedPath& receiver,
    const NativePublishedPath& source,
    const std::string& receiver_charge,
    const std::string& source_charge,
    const Interval& reception,
    const Interval& emission) {
  const IntervalVector receiver_position =
      receiver.history.position_hull(reception);
  const IntervalVector receiver_velocity =
      receiver.history.velocity_hull(reception);
  const IntervalVector source_position =
      source.history.position_hull(emission);
  const IntervalVector source_velocity =
      source.history.velocity_hull(emission);
  const IntervalVector displacement =
      subtract(receiver_position, source_position);
  const Interval separation = norm(displacement);
  if (separation.contains_zero()) return std::nullopt;

  const IntervalVector direction = divide(displacement, separation);
  const Interval source_radial_speed = dot(direction, source_velocity);
  const Interval field_speed = Interval::decimal_token(request.field_speed);
  const Interval residual_derivative = field_speed - source_radial_speed;
  const IntervalVector displacement_derivative =
      scale(Interval::point(-1.0), source_velocity);
  const IntervalVector direction_derivative = divide(
      add(displacement_derivative,
          scale(source_radial_speed, direction)),
      separation);
  const Interval receiver_normal =
      field_speed - dot(direction, receiver_velocity);
  const Interval receiver_normal_derivative =
      Interval::point(0.0) -
      dot(direction_derivative, receiver_velocity);
  Interval receiver_strength_derivative = receiver_normal_derivative;
  if (receiver_normal.upper() < 0.0) {
    receiver_strength_derivative =
        Interval::point(0.0) - receiver_normal_derivative;
  } else if (receiver_normal.contains_zero()) {
    const double bound = std::max(
        std::abs(receiver_normal_derivative.lower()),
        std::abs(receiver_normal_derivative.upper()));
    receiver_strength_derivative = Interval(-bound, bound);
  }
  const Interval receiver_strength = interval_absolute(receiver_normal);

  const Interval core_scale = Interval::decimal_token(request.core_scale);
  const Interval radial_square =
      interval_square(separation) + interval_square(core_scale);
  const Interval radial_three_halves =
      radial_square * interval_sqrt(radial_square);
  const Interval radial_five_halves =
      interval_square(radial_square) * interval_sqrt(radial_square);
  const IntervalVector kernel = divide(displacement, radial_three_halves);
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
      Interval::decimal_token(source_charge);
  const IntervalVector derivative = scale(
      signed_charge_scale,
      add(
          add(
              scale(receiver_strength_derivative * mollifier, kernel),
              scale(receiver_strength * mollifier, kernel_derivative)),
          scale(receiver_strength * mollifier_derivative, kernel)));

  const double midpoint = emission.midpoint();
  IntervalVector result = scale(
      Interval::point(emission.upper() - emission.lower()),
      event_integrand(
          request, receiver, source, receiver_charge, source_charge,
          reception, Interval::point(midpoint)));
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

std::optional<IntervalVector> monotone_event_rectangle_integral(
    const NativeCoupledEvolutionRequest& request,
    const NativePublishedPath& receiver,
    const NativePublishedPath& source,
    const std::string& receiver_charge,
    const std::string& source_charge,
    const Interval& reception,
    const Interval& emission) {
  const IntervalVector receiver_position =
      receiver.history.position_hull(reception);
  const IntervalVector receiver_velocity =
      receiver.history.velocity_hull(reception);
  const IntervalVector source_position =
      source.history.position_hull(emission);
  const IntervalVector source_velocity =
      source.history.velocity_hull(emission);
  const IntervalVector displacement =
      subtract(receiver_position, source_position);
  const Interval separation = norm(displacement);
  if (separation.contains_zero()) return std::nullopt;
  const IntervalVector direction = divide(displacement, separation);
  const Interval field_speed = Interval::decimal_token(request.field_speed);
  const Interval residual_derivative =
      field_speed - dot(direction, source_velocity);
  if (residual_derivative.contains_zero()) return std::nullopt;

  const auto endpoint_residual = [&](double time) {
    const Interval emission_point = Interval::point(time);
    return norm(subtract(
               receiver_position,
               source.history.position_hull(emission_point))) -
        field_speed * (reception - emission_point);
  };
  Interval first_residual = endpoint_residual(emission.lower());
  Interval second_residual = endpoint_residual(emission.upper());
  if (residual_derivative.upper() < 0.0) {
    std::swap(first_residual, second_residual);
  }
  const Interval causal_width =
      Interval::decimal_token(request.causal_width);
  const Interval first_cdf =
      normal_cdf_interval(first_residual, causal_width);
  const Interval second_cdf =
      normal_cdf_interval(second_residual, causal_width);
  const Interval raw_mass = second_cdf - first_cdf;
  const Interval mass(
      std::max(0.0, raw_mass.lower()),
      std::max(0.0, raw_mass.upper()));
  const Interval mollifier_integral =
      mass / interval_absolute(residual_derivative);

  const Interval core_scale = Interval::decimal_token(request.core_scale);
  const Interval radial_square =
      interval_square(separation) + interval_square(core_scale);
  const IntervalVector kernel = divide(
      displacement, radial_square * interval_sqrt(radial_square));
  const Interval receiver_strength = interval_absolute(
      field_speed - dot(direction, receiver_velocity));
  const Interval signed_charge_scale =
      Interval::decimal_token(request.coupling) *
      Interval::decimal_token(receiver_charge) *
      Interval::decimal_token(source_charge);
  IntervalVector result = scale(
      Interval::point(reception.width()),
      scale(
          signed_charge_scale * receiver_strength * mollifier_integral,
          kernel));

  const IntervalVector displacement_derivative =
      scale(Interval::point(-1.0), source_velocity);
  const IntervalVector direction_derivative = divide(
      add(displacement_derivative,
          scale(dot(direction, source_velocity), direction)),
      separation);
  const Interval receiver_normal =
      field_speed - dot(direction, receiver_velocity);
  const Interval receiver_normal_derivative =
      Interval::point(0.0) -
      dot(direction_derivative, receiver_velocity);
  Interval receiver_strength_derivative = receiver_normal_derivative;
  if (receiver_normal.upper() < 0.0) {
    receiver_strength_derivative =
        Interval::point(0.0) - receiver_normal_derivative;
  } else if (receiver_normal.contains_zero()) {
    const double bound = std::max(
        std::abs(receiver_normal_derivative.lower()),
        std::abs(receiver_normal_derivative.upper()));
    receiver_strength_derivative = Interval(-bound, bound);
  }
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
      signed_charge_scale,
      add(
          scale(receiver_strength_derivative, kernel),
          scale(receiver_strength, kernel_derivative)));

  const double midpoint = emission.midpoint();
  const Interval midpoint_emission = Interval::point(midpoint);
  const IntervalVector midpoint_displacement = subtract(
      receiver_position, source.history.position_hull(midpoint_emission));
  const Interval midpoint_separation = norm(midpoint_displacement);
  if (!midpoint_separation.contains_zero()) {
    const IntervalVector midpoint_direction =
        divide(midpoint_displacement, midpoint_separation);
    const Interval midpoint_radial_square =
        interval_square(midpoint_separation) + interval_square(core_scale);
    const IntervalVector midpoint_kernel = divide(
        midpoint_displacement,
        midpoint_radial_square * interval_sqrt(midpoint_radial_square));
    const Interval midpoint_strength = interval_absolute(
        field_speed - dot(midpoint_direction, receiver_velocity));
    IntervalVector centered = scale(
        signed_charge_scale * midpoint_strength * mollifier_integral,
        midpoint_kernel);
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

bool vectors_overlap(
    const IntervalVector& left, const IntervalVector& right) {
  for (std::size_t axis = 0; axis < 3; ++axis) {
    if (!left[axis].intersection(right[axis]).has_value()) {
      return false;
    }
  }
  return true;
}

const NativePairAccelerationCertificate& snapshot_pair(
    const NativeAccelerationSnapshotCertificate& snapshot,
    const std::string& receiver,
    const std::string& source) {
  const auto found = std::find_if(
      snapshot.acceleration.pair_certificates.begin(),
      snapshot.acceleration.pair_certificates.end(), [&](const auto& pair) {
        return pair.receiver_path_id == receiver &&
               pair.source_path_id == source;
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
    const std::string& source_path_id) {
  return certify_coincident_endpoint_root_continuation_impl(
      start, end, receiver_path_id, source_path_id);
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

static NativeFoldCausticImpulseCertificate
certify_binary64_fold_caustic_impulse(
    const NativeCoupledEvolutionRequest& request,
    const NativePublishedPath& receiver,
    const NativePublishedPath& source,
    const std::string& receiver_charge,
    const std::string& source_charge,
    const std::string& reception_lower_token,
    const std::string& reception_upper_token) {
  NativeFoldCausticImpulseCertificate certificate{
      .schema = "eom_native_fold_caustic_impulse_certificate/v1",
      .status = "uncertified",
      .receiver_path_id = receiver.path_id,
      .source_path_id = source.path_id,
      .reception_lower = reception_lower_token,
      .reception_upper = reception_upper_token,
      .causal_width = request.causal_width,
      .core_scale = request.core_scale,
      .impulse = std::nullopt,
      .position_moment = std::nullopt,
      .visited_cells = 0,
      .precision_route = "binary64_outward_joint_quadrature",
      .precision_bits = 53,
      .failure_code = "numeric_event_impulse_uncertified",
  };
  try {
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
    const Interval emission_boundary = Interval::point(search_lower);
    const Interval boundary_residual =
        norm(subtract(
            receiver.history.position_hull(reception_all),
            source.history.position_hull(emission_boundary))) -
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
    const IntervalVector receiver_velocity =
        receiver.history.velocity_hull(reception_all);
    const IntervalVector source_position = source.history.full_position_hull();
    const Interval separation =
        norm(subtract(receiver_position, source_position));
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
      const double receiver_strength_bound =
          field_speed.upper() + norm(receiver_velocity).upper();
      const double signed_scale_bound =
          interval_absolute(Interval::decimal_token(request.coupling)).upper() *
          interval_absolute(Interval::decimal_token(receiver_charge)).upper() *
          interval_absolute(Interval::decimal_token(source_charge)).upper();
      const double prefix_area = causal_domain_area(
          reception_lower, reception_upper, search_lower, candidate).upper();
      const double candidate_tail_bound =
          prefix_area * signed_scale_bound * receiver_strength_bound *
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
      const IntervalVector cell_receiver_position =
          receiver.history.position_hull(reception_cell);
      const IntervalVector cell_receiver_velocity =
          receiver.history.velocity_hull(reception_cell);
      const IntervalVector cell_source_position =
          source.history.position_hull(emission_cell);
      const IntervalVector cell_displacement =
          subtract(cell_receiver_position, cell_source_position);
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
                request, receiver, source, receiver_charge, source_charge,
                reception_cell, emission_cell)
          : std::nullopt;
      const auto monotone_rectangle = s_upper <= t_lower
          ? monotone_event_rectangle_integral(
                request, receiver, source, receiver_charge, source_charge,
                reception_cell, emission_cell)
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
        double receiver_strength_bound =
            field_speed.upper() + norm(cell_receiver_velocity).upper();
        if (!cell_separation.contains_zero()) {
          receiver_strength_bound = interval_absolute(
              field_speed -
              dot(divide(cell_displacement, cell_separation),
                  cell_receiver_velocity)).upper();
        }
        const double signed_scale_bound =
            interval_absolute(
                Interval::decimal_token(request.coupling)).upper() *
            interval_absolute(
                Interval::decimal_token(receiver_charge)).upper() *
            interval_absolute(
                Interval::decimal_token(source_charge)).upper();
        const double component_bound =
            area.upper() * signed_scale_bound * receiver_strength_bound *
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
                request, receiver, source, receiver_charge, source_charge,
                reception_cell, emission_cell));
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
        if ((parent.t_upper - parent.t_lower) >=
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
    const std::string& source_charge,
    const std::string& reception_lower_token,
    const std::string& reception_upper_token) {
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
          request, receiver, source, receiver_charge, source_charge,
          reception_lower_token, reception_upper_token);
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
            .source_history = &source.history,
            .receiver_charge = receiver_charge,
            .source_charge = source_charge,
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
    const std::string& source_charge,
    const std::string& reception_lower,
    const std::string& reception_upper) {
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
      request, receiver, source, receiver_charge, source_charge,
      reception_lower, reception_upper);
  NativeRegulatorConvergenceCertificate certificate{
      .schema = "eom_native_regulator_convergence_certificate/v0",
      .status = "uncertified",
      .receiver_path_id = receiver.path_id,
      .source_path_id = source.path_id,
      .required_levels = request.regulator_refinement_levels,
      .refinement_ratio = request.regulator_refinement_ratio,
      .convergence_tolerance = request.regulator_convergence_tolerance,
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
          refined_request, receiver, source, receiver_charge, source_charge,
          reception_lower, reception_upper);
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
  std::string pair_selection_route = "exhaustive_exact_pair_batch";
  std::string traversal_failure;
  std::vector<ExactPairWarmStart> warm_starts(logical_pair_count);
  if (warm_snapshot != nullptr && warm_histories != nullptr) {
    std::size_t logical_index = 0;
    for (const auto& receiver : histories) {
      for (const auto& source : histories) {
        const auto prior_row = std::find_if(
            warm_snapshot->root_certificates.begin(),
            warm_snapshot->root_certificates.end(), [&](const auto& row) {
              return row.receiver_path_id == receiver.path_id &&
                  row.source_path_id == source.path_id;
            });
        const auto prior_receiver = std::find_if(
            warm_histories->begin(), warm_histories->end(),
            [&](const auto& path) { return path.path_id == receiver.path_id; });
        const auto prior_source = std::find_if(
            warm_histories->begin(), warm_histories->end(),
            [&](const auto& path) { return path.path_id == source.path_id; });
        if (prior_row != warm_snapshot->root_certificates.end() &&
            prior_receiver != warm_histories->end() &&
            prior_source != warm_histories->end()) {
          warm_starts[logical_index] = {
              .certificate = &prior_row->certificate,
              .receiver = &prior_receiver->history,
              .source = &prior_source->history,
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

  if (request.use_certified_traversal && common_history_start) {
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
    pair_selection_route = "certified_moving_history_traversal";

    CertifiedTraversalExactBatchCertificate exact_batch{
        .schema = "eom_certified_traversal_exact_pair_batch/v0",
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
    if (traversal_certificate->status == "certified_complete") {
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
    std::size_t exact_index = 0;
    for (const auto& tile : traversal_certificate->exact_tiles) {
      for (std::size_t receiver_index = tile.receiver_begin;
           receiver_index < tile.receiver_end; ++receiver_index) {
        for (std::size_t source_index = tile.source_begin;
             source_index < tile.source_end; ++source_index) {
          if (exact_index < exact_batch.exact_pair_certificates.size()) {
            certificates_by_index.emplace(
                std::make_pair(receiver_index, source_index),
                exact_batch.exact_pair_certificates[exact_index]);
          }
          ++exact_index;
        }
      }
    }
    for (const auto& node : traversal_certificate->nodes) {
      if (node.status != "excluded") {
        continue;
      }
      for (std::size_t receiver_index = node.receiver_begin;
           receiver_index < node.receiver_end; ++receiver_index) {
        for (std::size_t source_index = node.source_begin;
             source_index < node.source_end; ++source_index) {
          const auto& receiver = histories[receiver_index];
          const auto& source = histories[source_index];
          certificates_by_index.emplace(
              std::make_pair(receiver_index, source_index),
              ExactPairCertificate{
                  .schema = "eom_native_exact_pair_certificate/v0",
                  .row_id = traversal_request.traversal_id + "/excluded/" +
                      node.node_id + "/" + receiver.path_id + "/" +
                      source.path_id,
                  .receiver_history_id = receiver.history.history_id(),
                  .source_history_id = source.history.history_id(),
                  .receiver_history_fingerprint =
                      receiver.history.provenance_fingerprint(),
                  .source_history_fingerprint =
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
      traversal_failure = traversal_certificate->failure_code.empty()
          ? exact_batch.failure_code
          : traversal_certificate->failure_code;
      if (traversal_failure.empty()) {
        traversal_failure = "pair_coverage_incomplete";
      }
    }
    for (std::size_t receiver_index = 0;
         receiver_index < histories.size(); ++receiver_index) {
      for (std::size_t source_index = 0;
           source_index < histories.size(); ++source_index) {
        auto found = certificates_by_index.find({receiver_index, source_index});
        if (found != certificates_by_index.end()) {
          root_certificates.push_back(std::move(found->second));
          continue;
        }
        const auto& receiver = histories[receiver_index];
        const auto& source = histories[source_index];
        root_certificates.push_back({
            .schema = "eom_native_exact_pair_certificate/v0",
            .row_id = traversal_request.traversal_id + "/unresolved/" +
                receiver.path_id + "/" + source.path_id,
            .receiver_history_id = receiver.history.history_id(),
            .source_history_id = source.history.history_id(),
            .receiver_history_fingerprint =
                receiver.history.provenance_fingerprint(),
            .source_history_fingerprint =
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
        const auto warm_source = std::find_if(
            warm_histories->begin(), warm_histories->end(),
            [&](const auto& path) { return path.path_id == source.path_id; });
        if (warm_source == warm_histories->end()) {
          warm_source_equality.push_back(
              {-std::numeric_limits<double>::infinity(), 0});
          continue;
        }
        const std::string source_search_lower =
            causal_prefix_exclusion.status == "certified_complete"
            ? active_search_lower
            : source.history.segments().front().t_start_token();
        warm_source_equality.push_back(compute_warm_source_equality_bounds(
            source.history, warm_source->history,
            std::strtod(source_search_lower.c_str(), nullptr)));
      }
    }
    std::vector<ExactPairRequest> root_requests;
    root_requests.reserve(logical_pair_count);
    std::size_t source_index = 0;
    for (const auto& receiver : histories) {
      source_index = 0;
      for (const auto& source : histories) {
        root_requests.push_back({
            .row_id = receiver.path_id + "/" + source.path_id + "/" +
                      reception_time,
            .receiver = &receiver.history,
            .source = &source.history,
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
                ? warm_source_equality[source_index].prefix_token_stable_upper
                : -std::numeric_limits<double>::infinity(),
            .warm_source_aligned_equal_segments = warm_equality_available
                ? warm_source_equality[source_index].aligned_equal_segments
                : 0,
        });
        ++source_index;
      }
    }
    const auto exact_root_timing_start = SteadyClock::now();
    root_certificates =
        certify_exact_pair_batch(root_requests, request.thread_count);
    timing.exact_root_batch_wall_seconds +=
        elapsed_seconds(exact_root_timing_start);
  }
  for (const auto& root : root_certificates) {
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
          .source_path_id = source.path_id,
          .receiver_history = &receiver.history,
          .source_history = &source.history,
          .root_certificate = &root,
          .receiver_charge = path_charge(request, receiver.path_id),
          .source_charge = path_charge(request, source.path_id),
          .coupling = request.coupling,
          .chart =
              request.chart_policy == "finite_width" ||
                      (request.chart_policy ==
                           "sharp_with_finite_width_fallback" &&
                       (pair_is_adjudicated_finite_width(
                            request, receiver.path_id, source.path_id) ||
                        (self_pair_on_or_above_rail &&
                         root.status == "certified_complete" &&
                         !root.memory_boundary_contact) ||
                        (root.status == "caustic_route_required" &&
                         (root.failure_code ==
                              "numeric_source_normal_sign_uncertified" ||
                          root.failure_code ==
                              "numeric_self_root_cluster_uncertified") &&
                         !root.memory_boundary_contact)))
                  ? "finite_width"
                  : "sharp",
          .source_normal_floor = request.source_normal_floor,
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
              .source = pair_requests[pair_index].source_history,
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
  std::string failure_code;
  if (root_precision_escalation_deferred) {
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
      .schema = "eom_native_acceleration_snapshot_certificate/v0",
      .status = failure_code.empty() ? "certified_complete" : "uncertified",
      .reception_time = reception_time,
      .failure_code = failure_code,
      .pair_selection_route = pair_selection_route,
      .traversal_excluded_pairs = traversal_excluded_pairs,
      .traversal_exact_pairs = traversal_exact_pairs,
      .traversal_certificate = std::move(traversal_certificate),
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
  auto first_half = corrected_substep(
      request, histories, start_time, midpoint,
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
  auto second_half = corrected_substep(
      request, *first_half.histories, midpoint, end_time,
      &*first_half.certificate.endpoint_snapshot,
      defer_endpoint_root_precision_escalation);
  timing->corrected_substeps_wall_seconds +=
      second_half.certificate.timing.total_wall_seconds;
  timing->history_copy_hash_wall_seconds +=
      second_half.certificate.timing.history_copy_hash_wall_seconds;
  timing->reused_start_snapshot_count +=
      second_half.certificate.timing.reused_start_snapshot_count;
  std::vector<NativeCorrectedSubstepCertificate> substeps;
  substeps.push_back(std::move(full.certificate));
  substeps.push_back(std::move(first_half.certificate));
  substeps.push_back(std::move(second_half.certificate));
  if (!second_half.histories.has_value()) {
    const std::string failure = substeps.back().failure_code.empty()
        ? "coupled_correction_failed"
        : substeps.back().failure_code;
    return rejected_step(
        request, histories, step_index, start_time, end_time,
        std::move(substeps), failure, first_half.histories);
  }

  auto local_errors = endpoint_local_errors(
      *full.histories, *second_half.histories, end_time);
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
        second_half.histories, std::move(local_errors));
  }

  const auto inflation_timing_start = SteadyClock::now();
  MultiratePublication multirate_publication;
  auto accepted_histories = request.use_synchronized_multirate_publication
      ? (multirate_publication = synchronized_multirate_histories(
             request, histories, *full.histories, *second_half.histories,
             local_errors),
         multirate_publication.histories)
      : inflate_fine_histories(
            histories, *second_half.histories, local_errors);
  timing->history_copy_hash_wall_seconds +=
      elapsed_seconds(inflation_timing_start);
  if (!substeps.back().endpoint_snapshot.has_value()) {
    throw std::runtime_error("accepted candidate substep lacks endpoint snapshot");
  }
  const auto recertification_timing_start = SteadyClock::now();
  auto accepted_snapshot = certify_native_acceleration_snapshot(
      request, accepted_histories, end_time,
      request.use_warm_root_exclusion
          ? &*substeps.back().endpoint_snapshot
          : nullptr,
      request.use_warm_root_exclusion ? &*second_half.histories : nullptr,
      defer_endpoint_root_precision_escalation);
  timing->recertification_wall_seconds +=
      elapsed_seconds(recertification_timing_start);
  if (accepted_snapshot.status != "certified_complete") {
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
    return rejected_step(
        request, histories, step_index, start_time, end_time,
        std::move(substeps), "coupled_correction_failed", accepted_histories,
        std::move(local_errors));
  }

  const auto fingerprint_timing_start = SteadyClock::now();
  const auto input_fingerprints = fingerprints(histories);
  const auto candidate_fingerprints = fingerprints(accepted_histories);
  const auto published_fingerprints = fingerprints(accepted_histories);
  timing->history_copy_hash_wall_seconds +=
      elapsed_seconds(fingerprint_timing_start);
  return {
      .schema = "eom_native_atomic_coupled_step_certificate/v0",
      .status = "accepted",
      .run_id = request.run_id,
      .step_index = step_index,
      .attempted_start = start_time,
      .attempted_end = end_time,
      .accepted_time = end_time,
      .input_history_fingerprints = input_fingerprints,
      .published_histories = std::move(accepted_histories),
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
  std::vector<std::pair<std::string, std::string>>
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
    step_request.adjudicated_finite_width_pairs =
        adjudicated_finite_width_pairs;
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
      const bool growth_headroom = request.use_adaptive_step_growth &&
          step_has_growth_headroom(request, step);
      const double accepted_step_scale =
          request.use_continuous_adaptive_step &&
              !accepted_after_certificate_cost_adjustment
          ? continuous_step_scale(request, step, true)
          : 1.0;
      histories = step.published_histories;
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
              minimum_step, maximum_step);
        }
        consecutive_growth_headroom_steps = 0U;
        continue;
      }
      consecutive_growth_headroom_steps = growth_headroom
          ? consecutive_growth_headroom_steps + 1U
          : 0U;
      if (consecutive_growth_headroom_steps >= 2U &&
          step_size < maximum_step) {
        step_size = std::min(maximum_step, step_size * 2.0);
        consecutive_growth_headroom_steps = 0U;
      }
      continue;
    }
    consecutive_growth_headroom_steps = 0U;
    ++rejected_count;
    const bool certificate_cost_deferred =
        step.failure_code ==
            "root_precision_escalation_deferred_for_cost_feedback";
    step.certificate_cost_cooldown_remaining =
        certificate_cost_cooldown_remaining;
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
    const double next_step = attempted_step *
        (request.use_continuous_adaptive_step &&
             steps.back().failure_code == "numeric_step_budget_exceeded" &&
             !steps.back().local_errors.empty()
         ? continuous_step_scale(request, steps.back(), false)
         : 0.5);
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
        adjudicated_finite_width_pairs =
            certified_opposite_polarity_core_pairs(
                request, *diagnostic_snapshot);
      }
      if (!adjudicated_finite_width_pairs.empty()) {
        step_size = attempted_step;
        continue;
      }
    }
    if (next_step < minimum_step) {
      halt_code = steps.back().failure_code.rfind("caustic_", 0U) == 0U
          ? "caustic_transit_uncertified"
          : "minimum_step_exhausted";
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
      .schema = "eom_native_coupled_evolution_certificate/v0",
      .status = completed ? "completed" : "halted",
      .run_id = request.run_id,
      .start_time = request.start_time,
      .requested_end_time = request.end_time,
      .accepted_end_time = current_time_token,
      .histories = std::move(histories),
      .steps = std::move(steps),
      .accepted_step_count = accepted_count,
      .rejected_step_count = rejected_count,
      .controller_step_size = decimal_token(step_size),
      .controller_certificate_cost_cooldown_remaining =
          certificate_cost_cooldown_remaining,
      .halt_code = completed ? "" : halt_code,
      .evidence_status = completed
          ? "executable_architecture_evidence"
          : "failed",
      .all_steps_atomic = all_atomic,
      .timing = timing,
  };
}

}  // namespace architrino::eom
