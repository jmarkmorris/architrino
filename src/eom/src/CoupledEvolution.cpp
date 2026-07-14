#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/MultiprecisionAcceleration.hpp"

#include <algorithm>
#include <array>
#include <charconv>
#include <cmath>
#include <cstddef>
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

using SnapshotTotals = std::map<std::string, IntervalVector>;
using TopologySignature =
    std::vector<std::tuple<std::string, std::string, std::vector<int>>>;

struct SubstepAttempt {
  NativeCorrectedSubstepCertificate certificate;
  std::optional<std::vector<NativePublishedPath>> histories;
};

bool vectors_overlap(
    const IntervalVector& left, const IntervalVector& right);

const NativePairAccelerationCertificate& snapshot_pair(
    const NativeAccelerationSnapshotCertificate& snapshot,
    const std::string& receiver,
    const std::string& source);

double scalar_token(const std::string& token) {
  return Interval::decimal_token(token).midpoint();
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

std::vector<NativePublishedPath> append_candidate_segments(
    const std::vector<NativePublishedPath>& histories,
    const std::string& start_time,
    const std::string& end_time,
    const SnapshotTotals& start_acceleration,
    const SnapshotTotals& end_acceleration) {
  const double start = scalar_token(start_time);
  const double end = scalar_token(end_time);
  const double step = end - start;
  if (!(step > 0.0)) {
    throw std::invalid_argument("candidate segment requires a positive step");
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
          start_found->second[axis].midpoint();
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
    auto segments = path.history.segments();
    segments.push_back(std::move(segment));
    result.push_back({
        path.path_id,
        RetainedHistory(path.history.history_id(), std::move(segments)),
    });
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
    std::vector<CubicHistorySegment> segments;
    segments.reserve(fine.history.segments().size());
    for (std::size_t index = 0; index < fine.history.segments().size(); ++index) {
      const auto& segment = fine.history.segments()[index];
      if (index < input.history.segments().size()) {
        segments.push_back(segment);
        continue;
      }
      const double position_error =
          scalar_token(segment.position_error_token()) +
          error_found->position_error;
      const double velocity_error =
          scalar_token(segment.velocity_error_token()) +
          error_found->velocity_error;
      segments.emplace_back(
          segment.t_start_token(), segment.t_end_token(),
          segment.coefficient_tokens(), error_token(position_error),
          error_token(velocity_error));
    }
    result.push_back({
        fine.path_id,
        RetainedHistory(fine.history.history_id(), std::move(segments)),
    });
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
    const std::optional<std::vector<NativePublishedPath>>& candidate_histories) {
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
      .candidate_history_fingerprints =
          candidate_histories.has_value()
              ? fingerprints(*candidate_histories)
              : std::vector<NativeHistoryFingerprint>{},
  };
}

SubstepAttempt corrected_substep(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    const std::string& start_time,
    const std::string& end_time) {
  auto start_snapshot = certify_native_acceleration_snapshot(
      request, histories, start_time);
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
  const SnapshotTotals start_totals = snapshot_totals(start_snapshot);
  auto predictor_histories = append_candidate_segments(
      histories, start_time, end_time, start_totals, start_totals);
  auto predictor_snapshot = certify_native_acceleration_snapshot(
      request, predictor_histories, end_time);
  if (predictor_snapshot.status != "certified_complete") {
    const std::string failure = predictor_snapshot.failure_code.empty()
        ? "root_completeness_not_certified"
        : predictor_snapshot.failure_code;
    return {
        failed_substep_certificate(
            start_time, end_time, std::move(start_snapshot),
            std::move(predictor_snapshot), 0, std::nullopt, failure,
            predictor_histories),
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
        histories, start_time, end_time, start_totals, endpoint_guess);
    auto endpoint_snapshot = certify_native_acceleration_snapshot(
        request, candidate_histories, end_time);
    if (endpoint_snapshot.status != "certified_complete") {
      const std::string failure = endpoint_snapshot.failure_code.empty()
          ? "root_completeness_not_certified"
          : endpoint_snapshot.failure_code;
      return {
          failed_substep_certificate(
              start_time, end_time, std::move(start_snapshot),
              std::move(endpoint_snapshot), iteration, correction_error,
              failure, candidate_histories),
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
      if (topology_signature(start_snapshot) !=
          topology_signature(endpoint_snapshot)) {
        if (request.chart_policy == "sharp") {
          return {
              failed_substep_certificate(
                  start_time, end_time, std::move(start_snapshot),
                  std::move(endpoint_snapshot), iteration, correction_error,
                  "root_event_requires_subdivision", candidate_histories),
              std::nullopt,
          };
        }
        const double step = scalar_token(end_time) - scalar_token(start_time);
        for (const auto& [receiver_id, source_id] :
             changed_topology_pairs(start_snapshot, endpoint_snapshot)) {
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
              !event.impulse.has_value()) {
            event_impulses.push_back(std::move(event));
            regulator_convergence_certificates.push_back(
                std::move(regulator));
            auto failed = failed_substep_certificate(
                start_time, end_time, std::move(start_snapshot),
                std::move(endpoint_snapshot), iteration, correction_error,
                "regulator_convergence_failed", candidate_histories);
            failed.event_impulses = std::move(event_impulses);
            failed.regulator_convergence_certificates =
                std::move(regulator_convergence_certificates);
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
          if (!vectors_overlap(trapezoid, *event.impulse)) {
            event_impulses.push_back(std::move(event));
            regulator_convergence_certificates.push_back(
                std::move(regulator));
            auto failed = failed_substep_certificate(
                start_time, end_time, std::move(start_snapshot),
                std::move(endpoint_snapshot), iteration, correction_error,
                "event_impulse_requires_subdivision", candidate_histories);
            failed.event_impulses = std::move(event_impulses);
            failed.regulator_convergence_certificates =
                std::move(regulator_convergence_certificates);
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
          .candidate_history_fingerprints = fingerprints(candidate_histories),
      };
      return {std::move(certificate), std::move(candidate_histories)};
    }
    endpoint_guess = evaluated;
  }
  return {
      failed_substep_certificate(
          start_time, end_time, std::move(start_snapshot),
          std::move(last_snapshot), request.max_correction_iterations,
          correction_error, "coupled_correction_failed", last_histories),
      std::nullopt,
  };
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
  if (!(end > start) || !(initial_step > 0.0) || !(minimum_step > 0.0) ||
      minimum_step > initial_step) {
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
  if (request.root_max_depth == 0U || request.root_max_cells == 0U ||
      request.quadrature_max_depth == 0U ||
      request.quadrature_max_cells == 0U ||
      request.event_max_depth == 0U || request.event_max_cells == 0U ||
      request.initial_mpfr_bits == 0U ||
      request.initial_mpfr_bits > request.maximum_mpfr_bits ||
      request.max_correction_iterations == 0U ||
      request.max_step_attempts == 0U ||
      request.max_rejected_steps == 0U || request.thread_count == 0U) {
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
    std::vector<NativePathLocalError> local_errors = {}) {
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
      .local_errors = std::move(local_errors),
      .failure_code = failure_code,
      .evidence_status = "failed",
      .integration_method = kNativeIntegrationMethod,
      .reduction_policy = kDeterministicReductionPolicy,
      .publication_atomic = same_fingerprints(
          input_fingerprints, published_fingerprints),
  };
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
      .schema = "eom_native_fold_caustic_impulse_certificate/v0",
      .status = "uncertified",
      .receiver_path_id = receiver.path_id,
      .source_path_id = source.path_id,
      .reception_lower = reception_lower_token,
      .reception_upper = reception_upper_token,
      .causal_width = request.causal_width,
      .core_scale = request.core_scale,
      .impulse = std::nullopt,
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
    const Interval total_area = causal_domain_area(
        reception_lower, reception_upper, search_lower, reception_upper);
    const double tolerance = tolerance_value(
        request.event_impulse_tolerance, "event impulse tolerance");

    std::function<IntervalVector(
        double, double, double, double, std::size_t)> integrate;
    integrate = [&](double t_lower, double t_upper, double s_lower,
                    double s_upper, std::size_t depth) {
      ++certificate.visited_cells;
      if (certificate.visited_cells > request.event_max_cells) {
        throw std::runtime_error("event_impulse_cell_limit_exhausted");
      }
      const Interval area =
          causal_domain_area(t_lower, t_upper, s_lower, s_upper);
      if (area.is_exact_zero()) {
        return IntervalVector{
            Interval::point(0.0), Interval::point(0.0),
            Interval::point(0.0)};
      }
      const IntervalVector integral = scale(
          area,
          event_integrand(
              request, receiver, source, receiver_charge, source_charge,
              Interval(t_lower, t_upper), Interval(s_lower, s_upper)));
      const double local_budget = tolerance * area.upper() / total_area.lower();
      if (std::all_of(
              integral.begin(), integral.end(),
              [&](const Interval& component) {
                return component.width() <= local_budget;
              })) {
        return integral;
      }
      if (depth >= request.event_max_depth) {
        throw std::runtime_error("event_impulse_depth_exhausted");
      }
      if ((t_upper - t_lower) >= (s_upper - s_lower)) {
        const double midpoint = t_lower + (t_upper - t_lower) * 0.5;
        if (!(midpoint > t_lower && midpoint < t_upper)) {
          throw std::runtime_error("event_impulse_time_resolution_exhausted");
        }
        return add(
            integrate(t_lower, midpoint, s_lower, s_upper, depth + 1U),
            integrate(midpoint, t_upper, s_lower, s_upper, depth + 1U));
      }
      const double midpoint = s_lower + (s_upper - s_lower) * 0.5;
      if (!(midpoint > s_lower && midpoint < s_upper)) {
        throw std::runtime_error("event_impulse_time_resolution_exhausted");
      }
      return add(
          integrate(t_lower, t_upper, s_lower, midpoint, depth + 1U),
          integrate(t_lower, t_upper, midpoint, s_upper, depth + 1U));
    };

    std::set<double> reception_points{reception_lower, reception_upper};
    std::set<double> emission_points{search_lower, reception_upper};
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
      if (search_lower < segment.t_start() &&
          segment.t_start() < reception_upper) {
        emission_points.insert(segment.t_start());
      }
      if (search_lower < segment.t_end() &&
          segment.t_end() < reception_upper) {
        emission_points.insert(segment.t_end());
      }
    }
    std::vector<IntervalVector> totals;
    for (auto t = reception_points.begin(); std::next(t) != reception_points.end();
         ++t) {
      for (auto s = emission_points.begin(); std::next(s) != emission_points.end();
           ++s) {
        totals.push_back(integrate(*t, *std::next(t), *s, *std::next(s), 0));
      }
    }
    const IntervalVector total = fixed_pairwise_sum(totals);
    if (std::any_of(
            total.begin(), total.end(), [&](const Interval& component) {
              return component.width() > tolerance;
            })) {
      certificate.failure_code =
          "event_impulse_enclosure_exceeds_tolerance";
      return certificate;
    }
    certificate.status = "certified_complete";
    certificate.impulse = total;
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
            .max_depth = request.event_max_depth,
            .max_cells = request.event_max_cells,
        },
        bits);
    certificate.visited_cells = attempt.visited_cells;
    certificate.precision_route = "mpfr_outward_joint_quadrature";
    certificate.precision_bits = bits;
    certificate.failure_code = attempt.failure_code;
    certificate.impulse = std::nullopt;
    certificate.status = "uncertified";
    if (attempt.certified) {
      certificate.status = "certified_complete";
      certificate.impulse = attempt.impulse;
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
      !base_event.impulse.has_value()) {
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
        }},
        .final_impulse_delta = std::nullopt,
        .maximum_ladder_impulse_delta = std::nullopt,
        .converged = false,
    };
    double scale = 1.0;
    bool all_levels_certified = true;
    double previous_delta = 0.0;
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
      if (event.status == "certified_complete" && event.impulse.has_value()) {
        delta = maximum_delta(
            *series.levels.back().event_impulse.impulse, *event.impulse);
        previous_delta = *delta;
      } else {
        all_levels_certified = false;
      }
      series.levels.push_back({
          .level = level,
          .causal_width = refined_request.causal_width,
          .core_scale = refined_request.core_scale,
          .event_impulse = std::move(event),
          .maximum_impulse_delta_from_previous = delta,
      });
      if (!all_levels_certified) {
        break;
      }
    }
    if (all_levels_certified &&
        series.levels.size() == request.regulator_refinement_levels) {
      series.final_impulse_delta = previous_delta;
      double maximum_ladder_delta = 0.0;
      for (std::size_t left = 0; left < series.levels.size(); ++left) {
        for (std::size_t right = left + 1U; right < series.levels.size();
             ++right) {
          maximum_ladder_delta = std::max(
              maximum_ladder_delta,
              maximum_delta(
                  *series.levels[left].event_impulse.impulse,
                  *series.levels[right].event_impulse.impulse));
        }
      }
      series.maximum_ladder_impulse_delta = maximum_ladder_delta;
      series.converged = maximum_ladder_delta <= tolerance;
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
    const std::string& reception_time) {
  std::vector<ExactPairRequest> root_requests;
  root_requests.reserve(histories.size() * histories.size());
  for (const auto& receiver : histories) {
    for (const auto& source : histories) {
      root_requests.push_back({
          .row_id = receiver.path_id + "/" + source.path_id + "/" +
                    reception_time,
          .receiver = &receiver.history,
          .source = &source.history,
          .reception_time = reception_time,
          .search_lower = source.history.segments().front().t_start_token(),
          .search_upper = reception_time,
          .field_speed = request.field_speed,
          .root_tolerance = request.root_tolerance,
          .max_depth = request.root_max_depth,
          .max_cells = request.root_max_cells,
          .initial_mpfr_bits = request.initial_mpfr_bits,
          .maximum_mpfr_bits = request.maximum_mpfr_bits,
          .force_precision_escalation = false,
      });
    }
  }
  auto root_certificates =
      certify_exact_pair_batch(root_requests, request.thread_count);
  std::vector<NativePairAccelerationRequest> pair_requests;
  pair_requests.reserve(root_certificates.size());
  std::vector<NativeSnapshotRootRow> root_rows;
  root_rows.reserve(root_certificates.size());
  std::size_t index = 0;
  for (const auto& receiver : histories) {
    for (const auto& source : histories) {
      const auto& root = root_certificates[index];
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
                       root.status == "caustic_route_required" &&
                       root.failure_code ==
                           "numeric_source_normal_sign_uncertified" &&
                       !root.memory_boundary_contact)
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
      });
      root_rows.push_back({receiver.path_id, source.path_id, root});
      ++index;
    }
  }
  auto acceleration = certify_acceleration_reconstruction(
      path_ids(request), pair_requests, request.thread_count);
  std::string failure_code;
  if (std::any_of(
          root_certificates.begin(), root_certificates.end(),
          [](const auto& root) { return root.memory_boundary_contact; })) {
    failure_code = "insufficient_history_depth";
  } else if (acceleration.status != "certified_complete") {
    failure_code = "root_completeness_not_certified";
  }
  return {
      .schema = "eom_native_acceleration_snapshot_certificate/v0",
      .status = failure_code.empty() ? "certified_complete" : "uncertified",
      .reception_time = reception_time,
      .failure_code = failure_code,
      .root_certificates = std::move(root_rows),
      .acceleration = std::move(acceleration),
  };
}

