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
import {
  SOLVER_APP_WORKER_PROTOCOL_VERSION,
  collectTransferables,
  createInProcessSolverAppWorkerClient,
  createSolverAppWorkerHandler,
  createSolverAppWorkerClient,
  dispatchSolverAppWorkerMessage,
} from "../src/solver/app/SolverAppWorkerBridge.mjs";
import {
  SOLVER_APP_WORKER_RUNTIME_VERSION,
  createSolverWasmLocateFile,
  installSolverAppWorkerRuntime,
  resolveSolverWasmModuleFactory,
  shouldAutoInstallSolverAppWorkerRuntime,
} from "../src/solver/app/SolverAppWorkerRuntime.mjs";
import {
  SOLVER_APP_ADAPTERS_VERSION,
  createAssemblyGraphDatasetRequest,
  createAssemblyGraphStoreReadRequest,
  createAssemblyGraphStoreRequest,
  createAnimatorAppPlaybackRunRequest,
  createAnimatorMotionSimulationRunRequest,
  createDescribeAssemblyGraphStoreRequest,
  createDescribeStreamRequest,
  createEmissionShellCandidatePacketBatchQueryRequest,
  createEmissionShellCandidatePacketMergeRequest,
  createEmissionShellCandidatePacketQueryRequest,
  createEmissionShellCandidateQueryRequest,
  createEmissionShellRootRefinementRequest,
  createIdealSwarmDelayedHitsRunRequest,
  createIdealSwarmSharedGeometryRunRequest,
  createOpenStreamRequest,
  createPhotonCausalRootsRunRequest,
  createPhotonPhaseDiagnosticsRunRequest,
  createPathHistoryRunRequest,
  createPathHistoryStorageLifecycleRequest,
  createPathHistoryStreamRequest,
  createPathHistoryStreamSpaceTimeIndexRequest,
  createPathHistoryWorkPacketPlanRequest,
  createReadStreamRangeRequest,
  createValidationReplayRunRequest,
} from "../src/solver/app/SolverAppAdapters.mjs";
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
assert(SOLVER_APP_ADAPTERS_VERSION === "solver-app-adapters.v1", "expected solver adapter version");
assert(
  initResponse.capabilities.appBridge?.schema === "solver-app-bridge-capabilities.v1",
  "expected app bridge capability schema"
);
assert(
  initResponse.capabilities.appBridge.adapterVersion === SOLVER_APP_ADAPTERS_VERSION,
  "expected app bridge adapter version"
);
assert(
  findAppAdapter(initResponse.capabilities.appBridge, "photon").runKinds.includes("causalRoots"),
  "expected photon causal-root adapter capability"
);
assert(
  findAppAdapter(initResponse.capabilities.appBridge, "photon").runKinds.includes("phaseDiagnostics"),
  "expected photon phase-diagnostics adapter capability"
);
assert(
  findAppAdapter(initResponse.capabilities.appBridge, "ideal-swarm").runKinds.includes("delayedHits"),
  "expected Ideal Swarm delayed-hit adapter capability"
);
assert(
  findAppAdapter(initResponse.capabilities.appBridge, "ideal-swarm").runKinds.includes("sharedGeometry"),
  "expected Ideal Swarm shared-geometry adapter capability"
);
assert(
  findAppAdapter(initResponse.capabilities.appBridge, "animator").runKinds.includes("motionSimulation") &&
    findAppAdapter(initResponse.capabilities.appBridge, "animator").runKinds.includes("pathHistory") &&
    findAppAdapter(initResponse.capabilities.appBridge, "animator").runKinds.includes("appPlayback"),
  "expected Animator motion, path-history, and playback adapter capabilities"
);
assert(
  initResponse.capabilities.appBridge.denseDataTransport.includes("array-buffer") &&
    initResponse.capabilities.appBridge.denseDataTransport.includes("stream-handle"),
  "expected app bridge dense data transport capabilities"
);
assert(
  initResponse.capabilities.appBridge.workerModel.bridgeOwnsWasmLifecycle &&
    !initResponse.capabilities.appBridge.workerModel.appsRequireCppHandling,
  "expected shared bridge to own wasm lifecycle"
);
assert(
  initResponse.capabilities.appBridge.storageFallbacks.transientTarget === "caller-buffer" &&
    initResponse.capabilities.appBridge.storageFallbacks.preferredNativeFileTarget === "native-file" &&
    initResponse.capabilities.appBridge.storageFallbacks.nativeFileTargetAvailable === true &&
    initResponse.capabilities.appBridge.storageFallbacks.unsupportedStorageStatusCode ===
      "unsupported_browser_storage",
  "expected app bridge storage fallback capabilities"
);
assert(
  initResponse.capabilities.appBridge.workPackets.headerSchema === "solver-work-packet.v1" &&
    initResponse.capabilities.appBridge.workPackets.helpers.includes("prepareWorkPacketHeader") &&
    initResponse.capabilities.appBridge.workPackets.helpers.includes(
      "mergeEmissionShellCandidatePacketResponsesF64"
    ) &&
    initResponse.capabilities.appBridge.workPackets.pathHistoryPlanFilters.includes("sourcePathKeys") &&
    initResponse.capabilities.appBridge.workPackets.pathHistoryPlanFilters.includes("receiverPathKeys"),
  "expected app bridge work-packet helpers"
);
assert(initResponse.capabilities.wasmModuleFactory === true, "expected wasm-backed capabilities");
assert(
  initResponse.capabilities.numericSerialization?.schema === "solver-numeric-serialization.v1",
  "expected numeric serialization capability schema"
);
assert(
  initResponse.capabilities.numericSerialization.descriptors.length === 5,
  "expected five numeric serialization descriptors"
);
assert(
  findNumericDescriptor(initResponse.capabilities, "f64").appBufferSafe &&
    findNumericDescriptor(initResponse.capabilities, "f64").authoritativeStorageSafe,
  "expected f64 app and storage descriptor"
);
assert(
  !findNumericDescriptor(initResponse.capabilities, "decimal128").appBufferSafe &&
    findNumericDescriptor(initResponse.capabilities, "decimal128").authoritativeStorageSafe,
  "expected decimal128 storage-only descriptor"
);
assert(
  initResponse.capabilities.errorBudgetPropagation?.schema === "solver-error-budget-propagation.v1",
  "expected error budget propagation capability schema"
);
assert(
  initResponse.capabilities.errorBudgetPropagation.stages.length === 7,
  "expected seven error budget propagation stages"
);
assert(
  initResponse.capabilities.errorBudgetPropagation.authorityLevels.includes("display-only"),
  "expected display-only value authority"
);
assert(
  initResponse.capabilities.validation?.invariantChecks.includes("root_hit_f64"),
  "expected root/hit invariant validation capability"
);
assert(
  initResponse.capabilities.validation?.transitionClassifiers.includes("root_ledger_f64"),
  "expected root-ledger transition validation capability"
);
assert(initResponse.capabilities.abiInfo?.rootRowF64Bytes === 112, "expected root row ABI size");
assert(
  initResponse.capabilities.abiInfo?.rootLedgerDetailRowF64Bytes === 192,
  "expected root-ledger detail row ABI size"
);
assert(initResponse.capabilities.abiInfo?.errorBudgetF64Bytes === 64, "expected error-budget ABI size");
assert(
  initResponse.capabilities.abiInfo?.errorBudgetStageInputF64Bytes === 16,
  "expected error-budget stage input ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.errorBudgetStageRowF64Bytes === 40,
  "expected error-budget stage row ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.errorBudgetSummaryF64Bytes === 32,
  "expected error-budget summary ABI size"
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
  initResponse.capabilities.abiInfo?.delayedPotentialRequestF64Bytes === 144,
  "expected delayed-potential request ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.delayedPotentialRowF64Bytes === 112,
  "expected delayed-potential row ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.circularSelfHitRequestF64Bytes === 48,
  "expected circular self-hit request ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.circularSelfHitRowF64Bytes === 72,
  "expected circular self-hit row ABI size"
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
  initResponse.capabilities.abiInfo?.pathHistoryChunkRowBytes === 104,
  "expected path-history chunk ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.storageLifecyclePolicyBytes === 56,
  "expected storage lifecycle policy ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.pathHistoryLifecycleDecisionRowBytes === 32,
  "expected path-history lifecycle decision ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.spaceTimeIndexRowF64Bytes === 128,
  "expected space-time index row ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.emissionShellBroadPhaseOptionsF64Bytes === 48,
  "expected emission-shell broad-phase options ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.emissionShellCandidateRowF64Bytes === 112,
  "expected emission-shell candidate row ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.emissionShellBroadPhaseSummaryBytes === 32,
  "expected emission-shell broad-phase summary ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.emissionShellNarrowPhaseRequestF64Bytes === 208,
  "expected emission-shell narrow-phase request ABI size"
);
assert(
  initResponse.capabilities.abiInfo?.emissionShellNarrowPhaseRowF64Bytes === 40,
  "expected emission-shell narrow-phase row ABI size"
);
const wasmModule = await createWasmModule({
  locateFile: (fileName) => path.join(wasmDir, fileName),
});
assert(hasSolverCAbi(wasmModule), "expected solver C ABI exports");

