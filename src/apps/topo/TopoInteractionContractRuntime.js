import { createPanelCollapseIconSvg } from "../../runtime/PanelCollapseIcons.js";
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
  TOPO_HEATMAP_MODE,
  TOPO_INVERSE_SQUARE_SCALE,
  TOPO_SOURCE_POSITION,
  TOPO_TRANSLATION_AXIS,
  applyTopoScenarioPolarity,
  createTopoEqualRadiusChart,
  createTopoExponentRadiusChart,
  createTopoContourLevelStyle,
  createTopoSyntheticContourRenderPlan,
  createTopoSyntheticRawSampler,
  normalizeTopoExponentRadiusColorValue,
  normalizeTopoContourCount,
  normalizeTopoShadingSpread,
  normalizeTopoDisplayScale,
  normalizeTopoFieldColorValue,
  resolveTopoCanvasPixelSize,
  topoContourRangeDecades,
  topoCanvasPixelForWorldPoint,
  topoEqualRadiusDisplayRadiusForExponent,
  topoExponentDisplayRadiusForExponent,
  topoExponentRadiusPhysicalPointForCanvasPixel,
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
  TOPO_CIRCULAR_BINARY_SCENARIO_ID,
  createTopoCircularBinaryChart,
  createTopoCircularBinaryFrameIdentity,
  createTopoCircularBinaryPlayback,
  createTopoCircularBinaryRawSampler,
  sampleTopoCircularBinaryWake,
  topoCircularBinarySourcePosition,
  topoCircularBinaryWorldPointForCanvasPixel,
} from "./TopoCircularBinaryScenario.js";
import {
  navigateStandaloneAppHome,
  resolveStandaloneAppHomeHref,
} from "../navigator/StandaloneAppHomeRuntime.js";
import {
  createStandaloneAppSceneSearchRuntime,
} from "../navigator/StandaloneAppSceneSearchRuntime.js";
import { PHOTON_CHARGE_COLORS } from "../photon/PhotonStateRuntime.js";
import {
  WHITE,
} from "../causal-delay-feedback/CausalDelayFeedbackDisplayContract.js";

