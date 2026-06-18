import { runAssemblyDynamicsDataset } from "../../../scripts/simulations/lib/assembly-dynamics-engine.mjs";
import {
  runSolverAppBridgeRequest,
} from "../../solver/app/SolverAppBridgeClientResolver.mjs";
import { createAnimatorMotionSimulationRunRequest } from "../../solver/app/SolverAppAdapters.mjs";
import {
  ANIMATOR_SIMULATION_DATASET_KIND,
  ANIMATOR_SIMULATION_DATASET_SCHEMA_VERSION,
} from "./AnimatorSimulationDatasetRuntime.js";
import {
  createAnimatorSimulationFrameBuffer,
  stripAnimatorSimulationDatasetFrames,
  summarizeAnimatorSimulationFrameBuffer,
} from "./AnimatorSimulationFrameBufferRuntime.js";
import {
  ANIMATOR_SOLVER_BRIDGE_ENGINE_ID,
  ANIMATOR_SIMULATION_WORKER_COMPLETE_TYPE,
  ANIMATOR_SIMULATION_WORKER_REQUEST_TYPE,
  ANIMATOR_SIMULATION_WORKER_STARTED_TYPE,
  createAnimatorSimulationWorkerErrorMessage,
} from "./AnimatorSimulationWorkerProtocolRuntime.js";

export function createAnimatorSimulationWorkerStartedMessage(request = {}) {
  return {
    type: ANIMATOR_SIMULATION_WORKER_STARTED_TYPE,
    requestId: request?.requestId ?? "",
  };
}

export async function runAnimatorSimulationWorkerRequestAsync(request = {}, options = {}) {
  if (shouldUseSolverBridge(request, options)) {
    return runAnimatorSolverBridgeWorkerRequest(request, options);
  }
  return runAnimatorSimulationWorkerRequest(request, options);
}

export function runAnimatorSimulationWorkerRequest(request = {}, options = {}) {
  if (request?.type !== ANIMATOR_SIMULATION_WORKER_REQUEST_TYPE) {
    throw new Error(`Unsupported simulation worker request type: ${request?.type ?? ""}`);
  }
  const runDataset =
    typeof options.runDataset === "function" ? options.runDataset : runAssemblyDynamicsDataset;
  const dataset = runDataset(request.config ?? {}, request.datasetOptions ?? {});
  const frameBuffer = createAnimatorSimulationFrameBuffer(dataset);
  const datasetSkeleton = stripAnimatorSimulationDatasetFrames(dataset);
  const frameBufferSummary = summarizeAnimatorSimulationFrameBuffer(frameBuffer);
  return {
    type: ANIMATOR_SIMULATION_WORKER_COMPLETE_TYPE,
    requestId: request.requestId ?? "",
    dataset: datasetSkeleton,
    frameBuffer,
    stats: {
      ...frameBufferSummary,
      completed: dataset?.simulation?.halt?.status === "completed",
      haltStatus: dataset?.simulation?.halt?.status ?? "unknown",
      haltCode: dataset?.simulation?.halt?.code ?? null,
    },
  };
}

async function runAnimatorSolverBridgeWorkerRequest(request = {}, options = {}) {
  if (request?.type !== ANIMATOR_SIMULATION_WORKER_REQUEST_TYPE) {
    throw new Error(`Unsupported simulation worker request type: ${request?.type ?? ""}`);
  }
  const runRequest = createAnimatorSolverBridgeRunRequest(request);
  const runHandle = typeof options.runSolverBridge === "function"
    ? await options.runSolverBridge(runRequest, request)
    : await runSolverBridgeClient(options, request, runRequest);
  const dataset = createAnimatorDatasetFromSolverBridgeRun(runHandle, request);
  const frameBuffer = createAnimatorSimulationFrameBuffer(dataset);
  const datasetSkeleton = stripAnimatorSimulationDatasetFrames(dataset);
  const frameBufferSummary = summarizeAnimatorSimulationFrameBuffer(frameBuffer);
  return {
    type: ANIMATOR_SIMULATION_WORKER_COMPLETE_TYPE,
    requestId: request.requestId ?? "",
    dataset: datasetSkeleton,
    frameBuffer,
    stats: {
      ...frameBufferSummary,
      completed: dataset?.simulation?.halt?.status === "completed",
      haltStatus: dataset?.simulation?.halt?.status ?? "unknown",
      haltCode: dataset?.simulation?.halt?.code ?? null,
      solverEngineId: ANIMATOR_SOLVER_BRIDGE_ENGINE_ID,
    },
  };
}

