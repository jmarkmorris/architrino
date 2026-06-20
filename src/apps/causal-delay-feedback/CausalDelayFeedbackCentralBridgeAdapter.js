import { runSolverAppBridgeRequest } from "../../solver/app/SolverAppBridgeClientResolver.mjs";
import {
  CENTRAL_SOLVER_BRIDGE_TARGET,
  DEFAULT_CANVAS_ID,
  DEFAULT_PRESET_ID,
  ELECTRINO_WAKE,
  FULL_CIRCULAR_ARCS,
  PARTIAL_PROPAGATING_ARCS,
  POSITRINO_WAKE,
  getDistance,
  getPresetById,
  createMockCausalDelayReplayDataset,
} from "./CausalDelayFeedbackReplayAdapter.js";

export const CAUSAL_DELAY_FEEDBACK_APP_ID = "causal-delay-feedback";
export const CENTRAL_SOLVER_REPLAY_ADAPTER = "central_solver_bridge_replay_adapter";
export const CENTRAL_SOLVER_REPLAY_DATASET_SOURCE = "central_solver_bridge_replay";
export const CAUSAL_DELAY_FEEDBACK_REPLAY_CONFIG_VERSION =
  "causal-delay-feedback-replay-adapter.v1";
export const CENTRAL_SOLVER_APP_PLAYBACK_REPLAY_MODE = "appPlayback";
export const CENTRAL_SOLVER_MOTION_REPLAY_MODE = "motionSimulation";
export const CENTRAL_SOLVER_DELAYED_HITS_RUN_KIND = "delayedHits";

const DEFAULT_MEMORY_BUDGET_BYTES = 128 * 1024 * 1024;
const DEFAULT_HISTORY_DEPTH = 4;
const DEFAULT_FRAME_COUNT = 180;
const DEFAULT_RUN_DURATION = 1;
const ARCHITRINO_KINDS = Object.freeze(["positrino", "electrino"]);
const PATH_KEYS_BY_KIND = Object.freeze({ positrino: 1, electrino: 2 });
const KIND_BY_PATH_KEY = Object.freeze(Object.fromEntries(
  Object.entries(PATH_KEYS_BY_KIND).map(([kind, key]) => [key, kind]),
));

export function createCausalDelayFeedbackBridgeReplayRequest(input = {}) {
  requireObject(input, "causal-delay bridge replay input");
  const preset = getPresetById(input.presetId ?? DEFAULT_PRESET_ID);
  const runId = normalizeOptionalString(
    input.runId,
    `causal-delay-feedback-${preset.id}`,
    "runId",
  );
  const memoryBudgetBytes = normalizePositiveInteger(
    input.memoryBudgetBytes,
    DEFAULT_MEMORY_BUDGET_BYTES,
    "memoryBudgetBytes",
  );
  const replayDataset = input.replayDataset ?? createMockCausalDelayReplayDataset(preset.id);
  const initialConditions = cloneObject(
    input.initialConditions ?? replayDataset.initialConditions ?? {},
    "initialConditions",
  );
  const bridgeFrames = input.frames ?? createBridgeMotionFramesFromReplayDataset(replayDataset);
  const bridgeHits = input.hits ?? createBridgeDelayedHitsFromReplayDataset(replayDataset);
  const bridgeGeometry =
    input.geometry ?? createBridgeGeometryFromReplayDataset(replayDataset, { initialConditions });

  return {
    requestId: normalizeOptionalString(input.requestId, `${runId}-request`, "requestId"),
    runId,
    datasetId: normalizeOptionalString(input.datasetId, `${runId}-dataset`, "datasetId"),
    appId: CAUSAL_DELAY_FEEDBACK_APP_ID,
    runKind: "appPlayback",
    claimLevel: normalizeOptionalString(input.claimLevel, "interactive-preview", "claimLevel"),
    precisionPath: normalizeOptionalString(input.precisionPath, "auto", "precisionPath"),
    configVersion: normalizeOptionalString(
      input.configVersion,
      CAUSAL_DELAY_FEEDBACK_REPLAY_CONFIG_VERSION,
      "configVersion",
    ),
    configHash: normalizeOptionalString(
      input.configHash,
      `causal-delay-feedback:${preset.id}`,
      "configHash",
    ),
    model: cloneObject(input.model ?? createDefaultReplayModel(), "model"),
    envelope: cloneObject(
      input.envelope ?? createDefaultReplayEnvelope({ input, memoryBudgetBytes }),
      "envelope",
    ),
    errorBudget: cloneObject(input.errorBudget ?? createDefaultReplayErrorBudget(), "errorBudget"),
    config: {
      appId: CAUSAL_DELAY_FEEDBACK_APP_ID,
      solverTarget: CENTRAL_SOLVER_BRIDGE_TARGET,
      presetId: preset.id,
      initialConditions,
      sourceRunId: input.sourceRunId ?? replayDataset.runId,
      sourceDatasetId: input.sourceDatasetId ?? replayDataset.datasetId,
      frames: cloneArray(bridgeFrames, "frames"),
      hits: cloneArray(bridgeHits, "hits"),
      geometry: cloneObject(bridgeGeometry, "geometry"),
      replay: {
        frameCount: normalizePositiveInteger(input.frameCount, DEFAULT_FRAME_COUNT, "frameCount"),
        historyDepth: normalizePositiveInteger(
          input.historyDepth,
          DEFAULT_HISTORY_DEPTH,
          "historyDepth",
        ),
        runDuration: normalizePositiveNumber(input.runDuration, DEFAULT_RUN_DURATION, "runDuration"),
        outputStride: normalizePositiveInteger(input.outputStride, 1, "outputStride"),
      },
    },
    output: {
      outputs: input.outputs ?? [
        "frameBuffer",
        "pathStream",
        "rootLedger",
        "delayedHitEvents",
        "diagnostics",
      ],
      streamTarget: input.streamTarget ?? "caller-buffer",
      memoryBudgetBytes,
      deterministic: input.deterministic ?? true,
    },
  };
}

export function createCausalDelayFeedbackCentralBridgeAdapter(options = {}) {
  return {
    id: CENTRAL_SOLVER_REPLAY_ADAPTER,
    futureSolverTarget: CENTRAL_SOLVER_BRIDGE_TARGET,
    async createReplayAsync({ presetId = DEFAULT_PRESET_ID, requestOptions = {} } = {}) {
      const request = createCausalDelayFeedbackBridgeReplayRequest({
        ...requestOptions,
        presetId,
      });
      if (resolveCentralSolverReplayMode(requestOptions, options) === CENTRAL_SOLVER_MOTION_REPLAY_MODE) {
        return createMotionSolverReplayDataset(request, options);
      }
      const runHandle = await runCausalDelayBridgeRequest(request, options, {
        factoryRequest: request.config.initialConditions,
        requestedCapabilities: ["appPlayback", "pathHistory", "causalRoots", "delayedHits"],
      });
      return normalizeCausalDelayFeedbackBridgeReplay(runHandle, { presetId });
    },
  };
}

