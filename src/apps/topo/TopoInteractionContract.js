export const TOPO_INTERACTION_CONTRACT_ID = "topo_interaction_and_color/v1";
export const TOPO_SYNTHETIC_SURFACE_ID = "topo_synthetic_causal_envelope/v1";
export const TOPO_SOURCE_POSITION = Object.freeze({ x: 2 / 3, y: 1 / 2 });
export const TOPO_REFERENCE_SCALE = 4;
export const TOPO_REFERENCE_WAKE_MAGNITUDE = 64;
export const TOPO_DEFAULT_CONTOUR_RANGE_DECADES = 3;
export const TOPO_DEFAULT_CONTOUR_COUNT = 13;
export const TOPO_MIN_CONTOUR_COUNT = 4;
export const TOPO_MAX_CONTOUR_COUNT = 25;
export const TOPO_DEFAULT_CONTOUR_REACH = 3;
export const TOPO_MIN_CONTOUR_REACH = 1;
export const TOPO_MAX_CONTOUR_REACH = 6;
export const TOPO_DEFAULT_SHADING_SPREAD = 0.5;
export const TOPO_MIN_SHADING_REACH_SCALE = 0.25;
export const TOPO_MAX_SHADING_REACH_SCALE = 4;
export const TOPO_DEFAULT_CONTOUR_VISIBILITY = 0.75;
export const TOPO_CONTOUR_WEIGHT_POLICY_ID =
  "actual-level-linear-fade-with-explicit-zero/v1";
export const TOPO_WEAKEST_CONTOUR_WEIGHT = 0.32;
export const TOPO_ZERO_CONTOUR_WEIGHT = 0.56;
export const TOPO_DEFAULT_DISPLAY_SCALE = 1;
export const TOPO_MIN_DISPLAY_SCALE = 0.5;
export const TOPO_MAX_DISPLAY_SCALE = 2;
export const TOPO_DISPLAY_SCALE_STEP = 0.25;
export const TOPO_DISPLAY_MAPPING_ID =
  "signed-bounded-square-root-variable-reach/v1";
export const TOPO_FIELD_PERCEPTIBILITY_THRESHOLD = 0.3;
export const TOPO_PARTNER_WAKE_OBSERVER = Object.freeze({
  ELECTRINO: "electrino",
  POSITRINO: "positrino",
});
export const TOPO_ABSOLUTE_OBSERVER = "absolute";
export const TOPO_DEFAULT_PARTNER_WAKE_OBSERVER =
  TOPO_PARTNER_WAKE_OBSERVER.ELECTRINO;
export const TOPO_DEFAULT_WAKE_VIEW = TOPO_ABSOLUTE_OBSERVER;
export const TOPO_FIRST_CONTOUR_BUDGET_MS = 34;
export const TOPO_MAX_CANVAS_DIMENSION = 4096;
export const TOPO_MAX_CANVAS_PIXELS = 12 * 1024 * 1024;
export const TOPO_WORLD_CHART_ID = "topo_canvas_height_euclidean/v1";
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
  TOPO_REFERENCE_WAKE_MAGNITUDE *
  TOPO_SYNTHETIC_CONTOUR_DELAY_RANGE.anchor ** 2;

export function normalizeTopoPartnerWakeObserver(
  value = TOPO_DEFAULT_PARTNER_WAKE_OBSERVER,
) {
  if (
    value !== TOPO_PARTNER_WAKE_OBSERVER.ELECTRINO &&
    value !== TOPO_PARTNER_WAKE_OBSERVER.POSITRINO
  ) {
    throw new RangeError("observerId must be electrino or positrino.");
  }
  return value;
}

export function normalizeTopoWakeView(
  value = TOPO_DEFAULT_WAKE_VIEW,
) {
  if (value === TOPO_ABSOLUTE_OBSERVER) {
    return value;
  }
  return normalizeTopoPartnerWakeObserver(value);
}

export function topoPartnerWakeSourceSign(observerId) {
  return normalizeTopoPartnerWakeObserver(observerId) ===
    TOPO_PARTNER_WAKE_OBSERVER.ELECTRINO
    ? 1
    : -1;
}

export function topoPartnerWakeSourceId(observerId) {
  return topoPartnerWakeSourceSign(observerId) > 0
    ? TOPO_PARTNER_WAKE_OBSERVER.POSITRINO
    : TOPO_PARTNER_WAKE_OBSERVER.ELECTRINO;
}

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

