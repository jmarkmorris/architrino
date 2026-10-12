#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/Checkpoint.hpp"
#include "architrino/eom/History.hpp"
#include "architrino/eom/JointAffineHistory.hpp"

#include <array>
#include <chrono>
#include <cmath>
#include <cstdint>
#include <filesystem>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <limits>
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
// v5: kFrontierStart is the required minimum accepted reach.  kFrontierTarget
// only bounds the natural-frontier diagnostic; no exact failure time is required.
constexpr const char* kFrontierStart = "1.2399999999999993";
constexpr const char* kFrontierTarget = "1.394999999999996";
constexpr double kFrontierStep = 0.005;
constexpr const char* kPositiveCharge = "0.1666666666666666666666666666666667";
constexpr const char* kNegativeCharge = "-0.1666666666666666666666666666666667";

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


// ---- v5 publication-invariance comparison --------------------------------
// A canonical serialization of the complete retained carrier.  Doubles are
// written with seventeen significant digits, which distinguishes distinct
// binary64 values; every string or number written counts as one leaf.
struct Canon {
  std::ostringstream stream;
  std::size_t leaves = 0;
};

template <typename Value>
void canon_value(Canon& canon, const Value& value) {
  if constexpr (std::is_same_v<Value, std::string>) {
    write_json_string(canon.stream, value);
    ++canon.leaves;
  } else if constexpr (std::is_same_v<Value, double>) {
    write_json_string(canon.stream, token(value));
    ++canon.leaves;
  } else {
    canon.stream << '[';
    for (const auto& item : value) {
      canon_value(canon, item);
      canon.stream << ',';
    }
    canon.stream << ']';
  }
}

std::size_t canon_ordinary(Canon& canon, const eom::NativePublishedPath& path) {
  canon_value(canon, path.path_id);
  canon_value(canon, path.history.history_id());
  canon_value(canon, path.history.provenance_fingerprint());
  std::size_t segments = 0;
  for (const auto& segment : path.history.segments()) {
    canon_value(canon, segment.t_start_token());
    canon_value(canon, segment.t_end_token());
    canon_value(canon, segment.coefficient_tokens());
    canon_value(canon, segment.position_error_tokens());
    canon_value(canon, segment.velocity_error_tokens());
    canon.stream << ';';
    ++segments;
  }
  return segments;
}

struct JointCounts {
  std::size_t segments = 0;
  std::size_t symbols = 0;
  std::size_t overrides = 0;
};

JointCounts canon_joint(
    Canon& canon, const std::string& map_id,
    const eom::JointAffineRetainedHistory& history) {
  JointCounts counts;
  canon_value(canon, map_id);
  canon_value(canon, history.path_id());
  canon_value(canon, history.provenance_fingerprint());
  canon_value(canon, history.symbol_registry());
  counts.symbols = history.symbol_registry().size();
  for (const auto& segment : history.segments()) {
    canon_value(canon, segment.start_time);
    canon_value(canon, segment.end_time);
    canon_value(canon, segment.position_coefficients);
    canon_value(canon, segment.position_remainder_radii);
    canon_value(canon, segment.velocity_remainder_radii);
    canon.stream << ';';
    ++counts.segments;
  }
  if (history.endpoint_override()) {
    const auto& endpoint = *history.endpoint_override();
    canon.stream << "override:";
    canon_value(canon, endpoint.time);
    canon_value(canon, endpoint.position_shared_symbol_coefficients);
    canon_value(canon, endpoint.velocity_shared_symbol_coefficients);
    canon_value(canon, endpoint.position_remainder_radii);
    canon_value(canon, endpoint.velocity_remainder_radii);
    counts.overrides = 1;
  } else {
    canon.stream << "override:null";
  }
  return counts;
}

std::string fnv1a64(const std::string& text) {
  std::uint64_t hash = 14695981039346656037ULL;
  for (const unsigned char character : text) {
    hash ^= character;
    hash *= 1099511628211ULL;
  }
  std::ostringstream stream;
  stream << "fnv1a64:" << std::hex << std::setw(16) << std::setfill('0')
         << hash;
  return stream.str();
}

struct CarrierComparison {
  bool equal = false;
  std::size_t paths = 0;
  std::size_t segments = 0;
  std::size_t leaves = 0;
  std::size_t symbols = 0;
  std::size_t overrides = 0;
  std::string preimage_digest;
  std::string returned_digest;
};

// Compares every field of the returned ordinary histories with a preimage
// that was copied before the solver call.  Not a fingerprint-only test.
CarrierComparison compare_ordinary(
    const std::vector<eom::NativePublishedPath>& preimage,
    const std::vector<eom::NativePublishedPath>& returned) {
  CarrierComparison result;
  bool equal = !preimage.empty() && preimage.size() == returned.size();
  std::string left;
  std::string right;
  for (const auto& expected : preimage) {
    Canon one;
    result.segments += canon_ordinary(one, expected);
    result.leaves += one.leaves;
    ++result.paths;
    std::size_t matches = 0;
    Canon other;
    for (const auto& candidate : returned) {
      if (candidate.path_id != expected.path_id) continue;
      if (++matches == 1U) canon_ordinary(other, candidate);
    }
    const std::string a = one.stream.str();
    const std::string b = other.stream.str();
    equal = equal && matches == 1U && a == b;
    left += a + '|';
    right += b + '|';
  }
  result.equal = equal;
  result.preimage_digest = fnv1a64(left);
  result.returned_digest = fnv1a64(right);
  return result;
}

