import test from "node:test";
import assert from "node:assert/strict";
import { webcrypto } from "node:crypto";
import { readFileSync } from "node:fs";

import * as THREE from "../vendor/three/three.module.js";
import {
  BORG_PRESCRIBED_ANALYSIS_EVENT_STATUS,
  BORG_PRESCRIBED_ANALYSIS_PROJECTION_SCHEMA,
  createBorgPrescribedAnalysisProjection,
  createBorgReceiverEventIdentity,
  sealBorgPrescribedAnalysisProjection,
  sha256BorgCanonicalJson,
  validateBorgPrescribedAnalysisProjection,
  verifyBorgPrescribedAnalysisProjectionHash,
} from "../src/apps/borg/BorgPrescribedAnalysisProjection.js";
import {
  BORG_PRESCRIBED_ANALYSIS_PROVIDER_STATE,
  createBorgPrescribedAnalysisProvider,
  createBorgPrescribedAnalysisRequestCoordinator,
} from "../src/apps/borg/BorgPrescribedAnalysisProvider.js";
import {
  createBorgPrescribedAnalysisScene,
} from "../src/apps/borg/BorgPrescribedAnalysisScene.js";
import {
  evaluateSpindleAnalysisFromFiles,
} from "../scripts/eom/evaluate-prescribed-source-wake.mjs";

const H = Object.freeze({
  source: "1".repeat(64),
  protocol: "2".repeat(64),
  implementation: "3".repeat(64),
  result: "4".repeat(64),
  case: "5".repeat(64),
  campaign: "6".repeat(64),
});

test("strict projection preserves multiple certified roots and verifies its hash", async () => {
  const fixture = await createProjectionFixture();
  const verified = await verifyBorgPrescribedAnalysisProjectionHash(
    fixture.projection,
    { cryptoLike: webcrypto },
  );

  assert.equal(verified.events[0].roots.length, 2);
  assert.notEqual(
    verified.events[0].roots[0].rootId,
    verified.events[0].roots[1].rootId,
  );
  assert.equal(verified.events[0].noRootTransmitters.length, 1);
  assert.equal(Object.isFrozen(verified.events[0].roots[0].direction), true);
});

test("canonical B1 evaluator packet projects retained history, probe identity, and binary membership", async () => {
  const packet = evaluateSpindleAnalysisFromFiles();
  const displayRecord = JSON.parse(readFileSync(new URL(
    "../content/assets/borg/records/illustrative-spindle-chart-hypothesis.assembly-view-record.v0.json",
    import.meta.url,
  )));
  const displayRecordHash = await sha256BorgCanonicalJson(displayRecord, {
    cryptoLike: webcrypto,
  });
  const projection = await createBorgPrescribedAnalysisProjection({
    packet,
    displayRecordId: displayRecord.sourceId,
    displayRecordHash,
    implementationHash: H.implementation,
    generatedAt: "2026-07-23T00:00:00.000Z",
    cryptoLike: webcrypto,
  });

  assert.equal(projection.events.length, 2);
  assert.equal(projection.events[0].roots.length, 6);
  assert.deepEqual(
    projection.events[0].retainedHistory,
    [0, 3.999999999999],
  );
  assert.equal(
    projection.events[0].receiver.id,
    "b1-interior-coordinate-reference-probe",
  );
  assert.equal(projection.events[0].roots[0].binaryId, "spindle-binary-1");
  assert.equal(projection.branches.length, 0);
});

