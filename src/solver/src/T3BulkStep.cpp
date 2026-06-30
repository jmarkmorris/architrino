#include "architrino/solver/T3BulkStep.hpp"

#include <algorithm>
#include <cmath>
#include <cstddef>
#include <limits>
#include <unordered_map>
#include <unordered_set>

namespace architrino::solver {
namespace {

constexpr std::uint64_t kMaxT3CellsPerAxis = 4096;
constexpr std::uint64_t kMaxT3CellCount = 1ULL << 32U;

bool finite_vector(Vector3 value) {
  return std::isfinite(value.x) && std::isfinite(value.y) && std::isfinite(value.z);
}

double vector_norm(Vector3 value) {
  return std::sqrt(value.x * value.x + value.y * value.y + value.z * value.z);
}

bool validate_request(
    const T3BulkStepRequest& request,
    const std::vector<T3ParticleState>& initialStates,
    ValidationReport& validation) {
  if (!std::isfinite(request.startTime) || !std::isfinite(request.endTime) ||
      request.endTime < request.startTime) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "T3 step time bounds must be finite and ordered",
                   "t3-bulk-step",
                   false);
    return false;
  }
  if (!std::isfinite(request.timestep) || request.timestep <= 0.0) {
    validation.add(StatusCode::TimeResolutionInsufficient,
                   StatusSeverity::Error,
                   "T3 step timestep must be positive and finite",
                   "t3-bulk-step",
                   false);
    return false;
  }
  if (std::abs((request.endTime - request.startTime) - request.timestep) >
      std::max(1e-12, request.timestep * 1e-9)) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "T3 step timestep must match endTime - startTime",
                   "t3-bulk-step",
                   false);
    return false;
  }
  if (!std::isfinite(request.sideLength) || request.sideLength <= 0.0 ||
      !std::isfinite(request.interactionRadius) || request.interactionRadius <= 0.0 ||
      !std::isfinite(request.spatialCellSize) || request.spatialCellSize <= 0.0 ||
      !std::isfinite(request.integrationTolerance) || request.integrationTolerance < 0.0) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "T3 topology, index, and tolerance values must be finite",
                   "t3-bulk-step",
                   false);
    return false;
  }
  if (request.interactionLaw != static_cast<std::uint32_t>(T3InteractionLaw::None) &&
      request.interactionLaw != static_cast<std::uint32_t>(T3InteractionLaw::SoftSphereRepelV1)) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "T3 interaction law is not supported",
                   "t3-bulk-step",
                   false);
    return false;
  }
  if (request.integrationMethod != 1) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "T3 integration method is not supported",
                   "t3-bulk-step",
                   false);
    return false;
  }
  if (request.unresolvedRootSegmentSidecarEnabled != 0) {
    if (!std::isfinite(request.signalSpeed) || request.signalSpeed <= 0.0 ||
        !std::isfinite(request.rootTolerance) || request.rootTolerance <= 0.0) {
      validation.add(StatusCode::AppContractError,
                     StatusSeverity::Error,
                     "T3 unresolved-root segment sidecar requires finite positive signalSpeed and rootTolerance",
                     "t3-bulk-step",
                     false);
      return false;
    }
    if (request.unresolvedRootPairPolicy !=
        static_cast<std::uint32_t>(T3UnresolvedRootSegmentPairPolicy::NeighborPrunedV1)) {
      validation.add(StatusCode::AppContractError,
                     StatusSeverity::Error,
                     "T3 unresolved-root segment sidecar pair policy is not supported",
                     "t3-bulk-step",
                     false);
      return false;
    }
  }
  if (request.interactionLaw == static_cast<std::uint32_t>(T3InteractionLaw::SoftSphereRepelV1) &&
      (!std::isfinite(request.softSphereRadius) || request.softSphereRadius <= 0.0 ||
       !std::isfinite(request.softSphereStrength) ||
       !std::isfinite(request.softening) || request.softening < 0.0)) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "T3 soft-sphere parameters must be finite",
                   "t3-bulk-step",
                   false);
    return false;
  }
  for (const T3ParticleState& state : initialStates) {
    if (!finite_vector(state.position) || !finite_vector(state.velocity) ||
        !std::isfinite(state.integrationWeight) || state.integrationWeight <= 0.0 ||
        !std::isfinite(state.charge)) {
      validation.add(StatusCode::AppContractError,
                     StatusSeverity::Error,
                     "T3 particle states must be finite with positive integrationWeight",
                     "t3-bulk-step",
                     false);
      return false;
    }
  }
  return true;
}

