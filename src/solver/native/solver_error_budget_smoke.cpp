#include "architrino/solver/ErrorBudget.hpp"
#include "architrino/solver/SolverCAbi.hpp"

#include <cmath>
#include <iostream>

namespace {

using architrino::solver::ErrorBudget;
using architrino::solver::ErrorBudgetStage;
using architrino::solver::ErrorBudgetStageInput;
using architrino::solver::ValueAuthority;

ErrorBudget smoke_budget() {
  return ErrorBudget{
      1e-9,
      1e-11,
      1e-11,
      1e-10,
      1e-10,
      1e-10,
      1e-8,
      1e-6,
  };
}

bool close_to(double actual, double expected) {
  return std::abs(actual - expected) <= expected * 1e-12;
}

bool expect_authoritative() {
  const ErrorBudget budget = smoke_budget();
  const auto report = architrino::solver::propagate_error_budget(
      budget,
      {
          ErrorBudgetStageInput{ErrorBudgetStage::RootIsolation, 2e-12},
          ErrorBudgetStageInput{ErrorBudgetStage::DelayedHit, 3e-12},
          ErrorBudgetStageInput{ErrorBudgetStage::MotionIntegration, 4e-11},
          ErrorBudgetStageInput{ErrorBudgetStage::StreamEncoding, 5e-11},
          ErrorBudgetStageInput{ErrorBudgetStage::StreamReadback, 6e-11},
          ErrorBudgetStageInput{ErrorBudgetStage::Projection, 7e-10},
          ErrorBudgetStageInput{ErrorBudgetStage::AppBuffer, 1e-10},
      });
  return report.validation.ok && report.authority == ValueAuthority::Authoritative &&
         report.stages.size() == 7 &&
         report.stages.front().authority == ValueAuthority::Authoritative &&
         close_to(report.cumulativeError, 9.55e-10);
}

bool expect_approximate() {
  const ErrorBudget budget = smoke_budget();
  const auto report = architrino::solver::propagate_error_budget(
      budget,
      {
          ErrorBudgetStageInput{ErrorBudgetStage::RootIsolation, 2e-11},
          ErrorBudgetStageInput{ErrorBudgetStage::DelayedHit, 2e-11},
          ErrorBudgetStageInput{ErrorBudgetStage::MotionIntegration, 2e-10},
      });
  return report.validation.ok && report.authority == ValueAuthority::Approximate &&
         report.stages[0].authority == ValueAuthority::Approximate &&
         report.cumulativeBudgetRatio > 0.2 && report.cumulativeBudgetRatio < 0.25;
}

bool expect_display_only() {
  const ErrorBudget budget = smoke_budget();
  const auto report = architrino::solver::propagate_error_budget(
      budget,
      {
          ErrorBudgetStageInput{ErrorBudgetStage::Projection, 2e-8},
          ErrorBudgetStageInput{ErrorBudgetStage::AppBuffer, 3e-8},
      });
  return report.validation.ok && report.authority == ValueAuthority::DisplayOnly &&
         report.stages[0].authority == ValueAuthority::DisplayOnly;
}

bool expect_rejected() {
  const ErrorBudget budget = smoke_budget();
  const auto report = architrino::solver::propagate_error_budget(
      budget,
      {
          ErrorBudgetStageInput{ErrorBudgetStage::RootIsolation, 2e-5},
      });
  return !report.validation.ok && report.authority == ValueAuthority::Rejected &&
         report.stages[0].authority == ValueAuthority::Rejected;
}

bool expect_c_abi() {
  const ArchitrinoSolverErrorBudgetF64 budget{
      1e-9,
      1e-11,
      1e-11,
      1e-10,
      1e-10,
      1e-10,
      1e-8,
      1e-6,
  };
  const ArchitrinoSolverErrorBudgetStageInputF64 inputs[] = {
      ArchitrinoSolverErrorBudgetStageInputF64{
          static_cast<int>(ErrorBudgetStage::RootIsolation),
          0,
          2e-11,
      },
      ArchitrinoSolverErrorBudgetStageInputF64{
          static_cast<int>(ErrorBudgetStage::MotionIntegration),
          0,
          2e-10,
      },
  };
  ArchitrinoSolverErrorBudgetStageRowF64 rows[2] = {};
  ArchitrinoSolverErrorBudgetSummaryF64 summary{};
  const ArchitrinoSolverAbiInfo abiInfo = architrino_solver_abi_info();
  if (abiInfo.error_budget_f64_bytes != 64 ||
      abiInfo.error_budget_stage_input_f64_bytes != 16 ||
      abiInfo.error_budget_stage_row_f64_bytes != 40 ||
      abiInfo.error_budget_summary_f64_bytes != 32) {
    return false;
  }
  const int status = architrino_solver_propagate_error_budget_f64(
      &budget,
      inputs,
      2,
      rows,
      2,
      &summary);
  return status == 0 && summary.stage_count == 2 &&
         summary.authority == static_cast<int>(ValueAuthority::Approximate) &&
         rows[0].stage == static_cast<int>(ErrorBudgetStage::RootIsolation) &&
         rows[0].authority == static_cast<int>(ValueAuthority::Approximate) &&
         rows[1].tolerance_ratio > 1.9 && rows[1].tolerance_ratio < 2.1;
}

}  // namespace

int main() {
  if (!expect_authoritative() || !expect_approximate() || !expect_display_only() ||
      !expect_rejected() || !expect_c_abi()) {
    std::cerr << "error budget propagation smoke failed\n";
    return 1;
  }

  std::cout << "error budget propagation smoke ok\n";
  return 0;
}
