import {
  TOPO_DISPLAY_CLIP_MAGNITUDE,
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

function requireFinite(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new TypeError(label + " must be finite.");
  }
  return number;
}

export function createTopoSignedContourLevels({
  rangeDecades = 3,
  contourCount = null,
  contourReach = null,
  clipMagnitude = TOPO_DISPLAY_CLIP_MAGNITUDE,
  levelsPerDecade = TOPO_CONTOUR_LEVELS_PER_DECADE,
} = {}) {
  const span = requireFinite(rangeDecades, "rangeDecades");
  const maximum = requireFinite(clipMagnitude, "clipMagnitude");
  const subdivisions = requireFinite(levelsPerDecade, "levelsPerDecade");
  if (
    (contourCount == null && (!Number.isInteger(span) || span < 1 || span > 4)) ||
    maximum <= 0 ||
    subdivisions !== 1
  ) {
    throw new RangeError(
      "rangeDecades must be an integer in [1, 4], clipMagnitude positive, and levelsPerDecade exactly one.",
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

function edgePoint(edge, cellX, cellY, corners, level) {
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

function stableLevelTieIdentity(value) {
  const text = Number(value).toPrecision(15);
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash = Math.imul(hash ^ text.charCodeAt(index), 16777619);
  }
  return hash >>> 0;
}

function edgePairsForCase(caseIndex, corners, level, cellX, cellY, levelIdentity) {
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
      levelIdentity: stableLevelTieIdentity(value),
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
        let caseIndex = 0;
        if (corners[0] >= level.value) caseIndex |= 1;
        if (corners[1] >= level.value) caseIndex |= 2;
        if (corners[2] >= level.value) caseIndex |= 4;
        if (corners[3] >= level.value) caseIndex |= 8;
        const edgePairs = edgePairsForCase(
          caseIndex,
          corners,
          level.value,
          cellX,
          cellY,
          level.levelIdentity,
        );
        for (const [firstEdge, secondEdge] of edgePairs) {
          const start = edgePoint(
            firstEdge,
            cellX,
            cellY,
            corners,
            level.value,
          );
          const end = edgePoint(
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
