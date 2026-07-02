import { createSolverRunRequest } from "../../solver/app/SolverAppAdapters.mjs";
import { resolveSolverAppBridgeClient } from "../../solver/app/SolverAppBridgeClientResolver.mjs";

export const BORG_DYNAMIC_NATIVE_RUNNER_VERSION = "borg-dynamic-native-runner.v1";
export const BORG_DYNAMIC_NATIVE_RUN_SOURCE = "computed-live-native-chunks";

const DEFAULT_MEMORY_BUDGET_BYTES = 64 * 1024 * 1024;
const DEFAULT_TARGET_DURATION = 3000;
const DEFAULT_CHUNK_DURATION = 20;
const DEFAULT_ROWS_PER_CHUNK = 16;
const POSITRINO_STATE_FLAG = 1;
const ELECTRINO_STATE_FLAG = 2;

export function createBorgDynamicNativeRunner(manifest, options = {}) {
  if (!manifest || typeof manifest !== "object") {
    throw new TypeError("Borg dynamic native runner requires a dataset manifest.");
  }
  const config = createBorgDynamicNativeRunConfig(manifest, options);
  let resolvedClient = null;
  let nextInitialStates = createBorgInitialStatesFromFrameRows(
    options.initialFrameRows ?? manifest.currentStateFrames,
    manifest,
    "first",
  );
  let chunkIndex = 0;
  let nextStartTime = config.startTime;
  let targetDuration = config.targetDuration;
  let chunkDuration = config.chunkDuration;
  let disposed = false;

  return {
    schema: BORG_DYNAMIC_NATIVE_RUNNER_VERSION,
    config,
    get nextStartTime() {
      return nextStartTime;
    },
    get targetDuration() {
      return targetDuration;
    },
    get chunkDuration() {
      return chunkDuration;
    },
    get chunkIndex() {
      return chunkIndex;
    },
    canComputeNextChunk() {
      return !disposed && nextStartTime < targetDuration;
    },
    setRunLimits(nextLimits = {}) {
      targetDuration = Math.min(
        config.targetDuration,
        normalizeTargetDuration(
          targetDurationNumber(nextLimits.targetDuration, targetDuration),
          config.startTime,
          config.sampleInterval,
        ),
      );
      chunkDuration = Math.min(
        config.chunkDuration,
        Math.max(config.sampleInterval, positiveNumber(nextLimits.chunkDuration, chunkDuration)),
      );
    },
    async computeNextChunk() {
      if (disposed) {
        throw new Error("Borg dynamic native runner has been disposed.");
      }
      if (nextStartTime >= targetDuration) {
        return createCompleteChunk(config, chunkIndex, nextStartTime);
      }
      const startTime = nextStartTime;
      const chunkEndTime = roundSolverTime(startTime + chunkDuration);
      const endTime = Number.isFinite(targetDuration)
        ? Math.min(targetDuration, chunkEndTime)
        : chunkEndTime;
      const request = createBorgDynamicMasterEquationRunRequest({
        manifest,
        config,
        chunkIndex,
        startTime,
        endTime,
        initialStates: nextInitialStates,
      });
      const client = await getClient();
      const runHandle = await client.runSimulation(request);
      const chunk = normalizeBorgDynamicNativeChunk(runHandle, {
        config,
        chunkIndex,
        request,
      });
      if (chunk.statusCode !== "ok") {
        throw new Error(`Borg dynamic native chunk failed with status ${chunk.statusCode}.`);
      }
      nextInitialStates = createBorgInitialStatesFromFrameRows(
        chunk.frames,
        manifest,
        "last",
      );
      chunkIndex += 1;
      nextStartTime = endTime;
      return chunk;
    },
    async dispose() {
      disposed = true;
      if (resolvedClient?.client && typeof resolvedClient.client.dispose === "function") {
        await resolvedClient.client.dispose();
      }
      resolvedClient = null;
    },
  };

  async function getClient() {
    if (options.solverClient && typeof options.solverClient.runSimulation === "function") {
      return options.solverClient;
    }
    if (resolvedClient?.client) {
      return resolvedClient.client;
    }
    resolvedClient = await resolveSolverAppBridgeClient({
      appId: "borg",
      requiredMethod: "runSimulation",
      options,
      bridgeConfig: options.solverBridge,
      requestedCapabilities: ["masterEquation", "pathHistory", "appPlayback"],
      storagePolicy: {
        target: "caller-buffer",
        durable: false,
        maxBytes: config.memoryBudgetBytes,
      },
      threadingPolicy: {
        mode: "single-thread",
        deterministic: true,
      },
      initRequest: {
        appId: "borg",
        apiVersion: "solver-app-bridge.v1",
        requestedCapabilities: ["masterEquation", "pathHistory", "appPlayback"],
        storagePolicy: {
          target: "caller-buffer",
          durable: false,
          maxBytes: config.memoryBudgetBytes,
        },
        threadingPolicy: {
          mode: "single-thread",
          deterministic: true,
        },
      },
      missingClientMessage:
        "Borg dynamic native runner requires a solver client, worker, or solver WASM module factory.",
    });
    return resolvedClient.client;
  }
}

