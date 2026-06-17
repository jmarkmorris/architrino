#include "architrino/solver/PrecisionDiagnostics.hpp"
#include "architrino/solver/PrecisionPathSolver.hpp"
#include "architrino/solver/SolverCAbi.hpp"

#include <cmath>
#include <iostream>

namespace {

architrino::solver::CausalRootRequest make_request(double offset,
                                                   double distance,
                                                   double hitTime,
                                                   double tolerance) {
  return architrino::solver::CausalRootRequest{
      "receiver",
      "source",
      architrino::solver::LinearPathSegment{
          "source",
          0.0,
          hitTime,
          architrino::solver::Vector3{offset, 0.0, 0.0},
          architrino::solver::Vector3{0.0, 0.0, 0.0},
          architrino::solver::NumericType::F64,
          tolerance,
      },
      architrino::solver::LinearPathSegment{
          "receiver",
          0.0,
          hitTime,
          architrino::solver::Vector3{offset + distance, 0.0, 0.0},
          architrino::solver::Vector3{0.0, 0.0, 0.0},
          architrino::solver::NumericType::F64,
          tolerance,
      },
      hitTime,
      1.0,
      tolerance,
      96,
      64,
  };
}

ArchitrinoSolverCausalRootRequestF64 make_c_request(double offset,
                                                    double distance,
                                                    double hitTime,
                                                    double tolerance) {
  return ArchitrinoSolverCausalRootRequestF64{
      ArchitrinoSolverLinearPathSegmentF64{
          0.0,
          hitTime,
          ArchitrinoSolverVector3F64{offset, 0.0, 0.0},
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          tolerance,
      },
      ArchitrinoSolverLinearPathSegmentF64{
          0.0,
          hitTime,
          ArchitrinoSolverVector3F64{offset + distance, 0.0, 0.0},
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          tolerance,
      },
      hitTime,
      1.0,
      tolerance,
      96,
      64,
  };
}

}  // namespace