NativeAtomicStepCertificate certify_native_atomic_coupled_step(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    std::size_t step_index,
    const std::string& start_time,
    const std::string& end_time) {
  validate_request(request);
  validate_step_inputs(request, histories, start_time, end_time);
  auto full = corrected_substep(request, histories, start_time, end_time);
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
  auto first_half = corrected_substep(request, histories, start_time, midpoint);
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
  auto second_half = corrected_substep(
      request, *first_half.histories, midpoint, end_time);
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

  auto accepted_histories = inflate_fine_histories(
      histories, *second_half.histories, local_errors);
  auto accepted_snapshot = certify_native_acceleration_snapshot(
      request, accepted_histories, end_time);
  if (accepted_snapshot.status != "certified_complete") {
    const std::string failure = accepted_snapshot.failure_code.empty()
        ? "root_completeness_not_certified"
        : accepted_snapshot.failure_code;
    return rejected_step(
        request, histories, step_index, start_time, end_time,
        std::move(substeps), failure, accepted_histories,
        std::move(local_errors));
  }
  if (!substeps.back().endpoint_snapshot.has_value()) {
    throw std::runtime_error("accepted candidate substep lacks endpoint snapshot");
  }
  const double accepted_correction_error = acceleration_correction_error(
      snapshot_totals(*substeps.back().endpoint_snapshot),
      snapshot_totals(accepted_snapshot));
  if (accepted_correction_error > tolerance_value(
          request.correction_tolerance, "correction tolerance")) {
    return rejected_step(
        request, histories, step_index, start_time, end_time,
        std::move(substeps), "coupled_correction_failed", accepted_histories,
        std::move(local_errors));
  }

  const auto input_fingerprints = fingerprints(histories);
  const auto candidate_fingerprints = fingerprints(accepted_histories);
  const auto published_fingerprints = fingerprints(accepted_histories);
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
      .local_errors = std::move(local_errors),
      .failure_code = "",
      .evidence_status = "executable_architecture_evidence",
      .integration_method = kNativeIntegrationMethod,
      .reduction_policy = kDeterministicReductionPolicy,
      .publication_atomic = same_fingerprints(
          candidate_fingerprints, published_fingerprints),
  };
}