async function createMotionSolverReplayDataset(playbackRequest, options = {}) {
  const motionRunHandles = await Promise.all(
    ARCHITRINO_KINDS.map((kind) => {
      const request = createCausalDelayFeedbackMotionSimulationRequest(playbackRequest, kind);
      return runCausalDelayBridgeRequest(request, options, {
        factoryRequest: request.config.motionIntegrationRequest,
        requestedCapabilities: ["motionSimulation", "pathHistory", "diagnostics"],
      });
    }),
  );
  const bridgeFrames = motionRunHandles.flatMap((runHandle, index) => (
    normalizeMotionRunFrames(runHandle, ARCHITRINO_KINDS[index])
  ));
  const pairedFrames = normalizeFrameSamples(bridgeFrames, "central motion replay frames");
  const history = createHistorySamplesFromPairedFrames(
    pairedFrames,
    playbackRequest.config.geometry.history,
  );
  const wakeLinks = createWakeLinksFromBridgeHits(
    playbackRequest.config.hits,
    playbackRequest.config.geometry.wakeArcDisplayMode,
  );
  const delayedHitRunHandles = await Promise.all(
    wakeLinks.map((link, index) => {
      const request = createCausalDelayFeedbackDelayedHitRequest(
        playbackRequest,
        link,
        history,
        pairedFrames,
        index,
      );
      return runCausalDelayBridgeRequest(request, options, {
        factoryRequest: request.config.rootRequest,
        requestedCapabilities: ["causalRoots", "delayedHits", "diagnostics"],
      });
    }),
  );
  const historyReplayDataset = {
    history,
    wakeLinks,
    wakeArcDisplayMode: playbackRequest.config.geometry.wakeArcDisplayMode,
  };
  const hits = createBridgeDelayedHitsFromDelayedHitRuns(
    delayedHitRunHandles,
    historyReplayDataset,
  );
  const geometry = createBridgeGeometryFromReplayDataset(
    {
      history,
      wakeArcDisplayMode: playbackRequest.config.geometry.wakeArcDisplayMode,
      preset: { id: playbackRequest.config.presetId },
    },
    { initialConditions: playbackRequest.config.initialConditions },
  );
  const motionDiagnostics = motionRunHandles.flatMap((runHandle) => (
    normalizeOptionalArray(unwrapBridgeResponse(runHandle).diagnostics)
  ));
  const delayedHitDiagnostics = delayedHitRunHandles.flatMap((runHandle) => (
    normalizeOptionalArray(unwrapBridgeResponse(runHandle).diagnostics)
  ));
  return normalizeCausalDelayFeedbackBridgeReplay(
    {
      requestId: playbackRequest.requestId,
      runId: playbackRequest.runId,
      datasetId: playbackRequest.datasetId,
      response: {
        runId: playbackRequest.runId,
        datasetId: playbackRequest.datasetId,
        presetId: playbackRequest.config.presetId,
        status: { code: "ok", severity: "ok", message: "central motion replay prepared" },
        summary: {
          runId: playbackRequest.runId,
          replayMode: CENTRAL_SOLVER_MOTION_REPLAY_MODE,
          frameCount: pairedFrames.length,
          pathCount: ARCHITRINO_KINDS.length,
          delayedHitCount: hits.length,
          motionRunIds: motionRunHandles.map((handle) => handle.runId ?? handle.response?.runId),
          delayedHitRunIds: delayedHitRunHandles.map((handle) => handle.runId ?? handle.response?.runId),
        },
        initialConditions: playbackRequest.config.initialConditions,
        frames: bridgeFrames,
        history,
        hits,
        geometry: {
          ...geometry,
          solverReplayMode: CENTRAL_SOLVER_MOTION_REPLAY_MODE,
          motionRunIds: motionRunHandles.map((handle) => handle.runId ?? handle.response?.runId),
          delayedHitRunIds: delayedHitRunHandles.map((handle) => handle.runId ?? handle.response?.runId),
        },
        diagnostics: [
          {
            code: "causal_delay_motion_solver_replay",
            severity: "info",
            message: "central motion simulations generated architrino frame samples",
          },
          ...motionDiagnostics,
          ...delayedHitDiagnostics,
        ],
      },
    },
    { presetId: playbackRequest.config.presetId },
  );
}

function resolveCentralSolverReplayMode(requestOptions = {}, options = {}) {
  const value = String(
    requestOptions.solverReplayMode ??
      requestOptions.replayMode ??
      options.solverReplayMode ??
      options.replayMode ??
      CENTRAL_SOLVER_APP_PLAYBACK_REPLAY_MODE,
  ).toLowerCase();
  if (
    value === "motion" ||
    value === "motion-simulation" ||
    value === "motionsimulation" ||
    value === "motion_solver" ||
    value === "solver_motion"
  ) {
    return CENTRAL_SOLVER_MOTION_REPLAY_MODE;
  }
  return CENTRAL_SOLVER_APP_PLAYBACK_REPLAY_MODE;
}

function runCausalDelayBridgeRequest(request, options = {}, {
  factoryRequest,
  requestedCapabilities,
} = {}) {
  if (typeof options.runSolverBridge === "function") {
    return options.runSolverBridge(request);
  }
  return runSolverAppBridgeRequest({
    appId: CAUSAL_DELAY_FEEDBACK_APP_ID,
    request,
    options,
    factoryRequest,
    requestedCapabilities,
    storagePolicy: {
      target: request.output.streamTarget,
      durable: request.output.streamTarget === "native-file",
      maxBytes: request.output.memoryBudgetBytes,
    },
    threadingPolicy: {
      mode: options.threadingMode ?? "single-thread",
      deterministic: request.output.deterministic,
    },
    missingClientMessage:
      "Causal-delay feedback bridge replay requires a solver client, runSolverBridge option, client factory, worker, or solver WASM module factory.",
  });
}

