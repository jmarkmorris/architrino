#include "architrino/solver/CausalRootSolver.hpp"

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
  const architrino::solver::CircularSourceCausalRootRequest circularRequest =
      make_circular_source_request();
  const architrino::solver::CausalRootResult circularRoots =
      architrino::solver::solve_circular_source_causal_roots(circularRequest);
  const double expectedCircularEmissionTime = 10.0 - std::sqrt(101.0);

  const bool ok =
      roots.validation.ok &&
      roots.roots.size() == 1 &&
      nearly_equal(roots.roots[0].emissionTime, -4.0) &&
      nearly_equal(roots.roots[0].hitTime, 10.0) &&
      nearly_equal(roots.roots[0].delay, 14.0) &&
      nearly_equal(roots.roots[0].distance, 14.0) &&
      nearly_equal(roots.roots[0].jacobian, 0.5) &&
      nearly_equal(roots.roots[0].branchWeight, 2.0) &&
      std::abs(roots.roots[0].residual) <= 1e-10 &&
      roots.roots[0].bracketStart <= -4.0 &&
      roots.roots[0].bracketEnd >= -4.0 &&
      roots.roots[0].iterations > 0 &&
      roots.roots[0].statusCode == architrino::solver::StatusCode::Ok &&
      hits.validation.ok &&
      hits.events.size() == 1 &&
      nearly_equal(hits.events[0].emissionTime, -4.0) &&
      nearly_equal(hits.events[0].distance, 14.0) &&
      nearly_equal(hits.events[0].strength, 2.0) &&
      nearly_equal(hits.events[0].unitDirection.x, 1.0) &&
      nearly_equal(hits.events[0].unitDirection.y, 0.0) &&
      nearly_equal(hits.events[0].unitDirection.z, 0.0) &&
      circularRoots.validation.ok &&
      circularRoots.roots.size() == 1 &&
      nearly_equal(circularRoots.roots[0].emissionTime, expectedCircularEmissionTime) &&
      nearly_equal(circularRoots.roots[0].delay, std::sqrt(101.0)) &&
      nearly_equal(circularRoots.roots[0].distance, std::sqrt(101.0)) &&
      nearly_equal(circularRoots.roots[0].jacobian, 1.0) &&
      std::abs(circularRoots.roots[0].residual) <= 1e-10 &&
      circularRoots.roots[0].statusCode == architrino::solver::StatusCode::Ok;

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
