import { runSolverAppBridgeRequest } from "../../solver/app/SolverAppBridgeClientResolver.mjs";
import {
  CENTRAL_SOLVER_BRIDGE_TARGET,
  DEFAULT_CANVAS_ID,
  DEFAULT_PRESET_ID,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
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
export const CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE = "pairInteraction";
export const CENTRAL_SOLVER_DELAYED_HITS_RUN_KIND = "delayedHits";

const DEFAULT_MEMORY_BUDGET_BYTES = 128 * 1024 * 1024;
const DEFAULT_HISTORY_DEPTH = 4;
const DEFAULT_FRAME_COUNT = 180;
const DEFAULT_RUN_DURATION = 1;
const DEFAULT_PAIR_ACCELERATION_SCALE = 0.18;
const DEFAULT_PAIR_SEGMENT_COUNT = 12;
const DEFAULT_PAIR_INTERACTION_SOFTENING = 0;
const DEFAULT_PAIR_INTERACTION_LAW = "inverse_distance_pair_attraction_v1";
const PAIR_SEGMENTED_ACCELERATION_POLICY = "pair_segmented_attraction_seed";
const PAIR_INITIAL_ACCELERATION_POLICY = "pair_initial_attraction_seed";
const EXPLICIT_ACCELERATION_POLICY = "explicit";
const TIME_SPACE_CANVAS_FIT_PROJECTION = "time_space_canvas_fit_v1";
const TIME_AXIS_START_X = DESIGN_WIDTH * 0.05;
const TIME_AXIS_END_X = DESIGN_WIDTH * 0.95;
const SPACE_AXIS_TOP_Y = DESIGN_HEIGHT * 0.2;
const SPACE_AXIS_BOTTOM_Y = DESIGN_HEIGHT * 0.8;
const PATH_CONSTRAINT_DRAFT_REASONS = new Set([
  "retained_point_drag_preview",
  "reception_point_insert_preview",
]);
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
      motion: {
        accelerationPolicy: normalizeOptionalString(
          input.motionAccelerationPolicy ?? input.accelerationPolicy,
          PAIR_SEGMENTED_ACCELERATION_POLICY,
          "motionAccelerationPolicy",
        ),
        pairAccelerationScale: normalizePositiveNumber(
          input.pairAccelerationScale,
          DEFAULT_PAIR_ACCELERATION_SCALE,
          "pairAccelerationScale",
        ),
        pairSegmentCount: normalizePositiveInteger(
          input.pairSegmentCount,
          DEFAULT_PAIR_SEGMENT_COUNT,
          "pairSegmentCount",
        ),
        pairInteractionLaw: normalizeOptionalString(
          input.pairInteractionLaw,
          DEFAULT_PAIR_INTERACTION_LAW,
          "pairInteractionLaw",
        ),
        pathConstraintBoundaryResidualTolerance: normalizeOptionalNonnegativeNumber(
          input.pathConstraintBoundaryResidualTolerance ?? input.boundaryResidualTolerance,
          "pathConstraintBoundaryResidualTolerance",
        ),
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
      const replayMode = resolveCentralSolverReplayMode(requestOptions, options);
      if (
        replayMode === CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE ||
        replayMode === CENTRAL_SOLVER_MOTION_REPLAY_MODE
      ) {
        return createMotionSolverReplayDataset(request, options, { replayMode });
      }
      const runHandle = await runCausalDelayBridgeRequest(request, options, {
        factoryRequest: request.config.initialConditions,
        requestedCapabilities: ["appPlayback", "pathHistory", "causalRoots", "delayedHits"],
      });
      return normalizeCausalDelayFeedbackBridgeReplay(runHandle, { presetId });
    },
  };
}

