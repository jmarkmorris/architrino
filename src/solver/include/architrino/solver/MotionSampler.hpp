#pragma once

#include "architrino/solver/CausalRootSolver.hpp"
#include "architrino/solver/PathHistoryStream.hpp"

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

struct MotionPathHistoryResult {
  std::vector<PathHistoryRowF64> rows;
  ValidationReport validation;
};

struct MotionIntegrationRequest {
  std::uint64_t pathKey = 0;
  double startTime = 0.0;
  double endTime = 0.0;
  double step = 1.0;
  Vector3 initialPosition{};
  Vector3 initialVelocity{};
  Vector3 acceleration{};
  double integrationTolerance = 0.0;
  std::uint32_t integrationMethod = 1;
  std::uint32_t stateFlags = 0;
};

MotionSampleResult sample_linear_motion(const MotionSampleRequest& request);
MotionPathHistoryResult sample_linear_path_history(const MotionSampleRequest& request);
MotionSampleResult integrate_constant_acceleration_motion(const MotionIntegrationRequest& request);
MotionPathHistoryResult integrate_constant_acceleration_path_history(
    const MotionIntegrationRequest& request);

}  // namespace architrino::solver