const capabilities = await client.capabilities();
assert(capabilities.storage.supportsNativeFile === true, "expected native-file storage capability");
assert(
  capabilities.outputLayouts.includes("root_ledger.v1") &&
    capabilities.outputLayouts.includes("root_ledger_detail.v1") &&
    capabilities.outputLayouts.includes("delayed_hit_events.v1") &&
    capabilities.outputLayouts.includes("spacetime_index.v1") &&
    capabilities.outputLayouts.includes("emission_shell_candidate.v1") &&
    capabilities.outputLayouts.includes("emission_shell_narrow_phase.v1") &&
    capabilities.outputLayouts.includes("assembly_graph_index.v1"),
  "expected root, root-detail, delayed-hit, spacetime, emission-shell, and assembly graph index layouts"
);
assert(
  capabilities.appBridge.apiVersion === SOLVER_APP_BRIDGE_API_VERSION &&
    capabilities.appBridge.workerModel.fallback === "single-solver-worker-or-batch",
  "expected app bridge worker fallback capability"
);
assert(
    capabilities.appBridge.streamQueries.schema === "solver-stream-query-capabilities.v1" &&
    capabilities.appBridge.streamQueries.helpers.includes("createPathHistoryStreamF64") &&
    capabilities.appBridge.streamQueries.helpers.includes("describeStream") &&
    capabilities.appBridge.streamQueries.helpers.includes("readStreamRange") &&
    capabilities.appBridge.streamQueries.helpers.includes("buildPathHistoryStreamSpaceTimeIndexF64") &&
    capabilities.appBridge.streamQueries.helpers.includes("queryEmissionShellCandidatesF64") &&
    capabilities.appBridge.streamQueries.helpers.includes("queryEmissionShellCandidatePacketF64") &&
    capabilities.appBridge.streamQueries.helpers.includes("queryEmissionShellCandidatePacketsF64") &&
    capabilities.appBridge.streamQueries.helpers.includes("refineEmissionShellCandidateRootsF64"),
  "expected app bridge stream-query capabilities"
);
assert(
  capabilities.appBridge.streamQueries.indexedFilters.includes("chunkIndices"),
  "expected app bridge chunk-index stream-query filter"
);
assert(
  capabilities.appBridge.streamQueries.broadPhaseQueries[0].method === "queryEmissionShellCandidatesF64" &&
    capabilities.appBridge.streamQueries.broadPhaseQueries[0].responseSchema ===
      "solver-emission-shell-candidates.v1" &&
    capabilities.appBridge.streamQueries.broadPhaseQueries[0].narrowPhaseAuthorities.includes(
      "solveCausalRootsF64"
    ) &&
    capabilities.appBridge.streamQueries.broadPhaseQueries[0].narrowPhaseAuthorities.includes(
      "solveCausalRootsPrecisionF64"
    ) &&
    capabilities.appBridge.streamQueries.broadPhaseQueries[0].narrowPhaseAuthorities.includes(
      "solveCausalRootsNormalizedF64"
    ) &&
    capabilities.appBridge.streamQueries.broadPhaseQueries[0].narrowPhaseAuthorities.includes(
      "refineEmissionShellCandidateRootsF64"
    ),
  "expected emission-shell broad-phase capability metadata"
);
assert(
  capabilities.appBridge.streamQueries.broadPhaseQueries.some(
    (query) => query.method === "queryEmissionShellCandidatePacketF64"
  ),
  "expected packet-scoped emission-shell broad-phase capability metadata"
);
assert(
  capabilities.appBridge.streamQueries.broadPhaseQueries.some(
    (query) => query.method === "queryEmissionShellCandidatePacketsF64"
  ),
  "expected packet-batch emission-shell broad-phase capability metadata"
);
const invalidWorkerResponse = await dispatchSolverAppWorkerMessage(
  {},
  {
    schema: SOLVER_APP_WORKER_PROTOCOL_VERSION,
    type: "request",
    requestId: "invalid-worker-method",
    method: "missingMethod",
    request: {},
  }
);
assert(
  invalidWorkerResponse.type === "error" &&
    invalidWorkerResponse.status.code === "app_contract_error",
  "expected invalid worker method contract error"
);
assert(
  SOLVER_APP_WORKER_RUNTIME_VERSION === "solver-app-worker-runtime.v1",
  "expected worker runtime version"
);
const runtimeFactoryScope = { createArchitrinoSolverSmoke: createWasmModule };
assert(
  resolveSolverWasmModuleFactory(runtimeFactoryScope) === createWasmModule,
  "expected worker runtime to resolve packaged wasm factory"
);
const runtimeLocateFile = createSolverWasmLocateFile(
  { location: { href: "https://architrino.local/solver/solver-worker.js" } },
  { wasmBaseUrl: "https://architrino.local/solver/" }
);
assert(
  runtimeLocateFile("architrino_solver_wasm_smoke.wasm") ===
    "https://architrino.local/solver/architrino_solver_wasm_smoke.wasm",
  "expected worker runtime locateFile helper"
);
assert(
  shouldAutoInstallSolverAppWorkerRuntime({
    postMessage() {},
    addEventListener() {},
    createArchitrinoSolverSmoke: createWasmModule,
  }),
  "expected worker runtime auto-install readiness"
);
const workerClient = createInProcessSolverAppWorkerClient({
  createWasmModule,
  locateFile: (fileName) => path.join(wasmDir, fileName),
});
const workerInitResponse = await workerClient.init({
  appId: "photon",
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
assert(workerInitResponse.status.code === "ok", "expected worker init status ok");
const workerCapabilities = await workerClient.capabilities();
assert(
  workerCapabilities.appBridge.workerModel.bridgeOwnsWasmLifecycle,
  "expected worker bridge capabilities"
);
const workerRootResponse = await workerClient.solveCausalRootsF64(fixtureRequest.request);
assert(
  workerRootResponse.roots.length === 1 &&
    workerRootResponse.roots[0].distance === 10,
  "expected worker causal-root solve response"
);
const workerNormalizedRootResponse = await workerClient.solveCausalRootsNormalizedF64(
  makeNormalizedCausalRootRequest()
);
assert(
  workerNormalizedRootResponse.roots.length === 1 &&
    workerNormalizedRootResponse.roots[0].coordinateFrame === "origin-normalized" &&
    Math.abs(workerNormalizedRootResponse.roots[0].distance - 1) <= 1e-12,
  "expected worker normalized causal-root solve response"
);
const workerPrecisionRootResponse = await workerClient.solveCausalRootsPrecisionF64({
  rootRequest: makePrecisionRequest(),
  requestedPrecisionPath: "scaled_f64_strict",
  claimLevel: "exported-dataset",
  allowEscalation: true,
  runValidationReplay: true,
  maxRoots: 4,
});
assert(
  workerPrecisionRootResponse.schema === "solver-causal-roots-precision-f64.v1" &&
    workerPrecisionRootResponse.precision.selectedPrecisionPath === "extended_precision" &&
    workerPrecisionRootResponse.precision.validationReplayMatched,
  "expected worker precision causal-root solve response"
);
const workerRootsAndHitsResponse = await workerClient.solveRootsAndHitsF64(fixtureRequest.request);
assert(
  workerRootsAndHitsResponse.streams.length === 1 &&
    workerRootsAndHitsResponse.buffers[0].buffer instanceof ArrayBuffer,
  "expected worker roots/hits dense response"
);
const workerStreamRead = await workerClient.readStreamRange({
  streamId: "causal-root-transient",
  timeRange: { start: 10, end: 10 },
  maxBytes: 240,
});
assert(
  workerStreamRead.status.code === "ok" &&
    workerStreamRead.buffers.length === 2 &&
    workerStreamRead.buffers[0].buffer instanceof ArrayBuffer,
  "expected worker stream readback"
);
const workerCancelStatus = await workerClient.cancelRun({
  runId: "worker-smoke",
  reason: "worker smoke complete",
});
assert(workerCancelStatus.code === "cancelled", "expected worker cancellation status");
await workerClient.dispose();
let disposedWorkerRejected = false;
try {
  await workerClient.capabilities();
} catch (error) {
  disposedWorkerRejected =
    error instanceof SolverBridgeError && error.status.code === "app_contract_error";
}
assert(disposedWorkerRejected, "expected disposed worker client rejection");
const runtimeScope = createManualSolverWorkerScope();
const runtimeInstall = installSolverAppWorkerRuntime(runtimeScope, {
  createWasmModule,
  locateFile: (fileName) => path.join(wasmDir, fileName),
});
runtimeScope.dispatchMessage({
  schema: SOLVER_APP_WORKER_PROTOCOL_VERSION,
  type: "request",
  requestId: "runtime-worker-init",
  method: "init",
  request: {
    appId: "photon",
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
  },
});
const runtimeInitMessage = await runtimeScope.nextPostedMessage();
assert(
  runtimeInitMessage.type === "response" &&
    runtimeInitMessage.response.status.code === "ok",
  "expected installed worker runtime init response"
);
runtimeScope.dispatchMessage({
  schema: SOLVER_APP_WORKER_PROTOCOL_VERSION,
  type: "request",
  requestId: "runtime-worker-roots",
  method: "solveRootsAndHitsF64",
  request: fixtureRequest.request,
});
const runtimeRootsMessage = await runtimeScope.nextPostedMessage();
assert(
  runtimeRootsMessage.type === "response" &&
    runtimeRootsMessage.response.buffers[0].buffer instanceof ArrayBuffer &&
    runtimeScope.postedTransferCounts.some((count) => count >= 2),
  "expected installed worker runtime dense response with transferables"
);
await runtimeInstall.dispose();
const transferProbe = new ArrayBuffer(8);
assert(
  collectTransferables({
    buffers: [transferProbe, new Uint8Array(transferProbe)],
  }).length === 1,
  "expected transferable collection to deduplicate shared buffers"
);
const loopbackWorker = createLoopbackSolverWorker({
  createWasmModule,
  locateFile: (fileName) => path.join(wasmDir, fileName),
});
const transportWorkerClient = createSolverAppWorkerClient(loopbackWorker, {
  requestIdPrefix: "transport-worker",
  requestTimeoutMs: 10000,
  terminateOnDispose: true,
});
const transportWorkerInitResponse = await transportWorkerClient.init({
  appId: "photon",
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
assert(transportWorkerInitResponse.status.code === "ok", "expected transport worker init status ok");
const transportWorkerRootsAndHits = await transportWorkerClient.solveRootsAndHitsF64(fixtureRequest.request);
assert(
  transportWorkerRootsAndHits.buffers[0].buffer instanceof ArrayBuffer &&
    loopbackWorker.responseTransferCounts.some((count) => count >= 2),
  "expected transport worker dense response and transfer list"
);
const transportWorkerRead = await transportWorkerClient.readStreamRange({
  streamId: "causal-root-transient",
  timeRange: { start: 10, end: 10 },
  maxBytes: 240,
});
assert(
  transportWorkerRead.status.code === "ok" &&
    transportWorkerRead.buffers.length === 2 &&
    loopbackWorker.responseTransferCounts.at(-1) >= 2,
  "expected transport worker stream readback with transfer list"
);
await transportWorkerClient.dispose();
assert(loopbackWorker.terminated, "expected transport worker termination after dispose");
let transportDisposedRejected = false;
try {
  await transportWorkerClient.capabilities();
} catch (error) {
  transportDisposedRejected =
    error instanceof SolverBridgeError && error.status.code === "app_contract_error";
}
assert(transportDisposedRejected, "expected disposed transport worker client rejection");
const singleThreadPlan = await client.planThreadingPolicy({
  policy: { mode: "single-thread", deterministic: true },
  workload: {
    stage: "app-playback",
    itemCount: 16,
    minItemsPerWorker: 4,
    deterministicRequired: true,
  },
});
assert(singleThreadPlan.schema === "solver-threading-plan.v1", "expected threading plan schema");
assert(singleThreadPlan.status.code === "ok", "expected single-thread plan status ok");
assert(singleThreadPlan.activeWorkerCount === 1, "expected single-thread active worker count");
assert(singleThreadPlan.schedulingMode === "sequential", "expected sequential scheduling mode");
assert(singleThreadPlan.deterministicReduction, "expected deterministic threading reduction");
const threadedFallbackPlan = await client.planThreadingPolicy({
  policy: { mode: "fixed", maxThreads: 4, deterministic: true },
  workload: {
    stage: "causal-root-batch",
    itemCount: 128,
    minItemsPerWorker: 16,
    deterministicRequired: true,
  },
});
assert(threadedFallbackPlan.requestedWorkerCount === 4, "expected requested worker count");
assert(threadedFallbackPlan.activeWorkerCount === 1, "expected sequential fallback worker count");
assert(threadedFallbackPlan.fallbackReason === "wasm_threads_unavailable", "expected wasm-thread fallback reason");
assert(
  threadedFallbackPlan.status.code === "unsupported_wasm_threads" &&
    threadedFallbackPlan.status.severity === "warning",
  "expected recoverable threading fallback warning"
);
const workPacketHeader = makeWorkPacketHeader();
const preparedWorkPacket = await client.prepareWorkPacketHeader(workPacketHeader);
assert(preparedWorkPacket.schema === "solver-work-packet-header.v1", "expected work-packet header schema");
assert(preparedWorkPacket.status.code === "ok", "expected work-packet header status ok");
assert(preparedWorkPacket.diagnostics.length === 0, "expected valid work-packet diagnostics");
assert(preparedWorkPacket.headerChecksum === "e07f70a306f02a64", "expected canonical work-packet checksum");
assert(
  preparedWorkPacket.serializedHeader.includes("\"expectedOutputs\":[\"root_ledger.v1\",\"delayed_hit_events.v1\"]"),
  "expected canonical work-packet serialization"
);
const invalidWorkPacket = await client.prepareWorkPacketHeader({
  ...workPacketHeader,
  inputBuffers: [
    {
      ...workPacketHeader.inputBuffers[0],
      byteLength: workPacketHeader.inputBuffers[0].byteLength + 1,
    },
  ],
});
assert(invalidWorkPacket.status.code === "app_contract_error", "expected invalid work-packet status");
assert(
  invalidWorkPacket.diagnostics.some((diagnostic) =>
    diagnostic.message.includes("byte length must match row count")
  ),
  "expected invalid work-packet row-size diagnostic"
);
const orderedWorkPacketResults = await client.orderWorkPacketResults({
  results: [
    { packetId: "packet-c", mergeOrder: 2, mergeKey: "b", outputs: [] },
    { packetId: "packet-b", mergeOrder: 1, mergeKey: "a", outputs: [] },
    { packetId: "packet-a", mergeOrder: 0, mergeKey: "a", outputs: [] },
  ],
});
assert(
  orderedWorkPacketResults.schema === "solver-work-packet-result-order.v1" &&
    orderedWorkPacketResults.results.map((result) => result.packetId).join(",") ===
      "packet-a,packet-b,packet-c",
  "expected deterministic work-packet merge order"
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
assert(
  escalatedAdmission.stressSummary.schema === "solver-admission-stress-summary.v1" &&
    escalatedAdmission.stressSummary.dominantStress === "precision" &&
    escalatedAdmission.stressSummary.timeStepCountEstimate === 1000,
  "expected strict admission stress summary"
);
const batchAdmission = await client.admitSimulationEnvelope(
  makeAdmissionRequest({
    errorBudget: { globalTolerance: 1e-9, rootIsolationTolerance: 1e-10 },
    envelope: { entityCount: 4096, latencyTarget: "batch" },
  })
);
assert(batchAdmission.admitted && batchAdmission.decision === "batch", "expected batch admission");
assert(
  batchAdmission.stressSummary.dominantStress === "entity_count" &&
    batchAdmission.stressSummary.entityPressure === 2,
  "expected batch admission entity pressure"
);
const rejectedAdmission = await client.admitSimulationEnvelope(
  makeAdmissionRequest({
    envelope: { memoryBudgetBytes: 1024 },
  })
);
assert(
  !rejectedAdmission.admitted && rejectedAdmission.decision === "reject",
  "expected low-memory admission rejection"
);
assert(
  rejectedAdmission.stressSummary.dominantStress === "memory" &&
    rejectedAdmission.stressSummary.memoryPressure > 1,
  "expected low-memory admission stress summary"
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
  delayedPotentials: [
    {
      source: {
        startTime: 0,
        endTime: 10,
        positionAtStart: { x: 0, y: 0, z: 0 },
        velocity: { x: 0, y: 0, z: 0 },
      },
      samplePoint: { x: 6, y: 0, z: 0 },
      observationTime: 6,
      fieldSpeed: 6,
      normalization: 2,
      softening: 0.08,
      sourceCharge: 3,
      iterations: 4,
      useCausalDenominator: true,
    },
  ],
  circularSelfHitSpans: [{ fieldSpeedRatio: 1.2 }, { fieldSpeedRatio: 1.01 }],
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
assert(geometryResponse.delayedPotentials.length === 1, "expected one delayed-potential row");
assert(
  geometryResponse.delayedPotentials[0].statusCode === 0 &&
    geometryResponse.delayedPotentials[0].usedCausalDenominator &&
    Math.abs(geometryResponse.delayedPotentials[0].tau - 1) <= 1e-10 &&
    Math.abs(geometryResponse.delayedPotentials[0].emissionTime - 5) <= 1e-10 &&
    Math.abs(geometryResponse.delayedPotentials[0].distance - 6) <= 1e-10 &&
    Math.abs(geometryResponse.delayedPotentials[0].kappa - 1) <= 1e-10,
  "expected delayed-potential flight-time diagnostics"
);
assert(
  Math.abs(geometryResponse.delayedPotentials[0].potential - 6 / Math.sqrt(36 + 0.08 * 0.08)) <=
    1e-10,
  "expected delayed-potential value"
);
assert(geometryResponse.circularSelfHitSpans.length === 2, "expected two circular self-hit rows");
assert(
  geometryResponse.circularSelfHitSpans[0].resultKind === "root_solved" &&
    geometryResponse.circularSelfHitSpans[0].rootFound &&
    geometryResponse.circularSelfHitSpans[0].regime === "super_field" &&
    Math.abs(geometryResponse.circularSelfHitSpans[0].span - 2.0534765827345125) <= 1e-10,
  "expected super-field circular self-hit span"
);
assert(
  geometryResponse.circularSelfHitSpans[1].resultKind === "below_threshold" &&
    !geometryResponse.circularSelfHitSpans[1].rootFound &&
    geometryResponse.circularSelfHitSpans[1].span === 0,
  "expected below-threshold circular self-hit span"
);

const assemblyMembershipRows = [
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
];
const assemblyEventsResponse = await client.detectAssemblyMembershipEventsF64({
  memberships: assemblyMembershipRows,
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

const assemblyGraphResponse = await client.buildAssemblyGraphDatasetF64(createAssemblyGraphDatasetRequest({
  assemblyStates: [
    {
      assemblyKey: 7001,
      assemblyStateKey: 7101,
      timeStart: 0,
      timeEnd: 5,
      center: { x: 0.5, y: 0, z: 0 },
      velocity: { x: 0.1, y: 0, z: 0 },
      phase: 0.25,
      cycleIndex: 1,
      modelVersion: 1,
      statusFlags: 0,
      fidelityFlags: 1,
    },
    {
      assemblyKey: 7001,
      assemblyStateKey: 7102,
      timeStart: 5,
      timeEnd: 8,
      center: { x: 1, y: 0, z: 0 },
      velocity: { x: 0.2, y: 0, z: 0 },
      phase: 0.5,
      cycleIndex: 2,
      modelVersion: 1,
      statusFlags: 0,
      fidelityFlags: 1,
    },
  ],
  memberships: assemblyMembershipRows,
  hierarchy: [
    {
      hierarchyKey: 9001,
      parentAssemblyKey: 7001,
      childAssemblyKey: 7002,
      timeStart: 0,
      timeEnd: 8,
      relationType: 1,
      hierarchyVersion: 1,
      statusFlags: 0,
    },
  ],
}));
assert(assemblyGraphResponse.status.code === "ok", "expected assembly graph dataset status ok");
assert(
  assemblyGraphResponse.schema === "solver-assembly-graph-dataset.v1",
  "expected assembly graph dataset schema"
);
assert(
  assemblyGraphResponse.summary.schema === "solver-assembly-graph-summary.v1",
  "expected assembly graph summary schema"
);
assert(assemblyGraphResponse.summary.assemblyStateCount === 2, "expected assembly graph state count");
assert(assemblyGraphResponse.summary.membershipCount === 3, "expected assembly graph membership count");
assert(assemblyGraphResponse.summary.hierarchyCount === 1, "expected assembly graph hierarchy count");
assert(assemblyGraphResponse.summary.eventCount === 2, "expected assembly graph event count");
assert(assemblyGraphResponse.summary.derivedEventCount === 2, "expected derived assembly graph events");
assert(assemblyGraphResponse.summary.eventSource === "derived", "expected derived assembly graph event source");
assert(assemblyGraphResponse.summary.assemblyCount === 2, "expected two assembly keys in summary");
assert(assemblyGraphResponse.summary.pathCount === 1, "expected one path key in summary");
assert(assemblyGraphResponse.summary.timeRange.start === 0, "expected assembly graph time start");
assert(assemblyGraphResponse.summary.timeRange.end === 10, "expected assembly graph time end");
const assemblyStateBuffer = findBuffer(assemblyGraphResponse, "assembly_state.v1");
const assemblyMembershipBuffer = findBuffer(assemblyGraphResponse, "assembly_membership.v1");
const assemblyHierarchyBuffer = findBuffer(assemblyGraphResponse, "assembly_hierarchy.v1");
const assemblyGraphEventBuffer = findBuffer(assemblyGraphResponse, "assembly_events.v1");
assert(assemblyStateBuffer.rowCount === 2, "expected two assembly state buffer rows");
assert(assemblyStateBuffer.buffer.byteLength === 224, "expected assembly state buffer byte length");
assert(assemblyMembershipBuffer.rowCount === 3, "expected three assembly membership buffer rows");
assert(assemblyMembershipBuffer.buffer.byteLength === 240, "expected assembly membership buffer byte length");
assert(assemblyHierarchyBuffer.rowCount === 1, "expected one assembly hierarchy buffer row");
assert(assemblyHierarchyBuffer.buffer.byteLength === 56, "expected assembly hierarchy buffer byte length");
assert(assemblyGraphEventBuffer.rowCount === 2, "expected two assembly graph event buffer rows");
assert(assemblyGraphEventBuffer.buffer.byteLength === 176, "expected assembly graph event buffer byte length");

const assemblyGraphStoreBasePath = path.join(rootDir, ".tmp", "solver-app-bridge-assembly-graphs");
fs.rmSync(assemblyGraphStoreBasePath, { recursive: true, force: true });
const assemblyGraphStoreResponse = await client.createAssemblyGraphStoreF64(
  createAssemblyGraphStoreRequest({
    storeId: "smoke-assembly-graph",
    assemblyStates: assemblyGraphResponse.assemblyStates,
    memberships: assemblyMembershipRows,
    hierarchy: assemblyGraphResponse.hierarchy,
    storagePolicy: {
      target: "native-file",
      durable: true,
      maxBytes: 4096,
      basePath: assemblyGraphStoreBasePath,
    },
  })
);
assert(
  assemblyGraphStoreResponse.schema === "solver-assembly-graph-store.v1",
  "expected assembly graph store response schema"
);
assert(
  assemblyGraphStoreResponse.store.manifestVersion === "solver-assembly-graph-manifest.v1" &&
    assemblyGraphStoreResponse.store.storagePolicy.target === "native-file" &&
    assemblyGraphStoreResponse.store.storagePolicy.durable === true,
  "expected native-file assembly graph store manifest"
);
assert(
  fs.existsSync(assemblyGraphStoreResponse.store.metadataPath) &&
    fs.existsSync(assemblyGraphStoreResponse.store.datasets.states.path) &&
    fs.existsSync(assemblyGraphStoreResponse.store.datasets.memberships.path) &&
    fs.existsSync(assemblyGraphStoreResponse.store.datasets.hierarchy.path) &&
    fs.existsSync(assemblyGraphStoreResponse.store.datasets.events.path) &&
    fs.existsSync(assemblyGraphStoreResponse.store.index.sidecar.filePath),
  "expected assembly graph store files"
);
assert(
  assemblyGraphStoreResponse.store.datasets.memberships.rowCount === 3 &&
    assemblyGraphStoreResponse.store.datasets.events.rowCount === 2 &&
    assemblyGraphStoreResponse.store.datasets.events.byteLength === 176,
  "expected assembly graph store dataset metadata"
);
assert(
  assemblyGraphStoreResponse.store.index.schema === "solver-assembly-graph-index.v1" &&
    assemblyGraphStoreResponse.store.index.rowCount >= 8 &&
    assemblyGraphStoreResponse.store.index.summary.countsByKeyKind.path >= 5 &&
    assemblyGraphStoreResponse.store.index.sidecar.indexLayout === "assembly_graph_index.v1" &&
    assemblyGraphStoreResponse.store.index.sidecar.rowSizeBytes === 72 &&
    assemblyGraphStoreResponse.store.index.sidecar.rowCount === assemblyGraphStoreResponse.store.index.rowCount &&
    assemblyGraphStoreResponse.store.index.sidecar.checksum.length === 16,
  "expected assembly graph store manifest index"
);
const assemblyGraphStoreManifest = JSON.parse(
  fs.readFileSync(assemblyGraphStoreResponse.store.metadataPath, "utf8")
);
assert(
  assemblyGraphStoreManifest.manifestVersion === "solver-assembly-graph-manifest.v1" &&
    assemblyGraphStoreManifest.datasets.events.checksum.length === 16 &&
    assemblyGraphStoreManifest.index.rows.length === assemblyGraphStoreResponse.store.index.rowCount &&
    assemblyGraphStoreManifest.index.sidecar.byteLength ===
      assemblyGraphStoreResponse.store.index.rowCount * 72,
  "expected assembly graph store manifest JSON"
);
const assemblyGraphStoreDescription = await client.describeAssemblyGraphStoreF64(
  createDescribeAssemblyGraphStoreRequest({ storeId: "smoke-assembly-graph" })
);
assert(
  assemblyGraphStoreDescription.schema === "solver-assembly-graph-store-description.v1" &&
    assemblyGraphStoreDescription.buffers.length === 4 &&
    assemblyGraphStoreDescription.buffers.every((buffer) => buffer.storageTarget === "native-file"),
  "expected assembly graph store description"
);
const assemblyGraphStoreRead = await client.readAssemblyGraphStoreRangeF64(
  createAssemblyGraphStoreReadRequest({
    storeId: "smoke-assembly-graph",
    layouts: ["assembly_membership.v1", "assembly_events.v1"],
    rowOffset: 1,
    rowCount: 2,
    pathKey: 5001,
    maxBytes: 512,
  })
);
assert(
  assemblyGraphStoreRead.schema === "solver-assembly-graph-read.v1" &&
    assemblyGraphStoreRead.memberships.length === 2 &&
    assemblyGraphStoreRead.events.length === 1 &&
    assemblyGraphStoreRead.readSummary.indexed &&
    assemblyGraphStoreRead.readSummary.indexedLayoutCount === 2 &&
    assemblyGraphStoreRead.readSummary.indexSkippedRowCount > 0,
  "expected assembly graph store filtered readback"
);
assert(
  assemblyGraphStoreRead.memberships[0].membershipKey === 1002 &&
    assemblyGraphStoreRead.events[0].eventKind === 2,
  "expected assembly graph store row-range read values"
);
const assemblyGraphMembershipRowSize = assemblyGraphStoreResponse.store.datasets.memberships.rowSizeBytes;
const assemblyGraphStoreByteRead = await client.readAssemblyGraphStoreRangeF64(
  createAssemblyGraphStoreReadRequest({
    storeId: "smoke-assembly-graph",
    layouts: ["assembly_membership.v1"],
    byteRange: { start: assemblyGraphMembershipRowSize, end: assemblyGraphMembershipRowSize * 2 },
    maxBytes: 256,
  })
);
assert(
  assemblyGraphStoreByteRead.schema === "solver-assembly-graph-read.v1" &&
    assemblyGraphStoreByteRead.memberships.length === 1 &&
    assemblyGraphStoreByteRead.memberships[0].membershipKey === 1002 &&
    assemblyGraphStoreByteRead.readSummary.indexed &&
    assemblyGraphStoreByteRead.readSummary.indexedLayoutCount === 1 &&
    assemblyGraphStoreByteRead.readSummary.indexRowCount === 1,
  "expected assembly graph store byte-range indexed readback"
);
const reopenedAssemblyGraphStoreDescription = await client.describeAssemblyGraphStoreF64(
  createDescribeAssemblyGraphStoreRequest({
    manifestPath: assemblyGraphStoreResponse.store.metadataPath,
  })
);
assert(
  reopenedAssemblyGraphStoreDescription.store.storeId === "smoke-assembly-graph" &&
    reopenedAssemblyGraphStoreDescription.store.datasets.states.checksum.length === 16 &&
    reopenedAssemblyGraphStoreDescription.store.index.rowCount === assemblyGraphStoreResponse.store.index.rowCount &&
    reopenedAssemblyGraphStoreDescription.store.index.sidecar.checksum ===
      assemblyGraphStoreResponse.store.index.sidecar.checksum,
  "expected assembly graph store manifest reopen"
);
const reopenedAssemblyGraphStoreByteRead = await client.readAssemblyGraphStoreRangeF64(
  createAssemblyGraphStoreReadRequest({
    manifestPath: assemblyGraphStoreResponse.store.metadataPath,
    layouts: ["assembly_membership.v1"],
    byteRange: { start: assemblyGraphMembershipRowSize, end: assemblyGraphMembershipRowSize * 2 },
    maxBytes: 256,
  })
);
assert(
  reopenedAssemblyGraphStoreByteRead.memberships.length === 1 &&
    reopenedAssemblyGraphStoreByteRead.memberships[0].membershipKey === 1002 &&
    reopenedAssemblyGraphStoreByteRead.readSummary.indexed,
  "expected reopened assembly graph store byte-range readback"
);

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
const normalizedRootsResponse = await client.solveCausalRootsNormalizedF64(makeNormalizedCausalRootRequest());
assert(
  normalizedRootsResponse.schema === "solver-causal-roots-normalized-f64.v1" &&
    normalizedRootsResponse.coordinateFrame === "origin-normalized" &&
    normalizedRootsResponse.roots.length === 1,
  "expected normalized causal-root response"
);
assert(
  Math.abs(normalizedRootsResponse.roots[0].emissionTime) <= 1e-12 &&
    Math.abs(normalizedRootsResponse.roots[0].distance - 1) <= 1e-12 &&
    normalizedRootsResponse.roots[0].sourcePoint.x === 0 &&
    normalizedRootsResponse.roots[0].receiverPoint.x === 1,
  "expected normalized causal-root local precision"
);
assert(
  normalizedRootsResponse.absoluteRoots[0].absolutePointAuthority === "display-only" &&
    normalizedRootsResponse.absoluteRoots[0].localReceiverPoint.x === 1,
  "expected normalized causal-root absolute display metadata"
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
const noRootLedgerRequest = normalizeJson(fixtureRequest.request);
noRootLedgerRequest.source.startTime = 6;
noRootLedgerRequest.source.endTime = 10;
const noRootLedgerDetailResponse = await client.buildRootLedgerDetailF64({
  ...noRootLedgerRequest,
  maxRows: 16,
});
assert(noRootLedgerDetailResponse.rows[0].entryKind === 2, "expected no-root inactive gap row");
const retainedTransitionResponse = await client.classifyRootLedgerTransitionsF64({
  priorRows: rootLedgerDetailResponse.rows,
  nextRows: rootLedgerDetailResponse.rows,
});
assert(retainedTransitionResponse.status.code === "ok", "expected retained transition status ok");
assert(
  retainedTransitionResponse.transitions.some((transition) => transition.kind === "retained"),
  "expected retained root transition"
);
const appearedTransitionResponse = await client.classifyRootLedgerTransitionsF64({
  priorRows: noRootLedgerDetailResponse.rows,
  nextRows: rootLedgerDetailResponse.rows,
});
assert(
  appearedTransitionResponse.transitions.some((transition) => transition.kind === "appeared"),
  "expected appeared root transition"
);
const foldedPriorRows = normalizeJson(rootLedgerDetailResponse.rows);
foldedPriorRows[0].jacobianSignStratum = 1;
const foldedTransitionResponse = await client.classifyRootLedgerTransitionsF64({
  priorRows: foldedPriorRows,
  nextRows: rootLedgerDetailResponse.rows,
});
assert(
  foldedTransitionResponse.transitions.some((transition) => transition.kind === "folded"),
  "expected folded root transition"
);
const tailPriorRows = normalizeJson(rootLedgerDetailResponse.rows);
tailPriorRows[0].entryKind = 3;
tailPriorRows[0].rootKey = 0;
const tailTransitionResponse = await client.classifyRootLedgerTransitionsF64({
  priorRows: tailPriorRows,
  nextRows: rootLedgerDetailResponse.rows,
});
assert(
  tailTransitionResponse.transitions.some((transition) => transition.kind === "assimilated_from_tail"),
  "expected assimilated-from-tail root transition"
);
const rerunTransitionResponse = await client.classifyRootLedgerTransitionsF64({
  priorRows: rootLedgerDetailResponse.rows,
  nextRows: rootLedgerFailureDetailResponse.rows,
});
assert(
  rerunTransitionResponse.status.code === "ledger_rerun_required" &&
    rerunTransitionResponse.transitions[0].kind === "ledger_rerun_required",
  "expected ledger rerun transition"
);

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
const precisionSolveResponse = await client.solveCausalRootsPrecisionF64({
  rootRequest: makePrecisionRequest(),
  requestedPrecisionPath: "scaled_f64_strict",
  claimLevel: "exported-dataset",
  allowEscalation: true,
  runValidationReplay: true,
  maxRoots: 4,
});
assert(
  precisionSolveResponse.schema === "solver-causal-roots-precision-f64.v1" &&
    precisionSolveResponse.roots.length === 1 &&
    precisionSolveResponse.precision.selectedPrecisionPath === "extended_precision",
  "expected precision causal-root solve response"
);
assert(
  precisionSolveResponse.precision.selectedNumericType === "decimal128" &&
    precisionSolveResponse.precision.escalated &&
    precisionSolveResponse.precision.validationReplayRun &&
    precisionSolveResponse.precision.validationReplayMatched &&
    precisionSolveResponse.precision.rootTolerance <= 1e-16 &&
    precisionSolveResponse.precision.maxIterations >= 256 &&
    precisionSolveResponse.precision.scanSubdivisions >= 512,
  "expected precision solve summary controls"
);
assert(
  precisionSolveResponse.status.code === "insufficient_scale_resolution" &&
    precisionSolveResponse.status.severity === "warning",
  "expected precision solve to preserve diagnostic warning"
);
const precisionSolveBuffer = findBuffer(precisionSolveResponse, "root_ledger.v1");
assert(precisionSolveBuffer.rowCount === 1, "expected precision solve root buffer");
const rejectedPrecisionSolveResponse = await client.solveCausalRootsPrecisionF64({
  rootRequest: makePrecisionRequest(),
  requestedPrecisionPath: "scaled_f64_fast",
  claimLevel: "validation-evidence",
  allowEscalation: false,
  runValidationReplay: false,
  maxRoots: 4,
});
assert(
  rejectedPrecisionSolveResponse.roots.length === 0 &&
    rejectedPrecisionSolveResponse.precision.selectedPrecisionPath === "validation_replay" &&
    rejectedPrecisionSolveResponse.precision.statusCode === "precision_failed" &&
    rejectedPrecisionSolveResponse.status.code === "precision_failed",
  "expected precision solve to reject disallowed weakening"
);

const errorBudgetResponse = await client.propagateErrorBudgetF64({
  errorBudget: {
    globalTolerance: 1e-9,
    rootIsolationTolerance: 1e-11,
    delayedHitTolerance: 1e-11,
    integrationTolerance: 1e-10,
    streamEncodingTolerance: 1e-10,
    readbackTolerance: 1e-10,
    projectionTolerance: 1e-8,
    displayTolerance: 1e-6,
  },
  stages: [
    { stage: "root_isolation", estimatedAbsoluteError: 2e-11 },
    { stage: "motion_integration", estimatedAbsoluteError: 2e-10 },
  ],
});
assert(errorBudgetResponse.status.code === "precision_escalated", "expected approximate error budget status");
assert(errorBudgetResponse.authority === "approximate", "expected approximate value authority");
assert(errorBudgetResponse.stages.length === 2, "expected two error budget stage rows");
assert(
  errorBudgetResponse.stages[0].stage === "root_isolation" &&
    errorBudgetResponse.stages[0].authority === "approximate",
  "expected root-isolation approximate stage"
);
assert(
  errorBudgetResponse.cumulativeBudgetRatio > 0.2 &&
    errorBudgetResponse.cumulativeBudgetRatio < 0.25,
  "expected propagated cumulative budget ratio"
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
const streamHandle = await client.openStream(
  createOpenStreamRequest({
    runId: "smoke",
    streamId: "causal-root-transient",
    purpose: "diagnostics",
  })
);
assert(streamHandle.streamId === "causal-root-transient", "expected opened transient stream id");
assert(
  streamHandle.readableLayouts.includes("root_ledger.v1") &&
    streamHandle.readableLayouts.includes("delayed_hit_events.v1"),
  "expected stream readable layouts"
);
assert(streamHandle.availableRanges.length === 2, "expected opened stream ranges");
const streamRead = await client.readStreamRange(
  createReadStreamRangeRequest({
    streamId: "causal-root-transient",
    timeRange: { start: 10, end: 10 },
    maxBytes: 240,
  })
);
assert(streamRead.status.code === "ok", "expected stream range read status ok");
assert(streamRead.buffers.length === 2, "expected both transient stream buffers");
assert(streamRead.buffers[0].buffer.byteLength === 112, "expected root stream payload");
assert(streamRead.buffers[1].buffer.byteLength === 128, "expected delayed-hit stream payload");
assertReadbackChecksums(streamRead, "transient stream read");
const delayedHitOnlyRead = await client.readStreamRange(
  createReadStreamRangeRequest({
    streamId: "causal-root-transient",
    byteRange: { start: 112, end: 240 },
  })
);
assert(delayedHitOnlyRead.buffers.length === 1, "expected one byte-range-selected stream buffer");
assert(
  delayedHitOnlyRead.buffers[0].layout === "delayed_hit_events.v1" &&
    delayedHitOnlyRead.buffers[0].buffer.byteLength === 128,
  "expected delayed-hit byte-range payload"
);
assertReadbackChecksums(delayedHitOnlyRead, "delayed-hit stream read");
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
const pathHistoryStream = await client.createPathHistoryStreamF64(
  createPathHistoryStreamRequest({
    runId: "smoke-path-history-run",
    datasetId: "smoke-path-history-dataset",
    streamId: "smoke-path-history",
    pathRows: makePathHistoryRows(),
    rowsPerChunk: 1,
    storagePolicy: {
      target: "caller-buffer",
      durable: false,
      maxBytes: 1024,
    },
    metadata: {
      precisionPath: "scaled_f64_strict",
      units: "solver-si",
      coordinateFrame: "absolute-lab-frame",
      scaleNormalization: "unit-test-scale",
      interpolationRule: "linear-segment",
      provenance: {
        fixture: "path-history-smoke",
      },
      diagnostics: [
        {
          code: "ok",
          severity: "ok",
          message: "path history fixture accepted",
        },
      ],
    },
  })
);
assert(pathHistoryStream.schema === "solver-path-history-stream.v1", "expected path-history stream schema");
assert(pathHistoryStream.status.code === "ok", "expected path-history stream status ok");
assert(pathHistoryStream.summary.rowCount === 3, "expected path-history row count");
assert(pathHistoryStream.summary.chunkCount === 3, "expected path-history chunk count");
assert(pathHistoryStream.summary.pathIndexRowCount === 3, "expected path-history index row count");
assert(pathHistoryStream.summary.pathIndexedChunkCount === 3, "expected path-history indexed chunk count");
assert(pathHistoryStream.summary.byteLength === 288, "expected path-history byte length");
assert(
  pathHistoryStream.summary.metadata.precisionPath === "scaled_f64_strict" &&
    pathHistoryStream.summary.metadata.coordinateFrame === "absolute-lab-frame",
  "expected path-history stream metadata"
);
assert(pathHistoryStream.buffers.length === 3, "expected path-history buffer descriptors");
assert(pathHistoryStream.buffers[0].layout === "path_segment.v1", "expected path-history layout");
assert(pathHistoryStream.buffers[0].checksum.length === 16, "expected path-history buffer checksum");
assert(!("buffer" in pathHistoryStream.buffers[0]), "expected path-history response to omit dense payloads");
const pathHistoryHandle = await client.openStream(
  createOpenStreamRequest({
    runId: "smoke-path-history-run",
    streamId: "smoke-path-history",
    purpose: "playback",
  })
);
assert(pathHistoryHandle.readableLayouts.includes("path_segment.v1"), "expected path-history readable layout");
const pathHistoryDescription = await client.describeStream(
  createDescribeStreamRequest({ streamId: "smoke-path-history" })
);
assert(pathHistoryDescription.schema === "solver-stream-description.v1", "expected stream description schema");
assert(pathHistoryDescription.status.code === "ok", "expected stream description status ok");
assert(
  pathHistoryDescription.stream.metadata.precisionPath === "scaled_f64_strict" &&
    pathHistoryDescription.stream.metadata.provenance.fixture === "path-history-smoke",
  "expected stream description metadata"
);
assert(pathHistoryDescription.buffers.length === 3, "expected stream description buffer metadata");
assert(pathHistoryDescription.buffers[1].checksum.length === 16, "expected stream description checksum");
assert(!("buffer" in pathHistoryDescription.buffers[0]), "expected stream description to omit dense payloads");
assert(pathHistoryDescription.index.schema === "solver-stream-index.v1", "expected stream index schema");
assert(pathHistoryDescription.index.chunkCount === 3, "expected path-history index chunk count");
assert(pathHistoryDescription.index.pathIndexRows.length === 3, "expected per-chunk path-history index rows");
assert(
  pathHistoryDescription.index.pathIndexRows[1].pathKey === 2001 &&
    pathHistoryDescription.index.pathIndexRows[1].byteRange.start === 96,
  "expected path-history index row byte range"
);
const pathHistoryFrameRead = await client.readStreamRange(
  createReadStreamRangeRequest({
    streamId: "smoke-path-history",
    frameRange: { start: 1, end: 1 },
  })
);
assert(pathHistoryFrameRead.status.code === "ok", "expected path-history frame read status ok");
assert(pathHistoryFrameRead.buffers.length === 1, "expected one selected path-history chunk");
assert(pathHistoryFrameRead.buffers[0].rowCount === 1, "expected one selected path-history row");
assertReadbackChecksums(pathHistoryFrameRead, "path-history frame read");
assert(
  pathHistoryFrameRead.diagnostics[0].code === "path_history_indexed_readback" &&
    pathHistoryFrameRead.diagnostics[0].details.indexSkippedRowCount === 0,
  "expected indexed path-history frame readback diagnostics"
);
const pathHistoryView = new DataView(pathHistoryFrameRead.buffers[0].buffer);
assert(Number(pathHistoryView.getBigUint64(0, true)) === 2001, "expected path-history path key readback");
assert(pathHistoryView.getFloat64(16, true) === 1, "expected path-history start time readback");
const pathHistoryChunkRead = await client.readStreamRange(
  createReadStreamRangeRequest({
    streamId: "smoke-path-history",
    chunkIndices: [2],
    maxBytes: 96,
  })
);
assert(pathHistoryChunkRead.status.code === "ok", "expected path-history chunk read status ok");
assert(pathHistoryChunkRead.buffers.length === 1, "expected one chunk-selected path-history buffer");
assert(pathHistoryChunkRead.ranges[0].byteRange.start === 192, "expected chunk-selected byte range");
assertReadbackChecksums(pathHistoryChunkRead, "path-history chunk-index read");
const pathHistoryChunkView = new DataView(pathHistoryChunkRead.buffers[0].buffer);
assert(Number(pathHistoryChunkView.getBigUint64(0, true)) === 2000, "expected chunk-selected path key");
assert(pathHistoryChunkView.getFloat64(16, true) === 2, "expected chunk-selected start time");
const pathHistoryLifecyclePlan = await client.planPathHistoryStorageLifecycleF64(
  createPathHistoryStorageLifecycleRequest({
    streamId: "smoke-path-history",
    policy: {
      activeWindow: { start: 0.5, end: 1.5 },
      deepIndexEnabled: true,
    },
  })
);
assert(
  pathHistoryLifecyclePlan.schema === "solver-path-history-storage-lifecycle.v1",
  "expected path-history lifecycle schema"
);
assert(pathHistoryLifecyclePlan.status.code === "ok", "expected path-history lifecycle status ok");
assert(pathHistoryLifecyclePlan.chunkCount === 3, "expected path-history lifecycle chunk count");
assert(pathHistoryLifecyclePlan.decisions.length === 3, "expected path-history lifecycle decisions");
assert(
  pathHistoryLifecyclePlan.decisions[0].action === "keep_active" &&
    pathHistoryLifecyclePlan.decisions[0].reason === "overlaps_active_window",
  "expected first path-history chunk to stay active"
);
assert(
  pathHistoryLifecyclePlan.decisions[2].action === "blocked_unsafe" &&
    pathHistoryLifecyclePlan.decisions[2].tier === "active" &&
    pathHistoryLifecyclePlan.decisions[2].safeToAgeOut === false,
  "expected pinned path-history chunk to block aging"
);
const nativeFileBasePath = path.join(rootDir, ".tmp", "solver-app-bridge-native-streams");
fs.rmSync(nativeFileBasePath, { recursive: true, force: true });
const nativeFilePathHistoryStream = await client.createPathHistoryStreamF64(
  createPathHistoryStreamRequest({
    runId: "smoke-native-file-path-history-run",
    datasetId: "smoke-native-file-path-history-dataset",
    streamId: "smoke-native-file-path-history",
    pathRows: makePathHistoryRows(),
    rowsPerChunk: 2,
    storagePolicy: {
      target: "native-file",
      durable: true,
      maxBytes: 4096,
      basePath: nativeFileBasePath,
    },
    metadata: {
      precisionPath: "scaled_f64_strict",
      units: "solver-si",
      coordinateFrame: "absolute-lab-frame",
      scaleNormalization: "native-file-smoke",
      interpolationRule: "linear-segment",
    },
  })
);
assert(
  nativeFilePathHistoryStream.stream.storagePolicy.target === "native-file" &&
    nativeFilePathHistoryStream.stream.storagePolicy.durable === true,
  "expected native-file path-history storage policy"
);
assert(
  nativeFilePathHistoryStream.buffers.length === 2 &&
    nativeFilePathHistoryStream.buffers[0].storageTarget === "native-file" &&
    nativeFilePathHistoryStream.buffers[0].filePath &&
    !("buffer" in nativeFilePathHistoryStream.buffers[0]),
  "expected native-file path-history chunk descriptors without payloads"
);
assert(
  fs.existsSync(nativeFilePathHistoryStream.stream.storagePolicy.manifestPath) &&
    fs.existsSync(nativeFilePathHistoryStream.stream.storagePolicy.indexPath) &&
    fs.existsSync(nativeFilePathHistoryStream.buffers[0].filePath),
  "expected native-file path-history manifest, index, and chunk files"
);
const nativeFileManifest = JSON.parse(
  fs.readFileSync(nativeFilePathHistoryStream.stream.storagePolicy.manifestPath, "utf8")
);
assert(
  nativeFileManifest.index?.schema === "solver-stream-index.v1" &&
    nativeFileManifest.index.sidecar?.schema === "solver-stream-index-sidecar.v1" &&
    nativeFileManifest.index.sidecar.rowSizeBytes === 64 &&
    nativeFileManifest.index.sidecar.rowCount === 3 &&
    nativeFileManifest.index.pathIndexRows.length === 3,
  "expected native-file path-history manifest index rows and sidecar"
);
const nativeFileIndexBytes = fs.readFileSync(nativeFileManifest.index.sidecar.filePath);
assert(nativeFileIndexBytes.byteLength === 192, "expected native-file binary index sidecar bytes");
const nativeFileIndexView = new DataView(
  nativeFileIndexBytes.buffer.slice(
    nativeFileIndexBytes.byteOffset,
    nativeFileIndexBytes.byteOffset + nativeFileIndexBytes.byteLength
  )
);
assert(
  Number(nativeFileIndexView.getBigUint64(0, true)) === 2000 &&
    Number(nativeFileIndexView.getBigUint64(8, true)) === 0 &&
    Number(nativeFileIndexView.getBigUint64(16, true)) === 0 &&
    Number(nativeFileIndexView.getBigUint64(24, true)) === 1 &&
    nativeFileIndexView.getFloat64(32, true) === 0 &&
    nativeFileIndexView.getFloat64(40, true) === 1 &&
    Number(nativeFileIndexView.getBigUint64(48, true)) === 0 &&
    Number(nativeFileIndexView.getBigUint64(56, true)) === 96,
  "expected first native-file binary index sidecar row"
);
const nativeFileDescription = await client.describeStream(
  createDescribeStreamRequest({ streamId: "smoke-native-file-path-history" })
);
assert(
  nativeFileDescription.index.pathIndexRows.length === 3 &&
    nativeFileDescription.index.sidecar?.filePath === nativeFileManifest.index.sidecar.filePath &&
    nativeFileDescription.buffers[0].storageTarget === "native-file",
  "expected native-file stream description, index, and sidecar"
);
const nativeFileRead = await client.readStreamRange(
  createReadStreamRangeRequest({
    streamId: "smoke-native-file-path-history",
    frameRange: { start: 1, end: 1 },
  })
);
assert(
  nativeFileRead.status.code === "ok" &&
    nativeFileRead.buffers.length === 1 &&
    nativeFileRead.buffers[0].buffer instanceof ArrayBuffer,
  "expected native-file stream readback with dense selected payload"
);
const nativeFileView = new DataView(nativeFileRead.buffers[0].buffer);
assert(Number(nativeFileView.getBigUint64(0, true)) === 2001, "expected native-file path key readback");
const reopenedNativeFileClient = createSolverAppBridgeClient();
const reopenedNativeFileHandle = await reopenedNativeFileClient.openStream(
  createOpenStreamRequest({
    manifestPath: nativeFilePathHistoryStream.stream.storagePolicy.manifestPath,
    purpose: "diagnostics",
  })
);
assert(
  reopenedNativeFileHandle.streamId === "smoke-native-file-path-history" &&
    reopenedNativeFileHandle.readableLayouts.includes("path_segment.v1") &&
    reopenedNativeFileHandle.availableRanges.length === 2,
  "expected native-file manifest reopen handle"
);
const reopenedNativeFileDescription = await reopenedNativeFileClient.describeStream(
  createDescribeStreamRequest({ streamId: reopenedNativeFileHandle.streamId })
);
assert(
  reopenedNativeFileDescription.index.pathIndexRows.length === nativeFileDescription.index.pathIndexRows.length &&
    reopenedNativeFileDescription.index.sidecar?.checksum === nativeFileDescription.index.sidecar.checksum &&
    reopenedNativeFileDescription.buffers[0].storageTarget === "native-file",
  "expected reopened native-file stream index sidecar"
);
const reopenedNativeFileRead = await reopenedNativeFileClient.readStreamRange(
  createReadStreamRangeRequest({
    streamId: reopenedNativeFileHandle.streamId,
    pathKeys: [2001],
    maxBytes: 96,
  })
);
assert(
  reopenedNativeFileRead.status.code === "ok" &&
    reopenedNativeFileRead.buffers.length === 1 &&
    reopenedNativeFileRead.buffers[0].buffer instanceof ArrayBuffer,
  "expected reopened native-file stream readback"
);
const reopenedNativeFileView = new DataView(reopenedNativeFileRead.buffers[0].buffer);
assert(Number(reopenedNativeFileView.getBigUint64(0, true)) === 2001, "expected reopened native-file path key");
const reopenedNativeFileChunkRead = await reopenedNativeFileClient.readStreamRange(
  createReadStreamRangeRequest({
    streamId: reopenedNativeFileHandle.streamId,
    chunkIndices: [1],
    maxBytes: 96,
  })
);
assert(
  reopenedNativeFileChunkRead.status.code === "ok" &&
    reopenedNativeFileChunkRead.buffers.length === 1 &&
    reopenedNativeFileChunkRead.buffers[0].buffer instanceof ArrayBuffer,
  "expected reopened native-file chunk-index stream readback"
);
const reopenedNativeFileChunkView = new DataView(reopenedNativeFileChunkRead.buffers[0].buffer);
assert(Number(reopenedNativeFileChunkView.getBigUint64(0, true)) === 2000, "expected reopened chunk path key");
assert(reopenedNativeFileChunkView.getFloat64(16, true) === 2, "expected reopened chunk start time");
const nativeFileLifecyclePlan = await client.planPathHistoryStorageLifecycleF64(
  createPathHistoryStorageLifecycleRequest({
    streamId: "smoke-native-file-path-history",
    policy: {
      activeWindow: { start: 0.5, end: 1.5 },
      deepIndexEnabled: true,
    },
  })
);
assert(
  nativeFileLifecyclePlan.status.code === "ok" &&
    nativeFileLifecyclePlan.chunkCount === 2,
  "expected native-file lifecycle planning from file-backed chunks"
);
const nativeFileStreamPath = nativeFilePathHistoryStream.stream.storagePolicy.streamPath;
const nativeFileChunkPath = nativeFilePathHistoryStream.buffers[0].filePath;
const nativeFileCloseStatus = await client.closeRun({
  runId: "smoke-native-file-path-history-run",
  releaseStreams: true,
});
assert(
  nativeFileCloseStatus.code === "ok" &&
    nativeFileCloseStatus.details.releasedStreamCount === 1 &&
    nativeFileCloseStatus.details.deletedNativeFileStreamCount === 1,
  "expected native-file closeRun cleanup status"
);
assert(
  !fs.existsSync(nativeFileStreamPath) &&
    !fs.existsSync(nativeFileChunkPath),
  "expected native-file stream files to be deleted on closeRun"
);
let closedNativeFileStreamRejected = false;
try {
  await client.describeStream(createDescribeStreamRequest({ streamId: "smoke-native-file-path-history" }));
} catch (error) {
  closedNativeFileStreamRejected =
    error instanceof SolverBridgeError && error.status.code === "stream_read_failed";
}
assert(closedNativeFileStreamRejected, "expected closed native-file stream to be unavailable");
await reopenedNativeFileClient.dispose();
const explicitLifecyclePlan = await client.planPathHistoryStorageLifecycleF64(
  createPathHistoryStorageLifecycleRequest({
    policy: {
      activeWindow: { start: 0, end: 1 },
      deepIndexEnabled: true,
    },
    chunks: [
      {
        chunkIndex: 0,
        pathKeyStart: 3000,
        pathKeyEnd: 3000,
        rowOffset: 0,
        rowCount: 1,
        timeRange: { start: 0, end: 1 },
        frameRange: { start: 0, end: 0 },
        byteRange: { start: 0, end: 96 },
        checksum64: "1",
      },
      {
        chunkIndex: 1,
        pathKeyStart: 3001,
        pathKeyEnd: 3001,
        rowOffset: 1,
        rowCount: 1,
        timeRange: { start: 2, end: 3 },
        frameRange: { start: 1, end: 1 },
        byteRange: { start: 96, end: 192 },
        checksum64: "2",
      },
      {
        chunkIndex: 2,
        pathKeyStart: 3002,
        pathKeyEnd: 3002,
        rowOffset: 2,
        rowCount: 1,
        timeRange: { start: 3, end: 4 },
        frameRange: { start: 2, end: 2 },
        byteRange: { start: 192, end: 288 },
        checksum64: "3",
        stateFlags: 2,
      },
    ],
  })
);
assert(explicitLifecyclePlan.decisions[1].action === "build_deep_index", "expected deep-index build action");
assert(
  explicitLifecyclePlan.decisions[1].requiresDeepIndex &&
    explicitLifecyclePlan.decisions[1].reason === "aged_chunk_requires_deep_index",
  "expected lifecycle deep-index requirement"
);
assert(
  explicitLifecyclePlan.decisions[2].action === "archive_cold" &&
    explicitLifecyclePlan.decisions[2].reason === "deep_index_already_built",
  "expected deep-indexed chunk to archive cold"
);
const pathHistoryPacketPlan = await client.planPathHistoryWorkPackets(
  createPathHistoryWorkPacketPlanRequest({
    streamId: "smoke-path-history",
    runId: "smoke-path-history-packet-run",
    modelId: "aaa.central-solver",
    precisionPath: "event_root_focused",
    packetIdPrefix: "smoke-path-history-packet",
    sourceChunkIndices: [0, 1],
    receiverChunkIndices: [1, 2],
    includeSameChunk: false,
  })
);
assert(
  pathHistoryPacketPlan.schema === "solver-path-history-work-packet-plan.v1",
  "expected path-history work-packet plan schema"
);
assert(pathHistoryPacketPlan.status.code === "ok", "expected path-history work-packet plan status ok");
assert(pathHistoryPacketPlan.sourceChunkCount === 2, "expected source chunk count");
assert(pathHistoryPacketPlan.receiverChunkCount === 2, "expected receiver chunk count");
assert(pathHistoryPacketPlan.pathIndexRowCount === 3, "expected packet-plan path index rows");
assert(pathHistoryPacketPlan.pathIndexedChunkCount === 3, "expected packet-plan indexed chunks");
assert(pathHistoryPacketPlan.sourcePathPrunedChunkCount === 0, "expected no source path-pruned chunks");
assert(pathHistoryPacketPlan.receiverPathPrunedChunkCount === 0, "expected no receiver path-pruned chunks");
assert(pathHistoryPacketPlan.chunkPairCount === 3, "expected path-history work-packet chunk pairs");
assert(pathHistoryPacketPlan.packetCount === 3, "expected path-history work-packet count");
assert(
  pathHistoryPacketPlan.packets[0].sourceBlock.start === 0 &&
    pathHistoryPacketPlan.packets[0].receiverBlock.start === 1 &&
    pathHistoryPacketPlan.packets[0].inputBuffers.length === 2 &&
    pathHistoryPacketPlan.packets[0].headerChecksum.length === 16,
  "expected first path-history work-packet header"
);
const orderedPlannedPackets = await client.orderWorkPacketResults({
  results: pathHistoryPacketPlan.packets
    .slice()
    .reverse()
    .map((packet) => ({
      packetId: packet.packetId,
      mergeOrder: packet.mergeOrder,
      mergeKey: packet.mergeKey,
      outputs: [],
    })),
});
assert(
  orderedPlannedPackets.results[0].packetId === pathHistoryPacketPlan.packets[0].packetId,
  "expected planned packets to sort by deterministic merge order"
);
const pathKeyFilteredPacketPlan = await client.planPathHistoryWorkPackets(
  createPathHistoryWorkPacketPlanRequest({
    streamId: "smoke-path-history",
    runId: "smoke-path-history-packet-run-path-keys",
    modelId: "aaa.central-solver",
    precisionPath: "event_root_focused",
    packetIdPrefix: "smoke-path-history-path-key-packet",
    sourcePathKeys: [2000],
    receiverPathKeys: [2001],
    includeSameChunk: false,
  })
);
assert(pathKeyFilteredPacketPlan.status.code === "ok", "expected path-key packet plan status ok");
assert(pathKeyFilteredPacketPlan.sourceChunkCount === 2, "expected path-key source chunks");
assert(pathKeyFilteredPacketPlan.receiverChunkCount === 1, "expected path-key receiver chunks");
assert(pathKeyFilteredPacketPlan.sourcePathPrunedChunkCount === 1, "expected source path-pruned chunk");
assert(pathKeyFilteredPacketPlan.receiverPathPrunedChunkCount === 2, "expected receiver path-pruned chunks");
assert(pathKeyFilteredPacketPlan.chunkPairCount === 2, "expected path-key chunk pairs");
assert(pathKeyFilteredPacketPlan.packetCount === 2, "expected path-key packet count");
const truncatedPathHistoryPacketPlan = await client.planPathHistoryWorkPackets(
  createPathHistoryWorkPacketPlanRequest({
    streamId: "smoke-path-history",
    runId: "smoke-path-history-packet-run-truncated",
    modelId: "aaa.central-solver",
    precisionPath: "event_root_focused",
    sourceChunkIndices: [0, 1],
    receiverChunkIndices: [1, 2],
    maxPacketCount: 2,
  })
);
assert(
  truncatedPathHistoryPacketPlan.status.code === "stream_memory_pressure" &&
    truncatedPathHistoryPacketPlan.chunkPairCount === 4 &&
    truncatedPathHistoryPacketPlan.packetCount === 2,
  "expected truncated path-history work-packet plan"
);
const packetScopedEmissionShellCandidates = await client.queryEmissionShellCandidatesF64(
  createEmissionShellCandidateQueryRequest({
    streamId: "smoke-path-history",
    sourcePathKeys: [2000],
    receiverPathKeys: [2001],
    sourceChunkIndices: [0],
    receiverChunkIndices: [1],
    signalSpeed: 1,
    tolerance: 1e-12,
    workerCount: 2,
  })
);
assert(
  packetScopedEmissionShellCandidates.status.code === "ok",
  "expected packet-scoped emission-shell status ok"
);
assert(
  packetScopedEmissionShellCandidates.pairCount === 1 &&
    packetScopedEmissionShellCandidates.candidateCount === 1,
  "expected packet-scoped emission-shell candidate"
);
assert(
  packetScopedEmissionShellCandidates.candidates[0].sourceChunkIndex === 0 &&
    packetScopedEmissionShellCandidates.candidates[0].receiverChunkIndex === 1,
  "expected packet-scoped emission-shell chunk identity"
);
assertEmissionShellScanSummary(packetScopedEmissionShellCandidates.scanSummary, {
  streamChunkCount: 2,
  skippedChunkCount: 1,
  prunedByTimeChunkCount: 0,
  prunedByPathChunkCount: 0,
  pathIndexRowCount: 3,
  pathIndexedChunkCount: 3,
  indexSkippedRowCount: 0,
  scannedRowCount: 2,
  skippedRowCount: 0,
  uniqueMaterializedRowCount: 2,
  materializedRoleRowCount: 2,
  sourceRowCount: 1,
  receiverRowCount: 1,
  possiblePairUpperBound: 1,
  testedPairCount: 1,
  skippedPairCount: 0,
  rejectedPairCount: 0,
  candidateCount: 1,
  outputByteLength: 152,
  requestedWorkerCount: 2,
  plannedWorkerCount: 1,
});
const packetQueryEmissionShellCandidates = await client.queryEmissionShellCandidatePacketF64(
  createEmissionShellCandidatePacketQueryRequest({
    streamId: "smoke-path-history",
    packet: pathHistoryPacketPlan.packets[0],
    sourcePathKeys: [2000],
    receiverPathKeys: [2001],
    signalSpeed: 1,
    tolerance: 1e-12,
    workerCount: 2,
  })
);
assert(
  packetQueryEmissionShellCandidates.packetId === pathHistoryPacketPlan.packets[0].packetId &&
    packetQueryEmissionShellCandidates.packetMergeOrder === pathHistoryPacketPlan.packets[0].mergeOrder &&
    packetQueryEmissionShellCandidates.packetMergeKey === pathHistoryPacketPlan.packets[0].mergeKey,
  "expected packet query emission-shell packet merge metadata"
);
assertEmissionShellPacketResult(packetQueryEmissionShellCandidates, pathHistoryPacketPlan.packets[0]);
assert(
  packetQueryEmissionShellCandidates.status.code === "ok" &&
    packetQueryEmissionShellCandidates.pairCount === 1 &&
    packetQueryEmissionShellCandidates.candidateCount === 1,
  "expected packet query emission-shell candidate"
);
assertEmissionShellScanSummary(packetQueryEmissionShellCandidates.scanSummary, {
  streamChunkCount: 2,
  skippedChunkCount: 1,
  prunedByTimeChunkCount: 0,
  prunedByPathChunkCount: 0,
  pathIndexRowCount: 3,
  pathIndexedChunkCount: 3,
  indexSkippedRowCount: 0,
  scannedRowCount: 2,
  skippedRowCount: 0,
  uniqueMaterializedRowCount: 2,
  materializedRoleRowCount: 2,
  sourceRowCount: 1,
  receiverRowCount: 1,
  possiblePairUpperBound: 1,
  testedPairCount: 1,
  skippedPairCount: 0,
  rejectedPairCount: 0,
  candidateCount: 1,
  outputByteLength: 152,
  requestedWorkerCount: 2,
  plannedWorkerCount: 1,
});
const packetQueryEmissionShellEmpty = await client.queryEmissionShellCandidatePacketF64(
  createEmissionShellCandidatePacketQueryRequest({
    streamId: "smoke-path-history",
    packet: pathHistoryPacketPlan.packets[1],
    sourcePathKeys: [2000],
    receiverPathKeys: [2001],
    signalSpeed: 1,
    tolerance: 1e-12,
    workerCount: 2,
  })
);
assert(
  packetQueryEmissionShellEmpty.packetId === pathHistoryPacketPlan.packets[1].packetId &&
    packetQueryEmissionShellEmpty.status.code === "ok" &&
    packetQueryEmissionShellEmpty.candidateCount === 0,
  "expected empty packet query emission-shell response"
);
assertEmissionShellPacketResult(packetQueryEmissionShellEmpty, pathHistoryPacketPlan.packets[1]);
const mergedPacketEmissionShellCandidates = await client.mergeEmissionShellCandidatePacketResponsesF64(
  createEmissionShellCandidatePacketMergeRequest({
    responses: [packetQueryEmissionShellEmpty, packetQueryEmissionShellCandidates],
  })
);
assert(
  mergedPacketEmissionShellCandidates.status.code === "ok" &&
    mergedPacketEmissionShellCandidates.pairCount === 1 &&
    mergedPacketEmissionShellCandidates.candidateCount === 1,
  "expected merged packet emission-shell candidate"
);
assert(
  mergedPacketEmissionShellCandidates.candidates[0].sourceChunkIndex === 0 &&
    mergedPacketEmissionShellCandidates.candidates[0].receiverChunkIndex === 1,
  "expected merged packet emission-shell deterministic candidate order"
);
assert(
  mergedPacketEmissionShellCandidates.packetResults.map((result) => result.packetId).join(",") ===
    `${pathHistoryPacketPlan.packets[0].packetId},${pathHistoryPacketPlan.packets[1].packetId}`,
  "expected merged packet emission-shell ordered result refs"
);
assertMergedEmissionShellPacketResults(mergedPacketEmissionShellCandidates, [
  pathHistoryPacketPlan.packets[0],
  pathHistoryPacketPlan.packets[1],
]);
assertEmissionShellScanSummary(
  mergedPacketEmissionShellCandidates.scanSummary,
  {
    streamChunkCount: 3,
    skippedChunkCount: 3,
    prunedByTimeChunkCount: 0,
    prunedByPathChunkCount: 0,
    pathIndexRowCount: 3,
    pathIndexedChunkCount: 3,
    indexSkippedRowCount: 0,
    scannedRowCount: 3,
    skippedRowCount: 0,
    uniqueMaterializedRowCount: 3,
    materializedRoleRowCount: 3,
    sourceRowCount: 2,
    receiverRowCount: 1,
    possiblePairUpperBound: 1,
    testedPairCount: 1,
    skippedPairCount: 0,
    rejectedPairCount: 0,
    candidateCount: 1,
    outputByteLength: 152,
    requestedWorkerCount: 2,
    plannedWorkerCount: 1,
  },
  "packet_merge"
);
const batchPacketEmissionShellCandidates = await client.queryEmissionShellCandidatePacketsF64(
  createEmissionShellCandidatePacketBatchQueryRequest({
    streamId: "smoke-path-history",
    packets: [pathHistoryPacketPlan.packets[1], pathHistoryPacketPlan.packets[0]],
    sourcePathKeys: [2000],
    receiverPathKeys: [2001],
    signalSpeed: 1,
    tolerance: 1e-12,
    workerCount: 2,
  })
);
assert(
  batchPacketEmissionShellCandidates.status.code === "ok" &&
    batchPacketEmissionShellCandidates.pairCount === 1 &&
    batchPacketEmissionShellCandidates.candidateCount === 1,
  "expected packet-batch emission-shell candidate"
);
assert(
  batchPacketEmissionShellCandidates.candidates[0].sourceChunkIndex === 0 &&
    batchPacketEmissionShellCandidates.candidates[0].receiverChunkIndex === 1,
  "expected packet-batch emission-shell deterministic candidate order"
);
assert(
  batchPacketEmissionShellCandidates.packetResults.map((result) => result.packetId).join(",") ===
    `${pathHistoryPacketPlan.packets[0].packetId},${pathHistoryPacketPlan.packets[1].packetId}`,
  "expected packet-batch emission-shell ordered result refs"
);
assertMergedEmissionShellPacketResults(batchPacketEmissionShellCandidates, [
  pathHistoryPacketPlan.packets[0],
  pathHistoryPacketPlan.packets[1],
]);
assertEmissionShellScanSummary(
  batchPacketEmissionShellCandidates.scanSummary,
  {
    streamChunkCount: 3,
    skippedChunkCount: 3,
    prunedByTimeChunkCount: 0,
    prunedByPathChunkCount: 0,
    pathIndexRowCount: 3,
    pathIndexedChunkCount: 3,
    indexSkippedRowCount: 0,
    scannedRowCount: 3,
    skippedRowCount: 0,
    uniqueMaterializedRowCount: 3,
    materializedRoleRowCount: 3,
    sourceRowCount: 2,
    receiverRowCount: 1,
    possiblePairUpperBound: 1,
    testedPairCount: 1,
    skippedPairCount: 0,
    rejectedPairCount: 0,
    candidateCount: 1,
    outputByteLength: 152,
    requestedWorkerCount: 2,
    plannedWorkerCount: 1,
  },
  "packet_merge"
);
await client.createPathHistoryStreamF64({
  runId: "smoke-path-history-wide-run",
  streamId: "smoke-path-history-wide",
  pathRows: makePathHistoryRows(),
  rowsPerChunk: 3,
  storagePolicy: {
    target: "caller-buffer",
    durable: false,
    maxBytes: 1024,
  },
});
const pathHistoryWideDescription = await client.describeStream({ streamId: "smoke-path-history-wide" });
assert(pathHistoryWideDescription.index.chunkCount === 1, "expected one wide path-history index chunk");
assert(pathHistoryWideDescription.index.pathIndexRows.length === 3, "expected contiguous path-key spans");
assert(
  pathHistoryWideDescription.index.pathIndexRows[2].pathKey === 2000 &&
    pathHistoryWideDescription.index.pathIndexRows[2].byteRange.start === 192,
  "expected second path 2000 span"
);
const streamSpaceTimeIndex = await client.buildPathHistoryStreamSpaceTimeIndexF64(
  createPathHistoryStreamSpaceTimeIndexRequest({
    streamId: "smoke-path-history-wide",
    chunkIndices: [0],
    pathKeys: [2000],
    timeRange: { start: 0, end: 1.5 },
    options: { spatialCellSize: 1, timeBinSize: 1, maxCellsPerItem: 128 },
    maxRows: 64,
    maxBytes: 512,
  })
);
assert(streamSpaceTimeIndex.status.code === "ok", "expected stream-backed space-time index status ok");
assert(streamSpaceTimeIndex.rows.length > 0, "expected stream-backed space-time index rows");
assert(streamSpaceTimeIndex.rows.every((row) => row.subjectKey === 2000), "expected stream-backed path filter");
assert(streamSpaceTimeIndex.overflowEntryCount === 0, "expected no stream-backed space-time index overflow");
assert(
  streamSpaceTimeIndex.status.details.selectedRangeCount === 1 &&
    streamSpaceTimeIndex.status.details.selectedPathRowCount === 1,
  "expected chunk-scoped stream-backed index selection details"
);
const streamSpaceTimeIndexBuffer = findBuffer(streamSpaceTimeIndex, "spacetime_index.v1");
assert(
  streamSpaceTimeIndexBuffer.rowCount === streamSpaceTimeIndex.rows.length &&
    streamSpaceTimeIndexBuffer.byteLength === streamSpaceTimeIndex.rows.length * 128,
  "expected stream-backed space-time index buffer"
);
const emissionShellCandidates = await client.queryEmissionShellCandidatesF64({
  streamId: "smoke-path-history-wide",
  sourcePathKeys: [2000],
  receiverPathKeys: [2001],
  signalSpeed: 1,
  tolerance: 1e-12,
  workerCount: 2,
  timeRange: { start: 0, end: 1.5 },
});
assert(
  emissionShellCandidates.schema === "solver-emission-shell-candidates.v1",
  "expected emission-shell candidates schema"
);
assert(emissionShellCandidates.status.code === "ok", "expected emission-shell candidate status ok");
assert(emissionShellCandidates.pairCount === 1, "expected one broad-phase pair checked");
assert(emissionShellCandidates.rejectedPairCount === 0, "expected no rejected broad-phase pairs");
assert(emissionShellCandidates.candidateCount === 1, "expected one emission-shell candidate");
assert(emissionShellCandidates.rejectionRate === 0, "expected zero emission-shell rejection rate");
assert(emissionShellCandidates.candidateRate === 1, "expected full emission-shell candidate rate");
assertEmissionShellScanSummary(emissionShellCandidates.scanSummary, {
  streamChunkCount: 1,
  skippedChunkCount: 0,
  prunedByTimeChunkCount: 0,
  prunedByPathChunkCount: 0,
  pathIndexRowCount: 3,
  pathIndexedChunkCount: 1,
  indexSkippedRowCount: 1,
  scannedRowCount: 2,
  skippedRowCount: 0,
  uniqueMaterializedRowCount: 2,
  materializedRoleRowCount: 2,
  sourceRowCount: 1,
  receiverRowCount: 1,
  possiblePairUpperBound: 1,
  testedPairCount: 1,
  skippedPairCount: 0,
  rejectedPairCount: 0,
  candidateCount: 1,
  outputByteLength: 152,
  requestedWorkerCount: 2,
  plannedWorkerCount: 1,
});
assert(
  emissionShellCandidates.falsePositiveEstimate.testedCandidateCount === 1 &&
    emissionShellCandidates.falsePositiveEstimate.estimatedTruePositiveCount === 1 &&
    emissionShellCandidates.falsePositiveEstimate.estimatedFalsePositiveCount === 0,
  "expected emission-shell false-positive estimate"
);
assert(
  emissionShellCandidates.candidates[0].sourcePathKey === 2000 &&
    emissionShellCandidates.candidates[0].receiverPathKey === 2001 &&
    emissionShellCandidates.candidates[0].candidateKind === "broad_phase_possible",
  "expected emission-shell candidate identity"
);
assert(
  emissionShellCandidates.candidates[0].narrowPhaseEstimate.classification === "sampled_hit",
  "expected sampled narrow-phase hit estimate"
);
assert(
  emissionShellCandidates.candidates[0].radiusUpperBound === 2 &&
    emissionShellCandidates.candidates[0].distanceLowerBound === 0,
  "expected emission-shell candidate bounds"
);
const emissionCandidateBuffer = findBuffer(emissionShellCandidates, "emission_shell_candidate.v1");
const emissionNarrowPhaseBuffer = findBuffer(emissionShellCandidates, "emission_shell_narrow_phase.v1");
assert(
  emissionCandidateBuffer.rowCount === 1 &&
    emissionCandidateBuffer.byteLength === 112 &&
    emissionCandidateBuffer.buffer.byteLength === 112,
  "expected emission-shell candidate dense buffer"
);
assert(
  emissionNarrowPhaseBuffer.rowCount === 1 &&
    emissionNarrowPhaseBuffer.byteLength === 40 &&
    emissionNarrowPhaseBuffer.buffer.byteLength === 40,
  "expected emission-shell narrow-phase dense buffer"
);
const emissionCandidateView = new DataView(emissionCandidateBuffer.buffer);
const emissionNarrowPhaseView = new DataView(emissionNarrowPhaseBuffer.buffer);
assert(
  Number(emissionCandidateView.getBigUint64(0, true)) === 2000 &&
    Number(emissionCandidateView.getBigUint64(8, true)) === 2001 &&
    Number(emissionCandidateView.getBigUint64(32, true)) === 0 &&
    Number(emissionCandidateView.getBigUint64(40, true)) === 0,
  "expected emission-shell candidate buffer identity"
);
assert(
  emissionNarrowPhaseView.getUint32(8, true) === 1 &&
    emissionNarrowPhaseView.getUint32(12, true) === 1 &&
    emissionNarrowPhaseView.getFloat64(32, true) === 0,
  "expected emission-shell narrow-phase buffer sampled hit"
);
const emissionShellRootRefinement = await client.refineEmissionShellCandidateRootsF64(
  createEmissionShellRootRefinementRequest({
    streamId: "smoke-path-history-wide",
    candidates: emissionShellCandidates.candidates,
    signalSpeed: 1,
    tolerance: 1e-12,
    rootTolerance: 1e-12,
    workerCount: 2,
  })
);
assert(
  emissionShellRootRefinement.schema === "solver-emission-shell-root-refinement.v1",
  "expected emission-shell root-refinement schema"
);
assert(emissionShellRootRefinement.status.code === "ok", "expected emission-shell root refinement status ok");
assert(emissionShellRootRefinement.candidateCount === 1, "expected one candidate refined");
assert(emissionShellRootRefinement.processedCandidateCount === 1, "expected one processed refinement item");
assert(emissionShellRootRefinement.attemptedCandidateCount === 1, "expected one attempted refinement");
assert(emissionShellRootRefinement.skippedCandidateCount === 0, "expected no skipped refinement candidates");
assert(emissionShellRootRefinement.status.details.workerCount === 2, "expected refinement worker-count detail");
assert(emissionShellRootRefinement.rootCount >= 1, "expected refined exact root");
assert(
  emissionShellRootRefinement.hitCount === emissionShellRootRefinement.rootCount,
  "expected refined delayed hits for each root"
);
assert(
  emissionShellRootRefinement.items[0].candidateIndex === 0 &&
    emissionShellRootRefinement.items[0].rootOffset === 0 &&
    emissionShellRootRefinement.items[0].rootCount === emissionShellRootRefinement.rootCount &&
    emissionShellRootRefinement.items[0].hitCount === emissionShellRootRefinement.hitCount,
  "expected refinement item offsets and counts"
);
const refinedRootBuffer = findBuffer(emissionShellRootRefinement, "root_ledger.v1");
const refinedHitBuffer = findBuffer(emissionShellRootRefinement, "delayed_hit_events.v1");
assert(
  refinedRootBuffer.rowCount === emissionShellRootRefinement.rootCount &&
    refinedRootBuffer.byteLength === emissionShellRootRefinement.rootCount * 112 &&
    refinedRootBuffer.buffer.byteLength === refinedRootBuffer.byteLength,
  "expected refined root dense buffer"
);
assert(
  refinedHitBuffer.rowCount === emissionShellRootRefinement.hitCount &&
    refinedHitBuffer.byteLength === emissionShellRootRefinement.hitCount * 128 &&
    refinedHitBuffer.buffer.byteLength === refinedHitBuffer.byteLength,
  "expected refined delayed-hit dense buffer"
);
await client.createPathHistoryStreamF64({
  runId: "smoke-emission-shell-benchmark-run",
  streamId: "smoke-emission-shell-benchmark",
  pathRows: makeEmissionShellBenchmarkRows(),
  rowsPerChunk: 3,
  storagePolicy: {
    target: "caller-buffer",
    durable: false,
    maxBytes: 1024,
  },
});
const emissionShellBenchmark = await client.queryEmissionShellCandidatesF64({
  streamId: "smoke-emission-shell-benchmark",
  sourcePathKeys: [4000],
  receiverPathKeys: [4001, 4002],
  signalSpeed: 1,
  tolerance: 1e-12,
});
assert(emissionShellBenchmark.status.code === "ok", "expected emission-shell benchmark status ok");
assert(emissionShellBenchmark.pairCount === 2, "expected two emission-shell benchmark pairs");
assert(emissionShellBenchmark.rejectedPairCount === 1, "expected one rejected emission-shell benchmark pair");
assert(emissionShellBenchmark.candidateCount === 1, "expected one emission-shell benchmark candidate");
assert(emissionShellBenchmark.rejectionRate === 0.5, "expected half of benchmark pairs rejected");
assert(emissionShellBenchmark.candidateRate === 0.5, "expected half of benchmark pairs retained");
assertEmissionShellScanSummary(emissionShellBenchmark.scanSummary, {
  streamChunkCount: 1,
  skippedChunkCount: 0,
  prunedByTimeChunkCount: 0,
  prunedByPathChunkCount: 0,
  pathIndexRowCount: 3,
  pathIndexedChunkCount: 1,
  indexSkippedRowCount: 0,
  scannedRowCount: 3,
  skippedRowCount: 0,
  uniqueMaterializedRowCount: 3,
  materializedRoleRowCount: 3,
  sourceRowCount: 1,
  receiverRowCount: 2,
  possiblePairUpperBound: 2,
  testedPairCount: 2,
  skippedPairCount: 0,
  rejectedPairCount: 1,
  candidateCount: 1,
  outputByteLength: 152,
  requestedWorkerCount: 0,
  plannedWorkerCount: 1,
});
assert(
  emissionShellBenchmark.falsePositiveEstimate.estimatedFalsePositiveCount === 0,
  "expected no sampled false-positive estimate in benchmark fixture"
);
assert(
  emissionShellBenchmark.candidates[0].narrowPhaseEstimate.classification === "sampled_hit",
  "expected benchmark sampled narrow-phase hit estimate"
);
assert(
  findBuffer(emissionShellBenchmark, "emission_shell_candidate.v1").rowCount === 1 &&
    findBuffer(emissionShellBenchmark, "emission_shell_narrow_phase.v1").rowCount === 1,
  "expected benchmark emission-shell dense buffers"
);
const pathHistoryKeyRead = await client.readStreamRange({
  streamId: "smoke-path-history-wide",
  pathKeys: [2000],
});
assert(pathHistoryKeyRead.status.code === "ok", "expected path-history key read status ok");
assert(pathHistoryKeyRead.buffers.length === 1, "expected one path-key-filtered buffer");
assert(pathHistoryKeyRead.buffers[0].rowCount === 2, "expected two path-key-filtered rows");
assert(pathHistoryKeyRead.buffers[0].buffer.byteLength === 192, "expected compacted path-key buffer");
assertReadbackChecksums(pathHistoryKeyRead, "path-history key read");
assert(
  pathHistoryKeyRead.buffers[0].checksum !== pathHistoryWideDescription.buffers[0].checksum,
  "expected compacted path-key readback checksum to differ from full chunk"
);
assert(
  pathHistoryKeyRead.diagnostics[0].code === "path_history_indexed_readback" &&
    pathHistoryKeyRead.diagnostics[0].details.indexSkippedRowCount === 1 &&
    pathHistoryKeyRead.diagnostics[0].details.scannedRowCount === 2,
  "expected indexed path-history key readback diagnostics"
);
const pathHistoryKeyView = new DataView(pathHistoryKeyRead.buffers[0].buffer);
assert(Number(pathHistoryKeyView.getBigUint64(0, true)) === 2000, "expected first filtered path key");
assert(Number(pathHistoryKeyView.getBigUint64(96, true)) === 2000, "expected second filtered path key");
let pathHistoryPressureRejected = false;
try {
  await client.createPathHistoryStreamF64({
    runId: "smoke-path-history-pressure-run",
    streamId: "smoke-path-history-pressure",
    pathRows: makePathHistoryRows(),
    rowsPerChunk: 3,
    storagePolicy: {
      target: "caller-buffer",
      durable: false,
      maxBytes: 128,
    },
  });
} catch (error) {
  pathHistoryPressureRejected =
    error instanceof SolverBridgeError && error.status.code === "stream_memory_pressure";
}
assert(pathHistoryPressureRejected, "expected path-history storage budget rejection");
assert(
  Math.abs(rootsAndHitsResponse.hits[0].unitDirection.x - 1) <= 1e-10 &&
    Math.abs(rootsAndHitsResponse.hits[0].strength - 1) <= 1e-10,
  "expected delayed-hit bridge values"
);
const invariantResponse = await client.checkRootHitInvariantsF64({
  roots: rootsAndHitsResponse.roots,
  hits: rootsAndHitsResponse.hits,
});
assert(invariantResponse.status.code === "ok", "expected root/hit invariant status ok");
assert(invariantResponse.rootCount === 1, "expected invariant root count");
assert(invariantResponse.hitCount === 1, "expected invariant hit count");
const corruptedHitRows = normalizeJson(rootsAndHitsResponse.hits);
corruptedHitRows[0].unitDirection.x = 0.5;
const invariantMismatch = await client.checkRootHitInvariantsF64({
  roots: rootsAndHitsResponse.roots,
  hits: corruptedHitRows,
});
assert(
  invariantMismatch.status.code === "validation_replay_mismatch" &&
    invariantMismatch.status.severity === "error",
  "expected corrupted root/hit invariant mismatch"
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
const phaseSummaryResponse = await client.summarizePhaseAtHitsF64({
  rows: phaseResponse.rows,
});
assert(phaseSummaryResponse.status.code === "ok", "expected phase-at-hit summary status ok");
assert(
  phaseSummaryResponse.summary.schema === "solver-phase-at-hit-summary.v1",
  "expected phase-at-hit summary schema"
);
assert(phaseSummaryResponse.summary.rowCount === 1, "expected phase-at-hit summary row count");
assert(
  phaseSummaryResponse.summary.statusCounts.length === 1 &&
    phaseSummaryResponse.summary.statusCounts[0].statusCode === 0 &&
    phaseSummaryResponse.summary.statusCounts[0].rowCount === 1,
  "expected phase-at-hit summary status counts"
);
assert(
  Math.abs(phaseSummaryResponse.summary.phaseDeltaRange.start + 1 / 3) <= 1e-10 &&
    Math.abs(phaseSummaryResponse.summary.phaseDeltaRange.end + 1 / 3) <= 1e-10,
  "expected phase-at-hit summary phase delta range"
);
assert(
  Math.abs(phaseSummaryResponse.summary.phaseSpreadRange.start - 1 / 3) <= 1e-10 &&
    Math.abs(phaseSummaryResponse.summary.phaseSpreadRange.end - 1 / 3) <= 1e-10 &&
    Math.abs(phaseSummaryResponse.summary.meanPhaseSpread - 1 / 3) <= 1e-10 &&
    Math.abs(phaseSummaryResponse.summary.maxPhaseSpread - 1 / 3) <= 1e-10,
  "expected phase-at-hit summary phase spread"
);
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
const runPrecisionControlDiagnostic = runHandle.response.diagnostics.find(
  (diagnostic) => diagnostic.message === "precision path controls applied to causal-root solve"
);
assert(runPrecisionControlDiagnostic, "expected runSimulation precision-control diagnostic");
assert(
  runPrecisionControlDiagnostic.details.precisionPath === "extended_precision" &&
    runPrecisionControlDiagnostic.details.rootTolerance <= 1e-15 &&
    runPrecisionControlDiagnostic.details.maxIterations >= 256 &&
    runPrecisionControlDiagnostic.details.scanSubdivisions >= 512,
  "expected runSimulation to apply extended-precision root controls"
);
assert(runHandle.response.manifest.schema === "solver-run-manifest.v1", "expected run manifest schema");
assert(runHandle.response.manifest.manifestHash.length === 16, "expected run manifest hash");
assert(runHandle.response.manifest.runId === "smoke-run", "expected run manifest run id");
assert(runHandle.response.manifest.requestId === "smoke-run-request", "expected run manifest request id");
assert(runHandle.response.manifest.datasetId === "smoke-run-dataset", "expected run manifest dataset id");
assert(runHandle.response.manifest.appId === "photon", "expected photon adapter app id");
assert(runHandle.response.manifest.model.modelId === "aaa.central-solver", "expected manifest model id");
assert(
  runHandle.response.manifest.selectedPrecisionPath === "extended_precision",
  "expected run manifest selected precision path"
);
assert(
  runHandle.response.manifest.errorBudget.globalTolerance === 1e-13,
  "expected run manifest error budget"
);
assert(
  runHandle.response.manifest.admission.stressSummary.dominantStress === "precision" &&
    runHandle.response.manifest.admission.stressSummary.timeStepCountEstimate === 1000,
  "expected run manifest admission stress summary"
);
assert(runHandle.response.manifest.buffers.length === 2, "expected run manifest buffer summaries");
assert(
  runHandle.response.manifest.streams[0].streamId === "smoke-run:causal-root-transient",
  "expected run manifest stream summary"
);
assert(runHandle.response.buffers.length === 2, "expected runSimulation buffers");
assert(runHandle.response.streams[0].streamId === "smoke-run:causal-root-transient", "expected run-scoped stream id");
const runStreamRead = await client.readStreamRange({
  streamId: "smoke-run:causal-root-transient",
  maxBytes: 240,
});
assert(runStreamRead.status.code === "ok", "expected run-scoped stream read status ok");
assert(runStreamRead.buffers.length === 2, "expected run-scoped stream buffers");
const runDescription = await client.describeRun({ runId: "smoke-run" });
assert(runDescription.schema === "solver-run-description.v1", "expected run description schema");
assert(runDescription.status.code === "ok", "expected run description status ok");
assert(
  runDescription.manifest.manifestHash === runHandle.response.manifest.manifestHash,
  "expected run description manifest"
);
assert(runDescription.buffers.length === 2, "expected run description buffer metadata");
assert(!("buffer" in runDescription.buffers[0]), "expected run description to omit dense buffer payload");
assert(runDescription.streams[0].availableRanges.length === 2, "expected run description stream ranges");

const normalizedRunHandle = await client.runSimulation(makeNormalizedRunSimulationRequest());
assert(normalizedRunHandle.status.code === "ok", "expected normalized runSimulation status ok");
assert(normalizedRunHandle.requestId === "smoke-normalized-run-request", "expected normalized run request id");
assert(normalizedRunHandle.runId === "smoke-normalized-run", "expected normalized run id");
assert(normalizedRunHandle.response.summary.rootCount === 1, "expected normalized run root count");
assert(
  Math.abs(normalizedRunHandle.response.roots[0].distance - 1) <= 1e-12 &&
    normalizedRunHandle.response.roots[0].sourcePoint.x === 0 &&
    normalizedRunHandle.response.roots[0].receiverPoint.x === 1,
  "expected normalized run roots to remain in local authoritative coordinates"
);
assert(
  normalizedRunHandle.response.diagnostics.some(
    (diagnostic) =>
      diagnostic.message.includes("origin-normalized") &&
      diagnostic.details?.absolutePointAuthority === "display-only"
  ),
  "expected normalized run coordinate authority diagnostic"
);
assert(
  normalizedRunHandle.response.manifest.configHash === "solver-normalized-run-smoke",
  "expected normalized run manifest config hash"
);

const phaseRunHandle = await client.runSimulation(makePhaseDiagnosticsRunSimulationRequest(runHandle.response.roots));
assert(phaseRunHandle.status.code === "ok", "expected phase-diagnostics runSimulation status ok");
assert(phaseRunHandle.requestId === "smoke-phase-diagnostics-run-request", "expected phase-diagnostics request id");
assert(phaseRunHandle.response.summary.rootCount === 1, "expected phase-diagnostics root count");
assert(phaseRunHandle.response.summary.phaseRowCount === 1, "expected phase-diagnostics row count");
assert(phaseRunHandle.response.phaseRows.length === 1, "expected phase-diagnostics rows");
assert(
  Math.abs(phaseRunHandle.response.phaseSummary.phaseSpreadRange.start - 1 / 3) <= 1e-10,
  "expected phase-diagnostics phase spread summary"
);
assert(
  phaseRunHandle.response.manifest.runKind === "phaseDiagnostics" &&
    phaseRunHandle.response.manifest.appId === "photon" &&
    phaseRunHandle.response.manifest.buffers.length === 1 &&
    phaseRunHandle.response.manifest.buffers[0].layout === "phase_at_hit.v1",
  "expected phase-diagnostics run manifest"
);

const pathHistoryRunHandle = await client.runSimulation(makePathHistoryRunSimulationRequest());
assert(pathHistoryRunHandle.status.code === "ok", "expected path-history runSimulation status ok");
assert(pathHistoryRunHandle.requestId === "smoke-path-history-run-request", "expected path-history request id");
assert(pathHistoryRunHandle.response.summary.pathRowCount === 3, "expected path-history run row count");
assert(pathHistoryRunHandle.response.summary.chunkCount === 3, "expected path-history run chunk count");
assert(pathHistoryRunHandle.response.summary.streamCount === 1, "expected path-history stream count");
assert(pathHistoryRunHandle.response.pathHistory.streamId === "smoke-path-history-run:path-history", "expected path-history summary stream id");
assert(pathHistoryRunHandle.response.pathHistory.pathIndexRowCount === 3, "expected run path-history index rows");
assert(pathHistoryRunHandle.response.pathHistory.pathIndexedChunkCount === 3, "expected run path-history indexed chunks");
assert(
  pathHistoryRunHandle.response.manifest.runKind === "pathHistory" &&
    pathHistoryRunHandle.response.manifest.appId === "animator" &&
    pathHistoryRunHandle.response.manifest.streams.length === 1 &&
    pathHistoryRunHandle.response.manifest.streams[0].streamId === "smoke-path-history-run:path-history",
  "expected path-history run manifest"
);
const pathHistoryRunDescription = await client.describeRun({ runId: "smoke-path-history-run" });
assert(pathHistoryRunDescription.streams.length === 1, "expected path-history run description stream");
const pathHistoryRunRead = await client.readStreamRange({
  streamId: "smoke-path-history-run:path-history",
  frameRange: { start: 1, end: 1 },
});
assert(pathHistoryRunRead.status.code === "ok", "expected path-history run stream read status ok");
assert(pathHistoryRunRead.buffers.length === 1, "expected one path-history run selected chunk");
assert(
  pathHistoryRunRead.diagnostics[0].code === "path_history_indexed_readback",
  "expected indexed path-history run readback diagnostics"
);
const pathHistoryRunView = new DataView(pathHistoryRunRead.buffers[0].buffer);
assert(Number(pathHistoryRunView.getBigUint64(0, true)) === 2001, "expected path-history run row readback");

const motionRunHandle = await client.runSimulation(makeMotionRunSimulationRequest());
assert(motionRunHandle.status.code === "ok", "expected motion runSimulation status ok");
assert(motionRunHandle.requestId === "smoke-motion-run-request", "expected motion run request id");
assert(motionRunHandle.runId === "smoke-motion-run", "expected motion run id");
assert(motionRunHandle.response.summary.frameCount === 3, "expected motion run frame count");
assert(
  motionRunHandle.response.manifest.runKind === "motionSimulation" &&
    motionRunHandle.response.manifest.appId === "animator" &&
    motionRunHandle.response.manifest.buffers[0].layout === "frame_buffer.v1",
  "expected motion run manifest"
);
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

const appPlaybackRunHandle = await client.runSimulation(
  makeAppPlaybackRunSimulationRequest(motionRunHandle.response)
);
assert(appPlaybackRunHandle.status.code === "ok", "expected app-playback runSimulation status ok");
assert(appPlaybackRunHandle.requestId === "smoke-app-playback-run-request", "expected app-playback request id");
assert(appPlaybackRunHandle.runId === "smoke-app-playback-run", "expected app-playback run id");
assert(appPlaybackRunHandle.response.summary.frameCount === 3, "expected app-playback frame count");
assert(appPlaybackRunHandle.response.summary.pathCount === 1, "expected app-playback path count");
assert(appPlaybackRunHandle.response.frames[2].position.x === 5, "expected app-playback frames");
assert(
  appPlaybackRunHandle.response.manifest.runKind === "appPlayback" &&
    appPlaybackRunHandle.response.manifest.appId === "animator" &&
    appPlaybackRunHandle.response.manifest.buffers.length === 0,
  "expected app-playback run manifest"
);

const delayedHitRunHandle = await client.runSimulation(makeDelayedHitRunSimulationRequest());
assert(delayedHitRunHandle.status.code === "ok", "expected delayed-hit runSimulation status ok");
assert(delayedHitRunHandle.response.summary.eventCount === 1, "expected delayed-hit run event count");
assert(delayedHitRunHandle.response.hits.length === 1, "expected delayed-hit run rows");
assert(
  delayedHitRunHandle.response.manifest.runKind === "delayedHits" &&
    delayedHitRunHandle.response.manifest.appId === "ideal-swarm" &&
    delayedHitRunHandle.response.manifest.buffers.length === 2,
  "expected delayed-hit run manifest"
);
const normalizedDelayedHitRunHandle = await client.runSimulation(
  makeNormalizedDelayedHitRunSimulationRequest()
);
assert(
  normalizedDelayedHitRunHandle.status.code === "ok" &&
    normalizedDelayedHitRunHandle.response.summary.eventCount === 1 &&
    Math.abs(normalizedDelayedHitRunHandle.response.hits[0].distance - 1) <= 1e-12,
  "expected normalized delayed-hit run response"
);
assert(
  normalizedDelayedHitRunHandle.response.diagnostics.some(
    (diagnostic) =>
      diagnostic.message.includes("origin-normalized") &&
      diagnostic.details?.localHitAuthority === "authoritative"
  ),
  "expected normalized delayed-hit coordinate authority diagnostic"
);

const sharedGeometryRunHandle = await client.runSimulation(makeSharedGeometryRunSimulationRequest());
assert(sharedGeometryRunHandle.status.code === "ok", "expected shared-geometry runSimulation status ok");
assert(sharedGeometryRunHandle.response.geometry.pathBounds.length === 1, "expected shared-geometry bounds");
assert(
  sharedGeometryRunHandle.response.geometry.spherePointIntersections.length === 1,
  "expected shared-geometry sphere rows"
);
assert(
  sharedGeometryRunHandle.response.geometry.delayedPotentials.length === 1,
  "expected shared-geometry delayed-potential rows"
);
assert(
  sharedGeometryRunHandle.response.geometry.circularSelfHitSpans.length === 1,
  "expected shared-geometry circular self-hit rows"
);
assert(sharedGeometryRunHandle.response.summary.eventCount === 4, "expected shared-geometry event count");
assert(
  sharedGeometryRunHandle.response.manifest.runKind === "sharedGeometry" &&
    sharedGeometryRunHandle.response.manifest.buffers.length === 0,
  "expected shared-geometry run manifest"
);

const validationReplayRunHandle = await client.runSimulation(
  makeValidationReplayRunSimulationRequest(normalizeJson(stripRuntimeBuffers(rootsAndHitsResponse)))
);
assert(validationReplayRunHandle.status.code === "ok", "expected validation replay runSimulation status ok");
assert(
  validationReplayRunHandle.response.validationReplay.classification === "baseline_within_tolerance",
  "expected validation replay baseline classification"
);
assert(
  validationReplayRunHandle.response.status.code === "baseline_within_tolerance",
  "expected validation replay status code"
);
assert(
  validationReplayRunHandle.response.manifest.runKind === "validationReplay" &&
    validationReplayRunHandle.response.manifest.selectedPrecisionPath === "extended_precision",
  "expected validation replay run manifest"
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

const disposeNativeFileBasePath = path.join(rootDir, ".tmp", "solver-app-bridge-dispose-streams");
fs.rmSync(disposeNativeFileBasePath, { recursive: true, force: true });
const disposeNativeFilePathHistoryStream = await client.createPathHistoryStreamF64(
  createPathHistoryStreamRequest({
    runId: "smoke-dispose-native-file-run",
    datasetId: "smoke-dispose-native-file-dataset",
    streamId: "smoke-dispose-native-file-path-history",
    pathRows: makePathHistoryRows(),
    rowsPerChunk: 3,
    storagePolicy: {
      target: "native-file",
      durable: true,
      maxBytes: 4096,
      basePath: disposeNativeFileBasePath,
    },
  })
);
const disposeNativeFileStreamPath = disposeNativeFilePathHistoryStream.stream.storagePolicy.streamPath;
assert(fs.existsSync(disposeNativeFileStreamPath), "expected dispose native-file stream before dispose");
await client.dispose();
assert(!fs.existsSync(disposeNativeFileStreamPath), "expected dispose to delete native-file stream files");
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

function makeNormalizedCausalRootRequest() {
  return {
    coordinateOrigin: { x: 1e18, y: -2e18, z: 3e18 },
    localRequest: {
      ...normalizeJson(fixtureRequest.request),
      source: {
        ...normalizeJson(fixtureRequest.request.source),
        positionAtStart: { x: 0, y: 0, z: 0 },
        endTime: 1,
      },
      receiver: {
        ...normalizeJson(fixtureRequest.request.receiver),
        positionAtStart: { x: 1, y: 0, z: 0 },
        endTime: 1,
      },
      hitTime: 1,
      rootTolerance: 1e-15,
      maxRoots: 4,
    },
    restoreAbsolutePoints: true,
  };
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

function makePathHistoryRows() {
  return [
    {
      pathKey: 2000,
      segmentIndex: 0,
      startTime: 0,
      endTime: 1,
      start: { x: 0, y: 0, z: 0 },
      velocity: { x: 1, y: 0, z: 0 },
      errorBound: 1e-12,
      stateFlags: 1,
    },
    {
      pathKey: 2001,
      segmentIndex: 1,
      startTime: 1,
      endTime: 2,
      start: { x: 1, y: 0, z: 0 },
      velocity: { x: 1, y: 1, z: 0 },
      errorBound: 2e-12,
      stateFlags: 2,
    },
    {
      pathKey: 2000,
      segmentIndex: 2,
      startTime: 2,
      endTime: 3,
      start: { x: 2, y: 1, z: 0 },
      velocity: { x: 0, y: 1, z: 1 },
      errorBound: 3e-12,
      stateFlags: 3,
    },
  ];
}

function makeEmissionShellBenchmarkRows() {
  return [
    {
      pathKey: 4000,
      segmentIndex: 0,
      startTime: 0,
      endTime: 1,
      start: { x: 0, y: 0, z: 0 },
      velocity: { x: 1, y: 0, z: 0 },
      errorBound: 1e-12,
      stateFlags: 0,
    },
    {
      pathKey: 4001,
      segmentIndex: 1,
      startTime: 1,
      endTime: 2,
      start: { x: 1, y: 0, z: 0 },
      velocity: { x: 1, y: 0, z: 0 },
      errorBound: 1e-12,
      stateFlags: 0,
    },
    {
      pathKey: 4002,
      segmentIndex: 2,
      startTime: 1,
      endTime: 2,
      start: { x: 100, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      errorBound: 1e-12,
      stateFlags: 0,
    },
  ];
}

function makeWorkPacketHeader() {
  return {
    schema: "solver-work-packet.v1",
    packetId: "packet-0001",
    runId: "run-0001",
    modelId: "aaa.central-solver",
    precisionPath: "event_root_focused",
    sourceBlock: { enabled: true, start: 0, end: 8 },
    receiverBlock: { enabled: true, start: 8, end: 16 },
    pathBlock: { enabled: true, start: 0, end: 4 },
    timeRange: { start: 0, end: 10 },
    expectedOutputs: ["root_ledger.v1", "delayed_hit_events.v1"],
    inputBuffers: [
      {
        bufferId: "path-segments-a",
        layout: "path_segment.v1",
        numericType: "f64",
        byteOffset: 0,
        byteLength: 384,
        rowOffset: 0,
        rowCount: 4,
        checksum: "6bd1ec997778a501",
      },
    ],
    mergeOrder: 12,
    mergeKey: "run-0001:time-0000:source-0000:receiver-0008",
  };
}

function makeRunSimulationRequest() {
  const admission = makeAdmissionRequest();
  return createPhotonCausalRootsRunRequest({
    requestId: "smoke-run-request",
    runId: "smoke-run",
    datasetId: "smoke-run-dataset",
    claimLevel: "interactive-preview",
    precisionPath: "auto",
    configVersion: "solver-run-smoke.v1",
    configHash: "solver-run-smoke",
    model: admission.model,
    envelope: admission.envelope,
    errorBudget: admission.errorBudget,
    rootRequest: fixtureRequest.request,
    output: {
      outputs: ["rootLedger", "delayedHitEvents", "diagnostics"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: 64 * 1024 * 1024,
      deterministic: true,
    },
  });
}

function makeNormalizedRunSimulationRequest() {
  const admission = makeAdmissionRequest();
  return createPhotonCausalRootsRunRequest({
    requestId: "smoke-normalized-run-request",
    runId: "smoke-normalized-run",
    datasetId: "smoke-normalized-run-dataset",
    claimLevel: "interactive-preview",
    precisionPath: "auto",
    configVersion: "solver-normalized-run-smoke.v1",
    configHash: "solver-normalized-run-smoke",
    model: admission.model,
    envelope: admission.envelope,
    errorBudget: admission.errorBudget,
    normalizedRootRequest: makeNormalizedCausalRootRequest(),
    output: {
      outputs: ["rootLedger", "delayedHitEvents", "diagnostics"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: 64 * 1024 * 1024,
      deterministic: true,
    },
  });
}

function makePhaseDiagnosticsRunSimulationRequest(roots) {
  const admission = makeAdmissionRequest();
  return createPhotonPhaseDiagnosticsRunRequest({
    requestId: "smoke-phase-diagnostics-run-request",
    runId: "smoke-phase-diagnostics-run",
    datasetId: "smoke-phase-diagnostics-run-dataset",
    claimLevel: "interactive-preview",
    precisionPath: "auto",
    configVersion: "solver-phase-diagnostics-run-smoke.v1",
    configHash: "solver-phase-diagnostics-run-smoke",
    model: admission.model,
    envelope: admission.envelope,
    errorBudget: admission.errorBudget,
    phaseRequest: {
      roots,
      sourceClock: { period: 2, epoch: 0, phaseOffset: 0 },
      receiverClock: { period: 6, epoch: 0, phaseOffset: 0 },
    },
    output: {
      outputs: ["phaseAtHit", "diagnostics"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: 64 * 1024 * 1024,
      deterministic: true,
    },
  });
}

function makePathHistoryRunSimulationRequest() {
  const admission = makeAdmissionRequest();
  return createPathHistoryRunRequest({
    requestId: "smoke-path-history-run-request",
    runId: "smoke-path-history-run",
    datasetId: "smoke-path-history-run-dataset",
    appId: "animator",
    claimLevel: "interactive-preview",
    precisionPath: "auto",
    configVersion: "solver-path-history-run-smoke.v1",
    configHash: "solver-path-history-run-smoke",
    model: admission.model,
    envelope: admission.envelope,
    errorBudget: admission.errorBudget,
    streamId: "smoke-path-history-run:path-history",
    pathRows: makePathHistoryRows(),
    rowsPerChunk: 1,
    metadata: {
      precisionPath: "scaled_f64_strict",
      units: "solver-si",
      coordinateFrame: "absolute-lab-frame",
      scaleNormalization: "unit-test-scale",
      interpolationRule: "linear-segment",
      provenance: { fixture: "path-history-run-smoke" },
    },
    output: {
      outputs: ["pathStream", "diagnostics"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: 64 * 1024 * 1024,
      deterministic: true,
    },
  });
}

function makeMotionRunSimulationRequest() {
  const admission = makeAdmissionRequest();
  return createAnimatorMotionSimulationRunRequest({
    requestId: "smoke-motion-run-request",
    runId: "smoke-motion-run",
    datasetId: "smoke-motion-run-dataset",
    claimLevel: "interactive-preview",
    precisionPath: "auto",
    configVersion: "solver-motion-run-smoke.v1",
    configHash: "solver-motion-run-smoke",
    model: admission.model,
    envelope: admission.envelope,
    errorBudget: admission.errorBudget,
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
    output: {
      outputs: ["frameBuffer", "diagnostics"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: 64 * 1024 * 1024,
      deterministic: true,
    },
  });
}

function makeAppPlaybackRunSimulationRequest(sourceResponse) {
  const admission = makeAdmissionRequest();
  return createAnimatorAppPlaybackRunRequest({
    requestId: "smoke-app-playback-run-request",
    runId: "smoke-app-playback-run",
    datasetId: "smoke-app-playback-run-dataset",
    claimLevel: "interactive-preview",
    precisionPath: "auto",
    configVersion: "solver-app-playback-run-smoke.v1",
    configHash: "solver-app-playback-run-smoke",
    model: admission.model,
    envelope: admission.envelope,
    errorBudget: admission.errorBudget,
    sourceRunId: sourceResponse.runId,
    sourceDatasetId: sourceResponse.datasetId,
    frames: sourceResponse.frames,
    diagnostics: [
      {
        code: "ok",
        severity: "ok",
        message: "playback source accepted",
      },
    ],
    output: {
      outputs: ["frameBuffer", "diagnostics"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: 64 * 1024 * 1024,
      deterministic: true,
    },
  });
}

function makeDelayedHitRunSimulationRequest() {
  const admission = makeAdmissionRequest();
  return createIdealSwarmDelayedHitsRunRequest({
    requestId: "smoke-delayed-hit-run-request",
    runId: "smoke-delayed-hit-run",
    datasetId: "smoke-delayed-hit-run-dataset",
    claimLevel: "interactive-preview",
    precisionPath: "auto",
    configVersion: "solver-delayed-hit-run-smoke.v1",
    configHash: "solver-delayed-hit-run-smoke",
    model: admission.model,
    envelope: admission.envelope,
    errorBudget: admission.errorBudget,
    rootRequest: fixtureRequest.request,
    output: {
      outputs: ["delayedHitEvents", "diagnostics"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: 64 * 1024 * 1024,
      deterministic: true,
    },
  });
}

function makeNormalizedDelayedHitRunSimulationRequest() {
  const admission = makeAdmissionRequest();
  return createIdealSwarmDelayedHitsRunRequest({
    requestId: "smoke-normalized-delayed-hit-run-request",
    runId: "smoke-normalized-delayed-hit-run",
    datasetId: "smoke-normalized-delayed-hit-run-dataset",
    claimLevel: "interactive-preview",
    precisionPath: "auto",
    configVersion: "solver-normalized-delayed-hit-run-smoke.v1",
    configHash: "solver-normalized-delayed-hit-run-smoke",
    model: admission.model,
    envelope: admission.envelope,
    errorBudget: admission.errorBudget,
    normalizedRootRequest: makeNormalizedCausalRootRequest(),
    output: {
      outputs: ["delayedHitEvents", "diagnostics"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: 64 * 1024 * 1024,
      deterministic: true,
    },
  });
}

function makeSharedGeometryRunSimulationRequest() {
  const admission = makeAdmissionRequest();
  return createIdealSwarmSharedGeometryRunRequest({
    requestId: "smoke-shared-geometry-run-request",
    runId: "smoke-shared-geometry-run",
    datasetId: "smoke-shared-geometry-run-dataset",
    claimLevel: "interactive-preview",
    precisionPath: "auto",
    configVersion: "solver-shared-geometry-run-smoke.v1",
    configHash: "solver-shared-geometry-run-smoke",
    model: admission.model,
    envelope: admission.envelope,
    errorBudget: admission.errorBudget,
    geometryRequest: {
      pathBounds: [
        {
          pathKey: 123,
          segment: {
            startTime: 0,
            endTime: 2,
            positionAtStart: { x: 1, y: 2, z: 3 },
            velocity: { x: 2, y: 0, z: -1 },
            errorBound: 0,
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
      ],
      delayedPotentials: [
        {
          source: {
            startTime: 0,
            endTime: 10,
            positionAtStart: { x: 0, y: 0, z: 0 },
            velocity: { x: 0, y: 0, z: 0 },
          },
          samplePoint: { x: 6, y: 0, z: 0 },
          observationTime: 6,
          fieldSpeed: 6,
          normalization: 2,
          softening: 0.08,
          sourceCharge: 3,
          iterations: 4,
          useCausalDenominator: true,
        },
      ],
      circularSelfHitSpans: [{ fieldSpeedRatio: 1.2 }],
    },
    output: {
      outputs: ["geometryBuffer", "diagnostics"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: 64 * 1024 * 1024,
      deterministic: true,
    },
  });
}

function makeValidationReplayRunSimulationRequest(candidateResponse) {
  const admission = makeAdmissionRequest();
  return createValidationReplayRunRequest({
    requestId: "smoke-validation-replay-run-request",
    runId: "smoke-validation-replay-run",
    datasetId: "smoke-validation-replay-run-dataset",
    appId: "animator",
    claimLevel: "validation-evidence",
    precisionPath: "auto",
    configVersion: "solver-validation-replay-run-smoke.v1",
    configHash: "solver-validation-replay-run-smoke",
    model: admission.model,
    envelope: admission.envelope,
    errorBudget: admission.errorBudget,
    baselineRunId: "fixture-roots-and-hits",
    baselineArtifactHash: "roots-and-hits-f64-smoke",
    replayPrecisionPath: "extended_precision",
    compareLayouts: ["root_ledger.v1", "delayed_hit_events.v1"],
    baselineResponse: fixtureResponse.response,
    candidateResponse,
    tolerance: 1e-10,
    refinementTolerance: 1e-6,
    output: {
      outputs: ["validationArtifacts", "diagnostics"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: 64 * 1024 * 1024,
      deterministic: true,
    },
  });
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

function assertReadbackChecksums(response, label) {
  response.buffers.forEach((buffer, index) => {
    assert(
      buffer.checksum === fnv1a64ArrayBufferHex(buffer.buffer),
      `expected ${label} buffer ${index} checksum to match returned payload`
    );
  });
}

function fnv1a64ArrayBufferHex(buffer) {
  let hash = 0xcbf29ce484222325n;
  const prime = 0x100000001b3n;
  const bytes = new Uint8Array(buffer);
  for (const byte of bytes) {
    hash ^= BigInt(byte);
    hash = (hash * prime) & 0xffffffffffffffffn;
  }
  return hash.toString(16).padStart(16, "0");
}

function findNumericDescriptor(capabilities, numericType) {
  const descriptor = capabilities.numericSerialization.descriptors.find(
    (candidate) => candidate.numericType === numericType
  );
  if (!descriptor) {
    console.error(`Missing numeric descriptor ${numericType}`);
    process.exit(1);
  }
  return descriptor;
}

function findAppAdapter(appBridge, appId) {
  const adapter = appBridge.appAdapters.find((candidate) => candidate.appId === appId);
  if (!adapter) {
    console.error(`Missing app adapter capability ${appId}`);
    process.exit(1);
  }
  return adapter;
}

function stripRuntimeBuffers(response) {
  return {
    ...response,
    buffers: response.buffers.map(({ buffer, ...descriptor }) => descriptor),
  };
}

function assertEmissionShellScanSummary(summary, expected, executionPath = "native_c_abi") {
  assert(
    summary.schema === "solver-emission-shell-scan-summary.v1",
    "expected emission-shell scan summary schema"
  );
  assert(summary.executionPath === executionPath, `expected ${executionPath} emission-shell scan execution path`);
  assert(summary.outputBufferCount === 2, "expected two emission-shell output buffers");
  assert(summary.truncated === false, "expected untruncated emission-shell scan summary");
  for (const [key, value] of Object.entries(expected)) {
    assert(summary[key] === value, `expected emission-shell scan summary ${key}=${value}`);
  }
}

function createLoopbackSolverWorker(options) {
  const handler = createSolverAppWorkerHandler(options);
  const listeners = new Set();
  return {
    requestTransferCounts: [],
    responseTransferCounts: [],
    terminated: false,
    postMessage(message, transferables = []) {
      this.requestTransferCounts.push(transferables.length);
      setTimeout(async () => {
        const response = await handler.handleMessage(message);
        const responseTransferables = collectTransferables(response);
        this.responseTransferCounts.push(responseTransferables.length);
        for (const listener of Array.from(listeners)) {
          listener({ data: response });
        }
      }, 0);
    },
    addEventListener(type, listener) {
      if (type === "message") {
        listeners.add(listener);
      }
    },
    removeEventListener(type, listener) {
      if (type === "message") {
        listeners.delete(listener);
      }
    },
    terminate() {
      this.terminated = true;
      listeners.clear();
      void handler.dispose();
    },
  };
}

function createManualSolverWorkerScope() {
  const listeners = new Set();
  const postedMessages = [];
  const pendingResolvers = [];
  return {
    location: { href: "https://architrino.local/solver/solver-worker.js" },
    postedTransferCounts: [],
    postMessage(message, transferables = []) {
      this.postedTransferCounts.push(transferables.length);
      const resolver = pendingResolvers.shift();
      if (resolver) {
        resolver(message);
      } else {
        postedMessages.push(message);
      }
    },
    addEventListener(type, listener) {
      if (type === "message") {
        listeners.add(listener);
      }
    },
    removeEventListener(type, listener) {
      if (type === "message") {
        listeners.delete(listener);
      }
    },
    dispatchMessage(message) {
      for (const listener of Array.from(listeners)) {
        listener({ data: message });
      }
    },
    nextPostedMessage() {
      if (postedMessages.length > 0) {
        return Promise.resolve(postedMessages.shift());
      }
      return new Promise((resolve) => pendingResolvers.push(resolve));
    },
  };
}

function assertEmissionShellPacketResult(response, packet) {
  assert(
    response.packetResult.packetId === packet.packetId &&
      response.packetResult.mergeOrder === packet.mergeOrder &&
      response.packetResult.mergeKey === packet.mergeKey,
    "expected emission-shell packet result ref to match packet metadata"
  );
  assert(response.packetResult.outputs.length === 2, "expected two emission-shell packet output refs");
  response.packetResult.outputs.forEach((output, index) => {
    const buffer = response.buffers[index];
    assert(output.bufferId === buffer.bufferId, "expected packet output ref buffer id to match response buffer");
    assert(output.layout === buffer.layout, "expected packet output ref layout to match response buffer");
    assert(output.numericType === buffer.numericType, "expected packet output ref numeric type to match response buffer");
    assert(output.byteOffset === buffer.byteOffset, "expected packet output ref byte offset to match response buffer");
    assert(output.byteLength === buffer.byteLength, "expected packet output ref byte length to match response buffer");
    assert(output.rowOffset === 0, "expected packet output ref row offset zero");
    assert(output.rowCount === buffer.rowCount, "expected packet output ref row count to match response buffer");
    assert(output.checksum === fnv1a64ArrayBufferHex(buffer.buffer), "expected packet output checksum");
  });
}

function assertMergedEmissionShellPacketResults(response, packets) {
  assert(response.packetResults.length === packets.length, "expected merged packet result count");
  const candidateBuffer = findBuffer(response, "emission_shell_candidate.v1");
  const narrowPhaseBuffer = findBuffer(response, "emission_shell_narrow_phase.v1");
  let candidateRowOffset = 0;
  let narrowPhaseRowOffset = 0;
  response.packetResults.forEach((result, index) => {
    const packet = packets[index];
    assert(
      result.packetId === packet.packetId &&
        result.mergeOrder === packet.mergeOrder &&
        result.mergeKey === packet.mergeKey,
      "expected merged packet result metadata to match packet"
    );
    const candidateOutput = result.outputs.find((output) => output.layout === "emission_shell_candidate.v1");
    const narrowPhaseOutput = result.outputs.find((output) => output.layout === "emission_shell_narrow_phase.v1");
    assert(candidateOutput.bufferId === candidateBuffer.bufferId, "expected merged candidate output buffer id");
    assert(narrowPhaseOutput.bufferId === narrowPhaseBuffer.bufferId, "expected merged narrow-phase output buffer id");
    assert(candidateOutput.rowOffset === candidateRowOffset, "expected merged candidate output row offset");
    assert(narrowPhaseOutput.rowOffset === narrowPhaseRowOffset, "expected merged narrow-phase output row offset");
    candidateRowOffset += candidateOutput.rowCount;
    narrowPhaseRowOffset += narrowPhaseOutput.rowCount;
  });
  assert(candidateRowOffset === candidateBuffer.rowCount, "expected merged candidate row span coverage");
  assert(narrowPhaseRowOffset === narrowPhaseBuffer.rowCount, "expected merged narrow-phase row span coverage");
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