async function createMotionSolverReplayDataset(playbackRequest, options = {}, { replayMode } = {}) {
  const resolvedReplayMode = replayMode ?? CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE;
  const motionReplay = await createMotionSolverReplayFrames(playbackRequest, options, resolvedReplayMode);
  const displayReplay = createDisplayReplayFrames(playbackRequest, motionReplay, resolvedReplayMode);
  const { bridgeFrames } = displayReplay;
  const { motionRunHandles } = motionReplay;
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
          replayMode: resolvedReplayMode,
          motionAccelerationPolicy: playbackRequest.config.motion.accelerationPolicy,
          pairSegmentCount: motionReplay.pairSegmentCount,
          pairInteractionStepCount: motionReplay.pairInteractionStepCount,
          interactionLaw: motionReplay.interactionLaw,
          executionPath: motionReplay.executionPath,
          pathConstraintCount: motionReplay.pathConstraintCount,
          pathConstraintResidualSampleCount: motionReplay.pathConstraintResidualSampleCount,
          maxPathConstraintResidual: motionReplay.maxPathConstraintResidual,
          meanPathConstraintResidual: motionReplay.meanPathConstraintResidual,
          rmsPathConstraintResidual: motionReplay.rmsPathConstraintResidual,
          pathConstraintGuidanceSampleCount: motionReplay.pathConstraintGuidanceSampleCount,
          pathConstraintGuidanceMode: motionReplay.pathConstraintGuidanceMode,
          pathConstraintBoundaryMode: motionReplay.pathConstraintBoundaryMode,
          pathConstraintBoundaryRelaxationMode: motionReplay.pathConstraintBoundaryRelaxationMode,
          pathConstraintBoundaryRelaxationIterationCount:
            motionReplay.pathConstraintBoundaryRelaxationIterationCount,
          pathConstraintSolverStatus: motionReplay.pathConstraintSolverStatus,
          pathConstraintSolverClaim: motionReplay.pathConstraintSolverClaim,
          maxPathConstraintGuidanceAcceleration: motionReplay.maxPathConstraintGuidanceAcceleration,
          meanPathConstraintGuidanceAcceleration: motionReplay.meanPathConstraintGuidanceAcceleration,
          rmsPathConstraintGuidanceAcceleration: motionReplay.rmsPathConstraintGuidanceAcceleration,
          pathConstraintBoundaryResidualSampleCount: motionReplay.pathConstraintBoundaryResidualSampleCount,
          pathConstraintBoundaryResidualStatus: motionReplay.pathConstraintBoundaryResidualStatus,
          pathConstraintBoundaryResidualTolerance: motionReplay.pathConstraintBoundaryResidualTolerance,
          maxPathConstraintBoundaryResidual: motionReplay.maxPathConstraintBoundaryResidual,
          meanPathConstraintBoundaryResidual: motionReplay.meanPathConstraintBoundaryResidual,
          rmsPathConstraintBoundaryResidual: motionReplay.rmsPathConstraintBoundaryResidual,
          displayProjection: displayReplay.displayProjection,
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
          solverReplayMode: resolvedReplayMode,
          motionAccelerationPolicy: playbackRequest.config.motion.accelerationPolicy,
          pairSegmentCount: motionReplay.pairSegmentCount,
          pairAccelerationScale: playbackRequest.config.motion.pairAccelerationScale,
          pairInteractionStepCount: motionReplay.pairInteractionStepCount,
          interactionLaw: motionReplay.interactionLaw,
          executionPath: motionReplay.executionPath,
          pathConstraintCount: motionReplay.pathConstraintCount,
          pathConstraintResidualSampleCount: motionReplay.pathConstraintResidualSampleCount,
          maxPathConstraintResidual: motionReplay.maxPathConstraintResidual,
          meanPathConstraintResidual: motionReplay.meanPathConstraintResidual,
          rmsPathConstraintResidual: motionReplay.rmsPathConstraintResidual,
          pathConstraintGuidanceSampleCount: motionReplay.pathConstraintGuidanceSampleCount,
          pathConstraintGuidanceMode: motionReplay.pathConstraintGuidanceMode,
          pathConstraintBoundaryMode: motionReplay.pathConstraintBoundaryMode,
          pathConstraintBoundaryRelaxationMode: motionReplay.pathConstraintBoundaryRelaxationMode,
          pathConstraintBoundaryRelaxationIterationCount:
            motionReplay.pathConstraintBoundaryRelaxationIterationCount,
          pathConstraintSolverStatus: motionReplay.pathConstraintSolverStatus,
          pathConstraintSolverClaim: motionReplay.pathConstraintSolverClaim,
          maxPathConstraintGuidanceAcceleration: motionReplay.maxPathConstraintGuidanceAcceleration,
          meanPathConstraintGuidanceAcceleration: motionReplay.meanPathConstraintGuidanceAcceleration,
          rmsPathConstraintGuidanceAcceleration: motionReplay.rmsPathConstraintGuidanceAcceleration,
          pathConstraintBoundaryResidualSampleCount: motionReplay.pathConstraintBoundaryResidualSampleCount,
          pathConstraintBoundaryResidualStatus: motionReplay.pathConstraintBoundaryResidualStatus,
          pathConstraintBoundaryResidualTolerance: motionReplay.pathConstraintBoundaryResidualTolerance,
          maxPathConstraintBoundaryResidual: motionReplay.maxPathConstraintBoundaryResidual,
          meanPathConstraintBoundaryResidual: motionReplay.meanPathConstraintBoundaryResidual,
          rmsPathConstraintBoundaryResidual: motionReplay.rmsPathConstraintBoundaryResidual,
          displayProjection: displayReplay.displayProjection,
          motionRunIds: motionRunHandles.map((handle) => handle.runId ?? handle.response?.runId),
          delayedHitRunIds: delayedHitRunHandles.map((handle) => handle.runId ?? handle.response?.runId),
        },
        diagnostics: [
          {
            code: "causal_delay_motion_solver_replay",
            severity: "info",
            message:
              resolvedReplayMode === CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE
                ? "central pair interaction run generated architrino frame samples"
                : `central motion simulations generated architrino frame samples with ${playbackRequest.config.motion.accelerationPolicy}`,
          },
          ...motionDiagnostics,
          ...delayedHitDiagnostics,
        ],
      },
    },
    { presetId: playbackRequest.config.presetId },
  );
}

function createDisplayReplayFrames(playbackRequest, motionReplay, replayMode) {
  if (
    replayMode !== CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE ||
    Number(motionReplay.pathConstraintCount) > 0
  ) {
    return {
      bridgeFrames: motionReplay.bridgeFrames,
      displayProjection: undefined,
    };
  }
  return {
    bridgeFrames: projectBridgeFramesToTimeSpaceCanvas(motionReplay.bridgeFrames, playbackRequest),
    displayProjection: TIME_SPACE_CANVAS_FIT_PROJECTION,
  };
}

async function createMotionSolverReplayFrames(playbackRequest, options = {}, replayMode = CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE) {
  if (replayMode === CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE) {
    return createPairInteractionSolverReplayFrames(playbackRequest, options);
  }
  if (playbackRequest.config.motion.accelerationPolicy === PAIR_SEGMENTED_ACCELERATION_POLICY) {
    return createSegmentedPairMotionSolverReplayFrames(playbackRequest, options);
  }
  return createIndependentMotionSolverReplayFrames(playbackRequest, options);
}

