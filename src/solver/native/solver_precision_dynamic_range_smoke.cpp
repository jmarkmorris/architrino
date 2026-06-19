#include "architrino/solver/PrecisionDiagnostics.hpp"
#include "architrino/solver/PrecisionPathSolver.hpp"
#include "architrino/solver/SolverCAbi.hpp"

#include <cmath>
#include <iostream>
#include <stdexcept>
#include <string>
#include <vector>

namespace {

using architrino::solver::CausalRootRequest;
using architrino::solver::ClaimLevel;
using architrino::solver::LinearPathSegment;
using architrino::solver::NumericChart;
using architrino::solver::NumericType;
using architrino::solver::PrecisionPath;
using architrino::solver::PrecisionSolveOptions;
using architrino::solver::Vector3;

void require(bool condition, const std::string& message) {
  if (!condition) {
    throw std::runtime_error(message);
  }
}

CausalRootRequest make_static_request(double offset,
                                      double distance,
                                      double hitTime,
                                      double tolerance) {
  return CausalRootRequest{
      "receiver",
      "source",
      LinearPathSegment{
          "source",
          0.0,
          hitTime,
          Vector3{offset, 0.0, 0.0},
          Vector3{0.0, 0.0, 0.0},
          NumericType::F64,
          tolerance,
      },
      LinearPathSegment{
          "receiver",
          0.0,
          hitTime,
          Vector3{offset + distance, 0.0, 0.0},
          Vector3{0.0, 0.0, 0.0},
          NumericType::F64,
          tolerance,
      },
      hitTime,
      1.0,
      tolerance,
      128,
      128,
  };
}

CausalRootRequest make_speed_stress_request(double signalSpeed,
                                            double sourceSpeed,
                                            double duration,
                                            double tolerance) {
  return CausalRootRequest{
      "receiver",
      "source",
      LinearPathSegment{
          "source",
          0.0,
          duration,
          Vector3{0.0, 0.0, 0.0},
          Vector3{sourceSpeed, 0.0, 0.0},
          NumericType::F64,
          tolerance,
      },
      LinearPathSegment{
          "receiver",
          0.0,
          duration,
          Vector3{4.0, 0.0, 0.0},
          Vector3{0.0, 0.0, 0.0},
          NumericType::F64,
          tolerance,
      },
      duration,
      signalSpeed,
      tolerance,
      128,
      128,
  };
}

ArchitrinoSolverCausalRootRequestF64 make_c_speed_stress_request(double signalSpeed,
                                                                 double sourceSpeed,
                                                                 double duration,
                                                                 double tolerance) {
  return ArchitrinoSolverCausalRootRequestF64{
      ArchitrinoSolverLinearPathSegmentF64{
          0.0,
          duration,
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          ArchitrinoSolverVector3F64{sourceSpeed, 0.0, 0.0},
          tolerance,
      },
      ArchitrinoSolverLinearPathSegmentF64{
          0.0,
          duration,
          ArchitrinoSolverVector3F64{4.0, 0.0, 0.0},
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          tolerance,
      },
      duration,
      signalSpeed,
      tolerance,
      128,
      128,
  };
}

void check_magnitude_summary_dynamic_range() {
  const architrino::solver::MagnitudeSummary summary =
      architrino::solver::summarize_magnitudes(
          std::vector<double>{0.0, 1e-24, -1e12, 1e-6});
  require(summary.hasNonzeroMagnitude, "magnitude summary should detect nonzero magnitudes");
  require(std::abs(summary.minNonzeroMagnitude - 1e-24) <= 1e-36,
          "magnitude summary should preserve the minimum nonzero magnitude");
  require(std::abs(summary.maxMagnitude - 1e12) <= 1e-3,
          "magnitude summary should preserve the maximum magnitude");
  require(summary.ordersOfMagnitude >= 35.9,
          "magnitude summary should report many-decade dynamic range");
}

void check_log_speed_chart_selection() {
  const architrino::solver::PrecisionDiagnostic diagnostic =
      architrino::solver::diagnose_precision(
          make_speed_stress_request(1.0, 1e7, 1.0, 1e-9));
  require(diagnostic.validation.ok, "log-speed diagnostic should validate");
  require(diagnostic.speedChart == NumericChart::LogMagnitude,
          "large speed magnitude should select log-magnitude speed chart");
  require(diagnostic.recommendedPath == PrecisionPath::ScaledF64Fast,
          "single large speed magnitude should not by itself force extended precision");

  ArchitrinoSolverCausalRootRequestF64 cRequest =
      make_c_speed_stress_request(1.0, 1e7, 1.0, 1e-9);
  ArchitrinoSolverPrecisionDiagnosticRowF64 cDiagnostic = {};
  const int cStatus = architrino_solver_diagnose_precision_f64(&cRequest, &cDiagnostic);
  require(cStatus == 0, "C ABI log-speed diagnostic should succeed");
  require(((cDiagnostic.flags >> 16) & 0xff) == static_cast<int>(NumericChart::LogMagnitude),
          "C ABI diagnostic should expose log-magnitude speed chart");
}

void check_speed_orders_escalation() {
  const architrino::solver::PrecisionDiagnostic diagnostic =
      architrino::solver::diagnose_precision(
          make_speed_stress_request(1e-9, 1e7, 1.0, 1e-9));
  require(diagnostic.validation.ok, "speed-orders diagnostic should validate");
  require(diagnostic.speedScale.ordersOfMagnitude >= 15.0,
          "speed diagnostic should measure many orders of magnitude");
  require(diagnostic.speedChart == NumericChart::LogMagnitude,
          "many-decade speed range should use log-magnitude speed chart");
  require(diagnostic.recommendedPath == PrecisionPath::ExtendedPrecision,
          "many-decade speed range should recommend extended precision");
  require(diagnostic.recommendedNumericType == NumericType::Decimal128,
          "extended speed range should recommend decimal128 numeric type");
}

void check_local_frame_selected_for_large_offsets() {
  const architrino::solver::PrecisionCausalRootResult result =
      architrino::solver::solve_causal_roots_with_precision(
          make_static_request(1e9, 100.0, 200.0, 1e-6),
          PrecisionSolveOptions{
              PrecisionPath::Auto,
              ClaimLevel::MigrationParity,
              true,
              false,
          });
  require(result.roots.validation.ok, "local-frame precision solve should validate roots");
  require(result.precision.validation.ok, "local-frame precision report should validate");
  require(result.roots.roots.size() == 1, "local-frame case should produce one root");
  require(result.precision.selectedPath == PrecisionPath::ScaledF64Strict,
          "large offset should select strict scaled f64 path");
  require(result.precision.selectedNumericType == NumericType::F64,
          "large offset without resolution loss should stay on f64");
  require(result.precision.selectedNumericChart == NumericChart::LocalFrame,
          "large offset should select local-frame numeric chart");
  require(!result.diagnostic.scaleResolutionLimited,
          "large offset tolerance should avoid scale-resolution loss");
  require(std::abs(result.roots.roots[0].distance - 100.0) <= 1e-6,
          "local-frame case should preserve physical root distance");
}

void check_interval_bounds_for_unresolved_scale() {
  const architrino::solver::PrecisionCausalRootResult result =
      architrino::solver::solve_causal_roots_with_precision(
          make_static_request(1e15, 1e3, 1e12, 1e-16),
          PrecisionSolveOptions{
              PrecisionPath::ScaledF64Strict,
              ClaimLevel::ExportedDataset,
              true,
              true,
          });
  require(result.roots.validation.ok, "interval-bounds precision solve should validate roots");
  require(result.precision.validation.ok, "interval-bounds precision report should validate");
  require(result.roots.roots.size() == 1, "interval-bounds case should produce one root");
  require(result.precision.selectedPath == PrecisionPath::ExtendedPrecision,
          "unresolved scale should escalate to extended precision");
  require(result.precision.selectedNumericType == NumericType::Decimal128,
          "unresolved scale should select decimal128 numeric type");
  require(result.precision.selectedNumericChart == NumericChart::IntervalBounds,
          "unresolved scale should select interval-bounds numeric chart");
  require(result.precision.validationReplayRun && result.precision.validationReplayMatched,
          "unresolved scale should run and pass validation replay");
  require(result.diagnostic.scaleResolutionLimited,
          "unresolved scale should report scale-resolution pressure");
  require(result.diagnostic.timeResolutionLimited,
          "unresolved scale should report time-resolution pressure");
}

void check_claim_level_rejects_weak_path() {
  const architrino::solver::PrecisionCausalRootResult result =
      architrino::solver::solve_causal_roots_with_precision(
          make_static_request(1e15, 1e3, 1e12, 1e-16),
          PrecisionSolveOptions{
              PrecisionPath::ScaledF64Fast,
              ClaimLevel::ValidationEvidence,
              false,
              false,
          });
  require(result.roots.roots.empty(), "weak rejected path should not return roots");
  require(!result.precision.validation.ok, "weak rejected path should fail validation");
  require(result.precision.selectedPath == PrecisionPath::ValidationReplay,
          "validation-evidence claim should require validation replay");
  require(result.precision.escalated, "weak rejected path should report escalation");
}

}  // namespace

int main() {
  try {
    check_magnitude_summary_dynamic_range();
    check_log_speed_chart_selection();
    check_speed_orders_escalation();
    check_local_frame_selected_for_large_offsets();
    check_interval_bounds_for_unresolved_scale();
    check_claim_level_rejects_weak_path();
  } catch (const std::exception& error) {
    std::cerr << "solver precision dynamic-range smoke failed: " << error.what() << '\n';
    return 1;
  }

  std::cout << "solver precision-dynamic-range=ok charts=log_magnitude,local_frame,interval_bounds\n";
  return 0;
}
