import test from "node:test";
import assert from "node:assert/strict";

import {
  createAnimatorDelayedHitsFromSolverRecords,
  createAnimatorDelayedHitTableRecords,
  getAnimatorDelayedHitDiagnosticLabel,
  getAnimatorDelayedHitRenderState,
} from "../src/apps/animator/AnimatorDelayedHitRuntime.js";
import {
  createAnimatorDelayedHitRecordsFromStreamDescriptors,
} from "../src/apps/animator/display/AnimatorDelayedHitRecords.mjs";

test("animator delayed-hit runtime animates a connector from emission to receiver", () => {
  const hit = {
    id: "h1",
    transmitterId: "e0",
    receiverId: "p0",
    emissionTime: 0,
    hitTime: 2,
    transmitterEmissionPosition: [0, 0, 0],
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

test("animator delayed-hit runtime formats branch and Jacobian records", () => {
  const dataset = {
    delayedHits: [
      {
        id: "h1",
        transmitterId: "e0",
        receiverId: "p0",
        emissionTime: 0,
        hitTime: 1,
        transmitterEmissionPosition: [0, 0, 0],
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

  const rows = createAnimatorDelayedHitTableRecords(dataset, 0.75);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].transmitterId, "e0");
  assert.equal(rows[0].receiverId, "p0");
  assert.equal(rows[0].branchId, "branch_a");
  assert.equal(rows[0].jacobianLabel, "0.875");
  assert.equal(rows[0].strengthLabel, "0.125");
  assert.equal(rows[0].stateLabel, "0.25s to hit");
});

test("animator delayed-hit runtime consumes solver-owned path-history hit records", () => {
  const recordResponse = createAnimatorDelayedHitRecordsFromStreamDescriptors(
    {
      streamId: "fixture-path-history-stream",
      fieldSpeed: 1,
      emissionEvents: [{
        transmitterId: "transmitter_a",
        emissionTime: 0,
        emissionPoint: [0, 0, 0],
        fieldSpeed: 1,
      }],
      receiverPathDescriptors: [{
        receiverId: "receiver_b",
        pathKey: 2,
        streamId: "fixture-path-history-stream",
        recordLayout: "path_segment.v1",
        segments: [
          {
            pathKey: 2,
            segmentIndex: 0,
            startTime: 0,
            endTime: 1,
            start: { x: 2, y: 0, z: 0 },
            velocity: { x: 0, y: 0, z: 0 },
          },
          {
            pathKey: 2,
            segmentIndex: 1,
            startTime: 1,
            endTime: 2,
            start: { x: 2, y: 0, z: 0 },
            velocity: { x: 0, y: 0, z: 0 },
          },
          {
            pathKey: 2,
            segmentIndex: 2,
            startTime: 2,
            endTime: 3,
            start: { x: 2, y: 0, z: 0 },
            velocity: { x: 0, y: 0, z: 0 },
          },
        ],
      }],
    },
    { fieldSpeed: 1 }
  );
  assert.equal(recordResponse.schema, "animator-delayed-hit-records.v1");
  assert.equal(recordResponse.descriptorSchema, "animator-delayed-hit-stream-descriptors.v1");
  assert.equal(recordResponse.recordLayout, "delayed_hit_events.v1");
  assert.equal(recordResponse.receiverRecordLayout, "path_segment.v1");
  assert.equal(recordResponse.streamId, "fixture-path-history-stream");
  assert.equal(recordResponse.records.length, 1);
  assert.equal(recordResponse.records[0].transmitterId, "transmitter_a");
  assert.equal(recordResponse.records[0].receiverId, "receiver_b");
  assert.equal(recordResponse.records[0].hitTime, 2);
  assert.equal(recordResponse.records[0].distance, 2);
  assert.equal(recordResponse.records[0].jacobian, 1);
  assert.equal(recordResponse.records[0].strength, 1);
  assert.equal(recordResponse.records[0].metadata.displayStrength, 0.25);

  const hits = createAnimatorDelayedHitsFromSolverRecords(recordResponse, {
    status: "path-history",
  });

  assert.equal(hits.length, 1);
  assert.equal(hits[0].transmitterId, "transmitter_a");
  assert.equal(hits[0].receiverId, "receiver_b");
  assert.equal(hits[0].hitTime, 2);
  assert.deepEqual(hits[0].transmitterEmissionPosition, [0, 0, 0]);
  assert.deepEqual(hits[0].receiverPosition, [2, 0, 0]);
  assert.equal(hits[0].strength, 0.25);
  assert.equal(hits[0].metadata.source, "solver-owned-stream-descriptor-record");
  assert.equal(hits[0].metadata.recordLayout, "delayed_hit_events.v1");
  assert.equal(hits[0].metadata.descriptorSchema, "animator-delayed-hit-stream-descriptors.v1");
  assert.equal(hits[0].metadata.receiverStreamId, "fixture-path-history-stream");
  assert.equal(hits[0].metadata.receiverRecordLayout, "path_segment.v1");
  assert.equal(hits[0].metadata.solverAccelerationWeight, 1);
  assert.equal(hits[0].status, "path-history");
});

test("animator delayed-hit records keep acceleration independent of receiver velocity", () => {
  const recordResponse = createAnimatorDelayedHitRecordsFromStreamDescriptors(
    {
      streamId: "fixture-moving-receiver-stream",
      fieldSpeed: 1,
      emissionEvents: [{
        transmitterId: "transmitter_a",
        emissionTime: 0,
        emissionPoint: [0, 0, 0],
        fieldSpeed: 1,
      }],
      receiverPathDescriptors: [{
        receiverId: "receiver_b",
        pathKey: 2,
        streamId: "fixture-moving-receiver-stream",
        recordLayout: "path_segment.v1",
        segments: [{
          pathKey: 2,
          segmentIndex: 0,
          startTime: 0,
          endTime: 3,
          start: { x: 2, y: 0, z: 0 },
          velocity: { x: -0.25, y: 0, z: 0 },
        }],
      }],
    },
    { fieldSpeed: 1 }
  );

  assert.equal(recordResponse.records.length, 1);
  const [record] = recordResponse.records;
  assert.ok(Math.abs(record.hitTime - 1.6) < 0.002);
  assert.equal(record.jacobian, 1);
  assert.equal(record.receiverCrossingRatio, 1.25);
  assert.equal(record.rootPlayback, 1.25);
  assert.equal(record.accelerationWeight, 1);
  assert.equal(record.strength, 1);
});
