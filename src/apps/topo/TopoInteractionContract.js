export const TOPO_INTERACTION_CONTRACT_ID = "topo_interaction_and_color/v1";
export const TOPO_SYNTHETIC_SURFACE_ID = "topo_synthetic_causal_envelope/v1";
export const TOPO_SOURCE_POSITION = Object.freeze({ x: 2 / 3, y: 1 / 2 });
export const TOPO_REFERENCE_SCALE = 4;
export const TOPO_DISPLAY_CLIP_MAGNITUDE = 64;
export const TOPO_DEFAULT_CONTOUR_RANGE_DECADES = 3;
export const TOPO_DEFAULT_CONTOUR_VISIBILITY = 0.75;
export const TOPO_DISPLAY_MAPPING_ID = "signed-log10";
export const TOPO_HEATMAP_MODE = Object.freeze({
  PHYSICAL_MAGNITUDE: "physical-magnitude",
  ENHANCED_DECADE_CONTRAST: "enhanced-decade-contrast",
});
export const TOPO_DEFAULT_HEATMAP_MODE = TOPO_HEATMAP_MODE.PHYSICAL_MAGNITUDE;
export const TOPO_FIELD_PERCEPTIBILITY_THRESHOLD = 0.3;
export const TOPO_FIRST_CONTOUR_BUDGET_MS = 34;
export const TOPO_MAX_CANVAS_DIMENSION = 4096;
export const TOPO_MAX_CANVAS_PIXELS = 12 * 1024 * 1024;
export const TOPO_WORLD_CHART_ID = "topo_canvas_height_euclidean/v1";
export const TOPO_EXPONENT_RADIUS_CHART_ID =
  "topo_beta_zero_single_source_exponent_radius/v1";
export const TOPO_EXPONENT_RADIUS_MARKER_GAP_CSS = 0;
export const TOPO_EXPONENT_RADIUS_EDGE_INSET_CSS = 2;
export const TOPO_TRANSLATION_AXIS = Object.freeze({
  startX: 0.1,
  endX: 0.9,
  opacity: 0.52,
  widthCss: 1,
  dashCss: 5,
  arrowCss: 5,
});
export const TOPO_SYNTHETIC_CONTOUR_DELAY_RANGE = Object.freeze({
  anchor: 0.025,
});
export const TOPO_INVERSE_SQUARE_SCALE =
  TOPO_DISPLAY_CLIP_MAGNITUDE *
  TOPO_SYNTHETIC_CONTOUR_DELAY_RANGE.anchor ** 2;

export function applyTopoScenarioPolarity(state, scenarioId) {
  const scenario = String(scenarioId ?? "").trim().toLowerCase();
  if (scenario !== "electrino" && scenario !== "positrino") {
    throw new RangeError("Unknown Topo scenario: " + scenarioId);
  }
  return Object.freeze({
    ...state,
    scenarioId: scenario,
    polaritySign: scenario === "positrino" ? 1 : -1,
  });
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function requireFiniteNumber(value, label) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    throw new TypeError(label + " must be finite.");
  }
  return numericValue;
}

export function transformTopoValue(
  rawValue,
  referenceScale = TOPO_REFERENCE_SCALE,
) {
  const raw = requireFiniteNumber(rawValue, "rawValue");
  const scale = requireFiniteNumber(referenceScale, "referenceScale");
  if (scale <= 0) {
    throw new RangeError("referenceScale must be positive.");
  }
  return Math.sign(raw) * Math.log10(1 + Math.abs(raw) / scale);
}

export function inverseTopoTransform(
  transformedValue,
  referenceScale = TOPO_REFERENCE_SCALE,
) {
  const transformed = requireFiniteNumber(transformedValue, "transformedValue");
  const scale = requireFiniteNumber(referenceScale, "referenceScale");
  if (scale <= 0) {
    throw new RangeError("referenceScale must be positive.");
  }
  return Math.sign(transformed) * scale * (10 ** Math.abs(transformed) - 1);
}

