#include "architrino/solver/ErrorBudget.hpp"

#include "architrino/solver/SolverContract.hpp"

#include <cmath>
#include <limits>

namespace architrino::solver {
namespace {

bool is_nonnegative_finite(double value) {
  return std::isfinite(value) && value >= 0.0;
}

double safe_ratio(double numerator, double denominator) {
  if (!std::isfinite(numerator) || !std::isfinite(denominator) || denominator <= 0.0) {
    return std::numeric_limits<double>::infinity();
  }
  return numerator / denominator;
}

ValueAuthority authority_for_error(const ErrorBudget& budget,
                                   double estimatedError,
                                   double stageTolerance) {
  if (!is_nonnegative_finite(estimatedError) || stageTolerance <= 0.0) {
    return ValueAuthority::Rejected;
  }
  if (estimatedError <= stageTolerance) {
    return ValueAuthority::Authoritative;
  }
  if (budget.projectionTolerance > 0.0 && estimatedError <= budget.projectionTolerance) {
    return ValueAuthority::Approximate;
  }
  if (budget.displayTolerance > 0.0 && estimatedError <= budget.displayTolerance) {
    return ValueAuthority::DisplayOnly;
  }
  return ValueAuthority::Rejected;
}

StatusRecord status_for_stage(ErrorBudgetStage stage,
                              ValueAuthority authority,
                              double estimatedError,
                              double tolerance) {
  const std::string stageName{to_string(stage)};
  switch (authority) {
    case ValueAuthority::Authoritative:
      return StatusRecord{
          StatusCode::Ok,
          StatusSeverity::Ok,
          "error budget stage is within authoritative tolerance",
          stageName,
          true,
      };
    case ValueAuthority::Approximate:
      return StatusRecord{
          StatusCode::PrecisionEscalated,
          StatusSeverity::Warning,
          "error budget stage exceeds its authoritative tolerance but remains within projection tolerance",
          stageName,
          true,
      };
    case ValueAuthority::DisplayOnly:
      return StatusRecord{
          StatusCode::PrecisionEscalated,
          StatusSeverity::Warning,
          "error budget stage exceeds projection tolerance and is display-only",
          stageName,
          true,
      };
    case ValueAuthority::Rejected:
      return StatusRecord{
          StatusCode::PrecisionFailed,
          StatusSeverity::Halt,
          "error budget stage exceeds allowed tolerance",
          stageName + " estimated=" + std::to_string(estimatedError) +
              " tolerance=" + std::to_string(tolerance),
          false,
      };
  }
  return StatusRecord{
      StatusCode::PrecisionFailed,
      StatusSeverity::Halt,
      "unknown error budget authority",
      stageName,
      false,
  };
}

ValueAuthority combine_authority(ValueAuthority current, ValueAuthority next) {
  if (current == ValueAuthority::Rejected || next == ValueAuthority::Rejected) {
    return ValueAuthority::Rejected;
  }
  if (current == ValueAuthority::DisplayOnly || next == ValueAuthority::DisplayOnly) {
    return ValueAuthority::DisplayOnly;
  }
  if (current == ValueAuthority::Approximate || next == ValueAuthority::Approximate) {
    return ValueAuthority::Approximate;
  }
  return ValueAuthority::Authoritative;
}

ValueAuthority authority_for_cumulative_error(const ErrorBudget& budget,
                                              double cumulativeError,
                                              ValueAuthority stageAuthority) {
  if (!is_nonnegative_finite(cumulativeError) || stageAuthority == ValueAuthority::Rejected) {
    return ValueAuthority::Rejected;
  }
  if (stageAuthority == ValueAuthority::Authoritative && cumulativeError <= budget.globalTolerance) {
    return ValueAuthority::Authoritative;
  }
  if (budget.projectionTolerance > 0.0 && cumulativeError <= budget.projectionTolerance) {
    return combine_authority(stageAuthority, ValueAuthority::Approximate);
  }
  if (budget.displayTolerance > 0.0 && cumulativeError <= budget.displayTolerance) {
    return ValueAuthority::DisplayOnly;
  }
  return ValueAuthority::Rejected;
}

}  // namespace

std::string_view to_string(ErrorBudgetStage value) {
  switch (value) {
    case ErrorBudgetStage::RootIsolation:
      return "root_isolation";
    case ErrorBudgetStage::DelayedHit:
      return "delayed_hit";
    case ErrorBudgetStage::MotionIntegration:
      return "motion_integration";
    case ErrorBudgetStage::StreamEncoding:
      return "stream_encoding";
    case ErrorBudgetStage::StreamReadback:
      return "stream_readback";
    case ErrorBudgetStage::Projection:
      return "projection";
    case ErrorBudgetStage::AppBuffer:
      return "app_buffer";
  }
  return "unknown";
}

std::string_view to_string(ValueAuthority value) {
  switch (value) {
    case ValueAuthority::Authoritative:
      return "authoritative";
    case ValueAuthority::Approximate:
      return "approximate";
    case ValueAuthority::DisplayOnly:
      return "display-only";
    case ValueAuthority::Rejected:
      return "rejected";
  }
  return "unknown";
}

double error_budget_tolerance_for_stage(const ErrorBudget& budget, ErrorBudgetStage stage) {
  switch (stage) {
    case ErrorBudgetStage::RootIsolation:
      return budget.rootIsolationTolerance;
    case ErrorBudgetStage::DelayedHit:
      return budget.delayedHitTolerance;
    case ErrorBudgetStage::MotionIntegration:
      return budget.integrationTolerance;
    case ErrorBudgetStage::StreamEncoding:
      return budget.streamEncodingTolerance;
    case ErrorBudgetStage::StreamReadback:
      return budget.readbackTolerance;
    case ErrorBudgetStage::Projection:
      return budget.projectionTolerance;
    case ErrorBudgetStage::AppBuffer:
      return budget.displayTolerance;
  }
  return 0.0;
}

ErrorBudgetPropagationReport propagate_error_budget(
    const ErrorBudget& budget,
    const std::vector<ErrorBudgetStageInput>& observedStages) {
  ErrorBudgetPropagationReport report;
  report.validation = validate_error_budget(budget);

  if (!report.validation.ok) {
    report.authority = ValueAuthority::Rejected;
    return report;
  }

  ValueAuthority stageAuthority = ValueAuthority::Authoritative;
  for (const ErrorBudgetStageInput& input : observedStages) {
    const double tolerance = error_budget_tolerance_for_stage(budget, input.stage);
    const ValueAuthority authority =
        authority_for_error(budget, input.estimatedAbsoluteError, tolerance);
    ErrorBudgetStageReport stageReport{
        input.stage,
        input.estimatedAbsoluteError,
        tolerance,
        safe_ratio(input.estimatedAbsoluteError, tolerance),
        authority,
        status_for_stage(input.stage, authority, input.estimatedAbsoluteError, tolerance),
    };

    if (stageReport.status.severity == StatusSeverity::Halt ||
        stageReport.status.severity == StatusSeverity::Error) {
      report.validation.ok = false;
    }
    report.validation.statuses.push_back(stageReport.status);
    report.cumulativeError += input.estimatedAbsoluteError;
    stageAuthority = combine_authority(stageAuthority, authority);
    report.stages.push_back(stageReport);
  }

  report.cumulativeBudgetRatio = safe_ratio(report.cumulativeError, budget.globalTolerance);
  report.authority = authority_for_cumulative_error(budget, report.cumulativeError, stageAuthority);

  if (report.authority == ValueAuthority::Rejected) {
    report.validation.add(StatusCode::PrecisionFailed,
                          StatusSeverity::Halt,
                          "cumulative propagated error exceeds the declared value authority",
                          "error-budget-propagation",
                          false);
  } else if (report.authority == ValueAuthority::DisplayOnly) {
    report.validation.add(StatusCode::PrecisionEscalated,
                          StatusSeverity::Warning,
                          "cumulative propagated error is display-only",
                          "error-budget-propagation");
  } else if (report.authority == ValueAuthority::Approximate) {
    report.validation.add(StatusCode::PrecisionEscalated,
                          StatusSeverity::Warning,
                          "cumulative propagated error is approximate",
                          "error-budget-propagation");
  } else {
    report.validation.add(StatusCode::Ok,
                          StatusSeverity::Ok,
                          "error budget propagation complete",
                          "error-budget-propagation");
  }

  return report;
}

}  // namespace architrino::solver
