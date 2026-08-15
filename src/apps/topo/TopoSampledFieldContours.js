import {
  TOPO_REFERENCE_WAKE_MAGNITUDE,
  createTopoContourMagnitudeSchedule,
} from "./TopoInteractionContract.js";

export const TOPO_SAMPLED_FIELD_CONTOUR_POLICY_ID =
  "topo_sampled_field_symmetric_raw_decades/v2";
export const TOPO_CONTOUR_LEVELS_PER_DECADE = 1;
export const TOPO_SAMPLED_FIELD_STATE = Object.freeze({
  VALID: 0,
  MASKED: 1,
  UNAVAILABLE: 2,
  UNRESOLVED: 3,
  SINGULAR: 4,
});

export const TOPO_GPU_CONTOUR_BAND_SCALE = 0.6;
export const TOPO_GPU_CONTOUR_BAND_MIN = 0.004;
// A fast sheared level set can cross a pixel even when its centre sample is
// farther than the low-curvature band.  The stencil bracket below keeps this
// wider high-gradient allowance on the genuine level set.
export const TOPO_GPU_CONTOUR_BAND_MAX = 0.7;

export function topoGpuContourBandWidth({ left, right, down, up }) {
  const exponent = (value) => Math.log10(Math.max(Math.abs(value), 1e-30) / 64);
  if (![left, right, down, up].every(Number.isFinite)) return 0;
  return Math.min(TOPO_GPU_CONTOUR_BAND_MAX, Math.max(
    TOPO_GPU_CONTOUR_BAND_MIN,
    TOPO_GPU_CONTOUR_BAND_SCALE * (
      Math.abs(exponent(right) - exponent(left)) +
      Math.abs(exponent(up) - exponent(down))
    ),
  ));
}

export function topoGpuContourBandContains({ value, levelRawDecade, neighbors }) {
  const width = topoGpuContourBandWidth(neighbors);
  if (!(width > 0) || !Number.isFinite(value)) return false;
  const decade = Math.log10(Math.max(Math.abs(value), 1e-30) / 64);
  const neighborDecades = Object.values(neighbors).map((neighbor) =>
    Math.log10(Math.max(Math.abs(neighbor), 1e-30) / 64));
  const lower = Math.min(decade, ...neighborDecades);
  const upper = Math.max(decade, ...neighborDecades);
  return levelRawDecade >= lower && levelRawDecade <= upper &&
    Math.abs(decade - levelRawDecade) <= 0.45 * width;
}

function requireFinite(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new TypeError(label + " must be finite.");
  }
  return number;
}

function contourPointKey(point) {
  return Math.round(point.x * 1e6) + ":" + Math.round(point.y * 1e6);
}

/**
 * Retain the marching-squares vertices while arranging adjacent edges into
 * continuous stroke paths.  This is deliberately a paint-time operation: it
 * neither interpolates new points nor alters segment connectivity.
 */
export function connectTopoSampledFieldContourSegments(segments = []) {
  const edges = segments.map((segment) => Object.freeze({
    start: Object.freeze({ x: segment.x1, y: segment.y1 }),
    end: Object.freeze({ x: segment.x2, y: segment.y2 }),
  }));
  const endpoints = new Map();
  const addEndpoint = (point, index) => {
    const key = contourPointKey(point);
    const members = endpoints.get(key) ?? [];
    members.push(index);
    endpoints.set(key, members);
  };
  edges.forEach((edge, index) => {
    addEndpoint(edge.start, index);
    addEndpoint(edge.end, index);
  });
  const unused = new Set(edges.map((_, index) => index));
  const connected = [];
  const extend = (points, atEnd) => {
    while (true) {
      const point = atEnd ? points.at(-1) : points[0];
      const nextIndex = (endpoints.get(contourPointKey(point)) ?? [])
        .find((index) => unused.has(index));
      if (nextIndex == null) {
        return;
      }
      unused.delete(nextIndex);
      const edge = edges[nextIndex];
      const next = contourPointKey(edge.start) === contourPointKey(point)
        ? edge.end
        : edge.start;
      if (atEnd) {
        points.push(next);
      } else {
        points.unshift(next);
      }
    }
  };
  while (unused.size > 0) {
    const index = unused.values().next().value;
    unused.delete(index);
    const edge = edges[index];
    const points = [edge.start, edge.end];
    extend(points, true);
    extend(points, false);
    connected.push(Object.freeze(points));
  }
  return Object.freeze(connected);
}

