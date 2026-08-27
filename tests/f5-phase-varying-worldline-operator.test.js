import assert from "node:assert/strict";
import test from "node:test";

import {
  PRESCRIBED_WORLDLINE_OPERATOR_KINDS,
  evaluatePrescribedWorldlineOperator,
  prescribedWorldlineSpeedBound,
  validatePrescribedWorldlineOperator,
} from "../src/prescribed-geometry/PrescribedWorldlineOperators.mjs";

const bodyAxes = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
const period = 2 * Math.PI / 0.4;

function add(...vectors) {
  return [0, 1, 2].map((axis) => vectors.reduce((sum, vector) => sum + vector[axis], 0));
}

function subtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function scale(vector, scalar) {
  return vector.map((value) => value * scalar);
}

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function norm(vector) {
  return Math.sqrt(dot(vector, vector));
}

function cross(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function near(actual, expected, tolerance = 2e-12) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} differs from ${expected}`);
}

function vectorNear(actual, expected, tolerance = 2e-12) {
  actual.forEach((value, index) => near(value, expected[index], tolerance));
}

function operatorRow({ axisIndex, ringIndex, polarity, branchSign, amplitude, phase }) {
  return {
    kind: "f5-phase-varying-member.v1",
    epochTime: 0,
    assemblyCenter: [0.02, -0.03, 0.04],
    bodyAxes,
    axisIndex,
    ringIndex,
    polarity,
    branchSign,
    axialHalfSeparation: 0.31,
    transverseRadii: [0.30, 0.22],
    resultantAmplitude: amplitude,
    resultantPhase: phase,
    resultantAngularFrequency: 0.4,
    reconstruction: { operator: "f5-phase-varying-exact-member-map.v1" },
  };
}

function independentPosition(operator, time) {
  const theta = operator.resultantAngularFrequency * (time - operator.epochTime)
    + operator.resultantPhase;
  const [u, v, w] = [theta, theta - 2 * Math.PI / 3, theta + 2 * Math.PI / 3]
    .map((angle) => operator.resultantAmplitude * Math.cos(angle));
  const [n1, n2, n3] = operator.bodyAxes;
  const resultants = [
    add(scale(n2, v), scale(n3, w)),
    subtract(scale(n1, u), scale(n3, w)),
    add(scale(n1, -u), scale(n2, -v)),
  ];
  const axis = operator.bodyAxes[operator.axisIndex];
  const resultant = resultants[operator.axisIndex];
  const kappa = norm(resultant);
  const e = scale(resultant, 1 / kappa);
  const tangent = cross(axis, e);
  const [rho1, rho2] = operator.transverseRadii;
  const cosine = (kappa ** 2 + rho1 ** 2 - rho2 ** 2) / (2 * kappa * rho1);
  const sine = Math.sqrt(1 - cosine ** 2);
  const firstTransverse = scale(
    add(scale(e, cosine), scale(tangent, operator.branchSign * sine)),
    rho1,
  );
  const transverse = operator.ringIndex === 1
    ? firstTransverse
    : subtract(resultant, firstTransverse);
  const axialSign = operator.ringIndex === 1 ? operator.polarity : -operator.polarity;
  return add(
    operator.assemblyCenter,
    scale(axis, axialSign * operator.axialHalfSeparation),
    transverse,
  );
}

test("F5 member operator is registered and matches an independent position construction", () => {
  assert.ok(PRESCRIBED_WORLDLINE_OPERATOR_KINDS.includes("f5-phase-varying-member.v1"));
  const rows = [];
  for (const sector of [
    { polarity: 1, amplitude: 0.24, phase: 0.1, branches: [1, -1, 1] },
    { polarity: -1, amplitude: 0.27, phase: -0.3, branches: [-1, 1, -1] },
  ]) {
    for (let axisIndex = 0; axisIndex < 3; axisIndex += 1) {
      for (const ringIndex of [1, 2]) {
        rows.push(operatorRow({
          axisIndex,
          ringIndex,
          polarity: sector.polarity,
          branchSign: sector.branches[axisIndex],
          amplitude: sector.amplitude,
          phase: sector.phase,
        }));
      }
    }
  }
  assert.equal(rows.length, 12);

  for (const time of [-3.2, 0, 0.37, 4.9, period]) {
    rows.forEach((row) => {
      const state = evaluatePrescribedWorldlineOperator(row, time);
      vectorNear(state.position, independentPosition(row, time));
      const step = 1e-6;
      const finiteDifference = scale(
        subtract(independentPosition(row, time + step), independentPosition(row, time - step)),
        1 / (2 * step),
      );
      vectorNear(state.velocity, finiteDifference, 8e-10);
    });
  }

  rows.forEach((row) => {
    const start = evaluatePrescribedWorldlineOperator(row, 0.29);
    const returned = evaluatePrescribedWorldlineOperator(row, 0.29 + period);
    vectorNear(returned.position, start.position);
    vectorNear(returned.velocity, start.velocity);
  });
});

test("F5 member operator speed bound encloses a dense complete-cycle sample", () => {
  for (const sector of [
    { polarity: 1, amplitude: 0.24, phase: 0.1, branches: [1, -1, 1] },
    { polarity: -1, amplitude: 0.27, phase: -0.3, branches: [-1, 1, -1] },
  ]) {
    for (let axisIndex = 0; axisIndex < 3; axisIndex += 1) {
      for (const ringIndex of [1, 2]) {
        const row = operatorRow({
          axisIndex,
          ringIndex,
          polarity: sector.polarity,
          branchSign: sector.branches[axisIndex],
          amplitude: sector.amplitude,
          phase: sector.phase,
        });
        const bound = prescribedWorldlineSpeedBound(row, 0, period);
        assert.ok(Number.isFinite(bound));
        let maximumSampledSpeed = 0;
        for (let sample = 0; sample <= 4096; sample += 1) {
          maximumSampledSpeed = Math.max(
            maximumSampledSpeed,
            norm(evaluatePrescribedWorldlineOperator(row, period * sample / 4096).velocity),
          );
        }
        assert.ok(bound >= maximumSampledSpeed);
      }
    }
  }
});

test("F5 member operator rejects rows outside the exact regular domain", () => {
  const valid = operatorRow({
    axisIndex: 0,
    ringIndex: 1,
    polarity: 1,
    branchSign: 1,
    amplitude: 0.24,
    phase: 0.1,
  });
  assert.doesNotThrow(() => validatePrescribedWorldlineOperator(valid));
  assert.throws(
    () => validatePrescribedWorldlineOperator({ ...valid, resultantAmplitude: 0.05 }),
    /strictly regular/,
  );
  assert.throws(
    () => validatePrescribedWorldlineOperator({ ...valid, transverseRadii: [0.3, 0.3] }),
    /must remain unequal/,
  );
  assert.throws(
    () => validatePrescribedWorldlineOperator({ ...valid, branchSign: 0 }),
    /branchSign must be -1 or \+1/,
  );
  assert.throws(
    () => validatePrescribedWorldlineOperator({ ...valid, bodyAxes: [[1, 0, 0], [0, 1, 0], [0, 0, -1]] }),
    /right-handed/,
  );
});
