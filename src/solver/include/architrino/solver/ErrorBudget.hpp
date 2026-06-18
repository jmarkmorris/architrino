#pragma once

#include "architrino/solver/SolverTypes.hpp"

#include <string_view>
#include <vector>

namespace architrino::solver {

enum class ErrorBudgetStage {
  RootIsolation,
  DelayedHit,
  MotionIntegration,
  StreamEncoding,
  StreamReadback,
  Projection,
  AppBuffer,
};

enum class ValueAuthority {
  Authoritative,
  Approximate,
  DisplayOnly,
  Rejected,
};

struct ErrorBudgetStageInput {
  ErrorBudgetStage stage = ErrorBudgetStage::RootIsolation;
  double estimatedAbsoluteError = 0.0;
};

struct ErrorBudgetStageReport {
  ErrorBudgetStage stage = ErrorBudgetStage::RootIsolation;
  double estimatedAbsoluteError = 0.0;
  double tolerance = 0.0;
  double toleranceRatio = 0.0;
  ValueAuthority authority = ValueAuthority::Rejected;
  StatusRecord status;
};

struct ErrorBudgetPropagationReport {
  double cumulativeError = 0.0;
  double cumulativeBudgetRatio = 0.0;
  ValueAuthority authority = ValueAuthority::Rejected;
  std::vector<ErrorBudgetStageReport> stages;
  ValidationReport validation;
};

std::string_view to_string(ErrorBudgetStage value);
std::string_view to_string(ValueAuthority value);

double error_budget_tolerance_for_stage(const ErrorBudget& budget, ErrorBudgetStage stage);

ErrorBudgetPropagationReport propagate_error_budget(
    const ErrorBudget& budget,
    const std::vector<ErrorBudgetStageInput>& observedStages);

}  // namespace architrino::solver
