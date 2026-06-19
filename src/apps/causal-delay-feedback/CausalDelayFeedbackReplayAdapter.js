export const DESIGN_WIDTH = 1920;
export const DESIGN_HEIGHT = 1080;
export const FRAME_COUNT = 180;
export const PARTIAL_PROPAGATING_ARCS = "partial_propagating_arcs";
export const FULL_CIRCULAR_ARCS = "full_circular_arcs";
export const DEFAULT_PRESET_ID = "accepted_tight_bright";
export const DEFAULT_CANVAS_ID = "solid_purple";
export const CENTRAL_SOLVER_BRIDGE_TARGET = "central_solver_bridge_path_history_stream";
export const TEMPORARY_MOCK_ADAPTER = "temporary_mock_adapter";
export const REPRESENTATIVE_MOCK_SOLVER_REPLAY = "representative_mock_solver_replay";
export const DIRECT_MANIPULATION_DRAFT_PREVIEW = "direct_manipulation_draft_preview";

export const POSITRINO = Object.freeze({ r: 255, g: 0, b: 0, a: 1 });
export const ELECTRINO = Object.freeze({ r: 0, g: 0, b: 255, a: 1 });
export const POSITRINO_WAKE = Object.freeze({ r: 255, g: 150, b: 166, a: 1 });
export const ELECTRINO_WAKE = Object.freeze({ r: 150, g: 170, b: 255, a: 1 });
export const WHITE = Object.freeze({ r: 246, g: 247, b: 255, a: 1 });
export const ARCHITRINO_KINDS = Object.freeze(["positrino", "electrino"]);

export const CANVAS_COLORS = Object.freeze([
  { id: "solid_purple", label: "Solid purple", color: "#401d68" },
  { id: "deep_purple", label: "Deep purple", color: "#2d174d" },
  { id: "soft_purple", label: "Soft purple", color: "#522888" },
]);

export const PRESETS = Object.freeze([
  {
    id: "accepted_tight_bright",
    label: "Accepted - tight bright fronts",
    wakeArcDisplayMode: PARTIAL_PROPAGATING_ARCS,
    wakeBands: 30,
    finalSpan: 14,
    startSpan: 2.5,
    dotRadius: 1.8,
    alphaScale: 1.18,
    falloffPower: 1,
  },
  {
    id: "tighter_sector",
    label: "Tighter sector - cleaner arrivals",
    wakeArcDisplayMode: PARTIAL_PROPAGATING_ARCS,
    wakeBands: 30,
    finalSpan: 10,
    startSpan: 1.8,
    dotRadius: 1.8,
    alphaScale: 1.18,
    falloffPower: 1,
  },
  {
    id: "slightly_wider",
    label: "Slightly wider sector",
    wakeArcDisplayMode: PARTIAL_PROPAGATING_ARCS,
    wakeBands: 30,
    finalSpan: 20,
    startSpan: 3.5,
    dotRadius: 1.8,
    alphaScale: 1.18,
    falloffPower: 1,
  },
  {
    id: "thin_fronts",
    label: "Thin fronts - lighter trace weight",
    wakeArcDisplayMode: PARTIAL_PROPAGATING_ARCS,
    wakeBands: 30,
    finalSpan: 14,
    startSpan: 2.5,
    dotRadius: 1.35,
    alphaScale: 0.86,
    falloffPower: 1,
  },
  {
    id: "bright_fronts",
    label: "Brighter fronts - visibility stress",
    wakeArcDisplayMode: PARTIAL_PROPAGATING_ARCS,
    wakeBands: 30,
    finalSpan: 14,
    startSpan: 2.5,
    dotRadius: 2.05,
    alphaScale: 1.32,
    falloffPower: 1,
  },
  {
    id: "strong_falloff",
    label: "Strong falloff - older wakes fade harder",
    wakeArcDisplayMode: PARTIAL_PROPAGATING_ARCS,
    wakeBands: 30,
    finalSpan: 14,
    startSpan: 2.5,
    dotRadius: 1.8,
    alphaScale: 0.92,
    falloffPower: 1.7,
  },
  {
    id: "full_circular_arcs",
    label: "Full circular wakes",
    wakeArcDisplayMode: FULL_CIRCULAR_ARCS,
    wakeBands: 5,
    dotRadius: 1.2,
    alphaScale: 1,
    falloffPower: 1,
    fullCircleAlpha: 0.16,
  },
  {
    id: "contrast_stress",
    label: "Contrast stress - mixed wake states",
    wakeArcDisplayMode: PARTIAL_PROPAGATING_ARCS,
    wakeBands: 36,
    finalSpan: 16,
    startSpan: 2.8,
    dotRadius: 1.95,
    alphaScale: 1.24,
    falloffPower: 1,
    canvasColorId: "solid_purple",
    assemblyThreshold: 0.00075,
    contrastStress: true,
    representativeOnly: true,
  },
]);

