import assert from "node:assert/strict";
import test from "node:test";

import {
  fixedPointCloudPairResidual,
  fixedPointCloudResidualOperator,
  transmitterHistoryCandidateAcceleration,
} from "../scripts/equation-mapping/analyze-fixed-point-cloud-residual.mjs";

const TOLERANCE = 1e-12;

test("planar pair residual is the exact second harmonic", () => {
  const betaF = 0.3;
  for (const psi of [0, 0.31, Math.PI / 4, Math.PI / 2, 1.93]) {
    const residual = fixedPointCloudPairResidual({
      betaF,
      separationDirection: [Math.cos(psi), Math.sin(psi), 0],
      driftDirection: [1, 0, 0],
    });
    const expected = [
      -2 * betaF * Math.cos(2 * psi),
      -2 * betaF * Math.sin(2 * psi),
      0,
    ];
    assertVectorClose(residual, expected, TOLERANCE);
  }
});

test("fixed point-cloud triangle and square controls have planar nulls", () => {
  const triangle = regularPolygonSites(3, [1, 1, 1]);
  const likeSquare = regularPolygonSites(4, [1, 1, 1, 1]);
  const alternatingSquare = regularPolygonSites(4, [1, -1, 1, -1]);
  for (const sites of [triangle, likeSquare, alternatingSquare]) {
    const operator = fixedPointCloudResidualOperator(sites);
    assertVectorClose(matrixVectorProduct(operator, [1, 0, 0]), [0, 0, 0], TOLERANCE);
    assertVectorClose(matrixVectorProduct(operator, [0, 1, 0]), [0, 0, 0], TOLERANCE);
  }
});

test("fixed point-cloud tetrahedron is not in the null space", () => {
  const sites = [
    [1, 1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
  ].map((position) => ({ position, polarity: 1 }));
  const operator = fixedPointCloudResidualOperator(sites);
  const residual = matrixVectorProduct(operator, [1, 0, 0])
    .map((value) => 2 * 0.3 * value);
  assert.ok(Math.abs(residual[0] - 0.15) < TOLERANCE);
  assert.ok(Math.abs(residual[1]) < TOLERANCE);
  assert.ok(Math.abs(residual[2]) < TOLERANCE);
});

test("beta 0.3 benchmark reproduces pair and collinear-three magnitudes", () => {
  const pair = fixedPointCloudPairResidual({
    betaF: 0.3,
    separationDirection: [1, 0, 0],
    driftDirection: [1, 0, 0],
  });
  assert.ok(Math.abs(vectorNorm(pair) - 0.6) < TOLERANCE);

  const collinear = [
    { position: [-1, 0, 0], polarity: 1 },
    { position: [0, 0, 0], polarity: 1 },
    { position: [1, 0, 0], polarity: 1 },
  ];
  const residual = matrixVectorProduct(
    fixedPointCloudResidualOperator(collinear),
    [1, 0, 0],
  ).map((value) => 2 * 0.3 * value);
  assertVectorClose(residual, [-1.35, 0, 0], TOLERANCE);
});

test("transmitter-history candidate cancels a fixed pair and recovers the transverse target", () => {
  const betaF = 0.6;
  const delay = 0.25;
  const velocity = [betaF, 0, 0];
  const instantaneousSeparation = [0, 2, 0];
  const forwardCausalSeparation = [
    instantaneousSeparation[0] + velocity[0] * delay,
    instantaneousSeparation[1],
    0,
  ];
  const reverseCausalSeparation = [
    -instantaneousSeparation[0] + velocity[0] * delay,
    -instantaneousSeparation[1],
    0,
  ];
  const forward = transmitterHistoryCandidateAcceleration({
    causalSeparation: forwardCausalSeparation,
    transmitterVelocity: velocity,
    delay,
  });
  const reverse = transmitterHistoryCandidateAcceleration({
    causalSeparation: reverseCausalSeparation,
    transmitterVelocity: velocity,
    delay,
  });
  assertVectorClose(
    forward,
    [0, Math.sqrt(1 - betaF * betaF) / 4, 0],
    TOLERANCE,
  );
  assertVectorClose(
    forward.map((value, index) => value + reverse[index]),
    [0, 0, 0],
    TOLERANCE,
  );
});

function regularPolygonSites(count, polarities) {
  return Array.from({ length: count }, (_, index) => {
    const angle = 2 * Math.PI * index / count;
    return {
      position: [Math.cos(angle), Math.sin(angle), 0],
      polarity: polarities[index],
    };
  });
}

function matrixVectorProduct(matrix, vector) {
  return matrix.map((row) =>
    row.reduce((sum, value, index) => sum + value * vector[index], 0),
  );
}

function vectorNorm(vector) {
  return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
}

function assertVectorClose(actual, expected, tolerance) {
  assert.equal(actual.length, expected.length);
  actual.forEach((value, index) => {
    assert.ok(
      Math.abs(value - expected[index]) <= tolerance,
      `component ${index}: ${value} != ${expected[index]}`,
    );
  });
}
