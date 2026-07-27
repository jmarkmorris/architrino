#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/History.hpp"
#include "architrino/eom/JointAffineHistory.hpp"

#include <array>
#include <cmath>
#include <iomanip>
#include <iostream>
#include <map>
#include <sstream>
#include <stdexcept>
#include <string>
#include <vector>

namespace eom = architrino::eom;

namespace {

constexpr double kHistoryDepth = 20.0;
constexpr double kHistorySegmentStep = 0.1;
constexpr double kCoupling = 36.0 * 0.2862286103053385;
constexpr const char* kFrontierStart = "1.2399999999999993";
constexpr const char* kFrontierEnd = "1.2449999999999992";

std::string token(double value) {
  std::ostringstream stream;
  stream << std::setprecision(17) << value;
  return stream.str();
}

eom::RetainedHistory stationary_history(int polarity) {
  const std::size_t segment_count = static_cast<std::size_t>(
      std::llround(kHistoryDepth / kHistorySegmentStep));
  std::vector<eom::CubicHistorySegment> segments;
  segments.reserve(segment_count);
  for (std::size_t index = 0U; index < segment_count; ++index) {
    const double start =
        -kHistoryDepth + kHistorySegmentStep * static_cast<double>(index);
    const double end = index + 1U == segment_count
        ? 0.0
        : -kHistoryDepth +
            kHistorySegmentStep * static_cast<double>(index + 1U);
    eom::CubicCoefficientTokens coefficients{};
    coefficients[0] = {
        token(static_cast<double>(polarity) * 0.5), "0", "0", "0"};
    coefficients[1] = {"0", "0", "0", "0"};
    coefficients[2] = {"0", "0", "0", "0"};
    segments.emplace_back(
        token(start), token(end), coefficients, "1e-14", "1e-14");
  }
  const std::string path_id = polarity > 0 ? "positive" : "negative";
  return eom::RetainedHistory(
      path_id + "-stationary-held-prehistory", std::move(segments));
}

std::vector<eom::NativeCoupledPathInput> stationary_paths() {
  return {
      {"positive", "0.1666666666666666666666666666666667",
       stationary_history(+1)},
      {"negative", "-0.1666666666666666666666666666666667",
       stationary_history(-1)},
  };
}

eom::JointAffineRetainedHistory exact_joint_history(
    const std::string& path_id, const eom::RetainedHistory& ordinary) {
  std::vector<eom::JointAffineCubicSegment> segments;
  segments.reserve(ordinary.segments().size());
  for (const auto& ordinary_segment : ordinary.segments()) {
    eom::JointAffineCubicSegment joint_segment;
    joint_segment.start_time = ordinary_segment.t_start();
    joint_segment.end_time = ordinary_segment.t_end();
    segments.push_back(std::move(joint_segment));
  }
  return eom::JointAffineRetainedHistory(
      path_id, {}, std::move(segments));
}

eom::NativeCoupledEvolutionRequest request(
    std::vector<eom::NativeCoupledPathInput> paths) {
  eom::NativeCoupledEvolutionRequest result{};
  result.run_id = "stationary-rest-r0-joint-frontier-validation";
  result.paths = std::move(paths);
  result.start_time = "0";
  result.end_time = kFrontierStart;
  result.initial_step = "0.02";
  result.minimum_step = "0.005";
  result.maximum_step = "0.02";
  result.field_speed = "1";
  result.coupling = token(kCoupling);
  result.root_tolerance = "1e-5";
  result.transmitter_factor_floor = "1e-24";
  result.acceleration_tolerance = token(5e-3);
  result.chart_policy = "sharp";
  result.causal_width = "0.05";
  result.core_scale = "0.05";
  result.quadrature_tolerance = token(5e-3);
  result.event_impulse_tolerance = "1e-6";
  result.regulator_convergence_tolerance = "1e-3";
  result.position_tolerance = token(2e-6);
  result.velocity_tolerance = token(2e-6);
  result.correction_tolerance = "2e-7";
  result.root_max_depth = 192;
  result.root_max_cells = 500000;
  result.quadrature_max_depth = 32;
  result.quadrature_max_cells = 300000;
  result.event_max_depth = 24;
  result.event_max_cells = 300000;
  result.initial_mpfr_bits = 128;
  result.maximum_mpfr_bits = 512;
  result.max_correction_iterations = 12;
  result.max_step_attempts = 200000;
  result.max_rejected_steps = 1000;
  result.thread_count = 4;
  result.use_analytic_pinned_fold = false;
  result.use_pinned_fold_aware_temporal_step = false;
  for (const auto& path : result.paths) {
    result.joint_histories.emplace(
        path.path_id, exact_joint_history(path.path_id, path.history));
  }
  return result;
}

const eom::NativeSnapshotRootRow* root_row(
    const eom::NativeAccelerationSnapshotCertificate& snapshot,
    const std::string& receiver, const std::string& transmitter) {
  for (const auto& row : snapshot.root_certificates) {
    if (row.receiver_path_id == receiver &&
        row.transmitter_path_id == transmitter) {
      return &row;
    }
  }
  return nullptr;
}

void print_json_string(const std::string& value) {
  std::cout << '"';
  for (const char character : value) {
    if (character == '"' || character == '\\') std::cout << '\\';
    std::cout << character;
  }
  std::cout << '"';
}

void print_root_row(
    const eom::NativeAccelerationSnapshotCertificate* snapshot,
    const std::string& receiver, const std::string& transmitter) {
  const auto* row = snapshot == nullptr
      ? nullptr
      : root_row(*snapshot, receiver, transmitter);
  std::cout << "{\"row_id\":";
  print_json_string(
      "stationary-rest-r0-joint-frontier/" + receiver + "<-" + transmitter);
  std::cout << ",\"receiver\":";
  print_json_string(receiver);
  std::cout << ",\"transmitter\":";
  print_json_string(transmitter);
  if (row == nullptr) {
    std::cout << ",\"status\":\"uncertified\""
              << ",\"failure\":\"root_certificate_row_missing\""
              << ",\"diagnostic\":\"joint_frontier_snapshot_missing\""
              << ",\"precision_bits\":0"
              << ",\"mpfr_attempts\":0"
              << ",\"root_count\":0"
              << ",\"root_free_complement\":false}";
    return;
  }
  const auto& certificate = row->certificate;
  std::cout << ",\"status\":";
  print_json_string(certificate.status);
  std::cout << ",\"failure\":";
  print_json_string(certificate.failure_code);
  std::cout << ",\"diagnostic\":";
  print_json_string(certificate.diagnostic_detail);
  std::cout << ",\"precision_bits\":"
            << certificate.achieved_precision_bits
            << ",\"mpfr_attempts\":" << certificate.mpfr_attempt_count
            << ",\"root_count\":" << certificate.roots.size()
            << ",\"root_free_complement\":"
            << (certificate.root_free_complement ? "true" : "false")
            << ",\"roots\":[";
  for (std::size_t index = 0U; index < certificate.roots.size(); ++index) {
    if (index > 0U) std::cout << ',';
    const auto& root = certificate.roots[index];
    std::cout << "{\"lower\":";
    print_json_string(root.lower);
    std::cout << ",\"upper\":";
    print_json_string(root.upper);
    std::cout << ",\"transmitter_factor_lower\":";
    print_json_string(root.transmitter_factor_lower);
    std::cout << ",\"transmitter_factor_upper\":";
    print_json_string(root.transmitter_factor_upper);
    std::cout << ",\"receiver_factor_lower\":";
    print_json_string(root.receiver_factor_lower);
    std::cout << ",\"receiver_factor_upper\":";
    print_json_string(root.receiver_factor_upper);
    std::cout << ",\"precision_route\":";
    print_json_string(root.precision_route);
    std::cout << ",\"precision_bits\":" << root.precision_bits << '}';
  }
  std::cout << "]}";
}

bool certified_cross_root(
    const eom::NativeAccelerationSnapshotCertificate* snapshot,
    const std::string& receiver, const std::string& transmitter) {
  const auto* row = snapshot == nullptr
      ? nullptr
      : root_row(*snapshot, receiver, transmitter);
  return row != nullptr &&
      row->certificate.status == "certified_complete" &&
      row->certificate.root_free_complement &&
      row->certificate.roots.size() == 1U;
}

bool published_histories_unchanged(
    const std::vector<eom::NativePublishedPath>& expected,
    const std::vector<eom::NativePublishedPath>& published) {
  if (expected.size() != published.size()) return false;
  for (const auto& expected_path : expected) {
    bool matched = false;
    for (const auto& published_path : published) {
      if (published_path.path_id == expected_path.path_id) {
        matched =
            published_path.history.provenance_fingerprint() ==
            expected_path.history.provenance_fingerprint();
        break;
      }
    }
    if (!matched) return false;
  }
  return true;
}

const eom::NativePublishedPath& published_path(
    const std::vector<eom::NativePublishedPath>& histories,
    const std::string& path_id) {
  for (const auto& history : histories) {
    if (history.path_id == path_id) return history;
  }
  throw std::runtime_error("published stationary path is missing: " + path_id);
}

}  // namespace

