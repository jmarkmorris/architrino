// Enumerate coordinate-orthogonal symmetries of the F6c tetrahedral axes and
// derive their affine action on the two polarity-sector phase coordinates.
// This is exact finite-group geometry evaluated with floating trigonometric
// frames, not an EOM, retention, stability, or particle-identity result.

const PI = Math.PI;
const TWO_PI = 2 * PI;
const INVERSE_SQRT_THREE = 1 / Math.sqrt(3);
const TOLERANCE = 1e-10;

const axes = [
  [1, 1, 1],
  [1, -1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
].map((row) => row.map((value) => value * INVERSE_SQRT_THREE));
const circulationSigns = [-1, -1, 1, 1];
const basePhases = [0, PI, 4 * PI / 3, PI / 3];

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function cross(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function multiply(matrix, vector) {
  return matrix.map((row) => dot(row, vector));
}

function wrap(angle) {
  let result = angle;
  while (result <= -PI) result += TWO_PI;
  while (result > PI) result -= TWO_PI;
  return Math.abs(result) < TOLERANCE ? 0 : result;
}

function equalVectors(left, right) {
  return Math.max(...left.map(
    (value, index) => Math.abs(value - right[index]),
  )) < TOLERANCE;
}

function permutationParity(permutation) {
  let inversions = 0;
  for (let left = 0; left < permutation.length; left += 1) {
    for (let right = left + 1; right < permutation.length; right += 1) {
      if (permutation[left] > permutation[right]) inversions += 1;
    }
  }
  return inversions % 2 === 0 ? 1 : -1;
}

function permutations(values) {
  if (values.length === 0) return [[]];
  return values.flatMap((value, index) =>
    permutations(values.filter((_, candidate) => candidate !== index))
      .map((tail) => [value, ...tail]));
}

function piFraction(angle) {
  const ratio = wrap(angle) / PI;
  let best = { numerator: Math.round(ratio), denominator: 1, error: Infinity };
  for (let denominator = 1; denominator <= 24; denominator += 1) {
    const numerator = Math.round(ratio * denominator);
    const error = Math.abs(ratio - numerator / denominator);
    if (error < best.error) best = { numerator, denominator, error };
  }
  if (best.error >= TOLERANCE) return null;
  const divisor = (left, right) => right === 0
    ? Math.abs(left) : divisor(right, left % right);
  const common = divisor(best.numerator, best.denominator);
  return {
    numerator: best.numerator / common,
    denominator: best.denominator / common,
  };
}

const localU = axes.map((axis) => {
  const transverseNorm = Math.hypot(axis[0], axis[1]);
  return [-axis[1] / transverseNorm, axis[0] / transverseNorm, 0];
});
const localV = axes.map((axis, index) => cross(axis, localU[index]));

const coordinateOrthogonalSymmetries = [];
for (const permutation of permutations([0, 1, 2])) {
  for (const signX of [-1, 1]) {
    for (const signY of [-1, 1]) {
      for (const signZ of [-1, 1]) {
        const signs = [signX, signY, signZ];
        const matrix = Array.from({ length: 3 }, () => [0, 0, 0]);
        for (let row = 0; row < 3; row += 1) {
          matrix[row][permutation[row]] = signs[row];
        }
        const determinant =
          permutationParity(permutation) * signX * signY * signZ;
        const modulePermutation = axes.map((axis) => {
          const transformed = multiply(matrix, axis);
          return axes.findIndex((candidate) =>
            equalVectors(transformed, candidate));
        });
        if (modulePermutation.every((index) => index >= 0)) {
          coordinateOrthogonalSymmetries.push({
            matrix,
            determinant,
            modulePermutation,
          });
        }
      }
    }
  }
}

function sectorAction(symmetry, polarity) {
  const slopes = [];
  const offsets = [];
  for (let module = 0; module < axes.length; module += 1) {
    const target = symmetry.modulePermutation[module];
    const transformedU = multiply(symmetry.matrix, localU[module]);
    const frameOffset = Math.atan2(
      dot(transformedU, localV[target]),
      dot(transformedU, localU[target]),
    );
    slopes.push(
      symmetry.determinant * circulationSigns[module]
        / circulationSigns[target],
    );
    offsets.push(wrap(
      (
        symmetry.determinant * basePhases[module]
        + frameOffset
        - basePhases[target]
      ) / (polarity * circulationSigns[target]),
    ));
  }
  const commonSlope = slopes.every((value) => value === slopes[0])
    ? slopes[0] : null;
  const commonOffset = offsets.every(
    (value) => Math.abs(wrap(value - offsets[0])) < TOLERANCE,
  ) ? wrap(offsets[0]) : null;
  return {
    chartPreserving: commonSlope !== null && commonOffset !== null,
    slope: commonSlope,
    offsetRadians: commonOffset,
    offsetPiFraction:
      commonOffset === null ? null : piFraction(commonOffset),
  };
}

const rows = coordinateOrthogonalSymmetries.map((symmetry, index) => {
  const positive = sectorAction(symmetry, 1);
  const negative = sectorAction(symmetry, -1);
  const directPhaseAction = positive.slope === 1
    && negative.slope === 1
    && positive.offsetRadians === 0
    && negative.offsetRadians === 0;
  const currentAxisMultiplier =
    symmetry.matrix[0][1] === 0 && symmetry.matrix[0][2] === 0
      ? symmetry.matrix[0][0]
      : null;
  return {
    index,
    ...symmetry,
    chartPreserving: positive.chartPreserving && negative.chartPreserving,
    phaseActionOrder: directPhaseAction ? 1 : 2,
    currentAxisMultiplier,
    observableReturnOrders: {
      orientationQuotientedScalarShape: 1,
      sectorCadence: directPhaseAction ? 1 : 2,
      axialCurrent: currentAxisMultiplier === 1 ? 1 : 2,
    },
    phaseAction: { positive, negative },
  };
});
const chartRows = rows.filter((row) => row.chartPreserving);
const properChartRows = chartRows.filter((row) => row.determinant === 1);

console.log(JSON.stringify({
  schema: "f6c-identity-return-group/v1",
  claimGrade: "derived-finite-group-geometry",
  excludedClaims: [
    "eom-return",
    "binding",
    "retention",
    "stability",
    "particle-identity",
  ],
  summary: {
    coordinateOrthogonalTetrahedralSymmetries: rows.length,
    f6cChartPreservingSymmetries: chartRows.length,
    properF6cChartPreservingRotations: properChartRows.length,
    improperF6cChartPreservingMaps:
      chartRows.length - properChartRows.length,
    distinctProperPhaseActions: [...new Set(properChartRows.map((row) =>
      JSON.stringify([
        row.phaseAction.positive.slope,
        row.phaseAction.positive.offsetPiFraction,
        row.phaseAction.negative.slope,
        row.phaseAction.negative.offsetPiFraction,
      ])))].length,
  },
  properReturnActions: properChartRows,
  improperChartActions: chartRows.filter((row) => row.determinant === -1),
}, null, 2));
