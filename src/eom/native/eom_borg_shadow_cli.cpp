#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/Decimal.hpp"
#include "architrino/eom/DisplayEvaluation.hpp"
#include "architrino/eom/ShadowAffineDiagnostic.hpp"

#include <algorithm>
#include <array>
#include <bit>
#include <charconv>
#include <cmath>
#include <cstdlib>
#include <filesystem>
#include <iomanip>
#include <iostream>
#include <limits>
#include <map>
#include <optional>
#include <sstream>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

namespace eom = architrino::eom;

namespace {

constexpr const char* kBorgNativeProtocolMagic = "EOM_BORG_NATIVE_V10";

bool is_exact_history_storage_failure(const std::string& detail) {
  return detail.find("exact history") != std::string::npos ||
      detail.find("exact_history") != std::string::npos;
}

void print_json_number(double value) {
  if (std::isfinite(value)) {
    std::cout << value;
  } else {
    std::cout << "null";
  }
}

struct ParsedPath {
  std::string path_id;
  std::string charge;
  int state_flags;
  std::size_t input_segment_count;
  eom::RetainedHistory history;
};

struct CausalHistoryRetentionConfig {
  bool enabled = false;
  std::string policy = "none";
  std::array<std::string, 3> center_tokens{"0", "0", "0"};
  std::array<double, 3> center{};
  std::string radius_token = "0";
  double radius = 0.0;
};

struct CausalHistoryRetentionPath {
  std::string path_id;
  std::size_t retired_prefix_count = 0U;
  std::size_t retained_segment_count = 0U;
  std::string retained_coverage_start;
  std::string cleared_through_time;
};

struct CausalHistoryRetentionCertificate {
  std::vector<CausalHistoryRetentionPath> paths;
  std::size_t total_retired_segment_count = 0U;
};

double interval_component_absolute_upper(const eom::Interval& value) {
  return std::max(std::abs(value.lower()), std::abs(value.upper()));
}

double radial_upper_from_center(
    const eom::IntervalVector& position,
    const std::array<double, 3>& center) {
  std::array<double, 3> component{};
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    component[axis] = interval_component_absolute_upper(
        position[axis] - eom::Interval::point(center[axis]));
  }
  return std::nextafter(
      std::hypot(component[0], component[1], component[2]),
      std::numeric_limits<double>::infinity());
}

bool endpoint_inside_receiver_envelope(
    const eom::RetainedHistory& history,
    double time,
    const CausalHistoryRetentionConfig& retention) {
  if (!retention.enabled) return true;
  return radial_upper_from_center(
      history.position_hull(eom::Interval::point(time)), retention.center) <=
      retention.radius;
}

CausalHistoryRetentionCertificate certify_causal_history_retirement(
    const std::vector<eom::NativePublishedPath>& histories,
    const std::string& reception_time_token,
    const std::string& published_window_start_token,
    const std::string& field_speed_token,
    const CausalHistoryRetentionConfig& retention) {
  CausalHistoryRetentionCertificate certificate;
  certificate.paths.reserve(histories.size());
  const eom::Interval reception =
      eom::Interval::decimal_token(reception_time_token);
  const eom::Interval published_window_start =
      eom::Interval::decimal_token(published_window_start_token);
  const eom::Interval field_speed =
      eom::Interval::decimal_token(field_speed_token);
  if (!(field_speed.lower() > 0.0)) {
    throw std::invalid_argument(
        "causal-history retention requires positive field speed");
  }
  for (const auto& path : histories) {
    const auto& segments = path.history.segments();
    std::size_t retired = 0U;
    std::string cleared_through = segments.front().t_start_token();
    while (retired + 1U < segments.size()) {
      const auto segment_pin = segments.pin(retired);
      const auto& segment = *segment_pin;
      if (segment.t_end_interval().upper() >
          published_window_start.lower()) {
        break;
      }
      const eom::Interval emission_end = segment.t_end_interval();
      const eom::Interval wave_radius =
          field_speed * (reception - emission_end);
      const eom::Interval full_emission(
          segment.t_start_interval().lower(),
          segment.t_end_interval().upper());
      const double source_radius = radial_upper_from_center(
          segment.position_interval(full_emission), retention.center);
      const double envelope_reach = std::nextafter(
          source_radius + retention.radius,
          std::numeric_limits<double>::infinity());
      if (!(wave_radius.lower() > envelope_reach)) {
        break;
      }
      cleared_through = segment.t_end_token();
      ++retired;
    }
    certificate.total_retired_segment_count += retired;
    certificate.paths.push_back({
        .path_id = path.path_id,
        .retired_prefix_count = retired,
        .retained_segment_count = segments.size() - retired,
        .retained_coverage_start = segments.pin(retired)->t_start_token(),
        .cleared_through_time = cleared_through,
    });
  }
  return certificate;
}

std::string display_decimal_token(double value) {
  if (!std::isfinite(value)) {
    throw std::runtime_error("display_nonfinite_state");
  }
  return eom::finite_double_token(value);
}

eom::NativeCoupledEvolutionCertificate evolve_display_point_histories(
    const eom::NativeCoupledEvolutionRequest& request) {
  double current_time =
      eom::parse_finite_double(request.start_time, "display start time");
  const double requested_end =
      eom::parse_finite_double(request.end_time, "display end time");
  const double requested_step =
      eom::parse_finite_double(request.initial_step, "display initial step");
  if (!std::isfinite(current_time) || !std::isfinite(requested_end) ||
      !std::isfinite(requested_step) || !(requested_end > current_time) ||
      !(requested_step > 0.0)) {
    throw std::invalid_argument("display_invalid_evaluation_request");
  }
  std::vector<eom::NativePublishedPath> histories;
  histories.reserve(request.paths.size());
  for (const auto& path : request.paths) {
    histories.push_back({path.path_id, path.history});
  }
  std::size_t resident_segment_count = 0U;
  for (const auto& path : histories) {
    resident_segment_count +=
        path.history.segments().resident_segment_count();
  }
  const auto disk_stats = eom::history_disk_storage_stats();
  const std::size_t bounded_page_segments = disk_stats.enabled
      ? disk_stats.cached_blocks_per_thread * 64U * request.thread_count
      : 0U;
  const long double memory_estimate_wide =
      static_cast<long double>(
          resident_segment_count + bounded_page_segments +
          64U * histories.size()) *
          4096.0L +
      static_cast<long double>(histories.size()) * 65536.0L +
      static_cast<long double>(histories.size()) * histories.size() * 512.0L;
  const std::uint64_t memory_estimate_bytes = memory_estimate_wide >=
          static_cast<long double>(std::numeric_limits<std::uint64_t>::max())
      ? std::numeric_limits<std::uint64_t>::max()
      : static_cast<std::uint64_t>(std::ceil(memory_estimate_wide));
  if (memory_estimate_bytes > request.memory_budget_bytes) {
    return {
        .schema = "eom_native_display_point_evolution/v1",
        .status = "halted",
        .run_id = request.run_id,
        .start_time = request.start_time,
        .requested_end_time = request.end_time,
        .accepted_end_time = request.start_time,
        .histories = std::move(histories),
        .joint_histories = {},
        .steps = {},
        .accepted_step_count = 0U,
        .rejected_step_count = 0U,
        .controller_step_size = request.initial_step,
        .halt_code = "memory_budget_exhausted",
        .evidence_status = "failed",
        .memory_budget_bytes = request.memory_budget_bytes,
        .memory_estimate_bytes = memory_estimate_bytes,
        .all_steps_atomic = true,
        .timing = {},
    };
  }
  std::size_t accepted_steps = 0U;
  std::string current_time_token = request.start_time;
  std::string halt_code;
  while (current_time < requested_end) {
    if (accepted_steps >= request.max_step_attempts) {
      halt_code = "numeric_resource_limit_exhausted";
      break;
    }
    eom::DisplayEvaluationRequest display_request{
        .paths = {},
        .reception_time = current_time,
        .field_speed =
            eom::parse_finite_double(request.field_speed, "field speed"),
        .coupling = eom::parse_finite_double(request.coupling, "coupling"),
        .root_relative_tolerance =
            eom::parse_finite_double(
                request.root_tolerance, "root tolerance"),
        .source_normal_floor =
            eom::parse_finite_double(
                request.transmitter_factor_floor,
                "transmitter factor floor"),
        .causal_width =
            eom::parse_finite_double(request.causal_width, "causal width"),
        .core_scale =
            eom::parse_finite_double(request.core_scale, "core scale"),
        .thread_count = request.thread_count,
    };
    display_request.paths.reserve(histories.size());
    for (std::size_t index = 0U; index < histories.size(); ++index) {
      display_request.paths.push_back({
          histories[index].path_id,
          eom::parse_finite_double(
              request.paths[index].charge, "path charge"),
          &histories[index].history,
      });
    }
    const auto evaluated = eom::evaluate_display_acceleration(display_request);
    if (evaluated.status != "display_evaluated") {
      if (is_exact_history_storage_failure(evaluated.failure_code)) {
        // Storage corruption invalidates the worker-owned store. Escalate it
        // to the request boundary so the server discards that store before
        // accepting another request.
        throw std::runtime_error(evaluated.failure_code);
      }
      halt_code = evaluated.failure_code.empty()
          ? "display_invalid_evaluation_request"
          : evaluated.failure_code;
      break;
    }
    std::map<std::string, std::array<double, 3>> acceleration_by_path;
    for (const auto& receiver : evaluated.receiver_accelerations) {
      acceleration_by_path.emplace(
          receiver.receiver_path_id, receiver.acceleration);
    }
    const double end_time = std::min(requested_end, current_time + requested_step);
    const std::string end_time_token = end_time == requested_end
        ? request.end_time
        : display_decimal_token(end_time);
    std::vector<eom::NativePublishedPath> next_histories;
    next_histories.reserve(histories.size());
    for (const auto& path : histories) {
      const auto found = acceleration_by_path.find(path.path_id);
      if (found == acceleration_by_path.end()) {
        throw std::runtime_error("display_invalid_evaluation_request");
      }
      const auto position = path.history.nominal_position(current_time);
      const auto velocity = path.history.nominal_velocity(current_time);
      eom::CubicCoefficientTokens coefficients{};
      double position_scale = 1.0;
      double velocity_scale = 1.0;
      for (std::size_t axis = 0U; axis < 3U; ++axis) {
        coefficients[axis] = {
            display_decimal_token(position[axis]),
            display_decimal_token(velocity[axis]),
            display_decimal_token(0.5 * found->second[axis]),
            "0",
        };
        position_scale = std::max(position_scale, std::abs(position[axis]));
        velocity_scale = std::max(velocity_scale, std::abs(velocity[axis]));
      }
      const double position_storage_radius =
          path.history.segments().back().position_error() +
          64.0 * std::numeric_limits<double>::epsilon() * position_scale;
      const double velocity_storage_radius =
          path.history.segments().back().velocity_error() +
          64.0 * std::numeric_limits<double>::epsilon() * velocity_scale;
      eom::CubicHistorySegment candidate(
          current_time_token,
          end_time_token,
          std::move(coefficients),
          display_decimal_token(position_storage_radius),
          display_decimal_token(velocity_storage_radius));
      next_histories.push_back({
          path.path_id, path.history.appended(std::move(candidate))});
    }
    histories = std::move(next_histories);
    current_time = end_time;
    current_time_token = end_time_token;
    ++accepted_steps;
  }
  const bool completed = current_time_token == request.end_time;
  return {
      .schema = "eom_native_display_point_evolution/v1",
      .status = completed ? "completed" : "halted",
      .run_id = request.run_id,
      .start_time = request.start_time,
      .requested_end_time = request.end_time,
      .accepted_end_time = current_time_token,
      .histories = std::move(histories),
      .joint_histories = {},
      .steps = {},
      .accepted_step_count = accepted_steps,
      .rejected_step_count = completed ? 0U : 1U,
      .controller_step_size = request.initial_step,
      .halt_code = completed ? "" : halt_code,
      .evidence_status = completed ? "display-only" : "failed",
      .memory_budget_bytes = request.memory_budget_bytes,
      .memory_estimate_bytes = memory_estimate_bytes,
      .all_steps_atomic = true,
      .timing = {},
  };
}

struct IncrementalSnapshotCache {
  std::string model_key;
  std::optional<eom::NativeAccelerationSnapshotCertificate> snapshot;
  std::vector<eom::NativePublishedPath> histories;
  std::map<std::string, eom::JointAffineRetainedHistory> joint_histories;
};

