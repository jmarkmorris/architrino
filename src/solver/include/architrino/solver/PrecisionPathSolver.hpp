#pragma once

#include "architrino/solver/CausalRootSolver.hpp"
#include "architrino/solver/PrecisionDiagnostics.hpp"

namespace architrino::solver {

struct PrecisionSolveOptions {
  PrecisionPath requestedPath = PrecisionPath::Auto;
  ClaimLevel claimLevel = ClaimLevel::InteractivePreview;
  bool allowEscalation = true;
  bool runValidationReplay = false;
};

struct PrecisionSolveReport {
  PrecisionPath requestedPath = PrecisionPath::Auto;
  PrecisionPath diagnosticPath = PrecisionPath::ScaledF64Fast;
  PrecisionPath selectedPath = PrecisionPath::ScaledF64Fast;
  NumericType selectedNumericType = NumericType::F64;
  NumericChart selectedNumericChart = NumericChart::AbsoluteF64;
  ClaimLevel claimLevel = ClaimLevel::InteractivePreview;
  double rootTolerance = 0.0;
  int maxIterations = 0;
  int scanSubdivisions = 0;
  bool escalated = false;
  bool validationReplayRun = false;
  bool validationReplayMatched = false;
  int rootCount = 0;
  double maxResidual = 0.0;
  double minAbsJacobian = 0.0;
  ValidationReport validation;
};

struct PrecisionCausalRootResult {
  CausalRootResult roots;
  PrecisionDiagnostic diagnostic;
  PrecisionSolveReport precision;
};

struct PrecisionRootsAndHitsResult {
  CausalRootResult roots;
  DelayedHitResult hits;
  PrecisionDiagnostic diagnostic;
  PrecisionSolveReport precision;
};

PrecisionCausalRootResult solve_causal_roots_with_precision(
    const CausalRootRequest& request,
    const PrecisionSolveOptions& options = {});

PrecisionRootsAndHitsResult solve_roots_and_hits_with_precision(
    const CausalRootRequest& request,
    const PrecisionSolveOptions& options = {});

}  // namespace architrino::solver