function createCausalDelayFeedbackMotionSimulationRequest(playbackRequest, kind) {
  const initialConditions = playbackRequest.config.initialConditions;
  const condition = initialConditions[kind];
  requireObject(condition, `initialConditions.${kind}`);
  const replayConfig = playbackRequest.config.replay;
  const frameCount = normalizePositiveInteger(replayConfig.frameCount, DEFAULT_FRAME_COUNT, "frameCount");
  const runDuration = normalizePositiveNumber(replayConfig.runDuration, DEFAULT_RUN_DURATION, "runDuration");
  const startTime = Number.isFinite(Number(condition.t)) ? Number(condition.t) : 0;
  const endTime = startTime + runDuration;
  const step = runDuration / Math.max(1, frameCount - 1);
  const pathKey = PATH_KEYS_BY_KIND[kind];
  const runId = `${playbackRequest.runId}-${kind}-motion`;
  return {
    requestId: `${runId}-request`,
    runId,
    datasetId: `${runId}-dataset`,
    appId: CAUSAL_DELAY_FEEDBACK_APP_ID,
    runKind: CENTRAL_SOLVER_MOTION_REPLAY_MODE,
    claimLevel: playbackRequest.claimLevel,
    precisionPath: playbackRequest.precisionPath,
    configVersion: "causal-delay-feedback-motion-simulation-adapter.v1",
    configHash: `${playbackRequest.configHash ?? playbackRequest.runId}:${kind}:motion`,
    model: cloneObject(playbackRequest.model, "model"),
    envelope: cloneObject(playbackRequest.envelope, "envelope"),
    errorBudget: cloneObject(playbackRequest.errorBudget, "errorBudget"),
    config: {
      appId: CAUSAL_DELAY_FEEDBACK_APP_ID,
      streamId: `${runId}:path-history`,
      rowsPerChunk: 64,
      storagePolicy: {
        target: playbackRequest.output.streamTarget,
        durable: playbackRequest.output.streamTarget === "native-file",
        maxBytes: playbackRequest.output.memoryBudgetBytes,
      },
      metadata: {
        precisionPath: playbackRequest.precisionPath,
        units: playbackRequest.model.unitConvention,
        coordinateFrame: "absolute-lab-frame",
        scaleNormalization: "causal-delay-display-units",
        interpolationRule: "linear-segment-chord",
        provenance: {
          source: "causal-delay-feedback-initial-conditions",
          presetId: playbackRequest.config.presetId,
          kind,
        },
      },
      motionIntegrationRequest: {
        pathKey,
        startTime,
        endTime,
        step,
        maxFrames: frameCount,
        initialPosition: {
          x: normalizeFiniteNumber(condition.x, `initialConditions.${kind}.x`),
          y: normalizeFiniteNumber(condition.y, `initialConditions.${kind}.y`),
          z: Number.isFinite(Number(condition.z)) ? Number(condition.z) : 0,
        },
        initialVelocity: {
          x: normalizeFiniteNumber(condition.vx, `initialConditions.${kind}.vx`),
          y: normalizeFiniteNumber(condition.vy, `initialConditions.${kind}.vy`),
          z: Number.isFinite(Number(condition.vz)) ? Number(condition.vz) : 0,
        },
        acceleration: {
          x: normalizeOptionalMotionAxis(condition.ax ?? condition.acceleration?.x, 0),
          y: normalizeOptionalMotionAxis(condition.ay ?? condition.acceleration?.y, 0),
          z: normalizeOptionalMotionAxis(condition.az ?? condition.acceleration?.z, 0),
        },
        integrationTolerance: playbackRequest.errorBudget.integrationTolerance,
        integrationMethod: 1,
        stateFlags: kind === "positrino" ? 1 : 2,
      },
    },
    output: {
      outputs: ["frameBuffer", "pathStream", "diagnostics"],
      streamTarget: playbackRequest.output.streamTarget,
      memoryBudgetBytes: playbackRequest.output.memoryBudgetBytes,
      deterministic: playbackRequest.output.deterministic,
    },
  };
}

function normalizeOptionalMotionAxis(value, fallback) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : fallback;
}

function createCausalDelayFeedbackDelayedHitRequest(playbackRequest, link, history, frames, index) {
  const source = findHistoryPoint(
    history,
    link.sourceKind,
    link.sourceDepth,
    `source ${link.sourceKind} ${link.sourceDepth}`,
  );
  const receiver = findHistoryPoint(
    history,
    link.receiverKind,
    link.receiverDepth,
    `receiver ${link.receiverKind} ${link.receiverDepth}`,
  );
  const travelTime = receiver.t - source.t;
  if (!Number.isFinite(travelTime) || travelTime <= 0) {
    throw new TypeError(`wake link ${link.id ?? index} must reference a later receiver history point`);
  }
  const distance = getDistance(source, receiver);
  const signalSpeed = normalizePositiveNumber(
    link.signalSpeed ?? playbackRequest.config.geometry.signalSpeed,
    Math.max(distance / travelTime, 1e-9),
    `wakeLinks[${index}].signalSpeed`,
  );
  const runId = `${playbackRequest.runId}-${link.sourceKind}${link.sourceDepth}` +
    `-to-${link.receiverKind}${link.receiverDepth}-delayed-hit`;
  const rootRequest = {
    source: createCausalSegmentForHistoryPoint(frames, link.sourceKind, source),
    receiver: createCausalSegmentForHistoryPoint(frames, link.receiverKind, receiver),
    hitTime: receiver.t,
    signalSpeed,
    rootTolerance: playbackRequest.errorBudget.rootIsolationTolerance,
    maxIterations: 96,
    scanSubdivisions: 64,
    maxRoots: 2,
    maxHits: 2,
  };

  return {
    requestId: `${runId}-request`,
    runId,
    datasetId: `${runId}-dataset`,
    appId: CAUSAL_DELAY_FEEDBACK_APP_ID,
    runKind: CENTRAL_SOLVER_DELAYED_HITS_RUN_KIND,
    claimLevel: playbackRequest.claimLevel,
    precisionPath: playbackRequest.precisionPath,
    configVersion: "causal-delay-feedback-delayed-hit-adapter.v1",
    configHash: `${playbackRequest.configHash ?? playbackRequest.runId}:${link.id ?? index}:delayed-hit`,
    model: cloneObject(playbackRequest.model, "model"),
    envelope: cloneObject(playbackRequest.envelope, "envelope"),
    errorBudget: cloneObject(playbackRequest.errorBudget, "errorBudget"),
    config: {
      appId: CAUSAL_DELAY_FEEDBACK_APP_ID,
      rootRequest,
      link: {
        id: link.id,
        label: link.label,
        sourceKind: link.sourceKind,
        receiverKind: link.receiverKind,
        sourceDepth: link.sourceDepth,
        receiverDepth: link.receiverDepth,
        weight: link.weight,
        mode: link.mode,
        emissionTime: source.t,
        hitTime: receiver.t,
        travelTime,
        distance,
        signalSpeed,
      },
      metadata: {
        precisionPath: playbackRequest.precisionPath,
        coordinateFrame: "absolute-lab-frame",
        source: "causal-delay-feedback-history-link",
        signalSpeedSource:
          link.signalSpeed != null || playbackRequest.config.geometry.signalSpeed != null
            ? "configured"
            : "designated-history-point-match",
      },
    },
    output: {
      outputs: ["rootLedger", "delayedHitEvents", "diagnostics"],
      streamTarget: playbackRequest.output.streamTarget,
      memoryBudgetBytes: playbackRequest.output.memoryBudgetBytes,
      deterministic: playbackRequest.output.deterministic,
    },
  };
}

