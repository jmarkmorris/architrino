import { createPanelCollapseIconSvg } from "../../runtime/PanelCollapseIcons.js";
import {
  TRANSPORT_CONTROL_ICON,
  setTransportControlButtonPresentation,
} from "../../runtime/TransportControlIcons.js";
import {
  TOPO_DEFAULT_DISPLAY_SCALE,
  TOPO_DISPLAY_MAPPING_ID,
  TOPO_HEATMAP_MODE,
  TOPO_INVERSE_SQUARE_SCALE,
  TOPO_SOURCE_POSITION,
  TOPO_TRANSLATION_AXIS,
  applyTopoScenarioPolarity,
  createTopoEqualRadiusChart,
  createTopoExponentRadiusChart,
  createTopoSequentialContourStyle,
  createTopoSyntheticContourRenderPlan,
  createTopoSyntheticRawSampler,
  normalizeTopoExponentRadiusColorValue,
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
  extractTopoSampledFieldContourSegments,
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
  ARCHITRINO_BODY_OUTLINE_WIDTH,
  DEFAULT_TRANSMISSION_POINT_MARKER_VARIANT,
  TRANSMISSION_POINT_MARKER_STYLES,
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
// Keep live marching-squares cells below 2.3 canvas pixels at the desktop stage.
export const TOPO_PAIR_PLAYBACK_CONTOUR_GRID_WIDTH = 400;
export const TOPO_PAIR_CROSSING_CONTOUR_GRID_WIDTH = 480;
export const TOPO_PAIR_CROSSING_PHASE_START = 0.42;
export const TOPO_PAIR_CROSSING_PHASE_END = 0.66;

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
    contours: requireElement(documentLike, "#topo-contours"),
    contoursOutput: requireElement(documentLike, "#topo-contours-output"),
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
    pairReplay: requireElement(documentLike, "#topo-pair-replay"),
    pairProgress: requireElement(documentLike, "#topo-pair-progress"),
    binaryTransport: requireElement(documentLike, "#topo-binary-transport"),
    binaryPlay: requireElement(documentLike, "#topo-binary-play"),
    binaryReplay: requireElement(documentLike, "#topo-binary-replay"),
    binaryProgress: requireElement(documentLike, "#topo-binary-progress"),
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
  let scenarioPointerActivation = false;
  let viewFallbackNotice = "";
  let viewFallbackTimer = 0;
  let binaryProgress = 0;
  let binaryPlaying = false;
  let binaryPlaybackStartedAt = null;
  let binaryPlaybackStartProgress = 0;
  let binaryAnimationRequest = 0;
  let rawFrameCache = null;
  let lastContourPresentationKey = null;
  const rawFrameCaches = new Map();
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
  const fieldGl = analyticFieldCanvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: true,
  });

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
      uniform float u_beta;
      uniform float u_pair_mode;
      uniform float u_pair_time;
      uniform float u_electrino_x;
      uniform float u_positrino_x;
      uniform float u_source_mask_radius;
      uniform float u_polarity_sign;
      uniform float u_exponent_span;
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
        float sourceX = (2.0 / 3.0) * max(1.0, u_size.x - 1.0);
        float sourceY = 0.5 * max(1.0, u_size.y - 1.0);
        vec2 worldPoint = vec2(
          (2.0 / 3.0) + (pixel.x - sourceX) / commonScale,
          0.5 + (pixel.y - sourceY) / commonScale
        );
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
          float exponent = u_exponent_span -
            (displayRadius - u_source_local_inner_radius) *
            (2.0 * u_exponent_span) /
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
        float physicalStrength = clamp(abs(rawValue) / 64.0, 0.0, 1.0);
        float sourceLocalLegendStrength = clamp(
          (clippedExponent + u_exponent_span) / (2.0 * u_exponent_span),
          0.0,
          1.0
        );
        physicalStrength = mix(
          physicalStrength,
          sourceLocalLegendStrength,
          u_source_local_mode
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
        "u_beta",
        "u_pair_mode",
        "u_pair_time",
        "u_electrino_x",
        "u_positrino_x",
        "u_source_mask_radius",
        "u_polarity_sign",
        "u_exponent_span",
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
      uniform float u_enhanced_decade_contrast;
      uniform vec3 u_negative;
      uniform vec3 u_zero;
      uniform vec3 u_positive;

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
          gl_FragColor = vec4(u_negative, 1.0);
          return;
        }
        if (positiveDelay == 0.0) {
          gl_FragColor = vec4(u_positive, 1.0);
          return;
        }
        if (negativeDelay < 0.0 || positiveDelay < 0.0) {
          gl_FragColor = vec4(u_zero, 1.0);
          return;
        }
        float rawValue = -u_kappa / (negativeDelay * negativeDelay) +
          u_kappa / (positiveDelay * positiveDelay);
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
        float physicalStrength = clamp(abs(rawValue) / 64.0, 0.0, 1.0);
        float strength = mix(
          physicalStrength,
          enhancedStrength,
          u_enhanced_decade_contrast
        );
        float normalized = sign(rawValue) * strength;
        vec3 endpoint = normalized < 0.0 ? u_negative : u_positive;
        gl_FragColor = vec4(mix(u_zero, endpoint, abs(normalized)), 1.0);
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
        "u_enhanced_decade_contrast",
        "u_negative",
        "u_zero",
        "u_positive",
      ].map((name) => [name, fieldGl.getUniformLocation(program, name)])),
    };
  }

  let analyticFieldRenderer = null;
  let circularBinaryFieldRenderer = null;
  try {
    analyticFieldRenderer = createAnalyticFieldRenderer();
    circularBinaryFieldRenderer = createCircularBinaryFieldRenderer();
  } catch (error) {
    dom.app.dataset.fieldRendererError = String(error?.message ?? error);
  }
  dom.app.dataset.fieldRenderer = analyticFieldRenderer && circularBinaryFieldRenderer
    ? "webgl-analytic"
    : "cpu-reference";

  function listen(target, eventName, handler, eventOptions) {
    target.addEventListener(eventName, handler, eventOptions);
    listeners.push(() =>
      target.removeEventListener?.(eventName, handler, eventOptions));
  }

  function installRangeInteraction(input) {
    let activePointerId = null;
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
      input.focus();
      input.setPointerCapture?.(event.pointerId);
      setValueFromPointer(event);
    });
    listen(input, "pointermove", (event) => {
      if (!topoRangePointerMoveOwnsInteraction(event, activePointerId)) {
        if (event.pointerId === activePointerId) {
          activePointerId = null;
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
      if (input.hasPointerCapture?.(event.pointerId)) {
        input.releasePointerCapture?.(event.pointerId);
      }
    });
    listen(input, "pointercancel", (event) => {
      if (event.pointerId === activePointerId) {
        activePointerId = null;
      }
    });
    listen(input, "lostpointercapture", (event) => {
      if (event.pointerId === activePointerId) {
        activePointerId = null;
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
        setValue(nextValue);
      }
    });
  }

  function selectedScenarioId() {
    return dom.scenarioInputs.find((input) => input.checked)?.value ??
      "electrino";
  }

  function getState() {
    const requestedView = dom.viewInputs.find((input) => input.checked)?.value;
    const baseState = {
      beta: Number(dom.beta.value),
      viewMode: requestedView === "source-local"
        ? "source-local"
        : requestedView === "equal-radius"
          ? "equal-radius"
          : "combined",
      heatmapMode: dom.heatmapModeInputs.find((input) => input.checked)
        ?.value === TOPO_HEATMAP_MODE.ENHANCED_DECADE_CONTRAST
        ? TOPO_HEATMAP_MODE.ENHANCED_DECADE_CONTRAST
        : TOPO_HEATMAP_MODE.PHYSICAL_MAGNITUDE,
      contourRangeDecades: Number(dom.contours.value),
      contourVisibility: Number(dom.contourVisibility.value) / 100,
      displayScale: normalizeTopoDisplayScale(dom.displayScale.value),
      backgroundMode:
        dom.backgroundInputs.find((input) => input.checked)?.value === "white"
          ? "white"
          : "purple",
    };
    if (selectedScenarioId() === TOPO_COLLINEAR_PAIR_SCENARIO_ID) {
      return Object.freeze({
        ...baseState,
        scenarioId: TOPO_COLLINEAR_PAIR_SCENARIO_ID,
        pairMode: true,
        pairPhase: pairPlaybackPhase,
        polaritySign: 1,
      });
    }
    if (selectedScenarioId() === TOPO_CIRCULAR_BINARY_SCENARIO_ID) {
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
    return applyTopoScenarioPolarity(baseState, selectedScenarioId());
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
        ? "View switched to Combined wake because Equal-radius exponents is only a stationary single-source display chart. Moving and multi-source scenes use contours from their combined raw wake field."
        : "View switched to Combined wake because Source-local decades does not yet have an accepted causal-history chart for moving or multi-source scenes.";
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
      });
      const lowerRight = topoWorldPointForCanvasPixel({
        pixelX: Math.max(0, width - 1),
        pixelY: Math.max(0, height - 1),
        width,
        height,
        displayScale: state.displayScale,
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
    dom.app.dataset.sourceMarkerRadiusScale = String(
      TOPO_SOURCE_MARKER_RADIUS_SCALE,
    );
    dom.app.dataset.pairReplayPhase = pairPlaybackPhase.toFixed(5);
    dom.app.dataset.pairReplayPlaying = String(pairPlaybackPlaying);
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
      ? "Equal-radius exponent chart: e=0 is one display step from the " +
        state.scenarioId +
        " and each +1 exponent adds the same step; only e≥0 rings are shown. This stationary single-source chart is a display convention, not a global physical-coordinate transform."
      : localAvailable
      ? "Source-local display chart: equal radial steps are equal wake-strength exponent steps; the center mask is display-only"
      : localUnavailable
        ? "Source-local decades are not yet available for moving or multi-source scenes; choose Combined wake"
        : pairMode
          ? "Combined absolute-space wake: linear Euclidean x-y with calculated signed contributions from constant-velocity prescribed incoming prehistory"
          : "Combined absolute-space wake: linear Euclidean x-y with calculated signed contributions");
    dom.app.dataset.coordinateMode = equalRadius
      ? "selected-source-nonnegative-equal-radius"
      : localAvailable
      ? "source-local-exponent-decades"
      : localUnavailable
        ? "source-local-unavailable"
        : "combined-absolute-space";
    dom.binaryDirectionControl.hidden = !binaryMode;
    dom.binaryDirectionControl.inert = !binaryMode;
    const selectedRange = topoContourRangeDecades(state.contourRangeDecades);
    const rangeText = "±" + selectedRange +
      (selectedRange === 1 ? " decade" : " decades");
    dom.contoursOutput.value = rangeText;
    dom.contoursOutput.textContent = dom.contoursOutput.value;
    dom.heatmapNote.textContent = state.heatmapMode ===
      TOPO_HEATMAP_MODE.PHYSICAL_MAGNITUDE
      ? "Physical magnitude: isolated wake intensity falls rapidly; each lower decade contributes one tenth as much fill. Contours remain visible."
      : "Enhanced decade contrast is display-only; raw field values, contour locations, and frame identity do not change.";
    dom.contours.disabled = false;
    dom.contours.setAttribute(
      "aria-valuetext",
      rangeText + " around the reference; one contour per factor of 10 in wake intensity",
    );
    dom.contourVisibilityOutput.value = state.contourVisibility === 0
      ? "Hidden"
      : formatPercentage(state.contourVisibility);
    dom.contourVisibilityOutput.textContent = dom.contourVisibilityOutput.value;
    dom.contourVisibility.disabled = false;
    dom.contourControls.hidden = binaryMode || localUnavailable;
    dom.contourControls.inert = binaryMode || localUnavailable;
    dom.binaryRadiusControl.hidden = !binaryMode;
    dom.binaryRadiusControl.inert = !binaryMode;
    dom.binaryOrbitGuideControl.hidden = !binaryMode;
    dom.binaryOrbitGuideControl.inert = !binaryMode;
    dom.pairTransport.hidden = !pairMode;
    dom.pairProgress.value = formatPercentage(pairPlaybackPhase);
    dom.pairProgress.textContent = dom.pairProgress.value;
    dom.pairPlay.disabled = pairMode && state.beta <= 0;
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
      label: "Replay collinear crossing",
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
      ? "Source-local wake-strength exponent"
      : binaryMode
        ? "Signed equal-wake intensity"
        : "Signed ordinary values";
    dom.canvas.setAttribute(
      "aria-label",
      localAvailable
        ? "Source-local wake-strength exponent chart for one stationary " +
          (state.polaritySign < 0 ? "electrino" : "positrino") +
          "; equal integer exponent changes use equal radial display steps, and the source center uses a display-only mask"
        : localUnavailable
          ? "Source-local decades are not yet available for this prescribed moving or multi-source scene"
          : binaryMode
        ? "Signed equal-wake-intensity heatmap for prescribed antipodal circular electrino and positrino paths on a linear Euclidean plane, with an optional prescribed-orbit guide and no contour overlay"
        : "Combined absolute-space Wake Topological Map: theoretical signed inverse-square wake intensity on a linear Euclidean chart, with contours at integer wake-strength exponents",
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
      label: "Replay",
      tooltip: "Replay one orbit",
    });
    const percentage = Math.round(state.playback.progress * 100);
    dom.binaryProgress.setAttribute("aria-valuenow", String(percentage));
    dom.binaryProgress.setAttribute(
      "aria-valuetext",
      enabled
        ? percentage + "% of one orbit"
        : "Stationary at beta zero; playback unavailable",
    );
    dom.binaryProgress.querySelector("span").style.width = percentage + "%";
    dom.binaryProgressOutput.value = percentage + "%";
    dom.binaryProgressOutput.textContent = dom.binaryProgressOutput.value;
    dom.app.dataset.binaryPlayback = enabled
      ? (binaryPlaying ? "playing" : state.playback.complete ? "complete" : "paused")
      : "stationary-disabled";
    dom.app.dataset.binaryProgress = state.playback.progress.toFixed(6);
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
    const span = topoContourRangeDecades(state.contourRangeDecades);
    const localAvailable = sourceLocalViewAvailable(state);
    const localUnavailable = sourceLocalViewRequested(state) && !localAvailable;
    const equalRadius = equalRadiusViewAvailable(state);
    const heatmapDescription = state.heatmapMode ===
      TOPO_HEATMAP_MODE.PHYSICAL_MAGNITUDE
      ? "physical magnitude fill; each lower exponent decade contributes one tenth as much color"
      : "enhanced decade contrast; display-only analytical transfer";
    dom.legendMapping.textContent = equalRadius
      ? "Stationary single-source display chart · nonnegative exponent rings e=0 to e=" +
        span + " · radius R(e)=(e+1)r · field values and physical radii unchanged · not a global physical-coordinate transform"
      : localAvailable
      ? "Source-local wake-strength exponent · equal integer exponent steps use equal radial display steps · center mask is display-only · e from " +
        span + " to −" + span + " · " + heatmapDescription
      : localUnavailable
        ? "Source-local decades are not yet available here; Combined wake preserves the absolute-space calculated map"
        : "Combined absolute-space wake · one contour per factor of 10 in wake intensity; sign is shown by color · e from " +
      span + " to −" +
      span + " · " + heatmapDescription + " · " +
      styles.backgroundMode + " neutral" +
      (state.binary
        ? " · linear plane · heatmap only" + (state.showOrbitGuide
            ? " · solid circle = prescribed orbit"
            : "")
        : " · linear plane · integer-e iso-value contours");
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
      "wake-intensity exponent magnitude runs from " +
      (equalRadius ? "e equals zero to e equals " + span :
        "e equals " + span + " to e equals minus " + span) +
      "; heatmap mode is " + heatmapDescription +
      "; negative values are blue, neutral is " + styles.backgroundMode +
      ", and positive values are red" +
      (state.binary && state.showOrbitGuide
        ? "; solid circle marks the prescribed orbit"
        : ""),
    );
    const labels = equalRadius
      ? Array.from({ length: span + 1 }, (_, index) => "e=" + index)
      : Array.from(
        { length: 2 * span + 1 },
        (_, index) => "e=" + (span - index),
      );
    dom.legendTicks.replaceChildren(...labels.map((label) => {
      const span = documentLike.createElement("span");
      span.textContent = label;
      return span;
    }));
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
      const { program, position, uniforms } = circularBinaryFieldRenderer;
      fieldGl.viewport(0, 0, width, height);
      fieldGl.useProgram(program);
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
      fieldGl.drawArrays(fieldGl.TRIANGLES, 0, 3);
      if (fieldGl.getError() !== fieldGl.NO_ERROR) {
        throw new Error("WebGL reported a circular-binary field-rendering error.");
      }
      context.drawImage(analyticFieldCanvas, 0, 0, width, height);
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
      dom.app.dataset.lastRawProviderCacheHit = "gpu-bisection";
      dom.app.dataset.lastColorRemapMs = "0";
      dom.app.dataset.lastColorRemapCacheHit = "gpu-direct-signed-log10";
      dom.app.dataset.lastFieldPaintMs = String(elapsed);
      return true;
    } catch (error) {
      circularBinaryFieldRenderer = null;
      dom.app.dataset.fieldRenderer = "cpu-reference";
      dom.app.dataset.fieldRendererError = String(error?.message ?? error);
      return false;
    }
  }

  function paintAnalyticField(width, height, state, styles) {
    if (state.binary) {
      return paintCircularBinaryField(width, height, state, styles);
    }
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
    position = TOPO_SOURCE_POSITION,
    displayScale = TOPO_DEFAULT_DISPLAY_SCALE,
  ) {
    const pixel = topoCanvasPixelForWorldPoint({
      worldX: position.x,
      worldY: position.y,
      width,
      height,
      displayScale,
    });
    const radius = resolveTopoSourceMarkerRadius({
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
    const radius = resolveTopoSourceMarkerRadius({
      width,
      height,
      pixelRatio,
    }) * displayScale;
    const sourceColor = polaritySign < 0
      ? PHOTON_CHARGE_COLORS.electrino
      : PHOTON_CHARGE_COLORS.positrino;
    targetContext.save();
    targetContext.fillStyle = sourceColor;
    targetContext.beginPath();
    targetContext.arc(x, y, radius, 0, Math.PI * 2);
    targetContext.fill();
    targetContext.lineWidth = Math.max(
      1,
      ARCHITRINO_BODY_OUTLINE_WIDTH * pixelRatio,
    );
    targetContext.strokeStyle =
      "rgb(" + [WHITE.r, WHITE.g, WHITE.b].join(",") + ")";
    targetContext.stroke();
    const originStyle = TRANSMISSION_POINT_MARKER_STYLES[
      DEFAULT_TRANSMISSION_POINT_MARKER_VARIANT
    ];
    targetContext.globalAlpha = originStyle.fillAlpha;
    targetContext.fillStyle =
      "rgb(" + [WHITE.r, WHITE.g, WHITE.b].join(",") + ")";
    targetContext.beginPath();
    targetContext.arc(
      x,
      y,
      Math.max(
        0.75,
        originStyle.radius * pixelRatio * TOPO_SOURCE_MARKER_RADIUS_SCALE,
      ),
      0,
      Math.PI * 2,
    );
    targetContext.fill();
    targetContext.restore();
  }

  function drawSourceOverlay(
    targetContext,
    width,
    height,
    pixelRatio,
    polaritySign,
    position = TOPO_SOURCE_POSITION,
    displayScale = TOPO_DEFAULT_DISPLAY_SCALE,
  ) {
    const { x, y } = sourceOverlayGeometry(
      width,
      height,
      pixelRatio,
      position,
      displayScale,
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
    const positioned = sources.map((source) => ({
      source,
      geometry: sourceOverlayGeometry(
        width,
        height,
        pixelRatio,
        source.position,
        displayScale,
      ),
    }));
    const [first, second] = positioned;
    if (
      !first ||
      !second ||
      Math.abs(first.geometry.x - second.geometry.x) >=
        first.geometry.radius + second.geometry.radius
    ) {
      positioned.forEach(({ source }) => drawSourceOverlay(
        targetContext,
        width,
        height,
        pixelRatio,
        source.polaritySign,
        source.position,
        displayScale,
      ));
      return;
    }
    const ordered = positioned.slice().sort((left, right) =>
      left.geometry.x - right.geometry.x);
    const splitX = (ordered[0].geometry.x + ordered[1].geometry.x) / 2;
    ordered.forEach(({ source }, index) => {
      targetContext.save();
      targetContext.beginPath();
      if (index === 0) {
        targetContext.rect(0, 0, splitX, height);
      } else {
        targetContext.rect(splitX, 0, width - splitX, height);
      }
      targetContext.clip();
      drawSourceOverlay(
        targetContext,
        width,
        height,
        pixelRatio,
        source.polaritySign,
        source.position,
        displayScale,
      );
      targetContext.restore();
    });
  }

  function drawCircularBinaryOverlay({
    width,
    height,
    pixelRatio,
    state,
    revision,
  }) {
    if (
      contourStagingCanvas.width !== width ||
      contourStagingCanvas.height !== height
    ) {
      contourStagingCanvas.width = width;
      contourStagingCanvas.height = height;
    } else {
      contourStagingContext.clearRect(0, 0, width, height);
    }
    const centerX = TOPO_CIRCULAR_BINARY_CENTER.x * Math.max(1, width - 1);
    const centerY = Math.max(1, height - 1) / 2;
    const worldPixelScale = Math.max(1, width - 1) * state.displayScale;
    const orbitPixelRadius = state.orbitalRadius * worldPixelScale;
    if (state.showOrbitGuide) {
      contourStagingContext.save();
      const whiteBackground = state.backgroundMode === "white";
      contourStagingContext.globalAlpha = whiteBackground ? 0.58 : 0.68;
      contourStagingContext.strokeStyle = whiteBackground
        ? readHexToken(
          windowLike,
          dom.app,
          "--ui-color-electric-purple",
          "#8f00ff",
        )
        : "#f2e6ff";
      contourStagingContext.lineWidth = Math.max(1, pixelRatio);
      contourStagingContext.setLineDash([]);
      contourStagingContext.beginPath();
      contourStagingContext.arc(
        centerX,
        centerY,
        orbitPixelRadius,
        0,
        Math.PI * 2,
      );
      contourStagingContext.stroke();
      contourStagingContext.restore();
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
        x: centerX +
          (position.x - TOPO_CIRCULAR_BINARY_CENTER.x) * worldPixelScale,
        y: centerY -
          (position.y - TOPO_CIRCULAR_BINARY_CENTER.y) *
            worldPixelScale,
      };
    });
    const markerRadius = resolveTopoSourceMarkerRadius({
      width,
      height,
      pixelRatio,
    }) * state.displayScale;
    const markerDistance = Math.hypot(
      sourceMarkers[1].x - sourceMarkers[0].x,
      sourceMarkers[1].y - sourceMarkers[0].y,
    );
    const markersOverlap = markerDistance < 2 * markerRadius;
    sourceMarkers.forEach((marker, index) => {
      contourStagingContext.save();
      if (markersOverlap && markerDistance > 0) {
        const midpointX = (sourceMarkers[0].x + sourceMarkers[1].x) / 2;
        const midpointY = (sourceMarkers[0].y + sourceMarkers[1].y) / 2;
        const normalX = (sourceMarkers[1].x - sourceMarkers[0].x) / markerDistance;
        const normalY = (sourceMarkers[1].y - sourceMarkers[0].y) / markerDistance;
        const tangentX = -normalY;
        const tangentY = normalX;
        const side = index === 0 ? -1 : 1;
        const extent = 3 * Math.max(width, height);
        contourStagingContext.beginPath();
        contourStagingContext.moveTo(
          midpointX + tangentX * extent,
          midpointY + tangentY * extent,
        );
        contourStagingContext.lineTo(
          midpointX - tangentX * extent,
          midpointY - tangentY * extent,
        );
        contourStagingContext.lineTo(
          midpointX - tangentX * extent + side * normalX * extent,
          midpointY - tangentY * extent + side * normalY * extent,
        );
        contourStagingContext.lineTo(
          midpointX + tangentX * extent + side * normalX * extent,
          midpointY + tangentY * extent + side * normalY * extent,
        );
        contourStagingContext.closePath();
        contourStagingContext.clip();
      }
      drawSourceMarker(
        contourStagingContext,
        marker.x,
        marker.y,
        width,
        height,
        pixelRatio,
        marker.sourceSign,
        state.displayScale,
      );
      contourStagingContext.restore();
    });
    dom.app.dataset.binaryMarkerOverlap = markersOverlap
      ? "split-perpendicular-bisector"
      : "separate";
    if (revision !== frameRevision) {
      return false;
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

  function drawMajorDecadeLabels(
    targetContext,
    circles,
    width,
    height,
    pixelRatio,
    state,
    sourcePixelPosition = null,
  ) {
    if (state.contourVisibility === 0) {
      dom.app.dataset.majorDecadeLabels = "";
      dom.app.dataset.majorDecadeLabelPositions = "";
      return;
    }
    const commonScale = Math.max(1, height - 1) * state.displayScale;
    const sourcePixelX = sourcePixelPosition?.x ??
      TOPO_SOURCE_POSITION.x * Math.max(1, width - 1);
    const sourcePixelY = sourcePixelPosition?.y ??
      (1 - TOPO_SOURCE_POSITION.y) * Math.max(1, height - 1);
    const markerRadius = resolveTopoSourceMarkerRadius({
      width,
      height,
      pixelRatio,
    }) * state.displayScale;
    const edgeInset = 8 * pixelRatio;
    const labelGap = 5 * pixelRatio;
    const labels = [];
    targetContext.save();
    targetContext.fillStyle = state.backgroundMode === "white"
      ? readHexToken(
        windowLike,
        dom.app,
        "--ui-color-electric-purple",
        "#8f00ff",
      )
      : "rgb(" + [WHITE.r, WHITE.g, WHITE.b].join(",") + ")";
    const fontFamily = windowLike.getComputedStyle?.(dom.app)?.fontFamily ||
      "Helvetica Neue, Arial, sans-serif";
    targetContext.font = 9 * pixelRatio + "px " + fontFamily;
    targetContext.textAlign = "center";
    targetContext.textBaseline = "middle";
    const occupied = [];
    const positions = [];
    circles.forEach((circle) => {
      if (!circle.majorDecade || circle.revealWeight < 0.25) {
        return;
      }
      const centerX = sourcePixelX +
        (circle.center.x - TOPO_SOURCE_POSITION.x) * commonScale;
      const centerY = sourcePixelY -
        (circle.center.y - TOPO_SOURCE_POSITION.y) * commonScale;
      const radius = circle.radius * commonScale;
      targetContext.globalAlpha = 0.82 * circle.revealWeight;
      const label = circle.signedMajorDecadeLabel ?? circle.majorDecadeLabel;
      const textWidth = targetContext.measureText(label).width;
      const boxWidth = textWidth + 8 * pixelRatio;
      const boxHeight = 13 * pixelRatio;
      if (radius <= markerRadius + 16 * pixelRatio) {
        return;
      }
      const candidates = [
        { x: centerX, y: centerY - radius - labelGap },
        {
          x: centerX - radius - labelGap - boxWidth / 2,
          y: centerY,
        },
        { x: centerX + radius + labelGap, y: centerY },
        { x: centerX, y: centerY + radius + labelGap },
      ];
      const candidate = candidates.find(({ x, y }) => {
        const box = {
          left: x - boxWidth / 2,
          right: x + boxWidth / 2,
          top: y - boxHeight / 2,
          bottom: y + boxHeight / 2,
        };
        if (
          box.left < edgeInset || box.right > width - edgeInset ||
          box.top < edgeInset || box.bottom > height - edgeInset
        ) {
          return false;
        }
        const distanceFromSource = Math.hypot(
          x - sourcePixelX,
          y - sourcePixelY,
        );
        if (distanceFromSource <= markerRadius + boxWidth / 2 + labelGap) {
          return false;
        }
        return !occupied.some((other) => !(
          box.right + labelGap < other.left ||
          box.left - labelGap > other.right ||
          box.bottom + labelGap < other.top ||
          box.top - labelGap > other.bottom
        ));
      });
      if (!candidate) {
        return;
      }
      const labelX = candidate.x;
      const labelY = candidate.y;
      targetContext.fillText(
        label,
        labelX,
        labelY,
      );
      labels.push(label);
      occupied.push({
        left: labelX - boxWidth / 2,
        right: labelX + boxWidth / 2,
        top: labelY - boxHeight / 2,
        bottom: labelY + boxHeight / 2,
      });
      positions.push(
        label + "@" +
        Math.round(labelX / pixelRatio) + "," +
        Math.round(labelY / pixelRatio),
      );
    });
    targetContext.restore();
    dom.app.dataset.majorDecadeLabels = labels.join(",");
    dom.app.dataset.majorDecadeLabelPositions = positions.join(";");
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
            ? "source-local:" +
              topoContourRangeDecades(state.contourRangeDecades)
            : "linear",
    ].join(":");
  }

  function createPairPlaybackContourFrame(width, height, state) {
    const gridWidth = resolveTopoPairPlaybackContourGridWidth({
      canvasWidth: width,
      phase: state.pairPhase,
    });
    const gridHeight = Math.max(
      2,
      Math.round(gridWidth * height / Math.max(1, width)),
    );
    const raw = new Float32Array(gridWidth * gridHeight);
    const sampleStates = new Uint8Array(raw.length);
    const sampleRaw = createRawSamplerForState(state, width, height);
    for (let pixelY = 0; pixelY < gridHeight; pixelY += 1) {
      for (let pixelX = 0; pixelX < gridWidth; pixelX += 1) {
        const worldPoint = topoWorldPointForCanvasPixel({
          pixelX,
          pixelY,
          width: gridWidth,
          height: gridHeight,
          displayScale: state.displayScale,
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
      contourFrameKind: "playback-preview",
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
      ":" + topoContourRangeDecades(state.contourRangeDecades) +
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
  function drawSampledPairContours({
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
      "playback-preview";
    const rangeDecades = topoContourRangeDecades(state.contourRangeDecades);
    const contourKey = matchingFrame
      ? matchingFrame.key + ":range=" + rangeDecades.toFixed(3)
      : "pending";
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
        levels: createTopoSignedContourLevels({ rangeDecades }),
      });
      if (!playbackFrame) {
        sampledContourCaches.set(contourKey, extracted);
        while (sampledContourCaches.size > 8) {
          sampledContourCaches.delete(sampledContourCaches.keys().next().value);
        }
      }
    }
    const familyCounts = { negative: 0, positive: 0, zero: 0 };
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
          for (const segment of segments) {
            contourStagingContext.moveTo(
              segment.x1 * scaleX,
              segment.y1 * scaleY,
            );
            contourStagingContext.lineTo(
              segment.x2 * scaleX,
              segment.y2 * scaleY,
            );
          }
          contourStagingContext.lineCap = "round";
          contourStagingContext.lineJoin = "round";
          contourStagingContext.strokeStyle = foreground;
          contourStagingContext.globalAlpha = state.contourVisibility;
          contourStagingContext.lineWidth = pixelRatio *
            (family === "zero" ? 1.55 : 1.15);
          contourStagingContext.stroke();
          contourStagingContext.restore();
        }
      }
    }
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
    dom.app.dataset.contourRangeDecades = rangeDecades.toFixed(0);
    dom.app.dataset.contourLevelPolicy =
      "signed-raw-decades-inward-and-outward-plus-zero";
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
      state.pairPhase.toFixed(5),
      state.contourRangeDecades.toFixed(0),
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
        contourStagingContext.globalAlpha = state.contourVisibility;
        contourStagingContext.lineWidth = 1.15 * pixelRatio;
        contourStagingContext.stroke();
        contourStagingContext.restore();
      });
    }
    const commonScale = Math.max(1, height - 1) * state.displayScale;
    const labelCenter = topoWorldPointForCanvasPixel({
      pixelX: anchor.pixelX,
      pixelY: anchor.pixelY,
      width,
      height,
      displayScale: state.displayScale,
    });
    drawMajorDecadeLabels(
      contourStagingContext,
      selectedCircles.map((circle) => Object.freeze({
        ...circle,
        center: labelCenter,
        radius: circle.displayRadiusPixels / commonScale,
      })),
      width,
      height,
      pixelRatio,
      state,
      { x: anchor.pixelX, y: anchor.pixelY },
    );
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
      return drawCircularBinaryOverlay({
        width,
        height,
        pixelRatio,
        state,
        revision,
      });
    }
    if (state.pairMode) {
      return drawSampledPairContours({
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
      contourRangeDecades: state.contourRangeDecades,
    });
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
      state.contourRangeDecades.toFixed(0),
      state.viewMode,
      state.displayScale.toFixed(2),
      width,
      height,
      circles.map(({ causalDelay }) => causalDelay.toFixed(8)).join(","),
    ].join(":");
    dom.app.dataset.contourRangeDecades = topoContourRangeDecades(
      state.contourRangeDecades,
    ).toFixed(0);
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
      const contourStyle = createTopoSequentialContourStyle({
        index: 0,
        count: 1,
        visibility: state.contourVisibility,
      });
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
      contourStagingContext.globalAlpha =
        contourStyle.opacity * circle.revealWeight;
      contourStagingContext.lineWidth =
        pixelRatio * contourStyle.widthCss;
      contourStagingContext.stroke();
      contourStagingContext.restore();
    });
    drawMajorDecadeLabels(
      contourStagingContext,
      visibleCircles,
      width,
      height,
      pixelRatio,
      state,
    );
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
      state.contourRangeDecades.toFixed(0),
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
      ? "Equal-radius exponent chart complete. Rings e=0 through e=" +
        topoContourRangeDecades(state.contourRangeDecades) +
        " use fixed display-radius steps around the selected source at the displayed time; calculated field values and physical radii are unchanged."
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
      "Source-local decades are not yet available for this scene",
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
          "Source-local decades are not yet available for moving or multi-source scenes. Combined wake remains available.";
        return;
      }
      const grid = rawGridSize();
      const cachedRawFrame = rawFrameCaches.get(
        createRawFrameKey(grid.width, grid.height, state),
      ) ?? null;
      const contourRawFrame = state.pairMode && pairPlaybackPlaying
        ? createPairPlaybackContourFrame(width, height, state)
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
        state.binary ? state.orbitalRadius.toFixed(2) : state.contourRangeDecades.toFixed(0),
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
      if (analyticFieldPainted && !state.pairMode) {
        windowLike.clearTimeout?.(renderWatchdogTimer);
        dom.app.dataset.frameState = "complete";
        dom.app.dataset.lastFullDensityLatencyMs = String(Math.round(
          (windowLike.performance?.now?.() ?? Date.now()) - interactionStarted,
        ));
        dom.status.textContent = equalRadiusViewAvailable(state)
          ? "Equal-radius exponent chart complete; e=0 is the first positive display radius and only nonnegative rings are shown."
          : state.binary
          ? "Prescribed circular-binary heatmap frame complete; solid circle is a reference orbit only."
          : "Analytic synthetic field and contours complete.";
      } else if (state.pairMode && pairPlaybackPlaying) {
        windowLike.clearTimeout?.(renderWatchdogTimer);
        dom.app.dataset.frameState = "playback-preview";
        dom.status.textContent =
          "Prescribed collinear playback preview; live Combined wake contours follow the current prescribed-time field. Full-density contours settle when paused.";
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
      if (state.pairMode && !cachedRawFrame) {
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
        rawFrame: cachedRawFrame,
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
    updateControlPresentation();
  }

  function pausePairPlayback() {
    cancelPairPlaybackFrame();
    pairPlaybackPlaying = false;
    pairPlaybackPreviousTimestamp = null;
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

  function stopBinaryPlayback() {
    binaryPlaying = false;
    binaryPlaybackStartedAt = null;
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
    }
    const elapsed = Math.max(0, timestamp - binaryPlaybackStartedAt);
    binaryProgress = Math.min(
      1,
      binaryPlaybackStartProgress +
        elapsed / (TOPO_CIRCULAR_BINARY_PLAYBACK_SECONDS * 1000),
    );
    beginRender({ finalDelay: 0, redrawContours: true });
    if (binaryProgress >= 1) {
      binaryPlaying = false;
      binaryPlaybackStartedAt = null;
      updateBinaryTransportPresentation();
      dom.status.textContent = "One prescribed circular-binary orbit complete.";
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
    binaryPlaybackStartProgress = binaryProgress;
    binaryPlaybackStartedAt = null;
    updateBinaryTransportPresentation();
    windowLike.cancelAnimationFrame?.(binaryAnimationRequest);
    binaryAnimationRequest = windowLike.requestAnimationFrame?.(
      runBinaryPlaybackFrame,
    ) ?? 0;
  }

  function toggleBinaryPlayback() {
    if (binaryPlaying) {
      stopBinaryPlayback();
    } else {
      startBinaryPlayback();
    }
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
  installRangeInteraction(dom.contours);
  installRangeInteraction(dom.contourVisibility);
  installRangeInteraction(dom.binaryRadius);
  installRangeInteraction(dom.displayScale);
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
  listen(dom.pairReplay, "click", () => {
    startPairPlayback({ restart: true });
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
  listen(dom.binaryPlay, "click", toggleBinaryPlayback);
  listen(dom.binaryReplay, "click", () => startBinaryPlayback({ replay: true }));
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
  listen(dom.contours, "input", scheduleContourChange);
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
      sceneSearchRuntime.destroy();
    },
    render,
  });
}
