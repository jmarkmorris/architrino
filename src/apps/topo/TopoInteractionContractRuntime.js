import { createPanelCollapseIconSvg } from "../../runtime/PanelCollapseIcons.js";
import {
  TRANSPORT_CONTROL_ICON,
  setTransportControlButtonPresentation,
} from "../../runtime/TransportControlIcons.js";
import {
  TOPO_DISPLAY_MAPPING_ID,
  TOPO_DISPLAY_CLIP_MAGNITUDE,
  TOPO_INVERSE_SQUARE_SCALE,
  TOPO_REFERENCE_SCALE,
  TOPO_SOURCE_POSITION,
  TOPO_SYNTHETIC_CONTOUR_DELAY_RANGE,
  TOPO_TRANSLATION_AXIS,
  applyTopoScenarioPolarity,
  createTopoSequentialContourStyle,
  createTopoSyntheticContourRenderPlan,
  createTopoSyntheticRawSampler,
  normalizeTopoDisplayValue,
  normalizeTopoFieldColorValue,
  resolveTopoCanvasPixelSize,
  topoContourRangeDecades,
  topoWorldPointForCanvasPixel,
} from "./TopoInteractionContract.js";
import {
  TOPO_COLLINEAR_PAIR_SCENARIO_ID,
  createTopoCollinearPairFrame,
  createTopoCollinearPairRawSampler,
  resolveTopoCollinearPairPlaybackSeconds,
} from "./TopoCollinearPairScenario.js";
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

export const TOPO_SOURCE_MARKER_RADIUS_SCALE = 0.5;
export const TOPO_SOURCE_MASK_MARKER_RATIO = 0.75;

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

