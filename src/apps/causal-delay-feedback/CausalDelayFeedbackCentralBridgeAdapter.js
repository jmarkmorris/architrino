import { runSolverAppBridgeRequest } from "../../solver/app/SolverAppBridgeClientResolver.mjs";
import {
  CENTRAL_SOLVER_BRIDGE_TARGET,
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
      const runHandle = typeof options.runSolverBridge === "function"
        ? await options.runSolverBridge(request)
        : await runSolverAppBridgeRequest({
            appId: CAUSAL_DELAY_FEEDBACK_APP_ID,
            request,
            options,
            factoryRequest: request.config.initialConditions,
            requestedCapabilities: ["appPlayback", "pathHistory", "causalRoots", "delayedHits"],
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
      return normalizeCausalDelayFeedbackBridgeReplay(runHandle, { presetId });
    },
  };
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
    preset,
    initialConditions: cloneObject(
      bridgeResponse.initialConditions ?? bridgeResponse.geometry?.initialConditions ?? {},
      "bridge response initialConditions",
    ),
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
  const source = row.source
    ? normalizePoint(row.source, `bridge response delayedHits[${index}].source`)
    : findHistoryPoint(history, sourceKind, sourceDepth, `source ${sourceKind} ${sourceDepth}`);
  const receiver = row.receiver
    ? normalizePoint(row.receiver, `bridge response delayedHits[${index}].receiver`)
    : findHistoryPoint(history, receiverKind, receiverDepth, `receiver ${receiverKind} ${receiverDepth}`);

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
    color: sourceKind === "positrino" ? POSITRINO_WAKE : ELECTRINO_WAKE,
    weight: normalizeUnitNumber(row.weight ?? row.strength, undefined, `bridge response delayedHits[${index}].weight`),
    distance: normalizeNonnegativeNumber(
      row.distance,
      getDistance(source, receiver),
      `bridge response delayedHits[${index}].distance`,
    ),
    mode: row.mode ?? PARTIAL_PROPAGATING_ARCS,
    rootStatus: row.rootStatus ?? row.status ?? null,
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

function findHistoryPoint(history, kind, depth, label) {
  const row = history[kind].find((candidate) => candidate.depth === depth);
  if (!row) {
    throw new TypeError(`bridge response delayed hit references missing ${label}`);
  }
  return { x: row.x, y: row.y };
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

function createBridgeGeometryFromReplayDataset(replayDataset, { initialConditions = {} } = {}) {
  requireObject(replayDataset, "replayDataset");
  return {
    pathBounds: [],
    spherePointIntersections: [],
    history: cloneObject(replayDataset.history, "replayDataset.history"),
    initialConditions: cloneObject(initialConditions, "initialConditions"),
    presetId: replayDataset.preset?.id ?? DEFAULT_PRESET_ID,
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
