#pragma once

#include "architrino/solver/CausalRootSolver.hpp"

#include <cstdint>
#include <vector>

namespace architrino::solver {

enum class T3InteractionLaw : std::uint32_t {
  None = 0,
  SoftSphereRepelV1 = 1,
};

enum class T3UnresolvedRootSegmentPairPolicy : std::uint32_t {
  Disabled = 0,
  NeighborPrunedV1 = 1,
};

enum class T3UnresolvedRootSegmentRowStatus : std::uint32_t {
  Disabled = 0,
  CandidateShapeEvidence = 1,
};

enum class T3RetainedCausalRootReplayRowStatus : std::uint32_t {
  Disabled = 0,
  MissingRetainedReplaySource = 1,
  CandidateSameRecordBinding = 2,
};

enum class T3RetainedCausalRootReplayFieldStatus : std::uint32_t {
  Missing = 0,
  CandidateSidecarShapeEvidence = 1,
  CandidateSameRecordBinding = 2,
};

enum class T3WindingLabelStatus : std::uint32_t {
  Missing = 0,
  LocalPreWrapCandidate = 1,
  GlobalPeriodicWrapCandidate = 2,
};

struct T3BulkStepRequest {
  double startTime = 0.0;
  double endTime = 0.0;
  double timestep = 0.0;
  double sideLength = 1.0;
  double interactionRadius = 1.0;
  double spatialCellSize = 1.0;
  double softSphereRadius = 1.0;
  double softSphereStrength = 0.0;
  double softening = 0.0;
  double integrationTolerance = 0.0;
  double signalSpeed = 0.0;
  double rootTolerance = 0.0;
  std::uint64_t stepIndex = 0;
  std::uint32_t interactionLaw = static_cast<std::uint32_t>(T3InteractionLaw::None);
  std::uint32_t integrationMethod = 1;
  std::uint32_t unresolvedRootSegmentSidecarEnabled = 0;
  std::uint32_t unresolvedRootPairPolicy =
      static_cast<std::uint32_t>(T3UnresolvedRootSegmentPairPolicy::Disabled);
};

struct T3ParticleState {
  std::uint64_t pathKey = 0;
  Vector3 position{};
  Vector3 velocity{};
  double integrationWeight = 1.0;
  double charge = 0.0;
  std::uint32_t stateFlags = 0;
  std::uint32_t reserved0 = 0;
};

struct T3ParticleStepRowF64 {
  std::uint64_t pathKey = 0;
  Vector3 position{};
  Vector3 velocity{};
  Vector3 acceleration{};
  double integrationWeight = 1.0;
  std::int32_t imageDeltaX = 0;
  std::int32_t imageDeltaY = 0;
  std::int32_t imageDeltaZ = 0;
  std::uint32_t stateFlags = 0;
};

struct T3StepSummaryF64 {
  std::uint64_t particleCount = 0;
  std::uint64_t neighborPairCount = 0;
  std::uint64_t cellCount = 0;
  std::uint64_t occupiedCellCount = 0;
  double startTime = 0.0;
  double endTime = 0.0;
  double timestep = 0.0;
  double maxAcceleration = 0.0;
  double interactionEnergy = 0.0;
  std::uint32_t interactionLaw = static_cast<std::uint32_t>(T3InteractionLaw::None);
  std::uint32_t integrationMethod = 1;
  std::uint32_t statusFlags = 0;
  std::uint32_t reserved0 = 0;
};

struct T3UnresolvedRootSegmentRowF64 {
  std::uint64_t stepIndex = 0;
  std::uint64_t sourcePathKey = 0;
  std::uint64_t receiverPathKey = 0;
  std::uint64_t sourceSegmentIndex = 0;
  std::uint64_t receiverSegmentIndex = 0;
  Vector3 sourcePosition{};
  Vector3 sourceVelocity{};
  Vector3 receiverPosition{};
  Vector3 receiverVelocity{};
  double startTime = 0.0;
  double endTime = 0.0;
  double hitTime = 0.0;
  double signalSpeed = 0.0;
  double rootTolerance = 0.0;
  double sourceErrorBound = 0.0;
  double receiverErrorBound = 0.0;
  std::uint32_t sourceStateFlags = 0;
  std::uint32_t receiverStateFlags = 0;
  std::uint32_t pairPolicy =
      static_cast<std::uint32_t>(T3UnresolvedRootSegmentPairPolicy::Disabled);
  std::uint32_t rowStatus =
      static_cast<std::uint32_t>(T3UnresolvedRootSegmentRowStatus::Disabled);
};

struct T3RetainedCausalRootReplayRowF64 {
  std::uint64_t stepIndex = 0;
  std::uint64_t sourcePathKey = 0;
  std::uint64_t receiverPathKey = 0;
  std::uint64_t sourceSegmentIndex = 0;
  std::uint64_t receiverSegmentIndex = 0;
  std::uint64_t sameRecordReplayId = 0;
  std::uint64_t retainedSourceRecordId = 0;
  std::uint64_t retainedCausalRootRowId = 0;
  std::uint64_t rootLedgerRecordId = 0;
  std::uint64_t sourcePathSegmentId = 0;
  std::uint64_t receiverPathSegmentId = 0;
  std::int32_t windingLabelX = 0;
  std::int32_t windingLabelY = 0;
  std::int32_t windingLabelZ = 0;
  std::uint32_t windingLabelStatus =
      static_cast<std::uint32_t>(T3WindingLabelStatus::Missing);
  std::uint32_t retainedSourceBindingStatus =
      static_cast<std::uint32_t>(T3RetainedCausalRootReplayFieldStatus::Missing);
  std::uint32_t sameRecordReplayStatus =
      static_cast<std::uint32_t>(T3RetainedCausalRootReplayRowStatus::Disabled);
  std::uint32_t causticRouteStatus =
      static_cast<std::uint32_t>(T3RetainedCausalRootReplayFieldStatus::Missing);
  std::uint32_t proofObjectProvenanceStatus =
      static_cast<std::uint32_t>(T3RetainedCausalRootReplayFieldStatus::Missing);
  std::uint32_t rowStatus =
      static_cast<std::uint32_t>(T3RetainedCausalRootReplayRowStatus::Disabled);
  std::uint32_t reserved0 = 0;
};

struct T3BulkStepResult {
  std::vector<T3ParticleStepRowF64> rows;
  std::vector<T3UnresolvedRootSegmentRowF64> unresolvedRootSegmentRows;
  std::vector<T3RetainedCausalRootReplayRowF64> retainedCausalRootReplayRows;
  T3StepSummaryF64 summary{};
  ValidationReport validation;
};

T3BulkStepResult step_t3_universe(
    const T3BulkStepRequest& request,
    const std::vector<T3ParticleState>& initialStates);

}  // namespace architrino::solver
