#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/Checkpoint.hpp"
#include "architrino/eom/History.hpp"
#include "architrino/eom/JointAffineHistory.hpp"

#include <array>
#include <chrono>
#include <cmath>
#include <filesystem>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <locale>
#include <map>
#include <optional>
#include <sstream>
#include <stdexcept>
#include <string>
#include <type_traits>
#include <vector>

namespace eom = architrino::eom;

namespace {

constexpr double kHistoryDepth = 20.0;
constexpr double kHistorySegmentStep = 0.1;
constexpr double kCoupling = 36.0 * 0.2862286103053385;
constexpr const char* kFrontierStart = "1.2399999999999993";
constexpr const char* kFrontierTarget = "1.394999999999996";
constexpr const char* kNextProbeTarget = "1.3999999999999959";
constexpr double kFrontierStep = 0.005;

std::string token(double value) {
  std::ostringstream stream;
  stream.imbue(std::locale::classic());
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
  result.minimum_step = "0.0025";
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

void write_json_string(std::ostream& stream, const std::string& value) {
  stream << '"';
  constexpr char hex[] = "0123456789abcdef";
  for (const unsigned char character : value) {
    if (character == '"' || character == '\\') {
      stream << '\\' << character;
    } else if (character < 0x20U) {
      stream << "\\u00" << hex[character >> 4U] << hex[character & 15U];
    } else {
      stream << character;
    }
  }
  stream << '"';
}

void print_json_string(const std::string& value) {
  write_json_string(std::cout, value);
}

template <typename Value>
void write_carrier_value(std::ostream& stream, const Value& value) {
  if constexpr (std::is_same_v<Value, std::string>) {
    write_json_string(stream, value);
  } else if constexpr (std::is_same_v<Value, double>) {
    // Seventeen significant digits preserve the stored binary64 value.
    write_json_string(stream, token(value));
  } else {
    stream << '[';
    bool first = true;
    for (const auto& item : value) {
      if (!first) stream << ',';
      first = false;
      write_carrier_value(stream, item);
    }
    stream << ']';
  }
}

struct RejectedCandidateCapture {
  std::string start_time;
  std::string end_time;
  std::string failure_code;
  std::size_t correction_iteration = 0;
  std::vector<eom::NativePublishedPath> histories;
  std::map<std::string, eom::JointAffineRetainedHistory> joint_histories;
};

void write_rejected_candidate(
    std::ostream& stream, const eom::NativeCoupledEvolutionRequest& request,
    const RejectedCandidateCapture& candidate) {
  stream << "{\"schema\":\"eom_rejected_candidate_diagnostic/v1\","
            "\"published\":false,\"resumable_checkpoint\":false";
  const auto field = [&](const char* name, const auto& value) {
    stream << ',';
    write_json_string(stream, name);
    stream << ':';
    write_carrier_value(stream, value);
  };
  field("run_id", request.run_id);
  field("model_fingerprint", eom::native_evolution_model_fingerprint(request));
  field("start_time", candidate.start_time);
  field("end_time", candidate.end_time);
  field("failure_code", candidate.failure_code);
  stream << ",\"correction_iteration\":" << candidate.correction_iteration;
  stream << ",\"paths\":[";
  bool first_path = true;
  for (const auto& path : candidate.histories) {
    if (!first_path) stream << ',';
    first_path = false;
    stream << '{';
    write_json_string(stream, "path_id");
    stream << ':';
    write_json_string(stream, path.path_id);
    field("history_id", path.history.history_id());
    field("history_fingerprint", path.history.provenance_fingerprint());
    for (const auto& input : request.paths) {
      if (input.path_id == path.path_id) field("charge", input.charge);
    }
    stream << ",\"uniform_circular_endpoint_certificate\":";
    const auto& circular = path.history.uniform_circular_endpoint_certificate();
    if (circular) {
      stream << "{\"present\":true";
      field("valid_start_time", circular->valid_start_time);
      field("valid_reception_time", circular->valid_reception_time);
      field("maximum_segment_step", circular->maximum_segment_step);
      field("cylindrical_radius", circular->cylindrical_radius);
      field("height", circular->height);
      field("angular_speed", circular->angular_speed);
      field("tangential_speed", circular->tangential_speed);
      field("phase", circular->phase);
      field("tilt_x", circular->tilt_x);
      field("tilt_y", circular->tilt_y);
      stream << '}';
    } else {
      stream << "null";
    }
    stream << ",\"segments\":[";
    bool first_segment = true;
    for (const auto& segment : path.history.segments()) {
      if (!first_segment) stream << ',';
      first_segment = false;
      stream << "{\"start_time\":";
      write_json_string(stream, segment.t_start_token());
      field("end_time", segment.t_end_token());
      field("coefficients", segment.coefficient_tokens());
      field("position_errors", segment.position_error_tokens());
      field("velocity_errors", segment.velocity_error_tokens());
      stream << '}';
    }
    stream << "]}";
  }
  stream << "],\"joint_histories\":[";
  first_path = true;
  for (const auto& [id, history] : candidate.joint_histories) {
    if (!first_path) stream << ',';
    first_path = false;
    stream << "{\"map_path_id\":";
    write_json_string(stream, id);
    field("path_id", history.path_id());
    field("history_fingerprint", history.provenance_fingerprint());
    field("symbol_registry", history.symbol_registry());
    stream << ",\"segments\":[";
    bool first_segment = true;
    for (const auto& segment : history.segments()) {
      if (!first_segment) stream << ',';
      first_segment = false;
      stream << "{\"start_time\":";
      write_carrier_value(stream, segment.start_time);
      field("end_time", segment.end_time);
      field("position_coefficients", segment.position_coefficients);
      field("position_remainder_radii", segment.position_remainder_radii);
      field("velocity_remainder_radii", segment.velocity_remainder_radii);
      stream << '}';
    }
    stream << "],\"endpoint_override\":";
    if (history.endpoint_override()) {
      const auto& endpoint = *history.endpoint_override();
      stream << "{\"time\":";
      write_carrier_value(stream, endpoint.time);
      field("position_shared_symbol_coefficients", endpoint.position_shared_symbol_coefficients);
      field("velocity_shared_symbol_coefficients", endpoint.velocity_shared_symbol_coefficients);
      field("position_remainder_radii", endpoint.position_remainder_radii);
      field("velocity_remainder_radii", endpoint.velocity_remainder_radii);
      stream << '}';
    } else {
      stream << "null";
    }
    stream << '}';
  }
  stream << "]}\n";
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
  for (const auto& [name, value] : std::array{
           std::pair{"receiver_history_fingerprint", &certificate.receiver_history_fingerprint},
           std::pair{"transmitter_history_fingerprint", &certificate.transmitter_history_fingerprint},
           std::pair{"reception_time", &certificate.reception_time},
           std::pair{"searched_lower", &certificate.searched_lower},
           std::pair{"searched_upper", &certificate.searched_upper}}) {
    std::cout << ',';
    print_json_string(name);
    std::cout << ':';
    print_json_string(*value);
  }
  std::cout << ",\"has_difficult_cell\":"
            << (certificate.has_difficult_cell ? "true" : "false")
            << ",\"difficult_source_segment_index\":"
            << certificate.difficult_source_segment_index;
  for (const auto& [name, value] : std::array{
           std::pair{"difficult_cell_lower", &certificate.difficult_cell_lower},
           std::pair{"difficult_cell_upper", &certificate.difficult_cell_upper},
           std::pair{"difficult_point", &certificate.difficult_point},
           std::pair{"difficult_point_residual_lower", &certificate.difficult_point_residual_lower},
           std::pair{"difficult_point_residual_upper", &certificate.difficult_point_residual_upper},
           std::pair{"difficult_transmitter_factor_lower", &certificate.difficult_transmitter_factor_lower},
           std::pair{"difficult_transmitter_factor_upper", &certificate.difficult_transmitter_factor_upper},
           std::pair{"difficult_receiver_factor_lower", &certificate.difficult_receiver_factor_lower},
           std::pair{"difficult_receiver_factor_upper", &certificate.difficult_receiver_factor_upper}}) {
    std::cout << ',';
    print_json_string(name);
    std::cout << ':';
    print_json_string(*value);
  }
  std::cout << ",\"difficult_lower_sign\":" << certificate.difficult_lower_sign
            << ",\"difficult_upper_sign\":" << certificate.difficult_upper_sign
            << ",\"coincident_endpoint_excluded\":"
            << (certificate.coincident_endpoint_excluded ? "true" : "false")
            << ",\"memory_boundary_contact\":"
            << (certificate.memory_boundary_contact ? "true" : "false");
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

void print_root_rows(
    const eom::NativeAccelerationSnapshotCertificate* snapshot) {
  if (!snapshot) return;
  for (std::size_t index = 0; index < snapshot->root_certificates.size();
       ++index) {
    if (index) std::cout << ',';
    const auto& row = snapshot->root_certificates[index];
    print_root_row(snapshot, row.receiver_path_id, row.transmitter_path_id);
  }
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

bool same_cross_root_result(
    const eom::NativeAccelerationSnapshotCertificate& left,
    const eom::NativeAccelerationSnapshotCertificate& right,
    const std::string& receiver, const std::string& transmitter) {
  const auto* left_row = root_row(left, receiver, transmitter);
  const auto* right_row = root_row(right, receiver, transmitter);
  if (left_row == nullptr || right_row == nullptr) return false;
  const auto& left_certificate = left_row->certificate;
  const auto& right_certificate = right_row->certificate;
  if (left_certificate.status != right_certificate.status ||
      left_certificate.failure_code != right_certificate.failure_code ||
      left_certificate.root_free_complement !=
          right_certificate.root_free_complement ||
      left_certificate.memory_boundary_contact !=
          right_certificate.memory_boundary_contact ||
      left_certificate.roots.size() != right_certificate.roots.size()) {
    return false;
  }
  for (std::size_t index = 0U;
       index < left_certificate.roots.size(); ++index) {
    const auto& left_root = left_certificate.roots[index];
    const auto& right_root = right_certificate.roots[index];
    if (left_root.lower != right_root.lower ||
        left_root.upper != right_root.upper ||
        left_root.transmitter_factor_lower !=
            right_root.transmitter_factor_lower ||
        left_root.transmitter_factor_upper !=
            right_root.transmitter_factor_upper ||
        left_root.receiver_factor_lower !=
            right_root.receiver_factor_lower ||
        left_root.receiver_factor_upper !=
            right_root.receiver_factor_upper ||
        left_root.transmitter_factor_sign !=
            right_root.transmitter_factor_sign ||
        left_root.transmitter_segment_indices !=
            right_root.transmitter_segment_indices ||
        left_root.precision_route != right_root.precision_route ||
        left_root.precision_bits != right_root.precision_bits) {
      return false;
    }
  }
  return true;
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

struct FailedSnapshot {
  const eom::NativeAccelerationSnapshotCertificate* snapshot = nullptr;
  std::string stage = "no_failed_acceleration_snapshot";
};

FailedSnapshot failed_snapshot(const eom::NativeAtomicStepCertificate& step) {
  if (step.recertification_snapshot &&
      step.recertification_snapshot->status != "certified_complete") {
    return {&*step.recertification_snapshot, "final_recertification"};
  }
  for (const auto& substep : step.substeps) {
    if (substep.start_snapshot.status != "certified_complete") {
      return {&substep.start_snapshot, "substep_start"};
    }
    if (substep.endpoint_snapshot &&
        substep.endpoint_snapshot->status != "certified_complete") {
      return {&*substep.endpoint_snapshot, "substep_endpoint"};
    }
  }
  return {};
}

// Diagnostic use of the production controller's existing boundary lift.
// The historical direct-atomic fixture below remains the unchanged control.
void print_trajectory_frame(
    const std::string& phase, const std::string& time,
    const std::vector<eom::NativePublishedPath>& histories,
    const eom::NativeAccelerationSnapshotCertificate* snapshot) {
  std::cout << "{\"phase\":";
  print_json_string(phase);
  std::cout << ",\"time\":";
  print_json_string(time);
  std::cout << ",\"paths\":[";
  for (std::size_t index = 0; index < histories.size(); ++index) {
    if (index) std::cout << ',';
    const auto& path = histories[index];
    const auto point_time = eom::Interval::point(std::stod(time));
    const auto position_enclosure = path.history.position_hull(point_time);
    const auto velocity_enclosure = path.history.velocity_hull(point_time);
    const auto position = path.history.nominal_position(std::stod(time));
    const auto velocity = path.history.nominal_velocity(std::stod(time));
    std::cout << "{\"path_id\":";
    print_json_string(path.path_id);
    for (std::size_t kind = 0; kind < 2; ++kind) {
      std::cout << (kind == 0 ? ",\"position\":[" : ",\"velocity\":[");
      const auto& enclosure = kind == 0 ? position_enclosure : velocity_enclosure;
      for (std::size_t axis = 0; axis < 3; ++axis) {
        if (axis) std::cout << ',';
        std::cout << '[' << enclosure[axis].lower() << ','
                  << enclosure[axis].upper() << ']';
      }
      std::cout << (kind == 0 ? "],\"nominal_position\":[" :
                               "],\"nominal_velocity\":[");
      const auto& nominal = kind == 0 ? position : velocity;
      for (std::size_t axis = 0; axis < 3; ++axis) {
        if (axis) std::cout << ',';
        std::cout << nominal[axis];
      }
      std::cout << ']';
    }
    std::cout << '}';
  }
  std::cout << "],\"roots\":[";
  print_root_rows(snapshot);
  std::cout << "]}";
}

int diagnose_controller_continuation(
    eom::NativeCoupledEvolutionRequest continuation_request,
    const eom::NativeCoupledEvolutionCertificate& prefix,
    const std::string& target, bool include_trajectory = false,
    const std::string& continuation_step = "0.005",
    const eom::NativeEvolutionCheckpoint* checkpoint = nullptr,
    const std::string& checkpoint_out = "",
    const std::string& candidate_out = "") {
  const std::string prefix_minimum_step = continuation_request.minimum_step;
  const std::string prefix_maximum_step = continuation_request.maximum_step;
  continuation_request.start_time = prefix.accepted_end_time;
  continuation_request.end_time = target;
  continuation_request.initial_step = continuation_step;
  continuation_request.minimum_step = continuation_step;
  continuation_request.maximum_step = continuation_step;
  continuation_request.joint_histories = prefix.joint_histories;
  for (auto& path : continuation_request.paths) {
    path.history = published_path(prefix.histories, path.path_id).history;
  }
  std::optional<RejectedCandidateCapture> rejected_candidate;
  if (!candidate_out.empty()) {
    continuation_request.failed_substep_candidate_callback =
        [&rejected_candidate](
            const std::string& start, const std::string& end,
            const std::string& failure, std::size_t iteration,
            const std::vector<eom::NativePublishedPath>& histories,
            const std::map<std::string, eom::JointAffineRetainedHistory>& joint) {
          if (!rejected_candidate) {
            rejected_candidate = RejectedCandidateCapture{
                start, end, failure, iteration, histories, joint};
          }
        };
  }
  const auto continuation = checkpoint
      ? eom::resume_native_coupled_histories(
            continuation_request, *checkpoint, target)
      : eom::evolve_native_coupled_histories(continuation_request);
  std::string saved_checkpoint_fingerprint;
  if (!checkpoint_out.empty() && continuation.status == "completed") {
    const auto saved = eom::create_native_evolution_checkpoint(
        continuation_request, continuation);
    eom::write_native_evolution_checkpoint_atomic(checkpoint_out, saved);
    saved_checkpoint_fingerprint = saved.checkpoint_fingerprint;
  }
  if (!candidate_out.empty() && rejected_candidate) {
    const std::string temporary = candidate_out + ".tmp";
    std::ofstream stream(temporary, std::ios::binary | std::ios::trunc);
    if (!stream) throw std::runtime_error("cannot open candidate diagnostic");
    write_rejected_candidate(stream, continuation_request, *rejected_candidate);
    stream.close();
    if (!stream) throw std::runtime_error("cannot write candidate diagnostic");
    std::filesystem::rename(temporary, candidate_out);
  }
  const eom::NativeAccelerationSnapshotCertificate* last_accepted = nullptr;
  const eom::NativeAtomicStepCertificate* first_rejected_step = nullptr;
  FailedSnapshot first_rejected;
  bool rejection_atomic = true;
  auto prior_histories = prefix.histories;
  auto prior_joint = prefix.joint_histories;
  for (const auto& step : continuation.steps) {
    if (step.status == "accepted") {
      prior_histories = step.published_histories;
      prior_joint = step.published_joint_histories;
      if (step.accepted_snapshot) last_accepted = &*step.accepted_snapshot;
    } else {
      rejection_atomic = rejection_atomic &&
          published_histories_unchanged(prior_histories,
                                        step.published_histories) &&
          step.input_joint_history_fingerprints.size() ==
              step.published_joint_histories.size();
      for (const auto& input : step.input_joint_history_fingerprints) {
        const auto found = step.published_joint_histories.find(input.path_id);
        rejection_atomic = rejection_atomic &&
            found != step.published_joint_histories.end() &&
            found->second.provenance_fingerprint() ==
                input.fingerprint;
      }
      if (!first_rejected_step) {
        first_rejected_step = &step;
        first_rejected = failed_snapshot(step);
      }
    }
  }
  // Internal first-step inputs may contain a prospective lift. The public
  // controller result must still preserve the last externally accepted state.
  rejection_atomic = rejection_atomic && continuation.all_steps_atomic &&
      published_histories_unchanged(prior_histories, continuation.histories) &&
      prior_joint.size() == continuation.joint_histories.size();
  for (const auto& [id, history] : prior_joint) {
    const auto found = continuation.joint_histories.find(id);
    rejection_atomic = rejection_atomic &&
        found != continuation.joint_histories.end() &&
        found->second.provenance_fingerprint() == history.provenance_fingerprint();
  }
  std::cout << std::setprecision(17)
            << "{\"schema\":\"eom_stationary_controller_continuation/v1\","
               "\"fixture_scope\":\"validation_only\","
               "\"campaign_1_enabled\":false,\"field_speed\":";
  print_json_string(continuation_request.field_speed);
  std::cout << ",\"coupling\":";
  print_json_string(continuation_request.coupling);
  std::cout << ",\"charges\":{";
  for (std::size_t index = 0; index < continuation_request.paths.size(); ++index) {
    if (index) std::cout << ',';
    print_json_string(continuation_request.paths[index].path_id);
    std::cout << ':';
    print_json_string(continuation_request.paths[index].charge);
  }
  std::cout << '}';
  std::cout << ",\"root_tolerance\":";
  print_json_string(continuation_request.root_tolerance);
  std::cout << ",\"model_fingerprint\":";
  print_json_string(eom::native_evolution_model_fingerprint(continuation_request));
  std::cout << ",\"request_controls\":{\"chart_policy\":";
  print_json_string(continuation_request.chart_policy);
  for (const auto& [name, value] : std::array{
           std::pair{"acceleration_tolerance", &continuation_request.acceleration_tolerance},
           std::pair{"position_tolerance", &continuation_request.position_tolerance},
           std::pair{"velocity_tolerance", &continuation_request.velocity_tolerance},
           std::pair{"correction_tolerance", &continuation_request.correction_tolerance},
           std::pair{"transmitter_factor_floor", &continuation_request.transmitter_factor_floor}}) {
    std::cout << ',';
    print_json_string(name);
    std::cout << ':';
    print_json_string(*value);
  }
  std::cout << ",\"initial_mpfr_bits\":" << continuation_request.initial_mpfr_bits
            << ",\"maximum_mpfr_bits\":" << continuation_request.maximum_mpfr_bits
            << ",\"root_max_depth\":" << continuation_request.root_max_depth
            << ",\"root_max_cells\":" << continuation_request.root_max_cells
            << ",\"max_correction_iterations\":" << continuation_request.max_correction_iterations
            << '}';
  std::cout << ",\"minimum_step\":";
  print_json_string(continuation_request.minimum_step);
  std::cout << ",\"maximum_step\":";
  print_json_string(continuation_request.maximum_step);
  std::cout << ",\"initial_step\":";
  print_json_string(checkpoint ? checkpoint->controller_step_size
                               : continuation_request.initial_step);
  std::cout << ",\"input_checkpoint_fingerprint\":";
  print_json_string(checkpoint ? checkpoint->checkpoint_fingerprint : "");
  std::cout << ",\"saved_checkpoint_fingerprint\":";
  print_json_string(saved_checkpoint_fingerprint);
  std::cout << ",\"checkpoint_out\":";
  print_json_string(saved_checkpoint_fingerprint.empty() ? "" : checkpoint_out);
  std::cout << ",\"candidate_out\":";
  print_json_string(rejected_candidate ? candidate_out : "");
  std::cout << ",\"prefix_minimum_step\":";
  print_json_string(prefix_minimum_step);
  std::cout << ",\"prefix_maximum_step\":";
  print_json_string(prefix_maximum_step);
  std::cout << ",\"prefix_accepted_steps\":" << prefix.accepted_step_count;
  std::cout << ",\"continuation_step\":";
  print_json_string(continuation_step);
  std::cout << ",\"start\":";
  print_json_string(prefix.accepted_end_time);
  std::cout << ",\"target\":";
  print_json_string(target);
  std::cout << ",\"status\":";
  print_json_string(continuation.status);
  std::cout << ",\"halt_code\":";
  print_json_string(continuation.halt_code);
  std::cout << ",\"accepted_end\":";
  print_json_string(continuation.accepted_end_time);
  std::cout << ",\"accepted_steps\":" << continuation.accepted_step_count
            << ",\"rejected_steps\":" << continuation.rejected_step_count
            << ",\"rejection_atomic\":"
            << (rejection_atomic ? "true" : "false")
            << ",\"prefix_symbol_count\":"
            << prefix.joint_histories.begin()->second.symbol_registry().size()
            << ",\"final_symbol_count\":"
            << (continuation.joint_histories.empty() ? 0U :
                continuation.joint_histories.begin()->second.symbol_registry().size())
            << ",\"endpoints\":[";
  for (std::size_t index = 0; index < continuation.histories.size(); ++index) {
    const auto& path = continuation.histories[index];
    const auto state = path.history.endpoint_state_hull();
    if (index) std::cout << ',';
    std::cout << "{\"path_id\":";
    print_json_string(path.path_id);
    std::cout << ",\"x\":[" << state.position[0].lower() << ','
              << state.position[0].upper() << "],\"vx\":["
              << state.velocity[0].lower() << ','
              << state.velocity[0].upper() << "]}";
  }
  std::cout << "],\"last_accepted_cross_roots\":[";
  print_root_row(last_accepted, "positive", "negative");
  std::cout << ',';
  print_root_row(last_accepted, "negative", "positive");
  std::cout << "],\"first_rejected_step_failure\":";
  print_json_string(first_rejected_step ? first_rejected_step->failure_code : "");
  std::cout << ",\"first_rejected_snapshot_stage\":";
  print_json_string(first_rejected_step ? first_rejected.stage : "");
  std::cout << ",\"first_rejected_reception_time\":";
  print_json_string(first_rejected.snapshot ?
                    first_rejected.snapshot->reception_time : "");
  std::cout << ",\"first_rejected_cross_roots\":[";
  if (first_rejected.snapshot) {
    print_root_row(first_rejected.snapshot, "positive", "negative");
    std::cout << ',';
    print_root_row(first_rejected.snapshot, "negative", "positive");
  }
  std::cout << "],\"first_rejected_roots\":[";
  print_root_rows(first_rejected.snapshot);
  std::cout << ']';
  if (include_trajectory) {
    std::cout << ",\"trajectory\":[";
    bool first = true;
    for (const auto* part : {&prefix, &continuation}) {
      for (const auto& step : part->steps) {
        if (step.status != "accepted") continue;
        if (!first) std::cout << ',';
        first = false;
        print_trajectory_frame(part == &prefix ? "prefix" : "continuation",
            step.accepted_time, step.published_histories,
            step.accepted_snapshot ? &*step.accepted_snapshot : nullptr);
      }
    }
    std::cout << ']';
  }
  std::cout << "}\n";
  return continuation.status == "completed" && rejection_atomic ? 0 : 2;
}

}  // namespace

int main(int argc, char** argv) {
  try {
    bool include_trajectory = false;
    std::map<std::string, std::string> options;
    for (int index = 1; index < argc; ++index) {
      const std::string option = argv[index];
      if (option == "--trajectory") {
        if (include_trajectory) throw std::invalid_argument("duplicate trajectory option");
        include_trajectory = true;
        continue;
      }
      if (option != "--controller-continuation" &&
          option != "--prefix-step-scale" && option != "--continuation-step" &&
          option != "--checkpoint-in" && option != "--checkpoint-out" &&
          option != "--candidate-out") {
        throw std::invalid_argument("unknown option: " + option);
      }
      if (++index >= argc || !options.emplace(option, argv[index]).second) {
        throw std::invalid_argument("missing value or duplicate option: " + option);
      }
    }
    const bool controller_continuation = options.contains("--controller-continuation");
    const bool refine_prefix = options.contains("--prefix-step-scale");
    const bool refine_continuation = options.contains("--continuation-step");
    if (argc > 1 && !controller_continuation) {
      throw std::invalid_argument(
          "usage: eom_stationary_joint_frontier_fixture_cli "
          "[--controller-continuation END_TIME [--prefix-step-scale SCALE] "
          "[--continuation-step STEP] [--trajectory] [--checkpoint-in PATH] "
          "[--checkpoint-out PATH] [--candidate-out PATH]]");
    }
    std::optional<eom::NativeEvolutionCheckpoint> checkpoint;
    if (options.contains("--checkpoint-in")) {
      checkpoint = eom::read_native_evolution_checkpoint(options.at("--checkpoint-in"));
    }
    const std::string target_token = controller_continuation
        ? options.at("--controller-continuation") : "";
    if (controller_continuation) {
      std::size_t consumed = 0;
      const double target = std::stod(target_token, &consumed);
      if (consumed != target_token.size() || !std::isfinite(target) ||
          target <= std::stod(checkpoint ? checkpoint->accepted_time : kFrontierStart)) {
        throw std::invalid_argument("continuation target must follow prefix");
      }
    }
    std::string continuation_step = "0.005";
    if (refine_continuation) {
      std::size_t consumed = 0;
      const auto& step_token = options.at("--continuation-step");
      const double step = std::stod(step_token, &consumed);
      if (consumed != step_token.size() || !std::isfinite(step) ||
          !(step > 0.0 && step <= kFrontierStep)) {
        throw std::invalid_argument("continuation step must lie in (0, 0.005]");
      }
      continuation_step = token(step);
    }
    auto validation_request = request(stationary_paths());
    if (refine_prefix) {
      std::size_t consumed = 0;
      const auto& scale_token = options.at("--prefix-step-scale");
      const double scale = std::stod(scale_token, &consumed);
      if (consumed != scale_token.size() || !std::isfinite(scale) ||
          !(scale > 0.0 && scale <= 1.0) || !(scale * 0.0025 > 0.0)) {
        throw std::invalid_argument("prefix step scale must lie in (0, 1]");
      }
      validation_request.initial_step = token(0.02 * scale);
      validation_request.minimum_step = token(0.0025 * scale);
      validation_request.maximum_step = token(0.02 * scale);
    }
    auto last_progress = std::chrono::steady_clock::now();
    validation_request.accepted_step_callback =
        [&last_progress](std::size_t step, const std::string& time) {
          const auto now = std::chrono::steady_clock::now();
          if (now - last_progress >= std::chrono::seconds(10)) {
            std::cerr << "stationary accepted_step=" << step
                      << " time=" << time << '\n' << std::flush;
            last_progress = now;
          }
        };
    eom::NativeCoupledEvolutionCertificate prefix{};
    if (checkpoint) {
      // This view comes only from the accepted checkpoint decoder. No
      // rejected candidate is converted into a resumable input.
      prefix.run_id = checkpoint->run_id;
      prefix.accepted_end_time = checkpoint->accepted_time;
      prefix.accepted_step_count = checkpoint->accepted_step_count;
      prefix.rejected_step_count = checkpoint->rejected_step_count;
      prefix.joint_histories = checkpoint->joint_histories;
      for (const auto& path : checkpoint->paths) {
        prefix.histories.push_back({path.path_id, path.history});
      }
      validation_request.run_id = checkpoint->run_id;
    } else {
      prefix = eom::evolve_native_coupled_histories(validation_request);
    }
    if (!checkpoint && (prefix.status != "completed" ||
        prefix.accepted_end_time != kFrontierStart ||
        prefix.joint_histories.size() != 2U)) {
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
    if (controller_continuation) {
      return diagnose_controller_continuation(
          validation_request, prefix, target_token, include_trajectory,
          continuation_step, checkpoint ? &*checkpoint : nullptr,
          options.contains("--checkpoint-out") ? options.at("--checkpoint-out") : "",
          options.contains("--candidate-out") ? options.at("--candidate-out") : "");
    }

    auto current_histories = prefix.histories;
    auto current_joint_histories = prefix.joint_histories;
    const auto& positive = published_path(current_histories, "positive");
    const auto& negative = published_path(current_histories, "negative");
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
    std::string certified_frontier = replay_start;
    std::size_t certified_step_count = 0U;
    std::optional<eom::NativeAtomicStepCertificate> replay;
    bool atomic_fail_closed = true;
    while (std::stod(certified_frontier) < std::stod(kFrontierTarget)) {
      const std::string replay_end = token(std::min(
          std::stod(kFrontierTarget),
          std::stod(certified_frontier) + kFrontierStep));
      validation_request.start_time = certified_frontier;
      validation_request.end_time = replay_end;
      validation_request.joint_histories = current_joint_histories;
      const auto& current_positive =
          published_path(current_histories, "positive");
      const auto& current_negative =
          published_path(current_histories, "negative");
      validation_request.paths = {
          {"positive", "0.1666666666666666666666666666666667",
           current_positive.history},
          {"negative", "-0.1666666666666666666666666666666667",
           current_negative.history},
      };
      replay = eom::certify_native_atomic_coupled_step(
          validation_request, current_histories,
          prefix.steps.size() + certified_step_count,
          certified_frontier, replay_end);
      const bool step_atomic =
          replay->status == "accepted" ||
          published_histories_unchanged(
              current_histories, replay->published_histories);
      atomic_fail_closed = atomic_fail_closed && step_atomic;
      if (!step_atomic) {
        throw std::runtime_error(
            "rejected stationary replay did not preserve atomic publication");
      }
      const eom::NativeAccelerationSnapshotCertificate* step_snapshot =
          replay->accepted_snapshot.has_value()
          ? &*replay->accepted_snapshot
          : (!replay->substeps.empty() &&
                    replay->substeps.back().endpoint_snapshot.has_value()
                ? &*replay->substeps.back().endpoint_snapshot
                : nullptr);
      const bool step_certified =
          replay->status == "accepted" &&
          certified_cross_root(
              step_snapshot, "positive", "negative") &&
          certified_cross_root(
              step_snapshot, "negative", "positive");
      if (!step_certified) break;
      certified_frontier = replay->accepted_time;
      current_histories = replay->published_histories;
      current_joint_histories = replay->published_joint_histories;
      ++certified_step_count;
    }
    if (!replay.has_value()) {
      throw std::runtime_error(
          "stationary joint frontier target did not require a replay");
    }
    const eom::NativeAccelerationSnapshotCertificate* snapshot =
        replay->accepted_snapshot.has_value()
        ? &*replay->accepted_snapshot
        : (!replay->substeps.empty() &&
                   replay->substeps.back().endpoint_snapshot.has_value()
               ? &*replay->substeps.back().endpoint_snapshot
               : nullptr);
    const bool positive_cross = certified_cross_root(
        snapshot, "positive", "negative");
    const bool negative_cross = certified_cross_root(
        snapshot, "negative", "positive");
    const bool certified =
        certified_frontier == kFrontierTarget &&
        replay->status == "accepted" && positive_cross && negative_cross;
    auto direct_request = validation_request;
    direct_request.use_certified_traversal = false;
    direct_request.start_time = certified_frontier;
    direct_request.end_time = certified_frontier;
    direct_request.joint_histories = current_joint_histories;
    direct_request.paths = {
        {"positive", "0.1666666666666666666666666666666667",
         published_path(current_histories, "positive").history},
        {"negative", "-0.1666666666666666666666666666666667",
         published_path(current_histories, "negative").history},
    };
    const auto direct_snapshot = eom::certify_native_acceleration_snapshot(
        direct_request, current_histories, certified_frontier);
    const bool direct_route_parity =
        snapshot != nullptr &&
        direct_snapshot.status == "certified_complete" &&
        same_cross_root_result(
            *snapshot, direct_snapshot, "positive", "negative") &&
        same_cross_root_result(
            *snapshot, direct_snapshot, "negative", "positive");
    validation_request.start_time = certified_frontier;
    validation_request.end_time = kNextProbeTarget;
    validation_request.joint_histories = current_joint_histories;
    const auto& probe_positive =
        published_path(current_histories, "positive");
    const auto& probe_negative =
        published_path(current_histories, "negative");
    validation_request.paths = {
        {"positive", "0.1666666666666666666666666666666667",
         probe_positive.history},
        {"negative", "-0.1666666666666666666666666666666667",
         probe_negative.history},
    };
    const auto next_probe = eom::certify_native_atomic_coupled_step(
        validation_request, current_histories,
        prefix.steps.size() + certified_step_count,
        certified_frontier, kNextProbeTarget);
    const bool next_probe_atomic =
        next_probe.status == "accepted" ||
        published_histories_unchanged(
            current_histories, next_probe.published_histories);
    const eom::NativeAccelerationSnapshotCertificate* next_probe_snapshot =
        next_probe.accepted_snapshot.has_value()
        ? &*next_probe.accepted_snapshot
        : (!next_probe.substeps.empty() &&
                   next_probe.substeps.back().endpoint_snapshot.has_value()
               ? &*next_probe.substeps.back().endpoint_snapshot
               : nullptr);
    const auto* next_positive_row = next_probe_snapshot == nullptr
        ? nullptr
        : root_row(*next_probe_snapshot, "positive", "negative");
    const auto* next_negative_row = next_probe_snapshot == nullptr
        ? nullptr
        : root_row(*next_probe_snapshot, "negative", "positive");
    const auto expected_next_row = [](const auto* row) {
      return row != nullptr &&
          row->certificate.status == "uncertified" &&
          row->certificate.failure_code ==
              "numeric_precision_limit_exhausted" &&
          row->certificate.diagnostic_detail.starts_with(
              "interior_root_not_surrounded/joint_root/"
              "root_time_budget_exceeded/") &&
          row->certificate.achieved_precision_bits == 512U &&
          row->certificate.roots.empty() &&
          !row->certificate.root_free_complement;
    };
    const bool next_probe_fail_closed =
        next_probe.status == "rejected" &&
        next_probe.failure_code == "root_completeness_not_certified" &&
        next_probe_atomic &&
        expected_next_row(next_positive_row) &&
        expected_next_row(next_negative_row);
    const auto& first_joint = prefix.joint_histories.begin()->second;

    std::cout << std::setprecision(17)
              << "{\"schema\":"
                 "\"eom_stationary_joint_frontier_fixture/v4\""
              << ",\"fixture_scope\":\"validation_only\""
              << ",\"campaign_1_enabled\":false"
              << ",\"field_speed\":\"1\""
              << ",\"root_tolerance\":\"1e-5\""
              << ",\"prefix_minimum_step\":\"0.0025\""
              << ",\"prefix_maximum_step\":\"0.02\""
              << ",\"frontier_start\":";
    print_json_string(kFrontierStart);
    std::cout << ",\"frontier_target\":";
    print_json_string(kFrontierTarget);
    std::cout << ",\"certified_frontier_end\":";
    print_json_string(certified_frontier);
    std::cout << ",\"certified_frontier_step\":\"0.005\""
              << ",\"certified_frontier_step_count\":"
              << certified_step_count;
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
              << ",\"certified_joint_history_path_count\":"
              << current_joint_histories.size()
              << ",\"traversal_pair_selection_route\":";
    print_json_string(
        snapshot == nullptr ? "" : snapshot->pair_selection_route);
    std::cout << ",\"direct_pair_selection_route\":";
    print_json_string(direct_snapshot.pair_selection_route);
    std::cout << ",\"direct_route_exact_token_parity\":"
              << (direct_route_parity ? "true" : "false")
              << ",\"replay_status\":";
    print_json_string(replay->status);
    std::cout << ",\"replay_failure\":";
    print_json_string(replay->failure_code);
    std::cout << ",\"replay_attempted_end\":";
    print_json_string(replay->attempted_end);
    std::cout << ",\"next_probe_target\":";
    print_json_string(kNextProbeTarget);
    std::cout << ",\"next_probe_status\":";
    print_json_string(next_probe.status);
    std::cout << ",\"next_probe_failure\":";
    print_json_string(next_probe.failure_code);
    std::cout << ",\"next_probe_atomic_fail_closed\":"
              << (next_probe_atomic ? "true" : "false")
              << ",\"next_probe_result\":";
    print_json_string(
        next_probe_fail_closed ? "fail_closed" : "unexpected_result");
    std::cout << ",\"next_probe_fail_closed_row\":";
    print_json_string(
        next_probe_fail_closed
            ? "stationary_rest_r0_joint_frontier_next_uncertified_v4"
            : "");
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
    std::cout << "],\"next_probe_cross_roots\":[";
    print_root_row(next_probe_snapshot, "positive", "negative");
    std::cout << ',';
    print_root_row(next_probe_snapshot, "negative", "positive");
    std::cout << "]}\n";
    return certified && direct_route_parity && next_probe_fail_closed ? 0 : 2;
  } catch (const std::exception& error) {
    std::cerr << "stationary joint frontier fixture error: "
              << error.what() << '\n';
    return 1;
  }
}
