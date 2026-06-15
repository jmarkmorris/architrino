import {
  PHOTON_CHARGE_COLORS,
  PHOTON_CONTROL_RANGES,
  PHOTON_LAYER_META,
  PHOTON_LAYER_ORDER,
  clampPhotonNumber,
  getPhotonLayer,
  getPhotonLayerEnabled,
  getPhotonLayerAngleRadians,
  getPhotonSeparationLog10Ratio,
  wrapPhotonTime,
} from "./PhotonStateRuntime.js";
import {
  buildPhotonDerivedPolarizationTrace,
  buildPhotonPlotSamples,
} from "./PhotonFormulaRuntime.js";

const TWO_PI = Math.PI * 2;
const ARCHITRINO_MARKER_RADIUS = 5.2;
const PHOTON_FIELD_PLOT_MIN_SAMPLE_COUNT = 360;
const PHOTON_FIELD_PLOT_MAX_SAMPLE_COUNT = 900;
const PHOTON_FIELD_PLOT_SAMPLES_PER_CSS_PIXEL = 0.75;
const PHOTON_FIELD_PLOT_FORWARD_GAP_FRACTION = 0.15;
const PHOTON_FIELD_PLOT_TOP_INSET = 24;
const PHOTON_FIELD_PLOT_BOTTOM_INSET = 34;
const PHOTON_FIELD_PANEL_BOTTOM_TEXT_INSET = 14;
const PHOTON_FIELD_PANEL_TEXT_FONT = "700 12px Helvetica Neue, Arial, sans-serif";
const PHOTON_STAGE_TEXT_FONT = "730 12px Helvetica Neue, Arial, sans-serif";
const PHOTON_STAGE_AXIS_GLYPH_FONT = "730 10px Helvetica Neue, Arial, sans-serif";
const PHOTON_FACE_PAIR_TITLE = "Contra-rotating, Offset, Planar Swarms";
const PHOTON_STAGE_WHITE_LABEL_COLOR = "#ffffff";
const PHOTON_TRANSLATION_AXIS_COLOR = "rgba(251, 191, 36, 0.92)";
const PHOTON_FACE_AXIS_COLOR = "rgba(251, 191, 36, 0.82)";

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

function drawPhotonAxisArrowHead(ctx, tipX, tipY, direction, size) {
  const lateral = size * 0.58;
  ctx.beginPath();
  if (direction === "right") {
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(tipX - size, tipY - lateral);
    ctx.lineTo(tipX - size, tipY + lateral);
  } else {
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(tipX - lateral, tipY + size);
    ctx.lineTo(tipX + lateral, tipY + size);
  }
  ctx.closePath();
  ctx.fill();
}