CarrierComparison compare_joint(
    const std::map<std::string, eom::JointAffineRetainedHistory>& preimage,
    const std::map<std::string, eom::JointAffineRetainedHistory>& returned) {
  CarrierComparison result;
  bool equal = !preimage.empty() && preimage.size() == returned.size();
  std::string left;
  std::string right;
  for (const auto& [id, expected] : preimage) {
    Canon one;
    const JointCounts counts = canon_joint(one, id, expected);
    result.segments += counts.segments;
    result.symbols += counts.symbols;
    result.overrides += counts.overrides;
    result.leaves += one.leaves;
    ++result.paths;
    Canon other;
    const auto found = returned.find(id);
    if (found != returned.end()) canon_joint(other, id, found->second);
    const std::string a = one.stream.str();
    const std::string b = other.stream.str();
    equal = equal && found != returned.end() && a == b;
    left += a + '|';
    right += b + '|';
  }
  result.equal = equal;
  result.preimage_digest = fnv1a64(left);
  result.returned_digest = fnv1a64(right);
  return result;
}

void print_comparison(const CarrierComparison& comparison) {
  std::cout << "{\"equal\":" << (comparison.equal ? "true" : "false")
            << ",\"paths_compared\":" << comparison.paths
            << ",\"segments_compared\":" << comparison.segments
            << ",\"leaves_compared\":" << comparison.leaves
            << ",\"symbols_compared\":" << comparison.symbols
            << ",\"endpoint_overrides_compared\":" << comparison.overrides
            << ",\"preimage_digest\":";
  print_json_string(comparison.preimage_digest);
  std::cout << ",\"returned_digest\":";
  print_json_string(comparison.returned_digest);
  std::cout << '}';
}

// ---- v5.1 known cases for the two comparison functions --------------------
// Small carriers written out by hand.  They are compared before either
// function sees an evolved history, and the fixture refuses to continue if a
// control fails.
eom::RetainedHistory control_ordinary_history(
    const std::string& position, const std::string& position_error) {
  std::vector<eom::CubicHistorySegment> segments;
  for (int index = 0; index < 2; ++index) {
    eom::CubicCoefficientTokens coefficients{};
    coefficients[0] = {position, "0", "0", "0"};
    coefficients[1] = {"0", "0", "0", "0"};
    coefficients[2] = {"0", "0", "0", "0"};
    segments.emplace_back(
        index == 0 ? "-1" : "-0.5", index == 0 ? "-0.5" : "0", coefficients,
        position_error, "1e-14");
  }
  return eom::RetainedHistory("comparator-control", std::move(segments));
}

eom::JointAffineRetainedHistory control_joint_history(
    double coefficient, double radius) {
  std::vector<eom::JointAffineCubicSegment> segments(2U);
  for (std::size_t index = 0; index < 2U; ++index) {
    auto& segment = segments[index];
    segment.start_time = index == 0U ? -1.0 : -0.5;
    segment.end_time = index == 0U ? -0.5 : 0.0;
    for (auto& axis : segment.position_coefficients) {
      for (auto& row : axis) row.assign(2U, 0.0);
    }
    segment.position_coefficients[0][0] = {coefficient, 0.0};
    segment.position_remainder_radii = {radius, 0.0, 0.0};
    segment.velocity_remainder_radii = {0.0, 0.0, 0.0};
  }
  return eom::JointAffineRetainedHistory(
      "comparator-control", {"s0", "s1"}, std::move(segments));
}

struct ComparatorKnownCases {
  bool ordinary_equal_copy = false;
  bool ordinary_coefficient_detected = false;
  bool ordinary_error_radius_detected = false;
  bool joint_equal_copy = false;
  bool joint_coefficient_detected = false;
  bool joint_radius_one_ulp_detected = false;
  [[nodiscard]] bool passed() const {
    return ordinary_equal_copy && ordinary_coefficient_detected &&
        ordinary_error_radius_detected && joint_equal_copy &&
        joint_coefficient_detected && joint_radius_one_ulp_detected;
  }
};

ComparatorKnownCases comparator_known_cases() {
  ComparatorKnownCases result;
  const auto ordinary = [](const std::string& position,
                           const std::string& position_error) {
    return std::vector<eom::NativePublishedPath>{eom::NativePublishedPath{
        "control", control_ordinary_history(position, position_error)}};
  };
  const auto ordinary_base = ordinary("0.5", "1e-14");
  result.ordinary_equal_copy =
      compare_ordinary(ordinary_base, ordinary("0.5", "1e-14")).equal;
  result.ordinary_coefficient_detected =
      !compare_ordinary(ordinary_base, ordinary("0.25", "1e-14")).equal;
  result.ordinary_error_radius_detected =
      !compare_ordinary(ordinary_base, ordinary("0.5", "2e-14")).equal;
  const auto joint = [](double coefficient, double radius) {
    std::map<std::string, eom::JointAffineRetainedHistory> carriers;
    carriers.emplace("control", control_joint_history(coefficient, radius));
    return carriers;
  };
  const double radius = 1e-8;
  const auto joint_base = joint(1e-7, radius);
  result.joint_equal_copy =
      compare_joint(joint_base, joint(1e-7, radius)).equal;
  result.joint_coefficient_detected =
      !compare_joint(joint_base, joint(2e-7, radius)).equal;
  result.joint_radius_one_ulp_detected = !compare_joint(
      joint_base,
      joint(1e-7, std::nextafter(
                      radius, std::numeric_limits<double>::infinity())))
      .equal;
  return result;
}

void print_interval_vector(const eom::IntervalVector& value) {
  std::cout << '[';
  for (std::size_t axis = 0; axis < value.size(); ++axis) {
    if (axis) std::cout << ',';
    std::cout << '[' << value[axis].lower() << ',' << value[axis].upper()
              << ']';
  }
  std::cout << ']';
}