export function normalizeTopoDisplayScale(
  value = TOPO_DEFAULT_DISPLAY_SCALE,
) {
  const scale = requireFiniteNumber(value, "displayScale");
  if (scale < TOPO_MIN_DISPLAY_SCALE || scale > TOPO_MAX_DISPLAY_SCALE) {
    throw new RangeError(
      "displayScale must lie in [" + TOPO_MIN_DISPLAY_SCALE + ", " +
      TOPO_MAX_DISPLAY_SCALE + "].",
    );
  }
  return scale;
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
  referenceMagnitude = TOPO_REFERENCE_WAKE_MAGNITUDE,
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

export function normalizeTopoFieldColorValue(
  rawValue,
  {
    referenceMagnitude = TOPO_REFERENCE_WAKE_MAGNITUDE,
    spread = TOPO_DEFAULT_SHADING_SPREAD,
  } = {},
) {
  const raw = requireFiniteNumber(rawValue, "rawValue");
  const reference = requireFiniteNumber(
    referenceMagnitude,
    "referenceMagnitude",
  );
  if (!(reference > 0)) {
    throw new RangeError("referenceMagnitude must be positive.");
  }
  if (raw === 0) {
    return 0;
  }
  const rootMagnitude = Math.sqrt(Math.abs(raw)) *
    topoShadingReachScale(spread);
  return Math.sign(raw) * rootMagnitude /
    (rootMagnitude + Math.sqrt(reference));
}

export function measureTopoCenterlineColorFootprint({
  beta = 0.5,
  threshold = TOPO_FIELD_PERCEPTIBILITY_THRESHOLD,
  samples = 10_001,
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
    const normalized = normalizeTopoFieldColorValue(rawValue);
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

export function createTopoContourLevelStyle({
  rawDecade = null,
  strongestRawDecade = 1,
  weakestRawDecade = -TOPO_DEFAULT_CONTOUR_REACH,
  family = "unsigned",
  visibility = TOPO_DEFAULT_CONTOUR_VISIBILITY,
} = {}) {
  const emphasis = createTopoContourEmphasis(visibility);
  const zeroContour = family === "zero";
  const strongest = requireFiniteNumber(
    strongestRawDecade,
    "strongestRawDecade",
  );
  const weakest = requireFiniteNumber(weakestRawDecade, "weakestRawDecade");
  if (strongest < weakest) {
    throw new RangeError("strongestRawDecade must not be below weakestRawDecade.");
  }
  const level = zeroContour
    ? null
    : requireFiniteNumber(rawDecade, "rawDecade");
  const levelProgress = zeroContour
    ? null
    : strongest === weakest
      ? 1
      : clamp((level - weakest) / (strongest - weakest), 0, 1);
  const levelWeight = zeroContour
    ? TOPO_ZERO_CONTOUR_WEIGHT
    : TOPO_WEAKEST_CONTOUR_WEIGHT +
      (1 - TOPO_WEAKEST_CONTOUR_WEIGHT) * levelProgress;
  return Object.freeze({
    family,
    rawDecade: level,
    levelProgress,
    levelWeight,
    opacity: emphasis.opacity * levelWeight,
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

export function normalizeTopoContourCount(
  requestedCount = TOPO_DEFAULT_CONTOUR_COUNT,
) {
  const count = requireFiniteNumber(requestedCount, "requestedCount");
  return clamp(
    Math.round(count),
    TOPO_MIN_CONTOUR_COUNT,
    TOPO_MAX_CONTOUR_COUNT,
  );
}

export function normalizeTopoContourReach(
  requestedReach = TOPO_DEFAULT_CONTOUR_REACH,
) {
  const reach = requireFiniteNumber(requestedReach, "requestedReach");
  return clamp(reach, TOPO_MIN_CONTOUR_REACH, TOPO_MAX_CONTOUR_REACH);
}

export function normalizeTopoShadingSpread(
  requestedSpread = TOPO_DEFAULT_SHADING_SPREAD,
) {
  return clamp(
    requireFiniteNumber(requestedSpread, "requestedSpread"),
    0,
    1,
  );
}

export function topoShadingReachScale(
  spread = TOPO_DEFAULT_SHADING_SPREAD,
) {
  const normalizedSpread = normalizeTopoShadingSpread(spread);
  return TOPO_MIN_SHADING_REACH_SCALE *
    (TOPO_MAX_SHADING_REACH_SCALE / TOPO_MIN_SHADING_REACH_SCALE) **
      normalizedSpread;
}

export function createTopoContourMagnitudeSchedule({
  contourRangeDecades = TOPO_DEFAULT_CONTOUR_RANGE_DECADES,
  contourCount = null,
  contourReach = null,
  referenceMagnitude = TOPO_REFERENCE_WAKE_MAGNITUDE,
} = {}) {
  const denseSchedule = contourCount != null || contourReach != null;
  const span = topoContourRangeDecades(contourRangeDecades);
  const count = denseSchedule
    ? normalizeTopoContourCount(contourCount ?? TOPO_DEFAULT_CONTOUR_COUNT)
    : span * 2 + 1;
  const reach = denseSchedule
    ? normalizeTopoContourReach(contourReach ?? TOPO_DEFAULT_CONTOUR_REACH)
    : span;
  const reference = requireFiniteNumber(referenceMagnitude, "referenceMagnitude");
  if (!(reference > 0)) {
    throw new RangeError("referenceMagnitude must be positive.");
  }
  const inwardIntervalCount = denseSchedule
    ? clamp(Math.round((count - 1) / (reach + 1)), 1, count - 2)
    : span;
  const outwardIntervalCount = count - 1 - inwardIntervalCount;
  return Object.freeze(
    Array.from({ length: count }, (_, index) => {
      const rawDecade = denseSchedule
        ? index <= inwardIntervalCount
          ? 1 - index / inwardIntervalCount
          : -(index - inwardIntervalCount) * reach / outwardIntervalCount
        : span - index;
      const magnitude = reference * 10 ** rawDecade;
      return Object.freeze({
        magnitude,
        rawDecade,
        referenceLevel: Math.abs(rawDecade) <= 1e-12,
        levelIdentity: "raw-decade:" + rawDecade + ":" + magnitude,
        majorDecadeLabel: "level:" + rawDecade,
      });
    }),
  );
}

export function createTopoSyntheticContourRenderPlan({
  beta = 0.5,
  contourRangeDecades = TOPO_DEFAULT_CONTOUR_RANGE_DECADES,
  contourCount = null,
  contourReach = null,
} = {}) {
  const selection = createTopoSyntheticContourSelection(
    contourRangeDecades,
    { contourCount, contourReach },
  );
  const circles = createTopoSyntheticContourCircles({
    beta,
    causalDelays: selection.map(({ causalDelay }) => causalDelay),
  });
  return Object.freeze(circles.map((circle, index) => Object.freeze({
    ...circle,
    latticeIndex: selection[index].latticeIndex,
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
  { contourCount = null, contourReach = null } = {},
) {
  const schedule = createTopoContourMagnitudeSchedule({
    contourRangeDecades,
    contourCount,
    contourReach,
  });
  return Object.freeze(schedule.map((level, index) =>
    Object.freeze({
      ...level,
      latticeIndex: index,
      causalDelay: Math.sqrt(TOPO_INVERSE_SQUARE_SCALE / level.magnitude),
      majorDecade: Math.abs(level.rawDecade - Math.round(level.rawDecade)) < 1e-9,
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
  displayScale = TOPO_DEFAULT_DISPLAY_SCALE,
  viewportCenter = TOPO_SOURCE_POSITION,
  canvasAnchor = TOPO_SOURCE_POSITION,
} = {}) {
  const canvasWidth = Math.max(1, requireFiniteNumber(width, "width"));
  const canvasHeight = Math.max(1, requireFiniteNumber(height, "height"));
  const x = requireFiniteNumber(pixelX, "pixelX");
  const y = requireFiniteNumber(pixelY, "pixelY");
  const commonScale = Math.max(1, canvasHeight - 1) *
    normalizeTopoDisplayScale(displayScale);
  const centerX = requireFiniteNumber(viewportCenter?.x, "viewportCenter.x");
  const centerY = requireFiniteNumber(viewportCenter?.y, "viewportCenter.y");
  const anchorPixelX = requireFiniteNumber(canvasAnchor?.x, "canvasAnchor.x") *
    Math.max(1, canvasWidth - 1);
  const anchorPixelY = (1 -
    requireFiniteNumber(canvasAnchor?.y, "canvasAnchor.y")) *
    Math.max(1, canvasHeight - 1);
  return Object.freeze({
    x: centerX + (x - anchorPixelX) / commonScale,
    y: centerY + (anchorPixelY - y) / commonScale,
  });
}

export function topoCanvasPixelForWorldPoint({
  worldX,
  worldY,
  width,
  height,
  displayScale = TOPO_DEFAULT_DISPLAY_SCALE,
  viewportCenter = TOPO_SOURCE_POSITION,
  canvasAnchor = TOPO_SOURCE_POSITION,
} = {}) {
  const canvasWidth = Math.max(1, requireFiniteNumber(width, "width"));
  const canvasHeight = Math.max(1, requireFiniteNumber(height, "height"));
  const commonScale = Math.max(1, canvasHeight - 1) *
    normalizeTopoDisplayScale(displayScale);
  const centerX = requireFiniteNumber(viewportCenter?.x, "viewportCenter.x");
  const centerY = requireFiniteNumber(viewportCenter?.y, "viewportCenter.y");
  const anchorPixelX = requireFiniteNumber(canvasAnchor?.x, "canvasAnchor.x") *
    Math.max(1, canvasWidth - 1);
  const anchorPixelY = (1 -
    requireFiniteNumber(canvasAnchor?.y, "canvasAnchor.y")) *
    Math.max(1, canvasHeight - 1);
  return Object.freeze({
    x: anchorPixelX +
      (requireFiniteNumber(worldX, "worldX") - centerX) *
        commonScale,
    y: anchorPixelY -
      (requireFiniteNumber(worldY, "worldY") - centerY) *
        commonScale,
  });
}

export function createTopoAnalyticFieldRgbAtCanvasPixel({
  pixelX,
  pixelY,
  width,
  height,
  beta = 0.5,
  polaritySign = -1,
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
  return createTopoSignedRgb(normalizeTopoFieldColorValue(rawValue));
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
  sourceMaskRadius = 0,
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
  sourceMaskRadius = 0,
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
  return Object.freeze({ state: "ordinary", rawValue });
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
