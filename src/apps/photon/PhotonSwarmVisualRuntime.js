import {
  PHOTON_CHARGE_COLORS,
  PHOTON_CONTROL_RANGES,
  PHOTON_LAYER_META,
  PHOTON_LAYER_ORDER,
  clampPhotonNumber,
  getPhotonLayer,
  getPhotonLayerEnabled,
  getPhotonLayerAngleRadians,
  wrapPhotonTime,
} from "./PhotonStateRuntime.js";
import { buildPhotonPlotSamples } from "./PhotonFormulaRuntime.js";

const TWO_PI = Math.PI * 2;
const ARCHITRINO_MARKER_RADIUS = 5.2;
const PHOTON_FIELD_PLOT_SAMPLE_COUNT = 180;
const STAGE_ORIENTATION_NOTE =
  "Face-on view: the planar swarms are actually perpendicular to the translation line.";

let photonFieldPlotCache = {
  key: "",
  plot: null,
};

function resizeCanvasToDisplaySize(canvas, windowLike = globalThis.window) {
  const rect = canvas.getBoundingClientRect();
  const pixelRatio = Math.min(2, windowLike?.devicePixelRatio || 1);
  const width = Math.max(1, Math.floor(rect.width * pixelRatio));
  const height = Math.max(1, Math.floor(rect.height * pixelRatio));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  return {
    width,
    height,
    pixelRatio,
    cssWidth: Math.max(1, rect.width),
    cssHeight: Math.max(1, rect.height),
  };
}

