#include "architrino/eom/CoupledEvolution.hpp"

#include <array>
#include <charconv>
#include <cstdlib>
#include <iomanip>
#include <iostream>
#include <limits>
#include <sstream>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

namespace eom = architrino::eom;

namespace {

struct ParsedPath {
  std::string path_id;
  std::string charge;
  int state_flags;
  std::size_t input_segment_count;
  eom::RetainedHistory history;
};

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

std::string read_required_line(const char* label) {
  std::string line;
  if (!std::getline(std::cin, line)) {
    throw std::invalid_argument(std::string("missing ") + label);
  }
  return line;
}

eom::CubicHistorySegment parse_segment(const std::string& line) {
  const auto fields = split_tabs(line);
  if (fields.size() != 17U || fields[0] != "SEG") {
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
      fields[1], fields[2], std::move(coefficients), fields[15], fields[16]);
}

void print_segment(const eom::CubicHistorySegment& segment) {
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
  std::cout << "],\"positionError\":\""
            << json_escape(segment.position_error_token())
            << "\",\"velocityError\":\""
            << json_escape(segment.velocity_error_token()) << "\"}";
}

void run(
    unsigned maximum_mpfr_bits,
    std::size_t quadrature_max_depth,
    std::size_t quadrature_max_cells,
    bool use_certified_traversal,
    std::uint64_t traversal_exact_tile_pair_limit) {
  if (read_required_line("protocol magic") != "EOM_BORG_NATIVE_V0") {
    throw std::invalid_argument("unsupported Borg EOM native protocol");
  }
  const auto run = split_tabs(read_required_line("RUN record"));
  if (run.size() != 15U || run[0] != "RUN") {
    throw std::invalid_argument("invalid RUN record");
  }
  const std::size_t path_count = parse_size(run[14], "path count");
  if (path_count == 0U || path_count > 1000000U) {
    throw std::invalid_argument("path count lies outside native protocol envelope");
  }
  std::vector<ParsedPath> parsed_paths;
  parsed_paths.reserve(path_count);
  for (std::size_t path_index = 0; path_index < path_count; ++path_index) {
    const auto path = split_tabs(read_required_line("PATH record"));
    if (path.size() != 5U || path[0] != "PATH" ||
        path[1].find_first_of("\t\r\n") != std::string::npos) {
      throw std::invalid_argument("invalid PATH record");
    }
    const std::size_t segment_count = parse_size(path[4], "segment count");
    if (segment_count == 0U || segment_count > 10000000U) {
      throw std::invalid_argument("segment count lies outside native protocol envelope");
    }
    std::vector<eom::CubicHistorySegment> segments;
    segments.reserve(segment_count);
    for (std::size_t segment_index = 0; segment_index < segment_count;
         ++segment_index) {
      segments.push_back(parse_segment(read_required_line("SEG record")));
    }
    std::string path_id = path[1];
    std::string charge = path[2];
    const int state_flags = parse_int(path[3], "state flags");
    parsed_paths.push_back({
        .path_id = path_id,
        .charge = charge,
        .state_flags = state_flags,
        .input_segment_count = segment_count,
        .history = eom::RetainedHistory(
            "borg-eom-shadow/" + path_id, std::move(segments)),
    });
  }
  if (read_required_line("END record") != "END") {
    throw std::invalid_argument("missing Borg EOM native END record");
  }
  eom::NativeCoupledEvolutionRequest request{
      .run_id = run[1],
      .paths = {},
      .start_time = run[2],
      .end_time = run[3],
      .initial_step = run[4],
      .minimum_step = run[5],
      .field_speed = run[6],
      .coupling = run[7],
      .root_tolerance = run[8],
      .source_normal_floor = "1e-30",
      .acceleration_tolerance = run[9],
      .chart_policy = "sharp_with_finite_width_fallback",
      .causal_width = "0.2",
      .core_scale = "0.2",
      .quadrature_tolerance = run[9],
      .event_impulse_tolerance = "1e-7",
      .regulator_refinement_ratio = "0.5",
      .regulator_convergence_tolerance = "1e-3",
      .position_tolerance = run[10],
      .velocity_tolerance = run[11],
      .correction_tolerance = run[12],
      .root_max_depth = 256,
      .root_max_cells = 500000,
      .quadrature_max_depth = quadrature_max_depth,
      .quadrature_max_cells = quadrature_max_cells,
      .event_max_depth = 24,
      .event_max_cells = 200000,
      .regulator_refinement_levels = 3,
      .initial_mpfr_bits = 128,
      .maximum_mpfr_bits = maximum_mpfr_bits,
      .force_event_precision_escalation = false,
      .max_correction_iterations = 12,
      .max_step_attempts = 1000,
      .max_rejected_steps = 100,
      .thread_count = 1,
  };
  request.thread_count = parse_size(run[13], "thread count");
  request.use_certified_traversal = use_certified_traversal;
  request.traversal_exact_tile_pair_limit = traversal_exact_tile_pair_limit;
  request.paths.reserve(parsed_paths.size());
  for (const auto& path : parsed_paths) {
    request.paths.push_back({path.path_id, path.charge, path.history});
  }
  const auto result = eom::evolve_native_coupled_histories(request);
  std::cout << "{\"schema\":\"eom_borg_native_response/v0\",\"status\":\""
            << json_escape(result.status) << "\",\"evidenceStatus\":\""
            << json_escape(result.evidence_status)
            << "\",\"acceptedEndTime\":\""
            << json_escape(result.accepted_end_time)
            << "\",\"acceptedStepCount\":" << result.accepted_step_count
            << ",\"rejectedStepCount\":" << result.rejected_step_count
            << ",\"haltCode\":\"" << json_escape(result.halt_code)
            << "\",\"timing\":{"
            << "\"historyWindowWallSeconds\":"
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
            << ",\"rootMpfrCpuSeconds\":"
            << result.timing.root_mpfr_cpu_seconds
            << ",\"rootMpfrPairCount\":"
            << result.timing.root_mpfr_pair_count
            << ",\"historyCopyHashWallSeconds\":"
            << result.timing.history_copy_hash_wall_seconds
            << ",\"correctionWallSeconds\":"
            << result.timing.correction_wall_seconds
            << ",\"reusedStartSnapshotCount\":"
            << result.timing.reused_start_snapshot_count
            << ",\"recertificationWallSeconds\":"
            << result.timing.recertification_wall_seconds
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
    const eom::NativeAccelerationSnapshotCertificate* diagnostic_snapshot =
        step.accepted_snapshot.has_value()
        ? &*step.accepted_snapshot
        : (step.substeps.empty() ? nullptr : &step.substeps.front().start_snapshot);
    std::cout << "{\"status\":\""
              << json_escape(step.status)
              << "\",\"failureCode\":\""
              << json_escape(step.failure_code)
              << "\",\"attemptedStart\":\""
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
              << ",\"traversalLogicalPairs\":"
              << (diagnostic_snapshot != nullptr &&
                          diagnostic_snapshot->traversal_certificate.has_value()
                      ? diagnostic_snapshot->traversal_certificate
                            ->logical_ordered_pairs
                      : (diagnostic_snapshot != nullptr
                             ? diagnostic_snapshot->root_certificates.size()
                             : 0U))
              << ",\"traversalUnresolvedPairs\":"
              << (diagnostic_snapshot != nullptr &&
                          diagnostic_snapshot->traversal_certificate.has_value()
                      ? diagnostic_snapshot->traversal_certificate
                            ->unresolved_pairs
                      : 0U)
              << ",\"traversalVisitedNodes\":"
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
        if (certificate.status == "certified_complete" &&
            !certificate.memory_boundary_contact) {
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
                  << "\",\"acceptedEventStatus\":\""
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
            std::cout << *series.final_impulse_delta;
          } else {
            std::cout << "null";
          }
          std::cout << ",\"maximumLadderImpulseDelta\":";
          if (series.maximum_ladder_impulse_delta.has_value()) {
            std::cout << *series.maximum_ladder_impulse_delta;
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
            std::cout << ",\"visitedCells\":" << event.visited_cells
                      << ",\"lastMaximumComponentWidth\":"
                      << event.last_maximum_component_width
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
      print_segment(published.history.segments()[segment_index]);
    }
    std::cout << "]}";
  }
  std::cout << "]}\n";
}

}  // namespace

