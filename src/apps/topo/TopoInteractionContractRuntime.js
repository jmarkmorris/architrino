import { createPanelCollapseIconSvg } from "../../runtime/PanelCollapseIcons.js";
import {
  renderDeclaredInlineMath,
  renderInlineMathText,
} from "../../runtime/InlineMathRuntime.js";
import {
  TRANSPORT_CONTROL_ICON,
  setTransportControlButtonPresentation,
} from "../../runtime/TransportControlIcons.js";
import {
  TOPO_DEFAULT_DISPLAY_SCALE,
  TOPO_DEFAULT_CONTOUR_REACH,
  TOPO_DEFAULT_SHADING_SPREAD,
  TOPO_CONTOUR_WEIGHT_POLICY_ID,
  TOPO_DISPLAY_MAPPING_ID,
  TOPO_INVERSE_SQUARE_SCALE,
  TOPO_REFERENCE_WAKE_MAGNITUDE,
  TOPO_ABSOLUTE_OBSERVER,
  TOPO_DEFAULT_PARTNER_WAKE_OBSERVER,
  TOPO_DEFAULT_WAKE_VIEW,
  TOPO_PARTNER_WAKE_OBSERVER,
  TOPO_SOURCE_POSITION,
  TOPO_TRANSLATION_AXIS,
  applyTopoScenarioPolarity,
  createTopoContourLevelStyle,
  createTopoSyntheticContourRenderPlan,
  createTopoSyntheticRawSampler,
  normalizeTopoContourCount,
  normalizeTopoShadingSpread,
  normalizeTopoDisplayScale,
  normalizeTopoFieldColorValue,
  normalizeTopoPartnerWakeObserver,
  normalizeTopoWakeView,
  resolveTopoCanvasPixelSize,
  topoContourRangeDecades,
  topoCanvasPixelForWorldPoint,
  topoPartnerWakeSourceId,
  topoPartnerWakeSourceSign,
  topoShadingReachScale,
  topoWorldPointForCanvasPixel,
} from "./TopoInteractionContract.js";
import {
  TOPO_COLLINEAR_PAIR_HISTORY_MODEL,
  TOPO_COLLINEAR_PAIR_SCENARIO_ID,
  createTopoCollinearPairFrame,
  createTopoCollinearPairRawSampler,
  resolveTopoCollinearPairPlaybackSeconds,
} from "./TopoCollinearPairScenario.js";
import {
  createTopoSignedContourLevels,
  connectTopoSampledFieldContourSegments,
  extractTopoSampledFieldContourSegments,
  TOPO_MARCHING_SQUARES_GLSL_CONTRACT,
  topoMarchingSquaresLevelIdentity,
  topoMarchingSquaresScreenSpaceCenterlineDistance,
  TOPO_GPU_CONTOUR_BAND_MAX,
  TOPO_GPU_CONTOUR_BAND_MIN,
  TOPO_GPU_CONTOUR_BAND_SCALE,
  TOPO_SAMPLED_FIELD_STATE,
} from "./TopoSampledFieldContours.js";
import {
  TOPO_CIRCULAR_BINARY_CENTER,
  TOPO_CIRCULAR_BINARY_DEFAULT_RADIUS,
  TOPO_CIRCULAR_BINARY_DIRECTION,
  TOPO_CIRCULAR_BINARY_KAPPA,
  TOPO_CIRCULAR_BINARY_PLAYBACK_SECONDS,
  TOPO_CIRCULAR_BINARY_REPLAY_ROTATIONS,
  TOPO_CIRCULAR_BINARY_SCENARIO_ID,
  createTopoCircularBinaryChart,
  createTopoCircularBinaryFrameIdentity,
  createTopoCircularBinaryPlayback,
  createTopoCircularBinaryRawSampler,
  resolveTopoCircularBinaryHistoryWarmup,
  sampleTopoCircularBinaryWake,
  topoCircularBinarySourcePosition,
  topoCircularBinaryWorldPointForCanvasPixel,
} from "./TopoCircularBinaryScenario.js";
import { createStandaloneAppNavigationRuntime } from "../navigator/StandaloneAppNavigationRuntime.js";
import { PHOTON_CHARGE_COLORS } from "../photon/PhotonStateRuntime.js";
import {
  WHITE,
} from "../causal-delay-feedback/CausalDelayFeedbackDisplayContract.js";

function requireElement(documentLike, selector) {
  const element = documentLike.querySelector(selector);
  if (!element) {
    throw new Error("Missing Wake Topography interaction-preview element: " + selector);
  }
  return element;
}

export function resetTopoVisiblePresentation({
  canvas,
  analyticFieldCanvas,
  fieldContext,
  contourContext,
  contourStagingContext,
  width,
  height,
  neutralColor,
} = {}) {
  const resetWidth = Math.max(0, Number(width) || 0);
  const resetHeight = Math.max(0, Number(height) || 0);
  canvas.style.opacity = "1";
  analyticFieldCanvas.style.visibility = "hidden";
  fieldContext.clearRect(0, 0, resetWidth, resetHeight);
  fieldContext.fillStyle = neutralColor;
  fieldContext.fillRect(0, 0, resetWidth, resetHeight);
  contourContext.clearRect(0, 0, resetWidth, resetHeight);
  contourStagingContext.clearRect(0, 0, resetWidth, resetHeight);
}

function readHexToken(windowLike, element, token, fallback) {
  const value = windowLike.getComputedStyle?.(element)
    ?.getPropertyValue?.(token)
    ?.trim?.();
  return /^#[0-9a-f]{6}$/iu.test(value ?? "") ? value : fallback;
}

function hexToRgb(hexColor) {
  const normalized = String(hexColor).replace(/^#/, "");
  return [
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16),
  ];
}

export function normalizeTopoNeutralWhiteMix(value) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue)
    ? Math.min(1, Math.max(0, numericValue))
    : 0;
}

function interpolateRgb(startRgb, endRgb, amount) {
  const normalizedAmount = normalizeTopoNeutralWhiteMix(amount);
  return startRgb.map((channel, index) => Math.round(
    channel + (endRgb[index] - channel) * normalizedAmount,
  ));
}

export function createTopoNeutralBackgroundRgb(purpleRgb, whiteMix) {
  return Object.freeze(interpolateRgb(
    purpleRgb,
    [255, 255, 255],
    whiteMix,
  ));
}

function rgbCss(rgb) {
  return "rgb(" + rgb.join(", ") + ")";
}

function interpolateHexColor(start, end, amount) {
  return rgbCss(interpolateRgb(hexToRgb(start), hexToRgb(end), amount));
}

function formatPercentage(normalizedValue) {
  const percentage = normalizedValue * 100;
  return (Number.isInteger(percentage) ? percentage.toFixed(0) : percentage.toFixed(1)) + "%";
}

function topoSourceName(sourceId) {
  return sourceId === TOPO_PARTNER_WAKE_OBSERVER.POSITRINO
    ? "Positrino"
    : "Electrino";
}

function topoContourLevelBounds(levels = []) {
  const rawDecades = levels
    .map(({ rawDecade }) => rawDecade)
    .filter(Number.isFinite);
  return Object.freeze({
    strongestRawDecade: rawDecades.length ? Math.max(...rawDecades) : 0,
    weakestRawDecade: rawDecades.length ? Math.min(...rawDecades) : 0,
  });
}

function createTopoWakeContourLevels(state) {
  const levels = createTopoSignedContourLevels({
    contourCount: state.contourCount,
    contourReach: TOPO_DEFAULT_CONTOUR_REACH,
  });
  if (state.superpositionView) {
    return levels;
  }
  const family = state.partnerWakeSourceSign < 0 ? "negative" : "positive";
  return levels.filter((level) => level.family === family);
}

function topoContourStyle(level, bounds, visibility) {
  return createTopoContourLevelStyle({
    rawDecade: level.rawDecade,
    family: level.family ?? "unsigned",
    visibility,
    ...bounds,
  });
}

export function createTopoSampledContourPaintStyle({
  level,
  bounds,
  visibility,
  binary = false,
  pixelRatio = 1,
} = {}) {
  const contourStyle = topoContourStyle(level, bounds, visibility);
  const normalizedVisibility = contourStyle.levelWeight > 0
    ? contourStyle.opacity / contourStyle.levelWeight
    : 0;
  const opacity = binary && normalizedVisibility > 0
    ? contourStyle.levelWeight *
      Math.sqrt(normalizedVisibility) ** (1 / contourStyle.levelWeight)
    : contourStyle.opacity;
  return Object.freeze({
    ...contourStyle,
    opacity,
    lineWidth: pixelRatio * contourStyle.widthCss,
    strengthPolicy: binary
      ? "level-weighted-progressive-fade"
      : "linear-profile-scale",
  });
}

function topoContourWeightProfile(levels, bounds) {
  return levels.map((level) => {
    const style = topoContourStyle(level, bounds, 1);
    return (level.family ?? "unsigned") + ":" +
      (Number.isFinite(level.rawDecade)
        ? level.rawDecade.toFixed(6)
        : "zero") + ":" + style.levelWeight.toFixed(6);
  }).join(",");
}

export function topoGlobalTransportOwnsSpace(event) {
  if (event?.code !== "Space" || event?.repeat || event?.target?.isContentEditable) {
    return false;
  }
  const tagName = String(event?.target?.tagName ?? "").toUpperCase();
  if (tagName === "INPUT") {
    return String(event.target?.type ?? "").toLowerCase() === "range";
  }
  return !/^(SELECT|TEXTAREA|BUTTON|A)$/u.test(tagName);
}

export function topoRangePointerMoveOwnsInteraction(
  event = {},
  activePointerId = null,
) {
  return activePointerId != null &&
    event.pointerId === activePointerId &&
    (Number(event.buttons) & 1) === 1;
}

export const TOPO_SOURCE_MARKER_RADIUS_SCALE = 0.5;
export const TOPO_CANVAS_SAMPLE_CENTER_OFFSET = 0.5;
export const TOPO_ANIMATED_MIN_BETA = 0.05;
// Marker glyph size is a CSS-pixel contract.  Canvas backing dimensions and
// Display scale affect placement and world-to-device conversion, never this
// visible radius.  The 4.5px source radius is the accepted pre-half-size
// baseline; both species render at exactly half of it.
export const TOPO_SOURCE_MARKER_RADIUS_CSS_PIXELS = 4.5;
export const TOPO_VISIBLE_SOURCE_MARKER_RADIUS_CSS_PIXELS =
  TOPO_SOURCE_MARKER_RADIUS_CSS_PIXELS * TOPO_SOURCE_MARKER_RADIUS_SCALE;
// The authoritative field is fail-closed only at the exact mathematical
// source singularity.  Display occlusion is handled by the solid marker, not
// by a scale-dependent unavailable annulus.
export const TOPO_EXACT_SOURCE_MASK_WORLD_RADIUS = 0;
export const TOPO_ELECTRINO_VISIBLE_MARKER_RADIUS_SCALE = 0.5;
export const TOPO_POSITRINO_VISIBLE_MARKER_RADIUS_SCALE = 0.5;
// Keep live marching-squares cells below 2.3 canvas pixels at the desktop stage.
export const TOPO_PAIR_PLAYBACK_CONTOUR_GRID_WIDTH = 400;
export const TOPO_PAIR_CROSSING_CONTOUR_GRID_WIDTH = 480;
export const TOPO_PAIR_CROSSING_PHASE_START = 0.42;
export const TOPO_PAIR_CROSSING_PHASE_END = 0.66;
// The centered viewport puts the near-coincidence saddle directly on the pixel
// lattice. A short, denser preview window prevents that saddle from aliasing
// into disconnected branches while leaving the accepted general preview cost
// unchanged.
// Keep the whole crossing interval on one bounded grid. Switching briefly to
// the full stage at coincidence stalls playback even though the bounded grid
// retains the same accepted contour-component topology. Paused frames still
// refine independently at full density.
// The live global pair grid is intentionally bounded for cadence.  At low
// speed its strongest two closed source contours can be only 2.5--3.7 cells
// in radius, which makes an otherwise correct level set visibly polygonal as
// it advances between cells.  Refine only those complete closed components on
// the same authoritative scalar at a 0.4-CSS-pixel step. A component that
// reaches the patch boundary or is not uniquely closed is left on the global
// path, so this cannot splice branches or replace crossing topology.
export const TOPO_PAIR_SOURCE_REFINEMENT_MAX_BETA = 0.25;
export const TOPO_PAIR_SOURCE_REFINEMENT_MIN_RAW_DECADE = 2 / 3;
export const TOPO_PAIR_SOURCE_REFINEMENT_RADIUS_PIXELS = 24;
export const TOPO_PAIR_SOURCE_REFINEMENT_GRID_SIZE = 121;
export const TOPO_BINARY_PLAYBACK_CONTOUR_GRID_WIDTH = 120;
export const TOPO_BINARY_PAUSED_CONTOUR_GRID_WIDTH = 180;
export const TOPO_BINARY_HIGH_SPEED_CONTOUR_BETA = 0.9;
// The full stage frame is used after pause; keep the live path bounded so it
// advances at a current phase rather than presenting a stale dense contour.
export const TOPO_BINARY_HIGH_SPEED_PLAYBACK_CONTOUR_GRID_WIDTH = 180;
export const TOPO_BINARY_HIGH_SPEED_PAUSED_CONTOUR_GRID_WIDTH = 240;
export const TOPO_BINARY_SOURCE_REFINEMENT_GRID_SIZE = 56;
export const TOPO_BINARY_SOURCE_REFINEMENT_RADIUS_PIXELS = 64;
export const TOPO_BINARY_SOURCE_REFINEMENT_REPLACEMENT_RADIUS_PIXELS = 48;
export const TOPO_BINARY_SOURCE_REFINEMENT_MIN_RAW_DECADE = -1;
// A beta-one 0.025 phase sweep of the selected -2 contour found its largest
// current screen-space aspect deviation at this phase (and antipodal 0.875).
// Keep it explicit so the formerly egg-like frame remains reproducible.
export const TOPO_BINARY_PASS_TWO_EGG_DIAGNOSTIC_PHASE = 0.375;
export const TOPO_BINARY_PASS_TWO_DIAGNOSTIC_PHASES = Object.freeze([
  0,
  0.25,
  0.5,
  0.75,
  TOPO_BINARY_PASS_TWO_EGG_DIAGNOSTIC_PHASE,
]);
const TOPO_BINARY_GPU_CONTOUR_MAX_LEVELS = 64;
const TOPO_CANVAS_CENTER = Object.freeze({ x: 0.5, y: 0.5 });

export function topoAnimatedScenarioUsesMinimumBeta(scenarioId) {
  return scenarioId === TOPO_COLLINEAR_PAIR_SCENARIO_ID ||
    scenarioId === TOPO_CIRCULAR_BINARY_SCENARIO_ID;
}

export function normalizeTopoScenarioBeta(value, scenarioId) {
  const beta = Number(value);
  if (!Number.isFinite(beta)) {
    throw new TypeError("beta must be finite.");
  }
  const minimum = topoAnimatedScenarioUsesMinimumBeta(scenarioId)
    ? TOPO_ANIMATED_MIN_BETA
    : 0;
  return Math.min(1, Math.max(minimum, beta));
}

export function resolveTopoLinearViewportAnchor({
  width,
  height,
  pairMode = false,
  beta = 0.5,
  phase = 0,
} = {}) {
  if (!pairMode) {
    return Object.freeze({
      anchorId: "single-source",
      viewportCenter: TOPO_SOURCE_POSITION,
      canvasAnchor: TOPO_SOURCE_POSITION,
    });
  }
  const horizontalWorldSpan = Math.max(1, Number(width) - 1) /
    Math.max(1, Number(height) - 1);
  const pairFrame = createTopoCollinearPairFrame({
    beta,
    phase,
    horizontalWorldSpan,
  });
  const [first, second] = pairFrame.sources;
  return Object.freeze({
    anchorId: "collinear-pair-midpoint",
    viewportCenter: Object.freeze({
      x: (first.position.x + second.position.x) / 2,
      y: (first.position.y + second.position.y) / 2,
    }),
    canvasAnchor: TOPO_CANVAS_CENTER,
  });
}

export function resolveTopoPairPlaybackContourGridWidth({
  canvasWidth,
  phase,
} = {}) {
  const width = Math.max(2, Number(canvasWidth));
  const replayPhase = Number(phase);
  if (!Number.isFinite(width) || !Number.isFinite(replayPhase)) {
    throw new TypeError("Pair contour grid inputs must be finite.");
  }
  const targetWidth = replayPhase >= TOPO_PAIR_CROSSING_PHASE_START &&
      replayPhase <= TOPO_PAIR_CROSSING_PHASE_END
    ? TOPO_PAIR_CROSSING_CONTOUR_GRID_WIDTH
    : TOPO_PAIR_PLAYBACK_CONTOUR_GRID_WIDTH;
  return Math.max(2, Math.min(targetWidth, Math.floor(width)));
}

export function resolveTopoBinaryContourGridWidth({
  canvasWidth,
  beta,
  playing = false,
} = {}) {
  const width = Math.max(2, Number(canvasWidth));
  const speed = Number(beta);
  if (!Number.isFinite(width) || !Number.isFinite(speed)) {
    throw new TypeError("Binary contour grid inputs must be finite.");
  }
  const highSpeed = speed >= TOPO_BINARY_HIGH_SPEED_CONTOUR_BETA;
  const targetWidth = highSpeed
    ? playing
      ? TOPO_BINARY_HIGH_SPEED_PLAYBACK_CONTOUR_GRID_WIDTH
      : TOPO_BINARY_HIGH_SPEED_PAUSED_CONTOUR_GRID_WIDTH
    : playing
      ? TOPO_BINARY_PLAYBACK_CONTOUR_GRID_WIDTH
      : TOPO_BINARY_PAUSED_CONTOUR_GRID_WIDTH;
  return Math.max(2, Math.min(targetWidth, Math.floor(width)));
}

export function resolveTopoSourceMarkerRadius({
  width,
  height,
  pixelRatio = 1,
} = {}) {
  const canvasWidth = Number(width);
  const canvasHeight = Number(height);
  const density = Number(pixelRatio);
  if (
    !Number.isFinite(canvasWidth) ||
    !Number.isFinite(canvasHeight) ||
    !Number.isFinite(density) ||
    canvasWidth < 1 ||
    canvasHeight < 1 ||
    density < 1
  ) {
    throw new TypeError("Marker dimensions and pixel ratio must be finite.");
  }
  return TOPO_SOURCE_MARKER_RADIUS_CSS_PIXELS * density;
}

export function resolveTopoVisibleSourceMarkerCssRadius({
  polaritySign,
} = {}) {
  const speciesScale = Number(polaritySign) < 0
    ? TOPO_ELECTRINO_VISIBLE_MARKER_RADIUS_SCALE
    : TOPO_POSITRINO_VISIBLE_MARKER_RADIUS_SCALE;
  return speciesScale * TOPO_SOURCE_MARKER_RADIUS_CSS_PIXELS;
}

export function resolveTopoVisibleSourceMarkerRadius({
  polaritySign,
  width,
  height,
  pixelRatio = 1,
} = {}) {
  // Validate the backing dimensions while deriving the device-pixel radius
  // from the fixed CSS-pixel contract.  Display scale is intentionally absent.
  resolveTopoSourceMarkerRadius({
    width,
    height,
    pixelRatio,
  });
  return resolveTopoVisibleSourceMarkerCssRadius({ polaritySign }) *
    Number(pixelRatio);
}

export function resolveTopoVisibleSourceMarkerWorldRadius({
  polaritySign,
  width,
  height,
  pixelRatio = 1,
  displayScale = TOPO_DEFAULT_DISPLAY_SCALE,
  axis = "vertical",
} = {}) {
  const canvasWidth = Number(width);
  const canvasHeight = Number(height);
  const mapScale = Number(displayScale);
  if (!Number.isFinite(canvasWidth) || !Number.isFinite(canvasHeight) ||
      !Number.isFinite(mapScale) || mapScale <= 0) {
    throw new TypeError("Marker world-radius inputs must be finite.");
  }
  const dimension = axis === "horizontal" ? canvasWidth : canvasHeight;
  return resolveTopoVisibleSourceMarkerRadius({
    polaritySign,
    width: canvasWidth,
    height: canvasHeight,
    pixelRatio,
  }) / (Math.max(1, dimension - 1) * mapScale);
}

export function createTopoVisibleMarkerPaintStyle({
  polaritySign,
  width,
  height,
  pixelRatio = 1,
} = {}) {
  return Object.freeze({
    radius: resolveTopoVisibleSourceMarkerRadius({
      polaritySign,
      width,
      height,
      pixelRatio,
    }),
  });
}

export function paintTopoSourceMarker({
  targetContext,
  x,
  y,
  markerStyle,
  sourceColor,
} = {}) {
  if (!targetContext || !markerStyle) {
    return false;
  }
  targetContext.save();
  // Source disks must not inherit a contour/guide alpha or composite mode.
  // They are the final opaque marker layer for the current source frame.
  targetContext.globalAlpha = 1;
  targetContext.globalCompositeOperation = "source-over";
  targetContext.fillStyle = sourceColor;
  targetContext.beginPath();
  targetContext.arc(
    x + TOPO_CANVAS_SAMPLE_CENTER_OFFSET,
    y + TOPO_CANVAS_SAMPLE_CENTER_OFFSET,
    markerStyle.radius,
    0,
    Math.PI * 2,
  );
  targetContext.fill();
  // The analytic field evaluates its source mask at integer pixel-sample
  // coordinates (gl_FragCoord - 0.5). Canvas2D evaluates circle coverage at
  // pixel centers. Fully cover the exact same sample set so an antialiased
  // marker edge cannot expose the fail-closed field mask beneath it.
  const canvasWidth = targetContext.canvas?.width ?? Infinity;
  const canvasHeight = targetContext.canvas?.height ?? Infinity;
  const minimumX = Math.max(0, Math.ceil(x - markerStyle.radius));
  const maximumX = Math.min(
    canvasWidth - 1,
    Math.floor(x + markerStyle.radius),
  );
  const minimumY = Math.max(0, Math.ceil(y - markerStyle.radius));
  const maximumY = Math.min(
    canvasHeight - 1,
    Math.floor(y + markerStyle.radius),
  );
  for (let pixelY = minimumY; pixelY <= maximumY; pixelY += 1) {
    for (let pixelX = minimumX; pixelX <= maximumX; pixelX += 1) {
      if (Math.hypot(pixelX - x, pixelY - y) <= markerStyle.radius) {
        targetContext.fillRect(pixelX, pixelY, 1, 1);
      }
    }
  }
  targetContext.restore();
  return true;
}

// A separated pair takes the same direct solid-disk path as a stationary
// source.  Only actual overlap needs the bisector split; applying a clip to
// every moving frame makes the Canvas2D compositor part of an otherwise
// unrelated disk edge and can leave fractional-coverage artifacts.
export function paintTopoPairSourceMarkerLayers({
  targetContext,
  width,
  height,
  positioned,
  drawMarker,
} = {}) {
  if (!targetContext || !Array.isArray(positioned) || positioned.length !== 2 ||
      typeof drawMarker !== "function") {
    return false;
  }
  const ordered = positioned.slice().sort((left, right) =>
    left.geometry.x - right.geometry.x);
  const splitX = (ordered[0].geometry.x + ordered[1].geometry.x) / 2;
  const markersOverlap = Math.hypot(
    ordered[1].geometry.x - ordered[0].geometry.x,
    ordered[1].geometry.y - ordered[0].geometry.y,
  ) < ordered[0].geometry.radius + ordered[1].geometry.radius;
  ordered.forEach(({ source, geometry }, index) => {
    targetContext.save();
    if (markersOverlap) {
      targetContext.beginPath();
      if (index === 0) {
        targetContext.rect(0, 0, splitX, height);
      } else {
        targetContext.rect(splitX, 0, width - splitX, height);
      }
      targetContext.clip();
    }
    drawMarker({ source, geometry });
    targetContext.restore();
  });
  return Object.freeze({ splitX, layerCount: ordered.length, markersOverlap });
}

export function resolveTopoSourceMaskRadius({
  polaritySign = -1,
  width,
  height,
  pixelRatio = 1,
} = {}) {
  resolveTopoSourceMarkerRadius({ width, height, pixelRatio });
  return TOPO_EXACT_SOURCE_MASK_WORLD_RADIUS;
}

export function resolveTopoCollinearSourceMaskRadius({
  polaritySign = -1,
  width,
  height,
  pixelRatio = 1,
} = {}) {
  resolveTopoSourceMarkerRadius({ width, height, pixelRatio });
  return TOPO_EXACT_SOURCE_MASK_WORLD_RADIUS;
}

function topoPairRefinementClosedComponent(segments, gridWidth, gridHeight) {
  const paths = connectTopoSampledFieldContourSegments(segments);
  if (paths.length !== 1 || paths[0].length < 4) {
    return null;
  }
  const path = paths[0];
  const first = path[0];
  const last = path.at(-1);
  const margin = 1;
  if (Math.hypot(first.x - last.x, first.y - last.y) > 1e-6 ||
      path.some((point) =>
        point.x <= margin || point.y <= margin ||
        point.x >= gridWidth - 1 - margin ||
        point.y >= gridHeight - 1 - margin)) {
    return null;
  }
  return path;
}

export function topoPairRefinementContainsGlobalSegments({
  segments = [],
  scaleX = 1,
  scaleY = 1,
  refinement,
} = {}) {
  if (!refinement || segments.length === 0) {
    return false;
  }
  const horizontalScale = Number(scaleX);
  const verticalScale = Number(scaleY);
  const containmentRadius = refinement.radius - 2 * refinement.step;
  return Number.isFinite(horizontalScale) && Number.isFinite(verticalScale) &&
    containmentRadius > 0 && segments.every((segment) => [
      [segment.x1 * horizontalScale, segment.y1 * verticalScale],
      [segment.x2 * horizontalScale, segment.y2 * verticalScale],
    ].every(([segmentX, segmentY]) => Math.hypot(
      segmentX - refinement.sourceX,
      segmentY - refinement.sourceY,
    ) < containmentRadius));
}

