#!/usr/bin/env node

import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

import {
  SOLVER_APP_BRIDGE_API_VERSION,
  SolverBridgeError,
  createSolverAppBridgeClient,
  hasSolverCAbi,
} from "../src/solver/app/SolverAppBridge.mjs";
import { classifySolverBaselineResponse } from "../src/solver/app/SolverBaselineComparison.mjs";

const require = createRequire(import.meta.url);
const rootDir = process.cwd();
const wasmDir = path.join(rootDir, ".tmp", "solver-build", "wasm");
const wasmLoaderPath = path.join(wasmDir, "architrino_solver_wasm_smoke.js");
const createWasmModule = require(wasmLoaderPath);
const fixtureRequest = readJson("src/solver/fixtures/causal-roots-f64-smoke.request.json");
const batchFixtureResponse = readJson("src/solver/fixtures/causal-root-batch-f64-smoke.response.json");
const fixtureResponse = readJson("src/solver/fixtures/roots-and-hits-f64-smoke.response.json");

const client = createSolverAppBridgeClient({
  createWasmModule,
  locateFile: (fileName) => path.join(wasmDir, fileName),
});

const initResponse = await client.init({
  appId: "animator",
  apiVersion: SOLVER_APP_BRIDGE_API_VERSION,
  requestedCapabilities: ["causalRoots", "delayedHits"],
  storagePolicy: {
    target: "caller-buffer",
    durable: false,
    maxBytes: 64 * 1024 * 1024,
  },
  threadingPolicy: {
    mode: "single-thread",
    deterministic: true,
  },
});

assert(initResponse.status.code === "ok", "expected init status ok");
assert(initResponse.capabilities.wasmModuleFactory === true, "expected wasm-backed capabilities");
assert(initResponse.capabilities.abiInfo?.rootRowF64Bytes === 112, "expected root row ABI size");
assert(
  initResponse.capabilities.abiInfo?.rootLedgerDetailRowF64Bytes === 192,
  "expected root-ledger detail row ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.delayedHitRowF64Bytes === 128,
  "expected delayed-hit row ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.motionSampleRequestF64Bytes === 112,
  "expected motion sample request ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.motionFrameRowF64Bytes === 88,
  "expected motion frame row ABI size"
);
assert(initResponse.capabilities.abiInfo?.phaseClockF64Bytes === 24, "expected phase clock ABI size");
assert(
  initResponse.capabilities.abiInfo?.phaseAtHitRowF64Bytes === 72,
  "expected phase-at-hit row ABI size"
);
assert(initResponse.capabilities.abiInfo?.boundsRowF64Bytes === 64, "expected bounds row ABI size");
assert(
  initResponse.capabilities.abiInfo?.spherePointRequestF64Bytes === 64,
  "expected sphere-point request ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.spherePointRowF64Bytes === 24,
  "expected sphere-point row ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.assemblyStateRowF64Bytes === 112,
  "expected assembly state row ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.assemblyMembershipRowF64Bytes === 80,
  "expected assembly membership row ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.assemblyHierarchyRowF64Bytes === 56,
  "expected assembly hierarchy row ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.assemblyEventRowF64Bytes === 88,
  "expected assembly event row ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.pathHistoryRowF64Bytes === 96,
  "expected path-history row ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.spaceTimeIndexRowF64Bytes === 128,
  "expected space-time index row ABI size"
);
const wasmModule = await createWasmModule({
  locateFile: (fileName) => path.join(wasmDir, fileName),
});
assert(hasSolverCAbi(wasmModule), "expected solver C ABI exports");

const capabilities = await client.capabilities();
assert(
  capabilities.outputLayouts.includes("root_ledger.v1") &&
    capabilities.outputLayouts.includes("root_ledger_detail.v1") &&
    capabilities.outputLayouts.includes("delayed_hit_events.v1") &&
    capabilities.outputLayouts.includes("spacetime_index.v1"),
  "expected root, root-detail, delayed-hit, and spacetime index layouts"
);

const cancelStatus = await client.cancelRun({ runId: "smoke", reason: "smoke complete" });
assert(cancelStatus.code === "cancelled", "expected normalized cancellation status");

