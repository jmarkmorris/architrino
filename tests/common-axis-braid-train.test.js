import test from "node:test";
import assert from "node:assert/strict";

import {
  ALL_RETAINED_SIMPLE_ROOTS_POLICY,
  COMMON_AXIS_BRAID_TRAIN_SPEC_SCHEMA,
  PRESCRIBED_RECORD_ANALYSIS_PROTOCOL_SCHEMA,
  createCommonAxisBraidExactSourceRecord,
  createCommonAxisBraidPilotInventory,
  createCommonAxisBraidTrainSpec,
  evaluateExactPrescribedSourceState,
  evaluatePrescribedRecordAnalysis,
  reduceCompleteCycleEndpointPacket,
  sha256Canonical,
} from "../src/prescribed-path-analysis/index.mjs";

function endpointProtocol(sourceRecord, observationTimes) {
  return {
    schema: PRESCRIBED_RECORD_ANALYSIS_PROTOCOL_SCHEMA,
    protocolId: "common-axis-braid-independent-endpoint-test-v2",
    fieldSpeed: 1,
    coupling: 1,
    history: { start: 0, end: 8, minimumDelay: 1e-12 },
    returnWindow: { start: 4, period: 4 },
    rootPolicy: {
      id: ALL_RETAINED_SIMPLE_ROOTS_POLICY,
      tolerance: 1e-12,
      maxIterations: 128,
    },
    tolerances: {
      cancellationFloor: 1e-30,
      rootTransversalityFloor: 1e-8,
      minimumSeparationFloor: 0.02,
      convergenceAbsolute: 1e-8,
    },
    geometry: { minimumSeparationSamples: 96 },
    convergence: {
      rootTolerance: 1e-14,
      maxIterations: 192,
      minimumSeparationSamples: 192,
    },
    probes: sourceRecord.sources.map((source) => ({
      id: `endpoint-${source.id}`,
      kind: "prescribed-source-endpoint-probe.v1",
      transmitterId: source.id,
      selfHitPolicy: "exclude-same-transmitter-id.v1",
      observationTimes,
      polarities: [source.charge],
    })),
  };
}

function vectorDistance(left, right) {
  return Math.hypot(left.x - right.x, left.y - right.y, left.z - right.z);
}

test("common-axis braid pilot preserves architrino-worldline order and distinct maps", () => {
  const rows = createCommonAxisBraidPilotInventory({
    includeNeighborhoodSamples: false,
  });
  assert.equal(rows.length, 6);
  assert.deepEqual(rows.map((row) => row.sourceRecord.sources.length), [6, 12, 18, 12, 12, 18]);

  const accessory = rows.find(
    (row) => row.spec.specId === "family-c-c2-central-six-accessory",
  );
  assert.equal(accessory.spec.schema, COMMON_AXIS_BRAID_TRAIN_SPEC_SCHEMA);
  assert.deepEqual(
    accessory.spec.architrinoWorldlines.map((row) => row.index),
    Array.from({ length: 12 }, (_, index) => index + 1),
  );
  assert.ok(accessory.spec.spacingVector.every((value) => value > 0));
  assert.equal(accessory.spec.additionalWorldlines.length, 6);
  assert.deepEqual(
    accessory.spec.additionalWorldlineSlots.map((row) => row.worldlineIndices),
    [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12]],
  );
  for (const [sourceId, counterpartId] of Object.entries(
    accessory.spec.binaryCounterpartMap,
  )) {
    assert.notEqual(sourceId, counterpartId);
    assert.equal(accessory.spec.binaryCounterpartMap[counterpartId], sourceId);
  }

  const crossed = rows.find(
    (row) => row.spec.specId === "family-c-c2-crossed-pairing-six-accessory",
  );
  assert.notDeepEqual(
    crossed.spec.binaryCounterpartMap,
    accessory.spec.binaryCounterpartMap,
  );
  assert.deepEqual(
    crossed.spec.additionalWorldlineSlots,
    accessory.spec.additionalWorldlineSlots,
  );
});