double wrap_component(double value, double sideLength, std::int32_t& imageDelta) {
  const double imageDeltaDouble = std::floor(value / sideLength);
  if (imageDeltaDouble < static_cast<double>(std::numeric_limits<std::int32_t>::min()) ||
      imageDeltaDouble > static_cast<double>(std::numeric_limits<std::int32_t>::max())) {
    imageDelta = 0;
    return std::numeric_limits<double>::quiet_NaN();
  }
  imageDelta = static_cast<std::int32_t>(imageDeltaDouble);
  double wrapped = value - static_cast<double>(imageDelta) * sideLength;
  if (wrapped >= sideLength) {
    wrapped = 0.0;
  } else if (wrapped < 0.0) {
    wrapped += sideLength;
    imageDelta -= 1;
  }
  return wrapped;
}

double wrap_component_for_index(double value, double sideLength) {
  std::int32_t ignored = 0;
  return wrap_component(value, sideLength, ignored);
}

double nearest_image_delta(double fromValue, double toValue, double sideLength) {
  const double delta = toValue - fromValue;
  return delta - sideLength * std::round(delta / sideLength);
}

Vector3 nearest_image_displacement(Vector3 from, Vector3 to, double sideLength) {
  return Vector3{
      nearest_image_delta(from.x, to.x, sideLength),
      nearest_image_delta(from.y, to.y, sideLength),
      nearest_image_delta(from.z, to.z, sideLength),
  };
}

int modulo_cell(int value, int modulus) {
  const int result = value % modulus;
  return result < 0 ? result + modulus : result;
}

std::uint64_t cell_key(int x, int y, int z, int cellsPerAxis) {
  const std::uint64_t ux = static_cast<std::uint64_t>(modulo_cell(x, cellsPerAxis));
  const std::uint64_t uy = static_cast<std::uint64_t>(modulo_cell(y, cellsPerAxis));
  const std::uint64_t uz = static_cast<std::uint64_t>(modulo_cell(z, cellsPerAxis));
  const std::uint64_t axis = static_cast<std::uint64_t>(cellsPerAxis);
  return ux + axis * (uy + axis * uz);
}

int coordinate_to_cell(double value, double sideLength, double cellSize, int cellsPerAxis) {
  const double wrapped = wrap_component_for_index(value, sideLength);
  const int cell = static_cast<int>(std::floor(wrapped / cellSize));
  return modulo_cell(std::min(cell, cellsPerAxis - 1), cellsPerAxis);
}

void add_acceleration(Vector3& target, Vector3 value) {
  target.x += value.x;
  target.y += value.y;
  target.z += value.z;
}

std::uint64_t mix_t3_candidate_id(
    std::uint64_t tag,
    std::uint64_t stepIndex,
    std::uint64_t sourcePathKey,
    std::uint64_t receiverPathKey,
    std::uint64_t sourceSegmentIndex,
    std::uint64_t receiverSegmentIndex) {
  std::uint64_t value = 1469598103934665603ULL ^ tag;
  const std::uint64_t fields[] = {
      stepIndex,
      sourcePathKey,
      receiverPathKey,
      sourceSegmentIndex,
      receiverSegmentIndex,
  };
  for (const std::uint64_t field : fields) {
    value ^= field + 0x9e3779b97f4a7c15ULL + (value << 6U) + (value >> 2U);
    value *= 1099511628211ULL;
  }
  return value == 0 ? tag : value;
}

}  // namespace