const HISTORY_POINTS = Object.freeze([
  { depth: 1, t: 0.08, weight: 0.24, state: "older" },
  { depth: 2, t: 0.25, weight: 0.48, state: "active" },
  { depth: 3, t: 0.62, weight: 0.72, state: "active" },
  { depth: 4, t: 0.88, weight: 1, state: "newer" },
]);

const DEFAULT_VIRTUAL_OBSERVER = Object.freeze({
  kind: "virtualObserver",
  label: "Virtual Observer",
  role: "observer",
  x: 1600,
  y: 540,
});

const PATH_ANCHORS = Object.freeze({
  positrino: Object.freeze([
    Object.freeze({ x: 260, y: 300 }),
    Object.freeze({ x: 450, y: 350 }),
    Object.freeze({ x: 650, y: 530 }),
    Object.freeze({ x: 820, y: 675 }),
    Object.freeze({ x: 1070, y: 645 }),
    Object.freeze({ x: 1290, y: 620 }),
    Object.freeze({ x: 1450, y: 600 }),
  ]),
  electrino: Object.freeze([
    Object.freeze({ x: 250, y: 810 }),
    Object.freeze({ x: 450, y: 735 }),
    Object.freeze({ x: 640, y: 595 }),
    Object.freeze({ x: 830, y: 420 }),
    Object.freeze({ x: 1080, y: 430 }),
    Object.freeze({ x: 1305, y: 440 }),
    Object.freeze({ x: 1450, y: 470 }),
  ]),
});

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
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

export function getPresetById(id) {
  return PRESETS.find((preset) => preset.id === id) ?? PRESETS[0];
}

export function getCanvasColorById(id) {
  return CANVAS_COLORS.find((entry) => entry.id === id) ?? CANVAS_COLORS[0];
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
    futureSolverTarget: CENTRAL_SOLVER_BRIDGE_TARGET,
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
    futureSolverTarget: CENTRAL_SOLVER_BRIDGE_TARGET,
    wakeArcDisplayMode: preset.wakeArcDisplayMode,
    canvasColorId: preset.canvasColorId ?? DEFAULT_CANVAS_ID,
    ...(Number.isFinite(Number(preset.assemblyThreshold))
      ? { assemblyThreshold: Number(preset.assemblyThreshold) }
      : {}),
    preset,
    initialConditions,
    virtualObserver: { ...initialConditions.virtualObserver },
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
    virtualObserver: { ...DEFAULT_VIRTUAL_OBSERVER },
  };
  ARCHITRINO_KINDS.forEach((kind) => {
    const points = paths[kind];
    const start = points[0];
    const next = points[1] ?? start;
    const dt = Number(next.t) - Number(start.t);
    const velocityScale = Number.isFinite(dt) && dt !== 0 ? 1 / dt : 0;
    conditions[kind] = {
      kind,
      t: start.t,
      x: start.x,
      y: start.y,
      vx: (next.x - start.x) * velocityScale,
      vy: (next.y - start.y) * velocityScale,
      polarity: kind === "positrino" ? "positive" : "negative",
      role: "source",
    };
  });
  return conditions;
}

function samplePath(kind, count = FRAME_COUNT) {
  const points = [];
  for (let index = 0; index < count; index += 1) {
    const t = 0.03 + (0.88 - 0.03) * (index / Math.max(1, count - 1));
    points.push({ t, ...getPathPoint(kind, t) });
  }
  return points;
}

function createWakeLink(sourceKind, receiverKind, sourceDepth, receiverDepth, color, label) {
  const source = getPathPoint(sourceKind, sourceDepth.t);
  const receiver = getPathPoint(receiverKind, receiverDepth.t);
  return {
    id: `${sourceKind}-${sourceDepth.depth}-to-${receiverKind}-${receiverDepth.depth}`,
    label,
    sourceKind,
    receiverKind,
    sourceDepth: sourceDepth.depth,
    receiverDepth: receiverDepth.depth,
    source,
    receiver,
    color,
    weight: Math.min(sourceDepth.weight, receiverDepth.weight),
  };
}
