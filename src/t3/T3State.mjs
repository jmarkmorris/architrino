import { createT3Topology } from "./T3Topology.mjs";

export const T3_STATE_SCHEMA = "t3-state.v1";

export function createT3State(input = {}) {
  const particleCount = nonnegativeInteger(input.particleCount ?? input.count ?? 0, "particleCount");
  const vectorLength = particleCount * 3;
  const orientationLength = particleCount * 4;
  const state = {
    schema: T3_STATE_SCHEMA,
    particleCount,
    time: finiteNumber(input.time ?? 0, "time"),
    stepIndex: nonnegativeInteger(input.stepIndex ?? 0, "stepIndex"),
    positions: createFloat64Array(input.positions, vectorLength, "positions"),
    velocities: createFloat64Array(input.velocities, vectorLength, "velocities"),
    accelerations: createFloat64Array(input.accelerations, vectorLength, "accelerations"),
    imageOffsets: createInt32Array(input.imageOffsets, vectorLength, "imageOffsets"),
    orientations: createOrientations(input.orientations, orientationLength),
    angularVelocities: createFloat64Array(input.angularVelocities, vectorLength, "angularVelocities"),
    integrationWeights: createScalarArray(
      input.integrationWeights,
      particleCount,
      "integrationWeights",
      1
    ),
    electrineFractions: createScalarArray(
      input.electrineFractions ?? input.electrineComposition,
      particleCount,
      "electrineFractions",
      normalizeFraction(input.electrineFraction ?? input.electrinePercentage ?? 0.5)
    ),
    ids: createIds(input.ids, particleCount),
    metadata: clonePlainObject(input.metadata ?? {}),
  };
  return state;
}

export function cloneT3State(state) {
  return createT3State({
    particleCount: state.particleCount,
    time: state.time,
    stepIndex: state.stepIndex,
    positions: state.positions,
    velocities: state.velocities,
    accelerations: state.accelerations,
    imageOffsets: state.imageOffsets,
    orientations: state.orientations,
    angularVelocities: state.angularVelocities,
    integrationWeights: state.integrationWeights,
    electrineFractions: state.electrineFractions,
    ids: state.ids,
    metadata: state.metadata,
  });
}

export function copyT3StateInto(target, source) {
  if (target.particleCount !== source.particleCount) {
    throw new TypeError("cannot copy states with different particle counts");
  }
  target.time = source.time;
  target.stepIndex = source.stepIndex;
  target.positions.set(source.positions);
  target.velocities.set(source.velocities);
  target.accelerations.set(source.accelerations);
  target.imageOffsets.set(source.imageOffsets);
  target.orientations.set(source.orientations);
  target.angularVelocities.set(source.angularVelocities);
  target.integrationWeights.set(source.integrationWeights);
  target.electrineFractions.set(source.electrineFractions);
  target.ids = [...source.ids];
  target.metadata = clonePlainObject(source.metadata);
  return target;
}

export function wrapAllPositions(state, topologyInput) {
  const topology = topologyInput?.schema === "t3-topology.v1" ? topologyInput : createT3Topology(topologyInput);
  for (let index = 0; index < state.particleCount; index += 1) {
    topology.wrapPositionInPlace(state.positions, index, state.imageOffsets);
  }
  return state;
}

export function zeroAccelerations(state) {
  state.accelerations.fill(0);
  return state;
}

export function addAcceleration(state, particleIndex, ax, ay, az) {
  const offset = particleIndex * 3;
  state.accelerations[offset] += ax;
  state.accelerations[offset + 1] += ay;
  state.accelerations[offset + 2] += az;
}

export function addForce(state, particleIndex, fx, fy, fz) {
  const integrationWeight = state.integrationWeights[particleIndex];
  if (integrationWeight <= 0 || !Number.isFinite(integrationWeight)) {
    throw new TypeError(`particle ${particleIndex} integrationWeight must be positive`);
  }
  addAcceleration(state, particleIndex, fx / integrationWeight, fy / integrationWeight, fz / integrationWeight);
}

export function normalizeFraction(value) {
  const numericValue = finiteNumber(value, "electrineFraction");
  const normalized = numericValue > 1 ? numericValue / 100 : numericValue;
  if (normalized < 0 || normalized > 1) {
    throw new TypeError("electrineFraction must be between 0 and 1, or a percentage between 0 and 100");
  }
  return normalized;
}

function createFloat64Array(value, expectedLength, fieldName) {
  if (value == null) {
    return new Float64Array(expectedLength);
  }
  if (value.length !== expectedLength) {
    throw new TypeError(`${fieldName} must contain ${expectedLength} values`);
  }
  return Float64Array.from(value);
}

function createInt32Array(value, expectedLength, fieldName) {
  if (value == null) {
    return new Int32Array(expectedLength);
  }
  if (value.length !== expectedLength) {
    throw new TypeError(`${fieldName} must contain ${expectedLength} values`);
  }
  return Int32Array.from(value);
}

function createScalarArray(value, expectedLength, fieldName, defaultValue) {
  if (value == null) {
    return new Float64Array(expectedLength).fill(defaultValue);
  }
  if (typeof value === "number") {
    return new Float64Array(expectedLength).fill(fieldName === "electrineFractions" ? normalizeFraction(value) : value);
  }
  if (value.length !== expectedLength) {
    throw new TypeError(`${fieldName} must contain ${expectedLength} values`);
  }
  const array = Float64Array.from(value);
  if (fieldName === "electrineFractions") {
    for (let index = 0; index < array.length; index += 1) {
      array[index] = normalizeFraction(array[index]);
    }
  }
  return array;
}

function createOrientations(value, expectedLength) {
  if (value != null) {
    if (value.length !== expectedLength) {
      throw new TypeError(`orientations must contain ${expectedLength} values`);
    }
    return Float64Array.from(value);
  }
  const orientations = new Float64Array(expectedLength);
  for (let index = 0; index < expectedLength; index += 4) {
    orientations[index + 3] = 1;
  }
  return orientations;
}

function createIds(value, particleCount) {
  if (value == null) {
    return Array.from({ length: particleCount }, (_, index) => `a${index}`);
  }
  if (value.length !== particleCount) {
    throw new TypeError(`ids must contain ${particleCount} values`);
  }
  return Array.from(value, String);
}

function clonePlainObject(value) {
  return JSON.parse(JSON.stringify(value ?? {}));
}

function finiteNumber(value, fieldName) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    throw new TypeError(`${fieldName} must be finite`);
  }
  return numericValue;
}

function nonnegativeInteger(value, fieldName) {
  const numericValue = Number(value);
  if (!Number.isInteger(numericValue) || numericValue < 0) {
    throw new TypeError(`${fieldName} must be a nonnegative integer`);
  }
  return numericValue;
}
