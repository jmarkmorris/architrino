#include "architrino/solver/CausalRootSolver.hpp"
#include "architrino/solver/SolverCAbi.hpp"

#include <cmath>
#include <iostream>

namespace {

bool nearly_equal(double left, double right, double tolerance = 1e-10) {
  return std::abs(left - right) <= tolerance;
}

architrino::solver::CausalRootRequest make_moving_source_request() {
  return architrino::solver::CausalRootRequest{
      "receiver",
      "source",
      architrino::solver::LinearPathSegment{
          "source",
          -6.0,
          10.0,
          architrino::solver::Vector3{-5.0, 0.0, 0.0},
          architrino::solver::Vector3{0.5, 0.0, 0.0},
          architrino::solver::NumericType::F64,
          1e-13,
      },
      architrino::solver::LinearPathSegment{
          "receiver",
          0.0,
          10.0,
          architrino::solver::Vector3{10.0, 0.0, 0.0},
          architrino::solver::Vector3{0.0, 0.0, 0.0},
          architrino::solver::NumericType::F64,
          1e-13,
      },
      10.0,
      1.0,
      1e-13,
      128,
      50,
  };
}

architrino::solver::CausalRootRequest make_moving_receiver_request() {
  return architrino::solver::CausalRootRequest{
      "receiver",
      "source",
      architrino::solver::LinearPathSegment{
          "source",
          0.0,
          10.0,
          architrino::solver::Vector3{0.0, 0.0, 0.0},
          architrino::solver::Vector3{0.0, 0.0, 0.0},
          architrino::solver::NumericType::F64,
          1e-13,
      },
      architrino::solver::LinearPathSegment{
          "receiver",
          0.0,
          10.0,
          architrino::solver::Vector3{10.0, 0.0, 0.0},
          architrino::solver::Vector3{-0.5, 0.0, 0.0},
          architrino::solver::NumericType::F64,
          1e-13,
      },
      10.0,
      1.0,
      1e-13,
      128,
      50,
  };
}

architrino::solver::CircularSourceCausalRootRequest make_circular_source_request() {
  return architrino::solver::CircularSourceCausalRootRequest{
      "receiver",
      "circular-source",
      architrino::solver::CircularPathSegment{
          "circular-source",
          -2.0,
          10.0,
          architrino::solver::Vector3{0.0, 0.0, 0.0},
          architrino::solver::Vector3{0.0, 1.0, 0.0},
          architrino::solver::Vector3{0.0, 0.0, 1.0},
          1.0,
          0.0,
          0.0,
          architrino::solver::NumericType::F64,
          1e-13,
      },
      architrino::solver::LinearPathSegment{
          "receiver",
          0.0,
          10.0,
          architrino::solver::Vector3{10.0, 0.0, 0.0},
          architrino::solver::Vector3{0.0, 0.0, 0.0},
          architrino::solver::NumericType::F64,
          1e-13,
      },
      10.0,
      1.0,
      1e-13,
      128,
      96,
  };
}

}  // namespace

