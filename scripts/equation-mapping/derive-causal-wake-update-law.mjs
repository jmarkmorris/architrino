#!/usr/bin/env node

import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

const DEFAULT_TOLERANCE = 2e-13;

function assertFiniteVector(vector, name) {
  assert.ok(Array.isArray(vector) && vector.length === 3, `${name} must be 3D`);
  for (const component of vector) {
    assert.ok(Number.isFinite(component), `${name} must be finite`);
  }
}

function add(left, right) {
  return left.map((component, index) => component + right[index]);
}

function subtract(left, right) {
  return left.map((component, index) => component - right[index]);
}

function scale(vector, scalar) {
  return vector.map((component) => component * scalar);
}

function dot(left, right) {
  return left.reduce(
    (total, component, index) => total + component * right[index],
    0,
  );
}

function norm(vector) {
  return Math.hypot(...vector);
}

function normalize(vector) {
  const magnitude = norm(vector);
  assert.ok(magnitude > 0, "cannot normalize a zero vector");
  return scale(vector, 1 / magnitude);
}

function bisect(fn, left, right, tolerance = DEFAULT_TOLERANCE) {
  let leftValue = fn(left);
  let rightValue = fn(right);
  assert.ok(
    leftValue === 0 ||
      rightValue === 0 ||
      Math.sign(leftValue) !== Math.sign(rightValue),
    "root is not bracketed",
  );
  if (leftValue === 0) return left;
  if (rightValue === 0) return right;

  for (let iteration = 0; iteration < 200; iteration += 1) {
    const middle = (left + right) / 2;
    const middleValue = fn(middle);
    if (
      middleValue === 0 ||
      right - left <= tolerance * Math.max(1, Math.abs(middle))
    ) {
      return middle;
    }
    if (Math.sign(middleValue) === Math.sign(leftValue)) {
      left = middle;
      leftValue = middleValue;
    } else {
      right = middle;
      rightValue = middleValue;
    }
  }
  throw new Error("bisection did not converge");
}

export function emitCausalWakeSurface({
  transmitterId,
  emissionTime,
  center,
  polarity,
  fieldSpeed = 1,
}) {
  assert.ok(transmitterId !== undefined && transmitterId !== null);
  assert.ok(Number.isFinite(emissionTime));
  assertFiniteVector(center, "center");
  assert.ok(Number.isFinite(polarity) && polarity !== 0);
  assert.ok(Number.isFinite(fieldSpeed) && fieldSpeed > 0);
  return Object.freeze({
    transmitterId,
    emissionTime,
    center: Object.freeze([...center]),
    polarity,
    fieldSpeed,
  });
}

export function advanceCausalWakeSurface(surface, receptionTime) {
  assert.ok(Number.isFinite(receptionTime));
  const age = receptionTime - surface.emissionTime;
  assert.ok(age >= 0, "wake surface cannot advance before emission");
  return {
    ...surface,
    center: [...surface.center],
    receptionTime,
    age,
    radius: surface.fieldSpeed * age,
  };
}

export function causalSurfacePoint(surface, receptionTime, direction) {
  assertFiniteVector(direction, "direction");
  const unitDirection = normalize(direction);
  const advanced = advanceCausalWakeSurface(surface, receptionTime);
  return add(advanced.center, scale(unitDirection, advanced.radius));
}

export function surfaceMeasureDensityPerEmissionTime(
  surface,
  receptionTime,
) {
  const advanced = advanceCausalWakeSurface(surface, receptionTime);
  assert.ok(advanced.radius > 0, "surface density is singular at emission");
  return (
    (surface.fieldSpeed * surface.polarity) /
    (4 * Math.PI * advanced.radius * advanced.radius)
  );
}

export function causalSurfaceResidual(
  surface,
  receptionTime,
  receiverPosition,
) {
  assertFiniteVector(receiverPosition, "receiverPosition");
  const advanced = advanceCausalWakeSurface(surface, receptionTime);
  return norm(subtract(receiverPosition, advanced.center)) - advanced.radius;
}

export function causalSurfaceNormal(
  surface,
  receptionTime,
  receiverPosition,
) {
  const residual = causalSurfaceResidual(
    surface,
    receptionTime,
    receiverPosition,
  );
  assert.ok(
    Math.abs(residual) <= 2e-10,
    `receiver is not on the wake surface: residual=${residual}`,
  );
  return normalize(subtract(receiverPosition, surface.center));
}

export function finiteDifferenceSurfaceGradient({
  surface,
  receptionTime,
  receiverPosition,
  step = 1e-6,
}) {
  assert.ok(Number.isFinite(step) && step > 0);
  return receiverPosition.map((_, axis) => {
    const plus = [...receiverPosition];
    const minus = [...receiverPosition];
    plus[axis] += step;
    minus[axis] -= step;
    return (
      (causalSurfaceResidual(surface, receptionTime, plus) -
        causalSurfaceResidual(surface, receptionTime, minus)) /
      (2 * step)
    );
  });
}