function createCausalSegmentForHistoryPoint(frames, kind, historyPoint) {
  const points = frames
    .map((frame) => ({ t: frame.t, ...frame[kind] }))
    .sort((a, b) => a.t - b.t);
  if (points.length === 0) {
    throw new TypeError(`motion replay frames.${kind} must include samples`);
  }
  const sampleT = normalizeFiniteNumber(historyPoint.t, `${kind} history point time`);
  if (points.length === 1) {
    return createDegenerateCausalSegment(points[0], sampleT);
  }

  let left = points[0];
  let right = points[1];
  if (sampleT >= points[points.length - 1].t) {
    left = points[points.length - 2];
    right = points[points.length - 1];
  } else if (sampleT > points[0].t) {
    const rightIndex = points.findIndex((point) => point.t >= sampleT);
    left = points[Math.max(0, rightIndex - 1)];
    right = points[rightIndex] ?? points[points.length - 1];
  }

  const span = right.t - left.t;
  if (!Number.isFinite(span) || span <= 0) {
    return createDegenerateCausalSegment(historyPoint, sampleT);
  }
  return {
    startTime: left.t,
    endTime: right.t,
    positionAtStart: toBridgeVector(left),
    velocity: {
      x: (right.x - left.x) / span,
      y: (right.y - left.y) / span,
      z: ((right.z ?? 0) - (left.z ?? 0)) / span,
    },
    errorBound: Math.max(0, Number(left.errorBound) || 0, Number(right.errorBound) || 0),
  };
}

function createDegenerateCausalSegment(point, t) {
  return {
    startTime: t,
    endTime: t,
    positionAtStart: toBridgeVector(point),
    velocity: {
      x: Number.isFinite(Number(point.vx)) ? Number(point.vx) : 0,
      y: Number.isFinite(Number(point.vy)) ? Number(point.vy) : 0,
      z: Number.isFinite(Number(point.vz)) ? Number(point.vz) : 0,
    },
    errorBound: Math.max(0, Number(point.errorBound) || 0),
  };
}

function normalizeMotionRunFrames(runHandle, kind) {
  const response = unwrapBridgeResponse(runHandle);
  const frames = response.frames ?? response.frameSamples;
  if (!Array.isArray(frames) || frames.length === 0) {
    throw new TypeError(`central motion response for ${kind} must include frame samples`);
  }
  return frames.map((frame, index) => normalizeMotionRunFrame(frame, kind, index));
}

function normalizeMotionRunFrame(frame, kind, index) {
  requireObject(frame, `central motion frames.${kind}[${index}]`);
  const pathKey = PATH_KEYS_BY_KIND[kind];
  const position = frame.position ?? frame;
  const velocity = frame.velocity ?? frame;
  return {
    pathKey,
    frameIndex: normalizeNonnegativeInteger(
      frame.frameIndex ?? index,
      `central motion frames.${kind}[${index}].frameIndex`,
    ),
    time: normalizeFiniteNumber(frame.time ?? frame.t, `central motion frames.${kind}[${index}].time`),
    position: normalizeVectorPoint(position, `central motion frames.${kind}[${index}].position`),
    velocity: normalizeOptionalVector(velocity, `central motion frames.${kind}[${index}].velocity`) ?? {
      x: 0,
      y: 0,
      z: 0,
    },
    errorBound: Number.isFinite(Number(frame.errorBound)) ? Number(frame.errorBound) : 0,
    stateFlags: Number.isFinite(Number(frame.stateFlags)) ? Number(frame.stateFlags) : pathKey,
  };
}

function createHistorySamplesFromPairedFrames(frames, templateHistory) {
  requireObject(templateHistory, "motion replay history template");
  return Object.fromEntries(
    ARCHITRINO_KINDS.map((kind) => {
      const rows = templateHistory[kind];
      if (!Array.isArray(rows) || rows.length === 0) {
        throw new TypeError(`motion replay history template.${kind} must include retained samples`);
      }
      return [
        kind,
        rows.map((row, index) => {
          const t = normalizeFiniteNumber(row.t, `motion replay history template.${kind}[${index}].t`);
          const point = interpolatePairedFrames(frames, kind, t);
          return {
            kind,
            depth: normalizePositiveInteger(row.depth ?? index + 1, index + 1, "history depth"),
            t,
            x: point.x,
            y: point.y,
            ...(Number.isFinite(Number(point.vx)) ? { vx: Number(point.vx) } : {}),
            ...(Number.isFinite(Number(point.vy)) ? { vy: Number(point.vy) } : {}),
            weight: normalizeUnitNumber(row.weight, (index + 1) / rows.length, "history weight"),
            state: row.state ?? defaultHistoryState(index, rows.length),
          };
        }),
      ];
    }),
  );
}

function interpolatePairedFrames(frames, kind, t) {
  const points = frames
    .map((frame) => ({ t: frame.t, ...frame[kind] }))
    .sort((a, b) => a.t - b.t);
  if (points.length === 0) {
    throw new TypeError(`motion replay frames.${kind} must include samples`);
  }
  if (t <= points[0].t) {
    return points[0];
  }
  const last = points[points.length - 1];
  if (t >= last.t) {
    return last;
  }
  const rightIndex = points.findIndex((point) => point.t >= t);
  const left = points[Math.max(0, rightIndex - 1)];
  const right = points[rightIndex];
  const span = right.t - left.t;
  const amount = span === 0 ? 0 : (t - left.t) / span;
  return {
    t,
    x: left.x + (right.x - left.x) * amount,
    y: left.y + (right.y - left.y) * amount,
    vx: Number.isFinite(Number(left.vx)) && Number.isFinite(Number(right.vx))
      ? left.vx + (right.vx - left.vx) * amount
      : undefined,
    vy: Number.isFinite(Number(left.vy)) && Number.isFinite(Number(right.vy))
      ? left.vy + (right.vy - left.vy) * amount
      : undefined,
  };
}

function createWakeLinksFromBridgeHits(hits, mode) {
  if (!Array.isArray(hits) || hits.length === 0) {
    throw new TypeError("motion replay bridge hits must include delayed-hit links");
  }
  return hits.map((hit, index) => ({
    id: normalizeOptionalString(
      hit.id ?? hit.label,
      `${hit.sourceKind}-${hit.sourceDepth}-to-${hit.receiverKind}-${hit.receiverDepth}`,
      `motion replay hits[${index}].id`,
    ),
    label: normalizeOptionalString(
      hit.label,
      `${kindLabel(hit.sourceKind)} ${hit.sourceDepth} -> ${kindLabel(hit.receiverKind)} ${hit.receiverDepth}`,
      `motion replay hits[${index}].label`,
    ),
    sourceKind: normalizeArchitrinoKind(hit.sourceKind, `motion replay hits[${index}].sourceKind`),
    receiverKind: normalizeArchitrinoKind(hit.receiverKind, `motion replay hits[${index}].receiverKind`),
    sourceDepth: normalizePositiveInteger(hit.sourceDepth, undefined, `motion replay hits[${index}].sourceDepth`),
    receiverDepth: normalizePositiveInteger(hit.receiverDepth, undefined, `motion replay hits[${index}].receiverDepth`),
    weight: normalizeUnitNumber(hit.weight ?? hit.strength, 1, `motion replay hits[${index}].weight`),
    mode,
  }));
}

