export const TOPO_INTERACTION_CONTRACT_ID = "topo_interaction_and_color/v1";
export const TOPO_SYNTHETIC_SURFACE_ID = "topo_synthetic_causal_envelope/v1";
export const TOPO_SOURCE_POSITION = Object.freeze({ x: 2 / 3, y: 1 / 2 });
export const TOPO_REFERENCE_SCALE = 4;
export const TOPO_DISPLAY_CLIP_MAGNITUDE = 64;
export const TOPO_DEFAULT_CONTOUR_LEVELS = 24;
export const TOPO_DEFAULT_CONTOUR_DENSITY = 0.4;
export const TOPO_DEFAULT_CONTOUR_VISIBILITY = 0.6;
export const TOPO_CONTOUR_LEVEL_RANGE = Object.freeze({ min: 8, max: 48 });
export const TOPO_TRANSFORMS = Object.freeze(["linear", "signed-log2", "asinh"]);
export const TOPO_DEFAULT_TRANSFORM = "asinh";
export const TOPO_FIELD_COLOR_GAIN = Object.freeze({
  linear: 900,
  "signed-log2": 70,
  asinh: 90,
});
export const TOPO_FIELD_PERCEPTIBILITY_THRESHOLD = 0.3;
export const TOPO_FIRST_CONTOUR_BUDGET_MS = 34;
export const TOPO_SYNTHETIC_DECAY_RATE = 16;
export const TOPO_MAX_CANVAS_DIMENSION = 4096;
export const TOPO_MAX_CANVAS_PIXELS = 12 * 1024 * 1024;
export const TOPO_WORLD_CHART_ID = "topo_canvas_height_euclidean/v1";

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

function normalizeTransformId(transformId) {
  const normalized = String(transformId ?? "").trim().toLowerCase();
  if (!TOPO_TRANSFORMS.includes(normalized)) {
    throw new RangeError("Unknown Topo display transform: " + transformId);
  }
  return normalized;
}

export function transformTopoValue(
  rawValue,
  transformId = TOPO_DEFAULT_TRANSFORM,
  referenceScale = TOPO_REFERENCE_SCALE,
) {
  const raw = requireFiniteNumber(rawValue, "rawValue");
  const scale = requireFiniteNumber(referenceScale, "referenceScale");
  if (scale <= 0) {
    throw new RangeError("referenceScale must be positive.");
  }
  const transform = normalizeTransformId(transformId);
  if (transform === "linear") {
    return raw / scale;
  }
  if (transform === "signed-log2") {
    return Math.sign(raw) * Math.log2(1 + Math.abs(raw) / scale);
  }
  return Math.asinh(raw / scale);
}

export function inverseTopoTransform(
  transformedValue,
  transformId = TOPO_DEFAULT_TRANSFORM,
  referenceScale = TOPO_REFERENCE_SCALE,
) {
  const transformed = requireFiniteNumber(transformedValue, "transformedValue");
  const scale = requireFiniteNumber(referenceScale, "referenceScale");
  if (scale <= 0) {
    throw new RangeError("referenceScale must be positive.");
  }
  const transform = normalizeTransformId(transformId);
  if (transform === "linear") {
    return transformed * scale;
  }
  if (transform === "signed-log2") {
    return Math.sign(transformed) * scale * (2 ** Math.abs(transformed) - 1);
  }
  return scale * Math.sinh(transformed);
}

export function normalizeTopoDisplayValue(
  rawValue,
  transformId = TOPO_DEFAULT_TRANSFORM,
) {
  const transformed = transformTopoValue(rawValue, transformId);
  const transformedLimit = transformTopoValue(
    TOPO_DISPLAY_CLIP_MAGNITUDE,
    transformId,
  );
  return clamp(transformed / transformedLimit, -1, 1);
}

export function normalizeTopoFieldColorValue(
  rawValue,
  transformId = TOPO_DEFAULT_TRANSFORM,
) {
  const transform = normalizeTransformId(transformId);
  const normalized = normalizeTopoDisplayValue(rawValue, transform);
  const gain = TOPO_FIELD_COLOR_GAIN[transform];
  return Math.sign(normalized) * Math.asinh(gain * Math.abs(normalized)) /
    Math.asinh(gain);
}

export function measureTopoCenterlineColorFootprint({
  transformId = TOPO_DEFAULT_TRANSFORM,
  beta = 0.5,
  threshold = TOPO_FIELD_PERCEPTIBILITY_THRESHOLD,
  samples = 10_001,
  calibrated = true,
} = {}) {
  const transform = normalizeTransformId(transformId);
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
      ? normalizeTopoFieldColorValue(rawValue, transform)
      : normalizeTopoDisplayValue(rawValue, transform);
    if (Math.abs(normalized) >= threshold) {
      visible.push(x);
    }
  }
  const start = visible[0] ?? null;
  const end = visible.at(-1) ?? null;
  return Object.freeze({
    transformId: transform,
    beta,
    threshold,
    start,
    end,
    width: start == null || end == null ? 0 : end - start,
  });
}