function drawPhotonFaceAxisGlyph(ctx, centerX, centerY, maxRadiusPx) {
  const radius = Math.max(18, maxRadiusPx);
  const armLength = Math.max(18, Math.min(26, radius * 0.18));
  const dotRadius = 3.2;
  const originX = centerX;
  const originY = centerY;
  const yTipX = originX + armLength;
  const zTipY = originY - armLength;

  ctx.save();
  ctx.strokeStyle = PHOTON_FACE_AXIS_COLOR;
  ctx.fillStyle = PHOTON_FACE_AXIS_COLOR;
  ctx.lineWidth = 1.3;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(originX + dotRadius + 2, originY);
  ctx.lineTo(yTipX, originY);
  ctx.moveTo(originX, originY - dotRadius - 2);
  ctx.lineTo(originX, zTipY);
  ctx.stroke();
  drawPhotonAxisArrowHead(ctx, yTipX, originY, "right", 4.4);
  drawPhotonAxisArrowHead(ctx, originX, zTipY, "up", 4.4);

  ctx.font = PHOTON_STAGE_AXIS_GLYPH_FONT;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("y", yTipX + 5, originY);
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText("z", originX, zTipY - 5);

  ctx.strokeStyle = PHOTON_FACE_AXIS_COLOR;
  ctx.fillStyle = PHOTON_FACE_AXIS_COLOR;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(originX, originY, dotRadius, 0, TWO_PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(originX, originY, 1.1, 0, TWO_PI);
  ctx.fill();
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("x", originX + dotRadius + 5, originY + 4);
  ctx.restore();
}

function getPhotonLayerRadii(state, { enabledOnly = false } = {}) {
  return PHOTON_LAYER_ORDER.flatMap((layerId) =>
    ["left", "right"].flatMap((swarmId) => {
      if (enabledOnly && !getPhotonLayerEnabled(state, swarmId, layerId)) {
        return [];
      }
      return [getPhotonLayer(state, swarmId, layerId).radius];
    })
  );
}

function getPhotonMaxLayerRadius(state, { enabledOnly = false } = {}) {
  const radii = getPhotonLayerRadii(state, { enabledOnly }).filter((radius) => radius > 0);
  return radii.length > 0 ? Math.max(...radii) : 0;
}

function getPhotonSwarmMaxLayerRadius(state, swarmId, { enabledOnly = false } = {}) {
  const radii = PHOTON_LAYER_ORDER.flatMap((layerId) => {
    if (enabledOnly && !getPhotonLayerEnabled(state, swarmId, layerId)) {
      return [];
    }
    return [getPhotonLayer(state, swarmId, layerId).radius];
  }).filter((radius) => radius > 0);
  return radii.length > 0 ? Math.max(...radii) : 0;
}

function drawSwarm(ctx, state, swarmId, centerX, centerY, scale, timeSeconds) {
  const pathsVisible = state.view?.pathsVisible !== false;
  const glyphRadius = Math.max(
    getPhotonMaxLayerRadius(state, { enabledOnly: true }),
    getPhotonMaxLayerRadius(state),
    0.1
  ) * scale;
  ctx.save();

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
  });

  drawPhotonFaceAxisGlyph(ctx, centerX, centerY, glyphRadius);
  ctx.restore();
}

function drawPhotonFaceLabels(ctx, state, layout) {
  ctx.save();
  ctx.fillStyle = PHOTON_STAGE_WHITE_LABEL_COLOR;
  ctx.font = PHOTON_STAGE_TEXT_FONT;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(state.pair.left.role, layout.faceLeftX, layout.faceLabelY);
  ctx.fillText(state.pair.right.role, layout.faceRightX, layout.faceLabelY);
  ctx.restore();
}

function drawPhotonFacePairTitle(ctx, layout) {
  ctx.save();
  ctx.fillStyle = PHOTON_STAGE_WHITE_LABEL_COLOR;
  ctx.font = PHOTON_STAGE_TEXT_FONT;
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText(PHOTON_FACE_PAIR_TITLE, (layout.faceLeftX + layout.faceRightX) / 2, layout.topLabelY);
  ctx.restore();
}

function drawSideSwarmTrace(ctx, state, swarmId, x, centerY, halfHeight, scale, timeSeconds, labelY) {
  if (halfHeight <= 1) {
    return;
  }
  const top = centerY - halfHeight;
  const bottom = centerY + halfHeight;
  ctx.save();
  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(129, 0, 188, 0.88)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x, top);
  ctx.lineTo(x, bottom);
  ctx.stroke();

  PHOTON_LAYER_ORDER.forEach((layerId) => {
    if (!getPhotonLayerEnabled(state, swarmId, layerId)) {
      return;
    }
    const layer = getPhotonLayer(state, swarmId, layerId);
    const radius = layer.radius * scale;
    ["positrino", "electrino"].forEach((chargeType) => {
      const angle = getPhotonLayerAngleRadians(state, swarmId, layerId, timeSeconds, chargeType);
      const markerY = centerY + Math.sin(angle) * radius;
      drawArchitrinoMarker(
        ctx,
        x,
        markerY,
        PHOTON_CHARGE_COLORS[chargeType],
        ARCHITRINO_MARKER_RADIUS * 0.82
      );
    });
  });

  ctx.shadowBlur = 0;
  ctx.fillStyle = PHOTON_STAGE_WHITE_LABEL_COLOR;
  ctx.font = PHOTON_STAGE_TEXT_FONT;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(state.pair[swarmId].role, x, labelY);
  ctx.restore();
}

