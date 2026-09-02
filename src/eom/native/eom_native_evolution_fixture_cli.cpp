#include "architrino/eom/Checkpoint.hpp"
#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/History.hpp"
#include "architrino/eom/JointAccelerationSnapshot.hpp"
#include "architrino/eom/JointEndpointCorrector.hpp"

#include <algorithm>
#include <array>
#include <cmath>
#include <cstdlib>
#include <filesystem>
#include <iomanip>
#include <iostream>
#include <limits>
#include <map>
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

eom::RetainedHistory history(
    const std::string& id,
    const std::string& start,
    const std::string& end,
    const std::array<std::string, 4>& x) {
  return eom::RetainedHistory(
      id,
      {eom::CubicHistorySegment(
          start, end,
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
      .transmitter_factor_floor = "1e-24",
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
    std::size_t certified_root_count = 0U;
    std::size_t post_initial_history_root_count = 0U;
    std::optional<double> maximum_root_upper;
    if (step.accepted_snapshot.has_value()) {
      for (const auto& root_row : step.accepted_snapshot->root_certificates) {
        for (const auto& root : root_row.certificate.roots) {
          ++certified_root_count;
          if (std::any_of(
                  root.transmitter_segment_indices.begin(),
                  root.transmitter_segment_indices.end(),
                  [](std::size_t segment_index) { return segment_index > 0U; })) {
            ++post_initial_history_root_count;
          }
          const double upper = std::stod(root.upper);
          maximum_root_upper = maximum_root_upper.has_value()
              ? std::max(*maximum_root_upper, upper)
              : upper;
        }
      }
    }
    std::cout << "{\"status\":\"" << step.status
              << "\",\"step_index\":" << step.step_index
              << ",\"root_time_pressure_ratio\":" << step.root_time_pressure_ratio
              << ",\"failure_code\":\"" << step.failure_code
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
              << ",\"traversal_enclosed_pairs\":"
              << (step.accepted_snapshot.has_value()
                      ? step.accepted_snapshot->traversal_enclosed_pairs
                      : 0U)
              << ",\"traversal_unresolved_pairs\":"
              << (step.accepted_snapshot.has_value()
                      ? step.accepted_snapshot->traversal_unresolved_pairs
                      : 0U)
              << ",\"certified_root_count\":" << certified_root_count
              << ",\"post_initial_history_root_count\":"
              << post_initial_history_root_count
              << ",\"maximum_root_upper\":";
    if (maximum_root_upper.has_value()) {
      std::cout << *maximum_root_upper;
    } else {
      std::cout << "null";
    }
    std::cout
              << ",\"enclosed_error_width_total\":"
              << (step.accepted_snapshot.has_value()
                      ? step.accepted_snapshot->enclosed_error_width_total
                      : 0.0)
              << ",\"enclosed_error_width_max_receiver\":"
              << (step.accepted_snapshot.has_value()
                      ? step.accepted_snapshot
                            ->enclosed_error_width_max_receiver
                      : 0.0)
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
              << ",\"certificate_cost_probe\":"
              << (step.certificate_cost_probe ? "true" : "false")
              << ",\"certificate_cost_deferred_pair_count\":"
              << step.certificate_cost_deferred_pair_count
              << ",\"certificate_cost_mpfr_attempt_count\":"
              << step.certificate_cost_mpfr_attempt_count
              << ",\"certificate_cost_cooldown_remaining\":"
              << step.certificate_cost_cooldown_remaining
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
    std::size_t event_precision_escalated_count = 0;
    unsigned maximum_event_precision_bits = 0U;
    for (const auto& substep : step.substeps) {
      event_impulse_count += substep.event_impulses.size();
      regulator_certificate_count +=
          substep.regulator_convergence_certificates.size();
      for (const auto& event_impulse : substep.event_impulses) {
        maximum_event_precision_bits = std::max(
            maximum_event_precision_bits, event_impulse.precision_bits);
        if (event_impulse.precision_bits > 53U) {
          ++event_precision_escalated_count;
        }
      }
    }
    std::cout << "]"
              << ",\"multirate_coarse_path_count\":"
              << step.multirate_coarse_path_ids.size()
              << ",\"event_impulse_count\":" << event_impulse_count
              << ",\"regulator_certificate_count\":"
              << regulator_certificate_count
              << ",\"event_precision_escalated_count\":"
              << event_precision_escalated_count
              << ",\"maximum_event_precision_bits\":"
              << maximum_event_precision_bits
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
            << "\",\"requested_end_time\":\"" << certificate.requested_end_time
            << "\",\"accepted_end_time\":\""
            << certificate.accepted_end_time
            << "\",\"accepted_step_count\":"
            << certificate.accepted_step_count
            << ",\"rejected_step_count\":"
            << certificate.rejected_step_count
            << ",\"controller_certificate_cost_cooldown_remaining\":"
            << certificate.controller_certificate_cost_cooldown_remaining
            << ",\"controller_consecutive_growth_headroom_steps\":"
            << certificate.controller_consecutive_growth_headroom_steps
            << ",\"controller_step_size\":\"" << certificate.controller_step_size
            << "\",\"halt_code\":\"" << certificate.halt_code
            << "\",\"all_steps_atomic\":"
            << (certificate.all_steps_atomic ? "true" : "false")
            << ",\"evidence_status\":\"" << certificate.evidence_status
            << "\",\"joint_history_count\":"
            << certificate.joint_histories.size()
            << ",\"joint_state_fallback_applied\":"
            << (certificate.joint_state_fallback_applied ? "true" : "false")
            << ",\"histories\":";
  print_histories(certificate.histories, certificate.accepted_end_time);
  std::cout << ",\"steps\":";
  print_steps(certificate.steps);
  std::cout << '}';
}

// Complete original decimal records, not endpoint-only parity. This fixture
// serialization is deliberately independent of Checkpoint.cpp's byte encoder.
void print_history_tokens(const std::vector<eom::NativePublishedPath>& paths) {
  std::cout << '[';
  bool first_path = true;
  for (const auto& path : paths) {
    if (!first_path) std::cout << ',';
    first_path = false;
    std::cout << "{\"path_id\":\"" << path.path_id
              << "\",\"history_id\":\"" << path.history.history_id()
              << "\",\"fingerprint\":\"" << path.history.provenance_fingerprint()
              << "\",\"segments\":[";
    bool first_segment = true;
    for (const auto& segment : path.history.segments()) {
      if (!first_segment) std::cout << ',';
      first_segment = false;
      std::cout << "[\"" << segment.t_start_token() << "\",\""
                << segment.t_end_token() << '"';
      for (const auto& axis : segment.coefficient_tokens()) {
        for (const auto& token : axis) std::cout << ",\"" << token << '"';
      }
      for (const auto& token : segment.position_error_tokens())
        std::cout << ",\"" << token << '"';
      for (const auto& token : segment.velocity_error_tokens())
        std::cout << ",\"" << token << '"';
      std::cout << ",\"" << segment.position_error_token() << "\",\""
                << segment.velocity_error_token() << "\"]";
    }
    std::cout << "]}";
  }
  std::cout << ']';
}

void print_event(
    const eom::NativeFoldCausticImpulseCertificate& certificate);

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
            << "\",\"attempted_start\":\"" << certificate.attempted_start
            << "\",\"attempted_end\":\"" << certificate.attempted_end
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
  std::cout << "],\"input_joint_fingerprints\":[";
  for (std::size_t index = 0;
       index < certificate.input_joint_history_fingerprints.size(); ++index) {
    if (index > 0) std::cout << ',';
    const auto& fingerprint =
        certificate.input_joint_history_fingerprints[index];
    std::cout << "[\"" << fingerprint.path_id << "\",\""
              << fingerprint.fingerprint << "\"]";
  }
  std::cout << "],\"published_joint_fingerprints\":[";
  for (std::size_t index = 0;
       index < certificate.published_joint_history_fingerprints.size();
       ++index) {
    if (index > 0) std::cout << ',';
    const auto& fingerprint =
        certificate.published_joint_history_fingerprints[index];
    std::cout << "[\"" << fingerprint.path_id << "\",\""
              << fingerprint.fingerprint << "\"]";
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
            << ",\"finite_width_state_certificates\":[";
  bool first_state = true;
  for (const auto& substep : certificate.substeps) {
    for (const auto& state : substep.finite_width_state_certificates) {
      if (!first_state) std::cout << ',';
      first_state = false;
      std::cout << "{\"status\":\"" << state.status
                << "\",\"receiver_path_id\":\""
                << state.receiver_path_id
                << "\",\"transmitter_path_id\":\""
                << state.transmitter_path_id
                << "\",\"receiver_routed_pair_count\":"
                << state.receiver_routed_pair_count
                << ",\"receiver_pair_allocation_weight\":"
                << state.receiver_pair_allocation_weight
                << ",\"receiver_event_impulse_total\":\""
                << state.receiver_event_impulse_total
                << "\",\"receiver_event_position_moment_total\":\""
                << state.receiver_event_position_moment_total
                << "\",\"event_impulse_row_budget\":\""
                << state.event_impulse_row_budget
                << "\",\"event_position_moment_row_budget\":\""
                << state.event_position_moment_row_budget
                << "\",\"resolved_impulse_slices\":[\""
                << state.quadrature_impulse_row_budget << "\",\""
                << state.causal_regulator_impulse_row_budget << "\",\""
                << state.core_regulator_impulse_row_budget << "\",\""
                << state.state_numerical_impulse_row_budget << "\",\""
                << state.matching_impulse_row_budget << "\"]"
                << ",\"resolved_position_moment_slices\":[\""
                << state.quadrature_position_moment_row_budget << "\",\""
                << state.causal_regulator_position_moment_row_budget
                << "\",\""
                << state.core_regulator_position_moment_row_budget << "\",\""
                << state.state_numerical_position_moment_row_budget
                << "\",\""
                << state.matching_position_moment_row_budget << "\"]"
                << ",\"endpoint_reconstruction_passed\":"
                << (state.endpoint_reconstruction_passed ? "true" : "false")
                << ",\"common_domain_chart_overlap_passed\":"
                << (state.common_domain_chart_overlap_passed
                        ? "true" : "false")
                << ",\"exit_passed\":"
                << (state.exit_passed ? "true" : "false")
                << ",\"failure_code\":\"" << state.failure_code
                << "\",\"common_domains\":[";
      for (std::size_t index = 0; index < state.common_domains.size();
           ++index) {
        if (index > 0U) std::cout << ',';
        const auto& common = state.common_domains[index];
        std::cout << "{\"status\":\"" << common.status
                  << "\",\"failure_code\":\""
                  << common.failure_code
                  << "\",\"reception_lower\":\""
                  << common.reception_lower
                  << "\",\"reception_upper\":\""
                  << common.reception_upper
                  << "\",\"disjoint_component\":"
                  << common.disjoint_component
                  << ",\"disjoint_width\":" << common.disjoint_width
                  << ",\"applicable_remainder_budget\":"
                  << common.applicable_remainder_budget
                  << ",\"applicable_regulator_remainder_budget\":"
                  << common.applicable_regulator_remainder_budget
                  << ",\"applicable_total_remainder_budget\":"
                  << common.applicable_total_remainder_budget
                  << ",\"post_accounting_distance\":"
                  << common.post_accounting_distance
                  << ",\"shortcut_remainders_emitted\":"
                  << (common.impulse_shortcut_remainder.has_value() &&
                              common.position_moment_shortcut_remainder
                                  .has_value()
                          ? "true" : "false")
                  << ",\"regulator_remainders_emitted\":"
                  << (common.regulator_impulse_remainder.has_value() &&
                              common.regulator_position_moment_remainder
                                  .has_value()
                          ? "true" : "false")
                  << '}';
      }
      std::cout << "]}";
    }
  }
  std::cout << ']'
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
  std::cout << "],\"event_impulses\":[";
  bool first_event_impulse = true;
  for (const auto& substep : certificate.substeps) {
    for (const auto& event_impulse : substep.event_impulses) {
      if (!first_event_impulse) {
        std::cout << ',';
      }
      first_event_impulse = false;
      print_event(event_impulse);
    }
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
            << "\",\"receiver_path_id\":\""
            << certificate.receiver_path_id
            << "\",\"transmitter_path_id\":\""
            << certificate.transmitter_path_id
            << "\",\"reception_lower\":\""
            << certificate.reception_lower
            << "\",\"reception_upper\":\""
            << certificate.reception_upper
            << "\",\"causal_width\":\"" << certificate.causal_width
            << "\",\"core_scale\":\"" << certificate.core_scale
            << "\",\"failure_code\":\"" << certificate.failure_code
            << "\",\"visited_cells\":" << certificate.visited_cells
            << ",\"joint_displacement_cells\":"
            << certificate.joint_displacement_cells
            << ",\"precision_route\":\"" << certificate.precision_route
            << "\",\"precision_bits\":" << certificate.precision_bits
            << ",\"impulse\":";
  if (certificate.impulse.has_value()) {
    print_vector(*certificate.impulse);
  } else {
    std::cout << "null";
  }
  std::cout << ",\"position_moment\":";
  if (certificate.position_moment.has_value()) {
    print_vector(*certificate.position_moment);
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
    std::cout << ",\"final_position_moment_delta\":";
    if (series.final_position_moment_delta.has_value()) {
      std::cout << *series.final_position_moment_delta;
    } else {
      std::cout << "null";
    }
    std::cout << ",\"maximum_ladder_position_moment_delta\":";
    if (series.maximum_ladder_position_moment_delta.has_value()) {
      std::cout << *series.maximum_ladder_position_moment_delta;
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
      std::cout << ",\"maximum_position_moment_delta_from_previous\":";
      if (level.maximum_position_moment_delta_from_previous.has_value()) {
        std::cout << *level.maximum_position_moment_delta_from_previous;
      } else {
        std::cout << "null";
      }
      std::cout << '}';
    }
    std::cout << "]}";
  }
  std::cout << "]}";
}

void print_regulator_matching_control(
    const eom::NativeCommonDomainChartCertificate& certificate) {
  std::cout << "{\"reference\":\"analytic_stationary_simple_root\""
            << ",\"status\":\"" << certificate.status
            << "\",\"failure_code\":\"" << certificate.failure_code
            << "\",\"reception_lower\":\""
            << certificate.reception_lower
            << "\",\"reception_upper\":\""
            << certificate.reception_upper << "\",\"sharp_impulse\":";
  if (certificate.sharp_impulse.has_value()) {
    print_vector(*certificate.sharp_impulse);
  } else {
    std::cout << "null";
  }
  std::cout << ",\"finite_width_impulse\":";
  if (certificate.finite_width_impulse.has_value()) {
    print_vector(*certificate.finite_width_impulse);
  } else {
    std::cout << "null";
  }
  std::cout << ",\"emission_second_derivative_bound\":";
  if (certificate.emission_second_derivative_bound.has_value()) {
    print_vector(*certificate.emission_second_derivative_bound);
  } else {
    std::cout << "null";
  }
  std::cout << ",\"regulator_leading_impulse\":";
  if (certificate.regulator_leading_impulse.has_value()) {
    print_vector(*certificate.regulator_leading_impulse);
  } else {
    std::cout << "null";
  }
  std::cout << ",\"regulator_higher_order_impulse_remainder\":";
  if (certificate.regulator_higher_order_impulse_remainder.has_value()) {
    print_vector(*certificate.regulator_higher_order_impulse_remainder);
  } else {
    std::cout << "null";
  }
  std::cout << ",\"regulator_impulse_remainder\":";
  if (certificate.regulator_impulse_remainder.has_value()) {
    print_vector(*certificate.regulator_impulse_remainder);
  } else {
    std::cout << "null";
  }
  std::cout << ",\"sharp_position_moment\":";
  if (certificate.sharp_position_moment.has_value()) {
    print_vector(*certificate.sharp_position_moment);
  } else {
    std::cout << "null";
  }
  std::cout << ",\"finite_width_position_moment\":";
  if (certificate.finite_width_position_moment.has_value()) {
    print_vector(*certificate.finite_width_position_moment);
  } else {
    std::cout << "null";
  }
  std::cout << ",\"regulator_position_moment_remainder\":";
  if (certificate.regulator_position_moment_remainder.has_value()) {
    print_vector(*certificate.regulator_position_moment_remainder);
  } else {
    std::cout << "null";
  }
  std::cout << '}';
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

void print_far_field_control(
    const eom::NativeAccelerationSnapshotCertificate& snapshot) {
  const auto enclosure = std::find_if(
      snapshot.far_field_enclosure_certificates.begin(),
      snapshot.far_field_enclosure_certificates.end(),
      [](const auto& row) {
        return row.receiver_path_id == "a" && row.transmitter_path_id == "b";
      });
  const auto pair = std::find_if(
      snapshot.acceleration.pair_certificates.begin(),
      snapshot.acceleration.pair_certificates.end(),
      [](const auto& row) {
        return row.receiver_path_id == "a" && row.transmitter_path_id == "b";
      });
  if (enclosure == snapshot.far_field_enclosure_certificates.end() ||
      pair == snapshot.acceleration.pair_certificates.end() ||
      !enclosure->separation.has_value() ||
      !enclosure->pair_magnitude_bound.has_value() ||
      !enclosure->pair_width_budget.has_value() ||
      !enclosure->derived_cutoff_radius.has_value() ||
      !enclosure->acceleration.has_value() ||
      !pair->total_acceleration.has_value()) {
    throw std::runtime_error("far-field analytic control is incomplete");
  }
  std::cout << "{\"reference\":\"analytic_static_pair\""
            << ",\"status\":\"" << snapshot.status
            << "\",\"pair_selection_route\":\""
            << snapshot.pair_selection_route
            << "\",\"logical_pairs\":" << snapshot.logical_ordered_pairs
            << ",\"excluded_pairs\":" << snapshot.traversal_excluded_pairs
            << ",\"exact_pairs\":" << snapshot.traversal_exact_pairs
            << ",\"enclosed_pairs\":" << snapshot.traversal_enclosed_pairs
            << ",\"unresolved_pairs\":"
            << snapshot.traversal_unresolved_pairs
            << ",\"root_pair_count\":" << snapshot.timing.root_pair_count
            << ",\"enclosed_error_width_total\":"
            << snapshot.enclosed_error_width_total
            << ",\"enclosed_error_width_max_receiver\":"
            << snapshot.enclosed_error_width_max_receiver
            << ",\"enclosure_status\":\"" << enclosure->status
            << "\",\"separation\":";
  print_interval(*enclosure->separation);
  std::cout << ",\"pair_magnitude_bound\":";
  print_interval(*enclosure->pair_magnitude_bound);
  std::cout << ",\"pair_width_budget\":";
  print_interval(*enclosure->pair_width_budget);
  std::cout << ",\"derived_cutoff_radius\":";
  print_interval(*enclosure->derived_cutoff_radius);
  std::cout << ",\"enclosure_acceleration\":";
  print_vector(*enclosure->acceleration);
  std::cout << ",\"pair_total_acceleration\":";
  print_vector(*pair->total_acceleration);
  std::cout << '}';
}

eom::NativeCoupledEvolutionRequest make_dispersed_boundary_request(
    const std::string& run_id,
    const std::string& enclosure_fraction) {
  std::vector<eom::NativeCoupledPathInput> paths;
  for (std::size_t index = 0; index < 6U; ++index) {
    const std::string path_id = "dispersed-" + std::to_string(index);
    paths.push_back({
        path_id,
        index < 3U ? "1" : "-1",
        history(
            path_id + "-history", "-2", "0",
            {std::to_string(index * 2U), "0", "0", "0"}),
    });
  }
  auto result = request(
      run_id, std::move(paths), "0", "3", "0.1", "0.1",
      "1e-8", "1e-8", "1e-8", "0.005");
  result.acceleration_tolerance = "0.1";
  result.far_field_enclosure_fraction = enclosure_fraction;
  return result;
}

eom::NativeCoupledEvolutionRequest make_bounded_long_horizon_request(
    const std::string& run_id,
    const std::string& step,
    std::size_t thread_count = 4U) {
  auto result = request(
      run_id,
      {{"a", "1", history("bounded-long-horizon-a", "5", {"0", "0", "0", "0"})},
       {"b", "-1", history("bounded-long-horizon-b", "5", {"1", "0", "0", "0"})}},
      "5", "6.2", step, step, "1e-4", "1e-4", "1e-8", "0.001",
      12, thread_count);
  return result;
}

void print_bounded_population_long_horizon() {
  std::cout << std::setprecision(17);
  const auto coarse = eom::evolve_native_coupled_histories(
      make_bounded_long_horizon_request("bounded-long-horizon-coarse", "0.08"));
  const auto medium = eom::evolve_native_coupled_histories(
      make_bounded_long_horizon_request("bounded-long-horizon-medium", "0.04"));
  const auto fine = eom::evolve_native_coupled_histories(
      make_bounded_long_horizon_request("bounded-long-horizon-fine", "0.02"));
  const auto fine_repeat = eom::evolve_native_coupled_histories(
      make_bounded_long_horizon_request("bounded-long-horizon-fine-repeat", "0.02"));
  const auto fine_single_thread = eom::evolve_native_coupled_histories(
      make_bounded_long_horizon_request(
          "bounded-long-horizon-fine-single-thread", "0.02", 1U));

  std::cout << "{\"schema\":\"eom_bounded_population_long_horizon/v1\""
            << ",\"field_speed\":\"1\""
            << ",\"start_time\":\"5\""
            << ",\"end_time\":\"6.2\""
            << ",\"initial_separation\":\"1\""
            << ",\"post_transit_margin\":\"0.2\""
            << ",\"coupling\":\"0.001\""
            << ",\"coarse\":";
  print_evolution(coarse);
  std::cout << ",\"medium\":";
  print_evolution(medium);
  std::cout << ",\"fine\":";
  print_evolution(fine);
  std::cout << ",\"fine_repeat\":";
  print_evolution(fine_repeat);
  std::cout << ",\"fine_single_thread\":";
  print_evolution(fine_single_thread);
  std::cout << "}\n";
}

void print_bounded_population_fine(std::size_t thread_count) {
  std::cout << std::setprecision(17);
  const auto fine = eom::evolve_native_coupled_histories(
      make_bounded_long_horizon_request(
          "bounded-long-horizon-fine", "0.02", thread_count));
  print_evolution(fine);
  std::cout << '\n';
}

eom::NativeCoupledEvolutionRequest make_finite_width_post_event_request(
    const std::string& run_id,
    const std::string& step,
    std::size_t thread_count = 4U) {
  const auto source_history = eom::RetainedHistory(
      "post-event-source",
      {eom::CubicHistorySegment(
           "0", "2",
           eom::CubicCoefficientTokens{
               std::array<std::string, 4>{"5", "-4", "1", "0"},
               std::array<std::string, 4>{"0", "0", "0", "0"},
               std::array<std::string, 4>{"0", "0", "0", "0"}}),
       eom::CubicHistorySegment(
           "2", "2.703",
           eom::CubicCoefficientTokens{
               std::array<std::string, 4>{"1", "0", "0", "0"},
               std::array<std::string, 4>{"0", "0", "0", "0"},
               std::array<std::string, 4>{"0", "0", "0", "0"}})});
  auto result = request(
      run_id,
      {{"receiver", "1", history("post-event-receiver", "2.703", {"0", "0", "0", "0"})},
       {"source", "1", source_history}},
      "2.703", "3.903", step, step, "1", "1", "1e-7", "1e-30", 12,
      thread_count);
  result.chart_policy = "sharp_with_finite_width_fallback";
  result.causal_width = "0.25";
  result.core_scale = "0.2";
  result.acceleration_tolerance = "5e-3";
  result.quadrature_tolerance = "5e-3";
  result.event_impulse_tolerance = "0.08";
  result.regulator_convergence_tolerance = "0.08";
  result.regulator_refinement_levels = 3;
  result.quadrature_max_depth = 28;
  result.quadrature_max_cells = 200000;
  result.event_max_depth = 24;
  result.event_max_cells = 200000;
  return result;
}

void print_finite_width_post_event() {
  std::cout << std::setprecision(17);
  const auto coarse = eom::evolve_native_coupled_histories(
      make_finite_width_post_event_request(
          "finite-width-post-event-coarse", "0.1"));
  const auto medium = eom::evolve_native_coupled_histories(
      make_finite_width_post_event_request(
          "finite-width-post-event-medium", "0.05"));
  const auto fine = eom::evolve_native_coupled_histories(
      make_finite_width_post_event_request(
          "finite-width-post-event-fine", "0.025"));
  const auto fine_repeat = eom::evolve_native_coupled_histories(
      make_finite_width_post_event_request(
          "finite-width-post-event-fine-repeat", "0.025"));
  const auto fine_single_thread = eom::evolve_native_coupled_histories(
      make_finite_width_post_event_request(
          "finite-width-post-event-fine-single-thread", "0.025", 1U));
  auto fine_mpfr_request = make_finite_width_post_event_request(
      "finite-width-post-event-fine-mpfr", "0.025");
  fine_mpfr_request.force_event_precision_escalation = true;
  const auto fine_mpfr =
      eom::evolve_native_coupled_histories(fine_mpfr_request);
  std::cout << "{\"schema\":\"eom_finite_width_post_event/v1\""
            << ",\"field_speed\":\"1\""
            << ",\"start_time\":\"2.703\""
            << ",\"end_time\":\"3.903\""
            << ",\"fold_reception_time\":\"2.75\""
            << ",\"causal_width\":\"0.25\""
            << ",\"core_scale\":\"0.2\""
            << ",\"coupling\":\"1e-30\""
            << ",\"coarse\":";
  print_evolution(coarse);
  std::cout << ",\"medium\":";
  print_evolution(medium);
  std::cout << ",\"fine\":";
  print_evolution(fine);
  std::cout << ",\"fine_repeat\":";
  print_evolution(fine_repeat);
  std::cout << ",\"fine_single_thread\":";
  print_evolution(fine_single_thread);
  std::cout << ",\"fine_mpfr\":";
  print_evolution(fine_mpfr);
  std::cout << ",\"event_steps\":[";
  bool first_event_step = true;
  for (const auto& step : fine.steps) {
    const bool has_event = std::any_of(
        step.substeps.begin(), step.substeps.end(),
        [](const eom::NativeCorrectedSubstepCertificate& substep) {
          return !substep.event_impulses.empty();
        });
    if (!has_event) {
      continue;
    }
    if (!first_event_step) {
      std::cout << ',';
    }
    first_event_step = false;
    print_atomic(step);
  }
  std::cout << ']';
  std::cout << "}\n";
}

void print_all() {
  const auto uncertain_static_history = [](const std::string& id,
                                           const std::string& x) {
    return eom::RetainedHistory(
        id,
        {eom::CubicHistorySegment(
            "0", "2",
            eom::CubicCoefficientTokens{
                std::array<std::string, 4>{x, "0", "0", "0"},
                std::array<std::string, 4>{"0", "0", "0", "0"},
                std::array<std::string, 4>{"0", "0", "0", "0"}},
            "0.001", "0.001")});
  };
  auto joint_snapshot_request = request(
      "joint-snapshot-control",
      {{"joint-a", "1", uncertain_static_history("joint-a", "0")},
       {"joint-b", "-1", uncertain_static_history("joint-b", "1")}},
      "2", "2.02", "0.01", "0.01");
  joint_snapshot_request.root_tolerance = "0.01";
  joint_snapshot_request.acceleration_tolerance = "10";
  std::vector<eom::NativePublishedPath> joint_ordinary_histories;
  for (const auto& path : joint_snapshot_request.paths) {
    joint_ordinary_histories.push_back({path.path_id, path.history});
  }
  eom::JointAffineCubicSegment joint_a_segment;
  eom::JointAffineCubicSegment joint_b_segment;
  joint_a_segment.start_time = joint_b_segment.start_time = 0.0;
  joint_a_segment.end_time = joint_b_segment.end_time = 2.0;
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    for (std::size_t degree = 0U; degree < 4U; ++degree) {
      joint_a_segment.position_coefficients[axis][degree] = {0.0};
      joint_b_segment.position_coefficients[axis][degree] = {0.0};
    }
    joint_a_segment.position_remainder_radii[axis] = 1e-6;
    joint_b_segment.position_remainder_radii[axis] = 1e-6;
    joint_a_segment.velocity_remainder_radii[axis] = 1e-6;
    joint_b_segment.velocity_remainder_radii[axis] = 1e-6;
  }
  joint_a_segment.position_coefficients[0][0] = {0.0005};
  joint_b_segment.position_coefficients[0][0] = {0.0005};
  const std::map<std::string, eom::JointAffineRetainedHistory>
      joint_snapshot_histories{
          {"joint-a", eom::JointAffineRetainedHistory(
              "joint-a", {"common-translation"}, {joint_a_segment})},
          {"joint-b", eom::JointAffineRetainedHistory(
              "joint-b", {"common-translation"}, {joint_b_segment})},
      };
  const auto joint_native_snapshot = eom::certify_native_acceleration_snapshot(
      joint_snapshot_request, joint_ordinary_histories, "2");
  const auto joint_snapshot = eom::certify_joint_acceleration_snapshot(
      eom::Interval::point(1.0), joint_native_snapshot,
      joint_ordinary_histories, joint_snapshot_histories);
  if (!joint_snapshot.certified) {
    throw std::runtime_error(
        "joint acceleration snapshot control failed: " +
        joint_snapshot.failure_code);
  }

  const std::array<std::string, 6> live_sum_positions{
      "-0.75", "-0.45", "-0.15", "0.15", "0.45", "0.75"};
  std::vector<eom::NativeCoupledPathInput> live_sum_paths;
  std::map<std::string, eom::JointAffineRetainedHistory>
      live_sum_joint_histories;
  for (std::size_t path = 0U; path < live_sum_positions.size(); ++path) {
    const std::string path_id = "live-sum-" + std::to_string(path);
    live_sum_paths.push_back({
        path_id, "1",
        uncertain_static_history(path_id, live_sum_positions[path])});
    eom::JointAffineCubicSegment segment;
    segment.start_time = 0.0;
    segment.end_time = 2.0;
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      for (std::size_t degree = 0U; degree < 4U; ++degree) {
        segment.position_coefficients[axis][degree] = {0.0};
      }
    }
    segment.position_coefficients[0][0] = {0.0005};
    live_sum_joint_histories.emplace(
        path_id, eom::JointAffineRetainedHistory(
            path_id, {"common-translation"}, {segment}));
  }
  auto live_sum_request = request(
      "joint-live-row-sum", std::move(live_sum_paths),
      "2", "2.01", "0.01", "0.01");
  live_sum_request.root_tolerance = "0.01";
  live_sum_request.acceleration_tolerance = "1000";
  std::vector<eom::NativePublishedPath> live_sum_ordinary_histories;
  for (const auto& path : live_sum_request.paths) {
    live_sum_ordinary_histories.push_back({path.path_id, path.history});
  }
  const auto live_sum_native_snapshot =
      eom::certify_native_acceleration_snapshot(
          live_sum_request, live_sum_ordinary_histories, "2");
  const auto live_sum_joint_snapshot =
      eom::certify_joint_acceleration_snapshot(
          eom::Interval::point(1.0), live_sum_native_snapshot,
          live_sum_ordinary_histories, live_sum_joint_histories);
  if (!live_sum_joint_snapshot.certified ||
      live_sum_joint_snapshot.receivers.size() != 6U ||
      live_sum_joint_snapshot.consumed_sharp_rows != 30U ||
      live_sum_joint_snapshot.accepted_acceleration_fallback_rows != 0U) {
    std::string root_detail;
    for (const auto& row : live_sum_native_snapshot.root_certificates) {
      if (row.certificate.status != "certified_complete") {
        root_detail = "/row=" + row.receiver_path_id + ":" +
            row.transmitter_path_id + "/" +
            row.certificate.failure_code;
        break;
      }
    }
    throw std::runtime_error(
        "live joint acceleration row-sum control failed: " +
        live_sum_joint_snapshot.failure_code + "/native=" +
        live_sum_native_snapshot.status + "/" +
        live_sum_native_snapshot.failure_code + root_detail);
  }

  eom::JointAccelerationSnapshotCertificate corrector_snapshot;
  corrector_snapshot.certified = true;
  constexpr std::size_t corrector_path_count = 6U;
  constexpr std::size_t corrector_dimension = 3U * corrector_path_count;
  constexpr std::size_t retained_corrector_symbol_count = 1U;
  constexpr double corrector_radius = 1e-3;
  corrector_snapshot.shared_symbol_count =
      retained_corrector_symbol_count + corrector_dimension;
  std::vector<std::string> corrector_path_ids;
  std::map<std::string, std::array<double, 3>> corrector_endpoint_centers;
  std::map<std::string, std::vector<std::array<double, 3>>>
      corrector_endpoint_coefficients;
  const std::vector<std::array<double, 3>> retained_endpoint_coefficients{
      std::array<double, 3>{0.0002, 0.0002, 0.0002}};
  for (std::size_t path = 0U; path < corrector_path_count; ++path) {
    const std::string path_id = "corrector-" + std::to_string(path);
    corrector_path_ids.push_back(path_id);
    corrector_endpoint_centers.emplace(
        path_id, std::array<double, 3>{0.0, 0.0, 0.0});
    corrector_endpoint_coefficients.emplace(
        path_id, retained_endpoint_coefficients);
    eom::JointReceiverAccelerationState receiver;
    receiver.path_id = path_id;
    receiver.shared_symbol_coefficients.resize(
        corrector_snapshot.shared_symbol_count);
    receiver.shared_symbol_coefficient_enclosures.assign(
        corrector_snapshot.shared_symbol_count, eom::IntervalVector{
                eom::Interval::point(0.0), eom::Interval::point(0.0),
                eom::Interval::point(0.0)});
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      const std::size_t row = 3U * path + axis;
      receiver.center[axis] =
          (row % 2U == 0U ? 1.0 : -1.0) *
          static_cast<double>(row + 1U) * 1e-7;
      receiver.shared_symbol_coefficients[0U][axis] = 0.0002;
      receiver.shared_symbol_coefficient_enclosures[0U][axis] =
          eom::Interval::point(0.0002);
      receiver.independent_remainder_radii[axis] = 1e-12;
      for (std::size_t column = 0U;
           column < corrector_dimension; ++column) {
        const double derivative = column == row
            ? 0.2
            : (column == ((row + 1U) % corrector_dimension)
                   ? 0.03
                   : (column ==
                              ((row + corrector_dimension - 1U) %
                               corrector_dimension)
                          ? -0.01
                          : 0.0));
        receiver.shared_symbol_coefficients[
            retained_corrector_symbol_count + column][axis] =
            derivative * corrector_radius;
        receiver.shared_symbol_coefficient_enclosures[1U + column][axis] =
            eom::Interval::point(derivative * corrector_radius);
      }
    }
    corrector_snapshot.receivers.push_back(std::move(receiver));
  }
  const auto corrector = eom::certify_joint_endpoint_corrector({
      .path_ids = corrector_path_ids,
      .endpoint_centers = corrector_endpoint_centers,
      .endpoint_shared_coefficients = corrector_endpoint_coefficients,
      .evaluated_snapshot = corrector_snapshot,
      .retained_symbol_count = retained_corrector_symbol_count,
      .corrector_variable_radii = std::vector<double>(
          corrector_dimension, corrector_radius),
  });
  if (!corrector.certified ||
      corrector.dimension != corrector_dimension ||
      !(corrector.krawczyk.minimum_containment_margin > 0.0)) {
    throw std::runtime_error(
        "joint endpoint corrector control failed: " +
        corrector.failure_code);
  }
  auto failing_corrector_snapshot = corrector_snapshot;
  failing_corrector_snapshot.receivers.front()
      .independent_remainder_radii[0] = 0.01;
  const auto failing_corrector = eom::certify_joint_endpoint_corrector({
      .path_ids = corrector_path_ids,
      .endpoint_centers = corrector_endpoint_centers,
      .endpoint_shared_coefficients = corrector_endpoint_coefficients,
      .evaluated_snapshot = failing_corrector_snapshot,
      .retained_symbol_count = retained_corrector_symbol_count,
      .corrector_variable_radii = std::vector<double>(
          corrector_dimension, corrector_radius),
  });
  if (failing_corrector.certified) {
    throw std::runtime_error(
        "joint endpoint corrector accepted an oversized parametric residual");
  }
  auto joint_evolution_request = joint_snapshot_request;
  joint_evolution_request.run_id = "joint-corrected-evolution";
  joint_evolution_request.joint_histories = joint_snapshot_histories;
  joint_evolution_request.position_tolerance = "10";
  joint_evolution_request.velocity_tolerance = "10";
  auto joint_checkpoint_partial_request = joint_evolution_request;
  joint_checkpoint_partial_request.diagnostic_maximum_accepted_steps = 1U;
  const auto joint_evolution =
      eom::evolve_native_coupled_histories(joint_checkpoint_partial_request);
  if (joint_evolution.status != "halted" ||
      joint_evolution.halt_code !=
          "diagnostic_accepted_step_limit_reached" ||
      joint_evolution.joint_histories.size() != 2U ||
      joint_evolution.joint_histories.at("joint-a").segments().size() <= 1U) {
    throw std::runtime_error(
        "joint corrected evolution failed: " + joint_evolution.halt_code +
        (joint_evolution.steps.empty()
             ? std::string{}
             : "/" + joint_evolution.steps.back().failure_code));
  }
  const auto joint_checkpoint = eom::create_native_evolution_checkpoint(
      joint_checkpoint_partial_request, joint_evolution);
  const auto joint_checkpoint_roundtrip =
      eom::deserialize_native_evolution_checkpoint(
          eom::serialize_native_evolution_checkpoint(joint_checkpoint));
  const auto joint_checkpoint_resumed = eom::resume_native_coupled_histories(
      joint_evolution_request, joint_checkpoint_roundtrip, "2.02");
  auto joint_checkpoint_direct_request = joint_evolution_request;
  joint_checkpoint_direct_request.end_time = "2.02";
  const auto joint_checkpoint_direct =
      eom::evolve_native_coupled_histories(
          joint_checkpoint_direct_request);
  if (joint_checkpoint_roundtrip.joint_histories.size() != 2U ||
      joint_checkpoint_resumed.status != "completed" ||
      joint_checkpoint_resumed.joint_histories.size() != 2U ||
      joint_checkpoint_direct.status != "completed" ||
      joint_checkpoint_direct.joint_histories.size() != 2U) {
    throw std::runtime_error(
        "joint checkpoint continuation did not preserve joint histories");
  }
  const auto joint_history_fingerprints = [](const auto& histories) {
    std::vector<std::pair<std::string, std::string>> result;
    result.reserve(histories.size());
    for (const auto& [path_id, retained] : histories) {
      result.emplace_back(path_id, retained.provenance_fingerprint());
    }
    return result;
  };
  const auto partial_joint_fingerprints =
      joint_history_fingerprints(joint_evolution.joint_histories);
  const auto checkpoint_joint_fingerprints =
      joint_history_fingerprints(joint_checkpoint_roundtrip.joint_histories);
  const auto resumed_joint_fingerprints =
      joint_history_fingerprints(joint_checkpoint_resumed.joint_histories);
  const auto direct_joint_fingerprints =
      joint_history_fingerprints(joint_checkpoint_direct.joint_histories);
  eom::JointAffineCubicSegment append_retention_segment;
  append_retention_segment.start_time = 2.0;
  append_retention_segment.end_time = 2.1;
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    for (std::size_t degree = 0U; degree < 4U; ++degree) {
      append_retention_segment.position_coefficients[axis][degree] = {0.0};
    }
    append_retention_segment.position_remainder_radii[axis] =
        static_cast<double>(axis + 2U) * 1e-6;
    append_retention_segment.velocity_remainder_radii[axis] =
        static_cast<double>(axis + 5U) * 1e-6;
  }
  append_retention_segment.position_coefficients[0][0][0] = 0.0005;
  append_retention_segment.position_coefficients[0][1][0] = 0.0002;
  const auto append_retention_history =
      joint_snapshot_histories.at("joint-a").appended(
          std::move(append_retention_segment));
  std::size_t joint_reused_start_snapshot_count = 0U;
  for (const auto& step : joint_evolution.steps) {
    for (const auto& substep : step.substeps) {
      joint_reused_start_snapshot_count +=
          substep.timing.reused_joint_start_snapshot_count;
    }
  }
  const auto& appended_joint_segment =
      append_retention_history.segments().back();
  const bool joint_append_changed_identity =
      append_retention_history.provenance_fingerprint() !=
      joint_snapshot_histories.at("joint-a").provenance_fingerprint();
  const bool joint_checkpoint_preserved_identity =
      partial_joint_fingerprints == checkpoint_joint_fingerprints;
  const bool joint_resume_matches_direct_identity =
      resumed_joint_fingerprints == direct_joint_fingerprints;
  if (!joint_append_changed_identity ||
      !joint_checkpoint_preserved_identity ||
      !joint_resume_matches_direct_identity ||
      joint_reused_start_snapshot_count == 0U ||
      appended_joint_segment.position_coefficients[0][0].size() != 1U ||
      appended_joint_segment.position_coefficients[0][0][0] != 0.0005 ||
      !(appended_joint_segment.position_remainder_radii[0] > 0.0) ||
      !(appended_joint_segment.velocity_remainder_radii[0] > 0.0)) {
    throw std::runtime_error(
        "joint append, checkpoint, or cache identity control failed/append=" +
        std::to_string(joint_append_changed_identity) + "/checkpoint=" +
        std::to_string(joint_checkpoint_preserved_identity) + "/resume=" +
        std::to_string(joint_resume_matches_direct_identity) + "/reuse=" +
        std::to_string(joint_reused_start_snapshot_count) + "/coefficient=" +
        std::to_string(
            appended_joint_segment.position_coefficients[0][0][0]) +
        "/position_remainder=" + std::to_string(
            appended_joint_segment.position_remainder_radii[0]) +
        "/velocity_remainder=" + std::to_string(
            appended_joint_segment.velocity_remainder_radii[0]));
  }
  const auto static_request = request(
      "static-multistep",
      {{"p", "1", history("static-self-history", "2", {"0", "0", "0", "0"})}},
      "2", "2.2", "0.1", "0.1");
  const auto static_result =
      eom::evolve_native_coupled_histories(static_request);
  auto static_multirate_request = static_request;
  static_multirate_request.run_id = "static-synchronized-multirate";
  static_multirate_request.use_synchronized_multirate_publication = true;
  const auto static_multirate_result =
      eom::evolve_native_coupled_histories(static_multirate_request);
  auto static_growth_request = request(
      "static-adaptive-growth",
      {{"p", "1", history("static-growth-history", "2", {"0", "0", "0", "0"})}},
      "2", "2.08", "0.01", "0.01");
  static_growth_request.maximum_step = "0.04";
  static_growth_request.use_adaptive_step_growth = true;
  const auto static_growth_result =
      eom::evolve_native_coupled_histories(static_growth_request);
  auto static_continuous_request = static_growth_request;
  static_continuous_request.run_id = "static-continuous-adaptive";
  static_continuous_request.use_continuous_adaptive_step = true;
  const auto static_continuous_result =
      eom::evolve_native_coupled_histories(static_continuous_request);

  // Preserve the original horizon; stop only at an accepted diagnostic cut.
  const std::array<std::size_t, 3> growth_cut_counts{1U, 2U, 4U};
  std::vector<eom::NativeCoupledEvolutionCertificate> growth_prefixes;
  std::vector<eom::NativeEvolutionCheckpoint> growth_checkpoints;
  std::vector<eom::NativeCoupledEvolutionCertificate> growth_resumed;
  for (const auto cut_count : growth_cut_counts) {
    auto prefix_request = static_growth_request;
    prefix_request.diagnostic_maximum_accepted_steps = cut_count;
    growth_prefixes.push_back(eom::evolve_native_coupled_histories(prefix_request));
    growth_checkpoints.push_back(eom::deserialize_native_evolution_checkpoint(
        eom::serialize_native_evolution_checkpoint(
            eom::create_native_evolution_checkpoint(
                prefix_request, growth_prefixes.back()))));
    growth_resumed.push_back(eom::resume_native_coupled_histories(
        static_growth_request, growth_checkpoints.back(),
        static_growth_request.end_time));
  }
  auto bounded_growth_request = static_growth_request;
  bounded_growth_request.run_id = "static-adaptive-growth-bounded-run";
  bounded_growth_request.max_step_attempts = 5U;
  const auto bounded_growth_direct =
      eom::evolve_native_coupled_histories(bounded_growth_request);
  auto bounded_growth_prefix_request = bounded_growth_request;
  bounded_growth_prefix_request.diagnostic_maximum_accepted_steps = 2U;
  const auto bounded_growth_prefix =
      eom::evolve_native_coupled_histories(bounded_growth_prefix_request);
  const auto bounded_growth_checkpoint =
      eom::create_native_evolution_checkpoint(
          bounded_growth_prefix_request, bounded_growth_prefix);
  std::vector<std::size_t> bounded_growth_resume_callback_counts;
  auto bounded_growth_resume_template = bounded_growth_request;
  bounded_growth_resume_template.accepted_step_callback =
      [&bounded_growth_resume_callback_counts](
          std::size_t accepted_count, const std::string&) {
        bounded_growth_resume_callback_counts.push_back(accepted_count);
      };
  const auto bounded_growth_resumed = eom::resume_native_coupled_histories(
      bounded_growth_resume_template, bounded_growth_checkpoint,
      bounded_growth_request.end_time);
  bool bounded_growth_cancel_requested = false;
  auto cancelled_growth_request = bounded_growth_request;
  cancelled_growth_request.accepted_step_callback =
      [&bounded_growth_cancel_requested](
          std::size_t accepted_count, const std::string&) {
        bounded_growth_cancel_requested = accepted_count >= 2U;
      };
  cancelled_growth_request.cancellation_requested =
      [&bounded_growth_cancel_requested]() {
        return bounded_growth_cancel_requested;
      };
  const auto cancelled_growth =
      eom::evolve_native_coupled_histories(cancelled_growth_request);
  const auto cancelled_growth_checkpoint =
      eom::create_native_evolution_checkpoint(
          cancelled_growth_request, cancelled_growth);
  const auto cancelled_growth_resumed = eom::resume_native_coupled_histories(
      bounded_growth_request, cancelled_growth_checkpoint,
      bounded_growth_request.end_time);
  const auto invalid_restart_counters = [](
      const eom::NativeCoupledEvolutionRequest& bad) {
    try {
      static_cast<void>(eom::evolve_native_coupled_histories(bad));
    } catch (const std::invalid_argument& error) {
      return std::string(error.what()) ==
          "coupled evolution restart counters exceed run resource limits";
    }
    return false;
  };
  auto accepted_counter_overflow_request = static_request;
  accepted_counter_overflow_request.initial_accepted_step_count =
      accepted_counter_overflow_request.max_step_attempts + 1U;
  auto rejected_counter_overflow_request = static_request;
  rejected_counter_overflow_request.initial_rejected_step_count =
      rejected_counter_overflow_request.max_rejected_steps + 1U;
  auto total_counter_overflow_request = static_request;
  total_counter_overflow_request.initial_accepted_step_count =
      total_counter_overflow_request.max_step_attempts;
  total_counter_overflow_request.initial_rejected_step_count = 1U;
  const bool accepted_counter_overflow_rejected =
      invalid_restart_counters(accepted_counter_overflow_request);
  const bool rejected_counter_overflow_rejected =
      invalid_restart_counters(rejected_counter_overflow_request);
  const bool total_counter_overflow_rejected =
      invalid_restart_counters(total_counter_overflow_request);
  const auto invalid_growth_memory = [](
      const eom::NativeCoupledEvolutionRequest& bad) {
    try {
      static_cast<void>(eom::evolve_native_coupled_histories(bad));
    } catch (const std::invalid_argument& error) {
      return std::string(error.what()) == "invalid adaptive growth restart memory";
    }
    return false;
  };
  auto disabled_memory_request = static_request;
  disabled_memory_request.initial_consecutive_growth_headroom_steps = 1U;
  auto continuous_memory_request = static_continuous_request;
  continuous_memory_request.initial_consecutive_growth_headroom_steps = 1U;
  auto overflowing_memory_request = static_growth_request;
  overflowing_memory_request.initial_consecutive_growth_headroom_steps =
      std::numeric_limits<std::size_t>::max();
  const bool disabled_memory_rejected = invalid_growth_memory(disabled_memory_request);
  const bool continuous_memory_rejected = invalid_growth_memory(continuous_memory_request);
  const bool overflowing_memory_rejected = invalid_growth_memory(overflowing_memory_request);
  auto unstarted_growth_request = static_growth_request;
  unstarted_growth_request.initial_consecutive_growth_headroom_steps = 1U;
  unstarted_growth_request.initial_accepted_step_count = 7U;
  unstarted_growth_request.initial_rejected_step_count = 3U;
  unstarted_growth_request.memory_budget_bytes = 1U;
  const auto unstarted_growth = eom::evolve_native_coupled_histories(unstarted_growth_request);
  const auto unstarted_checkpoint = eom::deserialize_native_evolution_checkpoint(
      eom::serialize_native_evolution_checkpoint(
          eom::create_native_evolution_checkpoint(unstarted_growth_request, unstarted_growth)));
  auto boundary_memory_request = unstarted_growth_request;
  boundary_memory_request.initial_consecutive_growth_headroom_steps =
      std::numeric_limits<std::size_t>::max() - boundary_memory_request.max_step_attempts;
  const auto boundary_memory = eom::evolve_native_coupled_histories(boundary_memory_request);
  auto capped_growth_request = static_growth_request;
  capped_growth_request.maximum_step = capped_growth_request.initial_step;
  capped_growth_request.initial_consecutive_growth_headroom_steps = 7U;
  capped_growth_request.diagnostic_maximum_accepted_steps = 1U;
  const auto capped_growth = eom::evolve_native_coupled_histories(capped_growth_request);
  const auto capped_checkpoint = eom::deserialize_native_evolution_checkpoint(
      eom::serialize_native_evolution_checkpoint(
          eom::create_native_evolution_checkpoint(capped_growth_request, capped_growth)));
  const auto capped_resume = eom::resume_native_coupled_histories(
      capped_growth_request, capped_checkpoint, static_growth_request.end_time);
  bool growth_memory_tamper_rejected = false;
  auto changed_growth_checkpoint = growth_checkpoints.front();
  ++changed_growth_checkpoint.controller_consecutive_growth_headroom_steps;
  try {
    static_cast<void>(eom::serialize_native_evolution_checkpoint(changed_growth_checkpoint));
  } catch (const std::invalid_argument&) { growth_memory_tamper_rejected = true; }
  bool old_growth_schema_rejected = false;
  auto old_growth_checkpoint = growth_checkpoints.front();
  old_growth_checkpoint.schema = "eom_native_evolution_checkpoint/v6";
  try {
    static_cast<void>(eom::serialize_native_evolution_checkpoint(old_growth_checkpoint));
  } catch (const std::invalid_argument& error) {
    old_growth_schema_rejected = std::string(error.what()).find("requires v7") != std::string::npos;
  }
  bool old_growth_magic_rejected = false;
  auto old_growth_bytes = eom::serialize_native_evolution_checkpoint(growth_checkpoints.front());
  old_growth_bytes.at(6) = '3';
  try {
    static_cast<void>(eom::deserialize_native_evolution_checkpoint(old_growth_bytes));
  } catch (const std::invalid_argument& error) {
    old_growth_magic_rejected = std::string(error.what()).find("requires EOMCPV4/v7") != std::string::npos;
  }
  auto certificate_cost_request = request(
      "static-certificate-cost-feedback",
      {{"p", "1", history(
          "static-certificate-cost-history", "2", {"0", "0", "0", "0"})}},
      "2", "2.02", "0.01", "0.001");
  certificate_cost_request.maximum_step = "0.02";
  certificate_cost_request.root_tolerance = "1e-20";
  certificate_cost_request.use_adaptive_step_growth = true;
  certificate_cost_request.use_continuous_adaptive_step = true;
  certificate_cost_request.use_certificate_cost_feedback = true;
  certificate_cost_request.certificate_cost_maximum_probe_adjustments = 1U;
  certificate_cost_request.certificate_cost_probe_scale = "0.5";
  certificate_cost_request.diagnostic_maximum_accepted_steps = 1U;
  const auto certificate_cost_result =
      eom::evolve_native_coupled_histories(certificate_cost_request);
  const auto certificate_cost_checkpoint =
      eom::create_native_evolution_checkpoint(
          certificate_cost_request, certificate_cost_result);
  const auto certificate_cost_checkpoint_roundtrip =
      eom::deserialize_native_evolution_checkpoint(
          eom::serialize_native_evolution_checkpoint(
              certificate_cost_checkpoint));

  auto checkpoint_partial_request = static_request;
  checkpoint_partial_request.run_id = "static-checkpoint-restart";
  checkpoint_partial_request.end_time =
      static_result.steps.front().accepted_time;
  const auto checkpoint_partial_result =
      eom::evolve_native_coupled_histories(checkpoint_partial_request);
  const auto checkpoint = eom::create_native_evolution_checkpoint(
      checkpoint_partial_request, checkpoint_partial_result);
  const std::string checkpoint_model_fingerprint =
      eom::native_evolution_model_fingerprint(checkpoint_partial_request);
  auto changed_event_fraction = checkpoint_partial_request;
  changed_event_fraction.event_quadrature_fraction = "0.34";
  auto changed_increment_budget = checkpoint_partial_request;
  changed_increment_budget.position_increment_budget = "1e-9";
  auto changed_traversal_limit = checkpoint_partial_request;
  ++changed_traversal_limit.traversal_maximum_nodes;
  auto changed_warm_policy = checkpoint_partial_request;
  changed_warm_policy.use_warm_root_exclusion =
      !changed_warm_policy.use_warm_root_exclusion;
  auto changed_joint_state = checkpoint_partial_request;
  changed_joint_state.joint_histories = joint_snapshot_histories;
  const bool checkpoint_controls_bound =
      checkpoint_model_fingerprint !=
          eom::native_evolution_model_fingerprint(changed_event_fraction) &&
      checkpoint_model_fingerprint !=
          eom::native_evolution_model_fingerprint(changed_increment_budget) &&
      checkpoint_model_fingerprint !=
          eom::native_evolution_model_fingerprint(changed_traversal_limit) &&
      checkpoint_model_fingerprint !=
          eom::native_evolution_model_fingerprint(changed_warm_policy) &&
      checkpoint_model_fingerprint !=
          eom::native_evolution_model_fingerprint(changed_joint_state);
  if (!checkpoint_controls_bound) {
    throw std::runtime_error(
        "checkpoint fingerprint omits an acceptance-regime control");
  }
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

  auto far_field_control_request = request(
      "far-field-analytic-control",
      {{"a", "1",
        history("far-field-a", "-20", "0", {"0", "0", "0", "0"})},
       {"b", "1",
        history("far-field-b", "-20", "0", {"10", "0", "0", "0"})}},
      "0", "0.1", "0.1", "0.1", "1e-8", "1e-8", "1e-8", "0.005");
  far_field_control_request.acceleration_tolerance = "0.1";
  far_field_control_request.far_field_enclosure_fraction = "0.1";
  std::vector<eom::NativePublishedPath> far_field_control_histories;
  for (const auto& path : far_field_control_request.paths) {
    far_field_control_histories.push_back({path.path_id, path.history});
  }
  auto far_field_traversal_request = far_field_control_request;
  far_field_traversal_request.run_id = "far-field-traversal-cascade";
  far_field_traversal_request.traversal_exact_tile_pair_limit = 1;
  const auto far_field_traversal_control =
      eom::certify_native_acceleration_snapshot(
          far_field_traversal_request, far_field_control_histories, "0");
  far_field_control_request.use_certified_traversal = false;
  const auto far_field_control = eom::certify_native_acceleration_snapshot(
      far_field_control_request, far_field_control_histories, "0");

  auto dispersed_boundary_request = make_dispersed_boundary_request(
      "far-field-dispersed-3-3-boundary", "0.25");
  const auto dispersed_boundary_result =
      eom::evolve_native_coupled_histories(dispersed_boundary_request);
  auto dispersed_boundary_disabled_request = make_dispersed_boundary_request(
      "far-field-dispersed-3-3-boundary-disabled", "0");
  std::vector<eom::NativePublishedPath> dispersed_boundary_histories;
  for (const auto& path : dispersed_boundary_disabled_request.paths) {
    dispersed_boundary_histories.push_back({path.path_id, path.history});
  }
  const auto dispersed_boundary_disabled =
      eom::certify_native_atomic_coupled_step(
          dispersed_boundary_disabled_request, dispersed_boundary_histories,
          0, "0", "0.1");

  const auto adaptive_request = request(
      "adaptive-halving",
      {{"a", "1", history("adaptive-a", "5", {"0", "0", "0", "0"})},
       {"b", "-1", history("adaptive-b", "5", {"2", "0", "0", "0"})}},
      "5", "5.05", "0.05", "0.00625", "5e-10", "2e-8", "1e-7");
  const auto adaptive_result =
      eom::evolve_native_coupled_histories(adaptive_request);
  auto headroom_reset_request = adaptive_request;
  headroom_reset_request.use_adaptive_step_growth = true;
  headroom_reset_request.initial_consecutive_growth_headroom_steps = 1U;
  headroom_reset_request.diagnostic_maximum_accepted_steps = 1U;
  const auto headroom_reset = eom::evolve_native_coupled_histories(headroom_reset_request);

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
  auto rejected_growth_request = rejected_request;
  rejected_growth_request.use_adaptive_step_growth = true;
  rejected_growth_request.initial_consecutive_growth_headroom_steps = 1U;
  const auto rejected_growth = eom::evolve_native_coupled_histories(rejected_growth_request);
  bool rejected_boundary_checkpoint_rejected = false;
  try {
    static_cast<void>(eom::create_native_evolution_checkpoint(
        rejected_growth_request, rejected_growth));
  } catch (const std::invalid_argument& error) {
    rejected_boundary_checkpoint_rejected =
        std::string(error.what()) ==
        "checkpoint source does not end at an accepted atomic boundary";
  }

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
  eom::JointAffineCubicSegment event_joint_segment;
  event_joint_segment.start_time = 0.0;
  event_joint_segment.end_time = 2.7;
  auto joint_finite_event_request = finite_event_request;
  joint_finite_event_request.run_id = "joint-root-event-fail-closed";
  joint_finite_event_request.joint_histories = {
      {"receiver", eom::JointAffineRetainedHistory(
          "receiver", {}, {event_joint_segment})},
      {"source", eom::JointAffineRetainedHistory(
          "source", {}, {event_joint_segment})},
  };
  const auto joint_finite_event_step =
      eom::certify_native_atomic_coupled_step(
          joint_finite_event_request, event_histories, 0, "2.7", "2.8");
  if (joint_finite_event_step.status != "rejected" ||
      joint_finite_event_step.failure_code !=
          "unsupported_caustic_or_singular_chart") {
    throw std::runtime_error(
        "joint finite-width event route did not fail closed: " +
        joint_finite_event_step.status + "/" +
        joint_finite_event_step.failure_code);
  }
  const auto joint_event_halt_code =
      eom::native_nonretryable_halt_code(joint_finite_event_step);
  if (!joint_event_halt_code.has_value() ||
      *joint_event_halt_code != "caustic_transit_uncertified") {
    throw std::runtime_error(
        "joint finite-width event maps to the wrong controller halt");
  }
  const bool ordinary_joint_event_fallback_selected =
      eom::native_joint_event_fallback_is_available(
          joint_finite_event_request, joint_finite_event_step);
  if (!ordinary_joint_event_fallback_selected) {
    throw std::runtime_error(
        "ordinary joint finite-width event did not select non-joint retry");
  }
  auto adjudicated_joint_event_request = joint_finite_event_request;
  adjudicated_joint_event_request.run_id =
      "joint-root-event-adjudicated-fallback";
  adjudicated_joint_event_request.adjudicated_finite_width_pairs = {
      {"receiver", "source"}};
  const auto adjudicated_joint_event =
      eom::evolve_native_coupled_histories(
          adjudicated_joint_event_request);
  if (adjudicated_joint_event.status != "completed" ||
      !adjudicated_joint_event.joint_histories.empty()) {
    throw std::runtime_error(
        "adjudicated finite-width retry did not fall back from joint state");
  }
  const auto adjudicated_joint_checkpoint =
      eom::create_native_evolution_checkpoint(
          adjudicated_joint_event_request, adjudicated_joint_event);
  const auto adjudicated_joint_checkpoint_roundtrip =
      eom::deserialize_native_evolution_checkpoint(
          eom::serialize_native_evolution_checkpoint(
              adjudicated_joint_checkpoint));
  const auto adjudicated_joint_resume =
      eom::resume_native_coupled_histories(
          adjudicated_joint_event_request,
          adjudicated_joint_checkpoint_roundtrip,
          "2.9");
  if (adjudicated_joint_checkpoint_roundtrip.joint_history_mode !=
          "ordinary_fallback" ||
      !adjudicated_joint_checkpoint_roundtrip.joint_histories.empty() ||
      !adjudicated_joint_resume.joint_state_fallback_applied ||
      !adjudicated_joint_resume.joint_histories.empty()) {
    throw std::runtime_error(
        "joint fallback checkpoint did not preserve ordinary mode");
  }
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

  const auto borg_history_boundary_event_request = request(
      "borg-16-history-boundary-event-0.06-0.07",
      {{"1004", "1",
        history(
            "borg-16-history-boundary-receiver", "-10", "0.06",
            {"0", "0", "0", "0"})},
       {"1013", "1",
        history(
            "borg-16-history-boundary-source", "-10", "0.06",
            {"10.065", "0", "0", "0"})}},
      "0.06", "0.07", "0.01", "0.01", "1", "1", "1e-7", "1e-30");
  auto borg_history_boundary_event_finite_request =
      borg_history_boundary_event_request;
  borg_history_boundary_event_finite_request.chart_policy =
      "sharp_with_finite_width_fallback";
  borg_history_boundary_event_finite_request.causal_width = "0.2";
  borg_history_boundary_event_finite_request.core_scale = "0.2";
  borg_history_boundary_event_finite_request.event_impulse_tolerance = "1e-7";
  borg_history_boundary_event_finite_request.regulator_convergence_tolerance =
      "1e-3";
  borg_history_boundary_event_finite_request.regulator_refinement_levels = 3;
  std::vector<eom::NativePublishedPath> borg_history_boundary_histories;
  for (const auto& path : borg_history_boundary_event_finite_request.paths) {
    borg_history_boundary_histories.push_back({path.path_id, path.history});
  }
  const auto borg_history_boundary_event_step =
      eom::certify_native_atomic_coupled_step(
          borg_history_boundary_event_finite_request,
          borg_history_boundary_histories, 0, "0.06", "0.07");

  const eom::NativePublishedPath event_receiver{
      "receiver", history("event-control-receiver", "3.01", {"0", "0", "0", "0"})};
  const eom::NativePublishedPath event_source{
      "source", history("event-control-source", "3.01", {"5.25", "-4", "1", "0"})};
  auto event_control_request = request(
      "event-control", {}, "2.99", "3.01", "0.02", "0.02");
  event_control_request.causal_width = "0.25";
  event_control_request.core_scale = "0.2";
  event_control_request.event_impulse_tolerance = "0.08";
  event_control_request.event_position_moment_tolerance = "0.0016";
  event_control_request.regulator_convergence_tolerance = "0.08";
  event_control_request.regulator_refinement_levels = 3;
  event_control_request.event_max_depth = 24;
  event_control_request.event_max_cells = 200000;
  const auto event_control = eom::certify_native_fold_caustic_impulse(
      event_control_request, event_receiver, event_source, "1", "1",
      "2.99", "3.01");
  const auto uncertain_event_history = [](
      const std::string& id,
      const std::array<std::string, 4>& x) {
    return eom::RetainedHistory(
        id,
        {eom::CubicHistorySegment(
            "0", "3.01",
            eom::CubicCoefficientTokens{
                x, {"0", "0", "0", "0"}, {"0", "0", "0", "0"}},
            "0.0001", "0.0001")});
  };
  const eom::NativePublishedPath uncertain_event_receiver{
      "receiver",
      uncertain_event_history(
          "uncertain-event-control-receiver", {"0", "0", "0", "0"})};
  const eom::NativePublishedPath uncertain_event_source{
      "source",
      uncertain_event_history(
          "uncertain-event-control-source", {"5.25", "-4", "1", "0"})};
  eom::JointAffineCubicSegment event_receiver_joint_segment;
  eom::JointAffineCubicSegment event_source_joint_segment;
  event_receiver_joint_segment.start_time =
      event_source_joint_segment.start_time = 0.0;
  event_receiver_joint_segment.end_time =
      event_source_joint_segment.end_time = 3.01;
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    for (std::size_t degree = 0U; degree < 4U; ++degree) {
      event_receiver_joint_segment.position_coefficients[axis][degree] =
          {0.0};
      event_source_joint_segment.position_coefficients[axis][degree] =
          {0.0};
    }
    event_receiver_joint_segment.position_remainder_radii[axis] = 1e-8;
    event_source_joint_segment.position_remainder_radii[axis] = 1e-8;
  }
  event_receiver_joint_segment.position_coefficients[0][0] = {0.00009};
  event_source_joint_segment.position_coefficients[0][0] = {0.00009};
  const eom::JointAffineRetainedHistory event_receiver_joint(
      "receiver", {"common-event-translation"},
      {event_receiver_joint_segment});
  const eom::JointAffineRetainedHistory event_source_joint(
      "source", {"common-event-translation"},
      {event_source_joint_segment});
  const auto uncertain_event_ordinary =
      eom::certify_native_fold_caustic_impulse(
          event_control_request, uncertain_event_receiver,
          uncertain_event_source, "1", "1", "2.99", "3.01");
  const auto uncertain_event_joint =
      eom::certify_native_fold_caustic_impulse(
          event_control_request, uncertain_event_receiver,
          uncertain_event_source, "1", "1", "2.99", "3.01",
          &event_receiver_joint, &event_source_joint);
  auto research_budget_event_request = event_control_request;
  research_budget_event_request.coupling = "1e-6";
  research_budget_event_request.event_impulse_tolerance = "3.5e-8";
  research_budget_event_request.event_position_moment_tolerance = "3.5e-8";
  const auto research_budget_event_control =
      eom::certify_native_fold_caustic_impulse(
          research_budget_event_request, event_receiver, event_source,
          "1", "1", "2.99", "3.01");
  auto interactive_budget_event_request = research_budget_event_request;
  interactive_budget_event_request.event_impulse_tolerance = "3.5e-7";
  interactive_budget_event_request.event_position_moment_tolerance =
      "3.5e-7";
  const auto interactive_budget_event_control =
      eom::certify_native_fold_caustic_impulse(
          interactive_budget_event_request, event_receiver, event_source,
          "1", "1", "2.99", "3.01");
  auto under_budget_event_request = research_budget_event_request;
  under_budget_event_request.event_impulse_tolerance = "1e-12";
  under_budget_event_request.event_position_moment_tolerance = "1e-12";
  under_budget_event_request.event_max_depth = 4;
  under_budget_event_request.event_max_cells = 4;
  const auto under_budget_event_control =
      eom::certify_native_fold_caustic_impulse(
          under_budget_event_request, event_receiver, event_source,
          "1", "1", "2.99", "3.01");
  const auto event_regulator = eom::certify_native_regulator_convergence(
      event_control_request, event_receiver, event_source, "1", "1",
      "2.99", "3.01");
  auto regulator_matching_request = request(
      "stationary-regulator-matching-control",
      {{"receiver", "1",
        history(
            "stationary-matching-receiver", "-2", "0.001",
            {"0", "0", "0", "0"})},
       {"source", "1",
        history(
            "stationary-matching-source", "-2", "0.001",
            {"0.5", "0", "0", "0"})}},
      "0", "0.001", "0.001", "0.001", "1e-10", "1e-10", "1e-10",
      "0.0001");
  regulator_matching_request.causal_width = "0.05";
  regulator_matching_request.core_scale = "0.1";
  regulator_matching_request.event_impulse_tolerance = "1e-7";
  regulator_matching_request.event_position_moment_tolerance = "1e-10";
  regulator_matching_request.quadrature_tolerance = "1e-9";
  regulator_matching_request.quadrature_max_depth = 32;
  regulator_matching_request.quadrature_max_cells = 200000;
  regulator_matching_request.event_max_depth = 32;
  regulator_matching_request.event_max_cells = 200000;
  std::vector<eom::NativePublishedPath> regulator_matching_histories;
  for (const auto& path : regulator_matching_request.paths) {
    regulator_matching_histories.push_back({path.path_id, path.history});
  }
  const auto regulator_matching_control =
      eom::certify_native_common_domain_chart(
          regulator_matching_request, regulator_matching_histories,
          "receiver", "source", "0", "0.001", "0.001");
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
    snapshot.schema = "eom_native_acceleration_snapshot/v1";
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
    root.transmitter_history_id = retained.history_id();
    root.receiver_history_fingerprint = retained.provenance_fingerprint();
    root.transmitter_history_fingerprint = retained.provenance_fingerprint();
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
        .transmitter_factor_lower = normal_lower,
        .transmitter_factor_upper = normal_upper,
        .receiver_factor_lower = normal_lower,
        .receiver_factor_upper = normal_upper,
        .transmitter_factor_sign = 1,
        .transmitter_segment_indices = {
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
              candidate.transmitter_path_id == "self";
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
            << "{\"schema\":\"eom_native_evolution_fixture_packet/v1\","
            << "\"integration_method\":\"" << eom::kNativeIntegrationMethod
            << "\",\"future_history_rejected\":"
            << (future_history_rejected ? "true" : "false")
            << ",\"checkpoint\":{"
            << "\"schema\":\"" << checkpoint.schema
            << "\",\"accepted_time\":\"" << checkpoint.accepted_time
            << "\",\"controller_step_size\":\""
            << checkpoint.controller_step_size
            << "\",\"joint_history_mode\":\""
            << checkpoint.joint_history_mode
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
            << ",\"acceptance_controls_bound\":"
            << (checkpoint_controls_bound ? "true" : "false")
            << ",\"circular_certificate_preserved\":"
            << (circular_certificate_preserved ? "true" : "false")
            << ",\"certificate_cost_cooldown_roundtrip\":"
            << certificate_cost_checkpoint_roundtrip
                   .controller_certificate_cost_cooldown_remaining
            << ",\"joint_history_count\":"
            << joint_checkpoint_roundtrip.joint_histories.size()
            << ",\"joint_checkpoint_mode\":\""
            << joint_checkpoint_roundtrip.joint_history_mode
            << "\",\"joint_history_segment_count\":"
            << joint_checkpoint_roundtrip.joint_histories.at("joint-a")
                   .segments().size()
            << ",\"joint_resume_history_count\":"
            << joint_checkpoint_resumed.joint_histories.size()
            << ",\"joint_resume_segment_count\":"
            << joint_checkpoint_resumed.joint_histories.at("joint-a")
                   .segments().size()
            << ",\"joint_fallback_mode\":\""
            << adjudicated_joint_checkpoint_roundtrip.joint_history_mode
            << "\",\"joint_fallback_resume_applied\":"
            << (adjudicated_joint_resume.joint_state_fallback_applied
                    ? "true"
                    : "false")
            << ",\"direct_histories\":";
  print_histories(
      checkpoint_direct.histories, checkpoint_direct.accepted_end_time);
  std::cout << ",\"resumed_histories\":";
  print_histories(
      checkpoint_resumed.histories, checkpoint_resumed.accepted_end_time);
  std::cout << ",\"joint_direct_histories\":";
  print_histories(
      joint_checkpoint_direct.histories,
      joint_checkpoint_direct.accepted_end_time);
  std::cout << ",\"joint_resumed_histories\":";
  print_histories(
      joint_checkpoint_resumed.histories,
      joint_checkpoint_resumed.accepted_end_time);
  std::cout << "},\"joint_precision_controls\":{";
  std::cout << "\"live_snapshot\":{\"reference\":"
            << "\"analytic_static_six_path_master_eom_sum\""
            << ",\"consumed_sharp_rows\":"
            << live_sum_joint_snapshot.consumed_sharp_rows
            << ",\"fallback_rows\":"
            << live_sum_joint_snapshot.accepted_acceleration_fallback_rows
            << ",\"positions\":[";
  for (std::size_t index = 0U; index < live_sum_positions.size(); ++index) {
    if (index > 0U) std::cout << ',';
    std::cout << live_sum_positions[index];
  }
  std::cout << "],\"receivers\":[";
  for (std::size_t index = 0U;
       index < live_sum_joint_snapshot.receivers.size(); ++index) {
    if (index > 0U) std::cout << ',';
    const auto& receiver = live_sum_joint_snapshot.receivers[index];
    std::cout << "{\"path_id\":\"" << receiver.path_id
              << "\",\"center\":[";
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      if (axis > 0U) std::cout << ',';
      std::cout << receiver.center[axis];
    }
    std::cout << "],\"projection\":[";
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      if (axis > 0U) std::cout << ',';
      std::cout << receiver.projection_radii_upper[axis];
    }
    std::cout << "],\"common_translation_coefficient\":[";
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      if (axis > 0U) std::cout << ',';
      std::cout << receiver.shared_symbol_coefficients.front()[axis];
    }
    std::cout << "]}";
  }
  std::cout << "]},\"endpoint_corrector\":{"
            << "\"reference\":\"independent_decimal_linear_solve\""
            << ",\"dimension\":" << corrector.dimension
            << ",\"certified\":"
            << (corrector.certified ? "true" : "false")
            << ",\"minimum_margin\":"
            << corrector.krawczyk.minimum_containment_margin
            << ",\"negative_failure_code\":\""
            << failing_corrector.failure_code
            << "\",\"evaluated_centers\":[";
  for (std::size_t path = 0U; path < corrector_path_count; ++path) {
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      if (path > 0U || axis > 0U) std::cout << ',';
      std::cout << corrector_snapshot.receivers[path].center[axis];
    }
  }
  std::cout << "],\"image\":[";
  for (std::size_t index = 0U;
       index < corrector.krawczyk.image.size(); ++index) {
    if (index > 0U) std::cout << ',';
    print_interval(corrector.krawczyk.image[index]);
  }
  std::cout << "]},\"history_retention\":{"
            << "\"append_changed_identity\":"
            << (joint_append_changed_identity ? "true" : "false")
            << ",\"checkpoint_preserved_identity\":"
            << (joint_checkpoint_preserved_identity ? "true" : "false")
            << ",\"resume_matches_direct_identity\":"
            << (joint_resume_matches_direct_identity ? "true" : "false")
            << ",\"reused_joint_start_snapshot_count\":"
            << joint_reused_start_snapshot_count
            << ",\"retained_coefficient\":"
            << appended_joint_segment.position_coefficients[0][0][0]
            << ",\"position_remainder\":"
            << appended_joint_segment.position_remainder_radii[0]
            << ",\"velocity_remainder\":"
            << appended_joint_segment.velocity_remainder_radii[0]
            << "}},\"adaptive_checkpoint\":{\"cuts\":[";
  for (std::size_t i = 0; i < growth_cut_counts.size(); ++i) {
    if (i) std::cout << ',';
    std::cout << "{\"cut_count\":" << growth_cut_counts[i]
              << ",\"checkpoint_memory\":"
              << growth_checkpoints[i].controller_consecutive_growth_headroom_steps
              << ",\"checkpoint_step\":\"" << growth_checkpoints[i].controller_step_size
              << "\",\"prefix\":";
    print_evolution(growth_prefixes[i]);
    std::cout << ",\"resumed\":";
    print_evolution(growth_resumed[i]);
    std::cout << ",\"direct_cut_tokens\":";
    print_history_tokens(static_growth_result.steps.at(growth_cut_counts[i] - 1U).published_histories);
    std::cout << ",\"prefix_tokens\":";
    print_history_tokens(growth_prefixes[i].histories);
    std::cout << ",\"resumed_tokens\":";
    print_history_tokens(growth_resumed[i].histories);
    std::cout << '}';
  }
  std::cout << "],\"direct_tokens\":";
  print_history_tokens(static_growth_result.histories);
  std::cout << ",\"bounded_run_direct\":";
  print_evolution(bounded_growth_direct);
  std::cout << ",\"bounded_run_prefix\":";
  print_evolution(bounded_growth_prefix);
  std::cout << ",\"bounded_run_resumed\":";
  print_evolution(bounded_growth_resumed);
  std::cout << ",\"bounded_run_resume_callback_counts\":[";
  for (std::size_t index = 0U;
       index < bounded_growth_resume_callback_counts.size(); ++index) {
    if (index > 0U) std::cout << ',';
    std::cout << bounded_growth_resume_callback_counts[index];
  }
  std::cout << ']';
  std::cout << ",\"cancelled_run\":";
  print_evolution(cancelled_growth);
  std::cout << ",\"cancelled_run_resumed\":";
  print_evolution(cancelled_growth_resumed);
  std::cout << ",\"unstarted\":";
  print_evolution(unstarted_growth);
  std::cout << ",\"unstarted_checkpoint_memory\":"
            << unstarted_checkpoint.controller_consecutive_growth_headroom_steps
            << ",\"unstarted_checkpoint_accepted_steps\":"
            << unstarted_checkpoint.accepted_step_count
            << ",\"unstarted_checkpoint_rejected_steps\":"
            << unstarted_checkpoint.rejected_step_count
            << ",\"overflow_boundary_input\":"
            << boundary_memory_request.initial_consecutive_growth_headroom_steps
            << ",\"overflow_boundary_returned\":"
            << boundary_memory.controller_consecutive_growth_headroom_steps
            << ",\"capped\":";
  print_evolution(capped_growth);
  std::cout << ",\"capped_resumed\":";
  print_evolution(capped_resume);
  std::cout << ",\"headroom_reset\":";
  print_evolution(headroom_reset);
  std::cout << ",\"rejected_reset\":";
  print_evolution(rejected_growth);
  for (const auto& [name, value] : std::array<std::pair<const char*, bool>, 10>{{
           {"disabled_memory_rejected", disabled_memory_rejected},
           {"continuous_memory_rejected", continuous_memory_rejected},
           {"overflowing_memory_rejected", overflowing_memory_rejected},
           {"accepted_counter_overflow_rejected", accepted_counter_overflow_rejected},
           {"rejected_counter_overflow_rejected", rejected_counter_overflow_rejected},
           {"total_counter_overflow_rejected", total_counter_overflow_rejected},
           {"rejected_boundary_checkpoint_rejected", rejected_boundary_checkpoint_rejected},
           {"memory_tamper_rejected", growth_memory_tamper_rejected},
           {"old_schema_rejected", old_growth_schema_rejected},
           {"old_magic_rejected", old_growth_magic_rejected}}}) {
    std::cout << ",\"" << name << "\":" << (value ? "true" : "false");
  }
  std::cout << "},\"evolutions\":[";
  print_evolution(static_result);
  std::cout << ',';
  print_evolution(static_multirate_result);
  std::cout << ',';
  print_evolution(static_growth_result);
  std::cout << ',';
  print_evolution(static_continuous_result);
  std::cout << ',';
  print_evolution(certificate_cost_result);
  std::cout << ',';
  print_evolution(fast_result);
  std::cout << ',';
  print_evolution(binary_result);
  std::cout << ',';
  print_evolution(adaptive_result);
  std::cout << ',';
  print_evolution(traversal_exclusion_result);
  std::cout << ',';
  print_evolution(dispersed_boundary_result);
  std::cout << ',';
  print_evolution(binary_window_disabled_result);
  std::cout << "],\"binary_single_thread\":";
  print_evolution(binary_single_thread_result);
  std::cout << ",\"far_field_analytic_control\":";
  print_far_field_control(far_field_control);
  std::cout << ",\"far_field_traversal_cascade\":";
  print_far_field_control(far_field_traversal_control);
  std::cout << ",\"far_field_dispersal_disabled\":";
  print_atomic(dispersed_boundary_disabled);
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
  std::cout << ",\"joint_event_fail_closed\":";
  print_atomic(joint_finite_event_step);
  std::cout << ",\"joint_event_halt_code\":\""
            << *joint_event_halt_code << "\"";
  std::cout << ",\"joint_event_ordinary_fallback_selected\":"
            << (ordinary_joint_event_fallback_selected ? "true" : "false");
  std::cout << ",\"joint_event_adjudicated_fallback\":";
  print_evolution(adjudicated_joint_event);
  std::cout << ",\"event_acceptance_single_thread\":";
  print_atomic(finite_event_single_thread_step);
  std::cout << ",\"event_atomic_resource_failure\":";
  print_atomic(finite_event_resource_step);
  std::cout << ",\"borg_16_history_boundary_event\":";
  print_atomic(borg_history_boundary_event_step);
  std::cout << ",\"pinned_fold_temporal_onset\":";
  print_pinned_fold_temporal_onset(pinned_temporal_onset);
  std::cout << ",\"pinned_fold_temporal_onset_disabled\":";
  print_pinned_fold_temporal_onset(pinned_temporal_disabled_onset);
  std::cout << ",\"event_control\":";
  print_event(event_control);
  std::cout << ",\"uncertain_event_ordinary\":";
  print_event(uncertain_event_ordinary);
  std::cout << ",\"uncertain_event_joint\":";
  print_event(uncertain_event_joint);
  std::cout << ",\"research_budget_event_control\":";
  print_event(research_budget_event_control);
  std::cout << ",\"interactive_budget_event_control\":";
  print_event(interactive_budget_event_control);
  std::cout << ",\"under_budget_event_control\":";
  print_event(under_budget_event_control);
  std::cout << ",\"event_mpfr\":";
  print_event(event_mpfr);
  std::cout << ",\"event_regulator\":";
  print_regulator(event_regulator);
  std::cout << ",\"regulator_matching_analytic_control\":";
  print_regulator_matching_control(regulator_matching_control);
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

