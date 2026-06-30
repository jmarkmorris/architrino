#include "architrino/solver/SolverCAbi.hpp"
#include "architrino/solver/T3BulkStep.hpp"

#include <cmath>
#include <cstdint>
#include <iostream>

namespace {

bool nearly_equal(double left, double right, double tolerance = 1e-12) {
  return std::abs(left - right) <= tolerance;
}

}  // namespace

int main() {
  using architrino::solver::T3BulkStepRequest;
  using architrino::solver::T3InteractionLaw;
  using architrino::solver::T3ParticleState;
  using architrino::solver::Vector3;

  const T3BulkStepRequest request{
      0.0,
      1.0,
      1.0,
      10.0,
      1.0,
      1.0,
      1.0,
      2.0,
      1e-6,
      0.0,
      1.0,
      1e-6,
      0,
      static_cast<std::uint32_t>(T3InteractionLaw::SoftSphereRepelV1),
      1,
      1,
      1,
  };
  const std::vector<T3ParticleState> states{
      T3ParticleState{1, Vector3{9.8, 5.0, 5.0}, Vector3{0.5, 0.0, 0.0}, 1.0, 0.0, 1, 0},
      T3ParticleState{2, Vector3{0.2, 5.0, 5.0}, Vector3{-0.5, 0.0, 0.0}, 1.0, 0.0, 2, 0},
  };

  const architrino::solver::T3BulkStepResult result =
      architrino::solver::step_t3_universe(request, states);

  ArchitrinoSolverT3ParticleStepRowF64 abiRows[2]{};
  ArchitrinoSolverT3StepSummaryF64 abiSummary{};
  int abiRowCount = 0;
  const ArchitrinoSolverT3ParticleStateF64 abiStates[2]{
      ArchitrinoSolverT3ParticleStateF64{
          1,
          ArchitrinoSolverVector3F64{9.8, 5.0, 5.0},
          ArchitrinoSolverVector3F64{0.5, 0.0, 0.0},
          1.0,
          0.0,
          1,
          0,
      },
      ArchitrinoSolverT3ParticleStateF64{
          2,
          ArchitrinoSolverVector3F64{0.2, 5.0, 5.0},
          ArchitrinoSolverVector3F64{-0.5, 0.0, 0.0},
          1.0,
          0.0,
          2,
          0,
      },
  };
  const ArchitrinoSolverT3StepRequestF64 abiRequest{
      0.0,
      1.0,
      1.0,
      10.0,
      1.0,
      1.0,
      1.0,
      2.0,
      1e-6,
      0.0,
      1.0,
      1e-6,
      0,
      static_cast<std::uint32_t>(T3InteractionLaw::SoftSphereRepelV1),
      1,
      1,
      1,
  };
  ArchitrinoSolverT3UnresolvedRootSegmentRowF64 abiSegmentRows[1]{};
  int abiSegmentRowCount = 0;
  ArchitrinoSolverT3RetainedCausalRootReplayRowF64 abiReplayRows[1]{};
  int abiReplayRowCount = 0;
  const int abiStatus = architrino_solver_step_t3_universe_f64(
      &abiRequest,
      abiStates,
      2,
      abiRows,
      2,
      &abiRowCount,
      &abiSummary,
      abiSegmentRows,
      1,
      &abiSegmentRowCount,
      abiReplayRows,
      1,
      &abiReplayRowCount);
  const ArchitrinoSolverAbiInfo abiInfo = architrino_solver_abi_info();

  const bool ok =
      result.validation.ok &&
      result.rows.size() == 2 &&
      result.summary.neighborPairCount == 1 &&
      result.summary.occupiedCellCount == 2 &&
      result.rows[0].imageDeltaX == 0 &&
      result.rows[1].imageDeltaX == 0 &&
      nearly_equal(result.rows[0].position.x, abiRows[0].position.x) &&
      nearly_equal(result.rows[1].position.x, abiRows[1].position.x) &&
      nearly_equal(result.rows[0].acceleration.x, -result.rows[1].acceleration.x) &&
      abiStatus == 0 &&
      abiRowCount == 2 &&
      abiSummary.neighbor_pair_count == 1 &&
      abiRows[0].image_delta_x == 0 &&
      abiRows[1].image_delta_x == 0 &&
      result.unresolvedRootSegmentRows.size() == 1 &&
      result.retainedCausalRootReplayRows.size() == 1 &&
      abiSegmentRowCount == 1 &&
      abiSegmentRows[0].source_path_key == 1 &&
      abiSegmentRows[0].receiver_path_key == 2 &&
      abiSegmentRows[0].row_status == 1 &&
      abiReplayRowCount == 1 &&
      abiReplayRows[0].source_path_key == 1 &&
      abiReplayRows[0].receiver_path_key == 2 &&
      abiReplayRows[0].same_record_replay_id != 0 &&
      abiReplayRows[0].retained_source_record_id != 0 &&
      abiReplayRows[0].retained_causal_root_row_id != 0 &&
      abiReplayRows[0].root_ledger_record_id == abiReplayRows[0].retained_causal_root_row_id &&
      abiReplayRows[0].source_path_segment_id != 0 &&
      abiReplayRows[0].receiver_path_segment_id != 0 &&
      abiReplayRows[0].winding_label_x == -1 &&
      abiReplayRows[0].winding_label_y == 0 &&
      abiReplayRows[0].winding_label_z == 0 &&
      abiReplayRows[0].winding_label_status == 2 &&
      abiReplayRows[0].retained_source_binding_status == 2 &&
      abiReplayRows[0].same_record_replay_status == 2 &&
      abiReplayRows[0].caustic_route_status == 0 &&
      abiReplayRows[0].row_status == 2 &&
      abiInfo.abi_minor == 20 &&
      abiInfo.t3_step_request_f64_bytes == 120 &&
      abiInfo.t3_particle_state_f64_bytes == 80 &&
      abiInfo.t3_particle_step_row_f64_bytes == 104 &&
      abiInfo.t3_step_summary_f64_bytes == 88 &&
      abiInfo.t3_unresolved_root_segment_row_f64_bytes == 208 &&
      abiInfo.t3_retained_causal_root_replay_row_f64_bytes == 128;

  if (!ok) {
    std::cerr << "solver T3 smoke failed\n";
    std::cerr << "rows=" << result.rows.size()
              << " pairs=" << result.summary.neighborPairCount
              << " abiStatus=" << abiStatus
              << " abiRows=" << abiRowCount << '\n';
    return 1;
  }

  return 0;
}