function hexToRgb(hex) {
  const normalized = String(hex).replace("#", "");
  const value = Number.parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function lerpColor(startHex, endHex, progress, alpha = 1) {
  const start = hexToRgb(startHex);
  const end = hexToRgb(endHex);
  const p = Math.max(0, Math.min(1, progress));
  const r = Math.round(start.r + (end.r - start.r) * p);
  const g = Math.round(start.g + (end.g - start.g) * p);
  const b = Math.round(start.b + (end.b - start.b) * p);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function wrapAngle(angle) {
  return ((((angle + Math.PI) % TWO_PI) + TWO_PI) % TWO_PI) - Math.PI;
}

function colorForPathAngle(state, swarmId, layerId, angle, timeSeconds, alpha = 1) {
  const positrinoAngle = getPhotonLayerAngleRadians(state, swarmId, layerId, timeSeconds, "positrino");
  const electrinoAngle = getPhotonLayerAngleRadians(state, swarmId, layerId, timeSeconds, "electrino");
  const positrinoWeight = Math.max(0, 1 - Math.abs(wrapAngle(angle - positrinoAngle)) / 0.72);
  const electrinoWeight = Math.max(0, 1 - Math.abs(wrapAngle(angle - electrinoAngle)) / 0.72);
  if (positrinoWeight > electrinoWeight && positrinoWeight > 0) {
    return lerpColor(PHOTON_CHARGE_COLORS.neutral, PHOTON_CHARGE_COLORS.positrino, positrinoWeight, alpha);
  }
  if (electrinoWeight > 0) {
    return lerpColor(PHOTON_CHARGE_COLORS.neutral, PHOTON_CHARGE_COLORS.electrino, electrinoWeight, alpha);
  }
  return lerpColor(PHOTON_CHARGE_COLORS.neutral, PHOTON_CHARGE_COLORS.neutral, 1, alpha);
}

function drawPolylineArc(ctx, centerX, centerY, radius, startAngle, directionSign, span, options) {
  const steps = Math.max(8, Math.round(Math.abs(span) * 28));
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (let index = 0; index < steps; index += 1) {
    const p0 = index / steps;
    const p1 = (index + 1) / steps;
    const head = 1 - p0;
    const a0 = startAngle - directionSign * span * p0;
    const a1 = startAngle - directionSign * span * p1;
    ctx.beginPath();
    ctx.moveTo(centerX + Math.cos(a0) * radius, centerY + Math.sin(a0) * radius);
    ctx.lineTo(centerX + Math.cos(a1) * radius, centerY + Math.sin(a1) * radius);
    ctx.strokeStyle = options.colorForAngle(a0, options.opacity * Math.pow(head, options.alphaFalloff));
    ctx.lineWidth = options.tailWidth + (options.headWidth - options.tailWidth) * Math.pow(head, options.widthFalloff);
    ctx.stroke();
  }
  ctx.restore();
}

function drawOrbitPath(ctx, state, swarmId, layerId, centerX, centerY, radius, timeSeconds) {
  const segments = 144;
  ctx.save();
  ctx.lineWidth = 1.15;
  for (let index = 0; index < segments; index += 1) {
    const a0 = (index / segments) * TWO_PI;
    const a1 = ((index + 1) / segments) * TWO_PI;
    ctx.beginPath();
    ctx.moveTo(centerX + Math.cos(a0) * radius, centerY + Math.sin(a0) * radius);
    ctx.lineTo(centerX + Math.cos(a1) * radius, centerY + Math.sin(a1) * radius);
    ctx.strokeStyle = colorForPathAngle(state, swarmId, layerId, (a0 + a1) / 2, timeSeconds, 0.72);
    ctx.stroke();
  }
  ctx.restore();
}

function drawLayerTrail(ctx, state, swarmId, layerId, centerX, centerY, radius, timeSeconds) {
  const directionSign = state.pair[swarmId].direction === "cw" ? -1 : 1;
  ["positrino", "electrino"].forEach((chargeType) => {
    const chargeAngle = getPhotonLayerAngleRadians(state, swarmId, layerId, timeSeconds, chargeType);
    const colorForAngle = (angle, alpha) => colorForPathAngle(state, swarmId, layerId, angle, timeSeconds, alpha);
    drawPolylineArc(ctx, centerX, centerY, radius, chargeAngle, directionSign, Math.PI * 0.82, {
      colorForAngle,
      opacity: 0.52,
      alphaFalloff: 1.25,
      widthFalloff: 0.72,
      headWidth: Math.max(2.5, radius * 0.045),
      tailWidth: Math.max(1.1, radius * 0.014),
    });
    drawPolylineArc(ctx, centerX, centerY, radius, chargeAngle + directionSign * Math.PI * 0.22, -directionSign, Math.PI * 0.2, {
      colorForAngle,
      opacity: 0.36,
      alphaFalloff: 2.3,
      widthFalloff: 1.6,
      headWidth: Math.max(1.6, radius * 0.026),
      tailWidth: Math.max(0.7, radius * 0.01),
    });
  });
}

function drawArchitrinoMarker(ctx, x, y, color, radius) {
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = radius * 2.4;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, TWO_PI);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(255,255,255,0.78)";
  ctx.stroke();
  ctx.restore();
}

function drawSwarm(ctx, state, swarmId, centerX, centerY, scale, timeSeconds) {
  const role = state.pair[swarmId].role;
  const pathsVisible = state.view?.pathsVisible !== false;
  ctx.save();
  ctx.fillStyle = "rgba(238, 243, 255, 0.82)";
  ctx.font = "600 12px Helvetica Neue, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`${role} ${state.pair[swarmId].direction.toUpperCase()}`, centerX, centerY - scale * 2.05);

  PHOTON_LAYER_ORDER.forEach((layerId) => {
    if (!getPhotonLayerEnabled(state, swarmId, layerId)) {
      return;
    }
    const layer = getPhotonLayer(state, swarmId, layerId);
    const meta = PHOTON_LAYER_META[layerId];
    const radius = layer.radius * scale;
    if (pathsVisible) {
      ctx.save();
      ctx.strokeStyle = meta.color;
      ctx.globalAlpha = 0.26;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, TWO_PI);
      ctx.stroke();
      ctx.restore();
      drawOrbitPath(ctx, state, swarmId, layerId, centerX, centerY, radius, timeSeconds);
      drawLayerTrail(ctx, state, swarmId, layerId, centerX, centerY, radius, timeSeconds);
    }
    const positrinoAngle = getPhotonLayerAngleRadians(state, swarmId, layerId, timeSeconds, "positrino");
    const electrinoAngle = getPhotonLayerAngleRadians(state, swarmId, layerId, timeSeconds, "electrino");
    drawArchitrinoMarker(
      ctx,
      centerX + Math.cos(positrinoAngle) * radius,
      centerY + Math.sin(positrinoAngle) * radius,
      PHOTON_CHARGE_COLORS.positrino,
      ARCHITRINO_MARKER_RADIUS
    );
    drawArchitrinoMarker(
      ctx,
      centerX + Math.cos(electrinoAngle) * radius,
      centerY + Math.sin(electrinoAngle) * radius,
      PHOTON_CHARGE_COLORS.electrino,
      ARCHITRINO_MARKER_RADIUS
    );
    ctx.fillStyle = meta.color;
    ctx.font = "700 11px Helvetica Neue, Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(layerId, centerX + radius + 6, centerY + 4);
  });

  ctx.strokeStyle = "rgba(245, 247, 255, 0.34)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(centerX - scale * 1.85, centerY);
  ctx.lineTo(centerX + scale * 1.85, centerY);
  ctx.stroke();
  ctx.restore();
}

function wrapCanvasText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth || !line) {
      line = candidate;
      return;
    }
    lines.push(line);
    line = word;
  });
  if (line) {
    lines.push(line);
  }
  return lines;
}