void print_far_field_dispersal_timing() {
  const auto enabled_request = make_dispersed_boundary_request(
      "far-field-dispersed-3-3-boundary-timing", "0.25");
  const auto enabled = eom::evolve_native_coupled_histories(enabled_request);
  const auto disabled_request = make_dispersed_boundary_request(
      "far-field-dispersed-3-3-boundary-disabled-timing", "0");
  std::vector<eom::NativePublishedPath> histories;
  for (const auto& path : disabled_request.paths) {
    histories.push_back({path.path_id, path.history});
  }
  const auto disabled = eom::certify_native_atomic_coupled_step(
      disabled_request, histories, 0, "0", "0.1");
  const auto& step = enabled.steps.front();
  const auto& final_step = enabled.steps.back();
  std::cout << "{\"schema\":\"eom_far_field_dispersal_timing/v1\""
            << ",\"enabled_status\":\"" << enabled.status
            << "\",\"enabled_step_wall_seconds\":"
            << step.timing.total_wall_seconds
            << ",\"enabled_final_step_wall_seconds\":"
            << final_step.timing.total_wall_seconds
            << ",\"enabled_total_wall_seconds\":"
            << enabled.timing.total_wall_seconds
            << ",\"enabled_enclosed_pairs\":"
            << step.accepted_snapshot->traversal_enclosed_pairs
            << ",\"enabled_exact_pairs\":"
            << step.accepted_snapshot->traversal_exact_pairs
            << ",\"disabled_status\":\"" << disabled.status
            << "\",\"disabled_failure_code\":\""
            << disabled.failure_code
            << "\",\"disabled_step_wall_seconds\":"
            << disabled.timing.total_wall_seconds << "}\n";
}