export function normalizeCausalDelayFeedbackBridgeReplay(runHandle = {}, options = {}) {
  const bridgeResponse = unwrapBridgeResponse(runHandle);
  const preset = getPresetById(
    bridgeResponse.presetId ??
      bridgeResponse.geometry?.presetId ??
      options.presetId ??
      DEFAULT_PRESET_ID,
  );
  const frames = normalizeFrameSamples(
    bridgeResponse.frames ?? bridgeResponse.frameSamples,
    "bridge response frames",
  );
  const history = normalizeHistorySamples(
    bridgeResponse.history ??
      bridgeResponse.historySamples ??
      bridgeResponse.pathHistorySamples ??
      bridgeResponse.geometry?.history,
  );
  const wakeLinks = normalizeWakeLinks(
    bridgeResponse.wakeLinks ??
      bridgeResponse.delayedHits ??
      bridgeResponse.delayedHitEvents ??
      bridgeResponse.hits,
    history,
  );
  const initialConditions = cloneObject(
    bridgeResponse.initialConditions ?? bridgeResponse.geometry?.initialConditions ?? {},
    "bridge response initialConditions",
  );
  const virtualObserver = normalizeOptionalVirtualObserver(
    bridgeResponse.virtualObserver ??
      bridgeResponse.geometry?.virtualObserver ??
      initialConditions.virtualObserver,
  );
  if (virtualObserver && !initialConditions.virtualObserver) {
    initialConditions.virtualObserver = { ...virtualObserver };
  }

  return {
    runId: normalizeOptionalString(
      bridgeResponse.runId ?? runHandle.runId,
      `causal-delay-feedback:${preset.id}`,
      "bridge response runId",
    ),
    datasetId: normalizeOptionalString(
      bridgeResponse.datasetId ?? runHandle.datasetId,
      undefined,
      "bridge response datasetId",
    ),
    datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
    solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
    futureSolverTarget: CENTRAL_SOLVER_BRIDGE_TARGET,
    wakeArcDisplayMode:
      bridgeResponse.wakeArcDisplayMode ??
      bridgeResponse.geometry?.wakeArcDisplayMode ??
      preset.wakeArcDisplayMode ??
      PARTIAL_PROPAGATING_ARCS,
    canvasColorId:
      bridgeResponse.canvasColorId ??
      bridgeResponse.geometry?.canvasColorId ??
      preset.canvasColorId ??
      DEFAULT_CANVAS_ID,
    preset,
    initialConditions,
    ...(virtualObserver ? { virtualObserver } : {}),
    paths: {
      positrino: frames.map((frame) => ({ t: frame.t, ...frame.positrino })),
      electrino: frames.map((frame) => ({ t: frame.t, ...frame.electrino })),
    },
    history,
    wakeLinks,
    frames,
    diagnostics: normalizeOptionalArray(bridgeResponse.diagnostics),
    solverStatus: bridgeResponse.status ?? runHandle.status ?? { code: "ok", severity: "ok" },
    solverSummary: bridgeResponse.summary ?? null,
  };
}

function unwrapBridgeResponse(runHandle) {
  requireObject(runHandle, "bridge replay run handle");
  const response = runHandle.response ?? runHandle;
  requireObject(response, "bridge replay response");
  return response;
}

function normalizeFrameSamples(frames, label) {
  if (!Array.isArray(frames) || frames.length === 0) {
    throw new TypeError(`${label} must include at least one frame sample`);
  }
  if ("pathKey" in frames[0]) {
    return normalizeBridgeMotionFrameSamples(frames, label);
  }
  return frames.map((frame, index) => {
    requireObject(frame, `${label}[${index}]`);
    const t = normalizeFiniteNumber(frame.t ?? frame.time, `${label}[${index}].t`);
    return {
      t,
      positrino: normalizePoint(frame.positrino, `${label}[${index}].positrino`),
      electrino: normalizePoint(frame.electrino, `${label}[${index}].electrino`),
    };
  });
}

function normalizeBridgeMotionFrameSamples(frames, label) {
  const byFrameIndex = new Map();
  frames.forEach((frame, index) => {
    requireObject(frame, `${label}[${index}]`);
    const kind = KIND_BY_PATH_KEY[Number(frame.pathKey)];
    if (!kind) {
      throw new TypeError(`${label}[${index}].pathKey must identify positrino or electrino`);
    }
    const frameIndex = normalizeNonnegativeInteger(frame.frameIndex, `${label}[${index}].frameIndex`);
    const entry = byFrameIndex.get(frameIndex) ?? {
      t: normalizeFiniteNumber(frame.time, `${label}[${index}].time`),
    };
    const position = normalizeVectorPoint(frame.position, `${label}[${index}].position`);
    const velocity = normalizeOptionalVector(frame.velocity, `${label}[${index}].velocity`);
    entry[kind] = {
      ...position,
      ...(velocity ? { vx: velocity.x, vy: velocity.y } : {}),
    };
    byFrameIndex.set(frameIndex, entry);
  });
  const pairedFrames = [...byFrameIndex.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([, frame]) => frame)
    .filter((frame) => frame.positrino && frame.electrino);
  if (pairedFrames.length === 0) {
    throw new TypeError(`${label} must include paired positrino and electrino frame samples`);
  }
  return pairedFrames;
}

function normalizeHistorySamples(history) {
  requireObject(history, "bridge response history");
  const normalized = {};
  for (const kind of ARCHITRINO_KINDS) {
    const rows = history[kind];
    if (!Array.isArray(rows) || rows.length === 0) {
      throw new TypeError(`bridge response history.${kind} must include retained samples`);
    }
    normalized[kind] = rows.map((row, index) => normalizeHistoryPoint(row, kind, index, rows.length));
  }
  return normalized;
}

function normalizeHistoryPoint(row, kind, index, count) {
  requireObject(row, `bridge response history.${kind}[${index}]`);
  const depth = normalizePositiveInteger(row.depth ?? index + 1, index + 1, "history depth");
  return {
    ...normalizePoint(row, `bridge response history.${kind}[${index}]`),
    kind,
    depth,
    t: normalizeFiniteNumber(row.t ?? row.time, `bridge response history.${kind}[${index}].t`),
    weight: normalizeUnitNumber(row.weight, depth / Math.max(1, count), "history weight"),
    state: typeof row.state === "string" && row.state.length > 0 ? row.state : defaultHistoryState(index, count),
  };
}

