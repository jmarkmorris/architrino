#pragma once

#include "architrino/eom/CertifiedAcceleration.hpp"
#include "architrino/eom/ExactPairBatch.hpp"
#include "architrino/eom/History.hpp"

#include <cstddef>
#include <optional>
#include <string>
#include <vector>

namespace architrino::eom {

inline constexpr const char* kNativeIntegrationMethod =
    "coupled_cubic_corrector_with_step_doubling/v0";

struct NativeCoupledPathInput {
  std::string path_id;
  std::string charge;
  RetainedHistory history;
};

struct NativeCoupledEvolutionRequest {
  std::string run_id;
  std::vector<NativeCoupledPathInput> paths;
  std::string start_time;
  std::string end_time;
  std::string initial_step;
  std::string minimum_step;
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
  std::size_t visited_cells;
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
};

struct NativeRegulatorRefinementSeries {
  std::string control_id;
  std::vector<NativeRegulatorRefinementLevel> levels;
  std::optional<double> final_impulse_delta;
  std::optional<double> maximum_ladder_impulse_delta;
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

struct NativeAccelerationSnapshotCertificate {
  std::string schema;
  std::string status;
  std::string reception_time;
  std::string failure_code;
  std::vector<NativeSnapshotRootRow> root_certificates;
  NativeAccelerationReconstructionCertificate acceleration;
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
  std::vector<NativeHistoryFingerprint> candidate_history_fingerprints;
};

struct NativePathLocalError {
  std::string path_id;
  double position_error;
  double velocity_error;
};

struct NativePublishedPath {
  std::string path_id;
  RetainedHistory history;
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
  std::vector<NativePathLocalError> local_errors;
  std::string failure_code;
  std::string evidence_status;
  std::string integration_method;
  std::string reduction_policy;
  bool publication_atomic;
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
  std::string halt_code;
  std::string evidence_status;
  bool all_steps_atomic;
};

[[nodiscard]] NativeAccelerationSnapshotCertificate
certify_native_acceleration_snapshot(
    const NativeCoupledEvolutionRequest& request,
    const std::vector<NativePublishedPath>& histories,
    const std::string& reception_time);

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
    const std::string& end_time);

[[nodiscard]] NativeCoupledEvolutionCertificate evolve_native_coupled_histories(
    const NativeCoupledEvolutionRequest& request);

}  // namespace architrino::eom