export function canonicalRootReduction({
  transmitterPosition,
  transmitterVelocity,
  receiverPosition,
  fieldSpeed = 1,
}) {
  assertFiniteVector(transmitterPosition, "transmitterPosition");
  assertFiniteVector(transmitterVelocity, "transmitterVelocity");
  assertFiniteVector(receiverPosition, "receiverPosition");
  assert.ok(Number.isFinite(fieldSpeed) && fieldSpeed > 0);
  const separation = subtract(receiverPosition, transmitterPosition);
  const distance = norm(separation);
  assert.ok(distance > 0);
  const direction = scale(separation, 1 / distance);
  const transmitterDenominator =
    fieldSpeed - dot(transmitterVelocity, direction);
  assert.notEqual(transmitterDenominator, 0);
  return {
    distance,
    direction,
    transmitterDenominator,
    accelerationWeight:
      fieldSpeed / Math.abs(transmitterDenominator),
  };
}

export function solveAffineCausalRoot({
  transmitterPositionAtZero,
  transmitterVelocity,
  receiverPosition,
  receptionTime,
  sourceTimeBracket,
  fieldSpeed = 1,
}) {
  const transmitterPosition = (sourceTime) =>
    add(
      transmitterPositionAtZero,
      scale(transmitterVelocity, sourceTime),
    );
  const residual = (sourceTime) =>
    norm(subtract(receiverPosition, transmitterPosition(sourceTime))) -
    fieldSpeed * (receptionTime - sourceTime);
  const emissionTime = bisect(
    residual,
    sourceTimeBracket[0],
    sourceTimeBracket[1],
  );
  return {
    emissionTime,
    residual: residual(emissionTime),
    transmitterPosition: transmitterPosition(emissionTime),
    ...canonicalRootReduction({
      transmitterPosition: transmitterPosition(emissionTime),
      transmitterVelocity,
      receiverPosition,
      fieldSpeed,
    }),
  };
}

function gaussianDelta(value, width) {
  return (
    Math.exp(-(value * value) / (2 * width * width)) /
    (Math.sqrt(2 * Math.PI) * width)
  );
}

export function numericalFixedReceptionCollapse({
  transmitterPositionAtZero,
  transmitterVelocity,
  receiverPosition,
  receptionTime,
  sourceTimeInterval,
  fieldSpeed = 1,
  width = 0.005,
  steps = 120000,
}) {
  assert.ok(Number.isFinite(width) && width > 0);
  assert.ok(Number.isInteger(steps) && steps > 0);
  const [left, right] = sourceTimeInterval;
  const step = (right - left) / steps;
  let integral = 0;
  for (let index = 0; index < steps; index += 1) {
    const sourceTime = left + (index + 0.5) * step;
    const transmitterPosition = add(
      transmitterPositionAtZero,
      scale(transmitterVelocity, sourceTime),
    );
    const residual =
      norm(subtract(receiverPosition, transmitterPosition)) -
      fieldSpeed * (receptionTime - sourceTime);
    integral +=
      fieldSpeed * gaussianDelta(residual, width) * step;
  }
  return integral;
}

export function inertiallyTransportedSurfaceVelocity({
  emissionVelocity,
  direction,
  fieldSpeed = 1,
}) {
  assertFiniteVector(emissionVelocity, "emissionVelocity");
  assertFiniteVector(direction, "direction");
  const unitDirection = normalize(direction);
  const velocity = add(
    emissionVelocity,
    scale(unitDirection, fieldSpeed),
  );
  return {
    velocity,
    absoluteSpeed: norm(velocity),
    speedResidual: norm(velocity) - fieldSpeed,
  };
}

export function inertiallyTransportedCollapseDenominator({
  emissionAcceleration,
  delay,
  direction,
  fieldSpeed = 1,
}) {
  assertFiniteVector(emissionAcceleration, "emissionAcceleration");
  assert.ok(Number.isFinite(delay) && delay >= 0);
  assertFiniteVector(direction, "direction");
  const unitDirection = normalize(direction);
  return (
    fieldSpeed - delay * dot(emissionAcceleration, unitDirection)
  );
}

function runExample() {
  const example = {
    transmitterPositionAtZero: [0, 0, 0],
    transmitterVelocity: [0.3, 0, 0],
    receiverPosition: [0.8, 0, 0],
    receptionTime: 1,
    sourceTimeBracket: [0, 0.8],
    fieldSpeed: 1,
  };
  const root = solveAffineCausalRoot(example);
  const surface = emitCausalWakeSurface({
    transmitterId: "t",
    emissionTime: root.emissionTime,
    center: root.transmitterPosition,
    polarity: 1,
  });
  const numericalWeight = numericalFixedReceptionCollapse({
    ...example,
    sourceTimeInterval: [0, 0.8],
  });
  const alternativeSpeeds = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
  ].map((direction) =>
    inertiallyTransportedSurfaceVelocity({
      emissionVelocity: example.transmitterVelocity,
      direction,
    }),
  );
  return {
    units: { c_f: 1 },
    update: {
      emissionCenter: surface.center,
      centerVelocityAfterEmission: [0, 0, 0],
      radialSurfaceSpeed: surface.fieldSpeed,
      surfaceMeasureDensityPerEmissionTime:
        surfaceMeasureDensityPerEmissionTime(
          surface,
          root.emissionTime + 1,
        ),
      receptionChangesWakeSurface: false,
    },
    root,
    numericalWeight,
    alternativeSpeeds,
    disposition: {
      canonical:
        "compatible with fixed-speed propagation in the Euclidean void",
      inertiallyTransported:
        "changes absolute surface-element speed and is not the same causal-wake state",
      conservation:
        "not closed by this kinematic transport law",
    },
  };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  process.stdout.write(`${JSON.stringify(runExample(), null, 2)}\n`);
}
