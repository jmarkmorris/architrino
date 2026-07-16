#pragma once

#include "architrino/eom/CertifiedAcceleration.hpp"
#include "architrino/eom/CertifiedTraversal.hpp"
#include "architrino/eom/ExactPairBatch.hpp"
#include "architrino/eom/History.hpp"

#include <cstddef>
#include <functional>
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
  std::string start_time;
  std::string end_time;
  std::string initial_step;
  std::string minimum_step;
  std::string maximum_step;
  std::string field_speed;
  std::string coupling;
  std::string root_tolerance = "1e-12";
  std::string source_normal_floor = "1e-30";
  std::string acceleration_tolerance = "1e-9";
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
  bool use_certified_traversal = true;
  std::uint64_t traversal_exact_tile_pair_limit = 4096;
  std::size_t traversal_maximum_nodes = 1000000;
  std::uint64_t traversal_maximum_exact_pairs = 10000000;
  // Diagnostics only: stop after this many atomically accepted steps.
  // Zero preserves the ordinary requested-end-time behavior.
  std::size_t diagnostic_maximum_accepted_steps = 0;
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
  std::string source_path_id;
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
  std::string source_path_id;
  std::size_t required_levels;
  std::string refinement_ratio;
  std::string convergence_tolerance;
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
  std::string source_path_id;
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
  // Worker CPU sums can exceed wall time when exact pairs run concurrently.
  double root_binary64_cpu_seconds = 0.0;
  std::size_t root_pair_count = 0;
  std::size_t root_reevaluated_cells = 0;
  std::size_t root_warm_excluded_cells = 0;
  double root_mpfr_cpu_seconds = 0.0;
  std::size_t root_mpfr_pair_count = 0;
  std::size_t root_mpfr_attempt_count = 0;
  double root_mpfr_escalation_cpu_seconds = 0.0;
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
  std::uint64_t traversal_excluded_pairs;
  std::uint64_t traversal_exact_pairs;
  std::optional<CertifiedTraversalCertificate> traversal_certificate;
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
  double root_binary64_cpu_seconds = 0.0;
  std::size_t root_pair_count = 0;
  std::size_t root_reevaluated_cells = 0;
  std::size_t root_warm_excluded_cells = 0;
  double root_mpfr_cpu_seconds = 0.0;
  std::size_t root_mpfr_pair_count = 0;
  std::size_t root_mpfr_attempt_count = 0;
  double root_mpfr_escalation_cpu_seconds = 0.0;
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

struct NativeEndpointRootContinuationCertificate {
  std::string schema;
  std::string status;
  std::string receiver_path_id;
  std::string source_path_id;
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
  std::vector<NativeHistoryFingerprint> candidate_history_fingerprints;
  NativeCorrectedSubstepTiming timing;
};

struct NativePathLocalError {
  std::string path_id;
  double position_error;
  double velocity_error;
};

[[nodiscard]] std::optional<NativeEndpointRootContinuationCertificate>
certify_native_coincident_endpoint_root_continuation(
    const NativeAccelerationSnapshotCertificate& start,
    const NativeAccelerationSnapshotCertificate& end,
    const std::string& receiver_path_id,
    const std::string& source_path_id);

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
  std::string failure_code;
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
  double root_binary64_cpu_seconds = 0.0;
  std::size_t root_pair_count = 0;
  std::size_t root_reevaluated_cells = 0;
  std::size_t root_warm_excluded_cells = 0;
  double root_mpfr_cpu_seconds = 0.0;
  std::size_t root_mpfr_pair_count = 0;
  std::size_t root_mpfr_attempt_count = 0;
  double root_mpfr_escalation_cpu_seconds = 0.0;
  std::size_t root_mpfr_escalation_attempt_count = 0;
  double acceleration_wall_seconds = 0.0;
  double finite_width_execution_union_wall_seconds = 0.0;
  double sharp_execution_union_wall_seconds = 0.0;
  double finite_width_sharp_overlap_wall_seconds = 0.0;
  double acceleration_worker_idle_orchestration_wall_seconds = 0.0;
  double acceleration_precision_escalation_worker_seconds = 0.0;
  std::size_t acceleration_precision_escalation_attempt_count = 0;
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
  std::vector<NativeAtomicStepCertificate> steps;
  std::size_t accepted_step_count;
  std::size_t rejected_step_count;
  std::string controller_step_size;
  std::size_t controller_certificate_cost_cooldown_remaining = 0;
  std::string halt_code;
  std::string evidence_status;
  bool all_steps_atomic;
  NativeEvolutionTiming timing;
};

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
    const std::string& source_charge,
    const std::string& reception_lower,
    const std::string& reception_upper);

[[nodiscard]] NativeRegulatorConvergenceCertificate
certify_native_regulator_convergence(
    const NativeCoupledEvolutionRequest& request,
    const NativePublishedPath& receiver,
    const NativePublishedPath& source,
    const std::string& receiver_charge,
    const std::string& source_charge,
    const std::string& reception_lower,
    const std::string& reception_upper);

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