function projectBridgeFramesToTimeSpaceCanvas(frames, playbackRequest) {
  if (!Array.isArray(frames) || frames.length === 0) {
    return frames;
  }
  const timeValues = frames
    .map((frame) => Number(frame.time ?? frame.t))
    .filter(Number.isFinite);
  const configuredStart = Math.min(
    ...ARCHITRINO_KINDS.map((kind) => {
      const condition = playbackRequest.config.initialConditions?.[kind];
      return Number.isFinite(Number(condition?.t)) ? Number(condition.t) : 0;
    }),
  );
  const configuredEnd =
    configuredStart +
    normalizePositiveNumber(
      playbackRequest.config.replay?.runDuration,
      DEFAULT_RUN_DURATION,
      "replay.runDuration",
    );
  const timeStart = timeValues.length > 0 ? Math.min(...timeValues) : configuredStart;
  const timeEnd = timeValues.length > 0 ? Math.max(...timeValues) : configuredEnd;
  const timeSpan = Math.max(timeEnd - timeStart, 1e-12);
  const spaceValues = frames
    .map((frame) => Number(frame.position?.y ?? frame.y))
    .filter(Number.isFinite);
  const rawMinY = spaceValues.length > 0 ? Math.min(...spaceValues) : 0;
  const rawMaxY = spaceValues.length > 0 ? Math.max(...spaceValues) : 1;
  const rawSpanY = Math.max(rawMaxY - rawMinY, 1e-9);
  const projected = frames.map((frame) => {
    const time = normalizeFiniteNumber(frame.time ?? frame.t, "central display projection frame.time");
    const rawY = normalizeFiniteNumber(frame.position?.y ?? frame.y, "central display projection frame.y");
    const timeAmount = Math.max(0, Math.min(1, (time - timeStart) / timeSpan));
    const spaceAmount = Math.max(0, Math.min(1, (rawY - rawMinY) / rawSpanY));
    return {
      ...frame,
      position: {
        x: TIME_AXIS_START_X + timeAmount * (TIME_AXIS_END_X - TIME_AXIS_START_X),
        y: SPACE_AXIS_TOP_Y + spaceAmount * (SPACE_AXIS_BOTTOM_Y - SPACE_AXIS_TOP_Y),
        z: Number.isFinite(Number(frame.position?.z)) ? Number(frame.position.z) : 0,
      },
      velocity: {
        x: 0,
        y: 0,
        z: 0,
      },
    };
  });
  return recomputeBridgeFrameVelocities(projected);
}

function recomputeBridgeFrameVelocities(frames) {
  const projected = frames.map((frame) => ({
    ...frame,
    position: cloneObject(frame.position, "projected frame.position"),
    velocity: cloneObject(frame.velocity, "projected frame.velocity"),
  }));
  const byPath = new Map();
  projected.forEach((frame) => {
    const rows = byPath.get(frame.pathKey) ?? [];
    rows.push(frame);
    byPath.set(frame.pathKey, rows);
  });
  byPath.forEach((rows) => {
    const sorted = rows.slice().sort((left, right) => left.time - right.time || left.frameIndex - right.frameIndex);
    sorted.forEach((frame, index) => {
      const previous = sorted[Math.max(0, index - 1)];
      const next = sorted[Math.min(sorted.length - 1, index + 1)];
      const dt = next.time - previous.time;
      frame.velocity = dt > 0
        ? {
            x: (next.position.x - previous.position.x) / dt,
            y: (next.position.y - previous.position.y) / dt,
            z: ((next.position.z ?? 0) - (previous.position.z ?? 0)) / dt,
          }
        : { x: 0, y: 0, z: 0 };
    });
  });
  return projected;
}

