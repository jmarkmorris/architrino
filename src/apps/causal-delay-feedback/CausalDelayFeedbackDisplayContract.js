export const DESIGN_WIDTH = 1920;
export const DESIGN_HEIGHT = 1080;
export const FRAME_COUNT = 1800;
export const PARTIAL_PROPAGATING_ARCS = "partial_propagating_arcs";
export const FULL_CIRCULAR_ARCS = "full_circular_arcs";
export const DEFAULT_PRESET_ID = "accepted_tight_bright";
export const DEFAULT_CANVAS_ID = "architrinoPurple";

export const POSITRINO = Object.freeze({ r: 255, g: 0, b: 0, a: 1 });
export const ELECTRINO = Object.freeze({ r: 0, g: 0, b: 255, a: 1 });
export const POSITRINO_WAKE = Object.freeze({ r: 255, g: 150, b: 166, a: 1 });
export const ELECTRINO_WAKE = Object.freeze({ r: 150, g: 170, b: 255, a: 1 });
export const WHITE = Object.freeze({ r: 246, g: 247, b: 255, a: 1 });
export const ARCHITRINO_KINDS = Object.freeze(["positrino", "electrino"]);
export const TIME_AXIS_ORIGIN_X = 92;
export const TIME_AXIS_END_X = 1810;
export const TIME_AXIS_BASELINE_Y = 908;
export const SPACE_AXIS_TOP_Y = 182;
export const PATH_TIME_START_X =
  TIME_AXIS_ORIGIN_X + (TIME_AXIS_END_X - TIME_AXIS_ORIGIN_X) * 0.05;
export const PATH_TIME_END_X =
  TIME_AXIS_ORIGIN_X + (TIME_AXIS_END_X - TIME_AXIS_ORIGIN_X) * 0.95;

export const CANVAS_COLORS = Object.freeze([
  { id: "architrinoPurple", label: "Purple", color: "#4b0082" },
  { id: "light", label: "Light", color: "#fdfdfd" },
  { id: "warm", label: "Warm", color: "#f4ecd8" },
  { id: "dark", label: "Dark", color: "#0f172a" },
]);

export const PRESETS = Object.freeze([
  {
    id: "accepted_tight_bright",
    label: "Accepted - tight bright fronts",
    wakeArcDisplayMode: PARTIAL_PROPAGATING_ARCS,
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
    finalSpan: 360,
    startSpan: 360,
    dotRadius: 1.8,
    alphaScale: 1.18,
    falloffPower: 1,
  },
  {
    id: "contrast_stress",
    label: "Contrast stress - mixed wake states",
    wakeArcDisplayMode: PARTIAL_PROPAGATING_ARCS,
    finalSpan: 16,
    startSpan: 2.8,
    dotRadius: 1.95,
    alphaScale: 1.24,
    falloffPower: 1,
    canvasColorId: "architrinoPurple",
    assemblyThreshold: 0.00075,
    contrastStress: true,
    representativeOnly: true,
  },
]);

export function getPresetById(id) {
  return PRESETS.find((preset) => preset.id === id) ?? PRESETS[0];
}

export function getCanvasColorById(id) {
  return CANVAS_COLORS.find((entry) => entry.id === id) ?? CANVAS_COLORS[0];
}
