#include "architrino/solver/SolverSelfTest.hpp"

#include "architrino/solver/CausalRootSolver.hpp"
#include "architrino/solver/BinaryLayouts.hpp"
#include "architrino/solver/SolverCAbi.hpp"
#include "architrino/solver/SolverContract.hpp"
#include "architrino/solver/StreamMetadata.hpp"
#include "architrino/solver/SolverVersion.hpp"

#include <cmath>
#include <sstream>

namespace architrino::solver {

namespace {

ModelContract valid_model_contract() {
  return ModelContract{
      "aaa.central-solver",
      "motion-root-v1",
      "causal-delay-v1",
      "constants:test",
      "fixed-field-speed",
      "all-positive-roots",
      "solver-si",
      {PrecisionPath::ScaledF64Strict, PrecisionPath::EventRootFocused, PrecisionPath::ExtendedPrecision},
  };
}

ErrorBudget valid_error_budget() {
  return ErrorBudget{
      1e-12,
      1e-13,
      1e-13,
      1e-12,
      1e-12,
      1e-12,
      1e-9,
      1e-6,
  };
}

SimulationEnvelope valid_envelope() {
  return SimulationEnvelope{
      16,
      1,
      TimeWindow{0.0, 10.0, 0.01, "solver-time"},
      0.01,
      InteractionPolicy::NeighborPruned,
      BranchComplexity::Low,
      OutputDetail::Playback,
      128ULL * 1024ULL * 1024ULL,
      512ULL * 1024ULL * 1024ULL,
      LatencyTarget::Background,
      SimplificationPolicy::None,
  };
}

bool close_to(double actual, double expected, double tolerance) {
  return std::abs(actual - expected) <= tolerance;
}

}  // namespace

bool solver_contract_smoke() {
  const ModelContract model = valid_model_contract();
  const ErrorBudget budget = valid_error_budget();
  const SimulationEnvelope envelope = valid_envelope();
  const SolverCapabilityEnvelope capability;

  if (!validate_model_contract(model).ok) {
    return false;
  }
  if (!validate_error_budget(budget).ok) {
    return false;
  }
  if (!validate_simulation_envelope(envelope).ok) {
    return false;
  }
  const BinaryLayoutDescriptor rootLayout =
      binary_layout_descriptor(BinaryLayoutId::RootLedgerV1);
  const BinaryLayoutDescriptor hitLayout =
      binary_layout_descriptor(BinaryLayoutId::DelayedHitEventsV1);
  const BinaryLayoutDescriptor emissionCandidateLayout =
      binary_layout_descriptor(BinaryLayoutId::EmissionShellCandidateV1);
  const BinaryLayoutDescriptor emissionNarrowLayout =
      binary_layout_descriptor(BinaryLayoutId::EmissionShellNarrowPhaseV1);
  if (rootLayout.rowSizeBytes != 112 || hitLayout.rowSizeBytes != 128 ||
      emissionCandidateLayout.rowSizeBytes != 112 || emissionNarrowLayout.rowSizeBytes != 40 ||
      rootLayout.name != "root_ledger.v1" || hitLayout.name != "delayed_hit_events.v1" ||
      emissionCandidateLayout.name != "emission_shell_candidate.v1" ||
      emissionNarrowLayout.name != "emission_shell_narrow_phase.v1") {
    return false;
  }
  const SolverBufferDescriptor rootBuffer =
      make_buffer_descriptor("root-ledger", BinaryLayoutId::RootLedgerV1, 1);
  const SolverBufferDescriptor hitBuffer =
      make_buffer_descriptor("delayed-hit-events", BinaryLayoutId::DelayedHitEventsV1, 1);
  const SolverStreamDescriptor transientStream =
      make_transient_stream_descriptor("causal-root-smoke", 0.0, 10.0, {rootBuffer, hitBuffer});
  if (transientStream.buffers.size() != 2 || transientStream.ranges.size() != 2 ||
      transientStream.ranges[0].byteLength != 112 || transientStream.ranges[1].byteOffset != 112 ||
      transientStream.ranges[1].byteLength != 128) {
    return false;
  }

  const AdmissionReport admission = admit_simulation_envelope(model, budget, envelope, capability);
  if (!admission.validation.ok || admission.decision != AdmissionDecision::Admit) {
    return false;
  }
  if (admission.selectedPrecisionPath != PrecisionPath::EventRootFocused) {
    return false;
  }
  if (admission.stressSummary.dominantStress != AdmissionStressDimension::Precision ||
      !admission.stressSummary.hasTimeStepCountEstimate ||
      !close_to(admission.stressSummary.timeStepCountEstimate, 1000.0, 1e-9) ||
      !close_to(admission.stressSummary.outputPressure, 0.5, 1e-12)) {
    return false;
  }

  ErrorBudget strictBudget = budget;
  strictBudget.globalTolerance = 1e-13;
  strictBudget.rootIsolationTolerance = 1e-14;
  const AdmissionReport strictAdmission =
      admit_simulation_envelope(model, strictBudget, envelope, capability);
  if (!strictAdmission.validation.ok ||
      strictAdmission.decision != AdmissionDecision::EscalatePrecision ||
      strictAdmission.selectedPrecisionPath != PrecisionPath::ExtendedPrecision ||
      strictAdmission.stressSummary.dominantStress != AdmissionStressDimension::Precision) {
    return false;
  }

  ModelContract invalidModel = model;
  invalidModel.modelId.clear();
  if (validate_model_contract(invalidModel).ok) {
    return false;
  }

  SimulationEnvelope oversized = envelope;
  oversized.entityCount = capability.maxBatchEntities + 1;
  oversized.interactionPolicy = InteractionPolicy::AllToAll;
  const AdmissionReport rejected = admit_simulation_envelope(model, budget, oversized, capability);
  return !rejected.validation.ok && rejected.decision == AdmissionDecision::Reject &&
         rejected.stressSummary.dominantStress == AdmissionStressDimension::EntityCount &&
         rejected.stressSummary.estimatedPairCount > capability.maxBatchEntities;
}

bool causal_root_smoke() {
  const LinearPathSegment source{
      "source",
      0.0,
      10.0,
      Vector3{0.0, 0.0, 0.0},
      Vector3{0.0, 0.0, 0.0},
      NumericType::F64,
      0.0,
  };
  const LinearPathSegment receiver{
      "receiver",
      0.0,
      10.0,
      Vector3{10.0, 0.0, 0.0},
      Vector3{0.0, 0.0, 0.0},
      NumericType::F64,
      0.0,
  };
  const CausalRootRequest request{
      "receiver",
      "source",
      source,
      receiver,
      10.0,
      1.0,
      1e-13,
      128,
      64,
  };

  const CausalRootResult roots = solve_causal_roots(request);
  if (!roots.validation.ok || roots.roots.size() != 1) {
    return false;
  }
  const CausalRoot& root = roots.roots.front();
  if (!close_to(root.emissionTime, 0.0, 1e-10)) {
    return false;
  }
  if (!close_to(root.distance, 10.0, 1e-10)) {
    return false;
  }
  if (!close_to(root.delay, 10.0, 1e-10)) {
    return false;
  }
  if (!close_to(root.jacobian, 1.0, 1e-10)) {
    return false;
  }
  const DelayedHitResult hits = solve_delayed_hits(request);
  if (!hits.validation.ok || hits.events.size() != 1) {
    return false;
  }
  const DelayedHitEvent& hit = hits.events.front();
  if (!close_to(hit.emissionTime, root.emissionTime, 1e-10) ||
      !close_to(hit.hitTime, root.hitTime, 1e-10) ||
      !close_to(hit.unitDirection.x, 1.0, 1e-10) ||
      !close_to(hit.strength, 1.0, 1e-10)) {
    return false;
  }

  CausalRootRequest lateSource = request;
  lateSource.source.startTime = 6.0;
  lateSource.source.endTime = 10.0;
  const CausalRootResult noRoot = solve_causal_roots(lateSource);
  if (!noRoot.roots.empty() || !noRoot.validation.ok) {
    return false;
  }

  const ArchitrinoSolverCausalRootRequestF64 cRequest{
      ArchitrinoSolverLinearPathSegmentF64{
          0.0,
          10.0,
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          0.0,
      },
      ArchitrinoSolverLinearPathSegmentF64{
          0.0,
          10.0,
          ArchitrinoSolverVector3F64{10.0, 0.0, 0.0},
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          0.0,
      },
      10.0,
      1.0,
      1e-13,
      128,
      64,
  };
  ArchitrinoSolverCausalRootRowF64 cRoots[2] = {};
  ArchitrinoSolverDelayedHitRowF64 cHits[2] = {};
  int cRootCount = 0;
  int cHitCount = 0;
  const ArchitrinoSolverAbiInfo abiInfo = architrino_solver_abi_info();
  if (abiInfo.root_request_f64_bytes != 176 || abiInfo.root_row_f64_bytes != 112 ||
      abiInfo.delayed_hit_row_f64_bytes != 128) {
    return false;
  }
  ArchitrinoSolverAbiInfo outAbiInfo{};
  if (architrino_solver_get_abi_info(&outAbiInfo) != 0 ||
      outAbiInfo.root_request_f64_bytes != abiInfo.root_request_f64_bytes ||
      outAbiInfo.root_row_f64_bytes != abiInfo.root_row_f64_bytes ||
      outAbiInfo.delayed_hit_row_f64_bytes != abiInfo.delayed_hit_row_f64_bytes) {
    return false;
  }
  const int cStatus =
      architrino_solver_solve_causal_roots_f64(&cRequest, cRoots, 2, &cRootCount);
  if (cStatus != 0 || cRootCount != 1 || !close_to(cRoots[0].emission_time, 0.0, 1e-10) ||
      !close_to(cRoots[0].distance, 10.0, 1e-10)) {
    return false;
  }

  const int combinedStatus = architrino_solver_solve_roots_and_hits_f64(
      &cRequest, cRoots, 2, &cRootCount, cHits, 2, &cHitCount);
  return combinedStatus == 0 && cRootCount == 1 && cHitCount == 1 &&
         close_to(cHits[0].emission_time, 0.0, 1e-10) &&
         close_to(cHits[0].unit_x, 1.0, 1e-10) && close_to(cHits[0].strength, 1.0, 1e-10);
}

std::string solver_contract_smoke_report() {
  std::ostringstream out;
  out << solver_smoke_report() << " contract=" << (solver_contract_smoke() ? "ok" : "failed")
      << " causal_roots=" << (causal_root_smoke() ? "ok" : "failed");
  return out.str();
}

}  // namespace architrino::solver