export function topoWakeIntensityExponent(
  rawValue,
  referenceMagnitude = TOPO_DISPLAY_CLIP_MAGNITUDE,
) {
  const raw = requireFiniteNumber(rawValue, "rawValue");
  const reference = requireFiniteNumber(
    referenceMagnitude,
    "referenceMagnitude",
  );
  if (!(reference > 0)) {
    throw new RangeError("referenceMagnitude must be positive.");
  }
  return raw === 0
    ? Number.NEGATIVE_INFINITY
    : Math.log10(Math.abs(raw) / reference);
}

export function normalizeTopoPhysicalMagnitudeValue(
  rawValue,
  referenceMagnitude = TOPO_DISPLAY_CLIP_MAGNITUDE,
) {
  const raw = requireFiniteNumber(rawValue, "rawValue");
  const reference = requireFiniteNumber(
    referenceMagnitude,
    "referenceMagnitude",
  );
  if (!(reference > 0)) {
    throw new RangeError("referenceMagnitude must be positive.");
  }
  return Math.sign(raw) * clamp(Math.abs(raw) / reference, 0, 1);
}

export function normalizeTopoDisplayValue(
  rawValue,
  { span = TOPO_DEFAULT_CONTOUR_RANGE_DECADES } = {},
) {
  const raw = requireFiniteNumber(rawValue, "rawValue");
  if (raw === 0) {
    return 0;
  }
  const selectedSpan = topoContourRangeDecades(span);
  const exponent = topoWakeIntensityExponent(raw);
  const clippedExponent = clamp(exponent, -selectedSpan, selectedSpan);
  const lowerDecade = Math.floor(clippedExponent);
  const withinDecade = clippedExponent - lowerDecade;
  const decadeTone = lowerDecade + withinDecade ** 2 *
    (3 - 2 * withinDecade);
  const linearStrength = clamp(
    (decadeTone + selectedSpan) / (2 * selectedSpan),
    0,
    1,
  );
  const strength = linearStrength ** 0.72;
  return Math.sign(raw) * strength;
}

export function normalizeTopoFieldColorValue(
  rawValue,
  {
    mode = TOPO_DEFAULT_HEATMAP_MODE,
    span = TOPO_DEFAULT_CONTOUR_RANGE_DECADES,
  } = {},
) {
  if (mode === TOPO_HEATMAP_MODE.PHYSICAL_MAGNITUDE) {
    return normalizeTopoPhysicalMagnitudeValue(rawValue);
  }
  if (mode === TOPO_HEATMAP_MODE.ENHANCED_DECADE_CONTRAST) {
    return normalizeTopoDisplayValue(rawValue, { span });
  }
  throw new RangeError("Unknown Topo heatmap mode: " + mode);
}

export function normalizeTopoExponentRadiusColorValue(
  rawValue,
  {
    mode = TOPO_DEFAULT_HEATMAP_MODE,
    span = TOPO_DEFAULT_CONTOUR_RANGE_DECADES,
  } = {},
) {
  return normalizeTopoFieldColorValue(rawValue, { mode, span });
}

export function measureTopoCenterlineColorFootprint({
  beta = 0.5,
  threshold = TOPO_FIELD_PERCEPTIBILITY_THRESHOLD,
  samples = 10_001,
  calibrated = true,
} = {}) {
  const sampleCount = Math.max(101, Math.round(requireFiniteNumber(samples, "samples")));
  const visible = [];
  for (let index = 0; index < sampleCount; index += 1) {
    const x = index / (sampleCount - 1);
    if (Math.abs(x - TOPO_SOURCE_POSITION.x) <= 0.01) {
      continue;
    }
    const rawValue = syntheticTopoSignedValue({
      x,
      y: TOPO_SOURCE_POSITION.y,
      beta,
      polaritySign: -1,
    });
    const normalized = calibrated
      ? normalizeTopoFieldColorValue(rawValue)
      : normalizeTopoDisplayValue(rawValue);
    if (Math.abs(normalized) >= threshold) {
      visible.push(x);
    }
  }
  const start = visible[0] ?? null;
  const end = visible.at(-1) ?? null;
  return Object.freeze({
    mappingId: TOPO_DISPLAY_MAPPING_ID,
    beta,
    threshold,
    start,
    end,
    width: start == null || end == null ? 0 : end - start,
  });
}

