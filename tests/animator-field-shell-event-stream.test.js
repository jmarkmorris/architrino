import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  createAnimatorDelayedHitRowsFromStreamDescriptors,
} from "../src/solver/app/AnimatorDelayedHitRows.mjs";
import {
  createSolverAppBridgeClient,
} from "../src/solver/app/SolverAppBridge.mjs";
import {
  ANIMATOR_FIELD_SHELL_EMITTER_SOURCE_HISTORY_SCHEMA,
  ANIMATOR_FIELD_SHELL_EVENT_MANIFEST_SCHEMA,
  ANIMATOR_FIELD_SHELL_EVENT_NATIVE_FILE_MANIFEST_SCHEMA,
  ANIMATOR_FIELD_SHELL_EVENT_ROW_LAYOUT,
  ANIMATOR_FIELD_SHELL_EVENT_ROW_SIZE_BYTES,
  ANIMATOR_FIELD_SHELL_EVENT_STORE_SCHEMA,
  ANIMATOR_FIELD_SHELL_EVENT_STREAM_PACKAGE_SCHEMA,
  createAnimatorFieldShellCadenceTimes,
  createAnimatorFieldShellEmitterSourceHistory,
  createAnimatorFieldShellEventNativeFileStoragePolicy,
  createAnimatorFieldShellEventStreamPackage,
} from "../src/solver/app/AnimatorFieldShellEventStream.mjs";

test("animator field-shell cadence times are solver-owned", () => {
  assert.deepEqual(
    createAnimatorFieldShellCadenceTimes({
      timeWindow: { start: 0, end: 0.5 },
      intervalSeconds: 0.25,
    }),
    [0, 0.25, 0.5]
  );
});

test("animator field-shell events package stream metadata and render shell rows", () => {
  const fieldShellPackage = createAnimatorFieldShellEventStreamPackage({
    streamId: "fixture-field-shell-events",
    timeWindow: { start: 0, end: 0.25 },
    cadence: { intervalSeconds: 0.25 },
    fieldSpeed: 2,
    lifetimeSeconds: 1.5,
    emitterSamples: [
      {
        emitterId: "source_a",
        time: 0,
        sampleIndex: 0,
        position: [0, 0, 0],
        sign: 1,
        metadata: { ownerAssemblyId: "assembly_a" },
      },
      {
        emitterId: "source_a",
        time: 0.25,
        sampleIndex: 1,
        position: [0.5, 0, 0],
        sign: 1,
      },
    ],
    metadata: {
      precisionPath: "event_root_focused",
      claimLevel: "interactive-preview",
    },
  });

  assert.equal(fieldShellPackage.schema, ANIMATOR_FIELD_SHELL_EVENT_STREAM_PACKAGE_SCHEMA);
  assert.equal(fieldShellPackage.rowLayout, ANIMATOR_FIELD_SHELL_EVENT_ROW_LAYOUT);
  assert.equal(fieldShellPackage.rowCount, 2);
  assert.equal(fieldShellPackage.stream.streamId, "fixture-field-shell-events");
  assert.equal(fieldShellPackage.stream.manifestVersion, "solver-stream-manifest.v1");
  assert.equal(fieldShellPackage.stream.indexLayout, "stream_index.v1");
  assert.equal(fieldShellPackage.stream.availableRanges.length, 1);
  assert.equal(fieldShellPackage.stream.availableRanges[0].timeRange.end, 0.25);
  assert.equal(fieldShellPackage.stream.storagePolicy.target, "caller-buffer");
  assert.equal(fieldShellPackage.stream.metadata.valueAuthority, "authoritative");
  assert.equal(fieldShellPackage.stream.metadata.appBufferAuthority, "display-only");
  assert.equal(fieldShellPackage.manifest.schema, ANIMATOR_FIELD_SHELL_EVENT_MANIFEST_SCHEMA);
  assert.equal(fieldShellPackage.manifest.summary.eventCount, 2);
  assert.equal(fieldShellPackage.eventStore.schema, ANIMATOR_FIELD_SHELL_EVENT_STORE_SCHEMA);
  assert.equal(fieldShellPackage.eventStore.eventClass, "field_shell_emitted");
  assert.equal(fieldShellPackage.buffer.layout, ANIMATOR_FIELD_SHELL_EVENT_ROW_LAYOUT);
  assert.equal(fieldShellPackage.buffer.rowCount, 2);

  assert.equal(fieldShellPackage.rows[0].metadata.source, "solver-owned-field-shell-event-row");
  assert.equal(fieldShellPackage.rows[0].metadata.ownerAssemblyId, "assembly_a");
  assert.equal(fieldShellPackage.fieldShells[0].emitterId, "source_a");
  assert.equal(fieldShellPackage.fieldShells[0].displayTime, 1.5);
  assert.equal(fieldShellPackage.fieldShells[0].radius, 3);
  assert.deepEqual(fieldShellPackage.fieldShells[1].emissionPosition, [0.5, 0, 0]);
  assert.equal(
    fieldShellPackage.fieldShells[0].metadata.source,
    "solver-owned-field-shell-event-stream"
  );
  assert.equal(fieldShellPackage.emissionEvents[0].emissionTime, 0);
  assert.deepEqual(fieldShellPackage.emissionEvents[1].emissionPoint, [0.5, 0, 0]);
});

