export const DESIGN_WIDTH = 1920;
export const DESIGN_HEIGHT = 1080;
export const FRAME_COUNT = 1800;
export const PARTIAL_PROPAGATING_ARCS = "partial_propagating_arcs";
export const FIXED_CANVAS_COLOR = "#4b0082";
export const FIXED_WAKE_VISUAL_STYLE = Object.freeze({
  wakeArcDisplayMode: PARTIAL_PROPAGATING_ARCS,
  finalSpan: 14,
  startSpan: 2.5,
  dotRadius: 1.8,
  alphaScale: 1.18,
  falloffPower: 1,
});
export const CAUSAL_PATH_STROKE_WIDTH = 5;
export const ARCHITRINO_BODY_HALO_RADIUS = 20;
export const ARCHITRINO_BODY_RADIUS = 9;
export const ARCHITRINO_BODY_OUTLINE_WIDTH = 1.4;

export const TRANSMISSION_POINT_MARKER_VARIANTS = Object.freeze({
  OPEN_RING_BASELINE: "open-ring-baseline",
  SOLID_DOT_STANDARD: "solid-dot-standard",
});

export const TRANSMISSION_POINT_MARKER_STYLES = Object.freeze({
  [TRANSMISSION_POINT_MARKER_VARIANTS.OPEN_RING_BASELINE]: Object.freeze({
    radius: 4.2,
    minimumRadius: 3.2,
    fillAlpha: 0.015,
    outlineAlpha: 0.46,
    outlineWidth: 0.8,
  }),
  [TRANSMISSION_POINT_MARKER_VARIANTS.SOLID_DOT_STANDARD]: Object.freeze({
    radius: 1.55,
    fillAlpha: 0.92,
  }),
});

export const DEFAULT_TRANSMISSION_POINT_MARKER_VARIANT =
  TRANSMISSION_POINT_MARKER_VARIANTS.SOLID_DOT_STANDARD;

export const POSITRINO = Object.freeze({ r: 255, g: 0, b: 0, a: 1 });
export const ELECTRINO = Object.freeze({ r: 0, g: 0, b: 255, a: 1 });
export const POSITRINO_WAKE = Object.freeze({ r: 255, g: 150, b: 166, a: 1 });
export const ELECTRINO_WAKE = Object.freeze({ r: 150, g: 170, b: 255, a: 1 });
export const WHITE = Object.freeze({ r: 246, g: 247, b: 255, a: 1 });
export const ARCHITRINO_KINDS = Object.freeze(["positrino", "electrino"]);
export const TIME_AXIS_ORIGIN_X = 92;
export const TIME_AXIS_END_X = 1810;
export const TIME_AXIS_BASELINE_Y = 908;
export const TIME_AXIS_LABEL_POSITION = Object.freeze({
  x: TIME_AXIS_END_X - 22,
  y: TIME_AXIS_BASELINE_Y - 24,
});
export const TIMELINE_RAIL_AXIS_SAFE_INSET = 2;
export const SPACE_AXIS_TOP_Y = 182;
export const PATH_TIME_START_X =
  TIME_AXIS_ORIGIN_X + (TIME_AXIS_END_X - TIME_AXIS_ORIGIN_X) * 0.05;
export const PATH_TIME_END_X =
  TIME_AXIS_ORIGIN_X + (TIME_AXIS_END_X - TIME_AXIS_ORIGIN_X) * 0.95;

export function normalizeTransmissionPointMarkerVariant(variant) {
  return Object.values(TRANSMISSION_POINT_MARKER_VARIANTS).includes(variant)
    ? variant
    : DEFAULT_TRANSMISSION_POINT_MARKER_VARIANT;
}
