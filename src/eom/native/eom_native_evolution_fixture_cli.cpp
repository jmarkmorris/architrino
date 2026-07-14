#include "architrino/eom/Checkpoint.hpp"
#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/History.hpp"

#include <array>
#include <cstdlib>
#include <filesystem>
#include <iomanip>
#include <iostream>
#include <stdexcept>
#include <string>
#include <vector>

#include <unistd.h>

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
              << ",\"pair_selection_route\":\""
              << (step.accepted_snapshot.has_value()
                      ? step.accepted_snapshot->pair_selection_route
                      : "none")
              << "\",\"traversal_excluded_pairs\":"
              << (step.accepted_snapshot.has_value()
                      ? step.accepted_snapshot->traversal_excluded_pairs
                      : 0U)
              << ",\"traversal_exact_pairs\":"
              << (step.accepted_snapshot.has_value()
                      ? step.accepted_snapshot->traversal_exact_pairs
                      : 0U)
              << ",\"history_window_status\":\""
              << (step.accepted_snapshot.has_value()
                      ? step.accepted_snapshot->causal_prefix_exclusion.status
                      : "none")
              << "\",\"history_window_original_lower\":\""
              << (step.accepted_snapshot.has_value()
                      ? step.accepted_snapshot->causal_prefix_exclusion
                            .original_search_lower
                      : "")
              << "\",\"history_window_active_lower\":\""
              << (step.accepted_snapshot.has_value()
                      ? step.accepted_snapshot->causal_prefix_exclusion
                            .active_search_lower
                      : "")
              << "\",\"history_window_excluded_duration\":"
              << (step.accepted_snapshot.has_value()
                      ? step.accepted_snapshot->causal_prefix_exclusion
                            .excluded_duration
                      : 0.0)
              << ",\"history_window_residual_upper\":"
              << (step.accepted_snapshot.has_value()
                      ? step.accepted_snapshot->causal_prefix_exclusion
                            .residual_upper
                      : 0.0)
              << ",\"reused_start_snapshot_count\":"
              << step.timing.reused_start_snapshot_count
              << ",\"correction_iterations\":[";
    for (std::size_t substep_index = 0;
         substep_index < step.substeps.size(); ++substep_index) {
      if (substep_index > 0) {
        std::cout << ',';
      }
      std::cout << step.substeps[substep_index].correction_iterations;
    }
    std::size_t event_impulse_count = 0;
    std::size_t regulator_certificate_count = 0;
    for (const auto& substep : step.substeps) {
      event_impulse_count += substep.event_impulses.size();
      regulator_certificate_count +=
          substep.regulator_convergence_certificates.size();
    }
    std::cout << "]"
              << ",\"event_impulse_count\":" << event_impulse_count
              << ",\"regulator_certificate_count\":"
              << regulator_certificate_count
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
  const eom::NativeCausalPrefixExclusionCertificate* history_window =
      !certificate.substeps.empty()
      ? &certificate.substeps.front().start_snapshot.causal_prefix_exclusion
      : (certificate.accepted_snapshot.has_value()
             ? &certificate.accepted_snapshot->causal_prefix_exclusion
             : nullptr);
  std::cout << "{\"schema\":\"" << certificate.schema
            << "\",\"status\":\"" << certificate.status
            << "\",\"failure_code\":\"" << certificate.failure_code
            << "\",\"accepted_time\":\"" << certificate.accepted_time
            << "\",\"publication_atomic\":"
            << (certificate.publication_atomic ? "true" : "false")
            << ",\"integration_method\":\""
            << certificate.integration_method << "\""
            << ",\"history_window_status\":\""
            << (history_window != nullptr ? history_window->status : "none")
            << "\",\"history_window_original_lower\":\""
            << (history_window != nullptr
                    ? history_window->original_search_lower
                    : "")
            << "\",\"history_window_active_lower\":\""
            << (history_window != nullptr
                    ? history_window->active_search_lower
                    : "")
            << "\""
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
            << ",\"event_impulse_count\":";
  std::size_t event_impulse_count = 0;
  std::size_t regulator_certificate_count = 0;
  for (const auto& substep : certificate.substeps) {
    event_impulse_count += substep.event_impulses.size();
    regulator_certificate_count +=
        substep.regulator_convergence_certificates.size();
  }
  std::cout << event_impulse_count
            << ",\"regulator_certificate_count\":"
            << regulator_certificate_count
            << ",\"local_errors\":[";
  for (std::size_t index = 0; index < certificate.local_errors.size(); ++index) {
    if (index > 0) {
      std::cout << ',';
    }
    const auto& error = certificate.local_errors[index];
    std::cout << "{\"path_id\":\"" << error.path_id
              << "\",\"position_error\":" << error.position_error
              << ",\"velocity_error\":" << error.velocity_error << '}';
  }
  std::cout << "],\"pinned_fold_temporal_certificates\":[";
  bool first_certificate = true;
  for (const auto& substep : certificate.substeps) {
    for (const auto& pinned : substep.pinned_fold_onset_certificates) {
      if (!first_certificate) {
        std::cout << ',';
      }
      first_certificate = false;
      std::cout << "{\"schema\":\"" << pinned.schema
                << "\",\"status\":\"" << pinned.status
                << "\",\"path_id\":\"" << pinned.path_id
                << "\",\"onset_time\":\"" << pinned.onset_time
                << "\",\"history_fingerprint\":\""
                << pinned.history_fingerprint
                << "\",\"tangential_speed\":\""
                << pinned.tangential_speed
                << "\",\"field_speed\":\"" << pinned.field_speed
                << "\",\"start_root_status\":\""
                << pinned.start_root_status
                << "\",\"start_root_count\":" << pinned.start_root_count
                << ",\"start_root_free_complement\":"
                << (pinned.start_root_free_complement ? "true" : "false")
                << ",\"memory_boundary_clear\":"
                << (pinned.memory_boundary_clear ? "true" : "false")
                << ",\"coincident_endpoint_excluded\":"
                << (pinned.coincident_endpoint_excluded ? "true" : "false")
                << ",\"start_acceleration_chart\":\""
                << pinned.start_acceleration_chart
                << "\",\"temporal_rule\":\"" << pinned.temporal_rule
                << "\"}";
    }
  }
  std::cout << "]}";
}