int main() {
  try {
    auto validation_request = request(stationary_paths());
    const auto prefix = eom::evolve_native_coupled_histories(
        validation_request);
    if (prefix.status != "completed" ||
        prefix.accepted_end_time != kFrontierStart ||
        prefix.joint_histories.size() != 2U) {
      const std::string step_failure = prefix.steps.empty()
          ? "no_step"
          : prefix.steps.back().failure_code;
      const std::string substep_failure =
          prefix.steps.empty() || prefix.steps.back().substeps.empty()
          ? "no_substep"
          : prefix.steps.back().substeps.back().failure_code;
      throw std::runtime_error(
          "stationary joint prefix did not reach the exact frontier: " +
          prefix.status + "/" + prefix.halt_code + "/" +
          prefix.accepted_end_time + "/step=" + step_failure +
          "/substep=" + substep_failure);
    }

    validation_request.joint_histories = prefix.joint_histories;
    const auto& positive = published_path(prefix.histories, "positive");
    const auto& negative = published_path(prefix.histories, "negative");
    const std::string replay_start =
        positive.history.segments().back().t_end_token();
    const std::string negative_replay_start =
        negative.history.segments().back().t_end_token();
    if (std::stod(replay_start) != std::stod(kFrontierStart) ||
        std::stod(negative_replay_start) != std::stod(kFrontierStart)) {
      throw std::runtime_error(
          "stationary joint prefix history does not end at the exact "
          "frontier: positive=" + replay_start +
          "/negative=" + negative_replay_start);
    }
    validation_request.start_time = replay_start;
    validation_request.end_time = kFrontierEnd;
    validation_request.paths = {
        {"positive", "0.1666666666666666666666666666666667",
         positive.history},
        {"negative", "-0.1666666666666666666666666666666667",
         negative.history},
    };
    const auto replay = eom::certify_native_atomic_coupled_step(
        validation_request, prefix.histories, prefix.steps.size(),
        replay_start, kFrontierEnd);
    const eom::NativeAccelerationSnapshotCertificate* snapshot =
        replay.accepted_snapshot.has_value()
        ? &*replay.accepted_snapshot
        : (!replay.substeps.empty() &&
                   replay.substeps.back().endpoint_snapshot.has_value()
               ? &*replay.substeps.back().endpoint_snapshot
               : nullptr);
    const bool positive_cross = certified_cross_root(
        snapshot, "positive", "negative");
    const bool negative_cross = certified_cross_root(
        snapshot, "negative", "positive");
    const bool certified =
        replay.status == "accepted" && positive_cross && negative_cross;
    const bool atomic_fail_closed =
        replay.status == "accepted" ||
        published_histories_unchanged(
            prefix.histories, replay.published_histories);
    const auto& first_joint = prefix.joint_histories.begin()->second;

    std::cout << std::setprecision(17)
              << "{\"schema\":"
                 "\"eom_stationary_joint_frontier_fixture/v1\""
              << ",\"fixture_scope\":\"validation_only\""
              << ",\"campaign_1_enabled\":false"
              << ",\"field_speed\":\"1\""
              << ",\"root_tolerance\":\"1e-5\""
              << ",\"frontier_start\":";
    print_json_string(kFrontierStart);
    std::cout << ",\"frontier_end\":";
    print_json_string(kFrontierEnd);
    std::cout << ",\"replay_input_start_token\":";
    print_json_string(replay_start);
    std::cout << ",\"prefix_status\":";
    print_json_string(prefix.status);
    std::cout << ",\"prefix_accepted_end\":";
    print_json_string(prefix.accepted_end_time);
    std::cout << ",\"prefix_accepted_steps\":" << prefix.accepted_step_count
              << ",\"endpoint_corrector_joint_path_count\":"
              << prefix.joint_histories.size()
              << ",\"endpoint_corrector_joint_symbol_count\":"
              << first_joint.symbol_registry().size()
              << ",\"endpoint_corrector_joint_segment_count\":"
              << first_joint.segments().size()
              << ",\"replay_status\":";
    print_json_string(replay.status);
    std::cout << ",\"replay_failure\":";
    print_json_string(replay.failure_code);
    std::cout << ",\"atomic_fail_closed\":"
              << (atomic_fail_closed ? "true" : "false")
              << ",\"result\":";
    print_json_string(certified ? "certified_complete" : "fail_closed");
    std::cout << ",\"fail_closed_row\":";
    print_json_string(
        certified ? ""
                  : "stationary_rest_r0_joint_frontier_uncertified_v1");
    std::cout << ",\"cross_roots\":[";
    print_root_row(snapshot, "positive", "negative");
    std::cout << ',';
    print_root_row(snapshot, "negative", "positive");
    std::cout << "]}\n";
    if (!atomic_fail_closed) {
      throw std::runtime_error(
          "rejected stationary replay did not preserve atomic publication");
    }
    return certified ? 0 : 2;
  } catch (const std::exception& error) {
    std::cerr << "stationary joint frontier fixture error: "
              << error.what() << '\n';
    return 1;
  }
}