function drawStageOrientationNote(ctx, cssWidth, cssHeight) {
  const maxWidth = Math.max(180, cssWidth - 44);
  ctx.save();
  ctx.font = "600 11px Helvetica Neue, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const lines = wrapCanvasText(ctx, STAGE_ORIENTATION_NOTE, maxWidth).slice(0, 2);
  const lineHeight = 14;
  const boxWidth = Math.min(
    maxWidth + 20,
    Math.max(...lines.map((line) => ctx.measureText(line).width), 120) + 20
  );
  const boxHeight = lines.length * lineHeight + 12;
  const x = cssWidth / 2;
  const y = cssHeight - boxHeight / 2 - 10;
  ctx.fillStyle = "rgba(2, 6, 23, 0.58)";
  ctx.strokeStyle = "rgba(148, 163, 184, 0.18)";
  ctx.lineWidth = 1;
  const radius = 6;
  const left = x - boxWidth / 2;
  const top = y - boxHeight / 2;
  ctx.beginPath();
  ctx.moveTo(left + radius, top);
  ctx.lineTo(left + boxWidth - radius, top);
  ctx.quadraticCurveTo(left + boxWidth, top, left + boxWidth, top + radius);
  ctx.lineTo(left + boxWidth, top + boxHeight - radius);
  ctx.quadraticCurveTo(left + boxWidth, top + boxHeight, left + boxWidth - radius, top + boxHeight);
  ctx.lineTo(left + radius, top + boxHeight);
  ctx.quadraticCurveTo(left, top + boxHeight, left, top + boxHeight - radius);
  ctx.lineTo(left, top + radius);
  ctx.quadraticCurveTo(left, top, left + radius, top);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "rgba(226, 232, 240, 0.78)";
  const firstLineY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, index) => {
    ctx.fillText(line, x, firstLineY + index * lineHeight);
  });
  ctx.restore();
}