void print_event(
    const eom::NativeFoldCausticImpulseCertificate& certificate) {
  std::cout << "{\"schema\":\"" << certificate.schema
            << "\",\"status\":\"" << certificate.status
            << "\",\"failure_code\":\"" << certificate.failure_code
            << "\",\"visited_cells\":" << certificate.visited_cells
            << ",\"precision_route\":\"" << certificate.precision_route
            << "\",\"precision_bits\":" << certificate.precision_bits
            << ",\"impulse\":";
  if (certificate.impulse.has_value()) {
    print_vector(*certificate.impulse);
  } else {
    std::cout << "null";
  }
  std::cout << '}';
}

void print_regulator(
    const eom::NativeRegulatorConvergenceCertificate& certificate) {
  std::cout << "{\"schema\":\"" << certificate.schema
            << "\",\"status\":\"" << certificate.status
            << "\",\"failure_code\":\"" << certificate.failure_code
            << "\",\"required_levels\":" << certificate.required_levels
            << ",\"series\":[";
  for (std::size_t series_index = 0;
       series_index < certificate.refinement_series.size(); ++series_index) {
    if (series_index > 0) {
      std::cout << ',';
    }
    const auto& series = certificate.refinement_series[series_index];
    std::cout << "{\"control_id\":\"" << series.control_id
              << "\",\"converged\":"
              << (series.converged ? "true" : "false")
              << ",\"final_impulse_delta\":";
    if (series.final_impulse_delta.has_value()) {
      std::cout << *series.final_impulse_delta;
    } else {
      std::cout << "null";
    }
    std::cout << ",\"maximum_ladder_impulse_delta\":";
    if (series.maximum_ladder_impulse_delta.has_value()) {
      std::cout << *series.maximum_ladder_impulse_delta;
    } else {
      std::cout << "null";
    }
    std::cout << ",\"levels\":[";
    for (std::size_t level_index = 0; level_index < series.levels.size();
         ++level_index) {
      if (level_index > 0) {
        std::cout << ',';
      }
      const auto& level = series.levels[level_index];
      std::cout << "{\"level\":" << level.level
                << ",\"causal_width\":\"" << level.causal_width
                << "\",\"core_scale\":\"" << level.core_scale
                << "\",\"status\":\"" << level.event_impulse.status
                << "\",\"precision_route\":\""
                << level.event_impulse.precision_route
                << "\",\"precision_bits\":"
                << level.event_impulse.precision_bits
                << ",\"maximum_impulse_delta_from_previous\":";
      if (level.maximum_impulse_delta_from_previous.has_value()) {
        std::cout << *level.maximum_impulse_delta_from_previous;
      } else {
        std::cout << "null";
      }
      std::cout << '}';
    }
    std::cout << "]}";
  }
  std::cout << "]}";
}

