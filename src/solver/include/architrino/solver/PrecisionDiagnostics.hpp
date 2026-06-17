#pragma once

#include "architrino/solver/CausalRootSolver.hpp"

#include <vector>

namespace architrino::solver {

struct MagnitudeSummary {
  double minNonzeroMagnitude = 0.0;
  double maxMagnitude = 0.0;
  double ordersOfMagnitude = 0.0;
  bool hasNonzeroMagnitude = false;
};

struct PrecisionDiagnostic {
  MagnitudeSummary timeScale;
  MagnitudeSummary geometryScale;
  MagnitudeSummary speedScale;
  MagnitudeSummary toleranceScale;
  PrecisionPath recommendedPath = PrecisionPath::ScaledF64Fast;
  NumericType recommendedNumericType = NumericType::F64;
  bool scaleNormalizationRecommended = false;
  bool extendedPrecisionRecommended = false;
  bool scaleResolutionLimited = false;
  bool timeResolutionLimited = false;
  ValidationReport validation;
};

MagnitudeSummary summarize_magnitudes(const std::vector<double>& values);
PrecisionDiagnostic diagnose_precision(const CausalRootRequest& request);

}  // namespace architrino::solver
