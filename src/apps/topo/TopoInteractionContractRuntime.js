import { createPanelCollapseIconSvg } from "../../runtime/PanelCollapseIcons.js";
import {
  TOPO_DEFAULT_CONTOUR_LEVELS,
  TOPO_DEFAULT_TRANSFORM,
  TOPO_DISPLAY_CLIP_MAGNITUDE,
  TOPO_FIELD_COLOR_GAIN,
  TOPO_REFERENCE_SCALE,
  TOPO_SOURCE_POSITION,
  applyTopoScenarioPolarity,
  createTopoContourDensityPlan,
  createTopoContourStyleProfile,
  createTopoContourThresholds,
  createTopoSyntheticContourCircles,
  createTopoSyntheticRawSampler,
  normalizeTopoFieldColorValue,
  resolveTopoCanvasPixelSize,
  topoWorldPointForCanvasPixel,
} from "./TopoInteractionContract.js";
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

function formatValue(value) {
  if (!Number.isFinite(value)) {
    return "unavailable";
  }
  if (Math.abs(value) >= 100 || (Math.abs(value) > 0 && Math.abs(value) < 0.001)) {
    return value.toExponential(4);
  }
  return value.toFixed(4);
}

function formatPercentage(normalizedValue) {
  const percentage = normalizedValue * 100;
  return (Number.isInteger(percentage) ? percentage.toFixed(0) : percentage.toFixed(1)) + "%";
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
    contours: requireElement(documentLike, "#topo-contours"),
    contoursOutput: requireElement(documentLike, "#topo-contours-output"),
    contourVisibility: requireElement(documentLike, "#topo-contour-visibility"),
    contourVisibilityOutput: requireElement(
      documentLike,
      "#topo-contour-visibility-output",
    ),
    transform: requireElement(documentLike, "#topo-transform"),
    canvas: requireElement(documentLike, "#topo-canvas"),
    contourCanvas: requireElement(documentLike, "#topo-contour-canvas"),
    status: requireElement(documentLike, "#topo-status"),
    legendTransform: requireElement(documentLike, "#topo-legend-transform"),
    legendTicks: requireElement(documentLike, "#topo-legend-ticks"),
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
  let rawFrameCache = null;
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
      uniform float u_transform;
      uniform float u_gain;
      uniform vec3 u_zero;
      uniform vec3 u_endpoint;

      float arsinh(float value) {
        return log(value + sqrt(value * value + 1.0));
      }

      void main() {
        float commonScale = max(1.0, u_size.y - 1.0);
        vec2 pixel = gl_FragCoord.xy - vec2(0.5);
        float sourceX = (2.0 / 3.0) * max(1.0, u_size.x - 1.0);
        float sourceY = 0.5 * commonScale;
        float sourceRelativeX = (pixel.x - sourceX) / commonScale;
        float sourceRelativeY = (pixel.y - sourceY) / commonScale;
        float radiusSquared =
          sourceRelativeX * sourceRelativeX +
          sourceRelativeY * sourceRelativeY;
        if (u_beta >= 0.999999 && sourceRelativeX >= 0.0) {
          gl_FragColor = vec4(u_zero, 1.0);
          return;
        }
        float causalDelay;
        if (radiusSquared <= 0.000000000001) {
          causalDelay = 0.0;
        } else if (u_beta >= 0.999999) {
          causalDelay = -radiusSquared / (2.0 * sourceRelativeX);
        } else {
          float lambda = sqrt(
            sourceRelativeX * sourceRelativeX +
            (1.0 - u_beta * u_beta) *
            sourceRelativeY * sourceRelativeY
          );
          causalDelay = radiusSquared / (lambda - u_beta * sourceRelativeX);
        }
        float magnitude = exp(-16.0 * causalDelay);
        float normalized;
        if (u_transform < 0.5) {
          normalized = magnitude;
        } else if (u_transform < 1.5) {
          normalized = log(1.0 + 16.0 * magnitude) / log(17.0);
        } else {
          normalized = arsinh(16.0 * magnitude) / arsinh(16.0);
        }
        float calibrated = arsinh(u_gain * normalized) / arsinh(u_gain);
        vec3 color = mix(u_zero, u_endpoint, clamp(calibrated, 0.0, 1.0));
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
        "u_transform",
        "u_gain",
        "u_zero",
        "u_endpoint",
      ].map((name) => [name, fieldGl.getUniformLocation(program, name)])),
    };
  }

  let analyticFieldRenderer = null;
  try {
    analyticFieldRenderer = createAnalyticFieldRenderer();
  } catch (error) {
    dom.app.dataset.fieldRendererError = String(error?.message ?? error);
  }
  dom.app.dataset.fieldRenderer = analyticFieldRenderer
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
    return applyTopoScenarioPolarity({
      beta: Number(dom.beta.value),
      contourDensity: Number(dom.contours.value) / 100,
      contourVisibility: Number(dom.contourVisibility.value) / 100,
      transformId: dom.transform.value,
    }, dom.scenario.value);
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
  }

  function updateControlPresentation() {
    const state = getState();
    dom.betaOutput.value = "β = " + state.beta.toFixed(2);
    dom.betaOutput.textContent = dom.betaOutput.value;
    dom.beta.setAttribute(
      "aria-valuetext",
      "β = " + state.beta.toFixed(2) +
      (state.beta === 1 ? ", exact field-speed endpoint" : ", sub-field-speed preview"),
    );
    dom.contoursOutput.value = formatPercentage(state.contourDensity);
    dom.contoursOutput.textContent = dom.contoursOutput.value;
    dom.contourVisibilityOutput.value = formatPercentage(
      state.contourVisibility,
    );
    dom.contourVisibilityOutput.textContent = dom.contourVisibilityOutput.value;
  }

  function updateLegend() {
    const state = getState();
    const thresholds = createTopoContourThresholds(
      TOPO_DEFAULT_CONTOUR_LEVELS,
      state.transformId,
    );
    const quarter = Math.floor(thresholds.length / 4);
    const selected = [
      thresholds[0],
      thresholds[quarter],
      thresholds[Math.floor(thresholds.length / 2)],
      thresholds[thresholds.length - quarter - 1],
      thresholds.at(-1),
    ];
    dom.legendTransform.textContent =
      dom.transform.selectedOptions[0]?.textContent +
      " · z* = " + TOPO_REFERENCE_SCALE +
      " · raw clip ±" + TOPO_DISPLAY_CLIP_MAGNITUDE;
    dom.legendTicks.replaceChildren(...selected.map((threshold) => {
      const span = documentLike.createElement("span");
      span.textContent = formatValue(threshold.raw);
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
    const styles = {
      negative: readHexToken(
        windowLike,
        dom.app,
        "--ui-data-negative",
        "#2563eb",
      ),
      zero: readHexToken(
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

  function paintAnalyticField(width, height, state, styles) {
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
      fieldGl.uniform1f(
        uniforms.u_transform,
        state.transformId === "linear"
          ? 0
          : state.transformId === "signed-log2" ? 1 : 2,
      );
      fieldGl.uniform1f(
        uniforms.u_gain,
        TOPO_FIELD_COLOR_GAIN[state.transformId],
      );
      fieldGl.uniform3fv(
        uniforms.u_zero,
        styles.zeroRgb.map((channel) => channel / 255),
      );
      const endpoint = state.polaritySign < 0
        ? styles.negativeRgb
        : styles.positiveRgb;
      fieldGl.uniform3fv(
        uniforms.u_endpoint,
        endpoint.map((channel) => channel / 255),
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

  function drawSourceOverlay(
    targetContext,
    width,
    height,
    pixelRatio,
    polaritySign,
  ) {
    const x = TOPO_SOURCE_POSITION.x * Math.max(1, width - 1);
    const y = (1 - TOPO_SOURCE_POSITION.y) * Math.max(1, height - 1);
    const radius = Math.max(9 * pixelRatio, Math.min(width, height) * 0.0125);
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
      Math.max(1, originStyle.radius * pixelRatio),
      0,
      Math.PI * 2,
    );
    targetContext.fill();
    targetContext.restore();
  }

  function writeDisplayPixel(data, index, rawValue, styles, transformId) {
    if (Number.isNaN(rawValue)) {
      const sourceRgb = styles.polaritySign < 0
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
      const normalized = normalizeTopoFieldColorValue(
        rawValue * styles.polaritySign,
        transformId,
      );
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
    const providerSample = sampleRaw ?? createTopoSyntheticRawSampler({
      ...state,
      polaritySign: 1,
    });
    for (let pixelY = 0; pixelY < previewHeight; pixelY += 1) {
      for (let pixelX = 0; pixelX < previewWidth; pixelX += 1) {
        const worldPoint = topoWorldPointForCanvasPixel({
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
          state.transformId,
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
      state.beta.toFixed(4),
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
    const sampleRaw = createTopoSyntheticRawSampler({
      ...state,
      polaritySign: 1,
    });
    let row = 0;
    while (row < height) {
      const started = windowLike.performance?.now?.() ?? Date.now();
      do {
        for (let pixelX = 0; pixelX < width; pixelX += 1) {
          const worldPoint = topoWorldPointForCanvasPixel({
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
    const displayKey = state.transformId + ":" + state.polaritySign;
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
            state.transformId,
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

  function createContourRenderPlan(contourDensity) {
    const weightByLevel = new Map();
    createTopoContourDensityPlan(contourDensity).forEach((entry) => {
      const level = Math.abs(entry.normalized);
      if (level > 0) {
        weightByLevel.set(
          level,
          Math.max(weightByLevel.get(level) ?? 0, entry.weight),
        );
      }
    });
    return {
      levels: [...weightByLevel.keys()].sort((left, right) => left - right),
      weightByLevel,
    };
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
    const { levels, weightByLevel } = createContourRenderPlan(
      state.contourDensity,
    );
    const circles = createTopoSyntheticContourCircles({
      beta: state.beta,
      transformId: state.transformId,
      normalizedLevels: levels,
    });
    dom.app.dataset.lastContourPathMs = String(Math.round(
      (windowLike.performance?.now?.() ?? Date.now()) - pathStarted,
    ));
    dom.app.dataset.lastContourPathCacheHit = "analytic";
    const paintStarted = windowLike.performance?.now?.() ?? Date.now();
    const sourceContourRgb = state.polaritySign < 0
      ? styles.negativeRgb
      : styles.positiveRgb;
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
    const commonScale = Math.max(1, height - 1);
    const sourcePixelX = TOPO_SOURCE_POSITION.x * Math.max(1, width - 1);
    const sourcePixelY = (1 - TOPO_SOURCE_POSITION.y) * commonScale;
    circles.forEach((circle) => {
      const densityWeight = weightByLevel.get(circle.level) ?? 0;
      if (densityWeight <= 0 || !(circle.radius > 0)) {
        return;
      }
      const centerX = sourcePixelX - state.beta * circle.radius * commonScale;
      const radius = circle.radius * commonScale;
      if (
        centerX + radius < 0 ||
        centerX - radius > width ||
        sourcePixelY + radius < 0 ||
        sourcePixelY - radius > height
      ) {
        return;
      }
      const contourStyle = createTopoContourStyleProfile({
        causalDelay: circle.causalDelay,
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
        sourcePixelY,
        radius,
        0,
        Math.PI * 2,
      );
      contourStagingContext.strokeStyle =
        "rgb(" + contourRgb.join(",") + ")";
      contourStagingContext.globalAlpha =
        densityWeight * contourStyle.opacity;
      contourStagingContext.lineWidth =
        pixelRatio * contourStyle.widthCss;
      contourStagingContext.lineCap = "round";
      contourStagingContext.lineJoin = "round";
      contourStagingContext.stroke();
      contourStagingContext.restore();
    });
    drawSourceOverlay(
      contourStagingContext,
      width,
      height,
      pixelRatio,
      state.polaritySign,
    );
    if (revision !== frameRevision) {
      return false;
    }
    contourContext.clearRect(0, 0, width, height);
    contourContext.drawImage(contourStagingCanvas, 0, 0);
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
    dom.status.textContent = state.beta === 1
      ? "Full-density synthetic frame complete. Signed ordinary wake intensity has no value in front; no value was fabricated."
      : "One-source full-density synthetic frame complete. No TOPO-001 values are shown.";
  }

  function beginRender({ finalDelay = 0 } = {}) {
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
      if (
        dom.contourCanvas.width !== width ||
        dom.contourCanvas.height !== height
      ) {
        dom.contourCanvas.width = width;
        dom.contourCanvas.height = height;
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
      drawSyntheticContours({
        width,
        height,
        pixelRatio,
        state,
        styles,
        revision,
        interactionStarted,
      });
      dom.app.dataset.lastPreviewLatencyMs = String(Math.round(
        (windowLike.performance?.now?.() ?? Date.now()) - interactionStarted,
      ));
      if (analyticFieldPainted) {
        windowLike.clearTimeout?.(renderWatchdogTimer);
        dom.app.dataset.frameState = "complete";
        dom.app.dataset.lastFullDensityLatencyMs = String(Math.round(
          (windowLike.performance?.now?.() ?? Date.now()) - interactionStarted,
        ));
        dom.status.textContent = "Analytic synthetic field and contours complete.";
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

  function scheduleDisplayChange() {
    beginRender({ finalDelay: 0 });
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
    scheduleDisplayChange();
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
  listen(dom.scenario, "change", () => {
    updateControlPresentation();
    scheduleFrameChange();
  });
  listen(dom.beta, "input", () => {
    updateControlPresentation();
    scheduleFrameChange();
  });
  listen(dom.contours, "input", scheduleContourChange);
  listen(dom.contourVisibility, "input", scheduleContourChange);
  listen(dom.transform, "change", scheduleDisplayChange);
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