T3BulkStepResult step_t3_universe(
    const T3BulkStepRequest& request,
    const std::vector<T3ParticleState>& initialStates) {
  T3BulkStepResult result;
  result.summary.particleCount = initialStates.size();
  result.summary.startTime = request.startTime;
  result.summary.endTime = request.endTime;
  result.summary.timestep = request.timestep;
  result.summary.interactionLaw = request.interactionLaw;
  result.summary.integrationMethod = request.integrationMethod;

  if (!validate_request(request, initialStates, result.validation)) {
    return result;
  }

  const auto requestedCellsPerAxis =
      static_cast<std::uint64_t>(std::max(1.0, std::floor(request.sideLength / request.spatialCellSize)));
  if (requestedCellsPerAxis == 0 || requestedCellsPerAxis > kMaxT3CellsPerAxis ||
      requestedCellsPerAxis > std::numeric_limits<std::uint64_t>::max() / requestedCellsPerAxis ||
      requestedCellsPerAxis * requestedCellsPerAxis >
          std::numeric_limits<std::uint64_t>::max() / requestedCellsPerAxis) {
    result.validation.add(StatusCode::AppContractError,
                          StatusSeverity::Error,
                          "T3 spatial index cell count is outside the supported envelope",
                          "t3-bulk-step",
                          false);
    return result;
  }
  const std::uint64_t cellCount =
      requestedCellsPerAxis * requestedCellsPerAxis * requestedCellsPerAxis;
  if (cellCount > kMaxT3CellCount) {
    result.validation.add(StatusCode::AppContractError,
                          StatusSeverity::Error,
                          "T3 spatial index cell count is outside the supported envelope",
                          "t3-bulk-step",
                          false);
    return result;
  }
  const int cellsPerAxis = static_cast<int>(requestedCellsPerAxis);
  const double cellSize = request.sideLength / static_cast<double>(cellsPerAxis);
  const int neighborCellRadius = std::min(
      cellsPerAxis,
      static_cast<int>(std::ceil(request.interactionRadius / cellSize)));
  result.summary.cellCount = cellCount;

  std::vector<T3ParticleState> states = initialStates;
  std::vector<Vector3> accelerations(states.size());
  std::unordered_map<std::uint64_t, std::vector<std::size_t>> cells;
  cells.reserve(states.size());
  std::vector<int> cellCoordinates(states.size() * 3U, 0);

  for (std::size_t index = 0; index < states.size(); ++index) {
    states[index].position.x = wrap_component_for_index(states[index].position.x, request.sideLength);
    states[index].position.y = wrap_component_for_index(states[index].position.y, request.sideLength);
    states[index].position.z = wrap_component_for_index(states[index].position.z, request.sideLength);
    const int x = coordinate_to_cell(states[index].position.x, request.sideLength, cellSize, cellsPerAxis);
    const int y = coordinate_to_cell(states[index].position.y, request.sideLength, cellSize, cellsPerAxis);
    const int z = coordinate_to_cell(states[index].position.z, request.sideLength, cellSize, cellsPerAxis);
    cellCoordinates[index * 3U] = x;
    cellCoordinates[index * 3U + 1U] = y;
    cellCoordinates[index * 3U + 2U] = z;
    cells[cell_key(x, y, z, cellsPerAxis)].push_back(index);
  }
  result.summary.occupiedCellCount = cells.size();

  const bool useSoftSphere =
      request.interactionLaw == static_cast<std::uint32_t>(T3InteractionLaw::SoftSphereRepelV1);
  const double radiusSquared = request.interactionRadius * request.interactionRadius;
  const double softRadius = std::min(request.softSphereRadius, request.interactionRadius);
  double interactionEnergy = 0.0;
  std::uint64_t neighborPairCount = 0;
  std::unordered_set<std::uint64_t> seenCells;
  const bool emitUnresolvedRootSegmentRows =
      request.unresolvedRootSegmentSidecarEnabled != 0 &&
      request.unresolvedRootPairPolicy ==
          static_cast<std::uint32_t>(T3UnresolvedRootSegmentPairPolicy::NeighborPrunedV1);

  for (std::size_t i = 0; i < states.size(); ++i) {
    seenCells.clear();
    const int baseX = cellCoordinates[i * 3U];
    const int baseY = cellCoordinates[i * 3U + 1U];
    const int baseZ = cellCoordinates[i * 3U + 2U];
    for (int dx = -neighborCellRadius; dx <= neighborCellRadius; ++dx) {
      for (int dy = -neighborCellRadius; dy <= neighborCellRadius; ++dy) {
        for (int dz = -neighborCellRadius; dz <= neighborCellRadius; ++dz) {
          const std::uint64_t key = cell_key(baseX + dx, baseY + dy, baseZ + dz, cellsPerAxis);
          if (!seenCells.insert(key).second) {
            continue;
          }
          const auto bucketIt = cells.find(key);
          if (bucketIt == cells.end()) {
            continue;
          }
          for (const std::size_t j : bucketIt->second) {
            if (j <= i) {
              continue;
            }
            const Vector3 displacement =
                nearest_image_displacement(states[i].position, states[j].position, request.sideLength);
            const double distanceSquared =
                displacement.x * displacement.x +
                displacement.y * displacement.y +
                displacement.z * displacement.z;
            if (distanceSquared > radiusSquared) {
              continue;
            }
            ++neighborPairCount;
            if (emitUnresolvedRootSegmentRows) {
              const T3UnresolvedRootSegmentRowF64 segmentRow{
                  request.stepIndex,
                  states[i].pathKey,
                  states[j].pathKey,
                  request.stepIndex,
                  request.stepIndex,
                  states[i].position,
                  states[i].velocity,
                  states[j].position,
                  states[j].velocity,
                  request.startTime,
                  request.endTime,
                  request.endTime,
                  request.signalSpeed,
                  request.rootTolerance,
                  request.integrationTolerance,
                  request.integrationTolerance,
                  states[i].stateFlags,
                  states[j].stateFlags,
                  request.unresolvedRootPairPolicy,
                  static_cast<std::uint32_t>(
                      T3UnresolvedRootSegmentRowStatus::CandidateShapeEvidence),
              };
              result.unresolvedRootSegmentRows.push_back(segmentRow);
              const std::uint64_t sameRecordReplayId =
                  mix_t3_candidate_id(0x74337265706c6179ULL,
                                      segmentRow.stepIndex,
                                      segmentRow.sourcePathKey,
                                      segmentRow.receiverPathKey,
                                      segmentRow.sourceSegmentIndex,
                                      segmentRow.receiverSegmentIndex);
              const std::uint64_t retainedSourceRecordId =
                  mix_t3_candidate_id(0x7433736f75726365ULL,
                                      segmentRow.stepIndex,
                                      segmentRow.sourcePathKey,
                                      segmentRow.receiverPathKey,
                                      segmentRow.sourceSegmentIndex,
                                      segmentRow.receiverSegmentIndex);
              const std::uint64_t retainedCausalRootRowId =
                  mix_t3_candidate_id(0x7433726f6f74726fULL,
                                      segmentRow.stepIndex,
                                      segmentRow.sourcePathKey,
                                      segmentRow.receiverPathKey,
                                      segmentRow.sourceSegmentIndex,
                                      segmentRow.receiverSegmentIndex);
              const std::uint64_t sourcePathSegmentId =
                  mix_t3_candidate_id(0x7433737263706174ULL,
                                      segmentRow.stepIndex,
                                      segmentRow.sourcePathKey,
                                      0,
                                      segmentRow.sourceSegmentIndex,
                                      0);
              const std::uint64_t receiverPathSegmentId =
                  mix_t3_candidate_id(0x7433726376706174ULL,
                                      segmentRow.stepIndex,
                                      0,
                                      segmentRow.receiverPathKey,
                                      0,
                                      segmentRow.receiverSegmentIndex);
              result.retainedCausalRootReplayRows.push_back(T3RetainedCausalRootReplayRowF64{
                  segmentRow.stepIndex,
                  segmentRow.sourcePathKey,
                  segmentRow.receiverPathKey,
                  segmentRow.sourceSegmentIndex,
                  segmentRow.receiverSegmentIndex,
                  sameRecordReplayId,
                  retainedSourceRecordId,
                  retainedCausalRootRowId,
                  retainedCausalRootRowId,
                  sourcePathSegmentId,
                  receiverPathSegmentId,
                  static_cast<std::uint32_t>(
                      T3RetainedCausalRootReplayFieldStatus::CandidateSameRecordBinding),
                  static_cast<std::uint32_t>(
                      T3RetainedCausalRootReplayRowStatus::CandidateSameRecordBinding),
                  static_cast<std::uint32_t>(
                      T3RetainedCausalRootReplayFieldStatus::Missing),
                  static_cast<std::uint32_t>(
                      T3RetainedCausalRootReplayFieldStatus::CandidateSidecarShapeEvidence),
                  static_cast<std::uint32_t>(
                      T3RetainedCausalRootReplayRowStatus::CandidateSameRecordBinding),
                  0,
              });
            }
            if (!useSoftSphere) {
              continue;
            }
            const double distance = std::sqrt(distanceSquared);
            if (distance >= softRadius || distance == 0.0) {
              continue;
            }
            const double overlap = softRadius - distance;
            const double forceMagnitude =
                (request.softSphereStrength * overlap) / (distance + request.softening);
            const Vector3 force{
                -forceMagnitude * displacement.x,
                -forceMagnitude * displacement.y,
                -forceMagnitude * displacement.z,
            };
            add_acceleration(accelerations[i],
                             Vector3{
                                 force.x / states[i].integrationWeight,
                                 force.y / states[i].integrationWeight,
                                 force.z / states[i].integrationWeight,
                             });
            add_acceleration(accelerations[j],
                             Vector3{
                                 -force.x / states[j].integrationWeight,
                                 -force.y / states[j].integrationWeight,
                                 -force.z / states[j].integrationWeight,
                             });
            interactionEnergy += 0.5 * request.softSphereStrength * overlap * overlap;
          }
        }
      }
    }
  }

  result.rows.reserve(states.size());
  const double dt = request.timestep;
  double maxAcceleration = 0.0;
  for (std::size_t index = 0; index < states.size(); ++index) {
    const Vector3 acceleration = accelerations[index];
    maxAcceleration = std::max(maxAcceleration, vector_norm(acceleration));
    Vector3 position{
        states[index].position.x + states[index].velocity.x * dt + 0.5 * acceleration.x * dt * dt,
        states[index].position.y + states[index].velocity.y * dt + 0.5 * acceleration.y * dt * dt,
        states[index].position.z + states[index].velocity.z * dt + 0.5 * acceleration.z * dt * dt,
    };
    Vector3 velocity{
        states[index].velocity.x + acceleration.x * dt,
        states[index].velocity.y + acceleration.y * dt,
        states[index].velocity.z + acceleration.z * dt,
    };
    std::int32_t imageDeltaX = 0;
    std::int32_t imageDeltaY = 0;
    std::int32_t imageDeltaZ = 0;
    position.x = wrap_component(position.x, request.sideLength, imageDeltaX);
    position.y = wrap_component(position.y, request.sideLength, imageDeltaY);
    position.z = wrap_component(position.z, request.sideLength, imageDeltaZ);
    if (!finite_vector(position)) {
      result.rows.clear();
      result.validation.add(StatusCode::AppContractError,
                            StatusSeverity::Error,
                            "T3 wrapped output position overflowed image offsets",
                            "t3-bulk-step",
                            false);
      return result;
    }
    result.rows.push_back(T3ParticleStepRowF64{
        states[index].pathKey,
        position,
        velocity,
        acceleration,
        states[index].integrationWeight,
        imageDeltaX,
        imageDeltaY,
        imageDeltaZ,
        states[index].stateFlags,
    });
  }

  result.summary.neighborPairCount = neighborPairCount;
  result.summary.maxAcceleration = maxAcceleration;
  result.summary.interactionEnergy = interactionEnergy;
  result.validation.add(StatusCode::Ok,
                        StatusSeverity::Ok,
                        "T3 bulk step completed",
                        "t3-bulk-step",
                        true);
  return result;
}

}  // namespace architrino::solver