export function createTopoSignedContourLevels({
  rangeDecades = 3,
  contourCount = null,
  contourReach = null,
  referenceMagnitude = TOPO_REFERENCE_WAKE_MAGNITUDE,
  levelsPerDecade = TOPO_CONTOUR_LEVELS_PER_DECADE,
} = {}) {
  const span = requireFinite(rangeDecades, "rangeDecades");
  const maximum = requireFinite(referenceMagnitude, "referenceMagnitude");
  const subdivisions = requireFinite(levelsPerDecade, "levelsPerDecade");
  if (
    (contourCount == null && (!Number.isInteger(span) || span < 1 || span > 4)) ||
    maximum <= 0 ||
    subdivisions !== 1
  ) {
    throw new RangeError(
      "rangeDecades must be an integer in [1, 4], referenceMagnitude positive, and levelsPerDecade exactly one.",
    );
  }
  const magnitudeSchedule = createTopoContourMagnitudeSchedule({
    contourRangeDecades: span,
    contourCount,
    contourReach,
    referenceMagnitude: maximum,
  });
  const positive = magnitudeSchedule.map((level, index) => ({
    ...level,
    value: level.magnitude,
    family: "positive",
    latticeIndex: index,
    majorDecade: level.majorDecade ??
      Math.abs(level.rawDecade - Math.round(level.rawDecade)) < 1e-9,
  }));
  const negative = positive.map((level) => ({
    ...level,
    value: -level.value,
    family: "negative",
  }));
  return Object.freeze([
    Object.freeze({
      value: 0,
      family: "zero",
      latticeIndex: 0,
      majorDecade: true,
      rawDecade: null,
      referenceLevel: false,
      levelIdentity: "zero:0",
    }),
    ...negative.map(Object.freeze),
    ...positive.map(Object.freeze),
  ]);
}

export const TOPO_MARCHING_SQUARES_GLSL_CONTRACT = Object.freeze({
  cornerOrder: Object.freeze(["topLeft", "topRight", "bottomRight", "bottomLeft"]),
  edgeOrder: Object.freeze(["top", "right", "bottom", "left"]),
  ambiguousCases: Object.freeze([5, 10]),
  rule: "corners-greater-or-equal; determinant diagonal with stable parity tie",
});

export function topoMarchingSquaresEdgePoint(edge, cellX, cellY, corners, level) {
  const endpoints = edge === 0
    ? [[cellX, cellY, corners[0]], [cellX + 1, cellY, corners[1]]]
    : edge === 1
      ? [[cellX + 1, cellY, corners[1]], [cellX + 1, cellY + 1, corners[2]]]
      : edge === 2
        ? [[cellX + 1, cellY + 1, corners[2]], [cellX, cellY + 1, corners[3]]]
        : [[cellX, cellY + 1, corners[3]], [cellX, cellY, corners[0]]];
  const [start, end] = endpoints;
  const denominator = end[2] - start[2];
  const amount = Math.abs(denominator) <= Number.EPSILON
    ? 0.5
    : Math.min(1, Math.max(0, (level - start[2]) / denominator));
  return {
    x: start[0] + (end[0] - start[0]) * amount,
    y: start[1] + (end[1] - start[1]) * amount,
  };
}

export function topoMarchingSquaresLevelIdentity(value) {
  const text = Number(value).toPrecision(15);
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash = Math.imul(hash ^ text.charCodeAt(index), 16777619);
  }
  return hash >>> 0;
}

export function topoMarchingSquaresCaseIndex(corners, level) {
  let caseIndex = 0;
  if (corners[0] >= level) caseIndex |= 1;
  if (corners[1] >= level) caseIndex |= 2;
  if (corners[2] >= level) caseIndex |= 4;
  if (corners[3] >= level) caseIndex |= 8;
  return caseIndex;
}

export function topoMarchingSquaresEdgePairs(caseIndex, corners, level, cellX, cellY, levelIdentity) {
  switch (caseIndex) {
    case 1:
    case 14:
      return [[3, 0]];
    case 2:
    case 13:
      return [[0, 1]];
    case 3:
    case 12:
      return [[3, 1]];
    case 4:
    case 11:
      return [[1, 2]];
    case 6:
    case 9:
      return [[0, 2]];
    case 7:
    case 8:
      return [[3, 2]];
    case 5:
    case 10: {
      const shifted = corners.map((value) => value - level);
      const determinant = shifted[0] * shifted[2] - shifted[1] * shifted[3];
      const positiveDiagonal = determinant > 0 ||
        (determinant === 0 && (cellX + cellY + levelIdentity) % 2 === 0);
      return positiveDiagonal
        ? [[0, 1], [2, 3]]
        : [[3, 0], [1, 2]];
    }
    default:
      return [];
  }
}