export function createTopoContourEmphasis(
  visibility = TOPO_DEFAULT_CONTOUR_VISIBILITY,
) {
  const normalized = clamp(
    requireFiniteNumber(visibility, "visibility"),
    0,
    1,
  );
  return Object.freeze({
    opacity: normalized,
    whiteMix: 0,
    widthCss: 1.15,
  });
}

export function createTopoSequentialContourStyle({
  index,
  count,
  visibility = TOPO_DEFAULT_CONTOUR_VISIBILITY,
} = {}) {
  const contourCount = Math.max(1, Math.round(requireFiniteNumber(count, "count")));
  const contourIndex = Math.round(requireFiniteNumber(index, "index"));
  if (contourIndex < 0 || contourIndex >= contourCount) {
    throw new RangeError("index must identify one contour in count.");
  }
  const emphasis = createTopoContourEmphasis(visibility);
  const progress = contourCount === 1
    ? 0
    : contourIndex / (contourCount - 1);
  return Object.freeze({
    index: contourIndex,
    count: contourCount,
    progress,
    opacity: emphasis.opacity,
    whiteMix: emphasis.whiteMix,
    widthCss: emphasis.widthCss,
  });
}

export function topoContourRangeDecades(
  requestedDecades = TOPO_DEFAULT_CONTOUR_RANGE_DECADES,
) {
  const decades = requireFiniteNumber(requestedDecades, "requestedDecades");
  return clamp(Math.round(decades), 1, 4);
}

export function createTopoContourMagnitudeSchedule({
  contourRangeDecades = TOPO_DEFAULT_CONTOUR_RANGE_DECADES,
  referenceMagnitude = TOPO_DISPLAY_CLIP_MAGNITUDE,
} = {}) {
  const span = topoContourRangeDecades(contourRangeDecades);
  const reference = requireFiniteNumber(referenceMagnitude, "referenceMagnitude");
  if (!(reference > 0)) {
    throw new RangeError("referenceMagnitude must be positive.");
  }
  return Object.freeze(
    Array.from({ length: span * 2 + 1 }, (_, index) => {
      const rawDecade = span - index;
      const magnitude = reference * 10 ** rawDecade;
      return Object.freeze({
        magnitude,
        rawDecade,
        referenceLevel: rawDecade === 0,
        levelIdentity: "raw-decade:" + rawDecade + ":" + magnitude,
        majorDecadeLabel: "e=" + rawDecade,
      });
    }),
  );
}

export function createTopoSyntheticContourRenderPlan({
  beta = 0.5,
  contourRangeDecades = TOPO_DEFAULT_CONTOUR_RANGE_DECADES,
} = {}) {
  const selection = createTopoSyntheticContourSelection(contourRangeDecades);
  const circles = createTopoSyntheticContourCircles({
    beta,
    causalDelays: selection.map(({ causalDelay }) => causalDelay),
  });
  return Object.freeze(circles.map((circle, index) => Object.freeze({
    ...circle,
    latticeIndex: selection[index].latticeIndex,
    revealWeight: selection[index].revealWeight,
    majorDecade: selection[index].majorDecade,
    majorDecadeIndex: selection[index].majorDecadeIndex,
    majorDecadeLabel: selection[index].majorDecadeLabel,
    rawDecade: selection[index].rawDecade,
    referenceLevel: selection[index].referenceLevel,
    levelIdentity: selection[index].levelIdentity,
  })));
}

export function createTopoSyntheticContourDelays(
  contourRangeDecades = TOPO_DEFAULT_CONTOUR_RANGE_DECADES,
) {
  return Object.freeze(
    createTopoSyntheticContourSelection(contourRangeDecades)
      .map(({ causalDelay }) => causalDelay),
  );
}

export function createTopoSyntheticContourSelection(
  contourRangeDecades = TOPO_DEFAULT_CONTOUR_RANGE_DECADES,
) {
  const schedule = createTopoContourMagnitudeSchedule({
    contourRangeDecades,
  });
  return Object.freeze(schedule.map((level, index) =>
    Object.freeze({
      ...level,
      latticeIndex: index,
      causalDelay: Math.sqrt(TOPO_INVERSE_SQUARE_SCALE / level.magnitude),
      revealWeight: 1,
      majorDecade: true,
      majorDecadeIndex: level.rawDecade,
    })));
}