int main(int argc, char** argv) {
  try {
    if (argc < 2) {
      std::cerr << "usage: eom_borg_shadow_cli "
                   "borg-shadow-v0|borg-shadow-server-v0 "
                   "[--maximum-mpfr-bits=N] "
                   "[--quadrature-max-depth=N] "
                   "[--quadrature-max-cells=N] "
                   "[--disable-certified-traversal] "
                   "[--traversal-exact-tile-pair-limit=N]\n";
      return EXIT_FAILURE;
    }
    unsigned maximum_mpfr_bits = 512;
    std::size_t quadrature_max_depth = 32;
    std::size_t quadrature_max_cells = 200000;
    bool use_certified_traversal = true;
    std::uint64_t traversal_exact_tile_pair_limit = 64;
    for (int argument_index = 2; argument_index < argc; ++argument_index) {
      const std::string option = argv[argument_index];
      constexpr const char* precision_prefix = "--maximum-mpfr-bits=";
      constexpr const char* depth_prefix = "--quadrature-max-depth=";
      constexpr const char* cells_prefix = "--quadrature-max-cells=";
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
    if (mode == "borg-shadow-v0") {
      run(
          maximum_mpfr_bits, quadrature_max_depth, quadrature_max_cells,
          use_certified_traversal, traversal_exact_tile_pair_limit);
    } else if (mode == "borg-shadow-server-v0") {
      while (std::cin.peek() != std::char_traits<char>::eof()) {
        run(
            maximum_mpfr_bits, quadrature_max_depth, quadrature_max_cells,
            use_certified_traversal, traversal_exact_tile_pair_limit);
        std::cout.flush();
      }
    } else {
      std::cerr << "usage: eom_borg_shadow_cli "
                   "borg-shadow-v0|borg-shadow-server-v0 "
                   "[--maximum-mpfr-bits=N] "
                   "[--quadrature-max-depth=N] "
                   "[--quadrature-max-cells=N] "
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