test("projection validation fails closed on unknown fields, duplicates, and nonfinite rows", async () => {
  const { projection } = await createProjectionFixture();
  assert.throws(
    () => validateBorgPrescribedAnalysisProjection({
      ...projection,
      unexpected: true,
    }),
    /unknown=\[unexpected\]/,
  );

  const duplicateRootEvent = {
    ...projection.events[0],
    roots: [
      projection.events[0].roots[0],
      projection.events[0].roots[0],
    ],
  };
  assert.throws(
    () => validateBorgPrescribedAnalysisProjection({
      ...projection,
      events: [duplicateRootEvent],
    }),
    /root id .* is duplicated/,
  );

  const nonfiniteRoot = {
    ...projection.events[0].roots[0],
    distance: Number.POSITIVE_INFINITY,
  };
  assert.throws(
    () => validateBorgPrescribedAnalysisProjection({
      ...projection,
      events: [{
        ...projection.events[0],
        roots: [nonfiniteRoot, projection.events[0].roots[1]],
      }],
    }),
    /distance must be finite/,
  );

  const { campaignHash, ...incompleteProvenance } = projection.provenance;
  assert.equal(typeof campaignHash, "string");
  assert.throws(
    () => validateBorgPrescribedAnalysisProjection({
      ...projection,
      provenance: incompleteProvenance,
    }),
    /missing=\[campaignHash\]/,
  );

  await assert.rejects(
    verifyBorgPrescribedAnalysisProjectionHash({
      ...projection,
      projectionHash: "0".repeat(64),
    }, { cryptoLike: webcrypto }),
    /projection hash mismatch/,
  );
});

test("drawn-not-evaluated and unresolved events remain distinct fail-closed states", async () => {
  const drawn = await createProjectionFixture({
    eventPatch: {
      status: BORG_PRESCRIBED_ANALYSIS_EVENT_STATUS.DRAWN_NOT_EVALUATED,
      roots: [],
      noRootTransmitters: [],
      drawnNotEvaluatedReason: {
        code: "no-source-matched-result",
        message: "The selected event was not evaluated by the producer.",
      },
    },
  });
  assert.equal(
    drawn.projection.events[0].drawnNotEvaluatedReason.code,
    "no-source-matched-result",
  );

  const unresolved = await createProjectionFixture({
    eventPatch: {
      status: BORG_PRESCRIBED_ANALYSIS_EVENT_STATUS.UNRESOLVED,
      roots: [],
      noRootTransmitters: [],
      unresolvedIntervals: [{
        intervalId: "interval-0",
        transmitterId: "tx-a",
        emissionInterval: [-4, -2],
        startPosition: { x: -4, y: 0, z: 0 },
        endPosition: { x: -2, y: 0, z: 0 },
        reason: "producer root-completeness certificate unavailable",
      }],
    },
  });
  assert.equal(unresolved.projection.events[0].status, "unresolved");
  assert.equal(unresolved.projection.events[0].unresolvedIntervals.length, 1);
});

test("provider accepts only the exact display-record hash, protocol, and receiver event", async () => {
  const fixture = await createProjectionFixture();
  const provider = createBorgPrescribedAnalysisProvider({
    projection: fixture.projection,
    cryptoLike: webcrypto,
    expectedProtocolHash: H.protocol,
  });
  const matched = await provider.requestEvent({
    entry: fixture.entry,
    receiverIdentity: fixture.receiverIdentity,
  });
  assert.equal(
    matched.state,
    BORG_PRESCRIBED_ANALYSIS_PROVIDER_STATE.MATCHED,
  );
  assert.equal(matched.event.eventId, "event-0");

  const noMatch = await provider.requestEvent({
    entry: fixture.entry,
    receiverIdentity: "source-worldline:missing:polarity=1:T=2:X=0,0,0",
  });
  assert.equal(
    noMatch.state,
    BORG_PRESCRIBED_ANALYSIS_PROVIDER_STATE.NO_MATCH,
  );

  const mismatchedProvider = createBorgPrescribedAnalysisProvider({
    projection: fixture.projection,
    cryptoLike: webcrypto,
    expectedProtocolHash: H.protocol,
  });
  await assert.rejects(
    mismatchedProvider.requestEvent({
      entry: {
        sourceId: fixture.entry.sourceId,
        rawRecord: { ...fixture.entry.rawRecord, changed: true },
      },
      receiverIdentity: fixture.receiverIdentity,
    }),
    /display record hash mismatch/,
  );

  const protocolMismatch = createBorgPrescribedAnalysisProvider({
    projection: fixture.projection,
    cryptoLike: webcrypto,
    expectedProtocolHash: "f".repeat(64),
  });
  await assert.rejects(
    protocolMismatch.requestEvent({
      entry: fixture.entry,
      receiverIdentity: fixture.receiverIdentity,
    }),
    /protocol hash mismatch/,
  );
});