bool step_contains_caustic_entry_trigger(
    const eom::NativeAtomicStepCertificate& step) {
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

std::string caustic_contract_row(
    const eom::NativeAtomicStepCertificate& step) {
  if (step.failure_code == "root_completeness_not_certified" &&
      step_contains_caustic_entry_trigger(step)) {
    return "FWC-ENTRY-02";
  }
  if (step.failure_code == "caustic_eta_convergence_failed") {
    bool causal_width_failed = false;
    bool core_scale_failed = false;
    for (const auto& substep : step.substeps) {
      for (const auto& regulator :
           substep.regulator_convergence_certificates) {
        for (const auto& series : regulator.refinement_series) {
          causal_width_failed = causal_width_failed ||
              (series.control_id == "causal_width_refinement" &&
               !series.converged);
          core_scale_failed = core_scale_failed ||
              (series.control_id == "core_scale_refinement" &&
               !series.converged);
        }
      }
    }
    if (causal_width_failed && core_scale_failed) {
      return "FWC-REG-01/FWC-REG-02";
    }
    return core_scale_failed ? "FWC-REG-02" : "FWC-REG-01";
  }
  if (step.failure_code == "caustic_state_reconstruction_failed") {
    return "FWC-STATE-01";
  }
  if (step.failure_code == "caustic_correction_failed") {
    return "FWC-STATE-02";
  }
  if (step.failure_code == "caustic_exit_not_certified") {
    return "FWC-EXIT-01";
  }
  return "";
}

bool same_segment_tokens(
    const eom::CubicHistorySegment& left,
    const eom::CubicHistorySegment& right) {
  return left.t_start_token() == right.t_start_token() &&
      left.t_end_token() == right.t_end_token() &&
      left.coefficient_tokens() == right.coefficient_tokens() &&
      left.position_error_tokens() == right.position_error_tokens() &&
      left.velocity_error_tokens() == right.velocity_error_tokens();
}

bool is_exact_suffix(
    const eom::RetainedHistory& current,
    const eom::RetainedHistory& prior) {
  if (current.segments().size() > prior.segments().size()) {
    return false;
  }
  const std::size_t offset =
      prior.segments().size() - current.segments().size();
  for (std::size_t index = 0; index < current.segments().size(); ++index) {
    if (!same_segment_tokens(
            current.segments().at(index),
            prior.segments().at(offset + index))) {
      return false;
    }
  }
  return true;
}

const eom::RetainedHistory* cached_history(
    const IncrementalSnapshotCache& cache,
    const std::string& path_id) {
  const auto found = std::find_if(
      cache.histories.begin(), cache.histories.end(), [&](const auto& path) {
        return path.path_id == path_id;
      });
  return found == cache.histories.end() ? nullptr : &found->history;
}

const ParsedPath* parsed_path(
    const std::vector<ParsedPath>& paths,
    const std::string& path_id) {
  const auto found = std::find_if(
      paths.begin(), paths.end(), [&](const auto& path) {
        return path.path_id == path_id;
      });
  return found == paths.end() ? nullptr : &*found;
}

std::optional<eom::NativeAccelerationSnapshotCertificate>
rebase_trimmed_snapshot(
    const IncrementalSnapshotCache& cache,
    const std::vector<ParsedPath>& paths) {
  if (paths.empty() || !cache.snapshot.has_value()) {
    return std::nullopt;
  }
  const double retained_start = paths.front().history.t_start();
  for (const auto& path : paths) {
    const auto* prior = cached_history(cache, path.path_id);
    if (prior == nullptr || path.history.t_start() != retained_start ||
        !is_exact_suffix(path.history, *prior)) {
      return std::nullopt;
    }
  }
  auto rebased = *cache.snapshot;
  for (auto& row : rebased.root_certificates) {
    const auto* receiver = parsed_path(paths, row.receiver_path_id);
    const auto* source = parsed_path(paths, row.transmitter_path_id);
    if (receiver == nullptr || source == nullptr ||
        !row.certificate.stable_negative_prefix_certified ||
        row.certificate.memory_boundary_contact ||
        eom::parse_finite_double(
            row.certificate.stable_negative_prefix_upper,
            "stable negative prefix upper") <
            retained_start) {
      return std::nullopt;
    }
    for (const auto& root : row.certificate.roots) {
      if (eom::parse_finite_double(root.lower, "root lower") <
          retained_start) {
        return std::nullopt;
      }
    }
    row.certificate.receiver_history_fingerprint =
        receiver->history.provenance_fingerprint();
    row.certificate.transmitter_history_fingerprint =
        source->history.provenance_fingerprint();
    row.certificate.searched_lower =
        source->history.segments().front().t_start_token();
    // Segment indices belong to the pre-trim history.  The stable negative
    // frontier proves the removed prefix root-free; discard index-based warm
    // cells and rebuild only the bounded active suffix.
    row.certificate.root_free_cells.clear();
  }
  return rebased;
}

std::map<std::string, eom::JointAffineRetainedHistory>
seed_exact_joint_histories(const std::vector<ParsedPath>& paths) {
  std::map<std::string, eom::JointAffineRetainedHistory> result;
  for (const auto& path : paths) {
    std::vector<eom::JointAffineCubicSegment> segments;
    segments.reserve(path.history.segments().size());
    for (const auto& ordinary : path.history.segments()) {
      eom::JointAffineCubicSegment segment;
      segment.start_time = ordinary.t_start();
      segment.end_time = ordinary.t_end();
      segment.position_remainder_radii = ordinary.position_errors();
      segment.velocity_remainder_radii = ordinary.velocity_errors();
      for (std::size_t axis = 0U; axis < 3U; ++axis) {
        for (std::size_t degree = 0U; degree < 4U; ++degree) {
          segment.position_coefficients[axis][degree] = {};
        }
      }
      segments.push_back(std::move(segment));
    }
    result.emplace(
        path.path_id, eom::JointAffineRetainedHistory(
            path.path_id, {}, std::move(segments)));
  }
  return result;
}

bool paths_have_exact_zero_errors(const std::vector<ParsedPath>& paths) {
  return std::all_of(paths.begin(), paths.end(), [](const auto& path) {
    return std::all_of(
        path.history.segments().begin(), path.history.segments().end(),
        [](const auto& segment) {
          return std::all_of(
                     segment.position_errors().begin(),
                     segment.position_errors().end(),
                     [](double value) { return value == 0.0; }) &&
              std::all_of(
                  segment.velocity_errors().begin(),
                  segment.velocity_errors().end(),
                  [](double value) { return value == 0.0; });
        });
  });
}

std::optional<std::map<std::string, eom::JointAffineRetainedHistory>>
rebase_trimmed_joint_histories(
    const IncrementalSnapshotCache& cache,
    const std::vector<ParsedPath>& paths) {
  if (cache.joint_histories.empty() ||
      cache.histories.size() != paths.size()) {
    return std::nullopt;
  }
  std::map<std::string, eom::JointAffineRetainedHistory> result;
  for (const auto& path : paths) {
    const auto* prior_ordinary = cached_history(cache, path.path_id);
    const auto joint_found = cache.joint_histories.find(path.path_id);
    if (prior_ordinary == nullptr ||
        joint_found == cache.joint_histories.end() ||
        !is_exact_suffix(path.history, *prior_ordinary) ||
        joint_found->second.segments().size() !=
            prior_ordinary->segments().size() ||
        path.history.segments().size() >
            joint_found->second.segments().size()) {
      return std::nullopt;
    }
    const std::size_t offset = joint_found->second.segments().size() -
        path.history.segments().size();
    std::vector<eom::JointAffineCubicSegment> segments(
        joint_found->second.segments().begin() +
            static_cast<std::ptrdiff_t>(offset),
        joint_found->second.segments().end());
    if (segments.empty() ||
        segments.front().start_time != path.history.t_start() ||
        segments.back().end_time != path.history.t_end()) {
      return std::nullopt;
    }
    result.emplace(
        path.path_id, eom::JointAffineRetainedHistory(
            path.path_id, joint_found->second.symbol_registry(),
            std::move(segments)));
  }
  return result;
}

std::vector<std::string> split_tabs(const std::string& line) {
  std::vector<std::string> fields;
  std::size_t begin = 0;
  while (true) {
    const std::size_t delimiter = line.find('\t', begin);
    fields.push_back(line.substr(begin, delimiter - begin));
    if (delimiter == std::string::npos) {
      return fields;
    }
    begin = delimiter + 1U;
  }
}

std::size_t parse_size(const std::string& token, const char* label) {
  std::size_t value = 0;
  const auto result = std::from_chars(
      token.data(), token.data() + token.size(), value);
  if (result.ec != std::errc{} || result.ptr != token.data() + token.size()) {
    throw std::invalid_argument(std::string("invalid ") + label);
  }
  return value;
}

int parse_int(const std::string& token, const char* label) {
  int value = 0;
  const auto result = std::from_chars(
      token.data(), token.data() + token.size(), value);
  if (result.ec != std::errc{} || result.ptr != token.data() + token.size()) {
    throw std::invalid_argument(std::string("invalid ") + label);
  }
  return value;
}

bool parse_bool(const std::string& token, const char* label) {
  if (token == "1" || token == "true") {
    return true;
  }
  if (token == "0" || token == "false") {
    return false;
  }
  throw std::invalid_argument(std::string("invalid ") + label);
}

std::string json_escape(const std::string& value) {
  std::ostringstream stream;
  for (const unsigned char character : value) {
    switch (character) {
      case '"':
        stream << "\\\"";
        break;
      case '\\':
        stream << "\\\\";
        break;
      case '\b':
        stream << "\\b";
        break;
      case '\f':
        stream << "\\f";
        break;
      case '\n':
        stream << "\\n";
        break;
      case '\r':
        stream << "\\r";
        break;
      case '\t':
        stream << "\\t";
        break;
      default:
        if (character < 0x20U) {
          stream << "\\u" << std::hex << std::setw(4) << std::setfill('0')
                 << static_cast<unsigned>(character) << std::dec;
        } else {
          stream << static_cast<char>(character);
        }
    }
  }
  return stream.str();
}

void print_interval_vector(const eom::IntervalVector& value) {
  std::cout << '[';
  for (std::size_t axis = 0; axis < 3U; ++axis) {
    if (axis > 0U) std::cout << ',';
    std::cout << "{\"lower\":" << value[axis].lower()
              << ",\"upper\":" << value[axis].upper() << '}';
  }
  std::cout << ']';
}

std::string read_required_line(const char* label) {
  std::string line;
  if (!std::getline(std::cin, line)) {
    throw std::invalid_argument(std::string("missing ") + label);
  }
  return line;
}

eom::CubicHistorySegment parse_segment(const std::string& line) {
  const auto fields = split_tabs(line);
  if (fields.size() != 21U || fields[0] != "SEG") {
    throw std::invalid_argument("invalid SEG record");
  }
  eom::CubicCoefficientTokens coefficients;
  std::size_t field = 3U;
  for (auto& axis : coefficients) {
    for (auto& coefficient : axis) {
      coefficient = fields[field++];
    }
  }
  return eom::CubicHistorySegment(
      fields[1], fields[2], std::move(coefficients),
      eom::HistoryErrorTokens{fields[15], fields[16], fields[17]},
      eom::HistoryErrorTokens{fields[18], fields[19], fields[20]});
}

void print_segment(
    const eom::CubicHistorySegment& segment,
    const std::string& claim_grade) {
  std::cout << "{\"startTime\":\"" << json_escape(segment.t_start_token())
            << "\",\"endTime\":\"" << json_escape(segment.t_end_token())
            << "\",\"coefficients\":[";
  for (std::size_t axis = 0; axis < 3U; ++axis) {
    if (axis > 0U) {
      std::cout << ',';
    }
    std::cout << '[';
    for (std::size_t coefficient = 0; coefficient < 4U; ++coefficient) {
      if (coefficient > 0U) {
        std::cout << ',';
      }
      std::cout << '"'
                << json_escape(segment.coefficient_tokens()[axis][coefficient])
                << '"';
    }
    std::cout << ']';
  }
  std::cout << "],\"positionErrors\":[";
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    if (axis > 0U) std::cout << ',';
    std::cout << '"' << json_escape(segment.position_error_tokens()[axis]) << '"';
  }
  std::cout << "],\"velocityErrors\":[";
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    if (axis > 0U) std::cout << ',';
    std::cout << '"' << json_escape(segment.velocity_error_tokens()[axis]) << '"';
  }
  std::cout << "],\"positionError\":\""
            << json_escape(segment.position_error_token())
            << "\",\"velocityError\":\""
            << json_escape(segment.velocity_error_token())
            << "\",\"evidenceStatus\":\"" << json_escape(claim_grade)
            << "\",\"claimGrade\":\"" << json_escape(claim_grade)
            << "\"}";
}

std::string binary64_bits(double value) {
  if (!std::isfinite(value)) {
    throw std::invalid_argument("inspection endpoint must be finite");
  }
  std::ostringstream out;
  out << std::hex << std::setfill('0') << std::setw(16)
      << std::bit_cast<std::uint64_t>(value);
  return out.str();
}