export function createTopoSyntheticContourCircles({
  beta = 0.5,
  causalDelays = [],
} = {}) {
  const normalizedBeta = requireFiniteNumber(beta, "beta");
  if (normalizedBeta < 0 || normalizedBeta > 1) {
    throw new RangeError("beta must lie in [0, 1].");
  }
  return Object.freeze(causalDelays.map((candidate, index) => {
    const causalDelay = requireFiniteNumber(candidate, "causalDelay");
    if (!(causalDelay > 0)) {
      throw new RangeError("Synthetic contour delays must be positive.");
    }
    const inverseSquareIntensity = 1 / causalDelay ** 2;
    const rawMagnitude = TOPO_INVERSE_SQUARE_SCALE * inverseSquareIntensity;
    return Object.freeze({
      index,
      level: rawMagnitude,
      rawMagnitude,
      inverseSquareIntensity,
      causalDelay,
      center: Object.freeze({
        x: TOPO_SOURCE_POSITION.x - normalizedBeta * causalDelay,
        y: TOPO_SOURCE_POSITION.y,
      }),
      radius: causalDelay,
    });
  }));
}

export function resolveTopoCanvasPixelSize({
  cssWidth,
  cssHeight,
  devicePixelRatio = 1,
  maxDimension = TOPO_MAX_CANVAS_DIMENSION,
  maxPixels = TOPO_MAX_CANVAS_PIXELS,
} = {}) {
  const width = Math.max(1, requireFiniteNumber(cssWidth, "cssWidth"));
  const height = Math.max(1, requireFiniteNumber(cssHeight, "cssHeight"));
  const pixelRatio = Math.max(
    1,
    requireFiniteNumber(devicePixelRatio, "devicePixelRatio"),
  );
  const dimensionCeiling = Math.max(
    1,
    requireFiniteNumber(maxDimension, "maxDimension"),
  );
  const pixelCeiling = Math.max(1, requireFiniteNumber(maxPixels, "maxPixels"));
  const requestedWidth = Math.max(1, Math.round(width * pixelRatio));
  const requestedHeight = Math.max(1, Math.round(height * pixelRatio));
  const safetyScale = Math.min(
    1,
    dimensionCeiling / requestedWidth,
    dimensionCeiling / requestedHeight,
    Math.sqrt(pixelCeiling / (requestedWidth * requestedHeight)),
  );
  return Object.freeze({
    width: Math.max(1, Math.round(requestedWidth * safetyScale)),
    height: Math.max(1, Math.round(requestedHeight * safetyScale)),
    requestedWidth,
    requestedHeight,
    safetyScale,
  });
}

export function topoWorldPointForCanvasPixel({
  pixelX,
  pixelY,
  width,
  height,
} = {}) {
  const canvasWidth = Math.max(1, requireFiniteNumber(width, "width"));
  const canvasHeight = Math.max(1, requireFiniteNumber(height, "height"));
  const x = requireFiniteNumber(pixelX, "pixelX");
  const y = requireFiniteNumber(pixelY, "pixelY");
  const commonScale = Math.max(1, canvasHeight - 1);
  const sourcePixelX = TOPO_SOURCE_POSITION.x * Math.max(1, canvasWidth - 1);
  const sourcePixelY = (1 - TOPO_SOURCE_POSITION.y) * commonScale;
  return Object.freeze({
    x: TOPO_SOURCE_POSITION.x + (x - sourcePixelX) / commonScale,
    y: TOPO_SOURCE_POSITION.y + (sourcePixelY - y) / commonScale,
  });
}