int main() {
  const architrino::solver::PrecisionDiagnostic ordinary =
      architrino::solver::diagnose_precision(make_request(0.0, 10.0, 10.0, 1e-10));
  const architrino::solver::PrecisionDiagnostic large =
      architrino::solver::diagnose_precision(make_request(1e15, 1e3, 1e12, 1e-16));
  const architrino::solver::CausalRootResult largeRoots =
      architrino::solver::solve_causal_roots(make_request(1e15, 1e3, 1e12, 1e-16));
  const architrino::solver::PrecisionCausalRootResult autoPrecision =
      architrino::solver::solve_causal_roots_with_precision(
          make_request(1e15, 1e3, 1e12, 1e-16),
          architrino::solver::PrecisionSolveOptions{
              architrino::solver::PrecisionPath::ScaledF64Strict,
              architrino::solver::ClaimLevel::ExportedDataset,
              true,
              true,
          });
  const architrino::solver::PrecisionCausalRootResult rejectedWeakPath =
      architrino::solver::solve_causal_roots_with_precision(
          make_request(1e15, 1e3, 1e12, 1e-16),
          architrino::solver::PrecisionSolveOptions{
              architrino::solver::PrecisionPath::ScaledF64Fast,
              architrino::solver::ClaimLevel::ValidationEvidence,
              false,
              false,
          });
  const architrino::solver::PrecisionCausalRootResult strictPath =
      architrino::solver::solve_causal_roots_with_precision(
          make_request(0.0, 10.0, 10.0, 1e-10),
          architrino::solver::PrecisionSolveOptions{
              architrino::solver::PrecisionPath::ScaledF64Strict,
              architrino::solver::ClaimLevel::MigrationParity,
              true,
              false,
          });
  const architrino::solver::PrecisionRootsAndHitsResult precisionRootsAndHits =
      architrino::solver::solve_roots_and_hits_with_precision(
          make_request(1e15, 1e3, 1e12, 1e-16),
          architrino::solver::PrecisionSolveOptions{
              architrino::solver::PrecisionPath::ScaledF64Strict,
              architrino::solver::ClaimLevel::ExportedDataset,
              true,
              true,
          });

  const bool ok =
      ordinary.validation.ok &&
      large.validation.ok &&
      largeRoots.validation.ok &&
      largeRoots.roots.size() == 1 &&
      std::abs(largeRoots.roots[0].distance - 1e3) <= 1e-9 &&
      std::abs(largeRoots.roots[0].residual) <= 1e-9 &&
      ordinary.recommendedPath == architrino::solver::PrecisionPath::ScaledF64Fast &&
      ordinary.recommendedNumericType == architrino::solver::NumericType::F64 &&
      !ordinary.scaleNormalizationRecommended &&
      !ordinary.scaleResolutionLimited &&
      !ordinary.timeResolutionLimited &&
      large.recommendedPath == architrino::solver::PrecisionPath::ExtendedPrecision &&
      large.recommendedNumericType == architrino::solver::NumericType::Decimal128 &&
      large.scaleNormalizationRecommended &&
      large.extendedPrecisionRecommended &&
      large.scaleResolutionLimited &&
      large.timeResolutionLimited &&
      large.geometryScale.ordersOfMagnitude >= 12.0 &&
      autoPrecision.roots.validation.ok &&
      autoPrecision.precision.validation.ok &&
      autoPrecision.roots.roots.size() == 1 &&
      autoPrecision.precision.selectedPath == architrino::solver::PrecisionPath::ExtendedPrecision &&
      autoPrecision.precision.selectedNumericType == architrino::solver::NumericType::Decimal128 &&
      autoPrecision.precision.escalated &&
      autoPrecision.precision.validationReplayRun &&
      autoPrecision.precision.validationReplayMatched &&
      autoPrecision.precision.scanSubdivisions >= 512 &&
      autoPrecision.precision.maxIterations >= 256 &&
      autoPrecision.precision.rootTolerance <= 1e-16 &&
      rejectedWeakPath.roots.roots.empty() &&
      !rejectedWeakPath.precision.validation.ok &&
      rejectedWeakPath.precision.selectedPath == architrino::solver::PrecisionPath::ValidationReplay &&
      rejectedWeakPath.precision.escalated &&
      strictPath.roots.validation.ok &&
      strictPath.precision.validation.ok &&
      strictPath.precision.selectedPath == architrino::solver::PrecisionPath::ScaledF64Strict &&
      strictPath.precision.selectedNumericType == architrino::solver::NumericType::F64 &&
      strictPath.precision.scanSubdivisions >= 128 &&
      strictPath.precision.maxIterations >= 128 &&
      precisionRootsAndHits.roots.validation.ok &&
      precisionRootsAndHits.hits.validation.ok &&
      precisionRootsAndHits.roots.roots.size() == 1 &&
      precisionRootsAndHits.hits.events.size() == 1 &&
      precisionRootsAndHits.hits.events[0].rootId == precisionRootsAndHits.roots.roots[0].rootId &&
      std::abs(precisionRootsAndHits.hits.events[0].distance -
               precisionRootsAndHits.roots.roots[0].distance) <= 1e-9 &&
      precisionRootsAndHits.precision.selectedPath ==
          architrino::solver::PrecisionPath::ExtendedPrecision &&
      precisionRootsAndHits.precision.validationReplayMatched;

  ArchitrinoSolverCausalRootRequestF64 cRequest = make_c_request(1e15, 1e3, 1e12, 1e-16);
  ArchitrinoSolverPrecisionDiagnosticRowF64 cDiagnostic = {};
  const int cStatus = architrino_solver_diagnose_precision_f64(&cRequest, &cDiagnostic);
  const bool cAbiOk =
      cStatus == 0 &&
      cDiagnostic.recommended_precision_path ==
          static_cast<int>(architrino::solver::PrecisionPath::ExtendedPrecision) &&
      cDiagnostic.recommended_numeric_type ==
          static_cast<int>(architrino::solver::NumericType::Decimal128) &&
      cDiagnostic.status_code ==
          static_cast<int>(architrino::solver::StatusCode::InsufficientScaleResolution) &&
      (cDiagnostic.flags & 1) != 0 &&
      (cDiagnostic.flags & 2) != 0 &&
      (cDiagnostic.flags & 4) != 0 &&
      (cDiagnostic.flags & 8) != 0 &&
      cDiagnostic.geometry_orders >= 12.0;

  ArchitrinoSolverCausalRootRowF64 precisionRoots[2] = {};
  int precisionRootCount = 0;
  ArchitrinoSolverPrecisionSolveSummaryF64 precisionSummary = {};
  const ArchitrinoSolverPrecisionSolveOptions precisionOptions{
      static_cast<int>(architrino::solver::PrecisionPath::ScaledF64Strict),
      static_cast<int>(architrino::solver::ClaimLevel::ExportedDataset),
      1,
      1,
  };
  const int precisionStatus = architrino_solver_solve_causal_roots_precision_f64(
      &cRequest,
      &precisionOptions,
      precisionRoots,
      2,
      &precisionRootCount,
      &precisionSummary);
  const ArchitrinoSolverPrecisionSolveOptions rejectedOptions{
      static_cast<int>(architrino::solver::PrecisionPath::ScaledF64Fast),
      static_cast<int>(architrino::solver::ClaimLevel::ValidationEvidence),
      0,
      0,
  };
  int rejectedRootCount = -1;
  ArchitrinoSolverPrecisionSolveSummaryF64 rejectedSummary = {};
  const int rejectedStatus = architrino_solver_solve_causal_roots_precision_f64(
      &cRequest,
      &rejectedOptions,
      precisionRoots,
      2,
      &rejectedRootCount,
      &rejectedSummary);
  ArchitrinoSolverCausalRootRowF64 precisionCombinedRoots[2] = {};
  ArchitrinoSolverDelayedHitRowF64 precisionHits[2] = {};
  int precisionCombinedRootCount = 0;
  int precisionHitCount = 0;
  ArchitrinoSolverPrecisionSolveSummaryF64 precisionCombinedSummary = {};
  const int precisionCombinedStatus = architrino_solver_solve_roots_and_hits_precision_f64(
      &cRequest,
      &precisionOptions,
      precisionCombinedRoots,
      2,
      &precisionCombinedRootCount,
      precisionHits,
      2,
      &precisionHitCount,
      &precisionCombinedSummary);
  ArchitrinoSolverCausalRootRowF64 precisionLedgerRoots[2] = {};
  ArchitrinoSolverDelayedHitRowF64 precisionLedgerHits[2] = {};
  ArchitrinoSolverRootLedgerDetailRowF64 precisionLedgerRows[8] = {};
  int precisionLedgerRootCount = 0;
  int precisionLedgerHitCount = 0;
  int precisionLedgerRowCount = 0;
  ArchitrinoSolverPrecisionSolveSummaryF64 precisionLedgerSummary = {};
  const int precisionLedgerStatus = architrino_solver_solve_roots_hits_ledger_precision_f64(
      &cRequest,
      &precisionOptions,
      precisionLedgerRoots,
      2,
      &precisionLedgerRootCount,
      precisionLedgerHits,
      2,
      &precisionLedgerHitCount,
      precisionLedgerRows,
      8,
      &precisionLedgerRowCount,
      &precisionLedgerSummary);
  const bool cAbiPrecisionOk =
      precisionStatus == 0 &&
      precisionRootCount == 1 &&
      precisionSummary.selected_precision_path ==
          static_cast<int>(architrino::solver::PrecisionPath::ExtendedPrecision) &&
      precisionSummary.selected_numeric_type ==
          static_cast<int>(architrino::solver::NumericType::Decimal128) &&
      precisionSummary.escalated == 1 &&
      precisionSummary.validation_replay_run == 1 &&
      precisionSummary.validation_replay_matched == 1 &&
      precisionSummary.scan_subdivisions >= 512 &&
      precisionSummary.max_iterations >= 256 &&
      precisionSummary.root_tolerance <= 1e-16 &&
      rejectedStatus == -2 &&
      rejectedRootCount == 0 &&
      rejectedSummary.selected_precision_path ==
          static_cast<int>(architrino::solver::PrecisionPath::ValidationReplay) &&
      rejectedSummary.status_code ==
          static_cast<int>(architrino::solver::StatusCode::PrecisionFailed) &&
      precisionCombinedStatus == 0 &&
      precisionCombinedRootCount == 1 &&
      precisionHitCount == 1 &&
      precisionCombinedSummary.selected_precision_path ==
          static_cast<int>(architrino::solver::PrecisionPath::ExtendedPrecision) &&
      precisionCombinedSummary.validation_replay_matched == 1 &&
      precisionCombinedRoots[0].root_id == precisionHits[0].root_id &&
      std::abs(precisionCombinedRoots[0].distance - precisionHits[0].distance) <= 1e-9 &&
      precisionLedgerStatus == 0 &&
      precisionLedgerRootCount == 1 &&
      precisionLedgerHitCount == 1 &&
      precisionLedgerRowCount >= 1 &&
      precisionLedgerRows[0].entry_kind == 1 &&
      precisionLedgerSummary.selected_precision_path ==
          static_cast<int>(architrino::solver::PrecisionPath::ExtendedPrecision) &&
      precisionLedgerSummary.root_tolerance == precisionCombinedSummary.root_tolerance &&
      precisionLedgerRoots[0].root_id == precisionLedgerHits[0].root_id;

  if (!ok || !cAbiOk || !cAbiPrecisionOk) {
    std::cerr << "solver precision smoke failed\n";
    return 1;
  }

  std::cout << "solver precision=ok ordinary="
            << architrino::solver::to_string(ordinary.recommendedPath)
            << " large=" << architrino::solver::to_string(large.recommendedPath)
            << " selected="
            << architrino::solver::to_string(autoPrecision.precision.selectedPath)
            << " replay=" << autoPrecision.precision.validationReplayMatched << '\n';
  return 0;
}