void print_inspected_interval_vector(const eom::IntervalVector& value) {
  std::cout << '[';
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    if (axis > 0U) std::cout << ',';
    const auto& box = value[axis];
    const auto lower_bits = binary64_bits(box.lower());
    const auto upper_bits = binary64_bits(box.upper());
    std::cout << "{\"lower\":" << box.lower()
              << ",\"upper\":" << box.upper()
              << ",\"lowerBits\":\"" << lower_bits
              << "\",\"upperBits\":\"" << upper_bits << "\"}";
  }
  std::cout << ']';
}

// Parser-observation schema v1: original RUN tokens, resolved parser switches,
// and ordered paths containing original cubic tokens plus the actual History
// endpoint-state boxes (max_digits10 numbers and exact binary64 hex bits).
// This branch neither calls validate_request nor any root/evolution entrypoint.
// Its true parserInspected flag is deliberately separate from authority flags.
void print_request_inspection(
    const eom::NativeCoupledEvolutionRequest& request,
    const std::vector<std::string>& run_tokens,
    const std::vector<ParsedPath>& paths) {
  const auto prior_precision = std::cout.precision();
  std::cout << std::setprecision(std::numeric_limits<double>::max_digits10)
            << "{\"schema\":\"eom_borg_request_inspection/v1\","
               "\"status\":\"parser-inspection-only\","
               "\"parserInspected\":true,\"requestValidated\":false,"
               "\"rootsEvaluated\":false,\"eomExecuted\":false,"
               "\"executionAuthorized\":false,\"scienceApproved\":false,"
               "\"runId\":\"" << json_escape(request.run_id)
            << "\",\"fieldSpeed\":\"" << json_escape(request.field_speed)
            << "\",\"coupling\":\"" << json_escape(request.coupling)
            << "\",\"startTime\":\"" << json_escape(request.start_time)
            << "\",\"endTime\":\"" << json_escape(request.end_time)
            << "\",\"runTokens\":[";
  for (std::size_t index = 0U; index < run_tokens.size(); ++index) {
    if (index > 0U) std::cout << ',';
    std::cout << '"' << json_escape(run_tokens[index]) << '"';
  }
  std::cout << "],\"resolvedParserControls\":{"
               "\"useQuarterStepPublication\":"
            << (request.use_quarter_step_publication ? "true" : "false")
            << ",\"useFarFieldEnclosureInEvolution\":"
            << (request.use_far_field_enclosure_in_evolution ? "true" : "false")
            << ",\"useCertifiedTraversal\":"
            << (request.use_certified_traversal ? "true" : "false")
            << ",\"traversalExactTilePairLimit\":"
            << request.traversal_exact_tile_pair_limit
            << ",\"forceEventPrecisionEscalation\":"
            << (request.force_event_precision_escalation ? "true" : "false")
            << ",\"jointHistoryCount\":" << request.joint_histories.size()
            << ",\"freshHistoryCache\":true},\"paths\":[";
  for (std::size_t index = 0U; index < paths.size(); ++index) {
    if (index > 0U) std::cout << ',';
    const auto& path = paths[index];
    const auto endpoint = path.history.endpoint_state_hull();
    std::cout << "{\"pathId\":\"" << json_escape(path.path_id)
              << "\",\"charge\":\"" << json_escape(path.charge)
              << "\",\"stateFlags\":" << path.state_flags
              << ",\"historyId\":\"" << json_escape(path.history.history_id())
              << "\",\"historyFingerprint\":\""
              << json_escape(path.history.provenance_fingerprint())
              << "\",\"segmentCount\":" << path.input_segment_count
              << ",\"segments\":[";
    for (std::size_t segment = 0U; segment < path.input_segment_count; ++segment) {
      if (segment > 0U) std::cout << ',';
      print_segment(path.history.segments().at(segment), "parser-inspection-only");
    }
    std::cout << "],\"endpointState\":{\"position\":";
    print_inspected_interval_vector(endpoint.position);
    std::cout << ",\"velocity\":";
    print_inspected_interval_vector(endpoint.velocity);
    std::cout << "}}";
  }
  std::cout << "]}\n" << std::setprecision(prior_precision);
}

