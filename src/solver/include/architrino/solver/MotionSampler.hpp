#pragma once

#include "architrino/solver/CausalRootSolver.hpp"

#include <cstdint>
#include <vector>

namespace architrino::solver {

struct MotionFrameRowF64 {
  std::uint64_t pathKey = 0;
  std::uint64_t frameIndex = 0;
  double time = 0.0;
  double positionX = 0.0;
  double positionY = 0.0;
  double positionZ = 0.0;
  double velocityX = 0.0;
  double velocityY = 0.0;
  double velocityZ = 0.0;
  double errorBound = 0.0;
  std::uint32_t stateFlags = 0;
  std::uint32_t reserved0 = 0;
};

struct MotionSampleRequest {
  LinearPathSegment segment;
  std::uint64_t pathKey = 0;
  double startTime = 0.0;
  double endTime = 0.0;
  double step = 1.0;
  std::uint32_t stateFlags = 0;
};

struct MotionSampleResult {
  std::vector<MotionFrameRowF64> frames;
  ValidationReport validation;
};

MotionSampleResult sample_linear_motion(const MotionSampleRequest& request);

}  // namespace architrino::solver
