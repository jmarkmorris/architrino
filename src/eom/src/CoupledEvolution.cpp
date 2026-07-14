#include "architrino/eom/CoupledEvolution.hpp"

#include <algorithm>
#include <array>
#include <charconv>
#include <cmath>
#include <cstddef>
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

double scalar_token(const std::string& token) {
  return Interval::decimal_token(token).midpoint();
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
      if (topology_signature(start_snapshot) !=
          topology_signature(endpoint_snapshot)) {
        return {
            failed_substep_certificate(
                start_time, end_time, std::move(start_snapshot),
                std::move(endpoint_snapshot), iteration, correction_error,
                "root_event_requires_subdivision", candidate_histories),
            std::nullopt,
        };
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
  tolerance_value(request.position_tolerance, "position tolerance");
  tolerance_value(request.velocity_tolerance, "velocity tolerance");
  tolerance_value(request.correction_tolerance, "correction tolerance");
  if (request.root_max_depth == 0U || request.root_max_cells == 0U ||
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

}  // namespace

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
          .source_normal_floor = request.source_normal_floor,
          .acceleration_tolerance = request.acceleration_tolerance,
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
  } else if (std::any_of(
                 root_certificates.begin(), root_certificates.end(),
                 [](const auto& root) {
                   return root.status != "certified_complete";
                 })) {
    failure_code = "unresolved_root_set";
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