export function createTopoExponentRadiusChart({
  width,
  height,
  pixelRatio = 1,
  sourceMarkerRadiusPixels,
  contourRangeDecades = TOPO_DEFAULT_CONTOUR_RANGE_DECADES,
} = {}) {
  const canvasWidth = Math.max(1, requireFiniteNumber(width, "width"));
  const canvasHeight = Math.max(1, requireFiniteNumber(height, "height"));
  const density = Math.max(1, requireFiniteNumber(pixelRatio, "pixelRatio"));
  const markerRadius = Math.max(
    0,
    requireFiniteNumber(sourceMarkerRadiusPixels, "sourceMarkerRadiusPixels"),
  );
  const span = topoContourRangeDecades(contourRangeDecades);
  const sourcePixelX = TOPO_SOURCE_POSITION.x * Math.max(1, canvasWidth - 1);
  const sourcePixelY = (1 - TOPO_SOURCE_POSITION.y) *
    Math.max(1, canvasHeight - 1);
  const boundaryRadius = Math.min(
    sourcePixelX,
    Math.max(1, canvasWidth - 1) - sourcePixelX,
    sourcePixelY,
    Math.max(1, canvasHeight - 1) - sourcePixelY,
  );
  const innerRadiusPixels = markerRadius +
    TOPO_EXPONENT_RADIUS_MARKER_GAP_CSS * density;
  const outerRadiusPixels = boundaryRadius -
    TOPO_EXPONENT_RADIUS_EDGE_INSET_CSS * density;
  if (!(outerRadiusPixels > innerRadiusPixels)) {
    throw new RangeError(
      "Exponent-radius chart requires room outside the source marker.",
    );
  }
  return Object.freeze({
    chartId: TOPO_EXPONENT_RADIUS_CHART_ID,
    span,
    sourcePixelX,
    sourcePixelY,
    innerRadiusPixels,
    outerRadiusPixels,
    radialStepPixels: (outerRadiusPixels - innerRadiusPixels) / (2 * span),
    referenceMagnitude: TOPO_DISPLAY_CLIP_MAGNITUDE,
    referencePhysicalRadius: TOPO_SYNTHETIC_CONTOUR_DELAY_RANGE.anchor,
    outsidePolicy: "neutral-clip-no-clamp",
  });
}

export function topoExponentDisplayRadiusForExponent({
  exponent,
  chart,
} = {}) {
  const value = requireFiniteNumber(exponent, "exponent");
  if (!chart || chart.chartId !== TOPO_EXPONENT_RADIUS_CHART_ID) {
    throw new TypeError("A Topo exponent-radius chart is required.");
  }
  return chart.innerRadiusPixels + (chart.span - value) *
    chart.radialStepPixels;
}

export function topoPhysicalRadiusForWakeExponent(exponent) {
  const value = requireFiniteNumber(exponent, "exponent");
  return TOPO_SYNTHETIC_CONTOUR_DELAY_RANGE.anchor * 10 ** (-value / 2);
}

export function topoExponentRadiusPhysicalPointForCanvasPixel({
  pixelX,
  pixelY,
  width,
  height,
  chart,
} = {}) {
  const x = requireFiniteNumber(pixelX, "pixelX");
  const y = requireFiniteNumber(pixelY, "pixelY");
  if (!chart || chart.chartId !== TOPO_EXPONENT_RADIUS_CHART_ID) {
    throw new TypeError("A Topo exponent-radius chart is required.");
  }
  const displayRadiusPixels = Math.hypot(
    x - chart.sourcePixelX,
    y - chart.sourcePixelY,
  );
  if (displayRadiusPixels < chart.innerRadiusPixels) {
    return Object.freeze({
      state: "masked:inside_exponent_radius",
      exponent: null,
      physicalPoint: null,
    });
  }
  if (displayRadiusPixels > chart.outerRadiusPixels) {
    return Object.freeze({
      state: "clipped:outside_exponent_radius",
      exponent: null,
      physicalPoint: null,
    });
  }
  const exponent = chart.span -
    (displayRadiusPixels - chart.innerRadiusPixels) /
      chart.radialStepPixels;
  const physicalRadius = topoPhysicalRadiusForWakeExponent(exponent);
  const displayPoint = topoWorldPointForCanvasPixel({
    pixelX: x,
    pixelY: y,
    width,
    height,
  });
  const displayWorldRadius = Math.hypot(
    displayPoint.x - TOPO_SOURCE_POSITION.x,
    displayPoint.y - TOPO_SOURCE_POSITION.y,
  );
  const scale = physicalRadius / displayWorldRadius;
  return Object.freeze({
    state: "ordinary",
    exponent,
    physicalRadius,
    physicalPoint: Object.freeze({
      x: TOPO_SOURCE_POSITION.x +
        (displayPoint.x - TOPO_SOURCE_POSITION.x) * scale,
      y: TOPO_SOURCE_POSITION.y +
        (displayPoint.y - TOPO_SOURCE_POSITION.y) * scale,
    }),
  });
}

