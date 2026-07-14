#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/History.hpp"

#include <array>
#include <cstdlib>
#include <iomanip>
#include <iostream>
#include <stdexcept>
#include <string>
#include <vector>

namespace eom = architrino::eom;

namespace {

eom::RetainedHistory history(
    const std::string& id,
    const std::string& end,
    const std::array<std::string, 4>& x) {
  return eom::RetainedHistory(
      id,
      {eom::CubicHistorySegment(
          "0", end,
          eom::CubicCoefficientTokens{
              x, {"0", "0", "0", "0"}, {"0", "0", "0", "0"}})});
}

eom::NativeCoupledEvolutionRequest request(
    const std::string& run_id,
    std::vector<eom::NativeCoupledPathInput> paths,
    const std::string& start,
    const std::string& end,
    const std::string& step,
    const std::string& minimum_step,
    const std::string& position_tolerance = "1e-8",
    const std::string& velocity_tolerance = "1e-8",
    const std::string& correction_tolerance = "1e-8",
    const std::string& coupling = "1",
    std::size_t max_correction_iterations = 12,
    std::size_t thread_count = 4) {
  return {
      .run_id = run_id,
      .paths = std::move(paths),
      .start_time = start,
      .end_time = end,
      .initial_step = step,
      .minimum_step = minimum_step,
      .field_speed = "1",
      .coupling = coupling,
      .root_tolerance = "1e-7",
      .source_normal_floor = "1e-24",
      .acceleration_tolerance = "1e-5",
      .position_tolerance = position_tolerance,
      .velocity_tolerance = velocity_tolerance,
      .correction_tolerance = correction_tolerance,
      .root_max_depth = 192,
      .root_max_cells = 300000,
      .initial_mpfr_bits = 128,
      .maximum_mpfr_bits = 512,
      .max_correction_iterations = max_correction_iterations,
      .max_step_attempts = 100,
      .max_rejected_steps = 20,
      .thread_count = thread_count,
  };
}

void print_interval(const eom::Interval& interval) {
  std::cout << "{\"lower\":" << interval.lower()
            << ",\"upper\":" << interval.upper() << '}';
}

void print_vector(const eom::IntervalVector& vector) {
  std::cout << '[';
  for (std::size_t index = 0; index < vector.size(); ++index) {
    if (index > 0) {
      std::cout << ',';
    }
    print_interval(vector[index]);
  }
  std::cout << ']';
}

void print_histories(
    const std::vector<eom::NativePublishedPath>& histories,
    const std::string& time) {
  std::cout << '[';
  for (std::size_t index = 0; index < histories.size(); ++index) {
    if (index > 0) {
      std::cout << ',';
    }
    const auto& path = histories[index];
    const eom::Interval endpoint =
        eom::Interval::point(eom::Interval::decimal_token(time).midpoint());
    std::cout << "{\"path_id\":\"" << path.path_id
              << "\",\"fingerprint\":\""
              << path.history.provenance_fingerprint()
              << "\",\"segment_count\":" << path.history.segments().size()
              << ",\"position\":";
    print_vector(path.history.position_hull(endpoint));
    std::cout << ",\"velocity\":";
    print_vector(path.history.velocity_hull(endpoint));
    std::cout << '}';
  }
  std::cout << ']';
}

void print_steps(const std::vector<eom::NativeAtomicStepCertificate>& steps) {
  std::cout << '[';
  for (std::size_t index = 0; index < steps.size(); ++index) {
    if (index > 0) {
      std::cout << ',';
    }
    const auto& step = steps[index];
    std::cout << "{\"status\":\"" << step.status
              << "\",\"failure_code\":\"" << step.failure_code
              << "\",\"attempted_start\":\"" << step.attempted_start
              << "\",\"attempted_end\":\"" << step.attempted_end
              << "\",\"accepted_time\":\"" << step.accepted_time
              << "\",\"publication_atomic\":"
              << (step.publication_atomic ? "true" : "false")
              << ",\"substep_count\":" << step.substeps.size()
              << ",\"accepted_ordered_pairs\":"
              << (step.accepted_snapshot.has_value()
                      ? step.accepted_snapshot->acceleration.logical_ordered_pairs
                      : 0U)
              << ",\"correction_iterations\":[";
    for (std::size_t substep_index = 0;
         substep_index < step.substeps.size(); ++substep_index) {
      if (substep_index > 0) {
        std::cout << ',';
      }
      std::cout << step.substeps[substep_index].correction_iterations;
    }
    std::cout << "]"
              << ",\"local_errors\":[";
    for (std::size_t error_index = 0;
         error_index < step.local_errors.size(); ++error_index) {
      if (error_index > 0) {
        std::cout << ',';
      }
      const auto& error = step.local_errors[error_index];
      std::cout << "{\"path_id\":\"" << error.path_id
                << "\",\"position_error\":" << error.position_error
                << ",\"velocity_error\":" << error.velocity_error << '}';
    }
    std::cout << "]}";
  }
  std::cout << ']';
}

void print_evolution(
    const eom::NativeCoupledEvolutionCertificate& certificate) {
  std::cout << "{\"schema\":\"" << certificate.schema
            << "\",\"status\":\"" << certificate.status
            << "\",\"run_id\":\"" << certificate.run_id
            << "\",\"accepted_end_time\":\""
            << certificate.accepted_end_time
            << "\",\"accepted_step_count\":"
            << certificate.accepted_step_count
            << ",\"rejected_step_count\":"
            << certificate.rejected_step_count
            << ",\"halt_code\":\"" << certificate.halt_code
            << "\",\"all_steps_atomic\":"
            << (certificate.all_steps_atomic ? "true" : "false")
            << ",\"evidence_status\":\"" << certificate.evidence_status
            << "\",\"histories\":";
  print_histories(certificate.histories, certificate.accepted_end_time);
  std::cout << ",\"steps\":";
  print_steps(certificate.steps);
  std::cout << '}';
}

void print_atomic(const eom::NativeAtomicStepCertificate& certificate) {
  std::cout << "{\"schema\":\"" << certificate.schema
            << "\",\"status\":\"" << certificate.status
            << "\",\"failure_code\":\"" << certificate.failure_code
            << "\",\"accepted_time\":\"" << certificate.accepted_time
            << "\",\"publication_atomic\":"
            << (certificate.publication_atomic ? "true" : "false")
            << ",\"input_fingerprints\":[";
  for (std::size_t index = 0;
       index < certificate.input_history_fingerprints.size(); ++index) {
    if (index > 0) {
      std::cout << ',';
    }
    const auto& fingerprint = certificate.input_history_fingerprints[index];
    std::cout << "[\"" << fingerprint.path_id << "\",\""
              << fingerprint.fingerprint << "\"]";
  }
  std::cout << "],\"published_fingerprints\":[";
  for (std::size_t index = 0;
       index < certificate.published_histories.size(); ++index) {
    if (index > 0) {
      std::cout << ',';
    }
    const auto& path = certificate.published_histories[index];
    std::cout << "[\"" << path.path_id << "\",\""
              << path.history.provenance_fingerprint() << "\"]";
  }
  std::cout << "],\"candidate_fingerprint_count\":"
            << certificate.candidate_history_fingerprints.size()
            << ",\"substep_count\":" << certificate.substeps.size()
            << '}';
}

void print_all() {
  const auto static_request = request(
      "static-multistep",
      {{"p", "1", history("static-self-history", "2", {"0", "0", "0", "0"})}},
      "2", "2.2", "0.1", "0.1");
  const auto static_result =
      eom::evolve_native_coupled_histories(static_request);

  const auto fast_request = request(
      "fast-inertial",
      {{"p", "1", history("fast-self-history", "2", {"0", "2", "0", "0"})}},
      "2", "2.1", "0.1", "0.1");
  const auto fast_result = eom::evolve_native_coupled_histories(fast_request);

  const auto binary_request = request(
      "binary-coupled-step",
      {{"a", "1", history("path-a-history", "5", {"0", "0", "0", "0"})},
       {"b", "-1", history("path-b-history", "5", {"2", "0", "0", "0"})}},
      "5", "5.01", "0.01", "0.01", "1e-5", "1e-5", "1e-7");
  const auto binary_result =
      eom::evolve_native_coupled_histories(binary_request);
  auto binary_single_thread_request = binary_request;
  binary_single_thread_request.thread_count = 1;
  const auto binary_single_thread_result =
      eom::evolve_native_coupled_histories(binary_single_thread_request);

  const auto adaptive_request = request(
      "adaptive-halving",
      {{"a", "1", history("adaptive-a", "5", {"0", "0", "0", "0"})},
       {"b", "-1", history("adaptive-b", "5", {"2", "0", "0", "0"})}},
      "5", "5.05", "0.05", "0.00625", "5e-10", "2e-8", "1e-7");
  const auto adaptive_result =
      eom::evolve_native_coupled_histories(adaptive_request);

  const auto rejected_request = request(
      "binary-rejected-step",
      {{"a", "1", history("reject-a-history", "5", {"0", "0", "0", "0"})},
       {"b", "-1", history("reject-b-history", "5", {"2", "0", "0", "0"})}},
      "5", "5.1", "0.1", "0.1", "1e-30", "1e-30", "1e-7");
  std::vector<eom::NativePublishedPath> rejected_histories;
  for (const auto& path : rejected_request.paths) {
    rejected_histories.push_back({path.path_id, path.history});
  }
  const auto rejected_step = eom::certify_native_atomic_coupled_step(
      rejected_request, rejected_histories, 0, "5", "5.1");

  const auto memory_request = request(
      "memory-rejection",
      {{"receiver", "1", history("memory-receiver", "2", {"0", "0", "0", "0"})},
       {"source", "-1", history("memory-source", "2", {"2", "0", "0", "0"})}},
      "2", "2.01", "0.01", "0.01");
  std::vector<eom::NativePublishedPath> memory_histories;
  for (const auto& path : memory_request.paths) {
    memory_histories.push_back({path.path_id, path.history});
  }
  const auto memory_step = eom::certify_native_atomic_coupled_step(
      memory_request, memory_histories, 0, "2", "2.01");

  const auto correction_request = request(
      "correction-exhaustion",
      {{"a", "1", history("correction-a", "5", {"0", "0", "0", "0"})},
       {"b", "-1", history("correction-b", "5", {"2", "0", "0", "0"})}},
      "5", "5.01", "0.01", "0.01", "1e-5", "1e-5", "1e-50", "1", 1);
  std::vector<eom::NativePublishedPath> correction_histories;
  for (const auto& path : correction_request.paths) {
    correction_histories.push_back({path.path_id, path.history});
  }
  const auto correction_step = eom::certify_native_atomic_coupled_step(
      correction_request, correction_histories, 0, "5", "5.01");

  const auto event_request = request(
      "root-event-subdivision",
      {{"receiver", "1", history("event-receiver", "2.7", {"0", "0", "0", "0"})},
       {"source", "1", history("event-source", "2.7", {"5", "-4", "1", "0"})}},
      "2.7", "2.8", "0.1", "0.1", "1", "1", "1e-7", "1e-30");
  std::vector<eom::NativePublishedPath> event_histories;
  for (const auto& path : event_request.paths) {
    event_histories.push_back({path.path_id, path.history});
  }
  const auto event_step = eom::certify_native_atomic_coupled_step(
      event_request, event_histories, 0, "2.7", "2.8");

  bool future_history_rejected = false;
  try {
    const auto future_request = request(
        "future-input",
        {{"p", "1", history("future-history", "2.1", {"0", "0", "0", "0"})}},
        "2", "2.2", "0.1", "0.1");
    static_cast<void>(eom::evolve_native_coupled_histories(future_request));
  } catch (const std::invalid_argument&) {
    future_history_rejected = true;
  }

  std::cout << std::setprecision(17)
            << "{\"schema\":\"eom_native_evolution_fixture_packet/v0\","
            << "\"integration_method\":\"" << eom::kNativeIntegrationMethod
            << "\",\"future_history_rejected\":"
            << (future_history_rejected ? "true" : "false")
            << ",\"evolutions\":[";
  print_evolution(static_result);
  std::cout << ',';
  print_evolution(fast_result);
  std::cout << ',';
  print_evolution(binary_result);
  std::cout << ',';
  print_evolution(adaptive_result);
  std::cout << "],\"binary_single_thread\":";
  print_evolution(binary_single_thread_result);
  std::cout << ",\"rejections\":[";
  print_atomic(rejected_step);
  std::cout << ',';
  print_atomic(memory_step);
  std::cout << ',';
  print_atomic(correction_step);
  std::cout << ',';
  print_atomic(event_step);
  std::cout << "]}\n";
}

}  // namespace

int main(int argc, char** argv) {
  try {
    if (argc != 2 || std::string(argv[1]) != "all") {
      std::cerr << "usage: eom_native_evolution_fixture_cli all\n";
      return EXIT_FAILURE;
    }
    print_all();
    return EXIT_SUCCESS;
  } catch (const std::exception& error) {
    std::cerr << "eom native evolution fixture failed: " << error.what() << '\n';
    return EXIT_FAILURE;
  }
}