function normalizeWakeLinks(rows, history) {
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new TypeError("bridge response delayed hits must include at least one wake link");
  }
  return rows.map((row, index) => normalizeWakeLink(row, index, history));
}

function normalizeWakeLink(row, index, history) {
  requireObject(row, `bridge response delayedHits[${index}]`);
  const sourceKind = normalizeArchitrinoKind(
    row.sourceKind ?? row.emitterKind ?? row.source?.kind,
    `bridge response delayedHits[${index}].sourceKind`,
  );
  const receiverKind = normalizeArchitrinoKind(
    row.receiverKind ?? row.targetKind ?? row.receiver?.kind,
    `bridge response delayedHits[${index}].receiverKind`,
  );
  const sourceDepth = normalizePositiveInteger(
    row.sourceDepth ?? row.emitterDepth,
    undefined,
    `bridge response delayedHits[${index}].sourceDepth`,
  );
  const receiverDepth = normalizePositiveInteger(
    row.receiverDepth ?? row.targetDepth,
    undefined,
    `bridge response delayedHits[${index}].receiverDepth`,
  );
  const source = findHistoryPoint(history, sourceKind, sourceDepth, `source ${sourceKind} ${sourceDepth}`);
  const receiver = findHistoryPoint(history, receiverKind, receiverDepth, `receiver ${receiverKind} ${receiverDepth}`);
  const emissionTime = normalizeFiniteNumber(source.t, `bridge response delayedHits[${index}].emissionTime`);
  const hitTime = normalizeFiniteNumber(receiver.t, `bridge response delayedHits[${index}].hitTime`);
  const travelTime = hitTime - emissionTime;
  if (!Number.isFinite(travelTime) || travelTime <= 0) {
    throw new TypeError(`bridge response delayedHits[${index}] must reference a later receiver history point`);
  }

  return {
    id: normalizeOptionalString(
      row.id,
      `${sourceKind}-${sourceDepth}-to-${receiverKind}-${receiverDepth}`,
      `bridge response delayedHits[${index}].id`,
    ),
    label:
      typeof row.label === "string" && row.label.length > 0
        ? row.label
        : `${kindLabel(sourceKind)} ${sourceDepth} -> ${kindLabel(receiverKind)} ${receiverDepth}`,
    sourceKind,
    receiverKind,
    sourceDepth,
    receiverDepth,
    source,
    receiver,
    emissionTime,
    hitTime,
    travelTime,
    ...(row.solverEmissionTime != null
      ? {
          solverEmissionTime: normalizeFiniteNumber(
            row.solverEmissionTime,
            `bridge response delayedHits[${index}].solverEmissionTime`,
          ),
        }
      : {}),
    ...(row.solverHitTime != null
      ? {
          solverHitTime: normalizeFiniteNumber(
            row.solverHitTime,
            `bridge response delayedHits[${index}].solverHitTime`,
          ),
        }
      : {}),
    ...(row.solverDistance != null
      ? {
          solverDistance: normalizeNonnegativeNumber(
            row.solverDistance,
            undefined,
            `bridge response delayedHits[${index}].solverDistance`,
          ),
        }
      : {}),
    ...(row.solverJacobian != null
      ? {
          solverJacobian: normalizeFiniteNumber(
            row.solverJacobian,
            `bridge response delayedHits[${index}].solverJacobian`,
          ),
        }
      : {}),
    ...(row.solverResidual != null
      ? {
          solverResidual: normalizeFiniteNumber(
            row.solverResidual,
            `bridge response delayedHits[${index}].solverResidual`,
          ),
        }
      : {}),
    ...(row.solverRootStatusCode != null
      ? {
          solverRootStatusCode: normalizeNonnegativeInteger(
            row.solverRootStatusCode,
            `bridge response delayedHits[${index}].solverRootStatusCode`,
          ),
        }
      : {}),
    ...(row.solverHitStatusCode != null
      ? {
          solverHitStatusCode: normalizeNonnegativeInteger(
            row.solverHitStatusCode,
            `bridge response delayedHits[${index}].solverHitStatusCode`,
          ),
        }
      : {}),
    ...(row.solverRunId != null
      ? {
          solverRunId: normalizeOptionalString(
            row.solverRunId,
            undefined,
            `bridge response delayedHits[${index}].solverRunId`,
          ),
        }
      : {}),
    color: sourceKind === "positrino" ? POSITRINO_WAKE : ELECTRINO_WAKE,
    weight: normalizeUnitNumber(row.weight ?? row.strength, undefined, `bridge response delayedHits[${index}].weight`),
    distance: normalizeNonnegativeNumber(
      row.distance,
      getDistance(source, receiver),
      `bridge response delayedHits[${index}].distance`,
    ),
    mode: row.mode ?? PARTIAL_PROPAGATING_ARCS,
    rootStatus: row.rootStatus ?? row.status ?? null,
    rootCount: normalizeNonnegativeInteger(
      row.rootCount ?? 0,
      `bridge response delayedHits[${index}].rootCount`,
    ),
    solverHitCount: normalizeNonnegativeInteger(
      row.solverHitCount ?? 0,
      `bridge response delayedHits[${index}].solverHitCount`,
    ),
  };
}

function normalizePoint(point, label) {
  requireObject(point, label);
  const normalized = {
    x: normalizeFiniteNumber(point.x, `${label}.x`),
    y: normalizeFiniteNumber(point.y, `${label}.y`),
  };
  if (point.z != null) {
    normalized.z = normalizeFiniteNumber(point.z, `${label}.z`);
  }
  if (point.vx != null) {
    normalized.vx = normalizeFiniteNumber(point.vx, `${label}.vx`);
  }
  if (point.vy != null) {
    normalized.vy = normalizeFiniteNumber(point.vy, `${label}.vy`);
  }
  return normalized;
}

function normalizeVectorPoint(point, label) {
  requireObject(point, label);
  return {
    x: normalizeFiniteNumber(point.x, `${label}.x`),
    y: normalizeFiniteNumber(point.y, `${label}.y`),
    ...(point.z != null ? { z: normalizeFiniteNumber(point.z, `${label}.z`) } : {}),
  };
}

function normalizeOptionalVector(point, label) {
  if (point == null) {
    return null;
  }
  return normalizeVectorPoint(point, label);
}

function normalizeOptionalVirtualObserver(point) {
  if (point == null) {
    return null;
  }
  const normalized = normalizePoint(point, "virtualObserver");
  return {
    ...point,
    ...normalized,
    kind: "virtualObserver",
    label: typeof point.label === "string" && point.label.length > 0 ? point.label : "Virtual Observer",
    role: typeof point.role === "string" && point.role.length > 0 ? point.role : "observer",
  };
}