async function createPairInteractionSolverReplayFrames(playbackRequest, options = {}) {
  const request = createCausalDelayFeedbackPairInteractionRequest(playbackRequest);
  const runHandle = await runCausalDelayBridgeRequest(request, options, {
    factoryRequest: request.config.pairInteractionRequest,
    requestedCapabilities: ["pairInteraction", "pathHistory", "diagnostics"],
  });
  const response = unwrapBridgeResponse(runHandle);
  const pairSummary = response.summary ?? {};
  const pairInteraction = response.pairInteraction ?? {};
  return {
    bridgeFrames: normalizePairInteractionRunFrames(runHandle),
    motionRunHandles: [runHandle],
    pairSegmentCount: 1,
    pairInteractionStepCount: Number.isFinite(Number(pairSummary.stepCount))
      ? Number(pairSummary.stepCount)
      : undefined,
    interactionLaw: pairSummary.interactionLaw ?? pairInteraction.interactionLaw,
    executionPath: pairSummary.executionPath ?? pairInteraction.executionPath,
    pathConstraintCount: Number.isFinite(Number(pairSummary.pathConstraintCount))
      ? Number(pairSummary.pathConstraintCount)
      : request.config.pairInteractionRequest.pathConstraints?.length,
    pathConstraintResidualSampleCount: optionalFiniteNumber(
      pairSummary.pathConstraintResidualSampleCount ?? pairInteraction.pathConstraintResidualSampleCount
    ),
    maxPathConstraintResidual: optionalFiniteNumber(
      pairSummary.maxPathConstraintResidual ?? pairInteraction.maxPathConstraintResidual
    ),
    meanPathConstraintResidual: optionalFiniteNumber(
      pairSummary.meanPathConstraintResidual ?? pairInteraction.meanPathConstraintResidual
    ),
    rmsPathConstraintResidual: optionalFiniteNumber(
      pairSummary.rmsPathConstraintResidual ?? pairInteraction.rmsPathConstraintResidual
    ),
    pathConstraintGuidanceSampleCount: optionalFiniteNumber(
      pairSummary.pathConstraintGuidanceSampleCount ?? pairInteraction.pathConstraintGuidanceSampleCount
    ),
    pathConstraintGuidanceMode: pairSummary.pathConstraintGuidanceMode ?? pairInteraction.pathConstraintGuidanceMode,
    pathConstraintBoundaryMode: pairSummary.pathConstraintBoundaryMode ?? pairInteraction.pathConstraintBoundaryMode,
    pathConstraintBoundaryRelaxationMode:
      pairSummary.pathConstraintBoundaryRelaxationMode ?? pairInteraction.pathConstraintBoundaryRelaxationMode,
    pathConstraintBoundaryRelaxationIterationCount: optionalFiniteNumber(
      pairSummary.pathConstraintBoundaryRelaxationIterationCount ??
        pairInteraction.pathConstraintBoundaryRelaxationIterationCount
    ),
    pathConstraintSolverStatus: pairSummary.pathConstraintSolverStatus ?? pairInteraction.pathConstraintSolverStatus,
    pathConstraintSolverClaim: pairSummary.pathConstraintSolverClaim ?? pairInteraction.pathConstraintSolverClaim,
    maxPathConstraintGuidanceAcceleration: optionalFiniteNumber(
      pairSummary.maxPathConstraintGuidanceAcceleration ?? pairInteraction.maxPathConstraintGuidanceAcceleration
    ),
    meanPathConstraintGuidanceAcceleration: optionalFiniteNumber(
      pairSummary.meanPathConstraintGuidanceAcceleration ?? pairInteraction.meanPathConstraintGuidanceAcceleration
    ),
    rmsPathConstraintGuidanceAcceleration: optionalFiniteNumber(
      pairSummary.rmsPathConstraintGuidanceAcceleration ?? pairInteraction.rmsPathConstraintGuidanceAcceleration
    ),
    pathConstraintBoundaryResidualSampleCount: optionalFiniteNumber(
      pairSummary.pathConstraintBoundaryResidualSampleCount ?? pairInteraction.pathConstraintBoundaryResidualSampleCount
    ),
    pathConstraintBoundaryResidualStatus:
      pairSummary.pathConstraintBoundaryResidualStatus ?? pairInteraction.pathConstraintBoundaryResidualStatus,
    pathConstraintBoundaryResidualTolerance: optionalFiniteNumber(
      pairSummary.pathConstraintBoundaryResidualTolerance ??
        pairInteraction.pathConstraintBoundaryResidualTolerance ??
        request.config.pairInteractionRequest.pathConstraintBoundaryResidualTolerance
    ),
    maxPathConstraintBoundaryResidual: optionalFiniteNumber(
      pairSummary.maxPathConstraintBoundaryResidual ?? pairInteraction.maxPathConstraintBoundaryResidual
    ),
    meanPathConstraintBoundaryResidual: optionalFiniteNumber(
      pairSummary.meanPathConstraintBoundaryResidual ?? pairInteraction.meanPathConstraintBoundaryResidual
    ),
    rmsPathConstraintBoundaryResidual: optionalFiniteNumber(
      pairSummary.rmsPathConstraintBoundaryResidual ?? pairInteraction.rmsPathConstraintBoundaryResidual
    ),
  };
}

async function createIndependentMotionSolverReplayFrames(playbackRequest, options = {}) {
  const motionRunHandles = await Promise.all(
    ARCHITRINO_KINDS.map((kind) => {
      const request = createCausalDelayFeedbackMotionSimulationRequest(playbackRequest, kind);
      return runCausalDelayBridgeRequest(request, options, {
        factoryRequest: request.config.motionIntegrationRequest,
        requestedCapabilities: ["motionSimulation", "pathHistory", "diagnostics"],
      });
    }),
  );
  return {
    bridgeFrames: motionRunHandles.flatMap((runHandle, index) => (
      normalizeMotionRunFrames(runHandle, ARCHITRINO_KINDS[index])
    )),
    motionRunHandles,
    pairSegmentCount: 1,
  };
}