const escalatedAdmission = await client.admitSimulationEnvelope(makeAdmissionRequest());
assert(escalatedAdmission.admitted, "expected strict admission to be admitted");
assert(
  escalatedAdmission.decision === "escalate_precision" &&
    escalatedAdmission.selectedPrecisionPath === "extended_precision",
  "expected strict admission to escalate precision"
);
const batchAdmission = await client.admitSimulationEnvelope(
  makeAdmissionRequest({
    errorBudget: { globalTolerance: 1e-9, rootIsolationTolerance: 1e-10 },
    envelope: { entityCount: 4096, latencyTarget: "batch" },
  })
);
assert(batchAdmission.admitted && batchAdmission.decision === "batch", "expected batch admission");
const rejectedAdmission = await client.admitSimulationEnvelope(
  makeAdmissionRequest({
    envelope: { memoryBudgetBytes: 1024 },
  })
);
assert(
  !rejectedAdmission.admitted && rejectedAdmission.decision === "reject",
  "expected low-memory admission rejection"
);

const motionResponse = await client.sampleLinearMotionF64({
  pathKey: 1234,
  segment: {
    startTime: 0,
    endTime: 2,
    positionAtStart: { x: 1, y: 2, z: 3 },
    velocity: { x: 2, y: 0.5, z: -1 },
    errorBound: 1e-12,
  },
  startTime: 0,
  endTime: 2,
  step: 1,
  stateFlags: 9,
});
assert(motionResponse.status.code === "ok", "expected motion sample status ok");
assert(motionResponse.frames.length === 3, "expected three motion frames");
assert(motionResponse.frames[2].position.x === 5, "expected final motion x");
assert(motionResponse.frames[2].position.y === 3, "expected final motion y");
assert(motionResponse.frames[2].position.z === 1, "expected final motion z");
const frameBuffer = findBuffer(motionResponse, "frame_buffer.v1");
assert(frameBuffer.buffer.byteLength === 264, "expected frame buffer byte length");

const geometryResponse = await client.computeSharedGeometryF64({
  pathBounds: [
    {
      pathKey: 99,
      segment: {
        startTime: 2,
        endTime: 6,
        positionAtStart: { x: 10, y: -2, z: 1 },
        velocity: { x: -1, y: 3, z: 0.5 },
      },
    },
  ],
  spherePointIntersections: [
    {
      center: { x: 0, y: 0, z: 0 },
      radius: 5,
      point: { x: 3, y: 4, z: 0 },
      tolerance: 1e-12,
    },
    {
      center: { x: 0, y: 0, z: 0 },
      radius: 4,
      point: { x: 3, y: 4, z: 0 },
      tolerance: 1e-12,
    },
  ],
});
assert(geometryResponse.status.code === "ok", "expected shared geometry status ok");
assert(geometryResponse.pathBounds.length === 1, "expected one path bounds row");
assert(geometryResponse.pathBounds[0].pathKey === 99, "expected path bounds key");
assert(geometryResponse.pathBounds[0].min.x === 6, "expected path bounds min x");
assert(geometryResponse.pathBounds[0].max.y === 10, "expected path bounds max y");
assert(geometryResponse.spherePointIntersections.length === 2, "expected two sphere rows");
assert(geometryResponse.spherePointIntersections[0].intersects, "expected first sphere intersection");
assert(!geometryResponse.spherePointIntersections[1].intersects, "expected second sphere miss");
assert(
  Math.abs(geometryResponse.spherePointIntersections[1].signedDistance - 1) <= 1e-10,
  "expected second sphere signed distance"
);