test("provider hashes and validates one sealed record only once across requests", async () => {
  const fixture = await createProjectionFixture();
  let digestCount = 0;
  const cryptoLike = {
    subtle: {
      async digest(...args) {
        digestCount += 1;
        return webcrypto.subtle.digest(...args);
      },
    },
  };
  const provider = createBorgPrescribedAnalysisProvider({
    projection: fixture.projection,
    cryptoLike,
    expectedProtocolHash: H.protocol,
  });
  await provider.describe(fixture.entry);
  const firstDigestCount = digestCount;
  await provider.requestEvent({
    entry: fixture.entry,
    receiverIdentity: fixture.receiverIdentity,
  });
  await provider.requestEvent({
    entry: fixture.entry,
    receiverIdentity: "source-worldline:missing:polarity=1:T=2:X=0,0,0",
  });
  assert.equal(digestCount, firstDigestCount);
});

test("unavailable provider distinguishes capability status from a selected receiver request", async () => {
  const provider = createBorgPrescribedAnalysisProvider();
  const description = await provider.describe();
  const request = await provider.requestEvent({
    entry: {},
    receiverIdentity: "source-worldline:receiver",
  });

  assert.match(description.message, /^Analysis provider unavailable\./);
  assert.match(request.message, /^Receiver selected, but the analysis provider is unavailable\./);
  assert.equal(
    request.state,
    BORG_PRESCRIBED_ANALYSIS_PROVIDER_STATE.UNAVAILABLE,
  );
});

test("stale analytical requests cannot overwrite a newer receiver selection", async () => {
  const resolvers = new Map();
  const states = [];
  const coordinator = createBorgPrescribedAnalysisRequestCoordinator({
    provider: {
      requestEvent({ receiverIdentity }) {
        return new Promise((resolve) => resolvers.set(receiverIdentity, resolve));
      },
    },
    onStateChange(state) {
      states.push(state);
    },
  });
  const first = coordinator.request({
    entry: {},
    receiverIdentity: "receiver:first",
  });
  const second = coordinator.request({
    entry: {},
    receiverIdentity: "receiver:second",
  });
  resolvers.get("receiver:second")({
    state: BORG_PRESCRIBED_ANALYSIS_PROVIDER_STATE.MATCHED,
    projection: null,
    event: { eventId: "second" },
    message: "second",
  });
  await second;
  resolvers.get("receiver:first")({
    state: BORG_PRESCRIBED_ANALYSIS_PROVIDER_STATE.MATCHED,
    projection: null,
    event: { eventId: "first" },
    message: "first",
  });
  await first;

  assert.equal(states.at(-1).event.eventId, "second");
  assert.equal(states.some((state) => state.event?.eventId === "first"), false);
  coordinator.dispose();
});

test("analysis scene keeps certified roots independently selectable and unresolved intervals separate", async () => {
  const { projection } = await createProjectionFixture();
  const group = new THREE.Group();
  const scene = createBorgPrescribedAnalysisScene({
    group,
    toWorld(position, target) {
      return target.set(position.x, position.y, position.z);
    },
    render() {},
  });
  scene.setEvent({ projection, event: projection.events[0] });

  assert.equal(scene.getPickableObjects().length, 2);
  assert.deepEqual(
    scene.getPickableObjects().map((object) => object.userData.rootOrdinal),
    [0, 1],
  );
  scene.setSelectedRoot(projection.events[0].roots[1].rootId);
  assert.equal(
    scene.getPickableObjects()[0].material.opacity <
      scene.getPickableObjects()[1].material.opacity,
    true,
  );
  const arrivalGroup = group.children.find(
    (child) => child.userData.kind === "receiver-arrival-direction-glyphs",
  );
  assert.ok(
    arrivalGroup.children[0].line.material.opacity <
      arrivalGroup.children[1].line.material.opacity,
    "ArrowHelper line children inherit the parent root selection",
  );
  let sharedGeometryDisposeCount = 0;
  const sharedGeometry = arrivalGroup.children[0].line.geometry;
  const originalDispose = sharedGeometry.dispose.bind(sharedGeometry);
  sharedGeometry.dispose = () => {
    sharedGeometryDisposeCount += 1;
    originalDispose();
  };
  scene.setEvent({ projection, event: projection.events[0] });
  assert.equal(
    sharedGeometryDisposeCount,
    0,
    "ArrowHelper module-level geometry remains owned by Three.js",
  );
  scene.dispose();
  assert.equal(group.children.length, 0);
});

