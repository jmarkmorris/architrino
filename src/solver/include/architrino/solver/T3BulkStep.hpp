#pragma once

#include "architrino/solver/CausalRootSolver.hpp"

#include <cstdint>
#include <vector>

namespace architrino::solver {

enum class T3InteractionLaw : std::uint32_t {
  None = 0,
  SoftSphereRepelV1 = 1,
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
  std::uint32_t interactionLaw = static_cast<std::uint32_t>(T3InteractionLaw::None);
  std::uint32_t integrationMethod = 1;
  std::uint32_t reserved0 = 0;
  std::uint32_t reserved1 = 0;
};

struct T3ParticleState {
  std::uint64_t pathKey = 0;
  Vector3 position{};
  Vector3 velocity{};
  double mass = 1.0;
  double charge = 0.0;
  std::uint32_t stateFlags = 0;
  std::uint32_t reserved0 = 0;
};

struct T3ParticleStepRowF64 {
  std::uint64_t pathKey = 0;
  Vector3 position{};
  Vector3 velocity{};
  Vector3 acceleration{};
  double mass = 1.0;
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

struct T3BulkStepResult {
  std::vector<T3ParticleStepRowF64> rows;
  T3StepSummaryF64 summary{};
  ValidationReport validation;
};

T3BulkStepResult step_t3_universe(
    const T3BulkStepRequest& request,
    const std::vector<T3ParticleState>& initialStates);

}  // namespace architrino::solver