const assemblyEventsResponse = await client.detectAssemblyMembershipEventsF64({
  memberships: [
    {
      membershipKey: 1001,
      pathKey: 5001,
      assemblyKey: 7001,
      assemblyStateKey: 7101,
      timeStart: 0,
      timeEnd: 5,
      confidence: 1,
      localRole: 1,
      bindingState: 1,
      membershipVersion: 1,
    },
    {
      membershipKey: 1002,
      pathKey: 5001,
      assemblyKey: 7001,
      assemblyStateKey: 7102,
      timeStart: 5,
      timeEnd: 8,
      confidence: 1,
      localRole: 2,
      bindingState: 1,
      membershipVersion: 1,
    },
    {
      membershipKey: 1003,
      pathKey: 5001,
      assemblyKey: 0,
      assemblyStateKey: 0,
      timeStart: 8,
      timeEnd: 10,
      confidence: 1,
      localRole: 0,
      bindingState: 0,
      membershipVersion: 1,
    },
  ],
});
assert(assemblyEventsResponse.status.code === "ok", "expected assembly event status ok");
assert(assemblyEventsResponse.events.length === 2, "expected two assembly membership events");
assert(assemblyEventsResponse.events[0].eventKind === 3, "expected membership changed event");
assert(assemblyEventsResponse.events[0].priorStateKey === 7101, "expected prior assembly state");
assert(assemblyEventsResponse.events[0].nextStateKey === 7102, "expected next assembly state");
assert(assemblyEventsResponse.events[1].eventKind === 2, "expected membership leave event");
assert(assemblyEventsResponse.events[1].eventTime === 8, "expected membership leave time");
const assemblyEventBuffer = findBuffer(assemblyEventsResponse, "assembly_events.v1");
assert(assemblyEventBuffer.rowCount === 2, "expected two assembly event buffer rows");
assert(assemblyEventBuffer.buffer.byteLength === 176, "expected assembly event buffer byte length");

const spaceTimeIndexResponse = await client.buildSpaceTimeIndexF64({
  pathRows: [
    {
      pathKey: 5001,
      segmentIndex: 0,
      startTime: 0,
      endTime: 2,
      start: { x: 0, y: 0, z: 0 },
      velocity: { x: 1, y: 0, z: 0 },
      errorBound: 0,
      stateFlags: 0,
    },
    {
      pathKey: 5002,
      segmentIndex: 0,
      startTime: 0,
      endTime: 2,
      start: { x: 20, y: 0, z: 0 },
      velocity: { x: 1, y: 0, z: 0 },
      errorBound: 0,
      stateFlags: 0,
    },
  ],
  assemblyStates: [
    {
      assemblyKey: 7001,
      assemblyStateKey: 7101,
      timeStart: 0,
      timeEnd: 2,
      center: { x: 1, y: 1, z: 0 },
      velocity: { x: 0, y: 0.5, z: 0 },
      phase: 0.25,
      cycleIndex: 3,
      modelVersion: 1,
      statusFlags: 0,
      fidelityFlags: 0,
    },
  ],
  options: { spatialCellSize: 1, timeBinSize: 1, maxCellsPerItem: 128 },
  maxRows: 64,
});
assert(spaceTimeIndexResponse.status.code === "ok", "expected space-time index build status ok");
assert(spaceTimeIndexResponse.rows.length > 0, "expected space-time index rows");
assert(spaceTimeIndexResponse.overflowEntryCount === 0, "expected no space-time index overflow");
const spaceTimeIndexBuffer = findBuffer(spaceTimeIndexResponse, "spacetime_index.v1");
assert(spaceTimeIndexBuffer.rowCount === spaceTimeIndexResponse.rows.length, "expected space-time row count");
assert(
  spaceTimeIndexBuffer.buffer.byteLength === spaceTimeIndexResponse.rows.length * 128,
  "expected space-time index buffer byte length"
);
const pathQueryResponse = await client.querySpaceTimeIndexF64({
  rows: spaceTimeIndexResponse.rows,
  query: {
    bounds: {
      min: { x: 0.5, y: -0.5, z: -0.5 },
      max: { x: 1.5, y: 0.5, z: 0.5 },
      timeStart: 0.5,
      timeEnd: 1.5,
    },
    subjectKind: 1,
  },
  options: { spatialCellSize: 1, timeBinSize: 1, maxCellsPerItem: 128 },
  maxRows: 8,
});
assert(pathQueryResponse.status.code === "ok", "expected space-time path query status ok");
assert(pathQueryResponse.rows.length === 1, "expected one matching path index row");
assert(pathQueryResponse.rows[0].subjectKey === 5001, "expected path index query to return path 5001");
assert(pathQueryResponse.rows[0].sourceLayout === 1, "expected path index query source layout");
const pathQueryBuffer = findBuffer(pathQueryResponse, "spacetime_index.v1");
assert(pathQueryBuffer.buffer.byteLength === 128, "expected one space-time query row payload");
const assemblyQueryResponse = await client.querySpaceTimeIndexF64({
  rows: spaceTimeIndexResponse.rows,
  query: {
    bounds: {
      min: { x: 0.5, y: 0.5, z: -0.5 },
      max: { x: 1.5, y: 2.5, z: 0.5 },
      timeStart: 0.5,
      timeEnd: 1.5,
    },
    subjectKind: 2,
  },
  options: { spatialCellSize: 1, timeBinSize: 1, maxCellsPerItem: 128 },
  maxRows: 8,
});
assert(assemblyQueryResponse.status.code === "ok", "expected space-time assembly query status ok");
assert(assemblyQueryResponse.rows.length === 1, "expected one matching assembly index row");
assert(assemblyQueryResponse.rows[0].subjectKey === 7001, "expected assembly index query to return assembly 7001");
assert(assemblyQueryResponse.rows[0].sourceLayout === 2, "expected assembly index query source layout");

