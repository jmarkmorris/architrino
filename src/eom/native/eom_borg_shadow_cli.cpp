#include "architrino/eom/CoupledEvolution.hpp"

#include <algorithm>
#include <array>
#include <charconv>
#include <cmath>
#include <cstdlib>
#include <iomanip>
#include <iostream>
#include <limits>
#include <optional>
#include <sstream>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

namespace eom = architrino::eom;

namespace {

constexpr const char* kBorgNativeProtocolMagic = "EOM_BORG_NATIVE_V8";

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

struct IncrementalSnapshotCache {
  std::string model_key;
  eom::NativeAccelerationSnapshotCertificate snapshot;
  std::vector<eom::NativePublishedPath> histories;
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
            current.segments()[index], prior.segments()[offset + index])) {
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
  if (paths.empty()) {
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
  auto rebased = cache.snapshot;
  for (auto& row : rebased.root_certificates) {
    const auto* receiver = parsed_path(paths, row.receiver_path_id);
    const auto* source = parsed_path(paths, row.source_path_id);
    if (receiver == nullptr || source == nullptr ||
        !row.certificate.stable_negative_prefix_certified ||
        row.certificate.memory_boundary_contact ||
        std::strtod(
            row.certificate.stable_negative_prefix_upper.c_str(), nullptr) <
            retained_start) {
      return std::nullopt;
    }
    for (const auto& root : row.certificate.roots) {
      if (std::strtod(root.lower.c_str(), nullptr) < retained_start) {
        return std::nullopt;
      }
    }
    row.certificate.receiver_history_fingerprint =
        receiver->history.provenance_fingerprint();
    row.certificate.source_history_fingerprint =
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

void run(
    unsigned maximum_mpfr_bits,
    std::size_t quadrature_max_depth,
    std::size_t quadrature_max_cells,
    std::size_t event_max_cells,
    bool use_certified_traversal,
    std::uint64_t traversal_exact_tile_pair_limit,
    std::optional<IncrementalSnapshotCache>* incremental_cache = nullptr,
    bool* request_boundary_consumed = nullptr) {
  if (request_boundary_consumed != nullptr) {
    *request_boundary_consumed = false;
  }
  if (read_required_line("protocol magic") != kBorgNativeProtocolMagic) {
    throw std::invalid_argument("unsupported Borg EOM native protocol");
  }
  const auto run = split_tabs(read_required_line("RUN record"));
  if (run.size() != 54U || run[0] != "RUN") {
    throw std::invalid_argument(
        "invalid RUN record: expected exactly 54 tab-separated fields");
  }
  const std::size_t path_count = parse_size(run[53], "path count");
  if (path_count == 0U || path_count > 1000000U) {
    throw std::invalid_argument("path count lies outside native protocol envelope");
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
      .source_normal_floor = run[25],
      .acceleration_tolerance = run[12],
      .far_field_enclosure_fraction = run[13],
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
  std::optional<eom::NativeAccelerationSnapshotCertificate> rebased_snapshot;
  const eom::NativeAccelerationSnapshotCertificate* reusable_snapshot = nullptr;
  bool rebased_incremental_chunk_snapshot = false;
  if (incremental_cache != nullptr && incremental_cache->has_value() &&
      (*incremental_cache)->model_key == model_key &&
      (*incremental_cache)->snapshot.status == "certified_complete" &&
      (*incremental_cache)->snapshot.reception_time == request.start_time) {
    reusable_snapshot = &(*incremental_cache)->snapshot;
    const bool exact_fingerprints = std::all_of(
        reusable_snapshot->root_certificates.begin(),
        reusable_snapshot->root_certificates.end(), [&](const auto& row) {
          const auto* receiver = parsed_path(
              parsed_paths, row.receiver_path_id);
          const auto* source = parsed_path(
              parsed_paths, row.source_path_id);
          return receiver != nullptr && source != nullptr &&
              row.certificate.receiver_history_fingerprint ==
                  receiver->history.provenance_fingerprint() &&
              row.certificate.source_history_fingerprint ==
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
    result = eom::evolve_native_coupled_histories(request, reusable_snapshot);
    reused_incremental_chunk_snapshot = reusable_snapshot != nullptr;
  } catch (const std::invalid_argument&) {
    // A changed retained-history prefix invalidates the cache.  Recompute from
    // the request instead of letting stale incremental state kill the server.
    if (reusable_snapshot == nullptr) {
      throw;
    }
    incremental_cache->reset();
    rebased_incremental_chunk_snapshot = false;
    result = eom::evolve_native_coupled_histories(request);
  }
  if (incremental_cache != nullptr) {
    incremental_cache->reset();
    if (result.status == "completed") {
      for (auto step = result.steps.rbegin(); step != result.steps.rend();
           ++step) {
        if (step->status == "accepted" && step->accepted_snapshot.has_value()) {
          incremental_cache->emplace(IncrementalSnapshotCache{
              .model_key = model_key,
              .snapshot = *step->accepted_snapshot,
              .histories = result.histories,
          });
          break;
        }
      }
    }
  }
  std::cout << "{\"schema\":\"eom_borg_native_response/v0\",\"status\":\""
            << json_escape(result.status) << "\",\"evidenceStatus\":\""
            << json_escape(result.evidence_status)
            << "\",\"coreScale\":\"" << json_escape(request.core_scale)
            << "\",\"claimGrade\":\""
            << json_escape(result.evidence_status) << "\""
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
            << ",\"rootBinary64CpuSeconds\":"
            << result.timing.root_binary64_cpu_seconds
            << ",\"rootPairCount\":"
            << result.timing.root_pair_count
            << ",\"rootReevaluatedCells\":"
            << result.timing.root_reevaluated_cells
            << ",\"rootWarmExcludedCells\":"
            << result.timing.root_warm_excluded_cells
            << ",\"rootMpfrCpuSeconds\":"
            << result.timing.root_mpfr_cpu_seconds
            << ",\"rootMpfrPairCount\":"
            << result.timing.root_mpfr_pair_count
            << ",\"rootMpfrAttemptCount\":"
            << result.timing.root_mpfr_attempt_count
            << ",\"rootMpfrEscalationCpuSeconds\":"
            << result.timing.root_mpfr_escalation_cpu_seconds
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
            << ",\"regulatorLadderWallSeconds\":"
            << result.timing.regulator_ladder_wall_seconds
            << ",\"commonDomainWallSeconds\":"
            << result.timing.common_domain_wall_seconds
            << ",\"historyCopyHashWallSeconds\":"
            << result.timing.history_copy_hash_wall_seconds
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
    std::cout << ",\"attemptedStart\":\""
              << json_escape(step.attempted_start)
              << "\",\"attemptedEnd\":\""
              << json_escape(step.attempted_end)
              << "\",\"pairSelectionRoute\":\""
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
                      : 0.0);
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
                  << "\",\"sourcePathId\":\""
                  << json_escape(root_row.source_path_id)
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
                    << "\",\"sourceNormalLower\":\""
                    << json_escape(bracket.source_normal_lower)
                    << "\",\"sourceNormalUpper\":\""
                    << json_escape(bracket.source_normal_upper)
                    << "\",\"receiverNormalLower\":\""
                    << json_escape(bracket.receiver_normal_lower)
                    << "\",\"receiverNormalUpper\":\""
                    << json_escape(bracket.receiver_normal_upper)
                    << "\",\"sourceNormalSign\":"
                    << bracket.source_normal_sign
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
                  << "\",\"sourcePathId\":\""
                  << json_escape(row.source_path_id)
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
          std::cout << ",\"difficultSourceSegmentIndex\":"
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
                    << json_escape(certificate.difficult_source_normal_lower)
                    << "\",\"difficultSourceNormalUpper\":\""
                    << json_escape(certificate.difficult_source_normal_upper)
                    << "\",\"difficultReceiverNormalLower\":\""
                    << json_escape(certificate.difficult_receiver_normal_lower)
                    << "\",\"difficultReceiverNormalUpper\":\""
                    << json_escape(certificate.difficult_receiver_normal_upper)
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
                  << "\",\"sourcePathId\":\""
                  << json_escape(certificate.source_path_id)
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
                  << "\",\"sourcePathId\":\""
                  << json_escape(state.source_path_id)
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
                    << ",\"sourceNormalAbsoluteLower\":";
          print_json_number(common.source_normal_absolute_lower);
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
                  << "\",\"sourcePathId\":\""
                  << json_escape(regulator.source_path_id)
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
                      << ",\"receiverPositionErrorUpper\":"
                      << event.receiver_position_error_upper
                      << ",\"receiverVelocityErrorUpper\":"
                      << event.receiver_velocity_error_upper
                      << ",\"sourcePositionErrorUpper\":"
                      << event.source_position_error_upper
                      << ",\"sourceVelocityErrorUpper\":"
                      << event.source_velocity_error_upper
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
  std::cout << "],\"publishedExtensions\":[";
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
          published.history.segments()[segment_index],
          result.evidence_status);
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
  std::cout
      << "{\"schema\":\"eom_borg_native_response/v0\","
         "\"status\":\"halted\",\"evidenceStatus\":\"failed\","
         "\"claimGrade\":\"failed\",\"haltCode\":\"engine_exception\","
         "\"diagnosticDetail\":\""
      << json_escape(error.what())
      << "\",\"acceptedEndTime\":null,\"acceptedStepCount\":0,"
         "\"rejectedStepCount\":0,\"stepFailures\":[],"
         "\"publishedExtensions\":[],\"diagnostics\":[{"
         "\"code\":\"engine_exception\",\"detail\":\""
      << json_escape(error.what()) << "\"}]}\n";
}

}  // namespace

int main(int argc, char** argv) {
  try {
    if (argc < 2) {
      std::cerr << "usage: eom_borg_shadow_cli "
                   "print-protocol-version|borg-shadow-v0|borg-shadow-server-v0 "
                   "[--maximum-mpfr-bits=N] "
                   "[--quadrature-max-depth=N] "
                   "[--quadrature-max-cells=N] "
                   "[--event-max-cells=N] "
                   "[--disable-certified-traversal] "
                   "[--traversal-exact-tile-pair-limit=N]\n";
      return EXIT_FAILURE;
    }
    unsigned maximum_mpfr_bits = 512;
    std::size_t quadrature_max_depth = 32;
    std::size_t quadrature_max_cells = 200000;
    std::size_t event_max_cells = 200000;
    bool use_certified_traversal = true;
    std::uint64_t traversal_exact_tile_pair_limit = 64;
    for (int argument_index = 2; argument_index < argc; ++argument_index) {
      const std::string option = argv[argument_index];
      constexpr const char* precision_prefix = "--maximum-mpfr-bits=";
      constexpr const char* depth_prefix = "--quadrature-max-depth=";
      constexpr const char* cells_prefix = "--quadrature-max-cells=";
      constexpr const char* event_cells_prefix = "--event-max-cells=";
      constexpr const char* traversal_tile_prefix =
          "--traversal-exact-tile-pair-limit=";
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
      } else if (option.starts_with(traversal_tile_prefix)) {
        traversal_exact_tile_pair_limit = parse_size(
            option.substr(std::char_traits<char>::length(
                traversal_tile_prefix)),
            "traversal exact tile pair limit");
        if (traversal_exact_tile_pair_limit == 0U) {
          throw std::invalid_argument(
              "traversal exact tile pair limit must be positive");
        }
      } else {
        throw std::invalid_argument("unsupported Borg EOM native option");
      }
    }
    const std::string mode = argv[1];
    if (mode == "print-protocol-version") {
      std::cout << kBorgNativeProtocolMagic << '\n';
    } else if (mode == "borg-shadow-v0") {
      run(
          maximum_mpfr_bits, quadrature_max_depth, quadrature_max_cells,
          event_max_cells,
          use_certified_traversal, traversal_exact_tile_pair_limit);
    } else if (mode == "borg-shadow-server-v0") {
      std::optional<IncrementalSnapshotCache> incremental_cache;
      while (std::cin.peek() != std::char_traits<char>::eof()) {
        bool request_boundary_consumed = false;
        try {
          run(
              maximum_mpfr_bits, quadrature_max_depth, quadrature_max_cells,
              event_max_cells,
              use_certified_traversal, traversal_exact_tile_pair_limit,
              &incremental_cache, &request_boundary_consumed);
        } catch (const std::exception& error) {
          incremental_cache.reset();
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
                   "[--maximum-mpfr-bits=N] "
                   "[--quadrature-max-depth=N] "
                   "[--quadrature-max-cells=N] "
                   "[--event-max-cells=N] "
                   "[--disable-certified-traversal] "
                   "[--traversal-exact-tile-pair-limit=N]\n";
      return EXIT_FAILURE;
    }
    return EXIT_SUCCESS;
  } catch (const std::exception& error) {
    std::cerr << "eom Borg shadow native request failed: " << error.what()
              << '\n';
    return EXIT_FAILURE;
  }
}
