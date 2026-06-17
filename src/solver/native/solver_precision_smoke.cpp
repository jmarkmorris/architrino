#include "architrino/solver/PrecisionDiagnostics.hpp"
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
      large.geometryScale.ordersOfMagnitude >= 12.0;

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

  if (!ok || !cAbiOk) {
    std::cerr << "solver precision smoke failed\n";
    return 1;
  }

  std::cout << "solver precision=ok ordinary="
            << architrino::solver::to_string(ordinary.recommendedPath)
            << " large=" << architrino::solver::to_string(large.recommendedPath) << '\n';
  return 0;
}