const rootsResponse = await client.solveCausalRootsF64(fixtureRequest.request);
assert(rootsResponse.status.code === "ok", "expected causal root bridge status ok");
assert(rootsResponse.roots.length === 1, "expected one bridged causal root");
assert(
  Math.abs(rootsResponse.roots[0].emissionTime) <= 1e-10 &&
    Math.abs(rootsResponse.roots[0].distance - 10) <= 1e-10,
  "expected bridged causal root values"
);

const rootLedgerDetailResponse = await client.buildRootLedgerDetailF64({
  ...fixtureRequest.request,
  maxRows: 16,
});
assert(rootLedgerDetailResponse.status.code === "ok", "expected root-ledger detail status ok");
assert(rootLedgerDetailResponse.rows.length >= 1, "expected root-ledger detail rows");
assert(rootLedgerDetailResponse.rows[0].entryKind === 1, "expected active root detail row");
assert(rootLedgerDetailResponse.rows[0].rootKind === 1, "expected partner root detail row");
assert(rootLedgerDetailResponse.rows[0].jacobianSignStratum === 3, "expected positive Jacobian stratum");
assert(rootLedgerDetailResponse.rows[0].rootKey > 0, "expected stable root detail key");
assert(Math.abs(rootLedgerDetailResponse.rows[0].delay - 10) <= 1e-10, "expected root detail delay");
assert(Math.abs(rootLedgerDetailResponse.rows[0].jacobian - 1) <= 1e-10, "expected root detail Jacobian");
const rootLedgerDetailBuffer = findBuffer(rootLedgerDetailResponse, "root_ledger_detail.v1");
assert(
  rootLedgerDetailBuffer.rowCount === rootLedgerDetailResponse.rows.length,
  "expected root-ledger detail buffer row count"
);
assert(
  rootLedgerDetailBuffer.buffer.byteLength === rootLedgerDetailResponse.rows.length * 192,
  "expected root-ledger detail payload rows"
);
const rootLedgerFailureDetailResponse = await client.buildRootLedgerDetailF64({
  ...fixtureRequest.request,
  hitTime: fixtureRequest.request.receiver.endTime + 1,
  maxRows: 16,
});
assert(rootLedgerFailureDetailResponse.status.code === "ok", "expected root-ledger failure detail status ok");
assert(rootLedgerFailureDetailResponse.rows.length >= 1, "expected root-ledger failure row");
assert(rootLedgerFailureDetailResponse.rows[0].entryKind === 5, "expected root-ledger failure entry");
assert(rootLedgerFailureDetailResponse.rows[0].statusCode === 9, "expected insufficient-history failure status");