export function createTopoContourThresholds(
  contourLevels = TOPO_DEFAULT_CONTOUR_LEVELS,
  transformId = TOPO_DEFAULT_TRANSFORM,
) {
  const levels = Math.round(requireFiniteNumber(contourLevels, "contourLevels"));
  if (
    levels < TOPO_CONTOUR_LEVEL_RANGE.min ||
    levels > TOPO_CONTOUR_LEVEL_RANGE.max
  ) {
    throw new RangeError("contourLevels is outside the Topo v1 range.");
  }
  const thresholds = [];
  for (let index = 0; index <= levels; index += 1) {
    const normalized = -1 + (2 * index) / levels;
    const transformedLimit = transformTopoValue(
      TOPO_DISPLAY_CLIP_MAGNITUDE,
      transformId,
    );
    thresholds.push(Object.freeze({
      normalized,
      raw: inverseTopoTransform(
        normalized * transformedLimit,
        transformId,
      ),
    }));
  }
  return Object.freeze(thresholds);
}

export function createTopoContourDensityPlan(density = TOPO_DEFAULT_CONTOUR_DENSITY) {
  const normalizedDensity = clamp(
    requireFiniteNumber(density, "density"),
    0,
    1,
  );
  const maximum = TOPO_CONTOUR_LEVEL_RANGE.max;
  const innerIndices = Array.from({ length: maximum - 1 }, (_, index) => index + 1);
  const baseIndices = innerIndices.filter((index) => index % 6 === 0);
  const selected = new Set([0, maximum, ...baseIndices]);
  const remaining = innerIndices.filter((index) => !selected.has(index));
  const expansionOrder = [];
  while (remaining.length) {
    remaining.sort((left, right) => {
      const leftDistance = Math.min(...[...selected].map((value) =>
        Math.abs(left - value)));
      const rightDistance = Math.min(...[...selected].map((value) =>
        Math.abs(right - value)));
      return rightDistance - leftDistance ||
        Math.abs(left - maximum / 2) - Math.abs(right - maximum / 2) ||
        left - right;
    });
    const next = remaining.shift();
    selected.add(next);
    expansionOrder.push(next);
  }
  const expansion = normalizedDensity * expansionOrder.length;
  const weights = new Map(baseIndices.map((index) => [index, 1]));
  expansionOrder.forEach((index, rank) => {
    weights.set(index, clamp(expansion - rank, 0, 1));
  });
  return Object.freeze(innerIndices.map((index) => Object.freeze({
    index,
    normalized: -1 + (2 * index) / maximum,
    weight: weights.get(index) ?? 0,
  })));
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
    whiteMix: normalized,
    widthCss: 0.8 + 1.2 * normalized,
  });
}

export function createTopoSyntheticContourCircles({
  beta = 0.5,
  transformId = TOPO_DEFAULT_TRANSFORM,
  normalizedLevels = [],
} = {}) {
  const normalizedBeta = requireFiniteNumber(beta, "beta");
  if (normalizedBeta < 0 || normalizedBeta > 1) {
    throw new RangeError("beta must lie in [0, 1].");
  }
  const transform = normalizeTransformId(transformId);
  const transformedLimit = transformTopoValue(
    TOPO_DISPLAY_CLIP_MAGNITUDE,
    transform,
  );
  return Object.freeze(normalizedLevels.map((candidate) => {
    const level = requireFiniteNumber(candidate, "normalizedLevel");
    if (!(level > 0 && level < 1)) {
      throw new RangeError("Synthetic contour levels must lie strictly in (0, 1).");
    }
    const rawMagnitude = inverseTopoTransform(
      level * transformedLimit,
      transform,
    );
    const causalDelay = -Math.log(
      rawMagnitude / TOPO_DISPLAY_CLIP_MAGNITUDE,
    ) / TOPO_SYNTHETIC_DECAY_RATE;
    return Object.freeze({
      level,
      rawMagnitude,
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
  return sign * TOPO_DISPLAY_CLIP_MAGNITUDE * Math.exp(
    -TOPO_SYNTHETIC_DECAY_RATE * causalDelay,
  );
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
  return polaritySign * TOPO_DISPLAY_CLIP_MAGNITUDE * Math.exp(
    -TOPO_SYNTHETIC_DECAY_RATE * causalDelay,
  );
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
    transformId = TOPO_DEFAULT_TRANSFORM,
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
    normalizeTopoFieldColorValue(rawValue, transformId),
    { negative, zero, positive },
  );
}
