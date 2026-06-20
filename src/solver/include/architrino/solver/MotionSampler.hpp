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

struct PairInteractionState {
  std::uint64_t pathKey = 0;
  Vector3 initialPosition{};
  Vector3 initialVelocity{};
  double charge = 1.0;
  double mass = 1.0;
  std::uint32_t stateFlags = 0;
};

struct PairInteractionPathConstraint {
  std::uint64_t pathKey = 0;
  std::uint32_t depth = 0;
  double time = 0.0;
  Vector3 position{};
};

struct PairInteractionRequest {
  double startTime = 0.0;
  double endTime = 0.0;
  double step = 1.0;
  double pairAccelerationScale = 0.18;
  double softening = 0.0;
  double integrationTolerance = 0.0;
  std::uint32_t interactionLaw = 1;
  std::uint32_t integrationMethod = 1;
  std::uint64_t boundaryRelaxationIterationCount = 8;
  double boundaryRelaxationTolerance = 0.0;
  double boundaryRelaxationStepTolerance = 0.0;
  std::vector<PairInteractionPathConstraint> pathConstraints{};
};

struct PairInteractionSampleResult {
  std::vector<MotionFrameRowF64> frames;
  std::vector<PathHistoryRowF64> pathRows;
  std::uint64_t stepCount = 0;
  std::uint64_t pathConstraintCount = 0;
  std::uint64_t pathConstraintFrameRefinementSampleCount = 0;
  std::uint64_t pathConstraintPositionResidualSampleCount = 0;
  double maxPathConstraintPositionResidual = 0.0;
  double meanPathConstraintPositionResidual = 0.0;
  double rmsPathConstraintPositionResidual = 0.0;
  std::uint64_t pathConstraintResidualSampleCount = 0;
  double maxPathConstraintResidual = 0.0;
  double meanPathConstraintResidual = 0.0;
  double rmsPathConstraintResidual = 0.0;
  std::uint64_t pathConstraintGuidanceSampleCount = 0;
  double maxPathConstraintGuidanceAcceleration = 0.0;
  double meanPathConstraintGuidanceAcceleration = 0.0;
  double rmsPathConstraintGuidanceAcceleration = 0.0;
  std::uint64_t pathConstraintBoundaryResidualSampleCount = 0;
  double maxPathConstraintBoundaryResidual = 0.0;
  double meanPathConstraintBoundaryResidual = 0.0;
  double rmsPathConstraintBoundaryResidual = 0.0;
  std::uint64_t pathConstraintBoundaryRelaxationResidualSampleCount = 0;
  double maxPathConstraintBoundaryRelaxationResidualBefore = 0.0;
  double maxPathConstraintBoundaryRelaxationResidualAfter = 0.0;
  double meanPathConstraintBoundaryRelaxationResidualBefore = 0.0;
  double meanPathConstraintBoundaryRelaxationResidualAfter = 0.0;
  double rmsPathConstraintBoundaryRelaxationResidualBefore = 0.0;
  double rmsPathConstraintBoundaryRelaxationResidualAfter = 0.0;
  double pathConstraintBoundaryRelaxationResidualRatio = 0.0;
  double meanPathConstraintBoundaryRelaxationResidualRatio = 0.0;
  double rmsPathConstraintBoundaryRelaxationResidualRatio = 0.0;
  double pathConstraintBoundaryRelaxationResidualSettlingRate = 0.0;
  double meanPathConstraintBoundaryRelaxationResidualSettlingRate = 0.0;
  double rmsPathConstraintBoundaryRelaxationResidualSettlingRate = 0.0;
  std::uint32_t pathConstraintBoundaryRelaxationStatus = 0;
  std::uint32_t pathConstraintBoundaryRelaxationAppliedIterationCount = 0;
  std::uint32_t pathConstraintBoundaryRelaxationStopReason = 0;
  std::uint32_t pathConstraintBoundaryRelaxationSelectedCandidateKind = 0;
  std::uint64_t pathConstraintBoundarySeedSampleCount = 0;
  double pathConstraintBoundaryRelaxationMaxStep = 0.0;
  double pathConstraintBoundaryRelaxationFinalStepFactor = 0.0;
  std::uint32_t pathConstraintBoundaryRelaxationCenterOfMassSelectedCount = 0;
  std::uint64_t pathConstraintBoundaryRelaxationCandidateVariantCount = 0;
  std::uint64_t pathConstraintBoundaryRelaxationLineSearchTrialCount = 0;
  std::uint64_t pathConstraintBoundaryRelaxationCandidateKindMask = 0;
  ValidationReport validation;
};

MotionSampleResult sample_linear_motion(const MotionSampleRequest& request);
MotionPathHistoryResult sample_linear_path_history(const MotionSampleRequest& request);
MotionSampleResult integrate_constant_acceleration_motion(const MotionIntegrationRequest& request);
MotionPathHistoryResult integrate_constant_acceleration_path_history(
    const MotionIntegrationRequest& request);
PairInteractionSampleResult integrate_pair_interaction_motion(
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates);

}  // namespace architrino::solver