const precisionResponse = await client.diagnosePrecisionF64(makePrecisionRequest());
assert(
  precisionResponse.status.code === "insufficient_scale_resolution" &&
    precisionResponse.status.severity === "warning",
  "expected precision diagnostic resolution warning"
);
assert(
  precisionResponse.recommendedPath === "extended_precision",
  "expected high-dynamic-range request to select extended precision"
);
assert(
  precisionResponse.recommendedNumericType === "decimal128",
  "expected high-dynamic-range request to request decimal128 diagnostics"
);
assert(
  precisionResponse.scaleNormalizationRecommended &&
    precisionResponse.extendedPrecisionRecommended &&
    precisionResponse.scaleResolutionLimited &&
    precisionResponse.timeResolutionLimited &&
    precisionResponse.geometryScale.ordersOfMagnitude >= 12,
  "expected precision scale diagnostics"
);

const batchResponse = await client.solveCausalRootBatchF64({
  requests: [fixtureRequest.request, makeBatchRequest(6)],
  maxItems: 2,
  maxRoots: 4,
  workerCount: 2,
});
assert(batchResponse.status.code === "ok", "expected causal root batch bridge status ok");
assert(batchResponse.items.length === 2, "expected two batch item rows");
assert(batchResponse.roots.length === 2, "expected two batch roots");
assert(batchResponse.items[0].itemIndex === 0, "expected first batch item index");
assert(batchResponse.items[0].rootOffset === 0, "expected first batch root offset");
assert(batchResponse.items[0].rootCount === 1, "expected first batch root count");
assert(batchResponse.items[1].itemIndex === 1, "expected second batch item index");
assert(batchResponse.items[1].rootOffset === 1, "expected second batch root offset");
assert(batchResponse.items[1].rootCount === 1, "expected second batch root count");
assert(
  Math.abs(batchResponse.items[1].roots[0].distance - 6) <= 1e-10,
  "expected second batch root distance"
);
const batchRootBuffer = findBuffer(batchResponse, "root_ledger.v1");
assert(batchRootBuffer.buffer instanceof ArrayBuffer, "expected batch root ArrayBuffer payload");
assert(batchRootBuffer.buffer.byteLength === 224, "expected two-row batch root payload byte length");
assertDeepEqual(
  normalizeJson(stripRuntimeBuffers(batchResponse)),
  batchFixtureResponse.response,
  "causal-root batch response fixture mismatch"
);