export function createBorgDynamicNativeRunConfig(manifest, options = {}) {
  const sampleInterval = positiveNumber(
    options.sampleInterval,
    manifest.simulationEnvelope?.sampleInterval ?? 0.2,
  );
  const startTime = finiteNumber(options.startTime, 0);
  const targetDuration = normalizeTargetDuration(
    targetDurationNumber(options.targetDuration, DEFAULT_TARGET_DURATION),
    startTime,
    sampleInterval,
  );
  const chunkDuration = Math.max(
    sampleInterval,
    positiveNumber(options.chunkDuration, DEFAULT_CHUNK_DURATION),
  );
  return Object.freeze({
    schema: BORG_DYNAMIC_NATIVE_RUNNER_VERSION,
    runSource: BORG_DYNAMIC_NATIVE_RUN_SOURCE,
    runnerId: options.runnerId ?? "borg-dynamic-native-runner",
    runIdPrefix: options.runIdPrefix ?? "borg-dynamic-native-run",
    datasetIdPrefix: options.datasetIdPrefix ?? "borg-dynamic-native-dataset",
    requestIdPrefix: options.requestIdPrefix ?? "borg-dynamic-native-request",
    streamIdPrefix: options.streamIdPrefix ?? "borg-dynamic-native:path-history",
    startTime,
    targetDuration,
    chunkDuration,
    sampleInterval,
    rowsPerChunk: positiveInteger(options.rowsPerChunk, DEFAULT_ROWS_PER_CHUNK),
    memoryBudgetBytes: positiveInteger(options.memoryBudgetBytes, DEFAULT_MEMORY_BUDGET_BYTES),
    fixedPhysicalParameterSetId:
      options.fixedPhysicalParameterSetId ??
      manifest.sourceBridgeRun?.fixedPhysicalParameterSetId ??
      "borg-fixed-physical-parameters.v1",
    masterEquationVersion:
      options.masterEquationVersion ??
      manifest.nativeMasterEquationProbe?.masterEquationVersion ??
      "master-equation-fixed-parameter-v1",
    forceLawVersion:
      options.forceLawVersion ??
      manifest.nativeMasterEquationProbe?.forceLawVersion ??
      "architrino-master-equation-v1",
    fieldSpeed: positiveNumber(
      options.fieldSpeed,
      manifest.simulationEnvelope?.fieldSpeed ?? 3,
    ),
    historyDepth: Math.max(
      0,
      finiteNumber(options.historyDepth, manifest.simulationEnvelope?.historyDepth ?? 10),
    ),
    integrationTolerance: Math.max(
      0,
      finiteNumber(
        options.integrationTolerance,
        manifest.sourceBridgeRun?.fixedPhysicalParameters?.integrationTolerance ?? 1e-11,
      ),
    ),
  });
}

