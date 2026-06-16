#include "architrino/solver/BinaryLayouts.hpp"
#include "architrino/solver/CausalRootSolver.hpp"
#include "architrino/solver/PhaseDiagnostics.hpp"

#include <cmath>
#include <iostream>

namespace {

bool nearly_equal(double left, double right, double tolerance = 1e-10) {
  return std::abs(left - right) <= tolerance;
}

}  // namespace

int main() {
  const architrino::solver::CausalRoot root{
      "receiver",
      "source",
      7,
      "partner",
      3.0,
      7.0,
      4.0,
      4.0,
      0.0,
      1.0,
      1.0,
      3.0,
      3.0,
      0,
      architrino::solver::Vector3{0.0, 0.0, 0.0},
      architrino::solver::Vector3{4.0, 0.0, 0.0},
      architrino::solver::StatusCode::Ok,
  };
  const architrino::solver::PhaseAtHitResult phases =
      architrino::solver::compute_phase_at_hits(
          {root},
          architrino::solver::PhaseClock{2.0, 0.0, 0.0},
          architrino::solver::PhaseClock{5.0, 0.0, 0.0});
  const architrino::solver::BinaryLayoutDescriptor layout =
      architrino::solver::binary_layout_descriptor(architrino::solver::BinaryLayoutId::PhaseAtHitV1);

  const bool ok =
      phases.validation.ok &&
      phases.rows.size() == 1 &&
      phases.rows[0].rootId == 7 &&
      phases.rows[0].sourceCycleIndex == 1 &&
      phases.rows[0].receiverCycleIndex == 1 &&
      nearly_equal(phases.rows[0].sourcePhase, 0.5) &&
      nearly_equal(phases.rows[0].receiverPhase, 0.4) &&
      nearly_equal(phases.rows[0].phaseDelta, -0.1) &&
      nearly_equal(phases.rows[0].phaseSpread, 0.1) &&
      layout.rowSizeBytes == 72 &&
      layout.name == "phase_at_hit.v1";

  if (!ok) {
    std::cerr << "solver phase smoke failed\n";
    return 1;
  }

  std::cout << "solver phase=ok\n";
  return 0;
}