void print_certified_correction_retry() {
  auto retry_request = request(
      "certified-residual-scaled-correction-retry",
      {{"scale-a", "1",
        history("certified-scaled-correction-a", "5", {"0", "0", "0", "0"})},
       {"scale-b", "1",
        history("certified-scaled-correction-b", "5", {"2", "0", "0", "0"})}},
      "5", "5.04", "0.04", "0.000001", "1", "1", "1e-12", "1", 1);
  retry_request.max_step_attempts = 2;
  const auto evolution = eom::evolve_native_coupled_histories(retry_request);
  if (evolution.steps.size() < 2U) {
    throw std::runtime_error(
        "certified correction retry control did not produce two attempts");
  }
  const auto attempted_width = [](const eom::NativeAtomicStepCertificate& row) {
    return std::stod(row.attempted_end) - std::stod(row.attempted_start);
  };
  const auto& first = evolution.steps[0];
  const auto& second = evolution.steps[1];
  std::cout << std::setprecision(17)
            << "{\"schema\":\"eom_certified_correction_retry/v1\""
            << ",\"first_failure_code\":\"" << first.failure_code << "\""
            << ",\"first_residual\":"
            << first.correction_residual.value_or(-1.0)
            << ",\"retry_scale\":" << first.correction_retry_scale
            << ",\"second_width\":" << attempted_width(second)
            << ",\"publication_atomic\":"
            << (first.publication_atomic ? "true" : "false") << "}\n";
}

}  // namespace

