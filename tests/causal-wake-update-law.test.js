import test from "node:test";
import assert from "node:assert/strict";

import {
  advanceCausalWakeSurface,
  canonicalRootReduction,
  causalSurfaceNormal,
  causalSurfacePoint,
  emitCausalWakeSurface,
  finiteDifferenceSurfaceGradient,
  inertiallyTransportedCollapseDenominator,
  inertiallyTransportedSurfaceVelocity,
  numericalFixedReceptionCollapse,
  solveAffineCausalRoot,
  surfaceMeasureDensityPerEmissionTime,
} from "../scripts/equation-mapping/derive-causal-wake-update-law.mjs";

const closeTo = (actual, expected, tolerance = 1e-10) => {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${actual} to be within ${tolerance} of ${expected}`,
  );
};

const vectorCloseTo = (actual, expected, tolerance = 1e-10) => {
  assert.equal(actual.length, expected.length);
  actual.forEach((value, index) =>
    closeTo(value, expected[index], tolerance),
  );
};

test("an emitted wake surface advances without rereading its transmitter", () => {
  const mutableCenter = [1, -2, 0.5];
  const surface = emitCausalWakeSurface({
    transmitterId: "source",
    emissionTime: 2,
    center: mutableCenter,
    polarity: -1,
    fieldSpeed: 1,
  });
  mutableCenter[0] = 100;

  const advanced = advanceCausalWakeSurface(surface, 5.5);
  vectorCloseTo(advanced.center, [1, -2, 0.5]);
  closeTo(advanced.age, 3.5);
  closeTo(advanced.radius, 3.5);

  const point = causalSurfacePoint(surface, 5.5, [0, 3, 0]);
  vectorCloseTo(point, [1, 1.5, 0.5]);

  const densityAtRadiusTwo = surfaceMeasureDensityPerEmissionTime(surface, 4);
  const densityAtRadiusFour = surfaceMeasureDensityPerEmissionTime(surface, 6);
  closeTo(densityAtRadiusFour / densityAtRadiusTwo, 1 / 4);
});

test("the local wake normal is the emission-site-to-receiver direction", () => {
  const surface = emitCausalWakeSurface({
    transmitterId: "source",
    emissionTime: 1,
    center: [0.2, -0.1, 0],
    polarity: 1,
    fieldSpeed: 1,
  });
  const receiverPosition = causalSurfacePoint(surface, 3, [3, 4, 0]);
  const normal = causalSurfaceNormal(surface, 3, receiverPosition);
  const gradient = finiteDifferenceSurfaceGradient({
    surface,
    receptionTime: 3,
    receiverPosition,
  });

  vectorCloseTo(normal, [0.6, 0.8, 0], 1e-12);
  vectorCloseTo(gradient, normal, 2e-10);
});

test("fixed-reception source-time collapse yields c_f over the transmitter denominator", () => {
  const example = {
    transmitterPositionAtZero: [0, 0, 0],
    transmitterVelocity: [0.3, 0, 0],
    receiverPosition: [0.8, 0, 0],
    receptionTime: 1,
    sourceTimeBracket: [0, 0.8],
    fieldSpeed: 1,
  };
  const root = solveAffineCausalRoot(example);
  closeTo(root.emissionTime, 2 / 7, 2e-13);
  closeTo(root.residual, 0, 2e-13);
  closeTo(root.transmitterDenominator, 0.7, 2e-13);
  closeTo(root.accelerationWeight, 10 / 7, 2e-13);

  const numericalWeight = numericalFixedReceptionCollapse({
    ...example,
    sourceTimeInterval: [0, 0.8],
    width: 0.004,
    steps: 120000,
  });
  closeTo(numericalWeight, root.accelerationWeight, 2e-10);
});

test("the canonical reduction depends on transmitter projection along the surface normal", () => {
  const transverse = canonicalRootReduction({
    transmitterPosition: [0, 0, 0],
    transmitterVelocity: [0, 0.4, 0],
    receiverPosition: [2, 0, 0],
  });
  const longitudinal = canonicalRootReduction({
    transmitterPosition: [0, 0, 0],
    transmitterVelocity: [0.4, 0, 0],
    receiverPosition: [2, 0, 0],
  });

  closeTo(transverse.accelerationWeight, 1);
  closeTo(longitudinal.accelerationWeight, 1 / 0.6);
});

test("inertially transported centers violate fixed absolute wake speed", () => {
  const forward = inertiallyTransportedSurfaceVelocity({
    emissionVelocity: [0.3, 0, 0],
    direction: [1, 0, 0],
  });
  const backward = inertiallyTransportedSurfaceVelocity({
    emissionVelocity: [0.3, 0, 0],
    direction: [-1, 0, 0],
  });
  const transverse = inertiallyTransportedSurfaceVelocity({
    emissionVelocity: [0.3, 0, 0],
    direction: [0, 1, 0],
  });

  closeTo(forward.absoluteSpeed, 1.3);
  closeTo(backward.absoluteSpeed, 0.7);
  closeTo(transverse.absoluteSpeed, Math.sqrt(1.09));
  assert.notEqual(forward.speedResidual, 0);
  assert.notEqual(backward.speedResidual, 0);
  assert.notEqual(transverse.speedResidual, 0);
});

test("a coherent moving-center family has an acceleration-dependent collapse denominator", () => {
  closeTo(
    inertiallyTransportedCollapseDenominator({
      emissionAcceleration: [0, 0, 0],
      delay: 2,
      direction: [1, 0, 0],
    }),
    1,
  );
  closeTo(
    inertiallyTransportedCollapseDenominator({
      emissionAcceleration: [0.2, 0, 0],
      delay: 2,
      direction: [1, 0, 0],
    }),
    0.6,
  );
});
