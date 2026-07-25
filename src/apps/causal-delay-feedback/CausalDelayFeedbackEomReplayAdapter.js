import {
  createEomHistoryDataset,
} from "../shared/EomHistoryDataset.mjs";
import {
  DEFAULT_CANVAS_ID,
  DEFAULT_PRESET_ID,
  FRAME_COUNT,
  PATH_TIME_END_X,
  PATH_TIME_START_X,
  SPACE_AXIS_TOP_Y,
  TIME_AXIS_BASELINE_Y,
  getPresetById,
} from "./CausalDelayFeedbackDisplayContract.js";

// Causal-Delay-Feedback replay source over recorded EOM datasets.
//
// The app is a viewer: it draws recorded eom_evolution_contract/v0 retained
// histories and computes no physics. The only arithmetic here is declared
// display projection — mapping recorded (time, space) samples onto the app's
// time-space canvas. There is no run request, no interaction law, and no
// recompute path; edits made on the canvas cannot be re-solved here and fail
// closed with an explanatory error.

export const EOM_REPLAY_ADAPTER = "eom_history_replay_adapter";
export const EOM_REPLAY_DATASET_SOURCE = "eom_history_replay";
export const EOM_REPLAY_DEFAULT_HISTORY_DEPTH = 6;
export const EOM_REPLAY_MAX_FRAME_COUNT = 20_000;
export const EOM_REPLAY_MAX_HISTORY_DEPTH = 1_024;

const SPACE_AXES = Object.freeze(["x", "y", "z"]);
const SPACE_MARGIN_FRACTION = 0.06;

export function createCausalDelayFeedbackEomReplayAdapter(options = {}) {
  return {
    id: EOM_REPLAY_ADAPTER,
    async createReplayAsync({ presetId = DEFAULT_PRESET_ID, requestOptions = {} } = {}) {
      if (requestOptions?.replayDataset?.draftPreview) {
        throw new Error(
          "EOM replay datasets are recorded solver output; canvas edits cannot be recomputed by this viewer. " +
            "Author a new EOM campaign run to obtain an updated record.",
        );
      }
      const record = await resolveEomRecord(options, { presetId, requestOptions });
      return normalizeCausalDelayFeedbackEomReplay(record, { presetId, requestOptions });
    },
  };
}

async function resolveEomRecord(options, context) {
  if (context.requestOptions?.eomRecord && typeof context.requestOptions.eomRecord === "object") {
    return context.requestOptions.eomRecord;
  }
  if (options.record && typeof options.record === "object") {
    return options.record;
  }
  if (typeof options.loadEomRecord === "function") {
    const record = await options.loadEomRecord(context);
    if (record && typeof record === "object") {
      return record;
    }
  }
  throw new Error(
    "Causal-delay-feedback EOM replay requires a recorded eom_evolution_contract/v0 dataset " +
      "(inject a record, a loadEomRecord option, or an ?eomRecord= URL).",
  );
}

export function normalizeCausalDelayFeedbackEomReplay(recordOrDataset, {
  presetId = DEFAULT_PRESET_ID,
  requestOptions = {},
} = {}) {
  const historyDataset = recordOrDataset?.schema === "eom-history-dataset.v0"
    ? recordOrDataset
    : createEomHistoryDataset(recordOrDataset);
  const preset = getPresetById(presetId);
  const roles = resolveWorldlineRoles(historyDataset, requestOptions);
  const frameCount = normalizeBoundedCount(
    requestOptions.frameCount,
    FRAME_COUNT,
    EOM_REPLAY_MAX_FRAME_COUNT,
    "frameCount",
  );
  const historyDepth = normalizeBoundedCount(
    requestOptions.historyDepth,
    EOM_REPLAY_DEFAULT_HISTORY_DEPTH,
    EOM_REPLAY_MAX_HISTORY_DEPTH,
    "historyDepth",
  );
  const recordedSamples = {
    positrino: historyDataset.createFrameSamples({
      frameCount,
      worldlineIds: [roles.positrino.id],
    }),
    electrino: historyDataset.createFrameSamples({
      frameCount,
      worldlineIds: [roles.electrino.id],
    }),
  };
  const projection = createTimeSpaceCanvasProjection(recordedSamples, historyDataset.window, requestOptions);
  const paths = {
    positrino: projectWorldlinePath(recordedSamples.positrino, projection),
    electrino: projectWorldlinePath(recordedSamples.electrino, projection),
  };
  const physicalPaths = {
    positrino: createPhysicalWorldlinePath(recordedSamples.positrino),
    electrino: createPhysicalWorldlinePath(recordedSamples.electrino),
  };
  const frames = paths.positrino.map((point, index) => ({
    t: point.t,
    positrino: point,
    electrino: paths.electrino[index],
  }));
  const history = {
    positrino: createRetainedHistoryPoints(paths.positrino, historyDepth, "positrino"),
    electrino: createRetainedHistoryPoints(paths.electrino, historyDepth, "electrino"),
  };
  const initialConditions = createInitialConditionsFromProjectedPaths(paths, historyDepth);
  return {
    runId: historyDataset.provenance.runId,
    datasetSource: EOM_REPLAY_DATASET_SOURCE,
    solverIntegrationPath: EOM_REPLAY_ADAPTER,
    engineId: historyDataset.provenance.engineId,
    claimGrade: historyDataset.provenance.claimGrade,
    evidenceStatus: historyDataset.provenance.evidenceStatus,
    eomProvenance: { ...historyDataset.provenance },
    eomWindow: { ...historyDataset.window },
    eomWorldlineRoles: {
      positrino: roles.positrino.id,
      electrino: roles.electrino.id,
    },
    displayProjection: projection.descriptor,
    physicalPaths,
    causalEvaluation: {
      enabled: false,
      reason: "record_has_no_delayed_hit_rows",
    },
    wakeArcDisplayMode: preset.wakeArcDisplayMode,
    canvasColorId: preset.canvasColorId ?? DEFAULT_CANVAS_ID,
    ...(Number.isFinite(Number(preset.assemblyThreshold))
      ? { assemblyThreshold: Number(preset.assemblyThreshold) }
      : {}),
    preset,
    initialConditions,
    paths,
    history,
    // Recorded EOM datasets do not yet carry delayed-hit event rows; the
    // viewer draws only record-carried data, so there are no wake links.
    wakeLinks: [],
    frames,
  };
}