test("twelve-worldline circulation relations route to general C1 and C2", () => {
  const shared = {
    geometryClass: "twelve-architrino",
    radii: Array(12).fill(0.24),
    spacings: Array(11).fill(0.12),
  };
  const coRotating = createCommonAxisBraidTrainSpec({
    ...shared,
    specId: "test-family-c-c1",
    label: "test C1 co-rotating",
    circulationStratum: "co-rotating",
  });
  const counterRotating = createCommonAxisBraidTrainSpec({
    ...shared,
    specId: "test-family-c-c2",
    label: "test C2 counter-rotating",
    circulationStratum: "counter-rotating",
  });
  assert.equal(
    createCommonAxisBraidExactSourceRecord(coRotating).taxonomy.memberId,
    "C1",
  );
  assert.equal(
    createCommonAxisBraidExactSourceRecord(counterRotating).taxonomy.memberId,
    "C2",
  );
});

test("every pilot path returns exactly after the declared period while the group translates", () => {
  const rows = createCommonAxisBraidPilotInventory({
    includeNeighborhoodSamples: false,
  });
  for (const { spec, sourceRecord } of rows) {
    const translation = {
      x: spec.groupTranslationSpeed * spec.prescribedReturnPeriod,
      y: 0,
      z: 0,
    };
    for (const source of sourceRecord.sources) {
      const start = evaluateExactPrescribedSourceState(source, 4);
      const end = evaluateExactPrescribedSourceState(
        source,
        4 + spec.prescribedReturnPeriod,
      );
      assert.ok(vectorDistance(end.position, {
        x: start.position.x + translation.x,
        y: start.position.y + translation.y,
        z: start.position.z + translation.z,
      }) <= 2e-12);
      assert.ok(vectorDistance(end.velocity, start.velocity) <= 2e-12);
    }
  }
});

test("endpoint evaluation retains one independently checkable causal root per other source", () => {
  const [single] = createCommonAxisBraidPilotInventory({
    includeNeighborhoodSamples: false,
  });
  const protocol = endpointProtocol(single.sourceRecord, [4]);
  const packet = evaluatePrescribedRecordAnalysis({
    sourceRecord: single.sourceRecord,
    protocol,
  });
  assert.equal(packet.rawLedgers.causalRoots.length, 6);
  for (const event of packet.rawLedgers.causalRoots) {
    assert.equal(event.roots.length, 5);
    assert.equal(event.noRootTransmitters.length, 0);
    const receiver = single.sourceRecord.sources.find(
      (source) => source.id === event.receiverSourceId,
    );
    const receiverState = evaluateExactPrescribedSourceState(receiver, event.observationTime);
    for (const root of event.roots) {
      const transmitter = single.sourceRecord.sources.find(
        (source) => source.id === root.transmitterId,
      );
      const transmitterState = evaluateExactPrescribedSourceState(
        transmitter,
        root.emissionTime,
      );
      const distance = vectorDistance(receiverState.position, transmitterState.position);
      const delay = event.observationTime - root.emissionTime;
      assert.ok(Math.abs(distance - delay) <= 2e-11);
      assert.ok(root.rootTransversalityMargin > 0);
    }
  }
});

test("complete-cycle residual projections are deterministic and ledger-backed", () => {
  const [single] = createCommonAxisBraidPilotInventory({
    includeNeighborhoodSamples: false,
  });
  const times = Array.from({ length: 8 }, (_, index) => 4 + index / 2);
  const protocol = endpointProtocol(single.sourceRecord, times);
  const first = evaluatePrescribedRecordAnalysis({
    sourceRecord: single.sourceRecord,
    protocol,
  });
  const second = evaluatePrescribedRecordAnalysis({
    sourceRecord: single.sourceRecord,
    protocol,
  });
  assert.equal(first.resultHash, second.resultHash);
  assert.equal(sha256Canonical(first), sha256Canonical(second));
  const reduction = reduceCompleteCycleEndpointPacket(
    first,
    single.sourceRecord,
    4,
    { fieldSpeed: 1 },
  );
  assert.equal(reduction.completeDeclaredSourceInventory, true);
  assert.equal(reduction.receivers.length, 6);
  for (const receiver of reduction.receivers) {
    assert.equal(receiver.events.length, 8);
    for (const projection of ["axial", "radial", "tangential"]) {
      assert.ok(Number.isFinite(receiver.residualProjections[projection].rms));
      assert.ok(Number.isFinite(
        receiver.residualProjections[projection].maximumAbsolute,
      ));
    }
    assert.ok(receiver.events.every((event) =>
      event.roots.length === single.sourceRecord.sources.length - 1));
  }
});
