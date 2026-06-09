import test from "node:test";
import assert from "node:assert/strict";

import {
  createAnimatorDelayedHitsFromPathSamples,
  createAnimatorDelayedHitTableRows,
  getAnimatorDelayedHitDiagnosticLabel,
  getAnimatorDelayedHitRenderState,
} from "../src/apps/animator/AnimatorDelayedHitRuntime.js";

test("animator delayed-hit runtime animates a connector from emission to receiver", () => {
  const hit = {
    id: "h1",
    emitterId: "e0",
    receiverId: "p0",
    emissionTime: 0,
    hitTime: 2,
    emitterEmissionPosition: [0, 0, 0],
    receiverPosition: [10, 0, 0],
    strength: 0.2,
    branchId: "branch_a",
    jacobian: 0.75,
  };

  const midState = getAnimatorDelayedHitRenderState(hit, 1);
  assert.equal(midState.visible, true);
  assert.equal(midState.active, false);
  assert.equal(midState.travelProgress, 0.5);
  assert.deepEqual(midState.connectorEndPosition, [5, 0, 0]);

  const hitState = getAnimatorDelayedHitRenderState(hit, 2);
  assert.equal(hitState.active, true);
  assert.deepEqual(hitState.connectorEndPosition, [10, 0, 0]);
  assert.ok(hitState.receiverOpacity > midState.receiverOpacity);

  const lateState = getAnimatorDelayedHitRenderState(hit, 3.5);
  assert.equal(lateState.visible, false);
});

test("animator delayed-hit runtime formats branch and Jacobian table rows", () => {
  const dataset = {
    delayedHits: [
      {
        id: "h1",
        emitterId: "e0",
        receiverId: "p0",
        emissionTime: 0,
        hitTime: 1,
        emitterEmissionPosition: [0, 0, 0],
        receiverPosition: [1, 0, 0],
        strength: 0.125,
        branchId: "branch_a",
        jacobian: 0.875,
        status: "causal-root",
      },
    ],
  };

  assert.equal(
    getAnimatorDelayedHitDiagnosticLabel(dataset.delayedHits[0]),
    "branch_a J=0.875"
  );

  const rows = createAnimatorDelayedHitTableRows(dataset, 0.75);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].emitterId, "e0");
  assert.equal(rows[0].receiverId, "p0");
  assert.equal(rows[0].branchId, "branch_a");
  assert.equal(rows[0].jacobianLabel, "0.875");
  assert.equal(rows[0].strengthLabel, "0.125");
  assert.equal(rows[0].stateLabel, "0.25s to hit");
});

test("animator delayed-hit runtime derives path-history hits from expanding shell samples", () => {
  const hits = createAnimatorDelayedHitsFromPathSamples(
    [
      {
        emitterId: "source_a",
        time: 0,
        position: [0, 0, 0],
        fieldSpeed: 1,
      },
    ],
    [
      {
        receiverId: "receiver_b",
        samples: [
          { time: 0, position: [2, 0, 0] },
          { time: 1, position: [2, 0, 0] },
          { time: 2, position: [2, 0, 0] },
          { time: 3, position: [2, 0, 0] },
        ],
      },
    ],
    { fieldSpeed: 1 }
  );

  assert.equal(hits.length, 1);
  assert.equal(hits[0].emitterId, "source_a");
  assert.equal(hits[0].receiverId, "receiver_b");
  assert.equal(hits[0].hitTime, 2);
  assert.deepEqual(hits[0].emitterEmissionPosition, [0, 0, 0]);
  assert.deepEqual(hits[0].receiverPosition, [2, 0, 0]);
  assert.equal(hits[0].status, "path-history");
});