function resolveWorldlineRoles(historyDataset, requestOptions = {}) {
  const positiveWorldlines = historyDataset.worldlines.filter((worldline) => worldline.polarity > 0);
  const negativeWorldlines = historyDataset.worldlines.filter((worldline) => worldline.polarity < 0);
  const positrino = requestOptions.positrinoWorldlineId != null
    ? requireWorldlineById(historyDataset, requestOptions.positrinoWorldlineId)
    : positiveWorldlines.length === 1
      ? positiveWorldlines[0]
      : null;
  const electrino = requestOptions.electrinoWorldlineId != null
    ? requireWorldlineById(historyDataset, requestOptions.electrinoWorldlineId)
    : negativeWorldlines.length === 1
      ? negativeWorldlines[0]
      : null;
  if (!positrino || !electrino) {
    throw new Error(
      "Causal-delay-feedback EOM replay requires exactly one positive-polarity and one negative-polarity " +
        "worldline, or explicit positrinoWorldlineId/electrinoWorldlineId request options.",
    );
  }
  if (positrino.id === electrino.id) {
    throw new Error("Causal-delay-feedback EOM replay requires two distinct worldline roles.");
  }
  if (!(positrino.polarity > 0) || !(electrino.polarity < 0)) {
    throw new Error(
      "Causal-delay-feedback EOM replay role overrides must select positive polarity for the positrino " +
        "and negative polarity for the electrino.",
    );
  }
  return { positrino, electrino };
}

function requireWorldlineById(historyDataset, worldlineId) {
  const worldline = historyDataset.worldlines.find(
    (candidate) => candidate.id === String(worldlineId),
  );
  if (!worldline) {
    throw new RangeError(`EOM record has no worldline ${String(worldlineId)}.`);
  }
  return worldline;
}