void print_request_controls(const eom::NativeCoupledEvolutionRequest& request) {
  std::cout << '{';
  bool first = true;
  for (const auto& [name, value] : std::array{
           std::pair{"root_tolerance", &request.root_tolerance},
           std::pair{"position_tolerance", &request.position_tolerance},
           std::pair{"velocity_tolerance", &request.velocity_tolerance},
           std::pair{"correction_tolerance", &request.correction_tolerance},
           std::pair{"acceleration_tolerance", &request.acceleration_tolerance},
           std::pair{"transmitter_factor_floor", &request.transmitter_factor_floor},
           std::pair{"coupling", &request.coupling},
           std::pair{"field_speed", &request.field_speed},
           std::pair{"chart_policy", &request.chart_policy},
           std::pair{"causal_width", &request.causal_width},
           std::pair{"core_scale", &request.core_scale},
           std::pair{"quadrature_tolerance", &request.quadrature_tolerance},
           std::pair{"event_impulse_tolerance", &request.event_impulse_tolerance},
           std::pair{"regulator_convergence_tolerance",
                     &request.regulator_convergence_tolerance}}) {
    if (!first) std::cout << ',';
    first = false;
    print_json_string(name);
    std::cout << ':';
    print_json_string(*value);
  }
  std::cout << ",\"root_max_depth\":" << request.root_max_depth
            << ",\"root_max_cells\":" << request.root_max_cells
            << ",\"quadrature_max_depth\":" << request.quadrature_max_depth
            << ",\"quadrature_max_cells\":" << request.quadrature_max_cells
            << ",\"event_max_depth\":" << request.event_max_depth
            << ",\"event_max_cells\":" << request.event_max_cells
            << ",\"initial_mpfr_bits\":" << request.initial_mpfr_bits
            << ",\"maximum_mpfr_bits\":" << request.maximum_mpfr_bits
            << ",\"max_correction_iterations\":"
            << request.max_correction_iterations
            << ",\"thread_count\":" << request.thread_count << '}';
}

// All four ordered pairs, self-pairs included: each present exactly once,
// certified complete with a root-free complement; one root per cross pair
// and none per self-pair.
bool complete_pair_accounting(
    const eom::NativeAccelerationSnapshotCertificate* snapshot) {
  if (snapshot == nullptr || snapshot->status != "certified_complete" ||
      snapshot->root_certificates.size() != 4U) {
    return false;
  }
  for (const std::string receiver : {"positive", "negative"}) {
    for (const std::string transmitter : {"positive", "negative"}) {
      std::size_t matches = 0;
      for (const auto& row : snapshot->root_certificates) {
        if (row.receiver_path_id != receiver ||
            row.transmitter_path_id != transmitter) {
          continue;
        }
        ++matches;
        const auto& certificate = row.certificate;
        if (certificate.status != "certified_complete" ||
            !certificate.root_free_complement ||
            certificate.roots.size() !=
                (receiver == transmitter ? 0U : 1U)) {
          return false;
        }
      }
      if (matches != 1U) return false;
    }
  }
  return true;
}

std::vector<eom::NativeCoupledPathInput> path_inputs(
    const std::vector<eom::NativePublishedPath>& histories) {
  return {
      {"positive", kPositiveCharge, published_path(histories, "positive").history},
      {"negative", kNegativeCharge, published_path(histories, "negative").history},
  };
}

