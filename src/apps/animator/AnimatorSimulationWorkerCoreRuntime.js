import {
  createEomHistoryDataset,
} from "../shared/EomHistoryDataset.mjs";
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
  ANIMATOR_SIMULATION_WORKER_COMPLETE_TYPE,
  ANIMATOR_SIMULATION_WORKER_REQUEST_TYPE,
  ANIMATOR_SIMULATION_WORKER_STARTED_TYPE,
  createAnimatorSimulationWorkerErrorMessage,
} from "./AnimatorSimulationWorkerProtocolRuntime.js";

// The animator motion worker is a display surface. It ingests recorded EOM
// retained-history datasets (eom_evolution_contract/v0) and packages display
// frames; it runs no solver and computes no physics. Sampling a record's own
// piecewise-cubic segments is declared arithmetic over recorded data.

const DEFAULT_FRAME_COUNT = 120;

export function createAnimatorSimulationWorkerStartedMessage(request = {}) {
  return {
    type: ANIMATOR_SIMULATION_WORKER_STARTED_TYPE,
    requestId: request?.requestId ?? "",
  };
}

export async function runAnimatorSimulationWorkerRequestAsync(request = {}, options = {}) {
  if (request?.type !== ANIMATOR_SIMULATION_WORKER_REQUEST_TYPE) {
    throw new Error(`Unsupported simulation worker request type: ${request?.type ?? ""}`);
  }
  const record = await resolveEomRecord(request, options);
  const historyDataset = createEomHistoryDataset(record);
  const dataset = createAnimatorDatasetFromEomHistory(historyDataset, request);
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
      engineId: historyDataset.provenance.engineId,
      runId: historyDataset.provenance.runId,
      claimGrade: historyDataset.provenance.claimGrade,
    },
  };
}

async function resolveEomRecord(request, options) {
  const config = request?.config && typeof request.config === "object" ? request.config : {};
  if (config.eomRecord && typeof config.eomRecord === "object") {
    return config.eomRecord;
  }
  if (typeof options.loadEomRecord === "function") {
    const record = await options.loadEomRecord(request);
    if (record && typeof record === "object") {
      return record;
    }
  }
  throw new Error(
    "Animator simulation worker requires a recorded eom_evolution_contract/v0 dataset " +
      "(request.config.eomRecord or a loadEomRecord option). The worker displays recorded " +
      "EOM output only; it does not run a solver.",
  );
}

function createAnimatorDatasetFromEomHistory(historyDataset, request = {}) {
  const config = request.config && typeof request.config === "object" ? request.config : {};
  const frames = historyDataset.createFrameSamples({
    frameCount: resolveFrameCount(config, historyDataset),
    sampleInterval: Number(config.sampleInterval) > 0 ? Number(config.sampleInterval) : undefined,
  });
  const particleIds = new Map(historyDataset.worldlines.map((worldline) => [
    worldline.id,
    `path_${worldline.id}`,
  ]));
  const animatorFrames = frames.map((frame) => ({
    index: frame.frameIndex,
    t: frame.time,
    particles: frame.states.map((state) => ({
      id: particleIds.get(state.worldlineId) ?? `path_${state.worldlineId}`,
      position: vectorToArray(state.position),
      velocity: vectorToArray(state.velocity),
      phase: 0,
      radialVelocity: 0,
      angularVelocity: 0,
    })),
    diagnostics: { source: historyDataset.provenance.engineId },
  }));
  const firstFrame = frames[0];
  const particles = historyDataset.worldlines.map((worldline) => {
    const id = particleIds.get(worldline.id);
    const firstState = firstFrame?.states.find((state) => state.worldlineId === worldline.id);
    return {
      id,
      label: id,
      polarity: worldline.polarity,
      chargeType: "eom-worldline",
      initial: {
        position: vectorToArray(firstState?.position),
        velocity: vectorToArray(firstState?.velocity),
      },
      style: {},
    };
  });
  const timeStart = animatorFrames[0]?.t ?? historyDataset.window.start;
  const timeEnd = animatorFrames.at(-1)?.t ?? timeStart;
  return {
    schemaVersion: ANIMATOR_SIMULATION_DATASET_SCHEMA_VERSION,
    kind: ANIMATOR_SIMULATION_DATASET_KIND,
    id: request.datasetOptions?.id ?? `${request.requestId ?? "animator"}_eom_dataset`,
    claimLevel: historyDataset.provenance.claimGrade,
    provenance: {
      source: historyDataset.provenance.engineId,
      engineId: historyDataset.provenance.engineId,
      contractId: historyDataset.contractId,
      runId: historyDataset.provenance.runId,
      requestId: request.requestId ?? "",
      claimGrade: historyDataset.provenance.claimGrade,
      evidenceStatus: historyDataset.provenance.evidenceStatus,
    },
    simulation: {
      mode: "planar-2d",
      dimensions: 3,
      units: "eom-absolute",
      time: {
        start: timeStart,
        end: timeEnd,
        dt: inferFrameStep(animatorFrames),
        sampleStride: 1,
      },
      solver: {
        engineId: historyDataset.provenance.engineId,
        runId: historyDataset.provenance.runId,
        datasetId: request.datasetOptions?.id ?? "",
        contractId: historyDataset.contractId,
        claimGrade: historyDataset.provenance.claimGrade,
      },
      halt: {
        status: "completed",
        code: "recorded-eom-history",
      },
    },
    particles,
    frames: animatorFrames,
    fieldShells: [],
    delayedHits: [],
    diagnostics: {
      worldlineCount: historyDataset.worldlines.length,
      eventCount: historyDataset.events.length,
      window: { ...historyDataset.window },
      evidenceStatus: historyDataset.provenance.evidenceStatus,
    },
  };
}

function resolveFrameCount(config, historyDataset) {
  const requested = Number(config.frameCount);
  if (Number.isFinite(requested) && requested >= 1) {
    return Math.floor(requested);
  }
  if (Number(config.sampleInterval) > 0 || Number(historyDataset.window.sampleInterval) > 0) {
    return undefined;
  }
  return DEFAULT_FRAME_COUNT;
}

function vectorToArray(value = {}) {
  return [Number(value?.x) || 0, Number(value?.y) || 0, Number(value?.z) || 0];
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