export function createBorgDynamicMasterEquationRunRequest({
  manifest,
  config,
  chunkIndex,
  startTime,
  endTime,
  initialStates,
}) {
  const maxFrames = Math.floor((endTime - startTime) / config.sampleInterval) + 1;
  return createSolverRunRequest({
    requestId: `${config.requestIdPrefix}:chunk-${chunkIndex}`,
    runId: `${config.runIdPrefix}:chunk-${chunkIndex}`,
    datasetId: `${config.datasetIdPrefix}:chunk-${chunkIndex}`,
    appId: "borg",
    runKind: "masterEquation",
    claimLevel: "developer-test",
    precisionPath: "auto",
    configVersion: BORG_DYNAMIC_NATIVE_RUNNER_VERSION,
    configHash: `${BORG_DYNAMIC_NATIVE_RUNNER_VERSION}:chunked-live-native`,
    model: {
      modelId: "aaa.central-solver",
      equationVersion: config.masterEquationVersion,
      forceLawVersion: config.forceLawVersion,
      constantsHash: "constants:borg-fixed-physical-parameters",
      causalSpeedPolicy: "fixed-field-speed",
      branchPolicy: "all-positive-roots",
      unitConvention: "solver-si",
      compatiblePrecisionPaths: ["scaled_f64_strict", "event_root_focused", "extended_precision"],
    },
    envelope: {
      entityCount: initialStates.length,
      assemblyCount: 0,
      timeWindow: {
        start: startTime,
        end: endTime,
        stepHint: config.sampleInterval,
        units: "solver-time",
      },
      timeResolutionHint: config.sampleInterval,
      interactionPolicy: "all-to-all",
      expectedBranchComplexity: "moderate",
      outputDetail: "playback",
      memoryBudgetBytes: config.memoryBudgetBytes,
      storageBudgetBytes: config.memoryBudgetBytes,
      latencyTarget: "interactive",
      simplificationPolicy: "none",
    },
    errorBudget: {
      globalTolerance: 1e-12,
      rootIsolationTolerance: 1e-12,
      delayedHitTolerance: 1e-12,
      integrationTolerance: config.integrationTolerance,
      streamEncodingTolerance: 1e-12,
      readbackTolerance: 1e-12,
      projectionTolerance: 1e-9,
      displayTolerance: 1e-6,
    },
    config: {
      appId: "borg",
      fallbackPolicy: "fail-closed",
      masterEquationRequest: {
        startTime,
        endTime,
        step: config.sampleInterval,
        maxFrames,
        fixedPhysicalParameterSetId: config.fixedPhysicalParameterSetId,
        masterEquationVersion: config.masterEquationVersion,
        forceLawVersion: config.forceLawVersion,
        fieldSpeed: config.fieldSpeed,
        historyDepth: config.historyDepth,
        integrationTolerance: config.integrationTolerance,
        initialStates: initialStates.map((state) => cloneInitialState(state)),
      },
      streamId: `${config.streamIdPrefix}:chunk-${chunkIndex}`,
      rowsPerChunk: config.rowsPerChunk,
      storagePolicy: {
        target: "caller-buffer",
        durable: false,
        maxBytes: config.memoryBudgetBytes,
      },
      metadata: {
        schema: BORG_DYNAMIC_NATIVE_RUNNER_VERSION,
        source: BORG_DYNAMIC_NATIVE_RUN_SOURCE,
        sourceManifestId: manifest.manifestId,
        sourceModelContractId: manifest.modelContractId,
        dynamicChunkIndex: chunkIndex,
        precisionPath: "scaled_f64_strict",
        units: "solver-si",
        coordinateFrame: "absolute-lab-frame",
        scaleNormalization: "borg-dynamic-native-runner-units",
        interpolationRule: "native-master-equation-integration",
        valueAuthority: "authoritative",
        appBufferAuthority: "authoritative",
        provenance: {
          runKind: "masterEquation",
          source: "borg-dynamic-native-runner",
          fixedPhysicalParameterSetId: config.fixedPhysicalParameterSetId,
        },
      },
    },
    output: {
      outputs: ["summary", "diagnostics"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: config.memoryBudgetBytes,
      deterministic: true,
    },
  });
}

export function normalizeBorgDynamicNativeChunk(runHandle = {}, { config, chunkIndex, request } = {}) {
  const response = runHandle.response ?? runHandle;
  const statusCode = response.status?.code ?? runHandle.status?.code ?? "unknown";
  const frames = Array.isArray(response.frames)
    ? response.frames.map((frame) => normalizeBorgDynamicFrame(frame, config, chunkIndex))
    : [];
  return Object.freeze({
    schema: BORG_DYNAMIC_NATIVE_RUNNER_VERSION,
    source: BORG_DYNAMIC_NATIVE_RUN_SOURCE,
    chunkIndex,
    requestId: request?.requestId ?? runHandle.requestId ?? "",
    runId: response.runId ?? runHandle.runId ?? request?.runId ?? "",
    datasetId: response.datasetId ?? runHandle.datasetId ?? request?.datasetId ?? "",
    statusCode,
    startTime: request?.config?.masterEquationRequest?.startTime ?? frames[0]?.time ?? null,
    endTime: request?.config?.masterEquationRequest?.endTime ?? frames.at(-1)?.time ?? null,
    sampleInterval: config.sampleInterval,
    nativeKeyframeCount: new Set(frames.map((frame) => frame.frameIndex)).size,
    bufferCount: Array.isArray(response.buffers) ? response.buffers.length : 0,
    bufferByteLength: estimateResponseBufferByteLength(response.buffers),
    frames: Object.freeze(frames),
    pathHistory: response.pathHistory ?? null,
    diagnostics: Object.freeze([...(response.diagnostics ?? [])]),
    masterEquation: response.masterEquation ?? null,
    summary: response.summary ?? null,
  });
}

export function createBorgInitialStatesFromFrameRows(frames = [], manifest = {}, selection = "first") {
  const selected = new Map();
  frames.forEach((frame) => {
    const pathKey = Number(frame.pathKey);
    if (!Number.isFinite(pathKey)) {
      return;
    }
    const existing = selected.get(pathKey);
    if (!existing || shouldSelectFrame(frame, existing, selection)) {
      selected.set(pathKey, frame);
    }
  });
  return [...selected.values()]
    .sort((left, right) => left.pathKey - right.pathKey)
    .map((frame) => ({
      pathKey: frame.pathKey,
      initialPosition: cloneVector(frame.position),
      initialVelocity: cloneVector(frame.velocity),
      charge: chargeForStateFlags(frame.stateFlags, manifest),
      stateFlags: frame.stateFlags ?? 0,
    }));
}

export function createBorgFrameSetsFromRows(frames = []) {
  const frameSet = new Map();
  frames.forEach((frame) => {
    const frameIndex = Number(frame.frameIndex) || 0;
    const rows = frameSet.get(frameIndex) ?? [];
    rows.push(frame);
    frameSet.set(frameIndex, rows);
  });
  return [...frameSet.entries()]
    .sort(([left], [right]) => left - right)
    .map(([frameIndex, rows]) =>
      Object.freeze({
        frameIndex,
        time: rows[0]?.time ?? frameIndex,
        frames: Object.freeze(rows.slice().sort((left, right) => left.pathKey - right.pathKey)),
      }),
    );
}

export function mergeBorgFrameRows(existingFrames = [], incomingFrames = []) {
  const byKey = new Map();
  existingFrames.forEach((frame) => {
    byKey.set(frameRowKey(frame), frame);
  });
  incomingFrames.forEach((frame) => {
    byKey.set(frameRowKey(frame), frame);
  });
  return [...byKey.values()].sort((left, right) => {
    const frameDelta = left.frameIndex - right.frameIndex;
    return frameDelta !== 0 ? frameDelta : left.pathKey - right.pathKey;
  });
}

function normalizeBorgDynamicFrame(frame, config, chunkIndex) {
  const time = finiteNumber(frame.time, 0);
  const frameIndex = Math.max(0, Math.round((time - config.startTime) / config.sampleInterval));
  return Object.freeze({
    ...frame,
    frameIndex,
    time,
    position: cloneVector(frame.position),
    velocity: cloneVector(frame.velocity),
    dynamicChunkIndex: chunkIndex,
    runSource: BORG_DYNAMIC_NATIVE_RUN_SOURCE,
    valueAuthority: "authoritative-solver-output",
  });
}

function createCompleteChunk(config, chunkIndex, time) {
  return Object.freeze({
    schema: BORG_DYNAMIC_NATIVE_RUNNER_VERSION,
    source: BORG_DYNAMIC_NATIVE_RUN_SOURCE,
    chunkIndex,
    statusCode: "complete",
    startTime: time,
    endTime: time,
    sampleInterval: config.sampleInterval,
    nativeKeyframeCount: 0,
    bufferCount: 0,
    bufferByteLength: 0,
    frames: Object.freeze([]),
    pathHistory: null,
    diagnostics: Object.freeze([]),
    masterEquation: null,
    summary: null,
  });
}

function shouldSelectFrame(candidate, existing, selection) {
  const candidateTime = Number(candidate.time);
  const existingTime = Number(existing.time);
  if (selection === "last") {
    return candidateTime > existingTime;
  }
  return candidateTime < existingTime;
}

function chargeForStateFlags(stateFlags, manifest = {}) {
  if (stateFlags === POSITRINO_STATE_FLAG) {
    return manifest.initialConditions?.positrinoCharge ?? 1;
  }
  if (stateFlags === ELECTRINO_STATE_FLAG) {
    return manifest.initialConditions?.electrinoCharge ?? -1;
  }
  return 0;
}

function cloneInitialState(state) {
  return {
    pathKey: state.pathKey,
    initialPosition: cloneVector(state.initialPosition),
    initialVelocity: cloneVector(state.initialVelocity),
    charge: state.charge,
    stateFlags: state.stateFlags ?? 0,
  };
}

function cloneVector(vector = {}) {
  return {
    x: finiteNumber(vector.x, 0),
    y: finiteNumber(vector.y, 0),
    z: finiteNumber(vector.z, 0),
  };
}

function estimateResponseBufferByteLength(buffers) {
  if (!Array.isArray(buffers)) {
    return 0;
  }
  return buffers.reduce((sum, buffer) => sum + estimateBufferByteLength(buffer), 0);
}

function estimateBufferByteLength(buffer) {
  const directByteLength = finitePositiveByteLength(buffer?.byteLength);
  if (directByteLength != null) {
    return directByteLength;
  }
  const payloadByteLength =
    finitePositiveByteLength(buffer?.buffer?.byteLength) ??
    finitePositiveByteLength(buffer?.data?.byteLength) ??
    finitePositiveByteLength(buffer?.arrayBuffer?.byteLength);
  if (payloadByteLength != null) {
    return payloadByteLength;
  }
  const rowCount = finitePositiveByteLength(buffer?.rowCount);
  const rowSizeBytes =
    finitePositiveByteLength(buffer?.rowSizeBytes) ??
    finitePositiveByteLength(buffer?.rowByteLength) ??
    finitePositiveByteLength(buffer?.rowBytes);
  if (rowCount != null && rowSizeBytes != null) {
    return rowCount * rowSizeBytes;
  }
  return 0;
}

function finitePositiveByteLength(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

function frameRowKey(frame) {
  return `${frame.frameIndex}:${frame.pathKey}`;
}

function finiteNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function targetDurationNumber(value, fallback) {
  if (value === "forever" || value === Number.POSITIVE_INFINITY) {
    return Number.POSITIVE_INFINITY;
  }
  return positiveNumber(value, fallback);
}

function normalizeTargetDuration(value, startTime, sampleInterval) {
  if (value === Number.POSITIVE_INFINITY) {
    return Number.POSITIVE_INFINITY;
  }
  return Math.max(startTime + sampleInterval, value);
}

function roundSolverTime(value) {
  return Number(value.toFixed(12));
}

function positiveNumber(value, fallback) {
  const number = finiteNumber(value, fallback);
  return number > 0 ? number : fallback;
}

function positiveInteger(value, fallback) {
  const number = Math.floor(finiteNumber(value, fallback));
  return number > 0 ? number : fallback;
}
