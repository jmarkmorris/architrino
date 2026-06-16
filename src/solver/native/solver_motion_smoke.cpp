#include "architrino/solver/BinaryLayouts.hpp"
#include "architrino/solver/MotionSampler.hpp"

#include <cmath>
#include <iostream>

namespace {

bool nearly_equal(double left, double right, double tolerance = 1e-12) {
  return std::abs(left - right) <= tolerance;
}

}  // namespace

int main() {
  static_assert(sizeof(architrino::solver::MotionFrameRowF64) == 88);

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
      !invalid.validation.ok;

  if (!ok) {
    std::cerr << "solver motion smoke failed\n";
    return 1;
  }

  std::cout << "solver motion=ok frames=" << result.frames.size() << '\n';
  return 0;
}