export function createTopoAnalyticFieldRgbAtCanvasPixel({
  pixelX,
  pixelY,
  width,
  height,
  beta = 0.5,
  polaritySign = -1,
  contourRangeDecades = TOPO_DEFAULT_CONTOUR_RANGE_DECADES,
} = {}) {
  const point = topoWorldPointForCanvasPixel({
    pixelX,
    pixelY,
    width,
    height,
  });
  const rawValue = createTopoSyntheticRawSampler({
    beta,
    polaritySign,
    sourceMaskRadius: 0,
  })(point.x, point.y);
  return createTopoSignedRgb(normalizeTopoFieldColorValue(rawValue, {
    span: contourRangeDecades,
  }));
}

export function syntheticTopoCausalDelay({
  x,
  y,
  beta = 0.5,
} = {}) {
  const normalizedX = requireFiniteNumber(x, "x");
  const normalizedY = requireFiniteNumber(y, "y");
  const normalizedBeta = requireFiniteNumber(beta, "beta");
  if (normalizedBeta < 0 || normalizedBeta > 1) {
    throw new RangeError("beta must lie in [0, 1].");
  }
  const offsetX = normalizedX - TOPO_SOURCE_POSITION.x;
  const offsetY = normalizedY - TOPO_SOURCE_POSITION.y;
  const radiusSquared = offsetX ** 2 + offsetY ** 2;
  if (radiusSquared === 0) {
    return 0;
  }
  if (normalizedBeta === 1) {
    if (offsetX >= 0) {
      throw new RangeError(
        "The beta=1 leading and transverse region has no positive causal root.",
      );
    }
    return -radiusSquared / (2 * offsetX);
  }
  const lambda = Math.sqrt(
    offsetX ** 2 + (1 - normalizedBeta ** 2) * offsetY ** 2,
  );
  return radiusSquared / (lambda - normalizedBeta * offsetX);
}

export function syntheticTopoSignedValue({
  x,
  y,
  beta = 0.5,
  polaritySign = -1,
} = {}) {
  const normalizedX = requireFiniteNumber(x, "x");
  const normalizedY = requireFiniteNumber(y, "y");
  const normalizedBeta = requireFiniteNumber(beta, "beta");
  const sign = requireFiniteNumber(polaritySign, "polaritySign");
  if (normalizedBeta < 0 || normalizedBeta > 1) {
    throw new RangeError("beta must lie in [0, 1].");
  }
  if (sign !== -1 && sign !== 1) {
    throw new RangeError("polaritySign must be -1 or 1.");
  }
  const causalDelay = syntheticTopoCausalDelay({
    x: normalizedX,
    y: normalizedY,
    beta: normalizedBeta,
  });
  if (causalDelay === 0) {
    return sign * Number.POSITIVE_INFINITY;
  }
  return sign * TOPO_INVERSE_SQUARE_SCALE / causalDelay ** 2;
}

function evaluateTopoPreviewRawUnchecked(
  normalizedX,
  normalizedY,
  normalizedBeta,
  polaritySign,
  sourceMaskRadius,
) {
  const offsetX = normalizedX - TOPO_SOURCE_POSITION.x;
  const offsetY = normalizedY - TOPO_SOURCE_POSITION.y;
  const radiusSquared = offsetX ** 2 + offsetY ** 2;
  if (radiusSquared <= sourceMaskRadius ** 2) {
    return Number.NaN;
  }
  if (normalizedBeta === 1 && offsetX >= 0) {
    return Number.POSITIVE_INFINITY;
  }
  const causalDelay = normalizedBeta === 1
    ? -radiusSquared / (2 * offsetX)
    : radiusSquared / (
      Math.sqrt(
        offsetX ** 2 + (1 - normalizedBeta ** 2) * offsetY ** 2,
      ) - normalizedBeta * offsetX
    );
  return polaritySign * TOPO_INVERSE_SQUARE_SCALE / causalDelay ** 2;
}

