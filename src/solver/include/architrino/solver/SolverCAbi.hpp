#pragma once

#include <cstdint>

extern "C" {

struct ArchitrinoSolverVector3F64 {
  double x;
  double y;
  double z;
};

struct ArchitrinoSolverLinearPathSegmentF64 {
  double start_time;
  double end_time;
  ArchitrinoSolverVector3F64 position_at_start;
  ArchitrinoSolverVector3F64 velocity;
  double error_bound;
};

struct ArchitrinoSolverCausalRootRequestF64 {
  ArchitrinoSolverLinearPathSegmentF64 source;
  ArchitrinoSolverLinearPathSegmentF64 receiver;
  double hit_time;
  double signal_speed;
  double root_tolerance;
  int max_iterations;
  int scan_subdivisions;
};

struct ArchitrinoSolverCausalRootRowF64 {
  int root_id;
  int status_code;
  double emission_time;
  double hit_time;
  double delay;
  double distance;
  double residual;
  double jacobian;
  double branch_weight;
  double source_x;
  double source_y;
  double source_z;
  double receiver_x;
  double receiver_y;
  double receiver_z;
};

struct ArchitrinoSolverRootLedgerDetailRowF64 {
  std::uint64_t ledger_key;
  std::uint64_t source_key;
  std::uint64_t receiver_key;
  std::uint64_t root_key;
  double interval_start;
  double interval_end;
  double emission_time;
  double hit_time;
  double delay;
  double residual;
  double jacobian;
  double branch_weight;
  double bracket_start;
  double bracket_end;
  double source_x;
  double source_y;
  double source_z;
  double receiver_x;
  double receiver_y;
  double receiver_z;
  std::uint32_t entry_kind;
  std::uint32_t root_kind;
  std::uint32_t status_code;
  std::uint32_t jacobian_sign_stratum;
  std::uint32_t sequence_index;
  std::uint32_t iteration_count;
  std::uint32_t state_flags;
  std::uint32_t reserved0;
};

struct ArchitrinoSolverDelayedHitRowF64 {
  int event_id;
  int root_id;
  int status_code;
  int reserved0;
  double emission_time;
  double hit_time;
  double distance;
  double jacobian;
  double strength;
  double emission_x;
  double emission_y;
  double emission_z;
  double receiver_x;
  double receiver_y;
  double receiver_z;
  double unit_x;
  double unit_y;
  double unit_z;
};

struct ArchitrinoSolverCausalRootBatchItemRowF64 {
  int item_index;
  int status_code;
  int root_offset;
  int root_count;
  int reserved0;
  int reserved1;
};

struct ArchitrinoSolverPrecisionDiagnosticRowF64 {
  int status_code;
  int recommended_precision_path;
  int recommended_numeric_type;
  int flags;
  double time_orders;
  double geometry_orders;
  double speed_orders;
  double tolerance_orders;
  double time_max;
  double geometry_max;
  double speed_max;
  double tolerance_min;
  double time_min;
  double geometry_min;
};

struct ArchitrinoSolverPrecisionSolveOptions {
  int requested_precision_path;
  int claim_level;
  std::uint32_t allow_escalation;
  std::uint32_t run_validation_replay;
};

struct ArchitrinoSolverPrecisionSolveSummaryF64 {
  int requested_precision_path;
  int diagnostic_precision_path;
  int selected_precision_path;
  int selected_numeric_type;
  int claim_level;
  int status_code;
  int status_severity;
  int root_count;
  double root_tolerance;
  double max_residual;
  double min_abs_jacobian;
  int max_iterations;
  int scan_subdivisions;
  std::uint32_t escalated;
  std::uint32_t validation_replay_run;
  std::uint32_t validation_replay_matched;
  std::uint32_t reserved0;
};

struct ArchitrinoSolverErrorBudgetF64 {
  double global_tolerance;
  double root_isolation_tolerance;
  double delayed_hit_tolerance;
  double integration_tolerance;
  double stream_encoding_tolerance;
  double readback_tolerance;
  double projection_tolerance;
  double display_tolerance;
};

struct ArchitrinoSolverErrorBudgetStageInputF64 {
  int stage;
  int reserved0;
  double estimated_absolute_error;
};

struct ArchitrinoSolverErrorBudgetStageRowF64 {
  int stage;
  int authority;
  int status_code;
  int status_severity;
  double estimated_absolute_error;
  double tolerance;
  double tolerance_ratio;
};

struct ArchitrinoSolverErrorBudgetSummaryF64 {
  int authority;
  int status_code;
  int status_severity;
  int stage_count;
  double cumulative_error;
  double cumulative_budget_ratio;
};

struct ArchitrinoSolverPhaseClockF64 {
  double period;
  double epoch;
  double phase_offset;
};

struct ArchitrinoSolverPhaseAtHitRowF64 {
  int root_id;
  int status_code;
  std::int64_t source_cycle_index;
  std::int64_t receiver_cycle_index;
  double emission_time;
  double hit_time;
  double source_phase;
  double receiver_phase;
  double phase_delta;
  double phase_spread;
};

struct ArchitrinoSolverMotionSampleRequestF64 {
  ArchitrinoSolverLinearPathSegmentF64 segment;
  std::uint64_t path_key;
  double start_time;
  double end_time;
  double step;
  std::uint32_t state_flags;
  std::uint32_t reserved0;
};

struct ArchitrinoSolverMotionFrameRowF64 {
  std::uint64_t path_key;
  std::uint64_t frame_index;
  double time;
  double position_x;
  double position_y;
  double position_z;
  double velocity_x;
  double velocity_y;
  double velocity_z;
  double error_bound;
  std::uint32_t state_flags;
  std::uint32_t reserved0;
};

struct ArchitrinoSolverPathHistoryRowF64 {
  std::uint64_t path_key;
  std::uint64_t segment_index;
  double start_time;
  double end_time;
  double start_x;
  double start_y;
  double start_z;
  double velocity_x;
  double velocity_y;
  double velocity_z;
  double error_bound;
  std::uint32_t state_flags;
  std::uint32_t reserved0;
};

struct ArchitrinoSolverPathHistoryIndexRow {
  std::uint64_t path_key;
  std::uint64_t chunk_index;
  std::uint64_t row_offset;
  std::uint64_t row_count;
  double time_start;
  double time_end;
  std::uint64_t byte_offset;
  std::uint64_t byte_length;
};

struct ArchitrinoSolverPathHistoryChunkRow {
  std::uint64_t chunk_index;
  std::uint64_t path_key_start;
  std::uint64_t path_key_end;
  std::uint64_t row_offset;
  std::uint64_t row_count;
  std::uint64_t frame_start;
  std::uint64_t frame_end;
  double time_start;
  double time_end;
  std::uint64_t byte_offset;
  std::uint64_t byte_length;
  std::uint64_t checksum64;
  std::uint32_t state_flags;
  std::uint32_t reserved0;
};

struct ArchitrinoSolverPathHistoryQuery {
  std::uint64_t path_key;
  double time_start;
  double time_end;
  std::uint32_t filter_path;
  std::uint32_t filter_time;
  std::uint32_t verify_checksums;
  std::uint32_t reserved0;
};

struct ArchitrinoSolverPathHistoryStreamSummary {
  std::uint64_t row_count;
  std::uint64_t chunk_count;
  std::uint64_t byte_length;
  std::uint64_t data_checksum64;
  std::uint64_t index_checksum64;
  std::uint64_t chunk_checksum64;
  double time_start;
  double time_end;
  std::uint32_t has_time_range;
  std::uint32_t durable;
};

struct ArchitrinoSolverStorageLifecyclePolicy {
  double active_window_start;
  double active_window_end;
  std::uint32_t has_active_window;
  std::uint32_t deep_index_enabled;
  std::uint32_t export_requested;
  std::uint32_t failed_run;
  std::uint32_t delete_requested;
  std::uint32_t reserved0;
  std::uint64_t active_memory_budget_bytes;
  std::uint64_t storage_budget_bytes;
};

struct ArchitrinoSolverPathHistoryLifecycleDecisionRow {
  std::uint64_t chunk_index;
  std::uint32_t tier;
  std::uint32_t action;
  std::uint32_t safe_to_age_out;
  std::uint32_t requires_deep_index;
  std::uint32_t reason_code;
  std::uint32_t reserved0;
};

struct ArchitrinoSolverBoundsRowF64 {
  int item_index;
  int status_code;
  std::uint64_t path_key;
  double min_x;
  double min_y;
  double min_z;
  double max_x;
  double max_y;
  double max_z;
};

struct ArchitrinoSolverSpherePointIntersectionRequestF64 {
  ArchitrinoSolverVector3F64 center;
  double radius;
  ArchitrinoSolverVector3F64 point;
  double tolerance;
};

struct ArchitrinoSolverSpherePointIntersectionRowF64 {
  int item_index;
  int intersects;
  double center_distance;
  double signed_distance;
};

struct ArchitrinoSolverDelayedPotentialRequestF64 {
  ArchitrinoSolverLinearPathSegmentF64 source;
  ArchitrinoSolverVector3F64 sample_point;
  double observation_time;
  double field_speed;
  double normalization;
  double softening;
  double source_charge;
  std::uint32_t iterations;
  std::uint32_t use_causal_denominator;
};

struct ArchitrinoSolverDelayedPotentialRowF64 {
  int item_index;
  int status_code;
  double tau;
  double emission_time;
  double emission_x;
  double emission_y;
  double emission_z;
  double displacement_x;
  double displacement_y;
  double displacement_z;
  double distance;
  double denominator;
  double potential;
  double kappa;
  std::uint32_t iterations;
  std::uint32_t used_causal_denominator;
};

struct ArchitrinoSolverCircularSelfHitSpanRequestF64 {
  double field_speed_ratio;
  double field_speed_tolerance;
  double tolerance;
  double max_angle;
  std::uint32_t max_iterations;
  std::uint32_t scan_subdivisions;
  std::uint32_t reserved0;
  std::uint32_t reserved1;
};

struct ArchitrinoSolverCircularSelfHitSpanRowF64 {
  int item_index;
  int status_code;
  double field_speed_ratio;
  double field_speed_tolerance;
  double span;
  double bracket_low;
  double bracket_high;
  double residual;
  std::uint32_t root_found;
  std::uint32_t iterations;
  std::uint32_t regime;
  std::uint32_t result_kind;
};

struct ArchitrinoSolverAssemblyStateRowF64 {
  std::uint64_t assembly_key;
  std::uint64_t assembly_state_key;
  double time_start;
  double time_end;
  double center_x;
  double center_y;
  double center_z;
  double velocity_x;
  double velocity_y;
  double velocity_z;
  double phase;
  std::int64_t cycle_index;
  std::uint32_t model_version;
  std::uint32_t status_flags;
  std::uint32_t fidelity_flags;
  std::uint32_t reserved0;
};

struct ArchitrinoSolverAssemblyMembershipRowF64 {
  std::uint64_t membership_key;
  std::uint64_t path_key;
  std::uint64_t assembly_key;
  std::uint64_t assembly_state_key;
  double time_start;
  double time_end;
  double confidence;
  std::uint32_t local_role;
  std::uint32_t binding_state;
  std::uint32_t membership_version;
  std::uint32_t event_kind;
  std::uint32_t status_flags;
  std::uint32_t reserved0;
};

struct ArchitrinoSolverAssemblyHierarchyRowF64 {
  std::uint64_t hierarchy_key;
  std::uint64_t parent_assembly_key;
  std::uint64_t child_assembly_key;
  double time_start;
  double time_end;
  std::uint32_t relation_type;
  std::uint32_t hierarchy_version;
  std::uint32_t status_flags;
  std::uint32_t reserved0;
};

struct ArchitrinoSolverAssemblyEventRowF64 {
  std::uint64_t event_key;
  std::uint64_t primary_id;
  std::uint64_t secondary_id;
  std::uint64_t prior_state_key;
  std::uint64_t next_state_key;
  std::uint64_t related_path_key;
  std::uint64_t related_assembly_key;
  std::uint64_t branch_transition_key;
  double event_time;
  std::uint32_t event_kind;
  std::uint32_t speed_regime;
  std::uint32_t status_flags;
  std::uint32_t reserved0;
};

struct ArchitrinoSolverAssemblyGraphStoreIndexRowF64 {
  std::uint32_t layout_code;
  std::uint32_t key_kind;
  std::uint64_t key;
  std::uint64_t row_offset;
  std::uint64_t row_count;
  double time_start;
  double time_end;
  std::uint64_t byte_offset;
  std::uint64_t byte_length;
  std::uint32_t state_flags;
  std::uint32_t reserved0;
};

struct ArchitrinoSolverAssemblyGraphStoreIndexQuery {
  std::uint32_t layout_code;
  std::uint32_t key_kind;
  std::uint32_t filter_layout;
  std::uint32_t filter_key_kind;
  std::uint32_t filter_key;
  std::uint32_t filter_time;
  std::uint32_t filter_byte_range;
  std::uint32_t reserved0;
  std::uint64_t key;
  double time_start;
  double time_end;
  std::uint64_t byte_start;
  std::uint64_t byte_end;
};

struct ArchitrinoSolverAssemblyGraphStoreSummary {
  std::uint64_t state_count;
  std::uint64_t membership_count;
  std::uint64_t hierarchy_count;
  std::uint64_t event_count;
  std::uint64_t index_count;
  std::uint64_t state_byte_length;
  std::uint64_t membership_byte_length;
  std::uint64_t hierarchy_byte_length;
  std::uint64_t event_byte_length;
  std::uint64_t index_byte_length;
  double time_start;
  double time_end;
  std::uint32_t has_time_range;
  std::uint32_t durable;
};

struct ArchitrinoSolverSpaceTimeBoundsF64 {
  double min_x;
  double min_y;
  double min_z;
  double max_x;
  double max_y;
  double max_z;
  double time_start;
  double time_end;
};

struct ArchitrinoSolverSpaceTimeIndexOptionsF64 {
  double spatial_cell_size;
  double time_bin_size;
  std::uint32_t max_cells_per_item;
  std::uint32_t reserved0;
};

struct ArchitrinoSolverSpaceTimeIndexRowF64 {
  std::int64_t cell_x;
  std::int64_t cell_y;
  std::int64_t cell_z;
  std::int64_t cell_t;
  std::uint64_t subject_key;
  std::uint64_t row_offset;
  double min_x;
  double min_y;
  double min_z;
  double max_x;
  double max_y;
  double max_z;
  double time_start;
  double time_end;
  std::uint32_t subject_kind;
  std::uint32_t source_layout;
  std::uint32_t state_flags;
  std::uint32_t reserved0;
};

struct ArchitrinoSolverSpaceTimeQueryF64 {
  ArchitrinoSolverSpaceTimeBoundsF64 bounds;
  std::uint32_t filter_space;
  std::uint32_t filter_time;
  std::uint32_t filter_subject_kind;
  std::uint32_t subject_kind;
  std::uint32_t filter_subject_key;
  std::uint32_t reserved0;
  std::uint64_t subject_key;
};

struct ArchitrinoSolverEmissionShellBroadPhaseOptionsF64 {
  double signal_speed;
  double tolerance;
  double time_range_start;
  double time_range_end;
  std::uint32_t max_candidates;
  std::uint32_t allow_same_path;
  std::uint32_t has_time_range;
  std::uint32_t requested_worker_count;
};

struct ArchitrinoSolverEmissionShellCandidateRowF64 {
  std::uint64_t source_path_key;
  std::uint64_t receiver_path_key;
  std::uint64_t source_segment_index;
  std::uint64_t receiver_segment_index;
  std::uint64_t source_row_index;
  std::uint64_t receiver_row_index;
  double source_time_start;
  double source_time_end;
  double receiver_time_start;
  double receiver_time_end;
  double distance_lower_bound;
  double distance_upper_bound;
  double radius_lower_bound;
  double radius_upper_bound;
};

struct ArchitrinoSolverEmissionShellBroadPhaseSummary {
  std::uint64_t pair_count;
  std::uint64_t rejected_pair_count;
  std::uint64_t candidate_count;
  std::uint32_t truncated;
  std::uint32_t planned_worker_count;
};

struct ArchitrinoSolverEmissionShellNarrowPhaseRequestF64 {
  ArchitrinoSolverPathHistoryRowF64 source;
  ArchitrinoSolverPathHistoryRowF64 receiver;
  double signal_speed;
  double tolerance;
};

struct ArchitrinoSolverEmissionShellNarrowPhaseRowF64 {
  int item_index;
  int status_code;
  std::uint32_t classification;
  std::uint32_t sample_count;
  double hit_time;
  double emission_time;
  double residual;
};

struct ArchitrinoSolverAbiInfo {
  int abi_major;
  int abi_minor;
  int abi_patch;
  int root_request_f64_bytes;
  int root_row_f64_bytes;
  int delayed_hit_row_f64_bytes;
  int motion_sample_request_f64_bytes;
  int motion_frame_row_f64_bytes;
  int phase_clock_f64_bytes;
  int phase_at_hit_row_f64_bytes;
  int bounds_row_f64_bytes;
  int sphere_point_request_f64_bytes;
  int sphere_point_row_f64_bytes;
  int delayed_potential_request_f64_bytes;
  int delayed_potential_row_f64_bytes;
  int circular_self_hit_request_f64_bytes;
  int circular_self_hit_row_f64_bytes;
  int assembly_state_row_f64_bytes;
  int assembly_membership_row_f64_bytes;
  int assembly_hierarchy_row_f64_bytes;
  int assembly_event_row_f64_bytes;
  int path_history_row_f64_bytes;
  int path_history_chunk_row_bytes;
  int storage_lifecycle_policy_bytes;
  int path_history_lifecycle_decision_row_bytes;
  int spacetime_index_row_f64_bytes;
  int emission_shell_broad_phase_options_f64_bytes;
  int emission_shell_candidate_row_f64_bytes;
  int emission_shell_broad_phase_summary_bytes;
  int emission_shell_narrow_phase_request_f64_bytes;
  int emission_shell_narrow_phase_row_f64_bytes;
  int root_ledger_detail_row_f64_bytes;
  int error_budget_f64_bytes;
  int error_budget_stage_input_f64_bytes;
  int error_budget_stage_row_f64_bytes;
  int error_budget_summary_f64_bytes;
  int precision_solve_options_bytes;
  int precision_solve_summary_f64_bytes;
};

ArchitrinoSolverAbiInfo architrino_solver_abi_info();
int architrino_solver_get_abi_info(ArchitrinoSolverAbiInfo* out_info);

int architrino_solver_solve_causal_roots_f64(
    const ArchitrinoSolverCausalRootRequestF64* request,
    ArchitrinoSolverCausalRootRowF64* roots,
    int max_roots,
    int* out_root_count);

int architrino_solver_solve_roots_and_hits_f64(
    const ArchitrinoSolverCausalRootRequestF64* request,
    ArchitrinoSolverCausalRootRowF64* roots,
    int max_roots,
    int* out_root_count,
    ArchitrinoSolverDelayedHitRowF64* hits,
    int max_hits,
    int* out_hit_count);

int architrino_solver_build_root_ledger_detail_f64(
    const ArchitrinoSolverCausalRootRequestF64* request,
    ArchitrinoSolverRootLedgerDetailRowF64* rows,
    int max_rows,
    int* out_row_count);

int architrino_solver_solve_causal_root_batch_f64(
    const ArchitrinoSolverCausalRootRequestF64* requests,
    int request_count,
    int worker_count,
    ArchitrinoSolverCausalRootBatchItemRowF64* items,
    int max_items,
    ArchitrinoSolverCausalRootRowF64* roots,
    int max_roots,
    int* out_item_count,
    int* out_root_count);

int architrino_solver_solve_roots_and_hits_batch_f64(
    const ArchitrinoSolverCausalRootRequestF64* requests,
    int request_count,
    int worker_count,
    ArchitrinoSolverCausalRootBatchItemRowF64* items,
    int max_items,
    ArchitrinoSolverCausalRootRowF64* roots,
    int max_roots,
    ArchitrinoSolverDelayedHitRowF64* hits,
    int max_hits,
    int* out_item_count,
    int* out_root_count,
    int* out_hit_count);

int architrino_solver_diagnose_precision_f64(
    const ArchitrinoSolverCausalRootRequestF64* request,
    ArchitrinoSolverPrecisionDiagnosticRowF64* out_diagnostic);

int architrino_solver_solve_causal_roots_precision_f64(
    const ArchitrinoSolverCausalRootRequestF64* request,
    const ArchitrinoSolverPrecisionSolveOptions* options,
    ArchitrinoSolverCausalRootRowF64* roots,
    int max_roots,
    int* out_root_count,
    ArchitrinoSolverPrecisionSolveSummaryF64* out_summary);

int architrino_solver_solve_roots_and_hits_precision_f64(
    const ArchitrinoSolverCausalRootRequestF64* request,
    const ArchitrinoSolverPrecisionSolveOptions* options,
    ArchitrinoSolverCausalRootRowF64* roots,
    int max_roots,
    int* out_root_count,
    ArchitrinoSolverDelayedHitRowF64* hits,
    int max_hits,
    int* out_hit_count,
    ArchitrinoSolverPrecisionSolveSummaryF64* out_summary);

int architrino_solver_propagate_error_budget_f64(
    const ArchitrinoSolverErrorBudgetF64* budget,
    const ArchitrinoSolverErrorBudgetStageInputF64* observed_stages,
    int stage_count,
    ArchitrinoSolverErrorBudgetStageRowF64* rows,
    int max_rows,
    ArchitrinoSolverErrorBudgetSummaryF64* out_summary);

int architrino_solver_sample_linear_motion_f64(
    const ArchitrinoSolverMotionSampleRequestF64* request,
    ArchitrinoSolverMotionFrameRowF64* frames,
    int max_frames,
    int* out_frame_count);

int architrino_solver_compute_phase_at_hit_f64(
    const ArchitrinoSolverCausalRootRowF64* roots,
    int root_count,
    const ArchitrinoSolverPhaseClockF64* source_clock,
    const ArchitrinoSolverPhaseClockF64* receiver_clock,
    ArchitrinoSolverPhaseAtHitRowF64* rows,
    int max_rows,
    int* out_row_count);

int architrino_solver_compute_path_bounds_f64(
    const ArchitrinoSolverLinearPathSegmentF64* segments,
    const std::uint64_t* path_keys,
    int segment_count,
    ArchitrinoSolverBoundsRowF64* rows,
    int max_rows,
    int* out_row_count);

int architrino_solver_intersect_sphere_points_f64(
    const ArchitrinoSolverSpherePointIntersectionRequestF64* requests,
    int request_count,
    ArchitrinoSolverSpherePointIntersectionRowF64* rows,
    int max_rows,
    int* out_row_count);

int architrino_solver_compute_delayed_potentials_f64(
    const ArchitrinoSolverDelayedPotentialRequestF64* requests,
    int request_count,
    ArchitrinoSolverDelayedPotentialRowF64* rows,
    int max_rows,
    int* out_row_count);

int architrino_solver_solve_circular_self_hit_spans_f64(
    const ArchitrinoSolverCircularSelfHitSpanRequestF64* requests,
    int request_count,
    ArchitrinoSolverCircularSelfHitSpanRowF64* rows,
    int max_rows,
    int* out_row_count);

int architrino_solver_detect_assembly_membership_events_f64(
    const ArchitrinoSolverAssemblyMembershipRowF64* memberships,
    int membership_count,
    ArchitrinoSolverAssemblyEventRowF64* events,
    int max_events,
    int* out_event_count);

int architrino_solver_write_assembly_graph_store_f64(
    const char* store_id,
    const char* state_path,
    const char* membership_path,
    const char* hierarchy_path,
    const char* event_path,
    const char* index_path,
    const char* metadata_path,
    const ArchitrinoSolverAssemblyStateRowF64* states,
    int state_count,
    const ArchitrinoSolverAssemblyMembershipRowF64* memberships,
    int membership_count,
    const ArchitrinoSolverAssemblyHierarchyRowF64* hierarchy,
    int hierarchy_count,
    const ArchitrinoSolverAssemblyEventRowF64* events,
    int event_count,
    std::uint32_t durable,
    ArchitrinoSolverAssemblyGraphStoreSummary* out_summary);

int architrino_solver_read_assembly_graph_store_states_f64(
    const char* state_path,
    std::uint64_t row_offset,
    int row_count,
    ArchitrinoSolverAssemblyStateRowF64* rows,
    int max_rows,
    int* out_row_count);

int architrino_solver_read_assembly_graph_store_memberships_f64(
    const char* membership_path,
    std::uint64_t row_offset,
    int row_count,
    ArchitrinoSolverAssemblyMembershipRowF64* rows,
    int max_rows,
    int* out_row_count);

int architrino_solver_read_assembly_graph_store_hierarchy_f64(
    const char* hierarchy_path,
    std::uint64_t row_offset,
    int row_count,
    ArchitrinoSolverAssemblyHierarchyRowF64* rows,
    int max_rows,
    int* out_row_count);

int architrino_solver_read_assembly_graph_store_events_f64(
    const char* event_path,
    std::uint64_t row_offset,
    int row_count,
    ArchitrinoSolverAssemblyEventRowF64* rows,
    int max_rows,
    int* out_row_count);

int architrino_solver_read_assembly_graph_store_index(
    const char* index_path,
    std::uint64_t row_offset,
    int row_count,
    ArchitrinoSolverAssemblyGraphStoreIndexRowF64* rows,
    int max_rows,
    int* out_row_count);

int architrino_solver_query_assembly_graph_store_index(
    const ArchitrinoSolverAssemblyGraphStoreIndexRowF64* index_rows,
    int index_row_count,
    const ArchitrinoSolverAssemblyGraphStoreIndexQuery* query,
    ArchitrinoSolverAssemblyGraphStoreIndexRowF64* rows,
    int max_rows,
    int* out_row_count);

int architrino_solver_build_spacetime_index_f64(
    const ArchitrinoSolverPathHistoryRowF64* path_rows,
    int path_row_count,
    const ArchitrinoSolverAssemblyStateRowF64* assembly_state_rows,
    int assembly_state_row_count,
    const ArchitrinoSolverSpaceTimeIndexOptionsF64* options,
    ArchitrinoSolverSpaceTimeIndexRowF64* rows,
    int max_rows,
    int* out_row_count,
    int* out_overflow_count);

int architrino_solver_query_spacetime_index_f64(
    const ArchitrinoSolverSpaceTimeIndexRowF64* index_rows,
    int index_row_count,
    const ArchitrinoSolverSpaceTimeQueryF64* query,
    const ArchitrinoSolverSpaceTimeIndexOptionsF64* options,
    ArchitrinoSolverSpaceTimeIndexRowF64* rows,
    int max_rows,
    int* out_row_count);

int architrino_solver_query_emission_shell_broad_phase_f64(
    const ArchitrinoSolverPathHistoryRowF64* source_rows,
    int source_row_count,
    const ArchitrinoSolverPathHistoryRowF64* receiver_rows,
    int receiver_row_count,
    const ArchitrinoSolverEmissionShellBroadPhaseOptionsF64* options,
    ArchitrinoSolverEmissionShellCandidateRowF64* rows,
    int max_rows,
    ArchitrinoSolverEmissionShellBroadPhaseSummary* out_summary);

int architrino_solver_estimate_emission_shell_narrow_phase_f64(
    const ArchitrinoSolverEmissionShellNarrowPhaseRequestF64* requests,
    int request_count,
    ArchitrinoSolverEmissionShellNarrowPhaseRowF64* rows,
    int max_rows,
    int* out_row_count);

int architrino_solver_write_path_history_stream_f64(
    const char* stream_id,
    const char* data_path,
    const char* index_path,
    const char* chunk_path,
    const char* metadata_path,
    const ArchitrinoSolverPathHistoryRowF64* path_rows,
    int path_row_count,
    std::uint64_t rows_per_index_chunk,
    std::uint32_t durable,
    ArchitrinoSolverPathHistoryStreamSummary* out_summary);

int architrino_solver_read_path_history_stream_rows_f64(
    const char* data_path,
    std::uint64_t row_offset,
    int row_count,
    ArchitrinoSolverPathHistoryRowF64* rows,
    int max_rows,
    int* out_row_count);

int architrino_solver_read_path_history_stream_index(
    const char* index_path,
    ArchitrinoSolverPathHistoryIndexRow* rows,
    int max_rows,
    int* out_row_count);

int architrino_solver_read_path_history_stream_chunks(
    const char* chunk_path,
    ArchitrinoSolverPathHistoryChunkRow* rows,
    int max_rows,
    int* out_row_count);

int architrino_solver_query_path_history_stream_index(
    const ArchitrinoSolverPathHistoryIndexRow* index_rows,
    int index_row_count,
    const ArchitrinoSolverPathHistoryQuery* query,
    ArchitrinoSolverPathHistoryIndexRow* rows,
    int max_rows,
    int* out_row_count);

int architrino_solver_read_path_history_stream_query_f64(
    const char* data_path,
    const ArchitrinoSolverPathHistoryIndexRow* index_rows,
    int index_row_count,
    const ArchitrinoSolverPathHistoryChunkRow* chunk_rows,
    int chunk_row_count,
    const ArchitrinoSolverPathHistoryQuery* query,
    ArchitrinoSolverPathHistoryRowF64* rows,
    int max_rows,
    int* out_row_count);

int architrino_solver_plan_path_history_storage_lifecycle(
    const ArchitrinoSolverStorageLifecyclePolicy* policy,
    const ArchitrinoSolverPathHistoryChunkRow* chunks,
    int chunk_count,
    ArchitrinoSolverPathHistoryLifecycleDecisionRow* rows,
    int max_rows,
    int* out_row_count);

}  // extern "C"