const rootsAndHitsResponse = await client.solveRootsAndHitsF64(fixtureRequest.request);
assert(rootsAndHitsResponse.status.code === "ok", "expected roots-and-hits status ok");
assert(rootsAndHitsResponse.roots.length === 1, "expected one combined root");
assert(rootsAndHitsResponse.hits.length === 1, "expected one delayed hit");
assert(
  rootsAndHitsResponse.buffers.some(
    (buffer) => buffer.layout === "root_ledger.v1" && buffer.rowCount === 1
  ) &&
    rootsAndHitsResponse.buffers.some(
      (buffer) => buffer.layout === "delayed_hit_events.v1" && buffer.rowCount === 1
    ),
  "expected root and delayed-hit buffer descriptors"
);
const rootBuffer = findBuffer(rootsAndHitsResponse, "root_ledger.v1");
const delayedHitBuffer = findBuffer(rootsAndHitsResponse, "delayed_hit_events.v1");
assert(rootBuffer.buffer instanceof ArrayBuffer, "expected root ledger ArrayBuffer payload");
assert(delayedHitBuffer.buffer instanceof ArrayBuffer, "expected delayed-hit ArrayBuffer payload");
assert(rootBuffer.buffer.byteLength === 112, "expected root ledger payload ABI byte length");
assert(delayedHitBuffer.buffer.byteLength === 128, "expected delayed-hit payload ABI byte length");
assert(
  rootsAndHitsResponse.streams.length === 1 &&
    rootsAndHitsResponse.streams[0].indexLayout === "stream_index.v1" &&
    rootsAndHitsResponse.streams[0].availableRanges.length === 2,
  "expected transient stream descriptor"
);
const streamHandle = await client.openStream({
  runId: "smoke",
  streamId: "causal-root-transient",
  purpose: "diagnostics",
});
assert(streamHandle.streamId === "causal-root-transient", "expected opened transient stream id");
assert(
  streamHandle.readableLayouts.includes("root_ledger.v1") &&
    streamHandle.readableLayouts.includes("delayed_hit_events.v1"),
  "expected stream readable layouts"
);
assert(streamHandle.availableRanges.length === 2, "expected opened stream ranges");
const streamRead = await client.readStreamRange({
  streamId: "causal-root-transient",
  timeRange: { start: 10, end: 10 },
  maxBytes: 240,
});
assert(streamRead.status.code === "ok", "expected stream range read status ok");
assert(streamRead.buffers.length === 2, "expected both transient stream buffers");
assert(streamRead.buffers[0].buffer.byteLength === 112, "expected root stream payload");
assert(streamRead.buffers[1].buffer.byteLength === 128, "expected delayed-hit stream payload");
const delayedHitOnlyRead = await client.readStreamRange({
  streamId: "causal-root-transient",
  byteRange: { start: 112, end: 240 },
});
assert(delayedHitOnlyRead.buffers.length === 1, "expected one byte-range-selected stream buffer");
assert(
  delayedHitOnlyRead.buffers[0].layout === "delayed_hit_events.v1" &&
    delayedHitOnlyRead.buffers[0].buffer.byteLength === 128,
  "expected delayed-hit byte-range payload"
);
let streamPressureRejected = false;
try {
  await client.readStreamRange({
    streamId: "causal-root-transient",
    timeRange: { start: 10, end: 10 },
    maxBytes: 1,
  });
} catch (error) {
  streamPressureRejected =
    error instanceof SolverBridgeError && error.status.code === "stream_memory_pressure";
}
assert(streamPressureRejected, "expected stream maxBytes pressure rejection");
assert(
  Math.abs(rootsAndHitsResponse.hits[0].unitDirection.x - 1) <= 1e-10 &&
    Math.abs(rootsAndHitsResponse.hits[0].strength - 1) <= 1e-10,
  "expected delayed-hit bridge values"
);
const phaseResponse = await client.computePhaseAtHitF64({
  roots: rootsAndHitsResponse.roots,
  sourceClock: { period: 2, epoch: 0, phaseOffset: 0 },
  receiverClock: { period: 6, epoch: 0, phaseOffset: 0 },
});
assert(phaseResponse.status.code === "ok", "expected phase-at-hit status ok");
assert(phaseResponse.rows.length === 1, "expected one phase-at-hit row");
assert(phaseResponse.rows[0].sourceCycleIndex === 0, "expected source phase cycle");
assert(phaseResponse.rows[0].receiverCycleIndex === 1, "expected receiver phase cycle");
assert(Math.abs(phaseResponse.rows[0].sourcePhase) <= 1e-10, "expected source phase");
assert(
  Math.abs(phaseResponse.rows[0].receiverPhase - 2 / 3) <= 1e-10,
  "expected receiver phase"
);
const phaseBuffer = findBuffer(phaseResponse, "phase_at_hit.v1");
assert(phaseBuffer.buffer.byteLength === 72, "expected phase-at-hit buffer byte length");
assertDeepEqual(
  normalizeJson(stripRuntimeBuffers(rootsAndHitsResponse)),
  fixtureResponse.response,
  "roots-and-hits response fixture mismatch"
);
const baselineComparison = classifySolverBaselineResponse({
  baseline: fixtureResponse.response,
  candidate: normalizeJson(stripRuntimeBuffers(rootsAndHitsResponse)),
  tolerance: 1e-10,
});
assert(
  baselineComparison.classification === "baseline_within_tolerance",
  "expected exact fixture baseline comparison within tolerance"
);
const mismatchedCandidate = normalizeJson(stripRuntimeBuffers(rootsAndHitsResponse));
mismatchedCandidate.roots[0].distance += 1;
const mismatchComparison = classifySolverBaselineResponse({
  baseline: fixtureResponse.response,
  candidate: mismatchedCandidate,
  tolerance: 1e-10,
});
assert(
  mismatchComparison.classification === "baseline_investigation_required_mismatch",
  "expected large baseline comparison mismatch classification"
);