NativeCoupledEvolutionCertificate evolve_native_coupled_histories(
    const NativeCoupledEvolutionRequest& request) {
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
  std::vector<NativeAtomicStepCertificate> steps;
  std::size_t accepted_count = 0;
  std::size_t rejected_count = 0;
  std::string halt_code;
  std::string current_time_token = request.start_time;

  while (current_time < requested_end) {
    if (steps.size() >= request.max_step_attempts) {
      halt_code = "numeric_resource_limit_exhausted";
      break;
    }
    const double remaining = requested_end - current_time;
    const double attempted_step = std::min(step_size, remaining);
    const bool reaches_end = attempted_step == remaining;
    const std::string attempted_end = reaches_end
        ? request.end_time
        : decimal_token(current_time + attempted_step);
    auto step = certify_native_atomic_coupled_step(
        request, histories, steps.size(), current_time_token, attempted_end);
    if (step.status == "accepted") {
      histories = step.published_histories;
      current_time_token = step.accepted_time;
      current_time = scalar_token(current_time_token);
      ++accepted_count;
      steps.push_back(std::move(step));
      continue;
    }
    ++rejected_count;
    steps.push_back(std::move(step));
    if (rejected_count > request.max_rejected_steps) {
      halt_code = "numeric_resource_limit_exhausted";
      break;
    }
    const double next_step = attempted_step * 0.5;
    if (next_step < minimum_step) {
      halt_code = "minimum_step_exhausted";
      break;
    }
    step_size = next_step;
  }
  const bool completed = current_time == requested_end;
  const bool all_atomic = std::all_of(
      steps.begin(), steps.end(),
      [](const auto& step) { return step.publication_atomic; });
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
      .halt_code = completed ? "" : halt_code,
      .evidence_status = completed
          ? "executable_architecture_evidence"
          : "failed",
      .all_steps_atomic = all_atomic,
  };
}

}  // namespace architrino::eom