function topoPointSegmentDistance(point, start, end) {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const denominator = deltaX * deltaX + deltaY * deltaY;
  const amount = denominator <= Number.EPSILON
    ? 0
    : Math.min(1, Math.max(0, ((point.x - start.x) * deltaX +
      (point.y - start.y) * deltaY) / denominator));
  return Math.hypot(point.x - (start.x + amount * deltaX),
    point.y - (start.y + amount * deltaY));
}

export function topoMarchingSquaresScreenSpaceMask({
  raw,
  sampleStates,
  width,
  height,
  level,
  lineHalfWidth = 0.5,
} = {}) {
  const gridWidth = Number(width);
  const gridHeight = Number(height);
  const threshold = requireFinite(
    typeof level === "number" ? level : level?.value,
    "level",
  );
  if (!raw || raw.length !== gridWidth * gridHeight ||
      !sampleStates || sampleStates.length !== raw.length) {
    throw new RangeError("raw and sampleStates must cover the requested screen grid.");
  }
  const mask = new Uint8Array(raw.length);
  const levelIdentity = topoMarchingSquaresLevelIdentity(threshold);
  for (let pixelY = 0; pixelY < gridHeight; pixelY += 1) {
    for (let pixelX = 0; pixelX < gridWidth; pixelX += 1) {
      const point = { x: pixelX + 0.5, y: pixelY + 0.5 };
      if (sampleStates[pixelY * gridWidth + pixelX] !== TOPO_SAMPLED_FIELD_STATE.VALID) continue;
      let minimumDistance = Infinity;
      for (const offsetY of [-1, 0]) for (const offsetX of [-1, 0]) {
        const cellX = pixelX + offsetX;
        const cellY = pixelY + offsetY;
        if (cellX < 0 || cellY < 0 || cellX >= gridWidth - 1 || cellY >= gridHeight - 1) continue;
        const index = cellY * gridWidth + cellX;
        const indexes = [index, index + 1, index + gridWidth + 1, index + gridWidth];
        if (indexes.some((entry) => sampleStates[entry] !== TOPO_SAMPLED_FIELD_STATE.VALID)) continue;
        const corners = indexes.map((entry) => raw[entry]);
        if (!corners.every(Number.isFinite)) continue;
        const pairs = topoMarchingSquaresEdgePairs(
          topoMarchingSquaresCaseIndex(corners, threshold), corners, threshold,
          cellX, cellY, levelIdentity,
        );
        for (const [firstEdge, secondEdge] of pairs) {
          minimumDistance = Math.min(minimumDistance, topoPointSegmentDistance(
            point,
            topoMarchingSquaresEdgePoint(firstEdge, cellX, cellY, corners, threshold),
            topoMarchingSquaresEdgePoint(secondEdge, cellX, cellY, corners, threshold),
          ));
        }
      }
      if (minimumDistance <= lineHalfWidth) mask[pixelY * gridWidth + pixelX] = 1;
    }
  }
  return mask;
}

export function topoMarchingSquaresScreenSpaceCenterlineDistance({
  segments,
  mask,
  width,
  lineHalfWidth = 0.5,
} = {}) {
  const gridWidth = Number(width);
  const gpuPoints = Array.from(mask ?? [], (value, index) => value ? {
    x: index % gridWidth + 0.5,
    y: Math.floor(index / gridWidth) + 0.5,
  } : null).filter(Boolean);
  const cpuPoints = [];
  for (const segment of segments ?? []) {
    const length = Math.hypot(segment.x2 - segment.x1, segment.y2 - segment.y1);
    const count = Math.max(1, Math.ceil(length * 2));
    for (let index = 0; index <= count; index += 1) {
      const amount = index / count;
      cpuPoints.push({
        x: segment.x1 + (segment.x2 - segment.x1) * amount,
        y: segment.y1 + (segment.y2 - segment.y1) * amount,
      });
    }
  }
  const nearest = (from, distanceTo) => from.map((point) => distanceTo(point));
  const gpuToCpu = nearest(gpuPoints, (point) => Math.min(...(segments ?? []).map((segment) =>
    topoPointSegmentDistance(point, { x: segment.x1, y: segment.y1 },
      { x: segment.x2, y: segment.y2 }))));
  const cpuToGpu = nearest(cpuPoints, (point) => Math.min(...gpuPoints.map((candidate) =>
    Math.hypot(point.x - candidate.x, point.y - candidate.y))));
  const values = [...gpuToCpu, ...cpuToGpu].map((distance) =>
    Math.max(0, distance - lineHalfWidth)).sort((left, right) => left - right);
  return Object.freeze({
    p95: values[Math.floor(0.95 * Math.max(0, values.length - 1))] ?? Infinity,
    max: values.at(-1) ?? Infinity,
  });
}

