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
  int assembly_state_row_f64_bytes;
  int assembly_membership_row_f64_bytes;
  int assembly_hierarchy_row_f64_bytes;
  int assembly_event_row_f64_bytes;
  int path_history_row_f64_bytes;
  int spacetime_index_row_f64_bytes;
  int root_ledger_detail_row_f64_bytes;
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

int architrino_solver_diagnose_precision_f64(
    const ArchitrinoSolverCausalRootRequestF64* request,
    ArchitrinoSolverPrecisionDiagnosticRowF64* out_diagnostic);

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

int architrino_solver_detect_assembly_membership_events_f64(
    const ArchitrinoSolverAssemblyMembershipRowF64* memberships,
    int membership_count,
    ArchitrinoSolverAssemblyEventRowF64* events,
    int max_events,
    int* out_event_count);

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

}  // extern "C"