function requireElement(documentLike, selector) {
  const element = documentLike.querySelector(selector);
  if (!element) {
    throw new Error("Missing Topo interaction-preview element: " + selector);
  }
  return element;
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

function formatPercentage(normalizedValue) {
  const percentage = normalizedValue * 100;
  return (Number.isInteger(percentage) ? percentage.toFixed(0) : percentage.toFixed(1)) + "%";
}

function topoShadingPower(spread) {
  return 4 - 3 * normalizeTopoShadingSpread(spread);
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
export const TOPO_SOURCE_MASK_MARKER_RATIO = 0.75;
// Display-only species sizing.  Keep this separate from the shared source
// marker base and all source-mask radii: those define field availability, not
// the painted body.
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
export const TOPO_PAIR_COINCIDENCE_CONTOUR_GRID_WIDTH = 620;
export const TOPO_PAIR_COINCIDENCE_PHASE_START = 0.505;
export const TOPO_PAIR_COINCIDENCE_PHASE_END = 0.515;
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
  const targetWidth = replayPhase >= TOPO_PAIR_COINCIDENCE_PHASE_START &&
      replayPhase <= TOPO_PAIR_COINCIDENCE_PHASE_END
    ? TOPO_PAIR_COINCIDENCE_CONTOUR_GRID_WIDTH
    : replayPhase >= TOPO_PAIR_CROSSING_PHASE_START &&
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

export function topoEqualRadiusViewAvailable(state = {}) {
  return state.viewMode === "equal-radius" &&
    state.pairMode !== true &&
    state.binary !== true &&
    state.beta === 0;
}

export function resolveTopoSourceMarkerRadius({
  width,
  height,
  pixelRatio = 1,
} = {}) {
  const canvasWidth = Math.max(1, Number(width));
  const canvasHeight = Math.max(1, Number(height));
  const density = Math.max(1, Number(pixelRatio));
  if (
    !Number.isFinite(canvasWidth) ||
    !Number.isFinite(canvasHeight) ||
    !Number.isFinite(density)
  ) {
    throw new TypeError("Marker dimensions and pixel ratio must be finite.");
  }
  return TOPO_SOURCE_MARKER_RADIUS_SCALE * Math.max(
    9 * density,
    Math.min(canvasWidth, canvasHeight) * 0.0125,
  );
}

export function resolveTopoVisibleSourceMarkerRadius({
  polaritySign,
  width,
  height,
  pixelRatio = 1,
} = {}) {
  const speciesScale = Number(polaritySign) < 0
    ? TOPO_ELECTRINO_VISIBLE_MARKER_RADIUS_SCALE
    : TOPO_POSITRINO_VISIBLE_MARKER_RADIUS_SCALE;
  return speciesScale * resolveTopoSourceMarkerRadius({
    width,
    height,
    pixelRatio,
  });
}

export function createTopoVisibleMarkerPaintStyle({
  polaritySign,
  width,
  height,
  pixelRatio = 1,
  displayScale = TOPO_DEFAULT_DISPLAY_SCALE,
} = {}) {
  return Object.freeze({
    radius: resolveTopoVisibleSourceMarkerRadius({
      polaritySign,
      width,
      height,
      pixelRatio,
    }) * displayScale,
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
  targetContext.fillStyle = sourceColor;
  targetContext.beginPath();
  targetContext.arc(x, y, markerStyle.radius, 0, Math.PI * 2);
  targetContext.fill();
  targetContext.restore();
  return true;
}

// Pair markers always compose through the same bisector layers.  When the
// circles are separated, the clips contain each whole marker; when they meet,
// the exact same layers reveal their respective halves.  Avoiding a branch at
// the overlap threshold prevents a one-frame leading-edge flash in playback.
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
  ordered.forEach(({ source, geometry }, index) => {
    targetContext.save();
    targetContext.beginPath();
    if (index === 0) {
      targetContext.rect(0, 0, splitX, height);
    } else {
      targetContext.rect(splitX, 0, width - splitX, height);
    }
    targetContext.clip();
    drawMarker({ source, geometry });
    targetContext.restore();
  });
  return Object.freeze({ splitX, layerCount: ordered.length });
}

export function resolveTopoSourceMaskRadius({
  width,
  height,
  pixelRatio = 1,
} = {}) {
  const canvasWidth = Math.max(1, Number(width));
  return TOPO_SOURCE_MASK_MARKER_RATIO * resolveTopoSourceMarkerRadius({
    width: canvasWidth,
    height,
    pixelRatio,
  }) / Math.max(1, canvasWidth - 1);
}

export function resolveTopoCollinearSourceMaskRadius({
  width,
  height,
  pixelRatio = 1,
} = {}) {
  const canvasHeight = Math.max(1, Number(height));
  return TOPO_SOURCE_MASK_MARKER_RATIO * resolveTopoSourceMarkerRadius({
    width,
    height: canvasHeight,
    pixelRatio,
  }) / Math.max(1, canvasHeight - 1);
}

export function mountTopoInteractionContractPreview(options = {}) {
  const documentLike = options.documentLike ?? globalThis.document;
  const windowLike = options.windowLike ?? globalThis.window;
  const dom = {
    app: requireElement(documentLike, "#topo-app"),
    panelContent: requireElement(documentLike, "#topo-panel-content"),
    collapse: requireElement(documentLike, "#topo-panel-collapse"),
    scenarioControl: requireElement(documentLike, "#topo-scenario-control"),
    scenarioInputs: Array.from(documentLike.querySelectorAll(
      'input[name="topo-scenario"]',
    )),
    viewControl: requireElement(documentLike, "#topo-view-control"),
    advancedDisplayEnabled: requireElement(
      documentLike,
      "#topo-advanced-display-enabled",
    ),
    viewInputs: Array.from(documentLike.querySelectorAll(
      'input[name="topo-view"]',
    )),
    heatmapModeControl: requireElement(
      documentLike,
      "#topo-heatmap-mode-control",
    ),
    heatmapModeInputs: Array.from(documentLike.querySelectorAll(
      'input[name="topo-heatmap-mode"]',
    )),
    heatmapNote: requireElement(documentLike, "#topo-heatmap-note"),
    beta: requireElement(documentLike, "#topo-beta"),
    betaOutput: requireElement(documentLike, "#topo-beta-output"),
    coordinateMode: requireElement(documentLike, "#topo-coordinate-mode"),
    contourCount: requireElement(documentLike, "#topo-contour-count"),
    contourCountOutput: requireElement(
      documentLike,
      "#topo-contour-count-output",
    ),
    shadingSpread: requireElement(documentLike, "#topo-shading-spread"),
    shadingSpreadOutput: requireElement(
      documentLike,
      "#topo-shading-spread-output",
    ),
    contourVisibility: requireElement(documentLike, "#topo-contour-visibility"),
    contourVisibilityOutput: requireElement(
      documentLike,
      "#topo-contour-visibility-output",
    ),
    displayScale: requireElement(documentLike, "#topo-display-scale"),
    displayScaleOutput: requireElement(
      documentLike,
      "#topo-display-scale-output",
    ),
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
    backgroundControl: requireElement(
      documentLike,
      "#topo-background-control",
    ),
    backgroundInputs: Array.from(documentLike.querySelectorAll(
      'input[name="topo-background"]',
    )),
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
    pairProgress: requireElement(documentLike, "#topo-pair-progress"),
    binaryTransport: requireElement(documentLike, "#topo-binary-transport"),
    binaryPlay: requireElement(documentLike, "#topo-binary-play"),
    binaryTimeline: requireElement(documentLike, "#topo-binary-timeline"),
    binaryReplay: requireElement(documentLike, "#topo-binary-replay"),
    binaryProgressOutput: requireElement(
      documentLike,
      "#topo-binary-progress-output",
    ),
    home: requireElement(documentLike, "#home-button"),
    back: requireElement(documentLike, "#nav-up"),
    forward: requireElement(documentLike, "#nav-forward"),
  };

  const context = dom.canvas.getContext("2d", { alpha: false });
  if (!context) {
    throw new Error("Topo interaction preview requires a 2D canvas context.");
  }
  const contourContext = dom.contourCanvas.getContext("2d");
  if (!contourContext) {
    throw new Error("Topo interaction preview requires a contour canvas context.");
  }

  const listeners = [];
  const sceneSearchRuntime = createStandaloneAppSceneSearchRuntime({
    document: documentLike,
    window: windowLike,
  }).init();
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
  let viewFallbackNotice = "";
  let viewFallbackTimer = 0;
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
    throw new Error("Topo interaction preview requires a preview canvas context.");
  }
  const contourStagingCanvas = documentLike.createElement("canvas");
  const contourStagingContext = contourStagingCanvas.getContext("2d");
  if (!contourStagingContext) {
    throw new Error("Topo interaction preview requires a contour staging context.");
  }
  const fieldRasterCanvas = documentLike.createElement("canvas");
  const fieldRasterContext = fieldRasterCanvas.getContext("2d", { alpha: false });
  if (!fieldRasterContext) {
    throw new Error("Topo interaction preview requires a field raster context.");
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
      throw new Error("Topo pass-two diagnostic resources are unavailable.");
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
        "Topo analytic field shader failed: " + fieldGl.getShaderInfoLog(shader),
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
      uniform float u_source_mask_radius;
      uniform float u_polarity_sign;
      uniform float u_exponent_span;
      uniform float u_contour_reach;
      uniform float u_shading_power;
      uniform float u_enhanced_decade_contrast;
      uniform float u_source_local_mode;
      uniform float u_source_local_inner_radius;
      uniform float u_source_local_outer_radius;
      uniform float u_source_local_reference_radius;
      uniform vec3 u_zero;
      uniform vec3 u_negative;
      uniform vec3 u_positive;

      float sourceContribution(
        vec2 worldPoint,
        float sourceX,
        float velocityBeta,
        float polaritySign,
        float historyAge,
        float finiteHistory
      ) {
        vec2 offset = worldPoint - vec2(sourceX, 0.5);
        float radiusSquared = dot(offset, offset);
        if (radiusSquared <= 0.000000000001) {
          return polaritySign * 64.0;
        }
        float causalDelay;
        if (abs(velocityBeta) >= 0.999999) {
          if (velocityBeta * offset.x >= 0.0) {
            return 0.0;
          }
          causalDelay = -radiusSquared / (2.0 * velocityBeta * offset.x);
        } else {
          float lambda = sqrt(
            offset.x * offset.x +
            (1.0 - velocityBeta * velocityBeta) * offset.y * offset.y
          );
          causalDelay = radiusSquared / (lambda - velocityBeta * offset.x);
        }
        if (
          causalDelay <= 0.0 ||
          (finiteHistory > 0.5 && causalDelay > historyAge)
        ) {
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
        if (u_source_local_mode > 0.5) {
          vec2 displayOffset = worldPoint - vec2(2.0 / 3.0, 0.5);
          float displayRadius = length(displayOffset);
          if (
            displayRadius < u_source_local_inner_radius ||
            displayRadius > u_source_local_outer_radius
          ) {
            gl_FragColor = vec4(u_zero, 1.0);
            return;
          }
          float exponent = 1.0 -
            (displayRadius - u_source_local_inner_radius) *
            (1.0 + u_contour_reach) /
            (u_source_local_outer_radius - u_source_local_inner_radius);
          float physicalRadius = u_source_local_reference_radius *
            pow(10.0, -0.5 * exponent);
          worldPoint = vec2(2.0 / 3.0, 0.5) +
            displayOffset * (physicalRadius / displayRadius);
        }
        if (u_pair_mode > 0.5 && (
          distance(worldPoint, vec2(u_electrino_x, 0.5)) <= u_source_mask_radius ||
          distance(worldPoint, vec2(u_positrino_x, 0.5)) <= u_source_mask_radius
        )) {
          gl_FragColor = vec4(u_zero, 1.0);
          return;
        }
        float rawValue;
        if (u_pair_mode > 0.5) {
          rawValue = sourceContribution(
            worldPoint,
            u_electrino_x,
            u_beta,
            -1.0,
            u_pair_time,
            0.0
          ) + sourceContribution(
            worldPoint,
            u_positrino_x,
            -u_beta,
            1.0,
            u_pair_time,
            0.0
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
        float exponent = rawValue == 0.0
          ? -u_exponent_span
          : log(abs(rawValue) / 64.0) / log(10.0);
        float clippedExponent = clamp(
          exponent,
          -u_exponent_span,
          u_exponent_span
        );
        float lowerDecade = floor(clippedExponent);
        float withinDecade = clippedExponent - lowerDecade;
        float decadeTone = lowerDecade + withinDecade * withinDecade *
          (3.0 - 2.0 * withinDecade);
        float linearStrength = clamp(
          (decadeTone + u_exponent_span) / (2.0 * u_exponent_span),
          0.0,
          1.0
        );
        float enhancedStrength = pow(linearStrength, 0.72);
        float physicalStrength = pow(
          clamp(
            (exponent + ${TOPO_DEFAULT_CONTOUR_REACH.toPrecision(12)}) /
              ${(
                TOPO_DEFAULT_CONTOUR_REACH + 1
              ).toPrecision(12)},
            0.0,
            1.0
          ),
          u_shading_power
        );
        float strength = mix(
          physicalStrength,
          enhancedStrength,
          u_enhanced_decade_contrast
        );
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
        "Topo analytic field program failed: " + fieldGl.getProgramInfoLog(program),
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
        "u_source_mask_radius",
        "u_polarity_sign",
        "u_exponent_span",
        "u_contour_reach",
        "u_shading_power",
        "u_enhanced_decade_contrast",
        "u_source_local_mode",
        "u_source_local_inner_radius",
        "u_source_local_outer_radius",
        "u_source_local_reference_radius",
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
      uniform float u_source_mask_radius;
      uniform float u_exponent_span;
      uniform float u_contour_reach;
      uniform float u_shading_power;
      uniform float u_enhanced_decade_contrast;
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

      float rawAt(vec2 point, float omega) {
        float negativeDelay = solveDelay(point, 3.141592653589793, omega);
        float positiveDelay = solveDelay(point, 0.0, omega);
        if (negativeDelay <= 0.0 || positiveDelay <= 0.0) return 1.0e30;
        return -u_kappa / (negativeDelay * negativeDelay) +
          u_kappa / (positiveDelay * positiveDelay);
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
        float negativeDelay = solveDelay(point, 3.141592653589793, omega);
        float positiveDelay = solveDelay(point, 0.0, omega);
        if (negativeDelay == 0.0) {
          if (u_scalar_pass > 0.5) { gl_FragColor = vec4(0.0, 0.0, -1.0, 1.0); return; }
          gl_FragColor = vec4(u_negative, 1.0);
          return;
        }
        if (positiveDelay == 0.0) {
          if (u_scalar_pass > 0.5) { gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); return; }
          gl_FragColor = vec4(u_positive, 1.0);
          return;
        }
        if (negativeDelay < 0.0 || positiveDelay < 0.0) {
          if (u_scalar_pass > 0.5) { gl_FragColor = vec4(0.0, 0.0, 2.0, 1.0); return; }
          gl_FragColor = vec4(u_zero, 1.0);
          return;
        }
        float rawValue = -u_kappa / (negativeDelay * negativeDelay) +
          u_kappa / (positiveDelay * positiveDelay);
        if (u_scalar_pass > 0.5) {
          gl_FragColor = vec4(rawValue, 1.0, 0.0, 1.0);
          return;
        }
        float exponent = rawValue == 0.0
          ? -u_exponent_span
          : log(abs(rawValue) / 64.0) / log(10.0);
        float clippedExponent = clamp(
          exponent,
          -u_exponent_span,
          u_exponent_span
        );
        float lowerDecade = floor(clippedExponent);
        float withinDecade = clippedExponent - lowerDecade;
        float decadeTone = lowerDecade + withinDecade * withinDecade *
          (3.0 - 2.0 * withinDecade);
        float linearStrength = clamp(
          (decadeTone + u_exponent_span) / (2.0 * u_exponent_span),
          0.0,
          1.0
        );
        float enhancedStrength = pow(linearStrength, 0.72);
        float physicalStrength = pow(
          clamp(
            (exponent + ${TOPO_DEFAULT_CONTOUR_REACH.toPrecision(12)}) /
              ${(
                TOPO_DEFAULT_CONTOUR_REACH + 1
              ).toPrecision(12)},
            0.0,
            1.0
          ),
          u_shading_power
        );
        float strength = mix(
          physicalStrength,
          enhancedStrength,
          u_enhanced_decade_contrast
        );
        float normalized = sign(rawValue) * strength;
        vec3 endpoint = normalized < 0.0 ? u_negative : u_positive;
        vec3 color = mix(u_zero, endpoint, abs(normalized));
        float levelExponent = rawValue == 0.0 ? -99.0 : exponent;
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
        "Topo circular-binary field program failed: " +
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
        "u_source_mask_radius",
        "u_exponent_span",
        "u_contour_reach",
        "u_shading_power",
        "u_enhanced_decade_contrast",
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
      uniform float u_exponent_span;
      uniform float u_shading_power;
      uniform float u_enhanced_decade_contrast;
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
        float exponent = rawValue == 0.0 ? -u_exponent_span : log(abs(rawValue) / 64.0) / log(10.0);
        float clipped = clamp(exponent, -u_exponent_span, u_exponent_span);
        float lower = floor(clipped);
        float within = clipped - lower;
        float linear = clamp((lower + within * within * (3.0 - 2.0 * within) + u_exponent_span) /
          (2.0 * u_exponent_span), 0.0, 1.0);
        float enhanced = pow(linear, 0.72);
        float physical = pow(clamp((exponent + ${TOPO_DEFAULT_CONTOUR_REACH.toPrecision(12)}) /
          ${(TOPO_DEFAULT_CONTOUR_REACH + 1).toPrecision(12)}, 0.0, 1.0), u_shading_power);
        float strength = mix(physical, enhanced, u_enhanced_decade_contrast);
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
      throw new Error("Topo binary scalar presentation program failed: " +
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
        "u_scalar_texture", "u_scalar_resolution", "u_exponent_span", "u_shading_power",
        "u_enhanced_decade_contrast", "u_negative", "u_zero", "u_positive",
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

  function getState() {
    const scenarioId = selectedScenarioId();
    const beta = Number(dom.beta.value);
    const specialistDisplay = dom.advancedDisplayEnabled.checked;
    const requestedView = dom.viewInputs.find((input) => input.checked)?.value;
    const automaticView = scenarioId === "electrino" || scenarioId === "positrino"
      ? beta === 0 ? "source-local" : "combined"
      : "combined";
    const baseState = {
      beta,
      specialistDisplay,
      viewMode: specialistDisplay && requestedView === "source-local"
        ? "source-local"
        : specialistDisplay && requestedView === "equal-radius"
          ? "equal-radius"
          : specialistDisplay
            ? "combined"
            : automaticView,
      heatmapMode: specialistDisplay && dom.heatmapModeInputs.find((input) => input.checked)
        ?.value === TOPO_HEATMAP_MODE.ENHANCED_DECADE_CONTRAST
        ? TOPO_HEATMAP_MODE.ENHANCED_DECADE_CONTRAST
        : TOPO_HEATMAP_MODE.PHYSICAL_MAGNITUDE,
      contourCount: normalizeTopoContourCount(dom.contourCount.value),
      contourRangeDecades: TOPO_DEFAULT_CONTOUR_REACH,
      shadingSpread: normalizeTopoShadingSpread(
        Number(dom.shadingSpread.value) / 100,
      ),
      contourVisibility: Number(dom.contourVisibility.value) / 100,
      displayScale: normalizeTopoDisplayScale(dom.displayScale.value),
      backgroundMode:
        dom.backgroundInputs.find((input) => input.checked)?.value === "white"
          ? "white"
          : "purple",
    };
    if (scenarioId === TOPO_COLLINEAR_PAIR_SCENARIO_ID) {
      return Object.freeze({
        ...baseState,
        scenarioId: TOPO_COLLINEAR_PAIR_SCENARIO_ID,
        pairMode: true,
        pairPhase: pairPlaybackPhase,
        polaritySign: 1,
      });
    }
    if (scenarioId === TOPO_CIRCULAR_BINARY_SCENARIO_ID) {
      const orbitalRadius = Number(dom.binaryRadius.value);
      const direction = dom.binaryDirectionInputs.find((input) => input.checked)
        ?.value === TOPO_CIRCULAR_BINARY_DIRECTION.CLOCKWISE
        ? TOPO_CIRCULAR_BINARY_DIRECTION.CLOCKWISE
        : TOPO_CIRCULAR_BINARY_DIRECTION.COUNTERCLOCKWISE;
      const playback = createTopoCircularBinaryPlayback({
        beta: baseState.beta,
        progress: binaryProgress,
        radius: orbitalRadius,
        direction,
      });
      return Object.freeze({
        ...baseState,
        scenarioId: TOPO_CIRCULAR_BINARY_SCENARIO_ID,
        binary: true,
        orbitalRadius,
        direction,
        playback,
        polaritySign: 0,
        showOrbitGuide: dom.binaryOrbitGuide.checked,
      });
    }
    return applyTopoScenarioPolarity(baseState, scenarioId);
  }

  function sourceLocalViewRequested(state) {
    return state.viewMode === "source-local";
  }

  function equalRadiusViewRequested(state) {
    return state.viewMode === "equal-radius";
  }

  function equalRadiusViewAvailable(state) {
    return topoEqualRadiusViewAvailable(state);
  }

  function sourceLocalViewAvailable(state) {
    return sourceLocalViewRequested(state) &&
      !state.pairMode && !state.binary && state.beta === 0;
  }

  function enforceAvailableView({ announce = false } = {}) {
    const state = getState();
    if (!state.specialistDisplay) {
      return false;
    }
    const sourceLocalUnavailable = sourceLocalViewRequested(state) &&
      !sourceLocalViewAvailable(state);
    const equalRadiusUnavailable = equalRadiusViewRequested(state) &&
      !equalRadiusViewAvailable(state);
    if (!sourceLocalUnavailable && !equalRadiusUnavailable) {
      return false;
    }
    const combinedInput = dom.viewInputs.find((input) =>
      input.value === "combined");
    if (combinedInput) {
      combinedInput.checked = true;
    }
    if (announce) {
      viewFallbackNotice = equalRadiusUnavailable
        ? "View switched to Combined wake because Equal-radius levels is only a stationary single-source display chart. Moving and multi-source scenes use contours from their combined raw wake field."
        : "View switched to Combined wake because Source-local levels does not yet have an accepted causal-history chart for moving or multi-source scenes.";
      windowLike.clearTimeout?.(viewFallbackTimer);
      viewFallbackTimer = windowLike.setTimeout?.(() => {
        viewFallbackNotice = "";
        updateControlPresentation();
        updateLegend();
      }, 4_000) ?? 0;
    }
    return true;
  }

  function createSourceLocalChart(width, height, pixelRatio, state) {
    if (!sourceLocalViewAvailable(state)) {
      return null;
    }
    return createTopoExponentRadiusChart({
      width,
      height,
      pixelRatio,
      sourceMarkerRadiusPixels: resolveTopoSourceMarkerRadius({
        width,
        height,
        pixelRatio,
      }),
      contourRangeDecades: state.contourRangeDecades,
      contourReach: TOPO_DEFAULT_CONTOUR_REACH,
      displayScale: state.displayScale,
    });
  }

  function resolveEqualRadiusAnchor(width, height, pixelRatio, state) {
    if (!equalRadiusViewAvailable(state)) {
      return null;
    }
    const geometry = sourceOverlayGeometry(
      width,
      height,
      pixelRatio,
      state.polaritySign,
      TOPO_SOURCE_POSITION,
      state.displayScale,
    );
    return Object.freeze({
      sourceId: state.scenarioId,
      polaritySign: state.polaritySign,
      displayedTime: 0,
      position: TOPO_SOURCE_POSITION,
      pixelX: geometry.x,
      pixelY: geometry.y,
    });
  }

  function createEqualRadiusChart(width, height, pixelRatio, state) {
    const anchor = resolveEqualRadiusAnchor(
      width,
      height,
      pixelRatio,
      state,
    );
    if (!anchor) {
      return null;
    }
    return Object.freeze({
      anchor,
      chart: createTopoEqualRadiusChart({
        width,
        height,
        pixelRatio,
        anchorPixelX: anchor.pixelX,
        anchorPixelY: anchor.pixelY,
        contourRangeDecades: state.contourRangeDecades,
        displayScale: state.displayScale,
      }),
    });
  }

  function updatePanelPresentation() {
    const collapsed = dom.app.dataset.panelCollapsed === "true";
    dom.collapse.innerHTML = createPanelCollapseIconSvg(collapsed);
    dom.collapse.setAttribute("aria-expanded", String(!collapsed));
    const accessibleName = collapsed
      ? "Expand Wake Topological Map controls"
      : "Collapse Wake Topological Map controls";
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
    const label = scale.toFixed(2) + "× · " +
      visibleHeight.toFixed(2) + " high";
    dom.app.dataset.displayScale = scale.toFixed(2);
    dom.app.dataset.visibleWorldHeight = visibleHeight.toFixed(4);
    dom.displayScaleOutput.value = label;
    dom.displayScaleOutput.textContent = label;
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
    dom.app.dataset.scenarioId = state.scenarioId;
    dom.app.dataset.scenario = state.scenarioId;
    dom.app.dataset.neutralBackground = state.backgroundMode;
    dom.app.dataset.heatmapMode = state.heatmapMode;
    dom.app.dataset.displayChoice = state.specialistDisplay
      ? "specialist"
      : "automatic";
    dom.app.dataset.contourCount = String(state.contourCount);
    dom.app.dataset.contourRadii = "";
    dom.app.dataset.contourPhysicalRadii = "";
    dom.app.dataset.shadingSpread = state.shadingSpread.toFixed(2);
    dom.app.dataset.sourceMarkerRadiusScale = String(
      TOPO_SOURCE_MARKER_RADIUS_SCALE,
    );
    dom.app.dataset.pairReplayPhase = pairPlaybackPhase.toFixed(5);
    dom.app.dataset.pairReplayPlaying = String(pairPlaybackPlaying);
    dom.app.dataset.pairTimelineScrubbing = String(pairTimelineScrubbing);
    dom.app.dataset.pairHistoryModel = pairMode
      ? TOPO_COLLINEAR_PAIR_HISTORY_MODEL
      : "";
    dom.betaOutput.value = "β = " + state.beta.toFixed(2);
    dom.betaOutput.textContent = dom.betaOutput.value;
    dom.beta.setAttribute(
      "aria-valuetext",
      "β = " + state.beta.toFixed(2) +
      (state.beta === 1
        ? ", exact field-speed endpoint"
        : state.beta === 0 && (pairMode || binaryMode)
          ? ", stationary; choose a positive beta to replay"
          : binaryMode
            ? ", sub-field-speed prescribed circular path"
            : ", sub-field-speed preview"),
    );
    const localAvailable = sourceLocalViewAvailable(state);
    const localUnavailable = sourceLocalViewRequested(state) && !localAvailable;
    const equalRadius = equalRadiusViewAvailable(state);
    const equalRadiusInput = dom.viewInputs.find((input) =>
      input.value === "equal-radius");
    if (equalRadiusInput) {
      equalRadiusInput.disabled = pairMode || binaryMode || state.beta !== 0;
      equalRadiusInput.setAttribute(
        "aria-description",
        equalRadiusInput.disabled
          ? "Available only for one stationary source at beta zero"
          : "Stationary single-source display chart",
      );
    }
    dom.coordinateMode.textContent = viewFallbackNotice || (equalRadius
      ? "Equal-radius level chart: the reference contour is one display step from the " +
        state.scenarioId +
        " and each selected higher-magnitude contour adds the same step. This stationary single-source chart is a display convention, not a global physical-coordinate transform."
      : localAvailable
      ? (state.specialistDisplay ? "Specialist" : "Automatic") +
        " Source-local level chart: equal radial steps represent equal wake-strength changes; the center mask is display-only"
      : localUnavailable
        ? "Source-local levels are not yet available for moving or multi-source scenes; choose Combined wake"
        : pairMode
          ? "Automatic Combined topology: shared linear coordinates with signed contributions summed before contours and shading"
          : binaryMode
            ? "Automatic Combined topology: shared linear coordinates with signed circular-binary contributions summed before display"
            : "Automatic Combined topology: shared linear coordinates with the calculated signed wake");
    dom.app.dataset.coordinateMode = equalRadius
      ? "selected-source-nonnegative-equal-radius"
      : localAvailable
      ? "source-local-exponent-decades"
      : localUnavailable
        ? "source-local-unavailable"
        : "combined-absolute-space";
    dom.binaryDirectionControl.hidden = !binaryMode;
    dom.binaryDirectionControl.inert = !binaryMode;
    const countText = state.pairMode || state.binary
      ? state.contourCount + " per sign + zero"
      : state.contourCount + " levels";
    const spreadText = Math.round(state.shadingSpread * 100) + "% · " +
      (state.shadingSpread >= 0.67
        ? "broad"
        : state.shadingSpread <= 0.33 ? "tight" : "balanced");
    dom.contourCountOutput.value = countText;
    dom.contourCountOutput.textContent = countText;
    dom.shadingSpreadOutput.value = spreadText;
    dom.shadingSpreadOutput.textContent = spreadText;
    dom.heatmapNote.textContent = state.heatmapMode ===
      TOPO_HEATMAP_MODE.PHYSICAL_MAGNITUDE
      ? "Physical magnitude uses the ordinary Shading spread control after the signed wake is calculated. Raw values, ordering, and contours do not change."
      : "Enhanced tenfold contrast is display-only; raw field values, contour locations, and frame identity do not change.";
    dom.contourCount.disabled = false;
    dom.contourCount.setAttribute(
      "aria-valuetext",
      countText + "; every line is a genuine equal-wake threshold",
    );
    dom.shadingSpread.setAttribute(
      "aria-valuetext",
      spreadText + "; display-only monotonic color transfer",
    );
    dom.contourVisibilityOutput.value = state.contourVisibility === 0
      ? "Hidden"
      : formatPercentage(state.contourVisibility);
    dom.contourVisibilityOutput.textContent = dom.contourVisibilityOutput.value;
    dom.contourVisibility.setAttribute(
      "aria-valuetext",
      dom.contourVisibilityOutput.value +
        "; overall display strength for the graded contour profile",
    );
    dom.contourVisibility.disabled = false;
    dom.contourControls.hidden = localUnavailable;
    dom.contourControls.inert = localUnavailable;
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
    dom.pairProgress.value = formatPercentage(pairPlaybackPhase);
    dom.pairProgress.textContent = dom.pairProgress.value;
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
    dom.legendTitle.textContent = localAvailable
      ? "Source-local wake-strength levels"
      : binaryMode
        ? "Signed equal-wake intensity"
        : "Signed ordinary values";
    dom.canvas.setAttribute(
      "aria-label",
      equalRadius
        ? "Equal-radius level chart for one stationary " +
          (state.polaritySign < 0 ? "electrino" : "positrino") +
          "; the reference contour and selected higher-magnitude contours use equal radial display steps"
        : localAvailable
        ? "Source-local wake-strength level chart for one stationary " +
          (state.polaritySign < 0 ? "electrino" : "positrino") +
          "; successive tenfold wake-strength changes use equal radial display steps, and the source center uses a display-only mask"
        : localUnavailable
          ? "Source-local levels are not yet available for this prescribed moving or multi-source scene"
          : binaryMode
        ? "Signed equal-wake map for prescribed antipodal circular electrino and positrino paths on a linear Euclidean plane, with genuine equal-value contours and an optional prescribed-orbit guide"
        : "Combined absolute-space Wake Topological Map: theoretical signed inverse-square wake intensity on a linear Euclidean chart, with genuine equal-wake contours",
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
      tooltip: "Reset to the orbit start",
    });
    const progressText = formatPercentage(state.playback.progress);
    dom.binaryTimeline.value = String(Math.round(
      state.playback.progress * Number(dom.binaryTimeline.max),
    ));
    dom.binaryTimeline.setAttribute(
      "aria-valuetext",
      enabled
        ? progressText + " of one orbit"
        : "Stationary at beta zero; playback unavailable",
    );
    dom.binaryProgressOutput.value = progressText;
    dom.binaryProgressOutput.textContent = dom.binaryProgressOutput.value;
    dom.app.dataset.binaryPlayback = enabled
      ? (binaryPlaying ? "playing" : state.playback.complete ? "complete" : "paused")
      : "stationary-disabled";
    dom.app.dataset.binaryProgress = state.playback.progress.toFixed(6);
    dom.app.dataset.binaryTimelineScrubbing = String(binaryTimelineScrubbing);
    dom.app.dataset.neutralBackground = state.backgroundMode;
    dom.app.dataset.heatmapMode = state.heatmapMode;
    dom.app.dataset.binaryBackground = state.binary ? state.backgroundMode : "";
    dom.app.dataset.binaryOrbitalRadius = state.orbitalRadius.toFixed(2);
    dom.app.dataset.binaryDirection = state.direction;
    dom.app.dataset.binaryAngularVelocity = state.playback.angularVelocity.toFixed(9);
    dom.app.dataset.binaryOrbitGuide = state.showOrbitGuide ? "solid" : "hidden";
    dom.app.dataset.binaryFrameIdentity = createTopoCircularBinaryFrameIdentity({
      beta: state.beta,
      progress: state.playback.progress,
      radius: state.orbitalRadius,
      direction: state.direction,
    });
  }

  function updateLegend() {
    const state = getState();
    const styles = readStyles(state);
    const localAvailable = sourceLocalViewAvailable(state);
    const localUnavailable = sourceLocalViewRequested(state) && !localAvailable;
    const equalRadius = equalRadiusViewAvailable(state);
    const heatmapDescription = state.heatmapMode ===
      TOPO_HEATMAP_MODE.PHYSICAL_MAGNITUDE
      ? "monotonic signed-wake shading at " +
        Math.round(state.shadingSpread * 100) + "% spread"
      : "enhanced tenfold contrast; display-only analytical transfer";
    dom.legendMapping.textContent = equalRadius
      ? "Stationary single-source display chart · the reference contour plus " +
        state.contourCount + " selected equal-value contours" +
        " use fixed equal radial steps · field values and physical radii unchanged · not a global physical-coordinate transform"
      : localAvailable
      ? "Source-local wake-strength levels · equal wake-strength changes use equal radial display steps · center mask is display-only · " +
        state.contourCount + " genuine levels · " + heatmapDescription
      : localUnavailable
        ? "Source-local levels are not yet available here; Combined wake preserves the absolute-space calculated map"
        : "Combined absolute-space wake · signed contributions are summed before both contours and shading · " +
      state.contourCount + " genuine levels per sign · " + heatmapDescription + " · " +
      styles.backgroundMode + " neutral" +
      (state.binary
        ? " · shared linear plane · contours are equal combined-wake values, not prescribed circles or asserted equipotential surfaces" + (state.showOrbitGuide
            ? " · solid circle = prescribed orbit"
            : "")
        : " · shared linear plane · equal-value contours");
    dom.legendGradient.style.background = state.pairMode || state.binary
      ? "linear-gradient(90deg, " + styles.negative + ", " +
        styles.zero + ", " + styles.positive + ")"
      : "linear-gradient(90deg, " +
        (state.polaritySign < 0 ? styles.negative : styles.positive) + ", " +
        styles.zero + ")";
    dom.legendGradient.setAttribute(
      "aria-label",
      (equalRadius
        ? "Equal-radius selected-source display chart "
        : localAvailable ? "Source-local " : "Combined wake ") +
      (equalRadius
        ? "shows the reference contour and selected higher-magnitude contours"
        : "shows " + state.contourCount + " equal-value contour levels") +
      "; heatmap mode is " + heatmapDescription +
      "; negative values are blue, neutral is " + styles.backgroundMode +
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
    const whiteBackground = state?.backgroundMode === "white";
    const styles = {
      negative: readHexToken(
        windowLike,
        dom.app,
        "--ui-data-negative",
        "#2563eb",
      ),
      zero: whiteBackground
        ? "#ffffff"
        : readHexToken(
          windowLike,
          dom.app,
          "--ui-color-electric-purple",
          "#8f00ff",
        ),
      positive: readHexToken(
        windowLike,
        dom.app,
        "--ui-data-positive",
        "#dc2626",
      ),
      polaritySign: state?.polaritySign ?? -1,
      pairMode: state?.pairMode === true,
      binary: state?.binary === true,
      backgroundMode: whiteBackground ? "white" : "purple",
      exponentSpan: topoContourRangeDecades(state?.contourRangeDecades),
      shadingSpread: normalizeTopoShadingSpread(
        state?.shadingSpread ?? TOPO_DEFAULT_SHADING_SPREAD,
      ),
      heatmapMode: state?.heatmapMode ?? TOPO_HEATMAP_MODE.PHYSICAL_MAGNITUDE,
    };
    styles.negativeRgb = hexToRgb(styles.negative);
    styles.zeroRgb = hexToRgb(styles.zero);
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
      const sourceMarkerWorldRadius = resolveTopoSourceMarkerRadius({
        width,
        height,
        pixelRatio: effectivePixelRatio(width, height),
      }) / Math.max(1, width - 1);
      const sourceMaskRadius = TOPO_SOURCE_MASK_MARKER_RATIO *
        sourceMarkerWorldRadius;
      fieldGl.uniform1f(
        uniforms.u_source_mask_radius,
        sourceMaskRadius,
      );
      fieldGl.uniform1f(
        uniforms.u_exponent_span,
        topoContourRangeDecades(state.contourRangeDecades),
      );
      fieldGl.uniform1f(uniforms.u_contour_reach, TOPO_DEFAULT_CONTOUR_REACH);
      fieldGl.uniform1f(
        uniforms.u_shading_power,
        topoShadingPower(state.shadingSpread),
      );
      fieldGl.uniform1f(
        uniforms.u_enhanced_decade_contrast,
        state.heatmapMode === TOPO_HEATMAP_MODE.ENHANCED_DECADE_CONTRAST
          ? 1
          : 0,
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
      const contourLevels = createTopoSignedContourLevels({
        contourCount: state.contourCount,
        contourReach: TOPO_DEFAULT_CONTOUR_REACH,
      });
      const rawDecades = contourLevels
        .filter((level) => Number.isFinite(level.rawDecade))
        .map((level) => level.rawDecade);
      const shaderLevels = new Float32Array(25);
      shaderLevels.set(rawDecades.slice(0, shaderLevels.length));
      fieldGl.uniform1fv(uniforms["u_contour_levels[0]"], shaderLevels);
      fieldGl.uniform1f(uniforms.u_contour_count, rawDecades.length);
      fieldGl.uniform1f(
        uniforms.u_contour_visibility,
        state.contourVisibility,
      );
      // Pass 1: the authoritative combined signed wake is evaluated once into
      // the scalar texture. Every visible field and contour pixel below reads it.
      fieldGl.bindFramebuffer(fieldGl.FRAMEBUFFER, topoScalarFramebuffer.framebuffer);
      fieldGl.viewport(0, 0, width, height);
      fieldGl.uniform1f(uniforms.u_scalar_pass, 1);
      fieldGl.drawArrays(fieldGl.TRIANGLES, 0, 3);
      const diagnosticPhase = topoBinaryDiagnosticsEnabled && state.beta === 1
        ? topoPassTwoDiagnosticPhase(state.playback.progress)
        : null;
      const scalarAuditKey = diagnosticPhase != null
        ? `${width}x${height}:beta-one-phase-${diagnosticPhase.toFixed(3)}`
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
            sourceMaskRadius,
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
          const diagnosticLevels = createTopoSignedContourLevels({
            contourCount: 13,
            contourReach: TOPO_DEFAULT_CONTOUR_REACH,
          }).filter((level) => level.family === "negative" || level.family === "positive");
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
            const signedSymmetry = diagnosticLevels.filter((level) => level.family === "positive")
              .map((positive) => {
                const negative = table.find((row) => row.family === "negative" &&
                  row.rawDecade === positive.rawDecade);
                const matched = table.find((row) => row.family === "positive" &&
                  row.rawDecade === positive.rawDecade);
                return Object.freeze({
                  rawDecade: positive.rawDecade,
                  cpuPathComponents: negative?.cpuPathComponents === matched?.cpuPathComponents,
                  gpuMaskComponents: negative?.gpuMaskComponents === matched?.gpuMaskComponents,
                });
              });
            const passed = table.every((row) =>
              row.cpuPathComponents === row.gpuMaskComponents &&
              row.p95 <= 1 && row.max <= 1 && row.invalidBridgePixels === 0,
            ) && signedSymmetry.every((row) => row.cpuPathComponents && row.gpuMaskComponents);
            dom.app.dataset.binaryPassTwoDiagnosticDraw = passed ? "complete" : "comparison-failed";
            dom.app.dataset.binaryPassTwoDiagnosticResolution = `${width}x${height}`;
            dom.app.dataset.binaryPassTwoDiagnosticThreshold = "all-26-signed-raw-levels";
            dom.app.dataset.binaryPassTwoDiagnosticAllLevels = JSON.stringify(table);
            dom.app.dataset.binaryPassTwoDiagnosticSignedSymmetry = JSON.stringify(signedSymmetry);
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
        throw new Error("Topo scalar presentation renderer is unavailable.");
      }
      const visibleLevels = contourLevels.slice(0, TOPO_BINARY_GPU_CONTOUR_MAX_LEVELS);
      const contourBounds = topoContourLevelBounds(visibleLevels);
      const levelValues = new Float32Array(TOPO_BINARY_GPU_CONTOUR_MAX_LEVELS);
      const levelOpacities = new Float32Array(TOPO_BINARY_GPU_CONTOUR_MAX_LEVELS);
      const levelHalfWidths = new Float32Array(TOPO_BINARY_GPU_CONTOUR_MAX_LEVELS);
      const levelParities = new Float32Array(TOPO_BINARY_GPU_CONTOUR_MAX_LEVELS);
      const pixelRatio = effectivePixelRatio(width, height);
      visibleLevels.forEach((level, index) => {
        const contourStyle = topoContourStyle(level, contourBounds, state.contourVisibility);
        levelValues[index] = level.value;
        levelOpacities[index] = contourStyle.opacity;
        levelHalfWidths[index] = Math.max(0.5, contourStyle.widthCss * pixelRatio / 2);
        levelParities[index] = topoMarchingSquaresLevelIdentity(level.value) % 2;
      });
      const scalarPresentation = circularBinaryScalarPresentationRenderer;
      fieldGl.useProgram(scalarPresentation.program);
      fieldGl.bindBuffer(fieldGl.ARRAY_BUFFER, scalarPresentation.buffer);
      fieldGl.enableVertexAttribArray(scalarPresentation.position);
      fieldGl.vertexAttribPointer(scalarPresentation.position, 2, fieldGl.FLOAT, false, 0, 0);
      fieldGl.activeTexture(fieldGl.TEXTURE0);
      fieldGl.bindTexture(fieldGl.TEXTURE_2D, topoScalarFramebuffer.texture);
      fieldGl.uniform1i(scalarPresentation.uniforms.u_scalar_texture, 0);
      fieldGl.uniform2f(scalarPresentation.uniforms.u_scalar_resolution, width, height);
      fieldGl.uniform1f(scalarPresentation.uniforms.u_exponent_span,
        topoContourRangeDecades(state.contourRangeDecades));
      fieldGl.uniform1f(scalarPresentation.uniforms.u_shading_power,
        topoShadingPower(state.shadingSpread));
      fieldGl.uniform1f(scalarPresentation.uniforms.u_enhanced_decade_contrast,
        state.heatmapMode === TOPO_HEATMAP_MODE.ENHANCED_DECADE_CONTRAST ? 1 : 0);
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
      dom.app.dataset.lastColorRemapCacheHit = "gpu-direct-signed-log10";
      dom.app.dataset.lastFieldPaintMs = String(elapsed);
      dom.app.dataset.binaryContourRenderer = "gpu-scalar-marching-squares-current-frame";
      return true;
    } catch (error) {
      circularBinaryFieldRenderer = null;
      circularBinaryScalarPresentationRenderer = null;
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
      const pairSourceMaskRadius = resolveTopoCollinearSourceMaskRadius({
        width,
        height,
        pixelRatio: effectivePixelRatio(width, height),
      });
      fieldGl.uniform1f(
        uniforms.u_source_mask_radius,
        state.pairMode ? pairSourceMaskRadius : 0,
      );
      dom.app.dataset.pairSourceMaskWorldRadius = state.pairMode
        ? pairSourceMaskRadius.toFixed(9)
        : "";
      fieldGl.uniform1f(uniforms.u_polarity_sign, state.polaritySign);
      fieldGl.uniform1f(
        uniforms.u_exponent_span,
        topoContourRangeDecades(state.contourRangeDecades),
      );
      fieldGl.uniform1f(uniforms.u_contour_reach, TOPO_DEFAULT_CONTOUR_REACH);
      fieldGl.uniform1f(
        uniforms.u_shading_power,
        topoShadingPower(state.shadingSpread),
      );
      fieldGl.uniform1f(
        uniforms.u_enhanced_decade_contrast,
        state.heatmapMode === TOPO_HEATMAP_MODE.ENHANCED_DECADE_CONTRAST
          ? 1
          : 0,
      );
      const sourceLocalChart = createSourceLocalChart(
        width,
        height,
        effectivePixelRatio(width, height),
        state,
      );
      const commonScale = Math.max(1, height - 1) * state.displayScale;
      fieldGl.uniform1f(
        uniforms.u_source_local_mode,
        sourceLocalChart ? 1 : 0,
      );
      fieldGl.uniform1f(
        uniforms.u_source_local_inner_radius,
        sourceLocalChart ? sourceLocalChart.innerRadiusPixels / commonScale : 0,
      );
      fieldGl.uniform1f(
        uniforms.u_source_local_outer_radius,
        sourceLocalChart ? sourceLocalChart.outerRadiusPixels / commonScale : 1,
      );
      fieldGl.uniform1f(
        uniforms.u_source_local_reference_radius,
        sourceLocalChart?.referencePhysicalRadius ?? 1,
      );
      dom.app.dataset.coordinateChart = sourceLocalChart?.chartId ??
        "linear-euclidean";
      if (sourceLocalChart) {
        dom.app.dataset.exponentRadiusStepPixels =
          sourceLocalChart.radialStepPixels.toFixed(4);
      } else {
        delete dom.app.dataset.exponentRadiusStepPixels;
      }
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
    }) * displayScale;
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
    displayScale = TOPO_DEFAULT_DISPLAY_SCALE,
  ) {
    const markerStyle = createTopoVisibleMarkerPaintStyle({
      polaritySign,
      width,
      height,
      pixelRatio,
      displayScale,
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
      displayScale,
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
        displayScale,
      ),
    });
  }

  function drawCircularBinaryOverlay({
    width,
    height,
    pixelRatio,
    state,
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
      const whiteBackground = state.backgroundMode === "white";
      targetContext.globalAlpha = whiteBackground ? 0.58 : 0.68;
      targetContext.strokeStyle = whiteBackground
        ? readHexToken(
          windowLike,
          dom.app,
          "--ui-color-electric-purple",
          "#8f00ff",
        )
        : "#f2e6ff";
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
        }) * state.displayScale,
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
        state.displayScale,
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
    dom.app.dataset.binaryOrbitGuideColor = state.backgroundMode === "white"
      ? "electric-purple"
      : "pale-lavender";
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
      state.backgroundMode,
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
    styles = { backgroundMode: "purple" },
  ) {
    const y = (1 - TOPO_SOURCE_POSITION.y) * Math.max(1, height - 1);
    const startX = TOPO_TRANSLATION_AXIS.startX * Math.max(1, width - 1);
    const endX = TOPO_TRANSLATION_AXIS.endX * Math.max(1, width - 1);
    const arrow = TOPO_TRANSLATION_AXIS.arrowCss * pixelRatio;
    targetContext.save();
    targetContext.globalAlpha = TOPO_TRANSLATION_AXIS.opacity;
    targetContext.strokeStyle = styles.backgroundMode === "white"
      ? readHexToken(
        windowLike,
        dom.app,
        "--ui-color-electric-purple",
        "#8f00ff",
      )
      : "rgb(" + [WHITE.r, WHITE.g, WHITE.b].join(",") + ")";
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
    sourceLocal = false,
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
      const normalizeColor = sourceLocal
        ? normalizeTopoExponentRadiusColorValue
        : normalizeTopoFieldColorValue;
      const normalized = normalizeColor(signedRawValue, {
        mode: styles.heatmapMode,
        span: styles.exponentSpan,
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
          width,
          height,
          pixelRatio: 1,
        }),
      })
      : state.pairMode
      ? createTopoCollinearPairRawSampler({
        beta: state.beta,
        phase: state.pairPhase,
        horizontalWorldSpan: horizontalWorldSpanForCanvas(width, height),
        sourceMaskRadius: resolveTopoCollinearSourceMaskRadius({
          width,
          height,
          pixelRatio: 1,
        }),
      })
      : createTopoSyntheticRawSampler({
        ...state,
        polaritySign: 1,
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
    return [-1, 1].flatMap((sourceSign) => {
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
    const sourceLocalChart = createSourceLocalChart(
      previewWidth,
      previewHeight,
      1,
      state,
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
        const sourceLocalSample = sourceLocalChart
          ? topoExponentRadiusPhysicalPointForCanvasPixel({
            pixelX,
            pixelY,
            width: previewWidth,
            height: previewHeight,
            chart: sourceLocalChart,
            displayScale: state.displayScale,
          })
          : null;
        const worldPoint = sourceLocalChart
          ? sourceLocalSample.physicalPoint
          : state.binary
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
          Boolean(sourceLocalChart),
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
      state.beta.toFixed(4),
      "scale=" + state.displayScale.toFixed(2),
      state.binary
        ? state.playback.progress.toFixed(6) + ":" +
          state.orbitalRadius.toFixed(2) + ":" + state.direction
        : state.pairMode
          ? state.pairPhase.toFixed(5)
          : sourceLocalViewAvailable(state)
            ? "source-local"
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
    const sourceLocalChart = createSourceLocalChart(width, height, 1, state);
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
          const sourceLocalSample = sourceLocalChart
            ? topoExponentRadiusPhysicalPointForCanvasPixel({
              pixelX,
              pixelY: row,
              width,
              height,
              chart: sourceLocalChart,
              displayScale: state.displayScale,
            })
            : null;
          const worldPoint = sourceLocalChart
            ? sourceLocalSample.physicalPoint
            : state.binary
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
    const displayKey = TOPO_DISPLAY_MAPPING_ID + ":" + state.heatmapMode +
      ":spread=" + state.shadingSpread.toFixed(2) +
      ":" + state.polaritySign + ":" + state.backgroundMode;
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
            sourceLocalViewAvailable(state),
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
  function drawSampledCombinedContours({
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
    delete dom.app.dataset.equalRadiusAnchorSource;
    delete dom.app.dataset.equalRadiusAnchorDisplayedTime;
    delete dom.app.dataset.equalRadiusAnchorPosition;
    delete dom.app.dataset.equalRadiusStepPixels;
    delete dom.app.dataset.equalRadiusFormula;
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
    const contourLevels = createTopoSignedContourLevels({
      contourCount: state.contourCount,
      contourReach: TOPO_DEFAULT_CONTOUR_REACH,
    });
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
            ? styles.backgroundMode === "white"
              ? readHexToken(
                  windowLike,
                  dom.app,
                  "--ui-color-electric-purple",
                  "#8f00ff",
                )
              : "#f2e6ff"
            : family === "positive"
              ? styles.backgroundMode === "white" ? "#a00024" : "#ffb3c1"
              : styles.backgroundMode === "white" ? "#003a9e" : "#adc6ff";
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
            ? styles.backgroundMode === "white" ? "#a00024" : "#ffb3c1"
            : styles.backgroundMode === "white" ? "#003a9e" : "#adc6ff";
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
    }
    if (state.binary) {
      drawCircularBinaryOverlay({
        width,
        height,
        pixelRatio,
        state,
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
    dom.app.dataset.contourScalarAuthority = "combined-raw-wake-field";
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
        TOPO_BINARY_SOURCE_REFINEMENT_GRID_SIZE + "² samples"
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
      state.backgroundMode,
      state.displayScale.toFixed(2),
      contourKey,
    ].join(":");
    if (interactionStarted !== null) {
      dom.app.dataset.lastFirstContourLatencyMs = String(Math.round(
        (windowLike.performance?.now?.() ?? Date.now()) - interactionStarted,
      ));
    }
    return true;
  }

  function drawEqualRadiusChart({
    width,
    height,
    pixelRatio,
    state,
    styles,
    revision,
    interactionStarted = null,
  }) {
    const paintStarted = windowLike.performance?.now?.() ?? Date.now();
    const resolved = createEqualRadiusChart(
      width,
      height,
      pixelRatio,
      state,
    );
    if (!resolved) {
      return false;
    }
    const { anchor, chart } = resolved;
    const physicalCircles = createTopoSyntheticContourRenderPlan({
      beta: 0,
      contourRangeDecades: state.contourRangeDecades,
    });
    const selectedCircles = physicalCircles
      .filter(({ rawDecade }) => rawDecade >= 0)
      .sort((left, right) => left.rawDecade - right.rawDecade)
      .map((circle) => Object.freeze({
        ...circle,
        polaritySign: anchor.polaritySign,
        displayRadiusPixels: topoEqualRadiusDisplayRadiusForExponent({
          exponent: circle.rawDecade,
          chart,
        }),
      }));
    const contourLevelBounds = topoContourLevelBounds(selectedCircles);
    if (
      contourStagingCanvas.width !== width ||
      contourStagingCanvas.height !== height
    ) {
      contourStagingCanvas.width = width;
      contourStagingCanvas.height = height;
    } else {
      contourStagingContext.clearRect(0, 0, width, height);
    }
    const contourForeground = anchor.polaritySign < 0
      ? styles.backgroundMode === "white" ? "#003a9e" : "#adc6ff"
      : styles.backgroundMode === "white" ? "#a00024" : "#ffb3c1";
    if (state.contourVisibility > 0) {
      selectedCircles.forEach((circle) => {
        const contourStyle = topoContourStyle(
          circle,
          contourLevelBounds,
          state.contourVisibility,
        );
        contourStagingContext.save();
        contourStagingContext.beginPath();
        contourStagingContext.arc(
          anchor.pixelX,
          anchor.pixelY,
          circle.displayRadiusPixels,
          0,
          Math.PI * 2,
        );
        contourStagingContext.strokeStyle = contourForeground;
        contourStagingContext.globalAlpha = contourStyle.opacity;
        contourStagingContext.lineWidth = contourStyle.widthCss * pixelRatio;
        contourStagingContext.stroke();
        contourStagingContext.restore();
      });
    }
    clearContourMapLabels();
    if (state.binary) {
      const centerX = TOPO_CIRCULAR_BINARY_CENTER.x * Math.max(1, width - 1);
      const centerY = Math.max(1, height - 1) / 2;
      if (state.showOrbitGuide) {
        contourStagingContext.save();
        contourStagingContext.globalAlpha = state.backgroundMode === "white"
          ? 0.58
          : 0.68;
        contourStagingContext.strokeStyle = state.backgroundMode === "white"
          ? readHexToken(
            windowLike,
            dom.app,
            "--ui-color-electric-purple",
            "#8f00ff",
          )
          : "#f2e6ff";
        contourStagingContext.lineWidth = Math.max(1, pixelRatio);
        contourStagingContext.beginPath();
        contourStagingContext.arc(
          centerX,
          centerY,
          state.orbitalRadius * Math.max(1, width - 1),
          0,
          Math.PI * 2,
        );
        contourStagingContext.stroke();
        contourStagingContext.restore();
      }
      for (const sourceSign of [-1, 1]) {
        const position = topoCircularBinarySourcePosition({
          sourceSign,
          time: state.playback.observationTime,
          beta: state.beta,
          radius: state.orbitalRadius,
          direction: state.direction,
        });
        drawSourceMarker(
          contourStagingContext,
          position.x * Math.max(1, width - 1),
          centerY -
            (position.y - TOPO_CIRCULAR_BINARY_CENTER.y) *
              Math.max(1, width - 1),
          width,
          height,
          pixelRatio,
          sourceSign,
          state.displayScale,
        );
      }
    } else if (state.pairMode) {
      drawPairSourceOverlays(
        contourStagingContext,
        width,
        height,
        pixelRatio,
        anchor.pairSources,
        state.displayScale,
      );
    } else {
      drawSourceOverlay(
        contourStagingContext,
        width,
        height,
        pixelRatio,
        anchor.polaritySign,
        anchor.position,
        state.displayScale,
      );
    }
    if (revision !== frameRevision) {
      return false;
    }
    contourContext.clearRect(0, 0, width, height);
    contourContext.drawImage(contourStagingCanvas, 0, 0);
    dom.app.dataset.coordinateChart = chart.chartId;
    dom.app.dataset.equalRadiusAnchorSource = anchor.sourceId;
    dom.app.dataset.equalRadiusAnchorDisplayedTime =
      anchor.displayedTime.toFixed(9);
    dom.app.dataset.equalRadiusAnchorPosition =
      anchor.position.x.toFixed(9) + "," + anchor.position.y.toFixed(9);
    dom.app.dataset.equalRadiusStepPixels = chart.radialStepPixels.toFixed(4);
    dom.app.dataset.equalRadiusFormula = "R(e)=(e+1)r";
    dom.app.dataset.contourSpanPolicy = "nonnegative-raw-exponents-only";
    dom.app.dataset.contourRadii = selectedCircles
      .map(({ displayRadiusPixels }) => displayRadiusPixels.toFixed(4))
      .join(",");
    dom.app.dataset.contourPhysicalRadii = physicalCircles
      .map(({ radius }) => radius.toFixed(10))
      .join(",");
    dom.app.dataset.visibleContourExponents = selectedCircles
      .map(({ rawDecade }) => rawDecade)
      .join(",");
    dom.app.dataset.contourRangeDecades =
      topoContourRangeDecades(state.contourRangeDecades).toFixed(0);
    dom.app.dataset.contourGeometryKey = [
      chart.chartId,
      anchor.sourceId,
      anchor.displayedTime.toFixed(9),
      state.contourRangeDecades.toFixed(0),
      state.displayScale.toFixed(2),
      width,
      height,
    ].join(":");
    dom.app.dataset.contourWeightPolicy = TOPO_CONTOUR_WEIGHT_POLICY_ID;
    dom.app.dataset.contourWeightProfile = topoContourWeightProfile(
      selectedCircles,
      contourLevelBounds,
    );
    delete dom.app.dataset.exponentRadiusStepPixels;
    lastContourPresentationKey = [
      chart.chartId,
      anchor.sourceId,
      anchor.displayedTime.toFixed(9),
      state.contourRangeDecades.toFixed(0),
      state.contourVisibility.toFixed(4),
      state.backgroundMode,
      state.displayScale.toFixed(2),
      width,
      height,
    ].join(":");
    dom.app.dataset.contourRenderCount = String(
      Number(dom.app.dataset.contourRenderCount ?? 0) + 1,
    );
    dom.app.dataset.lastContourPathCacheHit = "display-chart";
    dom.app.dataset.lastContourPathMs = "0";
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
    if (equalRadiusViewAvailable(state)) {
      return drawEqualRadiusChart({
        width,
        height,
        pixelRatio,
        state,
        styles,
        revision,
        interactionStarted,
      });
    }
    if (state.binary) {
      if (circularBinaryScalarPresentationRenderer && topoScalarFramebuffer.available) {
        drawCircularBinaryOverlay({
          width,
          height,
          pixelRatio,
          state,
          revision,
        });
        dom.app.dataset.contourFrameKind = "gpu-current-frame";
        dom.app.dataset.contourFrameResolution = width + "x" + height;
        dom.app.dataset.contourScalarAuthority = "combined-raw-wake-field";
        return true;
      }
      return rawFrame
        ? drawSampledCombinedContours({
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
          revision,
        });
    }
    if (state.pairMode) {
      return drawSampledCombinedContours({
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
    const sourceLocalChart = createSourceLocalChart(
      width,
      height,
      pixelRatio,
      state,
    );
    const circles = sourceLocalChart
      ? physicalCircles.map((circle) => ({
        ...circle,
        center: TOPO_SOURCE_POSITION,
        radius: topoExponentDisplayRadiusForExponent({
          exponent: circle.rawDecade,
          chart: sourceLocalChart,
        }) / commonScale,
      }))
      : physicalCircles;
    const sourcePixelX = TOPO_SOURCE_POSITION.x * Math.max(1, width - 1);
    const sourcePixelY = (1 - TOPO_SOURCE_POSITION.y) *
      Math.max(1, height - 1);
    const markerRadius = resolveTopoSourceMarkerRadius({
      width,
      height,
      pixelRatio,
    }) * state.displayScale;
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
      state.viewMode,
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
    dom.app.dataset.coordinateChart = sourceLocalChart?.chartId ??
      "linear-euclidean";
    delete dom.app.dataset.logRadiusStepPixels;
    delete dom.app.dataset.radiusDecadeLabels;
    delete dom.app.dataset.radiusDecadeRadii;
    delete dom.app.dataset.logRadiusReference;
    if (sourceLocalChart) {
      dom.app.dataset.exponentRadiusStepPixels =
        sourceLocalChart.radialStepPixels.toFixed(4);
    } else {
      delete dom.app.dataset.exponentRadiusStepPixels;
    }
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
        ? styles.backgroundMode === "white" ? "#003a9e" : "#adc6ff"
        : styles.backgroundMode === "white" ? "#a00024" : "#ffb3c1";
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
      state.viewMode,
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
      dom.status.textContent =
        "Full-density circular-binary contours complete from the combined signed wake; the orbit circle is a reference path only.";
      return;
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
    if (state.pairMode) {
      drawSyntheticContours({
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
    windowLike.clearTimeout?.(renderWatchdogTimer);
    dom.app.dataset.frameState = "complete";
    dom.app.dataset.lastFullDensityLatencyMs = String(Math.round(
      (windowLike.performance?.now?.() ?? Date.now()) - interactionStarted,
    ));
    dom.status.textContent = equalRadiusViewAvailable(state)
      ? "Equal-radius level chart complete. The reference contour and " +
        topoContourRangeDecades(state.contourRangeDecades) +
        " selected higher-magnitude contours use fixed display-radius steps around the selected source at the displayed time; calculated field values and physical radii are unchanged."
      : state.binary
      ? "Prescribed circular-binary heatmap complete. The solid orbit is a reference path only; no dynamics, binding, or stability claim is attached."
      : state.beta === 1
      ? state.pairMode
        ? "Two-source prescribed-prehistory superposition complete at the field-speed endpoint; unavailable leading roots remain neutral."
        : "Full-density synthetic frame complete. Signed ordinary wake intensity has no value in front; no value was fabricated."
      : state.pairMode
        ? "Two-source constant-velocity prescribed-prehistory signed superposition complete. Prescribed paths are display-only."
        : "One-source full-density synthetic frame complete. No TOPO-001 values are shown.";
  }

  function paintUnavailableSourceLocalView(width, height, pixelRatio, styles) {
    context.save();
    context.fillStyle = styles.zero;
    context.fillRect(0, 0, width, height);
    context.fillStyle = styles.backgroundMode === "white"
      ? "#3a2352"
      : "#f2e6ff";
    context.font = 600 + " " + 14 * pixelRatio +
      "px Helvetica Neue, Arial, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(
      "Source-local levels are not yet available for this scene",
      width / 2,
      height / 2,
      width - 40 * pixelRatio,
    );
    context.restore();
    contourContext.clearRect(0, 0, width, height);
    dom.app.dataset.coordinateChart = "unavailable:source-local";
    delete dom.app.dataset.exponentRadiusStepPixels;
    dom.app.dataset.contourRenderCount = "0";
    dom.app.dataset.majorDecadeLabels = "";
    dom.app.dataset.majorDecadeLabelPositions = "";
  }

  function beginRender({ finalDelay = 0, redrawContours = true } = {}) {
    const interactionStarted = windowLike.performance?.now?.() ?? Date.now();
    frameRevision += 1;
    const revision = frameRevision;
    const state = getState();
    updateControlPresentation();
    updateLegend();
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
      if (sourceLocalViewRequested(state) && !sourceLocalViewAvailable(state)) {
        paintUnavailableSourceLocalView(width, height, pixelRatio, styles);
        windowLike.clearTimeout?.(renderWatchdogTimer);
        dom.app.dataset.frameState = "complete";
        dom.status.textContent =
          "Source-local levels are not yet available for moving or multi-source scenes. Combined wake remains available.";
        return;
      }
      const grid = rawGridSize();
      const cachedRawFrame = rawFrameCaches.get(
        createRawFrameKey(grid.width, grid.height, state),
      ) ?? null;
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
        state.displayScale.toFixed(2),
        state.binary ? state.showOrbitGuide : state.contourVisibility.toFixed(4),
        state.binary
          ? state.backgroundMode + ":" + state.direction
          : state.polaritySign + ":" + state.backgroundMode + ":" +
            state.viewMode,
      ].join(":");
      if (
        redrawContours ||
        contourResized ||
        lastContourPresentationKey !== contourPresentationKey
      ) {
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
        dom.status.textContent = equalRadiusViewAvailable(state)
          ? "Equal-radius level chart complete; the reference contour and selected higher-magnitude contours use fixed equal radial steps."
          : state.binary
          ? "Prescribed circular-binary signed-wake map and contours complete; solid circle is a reference orbit only."
          : "Analytic synthetic field and contours complete.";
      } else if (state.pairMode && (pairPlaybackPlaying || pairTimelineScrubbing)) {
        windowLike.clearTimeout?.(renderWatchdogTimer);
        dom.app.dataset.frameState = "playback-preview";
        dom.status.textContent =
          "Prescribed collinear playback preview; live Combined wake contours follow the current prescribed-time field. Full-density contours settle when paused or scrubbing ends.";
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
    beginRender({ finalDelay: 90 });
  }

  function scheduleContourChange() {
    const interactionStarted = windowLike.performance?.now?.() ?? Date.now();
    frameRevision += 1;
    const revision = frameRevision;
    const state = getState();
    updateControlPresentation();
    updateLegend();
    windowLike.cancelAnimationFrame?.(renderRequest);
    windowLike.clearTimeout?.(finalRenderTimer);
    windowLike.clearTimeout?.(renderWatchdogTimer);
    renderRequest = windowLike.requestAnimationFrame?.(() => {
      if (revision !== frameRevision) {
        return;
      }
      const { width, height } = canvasSize();
      const pixelRatio = effectivePixelRatio(width, height);
      const styles = readStyles(state);
      const grid = rawGridSize();
      const cachedRawFrame = rawFrameCaches.get(
        createRawFrameKey(grid.width, grid.height, state),
      ) ?? null;
      if ((state.pairMode && !cachedRawFrame) ||
          (state.binary && !binaryPlaying && !binaryTimelineScrubbing &&
            !(circularBinaryScalarPresentationRenderer && topoScalarFramebuffer.available))) {
        beginRender({ finalDelay: 0, redrawContours: true });
        return;
      }
      dom.app.dataset.lastPreviewLatencyMs = String(Math.round(
        (windowLike.performance?.now?.() ?? Date.now()) - interactionStarted,
      ));
      dom.app.dataset.frameState = "complete";
      dom.status.textContent = "Updating contour lines from the cached field.";
      const complete = drawSyntheticContours({
        width,
        height,
        pixelRatio,
        state,
        styles,
        revision,
        rawFrame: state.binary &&
          !(circularBinaryScalarPresentationRenderer && topoScalarFramebuffer.available)
          ? createLiveSampledContourFrame(width, height, state)
          : cachedRawFrame,
      });
      if (complete && revision === frameRevision) {
        dom.app.dataset.lastFullDensityLatencyMs = String(Math.round(
          (windowLike.performance?.now?.() ?? Date.now()) - interactionStarted,
        ));
        dom.status.textContent =
          "Contour overlay updated from the same cached raw and field frame.";
      }
    }) ?? 0;
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
    beginRender({ finalDelay: 0, redrawContours: true });
  }

  function startPairPlayback({ restart = false } = {}) {
    if (pairPlaybackPlaying && !restart) {
      return;
    }
    if (
      selectedScenarioId() !== TOPO_COLLINEAR_PAIR_SCENARIO_ID ||
      Number(dom.beta.value) <= 0
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
    beginRender({ finalDelay: 0, redrawContours: true });
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
              Number(dom.beta.value),
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
    windowLike.cancelAnimationFrame?.(binaryAnimationRequest);
    binaryAnimationRequest = windowLike.requestAnimationFrame?.(
      runBinaryPlaybackFrame,
    ) ?? 0;
  }

  function toggleBinaryPlayback() {
    if (binaryPlaying) {
      stopBinaryPlayback();
      beginRender({ finalDelay: 0, redrawContours: true });
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
  installRangeInteraction(dom.pairTimeline, {
    onInteractionStart: beginPairTimelineScrub,
    onInteractionEnd: endPairTimelineScrub,
  });
  installRangeInteraction(dom.binaryTimeline, {
    onInteractionStart: beginBinaryTimelineScrub,
    onInteractionEnd: endBinaryTimelineScrub,
  });
  function handleScenarioChange(event) {
    if (event && event.target?.checked !== true) {
      return;
    }
    const handFocusToStage = scenarioPointerActivation;
    scenarioPointerActivation = false;
    enforceAvailableView({ announce: true });
    resetPairPlayback();
    stopBinaryPlayback();
    binaryProgress = 0;
    const reducedMotion = windowLike.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches === true;
    if (
      selectedScenarioId() === TOPO_COLLINEAR_PAIR_SCENARIO_ID &&
      Number(dom.beta.value) > 0 &&
      !reducedMotion
    ) {
      startPairPlayback({ restart: true });
    } else {
      scheduleFrameChange();
    }
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
  listen(dom.beta, "input", () => {
    enforceAvailableView({ announce: true });
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
  });
  listen(dom.binaryRadius, "input", () => {
    stopBinaryPlayback();
    binaryProgress = 0;
    scheduleFrameChange();
  });
  listen(dom.binaryOrbitGuide, "change", scheduleFrameChange);
  dom.binaryDirectionInputs.forEach((input) =>
    listen(input, "change", () => {
      stopBinaryPlayback();
      binaryProgress = 0;
      scheduleFrameChange();
    }));
  dom.backgroundInputs.forEach((input) =>
    listen(input, "change", scheduleFrameChange));
  listen(dom.displayScale, "input", () => {
    updateDisplayScalePresentation();
    scheduleFrameChange();
  });
  dom.viewInputs.forEach((input) =>
    listen(input, "change", () => {
      enforceAvailableView({ announce: true });
      scheduleFrameChange();
    }));
  dom.heatmapModeInputs.forEach((input) =>
    listen(input, "change", scheduleFrameChange));
  listen(dom.advancedDisplayEnabled, "change", () => {
    enforceAvailableView({ announce: true });
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
  });
  listen(documentLike, "keydown", (event) => {
    if (!topoGlobalTransportOwnsSpace(event)) {
      return;
    }
    if (
      selectedScenarioId() === TOPO_COLLINEAR_PAIR_SCENARIO_ID &&
      Number(dom.beta.value) > 0
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
  listen(dom.home, "click", () => {
    navigateStandaloneAppHome(
      windowLike.location,
      resolveStandaloneAppHomeHref(windowLike.location?.href),
      {
        windowLike,
        returnHref: windowLike.location?.href,
      },
    );
  });
  listen(dom.back, "click", () => windowLike.history?.back?.());
  listen(dom.forward, "click", () => windowLike.history?.forward?.());

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
      windowLike.clearTimeout?.(viewFallbackTimer);
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
      sceneSearchRuntime.destroy();
    },
    render,
  });
}