export function extractTopoSampledFieldContourSegments({
  raw,
  width,
  height,
  levels,
  sampleStates,
} = {}) {
  const gridWidth = Number(width);
  const gridHeight = Number(height);
  if (
    !Number.isInteger(gridWidth) ||
    !Number.isInteger(gridHeight) ||
    gridWidth < 2 ||
    gridHeight < 2
  ) {
    throw new RangeError("width and height must be integers of at least two.");
  }
  if (!raw || raw.length !== gridWidth * gridHeight) {
    throw new RangeError("raw must contain exactly width * height samples.");
  }
  if (sampleStates && sampleStates.length !== raw.length) {
    throw new RangeError(
      "sampleStates must contain exactly width * height samples when supplied.",
    );
  }
  const contourLevels = levels ?? createTopoSignedContourLevels();
  const normalizedLevels = contourLevels.map((level, index) => {
    const value = requireFinite(
      typeof level === "number" ? level : level.value,
      "levels[" + index + "]",
    );
    return {
      ...(typeof level === "number" ? {} : level),
      value,
      family: typeof level === "number"
        ? value < 0 ? "negative" : value > 0 ? "positive" : "zero"
        : level.family,
      levelIdentity: topoMarchingSquaresLevelIdentity(value),
    };
  });
  const segments = [];
  let invalidCellCount = 0;
  let eligibleCellCount = 0;
  for (let cellY = 0; cellY < gridHeight - 1; cellY += 1) {
    for (let cellX = 0; cellX < gridWidth - 1; cellX += 1) {
      const topLeftIndex = cellY * gridWidth + cellX;
      const corners = [
        raw[topLeftIndex],
        raw[topLeftIndex + 1],
        raw[topLeftIndex + gridWidth + 1],
        raw[topLeftIndex + gridWidth],
      ];
      const cornerStates = sampleStates
        ? [
            sampleStates[topLeftIndex],
            sampleStates[topLeftIndex + 1],
            sampleStates[topLeftIndex + gridWidth + 1],
            sampleStates[topLeftIndex + gridWidth],
          ]
        : null;
      if (
        !corners.every(Number.isFinite) ||
        cornerStates?.some((state) => state !== TOPO_SAMPLED_FIELD_STATE.VALID)
      ) {
        invalidCellCount += 1;
        continue;
      }
      eligibleCellCount += 1;
      const minimum = Math.min(...corners);
      const maximum = Math.max(...corners);
      for (const level of normalizedLevels) {
        if (level.value < minimum || level.value > maximum || minimum === maximum) {
          continue;
        }
        const caseIndex = topoMarchingSquaresCaseIndex(corners, level.value);
        const edgePairs = topoMarchingSquaresEdgePairs(
          caseIndex,
          corners,
          level.value,
          cellX,
          cellY,
          level.levelIdentity,
        );
        for (const [firstEdge, secondEdge] of edgePairs) {
          const start = topoMarchingSquaresEdgePoint(
            firstEdge,
            cellX,
            cellY,
            corners,
            level.value,
          );
          const end = topoMarchingSquaresEdgePoint(
            secondEdge,
            cellX,
            cellY,
            corners,
            level.value,
          );
          segments.push(Object.freeze({
            ...level,
            x1: start.x,
            y1: start.y,
            x2: end.x,
            y2: end.y,
          }));
        }
      }
    }
  }
  return Object.freeze({
    policyId: TOPO_SAMPLED_FIELD_CONTOUR_POLICY_ID,
    segments: Object.freeze(segments),
    invalidCellCount,
    eligibleCellCount,
  });
}