function createTimeSpaceCanvasProjection(recordedSamples, window, requestOptions = {}) {
  const { start, end } = window;
  const duration = end - start;
  const spaceAxis = resolveSpaceAxis(recordedSamples, requestOptions);
  let spaceMin = Number.POSITIVE_INFINITY;
  let spaceMax = Number.NEGATIVE_INFINITY;
  Object.values(recordedSamples).forEach((samples) => {
    samples.forEach((frame) => {
      const value = frame.states[0].position[spaceAxis];
      spaceMin = Math.min(spaceMin, value);
      spaceMax = Math.max(spaceMax, value);
    });
  });
  if (!(spaceMax > spaceMin)) {
    spaceMax = spaceMin + 1;
  }
  const margin = (TIME_AXIS_BASELINE_Y - SPACE_AXIS_TOP_Y) * SPACE_MARGIN_FRACTION;
  const canvasTop = SPACE_AXIS_TOP_Y + margin;
  const canvasBottom = TIME_AXIS_BASELINE_Y - margin;
  const xSpan = PATH_TIME_END_X - PATH_TIME_START_X;
  const yScale = (canvasBottom - canvasTop) / (spaceMax - spaceMin);
  const meanSpace = (samples) => {
    const values = samples.map((frame) => frame.states[0].position[spaceAxis]);
    return values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length);
  };
  const positrinoMeanSpace = meanSpace(recordedSamples.positrino);
  const electrinoMeanSpace = meanSpace(recordedSamples.electrino);
  const increasingSpaceRendersUp = positrinoMeanSpace >= electrinoMeanSpace;
  return {
    descriptor: Object.freeze({
      rule: "time_space_canvas_fit/v1",
      spaceAxis,
      verticalIdentityOrder: "positrino_above_electrino",
      spaceDirection: increasingSpaceRendersUp ? "up" : "down",
      timeStart: start,
      timeEnd: end,
      spaceMin,
      spaceMax,
    }),
    normalizedTime(time) {
      return duration > 0 ? (time - start) / duration : 0;
    },
    canvasX(time) {
      return PATH_TIME_START_X + this.normalizedTime(time) * xSpan;
    },
    canvasY(spaceValue) {
      return increasingSpaceRendersUp
        ? canvasBottom - (spaceValue - spaceMin) * yScale
        : canvasTop + (spaceValue - spaceMin) * yScale;
    },
    canvasVx() {
      return xSpan;
    },
    canvasVy(spaceVelocity) {
      const screenDirection = increasingSpaceRendersUp ? -1 : 1;
      return screenDirection * spaceVelocity * yScale * (duration > 0 ? duration : 1);
    },
  };
}

function resolveSpaceAxis(recordedSamples, requestOptions = {}) {
  if (SPACE_AXES.includes(requestOptions.spaceAxis)) {
    return requestOptions.spaceAxis;
  }
  const ranges = new Map(SPACE_AXES.map((axis) => [axis, { min: Infinity, max: -Infinity }]));
  Object.values(recordedSamples).forEach((samples) => {
    samples.forEach((frame) => {
      SPACE_AXES.forEach((axis) => {
        const range = ranges.get(axis);
        const value = frame.states[0].position[axis];
        range.min = Math.min(range.min, value);
        range.max = Math.max(range.max, value);
      });
    });
  });
  let bestAxis = SPACE_AXES[0];
  let bestSpread = -Infinity;
  SPACE_AXES.forEach((axis) => {
    const range = ranges.get(axis);
    const spread = range.max - range.min;
    if (spread > bestSpread) {
      bestSpread = spread;
      bestAxis = axis;
    }
  });
  return bestAxis;
}

function createPhysicalWorldlinePath(samples) {
  return samples.map((frame) => {
    const state = frame.states[0];
    return {
      t: frame.time,
      x: state.position.x,
      y: state.position.y,
      z: state.position.z,
      vx: state.velocity.x,
      vy: state.velocity.y,
      vz: state.velocity.z,
    };
  });
}

function normalizeBoundedCount(value, fallback, maximum, label) {
  const number = Number(value);
  const count = Number.isFinite(number) ? Math.floor(number) : fallback;
  if (count > maximum) {
    throw new RangeError(`${label} must not exceed ${maximum}.`);
  }
  return Math.max(2, count);
}

function projectWorldlinePath(samples, projection) {
  const spaceAxis = projection.descriptor.spaceAxis;
  return samples.map((frame) => {
    const state = frame.states[0];
    return {
      t: projection.normalizedTime(frame.time),
      x: projection.canvasX(frame.time),
      y: projection.canvasY(state.position[spaceAxis]),
      vx: projection.canvasVx(),
      vy: projection.canvasVy(state.velocity[spaceAxis]),
    };
  });
}

function createRetainedHistoryPoints(pathPoints, historyDepth, kind) {
  const points = [];
  for (let depth = 1; depth <= historyDepth; depth += 1) {
    const normalizedT = (depth - 1) / (historyDepth - 1);
    const index = Math.min(
      pathPoints.length - 1,
      Math.round(normalizedT * (pathPoints.length - 1)),
    );
    const point = pathPoints[index];
    points.push({
      depth,
      t: point.t,
      weight: depth / historyDepth,
      state: depth === 1 ? "older" : depth === historyDepth ? "newer" : "active",
      kind,
      x: point.x,
      y: point.y,
    });
  }
  return points;
}

function createInitialConditionsFromProjectedPaths(paths, historyDepth) {
  const conditions = {
    historyDepth,
    outputStride: 1,
    runDuration: 1,
  };
  [["positrino", "positive"], ["electrino", "negative"]].forEach(([kind, polarity]) => {
    const first = paths[kind][0] ?? { t: 0, x: 0, y: 0, vx: 0, vy: 0 };
    conditions[kind] = {
      kind,
      t: first.t,
      x: first.x,
      y: first.y,
      vx: first.vx ?? 0,
      vy: first.vy ?? 0,
      ax: 0,
      ay: 0,
      polarity,
      role: "source",
    };
  });
  return conditions;
}