function shouldUseSolverBridge(request = {}, options = {}) {
  const config = request?.config && typeof request.config === "object" ? request.config : {};
  const bridgeConfig = config.solverBridge && typeof config.solverBridge === "object"
    ? config.solverBridge
    : {};
  return (
    config.solverEngine === ANIMATOR_SOLVER_BRIDGE_ENGINE_ID ||
    config.solverEngine === "solver-app-bridge" ||
    bridgeConfig.enabled === true ||
    typeof options.runSolverBridge === "function"
  );
}

async function runSolverBridgeClient(options, request, runRequest) {
  const bridgeConfig = request?.config?.solverBridge && typeof request.config.solverBridge === "object"
    ? request.config.solverBridge
    : {};
  return runSolverAppBridgeRequest({
    appId: "animator",
    request: runRequest,
    options,
    bridgeConfig,
    factoryRequest: request,
    requestedCapabilities: [
      "motionSimulation",
      "pathHistory",
      "appPlayback",
      "validationReplay",
    ],
    storagePolicy: {
      target: bridgeConfig.streamTarget ?? "caller-buffer",
      durable: bridgeConfig.streamTarget === "native-file",
      maxBytes: bridgeConfig.memoryBudgetBytes ?? 64 * 1024 * 1024,
    },
    threadingPolicy: {
      mode: bridgeConfig.threadingMode ?? "single-thread",
      deterministic: bridgeConfig.deterministic ?? true,
    },
    missingClientMessage:
      "Animator solver bridge worker request requires a solver client, runSolverBridge option, client factory, worker, or solver WASM module factory.",
  });
}

function createAnimatorSolverBridgeRunRequest(request = {}) {
  const config = request.config && typeof request.config === "object" ? request.config : {};
  const bridgeConfig = config.solverBridge && typeof config.solverBridge === "object"
    ? config.solverBridge
    : {};
  if (bridgeConfig.runRequest && typeof bridgeConfig.runRequest === "object") {
    return bridgeConfig.runRequest;
  }
  const motionIntegrationRequest = bridgeConfig.motionIntegrationRequest ?? config.motionIntegrationRequest;
  const motionRequest = bridgeConfig.motionRequest ?? config.motionRequest;
  const datasetId = request.datasetOptions?.id ?? bridgeConfig.datasetId ?? `${request.requestId ?? "animator"}_solver_dataset`;
  const runId = bridgeConfig.runId ?? `${datasetId}:solver-run`;
  return createAnimatorMotionSimulationRunRequest({
    requestId: bridgeConfig.requestId ?? `${request.requestId ?? runId}:solver-bridge`,
    runId,
    datasetId,
    claimLevel: request.datasetOptions?.claimLevel ?? bridgeConfig.claimLevel ?? "interactive-preview",
    precisionPath: bridgeConfig.precisionPath ?? "auto",
    configVersion: bridgeConfig.configVersion ?? "animator-solver-bridge-worker.v1",
    configHash: bridgeConfig.configHash ?? "animator-solver-bridge-worker",
    model: bridgeConfig.model ?? createDefaultSolverBridgeModel(),
    envelope: bridgeConfig.envelope ?? createDefaultSolverBridgeEnvelope(config),
    errorBudget: bridgeConfig.errorBudget ?? createDefaultSolverBridgeErrorBudget(config),
    ...(motionIntegrationRequest
      ? { motionIntegrationRequest }
      : { motionRequest: motionRequest ?? createLinearMotionRequestFromAnimatorConfig(config) }),
    streamId: bridgeConfig.streamId ?? `${runId}:motion-path-history`,
    rowsPerChunk: bridgeConfig.rowsPerChunk ?? 256,
    storagePolicy: bridgeConfig.storagePolicy,
    metadata: {
      units: "solver-si",
      coordinateFrame: "absolute-lab-frame",
      scaleNormalization: "animator-worker",
      interpolationRule: motionIntegrationRequest ? "linear-segment-chord" : "linear-segment",
      ...(bridgeConfig.metadata ?? {}),
    },
    output: bridgeConfig.output ?? {
      outputs: ["frameBuffer", "pathStream", "diagnostics"],
      streamTarget: bridgeConfig.streamTarget ?? "caller-buffer",
      memoryBudgetBytes: bridgeConfig.memoryBudgetBytes ?? 64 * 1024 * 1024,
      deterministic: bridgeConfig.deterministic ?? true,
    },
  });
}