void run(
    unsigned maximum_mpfr_bits,
    std::size_t quadrature_max_depth,
    std::size_t quadrature_max_cells,
    std::size_t event_max_cells,
    bool use_certified_traversal,
    std::uint64_t traversal_exact_tile_pair_limit,
    eom::ShadowAffineDiagnostic* shadow_affine_diagnostic = nullptr,
    std::optional<IncrementalSnapshotCache>* incremental_cache = nullptr,
    bool* request_boundary_consumed = nullptr,
    bool inspect_request_only = false,
    bool accepted_step_progress = false) {
  if (request_boundary_consumed != nullptr) {
    *request_boundary_consumed = false;
  }
  if (read_required_line("protocol magic") != kBorgNativeProtocolMagic) {
    throw std::invalid_argument("unsupported Borg EOM native protocol");
  }
  const auto run = split_tabs(read_required_line("RUN record"));
  if (run.size() != 60U || run[0] != "RUN") {
    throw std::invalid_argument(
        "invalid RUN record: expected exactly 60 tab-separated fields");
  }
  const std::string run_grade = run[53];
  if (run_grade != "certified" && run_grade != "display") {
    throw std::invalid_argument("RUN grade must be certified or display");
  }
  if ((inspect_request_only || accepted_step_progress) && run_grade != "certified") {
    throw std::invalid_argument(
        "request inspection and accepted-step progress require certified grade");
  }
  if (incremental_cache != nullptr) {
    const auto disk_stats = eom::history_disk_storage_stats();
    if (disk_stats.enabled && disk_stats.run_id != run[1]) {
      incremental_cache->reset();
      eom::begin_history_disk_storage_run(run[1]);
    }
  }
  const std::size_t path_count = parse_size(run[54], "path count");
  if (path_count == 0U || path_count > 1000000U) {
    throw std::invalid_argument("path count lies outside native protocol envelope");
  }
  CausalHistoryRetentionConfig causal_retention;
  causal_retention.policy = run[55];
  if (causal_retention.policy != "none" &&
      causal_retention.policy != "fixed-spherical-receiver-envelope") {
    throw std::invalid_argument(
        "unsupported causal-history retention policy");
  }
  causal_retention.enabled = causal_retention.policy != "none";
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    causal_retention.center_tokens[axis] = run[56U + axis];
    causal_retention.center[axis] =
        eom::parse_finite_double(
            run[56U + axis], "causal-history receiver-envelope center");
    if (!std::isfinite(causal_retention.center[axis])) {
      throw std::invalid_argument(
          "causal-history receiver-envelope center must be finite");
    }
  }
  causal_retention.radius_token = run[59];
  causal_retention.radius = eom::parse_finite_double(
      run[59], "causal-history receiver-envelope radius");
  if (causal_retention.enabled &&
      (!(causal_retention.radius > 0.0) ||
       !std::isfinite(causal_retention.radius) || run_grade != "display")) {
    throw std::invalid_argument(
        "causal-history retention requires a positive Display receiver envelope");
  }
  std::vector<ParsedPath> parsed_paths;
  parsed_paths.reserve(path_count);
  for (std::size_t path_index = 0; path_index < path_count; ++path_index) {
    const auto path = split_tabs(read_required_line("PATH record"));
    if (path.size() != 6U || path[0] != "PATH" ||
        path[1].find_first_of("\t\r\n") != std::string::npos) {
      throw std::invalid_argument("invalid PATH record");
    }
    const std::size_t cached_prefix_count =
        parse_size(path[4], "cached prefix segment count");
    const std::size_t appended_segment_count =
        parse_size(path[5], "appended segment count");
    if (cached_prefix_count > 10000000U ||
        appended_segment_count > 10000000U - cached_prefix_count ||
        cached_prefix_count + appended_segment_count == 0U) {
      throw std::invalid_argument(
          "segment counts lie outside native protocol envelope");
    }
    std::vector<eom::CubicHistorySegment> segments;
    segments.reserve(appended_segment_count);
    for (std::size_t segment_index = 0;
         segment_index < appended_segment_count;
         ++segment_index) {
      segments.push_back(parse_segment(read_required_line("SEG record")));
    }
    std::string path_id = path[1];
    std::string charge = path[2];
    const int state_flags = parse_int(path[3], "state flags");
    eom::RetainedHistory history = [&]() {
      if (cached_prefix_count == 0U) {
        return eom::RetainedHistory(
            "borg-eom-shadow/" + path_id, std::move(segments));
      }
      if (incremental_cache == nullptr || !incremental_cache->has_value()) {
        throw std::invalid_argument(
            "PATH cached prefix requires a live worker history cache");
      }
      const auto* prior = cached_history(**incremental_cache, path_id);
      if (prior == nullptr ||
          prior->segments().size() != cached_prefix_count) {
        throw std::invalid_argument(
            "PATH cached prefix count does not match worker history");
      }
      eom::RetainedHistory restored = *prior;
      for (auto& segment : segments) {
        restored = restored.appended(std::move(segment));
      }
      return restored;
    }();
    parsed_paths.push_back({
        .path_id = path_id,
        .charge = charge,
        .state_flags = state_flags,
        .input_segment_count = cached_prefix_count + appended_segment_count,
        .history = std::move(history),
    });
  }
  if (read_required_line("END record") != "END") {
    throw std::invalid_argument("missing Borg EOM native END record");
  }
  if (inspect_request_only && std::cin.peek() != std::char_traits<char>::eof()) {
    throw std::invalid_argument("request inspection rejects trailing protocol input");
  }
  if (request_boundary_consumed != nullptr) {
    *request_boundary_consumed = true;
  }
  eom::NativeCoupledEvolutionRequest request{
      .run_id = run[1],
      .paths = {},
      .start_time = run[2],
      .end_time = run[3],
      .initial_step = run[4],
      .minimum_step = run[5],
      .maximum_step = run[6],
      .field_speed = run[8],
      .coupling = run[9],
      .root_tolerance = run[11],
      .transmitter_factor_floor = run[25],
      .acceleration_tolerance = run[12],
      .far_field_enclosure_fraction = run[13],
      .use_far_field_enclosure_in_evolution = false,
      .chart_policy = run[48],
      .causal_width = run[26],
      .core_scale = run[10],
      .quadrature_tolerance = run[52],
      .event_impulse_tolerance = run[27],
      .event_position_moment_tolerance = run[28],
      .regulator_refinement_ratio = run[35],
      .regulator_convergence_tolerance = run[27],
      .position_tolerance = run[14],
      .velocity_tolerance = run[15],
      .correction_tolerance = run[16],
      .certified_budget_schema = run[19],
      .certified_budget_preset_id = run[20],
      .certified_budget_allocation_hash = run[21],
      .certified_budget_allocation_json = run[22],
      .position_increment_budget = run[23],
      .velocity_increment_budget = run[24],
      .event_impulse_budget = run[27],
      .event_position_moment_budget = run[28],
      .independent_overlap_budget = run[29],
      .event_quadrature_fraction = run[30],
      .event_causal_regulator_fraction = run[31],
      .event_core_regulator_fraction = run[32],
      .event_state_numerical_fraction = run[33],
      .event_matching_fraction = run[34],
      .deterministic_reduction_policy = run[49],
      .rounding_mode = run[50],
      .receiver_event_allocation_rule = run[51],
      .root_max_depth = parse_size(run[39], "root maximum depth"),
      .root_max_cells = parse_size(run[40], "root maximum cells"),
      .quadrature_max_depth = parse_size(
          run[41], "quadrature maximum depth"),
      .quadrature_max_cells = parse_size(
          run[42], "quadrature maximum cells"),
      .event_max_depth = parse_size(run[43], "event maximum depth"),
      .event_max_cells = parse_size(run[44], "event maximum cells"),
      .regulator_refinement_levels = parse_size(
          run[36], "regulator refinement levels"),
      .initial_mpfr_bits = static_cast<unsigned>(
          parse_size(run[37], "initial MPFR bits")),
      .maximum_mpfr_bits = static_cast<unsigned>(
          parse_size(run[38], "maximum MPFR bits")),
      .force_event_precision_escalation = false,
      .max_correction_iterations = parse_size(
          run[45], "maximum correction iterations"),
      .max_step_attempts = parse_size(run[46], "maximum step attempts"),
      .max_rejected_steps = parse_size(
          run[47], "maximum rejected steps"),
      .thread_count = 1,
      .memory_budget_bytes = parse_size(run[18], "memory budget bytes"),
      .use_adaptive_step_growth = parse_bool(run[7], "adaptive step growth"),
  };
  request.thread_count = parse_size(run[17], "thread count");
  request.use_quarter_step_publication = true;
  request.retain_diagnostic_candidate_histories =
      shadow_affine_diagnostic != nullptr;
  if (shadow_affine_diagnostic != nullptr) {
    shadow_affine_diagnostic->begin_evolution(request.run_id);
    request.failed_substep_candidate_callback =
        [shadow_affine_diagnostic](
            const std::string& start_time,
            const std::string& end_time,
            const std::string& failure_code,
            std::size_t iteration,
            const std::vector<eom::NativePublishedPath>& histories) {
          try {
            shadow_affine_diagnostic->capture_failed_candidate(
                start_time, end_time, failure_code, iteration, histories);
          } catch (...) {
            // Diagnostics are fail-open and cannot alter the certified path.
          }
        };
  }
  if (request.maximum_mpfr_bits > maximum_mpfr_bits ||
      request.quadrature_max_depth > quadrature_max_depth ||
      request.quadrature_max_cells > quadrature_max_cells ||
      request.event_max_cells > event_max_cells) {
    throw std::invalid_argument(
        "certified budget exceeds the EOM process resource envelope");
  }
  // The traversal tree is an optional pair-selection optimization.  At small
  // Borg scales (16 paths and below) it excludes no pairs and costs more than
  // exhaustive exact coverage, so use the direct certified batch there.
  request.use_certified_traversal =
      use_certified_traversal && parsed_paths.size() > 16U;
  request.traversal_exact_tile_pair_limit = traversal_exact_tile_pair_limit;
  request.paths.reserve(parsed_paths.size());
  for (const auto& path : parsed_paths) {
    request.paths.push_back({path.path_id, path.charge, path.history});
  }

  std::ostringstream model_key_stream;
  // Step-controller state changes across adaptive chunks but does not change
  // the certified acceleration snapshot at their shared boundary. Keep field,
  // force, tolerance, and reduction controls in the cache key; exclude only
  // initial/minimum/maximum step and the growth switch.
  for (std::size_t index = 8U; index <= 52U; ++index) {
    model_key_stream << run[index] << '\n';
  }
  for (const auto& path : parsed_paths) {
    model_key_stream << path.path_id << '\t' << path.charge << '\t'
                     << path.state_flags << '\n';
  }
  const std::string model_key = model_key_stream.str();
  if (incremental_cache != nullptr && incremental_cache->has_value() &&
      (*incremental_cache)->model_key == model_key) {
    const auto rebased_joint = rebase_trimmed_joint_histories(
        **incremental_cache, parsed_paths);
    if (rebased_joint.has_value()) {
      request.joint_histories = *rebased_joint;
    }
  }
  if (request.joint_histories.empty() &&
      parsed_paths.size() >= 6U &&
      paths_have_exact_zero_errors(parsed_paths)) {
    // Joint affine seeding is a bounded-population certified-path feature.
    // Preserve the lightweight one- and two-path controls while supporting
    // both the 3:3 and larger 4:4 Borg populations.
    request.joint_histories = seed_exact_joint_histories(parsed_paths);
  }
  if (inspect_request_only) {
    if (incremental_cache != nullptr || shadow_affine_diagnostic != nullptr) {
      throw std::invalid_argument("inspection requires an uncached diagnostic-free request");
    }
    print_request_inspection(request, run, parsed_paths);
    return;
  }
  if (accepted_step_progress) {
    // Progress only: published count/time are observations, not a checkpoint.
    // The external supervisor owns fixed-cadence liveness/resource heartbeats.
    request.accepted_step_callback = [&request](
        std::size_t count, const std::string& time) {
      std::cerr << "{\"schema\":\"eom_accepted_step_progress/v1\","
                   "\"event\":\"accepted-step\",\"runId\":\""
                << json_escape(request.run_id)
                << "\",\"acceptedStepCount\":" << count
                << ",\"acceptedTime\":\"" << json_escape(time)
                << "\"}\n" << std::flush;
    };
  }
  std::optional<eom::NativeAccelerationSnapshotCertificate> rebased_snapshot;
  const eom::NativeAccelerationSnapshotCertificate* reusable_snapshot = nullptr;
  bool rebased_incremental_chunk_snapshot = false;
  if (incremental_cache != nullptr && incremental_cache->has_value() &&
      (*incremental_cache)->model_key == model_key &&
      (*incremental_cache)->snapshot.has_value() &&
      (*incremental_cache)->snapshot->status == "certified_complete" &&
      (*incremental_cache)->snapshot->reception_time == request.start_time) {
    reusable_snapshot = &*(*incremental_cache)->snapshot;
    const bool exact_fingerprints = std::all_of(
        reusable_snapshot->root_certificates.begin(),
        reusable_snapshot->root_certificates.end(), [&](const auto& row) {
          const auto* receiver = parsed_path(
              parsed_paths, row.receiver_path_id);
          const auto* source = parsed_path(
              parsed_paths, row.transmitter_path_id);
          return receiver != nullptr && source != nullptr &&
              row.certificate.receiver_history_fingerprint ==
                  receiver->history.provenance_fingerprint() &&
              row.certificate.transmitter_history_fingerprint ==
                  source->history.provenance_fingerprint();
        });
    if (!exact_fingerprints) {
      rebased_snapshot = rebase_trimmed_snapshot(
          **incremental_cache, parsed_paths);
      reusable_snapshot = rebased_snapshot.has_value()
          ? &*rebased_snapshot
          : nullptr;
      rebased_incremental_chunk_snapshot = reusable_snapshot != nullptr;
    }
  }
  bool reused_incremental_chunk_snapshot = false;
  eom::NativeCoupledEvolutionCertificate result;
  try {
    if (run_grade == "display") {
      result = evolve_display_point_histories(request);
    } else {
      result = eom::evolve_native_coupled_histories(request, reusable_snapshot);
      reused_incremental_chunk_snapshot = reusable_snapshot != nullptr;
    }
  } catch (const std::invalid_argument&) {
    // A changed retained-history prefix invalidates the cache.  Recompute from
    // the request instead of letting stale incremental state kill the server.
    if (reusable_snapshot == nullptr) {
      throw;
    }
    incremental_cache->reset();
    rebased_incremental_chunk_snapshot = false;
    result = run_grade == "display"
        ? evolve_display_point_histories(request)
        : eom::evolve_native_coupled_histories(request);
  }
  std::optional<CausalHistoryRetentionCertificate>
      causal_retention_certificate;
  if (causal_retention.enabled &&
      !result.accepted_end_time.empty()) {
    const double accepted_time = eom::parse_finite_double(
        result.accepted_end_time, "accepted end time");
    const bool receiver_domain_enclosed = std::isfinite(accepted_time) &&
        std::all_of(
            result.histories.begin(), result.histories.end(),
            [&](const auto& path) {
              return endpoint_inside_receiver_envelope(
                  path.history, accepted_time, causal_retention);
            });
    if (receiver_domain_enclosed) {
      causal_retention_certificate = certify_causal_history_retirement(
          result.histories, result.accepted_end_time, request.start_time,
          request.field_speed, causal_retention);
    }
  }
  if (shadow_affine_diagnostic != nullptr) {
    std::vector<eom::NativePublishedPath> diagnostic_inputs;
    diagnostic_inputs.reserve(parsed_paths.size());
    for (const auto& path : parsed_paths) {
      diagnostic_inputs.push_back({path.path_id, path.history});
    }
    try {
      shadow_affine_diagnostic->consume_evolution(
          request, diagnostic_inputs, result);
    } catch (const std::exception& error) {
      // The observer is non-authoritative.  A diagnostic failure must not
      // change any certified gate, publication, controller choice, or stdout
      // protocol token.
      std::cerr << "shadow affine diagnostic failed open: " << error.what()
                << '\n';
    }
  }
  if (incremental_cache != nullptr) {
    incremental_cache->reset();
    if (result.status == "completed") {
      std::optional<eom::NativeAccelerationSnapshotCertificate>
          accepted_snapshot;
      for (auto step = result.steps.rbegin(); step != result.steps.rend();
           ++step) {
        if (step->status == "accepted" && step->accepted_snapshot.has_value()) {
          accepted_snapshot = *step->accepted_snapshot;
          break;
        }
      }
      auto cached_histories = result.histories;
      if (causal_retention_certificate.has_value()) {
        for (std::size_t index = 0U; index < cached_histories.size(); ++index) {
          const std::size_t retired =
              causal_retention_certificate->paths[index]
                  .retired_prefix_count;
          cached_histories[index].history =
              cached_histories[index].history.retained_suffix(retired);
        }
      }
      incremental_cache->emplace(IncrementalSnapshotCache{
          .model_key = model_key,
          .snapshot = std::move(accepted_snapshot),
          .histories = std::move(cached_histories),
          .joint_histories = result.joint_histories,
      });
    } else {
      // A halted request has no reusable worker prefix. Release its disk store
      // as well, so a browser retry can resend complete history into a clean
      // directory even when the halt was caused by external file loss.
      eom::release_history_disk_storage_run();
    }
  }
  const std::string output_grade =
      run_grade == "display" ? "display-only" : result.evidence_status;
  std::size_t retained_warm_root_cell_count = 0U;
  const auto count_warm_cells = [&](const auto& snapshot) {
    for (const auto& row : snapshot.root_certificates) {
      retained_warm_root_cell_count += row.certificate.root_free_cells.size();
    }
  };
  for (const auto& step : result.steps) {
    for (const auto& substep : step.substeps) {
      count_warm_cells(substep.start_snapshot);
      if (substep.endpoint_snapshot.has_value()) {
        count_warm_cells(*substep.endpoint_snapshot);
      }
    }
    if (step.accepted_snapshot.has_value()) {
      count_warm_cells(*step.accepted_snapshot);
    }
    if (step.recertification_snapshot.has_value()) {
      count_warm_cells(*step.recertification_snapshot);
    }
  }
  std::cout << "{\"schema\":\"eom_borg_native_response/v1\","
               "\"deterministicPayloadScope\":"
               "\"claim-fields-and-published-extensions/v1\","
               "\"status\":\""
            << json_escape(result.status) << "\",\"evidenceStatus\":\""
            << json_escape(output_grade)
            << "\",\"runId\":\"" << json_escape(request.run_id)
            << "\",\"fieldSpeed\":\"" << json_escape(request.field_speed)
            << "\",\"coupling\":\"" << json_escape(request.coupling)
            << "\",\"runGrade\":\"" << json_escape(run_grade)
            << "\",\"coreScale\":\"" << json_escape(request.core_scale)
            << "\",\"claimGrade\":\""
            << json_escape(output_grade) << "\""
            << ",\"acceptedEndTime\":\""
            << json_escape(result.accepted_end_time)
            << "\",\"acceptedStepCount\":" << result.accepted_step_count
            << ",\"rejectedStepCount\":" << result.rejected_step_count
            << ",\"allStepsAtomic\":"
            << (result.all_steps_atomic ? "true" : "false")
            << ",\"controllerStepSize\":\""
            << json_escape(result.controller_step_size)
            << "\""
            << ",\"haltCode\":\"" << json_escape(result.halt_code)
            << "\",\"memoryBudgetBytes\":" << result.memory_budget_bytes
            << ",\"memoryEstimateBytes\":" << result.memory_estimate_bytes
            << ",\"retainedWarmRootCellCount\":"
            << retained_warm_root_cell_count
            << ",\"causalHistoryRetention\":";
  if (causal_retention_certificate.has_value()) {
    std::cout
        << "{\"schema\":\"borg-causal-history-retention/v1\""
        << ",\"policy\":\"fixed-spherical-receiver-envelope\""
        << ",\"receiverDomain\":\"all-requested-receiver-events-inside-envelope\""
        << ",\"outsideReceiverPolicy\":\"preserve-exact-history-no-retirement\""
        << ",\"receiverDomainStatus\":\"enclosed\""
        << ",\"center\":[\""
        << json_escape(causal_retention.center_tokens[0]) << "\",\""
        << json_escape(causal_retention.center_tokens[1]) << "\",\""
        << json_escape(causal_retention.center_tokens[2]) << "\"]"
        << ",\"radius\":\""
        << json_escape(causal_retention.radius_token) << "\""
        << ",\"totalRetiredSegmentCount\":"
        << causal_retention_certificate->total_retired_segment_count
        << ",\"paths\":[";
    for (std::size_t index = 0U;
         index < causal_retention_certificate->paths.size(); ++index) {
      if (index > 0U) std::cout << ',';
      const auto& row = causal_retention_certificate->paths[index];
      std::cout
          << "{\"pathId\":\"" << json_escape(row.path_id) << "\""
          << ",\"retiredPrefixCount\":" << row.retired_prefix_count
          << ",\"retainedSegmentCount\":" << row.retained_segment_count
          << ",\"retainedCoverageStart\":\""
          << json_escape(row.retained_coverage_start) << "\""
          << ",\"clearedThroughTime\":\""
          << json_escape(row.cleared_through_time) << "\"}";
    }
    std::cout << "]}";
  } else {
    std::cout << "null";
  }
  const auto history_storage = eom::history_disk_storage_stats();
  std::cout
      << ",\"historyStorage\":{\"schema\":\""
      << json_escape(history_storage.schema)
      << "\",\"mode\":\""
      << (history_storage.enabled
              ? "disk-backed-exact-blocks"
              : "in-memory-exact-blocks")
      << "\""
      << ",\"enabled\":" << (history_storage.enabled ? "true" : "false")
      << ",\"maximumDiskBytes\":" << history_storage.maximum_disk_bytes
      << ",\"diskBytes\":" << history_storage.disk_bytes
      << ",\"blockFileCount\":" << history_storage.block_file_count
      << ",\"cachedBlocksPerThread\":"
      << history_storage.cached_blocks_per_thread
      << "}";
  std::cout
            << ",\"budgetProvenance\":{\"schema\":\""
            << json_escape(request.certified_budget_schema)
            << "\",\"presetId\":\""
            << json_escape(request.certified_budget_preset_id)
            << "\",\"allocationHash\":\""
            << json_escape(request.certified_budget_allocation_hash)
            << "\",\"allocationCanonicalJson\":\""
            << json_escape(request.certified_budget_allocation_json)
            << "\",\"allocations\":"
            << request.certified_budget_allocation_json << "}"
            << ",\"incrementalChunkStartSnapshotReused\":"
            << (reused_incremental_chunk_snapshot ? "true" : "false")
            << ",\"incrementalChunkStartSnapshotRebased\":"
            << (rebased_incremental_chunk_snapshot ? "true" : "false")
            << ",\"jointStatePathCount\":"
            << result.joint_histories.size()
            << ",\"jointStateSymbolCount\":"
            << (result.joint_histories.empty()
                    ? 0U
                    : result.joint_histories.begin()
                          ->second.symbol_registry().size())
            << ",\"jointStateFallbackApplied\":"
            << (result.joint_state_fallback_applied ? "true" : "false")
            << ",\"timing\":{"
            << "\"snapshotTotalWallSeconds\":"
            << result.timing.snapshot_total_wall_seconds
            << ",\"snapshotCount\":"
            << result.timing.snapshot_count
            << ",\"historyWindowWallSeconds\":"
            << result.timing.history_window_wall_seconds
            << ",\"traversalWallSeconds\":"
            << result.timing.traversal_wall_seconds
            << ",\"rootBatchWallSeconds\":"
            << result.timing.exact_root_batch_wall_seconds
            << ",\"rootBinary64WorkerWallSeconds\":"
            << result.timing.root_binary64_worker_wall_seconds
            << ",\"rootBinary64SetupWorkerWallSeconds\":"
            << result.timing.root_binary64_setup_worker_wall_seconds
            << ",\"rootBinary64WarmStartWorkerWallSeconds\":"
            << result.timing.root_binary64_warm_start_worker_wall_seconds
            << ",\"rootBinary64CellSetupWorkerWallSeconds\":"
            << result.timing.root_binary64_cell_setup_worker_wall_seconds
            << ",\"rootBinary64CellClassificationWorkerWallSeconds\":"
            << result.timing
                   .root_binary64_cell_classification_worker_wall_seconds
            << ",\"rootBinary64FinalizationWorkerWallSeconds\":"
            << result.timing.root_binary64_finalization_worker_wall_seconds
            << ",\"rootPairCount\":"
            << result.timing.root_pair_count
            << ",\"rootReevaluatedCells\":"
            << result.timing.root_reevaluated_cells
            << ",\"rootWarmExcludedCells\":"
            << result.timing.root_warm_excluded_cells
            << ",\"rootMpfrWorkerWallSeconds\":"
            << result.timing.root_mpfr_worker_wall_seconds
            << ",\"rootMpfrPairCount\":"
            << result.timing.root_mpfr_pair_count
            << ",\"rootMpfrAttemptCount\":"
            << result.timing.root_mpfr_attempt_count
            << ",\"rootMpfrEscalationWorkerWallSeconds\":"
            << result.timing.root_mpfr_escalation_worker_wall_seconds
            << ",\"rootMpfrEscalationAttemptCount\":"
            << result.timing.root_mpfr_escalation_attempt_count
            << ",\"accelerationWallSeconds\":"
            << result.timing.acceleration_wall_seconds
            << ",\"finiteWidthExecutionUnionWallSeconds\":"
            << result.timing.finite_width_execution_union_wall_seconds
            << ",\"sharpExecutionUnionWallSeconds\":"
            << result.timing.sharp_execution_union_wall_seconds
            << ",\"finiteWidthSharpOverlapWallSeconds\":"
            << result.timing.finite_width_sharp_overlap_wall_seconds
            << ",\"accelerationWorkerIdleOrchestrationWallSeconds\":"
            << result.timing.acceleration_worker_idle_orchestration_wall_seconds
            << ",\"accelerationPrecisionEscalationWorkerSeconds\":"
            << result.timing.acceleration_precision_escalation_worker_seconds
            << ",\"accelerationPrecisionEscalationAttemptCount\":"
            << result.timing.acceleration_precision_escalation_attempt_count
            << ",\"jointSnapshotWallSeconds\":"
            << result.timing.joint_snapshot_wall_seconds
            << ",\"jointReceiverStateWallSeconds\":"
            << result.timing.joint_receiver_state_wall_seconds
            << ",\"jointRowCertificationWallSeconds\":"
            << result.timing.joint_row_certification_wall_seconds
            << ",\"jointDeterministicReductionWallSeconds\":"
            << result.timing.joint_deterministic_reduction_wall_seconds
            << ",\"jointSnapshotCount\":"
            << result.timing.joint_snapshot_count
            << ",\"reusedJointStartSnapshotCount\":"
            << result.timing.reused_joint_start_snapshot_count
            << ",\"jointStartSnapshotWallSeconds\":"
            << result.timing.joint_start_snapshot_wall_seconds
            << ",\"jointPredictorSnapshotWallSeconds\":"
            << result.timing.joint_predictor_snapshot_wall_seconds
            << ",\"jointCorrectionSnapshotWallSeconds\":"
            << result.timing.joint_correction_snapshot_wall_seconds
            << ",\"jointEndpointContractionWallSeconds\":"
            << result.timing.joint_endpoint_contraction_wall_seconds
            << ",\"regulatorLadderWallSeconds\":"
            << result.timing.regulator_ladder_wall_seconds
            << ",\"commonDomainWallSeconds\":"
            << result.timing.common_domain_wall_seconds
            << ",\"historyCopyHashWallSeconds\":"
            << result.timing.history_copy_hash_wall_seconds
            << ",\"endpointStateLookupWallSeconds\":"
            << result.timing.history.endpoint_state_lookup.wall_seconds
            << ",\"endpointStateLookupDiskBlockLoads\":"
            << result.timing.history.endpoint_state_lookup
                   .disk_block_load_count
            << ",\"endpointStateLookupDiskCacheMisses\":"
            << result.timing.history.endpoint_state_lookup
                   .disk_cache_miss_count
            << ",\"endpointPositionLookupWallSeconds\":"
            << result.timing.history.endpoint_position_lookup.wall_seconds
            << ",\"endpointPositionLookupDiskBlockLoads\":"
            << result.timing.history.endpoint_position_lookup
                   .disk_block_load_count
            << ",\"endpointPositionLookupDiskCacheMisses\":"
            << result.timing.history.endpoint_position_lookup
                   .disk_cache_miss_count
            << ",\"endpointVelocityLookupWallSeconds\":"
            << result.timing.history.endpoint_velocity_lookup.wall_seconds
            << ",\"endpointVelocityLookupDiskBlockLoads\":"
            << result.timing.history.endpoint_velocity_lookup
                   .disk_block_load_count
            << ",\"endpointVelocityLookupDiskCacheMisses\":"
            << result.timing.history.endpoint_velocity_lookup
                   .disk_cache_miss_count
            << ",\"segmentConstructionWallSeconds\":"
            << result.timing.history.segment_construction.wall_seconds
            << ",\"segmentConstructionDiskBlockLoads\":"
            << result.timing.history.segment_construction
                   .disk_block_load_count
            << ",\"segmentConstructionDiskCacheMisses\":"
            << result.timing.history.segment_construction
                   .disk_cache_miss_count
            << ",\"tailBlockCopyWallSeconds\":"
            << result.timing.history.tail_block_copy.wall_seconds
            << ",\"tailBlockCopyDiskBlockLoads\":"
            << result.timing.history.tail_block_copy.disk_block_load_count
            << ",\"tailBlockCopyDiskCacheMisses\":"
            << result.timing.history.tail_block_copy.disk_cache_miss_count
            << ",\"fingerprintMetadataUpdateWallSeconds\":"
            << result.timing.history.fingerprint_metadata_update.wall_seconds
            << ",\"fingerprintMetadataUpdateDiskBlockLoads\":"
            << result.timing.history.fingerprint_metadata_update
                   .disk_block_load_count
            << ",\"fingerprintMetadataUpdateDiskCacheMisses\":"
            << result.timing.history.fingerprint_metadata_update
                   .disk_cache_miss_count
            << ",\"historyInflationWallSeconds\":"
            << result.timing.history.history_inflation.wall_seconds
            << ",\"historyInflationDiskBlockLoads\":"
            << result.timing.history.history_inflation.disk_block_load_count
            << ",\"historyInflationDiskCacheMisses\":"
            << result.timing.history.history_inflation
                   .disk_cache_miss_count
            << ",\"correctionWallSeconds\":"
            << result.timing.correction_wall_seconds
            << ",\"reusedStartSnapshotCount\":"
            << result.timing.reused_start_snapshot_count
            << ",\"recertificationWallSeconds\":"
            << result.timing.recertification_wall_seconds
            << ",\"rejectionWallSeconds\":"
            << result.timing.rejection_wall_seconds
            << ",\"totalWallSeconds\":"
            << result.timing.total_wall_seconds
            << "}"
            << ",\"stepFailures\":[";
  for (std::size_t step_index = 0; step_index < result.steps.size();
       ++step_index) {
    if (step_index > 0U) {
      std::cout << ',';
    }
    const auto& step = result.steps[step_index];
    std::optional<double> correction_error = step.correction_residual;
    if (!correction_error.has_value()) {
      for (auto substep = step.substeps.rbegin();
           substep != step.substeps.rend(); ++substep) {
        if (substep->correction_error.has_value()) {
          correction_error = substep->correction_error;
          break;
        }
      }
    }
    const eom::NativeAccelerationSnapshotCertificate* diagnostic_snapshot =
        step.accepted_snapshot.has_value()
        ? &*step.accepted_snapshot
        : (step.substeps.empty() ? nullptr : &step.substeps.front().start_snapshot);
    double acceleration_width_max_receiver = 0.0;
    if (diagnostic_snapshot != nullptr) {
      for (const auto& receiver :
           diagnostic_snapshot->acceleration.receiver_totals) {
        double receiver_width = 0.0;
        for (const auto& component : receiver.acceleration) {
          receiver_width = std::max(receiver_width, component.width());
        }
        acceleration_width_max_receiver = std::max(
            acceleration_width_max_receiver, receiver_width);
      }
    }
    const std::string caustic_row = caustic_contract_row(step);
    std::cout << "{\"status\":\""
              << json_escape(step.status)
              << "\",\"failureCode\":\""
              << json_escape(step.failure_code)
              << "\",\"causticContractRow\":\""
              << caustic_row
              << "\",\"causticRegulatorLevel\":\""
              << (caustic_row.empty()
                      ? "not-applicable"
                      : (step.failure_code ==
                                 "root_completeness_not_certified"
                             ? "not-evaluated"
                             : "see-regulator-series"))
              << "\",\"correctionResidual\":";
    if (correction_error.has_value()) {
      print_json_number(*correction_error);
    } else {
      std::cout << "null";
    }
    if (step.correction_retry_scale > 0.0) {
      std::cout << ",\"correctionRetryScale\":"
                << step.correction_retry_scale;
    }
    // Actual estimator values, not reconstructed from published endpoints.
    // Empty means no local estimate was reached on that attempted step.
    const auto prior_precision = std::cout.precision();
    std::cout << std::setprecision(std::numeric_limits<double>::max_digits10)
              << ",\"localErrors\":[";
    for (std::size_t index = 0U; index < step.local_errors.size(); ++index) {
      if (index > 0U) std::cout << ',';
      const auto& error = step.local_errors[index];
      std::cout << "{\"pathId\":\"" << json_escape(error.path_id)
                << "\",\"positionError\":";
      print_json_number(error.position_error);
      std::cout << ",\"velocityError\":";
      print_json_number(error.velocity_error);
      const auto print_axes = [](const auto& values) {
        std::cout << '[';
        for (std::size_t axis = 0U; axis < 3U; ++axis) {
          if (axis > 0U) std::cout << ',';
          print_json_number(values[axis]);
        }
        std::cout << ']';
      };
      std::cout << ",\"positionErrors\":";
      print_axes(error.position_errors);
      std::cout << ",\"velocityErrors\":";
      print_axes(error.velocity_errors);
      std::cout << '}';
    }
    std::cout << ']' << std::setprecision(prior_precision);
    std::cout << ",\"attemptedStart\":\""
              << json_escape(step.attempted_start)
              << "\",\"attemptedEnd\":\""
              << json_escape(step.attempted_end)
              << "\",\"rootTimePressureRatio\":"
              << step.root_time_pressure_ratio
              << ",\"rootPressureStepCap\":"
              << step.root_pressure_step_cap
              << ",\"pairSelectionRoute\":\""
              << (diagnostic_snapshot != nullptr
                      ? json_escape(diagnostic_snapshot->pair_selection_route)
                      : "none")
              << "\",\"traversalExcludedPairs\":"
              << (diagnostic_snapshot != nullptr
                      ? diagnostic_snapshot->traversal_excluded_pairs
                      : 0U)
              << ",\"traversalExactPairs\":"
              << (diagnostic_snapshot != nullptr
                      ? diagnostic_snapshot->traversal_exact_pairs
                      : 0U)
              << ",\"traversalEnclosedPairs\":"
              << (diagnostic_snapshot != nullptr
                      ? diagnostic_snapshot->traversal_enclosed_pairs
                      : 0U)
              << ",\"traversalLogicalPairs\":"
              << (diagnostic_snapshot != nullptr
                      ? diagnostic_snapshot->logical_ordered_pairs
                      : 0U)
              << ",\"traversalUnresolvedPairs\":"
              << (diagnostic_snapshot != nullptr
                      ? diagnostic_snapshot->traversal_unresolved_pairs
                      : 0U)
              << ",\"enclosedErrorWidthTotal\":"
              << (diagnostic_snapshot != nullptr
                      ? diagnostic_snapshot->enclosed_error_width_total
                      : 0.0)
              << ",\"enclosedErrorWidthMaxReceiver\":"
              << (diagnostic_snapshot != nullptr
                      ? diagnostic_snapshot->enclosed_error_width_max_receiver
                      : 0.0)
              << ",\"accelerationWidthMaxReceiver\":"
              << acceleration_width_max_receiver;
    std::cout << ",\"traversalVisitedNodes\":"
              << (diagnostic_snapshot != nullptr &&
                          diagnostic_snapshot->traversal_certificate.has_value()
                      ? diagnostic_snapshot->traversal_certificate->visited_nodes
                      : 0U)
              << ",\"traversalCoverageDisjointComplete\":"
              << (diagnostic_snapshot != nullptr &&
                          diagnostic_snapshot->traversal_certificate.has_value()
                      ? (diagnostic_snapshot->traversal_certificate
                                 ->coverage_disjoint_complete
                             ? "true"
                             : "false")
                      : (diagnostic_snapshot != nullptr ? "true" : "false"))
              << ",\"rootCertificateCount\":"
              << (diagnostic_snapshot != nullptr
                      ? diagnostic_snapshot->root_certificates.size()
                      : 0U)
              << ",\"rootAccounting\":[";
    if (diagnostic_snapshot != nullptr) {
      for (std::size_t root_index = 0;
           root_index < diagnostic_snapshot->root_certificates.size();
           ++root_index) {
        if (root_index > 0U) {
          std::cout << ',';
        }
        const auto& root_row =
            diagnostic_snapshot->root_certificates[root_index];
        const auto& certificate = root_row.certificate;
        std::cout << "{\"receiverPathId\":\""
                  << json_escape(root_row.receiver_path_id)
                  << "\",\"transmitterPathId\":\""
                  << json_escape(root_row.transmitter_path_id)
                  << "\",\"status\":\""
                  << json_escape(certificate.status)
                  << "\",\"failureCode\":\""
                  << json_escape(certificate.failure_code)
                  << "\",\"rootFreeComplement\":"
                  << (certificate.root_free_complement ? "true" : "false")
                  << ",\"stableNegativePrefixCertified\":"
                  << (certificate.stable_negative_prefix_certified
                          ? "true" : "false")
                  << ",\"stableNegativePrefixUpper\":\""
                  << json_escape(certificate.stable_negative_prefix_upper)
                  << "\",\"incrementalPrefixReuseCount\":"
                  << certificate.incremental_prefix_reuse_count
                  << ",\"memoryBoundaryContact\":"
                  << (certificate.memory_boundary_contact ? "true" : "false")
                  << ",\"roots\":[";
        for (std::size_t bracket_index = 0;
             bracket_index < certificate.roots.size(); ++bracket_index) {
          if (bracket_index > 0U) {
            std::cout << ',';
          }
          const auto& bracket = certificate.roots[bracket_index];
          std::cout << "{\"lower\":\"" << json_escape(bracket.lower)
                    << "\",\"upper\":\"" << json_escape(bracket.upper)
                    << "\",\"transmitterFactorLower\":\""
                    << json_escape(bracket.transmitter_factor_lower)
                    << "\",\"transmitterFactorUpper\":\""
                    << json_escape(bracket.transmitter_factor_upper)
                    << "\",\"receiverFactorLower\":\""
                    << json_escape(bracket.receiver_factor_lower)
                    << "\",\"receiverFactorUpper\":\""
                    << json_escape(bracket.receiver_factor_upper)
                    << "\",\"transmitterFactorSign\":"
                    << bracket.transmitter_factor_sign
                    << ",\"precisionRoute\":\""
                    << json_escape(bracket.precision_route)
                    << "\",\"precisionBits\":" << bracket.precision_bits
                    << '}';
        }
        std::cout << "]}";
      }
    }
    std::cout << "]"
              << ",\"rootFailures\":[";
    bool first_root_failure = true;
    const auto print_snapshot_failures = [&](
        const eom::NativeAccelerationSnapshotCertificate& snapshot) {
      for (const auto& row : snapshot.root_certificates) {
        const auto& certificate = row.certificate;
        if ((certificate.status == "certified_complete" &&
             !certificate.memory_boundary_contact) ||
            certificate.status == "certified_enclosed") {
          continue;
        }
        if (!first_root_failure) {
          std::cout << ',';
        }
        first_root_failure = false;
        std::cout << "{\"receiverPathId\":\""
                  << json_escape(row.receiver_path_id)
                  << "\",\"transmitterPathId\":\""
                  << json_escape(row.transmitter_path_id)
                  << "\",\"status\":\""
                  << json_escape(certificate.status)
                  << "\",\"failureCode\":\""
                  << json_escape(certificate.failure_code)
                  << "\",\"memoryBoundaryContact\":"
                  << (certificate.memory_boundary_contact ? "true" : "false")
                  << ",\"precisionEscalated\":"
                  << (certificate.precision_escalated ? "true" : "false")
                  << ",\"achievedPrecisionBits\":"
                  << certificate.achieved_precision_bits
                  << ",\"visitedCells\":" << certificate.visited_cells
                  << ",\"excludedCells\":" << certificate.excluded_cells
                  << ",\"difficultCells\":" << certificate.difficult_cells
                  << ",\"diagnosticDetail\":\""
                  << json_escape(certificate.diagnostic_detail) << '"'
                  << ",\"mpfrAttemptCount\":"
                  << certificate.mpfr_attempt_count
                  << ",\"mpfrEscalationAttemptCount\":"
                  << certificate.mpfr_escalation_attempt_count;
        if (certificate.has_difficult_cell) {
          std::cout << ",\"difficultTransmitterSegmentIndex\":"
                    << certificate.difficult_source_segment_index
                    << ",\"difficultCellLower\":\""
                    << json_escape(certificate.difficult_cell_lower)
                    << "\",\"difficultCellUpper\":\""
                    << json_escape(certificate.difficult_cell_upper)
                    << "\",\"difficultPoint\":\""
                    << json_escape(certificate.difficult_point)
                    << "\",\"difficultPointResidualLower\":\""
                    << json_escape(
                        certificate.difficult_point_residual_lower)
                    << "\",\"difficultPointResidualUpper\":\""
                    << json_escape(
                        certificate.difficult_point_residual_upper)
                    << "\",\"difficultSourceNormalLower\":\""
                    << json_escape(certificate.difficult_transmitter_factor_lower)
                    << "\",\"difficultSourceNormalUpper\":\""
                    << json_escape(certificate.difficult_transmitter_factor_upper)
                    << "\",\"difficultReceiverNormalLower\":\""
                    << json_escape(certificate.difficult_receiver_factor_lower)
                    << "\",\"difficultReceiverNormalUpper\":\""
                    << json_escape(certificate.difficult_receiver_factor_upper)
                    << "\",\"difficultLowerSign\":"
                    << certificate.difficult_lower_sign
                    << ",\"difficultUpperSign\":"
                    << certificate.difficult_upper_sign;
        }
        std::cout << '}';
      }
    };
    for (const auto& substep : step.substeps) {
      print_snapshot_failures(substep.start_snapshot);
      if (substep.endpoint_snapshot.has_value()) {
        print_snapshot_failures(*substep.endpoint_snapshot);
      }
    }
    std::cout << "],\"accelerationFailures\":[";
    bool first_acceleration_failure = true;
    const auto print_acceleration_failures = [&](
        const eom::NativeAccelerationSnapshotCertificate& snapshot) {
      for (const auto& certificate :
           snapshot.acceleration.pair_certificates) {
        if (certificate.status != "uncertified" &&
            certificate.failure_code.empty()) {
          continue;
        }
        if (!first_acceleration_failure) {
          std::cout << ',';
        }
        first_acceleration_failure = false;
        std::cout << "{\"receiverPathId\":\""
                  << json_escape(certificate.receiver_path_id)
                  << "\",\"transmitterPathId\":\""
                  << json_escape(certificate.transmitter_path_id)
                  << "\",\"chart\":\"" << json_escape(certificate.chart)
                  << "\",\"status\":\"" << json_escape(certificate.status)
                  << "\",\"failureCode\":\""
                  << json_escape(certificate.failure_code)
                  << "\",\"quadratureVisitedCells\":"
                  << certificate.quadrature_visited_cells
                  << ",\"accelerationPrecisionEscalated\":"
                  << (certificate.acceleration_precision_escalated
                          ? "true" : "false")
                  << ",\"achievedAccelerationPrecisionBits\":"
                  << certificate.achieved_acceleration_precision_bits << '}';
      }
    };
    for (const auto& substep : step.substeps) {
      print_acceleration_failures(substep.start_snapshot);
      if (substep.endpoint_snapshot.has_value()) {
        print_acceleration_failures(*substep.endpoint_snapshot);
      }
    }
    std::cout << "],\"finiteWidthStateCertificates\":[";
    bool first_state_certificate = true;
    for (const auto& substep : step.substeps) {
      for (const auto& state : substep.finite_width_state_certificates) {
        if (!first_state_certificate) std::cout << ',';
        first_state_certificate = false;
        std::cout << "{\"receiverPathId\":\""
                  << json_escape(state.receiver_path_id)
                  << "\",\"transmitterPathId\":\""
                  << json_escape(state.transmitter_path_id)
                  << "\",\"status\":\"" << json_escape(state.status)
                  << "\",\"failureCode\":\""
                  << json_escape(state.failure_code)
                  << "\",\"resolvedEventAllocation\":{"
                  << "\"receiverRoutedPairCount\":"
                  << state.receiver_routed_pair_count
                  << ",\"pairWeight\":";
        print_json_number(state.receiver_pair_allocation_weight);
        std::cout << ",\"receiverImpulseTotal\":\""
                  << json_escape(state.receiver_event_impulse_total)
                  << "\",\"receiverPositionMomentTotal\":\""
                  << json_escape(state.receiver_event_position_moment_total)
                  << "\",\"impulseRowBudget\":\""
                  << json_escape(state.event_impulse_row_budget)
                  << "\",\"positionMomentRowBudget\":\""
                  << json_escape(state.event_position_moment_row_budget)
                  << "\",\"quadratureImpulse\":\""
                  << json_escape(state.quadrature_impulse_row_budget)
                  << "\",\"quadraturePositionMoment\":\""
                  << json_escape(state.quadrature_position_moment_row_budget)
                  << "\",\"causalRegulatorImpulse\":\""
                  << json_escape(state.causal_regulator_impulse_row_budget)
                  << "\",\"causalRegulatorPositionMoment\":\""
                  << json_escape(
                         state.causal_regulator_position_moment_row_budget)
                  << "\",\"coreRegulatorImpulse\":\""
                  << json_escape(state.core_regulator_impulse_row_budget)
                  << "\",\"coreRegulatorPositionMoment\":\""
                  << json_escape(
                         state.core_regulator_position_moment_row_budget)
                  << "\",\"stateNumericalImpulse\":\""
                  << json_escape(state.state_numerical_impulse_row_budget)
                  << "\",\"stateNumericalPositionMoment\":\""
                  << json_escape(
                         state.state_numerical_position_moment_row_budget)
                  << "\",\"matchingImpulse\":\""
                  << json_escape(state.matching_impulse_row_budget)
                  << "\",\"matchingPositionMoment\":\""
                  << json_escape(state.matching_position_moment_row_budget)
                  << "\"}"
                  << ",\"routedPairPinned\":"
                  << (state.routed_pair_pinned ? "true" : "false")
                  << ",\"eventPairExcludedFromBackground\":"
                  << (state.event_pair_excluded_from_background
                          ? "true" : "false")
                  << ",\"endpointReconstructionPassed\":"
                  << (state.endpoint_reconstruction_passed
                          ? "true" : "false")
                  << ",\"commonDomainChartOverlapPassed\":"
                  << (state.common_domain_chart_overlap_passed
                          ? "true" : "false")
                  << ",\"exitPassed\":"
                  << (state.exit_passed ? "true" : "false")
                  << ",\"commonDomains\":[";
        for (std::size_t common_index = 0;
             common_index < state.common_domains.size(); ++common_index) {
          if (common_index > 0U) std::cout << ',';
          const auto& common = state.common_domains[common_index];
          std::cout << "{\"status\":\"" << json_escape(common.status)
                    << "\",\"failureCode\":\""
                    << json_escape(common.failure_code)
                    << "\",\"receptionLower\":\""
                    << json_escape(common.reception_lower)
                    << "\",\"receptionUpper\":\""
                    << json_escape(common.reception_upper)
                    << "\",\"certifiedRootCount\":"
                    << common.certified_root_count
                    << ",\"transmitterFactorAbsoluteLower\":";
          print_json_number(common.transmitter_factor_absolute_lower);
          std::cout << ",\"separationLower\":";
          print_json_number(common.separation_lower);
          std::cout << ",\"disjointComponent\":";
          print_json_number(common.disjoint_component);
          std::cout << ",\"disjointWidth\":";
          print_json_number(common.disjoint_width);
          std::cout << ",\"applicableRemainderBudget\":";
          print_json_number(common.applicable_remainder_budget);
          std::cout << ",\"applicableRegulatorRemainderBudget\":";
          print_json_number(common.applicable_regulator_remainder_budget);
          std::cout << ",\"applicableTotalRemainderBudget\":";
          print_json_number(common.applicable_total_remainder_budget);
          std::cout << ",\"postAccountingDistance\":";
          print_json_number(common.post_accounting_distance);
          const auto print_optional = [&](const char* label,
                                          const auto& value) {
            std::cout << ",\"" << label << "\":";
            if (value.has_value()) {
              print_interval_vector(*value);
            } else {
              std::cout << "null";
            }
          };
          print_optional(
              "accelerationSecondDerivativeBound",
              common.acceleration_second_derivative_bound);
          print_optional(
              "impulseShortcutRemainder",
              common.impulse_shortcut_remainder);
          print_optional(
              "positionMomentShortcutRemainder",
              common.position_moment_shortcut_remainder);
          print_optional("trackImpulseRemainder",
                         common.track_impulse_remainder);
          print_optional("trackPositionMomentRemainder",
                         common.track_position_moment_remainder);
          print_optional("emissionSecondDerivativeBound",
                         common.emission_second_derivative_bound);
          print_optional("regulatorLeadingImpulse",
                         common.regulator_leading_impulse);
          print_optional("regulatorLeadingPositionMoment",
                         common.regulator_leading_position_moment);
          print_optional("regulatorHigherOrderImpulseRemainder",
                         common.regulator_higher_order_impulse_remainder);
          print_optional(
              "regulatorHigherOrderPositionMomentRemainder",
              common.regulator_higher_order_position_moment_remainder);
          print_optional("regulatorImpulseRemainder",
                         common.regulator_impulse_remainder);
          print_optional("regulatorPositionMomentRemainder",
                         common.regulator_position_moment_remainder);
          print_optional("sharpImpulse", common.sharp_impulse);
          print_optional("finiteWidthImpulse", common.finite_width_impulse);
          print_optional(
              "sharpPositionMoment", common.sharp_position_moment);
          print_optional(
              "finiteWidthPositionMoment",
              common.finite_width_position_moment);
          std::cout << '}';
        }
        std::cout << "]}";
      }
    }
    std::cout << "],\"regulatorFailures\":[";
    bool first_regulator_failure = true;
    for (const auto& substep : step.substeps) {
      for (const auto& regulator :
           substep.regulator_convergence_certificates) {
        if (!first_regulator_failure) {
          std::cout << ',';
        }
        first_regulator_failure = false;
        std::cout << "{\"receiverPathId\":\""
                  << json_escape(regulator.receiver_path_id)
                  << "\",\"transmitterPathId\":\""
                  << json_escape(regulator.transmitter_path_id)
                  << "\",\"status\":\""
                  << json_escape(regulator.status)
                  << "\",\"failureCode\":\""
                  << json_escape(regulator.failure_code)
                  << "\",\"resolvedEventAllocation\":{"
                  << "\"receiverRoutedPairCount\":"
                  << regulator.receiver_routed_pair_count
                  << ",\"pairWeight\":\""
                  << json_escape(regulator.receiver_pair_allocation_weight)
                  << "\",\"impulseRowBudget\":\""
                  << json_escape(regulator.event_impulse_row_budget)
                  << "\",\"positionMomentRowBudget\":\""
                  << json_escape(regulator.event_position_moment_row_budget)
                  << "\",\"quadratureImpulse\":\""
                  << json_escape(regulator.quadrature_impulse_row_budget)
                  << "\",\"quadraturePositionMoment\":\""
                  << json_escape(
                         regulator.quadrature_position_moment_row_budget)
                  << "\",\"regulatorConvergenceLimit\":\""
                  << json_escape(regulator.convergence_tolerance)
                  << "\"}"
                  << ",\"acceptedEventStatus\":\""
                  << json_escape(regulator.accepted_event_impulse.status)
                  << "\",\"acceptedEventFailureCode\":\""
                  << json_escape(
                         regulator.accepted_event_impulse.failure_code)
                  << "\",\"series\":[";
        for (std::size_t series_index = 0;
             series_index < regulator.refinement_series.size();
             ++series_index) {
          if (series_index > 0U) {
            std::cout << ',';
          }
          const auto& series = regulator.refinement_series[series_index];
          std::cout << "{\"controlId\":\""
                    << json_escape(series.control_id)
                    << "\",\"converged\":"
                    << (series.converged ? "true" : "false")
                    << ",\"finalImpulseDelta\":";
          if (series.final_impulse_delta.has_value()) {
            print_json_number(*series.final_impulse_delta);
          } else {
            std::cout << "null";
          }
          std::cout << ",\"maximumLadderImpulseDelta\":";
          if (series.maximum_ladder_impulse_delta.has_value()) {
            print_json_number(*series.maximum_ladder_impulse_delta);
          } else {
            std::cout << "null";
          }
          std::cout << ",\"finalPositionMomentDelta\":";
          if (series.final_position_moment_delta.has_value()) {
            print_json_number(*series.final_position_moment_delta);
          } else {
            std::cout << "null";
          }
          std::cout << ",\"maximumLadderPositionMomentDelta\":";
          if (series.maximum_ladder_position_moment_delta.has_value()) {
            print_json_number(*series.maximum_ladder_position_moment_delta);
          } else {
            std::cout << "null";
          }
          std::cout << ",\"levels\":[";
          for (std::size_t level_index = 0;
               level_index < series.levels.size(); ++level_index) {
            if (level_index > 0U) {
              std::cout << ',';
            }
            const auto& level = series.levels[level_index];
            const auto& event = level.event_impulse;
            std::cout << "{\"level\":" << level.level
                      << ",\"causalWidth\":\""
                      << json_escape(level.causal_width)
                      << "\",\"coreScale\":\""
                      << json_escape(level.core_scale)
                      << "\",\"eventStatus\":\""
                      << json_escape(event.status)
                      << "\",\"eventFailureCode\":\""
                      << json_escape(event.failure_code)
                      << "\",\"maximumImpulseDeltaFromPrevious\":";
            if (level.maximum_impulse_delta_from_previous.has_value()) {
              std::cout << *level.maximum_impulse_delta_from_previous;
            } else {
              std::cout << "null";
            }
            std::cout << ",\"maximumPositionMomentDeltaFromPrevious\":";
            if (level.maximum_position_moment_delta_from_previous.has_value()) {
              std::cout << *level.maximum_position_moment_delta_from_previous;
            } else {
              std::cout << "null";
            }
            std::cout << ",\"visitedCells\":" << event.visited_cells
                      << ",\"gaussianTailCells\":"
                      << event.gaussian_tail_cells
                      << ",\"centeredEmissionCells\":"
                      << event.centered_emission_cells
                      << ",\"monotoneResidualCells\":"
                      << event.monotone_residual_cells
                      << ",\"directJointCells\":"
                      << event.direct_joint_cells
                      << ",\"jointDisplacementCells\":"
                      << event.joint_displacement_cells
                      << ",\"receiverPositionErrorUpper\":"
                      << event.receiver_position_error_upper
                      << ",\"receiverVelocityErrorUpper\":"
                      << event.receiver_velocity_error_upper
                      << ",\"transmitterPositionErrorUpper\":"
                      << event.transmitter_position_error_upper
                      << ",\"transmitterVelocityErrorUpper\":"
                      << event.transmitter_velocity_error_upper
                      << ",\"lastMaximumComponentWidth\":"
                      << event.last_maximum_component_width
                      << ",\"lastMaximumPositionMomentComponentWidth\":"
                      << event.last_maximum_position_moment_component_width
                      << ",\"lastLargestCellWidth\":"
                      << event.last_largest_cell_width
                      << ",\"precisionRoute\":\""
                      << json_escape(event.precision_route)
                      << "\",\"precisionBits\":"
                      << event.precision_bits << '}';
          }
          std::cout << "]}";
        }
        std::cout << "]}";
      }
    }
    std::cout << "]}";
  }
  // Stored accepted-final snapshot only. Never run a new calculation here or
  // substitute an unaccepted candidate. Decimal strings round-trip the actual
  // binary64 bounds, rather than formatting them with stdout's display precision.
  const eom::NativeAccelerationSnapshotCertificate* final_snapshot = nullptr;
  for (auto step = result.steps.rbegin(); step != result.steps.rend(); ++step) {
    if (step->status == "accepted" && step->accepted_snapshot.has_value() &&
        step->accepted_time == result.accepted_end_time &&
        step->accepted_snapshot->reception_time == result.accepted_end_time) {
      final_snapshot = &*step->accepted_snapshot;
      break;
    }
  }
  std::cout << "],\"finalAccelerationSnapshot\":";
  if (final_snapshot == nullptr) {
    std::cout << "null";
  } else {
    std::cout << "{\"status\":\"" << json_escape(final_snapshot->status)
              << "\",\"receptionTime\":\"" << json_escape(final_snapshot->reception_time)
              << "\",\"failureCode\":\"" << json_escape(final_snapshot->failure_code)
              << "\",\"rootRowCount\":" << final_snapshot->root_certificates.size()
              << ",\"receiverTotals\":[";
    for (std::size_t index = 0U;
         index < final_snapshot->acceleration.receiver_totals.size(); ++index) {
      if (index > 0U) std::cout << ',';
      const auto& receiver = final_snapshot->acceleration.receiver_totals[index];
      std::cout << "{\"receiverPathId\":\"" << json_escape(receiver.receiver_path_id)
                << "\",\"acceleration\":[";
      for (std::size_t axis = 0U; axis < 3U; ++axis) {
        if (axis > 0U) std::cout << ',';
        const auto& component = receiver.acceleration[axis];
        std::cout << "{\"lower\":\""
                  << eom::finite_double_token(component.lower())
                  << "\",\"upper\":\""
                  << eom::finite_double_token(component.upper()) << "\"}";
      }
      std::cout << "]}";
    }
    std::cout << "]}";
  }
  std::cout << ",\"publishedExtensions\":[";
  for (std::size_t path_index = 0; path_index < result.histories.size();
       ++path_index) {
    if (path_index > 0U) {
      std::cout << ',';
    }
    const auto& published = result.histories[path_index];
    const auto input_count = parsed_paths[path_index].input_segment_count;
    if (published.history.segments().size() < input_count) {
      throw std::runtime_error("published history lost retained segments");
    }
    std::cout << "{\"pathId\":\"" << json_escape(published.path_id)
              << "\",\"stateFlags\":" << parsed_paths[path_index].state_flags
              << ",\"segments\":[";
    for (std::size_t segment_index = input_count;
         segment_index < published.history.segments().size(); ++segment_index) {
      if (segment_index > input_count) {
        std::cout << ',';
      }
      print_segment(
          published.history.segments().at(segment_index),
          output_grade);
    }
    std::cout << "]}";
  }
  std::cout << "]}\n";
}

