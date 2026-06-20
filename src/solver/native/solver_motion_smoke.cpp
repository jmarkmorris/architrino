#include "architrino/solver/BinaryLayouts.hpp"
#include "architrino/solver/MotionSampler.hpp"
#include "architrino/solver/SolverCAbi.hpp"

#include <cmath>
#include <iomanip>
#include <iostream>
#include <vector>

namespace {

bool nearly_equal(double left, double right, double tolerance = 1e-12) {
  return std::abs(left - right) <= tolerance;
}

}  // namespace

int main() {
  static_assert(sizeof(architrino::solver::MotionFrameRowF64) == 88);
  static_assert(sizeof(ArchitrinoSolverMotionIntegrationRequestF64) == 120);
  static_assert(sizeof(ArchitrinoSolverPairInteractionRequestF64) == 64);
  static_assert(sizeof(ArchitrinoSolverPairInteractionStateF64) == 80);
  static_assert(sizeof(ArchitrinoSolverPairInteractionPathConstraintF64) == 48);
  static_assert(sizeof(ArchitrinoSolverPairInteractionSummaryF64) == 136);

  const architrino::solver::LinearPathSegment segment{
      "motion-path",
      0.0,
      2.0,
      architrino::solver::Vector3{1.0, 2.0, 3.0},
      architrino::solver::Vector3{2.0, 0.5, -1.0},
      architrino::solver::NumericType::F64,
      1e-12,
  };
  const architrino::solver::MotionSampleResult result =
      architrino::solver::sample_linear_motion(architrino::solver::MotionSampleRequest{
          segment,
          1234,
          0.0,
          2.0,
          1.0,
          9,
      });
  const architrino::solver::MotionPathHistoryResult linearPathHistory =
      architrino::solver::sample_linear_path_history(architrino::solver::MotionSampleRequest{
          segment,
          1234,
          0.0,
          2.0,
          1.0,
          9,
      });
  const architrino::solver::BinaryLayoutDescriptor layout =
      architrino::solver::binary_layout_descriptor(architrino::solver::BinaryLayoutId::FrameBufferV1);

  architrino::solver::MotionSampleRequest invalidRequest{
      segment,
      1234,
      -1.0,
      2.0,
      1.0,
      0,
  };
  const architrino::solver::MotionSampleResult invalid =
      architrino::solver::sample_linear_motion(invalidRequest);
  ArchitrinoSolverMotionSampleRequestF64 abiRequest{
      ArchitrinoSolverLinearPathSegmentF64{
          0.0,
          2.0,
          ArchitrinoSolverVector3F64{1.0, 2.0, 3.0},
          ArchitrinoSolverVector3F64{2.0, 0.5, -1.0},
          1e-12,
      },
      1234,
      0.0,
      2.0,
      1.0,
      9,
      0,
  };
  ArchitrinoSolverMotionFrameRowF64 abiFrames[3]{};
  int abiFrameCount = 0;
  const int abiStatus =
      architrino_solver_sample_linear_motion_f64(&abiRequest, abiFrames, 3, &abiFrameCount);
  ArchitrinoSolverPathHistoryRowF64 abiLinearPathRows[1]{};
  int abiLinearPathRowCount = 0;
  const int abiLinearPathStatus = architrino_solver_sample_linear_path_history_f64(
      &abiRequest,
      abiLinearPathRows,
      1,
      &abiLinearPathRowCount);
  const architrino::solver::MotionSampleResult integrated =
      architrino::solver::integrate_constant_acceleration_motion(
          architrino::solver::MotionIntegrationRequest{
              4321,
              0.0,
              2.0,
              1.0,
              architrino::solver::Vector3{1.0, 1.0, 1.0},
              architrino::solver::Vector3{2.0, 0.0, -1.0},
              architrino::solver::Vector3{0.5, 1.0, 2.0},
              1e-11,
              1,
              11,
          });
  const architrino::solver::MotionPathHistoryResult integratedPathHistory =
      architrino::solver::integrate_constant_acceleration_path_history(
          architrino::solver::MotionIntegrationRequest{
              4321,
              0.0,
              2.0,
              1.0,
              architrino::solver::Vector3{1.0, 1.0, 1.0},
              architrino::solver::Vector3{2.0, 0.0, -1.0},
              architrino::solver::Vector3{0.5, 1.0, 2.0},
              1e-11,
              1,
              11,
          });
  ArchitrinoSolverMotionIntegrationRequestF64 abiIntegrationRequest{
      4321,
      0.0,
      2.0,
      1.0,
      ArchitrinoSolverVector3F64{1.0, 1.0, 1.0},
      ArchitrinoSolverVector3F64{2.0, 0.0, -1.0},
      ArchitrinoSolverVector3F64{0.5, 1.0, 2.0},
      1e-11,
      1,
      11,
  };
  ArchitrinoSolverMotionFrameRowF64 abiIntegratedFrames[3]{};
  int abiIntegratedFrameCount = 0;
  const int abiIntegrationStatus = architrino_solver_integrate_constant_acceleration_motion_f64(
      &abiIntegrationRequest,
      abiIntegratedFrames,
      3,
      &abiIntegratedFrameCount);
  ArchitrinoSolverPathHistoryRowF64 abiIntegratedPathRows[2]{};
  int abiIntegratedPathRowCount = 0;
  const int abiIntegrationPathStatus =
      architrino_solver_integrate_constant_acceleration_path_history_f64(
          &abiIntegrationRequest,
          abiIntegratedPathRows,
          2,
          &abiIntegratedPathRowCount);
  const architrino::solver::PairInteractionSampleResult pairIntegrated =
      architrino::solver::integrate_pair_interaction_motion(
          architrino::solver::PairInteractionRequest{
              0.0,
              1.0,
              0.5,
              0.1,
              0.0,
              1e-10,
              1,
              1,
          },
          std::vector<architrino::solver::PairInteractionState>{
              architrino::solver::PairInteractionState{
                  101,
                  architrino::solver::Vector3{0.0, 0.0, 0.0},
                  architrino::solver::Vector3{0.0, 0.0, 0.0},
                  1.0,
                  1.0,
                  1,
              },
              architrino::solver::PairInteractionState{
                  202,
                  architrino::solver::Vector3{10.0, 0.0, 0.0},
                  architrino::solver::Vector3{0.0, 0.0, 0.0},
                  -1.0,
                  1.0,
                  2,
              },
          });
  ArchitrinoSolverPairInteractionRequestF64 abiPairRequest{
      0.0,
      1.0,
      0.5,
      0.1,
      0.0,
      1e-10,
      1,
      1,
      0,
  };
  ArchitrinoSolverPairInteractionStateF64 abiPairStates[2]{
      ArchitrinoSolverPairInteractionStateF64{
          101,
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          1.0,
          1.0,
          1,
          0,
      },
      ArchitrinoSolverPairInteractionStateF64{
          202,
          ArchitrinoSolverVector3F64{10.0, 0.0, 0.0},
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          -1.0,
          1.0,
          2,
          0,
      },
  };
  ArchitrinoSolverMotionFrameRowF64 abiPairFrames[6]{};
  int abiPairFrameCount = 0;
  ArchitrinoSolverPathHistoryRowF64 abiPairPathRows[4]{};
  int abiPairPathRowCount = 0;
  const int abiPairStatus = architrino_solver_integrate_pair_interaction_motion_f64(
      &abiPairRequest,
      abiPairStates,
      2,
      nullptr,
      0,
      abiPairFrames,
      6,
      &abiPairFrameCount,
      abiPairPathRows,
      4,
      &abiPairPathRowCount,
      nullptr);
  const architrino::solver::PairInteractionSampleResult pairConstrained =
      architrino::solver::integrate_pair_interaction_motion(
          architrino::solver::PairInteractionRequest{
              0.0,
              1.0,
              0.25,
              0.1,
              0.0,
              1e-10,
              1,
              1,
              std::vector<architrino::solver::PairInteractionPathConstraint>{
                  architrino::solver::PairInteractionPathConstraint{
                      101,
                      1,
                      0.0,
                      architrino::solver::Vector3{0.0, 0.0, 0.0},
                  },
                  architrino::solver::PairInteractionPathConstraint{
                      101,
                      2,
                      0.5,
                      architrino::solver::Vector3{4.0, 2.0, 0.0},
                  },
                  architrino::solver::PairInteractionPathConstraint{
                      101,
                      3,
                      1.0,
                      architrino::solver::Vector3{8.0, 0.0, 0.0},
                  },
                  architrino::solver::PairInteractionPathConstraint{
                      202,
                      1,
                      0.0,
                      architrino::solver::Vector3{10.0, 0.0, 0.0},
                  },
                  architrino::solver::PairInteractionPathConstraint{
                      202,
                      2,
                      0.5,
                      architrino::solver::Vector3{9.0, 1.0, 0.0},
                  },
                  architrino::solver::PairInteractionPathConstraint{
                      202,
                      3,
                      1.0,
                      architrino::solver::Vector3{8.0, 2.0, 0.0},
                  },
              },
          },
          std::vector<architrino::solver::PairInteractionState>{
              architrino::solver::PairInteractionState{
                  101,
                  architrino::solver::Vector3{0.0, 0.0, 0.0},
                  architrino::solver::Vector3{0.0, 0.0, 0.0},
                  1.0,
                  1.0,
                  1,
              },
              architrino::solver::PairInteractionState{
                  202,
                  architrino::solver::Vector3{10.0, 0.0, 0.0},
                  architrino::solver::Vector3{0.0, 0.0, 0.0},
                  -1.0,
                  1.0,
                  2,
              },
          });
  ArchitrinoSolverPairInteractionPathConstraintF64 abiPairConstraints[6]{
      ArchitrinoSolverPairInteractionPathConstraintF64{
          101,
          1,
          0,
          0.0,
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
      },
      ArchitrinoSolverPairInteractionPathConstraintF64{
          101,
          2,
          0,
          0.5,
          ArchitrinoSolverVector3F64{4.0, 2.0, 0.0},
      },
      ArchitrinoSolverPairInteractionPathConstraintF64{
          101,
          3,
          0,
          1.0,
          ArchitrinoSolverVector3F64{8.0, 0.0, 0.0},
      },
      ArchitrinoSolverPairInteractionPathConstraintF64{
          202,
          1,
          0,
          0.0,
          ArchitrinoSolverVector3F64{10.0, 0.0, 0.0},
      },
      ArchitrinoSolverPairInteractionPathConstraintF64{
          202,
          2,
          0,
          0.5,
          ArchitrinoSolverVector3F64{9.0, 1.0, 0.0},
      },
      ArchitrinoSolverPairInteractionPathConstraintF64{
          202,
          3,
          0,
          1.0,
          ArchitrinoSolverVector3F64{8.0, 2.0, 0.0},
      },
  };
  ArchitrinoSolverPairInteractionRequestF64 abiPairConstrainedRequest = abiPairRequest;
  abiPairConstrainedRequest.step = 0.25;
  ArchitrinoSolverMotionFrameRowF64 abiPairConstrainedFrames[10]{};
  int abiPairConstrainedFrameCount = 0;
  ArchitrinoSolverPathHistoryRowF64 abiPairConstrainedPathRows[8]{};
  int abiPairConstrainedPathRowCount = 0;
  ArchitrinoSolverPairInteractionSummaryF64 abiPairConstrainedSummary{};
  const int abiPairConstrainedStatus = architrino_solver_integrate_pair_interaction_motion_f64(
      &abiPairConstrainedRequest,
      abiPairStates,
      2,
      abiPairConstraints,
      6,
      abiPairConstrainedFrames,
      10,
      &abiPairConstrainedFrameCount,
      abiPairConstrainedPathRows,
      8,
      &abiPairConstrainedPathRowCount,
      &abiPairConstrainedSummary);
  const ArchitrinoSolverAbiInfo abiInfo = architrino_solver_abi_info();
  const double expectedPathInterpolationBound = 1e-11 + 0.125 * std::sqrt(5.25);

  const bool ok =
      result.validation.ok &&
      result.frames.size() == 3 &&
      result.frames[0].pathKey == 1234 &&
      result.frames[0].frameIndex == 0 &&
      result.frames[0].stateFlags == 9 &&
      nearly_equal(result.frames[0].positionX, 1.0) &&
      nearly_equal(result.frames[1].positionX, 3.0) &&
      nearly_equal(result.frames[2].positionX, 5.0) &&
      nearly_equal(result.frames[2].positionY, 3.0) &&
      nearly_equal(result.frames[2].positionZ, 1.0) &&
      nearly_equal(result.frames[2].velocityX, 2.0) &&
      layout.rowSizeBytes == 88 &&
      layout.name == "frame_buffer.v1" &&
      !invalid.validation.ok &&
      linearPathHistory.validation.ok &&
      linearPathHistory.rows.size() == 1 &&
      linearPathHistory.rows[0].pathKey == 1234 &&
      linearPathHistory.rows[0].stateFlags == 9 &&
      nearly_equal(linearPathHistory.rows[0].startTime, 0.0) &&
      nearly_equal(linearPathHistory.rows[0].endTime, 2.0) &&
      nearly_equal(linearPathHistory.rows[0].startX, 1.0) &&
      nearly_equal(linearPathHistory.rows[0].startY, 2.0) &&
      nearly_equal(linearPathHistory.rows[0].startZ, 3.0) &&
      nearly_equal(linearPathHistory.rows[0].velocityX, 2.0) &&
      nearly_equal(linearPathHistory.rows[0].velocityY, 0.5) &&
      nearly_equal(linearPathHistory.rows[0].velocityZ, -1.0) &&
      abiStatus == 0 &&
      abiFrameCount == 3 &&
      abiFrames[2].path_key == 1234 &&
      abiFrames[2].state_flags == 9 &&
      nearly_equal(abiFrames[2].position_x, 5.0) &&
      nearly_equal(abiFrames[2].position_y, 3.0) &&
      nearly_equal(abiFrames[2].position_z, 1.0) &&
      abiLinearPathStatus == 0 &&
      abiLinearPathRowCount == 1 &&
      abiLinearPathRows[0].path_key == 1234 &&
      abiLinearPathRows[0].state_flags == 9 &&
      nearly_equal(abiLinearPathRows[0].velocity_x, 2.0) &&
      nearly_equal(abiLinearPathRows[0].velocity_y, 0.5) &&
      nearly_equal(abiLinearPathRows[0].velocity_z, -1.0) &&
      integrated.validation.ok &&
      integrated.frames.size() == 3 &&
      integrated.frames[2].pathKey == 4321 &&
      integrated.frames[2].stateFlags == 11 &&
      integrated.frames[2].reserved0 == 1 &&
      nearly_equal(integrated.frames[2].positionX, 6.0) &&
      nearly_equal(integrated.frames[2].positionY, 3.0) &&
      nearly_equal(integrated.frames[2].positionZ, 3.0) &&
      nearly_equal(integrated.frames[2].velocityX, 3.0) &&
      nearly_equal(integrated.frames[2].velocityY, 2.0) &&
      nearly_equal(integrated.frames[2].velocityZ, 3.0) &&
      nearly_equal(integrated.frames[2].errorBound, 1e-11) &&
      integratedPathHistory.validation.ok &&
      integratedPathHistory.rows.size() == 2 &&
      integratedPathHistory.rows[0].pathKey == 4321 &&
      integratedPathHistory.rows[0].segmentIndex == 0 &&
      integratedPathHistory.rows[0].stateFlags == 11 &&
      integratedPathHistory.rows[0].reserved0 == 1 &&
      nearly_equal(integratedPathHistory.rows[0].startTime, 0.0) &&
      nearly_equal(integratedPathHistory.rows[0].endTime, 1.0) &&
      nearly_equal(integratedPathHistory.rows[0].startX, 1.0) &&
      nearly_equal(integratedPathHistory.rows[0].startY, 1.0) &&
      nearly_equal(integratedPathHistory.rows[0].startZ, 1.0) &&
      nearly_equal(integratedPathHistory.rows[0].velocityX, 2.25) &&
      nearly_equal(integratedPathHistory.rows[0].velocityY, 0.5) &&
      nearly_equal(integratedPathHistory.rows[0].velocityZ, 0.0) &&
      nearly_equal(integratedPathHistory.rows[0].errorBound, expectedPathInterpolationBound) &&
      abiIntegrationStatus == 0 &&
      abiIntegratedFrameCount == 3 &&
      abiIntegratedFrames[2].path_key == 4321 &&
      abiIntegratedFrames[2].state_flags == 11 &&
      abiIntegratedFrames[2].reserved0 == 1 &&
      nearly_equal(abiIntegratedFrames[2].position_x, 6.0) &&
      nearly_equal(abiIntegratedFrames[2].position_y, 3.0) &&
      nearly_equal(abiIntegratedFrames[2].position_z, 3.0) &&
      nearly_equal(abiIntegratedFrames[2].velocity_x, 3.0) &&
      nearly_equal(abiIntegratedFrames[2].velocity_y, 2.0) &&
      nearly_equal(abiIntegratedFrames[2].velocity_z, 3.0) &&
      abiIntegrationPathStatus == 0 &&
      abiIntegratedPathRowCount == 2 &&
      abiIntegratedPathRows[0].path_key == 4321 &&
      abiIntegratedPathRows[0].segment_index == 0 &&
      abiIntegratedPathRows[0].state_flags == 11 &&
      abiIntegratedPathRows[0].reserved0 == 1 &&
      nearly_equal(abiIntegratedPathRows[0].start_x, 1.0) &&
      nearly_equal(abiIntegratedPathRows[0].velocity_x, 2.25) &&
      nearly_equal(abiIntegratedPathRows[0].velocity_y, 0.5) &&
      nearly_equal(abiIntegratedPathRows[0].velocity_z, 0.0) &&
      nearly_equal(abiIntegratedPathRows[0].error_bound, expectedPathInterpolationBound) &&
      pairIntegrated.validation.ok &&
      pairIntegrated.frames.size() == 6 &&
      pairIntegrated.pathRows.size() == 4 &&
      pairIntegrated.frames[2].pathKey == 101 &&
      pairIntegrated.frames[2].frameIndex == 1 &&
      pairIntegrated.frames[2].stateFlags == 1 &&
      nearly_equal(pairIntegrated.frames[2].positionX, 0.25) &&
      nearly_equal(pairIntegrated.frames[2].velocityX, 0.5) &&
      nearly_equal(pairIntegrated.frames[4].positionX, 0.7375) &&
      nearly_equal(pairIntegrated.frames[4].velocityX, 0.975) &&
      pairIntegrated.pathRows[0].pathKey == 101 &&
      pairIntegrated.pathRows[0].segmentIndex == 0 &&
      nearly_equal(pairIntegrated.pathRows[0].velocityX, 0.5) &&
      nearly_equal(pairIntegrated.pathRows[0].errorBound, 1e-10) &&
      abiPairStatus == 0 &&
      abiPairFrameCount == 6 &&
      abiPairPathRowCount == 4 &&
      abiPairFrames[2].path_key == 101 &&
      abiPairFrames[2].frame_index == 1 &&
      nearly_equal(abiPairFrames[2].position_x, 0.25) &&
      nearly_equal(abiPairFrames[2].velocity_x, 0.5) &&
      nearly_equal(abiPairFrames[4].position_x, 0.7375) &&
      nearly_equal(abiPairFrames[4].velocity_x, 0.975) &&
      abiPairPathRows[0].path_key == 101 &&
      nearly_equal(abiPairPathRows[0].velocity_x, 0.5) &&
      pairConstrained.validation.ok &&
      pairConstrained.frames.size() == 10 &&
      pairConstrained.pathRows.size() == 8 &&
      pairConstrained.pathConstraintCount == 6 &&
      pairConstrained.pathConstraintResidualSampleCount == 6 &&
      pairConstrained.maxPathConstraintResidual > 0.0 &&
      pairConstrained.pathConstraintGuidanceSampleCount > 0 &&
      pairConstrained.maxPathConstraintGuidanceAcceleration > 0.0 &&
      pairConstrained.pathConstraintBoundaryResidualSampleCount == 2 &&
      pairConstrained.maxPathConstraintBoundaryResidual > 0.0 &&
      pairConstrained.pathConstraintBoundaryRelaxationResidualSampleCount > 0 &&
      pairConstrained.maxPathConstraintBoundaryRelaxationResidualBefore >
          pairConstrained.maxPathConstraintBoundaryRelaxationResidualAfter &&
      pairConstrained.pathConstraintBoundaryRelaxationResidualRatio >= 0.0 &&
      pairConstrained.pathConstraintBoundaryRelaxationResidualRatio < 1.0 &&
      nearly_equal(pairConstrained.frames[2].positionX, 1.97538, 1e-4) &&
      nearly_equal(pairConstrained.frames[2].positionY, 1.00158, 1e-4) &&
      nearly_equal(pairConstrained.frames[2].velocityX, 8.0, 1e-4) &&
      nearly_equal(pairConstrained.frames[2].velocityY, 4.0, 1e-4) &&
      nearly_equal(pairConstrained.frames[4].positionX, 4.0) &&
      nearly_equal(pairConstrained.frames[4].positionY, 2.0) &&
      nearly_equal(pairConstrained.frames[4].velocityX, 8.03356, 1e-4) &&
      nearly_equal(pairConstrained.frames[4].velocityY, -0.0052218, 1e-4) &&
      nearly_equal(pairConstrained.frames[9].positionY, 2.0) &&
      pairConstrained.pathRows[0].pathKey == 101 &&
      nearly_equal(pairConstrained.pathRows[0].velocityX, 7.9015, 1e-4) &&
      nearly_equal(pairConstrained.pathRows[0].velocityY, 4.00631, 1e-4) &&
      abiPairConstrainedStatus == 0 &&
      abiPairConstrainedFrameCount == 10 &&
      abiPairConstrainedPathRowCount == 8 &&
      nearly_equal(abiPairConstrainedFrames[2].position_x, 1.97538, 1e-4) &&
      nearly_equal(abiPairConstrainedFrames[2].position_y, 1.00158, 1e-4) &&
      nearly_equal(abiPairConstrainedFrames[2].velocity_x, 8.0, 1e-4) &&
      nearly_equal(abiPairConstrainedFrames[2].velocity_y, 4.0, 1e-4) &&
      nearly_equal(abiPairConstrainedFrames[4].position_x, 4.0) &&
      nearly_equal(abiPairConstrainedFrames[4].position_y, 2.0) &&
      nearly_equal(abiPairConstrainedFrames[4].velocity_x, 8.03356, 1e-4) &&
      nearly_equal(abiPairConstrainedFrames[4].velocity_y, -0.0052218, 1e-4) &&
      nearly_equal(abiPairConstrainedFrames[9].position_y, 2.0) &&
      abiPairConstrainedPathRows[0].path_key == 101 &&
      nearly_equal(abiPairConstrainedPathRows[0].velocity_x, 7.9015, 1e-4) &&
      nearly_equal(abiPairConstrainedPathRows[0].velocity_y, 4.00631, 1e-4) &&
      abiPairConstrainedSummary.path_constraint_count == 6 &&
      abiPairConstrainedSummary.residual_sample_count == 6 &&
      nearly_equal(
          abiPairConstrainedSummary.max_constraint_residual,
          pairConstrained.maxPathConstraintResidual) &&
      abiPairConstrainedSummary.guidance_sample_count ==
          pairConstrained.pathConstraintGuidanceSampleCount &&
      nearly_equal(
          abiPairConstrainedSummary.max_guidance_acceleration,
          pairConstrained.maxPathConstraintGuidanceAcceleration) &&
      abiPairConstrainedSummary.boundary_residual_sample_count ==
          pairConstrained.pathConstraintBoundaryResidualSampleCount &&
      nearly_equal(
          abiPairConstrainedSummary.max_boundary_residual,
          pairConstrained.maxPathConstraintBoundaryResidual) &&
      abiPairConstrainedSummary.boundary_relaxation_residual_sample_count ==
          pairConstrained.pathConstraintBoundaryRelaxationResidualSampleCount &&
      nearly_equal(
          abiPairConstrainedSummary.max_boundary_relaxation_residual_before,
          pairConstrained.maxPathConstraintBoundaryRelaxationResidualBefore) &&
      nearly_equal(
          abiPairConstrainedSummary.max_boundary_relaxation_residual_after,
          pairConstrained.maxPathConstraintBoundaryRelaxationResidualAfter) &&
      nearly_equal(
          abiPairConstrainedSummary.boundary_relaxation_residual_ratio,
          pairConstrained.pathConstraintBoundaryRelaxationResidualRatio) &&
      abiInfo.motion_integration_request_f64_bytes == 120;

  if (!ok) {
    std::cerr << std::setprecision(17);
    std::cerr << "solver motion smoke failed\n";
    std::cerr << "pairConstrained frames=" << pairConstrained.frames.size()
              << " rows=" << pairConstrained.pathRows.size()
              << " residualSamples=" << pairConstrained.pathConstraintResidualSampleCount
              << " guidanceSamples=" << pairConstrained.pathConstraintGuidanceSampleCount
              << '\n';
    if (pairConstrained.frames.size() > 4) {
      std::cerr << "frame2 pos=(" << pairConstrained.frames[2].positionX << ','
                << pairConstrained.frames[2].positionY << ") vel=("
                << pairConstrained.frames[2].velocityX << ','
                << pairConstrained.frames[2].velocityY << ")\n";
      std::cerr << "frame4 pos=(" << pairConstrained.frames[4].positionX << ','
                << pairConstrained.frames[4].positionY << ") vel=("
                << pairConstrained.frames[4].velocityX << ','
                << pairConstrained.frames[4].velocityY << ")\n";
      std::cerr << "frame9 pos=(" << pairConstrained.frames[9].positionX << ','
                << pairConstrained.frames[9].positionY << ") vel=("
                << pairConstrained.frames[9].velocityX << ','
                << pairConstrained.frames[9].velocityY << ")\n";
    }
    if (!pairConstrained.pathRows.empty()) {
      std::cerr << "pathRow0 velocity=(" << pairConstrained.pathRows[0].velocityX
                << ',' << pairConstrained.pathRows[0].velocityY << ")\n";
    }
    std::cerr << "abi constrained frames=" << abiPairConstrainedFrameCount
              << " rows=" << abiPairConstrainedPathRowCount
              << " residualSamples=" << abiPairConstrainedSummary.residual_sample_count
              << '\n';
    std::cerr << "summary max residual native=" << pairConstrained.maxPathConstraintResidual
              << " abi=" << abiPairConstrainedSummary.max_constraint_residual
              << " guidance native=" << pairConstrained.maxPathConstraintGuidanceAcceleration
              << " abi=" << abiPairConstrainedSummary.max_guidance_acceleration
              << " boundary native=" << pairConstrained.maxPathConstraintBoundaryResidual
              << " abi=" << abiPairConstrainedSummary.max_boundary_residual << '\n';
    if (abiPairConstrainedFrameCount > 4) {
      std::cerr << "abi frame2 pos=(" << abiPairConstrainedFrames[2].position_x << ','
                << abiPairConstrainedFrames[2].position_y << ") vel=("
                << abiPairConstrainedFrames[2].velocity_x << ','
                << abiPairConstrainedFrames[2].velocity_y << ")\n";
      std::cerr << "abi frame4 pos=(" << abiPairConstrainedFrames[4].position_x << ','
                << abiPairConstrainedFrames[4].position_y << ") vel=("
                << abiPairConstrainedFrames[4].velocity_x << ','
                << abiPairConstrainedFrames[4].velocity_y << ")\n";
      std::cerr << "abi frame9 pos=(" << abiPairConstrainedFrames[9].position_x << ','
                << abiPairConstrainedFrames[9].position_y << ") vel=("
                << abiPairConstrainedFrames[9].velocity_x << ','
                << abiPairConstrainedFrames[9].velocity_y << ")\n";
    }
    if (abiPairConstrainedPathRowCount > 0) {
      std::cerr << "abi pathRow0 velocity=(" << abiPairConstrainedPathRows[0].velocity_x
                << ',' << abiPairConstrainedPathRows[0].velocity_y << ")\n";
    }
    return 1;
  }

  std::cout << "solver motion=ok frames=" << result.frames.size() << '\n';
  return 0;
}