function createAnimatorDatasetFromSolverBridgeRun(runHandle = {}, request = {}) {
  const response = runHandle.response ?? runHandle;
  const frames = Array.isArray(response.frames) ? response.frames : [];
  const pathKeys = [...new Set(frames.map((frame) => frame.pathKey))];
  const particleIds = new Map(pathKeys.map((pathKey, index) => [
    pathKey,
    pathKey == null ? `path_${index + 1}` : `path_${pathKey}`,
  ]));
  const framesByIndex = new Map();
  frames.forEach((frame) => {
    const frameIndex = Math.max(0, Math.round(Number(frame.frameIndex) || 0));
    const entry = framesByIndex.get(frameIndex) ?? {
      index: frameIndex,
      t: Number.isFinite(Number(frame.time)) ? Number(frame.time) : frameIndex,
      particles: [],
      diagnostics: { source: ANIMATOR_SOLVER_BRIDGE_ENGINE_ID },
    };
    entry.particles.push({
      id: particleIds.get(frame.pathKey) ?? `path_${frame.pathKey}`,
      position: vectorToArray(frame.position),
      velocity: vectorToArray(frame.velocity),
      phase: 0,
      radialVelocity: 0,
      angularVelocity: 0,
    });
    framesByIndex.set(frameIndex, entry);
  });
  const animatorFrames = [...framesByIndex.values()].sort((left, right) => left.index - right.index);
  const firstByPath = new Map();
  frames.forEach((frame) => {
    if (!firstByPath.has(frame.pathKey)) {
      firstByPath.set(frame.pathKey, frame);
    }
  });
  const particles = pathKeys.map((pathKey, index) => {
    const first = firstByPath.get(pathKey) ?? {};
    const id = particleIds.get(pathKey) ?? `path_${index + 1}`;
    return {
      id,
      label: id,
      polarity: 0,
      chargeType: "solver-path",
      initial: {
        position: vectorToArray(first.position),
        velocity: vectorToArray(first.velocity),
      },
      style: {},
    };
  });
  const timeStart = animatorFrames[0]?.t ?? 0;
  const timeEnd = animatorFrames.at(-1)?.t ?? timeStart;
  return {
    schemaVersion: ANIMATOR_SIMULATION_DATASET_SCHEMA_VERSION,
    kind: ANIMATOR_SIMULATION_DATASET_KIND,
    id: response.datasetId ?? request.datasetOptions?.id ?? "animator_solver_bridge_dataset",
    claimLevel: runHandle.acceptedPrecisionPath ? "solver-derived-diagnostic" : request.datasetOptions?.claimLevel ?? "solver-derived-diagnostic",
    provenance: {
      source: ANIMATOR_SOLVER_BRIDGE_ENGINE_ID,
      runId: response.runId ?? runHandle.runId ?? "",
      requestId: runHandle.requestId ?? request.requestId ?? "",
    },
    simulation: {
      mode: "planar-2d",
      dimensions: 3,
      units: "solver-si",
      time: {
        start: timeStart,
        end: timeEnd,
        dt: inferFrameStep(animatorFrames),
        sampleStride: 1,
      },
      solver: {
        engineId: ANIMATOR_SOLVER_BRIDGE_ENGINE_ID,
        runId: response.runId ?? runHandle.runId ?? "",
        datasetId: response.datasetId ?? runHandle.datasetId ?? "",
        acceptedPrecisionPath: runHandle.acceptedPrecisionPath ?? response.summary?.precisionPath ?? "",
        pathHistoryStreamId: response.pathHistory?.streamId ?? "",
        statusCode: response.status?.code ?? runHandle.status?.code ?? "",
      },
      halt: {
        status: response.status?.code === "ok" || runHandle.status?.code === "ok" ? "completed" : "halted",
        code: response.status?.code ?? runHandle.status?.code ?? "unknown",
      },
    },
    particles,
    frames: animatorFrames,
    fieldShells: [],
    delayedHits: [],
    diagnostics: {
      solverStatus: response.status ?? runHandle.status ?? null,
      solverSummary: response.summary ?? null,
      solverDiagnosticCount: Array.isArray(response.diagnostics) ? response.diagnostics.length : 0,
    },
  };
}