void print_pinned_fold_temporal_onset(
    const std::vector<eom::NativePinnedFoldTemporalStepCertificate>&
        certificates) {
  std::cout << '[';
  for (std::size_t index = 0; index < certificates.size(); ++index) {
    if (index > 0) {
      std::cout << ',';
    }
    const auto& pinned = certificates[index];
    std::cout << "{\"schema\":\"" << pinned.schema
              << "\",\"status\":\"" << pinned.status
              << "\",\"path_id\":\"" << pinned.path_id
              << "\",\"onset_time\":\"" << pinned.onset_time
              << "\",\"history_fingerprint\":\""
              << pinned.history_fingerprint
              << "\",\"tangential_speed\":\""
              << pinned.tangential_speed
              << "\",\"field_speed\":\"" << pinned.field_speed
              << "\",\"start_root_status\":\""
              << pinned.start_root_status
              << "\",\"start_root_count\":" << pinned.start_root_count
              << ",\"start_root_free_complement\":"
              << (pinned.start_root_free_complement ? "true" : "false")
              << ",\"memory_boundary_clear\":"
              << (pinned.memory_boundary_clear ? "true" : "false")
              << ",\"coincident_endpoint_excluded\":"
              << (pinned.coincident_endpoint_excluded ? "true" : "false")
              << ",\"start_acceleration_chart\":\""
              << pinned.start_acceleration_chart
              << "\",\"temporal_rule\":\"" << pinned.temporal_rule
              << "\"}";
  }
  std::cout << ']';
}

