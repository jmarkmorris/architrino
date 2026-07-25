import test from "node:test";
import assert from "node:assert/strict";

import {
  createMovingCircularTransmitterRootRequest,
  solveMovingCircularTransmitterCausalRoots,
  solveMovingCircularSameTransmitterCausalRoots,
} from "../src/prescribed-path-analysis/index.mjs";

test("moving circular absolute-history roots use transmitter-side acceleration", () => {
  const request = createMovingCircularTransmitterRootRequest({
    transmitter: {
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
    transmitterStartTime: 0,
    transmitterEndTime: 10,
    scanSubdivisions: 16,
    maxRoots: 1,
  });

  const response = solveMovingCircularTransmitterCausalRoots(request);
  assert.equal(response.evidenceGrade, "display-only-visualization");
  assert.equal(response.nonEvidence, true);
  assert.equal(response.dynamicalEvidence, false);
  assert.equal(response.retainedBranchEvidence, false);
  assert.equal(response.roots.length, 1);
  const [root] = response.roots;
  assert.equal(root.evidenceGrade, "display-only-visualization");
  assert.equal(root.nonEvidence, true);
  assert.equal(root.emissionTime, 5);
  assert.equal(root.delay, 5);
  assert.equal(root.distance, 5);
  assert.equal(root.jacobian, 1);
  assert.equal(root.receiverRadialSpeedAtReception, -0.5);
  assert.equal(root.receiverFactor, 1.5);
  assert.equal(root.rootPlayback, 1.5);
  assert.equal(root.accelerationWeight, 1);
});

const VT095_SAME_TRANSMITTER_TRANSMITTER = {
  centerAtEpoch: { x: 0, y: 0, z: 0 },
  centerVelocity: { x: 0, y: 0, z: 0 },
  radiusU: { x: Math.sqrt(2 / 3), y: 0, z: 0 },
  radiusV: { x: 0, y: Math.sqrt(2 / 3), z: 0 },
  phaseAtEpoch: 0,
  epochTime: 0,
};

test("same-transmitter root emits signed root playback; fixed-frequency circle stays reflection-locked at m=+1", () => {
  const rho = Math.sqrt(2 / 3);
  const response = solveMovingCircularSameTransmitterCausalRoots({
    transmitter: { ...VT095_SAME_TRANSMITTER_TRANSMITTER, angularVelocity: 1.00196 / rho, angularAcceleration: 0 },
    hitTime: 0.4304,
    signalSpeed: 1,
    transmitterStartTime: 0.4304 - 2,
    transmitterEndTime: 0.4304,
    minimumDelay: 0.002,
    scanSubdivisions: 1024,
  });
  assert.ok(response.roots.length >= 1);
  const root = response.roots[response.roots.length - 1];
  assert.equal(root.rootKind, "same-transmitter");
  // Fixed-frequency circular path: reflection symmetry gives D_r = D_t, m = +1.
  assert.ok(Math.abs(root.rootPlayback - 1) < 1e-6);
  assert.ok(Math.abs(root.distance - 0.17662) < 2e-3);
  assert.ok(Math.abs(root.accelerationWeight - 1 / Math.abs(root.transmitterFactor)) < 1e-12);
});

test("accelerating same-transmitter history yields negative root playback past the field-speed hinge", () => {
  const rho = Math.sqrt(2 / 3);
  const tStar = 0.42893;
  const response = solveMovingCircularSameTransmitterCausalRoots({
    transmitter: {
      ...VT095_SAME_TRANSMITTER_TRANSMITTER,
      angularVelocity: 1 / rho, // tangential speed exactly c_f at epoch
      angularAcceleration: 0.9, // pump-driven tangential acceleration
      epochTime: tStar,
    },
    hitTime: tStar + 0.006,
    signalSpeed: 1,
    transmitterStartTime: tStar + 0.006 - 2,
    transmitterEndTime: tStar + 0.006,
    minimumDelay: 0.002,
    scanSubdivisions: 2048,
  });
  assert.ok(response.roots.length >= 1);
  const root = response.roots[response.roots.length - 1];
  assert.ok(root.rootPlayback < 0, `expected m<0, got ${root.rootPlayback}`);
  assert.ok(root.receiverFactor < 0, "D_r < 0 past the hinge");
  assert.ok(root.transmitterFactor > 0, "D_t > 0 past the hinge");
  // The unsigned accelerationWeight cannot see this sign.
  assert.ok(root.accelerationWeight > 0);
});

test("zero angular acceleration is exactly backward-compatible with the fixed-omega circle", () => {
  const rho = Math.sqrt(2 / 3);
  const base = {
    transmitter: { ...VT095_SAME_TRANSMITTER_TRANSMITTER, angularVelocity: 1.00196 / rho },
    hitTime: 0.4304,
    signalSpeed: 1,
    transmitterStartTime: 0.4304 - 2,
    transmitterEndTime: 0.4304,
    minimumDelay: 0.002,
    scanSubdivisions: 512,
  };
  const withoutField = solveMovingCircularSameTransmitterCausalRoots(base);
  const withZeroAccel = solveMovingCircularSameTransmitterCausalRoots({
    ...base,
    transmitter: { ...base.transmitter, angularAcceleration: 0 },
  });
  const a = withoutField.roots[withoutField.roots.length - 1];
  const b = withZeroAccel.roots[withZeroAccel.roots.length - 1];
  assert.equal(a.distance, b.distance);
  assert.equal(a.rootPlayback, b.rootPlayback);
  assert.equal(a.receiverFactor, b.receiverFactor);
});
