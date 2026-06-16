#!/usr/bin/env node

import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

import {
  SOLVER_APP_BRIDGE_API_VERSION,
  SolverBridgeError,
  createSolverAppBridgeClient,
  hasCausalRootCAbi,
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
  initResponse.capabilities.abiInfo?.delayedHitRowF64Bytes === 128,
  "expected delayed-hit row ABI size"
);
const wasmModule = await createWasmModule({
  locateFile: (fileName) => path.join(wasmDir, fileName),
});
assert(hasCausalRootCAbi(wasmModule), "expected causal-root C ABI export");

const capabilities = await client.capabilities();
assert(
  capabilities.outputLayouts.includes("root_ledger.v1") &&
    capabilities.outputLayouts.includes("delayed_hit_events.v1"),
  "expected root and delayed-hit layouts"
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

const rootsResponse = await client.solveCausalRootsF64(fixtureRequest.request);
assert(rootsResponse.status.code === "ok", "expected causal root bridge status ok");
assert(rootsResponse.roots.length === 1, "expected one bridged causal root");
assert(
  Math.abs(rootsResponse.roots[0].emissionTime) <= 1e-10 &&
    Math.abs(rootsResponse.roots[0].distance - 10) <= 1e-10,
  "expected bridged causal root values"
);

const precisionResponse = await client.diagnosePrecisionF64(makePrecisionRequest());
assert(precisionResponse.status.code === "ok", "expected precision diagnostic status ok");
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
