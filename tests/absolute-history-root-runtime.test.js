import test from "node:test";
import assert from "node:assert/strict";

import {
  createMovingCircularSourceRootRequest,
  solveMovingCircularSourceCausalRoots,
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
});