function findHistoryPoint(history, kind, depth, label) {
  const row = history[kind].find((candidate) => candidate.depth === depth);
  if (!row) {
    throw new TypeError(`bridge response delayed hit references missing ${label}`);
  }
  return { x: row.x, y: row.y, t: row.t };
}

function createDefaultReplayModel() {
  return {
    modelId: "aaa.central-solver",
    equationVersion: "motion-root-v1",
    forceLawVersion: "causal-delay-v1",
    constantsHash: "constants:causal-delay-feedback",
    causalSpeedPolicy: "fixed-field-speed",
    branchPolicy: "all-positive-roots",
    unitConvention: "solver-si",
    compatiblePrecisionPaths: ["scaled_f64_strict", "event_root_focused", "extended_precision"],
  };
}

function createDefaultReplayEnvelope({ input, memoryBudgetBytes }) {
  return {
    entityCount: 16,
    assemblyCount: 1,
    timeWindow: {
      start: 0,
      end: normalizePositiveNumber(input.runDuration, DEFAULT_RUN_DURATION, "runDuration"),
      stepHint: 0.01,
      units: "solver-time",
    },
    timeResolutionHint: 0.01,
    interactionPolicy: "neighbor-pruned",
    expectedBranchComplexity: "low",
    outputDetail: "playback",
    memoryBudgetBytes,
    storageBudgetBytes: 512 * 1024 * 1024,
    latencyTarget: "background",
    simplificationPolicy: "none",
  };
}

function createDefaultReplayErrorBudget() {
  return {
    globalTolerance: 1e-13,
    rootIsolationTolerance: 1e-14,
    delayedHitTolerance: 1e-13,
    integrationTolerance: 1e-12,
    streamEncodingTolerance: 1e-12,
    readbackTolerance: 1e-12,
    projectionTolerance: 1e-9,
    displayTolerance: 1e-6,
  };
}

function createBridgeMotionFramesFromReplayDataset(replayDataset) {
  requireObject(replayDataset, "replayDataset");
  return ARCHITRINO_KINDS.flatMap((kind) => {
    const points = replayDataset.paths?.[kind];
    if (!Array.isArray(points) || points.length === 0) {
      throw new TypeError(`replayDataset.paths.${kind} must include path samples`);
    }
    return points.map((point, index) => {
      const velocity = getPathVelocity(points, index);
      return {
        pathKey: PATH_KEYS_BY_KIND[kind],
        frameIndex: index,
        time: normalizeFiniteNumber(point.t, `replayDataset.paths.${kind}[${index}].t`),
        position: toBridgeVector(point),
        velocity: {
          x: Number.isFinite(Number(point.vx)) ? Number(point.vx) : velocity.x,
          y: Number.isFinite(Number(point.vy)) ? Number(point.vy) : velocity.y,
          z: Number.isFinite(Number(point.vz)) ? Number(point.vz) : 0,
        },
        errorBound: Number.isFinite(Number(point.errorBound)) ? Number(point.errorBound) : 0,
        stateFlags: kind === "positrino" ? 1 : 2,
      };
    });
  });
}

function createBridgeDelayedHitsFromReplayDataset(replayDataset) {
  requireObject(replayDataset, "replayDataset");
  const links = replayDataset.wakeLinks;
  if (!Array.isArray(links) || links.length === 0) {
    throw new TypeError("replayDataset.wakeLinks must include delayed-hit links");
  }
  return links.map((link, index) => {
    const source = findReplayHistoryPoint(replayDataset, link.sourceKind, link.sourceDepth);
    const receiver = findReplayHistoryPoint(replayDataset, link.receiverKind, link.receiverDepth);
    const distance = getDistance(source, receiver);
    return {
      eventId: index,
      rootId: index,
      statusCode: 0,
      emissionTime: normalizeFiniteNumber(source.t, `wakeLinks[${index}].emissionTime`),
      hitTime: normalizeFiniteNumber(receiver.t, `wakeLinks[${index}].hitTime`),
      distance,
      jacobian: 1,
      strength: normalizeUnitNumber(link.weight, 1, `wakeLinks[${index}].weight`),
      emissionPoint: toBridgeVector(source),
      receiverPoint: toBridgeVector(receiver),
      unitDirection: toUnitDirection(source, receiver, distance),
      id: link.id,
      label: link.label,
      sourceKind: link.sourceKind,
      receiverKind: link.receiverKind,
      sourceDepth: link.sourceDepth,
      receiverDepth: link.receiverDepth,
      weight: link.weight,
      mode: replayDataset.wakeArcDisplayMode,
    };
  });
}

function createBridgeDelayedHitsFromDelayedHitRuns(runHandles, replayDataset) {
  const links = replayDataset.wakeLinks;
  if (!Array.isArray(runHandles) || runHandles.length !== links.length) {
    throw new TypeError("delayed-hit run handles must match wake link count");
  }
  return runHandles.map((runHandle, index) => {
    const response = unwrapBridgeResponse(runHandle);
    const solverHit = normalizeOptionalArray(
      response.hits ?? response.delayedHits ?? response.delayedHitEvents,
    )[0];
    const solverRoot = normalizeOptionalArray(response.roots)[0];
    const fallback = createBridgeDelayedHitFromWakeLink(replayDataset, links[index], index);
    return {
      ...fallback,
      eventId: solverHit?.eventId ?? fallback.eventId,
      rootId: solverHit?.rootId ?? fallback.rootId,
      statusCode: solverHit?.statusCode ?? fallback.statusCode,
      distance: solverHit?.distance ?? fallback.distance,
      jacobian: solverHit?.jacobian ?? fallback.jacobian,
      strength: solverHit?.strength ?? fallback.strength,
      ...(solverHit?.emissionTime != null ? { solverEmissionTime: solverHit.emissionTime } : {}),
      ...(solverHit?.hitTime != null ? { solverHitTime: solverHit.hitTime } : {}),
      ...(solverHit?.distance != null ? { solverDistance: solverHit.distance } : {}),
      ...(solverHit?.jacobian != null ? { solverJacobian: solverHit.jacobian } : {}),
      ...(solverHit?.statusCode != null ? { solverHitStatusCode: solverHit.statusCode } : {}),
      ...(solverRoot?.statusCode != null ? { solverRootStatusCode: solverRoot.statusCode } : {}),
      ...(solverRoot?.residual != null ? { solverResidual: solverRoot.residual } : {}),
      ...(solverHit?.emissionPoint != null
        ? { solverEmissionPoint: cloneObject(solverHit.emissionPoint, "solverHit.emissionPoint") }
        : {}),
      ...(solverHit?.receiverPoint != null
        ? { solverReceiverPoint: cloneObject(solverHit.receiverPoint, "solverHit.receiverPoint") }
        : {}),
      ...(solverHit?.unitDirection != null
        ? { solverUnitDirection: cloneObject(solverHit.unitDirection, "solverHit.unitDirection") }
        : {}),
      rootStatus: response.status ?? response.summary?.status ?? fallback.rootStatus,
      solverRunId: response.runId ?? runHandle.runId,
      rootCount: Array.isArray(response.roots) ? response.roots.length : 0,
      solverHitCount: Array.isArray(response.hits) ? response.hits.length : 0,
    };
  });
}