// Diagnostic use of the production controller's existing boundary lift.
// Its request semantics are unchanged by the v5 no-argument record.
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
          "stationary joint prefix did not reach the required minimum reach: " +
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

    // ---- v5 no-argument record ---------------------------------------------
    // (1) Positive obligation: the prefix reaches the required minimum reach
    //     with complete pair accounting, the consumed and the recertified
    //     acceleration, both retained carriers, and a second pair-selection
    //     route on the same accepted endpoint.
    // (2) Negative obligation: one deliberately constructed request, differing
    //     only in a root tolerance derived from the accepted input, is refused
    //     and leaves the ordinary and the joint carrier exactly unchanged.
    // (3) Diagnostic only: where fixed replay steps stop being certified.
    // Known cases first: the comparison functions are exercised on
    // hand-written carriers before they see any evolved history.
    const ComparatorKnownCases comparator_controls = comparator_known_cases();
    if (!comparator_controls.passed()) {
      throw std::runtime_error(
          "carrier comparison known cases failed before first target use");
    }
    const std::string reach = kFrontierStart;
    const auto prefix_request = validation_request;
    // Deep copies taken before any further solver call; these are the
    // preimages every later comparison uses.
    const std::vector<eom::NativePublishedPath> preimage_histories =
        prefix.histories;
    const std::map<std::string, eom::JointAffineRetainedHistory>
        preimage_joint = prefix.joint_histories;
    if (prefix.steps.empty()) {
      throw std::runtime_error("stationary prefix carries no step record");
    }
    const auto& final_step = prefix.steps.back();
    const eom::NativeAccelerationSnapshotCertificate* recertified =
        final_step.accepted_snapshot.has_value()
        ? &*final_step.accepted_snapshot : nullptr;
    const eom::NativeAccelerationSnapshotCertificate* consumed = nullptr;
    for (auto substep = final_step.substeps.rbegin();
         substep != final_step.substeps.rend(); ++substep) {
      if (substep->endpoint_snapshot.has_value() &&
          std::stod(substep->endpoint_snapshot->reception_time) ==
              std::stod(reach)) {
        consumed = &*substep->endpoint_snapshot;
        break;
      }
    }

    auto direct_request = prefix_request;
    direct_request.use_certified_traversal = false;
    direct_request.start_time = reach;
    direct_request.end_time = reach;
    direct_request.joint_histories = prefix.joint_histories;
    direct_request.paths = path_inputs(prefix.histories);
    const auto direct_snapshot = eom::certify_native_acceleration_snapshot(
        direct_request, prefix.histories, reach);
    bool direct_parity = recertified != nullptr &&
        direct_snapshot.status == "certified_complete";
    for (const std::string receiver : {"positive", "negative"}) {
      for (const std::string transmitter : {"positive", "negative"}) {
        direct_parity = direct_parity &&
            same_cross_root_result(
                *recertified, direct_snapshot, receiver, transmitter);
      }
    }

    bool carriers_end_at_reach = prefix.histories.size() == 2U &&
        prefix.joint_histories.size() == 2U;
    for (const auto& path : prefix.histories) {
      carriers_end_at_reach = carriers_end_at_reach &&
          !path.history.segments().empty() &&
          std::stod(path.history.segments().back().t_end_token()) ==
              std::stod(reach);
      const auto joint = prefix.joint_histories.find(path.path_id);
      carriers_end_at_reach = carriers_end_at_reach &&
          joint != prefix.joint_histories.end() &&
          !joint->second.segments().empty() &&
          joint->second.segments().back().end_time == std::stod(reach);
    }
    const bool final_publication_matches =
        compare_ordinary(final_step.published_histories, prefix.histories)
            .equal &&
        compare_joint(final_step.published_joint_histories,
                      prefix.joint_histories).equal;
    const bool positive_passed =
        prefix.status == "completed" && prefix.accepted_end_time == reach &&
        prefix.all_steps_atomic && final_step.status == "accepted" &&
        final_step.accepted_time == reach &&
        complete_pair_accounting(consumed) &&
        complete_pair_accounting(recertified) &&
        complete_pair_accounting(&direct_snapshot) &&
        consumed->acceleration.status == "certified_complete" &&
        recertified->acceleration.status == "certified_complete" &&
        consumed->acceleration.receiver_totals.size() == 2U &&
        recertified->acceleration.receiver_totals.size() == 2U &&
        recertified->logical_ordered_pairs == 4U &&
        carriers_end_at_reach && final_publication_matches && direct_parity;

    // ---- negative control ----------------------------------------------------
    // The root-time budget certifies only when its computed width is at most
    // the root tolerance, and that width is at least
    // 2 * (receiver independent remainder radius on the line of sight) /
    // (transmitter-factor floor), with the floor below 2 at sub-wake speed.
    // A tolerance of one quarter of the smaller receiver radius therefore
    // cannot be met from this accepted input.  Nothing else is changed.
    std::vector<std::pair<std::string, double>> receiver_radii;
    double smallest_radius = std::numeric_limits<double>::infinity();
    for (const auto& path : preimage_histories) {
      const auto state = path.history.endpoint_state_hull();
      std::array<double, 3> position_radii{};
      std::array<double, 3> velocity_radii{};
      for (std::size_t axis = 0; axis < 3U; ++axis) {
        position_radii[axis] = std::nextafter(
            0.5 * (state.position[axis].upper() - state.position[axis].lower()),
            std::numeric_limits<double>::infinity());
        velocity_radii[axis] = std::nextafter(
            0.5 * (state.velocity[axis].upper() - state.velocity[axis].lower()),
            std::numeric_limits<double>::infinity());
      }
      const auto evaluation = preimage_joint.at(path.path_id).evaluate(
          std::stod(reach), position_radii, velocity_radii);
      const double radius = evaluation.position.independent_remainder_radii[0];
      receiver_radii.emplace_back(path.path_id, radius);
      smallest_radius = std::min(smallest_radius, radius);
    }
    // Hypotheses of the width bound, checked on the accepted input: a
    // positive receiver radius, a line of sight within sixty degrees of the
    // x axis for every admissible emission point, and transmitters below
    // wake speed over the whole retained history (so the factor floor is
    // below 2).  If one fails the control does not apply; that is a
    // fixture-maintenance condition and not by itself a solver regression.
    const bool receiver_radius_positive =
        std::isfinite(smallest_radius) && smallest_radius > 0.0;
    bool line_of_sight_dominant = true;
    bool transmitters_subwake = true;
    for (const auto& [receiver, transmitter] : std::array{
             std::pair<std::string, std::string>{"positive", "negative"},
             std::pair<std::string, std::string>{"negative", "positive"}}) {
      const auto receiver_state =
          published_path(preimage_histories, receiver)
              .history.endpoint_state_hull();
      const auto& source = published_path(preimage_histories, transmitter)
          .history;
      const auto& source_hull = source.full_position_hull();
      const double axial_lower = std::max(
          receiver_state.position[0].lower() - source_hull[0].upper(),
          source_hull[0].lower() - receiver_state.position[0].upper());
      double transverse_squared_upper = 0.0;
      for (std::size_t axis = 1; axis < 3U; ++axis) {
        const double gap = std::max(
            std::abs(receiver_state.position[axis].upper() -
                     source_hull[axis].lower()),
            std::abs(receiver_state.position[axis].lower() -
                     source_hull[axis].upper()));
        transverse_squared_upper += gap * gap;
      }
      // |d_x| / |d| >= 1/2 exactly when transverse^2 <= 3 d_x^2.
      line_of_sight_dominant = line_of_sight_dominant && axial_lower > 0.0 &&
          transverse_squared_upper <= 2.99 * axial_lower * axial_lower;
      const eom::Interval retained(
          std::stod(source.segments().front().t_start_token()),
          std::stod(reach));
      const auto velocity = source.velocity_hull(retained);
      double speed_squared_upper = 0.0;
      for (std::size_t axis = 0; axis < 3U; ++axis) {
        const double magnitude = std::max(
            std::abs(velocity[axis].lower()), std::abs(velocity[axis].upper()));
        speed_squared_upper += magnitude * magnitude;
      }
      transmitters_subwake = transmitters_subwake && speed_squared_upper < 0.99;
    }
    if (!receiver_radius_positive || !line_of_sight_dominant ||
        !transmitters_subwake) {
      throw std::runtime_error(
          "rejection control not applicable to this accepted input (radius, "
          "line-of-sight or sub-wake hypothesis); a fixture-maintenance "
          "condition, not by itself a solver regression");
    }
    auto negative_request = prefix_request;
    negative_request.root_tolerance = token(smallest_radius / 4.0);
    const std::string negative_end = token(std::stod(reach) + kFrontierStep);
    negative_request.start_time = reach;
    negative_request.end_time = negative_end;
    negative_request.joint_histories = prefix.joint_histories;
    negative_request.paths = path_inputs(prefix.histories);
    const auto negative = eom::certify_native_atomic_coupled_step(
        negative_request, prefix.histories, prefix.steps.size(), reach,
        negative_end);
    const FailedSnapshot negative_failed = failed_snapshot(negative);
    const CarrierComparison ordinary_invariance =
        compare_ordinary(preimage_histories, negative.published_histories);
    const CarrierComparison joint_invariance =
        compare_joint(preimage_joint, negative.published_joint_histories);
    bool path_ids_unchanged =
        negative.published_histories.size() == preimage_histories.size();
    for (std::size_t index = 0;
         path_ids_unchanged && index < preimage_histories.size(); ++index) {
      path_ids_unchanged = negative.published_histories[index].path_id ==
          preimage_histories[index].path_id;
    }
    bool input_fingerprints_match =
        negative.input_history_fingerprints.size() ==
            preimage_histories.size() &&
        negative.input_joint_history_fingerprints.size() ==
            preimage_joint.size();
    for (const auto& input : negative.input_history_fingerprints) {
      bool found = false;
      for (const auto& path : preimage_histories) {
        found = found || (path.path_id == input.path_id &&
            path.history.provenance_fingerprint() == input.fingerprint);
      }
      input_fingerprints_match = input_fingerprints_match && found;
    }
    for (const auto& input : negative.input_joint_history_fingerprints) {
      const auto found = preimage_joint.find(input.path_id);
      input_fingerprints_match = input_fingerprints_match &&
          found != preimage_joint.end() &&
          found->second.provenance_fingerprint() == input.fingerprint;
    }
    // Known-failure controls for the comparison itself.
    const bool cross_path_ordinary_detected = !compare_ordinary(
        {eom::NativePublishedPath{
            "positive", published_path(preimage_histories, "positive").history}},
        {eom::NativePublishedPath{
            "positive", published_path(preimage_histories, "negative").history}})
        .equal;
    std::map<std::string, eom::JointAffineRetainedHistory> joint_left;
    std::map<std::string, eom::JointAffineRetainedHistory> joint_right;
    joint_left.emplace("positive", preimage_joint.at("positive"));
    joint_right.emplace("positive", preimage_joint.at("negative"));
    const bool cross_path_joint_detected =
        !compare_joint(joint_left, joint_right).equal;
    std::string perturbed_joint_radius = "constructor_rejected";
    try {
      const auto& original = preimage_joint.at("positive");
      auto segments = original.segments();
      if (segments.empty()) throw std::runtime_error("no joint segment");
      auto& radius = segments.back().position_remainder_radii[0];
      radius = std::nextafter(
          radius, std::numeric_limits<double>::infinity());
      const eom::JointAffineRetainedHistory mutated(
          original.path_id(), original.symbol_registry(), std::move(segments),
          original.endpoint_override());
      std::map<std::string, eom::JointAffineRetainedHistory> one_ulp;
      one_ulp.emplace("positive", mutated);
      perturbed_joint_radius =
          compare_joint(joint_left, one_ulp).equal ? "not_detected" : "detected";
    } catch (const std::exception&) {
      perturbed_joint_radius = "constructor_rejected";
    }
    bool negative_cross_rows_refused = negative_failed.snapshot != nullptr;
    for (const auto& [receiver, transmitter] : std::array{
             std::pair<std::string, std::string>{"positive", "negative"},
             std::pair<std::string, std::string>{"negative", "positive"}}) {
      const auto* row = negative_failed.snapshot == nullptr
          ? nullptr
          : root_row(*negative_failed.snapshot, receiver, transmitter);
      negative_cross_rows_refused = negative_cross_rows_refused &&
          row != nullptr &&
          row->certificate.status != "certified_complete" &&
          row->certificate.roots.empty() &&
          !row->certificate.root_free_complement &&
          row->certificate.diagnostic_detail.find(
              "root_time_budget_exceeded") != std::string::npos;
    }
    const bool negative_passed =
        negative.status == "rejected" &&
        negative.failure_code == "root_completeness_not_certified" &&
        negative.accepted_time == reach && negative_cross_rows_refused &&
        ordinary_invariance.equal && joint_invariance.equal &&
        ordinary_invariance.paths == 2U && joint_invariance.paths == 2U &&
        ordinary_invariance.segments > 0U && joint_invariance.segments > 0U &&
        ordinary_invariance.leaves > 0U && joint_invariance.leaves > 0U &&
        joint_invariance.symbols > 0U &&
        path_ids_unchanged && input_fingerprints_match &&
        cross_path_ordinary_detected && cross_path_joint_detected &&
        perturbed_joint_radius == "detected";

    // ---- natural-frontier diagnostic (not an obligation) --------------------
    auto current_histories = prefix.histories;
    auto current_joint_histories = prefix.joint_histories;
    std::string certified_frontier = reach;
    std::size_t certified_step_count = 0U;
    std::optional<eom::NativeAtomicStepCertificate> replay;
    bool natural_rejections_atomic = true;
    while (std::stod(certified_frontier) < std::stod(kFrontierTarget)) {
      const std::string replay_end = token(std::min(
          std::stod(kFrontierTarget),
          std::stod(certified_frontier) + kFrontierStep));
      validation_request.start_time = certified_frontier;
      validation_request.end_time = replay_end;
      validation_request.joint_histories = current_joint_histories;
      validation_request.paths = path_inputs(current_histories);
      replay = eom::certify_native_atomic_coupled_step(
          validation_request, current_histories,
          prefix.steps.size() + certified_step_count,
          certified_frontier, replay_end);
      if (replay->status != "accepted") {
        natural_rejections_atomic = natural_rejections_atomic &&
            compare_ordinary(current_histories, replay->published_histories)
                .equal &&
            compare_joint(current_joint_histories,
                          replay->published_joint_histories).equal;
        break;
      }
      const eom::NativeAccelerationSnapshotCertificate* step_snapshot =
          replay->accepted_snapshot.has_value()
          ? &*replay->accepted_snapshot : nullptr;
      if (!certified_cross_root(step_snapshot, "positive", "negative") ||
          !certified_cross_root(step_snapshot, "negative", "positive")) {
        break;
      }
      certified_frontier = replay->accepted_time;
      current_histories = replay->published_histories;
      current_joint_histories = replay->published_joint_histories;
      ++certified_step_count;
    }
    const FailedSnapshot natural_failed = replay.has_value()
        ? failed_snapshot(*replay) : FailedSnapshot{};

    // ---- record ------------------------------------------------------------
    std::cout << std::setprecision(17)
              << "{\"schema\":\"eom_stationary_joint_frontier_fixture/v5\""
              << ",\"fixture_scope\":\"validation_only\""
              << ",\"campaign_1_enabled\":false"
              << ",\"field_speed\":";
    print_json_string(prefix_request.field_speed);
    std::cout << ",\"record_scope\":\"minimum accepted reach and one derived "
                 "rejection control; the natural frontier is diagnostic; no "
                 "physical-trajectory or generated-history-inclusion claim\""
              << ",\"record_revision\":\"v5.1\""
              << ",\"comparator_known_cases\":{"
                 "\"ran_before_first_target_use\":true"
              << ",\"ordinary_equal_copy\":"
              << (comparator_controls.ordinary_equal_copy ? "true" : "false")
              << ",\"ordinary_coefficient_detected\":"
              << (comparator_controls.ordinary_coefficient_detected
                      ? "true" : "false")
              << ",\"ordinary_error_radius_detected\":"
              << (comparator_controls.ordinary_error_radius_detected
                      ? "true" : "false")
              << ",\"joint_equal_copy\":"
              << (comparator_controls.joint_equal_copy ? "true" : "false")
              << ",\"joint_coefficient_detected\":"
              << (comparator_controls.joint_coefficient_detected
                      ? "true" : "false")
              << ",\"joint_radius_one_ulp_detected\":"
              << (comparator_controls.joint_radius_one_ulp_detected
                      ? "true" : "false")
              << ",\"passed\":true}"
              << ",\"minimum_reach\":";
    print_json_string(reach);
    std::cout << ",\"model_fingerprint\":";
    print_json_string(eom::native_evolution_model_fingerprint(prefix_request));
    std::cout << ",\"prefix_step_controls\":{\"initial_step\":";
    print_json_string(prefix_request.initial_step);
    std::cout << ",\"minimum_step\":";
    print_json_string(prefix_request.minimum_step);
    std::cout << ",\"maximum_step\":";
    print_json_string(prefix_request.maximum_step);
    std::cout << "},\"request_controls\":";
    print_request_controls(prefix_request);

    std::cout << ",\"positive\":{\"prefix_status\":";
    print_json_string(prefix.status);
    std::cout << ",\"prefix_halt_code\":";
    print_json_string(prefix.halt_code);
    std::cout << ",\"prefix_accepted_end\":";
    print_json_string(prefix.accepted_end_time);
    std::cout << ",\"prefix_accepted_steps\":" << prefix.accepted_step_count
              << ",\"prefix_rejected_steps\":" << prefix.rejected_step_count
              << ",\"prefix_all_steps_atomic\":"
              << (prefix.all_steps_atomic ? "true" : "false")
              << ",\"final_step_status\":";
    print_json_string(final_step.status);
    std::cout << ",\"final_step_accepted_time\":";
    print_json_string(final_step.accepted_time);
    std::cout << ",\"final_step_publication_atomic\":"
              << (final_step.publication_atomic ? "true" : "false");
    for (const auto& [name, snapshot] : std::array{
             std::pair<const char*,
                       const eom::NativeAccelerationSnapshotCertificate*>{
                 "consumed", consumed},
             std::pair<const char*,
                       const eom::NativeAccelerationSnapshotCertificate*>{
                 "recertification", recertified},
             std::pair<const char*,
                       const eom::NativeAccelerationSnapshotCertificate*>{
                 "direct", &direct_snapshot}}) {
      std::cout << ",\"" << name << "_snapshot_status\":";
      print_json_string(snapshot == nullptr ? "" : snapshot->status);
      std::cout << ",\"" << name << "_snapshot_reception_time\":";
      print_json_string(snapshot == nullptr ? "" : snapshot->reception_time);
      std::cout << ",\"" << name << "_pair_selection_route\":";
      print_json_string(
          snapshot == nullptr ? "" : snapshot->pair_selection_route);
      std::cout << ",\"" << name << "_pair_rows\":[";
      print_root_rows(snapshot);
      std::cout << ']';
    }
    std::cout << ",\"consumed_snapshot_role\":\"endpoint acceleration "
                 "evaluated by the accepted corrector at the reach, used for "
                 "its convergence and joint-contraction tests; not a trace of "
                 "every acceleration used to construct the candidate; the "
                 "recertification snapshot is evaluated on the published "
                 "history\"";
    std::cout << ",\"logical_ordered_pairs\":"
              << (recertified == nullptr ? 0U
                                         : recertified->logical_ordered_pairs)
              << ",\"acceleration\":{\"consumed_status\":";
    print_json_string(consumed == nullptr ? "" : consumed->acceleration.status);
    std::cout << ",\"recertification_status\":";
    print_json_string(
        recertified == nullptr ? "" : recertified->acceleration.status);
    for (const auto& [name, snapshot] : std::array{
             std::pair<const char*,
                       const eom::NativeAccelerationSnapshotCertificate*>{
                 "consumed_receiver_totals", consumed},
             std::pair<const char*,
                       const eom::NativeAccelerationSnapshotCertificate*>{
                 "recertification_receiver_totals", recertified}}) {
      std::cout << ",\"" << name << "\":[";
      if (snapshot != nullptr) {
        bool first_total = true;
        for (const auto& total : snapshot->acceleration.receiver_totals) {
          if (!first_total) std::cout << ',';
          first_total = false;
          std::cout << "{\"path_id\":";
          print_json_string(total.receiver_path_id);
          std::cout << ",\"acceleration\":";
          print_interval_vector(total.acceleration);
          std::cout << '}';
        }
      }
      std::cout << ']';
    }
    std::cout << "},\"endpoint_states\":[";
    for (std::size_t index = 0; index < prefix.histories.size(); ++index) {
      const auto& path = prefix.histories[index];
      const auto state = path.history.endpoint_state_hull();
      if (index) std::cout << ',';
      std::cout << "{\"path_id\":";
      print_json_string(path.path_id);
      std::cout << ",\"position\":";
      print_interval_vector(state.position);
      std::cout << ",\"velocity\":";
      print_interval_vector(state.velocity);
      std::cout << '}';
    }
    std::cout << "],\"transmitter_hulls_over_root_brackets\":[";
    bool first_hull = true;
    for (const auto& [receiver, transmitter] : std::array{
             std::pair<std::string, std::string>{"positive", "negative"},
             std::pair<std::string, std::string>{"negative", "positive"}}) {
      const auto* row = recertified == nullptr
          ? nullptr : root_row(*recertified, receiver, transmitter);
      if (row == nullptr || row->certificate.roots.size() != 1U) continue;
      const auto& root = row->certificate.roots.front();
      // The decimal tokens are widened outward by one binary64 step before
      // the retained history is asked for its hull over the bracket.
      const eom::Interval bracket(
          std::nextafter(std::stod(root.lower),
                         -std::numeric_limits<double>::infinity()),
          std::nextafter(std::stod(root.upper),
                         std::numeric_limits<double>::infinity()));
      const auto& source = published_path(prefix.histories, transmitter);
      if (!first_hull) std::cout << ',';
      first_hull = false;
      std::cout << "{\"receiver\":";
      print_json_string(receiver);
      std::cout << ",\"transmitter\":";
      print_json_string(transmitter);
      std::cout << ",\"root_lower\":";
      print_json_string(root.lower);
      std::cout << ",\"root_upper\":";
      print_json_string(root.upper);
      std::cout << ",\"position\":";
      print_interval_vector(source.history.position_hull(bracket));
      std::cout << ",\"velocity\":";
      print_interval_vector(source.history.velocity_hull(bracket));
      std::cout << '}';
    }
    std::cout << "],\"ordinary_histories\":[";
    for (std::size_t index = 0; index < prefix.histories.size(); ++index) {
      const auto& path = prefix.histories[index];
      if (index) std::cout << ',';
      std::cout << "{\"path_id\":";
      print_json_string(path.path_id);
      std::cout << ",\"history_id\":";
      print_json_string(path.history.history_id());
      std::cout << ",\"fingerprint\":";
      print_json_string(path.history.provenance_fingerprint());
      std::cout << ",\"segment_count\":" << path.history.segments().size()
                << ",\"first_segment_start\":";
      print_json_string(path.history.segments().front().t_start_token());
      std::cout << ",\"last_segment_end\":";
      print_json_string(path.history.segments().back().t_end_token());
      std::cout << '}';
    }
    std::cout << "],\"joint_histories\":[";
    bool first_joint_history = true;
    for (const auto& [id, history] : prefix.joint_histories) {
      if (!first_joint_history) std::cout << ',';
      first_joint_history = false;
      std::cout << "{\"path_id\":";
      print_json_string(id);
      std::cout << ",\"fingerprint\":";
      print_json_string(history.provenance_fingerprint());
      std::cout << ",\"symbol_count\":" << history.symbol_registry().size()
                << ",\"segment_count\":" << history.segments().size()
                << ",\"last_segment_end\":";
      print_json_string(token(history.segments().back().end_time));
      std::cout << ",\"has_endpoint_override\":"
                << (history.endpoint_override() ? "true" : "false") << '}';
    }
    std::cout << "],\"final_step_published_matches_certificate\":"
              << (final_publication_matches ? "true" : "false")
              << ",\"direct_traversal_all_pairs_token_parity\":"
              << (direct_parity ? "true" : "false")
              << ",\"parity_scope\":\"two pair-selection routes of the same "
                 "solver on the same accepted endpoint; not independent "
                 "scientific verification\""
              << ",\"passed\":" << (positive_passed ? "true" : "false")
              << '}';

    std::cout << ",\"negative_control\":{\"label\":"
                 "\"tightened_root_tolerance_refusal\""
              << ",\"rule\":\"root_tolerance = (smaller receiver joint "
                 "independent remainder radius on the line of sight at the "
                 "accepted endpoint) / 4; every other numerical-policy field "
                 "as in the positive request\""
              << ",\"request_scope\":\"numerical policy differs in "
                 "root_tolerance only; start, end and history inputs are "
                 "those of the next step from the accepted endpoint\""
              << ",\"failure_route_claim\":\"joint root-time budget "
                 "obstruction derived (width > radius/2 > tolerance); "
                 "whole-step refusal measured; exclusion of the ordinary "
                 "enclosure route inferred; not a theorem that no sound "
                 "certificate exists\""
              << ",\"hypotheses_checked\":{"
                 "\"receiver_radius_positive\":true"
                 ",\"line_of_sight_dominant\":true"
                 ",\"transmitters_subwake_over_retained_history\":true}"
              << ",\"receiver_remainder_radii_x\":[";
    for (std::size_t index = 0; index < receiver_radii.size(); ++index) {
      if (index) std::cout << ',';
      std::cout << "{\"path_id\":";
      print_json_string(receiver_radii[index].first);
      std::cout << ",\"radius\":";
      print_json_string(token(receiver_radii[index].second));
      std::cout << '}';
    }
    std::cout << "],\"request_controls\":";
    print_request_controls(negative_request);
    std::cout << ",\"attempted_start\":";
    print_json_string(negative.attempted_start);
    std::cout << ",\"attempted_end\":";
    print_json_string(negative.attempted_end);
    std::cout << ",\"status\":";
    print_json_string(negative.status);
    std::cout << ",\"failure_code\":";
    print_json_string(negative.failure_code);
    std::cout << ",\"accepted_time\":";
    print_json_string(negative.accepted_time);
    std::cout << ",\"publication_atomic\":"
              << (negative.publication_atomic ? "true" : "false")
              << ",\"failed_stage\":";
    print_json_string(negative_failed.stage);
    std::cout << ",\"failed_reception_time\":";
    print_json_string(negative_failed.snapshot == nullptr
                          ? "" : negative_failed.snapshot->reception_time);
    std::cout << ",\"pair_rows\":[";
    print_root_rows(negative_failed.snapshot);
    std::cout << "],\"ordinary_invariance\":";
    print_comparison(ordinary_invariance);
    std::cout << ",\"joint_invariance\":";
    print_comparison(joint_invariance);
    std::cout << ",\"path_ids_unchanged\":"
              << (path_ids_unchanged ? "true" : "false")
              << ",\"input_fingerprints_match\":"
              << (input_fingerprints_match ? "true" : "false")
              << ",\"comparator_self_test\":{\"cross_path_ordinary_detected\":"
              << (cross_path_ordinary_detected ? "true" : "false")
              << ",\"cross_path_joint_detected\":"
              << (cross_path_joint_detected ? "true" : "false")
              << ",\"perturbed_joint_radius\":";
    print_json_string(perturbed_joint_radius);
    std::cout << "},\"passed\":" << (negative_passed ? "true" : "false")
              << '}';

    std::cout << ",\"natural_frontier_diagnostic\":{\"mandatory\":false"
              << ",\"replay_step\":\"0.005\",\"replay_target\":";
    print_json_string(kFrontierTarget);
    std::cout << ",\"certified_end\":";
    print_json_string(certified_frontier);
    std::cout << ",\"certified_step_count\":" << certified_step_count
              << ",\"last_replay_status\":";
    print_json_string(replay.has_value() ? replay->status : "");
    std::cout << ",\"last_replay_failure\":";
    print_json_string(replay.has_value() ? replay->failure_code : "");
    std::cout << ",\"last_replay_attempted_end\":";
    print_json_string(replay.has_value() ? replay->attempted_end : "");
    std::cout << ",\"first_rejected_stage\":";
    print_json_string(natural_failed.snapshot == nullptr
                          ? "" : natural_failed.stage);
    std::cout << ",\"first_rejected_cross_roots\":[";
    if (natural_failed.snapshot != nullptr) {
      print_root_row(natural_failed.snapshot, "positive", "negative");
      std::cout << ',';
      print_root_row(natural_failed.snapshot, "negative", "positive");
    }
    std::cout << "],\"rejections_atomic_ordinary_and_joint\":"
              << (natural_rejections_atomic ? "true" : "false") << '}';

    const bool passed =
        positive_passed && negative_passed && natural_rejections_atomic;
    std::cout << ",\"result\":";
    print_json_string(passed ? "minimum_reach_and_rejection_control_passed"
                             : "failed");
    std::cout << "}\n";
    return passed ? 0 : 2;
  } catch (const std::exception& error) {
    std::cerr << "stationary joint frontier fixture error: "
              << error.what() << '\n';
    return 1;
  }
}
