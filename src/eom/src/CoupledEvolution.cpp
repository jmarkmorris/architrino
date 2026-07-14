#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/MultiprecisionAcceleration.hpp"

#include <algorithm>
#include <array>
#include <charconv>
#include <chrono>
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

bool vectors_overlap(
    const IntervalVector& left, const IntervalVector& right);

const NativePairAccelerationCertificate& snapshot_pair(
    const NativeAccelerationSnapshotCertificate& snapshot,
    const std::string& receiver,
    const std::string& source);

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
    const SnapshotTotals& end_acceleration,
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

SubstepAttempt corrected_substep_impl(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    const std::string& start_time,
    const std::string& end_time,
    NativeCorrectedSubstepTiming* timing,
    const NativeAccelerationSnapshotCertificate* reusable_start_snapshot) {
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
  const SnapshotTotals start_totals = snapshot_totals(start_snapshot);
  auto predictor_histories = append_candidate_segments(
      histories, start_time, end_time, start_totals, start_totals, timing);
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
        histories, start_time, end_time, start_totals, endpoint_guess, timing);
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

SubstepAttempt corrected_substep(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    const std::string& start_time,
    const std::string& end_time,
    const NativeAccelerationSnapshotCertificate* reusable_start_snapshot =
        nullptr) {
  const auto timing_start = SteadyClock::now();
  NativeCorrectedSubstepTiming timing;
  auto attempt = corrected_substep_impl(
      request, histories, start_time, end_time, &timing,
      reusable_start_snapshot);
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
      .integration_method = kNativeIntegrationMethod,
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
  IntervalVector receiver_positions =
      histories.front().history.position_hull(reception);
  IntervalVector source_positions =
      histories.front().history.full_position_hull();
  for (std::size_t index = 1U; index < histories.size(); ++index) {
    receiver_positions = hull(
        receiver_positions,
        histories[index].history.position_hull(reception));
    source_positions = hull(
        source_positions,
        histories[index].history.full_position_hull());
  }
  const Interval separation =
      norm(subtract(receiver_positions, source_positions));
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
      members.push_back({path.path_id, &path.history});
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
          .maximum_exact_pairs = request.traversal_maximum_exact_pairs,
          .thread_count = request.thread_count,
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
    std::vector<ExactPairRequest> root_requests;
    root_requests.reserve(logical_pair_count);
    for (const auto& receiver : histories) {
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
        });
      }
    }
    const auto exact_root_timing_start = SteadyClock::now();
    root_certificates =
        certify_exact_pair_batch(root_requests, request.thread_count);
    timing.exact_root_batch_wall_seconds +=
        elapsed_seconds(exact_root_timing_start);
  }
  for (const auto& root : root_certificates) {
    timing.root_binary64_cpu_seconds += root.binary64_cpu_seconds;
    timing.root_mpfr_cpu_seconds += root.mpfr_cpu_seconds;
    timing.root_mpfr_attempt_count += root.mpfr_attempt_count;
  }
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
  const auto acceleration_timing_start = SteadyClock::now();
  auto acceleration = certify_acceleration_reconstruction(
      path_ids(request), pair_requests, request.thread_count);
  timing.acceleration_wall_seconds +=
      elapsed_seconds(acceleration_timing_start);
  std::string failure_code;
  if (!traversal_failure.empty()) {
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
    const NativeAccelerationSnapshotCertificate* reusable_start_snapshot) {
  validate_request(request);
  validate_step_inputs(request, histories, start_time, end_time);
  auto full = corrected_substep(
      request, histories, start_time, end_time, reusable_start_snapshot);
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
      &full.certificate.start_snapshot);
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
      &*first_half.certificate.endpoint_snapshot);
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
  auto accepted_histories = inflate_fine_histories(
      histories, *second_half.histories, local_errors);
  timing->history_copy_hash_wall_seconds +=
      elapsed_seconds(inflation_timing_start);
  const auto recertification_timing_start = SteadyClock::now();
  auto accepted_snapshot = certify_native_acceleration_snapshot(
      request, accepted_histories, end_time);
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
  if (!substeps.back().endpoint_snapshot.has_value()) {
    throw std::runtime_error("accepted candidate substep lacks endpoint snapshot");
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
      .failure_code = "",
      .evidence_status = "executable_architecture_evidence",
      .integration_method = kNativeIntegrationMethod,
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
    const NativeAccelerationSnapshotCertificate* reusable_start_snapshot) {
  const auto timing_start = SteadyClock::now();
  NativeAtomicStepTiming timing;
  auto certificate = certify_native_atomic_coupled_step_impl(
      request, histories, step_index, start_time, end_time, &timing,
      reusable_start_snapshot);
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
  total.history_window_wall_seconds +=
      snapshot.timing.history_window_wall_seconds;
  total.traversal_wall_seconds += snapshot.timing.traversal_wall_seconds;
  total.exact_root_batch_wall_seconds +=
      snapshot.timing.exact_root_batch_wall_seconds;
  total.root_binary64_cpu_seconds +=
      snapshot.timing.root_binary64_cpu_seconds;
  total.root_mpfr_cpu_seconds += snapshot.timing.root_mpfr_cpu_seconds;
  total.root_mpfr_attempt_count += snapshot.timing.root_mpfr_attempt_count;
  total.acceleration_wall_seconds += snapshot.timing.acceleration_wall_seconds;
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
      accumulate_snapshot_timing(timing, substep.start_snapshot);
      if (substep.endpoint_snapshot.has_value()) {
        accumulate_snapshot_timing(timing, *substep.endpoint_snapshot);
      }
    }
    if (step.accepted_snapshot.has_value()) {
      accumulate_snapshot_timing(timing, *step.accepted_snapshot);
    }
  }
  return timing;
}

NativeCoupledEvolutionCertificate evolve_native_coupled_histories(
    const NativeCoupledEvolutionRequest& request) {
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

  while (current_time < requested_end) {
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
    for (auto found = steps.rbegin(); found != steps.rend(); ++found) {
      if (found->status == "accepted" &&
          numeric_equal(found->accepted_time, current_time_token) &&
          found->accepted_snapshot.has_value()) {
        reusable_start_snapshot = &*found->accepted_snapshot;
        break;
      }
    }
    auto step = certify_native_atomic_coupled_step(
        request, histories, steps.size(), current_time_token, attempted_end,
        reusable_start_snapshot);
    if (step.status == "accepted") {
      const bool growth_headroom = request.use_adaptive_step_growth &&
          step_has_growth_headroom(request, step);
      histories = step.published_histories;
      current_time_token = step.accepted_time;
      current_time = scalar_token(current_time_token);
      ++accepted_count;
      steps.push_back(std::move(step));
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
      .halt_code = completed ? "" : halt_code,
      .evidence_status = completed
          ? "executable_architecture_evidence"
          : "failed",
      .all_steps_atomic = all_atomic,
      .timing = timing,
  };
}

}  // namespace architrino::eom