function createBridgeDelayedHitFromWakeLink(replayDataset, link, index) {
  const source = findReplayHistoryPoint(replayDataset, link.sourceKind, link.sourceDepth);
  const receiver = findReplayHistoryPoint(replayDataset, link.receiverKind, link.receiverDepth);
  const distance = getDistance(source, receiver);
  return {
    eventId: index,
    rootId: index,
    statusCode: 1,
    emissionTime: normalizeFiniteNumber(source.t, `wakeLinks[${index}].emissionTime`),
    hitTime: normalizeFiniteNumber(receiver.t, `wakeLinks[${index}].hitTime`),
    distance,
    jacobian: 0,
    strength: normalizeUnitNumber(link.weight, 1, `wakeLinks[${index}].weight`),
    emissionPoint: toBridgeVector(source),
    receiverPoint: toBridgeVector(receiver),
    unitDirection: toUnitDirection(source, receiver, distance),
    id: link.id,
    label: link.label,
    sourceKind: link.sourceKind,
    receiverKind: link.receiverKind,
    sourceDepth: link.sourceDepth,
    receiverDepth: link.receiverDepth,
    weight: link.weight,
    mode: replayDataset.wakeArcDisplayMode,
    rootStatus: { code: "solver_no_delayed_hit", severity: "warn" },
  };
}

function createBridgeGeometryFromReplayDataset(replayDataset, { initialConditions = {} } = {}) {
  requireObject(replayDataset, "replayDataset");
  const virtualObserver = replayDataset.virtualObserver ?? initialConditions.virtualObserver ?? null;
  return {
    pathBounds: [],
    spherePointIntersections: [],
    history: cloneObject(replayDataset.history, "replayDataset.history"),
    initialConditions: cloneObject(initialConditions, "initialConditions"),
    ...(virtualObserver ? { virtualObserver: cloneObject(virtualObserver, "virtualObserver") } : {}),
    presetId: replayDataset.preset?.id ?? DEFAULT_PRESET_ID,
    canvasColorId: replayDataset.canvasColorId ?? replayDataset.preset?.canvasColorId ?? DEFAULT_CANVAS_ID,
    wakeArcDisplayMode: replayDataset.wakeArcDisplayMode ?? PARTIAL_PROPAGATING_ARCS,
    status: { code: "ok", severity: "ok", message: "causal-delay replay metadata prepared" },
  };
}

function getPathVelocity(points, index) {
  const previous = points[Math.max(0, index - 1)];
  const next = points[Math.min(points.length - 1, index + 1)];
  const dt = Number(next.t) - Number(previous.t);
  if (!Number.isFinite(dt) || dt === 0) {
    return { x: 0, y: 0 };
  }
  return {
    x: (Number(next.x) - Number(previous.x)) / dt,
    y: (Number(next.y) - Number(previous.y)) / dt,
  };
}

function findReplayHistoryPoint(replayDataset, kind, depth) {
  const point = replayDataset.history?.[kind]?.find((candidate) => candidate.depth === depth);
  if (!point) {
    throw new TypeError(`replayDataset history missing ${kind} ${depth}`);
  }
  return point;
}

function toBridgeVector(point) {
  return {
    x: normalizeFiniteNumber(point.x, "point.x"),
    y: normalizeFiniteNumber(point.y, "point.y"),
    z: Number.isFinite(Number(point.z)) ? Number(point.z) : 0,
  };
}

function toUnitDirection(source, receiver, distance) {
  if (!Number.isFinite(distance) || distance === 0) {
    return { x: 0, y: 0, z: 0 };
  }
  return {
    x: (receiver.x - source.x) / distance,
    y: (receiver.y - source.y) / distance,
    z: ((receiver.z ?? 0) - (source.z ?? 0)) / distance,
  };
}

function defaultHistoryState(index, count) {
  if (index === 0) {
    return "older";
  }
  if (index === count - 1) {
    return "newer";
  }
  return "active";
}

function kindLabel(kind) {
  return kind === "positrino" ? "red" : "blue";
}

function normalizeArchitrinoKind(value, label) {
  if (!ARCHITRINO_KINDS.includes(value)) {
    throw new TypeError(`${label} must be positrino or electrino`);
  }
  return value;
}

function normalizeOptionalArray(value) {
  return Array.isArray(value) ? value.map((entry) => cloneJson(entry)) : [];
}

function normalizeOptionalString(value, fallback, label) {
  const nextValue = value ?? fallback;
  if (typeof nextValue !== "string" || nextValue.length === 0) {
    throw new TypeError(`${label} must be a non-empty string`);
  }
  return nextValue;
}

function normalizeFiniteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new TypeError(`${label} must be a finite number`);
  }
  return number;
}

function normalizePositiveNumber(value, fallback, label) {
  const number = Number(value ?? fallback);
  if (!Number.isFinite(number) || number <= 0) {
    throw new TypeError(`${label} must be a positive number`);
  }
  return number;
}

function normalizeNonnegativeNumber(value, fallback, label) {
  const number = Number(value ?? fallback);
  if (!Number.isFinite(number) || number < 0) {
    throw new TypeError(`${label} must be a nonnegative number`);
  }
  return number;
}

function normalizeNonnegativeInteger(value, label) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 0) {
    throw new TypeError(`${label} must be a nonnegative integer`);
  }
  return number;
}

function normalizeUnitNumber(value, fallback, label) {
  const number = Number(value ?? fallback);
  if (!Number.isFinite(number) || number < 0 || number > 1) {
    throw new TypeError(`${label} must be a finite number from 0 to 1`);
  }
  return number;
}

function normalizePositiveInteger(value, fallback, label) {
  const number = Number(value ?? fallback);
  if (!Number.isInteger(number) || number <= 0) {
    throw new TypeError(`${label} must be a positive integer`);
  }
  return number;
}

function cloneObject(value, label) {
  requireObject(value, label);
  return cloneJson(value);
}

function cloneArray(value, label) {
  if (!Array.isArray(value)) {
    throw new TypeError(`${label} must be an array`);
  }
  return cloneJson(value);
}

function requireObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError(`${label} must be an object`);
  }
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

export const CAUSAL_DELAY_WAKE_MODES = Object.freeze([
  PARTIAL_PROPAGATING_ARCS,
  FULL_CIRCULAR_ARCS,
]);
