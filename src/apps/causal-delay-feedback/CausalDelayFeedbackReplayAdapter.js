import {
  ARCHITRINO_KINDS,
  DEFAULT_CANVAS_ID,
  DEFAULT_PRESET_ID,
  ELECTRINO_WAKE,
  FRAME_COUNT,
  PATH_TIME_END_X,
  PATH_TIME_START_X,
  POSITRINO_WAKE,
  getPresetById,
} from "./CausalDelayFeedbackDisplayContract.js";
import { sampleTimedPath } from "./CausalDelayFeedbackTimedPath.js";

export const EOM_NATIVE_STREAM_TARGET = "eom_native_path_history_stream";
export const TEMPORARY_MOCK_ADAPTER = "temporary_mock_adapter";
export const REPRESENTATIVE_MOCK_SOLVER_REPLAY = "representative_mock_solver_replay";
export const DIRECT_MANIPULATION_DRAFT_PREVIEW = "direct_manipulation_draft_preview";

const HISTORY_POINTS = Object.freeze([
  { depth: 1, t: 0, weight: 1 / 6, state: "older" },
  { depth: 2, t: 0.08, weight: 2 / 6, state: "active" },
  { depth: 3, t: 0.25, weight: 3 / 6, state: "active" },
  { depth: 4, t: 0.62, weight: 4 / 6, state: "active" },
  { depth: 5, t: 0.88, weight: 5 / 6, state: "active" },
  { depth: 6, t: 1, weight: 1, state: "newer" },
]);

const PATH_ANCHORS = Object.freeze({
  positrino: stretchPathToTimeAxis([
    Object.freeze({ x: 260, y: 650 }),
    Object.freeze({ x: 450, y: 700 }),
    Object.freeze({ x: 650, y: 630 }),
    Object.freeze({ x: 820, y: 680 }),
    Object.freeze({ x: 1070, y: 610 }),
    Object.freeze({ x: 1290, y: 665 }),
    Object.freeze({ x: 1450, y: 625 }),
  ]),
  electrino: stretchPathToTimeAxis([
    Object.freeze({ x: 250, y: 390 }),
    Object.freeze({ x: 450, y: 330 }),
    Object.freeze({ x: 640, y: 420 }),
    Object.freeze({ x: 830, y: 350 }),
    Object.freeze({ x: 1080, y: 430 }),
    Object.freeze({ x: 1305, y: 360 }),
    Object.freeze({ x: 1450, y: 410 }),
  ]),
});

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function stretchPathToTimeAxis(points) {
  const first = points[0];
  const last = points[points.length - 1];
  const sourceSpan = last.x - first.x;
  const targetSpan = PATH_TIME_END_X - PATH_TIME_START_X;
  if (!Number.isFinite(sourceSpan) || sourceSpan === 0) {
    return Object.freeze(points.map((point) => Object.freeze({ ...point })));
  }
  return Object.freeze(
    points.map((point) =>
      Object.freeze({
        ...point,
        x: PATH_TIME_START_X + ((point.x - first.x) / sourceSpan) * targetSpan,
      }),
    ),
  );
}

function catmullRomPoint(points, t) {
  const segmentCount = points.length - 1;
  const scaledT = clamp(t, 0, 1) * segmentCount;
  const index = Math.min(segmentCount - 1, Math.floor(scaledT));
  const localT = scaledT - index;
  const p0 = points[Math.max(0, index - 1)];
  const p1 = points[index];
  const p2 = points[index + 1];
  const p3 = points[Math.min(points.length - 1, index + 2)];
  const tt = localT * localT;
  const ttt = tt * localT;

  return {
    x:
      0.5 *
      (2 * p1.x +
        (-p0.x + p2.x) * localT +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * tt +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * ttt),
    y:
      0.5 *
      (2 * p1.y +
        (-p0.y + p2.y) * localT +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * tt +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * ttt),
  };
}

export function getPathPoint(kind, t) {
  return catmullRomPoint(PATH_ANCHORS[kind], t);
}

export function getDistance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function getAngleDegrees(center, point) {
  return (Math.atan2(point.y - center.y, point.x - center.x) * 180) / Math.PI;
}

