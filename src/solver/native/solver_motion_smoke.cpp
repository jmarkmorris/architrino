#include "architrino/solver/BinaryLayouts.hpp"
#include "architrino/solver/MotionSampler.hpp"
#include "architrino/solver/SolverCAbi.hpp"

#include <cmath>
#include <iostream>

namespace {

bool nearly_equal(double left, double right, double tolerance = 1e-12) {
  return std::abs(left - right) <= tolerance;
}

}  // namespace

int main() {
  static_assert(sizeof(architrino::solver::MotionFrameRowF64) == 88);
  static_assert(sizeof(ArchitrinoSolverMotionIntegrationRequestF64) == 120);

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
  const ArchitrinoSolverAbiInfo abiInfo = architrino_solver_abi_info();

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
      abiStatus == 0 &&
      abiFrameCount == 3 &&
      abiFrames[2].path_key == 1234 &&
      abiFrames[2].state_flags == 9 &&
      nearly_equal(abiFrames[2].position_x, 5.0) &&
      nearly_equal(abiFrames[2].position_y, 3.0) &&
      nearly_equal(abiFrames[2].position_z, 1.0) &&
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
      abiInfo.motion_integration_request_f64_bytes == 120;

  if (!ok) {
    std::cerr << "solver motion smoke failed\n";
    return 1;
  }

  std::cout << "solver motion=ok frames=" << result.frames.size() << '\n';
  return 0;
}