int main(int argc, char** argv) {
  std::cout.imbue(std::locale::classic());
  try {
    if (argc != 2 ||
        (std::string(argv[1]) != "all" &&
         std::string(argv[1]) != "far-field-dispersal" &&
         std::string(argv[1]) != "bounded-population-long-horizon" &&
         std::string(argv[1]) != "bounded-population-fine-thread-1" &&
         std::string(argv[1]) != "bounded-population-fine-thread-4" &&
         std::string(argv[1]) != "finite-width-post-event" &&
         std::string(argv[1]) != "certified-correction-retry")) {
      std::cerr << "usage: eom_native_evolution_fixture_cli "
                   "all|far-field-dispersal|bounded-population-long-horizon|"
                   "bounded-population-fine-thread-1|"
                   "bounded-population-fine-thread-4|"
                   "finite-width-post-event|"
                   "certified-correction-retry\n";
      return EXIT_FAILURE;
    }
    if (std::string(argv[1]) == "all") {
      print_all();
    } else if (std::string(argv[1]) == "far-field-dispersal") {
      print_far_field_dispersal_timing();
    } else if (std::string(argv[1]) == "bounded-population-long-horizon") {
      print_bounded_population_long_horizon();
    } else if (std::string(argv[1]) ==
               "bounded-population-fine-thread-1") {
      print_bounded_population_fine(1U);
    } else if (std::string(argv[1]) ==
               "bounded-population-fine-thread-4") {
      print_bounded_population_fine(4U);
    } else if (std::string(argv[1]) == "finite-width-post-event") {
      print_finite_width_post_event();
    } else {
      print_certified_correction_retry();
    }
    return EXIT_SUCCESS;
  } catch (const std::exception& error) {
    std::cerr << "eom native evolution fixture failed: " << error.what() << '\n';
    return EXIT_FAILURE;
  }
}