void drain_failed_request_to_boundary() {
  std::string line;
  while (std::getline(std::cin, line)) {
    if (!line.empty() && line.back() == '\r') {
      line.pop_back();
    }
    if (line == "END") {
      return;
    }
  }
}

void print_engine_exception_response(const std::exception& error) {
  const std::string detail = error.what();
  const std::string halt_code = is_exact_history_storage_failure(detail)
      ? "checkpoint_or_storage_failure"
      : "engine_exception";
  std::cout
      << "{\"schema\":\"eom_borg_native_response/v1\","
         "\"status\":\"halted\",\"evidenceStatus\":\"failed\","
         "\"claimGrade\":\"failed\",\"haltCode\":\""
      << halt_code
      << "\","
         "\"diagnosticDetail\":\""
      << json_escape(detail)
      << "\",\"acceptedEndTime\":null,\"acceptedStepCount\":0,"
         "\"rejectedStepCount\":0,\"stepFailures\":[],"
         "\"publishedExtensions\":[],\"diagnostics\":[{"
         "\"code\":\"engine_exception\",\"detail\":\""
      << json_escape(detail) << "\"}]}\n";
}

}  // namespace

int main(int argc, char** argv) {
  std::cout.imbue(std::locale::classic());
  try {
    if (argc < 2) {
      std::cerr << "usage: eom_borg_shadow_cli "
                   "print-protocol-version|borg-shadow-v0|borg-shadow-server-v0 "
                   "[--inspect-request-only] [--accepted-step-progress] "
                   "[--maximum-mpfr-bits=N] "
                   "[--quadrature-max-depth=N] "
                   "[--quadrature-max-cells=N] "
                   "[--event-max-cells=N] "
                   "[--disable-certified-traversal] "
                   "[--traversal-exact-tile-pair-limit=N] "
                   "[--shadow-affine-diagnostic=PATH] "
                   "[--shadow-affine-symbol-cap=N] "
                   "[--history-temp-root=PATH] "
                   "[--history-disk-limit-bytes=N] "
                   "[--history-cache-blocks-per-thread=N] "
                   "[--shadow-affine-disable-root-enclosure-symbols] "
                   "[--shadow-affine-disable-acceleration-enclosure-symbols]\n";
      return EXIT_FAILURE;
    }
    unsigned maximum_mpfr_bits = 512;
    std::size_t quadrature_max_depth = 32;
    std::size_t quadrature_max_cells = 200000;
    std::size_t event_max_cells = 200000;
    bool use_certified_traversal = true;
    bool inspect_request_only = false;
    bool accepted_step_progress = false;
    std::uint64_t traversal_exact_tile_pair_limit = 64;
    std::string shadow_affine_output_path;
    std::size_t shadow_affine_symbol_cap = 256U;
    bool shadow_affine_include_root_enclosure_symbols = true;
    bool shadow_affine_include_acceleration_enclosure_symbols = true;
    std::string history_temp_root =
        (std::filesystem::temp_directory_path() /
         "architrino-eom-exact-history-borg-worker").string();
    std::uint64_t history_disk_limit_bytes = UINT64_C(1099511627776);
    std::size_t history_cache_blocks_per_thread = 16U;
    for (int argument_index = 2; argument_index < argc; ++argument_index) {
      const std::string option = argv[argument_index];
      constexpr const char* precision_prefix = "--maximum-mpfr-bits=";
      constexpr const char* depth_prefix = "--quadrature-max-depth=";
      constexpr const char* cells_prefix = "--quadrature-max-cells=";
      constexpr const char* event_cells_prefix = "--event-max-cells=";
      constexpr const char* traversal_tile_prefix =
          "--traversal-exact-tile-pair-limit=";
      constexpr const char* shadow_affine_prefix =
          "--shadow-affine-diagnostic=";
      constexpr const char* shadow_affine_cap_prefix =
          "--shadow-affine-symbol-cap=";
      constexpr const char* history_root_prefix = "--history-temp-root=";
      constexpr const char* history_limit_prefix =
          "--history-disk-limit-bytes=";
      constexpr const char* history_cache_prefix =
          "--history-cache-blocks-per-thread=";
      if (option.starts_with(precision_prefix)) {
        const std::size_t parsed = parse_size(
            option.substr(std::char_traits<char>::length(precision_prefix)),
            "maximum MPFR bits");
        if (parsed < 128U || parsed > std::numeric_limits<unsigned>::max()) {
          throw std::invalid_argument(
              "maximum MPFR bits lies outside supported envelope");
        }
        maximum_mpfr_bits = static_cast<unsigned>(parsed);
      } else if (option.starts_with(depth_prefix)) {
        quadrature_max_depth = parse_size(
            option.substr(std::char_traits<char>::length(depth_prefix)),
            "quadrature maximum depth");
        if (quadrature_max_depth == 0U) {
          throw std::invalid_argument("quadrature maximum depth must be positive");
        }
      } else if (option.starts_with(cells_prefix)) {
        quadrature_max_cells = parse_size(
            option.substr(std::char_traits<char>::length(cells_prefix)),
            "quadrature maximum cells");
        if (quadrature_max_cells == 0U) {
          throw std::invalid_argument("quadrature maximum cells must be positive");
        }
      } else if (option.starts_with(event_cells_prefix)) {
        event_max_cells = parse_size(
            option.substr(std::char_traits<char>::length(event_cells_prefix)),
            "event maximum cells");
        if (event_max_cells == 0U) {
          throw std::invalid_argument("event maximum cells must be positive");
        }
      } else if (option == "--disable-certified-traversal") {
        use_certified_traversal = false;
      } else if (option == "--inspect-request-only") {
        inspect_request_only = true;
      } else if (option == "--accepted-step-progress") {
        accepted_step_progress = true;
      } else if (option.starts_with(traversal_tile_prefix)) {
        traversal_exact_tile_pair_limit = parse_size(
            option.substr(std::char_traits<char>::length(
                traversal_tile_prefix)),
            "traversal exact tile pair limit");
        if (traversal_exact_tile_pair_limit == 0U) {
          throw std::invalid_argument(
              "traversal exact tile pair limit must be positive");
        }
      } else if (option.starts_with(shadow_affine_prefix)) {
        shadow_affine_output_path = option.substr(
            std::char_traits<char>::length(shadow_affine_prefix));
        if (shadow_affine_output_path.empty()) {
          throw std::invalid_argument(
              "shadow affine diagnostic path must be nonempty");
        }
      } else if (option.starts_with(shadow_affine_cap_prefix)) {
        shadow_affine_symbol_cap = parse_size(
            option.substr(std::char_traits<char>::length(
                shadow_affine_cap_prefix)),
            "shadow affine symbol cap");
        if (shadow_affine_symbol_cap < 32U) {
          throw std::invalid_argument(
              "shadow affine symbol cap must be at least 32");
        }
      } else if (option.starts_with(history_root_prefix)) {
        history_temp_root = option.substr(
            std::char_traits<char>::length(history_root_prefix));
        if (history_temp_root.empty()) {
          throw std::invalid_argument(
              "exact history temporary root must be nonempty");
        }
      } else if (option.starts_with(history_limit_prefix)) {
        history_disk_limit_bytes = parse_size(
            option.substr(std::char_traits<char>::length(history_limit_prefix)),
            "exact history disk limit");
        if (history_disk_limit_bytes == 0U ||
            history_disk_limit_bytes > UINT64_C(1099511627776)) {
          throw std::invalid_argument(
              "exact history disk limit must lie between one byte and one TiB");
        }
      } else if (option.starts_with(history_cache_prefix)) {
        history_cache_blocks_per_thread = parse_size(
            option.substr(std::char_traits<char>::length(history_cache_prefix)),
            "exact history cache blocks per thread");
        if (history_cache_blocks_per_thread < 2U ||
            history_cache_blocks_per_thread > 1024U) {
          throw std::invalid_argument(
              "exact history cache must hold between 2 and 1024 blocks per thread");
        }
      } else if (option ==
                 "--shadow-affine-disable-root-enclosure-symbols") {
        shadow_affine_include_root_enclosure_symbols = false;
      } else if (option ==
                 "--shadow-affine-disable-acceleration-enclosure-symbols") {
        shadow_affine_include_acceleration_enclosure_symbols = false;
      } else {
        throw std::invalid_argument("unsupported Borg EOM native option");
      }
    }
    const std::string mode = argv[1];
    if ((inspect_request_only || accepted_step_progress) && mode != "borg-shadow-v0") {
      throw std::invalid_argument(
          "request inspection and accepted-step progress require borg-shadow-v0");
    }
    if (inspect_request_only && !shadow_affine_output_path.empty()) {
      throw std::invalid_argument("request inspection prohibits shadow diagnostics");
    }
    std::optional<eom::ShadowAffineDiagnostic> shadow_affine_diagnostic;
    if (!shadow_affine_output_path.empty()) {
      shadow_affine_diagnostic.emplace(eom::ShadowAffineDiagnosticOptions{
          .output_path = shadow_affine_output_path,
          .symbol_cap = shadow_affine_symbol_cap,
          .include_root_enclosure_symbols =
              shadow_affine_include_root_enclosure_symbols,
          .include_acceleration_enclosure_symbols =
              shadow_affine_include_acceleration_enclosure_symbols,
      });
    }
    auto* shadow_affine = shadow_affine_diagnostic.has_value()
        ? &*shadow_affine_diagnostic : nullptr;
    if (mode == "print-protocol-version") {
      std::cout << kBorgNativeProtocolMagic << '\n';
    } else if (mode == "borg-shadow-v0") {
      std::ostringstream response;
      std::streambuf* const published_output =
          std::cout.rdbuf(response.rdbuf());
      try {
        run(
            maximum_mpfr_bits, quadrature_max_depth, quadrature_max_cells,
            event_max_cells,
            use_certified_traversal, traversal_exact_tile_pair_limit,
            shadow_affine, nullptr, nullptr,
            inspect_request_only, accepted_step_progress);
        std::cout.rdbuf(published_output);
        std::cout << response.str();
      } catch (...) {
        std::cout.rdbuf(published_output);
        throw;
      }
    } else if (mode == "borg-shadow-server-v0") {
      eom::configure_history_disk_storage({
          .root_directory = history_temp_root,
          .maximum_disk_bytes = history_disk_limit_bytes,
          .cached_blocks_per_thread = history_cache_blocks_per_thread,
      });
      struct HistoryDiskRunGuard {
        ~HistoryDiskRunGuard() { eom::release_history_disk_storage_run(); }
      } history_disk_run_guard;
      std::optional<IncrementalSnapshotCache> incremental_cache;
      while (std::cin.peek() != std::char_traits<char>::eof()) {
        bool request_boundary_consumed = false;
        std::ostringstream response;
        std::streambuf* const published_output =
            std::cout.rdbuf(response.rdbuf());
        try {
          run(
              maximum_mpfr_bits, quadrature_max_depth, quadrature_max_cells,
              event_max_cells,
              use_certified_traversal, traversal_exact_tile_pair_limit,
              shadow_affine,
              &incremental_cache, &request_boundary_consumed);
          std::cout.rdbuf(published_output);
          std::cout << response.str();
        } catch (const std::exception& error) {
          std::cout.rdbuf(published_output);
          incremental_cache.reset();
          // A disk-history read or write failure invalidates the complete
          // worker-owned store, not merely the current snapshot. Release it so
          // the next full request starts from a clean run directory instead of
          // reopening a missing or damaged block.
          eom::release_history_disk_storage_run();
          if (!request_boundary_consumed) {
            drain_failed_request_to_boundary();
          }
          print_engine_exception_response(error);
        }
        std::cout.flush();
      }
    } else {
      std::cerr << "usage: eom_borg_shadow_cli "
                   "print-protocol-version|borg-shadow-v0|borg-shadow-server-v0 "
                   "[--inspect-request-only] [--accepted-step-progress] "
                   "[--maximum-mpfr-bits=N] "
                   "[--quadrature-max-depth=N] "
                   "[--quadrature-max-cells=N] "
                   "[--event-max-cells=N] "
                   "[--disable-certified-traversal] "
                   "[--traversal-exact-tile-pair-limit=N] "
                   "[--shadow-affine-diagnostic=PATH] "
                   "[--shadow-affine-symbol-cap=N] "
                   "[--history-temp-root=PATH] "
                   "[--history-disk-limit-bytes=N] "
                   "[--history-cache-blocks-per-thread=N] "
                   "[--shadow-affine-disable-root-enclosure-symbols] "
                   "[--shadow-affine-disable-acceleration-enclosure-symbols]\n";
      return EXIT_FAILURE;
    }
    return EXIT_SUCCESS;
  } catch (const std::exception& error) {
    std::cerr << "eom Borg shadow native request failed: " << error.what()
              << '\n';
    return EXIT_FAILURE;
  }
}