void print_all() {
  const auto static_request = request(
      "static-multistep",
      {{"p", "1", history("static-self-history", "2", {"0", "0", "0", "0"})}},
      "2", "2.2", "0.1", "0.1");
  const auto static_result =
      eom::evolve_native_coupled_histories(static_request);
  auto static_growth_request = request(
      "static-adaptive-growth",
      {{"p", "1", history("static-growth-history", "2", {"0", "0", "0", "0"})}},
      "2", "2.08", "0.01", "0.01");
  static_growth_request.maximum_step = "0.04";
  static_growth_request.use_adaptive_step_growth = true;
  const auto static_growth_result =
      eom::evolve_native_coupled_histories(static_growth_request);

  auto checkpoint_partial_request = static_request;
  checkpoint_partial_request.run_id = "static-checkpoint-restart";
  checkpoint_partial_request.end_time =
      static_result.steps.front().accepted_time;
  const auto checkpoint_partial_result =
      eom::evolve_native_coupled_histories(checkpoint_partial_request);
  const auto checkpoint = eom::create_native_evolution_checkpoint(
      checkpoint_partial_request, checkpoint_partial_result);
  const auto checkpoint_bytes =
      eom::serialize_native_evolution_checkpoint(checkpoint);
  const auto checkpoint_roundtrip =
      eom::deserialize_native_evolution_checkpoint(checkpoint_bytes);
  const auto checkpoint_resumed = eom::resume_native_coupled_histories(
      checkpoint_partial_request, checkpoint_roundtrip, static_request.end_time);
  auto checkpoint_direct_request = static_request;
  checkpoint_direct_request.run_id = checkpoint_partial_request.run_id;
  const auto checkpoint_direct =
      eom::evolve_native_coupled_histories(checkpoint_direct_request);
  bool checkpoint_tamper_rejected = false;
  auto tampered_checkpoint_bytes = checkpoint_bytes;
  tampered_checkpoint_bytes[tampered_checkpoint_bytes.size() / 2U] ^= 1U;
  try {
    static_cast<void>(
        eom::deserialize_native_evolution_checkpoint(tampered_checkpoint_bytes));
  } catch (const std::invalid_argument&) {
    checkpoint_tamper_rejected = true;
  }
  const std::filesystem::path checkpoint_path =
      std::filesystem::temp_directory_path() /
      ("eom-native-checkpoint-fixture-" +
       std::to_string(static_cast<long long>(::getpid())) + ".bin");
  eom::write_native_evolution_checkpoint_atomic(
      checkpoint_path.string(), checkpoint);
  const auto checkpoint_file_roundtrip =
      eom::read_native_evolution_checkpoint(checkpoint_path.string());
  std::filesystem::remove(checkpoint_path);

  const auto circular_history = eom::RetainedHistory::uniform_circular(
      "checkpoint-circular-history",
      {
          .t_start = "-1",
          .t_end = "0",
          .maximum_segment_step = "0.02",
          .cylindrical_radius = "1",
          .height = "0",
          .angular_speed = "0.9",
          .tangential_speed = "0.9",
          .phase = "0.2",
          .tilt_x = "0.1",
          .tilt_y = "-0.2",
      });
  const auto circular_checkpoint_request = request(
      "circular-checkpoint-restart", {{"p", "1", circular_history}},
      "0", "0.001", "0.001", "0.001", "1e-5", "1e-5", "1e-7");
  const auto circular_checkpoint_result =
      eom::evolve_native_coupled_histories(circular_checkpoint_request);
  const auto circular_checkpoint = eom::create_native_evolution_checkpoint(
      circular_checkpoint_request, circular_checkpoint_result);
  const auto circular_checkpoint_roundtrip =
      eom::deserialize_native_evolution_checkpoint(
          eom::serialize_native_evolution_checkpoint(circular_checkpoint));
  const auto& circular_roundtrip_certificate = circular_checkpoint_roundtrip
      .paths.front().history.uniform_circular_endpoint_certificate();
  const bool circular_certificate_preserved =
      circular_roundtrip_certificate.has_value() &&
      circular_roundtrip_certificate->valid_start_time == "-1" &&
      circular_roundtrip_certificate->valid_reception_time == "0" &&
      circular_checkpoint.paths.front().history.provenance_fingerprint() ==
          circular_checkpoint_roundtrip.paths.front()
              .history.provenance_fingerprint();

  const auto pinned_temporal_history = eom::RetainedHistory::uniform_circular(
      "pinned-temporal-history",
      {
          .t_start = "-1",
          .t_end = "0",
          .maximum_segment_step = "0.02",
          .cylindrical_radius = "1",
          .height = "0",
          .angular_speed = "1",
          .tangential_speed = "1",
          .phase = "0",
          .tilt_x = "0",
          .tilt_y = "0",
      });
  auto pinned_temporal_request = request(
      "pinned-fold-temporal-step", {{"p", "1", pinned_temporal_history}},
      "0", "0.001", "0.001", "0.001", "1", "1", "2e-7");
  pinned_temporal_request.chart_policy =
      "sharp_with_finite_width_fallback";
  pinned_temporal_request.root_tolerance = "1e-5";
  pinned_temporal_request.causal_width = "0.05";
  pinned_temporal_request.core_scale = "0.05";
  pinned_temporal_request.acceleration_tolerance = "0.005";
  pinned_temporal_request.quadrature_tolerance = "0.005";
  pinned_temporal_request.quadrature_max_depth = 32;
  pinned_temporal_request.quadrature_max_cells = 300000;
  std::vector<eom::NativePublishedPath> pinned_temporal_histories{
      {"p", pinned_temporal_history}};
  const auto pinned_temporal_snapshot =
      eom::certify_native_acceleration_snapshot(
          pinned_temporal_request, pinned_temporal_histories, "0");
  const auto pinned_temporal_onset =
      eom::certify_native_pinned_fold_temporal_onset(
          pinned_temporal_request, pinned_temporal_histories,
          pinned_temporal_snapshot, "0");
  auto pinned_temporal_legacy_request = pinned_temporal_request;
  pinned_temporal_legacy_request.run_id = "pinned-fold-temporal-step-legacy";
  pinned_temporal_legacy_request.use_pinned_fold_aware_temporal_step = false;
  const auto pinned_temporal_disabled_onset =
      eom::certify_native_pinned_fold_temporal_onset(
          pinned_temporal_legacy_request, pinned_temporal_histories,
          pinned_temporal_snapshot, "0");

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
  auto binary_window_disabled_request = binary_request;
  binary_window_disabled_request.run_id = "binary-history-window-disabled";
  binary_window_disabled_request.use_certified_history_window = false;
  const auto binary_window_disabled_result =
      eom::evolve_native_coupled_histories(binary_window_disabled_request);
  auto binary_single_thread_request = binary_request;
  binary_single_thread_request.thread_count = 1;
  const auto binary_single_thread_result =
      eom::evolve_native_coupled_histories(binary_single_thread_request);

  auto traversal_exclusion_request = request(
      "traversal-exclusion-coupled-step",
      {{"a", "1", history("far-a-history", "2", {"0", "0", "0", "0"})},
       {"b", "-1", history("far-b-history", "2", {"100", "0", "0", "0"})}},
      "2", "2.1", "0.1", "0.1");
  traversal_exclusion_request.traversal_exact_tile_pair_limit = 1;
  const auto traversal_exclusion_result =
      eom::evolve_native_coupled_histories(traversal_exclusion_request);

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

  auto finite_event_request = event_request;
  finite_event_request.run_id = "root-event-finite-width";
  finite_event_request.chart_policy = "sharp_with_finite_width_fallback";
  finite_event_request.causal_width = "0.25";
  finite_event_request.core_scale = "0.2";
  finite_event_request.acceleration_tolerance = "5e-3";
  finite_event_request.quadrature_tolerance = "5e-3";
  finite_event_request.event_impulse_tolerance = "0.08";
  finite_event_request.regulator_convergence_tolerance = "0.08";
  finite_event_request.regulator_refinement_levels = 3;
  finite_event_request.quadrature_max_depth = 28;
  finite_event_request.quadrature_max_cells = 200000;
  finite_event_request.event_max_depth = 24;
  finite_event_request.event_max_cells = 200000;
  const auto finite_event_step = eom::certify_native_atomic_coupled_step(
      finite_event_request, event_histories, 0, "2.7", "2.8");
  auto finite_event_single_thread_request = finite_event_request;
  finite_event_single_thread_request.thread_count = 1;
  const auto finite_event_single_thread_step =
      eom::certify_native_atomic_coupled_step(
          finite_event_single_thread_request, event_histories, 0, "2.7", "2.8");
  auto finite_event_resource_request = finite_event_request;
  finite_event_resource_request.run_id = "root-event-resource-failure";
  finite_event_resource_request.event_impulse_tolerance = "1e-20";
  finite_event_resource_request.event_max_cells = 1;
  const auto finite_event_resource_step =
      eom::certify_native_atomic_coupled_step(
          finite_event_resource_request, event_histories, 0, "2.7", "2.8");

  const eom::NativePublishedPath event_receiver{
      "receiver", history("event-control-receiver", "3.01", {"0", "0", "0", "0"})};
  const eom::NativePublishedPath event_source{
      "source", history("event-control-source", "3.01", {"5.25", "-4", "1", "0"})};
  auto event_control_request = request(
      "event-control", {}, "2.99", "3.01", "0.02", "0.02");
  event_control_request.causal_width = "0.25";
  event_control_request.core_scale = "0.2";
  event_control_request.event_impulse_tolerance = "0.08";
  event_control_request.regulator_convergence_tolerance = "0.08";
  event_control_request.regulator_refinement_levels = 3;
  event_control_request.event_max_depth = 24;
  event_control_request.event_max_cells = 200000;
  const auto event_control = eom::certify_native_fold_caustic_impulse(
      event_control_request, event_receiver, event_source, "1", "1",
      "2.99", "3.01");
  const auto event_regulator = eom::certify_native_regulator_convergence(
      event_control_request, event_receiver, event_source, "1", "1",
      "2.99", "3.01");
  auto event_mpfr_request = event_control_request;
  event_mpfr_request.force_event_precision_escalation = true;
  const auto event_mpfr = eom::certify_native_fold_caustic_impulse(
      event_mpfr_request, event_receiver, event_source, "1", "1",
      "2.99", "3.01");
  auto event_nonconvergent_request = event_control_request;
  event_nonconvergent_request.regulator_convergence_tolerance = "1e-12";
  const auto event_nonconvergent = eom::certify_native_regulator_convergence(
      event_nonconvergent_request, event_receiver, event_source, "1", "1",
      "2.99", "3.01");
  auto event_resource_request = event_control_request;
  event_resource_request.event_impulse_tolerance = "1e-20";
  event_resource_request.event_max_depth = 4;
  event_resource_request.event_max_cells = 4;
  const auto event_resource_failure = eom::certify_native_fold_caustic_impulse(
      event_resource_request, event_receiver, event_source, "1", "1",
      "2.99", "3.01");

  const auto endpoint_continuation_request = request(
      "coincident-endpoint-continuation",
      {{"self", "1",
        history("endpoint-continuation-history", "0.6",
                {"0", "0", "1", "0"})}},
      "0.4", "0.6", "0.2", "0.2", "1e-8", "1e-8", "1e-8",
      "1e-30");
  std::vector<eom::NativePublishedPath> endpoint_continuation_histories;
  endpoint_continuation_histories.push_back({
      "self", endpoint_continuation_request.paths.front().history});
  const auto endpoint_continuation_start =
      eom::certify_native_acceleration_snapshot(
          endpoint_continuation_request,
          endpoint_continuation_histories, "0.4");
  const auto endpoint_continuation_end =
      eom::certify_native_acceleration_snapshot(
          endpoint_continuation_request,
          endpoint_continuation_histories, "0.6");
  const auto endpoint_continuation =
      eom::certify_native_coincident_endpoint_root_continuation(
          endpoint_continuation_start, endpoint_continuation_end,
          "self", "self");

  const auto cubic_tangency_history = [](
      const std::string& angular_speed,
      const std::string& tangential_speed) {
    return eom::RetainedHistory::uniform_circular(
        "cubic-tangency-history",
        {
            .t_start = "-0.2",
            .t_end = "0",
            .maximum_segment_step = "0.001",
            .cylindrical_radius =
                "0.960098679139659830325203078805729831276478941731",
            .height = "0",
            .angular_speed = angular_speed,
            .tangential_speed = tangential_speed,
            .phase = "0",
            .tilt_x = "0",
            .tilt_y = "0",
        });
  };
  const auto cubic_rail_history = cubic_tangency_history(
      "1.0415596039524766", "1");
  const auto cubic_departure_1e6_history = cubic_tangency_history(
      "1.0415606455120805524766", "1.000001");
  const auto cubic_departure_1e4_history = cubic_tangency_history(
      "1.04166375991287184766", "1.0001");
  const auto cubic_rail_root = eom::certify_exact_pair({
        .row_id = "cubic-tangency-rail",
        .receiver = &cubic_rail_history,
        .source = &cubic_rail_history,
        .reception_time = "0",
        .search_lower = "-0.2",
        .search_upper = "0",
        .field_speed = "1",
        .root_tolerance = "1e-7",
        .max_depth = 192,
        .max_cells = 300000,
        .initial_mpfr_bits = 128,
        .maximum_mpfr_bits = 512,
    });
  const auto cubic_snapshot = [](
      eom::ExactPairCertificate root) {
    eom::NativeAccelerationSnapshotCertificate snapshot{};
    snapshot.schema = "eom_native_acceleration_snapshot/v0";
    snapshot.status = root.status;
    snapshot.reception_time = "0";
    snapshot.failure_code = root.failure_code;
    snapshot.pair_selection_route = "analytic_uniform_circle_cubic_fixture";
    snapshot.traversal_exact_pairs = 1;
    snapshot.root_certificates.push_back(
        {"self", "self", std::move(root)});
    return snapshot;
  };
  const auto cubic_departure_root = [&](
      const std::string& row_id, const eom::RetainedHistory& retained,
      const std::string& angular_speed, const std::string& delay_lower,
      const std::string& delay_upper, const std::string& normal_lower,
      const std::string& normal_upper) {
    const long double rho =
        std::stold("0.960098679139659830325203078805729831276478941731");
    const long double omega = std::stold(angular_speed);
    const auto residual = [&](const std::string& delay) {
      const long double value = std::stold(delay);
      return 2.0L * rho * std::sin(omega * value / 2.0L) - value;
    };
    if (!(residual(delay_lower) > 0.0L && residual(delay_upper) < 0.0L)) {
      throw std::runtime_error("cubic departure root bracket is invalid");
    }
    auto root = cubic_rail_root;
    root.row_id = row_id;
    root.receiver_history_id = retained.history_id();
    root.source_history_id = retained.history_id();
    root.receiver_history_fingerprint = retained.provenance_fingerprint();
    root.source_history_fingerprint = retained.provenance_fingerprint();
    root.status = "certified_complete";
    root.failure_code.clear();
    root.root_free_complement = true;
    root.memory_boundary_contact = false;
    root.coincident_endpoint_excluded = true;
    root.precision_escalated = true;
    root.achieved_precision_bits = 512;
    root.roots = {{
        .lower = "-" + delay_upper,
        .upper = "-" + delay_lower,
        .source_normal_lower = normal_lower,
        .source_normal_upper = normal_upper,
        .receiver_normal_lower = normal_lower,
        .receiver_normal_upper = normal_upper,
        .source_normal_sign = 1,
        .source_segment_indices = {
            retained.segment_index_at(-std::stod(delay_lower))},
        .precision_route = "mpfr_analytic_uniform_circle_fixture",
        .precision_bits = 512,
    }};
    return root;
  };
  const auto cubic_rail_snapshot = cubic_snapshot(
      cubic_rail_root);
  const auto cubic_departure_1e6_snapshot = cubic_snapshot(
      cubic_departure_root(
          "cubic-tangency-departure-1e-6", cubic_departure_1e6_history,
          "1.0415606455120805524766", "0.00470349", "0.00470351",
          "1e-7", "1e-5"));
  const auto cubic_departure_1e4_snapshot = cubic_snapshot(
      cubic_departure_root(
          "cubic-tangency-departure-1e-4", cubic_departure_1e4_history,
          "1.04166375991287184766", "0.04702868", "0.04702870",
          "1e-5", "1e-3"));
  const auto cubic_endpoint_continuation =
      eom::certify_native_coincident_endpoint_root_continuation(
          cubic_rail_snapshot, cubic_departure_1e6_snapshot, "self", "self");
  const auto self_root = [](const auto& snapshot)
      -> const eom::NativeRootBracket* {
    const auto row = std::find_if(
        snapshot.root_certificates.begin(),
        snapshot.root_certificates.end(), [](const auto& candidate) {
          return candidate.receiver_path_id == "self" &&
              candidate.source_path_id == "self";
        });
    if (row == snapshot.root_certificates.end() ||
        row->certificate.roots.size() != 1U) {
      return nullptr;
    }
    return &row->certificate.roots.front();
  };
  const auto* cubic_root_1e6 = self_root(cubic_departure_1e6_snapshot);
  const auto* cubic_root_1e4 = self_root(cubic_departure_1e4_snapshot);

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
            << ",\"checkpoint\":{"
            << "\"schema\":\"" << checkpoint.schema
            << "\",\"accepted_time\":\"" << checkpoint.accepted_time
            << "\",\"controller_step_size\":\""
            << checkpoint.controller_step_size
            << "\",\"model_fingerprint\":\""
            << checkpoint.model_fingerprint
            << "\",\"checkpoint_fingerprint\":\""
            << checkpoint.checkpoint_fingerprint
            << "\",\"byte_length\":" << checkpoint_bytes.size()
            << ",\"roundtrip_fingerprint\":\""
            << checkpoint_roundtrip.checkpoint_fingerprint
            << "\",\"file_roundtrip_fingerprint\":\""
            << checkpoint_file_roundtrip.checkpoint_fingerprint
            << "\",\"tamper_rejected\":"
            << (checkpoint_tamper_rejected ? "true" : "false")
            << ",\"circular_certificate_preserved\":"
            << (circular_certificate_preserved ? "true" : "false")
            << ",\"direct_histories\":";
  print_histories(
      checkpoint_direct.histories, checkpoint_direct.accepted_end_time);
  std::cout << ",\"resumed_histories\":";
  print_histories(
      checkpoint_resumed.histories, checkpoint_resumed.accepted_end_time);
  std::cout << "},\"evolutions\":[";
  print_evolution(static_result);
  std::cout << ',';
  print_evolution(static_growth_result);
  std::cout << ',';
  print_evolution(fast_result);
  std::cout << ',';
  print_evolution(binary_result);
  std::cout << ',';
  print_evolution(adaptive_result);
  std::cout << ',';
  print_evolution(traversal_exclusion_result);
  std::cout << ',';
  print_evolution(binary_window_disabled_result);
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
  std::cout << "],\"event_acceptance\":";
  print_atomic(finite_event_step);
  std::cout << ",\"event_acceptance_single_thread\":";
  print_atomic(finite_event_single_thread_step);
  std::cout << ",\"event_atomic_resource_failure\":";
  print_atomic(finite_event_resource_step);
  std::cout << ",\"pinned_fold_temporal_onset\":";
  print_pinned_fold_temporal_onset(pinned_temporal_onset);
  std::cout << ",\"pinned_fold_temporal_onset_disabled\":";
  print_pinned_fold_temporal_onset(pinned_temporal_disabled_onset);
  std::cout << ",\"event_control\":";
  print_event(event_control);
  std::cout << ",\"event_mpfr\":";
  print_event(event_mpfr);
  std::cout << ",\"event_regulator\":";
  print_regulator(event_regulator);
  std::cout << ",\"event_nonconvergent\":";
  print_regulator(event_nonconvergent);
  std::cout << ",\"event_resource_failure\":";
  print_event(event_resource_failure);
  std::cout << ",\"endpoint_root_continuation\":{"
            << "\"certified\":"
            << (endpoint_continuation.has_value() ? "true" : "false");
  if (endpoint_continuation.has_value()) {
    std::cout << ",\"schema\":\"" << endpoint_continuation->schema
              << "\",\"status\":\"" << endpoint_continuation->status
              << "\",\"classification\":\""
              << endpoint_continuation->classification
              << "\",\"start_root_count\":"
              << endpoint_continuation->start_root_count
              << ",\"end_root_count\":"
              << endpoint_continuation->end_root_count
              << ",\"boundary_branch_sign\":"
              << endpoint_continuation->boundary_branch_sign;
  }
  std::cout << '}';
  std::cout << ",\"cubic_endpoint_root_continuation\":{";
  std::cout << "\"certified\":"
            << (cubic_endpoint_continuation.has_value() ? "true" : "false")
            << ",\"rail_status\":\"" << cubic_rail_snapshot.status
            << "\",\"rail_failure\":\""
            << cubic_rail_snapshot.failure_code
            << "\",\"departure_1e_6_status\":\""
            << cubic_departure_1e6_snapshot.status
            << "\",\"departure_1e_6_failure\":\""
            << cubic_departure_1e6_snapshot.failure_code
            << "\",\"departure_1e_6_root_count\":"
            << cubic_departure_1e6_snapshot.root_certificates.front()
                   .certificate.roots.size()
            << ",\"departure_1e_4_status\":\""
            << cubic_departure_1e4_snapshot.status
            << "\",\"departure_1e_4_failure\":\""
            << cubic_departure_1e4_snapshot.failure_code
            << "\",\"departure_1e_4_root_count\":"
            << cubic_departure_1e4_snapshot.root_certificates.front()
                   .certificate.roots.size()
            << ",\"epsilon_1e_6_root\":"
            << (cubic_root_1e6 != nullptr ? "true" : "false")
            << ",\"epsilon_1e_4_root\":"
            << (cubic_root_1e4 != nullptr ? "true" : "false");
  if (cubic_endpoint_continuation.has_value()) {
    std::cout << ",\"classification\":\""
              << cubic_endpoint_continuation->classification
              << "\",\"start_root_count\":"
              << cubic_endpoint_continuation->start_root_count
              << ",\"end_root_count\":"
              << cubic_endpoint_continuation->end_root_count
              << ",\"boundary_branch_sign\":"
              << cubic_endpoint_continuation->boundary_branch_sign;
  }
  if (cubic_root_1e6 != nullptr) {
    std::cout << ",\"epsilon_1e_6_delay_lower\":"
              << -std::stod(cubic_root_1e6->upper)
              << ",\"epsilon_1e_6_delay_upper\":"
              << -std::stod(cubic_root_1e6->lower);
  }
  if (cubic_root_1e4 != nullptr) {
    std::cout << ",\"epsilon_1e_4_delay_lower\":"
              << -std::stod(cubic_root_1e4->upper)
              << ",\"epsilon_1e_4_delay_upper\":"
              << -std::stod(cubic_root_1e4->lower);
  }
  std::cout << '}';
  std::cout << "}\n";
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