export function createTopoSyntheticRawSampler({
  beta = 0.5,
  polaritySign = -1,
  sourceMaskRadius = 0.01,
} = {}) {
  const normalizedBeta = requireFiniteNumber(beta, "beta");
  const sign = requireFiniteNumber(polaritySign, "polaritySign");
  const maskRadius = requireFiniteNumber(sourceMaskRadius, "sourceMaskRadius");
  if (normalizedBeta < 0 || normalizedBeta > 1) {
    throw new RangeError("beta must lie in [0, 1].");
  }
  if (sign !== -1 && sign !== 1) {
    throw new RangeError("polaritySign must be -1 or 1.");
  }
  if (maskRadius < 0) {
    throw new RangeError("sourceMaskRadius must be nonnegative.");
  }
  return (x, y) => evaluateTopoPreviewRawUnchecked(
    x,
    y,
    normalizedBeta,
    sign,
    maskRadius,
  );
}

export function topoPreviewResultAt({
  x,
  y,
  beta = 0.5,
  polaritySign = -1,
  sourceMaskRadius = 0.01,
} = {}) {
  const normalizedX = requireFiniteNumber(x, "x");
  const normalizedY = requireFiniteNumber(y, "y");
  const normalizedBeta = requireFiniteNumber(beta, "beta");
  const offsetX = normalizedX - TOPO_SOURCE_POSITION.x;
  const offsetY = normalizedY - TOPO_SOURCE_POSITION.y;
  const atSource =
    Math.hypot(offsetX, offsetY) <=
    requireFiniteNumber(sourceMaskRadius, "sourceMaskRadius");

  if (atSource) {
    return Object.freeze({
      state: normalizedBeta === 1
        ? "nonordinary:degenerate_root_family"
        : "singular:endpoint_source",
      rawValue: null,
    });
  }
  if (normalizedBeta === 1 && offsetX >= 0) {
    return Object.freeze({
      state: "unavailable:no_positive_causal_root",
      rawValue: null,
    });
  }
  const rawValue = syntheticTopoSignedValue({
    x: normalizedX,
    y: normalizedY,
    beta: normalizedBeta,
    polaritySign,
  });
  return Object.freeze({
    state: Math.abs(rawValue) > TOPO_DISPLAY_CLIP_MAGNITUDE
      ? "ordinary:display_clipped"
      : "ordinary",
    rawValue,
  });
}

function contourEdgeIntersection(
  startValue,
  endValue,
  level,
  startPoint,
  endPoint,
) {
  if (
    !(
      (startValue < level && endValue >= level) ||
      (endValue < level && startValue >= level)
    )
  ) {
    return null;
  }
  const amount = (level - startValue) / (endValue - startValue);
  return Object.freeze({
    x: startPoint.x + (endPoint.x - startPoint.x) * amount,
    y: startPoint.y + (endPoint.y - startPoint.y) * amount,
  });
}