function drawPhotonSideDeltaMarker(ctx, layout) {
  const traceTopY = layout.centerY - layout.sideHalfHeight;
  const y = Math.max(
    layout.topLabelY + 26,
    Math.min(traceTopY - 14, layout.topLabelY + 42)
  );
  if (!Number.isFinite(y) || y >= traceTopY - 6) {
    return;
  }

  const centerX = layout.sideCenterX;
  const label = "Δx";
  const arrowHead = 7;

  ctx.save();
  ctx.strokeStyle = PHOTON_STAGE_WHITE_LABEL_COLOR;
  ctx.fillStyle = PHOTON_STAGE_WHITE_LABEL_COLOR;
  ctx.font = PHOTON_STAGE_TEXT_FONT;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const labelGap = Math.max(14, ctx.measureText(label).width / 2 + 8);
  const leftInnerX = Math.min(centerX - labelGap, layout.sideRightX - arrowHead * 2);
  const rightInnerX = Math.max(centerX + labelGap, layout.sideLeftX + arrowHead * 2);

  ctx.lineWidth = 1.8;
  ctx.lineCap = "square";
  ctx.beginPath();
  ctx.moveTo(layout.sideLeftX, y);
  ctx.lineTo(leftInnerX, y);
  ctx.moveTo(rightInnerX, y);
  ctx.lineTo(layout.sideRightX, y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(layout.sideLeftX, y);
  ctx.lineTo(layout.sideLeftX + arrowHead, y - 4.5);
  ctx.lineTo(layout.sideLeftX + arrowHead, y + 4.5);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(layout.sideRightX, y);
  ctx.lineTo(layout.sideRightX - arrowHead, y - 4.5);
  ctx.lineTo(layout.sideRightX - arrowHead, y + 4.5);
  ctx.closePath();
  ctx.fill();

  ctx.fillText(label, centerX, y);
  ctx.restore();
}

function drawPhotonSideView(ctx, state, layout, timeSeconds) {
  const { sideCenterX, sideLeftX, sideRightX, centerY, sideHalfHeight, scale, topLabelY, bottomLabelY } = layout;
  if (sideHalfHeight <= 1) {
    return;
  }
  ctx.save();
  ctx.fillStyle = PHOTON_STAGE_WHITE_LABEL_COLOR;
  ctx.font = PHOTON_STAGE_TEXT_FONT;
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText("Side View", sideCenterX, topLabelY);
  drawPhotonSideDeltaMarker(ctx, layout);
  drawSideSwarmTrace(ctx, state, "left", sideLeftX, centerY, sideHalfHeight, scale, timeSeconds, bottomLabelY);
  drawSideSwarmTrace(ctx, state, "right", sideRightX, centerY, sideHalfHeight, scale, timeSeconds, bottomLabelY);
  ctx.restore();
}

export function computePhotonStageLayout(state, cssWidth, cssHeight) {
  const maxLayerRadius = Math.max(0.1, getPhotonMaxLayerRadius(state));
  const leftMaxLayerRadius = Math.max(0.1, getPhotonSwarmMaxLayerRadius(state, "left"));
  const rightMaxLayerRadius = Math.max(0.1, getPhotonSwarmMaxLayerRadius(state, "right"));
  const enabledMaxLayerRadius = getPhotonMaxLayerRadius(state, { enabledOnly: true });
  const faceRadiusPx = Math.min(cssHeight * 0.31, cssWidth * 0.15);
  const scale = faceRadiusPx / maxLayerRadius;
  const faceLeftScale = faceRadiusPx / leftMaxLayerRadius;
  const faceRightScale = faceRadiusPx / rightMaxLayerRadius;
  const separationLog10Ratio = getPhotonSeparationLog10Ratio(state);
  const separationLogRange = PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio;
  const separationProgress = clampPhotonNumber(
    (separationLog10Ratio - separationLogRange.min) / (separationLogRange.max - separationLogRange.min),
    0,
    1,
    0.5
  );
  const centerY = cssHeight * 0.54;
  const faceMaxRadiusPx = faceRadiusPx;
  const faceSpacing = Math.min(
    cssWidth * 0.31,
    Math.max(faceMaxRadiusPx * 2.35, faceRadiusPx * 0.38)
  );
  const facePairCenterX = Math.min(
    cssWidth * 0.38,
    Math.max(cssWidth * 0.32, faceMaxRadiusPx + faceSpacing / 2 + 24)
  );
  const faceLeftX = facePairCenterX - faceSpacing / 2;
  const faceRightX = facePairCenterX + faceSpacing / 2;
  const sideSeparationPx = cssWidth * (0.035 + separationProgress * 0.16);
  const sideCenterBaseX = Math.max(faceRightX + faceMaxRadiusPx + 100, cssWidth * 0.79);
  const sideCenterX = Math.min(cssWidth - sideSeparationPx / 2 - 42, sideCenterBaseX);
  const sideLeftX = sideCenterX - sideSeparationPx / 2;
  const sideRightX = sideCenterX + sideSeparationPx / 2;
  const translationOriginX = sideCenterX;
  const topLabelY = Math.max(24, centerY - faceMaxRadiusPx - 44);
  const sideHalfHeight = enabledMaxLayerRadius * scale;
  const bottomLabelY = centerY + sideHalfHeight + 9;
  const faceLabelY = centerY + faceMaxRadiusPx + 9;
  const translationAxisStartX = Math.max(18, sideLeftX - 44);
  const translationAxisEndX = Math.min(cssWidth - 28, sideRightX + 64);
  const translationArrowBaseX = Math.max(translationAxisStartX + 10, translationAxisEndX - 18);
  return {
    scale,
    faceLeftScale,
    faceRightScale,
    centerY,
    faceLeftX,
    faceRightX,
    sideCenterX,
    sideLeftX,
    sideRightX,
    translationOriginX,
    sideHalfHeight,
    topLabelY,
    bottomLabelY,
    faceLabelY,
    translationAxisStartX,
    translationAxisEndX,
    translationArrowBaseX,
  };
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
  const layout = computePhotonStageLayout(state, cssWidth, cssHeight);

  ctx.save();
  ctx.strokeStyle = "rgba(251, 191, 36, 0.5)";
  ctx.fillStyle = "rgba(251, 191, 36, 0.7)";
  ctx.lineWidth = 1.2;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(layout.translationAxisStartX, layout.centerY);
  ctx.lineTo(layout.translationAxisEndX, layout.centerY);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(layout.translationAxisEndX, layout.centerY);
  ctx.lineTo(layout.translationArrowBaseX, layout.centerY - 6);
  ctx.lineTo(layout.translationArrowBaseX, layout.centerY + 6);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = PHOTON_TRANSLATION_AXIS_COLOR;
  ctx.font = PHOTON_STAGE_TEXT_FONT;
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  const translationAxisLabelY = layout.centerY - 8;
  ctx.fillText("x", Math.min(cssWidth - 18, layout.translationAxisEndX + 10), translationAxisLabelY);
  ctx.strokeStyle = PHOTON_TRANSLATION_AXIS_COLOR;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(layout.translationOriginX, layout.centerY - 8);
  ctx.lineTo(layout.translationOriginX, layout.centerY + 8);
  ctx.stroke();
  ctx.font = PHOTON_STAGE_TEXT_FONT;
  ctx.fillText("0", layout.translationOriginX, translationAxisLabelY);
  ctx.restore();

  drawPhotonFacePairTitle(ctx, layout);
  drawSwarm(ctx, state, "left", layout.faceLeftX, layout.centerY, layout.faceLeftScale, timeSeconds);
  drawSwarm(ctx, state, "right", layout.faceRightX, layout.centerY, layout.faceRightScale, timeSeconds);
  drawPhotonFaceLabels(ctx, state, layout);
  drawPhotonSideView(ctx, state, layout, timeSeconds);
}

function normalizePhotonPlotProgress(progress) {
  if (!Number.isFinite(progress)) {
    return 0;
  }
  return ((progress % 1) + 1) % 1;
}

export function isPhotonPlotSampleInForwardGap(
  sampleProgress,
  currentProgress,
  gapFraction = PHOTON_FIELD_PLOT_FORWARD_GAP_FRACTION
) {
  const boundedGap = Math.max(0, Math.min(0.5, Number(gapFraction) || 0));
  const ahead = (
    normalizePhotonPlotProgress(sampleProgress) -
    normalizePhotonPlotProgress(currentProgress) +
    1
  ) % 1;
  return ahead > 0 && ahead <= boundedGap;
}

function drawPlotCurve(ctx, samples, width, height, key, color, currentProgress, amplitudeScale = 1) {
  const top = PHOTON_FIELD_PLOT_TOP_INSET;
  const bottom = height - PHOTON_FIELD_PLOT_BOTTOM_INSET;
  const mid = getPhotonFieldAxisY(height);
  const amplitude = (bottom - top) * 0.42;
  const scale = Math.max(1e-9, amplitudeScale);
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  let started = false;
  samples.forEach((sample) => {
    if (isPhotonPlotSampleInForwardGap(sample.progress, currentProgress)) {
      if (started) {
        ctx.stroke();
        ctx.beginPath();
        started = false;
      }
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
  if (started) {
    ctx.stroke();
  }
  ctx.restore();
}

function getPlotAmplitudeScale(samples, keys, currentProgress = null) {
  const visibleSamples = currentProgress === null
    ? samples
    : samples.filter((sample) => !isPhotonPlotSampleInForwardGap(sample.progress, currentProgress));
  return Math.max(
    0,
    ...visibleSamples.flatMap((sample) => keys.map((key) => Math.abs(Number(sample[key]) || 0)))
  );
}

function formatPhotonPlotEmax(value) {
  const number = Math.abs(Number(value) || 0);
  if (!Number.isFinite(number) || number <= 1e-12) {
    return "0";
  }
  if (number < 0.01 || number >= 100) {
    return number.toExponential(2);
  }
  const digits = number >= 10 ? 1 : 3;
  return number.toFixed(digits).replace(/0+$/, "").replace(/\.$/, "");
}

function getPhotonFieldAxisY(cssHeight) {
  return (PHOTON_FIELD_PLOT_TOP_INSET + (cssHeight - PHOTON_FIELD_PLOT_BOTTOM_INSET)) / 2;
}

export function getPhotonFieldPlotSampleCount(cssWidth) {
  const width = Math.max(0, Number(cssWidth) || 0);
  return Math.round(
    Math.max(
      PHOTON_FIELD_PLOT_MIN_SAMPLE_COUNT,
      Math.min(PHOTON_FIELD_PLOT_MAX_SAMPLE_COUNT, width * PHOTON_FIELD_PLOT_SAMPLES_PER_CSS_PIXEL)
    )
  );
}

function createPhotonFieldPlotCacheKey(state, sampleCount) {
  return JSON.stringify({
    pair: state.pair,
    measurement: state.measurement,
    time: {
      cycleReferenceLayer: state.time?.cycleReferenceLayer,
      cycleCount: state.time?.cycleCount,
    },
    sampleCount,
    analyzerAngleDeg: state.polarization?.analyzerAngleDeg,
  });
}

function getPhotonFieldPlotSamples(state, sampleCount) {
  const key = createPhotonFieldPlotCacheKey(state, sampleCount);
  if (photonFieldPlotCache.key !== key || !photonFieldPlotCache.plot) {
    photonFieldPlotCache = {
      key,
      plot: buildPhotonPlotSamples(state, 0, sampleCount),
    };
  }
  return photonFieldPlotCache.plot;
}

function mapPhotonPolarizationPoint(point, centerX, centerY, radius, scale) {
  const divisor = Math.max(1e-9, scale);
  return {
    x: centerX + (point.ey / divisor) * radius,
    y: centerY - (point.ez / divisor) * radius,
  };
}

function drawPhotonPolarizationAxes(ctx, centerX, centerY, radius) {
  ctx.save();
  ctx.strokeStyle = "rgba(148, 163, 184, 0.34)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(centerX - radius, centerY);
  ctx.lineTo(centerX + radius, centerY);
  ctx.moveTo(centerX, centerY + radius);
  ctx.lineTo(centerX, centerY - radius);
  ctx.stroke();
  ctx.strokeStyle = "rgba(148, 163, 184, 0.12)";
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, TWO_PI);
  ctx.stroke();
  ctx.fillStyle = "rgba(238, 243, 255, 0.72)";
  ctx.font = PHOTON_FIELD_PANEL_TEXT_FONT;
  ctx.fillText("E_y", centerX + radius - 20, centerY - 7);
  ctx.fillText("E_z", centerX + 7, centerY - radius + 12);
  ctx.restore();
}

function drawPhotonPolarizationAnalyzerAxis(ctx, trace, centerX, centerY, radius, scale) {
  const axis = {
    ey: trace.analyzer.y * trace.scale,
    ez: trace.analyzer.z * trace.scale,
  };
  const axisStart = mapPhotonPolarizationPoint({ ey: -axis.ey, ez: -axis.ez }, centerX, centerY, radius, scale);
  const axisEnd = mapPhotonPolarizationPoint(axis, centerX, centerY, radius, scale);

  ctx.save();
  ctx.strokeStyle = "rgba(251, 191, 36, 0.72)";
  ctx.lineWidth = 1.4;
  ctx.setLineDash([6, 5]);
  ctx.beginPath();
  ctx.moveTo(axisStart.x, axisStart.y);
  ctx.lineTo(axisEnd.x, axisEnd.y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

function getPhotonCenteredRawPolarizationPoint(trace, sample) {
  return {
    ey: (Number(sample?.ey) || 0) - (Number(trace.components?.y?.dc) || 0),
    ez: (Number(sample?.ez) || 0) - (Number(trace.components?.z?.dc) || 0),
  };
}

function drawPhotonPolarizationRawOverlay(ctx, trace, centerX, centerY, radius, scale) {
  if (!trace.rawSamples.length) {
    return;
  }

  const rawPoints = trace.rawSamples.map((sample) =>
    mapPhotonPolarizationPoint(
      getPhotonCenteredRawPolarizationPoint(trace, sample),
      centerX,
      centerY,
      radius,
      scale
    )
  );

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "rgba(253, 230, 138, 0.1)";
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  rawPoints.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.closePath();
  ctx.stroke();

  ctx.fillStyle = "rgba(238, 243, 255, 0.24)";
  rawPoints.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 1.25, 0, TWO_PI);
    ctx.fill();
  });
  ctx.restore();
}

function drawPhotonPolarizationTrail(ctx, trace, centerX, centerY, radius, scale) {
  if (!trace.samples.length) {
    return;
  }

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const first = mapPhotonPolarizationPoint(trace.samples[0], centerX, centerY, radius, scale);
  const drawClosedTrailPath = () => {
    ctx.beginPath();
    ctx.moveTo(first.x, first.y);
    for (let index = 1; index < trace.samples.length; index += 1) {
      const current = mapPhotonPolarizationPoint(trace.samples[index], centerX, centerY, radius, scale);
      ctx.lineTo(current.x, current.y);
    }
    ctx.closePath();
  };

  ctx.strokeStyle = "rgba(125, 211, 252, 0.18)";
  ctx.lineWidth = 4.2;
  drawClosedTrailPath();
  ctx.stroke();

  ctx.strokeStyle = "rgba(125, 211, 252, 0.78)";
  ctx.lineWidth = 2.1;
  drawClosedTrailPath();
  ctx.stroke();

  ctx.restore();
}

function drawPhotonPolarizationCurrentVector(ctx, trace, centerX, centerY, radius, scale) {
  const current = mapPhotonPolarizationPoint(trace.current, centerX, centerY, radius, scale);
  ctx.save();
  ctx.strokeStyle = "rgba(238, 243, 255, 0.92)";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(current.x, current.y);
  ctx.stroke();

  ctx.fillStyle = "#eef3ff";
  ctx.shadowColor = "rgba(125, 211, 252, 0.9)";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(current.x, current.y, 4.2, 0, TWO_PI);
  ctx.fill();
  ctx.restore();
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

  const sampleCount = getPhotonFieldPlotSampleCount(cssWidth);
  const plot = getPhotonFieldPlotSamples(state, sampleCount);
  const currentTime = wrapPhotonTime(state, timeSeconds);
  const currentProgress = plot.runDuration > 0 ? currentTime / plot.runDuration : 0;
  const amplitudeScale = getPlotAmplitudeScale(
    plot.samples,
    components.map((component) => component.key),
    currentProgress
  );
  const plotTop = PHOTON_FIELD_PLOT_TOP_INSET;
  const plotBottom = cssHeight - PHOTON_FIELD_PLOT_BOTTOM_INSET;
  const plotMid = getPhotonFieldAxisY(cssHeight);

  ctx.save();
  ctx.strokeStyle = "rgba(148, 163, 184, 0.16)";
  ctx.lineWidth = 1;
  for (let index = 0; index <= 6; index += 1) {
    const x = (index / 6) * cssWidth;
    ctx.beginPath();
    ctx.moveTo(x, plotTop);
    ctx.lineTo(x, plotBottom);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(245, 247, 255, 0.18)";
  ctx.beginPath();
  ctx.moveTo(0, plotMid);
  ctx.lineTo(cssWidth, plotMid);
  ctx.stroke();
  ctx.restore();

  components.forEach((component) => {
    drawPlotCurve(
      ctx,
      plot.samples,
      cssWidth,
      cssHeight,
      component.key,
      component.color,
      currentProgress,
      amplitudeScale
    );
  });

  const cursorX = currentProgress * cssWidth;
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.72)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cursorX, plotTop);
  ctx.lineTo(cursorX, plotBottom);
  ctx.stroke();
  ctx.font = PHOTON_FIELD_PANEL_TEXT_FONT;
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
  ctx.textBaseline = "bottom";
  ctx.fillText(`Max E = ${formatPhotonPlotEmax(amplitudeScale)}`, 12, cssHeight - PHOTON_FIELD_PANEL_BOTTOM_TEXT_INSET);
  ctx.restore();
}

export function drawPhotonElectricFieldPlot(canvas, state, timeSeconds, options = {}) {
  drawPhotonComponentPlot(canvas, state, timeSeconds, {
    ...options,
    components: [
      { key: "ey", label: "E_y", color: "#fde68a" },
      { key: "ez", label: "E_z", color: "#86efac" },
    ],
  });
}

export function drawPhotonPolarizationInset(canvas, state, timeSeconds, options = {}) {
  const { windowLike = globalThis.window } = options;
  const ctx = canvas.getContext("2d");
  const { width, height, pixelRatio } = resizeCanvasToDisplaySize(canvas, windowLike);
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  const cssWidth = width / pixelRatio;
  const cssHeight = height / pixelRatio;
  ctx.clearRect(0, 0, cssWidth, cssHeight);
  ctx.fillStyle = "rgba(6, 9, 18, 0.96)";
  ctx.fillRect(0, 0, cssWidth, cssHeight);

  const trace = buildPhotonDerivedPolarizationTrace(state, timeSeconds);
  const centerX = cssWidth / 2;
  const centerY = getPhotonFieldAxisY(cssHeight);
  const radius = Math.max(42, Math.min(cssWidth - 40, cssHeight - 62) * 0.48);

  drawPhotonPolarizationAxes(ctx, centerX, centerY, radius);
  if (state.view?.rawPolarizationVisible !== false) {
    drawPhotonPolarizationRawOverlay(ctx, trace, centerX, centerY, radius, trace.scale);
  }
  drawPhotonPolarizationTrail(ctx, trace, centerX, centerY, radius, trace.scale);
  drawPhotonPolarizationAnalyzerAxis(ctx, trace, centerX, centerY, radius, trace.scale);
  drawPhotonPolarizationCurrentVector(ctx, trace, centerX, centerY, radius, trace.scale);

  ctx.save();
  ctx.fillStyle = "rgba(238, 243, 255, 0.58)";
  ctx.font = PHOTON_FIELD_PANEL_TEXT_FONT;
  ctx.fillText(trace.classificationLabel, 12, 34);
  ctx.fillText(trace.phaseLagDefined ? `lag ${trace.phaseLagDeg.toFixed(1)} deg` : "lag n/a", 12, 50);
  ctx.textBaseline = "bottom";
  ctx.fillText(`Max E = ${formatPhotonPlotEmax(trace.scale)}`, 12, cssHeight - PHOTON_FIELD_PANEL_BOTTOM_TEXT_INSET);
  ctx.restore();
}
