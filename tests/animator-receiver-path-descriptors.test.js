import test from "node:test";
import assert from "node:assert/strict";

import {
  ANIMATOR_DELAYED_HIT_STREAM_DESCRIPTOR_SCHEMA,
  createAnimatorDelayedHitRecordsFromStreamDescriptors,
} from "../src/apps/animator/display/AnimatorDelayedHitRecords.mjs";
import {
  ANIMATOR_FIELD_SHELL_TRANSMITTER_HISTORY_SCHEMA,
} from "../src/apps/animator/display/AnimatorFieldShellEventStream.mjs";
import {
  ANIMATOR_RECEIVER_PATH_DESCRIPTOR_PACKAGE_SCHEMA,
  createAnimatorReceiverPathDescriptorPackage,
} from "../src/apps/animator/display/AnimatorReceiverPathDescriptors.mjs";

function createStaticReceiverDocument() {
  return {
    scene: { time: { start: 0, end: 3 } },
    paths: [],
    assemblies: [
      {
        id: "assembly_a",
        transform: { position: [2, 0, -1] },
        members: ["positrino_1", "electrino_1"],
        core: {
          binaries: [
            {
              id: "binary_a",
              motion: {
                type: "orbit.circular",
                radius: 1,
                frequencyHz: 0,
              },
            },
          ],
        },
      },
    ],
  };
}

test("animator receiver path descriptors derive path segments from transmitter history", () => {
  const packageResult = createAnimatorReceiverPathDescriptorPackage({
    streamId: "fixture-receiver-path-history",
    documentData: createStaticReceiverDocument(),
    sampleTimes: [0, 3],
    fieldSpeed: 1,
    sampleIntervalSeconds: 3,
  });

  assert.equal(packageResult.schema, ANIMATOR_RECEIVER_PATH_DESCRIPTOR_PACKAGE_SCHEMA);
  assert.equal(packageResult.transmitterHistorySchema, ANIMATOR_FIELD_SHELL_TRANSMITTER_HISTORY_SCHEMA);
  assert.equal(packageResult.recordLayout, "path_segment.v1");
  assert.equal(packageResult.descriptorCount, 2);
  assert.equal(packageResult.segmentCount, 2);

  const positrinoDescriptor = packageResult.receiverPathDescriptors.find(
    (receiverDescriptor) => receiverDescriptor.receiverId === "assembly_a_positrino_1"
  );
  assert.ok(positrinoDescriptor);
  assert.equal(positrinoDescriptor.recordLayout, "path_segment.v1");
  assert.equal(positrinoDescriptor.streamId, "fixture-receiver-path-history");
  assert.equal(positrinoDescriptor.metadata.source, "solver-owned-receiver-path-descriptor");
  assert.equal(positrinoDescriptor.metadata.ownerAssemblyId, "assembly_a");
  assert.equal(positrinoDescriptor.segments.length, 1);
  assert.equal(positrinoDescriptor.segments[0].startTime, 0);
  assert.equal(positrinoDescriptor.segments[0].endTime, 3);
  assert.deepEqual(positrinoDescriptor.segments[0].start, { x: 2, y: 0, z: 0 });
  assert.deepEqual(positrinoDescriptor.segments[0].velocity, { x: 0, y: 0, z: 0 });
});

test("animator delayed-hit records consume solver-owned receiver descriptors", () => {
  const receiverDescriptorPackage = createAnimatorReceiverPathDescriptorPackage({
    streamId: "fixture-receiver-path-history",
    documentData: createStaticReceiverDocument(),
    sampleTimes: [0, 3],
    fieldSpeed: 1,
    sampleIntervalSeconds: 3,
  });
  const recordResponse = createAnimatorDelayedHitRecordsFromStreamDescriptors({
    schema: ANIMATOR_DELAYED_HIT_STREAM_DESCRIPTOR_SCHEMA,
    streamId: receiverDescriptorPackage.streamId,
    fieldSpeed: 1,
    emissionEvents: [{
      transmitterId: "transmitter_a",
      emissionTime: 0,
      emissionPoint: [0, 0, 0],
      fieldSpeed: 1,
    }],
    receiverPathDescriptors: receiverDescriptorPackage.receiverPathDescriptors,
  });

  assert.equal(recordResponse.receiverPathDescriptorCount, 2);
  assert.equal(recordResponse.receiverSegmentCount, 2);
  assert.equal(recordResponse.records.length, 2);
  const positrinoHit = recordResponse.records.find(
    (record) => record.receiverId === "assembly_a_positrino_1"
  );
  assert.ok(positrinoHit);
  assert.ok(Math.abs(positrinoHit.hitTime - 2) < 0.002);
  assert.equal(
    positrinoHit.metadata.receiverMetadata.source,
    "solver-owned-receiver-path-descriptor"
  );
});