export function createTemporaryMockReplayAdapter() {
  return {
    id: TEMPORARY_MOCK_ADAPTER,
    futureSolverTarget: EOM_NATIVE_STREAM_TARGET,
    createReplay({ presetId = DEFAULT_PRESET_ID } = {}) {
      return createMockCausalDelayReplayDataset(presetId);
    },
  };
}

export function createMockCausalDelayReplayDataset(presetId = DEFAULT_PRESET_ID) {
  const preset = getPresetById(presetId);
  const paths = {
    positrino: samplePath("positrino"),
    electrino: samplePath("electrino"),
  };
  const initialConditions = createInitialConditionsFromPaths(paths);
  const history = {
    positrino: HISTORY_POINTS.map((row) => ({ ...row, kind: "positrino", ...getPathPoint("positrino", row.t) })),
    electrino: HISTORY_POINTS.map((row) => ({ ...row, kind: "electrino", ...getPathPoint("electrino", row.t) })),
  };

  const byDepth = new Map(HISTORY_POINTS.map((row) => [row.depth, row]));
  const wakeLinks = [];
  for (let depth = 1; depth < HISTORY_POINTS.length; depth += 1) {
    const sourceDepth = byDepth.get(depth);
    const receiverDepth = byDepth.get(depth + 1);
    wakeLinks.push(
      createWakeLink(
        "positrino",
        "electrino",
        sourceDepth,
        receiverDepth,
        POSITRINO_WAKE,
        `red ${depth} -> blue ${depth + 1}`,
      ),
      createWakeLink(
        "electrino",
        "positrino",
        sourceDepth,
        receiverDepth,
        ELECTRINO_WAKE,
        `blue ${depth} -> red ${depth + 1}`,
      ),
    );
  }
  if (preset.contrastStress) {
    applyContrastStressWakeState(wakeLinks);
  }

  return {
    runId: `causal-delay-feedback:${preset.id}`,
    datasetSource: REPRESENTATIVE_MOCK_SOLVER_REPLAY,
    solverIntegrationPath: TEMPORARY_MOCK_ADAPTER,
    futureSolverTarget: EOM_NATIVE_STREAM_TARGET,
    wakeArcDisplayMode: preset.wakeArcDisplayMode,
    canvasColorId: preset.canvasColorId ?? DEFAULT_CANVAS_ID,
    ...(Number.isFinite(Number(preset.assemblyThreshold))
      ? { assemblyThreshold: Number(preset.assemblyThreshold) }
      : {}),
    preset,
    initialConditions,
    paths,
    history,
    wakeLinks,
    frames: paths.positrino.map((point, index) => ({
      t: point.t,
      positrino: point,
      electrino: paths.electrino[index],
    })),
  };
}

function applyContrastStressWakeState(wakeLinks) {
  const [red1Blue2, blue1Red2, red2Blue3, blue2Red3, red3Blue4, blue3Red4] = wakeLinks;
  if (red1Blue2) {
    Object.assign(red1Blue2, {
      solverRunId: "contrast-stress-red1-blue2-delayed-hit",
      rootCount: 1,
      solverHitCount: 1,
      solverHitTime: red1Blue2.hitTime,
      solverResidual: 0,
    });
  }
  if (blue1Red2) {
    Object.assign(blue1Red2, {
      solverRunId: "contrast-stress-blue1-red2-root-only",
      rootCount: 1,
      solverHitCount: 0,
      rootStatus: {
        code: "contrast_root_without_hit",
        severity: "warn",
        message: "contrast stress root without accepted hit",
      },
    });
  }
  if (red2Blue3) {
    Object.assign(red2Blue3, {
      status: "stale",
      reason: "contrast_stress_stale_solver_row",
      solverRunId: "contrast-stress-red2-blue3-delayed-hit",
      staleSolverRunId: "contrast-stress-red2-blue3-delayed-hit",
      staleReplaySource: "contrast_stress",
      rootCount: 1,
      solverHitCount: 1,
      solverHitTime: red2Blue3.hitTime,
      solverResidual: 0,
    });
  }
  if (blue2Red3) {
    Object.assign(blue2Red3, {
      solverRunId: "contrast-stress-blue2-red3-rejected",
      rootCount: 0,
      solverHitCount: 0,
      rootStatus: {
        code: "contrast_no_delayed_hit",
        severity: "warn",
        message: "contrast stress rejected wake row",
      },
    });
  }
  if (red3Blue4) {
    Object.assign(red3Blue4, {
      solverRunId: "contrast-stress-red3-blue4-delayed-hit",
      rootCount: 1,
      solverHitCount: 1,
      solverHitTime: red3Blue4.hitTime,
      solverResidual: 0,
    });
  }
  if (blue3Red4) {
    Object.assign(blue3Red4, {
      solverRunId: "contrast-stress-blue3-red4-delayed-hit",
      rootCount: 1,
      solverHitCount: 1,
      solverHitTime: blue3Red4.hitTime,
      solverResidual: 0,
    });
  }
}