test("animator field-shell event package derives emitter source history", () => {
  const documentData = {
    scene: { time: { start: 0, end: 1 } },
    paths: [],
    assemblies: [
      {
        id: "assembly_a",
        transform: { position: [1, 2, 3] },
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
  const sourceHistory = createAnimatorFieldShellEmitterSourceHistory({
    documentData,
    sampleTimes: [0],
    fieldSpeed: 2,
    sampleIntervalSeconds: 0.25,
  });
  assert.equal(sourceHistory.schema, ANIMATOR_FIELD_SHELL_EMITTER_SOURCE_HISTORY_SCHEMA);
  assert.equal(sourceHistory.sampleCount, 2);
  assert.deepEqual(sourceHistory.samples[0].position, [1, 2, 4]);
  assert.ok(Math.abs(sourceHistory.samples[1].position[0] - 1) < 1e-12);
  assert.equal(sourceHistory.samples[1].position[1], 2);
  assert.equal(sourceHistory.samples[1].position[2], 2);
  assert.equal(
    sourceHistory.samples[0].metadata.sourceHistorySchema,
    ANIMATOR_FIELD_SHELL_EMITTER_SOURCE_HISTORY_SCHEMA
  );

  const fieldShellPackage = createAnimatorFieldShellEventStreamPackage({
    streamId: "fixture-source-history-field-shell-events",
    timeWindow: { start: 0, end: 0 },
    cadence: { intervalSeconds: 0.25 },
    fieldSpeed: 2,
    lifetimeSeconds: 1.5,
    emitterSourceHistory: {
      documentData,
      sampleTimes: [0],
      fieldSpeed: 2,
      sampleIntervalSeconds: 0.25,
    },
  });
  assert.equal(
    fieldShellPackage.emitterSourceHistory.schema,
    ANIMATOR_FIELD_SHELL_EMITTER_SOURCE_HISTORY_SCHEMA
  );
  assert.equal(fieldShellPackage.rowCount, 2);
  assert.deepEqual(fieldShellPackage.emissionEvents[0].emissionPoint, [1, 2, 4]);
  assert.ok(Math.abs(fieldShellPackage.emissionEvents[1].emissionPoint[0] - 1) < 1e-12);
  assert.equal(fieldShellPackage.emissionEvents[1].emissionPoint[1], 2);
  assert.equal(fieldShellPackage.emissionEvents[1].emissionPoint[2], 2);
  assert.equal(fieldShellPackage.rows[0].metadata.ownerAssemblyId, "assembly_a");
});

test("animator field-shell event package writes native-file stream storage", async () => {
  const basePath = path.resolve(".tmp/animator-field-shell-event-stream-test");
  fs.rmSync(basePath, { recursive: true, force: true });

  const fieldShellPackage = createAnimatorFieldShellEventStreamPackage({
    streamId: "fixture-native-field-shell-events",
    timeWindow: { start: 0, end: 0.25 },
    cadence: { intervalSeconds: 0.25 },
    fieldSpeed: 2,
    lifetimeSeconds: 1.5,
    rowsPerChunk: 1,
    storagePolicy: createAnimatorFieldShellEventNativeFileStoragePolicy({ basePath }),
    emitterSamples: [
      {
        emitterId: "source_a",
        time: 0,
        sampleIndex: 0,
        position: [0, 0, 0],
        sign: 1,
      },
      {
        emitterId: "source_a",
        time: 0.25,
        sampleIndex: 1,
        position: [0.5, 0, 0],
        sign: -1,
      },
    ],
  });

  assert.equal(fieldShellPackage.stream.storagePolicy.target, "native-file");
  assert.equal(fieldShellPackage.stream.storagePolicy.durable, true);
  assert.equal(fieldShellPackage.stream.availableRanges.length, 2);
  assert.equal(fieldShellPackage.manifest.summary.storageTarget, "native-file");
  assert.equal(
    fieldShellPackage.nativeFileManifest.schema,
    ANIMATOR_FIELD_SHELL_EVENT_NATIVE_FILE_MANIFEST_SCHEMA
  );
  assert.equal(
    fieldShellPackage.nativeFileManifest.fieldShellEventManifest.schema,
    ANIMATOR_FIELD_SHELL_EVENT_MANIFEST_SCHEMA
  );
  assert.equal(fieldShellPackage.buffers.length, 2);
  assert.equal(fieldShellPackage.buffers[0].layout, ANIMATOR_FIELD_SHELL_EVENT_ROW_LAYOUT);
  assert.equal(fieldShellPackage.buffers[0].byteLength, ANIMATOR_FIELD_SHELL_EVENT_ROW_SIZE_BYTES);
  assert.equal(fieldShellPackage.index.sidecar.rowCount, 2);
  assert.equal(fieldShellPackage.index.sidecar.byteLength, 128);
  assert.ok(fs.existsSync(fieldShellPackage.stream.storagePolicy.manifestPath));
  assert.ok(fs.existsSync(fieldShellPackage.buffers[0].filePath));
  assert.ok(fs.existsSync(fieldShellPackage.index.sidecar.filePath));

  const bridge = createSolverAppBridgeClient();
  const opened = await bridge.openStream({
    manifestPath: fieldShellPackage.stream.storagePolicy.manifestPath,
    purpose: "validation",
  });
  assert.deepEqual(opened.readableLayouts, [ANIMATOR_FIELD_SHELL_EVENT_ROW_LAYOUT]);
  assert.equal(opened.availableRanges.length, 2);

  const readback = await bridge.readStreamRange({
    manifestPath: fieldShellPackage.stream.storagePolicy.manifestPath,
  });
  assert.equal(readback.status.code, "ok");
  assert.equal(readback.buffers.length, 2);
  assert.equal(readback.buffers[0].layout, ANIMATOR_FIELD_SHELL_EVENT_ROW_LAYOUT);
  assert.equal(readback.buffers[0].rowCount, 1);
  assert.equal(readback.buffers[0].byteLength, ANIMATOR_FIELD_SHELL_EVENT_ROW_SIZE_BYTES);

  const rowView = new DataView(readback.buffers[1].buffer);
  assert.equal(Number(rowView.getBigUint64(0, true)), 1);
  assert.equal(rowView.getFloat64(8, true), 0.25);
  assert.equal(rowView.getInt32(20, true), -1);
  assert.equal(rowView.getFloat64(24, true), 0.5);
  assert.equal(rowView.getFloat64(56, true), 3);
});

test("animator field-shell event package feeds delayed-hit stream descriptors", () => {
  const fieldShellPackage = createAnimatorFieldShellEventStreamPackage({
    streamId: "fixture-field-shell-events",
    timeWindow: { start: 0, end: 0 },
    cadence: { intervalSeconds: 0.25 },
    fieldSpeed: 1,
    emitterSamples: [{
      emitterId: "source_a",
      time: 0,
      sampleIndex: 0,
      position: [0, 0, 0],
      sign: 1,
    }],
  });
  const rowResponse = createAnimatorDelayedHitRowsFromStreamDescriptors({
    streamId: "fixture-path-history-stream",
    fieldSpeed: 1,
    emissionEvents: fieldShellPackage.emissionEvents,
    receiverPathDescriptors: [{
      receiverId: "receiver_b",
      pathKey: 2,
      streamId: "fixture-path-history-stream",
      rowLayout: "path_segment.v1",
      segments: [{
        pathKey: 2,
        segmentIndex: 0,
        startTime: 0,
        endTime: 3,
        start: { x: 2, y: 0, z: 0 },
        velocity: { x: 0, y: 0, z: 0 },
      }],
    }],
  });

  assert.equal(rowResponse.rows.length, 1);
  assert.ok(Math.abs(rowResponse.rows[0].hitTime - 2) < 0.002);
  assert.equal(
    rowResponse.rows[0].metadata.emissionMetadata.fieldShellEventStreamId,
    "fixture-field-shell-events"
  );
  assert.equal(
    rowResponse.rows[0].metadata.emissionMetadata.rowLayout,
    ANIMATOR_FIELD_SHELL_EVENT_ROW_LAYOUT
  );
});