int main() {
  const architrino::solver::CausalRootRequest request = make_moving_source_request();
  const architrino::solver::CausalRootResult roots =
      architrino::solver::solve_causal_roots(request);
  const architrino::solver::DelayedHitResult hits =
      architrino::solver::solve_delayed_hits(request);
  const architrino::solver::CausalRootRequest movingReceiverRequest =
      make_moving_receiver_request();
  const architrino::solver::CausalRootResult movingReceiverRoots =
      architrino::solver::solve_causal_roots(movingReceiverRequest);
  const architrino::solver::DelayedHitResult movingReceiverHits =
      architrino::solver::solve_delayed_hits(movingReceiverRequest);
  const architrino::solver::CircularSourceCausalRootRequest circularRequest =
      make_circular_source_request();
  const architrino::solver::CausalRootResult circularRoots =
      architrino::solver::solve_circular_source_causal_roots(circularRequest);
  const double expectedCircularEmissionTime = 10.0 - std::sqrt(101.0);
  const ArchitrinoSolverCircularSourceCausalRootRequestF64 cCircularRequest{
      ArchitrinoSolverCircularPathSegmentF64{
          -2.0,
          10.0,
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          ArchitrinoSolverVector3F64{0.0, 1.0, 0.0},
          ArchitrinoSolverVector3F64{0.0, 0.0, 1.0},
          1.0,
          0.0,
          0.0,
          1e-13,
      },
      ArchitrinoSolverLinearPathSegmentF64{
          0.0,
          10.0,
          ArchitrinoSolverVector3F64{10.0, 0.0, 0.0},
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          1e-13,
      },
      10.0,
      1.0,
      1e-13,
      128,
      96,
  };
  ArchitrinoSolverCausalRootRowF64 abiRoots[4]{};
  ArchitrinoSolverDelayedHitRowF64 abiHits[4]{};
  ArchitrinoSolverRootLedgerDetailRowF64 abiLedgerRows[8]{};
  int abiRootCount = 0;
  int abiHitCount = 0;
  int abiLedgerRowCount = 0;
  const int abiStatus = architrino_solver_solve_circular_source_roots_hits_ledger_f64(
      &cCircularRequest,
      abiRoots,
      4,
      &abiRootCount,
      abiHits,
      4,
      &abiHitCount,
      abiLedgerRows,
      8,
      &abiLedgerRowCount);

  const bool ok =
      roots.validation.ok &&
      roots.roots.size() == 1 &&
      nearly_equal(roots.roots[0].emissionTime, -4.0) &&
      nearly_equal(roots.roots[0].hitTime, 10.0) &&
      nearly_equal(roots.roots[0].delay, 14.0) &&
      nearly_equal(roots.roots[0].distance, 14.0) &&
      nearly_equal(roots.roots[0].jacobian, 0.5) &&
      nearly_equal(roots.roots[0].branchWeight, 2.0) &&
      nearly_equal(roots.roots[0].sourceNormalSpeed, 0.5) &&
      nearly_equal(roots.roots[0].receiverNormalSpeed, 0.0) &&
      nearly_equal(roots.roots[0].sourceNormalDenominator, 0.5) &&
      nearly_equal(roots.roots[0].receiverNormalNumerator, 1.0) &&
      nearly_equal(roots.roots[0].receiverNormalCrossingFactor, 1.0) &&
      nearly_equal(roots.roots[0].receiverNormalFactor, 2.0) &&
      nearly_equal(roots.roots[0].unsignedReceiverNormalFactor, 2.0) &&
      std::abs(roots.roots[0].residual) <= 1e-10 &&
      roots.roots[0].bracketStart <= -4.0 &&
      roots.roots[0].bracketEnd >= -4.0 &&
      roots.roots[0].iterations > 0 &&
      roots.roots[0].statusCode == architrino::solver::StatusCode::Ok &&
      roots.roots[0].receiverNormalStatusCode == architrino::solver::StatusCode::Ok &&
      hits.validation.ok &&
      hits.events.size() == 1 &&
      nearly_equal(hits.events[0].emissionTime, -4.0) &&
      nearly_equal(hits.events[0].distance, 14.0) &&
      nearly_equal(hits.events[0].strength, 2.0) &&
      nearly_equal(hits.events[0].sourceNormalDenominator, 0.5) &&
      nearly_equal(hits.events[0].receiverNormalNumerator, 1.0) &&
      nearly_equal(hits.events[0].receiverNormalFactor, 2.0) &&
      nearly_equal(hits.events[0].unitDirection.x, 1.0) &&
      nearly_equal(hits.events[0].unitDirection.y, 0.0) &&
      nearly_equal(hits.events[0].unitDirection.z, 0.0) &&
      movingReceiverRoots.validation.ok &&
      movingReceiverRoots.roots.size() == 1 &&
      nearly_equal(movingReceiverRoots.roots[0].emissionTime, 5.0) &&
      nearly_equal(movingReceiverRoots.roots[0].hitTime, 10.0) &&
      nearly_equal(movingReceiverRoots.roots[0].delay, 5.0) &&
      nearly_equal(movingReceiverRoots.roots[0].distance, 5.0) &&
      nearly_equal(movingReceiverRoots.roots[0].jacobian, 1.0) &&
      nearly_equal(movingReceiverRoots.roots[0].receiverNormalSpeed, -0.5) &&
      nearly_equal(movingReceiverRoots.roots[0].receiverNormalNumerator, 1.5) &&
      nearly_equal(movingReceiverRoots.roots[0].receiverNormalFactor, 1.5) &&
      nearly_equal(movingReceiverRoots.roots[0].branchWeight, 1.5) &&
      movingReceiverHits.validation.ok &&
      movingReceiverHits.events.size() == 1 &&
      nearly_equal(movingReceiverHits.events[0].strength, 1.5) &&
      circularRoots.validation.ok &&
      circularRoots.roots.size() == 1 &&
      nearly_equal(circularRoots.roots[0].emissionTime, expectedCircularEmissionTime) &&
      nearly_equal(circularRoots.roots[0].delay, std::sqrt(101.0)) &&
      nearly_equal(circularRoots.roots[0].distance, std::sqrt(101.0)) &&
      nearly_equal(circularRoots.roots[0].jacobian, 1.0) &&
      std::abs(circularRoots.roots[0].residual) <= 1e-10 &&
      circularRoots.roots[0].statusCode == architrino::solver::StatusCode::Ok &&
      abiStatus == 0 &&
      abiRootCount == 1 &&
      abiHitCount == 1 &&
      abiLedgerRowCount >= 1 &&
      nearly_equal(abiRoots[0].emission_time, expectedCircularEmissionTime) &&
      nearly_equal(abiRoots[0].source_normal_denominator, abiRoots[0].jacobian) &&
      abiRoots[0].receiver_normal_status_code ==
          static_cast<int>(architrino::solver::StatusCode::Ok) &&
      nearly_equal(abiHits[0].distance, std::sqrt(101.0)) &&
      nearly_equal(abiHits[0].strength, 1.0) &&
      nearly_equal(abiHits[0].source_normal_denominator, abiHits[0].jacobian) &&
      abiLedgerRows[0].entry_kind == 1 &&
      abiLedgerRows[0].root_kind == 1 &&
      nearly_equal(abiLedgerRows[0].source_normal_denominator, abiLedgerRows[0].jacobian) &&
      abiLedgerRows[0].bracket_start <= expectedCircularEmissionTime &&
      abiLedgerRows[0].bracket_end >= expectedCircularEmissionTime &&
      abiLedgerRows[0].iteration_count > 0;

  if (!ok) {
    std::cerr << "solver analytic smoke failed\n";
    return 1;
  }

  std::cout << "solver analytic=ok moving-source-root="
            << roots.roots[0].emissionTime
            << " circular-source-root="
            << circularRoots.roots[0].emissionTime << '\n';
  return 0;
}
