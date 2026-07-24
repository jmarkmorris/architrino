#pragma once

#include "architrino/eom/CertifiedAcceleration.hpp"
#include "architrino/eom/CertifiedTraversal.hpp"
#include "architrino/eom/ExactPairBatch.hpp"
#include "architrino/eom/History.hpp"
#include "architrino/eom/JointRootBracket.hpp"
#include "architrino/eom/JointAffineHistory.hpp"

#include <cstddef>
#include <cstdint>
#include <functional>
#include <limits>
#include <map>
#include <optional>
#include <string>
#include <utility>
#include <vector>

namespace architrino::eom {

inline constexpr const char* kNativeIntegrationMethod =
    "coupled_cubic_corrector_with_pinned_fold_onset/v1";
inline constexpr const char* kLegacyNativeIntegrationMethod =
    "coupled_cubic_corrector_with_step_doubling/v0";
inline constexpr const char* kNativeMultirateIntegrationMethod =
    "coupled_cubic_corrector_with_synchronized_block_step_publication/v1";

struct NativeCoupledPathInput {
  std::string path_id;
  std::string charge;
  RetainedHistory history;
};

struct NativePublishedPath {
  std::string path_id;
  RetainedHistory history;
};

struct NativeCoupledEvolutionRequest {
  std::string run_id;
  std::vector<NativeCoupledPathInput> paths;
  // Retry-time admitted joint states keyed by the exact root row identity
  // "receiver/transmitter/reception". The exact-pair consumer recomputes all
  // geometry and ordinary fallback data before it can use one.
  std::map<std::string, JointRootBracketRequest> joint_root_point_states;
  std::map<std::string, JointAffineRetainedHistory> joint_histories;
  std::string start_time;
  std::string end_time;
  std::string initial_step;
  std::string minimum_step;
  std::string maximum_step;
  std::string field_speed;
  std::string coupling;
  std::string root_tolerance = "1e-12";
  std::string transmitter_factor_floor = "1e-30";
  std::string acceleration_tolerance = "1e-9";
  // Fraction of the acceleration component-width tolerance reserved for
  // certified per-pair far-field enclosures. Zero disables the route.
  std::string far_field_enclosure_fraction = "0";
  // Analysis snapshots may consume a certified far-field enclosure directly.
  // Evolution can instead require exact pair fallback so that an optional
  // pruning width is not integrated into every later retained state.
  bool use_far_field_enclosure_in_evolution = true;
  std::string chart_policy = "sharp";
  std::string causal_width = "0.2";
  std::string core_scale = "0.2";
  std::string quadrature_tolerance = "1e-8";
  std::string event_impulse_tolerance = "1e-7";
  std::string event_position_moment_tolerance = "1e-7";
  std::string regulator_refinement_ratio = "0.5";
  std::string regulator_convergence_tolerance = "1e-3";
  std::string position_tolerance = "1e-8";
  std::string velocity_tolerance = "1e-8";
  std::string correction_tolerance = "1e-8";
  std::string certified_budget_schema;
  std::string certified_budget_preset_id;
  std::string certified_budget_allocation_hash;
  std::string certified_budget_allocation_json;
  std::string position_increment_budget;
  std::string velocity_increment_budget;
  std::string event_impulse_budget = "1e-7";
  std::string event_position_moment_budget = "1e-7";
  std::string independent_overlap_budget = "0";
  std::string event_quadrature_fraction = "0.35";
  std::string event_causal_regulator_fraction = "0.15";
  std::string event_core_regulator_fraction = "0.15";
  std::string event_state_numerical_fraction = "0.15";
  std::string event_matching_fraction = "0.20";
  std::string deterministic_reduction_policy = "fixed-pairwise";
  std::string rounding_mode = "outward";
  std::string receiver_event_allocation_rule =
      "equal-routed-pair-weight/v1";
  std::size_t resolved_receiver_event_pair_count = 1;
  std::string resolved_receiver_event_pair_weight = "1";
  std::size_t root_max_depth = 256;
  std::size_t root_max_cells = 500000;
  std::size_t quadrature_max_depth = 32;
  std::size_t quadrature_max_cells = 200000;
  std::size_t event_max_depth = 24;
  std::size_t event_max_cells = 200000;
  std::size_t regulator_refinement_levels = 3;
  unsigned initial_mpfr_bits = 128;
  unsigned maximum_mpfr_bits = 512;
  bool force_event_precision_escalation = false;
  std::size_t max_correction_iterations = 12;
  std::size_t max_step_attempts = 10000;
  std::size_t max_rejected_steps = 1000;
  std::size_t thread_count = 1;
  std::uint64_t memory_budget_bytes =
      std::numeric_limits<std::uint64_t>::max();
  bool use_adaptive_step_growth = false;
  // Replace the legacy two-hit power-of-two growth rule with a bounded
  // error-scaled controller. Acceptance tolerances are unchanged.
  bool use_continuous_adaptive_step = false;
  std::string adaptive_step_safety_factor = "0.9";
  std::string adaptive_step_minimum_scale = "0.5";
  std::string adaptive_step_maximum_scale = "2";
  // Publish a single certified coarse segment for paths whose dense
  // full-versus-two-half synchronization error has explicit headroom. Other
  // paths retain the two half-step segments; every path still synchronizes and
  // publishes atomically at the same accepted receiver time.
  bool use_synchronized_multirate_publication = false;
  std::string multirate_synchronization_fraction = "0.125";
  // Publish a four-quarter solution whose local acceptance signal is the
  // two-half-versus-four-quarter difference. Configured tolerance values are
  // unchanged, but this is a different estimator from full-versus-two-half.
  bool use_quarter_step_publication = false;
  // Probe endpoint root searches in binary64 before paying MPFR. One bounded
  // shorter landing is attempted first; the unchanged error controller
  // retains acceptance authority. Any adjusted acceptance starts a recovery
  // cooldown and suppresses immediate regrowth, preventing a Zeno approach to
  // a persistent precision boundary.
  bool use_certificate_cost_feedback = false;
  std::size_t certificate_cost_maximum_probe_adjustments = 1;
  std::string certificate_cost_probe_scale = "0.5";
  std::size_t certificate_cost_unavoidable_cooldown_steps = 4;
  // Dynamic restart state, normally populated from a checkpoint.
  std::size_t certificate_cost_initial_cooldown_steps = 0;
  bool use_analytic_pinned_fold = true;
  bool use_correlated_self_chord = true;
  bool use_stable_circular_residual = true;
  bool use_pinned_fold_aware_temporal_step = true;
  bool use_certified_history_window = true;
  bool use_warm_root_exclusion = true;
  // Internal adjudication state: a floor-level sharp correction failure may
  // rerun only the certified opposite-polarity core-proximity pairs through
  // the finite-width chart. Callers normally leave this empty.
  std::vector<std::pair<std::string, std::string>>
      adjudicated_finite_width_pairs;
  // Internal atomic-step state.  A first half may carry a certified event
  // state into the second half while keeping the ordered pair pinned; the
  // enclosing atomic step still cannot publish until the final half exits.
  bool allow_pending_finite_width_exit = false;
  bool use_certified_traversal = true;
  std::uint64_t traversal_exact_tile_pair_limit = 4096;
  std::size_t traversal_maximum_nodes = 1000000;
  std::uint64_t traversal_maximum_exact_pairs = 10000000;
  // Diagnostics only: stop after this many atomically accepted steps.
  // Zero preserves the ordinary requested-end-time behavior.
  std::size_t diagnostic_maximum_accepted_steps = 0;
  // Diagnostics only: retain a rejected candidate in its in-memory step
  // certificate for post-halt observers.  It remains unpublished and is not
  // serialized by the Borg protocol.
  bool retain_diagnostic_candidate_histories = false;
  // Diagnostics only: invoked after an accepted step is atomically published.
  std::function<void(std::size_t, const std::string&)>
      accepted_step_callback;
  // Diagnostics only: invoked before a failed corrected-substep candidate is
  // discarded.  The callback cannot alter publication; rejected steps still
  // publish their input histories only.
  std::function<void(
      const std::string&,
      const std::string&,
      const std::string&,
      std::size_t,
      const std::vector<NativePublishedPath>&)>
      failed_substep_candidate_callback;
};

struct NativeFoldCausticImpulseCertificate {
  std::string schema;
  std::string status;
  std::string receiver_path_id;
  std::string transmitter_path_id;
  std::string reception_lower;
  std::string reception_upper;
  std::string causal_width;
  std::string core_scale;
  std::optional<IntervalVector> impulse;
  std::optional<IntervalVector> position_moment;
  std::size_t visited_cells;
  std::size_t gaussian_tail_cells = 0;
  std::size_t centered_emission_cells = 0;
  std::size_t monotone_residual_cells = 0;
  std::size_t direct_joint_cells = 0;
  std::size_t joint_displacement_cells = 0;
  double receiver_position_error_upper = 0.0;
  double receiver_velocity_error_upper = 0.0;
  double transmitter_position_error_upper = 0.0;
  double transmitter_velocity_error_upper = 0.0;
  double last_maximum_component_width = 0.0;
  double last_maximum_position_moment_component_width = 0.0;
  double last_largest_cell_width = 0.0;
  std::string precision_route;
  unsigned precision_bits;
  std::string failure_code;
};

struct NativeRegulatorRefinementLevel {
  std::size_t level;
  std::string causal_width;
  std::string core_scale;
  NativeFoldCausticImpulseCertificate event_impulse;
  std::optional<double> maximum_impulse_delta_from_previous;
  std::optional<double> maximum_position_moment_delta_from_previous;
};

struct NativeRegulatorRefinementSeries {
  std::string control_id;
  std::vector<NativeRegulatorRefinementLevel> levels;
  std::optional<double> final_impulse_delta;
  std::optional<double> maximum_ladder_impulse_delta;
  std::optional<double> final_position_moment_delta;
  std::optional<double> maximum_ladder_position_moment_delta;
  bool converged;
};

struct NativeRegulatorConvergenceCertificate {
  std::string schema;
  std::string status;
  std::string receiver_path_id;
  std::string transmitter_path_id;
  std::size_t required_levels;
  std::string refinement_ratio;
  std::string convergence_tolerance;
  std::size_t receiver_routed_pair_count = 1;
  std::string receiver_pair_allocation_weight = "1";
  std::string event_impulse_row_budget;
  std::string event_position_moment_row_budget;
  std::string quadrature_impulse_row_budget;
  std::string quadrature_position_moment_row_budget;
  NativeFoldCausticImpulseCertificate accepted_event_impulse;
  std::vector<NativeRegulatorRefinementSeries> refinement_series;
  std::string failure_code;
};

struct NativeHistoryFingerprint {
  std::string path_id;
  std::string fingerprint;
};

struct NativeSnapshotRootRow {
  std::string receiver_path_id;
  std::string transmitter_path_id;
  ExactPairCertificate certificate;
};

struct NativeCausalPrefixExclusionCertificate {
  std::string schema;
  std::string status;
  std::string original_search_lower;
  std::string active_search_lower;
  std::string reception_time;
  double excluded_duration = 0.0;
  double separation_upper = 0.0;
  double causal_distance_lower = 0.0;
  double residual_upper = 0.0;
  bool full_ordered_pair_prefix_excluded = false;
};

struct NativeSnapshotTiming {
  double history_window_wall_seconds = 0.0;
  double traversal_wall_seconds = 0.0;
  double exact_root_batch_wall_seconds = 0.0;
  // Worker wall-time sums can exceed elapsed wall time when pairs overlap.
  double root_binary64_worker_wall_seconds = 0.0;
  std::size_t root_pair_count = 0;
  std::size_t root_reevaluated_cells = 0;
  std::size_t root_warm_excluded_cells = 0;
  double root_mpfr_worker_wall_seconds = 0.0;
  std::size_t root_mpfr_pair_count = 0;
  std::size_t root_mpfr_attempt_count = 0;
  double root_mpfr_escalation_worker_wall_seconds = 0.0;
  std::size_t root_mpfr_escalation_attempt_count = 0;
  double acceleration_wall_seconds = 0.0;
  double finite_width_execution_union_wall_seconds = 0.0;
  double sharp_execution_union_wall_seconds = 0.0;
  double finite_width_sharp_overlap_wall_seconds = 0.0;
  double acceleration_worker_idle_orchestration_wall_seconds = 0.0;
  double acceleration_precision_escalation_worker_seconds = 0.0;
  std::size_t acceleration_precision_escalation_attempt_count = 0;
  double total_wall_seconds = 0.0;
};

struct NativeAccelerationSnapshotCertificate {
  std::string schema;
  std::string status;
  std::string reception_time;
  std::string failure_code;
  std::string pair_selection_route;
  std::uint64_t logical_ordered_pairs;
  std::uint64_t traversal_excluded_pairs;
  std::uint64_t traversal_exact_pairs;
  std::uint64_t traversal_enclosed_pairs;
  std::uint64_t traversal_unresolved_pairs;
  double enclosed_error_width_total;
  double enclosed_error_width_max_receiver;
  std::optional<CertifiedTraversalCertificate> traversal_certificate;
  std::vector<NativeFarFieldEnclosureCertificate>
      far_field_enclosure_certificates;
  NativeCausalPrefixExclusionCertificate causal_prefix_exclusion;
  std::vector<NativeSnapshotRootRow> root_certificates;
  NativeAccelerationReconstructionCertificate acceleration;
  NativeSnapshotTiming timing;
};

struct NativeCorrectedSubstepTiming {
  double history_copy_hash_wall_seconds = 0.0;
  std::size_t reused_start_snapshot_count = 0;
  double snapshot_total_wall_seconds = 0.0;
  std::size_t snapshot_count = 0;
  double history_window_wall_seconds = 0.0;
  double traversal_wall_seconds = 0.0;
  double exact_root_batch_wall_seconds = 0.0;
  double root_binary64_worker_wall_seconds = 0.0;
  std::size_t root_pair_count = 0;
  std::size_t root_reevaluated_cells = 0;
  std::size_t root_warm_excluded_cells = 0;
  double root_mpfr_worker_wall_seconds = 0.0;
  std::size_t root_mpfr_pair_count = 0;
  std::size_t root_mpfr_attempt_count = 0;
  double root_mpfr_escalation_worker_wall_seconds = 0.0;
  std::size_t root_mpfr_escalation_attempt_count = 0;
  double acceleration_wall_seconds = 0.0;
  double finite_width_execution_union_wall_seconds = 0.0;
  double sharp_execution_union_wall_seconds = 0.0;
  double finite_width_sharp_overlap_wall_seconds = 0.0;
  double acceleration_worker_idle_orchestration_wall_seconds = 0.0;
  double acceleration_precision_escalation_worker_seconds = 0.0;
  std::size_t acceleration_precision_escalation_attempt_count = 0;
  double regulator_ladder_wall_seconds = 0.0;
  double common_domain_wall_seconds = 0.0;
  double total_wall_seconds = 0.0;
};

struct NativeEndpointRootContinuationCertificate {
  std::string schema;
  std::string status;
  std::string receiver_path_id;
  std::string transmitter_path_id;
  std::size_t start_root_count;
  std::size_t end_root_count;
  int boundary_branch_sign;
  bool start_root_free_complement;
  bool end_root_free_complement;
  bool memory_boundary_clear;
  bool coincident_endpoint_excluded;
  std::string classification;
  std::string failure_code;
};

struct NativePinnedFoldTemporalStepCertificate {
  std::string schema;
  std::string status;
  std::string path_id;
  std::string onset_time;
  std::string history_fingerprint;
  std::string tangential_speed;
  std::string field_speed;
  std::string start_root_status;
  std::size_t start_root_count;
  bool start_root_free_complement;
  bool memory_boundary_clear;
  bool coincident_endpoint_excluded;
  std::string start_acceleration_chart;
  std::string temporal_rule;
};

struct NativeCommonDomainChartCertificate {
  std::string schema = "eom_native_fwc_common_domain_chart_certificate/v1";
  std::string status;
  std::string reception_lower;
  std::string reception_upper;
  std::size_t certified_root_count = 0;
  double transmitter_factor_absolute_lower = 0.0;
  double separation_lower = 0.0;
  std::optional<IntervalVector> sharp_impulse;
  std::optional<IntervalVector> finite_width_impulse;
  std::optional<IntervalVector> sharp_position_moment;
  std::optional<IntervalVector> finite_width_position_moment;
  std::optional<IntervalVector> acceleration_second_derivative_bound;
  std::optional<IntervalVector> impulse_shortcut_remainder;
  std::optional<IntervalVector> position_moment_shortcut_remainder;
  std::optional<IntervalVector> track_impulse_remainder;
  std::optional<IntervalVector> track_position_moment_remainder;
  std::optional<IntervalVector> emission_second_derivative_bound;
  std::optional<IntervalVector> regulator_leading_impulse;
  std::optional<IntervalVector> regulator_leading_position_moment;
  std::optional<IntervalVector> regulator_higher_order_impulse_remainder;
  std::optional<IntervalVector>
      regulator_higher_order_position_moment_remainder;
  std::optional<IntervalVector> regulator_impulse_remainder;
  std::optional<IntervalVector> regulator_position_moment_remainder;
  std::size_t disjoint_component = 3U;
  double disjoint_width = 0.0;
  double applicable_remainder_budget = 0.0;
  double applicable_regulator_remainder_budget = 0.0;
  double applicable_total_remainder_budget = 0.0;
  double post_accounting_distance = 0.0;
  std::string failure_code;
};

struct NativeFiniteWidthStateCertificate {
  std::string schema = "eom_native_fwc_state_certificate/v1";
  std::string status;
  std::string receiver_path_id;
  std::string transmitter_path_id;
  std::string reception_lower;
  std::string reception_upper;
  std::size_t receiver_routed_pair_count = 0;
  double receiver_pair_allocation_weight = 0.0;
  std::string receiver_event_impulse_total;
  std::string receiver_event_position_moment_total;
  std::string event_impulse_row_budget;
  std::string event_position_moment_row_budget;
  std::string quadrature_impulse_row_budget;
  std::string quadrature_position_moment_row_budget;
  std::string causal_regulator_impulse_row_budget;
  std::string causal_regulator_position_moment_row_budget;
  std::string core_regulator_impulse_row_budget;
  std::string core_regulator_position_moment_row_budget;
  std::string state_numerical_impulse_row_budget;
  std::string state_numerical_position_moment_row_budget;
  std::string matching_impulse_row_budget;
  std::string matching_position_moment_row_budget;
  bool routed_pair_pinned = false;
  bool event_pair_excluded_from_background = false;
  std::optional<IntervalVector> background_impulse;
  std::optional<IntervalVector> background_position_moment;
  std::optional<IntervalVector> reconstructed_endpoint_position;
  std::optional<IntervalVector> reconstructed_endpoint_velocity;
  std::optional<IntervalVector> candidate_endpoint_position;
  std::optional<IntervalVector> candidate_endpoint_velocity;
  bool endpoint_reconstruction_passed = false;
  std::vector<NativeCommonDomainChartCertificate> common_domains;
  bool common_domain_chart_overlap_passed = false;
  bool exit_passed = false;
  std::string failure_code;
};

struct NativeCorrectedSubstepCertificate {
  std::string schema;
  std::string status;
  std::string start_time;
  std::string end_time;
  NativeAccelerationSnapshotCertificate start_snapshot;
  std::optional<NativeAccelerationSnapshotCertificate> endpoint_snapshot;
  std::size_t correction_iterations;
  std::optional<double> correction_error;
  std::string failure_code;
  std::vector<NativeFoldCausticImpulseCertificate> event_impulses;
  std::vector<NativeRegulatorConvergenceCertificate>
      regulator_convergence_certificates;
  std::vector<NativeEndpointRootContinuationCertificate>
      endpoint_root_continuations;
  std::vector<NativePinnedFoldTemporalStepCertificate>
      pinned_fold_onset_certificates;
  std::vector<NativeFiniteWidthStateCertificate>
      finite_width_state_certificates;
  std::vector<NativeHistoryFingerprint> candidate_history_fingerprints;
  NativeCorrectedSubstepTiming timing;
};

struct NativePathLocalError {
  std::string path_id;
  double position_error;
  double velocity_error;
  std::array<double, 3> position_errors{};
  std::array<double, 3> velocity_errors{};
};

[[nodiscard]] std::optional<NativeEndpointRootContinuationCertificate>
certify_native_coincident_endpoint_root_continuation(
    const NativeAccelerationSnapshotCertificate& start,
    const NativeAccelerationSnapshotCertificate& end,
    const std::string& receiver_path_id,
    const std::string& transmitter_path_id);

[[nodiscard]] std::vector<NativePinnedFoldTemporalStepCertificate>
certify_native_pinned_fold_temporal_onset(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    const NativeAccelerationSnapshotCertificate& start_snapshot,
    const std::string& start_time);

struct NativeAtomicStepTiming {
  double corrected_substeps_wall_seconds = 0.0;
  double history_copy_hash_wall_seconds = 0.0;
  std::size_t reused_start_snapshot_count = 0;
  double recertification_wall_seconds = 0.0;
  double rejection_wall_seconds = 0.0;
  double total_wall_seconds = 0.0;
};

struct NativeAtomicStepCertificate {
  std::string schema;
  std::string status;
  std::string run_id;
  std::size_t step_index;
  std::string attempted_start;
  std::string attempted_end;
  std::string accepted_time;
  std::vector<NativeHistoryFingerprint> input_history_fingerprints;
  std::vector<NativePublishedPath> published_histories;
  std::map<std::string, JointAffineRetainedHistory>
      published_joint_histories;
  std::optional<std::vector<NativePublishedPath>>
      diagnostic_candidate_histories;
  std::vector<NativeHistoryFingerprint> candidate_history_fingerprints;
  std::vector<NativeCorrectedSubstepCertificate> substeps;
  std::optional<NativeAccelerationSnapshotCertificate> accepted_snapshot;
  std::optional<NativeAccelerationSnapshotCertificate> recertification_snapshot;
  std::vector<NativePathLocalError> local_errors;
  std::vector<NativePathLocalError> multirate_synchronization_errors;
  std::vector<std::string> multirate_coarse_path_ids;
  bool certificate_cost_probe = false;
  std::size_t certificate_cost_deferred_pair_count = 0;
  std::size_t certificate_cost_mpfr_attempt_count = 0;
  std::size_t certificate_cost_cooldown_remaining = 0;
  double root_time_pressure_ratio = 0.0;
  double root_pressure_step_cap = 0.0;
  std::string failure_code;
  std::optional<double> correction_residual;
  double correction_retry_scale = 0.0;
  std::string evidence_status;
  std::string integration_method;
  std::string reduction_policy;
  bool publication_atomic;
  NativeAtomicStepTiming timing;
};

struct NativeEvolutionTiming {
  double snapshot_total_wall_seconds = 0.0;
  std::size_t snapshot_count = 0;
  double history_window_wall_seconds = 0.0;
  double traversal_wall_seconds = 0.0;
  double exact_root_batch_wall_seconds = 0.0;
  double root_binary64_worker_wall_seconds = 0.0;
  std::size_t root_pair_count = 0;
  std::size_t root_reevaluated_cells = 0;
  std::size_t root_warm_excluded_cells = 0;
  double root_mpfr_worker_wall_seconds = 0.0;
  std::size_t root_mpfr_pair_count = 0;
  std::size_t root_mpfr_attempt_count = 0;
  double root_mpfr_escalation_worker_wall_seconds = 0.0;
  std::size_t root_mpfr_escalation_attempt_count = 0;
  double acceleration_wall_seconds = 0.0;
  double finite_width_execution_union_wall_seconds = 0.0;
  double sharp_execution_union_wall_seconds = 0.0;
  double finite_width_sharp_overlap_wall_seconds = 0.0;
  double acceleration_worker_idle_orchestration_wall_seconds = 0.0;
  double acceleration_precision_escalation_worker_seconds = 0.0;
  std::size_t acceleration_precision_escalation_attempt_count = 0;
  double regulator_ladder_wall_seconds = 0.0;
  double common_domain_wall_seconds = 0.0;
  double history_copy_hash_wall_seconds = 0.0;
  // Correction wall time includes its nested snapshot and history phases.
  double correction_wall_seconds = 0.0;
  std::size_t reused_start_snapshot_count = 0;
  double recertification_wall_seconds = 0.0;
  double rejection_wall_seconds = 0.0;
  double total_wall_seconds = 0.0;
};

struct NativeCoupledEvolutionCertificate {
  std::string schema;
  std::string status;
  std::string run_id;
  std::string start_time;
  std::string requested_end_time;
  std::string accepted_end_time;
  std::vector<NativePublishedPath> histories;
  std::map<std::string, JointAffineRetainedHistory> joint_histories;
  std::vector<NativeAtomicStepCertificate> steps;
  std::size_t accepted_step_count;
  std::size_t rejected_step_count;
  std::string controller_step_size;
  std::size_t controller_certificate_cost_cooldown_remaining = 0;
  std::string halt_code;
  std::string evidence_status;
  std::uint64_t memory_budget_bytes = 0;
  std::uint64_t memory_estimate_bytes = 0;
  bool all_steps_atomic;
  NativeEvolutionTiming timing;
};

[[nodiscard]] std::optional<std::string> native_nonretryable_halt_code(
    const NativeAtomicStepCertificate& rejected_step);

[[nodiscard]] bool native_joint_event_fallback_is_available(
    const NativeCoupledEvolutionRequest& request,
    const NativeAtomicStepCertificate& rejected_step);

[[nodiscard]] NativeAccelerationSnapshotCertificate
certify_native_acceleration_snapshot(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    const std::string& reception_time,
    const NativeAccelerationSnapshotCertificate* warm_snapshot = nullptr,
    const std::vector<NativePublishedPath>* warm_histories = nullptr,
    bool defer_root_precision_escalation = false);

[[nodiscard]] NativeFoldCausticImpulseCertificate
certify_native_fold_caustic_impulse(
    const NativeCoupledEvolutionRequest& request,
    const NativePublishedPath& receiver,
    const NativePublishedPath& source,
    const std::string& receiver_charge,
    const std::string& transmitter_charge,
    const std::string& reception_lower,
    const std::string& reception_upper,
    const JointAffineRetainedHistory* joint_receiver = nullptr,
    const JointAffineRetainedHistory* joint_source = nullptr);

[[nodiscard]] NativeCommonDomainChartCertificate
certify_native_common_domain_chart(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    const std::string& receiver_path_id,
    const std::string& transmitter_path_id,
    const std::string& reception_lower,
    const std::string& reception_upper,
    const std::string& event_end);

[[nodiscard]] NativeRegulatorConvergenceCertificate
certify_native_regulator_convergence(
    const NativeCoupledEvolutionRequest& request,
    const NativePublishedPath& receiver,
    const NativePublishedPath& source,
    const std::string& receiver_charge,
    const std::string& transmitter_charge,
    const std::string& reception_lower,
    const std::string& reception_upper,
    const JointAffineRetainedHistory* joint_receiver = nullptr,
    const JointAffineRetainedHistory* joint_source = nullptr);

[[nodiscard]] NativeAtomicStepCertificate certify_native_atomic_coupled_step(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    std::size_t step_index,
    const std::string& start_time,
    const std::string& end_time,
    const NativeAccelerationSnapshotCertificate* reusable_start_snapshot =
        nullptr,
    bool defer_endpoint_root_precision_escalation = false);

[[nodiscard]] NativeCoupledEvolutionCertificate evolve_native_coupled_histories(
    const NativeCoupledEvolutionRequest& request,
    const NativeAccelerationSnapshotCertificate*
        reusable_initial_snapshot = nullptr);

}  // namespace architrino::eom