export function drawPhotonSwarmStage(canvas, state, timeSeconds, options = {}) {
  const { windowLike = globalThis.window } = options;
  const ctx = canvas.getContext("2d");
  const { width, height, pixelRatio } = resizeCanvasToDisplaySize(canvas, windowLike);
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  const cssWidth = width / pixelRatio;
  const cssHeight = height / pixelRatio;
  ctx.clearRect(0, 0, cssWidth, cssHeight);
  const gradient = ctx.createLinearGradient(0, 0, 0, cssHeight);
  gradient.addColorStop(0, "rgba(17, 24, 39, 0.98)");
  gradient.addColorStop(1, "rgba(5, 8, 18, 0.98)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, cssWidth, cssHeight);

  const maxLayerRadius = Math.max(
    ...PHOTON_LAYER_ORDER.flatMap((layerId) => [
      getPhotonLayer(state, "left", layerId).radius,
      getPhotonLayer(state, "right", layerId).radius,
    ])
  );
  const scale = Math.min(cssHeight * 0.31, cssWidth * 0.15) / Math.max(0.1, maxLayerRadius);
  const separationProgress = clampPhotonNumber(
    state.pair.pairSeparation,
    PHOTON_CONTROL_RANGES.pairSeparation.min,
    PHOTON_CONTROL_RANGES.pairSeparation.max,
    4
  ) / PHOTON_CONTROL_RANGES.pairSeparation.max;
  const separationPx = cssWidth * (0.28 + separationProgress * 0.22);
  const centerY = cssHeight * 0.54;
  const leftX = cssWidth / 2 - separationPx / 2;
  const rightX = cssWidth / 2 + separationPx / 2;

  ctx.save();
  ctx.strokeStyle = "rgba(251, 191, 36, 0.5)";
  ctx.fillStyle = "rgba(251, 191, 36, 0.7)";
  ctx.lineWidth = 1.2;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(Math.max(18, leftX - scale * 2.35), centerY);
  ctx.lineTo(Math.min(cssWidth - 28, rightX + scale * 2.35), centerY);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(Math.min(cssWidth - 28, rightX + scale * 2.35), centerY);
  ctx.lineTo(Math.min(cssWidth - 44, rightX + scale * 2.16), centerY - 6);
  ctx.lineTo(Math.min(cssWidth - 44, rightX + scale * 2.16), centerY + 6);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  drawSwarm(ctx, state, "left", leftX, centerY, scale, timeSeconds);
  drawSwarm(ctx, state, "right", rightX, centerY, scale, timeSeconds);
  drawStageOrientationNote(ctx, cssWidth, cssHeight);
}

function drawPlotCurve(ctx, samples, width, height, key, color, currentTime, amplitudeScale = 1) {
  const top = 24;
  const bottom = height - 28;
  const mid = (top + bottom) / 2;
  const amplitude = (bottom - top) * 0.42;
  const scale = Math.max(1e-9, amplitudeScale);
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  let started = false;
  samples.forEach((sample) => {
    if (sample.t > currentTime) {
      return;
    }
    const x = sample.progress * width;
    const y = mid - (sample[key] / scale) * amplitude;
    if (!started) {
      ctx.moveTo(x, y);
      started = true;
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();
  ctx.restore();
}

function getPlotAmplitudeScale(samples, keys) {
  return Math.max(
    1,
    ...samples.flatMap((sample) => keys.map((key) => Math.abs(Number(sample[key]) || 0)))
  );
}

function createPhotonFieldPlotCacheKey(state) {
  return JSON.stringify({
    pair: state.pair,
    measurement: state.measurement,
    time: {
      cycleReferenceLayer: state.time?.cycleReferenceLayer,
      cycleCount: state.time?.cycleCount,
    },
    analyzerAngleDeg: state.polarization?.analyzerAngleDeg,
  });
}

function getPhotonFieldPlotSamples(state) {
  const key = createPhotonFieldPlotCacheKey(state);
  if (photonFieldPlotCache.key !== key || !photonFieldPlotCache.plot) {
    photonFieldPlotCache = {
      key,
      plot: buildPhotonPlotSamples(state, 0, PHOTON_FIELD_PLOT_SAMPLE_COUNT),
    };
  }
  return photonFieldPlotCache.plot;
}

function drawPhotonComponentPlot(canvas, state, timeSeconds, options = {}) {
  const { windowLike = globalThis.window, components = [] } = options;
  const ctx = canvas.getContext("2d");
  const { width, height, pixelRatio } = resizeCanvasToDisplaySize(canvas, windowLike);
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  const cssWidth = width / pixelRatio;
  const cssHeight = height / pixelRatio;
  ctx.clearRect(0, 0, cssWidth, cssHeight);
  ctx.fillStyle = "rgba(6, 9, 18, 0.96)";
  ctx.fillRect(0, 0, cssWidth, cssHeight);

  const plot = getPhotonFieldPlotSamples(state);
  const currentTime = wrapPhotonTime(state, timeSeconds);
  const amplitudeScale = getPlotAmplitudeScale(
    plot.samples,
    components.map((component) => component.key)
  );
  const middleStartX = plot.runDuration > 0 ? (plot.middleCycle.start / plot.runDuration) * cssWidth : 0;
  const middleEndX = plot.runDuration > 0 ? (plot.middleCycle.end / plot.runDuration) * cssWidth : 0;

  ctx.save();
  ctx.strokeStyle = "rgba(148, 163, 184, 0.16)";
  ctx.lineWidth = 1;
  for (let index = 0; index <= 6; index += 1) {
    const x = (index / 6) * cssWidth;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, cssHeight);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(245, 247, 255, 0.18)";
  ctx.beginPath();
  ctx.moveTo(0, cssHeight / 2);
  ctx.lineTo(cssWidth, cssHeight / 2);
  ctx.stroke();
  ctx.strokeStyle = "rgba(251, 191, 36, 0.72)";
  [middleStartX, middleEndX].forEach((x) => {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, cssHeight);
    ctx.stroke();
  });
  ctx.restore();

  components.forEach((component) => {
    drawPlotCurve(
      ctx,
      plot.samples,
      cssWidth,
      cssHeight,
      component.key,
      component.color,
      currentTime,
      amplitudeScale
    );
  });

  const cursorX = plot.runDuration > 0 ? (currentTime / plot.runDuration) * cssWidth : 0;
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.72)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cursorX, 0);
  ctx.lineTo(cursorX, cssHeight);
  ctx.stroke();
  ctx.font = "600 11px Helvetica Neue, Arial, sans-serif";
  const legendWidth = components.reduce(
    (sum, component) => sum + ctx.measureText(component.label).width + 16,
    0
  );
  let legendX = Math.max(12, cssWidth - legendWidth - 14);
  components.forEach((component) => {
    ctx.fillStyle = component.color;
    ctx.fillText(component.label, legendX, 18);
    legendX += ctx.measureText(component.label).width + 16;
  });
  ctx.fillStyle = "rgba(238, 243, 255, 0.6)";
  ctx.fillText(`x${amplitudeScale.toFixed(2)}`, 12, cssHeight - 10);
  ctx.restore();
}

export function drawPhotonElectricFieldPlot(canvas, state, timeSeconds, options = {}) {
  drawPhotonComponentPlot(canvas, state, timeSeconds, {
    ...options,
    components: [
      { key: "eu", label: "E_u", color: "#7dd3fc" },
      { key: "ev", label: "E_v", color: "#f472b6" },
    ],
  });
}

export function drawPhotonComparisonBFieldPlot(canvas, state, timeSeconds, options = {}) {
  drawPhotonComponentPlot(canvas, state, timeSeconds, {
    ...options,
    components: [
      { key: "bu", label: "B_u", color: "#86efac" },
      { key: "bv", label: "B_v", color: "#fbbf24" },
    ],
  });
}