async function createProjectionFixture({ eventPatch = {} } = {}) {
  const rawRecord = {
    schema: "eom-record.v0",
    sourceId: "display-record-0",
    provenance: { engineId: "prescribed-geometry" },
  };
  const displayRecordHash = await sha256BorgCanonicalJson(
    rawRecord,
    { cryptoLike: webcrypto },
  );
  const receiver = {
    identity: createBorgReceiverEventIdentity({
      kind: "source-worldline",
      id: "rx",
      polarity: 1,
      receptionTime: 2,
      position: { x: 0, y: 0, z: 0 },
    }),
    id: "rx",
    kind: "source-worldline",
    sourceWorldlineId: "rx",
    polarity: 1,
    receptionTime: 2,
    position: { x: 0, y: 0, z: 0 },
  };
  const event = {
    eventId: "event-0",
    status: BORG_PRESCRIBED_ANALYSIS_EVENT_STATUS.EVALUATED,
    receiver,
    retainedHistory: [-10, 2],
    rootCompleteness: {
      policy: "independent-bracket-enumeration",
      complete: true,
      reason: "all retained brackets certified",
    },
    roots: [
      root("root-a-0", 0, -3, 5, { x: -5, y: 0, z: 0 }),
      root("root-a-1", 1, -1, 3, { x: 3, y: 0, z: 0 }),
    ],
    noRootTransmitters: [{
      transmitterId: "tx-root-free",
      retainedInterval: [-10, 2],
      reason: "independent sign bound excludes a root",
    }],
    unresolvedIntervals: [],
    drawnNotEvaluatedReason: null,
    ...eventPatch,
  };
  const projection = await sealBorgPrescribedAnalysisProjection({
    schema: BORG_PRESCRIBED_ANALYSIS_PROJECTION_SCHEMA,
    projectionId: "projection-0",
    displaySource: {
      recordId: rawRecord.sourceId,
      recordHash: displayRecordHash,
    },
    analysisSource: {
      recordId: "analysis-record-0",
      sourceHash: H.source,
    },
    provenance: {
      sourceHash: H.source,
      protocolHash: H.protocol,
      implementationHash: H.implementation,
      resultHash: H.result,
      caseHash: H.case,
      campaignHash: H.campaign,
    },
    fieldSpeed: 1,
    events: [event],
    branches: [],
    provider: {
      kind: "precomputed-static",
      capabilityLabel: "Independent fixture projection",
      generatedAt: "2026-07-23T00:00:00.000Z",
    },
  }, { cryptoLike: webcrypto });
  return {
    projection,
    receiverIdentity: receiver.identity,
    entry: {
      sourceId: rawRecord.sourceId,
      rawRecord,
    },
  };
}

function root(rootId, rootOrdinal, emissionTime, delay, transmitterPosition) {
  return {
    rootId,
    rootOrdinal,
    transmitterId: "tx-a",
    binaryId: null,
    emissionTime,
    receptionTime: 2,
    delay,
    transmitterPosition,
    receiverPosition: { x: 0, y: 0, z: 0 },
    direction: {
      x: -Math.sign(transmitterPosition.x),
      y: 0,
      z: 0,
    },
    distance: Math.abs(transmitterPosition.x),
    finalBracket: [emissionTime - 1e-8, emissionTime + 1e-8],
    transmitterSideFactorDt: rootOrdinal === 0 ? 0.5 : -0.5,
    rootCompletenessStatus: "certified-complete",
    accelerationContribution: {
      x: rootOrdinal === 0 ? 0.25 : -0.125,
      y: 0,
      z: 0,
    },
    rootIsolationMethod: "independent-interval-certificate",
  };
}