async function createSegmentedPairMotionSolverReplayFrames(playbackRequest, options = {}) {
  const replayConfig = playbackRequest.config.replay;
  const frameCount = normalizePositiveInteger(replayConfig.frameCount, DEFAULT_FRAME_COUNT, "frameCount");
  const runDuration = normalizePositiveNumber(replayConfig.runDuration, DEFAULT_RUN_DURATION, "runDuration");
  const requestedSegmentCount = normalizePositiveInteger(
    playbackRequest.config.motion.pairSegmentCount,
    DEFAULT_PAIR_SEGMENT_COUNT,
    "pairSegmentCount",
  );
  const segmentCount = Math.min(requestedSegmentCount, Math.max(1, frameCount - 1));
  const segmentFrameCount = Math.max(2, Math.ceil((frameCount - 1) / segmentCount) + 1);
  let frameIndexOffset = 0;
  const bridgeFrames = [];
  const motionRunHandles = [];
  const states = Object.fromEntries(
    ARCHITRINO_KINDS.map((kind) => [
      kind,
      createMotionStateFromInitialCondition(kind, playbackRequest.config.initialConditions[kind]),
    ]),
  );
  const startTime = Math.min(...ARCHITRINO_KINDS.map((kind) => states[kind].t));

  for (let segmentIndex = 0; segmentIndex < segmentCount; segmentIndex += 1) {
    const segmentStartTime = startTime + (runDuration * segmentIndex) / segmentCount;
    const segmentEndTime = startTime + (runDuration * (segmentIndex + 1)) / segmentCount;
    const accelerations = Object.fromEntries(
      ARCHITRINO_KINDS.map((kind) => {
        const otherKind = kind === "positrino" ? "electrino" : "positrino";
        return [
          kind,
          createPairAttractionAcceleration(playbackRequest, kind, states[kind], states[otherKind]),
        ];
      }),
    );
    const segmentRunHandles = await Promise.all(
      ARCHITRINO_KINDS.map((kind) => {
        const request = createCausalDelayFeedbackMotionSimulationRequest(playbackRequest, kind, {
          condition: states[kind],
          startTime: segmentStartTime,
          endTime: segmentEndTime,
          frameCount: segmentFrameCount,
          acceleration: accelerations[kind],
          accelerationPolicy: PAIR_SEGMENTED_ACCELERATION_POLICY,
          runId: `${playbackRequest.runId}-${kind}-pair-segment-${segmentIndex + 1}`,
          segmentIndex,
        });
        return runCausalDelayBridgeRequest(request, options, {
          factoryRequest: request.config.motionIntegrationRequest,
          requestedCapabilities: ["motionSimulation", "pathHistory", "diagnostics"],
        });
      }),
    );
    motionRunHandles.push(...segmentRunHandles);
    const segmentFramesByKind = Object.fromEntries(
      ARCHITRINO_KINDS.map((kind, index) => [
        kind,
        normalizeMotionRunFrames(segmentRunHandles[index], kind).sort((left, right) => left.time - right.time),
      ]),
    );
    const segmentLength = Math.min(...ARCHITRINO_KINDS.map((kind) => segmentFramesByKind[kind].length));
    const startOffset = segmentIndex > 0 ? 1 : 0;
    for (const kind of ARCHITRINO_KINDS) {
      segmentFramesByKind[kind].slice(startOffset, segmentLength).forEach((frame, localIndex) => {
        bridgeFrames.push({
          ...frame,
          frameIndex: frameIndexOffset + localIndex,
        });
      });
    }
    frameIndexOffset += Math.max(0, segmentLength - startOffset);
    ARCHITRINO_KINDS.forEach((kind) => {
      states[kind] = createMotionStateFromFrame(kind, segmentFramesByKind[kind][segmentLength - 1]);
    });
  }

  return {
    bridgeFrames,
    motionRunHandles,
    pairSegmentCount: segmentCount,
  };
}