export function forEachTopoContourSegment({
  values,
  columns,
  rows,
  levels,
  onSegment,
  rowStart = 0,
  rowEnd = rows - 1,
} = {}) {
  const columnCount = Math.round(requireFiniteNumber(columns, "columns"));
  const rowCount = Math.round(requireFiniteNumber(rows, "rows"));
  if (columnCount < 2 || rowCount < 2) {
    throw new RangeError("Contour grids require at least two rows and columns.");
  }
  if (!values || values.length !== columnCount * rowCount) {
    throw new RangeError("Contour grid value count does not match its shape.");
  }
  if (!Array.isArray(levels) || typeof onSegment !== "function") {
    throw new TypeError("Contour levels and onSegment callback are required.");
  }
  const normalizedLevels = levels.map((level) =>
    requireFiniteNumber(level, "contour level"));
  const firstRow = Math.max(
    0,
    Math.min(rowCount - 1, Math.round(requireFiniteNumber(rowStart, "rowStart"))),
  );
  const finalRow = Math.max(
    firstRow,
    Math.min(rowCount - 1, Math.round(requireFiniteNumber(rowEnd, "rowEnd"))),
  );
  let segmentCount = 0;
  for (let row = firstRow; row < finalRow; row += 1) {
    for (let column = 0; column < columnCount - 1; column += 1) {
      const topLeft = values[row * columnCount + column];
      const topRight = values[row * columnCount + column + 1];
      const bottomRight = values[(row + 1) * columnCount + column + 1];
      const bottomLeft = values[(row + 1) * columnCount + column];
      const cellValues = [topLeft, topRight, bottomRight, bottomLeft];
      if (!cellValues.every(Number.isFinite)) {
        continue;
      }
      const minimum = Math.min(...cellValues);
      const maximum = Math.max(...cellValues);
      for (const level of normalizedLevels) {
        if (level <= minimum || level > maximum) {
          continue;
        }
        const points = [
          contourEdgeIntersection(
            topLeft,
            topRight,
            level,
            { x: column, y: row },
            { x: column + 1, y: row },
          ),
          contourEdgeIntersection(
            topRight,
            bottomRight,
            level,
            { x: column + 1, y: row },
            { x: column + 1, y: row + 1 },
          ),
          contourEdgeIntersection(
            bottomRight,
            bottomLeft,
            level,
            { x: column + 1, y: row + 1 },
            { x: column, y: row + 1 },
          ),
          contourEdgeIntersection(
            bottomLeft,
            topLeft,
            level,
            { x: column, y: row + 1 },
            { x: column, y: row },
          ),
        ].filter(Boolean);
        if (points.length === 2) {
          onSegment(points[0], points[1], level);
          segmentCount += 1;
        } else if (points.length === 4) {
          const center = (topLeft + topRight + bottomRight + bottomLeft) / 4;
          const pairs = center >= level
            ? [[0, 1], [2, 3]]
            : [[0, 3], [1, 2]];
          pairs.forEach(([startIndex, endIndex]) => {
            onSegment(points[startIndex], points[endIndex], level);
            segmentCount += 1;
          });
        }
      }
    }
  }
  return segmentCount;
}

export function createTopoPreviewFrameIdentity({
  beta = 0.5,
  polaritySign = -1,
} = {}) {
  const normalizedBeta = requireFiniteNumber(beta, "beta");
  const sign = requireFiniteNumber(polaritySign, "polaritySign");
  if (normalizedBeta < 0 || normalizedBeta > 1) {
    throw new RangeError("beta must lie in [0, 1].");
  }
  if (sign !== -1 && sign !== 1) {
    throw new RangeError("polaritySign must be -1 or 1.");
  }
  const species = sign < 0 ? "electrino" : "positrino";
  return [
    TOPO_SYNTHETIC_SURFACE_ID,
    species,
    "beta=" + normalizedBeta.toFixed(2),
  ].join(":");
}

function parseHexColor(hexColor) {
  const normalized = String(hexColor ?? "").trim().replace(/^#/, "");
  if (!/^[0-9a-f]{6}$/iu.test(normalized)) {
    throw new TypeError("Expected a six-digit hex color.");
  }
  return [
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16),
  ];
}

function interpolateChannel(start, end, amount) {
  return Math.round(start + (end - start) * amount);
}

export function createTopoSignedRgb(
  normalizedValue,
  {
    negative = "#2563eb",
    zero = "#8f00ff",
    positive = "#dc2626",
  } = {},
) {
  const normalized = clamp(
    requireFiniteNumber(normalizedValue, "normalizedValue"),
    -1,
    1,
  );
  const zeroRgb = parseHexColor(zero);
  const endpointRgb = parseHexColor(normalized < 0 ? negative : positive);
  const amount = Math.abs(normalized);
  return Object.freeze(zeroRgb.map((channel, index) =>
    interpolateChannel(channel, endpointRgb[index], amount)));
}

export function createTopoSampleRgb(
  rawValue,
  {
    polaritySign = -1,
    negative = "#2563eb",
    zero = "#8f00ff",
    positive = "#dc2626",
  } = {},
) {
  if (Number.isNaN(rawValue)) {
    return Object.freeze(parseHexColor(polaritySign < 0 ? negative : positive));
  }
  if (!Number.isFinite(rawValue)) {
    return Object.freeze(parseHexColor(zero));
  }
  return createTopoSignedRgb(
    normalizeTopoFieldColorValue(rawValue),
    { negative, zero, positive },
  );
}