export function createTopoPairSourceContourRefinement({
  width,
  height,
  pixelRatio = 1,
  beta,
  phase,
  displayScale = TOPO_DEFAULT_DISPLAY_SCALE,
  levels = [],
  polaritySign,
  observerId = TOPO_DEFAULT_PARTNER_WAKE_OBSERVER,
  superposition = false,
} = {}) {
  const canvasWidth = Math.max(2, Number(width));
  const canvasHeight = Math.max(2, Number(height));
  const density = Math.max(1, Number(pixelRatio));
  const speed = Number(beta);
  const replayPhase = Number(phase);
  const sign = Math.sign(Number(polaritySign));
  if (![canvasWidth, canvasHeight, density, speed, replayPhase, sign].every(
    Number.isFinite,
  ) || sign === 0) {
    throw new TypeError("Pair contour refinement inputs must be finite and signed.");
  }
  const selectedLevels = levels.filter((level) =>
    Math.sign(level.value) === sign &&
    Number.isFinite(level.rawDecade) &&
    level.rawDecade >= TOPO_PAIR_SOURCE_REFINEMENT_MIN_RAW_DECADE);
  if (selectedLevels.length === 0) {
    return null;
  }
  const horizontalWorldSpan = Math.max(1, canvasWidth - 1) /
    Math.max(1, canvasHeight - 1);
  const pairFrame = createTopoCollinearPairFrame({
    beta: speed,
    phase: replayPhase,
    horizontalWorldSpan,
  });
  const source = pairFrame.sources.find((entry) => entry.polaritySign === sign);
  if (!source) {
    return null;
  }
  const viewportAnchor = resolveTopoLinearViewportAnchor({
    width: canvasWidth,
    height: canvasHeight,
    pairMode: true,
    beta: speed,
    phase: replayPhase,
  });
  const sourcePixel = topoCanvasPixelForWorldPoint({
    worldX: source.position.x,
    worldY: source.position.y,
    width: canvasWidth,
    height: canvasHeight,
    displayScale,
    viewportCenter: viewportAnchor.viewportCenter,
    canvasAnchor: viewportAnchor.canvasAnchor,
  });
  const radius = TOPO_PAIR_SOURCE_REFINEMENT_RADIUS_PIXELS * density;
  const gridSize = TOPO_PAIR_SOURCE_REFINEMENT_GRID_SIZE;
  const step = 2 * radius / Math.max(1, gridSize - 1);
  const raw = new Float32Array(gridSize * gridSize);
  const sampleStates = new Uint8Array(raw.length);
  const sampleRaw = createTopoCollinearPairRawSampler({
    beta: speed,
    phase: replayPhase,
    horizontalWorldSpan,
    sourceMaskRadius: resolveTopoCollinearSourceMaskRadius({
      polaritySign: sign,
      width: canvasWidth,
      height: canvasHeight,
      // Match createRawSamplerForState exactly: canvas dimensions already
      // carry device density, while the scalar mask contract uses ratio 1.
      pixelRatio: 1,
    }),
    observerId,
    superposition,
  });
  for (let sampleY = 0; sampleY < gridSize; sampleY += 1) {
    for (let sampleX = 0; sampleX < gridSize; sampleX += 1) {
      const canvasX = sourcePixel.x - radius + sampleX * step;
      const canvasY = sourcePixel.y - radius + sampleY * step;
      const worldPoint = topoWorldPointForCanvasPixel({
        pixelX: canvasX,
        pixelY: canvasY,
        width: canvasWidth,
        height: canvasHeight,
        displayScale,
        viewportCenter: viewportAnchor.viewportCenter,
        canvasAnchor: viewportAnchor.canvasAnchor,
      });
      const index = sampleY * gridSize + sampleX;
      const value = sampleRaw(worldPoint.x, worldPoint.y);
      raw[index] = value;
      sampleStates[index] = Number.isNaN(value)
        ? TOPO_SAMPLED_FIELD_STATE.MASKED
        : Number.isFinite(value)
          ? TOPO_SAMPLED_FIELD_STATE.VALID
          : TOPO_SAMPLED_FIELD_STATE.UNAVAILABLE;
    }
  }
  const extracted = extractTopoSampledFieldContourSegments({
    raw,
    sampleStates,
    width: gridSize,
    height: gridSize,
    levels: selectedLevels,
  });
  const replacements = selectedLevels.flatMap((level) => {
    const segments = extracted.segments.filter((segment) =>
      segment.family === level.family && segment.value === level.value);
    const path = topoPairRefinementClosedComponent(
      segments,
      gridSize,
      gridSize,
    );
    return path ? [{ level, segments, path }] : [];
  });
  return Object.freeze({
    polaritySign: sign,
    sourceX: sourcePixel.x,
    sourceY: sourcePixel.y,
    radius,
    step,
    gridSize,
    invalidCellCount: extracted.invalidCellCount,
    replacements: Object.freeze(replacements),
  });
}

