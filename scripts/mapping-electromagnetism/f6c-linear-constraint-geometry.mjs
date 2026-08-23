import {
  f6cAssemblyCurrentDecomposition,
} from "./f6c-current-transport.mjs";

// Exact fixed-shape linear rows for F6c current and one pair-distance rate.
// The resulting projectors constrain release geometry only; they do not prove
// causal-root completeness, recurrence, retention, or stability.

const axes = [
  [1, 1, 1],
  [1, -1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
].map((axis) => axis.map((value) => value / Math.sqrt(3)));
const circulationSigns = [-1, -1, 1, 1];
const phaseOffsets = [0, Math.PI, 4 * Math.PI / 3, Math.PI / 3];

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function add(left, right) {
  return left.map((value, index) => value + right[index]);
}

function subtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function scale(vector, scalar) {
  return vector.map((value) => value * scalar);
}

function cross(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function norm(vector) {
  return Math.hypot(...vector);
}

function unit(vector) {
  return scale(vector, 1 / norm(vector));
}

const localFrames = axes.map((axis) => {
  const u = unit(cross([0, 0, 1], axis));
  return { u, v: cross(axis, u) };
});

function memberFixedShapeGeometry(sectors, id) {
  const module = Number.parseInt(id, 10);
  const positive = id.endsWith("+");
  const polarity = positive ? 1 : -1;
  const sectorOffset = positive ? 0 : 3;
  const sector = sectors[positive ? "positive" : "negative"];
  const axis = axes[module];
  const { u, v } = localFrames[module];
  const phase = polarity * circulationSigns[module] * sector.theta
    + phaseOffsets[module];
  const radial = add(scale(u, Math.cos(phase)), scale(v, Math.sin(phase)));
  const tangent = cross(axis, radial);
  const position = add(
    scale(axis, polarity * sector.h),
    scale(radial, sector.rho),
  );
  const velocityBasis = Array.from({ length: 6 }, () => [0, 0, 0]);
  velocityBasis[sectorOffset] = scale(axis, polarity);
  velocityBasis[sectorOffset + 1] = radial;
  velocityBasis[sectorOffset + 2] = scale(
    tangent,
    polarity * circulationSigns[module],
  );
  return { position, velocityBasis };
}

export function f6cPairDistanceRateRow(sectors, pairIds) {
  if (!Array.isArray(pairIds) || pairIds.length !== 2) {
    throw new TypeError("pairIds must contain exactly two F6c member ids");
  }
  const left = memberFixedShapeGeometry(sectors, pairIds[0]);
  const right = memberFixedShapeGeometry(sectors, pairIds[1]);
  const separation = subtract(left.position, right.position);
  const distance = norm(separation);
  const direction = scale(separation, 1 / distance);
  const row = left.velocityBasis.map((basis, index) =>
    dot(direction, subtract(basis, right.velocityBasis[index])));
  return { pairIds, distance, row };
}

export function minimumNormTwoConstraintSolution(
  firstRow,
  firstTarget,
  secondRow,
  secondTarget,
) {
  const firstSquared = dot(firstRow, firstRow);
  const secondSquared = dot(secondRow, secondRow);
  const mixed = dot(firstRow, secondRow);
  const determinant = firstSquared * secondSquared - mixed ** 2;
  const scaleFloor = Number.EPSILON * firstSquared * secondSquared * 64;
  if (!(determinant > scaleFloor)) {
    throw new RangeError("constraint rows are linearly dependent or null");
  }
  const firstMultiplier = (
    secondSquared * firstTarget - mixed * secondTarget
  ) / determinant;
  const secondMultiplier = (
    firstSquared * secondTarget - mixed * firstTarget
  ) / determinant;
  const solution = add(
    scale(firstRow, firstMultiplier),
    scale(secondRow, secondMultiplier),
  );
  return {
    solution,
    multipliers: [firstMultiplier, secondMultiplier],
    constraintResiduals: [
      dot(firstRow, solution) - firstTarget,
      dot(secondRow, solution) - secondTarget,
    ],
    norm: norm(solution),
    maximumSectorMemberSpeed: Math.max(
      norm(solution.slice(0, 3)),
      norm(solution.slice(3, 6)),
    ),
    rowAngleCosine: mixed / Math.sqrt(firstSquared * secondSquared),
  };
}

function weightedTwoConstraintSolution(
  firstRow,
  firstTarget,
  secondRow,
  secondTarget,
  negativeSectorWeight,
) {
  const inverseWeights = [1, 1, 1].concat(
    [1, 1, 1].map(() => 1 / negativeSectorWeight),
  );
  const weightedDot = (left, right) => left.reduce(
    (sum, value, index) => sum
      + value * right[index] * inverseWeights[index],
    0,
  );
  const firstSquared = weightedDot(firstRow, firstRow);
  const secondSquared = weightedDot(secondRow, secondRow);
  const mixed = weightedDot(firstRow, secondRow);
  const determinant = firstSquared * secondSquared - mixed ** 2;
  if (!(determinant > 0)) {
    throw new RangeError("weighted constraint rows are dependent or null");
  }
  const firstMultiplier = (
    secondSquared * firstTarget - mixed * secondTarget
  ) / determinant;
  const secondMultiplier = (
    firstSquared * secondTarget - mixed * firstTarget
  ) / determinant;
  const solution = firstRow.map((value, index) => inverseWeights[index] * (
    firstMultiplier * value + secondMultiplier * secondRow[index]
  ));
  const sectorSpeeds = [
    norm(solution.slice(0, 3)),
    norm(solution.slice(3, 6)),
  ];
  return {
    solution,
    multipliers: [firstMultiplier, secondMultiplier],
    negativeSectorWeight,
    sectorSpeeds,
    maximumSectorMemberSpeed: Math.max(...sectorSpeeds),
    constraintResiduals: [
      dot(firstRow, solution) - firstTarget,
      dot(secondRow, solution) - secondTarget,
    ],
  };
}

export function minimumMaximumSectorSpeedTwoConstraintSolution(
  firstRow,
  firstTarget,
  secondRow,
  secondTarget,
) {
  let lowerLogWeight = -30;
  let upperLogWeight = 30;
  let lower = weightedTwoConstraintSolution(
    firstRow,
    firstTarget,
    secondRow,
    secondTarget,
    Math.exp(lowerLogWeight),
  );
  let upper = weightedTwoConstraintSolution(
    firstRow,
    firstTarget,
    secondRow,
    secondTarget,
    Math.exp(upperLogWeight),
  );
  const imbalance = (candidate) =>
    candidate.sectorSpeeds[0] - candidate.sectorSpeeds[1];
  if (imbalance(lower) * imbalance(upper) > 0) {
    throw new RangeError(
      "the two-active-sector minimax branch was not bracketed",
    );
  }
  let selected = lower;
  for (let iteration = 0; iteration < 120; iteration += 1) {
    const middleLogWeight = (lowerLogWeight + upperLogWeight) / 2;
    const middle = weightedTwoConstraintSolution(
      firstRow,
      firstTarget,
      secondRow,
      secondTarget,
      Math.exp(middleLogWeight),
    );
    selected = middle;
    if (imbalance(middle) > 0) {
      upperLogWeight = middleLogWeight;
      upper = middle;
    } else {
      lowerLogWeight = middleLogWeight;
      lower = middle;
    }
  }
  return {
    ...selected,
    weightBracket: [
      Math.exp(lowerLogWeight),
      Math.exp(upperLogWeight),
    ],
  };
}

export function f6cCurrentCorridorDecomposition(
  sectors,
  pairIds,
  targetCurrent,
  targetDistanceRate,
) {
  const current = f6cAssemblyCurrentDecomposition(sectors);
  const corridor = f6cPairDistanceRateRow(sectors, pairIds);
  const constrainedCarrier = minimumNormTwoConstraintSolution(
    current.currentRow,
    targetCurrent,
    corridor.row,
    targetDistanceRate,
  );
  const residual = current.rateVector.map(
    (value, index) => value - constrainedCarrier.solution[index],
  );
  return {
    currentRow: current.currentRow,
    corridorRow: corridor.row,
    pairIds,
    pairDistance: corridor.distance,
    actualCurrent: current.current,
    actualDistanceRate: dot(corridor.row, current.rateVector),
    targetCurrent,
    targetDistanceRate,
    constrainedCarrier,
    jointNeutralResidual: residual,
    jointNeutralResidualNorm: norm(residual),
    jointNeutralConstraintResiduals: [
      dot(current.currentRow, residual),
      dot(corridor.row, residual),
    ],
    pythagoreanResidual:
      dot(current.rateVector, current.rateVector)
        - dot(constrainedCarrier.solution, constrainedCarrier.solution)
        - dot(residual, residual),
  };
}
