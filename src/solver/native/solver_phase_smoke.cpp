#include "architrino/solver/BinaryLayouts.hpp"
#include "architrino/solver/CausalRootSolver.hpp"
#include "architrino/solver/PhaseDiagnostics.hpp"
#include "architrino/solver/SolverCAbi.hpp"

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
      0.0,
      0.0,
      1.0,
      1.0,
      1.0,
      1.0,
      1.0,
      3.0,
      3.0,
      0,
      architrino::solver::Vector3{0.0, 0.0, 0.0},
      architrino::solver::Vector3{4.0, 0.0, 0.0},
      architrino::solver::StatusCode::Ok,
      architrino::solver::StatusCode::Ok,
  };
  const architrino::solver::PhaseAtHitResult phases =
      architrino::solver::compute_phase_at_hits(
          {root},
          architrino::solver::PhaseClock{2.0, 0.0, 0.0},
          architrino::solver::PhaseClock{5.0, 0.0, 0.0},
          {architrino::solver::PhaseAtHitMetadata{1, 3, 4, 5, 6, 1, -1, 17}});
  const architrino::solver::BinaryLayoutDescriptor layout =
      architrino::solver::binary_layout_descriptor(architrino::solver::BinaryLayoutId::PhaseAtHitV1);
  ArchitrinoSolverCausalRootRowF64 abiRoot{
      7,
      static_cast<int>(architrino::solver::StatusCode::Ok),
      3.0,
      7.0,
      4.0,
      4.0,
      0.0,
      1.0,
      1.0,
      0.0,
      0.0,
      0.0,
      4.0,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
      1.0,
      1.0,
      1.0,
      1.0,
      static_cast<int>(architrino::solver::StatusCode::Ok),
      0,
  };
  const ArchitrinoSolverPhaseClockF64 sourceClock{2.0, 0.0, 0.0};
  const ArchitrinoSolverPhaseClockF64 receiverClock{5.0, 0.0, 0.0};
  const ArchitrinoSolverPhaseAtHitMetadataF64 metadata{1, 3, 4, 5, 6, 1, -1, 17};
  ArchitrinoSolverPhaseAtHitRowF64 abiRows[1]{};
  int abiRowCount = 0;
  const int abiStatus =
      architrino_solver_compute_phase_at_hit_f64(
          &abiRoot,
          1,
          &sourceClock,
          &receiverClock,
          &metadata,
          abiRows,
          1,
          &abiRowCount);

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
      phases.rows[0].metadata.rootKind == 1 &&
      phases.rows[0].metadata.sourceLayerCode == 3 &&
      phases.rows[0].metadata.receiverChargeSign == -1 &&
      phases.rows[0].metadata.stateFlags == 17 &&
      layout.rowSizeBytes == 104 &&
      layout.name == "phase_at_hit.v1" &&
      abiStatus == 0 &&
      abiRowCount == 1 &&
      abiRows[0].root_id == 7 &&
      abiRows[0].source_cycle_index == 1 &&
      abiRows[0].receiver_cycle_index == 1 &&
      nearly_equal(abiRows[0].source_phase, 0.5) &&
      nearly_equal(abiRows[0].receiver_phase, 0.4) &&
      nearly_equal(abiRows[0].phase_delta, -0.1) &&
      nearly_equal(abiRows[0].phase_spread, 0.1) &&
      abiRows[0].root_kind == 1 &&
      abiRows[0].source_layer_code == 3 &&
      abiRows[0].receiver_charge_sign == -1 &&
      abiRows[0].state_flags == 17;

  if (!ok) {
    std::cerr << "solver phase smoke failed\n";
    return 1;
  }

  std::cout << "solver phase=ok\n";
  return 0;
}