export function mountTopoInteractionContractPreview(options = {}) {
  const documentLike = options.documentLike ?? globalThis.document;
  const windowLike = options.windowLike ?? globalThis.window;
  renderDeclaredInlineMath(documentLike, { documentLike, windowLike });
  const navigationRuntime = options.navigationRuntime ??
    createStandaloneAppNavigationRuntime({
      host: requireElement(documentLike, "#scene-hud-tools"),
      document: documentLike,
      window: windowLike,
    });
  navigationRuntime.init?.();
  const dom = {
    app: requireElement(documentLike, "#topo-app"),
    panelContent: requireElement(documentLike, "#topo-panel-content"),
    collapse: requireElement(documentLike, "#topo-panel-collapse"),
    scenarioControl: requireElement(documentLike, "#topo-scenario-control"),
    scenarioInputs: Array.from(documentLike.querySelectorAll(
      'input[name="topo-scenario"]',
    )),
    partnerPerspectiveControl: requireElement(
      documentLike,
      "#topo-partner-perspective-control",
    ),
    partnerPerspectiveInputs: Array.from(documentLike.querySelectorAll(
      'input[name="topo-partner-perspective"]',
    )),
    partnerPerspectiveNote: requireElement(
      documentLike,
      "#topo-partner-perspective-note",
    ),
    beta: requireElement(documentLike, "#topo-beta"),
    betaOutput: requireElement(documentLike, "#topo-beta-output"),
    contourCount: requireElement(documentLike, "#topo-contour-count"),
    shadingSpread: requireElement(documentLike, "#topo-shading-spread"),
    contourVisibility: requireElement(documentLike, "#topo-contour-visibility"),
    displayScale: requireElement(documentLike, "#topo-display-scale"),
    contourControls: requireElement(documentLike, "#topo-contour-controls"),
    binaryRadiusControl: requireElement(
      documentLike,
      "#topo-binary-radius-control",
    ),
    binaryRadius: requireElement(documentLike, "#topo-binary-radius"),
    binaryRadiusOutput: requireElement(
      documentLike,
      "#topo-binary-radius-output",
    ),
    binaryOrbitGuideControl: requireElement(
      documentLike,
      "#topo-binary-orbit-guide-control",
    ),
    binaryOrbitGuide: requireElement(documentLike, "#topo-binary-orbit-guide"),
    binaryDirectionControl: requireElement(
      documentLike,
      "#topo-binary-direction-control",
    ),
    binaryDirectionInputs: Array.from(documentLike.querySelectorAll(
      'input[name="topo-binary-direction"]',
    )),
    background: requireElement(documentLike, "#topo-background"),
    canvas: requireElement(documentLike, "#topo-canvas"),
    contourCanvas: requireElement(documentLike, "#topo-contour-canvas"),
    status: requireElement(documentLike, "#topo-status"),
    legendMapping: requireElement(documentLike, "#topo-legend-mapping"),
    legendTitle: requireElement(documentLike, "#topo-legend-title"),
    legendGradient: requireElement(documentLike, "#topo-legend-gradient"),
    legendTicks: requireElement(documentLike, "#topo-legend-ticks"),
    pairTransport: requireElement(documentLike, "#topo-pair-transport"),
    pairPlay: requireElement(documentLike, "#topo-pair-play"),
    pairTimeline: requireElement(documentLike, "#topo-pair-timeline"),
    pairReplay: requireElement(documentLike, "#topo-pair-replay"),
    binaryTransport: requireElement(documentLike, "#topo-binary-transport"),
    binaryPlay: requireElement(documentLike, "#topo-binary-play"),
    binaryTimeline: requireElement(documentLike, "#topo-binary-timeline"),
    binaryReplay: requireElement(documentLike, "#topo-binary-replay"),
  };

  const context = dom.canvas.getContext("2d", { alpha: false });
  if (!context) {
    throw new Error("Wake Topography interaction preview requires a 2D canvas context.");
  }
  const contourContext = dom.contourCanvas.getContext("2d");
  if (!contourContext) {
    throw new Error("Wake Topography interaction preview requires a contour canvas context.");
  }

  const listeners = [];
  let renderRequest = 0;
  let finalRenderTimer = 0;
  let renderWatchdogTimer = 0;
  let frameRevision = 0;
  let resizeObserver = null;
  let pairPlaybackRequest = 0;
  let pairPlaybackPhase = 0;
  let pairPlaybackPlaying = false;
  let pairPlaybackCompleted = false;
  let pairPlaybackPreviousTimestamp = null;
  let pairTimelineScrubbing = false;
  let scenarioPointerActivation = false;
  let partnerPerspectivePointerActivation = false;
  let binaryDirectionPointerActivation = false;
  let binaryOrbitGuidePointerActivation = false;
  let binaryProgress = 0;
  let binaryPlaying = false;
  let binaryPlaybackStartedAt = null;
  let binaryPlaybackPreviousTimestamp = null;
  let binaryPlaybackStartProgress = 0;
  let binaryPlaybackPresentedFrameCount = 0;
  let binaryTimelineScrubbing = false;
  let binaryAnimationRequest = 0;
  let topoScalarAuditKey = null;
  let topoPassTwoDiagnosticKey = null;
  const topoPassTwoDiagnosticPhaseSummaries = new Map();
  // Full-frame readback and CPU comparison are deliberately opt-in diagnostics.
  // They are useful for the bounded parity proof, but never belong on the
  // presented animation path: each comparison is substantially more expensive
  // than the scalar-texture draw it verifies.
  const topoBinaryDiagnosticsEnabled =
    dom.app.dataset.topoBinaryDiagnostics === "enabled";
  let rawFrameCache = null;
  let lastContourPresentationKey = null;
  const rawFrameCaches = new Map();

  function topoPassTwoDiagnosticPhase(progress) {
    return TOPO_BINARY_PASS_TWO_DIAGNOSTIC_PHASES.find((phase) =>
      Math.abs(progress - phase) <= 0.0005) ?? null;
  }
  const sampledContourCaches = new Map();
  const previewCanvas = documentLike.createElement("canvas");
  const previewContext = previewCanvas.getContext("2d", { alpha: false });
  if (!previewContext) {
    throw new Error("Wake Topography interaction preview requires a preview canvas context.");
  }
  const contourStagingCanvas = documentLike.createElement("canvas");
  const contourStagingContext = contourStagingCanvas.getContext("2d");
  if (!contourStagingContext) {
    throw new Error("Wake Topography interaction preview requires a contour staging context.");
  }
  const fieldRasterCanvas = documentLike.createElement("canvas");
  const fieldRasterContext = fieldRasterCanvas.getContext("2d", { alpha: false });
  if (!fieldRasterContext) {
    throw new Error("Wake Topography interaction preview requires a field raster context.");
  }
  const analyticFieldCanvas = documentLike.createElement("canvas");
  analyticFieldCanvas.className = "topo-gpu-field-canvas";
  analyticFieldCanvas.setAttribute("aria-hidden", "true");
  Object.assign(analyticFieldCanvas.style, {
    position: "absolute",
    inset: "0",
    display: "block",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "0",
  });
  dom.canvas.parentElement?.insertBefore(analyticFieldCanvas, dom.contourCanvas);
  const fieldGl = analyticFieldCanvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
  });

  function createTopoScalarFramebufferResources() {
    if (!fieldGl) return Object.freeze({ available: false, reason: "webgl-unavailable" });
    const candidates = [];
    const version = fieldGl.getParameter(fieldGl.VERSION);
    const floatExtension = fieldGl.getExtension("OES_texture_float");
    const halfFloatExtension = fieldGl.getExtension("OES_texture_half_float");
    const colorFloatExtension = fieldGl.getExtension("WEBGL_color_buffer_float");
    const colorHalfFloatExtension = fieldGl.getExtension("EXT_color_buffer_half_float");
    if (floatExtension && colorFloatExtension) {
      candidates.push({ id: "rgba-float", type: fieldGl.FLOAT });
    }
    if (halfFloatExtension && colorHalfFloatExtension) {
      candidates.push({ id: "rgba-half-float", type: halfFloatExtension.HALF_FLOAT_OES });
    }
    // This is a deterministic fail-closed diagnostic fallback only; it is not
    // a scalar contour path until its threshold precision is independently
    // accepted.
    candidates.push({ id: "rgba8-diagnostic", type: fieldGl.UNSIGNED_BYTE });
    for (const candidate of candidates) {
      const texture = fieldGl.createTexture();
      const framebuffer = fieldGl.createFramebuffer();
      if (!texture || !framebuffer) continue;
      fieldGl.bindTexture(fieldGl.TEXTURE_2D, texture);
      fieldGl.texParameteri(fieldGl.TEXTURE_2D, fieldGl.TEXTURE_MIN_FILTER, fieldGl.NEAREST);
      fieldGl.texParameteri(fieldGl.TEXTURE_2D, fieldGl.TEXTURE_MAG_FILTER, fieldGl.NEAREST);
      fieldGl.texParameteri(fieldGl.TEXTURE_2D, fieldGl.TEXTURE_WRAP_S, fieldGl.CLAMP_TO_EDGE);
      fieldGl.texParameteri(fieldGl.TEXTURE_2D, fieldGl.TEXTURE_WRAP_T, fieldGl.CLAMP_TO_EDGE);
      fieldGl.texImage2D(fieldGl.TEXTURE_2D, 0, fieldGl.RGBA, 2, 2, 0,
        fieldGl.RGBA, candidate.type, null);
      fieldGl.bindFramebuffer(fieldGl.FRAMEBUFFER, framebuffer);
      fieldGl.framebufferTexture2D(fieldGl.FRAMEBUFFER, fieldGl.COLOR_ATTACHMENT0,
        fieldGl.TEXTURE_2D, texture, 0);
      const complete = fieldGl.checkFramebufferStatus(fieldGl.FRAMEBUFFER) ===
        fieldGl.FRAMEBUFFER_COMPLETE;
      fieldGl.bindFramebuffer(fieldGl.FRAMEBUFFER, null);
      if (complete) {
        const vertex = compileFieldShader(fieldGl.VERTEX_SHADER, `
          attribute vec2 a_position;
          void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
        `);
        const fragment = compileFieldShader(fieldGl.FRAGMENT_SHADER, `
          precision highp float;
          uniform float u_diagnostic;
          void main() {
            // R is the signed scalar, G is availability (one = ordinary),
            // B is reserved for provenance, and A is an initialized marker.
            gl_FragColor = vec4(u_diagnostic, 1.0, 0.0, 1.0);
          }
        `);
        const program = fieldGl.createProgram();
        fieldGl.attachShader(program, vertex);
        fieldGl.attachShader(program, fragment);
        fieldGl.linkProgram(program);
        const buffer = fieldGl.createBuffer();
        fieldGl.bindBuffer(fieldGl.ARRAY_BUFFER, buffer);
        fieldGl.bufferData(fieldGl.ARRAY_BUFFER,
          new Float32Array([-1, -1, 3, -1, -1, 3]), fieldGl.STATIC_DRAW);
        fieldGl.bindFramebuffer(fieldGl.FRAMEBUFFER, framebuffer);
        fieldGl.viewport(0, 0, 2, 2);
        fieldGl.useProgram(program);
        fieldGl.enableVertexAttribArray(fieldGl.getAttribLocation(program, "a_position"));
        fieldGl.vertexAttribPointer(fieldGl.getAttribLocation(program, "a_position"), 2,
          fieldGl.FLOAT, false, 0, 0);
        fieldGl.uniform1f(fieldGl.getUniformLocation(program, "u_diagnostic"), -0.375);
        fieldGl.drawArrays(fieldGl.TRIANGLES, 0, 3);
        const readback = new Float32Array(4);
        fieldGl.readPixels(0, 0, 1, 1, fieldGl.RGBA, fieldGl.FLOAT, readback);
        fieldGl.bindFramebuffer(fieldGl.FRAMEBUFFER, null);
        const diagnosticError = Math.max(
          Math.abs(readback[0] + 0.375), Math.abs(readback[1] - 1),
          Math.abs(readback[2]), Math.abs(readback[3] - 1),
        );
        return {
          available: candidate.id !== "rgba8-diagnostic",
          diagnosticAvailable: true,
          id: candidate.id,
          type: candidate.type,
          texture,
          framebuffer,
          version,
          extensions: { float: Boolean(floatExtension), half: Boolean(halfFloatExtension),
            colorFloat: Boolean(colorFloatExtension), colorHalf: Boolean(colorHalfFloatExtension) },
          width: 2,
          height: 2,
          program,
          buffer,
          diagnosticError,
          channelSemantics: "r=signed-raw,g=ordinary-availability,b=source-mask-or-unavailable,a=initialized",
        };
      }
      fieldGl.deleteFramebuffer(framebuffer);
      fieldGl.deleteTexture(texture);
    }
    return Object.freeze({ available: false, reason: "no-renderable-scalar-color-attachment", version });
  }

  function resizeTopoScalarFramebuffer(resources, width, height) {
    if (!resources?.texture || resources.width === width && resources.height === height) return;
    fieldGl.bindTexture(fieldGl.TEXTURE_2D, resources.texture);
    fieldGl.texImage2D(fieldGl.TEXTURE_2D, 0, fieldGl.RGBA, width, height, 0,
      fieldGl.RGBA, resources.type, null);
    resources.width = width;
    resources.height = height;
  }

  const topoScalarFramebuffer = createTopoScalarFramebufferResources();
  dom.app.dataset.binaryScalarFramebuffer = topoScalarFramebuffer.id ?? "unavailable";
  dom.app.dataset.binaryScalarFramebufferReason = topoScalarFramebuffer.available
    ? "renderable-nearest-scalar-target" : topoScalarFramebuffer.reason ??
      "precision-path-not-accepted";
  dom.app.dataset.binaryScalarFramebufferVersion = topoScalarFramebuffer.version ?? "unavailable";
  dom.app.dataset.binaryScalarFramebufferPrecisionError = Number.isFinite(
    topoScalarFramebuffer.diagnosticError,
  ) ? topoScalarFramebuffer.diagnosticError.toExponential(3) : "unavailable";
  dom.app.dataset.binaryScalarFramebufferChannels = topoScalarFramebuffer.channelSemantics ?? "unavailable";

  function createTopoPassTwoDiagnosticTarget() {
    if (!fieldGl) return Object.freeze({ available: false, reason: "webgl-unavailable" });
    const texture = fieldGl.createTexture();
    const framebuffer = fieldGl.createFramebuffer();
    if (!texture || !framebuffer) {
      return Object.freeze({ available: false, reason: "diagnostic-target-allocation-failed" });
    }
    fieldGl.bindTexture(fieldGl.TEXTURE_2D, texture);
    fieldGl.texParameteri(fieldGl.TEXTURE_2D, fieldGl.TEXTURE_MIN_FILTER, fieldGl.NEAREST);
    fieldGl.texParameteri(fieldGl.TEXTURE_2D, fieldGl.TEXTURE_MAG_FILTER, fieldGl.NEAREST);
    fieldGl.texParameteri(fieldGl.TEXTURE_2D, fieldGl.TEXTURE_WRAP_S, fieldGl.CLAMP_TO_EDGE);
    fieldGl.texParameteri(fieldGl.TEXTURE_2D, fieldGl.TEXTURE_WRAP_T, fieldGl.CLAMP_TO_EDGE);
    fieldGl.texImage2D(fieldGl.TEXTURE_2D, 0, fieldGl.RGBA, 2, 2, 0,
      fieldGl.RGBA, fieldGl.UNSIGNED_BYTE, null);
    fieldGl.bindFramebuffer(fieldGl.FRAMEBUFFER, framebuffer);
    fieldGl.framebufferTexture2D(fieldGl.FRAMEBUFFER, fieldGl.COLOR_ATTACHMENT0,
      fieldGl.TEXTURE_2D, texture, 0);
    const status = fieldGl.checkFramebufferStatus(fieldGl.FRAMEBUFFER);
    const complete = status === fieldGl.FRAMEBUFFER_COMPLETE;
    fieldGl.bindFramebuffer(fieldGl.FRAMEBUFFER, null);
    if (!complete) {
      fieldGl.deleteFramebuffer(framebuffer);
      fieldGl.deleteTexture(texture);
      return Object.freeze({ available: false, reason: "diagnostic-target-incomplete:" + status });
    }
    return { available: true, texture, framebuffer, width: 2, height: 2 };
  }

  function resizeTopoPassTwoDiagnosticTarget(target, width, height) {
    if (!target?.texture || target.width === width && target.height === height) return;
    fieldGl.bindTexture(fieldGl.TEXTURE_2D, target.texture);
    fieldGl.texImage2D(fieldGl.TEXTURE_2D, 0, fieldGl.RGBA, width, height, 0,
      fieldGl.RGBA, fieldGl.UNSIGNED_BYTE, null);
    target.width = width;
    target.height = height;
  }

  const topoPassTwoDiagnosticTarget = createTopoPassTwoDiagnosticTarget();
  dom.app.dataset.binaryPassTwoDiagnosticTarget = topoPassTwoDiagnosticTarget.available
    ? "rgba8-mask" : topoPassTwoDiagnosticTarget.reason ?? "unavailable";

  function topoDiagnosticRasterizeSegments(segments, width, height) {
    const mask = new Uint8Array(width * height);
    for (const segment of segments) {
      let x0 = Math.round(segment.x1), y0 = Math.round(segment.y1);
      const x1 = Math.round(segment.x2), y1 = Math.round(segment.y2);
      const deltaX = Math.abs(x1 - x0), stepX = x0 < x1 ? 1 : -1;
      const deltaY = -Math.abs(y1 - y0), stepY = y0 < y1 ? 1 : -1;
      let error = deltaX + deltaY;
      while (true) {
        if (x0 >= 0 && x0 < width && y0 >= 0 && y0 < height) mask[y0 * width + x0] = 1;
        if (x0 === x1 && y0 === y1) break;
        const twice = 2 * error;
        if (twice >= deltaY) { error += deltaY; x0 += stepX; }
        if (twice <= deltaX) { error += deltaX; y0 += stepY; }
      }
    }
    return mask;
  }

  function topoDiagnosticExcludeInvalidStencil(mask, sampleStates, width, height) {
    const filtered = new Uint8Array(mask);
    for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
      const index = y * width + x;
      if (x === 0 || y === 0 || x === width - 1 || y === height - 1 ||
          [index, index - 1, index + 1, index - width, index + width].some((entry) =>
            sampleStates[entry] !== TOPO_SAMPLED_FIELD_STATE.VALID)) filtered[index] = 0;
    }
    return filtered;
  }

  function topoDiagnosticComponentCount(mask, width, height) {
    const seen = new Uint8Array(mask.length);
    let count = 0;
    for (let start = 0; start < mask.length; start += 1) {
      if (!mask[start] || seen[start]) continue;
      count += 1;
      const queue = [start];
      seen[start] = 1;
      while (queue.length) {
        const index = queue.pop();
        const x = index % width, y = Math.floor(index / width);
        for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
          for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
            const nextX = x + offsetX, nextY = y + offsetY;
            const next = nextY * width + nextX;
            if (nextX >= 0 && nextX < width && nextY >= 0 && nextY < height &&
                mask[next] && !seen[next]) { seen[next] = 1; queue.push(next); }
          }
        }
      }
    }
    return count;
  }

  function topoDiagnosticDistanceSummary(leftMask, rightMask, width) {
    const points = (mask) => Array.from(mask, (value, index) => value ? {
      x: index % width, y: Math.floor(index / width),
    } : null).filter(Boolean);
    const nearest = (from, to) => from.map((point) => to.reduce((best, candidate) =>
      Math.min(best, Math.hypot(point.x - candidate.x, point.y - candidate.y)), Infinity));
    const distances = [...nearest(points(leftMask), points(rightMask)),
      ...nearest(points(rightMask), points(leftMask))].sort((left, right) => left - right);
    return {
      p95: distances[Math.floor(0.95 * Math.max(0, distances.length - 1))] ?? Infinity,
      max: distances.at(-1) ?? Infinity,
    };
  }

  function createTopoPassTwoDiagnosticProgram() {
    if (!fieldGl || !topoScalarFramebuffer.available) return null;
    // Keep the diagnostic shader tied to the same exported marching-squares
    // contract as CPU extraction. GLSL cannot import the object directly, so
    // this checked source marker makes its ordering and ambiguous cases explicit.
    const marchingSquaresContractSource = `
      // contract corners: ${TOPO_MARCHING_SQUARES_GLSL_CONTRACT.cornerOrder.join(",")}
      // contract edges: ${TOPO_MARCHING_SQUARES_GLSL_CONTRACT.edgeOrder.join(",")}
      // contract ambiguous cases: ${TOPO_MARCHING_SQUARES_GLSL_CONTRACT.ambiguousCases.join(",")}
    `;
    const vertex = compileFieldShader(fieldGl.VERTEX_SHADER, `
      attribute vec2 a_position;
      void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
    `);
    const fragment = compileFieldShader(fieldGl.FRAGMENT_SHADER, `
      precision highp float;
      uniform sampler2D u_scalar_texture;
      uniform vec2 u_scalar_resolution;
      uniform float u_threshold;
      uniform float u_line_half_width;
      uniform float u_ambiguous_parity;
      ${marchingSquaresContractSource}
      vec4 scalarAt(vec2 pixel) {
        return texture2D(u_scalar_texture, (pixel + vec2(0.5)) / u_scalar_resolution);
      }
      float pointSegmentDistance(vec2 point, vec2 a, vec2 b) {
        vec2 ab = b - a;
        float amount = dot(point - a, ab) / max(dot(ab, ab), 1.0e-12);
        return length(point - (a + clamp(amount, 0.0, 1.0) * ab));
      }
      float edgeInterpolation(float startValue, float endValue) {
        float denominator = endValue - startValue;
        return abs(denominator) <= 1.0e-12 ? 0.5 :
          clamp((u_threshold - startValue) / denominator, 0.0, 1.0);
      }
      float contourDistanceForCell(vec2 cell, vec2 point) {
        if (cell.x < 0.0 || cell.y < 0.0 ||
            cell.x >= u_scalar_resolution.x - 1.0 ||
            cell.y >= u_scalar_resolution.y - 1.0) return 1.0e6;
        vec4 a = scalarAt(cell);
        vec4 b = scalarAt(cell + vec2(1.0, 0.0));
        vec4 c = scalarAt(cell + vec2(1.0, 1.0));
        vec4 d = scalarAt(cell + vec2(0.0, 1.0));
        if (a.g < 0.5 || b.g < 0.5 || c.g < 0.5 || d.g < 0.5) {
          return 1.0e6;
        }
        int caseIndex = (a.r >= u_threshold ? 1 : 0) + (b.r >= u_threshold ? 2 : 0) +
          (c.r >= u_threshold ? 4 : 0) + (d.r >= u_threshold ? 8 : 0);
        // CPU contract: cases 1/14,2/13,3/12,4/11,6/9,7/8 and determinant-decided 5/10.
        if (caseIndex == 0 || caseIndex == 15) return 1.0e6;
        float determinant = (a.r-u_threshold)*(c.r-u_threshold) -
          (b.r-u_threshold)*(d.r-u_threshold);
        bool positiveDiagonal = determinant > 0.0 ||
          (determinant == 0.0 && mod(cell.x + cell.y + u_ambiguous_parity, 2.0) < 0.5);
        vec2 p = point - cell;
        vec2 e0 = vec2(edgeInterpolation(a.r, b.r), 0.0);
        vec2 e1 = vec2(1.0, edgeInterpolation(b.r, c.r));
        vec2 e2 = vec2(1.0 - edgeInterpolation(c.r, d.r), 1.0);
        vec2 e3 = vec2(0.0, 1.0 - edgeInterpolation(d.r, a.r));
        float distance = 1.0e6;
        if (caseIndex == 1 || caseIndex == 14) distance = pointSegmentDistance(p,e3,e0);
        else if (caseIndex == 2 || caseIndex == 13) distance = pointSegmentDistance(p,e0,e1);
        else if (caseIndex == 3 || caseIndex == 12) distance = pointSegmentDistance(p,e3,e1);
        else if (caseIndex == 4 || caseIndex == 11) distance = pointSegmentDistance(p,e1,e2);
        else if (caseIndex == 6 || caseIndex == 9) distance = pointSegmentDistance(p,e0,e2);
        else if (caseIndex == 7 || caseIndex == 8) distance = pointSegmentDistance(p,e3,e2);
        else if (caseIndex == 5 || caseIndex == 10) {
          if (positiveDiagonal) distance = min(pointSegmentDistance(p,e0,e1),pointSegmentDistance(p,e2,e3));
          else distance = min(pointSegmentDistance(p,e3,e0),pointSegmentDistance(p,e1,e2));
        }
        return distance;
      }
      void main() {
        vec2 point = gl_FragCoord.xy;
        vec2 baseCell = floor(point);
        // A contour never paints over an unavailable scalar sample, even when
        // an adjacent fully ordinary cell contributes a nearby segment.
        if (scalarAt(baseCell).g < 0.5) { gl_FragColor = vec4(0.0); return; }
        // A segment may lie in either adjacent cell of a pixel center. Evaluate
        // that exact four-cell neighborhood, never a gradient band.
        float distance = min(
          min(contourDistanceForCell(baseCell + vec2(-1.0, -1.0), point),
              contourDistanceForCell(baseCell + vec2(0.0, -1.0), point)),
          min(contourDistanceForCell(baseCell + vec2(-1.0, 0.0), point),
              contourDistanceForCell(baseCell, point))
        );
        gl_FragColor = distance <= u_line_half_width ? vec4(1.0) : vec4(0.0);
      }
    `);
    const program = fieldGl.createProgram();
    try {
      fieldGl.attachShader(program, vertex); fieldGl.attachShader(program, fragment); fieldGl.linkProgram(program);
      if (!fieldGl.getProgramParameter(program, fieldGl.LINK_STATUS)) {
        throw new Error(fieldGl.getProgramInfoLog(program));
      }
      return program;
    } catch (error) {
      fieldGl.deleteProgram(program);
      throw error;
    } finally {
      fieldGl.deleteShader(vertex);
      fieldGl.deleteShader(fragment);
    }
  }
  let topoPassTwoDiagnosticProgram = null;
  try { topoPassTwoDiagnosticProgram = createTopoPassTwoDiagnosticProgram();
    dom.app.dataset.binaryPassTwoDiagnostic = topoPassTwoDiagnosticProgram ? "compiled" : "unavailable";
  } catch (error) { dom.app.dataset.binaryPassTwoDiagnostic = "failed";
    dom.app.dataset.binaryPassTwoDiagnosticError = String(error?.message ?? error); }
  const topoPassTwoDiagnosticBindings = topoPassTwoDiagnosticProgram
    ? Object.freeze({
      position: fieldGl.getAttribLocation(topoPassTwoDiagnosticProgram, "a_position"),
      scalarTexture: fieldGl.getUniformLocation(topoPassTwoDiagnosticProgram, "u_scalar_texture"),
      scalarResolution: fieldGl.getUniformLocation(topoPassTwoDiagnosticProgram, "u_scalar_resolution"),
      threshold: fieldGl.getUniformLocation(topoPassTwoDiagnosticProgram, "u_threshold"),
      lineHalfWidth: fieldGl.getUniformLocation(topoPassTwoDiagnosticProgram, "u_line_half_width"),
      ambiguousParity: fieldGl.getUniformLocation(topoPassTwoDiagnosticProgram, "u_ambiguous_parity"),
    }) : null;

  function createTopoPassTwoDiagnosticScalarGrid(scalarReadback, width, height) {
    const raw = new Float32Array(width * height);
    const states = new Uint8Array(width * height);
    for (let index = 0; index < raw.length; index += 1) {
      raw[index] = scalarReadback[index * 4];
      states[index] = scalarReadback[index * 4 + 1] > 0.5
        ? TOPO_SAMPLED_FIELD_STATE.VALID
        : TOPO_SAMPLED_FIELD_STATE.MASKED;
    }
    return Object.freeze({ raw, states });
  }

  function drawTopoPassTwoDiagnostic({ width, height, threshold, scalarGrid }) {
    if (!topoPassTwoDiagnosticProgram || !topoPassTwoDiagnosticBindings ||
        !topoScalarFramebuffer.available || !topoPassTwoDiagnosticTarget.available) {
      throw new Error("Wake Topography pass-two diagnostic resources are unavailable.");
    }
    const savedFramebuffer = fieldGl.getParameter(fieldGl.FRAMEBUFFER_BINDING);
    const savedViewport = fieldGl.getParameter(fieldGl.VIEWPORT);
    const savedProgram = fieldGl.getParameter(fieldGl.CURRENT_PROGRAM);
    const savedArrayBuffer = fieldGl.getParameter(fieldGl.ARRAY_BUFFER_BINDING);
    const savedActiveTexture = fieldGl.getParameter(fieldGl.ACTIVE_TEXTURE);
    fieldGl.activeTexture(fieldGl.TEXTURE0);
    const savedTexture0 = fieldGl.getParameter(fieldGl.TEXTURE_BINDING_2D);
    try {
      resizeTopoPassTwoDiagnosticTarget(topoPassTwoDiagnosticTarget, width, height);
      fieldGl.bindFramebuffer(fieldGl.FRAMEBUFFER, topoPassTwoDiagnosticTarget.framebuffer);
      fieldGl.viewport(0, 0, width, height);
      fieldGl.useProgram(topoPassTwoDiagnosticProgram);
      fieldGl.bindBuffer(fieldGl.ARRAY_BUFFER, topoScalarFramebuffer.buffer);
      fieldGl.enableVertexAttribArray(topoPassTwoDiagnosticBindings.position);
      fieldGl.vertexAttribPointer(topoPassTwoDiagnosticBindings.position, 2,
        fieldGl.FLOAT, false, 0, 0);
      fieldGl.activeTexture(fieldGl.TEXTURE0);
      fieldGl.bindTexture(fieldGl.TEXTURE_2D, topoScalarFramebuffer.texture);
      fieldGl.uniform1i(topoPassTwoDiagnosticBindings.scalarTexture, 0);
      fieldGl.uniform2f(topoPassTwoDiagnosticBindings.scalarResolution, width, height);
      fieldGl.uniform1f(topoPassTwoDiagnosticBindings.threshold, threshold.value);
      const lineHalfWidth = 0.5;
      fieldGl.uniform1f(topoPassTwoDiagnosticBindings.lineHalfWidth, lineHalfWidth);
      fieldGl.uniform1f(topoPassTwoDiagnosticBindings.ambiguousParity,
        topoMarchingSquaresLevelIdentity(threshold.value) % 2);
      fieldGl.drawArrays(fieldGl.TRIANGLES, 0, 3);
      const raster = new Uint8Array(width * height * 4);
      fieldGl.readPixels(0, 0, width, height, fieldGl.RGBA, fieldGl.UNSIGNED_BYTE, raster);
      const gpuMask = new Uint8Array(width * height);
      for (let index = 0; index < gpuMask.length; index += 1) {
        gpuMask[index] = raster[index * 4] > 127 ? 1 : 0;
      }
      const extraction = extractTopoSampledFieldContourSegments({
        raw: scalarGrid.raw, sampleStates: scalarGrid.states, width, height, levels: [threshold],
      });
      const cpuMask = topoDiagnosticExcludeInvalidStencil(
        topoDiagnosticRasterizeSegments(extraction.segments, width, height),
        scalarGrid.states, width, height,
      );
      const filteredGpuMask = new Uint8Array(gpuMask.length);
      for (let index = 0; index < gpuMask.length; index += 1) {
        filteredGpuMask[index] = gpuMask[index] &&
          scalarGrid.states[index] === TOPO_SAMPLED_FIELD_STATE.VALID ? 1 : 0;
      }
      const rasterDistance = topoDiagnosticDistanceSummary(cpuMask, filteredGpuMask, width);
      const centerlineDistance = topoMarchingSquaresScreenSpaceCenterlineDistance({
        segments: extraction.segments, mask: filteredGpuMask, width, lineHalfWidth,
      });
      return Object.freeze({
        raster,
        cpuPathComponents: connectTopoSampledFieldContourSegments(extraction.segments).length,
        gpuMaskComponents: topoDiagnosticComponentCount(filteredGpuMask, width, height),
        cpuRasterComponents: topoDiagnosticComponentCount(cpuMask, width, height),
        p95: centerlineDistance.p95,
        max: centerlineDistance.max,
        rawP95: rasterDistance.p95,
        rawMax: rasterDistance.max,
        invalidBridgePixels: gpuMask.reduce((count, value, index) =>
          count + (value && scalarGrid.states[index] !== TOPO_SAMPLED_FIELD_STATE.VALID ? 1 : 0), 0),
      });
    } finally {
      fieldGl.activeTexture(fieldGl.TEXTURE0);
      fieldGl.bindTexture(fieldGl.TEXTURE_2D, savedTexture0);
      fieldGl.activeTexture(savedActiveTexture);
      fieldGl.bindBuffer(fieldGl.ARRAY_BUFFER, savedArrayBuffer);
      fieldGl.useProgram(savedProgram);
      fieldGl.bindFramebuffer(fieldGl.FRAMEBUFFER, savedFramebuffer);
      fieldGl.viewport(savedViewport[0], savedViewport[1], savedViewport[2], savedViewport[3]);
    }
  }

  function compileFieldShader(shaderType, source) {
    const shader = fieldGl.createShader(shaderType);
    fieldGl.shaderSource(shader, source);
    fieldGl.compileShader(shader);
    if (!fieldGl.getShaderParameter(shader, fieldGl.COMPILE_STATUS)) {
      throw new Error(
        "Wake Topography analytic field shader failed: " + fieldGl.getShaderInfoLog(shader),
      );
    }
    return shader;
  }

  function createAnalyticFieldRenderer() {
    if (!fieldGl) {
      return null;
    }
    const vertexShader = compileFieldShader(fieldGl.VERTEX_SHADER, `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `);
    const fragmentShader = compileFieldShader(fieldGl.FRAGMENT_SHADER, `
      precision highp float;
      uniform vec2 u_size;
      uniform float u_display_scale;
      uniform vec2 u_viewport_center;
      uniform vec2 u_canvas_anchor;
      uniform float u_beta;
      uniform float u_pair_mode;
      uniform float u_pair_time;
      uniform float u_electrino_x;
      uniform float u_positrino_x;
      uniform float u_partner_source_sign;
      uniform float u_superposition_view;
      uniform float u_source_mask_radius;
      uniform float u_polarity_sign;
      uniform float u_shading_reach_scale;
      uniform vec3 u_zero;
      uniform vec3 u_negative;
      uniform vec3 u_positive;

      float sourceContribution(
        vec2 worldPoint,
        float sourceX,
        float velocityBeta,
        float polaritySign,
        float historyAge,
        float stationaryPrehistory
      ) {
        vec2 offset = worldPoint - vec2(sourceX, 0.5);
        float radiusSquared = dot(offset, offset);
        if (radiusSquared <= 0.000000000001) {
          return polaritySign * 64.0;
        }
        float causalDelay = -1.0;
        if (abs(velocityBeta) >= 0.999999) {
          if (velocityBeta * offset.x < 0.0) {
            causalDelay = -radiusSquared / (2.0 * velocityBeta * offset.x);
          }
        } else {
          float lambda = sqrt(
            offset.x * offset.x +
            (1.0 - velocityBeta * velocityBeta) * offset.y * offset.y
          );
          causalDelay = radiusSquared / (lambda - velocityBeta * offset.x);
        }
        if (stationaryPrehistory > 0.5 &&
            (causalDelay <= 0.0 || causalDelay > historyAge)) {
          float launchX = sourceX - velocityBeta * historyAge;
          float prehistoryDelay = distance(
            worldPoint,
            vec2(launchX, 0.5)
          );
          causalDelay = prehistoryDelay + 0.000001 >= historyAge
            ? prehistoryDelay
            : -1.0;
        }
        if (causalDelay <= 0.0) {
          return 0.0;
        }
        float magnitude = ${TOPO_INVERSE_SQUARE_SCALE.toPrecision(12)} /
          max(causalDelay * causalDelay, 0.000000000001);
        return polaritySign * magnitude;
      }

      void main() {
        float commonScale = max(1.0, u_size.y - 1.0) * u_display_scale;
        vec2 pixel = gl_FragCoord.xy - vec2(0.5);
        vec2 anchorPixel = u_canvas_anchor * vec2(
          max(1.0, u_size.x - 1.0),
          max(1.0, u_size.y - 1.0)
        );
        vec2 worldPoint = u_viewport_center +
          (pixel - anchorPixel) / commonScale;
        bool electrinoMasked = distance(
          worldPoint,
          vec2(u_electrino_x, 0.5)
        ) <= u_source_mask_radius;
        bool positrinoMasked = distance(
          worldPoint,
          vec2(u_positrino_x, 0.5)
        ) <= u_source_mask_radius;
        bool sourceMasked = u_pair_mode > 0.5
          ? (u_superposition_view > 0.5
            ? electrinoMasked || positrinoMasked
            : (u_partner_source_sign < 0.0
              ? electrinoMasked
              : positrinoMasked))
          : distance(worldPoint, vec2(2.0 / 3.0, 0.5)) <= u_source_mask_radius;
        if (sourceMasked) {
          gl_FragColor = vec4(u_zero, 1.0);
          return;
        }
        float rawValue;
        if (u_pair_mode > 0.5) {
          rawValue = u_superposition_view > 0.5
            ? sourceContribution(
                worldPoint,
                u_electrino_x,
                u_beta,
                -1.0,
                u_pair_time,
                1.0
              ) + sourceContribution(
                worldPoint,
                u_positrino_x,
                -u_beta,
                1.0,
                u_pair_time,
                1.0
              )
            : u_partner_source_sign < 0.0
            ? sourceContribution(
                worldPoint,
                u_electrino_x,
                u_beta,
                -1.0,
                u_pair_time,
                1.0
              )
            : sourceContribution(
                worldPoint,
                u_positrino_x,
                -u_beta,
                1.0,
                u_pair_time,
                1.0
              );
        } else {
          rawValue = sourceContribution(
            worldPoint,
            2.0 / 3.0,
            u_beta,
            u_polarity_sign,
            0.0,
            0.0
          );
        }
        float rootMagnitude = sqrt(abs(rawValue)) * u_shading_reach_scale;
        float strength = rootMagnitude /
          (rootMagnitude + sqrt(${TOPO_REFERENCE_WAKE_MAGNITUDE.toPrecision(12)}));
        float normalized = sign(rawValue) * strength;
        vec3 endpoint = normalized < 0.0 ? u_negative : u_positive;
        vec3 color = mix(u_zero, endpoint, clamp(abs(normalized), 0.0, 1.0));
        gl_FragColor = vec4(color, 1.0);
      }
    `);
    const program = fieldGl.createProgram();
    fieldGl.attachShader(program, vertexShader);
    fieldGl.attachShader(program, fragmentShader);
    fieldGl.linkProgram(program);
    if (!fieldGl.getProgramParameter(program, fieldGl.LINK_STATUS)) {
      throw new Error(
        "Wake Topography analytic field program failed: " + fieldGl.getProgramInfoLog(program),
      );
    }
    const buffer = fieldGl.createBuffer();
    fieldGl.bindBuffer(fieldGl.ARRAY_BUFFER, buffer);
    fieldGl.bufferData(
      fieldGl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      fieldGl.STATIC_DRAW,
    );
    return {
      program,
      position: fieldGl.getAttribLocation(program, "a_position"),
      uniforms: Object.fromEntries([
        "u_size",
        "u_display_scale",
        "u_viewport_center",
        "u_canvas_anchor",
        "u_beta",
        "u_pair_mode",
        "u_pair_time",
        "u_electrino_x",
        "u_positrino_x",
        "u_partner_source_sign",
        "u_superposition_view",
        "u_source_mask_radius",
        "u_polarity_sign",
        "u_shading_reach_scale",
        "u_zero",
        "u_negative",
        "u_positive",
      ].map((name) => [name, fieldGl.getUniformLocation(program, name)])),
    };
  }

  function createCircularBinaryFieldRenderer() {
    if (!fieldGl) {
      return null;
    }
    const vertexShader = compileFieldShader(fieldGl.VERTEX_SHADER, `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `);
    const fragmentShader = compileFieldShader(fieldGl.FRAGMENT_SHADER, `
      precision highp float;
      uniform vec2 u_size;
      uniform float u_display_scale;
      uniform float u_beta;
      uniform float u_time;
      uniform float u_kappa;
      uniform float u_radius;
      uniform float u_direction_sign;
      uniform float u_partner_source_sign;
      uniform float u_superposition_view;
      uniform float u_source_mask_radius;
      uniform float u_shading_reach_scale;
      uniform vec3 u_negative;
      uniform vec3 u_zero;
      uniform vec3 u_positive;
      uniform float u_contour_levels[25];
      uniform float u_contour_count;
      uniform float u_contour_visibility;
      uniform float u_scalar_pass;

      vec2 sourcePosition(float sourcePhase, float time, float omega) {
        float phase = sourcePhase + omega * time;
        return vec2(0.5, 0.5) + u_radius * vec2(cos(phase), sin(phase));
      }

      float causalResidual(
        vec2 point,
        float sourcePhase,
        float delay,
        float omega
      ) {
        return length(point - sourcePosition(sourcePhase, u_time - delay, omega)) - delay;
      }

      float solveDelay(vec2 point, float sourcePhase, float omega) {
        float currentDistance = length(
          point - sourcePosition(sourcePhase, u_time, omega)
        );
        if (currentDistance <= u_source_mask_radius) {
          return 0.0;
        }
        float endResidual = causalResidual(point, sourcePhase, u_time, omega);
        if (endResidual > 0.0) {
          return -1.0;
        }
        float low = 0.0;
        float high = u_time;
        for (int iteration = 0; iteration < 56; iteration += 1) {
          float mid = 0.5 * (low + high);
          float residual = causalResidual(point, sourcePhase, mid, omega);
          if (residual > 0.0) {
            low = mid;
          } else {
            high = mid;
          }
        }
        float delay = 0.5 * (low + high);
        return abs(causalResidual(point, sourcePhase, delay, omega)) <= 0.00001
          ? delay
          : -1.0;
      }

      float sourceRawAt(vec2 point, float omega, float sourceSign) {
        float sourcePhase = sourceSign < 0.0
          ? 3.141592653589793
          : 0.0;
        float delay = solveDelay(point, sourcePhase, omega);
        if (delay <= 0.0) return 1.0e30;
        return sourceSign * u_kappa / (delay * delay);
      }

      float rawAt(vec2 point, float omega) {
        if (u_superposition_view > 0.5) {
          float negativeRaw = sourceRawAt(point, omega, -1.0);
          float positiveRaw = sourceRawAt(point, omega, 1.0);
          if (abs(negativeRaw) >= 1.0e20 || abs(positiveRaw) >= 1.0e20) {
            return 1.0e30;
          }
          return negativeRaw + positiveRaw;
        }
        return sourceRawAt(point, omega, u_partner_source_sign);
      }

      void main() {
        float worldScale = max(1.0, u_size.x - 1.0) * u_display_scale;
        vec2 pixel = gl_FragCoord.xy - vec2(0.5);
        vec2 point = vec2(
          0.5 +
            (pixel.x - 0.5 * max(1.0, u_size.x - 1.0)) / worldScale,
          0.5 + (pixel.y - 0.5 * max(1.0, u_size.y - 1.0)) / worldScale
        );
        float omega = u_direction_sign * u_beta / u_radius;
        float negativeDelay = solveDelay(
          point,
          3.141592653589793,
          omega
        );
        float positiveDelay = solveDelay(point, 0.0, omega);
        float selectedDelay = u_partner_source_sign < 0.0
          ? negativeDelay
          : positiveDelay;
        bool sourceMasked = u_superposition_view > 0.5
          ? negativeDelay == 0.0 || positiveDelay == 0.0
          : selectedDelay == 0.0;
        float maskedSourceSign = negativeDelay == 0.0 ? -1.0 : 1.0;
        if (sourceMasked) {
          if (u_scalar_pass > 0.5) {
            gl_FragColor = vec4(0.0, 0.0, maskedSourceSign, 1.0);
            return;
          }
          gl_FragColor = vec4(
            maskedSourceSign < 0.0 ? u_negative : u_positive,
            1.0
          );
          return;
        }
        bool unavailable = u_superposition_view > 0.5
          ? negativeDelay < 0.0 || positiveDelay < 0.0
          : selectedDelay < 0.0;
        if (unavailable) {
          if (u_scalar_pass > 0.5) { gl_FragColor = vec4(0.0, 0.0, 2.0, 1.0); return; }
          gl_FragColor = vec4(u_zero, 1.0);
          return;
        }
        float rawValue = u_superposition_view > 0.5
          ? -u_kappa / (negativeDelay * negativeDelay) +
            u_kappa / (positiveDelay * positiveDelay)
          : u_partner_source_sign * u_kappa / (selectedDelay * selectedDelay);
        if (u_scalar_pass > 0.5) {
          gl_FragColor = vec4(rawValue, 1.0, 0.0, 1.0);
          return;
        }
        float exponent = log(abs(rawValue) /
          ${TOPO_REFERENCE_WAKE_MAGNITUDE.toPrecision(12)}) / log(10.0);
        float rootMagnitude = sqrt(abs(rawValue)) * u_shading_reach_scale;
        float strength = rootMagnitude /
          (rootMagnitude + sqrt(${TOPO_REFERENCE_WAKE_MAGNITUDE.toPrecision(12)}));
        float normalized = sign(rawValue) * strength;
        vec3 endpoint = normalized < 0.0 ? u_negative : u_positive;
        vec3 color = mix(u_zero, endpoint, abs(normalized));
        float levelExponent = exponent;
        float pixelWorld = 1.0 / worldScale;
        float rawLeft = rawAt(point - vec2(pixelWorld, 0.0), omega);
        float rawRight = rawAt(point + vec2(pixelWorld, 0.0), omega);
        float rawDown = rawAt(point - vec2(0.0, pixelWorld), omega);
        float rawUp = rawAt(point + vec2(0.0, pixelWorld), omega);
        bool validNeighbors = abs(rawLeft) < 1.0e20 && abs(rawRight) < 1.0e20 &&
          abs(rawDown) < 1.0e20 && abs(rawUp) < 1.0e20;
        float exponentLeft = log(max(abs(rawLeft), 1.0e-30) / 64.0) / log(10.0);
        float exponentRight = log(max(abs(rawRight), 1.0e-30) / 64.0) / log(10.0);
        float exponentDown = log(max(abs(rawDown), 1.0e-30) / 64.0) / log(10.0);
        float exponentUp = log(max(abs(rawUp), 1.0e-30) / 64.0) / log(10.0);
        float pixelBand = clamp(${TOPO_GPU_CONTOUR_BAND_SCALE} * (
          abs(exponentRight - exponentLeft) + abs(exponentUp - exponentDown)
        ), ${TOPO_GPU_CONTOUR_BAND_MIN}, ${TOPO_GPU_CONTOUR_BAND_MAX});
        float minimumExponent = min(levelExponent, min(exponentLeft,
          min(exponentRight, min(exponentDown, exponentUp))));
        float maximumExponent = max(levelExponent, max(exponentLeft,
          max(exponentRight, max(exponentDown, exponentUp))));
        bool sameSignStencil = rawValue * rawLeft > 0.0 && rawValue * rawRight > 0.0 &&
          rawValue * rawDown > 0.0 && rawValue * rawUp > 0.0;
        float contourAlpha = 0.0;
        for (int levelIndex = 0; levelIndex < 25; levelIndex += 1) {
          if (float(levelIndex) >= u_contour_count) break;
          float contourLevel = u_contour_levels[levelIndex];
          if (sameSignStencil && contourLevel >= minimumExponent && contourLevel <= maximumExponent) {
            float distanceToLevel = abs(levelExponent - contourLevel);
            contourAlpha = max(contourAlpha, 1.0 - smoothstep(
              0.45 * pixelBand, 1.35 * pixelBand, distanceToLevel
            ));
          }
        }
        float zeroBand = max(0.000001, 0.5 * (
          abs(rawRight - rawLeft) + abs(rawUp - rawDown)
        ));
        float zeroAlpha = 1.0 - smoothstep(0.35 * zeroBand, 1.1 * zeroBand, abs(rawValue));
        vec3 contourColor = rawValue < 0.0 ? u_negative : u_positive;
        contourColor = mix(contourColor, u_zero, zeroAlpha);
        float alpha = validNeighbors
          ? max(contourAlpha, zeroAlpha) * u_contour_visibility
          : 0.0;
        gl_FragColor = vec4(mix(color, contourColor, alpha), 1.0);
      }
    `);
    const program = fieldGl.createProgram();
    fieldGl.attachShader(program, vertexShader);
    fieldGl.attachShader(program, fragmentShader);
    fieldGl.linkProgram(program);
    if (!fieldGl.getProgramParameter(program, fieldGl.LINK_STATUS)) {
      throw new Error(
        "Wake Topography circular-binary field program failed: " +
        fieldGl.getProgramInfoLog(program),
      );
    }
    const buffer = fieldGl.createBuffer();
    fieldGl.bindBuffer(fieldGl.ARRAY_BUFFER, buffer);
    fieldGl.bufferData(
      fieldGl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      fieldGl.STATIC_DRAW,
    );
    return {
      program,
      buffer,
      position: fieldGl.getAttribLocation(program, "a_position"),
      uniforms: Object.fromEntries([
        "u_size",
        "u_display_scale",
        "u_beta",
        "u_time",
        "u_kappa",
        "u_radius",
        "u_direction_sign",
        "u_partner_source_sign",
        "u_superposition_view",
        "u_source_mask_radius",
        "u_shading_reach_scale",
        "u_negative",
        "u_zero",
        "u_positive",
        "u_contour_levels[0]",
        "u_contour_count",
        "u_contour_visibility",
        "u_scalar_pass",
      ].map((name) => [name, fieldGl.getUniformLocation(program, name)])),
    };
  }

  function createCircularBinaryScalarPresentationRenderer() {
    if (!fieldGl || !topoScalarFramebuffer.available) return null;
    const vertex = compileFieldShader(fieldGl.VERTEX_SHADER, `
      attribute vec2 a_position;
      void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
    `);
    const fragment = compileFieldShader(fieldGl.FRAGMENT_SHADER, `
      precision highp float;
      uniform sampler2D u_scalar_texture;
      uniform vec2 u_scalar_resolution;
      uniform float u_shading_reach_scale;
      uniform vec3 u_negative;
      uniform vec3 u_zero;
      uniform vec3 u_positive;
      uniform float u_contour_values[${TOPO_BINARY_GPU_CONTOUR_MAX_LEVELS}];
      uniform float u_contour_opacities[${TOPO_BINARY_GPU_CONTOUR_MAX_LEVELS}];
      uniform float u_contour_half_widths[${TOPO_BINARY_GPU_CONTOUR_MAX_LEVELS}];
      uniform float u_contour_parities[${TOPO_BINARY_GPU_CONTOUR_MAX_LEVELS}];
      uniform float u_contour_count;
      vec4 scalarAt(vec2 pixel) {
        return texture2D(u_scalar_texture, (pixel + vec2(0.5)) / u_scalar_resolution);
      }
      float pointSegmentDistance(vec2 point, vec2 a, vec2 b) {
        vec2 delta = b - a;
        float amount = dot(point - a, delta) / max(dot(delta, delta), 1.0e-12);
        return length(point - (a + clamp(amount, 0.0, 1.0) * delta));
      }
      float interpolation(float startValue, float endValue, float threshold) {
        float denominator = endValue - startValue;
        return abs(denominator) <= 1.0e-12 ? 0.5 :
          clamp((threshold - startValue) / denominator, 0.0, 1.0);
      }
      float distanceForCell(vec2 cell, vec2 point, float threshold, float levelParity) {
        if (cell.x < 0.0 || cell.y < 0.0 ||
            cell.x >= u_scalar_resolution.x - 1.0 || cell.y >= u_scalar_resolution.y - 1.0) return 1.0e6;
        vec4 a = scalarAt(cell);
        vec4 b = scalarAt(cell + vec2(1.0, 0.0));
        vec4 c = scalarAt(cell + vec2(1.0, 1.0));
        vec4 d = scalarAt(cell + vec2(0.0, 1.0));
        if (a.g < 0.5 || b.g < 0.5 || c.g < 0.5 || d.g < 0.5) return 1.0e6;
        int caseIndex = (a.r >= threshold ? 1 : 0) + (b.r >= threshold ? 2 : 0) +
          (c.r >= threshold ? 4 : 0) + (d.r >= threshold ? 8 : 0);
        if (caseIndex == 0 || caseIndex == 15) return 1.0e6;
        vec2 p = point - cell;
        vec2 e0 = vec2(interpolation(a.r, b.r, threshold), 0.0);
        vec2 e1 = vec2(1.0, interpolation(b.r, c.r, threshold));
        vec2 e2 = vec2(1.0 - interpolation(c.r, d.r, threshold), 1.0);
        vec2 e3 = vec2(0.0, 1.0 - interpolation(d.r, a.r, threshold));
        if (caseIndex == 1 || caseIndex == 14) return pointSegmentDistance(p, e3, e0);
        if (caseIndex == 2 || caseIndex == 13) return pointSegmentDistance(p, e0, e1);
        if (caseIndex == 3 || caseIndex == 12) return pointSegmentDistance(p, e3, e1);
        if (caseIndex == 4 || caseIndex == 11) return pointSegmentDistance(p, e1, e2);
        if (caseIndex == 6 || caseIndex == 9) return pointSegmentDistance(p, e0, e2);
        if (caseIndex == 7 || caseIndex == 8) return pointSegmentDistance(p, e3, e2);
        float determinant = (a.r-threshold)*(c.r-threshold) - (b.r-threshold)*(d.r-threshold);
        bool positiveDiagonal = determinant > 0.0 ||
          (determinant == 0.0 && mod(cell.x + cell.y + levelParity, 2.0) < 0.5);
        return positiveDiagonal
          ? min(pointSegmentDistance(p, e0, e1), pointSegmentDistance(p, e2, e3))
          : min(pointSegmentDistance(p, e3, e0), pointSegmentDistance(p, e1, e2));
      }
      float contourDistance(vec2 point, float threshold, float levelParity) {
        vec2 cell = floor(point);
        return min(min(distanceForCell(cell + vec2(-1.0, -1.0), point, threshold, levelParity),
                           distanceForCell(cell + vec2(0.0, -1.0), point, threshold, levelParity)),
                   min(distanceForCell(cell + vec2(-1.0, 0.0), point, threshold, levelParity),
                           distanceForCell(cell, point, threshold, levelParity)));
      }
      void main() {
        vec2 point = gl_FragCoord.xy;
        vec4 scalar = scalarAt(floor(point));
        vec3 color;
        if (scalar.g < 0.5) {
          color = scalar.b < 0.0 ? u_negative : scalar.b < 1.5 ? u_positive : u_zero;
          gl_FragColor = vec4(color, 1.0); return;
        }
        float rawValue = scalar.r;
        float rootMagnitude = sqrt(abs(rawValue)) * u_shading_reach_scale;
        float strength = rootMagnitude /
          (rootMagnitude + sqrt(${TOPO_REFERENCE_WAKE_MAGNITUDE.toPrecision(12)}));
        color = mix(u_zero, rawValue < 0.0 ? u_negative : u_positive, strength);
        for (int index = 0; index < ${TOPO_BINARY_GPU_CONTOUR_MAX_LEVELS}; index += 1) {
          if (float(index) >= u_contour_count) break;
          float threshold = u_contour_values[index];
          float parity = u_contour_parities[index];
          float distance = contourDistance(point, threshold, parity);
          float halfWidth = u_contour_half_widths[index];
          // Coverage is a rasterization edge only: the centerline remains the
          // exact canonical segment.  The one-device-pixel feather removes
          // stair-step sampling without widening, joining, or moving a level.
          float coverage = 1.0 - smoothstep(max(0.0, halfWidth - 0.75),
            halfWidth + 0.75, distance);
          if (coverage > 0.0) {
            vec3 contourColor = threshold < 0.0 ? u_negative : threshold > 0.0 ? u_positive : u_zero;
            color = mix(color, contourColor, u_contour_opacities[index] * coverage);
          }
        }
        gl_FragColor = vec4(color, 1.0);
      }
    `);
    const program = fieldGl.createProgram();
    fieldGl.attachShader(program, vertex);
    fieldGl.attachShader(program, fragment);
    fieldGl.linkProgram(program);
    if (!fieldGl.getProgramParameter(program, fieldGl.LINK_STATUS)) {
      throw new Error("Wake Topography binary scalar presentation program failed: " +
        fieldGl.getProgramInfoLog(program));
    }
    const buffer = fieldGl.createBuffer();
    fieldGl.bindBuffer(fieldGl.ARRAY_BUFFER, buffer);
    fieldGl.bufferData(fieldGl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]), fieldGl.STATIC_DRAW);
    return {
      program,
      buffer,
      position: fieldGl.getAttribLocation(program, "a_position"),
      uniforms: Object.fromEntries([
        "u_scalar_texture", "u_scalar_resolution", "u_shading_reach_scale",
        "u_negative", "u_zero", "u_positive",
        "u_contour_values[0]", "u_contour_opacities[0]", "u_contour_half_widths[0]",
        "u_contour_parities[0]",
        "u_contour_count",
      ].map((name) => [name, fieldGl.getUniformLocation(program, name)])),
    };
  }

  let analyticFieldRenderer = null;
  let circularBinaryFieldRenderer = null;
  let circularBinaryScalarPresentationRenderer = null;
  try {
    analyticFieldRenderer = createAnalyticFieldRenderer();
    circularBinaryFieldRenderer = createCircularBinaryFieldRenderer();
    circularBinaryScalarPresentationRenderer = createCircularBinaryScalarPresentationRenderer();
  } catch (error) {
    dom.app.dataset.fieldRendererError = String(error?.message ?? error);
  }
  dom.app.dataset.fieldRenderer = analyticFieldRenderer && circularBinaryFieldRenderer &&
      circularBinaryScalarPresentationRenderer
    ? "webgl-analytic"
    : "cpu-reference";

  function listen(target, eventName, handler, eventOptions) {
    target.addEventListener(eventName, handler, eventOptions);
    listeners.push(() =>
      target.removeEventListener?.(eventName, handler, eventOptions));
  }

  function installPointerStageFocusHandoff(control) {
    let pointerActivation = false;
    listen(control, "pointerdown", () => {
      pointerActivation = true;
    });
    listen(control, "keydown", () => {
      pointerActivation = false;
    });
    listen(control, "pointercancel", () => {
      pointerActivation = false;
    });
    return () => {
      const handFocusToStage = pointerActivation;
      pointerActivation = false;
      if (handFocusToStage) {
        windowLike.requestAnimationFrame?.(() => {
          dom.canvas.focus?.({ preventScroll: true });
        });
      }
    };
  }

  function installRangeInteraction(input, {
    onInteractionStart = null,
    onInteractionEnd = null,
  } = {}) {
    let activePointerId = null;
    let interactionActive = false;
    function beginInteraction(kind) {
      if (interactionActive) {
        return;
      }
      interactionActive = true;
      onInteractionStart?.(kind);
    }

    function endInteraction(kind) {
      if (!interactionActive) {
        return;
      }
      interactionActive = false;
      onInteractionEnd?.(kind);
    }

    function setValue(numericValue) {
      const minimum = Number(input.min);
      const maximum = Number(input.max);
      const step = Number(input.step) || 1;
      const clamped = Math.min(maximum, Math.max(minimum, numericValue));
      const stepped = minimum + Math.round((clamped - minimum) / step) * step;
      const precision = String(step).split(".")[1]?.length ?? 0;
      const nextValue = stepped.toFixed(precision);
      if (input.value === nextValue) {
        return;
      }
      input.value = nextValue;
      input.dispatchEvent(new windowLike.Event("input", { bubbles: true }));
    }

    function setValueFromPointer(event) {
      const bounds = input.getBoundingClientRect();
      if (!bounds.width) {
        return;
      }
      const amount = Math.min(
        1,
        Math.max(0, (event.clientX - bounds.left) / bounds.width),
      );
      setValue(Number(input.min) + amount * (Number(input.max) - Number(input.min)));
    }

    listen(input, "pointerdown", (event) => {
      if (event.button !== 0 || event.isPrimary === false) {
        return;
      }
      event.preventDefault();
      activePointerId = event.pointerId;
      beginInteraction("pointer");
      input.focus();
      input.setPointerCapture?.(event.pointerId);
      setValueFromPointer(event);
    });
    listen(input, "pointermove", (event) => {
      if (!topoRangePointerMoveOwnsInteraction(event, activePointerId)) {
        if (event.pointerId === activePointerId) {
          activePointerId = null;
          endInteraction("pointer");
        }
        return;
      }
      setValueFromPointer(event);
    });
    listen(input, "pointerup", (event) => {
      if (event.pointerId !== activePointerId) {
        return;
      }
      activePointerId = null;
      endInteraction("pointer");
      if (input.hasPointerCapture?.(event.pointerId)) {
        input.releasePointerCapture?.(event.pointerId);
      }
    });
    listen(input, "pointercancel", (event) => {
      if (event.pointerId === activePointerId) {
        activePointerId = null;
        endInteraction("pointer");
      }
    });
    listen(input, "lostpointercapture", (event) => {
      if (event.pointerId === activePointerId) {
        activePointerId = null;
        endInteraction("pointer");
      }
    });
    listen(input, "keydown", (event) => {
      const step = Number(input.dataset.keyboardStep) || Number(input.step) || 1;
      let nextValue = null;
      if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
        nextValue = Number(input.value) - step;
      } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
        nextValue = Number(input.value) + step;
      } else if (event.key === "Home") {
        nextValue = Number(input.min);
      } else if (event.key === "End") {
        nextValue = Number(input.max);
      }
      if (nextValue != null) {
        event.preventDefault();
        beginInteraction("keyboard");
        setValue(nextValue);
      }
    });
    listen(input, "keyup", (event) => {
      if (/^(ArrowLeft|ArrowRight|ArrowUp|ArrowDown|Home|End)$/u.test(event.key)) {
        endInteraction("keyboard");
      }
    });
    listen(input, "blur", () => {
      activePointerId = null;
      endInteraction("blur");
    });
  }

  function selectedScenarioId() {
    return dom.scenarioInputs.find((input) => input.checked)?.value ??
      "electrino";
  }

  function syncBetaControlForScenario(scenarioId = selectedScenarioId()) {
    const minimum = topoAnimatedScenarioUsesMinimumBeta(scenarioId)
      ? TOPO_ANIMATED_MIN_BETA
      : 0;
    dom.beta.min = minimum.toFixed(2);
    const rawBeta = Number(dom.beta.value);
    const beta = normalizeTopoScenarioBeta(rawBeta, scenarioId);
    if (rawBeta !== beta) {
      dom.beta.value = beta.toFixed(2);
    }
    return beta;
  }

  function getState() {
    const scenarioId = selectedScenarioId();
    const beta = syncBetaControlForScenario(scenarioId);
    const baseState = {
      beta,
      contourCount: normalizeTopoContourCount(dom.contourCount.value),
      contourRangeDecades: TOPO_DEFAULT_CONTOUR_REACH,
      shadingSpread: normalizeTopoShadingSpread(
        Number(dom.shadingSpread.value) / 100,
      ),
      contourVisibility: Number(dom.contourVisibility.value) / 100,
      displayScale: normalizeTopoDisplayScale(dom.displayScale.value),
      neutralWhiteMix: normalizeTopoNeutralWhiteMix(
        Number(dom.background.value) / 100,
      ),
    };
    const viewId = normalizeTopoWakeView(
      dom.partnerPerspectiveInputs.find((input) => input.checked)?.value ??
        TOPO_DEFAULT_WAKE_VIEW,
    );
    const superpositionView = viewId === TOPO_ABSOLUTE_OBSERVER;
    const observerId = superpositionView
      ? null
      : normalizeTopoPartnerWakeObserver(viewId);
    const partnerWakeSourceSign = superpositionView
      ? null
      : topoPartnerWakeSourceSign(observerId);
    if (scenarioId === TOPO_COLLINEAR_PAIR_SCENARIO_ID) {
      return Object.freeze({
        ...baseState,
        scenarioId: TOPO_COLLINEAR_PAIR_SCENARIO_ID,
        pairMode: true,
        pairPhase: pairPlaybackPhase,
        polaritySign: 1,
        viewId,
        superpositionView,
        observerId,
        partnerWakeSourceSign,
      });
    }
    if (scenarioId === TOPO_CIRCULAR_BINARY_SCENARIO_ID) {
      const orbitalRadius = Number(dom.binaryRadius.value);
      const direction = dom.binaryDirectionInputs.find((input) => input.checked)
        ?.value === TOPO_CIRCULAR_BINARY_DIRECTION.CLOCKWISE
        ? TOPO_CIRCULAR_BINARY_DIRECTION.CLOCKWISE
        : TOPO_CIRCULAR_BINARY_DIRECTION.COUNTERCLOCKWISE;
      const renderSize = canvasSize();
      const historyWarmup = resolveTopoCircularBinaryHistoryWarmup({
        beta: baseState.beta,
        radius: orbitalRadius,
        width: renderSize.width,
        height: renderSize.height,
        displayScale: baseState.displayScale,
      });
      const playback = createTopoCircularBinaryPlayback({
        beta: baseState.beta,
        progress: binaryProgress,
        radius: orbitalRadius,
        direction,
        ...historyWarmup,
      });
      return Object.freeze({
        ...baseState,
        scenarioId: TOPO_CIRCULAR_BINARY_SCENARIO_ID,
        binary: true,
        orbitalRadius,
        direction,
        playback,
        polaritySign: 0,
        viewId,
        superpositionView,
        observerId,
        partnerWakeSourceSign,
        showOrbitGuide: dom.binaryOrbitGuide.checked,
      });
    }
    return applyTopoScenarioPolarity(baseState, scenarioId);
  }

  function updatePanelPresentation() {
    const collapsed = dom.app.dataset.panelCollapsed === "true";
    dom.collapse.innerHTML = createPanelCollapseIconSvg(collapsed);
    dom.collapse.setAttribute("aria-expanded", String(!collapsed));
    const accessibleName = collapsed
      ? "Expand Wake Topography controls"
      : "Collapse Wake Topography controls";
    dom.collapse.setAttribute("aria-label", accessibleName);
    dom.collapse.title = accessibleName;
    dom.panelContent.hidden = collapsed;
    dom.panelContent.inert = collapsed;
    dom.panelContent.setAttribute("aria-hidden", String(collapsed));
    updateBinaryTransportVisibility();
  }

  function updateDisplayScalePresentation() {
    const scale = normalizeTopoDisplayScale(dom.displayScale.value);
    const visibleHeight = 1 / scale;
    dom.app.dataset.displayScale = scale.toFixed(2);
    dom.app.dataset.visibleWorldHeight = visibleHeight.toFixed(4);
    dom.displayScale.setAttribute(
      "aria-valuetext",
      scale.toFixed(2) + " times map scale; " +
        visibleHeight.toFixed(2) +
        " world units visible vertically; physical calculation unchanged",
    );
  }

  function updateVisibleExtentPresentation(width, height, state) {
    const viewportAnchor = state.binary
      ? Object.freeze({
        anchorId: "circular-binary-center",
        viewportCenter: TOPO_CIRCULAR_BINARY_CENTER,
        canvasAnchor: TOPO_CANVAS_CENTER,
      })
      : resolveTopoLinearViewportAnchor({
        width,
        height,
        pairMode: state.pairMode,
        beta: state.beta,
        phase: state.pairPhase,
      });
    let minimumX;
    let maximumX;
    let minimumY;
    let maximumY;
    if (state.binary) {
      const chart = createTopoCircularBinaryChart({
        width,
        height,
        radius: state.orbitalRadius,
        displayScale: state.displayScale,
      });
      ({ minimumX, maximumX, minimumY, maximumY } = chart);
    } else {
      const upperLeft = topoWorldPointForCanvasPixel({
        pixelX: 0,
        pixelY: 0,
        width,
        height,
        displayScale: state.displayScale,
        viewportCenter: viewportAnchor.viewportCenter,
        canvasAnchor: viewportAnchor.canvasAnchor,
      });
      const lowerRight = topoWorldPointForCanvasPixel({
        pixelX: Math.max(0, width - 1),
        pixelY: Math.max(0, height - 1),
        width,
        height,
        displayScale: state.displayScale,
        viewportCenter: viewportAnchor.viewportCenter,
        canvasAnchor: viewportAnchor.canvasAnchor,
      });
      minimumX = upperLeft.x;
      maximumX = lowerRight.x;
      minimumY = lowerRight.y;
      maximumY = upperLeft.y;
    }
    dom.app.dataset.visibleWorldMinimumX = minimumX.toFixed(6);
    dom.app.dataset.visibleWorldMaximumX = maximumX.toFixed(6);
    dom.app.dataset.visibleWorldMinimumY = minimumY.toFixed(6);
    dom.app.dataset.visibleWorldMaximumY = maximumY.toFixed(6);
    dom.app.dataset.visibleWorldWidth = (maximumX - minimumX).toFixed(6);
    dom.app.dataset.visibleWorldHeight = (maximumY - minimumY).toFixed(6);
    dom.app.dataset.fieldViewportPixels = width + "x" + height;
    dom.app.dataset.contourViewportPixels = width + "x" + height;
    const anchorPixelX = viewportAnchor.canvasAnchor.x * Math.max(1, width - 1);
    const anchorPixelY = (1 - viewportAnchor.canvasAnchor.y) *
      Math.max(1, height - 1);
    const anchorPixel = anchorPixelX.toFixed(3) + "," +
      anchorPixelY.toFixed(3);
    const guideCenterPixel = (
      Math.max(1, width - 1) / 2
    ).toFixed(3) + "," + (
      Math.max(1, height - 1) / 2
    ).toFixed(3);
    dom.app.dataset.viewportAnchorId = viewportAnchor.anchorId;
    dom.app.dataset.viewportAnchorWorld =
      viewportAnchor.viewportCenter.x.toFixed(9) + "," +
      viewportAnchor.viewportCenter.y.toFixed(9);
    dom.app.dataset.viewportAnchorPixel = anchorPixel;
    dom.app.dataset.fieldViewportAnchorPixel = anchorPixel;
    dom.app.dataset.contourViewportAnchorPixel = anchorPixel;
    dom.app.dataset.guideCenterPixel = guideCenterPixel;
    dom.app.dataset.pairSourceMidpointPixel = state.pairMode
      ? anchorPixel
      : "";
    dom.app.dataset.viewportTemporalFrameKey = state.binary
      ? state.scenarioId + ":" + state.beta.toFixed(4) + ":" +
        state.playback.progress.toFixed(6)
      : state.pairMode
        ? state.scenarioId + ":" + state.beta.toFixed(4) + ":" +
          state.pairPhase.toFixed(5)
        : state.scenarioId + ":" + state.beta.toFixed(4) + ":static";
  }

  function updateBinaryTransportVisibility(state = getState()) {
    const mobileOverlayOpen =
      windowLike.matchMedia?.("(max-width: 820px)")?.matches === true &&
      dom.app.dataset.panelCollapsed !== "true";
    const hidden = !state.binary || mobileOverlayOpen;
    dom.binaryTransport.hidden = hidden;
    dom.binaryTransport.inert = hidden;
  }

  function updateControlPresentation() {
    const state = getState();
    const pairMode = state.pairMode === true;
    const binaryMode = state.binary === true;
    const receiverViewAvailable = pairMode || binaryMode;
    const superpositionView = state.superpositionView === true;
    const observerId = state.observerId;
    const partnerSourceId = superpositionView
      ? null
      : topoPartnerWakeSourceId(observerId);
    const observerName = superpositionView ? null : topoSourceName(observerId);
    const partnerSourceName = superpositionView
      ? null
      : topoSourceName(partnerSourceId);
    const animatedMinimumBeta = pairMode || binaryMode
      ? TOPO_ANIMATED_MIN_BETA
      : 0;
    dom.beta.min = animatedMinimumBeta.toFixed(2);
    dom.beta.setAttribute("aria-valuemin", animatedMinimumBeta.toFixed(2));
    dom.beta.setAttribute("aria-valuemax", "1.00");
    dom.app.dataset.scenarioId = state.scenarioId;
    dom.app.dataset.scenario = state.scenarioId;
    dom.app.dataset.wakeView = receiverViewAvailable
      ? state.viewId
      : "single-source";
    dom.app.dataset.partnerWakeObserver = receiverViewAvailable && !superpositionView
      ? observerId
      : "";
    dom.app.dataset.partnerWakeSource = receiverViewAvailable && !superpositionView
      ? partnerSourceId
      : "";
    dom.app.dataset.wakeAggregation = superpositionView
      ? "signed-two-source-superposition"
      : receiverViewAvailable
        ? "partner-only-self-excluded"
        : "single-source";
    dom.app.dataset.neutralBackgroundWhiteMix =
      state.neutralWhiteMix.toFixed(2);
    const neutralWhitePercentage = Math.round(state.neutralWhiteMix * 100);
    dom.background.setAttribute(
      "aria-valuetext",
      neutralWhitePercentage === 0
        ? "Electric Purple"
        : neutralWhitePercentage === 100
          ? "White"
          : neutralWhitePercentage + "% white added to Electric Purple",
    );
    dom.app.dataset.contourCount = String(state.contourCount);
    dom.app.dataset.contourRadii = "";
    dom.app.dataset.contourPhysicalRadii = "";
    dom.app.dataset.shadingTransfer = TOPO_DISPLAY_MAPPING_ID;
    dom.app.dataset.shadingSpread = state.shadingSpread.toFixed(2);
    dom.app.dataset.shadingReachScale =
      topoShadingReachScale(state.shadingSpread).toFixed(4);
    dom.app.dataset.sourceMarkerRadiusScale = String(
      TOPO_SOURCE_MARKER_RADIUS_SCALE,
    );
    dom.app.dataset.sourceMarkerCssRadius =
      resolveTopoVisibleSourceMarkerCssRadius({
        polaritySign: state.polaritySign,
      }).toFixed(3);
    dom.app.dataset.sourceMarkerRadiusPolicy = "fixed-css-pixels";
    dom.app.dataset.sourceMaskPolicy = "exact-singular-point-only";
    dom.app.dataset.pairReplayPhase = pairPlaybackPhase.toFixed(5);
    dom.app.dataset.pairReplayPlaying = String(pairPlaybackPlaying);
    dom.app.dataset.pairTimelineScrubbing = String(pairTimelineScrubbing);
    dom.app.dataset.pairHistoryModel = pairMode
      ? TOPO_COLLINEAR_PAIR_HISTORY_MODEL
      : "";
    dom.app.dataset.pairLaunchTime = pairMode ? "0" : "";
    dom.app.dataset.pairPrelaunchVelocityBeta = pairMode ? "0" : "";
    dom.betaOutput.value = "beta = " + state.beta.toFixed(2);
    renderInlineMathText(
      dom.betaOutput,
      `$\\beta = ${state.beta.toFixed(2)}$`,
      { documentLike, windowLike },
    );
    dom.beta.setAttribute(
      "aria-valuetext",
      "beta equals " + state.beta.toFixed(2) +
      (state.beta === 1
        ? ", exact field-speed endpoint"
        : state.beta === 0 && (pairMode || binaryMode)
          ? ", stationary; choose a positive beta to replay"
          : binaryMode
            ? ", sub-field-speed prescribed circular path; minimum animated beta is 0.05"
            : pairMode
              ? ", sub-field-speed prescribed collinear approach; minimum animated beta is 0.05"
            : ", sub-field-speed preview"),
    );
    dom.app.dataset.coordinateMode = "linear-absolute-space";
    dom.partnerPerspectiveControl.hidden = !receiverViewAvailable;
    dom.partnerPerspectiveControl.inert = !receiverViewAvailable;
    dom.partnerPerspectiveNote.textContent = superpositionView
      ? "Absolute observer sees the signed superposition of both wakes."
      : observerName + " sees the " + partnerSourceId + " wake only; " +
        observerId + " self-wake is excluded.";
    dom.binaryDirectionControl.hidden = !binaryMode;
    dom.binaryDirectionControl.inert = !binaryMode;
    const countText = superpositionView
      ? state.contourCount + " signed-superposition levels per polarity"
      : receiverViewAvailable
        ? state.contourCount + " partner-wake levels"
        : state.contourCount + " levels";
    dom.contourCount.disabled = false;
    dom.contourCount.setAttribute(
      "aria-valuetext",
      countText + "; every line is a genuine equal-wake threshold",
    );
    dom.shadingSpread.setAttribute(
      "aria-valuetext",
      Math.round(state.shadingSpread * 100) +
        "% shading; color reach " +
        topoShadingReachScale(state.shadingSpread).toFixed(2) +
        " times the default; display only",
    );
    const contourStrengthText = state.contourVisibility === 0
      ? "Hidden"
      : formatPercentage(state.contourVisibility);
    dom.contourVisibility.setAttribute(
      "aria-valuetext",
      contourStrengthText +
        "; Contour fade for the graded contour profile",
    );
    dom.contourVisibility.disabled = false;
    dom.contourControls.hidden = false;
    dom.contourControls.inert = false;
    dom.binaryRadiusControl.hidden = !binaryMode;
    dom.binaryRadiusControl.inert = !binaryMode;
    dom.binaryOrbitGuideControl.hidden = !binaryMode;
    dom.binaryOrbitGuideControl.inert = !binaryMode;
    dom.pairTransport.hidden = !pairMode;
    dom.pairTimeline.value = String(Math.round(
      pairPlaybackPhase * Number(dom.pairTimeline.max),
    ));
    dom.pairTimeline.setAttribute(
      "aria-valuetext",
      formatPercentage(pairPlaybackPhase) + " of the prescribed approach",
    );
    dom.pairPlay.disabled = pairMode && state.beta <= 0;
    dom.pairTimeline.disabled = pairMode && state.beta <= 0;
    setTransportControlButtonPresentation(dom.pairPlay, {
      kind: pairPlaybackPlaying
        ? TRANSPORT_CONTROL_ICON.PAUSE
        : TRANSPORT_CONTROL_ICON.PLAY,
      label: pairPlaybackPlaying
        ? "Pause collinear replay"
        : pairPlaybackCompleted
          ? "Play collinear replay from start"
          : "Play collinear replay",
      pressed: pairPlaybackPlaying,
    });
    setTransportControlButtonPresentation(dom.pairReplay, {
      kind: TRANSPORT_CONTROL_ICON.RESET,
      label: "Reset collinear replay",
    });
    const radiusPercent = Math.round((state.orbitalRadius ??
      TOPO_CIRCULAR_BINARY_DEFAULT_RADIUS) * 100);
    dom.binaryRadiusOutput.value = radiusPercent + "% width";
    dom.binaryRadiusOutput.textContent = dom.binaryRadiusOutput.value;
    dom.binaryRadius.setAttribute(
      "aria-valuetext",
      "Orbital radius " + radiusPercent +
      "% of visible width; antipodal source separation " +
      (radiusPercent * 2) + "%",
    );
    dom.legendTitle.textContent = "Shading scale";
    dom.canvas.setAttribute(
      "aria-label",
      superpositionView
        ? "Absolute observer view: signed superposition of both wakes on a linear Euclidean plane, with genuine equal-wake contours" +
          (binaryMode && state.showOrbitGuide
            ? " and a prescribed-orbit guide"
            : "")
        : receiverViewAvailable
        ? observerName + " view: " + partnerSourceName.toLowerCase() +
          " wake only on a linear Euclidean plane; the selected " +
          observerId + " self-wake is excluded, with genuine equal-wake contours" +
          (binaryMode && state.showOrbitGuide
            ? " and a prescribed-orbit guide"
            : "")
        : "Single-source Wake Topography: theoretical signed inverse-square wake intensity on a linear Euclidean chart, with genuine equal-wake contours",
    );
    updateBinaryTransportVisibility(state);
    updateBinaryTransportPresentation(state);
  }

  function updateBinaryTransportPresentation(state = getState()) {
    if (!state.binary) {
      return;
    }
    const enabled = state.playback.playbackEnabled;
    dom.binaryPlay.disabled = !enabled;
    dom.binaryTimeline.disabled = !enabled;
    dom.binaryReplay.disabled = !enabled;
    if (!enabled) {
      binaryPlaying = false;
    }
    setTransportControlButtonPresentation(dom.binaryPlay, {
      kind: binaryPlaying
        ? TRANSPORT_CONTROL_ICON.PAUSE
        : TRANSPORT_CONTROL_ICON.PLAY,
      label: binaryPlaying ? "Pause" : "Play",
      pressed: binaryPlaying,
      tooltip: binaryPlaying ? "Pause" : "Play",
    });
    setTransportControlButtonPresentation(dom.binaryReplay, {
      kind: TRANSPORT_CONTROL_ICON.RESET,
      label: "Reset orbit playback",
      tooltip: "Reset to the two-rotation replay start",
    });
    const progressText = formatPercentage(state.playback.progress);
    dom.binaryTimeline.value = String(Math.round(
      state.playback.progress * Number(dom.binaryTimeline.max),
    ));
    dom.binaryTimeline.setAttribute(
      "aria-valuetext",
      enabled
        ? progressText + " of two rotations"
        : "Stationary at beta zero; playback unavailable",
    );
    dom.app.dataset.binaryPlayback = enabled
      ? (binaryPlaying ? "playing" : state.playback.complete ? "complete" : "paused")
      : "stationary-disabled";
    dom.app.dataset.binaryProgress = state.playback.progress.toFixed(6);
    dom.app.dataset.binaryReplayRotations = String(
      TOPO_CIRCULAR_BINARY_REPLAY_ROTATIONS,
    );
    dom.app.dataset.binaryTimelineScrubbing = String(binaryTimelineScrubbing);
    dom.app.dataset.neutralBackgroundWhiteMix =
      state.neutralWhiteMix.toFixed(2);
    dom.app.dataset.binaryBackgroundWhiteMix = state.binary
      ? state.neutralWhiteMix.toFixed(2)
      : "";
    dom.app.dataset.binaryOrbitalRadius = state.orbitalRadius.toFixed(2);
    dom.app.dataset.binaryDirection = state.direction;
    dom.app.dataset.binaryAngularVelocity = state.playback.angularVelocity.toFixed(9);
    dom.app.dataset.binaryHistoryPolicy = state.playback.historyPolicy;
    dom.app.dataset.binaryHistoryWarmupDuration =
      state.playback.historyWarmupDuration.toFixed(9);
    dom.app.dataset.binaryHistoryWarmupOrbits = String(
      state.playback.historyWarmupOrbits,
    );
    dom.app.dataset.binaryHistoryRequiredDuration =
      state.playback.historyRequiredDuration?.toFixed(9) ?? "";
    dom.app.dataset.binaryOrbitGuide = state.showOrbitGuide ? "solid" : "hidden";
    dom.app.dataset.binaryFrameIdentity = createTopoCircularBinaryFrameIdentity({
      beta: state.beta,
      progress: state.playback.progress,
      radius: state.orbitalRadius,
      direction: state.direction,
      observerId: state.observerId,
      superposition: state.superpositionView,
      historyWarmupDuration: state.playback.historyWarmupDuration,
      historyWarmupOrbits: state.playback.historyWarmupOrbits,
      historyRequiredDuration: state.playback.historyRequiredDuration,
    });
  }

  function updateLegend() {
    const state = getState();
    const styles = readStyles(state);
    const receiverViewAvailable = state.pairMode || state.binary;
    const superpositionView = state.superpositionView === true;
    const observerId = state.observerId;
    const partnerSourceId = superpositionView
      ? null
      : topoPartnerWakeSourceId(observerId);
    const observerName = superpositionView ? null : topoSourceName(observerId);
    const partnerSourceName = superpositionView
      ? null
      : topoSourceName(partnerSourceId);
    const heatmapDescription =
      "one-over-distance-like visibility with adjustable display-only reach applied after raw contour calculation";
    dom.legendMapping.textContent =
      "signed contributions are summed before drawing equal-value topographic contours";
    dom.legendGradient.style.background = state.pairMode || state.binary
      ? "linear-gradient(90deg, " + styles.negative + ", " +
        styles.zero + ", " + styles.positive + ")"
      : "linear-gradient(90deg, " +
        (state.polaritySign < 0 ? styles.negative : styles.positive) + ", " +
        styles.zero + ")";
    dom.legendGradient.setAttribute(
      "aria-label",
      (superpositionView
        ? "Absolute observer view shows the signed superposition of both wakes with "
        : receiverViewAvailable
        ? observerName + " view shows " + partnerSourceName.toLowerCase() +
          " wake only with "
        : "Single-source wake shows ") + state.contourCount +
      " equal-value contour levels" +
      "; heatmap mode is " + heatmapDescription +
      "; negative values are blue, neutral is " +
      styles.neutralBackgroundDescription +
      ", and positive values are red" +
      (state.binary && state.showOrbitGuide
        ? "; solid circle marks the prescribed orbit"
        : ""),
    );
    dom.legendTicks.replaceChildren();
  }

  function canvasLayoutSize() {
    const bounds = dom.canvas.getBoundingClientRect();
    const clientWidth = Number(dom.canvas.clientWidth);
    const clientHeight = Number(dom.canvas.clientHeight);
    return {
      width: clientWidth > 0 ? clientWidth : bounds.width,
      height: clientHeight > 0 ? clientHeight : bounds.height,
    };
  }

  function canvasSize() {
    const bounds = canvasLayoutSize();
    return resolveTopoCanvasPixelSize({
      cssWidth: bounds.width,
      cssHeight: bounds.height,
      devicePixelRatio: windowLike.devicePixelRatio || 1,
    });
  }

  function rawGridSize() {
    const bounds = canvasLayoutSize();
    return {
      width: Math.max(1, Math.ceil(bounds.width)),
      height: Math.max(1, Math.ceil(bounds.height)),
    };
  }

  function readStyles(state = null) {
    const neutralWhiteMix = normalizeTopoNeutralWhiteMix(
      state?.neutralWhiteMix ?? 0,
    );
    const electricPurple = readHexToken(
      windowLike,
      dom.app,
      "--ui-color-electric-purple",
      "#8f00ff",
    );
    const zeroRgb = createTopoNeutralBackgroundRgb(
      hexToRgb(electricPurple),
      neutralWhiteMix,
    );
    const whitePercentage = Math.round(neutralWhiteMix * 100);
    const styles = {
      negative: readHexToken(
        windowLike,
        dom.app,
        "--ui-data-negative",
        "#2563eb",
      ),
      zero: rgbCss(zeroRgb),
      positive: readHexToken(
        windowLike,
        dom.app,
        "--ui-data-positive",
        "#dc2626",
      ),
      polaritySign: state?.polaritySign ?? -1,
      pairMode: state?.pairMode === true,
      binary: state?.binary === true,
      neutralWhiteMix,
      neutralBackgroundDescription: whitePercentage === 0
        ? "Electric Purple"
        : whitePercentage === 100
          ? "white"
          : whitePercentage + "% white added to Electric Purple",
      neutralOverlay: interpolateHexColor(
        "#f2e6ff",
        electricPurple,
        neutralWhiteMix,
      ),
      axisOverlay: rgbCss(interpolateRgb(
        [WHITE.r, WHITE.g, WHITE.b],
        hexToRgb(electricPurple),
        neutralWhiteMix,
      )),
      negativeContour: interpolateHexColor(
        "#adc6ff",
        "#003a9e",
        neutralWhiteMix,
      ),
      positiveContour: interpolateHexColor(
        "#ffb3c1",
        "#a00024",
        neutralWhiteMix,
      ),
      exponentSpan: topoContourRangeDecades(state?.contourRangeDecades),
      shadingSpread: normalizeTopoShadingSpread(
        state?.shadingSpread ?? TOPO_DEFAULT_SHADING_SPREAD,
      ),
    };
    styles.negativeRgb = hexToRgb(styles.negative);
    styles.zeroRgb = zeroRgb;
    styles.positiveRgb = hexToRgb(styles.positive);
    return styles;
  }

  function effectivePixelRatio(width, height) {
    const bounds = canvasLayoutSize();
    return Math.max(
      1,
      Math.min(
        width / Math.max(1, bounds.width),
        height / Math.max(1, bounds.height),
      ),
    );
  }

  function horizontalWorldSpanForCanvas(width, height) {
    return Math.max(1, width - 1) / Math.max(1, height - 1);
  }

  function paintCircularBinaryField(width, height, state, styles) {
    if (!circularBinaryFieldRenderer) {
      return false;
    }
    try {
      const started = windowLike.performance?.now?.() ?? Date.now();
      if (
        analyticFieldCanvas.width !== width ||
        analyticFieldCanvas.height !== height
      ) {
        analyticFieldCanvas.width = width;
        analyticFieldCanvas.height = height;
      }
      const { program, buffer, position, uniforms } = circularBinaryFieldRenderer;
      resizeTopoScalarFramebuffer(topoScalarFramebuffer, width, height);
      fieldGl.viewport(0, 0, width, height);
      fieldGl.useProgram(program);
      fieldGl.bindBuffer(fieldGl.ARRAY_BUFFER, buffer);
      fieldGl.enableVertexAttribArray(position);
      fieldGl.vertexAttribPointer(position, 2, fieldGl.FLOAT, false, 0, 0);
      fieldGl.uniform2f(uniforms.u_size, width, height);
      fieldGl.uniform1f(uniforms.u_display_scale, state.displayScale);
      fieldGl.uniform1f(uniforms.u_beta, state.beta);
      fieldGl.uniform1f(uniforms.u_time, state.playback.observationTime);
      fieldGl.uniform1f(uniforms.u_kappa, TOPO_CIRCULAR_BINARY_KAPPA);
      fieldGl.uniform1f(uniforms.u_radius, state.orbitalRadius);
      fieldGl.uniform1f(
        uniforms.u_direction_sign,
        state.direction === TOPO_CIRCULAR_BINARY_DIRECTION.CLOCKWISE ? -1 : 1,
      );
      fieldGl.uniform1f(
        uniforms.u_partner_source_sign,
        state.partnerWakeSourceSign ?? 1,
      );
      fieldGl.uniform1f(
        uniforms.u_superposition_view,
        state.superpositionView ? 1 : 0,
      );
      const sourceMarkerWorldRadius = resolveTopoVisibleSourceMarkerWorldRadius({
        polaritySign: -1,
        width,
        height,
        pixelRatio: effectivePixelRatio(width, height),
        displayScale: state.displayScale,
        axis: "horizontal",
      });
      const sourceMaskRadius = resolveTopoSourceMaskRadius({
        polaritySign: -1,
        width,
        height,
        pixelRatio: effectivePixelRatio(width, height),
      });
      fieldGl.uniform1f(
        uniforms.u_source_mask_radius,
        sourceMaskRadius,
      );
      fieldGl.uniform1f(
        uniforms.u_shading_reach_scale,
        topoShadingReachScale(state.shadingSpread),
      );
      dom.app.dataset.binarySourceMarkerWorldRadius =
        sourceMarkerWorldRadius.toFixed(9);
      dom.app.dataset.binarySourceMaskWorldRadius = sourceMaskRadius.toFixed(9);
      fieldGl.uniform3fv(
        uniforms.u_negative,
        styles.negativeRgb.map((channel) => channel / 255),
      );
      fieldGl.uniform3fv(
        uniforms.u_zero,
        styles.zeroRgb.map((channel) => channel / 255),
      );
      fieldGl.uniform3fv(
        uniforms.u_positive,
        styles.positiveRgb.map((channel) => channel / 255),
      );
      const contourLevels = createTopoWakeContourLevels(state);
      const rawDecades = [...new Set(contourLevels
        .filter((level) => Number.isFinite(level.rawDecade))
        .map((level) => level.rawDecade))];
      const shaderLevels = new Float32Array(25);
      shaderLevels.set(rawDecades.slice(0, shaderLevels.length));
      fieldGl.uniform1fv(uniforms["u_contour_levels[0]"], shaderLevels);
      fieldGl.uniform1f(uniforms.u_contour_count, rawDecades.length);
      fieldGl.uniform1f(
        uniforms.u_contour_visibility,
        state.contourVisibility,
      );
      // Pass 1 evaluates the selected receiver view or the absolute signed
      // superposition once. Every visible field and contour pixel reads it.
      fieldGl.bindFramebuffer(fieldGl.FRAMEBUFFER, topoScalarFramebuffer.framebuffer);
      fieldGl.viewport(0, 0, width, height);
      fieldGl.uniform1f(uniforms.u_scalar_pass, 1);
      fieldGl.drawArrays(fieldGl.TRIANGLES, 0, 3);
      const diagnosticPhase = topoBinaryDiagnosticsEnabled && state.beta === 1
        ? topoPassTwoDiagnosticPhase(state.playback.progress)
        : null;
      const scalarAuditKey = diagnosticPhase != null
        ? `${width}x${height}:${state.viewId}:beta-one-phase-${diagnosticPhase.toFixed(3)}`
        : null;
      if (scalarAuditKey && topoScalarAuditKey !== scalarAuditKey &&
          topoScalarFramebuffer.available) {
        const auditSamples = [
          [0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1],
          [Math.floor(width / 2), Math.floor(height / 2)],
          [Math.floor(width * 0.2), Math.floor(height / 2)],
          [Math.floor(width * 0.8), Math.floor(height / 2)],
          [Math.floor(width / 2), Math.floor(height * 0.25)],
          [Math.floor(width / 2), Math.floor(height * 0.75)],
        ];
        const cpu = [];
        const gpu = new Float32Array(4);
        let maxAbsoluteError = 0;
        let maxRelativeError = 0;
        let stateMismatchCount = 0;
        for (const [pixelX, pixelY] of auditSamples) {
          fieldGl.readPixels(pixelX, pixelY, 1, 1, fieldGl.RGBA, fieldGl.FLOAT, gpu);
          const point = topoCircularBinaryWorldPointForCanvasPixel({
            pixelX, pixelY: height - 1 - pixelY, width, height, displayScale: state.displayScale,
          });
          const expected = sampleTopoCircularBinaryWake({
            point, beta: state.beta, radius: state.orbitalRadius,
            progress: state.playback.progress, direction: state.direction,
            observationTime: state.playback.observationTime,
            sourceMaskRadius, observerId: state.observerId,
            superposition: state.superpositionView,
          });
          const ordinary = expected.state === "ordinary";
          const actualOrdinary = gpu[1] > 0.5;
          if (ordinary !== actualOrdinary) stateMismatchCount += 1;
          if (ordinary) {
            const absoluteError = Math.abs(gpu[0] - expected.rawValue);
            maxAbsoluteError = Math.max(maxAbsoluteError, absoluteError);
            maxRelativeError = Math.max(maxRelativeError,
              absoluteError / Math.max(1, Math.abs(expected.rawValue)));
          }
          cpu.push({ pixelX, pixelY, state: expected.state, raw: expected.rawValue, gpuRaw: gpu[0], gpuState: gpu[1] });
        }
        const scalarReadback = new Float32Array(width * height * 4);
        fieldGl.readPixels(0, 0, width, height, fieldGl.RGBA, fieldGl.FLOAT, scalarReadback);
        if (scalarAuditKey && topoPassTwoDiagnosticKey !== scalarAuditKey) {
          const diagnosticLevels = createTopoWakeContourLevels({
            ...state,
            contourCount: 13,
          });
          try {
            const scalarGrid = createTopoPassTwoDiagnosticScalarGrid(
              scalarReadback, width, height,
            );
            const table = diagnosticLevels.map((threshold) => {
              const diagnostic = drawTopoPassTwoDiagnostic({
                width, height, threshold, scalarGrid,
              });
              return Object.freeze({
                family: threshold.family,
                rawDecade: threshold.rawDecade,
                cpuPathComponents: diagnostic.cpuPathComponents,
                gpuMaskComponents: diagnostic.gpuMaskComponents,
                invalidBridgePixels: diagnostic.invalidBridgePixels,
                p95: diagnostic.p95,
                max: diagnostic.max,
                rawP95: diagnostic.rawP95,
                rawMax: diagnostic.rawMax,
              });
            });
            const passed = table.every((row) =>
              row.cpuPathComponents === row.gpuMaskComponents &&
              row.p95 <= 1 && row.max <= 1 && row.invalidBridgePixels === 0,
            );
            dom.app.dataset.binaryPassTwoDiagnosticDraw = passed ? "complete" : "comparison-failed";
            dom.app.dataset.binaryPassTwoDiagnosticResolution = `${width}x${height}`;
            dom.app.dataset.binaryPassTwoDiagnosticThreshold =
              state.superpositionView
                ? "all-superposition-raw-levels"
                : "all-partner-wake-raw-levels";
            dom.app.dataset.binaryPassTwoDiagnosticAllLevels = JSON.stringify(table);
            dom.app.dataset.binaryPassTwoDiagnosticSignedSymmetry =
              state.superpositionView
                ? "signed-two-source-superposition"
                : "not-applicable:partner-wake";
            dom.app.dataset.binaryPassTwoDiagnosticAllLevelsSummary = JSON.stringify({
              levelCount: table.length,
              passed,
              phase: diagnosticPhase,
              maximumP95: Math.max(...table.map((row) => row.p95)),
              maximumCenterlineError: Math.max(...table.map((row) => row.max)),
              invalidBridgePixels: table.reduce((sum, row) => sum + row.invalidBridgePixels, 0),
            });
            topoPassTwoDiagnosticPhaseSummaries.set(diagnosticPhase, JSON.parse(
              dom.app.dataset.binaryPassTwoDiagnosticAllLevelsSummary,
            ));
            dom.app.dataset.binaryPassTwoDiagnosticPhases = JSON.stringify(
              [...topoPassTwoDiagnosticPhaseSummaries.values()],
            );
            dom.app.dataset.binaryPassTwoDiagnosticEggPhase =
              TOPO_BINARY_PASS_TWO_EGG_DIAGNOSTIC_PHASE.toFixed(3);
            dom.app.dataset.binaryPassTwoDiagnosticError = table.map((row) =>
              `${row.family}:${row.rawDecade}:cpu=${row.cpuPathComponents}:gpu=${row.gpuMaskComponents}:` +
              `p95=${row.p95.toFixed(3)}:max=${row.max.toFixed(3)}:invalid=${row.invalidBridgePixels}`,
            ).join("|");
            topoPassTwoDiagnosticKey = scalarAuditKey;
          } catch (error) {
            dom.app.dataset.binaryPassTwoDiagnosticDraw = "failed";
            dom.app.dataset.binaryPassTwoDiagnosticError = String(error?.message ?? error);
            topoPassTwoDiagnosticKey = scalarAuditKey;
          }
        }
        dom.app.dataset.binaryScalarPassAudit = "complete";
        dom.app.dataset.binaryScalarPassAuditSamples = String(auditSamples.length);
        dom.app.dataset.binaryScalarPassAuditStateMismatches = String(stateMismatchCount);
        dom.app.dataset.binaryScalarPassAuditMaxAbsoluteError = maxAbsoluteError.toExponential(3);
        dom.app.dataset.binaryScalarPassAuditMaxRelativeError = maxRelativeError.toExponential(3);
        dom.app.dataset.binaryScalarPassAuditDetail = JSON.stringify(cpu);
        topoScalarAuditKey = scalarAuditKey;
      }
      fieldGl.bindFramebuffer(fieldGl.FRAMEBUFFER, null);
      fieldGl.viewport(0, 0, width, height);
      fieldGl.uniform1f(uniforms.u_scalar_pass, 0);
      if (!circularBinaryScalarPresentationRenderer) {
        throw new Error("Wake Topography scalar presentation renderer is unavailable.");
      }
      const visibleLevels = contourLevels.slice(0, TOPO_BINARY_GPU_CONTOUR_MAX_LEVELS);
      const contourBounds = topoContourLevelBounds(visibleLevels);
      const levelValues = new Float32Array(TOPO_BINARY_GPU_CONTOUR_MAX_LEVELS);
      const levelOpacities = new Float32Array(TOPO_BINARY_GPU_CONTOUR_MAX_LEVELS);
      const levelHalfWidths = new Float32Array(TOPO_BINARY_GPU_CONTOUR_MAX_LEVELS);
      const levelParities = new Float32Array(TOPO_BINARY_GPU_CONTOUR_MAX_LEVELS);
      const binaryContourPaintProfile = [];
      const pixelRatio = effectivePixelRatio(width, height);
      visibleLevels.forEach((level, index) => {
        // Keep the GPU path on the same nonlinear level-weighted profile as
        // sampled/paused binary contours. Raw linear opacity made every
        // level dim together at intermediate strength.
        const contourStyle = createTopoSampledContourPaintStyle({
          level,
          bounds: contourBounds,
          visibility: state.contourVisibility,
          binary: true,
          pixelRatio,
        });
        levelValues[index] = level.value;
        levelOpacities[index] = contourStyle.opacity;
        levelHalfWidths[index] = Math.max(0.5, contourStyle.widthCss * pixelRatio / 2);
        levelParities[index] = topoMarchingSquaresLevelIdentity(level.value) % 2;
        binaryContourPaintProfile.push({
          family: level.family,
          rawDecade: level.rawDecade,
          opacity: contourStyle.opacity,
          lineWidth: contourStyle.lineWidth,
        });
      });
      dom.app.dataset.binaryContourPaintProfile = JSON.stringify(binaryContourPaintProfile);
      dom.app.dataset.binaryContourStrength = String(state.contourVisibility);
      dom.app.dataset.binaryContourStrengthPolicy = "level-weighted-progressive-fade";
      const scalarPresentation = circularBinaryScalarPresentationRenderer;
      fieldGl.useProgram(scalarPresentation.program);
      fieldGl.bindBuffer(fieldGl.ARRAY_BUFFER, scalarPresentation.buffer);
      fieldGl.enableVertexAttribArray(scalarPresentation.position);
      fieldGl.vertexAttribPointer(scalarPresentation.position, 2, fieldGl.FLOAT, false, 0, 0);
      fieldGl.activeTexture(fieldGl.TEXTURE0);
      fieldGl.bindTexture(fieldGl.TEXTURE_2D, topoScalarFramebuffer.texture);
      fieldGl.uniform1i(scalarPresentation.uniforms.u_scalar_texture, 0);
      fieldGl.uniform2f(scalarPresentation.uniforms.u_scalar_resolution, width, height);
      fieldGl.uniform1f(
        scalarPresentation.uniforms.u_shading_reach_scale,
        topoShadingReachScale(state.shadingSpread),
      );
      fieldGl.uniform3fv(scalarPresentation.uniforms.u_negative,
        styles.negativeRgb.map((channel) => channel / 255));
      fieldGl.uniform3fv(scalarPresentation.uniforms.u_zero,
        styles.zeroRgb.map((channel) => channel / 255));
      fieldGl.uniform3fv(scalarPresentation.uniforms.u_positive,
        styles.positiveRgb.map((channel) => channel / 255));
      fieldGl.uniform1fv(scalarPresentation.uniforms["u_contour_values[0]"], levelValues);
      fieldGl.uniform1fv(scalarPresentation.uniforms["u_contour_opacities[0]"], levelOpacities);
      fieldGl.uniform1fv(scalarPresentation.uniforms["u_contour_half_widths[0]"], levelHalfWidths);
      fieldGl.uniform1fv(scalarPresentation.uniforms["u_contour_parities[0]"], levelParities);
      fieldGl.uniform1f(scalarPresentation.uniforms.u_contour_count, visibleLevels.length);
      fieldGl.drawArrays(fieldGl.TRIANGLES, 0, 3);
      if (fieldGl.getError() !== fieldGl.NO_ERROR) {
        throw new Error("WebGL reported a circular-binary field-rendering error.");
      }
      // Keep the WebGL result as the binary field layer.  Copying this full
      // canvas into the 2D interaction canvas synchronizes the GPU and turned
      // each presented beta-one frame into a visible phase jump.
      analyticFieldCanvas.style.visibility = "visible";
      dom.canvas.style.opacity = "0";
      const elapsed = Math.round(
        (windowLike.performance?.now?.() ?? Date.now()) - started,
      );
      const chart = createTopoCircularBinaryChart({
        width,
        height,
        radius: state.orbitalRadius,
        displayScale: state.displayScale,
      });
      dom.app.dataset.binaryVerticalOverflowPolicy = chart.verticalOverflowPolicy;
      dom.app.dataset.binaryOrbitClippedVertically = String(
        chart.orbitClippedVertically,
      );
      dom.app.dataset.lastRawProviderMs = String(elapsed);
      dom.app.dataset.lastRawProviderCacheHit = "gpu-scalar-pass";
      dom.app.dataset.lastColorRemapMs = "0";
      dom.app.dataset.lastColorRemapCacheHit =
        "gpu-direct-signed-bounded-square-root-variable-reach";
      dom.app.dataset.lastFieldPaintMs = String(elapsed);
      dom.app.dataset.binaryContourRenderer = "gpu-scalar-marching-squares-current-frame";
      return true;
    } catch (error) {
      circularBinaryFieldRenderer = null;
      circularBinaryScalarPresentationRenderer = null;
      analyticFieldCanvas.style.visibility = "hidden";
      dom.canvas.style.opacity = "1";
      dom.app.dataset.fieldRenderer = "cpu-reference";
      dom.app.dataset.fieldRendererError = String(error?.message ?? error);
      return false;
    }
  }

  function paintAnalyticField(width, height, state, styles) {
    if (state.binary) {
      return paintCircularBinaryField(width, height, state, styles);
    }
    dom.canvas.style.opacity = "1";
    if (!analyticFieldRenderer) {
      return false;
    }
    try {
      const started = windowLike.performance?.now?.() ?? Date.now();
      if (
        analyticFieldCanvas.width !== width ||
        analyticFieldCanvas.height !== height
      ) {
        analyticFieldCanvas.width = width;
        analyticFieldCanvas.height = height;
      }
      const { program, position, uniforms } = analyticFieldRenderer;
      fieldGl.viewport(0, 0, width, height);
      fieldGl.useProgram(program);
      fieldGl.enableVertexAttribArray(position);
      fieldGl.vertexAttribPointer(position, 2, fieldGl.FLOAT, false, 0, 0);
      fieldGl.uniform2f(uniforms.u_size, width, height);
      fieldGl.uniform1f(uniforms.u_display_scale, state.displayScale);
      const viewportAnchor = resolveTopoLinearViewportAnchor({
        width,
        height,
        pairMode: state.pairMode,
        beta: state.beta,
        phase: state.pairPhase,
      });
      fieldGl.uniform2f(
        uniforms.u_viewport_center,
        viewportAnchor.viewportCenter.x,
        viewportAnchor.viewportCenter.y,
      );
      fieldGl.uniform2f(
        uniforms.u_canvas_anchor,
        viewportAnchor.canvasAnchor.x,
        viewportAnchor.canvasAnchor.y,
      );
      fieldGl.uniform1f(uniforms.u_beta, state.beta);
      const pairFrame = state.pairMode
        ? createTopoCollinearPairFrame({
          beta: state.beta,
          phase: state.pairPhase,
          horizontalWorldSpan: horizontalWorldSpanForCanvas(width, height),
        })
        : null;
      fieldGl.uniform1f(uniforms.u_pair_mode, state.pairMode ? 1 : 0);
      fieldGl.uniform1f(
        uniforms.u_pair_time,
        pairFrame?.observationTime ?? 0,
      );
      fieldGl.uniform1f(
        uniforms.u_electrino_x,
        pairFrame?.sources[0].position.x ?? 1 / 3,
      );
      fieldGl.uniform1f(
        uniforms.u_positrino_x,
        pairFrame?.sources[1].position.x ?? 2 / 3,
      );
      fieldGl.uniform1f(
        uniforms.u_partner_source_sign,
        state.partnerWakeSourceSign ?? 1,
      );
      fieldGl.uniform1f(
        uniforms.u_superposition_view,
        state.superpositionView ? 1 : 0,
      );
      const pairSourceMaskRadius = resolveTopoCollinearSourceMaskRadius({
        polaritySign: state.polaritySign,
        width,
        height,
        pixelRatio: effectivePixelRatio(width, height),
      });
      fieldGl.uniform1f(
        uniforms.u_source_mask_radius,
        pairSourceMaskRadius,
      );
      dom.app.dataset.pairSourceMaskWorldRadius = state.pairMode
        ? pairSourceMaskRadius.toFixed(9)
        : "";
      dom.app.dataset.singleSourceMaskWorldRadius = state.pairMode
        ? ""
        : pairSourceMaskRadius.toFixed(9);
      fieldGl.uniform1f(uniforms.u_polarity_sign, state.polaritySign);
      fieldGl.uniform1f(
        uniforms.u_shading_reach_scale,
        topoShadingReachScale(state.shadingSpread),
      );
      dom.app.dataset.coordinateChart = "linear-euclidean";
      fieldGl.uniform3fv(
        uniforms.u_zero,
        styles.zeroRgb.map((channel) => channel / 255),
      );
      fieldGl.uniform3fv(
        uniforms.u_negative,
        styles.negativeRgb.map((channel) => channel / 255),
      );
      fieldGl.uniform3fv(
        uniforms.u_positive,
        styles.positiveRgb.map((channel) => channel / 255),
      );
      fieldGl.drawArrays(fieldGl.TRIANGLES, 0, 3);
      if (fieldGl.getError() !== fieldGl.NO_ERROR) {
        throw new Error("WebGL reported a field-rendering error.");
      }
      context.drawImage(analyticFieldCanvas, 0, 0, width, height);
      const elapsed = Math.round(
        (windowLike.performance?.now?.() ?? Date.now()) - started,
      );
      dom.app.dataset.lastRawProviderMs = "0";
      dom.app.dataset.lastRawProviderCacheHit = "analytic";
      dom.app.dataset.lastColorRemapMs = "0";
      dom.app.dataset.lastColorRemapCacheHit = "analytic";
      dom.app.dataset.lastFieldPaintMs = String(elapsed);
      return true;
    } catch (error) {
      analyticFieldRenderer = null;
      dom.app.dataset.fieldRenderer = "cpu-reference";
      dom.app.dataset.fieldRendererError = String(error?.message ?? error);
      return false;
    }
  }

  function sourceOverlayGeometry(
    width,
    height,
    pixelRatio,
    polaritySign,
    position = TOPO_SOURCE_POSITION,
    displayScale = TOPO_DEFAULT_DISPLAY_SCALE,
    viewportCenter = TOPO_SOURCE_POSITION,
    canvasAnchor = TOPO_SOURCE_POSITION,
  ) {
    const pixel = topoCanvasPixelForWorldPoint({
      worldX: position.x,
      worldY: position.y,
      width,
      height,
      displayScale,
      viewportCenter,
      canvasAnchor,
    });
    const radius = resolveTopoVisibleSourceMarkerRadius({
      polaritySign,
      width,
      height,
      pixelRatio,
    });
    return { x: pixel.x, y: pixel.y, radius };
  }

  function drawSourceMarker(
    targetContext,
    x,
    y,
    width,
    height,
    pixelRatio,
    polaritySign,
  ) {
    const markerStyle = createTopoVisibleMarkerPaintStyle({
      polaritySign,
      width,
      height,
      pixelRatio,
    });
    const sourceColor = polaritySign < 0
      ? PHOTON_CHARGE_COLORS.electrino
      : PHOTON_CHARGE_COLORS.positrino;
    paintTopoSourceMarker({
      targetContext,
      x,
      y,
      markerStyle,
      sourceColor,
    });
  }

  function drawSourceOverlay(
    targetContext,
    width,
    height,
    pixelRatio,
    polaritySign,
    position = TOPO_SOURCE_POSITION,
    displayScale = TOPO_DEFAULT_DISPLAY_SCALE,
    viewportCenter = TOPO_SOURCE_POSITION,
    canvasAnchor = TOPO_SOURCE_POSITION,
  ) {
    const { x, y } = sourceOverlayGeometry(
      width,
      height,
      pixelRatio,
      polaritySign,
      position,
      displayScale,
      viewportCenter,
      canvasAnchor,
    );
    drawSourceMarker(
      targetContext,
      x,
      y,
      width,
      height,
      pixelRatio,
      polaritySign,
    );
  }

  function drawPairSourceOverlays(
    targetContext,
    width,
    height,
    pixelRatio,
    sources,
    displayScale = TOPO_DEFAULT_DISPLAY_SCALE,
  ) {
    const viewportCenter = Object.freeze({
      x: (sources[0].position.x + sources[1].position.x) / 2,
      y: (sources[0].position.y + sources[1].position.y) / 2,
    });
    const positioned = sources.map((source) => ({
      source,
      geometry: sourceOverlayGeometry(
        width,
        height,
        pixelRatio,
        source.polaritySign,
        source.position,
        displayScale,
        viewportCenter,
        TOPO_CANVAS_CENTER,
      ),
    }));
    if (positioned.length !== 2) {
      positioned.forEach(({ source }) => drawSourceOverlay(
        targetContext,
        width,
        height,
        pixelRatio,
        source.polaritySign,
        source.position,
        displayScale,
        viewportCenter,
        TOPO_CANVAS_CENTER,
      ));
      return;
    }
    paintTopoPairSourceMarkerLayers({
      targetContext,
      width,
      height,
      positioned,
      drawMarker: ({ source, geometry }) => drawSourceMarker(
        targetContext,
        geometry.x,
        geometry.y,
        width,
        height,
        pixelRatio,
        source.polaritySign,
      ),
    });
  }

  function drawCircularBinaryOverlay({
    width,
    height,
    pixelRatio,
    state,
    styles,
    revision,
    targetContext = contourStagingContext,
    commit = true,
  }) {
    if (commit && (
      contourStagingCanvas.width !== width ||
      contourStagingCanvas.height !== height
    )) {
      contourStagingCanvas.width = width;
      contourStagingCanvas.height = height;
    } else if (commit) {
      contourStagingContext.clearRect(0, 0, width, height);
    }
    const centerX = TOPO_CIRCULAR_BINARY_CENTER.x * Math.max(1, width - 1);
    const centerY = Math.max(1, height - 1) / 2;
    const worldPixelScale = Math.max(1, width - 1) * state.displayScale;
    const orbitPixelRadius = state.orbitalRadius * worldPixelScale;
    if (state.showOrbitGuide) {
      targetContext.save();
      targetContext.globalAlpha = 0.68 - 0.1 * state.neutralWhiteMix;
      targetContext.strokeStyle = styles.neutralOverlay;
      targetContext.lineWidth = Math.max(1, pixelRatio);
      targetContext.setLineDash([]);
      targetContext.beginPath();
      targetContext.arc(
        centerX,
        centerY,
        orbitPixelRadius,
        0,
        Math.PI * 2,
      );
      targetContext.stroke();
      targetContext.restore();
    }
    const sourceMarkers = [-1, 1].map((sourceSign) => {
      const position = topoCircularBinarySourcePosition({
        sourceSign,
        time: state.playback.observationTime,
        beta: state.beta,
        radius: state.orbitalRadius,
        direction: state.direction,
      });
      return {
        sourceSign,
        radius: resolveTopoVisibleSourceMarkerRadius({
          polaritySign: sourceSign,
          width,
          height,
          pixelRatio,
        }),
        x: centerX +
          (position.x - TOPO_CIRCULAR_BINARY_CENTER.x) * worldPixelScale,
        y: centerY -
          (position.y - TOPO_CIRCULAR_BINARY_CENTER.y) *
            worldPixelScale,
      };
    });
    const markerDistance = Math.hypot(
      sourceMarkers[1].x - sourceMarkers[0].x,
      sourceMarkers[1].y - sourceMarkers[0].y,
    );
    const markersOverlap = markerDistance <
      sourceMarkers[0].radius + sourceMarkers[1].radius;
    sourceMarkers.forEach((marker, index) => {
      targetContext.save();
      if (markersOverlap && markerDistance > 0) {
        const midpointX = (sourceMarkers[0].x + sourceMarkers[1].x) / 2;
        const midpointY = (sourceMarkers[0].y + sourceMarkers[1].y) / 2;
        const normalX = (sourceMarkers[1].x - sourceMarkers[0].x) / markerDistance;
        const normalY = (sourceMarkers[1].y - sourceMarkers[0].y) / markerDistance;
        const tangentX = -normalY;
        const tangentY = normalX;
        const side = index === 0 ? -1 : 1;
        const extent = 3 * Math.max(width, height);
        targetContext.beginPath();
        targetContext.moveTo(
          midpointX + tangentX * extent,
          midpointY + tangentY * extent,
        );
        targetContext.lineTo(
          midpointX - tangentX * extent,
          midpointY - tangentY * extent,
        );
        targetContext.lineTo(
          midpointX - tangentX * extent + side * normalX * extent,
          midpointY - tangentY * extent + side * normalY * extent,
        );
        targetContext.lineTo(
          midpointX + tangentX * extent + side * normalX * extent,
          midpointY + tangentY * extent + side * normalY * extent,
        );
        targetContext.closePath();
        targetContext.clip();
      }
      drawSourceMarker(
        targetContext,
        marker.x,
        marker.y,
        width,
        height,
        pixelRatio,
        marker.sourceSign,
      );
      targetContext.restore();
    });
    dom.app.dataset.binaryMarkerOverlap = markersOverlap
      ? "split-perpendicular-bisector"
      : "separate";
    if (revision !== frameRevision) {
      return false;
    }
    if (!commit) {
      return true;
    }
    contourContext.clearRect(0, 0, width, height);
    contourContext.drawImage(contourStagingCanvas, 0, 0);
    dom.app.dataset.binaryOverlay = state.showOrbitGuide
      ? "solid-orbit-guide-and-source-markers"
      : "source-markers-only";
    dom.app.dataset.binaryOrbitGuideColor = styles.neutralOverlay;
    dom.app.dataset.binaryMarkerRadiusScale = String(
      TOPO_SOURCE_MARKER_RADIUS_SCALE,
    );
    dom.app.dataset.coordinateChart = "linear-euclidean";
    delete dom.app.dataset.exponentRadiusStepPixels;
    dom.app.dataset.contourGeometryKey = "disabled:orbiting-binary";
    dom.app.dataset.contourRadii = "";
    dom.app.dataset.contourRangeDecades = "";
    dom.app.dataset.contourRenderCount = "0";
    dom.app.dataset.majorDecadeLabels = "";
    dom.app.dataset.majorDecadeLabelPositions = "";
    lastContourPresentationKey = [
      width,
      height,
      state.beta.toFixed(4),
      state.playback.progress.toFixed(6),
      state.orbitalRadius.toFixed(2),
      state.direction,
      state.showOrbitGuide,
      state.neutralWhiteMix.toFixed(2),
      state.displayScale.toFixed(2),
    ].join(":");
    return true;
  }

  function drawTranslationAxis(
    targetContext,
    width,
    height,
    pixelRatio,
    pairMode = false,
    styles = { axisOverlay: "#ffffff" },
  ) {
    const y = (1 - TOPO_SOURCE_POSITION.y) * Math.max(1, height - 1);
    const startX = TOPO_TRANSLATION_AXIS.startX * Math.max(1, width - 1);
    const endX = TOPO_TRANSLATION_AXIS.endX * Math.max(1, width - 1);
    const arrow = TOPO_TRANSLATION_AXIS.arrowCss * pixelRatio;
    targetContext.save();
    targetContext.globalAlpha = TOPO_TRANSLATION_AXIS.opacity;
    targetContext.strokeStyle = styles.axisOverlay;
    targetContext.lineWidth = TOPO_TRANSLATION_AXIS.widthCss * pixelRatio;
    targetContext.lineCap = "butt";
    targetContext.lineJoin = "miter";
    targetContext.setLineDash([
      TOPO_TRANSLATION_AXIS.dashCss * pixelRatio,
      TOPO_TRANSLATION_AXIS.dashCss * pixelRatio,
    ]);
    targetContext.beginPath();
    targetContext.moveTo(startX, y);
    targetContext.lineTo(endX, y);
    targetContext.stroke();
    targetContext.setLineDash([]);
    targetContext.beginPath();
    targetContext.moveTo(endX - arrow, y - arrow * 0.65);
    targetContext.lineTo(endX, y);
    targetContext.lineTo(endX - arrow, y + arrow * 0.65);
    targetContext.stroke();
    if (pairMode) {
      targetContext.beginPath();
      targetContext.moveTo(startX + arrow, y - arrow * 0.65);
      targetContext.lineTo(startX, y);
      targetContext.lineTo(startX + arrow, y + arrow * 0.65);
      targetContext.stroke();
    }
    targetContext.restore();
  }

  function clearContourMapLabels() {
    dom.app.dataset.majorDecadeLabels = "";
    dom.app.dataset.majorDecadeLabelPositions = "";
  }

  function writeDisplayPixel(
    data,
    index,
    rawValue,
    styles,
  ) {
    if (Number.isNaN(rawValue)) {
      const sourceRgb = styles.pairMode || styles.binary
        ? styles.zeroRgb
        : styles.polaritySign < 0
          ? styles.negativeRgb
          : styles.positiveRgb;
      data[index] = sourceRgb[0];
      data[index + 1] = sourceRgb[1];
      data[index + 2] = sourceRgb[2];
    } else if (!Number.isFinite(rawValue)) {
      data[index] = styles.zeroRgb[0];
      data[index + 1] = styles.zeroRgb[1];
      data[index + 2] = styles.zeroRgb[2];
    } else {
      const signedRawValue = styles.binary
        ? rawValue
        : rawValue * styles.polaritySign;
      const normalized = normalizeTopoFieldColorValue(signedRawValue, {
        spread: styles.shadingSpread,
      });
      const endpoint = normalized < 0
        ? styles.negativeRgb
        : styles.positiveRgb;
      const amount = Math.abs(normalized);
      for (let channel = 0; channel < 3; channel += 1) {
        data[index + channel] = Math.round(
          styles.zeroRgb[channel] +
          (endpoint[channel] - styles.zeroRgb[channel]) * amount,
        );
      }
    }
    data[index + 3] = 255;
  }

  function createRawSamplerForState(state, width, height) {
    return state.binary
      ? createTopoCircularBinaryRawSampler({
        beta: state.beta,
        progress: state.playback.progress,
        observationTime: state.playback.observationTime,
        radius: state.orbitalRadius,
        direction: state.direction,
        sourceMaskRadius: resolveTopoSourceMaskRadius({
          polaritySign: state.partnerWakeSourceSign,
          width,
          height,
          pixelRatio: 1,
        }),
        observerId: state.observerId,
        superposition: state.superpositionView,
      })
      : state.pairMode
      ? createTopoCollinearPairRawSampler({
        beta: state.beta,
        phase: state.pairPhase,
        horizontalWorldSpan: horizontalWorldSpanForCanvas(width, height),
        sourceMaskRadius: resolveTopoCollinearSourceMaskRadius({
          polaritySign: state.partnerWakeSourceSign,
          width,
          height,
          pixelRatio: 1,
        }),
        observerId: state.observerId,
        superposition: state.superpositionView,
      })
      : createTopoSyntheticRawSampler({
        ...state,
        polaritySign: 1,
        sourceMaskRadius: resolveTopoCollinearSourceMaskRadius({
          polaritySign: state.polaritySign,
          width,
          height,
          pixelRatio: 1,
        }),
      });
  }

  function createBinaryContourRefinementFrames({
    width,
    height,
    pixelRatio,
    state,
    levels,
  }) {
    const gridSize = TOPO_BINARY_SOURCE_REFINEMENT_GRID_SIZE;
    const radius = TOPO_BINARY_SOURCE_REFINEMENT_RADIUS_PIXELS * pixelRatio;
    const replacementRadius =
      TOPO_BINARY_SOURCE_REFINEMENT_REPLACEMENT_RADIUS_PIXELS * pixelRatio;
    const step = 2 * radius / Math.max(1, gridSize - 1);
    const centerX = Math.max(1, width - 1) / 2;
    const centerY = Math.max(1, height - 1) / 2;
    const worldPixelScale = Math.max(1, width - 1) * state.displayScale;
    const sampleRaw = createRawSamplerForState(state, width, height);
    const sourceSigns = state.superpositionView
      ? [-1, 1]
      : [state.partnerWakeSourceSign];
    return sourceSigns.flatMap((sourceSign) => {
      const position = topoCircularBinarySourcePosition({
        sourceSign,
        time: state.playback.observationTime,
        beta: state.beta,
        radius: state.orbitalRadius,
        direction: state.direction,
      });
      const sourceX = centerX +
        (position.x - TOPO_CIRCULAR_BINARY_CENTER.x) * worldPixelScale;
      const sourceY = centerY -
        (position.y - TOPO_CIRCULAR_BINARY_CENTER.y) * worldPixelScale;
      if (
        sourceX + radius < 0 || sourceX - radius > width ||
        sourceY + radius < 0 || sourceY - radius > height
      ) {
        return [];
      }
      const raw = new Float32Array(gridSize * gridSize);
      const sampleStates = new Uint8Array(raw.length);
      for (let pixelY = 0; pixelY < gridSize; pixelY += 1) {
        for (let pixelX = 0; pixelX < gridSize; pixelX += 1) {
          const point = topoCircularBinaryWorldPointForCanvasPixel({
            pixelX: sourceX - radius + pixelX * step,
            pixelY: sourceY - radius + pixelY * step,
            width,
            height,
            displayScale: state.displayScale,
          });
          const index = pixelY * gridSize + pixelX;
          const value = sampleRaw(point.x, point.y);
          raw[index] = value;
          sampleStates[index] = Number.isNaN(value)
            ? TOPO_SAMPLED_FIELD_STATE.MASKED
            : Number.isFinite(value)
              ? TOPO_SAMPLED_FIELD_STATE.VALID
              : TOPO_SAMPLED_FIELD_STATE.UNAVAILABLE;
        }
      }
      return [{
        sourceX,
        sourceY,
        radius,
        replacementRadius,
        step,
        extracted: extractTopoSampledFieldContourSegments({
          raw,
          sampleStates,
          width: gridSize,
          height: gridSize,
          levels,
        }),
      }];
    });
  }

  function drawImmediatePreview(
    width,
    height,
    pixelRatio,
    state,
    styles,
    cachedRawFrame = null,
  ) {
    const bounds = canvasLayoutSize();
    const previewWidth = Math.max(120, Math.min(240, Math.ceil(bounds.width / 4)));
    const previewHeight = Math.max(
      90,
      Math.round(previewWidth * height / Math.max(1, width)),
    );
    if (previewCanvas.width !== previewWidth || previewCanvas.height !== previewHeight) {
      previewCanvas.width = previewWidth;
      previewCanvas.height = previewHeight;
    }
    const image = previewContext.createImageData(previewWidth, previewHeight);
    const sampleRaw = cachedRawFrame
      ? (pixelX, pixelY) => {
        const sourceX = Math.round(
          pixelX * (cachedRawFrame.width - 1) / Math.max(1, previewWidth - 1),
        );
        const sourceY = Math.round(
          pixelY * (cachedRawFrame.height - 1) / Math.max(1, previewHeight - 1),
        );
        return cachedRawFrame.raw[sourceY * cachedRawFrame.width + sourceX];
      }
      : null;
    const providerSample = sampleRaw ?? createRawSamplerForState(
      state,
      previewWidth,
      previewHeight,
    );
    const linearViewportAnchor = state.binary
      ? null
      : resolveTopoLinearViewportAnchor({
        width: previewWidth,
        height: previewHeight,
        pairMode: state.pairMode,
        beta: state.beta,
        phase: state.pairPhase,
    });
    for (let pixelY = 0; pixelY < previewHeight; pixelY += 1) {
      for (let pixelX = 0; pixelX < previewWidth; pixelX += 1) {
        const worldPoint = state.binary
          ? topoCircularBinaryWorldPointForCanvasPixel({
            pixelX,
            pixelY,
            width: previewWidth,
            height: previewHeight,
            displayScale: state.displayScale,
          })
          : topoWorldPointForCanvasPixel({
            pixelX,
            pixelY,
            width: previewWidth,
            height: previewHeight,
            displayScale: state.displayScale,
            viewportCenter: linearViewportAnchor.viewportCenter,
            canvasAnchor: linearViewportAnchor.canvasAnchor,
          });
        const rawValue = sampleRaw
          ? providerSample(pixelX, pixelY)
          : worldPoint
            ? providerSample(worldPoint.x, worldPoint.y)
            : Number.POSITIVE_INFINITY;
        writeDisplayPixel(
          image.data,
          (pixelY * previewWidth + pixelX) * 4,
          rawValue,
          styles,
        );
      }
    }
    previewContext.putImageData(image, 0, 0);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(previewCanvas, 0, 0, width, height);
  }

  function nextTask() {
    return new Promise((resolve) => windowLike.setTimeout(resolve, 0));
  }

  function createRawFrameKey(width, height, state) {
    return [
      width,
      height,
      state.scenarioId,
      state.viewId ?? "single-source",
      state.beta.toFixed(4),
      "scale=" + state.displayScale.toFixed(2),
      state.binary
        ? state.playback.progress.toFixed(6) + ":" +
          state.orbitalRadius.toFixed(2) + ":" + state.direction
        : state.pairMode
          ? state.pairPhase.toFixed(5)
          : "linear",
    ].join(":");
  }

  function createLiveSampledContourFrame(width, height, state) {
    const gridWidth = state.binary
      ? resolveTopoBinaryContourGridWidth({
        canvasWidth: width,
        beta: state.beta,
        playing: binaryPlaying || binaryTimelineScrubbing,
      })
      : resolveTopoPairPlaybackContourGridWidth({
        canvasWidth: width,
        phase: state.pairPhase,
      });
    const gridHeight = Math.max(
      2,
      Math.min(
        gridWidth,
        Math.round(gridWidth * height / Math.max(1, width)),
      ),
    );
    const raw = new Float32Array(gridWidth * gridHeight);
    const sampleStates = new Uint8Array(raw.length);
    const sampleRaw = createRawSamplerForState(state, width, height);
    const linearViewportAnchor = state.binary
      ? null
      : resolveTopoLinearViewportAnchor({
        width,
        height,
        pairMode: state.pairMode,
        beta: state.beta,
        phase: state.pairPhase,
      });
    for (let pixelY = 0; pixelY < gridHeight; pixelY += 1) {
      for (let pixelX = 0; pixelX < gridWidth; pixelX += 1) {
        const worldPoint = state.binary
          ? topoCircularBinaryWorldPointForCanvasPixel({
            pixelX,
            pixelY,
            width: gridWidth,
            height: gridHeight,
            displayScale: state.displayScale,
          })
          : topoWorldPointForCanvasPixel({
            pixelX,
            pixelY,
            width: gridWidth,
            height: gridHeight,
            displayScale: state.displayScale,
            viewportCenter: linearViewportAnchor.viewportCenter,
            canvasAnchor: linearViewportAnchor.canvasAnchor,
          });
        const index = pixelY * gridWidth + pixelX;
        const value = sampleRaw(worldPoint.x, worldPoint.y);
        raw[index] = value;
        sampleStates[index] = Number.isNaN(value)
          ? TOPO_SAMPLED_FIELD_STATE.MASKED
          : Number.isFinite(value)
            ? TOPO_SAMPLED_FIELD_STATE.VALID
            : TOPO_SAMPLED_FIELD_STATE.UNAVAILABLE;
      }
    }
    return {
      key: createRawFrameKey(gridWidth, gridHeight, state),
      width: gridWidth,
      height: gridHeight,
      raw,
      sampleStates,
      observerId: state.observerId,
      viewId: state.viewId ?? null,
      superpositionView: state.superpositionView === true,
      partnerWakeSourceSign: state.partnerWakeSourceSign,
      contourFrameKind: state.binary
        ? "binary-live-preview"
        : "playback-preview",
    };
  }

  async function buildRawFrame(width, height, state, revision) {
    const key = createRawFrameKey(width, height, state);
    const cached = rawFrameCaches.get(key);
    if (cached) {
      rawFrameCache = cached;
      dom.app.dataset.lastRawProviderMs = "0";
      dom.app.dataset.lastRawProviderCacheHit = "true";
      return cached;
    }
    const providerStarted = windowLike.performance?.now?.() ?? Date.now();
    const raw = new Float32Array(width * height);
    const sampleStates = new Uint8Array(width * height);
    const sampleRaw = createRawSamplerForState(state, width, height);
    const linearViewportAnchor = state.binary
      ? null
      : resolveTopoLinearViewportAnchor({
        width,
        height,
        pairMode: state.pairMode,
        beta: state.beta,
        phase: state.pairPhase,
      });
    let row = 0;
    while (row < height) {
      const started = windowLike.performance?.now?.() ?? Date.now();
      do {
        for (let pixelX = 0; pixelX < width; pixelX += 1) {
          const worldPoint = state.binary
            ? topoCircularBinaryWorldPointForCanvasPixel({
              pixelX,
              pixelY: row,
              width,
              height,
              displayScale: state.displayScale,
            })
            : topoWorldPointForCanvasPixel({
              pixelX,
              pixelY: row,
              width,
              height,
              displayScale: state.displayScale,
              viewportCenter: linearViewportAnchor.viewportCenter,
              canvasAnchor: linearViewportAnchor.canvasAnchor,
            });
          const sampleIndex = row * width + pixelX;
          const value = worldPoint
            ? sampleRaw(worldPoint.x, worldPoint.y)
            : Number.POSITIVE_INFINITY;
          raw[sampleIndex] = value;
          sampleStates[sampleIndex] = Number.isNaN(value)
            ? TOPO_SAMPLED_FIELD_STATE.MASKED
            : Number.isFinite(value)
              ? TOPO_SAMPLED_FIELD_STATE.VALID
              : TOPO_SAMPLED_FIELD_STATE.UNAVAILABLE;
        }
        row += 1;
      } while (
        row < height &&
        (windowLike.performance?.now?.() ?? Date.now()) - started < 7
      );
      if (revision !== frameRevision) {
        return null;
      }
      await nextTask();
    }
    rawFrameCache = {
      key,
      width,
      height,
      beta: state.beta,
      scenarioId: state.scenarioId,
      pairPhase: state.pairPhase ?? null,
      orbitalRadius: state.orbitalRadius ?? null,
      observerId: state.observerId ?? null,
      viewId: state.viewId ?? null,
      superpositionView: state.superpositionView === true,
      partnerWakeSourceSign: state.partnerWakeSourceSign ?? null,
      raw,
      sampleStates,
      displays: new Map(),
    };
    rawFrameCaches.set(key, rawFrameCache);
    while (rawFrameCaches.size > 4) {
      rawFrameCaches.delete(rawFrameCaches.keys().next().value);
    }
    dom.app.dataset.lastRawProviderMs = String(Math.round(
      (windowLike.performance?.now?.() ?? Date.now()) - providerStarted,
    ));
    dom.app.dataset.lastRawProviderCacheHit = "false";
    return rawFrameCache;
  }

  async function buildDisplayImage(rawFrame, pixelRatio, state, styles, revision) {
    const displayKey = TOPO_DISPLAY_MAPPING_ID +
      ":spread=" + state.shadingSpread.toFixed(2) +
      ":" + state.polaritySign + ":white=" +
      state.neutralWhiteMix.toFixed(2);
    const cached = rawFrame.displays.get(displayKey);
    if (cached) {
      dom.app.dataset.lastColorRemapMs = "0";
      dom.app.dataset.lastColorRemapCacheHit = "true";
      return cached;
    }
    const remapStarted = windowLike.performance?.now?.() ?? Date.now();
    const image = context.createImageData(rawFrame.width, rawFrame.height);
    let row = 0;
    while (row < rawFrame.height) {
      const started = windowLike.performance?.now?.() ?? Date.now();
      do {
        for (let pixelX = 0; pixelX < rawFrame.width; pixelX += 1) {
          const index = row * rawFrame.width + pixelX;
          writeDisplayPixel(
            image.data,
            index * 4,
            rawFrame.raw[index],
            styles,
          );
        }
        row += 1;
      } while (
        row < rawFrame.height &&
        (windowLike.performance?.now?.() ?? Date.now()) - started < 7
      );
      if (revision !== frameRevision) {
        return null;
      }
      await nextTask();
    }
    rawFrame.displays.set(displayKey, image);
    dom.app.dataset.lastColorRemapMs = String(Math.round(
      (windowLike.performance?.now?.() ?? Date.now()) - remapStarted,
    ));
    dom.app.dataset.lastColorRemapCacheHit = "false";
    return image;
  }

  function paintFieldImage(image, rawFrame, width, height) {
    const started = windowLike.performance?.now?.() ?? Date.now();
    if (
      fieldRasterCanvas.width !== rawFrame.width ||
      fieldRasterCanvas.height !== rawFrame.height
    ) {
      fieldRasterCanvas.width = rawFrame.width;
      fieldRasterCanvas.height = rawFrame.height;
    }
    fieldRasterContext.putImageData(image, 0, 0);
    context.clearRect(0, 0, width, height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(fieldRasterCanvas, 0, 0, width, height);
    dom.app.dataset.lastFieldPaintMs = String(Math.round(
      (windowLike.performance?.now?.() ?? Date.now()) - started,
    ));
  }
  function drawSampledPartnerContours({
    width,
    height,
    pixelRatio,
    state,
    styles,
    revision,
    rawFrame,
    interactionStarted = null,
  }) {
    const paintStarted = windowLike.performance?.now?.() ?? Date.now();
    dom.app.dataset.coordinateChart = "linear-euclidean";
    delete dom.app.dataset.exponentRadiusStepPixels;
    if (
      contourStagingCanvas.width !== width ||
      contourStagingCanvas.height !== height
    ) {
      contourStagingCanvas.width = width;
      contourStagingCanvas.height = height;
    } else {
      contourStagingContext.clearRect(0, 0, width, height);
    }
    const expectedKey = rawFrame
      ? createRawFrameKey(rawFrame.width, rawFrame.height, state)
      : null;
    const matchingFrame = rawFrame?.key === expectedKey
      ? rawFrame
      : null;
    const playbackFrame = matchingFrame?.contourFrameKind ===
      "playback-preview" || matchingFrame?.contourFrameKind ===
      "binary-live-preview";
    const contourKey = matchingFrame
      ? matchingFrame.key + ":count=" + state.contourCount
      : "pending";
    const contourLevels = createTopoWakeContourLevels(state);
    const contourLevelBounds = topoContourLevelBounds(contourLevels);
    let extracted = matchingFrame && !playbackFrame
      ? sampledContourCaches.get(contourKey)
      : null;
    const pathStarted = windowLike.performance?.now?.() ?? Date.now();
    if (!extracted && matchingFrame) {
      extracted = extractTopoSampledFieldContourSegments({
        raw: matchingFrame.raw,
        sampleStates: matchingFrame.sampleStates,
        width: matchingFrame.width,
        height: matchingFrame.height,
        levels: contourLevels,
      });
      if (!playbackFrame) {
        sampledContourCaches.set(contourKey, extracted);
        while (sampledContourCaches.size > 8) {
          sampledContourCaches.delete(sampledContourCaches.keys().next().value);
        }
      }
    }
    const familyCounts = { negative: 0, positive: 0, zero: 0 };
    const emittedContourStyles = [];
    const refinedContourLevels = contourLevels.filter((level) =>
      Number.isFinite(level.rawDecade) &&
      level.rawDecade >= TOPO_BINARY_SOURCE_REFINEMENT_MIN_RAW_DECADE);
    const binaryRefinements = extracted && state.binary &&
        state.beta < TOPO_BINARY_HIGH_SPEED_CONTOUR_BETA &&
        state.contourVisibility > 0
      ? createBinaryContourRefinementFrames({
        width,
        height,
        pixelRatio,
        state,
        levels: refinedContourLevels,
      })
      : [];
    const pairRefinements = extracted && state.pairMode && !state.binary &&
        state.beta <= TOPO_PAIR_SOURCE_REFINEMENT_MAX_BETA &&
        (state.pairPhase < TOPO_PAIR_CROSSING_PHASE_START ||
          state.pairPhase > TOPO_PAIR_CROSSING_PHASE_END) &&
        state.contourVisibility > 0
      ? (state.superpositionView ? [-1, 1] : [state.partnerWakeSourceSign])
        .flatMap((polaritySign) => {
          const refinement = createTopoPairSourceContourRefinement({
            width,
            height,
            pixelRatio,
            beta: state.beta,
            phase: state.pairPhase,
            displayScale: state.displayScale,
            levels: contourLevels,
            polaritySign,
            observerId: state.observerId,
            superposition: state.superpositionView,
          });
          return refinement ? [refinement] : [];
        })
      : [];
    const pairPaintReplacements = [];
    if (extracted && state.contourVisibility > 0) {
      const scaleX = Math.max(1, width - 1) /
        Math.max(1, matchingFrame.width - 1);
      const scaleY = Math.max(1, height - 1) /
        Math.max(1, matchingFrame.height - 1);
      const families = ["negative", "positive", "zero"];
      for (const family of families) {
        const familySegments = extracted.segments.filter((segment) =>
          segment.family === family);
        familyCounts[family] = familySegments.length;
        const levelValues = [...new Set(
          familySegments.map((segment) => segment.value),
        )];
        for (const levelValue of levelValues) {
          const segments = familySegments.filter((segment) =>
            segment.value === levelValue);
          const pairRefinement = pairRefinements.find((refinement) =>
            refinement.replacements.some((replacement) =>
              replacement.level.family === family &&
              replacement.level.value === levelValue));
          const pairReplacement = pairRefinement?.replacements.find(
            (replacement) => replacement.level.family === family &&
              replacement.level.value === levelValue,
          );
          const globalLevelContained = pairReplacement &&
            topoPairRefinementContainsGlobalSegments({
              segments,
              scaleX,
              scaleY,
              refinement: pairRefinement,
            });
          if (pairReplacement && globalLevelContained) {
            pairPaintReplacements.push({
              refinement: pairRefinement,
              replacement: pairReplacement,
            });
            continue;
          }
          const refineLevel = binaryRefinements.length > 0 &&
            Number.isFinite(segments[0]?.rawDecade) &&
            segments[0].rawDecade >= TOPO_BINARY_SOURCE_REFINEMENT_MIN_RAW_DECADE;
          const visibleSegments = refineLevel
            ? segments.filter((segment) => {
              const centerX = (segment.x1 + segment.x2) * scaleX / 2;
              const centerY = (segment.y1 + segment.y2) * scaleY / 2;
              return !binaryRefinements.some((refinement) =>
                Math.hypot(
                  centerX - refinement.sourceX,
                  centerY - refinement.sourceY,
                ) < refinement.replacementRadius);
            })
            : segments;
          if (visibleSegments.length === 0) {
            continue;
          }
          const foreground = family === "zero"
            ? styles.neutralOverlay
            : family === "positive"
              ? styles.positiveContour
              : styles.negativeContour;
          contourStagingContext.save();
          contourStagingContext.beginPath();
          for (const path of connectTopoSampledFieldContourSegments(visibleSegments)) {
            contourStagingContext.moveTo(path[0].x * scaleX, path[0].y * scaleY);
            for (const point of path.slice(1)) {
              contourStagingContext.lineTo(point.x * scaleX, point.y * scaleY);
            }
          }
          contourStagingContext.lineCap = "round";
          contourStagingContext.lineJoin = "round";
          contourStagingContext.strokeStyle = foreground;
          const level = segments[0];
          const contourStyle = createTopoSampledContourPaintStyle({
            level,
            bounds: contourLevelBounds,
            visibility: state.contourVisibility,
            binary: state.binary,
            pixelRatio,
          });
          contourStagingContext.globalAlpha = contourStyle.opacity;
          contourStagingContext.lineWidth = contourStyle.lineWidth;
          emittedContourStyles.push({
            family,
            rawDecade: level.rawDecade,
            opacity: contourStagingContext.globalAlpha,
            lineWidth: contourStagingContext.lineWidth,
          });
          contourStagingContext.stroke();
          contourStagingContext.restore();
        }
      }
      for (const refinement of binaryRefinements) {
        for (const level of refinedContourLevels) {
          const segments = refinement.extracted.segments.filter((segment) =>
            segment.family === level.family && segment.value === level.value &&
              Math.hypot(
                refinement.sourceX - refinement.radius +
                  (segment.x1 + segment.x2) * refinement.step / 2 -
                  refinement.sourceX,
                refinement.sourceY - refinement.radius +
                  (segment.y1 + segment.y2) * refinement.step / 2 -
                  refinement.sourceY,
              ) < refinement.radius);
          if (segments.length === 0) {
            continue;
          }
          const family = level.family;
          const foreground = family === "positive"
            ? styles.positiveContour
            : styles.negativeContour;
          const contourStyle = createTopoSampledContourPaintStyle({
            level,
            bounds: contourLevelBounds,
            visibility: state.contourVisibility,
            binary: true,
            pixelRatio,
          });
          contourStagingContext.save();
          contourStagingContext.beginPath();
          for (const path of connectTopoSampledFieldContourSegments(segments)) {
            contourStagingContext.moveTo(
              refinement.sourceX - refinement.radius + path[0].x * refinement.step,
              refinement.sourceY - refinement.radius + path[0].y * refinement.step,
            );
            for (const point of path.slice(1)) {
              contourStagingContext.lineTo(
                refinement.sourceX - refinement.radius + point.x * refinement.step,
                refinement.sourceY - refinement.radius + point.y * refinement.step,
              );
            }
          }
          contourStagingContext.lineCap = "round";
          contourStagingContext.lineJoin = "round";
          contourStagingContext.strokeStyle = foreground;
          contourStagingContext.globalAlpha = contourStyle.opacity;
          contourStagingContext.lineWidth = contourStyle.lineWidth;
          contourStagingContext.stroke();
          contourStagingContext.restore();
        }
      }
      for (const { refinement, replacement } of pairPaintReplacements) {
        const level = replacement.level;
        const family = level.family;
        const foreground = family === "positive"
          ? styles.positiveContour
          : styles.negativeContour;
        const contourStyle = createTopoSampledContourPaintStyle({
          level,
          bounds: contourLevelBounds,
          visibility: state.contourVisibility,
          binary: false,
          pixelRatio,
        });
        contourStagingContext.save();
        contourStagingContext.beginPath();
        contourStagingContext.moveTo(
          refinement.sourceX - refinement.radius +
            replacement.path[0].x * refinement.step,
          refinement.sourceY - refinement.radius +
            replacement.path[0].y * refinement.step,
        );
        for (const point of replacement.path.slice(1)) {
          contourStagingContext.lineTo(
            refinement.sourceX - refinement.radius +
              point.x * refinement.step,
            refinement.sourceY - refinement.radius +
              point.y * refinement.step,
          );
        }
        contourStagingContext.lineCap = "round";
        contourStagingContext.lineJoin = "round";
        contourStagingContext.strokeStyle = foreground;
        contourStagingContext.globalAlpha = contourStyle.opacity;
        contourStagingContext.lineWidth = contourStyle.lineWidth;
        emittedContourStyles.push({
          family,
          rawDecade: level.rawDecade,
          opacity: contourStagingContext.globalAlpha,
          lineWidth: contourStagingContext.lineWidth,
        });
        contourStagingContext.stroke();
        contourStagingContext.restore();
      }
    }
    if (state.binary) {
      drawCircularBinaryOverlay({
        width,
        height,
        pixelRatio,
        state,
        styles,
        revision,
        targetContext: contourStagingContext,
        commit: false,
      });
    } else {
      const pairFrame = createTopoCollinearPairFrame({
        beta: state.beta,
        phase: state.pairPhase,
        horizontalWorldSpan: horizontalWorldSpanForCanvas(width, height),
      });
      drawPairSourceOverlays(
        contourStagingContext,
        width,
        height,
        pixelRatio,
        pairFrame.sources,
        state.displayScale,
      );
      dom.app.dataset.pairMarkerRenderer = "canvas-overlay";
    }
    if (revision !== frameRevision) {
      return false;
    }
    contourContext.clearRect(0, 0, width, height);
    contourContext.drawImage(contourStagingCanvas, 0, 0);
    dom.app.dataset.contourGeometryKey = contourKey;
    dom.app.dataset.contourFrameKey = matchingFrame?.key ?? "pending";
    dom.app.dataset.contourFrameKind = matchingFrame?.contourFrameKind ??
      (matchingFrame ? "full-density" : "pending");
    dom.app.dataset.contourFrameResolution = matchingFrame
      ? matchingFrame.width + "x" + matchingFrame.height
      : "pending";
    dom.app.dataset.contourCount = String(state.contourCount);
    dom.app.dataset.contourWeightPolicy = TOPO_CONTOUR_WEIGHT_POLICY_ID;
    dom.app.dataset.contourStrengthPolicy = state.binary
      ? "level-weighted-progressive-fade"
      : "linear-profile-scale";
    dom.app.dataset.contourWeightProfile = topoContourWeightProfile(
      contourLevels,
      contourLevelBounds,
    );
    dom.app.dataset.contourPaintProfile = emittedContourStyles.map((style) =>
      style.family + ":" +
      (Number.isFinite(style.rawDecade)
        ? style.rawDecade.toFixed(6)
        : "zero") + ":" +
      style.opacity.toFixed(6) + ":" +
      style.lineWidth.toFixed(3)
    ).join(",");
    dom.app.dataset.contourLevelPolicy =
      "signed-equal-value-levels-plus-zero";
    dom.app.dataset.contourScalarAuthority = state.superpositionView
      ? "signed-two-source-superposition-field"
      : "partner-raw-wake-field";
    dom.app.dataset.contourLayerVisible = String(
      state.contourVisibility > 0,
    );
    dom.app.dataset.contourFailureStatePolicy =
      "masked-and-unavailable-cells-excluded";
    dom.app.dataset.contourSegmentCount = String(
      extracted?.segments.length ?? 0,
    );
    dom.app.dataset.contourNegativeSegmentCount = String(familyCounts.negative);
    dom.app.dataset.contourPositiveSegmentCount = String(familyCounts.positive);
    dom.app.dataset.contourZeroSegmentCount = String(familyCounts.zero);
    dom.app.dataset.contourInvalidCellCount = String(
      extracted?.invalidCellCount ?? 0,
    );
    dom.app.dataset.binaryContourRefinement = state.binary
      ? binaryRefinements.length + " source patches at " +
        TOPO_BINARY_SOURCE_REFINEMENT_GRID_SIZE + " by " +
        TOPO_BINARY_SOURCE_REFINEMENT_GRID_SIZE + " samples"
      : "";
    dom.app.dataset.pairSourceContourRefinement = state.pairMode
      ? pairPaintReplacements.length + " closed level components at " +
        TOPO_PAIR_SOURCE_REFINEMENT_GRID_SIZE + " by " +
        TOPO_PAIR_SOURCE_REFINEMENT_GRID_SIZE + " source samples"
      : "";
    dom.app.dataset.lastContourPathCacheHit = matchingFrame
      ? playbackFrame
        ? "live-grid"
        : sampledContourCaches.get(contourKey) === extracted
          ? "canonical-grid"
          : "false"
      : "pending";
    dom.app.dataset.lastContourPathMs = String(Math.round(
      (windowLike.performance?.now?.() ?? Date.now()) - pathStarted,
    ));
    dom.app.dataset.lastContourPaintMs = String(Math.round(
      (windowLike.performance?.now?.() ?? Date.now()) - paintStarted,
    ));
    dom.app.dataset.contourRenderCount = String(
      Number(dom.app.dataset.contourRenderCount ?? 0) + 1,
    );
    lastContourPresentationKey = [
      width,
      height,
      state.beta.toFixed(4),
      state.binary
        ? state.playback.progress.toFixed(6)
        : state.pairPhase.toFixed(5),
      state.contourCount,
      state.contourVisibility.toFixed(4),
      state.neutralWhiteMix.toFixed(2),
      state.displayScale.toFixed(2),
      state.viewId ?? "single-source",
      contourKey,
    ].join(":");
    if (interactionStarted !== null) {
      dom.app.dataset.lastFirstContourLatencyMs = String(Math.round(
        (windowLike.performance?.now?.() ?? Date.now()) - interactionStarted,
      ));
    }
    return true;
  }

  function drawSyntheticContours({
    width,
    height,
    pixelRatio,
    state,
    styles,
    revision,
    interactionStarted = null,
    rawFrame = null,
  }) {
    const pathStarted = windowLike.performance?.now?.() ?? Date.now();
    if (state.binary) {
      if (circularBinaryScalarPresentationRenderer && topoScalarFramebuffer.available) {
        drawCircularBinaryOverlay({
          width,
          height,
          pixelRatio,
          state,
          styles,
          revision,
        });
        dom.app.dataset.contourFrameKind = "gpu-current-frame";
        dom.app.dataset.contourFrameResolution = width + "x" + height;
        dom.app.dataset.contourScalarAuthority = state.superpositionView
          ? "signed-two-source-superposition-field"
          : "partner-raw-wake-field";
        return true;
      }
      return rawFrame
        ? drawSampledPartnerContours({
          width,
          height,
          pixelRatio,
          state,
          styles,
          revision,
          rawFrame,
          interactionStarted,
        })
        : drawCircularBinaryOverlay({
          width,
          height,
          pixelRatio,
          state,
          styles,
          revision,
        });
    }
    if (state.pairMode) {
      return drawSampledPartnerContours({
        width,
        height,
        pixelRatio,
        state,
        styles,
        revision,
        rawFrame,
        interactionStarted,
      });
    }
    const physicalCircles = createTopoSyntheticContourRenderPlan({
      beta: state.beta,
      contourCount: state.contourCount,
      contourReach: TOPO_DEFAULT_CONTOUR_REACH,
    });
    const contourLevelBounds = topoContourLevelBounds(physicalCircles);
    const commonScale = Math.max(1, height - 1) * state.displayScale;
    const circles = physicalCircles;
    const sourcePixelX = TOPO_SOURCE_POSITION.x * Math.max(1, width - 1);
    const sourcePixelY = (1 - TOPO_SOURCE_POSITION.y) *
      Math.max(1, height - 1);
    const markerRadius = resolveTopoVisibleSourceMarkerRadius({
      width,
      height,
      pixelRatio,
      polaritySign: state.polaritySign,
    });
    const visibleCircles = circles.filter((circle) => {
      const centerX = sourcePixelX +
        (circle.center.x - TOPO_SOURCE_POSITION.x) * commonScale;
      const centerY = sourcePixelY -
        (circle.center.y - TOPO_SOURCE_POSITION.y) * commonScale;
      const radius = circle.radius * commonScale;
      const minDx = centerX < 0
        ? -centerX
        : centerX > width ? centerX - width : 0;
      const minDy = centerY < 0
        ? -centerY
        : centerY > height ? centerY - height : 0;
      const minDistance = Math.hypot(minDx, minDy);
      const maxDistance = Math.max(
        Math.hypot(centerX, centerY),
        Math.hypot(centerX - width, centerY),
        Math.hypot(centerX, centerY - height),
        Math.hypot(centerX - width, centerY - height),
      );
      const sourceDistance = Math.hypot(
        centerX - sourcePixelX,
        centerY - sourcePixelY,
      );
      return radius >= minDistance && radius <= maxDistance &&
        sourceDistance + radius > markerRadius + pixelRatio;
    });
    dom.app.dataset.contourGeometryKey = [
      state.beta.toFixed(4),
      state.pairMode ? state.pairPhase.toFixed(5) : "static",
      state.contourCount,
      state.displayScale.toFixed(2),
      width,
      height,
      circles.map(({ causalDelay }) => causalDelay.toFixed(8)).join(","),
    ].join(":");
    dom.app.dataset.contourCount = String(state.contourCount);
    dom.app.dataset.contourWeightPolicy = TOPO_CONTOUR_WEIGHT_POLICY_ID;
    dom.app.dataset.contourWeightProfile = topoContourWeightProfile(
      physicalCircles,
      contourLevelBounds,
    );
    dom.app.dataset.contourSpanPolicy =
      "symmetric-inward-outward-raw-decades";
    dom.app.dataset.contourRadii = circles
      .map(({ radius }) => radius.toFixed(10))
      .join(",");
    dom.app.dataset.contourPhysicalRadii = physicalCircles
      .map(({ radius }) => radius.toFixed(10))
      .join(",");
    dom.app.dataset.visibleContourExponents = visibleCircles
      .map(({ rawDecade }) => rawDecade)
      .join(",");
    dom.app.dataset.coordinateChart = "linear-euclidean";
    delete dom.app.dataset.logRadiusStepPixels;
    delete dom.app.dataset.radiusDecadeLabels;
    delete dom.app.dataset.radiusDecadeRadii;
    delete dom.app.dataset.logRadiusReference;
    delete dom.app.dataset.exponentRadiusStepPixels;
    dom.app.dataset.contourRenderCount = String(
      Number(dom.app.dataset.contourRenderCount ?? 0) + 1,
    );
    dom.app.dataset.lastContourPathMs = String(Math.round(
      (windowLike.performance?.now?.() ?? Date.now()) - pathStarted,
    ));
    dom.app.dataset.lastContourPathCacheHit = "analytic";
    const paintStarted = windowLike.performance?.now?.() ?? Date.now();
    if (
      contourStagingCanvas.width !== width ||
      contourStagingCanvas.height !== height
    ) {
      contourStagingCanvas.width = width;
      contourStagingCanvas.height = height;
    } else {
      contourStagingContext.clearRect(0, 0, width, height);
    }
    visibleCircles.forEach((circle) => {
      if (!(circle.radius > 0)) {
        return;
      }
      const centerX = sourcePixelX +
        (circle.center.x - TOPO_SOURCE_POSITION.x) * commonScale;
      const centerY = sourcePixelY -
        (circle.center.y - TOPO_SOURCE_POSITION.y) * commonScale;
      const radius = circle.radius * commonScale;
      const circlePolaritySign = circle.polaritySign ?? state.polaritySign;
      const contourStyle = topoContourStyle(
        circle,
        contourLevelBounds,
        state.contourVisibility,
      );
      contourStagingContext.save();
      contourStagingContext.beginPath();
      contourStagingContext.arc(
        centerX,
        centerY,
        radius,
        0,
        Math.PI * 2,
      );
      const contourForeground = circlePolaritySign < 0
        ? styles.negativeContour
        : styles.positiveContour;
      contourStagingContext.lineCap = "round";
      contourStagingContext.lineJoin = "round";
      contourStagingContext.strokeStyle = contourForeground;
      contourStagingContext.globalAlpha = contourStyle.opacity;
      contourStagingContext.lineWidth =
        pixelRatio * contourStyle.widthCss;
      contourStagingContext.stroke();
      contourStagingContext.restore();
    });
    clearContourMapLabels();
    if (state.pairMode) {
      const pairFrame = createTopoCollinearPairFrame({
        beta: state.beta,
        phase: state.pairPhase,
        horizontalWorldSpan: horizontalWorldSpanForCanvas(width, height),
      });
      drawPairSourceOverlays(
        contourStagingContext,
        width,
        height,
        pixelRatio,
        pairFrame.sources,
        state.displayScale,
      );
    } else {
      drawSourceOverlay(
        contourStagingContext,
        width,
        height,
        pixelRatio,
        state.polaritySign,
        TOPO_SOURCE_POSITION,
        state.displayScale,
      );
    }
    if (revision !== frameRevision) {
      return false;
    }
    contourContext.clearRect(0, 0, width, height);
    contourContext.drawImage(contourStagingCanvas, 0, 0);
    lastContourPresentationKey = [
      width,
      height,
      state.beta.toFixed(4),
      state.pairMode ? state.pairPhase.toFixed(5) : "static",
      state.contourCount,
      state.contourVisibility.toFixed(4),
      state.polaritySign,
      state.displayScale.toFixed(2),
    ].join(":");
    dom.app.dataset.lastContourPaintMs = String(Math.round(
      (windowLike.performance?.now?.() ?? Date.now()) - paintStarted,
    ));
    if (interactionStarted !== null) {
      dom.app.dataset.lastFirstContourLatencyMs = String(Math.round(
        (windowLike.performance?.now?.() ?? Date.now()) - interactionStarted,
      ));
    }
    return true;
  }

  async function renderFinal(
    width,
    height,
    pixelRatio,
    state,
    styles,
    revision,
    interactionStarted,
  ) {
    const grid = rawGridSize();
    const rawFrame = await buildRawFrame(
      grid.width,
      grid.height,
      state,
      revision,
    );
    if (!rawFrame || revision !== frameRevision) {
      return;
    }
    if (state.binary) {
      const complete = drawSyntheticContours({
        width,
        height,
        pixelRatio,
        state,
        styles,
        revision,
        rawFrame,
        interactionStarted,
      });
      if (!complete || revision !== frameRevision) {
        return;
      }
      windowLike.clearTimeout?.(renderWatchdogTimer);
      dom.app.dataset.frameState = "complete";
      dom.app.dataset.lastFullDensityLatencyMs = String(Math.round(
        (windowLike.performance?.now?.() ?? Date.now()) - interactionStarted,
      ));
      dom.status.textContent = state.superpositionView
        ? "Full-density circular-binary superposition contours complete; the orbit circle is a reference path only."
        : "Full-density circular-binary partner-wake contours complete; the orbit circle is a reference path only.";
      return;
    }
    if (state.pairMode) {
      const complete = drawSyntheticContours({
        width,
        height,
        pixelRatio,
        state,
        styles,
        revision,
        rawFrame,
        interactionStarted,
      });
      if (!complete || revision !== frameRevision) {
        return;
      }
      dom.app.dataset.pairFrameHandoff = "complete";
    }
    const image = await buildDisplayImage(
      rawFrame,
      pixelRatio,
      state,
      styles,
      revision,
    );
    if (!image || revision !== frameRevision) {
      return;
    }
    paintFieldImage(image, rawFrame, width, height);
    windowLike.clearTimeout?.(renderWatchdogTimer);
    dom.app.dataset.frameState = "complete";
    dom.app.dataset.lastFullDensityLatencyMs = String(Math.round(
      (windowLike.performance?.now?.() ?? Date.now()) - interactionStarted,
    ));
    dom.status.textContent = state.binary
      ? "Prescribed circular-binary heatmap complete. The solid orbit is a reference path only; no dynamics, binding, or stability claim is attached."
      : state.beta === 1
      ? state.pairMode
          ? state.superpositionView
          ? "Absolute-observer superposition frame complete at the field-speed endpoint; both stationary-prehistory wakes are shown across the frame."
          : "Partner-wake stationary-prehistory frame complete at the field-speed endpoint; the prescribed launch begins at replay time zero."
        : "Full-density synthetic frame complete. Signed ordinary wake intensity has no value in front; no value was fabricated."
      : state.pairMode
        ? state.superpositionView
          ? "Absolute-observer signed superposition frame complete; prescribed paths are display-only."
          : "Partner-wake stationary-prehistory frame complete. The selected observer's self-wake is excluded; prescribed paths are display-only."
        : "One-source full-density synthetic frame complete. No TOPO-001 values are shown.";
  }

  function resetPresentationForControlChange(state) {
    const width = dom.canvas.width;
    const height = dom.canvas.height;
    const styles = readStyles(state);
    const configurationKey = [
      state.scenarioId,
      state.viewId ?? "single-source",
      state.beta.toFixed(4),
      state.contourCount,
      state.shadingSpread.toFixed(4),
      state.contourVisibility.toFixed(4),
      state.displayScale.toFixed(2),
      state.neutralWhiteMix.toFixed(2),
      state.orbitalRadius?.toFixed(2) ?? "not-applicable",
      state.direction ?? "not-applicable",
      state.showOrbitGuide == null
        ? "not-applicable"
        : String(state.showOrbitGuide),
    ].join(":");
    resetTopoVisiblePresentation({
      canvas: dom.canvas,
      analyticFieldCanvas,
      fieldContext: context,
      contourContext,
      contourStagingContext,
      width,
      height,
      neutralColor: styles.zero,
    });
    lastContourPresentationKey = null;
    dom.app.dataset.presentationResetRevision = String(frameRevision);
    dom.app.dataset.presentationResetConfiguration = configurationKey;
    dom.app.dataset.contourFrameKey = "pending:" + configurationKey;
    dom.app.dataset.contourFrameKind = "pending";
    dom.app.dataset.contourFrameResolution = "pending";
    dom.app.dataset.contourGeometryKey = "pending:" + configurationKey;
    dom.app.dataset.pairFrameHandoff = state.pairMode
      ? "reset-for-current-configuration"
      : "not-applicable";
  }

  function beginRender({
    finalDelay = 0,
    redrawContours = true,
    resetPresentation = false,
  } = {}) {
    const interactionStarted = windowLike.performance?.now?.() ?? Date.now();
    frameRevision += 1;
    const revision = frameRevision;
    const state = getState();
    updateControlPresentation();
    updateLegend();
    if (resetPresentation) {
      resetPresentationForControlChange(state);
    }
    dom.app.dataset.frameState = "refining";
    dom.status.textContent =
      "Preview updated; refining the full-density synthetic frame.";
    windowLike.cancelAnimationFrame?.(renderRequest);
    windowLike.clearTimeout?.(finalRenderTimer);
    windowLike.clearTimeout?.(renderWatchdogTimer);
    renderWatchdogTimer = windowLike.setTimeout(() => {
      if (revision !== frameRevision || dom.app.dataset.frameState === "complete") {
        return;
      }
      dom.app.dataset.frameState = "usable-preview";
      dom.app.dataset.renderWatchdog = "expired";
      dom.status.textContent =
        "The immediate analytic preview remains visible; background refinement stopped.";
    }, 1200);
    renderRequest = windowLike.requestAnimationFrame?.(() => {
      if (revision !== frameRevision) {
        return;
      }
      const { width, height } = canvasSize();
      let fieldResized = false;
      if (dom.canvas.width !== width || dom.canvas.height !== height) {
        dom.canvas.width = width;
        dom.canvas.height = height;
        fieldResized = true;
      }
      let contourResized = false;
      if (
        dom.contourCanvas.width !== width ||
        dom.contourCanvas.height !== height
      ) {
        dom.contourCanvas.width = width;
        dom.contourCanvas.height = height;
        contourResized = true;
      }
      const pixelRatio = effectivePixelRatio(width, height);
      const styles = readStyles(state);
      updateVisibleExtentPresentation(width, height, state);
      if (fieldResized) {
        context.fillStyle = styles.zero;
        context.fillRect(0, 0, width, height);
      }
      const grid = rawGridSize();
      const cachedRawFrame = rawFrameCaches.get(
        createRawFrameKey(grid.width, grid.height, state),
      ) ?? null;
      dom.app.dataset.pairFrameHandoff = state.pairMode
        ? "rendering-current-frame"
        : "not-applicable";
      // The binary scalar presentation already contains the current full-stage
      // contours.  Do not build the historical coarse CPU frame merely to
      // draw its marker overlay; that work both duplicates the scalar law and
      // makes an otherwise current GPU animation advance in visible jumps.
      const contourRawFrame = (state.binary &&
          circularBinaryScalarPresentationRenderer && topoScalarFramebuffer.available)
        ? null
        : state.binary ||
        (state.pairMode && (pairPlaybackPlaying || pairTimelineScrubbing))
          ? createLiveSampledContourFrame(width, height, state)
          : cachedRawFrame;
      const contourPresentationKey = [
        width,
        height,
        state.beta.toFixed(4),
        state.binary
          ? state.playback.progress.toFixed(6)
          : state.pairMode
            ? state.pairPhase.toFixed(5)
            : "static",
        state.binary ? state.orbitalRadius.toFixed(2) : state.contourCount,
        state.viewId ?? "single-source",
        state.displayScale.toFixed(2),
        state.binary ? state.showOrbitGuide : state.contourVisibility.toFixed(4),
        state.binary
          ? state.neutralWhiteMix.toFixed(2) + ":" + state.direction
          : state.polaritySign + ":" + state.neutralWhiteMix.toFixed(2),
      ].join(":");
      const shouldRedrawContours = (
        redrawContours ||
        contourResized ||
        lastContourPresentationKey !== contourPresentationKey
      );
      if (shouldRedrawContours && !state.binary) {
        drawSyntheticContours({
          width,
          height,
          pixelRatio,
          state,
          styles,
          revision,
          interactionStarted,
          rawFrame: contourRawFrame,
        });
      }
      const analyticFieldPainted = paintAnalyticField(
        width,
        height,
        state,
        styles,
      );
      if (!analyticFieldPainted) {
        drawImmediatePreview(
          width,
          height,
          pixelRatio,
          state,
          styles,
          cachedRawFrame,
        );
      }
      if (shouldRedrawContours && state.binary) {
        drawSyntheticContours({
          width,
          height,
          pixelRatio,
          state,
          styles,
          revision,
          interactionStarted,
          rawFrame: contourRawFrame,
        });
      }
      dom.app.dataset.lastPreviewLatencyMs = String(Math.round(
        (windowLike.performance?.now?.() ?? Date.now()) - interactionStarted,
      ));
      if (analyticFieldPainted && !state.pairMode &&
          (!state.binary || binaryPlaying || binaryTimelineScrubbing ||
            circularBinaryScalarPresentationRenderer && topoScalarFramebuffer.available)) {
        windowLike.clearTimeout?.(renderWatchdogTimer);
        dom.app.dataset.frameState = "complete";
        dom.app.dataset.lastFullDensityLatencyMs = String(Math.round(
          (windowLike.performance?.now?.() ?? Date.now()) - interactionStarted,
        ));
        dom.status.textContent = state.binary
          ? "Prescribed circular-binary signed-wake map and contours complete; solid circle is a reference orbit only."
          : "Analytic synthetic field and contours complete.";
      } else if (state.pairMode && (pairPlaybackPlaying || pairTimelineScrubbing)) {
        windowLike.clearTimeout?.(renderWatchdogTimer);
        dom.app.dataset.frameState = "playback-preview";
        dom.status.textContent = state.superpositionView
          ? "Prescribed collinear playback preview; live superposition contours follow the current prescribed-time field. Full-density contours settle when paused or scrubbing ends."
          : "Prescribed collinear playback preview; live partner-wake contours follow the current prescribed-time field. Full-density contours settle when paused or scrubbing ends.";
      } else {
        finalRenderTimer = windowLike.setTimeout(() => {
          void renderFinal(
            width,
            height,
            pixelRatio,
            state,
            styles,
            revision,
            interactionStarted,
          );
        }, finalDelay);
      }
    }) ?? 0;
  }

  function scheduleFrameChange() {
    beginRender({ finalDelay: 90, resetPresentation: true });
  }

  function scheduleContourChange() {
    // Contours can live in either the 2D overlay or the circular-binary WebGL
    // presentation. Repaint the complete current presentation so neither path
    // can retain pixels from the previous count or fade setting.
    beginRender({
      finalDelay: 0,
      redrawContours: true,
      resetPresentation: true,
    });
  }

  function render() {
    beginRender({ finalDelay: 0, redrawContours: true });
  }

  function cancelPairPlaybackFrame() {
    windowLike.cancelAnimationFrame?.(pairPlaybackRequest);
    windowLike.clearTimeout?.(pairPlaybackRequest);
    pairPlaybackRequest = 0;
  }

  function timelinePhase(input) {
    const maximum = Math.max(1, Number(input.max));
    return Math.min(1, Math.max(0, Number(input.value) / maximum));
  }

  function requestPairPlaybackFrame() {
    if (pairPlaybackRequest) {
      return;
    }
    pairPlaybackRequest = windowLike.requestAnimationFrame?.(
      advancePairPlayback,
    ) ?? windowLike.setTimeout?.(() => {
      advancePairPlayback(windowLike.performance?.now?.() ?? Date.now());
    }, 16) ?? 0;
  }

  function resetPairPlayback() {
    cancelPairPlaybackFrame();
    pairPlaybackPhase = 0;
    pairPlaybackPlaying = false;
    pairPlaybackCompleted = false;
    pairPlaybackPreviousTimestamp = null;
    pairTimelineScrubbing = false;
    updateControlPresentation();
  }

  function pausePairPlayback() {
    cancelPairPlaybackFrame();
    pairPlaybackPlaying = false;
    pairPlaybackPreviousTimestamp = null;
    pairTimelineScrubbing = false;
    updateControlPresentation();
    beginRender({
      finalDelay: 0,
      redrawContours: true,
      resetPresentation: true,
    });
  }

  function startPairPlayback({ restart = false } = {}) {
    if (pairPlaybackPlaying && !restart) {
      return;
    }
    if (
      selectedScenarioId() !== TOPO_COLLINEAR_PAIR_SCENARIO_ID ||
      getState().beta <= 0
    ) {
      updateControlPresentation();
      return;
    }
    if (restart || pairPlaybackCompleted || pairPlaybackPhase >= 1) {
      pairPlaybackPhase = 0;
    }
    pairPlaybackPlaying = true;
    pairPlaybackCompleted = false;
    pairPlaybackPreviousTimestamp = null;
    pairTimelineScrubbing = false;
    updateControlPresentation();
    beginRender({
      finalDelay: 0,
      redrawContours: true,
      resetPresentation: true,
    });
    requestPairPlaybackFrame();
  }

  function togglePairPlayback() {
    if (pairPlaybackPlaying) {
      pausePairPlayback();
    } else {
      startPairPlayback({ restart: pairPlaybackCompleted });
    }
  }

  function advancePairPlayback(timestamp) {
    pairPlaybackRequest = 0;
    if (
      !pairPlaybackPlaying ||
      selectedScenarioId() !== TOPO_COLLINEAR_PAIR_SCENARIO_ID
    ) {
      return;
    }
    const now = Number(timestamp);
    if (pairPlaybackPreviousTimestamp == null) {
      pairPlaybackPreviousTimestamp = Number.isFinite(now)
        ? now
        : windowLike.performance?.now?.() ?? Date.now();
    } else {
      const elapsedMilliseconds = Math.max(0, now - pairPlaybackPreviousTimestamp);
      pairPlaybackPreviousTimestamp = now;
      pairPlaybackPhase = Math.min(
        1,
        pairPlaybackPhase +
          elapsedMilliseconds /
            (resolveTopoCollinearPairPlaybackSeconds(
              getState().beta,
            ) * 1000),
      );
    }
    if (pairPlaybackPhase >= 1) {
      pairPlaybackPlaying = false;
      pairPlaybackCompleted = true;
      pairPlaybackPreviousTimestamp = null;
      updateControlPresentation();
      beginRender({ finalDelay: 0, redrawContours: true });
      return;
    }
    beginRender({ finalDelay: 0, redrawContours: true });
    requestPairPlaybackFrame();
  }

  function beginPairTimelineScrub() {
    cancelPairPlaybackFrame();
    pairPlaybackPlaying = false;
    pairPlaybackPreviousTimestamp = null;
    pairTimelineScrubbing = true;
    pairPlaybackCompleted = pairPlaybackPhase >= 1;
    updateControlPresentation();
  }

  function seekPairTimeline() {
    pairPlaybackPhase = timelinePhase(dom.pairTimeline);
    pairPlaybackPlaying = false;
    pairPlaybackCompleted = pairPlaybackPhase >= 1;
    pairPlaybackPreviousTimestamp = null;
    updateControlPresentation();
    beginRender({ finalDelay: 0, redrawContours: true });
  }

  function endPairTimelineScrub() {
    if (!pairTimelineScrubbing) {
      return;
    }
    pairTimelineScrubbing = false;
    pairPlaybackCompleted = pairPlaybackPhase >= 1;
    updateControlPresentation();
    beginRender({ finalDelay: 0, redrawContours: true });
  }

  function stopBinaryPlayback() {
    binaryPlaying = false;
    binaryTimelineScrubbing = false;
    binaryPlaybackStartedAt = null;
    binaryPlaybackPreviousTimestamp = null;
    windowLike.cancelAnimationFrame?.(binaryAnimationRequest);
    binaryAnimationRequest = 0;
    updateBinaryTransportPresentation();
  }

  function runBinaryPlaybackFrame(timestamp) {
    if (!binaryPlaying || selectedScenarioId() !== TOPO_CIRCULAR_BINARY_SCENARIO_ID) {
      return;
    }
    if (binaryPlaybackStartedAt == null) {
      binaryPlaybackStartedAt = timestamp;
      binaryPlaybackPreviousTimestamp = timestamp;
    }
    const frameElapsed = Math.max(0, timestamp - binaryPlaybackPreviousTimestamp);
    const requestedPhaseDelta = frameElapsed /
      (TOPO_CIRCULAR_BINARY_PLAYBACK_SECONDS * 1000);
    // A full-stage beta-one contour frame can take longer than a display
    // refresh.  Advance no more than one small visible phase increment after
    // such a frame; this preserves the exact selected scalar frame and avoids
    // skipping several contour poses in one presentation.
    const phaseDelta = Math.min(requestedPhaseDelta, 1 / 80);
    binaryProgress = Math.min(1, binaryProgress + phaseDelta);
    binaryPlaybackPreviousTimestamp = timestamp;
    binaryPlaybackPresentedFrameCount += 1;
    dom.app.dataset.binaryPlaybackRafDeltaMs = frameElapsed.toFixed(3);
    dom.app.dataset.binaryPlaybackPhaseDelta = phaseDelta.toFixed(6);
    dom.app.dataset.binaryPlaybackRequestedPhaseDelta = requestedPhaseDelta.toFixed(6);
    dom.app.dataset.binaryPlaybackPresentedFrameCount = String(
      binaryPlaybackPresentedFrameCount,
    );
    beginRender({ finalDelay: 0, redrawContours: true });
    if (binaryProgress >= 1) {
      binaryPlaying = false;
      binaryTimelineScrubbing = false;
      binaryPlaybackStartedAt = null;
      updateBinaryTransportPresentation();
      dom.status.textContent = "One prescribed circular-binary orbit complete.";
      beginRender({ finalDelay: 0, redrawContours: true });
      return;
    }
    binaryAnimationRequest = windowLike.requestAnimationFrame?.(
      runBinaryPlaybackFrame,
    ) ?? 0;
  }

  function startBinaryPlayback({ replay = false } = {}) {
    const state = getState();
    if (!state.binary || !state.playback.playbackEnabled) {
      stopBinaryPlayback();
      return;
    }
    if (replay || binaryProgress >= 1) {
      binaryProgress = 0;
    }
    binaryPlaying = true;
    binaryTimelineScrubbing = false;
    binaryPlaybackStartProgress = binaryProgress;
    binaryPlaybackStartedAt = null;
    binaryPlaybackPreviousTimestamp = null;
    binaryPlaybackPresentedFrameCount = 0;
    updateBinaryTransportPresentation();
    beginRender({
      finalDelay: 0,
      redrawContours: true,
      resetPresentation: true,
    });
    windowLike.cancelAnimationFrame?.(binaryAnimationRequest);
    binaryAnimationRequest = windowLike.requestAnimationFrame?.(
      runBinaryPlaybackFrame,
    ) ?? 0;
  }

  function toggleBinaryPlayback() {
    if (binaryPlaying) {
      stopBinaryPlayback();
      beginRender({
        finalDelay: 0,
        redrawContours: true,
        resetPresentation: true,
      });
    } else {
      startBinaryPlayback();
    }
  }

  function beginBinaryTimelineScrub() {
    binaryPlaying = false;
    binaryPlaybackStartedAt = null;
    windowLike.cancelAnimationFrame?.(binaryAnimationRequest);
    binaryAnimationRequest = 0;
    binaryTimelineScrubbing = true;
    updateBinaryTransportPresentation();
  }

  function seekBinaryTimeline() {
    binaryProgress = timelinePhase(dom.binaryTimeline);
    binaryPlaybackStartProgress = binaryProgress;
    binaryPlaying = false;
    binaryPlaybackStartedAt = null;
    updateBinaryTransportPresentation();
    beginRender({ finalDelay: 0, redrawContours: true });
  }

  function endBinaryTimelineScrub() {
    if (!binaryTimelineScrubbing) {
      return;
    }
    binaryTimelineScrubbing = false;
    updateBinaryTransportPresentation();
    beginRender({ finalDelay: 0, redrawContours: true });
  }

  function initializeResponsivePanel() {
    const mobile = windowLike.matchMedia?.("(max-width: 820px)")?.matches === true;
    if (mobile) {
      dom.app.dataset.panelCollapsed = "true";
    }
    updatePanelPresentation();
  }

  listen(dom.collapse, "click", () => {
    dom.app.dataset.panelCollapsed =
      dom.app.dataset.panelCollapsed === "true" ? "false" : "true";
    updatePanelPresentation();
    windowLike.requestAnimationFrame?.(render);
  });
  installRangeInteraction(dom.beta);
  installRangeInteraction(dom.contourCount);
  installRangeInteraction(dom.shadingSpread);
  installRangeInteraction(dom.contourVisibility);
  installRangeInteraction(dom.binaryRadius);
  installRangeInteraction(dom.displayScale);
  installRangeInteraction(dom.background);
  installRangeInteraction(dom.pairTimeline, {
    onInteractionStart: beginPairTimelineScrub,
    onInteractionEnd: endPairTimelineScrub,
  });
  installRangeInteraction(dom.binaryTimeline, {
    onInteractionStart: beginBinaryTimelineScrub,
    onInteractionEnd: endBinaryTimelineScrub,
  });
  const handPairReplayPointerFocusToStage =
    installPointerStageFocusHandoff(dom.pairReplay);
  const handBinaryReplayPointerFocusToStage =
    installPointerStageFocusHandoff(dom.binaryReplay);
  function handleScenarioChange(event) {
    if (event && event.target?.checked !== true) {
      return;
    }
    const handFocusToStage = scenarioPointerActivation;
    scenarioPointerActivation = false;
    resetPairPlayback();
    stopBinaryPlayback();
    binaryProgress = 0;
    // Scenario entry is always a deterministic phase-zero paused frame.
    // Playback is an explicit action through Play or context-safe Space.
    scheduleFrameChange();
    if (handFocusToStage) {
      windowLike.requestAnimationFrame?.(() => {
        dom.canvas.focus?.({ preventScroll: true });
      });
    }
  }
  listen(dom.scenarioControl, "pointerdown", () => {
    scenarioPointerActivation = true;
  });
  listen(dom.scenarioControl, "keydown", () => {
    scenarioPointerActivation = false;
  });
  listen(dom.scenarioControl, "pointercancel", () => {
    scenarioPointerActivation = false;
  });
  dom.scenarioInputs.forEach((input) =>
    listen(input, "change", handleScenarioChange));
  listen(dom.partnerPerspectiveControl, "pointerdown", () => {
    partnerPerspectivePointerActivation = true;
  });
  listen(dom.partnerPerspectiveControl, "keydown", () => {
    partnerPerspectivePointerActivation = false;
  });
  listen(dom.partnerPerspectiveControl, "pointercancel", () => {
    partnerPerspectivePointerActivation = false;
  });
  dom.partnerPerspectiveInputs.forEach((input) =>
    listen(input, "change", () => {
      if (input.checked) {
        const handFocusToStage = partnerPerspectivePointerActivation;
        partnerPerspectivePointerActivation = false;
        scheduleFrameChange();
        if (handFocusToStage) {
          windowLike.requestAnimationFrame?.(() => {
            dom.canvas.focus?.({ preventScroll: true });
          });
        }
      }
    }));
  listen(dom.beta, "input", () => {
    stopBinaryPlayback();
    binaryProgress = 0;
    if (selectedScenarioId() === TOPO_COLLINEAR_PAIR_SCENARIO_ID) {
      resetPairPlayback();
    } else {
      updateControlPresentation();
    }
    scheduleFrameChange();
  });
  listen(dom.pairPlay, "click", () => {
    togglePairPlayback();
  });
  listen(dom.pairTimeline, "input", seekPairTimeline);
  listen(dom.pairReplay, "click", () => {
    resetPairPlayback();
    beginRender({ finalDelay: 0, redrawContours: true });
    handPairReplayPointerFocusToStage();
  });
  listen(dom.binaryRadius, "input", () => {
    stopBinaryPlayback();
    binaryProgress = 0;
    scheduleFrameChange();
  });
  listen(dom.binaryOrbitGuide, "pointerdown", () => {
    binaryOrbitGuidePointerActivation = true;
  });
  listen(dom.binaryOrbitGuide, "keydown", () => {
    binaryOrbitGuidePointerActivation = false;
  });
  listen(dom.binaryOrbitGuide, "pointercancel", () => {
    binaryOrbitGuidePointerActivation = false;
  });
  listen(dom.binaryOrbitGuide, "change", () => {
    const handFocusToStage = binaryOrbitGuidePointerActivation;
    binaryOrbitGuidePointerActivation = false;
    scheduleFrameChange();
    if (handFocusToStage) {
      windowLike.requestAnimationFrame?.(() => {
        dom.canvas.focus?.({ preventScroll: true });
      });
    }
  });
  listen(dom.binaryDirectionControl, "pointerdown", () => {
    binaryDirectionPointerActivation = true;
  });
  listen(dom.binaryDirectionControl, "keydown", () => {
    binaryDirectionPointerActivation = false;
  });
  listen(dom.binaryDirectionControl, "pointercancel", () => {
    binaryDirectionPointerActivation = false;
  });
  dom.binaryDirectionInputs.forEach((input) =>
    listen(input, "change", () => {
      if (!input.checked) {
        return;
      }
      const handFocusToStage = binaryDirectionPointerActivation;
      binaryDirectionPointerActivation = false;
      stopBinaryPlayback();
      binaryProgress = 0;
      scheduleFrameChange();
      if (handFocusToStage) {
        windowLike.requestAnimationFrame?.(() => {
          dom.canvas.focus?.({ preventScroll: true });
        });
      }
    }));
  listen(dom.background, "input", scheduleFrameChange);
  listen(dom.displayScale, "input", () => {
    updateDisplayScalePresentation();
    scheduleFrameChange();
  });
  listen(dom.binaryPlay, "click", toggleBinaryPlayback);
  listen(dom.binaryTimeline, "input", seekBinaryTimeline);
  listen(dom.binaryReplay, "click", () => {
    stopBinaryPlayback();
    binaryProgress = 0;
    binaryPlaybackStartProgress = 0;
    updateBinaryTransportPresentation();
    beginRender({ finalDelay: 0, redrawContours: true });
    handBinaryReplayPointerFocusToStage();
  });
  listen(documentLike, "keydown", (event) => {
    if (!topoGlobalTransportOwnsSpace(event)) {
      return;
    }
    if (
      selectedScenarioId() === TOPO_COLLINEAR_PAIR_SCENARIO_ID &&
      getState().beta > 0
    ) {
      event.preventDefault();
      togglePairPlayback();
    } else if (
      selectedScenarioId() === TOPO_CIRCULAR_BINARY_SCENARIO_ID &&
      getState().playback.playbackEnabled
    ) {
      event.preventDefault();
      toggleBinaryPlayback();
    }
  });
  listen(dom.contourCount, "input", scheduleContourChange);
  listen(dom.shadingSpread, "input", scheduleFrameChange);
  listen(dom.contourVisibility, "input", scheduleContourChange);

  if (typeof windowLike.ResizeObserver === "function") {
    resizeObserver = new windowLike.ResizeObserver(() => render());
    resizeObserver.observe(dom.canvas);
  } else {
    listen(windowLike, "resize", render);
  }

  initializeResponsivePanel();
  updateDisplayScalePresentation();
  updateControlPresentation();
  scheduleFrameChange();

  return Object.freeze({
    destroy() {
      frameRevision += 1;
      cancelPairPlaybackFrame();
      windowLike.cancelAnimationFrame?.(binaryAnimationRequest);
      windowLike.cancelAnimationFrame?.(renderRequest);
      windowLike.clearTimeout?.(finalRenderTimer);
      windowLike.clearTimeout?.(renderWatchdogTimer);
      resizeObserver?.disconnect?.();
      listeners.splice(0).forEach((remove) => remove());
      if (topoPassTwoDiagnosticProgram && fieldGl) {
        fieldGl.deleteProgram(topoPassTwoDiagnosticProgram);
        topoPassTwoDiagnosticProgram = null;
      }
      if (topoPassTwoDiagnosticTarget.available && fieldGl) {
        fieldGl.deleteFramebuffer(topoPassTwoDiagnosticTarget.framebuffer);
        fieldGl.deleteTexture(topoPassTwoDiagnosticTarget.texture);
      }
      navigationRuntime.destroy?.();
    },
    render,
  });
}
