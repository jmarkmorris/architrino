import { createEomHistoryDataset } from "../shared/EomHistoryDataset.mjs";
import { validateEomRecordedPlaybackHandoff } from "../shared/EomRecordedPlaybackHandoff.mjs";
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
  ANIMATOR_RECORDED_PLAYBACK_COMPLETE_TYPE,
  ANIMATOR_RECORDED_PLAYBACK_REQUEST_TYPE,
  ANIMATOR_RECORDED_PLAYBACK_STARTED_TYPE,
  createAnimatorRecordedPlaybackErrorMessage,
} from "./AnimatorRecordedPlaybackWorkerProtocolRuntime.js";

const DEFAULT_FRAME_COUNT = 120;

export function createAnimatorRecordedPlaybackStartedMessage(request = {}) {
  return {
    type: ANIMATOR_RECORDED_PLAYBACK_STARTED_TYPE,
    requestId: request?.requestId ?? "",
  };
}

export async function runAnimatorRecordedPlaybackRequestAsync(request = {}, options = {}) {
  if (request?.type !== ANIMATOR_RECORDED_PLAYBACK_REQUEST_TYPE) {
    throw new Error(`Unsupported recorded-playback request type: ${request?.type ?? ""}`);
  }
  const handoff = await validateEomRecordedPlaybackHandoff(request.handoff, options);
  const historyDataset = createEomHistoryDataset(handoff.record);
  const dataset = createAnimatorDataset(historyDataset, handoff, request);
  const frameBuffer = createAnimatorSimulationFrameBuffer(dataset);
  return {
    type: ANIMATOR_RECORDED_PLAYBACK_COMPLETE_TYPE,
    requestId: request.requestId ?? "",
    dataset: stripAnimatorSimulationDatasetFrames(dataset),
    frameBuffer,
    stats: {
      ...summarizeAnimatorSimulationFrameBuffer(frameBuffer),
      completed: true,
      playbackStatus: dataset.simulation.halt.status,
      engineId: handoff.identity.engineId,
      runId: handoff.identity.runId,
      claimGrade: handoff.identity.claimGrade,
      evidenceStatus: handoff.identity.evidenceStatus,
      recordSha256: handoff.recordSha256,
    },
  };
}

function createAnimatorDataset(historyDataset, handoff, request) {
  const playbackOptions = request.playbackOptions && typeof request.playbackOptions === "object"
    ? request.playbackOptions
    : {};
  const frames = historyDataset.createFrameSamples({
    frameCount: resolveFrameCount(playbackOptions, historyDataset),
    sampleInterval: Number(playbackOptions.sampleInterval) > 0
      ? Number(playbackOptions.sampleInterval)
      : undefined,
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
    diagnostics: { source: handoff.identity.engineId },
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
    id: request.datasetOptions?.id ?? `${request.requestId ?? "animator"}_recorded_dataset`,
    claimLevel: handoff.identity.claimGrade,
    provenance: {
      source: handoff.identity.engineId,
      engineId: handoff.identity.engineId,
      engineVersion: handoff.identity.engineVersion,
      contractId: handoff.identity.contractId,
      modelBindingId: handoff.identity.modelBindingId,
      runId: handoff.identity.runId,
      requestId: request.requestId ?? "",
      claimGrade: handoff.identity.claimGrade,
      evidenceStatus: handoff.identity.evidenceStatus,
      handoffSchema: handoff.schema,
      recordSha256: handoff.recordSha256,
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
        engineId: handoff.identity.engineId,
        engineVersion: handoff.identity.engineVersion,
        runId: handoff.identity.runId,
        contractId: handoff.identity.contractId,
        modelBindingId: handoff.identity.modelBindingId,
        claimGrade: handoff.identity.claimGrade,
        evidenceStatus: handoff.identity.evidenceStatus,
      },
      halt: {
        status: handoff.identity.status,
        code: handoff.record.haltCode ?? "recorded-eom-history",
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
      evidenceStatus: handoff.identity.evidenceStatus,
      recordSha256: handoff.recordSha256,
    },
  };
}

function resolveFrameCount(options, historyDataset) {
  const requested = Number(options.frameCount);
  if (Number.isFinite(requested) && requested >= 1) return Math.floor(requested);
  if (Number(options.sampleInterval) > 0 || Number(historyDataset.window.sampleInterval) > 0) return undefined;
  return DEFAULT_FRAME_COUNT;
}

function vectorToArray(value = {}) {
  return [Number(value?.x) || 0, Number(value?.y) || 0, Number(value?.z) || 0];
}

function inferFrameStep(frames = []) {
  return frames.length < 2 ? 0 : Math.max(0, Number(frames[1].t) - Number(frames[0].t));
}

export function createAnimatorRecordedPlaybackFailureMessage(error, request = {}) {
  return createAnimatorRecordedPlaybackErrorMessage(error, request?.requestId ?? "");
}
