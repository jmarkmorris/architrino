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

void run() {
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
      .quadrature_max_depth = 32,
      .quadrature_max_cells = 200000,
      .event_max_depth = 24,
      .event_max_cells = 200000,
      .regulator_refinement_levels = 3,
      .initial_mpfr_bits = 128,
      .maximum_mpfr_bits = 512,
      .force_event_precision_escalation = false,
      .max_correction_iterations = 12,
      .max_step_attempts = 1000,
      .max_rejected_steps = 100,
      .thread_count = 1,
  };
  request.thread_count = parse_size(run[13], "thread count");
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
            << "\",\"stepFailures\":[";
  for (std::size_t step_index = 0; step_index < result.steps.size();
       ++step_index) {
    if (step_index > 0U) {
      std::cout << ',';
    }
    std::cout << "{\"status\":\""
              << json_escape(result.steps[step_index].status)
              << "\",\"failureCode\":\""
              << json_escape(result.steps[step_index].failure_code)
              << "\",\"attemptedStart\":\""
              << json_escape(result.steps[step_index].attempted_start)
              << "\",\"attemptedEnd\":\""
              << json_escape(result.steps[step_index].attempted_end)
              << "\",\"rootFailures\":[";
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
                  << '}';
      }
    };
    for (const auto& substep : result.steps[step_index].substeps) {
      print_snapshot_failures(substep.start_snapshot);
      if (substep.endpoint_snapshot.has_value()) {
        print_snapshot_failures(*substep.endpoint_snapshot);
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
    if (argc != 2 || std::string(argv[1]) != "borg-shadow-v0") {
      std::cerr << "usage: eom_borg_shadow_cli borg-shadow-v0\n";
      return EXIT_FAILURE;
    }
    run();
    return EXIT_SUCCESS;
  } catch (const std::exception& error) {
    std::cerr << "eom Borg shadow native request failed: " << error.what()
              << '\n';
    return EXIT_FAILURE;
  }
}
