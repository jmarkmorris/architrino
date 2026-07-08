import test from "node:test";
import assert from "node:assert/strict";

import {
  createMovingCircularSourceRootRequest,
  solveMovingCircularSourceCausalRoots,
  solveMovingCircularSameSourceCausalRoots,
} from "../src/solver/app/AbsoluteHistoryRootRuntime.mjs";

test("moving circular absolute-history roots use receiver-normal branch weight", () => {
  const request = createMovingCircularSourceRootRequest({
    source: {
      centerAtEpoch: { x: 0, y: 0, z: 0 },
      centerVelocity: { x: 0, y: 0, z: 0 },
      radiusU: { x: 0, y: 0, z: 0 },
      radiusV: { x: 0, y: 0, z: 0 },
      angularVelocity: 0,
      phaseAtEpoch: 0,
      epochTime: 0,
    },
    receiver: {
      startTime: 0,
      positionAtStart: { x: 10, y: 0, z: 0 },
      velocity: { x: -0.5, y: 0, z: 0 },
    },
    hitTime: 10,
    signalSpeed: 1,
    sourceStartTime: 0,
    sourceEndTime: 10,
    scanSubdivisions: 16,
    maxRoots: 1,
  });

  const response = solveMovingCircularSourceCausalRoots(request);
  assert.equal(response.roots.length, 1);
  const [root] = response.roots;
  assert.equal(root.emissionTime, 5);
  assert.equal(root.delay, 5);
  assert.equal(root.distance, 5);
  assert.equal(root.jacobian, 1);
  assert.equal(root.receiverNormalSpeed, -0.5);
  assert.equal(root.receiverNormalNumerator, 1.5);
  assert.equal(root.receiverNormalFactor, 1.5);
  assert.equal(root.unsignedReceiverNormalFactor, 1.5);
  assert.equal(root.branchWeight, 1.5);
  // Signed branch orientation m = D_T/D_s is emitted explicitly (additive).
  assert.equal(root.signedBranchOrientation, 1.5);
});

const VT095_SAME_SOURCE_SOURCE = {
  centerAtEpoch: { x: 0, y: 0, z: 0 },
  centerVelocity: { x: 0, y: 0, z: 0 },
  radiusU: { x: Math.sqrt(2 / 3), y: 0, z: 0 },
  radiusV: { x: 0, y: Math.sqrt(2 / 3), z: 0 },
  phaseAtEpoch: 0,
  epochTime: 0,
};

test("same-source root emits the signed branch orientation; rigid circle stays reflection-locked at m=+1", () => {
  const rho = Math.sqrt(2 / 3);
  const response = solveMovingCircularSameSourceCausalRoots({
    source: { ...VT095_SAME_SOURCE_SOURCE, angularVelocity: 1.00196 / rho, angularAcceleration: 0 },
    hitTime: 0.4304,
    signalSpeed: 1,
    sourceStartTime: 0.4304 - 2,
    sourceEndTime: 0.4304,
    minimumDelay: 0.002,
    scanSubdivisions: 1024,
  });
  assert.ok(response.roots.length >= 1);
  const root = response.roots[response.roots.length - 1];
  assert.equal(root.rootKind, "same-source");
  // Fixed-omega rigid circle: reflection symmetry gives D_T = D_s, m = +1.
  assert.ok(Math.abs(root.signedBranchOrientation - 1) < 1e-6);
  assert.ok(Math.abs(root.distance - 0.17662) < 2e-3);
  // branchWeight remains the unsigned magnitude by contract.
  assert.ok(Math.abs(root.branchWeight - Math.abs(root.signedBranchOrientation)) < 1e-12);
});

test("accelerating same-source history yields an absorptive (m<0) branch orientation past the field-speed hinge", () => {
  const rho = Math.sqrt(2 / 3);
  const tStar = 0.42893;
  const response = solveMovingCircularSameSourceCausalRoots({
    source: {
      ...VT095_SAME_SOURCE_SOURCE,
      angularVelocity: 1 / rho, // tangential speed exactly c_f at epoch
      angularAcceleration: 0.9, // pump-driven tangential acceleration
      epochTime: tStar,
    },
    hitTime: tStar + 0.006,
    signalSpeed: 1,
    sourceStartTime: tStar + 0.006 - 2,
    sourceEndTime: tStar + 0.006,
    minimumDelay: 0.002,
    scanSubdivisions: 2048,
  });
  assert.ok(response.roots.length >= 1);
  const root = response.roots[response.roots.length - 1];
  assert.ok(root.signedBranchOrientation < 0, `expected m<0, got ${root.signedBranchOrientation}`);
  assert.ok(root.receiverNormalNumerator < 0, "D_T < 0 past the hinge");
  assert.ok(root.sourceNormalDenominator > 0, "D_s > 0 past the hinge");
  // The unsigned branchWeight cannot see this sign.
  assert.ok(root.branchWeight > 0);
});

test("zero angular acceleration is exactly backward-compatible with the fixed-omega circle", () => {
  const rho = Math.sqrt(2 / 3);
  const base = {
    source: { ...VT095_SAME_SOURCE_SOURCE, angularVelocity: 1.00196 / rho },
    hitTime: 0.4304,
    signalSpeed: 1,
    sourceStartTime: 0.4304 - 2,
    sourceEndTime: 0.4304,
    minimumDelay: 0.002,
    scanSubdivisions: 512,
  };
  const withoutField = solveMovingCircularSameSourceCausalRoots(base);
  const withZeroAccel = solveMovingCircularSameSourceCausalRoots({
    ...base,
    source: { ...base.source, angularAcceleration: 0 },
  });
  const a = withoutField.roots[withoutField.roots.length - 1];
  const b = withZeroAccel.roots[withZeroAccel.roots.length - 1];
  assert.equal(a.distance, b.distance);
  assert.equal(a.signedBranchOrientation, b.signedBranchOrientation);
  assert.equal(a.receiverNormalNumerator, b.receiverNormalNumerator);
});
