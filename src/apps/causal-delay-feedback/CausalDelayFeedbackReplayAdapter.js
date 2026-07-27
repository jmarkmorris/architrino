import {
  ARCHITRINO_KINDS,
  ELECTRINO_WAKE,
  FIXED_WAKE_VISUAL_STYLE,
  FRAME_COUNT,
  PATH_TIME_END_X,
  PATH_TIME_START_X,
  POSITRINO_WAKE,
} from "./CausalDelayFeedbackDisplayContract.js";
import { sampleTimedPath } from "./CausalDelayFeedbackTimedPath.js";
import {
  createDisplayAuthority,
} from "./CausalDelayFeedbackCausalHistory.js";

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

// Declared teaching geometry: both paths share one modest centerline wave while
// their separation decreases by a constant amount at each anchor. The blue
// baseline is deliberately placed 25% farther from the unchanged red baseline
// for the current visual trial (halfway back from the prior 50% displacement).
// The mock evaluator, histories, wakes, and
// editable Sandbox paths all consume this same geometry; it is not presented as
// a solved EOM trajectory.
const PAIRED_PATH_ANCHOR_X = Object.freeze([260, 450, 650, 830, 1080, 1305, 1450]);
const PAIRED_PATH_CENTER_Y = Object.freeze([500, 468, 510, 476, 518, 484, 526]);
const PAIRED_PATH_SEPARATION = Object.freeze([360, 330, 300, 270, 240, 210, 180]);
const ELECTRINO_SEPARATION_SCALE = 1.25;

const PATH_ANCHORS = Object.freeze({
  positrino: createPairedPathAnchors("positrino"),
  electrino: createPairedPathAnchors("electrino"),
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

function createPairedPathAnchors(kind) {
  return stretchPathToTimeAxis(
    PAIRED_PATH_ANCHOR_X.map((x, index) => {
      const positrinoY =
        PAIRED_PATH_CENTER_Y[index] - PAIRED_PATH_SEPARATION[index] * 0.5;
      return Object.freeze({
        x,
        y: kind === "positrino"
          ? positrinoY
          : positrinoY +
            PAIRED_PATH_SEPARATION[index] * ELECTRINO_SEPARATION_SCALE,
      });
    }),
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
    createReplay() {
      return createMockCausalDelayReplayDataset();
    },
  };
}

export function createMockCausalDelayReplayDataset() {
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
  return {
    runId: "causal-delay-feedback:fixed-display",
    datasetSource: REPRESENTATIVE_MOCK_SOLVER_REPLAY,
    solverIntegrationPath: TEMPORARY_MOCK_ADAPTER,
    futureSolverTarget: EOM_NATIVE_STREAM_TARGET,
    displayAuthority: createDisplayAuthority(
      "representative_paired_path_teaching_fixture",
      {
        label: "Representative paired-path teaching fixture",
        sourceAuthority: "declared_geometry",
      },
    ),
    wakeArcDisplayMode: FIXED_WAKE_VISUAL_STYLE.wakeArcDisplayMode,
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