function createInitialConditionsFromPaths(paths) {
  const conditions = {
    historyDepth: HISTORY_POINTS.length,
    outputStride: 1,
    runDuration: 1,
  };
  ARCHITRINO_KINDS.forEach((kind) => {
    const points = paths[kind];
    const motionState = createInitialMotionStateFromPath(points);
    conditions[kind] = {
      kind,
      t: motionState.t,
      x: motionState.x,
      y: motionState.y,
      vx: motionState.vx,
      vy: motionState.vy,
      ax: motionState.ax,
      ay: motionState.ay,
      polarity: kind === "positrino" ? "positive" : "negative",
      role: "source",
    };
  });
  return conditions;
}

function createInitialMotionStateFromPath(points) {
  const start = points[0] ?? { t: 0, x: 0, y: 0 };
  const end = points.at(-1) ?? start;
  const midpoint = sampleTimedPath(points, start.t + (end.t - start.t) * 0.5);
  const totalTime = Number(end.t) - Number(start.t);
  const midpointTime = Number(midpoint.t) - Number(start.t);
  if (!Number.isFinite(totalTime) || totalTime <= 0 || !Number.isFinite(midpointTime) || midpointTime <= 0) {
    return { t: start.t, x: start.x, y: start.y, vx: 0, vy: 0, ax: 0, ay: 0 };
  }

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const mx = midpoint.x - start.x;
  const my = midpoint.y - start.y;
  const denominator = midpointTime * midpointTime - totalTime * midpointTime;
  if (!Number.isFinite(denominator) || Math.abs(denominator) <= 1e-9) {
    return {
      t: start.t,
      x: start.x,
      y: start.y,
      vx: dx / totalTime,
      vy: dy / totalTime,
      ax: 0,
      ay: 0,
    };
  }

  const ax = (2 * (mx - (midpointTime / totalTime) * dx)) / denominator;
  const ay = (2 * (my - (midpointTime / totalTime) * dy)) / denominator;
  return {
    t: start.t,
    x: start.x,
    y: start.y,
    vx: (dx - 0.5 * ax * totalTime * totalTime) / totalTime,
    vy: (dy - 0.5 * ay * totalTime * totalTime) / totalTime,
    ax,
    ay,
  };
}

function samplePath(kind, count = FRAME_COUNT) {
  const points = [];
  for (let index = 0; index < count; index += 1) {
    const t = index / Math.max(1, count - 1);
    points.push({ t, ...getPathPoint(kind, t) });
  }
  return points;
}

function createWakeLink(sourceKind, receiverKind, sourceDepth, receiverDepth, color, label) {
  const source = { t: sourceDepth.t, ...getPathPoint(sourceKind, sourceDepth.t) };
  const receiver = { t: receiverDepth.t, ...getPathPoint(receiverKind, receiverDepth.t) };
  return {
    id: `${sourceKind}-${sourceDepth.depth}-to-${receiverKind}-${receiverDepth.depth}`,
    label,
    sourceKind,
    receiverKind,
    sourceDepth: sourceDepth.depth,
    receiverDepth: receiverDepth.depth,
    source,
    receiver,
    emissionTime: sourceDepth.t,
    hitTime: receiverDepth.t,
    color,
    weight: Math.min(sourceDepth.weight, receiverDepth.weight),
  };
}