const runHandle = await client.runSimulation(makeRunSimulationRequest());
assert(runHandle.status.code === "ok", "expected runSimulation status ok");
assert(runHandle.requestId === "smoke-run-request", "expected runSimulation request id");
assert(runHandle.runId === "smoke-run", "expected runSimulation run id");
assert(runHandle.datasetId === "smoke-run-dataset", "expected runSimulation dataset id");
assert(runHandle.acceptedPrecisionPath === "extended_precision", "expected runSimulation precision selection");
assert(runHandle.response.summary.rootCount === 1, "expected runSimulation root count");
assert(runHandle.response.summary.eventCount === 1, "expected runSimulation event count");
assert(runHandle.response.buffers.length === 2, "expected runSimulation buffers");
assert(runHandle.response.streams[0].streamId === "smoke-run:causal-root-transient", "expected run-scoped stream id");
const runStreamRead = await client.readStreamRange({
  streamId: "smoke-run:causal-root-transient",
  maxBytes: 240,
});
assert(runStreamRead.status.code === "ok", "expected run-scoped stream read status ok");
assert(runStreamRead.buffers.length === 2, "expected run-scoped stream buffers");

const motionRunHandle = await client.runSimulation(makeMotionRunSimulationRequest());
assert(motionRunHandle.status.code === "ok", "expected motion runSimulation status ok");
assert(motionRunHandle.requestId === "smoke-motion-run-request", "expected motion run request id");
assert(motionRunHandle.runId === "smoke-motion-run", "expected motion run id");
assert(motionRunHandle.response.summary.frameCount === 3, "expected motion run frame count");
assert(motionRunHandle.response.frames.length === 3, "expected motion run frames");
assert(motionRunHandle.response.buffers.length === 1, "expected motion run frame buffer");
assert(
  motionRunHandle.response.buffers[0].layout === "frame_buffer.v1" &&
    motionRunHandle.response.buffers[0].buffer.byteLength === 264,
  "expected motion run frame buffer payload"
);
assert(
  motionRunHandle.response.frames[2].position.x === 5 &&
    motionRunHandle.response.frames[2].position.y === 3 &&
    motionRunHandle.response.frames[2].position.z === 1,
  "expected motion run final position"
);