export function mountTopoInteractionContractPreview(options = {}) {
  const documentLike = options.documentLike ?? globalThis.document;
  const windowLike = options.windowLike ?? globalThis.window;
  const dom = {
    app: requireElement(documentLike, "#topo-app"),
    panelContent: requireElement(documentLike, "#topo-panel-content"),
    collapse: requireElement(documentLike, "#topo-panel-collapse"),
    scenario: requireElement(documentLike, "#topo-scenario"),
    beta: requireElement(documentLike, "#topo-beta"),
    betaOutput: requireElement(documentLike, "#topo-beta-output"),
    direction: requireElement(documentLike, "#topo-direction"),
    directionFact: requireElement(documentLike, "#topo-direction-fact"),
    contours: requireElement(documentLike, "#topo-contours"),
    contoursOutput: requireElement(documentLike, "#topo-contours-output"),
    contourVisibility: requireElement(documentLike, "#topo-contour-visibility"),
    contourVisibilityOutput: requireElement(
      documentLike,
      "#topo-contour-visibility-output",
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
    binaryBackgroundControl: requireElement(
      documentLike,
      "#topo-binary-background-control",
    ),
    binaryBackgroundInputs: Array.from(documentLike.querySelectorAll(
      'input[name="topo-binary-background"]',
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
  let binaryProgress = 0;
  let binaryPlaying = false;
  let binaryPlaybackStartedAt = null;
  let binaryPlaybackStartProgress = 0;
  let binaryAnimationRequest = 0;
  let rawFrameCache = null;
  let lastContourPresentationKey = null;
  const rawFrameCaches = new Map();
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
      uniform float u_beta;
      uniform float u_pair_mode;
      uniform float u_pair_time;
      uniform float u_electrino_x;
      uniform float u_positrino_x;
      uniform float u_polarity_sign;
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
        float commonScale = max(1.0, u_size.y - 1.0);
        vec2 pixel = gl_FragCoord.xy - vec2(0.5);
        float sourceX = (2.0 / 3.0) * max(1.0, u_size.x - 1.0);
        vec2 worldPoint = vec2(
          (2.0 / 3.0) + (pixel.x - sourceX) / commonScale,
          pixel.y / commonScale
        );
        float rawValue;
        if (u_pair_mode > 0.5) {
          rawValue = sourceContribution(
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
        float normalized = sign(rawValue) *
          log(1.0 + abs(rawValue) / 4.0) / log(17.0);
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
        "u_beta",
        "u_pair_mode",
        "u_pair_time",
        "u_electrino_x",
        "u_positrino_x",
        "u_polarity_sign",
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
      uniform float u_beta;
      uniform float u_time;
      uniform float u_kappa;
      uniform float u_radius;
      uniform float u_direction_sign;
      uniform float u_source_mask_radius;
      uniform vec3 u_negative;
      uniform vec3 u_zero;
      uniform vec3 u_positive;

      const float referenceScale = ${TOPO_REFERENCE_SCALE.toPrecision(12)};
      const float displayLimit = ${TOPO_DISPLAY_CLIP_MAGNITUDE.toPrecision(12)};
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
        float worldScale = max(1.0, u_size.x - 1.0);
        vec2 pixel = gl_FragCoord.xy - vec2(0.5);
        vec2 point = vec2(
          pixel.x / worldScale,
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
        float transformed = sign(rawValue) *
          log(1.0 + abs(rawValue) / referenceScale) / log(10.0);
        float transformedLimit =
          log(1.0 + displayLimit / referenceScale) / log(10.0);
        float normalized = clamp(transformed / transformedLimit, -1.0, 1.0);
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
        "u_beta",
        "u_time",
        "u_kappa",
        "u_radius",
        "u_direction_sign",
        "u_source_mask_radius",
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
    let pointerActive = false;
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
      event.preventDefault();
      pointerActive = true;
      input.focus();
      input.setPointerCapture?.(event.pointerId);
      setValueFromPointer(event);
    });
    listen(input, "pointermove", (event) => {
      if (pointerActive) {
        setValueFromPointer(event);
      }
    });
    listen(input, "pointerup", (event) => {
      pointerActive = false;
      input.releasePointerCapture?.(event.pointerId);
    });
    listen(input, "pointercancel", () => {
      pointerActive = false;
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

  function getState() {
    const baseState = {
      beta: Number(dom.beta.value),
      contourDensity: Number(dom.contours.value) / 100,
      contourVisibility: Number(dom.contourVisibility.value) / 100,
    };
    if (dom.scenario.value === TOPO_COLLINEAR_PAIR_SCENARIO_ID) {
      return Object.freeze({
        ...baseState,
        scenarioId: TOPO_COLLINEAR_PAIR_SCENARIO_ID,
        pairMode: true,
        pairPhase: pairPlaybackPhase,
        polaritySign: 1,
      });
    }
    if (dom.scenario.value === TOPO_CIRCULAR_BINARY_SCENARIO_ID) {
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
        backgroundMode:
          dom.binaryBackgroundInputs.find((input) => input.checked)?.value === "white"
            ? "white"
            : "purple",
      });
    }
    return applyTopoScenarioPolarity(baseState, dom.scenario.value);
  }

  function updatePanelPresentation() {
    const collapsed = dom.app.dataset.panelCollapsed === "true";
    dom.collapse.innerHTML = createPanelCollapseIconSvg(collapsed);
    dom.collapse.setAttribute("aria-expanded", String(!collapsed));
    const accessibleName = collapsed
      ? "Expand Wake Intensity Map controls"
      : "Collapse Wake Intensity Map controls";
    dom.collapse.setAttribute("aria-label", accessibleName);
    dom.collapse.title = accessibleName;
    dom.panelContent.hidden = collapsed;
    dom.panelContent.inert = collapsed;
    dom.panelContent.setAttribute("aria-hidden", String(collapsed));
    updateBinaryTransportVisibility();
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
    dom.app.dataset.sourceMarkerRadiusScale = String(
      TOPO_SOURCE_MARKER_RADIUS_SCALE,
    );
    dom.app.dataset.pairReplayPhase = pairPlaybackPhase.toFixed(5);
    dom.app.dataset.pairReplayPlaying = String(pairPlaybackPlaying);
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
    dom.direction.textContent = pairMode
        ? "Toward center · pass-through"
        : "Positive x";
    dom.directionFact.hidden = binaryMode;
    dom.binaryDirectionControl.hidden = !binaryMode;
    dom.binaryDirectionControl.inert = !binaryMode;
    const rangeText = topoContourRangeDecades(state.contourDensity).toFixed(1) +
      " decades";
    dom.contoursOutput.value = rangeText;
    dom.contoursOutput.textContent = dom.contoursOutput.value;
    dom.contours.disabled = pairMode;
    dom.contours.setAttribute(
      "aria-valuetext",
      rangeText + ", three logarithmic intensity levels per decade",
    );
    dom.contourVisibilityOutput.value = formatPercentage(
      state.contourVisibility,
    );
    dom.contourVisibilityOutput.textContent = dom.contourVisibilityOutput.value;
    dom.contourVisibility.disabled = pairMode;
    dom.contourControls.hidden = binaryMode;
    dom.contourControls.inert = binaryMode;
    dom.binaryRadiusControl.hidden = !binaryMode;
    dom.binaryRadiusControl.inert = !binaryMode;
    dom.binaryOrbitGuideControl.hidden = !binaryMode;
    dom.binaryOrbitGuideControl.inert = !binaryMode;
    dom.binaryBackgroundControl.hidden = !binaryMode;
    dom.binaryBackgroundControl.inert = !binaryMode;
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
    dom.legendTitle.textContent = binaryMode
      ? "Signed equal-wake intensity"
      : "Signed ordinary values";
    dom.canvas.setAttribute(
      "aria-label",
      binaryMode
        ? "Signed equal-wake-intensity heatmap for prescribed antipodal circular electrino and positrino paths, with smaller polarity markers, an optional solid prescribed-orbit guide, and no contour overlay"
        : "Theoretical signed inverse-square wake intensity for the selected prescribed-motion scenario, with scenario-specific contour display and a faint dashed horizontal reference axis",
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
    dom.app.dataset.binaryBackground = state.backgroundMode;
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
    dom.legendMapping.textContent =
      "Signed base-10 logarithmic color · orders of magnitude · z* = " +
      TOPO_REFERENCE_SCALE +
      (state.binary
        ? " · " + styles.backgroundMode + " neutral" +
          (state.showOrbitGuide
            ? " · solid circle = prescribed orbit"
            : "")
        : "");
    dom.legendGradient.style.background =
      "linear-gradient(90deg, " + styles.negative + ", " +
      styles.zero + ", " + styles.positive + ")";
    dom.legendGradient.setAttribute(
      "aria-label",
      "Negative values blue, neutral " + styles.backgroundMode +
      ", positive values red" +
      (state.binary && state.showOrbitGuide
        ? "; solid circle marks the prescribed orbit"
        : ""),
    );
    const labels = [
      "−" + TOPO_DISPLAY_CLIP_MAGNITUDE,
      "−" + TOPO_REFERENCE_SCALE,
      "0",
      "+" + TOPO_REFERENCE_SCALE,
      "+" + TOPO_DISPLAY_CLIP_MAGNITUDE,
    ];
    dom.legendTicks.replaceChildren(...labels.map((label) => {
      const span = documentLike.createElement("span");
      span.textContent = label;
      return span;
    }));
  }

  function canvasSize() {
    const bounds = dom.canvas.getBoundingClientRect();
    return resolveTopoCanvasPixelSize({
      cssWidth: bounds.width,
      cssHeight: bounds.height,
      devicePixelRatio: windowLike.devicePixelRatio || 1,
    });
  }

  function rawGridSize() {
    const bounds = dom.canvas.getBoundingClientRect();
    return {
      width: Math.max(1, Math.ceil(bounds.width)),
      height: Math.max(1, Math.ceil(bounds.height)),
    };
  }

  function readStyles(state = null) {
    const binaryWhite = state?.binary === true && state.backgroundMode === "white";
    const styles = {
      negative: readHexToken(
        windowLike,
        dom.app,
        "--ui-data-negative",
        "#2563eb",
      ),
      zero: binaryWhite
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
      backgroundMode: binaryWhite ? "white" : "purple",
    };
    styles.negativeRgb = hexToRgb(styles.negative);
    styles.zeroRgb = hexToRgb(styles.zero);
    styles.positiveRgb = hexToRgb(styles.positive);
    return styles;
  }

  function effectivePixelRatio(width, height) {
    const bounds = dom.canvas.getBoundingClientRect();
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
      fieldGl.uniform1f(uniforms.u_polarity_sign, state.polaritySign);
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
  ) {
    const commonScale = Math.max(1, height - 1);
    const sourceAnchorX = TOPO_SOURCE_POSITION.x * Math.max(1, width - 1);
    const x = sourceAnchorX +
      (position.x - TOPO_SOURCE_POSITION.x) * commonScale;
    const y = (1 - position.y) * commonScale;
    const radius = resolveTopoSourceMarkerRadius({
      width,
      height,
      pixelRatio,
    });
    return { x, y, radius };
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
    const radius = resolveTopoSourceMarkerRadius({
      width,
      height,
      pixelRatio,
    });
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
  ) {
    const { x, y, radius } = sourceOverlayGeometry(
      width,
      height,
      pixelRatio,
      position,
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
  ) {
    const positioned = sources.map((source) => ({
      source,
      geometry: sourceOverlayGeometry(
        width,
        height,
        pixelRatio,
        source.position,
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
    const orbitPixelRadius = state.orbitalRadius * Math.max(1, width - 1);
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
        x: position.x * Math.max(1, width - 1),
        y: centerY -
          (position.y - TOPO_CIRCULAR_BINARY_CENTER.y) *
            Math.max(1, width - 1),
      };
    });
    const markerRadius = resolveTopoSourceMarkerRadius({
      width,
      height,
      pixelRatio,
    });
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
    ].join(":");
    return true;
  }

  function drawTranslationAxis(
    targetContext,
    width,
    height,
    pixelRatio,
    pairMode = false,
  ) {
    const y = (1 - TOPO_SOURCE_POSITION.y) * Math.max(1, height - 1);
    const startX = TOPO_TRANSLATION_AXIS.startX * Math.max(1, width - 1);
    const endX = TOPO_TRANSLATION_AXIS.endX * Math.max(1, width - 1);
    const arrow = TOPO_TRANSLATION_AXIS.arrowCss * pixelRatio;
    targetContext.save();
    targetContext.globalAlpha = TOPO_TRANSLATION_AXIS.opacity;
    targetContext.strokeStyle =
      "rgb(" + [WHITE.r, WHITE.g, WHITE.b].join(",") + ")";
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
  ) {
    const cssWidth = width / pixelRatio;
    const compact = cssWidth < 520;
    const commonScale = Math.max(1, height - 1);
    const sourcePixelX = TOPO_SOURCE_POSITION.x * Math.max(1, width - 1);
    const labels = [];
    targetContext.save();
    targetContext.fillStyle =
      "rgb(" + [WHITE.r, WHITE.g, WHITE.b].join(",") + ")";
    const fontFamily = windowLike.getComputedStyle?.(dom.app)?.fontFamily ||
      "Helvetica Neue, Arial, sans-serif";
    targetContext.font = 9 * pixelRatio + "px " + fontFamily;
    targetContext.textBaseline = "bottom";
    const occupied = [];
    const positions = [];
    circles.forEach((circle) => {
      if (!circle.majorDecade || circle.revealWeight < 0.25) {
        return;
      }
      const centerX = sourcePixelX +
        (circle.center.x - TOPO_SOURCE_POSITION.x) * commonScale;
      const centerY = (1 - circle.center.y) * commonScale;
      const velocityBeta = circle.velocityBeta ?? state.beta;
      const direction = velocityBeta < 0 ? -1 : 1;
      const intersectionX = centerX -
        direction * circle.radius * commonScale;
      const minimumLabelX = (compact ? 82 : 28) * pixelRatio;
      const labelX = Math.min(
        width - 16 * pixelRatio,
        Math.max(
          minimumLabelX,
          intersectionX - direction * 7 * pixelRatio,
        ),
      );
      let tier = 0;
      while (occupied.some((position) =>
        position.tier === tier &&
        Math.abs(position.x - labelX) < 30 * pixelRatio)) {
        tier += 1;
      }
      const labelY = centerY - (8 + tier * (compact ? 10 : 11)) * pixelRatio;
      targetContext.globalAlpha = 0.82 * circle.revealWeight;
      targetContext.textAlign = direction > 0 ? "right" : "left";
      const label = circle.signedMajorDecadeLabel ?? circle.majorDecadeLabel;
      targetContext.fillText(
        label,
        labelX,
        labelY,
      );
      labels.push(label);
      occupied.push({ x: labelX, tier });
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

  function writeDisplayPixel(data, index, rawValue, styles) {
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
      const normalized = styles.binary
        ? normalizeTopoDisplayValue(rawValue)
        : normalizeTopoFieldColorValue(rawValue * styles.polaritySign);
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
    const bounds = dom.canvas.getBoundingClientRect();
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
    for (let pixelY = 0; pixelY < previewHeight; pixelY += 1) {
      for (let pixelX = 0; pixelX < previewWidth; pixelX += 1) {
        const worldPoint = state.binary
          ? topoCircularBinaryWorldPointForCanvasPixel({
            pixelX,
            pixelY,
            width: previewWidth,
            height: previewHeight,
          })
          : topoWorldPointForCanvasPixel({
            pixelX,
            pixelY,
            width: previewWidth,
            height: previewHeight,
          });
        const rawValue = sampleRaw
          ? providerSample(pixelX, pixelY)
          : providerSample(worldPoint.x, worldPoint.y);
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
      state.beta.toFixed(4),
      state.binary
        ? state.playback.progress.toFixed(6) + ":" +
          state.orbitalRadius.toFixed(2) + ":" + state.direction
        : state.pairMode
          ? state.pairPhase.toFixed(5)
          : "static",
    ].join(":");
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
    const sampleRaw = createRawSamplerForState(state, width, height);
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
            })
            : topoWorldPointForCanvasPixel({
              pixelX,
              pixelY: row,
              width,
              height,
            });
          raw[row * width + pixelX] = sampleRaw(
            worldPoint.x,
            worldPoint.y,
          );
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
    const displayKey = TOPO_DISPLAY_MAPPING_ID + ":" + state.polaritySign +
      ":" + (state.binary ? state.backgroundMode : "purple");
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

  function drawSyntheticContours({
    width,
    height,
    pixelRatio,
    state,
    styles,
    revision,
    interactionStarted = null,
  }) {
    const pathStarted = windowLike.performance?.now?.() ?? Date.now();
    if (state.binary) {
      return drawCircularBinaryOverlay({
        width,
        height,
        pixelRatio,
        state,
        revision,
      });
    }
    const circles = state.pairMode
      ? []
      : createTopoSyntheticContourRenderPlan({
        beta: state.beta,
        contourDensity: state.contourDensity,
      });
    dom.app.dataset.contourGeometryKey = [
      state.beta.toFixed(4),
      state.pairMode ? state.pairPhase.toFixed(5) : "static",
      state.contourDensity.toFixed(4),
      width,
      height,
      circles.map(({ causalDelay }) => causalDelay.toFixed(8)).join(","),
    ].join(":");
    dom.app.dataset.contourRangeDecades = topoContourRangeDecades(
      state.contourDensity,
    ).toFixed(3);
    dom.app.dataset.contourRadii = circles
      .map(({ causalDelay }) => causalDelay.toFixed(10))
      .join(",");
    dom.app.dataset.contourRenderCount = String(
      Number(dom.app.dataset.contourRenderCount ?? 0) + 1,
    );
    dom.app.dataset.lastContourPathMs = String(Math.round(
      (windowLike.performance?.now?.() ?? Date.now()) - pathStarted,
    ));
    dom.app.dataset.lastContourPathCacheHit = "analytic";
    const paintStarted = windowLike.performance?.now?.() ?? Date.now();
    const canonicalWhiteRgb = [WHITE.r, WHITE.g, WHITE.b];
    if (
      contourStagingCanvas.width !== width ||
      contourStagingCanvas.height !== height
    ) {
      contourStagingCanvas.width = width;
      contourStagingCanvas.height = height;
    } else {
      contourStagingContext.clearRect(0, 0, width, height);
    }
    drawTranslationAxis(
      contourStagingContext,
      width,
      height,
      pixelRatio,
      state.pairMode,
    );
    const commonScale = Math.max(1, height - 1);
    const sourcePixelX = TOPO_SOURCE_POSITION.x * Math.max(1, width - 1);
    circles.forEach((circle) => {
      if (!(circle.radius > 0)) {
        return;
      }
      const centerX = sourcePixelX +
        (circle.center.x - TOPO_SOURCE_POSITION.x) * commonScale;
      const centerY = (1 - circle.center.y) * commonScale;
      const radius = circle.radius * commonScale;
      if (
        centerX + radius < 0 ||
        centerX - radius > width ||
        centerY + radius < 0 ||
        centerY - radius > height
      ) {
        return;
      }
      const circlePolaritySign = circle.polaritySign ?? state.polaritySign;
      const sourceContourRgb = circlePolaritySign < 0
        ? styles.negativeRgb
        : styles.positiveRgb;
      const contourStyle = createTopoSequentialContourStyle({
        index: circle.latticeIndex,
        count: TOPO_SYNTHETIC_CONTOUR_DELAY_RANGE.masterCount,
        visibility: state.contourVisibility,
      });
      const contourRgb = sourceContourRgb.map((channel, index) => Math.round(
        channel +
        (canonicalWhiteRgb[index] - channel) * contourStyle.whiteMix,
      ));
      contourStagingContext.save();
      contourStagingContext.beginPath();
      contourStagingContext.arc(
        centerX,
        centerY,
        radius,
        0,
        Math.PI * 2,
      );
      contourStagingContext.strokeStyle =
        "rgb(" + contourRgb.join(",") + ")";
      contourStagingContext.globalAlpha =
        contourStyle.opacity * circle.revealWeight;
      contourStagingContext.lineWidth =
        pixelRatio * contourStyle.widthCss;
      contourStagingContext.lineCap = "round";
      contourStagingContext.lineJoin = "round";
      contourStagingContext.stroke();
      contourStagingContext.restore();
    });
    drawMajorDecadeLabels(
      contourStagingContext,
      circles,
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
      );
    } else {
      drawSourceOverlay(
        contourStagingContext,
        width,
        height,
        pixelRatio,
        state.polaritySign,
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
      state.contourDensity.toFixed(4),
      state.contourVisibility.toFixed(4),
      state.polaritySign,
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
    windowLike.clearTimeout?.(renderWatchdogTimer);
    dom.app.dataset.frameState = "complete";
    dom.app.dataset.lastFullDensityLatencyMs = String(Math.round(
      (windowLike.performance?.now?.() ?? Date.now()) - interactionStarted,
    ));
    dom.status.textContent = state.binary
      ? "Prescribed circular-binary heatmap complete. The solid orbit is a reference path only; no dynamics, binding, or stability claim is attached."
      : state.beta === 1
      ? state.pairMode
        ? "Two-source finite-history superposition complete at the field-speed endpoint; unavailable leading roots remain neutral."
        : "Full-density synthetic frame complete. Signed ordinary wake intensity has no value in front; no value was fabricated."
      : state.pairMode
        ? "Two-source finite-history signed superposition complete. Prescribed paths are display-only."
        : "One-source full-density synthetic frame complete. No TOPO-001 values are shown.";
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
      if (fieldResized) {
        context.fillStyle = styles.zero;
        context.fillRect(0, 0, width, height);
      }
      const grid = rawGridSize();
      const cachedRawFrame = rawFrameCaches.get(
        createRawFrameKey(grid.width, grid.height, state),
      ) ?? null;
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
        state.binary ? state.orbitalRadius.toFixed(2) : state.contourDensity.toFixed(4),
        state.binary ? state.showOrbitGuide : state.contourVisibility.toFixed(4),
        state.binary
          ? state.backgroundMode + ":" + state.direction
          : state.polaritySign,
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
        });
      }
      dom.app.dataset.lastPreviewLatencyMs = String(Math.round(
        (windowLike.performance?.now?.() ?? Date.now()) - interactionStarted,
      ));
      if (analyticFieldPainted) {
        windowLike.clearTimeout?.(renderWatchdogTimer);
        dom.app.dataset.frameState = "complete";
        dom.app.dataset.lastFullDensityLatencyMs = String(Math.round(
          (windowLike.performance?.now?.() ?? Date.now()) - interactionStarted,
        ));
        dom.status.textContent = state.binary
          ? "Prescribed circular-binary heatmap frame complete; solid circle is a reference orbit only."
          : state.pairMode
            ? "Analytic two-source finite-history superposition complete; contour lines are hidden for this scenario."
            : "Analytic synthetic field and contours complete.";
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
    cancelPairPlaybackFrame();
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
    if (
      dom.scenario.value !== TOPO_COLLINEAR_PAIR_SCENARIO_ID ||
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
      dom.scenario.value !== TOPO_COLLINEAR_PAIR_SCENARIO_ID
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
    if (!binaryPlaying || dom.scenario.value !== TOPO_CIRCULAR_BINARY_SCENARIO_ID) {
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
  listen(dom.scenario, "change", () => {
    resetPairPlayback();
    stopBinaryPlayback();
    binaryProgress = 0;
    const reducedMotion = windowLike.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches === true;
    if (
      dom.scenario.value === TOPO_COLLINEAR_PAIR_SCENARIO_ID &&
      Number(dom.beta.value) > 0 &&
      !reducedMotion
    ) {
      startPairPlayback({ restart: true });
    } else {
      scheduleFrameChange();
    }
  });
  listen(dom.beta, "input", () => {
    stopBinaryPlayback();
    binaryProgress = 0;
    if (dom.scenario.value === TOPO_COLLINEAR_PAIR_SCENARIO_ID) {
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
  dom.binaryBackgroundInputs.forEach((input) =>
    listen(input, "change", scheduleFrameChange));
  listen(dom.binaryPlay, "click", toggleBinaryPlayback);
  listen(dom.binaryReplay, "click", () => startBinaryPlayback({ replay: true }));
  listen(documentLike, "keydown", (event) => {
    if (
      event.code !== "Space" ||
      event.repeat ||
      /^(INPUT|SELECT|TEXTAREA|BUTTON|A)$/u.test(event.target?.tagName ?? "") ||
      event.target?.isContentEditable
    ) {
      return;
    }
    if (
      dom.scenario.value === TOPO_COLLINEAR_PAIR_SCENARIO_ID &&
      Number(dom.beta.value) > 0
    ) {
      event.preventDefault();
      togglePairPlayback();
    } else if (
      dom.scenario.value === TOPO_CIRCULAR_BINARY_SCENARIO_ID &&
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
      sceneSearchRuntime.destroy();
    },
    render,
  });
}