function resolveCentralSolverReplayMode(requestOptions = {}, options = {}) {
  const value = String(
    requestOptions.solverReplayMode ??
      requestOptions.replayMode ??
      options.solverReplayMode ??
      options.replayMode ??
      CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE,
  ).toLowerCase();
  if (
    value === "pair" ||
    value === "pair-interaction" ||
    value === "pairinteraction" ||
    value === "pair_interaction" ||
    value === "pair_solver" ||
    value === "solver_pair"
  ) {
    return CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE;
  }
  if (
    value === "motion" ||
    value === "motion-simulation" ||
    value === "motionsimulation" ||
    value === "motion_solver" ||
    value === "solver_motion"
  ) {
    return CENTRAL_SOLVER_MOTION_REPLAY_MODE;
  }
  if (
    value === "app" ||
    value === "app-playback" ||
    value === "appplayback" ||
    value === "playback" ||
    value === "bridge-playback"
  ) {
    return CENTRAL_SOLVER_APP_PLAYBACK_REPLAY_MODE;
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

function createCausalDelayFeedbackMotionSimulationRequest(playbackRequest, kind, options = {}) {
  const initialConditions = playbackRequest.config.initialConditions;
  const condition = options.condition ?? initialConditions[kind];
  requireObject(condition, `initialConditions.${kind}`);
  const replayConfig = playbackRequest.config.replay;
  const frameCount = normalizePositiveInteger(options.frameCount, replayConfig.frameCount, "frameCount");
  const runDuration = normalizePositiveNumber(replayConfig.runDuration, DEFAULT_RUN_DURATION, "runDuration");
  const startTime = Number.isFinite(Number(options.startTime))
    ? Number(options.startTime)
    : Number.isFinite(Number(condition.t))
      ? Number(condition.t)
      : 0;
  const endTime = Number.isFinite(Number(options.endTime)) ? Number(options.endTime) : startTime + runDuration;
  const step = (endTime - startTime) / Math.max(1, frameCount - 1);
  const pathKey = PATH_KEYS_BY_KIND[kind];
  const runId = options.runId ?? `${playbackRequest.runId}-${kind}-motion`;
  const accelerationPolicy = options.accelerationPolicy ?? getMotionAccelerationPolicy(playbackRequest, condition);
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
        accelerationPolicy,
        provenance: {
          source: "causal-delay-feedback-initial-conditions",
          presetId: playbackRequest.config.presetId,
          kind,
          ...(Number.isFinite(Number(options.segmentIndex)) ? { segmentIndex: Number(options.segmentIndex) } : {}),
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
        acceleration: options.acceleration ?? createMotionAccelerationFromPolicy(playbackRequest, kind, condition),
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

function createCausalDelayFeedbackPairInteractionRequest(playbackRequest) {
  const initialConditions = playbackRequest.config.initialConditions;
  const replayConfig = playbackRequest.config.replay;
  const frameCount = normalizePositiveInteger(replayConfig.frameCount, DEFAULT_FRAME_COUNT, "frameCount");
  const runDuration = normalizePositiveNumber(replayConfig.runDuration, DEFAULT_RUN_DURATION, "runDuration");
  const pathConstraints = shouldUsePairInteractionPathConstraints(playbackRequest.config.geometry?.draftPreview)
    ? createPairInteractionPathConstraints(playbackRequest.config.geometry?.history)
    : [];
  const startTime = Math.min(
    ...ARCHITRINO_KINDS.map((kind) => {
      const condition = initialConditions[kind];
      return Number.isFinite(Number(condition?.t)) ? Number(condition.t) : 0;
    }),
  );
  const endTime = startTime + runDuration;
  const step = (endTime - startTime) / Math.max(1, frameCount - 1);
  const runId = `${playbackRequest.runId}-pair-interaction`;
  return {
    requestId: `${runId}-request`,
    runId,
    datasetId: `${runId}-dataset`,
    appId: CAUSAL_DELAY_FEEDBACK_APP_ID,
    runKind: CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE,
    claimLevel: playbackRequest.claimLevel,
    precisionPath: playbackRequest.precisionPath,
    configVersion: "causal-delay-feedback-pair-interaction-adapter.v1",
    configHash: `${playbackRequest.configHash ?? playbackRequest.runId}:pair-interaction`,
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
        interpolationRule: "piecewise-pair-interaction-integration",
        provenance: {
          source: "causal-delay-feedback-pair-initial-conditions",
          presetId: playbackRequest.config.presetId,
        },
      },
        pairInteractionRequest: {
          startTime,
          endTime,
          step,
          maxFrames: frameCount + pathConstraints.length,
          pairAccelerationScale: playbackRequest.config.motion.pairAccelerationScale,
          ...(playbackRequest.config.motion.pathConstraintBoundaryResidualTolerance != null
            ? {
                pathConstraintBoundaryResidualTolerance:
                  playbackRequest.config.motion.pathConstraintBoundaryResidualTolerance,
              }
            : {}),
        softening: normalizeNonnegativeNumber(
          playbackRequest.config.motion.pairInteractionSoftening,
          DEFAULT_PAIR_INTERACTION_SOFTENING,
          "pairInteractionSoftening",
        ),
        integrationTolerance: playbackRequest.errorBudget.integrationTolerance,
        interactionLaw:
          playbackRequest.config.motion.pairInteractionLaw ??
          DEFAULT_PAIR_INTERACTION_LAW,
        initialStates: ARCHITRINO_KINDS.map((kind) => {
          const condition = initialConditions[kind];
          requireObject(condition, `initialConditions.${kind}`);
          return {
            pathKey: PATH_KEYS_BY_KIND[kind],
            kind,
            charge: kind === "positrino" ? 1 : -1,
            mass: 1,
            initialPosition: {
              x: normalizeFiniteNumber(condition.x, `initialConditions.${kind}.x`),
              y: normalizeFiniteNumber(condition.y, `initialConditions.${kind}.y`),
              z: normalizeOptionalMotionAxis(condition.z, 0),
            },
            initialVelocity: {
              x: normalizeFiniteNumber(condition.vx, `initialConditions.${kind}.vx`),
              y: normalizeFiniteNumber(condition.vy, `initialConditions.${kind}.vy`),
              z: normalizeOptionalMotionAxis(condition.vz, 0),
            },
            stateFlags: kind === "positrino" ? 1 : 2,
          };
        }),
        pathConstraints,
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

function createPairInteractionPathConstraints(history) {
  if (!history || typeof history !== "object") {
    return [];
  }
  return ARCHITRINO_KINDS.flatMap((kind) => {
    const rows = history[kind];
    if (!Array.isArray(rows)) {
      return [];
    }
    return rows.map((row, index) => {
      requireObject(row, `geometry.history.${kind}[${index}]`);
      return {
        pathKey: PATH_KEYS_BY_KIND[kind],
        kind,
        depth: normalizePositiveInteger(row.depth ?? index + 1, index + 1, `geometry.history.${kind}[${index}].depth`),
        time: normalizeFiniteNumber(row.t ?? row.time, `geometry.history.${kind}[${index}].time`),
        position: {
          x: normalizeFiniteNumber(row.x, `geometry.history.${kind}[${index}].x`),
          y: normalizeFiniteNumber(row.y, `geometry.history.${kind}[${index}].y`),
          z: normalizeOptionalMotionAxis(row.z, 0),
        },
      };
    });
  });
}

function shouldUsePairInteractionPathConstraints(draftPreview) {
  return PATH_CONSTRAINT_DRAFT_REASONS.has(String(draftPreview?.reason ?? ""));
}

function createMotionStateFromInitialCondition(kind, condition) {
  requireObject(condition, `initialConditions.${kind}`);
  return {
    kind,
    t: Number.isFinite(Number(condition.t)) ? Number(condition.t) : 0,
    x: normalizeFiniteNumber(condition.x, `initialConditions.${kind}.x`),
    y: normalizeFiniteNumber(condition.y, `initialConditions.${kind}.y`),
    z: normalizeOptionalMotionAxis(condition.z, 0),
    vx: normalizeFiniteNumber(condition.vx, `initialConditions.${kind}.vx`),
    vy: normalizeFiniteNumber(condition.vy, `initialConditions.${kind}.vy`),
    vz: normalizeOptionalMotionAxis(condition.vz, 0),
  };
}

function createMotionStateFromFrame(kind, frame) {
  requireObject(frame, `central motion segment frame.${kind}`);
  const position = frame.position ?? frame;
  const velocity = frame.velocity ?? frame;
  return {
    kind,
    t: normalizeFiniteNumber(frame.time ?? frame.t, `central motion segment frame.${kind}.time`),
    x: normalizeFiniteNumber(position.x, `central motion segment frame.${kind}.position.x`),
    y: normalizeFiniteNumber(position.y, `central motion segment frame.${kind}.position.y`),
    z: normalizeOptionalMotionAxis(position.z, 0),
    vx: normalizeOptionalMotionAxis(velocity.x ?? velocity.vx, 0),
    vy: normalizeOptionalMotionAxis(velocity.y ?? velocity.vy, 0),
    vz: normalizeOptionalMotionAxis(velocity.z ?? velocity.vz, 0),
  };
}

function normalizeOptionalMotionAxis(value, fallback) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : fallback;
}

function createMotionAccelerationFromPolicy(playbackRequest, kind, condition) {
  const policy = getMotionAccelerationPolicy(playbackRequest, condition);
  if (policy === EXPLICIT_ACCELERATION_POLICY) {
    return {
      x: normalizeOptionalMotionAxis(condition.ax ?? condition.acceleration?.x, 0),
      y: normalizeOptionalMotionAxis(condition.ay ?? condition.acceleration?.y, 0),
      z: normalizeOptionalMotionAxis(condition.az ?? condition.acceleration?.z, 0),
    };
  }
  return createPairInitialAcceleration(playbackRequest, kind, condition);
}

function getMotionAccelerationPolicy(playbackRequest, condition = {}) {
  return normalizeOptionalString(
    condition.accelerationPolicy ?? playbackRequest.config.motion?.accelerationPolicy,
    PAIR_INITIAL_ACCELERATION_POLICY,
    "motionAccelerationPolicy",
  );
}

function createPairInitialAcceleration(playbackRequest, kind, condition) {
  const otherKind = kind === "positrino" ? "electrino" : "positrino";
  const other = playbackRequest.config.initialConditions?.[otherKind];
  requireObject(other, `initialConditions.${otherKind}`);
  return createPairAttractionAcceleration(playbackRequest, kind, condition, other);
}

function createPairAttractionAcceleration(playbackRequest, kind, condition, other) {
  const otherKind = kind === "positrino" ? "electrino" : "positrino";
  const runDuration = normalizePositiveNumber(
    playbackRequest.config.replay?.runDuration,
    DEFAULT_RUN_DURATION,
    "runDuration",
  );
  const scale = normalizePositiveNumber(
    playbackRequest.config.motion?.pairAccelerationScale,
    DEFAULT_PAIR_ACCELERATION_SCALE,
    "pairAccelerationScale",
  );
  const factor = scale / (runDuration * runDuration);
  return {
    x: (normalizeFiniteNumber(other.x, `initialConditions.${otherKind}.x`) -
      normalizeFiniteNumber(condition.x, `initialConditions.${kind}.x`)) * factor,
    y: (normalizeFiniteNumber(other.y, `initialConditions.${otherKind}.y`) -
      normalizeFiniteNumber(condition.y, `initialConditions.${kind}.y`)) * factor,
    z: (normalizeOptionalMotionAxis(other.z, 0) - normalizeOptionalMotionAxis(condition.z, 0)) * factor,
  };
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

function normalizePairInteractionRunFrames(runHandle) {
  const response = unwrapBridgeResponse(runHandle);
  const frames = response.frames ?? response.frameSamples;
  if (!Array.isArray(frames) || frames.length === 0) {
    throw new TypeError("central pair interaction response must include frame samples");
  }
  return frames.map((frame, index) => normalizePairInteractionRunFrame(frame, index));
}

function normalizePairInteractionRunFrame(frame, index) {
  requireObject(frame, `central pair interaction frames[${index}]`);
  const pathKey = normalizePositiveInteger(frame.pathKey, undefined, `central pair interaction frames[${index}].pathKey`);
  if (!KIND_BY_PATH_KEY[pathKey]) {
    throw new TypeError(`central pair interaction frames[${index}].pathKey must identify positrino or electrino`);
  }
  const position = frame.position ?? frame;
  const velocity = frame.velocity ?? frame;
  return {
    pathKey,
    frameIndex: normalizeNonnegativeInteger(
      frame.frameIndex ?? index,
      `central pair interaction frames[${index}].frameIndex`,
    ),
    time: normalizeFiniteNumber(frame.time ?? frame.t, `central pair interaction frames[${index}].time`),
    position: normalizeVectorPoint(position, `central pair interaction frames[${index}].position`),
    velocity: normalizeOptionalVector(velocity, `central pair interaction frames[${index}].velocity`) ?? {
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
    ...(bridgeResponse.geometry?.solverReplayMode
      ? { solverReplayMode: bridgeResponse.geometry.solverReplayMode }
      : {}),
    ...(bridgeResponse.geometry?.motionAccelerationPolicy
      ? { motionAccelerationPolicy: bridgeResponse.geometry.motionAccelerationPolicy }
      : {}),
    ...(Number.isFinite(Number(bridgeResponse.geometry?.pairAccelerationScale))
      ? { pairAccelerationScale: Number(bridgeResponse.geometry.pairAccelerationScale) }
      : {}),
    ...(Number.isFinite(Number(bridgeResponse.geometry?.pairSegmentCount))
      ? { pairSegmentCount: Number(bridgeResponse.geometry.pairSegmentCount) }
      : {}),
    ...(Number.isFinite(Number(bridgeResponse.geometry?.pairInteractionStepCount))
      ? { pairInteractionStepCount: Number(bridgeResponse.geometry.pairInteractionStepCount) }
      : {}),
    ...(Number.isFinite(Number(bridgeResponse.geometry?.pathConstraintCount))
      ? { pathConstraintCount: Number(bridgeResponse.geometry.pathConstraintCount) }
      : {}),
    ...(Number.isFinite(Number(bridgeResponse.geometry?.pathConstraintResidualSampleCount))
      ? { pathConstraintResidualSampleCount: Number(bridgeResponse.geometry.pathConstraintResidualSampleCount) }
      : {}),
    ...(Number.isFinite(Number(bridgeResponse.geometry?.maxPathConstraintResidual))
      ? { maxPathConstraintResidual: Number(bridgeResponse.geometry.maxPathConstraintResidual) }
      : {}),
    ...(Number.isFinite(Number(bridgeResponse.geometry?.meanPathConstraintResidual))
      ? { meanPathConstraintResidual: Number(bridgeResponse.geometry.meanPathConstraintResidual) }
      : {}),
    ...(Number.isFinite(Number(bridgeResponse.geometry?.rmsPathConstraintResidual))
      ? { rmsPathConstraintResidual: Number(bridgeResponse.geometry.rmsPathConstraintResidual) }
      : {}),
    ...(Number.isFinite(Number(bridgeResponse.geometry?.pathConstraintGuidanceSampleCount))
      ? { pathConstraintGuidanceSampleCount: Number(bridgeResponse.geometry.pathConstraintGuidanceSampleCount) }
      : {}),
    ...(bridgeResponse.geometry?.pathConstraintGuidanceMode
      ? { pathConstraintGuidanceMode: String(bridgeResponse.geometry.pathConstraintGuidanceMode) }
      : {}),
    ...(bridgeResponse.geometry?.pathConstraintBoundaryMode
      ? { pathConstraintBoundaryMode: String(bridgeResponse.geometry.pathConstraintBoundaryMode) }
      : {}),
    ...(bridgeResponse.geometry?.pathConstraintBoundaryRelaxationMode
      ? { pathConstraintBoundaryRelaxationMode: String(bridgeResponse.geometry.pathConstraintBoundaryRelaxationMode) }
      : {}),
    ...(Number.isFinite(Number(bridgeResponse.geometry?.pathConstraintBoundaryRelaxationIterationCount))
      ? {
          pathConstraintBoundaryRelaxationIterationCount: Number(
            bridgeResponse.geometry.pathConstraintBoundaryRelaxationIterationCount
          ),
        }
      : {}),
    ...(bridgeResponse.geometry?.pathConstraintSolverStatus
      ? { pathConstraintSolverStatus: String(bridgeResponse.geometry.pathConstraintSolverStatus) }
      : {}),
    ...(bridgeResponse.geometry?.pathConstraintSolverClaim
      ? { pathConstraintSolverClaim: String(bridgeResponse.geometry.pathConstraintSolverClaim) }
      : {}),
    ...(Number.isFinite(Number(bridgeResponse.geometry?.maxPathConstraintGuidanceAcceleration))
      ? { maxPathConstraintGuidanceAcceleration: Number(bridgeResponse.geometry.maxPathConstraintGuidanceAcceleration) }
      : {}),
    ...(Number.isFinite(Number(bridgeResponse.geometry?.meanPathConstraintGuidanceAcceleration))
      ? { meanPathConstraintGuidanceAcceleration: Number(bridgeResponse.geometry.meanPathConstraintGuidanceAcceleration) }
      : {}),
    ...(Number.isFinite(Number(bridgeResponse.geometry?.rmsPathConstraintGuidanceAcceleration))
      ? { rmsPathConstraintGuidanceAcceleration: Number(bridgeResponse.geometry.rmsPathConstraintGuidanceAcceleration) }
      : {}),
    ...(Number.isFinite(Number(bridgeResponse.geometry?.pathConstraintBoundaryResidualSampleCount))
      ? { pathConstraintBoundaryResidualSampleCount: Number(bridgeResponse.geometry.pathConstraintBoundaryResidualSampleCount) }
      : {}),
    ...(bridgeResponse.geometry?.pathConstraintBoundaryResidualStatus
      ? { pathConstraintBoundaryResidualStatus: String(bridgeResponse.geometry.pathConstraintBoundaryResidualStatus) }
      : {}),
    ...(Number.isFinite(Number(bridgeResponse.geometry?.pathConstraintBoundaryResidualTolerance))
      ? { pathConstraintBoundaryResidualTolerance: Number(bridgeResponse.geometry.pathConstraintBoundaryResidualTolerance) }
      : {}),
    ...(Number.isFinite(Number(bridgeResponse.geometry?.maxPathConstraintBoundaryResidual))
      ? { maxPathConstraintBoundaryResidual: Number(bridgeResponse.geometry.maxPathConstraintBoundaryResidual) }
      : {}),
    ...(Number.isFinite(Number(bridgeResponse.geometry?.meanPathConstraintBoundaryResidual))
      ? { meanPathConstraintBoundaryResidual: Number(bridgeResponse.geometry.meanPathConstraintBoundaryResidual) }
      : {}),
    ...(Number.isFinite(Number(bridgeResponse.geometry?.rmsPathConstraintBoundaryResidual))
      ? { rmsPathConstraintBoundaryResidual: Number(bridgeResponse.geometry.rmsPathConstraintBoundaryResidual) }
      : {}),
    ...(bridgeResponse.geometry?.displayProjection
      ? { displayProjection: String(bridgeResponse.geometry.displayProjection) }
      : {}),
    ...(bridgeResponse.geometry?.interactionLaw
      ? { interactionLaw: String(bridgeResponse.geometry.interactionLaw) }
      : {}),
    ...(bridgeResponse.geometry?.executionPath
      ? { executionPath: String(bridgeResponse.geometry.executionPath) }
      : {}),
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
    ...(Array.isArray(row.rootLedgerDetails)
      ? {
          rootLedgerDetails: normalizeOptionalArray(row.rootLedgerDetails),
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
    const rootLedgerDetails = normalizeOptionalArray(response.rootLedgerDetails);
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
      ...(rootLedgerDetails.length > 0 ? { rootLedgerDetails } : {}),
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
    ...(replayDataset.draftPreview ? { draftPreview: cloneObject(replayDataset.draftPreview, "draftPreview") } : {}),
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

function optionalFiniteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function normalizeOptionalNonnegativeNumber(value, label) {
  if (value == null) {
    return undefined;
  }
  return normalizeNonnegativeNumber(value, undefined, label);
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