let invalidRootRejected = false;
try {
  await client.solveCausalRootsF64({
    source: {
      startTime: 0,
      endTime: 10,
      positionAtStart: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
    },
    receiver: {
      startTime: 0,
      endTime: 10,
      positionAtStart: { x: 10, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
    },
    hitTime: 10,
    signalSpeed: 0,
  });
} catch (error) {
  invalidRootRejected =
    error instanceof SolverBridgeError && error.status.code === "app_contract_error";
}
assert(invalidRootRejected, "expected invalid causal root request to be rejected");

let invalidRunRejected = false;
try {
  await client.runSimulation({ requestId: "smoke-request", runKind: "causalRoots" });
} catch (error) {
  invalidRunRejected =
    error instanceof SolverBridgeError && error.status.code === "app_contract_error";
}
assert(invalidRunRejected, "expected invalid runSimulation to reject with app_contract_error");

const closeStatus = await client.closeRun({ runId: "smoke", releaseStreams: true });
assert(closeStatus.code === "ok", "expected closeRun status ok");
let releasedStreamRejected = false;
try {
  await client.openStream({
    runId: "smoke",
    streamId: "causal-root-transient",
    purpose: "diagnostics",
  });
} catch (error) {
  releasedStreamRejected =
    error instanceof SolverBridgeError && error.status.code === "stream_read_failed";
}
assert(releasedStreamRejected, "expected released stream to be unavailable");

await client.dispose();
console.log("solver app bridge check passed.");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function makeBatchRequest(distance) {
  const request = normalizeJson(fixtureRequest.request);
  request.receiver.positionAtStart.x = distance;
  request.hitTime = distance;
  return request;
}

function makePrecisionRequest() {
  const request = normalizeJson(fixtureRequest.request);
  request.source.endTime = 1e12;
  request.source.positionAtStart.x = 1e15;
  request.source.errorBound = 1e-16;
  request.receiver.endTime = 1e12;
  request.receiver.positionAtStart.x = 1e15 + 1e3;
  request.receiver.errorBound = 1e-16;
  request.hitTime = 1e12;
  request.rootTolerance = 1e-16;
  return request;
}

function makeAdmissionRequest(overrides = {}) {
  const model = {
    modelId: "aaa.central-solver",
    equationVersion: "motion-root-v1",
    forceLawVersion: "causal-delay-v1",
    constantsHash: "constants:test",
    causalSpeedPolicy: "fixed-field-speed",
    branchPolicy: "all-positive-roots",
    unitConvention: "solver-si",
    compatiblePrecisionPaths: ["scaled_f64_strict", "event_root_focused", "extended_precision"],
    ...(overrides.model || {}),
  };
  const errorBudget = {
    globalTolerance: 1e-13,
    rootIsolationTolerance: 1e-14,
    delayedHitTolerance: 1e-13,
    integrationTolerance: 1e-12,
    streamEncodingTolerance: 1e-12,
    readbackTolerance: 1e-12,
    projectionTolerance: 1e-9,
    displayTolerance: 1e-6,
    ...(overrides.errorBudget || {}),
  };
  const envelope = {
    entityCount: 16,
    assemblyCount: 1,
    timeWindow: { start: 0, end: 10, stepHint: 0.01, units: "solver-time" },
    timeResolutionHint: 0.01,
    interactionPolicy: "neighbor-pruned",
    expectedBranchComplexity: "low",
    outputDetail: "playback",
    memoryBudgetBytes: 128 * 1024 * 1024,
    storageBudgetBytes: 512 * 1024 * 1024,
    latencyTarget: "background",
    simplificationPolicy: "none",
    ...(overrides.envelope || {}),
  };
  return { model, errorBudget, envelope };
}

function makeRunSimulationRequest() {
  const admission = makeAdmissionRequest();
  return {
    requestId: "smoke-run-request",
    runId: "smoke-run",
    datasetId: "smoke-run-dataset",
    appId: "animator",
    runKind: "causalRoots",
    claimLevel: "interactive-preview",
    precisionPath: "auto",
    configVersion: "solver-run-smoke.v1",
    configHash: "solver-run-smoke",
    model: admission.model,
    envelope: admission.envelope,
    errorBudget: admission.errorBudget,
    config: {
      appId: "animator",
      rootRequest: fixtureRequest.request,
    },
    output: {
      outputs: ["rootLedger", "delayedHitEvents", "diagnostics"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: 64 * 1024 * 1024,
      deterministic: true,
    },
  };
}

function makeMotionRunSimulationRequest() {
  const admission = makeAdmissionRequest();
  return {
    requestId: "smoke-motion-run-request",
    runId: "smoke-motion-run",
    datasetId: "smoke-motion-run-dataset",
    appId: "animator",
    runKind: "motionSimulation",
    claimLevel: "interactive-preview",
    precisionPath: "auto",
    configVersion: "solver-motion-run-smoke.v1",
    configHash: "solver-motion-run-smoke",
    model: admission.model,
    envelope: admission.envelope,
    errorBudget: admission.errorBudget,
    config: {
      appId: "animator",
      motionRequest: {
        pathKey: 1234,
        segment: {
          startTime: 0,
          endTime: 2,
          positionAtStart: { x: 1, y: 2, z: 3 },
          velocity: { x: 2, y: 0.5, z: -1 },
          errorBound: 1e-12,
        },
        startTime: 0,
        endTime: 2,
        step: 1,
        stateFlags: 9,
      },
    },
    output: {
      outputs: ["frameBuffer", "diagnostics"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: 64 * 1024 * 1024,
      deterministic: true,
    },
  };
}

function normalizeJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function findBuffer(response, layout) {
  const buffer = response.buffers.find((candidate) => candidate.layout === layout);
  if (!buffer) {
    console.error(`Missing ${layout} buffer`);
    process.exit(1);
  }
  return buffer;
}

function stripRuntimeBuffers(response) {
  return {
    ...response,
    buffers: response.buffers.map(({ buffer, ...descriptor }) => descriptor),
  };
}

function assertDeepEqual(actual, expected, message) {
  const actualJson = JSON.stringify(actual, null, 2);
  const expectedJson = JSON.stringify(expected, null, 2);
  if (actualJson !== expectedJson) {
    console.error(message);
    console.error("actual:");
    console.error(actualJson);
    console.error("expected:");
    console.error(expectedJson);
    process.exit(1);
  }
}

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}
