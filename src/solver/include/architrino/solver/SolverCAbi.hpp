#pragma once

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

struct ArchitrinoSolverAbiInfo {
  int abi_major;
  int abi_minor;
  int abi_patch;
  int root_request_f64_bytes;
  int root_row_f64_bytes;
  int delayed_hit_row_f64_bytes;
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

}  // extern "C"