function createDefaultSolverBridgeModel() {
  return {
    modelId: "aaa.central-solver",
    equationVersion: "motion-root-v1",
    forceLawVersion: "causal-delay-v1",
    constantsHash: "constants:animator-worker",
    causalSpeedPolicy: "fixed-field-speed",
    branchPolicy: "all-positive-roots",
    unitConvention: "solver-si",
    compatiblePrecisionPaths: ["scaled_f64_strict", "event_root_focused", "extended_precision"],
  };
}

function createDefaultSolverBridgeEnvelope(config = {}) {
  const step = Number(config.dt) > 0 ? Number(config.dt) : 0.01;
  const steps = Math.max(1, Math.round(Number(config.steps) || 1));
  return {
    entityCount: 1,
    assemblyCount: 0,
    timeWindow: { start: 0, end: steps * step, stepHint: step, units: "solver-time" },
    timeResolutionHint: step,
    interactionPolicy: "single-path",
    expectedBranchComplexity: "low",
    outputDetail: "playback",
    memoryBudgetBytes: 64 * 1024 * 1024,
    storageBudgetBytes: 64 * 1024 * 1024,
    latencyTarget: "interactive",
    simplificationPolicy: "none",
  };
}

function createDefaultSolverBridgeErrorBudget(config = {}) {
  const tolerance = Number(config.integrationTolerance) > 0 ? Number(config.integrationTolerance) : 1e-12;
  return {
    globalTolerance: tolerance,
    rootIsolationTolerance: tolerance,
    delayedHitTolerance: tolerance,
    integrationTolerance: tolerance,
    streamEncodingTolerance: tolerance,
    readbackTolerance: tolerance,
    projectionTolerance: 1e-9,
    displayTolerance: 1e-6,
  };
}

function createLinearMotionRequestFromAnimatorConfig(config = {}) {
  const step = Number(config.dt) > 0 ? Number(config.dt) : 0.01;
  const steps = Math.max(1, Math.round(Number(config.steps) || 1));
  const endTime = steps * step;
  return {
    pathKey: 1,
    segment: {
      startTime: 0,
      endTime,
      positionAtStart: { x: 0, y: 0, z: 0 },
      velocity: {
        x: Number(config.driftX) || 0,
        y: Number(config.driftY) || 0,
        z: 0,
      },
      errorBound: 0,
    },
    startTime: 0,
    endTime,
    step,
    stateFlags: 0,
  };
}

function vectorToArray(value = {}) {
  return [Number(value.x) || 0, Number(value.y) || 0, Number(value.z) || 0];
}

function inferFrameStep(frames = []) {
  if (frames.length < 2) {
    return 0;
  }
  return Math.max(0, Number(frames[1].t) - Number(frames[0].t));
}

export function createAnimatorSimulationWorkerFailureMessage(error, request = {}) {
  return createAnimatorSimulationWorkerErrorMessage(error, request?.requestId ?? "");
}
