#!/usr/bin/env node

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyEighthOrderPostUSuccessorCoefficientCertificate,
  evaluateH38RecurrenceNumeratorBeforeSolve,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-eighth-order-post-u-successor-coefficient-certificate.mjs";
import {
  theta3minusFoldPairScaledRootTubeCellInternals as root,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.mjs";
import {
  THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS,
  branchSeriesCoordinates,
  buildH39SharedDomainCoefficientArtifact,
  cellFromCertificateRow,
  computeH39AffineCenterHRowSensitivityDiagnosticCandidate,
  computeH39ShiftedR43PressureDecompositionCandidate,
  hIntervalsFromBranchRow,
  makeTheta3minusFirstYGdSeriesContext,
  solveH39CenterCoefficientRow,
} from "./theta3minus-fold-pair-first-y-gd-shared-domain-evaluator.mjs";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_RECURRENCE_REFINED_SUBCOVER_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-recurrence-refined-subcover-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_ONE_NOISE_AFFINE_H_ROW_TRANSPORT_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-one-noise-affine-h-row-transport-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_AFFINE_H_ROW_GRAPH_SUBDIVISION_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-affine-h-row-graph-subdivision-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_POLYNOMIAL_H_ROW_GRAPH_RESIDUAL_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-polynomial-h-row-graph-residual-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_POLYNOMIAL_H_ROW_GRAPH_INTERVAL_RESIDUAL_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-polynomial-h-row-graph-interval-residual-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_CORRELATED_RESIDUAL_WIDTH_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-correlated-residual-width-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_SOLVE_WIDTH_FACTORIZATION_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-h38-solve-width-factorization-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_NUMERATOR_GRAPH_SOLVE_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-h38-numerator-graph-solve-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_NUMERATOR_GRAPH_RESIDUAL_BUDGET_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-h38-numerator-graph-residual-budget-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_NUMERATOR_GRAPH_LOCAL_PARTITION_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-h38-numerator-graph-local-partition-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_DECOMPOSITION_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-h38-expression-n38-decomposition-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TAYLOR_BUDGET_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-h38-expression-n38-taylor-budget-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TAYLOR_ENCLOSURE_PROTOTYPE_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-h38-expression-n38-taylor-enclosure-prototype/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TAYLOR_DERIVATIVE_BOUND_PROTOTYPE_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-h38-expression-n38-taylor-derivative-bound-prototype/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TAYLOR_FOURTH_DIFFERENCE_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-h38-expression-n38-taylor-fourth-difference-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TAYLOR_CORRECTED_RETILE_PROTOTYPE_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-h38-expression-n38-taylor-corrected-retile-prototype/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_SINE_PAIR_NORMAL_FORM_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-h38-expression-n38-sine-pair-normal-form-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_REDUCED_SIGMA_ETA_SOURCE_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-h38-expression-n38-reduced-sigma-eta-source-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_ETA_TRANSPORT_COUPLING_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-h38-expression-n38-eta-transport-coupling-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TERMINAL_ETA_GRAPH_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-h38-expression-n38-terminal-eta-graph-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TERMINAL_GRAPH_REMAINDER_BUDGET_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-h38-expression-n38-terminal-graph-remainder-budget-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_TERMINAL_SHARED_RESIDUAL_AFFINE_ZETA_PROVIDER_REPLAY_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-terminal-shared-residual-affine-zeta-provider-replay-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_POST_ZETA_PRESSURE_SOURCE_ISOLATION_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-post-zeta-pressure-source-isolation-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_Y44_COEFFICIENT_DEPENDENCE_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-h38-y44-coefficient-dependence-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_Y44_SIGNED_AFFINE_TARGET_ENVELOPE_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-h38-y44-signed-affine-target-envelope-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_Y44_N38_TERMINAL_ENDPOINT_BRIDGE_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-h38-y44-n38-terminal-endpoint-bridge-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_Y44_SOURCE_COVARIANCE_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-h38-y44-source-covariance-diagnostic/v1";

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TAYLOR_M4_REFINEMENT_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-h39-h38-expression-n38-taylor-m4-refinement-diagnostic/v1";

const H38_NUMERATOR_Y_ORDER =
  THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift - 1;

function assertFinitePositiveInteger(name, value) {
  const resolved = Number(value);
  if (!Number.isInteger(resolved) || resolved < 1) {
    throw new Error(`${name} must be a positive integer`);
  }
  return resolved;
}

function assertFinitePositiveNumber(name, value) {
  const resolved = Number(value);
  if (!Number.isFinite(resolved) || resolved <= 0) {
    throw new Error(`${name} must be a positive finite number`);
  }
  return resolved;
}

function numericInterval(name, interval) {
  if (!Array.isArray(interval) || interval.length !== 2) {
    throw new Error(`${name} must be a two-entry interval`);
  }
  const resolved = interval.map(Number);
  if (
    !Number.isFinite(resolved[0]) ||
    !Number.isFinite(resolved[1]) ||
    resolved[0] >= resolved[1]
  ) {
    throw new Error(`${name} must be a finite increasing interval`);
  }
  return resolved;
}

function numericOrderedInterval(name, interval) {
  if (!Array.isArray(interval) || interval.length !== 2) {
    throw new Error(`${name} must be a two-entry interval`);
  }
  const resolved = interval.map(Number);
  if (
    !Number.isFinite(resolved[0]) ||
    !Number.isFinite(resolved[1]) ||
    resolved[0] > resolved[1]
  ) {
    throw new Error(`${name} must be a finite ordered interval`);
  }
  return resolved;
}

function uniqueIncreasingSamples(samples) {
  return [...new Set(samples.map((sample) => Number(sample).toPrecision(15)))]
    .map(Number)
    .sort((left, right) => left - right);
}

function speedSamplesForLocalSubcover({ targetSpeedInterval, subcellCount }) {
  const [targetLeft, targetRight] = targetSpeedInterval;
  const width = targetRight - targetLeft;
  const localSamples = Array.from({ length: subcellCount + 1 }, (_, index) =>
    targetLeft + (width * index) / subcellCount
  );
  return uniqueIncreasingSamples([
    root.SPEED_RATIO_ENCLOSURE[0],
    ...localSamples,
    root.SPEED_RATIO_ENCLOSURE[1],
  ]);
}

function targetRowsForSubcellCount({
  targetSpeedInterval,
  subcellCount,
  rootSubdivisions,
}) {
  const artifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyEighthOrderPostUSuccessorCoefficientCertificate(
      {
        speedSamples: speedSamplesForLocalSubcover({
          targetSpeedInterval,
          subcellCount,
        }),
        rootSubdivisions,
      }
    );
  return localRowsForTargetInterval(
    artifact.thirty_eighth_order_post_u_successor_coefficient_rows,
    targetSpeedInterval
  );
}

function localRowsForTargetInterval(rows, targetSpeedInterval) {
  const [targetLeft, targetRight] = targetSpeedInterval;
  return rows.filter((row) => {
    const [left, right] = row.speed_interval.map(Number);
    return left >= targetLeft - 1e-12 && right <= targetRight + 1e-12;
  });
}

function branchRowFor(row, branch) {
  const branchRow = row.branch_rows.find(
    (candidate) => candidate.branch === branch
  );
  if (!branchRow) {
    throw new Error(`row ${row.cell_id} does not contain branch ${branch}`);
  }
  return branchRow;
}

function pressureDiagnosticForRow({
  context,
  row,
  branch,
  outerRadius,
  shiftedIndex,
  hFreezeStartIndexes,
}) {
  const branchRow = branchRowFor(row, branch);
  return computeH39AffineCenterHRowSensitivityDiagnosticCandidate({
    context,
    cell: cellFromCertificateRow(row),
    branch,
    hIntervals: hIntervalsFromBranchRow(branchRow, { hCount: 39 }),
    solveSlopeInterval: branchRow.h38_solve_slope_interval,
    outerRadius,
    shiftedIndex,
    hFreezeStartIndexes,
  });
}

function finitePositive(value) {
  return Number.isFinite(Number(value)) && Number(value) > 0;
}

function finiteNonnegative(value) {
  return Number.isFinite(Number(value)) && Number(value) >= 0;
}

function intervalMidpoint([left, right]) {
  return (Number(left) + Number(right)) / 2;
}

function intervalWidth([left, right]) {
  return Number(right) - Number(left);
}

function intervalAbsUpper([left, right]) {
  return Math.max(Math.abs(Number(left)), Math.abs(Number(right)));
}

function intervalAbsLower([left, right]) {
  const resolvedLeft = Number(left);
  const resolvedRight = Number(right);
  if (resolvedLeft <= 0 && resolvedRight >= 0) {
    return 0;
  }
  return Math.min(Math.abs(resolvedLeft), Math.abs(resolvedRight));
}

function intervalEndpointMaxGap(left, right) {
  return Math.max(
    Math.abs(Number(left[0]) - Number(right[0])),
    Math.abs(Number(left[1]) - Number(right[1]))
  );
}

function intervalEndpointRelativeGap(left, right) {
  return (
    intervalEndpointMaxGap(left, right) /
    Math.max(1, intervalAbsUpper(left), intervalAbsUpper(right))
  );
}

function pointInterval(value) {
  return [value, value];
}

function pointCellAtMidpoint(cell) {
  return Object.fromEntries(
    Object.entries(cell).map(([key, interval]) => [
      key,
      pointInterval(intervalMidpoint(interval)),
    ])
  );
}

function hRowWidthProfileForRows({ rows, branch, hCount = 39 }) {
  return Array.from({ length: hCount }, (_, hIndex) => {
    const widths = rows.map((row) => {
      const branchRow = branchRowFor(row, branch);
      return intervalWidth(
        hIntervalsFromBranchRow(branchRow, { hCount })[hIndex]
      );
    });
    return {
      h_index: hIndex,
      max_width: Math.max(...widths),
      min_width: Math.min(...widths),
    };
  });
}

function hRowSignedTransportProfileForRows({ rows, branch, hCount = 39 }) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return [];
  }
  const firstBranchRow = branchRowFor(rows[0], branch);
  const lastBranchRow = branchRowFor(rows[rows.length - 1], branch);
  const firstHIntervals = hIntervalsFromBranchRow(firstBranchRow, { hCount });
  const lastHIntervals = hIntervalsFromBranchRow(lastBranchRow, { hCount });
  return Array.from({ length: hCount }, (_, hIndex) => {
    const firstMidpoint = intervalMidpoint(firstHIntervals[hIndex]);
    const lastMidpoint = intervalMidpoint(lastHIntervals[hIndex]);
    const midpointDelta = lastMidpoint - firstMidpoint;
    return {
      h_index: hIndex,
      first_refined_midpoint: firstMidpoint,
      last_refined_midpoint: lastMidpoint,
      signed_refined_midpoint_delta: midpointDelta,
      direction_sign: Math.sign(midpointDelta) || 1,
    };
  });
}

function hRowAffineTransportProfileForRows({ rows, branch, hCount = 39 }) {
  if (!Array.isArray(rows) || rows.length !== 2) {
    throw new Error("one-noise h-row transport requires exactly two refined rows");
  }
  const [leftRow, rightRow] = rows
    .slice()
    .sort(
      (left, right) =>
        Number(left.speed_interval?.[0] ?? 0) -
        Number(right.speed_interval?.[0] ?? 0)
    );
  const leftBranchRow = branchRowFor(leftRow, branch);
  const rightBranchRow = branchRowFor(rightRow, branch);
  const leftHIntervals = hIntervalsFromBranchRow(leftBranchRow, { hCount });
  const rightHIntervals = hIntervalsFromBranchRow(rightBranchRow, { hCount });
  return Array.from({ length: hCount }, (_, hIndex) => {
    const leftMidpoint = intervalMidpoint(leftHIntervals[hIndex]);
    const rightMidpoint = intervalMidpoint(rightHIntervals[hIndex]);
    const centerCoefficient = (leftMidpoint + rightMidpoint) / 2;
    const directionCoefficient = (rightMidpoint - leftMidpoint) / 2;
    return {
      h_index: hIndex,
      h_i_minus: leftMidpoint,
      h_i_plus: rightMidpoint,
      center_coefficient_c_i: centerCoefficient,
      direction_coefficient_d_i: directionCoefficient,
      affine_formula: "h_i(xi)=c_i+xi*d_i",
    };
  });
}

function hRowAffineTransportProfilesByBranch({ rows, hCount = 39 }) {
  if (!Array.isArray(rows?.[0]?.branch_rows)) {
    throw new Error("refined rows must contain branch rows");
  }
  return Object.fromEntries(
    rows[0].branch_rows.map((branchRow) => [
      branchRow.branch,
      hRowAffineTransportProfileForRows({
        rows,
        branch: branchRow.branch,
        hCount,
      }),
    ])
  );
}

function hIntervalsForAffineTransportNoise({ transportProfile, noise }) {
  return transportProfile.map((profile) =>
    pointInterval(
      Number(profile.center_coefficient_c_i) +
        Number(noise) * Number(profile.direction_coefficient_d_i)
    )
  );
}

function hIntervalsForAffineTransportNoiseInterval({
  transportProfile,
  noiseInterval,
}) {
  const [noiseLeft, noiseRight] = noiseInterval;
  return transportProfile.map((profile) => {
    const left =
      Number(profile.center_coefficient_c_i) +
      Number(noiseLeft) * Number(profile.direction_coefficient_d_i);
    const right =
      Number(profile.center_coefficient_c_i) +
      Number(noiseRight) * Number(profile.direction_coefficient_d_i);
    return [Math.min(left, right), Math.max(left, right)];
  });
}

function speedMidpointXiCoordinate({ row, targetSpeedInterval }) {
  const [targetLeft, targetRight] = targetSpeedInterval;
  const targetWidth = targetRight - targetLeft;
  const speedFraction =
    (intervalMidpoint(row.speed_interval) - targetLeft) / targetWidth;
  return 4 * speedFraction - 2;
}

function speedIntervalXiInterval({ row, targetSpeedInterval }) {
  const [targetLeft, targetRight] = targetSpeedInterval;
  const targetWidth = targetRight - targetLeft;
  const mapped = row.speed_interval.map((speed) =>
    4 * ((Number(speed) - targetLeft) / targetWidth) - 2
  );
  return [Math.min(...mapped), Math.max(...mapped)];
}

function intervalHull(intervals) {
  return [
    Math.min(...intervals.map((interval) => Number(interval[0]))),
    Math.max(...intervals.map((interval) => Number(interval[1]))),
  ];
}

function hIntervalsForAffineGraphPlusResidual({
  transportProfile,
  noiseInterval,
  residualProfile,
}) {
  const graphIntervals = hIntervalsForAffineTransportNoiseInterval({
    transportProfile,
    noiseInterval,
  });
  return graphIntervals.map((interval, hIndex) => {
    const residualAbs = Number(residualProfile?.[hIndex]?.max_abs_residual ?? 0);
    return [interval[0] - residualAbs, interval[1] + residualAbs];
  });
}

function solveLinearSystem(matrix, vector) {
  const size = vector.length;
  const augmented = matrix.map((row, rowIndex) => [
    ...row.map(Number),
    Number(vector[rowIndex]),
  ]);
  for (let column = 0; column < size; column += 1) {
    let pivotRow = column;
    for (let row = column + 1; row < size; row += 1) {
      if (
        Math.abs(augmented[row][column]) >
        Math.abs(augmented[pivotRow][column])
      ) {
        pivotRow = row;
      }
    }
    if (Math.abs(augmented[pivotRow][column]) < 1e-300) {
      throw new Error("polynomial fit linear system is singular");
    }
    if (pivotRow !== column) {
      [augmented[column], augmented[pivotRow]] = [
        augmented[pivotRow],
        augmented[column],
      ];
    }
    const pivot = augmented[column][column];
    for (let entry = column; entry <= size; entry += 1) {
      augmented[column][entry] /= pivot;
    }
    for (let row = 0; row < size; row += 1) {
      if (row === column) {
        continue;
      }
      const factor = augmented[row][column];
      for (let entry = column; entry <= size; entry += 1) {
        augmented[row][entry] -= factor * augmented[column][entry];
      }
    }
  }
  return augmented.map((row) => row[size]);
}

function fitPolynomialLeastSquares(points, degree) {
  const resolvedDegree = assertFinitePositiveInteger("degree", degree);
  if (!Array.isArray(points) || points.length < resolvedDegree + 1) {
    throw new Error("polynomial fit requires at least degree + 1 points");
  }
  const termCount = resolvedDegree + 1;
  const normalMatrix = Array.from({ length: termCount }, () =>
    Array.from({ length: termCount }, () => 0)
  );
  const normalVector = Array.from({ length: termCount }, () => 0);
  points.forEach((point) => {
    const xPowers = Array.from({ length: termCount }, (_, power) =>
      Math.pow(Number(point.x), power)
    );
    for (let row = 0; row < termCount; row += 1) {
      normalVector[row] += xPowers[row] * Number(point.y);
      for (let column = 0; column < termCount; column += 1) {
        normalMatrix[row][column] += xPowers[row] * xPowers[column];
      }
    }
  });
  return solveLinearSystem(normalMatrix, normalVector);
}

function polynomialValue(coefficients, x) {
  return coefficients.reduceRight(
    (accumulator, coefficient) => accumulator * Number(x) + Number(coefficient),
    0
  );
}

function quadraticRoots({ a, b, c }) {
  if (Math.abs(a) < 1e-300) {
    return Math.abs(b) < 1e-300 ? [] : [-c / b];
  }
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) {
    return [];
  }
  if (discriminant === 0) {
    return [-b / (2 * a)];
  }
  const root = Math.sqrt(discriminant);
  return [(-b - root) / (2 * a), (-b + root) / (2 * a)];
}

function polynomialCriticalPointsOnInterval(coefficients, interval) {
  const [left, right] = interval;
  const derivativeCoefficients = coefficients
    .slice(1)
    .map((coefficient, index) => Number(coefficient) * (index + 1));
  let roots = [];
  if (derivativeCoefficients.length === 1) {
    roots = [];
  } else if (derivativeCoefficients.length === 2) {
    const [constant, linear] = derivativeCoefficients;
    roots = Math.abs(linear) < 1e-300 ? [] : [-constant / linear];
  } else if (derivativeCoefficients.length === 3) {
    const [constant, linear, quadratic] = derivativeCoefficients;
    roots = quadraticRoots({
      a: quadratic,
      b: linear,
      c: constant,
    });
  } else if (derivativeCoefficients.length > 3) {
    throw new Error("polynomial interval ranges are implemented through degree 3");
  }
  return roots.filter(
    (rootPoint) =>
      Number.isFinite(rootPoint) &&
      rootPoint >= left &&
      rootPoint <= right
  );
}

function polynomialRangeOnInterval({ coefficients, interval }) {
  const resolvedInterval = numericInterval("interval", interval);
  const samplePoints = [
    resolvedInterval[0],
    resolvedInterval[1],
    ...polynomialCriticalPointsOnInterval(coefficients, resolvedInterval),
  ];
  const values = samplePoints.map((point) =>
    polynomialValue(coefficients, point)
  );
  return [Math.min(...values), Math.max(...values)];
}

function hRowPolynomialTransportProfileForRows({
  rows,
  branch,
  targetSpeedInterval,
  degree,
  hCount = 39,
}) {
  const resolvedDegree = assertFinitePositiveInteger("degree", degree);
  if (resolvedDegree > 3) {
    throw new Error("polynomial h-row graph diagnostic supports degree at most 3");
  }
  if (!Array.isArray(rows) || rows.length < resolvedDegree + 1) {
    throw new Error("polynomial h-row graph requires at least degree + 1 rows");
  }
  const sortedRows = rows
    .slice()
    .sort(
      (left, right) =>
        Number(left.speed_interval?.[0] ?? 0) -
        Number(right.speed_interval?.[0] ?? 0)
    );
  const rowSamples = sortedRows.map((row) => {
    const xiCoordinate = speedMidpointXiCoordinate({
      row,
      targetSpeedInterval,
    });
    const branchRow = branchRowFor(row, branch);
    const hMidpoints = hIntervalsFromBranchRow(branchRow, {
      hCount,
    }).map(intervalMidpoint);
    return {
      cell_id: row.cell_id,
      speed_interval: row.speed_interval,
      xi_coordinate: xiCoordinate,
      h_midpoints: hMidpoints,
    };
  });
  return Array.from({ length: hCount }, (_, hIndex) => {
    const fitPoints = rowSamples.map((sample) => ({
      x: sample.xi_coordinate,
      y: sample.h_midpoints[hIndex],
    }));
    const coefficients = fitPolynomialLeastSquares(fitPoints, resolvedDegree);
    const fitResiduals = fitPoints.map((point) => {
      const predicted = polynomialValue(coefficients, point.x);
      return {
        xi_coordinate: point.x,
        actual_h_midpoint: point.y,
        polynomial_graph_prediction: predicted,
        residual: point.y - predicted,
        abs_residual: Math.abs(point.y - predicted),
      };
    });
    return {
      h_index: hIndex,
      polynomial_degree: resolvedDegree,
      coefficients,
      coefficient_order: "ascending powers of xi",
      fit_max_abs_residual: Math.max(
        ...fitResiduals.map((residual) => residual.abs_residual)
      ),
      fit_residuals: fitResiduals,
    };
  });
}

function hRowPolynomialTransportProfilesByBranch({
  rows,
  targetSpeedInterval,
  degree,
  hCount = 39,
}) {
  if (!Array.isArray(rows?.[0]?.branch_rows)) {
    throw new Error("polynomial source rows must contain branch rows");
  }
  return Object.fromEntries(
    rows[0].branch_rows.map((branchRow) => [
      branchRow.branch,
      hRowPolynomialTransportProfileForRows({
        rows,
        branch: branchRow.branch,
        targetSpeedInterval,
        degree,
        hCount,
      }),
    ])
  );
}

function hIntervalsForPolynomialGraphInterval({
  transportProfile,
  noiseInterval,
}) {
  return transportProfile.map((profile) =>
    polynomialRangeOnInterval({
      coefficients: profile.coefficients,
      interval: noiseInterval,
    })
  );
}

function hIntervalsForPolynomialGraphPlusResidual({
  transportProfile,
  noiseInterval,
  residualProfile,
}) {
  const graphIntervals = hIntervalsForPolynomialGraphInterval({
    transportProfile,
    noiseInterval,
  });
  return graphIntervals.map((interval, hIndex) => {
    const residualAbs = Number(residualProfile?.[hIndex]?.max_abs_residual ?? 0);
    return [interval[0] - residualAbs, interval[1] + residualAbs];
  });
}

function hIntervalsForPolynomialGraphPlusIntervalResidual({
  transportProfile,
  noiseInterval,
  residualProfile,
}) {
  const graphIntervals = hIntervalsForPolynomialGraphInterval({
    transportProfile,
    noiseInterval,
  });
  return graphIntervals.map((interval, hIndex) => {
    const residualInterval =
      residualProfile?.[hIndex]?.residual_interval_hull ?? [0, 0];
    return [
      interval[0] + Number(residualInterval[0]),
      interval[1] + Number(residualInterval[1]),
    ];
  });
}

function hIntervalsForPolynomialGraphCorrelatedResidualPoint({
  transportProfile,
  noise,
  residualProfile,
  residualNoise,
  residualStartIndex = 0,
}) {
  return transportProfile.map((profile, hIndex) => {
    const residualInterval =
      residualProfile?.[hIndex]?.residual_interval_hull ?? [0, 0];
    const residualCenter =
      hIndex >= residualStartIndex ? intervalMidpoint(residualInterval) : 0;
    const residualRadius =
      hIndex >= residualStartIndex ? intervalWidth(residualInterval) / 2 : 0;
    return pointInterval(
      polynomialValue(profile.coefficients, noise) +
        residualCenter +
        Number(residualNoise) * residualRadius
    );
  });
}

function hIntervalsForPolynomialGraphResidualCentersWithH38VariantPoint({
  transportProfile,
  noise,
  residualProfile,
  h38ResidualInterval,
  h38Noise,
}) {
  return transportProfile.map((profile, hIndex) => {
    const residualInterval =
      hIndex === 38
        ? h38ResidualInterval
        : residualProfile?.[hIndex]?.residual_interval_hull ?? [0, 0];
    const residualCenter = intervalMidpoint(residualInterval);
    const residualRadius =
      hIndex === 38 ? intervalWidth(residualInterval) / 2 : 0;
    return pointInterval(
      polynomialValue(profile.coefficients, noise) +
        residualCenter +
        Number(h38Noise) * residualRadius
    );
  });
}

function hIntervalsForPolynomialGraphResidualCentersWithH38VariantInterval({
  transportProfile,
  noise,
  residualProfile,
  h38ResidualInterval,
  h38NoiseInterval,
}) {
  if (!Array.isArray(h38NoiseInterval) || h38NoiseInterval.length !== 2) {
    throw new Error("h38NoiseInterval must be a two-entry interval");
  }
  const resolvedH38NoiseInterval = h38NoiseInterval.map(Number);
  if (
    !Number.isFinite(resolvedH38NoiseInterval[0]) ||
    !Number.isFinite(resolvedH38NoiseInterval[1]) ||
    resolvedH38NoiseInterval[0] > resolvedH38NoiseInterval[1]
  ) {
    throw new Error("h38NoiseInterval must be a finite nondecreasing interval");
  }
  return transportProfile.map((profile, hIndex) => {
    const residualInterval =
      hIndex === 38
        ? h38ResidualInterval
        : residualProfile?.[hIndex]?.residual_interval_hull ?? [0, 0];
    const residualCenter = intervalMidpoint(residualInterval);
    if (hIndex !== 38) {
      return pointInterval(
        polynomialValue(profile.coefficients, noise) + residualCenter
      );
    }
    const residualRadius = intervalWidth(residualInterval) / 2;
    const graphCenter = polynomialValue(profile.coefficients, noise);
    return [
      graphCenter + residualCenter + resolvedH38NoiseInterval[0] * residualRadius,
      graphCenter + residualCenter + resolvedH38NoiseInterval[1] * residualRadius,
    ];
  });
}

function splitNumericInterval(interval, partitionCount) {
  const [left, right] = numericInterval("interval", interval);
  const resolvedPartitionCount = assertFinitePositiveInteger(
    "partitionCount",
    partitionCount
  );
  const width = (right - left) / resolvedPartitionCount;
  return Array.from({ length: resolvedPartitionCount }, (_, index) => [
    left + index * width,
    index === resolvedPartitionCount - 1
      ? right
      : left + (index + 1) * width,
  ]);
}

function candidateOnlyHRowProviderClaimBoundary() {
  return {
    certifies_shifted_R43_outer_bound: false,
    certifies_directed_rounded_shared_domain: false,
    certifies_continuous_polydisc_primitives: false,
    retained_branch: false,
  };
}

function affineGraphHRowProvider({
  transportProfilesByBranch,
  noiseInterval,
  providerKind = "candidate-affine-h-row-graph-provider",
  providerProvenance = "two-refined-H38-subcell-midpoint-affine-fit",
}) {
  return ({ branch, branchRow, cellId, replayKind }) => {
    const transportProfile = transportProfilesByBranch[branch];
    if (!transportProfile) {
      throw new Error(`missing affine h-row graph profile for branch ${branch}`);
    }
    return {
      branch,
      hIntervals: hIntervalsForAffineTransportNoiseInterval({
        transportProfile,
        noiseInterval,
      }),
      solveSlopeInterval: branchRow.h38_solve_slope_interval,
      providerKind,
      preservesDependencies: true,
      sourceCellId: cellId,
      replayKind: replayKind ?? "h39-affine-h-row-graph-replay",
      hRowProviderProvenance: providerProvenance,
      hRowDependencyTrace: [
        {
          dependency_kind: "affine-h-row-graph",
          source: providerProvenance,
          xi_interval: noiseInterval,
          h_count: transportProfile.length,
        },
      ],
      hRowDependencyWitness: {
        witness_kind: "candidate-affine-h-row-graph-provider",
        xi_interval: noiseInterval,
        affine_formula: "h_i(xi)=c_i+xi*d_i",
        h_count: transportProfile.length,
      },
      hRowProviderClaimBoundary: candidateOnlyHRowProviderClaimBoundary(),
    };
  };
}

function polynomialGraphHRowProvider({
  transportProfilesByBranch,
  noiseInterval,
  providerKind = "candidate-polynomial-h-row-graph-provider",
  providerProvenance = "local-H38-subcell-midpoint-polynomial-fit",
}) {
  return ({ branch, branchRow, cellId, replayKind }) => {
    const transportProfile = transportProfilesByBranch[branch];
    if (!transportProfile) {
      throw new Error(`missing polynomial h-row graph profile for branch ${branch}`);
    }
    const polynomialDegree = transportProfile[0]?.polynomial_degree ?? null;
    return {
      branch,
      hIntervals: hIntervalsForPolynomialGraphInterval({
        transportProfile,
        noiseInterval,
      }),
      solveSlopeInterval: branchRow.h38_solve_slope_interval,
      providerKind,
      preservesDependencies: true,
      sourceCellId: cellId,
      replayKind: replayKind ?? "h39-polynomial-h-row-graph-replay",
      hRowProviderProvenance: providerProvenance,
      hRowDependencyTrace: [
        {
          dependency_kind: "polynomial-h-row-graph",
          source: providerProvenance,
          xi_interval: noiseInterval,
          polynomial_degree: polynomialDegree,
          h_count: transportProfile.length,
        },
      ],
      hRowDependencyWitness: {
        witness_kind: "candidate-polynomial-h-row-graph-provider",
        xi_interval: noiseInterval,
        polynomial_degree: polynomialDegree,
        coefficient_order: "ascending powers of xi",
        h_count: transportProfile.length,
      },
      hRowProviderClaimBoundary: candidateOnlyHRowProviderClaimBoundary(),
    };
  };
}

function polynomialGraphIntervalResidualHRowProvider({
  transportProfilesByBranch,
  intervalResidualProfilesByBranch,
  noiseInterval,
  providerKind = "candidate-polynomial-h-row-graph-interval-residual-provider",
  providerProvenance = "local-H38-producer-interval-quadratic-fit-plus-residual",
}) {
  return ({ branch, branchRow, cellId, replayKind }) => {
    const transportProfile = transportProfilesByBranch[branch];
    const residualProfile = intervalResidualProfilesByBranch[branch];
    if (!transportProfile) {
      throw new Error(`missing polynomial h-row graph profile for branch ${branch}`);
    }
    if (!residualProfile) {
      throw new Error(`missing polynomial interval residual profile for branch ${branch}`);
    }
    const polynomialDegree = transportProfile[0]?.polynomial_degree ?? null;
    return {
      branch,
      hIntervals: hIntervalsForPolynomialGraphPlusIntervalResidual({
        transportProfile,
        noiseInterval,
        residualProfile,
      }),
      solveSlopeInterval: branchRow.h38_solve_slope_interval,
      providerKind,
      preservesDependencies: true,
      sourceCellId: cellId,
      replayKind:
        replayKind ?? "h39-polynomial-h-row-graph-interval-residual-replay",
      hRowProviderProvenance: providerProvenance,
      hRowDependencyTrace: [
        {
          dependency_kind: "polynomial-h-row-graph-plus-interval-residual",
          source: providerProvenance,
          xi_interval: noiseInterval,
          polynomial_degree: polynomialDegree,
          residual_h_count: residualProfile.length,
          h_count: transportProfile.length,
        },
      ],
      hRowDependencyWitness: {
        witness_kind:
          "candidate-polynomial-h-row-graph-interval-residual-provider",
        xi_interval: noiseInterval,
        polynomial_degree: polynomialDegree,
        residual_kind: "H38-row-interval-minus-polynomial-graph-interval",
        h_count: transportProfile.length,
      },
      hRowProviderClaimBoundary: candidateOnlyHRowProviderClaimBoundary(),
    };
  };
}

function hIntervalsForTerminalSharedResidualAffineZetaEndpointProvider({
  baseHIntervals,
  transportProfile,
  xiInterval,
  residualProfile,
  terminalHIndexes,
  residualNoise,
  preserveH38 = true,
}) {
  const resolvedResidualNoise = Number(residualNoise);
  if (!Number.isFinite(resolvedResidualNoise)) {
    throw new Error("residualNoise must be finite");
  }
  const replay = cloneHIntervals(baseHIntervals);
  const h38Index =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index;
  terminalHIndexes.forEach((hIndex) => {
    if (preserveH38 && hIndex === h38Index) {
      return;
    }
    const graphInterval = polynomialRangeOnInterval({
      coefficients: transportProfile[hIndex].coefficients,
      interval: xiInterval,
    });
    const residualInterval =
      residualProfile?.[hIndex]?.residual_interval_hull ?? [0, 0];
    const residualCenter = intervalMidpoint(residualInterval);
    const residualRadius = intervalWidth(residualInterval) / 2;
    const residualContribution =
      residualCenter + resolvedResidualNoise * residualRadius;
    replay[hIndex] = [
      Number(graphInterval[0]) + residualContribution,
      Number(graphInterval[1]) + residualContribution,
    ];
  });
  return replay;
}

function terminalSharedResidualAffineZetaEndpointHRowProvider({
  targetSpeedInterval,
  transportProfilesByBranch,
  intervalResidualProfilesByBranch,
  terminalHIndexes,
  residualNoise,
  preserveH38 = true,
  providerKind =
    "candidate-terminal-shared-residual-affine-zeta-endpoint-provider",
  providerProvenance =
    "local-H38-terminal-quadratic-graph-affine-zeta-endpoint-replay",
}) {
  return ({ branch, branchRow, cellId, h38Row, replayKind }) => {
    const transportProfile = transportProfilesByBranch[branch];
    const residualProfile = intervalResidualProfilesByBranch[branch];
    if (!transportProfile) {
      throw new Error(
        `missing terminal affine-zeta graph profile for branch ${branch}`
      );
    }
    if (!residualProfile) {
      throw new Error(
        `missing terminal affine-zeta residual profile for branch ${branch}`
      );
    }
    const xiInterval = speedIntervalXiInterval({
      row: h38Row,
      targetSpeedInterval,
    });
    const baseHIntervals = hIntervalsFromBranchRow(branchRow, {
      hCount: transportProfile.length,
    });
    const polynomialDegree = transportProfile[0]?.polynomial_degree ?? null;
    const h38SolveTargetPolicy = preserveH38
      ? "preserved-H39-predecessor-row"
      : "candidate-H38-predecessor-row-affine-zeta-endpoint";
    return {
      branch,
      hIntervals: hIntervalsForTerminalSharedResidualAffineZetaEndpointProvider(
        {
          baseHIntervals,
          transportProfile,
          xiInterval,
          residualProfile,
          terminalHIndexes,
          residualNoise,
          preserveH38,
        }
      ),
      solveSlopeInterval: branchRow.h38_solve_slope_interval,
      providerKind,
      preservesDependencies: true,
      sourceCellId: cellId,
      replayKind:
        replayKind ??
        "h39-terminal-shared-residual-affine-zeta-endpoint-replay",
      hRowProviderProvenance: providerProvenance,
      hRowDependencyTrace: [
        {
          dependency_kind:
            "terminal-shared-residual-affine-zeta-endpoint",
          source: providerProvenance,
          xi_interval: xiInterval,
          residual_noise: Number(residualNoise),
          terminal_h_indexes: terminalHIndexes.map(Number),
          polynomial_degree: polynomialDegree,
          h38_solve_target_policy: h38SolveTargetPolicy,
          h_count: transportProfile.length,
        },
      ],
      hRowDependencyWitness: {
        witness_kind:
          "candidate-terminal-shared-residual-affine-zeta-endpoint-provider",
        xi_interval: xiInterval,
        residual_coordinate:
          "endpoint zeta in h_i(xi,zeta)=q_i(xi)+center_i+zeta*radius_i for terminal h rows",
        residual_noise: Number(residualNoise),
        terminal_h_indexes: terminalHIndexes.map(Number),
        polynomial_degree: polynomialDegree,
        coefficient_order: "ascending powers of xi",
        h38_solve_target_policy: h38SolveTargetPolicy,
        h_count: transportProfile.length,
      },
      hRowProviderClaimBoundary: candidateOnlyHRowProviderClaimBoundary(),
    };
  };
}

function shiftedPressureReplayForPointHRow({
  context,
  cell,
  branch,
  hIntervals,
  solveSlopeInterval,
  outerRadius,
  shiftedIndex,
}) {
  const solve = solveH39CenterCoefficientRow({
    context,
    cell,
    branch,
    hIntervals,
    solveSlopeInterval,
  });
  const decomposition = computeH39ShiftedR43PressureDecompositionCandidate({
    context,
    cell,
    branch,
    hIntervals,
    xInterval: solve.h39_center_numeric_interval,
    solveSlopeInterval,
    outerRadius,
    shiftedOrder: shiftedIndex,
  });
  const rowPressure =
    decomposition.term_pressure_by_coefficient[shiftedIndex];
  const centerEliminatedRowPressure =
    decomposition.center_eliminated_shifted_pressures?.[shiftedIndex] ??
    null;
  return {
    center_interval: solve.h39_center_interval,
    center_numeric_interval: root.formatInterval(
      solve.h39_center_numeric_interval
    ),
    row_pressure: rowPressure,
    pressure: rowPressure.source_pressure_contribution,
    center_eliminated_row_pressure: centerEliminatedRowPressure,
    center_eliminated_pressure:
      centerEliminatedRowPressure?.pressure_contribution ?? null,
    center_elimination_improvement_factor:
      finitePositive(rowPressure.source_pressure_contribution) &&
      finitePositive(centerEliminatedRowPressure?.pressure_contribution)
        ? rowPressure.source_pressure_contribution /
          centerEliminatedRowPressure.pressure_contribution
        : null,
    center_elimination_interval_warning:
      decomposition.center_elimination_interval_warning,
  };
}

function shiftedPressureReplayForAffineGraphInterval({
  context,
  cell,
  branch,
  transportProfile,
  noiseInterval,
  solveSlopeInterval,
  outerRadius,
  shiftedIndex,
}) {
  const hIntervals = hIntervalsForAffineTransportNoiseInterval({
    transportProfile,
    noiseInterval,
  });
  const replay = shiftedPressureReplayForPointHRow({
    context,
    cell,
    branch,
    hIntervals,
    solveSlopeInterval,
    outerRadius,
    shiftedIndex,
  });
  return {
    noise_interval: noiseInterval,
    center_interval: replay.center_interval,
    center_numeric_interval: replay.center_numeric_interval,
    row_pressure: replay.row_pressure,
    pressure: replay.pressure,
    h0_interval: hIntervals[0],
    h38_interval: hIntervals[38],
  };
}

function shiftedPressureReplayForPolynomialGraphInterval({
  context,
  cell,
  branch,
  transportProfile,
  noiseInterval,
  solveSlopeInterval,
  outerRadius,
  shiftedIndex,
}) {
  const hIntervals = hIntervalsForPolynomialGraphInterval({
    transportProfile,
    noiseInterval,
  });
  const replay = shiftedPressureReplayForPointHRow({
    context,
    cell,
    branch,
    hIntervals,
    solveSlopeInterval,
    outerRadius,
    shiftedIndex,
  });
  return {
    noise_interval: noiseInterval,
    center_interval: replay.center_interval,
    center_numeric_interval: replay.center_numeric_interval,
    row_pressure: replay.row_pressure,
    pressure: replay.pressure,
    h0_interval: hIntervals[0],
    h38_interval: hIntervals[38],
  };
}

function affineGraphProducerResidualDiagnostic({
  context,
  coarseRow,
  targetSpeedInterval,
  rows,
  branch,
  transportProfile,
  solveSlopeInterval,
  outerRadius,
  shiftedIndex,
  xiDomain,
}) {
  const residualProfile = Array.from({ length: transportProfile.length }, (_, hIndex) => ({
    h_index: hIndex,
    max_abs_residual: 0,
    max_relative_to_direction_abs: 0,
    worst_row: null,
  }));
  rows.forEach((row) => {
    const xiCoordinate = speedMidpointXiCoordinate({
      row,
      targetSpeedInterval,
    });
    const branchRow = branchRowFor(row, branch);
    const hMidpoints = hIntervalsFromBranchRow(branchRow, {
      hCount: transportProfile.length,
    }).map(intervalMidpoint);
    hMidpoints.forEach((actual, hIndex) => {
      const profile = transportProfile[hIndex];
      const predicted =
        profile.center_coefficient_c_i +
        xiCoordinate * profile.direction_coefficient_d_i;
      const absResidual = Math.abs(actual - predicted);
      const relativeResidual =
        absResidual / Math.max(Math.abs(profile.direction_coefficient_d_i), 1);
      if (absResidual > residualProfile[hIndex].max_abs_residual) {
        residualProfile[hIndex] = {
          h_index: hIndex,
          max_abs_residual: absResidual,
          max_relative_to_direction_abs: relativeResidual,
          worst_row: {
            cell_id: row.cell_id,
            speed_interval: row.speed_interval,
            xi_coordinate: xiCoordinate,
            actual_h_midpoint: actual,
            affine_graph_prediction: predicted,
          },
        };
      }
    });
  });
  const worstResidual = residualProfile.reduce((best, residual) =>
    Number(residual.max_abs_residual) >
    Number(best?.max_abs_residual ?? -1)
      ? residual
      : best,
  null);
  const worstRelativeResidual = residualProfile.reduce((best, residual) =>
    Number(residual.max_relative_to_direction_abs) >
    Number(best?.max_relative_to_direction_abs ?? -1)
      ? residual
      : best,
  null);
  const hIntervals = hIntervalsForAffineGraphPlusResidual({
    transportProfile,
    noiseInterval: xiDomain,
    residualProfile,
  });
  const replay = shiftedPressureReplayForPointHRow({
    context,
    cell: cellFromCertificateRow(coarseRow),
    branch,
    hIntervals,
    solveSlopeInterval,
    outerRadius,
    shiftedIndex,
  });
  return {
    residual_row_count: rows.length,
    residual_source_subcell_count: rows.length,
    xi_coordinate_rule:
      "xi=4*((speed_midpoint-target_left)/(target_right-target_left))-2",
    xi_domain: xiDomain,
    residual_profile: residualProfile,
    worst_abs_residual: worstResidual,
    worst_relative_residual: worstRelativeResidual,
    max_abs_residual: worstResidual?.max_abs_residual ?? null,
    max_relative_to_direction_abs:
      worstRelativeResidual?.max_relative_to_direction_abs ?? null,
    graph_plus_residual_replay: {
      center_interval: replay.center_interval,
      center_numeric_interval: replay.center_numeric_interval,
      row_pressure: replay.row_pressure,
      pressure: replay.pressure,
      h0_interval: hIntervals[0],
      h38_interval: hIntervals[38],
    },
    graph_plus_residual_pressure: replay.pressure,
  };
}

function polynomialGraphProducerResidualDiagnostic({
  context,
  coarseRow,
  targetSpeedInterval,
  rows,
  branch,
  transportProfile,
  solveSlopeInterval,
  outerRadius,
  shiftedIndex,
  xiDomain,
}) {
  const residualProfile = Array.from({ length: transportProfile.length }, (_, hIndex) => ({
    h_index: hIndex,
    max_abs_residual: 0,
    max_relative_to_graph_range_abs: 0,
    worst_row: null,
  }));
  rows.forEach((row) => {
    const xiCoordinate = speedMidpointXiCoordinate({
      row,
      targetSpeedInterval,
    });
    const branchRow = branchRowFor(row, branch);
    const hMidpoints = hIntervalsFromBranchRow(branchRow, {
      hCount: transportProfile.length,
    }).map(intervalMidpoint);
    hMidpoints.forEach((actual, hIndex) => {
      const profile = transportProfile[hIndex];
      const predicted = polynomialValue(profile.coefficients, xiCoordinate);
      const absResidual = Math.abs(actual - predicted);
      const graphRange = polynomialRangeOnInterval({
        coefficients: profile.coefficients,
        interval: xiDomain,
      });
      const relativeResidual =
        absResidual / Math.max(intervalAbsUpper(graphRange), 1);
      if (absResidual > residualProfile[hIndex].max_abs_residual) {
        residualProfile[hIndex] = {
          h_index: hIndex,
          max_abs_residual: absResidual,
          max_relative_to_graph_range_abs: relativeResidual,
          worst_row: {
            cell_id: row.cell_id,
            speed_interval: row.speed_interval,
            xi_coordinate: xiCoordinate,
            actual_h_midpoint: actual,
            polynomial_graph_prediction: predicted,
          },
        };
      }
    });
  });
  const worstResidual = residualProfile.reduce((best, residual) =>
    Number(residual.max_abs_residual) >
    Number(best?.max_abs_residual ?? -1)
      ? residual
      : best,
  null);
  const worstRelativeResidual = residualProfile.reduce((best, residual) =>
    Number(residual.max_relative_to_graph_range_abs) >
    Number(best?.max_relative_to_graph_range_abs ?? -1)
      ? residual
      : best,
  null);
  const hIntervals = hIntervalsForPolynomialGraphPlusResidual({
    transportProfile,
    noiseInterval: xiDomain,
    residualProfile,
  });
  const replay = shiftedPressureReplayForPointHRow({
    context,
    cell: cellFromCertificateRow(coarseRow),
    branch,
    hIntervals,
    solveSlopeInterval,
    outerRadius,
    shiftedIndex,
  });
  return {
    residual_row_count: rows.length,
    residual_source_subcell_count: rows.length,
    xi_coordinate_rule:
      "xi=4*((speed_midpoint-target_left)/(target_right-target_left))-2",
    xi_domain: xiDomain,
    residual_profile: residualProfile,
    worst_abs_residual: worstResidual,
    worst_relative_residual: worstRelativeResidual,
    max_abs_residual: worstResidual?.max_abs_residual ?? null,
    max_relative_to_graph_range_abs:
      worstRelativeResidual?.max_relative_to_graph_range_abs ?? null,
    graph_plus_residual_replay: {
      center_interval: replay.center_interval,
      center_numeric_interval: replay.center_numeric_interval,
      row_pressure: replay.row_pressure,
      pressure: replay.pressure,
      h0_interval: hIntervals[0],
      h38_interval: hIntervals[38],
    },
    graph_plus_residual_pressure: replay.pressure,
  };
}

function polynomialGraphProducerIntervalResidualProfileForRows({
  targetSpeedInterval,
  rows,
  branch,
  transportProfile,
}) {
  const residualSamplesByHIndex = Array.from(
    { length: transportProfile.length },
    () => []
  );
  rows.forEach((row) => {
    const xiInterval = speedIntervalXiInterval({
      row,
      targetSpeedInterval,
    });
    const branchRow = branchRowFor(row, branch);
    const hIntervals = hIntervalsFromBranchRow(branchRow, {
      hCount: transportProfile.length,
    });
    hIntervals.forEach((hInterval, hIndex) => {
      const profile = transportProfile[hIndex];
      const graphInterval = polynomialRangeOnInterval({
        coefficients: profile.coefficients,
        interval: xiInterval,
      });
      const residualInterval = [
        Number(hInterval[0]) - Number(graphInterval[1]),
        Number(hInterval[1]) - Number(graphInterval[0]),
      ];
      residualSamplesByHIndex[hIndex].push({
        cell_id: row.cell_id,
        speed_interval: row.speed_interval,
        xi_interval: xiInterval,
        h_interval: hInterval,
        polynomial_graph_interval: graphInterval,
        residual_interval: residualInterval,
        residual_abs_upper: intervalAbsUpper(residualInterval),
        residual_width: intervalWidth(residualInterval),
        h_interval_width: intervalWidth(hInterval),
        graph_interval_width: intervalWidth(graphInterval),
      });
    });
  });
  return residualSamplesByHIndex.map((samples, hIndex) => {
    const residualIntervalHull = intervalHull(
      samples.map((sample) => sample.residual_interval)
    );
    const worstSample = samples.reduce(
      (best, sample) =>
        Number(sample.residual_abs_upper) >
        Number(best?.residual_abs_upper ?? -1)
          ? sample
          : best,
      null
    );
    return {
      h_index: hIndex,
      residual_interval_hull: residualIntervalHull,
      max_abs_residual: intervalAbsUpper(residualIntervalHull),
      max_sample_abs_residual: worstSample?.residual_abs_upper ?? null,
      max_residual_width: Math.max(
        ...samples.map((sample) => sample.residual_width)
      ),
      max_h_interval_width: Math.max(
        ...samples.map((sample) => sample.h_interval_width)
      ),
      max_graph_interval_width: Math.max(
        ...samples.map((sample) => sample.graph_interval_width)
      ),
      worst_row: worstSample,
    };
  });
}

function polynomialGraphProducerIntervalResidualDiagnostic({
  context,
  coarseRow,
  targetSpeedInterval,
  rows,
  branch,
  transportProfile,
  solveSlopeInterval,
  outerRadius,
  shiftedIndex,
  xiDomain,
}) {
  const residualProfile = polynomialGraphProducerIntervalResidualProfileForRows({
    targetSpeedInterval,
    rows,
    branch,
    transportProfile,
  });
  const worstResidual = residualProfile.reduce((best, residual) =>
    Number(residual.max_abs_residual) >
    Number(best?.max_abs_residual ?? -1)
      ? residual
      : best,
  null);
  const worstWidthResidual = residualProfile.reduce((best, residual) =>
    Number(residual.max_residual_width) >
    Number(best?.max_residual_width ?? -1)
      ? residual
      : best,
  null);
  const hIntervals = hIntervalsForPolynomialGraphPlusIntervalResidual({
    transportProfile,
    noiseInterval: xiDomain,
    residualProfile,
  });
  const replay = shiftedPressureReplayForPointHRow({
    context,
    cell: cellFromCertificateRow(coarseRow),
    branch,
    hIntervals,
    solveSlopeInterval,
    outerRadius,
    shiftedIndex,
  });
  return {
    residual_row_count: rows.length,
    residual_source_subcell_count: rows.length,
    xi_coordinate_rule:
      "xi=4*((speed-target_left)/(target_right-target_left))-2",
    xi_domain: xiDomain,
    residual_source:
      "H38-producer-row-intervals-minus-quadratic-graph-intervals",
    residual_profile: residualProfile,
    worst_abs_residual: worstResidual,
    worst_width_residual: worstWidthResidual,
    max_abs_residual: worstResidual?.max_abs_residual ?? null,
    max_residual_width: worstWidthResidual?.max_residual_width ?? null,
    graph_plus_interval_residual_replay: {
      center_interval: replay.center_interval,
      center_numeric_interval: replay.center_numeric_interval,
      row_pressure: replay.row_pressure,
      pressure: replay.pressure,
      h0_interval: hIntervals[0],
      h38_interval: hIntervals[38],
    },
    graph_plus_interval_residual_pressure: replay.pressure,
  };
}

function solveResidualIntervalForGraph({ solveInterval, graphInterval }) {
  return [
    Number(solveInterval[0]) - Number(graphInterval[1]),
    Number(solveInterval[1]) - Number(graphInterval[0]),
  ];
}

function h38SolveWidthFactorizationProfileForRows({
  targetSpeedInterval,
  rows,
  branch,
  transportProfile,
}) {
  const h38Profile = transportProfile[38];
  const samples = rows.map((row) => {
    const xiInterval = speedIntervalXiInterval({
      row,
      targetSpeedInterval,
    });
    const graphInterval = polynomialRangeOnInterval({
      coefficients: h38Profile.coefficients,
      interval: xiInterval,
    });
    const branchRow = branchRowFor(row, branch);
    const numeratorInterval = numericInterval(
      "h38_residual_before_solve",
      branchRow.h38_residual_before_solve
    );
    const slopeInterval = numericInterval(
      "h38_solve_slope_interval",
      branchRow.h38_solve_slope_interval
    );
    const exportedSolveInterval = numericInterval(
      "h38_interval",
      branchRow.h38_interval
    );
    const numeratorMidpoint = intervalMidpoint(numeratorInterval);
    const slopeMidpoint = intervalMidpoint(slopeInterval);
    const fullSolveInterval = root.divideIntervals(
      root.scaleInterval(numeratorInterval, -1),
      slopeInterval
    );
    const numeratorOnlySolveInterval = root.divideIntervals(
      root.scaleInterval(numeratorInterval, -1),
      pointInterval(slopeMidpoint)
    );
    const slopeOnlySolveInterval = root.divideIntervals(
      pointInterval(-numeratorMidpoint),
      slopeInterval
    );
    const midpointSolveInterval = pointInterval(
      -numeratorMidpoint / slopeMidpoint
    );
    return {
      cell_id: row.cell_id,
      speed_interval: row.speed_interval,
      xi_interval: xiInterval,
      h38_solve_numerator_interval: numeratorInterval,
      h38_solve_slope_interval: slopeInterval,
      h38_exported_interval: exportedSolveInterval,
      h38_independent_ratio_interval: fullSolveInterval,
      h38_slope_midpoint_ratio_interval: numeratorOnlySolveInterval,
      h38_numerator_midpoint_ratio_interval: slopeOnlySolveInterval,
      h38_both_midpoint_ratio_point: midpointSolveInterval,
      numerator_interval: numeratorInterval,
      slope_interval: slopeInterval,
      numerator_midpoint: numeratorMidpoint,
      slope_midpoint: slopeMidpoint,
      polynomial_graph_interval: graphInterval,
      exported_solve_interval: exportedSolveInterval,
      reconstructed_full_solve_interval: fullSolveInterval,
      numerator_only_solve_interval: numeratorOnlySolveInterval,
      slope_only_solve_interval: slopeOnlySolveInterval,
      midpoint_solve_interval: midpointSolveInterval,
      exported_solve_width: intervalWidth(exportedSolveInterval),
      reconstructed_full_solve_width: intervalWidth(fullSolveInterval),
      numerator_only_solve_width: intervalWidth(numeratorOnlySolveInterval),
      slope_only_solve_width: intervalWidth(slopeOnlySolveInterval),
      graph_interval_width: intervalWidth(graphInterval),
      full_residual_interval: solveResidualIntervalForGraph({
        solveInterval: fullSolveInterval,
        graphInterval,
      }),
      numerator_only_residual_interval: solveResidualIntervalForGraph({
        solveInterval: numeratorOnlySolveInterval,
        graphInterval,
      }),
      slope_only_residual_interval: solveResidualIntervalForGraph({
        solveInterval: slopeOnlySolveInterval,
        graphInterval,
      }),
      midpoint_residual_interval: solveResidualIntervalForGraph({
        solveInterval: midpointSolveInterval,
        graphInterval,
      }),
    };
  });
  const intervalHullForKey = (key) =>
    intervalHull(samples.map((sample) => sample[key]));
  const maxWidthForKey = (key) =>
    Math.max(...samples.map((sample) => Number(sample[key])));
  const residualIntervalHulls = {
    full_solve: intervalHullForKey("full_residual_interval"),
    numerator_only: intervalHullForKey("numerator_only_residual_interval"),
    slope_only: intervalHullForKey("slope_only_residual_interval"),
    midpoint_solve: intervalHullForKey("midpoint_residual_interval"),
  };
  const maxSolveWidths = {
    exported_solve: maxWidthForKey("exported_solve_width"),
    reconstructed_full_solve: maxWidthForKey(
      "reconstructed_full_solve_width"
    ),
    numerator_only: maxWidthForKey("numerator_only_solve_width"),
    slope_only: maxWidthForKey("slope_only_solve_width"),
    graph_interval: maxWidthForKey("graph_interval_width"),
  };
  const fullWidth = maxSolveWidths.reconstructed_full_solve;
  const numeratorRatio =
    finitePositive(fullWidth) ? maxSolveWidths.numerator_only / fullWidth : null;
  const slopeRatio =
    finitePositive(fullWidth) ? maxSolveWidths.slope_only / fullWidth : null;
  const dominantSolveWidthSource =
    finitePositive(numeratorRatio) &&
    finitePositive(slopeRatio) &&
    numeratorRatio > 0.9 &&
    numeratorRatio > 5 * slopeRatio
      ? "h38-recurrence-numerator-width"
      : finitePositive(numeratorRatio) &&
          finitePositive(slopeRatio) &&
          slopeRatio > 0.9 &&
          slopeRatio > 5 * numeratorRatio
        ? "inherited-solve-slope-width"
        : "mixed-numerator-slope-width";
  return {
    h_index: 38,
    sample_count: samples.length,
    samples,
    residual_interval_hulls: residualIntervalHulls,
    residual_interval_hull_widths: Object.fromEntries(
      Object.entries(residualIntervalHulls).map(([key, interval]) => [
        key,
        intervalWidth(interval),
      ])
    ),
    max_solve_widths: maxSolveWidths,
    numerator_only_to_full_solve_width_ratio: numeratorRatio,
    slope_only_to_full_solve_width_ratio: slopeRatio,
    graph_interval_to_full_solve_width_ratio:
      finitePositive(fullWidth)
        ? maxSolveWidths.graph_interval / fullWidth
        : null,
    dominant_solve_width_source: dominantSolveWidthSource,
  };
}

function n38ExpressionTermEntries(decomposed) {
  return Object.entries(decomposed.terms).map(([term, series]) => {
    const coefficient = series[H38_NUMERATOR_Y_ORDER];
    return {
      term,
      coefficient,
      coefficient_midpoint: intervalMidpoint(coefficient),
      coefficient_width: intervalWidth(coefficient),
      coefficient_abs_upper: intervalAbsUpper(coefficient),
    };
  });
}

function n38ExpressionDecompositionForRow({
  row,
  targetSpeedInterval,
  branch,
}) {
  const branchRow = branchRowFor(row, branch);
  const hIntervals = hIntervalsFromBranchRow(branchRow, { hCount: 39 });
  const cell = cellFromCertificateRow(row);
  const expression = evaluateH38RecurrenceNumeratorBeforeSolve({
    cell,
    branch,
    branchSign: root.branchSign(branch),
    hIntervals,
    includeTermDecomposition: true,
  });
  const midpointExpression = evaluateH38RecurrenceNumeratorBeforeSolve({
    cell: pointCellAtMidpoint(cell),
    branch,
    branchSign: root.branchSign(branch),
    hIntervals: hIntervals.map((interval) =>
      pointInterval(intervalMidpoint(interval))
    ),
    includeTermDecomposition: true,
  });
  const directInterval = expression.numerator_interval;
  const exportedInterval = numericInterval(
    "h38_residual_before_solve",
    branchRow.h38_residual_before_solve
  );
  const termEntries = n38ExpressionTermEntries({
    terms: expression.term_decomposition,
  });
  const midpointTermEntries = n38ExpressionTermEntries({
    terms: midpointExpression.term_decomposition,
  });
  const midpointDirectInterval = midpointExpression.numerator_interval;
  const dominantWidthTerm = termEntries.reduce((best, entry) =>
    Number(entry.coefficient_width) > Number(best?.coefficient_width ?? -1)
      ? entry
      : best,
  null);
  const termWidthSum = termEntries.reduce(
    (total, entry) => total + Number(entry.coefficient_width),
    0
  );
  const termAbsUpperSum = termEntries.reduce(
    (total, entry) => total + Number(entry.coefficient_abs_upper),
    0
  );
  const midpointTermWidthSum = midpointTermEntries.reduce(
    (total, entry) => total + Number(entry.coefficient_width),
    0
  );
  const maxMidpointExpressionTermWidth = Math.max(
    ...midpointTermEntries.map((entry) => Number(entry.coefficient_width))
  );
  const directExportEndpointGap = intervalEndpointMaxGap(
    directInterval,
    exportedInterval
  );
  const directExportRelativeGap = intervalEndpointRelativeGap(
    directInterval,
    exportedInterval
  );
  return {
    cell_id: row.cell_id,
    speed_interval: row.speed_interval,
    xi_interval: speedIntervalXiInterval({ row, targetSpeedInterval }),
    source_y_order: H38_NUMERATOR_Y_ORDER,
    direct_n38_expression_interval: directInterval,
    exported_h38_residual_before_solve_interval: exportedInterval,
    direct_export_endpoint_gap: directExportEndpointGap,
    direct_export_relative_gap: directExportRelativeGap,
    direct_matches_exported_residual:
      directExportRelativeGap <= 1e-10 || directExportEndpointGap === 0,
    direct_n38_expression_midpoint: intervalMidpoint(directInterval),
    direct_n38_expression_width: intervalWidth(directInterval),
    direct_n38_expression_abs_upper: intervalAbsUpper(directInterval),
    midpoint_n38_expression_interval: midpointDirectInterval,
    midpoint_n38_expression_midpoint: intervalMidpoint(midpointDirectInterval),
    midpoint_n38_expression_width: intervalWidth(midpointDirectInterval),
    expression_terms: termEntries,
    midpoint_expression_terms: midpointTermEntries,
    dominant_expression_term_by_width: dominantWidthTerm?.term ?? null,
    dominant_expression_term_width: dominantWidthTerm?.coefficient_width ?? null,
    term_width_sum: termWidthSum,
    term_abs_upper_sum: termAbsUpperSum,
    midpoint_term_width_sum: midpointTermWidthSum,
    max_midpoint_expression_term_width: maxMidpointExpressionTermWidth,
    source_width_to_term_width_sum_ratio:
      finitePositive(termWidthSum)
        ? intervalWidth(directInterval) / termWidthSum
        : null,
    source_abs_upper_to_term_abs_upper_sum_ratio:
      finitePositive(termAbsUpperSum)
        ? intervalAbsUpper(directInterval) / termAbsUpperSum
        : null,
    source_width_to_midpoint_term_width_sum_ratio:
      finitePositive(midpointTermWidthSum)
        ? intervalWidth(directInterval) / midpointTermWidthSum
        : null,
    source_width_to_max_midpoint_term_width_ratio:
      finitePositive(maxMidpointExpressionTermWidth)
        ? intervalWidth(directInterval) / maxMidpointExpressionTermWidth
        : null,
  };
}

function n38ExpressionSubcellSummary({
  rows,
  targetSpeedInterval,
  branch,
  subcellCount,
}) {
  const rowDiagnostics = rows.map((row) =>
    n38ExpressionDecompositionForRow({
      row,
      targetSpeedInterval,
      branch,
    })
  );
  const maxByKey = (key) =>
    rowDiagnostics.reduce(
      (best, row) => (Number(row[key]) > Number(best?.[key] ?? -1) ? row : best),
      null
    );
  const maxWidthRow = maxByKey("direct_n38_expression_width");
  const maxAbsRow = maxByKey("direct_n38_expression_abs_upper");
  const maxGapRow = maxByKey("direct_export_relative_gap");
  const maxMidpointTermWidthRow = maxByKey("max_midpoint_expression_term_width");
  const termWidthRows = rowDiagnostics.flatMap((row) =>
    row.expression_terms.map((term) => ({
      cell_id: row.cell_id,
      term: term.term,
      coefficient_width: term.coefficient_width,
      coefficient_abs_upper: term.coefficient_abs_upper,
    }))
  );
  const dominantTerm = termWidthRows.reduce((best, entry) =>
    Number(entry.coefficient_width) > Number(best?.coefficient_width ?? -1)
      ? entry
      : best,
  null);
  return {
    residual_subcell_count: subcellCount,
    row_count: rows.length,
    row_diagnostics: rowDiagnostics,
    max_direct_n38_expression_width:
      maxWidthRow?.direct_n38_expression_width ?? null,
    max_direct_n38_expression_abs_upper:
      maxAbsRow?.direct_n38_expression_abs_upper ?? null,
    max_direct_export_relative_gap:
      maxGapRow?.direct_export_relative_gap ?? null,
    max_midpoint_expression_term_width:
      maxMidpointTermWidthRow?.max_midpoint_expression_term_width ?? null,
    direct_width_to_midpoint_term_width_ratio:
      finitePositive(maxWidthRow?.direct_n38_expression_width) &&
      finitePositive(maxMidpointTermWidthRow?.max_midpoint_expression_term_width)
        ? Number(maxWidthRow.direct_n38_expression_width) /
          Number(maxMidpointTermWidthRow.max_midpoint_expression_term_width)
        : null,
    all_direct_recomputations_match_exported_residual: rowDiagnostics.every(
      (row) => row.direct_matches_exported_residual
    ),
    dominant_expression_term_by_width: dominantTerm?.term ?? null,
    dominant_expression_term_width: dominantTerm?.coefficient_width ?? null,
    dominant_expression_term_abs_upper:
      dominantTerm?.coefficient_abs_upper ?? null,
    worst_width_row: maxWidthRow,
    worst_export_gap_row: maxGapRow,
  };
}

function n38ExpressionTaylorFitSamplesFromSummary(summary) {
  return summary.row_diagnostics.map((row) => ({
    cell_id: row.cell_id,
    speed_interval: row.speed_interval,
    xi_interval: row.xi_interval,
    xi_midpoint: intervalMidpoint(row.xi_interval),
    midpoint_n38_expression_midpoint: row.midpoint_n38_expression_midpoint,
    midpoint_n38_expression_width: row.midpoint_n38_expression_width,
    term_midpoints: Object.fromEntries(
      row.midpoint_expression_terms.map((term) => [
        term.term,
        term.coefficient_midpoint,
      ])
    ),
    term_widths: Object.fromEntries(
      row.midpoint_expression_terms.map((term) => [
        term.term,
        term.coefficient_width,
      ])
    ),
  }));
}

function n38ExpressionTaylorComponentValue(sample, component) {
  if (component === "direct_n38_expression") {
    return sample.midpoint_n38_expression_midpoint;
  }
  if (Object.hasOwn(sample.term_midpoints, component)) {
    return sample.term_midpoints[component];
  }
  throw new Error(`unknown N38 expression Taylor component ${component}`);
}

function n38ExpressionTermWidthShares(row) {
  const totalWidth = Number(row.term_width_sum);
  return row.expression_terms
    .map((term) => ({
      term: term.term,
      coefficient_width: term.coefficient_width,
      coefficient_abs_upper: term.coefficient_abs_upper,
      width_share: finitePositive(totalWidth)
        ? Number(term.coefficient_width) / totalWidth
        : null,
    }))
    .sort(
      (left, right) =>
        Number(right.coefficient_width) - Number(left.coefficient_width)
    );
}

function estimatedUniformSubcellCountForPointScale({
  baselineSubcellCount,
  requiredWidthShrinkFactor,
  observedScalingExponent,
}) {
  if (
    !finitePositive(baselineSubcellCount) ||
    !finitePositive(requiredWidthShrinkFactor) ||
    !finitePositive(observedScalingExponent)
  ) {
    return null;
  }
  const estimate =
    Number(baselineSubcellCount) *
    Math.pow(
      Number(requiredWidthShrinkFactor),
      1 / Number(observedScalingExponent)
    );
  return Number.isFinite(estimate) ? Math.ceil(estimate) : null;
}

function estimatedTaylorPartitionCountForPointScale({
  residualToPointWidthRatio,
  degree,
}) {
  if (!finiteNonnegative(residualToPointWidthRatio)) {
    return null;
  }
  if (Number(residualToPointWidthRatio) <= 1) {
    return 1;
  }
  if (!finitePositive(degree)) {
    return null;
  }
  const estimate = Math.pow(
    Number(residualToPointWidthRatio),
    1 / (Number(degree) + 1)
  );
  return Number.isFinite(estimate) ? Math.ceil(estimate) : null;
}

function n38ExpressionTaylorFitDiagnosticForComponent({
  component,
  samples,
  degrees,
  referenceRawWidth,
  referencePointWidth,
}) {
  const values = samples.map((sample) =>
    n38ExpressionTaylorComponentValue(sample, component)
  );
  const valueRange = Math.max(...values) - Math.min(...values);
  const fitByDegree = degrees.map((degree) => {
    const points = samples.map((sample) => ({
      x: sample.xi_midpoint,
      y: n38ExpressionTaylorComponentValue(sample, component),
    }));
    const coefficients = fitPolynomialLeastSquares(points, degree);
    const residuals = points.map((point, index) => {
      const predicted = polynomialValue(coefficients, point.x);
      const residual = point.y - predicted;
      return {
        cell_id: samples[index].cell_id,
        xi_midpoint: point.x,
        actual_midpoint_value: point.y,
        polynomial_prediction: predicted,
        midpoint_residual: residual,
        abs_midpoint_residual: Math.abs(residual),
      };
    });
    const maxAbsResidual = Math.max(
      ...residuals.map((residual) => residual.abs_midpoint_residual)
    );
    const rmsAbsResidual = Math.sqrt(
      residuals.reduce(
        (total, residual) =>
          total + residual.abs_midpoint_residual * residual.abs_midpoint_residual,
        0
      ) / residuals.length
    );
    return {
      polynomial_degree: degree,
      coefficients,
      coefficient_order: "ascending powers of xi",
      max_abs_midpoint_residual: maxAbsResidual,
      rms_abs_midpoint_residual: rmsAbsResidual,
      residual_to_raw_width_ratio: finitePositive(referenceRawWidth)
        ? maxAbsResidual / Number(referenceRawWidth)
        : null,
      residual_to_point_width_ratio: finitePositive(referencePointWidth)
        ? maxAbsResidual / Number(referencePointWidth)
        : null,
      residual_to_component_value_range_ratio: finitePositive(valueRange)
        ? maxAbsResidual / valueRange
        : null,
      estimated_taylor_partition_count_to_point_scale:
        estimatedTaylorPartitionCountForPointScale({
          residualToPointWidthRatio: finitePositive(referencePointWidth)
            ? maxAbsResidual / Number(referencePointWidth)
            : null,
          degree,
        }),
      residuals,
    };
  });
  const bestByMaxResidual = fitByDegree.reduce((best, candidate) =>
    Number(candidate.max_abs_midpoint_residual) <
    Number(best?.max_abs_midpoint_residual ?? Number.POSITIVE_INFINITY)
      ? candidate
      : best,
  null);
  return {
    component,
    sample_count: samples.length,
    xi_midpoint_interval: [
      Math.min(...samples.map((sample) => sample.xi_midpoint)),
      Math.max(...samples.map((sample) => sample.xi_midpoint)),
    ],
    midpoint_value_range: valueRange,
    polynomial_fit_by_degree: fitByDegree,
    best_degree_by_max_abs_residual: bestByMaxResidual?.polynomial_degree ?? null,
    best_max_abs_midpoint_residual:
      bestByMaxResidual?.max_abs_midpoint_residual ?? null,
    best_residual_to_raw_width_ratio:
      bestByMaxResidual?.residual_to_raw_width_ratio ?? null,
    best_residual_to_point_width_ratio:
      bestByMaxResidual?.residual_to_point_width_ratio ?? null,
    best_estimated_taylor_partition_count_to_point_scale:
      bestByMaxResidual?.estimated_taylor_partition_count_to_point_scale ?? null,
  };
}

function n38ExpressionTaylorFitRecordForDegree(componentDiagnostic, degree) {
  return componentDiagnostic.polynomial_fit_by_degree.find(
    (fit) => fit.polynomial_degree === degree
  );
}

function n38ExpressionTaylorPrototypeTileRows({
  xiDomainInterval,
  tileCount,
  polynomialDegree,
  inflatedPrototypeRemainderUpper,
  pointTermWidthScale,
}) {
  const [left, right] = xiDomainInterval;
  const tileWidth = (right - left) / tileCount;
  const normalizedRadius = 1 / tileCount;
  return Array.from({ length: tileCount }, (_, tileIndex) => {
    const tileLeft = left + tileIndex * tileWidth;
    const tileRight = tileLeft + tileWidth;
    const remainderToPointScale = finitePositive(pointTermWidthScale)
      ? inflatedPrototypeRemainderUpper / pointTermWidthScale
      : null;
    return {
      tile_index: tileIndex,
      xi_interval: [tileLeft, tileRight],
      xi_center: (tileLeft + tileRight) / 2,
      xi_half_width: tileWidth / 2,
      normalized_radius_against_parent: normalizedRadius,
      polynomial_degree: polynomialDegree,
      prototype_remainder_upper: inflatedPrototypeRemainderUpper,
      prototype_remainder_to_point_width_ratio: remainderToPointScale,
      passes_point_width_scale: Number(remainderToPointScale) <= 1,
    };
  });
}

function n38ExpressionTaylorEnclosurePrototypeForComponent({
  componentDiagnostic,
  xiDomainInterval,
  pointTermWidthScale,
  baselineRawExpressionWidth,
  remainderInflationFactor,
}) {
  const polynomialDegree = componentDiagnostic.best_degree_by_max_abs_residual;
  const bestFit = n38ExpressionTaylorFitRecordForDegree(
    componentDiagnostic,
    polynomialDegree
  );
  const tileCount =
    componentDiagnostic.best_estimated_taylor_partition_count_to_point_scale;
  const normalizedRadius = 1 / tileCount;
  const prototypeRemainderUpper =
    Number(bestFit.max_abs_midpoint_residual) *
    Math.pow(normalizedRadius, polynomialDegree + 1);
  const inflatedPrototypeRemainderUpper =
    prototypeRemainderUpper * remainderInflationFactor;
  const tileRows = n38ExpressionTaylorPrototypeTileRows({
    xiDomainInterval,
    tileCount,
    polynomialDegree,
    inflatedPrototypeRemainderUpper,
    pointTermWidthScale,
  });
  const maxPrototypeRemainderToPointScale = Math.max(
    ...tileRows.map((row) =>
      Number(row.prototype_remainder_to_point_width_ratio)
    )
  );
  return {
    component: componentDiagnostic.component,
    polynomial_degree: polynomialDegree,
    tile_count: tileCount,
    xi_domain_interval: xiDomainInterval,
    parent_fit_max_abs_midpoint_residual: bestFit.max_abs_midpoint_residual,
    parent_fit_rms_abs_midpoint_residual: bestFit.rms_abs_midpoint_residual,
    parent_fit_residual_to_raw_width_ratio:
      bestFit.residual_to_raw_width_ratio,
    parent_fit_residual_to_point_width_ratio:
      bestFit.residual_to_point_width_ratio,
    local_taylor_order: polynomialDegree + 1,
    normalized_tile_radius_against_parent: normalizedRadius,
    prototype_remainder_upper: prototypeRemainderUpper,
    remainder_inflation_factor: remainderInflationFactor,
    inflated_prototype_remainder_upper: inflatedPrototypeRemainderUpper,
    inflated_prototype_remainder_to_point_width_ratio:
      finitePositive(pointTermWidthScale)
        ? inflatedPrototypeRemainderUpper / pointTermWidthScale
        : null,
    inflated_prototype_remainder_to_raw_width_ratio:
      finitePositive(baselineRawExpressionWidth)
        ? inflatedPrototypeRemainderUpper / baselineRawExpressionWidth
        : null,
    residual_reduction_factor_against_parent_fit:
      finitePositive(inflatedPrototypeRemainderUpper)
        ? Number(bestFit.max_abs_midpoint_residual) /
          inflatedPrototypeRemainderUpper
        : null,
    max_tile_remainder_to_point_width_ratio:
      maxPrototypeRemainderToPointScale,
    all_tiles_pass_point_width_scale: tileRows.every(
      (row) => row.passes_point_width_scale
    ),
    prototype_tile_rows: tileRows,
  };
}

function fourthDerivativeUpperForTaylorRemainder({
  remainderUpper,
  xiHalfWidth,
}) {
  if (!finiteNonnegative(remainderUpper) || !finitePositive(xiHalfWidth)) {
    return null;
  }
  return (24 * Number(remainderUpper)) / Math.pow(Number(xiHalfWidth), 4);
}

function taylorRemainderUpperFromFourthDerivative({
  fourthDerivativeUpper,
  xiHalfWidth,
}) {
  if (
    !finiteNonnegative(fourthDerivativeUpper) ||
    !finitePositive(xiHalfWidth)
  ) {
    return null;
  }
  return (Number(fourthDerivativeUpper) * Math.pow(Number(xiHalfWidth), 4)) / 24;
}

function fourthDerivativeEstimateFromFourthDividedDifference(xs, values) {
  const coefficients = values.map(Number);
  for (let order = 1; order < xs.length; order += 1) {
    for (let index = xs.length - 1; index >= order; index -= 1) {
      const denominator = Number(xs[index]) - Number(xs[index - order]);
      if (!finitePositive(Math.abs(denominator))) {
        return null;
      }
      coefficients[index] =
        (coefficients[index] - coefficients[index - 1]) / denominator;
    }
  }
  const fourthDividedDifference = coefficients[xs.length - 1];
  return Number.isFinite(fourthDividedDifference)
    ? 24 * Math.abs(fourthDividedDifference)
    : null;
}

function n38ExpressionTaylorDerivativeBoundPrototypeForComponent({
  componentPrototype,
  pointTermWidthScale,
}) {
  const parentXiHalfWidth =
    intervalWidth(componentPrototype.xi_domain_interval) / 2;
  const parentResidualUpper =
    Number(componentPrototype.parent_fit_max_abs_midpoint_residual) *
    Number(componentPrototype.remainder_inflation_factor);
  const sampledParentFourthDerivativeUpper =
    fourthDerivativeUpperForTaylorRemainder({
      remainderUpper: parentResidualUpper,
      xiHalfWidth: parentXiHalfWidth,
    });
  const tileRows = componentPrototype.prototype_tile_rows.map((row) => {
    const requiredFourthDerivativeUpper =
      fourthDerivativeUpperForTaylorRemainder({
        remainderUpper: pointTermWidthScale,
        xiHalfWidth: row.xi_half_width,
      });
    const predictedTileRemainder =
      taylorRemainderUpperFromFourthDerivative({
        fourthDerivativeUpper: sampledParentFourthDerivativeUpper,
        xiHalfWidth: row.xi_half_width,
      });
    const derivativeBoundHeadroomRatio =
      finitePositive(requiredFourthDerivativeUpper)
        ? Number(sampledParentFourthDerivativeUpper) /
          Number(requiredFourthDerivativeUpper)
        : null;
    const predictedTileRemainderToPointWidthRatio =
      finitePositive(pointTermWidthScale)
        ? Number(predictedTileRemainder) / Number(pointTermWidthScale)
        : null;
    const prototypeRemainderGap = Math.abs(
      Number(predictedTileRemainder) - Number(row.prototype_remainder_upper)
    );
    const prototypeRemainderRelativeGap = finitePositive(
      row.prototype_remainder_upper
    )
      ? prototypeRemainderGap / Number(row.prototype_remainder_upper)
      : prototypeRemainderGap;
    const derivativeProxyPassesRequiredBound =
      Number(derivativeBoundHeadroomRatio) <= 1;
    return {
      component: componentPrototype.component,
      tile_index: row.tile_index,
      xi_interval: row.xi_interval,
      xi_center: row.xi_center,
      xi_half_width: row.xi_half_width,
      polynomial_degree: componentPrototype.polynomial_degree,
      taylor_remainder_order: componentPrototype.local_taylor_order,
      point_term_width_scale: pointTermWidthScale,
      required_fourth_derivative_upper_for_point_scale:
        requiredFourthDerivativeUpper,
      sampled_parent_residual_implied_fourth_derivative_upper:
        sampledParentFourthDerivativeUpper,
      derivative_bound_headroom_ratio: derivativeBoundHeadroomRatio,
      predicted_tile_remainder_from_derivative_proxy: predictedTileRemainder,
      predicted_tile_remainder_to_point_width_ratio:
        predictedTileRemainderToPointWidthRatio,
      prototype_remainder_upper: row.prototype_remainder_upper,
      prototype_remainder_gap: prototypeRemainderGap,
      prototype_remainder_relative_gap: prototypeRemainderRelativeGap,
      derivative_proxy_passes_required_bound:
        derivativeProxyPassesRequiredBound,
      derivative_bound_status: derivativeProxyPassesRequiredBound
        ? "sampled-fourth-derivative-proxy-below-required-bound"
        : "sampled-fourth-derivative-proxy-above-required-bound",
    };
  });
  return {
    component: componentPrototype.component,
    polynomial_degree: componentPrototype.polynomial_degree,
    tile_count: componentPrototype.tile_count,
    taylor_remainder_order: componentPrototype.local_taylor_order,
    xi_domain_interval: componentPrototype.xi_domain_interval,
    parent_xi_half_width: parentXiHalfWidth,
    parent_fit_max_abs_midpoint_residual:
      componentPrototype.parent_fit_max_abs_midpoint_residual,
    parent_residual_upper_used_for_derivative_proxy: parentResidualUpper,
    sampled_parent_residual_implied_fourth_derivative_upper:
      sampledParentFourthDerivativeUpper,
    min_required_fourth_derivative_upper_for_point_scale: Math.min(
      ...tileRows.map((row) =>
        Number(row.required_fourth_derivative_upper_for_point_scale)
      )
    ),
    max_required_fourth_derivative_upper_for_point_scale: Math.max(
      ...tileRows.map((row) =>
        Number(row.required_fourth_derivative_upper_for_point_scale)
      )
    ),
    max_derivative_bound_headroom_ratio: Math.max(
      ...tileRows.map((row) => Number(row.derivative_bound_headroom_ratio))
    ),
    max_predicted_tile_remainder_to_point_width_ratio: Math.max(
      ...tileRows.map((row) =>
        Number(row.predicted_tile_remainder_to_point_width_ratio)
      )
    ),
    max_prototype_remainder_relative_gap: Math.max(
      ...tileRows.map((row) => Number(row.prototype_remainder_relative_gap))
    ),
    all_tiles_derivative_proxy_below_required_bound: tileRows.every(
      (row) => row.derivative_proxy_passes_required_bound
    ),
    derivative_tile_rows: tileRows,
  };
}

function tileCountRequiredForFourthDerivative({
  fourthDerivativeUpper,
  pointTermWidthScale,
  parentXiHalfWidth,
}) {
  if (
    !finitePositive(fourthDerivativeUpper) ||
    !finitePositive(pointTermWidthScale) ||
    !finitePositive(parentXiHalfWidth)
  ) {
    return null;
  }
  const tileHalfWidth = Math.pow(
    (24 * Number(pointTermWidthScale)) / Number(fourthDerivativeUpper),
    0.25
  );
  return Number.isFinite(tileHalfWidth) && tileHalfWidth > 0
    ? Math.ceil(Number(parentXiHalfWidth) / tileHalfWidth)
    : null;
}

function fourthDifferenceRowsForComponent({
  component,
  samples,
  requiredFourthDerivativeUpper,
  sampledParentFourthDerivativeUpper,
  pointTermWidthScale,
  parentXiHalfWidth,
}) {
  const rows = [];
  for (let index = 0; index <= samples.length - 5; index += 1) {
    const stencilSamples = samples.slice(index, index + 5);
    const xiMidpoints = stencilSamples.map((sample) =>
      Number(sample.xi_midpoint)
    );
    const values = stencilSamples.map((sample) =>
      n38ExpressionTaylorComponentValue(sample, component)
    );
    const xiStep = (xiMidpoints[4] - xiMidpoints[0]) / 4;
    const localSteps = xiMidpoints
      .slice(1)
      .map((xi, stepIndex) => xi - xiMidpoints[stepIndex]);
    const maxStepDeviation = Math.max(
      ...localSteps.map((step) => Math.abs(step - xiStep))
    );
    const fourthDifference =
      values[0] - 4 * values[1] + 6 * values[2] - 4 * values[3] + values[4];
    const fourthDerivativeEstimate = finitePositive(xiStep)
      ? Math.abs(fourthDifference) / Math.pow(xiStep, 4)
      : null;
    const nonuniformFourthDerivativeEstimate =
      fourthDerivativeEstimateFromFourthDividedDifference(
        xiMidpoints,
        values
      );
    const nonuniformToUniformRatio = finitePositive(fourthDerivativeEstimate)
      ? Number(nonuniformFourthDerivativeEstimate) /
        Number(fourthDerivativeEstimate)
      : null;
    const nonuniformToUniformRelativeGap = finitePositive(
      fourthDerivativeEstimate
    )
      ? Math.abs(
          Number(nonuniformFourthDerivativeEstimate) -
            Number(fourthDerivativeEstimate)
        ) / Number(fourthDerivativeEstimate)
      : null;
    const ratioToRequired = finitePositive(requiredFourthDerivativeUpper)
      ? Number(fourthDerivativeEstimate) /
        Number(requiredFourthDerivativeUpper)
      : null;
    const ratioToSampledProxy = finitePositive(sampledParentFourthDerivativeUpper)
      ? Number(fourthDerivativeEstimate) /
        Number(sampledParentFourthDerivativeUpper)
      : null;
    const retileCount = tileCountRequiredForFourthDerivative({
      fourthDerivativeUpper: fourthDerivativeEstimate,
      pointTermWidthScale,
      parentXiHalfWidth,
    });
    rows.push({
      stencil_index: index,
      component,
      xi_midpoint_span: [xiMidpoints[0], xiMidpoints[4]],
      xi_step: xiStep,
      max_xi_step_deviation: maxStepDeviation,
      fourth_difference: fourthDifference,
      abs_fourth_difference: Math.abs(fourthDifference),
      fourth_derivative_estimate: fourthDerivativeEstimate,
      nonuniform_fourth_derivative_estimate:
        nonuniformFourthDerivativeEstimate,
      nonuniform_to_uniform_fourth_derivative_ratio:
        nonuniformToUniformRatio,
      nonuniform_to_uniform_fourth_derivative_relative_gap:
        nonuniformToUniformRelativeGap,
      required_fourth_derivative_upper_for_existing_tiles:
        requiredFourthDerivativeUpper,
      sampled_parent_residual_implied_fourth_derivative_upper:
        sampledParentFourthDerivativeUpper,
      fourth_derivative_to_required_ratio: ratioToRequired,
      fourth_derivative_to_sampled_proxy_ratio: ratioToSampledProxy,
      retile_count_required_for_observed_fourth_difference: retileCount,
      existing_tile_bound_compatible_with_stencil:
        Number(ratioToRequired) <= 1,
      stencil_status:
        Number(ratioToRequired) <= 1
          ? "fourth-difference-compatible-with-existing-tile-bound"
          : "fourth-difference-exceeds-existing-tile-bound",
    });
  }
  return rows;
}

function summarizeFourthDifferenceRows(rows) {
  const maxRow = rows.reduce((best, row) =>
    Number(row.fourth_derivative_estimate) >
    Number(best?.fourth_derivative_estimate ?? -1)
      ? row
      : best,
  null);
  const maxNonuniformRow = rows.reduce((best, row) =>
    Number(row.nonuniform_fourth_derivative_estimate) >
    Number(best?.nonuniform_fourth_derivative_estimate ?? -1)
      ? row
      : best,
  null);
  const maxRatioRow = rows.reduce((best, row) =>
    Number(row.fourth_derivative_to_required_ratio) >
    Number(best?.fourth_derivative_to_required_ratio ?? -1)
      ? row
      : best,
  null);
  const maxNonuniformGapRow = rows.reduce((best, row) =>
    Number(row.nonuniform_to_uniform_fourth_derivative_relative_gap) >
    Number(best?.nonuniform_to_uniform_fourth_derivative_relative_gap ?? -1)
      ? row
      : best,
  null);
  return {
    stencil_count: rows.length,
    max_fourth_derivative_estimate:
      maxRow?.fourth_derivative_estimate ?? null,
    max_nonuniform_fourth_derivative_estimate:
      maxNonuniformRow?.nonuniform_fourth_derivative_estimate ?? null,
    max_fourth_derivative_to_required_ratio:
      maxRatioRow?.fourth_derivative_to_required_ratio ?? null,
    max_fourth_derivative_to_sampled_proxy_ratio:
      maxRatioRow?.fourth_derivative_to_sampled_proxy_ratio ?? null,
    max_nonuniform_to_uniform_fourth_derivative_relative_gap:
      maxNonuniformGapRow?.nonuniform_to_uniform_fourth_derivative_relative_gap ??
      null,
    max_retile_count_required_for_observed_fourth_difference: Math.max(
      ...rows.map((row) =>
        Number(row.retile_count_required_for_observed_fourth_difference ?? 0)
      )
    ),
    all_stencils_compatible_with_existing_tile_bound: rows.every(
      (row) => row.existing_tile_bound_compatible_with_stencil
    ),
    worst_stencil: maxRatioRow,
    worst_nonuniform_correction_stencil: maxNonuniformGapRow,
  };
}

function intervalOverlapWidth(left, right) {
  const overlapLeft = Math.max(Number(left[0]), Number(right[0]));
  const overlapRight = Math.min(Number(left[1]), Number(right[1]));
  return Math.max(0, overlapRight - overlapLeft);
}

function compactFourthDifferenceStencil(row) {
  if (!row) {
    return null;
  }
  return {
    stencil_index: row.stencil_index,
    component: row.component,
    xi_midpoint_span: row.xi_midpoint_span,
    xi_midpoint_center: intervalMidpoint(row.xi_midpoint_span),
    xi_midpoint_span_width: intervalWidth(row.xi_midpoint_span),
    fourth_derivative_estimate: row.fourth_derivative_estimate,
    nonuniform_fourth_derivative_estimate:
      row.nonuniform_fourth_derivative_estimate,
    fourth_derivative_to_required_ratio:
      row.fourth_derivative_to_required_ratio,
    retile_count_required_for_observed_fourth_difference:
      row.retile_count_required_for_observed_fourth_difference,
    stencil_status: row.stencil_status,
  };
}

function fourthDifferenceGrowthLocalizationForComponent({
  component,
  baseSummary,
  refinedSummary,
}) {
  const baseStencil = compactFourthDifferenceStencil(
    baseSummary.fourth_difference_summary.worst_stencil
  );
  const refinedStencil = compactFourthDifferenceStencil(
    refinedSummary.fourth_difference_summary.worst_stencil
  );
  const overlapWidth =
    baseStencil && refinedStencil
      ? intervalOverlapWidth(
          baseStencil.xi_midpoint_span,
          refinedStencil.xi_midpoint_span
        )
      : null;
  const refinedOverlapFraction =
    finitePositive(refinedStencil?.xi_midpoint_span_width)
      ? overlapWidth / Number(refinedStencil.xi_midpoint_span_width)
      : null;
  const baseOverlapFraction = finitePositive(baseStencil?.xi_midpoint_span_width)
    ? overlapWidth / Number(baseStencil.xi_midpoint_span_width)
    : null;
  const baseEstimate = Number(
    baseSummary.fourth_difference_summary.max_fourth_derivative_estimate
  );
  const refinedEstimate = Number(
    refinedSummary.fourth_difference_summary.max_fourth_derivative_estimate
  );
  const growthRatio = finitePositive(baseEstimate)
    ? refinedEstimate / baseEstimate
    : null;
  const growthIncrement =
    Number.isFinite(refinedEstimate) && Number.isFinite(baseEstimate)
      ? refinedEstimate - baseEstimate
      : null;
  return {
    component,
    base_source_stencil_subcell_count: baseSummary.stencil_subcell_count,
    refined_source_stencil_subcell_count: refinedSummary.stencil_subcell_count,
    base_worst_stencil: baseStencil,
    refined_worst_stencil: refinedStencil,
    refined_to_base_observed_m4_ratio: growthRatio,
    observed_m4_growth_increment: growthIncrement,
    worst_stencil_xi_overlap_width: overlapWidth,
    refined_worst_stencil_overlap_fraction: refinedOverlapFraction,
    base_worst_stencil_overlap_fraction: baseOverlapFraction,
    refined_worst_stencil_nested_in_base:
      Number(refinedOverlapFraction) >= 1 - 1e-12,
    worst_stencil_center_shift:
      baseStencil && refinedStencil
        ? refinedStencil.xi_midpoint_center - baseStencil.xi_midpoint_center
        : null,
    growth_localization_status:
      Number(refinedOverlapFraction) >= 1 - 1e-12
        ? "refined-worst-stencil-nests-inside-base-worst-region"
        : Number(refinedOverlapFraction) > 0
          ? "refined-worst-stencil-partially-overlaps-base-worst-region"
          : "refined-worst-stencil-disjoint-from-base-worst-region",
  };
}

function summarizeM4GrowthLocalization(localizationRows) {
  const totalPositiveGrowthIncrement = localizationRows.reduce(
    (total, row) =>
      total + Math.max(0, Number(row.observed_m4_growth_increment ?? 0)),
    0
  );
  const rowsWithShares = localizationRows.map((row) => ({
    ...row,
    observed_m4_growth_increment_share: finitePositive(
      totalPositiveGrowthIncrement
    )
      ? Math.max(0, Number(row.observed_m4_growth_increment)) /
        totalPositiveGrowthIncrement
      : null,
  }));
  const dominantRow = rowsWithShares.reduce((best, row) =>
    Number(row.observed_m4_growth_increment_share) >
    Number(best?.observed_m4_growth_increment_share ?? -1)
      ? row
      : best,
  null);
  const maxRatioRow = rowsWithShares.reduce((best, row) =>
    Number(row.refined_to_base_observed_m4_ratio) >
    Number(best?.refined_to_base_observed_m4_ratio ?? -1)
      ? row
      : best,
  null);
  const allRefinedWorstStencilsNest = rowsWithShares.every(
    (row) => row.refined_worst_stencil_nested_in_base === true
  );
  const refinedWorstSpans = rowsWithShares.map(
    (row) => row.refined_worst_stencil.xi_midpoint_span
  );
  const baseWorstSpans = rowsWithShares.map(
    (row) => row.base_worst_stencil.xi_midpoint_span
  );
  const refinedWorstSpanHull = intervalHull(refinedWorstSpans);
  const baseWorstSpanHull = intervalHull(baseWorstSpans);
  const sortedRefinedWorstSpans = [...refinedWorstSpans].sort(
    (left, right) => Number(left[0]) - Number(right[0])
  );
  const maxRefinedWorstSpanGap = Math.max(
    0,
    ...sortedRefinedWorstSpans.slice(1).map((span, index) =>
      Math.max(0, Number(span[0]) - Number(sortedRefinedWorstSpans[index][1]))
    )
  );
  const refinedWorstStencilsPositiveXiOnly = refinedWorstSpans.every(
    (span) => Number(span[0]) > 0 && Number(span[1]) > 0
  );
  const refinedWorstStencilsFormContiguousRegion =
    maxRefinedWorstSpanGap <= 1e-12;
  const dominantGrowthShare = Number(
    dominantRow?.observed_m4_growth_increment_share ?? 0
  );
  const growthDistributionStatus =
    dominantGrowthShare >= 0.45
      ? "dominant-component-localized-growth"
      : "multi-component-fourth-variation-growth";
  return {
    component_count: rowsWithShares.length,
    total_positive_observed_m4_growth_increment:
      totalPositiveGrowthIncrement,
    dominant_growth_component: dominantRow?.component ?? null,
    dominant_growth_component_increment_share:
      dominantRow?.observed_m4_growth_increment_share ?? null,
    max_refined_to_base_observed_m4_ratio_component:
      maxRatioRow?.component ?? null,
    max_refined_to_base_observed_m4_ratio:
      maxRatioRow?.refined_to_base_observed_m4_ratio ?? null,
    all_refined_worst_stencils_nest_inside_base_worst_spans:
      allRefinedWorstStencilsNest,
    min_refined_worst_stencil_overlap_fraction: Math.min(
      ...rowsWithShares.map((row) =>
        Number(row.refined_worst_stencil_overlap_fraction ?? 0)
      )
    ),
    base_worst_stencil_span_hull: baseWorstSpanHull,
    refined_worst_stencil_span_hull: refinedWorstSpanHull,
    max_refined_worst_stencil_gap: maxRefinedWorstSpanGap,
    refined_worst_stencils_positive_xi_only:
      refinedWorstStencilsPositiveXiOnly,
    refined_worst_stencils_form_contiguous_xi_region:
      refinedWorstStencilsFormContiguousRegion,
    refined_worst_stencil_region_status:
      refinedWorstStencilsPositiveXiOnly &&
      refinedWorstStencilsFormContiguousRegion
        ? "refined-worst-stencils-collapse-to-contiguous-positive-xi-region"
        : refinedWorstStencilsPositiveXiOnly
          ? "refined-worst-stencils-shift-to-positive-xi-region"
          : "refined-worst-stencils-not-confined-to-positive-xi-region",
    growth_distribution_status: growthDistributionStatus,
    localization_interpretation:
      !allRefinedWorstStencilsNest &&
      refinedWorstStencilsPositiveXiOnly &&
      refinedWorstStencilsFormContiguousRegion
        ? "growth-shifts-to-contiguous-positive-xi-region-under-refinement"
        : allRefinedWorstStencilsNest && growthDistributionStatus ===
        "dominant-component-localized-growth"
        ? "growth-localized-by-component-inside-existing-worst-fold-region"
        : allRefinedWorstStencilsNest
          ? "growth-shared-across-components-inside-existing-worst-fold-region"
          : "growth-shifts-fold-region-under-refinement",
    component_growth_localization_rows: rowsWithShares,
  };
}

function signLabel(value, tolerance = 0) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || Math.abs(numeric) <= tolerance) {
    return "zero";
  }
  return numeric > 0 ? "positive" : "negative";
}

function intervalContainsZero([left, right]) {
  return Number(left) <= 0 && Number(right) >= 0;
}

function intervalContainsInterval(outer, inner) {
  return (
    Array.isArray(outer) &&
    Array.isArray(inner) &&
    outer.length === 2 &&
    inner.length === 2 &&
    Number(outer[0]) <= Number(inner[0]) &&
    Number(outer[1]) >= Number(inner[1])
  );
}

function fourthDifferenceOfValues(values) {
  if (!Array.isArray(values) || values.length !== 5) {
    return null;
  }
  return (
    Number(values[0]) -
    4 * Number(values[1]) +
    6 * Number(values[2]) -
    4 * Number(values[3]) +
    Number(values[4])
  );
}

function componentFourthDifferenceRowsForStencil({
  fourthDifferenceDiagnostic,
  component,
  stencilSubcellCount,
}) {
  const stencilSummary = fourthDifferenceDiagnostic.stencil_summaries.find(
    (summary) => summary.stencil_subcell_count === stencilSubcellCount
  );
  return (
    stencilSummary?.component_fourth_difference_rows.find(
      (row) => row.component === component
    )?.fourth_difference_rows ?? []
  );
}

function fourthDifferenceRowAtStencilIndexForComponent({
  component,
  samples,
  stencilIndex,
}) {
  if (
    !Array.isArray(samples) ||
    stencilIndex < 0 ||
    stencilIndex > samples.length - 5
  ) {
    return null;
  }
  const stencilSamples = samples.slice(stencilIndex, stencilIndex + 5);
  const xiMidpoints = stencilSamples.map((sample) =>
    Number(sample.xi_midpoint)
  );
  const values = stencilSamples.map((sample) =>
    n38ExpressionTaylorComponentValue(sample, component)
  );
  const xiStep = (xiMidpoints[4] - xiMidpoints[0]) / 4;
  const localSteps = xiMidpoints
    .slice(1)
    .map((xi, stepIndex) => xi - xiMidpoints[stepIndex]);
  const maxStepDeviation = Math.max(
    ...localSteps.map((step) => Math.abs(step - xiStep))
  );
  const fourthDifference =
    values[0] - 4 * values[1] + 6 * values[2] - 4 * values[3] + values[4];
  const fourthDerivativeEstimate = finitePositive(xiStep)
    ? Math.abs(fourthDifference) / Math.pow(xiStep, 4)
    : null;
  const nonuniformFourthDerivativeEstimate =
    fourthDerivativeEstimateFromFourthDividedDifference(xiMidpoints, values);
  return {
    stencil_index: stencilIndex,
    component,
    xi_midpoint_span: [xiMidpoints[0], xiMidpoints[4]],
    xi_step: xiStep,
    max_xi_step_deviation: maxStepDeviation,
    fourth_difference: fourthDifference,
    abs_fourth_difference: Math.abs(fourthDifference),
    fourth_derivative_estimate: fourthDerivativeEstimate,
    nonuniform_fourth_derivative_estimate:
      nonuniformFourthDerivativeEstimate,
  };
}

function sinePairNormalFormWitnessForRow({
  context,
  row,
  targetSpeedInterval,
  branch,
}) {
  const branchRow = branchRowFor(row, branch);
  const cell = cellFromCertificateRow(row);
  const midpointCell = pointCellAtMidpoint(cell);
  const midpointHIntervals = hIntervalsFromBranchRow(branchRow, {
    hCount: 39,
  }).map((interval) => pointInterval(intervalMidpoint(interval)));
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell: midpointCell,
    branch,
    hIntervals: midpointHIntervals,
  });
  const sumCoordinate = context.add(delta, phi);
  const differenceCoordinate = context.subtract(delta, phi);
  const halfSum = context.constant(
    root.scaleInterval(
      root.addIntervals(
        midpointCell.delta_fold_interval,
        midpointCell.phi_fold_interval
      ),
      0.5
    )
  );
  halfSum[2] = [-1, -1];
  const halfDifference = context.scale(differenceCoordinate, 0.5);
  const sinePair = context.add(context.sinSeries(delta), context.sinSeries(phi));
  const normalForm = context.scale(
    context.multiply(
      context.sinSeries(halfSum),
      context.cosSeries(halfDifference)
    ),
    2
  );
  const sinePairCoefficient = sinePair[H38_NUMERATOR_Y_ORDER];
  const normalFormCoefficient = normalForm[H38_NUMERATOR_Y_ORDER];
  const identityResidual = root.subtractIntervals(
    sinePairCoefficient,
    normalFormCoefficient
  );
  const sumNonzeroOrders = sumCoordinate
    .map((coefficient, order) => ({
      order,
      coefficient,
      abs_upper: intervalAbsUpper(coefficient),
    }))
    .filter((entry) => entry.abs_upper > 0);
  const sumHTailMaxAbsUpper = Math.max(
    0,
    ...sumCoordinate.slice(3).map((coefficient) => intervalAbsUpper(coefficient))
  );
  const differenceHTailMaxAbsUpper = Math.max(
    0,
    ...differenceCoordinate
      .slice(3)
      .map((coefficient) => intervalAbsUpper(coefficient))
  );
  return {
    cell_id: row.cell_id,
    speed_interval: row.speed_interval,
    xi_interval: speedIntervalXiInterval({ row, targetSpeedInterval }),
    xi_midpoint: intervalMidpoint(
      speedIntervalXiInterval({ row, targetSpeedInterval })
    ),
    y_order: H38_NUMERATOR_Y_ORDER,
    sum_coordinate_nonzero_orders: sumNonzeroOrders.map((entry) => entry.order),
    sum_coordinate_nonzero_order_entries: sumNonzeroOrders,
    delta_plus_phi_y1_coefficient_abs_upper: intervalAbsUpper(
      sumCoordinate[1]
    ),
    delta_plus_phi_y2_coefficient_interval: sumCoordinate[2],
    delta_plus_phi_y2_coefficient: intervalMidpoint(sumCoordinate[2]),
    delta_plus_phi_h_tail_max_abs_upper: sumHTailMaxAbsUpper,
    half_sum_y2_coefficient: intervalMidpoint(halfSum[2]),
    explicit_half_sum_nonzero_orders: [0, 2],
    explicit_half_sum_h_tail_max_abs_upper: Math.max(
      0,
      ...halfSum.slice(3).map((coefficient) => intervalAbsUpper(coefficient))
    ),
    raw_sum_coordinate_rounding_residue_h_tail_abs_upper:
      sumHTailMaxAbsUpper,
    difference_coordinate_y1_coefficient_abs_upper: intervalAbsUpper(
      differenceCoordinate[1]
    ),
    difference_coordinate_h_tail_max_abs_upper: differenceHTailMaxAbsUpper,
    sine_pair_coefficient_interval: sinePairCoefficient,
    sine_pair_coefficient_midpoint: intervalMidpoint(sinePairCoefficient),
    normal_form_coefficient_interval: normalFormCoefficient,
    normal_form_coefficient_midpoint: intervalMidpoint(normalFormCoefficient),
    sine_pair_normal_form_identity_residual_interval: identityResidual,
    sine_pair_normal_form_identity_residual_abs_upper:
      intervalAbsUpper(identityResidual),
    sine_pair_normal_form_identity_relative_gap:
      intervalAbsUpper(identityResidual) /
      Math.max(
        1,
        intervalAbsUpper(sinePairCoefficient),
        intervalAbsUpper(normalFormCoefficient)
      ),
    sine_pair_normal_form_identity_residual_contains_zero:
      intervalContainsZero(identityResidual),
  };
}

function sinePairNormalFormWitnessForStencil({
  context,
  rows,
  sourceTermSamples,
  targetSpeedInterval,
  branch,
  refinedStencilSubcellCount,
  comparisonStencilIndex,
  sourceCancellation = null,
}) {
  if (
    !Number.isInteger(comparisonStencilIndex) ||
    comparisonStencilIndex < 0 ||
    comparisonStencilIndex > rows.length - 5
  ) {
    return {
      status: "sine-pair-normal-form-witness-unavailable",
      reason: "comparison stencil index is outside the source row sample range",
    };
  }
  const stencilRows = rows.slice(comparisonStencilIndex, comparisonStencilIndex + 5);
  const witnessRows = stencilRows.map((row) =>
    sinePairNormalFormWitnessForRow({
      context,
      row,
      targetSpeedInterval,
      branch,
    })
  );
  const stencilSamples = sourceTermSamples.slice(
    comparisonStencilIndex,
    comparisonStencilIndex + 5
  );
  const comparisonXiMidpointSpan = [
    Number(stencilSamples[0]?.xi_midpoint),
    Number(stencilSamples[4]?.xi_midpoint),
  ];
  const sinPhiRow = fourthDifferenceRowAtStencilIndexForComponent({
    component: "sin_phi",
    samples: sourceTermSamples,
    stencilIndex: comparisonStencilIndex,
  });
  const sinDeltaRow = fourthDifferenceRowAtStencilIndexForComponent({
    component: "sin_delta",
    samples: sourceTermSamples,
    stencilIndex: comparisonStencilIndex,
  });
  const deltaSquaredSpeedRow = fourthDifferenceRowAtStencilIndexForComponent({
    component: "delta_squared_speed",
    samples: sourceTermSamples,
    stencilIndex: comparisonStencilIndex,
  });
  const directRow = fourthDifferenceRowAtStencilIndexForComponent({
    component: "direct_n38_expression",
    samples: sourceTermSamples,
    stencilIndex: comparisonStencilIndex,
  });
  const sinePairFromSinTermsFourthDifference =
    Number(sinPhiRow?.fourth_difference ?? NaN) +
    Number(sinDeltaRow?.fourth_difference ?? NaN);
  const normalFormFourthDifference = fourthDifferenceOfValues(
    witnessRows.map((row) => row.normal_form_coefficient_midpoint)
  );
  const sinePairFourthDifference = fourthDifferenceOfValues(
    witnessRows.map((row) => row.sine_pair_coefficient_midpoint)
  );
  const normalFormToSinTermGap = Math.abs(
    Number(normalFormFourthDifference) -
      Number(sinePairFromSinTermsFourthDifference)
  );
  const sinePairToSinTermGap = Math.abs(
    Number(sinePairFourthDifference) -
      Number(sinePairFromSinTermsFourthDifference)
  );
  const sourceTermAbsMass =
    Math.abs(Number(sinPhiRow?.fourth_difference ?? 0)) +
    Math.abs(Number(sinDeltaRow?.fourth_difference ?? 0)) +
    Math.abs(Number(deltaSquaredSpeedRow?.fourth_difference ?? 0));
  const sinePairAbsMass =
    Math.abs(Number(sinPhiRow?.fourth_difference ?? 0)) +
    Math.abs(Number(sinDeltaRow?.fourth_difference ?? 0));
  const directFourthDifference = Number(directRow?.fourth_difference ?? NaN);
  const sampleResidualAbsUppers = witnessRows.map((row) =>
    Number(row.sine_pair_normal_form_identity_residual_abs_upper)
  );
  const sampleRelativeGaps = witnessRows.map((row) =>
    Number(row.sine_pair_normal_form_identity_relative_gap)
  );
  const maxSampleIdentityAbsGap = Math.max(...sampleResidualAbsUppers);
  const maxSampleIdentityRelativeGap = Math.max(...sampleRelativeGaps);
  const sumCoordinateNonzeroOrders = [
    0,
    2,
  ].sort((left, right) => left - right);
  const deltaPlusPhiY1CoefficientAbsUpper = Math.max(
    ...witnessRows.map((row) =>
      Number(row.delta_plus_phi_y1_coefficient_abs_upper)
    )
  );
  const deltaPlusPhiHTailMaxAbsUpper = Math.max(
    ...witnessRows.map((row) => Number(row.delta_plus_phi_h_tail_max_abs_upper))
  );
  const explicitHalfSumHTailMaxAbsUpper = Math.max(
    ...witnessRows.map((row) =>
      Number(row.explicit_half_sum_h_tail_max_abs_upper)
    )
  );
  const differenceCoordinateY1CoefficientAbsUpper = Math.max(
    ...witnessRows.map((row) =>
      Number(row.difference_coordinate_y1_coefficient_abs_upper)
    )
  );
  const differenceCoordinateHTailMaxAbsUpper = Math.max(
    ...witnessRows.map((row) =>
      Number(row.difference_coordinate_h_tail_max_abs_upper)
    )
  );
  const comparisonSpanMatchesSourceCancellation =
    sourceCancellation?.comparison_xi_midpoint_span
      ? intervalEndpointMaxGap(
          comparisonXiMidpointSpan,
          sourceCancellation.comparison_xi_midpoint_span
        ) <= 1e-12
      : null;
  const sinePairFourthDifferenceRelativeGap = finitePositive(
    Math.abs(sinePairFromSinTermsFourthDifference)
  )
    ? sinePairToSinTermGap / Math.abs(sinePairFromSinTermsFourthDifference)
    : sinePairToSinTermGap;
  const normalFormFourthDifferenceRelativeGap = finitePositive(
    Math.abs(sinePairFromSinTermsFourthDifference)
  )
    ? normalFormToSinTermGap / Math.abs(sinePairFromSinTermsFourthDifference)
    : normalFormToSinTermGap;
  return {
    status: "sine-pair-normal-form-witness-emitted",
    identity_basis:
      "sum-to-product-delta-phi-half-sum-half-difference",
    proof_status:
      "algebraic-series-identity-on-same-samples-not-directed-rounded-enclosure",
    fit_used: false,
    refined_source_stencil_subcell_count: refinedStencilSubcellCount,
    comparison_stencil_index: comparisonStencilIndex,
    comparison_xi_midpoint_span: comparisonXiMidpointSpan,
    comparison_xi_midpoint_center: intervalMidpoint(comparisonXiMidpointSpan),
    same_sample_sequence_as_source_cancellation:
      comparisonSpanMatchesSourceCancellation,
    sample_count: witnessRows.length,
    sample_witness_rows: witnessRows,
    sum_coordinate_nonzero_orders: sumCoordinateNonzeroOrders,
    sum_coordinate_branch_dependent: false,
    sum_coordinate_h_row_dependent: false,
    half_sum_h_row_dependency_status:
      explicitHalfSumHTailMaxAbsUpper === 0
        ? "h-row-free"
        : "h-row-dependent",
    delta_plus_phi_y1_coefficient_abs_upper:
      deltaPlusPhiY1CoefficientAbsUpper,
    delta_plus_phi_y2_coefficient: witnessRows[0]?.delta_plus_phi_y2_coefficient,
    delta_plus_phi_h_tail_max_abs_upper: deltaPlusPhiHTailMaxAbsUpper,
    half_sum_y2_coefficient: witnessRows[0]?.half_sum_y2_coefficient,
    explicit_half_sum_h_tail_max_abs_upper: explicitHalfSumHTailMaxAbsUpper,
    raw_sum_coordinate_rounding_residue_h_tail_abs_upper:
      deltaPlusPhiHTailMaxAbsUpper,
    difference_coordinate_y1_coefficient_abs_upper:
      differenceCoordinateY1CoefficientAbsUpper,
    difference_coordinate_h_tail_max_abs_upper:
      differenceCoordinateHTailMaxAbsUpper,
    difference_coordinate_carries_branch_and_h_rows:
      differenceCoordinateY1CoefficientAbsUpper > 0 &&
      differenceCoordinateHTailMaxAbsUpper > 0,
    all_sample_sine_pair_identity_residuals_contain_zero:
      witnessRows.every(
        (row) => row.sine_pair_normal_form_identity_residual_contains_zero
      ),
    all_sample_sine_pair_identity_residuals_pass:
      maxSampleIdentityRelativeGap <= 1e-9,
    max_sample_sine_pair_identity_absolute_gap: maxSampleIdentityAbsGap,
    max_sample_sine_pair_identity_relative_gap: maxSampleIdentityRelativeGap,
    sine_pair_fourth_difference_from_terms:
      sinePairFromSinTermsFourthDifference,
    sine_pair_fourth_difference_from_direct_series:
      sinePairFourthDifference,
    sine_pair_normal_form_fourth_difference: normalFormFourthDifference,
    sine_pair_fourth_difference_absolute_gap_to_sin_terms:
      sinePairToSinTermGap,
    sine_pair_fourth_difference_relative_gap:
      sinePairFourthDifferenceRelativeGap,
    normal_form_fourth_difference_absolute_gap_to_sin_terms:
      normalFormToSinTermGap,
    normal_form_fourth_difference_relative_gap:
      normalFormFourthDifferenceRelativeGap,
    sine_pair_fourth_difference_replays_sin_terms:
      sinePairFourthDifferenceRelativeGap <= 1e-6 &&
      normalFormFourthDifferenceRelativeGap <= 1e-6,
    sine_pair_fourth_difference_sign: signLabel(
      sinePairFromSinTermsFourthDifference
    ),
    direct_fourth_difference: directFourthDifference,
    sine_pair_abs_source_mass_share: finitePositive(sourceTermAbsMass)
      ? sinePairAbsMass / sourceTermAbsMass
      : null,
    sine_pair_signed_to_direct_fourth_difference_ratio: finitePositive(
      Math.abs(directFourthDifference)
    )
      ? sinePairFromSinTermsFourthDifference / directFourthDifference
      : null,
    normal_form_interpretation:
      sumCoordinateNonzeroOrders.length === 2 &&
      sumCoordinateNonzeroOrders[0] === 0 &&
      sumCoordinateNonzeroOrders[1] === 2 &&
      explicitHalfSumHTailMaxAbsUpper === 0
        ? "sine-pair-sum-coordinate-cancels-branch-and-h-row-dependence"
        : "sine-pair-sum-coordinate-still-carries-transport-dependence",
  };
}

function reducedSigmaEtaSourceRow({
  context,
  row,
  targetSpeedInterval,
  branch,
}) {
  const branchRow = branchRowFor(row, branch);
  const cell = cellFromCertificateRow(row);
  const hIntervals = hIntervalsFromBranchRow(branchRow, { hCount: 39 });
  hIntervals[THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index] = [
    0,
    0,
  ];
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell,
    branch,
    hIntervals,
  });
  const rawSumCoordinate = context.add(delta, phi);
  const eta = context.scale(context.subtract(delta, phi), 0.5);
  const sigma = context.constant(
    root.scaleInterval(
      root.addIntervals(cell.delta_fold_interval, cell.phi_fold_interval),
      0.5
    )
  );
  sigma[2] = [-1, -1];
  const deltaFromSigmaEta = context.add(sigma, eta);
  const rawSinePair = context.add(
    context.sinSeries(delta),
    context.sinSeries(phi)
  );
  const reducedSinePair = context.scale(
    context.multiply(context.sinSeries(sigma), context.cosSeries(eta)),
    2
  );
  const inverseSpeedSquared = root.inverseSpeedSquaredInterval(
    cell.speed_interval
  );
  const rawDeltaSquared = context.scaleByInterval(
    context.power(delta, 2),
    inverseSpeedSquared
  );
  const reducedDeltaSquared = context.scaleByInterval(
    context.power(deltaFromSigmaEta, 2),
    inverseSpeedSquared
  );
  const reducedFullSource = context.add(
    context.add(reducedDeltaSquared, context.constant(-2)),
    reducedSinePair
  );
  const rawExpression = evaluateH38RecurrenceNumeratorBeforeSolve({
    cell,
    branch,
    branchSign: root.branchSign(branch),
    hIntervals,
    includeTermDecomposition: true,
  });
  const rawSineCoefficient = rawSinePair[H38_NUMERATOR_Y_ORDER];
  const reducedSineCoefficient = reducedSinePair[H38_NUMERATOR_Y_ORDER];
  const rawDirectCoefficient = rawExpression.numerator_interval;
  const reducedFullCoefficient = reducedFullSource[H38_NUMERATOR_Y_ORDER];
  const rawSumHTailMaxAbsUpper = Math.max(
    0,
    ...rawSumCoordinate
      .slice(3)
      .map((coefficient) => intervalAbsUpper(coefficient))
  );
  const explicitSigmaHTailMaxAbsUpper = Math.max(
    0,
    ...sigma.slice(3).map((coefficient) => intervalAbsUpper(coefficient))
  );
  const etaHTailMaxAbsUpper = Math.max(
    0,
    ...eta.slice(3).map((coefficient) => intervalAbsUpper(coefficient))
  );
  const etaY1CoefficientAbsUpper = intervalAbsUpper(eta[1]);
  const rawSineWidth = intervalWidth(rawSineCoefficient);
  const reducedSineWidth = intervalWidth(reducedSineCoefficient);
  const rawDirectWidth = intervalWidth(rawDirectCoefficient);
  const reducedFullWidth = intervalWidth(reducedFullCoefficient);
  const rawDeltaSquaredWidth = intervalWidth(
    rawDeltaSquared[H38_NUMERATOR_Y_ORDER]
  );
  const reducedDeltaSquaredWidth = intervalWidth(
    reducedDeltaSquared[H38_NUMERATOR_Y_ORDER]
  );
  return {
    cell_id: row.cell_id,
    speed_interval: row.speed_interval,
    xi_interval: speedIntervalXiInterval({ row, targetSpeedInterval }),
    xi_midpoint: intervalMidpoint(
      speedIntervalXiInterval({ row, targetSpeedInterval })
    ),
    y_order: H38_NUMERATOR_Y_ORDER,
    coordinate_route: "sigma-eta-before-h-row-substitution",
    h38_solve_target_zeroed: true,
    sigma_nonzero_orders: [0, 2],
    sigma_h_tail_max_abs_upper: explicitSigmaHTailMaxAbsUpper,
    sigma_y2_coefficient: intervalMidpoint(sigma[2]),
    raw_sum_h_tail_max_abs_upper: rawSumHTailMaxAbsUpper,
    raw_sum_has_rounding_h_tail_residue: rawSumHTailMaxAbsUpper > 0,
    eta_y1_coefficient_abs_upper: etaY1CoefficientAbsUpper,
    eta_h_tail_max_abs_upper: etaHTailMaxAbsUpper,
    eta_carries_branch_and_h_rows:
      etaY1CoefficientAbsUpper > 0 && etaHTailMaxAbsUpper > 0,
    raw_sine_pair_coefficient_interval: rawSineCoefficient,
    reduced_sine_pair_coefficient_interval: reducedSineCoefficient,
    raw_sine_pair_width: rawSineWidth,
    reduced_sine_pair_width: reducedSineWidth,
    raw_to_reduced_sine_pair_width_ratio: finitePositive(reducedSineWidth)
      ? rawSineWidth / reducedSineWidth
      : null,
    raw_sine_pair_abs_upper: intervalAbsUpper(rawSineCoefficient),
    reduced_sine_pair_abs_upper: intervalAbsUpper(reducedSineCoefficient),
    raw_to_reduced_sine_pair_abs_upper_ratio: finitePositive(
      intervalAbsUpper(reducedSineCoefficient)
    )
      ? intervalAbsUpper(rawSineCoefficient) /
        intervalAbsUpper(reducedSineCoefficient)
      : null,
    raw_delta_squared_width: rawDeltaSquaredWidth,
    reduced_delta_squared_width: reducedDeltaSquaredWidth,
    delta_squared_raw_to_reduced_width_ratio: finitePositive(
      reducedDeltaSquaredWidth
    )
      ? rawDeltaSquaredWidth / reducedDeltaSquaredWidth
      : null,
    raw_direct_source_coefficient_interval: rawDirectCoefficient,
    reduced_sigma_eta_full_source_coefficient_interval:
      reducedFullCoefficient,
    raw_direct_source_width: rawDirectWidth,
    reduced_sigma_eta_full_source_width: reducedFullWidth,
    reduced_full_to_raw_direct_width_ratio: finitePositive(rawDirectWidth)
      ? reducedFullWidth / rawDirectWidth
      : null,
    raw_direct_to_reduced_full_width_ratio: finitePositive(reducedFullWidth)
      ? rawDirectWidth / reducedFullWidth
      : null,
    raw_direct_source_abs_upper: intervalAbsUpper(rawDirectCoefficient),
    reduced_sigma_eta_full_source_abs_upper:
      intervalAbsUpper(reducedFullCoefficient),
    reduced_full_to_raw_direct_abs_upper_ratio: finitePositive(
      intervalAbsUpper(rawDirectCoefficient)
    )
      ? intervalAbsUpper(reducedFullCoefficient) /
        intervalAbsUpper(rawDirectCoefficient)
      : null,
    reduced_source_route_interpretation:
      finitePositive(reducedSineWidth) &&
      reducedSineWidth > rawSineWidth &&
      finitePositive(rawDirectWidth) &&
      reducedFullWidth > rawDirectWidth
        ? "h38-zeroed-sigma-eta-product-widens-eta-dependency"
        : finitePositive(reducedSineWidth) &&
            rawSineWidth > reducedSineWidth &&
            finitePositive(rawDirectWidth) &&
            reducedFullWidth > rawDirectWidth
          ? "reduced-sine-pair-improves-but-full-source-correlation-worsens"
          : "reduced-source-route-open",
  };
}

function reducedSigmaEtaSourceSummary({ rows }) {
  const minRawToReducedSineWidthRatio = Math.min(
    ...rows.map((row) => Number(row.raw_to_reduced_sine_pair_width_ratio))
  );
  const maxRawToReducedSineWidthRatio = Math.max(
    ...rows.map((row) => Number(row.raw_to_reduced_sine_pair_width_ratio))
  );
  const minReducedFullToRawDirectWidthRatio = Math.min(
    ...rows.map((row) => Number(row.reduced_full_to_raw_direct_width_ratio))
  );
  const maxReducedFullToRawDirectWidthRatio = Math.max(
    ...rows.map((row) => Number(row.reduced_full_to_raw_direct_width_ratio))
  );
  const maxRawSumHTailResidue = Math.max(
    ...rows.map((row) => Number(row.raw_sum_h_tail_max_abs_upper))
  );
  const maxSigmaHTail = Math.max(
    ...rows.map((row) => Number(row.sigma_h_tail_max_abs_upper))
  );
  const maxEtaHTail = Math.max(
    ...rows.map((row) => Number(row.eta_h_tail_max_abs_upper))
  );
  return {
    row_count: rows.length,
    min_raw_to_reduced_sine_pair_width_ratio:
      minRawToReducedSineWidthRatio,
    max_raw_to_reduced_sine_pair_width_ratio:
      maxRawToReducedSineWidthRatio,
    min_reduced_full_to_raw_direct_width_ratio:
      minReducedFullToRawDirectWidthRatio,
    max_reduced_full_to_raw_direct_width_ratio:
      maxReducedFullToRawDirectWidthRatio,
    max_raw_sum_h_tail_rounding_residue: maxRawSumHTailResidue,
    max_sigma_h_tail_abs_upper: maxSigmaHTail,
    max_eta_h_tail_abs_upper: maxEtaHTail,
    all_rows_form_sigma_before_h_row_substitution:
      rows.every(
        (row) =>
          row.coordinate_route === "sigma-eta-before-h-row-substitution" &&
          row.h38_solve_target_zeroed === true &&
          row.sigma_h_tail_max_abs_upper === 0 &&
          row.raw_sum_h_tail_max_abs_upper > 0 &&
          row.eta_carries_branch_and_h_rows === true
      ),
    all_rows_reduce_sine_pair_width:
      minRawToReducedSineWidthRatio > 1,
    all_rows_widen_sine_pair_width_after_h38_zeroing:
      maxRawToReducedSineWidthRatio < 1,
    naive_reduced_full_source_widens_every_row:
      minReducedFullToRawDirectWidthRatio > 1,
    route_interpretation:
      maxRawToReducedSineWidthRatio < 1 &&
      minReducedFullToRawDirectWidthRatio > 1
        ? "h38-zeroed-sigma-eta-product-exposes-eta-dependency-blocker"
        : minRawToReducedSineWidthRatio > 1 &&
            minReducedFullToRawDirectWidthRatio > 1
        ? "sigma-eta-sine-reduction-exposes-source-level-correlation-blocker"
        : "sigma-eta-source-route-open",
  };
}

function cloneHIntervals(hIntervals) {
  return hIntervals.map((interval) => [
    Number(interval[0]),
    Number(interval[1]),
  ]);
}

function cloneHIntervalsWithZeroedSolveTarget(hIntervals) {
  const cloned = cloneHIntervals(hIntervals);
  cloned[THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index] = [
    0,
    0,
  ];
  return cloned;
}

function etaTransportHIntervalsForMode({
  baseHIntervals,
  mode,
  activeHIndex = null,
}) {
  const zeroed = cloneHIntervalsWithZeroedSolveTarget(baseHIntervals);
  if (mode === "all-active-reduced-source") {
    return zeroed;
  }
  const frozen = zeroed.map((interval) =>
    pointInterval(intervalMidpoint(interval))
  );
  if (mode === "frozen-eta-h-rows") {
    return frozen;
  }
  if (mode !== "one-active-eta-h-row-replay") {
    throw new Error(`unknown eta transport mode ${mode}`);
  }
  if (
    !Number.isInteger(activeHIndex) ||
    activeHIndex < 0 ||
    activeHIndex >= zeroed.length
  ) {
    throw new Error("activeHIndex must select one h row");
  }
  const replay = frozen.map((interval) => [
    Number(interval[0]),
    Number(interval[1]),
  ]);
  if (
    activeHIndex !==
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index
  ) {
    replay[activeHIndex] = zeroed[activeHIndex];
  }
  replay[THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index] = [
    0,
    0,
  ];
  return replay;
}

function etaTransportHIntervalsWithActiveSet({
  baseHIntervals,
  activeHIndexes,
}) {
  const zeroed = cloneHIntervalsWithZeroedSolveTarget(baseHIntervals);
  const activeSet = new Set(activeHIndexes);
  const replay = zeroed.map((interval, hIndex) =>
    activeSet.has(hIndex)
      ? [Number(interval[0]), Number(interval[1])]
      : pointInterval(intervalMidpoint(interval))
  );
  replay[THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index] = [
    0,
    0,
  ];
  return replay;
}

function etaTransportHIntervalsWithFrozenSet({
  baseHIntervals,
  frozenHIndexes,
}) {
  const zeroed = cloneHIntervalsWithZeroedSolveTarget(baseHIntervals);
  const frozenSet = new Set(frozenHIndexes);
  const replay = zeroed.map((interval, hIndex) =>
    frozenSet.has(hIndex)
      ? pointInterval(intervalMidpoint(interval))
      : [Number(interval[0]), Number(interval[1])]
  );
  replay[THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index] = [
    0,
    0,
  ];
  return replay;
}

function etaTransportHIntervalsWithGraphSet({
  baseHIntervals,
  graphHIntervals,
  graphHIndexes,
  nonGraphMode = "frozen",
}) {
  const graphSet = new Set(graphHIndexes);
  const base =
    nonGraphMode === "all-active"
      ? cloneHIntervalsWithZeroedSolveTarget(baseHIntervals)
      : etaTransportHIntervalsForMode({
          baseHIntervals,
          mode: "frozen-eta-h-rows",
        });
  graphHIndexes.forEach((hIndex) => {
    if (
      hIndex !==
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index
    ) {
      const graphInterval = graphHIntervals[hIndex];
      base[hIndex] = [Number(graphInterval[0]), Number(graphInterval[1])];
    }
  });
  base.forEach((interval, hIndex) => {
    if (
      nonGraphMode === "frozen" &&
      !graphSet.has(hIndex) &&
      hIndex !==
        THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index
    ) {
      base[hIndex] = pointInterval(intervalMidpoint(interval));
    }
  });
  base[THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index] = [
    0,
    0,
  ];
  return base;
}

function reducedSigmaEtaFullSourceReplay({
  context,
  cell,
  branch,
  hIntervals,
  etaTransportMode,
  activeHIndex = null,
}) {
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell,
    branch,
    hIntervals,
  });
  const eta = context.scale(context.subtract(delta, phi), 0.5);
  const sigma = context.constant(
    root.scaleInterval(
      root.addIntervals(cell.delta_fold_interval, cell.phi_fold_interval),
      0.5
    )
  );
  sigma[2] = [-1, -1];
  const deltaFromSigmaEta = context.add(sigma, eta);
  const reducedSinePair = context.scale(
    context.multiply(context.sinSeries(sigma), context.cosSeries(eta)),
    2
  );
  const reducedDeltaSquared = context.scaleByInterval(
    context.power(deltaFromSigmaEta, 2),
    root.inverseSpeedSquaredInterval(cell.speed_interval)
  );
  const reducedFullSource = context.add(
    context.add(reducedDeltaSquared, context.constant(-2)),
    reducedSinePair
  );
  const fullSourceCoefficient = reducedFullSource[H38_NUMERATOR_Y_ORDER];
  const etaHTail = eta.slice(3);
  const sigmaHTailMaxAbsUpper = Math.max(
    0,
    ...sigma.slice(3).map((coefficient) => intervalAbsUpper(coefficient))
  );
  const etaHTailMaxWidth = Math.max(
    0,
    ...etaHTail.map((coefficient) => intervalWidth(coefficient))
  );
  const etaHTailMaxAbsUpper = Math.max(
    0,
    ...etaHTail.map((coefficient) => intervalAbsUpper(coefficient))
  );
  const fullSourceWidth = intervalWidth(fullSourceCoefficient);
  return {
    eta_transport_mode: etaTransportMode,
    ...(activeHIndex === null ? {} : { active_h_index: activeHIndex }),
    h38_solve_target_zeroed:
      hIntervals[THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index]?.[0] ===
        0 &&
      hIntervals[THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index]?.[1] ===
        0,
    coordinate_route: "sigma-eta-before-h-row-substitution",
    sigma_nonzero_orders: [0, 2],
    sigma_h_tail_max_abs_upper: sigmaHTailMaxAbsUpper,
    sigma_y2_coefficient: intervalMidpoint(sigma[2]),
    eta_h_tail_max_width: etaHTailMaxWidth,
    eta_h_tail_max_abs_upper: etaHTailMaxAbsUpper,
    full_source_coefficient_interval: fullSourceCoefficient,
    full_source_width: fullSourceWidth,
    full_source_abs_upper: intervalAbsUpper(fullSourceCoefficient),
  };
}

function etaTransportCouplingRow({
  context,
  row,
  targetSpeedInterval,
  branch,
  topContributorCount,
}) {
  const branchRow = branchRowFor(row, branch);
  const cell = cellFromCertificateRow(row);
  const baseHIntervals = hIntervalsFromBranchRow(branchRow, { hCount: 39 });
  const zeroedHIntervals =
    cloneHIntervalsWithZeroedSolveTarget(baseHIntervals);
  const rawExpression = evaluateH38RecurrenceNumeratorBeforeSolve({
    cell,
    branch,
    branchSign: root.branchSign(branch),
    hIntervals: zeroedHIntervals,
    includeTermDecomposition: true,
  });
  const rawDirectCoefficient = rawExpression.numerator_interval;
  const rawDirectWidth = intervalWidth(rawDirectCoefficient);
  const allActive = reducedSigmaEtaFullSourceReplay({
    context,
    cell,
    branch,
    hIntervals: etaTransportHIntervalsForMode({
      baseHIntervals,
      mode: "all-active-reduced-source",
    }),
    etaTransportMode: "all-active-reduced-source",
  });
  const frozenEta = reducedSigmaEtaFullSourceReplay({
    context,
    cell,
    branch,
    hIntervals: etaTransportHIntervalsForMode({
      baseHIntervals,
      mode: "frozen-eta-h-rows",
    }),
    etaTransportMode: "frozen-eta-h-rows",
  });
  const oneActiveReplays = Array.from({ length: 39 }, (_, hIndex) => {
    const activeHIntervals = etaTransportHIntervalsForMode({
      baseHIntervals,
      mode: "one-active-eta-h-row-replay",
      activeHIndex: hIndex,
    });
    const replay = reducedSigmaEtaFullSourceReplay({
      context,
      cell,
      branch,
      hIntervals: activeHIntervals,
      etaTransportMode: "one-active-eta-h-row-replay",
      activeHIndex: hIndex,
    });
    const activeHInterval = activeHIntervals[hIndex];
    return {
      ...replay,
      active_h_interval: activeHInterval,
      active_h_width: intervalWidth(activeHInterval),
      full_source_width_share_of_all_active: finitePositive(
        allActive.full_source_width
      )
        ? replay.full_source_width / allActive.full_source_width
        : null,
      full_source_width_ratio_to_raw_direct: finitePositive(rawDirectWidth)
        ? replay.full_source_width / rawDirectWidth
        : null,
      full_source_width_ratio_to_frozen_eta: finitePositive(
        frozenEta.full_source_width
      )
        ? replay.full_source_width / frozenEta.full_source_width
        : null,
    };
  });
  const topRows = oneActiveReplays
    .slice()
    .sort(
      (left, right) =>
        Number(right.full_source_width) - Number(left.full_source_width)
    )
    .slice(0, topContributorCount)
    .map((replay, rank) => ({
      rank: rank + 1,
      active_h_index: replay.active_h_index,
      full_source_width: replay.full_source_width,
      full_source_width_share_of_all_active:
        replay.full_source_width_share_of_all_active,
      full_source_width_ratio_to_raw_direct:
        replay.full_source_width_ratio_to_raw_direct,
      active_h_width: replay.active_h_width,
    }));
  const terminalRows = topRows.slice(0, 3);
  const terminalEtaWidthShareOfAll = terminalRows.reduce(
    (sum, replay) =>
      sum + Number(replay.full_source_width_share_of_all_active ?? 0),
    0
  );
  const h38Replay = oneActiveReplays[
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index
  ];
  const h38ReplayMatchesFrozen =
    h38Replay &&
    intervalEndpointRelativeGap(
      h38Replay.full_source_coefficient_interval,
      frozenEta.full_source_coefficient_interval
    ) <= 1e-12;
  const terminalIndexes = terminalRows.map((replay) => replay.active_h_index);
  const terminalEtaRowsDominate =
    terminalIndexes.length === 3 &&
    terminalIndexes[0] === 37 &&
    terminalIndexes[1] === 36 &&
    terminalIndexes[2] === 35 &&
    terminalEtaWidthShareOfAll > 0.95;
  return {
    cell_id: row.cell_id,
    speed_interval: row.speed_interval,
    xi_interval: speedIntervalXiInterval({ row, targetSpeedInterval }),
    xi_midpoint: intervalMidpoint(
      speedIntervalXiInterval({ row, targetSpeedInterval })
    ),
    y_order: H38_NUMERATOR_Y_ORDER,
    branch,
    coordinate_route: "sigma-eta-before-h-row-substitution",
    h38_solve_target_zeroed: true,
    raw_direct_source_coefficient_interval: rawDirectCoefficient,
    raw_direct_source_width: rawDirectWidth,
    raw_direct_source_abs_upper: intervalAbsUpper(rawDirectCoefficient),
    all_active_reduced_source: allActive,
    frozen_eta_h_rows: frozenEta,
    one_active_eta_h_row_replays: oneActiveReplays,
    top_eta_transport_width_rows: topRows,
    terminal_eta_h_indexes: terminalIndexes,
    terminal_eta_transport_width_share_of_all:
      terminalEtaWidthShareOfAll,
    terminal_eta_rows_dominate: terminalEtaRowsDominate,
    h38_one_active_replay_matches_frozen: h38ReplayMatchesFrozen,
    all_active_to_raw_direct_width_ratio: finitePositive(rawDirectWidth)
      ? allActive.full_source_width / rawDirectWidth
      : null,
    frozen_to_raw_direct_width_ratio: finitePositive(rawDirectWidth)
      ? frozenEta.full_source_width / rawDirectWidth
      : null,
    all_active_width_dominates_one_active_replays:
      oneActiveReplays.every(
        (replay) =>
          allActive.full_source_width >=
          replay.full_source_width * (1 - 1e-12)
      ),
    eta_transport_width_interpretation: terminalEtaRowsDominate
      ? "terminal-h37-h36-h35-dominate-eta-transport-width"
      : "eta-transport-width-not-terminal-localized",
  };
}

function etaTransportCouplingSummary({ rows }) {
  const allActiveToRawRatios = rows.map((row) =>
    Number(row.all_active_to_raw_direct_width_ratio)
  );
  const frozenToRawRatios = rows.map((row) =>
    Number(row.frozen_to_raw_direct_width_ratio)
  );
  const terminalShares = rows.map((row) =>
    Number(row.terminal_eta_transport_width_share_of_all)
  );
  const dominantH37Shares = rows.map((row) =>
    Number(
      row.top_eta_transport_width_rows.find(
        (candidate) => candidate.active_h_index === 37
      )?.full_source_width_share_of_all_active
    )
  );
  return {
    row_count: rows.length,
    h_row_count: 39,
    one_active_replay_count: rows.reduce(
      (sum, row) => sum + row.one_active_eta_h_row_replays.length,
      0
    ),
    all_rows_positive_xi_stencil: rows.every(
      (row) =>
        Number(row.xi_interval?.[0]) > 0 && Number(row.xi_interval?.[1]) > 0
    ),
    all_rows_h38_solve_target_zeroed: rows.every(
      (row) =>
        row.h38_solve_target_zeroed === true &&
        row.all_active_reduced_source.h38_solve_target_zeroed === true &&
        row.frozen_eta_h_rows.h38_solve_target_zeroed === true &&
        row.one_active_eta_h_row_replays.every(
          (replay) => replay.h38_solve_target_zeroed === true
        )
    ),
    all_rows_form_sigma_before_h_row_substitution: rows.every(
      (row) =>
        row.coordinate_route === "sigma-eta-before-h-row-substitution" &&
        row.all_active_reduced_source.sigma_h_tail_max_abs_upper === 0 &&
        row.frozen_eta_h_rows.sigma_h_tail_max_abs_upper === 0 &&
        row.all_active_reduced_source.sigma_y2_coefficient === -1 &&
        row.frozen_eta_h_rows.sigma_y2_coefficient === -1
    ),
    frozen_eta_h_rows_are_narrower_than_all_active_every_row: rows.every(
      (row) =>
        row.frozen_eta_h_rows.eta_h_tail_max_width <
          row.all_active_reduced_source.eta_h_tail_max_width * 1e-20 &&
        row.all_active_reduced_source.eta_h_tail_max_width > 0 &&
        row.frozen_eta_h_rows.full_source_width <
          row.all_active_reduced_source.full_source_width
    ),
    one_active_replays_cover_h0_through_h38: rows.every((row) =>
      row.one_active_eta_h_row_replays.every(
        (replay, index) => replay.active_h_index === index
      )
    ),
    h38_one_active_replay_matches_frozen: rows.every(
      (row) => row.h38_one_active_replay_matches_frozen === true
    ),
    all_active_width_dominates_one_active_replays: rows.every(
      (row) => row.all_active_width_dominates_one_active_replays === true
    ),
    terminal_eta_h_indexes: [37, 36, 35],
    all_rows_terminal_eta_rows_dominate: rows.every(
      (row) => row.terminal_eta_rows_dominate === true
    ),
    min_top3_eta_transport_width_share_of_all: Math.min(...terminalShares),
    max_top3_eta_transport_width_share_of_all: Math.max(...terminalShares),
    min_h37_eta_transport_width_share_of_all:
      Math.min(...dominantH37Shares),
    max_h37_eta_transport_width_share_of_all:
      Math.max(...dominantH37Shares),
    min_all_active_to_raw_direct_width_ratio:
      Math.min(...allActiveToRawRatios),
    max_all_active_to_raw_direct_width_ratio:
      Math.max(...allActiveToRawRatios),
    max_frozen_to_raw_direct_width_ratio: Math.max(...frozenToRawRatios),
    route_interpretation:
      rows.every((row) => row.terminal_eta_rows_dominate === true) &&
      Math.max(...frozenToRawRatios) < 1e-12
        ? "terminal-eta-transport-rows-dominate-reduced-source-width"
        : "eta-transport-replay-localizes-width-but-does-not-certify-source-closure",
  };
}

function terminalEtaGraphRow({
  context,
  row,
  targetSpeedInterval,
  branch,
  transportProfile,
  residualProfile,
  terminalHIndexes,
  topContributorCount,
}) {
  const couplingRow = etaTransportCouplingRow({
    context,
    row,
    targetSpeedInterval,
    branch,
    topContributorCount,
  });
  const branchRow = branchRowFor(row, branch);
  const cell = cellFromCertificateRow(row);
  const baseHIntervals = hIntervalsFromBranchRow(branchRow, { hCount: 39 });
  const terminalSet = new Set(terminalHIndexes);
  const nonterminalHIndexes = Array.from({ length: 39 }, (_, index) => index)
    .filter(
      (hIndex) =>
        !terminalSet.has(hIndex) &&
        hIndex !==
          THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index
    );
  const terminalReplay = reducedSigmaEtaFullSourceReplay({
    context,
    cell,
    branch,
    hIntervals: etaTransportHIntervalsWithActiveSet({
      baseHIntervals,
      activeHIndexes: terminalHIndexes,
    }),
    etaTransportMode: "terminal-active-eta-h-row-replay",
  });
  const nonterminalReplay = reducedSigmaEtaFullSourceReplay({
    context,
    cell,
    branch,
    hIntervals: etaTransportHIntervalsWithActiveSet({
      baseHIntervals,
      activeHIndexes: nonterminalHIndexes,
    }),
    etaTransportMode: "nonterminal-active-eta-h-row-replay",
  });
  const graphHIntervals = hIntervalsForPolynomialGraphInterval({
    transportProfile,
    noiseInterval: couplingRow.xi_interval,
  });
  const terminalGraphFrozenReplay = reducedSigmaEtaFullSourceReplay({
    context,
    cell,
    branch,
    hIntervals: etaTransportHIntervalsWithGraphSet({
      baseHIntervals,
      graphHIntervals,
      graphHIndexes: terminalHIndexes,
      nonGraphMode: "frozen",
    }),
    etaTransportMode: "terminal-polynomial-graph-frozen-nonterminal-replay",
  });
  const terminalGraphWithNonterminalReplay = reducedSigmaEtaFullSourceReplay({
    context,
    cell,
    branch,
    hIntervals: etaTransportHIntervalsWithGraphSet({
      baseHIntervals,
      graphHIntervals,
      graphHIndexes: terminalHIndexes,
      nonGraphMode: "all-active",
    }),
    etaTransportMode: "terminal-polynomial-graph-active-nonterminal-replay",
  });
  const residualHIntervals = residualProfile
    ? hIntervalsForPolynomialGraphPlusIntervalResidual({
        transportProfile,
        noiseInterval: couplingRow.xi_interval,
        residualProfile,
      })
    : null;
  const terminalGraphIntervalResidualReplay = residualHIntervals
    ? reducedSigmaEtaFullSourceReplay({
        context,
        cell,
        branch,
        hIntervals: etaTransportHIntervalsWithGraphSet({
          baseHIntervals,
          graphHIntervals: residualHIntervals,
          graphHIndexes: terminalHIndexes,
          nonGraphMode: "frozen",
        }),
        etaTransportMode:
          "terminal-polynomial-graph-interval-residual-frozen-nonterminal-replay",
      })
    : null;
  const allActiveWidth =
    couplingRow.all_active_reduced_source.full_source_width;
  const terminalWidth = terminalReplay.full_source_width;
  const nonterminalWidth = nonterminalReplay.full_source_width;
  const graphFrozenWidth = terminalGraphFrozenReplay.full_source_width;
  const graphWithNonterminalWidth =
    terminalGraphWithNonterminalReplay.full_source_width;
  const graphIntervalResidualWidth =
    terminalGraphIntervalResidualReplay?.full_source_width ?? null;
  const zeroedBaseHIntervals = cloneHIntervalsWithZeroedSolveTarget(baseHIntervals);
  const terminalGraphIntervals = terminalHIndexes.map((hIndex) => ({
    h_index: hIndex,
    polynomial_degree:
      transportProfile[hIndex]?.polynomial_degree ?? null,
    graph_interval: graphHIntervals[hIndex],
    graph_width: intervalWidth(graphHIntervals[hIndex]),
    producer_interval_width: intervalWidth(
      zeroedBaseHIntervals[hIndex]
    ),
    graph_to_producer_width_ratio: finitePositive(
      intervalWidth(zeroedBaseHIntervals[hIndex])
    )
      ? intervalWidth(graphHIntervals[hIndex]) /
        intervalWidth(zeroedBaseHIntervals[hIndex])
      : null,
    ...(residualHIntervals
      ? {
          graph_plus_interval_residual_interval: residualHIntervals[hIndex],
          graph_plus_interval_residual_width:
            intervalWidth(residualHIntervals[hIndex]),
          interval_residual_width_ratio_to_producer: finitePositive(
            intervalWidth(zeroedBaseHIntervals[hIndex])
          )
            ? intervalWidth(residualHIntervals[hIndex]) /
              intervalWidth(zeroedBaseHIntervals[hIndex])
            : null,
        }
      : {}),
  }));
  return {
    ...couplingRow,
    terminal_provider_h_indexes: terminalHIndexes,
    nonterminal_provider_h_indexes: nonterminalHIndexes,
    nonterminal_provider_h_indexes_exclude_terminal:
      nonterminalHIndexes.every((hIndex) => !terminalSet.has(hIndex)),
    terminal_replay: terminalReplay,
    nonterminal_replay: nonterminalReplay,
    terminal_graph_replay: terminalGraphFrozenReplay,
    terminal_graph_with_nonterminal_replay:
      terminalGraphWithNonterminalReplay,
    ...(terminalGraphIntervalResidualReplay
      ? {
          terminal_graph_interval_residual_replay:
            terminalGraphIntervalResidualReplay,
        }
      : {}),
    terminal_graph_intervals: terminalGraphIntervals,
    terminal_width_share_of_all: finitePositive(allActiveWidth)
      ? terminalWidth / allActiveWidth
      : null,
    nonterminal_width_share_of_all: finitePositive(allActiveWidth)
      ? nonterminalWidth / allActiveWidth
      : null,
    terminal_plus_nonterminal_width_share_of_all: finitePositive(
      allActiveWidth
    )
      ? (terminalWidth + nonterminalWidth) / allActiveWidth
      : null,
    terminal_graph_width_share_of_terminal: finitePositive(terminalWidth)
      ? graphFrozenWidth / terminalWidth
      : null,
    terminal_graph_width_share_of_all: finitePositive(allActiveWidth)
      ? graphFrozenWidth / allActiveWidth
      : null,
    terminal_graph_with_nonterminal_width_share_of_all: finitePositive(
      allActiveWidth
    )
      ? graphWithNonterminalWidth / allActiveWidth
      : null,
    terminal_graph_interval_residual_width_share_of_terminal:
      finitePositive(terminalWidth) && finitePositive(graphIntervalResidualWidth)
        ? graphIntervalResidualWidth / terminalWidth
        : null,
    terminal_graph_interval_residual_width_share_of_all:
      finitePositive(allActiveWidth) && finitePositive(graphIntervalResidualWidth)
        ? graphIntervalResidualWidth / allActiveWidth
        : null,
    terminal_graph_reduces_terminal_width:
      finitePositive(terminalWidth) && graphFrozenWidth < terminalWidth,
    terminal_graph_with_nonterminal_below_nonterminal_wall:
      finitePositive(allActiveWidth) &&
      graphWithNonterminalWidth / allActiveWidth < 0.1,
    terminal_interval_residual_recreates_terminal_width:
      finitePositive(terminalWidth) &&
      finitePositive(graphIntervalResidualWidth) &&
      graphIntervalResidualWidth / terminalWidth > 0.9,
    terminal_eta_graph_route_interpretation:
      finitePositive(allActiveWidth) &&
      terminalWidth / allActiveWidth > 0.95 &&
      graphFrozenWidth / terminalWidth < 1e-6
        ? "terminal-polynomial-graph-collapses-terminal-eta-width-candidate"
        : "terminal-polynomial-graph-route-open",
  };
}

function hIntervalsForPolynomialGraphPlusScaledSymmetricResidual({
  transportProfile,
  noiseInterval,
  residualProfile,
  residualHIndexes,
  residualScale,
}) {
  const resolvedResidualScale = Number(residualScale);
  if (!Number.isFinite(resolvedResidualScale) || resolvedResidualScale < 0) {
    throw new Error("residualScale must be finite and nonnegative");
  }
  const residualSet = new Set(residualHIndexes);
  const graphIntervals = hIntervalsForPolynomialGraphInterval({
    transportProfile,
    noiseInterval,
  });
  return graphIntervals.map((interval, hIndex) => {
    if (!residualSet.has(hIndex)) {
      return interval;
    }
    const residualRadius =
      Number(residualProfile?.[hIndex]?.max_abs_residual ?? 0) *
      resolvedResidualScale;
    return [
      Number(interval[0]) - residualRadius,
      Number(interval[1]) + residualRadius,
    ];
  });
}

function hIntervalsForTerminalGraphSharedResidualPoint({
  baseHIntervals,
  transportProfile,
  xiCoordinate,
  residualProfile,
  terminalHIndexes,
  residualNoise,
  nonterminalMode = "all-active",
}) {
  const resolvedResidualNoise = Number(residualNoise);
  if (!Number.isFinite(resolvedResidualNoise)) {
    throw new Error("residualNoise must be finite");
  }
  const replay =
    nonterminalMode === "all-active"
      ? cloneHIntervalsWithZeroedSolveTarget(baseHIntervals)
      : etaTransportHIntervalsForMode({
          baseHIntervals,
          mode: "frozen-eta-h-rows",
        });
  terminalHIndexes.forEach((hIndex) => {
    if (
      hIndex ===
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index
    ) {
      return;
    }
    const residualInterval =
      residualProfile?.[hIndex]?.residual_interval_hull ?? [0, 0];
    const residualCenter = intervalMidpoint(residualInterval);
    const residualRadius = intervalWidth(residualInterval) / 2;
    replay[hIndex] = pointInterval(
      polynomialValue(
        transportProfile[hIndex].coefficients,
        Number(xiCoordinate)
      ) +
        residualCenter +
        resolvedResidualNoise * residualRadius
    );
  });
  replay[THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index] = [
    0,
    0,
  ];
  return replay;
}

function hIntervalsForTerminalGraphSharedResidualInterval({
  baseHIntervals,
  transportProfile,
  xiInterval = null,
  xiCoordinate = null,
  residualProfile,
  terminalHIndexes,
  residualNoiseInterval,
  nonterminalMode = "all-active",
}) {
  if (!Array.isArray(xiInterval) && !Number.isFinite(Number(xiCoordinate))) {
    throw new Error("xiInterval or finite xiCoordinate is required");
  }
  const resolvedResidualNoiseInterval = numericOrderedInterval(
    "residualNoiseInterval",
    residualNoiseInterval
  );
  const replay =
    nonterminalMode === "all-active"
      ? cloneHIntervalsWithZeroedSolveTarget(baseHIntervals)
      : etaTransportHIntervalsForMode({
          baseHIntervals,
          mode: "frozen-eta-h-rows",
        });
  terminalHIndexes.forEach((hIndex) => {
    if (
      hIndex ===
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index
    ) {
      return;
    }
    const graphInterval = Array.isArray(xiInterval)
      ? polynomialRangeOnInterval({
          coefficients: transportProfile[hIndex].coefficients,
          interval: xiInterval,
        })
      : pointInterval(
          polynomialValue(
            transportProfile[hIndex].coefficients,
            Number(xiCoordinate)
          )
        );
    const residualInterval =
      residualProfile?.[hIndex]?.residual_interval_hull ?? [0, 0];
    const residualCenter = intervalMidpoint(residualInterval);
    const residualRadius = intervalWidth(residualInterval) / 2;
    const residualContribution = [
      residualCenter + resolvedResidualNoiseInterval[0] * residualRadius,
      residualCenter + resolvedResidualNoiseInterval[1] * residualRadius,
    ];
    replay[hIndex] = [
      Number(graphInterval[0]) + residualContribution[0],
      Number(graphInterval[1]) + residualContribution[1],
    ];
  });
  replay[THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index] = [
    0,
    0,
  ];
  return replay;
}

function residualCoordinatePartitions(partitionCount) {
  const resolvedPartitionCount = assertFinitePositiveInteger(
    "residualCoordinatePartitionCount",
    partitionCount
  );
  return Array.from({ length: resolvedPartitionCount }, (_, index) => {
    const left = -1 + (2 * index) / resolvedPartitionCount;
    const right = -1 + (2 * (index + 1)) / resolvedPartitionCount;
    return [left, right];
  });
}

function terminalSharedResidualZetaDegreeBound({
  terminalHIndexes,
  targetYOrder,
}) {
  const terminalYOrders = terminalHIndexes.map((hIndex) => Number(hIndex) + 3);
  const minTerminalYOrder = Math.min(...terminalYOrders);
  const twoTerminalFactorMinYOrder = 2 * minTerminalYOrder;
  const maxSharedResidualPower = Math.floor(
    Number(targetYOrder) / minTerminalYOrder
  );
  return {
    source_coefficient_y_order: Number(targetYOrder),
    terminal_h_indexes: terminalHIndexes.map(Number),
    terminal_y_orders: terminalYOrders,
    min_terminal_y_order: minTerminalYOrder,
    two_terminal_factor_min_y_order: twoTerminalFactorMinYOrder,
    max_shared_residual_power_by_y_order: maxSharedResidualPower,
    affine_in_shared_residual_coordinate:
      maxSharedResidualPower <= 1 &&
      twoTerminalFactorMinYOrder > Number(targetYOrder),
    endpoint_control_reason:
      maxSharedResidualPower <= 1 &&
      twoTerminalFactorMinYOrder > Number(targetYOrder)
        ? "terminal residual factors can occur at most once in the y-order source coefficient"
        : "terminal residual factors may occur more than once at this y order",
    endpoint_hull_control_formula:
      "If F(zeta)=A*zeta+B with interval A and B, the hull over a zeta slice is attained by the two scalar slice endpoints.",
    route_interpretation:
      maxSharedResidualPower <= 1 &&
      twoTerminalFactorMinYOrder > Number(targetYOrder)
        ? "shared-terminal-residual-zeta-affine-by-y-order-gap"
        : "shared-terminal-residual-zeta-degree-open",
  };
}

function affineZetaEndpointEnvelope({
  residualNoiseInterval,
  leftCoefficientInterval,
  rightCoefficientInterval,
}) {
  const zetaInterval = numericInterval(
    "residualNoiseInterval",
    residualNoiseInterval
  );
  const zetaWidth = zetaInterval[1] - zetaInterval[0];
  const slopeInterval = root.divideIntervals(
    root.subtractIntervals(rightCoefficientInterval, leftCoefficientInterval),
    [zetaWidth, zetaWidth]
  );
  const interceptFromLeft = root.subtractIntervals(
    leftCoefficientInterval,
    root.scaleInterval(slopeInterval, zetaInterval[0])
  );
  const interceptFromRight = root.subtractIntervals(
    rightCoefficientInterval,
    root.scaleInterval(slopeInterval, zetaInterval[1])
  );
  const interceptInterval = intervalHull([
    interceptFromLeft,
    interceptFromRight,
  ]);
  const endpointHull = intervalHull([
    leftCoefficientInterval,
    rightCoefficientInterval,
  ]);
  return {
    zeta_interval: zetaInterval,
    zeta_width: zetaWidth,
    endpoint_coefficient_intervals: {
      left: leftCoefficientInterval,
      right: rightCoefficientInterval,
    },
    slope_interval: slopeInterval,
    slope_abs_upper: intervalAbsUpper(slopeInterval),
    intercept_interval: interceptInterval,
    endpoint_hull: endpointHull,
    endpoint_hull_width: intervalWidth(endpointHull),
    affine_endpoint_range_control:
      "affine-in-zeta y-order gap reduces each slice image to its two zeta endpoints",
  };
}

function terminalGraphSharedResidualPartitionDiagnostic({
  context,
  cell,
  branch,
  baseHIntervals,
  transportProfile,
  xiInterval = null,
  xiCoordinate = null,
  residualProfile,
  terminalHIndexes,
  residualCoordinatePartitionCount,
  allActiveWidth,
  targetWidth,
  xiMode,
}) {
  const zetaDegreeBound = terminalSharedResidualZetaDegreeBound({
    terminalHIndexes,
    targetYOrder: H38_NUMERATOR_Y_ORDER,
  });
  const partitionIntervals = residualCoordinatePartitions(
    residualCoordinatePartitionCount
  );
  const partitionReplays = partitionIntervals.map(
    (residualNoiseInterval, partitionIndex) => {
      const replay = reducedSigmaEtaFullSourceReplay({
        context,
        cell,
        branch,
        hIntervals: hIntervalsForTerminalGraphSharedResidualInterval({
          baseHIntervals,
          transportProfile,
          xiInterval,
          xiCoordinate,
          residualProfile,
          terminalHIndexes,
          residualNoiseInterval,
          nonterminalMode: "all-active",
        }),
        etaTransportMode:
          "terminal-polynomial-graph-shared-residual-partition-active-nonterminal-replay",
      });
      return {
        partition_index: partitionIndex,
        residual_noise_interval: residualNoiseInterval,
        replay,
        full_source_width: replay.full_source_width,
        full_source_width_share_of_all: finitePositive(allActiveWidth)
          ? replay.full_source_width / Number(allActiveWidth)
          : null,
        under_target:
          finitePositive(targetWidth) &&
          replay.full_source_width < Number(targetWidth),
      };
    }
  );
  const partitionWidths = partitionReplays.map((partition) =>
    Number(partition.replay.full_source_width)
  );
  const maxPartitionWidth =
    partitionWidths.length > 0 ? Math.max(...partitionWidths) : null;
  const partitionCoefficientHull = intervalHull(
    partitionReplays.map(
      (partition) => partition.replay.full_source_coefficient_interval
    )
  );
  const partitionCoefficientHullWidth = intervalWidth(
    partitionCoefficientHull
  );
  return {
    xi_mode: xiMode,
    xi_coordinate: xiCoordinate === null ? null : Number(xiCoordinate),
    xi_interval: Array.isArray(xiInterval)
      ? [Number(xiInterval[0]), Number(xiInterval[1])]
      : null,
    residual_coordinate:
      "shared zeta partition in h_i(xi,zeta)=q_i(xi)+center_i+zeta*radius_i for i in {37,36,35}",
    terminal_zeta_degree_bound: zetaDegreeBound,
    affine_in_shared_residual_coordinate:
      zetaDegreeBound.affine_in_shared_residual_coordinate,
    residual_coordinate_partition_count: Number(
      residualCoordinatePartitionCount
    ),
    residual_noise_partition_intervals: partitionIntervals,
    partition_replays: partitionReplays,
    max_partition_width: maxPartitionWidth,
    max_partition_width_share_of_all:
      finitePositive(maxPartitionWidth) && finitePositive(allActiveWidth)
        ? maxPartitionWidth / Number(allActiveWidth)
        : null,
    all_partitions_under_target:
      finitePositive(targetWidth) &&
      partitionWidths.every((width) => width < Number(targetWidth)),
    partition_coefficient_hull: partitionCoefficientHull,
    partition_coefficient_hull_width: partitionCoefficientHullWidth,
    partition_coefficient_hull_width_share_of_all:
      finitePositive(partitionCoefficientHullWidth) &&
      finitePositive(allActiveWidth)
        ? partitionCoefficientHullWidth / Number(allActiveWidth)
        : null,
    partition_coefficient_hull_under_target:
      finitePositive(targetWidth) &&
      partitionCoefficientHullWidth < Number(targetWidth),
    route_interpretation:
      finitePositive(targetWidth) &&
      partitionWidths.every((width) => width < Number(targetWidth))
        ? "shared-terminal-residual-coordinate-partition-slices-under-target"
        : "shared-terminal-residual-coordinate-partition-slices-over-target",
  };
}

function terminalGraphSharedResidualEndpointPartitionDiagnostic({
  context,
  cell,
  branch,
  baseHIntervals,
  transportProfile,
  xiInterval = null,
  xiCoordinate = null,
  residualProfile,
  terminalHIndexes,
  residualCoordinatePartitionCount,
  allActiveWidth,
  targetWidth,
  xiMode,
}) {
  const zetaDegreeBound = terminalSharedResidualZetaDegreeBound({
    terminalHIndexes,
    targetYOrder: H38_NUMERATOR_Y_ORDER,
  });
  const partitionIntervals = residualCoordinatePartitions(
    residualCoordinatePartitionCount
  );
  const partitionReplays = partitionIntervals.map(
    (residualNoiseInterval, partitionIndex) => {
      const hIntervalsForResidualNoise = (residualNoise) =>
        Array.isArray(xiInterval)
          ? hIntervalsForTerminalGraphSharedResidualInterval({
              baseHIntervals,
              transportProfile,
              xiInterval,
              residualProfile,
              terminalHIndexes,
              residualNoiseInterval: [residualNoise, residualNoise],
              nonterminalMode: "all-active",
            })
          : hIntervalsForTerminalGraphSharedResidualPoint({
              baseHIntervals,
              transportProfile,
              xiCoordinate,
              residualProfile,
              terminalHIndexes,
              residualNoise,
              nonterminalMode: "all-active",
            });
      const endpointReplays = residualNoiseInterval.map((residualNoise) => {
        const hIntervals = hIntervalsForResidualNoise(residualNoise);
        return {
          residual_noise: Number(residualNoise),
          replay: reducedSigmaEtaFullSourceReplay({
            context,
            cell,
            branch,
            hIntervals,
            etaTransportMode:
              "terminal-polynomial-graph-shared-residual-endpoint-partition-active-nonterminal-replay",
          }),
        };
      });
      const coefficientHull = intervalHull(
        endpointReplays.map(
          (endpoint) => endpoint.replay.full_source_coefficient_interval
        )
      );
      const coefficientHullWidth = intervalWidth(coefficientHull);
      const affineEnvelope = affineZetaEndpointEnvelope({
        residualNoiseInterval,
        leftCoefficientInterval:
          endpointReplays[0].replay.full_source_coefficient_interval,
        rightCoefficientInterval:
          endpointReplays[1].replay.full_source_coefficient_interval,
      });
      const residualNoiseMidpoint = intervalMidpoint(residualNoiseInterval);
      const midpointReplay = reducedSigmaEtaFullSourceReplay({
        context,
        cell,
        branch,
        hIntervals: hIntervalsForResidualNoise(residualNoiseMidpoint),
        etaTransportMode:
          "terminal-polynomial-graph-shared-residual-midpoint-partition-active-nonterminal-replay",
      });
      const midpointLinearPredictionInterval = root.addIntervals(
        root.scaleInterval(
          affineEnvelope.slope_interval,
          residualNoiseMidpoint
        ),
        affineEnvelope.intercept_interval
      );
      const midpointLinearityGapInterval = root.subtractIntervals(
        midpointReplay.full_source_coefficient_interval,
        midpointLinearPredictionInterval
      );
      return {
        partition_index: partitionIndex,
        residual_noise_interval: residualNoiseInterval,
        endpoint_replays: endpointReplays,
        midpoint_replay: {
          residual_noise: residualNoiseMidpoint,
          replay: midpointReplay,
        },
        midpoint_linear_prediction_interval:
          midpointLinearPredictionInterval,
        midpoint_linearity_gap_interval: midpointLinearityGapInterval,
        midpoint_linearity_gap_abs_upper: intervalAbsUpper(
          midpointLinearityGapInterval
        ),
        midpoint_linearity_check_passed:
          intervalContainsZero(midpointLinearityGapInterval),
        endpoint_coefficient_hull: coefficientHull,
        endpoint_coefficient_hull_width: coefficientHullWidth,
        endpoint_coefficient_hull_width_share_of_all: finitePositive(
          allActiveWidth
        )
          ? coefficientHullWidth / Number(allActiveWidth)
          : null,
        affine_zeta_envelope: affineEnvelope,
        affine_zeta_envelope_width_share_of_all:
          finitePositive(affineEnvelope.endpoint_hull_width) &&
          finitePositive(allActiveWidth)
            ? affineEnvelope.endpoint_hull_width / Number(allActiveWidth)
            : null,
        affine_zeta_envelope_under_target:
          finitePositive(targetWidth) &&
          affineEnvelope.endpoint_hull_width < Number(targetWidth),
        endpoint_hull_under_target:
          finitePositive(targetWidth) &&
          coefficientHullWidth < Number(targetWidth),
      };
    }
  );
  const endpointHullWidths = partitionReplays.map((partition) =>
    Number(partition.endpoint_coefficient_hull_width)
  );
  const affineEnvelopeWidths = partitionReplays.map((partition) =>
    Number(partition.affine_zeta_envelope?.endpoint_hull_width)
  );
  const affineEnvelopeSlopeAbsUppers = partitionReplays.map((partition) =>
    Number(partition.affine_zeta_envelope?.slope_abs_upper)
  );
  const maxEndpointHullWidth =
    endpointHullWidths.length > 0 ? Math.max(...endpointHullWidths) : null;
  const maxAffineEnvelopeWidth =
    affineEnvelopeWidths.length > 0
      ? Math.max(...affineEnvelopeWidths)
      : null;
  const maxAffineEnvelopeSlopeAbsUpper =
    affineEnvelopeSlopeAbsUppers.length > 0
      ? Math.max(...affineEnvelopeSlopeAbsUppers)
      : null;
  return {
    xi_mode: xiMode,
    xi_coordinate: xiCoordinate === null ? null : Number(xiCoordinate),
    xi_interval: Array.isArray(xiInterval)
      ? [Number(xiInterval[0]), Number(xiInterval[1])]
      : null,
    residual_coordinate:
      "shared zeta endpoint partition in h_i(xi,zeta)=q_i(xi)+center_i+zeta*radius_i for i in {37,36,35}",
    terminal_zeta_degree_bound: zetaDegreeBound,
    affine_in_shared_residual_coordinate:
      zetaDegreeBound.affine_in_shared_residual_coordinate,
    endpoint_control_candidate:
      zetaDegreeBound.affine_in_shared_residual_coordinate === true,
    residual_coordinate_partition_count: Number(
      residualCoordinatePartitionCount
    ),
    residual_noise_partition_intervals: partitionIntervals,
    partition_replays: partitionReplays,
    max_endpoint_partition_hull_width: maxEndpointHullWidth,
    max_endpoint_partition_hull_width_share_of_all:
      finitePositive(maxEndpointHullWidth) && finitePositive(allActiveWidth)
        ? maxEndpointHullWidth / Number(allActiveWidth)
        : null,
    max_affine_zeta_envelope_width: maxAffineEnvelopeWidth,
    max_affine_zeta_envelope_width_share_of_all:
      finitePositive(maxAffineEnvelopeWidth) && finitePositive(allActiveWidth)
        ? maxAffineEnvelopeWidth / Number(allActiveWidth)
        : null,
    max_affine_zeta_envelope_slope_abs_upper:
      maxAffineEnvelopeSlopeAbsUpper,
    all_endpoint_partition_hulls_under_target:
      finitePositive(targetWidth) &&
      endpointHullWidths.every((width) => width < Number(targetWidth)),
    all_affine_zeta_envelopes_under_target:
      finitePositive(targetWidth) &&
      affineEnvelopeWidths.every((width) => width < Number(targetWidth)),
    route_interpretation:
      finitePositive(targetWidth) &&
      endpointHullWidths.every((width) => width < Number(targetWidth)) &&
      affineEnvelopeWidths.every((width) => width < Number(targetWidth)) &&
      zetaDegreeBound.affine_in_shared_residual_coordinate === true
        ? "shared-terminal-residual-coordinate-affine-endpoint-partitions-under-target"
        : finitePositive(targetWidth) &&
            endpointHullWidths.every((width) => width < Number(targetWidth))
          ? "shared-terminal-residual-coordinate-endpoint-partitions-under-target"
        : "shared-terminal-residual-coordinate-endpoint-partitions-over-target",
  };
}

function terminalGraphSharedResidualSampleDiagnostic({
  context,
  cell,
  branch,
  baseHIntervals,
  transportProfile,
  xiCoordinate,
  residualProfile,
  terminalHIndexes,
  residualNoiseSamples,
  allActiveWidth,
  targetWidth,
  independentIntervalResidualWidth,
}) {
  const sampleReplays = residualNoiseSamples.map((residualNoise) => ({
    residual_noise: Number(residualNoise),
    replay: reducedSigmaEtaFullSourceReplay({
      context,
      cell,
      branch,
      hIntervals: hIntervalsForTerminalGraphSharedResidualPoint({
        baseHIntervals,
        transportProfile,
        xiCoordinate,
        residualProfile,
        terminalHIndexes,
        residualNoise,
        nonterminalMode: "all-active",
      }),
      etaTransportMode:
        "terminal-polynomial-graph-shared-residual-active-nonterminal-sample",
    }),
  }));
  const sampleCoefficientHull = intervalHull(
    sampleReplays.map((sample) => sample.replay.full_source_coefficient_interval)
  );
  const sampleHullWidth = intervalWidth(sampleCoefficientHull);
  const sampleReplayWidths = sampleReplays.map((sample) =>
    Number(sample.replay.full_source_width)
  );
  const maxSampleReplayWidth = Math.max(...sampleReplayWidths);
  const residualCoordinateVariationWidth = Math.max(
    0,
    sampleHullWidth - maxSampleReplayWidth
  );
  const residualCoordinateTargetSlack =
    Number(targetWidth) - maxSampleReplayWidth;
  const projectedResidualCoordinatePartitionCount =
    finitePositive(residualCoordinateVariationWidth) &&
    finitePositive(residualCoordinateTargetSlack)
      ? Math.ceil(
          residualCoordinateVariationWidth /
            residualCoordinateTargetSlack
        )
      : null;
  const projectedPartitionedHullWidth =
    finitePositive(projectedResidualCoordinatePartitionCount)
      ? maxSampleReplayWidth +
        residualCoordinateVariationWidth /
          projectedResidualCoordinatePartitionCount
      : null;
  return {
    residual_coordinate:
      "shared zeta in h_i(xi,zeta)=q_i(xi)+center_i+zeta*radius_i for i in {37,36,35}",
    xi_coordinate: Number(xiCoordinate),
    residual_noise_samples: residualNoiseSamples.map(Number),
    sample_replays: sampleReplays,
    sample_coefficient_hull: sampleCoefficientHull,
    sample_coefficient_hull_width: sampleHullWidth,
    sample_coefficient_hull_width_share_of_all: finitePositive(allActiveWidth)
      ? sampleHullWidth / Number(allActiveWidth)
      : null,
    sample_coefficient_hull_under_target:
      finitePositive(targetWidth) && sampleHullWidth < Number(targetWidth),
    max_sample_replay_width: maxSampleReplayWidth,
    max_sample_replay_width_share_of_all: finitePositive(allActiveWidth)
      ? maxSampleReplayWidth / Number(allActiveWidth)
      : null,
    residual_coordinate_variation_width: residualCoordinateVariationWidth,
    residual_coordinate_variation_width_share_of_all: finitePositive(
      allActiveWidth
    )
      ? residualCoordinateVariationWidth / Number(allActiveWidth)
      : null,
    projected_residual_coordinate_partition_count_for_target:
      projectedResidualCoordinatePartitionCount,
    projected_residual_coordinate_partitioned_hull_width:
      projectedPartitionedHullWidth,
    projected_residual_coordinate_partitioned_hull_width_share_of_all:
      finitePositive(projectedPartitionedHullWidth) &&
      finitePositive(allActiveWidth)
        ? projectedPartitionedHullWidth / Number(allActiveWidth)
        : null,
    sample_hull_to_independent_interval_residual_width_ratio:
      finitePositive(independentIntervalResidualWidth)
        ? sampleHullWidth / Number(independentIntervalResidualWidth)
        : null,
    route_interpretation:
      finitePositive(targetWidth) &&
      sampleHullWidth < Number(targetWidth) &&
      finitePositive(independentIntervalResidualWidth) &&
      Number(independentIntervalResidualWidth) > Number(targetWidth)
        ? "shared-terminal-residual-coordinate-collapses-independent-hull-artifact"
        : finitePositive(projectedPartitionedHullWidth) &&
            projectedPartitionedHullWidth < Number(targetWidth) &&
            Number(projectedResidualCoordinatePartitionCount) <= 16
          ? "shared-terminal-residual-coordinate-needs-small-partition"
        : finitePositive(independentIntervalResidualWidth) &&
            sampleHullWidth < 0.25 * Number(independentIntervalResidualWidth)
          ? "shared-terminal-residual-coordinate-reduces-independent-hull-pressure"
          : "shared-terminal-residual-coordinate-still-open",
  };
}

function terminalGraphRemainderBudgetRow({
  context,
  row,
  targetSpeedInterval,
  branch,
  transportProfile,
  residualProfile,
  terminalHIndexes,
  residualBudgetTargetShareOfAll,
  residualBudgetScales,
  residualNoiseSamples,
  residualCoordinatePartitionCount,
  topContributorCount,
}) {
  const branchRow = branchRowFor(row, branch);
  const cell = cellFromCertificateRow(row);
  const baseHIntervals = hIntervalsFromBranchRow(branchRow, { hCount: 39 });
  const terminalSet = new Set(terminalHIndexes);
  const nonterminalHIndexes = Array.from({ length: 39 }, (_, index) => index)
    .filter(
      (hIndex) =>
        !terminalSet.has(hIndex) &&
        hIndex !==
          THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index
    );
  const xiInterval = speedIntervalXiInterval({ row, targetSpeedInterval });
  const allActive = reducedSigmaEtaFullSourceReplay({
    context,
    cell,
    branch,
    hIntervals: etaTransportHIntervalsForMode({
      baseHIntervals,
      mode: "all-active-reduced-source",
    }),
    etaTransportMode: "all-active-reduced-source",
  });
  const terminalReplay = reducedSigmaEtaFullSourceReplay({
    context,
    cell,
    branch,
    hIntervals: etaTransportHIntervalsWithActiveSet({
      baseHIntervals,
      activeHIndexes: terminalHIndexes,
    }),
    etaTransportMode: "terminal-active-eta-h-row-replay",
  });
  const nonterminalReplay = reducedSigmaEtaFullSourceReplay({
    context,
    cell,
    branch,
    hIntervals: etaTransportHIntervalsWithActiveSet({
      baseHIntervals,
      activeHIndexes: nonterminalHIndexes,
    }),
    etaTransportMode: "nonterminal-active-eta-h-row-replay",
  });
  const graphHIntervals = hIntervalsForPolynomialGraphInterval({
    transportProfile,
    noiseInterval: xiInterval,
  });
  const terminalGraphFrozenReplay = reducedSigmaEtaFullSourceReplay({
    context,
    cell,
    branch,
    hIntervals: etaTransportHIntervalsWithGraphSet({
      baseHIntervals,
      graphHIntervals,
      graphHIndexes: terminalHIndexes,
      nonGraphMode: "frozen",
    }),
    etaTransportMode: "terminal-polynomial-graph-frozen-nonterminal-replay",
  });
  const terminalGraphWithNonterminalReplay = reducedSigmaEtaFullSourceReplay({
    context,
    cell,
    branch,
    hIntervals: etaTransportHIntervalsWithGraphSet({
      baseHIntervals,
      graphHIntervals,
      graphHIndexes: terminalHIndexes,
      nonGraphMode: "all-active",
    }),
    etaTransportMode: "terminal-polynomial-graph-active-nonterminal-replay",
  });
  const residualHIntervals =
    hIntervalsForPolynomialGraphPlusIntervalResidual({
      transportProfile,
      noiseInterval: xiInterval,
      residualProfile,
    });
  const terminalGraphIntervalResidualReplay =
    reducedSigmaEtaFullSourceReplay({
      context,
      cell,
      branch,
      hIntervals: etaTransportHIntervalsWithGraphSet({
        baseHIntervals,
        graphHIntervals: residualHIntervals,
        graphHIndexes: terminalHIndexes,
        nonGraphMode: "frozen",
      }),
      etaTransportMode:
        "terminal-polynomial-graph-interval-residual-frozen-nonterminal-replay",
    });
  const zeroedBaseHIntervals = cloneHIntervalsWithZeroedSolveTarget(baseHIntervals);
  const terminalGraphIntervals = terminalHIndexes.map((hIndex) => ({
    h_index: hIndex,
    polynomial_degree:
      transportProfile[hIndex]?.polynomial_degree ?? null,
    graph_interval: graphHIntervals[hIndex],
    graph_width: intervalWidth(graphHIntervals[hIndex]),
    producer_interval_width: intervalWidth(
      zeroedBaseHIntervals[hIndex]
    ),
    graph_to_producer_width_ratio: finitePositive(
      intervalWidth(zeroedBaseHIntervals[hIndex])
    )
      ? intervalWidth(graphHIntervals[hIndex]) /
        intervalWidth(zeroedBaseHIntervals[hIndex])
      : null,
    graph_plus_interval_residual_interval: residualHIntervals[hIndex],
    graph_plus_interval_residual_width:
      intervalWidth(residualHIntervals[hIndex]),
    interval_residual_width_ratio_to_producer: finitePositive(
      intervalWidth(zeroedBaseHIntervals[hIndex])
    )
      ? intervalWidth(residualHIntervals[hIndex]) /
        intervalWidth(zeroedBaseHIntervals[hIndex])
      : null,
  }));
  const etaGraphRow = {
    cell_id: row.cell_id,
    speed_interval: row.speed_interval,
    xi_interval: xiInterval,
    xi_midpoint: intervalMidpoint(xiInterval),
    y_order: H38_NUMERATOR_Y_ORDER,
    branch,
    coordinate_route: "sigma-eta-before-h-row-substitution",
    h38_solve_target_zeroed: true,
    all_active_reduced_source: allActive,
    terminal_provider_h_indexes: terminalHIndexes,
    nonterminal_provider_h_indexes: nonterminalHIndexes,
    nonterminal_provider_h_indexes_exclude_terminal:
      nonterminalHIndexes.every((hIndex) => !terminalSet.has(hIndex)),
    terminal_replay: terminalReplay,
    nonterminal_replay: nonterminalReplay,
    terminal_graph_replay: terminalGraphFrozenReplay,
    terminal_graph_with_nonterminal_replay:
      terminalGraphWithNonterminalReplay,
    terminal_graph_interval_residual_replay:
      terminalGraphIntervalResidualReplay,
    terminal_graph_intervals: terminalGraphIntervals,
  };
  const allActiveWidth =
    etaGraphRow.all_active_reduced_source.full_source_width;
  const terminalWidth = etaGraphRow.terminal_replay.full_source_width;
  const nonterminalWidth = etaGraphRow.nonterminal_replay.full_source_width;
  const graphFrozenWidth =
    etaGraphRow.terminal_graph_replay.full_source_width;
  const graphWithNonterminalWidth =
    etaGraphRow.terminal_graph_with_nonterminal_replay.full_source_width;
  const graphIntervalResidualWidth =
    etaGraphRow.terminal_graph_interval_residual_replay.full_source_width;
  etaGraphRow.terminal_width_share_of_all = finitePositive(allActiveWidth)
    ? terminalWidth / allActiveWidth
    : null;
  etaGraphRow.nonterminal_width_share_of_all = finitePositive(allActiveWidth)
    ? nonterminalWidth / allActiveWidth
    : null;
  etaGraphRow.terminal_plus_nonterminal_width_share_of_all = finitePositive(
    allActiveWidth
  )
    ? (terminalWidth + nonterminalWidth) / allActiveWidth
    : null;
  etaGraphRow.terminal_graph_width_share_of_terminal = finitePositive(
    terminalWidth
  )
    ? graphFrozenWidth / terminalWidth
    : null;
  etaGraphRow.terminal_graph_width_share_of_all = finitePositive(allActiveWidth)
    ? graphFrozenWidth / allActiveWidth
    : null;
  etaGraphRow.terminal_graph_with_nonterminal_width_share_of_all =
    finitePositive(allActiveWidth)
      ? graphWithNonterminalWidth / allActiveWidth
      : null;
  etaGraphRow.terminal_graph_interval_residual_width_share_of_terminal =
    finitePositive(terminalWidth) && finitePositive(graphIntervalResidualWidth)
      ? graphIntervalResidualWidth / terminalWidth
      : null;
  etaGraphRow.terminal_eta_rows_dominate =
    terminalHIndexes[0] === 37 &&
    terminalHIndexes[1] === 36 &&
    terminalHIndexes[2] === 35 &&
    finitePositive(allActiveWidth) &&
    terminalWidth / allActiveWidth > 0.95;
  const targetWidth =
    Number(residualBudgetTargetShareOfAll) * Number(allActiveWidth);
  const replayWithSymmetricResidualScale = (residualScale) => {
    const scaledResidualHIntervals =
      hIntervalsForPolynomialGraphPlusScaledSymmetricResidual({
        transportProfile,
        noiseInterval: xiInterval,
        residualProfile,
        residualHIndexes: terminalHIndexes,
        residualScale,
      });
    return reducedSigmaEtaFullSourceReplay({
      context,
      cell,
      branch,
      hIntervals: etaTransportHIntervalsWithGraphSet({
        baseHIntervals,
        graphHIntervals: scaledResidualHIntervals,
        graphHIndexes: terminalHIndexes,
        nonGraphMode: "all-active",
      }),
      etaTransportMode:
        "terminal-polynomial-graph-symmetric-residual-active-nonterminal-replay",
    });
  };
  const symmetricScaleOneReplay = replayWithSymmetricResidualScale(1);
  const rawIntervalResidualHIntervals =
    hIntervalsForPolynomialGraphPlusIntervalResidual({
      transportProfile,
      noiseInterval: xiInterval,
      residualProfile,
    });
  const rawIntervalResidualWithNonterminalReplay =
    reducedSigmaEtaFullSourceReplay({
      context,
      cell,
      branch,
      hIntervals: etaTransportHIntervalsWithGraphSet({
        baseHIntervals,
        graphHIntervals: rawIntervalResidualHIntervals,
        graphHIndexes: terminalHIndexes,
        nonGraphMode: "all-active",
      }),
      etaTransportMode:
        "terminal-polynomial-graph-interval-residual-active-nonterminal-replay",
    });
  const symmetricScaleOneWidth =
    symmetricScaleOneReplay.full_source_width;
  const allowedSymmetricRawResidualScaleForTarget =
    finitePositive(targetWidth) &&
    finitePositive(graphWithNonterminalWidth) &&
    finitePositive(symmetricScaleOneWidth) &&
    Number(targetWidth) > Number(graphWithNonterminalWidth) &&
    Number(symmetricScaleOneWidth) > Number(graphWithNonterminalWidth)
      ? (Number(targetWidth) - Number(graphWithNonterminalWidth)) /
        (Number(symmetricScaleOneWidth) - Number(graphWithNonterminalWidth))
      : null;
  const residualScaleSweep = residualBudgetScales.map((residualScale) => {
    const replay =
      Number(residualScale) === 0
        ? etaGraphRow.terminal_graph_with_nonterminal_replay
        : Number(residualScale) === 1
        ? symmetricScaleOneReplay
        : replayWithSymmetricResidualScale(residualScale);
    return {
      residual_scale: Number(residualScale),
      full_source_width: replay.full_source_width,
      full_source_width_share_of_all: finitePositive(allActiveWidth)
        ? replay.full_source_width / allActiveWidth
        : null,
      under_target:
        finitePositive(targetWidth) && replay.full_source_width < targetWidth,
    };
  });
  const sharedResidualSampleDiagnostic =
    terminalGraphSharedResidualSampleDiagnostic({
      context,
      cell,
      branch,
      baseHIntervals,
      transportProfile,
      xiCoordinate: etaGraphRow.xi_midpoint,
      residualProfile,
      terminalHIndexes,
      residualNoiseSamples,
      allActiveWidth,
      targetWidth,
      independentIntervalResidualWidth:
        rawIntervalResidualWithNonterminalReplay.full_source_width,
    });
  const pointXiSharedResidualPartitionDiagnostic =
    terminalGraphSharedResidualPartitionDiagnostic({
      context,
      cell,
      branch,
      baseHIntervals,
      transportProfile,
      xiCoordinate: etaGraphRow.xi_midpoint,
      residualProfile,
      terminalHIndexes,
      residualCoordinatePartitionCount,
      allActiveWidth,
      targetWidth,
      xiMode: "point-xi-midpoint",
    });
  const graphXiSharedResidualPartitionDiagnostic =
    terminalGraphSharedResidualPartitionDiagnostic({
      context,
      cell,
      branch,
      baseHIntervals,
      transportProfile,
      xiInterval,
      residualProfile,
      terminalHIndexes,
      residualCoordinatePartitionCount,
      allActiveWidth,
      targetWidth,
      xiMode: "graph-xi-interval",
    });
  const pointXiSharedResidualEndpointPartitionDiagnostic =
    terminalGraphSharedResidualEndpointPartitionDiagnostic({
      context,
      cell,
      branch,
      baseHIntervals,
      transportProfile,
      xiCoordinate: etaGraphRow.xi_midpoint,
      residualProfile,
      terminalHIndexes,
      residualCoordinatePartitionCount,
      allActiveWidth,
      targetWidth,
      xiMode: "point-xi-midpoint",
    });
  const graphXiSharedResidualEndpointPartitionDiagnostic =
    terminalGraphSharedResidualEndpointPartitionDiagnostic({
      context,
      cell,
      branch,
      baseHIntervals,
      transportProfile,
      xiInterval,
      residualProfile,
      terminalHIndexes,
      residualCoordinatePartitionCount,
      allActiveWidth,
      targetWidth,
      xiMode: "graph-xi-interval",
    });
  let sharedResidualPartitionRoute =
    "shared-terminal-residual-coordinate-partition-route-open";
  if (
    graphXiSharedResidualEndpointPartitionDiagnostic
      .all_endpoint_partition_hulls_under_target === true &&
    graphXiSharedResidualEndpointPartitionDiagnostic
      .endpoint_control_candidate === true
  ) {
    sharedResidualPartitionRoute =
      "shared-terminal-residual-coordinate-affine-endpoint-partition-closes-graph-xi-candidate";
  } else if (
    pointXiSharedResidualEndpointPartitionDiagnostic
      .all_endpoint_partition_hulls_under_target === true &&
    pointXiSharedResidualEndpointPartitionDiagnostic
      .endpoint_control_candidate === true
  ) {
    sharedResidualPartitionRoute =
      "shared-terminal-residual-coordinate-affine-endpoint-partition-needs-xi-coupled-proof";
  } else if (
    graphXiSharedResidualEndpointPartitionDiagnostic
      .all_endpoint_partition_hulls_under_target === true
  ) {
    sharedResidualPartitionRoute =
      "shared-terminal-residual-coordinate-endpoint-partition-closes-graph-xi-candidate";
  } else if (
    pointXiSharedResidualEndpointPartitionDiagnostic
      .all_endpoint_partition_hulls_under_target === true
  ) {
    sharedResidualPartitionRoute =
      "shared-terminal-residual-coordinate-endpoint-partition-needs-xi-coupled-proof";
  } else if (
    graphXiSharedResidualPartitionDiagnostic.all_partitions_under_target ===
    true
  ) {
    sharedResidualPartitionRoute =
      "shared-terminal-residual-coordinate-partition-closes-graph-xi-candidate";
  } else if (
    pointXiSharedResidualPartitionDiagnostic.all_partitions_under_target ===
    true
  ) {
    sharedResidualPartitionRoute =
      "shared-terminal-residual-coordinate-partition-needs-xi-zeta-coupled-enclosure";
  } else if (
    sharedResidualSampleDiagnostic.route_interpretation ===
    "shared-terminal-residual-coordinate-needs-small-partition"
  ) {
    sharedResidualPartitionRoute =
      "shared-terminal-residual-coordinate-partition-forecast-rejected";
  }
  const terminalGraphResidualEntries = terminalHIndexes.map((hIndex) => {
    const rawResidualAbsUpper = Number(
      residualProfile?.[hIndex]?.max_abs_residual ?? 0
    );
    const midpointFitResidualAbs = Number(
      transportProfile?.[hIndex]?.fit_max_abs_residual ?? 0
    );
    const graphInterval = graphHIntervals[hIndex];
    const producerInterval = zeroedBaseHIntervals[hIndex];
    const rowResidualInterval = [
      Number(producerInterval[0]) - Number(graphInterval[1]),
      Number(producerInterval[1]) - Number(graphInterval[0]),
    ];
    const rowResidualAbsUpper = intervalAbsUpper(rowResidualInterval);
    const allowedResidualRadius =
      rawResidualAbsUpper *
      Number(allowedSymmetricRawResidualScaleForTarget ?? 0);
    const budgetedGraphInterval = [
      Number(graphInterval[0]) - allowedResidualRadius,
      Number(graphInterval[1]) + allowedResidualRadius,
    ];
    const requiredScaleToCoverRow =
      finitePositive(rawResidualAbsUpper)
        ? rowResidualAbsUpper / rawResidualAbsUpper
        : null;
    const requiredScaleToAllowedScaleRatio =
      finitePositive(requiredScaleToCoverRow) &&
      finitePositive(allowedSymmetricRawResidualScaleForTarget)
        ? requiredScaleToCoverRow /
          allowedSymmetricRawResidualScaleForTarget
        : null;
    return {
      h_index: hIndex,
      graph_interval: graphInterval,
      producer_interval: producerInterval,
      row_residual_interval: rowResidualInterval,
      row_residual_abs_upper: rowResidualAbsUpper,
      raw_residual_interval_hull:
        residualProfile?.[hIndex]?.residual_interval_hull ?? [0, 0],
      raw_residual_abs_upper: rawResidualAbsUpper,
      allowed_residual_radius_for_source_budget: allowedResidualRadius,
      budgeted_graph_interval: budgetedGraphInterval,
      producer_interval_contained_by_budget: intervalContainsInterval(
        budgetedGraphInterval,
        producerInterval
      ),
      required_symmetric_raw_residual_scale_to_cover_row:
        requiredScaleToCoverRow,
      required_scale_to_allowed_scale_ratio:
        requiredScaleToAllowedScaleRatio,
      producer_interval_half_width: intervalWidth(producerInterval) / 2,
      allowed_radius_to_producer_half_width_ratio: finitePositive(
        intervalWidth(producerInterval) / 2
      )
        ? allowedResidualRadius / (intervalWidth(producerInterval) / 2)
        : null,
      midpoint_fit_max_abs_residual: midpointFitResidualAbs,
      midpoint_fit_residual_scale_to_raw: finitePositive(
        rawResidualAbsUpper
      )
        ? midpointFitResidualAbs / rawResidualAbsUpper
        : null,
      midpoint_fit_residual_to_allowed_radius_ratio: finitePositive(
        allowedResidualRadius
      )
        ? midpointFitResidualAbs / allowedResidualRadius
        : null,
      midpoint_fit_residual_inside_allowed_budget:
        midpointFitResidualAbs <= allowedResidualRadius,
    };
  });
  const midpointFitResidualScales = terminalGraphResidualEntries
    .map((entry) => Number(entry.midpoint_fit_residual_scale_to_raw))
    .filter(Number.isFinite);
  const requiredScaleToAllowedRatios = terminalGraphResidualEntries
    .map((entry) => Number(entry.required_scale_to_allowed_scale_ratio))
    .filter(Number.isFinite);
  const allowedRadiusToProducerHalfWidthRatios = terminalGraphResidualEntries
    .map((entry) => Number(entry.allowed_radius_to_producer_half_width_ratio))
    .filter(Number.isFinite);
  const midpointFitToAllowedRadiusRatios = terminalGraphResidualEntries
    .map((entry) =>
      Number(entry.midpoint_fit_residual_to_allowed_radius_ratio)
    )
    .filter(Number.isFinite);
  const maxMidpointFitResidualScaleToRaw =
    midpointFitResidualScales.length > 0
      ? Math.max(...midpointFitResidualScales)
      : null;
  const rawResidualAbsUppers = terminalGraphResidualEntries
    .map((entry) => Number(entry.raw_residual_abs_upper))
    .filter(Number.isFinite);
  const midpointFitResidualAbsUppers = terminalGraphResidualEntries
    .map((entry) => Number(entry.midpoint_fit_max_abs_residual))
    .filter(Number.isFinite);
  return {
    ...etaGraphRow,
    residual_budget_target_share_of_all: Number(
      residualBudgetTargetShareOfAll
    ),
    residual_budget_target_width: targetWidth,
    terminal_graph_symmetric_residual_scale_one_replay:
      symmetricScaleOneReplay,
    terminal_graph_interval_residual_with_nonterminal_replay:
      rawIntervalResidualWithNonterminalReplay,
    terminal_graph_shared_residual_sample_diagnostic:
      sharedResidualSampleDiagnostic,
    terminal_graph_shared_residual_point_partition_diagnostic:
      pointXiSharedResidualPartitionDiagnostic,
    terminal_graph_shared_residual_graph_partition_diagnostic:
      graphXiSharedResidualPartitionDiagnostic,
    terminal_graph_shared_residual_point_endpoint_partition_diagnostic:
      pointXiSharedResidualEndpointPartitionDiagnostic,
    terminal_graph_shared_residual_graph_endpoint_partition_diagnostic:
      graphXiSharedResidualEndpointPartitionDiagnostic,
    terminal_graph_shared_residual_zeta_degree_bound:
      graphXiSharedResidualEndpointPartitionDiagnostic
        .terminal_zeta_degree_bound,
    correlated_terminal_residual_affine_endpoint_control_candidate:
      graphXiSharedResidualEndpointPartitionDiagnostic
        .endpoint_control_candidate,
    terminal_graph_correlated_residual_partition_count:
      pointXiSharedResidualPartitionDiagnostic
        .residual_coordinate_partition_count,
    terminal_graph_correlated_residual_partition_replays:
      pointXiSharedResidualPartitionDiagnostic.partition_replays,
    max_terminal_graph_correlated_residual_partition_width_share_of_all:
      pointXiSharedResidualPartitionDiagnostic
        .max_partition_width_share_of_all,
    correlated_terminal_residual_partitions_under_target:
      pointXiSharedResidualPartitionDiagnostic
        .all_partitions_under_target,
    terminal_graph_correlated_residual_graph_partition_count:
      graphXiSharedResidualPartitionDiagnostic
        .residual_coordinate_partition_count,
    terminal_graph_correlated_residual_graph_partition_replays:
      graphXiSharedResidualPartitionDiagnostic.partition_replays,
    max_terminal_graph_correlated_residual_graph_partition_width_share_of_all:
      graphXiSharedResidualPartitionDiagnostic
        .max_partition_width_share_of_all,
    correlated_terminal_residual_graph_partitions_under_target:
      graphXiSharedResidualPartitionDiagnostic
        .all_partitions_under_target,
    terminal_graph_correlated_residual_endpoint_partition_replays:
      pointXiSharedResidualEndpointPartitionDiagnostic.partition_replays,
    max_terminal_graph_correlated_residual_endpoint_partition_width_share_of_all:
      pointXiSharedResidualEndpointPartitionDiagnostic
        .max_endpoint_partition_hull_width_share_of_all,
    max_terminal_graph_correlated_residual_affine_envelope_width_share_of_all:
      pointXiSharedResidualEndpointPartitionDiagnostic
        .max_affine_zeta_envelope_width_share_of_all,
    max_terminal_graph_correlated_residual_affine_envelope_slope_abs_upper:
      pointXiSharedResidualEndpointPartitionDiagnostic
        .max_affine_zeta_envelope_slope_abs_upper,
    correlated_terminal_residual_endpoint_partitions_under_target:
      pointXiSharedResidualEndpointPartitionDiagnostic
        .all_endpoint_partition_hulls_under_target,
    correlated_terminal_residual_affine_envelopes_under_target:
      pointXiSharedResidualEndpointPartitionDiagnostic
        .all_affine_zeta_envelopes_under_target,
    terminal_graph_correlated_residual_graph_endpoint_partition_replays:
      graphXiSharedResidualEndpointPartitionDiagnostic.partition_replays,
    max_terminal_graph_correlated_residual_graph_endpoint_partition_width_share_of_all:
      graphXiSharedResidualEndpointPartitionDiagnostic
        .max_endpoint_partition_hull_width_share_of_all,
    max_terminal_graph_correlated_residual_graph_affine_envelope_width_share_of_all:
      graphXiSharedResidualEndpointPartitionDiagnostic
        .max_affine_zeta_envelope_width_share_of_all,
    max_terminal_graph_correlated_residual_graph_affine_envelope_slope_abs_upper:
      graphXiSharedResidualEndpointPartitionDiagnostic
        .max_affine_zeta_envelope_slope_abs_upper,
    correlated_terminal_residual_graph_endpoint_partitions_under_target:
      graphXiSharedResidualEndpointPartitionDiagnostic
        .all_endpoint_partition_hulls_under_target,
    correlated_terminal_residual_graph_affine_envelopes_under_target:
      graphXiSharedResidualEndpointPartitionDiagnostic
        .all_affine_zeta_envelopes_under_target,
    residual_coordinate_partition_route_interpretation:
      sharedResidualPartitionRoute,
    terminal_graph_correlated_residual_noise_samples:
      sharedResidualSampleDiagnostic.residual_noise_samples,
    terminal_graph_correlated_residual_sample_replays:
      sharedResidualSampleDiagnostic.sample_replays,
    max_terminal_graph_correlated_residual_width_share_of_all:
      sharedResidualSampleDiagnostic.max_sample_replay_width_share_of_all,
    interval_to_correlated_terminal_residual_width_ratio:
      finitePositive(
        sharedResidualSampleDiagnostic
          .sample_hull_to_independent_interval_residual_width_ratio
      )
        ? 1 /
          sharedResidualSampleDiagnostic
            .sample_hull_to_independent_interval_residual_width_ratio
        : null,
    correlated_terminal_residual_under_target:
      sharedResidualSampleDiagnostic
        .sample_coefficient_hull_under_target,
    correlated_terminal_residual_collapse_candidate:
      sharedResidualSampleDiagnostic.route_interpretation ===
      "shared-terminal-residual-coordinate-collapses-independent-hull-artifact",
    correlated_terminal_residual_formula:
      sharedResidualSampleDiagnostic.residual_coordinate,
    terminal_graph_remainder_budget_entries:
      terminalGraphResidualEntries,
    all_terminal_producer_intervals_contained_by_allowed_budget:
      terminalGraphResidualEntries.every(
        (entry) => entry.producer_interval_contained_by_budget === true
      ),
    all_terminal_midpoint_fit_residuals_inside_allowed_budget:
      terminalGraphResidualEntries.every(
        (entry) =>
          entry.midpoint_fit_residual_inside_allowed_budget === true
      ),
    max_required_scale_to_allowed_scale_ratio:
      requiredScaleToAllowedRatios.length > 0
        ? Math.max(...requiredScaleToAllowedRatios)
        : null,
    min_allowed_radius_to_producer_half_width_ratio:
      allowedRadiusToProducerHalfWidthRatios.length > 0
        ? Math.min(...allowedRadiusToProducerHalfWidthRatios)
        : null,
    max_midpoint_fit_residual_to_allowed_radius_ratio:
      midpointFitToAllowedRadiusRatios.length > 0
        ? Math.max(...midpointFitToAllowedRadiusRatios)
        : null,
    residual_scale_sweep: residualScaleSweep,
    allowed_symmetric_raw_residual_scale_for_target:
      allowedSymmetricRawResidualScaleForTarget,
    allowed_scale_formula:
      "linear endpoint interpolation between graph-plus-nonterminal and symmetric raw residual scale one",
    max_midpoint_fit_residual_scale_to_raw:
      maxMidpointFitResidualScaleToRaw,
    max_terminal_raw_residual_abs_upper:
      rawResidualAbsUppers.length > 0 ? Math.max(...rawResidualAbsUppers) : null,
    max_terminal_midpoint_fit_residual_abs:
      midpointFitResidualAbsUppers.length > 0
        ? Math.max(...midpointFitResidualAbsUppers)
        : null,
    graph_plus_nonterminal_under_target:
      finitePositive(targetWidth) &&
      graphWithNonterminalWidth < targetWidth,
    symmetric_raw_residual_scale_one_over_target:
      finitePositive(targetWidth) && symmetricScaleOneWidth > targetWidth,
    raw_interval_residual_with_nonterminal_over_target:
      finitePositive(targetWidth) &&
      rawIntervalResidualWithNonterminalReplay.full_source_width >
        targetWidth,
    shared_residual_sample_hull_under_target:
      sharedResidualSampleDiagnostic
        .sample_coefficient_hull_under_target === true,
    midpoint_fit_residual_below_symmetric_budget:
      finiteNonnegative(maxMidpointFitResidualScaleToRaw) &&
      finitePositive(allowedSymmetricRawResidualScaleForTarget) &&
      maxMidpointFitResidualScaleToRaw <
        allowedSymmetricRawResidualScaleForTarget,
    terminal_graph_remainder_budget_route_interpretation:
      finitePositive(allowedSymmetricRawResidualScaleForTarget) &&
      allowedSymmetricRawResidualScaleForTarget > 0 &&
      allowedSymmetricRawResidualScaleForTarget < 1 &&
      finiteNonnegative(maxMidpointFitResidualScaleToRaw) &&
      maxMidpointFitResidualScaleToRaw <
        allowedSymmetricRawResidualScaleForTarget &&
      terminalGraphResidualEntries.every(
        (entry) =>
          entry.midpoint_fit_residual_inside_allowed_budget === true
      ) &&
      terminalGraphResidualEntries.some(
        (entry) => entry.producer_interval_contained_by_budget === false
      )
        ? "terminal-graph-remainder-budget-localizes-obstruction-to-producer-interval-width"
        : "terminal-graph-remainder-budget-route-open",
  };
}

function terminalEtaGraphSummary({ rows, terminalHIndexes }) {
  const terminalShares = rows.map((row) =>
    Number(row.terminal_width_share_of_all)
  );
  const nonterminalShares = rows.map((row) =>
    Number(row.nonterminal_width_share_of_all)
  );
  const terminalPlusNonterminalShares = rows.map((row) =>
    Number(row.terminal_plus_nonterminal_width_share_of_all)
  );
  const graphTerminalShares = rows.map((row) =>
    Number(row.terminal_graph_width_share_of_terminal)
  );
  const graphWithNonterminalShares = rows.map((row) =>
    Number(row.terminal_graph_with_nonterminal_width_share_of_all)
  );
  const graphIntervalResidualShares = rows
    .map((row) =>
      Number(row.terminal_graph_interval_residual_width_share_of_terminal)
    )
    .filter(Number.isFinite);
  return {
    row_count: rows.length,
    terminal_provider_h_indexes: terminalHIndexes,
    nonterminal_provider_h_indexes_exclude_terminal: rows.every(
      (row) => row.nonterminal_provider_h_indexes_exclude_terminal === true
    ),
    all_rows_positive_xi_stencil: rows.every(
      (row) =>
        Number(row.xi_interval?.[0]) > 0 && Number(row.xi_interval?.[1]) > 0
    ),
    all_rows_h38_solve_target_zeroed: rows.every(
      (row) =>
        row.h38_solve_target_zeroed === true &&
        row.terminal_replay.h38_solve_target_zeroed === true &&
        row.nonterminal_replay.h38_solve_target_zeroed === true &&
        row.terminal_graph_replay.h38_solve_target_zeroed === true &&
        row.terminal_graph_with_nonterminal_replay
          .h38_solve_target_zeroed === true
    ),
    all_rows_form_sigma_before_h_row_substitution: rows.every(
      (row) =>
        row.terminal_replay.sigma_h_tail_max_abs_upper === 0 &&
        row.nonterminal_replay.sigma_h_tail_max_abs_upper === 0 &&
        row.terminal_graph_replay.sigma_h_tail_max_abs_upper === 0 &&
        row.terminal_graph_with_nonterminal_replay
          .sigma_h_tail_max_abs_upper === 0
    ),
    all_rows_terminal_rows_dominate: rows.every(
      (row) =>
        row.terminal_eta_rows_dominate === true &&
        row.terminal_width_share_of_all > 0.95
    ),
    all_rows_terminal_replay_exceeds_nonterminal_replay: rows.every(
      (row) =>
        row.terminal_replay.full_source_width >
        row.nonterminal_replay.full_source_width
    ),
    all_rows_terminal_plus_nonterminal_replay_covers_all_active_width:
      rows.every(
        (row) =>
          row.terminal_replay.full_source_width +
            row.nonterminal_replay.full_source_width >=
          row.all_active_reduced_source.full_source_width * (1 - 1e-6)
      ),
    all_rows_terminal_graph_reduces_terminal_width: rows.every(
      (row) => row.terminal_graph_reduces_terminal_width === true
    ),
    all_rows_terminal_graph_with_nonterminal_below_nonterminal_wall:
      rows.every(
        (row) =>
          row.terminal_graph_with_nonterminal_below_nonterminal_wall ===
          true
      ),
    all_rows_terminal_interval_residual_recreates_terminal_width:
      rows.every(
        (row) =>
          row.terminal_interval_residual_recreates_terminal_width === true
      ),
    h38_one_active_replay_matches_frozen: rows.every(
      (row) => row.h38_one_active_replay_matches_frozen === true
    ),
    min_terminal_width_share_of_all: Math.min(...terminalShares),
    max_nonterminal_width_share_of_all: Math.max(...nonterminalShares),
    min_terminal_plus_nonterminal_width_share_of_all: Math.min(
      ...terminalPlusNonterminalShares
    ),
    max_terminal_graph_width_share_of_terminal:
      Math.max(...graphTerminalShares),
    max_terminal_graph_with_nonterminal_width_share_of_all: Math.max(
      ...graphWithNonterminalShares
    ),
    min_terminal_graph_interval_residual_width_share_of_terminal:
      graphIntervalResidualShares.length > 0
        ? Math.min(...graphIntervalResidualShares)
        : null,
    route_interpretation:
      rows.every(
        (row) =>
          row.terminal_eta_graph_route_interpretation ===
          "terminal-polynomial-graph-collapses-terminal-eta-width-candidate"
      )
        ? "terminal-polynomial-graph-collapses-localized-eta-width-candidate"
        : "terminal-row-provider-replay-open",
  };
}

function terminalGraphRemainderBudgetSummary({
  rows,
  terminalHIndexes,
  residualBudgetTargetShareOfAll,
}) {
  const terminalShares = rows.map((row) =>
    Number(row.terminal_width_share_of_all)
  );
  const nonterminalShares = rows.map((row) =>
    Number(row.nonterminal_width_share_of_all)
  );
  const terminalPlusNonterminalShares = rows.map((row) =>
    Number(row.terminal_plus_nonterminal_width_share_of_all)
  );
  const graphTerminalShares = rows.map((row) =>
    Number(row.terminal_graph_width_share_of_terminal)
  );
  const allowedScales = rows
    .map((row) => Number(row.allowed_symmetric_raw_residual_scale_for_target))
    .filter(Number.isFinite);
  const midpointFitResidualScales = rows
    .map((row) => Number(row.max_midpoint_fit_residual_scale_to_raw))
    .filter(Number.isFinite);
  const requiredScaleToAllowedRatios = rows
    .map((row) => Number(row.max_required_scale_to_allowed_scale_ratio))
    .filter(Number.isFinite);
  const allowedRadiusToProducerHalfWidthRatios = rows
    .map((row) => Number(row.min_allowed_radius_to_producer_half_width_ratio))
    .filter(Number.isFinite);
  const midpointFitToAllowedRadiusRatios = rows
    .map((row) =>
      Number(row.max_midpoint_fit_residual_to_allowed_radius_ratio)
    )
    .filter(Number.isFinite);
  const graphWithNonterminalShares = rows.map((row) =>
    Number(row.terminal_graph_with_nonterminal_width_share_of_all)
  );
  const rawIntervalResidualWithNonterminalShares = rows.map((row) =>
    finitePositive(row.all_active_reduced_source?.full_source_width)
      ? Number(
          row.terminal_graph_interval_residual_with_nonterminal_replay
            ?.full_source_width
        ) / Number(row.all_active_reduced_source.full_source_width)
      : NaN
  );
  const symmetricScaleOneShares = rows.map((row) =>
    finitePositive(row.all_active_reduced_source?.full_source_width)
      ? Number(
          row.terminal_graph_symmetric_residual_scale_one_replay
            ?.full_source_width
        ) / Number(row.all_active_reduced_source.full_source_width)
      : NaN
  );
  const sharedResidualSampleShares = rows
    .map((row) =>
      Number(
        row.terminal_graph_shared_residual_sample_diagnostic
          ?.sample_coefficient_hull_width_share_of_all
      )
    )
    .filter(Number.isFinite);
  const intervalToSharedResidualSampleRatios = rows
    .map((row) => {
      const ratio = Number(
        row.terminal_graph_shared_residual_sample_diagnostic
          ?.sample_hull_to_independent_interval_residual_width_ratio
      );
      return finitePositive(ratio) ? 1 / ratio : NaN;
    })
    .filter(Number.isFinite);
  const projectedResidualCoordinatePartitionCounts = rows
    .map((row) =>
      Number(
        row.terminal_graph_shared_residual_sample_diagnostic
          ?.projected_residual_coordinate_partition_count_for_target
      )
    )
    .filter(Number.isFinite);
  const projectedResidualCoordinatePartitionedShares = rows
    .map((row) =>
      Number(
        row.terminal_graph_shared_residual_sample_diagnostic
          ?.projected_residual_coordinate_partitioned_hull_width_share_of_all
      )
    )
    .filter(Number.isFinite);
  const pointPartitionShares = rows
    .map((row) =>
      Number(
        row.terminal_graph_shared_residual_point_partition_diagnostic
          ?.max_partition_width_share_of_all
      )
    )
    .filter(Number.isFinite);
  const graphPartitionShares = rows
    .map((row) =>
      Number(
        row.terminal_graph_shared_residual_graph_partition_diagnostic
          ?.max_partition_width_share_of_all
      )
    )
    .filter(Number.isFinite);
  const pointPartitionCounts = rows
    .map((row) =>
      Number(
        row.terminal_graph_shared_residual_point_partition_diagnostic
          ?.residual_coordinate_partition_count
      )
    )
    .filter(Number.isFinite);
  const graphPartitionCounts = rows
    .map((row) =>
      Number(
        row.terminal_graph_shared_residual_graph_partition_diagnostic
          ?.residual_coordinate_partition_count
      )
    )
    .filter(Number.isFinite);
  const pointEndpointPartitionShares = rows
    .map((row) =>
      Number(
        row.terminal_graph_shared_residual_point_endpoint_partition_diagnostic
          ?.max_endpoint_partition_hull_width_share_of_all
      )
    )
    .filter(Number.isFinite);
  const graphEndpointPartitionShares = rows
    .map((row) =>
      Number(
        row.terminal_graph_shared_residual_graph_endpoint_partition_diagnostic
          ?.max_endpoint_partition_hull_width_share_of_all
      )
    )
    .filter(Number.isFinite);
  const pointAffineEnvelopeShares = rows
    .map((row) =>
      Number(
        row.terminal_graph_shared_residual_point_endpoint_partition_diagnostic
          ?.max_affine_zeta_envelope_width_share_of_all
      )
    )
    .filter(Number.isFinite);
  const graphAffineEnvelopeShares = rows
    .map((row) =>
      Number(
        row.terminal_graph_shared_residual_graph_endpoint_partition_diagnostic
          ?.max_affine_zeta_envelope_width_share_of_all
      )
    )
    .filter(Number.isFinite);
  const pointAffineEnvelopeSlopeAbsUppers = rows
    .map((row) =>
      Number(
        row.terminal_graph_shared_residual_point_endpoint_partition_diagnostic
          ?.max_affine_zeta_envelope_slope_abs_upper
      )
    )
    .filter(Number.isFinite);
  const pointMidpointLinearityGapAbsUppers = rows
    .flatMap((row) =>
      row.terminal_graph_shared_residual_point_endpoint_partition_diagnostic
        ?.partition_replays ?? []
    )
    .map((partition) =>
      Number(partition?.midpoint_linearity_gap_abs_upper)
    )
    .filter(Number.isFinite);
  const graphMidpointLinearityGapAbsUppers = rows
    .flatMap((row) =>
      row.terminal_graph_shared_residual_graph_endpoint_partition_diagnostic
        ?.partition_replays ?? []
    )
    .map((partition) =>
      Number(partition?.midpoint_linearity_gap_abs_upper)
    )
    .filter(Number.isFinite);
  const graphAffineEnvelopeSlopeAbsUppers = rows
    .map((row) =>
      Number(
        row.terminal_graph_shared_residual_graph_endpoint_partition_diagnostic
          ?.max_affine_zeta_envelope_slope_abs_upper
      )
    )
    .filter(Number.isFinite);
  const rawIntervalResidualShares = rows
    .map((row) =>
      Number(row.terminal_graph_interval_residual_width_share_of_terminal)
    )
    .filter(Number.isFinite);
  const zetaDegreeBounds = rows.map(
    (row) => row.terminal_graph_shared_residual_zeta_degree_bound
  );
  const partitionRoutes = rows.map(
    (row) => row.residual_coordinate_partition_route_interpretation
  );
  const allPartitionRoutesAre = (route) =>
    partitionRoutes.every((candidate) => candidate === route);
  const allPartitionRoutesIn = (routes) =>
    partitionRoutes.every((candidate) => routes.includes(candidate));
  let correlatedTerminalResidualPartitionRouteInterpretation =
    "shared-terminal-residual-coordinate-partition-route-open";
  if (
    allPartitionRoutesAre(
      "shared-terminal-residual-coordinate-affine-endpoint-partition-closes-graph-xi-candidate"
    )
  ) {
    correlatedTerminalResidualPartitionRouteInterpretation =
      "shared-terminal-residual-coordinate-affine-endpoint-partition-closes-graph-xi-candidate";
  } else if (
    allPartitionRoutesAre(
      "shared-terminal-residual-coordinate-affine-endpoint-partition-needs-xi-coupled-proof"
    )
  ) {
    correlatedTerminalResidualPartitionRouteInterpretation =
      "shared-terminal-residual-coordinate-affine-endpoint-partition-needs-xi-coupled-proof";
  } else if (
    allPartitionRoutesIn([
      "shared-terminal-residual-coordinate-affine-endpoint-partition-closes-graph-xi-candidate",
      "shared-terminal-residual-coordinate-affine-endpoint-partition-needs-xi-coupled-proof",
    ])
  ) {
    correlatedTerminalResidualPartitionRouteInterpretation =
      "shared-terminal-residual-coordinate-affine-endpoint-partition-mixed-xi-route";
  } else if (
    allPartitionRoutesAre(
      "shared-terminal-residual-coordinate-endpoint-partition-closes-graph-xi-candidate"
    )
  ) {
    correlatedTerminalResidualPartitionRouteInterpretation =
      "shared-terminal-residual-coordinate-endpoint-partition-closes-graph-xi-candidate";
  } else if (
    allPartitionRoutesAre(
      "shared-terminal-residual-coordinate-endpoint-partition-needs-xi-coupled-proof"
    )
  ) {
    correlatedTerminalResidualPartitionRouteInterpretation =
      "shared-terminal-residual-coordinate-endpoint-partition-needs-xi-coupled-proof";
  } else if (
    allPartitionRoutesIn([
      "shared-terminal-residual-coordinate-endpoint-partition-closes-graph-xi-candidate",
      "shared-terminal-residual-coordinate-endpoint-partition-needs-xi-coupled-proof",
    ])
  ) {
    correlatedTerminalResidualPartitionRouteInterpretation =
      "shared-terminal-residual-coordinate-endpoint-partition-mixed-xi-route";
  } else if (
    allPartitionRoutesAre(
      "shared-terminal-residual-coordinate-partition-closes-graph-xi-candidate"
    )
  ) {
    correlatedTerminalResidualPartitionRouteInterpretation =
      "shared-terminal-residual-coordinate-partition-closes-graph-xi-candidate";
  } else if (
    allPartitionRoutesAre(
      "shared-terminal-residual-coordinate-partition-needs-xi-zeta-coupled-enclosure"
    )
  ) {
    correlatedTerminalResidualPartitionRouteInterpretation =
      "shared-terminal-residual-coordinate-partition-needs-xi-zeta-coupled-enclosure";
  } else if (
    allPartitionRoutesIn([
      "shared-terminal-residual-coordinate-partition-closes-graph-xi-candidate",
      "shared-terminal-residual-coordinate-partition-needs-xi-zeta-coupled-enclosure",
    ])
  ) {
    correlatedTerminalResidualPartitionRouteInterpretation =
      "shared-terminal-residual-coordinate-partition-mixed-xi-route";
  }
  return {
    row_count: rows.length,
    terminal_provider_h_indexes: terminalHIndexes,
    nonterminal_provider_h_indexes_exclude_terminal: rows.every(
      (row) => row.nonterminal_provider_h_indexes_exclude_terminal === true
    ),
    all_rows_positive_xi_stencil: rows.every(
      (row) =>
        Number(row.xi_interval?.[0]) > 0 && Number(row.xi_interval?.[1]) > 0
    ),
    all_rows_h38_solve_target_zeroed: rows.every(
      (row) =>
        row.h38_solve_target_zeroed === true &&
        row.all_active_reduced_source.h38_solve_target_zeroed === true &&
        row.terminal_replay.h38_solve_target_zeroed === true &&
        row.nonterminal_replay.h38_solve_target_zeroed === true &&
        row.terminal_graph_replay.h38_solve_target_zeroed === true &&
        row.terminal_graph_with_nonterminal_replay
          .h38_solve_target_zeroed === true &&
        row.terminal_graph_interval_residual_replay
          .h38_solve_target_zeroed === true &&
        row.terminal_graph_symmetric_residual_scale_one_replay
          .h38_solve_target_zeroed === true &&
        row.terminal_graph_interval_residual_with_nonterminal_replay
          .h38_solve_target_zeroed === true &&
        row.terminal_graph_shared_residual_sample_diagnostic?.sample_replays
          ?.every(
            (sample) =>
              sample.replay.h38_solve_target_zeroed === true
          ) === true &&
        row.terminal_graph_shared_residual_point_partition_diagnostic
          ?.partition_replays?.every(
            (partition) =>
              partition.replay.h38_solve_target_zeroed === true
          ) === true &&
        row.terminal_graph_shared_residual_graph_partition_diagnostic
          ?.partition_replays?.every(
            (partition) =>
              partition.replay.h38_solve_target_zeroed === true
          ) === true &&
        row.terminal_graph_shared_residual_point_endpoint_partition_diagnostic
          ?.partition_replays?.every((partition) =>
            partition.endpoint_replays.every(
              (endpoint) =>
                endpoint.replay.h38_solve_target_zeroed === true
            )
          ) === true &&
        row.terminal_graph_shared_residual_graph_endpoint_partition_diagnostic
          ?.partition_replays?.every((partition) =>
            partition.endpoint_replays.every(
              (endpoint) =>
                endpoint.replay.h38_solve_target_zeroed === true
            )
          ) === true
    ),
    all_rows_form_sigma_before_h_row_substitution: rows.every(
      (row) =>
        row.coordinate_route === "sigma-eta-before-h-row-substitution" &&
        row.all_active_reduced_source.sigma_h_tail_max_abs_upper === 0 &&
        row.terminal_replay.sigma_h_tail_max_abs_upper === 0 &&
        row.nonterminal_replay.sigma_h_tail_max_abs_upper === 0 &&
        row.terminal_graph_replay.sigma_h_tail_max_abs_upper === 0 &&
        row.terminal_graph_with_nonterminal_replay
          .sigma_h_tail_max_abs_upper === 0 &&
        row.terminal_graph_interval_residual_replay
          .sigma_h_tail_max_abs_upper === 0 &&
        row.terminal_graph_symmetric_residual_scale_one_replay
          .sigma_h_tail_max_abs_upper === 0 &&
        row.terminal_graph_interval_residual_with_nonterminal_replay
          .sigma_h_tail_max_abs_upper === 0 &&
        row.terminal_graph_shared_residual_sample_diagnostic?.sample_replays
          ?.every(
            (sample) => sample.replay.sigma_h_tail_max_abs_upper === 0
          ) === true &&
        row.terminal_graph_shared_residual_point_partition_diagnostic
          ?.partition_replays?.every(
            (partition) =>
              partition.replay.sigma_h_tail_max_abs_upper === 0
          ) === true &&
        row.terminal_graph_shared_residual_graph_partition_diagnostic
          ?.partition_replays?.every(
            (partition) =>
              partition.replay.sigma_h_tail_max_abs_upper === 0
          ) === true &&
        row.terminal_graph_shared_residual_point_endpoint_partition_diagnostic
          ?.partition_replays?.every((partition) =>
            partition.endpoint_replays.every(
              (endpoint) => endpoint.replay.sigma_h_tail_max_abs_upper === 0
            )
          ) === true &&
        row.terminal_graph_shared_residual_graph_endpoint_partition_diagnostic
          ?.partition_replays?.every((partition) =>
            partition.endpoint_replays.every(
              (endpoint) => endpoint.replay.sigma_h_tail_max_abs_upper === 0
            )
          ) === true
    ),
    all_rows_terminal_rows_dominate: rows.every(
      (row) =>
        row.terminal_eta_rows_dominate === true &&
        row.terminal_width_share_of_all > 0.95
    ),
    all_rows_terminal_replay_exceeds_nonterminal_replay: rows.every(
      (row) =>
        row.terminal_replay.full_source_width >
        row.nonterminal_replay.full_source_width
    ),
    all_rows_terminal_plus_nonterminal_replay_covers_all_active_width:
      rows.every(
        (row) =>
          row.terminal_replay.full_source_width +
            row.nonterminal_replay.full_source_width >=
          row.all_active_reduced_source.full_source_width * (1 - 1e-6)
      ),
    all_rows_terminal_graph_reduces_terminal_width: rows.every(
      (row) =>
        row.terminal_graph_replay.full_source_width <
        row.terminal_replay.full_source_width
    ),
    all_rows_terminal_graph_with_nonterminal_below_nonterminal_wall:
      rows.every(
        (row) =>
          row.terminal_graph_with_nonterminal_width_share_of_all < 0.1
      ),
    all_rows_terminal_interval_residual_recreates_terminal_width:
      rows.every(
        (row) =>
          row.terminal_graph_interval_residual_width_share_of_terminal >
          0.9
      ),
    min_terminal_width_share_of_all: Math.min(...terminalShares),
    max_nonterminal_width_share_of_all: Math.max(...nonterminalShares),
    min_terminal_plus_nonterminal_width_share_of_all: Math.min(
      ...terminalPlusNonterminalShares
    ),
    max_terminal_graph_width_share_of_terminal:
      Math.max(...graphTerminalShares),
    max_terminal_graph_with_nonterminal_width_share_of_all: Math.max(
      ...graphWithNonterminalShares
    ),
    min_terminal_graph_interval_residual_width_share_of_terminal:
      rawIntervalResidualShares.length > 0
        ? Math.min(...rawIntervalResidualShares)
        : null,
    residual_budget_target_share_of_all: Number(
      residualBudgetTargetShareOfAll
    ),
    all_rows_graph_plus_nonterminal_under_target: rows.every(
      (row) => row.graph_plus_nonterminal_under_target === true
    ),
    all_rows_raw_interval_residual_over_target: rows.every(
      (row) =>
        row.raw_interval_residual_with_nonterminal_over_target === true
    ),
    all_rows_symmetric_raw_residual_scale_one_over_target: rows.every(
      (row) => row.symmetric_raw_residual_scale_one_over_target === true
    ),
    all_rows_have_finite_residual_scale_budget: rows.every(
      (row) =>
        finitePositive(row.allowed_symmetric_raw_residual_scale_for_target) &&
        row.allowed_symmetric_raw_residual_scale_for_target < 1
    ),
    all_rows_midpoint_fit_residual_below_symmetric_budget: rows.every(
      (row) => row.midpoint_fit_residual_below_symmetric_budget === true
    ),
    all_rows_producer_intervals_contained_by_allowed_budget: rows.every(
      (row) =>
        row.all_terminal_producer_intervals_contained_by_allowed_budget ===
        true
    ),
    all_rows_producer_interval_budget_no_go: rows.every(
      (row) =>
        row.all_terminal_producer_intervals_contained_by_allowed_budget ===
        false
    ),
    all_rows_midpoint_fit_residuals_inside_allowed_budget: rows.every(
      (row) =>
        row.all_terminal_midpoint_fit_residuals_inside_allowed_budget ===
        true
    ),
    all_rows_shared_residual_sample_hull_under_target: rows.every(
      (row) => row.shared_residual_sample_hull_under_target === true
    ),
    all_rows_correlated_terminal_residual_under_target: rows.every(
      (row) => row.correlated_terminal_residual_under_target === true
    ),
    all_rows_correlated_terminal_residual_partitions_under_target:
      rows.every(
        (row) =>
          row.correlated_terminal_residual_partitions_under_target === true
      ),
    all_rows_correlated_terminal_residual_graph_partitions_under_target:
      rows.every(
        (row) =>
          row.correlated_terminal_residual_graph_partitions_under_target ===
          true
      ),
    all_rows_correlated_terminal_residual_endpoint_partitions_under_target:
      rows.every(
        (row) =>
          row.correlated_terminal_residual_endpoint_partitions_under_target ===
          true
      ),
    all_rows_correlated_terminal_residual_graph_endpoint_partitions_under_target:
      rows.every(
        (row) =>
          row
            .correlated_terminal_residual_graph_endpoint_partitions_under_target ===
          true
      ),
    all_rows_correlated_terminal_residual_affine_envelopes_under_target:
      rows.every(
        (row) =>
          row.correlated_terminal_residual_affine_envelopes_under_target ===
          true
      ),
    all_rows_correlated_terminal_residual_graph_affine_envelopes_under_target:
      rows.every(
        (row) =>
          row
            .correlated_terminal_residual_graph_affine_envelopes_under_target ===
          true
      ),
    all_rows_correlated_terminal_residual_midpoint_linearity_checks_pass:
      rows.every((row) =>
        row.terminal_graph_shared_residual_point_endpoint_partition_diagnostic
          ?.partition_replays?.every(
            (partition) =>
              partition.midpoint_linearity_check_passed === true
          )
      ),
    all_rows_correlated_terminal_residual_graph_midpoint_linearity_checks_pass:
      rows.every((row) =>
        row.terminal_graph_shared_residual_graph_endpoint_partition_diagnostic
          ?.partition_replays?.every(
            (partition) =>
              partition.midpoint_linearity_check_passed === true
          )
      ),
    all_rows_correlated_terminal_residual_affine_endpoint_control:
      rows.every(
        (row) =>
          row
            .correlated_terminal_residual_affine_endpoint_control_candidate ===
          true
      ),
    terminal_zeta_degree_bound_summary: {
      source_coefficient_y_order: H38_NUMERATOR_Y_ORDER,
      max_shared_residual_power_by_y_order:
        zetaDegreeBounds.length > 0
          ? Math.max(
              ...zetaDegreeBounds.map((bound) =>
                Number(bound?.max_shared_residual_power_by_y_order)
              )
            )
          : null,
      min_two_terminal_factor_gap_to_source_order:
        zetaDegreeBounds.length > 0
          ? Math.min(
              ...zetaDegreeBounds.map(
                (bound) =>
                  Number(bound?.two_terminal_factor_min_y_order) -
                  H38_NUMERATOR_Y_ORDER
              )
            )
          : null,
      all_rows_affine_in_shared_residual_coordinate: rows.every(
        (row) =>
          row.terminal_graph_shared_residual_zeta_degree_bound
            ?.affine_in_shared_residual_coordinate === true
      ),
      route_interpretation: rows.every(
        (row) =>
          row.terminal_graph_shared_residual_zeta_degree_bound
            ?.route_interpretation ===
          "shared-terminal-residual-zeta-affine-by-y-order-gap"
      )
        ? "shared-terminal-residual-zeta-affine-by-y-order-gap"
        : "shared-terminal-residual-zeta-degree-open",
    },
    max_graph_plus_nonterminal_width_share_of_all: Math.max(
      ...graphWithNonterminalShares
    ),
    min_allowed_symmetric_raw_residual_scale_for_target:
      allowedScales.length > 0 ? Math.min(...allowedScales) : null,
    max_allowed_symmetric_raw_residual_scale_for_target:
      allowedScales.length > 0 ? Math.max(...allowedScales) : null,
    max_midpoint_fit_residual_scale_to_raw:
      midpointFitResidualScales.length > 0
        ? Math.max(...midpointFitResidualScales)
        : null,
    max_required_scale_to_allowed_scale_ratio:
      requiredScaleToAllowedRatios.length > 0
        ? Math.max(...requiredScaleToAllowedRatios)
        : null,
    min_allowed_radius_to_producer_half_width_ratio:
      allowedRadiusToProducerHalfWidthRatios.length > 0
        ? Math.min(...allowedRadiusToProducerHalfWidthRatios)
        : null,
    max_midpoint_fit_residual_to_allowed_radius_ratio:
      midpointFitToAllowedRadiusRatios.length > 0
        ? Math.max(...midpointFitToAllowedRadiusRatios)
        : null,
    min_raw_interval_residual_width_share_of_terminal:
      rawIntervalResidualShares.length > 0
        ? Math.min(...rawIntervalResidualShares)
        : null,
    min_raw_interval_residual_with_nonterminal_width_share_of_all:
      Math.min(...rawIntervalResidualWithNonterminalShares),
    min_symmetric_raw_residual_scale_one_width_share_of_all:
      Math.min(...symmetricScaleOneShares),
    max_shared_residual_sample_hull_width_share_of_all:
      sharedResidualSampleShares.length > 0
        ? Math.max(...sharedResidualSampleShares)
        : null,
    min_interval_to_shared_residual_sample_hull_width_ratio:
      intervalToSharedResidualSampleRatios.length > 0
        ? Math.min(...intervalToSharedResidualSampleRatios)
        : null,
    max_correlated_terminal_residual_width_share_of_all:
      rows.length > 0
        ? Math.max(
            ...rows.map((row) =>
              Number(
                row.max_terminal_graph_correlated_residual_width_share_of_all
              )
            )
          )
        : null,
    min_interval_to_correlated_terminal_residual_width_ratio:
      rows.length > 0
        ? Math.min(
            ...rows.map((row) =>
              Number(row.interval_to_correlated_terminal_residual_width_ratio)
            )
          )
        : null,
    max_projected_residual_coordinate_partition_count_for_target:
      projectedResidualCoordinatePartitionCounts.length > 0
        ? Math.max(...projectedResidualCoordinatePartitionCounts)
        : null,
    max_projected_residual_coordinate_partitioned_hull_width_share_of_all:
      projectedResidualCoordinatePartitionedShares.length > 0
        ? Math.max(...projectedResidualCoordinatePartitionedShares)
        : null,
    max_residual_coordinate_partition_count:
      pointPartitionCounts.length > 0
        ? Math.max(...pointPartitionCounts)
        : null,
    max_graph_residual_coordinate_partition_count:
      graphPartitionCounts.length > 0
        ? Math.max(...graphPartitionCounts)
        : null,
    max_correlated_terminal_residual_partition_width_share_of_all:
      pointPartitionShares.length > 0
        ? Math.max(...pointPartitionShares)
        : null,
    max_correlated_terminal_residual_graph_partition_width_share_of_all:
      graphPartitionShares.length > 0
        ? Math.max(...graphPartitionShares)
        : null,
    max_correlated_terminal_residual_endpoint_partition_width_share_of_all:
      pointEndpointPartitionShares.length > 0
        ? Math.max(...pointEndpointPartitionShares)
        : null,
    max_correlated_terminal_residual_graph_endpoint_partition_width_share_of_all:
      graphEndpointPartitionShares.length > 0
        ? Math.max(...graphEndpointPartitionShares)
        : null,
    max_correlated_terminal_residual_affine_envelope_width_share_of_all:
      pointAffineEnvelopeShares.length > 0
        ? Math.max(...pointAffineEnvelopeShares)
        : null,
    max_correlated_terminal_residual_graph_affine_envelope_width_share_of_all:
      graphAffineEnvelopeShares.length > 0
        ? Math.max(...graphAffineEnvelopeShares)
        : null,
    max_correlated_terminal_residual_affine_envelope_slope_abs_upper:
      pointAffineEnvelopeSlopeAbsUppers.length > 0
        ? Math.max(...pointAffineEnvelopeSlopeAbsUppers)
        : null,
    max_correlated_terminal_residual_graph_affine_envelope_slope_abs_upper:
      graphAffineEnvelopeSlopeAbsUppers.length > 0
        ? Math.max(...graphAffineEnvelopeSlopeAbsUppers)
        : null,
    max_correlated_terminal_residual_midpoint_linearity_gap_abs_upper:
      pointMidpointLinearityGapAbsUppers.length > 0
        ? Math.max(...pointMidpointLinearityGapAbsUppers)
        : null,
    max_correlated_terminal_residual_graph_midpoint_linearity_gap_abs_upper:
      graphMidpointLinearityGapAbsUppers.length > 0
        ? Math.max(...graphMidpointLinearityGapAbsUppers)
        : null,
    correlated_terminal_residual_partition_route_interpretation:
      correlatedTerminalResidualPartitionRouteInterpretation,
    shared_residual_sample_route_interpretation:
      rows.every(
        (row) =>
          row.terminal_graph_shared_residual_sample_diagnostic
            ?.route_interpretation ===
          "shared-terminal-residual-coordinate-collapses-independent-hull-artifact"
      )
        ? "shared-terminal-residual-coordinate-collapses-independent-hull-artifact"
        : rows.every(
            (row) =>
              row.terminal_graph_shared_residual_sample_diagnostic
                ?.route_interpretation ===
              "shared-terminal-residual-coordinate-needs-small-partition"
          )
          ? "shared-terminal-residual-coordinate-needs-small-partition"
        : rows.every(
            (row) =>
              row.terminal_graph_shared_residual_sample_diagnostic
                ?.route_interpretation ===
                "shared-terminal-residual-coordinate-reduces-independent-hull-pressure" ||
              row.terminal_graph_shared_residual_sample_diagnostic
                ?.route_interpretation ===
                "shared-terminal-residual-coordinate-needs-small-partition" ||
              row.terminal_graph_shared_residual_sample_diagnostic
                ?.route_interpretation ===
                "shared-terminal-residual-coordinate-collapses-independent-hull-artifact"
          )
          ? "shared-terminal-residual-coordinate-reduces-independent-hull-pressure"
          : "shared-terminal-residual-coordinate-open",
    correlated_terminal_residual_route_interpretation:
      rows.every(
        (row) =>
          row.correlated_terminal_residual_collapse_candidate === true
      )
        ? "shared-terminal-residual-coordinate-collapses-independent-hull-artifact"
        : rows.every(
            (row) =>
              row.terminal_graph_shared_residual_sample_diagnostic
                ?.route_interpretation ===
              "shared-terminal-residual-coordinate-needs-small-partition"
          )
          ? "shared-terminal-residual-coordinate-needs-small-partition"
        : rows.every(
            (row) =>
              row.terminal_graph_shared_residual_sample_diagnostic
                ?.route_interpretation ===
                "shared-terminal-residual-coordinate-reduces-independent-hull-pressure" ||
              row.terminal_graph_shared_residual_sample_diagnostic
                ?.route_interpretation ===
                "shared-terminal-residual-coordinate-needs-small-partition" ||
              row.correlated_terminal_residual_collapse_candidate === true
          )
          ? "shared-terminal-residual-coordinate-reduces-independent-hull-pressure"
          : "shared-terminal-residual-coordinate-open",
    route_interpretation:
      rows.every(
        (row) =>
          row.terminal_graph_remainder_budget_route_interpretation ===
          "terminal-graph-remainder-budget-localizes-obstruction-to-producer-interval-width"
      )
        ? "terminal-graph-remainder-budget-localizes-enclosure-failure-to-producer-interval-width"
        : "terminal-graph-remainder-budget-route-open",
  };
}

function terminalProducerRefinementForecast({
  targetSpeedInterval,
  branch,
  rootSubdivisions,
  polynomialDegree,
  terminalHIndexes,
  baseSubcellCount,
  baseBudgetRows,
  refinementSubcellCounts,
  comparisonWindowRowCount = 5,
}) {
  const baselineAllowedRadiusByHIndex = new Map();
  baseBudgetRows.forEach((row) => {
    row.terminal_graph_remainder_budget_entries.forEach((entry) => {
      const current = Number(
        baselineAllowedRadiusByHIndex.get(entry.h_index) ?? 0
      );
      baselineAllowedRadiusByHIndex.set(
        entry.h_index,
        Math.max(
          current,
          Number(entry.allowed_residual_radius_for_source_budget)
        )
      );
    });
  });
  const sortedSubcellCounts = [...new Set(refinementSubcellCounts.map(Number))]
    .filter((count) => Number.isInteger(count) && count >= comparisonWindowRowCount)
    .sort((left, right) => left - right);
  const forecastRows = sortedSubcellCounts.map((subcellCount) => {
    if (subcellCount === baseSubcellCount) {
      const entries = baseBudgetRows.flatMap((row) =>
        row.terminal_graph_remainder_budget_entries.map((entry) => ({
          cell_id: row.cell_id,
          h_index: entry.h_index,
          xi_interval: row.xi_interval,
          xi_midpoint: row.xi_midpoint,
          producer_interval: entry.producer_interval,
          graph_interval: entry.graph_interval,
          row_residual_interval: entry.row_residual_interval,
          row_residual_abs_upper: entry.row_residual_abs_upper,
          producer_interval_half_width: entry.producer_interval_half_width,
          baseline_allowed_residual_radius:
            entry.allowed_residual_radius_for_source_budget,
          residual_to_baseline_allowed_radius_ratio:
            entry.required_scale_to_allowed_scale_ratio,
          producer_interval_contained_by_baseline_allowed_radius:
            entry.producer_interval_contained_by_budget,
        }))
      );
      const residualRatios = entries
        .map((entry) =>
          Number(entry.residual_to_baseline_allowed_radius_ratio)
        )
        .filter(Number.isFinite);
      const residualAbsUppers = entries
        .map((entry) => Number(entry.row_residual_abs_upper))
        .filter(Number.isFinite);
      return {
        subcell_count: subcellCount,
        comparison_stencil_index:
          baseSubcellCount - comparisonWindowRowCount,
        comparison_xi_midpoint_span: [
          entries[0]?.xi_midpoint,
          entries[entries.length - 1]?.xi_midpoint,
        ],
        terminal_provider_h_indexes: terminalHIndexes,
        terminal_entry_count: entries.length,
        terminal_refinement_entries: entries,
        max_terminal_row_residual_abs_upper: Math.max(...residualAbsUppers),
        max_residual_to_baseline_allowed_radius_ratio:
          Math.max(...residualRatios),
        min_residual_to_baseline_allowed_radius_ratio:
          Math.min(...residualRatios),
        all_terminal_entries_fit_baseline_allowed_radius: entries.every(
          (entry) =>
            entry.producer_interval_contained_by_baseline_allowed_radius ===
            true
        ),
      };
    }
    const rows = targetRowsForSubcellCount({
      targetSpeedInterval,
      subcellCount,
      rootSubdivisions,
    });
    if (rows.length !== subcellCount) {
      throw new Error("terminal producer refinement forecast requires a complete subcover");
    }
    const comparisonStencilIndex = subcellCount - comparisonWindowRowCount;
    const comparisonRows = rows.slice(
      comparisonStencilIndex,
      comparisonStencilIndex + comparisonWindowRowCount
    );
    const transportProfile = hRowPolynomialTransportProfileForRows({
      rows: comparisonRows,
      branch,
      targetSpeedInterval,
      degree: polynomialDegree,
    });
    const entries = comparisonRows.flatMap((row) => {
      const branchRow = branchRowFor(row, branch);
      const zeroedHIntervals = cloneHIntervalsWithZeroedSolveTarget(
        hIntervalsFromBranchRow(branchRow, { hCount: 39 })
      );
      const graphHIntervals = hIntervalsForPolynomialGraphInterval({
        transportProfile,
        noiseInterval: speedIntervalXiInterval({ row, targetSpeedInterval }),
      });
      return terminalHIndexes.map((hIndex) => {
        const producerInterval = zeroedHIntervals[hIndex];
        const graphInterval = graphHIntervals[hIndex];
        const rowResidualInterval = [
          Number(producerInterval[0]) - Number(graphInterval[1]),
          Number(producerInterval[1]) - Number(graphInterval[0]),
        ];
        const rowResidualAbsUpper = intervalAbsUpper(rowResidualInterval);
        const baselineAllowedRadius = Number(
          baselineAllowedRadiusByHIndex.get(hIndex)
        );
        return {
          cell_id: row.cell_id,
          h_index: hIndex,
          xi_interval: speedIntervalXiInterval({ row, targetSpeedInterval }),
          xi_midpoint: speedMidpointXiCoordinate({
            row,
            targetSpeedInterval,
          }),
          producer_interval: producerInterval,
          graph_interval: graphInterval,
          row_residual_interval: rowResidualInterval,
          row_residual_abs_upper: rowResidualAbsUpper,
          producer_interval_half_width: intervalWidth(producerInterval) / 2,
          baseline_allowed_residual_radius: baselineAllowedRadius,
          residual_to_baseline_allowed_radius_ratio: finitePositive(
            baselineAllowedRadius
          )
            ? rowResidualAbsUpper / baselineAllowedRadius
            : null,
          producer_interval_contained_by_baseline_allowed_radius:
            finitePositive(baselineAllowedRadius) &&
            rowResidualAbsUpper <= baselineAllowedRadius,
        };
      });
    });
    const residualRatios = entries
      .map((entry) =>
        Number(entry.residual_to_baseline_allowed_radius_ratio)
      )
      .filter(Number.isFinite);
    const residualAbsUppers = entries
      .map((entry) => Number(entry.row_residual_abs_upper))
      .filter(Number.isFinite);
    const maxResidualAbsUpper = Math.max(...residualAbsUppers);
    return {
      subcell_count: subcellCount,
      comparison_stencil_index: comparisonStencilIndex,
      comparison_xi_midpoint_span: [
        entries[0]?.xi_midpoint,
        entries[entries.length - 1]?.xi_midpoint,
      ],
      terminal_provider_h_indexes: terminalHIndexes,
      terminal_entry_count: entries.length,
      terminal_refinement_entries: entries,
      max_terminal_row_residual_abs_upper: maxResidualAbsUpper,
      max_residual_to_baseline_allowed_radius_ratio:
        Math.max(...residualRatios),
      min_residual_to_baseline_allowed_radius_ratio:
        Math.min(...residualRatios),
      all_terminal_entries_fit_baseline_allowed_radius: entries.every(
        (entry) =>
          entry.producer_interval_contained_by_baseline_allowed_radius === true
      ),
    };
  });
  const baseForecastRow =
    forecastRows.find((row) => row.subcell_count === baseSubcellCount) ??
    forecastRows[0];
  const baseResidualAbsUpper = Number(
    baseForecastRow?.max_terminal_row_residual_abs_upper
  );
  const normalizedForecastRows = forecastRows.map((row) => ({
    ...row,
    residual_width_ratio_to_base: finitePositive(baseResidualAbsUpper)
      ? row.max_terminal_row_residual_abs_upper / baseResidualAbsUpper
      : null,
  }));
  const firstRow = normalizedForecastRows[0];
  const lastRow = normalizedForecastRows[normalizedForecastRows.length - 1];
  const observedRefinementScalingExponent =
    finitePositive(firstRow?.max_terminal_row_residual_abs_upper) &&
    finitePositive(lastRow?.max_terminal_row_residual_abs_upper) &&
    Number(lastRow.subcell_count) > Number(firstRow.subcell_count)
      ? Math.log(
          Number(firstRow.max_terminal_row_residual_abs_upper) /
            Number(lastRow.max_terminal_row_residual_abs_upper)
        ) /
        Math.log(Number(lastRow.subcell_count) / Number(firstRow.subcell_count))
      : null;
  const assumedRefinementScalingExponent = 1;
  const forecastScalingExponentUsed = finitePositive(
    observedRefinementScalingExponent
  )
    ? observedRefinementScalingExponent
    : assumedRefinementScalingExponent;
  const baseRequiredFactor = Number(
    baseForecastRow?.max_residual_to_baseline_allowed_radius_ratio
  );
  const projectedSubcellCountForBaselineBudget =
    finitePositive(baseRequiredFactor) &&
    finitePositive(forecastScalingExponentUsed)
      ? Math.ceil(
          Number(baseSubcellCount) *
            Math.pow(
              baseRequiredFactor,
              1 / forecastScalingExponentUsed
            )
        )
      : null;
  return {
    base_subcell_count: baseSubcellCount,
    refinement_subcell_counts: sortedSubcellCounts,
    comparison_window_row_count: comparisonWindowRowCount,
    terminal_provider_h_indexes: terminalHIndexes,
    baseline_allowed_radius_by_h_index: terminalHIndexes.map((hIndex) => ({
      h_index: hIndex,
      baseline_allowed_residual_radius: Number(
        baselineAllowedRadiusByHIndex.get(hIndex)
      ),
    })),
    refinement_rows: normalizedForecastRows,
    observed_refinement_scaling_exponent:
      observedRefinementScalingExponent,
    assumed_refinement_scaling_exponent:
      assumedRefinementScalingExponent,
    forecast_scaling_exponent_used: forecastScalingExponentUsed,
    base_required_refinement_factor_to_fit_budget: baseRequiredFactor,
    projected_subcell_count_for_baseline_budget:
      projectedSubcellCountForBaselineBudget,
    projected_subcell_multiplier_for_baseline_budget:
      finitePositive(projectedSubcellCountForBaselineBudget)
        ? projectedSubcellCountForBaselineBudget / Number(baseSubcellCount)
        : null,
    final_refined_ratio_to_baseline_budget:
      lastRow?.max_residual_to_baseline_allowed_radius_ratio ?? null,
    final_refined_entries_fit_baseline_allowed_radius:
      lastRow?.all_terminal_entries_fit_baseline_allowed_radius ?? false,
    route_interpretation:
      finitePositive(forecastScalingExponentUsed) &&
      forecastScalingExponentUsed > 0.9 &&
      forecastScalingExponentUsed < 1.1 &&
      finitePositive(projectedSubcellCountForBaselineBudget) &&
      projectedSubcellCountForBaselineBudget > baseSubcellCount * 20
        ? "linear-subcell-refinement-forecast-large-partition-needed"
        : "terminal-producer-refinement-forecast-open",
  };
}

function sourceTermCancellationOnRefinedWorstStencil({
  fourthDifferenceDiagnostic,
  refinementRows,
  sourceTermSamples,
  sourceTermComponents,
  refinedStencilSubcellCount,
  growthLocalizationSummary,
}) {
  const directLocalization = refinementRows.find(
    (row) => row.component === "direct_n38_expression"
  )?.fourth_difference_growth_localization;
  const directStencil = directLocalization?.refined_worst_stencil;
  if (!directStencil) {
    return {
      status: "source-term-cancellation-witness-unavailable",
      reason: "direct_n38_expression refined worst stencil is unavailable",
    };
  }
  const comparisonStencilIndex = directStencil.stencil_index;
  const comparisonXiMidpointSpan = directStencil.xi_midpoint_span;
  const directRows = componentFourthDifferenceRowsForStencil({
    fourthDifferenceDiagnostic,
    component: "direct_n38_expression",
    stencilSubcellCount: refinedStencilSubcellCount,
  });
  const directRow = directRows.find(
    (row) => row.stencil_index === comparisonStencilIndex
  );
  const sourceTermRows = sourceTermComponents.map((component) => {
    const row = fourthDifferenceRowAtStencilIndexForComponent({
      component,
      samples: sourceTermSamples,
      stencilIndex: comparisonStencilIndex,
    });
    return {
      component,
      stencil_index: row?.stencil_index ?? comparisonStencilIndex,
      xi_midpoint_span: row?.xi_midpoint_span ?? comparisonXiMidpointSpan,
      fourth_difference: row?.fourth_difference ?? null,
      abs_fourth_difference: row?.abs_fourth_difference ?? null,
      fourth_derivative_estimate: row?.fourth_derivative_estimate ?? null,
      sign: signLabel(row?.fourth_difference),
    };
  });
  const allSourceRowsPresent = sourceTermRows.every((row) =>
    Number.isFinite(Number(row.fourth_difference))
  );
  if (!directRow || !allSourceRowsPresent) {
    return {
      status: "source-term-cancellation-witness-unavailable",
      reason:
        "direct or source-term fourth-difference rows are unavailable on the refined stencil",
      comparison_stencil_index: comparisonStencilIndex,
      refined_source_stencil_subcell_count: refinedStencilSubcellCount,
      source_term_components: sourceTermComponents,
      source_term_rows: sourceTermRows,
    };
  }
  const sourceFourthDifferenceSum = sourceTermRows.reduce(
    (total, row) => total + Number(row.fourth_difference),
    0
  );
  const sourceAbsFourthDifferenceSum = sourceTermRows.reduce(
    (total, row) => total + Math.abs(Number(row.fourth_difference)),
    0
  );
  const directFourthDifference = Number(directRow.fourth_difference);
  const sourceSumToDirectGap = Math.abs(
    sourceFourthDifferenceSum - directFourthDifference
  );
  const sourceSumToDirectRelativeGap = finitePositive(
    Math.abs(directFourthDifference)
  )
    ? sourceSumToDirectGap / Math.abs(directFourthDifference)
    : sourceSumToDirectGap;
  const signedSumToAbsSumRatio = finitePositive(sourceAbsFourthDifferenceSum)
    ? Math.abs(sourceFourthDifferenceSum) / sourceAbsFourthDifferenceSum
    : null;
  const cancellationFraction =
    signedSumToAbsSumRatio === null ? null : 1 - signedSumToAbsSumRatio;
  const directSign = signLabel(directFourthDifference);
  const sourceRowsWithShares = sourceTermRows
    .map((row) => ({
      ...row,
      abs_fourth_difference_share: finitePositive(sourceAbsFourthDifferenceSum)
        ? Math.abs(Number(row.fourth_difference)) /
          sourceAbsFourthDifferenceSum
        : null,
      matches_direct_fourth_difference_sign: row.sign === directSign,
    }))
    .sort(
      (left, right) =>
        Number(right.abs_fourth_difference) - Number(left.abs_fourth_difference)
    );
  const dominantSourceRow = sourceRowsWithShares[0] ?? null;
  const sourceSumReplaysDirect =
    Number(sourceSumToDirectRelativeGap) <= 1e-9 ||
    sourceSumToDirectGap <= 1e-18;
  const sourceTermsReinforce =
    sourceSumReplaysDirect && Number(signedSumToAbsSumRatio) >= 0.9;
  const sourceTermsCancel =
    sourceSumReplaysDirect && Number(signedSumToAbsSumRatio) <= 0.25;
  return {
    status: "source-term-cancellation-witness-emitted",
    refined_source_stencil_subcell_count: refinedStencilSubcellCount,
    comparison_basis:
      "direct_n38_expression refined worst fourth-difference stencil",
    comparison_stencil_index: comparisonStencilIndex,
    comparison_xi_midpoint_span: comparisonXiMidpointSpan,
    comparison_xi_midpoint_center: directStencil.xi_midpoint_center,
    positive_xi_region_status:
      growthLocalizationSummary.refined_worst_stencil_region_status,
    source_term_components: sourceTermComponents,
    direct_fourth_difference: directFourthDifference,
    direct_abs_fourth_difference: Math.abs(directFourthDifference),
    direct_fourth_derivative_estimate: directRow.fourth_derivative_estimate,
    direct_fourth_difference_sign: directSign,
    source_term_fourth_difference_sum: sourceFourthDifferenceSum,
    source_term_abs_fourth_difference_sum: sourceAbsFourthDifferenceSum,
    source_sum_to_direct_absolute_gap: sourceSumToDirectGap,
    source_sum_to_direct_relative_gap: sourceSumToDirectRelativeGap,
    source_sum_replays_direct_fourth_difference: sourceSumReplaysDirect,
    signed_source_sum_to_abs_source_sum_ratio: signedSumToAbsSumRatio,
    source_cancellation_fraction: cancellationFraction,
    source_terms_matching_direct_sign_count: sourceRowsWithShares.filter(
      (row) => row.matches_direct_fourth_difference_sign
    ).length,
    source_terms_opposing_direct_sign_count: sourceRowsWithShares.filter(
      (row) => row.sign !== "zero" && row.sign !== directSign
    ).length,
    dominant_source_term_by_abs_fourth_difference:
      dominantSourceRow?.component ?? null,
    dominant_source_term_abs_fourth_difference_share:
      dominantSourceRow?.abs_fourth_difference_share ?? null,
    source_term_rows: sourceRowsWithShares,
    cancellation_interpretation: !sourceSumReplaysDirect
      ? "source-term-sum-does-not-replay-direct-fourth-difference"
      : sourceTermsReinforce
        ? "source-terms-reinforce-direct-positive-xi-fourth-difference"
        : sourceTermsCancel
          ? "source-terms-cancel-before-direct-positive-xi-fourth-difference"
          : "source-terms-partially-cancel-direct-positive-xi-fourth-difference",
  };
}

function correctedRetileRowsForFourthDerivative({
  component,
  xiDomainInterval,
  tileCount,
  polynomialDegree,
  fourthDerivativeUpper,
  pointTermWidthScale,
}) {
  const [left, right] = xiDomainInterval;
  const tileWidth = (right - left) / tileCount;
  return Array.from({ length: tileCount }, (_, tileIndex) => {
    const tileLeft = left + tileIndex * tileWidth;
    const tileRight = tileLeft + tileWidth;
    const xiHalfWidth = tileWidth / 2;
    const correctedRemainderUpper = taylorRemainderUpperFromFourthDerivative({
      fourthDerivativeUpper,
      xiHalfWidth,
    });
    const requiredFourthDerivativeUpper =
      fourthDerivativeUpperForTaylorRemainder({
        remainderUpper: pointTermWidthScale,
        xiHalfWidth,
      });
    const remainderRatio = finitePositive(pointTermWidthScale)
      ? Number(correctedRemainderUpper) / Number(pointTermWidthScale)
      : null;
    const derivativeHeadroomRatio = finitePositive(
      requiredFourthDerivativeUpper
    )
      ? Number(fourthDerivativeUpper) / Number(requiredFourthDerivativeUpper)
      : null;
    return {
      component,
      tile_index: tileIndex,
      xi_interval: [tileLeft, tileRight],
      xi_center: (tileLeft + tileRight) / 2,
      xi_half_width: xiHalfWidth,
      polynomial_degree: polynomialDegree,
      taylor_remainder_order: polynomialDegree + 1,
      corrected_fourth_derivative_upper: fourthDerivativeUpper,
      required_fourth_derivative_upper_for_point_scale:
        requiredFourthDerivativeUpper,
      corrected_remainder_upper: correctedRemainderUpper,
      corrected_remainder_to_point_width_ratio: remainderRatio,
      derivative_headroom_ratio: derivativeHeadroomRatio,
      passes_point_width_scale: Number(remainderRatio) <= 1,
    };
  });
}

function correctedRetilePrototypeForComponent({
  component,
  componentFourthDifferenceSummaries,
  observedM4InflationFactor,
  pointTermWidthScale,
}) {
  const worstComponentSummary = componentFourthDifferenceSummaries.reduce(
    (best, candidate) =>
      Number(candidate.fourth_difference_summary.max_fourth_derivative_estimate) >
      Number(
        best?.fourth_difference_summary?.max_fourth_derivative_estimate ?? -1
      )
        ? candidate
        : best,
    null
  );
  if (!worstComponentSummary) {
    throw new Error(`no fourth-difference summary for ${component}`);
  }
  const observedFourthDerivativeUpper = Number(
    worstComponentSummary.fourth_difference_summary
      .max_fourth_derivative_estimate
  );
  const correctedFourthDerivativeUpper =
    observedFourthDerivativeUpper * observedM4InflationFactor;
  const parentXiHalfWidth = Number(worstComponentSummary.parent_xi_half_width);
  const observedRetileCount = tileCountRequiredForFourthDerivative({
    fourthDerivativeUpper: observedFourthDerivativeUpper,
    pointTermWidthScale,
    parentXiHalfWidth,
  });
  const correctedTileCount = tileCountRequiredForFourthDerivative({
    fourthDerivativeUpper: correctedFourthDerivativeUpper,
    pointTermWidthScale,
    parentXiHalfWidth,
  });
  const correctedRows = correctedRetileRowsForFourthDerivative({
    component,
    xiDomainInterval: worstComponentSummary.xi_domain_interval,
    tileCount: correctedTileCount,
    polynomialDegree: 3,
    fourthDerivativeUpper: correctedFourthDerivativeUpper,
    pointTermWidthScale,
  });
  return {
    component,
    source_stencil_subcell_count:
      worstComponentSummary.stencil_subcell_count,
    source_derivative_target_tile_count:
      worstComponentSummary.derivative_target_tile_count,
    observed_retile_count_from_fourth_difference: observedRetileCount,
    corrected_tile_count: correctedTileCount,
    xi_domain_interval: worstComponentSummary.xi_domain_interval,
    parent_xi_half_width: parentXiHalfWidth,
    polynomial_degree: 3,
    taylor_remainder_order: 4,
    point_term_width_scale: pointTermWidthScale,
    observed_fourth_derivative_upper: observedFourthDerivativeUpper,
    observed_m4_inflation_factor: observedM4InflationFactor,
    corrected_fourth_derivative_upper: correctedFourthDerivativeUpper,
    corrected_tile_count_to_original_tile_count_ratio:
      finitePositive(worstComponentSummary.derivative_target_tile_count)
        ? correctedTileCount /
          Number(worstComponentSummary.derivative_target_tile_count)
        : null,
    max_corrected_remainder_to_point_width_ratio: Math.max(
      ...correctedRows.map((row) =>
        Number(row.corrected_remainder_to_point_width_ratio)
      )
    ),
    all_corrected_tiles_pass_point_width_scale: correctedRows.every(
      (row) => row.passes_point_width_scale
    ),
    corrected_retile_rows: correctedRows,
  };
}

function worstFourthDifferenceSummaryForComponent({
  component,
  fourthDifferenceDiagnostic,
  stencilSubcellCounts,
}) {
  const allowedStencils = new Set(stencilSubcellCounts.map(Number));
  const componentSummaries = fourthDifferenceDiagnostic.stencil_summaries
    .filter((summary) => allowedStencils.has(summary.stencil_subcell_count))
    .flatMap((summary) =>
      summary.component_fourth_difference_rows.filter(
        (candidate) => candidate.component === component
      )
    );
  if (componentSummaries.length === 0) {
    throw new Error(`no fourth-difference summary for ${component}`);
  }
  return componentSummaries.reduce((best, candidate) =>
    Number(candidate.fourth_difference_summary.max_fourth_derivative_estimate) >
    Number(best?.fourth_difference_summary?.max_fourth_derivative_estimate ?? -1)
      ? candidate
      : best,
  null);
}

function m4RefinementRowForComponent({
  component,
  fourthDifferenceDiagnostic,
  baseStencilSubcellCounts,
  refinementStencilSubcellCounts,
  observedM4InflationFactor,
  pointTermWidthScale,
}) {
  const baseSummary = worstFourthDifferenceSummaryForComponent({
    component,
    fourthDifferenceDiagnostic,
    stencilSubcellCounts: baseStencilSubcellCounts,
  });
  const refinedSummary = worstFourthDifferenceSummaryForComponent({
    component,
    fourthDifferenceDiagnostic,
    stencilSubcellCounts: refinementStencilSubcellCounts,
  });
  const basePrototype = correctedRetilePrototypeForComponent({
    component,
    componentFourthDifferenceSummaries: [baseSummary],
    observedM4InflationFactor,
    pointTermWidthScale,
  });
  const refinedPrototype = correctedRetilePrototypeForComponent({
    component,
    componentFourthDifferenceSummaries: [refinedSummary],
    observedM4InflationFactor,
    pointTermWidthScale,
  });
  const baseCorrectedRowsUnderRefinedObservedM4 =
    correctedRetileRowsForFourthDerivative({
      component,
      xiDomainInterval: basePrototype.xi_domain_interval,
      tileCount: basePrototype.corrected_tile_count,
      polynomialDegree: basePrototype.polynomial_degree,
      fourthDerivativeUpper: refinedPrototype.observed_fourth_derivative_upper,
      pointTermWidthScale,
    });
  const baseCorrectedRowsUnderRefinedCorrectedM4 =
    correctedRetileRowsForFourthDerivative({
      component,
      xiDomainInterval: basePrototype.xi_domain_interval,
      tileCount: basePrototype.corrected_tile_count,
      polynomialDegree: basePrototype.polynomial_degree,
      fourthDerivativeUpper: refinedPrototype.corrected_fourth_derivative_upper,
      pointTermWidthScale,
    });
  const maxBaseRemainderRatioUnderRefinedObservedM4 = Math.max(
    ...baseCorrectedRowsUnderRefinedObservedM4.map((row) =>
      Number(row.corrected_remainder_to_point_width_ratio)
    )
  );
  const maxBaseRemainderRatioUnderRefinedCorrectedM4 = Math.max(
    ...baseCorrectedRowsUnderRefinedCorrectedM4.map((row) =>
      Number(row.corrected_remainder_to_point_width_ratio)
    )
  );
  const baselineInflationCoversRefinedObservedM4 =
    Number(basePrototype.corrected_fourth_derivative_upper) >=
    Number(refinedPrototype.observed_fourth_derivative_upper);
  const growthLocalization =
    fourthDifferenceGrowthLocalizationForComponent({
      component,
      baseSummary,
      refinedSummary,
    });
  return {
    component,
    base_source_stencil_subcell_count:
      basePrototype.source_stencil_subcell_count,
    refined_source_stencil_subcell_count:
      refinedPrototype.source_stencil_subcell_count,
    base_observed_fourth_derivative_upper:
      basePrototype.observed_fourth_derivative_upper,
    refined_observed_fourth_derivative_upper:
      refinedPrototype.observed_fourth_derivative_upper,
    refined_to_base_observed_m4_ratio: finitePositive(
      basePrototype.observed_fourth_derivative_upper
    )
      ? refinedPrototype.observed_fourth_derivative_upper /
        basePrototype.observed_fourth_derivative_upper
      : null,
    base_nonuniform_to_uniform_fourth_derivative_relative_gap:
      baseSummary.fourth_difference_summary
        .max_nonuniform_to_uniform_fourth_derivative_relative_gap,
    refined_nonuniform_to_uniform_fourth_derivative_relative_gap:
      refinedSummary.fourth_difference_summary
        .max_nonuniform_to_uniform_fourth_derivative_relative_gap,
    fourth_difference_growth_localization: growthLocalization,
    observed_m4_inflation_factor: observedM4InflationFactor,
    base_corrected_fourth_derivative_upper:
      basePrototype.corrected_fourth_derivative_upper,
    refined_corrected_fourth_derivative_upper:
      refinedPrototype.corrected_fourth_derivative_upper,
    baseline_inflation_covers_refined_observed_m4:
      baselineInflationCoversRefinedObservedM4,
    base_observed_retile_count:
      basePrototype.observed_retile_count_from_fourth_difference,
    refined_observed_retile_count:
      refinedPrototype.observed_retile_count_from_fourth_difference,
    base_corrected_tile_count: basePrototype.corrected_tile_count,
    refined_corrected_tile_count: refinedPrototype.corrected_tile_count,
    refined_to_base_corrected_tile_count_ratio: finitePositive(
      basePrototype.corrected_tile_count
    )
      ? refinedPrototype.corrected_tile_count /
        basePrototype.corrected_tile_count
      : null,
    base_max_corrected_remainder_to_point_width_ratio:
      basePrototype.max_corrected_remainder_to_point_width_ratio,
    refined_max_corrected_remainder_to_point_width_ratio:
      refinedPrototype.max_corrected_remainder_to_point_width_ratio,
    base_corrected_rows_max_remainder_ratio_under_refined_observed_m4:
      maxBaseRemainderRatioUnderRefinedObservedM4,
    base_corrected_rows_max_remainder_ratio_under_refined_corrected_m4:
      maxBaseRemainderRatioUnderRefinedCorrectedM4,
    base_corrected_rows_cover_refined_observed_m4_point_scale:
      Number(maxBaseRemainderRatioUnderRefinedObservedM4) <= 1,
    base_corrected_rows_cover_refined_corrected_m4_point_scale:
      Number(maxBaseRemainderRatioUnderRefinedCorrectedM4) <= 1,
    refined_corrected_rows_pass_point_scale:
      refinedPrototype.all_corrected_tiles_pass_point_width_scale,
    m4_refinement_status:
      baselineInflationCoversRefinedObservedM4 &&
      Number(maxBaseRemainderRatioUnderRefinedObservedM4) <= 1
        ? "base-inflation-covers-refined-stencil"
        : "base-inflation-undercovers-refined-stencil",
  };
}

function h38NumeratorPolynomialDegreeDiagnostics({
  solveWidthProfile,
  degrees = [1, 2, 3],
}) {
  const samples = solveWidthProfile.samples.map((sample) => ({
    ...sample,
    xi_midpoint: intervalMidpoint(sample.xi_interval),
    numerator_midpoint: intervalMidpoint(sample.h38_solve_numerator_interval),
    numerator_width: intervalWidth(sample.h38_solve_numerator_interval),
  }));
  return degrees.map((degree) => {
    const coefficients = fitPolynomialLeastSquares(
      samples.map((sample) => ({
        x: sample.xi_midpoint,
        y: sample.numerator_midpoint,
      })),
      degree
    );
    const residuals = samples.map((sample) => {
      const graphMidpoint = polynomialValue(coefficients, sample.xi_midpoint);
      const midpointResidual = sample.numerator_midpoint - graphMidpoint;
      return {
        cell_id: sample.cell_id,
        xi_midpoint: sample.xi_midpoint,
        numerator_midpoint: sample.numerator_midpoint,
        numerator_width: sample.numerator_width,
        graph_midpoint: graphMidpoint,
        midpoint_residual: midpointResidual,
        abs_midpoint_residual: Math.abs(midpointResidual),
      };
    });
    const maxMidpointResidual = Math.max(
      ...residuals.map((residual) => residual.abs_midpoint_residual)
    );
    const maxNumeratorWidth = Math.max(
      ...residuals.map((residual) => residual.numerator_width)
    );
    return {
      polynomial_degree: degree,
      coefficients,
      residuals,
      max_midpoint_residual: maxMidpointResidual,
      max_numerator_interval_width: maxNumeratorWidth,
      midpoint_residual_to_numerator_width_ratio:
        finitePositive(maxNumeratorWidth)
          ? maxMidpointResidual / maxNumeratorWidth
          : null,
    };
  });
}

function h38NumeratorGraphResidualProfile({
  solveWidthProfile,
  numeratorPolynomialDiagnostic,
}) {
  const coefficients = numeratorPolynomialDiagnostic.coefficients;
  const samples = solveWidthProfile.samples.map((sample) => {
    const graphInterval = polynomialRangeOnInterval({
      coefficients,
      interval: sample.xi_interval,
    });
    const numeratorInterval = sample.h38_solve_numerator_interval;
    const intervalResidual = [
      Number(numeratorInterval[0]) - Number(graphInterval[1]),
      Number(numeratorInterval[1]) - Number(graphInterval[0]),
    ];
    const graphMidpoint = polynomialValue(
      coefficients,
      intervalMidpoint(sample.xi_interval)
    );
    const midpointResidual =
      intervalMidpoint(numeratorInterval) - graphMidpoint;
    return {
      cell_id: sample.cell_id,
      speed_interval: sample.speed_interval,
      xi_interval: sample.xi_interval,
      xi_midpoint: intervalMidpoint(sample.xi_interval),
      numerator_interval: numeratorInterval,
      numerator_midpoint: intervalMidpoint(numeratorInterval),
      numerator_interval_width: intervalWidth(numeratorInterval),
      graph_interval: graphInterval,
      graph_interval_width: intervalWidth(graphInterval),
      graph_midpoint: graphMidpoint,
      midpoint_residual: midpointResidual,
      abs_midpoint_residual: Math.abs(midpointResidual),
      interval_residual: intervalResidual,
      interval_residual_width: intervalWidth(intervalResidual),
      interval_residual_abs_upper: intervalAbsUpper(intervalResidual),
    };
  });
  const intervalResidualHull = intervalHull(
    samples.map((sample) => sample.interval_residual)
  );
  const midpointResidualHull = intervalHull(
    samples.map((sample) => pointInterval(sample.midpoint_residual))
  );
  const maxMidpointResidual = Math.max(
    ...samples.map((sample) => sample.abs_midpoint_residual)
  );
  const maxNumeratorIntervalWidth = Math.max(
    ...samples.map((sample) => sample.numerator_interval_width)
  );
  const maxGraphIntervalWidth = Math.max(
    ...samples.map((sample) => sample.graph_interval_width)
  );
  return {
    polynomial_degree: numeratorPolynomialDiagnostic.polynomial_degree,
    coefficients,
    sample_count: samples.length,
    samples,
    midpoint_residual_hull: midpointResidualHull,
    interval_residual_hull: intervalResidualHull,
    midpoint_residual_width: intervalWidth(midpointResidualHull),
    interval_residual_width: intervalWidth(intervalResidualHull),
    max_midpoint_residual: maxMidpointResidual,
    max_numerator_interval_width: maxNumeratorIntervalWidth,
    max_graph_interval_width: maxGraphIntervalWidth,
    midpoint_residual_to_numerator_width_ratio:
      finitePositive(maxNumeratorIntervalWidth)
        ? maxMidpointResidual / maxNumeratorIntervalWidth
        : null,
    midpoint_residual_hull_to_numerator_width_ratio:
      finitePositive(maxNumeratorIntervalWidth)
        ? intervalWidth(midpointResidualHull) / maxNumeratorIntervalWidth
        : null,
    interval_residual_hull_to_numerator_width_ratio:
      finitePositive(maxNumeratorIntervalWidth)
        ? intervalWidth(intervalResidualHull) / maxNumeratorIntervalWidth
        : null,
    graph_interval_to_numerator_width_ratio:
      finitePositive(maxNumeratorIntervalWidth)
        ? maxGraphIntervalWidth / maxNumeratorIntervalWidth
        : null,
  };
}

function hIntervalsForPolynomialGraphWithNumeratorGraphPoint({
  transportProfile,
  noise,
  residualProfile,
  numeratorCoefficients,
  numeratorResidualInterval,
  numeratorNoise,
  slopeInterval,
  slopeMode = "midpoint",
}) {
  const numeratorResidualCenter = intervalMidpoint(numeratorResidualInterval);
  const numeratorResidualRadius = intervalWidth(numeratorResidualInterval) / 2;
  const numeratorValue =
    polynomialValue(numeratorCoefficients, noise) +
    numeratorResidualCenter +
    Number(numeratorNoise) * numeratorResidualRadius;
  const resolvedSlopeInterval =
    slopeMode === "interval"
      ? slopeInterval
      : pointInterval(intervalMidpoint(slopeInterval));
  const h38Interval = root.divideIntervals(
    pointInterval(-numeratorValue),
    resolvedSlopeInterval
  );
  return transportProfile.map((profile, hIndex) => {
    if (hIndex === 38) {
      return h38Interval;
    }
    const residualInterval =
      residualProfile?.[hIndex]?.residual_interval_hull ?? [0, 0];
    return pointInterval(
      polynomialValue(profile.coefficients, noise) +
        intervalMidpoint(residualInterval)
    );
  });
}

function shiftedPressureReplayForPolynomialGraphCorrelatedResidualPoint({
  context,
  cell,
  branch,
  transportProfile,
  noise,
  residualProfile,
  residualNoise,
  residualStartIndex = 0,
  solveSlopeInterval,
  outerRadius,
  shiftedIndex,
}) {
  const hIntervals = hIntervalsForPolynomialGraphCorrelatedResidualPoint({
    transportProfile,
    noise,
    residualProfile,
    residualNoise,
    residualStartIndex,
  });
  const replay = shiftedPressureReplayForPointHRow({
    context,
    cell,
    branch,
    hIntervals,
    solveSlopeInterval,
    outerRadius,
    shiftedIndex,
  });
  return {
    noise_coordinate: noise,
    residual_noise_coordinate: residualNoise,
    residual_start_index: residualStartIndex,
    center_interval: replay.center_interval,
    center_numeric_interval: replay.center_numeric_interval,
    row_pressure: replay.row_pressure,
    pressure: replay.pressure,
    center_eliminated_row_pressure: replay.center_eliminated_row_pressure,
    center_eliminated_pressure: replay.center_eliminated_pressure,
    center_elimination_improvement_factor:
      replay.center_elimination_improvement_factor,
    center_elimination_interval_warning:
      replay.center_elimination_interval_warning,
    h0_value: hIntervals[0][0],
    h38_value: hIntervals[38][0],
  };
}

function shiftedPressureReplayForPolynomialGraphH38ResidualVariantPoint({
  context,
  cell,
  branch,
  transportProfile,
  noise,
  residualProfile,
  h38ResidualInterval,
  h38Noise,
  solveSlopeInterval,
  outerRadius,
  shiftedIndex,
  variant,
}) {
  const hIntervals =
    hIntervalsForPolynomialGraphResidualCentersWithH38VariantPoint({
      transportProfile,
      noise,
      residualProfile,
      h38ResidualInterval,
      h38Noise,
    });
  const replay = shiftedPressureReplayForPointHRow({
    context,
    cell,
    branch,
    hIntervals,
    solveSlopeInterval,
    outerRadius,
    shiftedIndex,
  });
  return {
    variant,
    noise_coordinate: noise,
    h38_noise_coordinate: h38Noise,
    center_interval: replay.center_interval,
    center_numeric_interval: replay.center_numeric_interval,
    row_pressure: replay.row_pressure,
    pressure: replay.pressure,
    center_eliminated_row_pressure: replay.center_eliminated_row_pressure,
    center_eliminated_pressure: replay.center_eliminated_pressure,
    center_elimination_improvement_factor:
      replay.center_elimination_improvement_factor,
    center_elimination_interval_warning:
      replay.center_elimination_interval_warning,
    h0_value: hIntervals[0][0],
    h38_value: hIntervals[38][0],
  };
}

function shiftedPressureReplayForPolynomialGraphH38ResidualVariantInterval({
  context,
  cell,
  branch,
  transportProfile,
  noise,
  residualProfile,
  h38ResidualInterval,
  h38NoiseInterval,
  solveSlopeInterval,
  outerRadius,
  shiftedIndex,
  variant,
}) {
  const hIntervals =
    hIntervalsForPolynomialGraphResidualCentersWithH38VariantInterval({
      transportProfile,
      noise,
      residualProfile,
      h38ResidualInterval,
      h38NoiseInterval,
    });
  const replay = shiftedPressureReplayForPointHRow({
    context,
    cell,
    branch,
    hIntervals,
    solveSlopeInterval,
    outerRadius,
    shiftedIndex,
  });
  return {
    variant,
    noise_coordinate: noise,
    h38_noise_interval: h38NoiseInterval,
    center_interval: replay.center_interval,
    center_numeric_interval: replay.center_numeric_interval,
    row_pressure: replay.row_pressure,
    pressure: replay.pressure,
    center_eliminated_row_pressure: replay.center_eliminated_row_pressure,
    center_eliminated_pressure: replay.center_eliminated_pressure,
    center_elimination_improvement_factor:
      replay.center_elimination_improvement_factor,
    center_elimination_interval_warning:
      replay.center_elimination_interval_warning,
    h0_value: hIntervals[0][0],
    h38_interval: hIntervals[38],
  };
}

function shiftedPressureReplayForNumeratorGraphPoint({
  context,
  cell,
  branch,
  transportProfile,
  noise,
  residualProfile,
  numeratorCoefficients,
  numeratorResidualInterval,
  numeratorNoise,
  slopeInterval,
  slopeMode,
  solveSlopeInterval,
  outerRadius,
  shiftedIndex,
  variant,
}) {
  const hIntervals = hIntervalsForPolynomialGraphWithNumeratorGraphPoint({
    transportProfile,
    noise,
    residualProfile,
    numeratorCoefficients,
    numeratorResidualInterval,
    numeratorNoise,
    slopeInterval,
    slopeMode,
  });
  const replay = shiftedPressureReplayForPointHRow({
    context,
    cell,
    branch,
    hIntervals,
    solveSlopeInterval,
    outerRadius,
    shiftedIndex,
  });
  return {
    variant,
    noise_coordinate: noise,
    numerator_noise_coordinate: numeratorNoise,
    slope_mode: slopeMode,
    center_interval: replay.center_interval,
    center_numeric_interval: replay.center_numeric_interval,
    row_pressure: replay.row_pressure,
    pressure: replay.pressure,
    h0_value: hIntervals[0][0],
    h38_interval: hIntervals[38],
  };
}

function maxPressureReplay(replays) {
  const maxReplay = replays.reduce(
    (best, replay) =>
      Number(replay.pressure) > Number(best?.pressure ?? -1) ? replay : best,
    null
  );
  return maxReplay;
}

function minPressureReplay(replays) {
  return replays.reduce(
    (best, replay) =>
      Number(replay.pressure) < Number(best?.pressure ?? Infinity)
        ? replay
        : best,
    null
  );
}

function oneNoiseAffineTransportDiagnostic({
  context,
  targetSpeedInterval,
  coarseRow,
  refinedRows,
  branch,
  outerRadius,
  shiftedIndex,
  hFreezeStartIndexes = [38, 20, 10, 0],
  noiseSamples = [-1, -0.5, 0, 0.5, 1],
}) {
  const branchRow = branchRowFor(coarseRow, branch);
  const coarseCell = cellFromCertificateRow(coarseRow);
  const baselineDiagnostic = pressureDiagnosticForRow({
    context,
    row: coarseRow,
    branch,
    outerRadius,
    shiftedIndex,
    hFreezeStartIndexes,
  });
  const baselineHRowMidpointReplay =
    baselineDiagnostic.input_family_replays.find(
      (replay) => replay.input_family === "h-row-midpoint"
    ) ?? null;
  const transportProfile = hRowAffineTransportProfileForRows({
    rows: refinedRows,
    branch,
  });
  const transportProfilesByBranch = hRowAffineTransportProfilesByBranch({
    rows: refinedRows,
  });
  const oneNoiseSampleReplays = noiseSamples.map((noise) => {
    const hIntervals = hIntervalsForAffineTransportNoise({
      transportProfile,
      noise,
    });
    const replay = shiftedPressureReplayForPointHRow({
      context,
      cell: coarseCell,
      branch,
      hIntervals,
      solveSlopeInterval: branchRow.h38_solve_slope_interval,
      outerRadius,
      shiftedIndex,
    });
    return {
      noise_coordinate: noise,
      center_interval: replay.center_interval,
      center_numeric_interval: replay.center_numeric_interval,
      row_pressure: replay.row_pressure,
      pressure: replay.pressure,
      h0_value: hIntervals[0][0],
      h38_value: hIntervals[38][0],
    };
  });
  const maxReplay = maxPressureReplay(oneNoiseSampleReplays);
  const independentPressure = baselineDiagnostic.full_input_replay.pressure;
  const hRowMidpointPressure = baselineHRowMidpointReplay?.pressure ?? null;
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_ONE_NOISE_AFFINE_H_ROW_TRANSPORT_DIAGNOSTIC_SCHEMA,
    status:
      "h39-one-noise-affine-h-row-transport-diagnostic-candidate-emitted",
    evaluation_level: "candidate-one-noise-affine-h-row-transport-diagnostic",
    target_speed_interval: targetSpeedInterval,
    branch,
    shifted_index: shiftedIndex,
    y_order:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
      shiftedIndex,
    outer_radius: outerRadius,
    transport_source: "two-refined-H38-subcell-midpoint-affine-fit",
    affine_h_row_transport_formula:
      "h_i(xi)=c_i+xi*d_i, c_i=(h_i^-+h_i^+)/2, d_i=(h_i^+-h_i^-)/2, xi in [-1,1]",
    baseline_independent_interval_pressure: independentPressure,
    baseline_h_row_midpoint_pressure: hRowMidpointPressure,
    noise_samples: noiseSamples,
    h_row_affine_transport_profile: transportProfile,
    one_noise_sample_replays: oneNoiseSampleReplays,
    max_one_noise_sample_replay: maxReplay,
    max_one_noise_sample_pressure: maxReplay?.pressure ?? null,
    independent_to_one_noise_sample_pressure_ratio:
      finitePositive(independentPressure) && finitePositive(maxReplay?.pressure)
        ? Number(independentPressure) / Number(maxReplay.pressure)
        : null,
    h_row_midpoint_to_one_noise_sample_pressure_ratio:
      finitePositive(hRowMidpointPressure) && finitePositive(maxReplay?.pressure)
        ? Number(hRowMidpointPressure) / Number(maxReplay.pressure)
        : null,
    same_domain_boundary:
      "The replay preserves the coarse H39 cell interval but restricts inherited h-rows to the affine line through two refined H38 subcell midpoints; it is a transport diagnostic, not a same-domain certificate.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

function scalingExponent({ coarsePressure, replay }) {
  if (
    replay.local_subcell_count <= 1 ||
    !finitePositive(coarsePressure) ||
    !finitePositive(replay.max_pressure)
  ) {
    return null;
  }
  return (
    Math.log(Number(coarsePressure) / Number(replay.max_pressure)) /
    Math.log(replay.local_subcell_count)
  );
}

function scalingExponentForValues({ coarseValue, refinedValue, refinedCount }) {
  if (
    refinedCount <= 1 ||
    !finitePositive(coarseValue) ||
    !finitePositive(refinedValue)
  ) {
    return null;
  }
  return Math.log(Number(coarseValue) / Number(refinedValue)) /
    Math.log(refinedCount);
}

function estimatedSubcellCountForReduction({
  reductionFactor,
  exponent,
}) {
  if (
    !finitePositive(reductionFactor) ||
    !finitePositive(exponent)
  ) {
    return null;
  }
  return Math.ceil(Math.exp(Math.log(Number(reductionFactor)) / exponent));
}

function sortedFinite(values) {
  return values
    .map(Number)
    .filter((value) => Number.isFinite(value))
    .sort((left, right) => left - right);
}

function median(values) {
  const sorted = sortedFinite(values);
  if (sorted.length === 0) {
    return null;
  }
  const midpoint = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[midpoint - 1] + sorted[midpoint]) / 2
    : sorted[midpoint];
}

function residualPressureScalingSummary({
  diagnostics,
  pressureKey,
  targetPressure,
}) {
  const sortedDiagnostics = diagnostics
    .slice()
    .sort(
      (left, right) =>
        Number(left.residual_subcell_count) -
        Number(right.residual_subcell_count)
    )
    .filter(
      (diagnostic) =>
        Number.isInteger(diagnostic.residual_subcell_count) &&
        finitePositive(diagnostic[pressureKey])
    );
  if (sortedDiagnostics.length < 2) {
    return null;
  }
  const first = sortedDiagnostics[0];
  const last = sortedDiagnostics[sortedDiagnostics.length - 1];
  const firstPressure = Number(first[pressureKey]);
  const lastPressure = Number(last[pressureKey]);
  const firstCount = Number(first.residual_subcell_count);
  const lastCount = Number(last.residual_subcell_count);
  const exponent =
    Math.log(firstPressure / lastPressure) / Math.log(lastCount / firstCount);
  const estimatedSubcellCountForTarget =
    finitePositive(targetPressure) && finitePositive(exponent)
      ? Math.ceil(
          firstCount *
            Math.exp(Math.log(firstPressure / Number(targetPressure)) / exponent)
        )
      : null;
  return {
    source_pressure_key: pressureKey,
    first_residual_subcell_count: firstCount,
    last_residual_subcell_count: lastCount,
    first_pressure: firstPressure,
    last_pressure: lastPressure,
    first_to_last_pressure_ratio: firstPressure / lastPressure,
    observed_pressure_scaling_exponent: exponent,
    target_pressure: targetPressure,
    estimated_subcell_count_for_target_pressure:
      estimatedSubcellCountForTarget,
  };
}

export function buildH39OneNoiseAffineHRowTransportDiagnosticCandidate({
  targetSpeedInterval,
  branch = "-",
  rootSubdivisions = 100,
  outerRadius = 0.001,
  shiftedIndex = 1,
  seriesOrder = 60,
  noiseSamples = [-1, -0.5, 0, 0.5, 1],
  hFreezeStartIndexes = [38, 20, 10, 0],
} = {}) {
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedOuterRadius = assertFinitePositiveNumber(
    "outerRadius",
    outerRadius
  );
  const resolvedShiftedIndex = assertFinitePositiveInteger(
    "shiftedIndex",
    shiftedIndex
  );
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder: assertFinitePositiveInteger("seriesOrder", seriesOrder),
  });
  const coarseRows = targetRowsForSubcellCount({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    subcellCount: 1,
    rootSubdivisions,
  });
  const refinedRows = targetRowsForSubcellCount({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    subcellCount: 2,
    rootSubdivisions,
  });
  if (coarseRows.length !== 1) {
    throw new Error("one-noise diagnostic requires exactly one coarse target row");
  }
  if (refinedRows.length !== 2) {
    throw new Error("one-noise diagnostic requires exactly two refined target rows");
  }
  return oneNoiseAffineTransportDiagnostic({
    context,
    targetSpeedInterval: resolvedTargetSpeedInterval,
    coarseRow: coarseRows[0],
    refinedRows,
    branch,
    outerRadius: resolvedOuterRadius,
    shiftedIndex: resolvedShiftedIndex,
    hFreezeStartIndexes,
    noiseSamples,
  });
}

export function buildH39AffineHRowGraphSubdivisionDiagnosticCandidate({
  targetSpeedInterval,
  branch = "-",
  rootSubdivisions = 100,
  outerRadius = 0.001,
  shiftedIndex = 1,
  seriesOrder = 60,
  xiDomain = [-1, 1],
  xiPartitionCounts = [1, 2, 4, 8],
  residualSubcellCounts = [4, 8],
  sampleNoiseCoordinates = [-1, -0.5, 0, 0.5, 1],
  hFreezeStartIndexes = [38, 20, 10, 0],
} = {}) {
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedXiDomain = numericInterval("xiDomain", xiDomain);
  const resolvedXiPartitionCounts = [
    ...new Set(xiPartitionCounts.map((count) =>
      assertFinitePositiveInteger("xiPartitionCounts", count)
    )),
  ].sort((left, right) => left - right);
  if (resolvedXiPartitionCounts.length === 0) {
    throw new Error("xiPartitionCounts must be nonempty");
  }
  const resolvedResidualSubcellCounts = [
    ...new Set(
      residualSubcellCounts.map((count) =>
        assertFinitePositiveInteger("residualSubcellCounts", count)
      )
    ),
  ]
    .filter((count) => count > 2)
    .sort((left, right) => left - right);
  const resolvedOuterRadius = assertFinitePositiveNumber(
    "outerRadius",
    outerRadius
  );
  const resolvedShiftedIndex = assertFinitePositiveInteger(
    "shiftedIndex",
    shiftedIndex
  );
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder: assertFinitePositiveInteger("seriesOrder", seriesOrder),
  });
  const coarseRows = targetRowsForSubcellCount({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    subcellCount: 1,
    rootSubdivisions,
  });
  const refinedRows = targetRowsForSubcellCount({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    subcellCount: 2,
    rootSubdivisions,
  });
  if (coarseRows.length !== 1) {
    throw new Error("affine graph diagnostic requires exactly one coarse target row");
  }
  if (refinedRows.length !== 2) {
    throw new Error("affine graph diagnostic requires exactly two refined target rows");
  }
  const coarseRow = coarseRows[0];
  const branchRow = branchRowFor(coarseRow, branch);
  const coarseCell = cellFromCertificateRow(coarseRow);
  const baselineDiagnostic = pressureDiagnosticForRow({
    context,
    row: coarseRow,
    branch,
    outerRadius: resolvedOuterRadius,
    shiftedIndex: resolvedShiftedIndex,
    hFreezeStartIndexes,
  });
  const baselineHRowMidpointReplay =
    baselineDiagnostic.input_family_replays.find(
      (replay) => replay.input_family === "h-row-midpoint"
    ) ?? null;
  const transportProfile = hRowAffineTransportProfileForRows({
    rows: refinedRows,
    branch,
  });
  const transportProfilesByBranch = hRowAffineTransportProfilesByBranch({
    rows: refinedRows,
  });
  const sampleReplays = sampleNoiseCoordinates.map((noise) => {
    const hIntervals = hIntervalsForAffineTransportNoise({
      transportProfile,
      noise,
    });
    const replay = shiftedPressureReplayForPointHRow({
      context,
      cell: coarseCell,
      branch,
      hIntervals,
      solveSlopeInterval: branchRow.h38_solve_slope_interval,
      outerRadius: resolvedOuterRadius,
      shiftedIndex: resolvedShiftedIndex,
    });
    return {
      noise_coordinate: noise,
      center_interval: replay.center_interval,
      center_numeric_interval: replay.center_numeric_interval,
      row_pressure: replay.row_pressure,
      pressure: replay.pressure,
    };
  });
  const maxSampleReplay = maxPressureReplay(sampleReplays);
  const graphPartitionReplays = resolvedXiPartitionCounts.map(
    (partitionCount) => {
      const graphReplays = splitNumericInterval(
        resolvedXiDomain,
        partitionCount
      ).map((noiseInterval) =>
        shiftedPressureReplayForAffineGraphInterval({
          context,
          cell: coarseCell,
          branch,
          transportProfile,
          noiseInterval,
          solveSlopeInterval: branchRow.h38_solve_slope_interval,
          outerRadius: resolvedOuterRadius,
          shiftedIndex: resolvedShiftedIndex,
        })
      );
      const maxGraphReplay = maxPressureReplay(graphReplays);
      const minGraphReplay = minPressureReplay(graphReplays);
      return {
        xi_partition_count: partitionCount,
        graph_replays: graphReplays,
        max_graph_replay: maxGraphReplay,
        min_graph_replay: minGraphReplay,
        max_graph_pressure: maxGraphReplay?.pressure ?? null,
        min_graph_pressure: minGraphReplay?.pressure ?? null,
      };
    }
  );
  const bestGraphPartition = graphPartitionReplays.reduce(
    (best, replay) =>
      Number(replay.max_graph_pressure) <
      Number(best?.max_graph_pressure ?? Infinity)
        ? replay
        : best,
    null
  );
  const coarsestGraphPartition = graphPartitionReplays[0] ?? null;
  const independentPressure = baselineDiagnostic.full_input_replay.pressure;
  const hRowMidpointPressure = baselineHRowMidpointReplay?.pressure ?? null;
  const bestGraphPressure = bestGraphPartition?.max_graph_pressure ?? null;
  const coarsestGraphPressure =
    coarsestGraphPartition?.max_graph_pressure ?? null;
  const sharedDomainReplayArtifact = buildH39SharedDomainCoefficientArtifact({
    h38Rows: [coarseRow],
    validateH38: false,
    shiftedOrder: resolvedShiftedIndex,
    seriesOrder: context.seriesOrder,
    rho: resolvedOuterRadius,
    sharedDomainSignature:
      "candidate-h39-affine-h-row-graph-subdivision",
    includeRows: false,
    hRowProvider: affineGraphHRowProvider({
      transportProfilesByBranch,
      noiseInterval: resolvedXiDomain,
    }),
  });
  const producerResidualDiagnostics = resolvedResidualSubcellCounts.map(
    (subcellCount) => {
      const rows = targetRowsForSubcellCount({
        targetSpeedInterval: resolvedTargetSpeedInterval,
        subcellCount,
        rootSubdivisions,
      });
      return {
        residual_subcell_count: subcellCount,
        ...affineGraphProducerResidualDiagnostic({
          context,
          coarseRow,
          targetSpeedInterval: resolvedTargetSpeedInterval,
          rows,
          branch,
          transportProfile,
          solveSlopeInterval: branchRow.h38_solve_slope_interval,
          outerRadius: resolvedOuterRadius,
          shiftedIndex: resolvedShiftedIndex,
          xiDomain: resolvedXiDomain,
        }),
      };
    }
  );
  const maxGraphPlusResidualDiagnostic = producerResidualDiagnostics.reduce(
    (best, diagnostic) =>
      Number(diagnostic.graph_plus_residual_pressure) >
      Number(best?.graph_plus_residual_pressure ?? -1)
        ? diagnostic
        : best,
    null
  );
  const maxGraphPlusResidualPressure =
    maxGraphPlusResidualDiagnostic?.graph_plus_residual_pressure ?? null;
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_AFFINE_H_ROW_GRAPH_SUBDIVISION_DIAGNOSTIC_SCHEMA,
    status:
      "h39-affine-h-row-graph-subdivision-diagnostic-candidate-emitted",
    evaluation_level: "candidate-affine-h-row-graph-subdivision-diagnostic",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    shifted_index: resolvedShiftedIndex,
    y_order:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
      resolvedShiftedIndex,
    outer_radius: resolvedOuterRadius,
    xi_domain: resolvedXiDomain,
    xi_partition_counts: resolvedXiPartitionCounts,
    residual_subcell_counts: resolvedResidualSubcellCounts,
    graph_source: "two-refined-H38-subcell-midpoint-affine-fit",
    affine_h_row_graph_formula:
      "h_i(xi)=c_i+xi*d_i with xi intervals; c_i and d_i come from two refined H38 subcell midpoint rows.",
    baseline_independent_interval_pressure: independentPressure,
    baseline_h_row_midpoint_pressure: hRowMidpointPressure,
    sample_noise_coordinates: sampleNoiseCoordinates,
    sample_one_noise_replays: sampleReplays,
    max_sample_one_noise_replay: maxSampleReplay,
    max_sample_one_noise_pressure: maxSampleReplay?.pressure ?? null,
    h_row_affine_transport_profile: transportProfile,
    graph_partition_replays: graphPartitionReplays,
    coarsest_graph_partition: coarsestGraphPartition,
    best_graph_partition: bestGraphPartition,
    coarsest_graph_pressure: coarsestGraphPressure,
    best_graph_pressure: bestGraphPressure,
    independent_to_best_graph_pressure_ratio:
      finitePositive(independentPressure) && finitePositive(bestGraphPressure)
        ? Number(independentPressure) / Number(bestGraphPressure)
        : null,
    h_row_midpoint_to_best_graph_pressure_ratio:
      finitePositive(hRowMidpointPressure) && finitePositive(bestGraphPressure)
        ? Number(hRowMidpointPressure) / Number(bestGraphPressure)
        : null,
    best_graph_to_sample_pressure_ratio:
      finitePositive(bestGraphPressure) &&
      finitePositive(maxSampleReplay?.pressure)
        ? Number(bestGraphPressure) / Number(maxSampleReplay.pressure)
        : null,
    coarsest_graph_to_sample_pressure_ratio:
      finitePositive(coarsestGraphPressure) &&
      finitePositive(maxSampleReplay?.pressure)
        ? Number(coarsestGraphPressure) / Number(maxSampleReplay.pressure)
        : null,
    shared_domain_replay_artifact: sharedDomainReplayArtifact,
    producer_residual_diagnostics: producerResidualDiagnostics,
    max_graph_plus_residual_diagnostic: maxGraphPlusResidualDiagnostic,
    max_graph_plus_residual_pressure: maxGraphPlusResidualPressure,
    independent_to_max_graph_plus_residual_pressure_ratio:
      finitePositive(independentPressure) &&
      finitePositive(maxGraphPlusResidualPressure)
        ? Number(independentPressure) / Number(maxGraphPlusResidualPressure)
        : null,
    h_row_midpoint_to_max_graph_plus_residual_pressure_ratio:
      finitePositive(hRowMidpointPressure) &&
      finitePositive(maxGraphPlusResidualPressure)
        ? Number(hRowMidpointPressure) / Number(maxGraphPlusResidualPressure)
        : null,
    candidate_certificate_route:
      "A directed-rounded H39 certificate should carry a certified affine h-row graph enclosure plus producer residual directions; the residual diagnostic shows how much pressure remains after adding midpoint-derived residual boxes.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_affine_h_row_graph_enclosure: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

export function buildH39PolynomialHRowGraphResidualDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  outerRadius = 0.001,
  shiftedIndex = 1,
  seriesOrder = 60,
  xiDomain = [-2, 2],
  polynomialDegree = 2,
  polynomialSourceSubcellCount = 4,
  xiPartitionCounts = [1, 2, 4, 8],
  residualSubcellCounts = [4, 8],
  hFreezeStartIndexes = [38, 20, 10, 0],
} = {}) {
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedXiDomain = numericInterval("xiDomain", xiDomain);
  const resolvedPolynomialDegree = assertFinitePositiveInteger(
    "polynomialDegree",
    polynomialDegree
  );
  if (resolvedPolynomialDegree > 3) {
    throw new Error("polynomialDegree must be at most 3");
  }
  const resolvedPolynomialSourceSubcellCount = assertFinitePositiveInteger(
    "polynomialSourceSubcellCount",
    polynomialSourceSubcellCount
  );
  if (resolvedPolynomialSourceSubcellCount < resolvedPolynomialDegree + 1) {
    throw new Error(
      "polynomialSourceSubcellCount must be at least polynomialDegree + 1"
    );
  }
  const resolvedXiPartitionCounts = [
    ...new Set(xiPartitionCounts.map((count) =>
      assertFinitePositiveInteger("xiPartitionCounts", count)
    )),
  ].sort((left, right) => left - right);
  if (resolvedXiPartitionCounts.length === 0) {
    throw new Error("xiPartitionCounts must be nonempty");
  }
  const resolvedResidualSubcellCounts = [
    ...new Set(
      residualSubcellCounts.map((count) =>
        assertFinitePositiveInteger("residualSubcellCounts", count)
      )
    ),
  ]
    .filter((count) => count >= resolvedPolynomialSourceSubcellCount)
    .sort((left, right) => left - right);
  if (resolvedResidualSubcellCounts.length === 0) {
    throw new Error("residualSubcellCounts must include at least one source-cover count");
  }
  const resolvedOuterRadius = assertFinitePositiveNumber(
    "outerRadius",
    outerRadius
  );
  const resolvedShiftedIndex = assertFinitePositiveInteger(
    "shiftedIndex",
    shiftedIndex
  );
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder: assertFinitePositiveInteger("seriesOrder", seriesOrder),
  });
  const rowsBySubcellCount = new Map();
  const rowsForSubcellCount = (subcellCount) => {
    if (!rowsBySubcellCount.has(subcellCount)) {
      rowsBySubcellCount.set(
        subcellCount,
        targetRowsForSubcellCount({
          targetSpeedInterval: resolvedTargetSpeedInterval,
          subcellCount,
          rootSubdivisions,
        })
      );
    }
    return rowsBySubcellCount.get(subcellCount);
  };
  const coarseRows = rowsForSubcellCount(1);
  const affineRows = rowsForSubcellCount(2);
  const polynomialSourceRows = rowsForSubcellCount(
    resolvedPolynomialSourceSubcellCount
  );
  if (coarseRows.length !== 1) {
    throw new Error("polynomial graph diagnostic requires exactly one coarse target row");
  }
  if (affineRows.length !== 2) {
    throw new Error("polynomial graph diagnostic requires exactly two affine rows");
  }
  if (
    polynomialSourceRows.length !== resolvedPolynomialSourceSubcellCount
  ) {
    throw new Error("polynomial graph diagnostic requires a complete source subcover");
  }
  const coarseRow = coarseRows[0];
  const branchRow = branchRowFor(coarseRow, branch);
  const coarseCell = cellFromCertificateRow(coarseRow);
  const baselineDiagnostic = pressureDiagnosticForRow({
    context,
    row: coarseRow,
    branch,
    outerRadius: resolvedOuterRadius,
    shiftedIndex: resolvedShiftedIndex,
    hFreezeStartIndexes,
  });
  const baselineHRowMidpointReplay =
    baselineDiagnostic.input_family_replays.find(
      (replay) => replay.input_family === "h-row-midpoint"
    ) ?? null;
  const affineTransportProfile = hRowAffineTransportProfileForRows({
    rows: affineRows,
    branch,
  });
  const polynomialTransportProfile = hRowPolynomialTransportProfileForRows({
    rows: polynomialSourceRows,
    branch,
    targetSpeedInterval: resolvedTargetSpeedInterval,
    degree: resolvedPolynomialDegree,
  });
  const polynomialTransportProfilesByBranch =
    hRowPolynomialTransportProfilesByBranch({
      rows: polynomialSourceRows,
      targetSpeedInterval: resolvedTargetSpeedInterval,
      degree: resolvedPolynomialDegree,
    });
  const polynomialGraphPartitionReplays = resolvedXiPartitionCounts.map(
    (partitionCount) => {
      const graphReplays = splitNumericInterval(
        resolvedXiDomain,
        partitionCount
      ).map((noiseInterval) =>
        shiftedPressureReplayForPolynomialGraphInterval({
          context,
          cell: coarseCell,
          branch,
          transportProfile: polynomialTransportProfile,
          noiseInterval,
          solveSlopeInterval: branchRow.h38_solve_slope_interval,
          outerRadius: resolvedOuterRadius,
          shiftedIndex: resolvedShiftedIndex,
        })
      );
      const maxGraphReplay = maxPressureReplay(graphReplays);
      const minGraphReplay = minPressureReplay(graphReplays);
      return {
        xi_partition_count: partitionCount,
        graph_replays: graphReplays,
        max_graph_replay: maxGraphReplay,
        min_graph_replay: minGraphReplay,
        max_graph_pressure: maxGraphReplay?.pressure ?? null,
        min_graph_pressure: minGraphReplay?.pressure ?? null,
      };
    }
  );
  const bestPolynomialGraphPartition = polynomialGraphPartitionReplays.reduce(
    (best, replay) =>
      Number(replay.max_graph_pressure) <
      Number(best?.max_graph_pressure ?? Infinity)
        ? replay
        : best,
    null
  );
  const coarsestPolynomialGraphPartition =
    polynomialGraphPartitionReplays[0] ?? null;
  const sharedDomainReplayArtifact = buildH39SharedDomainCoefficientArtifact({
    h38Rows: [coarseRow],
    validateH38: false,
    shiftedOrder: resolvedShiftedIndex,
    seriesOrder: context.seriesOrder,
    rho: resolvedOuterRadius,
    sharedDomainSignature:
      "candidate-h39-polynomial-h-row-graph-residual",
    includeRows: false,
    hRowProvider: polynomialGraphHRowProvider({
      transportProfilesByBranch: polynomialTransportProfilesByBranch,
      noiseInterval: resolvedXiDomain,
    }),
  });
  const polynomialProducerResidualDiagnostics =
    resolvedResidualSubcellCounts.map((subcellCount) => {
      const rows = rowsForSubcellCount(subcellCount);
      return {
        residual_subcell_count: subcellCount,
        ...polynomialGraphProducerResidualDiagnostic({
          context,
          coarseRow,
          targetSpeedInterval: resolvedTargetSpeedInterval,
          rows,
          branch,
          transportProfile: polynomialTransportProfile,
          solveSlopeInterval: branchRow.h38_solve_slope_interval,
          outerRadius: resolvedOuterRadius,
          shiftedIndex: resolvedShiftedIndex,
          xiDomain: resolvedXiDomain,
        }),
      };
    });
  const affineReferenceResidualDiagnostics =
    resolvedResidualSubcellCounts.map((subcellCount) => {
      const rows = rowsForSubcellCount(subcellCount);
      return {
        residual_subcell_count: subcellCount,
        ...affineGraphProducerResidualDiagnostic({
          context,
          coarseRow,
          targetSpeedInterval: resolvedTargetSpeedInterval,
          rows,
          branch,
          transportProfile: affineTransportProfile,
          solveSlopeInterval: branchRow.h38_solve_slope_interval,
          outerRadius: resolvedOuterRadius,
          shiftedIndex: resolvedShiftedIndex,
          xiDomain: resolvedXiDomain,
        }),
      };
    });
  const maxPolynomialGraphPlusResidualDiagnostic =
    polynomialProducerResidualDiagnostics.reduce(
      (best, diagnostic) =>
        Number(diagnostic.graph_plus_residual_pressure) >
        Number(best?.graph_plus_residual_pressure ?? -1)
          ? diagnostic
          : best,
      null
    );
  const maxAffineReferenceGraphPlusResidualDiagnostic =
    affineReferenceResidualDiagnostics.reduce(
      (best, diagnostic) =>
        Number(diagnostic.graph_plus_residual_pressure) >
        Number(best?.graph_plus_residual_pressure ?? -1)
          ? diagnostic
          : best,
      null
    );
  const independentPressure = baselineDiagnostic.full_input_replay.pressure;
  const hRowMidpointPressure = baselineHRowMidpointReplay?.pressure ?? null;
  const bestPolynomialGraphPressure =
    bestPolynomialGraphPartition?.max_graph_pressure ?? null;
  const coarsestPolynomialGraphPressure =
    coarsestPolynomialGraphPartition?.max_graph_pressure ?? null;
  const maxPolynomialGraphPlusResidualPressure =
    maxPolynomialGraphPlusResidualDiagnostic?.graph_plus_residual_pressure ??
    null;
  const maxAffineReferenceGraphPlusResidualPressure =
    maxAffineReferenceGraphPlusResidualDiagnostic
      ?.graph_plus_residual_pressure ?? null;
  const maxSourceFitResidual = Math.max(
    ...polynomialTransportProfile.map((profile) =>
      Number(profile.fit_max_abs_residual)
    )
  );
  const maxProducerResidual = Math.max(
    ...polynomialProducerResidualDiagnostics.map((diagnostic) =>
      Number(diagnostic.max_abs_residual)
    )
  );

  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_POLYNOMIAL_H_ROW_GRAPH_RESIDUAL_DIAGNOSTIC_SCHEMA,
    status:
      "h39-polynomial-h-row-graph-residual-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-polynomial-h-row-graph-residual-diagnostic",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    shifted_index: resolvedShiftedIndex,
    y_order:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
      resolvedShiftedIndex,
    outer_radius: resolvedOuterRadius,
    xi_domain: resolvedXiDomain,
    xi_coordinate_rule:
      "xi=4*((speed_midpoint-target_left)/(target_right-target_left))-2",
    polynomial_degree: resolvedPolynomialDegree,
    polynomial_source_subcell_count: resolvedPolynomialSourceSubcellCount,
    xi_partition_counts: resolvedXiPartitionCounts,
    residual_subcell_counts: resolvedResidualSubcellCounts,
    graph_source:
      "local-H38-subcell-midpoint-polynomial-fit-over-fold-coordinate",
    polynomial_h_row_graph_formula:
      "h_i(xi)=sum_j a_{i,j} xi^j, with coefficients fitted from local H38 subcell midpoint rows.",
    baseline_independent_interval_pressure: independentPressure,
    baseline_h_row_midpoint_pressure: hRowMidpointPressure,
    h_row_polynomial_transport_profile: polynomialTransportProfile,
    max_source_fit_abs_residual: maxSourceFitResidual,
    polynomial_graph_partition_replays: polynomialGraphPartitionReplays,
    coarsest_polynomial_graph_partition: coarsestPolynomialGraphPartition,
    best_polynomial_graph_partition: bestPolynomialGraphPartition,
    coarsest_polynomial_graph_pressure: coarsestPolynomialGraphPressure,
    best_polynomial_graph_pressure: bestPolynomialGraphPressure,
    independent_to_best_polynomial_graph_pressure_ratio:
      finitePositive(independentPressure) &&
      finitePositive(bestPolynomialGraphPressure)
        ? Number(independentPressure) / Number(bestPolynomialGraphPressure)
        : null,
    h_row_midpoint_to_best_polynomial_graph_pressure_ratio:
      finitePositive(hRowMidpointPressure) &&
      finitePositive(bestPolynomialGraphPressure)
        ? Number(hRowMidpointPressure) / Number(bestPolynomialGraphPressure)
        : null,
    shared_domain_replay_artifact: sharedDomainReplayArtifact,
    polynomial_producer_residual_diagnostics:
      polynomialProducerResidualDiagnostics,
    affine_reference_residual_diagnostics:
      affineReferenceResidualDiagnostics,
    max_polynomial_producer_abs_residual: maxProducerResidual,
    max_polynomial_graph_plus_residual_diagnostic:
      maxPolynomialGraphPlusResidualDiagnostic,
    max_polynomial_graph_plus_residual_pressure:
      maxPolynomialGraphPlusResidualPressure,
    max_affine_reference_graph_plus_residual_diagnostic:
      maxAffineReferenceGraphPlusResidualDiagnostic,
    max_affine_reference_graph_plus_residual_pressure:
      maxAffineReferenceGraphPlusResidualPressure,
    independent_to_max_polynomial_graph_plus_residual_pressure_ratio:
      finitePositive(independentPressure) &&
      finitePositive(maxPolynomialGraphPlusResidualPressure)
        ? Number(independentPressure) /
          Number(maxPolynomialGraphPlusResidualPressure)
        : null,
    affine_reference_to_polynomial_graph_plus_residual_pressure_ratio:
      finitePositive(maxAffineReferenceGraphPlusResidualPressure) &&
      finitePositive(maxPolynomialGraphPlusResidualPressure)
        ? Number(maxAffineReferenceGraphPlusResidualPressure) /
          Number(maxPolynomialGraphPlusResidualPressure)
        : null,
    polynomial_residual_diagnosis:
      "The polynomial graph tests whether the producer residual is low-degree curvature in the fold coordinate before any independent residual box is added.",
    candidate_certificate_route:
      "If the polynomial graph leaves only small producer residuals on finer subcells, the next certificate should enclose the H38 producer image as a directed-rounded polynomial graph over xi, plus a residual term measured against midpoint-refined producer rows.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_polynomial_h_row_graph_enclosure: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

export function buildH39PolynomialHRowGraphIntervalResidualDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  outerRadius = 0.001,
  shiftedIndex = 1,
  seriesOrder = 60,
  xiDomain = [-2, 2],
  polynomialDegree = 2,
  polynomialSourceSubcellCount = 4,
  xiPartitionCounts = [1, 2, 4, 8],
  residualSubcellCounts = [4, 8],
  hFreezeStartIndexes = [38, 20, 10, 0],
} = {}) {
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedXiDomain = numericInterval("xiDomain", xiDomain);
  const resolvedPolynomialDegree = assertFinitePositiveInteger(
    "polynomialDegree",
    polynomialDegree
  );
  if (resolvedPolynomialDegree > 3) {
    throw new Error("polynomialDegree must be at most 3");
  }
  const resolvedPolynomialSourceSubcellCount = assertFinitePositiveInteger(
    "polynomialSourceSubcellCount",
    polynomialSourceSubcellCount
  );
  if (resolvedPolynomialSourceSubcellCount < resolvedPolynomialDegree + 1) {
    throw new Error(
      "polynomialSourceSubcellCount must be at least polynomialDegree + 1"
    );
  }
  const resolvedXiPartitionCounts = [
    ...new Set(xiPartitionCounts.map((count) =>
      assertFinitePositiveInteger("xiPartitionCounts", count)
    )),
  ].sort((left, right) => left - right);
  if (resolvedXiPartitionCounts.length === 0) {
    throw new Error("xiPartitionCounts must be nonempty");
  }
  const resolvedResidualSubcellCounts = [
    ...new Set(
      residualSubcellCounts.map((count) =>
        assertFinitePositiveInteger("residualSubcellCounts", count)
      )
    ),
  ]
    .filter((count) => count >= resolvedPolynomialSourceSubcellCount)
    .sort((left, right) => left - right);
  if (resolvedResidualSubcellCounts.length === 0) {
    throw new Error("residualSubcellCounts must include at least one source-cover count");
  }
  const providerResidualSubcellCount =
    resolvedResidualSubcellCounts[resolvedResidualSubcellCounts.length - 1];
  const resolvedOuterRadius = assertFinitePositiveNumber(
    "outerRadius",
    outerRadius
  );
  const resolvedShiftedIndex = assertFinitePositiveInteger(
    "shiftedIndex",
    shiftedIndex
  );
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder: assertFinitePositiveInteger("seriesOrder", seriesOrder),
  });
  const rowsBySubcellCount = new Map();
  const rowsForSubcellCount = (subcellCount) => {
    if (!rowsBySubcellCount.has(subcellCount)) {
      rowsBySubcellCount.set(
        subcellCount,
        targetRowsForSubcellCount({
          targetSpeedInterval: resolvedTargetSpeedInterval,
          subcellCount,
          rootSubdivisions,
        })
      );
    }
    return rowsBySubcellCount.get(subcellCount);
  };
  const coarseRows = rowsForSubcellCount(1);
  const affineRows = rowsForSubcellCount(2);
  const polynomialSourceRows = rowsForSubcellCount(
    resolvedPolynomialSourceSubcellCount
  );
  const providerResidualRows = rowsForSubcellCount(
    providerResidualSubcellCount
  );
  if (coarseRows.length !== 1) {
    throw new Error("interval residual diagnostic requires exactly one coarse target row");
  }
  if (affineRows.length !== 2) {
    throw new Error("interval residual diagnostic requires exactly two affine rows");
  }
  if (
    polynomialSourceRows.length !== resolvedPolynomialSourceSubcellCount
  ) {
    throw new Error("interval residual diagnostic requires a complete polynomial source subcover");
  }
  if (providerResidualRows.length !== providerResidualSubcellCount) {
    throw new Error("interval residual diagnostic requires a complete provider residual subcover");
  }
  const coarseRow = coarseRows[0];
  const branchRow = branchRowFor(coarseRow, branch);
  const coarseCell = cellFromCertificateRow(coarseRow);
  const baselineDiagnostic = pressureDiagnosticForRow({
    context,
    row: coarseRow,
    branch,
    outerRadius: resolvedOuterRadius,
    shiftedIndex: resolvedShiftedIndex,
    hFreezeStartIndexes,
  });
  const baselineHRowMidpointReplay =
    baselineDiagnostic.input_family_replays.find(
      (replay) => replay.input_family === "h-row-midpoint"
    ) ?? null;
  const affineTransportProfile = hRowAffineTransportProfileForRows({
    rows: affineRows,
    branch,
  });
  const polynomialTransportProfile = hRowPolynomialTransportProfileForRows({
    rows: polynomialSourceRows,
    branch,
    targetSpeedInterval: resolvedTargetSpeedInterval,
    degree: resolvedPolynomialDegree,
  });
  const polynomialTransportProfilesByBranch =
    hRowPolynomialTransportProfilesByBranch({
      rows: polynomialSourceRows,
      targetSpeedInterval: resolvedTargetSpeedInterval,
      degree: resolvedPolynomialDegree,
    });
  const intervalResidualProfilesByBranch = Object.fromEntries(
    coarseRow.branch_rows.map((branchRowEntry) => {
      const branchName = branchRowEntry.branch;
      return [
        branchName,
        polynomialGraphProducerIntervalResidualProfileForRows({
          targetSpeedInterval: resolvedTargetSpeedInterval,
          rows: providerResidualRows,
          branch: branchName,
          transportProfile: polynomialTransportProfilesByBranch[branchName],
        }),
      ];
    })
  );
  const polynomialGraphPartitionReplays = resolvedXiPartitionCounts.map(
    (partitionCount) => {
      const graphReplays = splitNumericInterval(
        resolvedXiDomain,
        partitionCount
      ).map((noiseInterval) =>
        shiftedPressureReplayForPolynomialGraphInterval({
          context,
          cell: coarseCell,
          branch,
          transportProfile: polynomialTransportProfile,
          noiseInterval,
          solveSlopeInterval: branchRow.h38_solve_slope_interval,
          outerRadius: resolvedOuterRadius,
          shiftedIndex: resolvedShiftedIndex,
        })
      );
      const maxGraphReplay = maxPressureReplay(graphReplays);
      const minGraphReplay = minPressureReplay(graphReplays);
      return {
        xi_partition_count: partitionCount,
        graph_replays: graphReplays,
        max_graph_replay: maxGraphReplay,
        min_graph_replay: minGraphReplay,
        max_graph_pressure: maxGraphReplay?.pressure ?? null,
        min_graph_pressure: minGraphReplay?.pressure ?? null,
      };
    }
  );
  const bestPolynomialGraphPartition = polynomialGraphPartitionReplays.reduce(
    (best, replay) =>
      Number(replay.max_graph_pressure) <
      Number(best?.max_graph_pressure ?? Infinity)
        ? replay
        : best,
    null
  );
  const sharedDomainIntervalResidualReplayArtifact =
    buildH39SharedDomainCoefficientArtifact({
      h38Rows: [coarseRow],
      validateH38: false,
      shiftedOrder: resolvedShiftedIndex,
      seriesOrder: context.seriesOrder,
      rho: resolvedOuterRadius,
      sharedDomainSignature:
        "candidate-h39-polynomial-h-row-graph-interval-residual",
      includeRows: false,
      hRowProvider: polynomialGraphIntervalResidualHRowProvider({
        transportProfilesByBranch: polynomialTransportProfilesByBranch,
        intervalResidualProfilesByBranch,
        noiseInterval: resolvedXiDomain,
      }),
    });
  const polynomialMidpointResidualDiagnostics =
    resolvedResidualSubcellCounts.map((subcellCount) => {
      const rows = rowsForSubcellCount(subcellCount);
      return {
        residual_subcell_count: subcellCount,
        ...polynomialGraphProducerResidualDiagnostic({
          context,
          coarseRow,
          targetSpeedInterval: resolvedTargetSpeedInterval,
          rows,
          branch,
          transportProfile: polynomialTransportProfile,
          solveSlopeInterval: branchRow.h38_solve_slope_interval,
          outerRadius: resolvedOuterRadius,
          shiftedIndex: resolvedShiftedIndex,
          xiDomain: resolvedXiDomain,
        }),
      };
    });
  const polynomialIntervalResidualDiagnostics =
    resolvedResidualSubcellCounts.map((subcellCount) => {
      const rows = rowsForSubcellCount(subcellCount);
      return {
        residual_subcell_count: subcellCount,
        ...polynomialGraphProducerIntervalResidualDiagnostic({
          context,
          coarseRow,
          targetSpeedInterval: resolvedTargetSpeedInterval,
          rows,
          branch,
          transportProfile: polynomialTransportProfile,
          solveSlopeInterval: branchRow.h38_solve_slope_interval,
          outerRadius: resolvedOuterRadius,
          shiftedIndex: resolvedShiftedIndex,
          xiDomain: resolvedXiDomain,
        }),
      };
    });
  const affineReferenceResidualDiagnostics =
    resolvedResidualSubcellCounts.map((subcellCount) => {
      const rows = rowsForSubcellCount(subcellCount);
      return {
        residual_subcell_count: subcellCount,
        ...affineGraphProducerResidualDiagnostic({
          context,
          coarseRow,
          targetSpeedInterval: resolvedTargetSpeedInterval,
          rows,
          branch,
          transportProfile: affineTransportProfile,
          solveSlopeInterval: branchRow.h38_solve_slope_interval,
          outerRadius: resolvedOuterRadius,
          shiftedIndex: resolvedShiftedIndex,
          xiDomain: resolvedXiDomain,
        }),
      };
    });
  const maxPolynomialMidpointResidualDiagnostic =
    polynomialMidpointResidualDiagnostics.reduce(
      (best, diagnostic) =>
        Number(diagnostic.graph_plus_residual_pressure) >
        Number(best?.graph_plus_residual_pressure ?? -1)
          ? diagnostic
          : best,
      null
    );
  const maxPolynomialIntervalResidualDiagnostic =
    polynomialIntervalResidualDiagnostics.reduce(
      (best, diagnostic) =>
        Number(diagnostic.graph_plus_interval_residual_pressure) >
        Number(best?.graph_plus_interval_residual_pressure ?? -1)
          ? diagnostic
          : best,
      null
    );
  const maxAffineReferenceResidualDiagnostic =
    affineReferenceResidualDiagnostics.reduce(
      (best, diagnostic) =>
        Number(diagnostic.graph_plus_residual_pressure) >
        Number(best?.graph_plus_residual_pressure ?? -1)
          ? diagnostic
          : best,
      null
    );
  const independentPressure = baselineDiagnostic.full_input_replay.pressure;
  const hRowMidpointPressure = baselineHRowMidpointReplay?.pressure ?? null;
  const bestPolynomialGraphPressure =
    bestPolynomialGraphPartition?.max_graph_pressure ?? null;
  const maxPolynomialMidpointResidualPressure =
    maxPolynomialMidpointResidualDiagnostic?.graph_plus_residual_pressure ??
    null;
  const maxPolynomialIntervalResidualPressure =
    maxPolynomialIntervalResidualDiagnostic
      ?.graph_plus_interval_residual_pressure ?? null;
  const maxAffineReferenceResidualPressure =
    maxAffineReferenceResidualDiagnostic?.graph_plus_residual_pressure ?? null;
  const intervalResidualPressureScalingSummary =
    residualPressureScalingSummary({
      diagnostics: polynomialIntervalResidualDiagnostics,
      pressureKey: "graph_plus_interval_residual_pressure",
      targetPressure: maxPolynomialMidpointResidualPressure,
    });
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_POLYNOMIAL_H_ROW_GRAPH_INTERVAL_RESIDUAL_DIAGNOSTIC_SCHEMA,
    status:
      "h39-polynomial-h-row-graph-interval-residual-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-polynomial-h-row-graph-interval-residual-diagnostic",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    shifted_index: resolvedShiftedIndex,
    y_order:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
      resolvedShiftedIndex,
    outer_radius: resolvedOuterRadius,
    xi_domain: resolvedXiDomain,
    xi_coordinate_rule:
      "xi=4*((speed-target_left)/(target_right-target_left))-2",
    polynomial_degree: resolvedPolynomialDegree,
    polynomial_source_subcell_count: resolvedPolynomialSourceSubcellCount,
    provider_interval_residual_subcell_count: providerResidualSubcellCount,
    xi_partition_counts: resolvedXiPartitionCounts,
    residual_subcell_counts: resolvedResidualSubcellCounts,
    graph_source:
      "local-H38-subcell-midpoint-polynomial-fit-over-fold-coordinate",
    interval_residual_source:
      "H38-producer-row-intervals-minus-polynomial-graph-intervals",
    baseline_independent_interval_pressure: independentPressure,
    baseline_h_row_midpoint_pressure: hRowMidpointPressure,
    h_row_polynomial_transport_profile: polynomialTransportProfile,
    polynomial_graph_partition_replays: polynomialGraphPartitionReplays,
    best_polynomial_graph_partition: bestPolynomialGraphPartition,
    best_polynomial_graph_pressure: bestPolynomialGraphPressure,
    polynomial_midpoint_residual_diagnostics:
      polynomialMidpointResidualDiagnostics,
    polynomial_interval_residual_diagnostics:
      polynomialIntervalResidualDiagnostics,
    affine_reference_residual_diagnostics:
      affineReferenceResidualDiagnostics,
    max_polynomial_midpoint_residual_diagnostic:
      maxPolynomialMidpointResidualDiagnostic,
    max_polynomial_midpoint_residual_pressure:
      maxPolynomialMidpointResidualPressure,
    max_polynomial_interval_residual_diagnostic:
      maxPolynomialIntervalResidualDiagnostic,
    max_polynomial_interval_residual_pressure:
      maxPolynomialIntervalResidualPressure,
    max_affine_reference_residual_diagnostic:
      maxAffineReferenceResidualDiagnostic,
    max_affine_reference_residual_pressure:
      maxAffineReferenceResidualPressure,
    interval_residual_pressure_scaling_summary:
      intervalResidualPressureScalingSummary,
    shared_domain_interval_residual_replay_artifact:
      sharedDomainIntervalResidualReplayArtifact,
    independent_to_best_polynomial_graph_pressure_ratio:
      finitePositive(independentPressure) &&
      finitePositive(bestPolynomialGraphPressure)
        ? Number(independentPressure) / Number(bestPolynomialGraphPressure)
        : null,
    independent_to_max_polynomial_interval_residual_pressure_ratio:
      finitePositive(independentPressure) &&
      finitePositive(maxPolynomialIntervalResidualPressure)
        ? Number(independentPressure) /
          Number(maxPolynomialIntervalResidualPressure)
        : null,
    interval_to_midpoint_residual_pressure_ratio:
      finitePositive(maxPolynomialIntervalResidualPressure) &&
      finitePositive(maxPolynomialMidpointResidualPressure)
        ? Number(maxPolynomialIntervalResidualPressure) /
          Number(maxPolynomialMidpointResidualPressure)
        : null,
    affine_reference_to_interval_residual_pressure_ratio:
      finitePositive(maxAffineReferenceResidualPressure) &&
      finitePositive(maxPolynomialIntervalResidualPressure)
        ? Number(maxAffineReferenceResidualPressure) /
          Number(maxPolynomialIntervalResidualPressure)
        : null,
    interval_residual_diagnosis:
      "This diagnostic replaces midpoint residual probes with producer-row interval residuals. It is a candidate directed-rounded route, not a certified producer-image enclosure.",
    candidate_certificate_route:
      "Plain producer-row interval residual hulls are a provenance route but not a closure route when they scale like h-row width; the next H38 certificate should preserve residual dependencies or emit a sharper piecewise residual graph.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_polynomial_h_row_graph_enclosure: false,
      certifies_polynomial_interval_residual_enclosure: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

function sharedDomainReplayArtifactCandidateSummary(artifact) {
  const summary = artifact?.h39_shared_domain_coefficient_summary ?? {};
  return {
    coefficient_row_count: summary.coefficient_row_count ?? null,
    h_row_provider_dependency_state:
      summary.h_row_provider_dependency_state ?? null,
    h_row_provider_kinds: summary.h_row_provider_kinds ?? [],
    h_row_provider_backed_all_cells:
      summary.h_row_provider_backed_all_cells ?? false,
    h_row_provider_backed_cell_count:
      summary.h_row_provider_backed_cell_count ?? 0,
    h_row_provider_backed_branch_count:
      summary.h_row_provider_backed_branch_count ?? 0,
    h_row_provider_dependency_trace_count:
      summary.h_row_provider_dependency_trace_count ?? 0,
    max_R43_shifted_prefix_pressure_outer_radius:
      summary.max_R43_shifted_prefix_pressure_outer_radius ?? null,
    max_R43_center_eliminated_shifted_prefix_pressure_outer_radius:
      summary.max_R43_center_eliminated_shifted_prefix_pressure_outer_radius ??
      null,
    max_R43_affine_center_shifted_prefix_majorant_outer_radius:
      summary.max_R43_affine_center_shifted_prefix_majorant_outer_radius ?? null,
    max_candidate_E_R_finite_prefix:
      summary.max_candidate_E_R_finite_prefix ?? null,
    max_candidate_M_R_finite_prefix:
      summary.max_candidate_M_R_finite_prefix ?? null,
    min_candidate_nu_J_finite_prefix:
      summary.min_candidate_nu_J_finite_prefix ?? null,
    max_candidate_M_G_finite_prefix:
      summary.max_candidate_M_G_finite_prefix ?? null,
    candidate_profile_scale_status:
      summary.candidate_profile_scale_status ?? null,
    certifies_continuous_polydisc_primitives:
      summary.certifies_continuous_polydisc_primitives ?? false,
    claim_boundary: artifact?.claim_boundary ?? null,
  };
}

function replaySummaryShiftedPressure(summary) {
  return Number(summary?.max_R43_shifted_prefix_pressure_outer_radius);
}

export function buildH39TerminalSharedResidualAffineZetaProviderReplayDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  outerRadius = 0.001,
  shiftedIndex = 1,
  seriesOrder = 60,
  sourceStencilSubcellCount = 32,
  comparisonStencilIndex = 27,
  polynomialDegree = 2,
  terminalHIndexes = [37, 36, 35],
  residualCoordinatePartitionCount = 8,
  endpointReplayRowLimit = null,
  progressCallback = null,
} = {}) {
  const startedAt = Date.now();
  const emitProgress =
    typeof progressCallback === "function"
      ? (progress) =>
          progressCallback({
            diagnostic:
              "h39-terminal-shared-residual-affine-zeta-provider-replay",
            elapsed_ms: Date.now() - startedAt,
            ...progress,
          })
      : null;
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedSourceStencilSubcellCount = assertFinitePositiveInteger(
    "sourceStencilSubcellCount",
    sourceStencilSubcellCount
  );
  if (resolvedSourceStencilSubcellCount < 5) {
    throw new Error("sourceStencilSubcellCount must be at least 5");
  }
  const resolvedComparisonStencilIndex = Number(comparisonStencilIndex);
  if (
    !Number.isInteger(resolvedComparisonStencilIndex) ||
    resolvedComparisonStencilIndex < 0
  ) {
    throw new Error("comparisonStencilIndex must be a nonnegative integer");
  }
  const resolvedPolynomialDegree = assertFinitePositiveInteger(
    "polynomialDegree",
    polynomialDegree
  );
  if (resolvedPolynomialDegree > 3) {
    throw new Error("polynomialDegree must be at most 3");
  }
  const resolvedTerminalHIndexes = terminalHIndexes.map((hIndex) => {
    const resolved = Number(hIndex);
    if (!Number.isInteger(resolved) || resolved < 0 || resolved > 38) {
      throw new Error("terminalHIndexes must contain h indexes 0 through 38");
    }
    return resolved;
  });
  const resolvedResidualCoordinatePartitionCount =
    assertFinitePositiveInteger(
      "residualCoordinatePartitionCount",
      residualCoordinatePartitionCount
    );
  const resolvedEndpointReplayRowLimit =
    endpointReplayRowLimit === null || endpointReplayRowLimit === undefined
      ? null
      : assertFinitePositiveInteger(
          "endpointReplayRowLimit",
          endpointReplayRowLimit
        );
  const resolvedOuterRadius = assertFinitePositiveNumber(
    "outerRadius",
    outerRadius
  );
  const resolvedShiftedIndex = assertFinitePositiveInteger(
    "shiftedIndex",
    shiftedIndex
  );
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder: assertFinitePositiveInteger("seriesOrder", seriesOrder),
  });
  emitProgress?.({
    stage: "terminal-affine-zeta-provider-source-subcover-start",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    completed_endpoint_count: 0,
    endpoint_count: 2 * resolvedResidualCoordinatePartitionCount,
  });
  const rows = targetRowsForSubcellCount({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    subcellCount: resolvedSourceStencilSubcellCount,
    rootSubdivisions,
  });
  emitProgress?.({
    stage: "terminal-affine-zeta-provider-source-subcover-complete",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    source_row_count: rows.length,
    completed_endpoint_count: 0,
    endpoint_count: 2 * resolvedResidualCoordinatePartitionCount,
  });
  if (rows.length !== resolvedSourceStencilSubcellCount) {
    throw new Error(
      "terminal affine-zeta provider replay requires a complete source subcover"
    );
  }
  const comparisonRows = rows.slice(
    resolvedComparisonStencilIndex,
    resolvedComparisonStencilIndex + 5
  );
  if (comparisonRows.length !== 5) {
    throw new Error(
      "terminal affine-zeta provider replay requires a five-row comparison window"
    );
  }
  emitProgress?.({
    stage: "terminal-affine-zeta-provider-comparison-window-ready",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    comparison_row_count: comparisonRows.length,
    completed_endpoint_count: 0,
    endpoint_count: 2 * resolvedResidualCoordinatePartitionCount,
  });
  const comparisonXiIntervalHull = intervalHull(
    comparisonRows.map((row) =>
      speedIntervalXiInterval({
        row,
        targetSpeedInterval: resolvedTargetSpeedInterval,
      })
    )
  );
  const polynomialTransportProfilesByBranch =
    hRowPolynomialTransportProfilesByBranch({
      rows: comparisonRows,
      targetSpeedInterval: resolvedTargetSpeedInterval,
      degree: resolvedPolynomialDegree,
    });
  const intervalResidualProfilesByBranch = Object.fromEntries(
    comparisonRows[0].branch_rows.map((branchRowEntry) => {
      const branchName = branchRowEntry.branch;
      return [
        branchName,
        polynomialGraphProducerIntervalResidualProfileForRows({
          targetSpeedInterval: resolvedTargetSpeedInterval,
          rows: comparisonRows,
          branch: branchName,
          transportProfile: polynomialTransportProfilesByBranch[branchName],
        }),
      ];
    })
  );
  emitProgress?.({
    stage: "terminal-affine-zeta-provider-profiles-ready",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    comparison_row_count: comparisonRows.length,
    completed_endpoint_count: 0,
    endpoint_count: 2 * resolvedResidualCoordinatePartitionCount,
  });
  const baselineReferenceReplayArtifact = buildH39SharedDomainCoefficientArtifact({
    h38Rows: comparisonRows,
    validateH38: false,
    shiftedOrder: resolvedShiftedIndex,
    seriesOrder: context.seriesOrder,
    rho: resolvedOuterRadius,
    sharedDomainSignature:
      "candidate-h39-terminal-affine-zeta-provider-baseline-reference",
    rowLimit: resolvedEndpointReplayRowLimit,
    includeRows: false,
  });
  const intervalResidualReplayArtifact =
    buildH39SharedDomainCoefficientArtifact({
      h38Rows: comparisonRows,
      validateH38: false,
      shiftedOrder: resolvedShiftedIndex,
      seriesOrder: context.seriesOrder,
      rho: resolvedOuterRadius,
      sharedDomainSignature:
        "candidate-h39-terminal-affine-zeta-provider-interval-residual-reference",
      rowLimit: resolvedEndpointReplayRowLimit,
      includeRows: false,
      hRowProvider: polynomialGraphIntervalResidualHRowProvider({
        transportProfilesByBranch: polynomialTransportProfilesByBranch,
        intervalResidualProfilesByBranch,
        noiseInterval: comparisonXiIntervalHull,
      }),
    });
  emitProgress?.({
    stage: "terminal-affine-zeta-provider-reference-replays-ready",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    comparison_row_count: comparisonRows.length,
    completed_endpoint_count: 0,
    endpoint_count: 2 * resolvedResidualCoordinatePartitionCount,
  });
  const partitionIntervals = residualCoordinatePartitions(
    resolvedResidualCoordinatePartitionCount
  );
  let completedEndpointCount = 0;
  const partitionReplays = partitionIntervals.map(
    (residualNoiseInterval, partitionIndex) => {
      const endpointReplays = residualNoiseInterval.map(
        (residualNoise, endpointIndex) => {
          emitProgress?.({
            stage: "terminal-affine-zeta-provider-endpoint-start",
            source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
            comparison_stencil_index: resolvedComparisonStencilIndex,
            partition_index: partitionIndex,
            endpoint_index: endpointIndex,
            residual_noise: Number(residualNoise),
            completed_endpoint_count: completedEndpointCount,
            endpoint_count: 2 * resolvedResidualCoordinatePartitionCount,
          });
          const artifact = buildH39SharedDomainCoefficientArtifact({
            h38Rows: comparisonRows,
            validateH38: false,
            shiftedOrder: resolvedShiftedIndex,
            seriesOrder: context.seriesOrder,
            rho: resolvedOuterRadius,
            sharedDomainSignature:
              "candidate-h39-terminal-affine-zeta-endpoint-provider-replay",
            rowLimit: resolvedEndpointReplayRowLimit,
            includeRows: false,
            hRowProvider:
              terminalSharedResidualAffineZetaEndpointHRowProvider({
                targetSpeedInterval: resolvedTargetSpeedInterval,
                transportProfilesByBranch:
                  polynomialTransportProfilesByBranch,
                intervalResidualProfilesByBranch,
                terminalHIndexes: resolvedTerminalHIndexes,
                residualNoise,
              }),
          });
          const summary = sharedDomainReplayArtifactCandidateSummary(artifact);
          completedEndpointCount += 1;
          emitProgress?.({
            stage: "terminal-affine-zeta-provider-endpoint-complete",
            source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
            comparison_stencil_index: resolvedComparisonStencilIndex,
            partition_index: partitionIndex,
            endpoint_index: endpointIndex,
            residual_noise: Number(residualNoise),
            shifted_prefix_pressure:
              summary.max_R43_shifted_prefix_pressure_outer_radius,
            completed_endpoint_count: completedEndpointCount,
            endpoint_count: 2 * resolvedResidualCoordinatePartitionCount,
          });
          return {
            endpoint_index: endpointIndex,
            residual_noise: Number(residualNoise),
            shared_domain_replay_artifact_summary: summary,
            endpoint_provider_backed_replay:
              summary.h_row_provider_dependency_state ===
                "dependency-preserving-provider-backed-replay" &&
              summary.h_row_provider_backed_all_cells === true,
            endpoint_claim_boundary: artifact.claim_boundary,
          };
        }
      );
      const endpointPressures = endpointReplays.map((endpoint) =>
        replaySummaryShiftedPressure(
          endpoint.shared_domain_replay_artifact_summary
        )
      );
      return {
        partition_index: partitionIndex,
        residual_noise_interval: residualNoiseInterval,
        endpoint_replays: endpointReplays,
        max_endpoint_shifted_prefix_pressure_outer_radius: Math.max(
          ...endpointPressures
        ),
        min_endpoint_shifted_prefix_pressure_outer_radius: Math.min(
          ...endpointPressures
        ),
        all_endpoint_replays_provider_backed: endpointReplays.every(
          (endpoint) => endpoint.endpoint_provider_backed_replay === true
        ),
      };
    }
  );
  const endpointSummaries = partitionReplays.flatMap((partition) =>
    partition.endpoint_replays.map(
      (endpoint) => endpoint.shared_domain_replay_artifact_summary
    )
  );
  const endpointPressures = endpointSummaries.map(replaySummaryShiftedPressure);
  const maxEndpointPressure = Math.max(...endpointPressures);
  const minEndpointPressure = Math.min(...endpointPressures);
  const baselineReferenceSummary = sharedDomainReplayArtifactCandidateSummary(
    baselineReferenceReplayArtifact
  );
  const intervalResidualSummary = sharedDomainReplayArtifactCandidateSummary(
    intervalResidualReplayArtifact
  );
  const baselineReferencePressure = replaySummaryShiftedPressure(
    baselineReferenceSummary
  );
  const intervalResidualPressure =
    replaySummaryShiftedPressure(intervalResidualSummary);
  const zetaDegreeBound = terminalSharedResidualZetaDegreeBound({
    terminalHIndexes: resolvedTerminalHIndexes,
    targetYOrder:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
      resolvedShiftedIndex,
  });
  emitProgress?.({
    stage: "terminal-affine-zeta-provider-summary-ready",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    completed_endpoint_count: completedEndpointCount,
    endpoint_count: 2 * resolvedResidualCoordinatePartitionCount,
    max_endpoint_shifted_prefix_pressure_outer_radius:
      maxEndpointPressure,
  });
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_TERMINAL_SHARED_RESIDUAL_AFFINE_ZETA_PROVIDER_REPLAY_DIAGNOSTIC_SCHEMA,
    status:
      "h39-terminal-shared-residual-affine-zeta-provider-replay-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-h39-terminal-shared-residual-affine-zeta-provider-replay-diagnostic",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    shifted_index: resolvedShiftedIndex,
    y_order:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
      resolvedShiftedIndex,
    outer_radius: resolvedOuterRadius,
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    comparison_row_count: comparisonRows.length,
    comparison_xi_interval_hull: comparisonXiIntervalHull,
    endpoint_replay_row_limit: resolvedEndpointReplayRowLimit,
    endpoint_replay_row_count:
      baselineReferenceSummary.coefficient_row_count ?? null,
    polynomial_degree: resolvedPolynomialDegree,
    terminal_provider_h_indexes: resolvedTerminalHIndexes,
    residual_coordinate:
      "shared endpoint zeta in h_i(xi,zeta)=q_i(xi)+center_i+zeta*radius_i for terminal h rows",
    residual_coordinate_partition_count:
      resolvedResidualCoordinatePartitionCount,
    residual_noise_partition_intervals: partitionIntervals,
    terminal_zeta_degree_bound: zetaDegreeBound,
    affine_in_shared_residual_coordinate:
      zetaDegreeBound.affine_in_shared_residual_coordinate,
    h38_solve_target_policy: "preserved-H39-predecessor-row",
    provider_shape_interpretation: {
      existing_h_row_provider_accepts_shared_zeta_endpoint: true,
      existing_h_row_provider_accepts_shared_zeta_interval: false,
      reason:
        "the current provider boundary consumes one derived hIntervals vector per branch, so a scalar zeta endpoint can be replayed while a coupled zeta interval still needs an explicit endpoint/partition proof",
    },
    baseline_reference_replay_artifact_summary: baselineReferenceSummary,
    interval_residual_replay_artifact_summary: intervalResidualSummary,
    endpoint_partition_replays: partitionReplays,
    endpoint_provider_replay_summary: {
      endpoint_replay_count: endpointSummaries.length,
      all_endpoint_replays_provider_backed: partitionReplays.every(
        (partition) => partition.all_endpoint_replays_provider_backed === true
      ),
      provider_kind:
        "candidate-terminal-shared-residual-affine-zeta-endpoint-provider",
      min_endpoint_shifted_prefix_pressure_outer_radius:
        minEndpointPressure,
      max_endpoint_shifted_prefix_pressure_outer_radius:
        maxEndpointPressure,
      baseline_reference_to_max_endpoint_shifted_prefix_pressure_ratio:
        finitePositive(baselineReferencePressure) &&
        finitePositive(maxEndpointPressure)
          ? Number(baselineReferencePressure) / Number(maxEndpointPressure)
          : null,
      interval_residual_to_max_endpoint_shifted_prefix_pressure_ratio:
        finitePositive(intervalResidualPressure) &&
        finitePositive(maxEndpointPressure)
          ? Number(intervalResidualPressure) / Number(maxEndpointPressure)
          : null,
    },
    provider_replay_diagnosis:
      "terminal-affine-zeta-endpoints-cross-existing-H39-provider-boundary-candidate",
    candidate_certificate_route:
      "The existing h-row provider hook can replay scalar affine-zeta endpoints through H39 without widening zeta to independent terminal h-row boxes. A certificate still needs a directed-rounded coupled graph-xi/eight-slice affine-zeta producer-image enclosure, or an evaluator boundary that carries that coupled coordinate natively.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_terminal_affine_zeta_provider_enclosure: false,
      certifies_shared_zeta_interval_provider: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

function summarizePostZetaReplay({
  row,
  rowAnalysisIndex,
  partitionIndex,
  endpointIndex,
  residualNoise,
  providerOutput,
  replay,
}) {
  return {
    row_analysis_index: rowAnalysisIndex,
    cell_id: row.cell_id,
    speed_interval: row.speed_interval,
    partition_index: partitionIndex,
    endpoint_index: endpointIndex,
    residual_noise: Number(residualNoise),
    pressure: replay.pressure,
    center_interval: replay.center_interval,
    center_numeric_interval: replay.center_numeric_interval,
    row_pressure: replay.row_pressure,
    h_row_provider_kind: providerOutput.providerKind,
    h_row_dependency_witness: providerOutput.hRowDependencyWitness,
    h_row_provider_claim_boundary: providerOutput.hRowProviderClaimBoundary,
  };
}

function replayForInputFamily(sensitivity, inputFamily) {
  return (
    sensitivity?.input_family_replays?.find(
      (replay) => replay.input_family === inputFamily
    ) ?? null
  );
}

function replayForFreezeStart(sensitivity, freezeStartIndex) {
  return (
    sensitivity?.h_row_freeze_replays?.find(
      (replay) => replay.freeze_start_index === freezeStartIndex
    ) ?? null
  );
}

function pointHIntervalAtMidpoint(interval) {
  const midpoint = intervalMidpoint(interval);
  return [midpoint, midpoint];
}

function hIntervalsWithOnlyIndexesActive(hIntervals, activeIndexes) {
  const activeIndexSet = new Set(activeIndexes.map(Number));
  return hIntervals.map((interval, hIndex) =>
    activeIndexSet.has(hIndex) ? [Number(interval[0]), Number(interval[1])] : pointHIntervalAtMidpoint(interval)
  );
}

function hIntervalsWithIndexesFrozen(hIntervals, frozenIndexes) {
  const frozenIndexSet = new Set(frozenIndexes.map(Number));
  return hIntervals.map((interval, hIndex) =>
    frozenIndexSet.has(hIndex) ? pointHIntervalAtMidpoint(interval) : [Number(interval[0]), Number(interval[1])]
  );
}

function postZetaFamilyDefinitions({ hCount, terminalHIndexes }) {
  const terminalIndexSet = new Set(terminalHIndexes.map(Number));
  const h38Index = THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index;
  const allIndexes = Array.from({ length: hCount }, (_, hIndex) => hIndex);
  const terminalIndexes = allIndexes.filter(
    (hIndex) => terminalIndexSet.has(hIndex) && hIndex !== h38Index
  );
  const nonterminalIndexes = allIndexes.filter(
    (hIndex) => hIndex !== h38Index && !terminalIndexSet.has(hIndex)
  );
  return [
    {
      family: "h38-solve-target-row",
      h_indexes: [h38Index],
    },
    {
      family: "terminal-affine-zeta-provider-rows",
      h_indexes: terminalIndexes,
    },
    {
      family: "nonterminal-h-row-chain",
      h_indexes: nonterminalIndexes,
    },
  ].filter((family) => family.h_indexes.length > 0);
}

function postZetaPressureReplaySummary({
  context,
  cell,
  branch,
  hIntervals,
  solveSlopeInterval,
  outerRadius,
  shiftedIndex,
  fullPressure,
  mode,
  family,
  hIndexes,
}) {
  const replay = shiftedPressureReplayForPointHRow({
    context,
    cell,
    branch,
    hIntervals,
    solveSlopeInterval,
    outerRadius,
    shiftedIndex,
  });
  return {
    mode,
    family,
    h_indexes: hIndexes,
    pressure: replay.pressure,
    pressure_share_of_full:
      Number(fullPressure) > 0
        ? Number(replay.pressure) / Number(fullPressure)
        : null,
    full_to_pressure_ratio:
      Number(replay.pressure) > 0
        ? Number(fullPressure) / Number(replay.pressure)
        : null,
    center_interval: replay.center_interval,
    center_numeric_interval: replay.center_numeric_interval,
    row_pressure: replay.row_pressure,
  };
}

function dominantPressureSummary(replays) {
  return replays.reduce(
    (dominant, replay) =>
      Number(replay.pressure) > Number(dominant?.pressure ?? -1)
        ? replay
        : dominant,
    null
  );
}

function dominantReductionSummary(replays) {
  return replays.reduce(
    (dominant, replay) =>
      Number(replay.full_to_pressure_ratio ?? -1) >
      Number(dominant?.full_to_pressure_ratio ?? -1)
        ? replay
        : dominant,
    null
  );
}

function postZetaPressureSourceInterpretation({
  sensitivity,
  terminalHIndexes,
  frozenOutFamilyReplays = [],
  activeOnlySingleHIndexReplays = [],
}) {
  const strongestFrozenFamily = dominantReductionSummary(
    frozenOutFamilyReplays
  );
  const strongestActiveSingle = dominantPressureSummary(
    activeOnlySingleHIndexReplays
  );
  const h38Index = THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index;
  if (
    strongestFrozenFamily?.family === "h38-solve-target-row" &&
    Number(strongestFrozenFamily?.full_to_pressure_ratio ?? 0) >= 10
  ) {
    return "preserved-h38-row-dominates-after-terminal-zeta";
  }
  if (
    strongestFrozenFamily?.family === "terminal-affine-zeta-provider-rows" &&
    Number(strongestFrozenFamily?.full_to_pressure_ratio ?? 0) >= 10
  ) {
    return "terminal-plus-h38-family-dominates-after-terminal-zeta";
  }
  if (
    strongestFrozenFamily?.family === "nonterminal-h-row-chain" &&
    Number(strongestFrozenFamily?.full_to_pressure_ratio ?? 0) >= 10
  ) {
    return "nonterminal-h-row-chain-dominates-after-terminal-zeta";
  }
  if (
    strongestActiveSingle?.h_indexes?.length === 1 &&
    strongestActiveSingle.h_indexes[0] === h38Index &&
    Number(strongestActiveSingle?.pressure_share_of_full ?? 0) >= 0.5
  ) {
    return "preserved-h38-row-dominates-after-terminal-zeta";
  }
  const h38FreezeReplay = replayForFreezeStart(
    sensitivity,
    h38Index
  );
  const terminalStartIndex = Math.min(...terminalHIndexes.map(Number));
  const terminalPlusH38Replay = replayForFreezeStart(
    sensitivity,
    terminalStartIndex
  );
  const fullChainReplay = replayForFreezeStart(sensitivity, 0);
  const h38Reduction = Number(h38FreezeReplay?.full_to_pressure_ratio ?? 0);
  const terminalReduction = Number(
    terminalPlusH38Replay?.full_to_pressure_ratio ?? 0
  );
  const fullChainReduction = Number(
    fullChainReplay?.full_to_pressure_ratio ?? 0
  );
  const hRowReduction = Number(
    sensitivity?.h_row_midpoint_reduction_factor ?? 0
  );
  const strongestNonHReduction = Number(
    sensitivity?.strongest_non_h_row_reduction_factor ?? 1
  );

  if (
    h38Reduction >= 10 &&
    h38Reduction >= 2 * Math.max(1, terminalReduction)
  ) {
    return "preserved-h38-row-dominates-after-terminal-zeta";
  }
  if (
    terminalReduction >= 10 &&
    terminalReduction >= 2 * Math.max(1, h38Reduction)
  ) {
    return "terminal-plus-h38-family-dominates-after-terminal-zeta";
  }
  if (
    fullChainReduction >=
    10 * Math.max(1, terminalReduction, h38Reduction)
  ) {
    return "nonterminal-h-row-chain-dominates-after-terminal-zeta";
  }
  if (
    hRowReduction >= 10 &&
    hRowReduction >= 10 * Math.max(1, strongestNonHReduction)
  ) {
    return "h-row-interval-dependency-dominates-after-terminal-zeta";
  }
  return "post-zeta-pressure-source-mixed-or-source-level";
}

export function buildH39PostZetaPressureSourceIsolationDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  outerRadius = 0.001,
  shiftedIndex = 1,
  seriesOrder = 60,
  sourceStencilSubcellCount = 32,
  comparisonStencilIndex = 27,
  polynomialDegree = 2,
  terminalHIndexes = [37, 36, 35],
  residualCoordinatePartitionCount = 8,
  rowAnalysisLimit = 1,
  hFreezeStartIndexes = [38, 37, 36, 35, 34, 30, 20, 10, 0],
  hRowWidthCompressionFactors = [1, 0.5, 0.25, 0.125, 0.0625, 0],
  singleHIndexAnalysisIndexes = null,
  progressCallback = null,
} = {}) {
  const startedAt = Date.now();
  const emitProgress =
    typeof progressCallback === "function"
      ? (progress) =>
          progressCallback({
            diagnostic: "h39-post-zeta-pressure-source-isolation",
            elapsed_ms: Date.now() - startedAt,
            ...progress,
          })
      : null;
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedSourceStencilSubcellCount = assertFinitePositiveInteger(
    "sourceStencilSubcellCount",
    sourceStencilSubcellCount
  );
  if (resolvedSourceStencilSubcellCount < 5) {
    throw new Error("sourceStencilSubcellCount must be at least 5");
  }
  const resolvedComparisonStencilIndex = Number(comparisonStencilIndex);
  if (
    !Number.isInteger(resolvedComparisonStencilIndex) ||
    resolvedComparisonStencilIndex < 0
  ) {
    throw new Error("comparisonStencilIndex must be a nonnegative integer");
  }
  const resolvedPolynomialDegree = assertFinitePositiveInteger(
    "polynomialDegree",
    polynomialDegree
  );
  if (resolvedPolynomialDegree > 3) {
    throw new Error("polynomialDegree must be at most 3");
  }
  const resolvedTerminalHIndexes = terminalHIndexes.map((hIndex) => {
    const resolved = Number(hIndex);
    if (!Number.isInteger(resolved) || resolved < 0 || resolved > 38) {
      throw new Error("terminalHIndexes must contain h indexes 0 through 38");
    }
    return resolved;
  });
  const resolvedResidualCoordinatePartitionCount =
    assertFinitePositiveInteger(
      "residualCoordinatePartitionCount",
      residualCoordinatePartitionCount
    );
  const resolvedRowAnalysisLimit = assertFinitePositiveInteger(
    "rowAnalysisLimit",
    rowAnalysisLimit
  );
  const resolvedOuterRadius = assertFinitePositiveNumber(
    "outerRadius",
    outerRadius
  );
  const resolvedShiftedIndex = assertFinitePositiveInteger(
    "shiftedIndex",
    shiftedIndex
  );
  const resolvedFreezeStartIndexes = hFreezeStartIndexes.map((hIndex) => {
    const resolved = Number(hIndex);
    if (!Number.isInteger(resolved) || resolved < 0 || resolved > 38) {
      throw new Error("hFreezeStartIndexes must contain h indexes 0 through 38");
    }
    return resolved;
  });
  const resolvedCompressionFactors = hRowWidthCompressionFactors.map((factor) => {
    const resolved = Number(factor);
    if (!Number.isFinite(resolved) || resolved < 0 || resolved > 1) {
      throw new Error("hRowWidthCompressionFactors must be finite values in [0,1]");
    }
    return resolved;
  });
  const resolvedSingleHIndexAnalysisIndexes = (
    singleHIndexAnalysisIndexes ??
    Array.from({ length: 39 }, (_, hIndex) => hIndex)
  ).map((hIndex) => {
    const resolved = Number(hIndex);
    if (!Number.isInteger(resolved) || resolved < 0 || resolved > 38) {
      throw new Error(
        "singleHIndexAnalysisIndexes must contain h indexes 0 through 38"
      );
    }
    return resolved;
  });
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder: assertFinitePositiveInteger("seriesOrder", seriesOrder),
  });
  emitProgress?.({
    stage: "post-zeta-source-subcover-start",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    completed_endpoint_count: 0,
    endpoint_count:
      resolvedRowAnalysisLimit * resolvedResidualCoordinatePartitionCount * 2,
  });
  const rows = targetRowsForSubcellCount({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    subcellCount: resolvedSourceStencilSubcellCount,
    rootSubdivisions,
  });
  if (rows.length !== resolvedSourceStencilSubcellCount) {
    throw new Error(
      "post-zeta pressure source isolation requires a complete source subcover"
    );
  }
  const comparisonRows = rows.slice(
    resolvedComparisonStencilIndex,
    resolvedComparisonStencilIndex + 5
  );
  if (comparisonRows.length !== 5) {
    throw new Error(
      "post-zeta pressure source isolation requires a five-row comparison window"
    );
  }
  const analysisRows = comparisonRows.slice(
    0,
    Math.min(resolvedRowAnalysisLimit, comparisonRows.length)
  );
  emitProgress?.({
    stage: "post-zeta-comparison-window-ready",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    comparison_row_count: comparisonRows.length,
    row_analysis_count: analysisRows.length,
    completed_endpoint_count: 0,
    endpoint_count:
      analysisRows.length * resolvedResidualCoordinatePartitionCount * 2,
  });
  const comparisonXiIntervalHull = intervalHull(
    comparisonRows.map((row) =>
      speedIntervalXiInterval({
        row,
        targetSpeedInterval: resolvedTargetSpeedInterval,
      })
    )
  );
  const polynomialTransportProfilesByBranch =
    hRowPolynomialTransportProfilesByBranch({
      rows: comparisonRows,
      targetSpeedInterval: resolvedTargetSpeedInterval,
      degree: resolvedPolynomialDegree,
    });
  const intervalResidualProfilesByBranch = Object.fromEntries(
    comparisonRows[0].branch_rows.map((branchRowEntry) => {
      const branchName = branchRowEntry.branch;
      return [
        branchName,
        polynomialGraphProducerIntervalResidualProfileForRows({
          targetSpeedInterval: resolvedTargetSpeedInterval,
          rows: comparisonRows,
          branch: branchName,
          transportProfile: polynomialTransportProfilesByBranch[branchName],
        }),
      ];
    })
  );
  const partitionIntervals = residualCoordinatePartitions(
    resolvedResidualCoordinatePartitionCount
  );
  const endpointProvider = (residualNoise) =>
    terminalSharedResidualAffineZetaEndpointHRowProvider({
      targetSpeedInterval: resolvedTargetSpeedInterval,
      transportProfilesByBranch: polynomialTransportProfilesByBranch,
      intervalResidualProfilesByBranch,
      terminalHIndexes: resolvedTerminalHIndexes,
      residualNoise,
      providerKind:
        "candidate-terminal-shared-residual-affine-zeta-endpoint-provider",
      providerProvenance:
        "post-zeta-pressure-source-isolation-terminal-affine-zeta-endpoint",
    });
  let completedEndpointCount = 0;
  const endpointReplays = analysisRows.flatMap((row, rowAnalysisIndex) => {
    const branchRow = branchRowFor(row, branch);
    const cell = cellFromCertificateRow(row);
    return partitionIntervals.flatMap((residualNoiseInterval, partitionIndex) =>
      residualNoiseInterval.map((residualNoise, endpointIndex) => {
        emitProgress?.({
          stage: "post-zeta-endpoint-start",
          row_analysis_index: rowAnalysisIndex,
          cell_id: row.cell_id,
          partition_index: partitionIndex,
          endpoint_index: endpointIndex,
          residual_noise: Number(residualNoise),
          completed_endpoint_count: completedEndpointCount,
          endpoint_count:
            analysisRows.length *
            resolvedResidualCoordinatePartitionCount *
            2,
        });
        const providerOutput = endpointProvider(residualNoise)({
          branch,
          branchRow,
          cellId: row.cell_id,
          h38Row: row,
          replayKind: "h39-post-zeta-pressure-source-isolation",
        });
        const replay = shiftedPressureReplayForPointHRow({
          context,
          cell,
          branch,
          hIntervals: providerOutput.hIntervals,
          solveSlopeInterval: providerOutput.solveSlopeInterval,
          outerRadius: resolvedOuterRadius,
          shiftedIndex: resolvedShiftedIndex,
        });
        completedEndpointCount += 1;
        emitProgress?.({
          stage: "post-zeta-endpoint-complete",
          row_analysis_index: rowAnalysisIndex,
          cell_id: row.cell_id,
          partition_index: partitionIndex,
          endpoint_index: endpointIndex,
          residual_noise: Number(residualNoise),
          pressure: replay.pressure,
          completed_endpoint_count: completedEndpointCount,
          endpoint_count:
            analysisRows.length *
            resolvedResidualCoordinatePartitionCount *
            2,
        });
        return {
          row,
          cell,
          branchRow,
          providerOutput,
          replay,
          summary: summarizePostZetaReplay({
            row,
            rowAnalysisIndex,
            partitionIndex,
            endpointIndex,
            residualNoise,
            providerOutput,
            replay,
          }),
        };
      })
    );
  });
  const h38IncludedTerminalHIndexes = [
    ...new Set([
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index,
      ...resolvedTerminalHIndexes,
    ]),
  ].sort((left, right) => left - right);
  const h38IncludedEndpointProvider = (residualNoise) =>
    terminalSharedResidualAffineZetaEndpointHRowProvider({
      targetSpeedInterval: resolvedTargetSpeedInterval,
      transportProfilesByBranch: polynomialTransportProfilesByBranch,
      intervalResidualProfilesByBranch,
      terminalHIndexes: h38IncludedTerminalHIndexes,
      residualNoise,
      preserveH38: false,
      providerKind:
        "candidate-h38-included-shared-residual-affine-zeta-endpoint-provider",
      providerProvenance:
        "post-zeta-pressure-source-isolation-h38-included-affine-zeta-endpoint",
    });
  const h38IncludedEndpointReplays = analysisRows.flatMap(
    (row, rowAnalysisIndex) => {
      const branchRow = branchRowFor(row, branch);
      const cell = cellFromCertificateRow(row);
      return partitionIntervals.flatMap(
        (residualNoiseInterval, partitionIndex) =>
          residualNoiseInterval.map((residualNoise, endpointIndex) => {
            const providerOutput = h38IncludedEndpointProvider(residualNoise)({
              branch,
              branchRow,
              cellId: row.cell_id,
              h38Row: row,
              replayKind:
                "h39-post-zeta-h38-included-pressure-source-isolation",
            });
            const replay = shiftedPressureReplayForPointHRow({
              context,
              cell,
              branch,
              hIntervals: providerOutput.hIntervals,
              solveSlopeInterval: providerOutput.solveSlopeInterval,
              outerRadius: resolvedOuterRadius,
              shiftedIndex: resolvedShiftedIndex,
            });
            return summarizePostZetaReplay({
              row,
              rowAnalysisIndex,
              partitionIndex,
              endpointIndex,
              residualNoise,
              providerOutput,
              replay,
            });
          })
      );
    }
  );
  const dominantEndpointReplay = endpointReplays.reduce((dominant, replay) =>
    Number(replay.replay.pressure) > Number(dominant?.replay?.pressure ?? -1)
      ? replay
      : dominant
  );
  const dominantSensitivity =
    computeH39AffineCenterHRowSensitivityDiagnosticCandidate({
      context,
      cell: dominantEndpointReplay.cell,
      branch,
      hIntervals: dominantEndpointReplay.providerOutput.hIntervals,
      solveSlopeInterval:
        dominantEndpointReplay.providerOutput.solveSlopeInterval,
      outerRadius: resolvedOuterRadius,
      shiftedIndex: resolvedShiftedIndex,
      hFreezeStartIndexes: resolvedFreezeStartIndexes,
      hRowWidthCompressionFactors: resolvedCompressionFactors,
    });
  const h38FreezeReplay = replayForFreezeStart(
    dominantSensitivity,
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index
  );
  const terminalStartIndex = Math.min(...resolvedTerminalHIndexes);
  const terminalPlusH38FreezeReplay = replayForFreezeStart(
    dominantSensitivity,
    terminalStartIndex
  );
  const fullChainFreezeReplay = replayForFreezeStart(
    dominantSensitivity,
    0
  );
  const dominantHIntervals =
    dominantEndpointReplay.providerOutput.hIntervals;
  const dominantFullPressure = dominantEndpointReplay.replay.pressure;
  const familyDefinitions = postZetaFamilyDefinitions({
    hCount: dominantHIntervals.length,
    terminalHIndexes: resolvedTerminalHIndexes,
  });
  let completedPressureSourceReplayCount = 0;
  const pressureSourceReplayCount =
    2 * familyDefinitions.length +
    2 * resolvedSingleHIndexAnalysisIndexes.length;
  const pressureSourceReplay = ({
    mode,
    family,
    hIndexes,
    hIntervals,
  }) => {
    emitProgress?.({
      stage: "post-zeta-pressure-source-replay-start",
      mode,
      family,
      h_indexes: hIndexes,
      completed_pressure_source_replay_count:
        completedPressureSourceReplayCount,
      pressure_source_replay_count: pressureSourceReplayCount,
    });
    const replay = postZetaPressureReplaySummary({
      context,
      cell: dominantEndpointReplay.cell,
      branch,
      hIntervals,
      solveSlopeInterval:
        dominantEndpointReplay.providerOutput.solveSlopeInterval,
      outerRadius: resolvedOuterRadius,
      shiftedIndex: resolvedShiftedIndex,
      fullPressure: dominantFullPressure,
      mode,
      family,
      hIndexes,
    });
    completedPressureSourceReplayCount += 1;
    emitProgress?.({
      stage: "post-zeta-pressure-source-replay-complete",
      mode,
      family,
      h_indexes: hIndexes,
      pressure: replay.pressure,
      completed_pressure_source_replay_count:
        completedPressureSourceReplayCount,
      pressure_source_replay_count: pressureSourceReplayCount,
    });
    return replay;
  };
  const activeOnlyFamilyReplays = familyDefinitions.map((family) =>
    pressureSourceReplay({
      hIntervals: hIntervalsWithOnlyIndexesActive(
        dominantHIntervals,
        family.h_indexes
      ),
      mode: "active-only-family",
      family: family.family,
      hIndexes: family.h_indexes,
    })
  );
  const frozenOutFamilyReplays = familyDefinitions.map((family) =>
    pressureSourceReplay({
      hIntervals: hIntervalsWithIndexesFrozen(
        dominantHIntervals,
        family.h_indexes
      ),
      mode: "frozen-out-family",
      family: family.family,
      hIndexes: family.h_indexes,
    })
  );
  const activeOnlySingleHIndexReplays =
    resolvedSingleHIndexAnalysisIndexes.map((hIndex) =>
      pressureSourceReplay({
        hIntervals: hIntervalsWithOnlyIndexesActive(dominantHIntervals, [
          hIndex,
        ]),
        mode: "active-only-single-h-index",
        family: `h${hIndex}`,
        hIndexes: [hIndex],
      })
    );
  const frozenOutSingleHIndexReplays =
    resolvedSingleHIndexAnalysisIndexes.map((hIndex) =>
      pressureSourceReplay({
        hIntervals: hIntervalsWithIndexesFrozen(dominantHIntervals, [
          hIndex,
        ]),
        mode: "frozen-out-single-h-index",
        family: `h${hIndex}`,
        hIndexes: [hIndex],
      })
    );
  const endpointReplaySummaries = endpointReplays.map(
    (endpoint) => endpoint.summary
  );
  const pressures = endpointReplaySummaries.map((endpoint) =>
    Number(endpoint.pressure)
  );
  const maxEndpointPressure = Math.max(...pressures);
  const minEndpointPressure = Math.min(...pressures);
  const h38IncludedPressures = h38IncludedEndpointReplays.map((endpoint) =>
    Number(endpoint.pressure)
  );
  const maxH38IncludedEndpointPressure = Math.max(...h38IncludedPressures);
  const minH38IncludedEndpointPressure = Math.min(...h38IncludedPressures);
  emitProgress?.({
    stage: "post-zeta-pressure-source-summary-ready",
    completed_endpoint_count: completedEndpointCount,
    endpoint_count: endpointReplaySummaries.length,
    max_endpoint_pressure: maxEndpointPressure,
    post_zeta_pressure_source_interpretation:
      postZetaPressureSourceInterpretation({
        sensitivity: dominantSensitivity,
        terminalHIndexes: resolvedTerminalHIndexes,
        frozenOutFamilyReplays,
        activeOnlySingleHIndexReplays,
      }),
  });

  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_POST_ZETA_PRESSURE_SOURCE_ISOLATION_DIAGNOSTIC_SCHEMA,
    status:
      "h39-post-zeta-pressure-source-isolation-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-h39-post-zeta-pressure-source-isolation-diagnostic",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    shifted_index: resolvedShiftedIndex,
    y_order:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
      resolvedShiftedIndex,
    outer_radius: resolvedOuterRadius,
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    comparison_row_count: comparisonRows.length,
    row_analysis_limit: resolvedRowAnalysisLimit,
    row_analysis_count: analysisRows.length,
    comparison_xi_interval_hull: comparisonXiIntervalHull,
    polynomial_degree: resolvedPolynomialDegree,
    terminal_provider_h_indexes: resolvedTerminalHIndexes,
    residual_coordinate_partition_count:
      resolvedResidualCoordinatePartitionCount,
    single_h_index_analysis_indexes: resolvedSingleHIndexAnalysisIndexes,
    residual_noise_partition_intervals: partitionIntervals,
    h38_solve_target_policy: "preserved-H39-predecessor-row",
    endpoint_replay_summary: {
      endpoint_replay_count: endpointReplaySummaries.length,
      min_endpoint_pressure: minEndpointPressure,
      max_endpoint_pressure: maxEndpointPressure,
      provider_kind:
        "candidate-terminal-shared-residual-affine-zeta-endpoint-provider",
      all_endpoint_replays_provider_backed: endpointReplaySummaries.every(
        (endpoint) =>
          endpoint.h_row_provider_kind ===
            "candidate-terminal-shared-residual-affine-zeta-endpoint-provider" &&
          endpoint.h_row_provider_claim_boundary
            ?.certifies_directed_rounded_shared_domain === false
      ),
    },
    endpoint_replays: endpointReplaySummaries,
    h38_included_endpoint_replay_summary: {
      endpoint_replay_count: h38IncludedEndpointReplays.length,
      min_endpoint_pressure: minH38IncludedEndpointPressure,
      max_endpoint_pressure: maxH38IncludedEndpointPressure,
      provider_kind:
        "candidate-h38-included-shared-residual-affine-zeta-endpoint-provider",
      h38_included_terminal_h_indexes: h38IncludedTerminalHIndexes,
      preserved_h38_to_h38_included_max_pressure_ratio:
        finitePositive(maxH38IncludedEndpointPressure)
          ? maxEndpointPressure / maxH38IncludedEndpointPressure
          : null,
      all_endpoint_replays_provider_backed: h38IncludedEndpointReplays.every(
        (endpoint) =>
          endpoint.h_row_provider_kind ===
            "candidate-h38-included-shared-residual-affine-zeta-endpoint-provider" &&
          endpoint.h_row_provider_claim_boundary
            ?.certifies_directed_rounded_shared_domain === false
      ),
    },
    h38_included_endpoint_replays: h38IncludedEndpointReplays,
    dominant_endpoint_replay: dominantEndpointReplay.summary,
    dominant_endpoint_sensitivity: dominantSensitivity,
    post_zeta_pressure_source_summary: {
      interpretation: postZetaPressureSourceInterpretation({
        sensitivity: dominantSensitivity,
        terminalHIndexes: resolvedTerminalHIndexes,
        frozenOutFamilyReplays,
        activeOnlySingleHIndexReplays,
      }),
      full_input_pressure:
        dominantSensitivity.full_input_replay?.pressure ?? null,
      h_row_midpoint_reduction_factor:
        dominantSensitivity.h_row_midpoint_reduction_factor,
      cell_midpoint_reduction_factor:
        dominantSensitivity.cell_midpoint_reduction_factor,
      slope_midpoint_reduction_factor:
        dominantSensitivity.slope_midpoint_reduction_factor,
      strongest_non_h_row_reduction_factor:
        dominantSensitivity.strongest_non_h_row_reduction_factor,
      h38_only_freeze_replay: h38FreezeReplay,
      terminal_plus_h38_freeze_replay: terminalPlusH38FreezeReplay,
      full_chain_freeze_replay: fullChainFreezeReplay,
      h_row_transport_depth_summary:
        dominantSensitivity.h_row_transport_depth_summary,
      h_row_width_compression_replays:
        dominantSensitivity.h_row_width_compression_replays,
      h38_included_endpoint_replay_summary: {
        max_endpoint_pressure: maxH38IncludedEndpointPressure,
        min_endpoint_pressure: minH38IncludedEndpointPressure,
        preserved_h38_to_h38_included_max_pressure_ratio:
          finitePositive(maxH38IncludedEndpointPressure)
            ? maxEndpointPressure / maxH38IncludedEndpointPressure
            : null,
      },
      active_only_family_replays: activeOnlyFamilyReplays,
      frozen_out_family_replays: frozenOutFamilyReplays,
      active_only_single_h_index_replays: activeOnlySingleHIndexReplays,
      frozen_out_single_h_index_replays: frozenOutSingleHIndexReplays,
      dominant_active_only_family_replay: dominantPressureSummary(
        activeOnlyFamilyReplays
      ),
      dominant_frozen_out_family_replay: dominantReductionSummary(
        frozenOutFamilyReplays
      ),
      dominant_active_only_single_h_index_replay: dominantPressureSummary(
        activeOnlySingleHIndexReplays
      ),
      dominant_frozen_out_single_h_index_replay: dominantReductionSummary(
        frozenOutSingleHIndexReplays
      ),
      cell_midpoint_replay: replayForInputFamily(
        dominantSensitivity,
        "cell-midpoint"
      ),
      h_row_midpoint_replay: replayForInputFamily(
        dominantSensitivity,
        "h-row-midpoint"
      ),
      slope_midpoint_replay: replayForInputFamily(
        dominantSensitivity,
        "slope-midpoint"
      ),
    },
    candidate_certificate_route:
      "The terminal affine-zeta endpoint replay is now followed by same-domain h-row sensitivity on the worst endpoint. If pressure falls only when preserved h38 or wider h-row suffixes are midpointed, the next certificate must transport that producer-image dependency rather than adding raw shifted prefixes.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_terminal_affine_zeta_provider_enclosure: false,
      certifies_post_zeta_pressure_source_isolation: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

function coefficientMidpointProfileFit({ samples, coefficientKey, degree }) {
  const resolvedDegree = assertFinitePositiveInteger("degree", degree);
  const fitPoints = samples.map((sample) => ({
    x: sample.h38_noise_coordinate,
    y: intervalMidpoint(sample[coefficientKey]),
  }));
  const coefficients = fitPolynomialLeastSquares(fitPoints, resolvedDegree);
  const residuals = fitPoints.map((point, index) => {
    const predicted = polynomialValue(coefficients, point.x);
    const residual = point.y - predicted;
    return {
      h38_noise_coordinate: point.x,
      actual_coefficient_midpoint: point.y,
      polynomial_prediction: predicted,
      residual,
      abs_residual: Math.abs(residual),
      source_sample_index: index,
    };
  });
  return {
    polynomial_degree: resolvedDegree,
    coefficients,
    coefficient_order: "ascending powers of h38 residual coordinate u",
    max_abs_midpoint_residual: Math.max(
      ...residuals.map((residual) => residual.abs_residual)
    ),
    residuals,
  };
}

function sourceTermCoefficientInterval(rowPressure, termName) {
  const term = rowPressure?.terms?.find((entry) => entry.term === termName);
  return term?.coefficient ?? [0, 0];
}

function coefficientDependenceTermProfile({ samples, termName }) {
  const termSamples = samples.map((sample) => ({
    ...sample,
    term_coefficient_interval: sourceTermCoefficientInterval(
      sample.row_pressure,
      termName
    ),
  }));
  return {
    term: termName,
    affine_fit: coefficientMidpointProfileFit({
      samples: termSamples,
      coefficientKey: "term_coefficient_interval",
      degree: 1,
    }),
    quadratic_fit: coefficientMidpointProfileFit({
      samples: termSamples,
      coefficientKey: "term_coefficient_interval",
      degree: 2,
    }),
  };
}

function buildH39H38Y44CoefficientReplaySetup({
  targetSpeedInterval,
  branch,
  rootSubdivisions,
  seriesOrder,
  sourceStencilSubcellCount,
  comparisonStencilIndex,
  polynomialDegree,
}) {
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder,
  });
  const rows = targetRowsForSubcellCount({
    targetSpeedInterval,
    subcellCount: sourceStencilSubcellCount,
    rootSubdivisions,
  });
  if (rows.length !== sourceStencilSubcellCount) {
    throw new Error(
      "h38 coefficient dependence diagnostic requires a complete source subcover"
    );
  }
  const comparisonRows = rows.slice(
    comparisonStencilIndex,
    comparisonStencilIndex + 5
  );
  if (comparisonRows.length !== 5) {
    throw new Error(
      "h38 coefficient dependence diagnostic requires a five-row comparison window"
    );
  }
  const analysisRow = comparisonRows[0];
  const analysisBranchRow = branchRowFor(analysisRow, branch);
  const analysisCell = cellFromCertificateRow(analysisRow);
  const noiseCoordinate = speedMidpointXiCoordinate({
    row: analysisRow,
    targetSpeedInterval,
  });
  const polynomialTransportProfilesByBranch =
    hRowPolynomialTransportProfilesByBranch({
      rows: comparisonRows,
      targetSpeedInterval,
      degree: polynomialDegree,
    });
  const transportProfile = polynomialTransportProfilesByBranch[branch];
  const residualProfile = polynomialGraphProducerIntervalResidualProfileForRows({
    targetSpeedInterval,
    rows: comparisonRows,
    branch,
    transportProfile,
  });
  const h38ResidualProfile =
    residualProfile[THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index];
  return {
    context,
    rows,
    comparisonRows,
    analysisRow,
    analysisBranchRow,
    analysisCell,
    noiseCoordinate,
    transportProfile,
    residualProfile,
    h38ResidualProfile,
  };
}

function h39H38Y44CoefficientSampleReplay({
  context,
  analysisCell,
  analysisBranchRow,
  branch,
  transportProfile,
  residualProfile,
  h38ResidualProfile,
  noiseCoordinate,
  outerRadius,
  shiftedIndex,
  h38Noise,
  sampleIndex,
}) {
  const replay =
    shiftedPressureReplayForPolynomialGraphH38ResidualVariantPoint({
      context,
      cell: analysisCell,
      branch,
      transportProfile,
      noise: noiseCoordinate,
      residualProfile,
      h38ResidualInterval: h38ResidualProfile.residual_interval_hull,
      h38Noise,
      solveSlopeInterval: analysisBranchRow.h38_solve_slope_interval,
      outerRadius,
      shiftedIndex,
      variant: `h38-noise-${h38Noise}`,
    });
  const sourceCoefficientInterval = replay.row_pressure.source_coefficient;
  const sourceCoefficientMidpoint = intervalMidpoint(
    sourceCoefficientInterval
  );
  const sourceCoefficientWidth = intervalWidth(sourceCoefficientInterval);
  return {
    sample_index: sampleIndex,
    h38_noise_coordinate: h38Noise,
    h38_value: replay.h38_value,
    center_interval: replay.center_interval,
    center_numeric_interval: replay.center_numeric_interval,
    source_coefficient_interval: sourceCoefficientInterval,
    source_coefficient_midpoint: sourceCoefficientMidpoint,
    source_coefficient_width: sourceCoefficientWidth,
    source_coefficient_abs_upper: intervalAbsUpper(
      sourceCoefficientInterval
    ),
    row_pressure: replay.row_pressure,
    pressure: replay.pressure,
    center_eliminated_row_pressure: replay.center_eliminated_row_pressure,
    center_eliminated_pressure: replay.center_eliminated_pressure,
    center_elimination_improvement_factor:
      replay.center_elimination_improvement_factor,
    center_elimination_interval_warning:
      replay.center_elimination_interval_warning,
  };
}

export function buildH39H38Y44CoefficientDependenceDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  outerRadius = 0.001,
  shiftedIndex = 1,
  seriesOrder = 60,
  sourceStencilSubcellCount = 32,
  comparisonStencilIndex = 27,
  polynomialDegree = 2,
  h38NoiseSamples = [-1, -0.5, 0, 0.5, 1],
  progressCallback = null,
} = {}) {
  const startedAt = Date.now();
  const emitProgress =
    typeof progressCallback === "function"
      ? (progress) =>
          progressCallback({
            diagnostic: "h39-h38-y44-coefficient-dependence",
            elapsed_ms: Date.now() - startedAt,
            ...progress,
          })
      : null;
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedSourceStencilSubcellCount = assertFinitePositiveInteger(
    "sourceStencilSubcellCount",
    sourceStencilSubcellCount
  );
  if (resolvedSourceStencilSubcellCount < 5) {
    throw new Error("sourceStencilSubcellCount must be at least 5");
  }
  const resolvedComparisonStencilIndex = Number(comparisonStencilIndex);
  if (
    !Number.isInteger(resolvedComparisonStencilIndex) ||
    resolvedComparisonStencilIndex < 0
  ) {
    throw new Error("comparisonStencilIndex must be a nonnegative integer");
  }
  const resolvedPolynomialDegree = assertFinitePositiveInteger(
    "polynomialDegree",
    polynomialDegree
  );
  if (resolvedPolynomialDegree > 3) {
    throw new Error("polynomialDegree must be at most 3");
  }
  const resolvedOuterRadius = assertFinitePositiveNumber(
    "outerRadius",
    outerRadius
  );
  const resolvedShiftedIndex = assertFinitePositiveInteger(
    "shiftedIndex",
    shiftedIndex
  );
  const resolvedH38NoiseSamples = h38NoiseSamples.map((sample) => {
    const resolved = Number(sample);
    if (!Number.isFinite(resolved) || resolved < -1 || resolved > 1) {
      throw new Error("h38NoiseSamples must be finite values in [-1,1]");
    }
    return resolved;
  });
  if (resolvedH38NoiseSamples.length < 3) {
    throw new Error("h38NoiseSamples must contain at least three values");
  }
  const resolvedSeriesOrder = assertFinitePositiveInteger(
    "seriesOrder",
    seriesOrder
  );
  const setup = buildH39H38Y44CoefficientReplaySetup({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    branch,
    rootSubdivisions,
    seriesOrder: resolvedSeriesOrder,
    sourceStencilSubcellCount: resolvedSourceStencilSubcellCount,
    comparisonStencilIndex: resolvedComparisonStencilIndex,
    polynomialDegree: resolvedPolynomialDegree,
  });
  const {
    context,
    comparisonRows,
    analysisRow,
    analysisBranchRow,
    analysisCell,
    noiseCoordinate,
    transportProfile,
    residualProfile,
    h38ResidualProfile,
  } = setup;
  emitProgress?.({
    stage: "h38-y44-dependence-source-subcover-start",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
  });
  emitProgress?.({
    stage: "h38-y44-dependence-comparison-window-ready",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    analysis_cell_id: analysisRow.cell_id,
    h38_noise_sample_count: resolvedH38NoiseSamples.length,
  });
  const sampleReplays = resolvedH38NoiseSamples.map(
    (h38Noise, sampleIndex) => {
      emitProgress?.({
        stage: "h38-y44-dependence-sample-start",
        sample_index: sampleIndex,
        h38_noise_coordinate: h38Noise,
        completed_sample_count: sampleIndex,
        sample_count: resolvedH38NoiseSamples.length,
      });
      const sample = h39H38Y44CoefficientSampleReplay({
        context,
        analysisCell,
        analysisBranchRow,
        branch,
        transportProfile,
        residualProfile,
        h38ResidualProfile,
        noiseCoordinate,
        outerRadius: resolvedOuterRadius,
        shiftedIndex: resolvedShiftedIndex,
        h38Noise,
        sampleIndex,
      });
      emitProgress?.({
        stage: "h38-y44-dependence-sample-complete",
        sample_index: sampleIndex,
        h38_noise_coordinate: h38Noise,
        source_coefficient_midpoint: sample.source_coefficient_midpoint,
        source_coefficient_width: sample.source_coefficient_width,
        completed_sample_count: sampleIndex + 1,
        sample_count: resolvedH38NoiseSamples.length,
      });
      return sample;
    }
  );
  const affineFit = coefficientMidpointProfileFit({
    samples: sampleReplays,
    coefficientKey: "source_coefficient_interval",
    degree: 1,
  });
  const quadraticFit = coefficientMidpointProfileFit({
    samples: sampleReplays,
    coefficientKey: "source_coefficient_interval",
    degree: 2,
  });
  const termProfiles = ["delta_squared_speed", "sin_phi", "sin_delta"].map(
    (termName) =>
      coefficientDependenceTermProfile({
        samples: sampleReplays,
        termName,
      })
  );
  const dominantTermProfile = termProfiles.reduce((best, profile) =>
    Number(profile.quadratic_fit.max_abs_midpoint_residual) >
    Number(best?.quadratic_fit?.max_abs_midpoint_residual ?? -1)
      ? profile
      : best
  );
  const affineToQuadraticResidualRatio =
    quadraticFit.max_abs_midpoint_residual > 0
      ? affineFit.max_abs_midpoint_residual /
        quadraticFit.max_abs_midpoint_residual
      : null;
  const affineSlope = Number(affineFit.coefficients[1]);
  const affineZeroCoordinate =
    Math.abs(affineSlope) > 1e-300
      ? -Number(affineFit.coefficients[0]) / affineSlope
      : null;
  const centerSample =
    sampleReplays.find(
      (sample) => Math.abs(Number(sample.h38_noise_coordinate)) < 1e-15
    ) ?? null;
  const maxSamplePressure = Math.max(
    ...sampleReplays.map((sample) => Number(sample.pressure))
  );
  const centerToMaxSamplePressureRatio =
    centerSample && Number(centerSample.pressure) > 0
      ? maxSamplePressure / Number(centerSample.pressure)
      : null;
  const dependenceInterpretation =
    affineToQuadraticResidualRatio !== null &&
    affineToQuadraticResidualRatio >= 10
      ? "h38-y44-coefficient-has-material-quadratic-curvature"
      : "h38-y44-coefficient-is-affine-dominated-on-sampled-source";
  emitProgress?.({
    stage: "h38-y44-dependence-summary-ready",
    affine_max_abs_midpoint_residual: affineFit.max_abs_midpoint_residual,
    quadratic_max_abs_midpoint_residual:
      quadraticFit.max_abs_midpoint_residual,
    dependence_interpretation: dependenceInterpretation,
  });
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_Y44_COEFFICIENT_DEPENDENCE_DIAGNOSTIC_SCHEMA,
    status:
      "h39-h38-y44-coefficient-dependence-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-h39-h38-y44-coefficient-dependence-diagnostic",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    shifted_index: resolvedShiftedIndex,
    y_order:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
      resolvedShiftedIndex,
    outer_radius: resolvedOuterRadius,
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    comparison_row_count: comparisonRows.length,
    analysis_cell_id: analysisRow.cell_id,
    analysis_speed_interval: analysisRow.speed_interval,
    analysis_xi_coordinate: noiseCoordinate,
    polynomial_degree: resolvedPolynomialDegree,
    h38_residual_interval:
      h38ResidualProfile.residual_interval_hull,
    h38_residual_abs_upper: h38ResidualProfile.max_abs_residual,
    h38_noise_samples: resolvedH38NoiseSamples,
    sample_replays: sampleReplays,
    source_coefficient_affine_fit: affineFit,
    source_coefficient_quadratic_fit: quadraticFit,
    affine_to_quadratic_residual_ratio: affineToQuadraticResidualRatio,
    affine_zero_coordinate: affineZeroCoordinate,
    center_sample_replay: centerSample,
    max_sample_pressure: maxSamplePressure,
    center_to_max_sample_pressure_ratio: centerToMaxSamplePressureRatio,
    term_coefficient_dependence_profiles: termProfiles,
    dominant_quadratic_residual_term_profile: dominantTermProfile,
    dependence_interpretation: dependenceInterpretation,
    candidate_certificate_route:
      dependenceInterpretation ===
      "h38-y44-coefficient-has-material-quadratic-curvature"
        ? "Replace the h38 residual endpoint check with a directed-rounded quadratic h38 residual-coordinate enclosure, or derive the quadratic source-level cancellation before Cauchy bounding."
        : "Attempt an affine h38 residual-coordinate source identity for shifted y44, preserving the signed coefficient rather than absolute pressure before applying Cauchy bounds.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_h38_y44_coefficient_dependence: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

function h39H38Y44TermCovarianceRows({
  termProfiles,
  sourceZeroCoordinate,
  sourceZeroReplay,
}) {
  const sourceZeroTerms = new Map(
    (sourceZeroReplay?.row_pressure?.terms ?? []).map((term) => [
      term.term,
      term,
    ])
  );
  const rows = termProfiles.map((profile) => {
    const affineCoefficients = profile.affine_fit.coefficients;
    const quadraticCoefficients = profile.quadratic_fit.coefficients;
    const affineValueAtZero = Number.isFinite(Number(sourceZeroCoordinate))
      ? polynomialValue(affineCoefficients, sourceZeroCoordinate)
      : null;
    const quadraticValueAtZero = Number.isFinite(Number(sourceZeroCoordinate))
      ? polynomialValue(quadraticCoefficients, sourceZeroCoordinate)
      : null;
    const replayTerm = sourceZeroTerms.get(profile.term);
    const replayInterval = replayTerm?.coefficient ?? [0, 0];
    const replayMidpoint = intervalMidpoint(replayInterval);
    return {
      term: profile.term,
      affine_intercept: affineCoefficients[0],
      affine_slope: affineCoefficients[1],
      affine_value_at_source_zero: affineValueAtZero,
      quadratic_value_at_source_zero: quadraticValueAtZero,
      source_zero_replay_coefficient_interval: replayInterval,
      source_zero_replay_coefficient_midpoint: replayMidpoint,
      source_zero_replay_coefficient_abs_upper:
        intervalAbsUpper(replayInterval),
      source_zero_replay_pressure_contribution:
        replayTerm?.pressure_contribution ?? 0,
      affine_to_quadratic_value_gap_at_source_zero:
        affineValueAtZero !== null && quadraticValueAtZero !== null
          ? Math.abs(affineValueAtZero - quadraticValueAtZero)
          : null,
      affine_fit_max_abs_midpoint_residual:
        profile.affine_fit.max_abs_midpoint_residual,
      quadratic_fit_max_abs_midpoint_residual:
        profile.quadratic_fit.max_abs_midpoint_residual,
    };
  });
  const slopeAbsSum = rows.reduce(
    (sum, row) => sum + Math.abs(Number(row.affine_slope)),
    0
  );
  const sourceZeroAbsMidpointSum = rows.reduce(
    (sum, row) =>
      sum + Math.abs(Number(row.source_zero_replay_coefficient_midpoint)),
    0
  );
  return rows.map((row) => ({
    ...row,
    affine_slope_abs_share:
      slopeAbsSum > 0 ? Math.abs(Number(row.affine_slope)) / slopeAbsSum : null,
    source_zero_abs_midpoint_share:
      sourceZeroAbsMidpointSum > 0
        ? Math.abs(Number(row.source_zero_replay_coefficient_midpoint)) /
          sourceZeroAbsMidpointSum
        : null,
  }));
}

function h39H38Y44TermPairCancellationRows(termRows) {
  const pairs = [];
  for (let leftIndex = 0; leftIndex < termRows.length; leftIndex += 1) {
    for (
      let rightIndex = leftIndex + 1;
      rightIndex < termRows.length;
      rightIndex += 1
    ) {
      const left = termRows[leftIndex];
      const right = termRows[rightIndex];
      const leftMidpoint = Number(
        left.source_zero_replay_coefficient_midpoint
      );
      const rightMidpoint = Number(
        right.source_zero_replay_coefficient_midpoint
      );
      const pairMidpoint = leftMidpoint + rightMidpoint;
      const pairAbsMidpointSum =
        Math.abs(leftMidpoint) + Math.abs(rightMidpoint);
      pairs.push({
        terms: [left.term, right.term],
        signed_pair_midpoint: pairMidpoint,
        abs_pair_midpoint_sum: pairAbsMidpointSum,
        cancellation_fraction:
          pairAbsMidpointSum > 0
            ? 1 - Math.abs(pairMidpoint) / pairAbsMidpointSum
            : null,
      });
    }
  }
  return pairs;
}

function h39H38Y44SourceCovarianceCollarRows({
  setup,
  branch,
  sourceAffineZeroCoordinate,
  collarHalfWidths,
  referencePressureTargets,
  outerRadius,
  shiftedIndex,
}) {
  return collarHalfWidths.map((halfWidth, collarIndex) => {
    const replayEnvelope = h39H38Y44ZeroCenteredIntervalReplay({
      setup,
      branch,
      affineZeroCoordinate: sourceAffineZeroCoordinate,
      halfWidth,
      outerRadius,
      shiftedIndex,
      variant: `source-covariance-collar-${collarIndex}`,
    });
    const replay = replayEnvelope.replay;
    const sourcePressure = Number(replay.pressure);
    const termTrianglePressure = Number(replay.row_pressure.term_pressure_sum);
    const sourceToTriangleRatio =
      finitePositive(termTrianglePressure)
        ? sourcePressure / termTrianglePressure
        : null;
    const triangleToSourceGain =
      finitePositive(sourcePressure)
        ? termTrianglePressure / sourcePressure
        : null;
    return {
      collar_index: collarIndex,
      half_width: halfWidth,
      h38_noise_interval: replayEnvelope.h38_noise_interval,
      clipped_h38_noise_interval:
        replayEnvelope.clipped_h38_noise_interval,
      h38_residual_half_width: replayEnvelope.h38_residual_half_width,
      source_coefficient_interval: replay.row_pressure.source_coefficient,
      source_coefficient_abs_upper:
        intervalAbsUpper(replay.row_pressure.source_coefficient),
      source_pressure: sourcePressure,
      term_triangle_pressure: termTrianglePressure,
      source_to_term_triangle_pressure_ratio: sourceToTriangleRatio,
      term_triangle_to_source_pressure_gain: triangleToSourceGain,
      dominant_term: replay.row_pressure.dominant_term,
      term_pressure_rows: replay.row_pressure.terms,
      reference_pressure_results: referencePressureTargets.map(
        (targetPressure) => ({
          target_pressure: targetPressure,
          source_over_target:
            finitePositive(targetPressure)
              ? sourcePressure / targetPressure
              : null,
          term_triangle_over_target:
            finitePositive(targetPressure)
              ? termTrianglePressure / targetPressure
              : null,
          signed_source_meets_target:
            finitePositive(targetPressure) && sourcePressure <= targetPressure,
          term_triangle_meets_target:
            finitePositive(targetPressure) &&
            termTrianglePressure <= targetPressure,
        })
      ),
    };
  });
}

function h39H38Y44SourceCovarianceProducerCenteredCollarRows({
  setup,
  branch,
  coordinateProfile,
  collarHalfWidths,
  referencePressureTargets,
  outerRadius,
  shiftedIndex,
}) {
  return collarHalfWidths.map((halfWidth, collarIndex) => {
    const replayEnvelope = h39H38Y44ProducerCenteredIntervalReplay({
      setup,
      branch,
      coordinateProfile,
      halfWidth,
      outerRadius,
      shiftedIndex,
      variant: `source-covariance-producer-centered-collar-${collarIndex}`,
    });
    const replay = replayEnvelope.replay;
    const sourcePressure = Number(replay.pressure);
    const termTrianglePressure = Number(replay.row_pressure.term_pressure_sum);
    const sourceToTriangleRatio =
      finitePositive(termTrianglePressure)
        ? sourcePressure / termTrianglePressure
        : null;
    const triangleToSourceGain =
      finitePositive(sourcePressure)
        ? termTrianglePressure / sourcePressure
        : null;
    return {
      collar_index: collarIndex,
      half_width: halfWidth,
      producer_midpoint_coordinate_hull:
        replayEnvelope.producer_midpoint_coordinate_hull,
      h38_noise_interval: replayEnvelope.h38_noise_interval,
      clipped_h38_noise_interval:
        replayEnvelope.clipped_h38_noise_interval,
      h38_residual_half_width: replayEnvelope.h38_residual_half_width,
      source_coefficient_interval: replay.row_pressure.source_coefficient,
      source_coefficient_abs_upper:
        intervalAbsUpper(replay.row_pressure.source_coefficient),
      source_pressure: sourcePressure,
      term_triangle_pressure: termTrianglePressure,
      source_to_term_triangle_pressure_ratio: sourceToTriangleRatio,
      term_triangle_to_source_pressure_gain: triangleToSourceGain,
      dominant_term: replay.row_pressure.dominant_term,
      term_pressure_rows: replay.row_pressure.terms,
      reference_pressure_results: referencePressureTargets.map(
        (targetPressure) => ({
          target_pressure: targetPressure,
          source_over_target:
            finitePositive(targetPressure)
              ? sourcePressure / targetPressure
              : null,
          term_triangle_over_target:
            finitePositive(targetPressure)
              ? termTrianglePressure / targetPressure
              : null,
          signed_source_meets_target:
            finitePositive(targetPressure) && sourcePressure <= targetPressure,
          term_triangle_meets_target:
            finitePositive(targetPressure) &&
            termTrianglePressure <= targetPressure,
        })
      ),
    };
  });
}

function h39H38Y44SourceCovarianceReferenceCollarSummary({
  referencePressureTargets,
  collarRows,
}) {
  return referencePressureTargets.map((targetPressure) => {
    const rowsForTarget = collarRows.map((row) => {
      const targetResult = row.reference_pressure_results.find(
        (entry) => entry.target_pressure === targetPressure
      );
      return {
        row,
        targetResult,
      };
    });
    const signedRows = rowsForTarget.filter(
      ({ targetResult }) => targetResult?.signed_source_meets_target === true
    );
    const triangleRows = rowsForTarget.filter(
      ({ targetResult }) => targetResult?.term_triangle_meets_target === true
    );
    const bestSigned =
      signedRows.length > 0
        ? signedRows.reduce((best, current) =>
            Number(current.row.half_width) > Number(best.row.half_width)
              ? current
              : best
          )
        : null;
    const bestTriangle =
      triangleRows.length > 0
        ? triangleRows.reduce((best, current) =>
            Number(current.row.half_width) > Number(best.row.half_width)
              ? current
              : best
          )
        : null;
    const worstSourceOverTarget = Math.max(
      ...rowsForTarget
        .map(({ targetResult }) => Number(targetResult?.source_over_target))
        .filter((value) => Number.isFinite(value))
    );
    const worstTriangleOverTarget = Math.max(
      ...rowsForTarget
        .map(({ targetResult }) =>
          Number(targetResult?.term_triangle_over_target)
        )
        .filter((value) => Number.isFinite(value))
    );
    return {
      target_pressure: targetPressure,
      max_signed_source_half_width_meeting_target:
        bestSigned?.row.half_width ?? null,
      max_term_triangle_half_width_meeting_target:
        bestTriangle?.row.half_width ?? null,
      signed_source_collar_count: signedRows.length,
      term_triangle_collar_count: triangleRows.length,
      worst_source_over_target:
        Number.isFinite(worstSourceOverTarget)
          ? worstSourceOverTarget
          : null,
      worst_term_triangle_over_target:
        Number.isFinite(worstTriangleOverTarget)
          ? worstTriangleOverTarget
          : null,
      signed_source_beats_triangle_at_some_collar:
        signedRows.length > triangleRows.length ||
        (bestSigned !== null &&
          bestTriangle !== null &&
          Number(bestSigned.row.half_width) >
            Number(bestTriangle.row.half_width)),
    };
  });
}

function h39H38Y44SourceCovarianceProducerImageRows({
  coordinateProfile,
  collarRows,
}) {
  return collarRows.map((row) => {
    const targetFit = h39H38Y44ProducerCoordinateTargetFit({
      label: `source-covariance-collar-${row.collar_index}`,
      coordinateProfile,
      targetInterval: row.clipped_h38_noise_interval,
    });
    return {
      collar_index: row.collar_index,
      half_width: row.half_width,
      source_pressure: row.source_pressure,
      term_triangle_pressure: row.term_triangle_pressure,
      target_residual_coordinate_interval:
        targetFit.target_residual_coordinate_interval,
      target_residual_coordinate_width:
        targetFit.target_residual_coordinate_width,
      producer_residual_coordinate_interval_hull:
        targetFit.producer_residual_coordinate_interval_hull,
      producer_residual_coordinate_midpoint_hull:
        targetFit.producer_residual_coordinate_midpoint_hull,
      target_center_offset_from_producer_midpoint_hull_center:
        targetFit.target_center_offset_from_producer_midpoint_hull_center,
      target_covers_producer_interval_hull:
        targetFit.target_covers_producer_interval_hull,
      target_covers_producer_midpoint_hull:
        targetFit.target_covers_producer_midpoint_hull,
      interval_inside_target_row_count:
        targetFit.interval_inside_target_row_count,
      midpoint_inside_target_row_count:
        targetFit.midpoint_inside_target_row_count,
      required_interval_hull_shrink_factor:
        targetFit.required_interval_hull_shrink_factor,
      required_midpoint_hull_shrink_factor:
        targetFit.required_midpoint_hull_shrink_factor,
      target_width_to_producer_interval_hull_width:
        targetFit.target_width_to_producer_interval_hull_width,
      target_width_to_producer_midpoint_hull_width:
        targetFit.target_width_to_producer_midpoint_hull_width,
      producer_coordinate_target_fit: targetFit,
    };
  });
}

function h39H38Y44SourceCovarianceReferenceProducerImageSummary({
  referencePressureTargets,
  collarRows,
  producerImageRows,
}) {
  return referencePressureTargets.map((targetPressure) => {
    const signedRows = collarRows.filter((row) =>
      row.reference_pressure_results.some(
        (entry) =>
          entry.target_pressure === targetPressure &&
          entry.signed_source_meets_target === true
      )
    );
    const bestSigned =
      signedRows.length > 0
        ? signedRows.reduce((best, current) =>
            Number(current.half_width) > Number(best.half_width)
              ? current
              : best
          )
        : null;
    const producerFit =
      bestSigned !== null
        ? producerImageRows.find(
            (row) => row.collar_index === bestSigned.collar_index
          ) ?? null
        : null;
    const bestTargetResult =
      bestSigned?.reference_pressure_results.find(
        (entry) => entry.target_pressure === targetPressure
      ) ?? null;
    return {
      target_pressure: targetPressure,
      best_signed_collar_index: bestSigned?.collar_index ?? null,
      best_signed_collar_half_width: bestSigned?.half_width ?? null,
      best_signed_collar_source_over_target:
        bestTargetResult?.source_over_target ?? null,
      best_signed_collar_term_triangle_over_target:
        bestTargetResult?.term_triangle_over_target ?? null,
      producer_midpoint_hull_inside_best_signed_collar:
        producerFit?.target_covers_producer_midpoint_hull ?? false,
      producer_interval_hull_inside_best_signed_collar:
        producerFit?.target_covers_producer_interval_hull ?? false,
      producer_midpoint_inside_target_row_count:
        producerFit?.midpoint_inside_target_row_count ?? 0,
      producer_interval_inside_target_row_count:
        producerFit?.interval_inside_target_row_count ?? 0,
      required_interval_hull_shrink_factor:
        producerFit?.required_interval_hull_shrink_factor ?? null,
      required_midpoint_hull_shrink_factor:
        producerFit?.required_midpoint_hull_shrink_factor ?? null,
      target_center_offset_from_producer_midpoint_hull_center:
        producerFit?.target_center_offset_from_producer_midpoint_hull_center ??
        null,
      producer_image_collar_row: producerFit,
      route_interpretation:
        producerFit === null
          ? "no-signed-source-collar-meets-reference-target"
          : producerFit.target_covers_producer_midpoint_hull
            ? producerFit.target_covers_producer_interval_hull
              ? "signed-source-collar-covers-producer-interval-hull"
              : "signed-source-collar-covers-producer-midpoint-hull-only"
            : "signed-source-collar-misses-producer-midpoint-hull",
    };
  });
}

function h39H38Y44SourceCovarianceProducerImageRouteDiagnosis(summaryRows) {
  if (
    summaryRows.some(
      (row) => row.producer_interval_hull_inside_best_signed_collar
    )
  ) {
    return "zero-centered-source-collar-covers-producer-interval-hull";
  }
  if (
    summaryRows.some(
      (row) => row.producer_midpoint_hull_inside_best_signed_collar
    )
  ) {
    return "zero-centered-source-collar-covers-producer-midpoint-hull-only";
  }
  if (summaryRows.some((row) => row.best_signed_collar_index !== null)) {
    return "zero-centered-source-collar-misses-producer-midpoint-hull";
  }
  return "no-reference-target-closed-by-zero-centered-source-collar";
}

function h39H38Y44SourceCovarianceProducerCenteredRouteDiagnosis(
  summaryRows
) {
  const closingRows = summaryRows.filter(
    (row) => row.max_signed_source_half_width_meeting_target !== null
  );
  if (
    closingRows.some(
      (row) => Number(row.max_signed_source_half_width_meeting_target) > 0
    )
  ) {
    return "producer-centered-source-collar-closes-reference-target";
  }
  if (closingRows.length > 0) {
    return "producer-midpoint-hull-closes-reference-target";
  }
  return "producer-centered-source-collar-exceeds-reference-target";
}

export function buildH39H38Y44SourceCovarianceDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  outerRadius = 0.001,
  shiftedIndex = 1,
  seriesOrder = 60,
  sourceStencilSubcellCount = 32,
  comparisonStencilIndex = 27,
  analysisRowOffset = 1,
  polynomialDegree = 2,
  h38NoiseSamples = [-1, 0, 1],
  collarHalfWidths = [0, 1e-9, 2e-9, 5e-9, 1e-8],
  referencePressureTargets = [1e8, 1e10, 1e13],
  progressCallback = null,
} = {}) {
  const startedAt = Date.now();
  const emitProgress =
    typeof progressCallback === "function"
      ? (progress) =>
          progressCallback({
            diagnostic: "h39-h38-y44-source-covariance",
            elapsed_ms: Date.now() - startedAt,
            ...progress,
          })
      : null;
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedSourceStencilSubcellCount = assertFinitePositiveInteger(
    "sourceStencilSubcellCount",
    sourceStencilSubcellCount
  );
  if (resolvedSourceStencilSubcellCount < 5) {
    throw new Error("sourceStencilSubcellCount must be at least 5");
  }
  const resolvedComparisonStencilIndex = Number(comparisonStencilIndex);
  if (
    !Number.isInteger(resolvedComparisonStencilIndex) ||
    resolvedComparisonStencilIndex < 0 ||
    resolvedComparisonStencilIndex > resolvedSourceStencilSubcellCount - 5
  ) {
    throw new Error("comparisonStencilIndex must leave five stencil samples");
  }
  const resolvedAnalysisRowOffset = Number(analysisRowOffset);
  if (
    !Number.isInteger(resolvedAnalysisRowOffset) ||
    resolvedAnalysisRowOffset < 0 ||
    resolvedAnalysisRowOffset > 4
  ) {
    throw new Error("analysisRowOffset must select one row from the five-row comparison window");
  }
  const resolvedPolynomialDegree = assertFinitePositiveInteger(
    "polynomialDegree",
    polynomialDegree
  );
  if (resolvedPolynomialDegree > 3) {
    throw new Error("polynomialDegree must be at most 3");
  }
  const resolvedOuterRadius = assertFinitePositiveNumber(
    "outerRadius",
    outerRadius
  );
  const resolvedShiftedIndex = assertFinitePositiveInteger(
    "shiftedIndex",
    shiftedIndex
  );
  const resolvedSeriesOrder = assertFinitePositiveInteger(
    "seriesOrder",
    seriesOrder
  );
  const resolvedH38NoiseSamples = h38NoiseSamples.map((sample) => {
    const resolved = Number(sample);
    if (!Number.isFinite(resolved) || resolved < -1 || resolved > 1) {
      throw new Error("h38NoiseSamples must be finite values in [-1,1]");
    }
    return resolved;
  });
  if (resolvedH38NoiseSamples.length < 3) {
    throw new Error("h38NoiseSamples must contain at least three values");
  }
  const resolvedCollarHalfWidths = collarHalfWidths.map((halfWidth) => {
    const resolved = Number(halfWidth);
    if (!Number.isFinite(resolved) || resolved < 0) {
      throw new Error("collarHalfWidths must contain finite nonnegative values");
    }
    return resolved;
  });
  if (resolvedCollarHalfWidths.length === 0) {
    throw new Error("collarHalfWidths must contain at least one value");
  }
  const resolvedReferencePressureTargets = referencePressureTargets.map(
    (target) => assertFinitePositiveNumber("referencePressureTargets", target)
  );
  emitProgress?.({
    stage: "source-covariance-setup-start",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    analysis_row_offset: resolvedAnalysisRowOffset,
  });
  const setup = buildH39H38Y44CoefficientReplaySetup({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    branch,
    rootSubdivisions,
    seriesOrder: resolvedSeriesOrder,
    sourceStencilSubcellCount: resolvedSourceStencilSubcellCount,
    comparisonStencilIndex: resolvedComparisonStencilIndex,
    polynomialDegree: resolvedPolynomialDegree,
  });
  const analysisRow = setup.comparisonRows[resolvedAnalysisRowOffset];
  const analysisBranchRow = branchRowFor(analysisRow, branch);
  const analysisCell = cellFromCertificateRow(analysisRow);
  const noiseCoordinate = speedMidpointXiCoordinate({
    row: analysisRow,
    targetSpeedInterval: resolvedTargetSpeedInterval,
  });
  emitProgress?.({
    stage: "source-covariance-analysis-row-ready",
    cell_id: analysisRow.cell_id,
    speed_interval: analysisRow.speed_interval,
    xi_coordinate: noiseCoordinate,
  });
  const sampleReplays = resolvedH38NoiseSamples.map(
    (h38Noise, sampleIndex) => {
      emitProgress?.({
        stage: "source-covariance-sample-start",
        sample_index: sampleIndex,
        h38_noise_coordinate: h38Noise,
      });
      const sample = h39H38Y44CoefficientSampleReplay({
        context: setup.context,
        analysisCell,
        analysisBranchRow,
        branch,
        transportProfile: setup.transportProfile,
        residualProfile: setup.residualProfile,
        h38ResidualProfile: setup.h38ResidualProfile,
        noiseCoordinate,
        outerRadius: resolvedOuterRadius,
        shiftedIndex: resolvedShiftedIndex,
        h38Noise,
        sampleIndex,
      });
      emitProgress?.({
        stage: "source-covariance-sample-complete",
        sample_index: sampleIndex,
        h38_noise_coordinate: h38Noise,
        source_coefficient_midpoint: sample.source_coefficient_midpoint,
      });
      return sample;
    }
  );
  const sourceAffineFit = coefficientMidpointProfileFit({
    samples: sampleReplays,
    coefficientKey: "source_coefficient_interval",
    degree: 1,
  });
  const sourceQuadraticFit = coefficientMidpointProfileFit({
    samples: sampleReplays,
    coefficientKey: "source_coefficient_interval",
    degree: 2,
  });
  const sourceAffineSlope = Number(sourceAffineFit.coefficients[1]);
  const sourceAffineZeroCoordinate =
    Math.abs(sourceAffineSlope) > 1e-300
      ? -Number(sourceAffineFit.coefficients[0]) / sourceAffineSlope
      : null;
  const termProfiles = ["delta_squared_speed", "sin_phi", "sin_delta"].map(
    (termName) =>
      coefficientDependenceTermProfile({
        samples: sampleReplays,
        termName,
      })
  );
  const sourceZeroReplay = Number.isFinite(Number(sourceAffineZeroCoordinate))
    ? h39H38Y44CoefficientSampleReplay({
        context: setup.context,
        analysisCell,
        analysisBranchRow,
        branch,
        transportProfile: setup.transportProfile,
        residualProfile: setup.residualProfile,
        h38ResidualProfile: setup.h38ResidualProfile,
        noiseCoordinate,
        outerRadius: resolvedOuterRadius,
        shiftedIndex: resolvedShiftedIndex,
        h38Noise: sourceAffineZeroCoordinate,
        sampleIndex: -1,
      })
    : null;
  const termRows = h39H38Y44TermCovarianceRows({
    termProfiles,
    sourceZeroCoordinate: sourceAffineZeroCoordinate,
    sourceZeroReplay,
  });
  const pairRows = h39H38Y44TermPairCancellationRows(termRows);
  const h38ProducerResidualCoordinateProfile =
    h39H38Y44ProducerResidualCoordinateProfile({
      targetSpeedInterval: resolvedTargetSpeedInterval,
      rows: setup.comparisonRows,
      branch,
      transportProfile: setup.transportProfile,
      residualInterval: setup.h38ResidualProfile.residual_interval_hull,
    });
  const collarRows =
    Number.isFinite(Number(sourceAffineZeroCoordinate))
      ? h39H38Y44SourceCovarianceCollarRows({
          setup,
          branch,
          sourceAffineZeroCoordinate,
          collarHalfWidths: resolvedCollarHalfWidths,
          referencePressureTargets: resolvedReferencePressureTargets,
          outerRadius: resolvedOuterRadius,
          shiftedIndex: resolvedShiftedIndex,
        })
      : [];
  const referenceCollarSummary =
    h39H38Y44SourceCovarianceReferenceCollarSummary({
      referencePressureTargets: resolvedReferencePressureTargets,
      collarRows,
    });
  const producerImageCollarRows =
    h39H38Y44SourceCovarianceProducerImageRows({
      coordinateProfile: h38ProducerResidualCoordinateProfile,
      collarRows,
    });
  const referenceProducerImageSummary =
    h39H38Y44SourceCovarianceReferenceProducerImageSummary({
      referencePressureTargets: resolvedReferencePressureTargets,
      collarRows,
      producerImageRows: producerImageCollarRows,
    });
  const producerImageRouteDiagnosis =
    h39H38Y44SourceCovarianceProducerImageRouteDiagnosis(
      referenceProducerImageSummary
    );
  const producerCenteredCollarRows =
    h39H38Y44SourceCovarianceProducerCenteredCollarRows({
      setup,
      branch,
      coordinateProfile: h38ProducerResidualCoordinateProfile,
      collarHalfWidths: resolvedCollarHalfWidths,
      referencePressureTargets: resolvedReferencePressureTargets,
      outerRadius: resolvedOuterRadius,
      shiftedIndex: resolvedShiftedIndex,
    });
  const referenceProducerCenteredSummary =
    h39H38Y44SourceCovarianceReferenceCollarSummary({
      referencePressureTargets: resolvedReferencePressureTargets,
      collarRows: producerCenteredCollarRows,
    });
  const producerCenteredRouteDiagnosis =
    h39H38Y44SourceCovarianceProducerCenteredRouteDiagnosis(
      referenceProducerCenteredSummary
    );
  const maxCollarTriangleGain =
    collarRows.length > 0
      ? Math.max(
          ...collarRows
            .map((row) => Number(row.term_triangle_to_source_pressure_gain))
            .filter((value) => Number.isFinite(value) && value > 0)
        )
      : null;
  const sourceZeroTermMidpointSum = termRows.reduce(
    (sum, row) => sum + Number(row.source_zero_replay_coefficient_midpoint),
    0
  );
  const sourceZeroTermAbsMidpointSum = termRows.reduce(
    (sum, row) =>
      sum + Math.abs(Number(row.source_zero_replay_coefficient_midpoint)),
    0
  );
  const sourceZeroCoefficientMidpoint = Number(
    sourceZeroReplay?.source_coefficient_midpoint ?? 0
  );
  const sourceZeroCancellationRatio =
    finitePositive(sourceZeroTermAbsMidpointSum)
      ? Math.abs(sourceZeroCoefficientMidpoint) /
        sourceZeroTermAbsMidpointSum
      : null;
  const sourceZeroTermSumRelativeGap =
    finitePositive(sourceZeroTermAbsMidpointSum)
      ? Math.abs(sourceZeroTermMidpointSum - sourceZeroCoefficientMidpoint) /
        sourceZeroTermAbsMidpointSum
      : null;
  const dominantZeroTerm = termRows.reduce((best, row) =>
    Math.abs(Number(row.source_zero_replay_coefficient_midpoint)) >
    Math.abs(Number(best?.source_zero_replay_coefficient_midpoint ?? 0))
      ? row
      : best,
  null);
  const dominantSlopeTerm = termRows.reduce((best, row) =>
    Math.abs(Number(row.affine_slope)) >
    Math.abs(Number(best?.affine_slope ?? 0))
      ? row
      : best,
  null);
  const strongestPairCancellation = pairRows.reduce((best, row) =>
    Number(row.cancellation_fraction ?? -1) >
    Number(best?.cancellation_fraction ?? -1)
      ? row
      : best,
  null);
  const sourceAffineToQuadraticResidualRatio =
    sourceQuadraticFit.max_abs_midpoint_residual > 0
      ? sourceAffineFit.max_abs_midpoint_residual /
        sourceQuadraticFit.max_abs_midpoint_residual
      : null;
  const covarianceDiagnosis =
    sourceZeroCancellationRatio !== null &&
    sourceZeroCancellationRatio < 1e-6
      ? "source-affine-zero-preserves-strong-term-cancellation"
      : strongestPairCancellation?.cancellation_fraction > 0.5
        ? "source-affine-zero-dominated-by-pairwise-term-cancellation"
        : "source-affine-zero-needs-higher-order-covariance-proof";
  emitProgress?.({
    stage: "source-covariance-summary-ready",
    cell_id: analysisRow.cell_id,
    source_affine_zero_coordinate: sourceAffineZeroCoordinate,
    source_zero_cancellation_ratio: sourceZeroCancellationRatio,
    covariance_diagnosis: covarianceDiagnosis,
  });
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_Y44_SOURCE_COVARIANCE_DIAGNOSTIC_SCHEMA,
    status: "h39-h38-y44-source-covariance-diagnostic-candidate-emitted",
    evaluation_level: "candidate-h39-h38-y44-source-covariance-diagnostic",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    shifted_index: resolvedShiftedIndex,
    y_order:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
      resolvedShiftedIndex,
    outer_radius: resolvedOuterRadius,
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    comparison_row_count: setup.comparisonRows.length,
    analysis_row_offset: resolvedAnalysisRowOffset,
    analysis_cell_id: analysisRow.cell_id,
    analysis_speed_interval: analysisRow.speed_interval,
    analysis_xi_coordinate: noiseCoordinate,
    polynomial_degree: resolvedPolynomialDegree,
    h38_residual_interval:
      setup.h38ResidualProfile.residual_interval_hull,
    h38_residual_abs_upper: setup.h38ResidualProfile.max_abs_residual,
    h38_noise_samples: resolvedH38NoiseSamples,
    collar_half_widths: resolvedCollarHalfWidths,
    reference_pressure_targets: resolvedReferencePressureTargets,
    sample_replays: sampleReplays,
    source_coefficient_affine_fit: sourceAffineFit,
    source_coefficient_quadratic_fit: sourceQuadraticFit,
    source_affine_to_quadratic_residual_ratio:
      sourceAffineToQuadraticResidualRatio,
    source_affine_zero_coordinate: sourceAffineZeroCoordinate,
    source_affine_zero_inside_sample_domain:
      sourceAffineZeroCoordinate !== null &&
      sourceAffineZeroCoordinate >= -1 &&
      sourceAffineZeroCoordinate <= 1,
    source_affine_zero_replay: sourceZeroReplay,
    source_zero_coefficient_midpoint: sourceZeroCoefficientMidpoint,
    source_zero_term_midpoint_sum: sourceZeroTermMidpointSum,
    source_zero_term_abs_midpoint_sum: sourceZeroTermAbsMidpointSum,
    source_zero_cancellation_ratio: sourceZeroCancellationRatio,
    source_zero_term_sum_relative_gap: sourceZeroTermSumRelativeGap,
    term_coefficient_dependence_profiles: termProfiles,
    term_covariance_rows: termRows,
    term_pair_cancellation_rows: pairRows,
    h38_producer_residual_coordinate_profile:
      h38ProducerResidualCoordinateProfile,
    source_covariance_collar_rows: collarRows,
    source_covariance_reference_collar_summary:
      referenceCollarSummary,
    source_covariance_producer_image_collar_rows:
      producerImageCollarRows,
    source_covariance_reference_producer_image_summary:
      referenceProducerImageSummary,
    source_covariance_producer_image_route_diagnosis:
      producerImageRouteDiagnosis,
    source_covariance_producer_centered_collar_rows:
      producerCenteredCollarRows,
    source_covariance_reference_producer_centered_summary:
      referenceProducerCenteredSummary,
    source_covariance_producer_centered_route_diagnosis:
      producerCenteredRouteDiagnosis,
    max_source_covariance_term_triangle_gain:
      Number.isFinite(maxCollarTriangleGain)
        ? maxCollarTriangleGain
        : null,
    dominant_source_zero_term: dominantZeroTerm,
    dominant_affine_slope_term: dominantSlopeTerm,
    strongest_pair_cancellation: strongestPairCancellation,
    source_covariance_diagnosis: covarianceDiagnosis,
    candidate_certificate_route:
      producerCenteredRouteDiagnosis ===
      "producer-centered-source-collar-closes-reference-target"
        ? "Promote the next proof attempt to a directed-rounded producer-centered source-covariance certificate: keep the H38 producer midpoint hull and residual-coordinate collar signed through the H39 source replay, then attach the shifted outer bound only after source-level cancellation."
        : producerCenteredRouteDiagnosis ===
            "producer-midpoint-hull-closes-reference-target"
          ? "The H38 producer midpoint hull is source-covariance compatible, but no positive residual-coordinate collar closes on the current reference targets. Tighten the directed-rounded producer image or derive a local source identity before widening the collar."
          : producerImageRouteDiagnosis ===
              "zero-centered-source-collar-misses-producer-midpoint-hull"
            ? "Do not force the source-affine-zero collar onto the actual H38 producer image. Search for the missing source-level identity that transports cancellation from the affine-zero coordinate to the H38 producer midpoint hull."
            : covarianceDiagnosis ===
                "source-affine-zero-preserves-strong-term-cancellation"
              ? "Promote the next proof attempt to a directed-rounded source-level affine-zero certificate that keeps the three nonconstant source terms signed until after their cancellation is evaluated."
              : covarianceDiagnosis ===
                  "source-affine-zero-dominated-by-pairwise-term-cancellation"
                ? "Search for a two-term normal form for the dominant signed pair before applying absolute Cauchy bounds."
                : "Add a higher-order covariance coordinate or source-level identity; independent source-term width control is not expected to close the y44 collar.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_h38_y44_source_covariance: false,
      certifies_h38_y44_source_covariance_collar: false,
      certifies_h38_y44_source_covariance_producer_image_collar: false,
      certifies_h38_y44_source_covariance_producer_centered_collar: false,
      certifies_source_level_affine_zero: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

function h39H38Y44AffineTargetEnvelopeEntry({
  label,
  targetPressure,
  outerRadius,
  shiftedIndex,
  affineZeroCoordinate,
  affineSlopeAbs,
  midpointLinearityGapAbsUpper,
  zeroReplayCoefficientHalfWidth,
  h38ResidualAbsUpper,
}) {
  const resolvedTargetPressure = assertFinitePositiveNumber(
    "targetPressure",
    targetPressure
  );
  const coefficientAbsTarget =
    resolvedTargetPressure / outerRadius ** shiftedIndex;
  const idealAffineHalfWidth =
    coefficientAbsTarget / affineSlopeAbs;
  const midpointResidualAwareBudget = Math.max(
    0,
    coefficientAbsTarget - midpointLinearityGapAbsUpper
  );
  const midpointResidualAwareHalfWidth =
    midpointResidualAwareBudget / affineSlopeAbs;
  const candidateMarginAbsUpper =
    midpointLinearityGapAbsUpper + zeroReplayCoefficientHalfWidth;
  const candidateMarginAwareBudget = Math.max(
    0,
    coefficientAbsTarget - candidateMarginAbsUpper
  );
  const candidateMarginAwareHalfWidth =
    candidateMarginAwareBudget / affineSlopeAbs;
  const zeroCenteredNoiseInterval = [
    affineZeroCoordinate - candidateMarginAwareHalfWidth,
    affineZeroCoordinate + candidateMarginAwareHalfWidth,
  ];
  const clippedZeroCenteredNoiseInterval = [
    Math.max(-1, zeroCenteredNoiseInterval[0]),
    Math.min(1, zeroCenteredNoiseInterval[1]),
  ];
  const requiredShrinkFactor =
    candidateMarginAwareHalfWidth > 0
      ? 1 / candidateMarginAwareHalfWidth
      : null;
  return {
    label,
    target_pressure: resolvedTargetPressure,
    target_pressure_role:
      "reference-only; not a shifted R43 closure threshold",
    coefficient_abs_target: coefficientAbsTarget,
    ideal_affine_half_width: idealAffineHalfWidth,
    midpoint_residual_aware_half_width:
      midpointResidualAwareHalfWidth,
    candidate_margin_aware_half_width:
      candidateMarginAwareHalfWidth,
    candidate_margin_abs_upper: candidateMarginAbsUpper,
    zero_centered_h38_noise_interval: zeroCenteredNoiseInterval,
    clipped_zero_centered_h38_noise_interval:
      clippedZeroCenteredNoiseInterval,
    zero_centered_h38_residual_half_width:
      candidateMarginAwareHalfWidth * h38ResidualAbsUpper,
    full_residual_coordinate_half_width: 1,
    required_full_domain_shrink_factor: requiredShrinkFactor,
    fits_inside_sample_domain:
      zeroCenteredNoiseInterval[0] >= -1 &&
      zeroCenteredNoiseInterval[1] <= 1,
  };
}

function h39H38Y44ProducerResidualCoordinateProfile({
  targetSpeedInterval,
  rows,
  branch,
  transportProfile,
  residualInterval,
}) {
  const h38Index =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index;
  const residualCenter = intervalMidpoint(residualInterval);
  const residualRadius = intervalWidth(residualInterval) / 2;
  const h38Profile = transportProfile[h38Index];
  const samples = rows.map((row, rowIndex) => {
    const xiInterval = speedIntervalXiInterval({
      row,
      targetSpeedInterval,
    });
    const xiMidpoint = intervalMidpoint(xiInterval);
    const branchRow = branchRowFor(row, branch);
    const h38Interval = hIntervalsFromBranchRow(branchRow, {
      hCount: transportProfile.length,
    })[h38Index];
    const graphInterval = polynomialRangeOnInterval({
      coefficients: h38Profile.coefficients,
      interval: xiInterval,
    });
    const residual = [
      Number(h38Interval[0]) - Number(graphInterval[1]),
      Number(h38Interval[1]) - Number(graphInterval[0]),
    ];
    const residualMidpoint =
      intervalMidpoint(h38Interval) -
      polynomialValue(h38Profile.coefficients, xiMidpoint);
    const coordinateInterval =
      residualRadius > 0
        ? [
            (Number(residual[0]) - residualCenter) / residualRadius,
            (Number(residual[1]) - residualCenter) / residualRadius,
          ]
        : [0, 0];
    const coordinateMidpoint =
      residualRadius > 0
        ? (residualMidpoint - residualCenter) / residualRadius
        : 0;
    return {
      row_index: rowIndex,
      cell_id: row.cell_id,
      speed_interval: row.speed_interval,
      xi_interval: xiInterval,
      xi_midpoint: xiMidpoint,
      h38_interval: h38Interval,
      graph_interval: graphInterval,
      residual_interval: residual,
      residual_midpoint: residualMidpoint,
      residual_coordinate_interval: coordinateInterval,
      residual_coordinate_midpoint: coordinateMidpoint,
      residual_coordinate_width: intervalWidth(coordinateInterval),
    };
  });
  const residualCoordinateIntervalHull = intervalHull(
    samples.map((sample) => sample.residual_coordinate_interval)
  );
  const residualCoordinateMidpointHull = intervalHull(
    samples.map((sample) => pointInterval(sample.residual_coordinate_midpoint))
  );
  return {
    coordinate_formula:
      "u=(h38-q38(xi)-center(residual_hull))/radius(residual_hull)",
    h38_index: h38Index,
    residual_interval: residualInterval,
    residual_center: residualCenter,
    residual_radius: residualRadius,
    row_count: samples.length,
    residual_coordinate_interval_hull: residualCoordinateIntervalHull,
    residual_coordinate_midpoint_hull: residualCoordinateMidpointHull,
    residual_coordinate_interval_hull_width: intervalWidth(
      residualCoordinateIntervalHull
    ),
    residual_coordinate_midpoint_hull_width: intervalWidth(
      residualCoordinateMidpointHull
    ),
    max_residual_coordinate_interval_width: Math.max(
      ...samples.map((sample) => sample.residual_coordinate_width)
    ),
    samples,
  };
}

function h39H38Y44ProducerCoordinateTargetFit({
  label,
  coordinateProfile,
  targetInterval,
}) {
  if (!Array.isArray(targetInterval) || targetInterval.length !== 2) {
    throw new Error("targetInterval must be a two-entry interval");
  }
  const resolvedTargetInterval = targetInterval.map(Number);
  if (
    !Number.isFinite(resolvedTargetInterval[0]) ||
    !Number.isFinite(resolvedTargetInterval[1]) ||
    resolvedTargetInterval[0] > resolvedTargetInterval[1]
  ) {
    throw new Error("targetInterval must be finite and nondecreasing");
  }
  const targetWidth = intervalWidth(resolvedTargetInterval);
  const producerHull = coordinateProfile.residual_coordinate_interval_hull;
  const producerMidpointHull =
    coordinateProfile.residual_coordinate_midpoint_hull;
  const producerHullWidth = intervalWidth(producerHull);
  const producerMidpointHullWidth = intervalWidth(producerMidpointHull);
  const sampleFits = coordinateProfile.samples.map((sample) => {
    const intervalInside =
      Number(sample.residual_coordinate_interval[0]) >=
        Number(resolvedTargetInterval[0]) &&
      Number(sample.residual_coordinate_interval[1]) <=
        Number(resolvedTargetInterval[1]);
    const midpointInside =
      Number(sample.residual_coordinate_midpoint) >=
        Number(resolvedTargetInterval[0]) &&
      Number(sample.residual_coordinate_midpoint) <=
        Number(resolvedTargetInterval[1]);
    return {
      row_index: sample.row_index,
      cell_id: sample.cell_id,
      residual_coordinate_interval: sample.residual_coordinate_interval,
      residual_coordinate_midpoint: sample.residual_coordinate_midpoint,
      interval_inside_target: intervalInside,
      midpoint_inside_target: midpointInside,
    };
  });
  const intervalInsideTargetCount = sampleFits.filter(
    (sample) => sample.interval_inside_target
  ).length;
  const midpointInsideTargetCount = sampleFits.filter(
    (sample) => sample.midpoint_inside_target
  ).length;
  const targetCoversProducerIntervalHull =
    Number(producerHull[0]) >= Number(resolvedTargetInterval[0]) &&
    Number(producerHull[1]) <= Number(resolvedTargetInterval[1]);
  const targetCoversProducerMidpointHull =
    Number(producerMidpointHull[0]) >= Number(resolvedTargetInterval[0]) &&
    Number(producerMidpointHull[1]) <= Number(resolvedTargetInterval[1]);
  return {
    label,
    target_residual_coordinate_interval: resolvedTargetInterval,
    target_residual_coordinate_width: targetWidth,
    producer_residual_coordinate_interval_hull: producerHull,
    producer_residual_coordinate_midpoint_hull: producerMidpointHull,
    producer_residual_coordinate_interval_hull_width:
      producerHullWidth,
    producer_residual_coordinate_midpoint_hull_width:
      producerMidpointHullWidth,
    target_width_to_producer_interval_hull_width:
      producerHullWidth > 0 ? targetWidth / producerHullWidth : null,
    target_width_to_producer_midpoint_hull_width:
      producerMidpointHullWidth > 0
        ? targetWidth / producerMidpointHullWidth
        : null,
    required_interval_hull_shrink_factor:
      targetWidth > 0 ? producerHullWidth / targetWidth : null,
    required_midpoint_hull_shrink_factor:
      targetWidth > 0 ? producerMidpointHullWidth / targetWidth : null,
    target_center_offset_from_producer_midpoint_hull_center:
      intervalMidpoint(resolvedTargetInterval) -
      intervalMidpoint(producerMidpointHull),
    row_count: sampleFits.length,
    interval_inside_target_row_count: intervalInsideTargetCount,
    midpoint_inside_target_row_count: midpointInsideTargetCount,
    target_covers_all_sample_intervals:
      intervalInsideTargetCount === sampleFits.length,
    target_covers_all_sample_midpoints:
      midpointInsideTargetCount === sampleFits.length,
    target_covers_producer_interval_hull: targetCoversProducerIntervalHull,
    target_covers_producer_midpoint_hull: targetCoversProducerMidpointHull,
    sample_fits: sampleFits,
  };
}

function h39H38Y44H38NoiseIntervalReplay({
  setup,
  branch,
  h38NoiseInterval,
  outerRadius,
  shiftedIndex,
  variant,
}) {
  if (!Array.isArray(h38NoiseInterval) || h38NoiseInterval.length !== 2) {
    throw new Error("h38NoiseInterval must be a two-entry interval");
  }
  const resolvedH38NoiseInterval = h38NoiseInterval.map(Number);
  if (
    !Number.isFinite(resolvedH38NoiseInterval[0]) ||
    !Number.isFinite(resolvedH38NoiseInterval[1]) ||
    resolvedH38NoiseInterval[0] > resolvedH38NoiseInterval[1]
  ) {
    throw new Error("h38NoiseInterval must be finite and nondecreasing");
  }
  const clippedH38NoiseInterval = [
    Math.max(-1, resolvedH38NoiseInterval[0]),
    Math.min(1, resolvedH38NoiseInterval[1]),
  ];
  const replay =
    shiftedPressureReplayForPolynomialGraphH38ResidualVariantInterval({
      context: setup.context,
      cell: setup.analysisCell,
      branch,
      transportProfile: setup.transportProfile,
      noise: setup.noiseCoordinate,
      residualProfile: setup.residualProfile,
      h38ResidualInterval:
        setup.h38ResidualProfile.residual_interval_hull,
      h38NoiseInterval: clippedH38NoiseInterval,
      solveSlopeInterval:
        setup.analysisBranchRow.h38_solve_slope_interval,
      outerRadius,
      shiftedIndex,
      variant,
    });
  return {
    h38_noise_interval: resolvedH38NoiseInterval,
    clipped_h38_noise_interval: clippedH38NoiseInterval,
    h38_residual_coordinate_width: intervalWidth(clippedH38NoiseInterval),
    h38_residual_width:
      intervalWidth(clippedH38NoiseInterval) *
      setup.h38ResidualProfile.max_abs_residual,
    replay,
  };
}

function h39H38Y44ZeroCenteredIntervalReplay({
  setup,
  branch,
  affineZeroCoordinate,
  halfWidth,
  outerRadius,
  shiftedIndex,
  variant,
}) {
  const resolvedHalfWidth = Number(halfWidth);
  if (!Number.isFinite(resolvedHalfWidth) || resolvedHalfWidth < 0) {
    throw new Error("halfWidth must be finite and nonnegative");
  }
  const h38NoiseInterval = [
    affineZeroCoordinate - resolvedHalfWidth,
    affineZeroCoordinate + resolvedHalfWidth,
  ];
  const intervalReplay = h39H38Y44H38NoiseIntervalReplay({
    setup,
    branch,
    h38NoiseInterval,
    outerRadius,
    shiftedIndex,
    variant,
  });
  return {
    ...intervalReplay,
    half_width: resolvedHalfWidth,
    h38_residual_half_width:
      resolvedHalfWidth * setup.h38ResidualProfile.max_abs_residual,
  };
}

function h39H38Y44ZeroCenteredSafetySearch({
  setup,
  branch,
  affineZeroCoordinate,
  candidateHalfWidth,
  targetPressure,
  outerRadius,
  shiftedIndex,
  iterations,
  label,
}) {
  const resolvedCandidateHalfWidth = Number(candidateHalfWidth);
  const resolvedTargetPressure = Number(targetPressure);
  const resolvedIterations = assertFinitePositiveInteger(
    "safetySearchIterations",
    iterations
  );
  if (
    !Number.isFinite(resolvedCandidateHalfWidth) ||
    resolvedCandidateHalfWidth < 0 ||
    !finitePositive(resolvedTargetPressure)
  ) {
    return {
      safety_search_iterations: resolvedIterations,
      target_closing_half_width: 0,
      target_closing_safety_divisor: null,
      target_closing_replay_pressure: null,
      target_closing_replay_over_target_pressure: null,
      target_closing_bracket: [0, 0],
      target_closing_bracket_width: 0,
      safety_search_status: "not-applicable",
    };
  }
  if (resolvedCandidateHalfWidth === 0) {
    const zeroReplay = h39H38Y44ZeroCenteredIntervalReplay({
      setup,
      branch,
      affineZeroCoordinate,
      halfWidth: 0,
      outerRadius,
      shiftedIndex,
      variant: `safety-search-zero-${label}`,
    });
    const ratio = zeroReplay.replay.pressure / resolvedTargetPressure;
    return {
      safety_search_iterations: resolvedIterations,
      target_closing_half_width: 0,
      target_closing_safety_divisor: null,
      target_closing_replay_pressure: zeroReplay.replay.pressure,
      target_closing_replay_over_target_pressure: ratio,
      target_closing_center_eliminated_pressure:
        zeroReplay.replay.center_eliminated_pressure,
      target_closing_center_eliminated_over_target_pressure:
        finitePositive(zeroReplay.replay.center_eliminated_pressure)
          ? zeroReplay.replay.center_eliminated_pressure /
            resolvedTargetPressure
          : null,
      target_closing_h38_noise_interval: zeroReplay.h38_noise_interval,
      clipped_target_closing_h38_noise_interval:
        zeroReplay.clipped_h38_noise_interval,
      target_closing_h38_residual_half_width:
        zeroReplay.h38_residual_half_width,
      target_closing_bracket: [0, 0],
      target_closing_bracket_width: 0,
      safety_search_status:
        ratio <= 1
          ? "zero-width-meets-reference-target"
          : "zero-width-exceeds-reference-target",
    };
  }
  let left = 0;
  let right = resolvedCandidateHalfWidth;
  let bestReplay = h39H38Y44ZeroCenteredIntervalReplay({
    setup,
    branch,
    affineZeroCoordinate,
    halfWidth: 0,
    outerRadius,
    shiftedIndex,
    variant: `safety-search-left-${label}`,
  });
  let bestRatio = bestReplay.replay.pressure / resolvedTargetPressure;
  for (let iteration = 0; iteration < resolvedIterations; iteration += 1) {
    const midpoint = (left + right) / 2;
    const replay = h39H38Y44ZeroCenteredIntervalReplay({
      setup,
      branch,
      affineZeroCoordinate,
      halfWidth: midpoint,
      outerRadius,
      shiftedIndex,
      variant: `safety-search-${label}-${iteration}`,
    });
    const ratio = replay.replay.pressure / resolvedTargetPressure;
    if (ratio <= 1) {
      left = midpoint;
      bestReplay = replay;
      bestRatio = ratio;
    } else {
      right = midpoint;
    }
  }
  return {
    safety_search_iterations: resolvedIterations,
    target_closing_half_width: bestReplay.half_width,
    target_closing_safety_divisor:
      bestReplay.half_width > 0
        ? resolvedCandidateHalfWidth / bestReplay.half_width
        : null,
    target_closing_replay_pressure: bestReplay.replay.pressure,
    target_closing_replay_over_target_pressure: bestRatio,
    target_closing_center_eliminated_pressure:
      bestReplay.replay.center_eliminated_pressure,
    target_closing_center_eliminated_over_target_pressure:
      finitePositive(bestReplay.replay.center_eliminated_pressure)
        ? bestReplay.replay.center_eliminated_pressure / resolvedTargetPressure
        : null,
    target_closing_h38_noise_interval: bestReplay.h38_noise_interval,
    clipped_target_closing_h38_noise_interval:
      bestReplay.clipped_h38_noise_interval,
    target_closing_h38_residual_half_width:
      bestReplay.h38_residual_half_width,
    target_closing_bracket: [left, right],
    target_closing_bracket_width: right - left,
    safety_search_status:
      bestRatio <= 1
        ? "bisection-found-candidate-half-width-meeting-reference-target"
        : "bisection-did-not-find-half-width-meeting-reference-target",
  };
}

function h39H38Y44ProducerCoordinateFullHullHalfWidth(coordinateProfile) {
  const midpointHull = coordinateProfile.residual_coordinate_midpoint_hull;
  const intervalHull = coordinateProfile.residual_coordinate_interval_hull;
  return Math.max(
    0,
    Number(midpointHull[0]) - Number(intervalHull[0]),
    Number(intervalHull[1]) - Number(midpointHull[1])
  );
}

function h39H38Y44ProducerCenteredIntervalReplay({
  setup,
  branch,
  coordinateProfile,
  halfWidth,
  outerRadius,
  shiftedIndex,
  variant,
}) {
  const resolvedHalfWidth = Number(halfWidth);
  if (!Number.isFinite(resolvedHalfWidth) || resolvedHalfWidth < 0) {
    throw new Error("halfWidth must be finite and nonnegative");
  }
  const midpointHull = coordinateProfile.residual_coordinate_midpoint_hull;
  const h38NoiseInterval = [
    Number(midpointHull[0]) - resolvedHalfWidth,
    Number(midpointHull[1]) + resolvedHalfWidth,
  ];
  const intervalReplay = h39H38Y44H38NoiseIntervalReplay({
    setup,
    branch,
    h38NoiseInterval,
    outerRadius,
    shiftedIndex,
    variant,
  });
  return {
    ...intervalReplay,
    producer_midpoint_coordinate_hull: midpointHull,
    half_width: resolvedHalfWidth,
    h38_residual_half_width:
      resolvedHalfWidth * setup.h38ResidualProfile.max_abs_residual,
  };
}

function h39H38Y44ProducerCenteredSafetySearch({
  setup,
  branch,
  coordinateProfile,
  candidateHalfWidth,
  targetPressure,
  outerRadius,
  shiftedIndex,
  iterations,
  label,
}) {
  const resolvedCandidateHalfWidth = Number(candidateHalfWidth);
  const resolvedTargetPressure = Number(targetPressure);
  const resolvedIterations = assertFinitePositiveInteger(
    "safetySearchIterations",
    iterations
  );
  if (
    !Number.isFinite(resolvedCandidateHalfWidth) ||
    resolvedCandidateHalfWidth < 0 ||
    !finitePositive(resolvedTargetPressure)
  ) {
    return {
      safety_search_iterations: resolvedIterations,
      target_closing_half_width: 0,
      target_closing_safety_divisor: null,
      target_closing_replay_pressure: null,
      target_closing_replay_over_target_pressure: null,
      center_hull_replay_pressure: null,
      center_hull_replay_over_target_pressure: null,
      target_closing_bracket: [0, 0],
      target_closing_bracket_width: 0,
      safety_search_status: "not-applicable",
    };
  }
  const centerReplay = h39H38Y44ProducerCenteredIntervalReplay({
    setup,
    branch,
    coordinateProfile,
    halfWidth: 0,
    outerRadius,
    shiftedIndex,
    variant: `producer-centered-zero-${label}`,
  });
  const centerRatio = centerReplay.replay.pressure / resolvedTargetPressure;
  if (centerRatio > 1 || resolvedCandidateHalfWidth === 0) {
    return {
      safety_search_iterations: resolvedIterations,
      target_closing_half_width: 0,
      target_closing_safety_divisor: null,
      target_closing_replay_pressure: centerReplay.replay.pressure,
      target_closing_replay_over_target_pressure: centerRatio,
      target_closing_center_eliminated_pressure:
        centerReplay.replay.center_eliminated_pressure,
      target_closing_center_eliminated_over_target_pressure:
        finitePositive(centerReplay.replay.center_eliminated_pressure)
          ? centerReplay.replay.center_eliminated_pressure /
            resolvedTargetPressure
          : null,
      center_hull_replay_pressure: centerReplay.replay.pressure,
      center_hull_replay_over_target_pressure: centerRatio,
      target_closing_h38_noise_interval: centerReplay.h38_noise_interval,
      clipped_target_closing_h38_noise_interval:
        centerReplay.clipped_h38_noise_interval,
      target_closing_h38_residual_half_width:
        centerReplay.h38_residual_half_width,
      target_closing_bracket: [0, 0],
      target_closing_bracket_width: 0,
      expansion_step_count: 0,
      safety_search_status:
        centerRatio <= 1
          ? "producer-center-hull-meets-reference-target"
          : "producer-center-hull-exceeds-reference-target",
    };
  }
  let left = 0;
  let bestReplay = centerReplay;
  let bestRatio = centerRatio;
  let right = Math.min(
    resolvedCandidateHalfWidth,
    Math.max(1e-12, resolvedCandidateHalfWidth / 1024)
  );
  let expansionStepCount = 0;
  let rightFailed = false;
  while (right <= resolvedCandidateHalfWidth) {
    const replay = h39H38Y44ProducerCenteredIntervalReplay({
      setup,
      branch,
      coordinateProfile,
      halfWidth: right,
      outerRadius,
      shiftedIndex,
      variant: `producer-centered-${label}-expand-${expansionStepCount}`,
    });
    const ratio = replay.replay.pressure / resolvedTargetPressure;
    expansionStepCount += 1;
    if (ratio <= 1) {
      left = right;
      bestReplay = replay;
      bestRatio = ratio;
      if (right >= resolvedCandidateHalfWidth) {
        break;
      }
      right = Math.min(resolvedCandidateHalfWidth, right * 2);
      continue;
    }
    rightFailed = true;
    break;
  }
  if (!rightFailed) {
    return {
      safety_search_iterations: resolvedIterations,
      target_closing_half_width: bestReplay.half_width,
      target_closing_safety_divisor:
        bestReplay.half_width > 0
          ? resolvedCandidateHalfWidth / bestReplay.half_width
          : null,
      target_closing_replay_pressure: bestReplay.replay.pressure,
      target_closing_replay_over_target_pressure: bestRatio,
      target_closing_center_eliminated_pressure:
        bestReplay.replay.center_eliminated_pressure,
      target_closing_center_eliminated_over_target_pressure:
        finitePositive(bestReplay.replay.center_eliminated_pressure)
          ? bestReplay.replay.center_eliminated_pressure /
            resolvedTargetPressure
          : null,
      center_hull_replay_pressure: centerReplay.replay.pressure,
      center_hull_replay_over_target_pressure: centerRatio,
      target_closing_h38_noise_interval: bestReplay.h38_noise_interval,
      clipped_target_closing_h38_noise_interval:
        bestReplay.clipped_h38_noise_interval,
      target_closing_h38_residual_half_width:
        bestReplay.h38_residual_half_width,
      target_closing_bracket: [bestReplay.half_width, bestReplay.half_width],
      target_closing_bracket_width: 0,
      expansion_step_count: expansionStepCount,
      safety_search_status:
        "producer-centered-full-hull-meets-reference-target",
    };
  }
  for (let iteration = 0; iteration < resolvedIterations; iteration += 1) {
    const midpoint = (left + right) / 2;
    const replay = h39H38Y44ProducerCenteredIntervalReplay({
      setup,
      branch,
      coordinateProfile,
      halfWidth: midpoint,
      outerRadius,
      shiftedIndex,
      variant: `producer-centered-${label}-${iteration}`,
    });
    const ratio = replay.replay.pressure / resolvedTargetPressure;
    if (ratio <= 1) {
      left = midpoint;
      bestReplay = replay;
      bestRatio = ratio;
    } else {
      right = midpoint;
    }
  }
  return {
    safety_search_iterations: resolvedIterations,
    target_closing_half_width: bestReplay.half_width,
    target_closing_safety_divisor:
      bestReplay.half_width > 0
        ? resolvedCandidateHalfWidth / bestReplay.half_width
        : null,
    target_closing_replay_pressure: bestReplay.replay.pressure,
    target_closing_replay_over_target_pressure: bestRatio,
    target_closing_center_eliminated_pressure:
      bestReplay.replay.center_eliminated_pressure,
    target_closing_center_eliminated_over_target_pressure:
      finitePositive(bestReplay.replay.center_eliminated_pressure)
        ? bestReplay.replay.center_eliminated_pressure / resolvedTargetPressure
        : null,
    center_hull_replay_pressure: centerReplay.replay.pressure,
    center_hull_replay_over_target_pressure: centerRatio,
    target_closing_h38_noise_interval: bestReplay.h38_noise_interval,
    clipped_target_closing_h38_noise_interval:
      bestReplay.clipped_h38_noise_interval,
    target_closing_h38_residual_half_width:
      bestReplay.h38_residual_half_width,
    target_closing_bracket: [left, right],
    target_closing_bracket_width: right - left,
    expansion_step_count: expansionStepCount,
    safety_search_status:
      bestRatio <= 1 && bestReplay.half_width > 0
        ? "bisection-found-producer-centered-half-width-meeting-reference-target"
        : bestRatio <= 1
          ? "producer-center-hull-meets-reference-target-but-no-positive-width-found"
        : "bisection-did-not-find-producer-centered-half-width-meeting-reference-target",
  };
}

function h39H38Y44ProducerCenteredCollarTarget({
  label,
  coordinateProfile,
  safetySearch,
  sourceStencilSubcellCount,
}) {
  const midpointHull = coordinateProfile.residual_coordinate_midpoint_hull;
  const intervalHull = coordinateProfile.residual_coordinate_interval_hull;
  const halfWidth = Math.max(
    0,
    Number(safetySearch?.target_closing_half_width ?? 0)
  );
  const collarInterval = [
    Number(midpointHull[0]) - halfWidth,
    Number(midpointHull[1]) + halfWidth,
  ];
  const collarWidth = intervalWidth(collarInterval);
  const intervalHullWidth =
    coordinateProfile.residual_coordinate_interval_hull_width;
  const midpointHullWidth =
    coordinateProfile.residual_coordinate_midpoint_hull_width;
  const maxSampleIntervalWidth =
    coordinateProfile.max_residual_coordinate_interval_width;
  const intervalHullInsideCollar =
    Number(intervalHull[0]) >= Number(collarInterval[0]) &&
    Number(intervalHull[1]) <= Number(collarInterval[1]);
  const midpointHullInsideCollar =
    Number(midpointHull[0]) >= Number(collarInterval[0]) &&
    Number(midpointHull[1]) <= Number(collarInterval[1]);
  const sampleFits = coordinateProfile.samples.map((sample) => {
    const intervalInside =
      Number(sample.residual_coordinate_interval[0]) >=
        Number(collarInterval[0]) &&
      Number(sample.residual_coordinate_interval[1]) <=
        Number(collarInterval[1]);
    const midpointInside =
      Number(sample.residual_coordinate_midpoint) >=
        Number(collarInterval[0]) &&
      Number(sample.residual_coordinate_midpoint) <=
        Number(collarInterval[1]);
    return {
      row_index: sample.row_index,
      cell_id: sample.cell_id,
      residual_coordinate_interval: sample.residual_coordinate_interval,
      residual_coordinate_midpoint: sample.residual_coordinate_midpoint,
      interval_inside_collar: intervalInside,
      midpoint_inside_collar: midpointInside,
    };
  });
  const intervalInsideCollarCount = sampleFits.filter(
    (sample) => sample.interval_inside_collar
  ).length;
  const midpointInsideCollarCount = sampleFits.filter(
    (sample) => sample.midpoint_inside_collar
  ).length;
  const requiredIntervalHullCompressionFactor =
    collarWidth > 0 ? intervalHullWidth / collarWidth : null;
  const requiredMaxSampleIntervalCompressionFactor =
    collarWidth > 0 ? maxSampleIntervalWidth / collarWidth : null;
  const linearSubcellForecast =
    finitePositive(requiredIntervalHullCompressionFactor)
      ? Math.ceil(
          Number(sourceStencilSubcellCount) *
            requiredIntervalHullCompressionFactor
        )
      : null;
  const replayRatio = Number(
    safetySearch?.target_closing_replay_over_target_pressure
  );
  const positiveCollarFound =
    halfWidth > 0 && Number.isFinite(replayRatio) && replayRatio <= 1;
  const targetStatus = intervalHullInsideCollar
    ? "producer-interval-hull-inside-collar"
    : positiveCollarFound && midpointHullInsideCollar
      ? "positive-midpoint-collar-full-interval-open"
      : midpointHullInsideCollar
        ? "midpoint-only-collar-full-interval-open"
        : "producer-midpoint-hull-outside-collar";
  const refinementInterpretation =
    intervalHullInsideCollar
      ? "current-producer-interval-hull-already-fits-collar"
      : finitePositive(linearSubcellForecast) &&
          linearSubcellForecast >= 1e8
        ? "linear-subcell-refinement-impractical-analytic-covariance-needed"
        : positiveCollarFound
          ? "positive-collar-gives-finite-producer-image-certificate-target"
          : "center-hull-only-collar-needs-positive-width-or-producer-image-proof";
  return {
    label,
    collar_center_coordinate_hull: midpointHull,
    collar_residual_coordinate_interval: collarInterval,
    collar_residual_coordinate_half_width: halfWidth,
    collar_residual_coordinate_width: collarWidth,
    positive_collar_found: positiveCollarFound,
    producer_residual_coordinate_interval_hull: intervalHull,
    producer_residual_coordinate_midpoint_hull: midpointHull,
    producer_residual_coordinate_interval_hull_width:
      intervalHullWidth,
    producer_residual_coordinate_midpoint_hull_width:
      midpointHullWidth,
    producer_max_residual_coordinate_interval_width:
      maxSampleIntervalWidth,
    producer_interval_hull_inside_collar: intervalHullInsideCollar,
    producer_midpoint_hull_inside_collar: midpointHullInsideCollar,
    interval_inside_collar_row_count: intervalInsideCollarCount,
    midpoint_inside_collar_row_count: midpointInsideCollarCount,
    required_interval_hull_compression_factor:
      requiredIntervalHullCompressionFactor,
    required_max_sample_interval_compression_factor:
      requiredMaxSampleIntervalCompressionFactor,
    linear_subcell_refinement_forecast:
      linearSubcellForecast,
    source_stencil_subcell_count: sourceStencilSubcellCount,
    target_replay_over_target_pressure:
      Number.isFinite(replayRatio) ? replayRatio : null,
    target_status: targetStatus,
    refinement_interpretation: refinementInterpretation,
    sample_fits: sampleFits,
  };
}

function h39H38Y44ProducerCenteredNumeratorCollarTarget({
  label,
  coordinateProfile,
  collarTarget,
  solveWidthProfile,
  numeratorPolynomialDiagnostic,
}) {
  const residualCenter = Number(coordinateProfile.residual_center);
  const residualRadius = Number(coordinateProfile.residual_radius);
  const collarCoordinateInterval =
    collarTarget.collar_residual_coordinate_interval;
  const residualCollarInterval = [
    residualCenter + residualRadius * Number(collarCoordinateInterval[0]),
    residualCenter + residualRadius * Number(collarCoordinateInterval[1]),
  ];
  const residualCollarWidth = intervalWidth(residualCollarInterval);
  const coefficients = numeratorPolynomialDiagnostic.coefficients;
  const samples = solveWidthProfile.samples.map((sample) => {
    const slopeAbsLower = intervalAbsLower(sample.slope_interval);
    const slopeAbsUpper = intervalAbsUpper(sample.slope_interval);
    const slopeMidpointAbs = Math.abs(Number(sample.slope_midpoint));
    const conservativeNumeratorWidthTarget =
      slopeAbsLower * residualCollarWidth;
    const midpointSlopeNumeratorWidthTarget =
      slopeMidpointAbs * residualCollarWidth;
    const slopeAbsLowerToMidpointAbsRatio = finitePositive(slopeMidpointAbs)
      ? slopeAbsLower / slopeMidpointAbs
      : null;
    const numeratorWidth = intervalWidth(sample.numerator_interval);
    const xiMidpoint = intervalMidpoint(sample.xi_interval);
    const graphMidpoint = polynomialValue(coefficients, xiMidpoint);
    const midpointResidual = sample.numerator_midpoint - graphMidpoint;
    const absMidpointResidual = Math.abs(midpointResidual);
    return {
      cell_id: sample.cell_id,
      xi_interval: sample.xi_interval,
      xi_midpoint: xiMidpoint,
      numerator_interval: sample.numerator_interval,
      numerator_interval_width: numeratorWidth,
      numerator_midpoint: sample.numerator_midpoint,
      numerator_graph_midpoint: graphMidpoint,
      numerator_midpoint_residual: midpointResidual,
      numerator_abs_midpoint_residual: absMidpointResidual,
      slope_interval: sample.slope_interval,
      slope_abs_lower: slopeAbsLower,
      slope_abs_upper: slopeAbsUpper,
      slope_abs_lower_to_midpoint_abs_ratio:
        slopeAbsLowerToMidpointAbsRatio,
      conservative_numerator_width_target:
        conservativeNumeratorWidthTarget,
      midpoint_slope_numerator_width_target:
        midpointSlopeNumeratorWidthTarget,
      numerator_interval_compression_to_conservative_target:
        finitePositive(conservativeNumeratorWidthTarget)
          ? numeratorWidth / conservativeNumeratorWidthTarget
          : null,
      numerator_midpoint_residual_over_conservative_target:
        finitePositive(conservativeNumeratorWidthTarget)
          ? absMidpointResidual / conservativeNumeratorWidthTarget
          : null,
      numerator_midpoint_residual_over_midpoint_slope_target:
        finitePositive(midpointSlopeNumeratorWidthTarget)
          ? absMidpointResidual / midpointSlopeNumeratorWidthTarget
          : null,
      numerator_midpoint_residual_headroom_factor:
        absMidpointResidual > 0 &&
        finitePositive(conservativeNumeratorWidthTarget)
          ? conservativeNumeratorWidthTarget / absMidpointResidual
          : null,
      numerator_midpoint_slope_residual_headroom_factor:
        absMidpointResidual > 0 &&
        finitePositive(midpointSlopeNumeratorWidthTarget)
          ? midpointSlopeNumeratorWidthTarget / absMidpointResidual
          : null,
    };
  });
  const compressionFactors = samples
    .map((sample) =>
      Number(sample.numerator_interval_compression_to_conservative_target)
    )
    .filter((value) => Number.isFinite(value) && value > 0);
  const midpointResidualRatios = samples
    .map((sample) =>
      Number(sample.numerator_midpoint_residual_over_conservative_target)
    )
    .filter((value) => Number.isFinite(value) && value >= 0);
  const midpointHeadroomFactors = samples
    .map((sample) => Number(sample.numerator_midpoint_residual_headroom_factor))
    .filter((value) => Number.isFinite(value) && value > 0);
  const midpointSlopeResidualRatios = samples
    .map((sample) =>
      Number(sample.numerator_midpoint_residual_over_midpoint_slope_target)
    )
    .filter((value) => Number.isFinite(value) && value >= 0);
  const midpointSlopeHeadroomFactors = samples
    .map((sample) =>
      Number(sample.numerator_midpoint_slope_residual_headroom_factor)
    )
    .filter((value) => Number.isFinite(value) && value > 0);
  const slopeAbsLowerToMidpointAbsRatios = samples
    .map((sample) => Number(sample.slope_abs_lower_to_midpoint_abs_ratio))
    .filter((value) => Number.isFinite(value) && value >= 0);
  const maxCompressionFactor =
    compressionFactors.length > 0 ? Math.max(...compressionFactors) : null;
  const maxMidpointResidualRatio =
    midpointResidualRatios.length > 0
      ? Math.max(...midpointResidualRatios)
      : null;
  const minMidpointHeadroomFactor =
    midpointHeadroomFactors.length > 0
      ? Math.min(...midpointHeadroomFactors)
      : null;
  const maxMidpointSlopeResidualRatio =
    midpointSlopeResidualRatios.length > 0
      ? Math.max(...midpointSlopeResidualRatios)
      : null;
  const minMidpointSlopeHeadroomFactor =
    midpointSlopeHeadroomFactors.length > 0
      ? Math.min(...midpointSlopeHeadroomFactors)
      : null;
  const minSlopeAbsLowerToMidpointAbsRatio =
    slopeAbsLowerToMidpointAbsRatios.length > 0
      ? Math.min(...slopeAbsLowerToMidpointAbsRatios)
      : null;
  const maxSlopeAbsLowerToMidpointAbsRatio =
    slopeAbsLowerToMidpointAbsRatios.length > 0
      ? Math.max(...slopeAbsLowerToMidpointAbsRatios)
      : null;
  const intervalHullOpen =
    maxCompressionFactor !== null && maxCompressionFactor > 1;
  const midpointGraphInsideTarget =
    maxMidpointResidualRatio !== null && maxMidpointResidualRatio <= 1;
  const midpointSlopeGraphInsideTarget =
    maxMidpointSlopeResidualRatio !== null &&
    maxMidpointSlopeResidualRatio <= 1;
  const targetStatus = !finitePositive(residualCollarWidth)
    ? "degenerate-collar-no-numerator-target"
    : !intervalHullOpen
      ? "numerator-interval-hull-inside-collar-target"
      : midpointGraphInsideTarget
        ? "numerator-midpoint-graph-inside-collar-target-interval-open"
        : "numerator-midpoint-graph-exceeds-collar-target";
  const proofRouteInterpretation =
    targetStatus ===
    "numerator-midpoint-graph-inside-collar-target-interval-open"
      ? "numerator-graph-residual-certificate-can-target-producer-collar"
      : targetStatus === "numerator-interval-hull-inside-collar-target"
        ? "current-numerator-interval-hull-already-fits-producer-collar"
        : targetStatus === "numerator-midpoint-graph-exceeds-collar-target" &&
            midpointSlopeGraphInsideTarget
          ? "s37-lower-bound-dependency-collapse-before-numerator-collar"
        : targetStatus === "numerator-midpoint-graph-exceeds-collar-target"
          ? "numerator-graph-degree-or-local-coordinate-must-tighten"
          : "positive-producer-collar-needed-before-numerator-target";
  return {
    label,
    numerator_polynomial_degree:
      numeratorPolynomialDiagnostic.polynomial_degree,
    h38_residual_collar_interval: residualCollarInterval,
    h38_residual_collar_width: residualCollarWidth,
    max_numerator_interval_compression_to_conservative_target:
      maxCompressionFactor,
    max_numerator_midpoint_residual_over_conservative_target:
      maxMidpointResidualRatio,
    min_numerator_midpoint_residual_headroom_factor:
      minMidpointHeadroomFactor,
    max_numerator_midpoint_residual_over_midpoint_slope_target:
      maxMidpointSlopeResidualRatio,
    min_numerator_midpoint_slope_residual_headroom_factor:
      minMidpointSlopeHeadroomFactor,
    min_slope_abs_lower_to_midpoint_abs_ratio:
      minSlopeAbsLowerToMidpointAbsRatio,
    max_slope_abs_lower_to_midpoint_abs_ratio:
      maxSlopeAbsLowerToMidpointAbsRatio,
    numerator_interval_hull_open_against_collar: intervalHullOpen,
    numerator_midpoint_graph_inside_collar_target:
      midpointGraphInsideTarget,
    numerator_midpoint_graph_inside_midpoint_slope_target:
      midpointSlopeGraphInsideTarget,
    target_status: targetStatus,
    proof_route_interpretation: proofRouteInterpretation,
    samples,
  };
}

function h39H38Y44N38CollarEnclosureRoute({
  referenceTargets,
  numeratorPolynomialDiagnostic,
  sourceStencilSubcellCount,
}) {
  const finiteValue = (value) =>
    value !== null && value !== undefined && Number.isFinite(Number(value));
  const compactSample = (sample) =>
    sample
      ? {
          reference_label: sample.reference_label,
          cell_id: sample.cell_id,
          xi_interval: sample.xi_interval,
          xi_midpoint: sample.xi_midpoint,
          numerator_midpoint_residual: sample.numerator_midpoint_residual,
          numerator_abs_midpoint_residual:
            sample.numerator_abs_midpoint_residual,
          conservative_numerator_width_target:
            sample.conservative_numerator_width_target,
          midpoint_slope_numerator_width_target:
            sample.midpoint_slope_numerator_width_target,
          slope_interval: sample.slope_interval,
          slope_abs_lower: sample.slope_abs_lower,
          slope_abs_upper: sample.slope_abs_upper,
          slope_abs_lower_to_midpoint_abs_ratio:
            sample.slope_abs_lower_to_midpoint_abs_ratio,
          numerator_midpoint_residual_over_conservative_target:
            sample.numerator_midpoint_residual_over_conservative_target,
          numerator_midpoint_residual_over_midpoint_slope_target:
            sample.numerator_midpoint_residual_over_midpoint_slope_target,
          numerator_midpoint_residual_headroom_factor:
            sample.numerator_midpoint_residual_headroom_factor,
          numerator_midpoint_slope_residual_headroom_factor:
            sample.numerator_midpoint_slope_residual_headroom_factor,
          target_status: sample.target_status,
          proof_route_interpretation: sample.proof_route_interpretation,
        }
      : null;
  const samples = referenceTargets.flatMap((target) =>
    target.samples.map((sample) => ({
      ...sample,
      reference_label: target.label,
      target_status: target.target_status,
      proof_route_interpretation: target.proof_route_interpretation,
    }))
  );
  const finiteSamples = samples.filter(
    (sample) =>
      finiteValue(
        sample.numerator_midpoint_residual_over_conservative_target
      ) &&
      finiteValue(sample.numerator_abs_midpoint_residual) &&
      finitePositive(sample.conservative_numerator_width_target)
  );
  const controllingSample = finiteSamples.reduce((best, sample) =>
    Number(sample.numerator_midpoint_residual_over_conservative_target) >
    Number(best?.numerator_midpoint_residual_over_conservative_target ?? -1)
      ? sample
      : best,
  null);
  const targetWidthSamples = finiteSamples
    .map((sample) => Number(sample.conservative_numerator_width_target))
    .filter((value) => Number.isFinite(value) && value >= 0);
  const residualSamples = finiteSamples
    .map((sample) => Number(sample.numerator_abs_midpoint_residual))
    .filter((value) => Number.isFinite(value) && value >= 0);
  const residualRatios = finiteSamples
    .map((sample) =>
      Number(sample.numerator_midpoint_residual_over_conservative_target)
    )
    .filter((value) => Number.isFinite(value) && value >= 0);
  const headroomFactors = finiteSamples
    .map((sample) => Number(sample.numerator_midpoint_residual_headroom_factor))
    .filter((value) => Number.isFinite(value) && value > 0);
  const midpointSlopeSamples = samples.filter(
    (sample) =>
      finiteValue(
        sample.numerator_midpoint_residual_over_midpoint_slope_target
      ) &&
      finitePositive(sample.midpoint_slope_numerator_width_target)
  );
  const controllingMidpointSlopeSample = midpointSlopeSamples.reduce(
    (best, sample) =>
      Number(sample.numerator_midpoint_residual_over_midpoint_slope_target) >
      Number(
        best?.numerator_midpoint_residual_over_midpoint_slope_target ?? -1
      )
        ? sample
        : best,
    null
  );
  const midpointSlopeResidualRatios = midpointSlopeSamples
    .map((sample) =>
      Number(sample.numerator_midpoint_residual_over_midpoint_slope_target)
    )
    .filter((value) => Number.isFinite(value) && value >= 0);
  const midpointSlopeHeadroomFactors = midpointSlopeSamples
    .map((sample) =>
      Number(sample.numerator_midpoint_slope_residual_headroom_factor)
    )
    .filter((value) => Number.isFinite(value) && value > 0);
  const slopeAbsLowerToMidpointAbsRatios = midpointSlopeSamples
    .map((sample) => Number(sample.slope_abs_lower_to_midpoint_abs_ratio))
    .filter((value) => Number.isFinite(value) && value >= 0);
  const compressionFactors = referenceTargets
    .map((target) =>
      Number(target.max_numerator_interval_compression_to_conservative_target)
    )
    .filter((value) => Number.isFinite(value) && value > 0);
  const residualToRawWidthRatios = finiteSamples
    .map((sample) =>
      finitePositive(sample.numerator_interval_width)
        ? Number(sample.numerator_abs_midpoint_residual) /
          Number(sample.numerator_interval_width)
        : null
    )
    .filter((value) => Number.isFinite(value) && value >= 0);
  const referenceGraphInsideCount = referenceTargets.filter(
    (target) =>
      target.numerator_midpoint_graph_inside_collar_target &&
      [
        "numerator-interval-hull-inside-collar-target",
        "numerator-midpoint-graph-inside-collar-target-interval-open",
      ].includes(target.target_status)
  ).length;
  const midpointSlopeGraphInsideCount = referenceTargets.filter(
    (target) =>
      target.numerator_midpoint_graph_inside_midpoint_slope_target === true
  ).length;
  const maxResidualRatio =
    residualRatios.length > 0 ? Math.max(...residualRatios) : null;
  const minHeadroom =
    headroomFactors.length > 0 ? Math.min(...headroomFactors) : null;
  const maxMidpointSlopeResidualRatio =
    midpointSlopeResidualRatios.length > 0
      ? Math.max(...midpointSlopeResidualRatios)
      : null;
  const minMidpointSlopeHeadroom =
    midpointSlopeHeadroomFactors.length > 0
      ? Math.min(...midpointSlopeHeadroomFactors)
      : null;
  const minSlopeAbsLowerToMidpointAbsRatio =
    slopeAbsLowerToMidpointAbsRatios.length > 0
      ? Math.min(...slopeAbsLowerToMidpointAbsRatios)
      : null;
  const maxCompression =
    compressionFactors.length > 0 ? Math.max(...compressionFactors) : null;
  const maxResidualToRawWidthRatio =
    residualToRawWidthRatios.length > 0
      ? Math.max(...residualToRawWidthRatios)
      : null;
  const s37DependencyStatus =
    finitePositive(maxResidualRatio) &&
    maxResidualRatio > 1 &&
    maxMidpointSlopeResidualRatio !== null &&
    maxMidpointSlopeResidualRatio <= 1
      ? "midpoint-slope-collar-fits-but-conservative-s37-lower-bound-collapses"
      : maxMidpointSlopeResidualRatio !== null &&
          maxMidpointSlopeResidualRatio > 1
        ? "midpoint-slope-collar-also-fails-n38-graph-residual"
        : finitePositive(maxResidualRatio) && maxResidualRatio <= 1
          ? "conservative-s37-lower-bound-supports-n38-collar"
          : "s37-dependency-status-open";
  const routeDiagnosis =
    referenceTargets.length > 0 &&
    referenceGraphInsideCount === referenceTargets.length &&
    finitePositive(minHeadroom) &&
    minHeadroom >= 100
      ? "n38-quadratic-midpoint-residual-has-directed-rounded-collar-headroom"
      : s37DependencyStatus ===
          "midpoint-slope-collar-fits-but-conservative-s37-lower-bound-collapses"
        ? "s37-lower-bound-dependency-collapse-controls-n38-collar-route"
      : referenceGraphInsideCount > 0
        ? "n38-quadratic-midpoint-residual-has-partial-collar-headroom"
        : "n38-quadratic-midpoint-residual-collar-route-open";
  return {
    status: "h39-h38-y44-n38-collar-enclosure-route-candidate-emitted",
    evaluation_level: "candidate-h38-y44-n38-collar-enclosure-route",
    polynomial_degree: numeratorPolynomialDiagnostic.polynomial_degree,
    numerator_polynomial_coefficients:
      numeratorPolynomialDiagnostic.coefficients,
    source_stencil_subcell_count: sourceStencilSubcellCount,
    reference_target_count: referenceTargets.length,
    sample_count: samples.length,
    reference_targets_with_midpoint_graph_inside_collar_count:
      referenceGraphInsideCount,
    reference_targets_with_midpoint_slope_graph_inside_collar_count:
      midpointSlopeGraphInsideCount,
    min_conservative_numerator_width_target:
      targetWidthSamples.length > 0 ? Math.min(...targetWidthSamples) : null,
    max_conservative_numerator_width_target:
      targetWidthSamples.length > 0 ? Math.max(...targetWidthSamples) : null,
    max_numerator_abs_midpoint_residual:
      residualSamples.length > 0 ? Math.max(...residualSamples) : null,
    max_midpoint_residual_over_conservative_target: maxResidualRatio,
    min_midpoint_residual_headroom_factor: minHeadroom,
    max_midpoint_residual_over_midpoint_slope_target:
      maxMidpointSlopeResidualRatio,
    min_midpoint_slope_residual_headroom_factor:
      minMidpointSlopeHeadroom,
    min_slope_abs_lower_to_midpoint_abs_ratio:
      minSlopeAbsLowerToMidpointAbsRatio,
    max_numerator_interval_compression_to_conservative_target:
      maxCompression,
    max_midpoint_residual_to_raw_numerator_interval_width_ratio:
      maxResidualToRawWidthRatio,
    controlling_sample: compactSample(controllingSample),
    controlling_midpoint_slope_sample:
      compactSample(controllingMidpointSlopeSample),
    s37_dependency_status: s37DependencyStatus,
    directed_rounded_proof_obligation: {
      target:
        "prove |N38(xi)-q2(xi)| stays below the conservative numerator collar target on the same producer xi window",
      dependency_to_preserve:
        "keep xi, N38, and inherited S37 solve-slope dependency coupled until h38=-N38/S37 is replayed into the H39 collar",
      sufficient_condition:
        "directed-rounded N38 graph residual enclosure plus same-domain lower bound for |S37| below the conservative numerator-width target",
      current_evidence:
        "midpoint residual and midpoint-slope comparison only; not a directed-rounded interval enclosure",
    },
    route_diagnosis: routeDiagnosis,
    claim_boundary: {
      certifies_h38_n38_graph_enclosure: false,
      certifies_s37_dependency_preserving_division: false,
      certifies_producer_collar_enclosure: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

export function buildH39H38Y44SignedAffineTargetEnvelopeDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  outerRadius = 0.001,
  shiftedIndex = 1,
  seriesOrder = 60,
  sourceStencilSubcellCount = 32,
  comparisonStencilIndex = 27,
  polynomialDegree = 2,
  h38NoiseSamples = [-1, -0.5, 0, 0.5, 1],
  referencePressureTargets = [1e13, 1e14, 1e16, 1e18, 1e20],
  safetySearchIterations = 16,
  progressCallback = null,
} = {}) {
  const startedAt = Date.now();
  const emitProgress =
    typeof progressCallback === "function"
      ? (progress) =>
          progressCallback({
            diagnostic: "h39-h38-y44-signed-affine-target-envelope",
            elapsed_ms: Date.now() - startedAt,
            ...progress,
          })
      : null;
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedSourceStencilSubcellCount = assertFinitePositiveInteger(
    "sourceStencilSubcellCount",
    sourceStencilSubcellCount
  );
  if (resolvedSourceStencilSubcellCount < 5) {
    throw new Error("sourceStencilSubcellCount must be at least 5");
  }
  const resolvedComparisonStencilIndex = Number(comparisonStencilIndex);
  if (
    !Number.isInteger(resolvedComparisonStencilIndex) ||
    resolvedComparisonStencilIndex < 0
  ) {
    throw new Error("comparisonStencilIndex must be a nonnegative integer");
  }
  const resolvedPolynomialDegree = assertFinitePositiveInteger(
    "polynomialDegree",
    polynomialDegree
  );
  if (resolvedPolynomialDegree > 3) {
    throw new Error("polynomialDegree must be at most 3");
  }
  const resolvedOuterRadius = assertFinitePositiveNumber(
    "outerRadius",
    outerRadius
  );
  const resolvedShiftedIndex = assertFinitePositiveInteger(
    "shiftedIndex",
    shiftedIndex
  );
  const resolvedSeriesOrder = assertFinitePositiveInteger(
    "seriesOrder",
    seriesOrder
  );
  const resolvedH38NoiseSamples = h38NoiseSamples.map((sample) => {
    const resolved = Number(sample);
    if (!Number.isFinite(resolved) || resolved < -1 || resolved > 1) {
      throw new Error("h38NoiseSamples must be finite values in [-1,1]");
    }
    return resolved;
  });
  if (resolvedH38NoiseSamples.length < 3) {
    throw new Error("h38NoiseSamples must contain at least three values");
  }
  const resolvedReferencePressureTargets = referencePressureTargets.map(
    (target) => assertFinitePositiveNumber("referencePressureTargets", target)
  );
  const resolvedSafetySearchIterations = assertFinitePositiveInteger(
    "safetySearchIterations",
    safetySearchIterations
  );
  emitProgress?.({
    stage: "signed-affine-target-envelope-dependence-start",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
  });
  const setup = buildH39H38Y44CoefficientReplaySetup({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    branch,
    rootSubdivisions,
    seriesOrder: resolvedSeriesOrder,
    sourceStencilSubcellCount: resolvedSourceStencilSubcellCount,
    comparisonStencilIndex: resolvedComparisonStencilIndex,
    polynomialDegree: resolvedPolynomialDegree,
  });
  emitProgress?.({
    stage: "signed-affine-target-envelope-comparison-window-ready",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    analysis_cell_id: setup.analysisRow.cell_id,
    h38_noise_sample_count: resolvedH38NoiseSamples.length,
  });
  const sampleReplays = resolvedH38NoiseSamples.map(
    (h38Noise, sampleIndex) => {
      emitProgress?.({
        stage: "signed-affine-target-envelope-sample-start",
        sample_index: sampleIndex,
        h38_noise_coordinate: h38Noise,
        completed_sample_count: sampleIndex,
        sample_count: resolvedH38NoiseSamples.length,
      });
      const sample = h39H38Y44CoefficientSampleReplay({
        context: setup.context,
        analysisCell: setup.analysisCell,
        analysisBranchRow: setup.analysisBranchRow,
        branch,
        transportProfile: setup.transportProfile,
        residualProfile: setup.residualProfile,
        h38ResidualProfile: setup.h38ResidualProfile,
        noiseCoordinate: setup.noiseCoordinate,
        outerRadius: resolvedOuterRadius,
        shiftedIndex: resolvedShiftedIndex,
        h38Noise,
        sampleIndex,
      });
      emitProgress?.({
        stage: "signed-affine-target-envelope-sample-complete",
        sample_index: sampleIndex,
        h38_noise_coordinate: h38Noise,
        source_coefficient_midpoint: sample.source_coefficient_midpoint,
        source_coefficient_width: sample.source_coefficient_width,
        completed_sample_count: sampleIndex + 1,
        sample_count: resolvedH38NoiseSamples.length,
      });
      return sample;
    }
  );
  const affineFit = coefficientMidpointProfileFit({
    samples: sampleReplays,
    coefficientKey: "source_coefficient_interval",
    degree: 1,
  });
  const quadraticFit = coefficientMidpointProfileFit({
    samples: sampleReplays,
    coefficientKey: "source_coefficient_interval",
    degree: 2,
  });
  const affineToQuadraticResidualRatio =
    quadraticFit.max_abs_midpoint_residual > 0
      ? affineFit.max_abs_midpoint_residual /
        quadraticFit.max_abs_midpoint_residual
      : null;
  const centerSample =
    sampleReplays.find(
      (sample) => Math.abs(Number(sample.h38_noise_coordinate)) < 1e-15
    ) ??
    h39H38Y44CoefficientSampleReplay({
      context: setup.context,
      analysisCell: setup.analysisCell,
      analysisBranchRow: setup.analysisBranchRow,
      branch,
      transportProfile: setup.transportProfile,
      residualProfile: setup.residualProfile,
      h38ResidualProfile: setup.h38ResidualProfile,
      noiseCoordinate: setup.noiseCoordinate,
      outerRadius: resolvedOuterRadius,
      shiftedIndex: resolvedShiftedIndex,
      h38Noise: 0,
      sampleIndex: -2,
    });
  const maxSamplePressure = Math.max(
    ...sampleReplays.map((sample) => Number(sample.pressure))
  );
  const affineIntercept = Number(affineFit.coefficients[0]);
  const affineSlope = Number(affineFit.coefficients[1]);
  const affineSlopeAbs = Math.abs(affineSlope);
  if (!finitePositive(affineSlopeAbs)) {
    throw new Error("signed affine target envelope requires nonzero affine slope");
  }
  const affineZeroCoordinate = -affineIntercept / affineSlope;
  if (!Number.isFinite(Number(affineZeroCoordinate))) {
    throw new Error("signed affine target envelope requires a finite affine zero");
  }
  emitProgress?.({
    stage: "signed-affine-target-envelope-zero-replay-start",
    affine_zero_coordinate: affineZeroCoordinate,
  });
  const affineZeroReplay = h39H38Y44CoefficientSampleReplay({
    context: setup.context,
    analysisCell: setup.analysisCell,
    analysisBranchRow: setup.analysisBranchRow,
    branch,
    transportProfile: setup.transportProfile,
    residualProfile: setup.residualProfile,
    h38ResidualProfile: setup.h38ResidualProfile,
    noiseCoordinate: setup.noiseCoordinate,
    outerRadius: resolvedOuterRadius,
    shiftedIndex: resolvedShiftedIndex,
    h38Noise: affineZeroCoordinate,
    sampleIndex: -1,
  });
  const midpointLinearityGapAbsUpper = Math.max(
    Number(affineFit.max_abs_midpoint_residual),
    Number(quadraticFit.max_abs_midpoint_residual)
  );
  const zeroReplayCoefficientHalfWidth =
    Number(affineZeroReplay.source_coefficient_width) / 2;
  const candidateCoefficientMarginAbsUpper =
    midpointLinearityGapAbsUpper + zeroReplayCoefficientHalfWidth;
  const candidateMarginPressure =
    candidateCoefficientMarginAbsUpper *
    resolvedOuterRadius ** resolvedShiftedIndex;
  const pressureReferenceRows = [
    {
      label: "affine-zero-replay-pressure",
      targetPressure: affineZeroReplay.pressure,
    },
    {
      label: "center-sample-pressure",
      targetPressure: centerSample.pressure,
    },
    {
      label: "max-sample-pressure",
      targetPressure: maxSamplePressure,
    },
    ...resolvedReferencePressureTargets.map((targetPressure) => ({
      label: `reference-pressure-${targetPressure}`,
      targetPressure,
    })),
  ];
  const pressureTargetEnvelope = pressureReferenceRows.map((row) =>
    h39H38Y44AffineTargetEnvelopeEntry({
      label: row.label,
      targetPressure: row.targetPressure,
      outerRadius: resolvedOuterRadius,
      shiftedIndex: resolvedShiftedIndex,
      affineZeroCoordinate,
      affineSlopeAbs,
      midpointLinearityGapAbsUpper,
      zeroReplayCoefficientHalfWidth,
      h38ResidualAbsUpper: setup.h38ResidualProfile.max_abs_residual,
    })
  );
  const h38ProducerResidualCoordinateProfile =
    h39H38Y44ProducerResidualCoordinateProfile({
      targetSpeedInterval: resolvedTargetSpeedInterval,
      rows: setup.comparisonRows,
      branch,
      transportProfile: setup.transportProfile,
      residualInterval: setup.h38ResidualProfile.residual_interval_hull,
    });
  const producerCenteredFullHullHalfWidth =
    h39H38Y44ProducerCoordinateFullHullHalfWidth(
      h38ProducerResidualCoordinateProfile
    );
  const h38SolveWidthProfile = h38SolveWidthFactorizationProfileForRows({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    rows: setup.comparisonRows,
    branch,
    transportProfile: setup.transportProfile,
  });
  const h38NumeratorPolynomialDegreeDiagnosticRows =
    h38NumeratorPolynomialDegreeDiagnostics({
      solveWidthProfile: h38SolveWidthProfile,
      degrees: [1, 2, 3],
    });
  const h38NumeratorPolynomialDiagnostic =
    h38NumeratorPolynomialDegreeDiagnosticRows.find(
      (diagnostic) =>
        diagnostic.polynomial_degree === resolvedPolynomialDegree
    ) ?? h38NumeratorPolynomialDegreeDiagnosticRows[0];
  const pressureTargetEnvelopeReplays = pressureTargetEnvelope.map(
    (entry, entryIndex) => {
      emitProgress?.({
        stage: "signed-affine-target-envelope-interval-replay-start",
        pressure_ladder_index: entryIndex,
        label: entry.label,
        h38_noise_interval: entry.clipped_zero_centered_h38_noise_interval,
      });
      const replayEnvelope = h39H38Y44ZeroCenteredIntervalReplay({
        setup,
        branch,
        affineZeroCoordinate,
        halfWidth: entry.candidate_margin_aware_half_width,
        outerRadius: resolvedOuterRadius,
        shiftedIndex: resolvedShiftedIndex,
        variant: `zero-centered-${entry.label}`,
      });
      const replay = replayEnvelope.replay;
      const intervalReplayOverTargetPressure =
        finitePositive(entry.target_pressure)
          ? replay.pressure / entry.target_pressure
          : null;
      const amplificationCorrectionDivisor =
        finitePositive(intervalReplayOverTargetPressure)
          ? Math.max(1, intervalReplayOverTargetPressure)
          : 1;
      const amplificationCorrectedHalfWidth =
        entry.candidate_margin_aware_half_width /
        amplificationCorrectionDivisor;
      const amplificationCorrectedH38NoiseInterval = [
        affineZeroCoordinate - amplificationCorrectedHalfWidth,
        affineZeroCoordinate + amplificationCorrectedHalfWidth,
      ];
      const clippedAmplificationCorrectedH38NoiseInterval = [
        Math.max(-1, amplificationCorrectedH38NoiseInterval[0]),
        Math.min(1, amplificationCorrectedH38NoiseInterval[1]),
      ];
      const correctedEnvelope = h39H38Y44ZeroCenteredIntervalReplay({
        setup,
        branch,
        affineZeroCoordinate,
        halfWidth: amplificationCorrectedHalfWidth,
        outerRadius: resolvedOuterRadius,
        shiftedIndex: resolvedShiftedIndex,
        variant: `amplification-corrected-${entry.label}`,
      });
      const correctedReplay = correctedEnvelope.replay;
      const correctedReplayOverTargetPressure =
        finitePositive(entry.target_pressure)
          ? correctedReplay.pressure / entry.target_pressure
          : null;
      const safetySearch = h39H38Y44ZeroCenteredSafetySearch({
        setup,
        branch,
        affineZeroCoordinate,
        candidateHalfWidth: entry.candidate_margin_aware_half_width,
        targetPressure: entry.target_pressure,
        outerRadius: resolvedOuterRadius,
        shiftedIndex: resolvedShiftedIndex,
        iterations: resolvedSafetySearchIterations,
        label: entry.label,
      });
      const producerCoordinateTargetFit =
        h39H38Y44ProducerCoordinateTargetFit({
          label: entry.label,
          coordinateProfile: h38ProducerResidualCoordinateProfile,
          targetInterval:
            safetySearch.clipped_target_closing_h38_noise_interval ??
            safetySearch.target_closing_h38_noise_interval ??
            pointInterval(affineZeroCoordinate),
        });
      const producerCenteredSafetySearch =
        h39H38Y44ProducerCenteredSafetySearch({
          setup,
          branch,
          coordinateProfile: h38ProducerResidualCoordinateProfile,
          candidateHalfWidth: producerCenteredFullHullHalfWidth,
          targetPressure: entry.target_pressure,
          outerRadius: resolvedOuterRadius,
          shiftedIndex: resolvedShiftedIndex,
          iterations: resolvedSafetySearchIterations,
          label: entry.label,
        });
      const producerCenteredCollarTarget =
        h39H38Y44ProducerCenteredCollarTarget({
          label: entry.label,
          coordinateProfile: h38ProducerResidualCoordinateProfile,
          safetySearch: producerCenteredSafetySearch,
          sourceStencilSubcellCount: resolvedSourceStencilSubcellCount,
        });
      const producerCenteredNumeratorCollarTarget =
        h39H38Y44ProducerCenteredNumeratorCollarTarget({
          label: entry.label,
          coordinateProfile: h38ProducerResidualCoordinateProfile,
          collarTarget: producerCenteredCollarTarget,
          solveWidthProfile: h38SolveWidthProfile,
          numeratorPolynomialDiagnostic:
            h38NumeratorPolynomialDiagnostic,
        });
      emitProgress?.({
        stage: "signed-affine-target-envelope-interval-replay-complete",
        pressure_ladder_index: entryIndex,
        label: entry.label,
        pressure: replay.pressure,
      });
      return {
        ...entry,
        interval_replay_pressure: replay.pressure,
        interval_replay_source_coefficient_interval:
          replay.row_pressure.source_coefficient,
        interval_replay_source_coefficient_abs_upper:
          replay.row_pressure.source_pressure_contribution /
          resolvedOuterRadius ** resolvedShiftedIndex,
        interval_replay_over_target_pressure:
          intervalReplayOverTargetPressure,
        interval_replay_center_eliminated_pressure:
          replay.center_eliminated_pressure,
        interval_replay_center_eliminated_over_target_pressure:
          finitePositive(entry.target_pressure) &&
          finitePositive(replay.center_eliminated_pressure)
            ? replay.center_eliminated_pressure / entry.target_pressure
            : null,
        interval_replay_center_elimination_improvement_factor:
          replay.center_elimination_improvement_factor,
        interval_replay: replay,
        amplification_correction_divisor:
          amplificationCorrectionDivisor,
        amplification_corrected_half_width:
          amplificationCorrectedHalfWidth,
        amplification_corrected_h38_noise_interval:
          amplificationCorrectedH38NoiseInterval,
        clipped_amplification_corrected_h38_noise_interval:
          clippedAmplificationCorrectedH38NoiseInterval,
        amplification_corrected_h38_residual_half_width:
          amplificationCorrectedHalfWidth *
          setup.h38ResidualProfile.max_abs_residual,
        amplification_corrected_interval_replay_pressure:
          correctedReplay.pressure,
        amplification_corrected_interval_replay_over_target_pressure:
          correctedReplayOverTargetPressure,
        amplification_corrected_center_eliminated_pressure:
          correctedReplay.center_eliminated_pressure,
        amplification_corrected_center_eliminated_over_target_pressure:
          finitePositive(entry.target_pressure) &&
          finitePositive(correctedReplay.center_eliminated_pressure)
            ? correctedReplay.center_eliminated_pressure /
              entry.target_pressure
            : null,
        amplification_corrected_center_elimination_improvement_factor:
          correctedReplay.center_elimination_improvement_factor,
        amplification_corrected_interval_replay:
          correctedReplay,
        amplification_corrected_replay_meets_reference_target:
          correctedReplayOverTargetPressure !== null &&
          correctedReplayOverTargetPressure <= 1,
        safety_search: safetySearch,
        producer_coordinate_target_fit: producerCoordinateTargetFit,
        producer_centered_safety_search: producerCenteredSafetySearch,
        producer_centered_collar_target: producerCenteredCollarTarget,
        producer_centered_numerator_collar_target:
          producerCenteredNumeratorCollarTarget,
      };
    }
  );
  const intervalReplayOverTargetRatios = pressureTargetEnvelopeReplays
    .map((entry) => Number(entry.interval_replay_over_target_pressure))
    .filter((value) => Number.isFinite(value) && value > 0);
  const maxIntervalReplayOverTargetPressure =
    intervalReplayOverTargetRatios.length > 0
      ? Math.max(...intervalReplayOverTargetRatios)
      : null;
  const intervalReplayCenterEliminatedOverTargetRatios =
    pressureTargetEnvelopeReplays
      .map((entry) =>
        Number(entry.interval_replay_center_eliminated_over_target_pressure)
      )
      .filter((value) => Number.isFinite(value) && value > 0);
  const maxIntervalReplayCenterEliminatedOverTargetPressure =
    intervalReplayCenterEliminatedOverTargetRatios.length > 0
      ? Math.max(...intervalReplayCenterEliminatedOverTargetRatios)
      : null;
  const nonzeroWidthIntervalReplayOverTargetRatios =
    pressureTargetEnvelopeReplays
      .filter((entry) => Number(entry.candidate_margin_aware_half_width) > 0)
      .map((entry) => Number(entry.interval_replay_over_target_pressure))
      .filter((value) => Number.isFinite(value) && value > 0);
  const maxNonzeroWidthIntervalReplayOverTargetPressure =
    nonzeroWidthIntervalReplayOverTargetRatios.length > 0
      ? Math.max(...nonzeroWidthIntervalReplayOverTargetRatios)
      : null;
  const correctedIntervalReplayOverTargetRatios = pressureTargetEnvelopeReplays
    .map((entry) =>
      Number(entry.amplification_corrected_interval_replay_over_target_pressure)
    )
    .filter((value) => Number.isFinite(value) && value > 0);
  const maxCorrectedIntervalReplayOverTargetPressure =
    correctedIntervalReplayOverTargetRatios.length > 0
      ? Math.max(...correctedIntervalReplayOverTargetRatios)
      : null;
  const correctedCenterEliminatedOverTargetRatios =
    pressureTargetEnvelopeReplays
      .map((entry) =>
        Number(
          entry.amplification_corrected_center_eliminated_over_target_pressure
        )
      )
      .filter((value) => Number.isFinite(value) && value > 0);
  const maxCorrectedCenterEliminatedOverTargetPressure =
    correctedCenterEliminatedOverTargetRatios.length > 0
      ? Math.max(...correctedCenterEliminatedOverTargetRatios)
      : null;
  const correctedNonzeroWidthIntervalReplayOverTargetRatios =
    pressureTargetEnvelopeReplays
      .filter((entry) => Number(entry.candidate_margin_aware_half_width) > 0)
      .map((entry) =>
        Number(
          entry.amplification_corrected_interval_replay_over_target_pressure
        )
      )
      .filter((value) => Number.isFinite(value) && value > 0);
  const maxCorrectedNonzeroWidthIntervalReplayOverTargetPressure =
    correctedNonzeroWidthIntervalReplayOverTargetRatios.length > 0
      ? Math.max(...correctedNonzeroWidthIntervalReplayOverTargetRatios)
      : null;
  const safetyDivisors = pressureTargetEnvelopeReplays
    .filter((entry) => Number(entry.candidate_margin_aware_half_width) > 0)
    .map((entry) => Number(entry.safety_search?.target_closing_safety_divisor))
    .filter((value) => Number.isFinite(value) && value > 0);
  const maxTargetClosingSafetyDivisor =
    safetyDivisors.length > 0 ? Math.max(...safetyDivisors) : null;
  const targetClosingBracketWidths = pressureTargetEnvelopeReplays
    .map((entry) => Number(entry.safety_search?.target_closing_bracket_width))
    .filter((value) => Number.isFinite(value) && value >= 0);
  const maxTargetClosingBracketWidth =
    targetClosingBracketWidths.length > 0
      ? Math.max(...targetClosingBracketWidths)
      : null;
  const safetySearchOverTargetRatios = pressureTargetEnvelopeReplays
    .map((entry) =>
      Number(entry.safety_search?.target_closing_replay_over_target_pressure)
    )
    .filter((value) => Number.isFinite(value) && value > 0);
  const maxSafetySearchReplayOverTargetPressure =
    safetySearchOverTargetRatios.length > 0
      ? Math.max(...safetySearchOverTargetRatios)
      : null;
  const safetySearchCenterEliminatedOverTargetRatios =
    pressureTargetEnvelopeReplays
      .map((entry) =>
        Number(
          entry.safety_search
            ?.target_closing_center_eliminated_over_target_pressure
        )
      )
      .filter((value) => Number.isFinite(value) && value > 0);
  const maxSafetySearchCenterEliminatedOverTargetPressure =
    safetySearchCenterEliminatedOverTargetRatios.length > 0
      ? Math.max(...safetySearchCenterEliminatedOverTargetRatios)
      : null;
  const producerCoordinateTargetFits = pressureTargetEnvelopeReplays
    .map((entry) => entry.producer_coordinate_target_fit)
    .filter(Boolean);
  const requiredIntervalHullShrinkFactors = producerCoordinateTargetFits
    .map((fit) => Number(fit.required_interval_hull_shrink_factor))
    .filter((value) => Number.isFinite(value) && value >= 0);
  const requiredMidpointHullShrinkFactors = producerCoordinateTargetFits
    .map((fit) => Number(fit.required_midpoint_hull_shrink_factor))
    .filter((value) => Number.isFinite(value) && value >= 0);
  const maxRequiredProducerIntervalHullShrinkFactor =
    requiredIntervalHullShrinkFactors.length > 0
      ? Math.max(...requiredIntervalHullShrinkFactors)
      : null;
  const maxRequiredProducerMidpointHullShrinkFactor =
    requiredMidpointHullShrinkFactors.length > 0
      ? Math.max(...requiredMidpointHullShrinkFactors)
      : null;
  const producerCenteredReferenceEntries = pressureTargetEnvelopeReplays.filter(
    (entry) => entry.label.startsWith("reference-pressure-")
  );
  const producerCenteredReferenceCenterRatios =
    producerCenteredReferenceEntries
      .map((entry) =>
        Number(
          entry.producer_centered_safety_search
            ?.center_hull_replay_over_target_pressure
        )
      )
      .filter((value) => Number.isFinite(value) && value > 0);
  const maxProducerCenteredReferenceCenterHullOverTargetPressure =
    producerCenteredReferenceCenterRatios.length > 0
      ? Math.max(...producerCenteredReferenceCenterRatios)
      : null;
  const producerCenteredReferenceTargetRatios =
    producerCenteredReferenceEntries
      .map((entry) =>
        Number(
          entry.producer_centered_safety_search
            ?.target_closing_replay_over_target_pressure
        )
      )
      .filter((value) => Number.isFinite(value) && value > 0);
  const maxProducerCenteredReferenceReplayOverTargetPressure =
    producerCenteredReferenceTargetRatios.length > 0
      ? Math.max(...producerCenteredReferenceTargetRatios)
      : null;
  const producerCenteredReferenceSafetyDivisors =
    producerCenteredReferenceEntries
      .map((entry) =>
        Number(
          entry.producer_centered_safety_search
            ?.target_closing_safety_divisor
        )
      )
      .filter((value) => Number.isFinite(value) && value > 0);
  const maxProducerCenteredReferenceSafetyDivisor =
    producerCenteredReferenceSafetyDivisors.length > 0
      ? Math.max(...producerCenteredReferenceSafetyDivisors)
      : null;
  const producerCenteredReferenceTargetsMetAtCenter =
    producerCenteredReferenceEntries.filter(
      (entry) =>
        Number(
          entry.producer_centered_safety_search
            ?.center_hull_replay_over_target_pressure
        ) <= 1
    ).length;
  const producerCenteredReferenceTargetsClosedBySearch =
    producerCenteredReferenceEntries.filter(
      (entry) =>
        Number(
          entry.producer_centered_safety_search
            ?.target_closing_replay_over_target_pressure
        ) <= 1
    ).length;
  const producerCenteredReferenceCollarTargets =
    producerCenteredReferenceEntries
      .map((entry) => entry.producer_centered_collar_target)
      .filter(Boolean);
  const producerCenteredReferencePositiveCollarCount =
    producerCenteredReferenceCollarTargets.filter(
      (target) => target.positive_collar_found === true
    ).length;
  const producerCenteredReferenceIntervalHullCoveredCount =
    producerCenteredReferenceCollarTargets.filter(
      (target) => target.producer_interval_hull_inside_collar === true
    ).length;
  const producerCenteredReferenceCollarCompressionFactors =
    producerCenteredReferenceCollarTargets
      .map((target) =>
        Number(target.required_interval_hull_compression_factor)
      )
      .filter((value) => Number.isFinite(value) && value > 0);
  const maxProducerCenteredReferenceCollarCompressionFactor =
    producerCenteredReferenceCollarCompressionFactors.length > 0
      ? Math.max(...producerCenteredReferenceCollarCompressionFactors)
      : null;
  const producerCenteredReferenceLinearSubcellForecasts =
    producerCenteredReferenceCollarTargets
      .map((target) => Number(target.linear_subcell_refinement_forecast))
      .filter((value) => Number.isFinite(value) && value > 0);
  const maxProducerCenteredReferenceLinearSubcellForecast =
    producerCenteredReferenceLinearSubcellForecasts.length > 0
      ? Math.max(...producerCenteredReferenceLinearSubcellForecasts)
      : null;
  const producerCenteredReferenceNumeratorCollarTargets =
    producerCenteredReferenceEntries
      .map((entry) => entry.producer_centered_numerator_collar_target)
      .filter(Boolean);
  const producerCenteredReferenceNumeratorGraphInsideCount =
    producerCenteredReferenceNumeratorCollarTargets.filter(
      (target) =>
        target.numerator_midpoint_graph_inside_collar_target === true
    ).length;
  const producerCenteredReferenceNumeratorCompressionFactors =
    producerCenteredReferenceNumeratorCollarTargets
      .map((target) =>
        Number(
          target.max_numerator_interval_compression_to_conservative_target
        )
      )
      .filter((value) => Number.isFinite(value) && value > 0);
  const maxProducerCenteredReferenceNumeratorCompressionFactor =
    producerCenteredReferenceNumeratorCompressionFactors.length > 0
      ? Math.max(...producerCenteredReferenceNumeratorCompressionFactors)
      : null;
  const producerCenteredReferenceNumeratorResidualRatios =
    producerCenteredReferenceNumeratorCollarTargets
      .map((target) =>
        Number(
          target.max_numerator_midpoint_residual_over_conservative_target
        )
      )
      .filter((value) => Number.isFinite(value) && value >= 0);
  const maxProducerCenteredReferenceNumeratorMidpointResidualOverTarget =
    producerCenteredReferenceNumeratorResidualRatios.length > 0
      ? Math.max(...producerCenteredReferenceNumeratorResidualRatios)
      : null;
  const producerCenteredReferenceNumeratorHeadroomFactors =
    producerCenteredReferenceNumeratorCollarTargets
      .map((target) =>
        Number(target.min_numerator_midpoint_residual_headroom_factor)
      )
      .filter((value) => Number.isFinite(value) && value > 0);
  const minProducerCenteredReferenceNumeratorMidpointHeadroom =
    producerCenteredReferenceNumeratorHeadroomFactors.length > 0
      ? Math.min(...producerCenteredReferenceNumeratorHeadroomFactors)
      : null;
  const n38CollarEnclosureRoute =
    h39H38Y44N38CollarEnclosureRoute({
      referenceTargets: producerCenteredReferenceNumeratorCollarTargets,
      numeratorPolynomialDiagnostic: h38NumeratorPolynomialDiagnostic,
      sourceStencilSubcellCount: resolvedSourceStencilSubcellCount,
    });
  const intervalReplayAmplificationInterpretation =
    maxNonzeroWidthIntervalReplayOverTargetPressure !== null &&
    maxNonzeroWidthIntervalReplayOverTargetPressure <= 1
      ? "zero-centered-h38-interval-replay-meets-reference-pressure-ladder"
      : "zero-centered-h38-interval-replay-has-stable-over-target-amplification";
  const amplificationCorrectedReplayInterpretation =
    maxCorrectedNonzeroWidthIntervalReplayOverTargetPressure !== null &&
    maxCorrectedNonzeroWidthIntervalReplayOverTargetPressure <= 1
      ? "amplification-corrected-zero-centered-widths-meet-reference-pressure-ladder"
      : "amplification-corrected-zero-centered-widths-still-exceed-reference-pressure-ladder";
  const safetySearchInterpretation =
    maxSafetySearchReplayOverTargetPressure !== null &&
    maxSafetySearchReplayOverTargetPressure <= 1
      ? "bisection-safety-divisor-finds-reference-meeting-widths"
      : "bisection-safety-divisor-does-not-find-reference-meeting-widths";
  const safetyDivisorOverObservedAmplification =
    finitePositive(maxTargetClosingSafetyDivisor) &&
    finitePositive(maxNonzeroWidthIntervalReplayOverTargetPressure)
      ? maxTargetClosingSafetyDivisor /
        maxNonzeroWidthIntervalReplayOverTargetPressure
      : null;
  const centerEliminatedReplayInterpretation =
    maxIntervalReplayCenterEliminatedOverTargetPressure !== null &&
    maxIntervalReplayCenterEliminatedOverTargetPressure <= 1
      ? "center-eliminated-affine-row-removes-zero-centered-amplification"
      : "center-eliminated-affine-row-still-exceeds-reference-pressure-ladder";
  const producerCoordinateEnvelopeInterpretation =
    producerCoordinateTargetFits.length > 0 &&
    producerCoordinateTargetFits.every(
      (fit) => fit.target_covers_producer_interval_hull === true
    )
      ? "h38-producer-coordinate-hull-fits-signed-affine-safety-envelope"
      : producerCoordinateTargetFits.length > 0 &&
          producerCoordinateTargetFits.every(
            (fit) => fit.target_covers_producer_midpoint_hull === true
          )
        ? "h38-producer-midpoint-hull-fits-but-interval-hull-exceeds-signed-affine-safety-envelope"
        : "h38-producer-coordinate-hull-exceeds-signed-affine-safety-envelope";
  const producerCenteredReplayInterpretation =
    producerCenteredReferenceEntries.length > 0 &&
    producerCenteredReferenceTargetsMetAtCenter ===
      producerCenteredReferenceEntries.length
    ? "producer-midpoint-hull-meets-reference-pressure-targets"
      : producerCenteredReferenceTargetsClosedBySearch > 0
        ? "producer-centered-width-search-closes-some-reference-pressure-targets"
        : "producer-midpoint-hull-exceeds-reference-pressure-targets";
  const producerCenteredCollarInterpretation =
    producerCenteredReferenceCollarTargets.length > 0 &&
    producerCenteredReferenceIntervalHullCoveredCount ===
      producerCenteredReferenceCollarTargets.length
      ? "producer-centered-collars-cover-full-interval-hull"
      : producerCenteredReferencePositiveCollarCount > 0 &&
          finitePositive(
            maxProducerCenteredReferenceLinearSubcellForecast
          ) &&
          maxProducerCenteredReferenceLinearSubcellForecast >= 1e8
        ? "positive-collars-found-but-raw-subcell-refinement-impractical"
        : producerCenteredReferencePositiveCollarCount > 0
          ? "positive-collars-found-for-producer-image-certificate-target"
          : "producer-center-hull-closes-but-positive-collar-open";
  const producerCenteredNumeratorCollarInterpretation =
    producerCenteredReferenceNumeratorCollarTargets.length > 0 &&
    producerCenteredReferenceNumeratorGraphInsideCount ===
      producerCenteredReferenceNumeratorCollarTargets.length
      ? "numerator-midpoint-graph-fits-producer-collar-target"
      : producerCenteredReferenceNumeratorGraphInsideCount > 0
        ? "some-numerator-midpoint-graphs-fit-producer-collar-target"
        : "numerator-midpoint-graph-does-not-yet-fit-producer-collar-target";
  const centerToAffineZeroPressureRatio =
    finitePositive(centerSample.pressure) &&
    finitePositive(affineZeroReplay.pressure)
      ? Number(centerSample.pressure) /
        Number(affineZeroReplay.pressure)
      : null;
  const maxSampleToAffineZeroPressureRatio =
    finitePositive(maxSamplePressure) &&
    finitePositive(affineZeroReplay.pressure)
      ? Number(maxSamplePressure) /
        Number(affineZeroReplay.pressure)
      : null;
  const targetEnvelopeInterpretation =
    maxSampleToAffineZeroPressureRatio !== null &&
    maxSampleToAffineZeroPressureRatio >= 1e6
      ? "signed-affine-zero-localizes-the-y44-h38-obstruction"
      : "signed-affine-zero-does-not-yet-localize-the-y44-h38-obstruction";
  emitProgress?.({
    stage: "signed-affine-target-envelope-summary-ready",
    affine_zero_pressure: affineZeroReplay.pressure,
    center_to_affine_zero_pressure_ratio:
      centerToAffineZeroPressureRatio,
    max_sample_to_affine_zero_pressure_ratio:
      maxSampleToAffineZeroPressureRatio,
  });
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_Y44_SIGNED_AFFINE_TARGET_ENVELOPE_DIAGNOSTIC_SCHEMA,
    status:
      "h39-h38-y44-signed-affine-target-envelope-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-h39-h38-y44-signed-affine-target-envelope-diagnostic",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    shifted_index: resolvedShiftedIndex,
    y_order:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
      resolvedShiftedIndex,
    outer_radius: resolvedOuterRadius,
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    comparison_row_count: setup.comparisonRows.length,
    analysis_cell_id: setup.analysisRow.cell_id,
    analysis_speed_interval: setup.analysisRow.speed_interval,
    analysis_xi_coordinate: setup.noiseCoordinate,
    polynomial_degree: resolvedPolynomialDegree,
    h38_residual_interval:
      setup.h38ResidualProfile.residual_interval_hull,
    h38_residual_abs_upper:
      setup.h38ResidualProfile.max_abs_residual,
    h38_producer_residual_coordinate_profile:
      h38ProducerResidualCoordinateProfile,
    producer_centered_full_hull_half_width:
      producerCenteredFullHullHalfWidth,
    h38_y44_solve_width_profile: h38SolveWidthProfile,
    h38_y44_numerator_polynomial_degree_diagnostics:
      h38NumeratorPolynomialDegreeDiagnosticRows,
    h38_y44_numerator_polynomial_diagnostic:
      h38NumeratorPolynomialDiagnostic,
    h38_noise_samples: resolvedH38NoiseSamples,
    safety_search_iterations: resolvedSafetySearchIterations,
    source_coefficient_affine_fit: affineFit,
    source_coefficient_quadratic_fit: quadraticFit,
    affine_to_quadratic_residual_ratio: affineToQuadraticResidualRatio,
    signed_affine_intercept: affineIntercept,
    signed_affine_slope: affineSlope,
    affine_zero_coordinate: affineZeroCoordinate,
    affine_zero_inside_sample_domain:
      affineZeroCoordinate >= -1 && affineZeroCoordinate <= 1,
    midpoint_linearity_gap_abs_upper: midpointLinearityGapAbsUpper,
    affine_zero_replay: affineZeroReplay,
    center_sample_replay: centerSample,
    max_sample_pressure: maxSamplePressure,
    center_to_affine_zero_pressure_ratio:
      centerToAffineZeroPressureRatio,
    max_sample_to_affine_zero_pressure_ratio:
      maxSampleToAffineZeroPressureRatio,
    affine_zero_source_coefficient_half_width:
      zeroReplayCoefficientHalfWidth,
    candidate_coefficient_margin_abs_upper:
      candidateCoefficientMarginAbsUpper,
    candidate_margin_pressure: candidateMarginPressure,
    pressure_reference_ladder: pressureTargetEnvelopeReplays,
    max_interval_replay_over_target_pressure:
      maxIntervalReplayOverTargetPressure,
    max_interval_replay_center_eliminated_over_target_pressure:
      maxIntervalReplayCenterEliminatedOverTargetPressure,
    max_nonzero_width_interval_replay_over_target_pressure:
      maxNonzeroWidthIntervalReplayOverTargetPressure,
    max_amplification_corrected_interval_replay_over_target_pressure:
      maxCorrectedIntervalReplayOverTargetPressure,
    max_amplification_corrected_center_eliminated_over_target_pressure:
      maxCorrectedCenterEliminatedOverTargetPressure,
    max_amplification_corrected_nonzero_width_interval_replay_over_target_pressure:
      maxCorrectedNonzeroWidthIntervalReplayOverTargetPressure,
    max_target_closing_safety_divisor:
      maxTargetClosingSafetyDivisor,
    safety_divisor_over_observed_amplification:
      safetyDivisorOverObservedAmplification,
    max_target_closing_bracket_width:
      maxTargetClosingBracketWidth,
    max_safety_search_replay_over_target_pressure:
      maxSafetySearchReplayOverTargetPressure,
    max_safety_search_center_eliminated_over_target_pressure:
      maxSafetySearchCenterEliminatedOverTargetPressure,
    max_required_producer_interval_hull_shrink_factor:
      maxRequiredProducerIntervalHullShrinkFactor,
    max_required_producer_midpoint_hull_shrink_factor:
      maxRequiredProducerMidpointHullShrinkFactor,
    max_producer_centered_reference_center_hull_over_target_pressure:
      maxProducerCenteredReferenceCenterHullOverTargetPressure,
    max_producer_centered_reference_replay_over_target_pressure:
      maxProducerCenteredReferenceReplayOverTargetPressure,
    max_producer_centered_reference_safety_divisor:
      maxProducerCenteredReferenceSafetyDivisor,
    producer_centered_reference_target_count:
      producerCenteredReferenceEntries.length,
    producer_centered_reference_targets_met_at_center:
      producerCenteredReferenceTargetsMetAtCenter,
    producer_centered_reference_targets_closed_by_search:
      producerCenteredReferenceTargetsClosedBySearch,
    producer_centered_reference_positive_collar_count:
      producerCenteredReferencePositiveCollarCount,
    producer_centered_reference_interval_hull_covered_count:
      producerCenteredReferenceIntervalHullCoveredCount,
    max_producer_centered_reference_collar_required_interval_hull_compression_factor:
      maxProducerCenteredReferenceCollarCompressionFactor,
    max_producer_centered_reference_collar_linear_subcell_forecast:
      maxProducerCenteredReferenceLinearSubcellForecast,
    producer_centered_reference_numerator_graph_inside_count:
      producerCenteredReferenceNumeratorGraphInsideCount,
    max_producer_centered_reference_numerator_interval_compression_to_conservative_target:
      maxProducerCenteredReferenceNumeratorCompressionFactor,
    max_producer_centered_reference_numerator_midpoint_residual_over_conservative_target:
      maxProducerCenteredReferenceNumeratorMidpointResidualOverTarget,
    min_producer_centered_reference_numerator_midpoint_residual_headroom_factor:
      minProducerCenteredReferenceNumeratorMidpointHeadroom,
    h38_y44_n38_collar_enclosure_route: n38CollarEnclosureRoute,
    interval_replay_amplification_interpretation:
      intervalReplayAmplificationInterpretation,
    amplification_corrected_replay_interpretation:
      amplificationCorrectedReplayInterpretation,
    safety_search_interpretation: safetySearchInterpretation,
    center_eliminated_replay_interpretation:
      centerEliminatedReplayInterpretation,
    producer_coordinate_envelope_interpretation:
      producerCoordinateEnvelopeInterpretation,
    producer_centered_replay_interpretation:
      producerCenteredReplayInterpretation,
    producer_centered_collar_interpretation:
      producerCenteredCollarInterpretation,
    producer_centered_numerator_collar_interpretation:
      producerCenteredNumeratorCollarInterpretation,
    target_envelope_interpretation: targetEnvelopeInterpretation,
    candidate_certificate_route:
      "Upgrade the signed affine h38 residual-coordinate source relation C44(u)=A+B u into a directed-rounded producer-image enclosure that preserves the actual H38 midpoint hull and then carries a local residual-coordinate collar around that image. The producer-centered collar target records the interval-hull compression needed; the pressure ladder is reference-only and does not certify shifted R43 closure.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_h38_y44_coefficient_dependence: false,
      certifies_h38_y44_signed_affine_envelope: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

function h39H38Y44NumeratorCollarTargetSamples(diagnostic) {
  return (diagnostic?.pressure_reference_ladder ?? []).flatMap((entry) => {
    const target = entry.producer_centered_numerator_collar_target;
    return (target?.samples ?? []).map((sample) => ({
      ...sample,
      reference_label: entry.label,
      target_pressure: entry.target_pressure,
      target_status: sample.target_status ?? target.target_status,
      proof_route_interpretation:
        sample.proof_route_interpretation ??
        target.proof_route_interpretation,
      producer_centered_numerator_target_status: target.target_status,
    }));
  });
}

function h39H38Y44SelectControllingNumeratorTarget({
  route,
  targetSamples,
}) {
  const routeSample = route?.controlling_sample ?? null;
  if (routeSample) {
    const matched = targetSamples.find(
      (sample) =>
        sample.reference_label === routeSample.reference_label &&
        sample.cell_id === routeSample.cell_id
    );
    if (matched) {
      return matched;
    }
  }
  return targetSamples.reduce(
    (best, sample) =>
      Number(sample.numerator_midpoint_residual_over_conservative_target) >
      Number(best?.numerator_midpoint_residual_over_conservative_target ?? -1)
        ? sample
        : best,
    null
  );
}

export function buildH39H38Y44N38TerminalEndpointBridgeDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  outerRadius = 0.001,
  shiftedIndex = 1,
  seriesOrder = 60,
  sourceStencilSubcellCount = 32,
  comparisonStencilIndex = 27,
  polynomialDegree = 2,
  h38NoiseSamples = [-1, 0, 1],
  referencePressureTargets = [1e13],
  safetySearchIterations = 8,
  terminalHIndexes = [37, 36, 35],
  residualBudgetTargetShareOfAll = 0.05,
  residualBudgetScales = [0, 0.02, 0.05, 1],
  residualNoiseSamples = [-1, 0, 1],
  residualCoordinatePartitionCount = 8,
  topContributorCount = 8,
  progressCallback = null,
} = {}) {
  const startedAt = Date.now();
  const emitProgress =
    typeof progressCallback === "function"
      ? (progress) =>
          progressCallback({
            diagnostic: "h39-h38-y44-n38-terminal-endpoint-bridge",
            elapsed_ms: Date.now() - startedAt,
            ...progress,
          })
      : null;
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedSourceStencilSubcellCount = assertFinitePositiveInteger(
    "sourceStencilSubcellCount",
    sourceStencilSubcellCount
  );
  if (resolvedSourceStencilSubcellCount < 5) {
    throw new Error("sourceStencilSubcellCount must be at least 5");
  }
  const resolvedComparisonStencilIndex = Number(comparisonStencilIndex);
  if (
    !Number.isInteger(resolvedComparisonStencilIndex) ||
    resolvedComparisonStencilIndex < 0 ||
    resolvedComparisonStencilIndex > resolvedSourceStencilSubcellCount - 5
  ) {
    throw new Error("comparisonStencilIndex must leave five stencil samples");
  }
  const resolvedPolynomialDegree = assertFinitePositiveInteger(
    "polynomialDegree",
    polynomialDegree
  );
  if (resolvedPolynomialDegree > 3) {
    throw new Error("polynomialDegree must be at most 3");
  }
  const resolvedOuterRadius = assertFinitePositiveNumber(
    "outerRadius",
    outerRadius
  );
  const resolvedShiftedIndex = assertFinitePositiveInteger(
    "shiftedIndex",
    shiftedIndex
  );
  const resolvedSeriesOrder = assertFinitePositiveInteger(
    "seriesOrder",
    seriesOrder
  );
  const resolvedResidualBudgetTargetShare =
    assertFinitePositiveNumber(
      "residualBudgetTargetShareOfAll",
      residualBudgetTargetShareOfAll
    );
  if (resolvedResidualBudgetTargetShare >= 1) {
    throw new Error("residualBudgetTargetShareOfAll must be less than 1");
  }
  const resolvedTerminalHIndexes = terminalHIndexes.map((hIndex) => {
    const resolved = Number(hIndex);
    if (!Number.isInteger(resolved) || resolved < 0 || resolved > 38) {
      throw new Error("terminalHIndexes must contain h indexes 0 through 38");
    }
    return resolved;
  });
  const resolvedResidualBudgetScales = [
    ...new Set(residualBudgetScales.map(Number)),
  ].sort((left, right) => left - right);
  if (
    resolvedResidualBudgetScales.length < 2 ||
    resolvedResidualBudgetScales[0] !== 0 ||
    resolvedResidualBudgetScales[resolvedResidualBudgetScales.length - 1] !==
      1 ||
    !resolvedResidualBudgetScales.every(
      (scale) => Number.isFinite(scale) && scale >= 0 && scale <= 1
    )
  ) {
    throw new Error("residualBudgetScales must include 0 and 1 within [0,1]");
  }
  const resolvedResidualNoiseSamples = [
    ...new Set(residualNoiseSamples.map(Number)),
  ].sort((left, right) => left - right);
  if (
    resolvedResidualNoiseSamples.length < 3 ||
    resolvedResidualNoiseSamples[0] !== -1 ||
    resolvedResidualNoiseSamples[resolvedResidualNoiseSamples.length - 1] !==
      1 ||
    !resolvedResidualNoiseSamples.every(
      (sample) => Number.isFinite(sample) && sample >= -1 && sample <= 1
    )
  ) {
    throw new Error("residualNoiseSamples must include -1 and 1 within [-1,1]");
  }
  const resolvedResidualCoordinatePartitionCount =
    assertFinitePositiveInteger(
      "residualCoordinatePartitionCount",
      residualCoordinatePartitionCount
    );
  const resolvedTopContributorCount = assertFinitePositiveInteger(
    "topContributorCount",
    topContributorCount
  );
  emitProgress?.({
    stage: "signed-affine-target-envelope-start",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
  });
  const y44Diagnostic =
    buildH39H38Y44SignedAffineTargetEnvelopeDiagnosticCandidate({
      targetSpeedInterval: resolvedTargetSpeedInterval,
      branch,
      rootSubdivisions,
      outerRadius: resolvedOuterRadius,
      shiftedIndex: resolvedShiftedIndex,
      seriesOrder: resolvedSeriesOrder,
      sourceStencilSubcellCount: resolvedSourceStencilSubcellCount,
      comparisonStencilIndex: resolvedComparisonStencilIndex,
      polynomialDegree: resolvedPolynomialDegree,
      h38NoiseSamples,
      referencePressureTargets,
      safetySearchIterations,
      progressCallback,
    });
  const y44Route = y44Diagnostic.h38_y44_n38_collar_enclosure_route;
  const targetSamples = h39H38Y44NumeratorCollarTargetSamples(y44Diagnostic);
  const controllingTarget = h39H38Y44SelectControllingNumeratorTarget({
    route: y44Route,
    targetSamples,
  });
  const controllingRouteSample = y44Route?.controlling_sample ?? {};
  if (!controllingTarget) {
    throw new Error("terminal endpoint bridge requires a controlling y44 target");
  }
  emitProgress?.({
    stage: "controlling-y44-target-selected",
    cell_id: controllingTarget.cell_id,
    reference_label: controllingTarget.reference_label,
    conservative_numerator_width_target:
      controllingTarget.conservative_numerator_width_target,
  });
  const setup = buildH39H38Y44CoefficientReplaySetup({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    branch,
    rootSubdivisions,
    seriesOrder: resolvedSeriesOrder,
    sourceStencilSubcellCount: resolvedSourceStencilSubcellCount,
    comparisonStencilIndex: resolvedComparisonStencilIndex,
    polynomialDegree: resolvedPolynomialDegree,
  });
  const controllingRow =
    setup.comparisonRows.find(
      (row) => row.cell_id === controllingTarget.cell_id
    ) ?? setup.comparisonRows[0];
  emitProgress?.({
    stage: "terminal-normal-form-row-start",
    cell_id: controllingRow.cell_id,
    speed_interval: controllingRow.speed_interval,
  });
  const terminalRow = terminalGraphRemainderBudgetRow({
    context: setup.context,
    row: controllingRow,
    targetSpeedInterval: resolvedTargetSpeedInterval,
    branch,
    transportProfile: setup.transportProfile,
    residualProfile: setup.residualProfile,
    terminalHIndexes: resolvedTerminalHIndexes,
    residualBudgetTargetShareOfAll: resolvedResidualBudgetTargetShare,
    residualBudgetScales: resolvedResidualBudgetScales,
    residualNoiseSamples: resolvedResidualNoiseSamples,
    residualCoordinatePartitionCount:
      resolvedResidualCoordinatePartitionCount,
    topContributorCount: resolvedTopContributorCount,
  });
  const endpointDiagnostic =
    terminalRow.terminal_graph_shared_residual_graph_endpoint_partition_diagnostic;
  const conservativeTarget = Number(
    controllingTarget.conservative_numerator_width_target
  );
  const midpointSlopeTarget = Number.isFinite(
    Number(controllingTarget.midpoint_slope_numerator_width_target)
  )
    ? Number(controllingTarget.midpoint_slope_numerator_width_target)
    : null;
  const allActiveWidth = Number(
    terminalRow.all_active_reduced_source.full_source_width
  );
  const graphWithNonterminalWidth = Number(
    terminalRow.terminal_graph_with_nonterminal_replay.full_source_width
  );
  const rawIntervalWidth = Number(
    terminalRow.terminal_graph_interval_residual_with_nonterminal_replay
      .full_source_width
  );
  const endpointAffineWidth = Number(
    endpointDiagnostic.max_affine_zeta_envelope_width
  );
  const endpointHullWidth = Number(
    endpointDiagnostic.max_endpoint_partition_hull_width
  );
  const ratioToTarget = (value, target) =>
    finitePositive(value) && finitePositive(target) ? value / target : null;
  const targetShareOfAll = ratioToTarget(conservativeTarget, allActiveWidth);
  const endpointShareOfAll = ratioToTarget(endpointAffineWidth, allActiveWidth);
  const graphWidthToTarget = ratioToTarget(
    graphWithNonterminalWidth,
    conservativeTarget
  );
  const endpointWidthToTarget = ratioToTarget(
    endpointAffineWidth,
    conservativeTarget
  );
  const rawIntervalWidthToTarget = ratioToTarget(
    rawIntervalWidth,
    conservativeTarget
  );
  const endpointWidthToMidpointSlopeTarget = ratioToTarget(
    endpointAffineWidth,
    midpointSlopeTarget
  );
  const graphFitsLiveTarget =
    finitePositive(graphWidthToTarget) && graphWidthToTarget <= 1;
  const endpointFitsLiveTarget =
    finitePositive(endpointWidthToTarget) && endpointWidthToTarget <= 1;
  const bridgeDiagnosis =
    graphFitsLiveTarget && endpointFitsLiveTarget
      ? "terminal-graph-affine-endpoint-provider-fits-live-h39-collar-candidate"
      : graphFitsLiveTarget
        ? "terminal-graph-normal-form-fits-live-h39-collar-but-zeta-envelope-too-wide"
        : "terminal-graph-normal-form-still-exceeds-live-h39-collar";
  emitProgress?.({
    stage: "terminal-normal-form-row-complete",
    cell_id: controllingRow.cell_id,
    bridge_diagnosis: bridgeDiagnosis,
    graph_width_to_target: graphWidthToTarget,
    endpoint_width_to_target: endpointWidthToTarget,
  });
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_Y44_N38_TERMINAL_ENDPOINT_BRIDGE_DIAGNOSTIC_SCHEMA,
    status:
      "h39-h38-y44-n38-terminal-endpoint-bridge-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-h39-h38-y44-n38-terminal-endpoint-bridge-diagnostic",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    shifted_index: resolvedShiftedIndex,
    y_order:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
      resolvedShiftedIndex,
    h38_numerator_y_order: H38_NUMERATOR_Y_ORDER,
    outer_radius: resolvedOuterRadius,
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    comparison_row_count: setup.comparisonRows.length,
    polynomial_degree: resolvedPolynomialDegree,
    terminal_provider_h_indexes: resolvedTerminalHIndexes,
    residual_coordinate_partition_count:
      resolvedResidualCoordinatePartitionCount,
    residual_budget_target_share_of_all:
      resolvedResidualBudgetTargetShare,
    residual_budget_scales: resolvedResidualBudgetScales,
    residual_noise_samples: resolvedResidualNoiseSamples,
    y44_route_diagnosis: y44Route.route_diagnosis,
    y44_s37_dependency_status: y44Route.s37_dependency_status,
    controlling_y44_target: {
      reference_label: controllingTarget.reference_label,
      cell_id: controllingTarget.cell_id,
      xi_midpoint: controllingTarget.xi_midpoint,
      conservative_numerator_width_target: conservativeTarget,
      midpoint_slope_numerator_width_target: midpointSlopeTarget,
      numerator_abs_midpoint_residual:
        controllingTarget.numerator_abs_midpoint_residual,
      numerator_midpoint_residual_over_conservative_target:
        controllingTarget.numerator_midpoint_residual_over_conservative_target,
      target_status:
        controllingTarget.target_status ??
        controllingRouteSample.target_status ??
        controllingTarget.producer_centered_numerator_target_status ??
        null,
      proof_route_interpretation:
        controllingTarget.proof_route_interpretation ??
        controllingRouteSample.proof_route_interpretation ??
        null,
    },
    terminal_normal_form_bridge: {
      cell_id: terminalRow.cell_id,
      speed_interval: terminalRow.speed_interval,
      xi_interval: terminalRow.xi_interval,
      xi_midpoint: terminalRow.xi_midpoint,
      all_active_n38_source_width: allActiveWidth,
      terminal_graph_with_nonterminal_source_width:
        graphWithNonterminalWidth,
      terminal_graph_raw_interval_residual_source_width:
        rawIntervalWidth,
      terminal_graph_endpoint_hull_width: endpointHullWidth,
      terminal_graph_affine_zeta_envelope_width: endpointAffineWidth,
      h39_required_width_share_of_all_active_n38_source:
        targetShareOfAll,
      affine_zeta_envelope_width_share_of_all_active_n38_source:
        endpointShareOfAll,
      terminal_graph_width_to_conservative_h39_target:
        graphWidthToTarget,
      affine_zeta_envelope_width_to_conservative_h39_target:
        endpointWidthToTarget,
      raw_interval_residual_width_to_conservative_h39_target:
        rawIntervalWidthToTarget,
      affine_zeta_envelope_width_to_midpoint_slope_h39_target:
        endpointWidthToMidpointSlopeTarget,
      terminal_graph_fits_live_h39_target: graphFitsLiveTarget,
      affine_zeta_envelope_fits_live_h39_target:
        endpointFitsLiveTarget,
      endpoint_control_candidate:
        endpointDiagnostic.endpoint_control_candidate,
      affine_in_shared_residual_coordinate:
        endpointDiagnostic.affine_in_shared_residual_coordinate,
      endpoint_partition_count:
        endpointDiagnostic.residual_coordinate_partition_count,
      all_endpoint_partition_hulls_under_internal_budget:
        endpointDiagnostic.all_endpoint_partition_hulls_under_target,
      all_affine_zeta_envelopes_under_internal_budget:
        endpointDiagnostic.all_affine_zeta_envelopes_under_target,
      endpoint_partition_route_interpretation:
        endpointDiagnostic.route_interpretation,
    },
    n38_terminal_endpoint_bridge_diagnosis: bridgeDiagnosis,
    candidate_certificate_route:
      "This diagnostic bridges the live H39/y44 numerator collar target to the terminal N38 sigma-eta graph endpoint route on the controlling row. It decides whether the terminal graph normal form is calibrated to the actual shifted R43 obstruction, not only to an internal source-width share. It remains candidate-only until the endpoint provider is directed-rounded and replayed over the full same-domain cover.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_h38_n38_graph_enclosure: false,
      certifies_terminal_row_provider_enclosure: false,
      certifies_n38_terminal_endpoint_bridge: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

export function buildH39CorrelatedResidualWidthDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  outerRadius = 0.001,
  shiftedIndex = 1,
  seriesOrder = 60,
  xiDomain = [-2, 2],
  polynomialDegree = 2,
  polynomialSourceSubcellCount = 4,
  residualSourceSubcellCount = 8,
  noiseSamples = [-2, -1, 0, 1, 2],
  residualNoiseSamples = [-1, -0.5, 0, 0.5, 1],
  residualWidthStartIndexes = [38, 37, 36, 35, 34, 30, 20, 10, 0],
  hFreezeStartIndexes = [38, 20, 10, 0],
} = {}) {
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedXiDomain = numericInterval("xiDomain", xiDomain);
  const resolvedPolynomialDegree = assertFinitePositiveInteger(
    "polynomialDegree",
    polynomialDegree
  );
  if (resolvedPolynomialDegree > 3) {
    throw new Error("polynomialDegree must be at most 3");
  }
  const resolvedPolynomialSourceSubcellCount = assertFinitePositiveInteger(
    "polynomialSourceSubcellCount",
    polynomialSourceSubcellCount
  );
  if (resolvedPolynomialSourceSubcellCount < resolvedPolynomialDegree + 1) {
    throw new Error(
      "polynomialSourceSubcellCount must be at least polynomialDegree + 1"
    );
  }
  const resolvedResidualSourceSubcellCount = assertFinitePositiveInteger(
    "residualSourceSubcellCount",
    residualSourceSubcellCount
  );
  if (
    resolvedResidualSourceSubcellCount < resolvedPolynomialSourceSubcellCount
  ) {
    throw new Error("residualSourceSubcellCount must cover the polynomial source count");
  }
  const resolvedOuterRadius = assertFinitePositiveNumber(
    "outerRadius",
    outerRadius
  );
  const resolvedShiftedIndex = assertFinitePositiveInteger(
    "shiftedIndex",
    shiftedIndex
  );
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder: assertFinitePositiveInteger("seriesOrder", seriesOrder),
  });
  const rowsBySubcellCount = new Map();
  const rowsForSubcellCount = (subcellCount) => {
    if (!rowsBySubcellCount.has(subcellCount)) {
      rowsBySubcellCount.set(
        subcellCount,
        targetRowsForSubcellCount({
          targetSpeedInterval: resolvedTargetSpeedInterval,
          subcellCount,
          rootSubdivisions,
        })
      );
    }
    return rowsBySubcellCount.get(subcellCount);
  };
  const coarseRows = rowsForSubcellCount(1);
  const polynomialSourceRows = rowsForSubcellCount(
    resolvedPolynomialSourceSubcellCount
  );
  const residualSourceRows = rowsForSubcellCount(
    resolvedResidualSourceSubcellCount
  );
  if (coarseRows.length !== 1) {
    throw new Error("correlated residual diagnostic requires exactly one coarse target row");
  }
  if (
    polynomialSourceRows.length !== resolvedPolynomialSourceSubcellCount
  ) {
    throw new Error("correlated residual diagnostic requires a complete polynomial source subcover");
  }
  if (residualSourceRows.length !== resolvedResidualSourceSubcellCount) {
    throw new Error("correlated residual diagnostic requires a complete residual source subcover");
  }
  const coarseRow = coarseRows[0];
  const branchRow = branchRowFor(coarseRow, branch);
  const coarseCell = cellFromCertificateRow(coarseRow);
  const baselineDiagnostic = pressureDiagnosticForRow({
    context,
    row: coarseRow,
    branch,
    outerRadius: resolvedOuterRadius,
    shiftedIndex: resolvedShiftedIndex,
    hFreezeStartIndexes,
  });
  const baselineHRowMidpointReplay =
    baselineDiagnostic.input_family_replays.find(
      (replay) => replay.input_family === "h-row-midpoint"
    ) ?? null;
  const polynomialTransportProfile = hRowPolynomialTransportProfileForRows({
    rows: polynomialSourceRows,
    branch,
    targetSpeedInterval: resolvedTargetSpeedInterval,
    degree: resolvedPolynomialDegree,
  });
  const residualProfile = polynomialGraphProducerIntervalResidualProfileForRows({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    rows: residualSourceRows,
    branch,
    transportProfile: polynomialTransportProfile,
  });
  const midpointResidualDiagnostic = polynomialGraphProducerResidualDiagnostic({
    context,
    coarseRow,
    targetSpeedInterval: resolvedTargetSpeedInterval,
    rows: residualSourceRows,
    branch,
    transportProfile: polynomialTransportProfile,
    solveSlopeInterval: branchRow.h38_solve_slope_interval,
    outerRadius: resolvedOuterRadius,
    shiftedIndex: resolvedShiftedIndex,
    xiDomain: resolvedXiDomain,
  });
  const intervalResidualDiagnostic =
    polynomialGraphProducerIntervalResidualDiagnostic({
      context,
      coarseRow,
      targetSpeedInterval: resolvedTargetSpeedInterval,
      rows: residualSourceRows,
      branch,
      transportProfile: polynomialTransportProfile,
      solveSlopeInterval: branchRow.h38_solve_slope_interval,
      outerRadius: resolvedOuterRadius,
      shiftedIndex: resolvedShiftedIndex,
      xiDomain: resolvedXiDomain,
    });
  const correlatedResidualSampleReplays = noiseSamples.flatMap((noise) =>
    residualNoiseSamples.map((residualNoise) =>
      shiftedPressureReplayForPolynomialGraphCorrelatedResidualPoint({
        context,
        cell: coarseCell,
        branch,
        transportProfile: polynomialTransportProfile,
        noise,
        residualProfile,
        residualNoise,
        solveSlopeInterval: branchRow.h38_solve_slope_interval,
        outerRadius: resolvedOuterRadius,
        shiftedIndex: resolvedShiftedIndex,
      })
    )
  );
  const maxCorrelatedResidualSampleReplay = maxPressureReplay(
    correlatedResidualSampleReplays
  );
  const minCorrelatedResidualSampleReplay = minPressureReplay(
    correlatedResidualSampleReplays
  );
  const maxCorrelatedResidualSamplePressure =
    maxCorrelatedResidualSampleReplay?.pressure ?? null;
  const residualWidthSuffixDiagnostics = residualWidthStartIndexes.map(
    (residualStartIndex) => {
      const suffixReplays = noiseSamples.flatMap((noise) =>
        residualNoiseSamples.map((residualNoise) =>
          shiftedPressureReplayForPolynomialGraphCorrelatedResidualPoint({
            context,
            cell: coarseCell,
            branch,
            transportProfile: polynomialTransportProfile,
            noise,
            residualProfile,
            residualNoise,
            residualStartIndex,
            solveSlopeInterval: branchRow.h38_solve_slope_interval,
            outerRadius: resolvedOuterRadius,
            shiftedIndex: resolvedShiftedIndex,
          })
        )
      );
      const maxReplay = maxPressureReplay(suffixReplays);
      const minReplay = minPressureReplay(suffixReplays);
      return {
        residual_start_index: residualStartIndex,
        suffix_replays: suffixReplays,
        max_suffix_replay: maxReplay,
        min_suffix_replay: minReplay,
        max_suffix_pressure: maxReplay?.pressure ?? null,
        min_suffix_pressure: minReplay?.pressure ?? null,
        suffix_to_full_correlated_pressure_ratio:
          finitePositive(maxReplay?.pressure) &&
          finitePositive(maxCorrelatedResidualSampleReplay?.pressure)
            ? Number(maxReplay.pressure) /
              Number(maxCorrelatedResidualSampleReplay.pressure)
            : null,
      };
    }
  );
  const firstSuffixPressureBelowHalfFull =
    residualWidthSuffixDiagnostics.find(
      (diagnostic) =>
        finitePositive(diagnostic.max_suffix_pressure) &&
        finitePositive(maxCorrelatedResidualSamplePressure) &&
        Number(diagnostic.max_suffix_pressure) <=
          0.5 * Number(maxCorrelatedResidualSamplePressure)
    ) ?? null;
  const worstResidualProfile = residualProfile.reduce((best, residual) =>
    Number(residual.max_abs_residual) >
    Number(best?.max_abs_residual ?? -1)
      ? residual
      : best,
  null);
  const independentPressure = baselineDiagnostic.full_input_replay.pressure;
  const hRowMidpointPressure = baselineHRowMidpointReplay?.pressure ?? null;
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_CORRELATED_RESIDUAL_WIDTH_DIAGNOSTIC_SCHEMA,
    status:
      "h39-correlated-residual-width-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-correlated-residual-width-diagnostic",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    shifted_index: resolvedShiftedIndex,
    y_order:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
      resolvedShiftedIndex,
    outer_radius: resolvedOuterRadius,
    xi_domain: resolvedXiDomain,
    polynomial_degree: resolvedPolynomialDegree,
    polynomial_source_subcell_count: resolvedPolynomialSourceSubcellCount,
    residual_source_subcell_count: resolvedResidualSourceSubcellCount,
    correlated_residual_formula:
      "h_i(xi,eta)=q_i(xi)+c_i+r_i*eta, where [c_i-r_i,c_i+r_i] is the H38 producer interval residual hull.",
    baseline_independent_interval_pressure: independentPressure,
    baseline_h_row_midpoint_pressure: hRowMidpointPressure,
    midpoint_residual_pressure:
      midpointResidualDiagnostic.graph_plus_residual_pressure,
    interval_residual_pressure:
      intervalResidualDiagnostic.graph_plus_interval_residual_pressure,
    noise_samples: noiseSamples,
    residual_noise_samples: residualNoiseSamples,
    residual_width_start_indexes: residualWidthStartIndexes,
    correlated_residual_sample_replays: correlatedResidualSampleReplays,
    max_correlated_residual_sample_replay:
      maxCorrelatedResidualSampleReplay,
    min_correlated_residual_sample_replay:
      minCorrelatedResidualSampleReplay,
    max_correlated_residual_sample_pressure:
      maxCorrelatedResidualSamplePressure,
    min_correlated_residual_sample_pressure:
      minCorrelatedResidualSampleReplay?.pressure ?? null,
    correlated_to_interval_residual_pressure_ratio:
      finitePositive(maxCorrelatedResidualSampleReplay?.pressure) &&
      finitePositive(intervalResidualDiagnostic.graph_plus_interval_residual_pressure)
        ? Number(maxCorrelatedResidualSampleReplay.pressure) /
          Number(intervalResidualDiagnostic.graph_plus_interval_residual_pressure)
        : null,
    interval_to_correlated_residual_pressure_ratio:
      finitePositive(intervalResidualDiagnostic.graph_plus_interval_residual_pressure) &&
      finitePositive(maxCorrelatedResidualSampleReplay?.pressure)
        ? Number(intervalResidualDiagnostic.graph_plus_interval_residual_pressure) /
          Number(maxCorrelatedResidualSampleReplay.pressure)
        : null,
    independent_to_correlated_residual_sample_pressure_ratio:
      finitePositive(independentPressure) &&
      finitePositive(maxCorrelatedResidualSampleReplay?.pressure)
        ? Number(independentPressure) /
          Number(maxCorrelatedResidualSampleReplay.pressure)
        : null,
    midpoint_to_correlated_residual_sample_pressure_ratio:
      finitePositive(midpointResidualDiagnostic.graph_plus_residual_pressure) &&
      finitePositive(maxCorrelatedResidualSampleReplay?.pressure)
        ? Number(midpointResidualDiagnostic.graph_plus_residual_pressure) /
          Number(maxCorrelatedResidualSampleReplay.pressure)
        : null,
    correlated_to_midpoint_residual_sample_pressure_ratio:
      finitePositive(maxCorrelatedResidualSampleReplay?.pressure) &&
      finitePositive(midpointResidualDiagnostic.graph_plus_residual_pressure)
        ? Number(maxCorrelatedResidualSampleReplay.pressure) /
          Number(midpointResidualDiagnostic.graph_plus_residual_pressure)
        : null,
    estimated_full_width_noise_scale_for_midpoint_pressure:
      finitePositive(midpointResidualDiagnostic.graph_plus_residual_pressure) &&
      finitePositive(maxCorrelatedResidualSampleReplay?.pressure)
        ? Number(midpointResidualDiagnostic.graph_plus_residual_pressure) /
          Number(maxCorrelatedResidualSampleReplay.pressure)
        : null,
    residual_width_suffix_diagnostics: residualWidthSuffixDiagnostics,
    first_suffix_pressure_below_half_full:
      firstSuffixPressureBelowHalfFull,
    worst_residual_profile: worstResidualProfile,
    residual_width_diagnosis:
      "This diagnostic tests whether one shared residual-width coordinate keeps the H39 source small before the residual is expanded into independent h-row intervals.",
    candidate_certificate_route:
      "If correlated residual-width samples stay near midpoint scale, the next route is a two-coordinate polynomial graph in xi and residual noise eta; otherwise the residual width direction itself is dynamically dangerous.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_correlated_residual_width_enclosure: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

export function buildH39H38SolveWidthFactorizationDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  outerRadius = 0.001,
  shiftedIndex = 1,
  seriesOrder = 60,
  xiDomain = [-2, 2],
  polynomialDegree = 2,
  polynomialSourceSubcellCount = 4,
  residualSourceSubcellCount = 8,
  noiseSamples = [-2, -1, 0, 1, 2],
  h38NoiseSamples = [-1, -0.5, 0, 0.5, 1],
  hFreezeStartIndexes = [38, 20, 10, 0],
} = {}) {
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedXiDomain = numericInterval("xiDomain", xiDomain);
  const resolvedPolynomialDegree = assertFinitePositiveInteger(
    "polynomialDegree",
    polynomialDegree
  );
  if (resolvedPolynomialDegree > 3) {
    throw new Error("polynomialDegree must be at most 3");
  }
  const resolvedPolynomialSourceSubcellCount = assertFinitePositiveInteger(
    "polynomialSourceSubcellCount",
    polynomialSourceSubcellCount
  );
  if (resolvedPolynomialSourceSubcellCount < resolvedPolynomialDegree + 1) {
    throw new Error(
      "polynomialSourceSubcellCount must be at least polynomialDegree + 1"
    );
  }
  const resolvedResidualSourceSubcellCount = assertFinitePositiveInteger(
    "residualSourceSubcellCount",
    residualSourceSubcellCount
  );
  if (
    resolvedResidualSourceSubcellCount < resolvedPolynomialSourceSubcellCount
  ) {
    throw new Error("residualSourceSubcellCount must cover the polynomial source count");
  }
  const resolvedOuterRadius = assertFinitePositiveNumber(
    "outerRadius",
    outerRadius
  );
  const resolvedShiftedIndex = assertFinitePositiveInteger(
    "shiftedIndex",
    shiftedIndex
  );
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder: assertFinitePositiveInteger("seriesOrder", seriesOrder),
  });
  const rowsBySubcellCount = new Map();
  const rowsForSubcellCount = (subcellCount) => {
    if (!rowsBySubcellCount.has(subcellCount)) {
      rowsBySubcellCount.set(
        subcellCount,
        targetRowsForSubcellCount({
          targetSpeedInterval: resolvedTargetSpeedInterval,
          subcellCount,
          rootSubdivisions,
        })
      );
    }
    return rowsBySubcellCount.get(subcellCount);
  };
  const coarseRows = rowsForSubcellCount(1);
  const polynomialSourceRows = rowsForSubcellCount(
    resolvedPolynomialSourceSubcellCount
  );
  const residualSourceRows = rowsForSubcellCount(
    resolvedResidualSourceSubcellCount
  );
  if (coarseRows.length !== 1) {
    throw new Error("h38 solve-width diagnostic requires exactly one coarse target row");
  }
  if (
    polynomialSourceRows.length !== resolvedPolynomialSourceSubcellCount
  ) {
    throw new Error("h38 solve-width diagnostic requires a complete polynomial source subcover");
  }
  if (residualSourceRows.length !== resolvedResidualSourceSubcellCount) {
    throw new Error("h38 solve-width diagnostic requires a complete residual source subcover");
  }
  const coarseRow = coarseRows[0];
  const branchRow = branchRowFor(coarseRow, branch);
  const coarseCell = cellFromCertificateRow(coarseRow);
  const baselineDiagnostic = pressureDiagnosticForRow({
    context,
    row: coarseRow,
    branch,
    outerRadius: resolvedOuterRadius,
    shiftedIndex: resolvedShiftedIndex,
    hFreezeStartIndexes,
  });
  const baselineHRowMidpointReplay =
    baselineDiagnostic.input_family_replays.find(
      (replay) => replay.input_family === "h-row-midpoint"
    ) ?? null;
  const polynomialTransportProfile = hRowPolynomialTransportProfileForRows({
    rows: polynomialSourceRows,
    branch,
    targetSpeedInterval: resolvedTargetSpeedInterval,
    degree: resolvedPolynomialDegree,
  });
  const residualProfile = polynomialGraphProducerIntervalResidualProfileForRows({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    rows: residualSourceRows,
    branch,
    transportProfile: polynomialTransportProfile,
  });
  const midpointResidualDiagnostic = polynomialGraphProducerResidualDiagnostic({
    context,
    coarseRow,
    targetSpeedInterval: resolvedTargetSpeedInterval,
    rows: residualSourceRows,
    branch,
    transportProfile: polynomialTransportProfile,
    solveSlopeInterval: branchRow.h38_solve_slope_interval,
    outerRadius: resolvedOuterRadius,
    shiftedIndex: resolvedShiftedIndex,
    xiDomain: resolvedXiDomain,
  });
  const intervalResidualDiagnostic =
    polynomialGraphProducerIntervalResidualDiagnostic({
      context,
      coarseRow,
      targetSpeedInterval: resolvedTargetSpeedInterval,
      rows: residualSourceRows,
      branch,
      transportProfile: polynomialTransportProfile,
      solveSlopeInterval: branchRow.h38_solve_slope_interval,
      outerRadius: resolvedOuterRadius,
      shiftedIndex: resolvedShiftedIndex,
      xiDomain: resolvedXiDomain,
    });
  const solveWidthProfile = h38SolveWidthFactorizationProfileForRows({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    rows: residualSourceRows,
    branch,
    transportProfile: polynomialTransportProfile,
  });
  const numeratorPolynomialDegreeDiagnostics =
    h38NumeratorPolynomialDegreeDiagnostics({
      solveWidthProfile,
      degrees: [1, 2, 3],
    });
  const numeratorPolynomialDiagnostic =
    numeratorPolynomialDegreeDiagnostics.find(
      (diagnostic) =>
        diagnostic.polynomial_degree === resolvedPolynomialDegree
    ) ?? numeratorPolynomialDegreeDiagnostics[0];
  const h38ResidualVariantReplays = Object.entries(
    solveWidthProfile.residual_interval_hulls
  ).map(([variant, h38ResidualInterval]) => {
    const sampleReplays = noiseSamples.flatMap((noise) =>
      h38NoiseSamples.map((h38Noise) =>
        shiftedPressureReplayForPolynomialGraphH38ResidualVariantPoint({
          context,
          cell: coarseCell,
          branch,
          transportProfile: polynomialTransportProfile,
          noise,
          residualProfile,
          h38ResidualInterval,
          h38Noise,
          solveSlopeInterval: branchRow.h38_solve_slope_interval,
          outerRadius: resolvedOuterRadius,
          shiftedIndex: resolvedShiftedIndex,
          variant,
        })
      )
    );
    const maxReplay = maxPressureReplay(sampleReplays);
    const minReplay = minPressureReplay(sampleReplays);
    return {
      variant,
      h38_residual_interval: h38ResidualInterval,
      h38_residual_width: intervalWidth(h38ResidualInterval),
      sample_replays: sampleReplays,
      max_replay: maxReplay,
      min_replay: minReplay,
      max_pressure: maxReplay?.pressure ?? null,
      min_pressure: minReplay?.pressure ?? null,
    };
  });
  const replaySummaryByVariant = Object.fromEntries(
    h38ResidualVariantReplays.map((summary) => [summary.variant, summary])
  );
  const fullSolvePressure =
    replaySummaryByVariant.full_solve?.max_pressure ?? null;
  const numeratorOnlyPressure =
    replaySummaryByVariant.numerator_only?.max_pressure ?? null;
  const slopeOnlyPressure =
    replaySummaryByVariant.slope_only?.max_pressure ?? null;
  const midpointSolvePressure =
    replaySummaryByVariant.midpoint_solve?.max_pressure ?? null;
  const dominantReplaySource =
    finitePositive(fullSolvePressure) &&
    finitePositive(numeratorOnlyPressure) &&
    finitePositive(slopeOnlyPressure) &&
    Number(numeratorOnlyPressure) / Number(fullSolvePressure) > 0.8 &&
    Number(numeratorOnlyPressure) > 5 * Number(slopeOnlyPressure)
      ? "h38-recurrence-numerator-width"
      : finitePositive(fullSolvePressure) &&
          finitePositive(numeratorOnlyPressure) &&
          finitePositive(slopeOnlyPressure) &&
          Number(slopeOnlyPressure) / Number(fullSolvePressure) > 0.8 &&
          Number(slopeOnlyPressure) > 5 * Number(numeratorOnlyPressure)
        ? "inherited-solve-slope-width"
        : "mixed-or-hull-center-variation";
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_SOLVE_WIDTH_FACTORIZATION_DIAGNOSTIC_SCHEMA,
    status:
      "h39-h38-solve-width-factorization-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-h38-solve-width-factorization-diagnostic",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    shifted_index: resolvedShiftedIndex,
    y_order:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
      resolvedShiftedIndex,
    outer_radius: resolvedOuterRadius,
    xi_domain: resolvedXiDomain,
    polynomial_degree: resolvedPolynomialDegree,
    polynomial_source_subcell_count: resolvedPolynomialSourceSubcellCount,
    residual_source_subcell_count: resolvedResidualSourceSubcellCount,
    h38_solve_formula:
      "h38=-h38_residual_before_solve/h37_solve_slope_interval before the solved h38 coefficient is inserted.",
    baseline_independent_interval_pressure:
      baselineDiagnostic.full_input_replay.pressure,
    baseline_h_row_midpoint_pressure: baselineHRowMidpointReplay?.pressure ?? null,
    midpoint_residual_pressure:
      midpointResidualDiagnostic.graph_plus_residual_pressure,
    interval_residual_pressure:
      intervalResidualDiagnostic.graph_plus_interval_residual_pressure,
    solve_width_profile: solveWidthProfile,
    h38_numerator_polynomial_degree_diagnostics:
      numeratorPolynomialDegreeDiagnostics,
    h38_numerator_polynomial_diagnostic:
      numeratorPolynomialDiagnostic,
    h38_numerator_midpoint_residual_to_interval_width_ratio:
      numeratorPolynomialDiagnostic
        ?.midpoint_residual_to_numerator_width_ratio ?? null,
    noise_samples: noiseSamples,
    h38_noise_samples: h38NoiseSamples,
    h38_residual_variant_replays: h38ResidualVariantReplays,
    baseline_h38_width_only_pressure: fullSolvePressure,
    slope_midpoint_h38_width_pressure: numeratorOnlyPressure,
    numerator_midpoint_h38_width_pressure: slopeOnlyPressure,
    both_midpoint_h38_pressure: midpointSolvePressure,
    max_full_solve_h38_residual_pressure: fullSolvePressure,
    max_numerator_only_h38_residual_pressure: numeratorOnlyPressure,
    max_slope_only_h38_residual_pressure: slopeOnlyPressure,
    max_midpoint_solve_h38_residual_pressure: midpointSolvePressure,
    baseline_to_slope_midpoint_pressure_ratio:
      finitePositive(fullSolvePressure) && finitePositive(numeratorOnlyPressure)
        ? Number(fullSolvePressure) / Number(numeratorOnlyPressure)
        : null,
    baseline_to_numerator_midpoint_pressure_ratio:
      finitePositive(fullSolvePressure) && finitePositive(slopeOnlyPressure)
        ? Number(fullSolvePressure) / Number(slopeOnlyPressure)
        : null,
    baseline_to_both_midpoint_pressure_ratio:
      finitePositive(fullSolvePressure) && finitePositive(midpointSolvePressure)
        ? Number(fullSolvePressure) / Number(midpointSolvePressure)
        : null,
    numerator_only_to_full_solve_h38_pressure_ratio:
      finitePositive(numeratorOnlyPressure) && finitePositive(fullSolvePressure)
        ? Number(numeratorOnlyPressure) / Number(fullSolvePressure)
        : null,
    slope_only_to_full_solve_h38_pressure_ratio:
      finitePositive(slopeOnlyPressure) && finitePositive(fullSolvePressure)
        ? Number(slopeOnlyPressure) / Number(fullSolvePressure)
        : null,
    full_solve_to_midpoint_solve_h38_pressure_ratio:
      finitePositive(fullSolvePressure) && finitePositive(midpointSolvePressure)
        ? Number(fullSolvePressure) / Number(midpointSolvePressure)
        : null,
    full_solve_to_midpoint_residual_pressure_ratio:
      finitePositive(fullSolvePressure) &&
      finitePositive(midpointResidualDiagnostic.graph_plus_residual_pressure)
        ? Number(fullSolvePressure) /
          Number(midpointResidualDiagnostic.graph_plus_residual_pressure)
        : null,
    dominant_h38_solve_width_source:
      solveWidthProfile.dominant_solve_width_source,
    dominant_h38_replay_source: dominantReplaySource,
    h38_solve_width_diagnosis:
      "This diagnostic decomposes the H38 solved h38 interval into recurrence numerator width, inherited solve-slope width, and full solve width before H39 shifted-source replay.",
    candidate_certificate_route:
      "If numerator-only width tracks the full H39 pressure, the next certificate should factor or graph the h38 recurrence numerator before division by the inherited slope; if slope-only tracks it, the inherited slope needs a dependency-preserving bound.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_h38_solve_width_factorization: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

export function buildH39H38NumeratorGraphSolveDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  outerRadius = 0.001,
  shiftedIndex = 1,
  seriesOrder = 60,
  xiDomain = [-2, 2],
  polynomialDegree = 2,
  polynomialSourceSubcellCount = 4,
  residualSourceSubcellCount = 8,
  noiseSamples = [-2, -1, 0, 1, 2],
  numeratorNoiseSamples = [-1, -0.5, 0, 0.5, 1],
  hFreezeStartIndexes = [38, 20, 10, 0],
} = {}) {
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedXiDomain = numericInterval("xiDomain", xiDomain);
  const resolvedPolynomialDegree = assertFinitePositiveInteger(
    "polynomialDegree",
    polynomialDegree
  );
  if (resolvedPolynomialDegree > 3) {
    throw new Error("polynomialDegree must be at most 3");
  }
  const resolvedPolynomialSourceSubcellCount = assertFinitePositiveInteger(
    "polynomialSourceSubcellCount",
    polynomialSourceSubcellCount
  );
  if (resolvedPolynomialSourceSubcellCount < resolvedPolynomialDegree + 1) {
    throw new Error(
      "polynomialSourceSubcellCount must be at least polynomialDegree + 1"
    );
  }
  const resolvedResidualSourceSubcellCount = assertFinitePositiveInteger(
    "residualSourceSubcellCount",
    residualSourceSubcellCount
  );
  if (
    resolvedResidualSourceSubcellCount < resolvedPolynomialSourceSubcellCount
  ) {
    throw new Error("residualSourceSubcellCount must cover the polynomial source count");
  }
  const resolvedOuterRadius = assertFinitePositiveNumber(
    "outerRadius",
    outerRadius
  );
  const resolvedShiftedIndex = assertFinitePositiveInteger(
    "shiftedIndex",
    shiftedIndex
  );
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder: assertFinitePositiveInteger("seriesOrder", seriesOrder),
  });
  const rowsBySubcellCount = new Map();
  const rowsForSubcellCount = (subcellCount) => {
    if (!rowsBySubcellCount.has(subcellCount)) {
      rowsBySubcellCount.set(
        subcellCount,
        targetRowsForSubcellCount({
          targetSpeedInterval: resolvedTargetSpeedInterval,
          subcellCount,
          rootSubdivisions,
        })
      );
    }
    return rowsBySubcellCount.get(subcellCount);
  };
  const coarseRows = rowsForSubcellCount(1);
  const polynomialSourceRows = rowsForSubcellCount(
    resolvedPolynomialSourceSubcellCount
  );
  const residualSourceRows = rowsForSubcellCount(
    resolvedResidualSourceSubcellCount
  );
  if (coarseRows.length !== 1) {
    throw new Error("h38 numerator graph diagnostic requires exactly one coarse target row");
  }
  if (
    polynomialSourceRows.length !== resolvedPolynomialSourceSubcellCount
  ) {
    throw new Error("h38 numerator graph diagnostic requires a complete polynomial source subcover");
  }
  if (residualSourceRows.length !== resolvedResidualSourceSubcellCount) {
    throw new Error("h38 numerator graph diagnostic requires a complete residual source subcover");
  }
  const coarseRow = coarseRows[0];
  const branchRow = branchRowFor(coarseRow, branch);
  const coarseCell = cellFromCertificateRow(coarseRow);
  const baselineDiagnostic = pressureDiagnosticForRow({
    context,
    row: coarseRow,
    branch,
    outerRadius: resolvedOuterRadius,
    shiftedIndex: resolvedShiftedIndex,
    hFreezeStartIndexes,
  });
  const baselineHRowMidpointReplay =
    baselineDiagnostic.input_family_replays.find(
      (replay) => replay.input_family === "h-row-midpoint"
    ) ?? null;
  const polynomialTransportProfile = hRowPolynomialTransportProfileForRows({
    rows: polynomialSourceRows,
    branch,
    targetSpeedInterval: resolvedTargetSpeedInterval,
    degree: resolvedPolynomialDegree,
  });
  const residualProfile = polynomialGraphProducerIntervalResidualProfileForRows({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    rows: residualSourceRows,
    branch,
    transportProfile: polynomialTransportProfile,
  });
  const midpointResidualDiagnostic = polynomialGraphProducerResidualDiagnostic({
    context,
    coarseRow,
    targetSpeedInterval: resolvedTargetSpeedInterval,
    rows: residualSourceRows,
    branch,
    transportProfile: polynomialTransportProfile,
    solveSlopeInterval: branchRow.h38_solve_slope_interval,
    outerRadius: resolvedOuterRadius,
    shiftedIndex: resolvedShiftedIndex,
    xiDomain: resolvedXiDomain,
  });
  const solveWidthProfile = h38SolveWidthFactorizationProfileForRows({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    rows: residualSourceRows,
    branch,
    transportProfile: polynomialTransportProfile,
  });
  const numeratorPolynomialDegreeDiagnostics =
    h38NumeratorPolynomialDegreeDiagnostics({
      solveWidthProfile,
      degrees: [1, 2, 3],
    });
  const numeratorPolynomialDiagnostic =
    numeratorPolynomialDegreeDiagnostics.find(
      (diagnostic) =>
        diagnostic.polynomial_degree === resolvedPolynomialDegree
    ) ?? numeratorPolynomialDegreeDiagnostics[0];
  const numeratorResidualProfile = h38NumeratorGraphResidualProfile({
    solveWidthProfile,
    numeratorPolynomialDiagnostic,
  });
  const replayVariants = [
    {
      variant: "numerator-graph-only-slope-midpoint",
      residual_interval: [0, 0],
      slope_mode: "midpoint",
    },
    {
      variant: "numerator-graph-only-slope-interval",
      residual_interval: [0, 0],
      slope_mode: "interval",
    },
    {
      variant: "numerator-graph-midpoint-residual-slope-midpoint",
      residual_interval: numeratorResidualProfile.midpoint_residual_hull,
      slope_mode: "midpoint",
    },
    {
      variant: "numerator-graph-midpoint-residual-slope-interval",
      residual_interval: numeratorResidualProfile.midpoint_residual_hull,
      slope_mode: "interval",
    },
    {
      variant: "numerator-graph-interval-residual-slope-interval",
      residual_interval: numeratorResidualProfile.interval_residual_hull,
      slope_mode: "interval",
    },
  ];
  const numeratorGraphVariantReplays = replayVariants.map((variant) => {
    const sampleReplays = noiseSamples.flatMap((noise) =>
      numeratorNoiseSamples.map((numeratorNoise) =>
        shiftedPressureReplayForNumeratorGraphPoint({
          context,
          cell: coarseCell,
          branch,
          transportProfile: polynomialTransportProfile,
          noise,
          residualProfile,
          numeratorCoefficients: numeratorPolynomialDiagnostic.coefficients,
          numeratorResidualInterval: variant.residual_interval,
          numeratorNoise,
          slopeInterval: branchRow.h38_solve_slope_interval,
          slopeMode: variant.slope_mode,
          solveSlopeInterval: branchRow.h38_solve_slope_interval,
          outerRadius: resolvedOuterRadius,
          shiftedIndex: resolvedShiftedIndex,
          variant: variant.variant,
        })
      )
    );
    const maxReplay = maxPressureReplay(sampleReplays);
    const minReplay = minPressureReplay(sampleReplays);
    return {
      variant: variant.variant,
      numerator_residual_interval: variant.residual_interval,
      numerator_residual_width: intervalWidth(variant.residual_interval),
      slope_mode: variant.slope_mode,
      sample_replays: sampleReplays,
      max_replay: maxReplay,
      min_replay: minReplay,
      max_pressure: maxReplay?.pressure ?? null,
      min_pressure: minReplay?.pressure ?? null,
      max_h38_width: Math.max(
        ...sampleReplays.map((replay) => intervalWidth(replay.h38_interval))
      ),
    };
  });
  const variantByName = Object.fromEntries(
    numeratorGraphVariantReplays.map((variant) => [
      variant.variant,
      variant,
    ])
  );
  const graphOnlyPressure =
    variantByName["numerator-graph-only-slope-midpoint"]?.max_pressure ?? null;
  const graphOnlySlopeIntervalPressure =
    variantByName["numerator-graph-only-slope-interval"]?.max_pressure ?? null;
  const midpointResidualPressure =
    variantByName["numerator-graph-midpoint-residual-slope-midpoint"]
      ?.max_pressure ?? null;
  const midpointResidualSlopeIntervalPressure =
    variantByName["numerator-graph-midpoint-residual-slope-interval"]
      ?.max_pressure ?? null;
  const intervalResidualPressure =
    variantByName["numerator-graph-interval-residual-slope-interval"]
      ?.max_pressure ?? null;
  const h38OnlyFullSolveReplays = noiseSamples.flatMap((noise) =>
    numeratorNoiseSamples.map((h38Noise) =>
      shiftedPressureReplayForPolynomialGraphH38ResidualVariantPoint({
        context,
        cell: coarseCell,
        branch,
        transportProfile: polynomialTransportProfile,
        noise,
        residualProfile,
        h38ResidualInterval: solveWidthProfile.residual_interval_hulls.full_solve,
        h38Noise,
        solveSlopeInterval: branchRow.h38_solve_slope_interval,
        outerRadius: resolvedOuterRadius,
        shiftedIndex: resolvedShiftedIndex,
        variant: "h38-full-solve-width-reference",
      })
    )
  );
  const h38OnlyFullSolveReplay = maxPressureReplay(h38OnlyFullSolveReplays);
  const h38OnlyFullSolvePressure =
    h38OnlyFullSolveReplay?.pressure ?? null;
  const graphFullSlopeH38Width =
    variantByName["numerator-graph-only-slope-interval"]?.max_h38_width ??
    null;
  const graphSlopeMidpointH38Width =
    variantByName["numerator-graph-only-slope-midpoint"]?.max_h38_width ??
    null;
  const numeratorGraphDiagnosis =
    finitePositive(midpointResidualPressure) &&
    finitePositive(intervalResidualPressure) &&
    Number(intervalResidualPressure) >
      1e6 * Number(midpointResidualPressure)
      ? "numerator-interval-hull-artifact"
      : finitePositive(midpointResidualPressure) &&
          finitePositive(intervalResidualPressure) &&
          Number(intervalResidualPressure) <=
            10 * Number(midpointResidualPressure)
        ? "numerator-interval-route-promising"
        : "mixed-numerator-graph-route";
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_NUMERATOR_GRAPH_SOLVE_DIAGNOSTIC_SCHEMA,
    status:
      "h39-h38-numerator-graph-solve-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-h38-numerator-graph-solve-diagnostic",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    shifted_index: resolvedShiftedIndex,
    y_order:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
      resolvedShiftedIndex,
    outer_radius: resolvedOuterRadius,
    xi_domain: resolvedXiDomain,
    polynomial_degree: resolvedPolynomialDegree,
    polynomial_source_subcell_count: resolvedPolynomialSourceSubcellCount,
    residual_source_subcell_count: resolvedResidualSourceSubcellCount,
    numerator_solve_formula:
      "N38=h38_residual_before_solve and h38=-N38/h37_solve_slope_interval; this diagnostic graphs N38 before solving for h38.",
    baseline_independent_interval_pressure:
      baselineDiagnostic.full_input_replay.pressure,
    baseline_h_row_midpoint_pressure: baselineHRowMidpointReplay?.pressure ?? null,
    midpoint_residual_pressure:
      midpointResidualDiagnostic.graph_plus_residual_pressure,
    h38_only_full_solve_pressure: h38OnlyFullSolvePressure,
    h38_numerator_polynomial_degree_diagnostics:
      numeratorPolynomialDegreeDiagnostics,
    h38_numerator_polynomial_diagnostic:
      numeratorPolynomialDiagnostic,
    h38_numerator_graph_residual_profile:
      numeratorResidualProfile,
    noise_samples: noiseSamples,
    numerator_noise_samples: numeratorNoiseSamples,
    numerator_graph_variant_replays: numeratorGraphVariantReplays,
    max_numerator_graph_only_pressure: graphOnlyPressure,
    max_numerator_graph_only_slope_interval_pressure:
      graphOnlySlopeIntervalPressure,
    max_numerator_graph_midpoint_residual_pressure:
      midpointResidualPressure,
    max_numerator_graph_midpoint_residual_slope_interval_pressure:
      midpointResidualSlopeIntervalPressure,
    max_numerator_graph_interval_residual_pressure:
      intervalResidualPressure,
    graph_solve_to_full_solve_h39_pressure_ratio:
      finitePositive(graphOnlyPressure) && finitePositive(h38OnlyFullSolvePressure)
        ? Number(graphOnlyPressure) / Number(h38OnlyFullSolvePressure)
        : null,
    graph_plus_residual_hull_to_full_solve_h39_pressure_ratio:
      finitePositive(intervalResidualPressure) &&
      finitePositive(h38OnlyFullSolvePressure)
        ? Number(intervalResidualPressure) / Number(h38OnlyFullSolvePressure)
        : null,
    correlated_residual_to_full_solve_h39_pressure_ratio:
      finitePositive(midpointResidualPressure) &&
      finitePositive(h38OnlyFullSolvePressure)
        ? Number(midpointResidualPressure) / Number(h38OnlyFullSolvePressure)
        : null,
    graph_plus_residual_hull_to_correlated_residual_pressure_ratio:
      finitePositive(intervalResidualPressure) &&
      finitePositive(midpointResidualPressure)
        ? Number(intervalResidualPressure) / Number(midpointResidualPressure)
        : null,
    graph_full_slope_to_graph_slope_midpoint_pressure_ratio:
      finitePositive(graphOnlySlopeIntervalPressure) &&
      finitePositive(graphOnlyPressure)
        ? Number(graphOnlySlopeIntervalPressure) / Number(graphOnlyPressure)
        : null,
    graph_full_slope_h38_width: graphFullSlopeH38Width,
    graph_slope_midpoint_h38_width: graphSlopeMidpointH38Width,
    graph_full_slope_to_graph_slope_midpoint_width_ratio:
      finitePositive(graphFullSlopeH38Width) &&
      finitePositive(graphSlopeMidpointH38Width)
        ? Number(graphFullSlopeH38Width) / Number(graphSlopeMidpointH38Width)
        : null,
    graph_full_slope_to_full_solve_width_ratio:
      finitePositive(graphFullSlopeH38Width) &&
      finitePositive(
        solveWidthProfile.max_solve_widths?.reconstructed_full_solve
      )
        ? Number(graphFullSlopeH38Width) /
          Number(solveWidthProfile.max_solve_widths.reconstructed_full_solve)
        : null,
    interval_to_midpoint_numerator_graph_pressure_ratio:
      finitePositive(intervalResidualPressure) &&
      finitePositive(midpointResidualPressure)
        ? Number(intervalResidualPressure) / Number(midpointResidualPressure)
        : null,
    full_solve_to_midpoint_numerator_graph_pressure_ratio:
      finitePositive(h38OnlyFullSolvePressure) &&
      finitePositive(midpointResidualPressure)
        ? Number(h38OnlyFullSolvePressure) / Number(midpointResidualPressure)
        : null,
    independent_to_midpoint_numerator_graph_pressure_ratio:
      finitePositive(baselineDiagnostic.full_input_replay.pressure) &&
      finitePositive(midpointResidualPressure)
        ? Number(baselineDiagnostic.full_input_replay.pressure) /
          Number(midpointResidualPressure)
        : null,
    midpoint_residual_to_h39_midpoint_pressure_ratio:
      finitePositive(midpointResidualPressure) &&
      finitePositive(baselineHRowMidpointReplay?.pressure)
        ? Number(midpointResidualPressure) /
          Number(baselineHRowMidpointReplay.pressure)
        : null,
    numerator_graph_diagnosis: numeratorGraphDiagnosis,
    candidate_certificate_route:
      "A midpoint-residual numerator graph is a closure route only if it can be upgraded to directed-rounded interval arithmetic without returning to the raw N38 interval hull.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_h38_numerator_graph_enclosure: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

function numeratorResidualBudgetSummary(diagnostic) {
  const residualProfile = diagnostic.h38_numerator_graph_residual_profile;
  const rawResidualWidth = residualProfile.interval_residual_width;
  const midpointResidualWidth = residualProfile.midpoint_residual_width;
  const graphPressure =
    diagnostic.max_numerator_graph_only_slope_interval_pressure ??
    diagnostic.max_numerator_graph_only_pressure;
  const hullPressure = diagnostic.max_numerator_graph_interval_residual_pressure;
  const targetPressure = diagnostic.baseline_h_row_midpoint_pressure;
  const allowedFraction =
    finitePositive(targetPressure) &&
    finitePositive(graphPressure) &&
    finitePositive(hullPressure) &&
    Number(targetPressure) > Number(graphPressure) &&
    Number(hullPressure) > Number(graphPressure)
      ? (Number(targetPressure) - Number(graphPressure)) /
        (Number(hullPressure) - Number(graphPressure))
      : null;
  const allowedResidualWidth =
    finitePositive(allowedFraction) && finitePositive(rawResidualWidth)
      ? Number(rawResidualWidth) * Number(allowedFraction)
      : null;
  const requiredResidualShrinkFactor =
    finitePositive(rawResidualWidth) && finitePositive(allowedResidualWidth)
      ? Number(rawResidualWidth) / Number(allowedResidualWidth)
      : null;
  return {
    residual_subcell_count: diagnostic.residual_source_subcell_count,
    polynomial_source_subcell_count:
      diagnostic.polynomial_source_subcell_count,
    graph_pressure: diagnostic.max_numerator_graph_only_pressure,
    graph_slope_interval_pressure:
      diagnostic.max_numerator_graph_only_slope_interval_pressure,
    midpoint_residual_pressure:
      diagnostic.max_numerator_graph_midpoint_residual_pressure,
    raw_interval_residual_pressure:
      diagnostic.max_numerator_graph_interval_residual_pressure,
    h_row_midpoint_target_pressure: targetPressure,
    raw_numerator_interval_residual_width: rawResidualWidth,
    midpoint_numerator_residual_width: midpointResidualWidth,
    allowed_numerator_residual_fraction_for_h_row_midpoint_scale:
      allowedFraction,
    allowed_numerator_residual_width_for_h_row_midpoint_scale:
      allowedResidualWidth,
    required_residual_shrink_factor_for_h_row_midpoint_scale:
      requiredResidualShrinkFactor,
    midpoint_residual_width_to_allowed_budget_ratio:
      finitePositive(midpointResidualWidth) && finitePositive(allowedResidualWidth)
        ? Number(midpointResidualWidth) / Number(allowedResidualWidth)
        : null,
    raw_interval_residual_width_to_numerator_width_ratio:
      residualProfile.interval_residual_hull_to_numerator_width_ratio,
    midpoint_residual_width_to_numerator_width_ratio:
      residualProfile.midpoint_residual_hull_to_numerator_width_ratio,
    graph_interval_to_numerator_width_ratio:
      residualProfile.graph_interval_to_numerator_width_ratio,
    interval_to_midpoint_pressure_ratio:
      diagnostic.interval_to_midpoint_numerator_graph_pressure_ratio,
    graph_to_full_solve_pressure_ratio:
      diagnostic.graph_solve_to_full_solve_h39_pressure_ratio,
  };
}

export function buildH39H38NumeratorGraphResidualBudgetDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  outerRadius = 0.001,
  shiftedIndex = 1,
  seriesOrder = 60,
  xiDomain = [-2, 2],
  polynomialDegree = 2,
  subcellCounts = [4, 8, 16],
  noiseSamples = [-2, 0, 2],
  numeratorNoiseSamples = [-1, 0, 1],
  hFreezeStartIndexes = [38, 20, 10, 0],
} = {}) {
  const resolvedSubcellCounts = [...new Set(subcellCounts)].map((count) =>
    assertFinitePositiveInteger("subcellCounts", count)
  );
  if (resolvedSubcellCounts.length < 2) {
    throw new Error("subcellCounts must contain at least two entries");
  }
  const resolvedPolynomialDegree = assertFinitePositiveInteger(
    "polynomialDegree",
    polynomialDegree
  );
  if (resolvedPolynomialDegree > 3) {
    throw new Error("polynomialDegree must be at most 3");
  }
  resolvedSubcellCounts.sort((left, right) => left - right);
  if (resolvedSubcellCounts[0] < resolvedPolynomialDegree + 1) {
    throw new Error("subcellCounts must all cover polynomialDegree + 1");
  }
  const sweepDiagnostics = resolvedSubcellCounts.map((subcellCount) =>
    buildH39H38NumeratorGraphSolveDiagnosticCandidate({
      targetSpeedInterval,
      branch,
      rootSubdivisions,
      outerRadius,
      shiftedIndex,
      seriesOrder,
      xiDomain,
      polynomialDegree: resolvedPolynomialDegree,
      polynomialSourceSubcellCount: subcellCount,
      residualSourceSubcellCount: subcellCount,
      noiseSamples,
      numeratorNoiseSamples,
      hFreezeStartIndexes,
    })
  );
  const residualBudgetSummaries = sweepDiagnostics.map(
    numeratorResidualBudgetSummary
  );
  const intervalPressureScalingSummary = residualPressureScalingSummary({
    diagnostics: residualBudgetSummaries,
    pressureKey: "raw_interval_residual_pressure",
    targetPressure: residualBudgetSummaries[0]?.h_row_midpoint_target_pressure,
  });
  const residualWidthScalingSummary = residualPressureScalingSummary({
    diagnostics: residualBudgetSummaries,
    pressureKey: "raw_numerator_interval_residual_width",
    targetPressure:
      residualBudgetSummaries[0]
        ?.allowed_numerator_residual_width_for_h_row_midpoint_scale,
  });
  const maxRequiredShrinkFactor = Math.max(
    ...residualBudgetSummaries
      .map((summary) =>
        Number(summary.required_residual_shrink_factor_for_h_row_midpoint_scale)
      )
      .filter((value) => Number.isFinite(value))
  );
  const maxMidpointWidthToAllowedBudgetRatio = Math.max(
    ...residualBudgetSummaries
      .map((summary) =>
        Number(summary.midpoint_residual_width_to_allowed_budget_ratio)
      )
      .filter((value) => Number.isFinite(value))
  );
  const diagnosis =
    finitePositive(maxRequiredShrinkFactor) &&
    finitePositive(maxMidpointWidthToAllowedBudgetRatio) &&
    Number(maxRequiredShrinkFactor) > 1e6 &&
    Number(maxMidpointWidthToAllowedBudgetRatio) < 1
      ? "n38-taylor-remainder-budget-route"
      : "n38-residual-budget-mixed";
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_NUMERATOR_GRAPH_RESIDUAL_BUDGET_DIAGNOSTIC_SCHEMA,
    status:
      "h39-h38-numerator-graph-residual-budget-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-h38-numerator-graph-residual-budget-diagnostic",
    target_speed_interval: numericInterval(
      "targetSpeedInterval",
      targetSpeedInterval
    ),
    branch,
    shifted_index: assertFinitePositiveInteger("shiftedIndex", shiftedIndex),
    y_order:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
      assertFinitePositiveInteger("shiftedIndex", shiftedIndex),
    outer_radius: assertFinitePositiveNumber("outerRadius", outerRadius),
    xi_domain: numericInterval("xiDomain", xiDomain),
    polynomial_degree: resolvedPolynomialDegree,
    subcell_counts: resolvedSubcellCounts,
    residual_budget_summaries: residualBudgetSummaries,
    interval_pressure_scaling_summary: intervalPressureScalingSummary,
    residual_width_scaling_summary: residualWidthScalingSummary,
    max_required_residual_shrink_factor_for_h_row_midpoint_scale:
      maxRequiredShrinkFactor,
    max_midpoint_residual_width_to_allowed_budget_ratio:
      maxMidpointWidthToAllowedBudgetRatio,
    numerator_residual_budget_diagnosis: diagnosis,
    candidate_certificate_route:
      "The N38 Taylor/enclosure provider does not need to shrink the residual to midpoint-zero; it needs a dependency-preserving numerator residual width below the h-row-midpoint pressure budget before the h38 solve is formed.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_h38_numerator_graph_enclosure: false,
      certifies_n38_taylor_remainder_bound: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

function localN38PartitionRows({
  rows,
  partitionCount,
  partitionIndex,
}) {
  const sortedRows = rows
    .slice()
    .sort(
      (left, right) =>
        Number(left.speed_interval?.[0] ?? 0) -
        Number(right.speed_interval?.[0] ?? 0)
    );
  if (sortedRows.length % partitionCount !== 0) {
    throw new Error("fineSubcellCount must be divisible by partitionCount");
  }
  const partitionSize = sortedRows.length / partitionCount;
  return sortedRows.slice(
    partitionIndex * partitionSize,
    (partitionIndex + 1) * partitionSize
  );
}

function localN38PartitionDiagnostic({
  context,
  coarseCell,
  coarseBranchRow,
  targetSpeedInterval,
  rows,
  branch,
  partitionCount,
  partitionIndex,
  polynomialDegree,
  outerRadius,
  shiftedIndex,
  noiseSamplesPerPartition,
  numeratorNoiseSamples,
}) {
  const partitionRows = localN38PartitionRows({
    rows,
    partitionCount,
    partitionIndex,
  });
  if (partitionRows.length < polynomialDegree + 1) {
    throw new Error("local N38 partition requires at least polynomialDegree + 1 rows");
  }
  const partitionXiInterval = intervalHull(
    partitionRows.map((row) =>
      speedIntervalXiInterval({ row, targetSpeedInterval })
    )
  );
  const localTransportProfile = hRowPolynomialTransportProfileForRows({
    rows: partitionRows,
    branch,
    targetSpeedInterval,
    degree: polynomialDegree,
  });
  const localResidualProfile =
    polynomialGraphProducerIntervalResidualProfileForRows({
      targetSpeedInterval,
      rows: partitionRows,
      branch,
      transportProfile: localTransportProfile,
    });
  const solveWidthProfile = h38SolveWidthFactorizationProfileForRows({
    targetSpeedInterval,
    rows: partitionRows,
    branch,
    transportProfile: localTransportProfile,
  });
  const numeratorPolynomialDiagnostic =
    h38NumeratorPolynomialDegreeDiagnostics({
      solveWidthProfile,
      degrees: [polynomialDegree],
    })[0];
  const numeratorResidualProfile = h38NumeratorGraphResidualProfile({
    solveWidthProfile,
    numeratorPolynomialDiagnostic,
  });
  const localNoiseSamples = uniqueIncreasingSamples([
    partitionXiInterval[0],
    intervalMidpoint(partitionXiInterval),
    partitionXiInterval[1],
    ...noiseSamplesPerPartition,
  ]).filter(
    (sample) =>
      sample >= partitionXiInterval[0] - 1e-12 &&
      sample <= partitionXiInterval[1] + 1e-12
  );
  const replayVariants = [
    {
      variant: "local-n38-graph-only-slope-interval",
      residual_interval: [0, 0],
    },
    {
      variant: "local-n38-graph-midpoint-residual-slope-interval",
      residual_interval: numeratorResidualProfile.midpoint_residual_hull,
    },
    {
      variant: "local-n38-graph-interval-residual-slope-interval",
      residual_interval: numeratorResidualProfile.interval_residual_hull,
    },
  ];
  const variantReplays = replayVariants.map((variant) => {
    const sampleReplays = localNoiseSamples.flatMap((noise) =>
      numeratorNoiseSamples.map((numeratorNoise) =>
        shiftedPressureReplayForNumeratorGraphPoint({
          context,
          cell: coarseCell,
          branch,
          transportProfile: localTransportProfile,
          noise,
          residualProfile: localResidualProfile,
          numeratorCoefficients: numeratorPolynomialDiagnostic.coefficients,
          numeratorResidualInterval: variant.residual_interval,
          numeratorNoise,
          slopeInterval: coarseBranchRow.h38_solve_slope_interval,
          slopeMode: "interval",
          solveSlopeInterval: coarseBranchRow.h38_solve_slope_interval,
          outerRadius,
          shiftedIndex,
          variant: variant.variant,
        })
      )
    );
    const maxReplay = maxPressureReplay(sampleReplays);
    const minReplay = minPressureReplay(sampleReplays);
    return {
      variant: variant.variant,
      numerator_residual_interval: variant.residual_interval,
      numerator_residual_width: intervalWidth(variant.residual_interval),
      sample_replays: sampleReplays,
      max_replay: maxReplay,
      min_replay: minReplay,
      max_pressure: maxReplay?.pressure ?? null,
      min_pressure: minReplay?.pressure ?? null,
    };
  });
  const variantByName = Object.fromEntries(
    variantReplays.map((variant) => [variant.variant, variant])
  );
  const graphPressure =
    variantByName["local-n38-graph-only-slope-interval"]?.max_pressure ?? null;
  const midpointPressure =
    variantByName["local-n38-graph-midpoint-residual-slope-interval"]
      ?.max_pressure ?? null;
  const intervalPressure =
    variantByName["local-n38-graph-interval-residual-slope-interval"]
      ?.max_pressure ?? null;
  return {
    partition_index: partitionIndex,
    partition_count: partitionCount,
    row_count: partitionRows.length,
    cell_ids: partitionRows.map((row) => row.cell_id),
    xi_interval: partitionXiInterval,
    noise_samples: localNoiseSamples,
    numerator_noise_samples: numeratorNoiseSamples,
    h38_numerator_polynomial_diagnostic: numeratorPolynomialDiagnostic,
    h38_numerator_graph_residual_profile: numeratorResidualProfile,
    numerator_graph_variant_replays: variantReplays,
    max_graph_pressure: graphPressure,
    max_midpoint_residual_pressure: midpointPressure,
    max_interval_residual_pressure: intervalPressure,
    interval_to_midpoint_pressure_ratio:
      finitePositive(intervalPressure) && finitePositive(midpointPressure)
        ? Number(intervalPressure) / Number(midpointPressure)
        : null,
    midpoint_residual_width:
      numeratorResidualProfile.midpoint_residual_width,
    interval_residual_width:
      numeratorResidualProfile.interval_residual_width,
    midpoint_residual_width_to_numerator_width_ratio:
      numeratorResidualProfile.midpoint_residual_hull_to_numerator_width_ratio,
    interval_residual_width_to_numerator_width_ratio:
      numeratorResidualProfile.interval_residual_hull_to_numerator_width_ratio,
  };
}

export function buildH39H38NumeratorGraphLocalPartitionDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  outerRadius = 0.001,
  shiftedIndex = 1,
  seriesOrder = 60,
  xiDomain = [-2, 2],
  polynomialDegree = 2,
  fineSubcellCount = 16,
  partitionCounts = [1, 2, 4],
  noiseSamplesPerPartition = [],
  numeratorNoiseSamples = [-1, 0, 1],
  hFreezeStartIndexes = [38, 20, 10, 0],
} = {}) {
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedXiDomain = numericInterval("xiDomain", xiDomain);
  const resolvedPolynomialDegree = assertFinitePositiveInteger(
    "polynomialDegree",
    polynomialDegree
  );
  if (resolvedPolynomialDegree > 3) {
    throw new Error("polynomialDegree must be at most 3");
  }
  const resolvedFineSubcellCount = assertFinitePositiveInteger(
    "fineSubcellCount",
    fineSubcellCount
  );
  const resolvedPartitionCounts = [...new Set(partitionCounts)].map((count) =>
    assertFinitePositiveInteger("partitionCounts", count)
  );
  resolvedPartitionCounts.sort((left, right) => left - right);
  if (
    resolvedPartitionCounts.length === 0 ||
    resolvedPartitionCounts.some(
      (count) =>
        resolvedFineSubcellCount % count !== 0 ||
        resolvedFineSubcellCount / count < resolvedPolynomialDegree + 1
    )
  ) {
    throw new Error("partitionCounts must divide fineSubcellCount and leave enough local rows");
  }
  const resolvedOuterRadius = assertFinitePositiveNumber(
    "outerRadius",
    outerRadius
  );
  const resolvedShiftedIndex = assertFinitePositiveInteger(
    "shiftedIndex",
    shiftedIndex
  );
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder: assertFinitePositiveInteger("seriesOrder", seriesOrder),
  });
  const coarseRows = targetRowsForSubcellCount({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    subcellCount: 1,
    rootSubdivisions,
  });
  const fineRows = targetRowsForSubcellCount({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    subcellCount: resolvedFineSubcellCount,
    rootSubdivisions,
  });
  if (coarseRows.length !== 1) {
    throw new Error("local N38 partition diagnostic requires exactly one coarse target row");
  }
  if (fineRows.length !== resolvedFineSubcellCount) {
    throw new Error("local N38 partition diagnostic requires a complete fine subcover");
  }
  const coarseRow = coarseRows[0];
  const coarseBranchRow = branchRowFor(coarseRow, branch);
  const coarseCell = cellFromCertificateRow(coarseRow);
  const baselineDiagnostic = pressureDiagnosticForRow({
    context,
    row: coarseRow,
    branch,
    outerRadius: resolvedOuterRadius,
    shiftedIndex: resolvedShiftedIndex,
    hFreezeStartIndexes,
  });
  const baselineHRowMidpointReplay =
    baselineDiagnostic.input_family_replays.find(
      (replay) => replay.input_family === "h-row-midpoint"
    ) ?? null;
  const partitionSummaries = resolvedPartitionCounts.map((partitionCount) => {
    const partitions = Array.from({ length: partitionCount }, (_, index) =>
      localN38PartitionDiagnostic({
        context,
        coarseCell,
        coarseBranchRow,
        targetSpeedInterval: resolvedTargetSpeedInterval,
        rows: fineRows,
        branch,
        partitionCount,
        partitionIndex: index,
        polynomialDegree: resolvedPolynomialDegree,
        outerRadius: resolvedOuterRadius,
        shiftedIndex: resolvedShiftedIndex,
        noiseSamplesPerPartition,
        numeratorNoiseSamples,
      })
    );
    const maxByKey = (key) =>
      partitions.reduce(
        (best, partition) =>
          Number(partition[key]) > Number(best?.[key] ?? -1)
            ? partition
            : best,
        null
      );
    const worstGraphPartition = maxByKey("max_graph_pressure");
    const worstMidpointPartition = maxByKey(
      "max_midpoint_residual_pressure"
    );
    const worstIntervalPartition = maxByKey(
      "max_interval_residual_pressure"
    );
    return {
      partition_count: partitionCount,
      local_partition_count: partitions.length,
      partitions,
      max_graph_pressure: worstGraphPartition?.max_graph_pressure ?? null,
      max_midpoint_residual_pressure:
        worstMidpointPartition?.max_midpoint_residual_pressure ?? null,
      max_interval_residual_pressure:
        worstIntervalPartition?.max_interval_residual_pressure ?? null,
      worst_graph_partition: worstGraphPartition,
      worst_midpoint_partition: worstMidpointPartition,
      worst_interval_partition: worstIntervalPartition,
      interval_to_midpoint_pressure_ratio:
        finitePositive(worstIntervalPartition?.max_interval_residual_pressure) &&
        finitePositive(worstMidpointPartition?.max_midpoint_residual_pressure)
          ? Number(worstIntervalPartition.max_interval_residual_pressure) /
            Number(worstMidpointPartition.max_midpoint_residual_pressure)
          : null,
    };
  });
  const bestMidpointPartitionSummary = partitionSummaries.reduce(
    (best, summary) =>
      Number(summary.max_midpoint_residual_pressure) <
      Number(best?.max_midpoint_residual_pressure ?? Infinity)
        ? summary
        : best,
    null
  );
  const bestIntervalPartitionSummary = partitionSummaries.reduce(
    (best, summary) =>
      Number(summary.max_interval_residual_pressure) <
      Number(best?.max_interval_residual_pressure ?? Infinity)
        ? summary
        : best,
    null
  );
  const hRowMidpointPressure = baselineHRowMidpointReplay?.pressure ?? null;
  const diagnosis =
    finitePositive(bestMidpointPartitionSummary?.max_midpoint_residual_pressure) &&
    finitePositive(bestIntervalPartitionSummary?.max_interval_residual_pressure) &&
    finitePositive(hRowMidpointPressure) &&
    Number(bestMidpointPartitionSummary.max_midpoint_residual_pressure) <
      Number(hRowMidpointPressure) &&
    Number(bestIntervalPartitionSummary.max_interval_residual_pressure) >
      1e6 * Number(bestMidpointPartitionSummary.max_midpoint_residual_pressure)
      ? "local-n38-midpoint-good-raw-hull-artifact"
      : "local-n38-partition-mixed";
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_NUMERATOR_GRAPH_LOCAL_PARTITION_DIAGNOSTIC_SCHEMA,
    status:
      "h39-h38-numerator-graph-local-partition-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-h38-numerator-graph-local-partition-diagnostic",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    shifted_index: resolvedShiftedIndex,
    y_order:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
      resolvedShiftedIndex,
    outer_radius: resolvedOuterRadius,
    xi_domain: resolvedXiDomain,
    polynomial_degree: resolvedPolynomialDegree,
    fine_subcell_count: resolvedFineSubcellCount,
    partition_counts: resolvedPartitionCounts,
    baseline_independent_interval_pressure:
      baselineDiagnostic.full_input_replay.pressure,
    baseline_h_row_midpoint_pressure: hRowMidpointPressure,
    partition_summaries: partitionSummaries,
    best_midpoint_partition_summary: bestMidpointPartitionSummary,
    best_interval_partition_summary: bestIntervalPartitionSummary,
    best_midpoint_to_h_row_midpoint_pressure_ratio:
      finitePositive(bestMidpointPartitionSummary?.max_midpoint_residual_pressure) &&
      finitePositive(hRowMidpointPressure)
        ? Number(bestMidpointPartitionSummary.max_midpoint_residual_pressure) /
          Number(hRowMidpointPressure)
        : null,
    best_interval_to_best_midpoint_pressure_ratio:
      finitePositive(bestIntervalPartitionSummary?.max_interval_residual_pressure) &&
      finitePositive(bestMidpointPartitionSummary?.max_midpoint_residual_pressure)
        ? Number(bestIntervalPartitionSummary.max_interval_residual_pressure) /
          Number(bestMidpointPartitionSummary.max_midpoint_residual_pressure)
        : null,
    local_partition_diagnosis: diagnosis,
    candidate_certificate_route:
      "Local N38 graph partitions keep midpoint residual replay below the h-row-midpoint target, but a raw interval residual hull still reintroduces the obstruction; the next certificate must evaluate the H38 recurrence numerator expression itself and prove a local Taylor remainder.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_h38_numerator_graph_enclosure: false,
      certifies_n38_taylor_remainder_bound: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

export function buildH39H38ExpressionN38DecompositionDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  seriesOrder = 60,
  subcellCounts = [1, 4, 8, 16],
} = {}) {
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedSubcellCounts = [...new Set(subcellCounts)].map((count) =>
    assertFinitePositiveInteger("subcellCounts", count)
  );
  if (resolvedSubcellCounts.length < 2) {
    throw new Error("subcellCounts must contain at least two entries");
  }
  resolvedSubcellCounts.sort((left, right) => left - right);
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder: assertFinitePositiveInteger("seriesOrder", seriesOrder),
  });
  if (context.seriesOrder < H38_NUMERATOR_Y_ORDER) {
    throw new Error("seriesOrder must cover the H38 numerator coefficient");
  }
  const subcellSummaries = resolvedSubcellCounts.map((subcellCount) => {
    const rows = targetRowsForSubcellCount({
      targetSpeedInterval: resolvedTargetSpeedInterval,
      subcellCount,
      rootSubdivisions,
    });
    if (rows.length !== subcellCount) {
      throw new Error("N38 expression diagnostic requires a complete subcover");
    }
    return n38ExpressionSubcellSummary({
      rows,
      targetSpeedInterval: resolvedTargetSpeedInterval,
      branch,
      subcellCount,
    });
  });
  const widthScalingSummary = residualPressureScalingSummary({
    diagnostics: subcellSummaries,
    pressureKey: "max_direct_n38_expression_width",
    targetPressure: null,
  });
  const maxDirectExportRelativeGap = Math.max(
    ...subcellSummaries.map((summary) =>
      Number(summary.max_direct_export_relative_gap)
    )
  );
  const dominantTerm = subcellSummaries
    .map((summary) => ({
      subcell_count: summary.residual_subcell_count,
      term: summary.dominant_expression_term_by_width,
      coefficient_width: summary.dominant_expression_term_width,
      coefficient_abs_upper: summary.dominant_expression_term_abs_upper,
    }))
    .reduce((best, entry) =>
      Number(entry.coefficient_width) > Number(best?.coefficient_width ?? -1)
        ? entry
        : best,
    null);
  const diagnosis =
    subcellSummaries.every(
      (summary) => summary.all_direct_recomputations_match_exported_residual
    ) &&
    widthScalingSummary?.observed_pressure_scaling_exponent > 0.9 &&
    widthScalingSummary?.observed_pressure_scaling_exponent < 1.1
      ? "expression-level-n38-export-confirmed-row-hull-artifact"
      : "expression-level-n38-mixed";
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_DECOMPOSITION_DIAGNOSTIC_SCHEMA,
    status:
      "h39-h38-expression-n38-decomposition-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-h38-expression-n38-decomposition-diagnostic",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    h38_numerator_y_order: H38_NUMERATOR_Y_ORDER,
    h38_numerator_formula:
      "N38 is the y^42 coefficient of F_epsilon with h38=0 and h39=0; the exported h38 interval is h38=-N38/S37.",
    series_order: context.seriesOrder,
    subcell_counts: resolvedSubcellCounts,
    subcell_summaries: subcellSummaries,
    n38_expression_width_scaling_summary: widthScalingSummary,
    max_direct_export_relative_gap: maxDirectExportRelativeGap,
    dominant_expression_term_by_width: dominantTerm,
    n38_expression_diagnosis: diagnosis,
    candidate_certificate_route:
      "The H39 handoff should export a directed-rounded Taylor or normal-form enclosure for the expression-level N38 source coefficient before h38=-N38/S37 is formed; the row-field residual interval is now confirmed as the lossy boundary.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_expression_level_n38_provider: false,
      certifies_n38_taylor_remainder_bound: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

export function buildH39H38ExpressionN38TaylorBudgetDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  seriesOrder = 60,
  subcellCounts = [1, 4, 8, 16],
  fitSubcellCount = 16,
  polynomialDegrees = [1, 2, 3],
} = {}) {
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedFitSubcellCount = assertFinitePositiveInteger(
    "fitSubcellCount",
    fitSubcellCount
  );
  const resolvedPolynomialDegrees = [
    ...new Set(
      polynomialDegrees.map((degree) =>
        assertFinitePositiveInteger("polynomialDegrees", degree)
      )
    ),
  ].sort((left, right) => left - right);
  if (resolvedPolynomialDegrees.length === 0) {
    throw new Error("polynomialDegrees must be nonempty");
  }
  if (resolvedPolynomialDegrees.some((degree) => degree > 3)) {
    throw new Error("N38 Taylor budget supports polynomial degree at most 3");
  }
  const resolvedSubcellCounts = [
    ...new Set([...subcellCounts, resolvedFitSubcellCount]),
  ]
    .map((count) => assertFinitePositiveInteger("subcellCounts", count))
    .sort((left, right) => left - right);
  const expressionDiagnostic =
    buildH39H38ExpressionN38DecompositionDiagnosticCandidate({
      targetSpeedInterval: resolvedTargetSpeedInterval,
      branch,
      rootSubdivisions,
      seriesOrder,
      subcellCounts: resolvedSubcellCounts,
    });
  const baselineSummary = expressionDiagnostic.subcell_summaries[0];
  const fitSummary = expressionDiagnostic.subcell_summaries.find(
    (summary) => summary.residual_subcell_count === resolvedFitSubcellCount
  );
  const maxPolynomialDegree = Math.max(...resolvedPolynomialDegrees);
  if (!fitSummary || fitSummary.row_count < maxPolynomialDegree + 1) {
    throw new Error("fitSubcellCount must provide at least degree + 1 rows");
  }
  const baselineRawWidth = Number(
    baselineSummary.max_direct_n38_expression_width
  );
  const pointTermWidthScale = Math.max(
    ...expressionDiagnostic.subcell_summaries.map((summary) =>
      Number(summary.max_midpoint_expression_term_width)
    )
  );
  const requiredWidthShrinkFactor = finitePositive(pointTermWidthScale)
    ? baselineRawWidth / pointTermWidthScale
    : null;
  const observedScalingExponent = Number(
    expressionDiagnostic.n38_expression_width_scaling_summary
      .observed_pressure_scaling_exponent
  );
  const estimatedUniformSubcellCount =
    estimatedUniformSubcellCountForPointScale({
      baselineSubcellCount: baselineSummary.residual_subcell_count,
      requiredWidthShrinkFactor,
      observedScalingExponent,
    });
  const baselineTermWidthShares = n38ExpressionTermWidthShares(
    baselineSummary.worst_width_row
  );
  const sineTermWidthShare = baselineTermWidthShares
    .filter((term) => term.term.startsWith("sin_"))
    .reduce((total, term) => total + Number(term.width_share ?? 0), 0);
  const fitSamples = n38ExpressionTaylorFitSamplesFromSummary(fitSummary);
  const componentNames = [
    "direct_n38_expression",
    ...fitSummary.row_diagnostics[0].midpoint_expression_terms.map(
      (term) => term.term
    ),
  ];
  const componentDiagnostics = componentNames.map((component) =>
    n38ExpressionTaylorFitDiagnosticForComponent({
      component,
      samples: fitSamples,
      degrees: resolvedPolynomialDegrees,
      referenceRawWidth: baselineRawWidth,
      referencePointWidth: pointTermWidthScale,
    })
  );
  const directExpressionFit = componentDiagnostics.find(
    (component) => component.component === "direct_n38_expression"
  );
  const sineTermFits = componentDiagnostics.filter((component) =>
    component.component.startsWith("sin_")
  );
  const diagnosis =
    expressionDiagnostic.n38_expression_diagnosis ===
      "expression-level-n38-export-confirmed-row-hull-artifact" &&
    finitePositive(estimatedUniformSubcellCount) &&
    estimatedUniformSubcellCount > 1e12
      ? "expression-level-n38-local-taylor-route-required"
      : "expression-level-n38-taylor-budget-mixed";
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TAYLOR_BUDGET_DIAGNOSTIC_SCHEMA,
    status:
      "h39-h38-expression-n38-taylor-budget-diagnostic-candidate-emitted",
    evaluation_level: "candidate-h38-expression-n38-local-taylor-budget",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    h38_numerator_y_order: H38_NUMERATOR_Y_ORDER,
    series_order: assertFinitePositiveInteger("seriesOrder", seriesOrder),
    subcell_counts: resolvedSubcellCounts,
    fit_subcell_count: resolvedFitSubcellCount,
    polynomial_degrees: resolvedPolynomialDegrees,
    source_expression_decomposition: {
      schema: expressionDiagnostic.schema,
      status: expressionDiagnostic.status,
      n38_expression_diagnosis: expressionDiagnostic.n38_expression_diagnosis,
      width_scaling_summary:
        expressionDiagnostic.n38_expression_width_scaling_summary,
      max_direct_export_relative_gap:
        expressionDiagnostic.max_direct_export_relative_gap,
      dominant_expression_term_by_width:
        expressionDiagnostic.dominant_expression_term_by_width,
    },
    local_taylor_budget: {
      baseline_subcell_count: baselineSummary.residual_subcell_count,
      baseline_raw_expression_width: baselineRawWidth,
      point_term_width_scale: pointTermWidthScale,
      required_width_shrink_factor_to_point_term_scale:
        requiredWidthShrinkFactor,
      observed_raw_width_scaling_exponent: observedScalingExponent,
      estimated_uniform_subcell_count_for_point_term_scale:
        estimatedUniformSubcellCount,
      baseline_worst_row_cell_id: baselineSummary.worst_width_row.cell_id,
      baseline_term_width_shares: baselineTermWidthShares,
      sine_term_width_share: sineTermWidthShare,
    },
    fit_samples: fitSamples,
    component_taylor_fit_diagnostics: componentDiagnostics,
    direct_expression_best_fit: directExpressionFit
      ? {
          best_degree_by_max_abs_residual:
            directExpressionFit.best_degree_by_max_abs_residual,
          best_max_abs_midpoint_residual:
            directExpressionFit.best_max_abs_midpoint_residual,
          best_residual_to_raw_width_ratio:
            directExpressionFit.best_residual_to_raw_width_ratio,
          best_residual_to_point_width_ratio:
            directExpressionFit.best_residual_to_point_width_ratio,
          best_estimated_taylor_partition_count_to_point_scale:
            directExpressionFit
              .best_estimated_taylor_partition_count_to_point_scale,
        }
      : null,
    sine_term_best_fits: sineTermFits.map((component) => ({
      component: component.component,
      best_degree_by_max_abs_residual:
        component.best_degree_by_max_abs_residual,
      best_max_abs_midpoint_residual: component.best_max_abs_midpoint_residual,
      best_residual_to_raw_width_ratio:
        component.best_residual_to_raw_width_ratio,
      best_residual_to_point_width_ratio:
        component.best_residual_to_point_width_ratio,
      best_estimated_taylor_partition_count_to_point_scale:
        component.best_estimated_taylor_partition_count_to_point_scale,
    })),
    n38_taylor_budget_diagnosis: diagnosis,
    candidate_certificate_route:
      "Uniform subcovering would need an astronomically fine xi partition to reach point-local N38 scale. The next certificate should keep the shared delta/phi dependency through an xi-local Taylor or normal-form enclosure of the expression-level N38 coefficient, with directed rounding before h38=-N38/S37 is formed.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_expression_level_n38_provider: false,
      certifies_n38_taylor_remainder_bound: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

export function buildH39H38ExpressionN38TaylorEnclosurePrototypeCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  seriesOrder = 60,
  subcellCounts = [1, 4, 8],
  fitSubcellCount = 8,
  polynomialDegrees = [1, 2, 3],
  components = ["direct_n38_expression", "sin_phi", "sin_delta"],
  remainderInflationFactor = 1,
} = {}) {
  const resolvedRemainderInflationFactor = assertFinitePositiveNumber(
    "remainderInflationFactor",
    remainderInflationFactor
  );
  const resolvedComponents = [...new Set(components.map(String))];
  if (resolvedComponents.length === 0) {
    throw new Error("components must be nonempty");
  }
  const budgetDiagnostic = buildH39H38ExpressionN38TaylorBudgetDiagnosticCandidate({
    targetSpeedInterval,
    branch,
    rootSubdivisions,
    seriesOrder,
    subcellCounts,
    fitSubcellCount,
    polynomialDegrees,
  });
  const pointTermWidthScale = Number(
    budgetDiagnostic.local_taylor_budget.point_term_width_scale
  );
  const baselineRawExpressionWidth = Number(
    budgetDiagnostic.local_taylor_budget.baseline_raw_expression_width
  );
  const xiDomainInterval = intervalHull(
    budgetDiagnostic.fit_samples.map((sample) => sample.xi_interval)
  );
  const componentDiagnostics = resolvedComponents.map((component) => {
    const componentDiagnostic =
      budgetDiagnostic.component_taylor_fit_diagnostics.find(
        (candidate) => candidate.component === component
      );
    if (!componentDiagnostic) {
      throw new Error(`Taylor budget does not contain component ${component}`);
    }
    return n38ExpressionTaylorEnclosurePrototypeForComponent({
      componentDiagnostic,
      xiDomainInterval,
      pointTermWidthScale,
      baselineRawExpressionWidth,
      remainderInflationFactor: resolvedRemainderInflationFactor,
    });
  });
  const maxTileCount = Math.max(
    ...componentDiagnostics.map((component) => component.tile_count)
  );
  const maxRemainderToPointScale = Math.max(
    ...componentDiagnostics.map((component) =>
      Number(component.max_tile_remainder_to_point_width_ratio)
    )
  );
  const totalTileRows = componentDiagnostics.reduce(
    (total, component) => total + component.prototype_tile_rows.length,
    0
  );
  const diagnosis =
    componentDiagnostics.every((component) =>
      component.all_tiles_pass_point_width_scale
    ) &&
    maxTileCount <
      Number(
        budgetDiagnostic.local_taylor_budget
          .estimated_uniform_subcell_count_for_point_term_scale
      )
      ? "candidate-local-taylor-prototype-replaces-brute-subcover"
      : "candidate-local-taylor-prototype-open";
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TAYLOR_ENCLOSURE_PROTOTYPE_SCHEMA,
    status:
      "h39-h38-expression-n38-taylor-enclosure-prototype-candidate-emitted",
    evaluation_level: "candidate-h38-expression-n38-local-taylor-enclosure-prototype",
    target_speed_interval: budgetDiagnostic.target_speed_interval,
    branch: budgetDiagnostic.branch,
    h38_numerator_y_order: H38_NUMERATOR_Y_ORDER,
    series_order: budgetDiagnostic.series_order,
    source_taylor_budget: {
      schema: budgetDiagnostic.schema,
      status: budgetDiagnostic.status,
      diagnosis: budgetDiagnostic.n38_taylor_budget_diagnosis,
      baseline_raw_expression_width:
        budgetDiagnostic.local_taylor_budget.baseline_raw_expression_width,
      point_term_width_scale:
        budgetDiagnostic.local_taylor_budget.point_term_width_scale,
      estimated_uniform_subcell_count_for_point_term_scale:
        budgetDiagnostic.local_taylor_budget
          .estimated_uniform_subcell_count_for_point_term_scale,
      sine_term_width_share:
        budgetDiagnostic.local_taylor_budget.sine_term_width_share,
    },
    prototype_parameters: {
      components: resolvedComponents,
      fit_subcell_count: budgetDiagnostic.fit_subcell_count,
      polynomial_degrees: budgetDiagnostic.polynomial_degrees,
      xi_domain_interval: xiDomainInterval,
      remainder_inflation_factor: resolvedRemainderInflationFactor,
      local_taylor_scaling_law:
        "prototype_remainder = parent_cubic_fit_residual * tile_count^-(degree+1)",
    },
    component_prototypes: componentDiagnostics,
    prototype_summary: {
      component_count: componentDiagnostics.length,
      max_tile_count: maxTileCount,
      total_component_tile_rows: totalTileRows,
      max_tile_remainder_to_point_width_ratio: maxRemainderToPointScale,
      all_components_pass_point_width_scale: componentDiagnostics.every(
        (component) => component.all_tiles_pass_point_width_scale
      ),
      brute_to_prototype_tile_count_ratio:
        finitePositive(maxTileCount) &&
        finitePositive(
          budgetDiagnostic.local_taylor_budget
            .estimated_uniform_subcell_count_for_point_term_scale
        )
          ? Number(
              budgetDiagnostic.local_taylor_budget
                .estimated_uniform_subcell_count_for_point_term_scale
            ) / maxTileCount
          : null,
    },
    n38_taylor_enclosure_prototype_diagnosis: diagnosis,
    candidate_certificate_route:
      "This candidate turns the expression-level N38 Taylor-budget estimate into explicit xi-local tile rows for the direct expression and sine terms. It is a prototype for the next directed-rounded derivative-bound certificate, not itself a proof of the Taylor remainder.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_expression_level_n38_provider: false,
      certifies_n38_taylor_remainder_bound: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

export function buildH39H38ExpressionN38TaylorDerivativeBoundPrototypeCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  seriesOrder = 60,
  subcellCounts = [1, 4, 8],
  fitSubcellCount = 8,
  polynomialDegrees = [1, 2, 3],
  components = ["direct_n38_expression", "sin_phi", "sin_delta"],
  remainderInflationFactor = 1,
} = {}) {
  const enclosurePrototype =
    buildH39H38ExpressionN38TaylorEnclosurePrototypeCandidate({
      targetSpeedInterval,
      branch,
      rootSubdivisions,
      seriesOrder,
      subcellCounts,
      fitSubcellCount,
      polynomialDegrees,
      components,
      remainderInflationFactor,
    });
  const pointTermWidthScale = Number(
    enclosurePrototype.source_taylor_budget.point_term_width_scale
  );
  const componentDerivativePrototypes =
    enclosurePrototype.component_prototypes.map((componentPrototype) =>
      n38ExpressionTaylorDerivativeBoundPrototypeForComponent({
        componentPrototype,
        pointTermWidthScale,
      })
    );
  const derivativeTileRows = componentDerivativePrototypes.flatMap(
    (component) => component.derivative_tile_rows
  );
  const maxDerivativeBoundHeadroomRatio = Math.max(
    ...componentDerivativePrototypes.map((component) =>
      Number(component.max_derivative_bound_headroom_ratio)
    )
  );
  const maxPredictedTileRemainderToPointWidthRatio = Math.max(
    ...componentDerivativePrototypes.map((component) =>
      Number(component.max_predicted_tile_remainder_to_point_width_ratio)
    )
  );
  const maxPrototypeRemainderRelativeGap = Math.max(
    ...componentDerivativePrototypes.map((component) =>
      Number(component.max_prototype_remainder_relative_gap)
    )
  );
  const diagnosis =
    componentDerivativePrototypes.every(
      (component) =>
        component.all_tiles_derivative_proxy_below_required_bound
    ) &&
    maxDerivativeBoundHeadroomRatio <= 1
      ? "candidate-fourth-derivative-bound-target-finite"
      : "candidate-fourth-derivative-bound-target-open";
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TAYLOR_DERIVATIVE_BOUND_PROTOTYPE_SCHEMA,
    status:
      "h39-h38-expression-n38-taylor-derivative-bound-prototype-candidate-emitted",
    evaluation_level:
      "candidate-h38-expression-n38-local-taylor-derivative-bound-prototype",
    target_speed_interval: enclosurePrototype.target_speed_interval,
    branch: enclosurePrototype.branch,
    h38_numerator_y_order: H38_NUMERATOR_Y_ORDER,
    series_order: enclosurePrototype.series_order,
    source_taylor_enclosure_prototype: {
      schema: enclosurePrototype.schema,
      status: enclosurePrototype.status,
      diagnosis:
        enclosurePrototype.n38_taylor_enclosure_prototype_diagnosis,
      component_count: enclosurePrototype.prototype_summary.component_count,
      max_tile_count: enclosurePrototype.prototype_summary.max_tile_count,
      total_component_tile_rows:
        enclosurePrototype.prototype_summary.total_component_tile_rows,
      max_tile_remainder_to_point_width_ratio:
        enclosurePrototype.prototype_summary
          .max_tile_remainder_to_point_width_ratio,
      brute_to_prototype_tile_count_ratio:
        enclosurePrototype.prototype_summary
          .brute_to_prototype_tile_count_ratio,
      point_term_width_scale: pointTermWidthScale,
    },
    derivative_bound_parameters: {
      components: enclosurePrototype.prototype_parameters.components,
      fit_subcell_count:
        enclosurePrototype.prototype_parameters.fit_subcell_count,
      polynomial_degrees:
        enclosurePrototype.prototype_parameters.polynomial_degrees,
      xi_domain_interval:
        enclosurePrototype.prototype_parameters.xi_domain_interval,
      remainder_inflation_factor:
        enclosurePrototype.prototype_parameters.remainder_inflation_factor,
      taylor_remainder_inequality:
        "fourth_order_remainder <= sup_abs_d4_component * xi_half_width^4 / 24",
      required_certificate_inequality:
        "sup_abs_d4_component_on_tile <= required_fourth_derivative_upper_for_point_scale",
      proof_status: "sampled-proxy-only-not-directed-rounded",
    },
    component_derivative_bound_prototypes: componentDerivativePrototypes,
    prototype_tile_derivative_rows: derivativeTileRows,
    derivative_bound_summary: {
      component_count: componentDerivativePrototypes.length,
      total_derivative_tile_rows: derivativeTileRows.length,
      max_tile_count: Math.max(
        ...componentDerivativePrototypes.map((component) =>
          Number(component.tile_count)
        )
      ),
      max_derivative_bound_headroom_ratio:
        maxDerivativeBoundHeadroomRatio,
      max_predicted_tile_remainder_to_point_width_ratio:
        maxPredictedTileRemainderToPointWidthRatio,
      max_prototype_remainder_relative_gap:
        maxPrototypeRemainderRelativeGap,
      all_components_derivative_proxy_below_required_bound:
        componentDerivativePrototypes.every(
          (component) =>
            component.all_tiles_derivative_proxy_below_required_bound
        ),
    },
    n38_taylor_derivative_bound_prototype_diagnosis: diagnosis,
    candidate_certificate_route:
      "This candidate converts the finite N38 Taylor tile rows into explicit fourth-derivative upper bounds that a directed-rounded local Taylor certificate must prove on the same xi tiles before h38=-N38/S37 is formed.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_expression_level_n38_provider: false,
      certifies_n38_taylor_remainder_bound: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

export function buildH39H38ExpressionN38TaylorFourthDifferenceDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  seriesOrder = 60,
  stencilSubcellCounts = [8, 16],
  polynomialDegrees = [1, 2, 3],
  components = ["direct_n38_expression", "sin_phi", "sin_delta"],
  derivativePrototypeFitSubcellCount = 8,
  remainderInflationFactor = 1,
} = {}) {
  const resolvedStencilSubcellCounts = [
    ...new Set(stencilSubcellCounts),
  ].map((count) =>
    assertFinitePositiveInteger("stencilSubcellCounts", count)
  );
  if (resolvedStencilSubcellCounts.some((count) => count < 5)) {
    throw new Error("stencilSubcellCounts must be at least 5");
  }
  resolvedStencilSubcellCounts.sort((left, right) => left - right);
  const resolvedComponents = [...new Set(components.map(String))];
  const derivativePrototype =
    buildH39H38ExpressionN38TaylorDerivativeBoundPrototypeCandidate({
      targetSpeedInterval,
      branch,
      rootSubdivisions,
      seriesOrder,
      subcellCounts: [
        1,
        4,
        derivativePrototypeFitSubcellCount,
        ...resolvedStencilSubcellCounts,
      ],
      fitSubcellCount: derivativePrototypeFitSubcellCount,
      polynomialDegrees,
      components: resolvedComponents,
      remainderInflationFactor,
    });
  const pointTermWidthScale = Number(
    derivativePrototype.source_taylor_enclosure_prototype
      .point_term_width_scale
  );
  const derivativeTargetsByComponent = Object.fromEntries(
    derivativePrototype.component_derivative_bound_prototypes.map(
      (component) => [component.component, component]
    )
  );
  const stencilSummaries = resolvedStencilSubcellCounts.map((subcellCount) => {
    const budgetDiagnostic =
      buildH39H38ExpressionN38TaylorBudgetDiagnosticCandidate({
        targetSpeedInterval,
        branch,
        rootSubdivisions,
        seriesOrder,
        subcellCounts: [
          1,
          4,
          derivativePrototypeFitSubcellCount,
          subcellCount,
        ],
        fitSubcellCount: subcellCount,
        polynomialDegrees,
      });
    const componentRows = resolvedComponents.map((component) => {
      const target = derivativeTargetsByComponent[component];
      if (!target) {
        throw new Error(`derivative prototype does not contain ${component}`);
      }
      const rows = fourthDifferenceRowsForComponent({
        component,
        samples: budgetDiagnostic.fit_samples,
        requiredFourthDerivativeUpper:
          target.min_required_fourth_derivative_upper_for_point_scale,
        sampledParentFourthDerivativeUpper:
          target.sampled_parent_residual_implied_fourth_derivative_upper,
        pointTermWidthScale,
        parentXiHalfWidth: target.parent_xi_half_width,
      });
      return {
        component,
        stencil_subcell_count: subcellCount,
        xi_domain_interval: target.xi_domain_interval,
        parent_xi_half_width: target.parent_xi_half_width,
        xi_step:
          budgetDiagnostic.fit_samples.length > 1
            ? budgetDiagnostic.fit_samples[1].xi_midpoint -
              budgetDiagnostic.fit_samples[0].xi_midpoint
            : null,
        derivative_target_tile_count: target.tile_count,
        required_fourth_derivative_upper_for_existing_tiles:
          target.min_required_fourth_derivative_upper_for_point_scale,
        sampled_parent_residual_implied_fourth_derivative_upper:
          target.sampled_parent_residual_implied_fourth_derivative_upper,
        fourth_difference_rows: rows,
        fourth_difference_summary: summarizeFourthDifferenceRows(rows),
      };
    });
    const flatRows = componentRows.flatMap(
      (component) => component.fourth_difference_rows
    );
    return {
      stencil_subcell_count: subcellCount,
      fit_sample_count: budgetDiagnostic.fit_samples.length,
      component_count: componentRows.length,
      component_fourth_difference_rows: componentRows,
      summary: summarizeFourthDifferenceRows(flatRows),
    };
  });
  const flatComponentRows = stencilSummaries.flatMap((summary) =>
    summary.component_fourth_difference_rows.flatMap(
      (component) => component.fourth_difference_rows
    )
  );
  const globalSummary = summarizeFourthDifferenceRows(flatComponentRows);
  const diagnosis =
    globalSummary.all_stencils_compatible_with_existing_tile_bound
      ? "finite-fourth-difference-compatible-with-existing-taylor-target"
      : "finite-fourth-difference-rejects-parent-residual-proxy-as-certificate";
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TAYLOR_FOURTH_DIFFERENCE_DIAGNOSTIC_SCHEMA,
    status:
      "h39-h38-expression-n38-taylor-fourth-difference-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-h38-expression-n38-local-taylor-fourth-difference-diagnostic",
    target_speed_interval: derivativePrototype.target_speed_interval,
    branch: derivativePrototype.branch,
    h38_numerator_y_order: H38_NUMERATOR_Y_ORDER,
    series_order: derivativePrototype.series_order,
    source_derivative_bound_prototype: {
      schema: derivativePrototype.schema,
      status: derivativePrototype.status,
      diagnosis:
        derivativePrototype.n38_taylor_derivative_bound_prototype_diagnosis,
      total_derivative_tile_rows:
        derivativePrototype.derivative_bound_summary
          .total_derivative_tile_rows,
      max_tile_count: derivativePrototype.derivative_bound_summary.max_tile_count,
      max_derivative_bound_headroom_ratio:
        derivativePrototype.derivative_bound_summary
          .max_derivative_bound_headroom_ratio,
    },
    fourth_difference_parameters: {
      components: resolvedComponents,
      stencil_subcell_counts: resolvedStencilSubcellCounts,
      derivative_prototype_fit_subcell_count:
        derivativePrototypeFitSubcellCount,
      polynomial_degrees: polynomialDegrees,
      point_term_width_scale: pointTermWidthScale,
      finite_difference_formula:
        "Delta4 f_i = f_i - 4 f_{i+1} + 6 f_{i+2} - 4 f_{i+3} + f_{i+4}; M4_estimate = abs(Delta4 f_i) / h^4",
      proof_status:
        "finite-difference-sanity-check-not-directed-rounded-enclosure",
    },
    stencil_summaries: stencilSummaries,
    fourth_difference_summary: {
      total_stencil_rows: flatComponentRows.length,
      max_fourth_derivative_estimate:
        globalSummary.max_fourth_derivative_estimate,
      max_nonuniform_fourth_derivative_estimate:
        globalSummary.max_nonuniform_fourth_derivative_estimate,
      max_fourth_derivative_to_required_ratio:
        globalSummary.max_fourth_derivative_to_required_ratio,
      max_fourth_derivative_to_sampled_proxy_ratio:
        globalSummary.max_fourth_derivative_to_sampled_proxy_ratio,
      max_nonuniform_to_uniform_fourth_derivative_relative_gap:
        globalSummary.max_nonuniform_to_uniform_fourth_derivative_relative_gap,
      max_retile_count_required_for_observed_fourth_difference:
        globalSummary.max_retile_count_required_for_observed_fourth_difference,
      all_stencils_compatible_with_existing_tile_bound:
        globalSummary.all_stencils_compatible_with_existing_tile_bound,
      worst_stencil: globalSummary.worst_stencil,
      worst_nonuniform_correction_stencil:
        globalSummary.worst_nonuniform_correction_stencil,
    },
    n38_taylor_fourth_difference_diagnosis: diagnosis,
    candidate_certificate_route:
      "The finite-difference diagnostic checks whether the sampled parent-residual Taylor proxy is compatible with fourth differences on the live H38 producer rows. It is not a directed-rounded derivative enclosure; when it exceeds the existing tile bound, the next certificate must either retile from the observed M4 scale or replace row-sample stencils with an analytic same-domain normal form.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_expression_level_n38_provider: false,
      certifies_n38_taylor_remainder_bound: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

export function buildH39H38ExpressionN38TaylorCorrectedRetilePrototypeCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  seriesOrder = 60,
  stencilSubcellCounts = [8, 16],
  polynomialDegrees = [1, 2, 3],
  components = ["direct_n38_expression", "sin_phi", "sin_delta"],
  derivativePrototypeFitSubcellCount = 8,
  remainderInflationFactor = 1,
  observedM4InflationFactor = 2,
} = {}) {
  const resolvedObservedM4InflationFactor = assertFinitePositiveNumber(
    "observedM4InflationFactor",
    observedM4InflationFactor
  );
  const fourthDifferenceDiagnostic =
    buildH39H38ExpressionN38TaylorFourthDifferenceDiagnosticCandidate({
      targetSpeedInterval,
      branch,
      rootSubdivisions,
      seriesOrder,
      stencilSubcellCounts,
      polynomialDegrees,
      components,
      derivativePrototypeFitSubcellCount,
      remainderInflationFactor,
    });
  const pointTermWidthScale = Number(
    fourthDifferenceDiagnostic.fourth_difference_parameters
      .point_term_width_scale
  );
  const resolvedComponents = [
    ...fourthDifferenceDiagnostic.fourth_difference_parameters.components,
  ];
  const componentRetilePrototypes = resolvedComponents.map((component) =>
    correctedRetilePrototypeForComponent({
      component,
      componentFourthDifferenceSummaries:
        fourthDifferenceDiagnostic.stencil_summaries.flatMap((summary) =>
          summary.component_fourth_difference_rows.filter(
            (candidate) => candidate.component === component
          )
        ),
      observedM4InflationFactor: resolvedObservedM4InflationFactor,
      pointTermWidthScale,
    })
  );
  const correctedRetileRows = componentRetilePrototypes.flatMap(
    (component) => component.corrected_retile_rows
  );
  const maxCorrectedRemainderRatio = Math.max(
    ...componentRetilePrototypes.map((component) =>
      Number(component.max_corrected_remainder_to_point_width_ratio)
    )
  );
  const maxCorrectedTileCount = Math.max(
    ...componentRetilePrototypes.map((component) =>
      Number(component.corrected_tile_count)
    )
  );
  const maxObservedRetileCount = Math.max(
    ...componentRetilePrototypes.map((component) =>
      Number(component.observed_retile_count_from_fourth_difference)
    )
  );
  const totalCorrectedTileRows = correctedRetileRows.length;
  const originalTileRows = Number(
    fourthDifferenceDiagnostic.source_derivative_bound_prototype
      .total_derivative_tile_rows
  );
  const bruteSubcoverEstimate =
    fourthDifferenceDiagnostic.source_derivative_bound_prototype
      .brute_to_prototype_tile_count_ratio &&
    finitePositive(originalTileRows)
      ? Number(
          fourthDifferenceDiagnostic.source_derivative_bound_prototype
            .brute_to_prototype_tile_count_ratio
        ) * originalTileRows
      : null;
  const diagnosis =
    componentRetilePrototypes.every(
      (component) => component.all_corrected_tiles_pass_point_width_scale
    ) && totalCorrectedTileRows > originalTileRows
      ? "candidate-corrected-retile-restores-finite-point-scale-target"
      : "candidate-corrected-retile-open";
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TAYLOR_CORRECTED_RETILE_PROTOTYPE_SCHEMA,
    status:
      "h39-h38-expression-n38-taylor-corrected-retile-prototype-candidate-emitted",
    evaluation_level:
      "candidate-h38-expression-n38-local-taylor-corrected-retile-prototype",
    target_speed_interval:
      fourthDifferenceDiagnostic.target_speed_interval,
    branch: fourthDifferenceDiagnostic.branch,
    h38_numerator_y_order: H38_NUMERATOR_Y_ORDER,
    series_order: fourthDifferenceDiagnostic.series_order,
    source_fourth_difference_diagnostic: {
      schema: fourthDifferenceDiagnostic.schema,
      status: fourthDifferenceDiagnostic.status,
      diagnosis:
        fourthDifferenceDiagnostic.n38_taylor_fourth_difference_diagnosis,
      total_stencil_rows:
        fourthDifferenceDiagnostic.fourth_difference_summary
          .total_stencil_rows,
      max_fourth_derivative_estimate:
        fourthDifferenceDiagnostic.fourth_difference_summary
          .max_fourth_derivative_estimate,
      max_nonuniform_fourth_derivative_estimate:
        fourthDifferenceDiagnostic.fourth_difference_summary
          .max_nonuniform_fourth_derivative_estimate,
      max_fourth_derivative_to_required_ratio:
        fourthDifferenceDiagnostic.fourth_difference_summary
          .max_fourth_derivative_to_required_ratio,
      max_nonuniform_to_uniform_fourth_derivative_relative_gap:
        fourthDifferenceDiagnostic.fourth_difference_summary
          .max_nonuniform_to_uniform_fourth_derivative_relative_gap,
      max_retile_count_required_for_observed_fourth_difference:
        fourthDifferenceDiagnostic.fourth_difference_summary
          .max_retile_count_required_for_observed_fourth_difference,
      original_derivative_tile_rows: originalTileRows,
    },
    corrected_retile_parameters: {
      components: resolvedComponents,
      stencil_subcell_counts:
        fourthDifferenceDiagnostic.fourth_difference_parameters
          .stencil_subcell_counts,
      derivative_prototype_fit_subcell_count:
        fourthDifferenceDiagnostic.fourth_difference_parameters
          .derivative_prototype_fit_subcell_count,
      point_term_width_scale: pointTermWidthScale,
      observed_m4_inflation_factor: resolvedObservedM4InflationFactor,
      taylor_remainder_inequality:
        "corrected_remainder <= inflated_observed_M4 * xi_half_width^4 / 24",
      proof_status:
        "observed-fourth-difference-retile-not-directed-rounded",
    },
    component_corrected_retile_prototypes: componentRetilePrototypes,
    corrected_retile_rows: correctedRetileRows,
    corrected_retile_summary: {
      component_count: componentRetilePrototypes.length,
      total_corrected_tile_rows: totalCorrectedTileRows,
      max_corrected_tile_count: maxCorrectedTileCount,
      max_observed_retile_count_from_fourth_difference:
        maxObservedRetileCount,
      max_corrected_remainder_to_point_width_ratio:
        maxCorrectedRemainderRatio,
      all_components_pass_point_width_scale: componentRetilePrototypes.every(
        (component) => component.all_corrected_tiles_pass_point_width_scale
      ),
      corrected_to_original_tile_row_ratio: finitePositive(originalTileRows)
        ? totalCorrectedTileRows / originalTileRows
        : null,
      brute_to_corrected_tile_row_ratio:
        finitePositive(bruteSubcoverEstimate) &&
        finitePositive(totalCorrectedTileRows)
          ? bruteSubcoverEstimate / totalCorrectedTileRows
          : null,
    },
    n38_taylor_corrected_retile_prototype_diagnosis: diagnosis,
    candidate_certificate_route:
      "This candidate replaces the rejected parent-residual tile target with finite corrected retile rows driven by observed fourth-difference M4 estimates. It remains an observed-M4 retile prototype, not a directed-rounded fourth-derivative enclosure or shifted R43 closure.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_expression_level_n38_provider: false,
      certifies_n38_taylor_remainder_bound: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

export function buildH39H38ExpressionN38SinePairNormalFormDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  seriesOrder = 60,
  sourceStencilSubcellCount = 32,
  comparisonStencilIndex = 27,
} = {}) {
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedSourceStencilSubcellCount = assertFinitePositiveInteger(
    "sourceStencilSubcellCount",
    sourceStencilSubcellCount
  );
  if (resolvedSourceStencilSubcellCount < 5) {
    throw new Error("sourceStencilSubcellCount must be at least 5");
  }
  const resolvedComparisonStencilIndex = assertFinitePositiveInteger(
    "comparisonStencilIndex",
    comparisonStencilIndex + 1
  ) - 1;
  if (
    resolvedComparisonStencilIndex >
    resolvedSourceStencilSubcellCount - 5
  ) {
    throw new Error("comparisonStencilIndex must leave five stencil samples");
  }
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder: assertFinitePositiveInteger("seriesOrder", seriesOrder),
  });
  const rows = targetRowsForSubcellCount({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    subcellCount: resolvedSourceStencilSubcellCount,
    rootSubdivisions,
  });
  if (rows.length !== resolvedSourceStencilSubcellCount) {
    throw new Error("sine-pair normal-form diagnostic requires a complete subcover");
  }
  const summary = n38ExpressionSubcellSummary({
    rows,
    targetSpeedInterval: resolvedTargetSpeedInterval,
    branch,
    subcellCount: resolvedSourceStencilSubcellCount,
  });
  const samples = n38ExpressionTaylorFitSamplesFromSummary(summary);
  const witness = sinePairNormalFormWitnessForStencil({
    context,
    rows,
    sourceTermSamples: samples,
    targetSpeedInterval: resolvedTargetSpeedInterval,
    branch,
    refinedStencilSubcellCount: resolvedSourceStencilSubcellCount,
    comparisonStencilIndex: resolvedComparisonStencilIndex,
  });
  const diagnosis =
    witness.status === "sine-pair-normal-form-witness-emitted" &&
    witness.normal_form_interpretation ===
      "sine-pair-sum-coordinate-cancels-branch-and-h-row-dependence" &&
    witness.sine_pair_fourth_difference_replays_sin_terms
      ? "sine-pair-normal-form-replays-live-positive-xi-source"
      : "sine-pair-normal-form-open";
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_SINE_PAIR_NORMAL_FORM_DIAGNOSTIC_SCHEMA,
    status:
      "h39-h38-expression-n38-sine-pair-normal-form-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-h38-expression-n38-sine-pair-normal-form-diagnostic",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    h38_numerator_y_order: H38_NUMERATOR_Y_ORDER,
    series_order: context.seriesOrder,
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    sine_pair_normal_form_witness: witness,
    n38_sine_pair_normal_form_diagnosis: diagnosis,
    candidate_certificate_route:
      "This diagnostic rewrites the sine-bearing N38 source as a sum/difference coordinate normal form. It verifies the algebraic identity on live midpoint producer rows, but it is not a directed-rounded Taylor or Cauchy enclosure.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_expression_level_n38_provider: false,
      certifies_n38_taylor_remainder_bound: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

export function buildH39H38ExpressionN38ReducedSigmaEtaSourceDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  seriesOrder = 60,
  sourceStencilSubcellCount = 32,
  comparisonStencilIndex = 27,
} = {}) {
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedSourceStencilSubcellCount = assertFinitePositiveInteger(
    "sourceStencilSubcellCount",
    sourceStencilSubcellCount
  );
  if (resolvedSourceStencilSubcellCount < 5) {
    throw new Error("sourceStencilSubcellCount must be at least 5");
  }
  const resolvedComparisonStencilIndex = assertFinitePositiveInteger(
    "comparisonStencilIndex",
    comparisonStencilIndex + 1
  ) - 1;
  if (
    resolvedComparisonStencilIndex >
    resolvedSourceStencilSubcellCount - 5
  ) {
    throw new Error("comparisonStencilIndex must leave five stencil samples");
  }
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder: assertFinitePositiveInteger("seriesOrder", seriesOrder),
  });
  const rows = targetRowsForSubcellCount({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    subcellCount: resolvedSourceStencilSubcellCount,
    rootSubdivisions,
  });
  if (rows.length !== resolvedSourceStencilSubcellCount) {
    throw new Error("reduced sigma-eta diagnostic requires a complete subcover");
  }
  const comparisonRows = rows.slice(
    resolvedComparisonStencilIndex,
    resolvedComparisonStencilIndex + 5
  );
  const reducedRows = comparisonRows.map((row) =>
    reducedSigmaEtaSourceRow({
      context,
      row,
      targetSpeedInterval: resolvedTargetSpeedInterval,
      branch,
    })
  );
  const summary = reducedSigmaEtaSourceSummary({ rows: reducedRows });
  const diagnosis =
    summary.route_interpretation ===
    "h38-zeroed-sigma-eta-product-exposes-eta-dependency-blocker"
      ? "reduced-sigma-eta-product-route-widens-live-n38-source"
      : summary.route_interpretation ===
          "sigma-eta-sine-reduction-exposes-source-level-correlation-blocker"
      ? "reduced-sigma-eta-sine-route-is-insufficient-for-full-source"
      : "reduced-sigma-eta-source-route-open";
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_REDUCED_SIGMA_ETA_SOURCE_DIAGNOSTIC_SCHEMA,
    status:
      "h39-h38-expression-n38-reduced-sigma-eta-source-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-h38-expression-n38-reduced-sigma-eta-source-diagnostic",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    h38_numerator_y_order: H38_NUMERATOR_Y_ORDER,
    series_order: context.seriesOrder,
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    comparison_xi_midpoint_span: [
      reducedRows[0]?.xi_midpoint,
      reducedRows[reducedRows.length - 1]?.xi_midpoint,
    ],
    proof_status:
      "directed-interval-coordinate-replay-not-shifted-R43-certificate",
    reduced_sigma_eta_rows: reducedRows,
    reduced_sigma_eta_summary: summary,
    n38_reduced_sigma_eta_source_diagnosis: diagnosis,
    candidate_certificate_route:
      "This diagnostic forms sigma=(delta+phi)/2 before interval h-row substitution and eta=(delta-phi)/2 as the transported coordinate, with the h38 solve target zeroed as in the live N38 numerator. The reduced coordinate removes raw half-sum h-tail residue, but the naive product 2 sin(sigma) cos(eta) widens on the live interval rows and the full source also widens. The next certificate must preserve eta transport and delta^2/nu^2 versus sine-pair correlation, not merely substitute the product identity. It is not a directed-rounded source enclosure.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_expression_level_n38_provider: false,
      certifies_n38_taylor_remainder_bound: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

export function buildH39H38ExpressionN38EtaTransportCouplingDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  seriesOrder = 60,
  sourceStencilSubcellCount = 32,
  comparisonStencilIndex = 27,
  topContributorCount = 8,
} = {}) {
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedSourceStencilSubcellCount = assertFinitePositiveInteger(
    "sourceStencilSubcellCount",
    sourceStencilSubcellCount
  );
  if (resolvedSourceStencilSubcellCount < 5) {
    throw new Error("sourceStencilSubcellCount must be at least 5");
  }
  const resolvedComparisonStencilIndex = assertFinitePositiveInteger(
    "comparisonStencilIndex",
    comparisonStencilIndex + 1
  ) - 1;
  if (
    resolvedComparisonStencilIndex >
    resolvedSourceStencilSubcellCount - 5
  ) {
    throw new Error("comparisonStencilIndex must leave five stencil samples");
  }
  const resolvedTopContributorCount = assertFinitePositiveInteger(
    "topContributorCount",
    topContributorCount
  );
  if (resolvedTopContributorCount > 39) {
    throw new Error("topContributorCount cannot exceed h-row count");
  }
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder: assertFinitePositiveInteger("seriesOrder", seriesOrder),
  });
  const rows = targetRowsForSubcellCount({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    subcellCount: resolvedSourceStencilSubcellCount,
    rootSubdivisions,
  });
  if (rows.length !== resolvedSourceStencilSubcellCount) {
    throw new Error("eta transport coupling diagnostic requires a complete subcover");
  }
  const comparisonRows = rows.slice(
    resolvedComparisonStencilIndex,
    resolvedComparisonStencilIndex + 5
  );
  const etaRows = comparisonRows.map((row) =>
    etaTransportCouplingRow({
      context,
      row,
      targetSpeedInterval: resolvedTargetSpeedInterval,
      branch,
      topContributorCount: resolvedTopContributorCount,
    })
  );
  const summary = etaTransportCouplingSummary({ rows: etaRows });
  const diagnosis =
    summary.route_interpretation ===
    "terminal-eta-transport-rows-dominate-reduced-source-width"
      ? "eta-transport-width-localizes-to-terminal-h37-h36-h35"
      : "eta-transport-coupling-route-open";
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_ETA_TRANSPORT_COUPLING_DIAGNOSTIC_SCHEMA,
    status:
      "h39-h38-expression-n38-eta-transport-coupling-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-h38-expression-n38-eta-transport-coupling-diagnostic",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    h38_numerator_y_order: H38_NUMERATOR_Y_ORDER,
    series_order: context.seriesOrder,
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    comparison_xi_midpoint_span: [
      etaRows[0]?.xi_midpoint,
      etaRows[etaRows.length - 1]?.xi_midpoint,
    ],
    top_contributor_count: resolvedTopContributorCount,
    proof_status:
      "finite-eta-transport-replay-not-directed-rounded-source-certificate",
    eta_transport_coupling_rows: etaRows,
    eta_transport_coupling_summary: summary,
    n38_eta_transport_coupling_diagnosis: diagnosis,
    candidate_certificate_route:
      "This diagnostic keeps the reduced sigma=(delta+phi)/2, eta=(delta-phi)/2 chart and replays the h38-zeroed N38 source with frozen eta h rows, all-active eta h rows, and one-active eta h-row modes. It localizes the widened reduced source to terminal transported predecessor rows, but it is not a directed-rounded eta-transport enclosure or shifted R43 certificate.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_expression_level_n38_provider: false,
      certifies_n38_taylor_remainder_bound: false,
      certifies_eta_transport_enclosure: false,
      certifies_reduced_source_enclosure: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

export function buildH39H38ExpressionN38TerminalEtaGraphDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  seriesOrder = 60,
  sourceStencilSubcellCount = 32,
  comparisonStencilIndex = 27,
  polynomialDegree = 2,
  terminalHIndexes = [37, 36, 35],
  topContributorCount = 8,
} = {}) {
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedSourceStencilSubcellCount = assertFinitePositiveInteger(
    "sourceStencilSubcellCount",
    sourceStencilSubcellCount
  );
  if (resolvedSourceStencilSubcellCount < 5) {
    throw new Error("sourceStencilSubcellCount must be at least 5");
  }
  const resolvedComparisonStencilIndex = assertFinitePositiveInteger(
    "comparisonStencilIndex",
    comparisonStencilIndex + 1
  ) - 1;
  if (
    resolvedComparisonStencilIndex >
    resolvedSourceStencilSubcellCount - 5
  ) {
    throw new Error("comparisonStencilIndex must leave five stencil samples");
  }
  const resolvedPolynomialDegree = assertFinitePositiveInteger(
    "polynomialDegree",
    polynomialDegree
  );
  const resolvedTopContributorCount = assertFinitePositiveInteger(
    "topContributorCount",
    topContributorCount
  );
  const resolvedTerminalHIndexes = terminalHIndexes.map((hIndex) => {
    const resolved = Number(hIndex);
    if (!Number.isInteger(resolved) || resolved < 0 || resolved > 38) {
      throw new Error("terminalHIndexes must contain h indexes 0 through 38");
    }
    return resolved;
  });
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder: assertFinitePositiveInteger("seriesOrder", seriesOrder),
  });
  const rows = targetRowsForSubcellCount({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    subcellCount: resolvedSourceStencilSubcellCount,
    rootSubdivisions,
  });
  if (rows.length !== resolvedSourceStencilSubcellCount) {
    throw new Error("terminal eta graph diagnostic requires a complete subcover");
  }
  const comparisonRows = rows.slice(
    resolvedComparisonStencilIndex,
    resolvedComparisonStencilIndex + 5
  );
  const terminalTransportProfile = hRowPolynomialTransportProfileForRows({
    rows: comparisonRows,
    branch,
    targetSpeedInterval: resolvedTargetSpeedInterval,
    degree: resolvedPolynomialDegree,
  });
  const terminalResidualProfile =
    polynomialGraphProducerIntervalResidualProfileForRows({
      targetSpeedInterval: resolvedTargetSpeedInterval,
      rows: comparisonRows,
      branch,
      transportProfile: terminalTransportProfile,
    });
  const terminalRows = comparisonRows.map((row) =>
    terminalEtaGraphRow({
      context,
      row,
      targetSpeedInterval: resolvedTargetSpeedInterval,
      branch,
      transportProfile: terminalTransportProfile,
      residualProfile: terminalResidualProfile,
      terminalHIndexes: resolvedTerminalHIndexes,
      topContributorCount: resolvedTopContributorCount,
    })
  );
  const summary = terminalEtaGraphSummary({
    rows: terminalRows,
    terminalHIndexes: resolvedTerminalHIndexes,
  });
  const diagnosis =
    summary.route_interpretation ===
    "terminal-polynomial-graph-collapses-localized-eta-width-candidate"
      ? "terminal-row-polynomial-graph-is-next-certificate-route"
      : "terminal-row-graph-route-open";
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TERMINAL_ETA_GRAPH_DIAGNOSTIC_SCHEMA,
    status:
      "h39-h38-expression-n38-terminal-eta-graph-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-h38-expression-n38-terminal-eta-graph-diagnostic",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    h38_numerator_y_order: H38_NUMERATOR_Y_ORDER,
    series_order: context.seriesOrder,
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    comparison_xi_midpoint_span: [
      terminalRows[0]?.xi_midpoint,
      terminalRows[terminalRows.length - 1]?.xi_midpoint,
    ],
    polynomial_degree: resolvedPolynomialDegree,
    terminal_provider_h_indexes: resolvedTerminalHIndexes,
    top_contributor_count: resolvedTopContributorCount,
    proof_status:
      "finite-terminal-eta-graph-replay-not-directed-rounded-source-certificate",
    terminal_eta_graph_rows: terminalRows,
    terminal_eta_graph_summary: summary,
    n38_terminal_eta_graph_diagnosis: diagnosis,
    candidate_certificate_route:
      "This diagnostic replays the reduced sigma-eta N38 source with the localized terminal eta h rows h37,h36,h35 isolated. It compares terminal-only, nonterminal-only, terminal polynomial graph, and terminal graph-plus-interval-residual modes on the same positive-xi stencil. The graph replay is a candidate local normal form only; the interval residual replay remains a check against exporting raw producer hulls as a certificate.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_expression_level_n38_provider: false,
      certifies_terminal_row_provider_enclosure: false,
      certifies_eta_transport_enclosure: false,
      certifies_reduced_source_enclosure: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

export function buildH39H38ExpressionN38TerminalGraphRemainderBudgetDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  seriesOrder = 60,
  sourceStencilSubcellCount = 32,
  comparisonStencilIndex = 27,
  polynomialDegree = 2,
  terminalHIndexes = [37, 36, 35],
  residualBudgetTargetShareOfAll = 0.05,
  residualBudgetScales = [0, 0.02, 0.05, 1],
  residualNoiseSamples = [-1, -0.5, 0, 0.5, 1],
  residualCoordinatePartitionCount = 8,
  refinementSubcellCounts = [32],
  topContributorCount = 8,
  progressCallback = null,
} = {}) {
  const startedAt = Date.now();
  const emitProgress =
    typeof progressCallback === "function"
      ? (progress) =>
          progressCallback({
            diagnostic:
              "h39-h38-expression-n38-terminal-graph-remainder-budget",
            elapsed_ms: Date.now() - startedAt,
            ...progress,
          })
      : null;
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedSourceStencilSubcellCount = assertFinitePositiveInteger(
    "sourceStencilSubcellCount",
    sourceStencilSubcellCount
  );
  if (resolvedSourceStencilSubcellCount < 5) {
    throw new Error("sourceStencilSubcellCount must be at least 5");
  }
  const resolvedComparisonStencilIndex = assertFinitePositiveInteger(
    "comparisonStencilIndex",
    comparisonStencilIndex + 1
  ) - 1;
  if (
    resolvedComparisonStencilIndex >
    resolvedSourceStencilSubcellCount - 5
  ) {
    throw new Error("comparisonStencilIndex must leave five stencil samples");
  }
  const resolvedPolynomialDegree = assertFinitePositiveInteger(
    "polynomialDegree",
    polynomialDegree
  );
  const resolvedTargetShare = assertFinitePositiveNumber(
    "residualBudgetTargetShareOfAll",
    residualBudgetTargetShareOfAll
  );
  if (resolvedTargetShare >= 1) {
    throw new Error("residualBudgetTargetShareOfAll must be less than 1");
  }
  const resolvedResidualBudgetScales = [
    ...new Set(residualBudgetScales.map(Number)),
  ].sort((left, right) => left - right);
  if (
    resolvedResidualBudgetScales.length < 2 ||
    resolvedResidualBudgetScales[0] !== 0 ||
    resolvedResidualBudgetScales[resolvedResidualBudgetScales.length - 1] !==
      1 ||
    !resolvedResidualBudgetScales.every(
      (scale) => Number.isFinite(scale) && scale >= 0 && scale <= 1
    )
  ) {
    throw new Error("residualBudgetScales must include 0 and 1 within [0,1]");
  }
  const resolvedResidualNoiseSamples = [
    ...new Set(residualNoiseSamples.map(Number)),
  ].sort((left, right) => left - right);
  if (
    resolvedResidualNoiseSamples.length < 3 ||
    resolvedResidualNoiseSamples[0] !== -1 ||
    resolvedResidualNoiseSamples[
      resolvedResidualNoiseSamples.length - 1
    ] !== 1 ||
    !resolvedResidualNoiseSamples.every(
      (sample) => Number.isFinite(sample) && sample >= -1 && sample <= 1
    )
  ) {
    throw new Error("residualNoiseSamples must include -1 and 1 within [-1,1]");
  }
  const resolvedTopContributorCount = assertFinitePositiveInteger(
    "topContributorCount",
    topContributorCount
  );
  const resolvedResidualCoordinatePartitionCount =
    assertFinitePositiveInteger(
      "residualCoordinatePartitionCount",
      residualCoordinatePartitionCount
    );
  const resolvedRefinementSubcellCounts = [
    ...new Set(refinementSubcellCounts.map((count) =>
      assertFinitePositiveInteger("refinementSubcellCounts", count)
    )),
  ].sort((left, right) => left - right);
  if (
    resolvedRefinementSubcellCounts.length < 1 ||
    resolvedRefinementSubcellCounts[0] !== resolvedSourceStencilSubcellCount ||
    resolvedRefinementSubcellCounts.some(
      (count) => count < resolvedSourceStencilSubcellCount
    )
  ) {
    throw new Error("refinementSubcellCounts must start at sourceStencilSubcellCount");
  }
  const resolvedTerminalHIndexes = terminalHIndexes.map((hIndex) => {
    const resolved = Number(hIndex);
    if (!Number.isInteger(resolved) || resolved < 0 || resolved > 38) {
      throw new Error("terminalHIndexes must contain h indexes 0 through 38");
    }
    return resolved;
  });
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder: assertFinitePositiveInteger("seriesOrder", seriesOrder),
  });
  emitProgress?.({
    stage: "terminal-graph-budget-source-subcover-start",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    row_count: 5,
    completed_row_count: 0,
  });
  const rows = targetRowsForSubcellCount({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    subcellCount: resolvedSourceStencilSubcellCount,
    rootSubdivisions,
  });
  emitProgress?.({
    stage: "terminal-graph-budget-source-subcover-complete",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    row_count: rows.length,
    completed_row_count: 0,
  });
  if (rows.length !== resolvedSourceStencilSubcellCount) {
    throw new Error(
      "terminal graph remainder budget diagnostic requires a complete subcover"
    );
  }
  const comparisonRows = rows.slice(
    resolvedComparisonStencilIndex,
    resolvedComparisonStencilIndex + 5
  );
  emitProgress?.({
    stage: "terminal-graph-budget-comparison-window-ready",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    row_count: comparisonRows.length,
    completed_row_count: 0,
  });
  const terminalTransportProfile = hRowPolynomialTransportProfileForRows({
    rows: comparisonRows,
    branch,
    targetSpeedInterval: resolvedTargetSpeedInterval,
    degree: resolvedPolynomialDegree,
  });
  emitProgress?.({
    stage: "terminal-graph-budget-transport-profile-ready",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    row_count: comparisonRows.length,
    completed_row_count: 0,
  });
  const terminalResidualProfile =
    polynomialGraphProducerIntervalResidualProfileForRows({
      targetSpeedInterval: resolvedTargetSpeedInterval,
      rows: comparisonRows,
      branch,
      transportProfile: terminalTransportProfile,
    });
  emitProgress?.({
    stage: "terminal-graph-budget-residual-profile-ready",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    row_count: comparisonRows.length,
    completed_row_count: 0,
  });
  const budgetRows = comparisonRows.map((row, rowIndex) => {
    emitProgress?.({
      stage: "terminal-graph-budget-row-start",
      source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
      comparison_stencil_index: resolvedComparisonStencilIndex,
      row_count: comparisonRows.length,
      completed_row_count: rowIndex,
      row_index: rowIndex,
      cell_id: row.cell_id,
      speed_interval: row.speed_interval,
    });
    const budgetRow = terminalGraphRemainderBudgetRow({
      context,
      row,
      targetSpeedInterval: resolvedTargetSpeedInterval,
      branch,
      transportProfile: terminalTransportProfile,
      residualProfile: terminalResidualProfile,
      terminalHIndexes: resolvedTerminalHIndexes,
      residualBudgetTargetShareOfAll: resolvedTargetShare,
      residualBudgetScales: resolvedResidualBudgetScales,
      residualNoiseSamples: resolvedResidualNoiseSamples,
      residualCoordinatePartitionCount:
        resolvedResidualCoordinatePartitionCount,
      topContributorCount: resolvedTopContributorCount,
    });
    emitProgress?.({
      stage: "terminal-graph-budget-row-complete",
      source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
      comparison_stencil_index: resolvedComparisonStencilIndex,
      row_count: comparisonRows.length,
      completed_row_count: rowIndex + 1,
      row_index: rowIndex,
      cell_id: row.cell_id,
      speed_interval: row.speed_interval,
      route_interpretation:
        budgetRow.residual_coordinate_partition_route_interpretation,
      graph_endpoint_width_share:
        budgetRow
          .max_terminal_graph_correlated_residual_graph_endpoint_partition_width_share_of_all,
    });
    return budgetRow;
  });
  emitProgress?.({
    stage: "terminal-graph-budget-rows-complete",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    row_count: comparisonRows.length,
    completed_row_count: comparisonRows.length,
  });
  const summary = terminalGraphRemainderBudgetSummary({
    rows: budgetRows,
    terminalHIndexes: resolvedTerminalHIndexes,
    residualBudgetTargetShareOfAll: resolvedTargetShare,
  });
  emitProgress?.({
    stage: "terminal-graph-budget-summary-ready",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    row_count: comparisonRows.length,
    completed_row_count: comparisonRows.length,
    route_interpretation:
      summary.correlated_terminal_residual_partition_route_interpretation,
    graph_affine_width_share:
      summary
        .max_correlated_terminal_residual_graph_affine_envelope_width_share_of_all,
  });
  const refinementForecast = terminalProducerRefinementForecast({
    targetSpeedInterval: resolvedTargetSpeedInterval,
    branch,
    rootSubdivisions,
    polynomialDegree: resolvedPolynomialDegree,
    terminalHIndexes: resolvedTerminalHIndexes,
    baseSubcellCount: resolvedSourceStencilSubcellCount,
    baseBudgetRows: budgetRows,
    refinementSubcellCounts: resolvedRefinementSubcellCounts,
  });
  emitProgress?.({
    stage: "terminal-graph-budget-forecast-ready",
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    row_count: comparisonRows.length,
    completed_row_count: comparisonRows.length,
    projected_subcell_count:
      refinementForecast.projected_subcell_count_for_baseline_budget,
  });
  const diagnosis =
    summary.correlated_terminal_residual_partition_route_interpretation ===
    "shared-terminal-residual-coordinate-affine-endpoint-partition-closes-graph-xi-candidate"
      ? "terminal-graph-remainder-affine-zeta-endpoint-partition-route-candidate"
      : summary.route_interpretation ===
    "terminal-graph-remainder-budget-localizes-enclosure-failure-to-producer-interval-width"
      ? "terminal-graph-remainder-enclosure-needs-producer-interval-refinement"
      : "terminal-graph-remainder-budget-route-open";
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TERMINAL_GRAPH_REMAINDER_BUDGET_DIAGNOSTIC_SCHEMA,
    status:
      "h39-h38-expression-n38-terminal-graph-remainder-budget-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-h38-expression-n38-terminal-graph-remainder-budget-diagnostic",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    h38_numerator_y_order: H38_NUMERATOR_Y_ORDER,
    series_order: context.seriesOrder,
    source_stencil_subcell_count: resolvedSourceStencilSubcellCount,
    comparison_stencil_index: resolvedComparisonStencilIndex,
    comparison_xi_midpoint_span: [
      budgetRows[0]?.xi_midpoint,
      budgetRows[budgetRows.length - 1]?.xi_midpoint,
    ],
    polynomial_degree: resolvedPolynomialDegree,
    terminal_provider_h_indexes: resolvedTerminalHIndexes,
    residual_budget_target_share_of_all: resolvedTargetShare,
    residual_budget_scales: resolvedResidualBudgetScales,
    residual_noise_samples: resolvedResidualNoiseSamples,
    residual_coordinate_partition_count:
      resolvedResidualCoordinatePartitionCount,
    refinement_subcell_counts: resolvedRefinementSubcellCounts,
    top_contributor_count: resolvedTopContributorCount,
    proof_status:
      "finite-terminal-graph-remainder-budget-not-directed-rounded-provider-certificate",
    terminal_graph_remainder_budget_rows: budgetRows,
    terminal_graph_remainder_budget_summary: summary,
    terminal_producer_refinement_forecast: refinementForecast,
    n38_terminal_graph_remainder_budget_diagnosis: diagnosis,
    candidate_certificate_route:
      "This diagnostic keeps the reduced sigma-eta N38 route, quantifies how much symmetric terminal graph remainder can be tolerated, and checks whether the current H38 producer intervals fit inside that budget. It also proves a structural candidate reason for endpoint zeta control at y-order 42: terminal h37,h36,h35 residual factors enter at orders 40,39,38, so two terminal residual factors cannot contribute before y-order 76. The eight-slice dependency-preserving endpoint replay is therefore the next provider route candidate. This remains candidate-only, not a directed-rounded terminal provider enclosure.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_expression_level_n38_provider: false,
      certifies_terminal_row_provider_enclosure: false,
      certifies_terminal_graph_remainder_bound: false,
      certifies_eta_transport_enclosure: false,
      certifies_reduced_source_enclosure: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

export function buildH39H38ExpressionN38TaylorM4RefinementDiagnosticCandidate({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  rootSubdivisions = 100,
  seriesOrder = 60,
  baseStencilSubcellCounts = [8, 16],
  refinementStencilSubcellCounts = [8, 16, 32],
  polynomialDegrees = [1, 2, 3],
  components = ["direct_n38_expression", "sin_phi", "sin_delta"],
  sourceTermComponents = [
    "delta_squared_speed",
    "sin_phi",
    "sin_delta",
  ],
  derivativePrototypeFitSubcellCount = 8,
  remainderInflationFactor = 1,
  observedM4InflationFactor = 2,
} = {}) {
  const resolvedBaseStencilSubcellCounts = [
    ...new Set(baseStencilSubcellCounts),
  ]
    .map((count) => assertFinitePositiveInteger("baseStencilSubcellCounts", count))
    .sort((left, right) => left - right);
  const resolvedRefinementStencilSubcellCounts = [
    ...new Set([
      ...resolvedBaseStencilSubcellCounts,
      ...refinementStencilSubcellCounts,
    ]),
  ]
    .map((count) =>
      assertFinitePositiveInteger("refinementStencilSubcellCounts", count)
    )
    .sort((left, right) => left - right);
  if (
    resolvedBaseStencilSubcellCounts.some((count) => count < 5) ||
    resolvedRefinementStencilSubcellCounts.some((count) => count < 5)
  ) {
    throw new Error("M4 refinement stencil counts must be at least 5");
  }
  const resolvedComponents = [...new Set(components.map(String))];
  if (resolvedComponents.length === 0) {
    throw new Error("components must be nonempty");
  }
  const resolvedSourceTermComponents = [
    ...new Set(sourceTermComponents.map(String)),
  ];
  const resolvedObservedM4InflationFactor = assertFinitePositiveNumber(
    "observedM4InflationFactor",
    observedM4InflationFactor
  );
  const fourthDifferenceDiagnostic =
    buildH39H38ExpressionN38TaylorFourthDifferenceDiagnosticCandidate({
      targetSpeedInterval,
      branch,
      rootSubdivisions,
      seriesOrder,
      stencilSubcellCounts: resolvedRefinementStencilSubcellCounts,
      polynomialDegrees,
      components: resolvedComponents,
      derivativePrototypeFitSubcellCount,
      remainderInflationFactor,
    });
  const pointTermWidthScale = Number(
    fourthDifferenceDiagnostic.fourth_difference_parameters
      .point_term_width_scale
  );
  const refinementRows = resolvedComponents.map((component) =>
    m4RefinementRowForComponent({
      component,
      fourthDifferenceDiagnostic,
      baseStencilSubcellCounts: resolvedBaseStencilSubcellCounts,
      refinementStencilSubcellCounts: resolvedRefinementStencilSubcellCounts,
      observedM4InflationFactor: resolvedObservedM4InflationFactor,
      pointTermWidthScale,
    })
  );
  const baseTotalCorrectedRows = refinementRows.reduce(
    (total, row) => total + Number(row.base_corrected_tile_count),
    0
  );
  const refinedTotalCorrectedRows = refinementRows.reduce(
    (total, row) => total + Number(row.refined_corrected_tile_count),
    0
  );
  const baselineInflationCoversRefinedStencils = refinementRows.every(
    (row) =>
      row.baseline_inflation_covers_refined_observed_m4 &&
      row.base_corrected_rows_cover_refined_observed_m4_point_scale
  );
  const allRefinedCorrectedRowsPassPointScale = refinementRows.every(
    (row) => row.refined_corrected_rows_pass_point_scale
  );
  const maxRefinedToBaseM4Ratio = Math.max(
    ...refinementRows.map((row) =>
      Number(row.refined_to_base_observed_m4_ratio)
    )
  );
  const maxBaseRemainderRatioUnderRefinedObservedM4 = Math.max(
    ...refinementRows.map((row) =>
      Number(row.base_corrected_rows_max_remainder_ratio_under_refined_observed_m4)
    )
  );
  const maxComparedStencilNonuniformCorrectionGap = Math.max(
    ...refinementRows.flatMap((row) => [
      Number(row.base_nonuniform_to_uniform_fourth_derivative_relative_gap),
      Number(row.refined_nonuniform_to_uniform_fourth_derivative_relative_gap),
    ])
  );
  const nonuniformCorrectionToGrowthExcessRatio = finitePositive(
    maxRefinedToBaseM4Ratio - 1
  )
    ? maxComparedStencilNonuniformCorrectionGap /
      (maxRefinedToBaseM4Ratio - 1)
    : null;
  const growthLocalizationSummary = summarizeM4GrowthLocalization(
    refinementRows.map((row) => row.fourth_difference_growth_localization)
  );
  const refinedStencilSubcellCount = Math.max(
    ...resolvedRefinementStencilSubcellCounts
  );
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder: assertFinitePositiveInteger("seriesOrder", seriesOrder),
  });
  const sourceTermRows = targetRowsForSubcellCount({
    targetSpeedInterval,
    subcellCount: refinedStencilSubcellCount,
    rootSubdivisions,
  });
  if (sourceTermRows.length !== refinedStencilSubcellCount) {
    throw new Error("M4 refinement source-term witness requires a complete refined subcover");
  }
  const sourceTermSummary = n38ExpressionSubcellSummary({
    rows: sourceTermRows,
    targetSpeedInterval,
    branch,
    subcellCount: refinedStencilSubcellCount,
  });
  const sourceTermSamples =
    n38ExpressionTaylorFitSamplesFromSummary(sourceTermSummary);
  const positiveXiSourceTermCancellation =
    sourceTermCancellationOnRefinedWorstStencil({
      fourthDifferenceDiagnostic,
      refinementRows,
      sourceTermSamples,
      sourceTermComponents: resolvedSourceTermComponents,
      refinedStencilSubcellCount,
      growthLocalizationSummary,
    });
  const positiveXiSinePairNormalForm =
    positiveXiSourceTermCancellation.status ===
    "source-term-cancellation-witness-emitted"
      ? sinePairNormalFormWitnessForStencil({
          context,
          rows: sourceTermRows,
          sourceTermSamples,
          targetSpeedInterval,
          branch,
          refinedStencilSubcellCount,
          comparisonStencilIndex:
            positiveXiSourceTermCancellation.comparison_stencil_index,
          sourceCancellation: positiveXiSourceTermCancellation,
        })
      : {
          status: "sine-pair-normal-form-witness-unavailable",
          reason: "source-term cancellation witness unavailable",
        };
  const diagnosis =
    !baselineInflationCoversRefinedStencils &&
    allRefinedCorrectedRowsPassPointScale
      ? "finer-stencil-rejects-base-m4-inflation-but-refined-retile-remains-finite"
      : baselineInflationCoversRefinedStencils
        ? "base-m4-inflation-stable-under-refinement"
        : "m4-refinement-route-open";
  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TAYLOR_M4_REFINEMENT_DIAGNOSTIC_SCHEMA,
    status:
      "h39-h38-expression-n38-taylor-m4-refinement-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-h38-expression-n38-local-taylor-m4-refinement-diagnostic",
    target_speed_interval:
      fourthDifferenceDiagnostic.target_speed_interval,
    branch: fourthDifferenceDiagnostic.branch,
    h38_numerator_y_order: H38_NUMERATOR_Y_ORDER,
    series_order: fourthDifferenceDiagnostic.series_order,
    source_fourth_difference_diagnostic: {
      schema: fourthDifferenceDiagnostic.schema,
      status: fourthDifferenceDiagnostic.status,
      diagnosis:
        fourthDifferenceDiagnostic.n38_taylor_fourth_difference_diagnosis,
      total_stencil_rows:
        fourthDifferenceDiagnostic.fourth_difference_summary
          .total_stencil_rows,
      max_fourth_derivative_estimate:
        fourthDifferenceDiagnostic.fourth_difference_summary
          .max_fourth_derivative_estimate,
      max_nonuniform_fourth_derivative_estimate:
        fourthDifferenceDiagnostic.fourth_difference_summary
          .max_nonuniform_fourth_derivative_estimate,
      max_fourth_derivative_to_required_ratio:
        fourthDifferenceDiagnostic.fourth_difference_summary
          .max_fourth_derivative_to_required_ratio,
      max_nonuniform_to_uniform_fourth_derivative_relative_gap:
        fourthDifferenceDiagnostic.fourth_difference_summary
          .max_nonuniform_to_uniform_fourth_derivative_relative_gap,
      max_retile_count_required_for_observed_fourth_difference:
        fourthDifferenceDiagnostic.fourth_difference_summary
          .max_retile_count_required_for_observed_fourth_difference,
    },
    m4_refinement_parameters: {
      components: resolvedComponents,
      source_term_components: resolvedSourceTermComponents,
      fourth_difference_components: resolvedComponents,
      base_stencil_subcell_counts: resolvedBaseStencilSubcellCounts,
      refinement_stencil_subcell_counts:
        resolvedRefinementStencilSubcellCounts,
      derivative_prototype_fit_subcell_count:
        derivativePrototypeFitSubcellCount,
      polynomial_degrees: polynomialDegrees,
      point_term_width_scale: pointTermWidthScale,
      observed_m4_inflation_factor: resolvedObservedM4InflationFactor,
      proof_status:
        "finite-difference-refinement-not-directed-rounded-enclosure",
    },
    component_m4_refinement_rows: refinementRows,
    m4_refinement_summary: {
      component_count: refinementRows.length,
      base_total_corrected_tile_rows: baseTotalCorrectedRows,
      refined_total_corrected_tile_rows: refinedTotalCorrectedRows,
      refined_to_base_total_corrected_tile_row_ratio: finitePositive(
        baseTotalCorrectedRows
      )
        ? refinedTotalCorrectedRows / baseTotalCorrectedRows
        : null,
      max_refined_to_base_observed_m4_ratio: maxRefinedToBaseM4Ratio,
      max_base_corrected_rows_remainder_ratio_under_refined_observed_m4:
        maxBaseRemainderRatioUnderRefinedObservedM4,
      max_compared_stencil_nonuniform_to_uniform_fourth_derivative_relative_gap:
        maxComparedStencilNonuniformCorrectionGap,
      nonuniform_correction_to_growth_excess_ratio:
        nonuniformCorrectionToGrowthExcessRatio,
      fourth_difference_growth_localization_summary:
        growthLocalizationSummary,
      positive_xi_source_term_cancellation:
        positiveXiSourceTermCancellation,
      positive_xi_sine_pair_normal_form:
        positiveXiSinePairNormalForm,
      baseline_inflation_covers_refined_stencils:
        baselineInflationCoversRefinedStencils,
      all_refined_corrected_rows_pass_point_scale:
        allRefinedCorrectedRowsPassPointScale,
      max_refined_corrected_tile_count: Math.max(
        ...refinementRows.map((row) =>
          Number(row.refined_corrected_tile_count)
        )
      ),
      max_refined_observed_retile_count: Math.max(
        ...refinementRows.map((row) =>
          Number(row.refined_observed_retile_count)
        )
      ),
      nonuniform_stencil_correction_explains_growth:
        Number(nonuniformCorrectionToGrowthExcessRatio) > 0.25,
      fourth_difference_growth_interpretation:
        Number(nonuniformCorrectionToGrowthExcessRatio) <= 0.25
          ? "growth-not-explained-by-nonuniform-xi-spacing"
          : "growth-may-be-contaminated-by-nonuniform-xi-spacing",
    },
    n38_taylor_m4_refinement_diagnosis: diagnosis,
    candidate_certificate_route:
      "This diagnostic checks whether the base corrected-retile M4 inflation remains compatible with a finer producer-row fourth-difference stencil. A refinement failure does not close H39; it replaces the previous finite row set with the refined same-domain row set or points to an analytic normal form for the growing fourth variation.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_expression_level_n38_provider: false,
      certifies_n38_taylor_remainder_bound: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

export function buildH39RecurrenceRefinedSubcoverPressureDiagnostic({
  targetSpeedInterval = [3.02156, 3.02156007813],
  branch = "-",
  subcellCounts = [1, 2, 4],
  rootSubdivisions = 100,
  outerRadius = 0.001,
  shiftedIndex = 1,
  seriesOrder = 60,
  hFreezeStartIndexes = [38, 20, 10, 0],
} = {}) {
  const resolvedTargetSpeedInterval = numericInterval(
    "targetSpeedInterval",
    targetSpeedInterval
  );
  const resolvedSubcellCounts = [...new Set(subcellCounts)].map((count) =>
    assertFinitePositiveInteger("subcellCounts", count)
  );
  if (resolvedSubcellCounts.length === 0) {
    throw new Error("subcellCounts must be nonempty");
  }
  resolvedSubcellCounts.sort((left, right) => left - right);
  const resolvedOuterRadius = assertFinitePositiveNumber(
    "outerRadius",
    outerRadius
  );
  const resolvedShiftedIndex = assertFinitePositiveInteger(
    "shiftedIndex",
    shiftedIndex
  );
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder: assertFinitePositiveInteger("seriesOrder", seriesOrder),
  });
  let coarseOneNoiseRow = null;
  let twoRefinedOneNoiseRows = null;
  const replays = resolvedSubcellCounts.map((subcellCount) => {
    const speedSamples = speedSamplesForLocalSubcover({
      targetSpeedInterval: resolvedTargetSpeedInterval,
      subcellCount,
    });
    const artifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyEighthOrderPostUSuccessorCoefficientCertificate(
        {
          speedSamples,
          rootSubdivisions,
        }
      );
    const rows = localRowsForTargetInterval(
      artifact.thirty_eighth_order_post_u_successor_coefficient_rows,
      resolvedTargetSpeedInterval
    );
    if (subcellCount === 1) {
      coarseOneNoiseRow = rows[0] ?? null;
    }
    if (subcellCount === 2) {
      twoRefinedOneNoiseRows = rows;
    }
    const rowDiagnostics = rows.map((row) => {
      const diagnostic = pressureDiagnosticForRow({
        context,
        row,
        branch,
        outerRadius: resolvedOuterRadius,
        shiftedIndex: resolvedShiftedIndex,
        hFreezeStartIndexes,
      });
      return {
        cell_id: row.cell_id,
        speed_interval: row.speed_interval,
        row_status: row.row_status,
        pressure: diagnostic.full_input_replay.pressure,
        h_row_midpoint_reduction_factor:
          diagnostic.h_row_midpoint_reduction_factor,
      };
    });
    const maxRow = rowDiagnostics.reduce(
      (best, row) => (Number(row.pressure) > Number(best?.pressure ?? -1) ? row : best),
      null
    );
    return {
      local_subcell_count: subcellCount,
      speed_samples: speedSamples,
      local_row_count: rows.length,
      h_row_width_profile: hRowWidthProfileForRows({
        rows,
        branch,
      }),
      h_row_signed_transport_profile: hRowSignedTransportProfileForRows({
        rows,
        branch,
      }),
      artifact_status:
        artifact.thirty_eighth_order_post_u_successor_coefficient_summary
          .status,
      artifact_claim_certifies_standard_h38_cover:
        artifact.artifact_claim
          .certifies_directed_rounded_first_y_GD_thirty_eighth_order_post_u_successor_coefficient_enclosure,
      predecessor_h37_artifact_valid:
        artifact.thirty_eighth_order_post_u_successor_coefficient_summary
          .predecessor_h37_artifact_valid,
      all_local_rows_enclosed: rows.every(
        (row) =>
          row.row_status ===
          "directed-rounded-first-y-GD-thirty-eighth-order-post-U-successor-coefficient-enclosed"
      ),
      max_pressure: maxRow?.pressure ?? null,
      max_pressure_row: maxRow,
      row_diagnostics: rowDiagnostics,
    };
  });
  const coarseReplay =
    replays.find((replay) => replay.local_subcell_count === 1) ?? replays[0];
  const coarsePressure = coarseReplay?.max_pressure ?? null;
  const replaysWithRatios = replays.map((replay, index) => {
    const previousReplay = index > 0 ? replays[index - 1] : null;
    return {
      ...replay,
      coarse_to_max_pressure_ratio:
        finitePositive(coarsePressure) && finitePositive(replay.max_pressure)
          ? Number(coarsePressure) / Number(replay.max_pressure)
          : null,
      previous_to_max_pressure_ratio:
        previousReplay &&
        finitePositive(previousReplay.max_pressure) &&
        finitePositive(replay.max_pressure)
          ? Number(previousReplay.max_pressure) / Number(replay.max_pressure)
          : null,
    };
  });
  const bestReplay = replaysWithRatios.reduce(
    (best, replay) =>
      Number(replay.coarse_to_max_pressure_ratio ?? -1) >
      Number(best?.coarse_to_max_pressure_ratio ?? -1)
        ? replay
        : best,
    null
  );
  const observedScalingExponent = scalingExponent({
    coarsePressure,
    replay: bestReplay,
  });
  const coarseMidpointReduction =
    coarseReplay?.row_diagnostics?.[0]?.h_row_midpoint_reduction_factor ?? null;
  const estimatedSubcellsForMidpointCollapse =
    estimatedSubcellCountForReduction({
      reductionFactor: coarseMidpointReduction,
      exponent: observedScalingExponent,
    });
  const hRowWidthTransportProfile =
    coarseReplay?.h_row_width_profile?.map((coarseProfile) => {
      const bestProfile = bestReplay?.h_row_width_profile?.find(
        (profile) => profile.h_index === coarseProfile.h_index
      );
      const widthRatio =
        bestProfile &&
        finitePositive(coarseProfile.max_width) &&
        finitePositive(bestProfile.max_width)
          ? Number(coarseProfile.max_width) / Number(bestProfile.max_width)
          : null;
      const exponent = bestReplay
        ? scalingExponentForValues({
            coarseValue: coarseProfile.max_width,
            refinedValue: bestProfile?.max_width,
            refinedCount: bestReplay.local_subcell_count,
          })
        : null;
      return {
        h_index: coarseProfile.h_index,
        coarse_max_width: coarseProfile.max_width,
        best_refined_max_width: bestProfile?.max_width ?? null,
        coarse_to_best_width_ratio: widthRatio,
        observed_width_scaling_exponent: exponent,
      };
    }) ?? [];
  const widthExponents = hRowWidthTransportProfile
    .map((profile) => profile.observed_width_scaling_exponent)
    .filter((exponent) => Number.isFinite(Number(exponent)));
  const hRowWidthTransportSummary = {
    h_count: hRowWidthTransportProfile.length,
    min_observed_width_scaling_exponent:
      widthExponents.length > 0 ? Math.min(...widthExponents) : null,
    max_observed_width_scaling_exponent:
      widthExponents.length > 0 ? Math.max(...widthExponents) : null,
    median_observed_width_scaling_exponent: median(widthExponents),
    pressure_width_exponent_gap:
      Number.isFinite(Number(observedScalingExponent)) &&
      Number.isFinite(Number(median(widthExponents)))
        ? Math.abs(observedScalingExponent - median(widthExponents))
        : null,
    width_normal_form_candidate:
      "Treat the exported h-row box as the image of one local recurrence-width parameter before adding smaller residual coordinates.",
  };
  const oneNoiseTransportWitness =
    coarseOneNoiseRow && twoRefinedOneNoiseRows?.length === 2
      ? oneNoiseAffineTransportDiagnostic({
          context,
          targetSpeedInterval: resolvedTargetSpeedInterval,
          coarseRow: coarseOneNoiseRow,
          refinedRows: twoRefinedOneNoiseRows,
          branch,
          outerRadius: resolvedOuterRadius,
          shiftedIndex: resolvedShiftedIndex,
          hFreezeStartIndexes,
        })
      : null;

  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_RECURRENCE_REFINED_SUBCOVER_DIAGNOSTIC_SCHEMA,
    status:
      "h39-recurrence-refined-subcover-pressure-diagnostic-candidate-emitted",
    evaluation_level:
      "candidate-recurrence-refined-predecessor-subcover-pressure-diagnostic",
    target_speed_interval: resolvedTargetSpeedInterval,
    branch,
    shifted_index: resolvedShiftedIndex,
    outer_radius: resolvedOuterRadius,
    subcell_counts: resolvedSubcellCounts,
    recurrence_chain: "h24-to-h38-predecessor-replay",
    subcover_replays: replaysWithRatios,
    coarse_pressure: coarsePressure,
    best_replay: bestReplay,
    observed_scaling_exponent: observedScalingExponent,
    coarse_h_row_midpoint_reduction_factor: coarseMidpointReduction,
    h_row_width_transport_profile: hRowWidthTransportProfile,
    h_row_width_transport_summary: hRowWidthTransportSummary,
    one_noise_affine_transport_witness: oneNoiseTransportWitness,
    estimated_local_subcells_for_h_row_midpoint_collapse:
      estimatedSubcellsForMidpointCollapse,
    brute_subcover_route_likely_impractical:
      Number(estimatedSubcellsForMidpointCollapse ?? 0) > 1e6,
    candidate_certificate_route:
      "Use recurrence-refined local subcovers only as a scaling diagnostic unless a full-cover refinement theorem or a lower-dimensional h-row transport parameterization replaces the exported independent h-row box.",
    claim_boundary: {
      certifies_standard_h38_cover: false,
      certifies_shifted_R43_outer_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_continuous_polydisc_primitives: false,
      retained_branch: false,
    },
  };
}

export function validateH39RecurrenceRefinedSubcoverPressureDiagnostic(
  diagnostic
) {
  const errors = [];
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_RECURRENCE_REFINED_SUBCOVER_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 recurrence-refined subcover diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-recurrence-refined-subcover-pressure-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate recurrence subcover diagnostic");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep h38, shifted source, primitive, and retention closure open");
  }
  if (
    !Array.isArray(diagnostic?.subcover_replays) ||
    diagnostic.subcover_replays.length === 0 ||
    !diagnostic.subcover_replays.every(
      (replay) =>
        Number.isInteger(replay.local_subcell_count) &&
        replay.local_subcell_count >= 1 &&
        replay.artifact_claim_certifies_standard_h38_cover === false &&
        replay.all_local_rows_enclosed === true &&
        Number.isFinite(Number(replay.max_pressure)) &&
        Number(replay.max_pressure) > 0
    )
  ) {
    errors.push("subcover replays must be positive candidate-only enclosed local rows");
  }
  if (
    !Number.isFinite(Number(diagnostic?.observed_scaling_exponent)) ||
    Number(diagnostic.observed_scaling_exponent) <= 0
  ) {
    errors.push("observed scaling exponent must be positive");
  }
  if (
    !Array.isArray(diagnostic?.h_row_width_transport_profile) ||
    diagnostic.h_row_width_transport_profile.length !== 39 ||
    !Number.isFinite(
      Number(
        diagnostic?.h_row_width_transport_summary
          ?.median_observed_width_scaling_exponent
      )
    )
  ) {
    errors.push("h-row width transport profile must cover h0 through h38");
  }
  if (
    diagnostic?.one_noise_affine_transport_witness != null &&
    validateH39OneNoiseAffineHRowTransportDiagnostic(
      diagnostic.one_noise_affine_transport_witness
    ).length !== 0
  ) {
    errors.push("one-noise h-row transport witness must be positive and candidate-only");
  }
  return errors;
}

export function validateH39OneNoiseAffineHRowTransportDiagnostic(diagnostic) {
  const errors = [];
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_ONE_NOISE_AFFINE_H_ROW_TRANSPORT_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 one-noise h-row transport diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-one-noise-affine-h-row-transport-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate one-noise transport diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-one-noise-affine-h-row-transport-diagnostic"
  ) {
    errors.push("evaluation level must identify candidate one-noise transport");
  }
  if (
    diagnostic?.transport_source !==
    "two-refined-H38-subcell-midpoint-affine-fit"
  ) {
    errors.push("transport source must use two refined H38 subcell midpoints");
  }
  if (
    !Number.isInteger(diagnostic?.shifted_index) ||
    diagnostic.shifted_index < 1 ||
    diagnostic?.y_order !==
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
        diagnostic.shifted_index
  ) {
    errors.push("shifted index and y order must be consistent");
  }
  if (
    !Array.isArray(diagnostic?.one_noise_sample_replays) ||
    diagnostic.one_noise_sample_replays.length === 0 ||
    !diagnostic.one_noise_sample_replays.every((replay) =>
      finitePositive(replay.pressure)
    )
  ) {
    errors.push("one-noise sample replays must contain positive pressures");
  }
  if (
    !Array.isArray(diagnostic?.h_row_affine_transport_profile) ||
    diagnostic.h_row_affine_transport_profile.length !== 39
  ) {
    errors.push("h-row affine transport profile must cover h0 through h38");
  }
  if (
    !finitePositive(diagnostic?.baseline_independent_interval_pressure) ||
    !finitePositive(diagnostic?.baseline_h_row_midpoint_pressure) ||
    !finitePositive(diagnostic?.max_one_noise_sample_pressure) ||
    diagnostic?.max_one_noise_sample_replay?.pressure !==
      diagnostic?.max_one_noise_sample_pressure
  ) {
    errors.push("baseline and one-noise pressure summaries must be positive");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep h38, shifted source, primitive, and retention closure open");
  }
  return errors;
}

export function validateH39AffineHRowGraphSubdivisionDiagnostic(diagnostic) {
  const errors = [];
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_AFFINE_H_ROW_GRAPH_SUBDIVISION_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 affine h-row graph subdivision diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-affine-h-row-graph-subdivision-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate affine graph subdivision diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-affine-h-row-graph-subdivision-diagnostic"
  ) {
    errors.push("evaluation level must identify candidate affine graph subdivision");
  }
  if (
    diagnostic?.graph_source !==
    "two-refined-H38-subcell-midpoint-affine-fit"
  ) {
    errors.push("graph source must use two refined H38 subcell midpoints");
  }
  if (
    !Number.isInteger(diagnostic?.shifted_index) ||
    diagnostic.shifted_index < 1 ||
    diagnostic?.y_order !==
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
        diagnostic.shifted_index
  ) {
    errors.push("shifted index and y order must be consistent");
  }
  if (
    !Array.isArray(diagnostic?.xi_partition_counts) ||
    diagnostic.xi_partition_counts.length === 0 ||
    !diagnostic.xi_partition_counts.every(
      (count) => Number.isInteger(count) && count >= 1
    )
  ) {
    errors.push("xi partition counts must be positive integers");
  }
  if (
    !Array.isArray(diagnostic?.graph_partition_replays) ||
    diagnostic.graph_partition_replays.length !==
      diagnostic.xi_partition_counts.length ||
    !diagnostic.graph_partition_replays.every((replay) =>
      finitePositive(replay.max_graph_pressure)
    )
  ) {
    errors.push("graph partition replays must contain positive pressures");
  }
  if (
    !Array.isArray(diagnostic?.producer_residual_diagnostics) ||
    diagnostic.producer_residual_diagnostics.length === 0 ||
    !diagnostic.producer_residual_diagnostics.every(
      (residual) =>
        Number.isInteger(residual.residual_subcell_count) &&
        residual.residual_subcell_count > 2 &&
        finitePositive(residual.graph_plus_residual_pressure) &&
        Array.isArray(residual.residual_profile) &&
        residual.residual_profile.length === 39
    )
  ) {
    errors.push("producer residual diagnostics must cover positive graph-plus-residual pressures");
  }
  if (
    !Array.isArray(diagnostic?.h_row_affine_transport_profile) ||
    diagnostic.h_row_affine_transport_profile.length !== 39
  ) {
    errors.push("h-row affine transport profile must cover h0 through h38");
  }
  if (
    !finitePositive(diagnostic?.baseline_independent_interval_pressure) ||
    !finitePositive(diagnostic?.baseline_h_row_midpoint_pressure) ||
    !finitePositive(diagnostic?.max_sample_one_noise_pressure) ||
    !finitePositive(diagnostic?.best_graph_pressure) ||
    !finitePositive(diagnostic?.coarsest_graph_pressure) ||
    !finitePositive(diagnostic?.max_graph_plus_residual_pressure)
  ) {
    errors.push("baseline, sample, and graph pressure summaries must be positive");
  }
  if (
    diagnostic?.shared_domain_replay_artifact?.claim_boundary
      ?.h_row_provider_backed_replay !== true ||
    diagnostic.shared_domain_replay_artifact
      ?.h39_shared_domain_coefficient_summary
      ?.h_row_provider_dependency_state !==
      "dependency-preserving-provider-backed-replay" ||
    diagnostic.shared_domain_replay_artifact?.claim_boundary
      ?.certifies_directed_rounded_shared_domain !== false
  ) {
    errors.push("shared-domain replay artifact must be provider-backed and candidate-only");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_affine_h_row_graph_enclosure !==
      false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep graph, h38, shifted source, primitive, and retention closure open");
  }
  return errors;
}

export function validateH39PolynomialHRowGraphResidualDiagnostic(diagnostic) {
  const errors = [];
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_POLYNOMIAL_H_ROW_GRAPH_RESIDUAL_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 polynomial h-row graph residual diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-polynomial-h-row-graph-residual-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate polynomial graph residual diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-polynomial-h-row-graph-residual-diagnostic"
  ) {
    errors.push("evaluation level must identify candidate polynomial graph residual diagnostic");
  }
  if (
    !Number.isInteger(diagnostic?.polynomial_degree) ||
    diagnostic.polynomial_degree < 1 ||
    diagnostic.polynomial_degree > 3
  ) {
    errors.push("polynomial degree must be an integer from 1 through 3");
  }
  if (
    !Number.isInteger(diagnostic?.polynomial_source_subcell_count) ||
    diagnostic.polynomial_source_subcell_count <
      diagnostic.polynomial_degree + 1
  ) {
    errors.push("polynomial source subcell count must cover the fit degree");
  }
  if (
    !Number.isInteger(diagnostic?.shifted_index) ||
    diagnostic.shifted_index < 1 ||
    diagnostic?.y_order !==
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
        diagnostic.shifted_index
  ) {
    errors.push("shifted index and y order must be consistent");
  }
  if (
    !Array.isArray(diagnostic?.xi_domain) ||
    diagnostic.xi_domain.length !== 2 ||
    !(Number(diagnostic.xi_domain[0]) < Number(diagnostic.xi_domain[1]))
  ) {
    errors.push("xi domain must be a finite increasing interval");
  }
  if (
    !Array.isArray(diagnostic?.xi_partition_counts) ||
    diagnostic.xi_partition_counts.length === 0 ||
    !diagnostic.xi_partition_counts.every(
      (count) => Number.isInteger(count) && count >= 1
    )
  ) {
    errors.push("xi partition counts must be positive integers");
  }
  if (
    !Array.isArray(diagnostic?.h_row_polynomial_transport_profile) ||
    diagnostic.h_row_polynomial_transport_profile.length !== 39 ||
    !diagnostic.h_row_polynomial_transport_profile.every(
      (profile) =>
        profile.polynomial_degree === diagnostic.polynomial_degree &&
        Array.isArray(profile.coefficients) &&
        profile.coefficients.length === diagnostic.polynomial_degree + 1
    )
  ) {
    errors.push("h-row polynomial transport profile must cover h0 through h38");
  }
  if (
    !Array.isArray(diagnostic?.polynomial_graph_partition_replays) ||
    diagnostic.polynomial_graph_partition_replays.length !==
      diagnostic.xi_partition_counts.length ||
    !diagnostic.polynomial_graph_partition_replays.every((replay) =>
      finitePositive(replay.max_graph_pressure)
    )
  ) {
    errors.push("polynomial graph partition replays must contain positive pressures");
  }
  if (
    !Array.isArray(diagnostic?.polynomial_producer_residual_diagnostics) ||
    diagnostic.polynomial_producer_residual_diagnostics.length === 0 ||
    !diagnostic.polynomial_producer_residual_diagnostics.every(
      (residual) =>
        Number.isInteger(residual.residual_subcell_count) &&
        residual.residual_subcell_count >=
          diagnostic.polynomial_source_subcell_count &&
        finitePositive(residual.graph_plus_residual_pressure) &&
        Array.isArray(residual.residual_profile) &&
        residual.residual_profile.length === 39
    )
  ) {
    errors.push("polynomial producer residual diagnostics must cover positive graph-plus-residual pressures");
  }
  if (
    !Array.isArray(diagnostic?.affine_reference_residual_diagnostics) ||
    diagnostic.affine_reference_residual_diagnostics.length !==
      diagnostic.polynomial_producer_residual_diagnostics.length ||
    !diagnostic.affine_reference_residual_diagnostics.every((residual) =>
      finitePositive(residual.graph_plus_residual_pressure)
    )
  ) {
    errors.push("affine reference residual diagnostics must be positive");
  }
  if (
    !finitePositive(diagnostic?.baseline_independent_interval_pressure) ||
    !finitePositive(diagnostic?.baseline_h_row_midpoint_pressure) ||
    !finitePositive(diagnostic?.best_polynomial_graph_pressure) ||
    !finitePositive(
      diagnostic?.max_polynomial_graph_plus_residual_pressure
    ) ||
    !finitePositive(
      diagnostic?.max_affine_reference_graph_plus_residual_pressure
    )
  ) {
    errors.push("baseline, polynomial graph, and residual pressure summaries must be positive");
  }
  if (
    diagnostic?.shared_domain_replay_artifact?.claim_boundary
      ?.h_row_provider_backed_replay !== true ||
    diagnostic.shared_domain_replay_artifact
      ?.h39_shared_domain_coefficient_summary
      ?.h_row_provider_dependency_state !==
      "dependency-preserving-provider-backed-replay" ||
    diagnostic.shared_domain_replay_artifact?.claim_boundary
      ?.certifies_directed_rounded_shared_domain !== false
  ) {
    errors.push("shared-domain replay artifact must be provider-backed and candidate-only");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_polynomial_h_row_graph_enclosure !==
      false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep graph, h38, shifted source, primitive, and retention closure open");
  }
  return errors;
}

export function validateH39PolynomialHRowGraphIntervalResidualDiagnostic(
  diagnostic
) {
  const errors = [];
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_POLYNOMIAL_H_ROW_GRAPH_INTERVAL_RESIDUAL_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 polynomial h-row graph interval residual diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-polynomial-h-row-graph-interval-residual-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate polynomial graph interval residual diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-polynomial-h-row-graph-interval-residual-diagnostic"
  ) {
    errors.push("evaluation level must identify candidate interval residual diagnostic");
  }
  if (
    !Number.isInteger(diagnostic?.polynomial_degree) ||
    diagnostic.polynomial_degree < 1 ||
    diagnostic.polynomial_degree > 3
  ) {
    errors.push("polynomial degree must be an integer from 1 through 3");
  }
  if (
    !Number.isInteger(diagnostic?.polynomial_source_subcell_count) ||
    diagnostic.polynomial_source_subcell_count <
      diagnostic.polynomial_degree + 1
  ) {
    errors.push("polynomial source subcell count must cover the fit degree");
  }
  if (
    !Number.isInteger(diagnostic?.provider_interval_residual_subcell_count) ||
    diagnostic.provider_interval_residual_subcell_count <
      diagnostic.polynomial_source_subcell_count
  ) {
    errors.push("provider interval residual subcell count must cover the polynomial source count");
  }
  if (
    !Number.isInteger(diagnostic?.shifted_index) ||
    diagnostic.shifted_index < 1 ||
    diagnostic?.y_order !==
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
        diagnostic.shifted_index
  ) {
    errors.push("shifted index and y order must be consistent");
  }
  if (
    !Array.isArray(diagnostic?.xi_domain) ||
    diagnostic.xi_domain.length !== 2 ||
    !(Number(diagnostic.xi_domain[0]) < Number(diagnostic.xi_domain[1]))
  ) {
    errors.push("xi domain must be a finite increasing interval");
  }
  if (
    !Array.isArray(diagnostic?.xi_partition_counts) ||
    diagnostic.xi_partition_counts.length === 0 ||
    !diagnostic.xi_partition_counts.every(
      (count) => Number.isInteger(count) && count >= 1
    )
  ) {
    errors.push("xi partition counts must be positive integers");
  }
  if (
    !Array.isArray(diagnostic?.h_row_polynomial_transport_profile) ||
    diagnostic.h_row_polynomial_transport_profile.length !== 39 ||
    !diagnostic.h_row_polynomial_transport_profile.every(
      (profile) =>
        profile.polynomial_degree === diagnostic.polynomial_degree &&
        Array.isArray(profile.coefficients) &&
        profile.coefficients.length === diagnostic.polynomial_degree + 1
    )
  ) {
    errors.push("h-row polynomial transport profile must cover h0 through h38");
  }
  if (
    !Array.isArray(diagnostic?.polynomial_graph_partition_replays) ||
    diagnostic.polynomial_graph_partition_replays.length !==
      diagnostic.xi_partition_counts.length ||
    !diagnostic.polynomial_graph_partition_replays.every((replay) =>
      finitePositive(replay.max_graph_pressure)
    )
  ) {
    errors.push("polynomial graph partition replays must contain positive pressures");
  }
  if (
    !Array.isArray(diagnostic?.polynomial_midpoint_residual_diagnostics) ||
    diagnostic.polynomial_midpoint_residual_diagnostics.length === 0 ||
    !diagnostic.polynomial_midpoint_residual_diagnostics.every(
      (residual) =>
        Number.isInteger(residual.residual_subcell_count) &&
        residual.residual_subcell_count >=
          diagnostic.polynomial_source_subcell_count &&
        finitePositive(residual.graph_plus_residual_pressure) &&
        Array.isArray(residual.residual_profile) &&
        residual.residual_profile.length === 39
    )
  ) {
    errors.push("midpoint residual diagnostics must cover positive graph-plus-residual pressures");
  }
  if (
    !Array.isArray(diagnostic?.polynomial_interval_residual_diagnostics) ||
    diagnostic.polynomial_interval_residual_diagnostics.length !==
      diagnostic.polynomial_midpoint_residual_diagnostics.length ||
    !diagnostic.polynomial_interval_residual_diagnostics.every(
      (residual) =>
        Number.isInteger(residual.residual_subcell_count) &&
        residual.residual_subcell_count >=
          diagnostic.polynomial_source_subcell_count &&
        finitePositive(residual.graph_plus_interval_residual_pressure) &&
        Array.isArray(residual.residual_profile) &&
        residual.residual_profile.length === 39 &&
        residual.residual_profile.every(
          (profile) =>
            Array.isArray(profile.residual_interval_hull) &&
            profile.residual_interval_hull.length === 2
        )
    )
  ) {
    errors.push("interval residual diagnostics must cover positive graph-plus-residual pressures");
  }
  if (
    !Array.isArray(diagnostic?.affine_reference_residual_diagnostics) ||
    diagnostic.affine_reference_residual_diagnostics.length !==
      diagnostic.polynomial_interval_residual_diagnostics.length ||
    !diagnostic.affine_reference_residual_diagnostics.every((residual) =>
      finitePositive(residual.graph_plus_residual_pressure)
    )
  ) {
    errors.push("affine reference residual diagnostics must be positive");
  }
  if (
    !finitePositive(diagnostic?.baseline_independent_interval_pressure) ||
    !finitePositive(diagnostic?.baseline_h_row_midpoint_pressure) ||
    !finitePositive(diagnostic?.best_polynomial_graph_pressure) ||
    !finitePositive(
      diagnostic?.max_polynomial_midpoint_residual_pressure
    ) ||
    !finitePositive(
      diagnostic?.max_polynomial_interval_residual_pressure
    ) ||
    !finitePositive(diagnostic?.max_affine_reference_residual_pressure)
  ) {
    errors.push("baseline, graph, midpoint residual, and interval residual summaries must be positive");
  }
  if (
    !finitePositive(
      diagnostic?.interval_residual_pressure_scaling_summary
        ?.observed_pressure_scaling_exponent
    ) ||
    !Number.isInteger(
      diagnostic?.interval_residual_pressure_scaling_summary
        ?.estimated_subcell_count_for_target_pressure
    )
  ) {
    errors.push("interval residual pressure scaling summary must estimate a positive scaling route");
  }
  if (
    diagnostic?.shared_domain_interval_residual_replay_artifact?.claim_boundary
      ?.h_row_provider_backed_replay !== true ||
    diagnostic.shared_domain_interval_residual_replay_artifact
      ?.h39_shared_domain_coefficient_summary
      ?.h_row_provider_dependency_state !==
      "dependency-preserving-provider-backed-replay" ||
    diagnostic.shared_domain_interval_residual_replay_artifact?.claim_boundary
      ?.certifies_directed_rounded_shared_domain !== false
  ) {
    errors.push("shared-domain interval residual replay artifact must be provider-backed and candidate-only");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_polynomial_h_row_graph_enclosure !==
      false ||
    diagnostic?.claim_boundary
      ?.certifies_polynomial_interval_residual_enclosure !== false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep graph, interval residual, h38, shifted source, primitive, and retention closure open");
  }
  return errors;
}

export function validateH39TerminalSharedResidualAffineZetaProviderReplayDiagnostic(
  diagnostic
) {
  const errors = [];
  const hasOrderedFiniteInterval = (interval) =>
    Array.isArray(interval) &&
    interval.length === 2 &&
    Number.isFinite(Number(interval[0])) &&
    Number.isFinite(Number(interval[1])) &&
    Number(interval[1]) > Number(interval[0]);
  const terminalIndexes = diagnostic?.terminal_provider_h_indexes ?? [];
  const terminalIndexesMatch =
    Array.isArray(terminalIndexes) &&
    terminalIndexes.length === 3 &&
    terminalIndexes[0] === 37 &&
    terminalIndexes[1] === 36 &&
    terminalIndexes[2] === 35;
  const endpointReplayValid = (endpoint) => {
    const summary = endpoint?.shared_domain_replay_artifact_summary ?? {};
    return (
      Number.isInteger(endpoint?.endpoint_index) &&
      [0, 1].includes(endpoint.endpoint_index) &&
      Number.isFinite(Number(endpoint?.residual_noise)) &&
      endpoint?.endpoint_provider_backed_replay === true &&
      summary.h_row_provider_dependency_state ===
        "dependency-preserving-provider-backed-replay" &&
      summary.h_row_provider_backed_all_cells === true &&
      Array.isArray(summary.h_row_provider_kinds) &&
      summary.h_row_provider_kinds.includes(
        "candidate-terminal-shared-residual-affine-zeta-endpoint-provider"
      ) &&
      Number(summary.h_row_provider_dependency_trace_count) > 0 &&
      finitePositive(summary.max_R43_shifted_prefix_pressure_outer_radius) &&
      summary.certifies_continuous_polydisc_primitives === false &&
      endpoint.endpoint_claim_boundary?.certifies_directed_rounded_shared_domain ===
        false &&
      endpoint.endpoint_claim_boundary?.retained_branch === false
    );
  };
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_TERMINAL_SHARED_RESIDUAL_AFFINE_ZETA_PROVIDER_REPLAY_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 terminal affine-zeta provider replay diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-terminal-shared-residual-affine-zeta-provider-replay-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate terminal affine-zeta provider replay diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h39-terminal-shared-residual-affine-zeta-provider-replay-diagnostic"
  ) {
    errors.push("evaluation level must identify candidate terminal affine-zeta provider replay");
  }
  if (
    !Number.isInteger(diagnostic?.source_stencil_subcell_count) ||
    diagnostic.source_stencil_subcell_count < 5 ||
    !Number.isInteger(diagnostic?.comparison_stencil_index) ||
    diagnostic.comparison_stencil_index < 0 ||
    diagnostic?.comparison_row_count !== 5 ||
    !hasOrderedFiniteInterval(diagnostic?.comparison_xi_interval_hull) ||
    !Number.isInteger(diagnostic?.polynomial_degree) ||
    diagnostic.polynomial_degree !== 2 ||
    !terminalIndexesMatch ||
    !Number.isInteger(diagnostic?.residual_coordinate_partition_count) ||
    diagnostic.residual_coordinate_partition_count < 1 ||
    diagnostic?.h38_solve_target_policy !== "preserved-H39-predecessor-row"
  ) {
    errors.push("terminal affine-zeta provider replay parameters must describe a five-row local provider window");
  }
  if (
    !Number.isInteger(diagnostic?.shifted_index) ||
    diagnostic.shifted_index < 1 ||
    diagnostic?.y_order !==
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
        diagnostic.shifted_index
  ) {
    errors.push("shifted index and y order must be consistent");
  }
  if (
    diagnostic?.terminal_zeta_degree_bound
      ?.affine_in_shared_residual_coordinate !== true ||
    diagnostic.terminal_zeta_degree_bound?.max_shared_residual_power_by_y_order !==
      1 ||
    diagnostic.terminal_zeta_degree_bound?.two_terminal_factor_min_y_order <=
      diagnostic.y_order ||
    diagnostic?.affine_in_shared_residual_coordinate !== true
  ) {
    errors.push("terminal zeta degree bound must keep the endpoint route affine in zeta");
  }
  if (
    diagnostic?.provider_shape_interpretation
      ?.existing_h_row_provider_accepts_shared_zeta_endpoint !== true ||
    diagnostic.provider_shape_interpretation
      ?.existing_h_row_provider_accepts_shared_zeta_interval !== false
  ) {
    errors.push("provider shape interpretation must distinguish endpoint replay from interval-zeta certification");
  }
  if (
    !finitePositive(
      diagnostic?.baseline_reference_replay_artifact_summary
        ?.max_R43_shifted_prefix_pressure_outer_radius
    ) ||
    ![
      "dependency-preserving-provider-backed-replay",
      "independent-interval-snapshot-replay",
    ].includes(
      diagnostic.baseline_reference_replay_artifact_summary
        ?.h_row_provider_dependency_state
    ) ||
    !finitePositive(
      diagnostic?.interval_residual_replay_artifact_summary
        ?.max_R43_shifted_prefix_pressure_outer_radius
    ) ||
    diagnostic.interval_residual_replay_artifact_summary
      ?.h_row_provider_dependency_state !==
      "dependency-preserving-provider-backed-replay"
  ) {
    errors.push("reference shared-domain replays must include independent and interval-residual pressure summaries");
  }
  const partitionReplays = diagnostic?.endpoint_partition_replays ?? [];
  if (
    !Array.isArray(partitionReplays) ||
    partitionReplays.length !== diagnostic?.residual_coordinate_partition_count ||
    !partitionReplays.every(
      (partition) =>
        Number.isInteger(partition?.partition_index) &&
        hasOrderedFiniteInterval(partition?.residual_noise_interval) &&
        Array.isArray(partition?.endpoint_replays) &&
        partition.endpoint_replays.length === 2 &&
        partition.endpoint_replays.every(endpointReplayValid) &&
        partition?.all_endpoint_replays_provider_backed === true &&
        finitePositive(
          partition?.max_endpoint_shifted_prefix_pressure_outer_radius
        ) &&
        finitePositive(
          partition?.min_endpoint_shifted_prefix_pressure_outer_radius
        )
    )
  ) {
    errors.push("endpoint partitions must carry provider-backed scalar-zeta endpoint replays");
  }
  const endpointCount = partitionReplays.reduce(
    (count, partition) => count + Number(partition.endpoint_replays?.length ?? 0),
    0
  );
  if (
    diagnostic?.endpoint_provider_replay_summary?.endpoint_replay_count !==
      endpointCount ||
    diagnostic.endpoint_provider_replay_summary
      ?.all_endpoint_replays_provider_backed !== true ||
    diagnostic.endpoint_provider_replay_summary?.provider_kind !==
      "candidate-terminal-shared-residual-affine-zeta-endpoint-provider" ||
    !finitePositive(
      diagnostic.endpoint_provider_replay_summary
        ?.max_endpoint_shifted_prefix_pressure_outer_radius
    ) ||
    !finitePositive(
      diagnostic.endpoint_provider_replay_summary
        ?.min_endpoint_shifted_prefix_pressure_outer_radius
    ) ||
    !finitePositive(
      diagnostic.endpoint_provider_replay_summary
        ?.baseline_reference_to_max_endpoint_shifted_prefix_pressure_ratio
    )
  ) {
    errors.push("endpoint provider replay summary must aggregate positive provider-backed pressure replays");
  }
  if (
    diagnostic?.provider_replay_diagnosis !==
    "terminal-affine-zeta-endpoints-cross-existing-H39-provider-boundary-candidate"
  ) {
    errors.push("provider replay diagnosis must name the endpoint-provider bridge");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary
      ?.certifies_terminal_affine_zeta_provider_enclosure !== false ||
    diagnostic?.claim_boundary?.certifies_shared_zeta_interval_provider !==
      false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep terminal provider, shifted source, primitive, and retention closure open");
  }
  return errors;
}

export function validateH39PostZetaPressureSourceIsolationDiagnostic(
  diagnostic
) {
  const errors = [];
  const hasOrderedFiniteInterval = (interval) =>
    Array.isArray(interval) &&
    interval.length === 2 &&
    Number.isFinite(Number(interval[0])) &&
    Number.isFinite(Number(interval[1])) &&
    Number(interval[1]) > Number(interval[0]);
  const terminalIndexes = diagnostic?.terminal_provider_h_indexes ?? [];
  const expectedEndpointCount =
    Number(diagnostic?.row_analysis_count) *
    Number(diagnostic?.residual_coordinate_partition_count) *
    2;
  const endpointReplayValid = (endpoint) =>
    Number.isInteger(endpoint?.row_analysis_index) &&
    Number.isInteger(endpoint?.partition_index) &&
    Number.isInteger(endpoint?.endpoint_index) &&
    [0, 1].includes(endpoint.endpoint_index) &&
    Number.isFinite(Number(endpoint?.residual_noise)) &&
    finitePositive(endpoint?.pressure) &&
    endpoint?.h_row_provider_kind ===
      "candidate-terminal-shared-residual-affine-zeta-endpoint-provider" &&
    endpoint?.h_row_provider_claim_boundary
      ?.certifies_directed_rounded_shared_domain === false &&
    endpoint?.h_row_provider_claim_boundary?.retained_branch === false &&
    finitePositive(endpoint?.row_pressure?.source_pressure_contribution);
  const h38IncludedEndpointReplayValid = (endpoint) =>
    endpointReplayValid({
      ...endpoint,
      h_row_provider_kind:
        "candidate-terminal-shared-residual-affine-zeta-endpoint-provider",
    }) &&
    endpoint?.h_row_provider_kind ===
      "candidate-h38-included-shared-residual-affine-zeta-endpoint-provider" &&
    endpoint?.h_row_dependency_witness?.h38_solve_target_policy ===
      "candidate-H38-predecessor-row-affine-zeta-endpoint";
  const replayValid = (replay, mode) =>
    replay?.mode === mode &&
    typeof replay?.family === "string" &&
    Array.isArray(replay?.h_indexes) &&
    replay.h_indexes.length > 0 &&
    replay.h_indexes.every(
      (hIndex) => Number.isInteger(hIndex) && hIndex >= 0 && hIndex <= 38
    ) &&
    finitePositive(replay?.pressure) &&
    Number.isFinite(Number(replay?.pressure_share_of_full)) &&
    Number.isFinite(Number(replay?.full_to_pressure_ratio)) &&
    finitePositive(replay?.row_pressure?.source_pressure_contribution);

  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_POST_ZETA_PRESSURE_SOURCE_ISOLATION_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 post-zeta pressure source isolation diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-post-zeta-pressure-source-isolation-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate post-zeta pressure source isolation diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h39-post-zeta-pressure-source-isolation-diagnostic"
  ) {
    errors.push("evaluation level must identify candidate post-zeta pressure source isolation");
  }
  if (
    !Number.isInteger(diagnostic?.source_stencil_subcell_count) ||
    diagnostic.source_stencil_subcell_count < 5 ||
    !Number.isInteger(diagnostic?.comparison_stencil_index) ||
    diagnostic.comparison_stencil_index < 0 ||
    diagnostic?.comparison_row_count !== 5 ||
    !Number.isInteger(diagnostic?.row_analysis_count) ||
    diagnostic.row_analysis_count < 1 ||
    diagnostic.row_analysis_count > diagnostic.comparison_row_count ||
    !hasOrderedFiniteInterval(diagnostic?.comparison_xi_interval_hull) ||
    !Number.isInteger(diagnostic?.polynomial_degree) ||
    diagnostic.polynomial_degree !== 2 ||
    !Array.isArray(terminalIndexes) ||
    terminalIndexes.length !== 3 ||
    terminalIndexes[0] !== 37 ||
    terminalIndexes[1] !== 36 ||
    terminalIndexes[2] !== 35 ||
    diagnostic?.h38_solve_target_policy !== "preserved-H39-predecessor-row"
  ) {
    errors.push("post-zeta pressure source parameters must describe a five-row local provider window");
  }
  if (
    !Number.isInteger(diagnostic?.shifted_index) ||
    diagnostic.shifted_index < 1 ||
    diagnostic?.y_order !==
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
        diagnostic.shifted_index
  ) {
    errors.push("shifted index and y order must be consistent");
  }
  if (
    !Number.isInteger(diagnostic?.residual_coordinate_partition_count) ||
    diagnostic.residual_coordinate_partition_count < 1 ||
    !Array.isArray(diagnostic?.residual_noise_partition_intervals) ||
    diagnostic.residual_noise_partition_intervals.length !==
      diagnostic.residual_coordinate_partition_count ||
    !diagnostic.residual_noise_partition_intervals.every(
      hasOrderedFiniteInterval
    )
  ) {
    errors.push("residual noise partitions must be complete finite intervals");
  }
  if (
    !Array.isArray(diagnostic?.single_h_index_analysis_indexes) ||
    diagnostic.single_h_index_analysis_indexes.length === 0 ||
    !diagnostic.single_h_index_analysis_indexes.every(
      (hIndex) => Number.isInteger(hIndex) && hIndex >= 0 && hIndex <= 38
    )
  ) {
    errors.push("single h-index analysis indexes must be nonempty h indexes");
  }
  if (
    diagnostic?.endpoint_replay_summary?.endpoint_replay_count !==
      expectedEndpointCount ||
    diagnostic.endpoint_replay_summary?.all_endpoint_replays_provider_backed !==
      true ||
    diagnostic.endpoint_replay_summary?.provider_kind !==
      "candidate-terminal-shared-residual-affine-zeta-endpoint-provider" ||
    !finitePositive(diagnostic.endpoint_replay_summary?.min_endpoint_pressure) ||
    !finitePositive(diagnostic.endpoint_replay_summary?.max_endpoint_pressure)
  ) {
    errors.push("endpoint replay summary must aggregate complete positive provider-backed replays");
  }
  if (
    !Array.isArray(diagnostic?.endpoint_replays) ||
    diagnostic.endpoint_replays.length !== expectedEndpointCount ||
    !diagnostic.endpoint_replays.every(endpointReplayValid) ||
    !endpointReplayValid(diagnostic?.dominant_endpoint_replay)
  ) {
    errors.push("endpoint replays must be complete positive scalar-zeta provider replays");
  }
  if (
    diagnostic?.h38_included_endpoint_replay_summary?.endpoint_replay_count !==
      expectedEndpointCount ||
    diagnostic.h38_included_endpoint_replay_summary
      ?.all_endpoint_replays_provider_backed !== true ||
    diagnostic.h38_included_endpoint_replay_summary?.provider_kind !==
      "candidate-h38-included-shared-residual-affine-zeta-endpoint-provider" ||
    !Array.isArray(
      diagnostic.h38_included_endpoint_replay_summary
        ?.h38_included_terminal_h_indexes
    ) ||
    !diagnostic.h38_included_endpoint_replay_summary.h38_included_terminal_h_indexes.includes(
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index
    ) ||
    !finitePositive(
      diagnostic.h38_included_endpoint_replay_summary?.min_endpoint_pressure
    ) ||
    !finitePositive(
      diagnostic.h38_included_endpoint_replay_summary?.max_endpoint_pressure
    ) ||
    !finitePositive(
      diagnostic.h38_included_endpoint_replay_summary
        ?.preserved_h38_to_h38_included_max_pressure_ratio
    ) ||
    !Array.isArray(diagnostic?.h38_included_endpoint_replays) ||
    diagnostic.h38_included_endpoint_replays.length !== expectedEndpointCount ||
    !diagnostic.h38_included_endpoint_replays.every(
      h38IncludedEndpointReplayValid
    )
  ) {
    errors.push("h38-included endpoint replays must remain complete candidate scalar-zeta variants");
  }
  if (
    diagnostic?.dominant_endpoint_sensitivity?.status !==
      "h39-affine-center-h-row-sensitivity-diagnostic-candidate-emitted" ||
    diagnostic.dominant_endpoint_sensitivity?.certifies_shifted_R43_outer_bound !==
      false ||
    diagnostic.dominant_endpoint_sensitivity
      ?.certifies_directed_rounded_shared_domain !== false ||
    diagnostic.dominant_endpoint_sensitivity
      ?.certifies_continuous_polydisc_primitives !== false ||
    diagnostic.dominant_endpoint_sensitivity?.retained_branch !== false
  ) {
    errors.push("dominant endpoint sensitivity must remain a candidate-only h-row diagnostic");
  }
  const summary = diagnostic?.post_zeta_pressure_source_summary ?? {};
  if (
    ![
      "preserved-h38-row-dominates-after-terminal-zeta",
      "terminal-plus-h38-family-dominates-after-terminal-zeta",
      "nonterminal-h-row-chain-dominates-after-terminal-zeta",
      "h-row-interval-dependency-dominates-after-terminal-zeta",
      "post-zeta-pressure-source-mixed-or-source-level",
    ].includes(summary?.interpretation) ||
    !finitePositive(summary?.full_input_pressure) ||
    !finitePositive(summary?.h38_only_freeze_replay?.pressure) ||
    !finitePositive(summary?.terminal_plus_h38_freeze_replay?.pressure) ||
    !finitePositive(summary?.full_chain_freeze_replay?.pressure)
  ) {
    errors.push("post-zeta pressure source summary must carry a finite candidate interpretation");
  }
  if (
    !Array.isArray(summary?.active_only_family_replays) ||
    summary.active_only_family_replays.length < 3 ||
    !summary.active_only_family_replays.every((replay) =>
      replayValid(replay, "active-only-family")
    ) ||
    !Array.isArray(summary?.frozen_out_family_replays) ||
    summary.frozen_out_family_replays.length < 3 ||
    !summary.frozen_out_family_replays.every((replay) =>
      replayValid(replay, "frozen-out-family")
    )
  ) {
    errors.push("family pressure replays must include active-only and frozen-out candidate variants");
  }
  if (
    !Array.isArray(summary?.active_only_single_h_index_replays) ||
    summary.active_only_single_h_index_replays.length !==
      diagnostic.single_h_index_analysis_indexes.length ||
    !summary.active_only_single_h_index_replays.every((replay) =>
      replayValid(replay, "active-only-single-h-index")
    ) ||
    !Array.isArray(summary?.frozen_out_single_h_index_replays) ||
    summary.frozen_out_single_h_index_replays.length !==
      diagnostic.single_h_index_analysis_indexes.length ||
    !summary.frozen_out_single_h_index_replays.every((replay) =>
      replayValid(replay, "frozen-out-single-h-index")
    )
  ) {
    errors.push("single h-index pressure replays must match the requested h-index analysis set");
  }
  if (
    !summary?.dominant_active_only_family_replay ||
    !summary?.dominant_frozen_out_family_replay ||
    !summary?.dominant_active_only_single_h_index_replay ||
    !summary?.dominant_frozen_out_single_h_index_replay
  ) {
    errors.push("post-zeta pressure summary must identify dominant replay variants");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary
      ?.certifies_terminal_affine_zeta_provider_enclosure !== false ||
    diagnostic?.claim_boundary
      ?.certifies_post_zeta_pressure_source_isolation !== false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep post-zeta source isolation and shifted closure open");
  }
  return errors;
}

export function validateH39H38Y44CoefficientDependenceDiagnostic(
  diagnostic
) {
  const errors = [];
  const hasOrderedFiniteInterval = (interval) =>
    Array.isArray(interval) &&
    interval.length === 2 &&
    Number.isFinite(Number(interval[0])) &&
    Number.isFinite(Number(interval[1])) &&
    Number(interval[1]) > Number(interval[0]);
  const fitValid = (fit, degree) =>
    fit?.polynomial_degree === degree &&
    Array.isArray(fit?.coefficients) &&
    fit.coefficients.length === degree + 1 &&
    fit.coefficients.every((coefficient) =>
      Number.isFinite(Number(coefficient))
    ) &&
    fit?.coefficient_order ===
      "ascending powers of h38 residual coordinate u" &&
    Number.isFinite(Number(fit?.max_abs_midpoint_residual)) &&
    Array.isArray(fit?.residuals) &&
    fit.residuals.length === diagnostic?.sample_replays?.length;
  const sampleValid = (sample) =>
    Number.isInteger(sample?.sample_index) &&
    Number.isFinite(Number(sample?.h38_noise_coordinate)) &&
    Number(sample.h38_noise_coordinate) >= -1 &&
    Number(sample.h38_noise_coordinate) <= 1 &&
    Number.isFinite(Number(sample?.h38_value)) &&
    Array.isArray(sample?.source_coefficient_interval) &&
    sample.source_coefficient_interval.length === 2 &&
    Number.isFinite(Number(sample?.source_coefficient_midpoint)) &&
    Number.isFinite(Number(sample?.source_coefficient_width)) &&
    Number.isFinite(Number(sample?.source_coefficient_abs_upper)) &&
    finitePositive(sample?.pressure) &&
    finitePositive(sample?.row_pressure?.source_pressure_contribution) &&
    (sample?.center_eliminated_pressure === null ||
      finitePositive(sample?.center_eliminated_pressure));
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_Y44_COEFFICIENT_DEPENDENCE_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 h38 y44 coefficient dependence diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-h38-y44-coefficient-dependence-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate h38 y44 coefficient dependence diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h39-h38-y44-coefficient-dependence-diagnostic"
  ) {
    errors.push("evaluation level must identify candidate h38 y44 coefficient dependence");
  }
  if (
    !Number.isInteger(diagnostic?.source_stencil_subcell_count) ||
    diagnostic.source_stencil_subcell_count < 5 ||
    !Number.isInteger(diagnostic?.comparison_stencil_index) ||
    diagnostic.comparison_stencil_index < 0 ||
    diagnostic?.comparison_row_count !== 5 ||
    !Number.isInteger(diagnostic?.polynomial_degree) ||
    diagnostic.polynomial_degree < 1 ||
    diagnostic.polynomial_degree > 3 ||
    !Number.isFinite(Number(diagnostic?.analysis_xi_coordinate)) ||
    !hasOrderedFiniteInterval(diagnostic?.h38_residual_interval)
  ) {
    errors.push("h38 y44 coefficient dependence parameters must describe one five-row local graph window");
  }
  if (
    !Number.isInteger(diagnostic?.shifted_index) ||
    diagnostic.shifted_index !== 1 ||
    diagnostic?.y_order !==
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
        diagnostic.shifted_index
  ) {
    errors.push("shifted index must be 1 and y order must be consistent");
  }
  if (
    !Array.isArray(diagnostic?.h38_noise_samples) ||
    diagnostic.h38_noise_samples.length < 3 ||
    !diagnostic.h38_noise_samples.every(
      (sample) =>
        Number.isFinite(Number(sample)) &&
        Number(sample) >= -1 &&
        Number(sample) <= 1
    ) ||
    !Array.isArray(diagnostic?.sample_replays) ||
    diagnostic.sample_replays.length !== diagnostic.h38_noise_samples.length ||
    !diagnostic.sample_replays.every(sampleValid)
  ) {
    errors.push("h38 noise samples and signed coefficient replays must be finite and complete");
  }
  if (
    !fitValid(diagnostic?.source_coefficient_affine_fit, 1) ||
    !fitValid(diagnostic?.source_coefficient_quadratic_fit, 2) ||
    !Number.isFinite(
      Number(diagnostic?.affine_to_quadratic_residual_ratio)
    ) ||
    !Number.isFinite(Number(diagnostic?.affine_zero_coordinate)) ||
    !sampleValid(diagnostic?.center_sample_replay) ||
    !finitePositive(diagnostic?.max_sample_pressure) ||
    !finitePositive(diagnostic?.center_to_max_sample_pressure_ratio)
  ) {
    errors.push("source coefficient dependence must include finite affine and quadratic midpoint fits");
  }
  if (
    !Array.isArray(diagnostic?.term_coefficient_dependence_profiles) ||
    diagnostic.term_coefficient_dependence_profiles.length < 3 ||
    !diagnostic.term_coefficient_dependence_profiles.every(
      (profile) =>
        typeof profile?.term === "string" &&
        fitValid(profile?.affine_fit, 1) &&
        fitValid(profile?.quadratic_fit, 2)
    ) ||
    !diagnostic?.dominant_quadratic_residual_term_profile
  ) {
    errors.push("term coefficient dependence profiles must include finite affine and quadratic fits");
  }
  if (
    ![
      "h38-y44-coefficient-has-material-quadratic-curvature",
      "h38-y44-coefficient-is-affine-dominated-on-sampled-source",
    ].includes(diagnostic?.dependence_interpretation)
  ) {
    errors.push("dependence interpretation must identify the sampled h38 coefficient shape");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary
      ?.certifies_h38_y44_coefficient_dependence !== false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep h38 coefficient dependence and shifted closure open");
  }
  return errors;
}

export function validateH39H38Y44SourceCovarianceDiagnostic(diagnostic) {
  const errors = [];
  const requiredTerms = new Set([
    "delta_squared_speed",
    "sin_phi",
    "sin_delta",
  ]);
  const sourceTermNames = new Set([...requiredTerms, "constant_minus_two"]);
  const hasOrderedFiniteInterval = (interval) =>
    Array.isArray(interval) &&
    interval.length === 2 &&
    Number.isFinite(Number(interval[0])) &&
    Number.isFinite(Number(interval[1])) &&
    Number(interval[1]) > Number(interval[0]);
  const hasFiniteInterval = (interval) =>
    Array.isArray(interval) &&
    interval.length === 2 &&
    Number.isFinite(Number(interval[0])) &&
    Number.isFinite(Number(interval[1]));
  const hasNondecreasingFiniteInterval = (interval) =>
    hasFiniteInterval(interval) &&
    Number(interval[1]) >= Number(interval[0]);
  const finiteNonnegativeOrNull = (value) =>
    value === null || finiteNonnegative(value);
  const boundedCount = (value, maxValue) =>
    Number.isInteger(value) && value >= 0 && value <= maxValue;
  const fitValid = (fit, degree) =>
    fit?.polynomial_degree === degree &&
    Array.isArray(fit?.coefficients) &&
    fit.coefficients.length === degree + 1 &&
    fit.coefficients.every((coefficient) =>
      Number.isFinite(Number(coefficient))
    ) &&
    fit?.coefficient_order ===
      "ascending powers of h38 residual coordinate u" &&
    Number.isFinite(Number(fit?.max_abs_midpoint_residual)) &&
    Array.isArray(fit?.residuals) &&
    fit.residuals.length === diagnostic?.sample_replays?.length;
  const replayValid = (sample, { boundedNoise = true } = {}) =>
    Number.isInteger(sample?.sample_index) &&
    Number.isFinite(Number(sample?.h38_noise_coordinate)) &&
    (!boundedNoise ||
      (Number(sample.h38_noise_coordinate) >= -1 &&
        Number(sample.h38_noise_coordinate) <= 1)) &&
    Number.isFinite(Number(sample?.h38_value)) &&
    hasFiniteInterval(sample?.source_coefficient_interval) &&
    Number.isFinite(Number(sample?.source_coefficient_midpoint)) &&
    finiteNonnegative(sample?.source_coefficient_width) &&
    finiteNonnegative(sample?.source_coefficient_abs_upper) &&
    finitePositive(sample?.pressure) &&
    finitePositive(sample?.row_pressure?.source_pressure_contribution) &&
    Array.isArray(sample?.row_pressure?.terms);
  const profileValid = (profile) =>
    requiredTerms.has(profile?.term) &&
    fitValid(profile?.affine_fit, 1) &&
    fitValid(profile?.quadratic_fit, 2);
  const termRowValid = (row) =>
    requiredTerms.has(row?.term) &&
    Number.isFinite(Number(row?.affine_intercept)) &&
    Number.isFinite(Number(row?.affine_slope)) &&
    Number.isFinite(Number(row?.affine_value_at_source_zero)) &&
    Number.isFinite(Number(row?.quadratic_value_at_source_zero)) &&
    hasFiniteInterval(row?.source_zero_replay_coefficient_interval) &&
    Number.isFinite(
      Number(row?.source_zero_replay_coefficient_midpoint)
    ) &&
    finiteNonnegative(row?.source_zero_replay_coefficient_abs_upper) &&
    finiteNonnegative(row?.source_zero_replay_pressure_contribution) &&
    finiteNonnegative(row?.affine_to_quadratic_value_gap_at_source_zero) &&
    finiteNonnegative(row?.affine_fit_max_abs_midpoint_residual) &&
    finiteNonnegative(row?.quadratic_fit_max_abs_midpoint_residual) &&
    (row?.affine_slope_abs_share === null ||
      (finiteNonnegative(row?.affine_slope_abs_share) &&
        Number(row.affine_slope_abs_share) <= 1 + 1e-12)) &&
    (row?.source_zero_abs_midpoint_share === null ||
      (finiteNonnegative(row?.source_zero_abs_midpoint_share) &&
        Number(row.source_zero_abs_midpoint_share) <= 1 + 1e-12));
  const pairRowValid = (row) =>
    Array.isArray(row?.terms) &&
    row.terms.length === 2 &&
    row.terms.every((term) => requiredTerms.has(term)) &&
    Number.isFinite(Number(row?.signed_pair_midpoint)) &&
    finiteNonnegative(row?.abs_pair_midpoint_sum) &&
    (row?.cancellation_fraction === null ||
      (finiteNonnegative(row?.cancellation_fraction) &&
        Number(row.cancellation_fraction) <= 1 + 1e-12));
  const termPressureRowValid = (row) =>
    sourceTermNames.has(row?.term) &&
    hasFiniteInterval(row?.coefficient) &&
    finiteNonnegative(row?.coefficient_abs_upper) &&
    finiteNonnegative(row?.pressure_contribution);
  const referencePressureResultValid = (row) =>
    finitePositive(row?.target_pressure) &&
    finiteNonnegative(row?.source_over_target) &&
    finiteNonnegative(row?.term_triangle_over_target) &&
    typeof row?.signed_source_meets_target === "boolean" &&
    typeof row?.term_triangle_meets_target === "boolean";
  const collarRowValid = (row) =>
    Number.isInteger(row?.collar_index) &&
    row.collar_index >= 0 &&
    finiteNonnegative(row?.half_width) &&
    hasFiniteInterval(row?.h38_noise_interval) &&
    hasFiniteInterval(row?.clipped_h38_noise_interval) &&
    finiteNonnegative(row?.h38_residual_half_width) &&
    hasFiniteInterval(row?.source_coefficient_interval) &&
    finiteNonnegative(row?.source_coefficient_abs_upper) &&
    finitePositive(row?.source_pressure) &&
    finitePositive(row?.term_triangle_pressure) &&
    finiteNonnegative(row?.source_to_term_triangle_pressure_ratio) &&
    finitePositive(row?.term_triangle_to_source_pressure_gain) &&
    termPressureRowValid(row?.dominant_term) &&
    Array.isArray(row?.term_pressure_rows) &&
    row.term_pressure_rows.length >= requiredTerms.size &&
    row.term_pressure_rows.every(termPressureRowValid) &&
    [...requiredTerms].every((term) =>
      row.term_pressure_rows.some((termRow) => termRow.term === term)
    ) &&
    Array.isArray(row?.reference_pressure_results) &&
    row.reference_pressure_results.length ===
      diagnostic?.reference_pressure_targets?.length &&
    row.reference_pressure_results.every(referencePressureResultValid);
  const referenceCollarSummaryValid = (row) =>
    finitePositive(row?.target_pressure) &&
    (row?.max_signed_source_half_width_meeting_target === null ||
      finiteNonnegative(row?.max_signed_source_half_width_meeting_target)) &&
    (row?.max_term_triangle_half_width_meeting_target === null ||
      finiteNonnegative(row?.max_term_triangle_half_width_meeting_target)) &&
    Number.isInteger(row?.signed_source_collar_count) &&
    row.signed_source_collar_count >= 0 &&
    Number.isInteger(row?.term_triangle_collar_count) &&
    row.term_triangle_collar_count >= 0 &&
    (row?.worst_source_over_target === null ||
      finiteNonnegative(row?.worst_source_over_target)) &&
    (row?.worst_term_triangle_over_target === null ||
      finiteNonnegative(row?.worst_term_triangle_over_target)) &&
    typeof row?.signed_source_beats_triangle_at_some_collar === "boolean";
  const producerProfileSampleValid = (sample) =>
    Number.isInteger(sample?.row_index) &&
    sample.row_index >= 0 &&
    typeof sample?.cell_id === "string" &&
    hasNondecreasingFiniteInterval(sample?.speed_interval) &&
    hasNondecreasingFiniteInterval(sample?.xi_interval) &&
    Number.isFinite(Number(sample?.xi_midpoint)) &&
    hasNondecreasingFiniteInterval(sample?.h38_interval) &&
    hasNondecreasingFiniteInterval(sample?.graph_interval) &&
    hasFiniteInterval(sample?.residual_interval) &&
    Number.isFinite(Number(sample?.residual_midpoint)) &&
    hasFiniteInterval(sample?.residual_coordinate_interval) &&
    Number.isFinite(Number(sample?.residual_coordinate_midpoint)) &&
    finiteNonnegative(sample?.residual_coordinate_width);
  const producerCoordinateProfileValid = (profile) =>
    profile?.coordinate_formula ===
      "u=(h38-q38(xi)-center(residual_hull))/radius(residual_hull)" &&
    profile?.h38_index ===
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index &&
    hasOrderedFiniteInterval(profile?.residual_interval) &&
    Number.isFinite(Number(profile?.residual_center)) &&
    finitePositive(profile?.residual_radius) &&
    profile?.row_count === diagnostic?.comparison_row_count &&
    hasFiniteInterval(profile?.residual_coordinate_interval_hull) &&
    hasFiniteInterval(profile?.residual_coordinate_midpoint_hull) &&
    finiteNonnegative(profile?.residual_coordinate_interval_hull_width) &&
    finiteNonnegative(profile?.residual_coordinate_midpoint_hull_width) &&
    finiteNonnegative(profile?.max_residual_coordinate_interval_width) &&
    Array.isArray(profile?.samples) &&
    profile.samples.length === profile.row_count &&
    profile.samples.every(producerProfileSampleValid);
  const producerTargetFitSampleValid = (sample) =>
    Number.isInteger(sample?.row_index) &&
    sample.row_index >= 0 &&
    typeof sample?.cell_id === "string" &&
    hasFiniteInterval(sample?.residual_coordinate_interval) &&
    Number.isFinite(Number(sample?.residual_coordinate_midpoint)) &&
    typeof sample?.interval_inside_target === "boolean" &&
    typeof sample?.midpoint_inside_target === "boolean";
  const producerCoordinateTargetFitValid = (fit) =>
    typeof fit?.label === "string" &&
    hasNondecreasingFiniteInterval(fit?.target_residual_coordinate_interval) &&
    finiteNonnegative(fit?.target_residual_coordinate_width) &&
    hasFiniteInterval(fit?.producer_residual_coordinate_interval_hull) &&
    hasFiniteInterval(fit?.producer_residual_coordinate_midpoint_hull) &&
    finiteNonnegative(fit?.producer_residual_coordinate_interval_hull_width) &&
    finiteNonnegative(fit?.producer_residual_coordinate_midpoint_hull_width) &&
    finiteNonnegativeOrNull(
      fit?.target_width_to_producer_interval_hull_width
    ) &&
    finiteNonnegativeOrNull(
      fit?.target_width_to_producer_midpoint_hull_width
    ) &&
    finiteNonnegativeOrNull(fit?.required_interval_hull_shrink_factor) &&
    finiteNonnegativeOrNull(fit?.required_midpoint_hull_shrink_factor) &&
    Number.isFinite(
      Number(fit?.target_center_offset_from_producer_midpoint_hull_center)
    ) &&
    fit?.row_count === diagnostic?.comparison_row_count &&
    boundedCount(fit?.interval_inside_target_row_count, fit.row_count) &&
    boundedCount(fit?.midpoint_inside_target_row_count, fit.row_count) &&
    typeof fit?.target_covers_all_sample_intervals === "boolean" &&
    typeof fit?.target_covers_all_sample_midpoints === "boolean" &&
    typeof fit?.target_covers_producer_interval_hull === "boolean" &&
    typeof fit?.target_covers_producer_midpoint_hull === "boolean" &&
    Array.isArray(fit?.sample_fits) &&
    fit.sample_fits.length === fit.row_count &&
    fit.sample_fits.every(producerTargetFitSampleValid);
  const producerImageCollarRowValid = (row) =>
    Number.isInteger(row?.collar_index) &&
    row.collar_index >= 0 &&
    finiteNonnegative(row?.half_width) &&
    finitePositive(row?.source_pressure) &&
    finitePositive(row?.term_triangle_pressure) &&
    hasNondecreasingFiniteInterval(row?.target_residual_coordinate_interval) &&
    finiteNonnegative(row?.target_residual_coordinate_width) &&
    hasFiniteInterval(row?.producer_residual_coordinate_interval_hull) &&
    hasFiniteInterval(row?.producer_residual_coordinate_midpoint_hull) &&
    Number.isFinite(
      Number(row?.target_center_offset_from_producer_midpoint_hull_center)
    ) &&
    typeof row?.target_covers_producer_interval_hull === "boolean" &&
    typeof row?.target_covers_producer_midpoint_hull === "boolean" &&
    boundedCount(
      row?.interval_inside_target_row_count,
      diagnostic?.comparison_row_count
    ) &&
    boundedCount(
      row?.midpoint_inside_target_row_count,
      diagnostic?.comparison_row_count
    ) &&
    finiteNonnegativeOrNull(row?.required_interval_hull_shrink_factor) &&
    finiteNonnegativeOrNull(row?.required_midpoint_hull_shrink_factor) &&
    finiteNonnegativeOrNull(
      row?.target_width_to_producer_interval_hull_width
    ) &&
    finiteNonnegativeOrNull(
      row?.target_width_to_producer_midpoint_hull_width
    ) &&
    producerCoordinateTargetFitValid(row?.producer_coordinate_target_fit);
  const producerCenteredCollarRowValid = (row) =>
    collarRowValid(row) &&
    hasFiniteInterval(row?.producer_midpoint_coordinate_hull);
  const referenceProducerImageSummaryValid = (row) =>
    finitePositive(row?.target_pressure) &&
    (row?.best_signed_collar_index === null ||
      (Number.isInteger(row?.best_signed_collar_index) &&
        row.best_signed_collar_index >= 0)) &&
    finiteNonnegativeOrNull(row?.best_signed_collar_half_width) &&
    finiteNonnegativeOrNull(row?.best_signed_collar_source_over_target) &&
    finiteNonnegativeOrNull(
      row?.best_signed_collar_term_triangle_over_target
    ) &&
    typeof row?.producer_midpoint_hull_inside_best_signed_collar ===
      "boolean" &&
    typeof row?.producer_interval_hull_inside_best_signed_collar ===
      "boolean" &&
    boundedCount(
      row?.producer_midpoint_inside_target_row_count,
      diagnostic?.comparison_row_count
    ) &&
    boundedCount(
      row?.producer_interval_inside_target_row_count,
      diagnostic?.comparison_row_count
    ) &&
    finiteNonnegativeOrNull(row?.required_interval_hull_shrink_factor) &&
    finiteNonnegativeOrNull(row?.required_midpoint_hull_shrink_factor) &&
    (row?.target_center_offset_from_producer_midpoint_hull_center === null ||
      Number.isFinite(
        Number(row?.target_center_offset_from_producer_midpoint_hull_center)
      )) &&
    (row?.producer_image_collar_row === null ||
      producerImageCollarRowValid(row?.producer_image_collar_row)) &&
    [
      "no-signed-source-collar-meets-reference-target",
      "signed-source-collar-covers-producer-interval-hull",
      "signed-source-collar-covers-producer-midpoint-hull-only",
      "signed-source-collar-misses-producer-midpoint-hull",
    ].includes(row?.route_interpretation);
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_Y44_SOURCE_COVARIANCE_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 h38 y44 source covariance diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-h38-y44-source-covariance-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate source covariance diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h39-h38-y44-source-covariance-diagnostic"
  ) {
    errors.push("evaluation level must identify candidate source covariance");
  }
  if (
    !Number.isInteger(diagnostic?.source_stencil_subcell_count) ||
    diagnostic.source_stencil_subcell_count < 5 ||
    !Number.isInteger(diagnostic?.comparison_stencil_index) ||
    diagnostic.comparison_stencil_index < 0 ||
    diagnostic.comparison_stencil_index >
      diagnostic.source_stencil_subcell_count - 5 ||
    diagnostic?.comparison_row_count !== 5 ||
    !Number.isInteger(diagnostic?.analysis_row_offset) ||
    diagnostic.analysis_row_offset < 0 ||
    diagnostic.analysis_row_offset > 4 ||
    !Number.isInteger(diagnostic?.polynomial_degree) ||
    diagnostic.polynomial_degree < 1 ||
    diagnostic.polynomial_degree > 3 ||
    !Number.isFinite(Number(diagnostic?.analysis_xi_coordinate)) ||
    !hasOrderedFiniteInterval(diagnostic?.h38_residual_interval) ||
    !Array.isArray(diagnostic?.collar_half_widths) ||
    diagnostic.collar_half_widths.length < 1 ||
    !diagnostic.collar_half_widths.every((halfWidth) =>
      finiteNonnegative(halfWidth)
    ) ||
    !Array.isArray(diagnostic?.reference_pressure_targets) ||
    diagnostic.reference_pressure_targets.length < 1 ||
    !diagnostic.reference_pressure_targets.every((target) =>
      finitePositive(target)
    )
  ) {
    errors.push("source covariance parameters must describe one five-row local graph window");
  }
  if (
    !Number.isInteger(diagnostic?.shifted_index) ||
    diagnostic.shifted_index !== 1 ||
    diagnostic?.y_order !==
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
        diagnostic.shifted_index
  ) {
    errors.push("shifted index must be 1 and y order must be consistent");
  }
  if (
    !Array.isArray(diagnostic?.h38_noise_samples) ||
    diagnostic.h38_noise_samples.length < 3 ||
    !diagnostic.h38_noise_samples.every(
      (sample) =>
        Number.isFinite(Number(sample)) &&
        Number(sample) >= -1 &&
        Number(sample) <= 1
    ) ||
    !Array.isArray(diagnostic?.sample_replays) ||
    diagnostic.sample_replays.length !== diagnostic.h38_noise_samples.length ||
    !diagnostic.sample_replays.every((sample) =>
      replayValid(sample, { boundedNoise: true })
    )
  ) {
    errors.push("source covariance samples must be finite bounded h38 replays");
  }
  if (
    !fitValid(diagnostic?.source_coefficient_affine_fit, 1) ||
    !fitValid(diagnostic?.source_coefficient_quadratic_fit, 2) ||
    (diagnostic?.source_affine_to_quadratic_residual_ratio !== null &&
      !finiteNonnegative(
        diagnostic?.source_affine_to_quadratic_residual_ratio
      )) ||
    !Number.isFinite(Number(diagnostic?.source_affine_zero_coordinate)) ||
    typeof diagnostic?.source_affine_zero_inside_sample_domain !==
      "boolean" ||
    !replayValid(diagnostic?.source_affine_zero_replay, {
      boundedNoise: false,
    })
  ) {
    errors.push("source covariance must include finite source fits and affine-zero replay");
  }
  if (
    !Number.isFinite(Number(diagnostic?.source_zero_coefficient_midpoint)) ||
    !Number.isFinite(Number(diagnostic?.source_zero_term_midpoint_sum)) ||
    !finitePositive(diagnostic?.source_zero_term_abs_midpoint_sum) ||
    !finiteNonnegative(diagnostic?.source_zero_cancellation_ratio) ||
    !finiteNonnegative(diagnostic?.source_zero_term_sum_relative_gap)
  ) {
    errors.push("source-zero signed term summary must be finite and nonnegative");
  }
  if (
    !Array.isArray(diagnostic?.term_coefficient_dependence_profiles) ||
    diagnostic.term_coefficient_dependence_profiles.length !==
      requiredTerms.size ||
    !diagnostic.term_coefficient_dependence_profiles.every(profileValid) ||
    !Array.isArray(diagnostic?.term_covariance_rows) ||
    diagnostic.term_covariance_rows.length !== requiredTerms.size ||
    !diagnostic.term_covariance_rows.every(termRowValid) ||
    !Array.isArray(diagnostic?.term_pair_cancellation_rows) ||
    diagnostic.term_pair_cancellation_rows.length !== 3 ||
    !diagnostic.term_pair_cancellation_rows.every(pairRowValid)
  ) {
    errors.push("source covariance must carry finite source-term covariance and pair-cancellation rows");
  }
  if (
    !Array.isArray(diagnostic?.source_covariance_collar_rows) ||
    diagnostic.source_covariance_collar_rows.length !==
      diagnostic.collar_half_widths.length ||
    !diagnostic.source_covariance_collar_rows.every(collarRowValid) ||
    !Array.isArray(
      diagnostic?.source_covariance_reference_collar_summary
    ) ||
    diagnostic.source_covariance_reference_collar_summary.length !==
      diagnostic.reference_pressure_targets.length ||
    !diagnostic.source_covariance_reference_collar_summary.every(
      referenceCollarSummaryValid
    ) ||
    !finitePositive(diagnostic?.max_source_covariance_term_triangle_gain)
  ) {
    errors.push("source covariance collar replay must compare signed source pressure against term-triangle pressure");
  }
  if (
    !producerCoordinateProfileValid(
      diagnostic?.h38_producer_residual_coordinate_profile
    ) ||
    !Array.isArray(
      diagnostic?.source_covariance_producer_image_collar_rows
    ) ||
    diagnostic.source_covariance_producer_image_collar_rows.length !==
      diagnostic.collar_half_widths.length ||
    !diagnostic.source_covariance_producer_image_collar_rows.every(
      producerImageCollarRowValid
    ) ||
    !Array.isArray(
      diagnostic?.source_covariance_reference_producer_image_summary
    ) ||
    diagnostic.source_covariance_reference_producer_image_summary.length !==
      diagnostic.reference_pressure_targets.length ||
    !diagnostic.source_covariance_reference_producer_image_summary.every(
      referenceProducerImageSummaryValid
    ) ||
    ![
      "zero-centered-source-collar-covers-producer-interval-hull",
      "zero-centered-source-collar-covers-producer-midpoint-hull-only",
      "zero-centered-source-collar-misses-producer-midpoint-hull",
      "no-reference-target-closed-by-zero-centered-source-collar",
    ].includes(diagnostic?.source_covariance_producer_image_route_diagnosis)
  ) {
    errors.push("source covariance producer-image comparison must fit the H38 producer coordinate profile");
  }
  if (
    !Array.isArray(
      diagnostic?.source_covariance_producer_centered_collar_rows
    ) ||
    diagnostic.source_covariance_producer_centered_collar_rows.length !==
      diagnostic.collar_half_widths.length ||
    !diagnostic.source_covariance_producer_centered_collar_rows.every(
      producerCenteredCollarRowValid
    ) ||
    !Array.isArray(
      diagnostic?.source_covariance_reference_producer_centered_summary
    ) ||
    diagnostic.source_covariance_reference_producer_centered_summary.length !==
      diagnostic.reference_pressure_targets.length ||
    !diagnostic.source_covariance_reference_producer_centered_summary.every(
      referenceCollarSummaryValid
    ) ||
    ![
      "producer-centered-source-collar-closes-reference-target",
      "producer-midpoint-hull-closes-reference-target",
      "producer-centered-source-collar-exceeds-reference-target",
    ].includes(
      diagnostic?.source_covariance_producer_centered_route_diagnosis
    )
  ) {
    errors.push("source covariance producer-centered replay must compare signed pressure on the H38 producer midpoint hull");
  }
  if (
    !termRowValid(diagnostic?.dominant_source_zero_term) ||
    !termRowValid(diagnostic?.dominant_affine_slope_term) ||
    !pairRowValid(diagnostic?.strongest_pair_cancellation)
  ) {
    errors.push("source covariance must identify dominant term and pair witnesses");
  }
  if (
    ![
      "source-affine-zero-preserves-strong-term-cancellation",
      "source-affine-zero-dominated-by-pairwise-term-cancellation",
      "source-affine-zero-needs-higher-order-covariance-proof",
    ].includes(diagnostic?.source_covariance_diagnosis) ||
    typeof diagnostic?.candidate_certificate_route !== "string"
  ) {
    errors.push("source covariance diagnosis must classify the candidate route");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_h38_y44_source_covariance !==
      false ||
    diagnostic?.claim_boundary
      ?.certifies_h38_y44_source_covariance_collar !== false ||
    diagnostic?.claim_boundary
      ?.certifies_h38_y44_source_covariance_producer_image_collar !==
      false ||
    diagnostic?.claim_boundary
      ?.certifies_h38_y44_source_covariance_producer_centered_collar !==
      false ||
    diagnostic?.claim_boundary?.certifies_source_level_affine_zero !==
      false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep source covariance and shifted closure open");
  }
  return errors;
}

export function validateH39H38Y44SignedAffineTargetEnvelopeDiagnostic(
  diagnostic
) {
  const errors = [];
  const hasOrderedFiniteInterval = (interval) =>
    Array.isArray(interval) &&
    interval.length === 2 &&
    Number.isFinite(Number(interval[0])) &&
    Number.isFinite(Number(interval[1])) &&
    Number(interval[1]) > Number(interval[0]);
  const hasFiniteInterval = (interval) =>
    Array.isArray(interval) &&
    interval.length === 2 &&
    Number.isFinite(Number(interval[0])) &&
    Number.isFinite(Number(interval[1]));
  const fitValid = (fit, degree) =>
    fit?.polynomial_degree === degree &&
    Array.isArray(fit?.coefficients) &&
    fit.coefficients.length === degree + 1 &&
    fit.coefficients.every((coefficient) =>
      Number.isFinite(Number(coefficient))
    ) &&
    fit?.coefficient_order ===
      "ascending powers of h38 residual coordinate u" &&
    Number.isFinite(Number(fit?.max_abs_midpoint_residual)) &&
    Array.isArray(fit?.residuals) &&
    fit.residuals.length === diagnostic?.h38_noise_samples?.length;
  const replayValid = (sample) =>
    Number.isInteger(sample?.sample_index) &&
    Number.isFinite(Number(sample?.h38_noise_coordinate)) &&
    Number(sample.h38_noise_coordinate) >= -1 &&
    Number(sample.h38_noise_coordinate) <= 1 &&
    Number.isFinite(Number(sample?.h38_value)) &&
    hasFiniteInterval(sample?.source_coefficient_interval) &&
    Number.isFinite(Number(sample?.source_coefficient_midpoint)) &&
    Number.isFinite(Number(sample?.source_coefficient_width)) &&
    Number.isFinite(Number(sample?.source_coefficient_abs_upper)) &&
    finitePositive(sample?.pressure) &&
    finitePositive(sample?.row_pressure?.source_pressure_contribution);
  const producerCoordinateProfileValid = (profile) =>
    profile?.coordinate_formula ===
      "u=(h38-q38(xi)-center(residual_hull))/radius(residual_hull)" &&
    profile?.h38_index ===
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index &&
    finitePositive(profile?.residual_radius) &&
    profile?.row_count === diagnostic?.comparison_row_count &&
    hasOrderedFiniteInterval(profile?.residual_coordinate_interval_hull) &&
    hasFiniteInterval(profile?.residual_coordinate_midpoint_hull) &&
    finiteNonnegative(profile?.residual_coordinate_interval_hull_width) &&
    finiteNonnegative(profile?.residual_coordinate_midpoint_hull_width) &&
    finiteNonnegative(profile?.max_residual_coordinate_interval_width) &&
    Array.isArray(profile?.samples) &&
    profile.samples.length === diagnostic?.comparison_row_count &&
    profile.samples.every(
      (sample) =>
        Number.isInteger(sample?.row_index) &&
        typeof sample?.cell_id === "string" &&
        hasFiniteInterval(sample?.xi_interval) &&
        hasFiniteInterval(sample?.h38_interval) &&
        hasFiniteInterval(sample?.graph_interval) &&
        hasFiniteInterval(sample?.residual_interval) &&
        hasFiniteInterval(sample?.residual_coordinate_interval) &&
        Number.isFinite(Number(sample?.residual_coordinate_midpoint)) &&
        finiteNonnegative(sample?.residual_coordinate_width)
    );
  const producerCoordinateTargetFitValid = (fit) =>
    typeof fit?.label === "string" &&
    hasFiniteInterval(fit?.target_residual_coordinate_interval) &&
    finiteNonnegative(fit?.target_residual_coordinate_width) &&
    hasFiniteInterval(fit?.producer_residual_coordinate_interval_hull) &&
    hasFiniteInterval(fit?.producer_residual_coordinate_midpoint_hull) &&
    finiteNonnegative(
      fit?.producer_residual_coordinate_interval_hull_width
    ) &&
    finiteNonnegative(
      fit?.producer_residual_coordinate_midpoint_hull_width
    ) &&
    (fit?.target_width_to_producer_interval_hull_width === null ||
      finiteNonnegative(
        fit?.target_width_to_producer_interval_hull_width
      )) &&
    (fit?.target_width_to_producer_midpoint_hull_width === null ||
      finiteNonnegative(
        fit?.target_width_to_producer_midpoint_hull_width
      )) &&
    (fit?.required_interval_hull_shrink_factor === null ||
      finiteNonnegative(fit?.required_interval_hull_shrink_factor)) &&
    (fit?.required_midpoint_hull_shrink_factor === null ||
      finiteNonnegative(fit?.required_midpoint_hull_shrink_factor)) &&
    Number.isFinite(
      Number(fit?.target_center_offset_from_producer_midpoint_hull_center)
    ) &&
    fit?.row_count === diagnostic?.comparison_row_count &&
    Number.isInteger(fit?.interval_inside_target_row_count) &&
    Number.isInteger(fit?.midpoint_inside_target_row_count) &&
    typeof fit?.target_covers_all_sample_intervals === "boolean" &&
    typeof fit?.target_covers_all_sample_midpoints === "boolean" &&
    typeof fit?.target_covers_producer_interval_hull === "boolean" &&
    typeof fit?.target_covers_producer_midpoint_hull === "boolean" &&
    Array.isArray(fit?.sample_fits) &&
    fit.sample_fits.length === diagnostic?.comparison_row_count;
  const producerCenteredSafetySearchValid = (search) =>
    Number.isInteger(search?.safety_search_iterations) &&
    Number.isFinite(Number(search?.target_closing_half_width)) &&
    search.target_closing_half_width >= 0 &&
    (search?.target_closing_safety_divisor === null ||
      finitePositive(search?.target_closing_safety_divisor)) &&
    (search?.target_closing_replay_pressure === null ||
      finitePositive(search?.target_closing_replay_pressure)) &&
    (search?.target_closing_replay_over_target_pressure === null ||
      finitePositive(search?.target_closing_replay_over_target_pressure)) &&
    (search?.target_closing_center_eliminated_pressure === null ||
      finitePositive(search?.target_closing_center_eliminated_pressure)) &&
    (search?.target_closing_center_eliminated_over_target_pressure === null ||
      finitePositive(
        search?.target_closing_center_eliminated_over_target_pressure
      )) &&
    (search?.center_hull_replay_pressure === null ||
      finitePositive(search?.center_hull_replay_pressure)) &&
    (search?.center_hull_replay_over_target_pressure === null ||
      finitePositive(search?.center_hull_replay_over_target_pressure)) &&
    hasFiniteInterval(search?.target_closing_h38_noise_interval) &&
    hasFiniteInterval(search?.clipped_target_closing_h38_noise_interval) &&
    Number.isFinite(Number(search?.target_closing_h38_residual_half_width)) &&
    hasFiniteInterval(search?.target_closing_bracket) &&
    Number.isFinite(Number(search?.target_closing_bracket_width)) &&
    Number.isInteger(search?.expansion_step_count) &&
    search.expansion_step_count >= 0 &&
    [
      "not-applicable",
      "producer-center-hull-meets-reference-target",
      "producer-center-hull-exceeds-reference-target",
      "producer-centered-full-hull-meets-reference-target",
      "bisection-found-producer-centered-half-width-meeting-reference-target",
      "producer-center-hull-meets-reference-target-but-no-positive-width-found",
      "bisection-did-not-find-producer-centered-half-width-meeting-reference-target",
    ].includes(search?.safety_search_status);
  const producerCenteredCollarTargetValid = (target) =>
    typeof target?.label === "string" &&
    hasFiniteInterval(target?.collar_center_coordinate_hull) &&
    hasFiniteInterval(target?.collar_residual_coordinate_interval) &&
    finiteNonnegative(target?.collar_residual_coordinate_half_width) &&
    finiteNonnegative(target?.collar_residual_coordinate_width) &&
    typeof target?.positive_collar_found === "boolean" &&
    hasFiniteInterval(target?.producer_residual_coordinate_interval_hull) &&
    hasFiniteInterval(target?.producer_residual_coordinate_midpoint_hull) &&
    finiteNonnegative(
      target?.producer_residual_coordinate_interval_hull_width
    ) &&
    finiteNonnegative(
      target?.producer_residual_coordinate_midpoint_hull_width
    ) &&
    finiteNonnegative(
      target?.producer_max_residual_coordinate_interval_width
    ) &&
    typeof target?.producer_interval_hull_inside_collar === "boolean" &&
    typeof target?.producer_midpoint_hull_inside_collar === "boolean" &&
    Number.isInteger(target?.interval_inside_collar_row_count) &&
    Number.isInteger(target?.midpoint_inside_collar_row_count) &&
    (target?.required_interval_hull_compression_factor === null ||
      finitePositive(target?.required_interval_hull_compression_factor)) &&
    (target?.required_max_sample_interval_compression_factor === null ||
      finitePositive(
        target?.required_max_sample_interval_compression_factor
      )) &&
    (target?.linear_subcell_refinement_forecast === null ||
      (Number.isInteger(target?.linear_subcell_refinement_forecast) &&
        target.linear_subcell_refinement_forecast > 0)) &&
    Number.isInteger(target?.source_stencil_subcell_count) &&
    target.source_stencil_subcell_count >= 5 &&
    (target?.target_replay_over_target_pressure === null ||
      finitePositive(target?.target_replay_over_target_pressure)) &&
    [
      "producer-interval-hull-inside-collar",
      "positive-midpoint-collar-full-interval-open",
      "midpoint-only-collar-full-interval-open",
      "producer-midpoint-hull-outside-collar",
    ].includes(target?.target_status) &&
    [
      "current-producer-interval-hull-already-fits-collar",
      "linear-subcell-refinement-impractical-analytic-covariance-needed",
      "positive-collar-gives-finite-producer-image-certificate-target",
      "center-hull-only-collar-needs-positive-width-or-producer-image-proof",
    ].includes(target?.refinement_interpretation) &&
    Array.isArray(target?.sample_fits) &&
    target.sample_fits.length === diagnostic?.comparison_row_count;
  const h38Y44SolveWidthProfileValid = (profile) =>
    profile?.h_index ===
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index &&
    profile?.sample_count === diagnostic?.comparison_row_count &&
    Array.isArray(profile?.samples) &&
    profile.samples.length === diagnostic?.comparison_row_count &&
    hasFiniteInterval(profile?.residual_interval_hulls?.full_solve) &&
    hasFiniteInterval(profile?.residual_interval_hulls?.numerator_only) &&
    hasFiniteInterval(profile?.residual_interval_hulls?.slope_only) &&
    hasFiniteInterval(profile?.residual_interval_hulls?.midpoint_solve) &&
    finitePositive(profile?.max_solve_widths?.reconstructed_full_solve) &&
    finitePositive(profile?.max_solve_widths?.numerator_only) &&
    finiteNonnegative(profile?.max_solve_widths?.slope_only) &&
    finiteNonnegative(profile?.max_solve_widths?.graph_interval) &&
    finitePositive(profile?.numerator_only_to_full_solve_width_ratio) &&
    finiteNonnegative(profile?.slope_only_to_full_solve_width_ratio) &&
    [
      "h38-recurrence-numerator-width",
      "inherited-solve-slope-width",
      "mixed-numerator-slope-width",
    ].includes(profile?.dominant_solve_width_source);
  const h38Y44NumeratorPolynomialDiagnosticValid = (diagnosticRow) =>
    Number.isInteger(diagnosticRow?.polynomial_degree) &&
    diagnosticRow.polynomial_degree >= 1 &&
    diagnosticRow.polynomial_degree <= 3 &&
    Array.isArray(diagnosticRow?.coefficients) &&
    diagnosticRow.coefficients.length ===
      diagnosticRow.polynomial_degree + 1 &&
    diagnosticRow.coefficients.every((coefficient) =>
      Number.isFinite(Number(coefficient))
    ) &&
    Array.isArray(diagnosticRow?.residuals) &&
    diagnosticRow.residuals.length === diagnostic?.comparison_row_count &&
    finiteNonnegative(diagnosticRow?.max_midpoint_residual) &&
    finitePositive(diagnosticRow?.max_numerator_interval_width) &&
    finiteNonnegative(
      diagnosticRow?.midpoint_residual_to_numerator_width_ratio
    );
  const producerCenteredNumeratorCollarTargetValid = (target) =>
    typeof target?.label === "string" &&
    Number.isInteger(target?.numerator_polynomial_degree) &&
    target.numerator_polynomial_degree >= 1 &&
    target.numerator_polynomial_degree <= 3 &&
    hasFiniteInterval(target?.h38_residual_collar_interval) &&
    finiteNonnegative(target?.h38_residual_collar_width) &&
    (target
      ?.max_numerator_interval_compression_to_conservative_target === null ||
      finitePositive(
        target
          ?.max_numerator_interval_compression_to_conservative_target
      )) &&
    (target
      ?.max_numerator_midpoint_residual_over_conservative_target === null ||
      finiteNonnegative(
        target
          ?.max_numerator_midpoint_residual_over_conservative_target
      )) &&
    (target
      ?.min_numerator_midpoint_residual_headroom_factor === null ||
      finitePositive(
        target
          ?.min_numerator_midpoint_residual_headroom_factor
      )) &&
    (target
      ?.max_numerator_midpoint_residual_over_midpoint_slope_target ===
      null ||
      finiteNonnegative(
        target
          ?.max_numerator_midpoint_residual_over_midpoint_slope_target
      )) &&
    (target
      ?.min_numerator_midpoint_slope_residual_headroom_factor ===
      null ||
      finitePositive(
        target
          ?.min_numerator_midpoint_slope_residual_headroom_factor
      )) &&
    (target?.min_slope_abs_lower_to_midpoint_abs_ratio === null ||
      finiteNonnegative(
        target?.min_slope_abs_lower_to_midpoint_abs_ratio
      )) &&
    (target?.max_slope_abs_lower_to_midpoint_abs_ratio === null ||
      finiteNonnegative(
        target?.max_slope_abs_lower_to_midpoint_abs_ratio
      )) &&
    typeof target?.numerator_interval_hull_open_against_collar ===
      "boolean" &&
    typeof target?.numerator_midpoint_graph_inside_collar_target ===
      "boolean" &&
    typeof target
      ?.numerator_midpoint_graph_inside_midpoint_slope_target ===
      "boolean" &&
    [
      "degenerate-collar-no-numerator-target",
      "numerator-interval-hull-inside-collar-target",
      "numerator-midpoint-graph-inside-collar-target-interval-open",
      "numerator-midpoint-graph-exceeds-collar-target",
    ].includes(target?.target_status) &&
    [
      "numerator-graph-residual-certificate-can-target-producer-collar",
      "current-numerator-interval-hull-already-fits-producer-collar",
      "s37-lower-bound-dependency-collapse-before-numerator-collar",
      "numerator-graph-degree-or-local-coordinate-must-tighten",
      "positive-producer-collar-needed-before-numerator-target",
    ].includes(target?.proof_route_interpretation) &&
    Array.isArray(target?.samples) &&
    target.samples.length === diagnostic?.comparison_row_count;
  const n38RouteSampleValid = (sample) =>
    sample === null ||
    (typeof sample?.reference_label === "string" &&
      typeof sample?.cell_id === "string" &&
      hasFiniteInterval(sample?.xi_interval) &&
      Number.isFinite(Number(sample?.xi_midpoint)) &&
      Number.isFinite(Number(sample?.numerator_midpoint_residual)) &&
      finiteNonnegative(sample?.numerator_abs_midpoint_residual) &&
      (sample?.conservative_numerator_width_target === null ||
        sample?.conservative_numerator_width_target === undefined ||
        finiteNonnegative(sample?.conservative_numerator_width_target)) &&
      (sample?.midpoint_slope_numerator_width_target === null ||
        sample?.midpoint_slope_numerator_width_target === undefined ||
        finiteNonnegative(sample?.midpoint_slope_numerator_width_target)) &&
      (sample?.slope_interval === undefined ||
        hasFiniteInterval(sample?.slope_interval)) &&
      (sample?.slope_abs_lower === undefined ||
        finiteNonnegative(sample?.slope_abs_lower)) &&
      (sample?.slope_abs_upper === undefined ||
        finiteNonnegative(sample?.slope_abs_upper)) &&
      (sample?.slope_abs_lower_to_midpoint_abs_ratio === null ||
        sample?.slope_abs_lower_to_midpoint_abs_ratio === undefined ||
        finiteNonnegative(sample?.slope_abs_lower_to_midpoint_abs_ratio)) &&
      (sample?.numerator_midpoint_residual_over_conservative_target ===
        null ||
        sample?.numerator_midpoint_residual_over_conservative_target ===
          undefined ||
        finiteNonnegative(
          sample?.numerator_midpoint_residual_over_conservative_target
        )) &&
      (sample?.numerator_midpoint_residual_over_midpoint_slope_target ===
        null ||
        sample?.numerator_midpoint_residual_over_midpoint_slope_target ===
          undefined ||
        finiteNonnegative(
          sample?.numerator_midpoint_residual_over_midpoint_slope_target
        )) &&
      (sample?.numerator_midpoint_residual_headroom_factor === null ||
        sample?.numerator_midpoint_residual_headroom_factor === undefined ||
        finitePositive(sample?.numerator_midpoint_residual_headroom_factor)) &&
      (sample?.numerator_midpoint_slope_residual_headroom_factor === null ||
        sample?.numerator_midpoint_slope_residual_headroom_factor ===
          undefined ||
        finitePositive(
          sample?.numerator_midpoint_slope_residual_headroom_factor
        )));
  const n38CollarEnclosureRouteValid = (route) =>
    route?.status ===
      "h39-h38-y44-n38-collar-enclosure-route-candidate-emitted" &&
    route?.evaluation_level ===
      "candidate-h38-y44-n38-collar-enclosure-route" &&
    Number.isInteger(route?.polynomial_degree) &&
    route.polynomial_degree >= 1 &&
    route.polynomial_degree <= 3 &&
    Array.isArray(route?.numerator_polynomial_coefficients) &&
    route.numerator_polynomial_coefficients.length ===
      route.polynomial_degree + 1 &&
    route.numerator_polynomial_coefficients.every((coefficient) =>
      Number.isFinite(Number(coefficient))
    ) &&
    Number.isInteger(route?.source_stencil_subcell_count) &&
    route.source_stencil_subcell_count >= 5 &&
    Number.isInteger(route?.reference_target_count) &&
    route.reference_target_count >= 1 &&
    Number.isInteger(route?.sample_count) &&
    route.sample_count ===
      route.reference_target_count * diagnostic?.comparison_row_count &&
    Number.isInteger(
      route?.reference_targets_with_midpoint_graph_inside_collar_count
    ) &&
    route.reference_targets_with_midpoint_graph_inside_collar_count >= 0 &&
    route.reference_targets_with_midpoint_graph_inside_collar_count <=
      route.reference_target_count &&
    Number.isInteger(
      route
        ?.reference_targets_with_midpoint_slope_graph_inside_collar_count
    ) &&
    route.reference_targets_with_midpoint_slope_graph_inside_collar_count >=
      0 &&
    route.reference_targets_with_midpoint_slope_graph_inside_collar_count <=
      route.reference_target_count &&
    (route?.min_conservative_numerator_width_target === null ||
      finiteNonnegative(route.min_conservative_numerator_width_target)) &&
    (route?.max_conservative_numerator_width_target === null ||
      finiteNonnegative(route.max_conservative_numerator_width_target)) &&
    (route?.max_numerator_abs_midpoint_residual === null ||
      finiteNonnegative(route.max_numerator_abs_midpoint_residual)) &&
    (route?.max_midpoint_residual_over_conservative_target === null ||
      finiteNonnegative(
        route.max_midpoint_residual_over_conservative_target
      )) &&
    (route?.min_midpoint_residual_headroom_factor === null ||
      finitePositive(route.min_midpoint_residual_headroom_factor)) &&
    (route?.max_midpoint_residual_over_midpoint_slope_target === null ||
      finiteNonnegative(
        route.max_midpoint_residual_over_midpoint_slope_target
      )) &&
    (route?.min_midpoint_slope_residual_headroom_factor === null ||
      finitePositive(route.min_midpoint_slope_residual_headroom_factor)) &&
    (route?.min_slope_abs_lower_to_midpoint_abs_ratio === null ||
      finiteNonnegative(
        route.min_slope_abs_lower_to_midpoint_abs_ratio
      )) &&
    (route
      ?.max_numerator_interval_compression_to_conservative_target === null ||
      finitePositive(
        route
          .max_numerator_interval_compression_to_conservative_target
      )) &&
    (route
      ?.max_midpoint_residual_to_raw_numerator_interval_width_ratio ===
      null ||
      finiteNonnegative(
        route
          .max_midpoint_residual_to_raw_numerator_interval_width_ratio
      )) &&
    n38RouteSampleValid(route?.controlling_sample ?? null) &&
    n38RouteSampleValid(route?.controlling_midpoint_slope_sample ?? null) &&
    [
      "midpoint-slope-collar-fits-but-conservative-s37-lower-bound-collapses",
      "midpoint-slope-collar-also-fails-n38-graph-residual",
      "conservative-s37-lower-bound-supports-n38-collar",
      "s37-dependency-status-open",
    ].includes(route?.s37_dependency_status) &&
    typeof route?.directed_rounded_proof_obligation?.target === "string" &&
    typeof route.directed_rounded_proof_obligation.dependency_to_preserve ===
      "string" &&
    typeof route.directed_rounded_proof_obligation.sufficient_condition ===
      "string" &&
    typeof route.directed_rounded_proof_obligation.current_evidence ===
      "string" &&
    [
      "n38-quadratic-midpoint-residual-has-directed-rounded-collar-headroom",
      "s37-lower-bound-dependency-collapse-controls-n38-collar-route",
      "n38-quadratic-midpoint-residual-has-partial-collar-headroom",
      "n38-quadratic-midpoint-residual-collar-route-open",
    ].includes(route?.route_diagnosis) &&
    route?.claim_boundary?.certifies_h38_n38_graph_enclosure === false &&
    route?.claim_boundary
      ?.certifies_s37_dependency_preserving_division === false &&
    route?.claim_boundary?.certifies_producer_collar_enclosure === false &&
    route?.claim_boundary?.certifies_shifted_R43_outer_bound === false &&
    route?.claim_boundary?.certifies_directed_rounded_shared_domain ===
      false &&
    route?.claim_boundary?.certifies_continuous_polydisc_primitives ===
      false &&
    route?.claim_boundary?.retained_branch === false;
  const pressureEntryValid = (entry) =>
    typeof entry?.label === "string" &&
    finitePositive(entry?.target_pressure) &&
    entry?.target_pressure_role ===
      "reference-only; not a shifted R43 closure threshold" &&
    finitePositive(entry?.coefficient_abs_target) &&
    finitePositive(entry?.ideal_affine_half_width) &&
    Number.isFinite(Number(entry?.midpoint_residual_aware_half_width)) &&
    Number.isFinite(Number(entry?.candidate_margin_aware_half_width)) &&
    finitePositive(entry?.candidate_margin_abs_upper) &&
    hasFiniteInterval(entry?.zero_centered_h38_noise_interval) &&
    hasFiniteInterval(entry?.clipped_zero_centered_h38_noise_interval) &&
    Number.isFinite(Number(entry?.zero_centered_h38_residual_half_width)) &&
    entry?.full_residual_coordinate_half_width === 1 &&
    (entry?.required_full_domain_shrink_factor === null ||
      finitePositive(entry?.required_full_domain_shrink_factor)) &&
    typeof entry?.fits_inside_sample_domain === "boolean" &&
    finitePositive(entry?.interval_replay_pressure) &&
    hasFiniteInterval(entry?.interval_replay_source_coefficient_interval) &&
    finitePositive(entry?.interval_replay_source_coefficient_abs_upper) &&
    finitePositive(entry?.interval_replay_over_target_pressure) &&
    hasFiniteInterval(entry?.interval_replay?.h38_noise_interval) &&
    hasFiniteInterval(entry?.interval_replay?.h38_interval) &&
    finitePositive(entry?.interval_replay?.row_pressure?.source_pressure_contribution) &&
    (entry?.interval_replay_center_eliminated_pressure === null ||
      finitePositive(entry?.interval_replay_center_eliminated_pressure)) &&
    (entry?.interval_replay_center_eliminated_over_target_pressure === null ||
      finitePositive(
        entry?.interval_replay_center_eliminated_over_target_pressure
      )) &&
    (entry?.interval_replay_center_elimination_improvement_factor === null ||
      finitePositive(
        entry?.interval_replay_center_elimination_improvement_factor
      )) &&
    finitePositive(entry?.amplification_correction_divisor) &&
    Number.isFinite(Number(entry?.amplification_corrected_half_width)) &&
    hasFiniteInterval(entry?.amplification_corrected_h38_noise_interval) &&
    hasFiniteInterval(
      entry?.clipped_amplification_corrected_h38_noise_interval
    ) &&
    Number.isFinite(
      Number(entry?.amplification_corrected_h38_residual_half_width)
    ) &&
    finitePositive(entry?.amplification_corrected_interval_replay_pressure) &&
    finitePositive(
      entry?.amplification_corrected_interval_replay_over_target_pressure
    ) &&
    hasFiniteInterval(
      entry?.amplification_corrected_interval_replay?.h38_noise_interval
    ) &&
    hasFiniteInterval(
      entry?.amplification_corrected_interval_replay?.h38_interval
    ) &&
    (entry?.amplification_corrected_center_eliminated_pressure === null ||
      finitePositive(
        entry?.amplification_corrected_center_eliminated_pressure
      )) &&
    (entry
      ?.amplification_corrected_center_eliminated_over_target_pressure ===
      null ||
      finitePositive(
        entry
          ?.amplification_corrected_center_eliminated_over_target_pressure
      )) &&
    (entry
      ?.amplification_corrected_center_elimination_improvement_factor ===
      null ||
      finitePositive(
        entry?.amplification_corrected_center_elimination_improvement_factor
      )) &&
    typeof entry?.amplification_corrected_replay_meets_reference_target ===
      "boolean" &&
    Number.isInteger(entry?.safety_search?.safety_search_iterations) &&
    Number.isFinite(Number(entry?.safety_search?.target_closing_half_width)) &&
    (entry?.safety_search?.target_closing_safety_divisor === null ||
      finitePositive(entry?.safety_search?.target_closing_safety_divisor)) &&
    (entry?.safety_search?.target_closing_replay_pressure === null ||
      finitePositive(entry?.safety_search?.target_closing_replay_pressure)) &&
    (entry?.safety_search?.target_closing_replay_over_target_pressure === null ||
      finitePositive(
        entry?.safety_search?.target_closing_replay_over_target_pressure
      )) &&
    (entry?.safety_search?.target_closing_center_eliminated_pressure === null ||
      finitePositive(
        entry?.safety_search?.target_closing_center_eliminated_pressure
      )) &&
    (entry
      ?.safety_search?.target_closing_center_eliminated_over_target_pressure ===
      null ||
      finitePositive(
        entry
          ?.safety_search
          ?.target_closing_center_eliminated_over_target_pressure
      )) &&
    hasFiniteInterval(entry?.safety_search?.target_closing_bracket) &&
    Number.isFinite(Number(entry?.safety_search?.target_closing_bracket_width)) &&
    typeof entry?.safety_search?.safety_search_status === "string" &&
    producerCoordinateTargetFitValid(entry?.producer_coordinate_target_fit) &&
    producerCenteredSafetySearchValid(
      entry?.producer_centered_safety_search
    ) &&
    producerCenteredCollarTargetValid(
      entry?.producer_centered_collar_target
    ) &&
    producerCenteredNumeratorCollarTargetValid(
      entry?.producer_centered_numerator_collar_target
    );
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_Y44_SIGNED_AFFINE_TARGET_ENVELOPE_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 h38 y44 signed affine target envelope diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-h38-y44-signed-affine-target-envelope-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate signed affine target envelope diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h39-h38-y44-signed-affine-target-envelope-diagnostic"
  ) {
    errors.push("evaluation level must identify candidate signed affine target envelope");
  }
  if (
    !Number.isInteger(diagnostic?.source_stencil_subcell_count) ||
    diagnostic.source_stencil_subcell_count < 5 ||
    !Number.isInteger(diagnostic?.comparison_stencil_index) ||
    diagnostic.comparison_stencil_index < 0 ||
    diagnostic?.comparison_row_count !== 5 ||
    !Number.isInteger(diagnostic?.polynomial_degree) ||
    diagnostic.polynomial_degree < 1 ||
    diagnostic.polynomial_degree > 3 ||
    !Number.isFinite(Number(diagnostic?.analysis_xi_coordinate)) ||
    !hasOrderedFiniteInterval(diagnostic?.h38_residual_interval) ||
    !producerCoordinateProfileValid(
      diagnostic?.h38_producer_residual_coordinate_profile
    ) ||
    !finiteNonnegative(diagnostic?.producer_centered_full_hull_half_width) ||
    !h38Y44SolveWidthProfileValid(diagnostic?.h38_y44_solve_width_profile) ||
    !Array.isArray(
      diagnostic?.h38_y44_numerator_polynomial_degree_diagnostics
    ) ||
    diagnostic.h38_y44_numerator_polynomial_degree_diagnostics.length < 1 ||
    !diagnostic.h38_y44_numerator_polynomial_degree_diagnostics.every(
      h38Y44NumeratorPolynomialDiagnosticValid
    ) ||
    !h38Y44NumeratorPolynomialDiagnosticValid(
      diagnostic?.h38_y44_numerator_polynomial_diagnostic
    )
  ) {
    errors.push("signed affine target envelope parameters must describe one five-row local graph window");
  }
  if (
    !Number.isInteger(diagnostic?.shifted_index) ||
    diagnostic.shifted_index !== 1 ||
    diagnostic?.y_order !==
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
        diagnostic.shifted_index
  ) {
    errors.push("shifted index must be 1 and y order must be consistent");
  }
  if (
    !Array.isArray(diagnostic?.h38_noise_samples) ||
    diagnostic.h38_noise_samples.length < 3 ||
    !diagnostic.h38_noise_samples.every(
      (sample) =>
        Number.isFinite(Number(sample)) &&
        Number(sample) >= -1 &&
        Number(sample) <= 1
    )
  ) {
    errors.push("h38 noise samples must be finite values in [-1,1]");
  }
  if (
    !fitValid(diagnostic?.source_coefficient_affine_fit, 1) ||
    !fitValid(diagnostic?.source_coefficient_quadratic_fit, 2) ||
    !Number.isFinite(
      Number(diagnostic?.affine_to_quadratic_residual_ratio)
    ) ||
    !Number.isFinite(Number(diagnostic?.signed_affine_intercept)) ||
    !Number.isFinite(Number(diagnostic?.signed_affine_slope)) ||
    Number(diagnostic.signed_affine_slope) === 0 ||
    !Number.isFinite(Number(diagnostic?.affine_zero_coordinate)) ||
    diagnostic?.affine_zero_inside_sample_domain !== true ||
    !Number.isInteger(diagnostic?.safety_search_iterations) ||
    diagnostic.safety_search_iterations < 1 ||
    !Number.isFinite(Number(diagnostic?.midpoint_linearity_gap_abs_upper)) ||
    !finitePositive(diagnostic?.affine_zero_source_coefficient_half_width) ||
    !finitePositive(diagnostic?.candidate_coefficient_margin_abs_upper) ||
    !finitePositive(diagnostic?.candidate_margin_pressure)
  ) {
    errors.push("signed affine target envelope must include finite signed fit and zero-margin data");
  }
  if (
    !replayValid(diagnostic?.affine_zero_replay) ||
    !replayValid(diagnostic?.center_sample_replay) ||
    !finitePositive(diagnostic?.max_sample_pressure) ||
    !finitePositive(diagnostic?.center_to_affine_zero_pressure_ratio) ||
    !finitePositive(diagnostic?.max_sample_to_affine_zero_pressure_ratio) ||
    Number(diagnostic.center_to_affine_zero_pressure_ratio) <= 1 ||
    Number(diagnostic.max_sample_to_affine_zero_pressure_ratio) <= 1
  ) {
    errors.push("signed affine target envelope must replay a pressure-reducing affine zero");
  }
  if (
    !Array.isArray(diagnostic?.pressure_reference_ladder) ||
    diagnostic.pressure_reference_ladder.length < 3 ||
    !diagnostic.pressure_reference_ladder.every(pressureEntryValid)
  ) {
    errors.push("pressure reference ladder must contain finite reference-only target envelopes");
  }
  if (
    !finitePositive(diagnostic?.max_interval_replay_over_target_pressure) ||
    !finitePositive(
      diagnostic?.max_interval_replay_center_eliminated_over_target_pressure
    ) ||
    !finitePositive(
      diagnostic?.max_nonzero_width_interval_replay_over_target_pressure
    ) ||
    !finitePositive(
      diagnostic?.max_amplification_corrected_interval_replay_over_target_pressure
    ) ||
    !finitePositive(
      diagnostic
        ?.max_amplification_corrected_center_eliminated_over_target_pressure
    ) ||
    !finitePositive(
      diagnostic
        ?.max_amplification_corrected_nonzero_width_interval_replay_over_target_pressure
    ) ||
    !finitePositive(diagnostic?.max_target_closing_safety_divisor) ||
    !finitePositive(diagnostic?.safety_divisor_over_observed_amplification) ||
    !Number.isFinite(Number(diagnostic?.max_target_closing_bracket_width)) ||
    !finitePositive(
      diagnostic?.max_safety_search_replay_over_target_pressure
    ) ||
    !finitePositive(
      diagnostic?.max_safety_search_center_eliminated_over_target_pressure
    ) ||
    !finitePositive(
      diagnostic?.max_required_producer_interval_hull_shrink_factor
    ) ||
    !finiteNonnegative(
      diagnostic?.max_required_producer_midpoint_hull_shrink_factor
    ) ||
    !finitePositive(
      diagnostic
        ?.max_producer_centered_reference_center_hull_over_target_pressure
    ) ||
    !finitePositive(
      diagnostic?.max_producer_centered_reference_replay_over_target_pressure
    ) ||
    (diagnostic?.max_producer_centered_reference_safety_divisor !== null &&
      !finitePositive(
        diagnostic?.max_producer_centered_reference_safety_divisor
      )) ||
    !Number.isInteger(diagnostic?.producer_centered_reference_target_count) ||
    diagnostic.producer_centered_reference_target_count < 1 ||
    !Number.isInteger(
      diagnostic?.producer_centered_reference_targets_met_at_center
    ) ||
    !Number.isInteger(
      diagnostic?.producer_centered_reference_targets_closed_by_search
    ) ||
    !Number.isInteger(
      diagnostic?.producer_centered_reference_positive_collar_count
    ) ||
    !Number.isInteger(
      diagnostic?.producer_centered_reference_interval_hull_covered_count
    ) ||
    (diagnostic
      ?.max_producer_centered_reference_collar_required_interval_hull_compression_factor !==
      null &&
      !finitePositive(
        diagnostic
          ?.max_producer_centered_reference_collar_required_interval_hull_compression_factor
      )) ||
    (diagnostic
      ?.max_producer_centered_reference_collar_linear_subcell_forecast !==
      null &&
      (!Number.isInteger(
        diagnostic
          ?.max_producer_centered_reference_collar_linear_subcell_forecast
      ) ||
        diagnostic
          .max_producer_centered_reference_collar_linear_subcell_forecast <=
          0)
    ) ||
    !Number.isInteger(
      diagnostic?.producer_centered_reference_numerator_graph_inside_count
    ) ||
    (diagnostic
      ?.max_producer_centered_reference_numerator_interval_compression_to_conservative_target !==
      null &&
      !finitePositive(
        diagnostic
          ?.max_producer_centered_reference_numerator_interval_compression_to_conservative_target
      )) ||
    (diagnostic
      ?.max_producer_centered_reference_numerator_midpoint_residual_over_conservative_target !==
      null &&
      !finiteNonnegative(
        diagnostic
          ?.max_producer_centered_reference_numerator_midpoint_residual_over_conservative_target
      )) ||
    (diagnostic
      ?.min_producer_centered_reference_numerator_midpoint_residual_headroom_factor !==
      null &&
      !finitePositive(
        diagnostic
          ?.min_producer_centered_reference_numerator_midpoint_residual_headroom_factor
      )
    ) ||
    !n38CollarEnclosureRouteValid(
      diagnostic?.h38_y44_n38_collar_enclosure_route
    ) ||
    ![
      "zero-centered-h38-interval-replay-meets-reference-pressure-ladder",
      "zero-centered-h38-interval-replay-has-stable-over-target-amplification",
    ].includes(diagnostic?.interval_replay_amplification_interpretation)
  ) {
    errors.push("interval replay amplification summary must be finite and classified");
  }
  if (
    ![
      "amplification-corrected-zero-centered-widths-meet-reference-pressure-ladder",
      "amplification-corrected-zero-centered-widths-still-exceed-reference-pressure-ladder",
    ].includes(diagnostic?.amplification_corrected_replay_interpretation)
  ) {
    errors.push("amplification-corrected replay summary must be classified");
  }
  if (
    ![
      "bisection-safety-divisor-finds-reference-meeting-widths",
      "bisection-safety-divisor-does-not-find-reference-meeting-widths",
    ].includes(diagnostic?.safety_search_interpretation)
  ) {
    errors.push("safety-search replay summary must be classified");
  }
  if (
    ![
      "center-eliminated-affine-row-removes-zero-centered-amplification",
      "center-eliminated-affine-row-still-exceeds-reference-pressure-ladder",
    ].includes(diagnostic?.center_eliminated_replay_interpretation)
  ) {
    errors.push("center-eliminated replay summary must be classified");
  }
  if (
    ![
      "h38-producer-coordinate-hull-fits-signed-affine-safety-envelope",
      "h38-producer-midpoint-hull-fits-but-interval-hull-exceeds-signed-affine-safety-envelope",
      "h38-producer-coordinate-hull-exceeds-signed-affine-safety-envelope",
    ].includes(diagnostic?.producer_coordinate_envelope_interpretation)
  ) {
    errors.push("producer coordinate envelope summary must be classified");
  }
  if (
    ![
      "producer-midpoint-hull-meets-reference-pressure-targets",
      "producer-centered-width-search-closes-some-reference-pressure-targets",
      "producer-midpoint-hull-exceeds-reference-pressure-targets",
    ].includes(diagnostic?.producer_centered_replay_interpretation)
  ) {
    errors.push("producer-centered replay summary must be classified");
  }
  if (
    ![
      "producer-centered-collars-cover-full-interval-hull",
      "positive-collars-found-but-raw-subcell-refinement-impractical",
      "positive-collars-found-for-producer-image-certificate-target",
      "producer-center-hull-closes-but-positive-collar-open",
    ].includes(diagnostic?.producer_centered_collar_interpretation)
  ) {
    errors.push("producer-centered collar summary must be classified");
  }
  if (
    ![
      "numerator-midpoint-graph-fits-producer-collar-target",
      "some-numerator-midpoint-graphs-fit-producer-collar-target",
      "numerator-midpoint-graph-does-not-yet-fit-producer-collar-target",
    ].includes(diagnostic?.producer_centered_numerator_collar_interpretation)
  ) {
    errors.push("producer-centered numerator collar summary must be classified");
  }
  if (
    ![
      "signed-affine-zero-localizes-the-y44-h38-obstruction",
      "signed-affine-zero-does-not-yet-localize-the-y44-h38-obstruction",
    ].includes(diagnostic?.target_envelope_interpretation)
  ) {
    errors.push("target envelope interpretation must identify whether the affine zero localizes the obstruction");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary
      ?.certifies_h38_y44_coefficient_dependence !== false ||
    diagnostic?.claim_boundary
      ?.certifies_h38_y44_signed_affine_envelope !== false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep signed affine envelope and shifted closure open");
  }
  return errors;
}

export function validateH39H38Y44N38TerminalEndpointBridgeDiagnostic(
  diagnostic
) {
  const errors = [];
  const hasFiniteInterval = (interval) =>
    Array.isArray(interval) &&
    interval.length === 2 &&
    Number.isFinite(Number(interval[0])) &&
    Number.isFinite(Number(interval[1]));
  const target = diagnostic?.controlling_y44_target ?? {};
  const bridge = diagnostic?.terminal_normal_form_bridge ?? {};
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_Y44_N38_TERMINAL_ENDPOINT_BRIDGE_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 h38 y44 n38 terminal endpoint bridge diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-h38-y44-n38-terminal-endpoint-bridge-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate n38 terminal endpoint bridge diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h39-h38-y44-n38-terminal-endpoint-bridge-diagnostic"
  ) {
    errors.push("evaluation level must identify candidate n38 terminal endpoint bridge");
  }
  if (
    !Number.isInteger(diagnostic?.source_stencil_subcell_count) ||
    diagnostic.source_stencil_subcell_count < 5 ||
    !Number.isInteger(diagnostic?.comparison_stencil_index) ||
    diagnostic.comparison_stencil_index < 0 ||
    diagnostic?.comparison_row_count !== 5 ||
    !Number.isInteger(diagnostic?.polynomial_degree) ||
    diagnostic.polynomial_degree < 1 ||
    diagnostic.polynomial_degree > 3
  ) {
    errors.push("terminal endpoint bridge parameters must describe one five-row y44 window");
  }
  if (
    !Number.isInteger(diagnostic?.shifted_index) ||
    diagnostic.shifted_index < 1 ||
    diagnostic?.y_order !==
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
        diagnostic.shifted_index ||
    diagnostic?.h38_numerator_y_order !== H38_NUMERATOR_Y_ORDER
  ) {
    errors.push("shifted index, y order, and h38 numerator y order must be consistent");
  }
  if (
    !Array.isArray(diagnostic?.terminal_provider_h_indexes) ||
    diagnostic.terminal_provider_h_indexes.length !== 3 ||
    diagnostic.terminal_provider_h_indexes[0] !== 37 ||
    diagnostic.terminal_provider_h_indexes[1] !== 36 ||
    diagnostic.terminal_provider_h_indexes[2] !== 35 ||
    !Number.isInteger(diagnostic?.residual_coordinate_partition_count) ||
    diagnostic.residual_coordinate_partition_count < 1 ||
    !finitePositive(diagnostic?.residual_budget_target_share_of_all) ||
    diagnostic.residual_budget_target_share_of_all >= 1
  ) {
    errors.push("terminal endpoint bridge must use the terminal h37,h36,h35 zeta provider setup");
  }
  if (
    !Array.isArray(diagnostic?.residual_budget_scales) ||
    diagnostic.residual_budget_scales.length < 2 ||
    diagnostic.residual_budget_scales[0] !== 0 ||
    diagnostic.residual_budget_scales[
      diagnostic.residual_budget_scales.length - 1
    ] !== 1 ||
    !Array.isArray(diagnostic?.residual_noise_samples) ||
    diagnostic.residual_noise_samples.length < 3 ||
    diagnostic.residual_noise_samples[0] !== -1 ||
    diagnostic.residual_noise_samples[
      diagnostic.residual_noise_samples.length - 1
    ] !== 1
  ) {
    errors.push("residual scales and noise samples must retain endpoint coverage");
  }
  if (
    ![
      "n38-quadratic-midpoint-residual-has-directed-rounded-collar-headroom",
      "s37-lower-bound-dependency-collapse-controls-n38-collar-route",
      "n38-quadratic-midpoint-residual-has-partial-collar-headroom",
      "n38-quadratic-midpoint-residual-collar-route-open",
    ].includes(diagnostic?.y44_route_diagnosis) ||
    ![
      "midpoint-slope-collar-fits-but-conservative-s37-lower-bound-collapses",
      "midpoint-slope-collar-also-fails-n38-graph-residual",
      "conservative-s37-lower-bound-supports-n38-collar",
      "s37-dependency-status-open",
    ].includes(diagnostic?.y44_s37_dependency_status)
  ) {
    errors.push("terminal endpoint bridge must carry the live y44 route diagnosis");
  }
  if (
    typeof target.reference_label !== "string" ||
    typeof target.cell_id !== "string" ||
    Number.isFinite(Number(target.xi_midpoint)) !== true ||
    !finitePositive(target.conservative_numerator_width_target) ||
    (target.midpoint_slope_numerator_width_target !== null &&
      !finitePositive(target.midpoint_slope_numerator_width_target)) ||
    !finiteNonnegative(target.numerator_abs_midpoint_residual) ||
    !finiteNonnegative(
      target.numerator_midpoint_residual_over_conservative_target
    ) ||
    typeof target.proof_route_interpretation !== "string"
  ) {
    errors.push("controlling y44 target must expose finite numerator collar data");
  }
  if (
    typeof bridge.cell_id !== "string" ||
    !hasFiniteInterval(bridge.speed_interval) ||
    !hasFiniteInterval(bridge.xi_interval) ||
    !Number.isFinite(Number(bridge.xi_midpoint)) ||
    !finitePositive(bridge.all_active_n38_source_width) ||
    !finitePositive(bridge.terminal_graph_with_nonterminal_source_width) ||
    !finitePositive(
      bridge.terminal_graph_raw_interval_residual_source_width
    ) ||
    !finitePositive(bridge.terminal_graph_endpoint_hull_width) ||
    !finitePositive(bridge.terminal_graph_affine_zeta_envelope_width) ||
    !finitePositive(
      bridge.h39_required_width_share_of_all_active_n38_source
    ) ||
    !finitePositive(
      bridge.affine_zeta_envelope_width_share_of_all_active_n38_source
    ) ||
    !finitePositive(
      bridge.terminal_graph_width_to_conservative_h39_target
    ) ||
    !finitePositive(
      bridge.affine_zeta_envelope_width_to_conservative_h39_target
    ) ||
    !finitePositive(
      bridge.raw_interval_residual_width_to_conservative_h39_target
    ) ||
    (bridge.affine_zeta_envelope_width_to_midpoint_slope_h39_target !==
      null &&
      !finitePositive(
        bridge.affine_zeta_envelope_width_to_midpoint_slope_h39_target
      )) ||
    typeof bridge.terminal_graph_fits_live_h39_target !== "boolean" ||
    typeof bridge.affine_zeta_envelope_fits_live_h39_target !== "boolean" ||
    bridge.endpoint_control_candidate !== true ||
    bridge.affine_in_shared_residual_coordinate !== true ||
    bridge.endpoint_partition_count !==
      diagnostic.residual_coordinate_partition_count ||
    typeof bridge.all_endpoint_partition_hulls_under_internal_budget !==
      "boolean" ||
    typeof bridge.all_affine_zeta_envelopes_under_internal_budget !==
      "boolean" ||
    ![
      "shared-terminal-residual-coordinate-affine-endpoint-partitions-under-target",
      "shared-terminal-residual-coordinate-endpoint-partitions-under-target",
      "shared-terminal-residual-coordinate-endpoint-partitions-over-target",
    ].includes(bridge.endpoint_partition_route_interpretation)
  ) {
    errors.push("terminal normal-form bridge must expose finite endpoint and live-target ratios");
  }
  if (
    ![
      "terminal-graph-affine-endpoint-provider-fits-live-h39-collar-candidate",
      "terminal-graph-normal-form-fits-live-h39-collar-but-zeta-envelope-too-wide",
      "terminal-graph-normal-form-still-exceeds-live-h39-collar",
    ].includes(diagnostic?.n38_terminal_endpoint_bridge_diagnosis)
  ) {
    errors.push("terminal endpoint bridge diagnosis must classify live target fit");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_h38_n38_graph_enclosure !== false ||
    diagnostic?.claim_boundary
      ?.certifies_terminal_row_provider_enclosure !== false ||
    diagnostic?.claim_boundary
      ?.certifies_n38_terminal_endpoint_bridge !== false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep terminal endpoint bridge and shifted closure open");
  }
  return errors;
}

export function validateH39CorrelatedResidualWidthDiagnostic(diagnostic) {
  const errors = [];
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_CORRELATED_RESIDUAL_WIDTH_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 correlated residual width diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-correlated-residual-width-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate correlated residual width diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-correlated-residual-width-diagnostic"
  ) {
    errors.push("evaluation level must identify candidate correlated residual width");
  }
  if (
    !Number.isInteger(diagnostic?.polynomial_degree) ||
    diagnostic.polynomial_degree < 1 ||
    diagnostic.polynomial_degree > 3
  ) {
    errors.push("polynomial degree must be an integer from 1 through 3");
  }
  if (
    !Number.isInteger(diagnostic?.polynomial_source_subcell_count) ||
    diagnostic.polynomial_source_subcell_count <
      diagnostic.polynomial_degree + 1
  ) {
    errors.push("polynomial source subcell count must cover the fit degree");
  }
  if (
    !Number.isInteger(diagnostic?.residual_source_subcell_count) ||
    diagnostic.residual_source_subcell_count <
      diagnostic.polynomial_source_subcell_count
  ) {
    errors.push("residual source subcell count must cover the polynomial source count");
  }
  if (
    !Number.isInteger(diagnostic?.shifted_index) ||
    diagnostic.shifted_index < 1 ||
    diagnostic?.y_order !==
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
        diagnostic.shifted_index
  ) {
    errors.push("shifted index and y order must be consistent");
  }
  if (
    !Array.isArray(diagnostic?.noise_samples) ||
    diagnostic.noise_samples.length === 0 ||
    !Array.isArray(diagnostic?.residual_noise_samples) ||
    diagnostic.residual_noise_samples.length === 0
  ) {
    errors.push("noise sample sets must be nonempty");
  }
  if (
    !Array.isArray(diagnostic?.correlated_residual_sample_replays) ||
    diagnostic.correlated_residual_sample_replays.length !==
      diagnostic.noise_samples.length *
        diagnostic.residual_noise_samples.length ||
    !diagnostic.correlated_residual_sample_replays.every((replay) =>
      finitePositive(replay.pressure)
    )
  ) {
    errors.push("correlated residual sample replays must be positive and complete");
  }
  if (
    !Array.isArray(diagnostic?.residual_width_suffix_diagnostics) ||
    diagnostic.residual_width_suffix_diagnostics.length === 0 ||
    !diagnostic.residual_width_suffix_diagnostics.every(
      (suffix) =>
        Number.isInteger(suffix.residual_start_index) &&
        finitePositive(suffix.max_suffix_pressure) &&
        finitePositive(suffix.suffix_to_full_correlated_pressure_ratio) &&
        Array.isArray(suffix.suffix_replays) &&
        suffix.suffix_replays.length ===
          diagnostic.noise_samples.length *
            diagnostic.residual_noise_samples.length
    )
  ) {
    errors.push("residual width suffix diagnostics must be positive and complete");
  }
  if (
    !finitePositive(diagnostic?.baseline_independent_interval_pressure) ||
    !finitePositive(diagnostic?.baseline_h_row_midpoint_pressure) ||
    !finitePositive(diagnostic?.midpoint_residual_pressure) ||
    !finitePositive(diagnostic?.interval_residual_pressure) ||
    !finitePositive(diagnostic?.max_correlated_residual_sample_pressure) ||
    !finitePositive(diagnostic?.interval_to_correlated_residual_pressure_ratio) ||
    !finitePositive(
      diagnostic?.correlated_to_midpoint_residual_sample_pressure_ratio
    ) ||
    !finitePositive(
      diagnostic?.estimated_full_width_noise_scale_for_midpoint_pressure
    )
  ) {
    errors.push("baseline, midpoint, interval, and correlated pressure summaries must be positive");
  }
  if (
    !diagnostic?.worst_residual_profile ||
    !Number.isInteger(diagnostic.worst_residual_profile.h_index) ||
    !finitePositive(diagnostic.worst_residual_profile.max_abs_residual)
  ) {
    errors.push("worst residual profile must identify a positive h-row residual");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_correlated_residual_width_enclosure !==
      false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep correlated residual, h38, shifted source, primitive, and retention closure open");
  }
  return errors;
}

export function validateH39H38SolveWidthFactorizationDiagnostic(diagnostic) {
  const errors = [];
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_SOLVE_WIDTH_FACTORIZATION_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 h38 solve-width factorization diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-h38-solve-width-factorization-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate h38 solve-width diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h38-solve-width-factorization-diagnostic"
  ) {
    errors.push("evaluation level must identify candidate h38 solve-width factorization");
  }
  if (
    !Number.isInteger(diagnostic?.polynomial_degree) ||
    diagnostic.polynomial_degree < 1 ||
    diagnostic.polynomial_degree > 3
  ) {
    errors.push("polynomial degree must be an integer from 1 through 3");
  }
  if (
    !Number.isInteger(diagnostic?.polynomial_source_subcell_count) ||
    diagnostic.polynomial_source_subcell_count <
      diagnostic.polynomial_degree + 1
  ) {
    errors.push("polynomial source subcell count must cover the fit degree");
  }
  if (
    !Number.isInteger(diagnostic?.residual_source_subcell_count) ||
    diagnostic.residual_source_subcell_count <
      diagnostic.polynomial_source_subcell_count
  ) {
    errors.push("residual source subcell count must cover the polynomial source count");
  }
  if (
    !Number.isInteger(diagnostic?.shifted_index) ||
    diagnostic.shifted_index < 1 ||
    diagnostic?.y_order !==
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
        diagnostic.shifted_index
  ) {
    errors.push("shifted index and y order must be consistent");
  }
  if (
    !diagnostic?.solve_width_profile ||
    diagnostic.solve_width_profile.h_index !== 38 ||
    !Array.isArray(diagnostic.solve_width_profile.samples) ||
    diagnostic.solve_width_profile.samples.length !==
      diagnostic.residual_source_subcell_count ||
    !diagnostic.solve_width_profile.samples.every(
      (sample) =>
        Array.isArray(sample.h38_solve_numerator_interval) &&
        Array.isArray(sample.h38_solve_slope_interval) &&
        Array.isArray(sample.h38_independent_ratio_interval) &&
        Array.isArray(sample.h38_slope_midpoint_ratio_interval) &&
        Array.isArray(sample.h38_numerator_midpoint_ratio_interval) &&
        Array.isArray(sample.h38_both_midpoint_ratio_point)
    )
  ) {
    errors.push("solve-width profile must expose h38 numerator, slope, quotient, and midpoint splits");
  }
  if (
    !finitePositive(
      diagnostic?.solve_width_profile?.max_solve_widths?.reconstructed_full_solve
    ) ||
    !finitePositive(
      diagnostic?.solve_width_profile?.max_solve_widths?.numerator_only
    ) ||
    !finitePositive(
      diagnostic?.solve_width_profile?.max_solve_widths?.slope_only
    ) ||
    !finitePositive(
      diagnostic?.solve_width_profile?.numerator_only_to_full_solve_width_ratio
    ) ||
    !finitePositive(
      diagnostic?.solve_width_profile?.slope_only_to_full_solve_width_ratio
    )
  ) {
    errors.push("solve-width profile must report positive width ratios");
  }
  if (
    !Array.isArray(diagnostic?.h38_numerator_polynomial_degree_diagnostics) ||
    diagnostic.h38_numerator_polynomial_degree_diagnostics.length !== 3 ||
    !diagnostic.h38_numerator_polynomial_degree_diagnostics.every(
      (entry) =>
        [1, 2, 3].includes(entry.polynomial_degree) &&
        Array.isArray(entry.coefficients) &&
        entry.coefficients.length === entry.polynomial_degree + 1 &&
        Array.isArray(entry.residuals) &&
        entry.residuals.length === diagnostic.residual_source_subcell_count &&
        finitePositive(entry.max_midpoint_residual) &&
        finitePositive(entry.max_numerator_interval_width) &&
        finitePositive(entry.midpoint_residual_to_numerator_width_ratio)
    ) ||
    diagnostic?.h38_numerator_polynomial_diagnostic?.polynomial_degree !==
      diagnostic?.polynomial_degree ||
    !finitePositive(
      diagnostic?.h38_numerator_midpoint_residual_to_interval_width_ratio
    )
  ) {
    errors.push("h38 numerator polynomial diagnostics must compare midpoint residuals with interval width");
  }
  if (
    !Array.isArray(diagnostic?.h38_residual_variant_replays) ||
    diagnostic.h38_residual_variant_replays.length !== 4 ||
    !diagnostic.h38_residual_variant_replays.every(
      (variant) =>
        typeof variant.variant === "string" &&
        Array.isArray(variant.sample_replays) &&
        variant.sample_replays.length ===
          diagnostic.noise_samples.length *
            diagnostic.h38_noise_samples.length &&
        finitePositive(variant.max_pressure)
    )
  ) {
    errors.push("h38 residual variant replays must cover the four solve-width variants");
  }
  if (
    !finitePositive(diagnostic?.baseline_independent_interval_pressure) ||
    !finitePositive(diagnostic?.baseline_h_row_midpoint_pressure) ||
    !finitePositive(diagnostic?.midpoint_residual_pressure) ||
    !finitePositive(diagnostic?.interval_residual_pressure) ||
    !finitePositive(diagnostic?.max_full_solve_h38_residual_pressure) ||
    !finitePositive(diagnostic?.max_numerator_only_h38_residual_pressure) ||
    !finitePositive(diagnostic?.max_slope_only_h38_residual_pressure) ||
    !finitePositive(diagnostic?.max_midpoint_solve_h38_residual_pressure) ||
    !finitePositive(
      diagnostic?.numerator_only_to_full_solve_h38_pressure_ratio
    ) ||
    !finitePositive(diagnostic?.slope_only_to_full_solve_h38_pressure_ratio) ||
    !finitePositive(diagnostic?.full_solve_to_midpoint_solve_h38_pressure_ratio)
  ) {
    errors.push("h38 solve-width replay pressure summaries must be positive");
  }
  if (
    ![
      "h38-recurrence-numerator-width",
      "inherited-solve-slope-width",
      "mixed-numerator-slope-width",
    ].includes(diagnostic?.dominant_h38_solve_width_source) ||
    ![
      "h38-recurrence-numerator-width",
      "inherited-solve-slope-width",
      "mixed-or-hull-center-variation",
    ].includes(diagnostic?.dominant_h38_replay_source)
  ) {
    errors.push("dominant h38 solve-width source must be classified");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_h38_solve_width_factorization !==
      false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep h38 solve-width, shifted source, primitive, and retention closure open");
  }
  return errors;
}

export function validateH39H38NumeratorGraphSolveDiagnostic(diagnostic) {
  const errors = [];
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_NUMERATOR_GRAPH_SOLVE_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 h38 numerator graph solve diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-h38-numerator-graph-solve-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate h38 numerator graph diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h38-numerator-graph-solve-diagnostic"
  ) {
    errors.push("evaluation level must identify candidate h38 numerator graph solve");
  }
  if (
    !Number.isInteger(diagnostic?.polynomial_degree) ||
    diagnostic.polynomial_degree < 1 ||
    diagnostic.polynomial_degree > 3
  ) {
    errors.push("polynomial degree must be an integer from 1 through 3");
  }
  if (
    !Number.isInteger(diagnostic?.polynomial_source_subcell_count) ||
    diagnostic.polynomial_source_subcell_count <
      diagnostic.polynomial_degree + 1
  ) {
    errors.push("polynomial source subcell count must cover the fit degree");
  }
  if (
    !Number.isInteger(diagnostic?.residual_source_subcell_count) ||
    diagnostic.residual_source_subcell_count <
      diagnostic.polynomial_source_subcell_count
  ) {
    errors.push("residual source subcell count must cover the polynomial source count");
  }
  if (
    !Number.isInteger(diagnostic?.shifted_index) ||
    diagnostic.shifted_index < 1 ||
    diagnostic?.y_order !==
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
        diagnostic.shifted_index
  ) {
    errors.push("shifted index and y order must be consistent");
  }
  if (
    !Array.isArray(diagnostic?.h38_numerator_polynomial_degree_diagnostics) ||
    diagnostic.h38_numerator_polynomial_degree_diagnostics.length !== 3 ||
    diagnostic?.h38_numerator_polynomial_diagnostic?.polynomial_degree !==
      diagnostic?.polynomial_degree
  ) {
    errors.push("numerator polynomial diagnostics must cover degree one through three");
  }
  const residualProfile = diagnostic?.h38_numerator_graph_residual_profile;
  if (
    !residualProfile ||
    residualProfile.sample_count !== diagnostic.residual_source_subcell_count ||
    !Array.isArray(residualProfile.samples) ||
    residualProfile.samples.length !== diagnostic.residual_source_subcell_count ||
    !finitePositive(residualProfile.max_midpoint_residual) ||
    !finitePositive(residualProfile.max_numerator_interval_width) ||
    !finitePositive(residualProfile.max_graph_interval_width) ||
    !finitePositive(residualProfile.midpoint_residual_to_numerator_width_ratio) ||
    !finitePositive(
      residualProfile.midpoint_residual_hull_to_numerator_width_ratio
    ) ||
    !finitePositive(
      residualProfile.interval_residual_hull_to_numerator_width_ratio
    ) ||
    !finitePositive(residualProfile.graph_interval_to_numerator_width_ratio) ||
    !finitePositive(residualProfile.interval_residual_width)
  ) {
    errors.push("numerator graph residual profile must compare graph and residual widths");
  }
  if (
    !Array.isArray(diagnostic?.numerator_graph_variant_replays) ||
    diagnostic.numerator_graph_variant_replays.length !== 5 ||
    !diagnostic.numerator_graph_variant_replays.every(
      (variant) =>
        typeof variant.variant === "string" &&
        Array.isArray(variant.sample_replays) &&
        variant.sample_replays.length ===
          diagnostic.noise_samples.length *
            diagnostic.numerator_noise_samples.length &&
        finitePositive(variant.max_pressure) &&
        Number.isFinite(Number(variant.max_h38_width)) &&
        Number(variant.max_h38_width) >= 0
    )
  ) {
    errors.push("numerator graph variant replays must cover graph, slope, correlated residual, and interval hull variants");
  }
  if (
    !finitePositive(diagnostic?.baseline_independent_interval_pressure) ||
    !finitePositive(diagnostic?.baseline_h_row_midpoint_pressure) ||
    !finitePositive(diagnostic?.midpoint_residual_pressure) ||
    !finitePositive(diagnostic?.h38_only_full_solve_pressure) ||
    !finitePositive(diagnostic?.max_numerator_graph_only_pressure) ||
    !finitePositive(
      diagnostic?.max_numerator_graph_only_slope_interval_pressure
    ) ||
    !finitePositive(
      diagnostic?.max_numerator_graph_midpoint_residual_pressure
    ) ||
    !finitePositive(
      diagnostic
        ?.max_numerator_graph_midpoint_residual_slope_interval_pressure
    ) ||
    !finitePositive(
      diagnostic?.max_numerator_graph_interval_residual_pressure
    ) ||
    !finitePositive(diagnostic?.graph_solve_to_full_solve_h39_pressure_ratio) ||
    !finitePositive(
      diagnostic?.graph_plus_residual_hull_to_full_solve_h39_pressure_ratio
    ) ||
    !finitePositive(
      diagnostic?.correlated_residual_to_full_solve_h39_pressure_ratio
    ) ||
    !finitePositive(
      diagnostic
        ?.graph_plus_residual_hull_to_correlated_residual_pressure_ratio
    ) ||
    !finitePositive(
      diagnostic?.graph_full_slope_to_graph_slope_midpoint_pressure_ratio
    ) ||
    !finitePositive(diagnostic?.graph_full_slope_to_full_solve_width_ratio)
  ) {
    errors.push("numerator graph replay pressure and width summaries must be positive");
  }
  if (
    ![
      "numerator-interval-hull-artifact",
      "numerator-interval-route-promising",
      "mixed-numerator-graph-route",
    ].includes(diagnostic?.numerator_graph_diagnosis)
  ) {
    errors.push("numerator graph diagnosis must be classified");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_h38_numerator_graph_enclosure !==
      false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep h38 numerator graph, shifted source, primitive, and retention closure open");
  }
  return errors;
}

export function validateH39H38NumeratorGraphResidualBudgetDiagnostic(
  diagnostic
) {
  const errors = [];
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_NUMERATOR_GRAPH_RESIDUAL_BUDGET_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 h38 numerator graph residual budget diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-h38-numerator-graph-residual-budget-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate h38 numerator graph residual budget diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h38-numerator-graph-residual-budget-diagnostic"
  ) {
    errors.push("evaluation level must identify candidate h38 numerator graph residual budget");
  }
  if (
    !Number.isInteger(diagnostic?.polynomial_degree) ||
    diagnostic.polynomial_degree < 1 ||
    diagnostic.polynomial_degree > 3
  ) {
    errors.push("polynomial degree must be an integer from 1 through 3");
  }
  if (
    !Array.isArray(diagnostic?.subcell_counts) ||
    diagnostic.subcell_counts.length < 2 ||
    !diagnostic.subcell_counts.every(
      (count) =>
        Number.isInteger(count) &&
        count >= diagnostic.polynomial_degree + 1
    )
  ) {
    errors.push("subcell counts must contain at least two valid polynomial covers");
  }
  if (
    !Number.isInteger(diagnostic?.shifted_index) ||
    diagnostic.shifted_index < 1 ||
    diagnostic?.y_order !==
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
        diagnostic.shifted_index
  ) {
    errors.push("shifted index and y order must be consistent");
  }
  if (
    !Array.isArray(diagnostic?.residual_budget_summaries) ||
    diagnostic.residual_budget_summaries.length !==
      diagnostic.subcell_counts.length ||
    !diagnostic.residual_budget_summaries.every(
      (summary, index) =>
        summary.residual_subcell_count === diagnostic.subcell_counts[index] &&
        finitePositive(summary.graph_pressure) &&
        finitePositive(summary.graph_slope_interval_pressure) &&
        finitePositive(summary.midpoint_residual_pressure) &&
        finitePositive(summary.raw_interval_residual_pressure) &&
        finitePositive(summary.h_row_midpoint_target_pressure) &&
        finitePositive(summary.raw_numerator_interval_residual_width) &&
        finitePositive(summary.midpoint_numerator_residual_width) &&
        finitePositive(
          summary.allowed_numerator_residual_fraction_for_h_row_midpoint_scale
        ) &&
        finitePositive(
          summary.allowed_numerator_residual_width_for_h_row_midpoint_scale
        ) &&
        finitePositive(
          summary.required_residual_shrink_factor_for_h_row_midpoint_scale
        ) &&
        finitePositive(
          summary.midpoint_residual_width_to_allowed_budget_ratio
        ) &&
        finitePositive(
          summary.raw_interval_residual_width_to_numerator_width_ratio
        ) &&
        finitePositive(summary.midpoint_residual_width_to_numerator_width_ratio)
    )
  ) {
    errors.push("residual budget summaries must report positive pressure, width, and budget ratios");
  }
  if (
    !diagnostic?.interval_pressure_scaling_summary ||
    !finitePositive(
      diagnostic.interval_pressure_scaling_summary
        .observed_pressure_scaling_exponent
    ) ||
    !diagnostic?.residual_width_scaling_summary ||
    !finitePositive(
      diagnostic.residual_width_scaling_summary
        .observed_pressure_scaling_exponent
    )
  ) {
    errors.push("residual budget diagnostic must report pressure and width scaling summaries");
  }
  if (
    !finitePositive(
      diagnostic?.max_required_residual_shrink_factor_for_h_row_midpoint_scale
    ) ||
    !finitePositive(
      diagnostic?.max_midpoint_residual_width_to_allowed_budget_ratio
    )
  ) {
    errors.push("residual budget maxima must be positive");
  }
  if (
    ![
      "n38-taylor-remainder-budget-route",
      "n38-residual-budget-mixed",
    ].includes(diagnostic?.numerator_residual_budget_diagnosis)
  ) {
    errors.push("numerator residual budget diagnosis must be classified");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_h38_numerator_graph_enclosure !==
      false ||
    diagnostic?.claim_boundary?.certifies_n38_taylor_remainder_bound !==
      false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep n38 Taylor, shifted source, primitive, and retention closure open");
  }
  return errors;
}

export function validateH39H38NumeratorGraphLocalPartitionDiagnostic(
  diagnostic
) {
  const errors = [];
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_NUMERATOR_GRAPH_LOCAL_PARTITION_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 h38 numerator graph local partition diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-h38-numerator-graph-local-partition-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate h38 numerator graph local partition diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h38-numerator-graph-local-partition-diagnostic"
  ) {
    errors.push("evaluation level must identify candidate h38 numerator graph local partition");
  }
  if (
    !Number.isInteger(diagnostic?.polynomial_degree) ||
    diagnostic.polynomial_degree < 1 ||
    diagnostic.polynomial_degree > 3
  ) {
    errors.push("polynomial degree must be an integer from 1 through 3");
  }
  if (
    !Number.isInteger(diagnostic?.fine_subcell_count) ||
    diagnostic.fine_subcell_count < diagnostic.polynomial_degree + 1 ||
    !Array.isArray(diagnostic?.partition_counts) ||
    diagnostic.partition_counts.length === 0 ||
    !diagnostic.partition_counts.every(
      (count) =>
        Number.isInteger(count) &&
        diagnostic.fine_subcell_count % count === 0 &&
        diagnostic.fine_subcell_count / count >=
          diagnostic.polynomial_degree + 1
    )
  ) {
    errors.push("fine subcell and partition counts must leave enough local rows");
  }
  if (
    !Number.isInteger(diagnostic?.shifted_index) ||
    diagnostic.shifted_index < 1 ||
    diagnostic?.y_order !==
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
        diagnostic.shifted_index
  ) {
    errors.push("shifted index and y order must be consistent");
  }
  if (
    !Array.isArray(diagnostic?.partition_summaries) ||
    diagnostic.partition_summaries.length !==
      diagnostic.partition_counts.length ||
    !diagnostic.partition_summaries.every(
      (summary, index) =>
        summary.partition_count === diagnostic.partition_counts[index] &&
        Array.isArray(summary.partitions) &&
        summary.partitions.length === summary.partition_count &&
        finitePositive(summary.max_graph_pressure) &&
        finitePositive(summary.max_midpoint_residual_pressure) &&
        finitePositive(summary.max_interval_residual_pressure) &&
        finitePositive(summary.interval_to_midpoint_pressure_ratio) &&
        summary.partitions.every(
          (partition) =>
            Number.isInteger(partition.partition_index) &&
            partition.partition_count === summary.partition_count &&
            partition.row_count >= diagnostic.polynomial_degree + 1 &&
            Array.isArray(partition.xi_interval) &&
            Array.isArray(partition.numerator_graph_variant_replays) &&
            partition.numerator_graph_variant_replays.length === 3 &&
            finitePositive(partition.max_graph_pressure) &&
            finitePositive(partition.max_midpoint_residual_pressure) &&
            finitePositive(partition.max_interval_residual_pressure) &&
            finitePositive(partition.interval_to_midpoint_pressure_ratio) &&
            finitePositive(partition.midpoint_residual_width_to_numerator_width_ratio) &&
            finitePositive(partition.interval_residual_width_to_numerator_width_ratio)
        )
    )
  ) {
    errors.push("partition summaries must report positive local graph, midpoint, and interval pressures");
  }
  if (
    !diagnostic?.best_midpoint_partition_summary ||
    !diagnostic?.best_interval_partition_summary ||
    !finitePositive(diagnostic?.best_midpoint_to_h_row_midpoint_pressure_ratio) ||
    !finitePositive(diagnostic?.best_interval_to_best_midpoint_pressure_ratio)
  ) {
    errors.push("best partition summaries and ratios must be positive");
  }
  if (
    ![
      "local-n38-midpoint-good-raw-hull-artifact",
      "local-n38-partition-mixed",
    ].includes(diagnostic?.local_partition_diagnosis)
  ) {
    errors.push("local partition diagnosis must be classified");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_h38_numerator_graph_enclosure !==
      false ||
    diagnostic?.claim_boundary?.certifies_n38_taylor_remainder_bound !==
      false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep local N38 graph, Taylor, shifted source, primitive, and retention closure open");
  }
  return errors;
}

export function validateH39H38ExpressionN38DecompositionDiagnostic(diagnostic) {
  const errors = [];
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_DECOMPOSITION_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 h38 expression N38 decomposition diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-h38-expression-n38-decomposition-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate expression-level N38 diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h38-expression-n38-decomposition-diagnostic"
  ) {
    errors.push("evaluation level must identify expression-level N38 decomposition");
  }
  if (diagnostic?.h38_numerator_y_order !== H38_NUMERATOR_Y_ORDER) {
    errors.push("H38 numerator y order must match the predecessor source coefficient");
  }
  if (
    !Array.isArray(diagnostic?.subcell_counts) ||
    diagnostic.subcell_counts.length < 2 ||
    !diagnostic.subcell_counts.every((count) => Number.isInteger(count) && count > 0)
  ) {
    errors.push("subcell counts must contain at least two positive integers");
  }
  if (
    !Array.isArray(diagnostic?.subcell_summaries) ||
    diagnostic.subcell_summaries.length !== diagnostic?.subcell_counts?.length ||
    !diagnostic.subcell_summaries.every(
      (summary, index) =>
        summary.residual_subcell_count === diagnostic.subcell_counts[index] &&
        summary.row_count === summary.residual_subcell_count &&
        summary.all_direct_recomputations_match_exported_residual === true &&
        finitePositive(summary.max_direct_n38_expression_width) &&
        finitePositive(summary.max_direct_n38_expression_abs_upper) &&
        Number.isFinite(Number(summary.max_direct_export_relative_gap)) &&
        finitePositive(summary.max_midpoint_expression_term_width) &&
        finitePositive(summary.direct_width_to_midpoint_term_width_ratio) &&
        typeof summary.dominant_expression_term_by_width === "string" &&
        finitePositive(summary.dominant_expression_term_width) &&
        Array.isArray(summary.row_diagnostics) &&
        summary.row_diagnostics.length === summary.row_count &&
        summary.row_diagnostics.every(
          (row) =>
            row.source_y_order === H38_NUMERATOR_Y_ORDER &&
            row.direct_matches_exported_residual === true &&
            Array.isArray(row.expression_terms) &&
            row.expression_terms.length === 4 &&
            finitePositive(row.direct_n38_expression_width) &&
            finitePositive(row.term_width_sum) &&
            finitePositive(row.max_midpoint_expression_term_width) &&
            finitePositive(row.source_width_to_midpoint_term_width_sum_ratio)
        )
    )
  ) {
    errors.push("subcell summaries must recompute N38 expression rows and match exported residuals");
  }
  if (
    !diagnostic?.n38_expression_width_scaling_summary ||
    !finitePositive(
      diagnostic.n38_expression_width_scaling_summary
        .observed_pressure_scaling_exponent
    )
  ) {
    errors.push("N38 expression diagnostic must report width scaling");
  }
  if (
    ![
      "expression-level-n38-export-confirmed-row-hull-artifact",
      "expression-level-n38-mixed",
    ].includes(diagnostic?.n38_expression_diagnosis)
  ) {
    errors.push("expression-level N38 diagnosis must be classified");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_expression_level_n38_provider !== false ||
    diagnostic?.claim_boundary?.certifies_n38_taylor_remainder_bound !== false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep expression-level N38 provider and closure claims open");
  }
  return errors;
}

export function validateH39H38ExpressionN38TaylorBudgetDiagnostic(diagnostic) {
  const errors = [];
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TAYLOR_BUDGET_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 h38 expression N38 Taylor budget diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-h38-expression-n38-taylor-budget-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate expression-level N38 Taylor budget diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h38-expression-n38-local-taylor-budget"
  ) {
    errors.push("evaluation level must identify expression-level N38 local Taylor budget");
  }
  if (diagnostic?.h38_numerator_y_order !== H38_NUMERATOR_Y_ORDER) {
    errors.push("H38 numerator y order must match the predecessor source coefficient");
  }
  if (
    !Array.isArray(diagnostic?.subcell_counts) ||
    diagnostic.subcell_counts.length < 2 ||
    !diagnostic.subcell_counts.every((count) => Number.isInteger(count) && count > 0)
  ) {
    errors.push("subcell counts must contain at least two positive integers");
  }
  if (
    !Number.isInteger(diagnostic?.fit_subcell_count) ||
    diagnostic.fit_subcell_count <= 0 ||
    !diagnostic?.subcell_counts?.includes(diagnostic.fit_subcell_count)
  ) {
    errors.push("fit subcell count must be a positive included subcell count");
  }
  if (
    !Array.isArray(diagnostic?.polynomial_degrees) ||
    diagnostic.polynomial_degrees.length === 0 ||
    !diagnostic.polynomial_degrees.every(
      (degree) => Number.isInteger(degree) && degree > 0 && degree <= 3
    )
  ) {
    errors.push("polynomial degrees must be positive integers through degree 3");
  }
  if (
    diagnostic?.source_expression_decomposition?.status !==
      "h39-h38-expression-n38-decomposition-diagnostic-candidate-emitted" ||
    ![
      "expression-level-n38-export-confirmed-row-hull-artifact",
      "expression-level-n38-mixed",
    ].includes(
      diagnostic?.source_expression_decomposition?.n38_expression_diagnosis
    ) ||
    !finitePositive(
      diagnostic?.source_expression_decomposition?.width_scaling_summary
        ?.observed_pressure_scaling_exponent
    )
  ) {
    errors.push("source expression decomposition summary must be present and classified");
  }
  const budget = diagnostic?.local_taylor_budget;
  if (
    !budget ||
    !finitePositive(budget.baseline_raw_expression_width) ||
    !finitePositive(budget.point_term_width_scale) ||
    !finitePositive(
      budget.required_width_shrink_factor_to_point_term_scale
    ) ||
    !finitePositive(budget.observed_raw_width_scaling_exponent) ||
    !finitePositive(
      budget.estimated_uniform_subcell_count_for_point_term_scale
    ) ||
    !Array.isArray(budget.baseline_term_width_shares) ||
    budget.baseline_term_width_shares.length !== 4 ||
    !finitePositive(budget.sine_term_width_share)
  ) {
    errors.push("local Taylor budget must report raw width, point scale, subcover estimate, and term shares");
  }
  if (
    !Array.isArray(diagnostic?.fit_samples) ||
    diagnostic.fit_samples.length !== diagnostic?.fit_subcell_count ||
    !diagnostic.fit_samples.every(
      (sample) =>
        Number.isFinite(Number(sample.xi_midpoint)) &&
        Number.isFinite(Number(sample.midpoint_n38_expression_midpoint)) &&
        Number.isFinite(Number(sample.midpoint_n38_expression_width)) &&
        sample.term_midpoints &&
        typeof sample.term_midpoints === "object"
    )
  ) {
    errors.push("fit samples must expose midpoint N38 expression values and term midpoints");
  }
  if (
    !Array.isArray(diagnostic?.component_taylor_fit_diagnostics) ||
    diagnostic.component_taylor_fit_diagnostics.length < 5 ||
    !diagnostic.component_taylor_fit_diagnostics.every(
      (component) =>
        typeof component.component === "string" &&
        component.sample_count === diagnostic.fit_subcell_count &&
        finiteNonnegative(component.midpoint_value_range) &&
        Number.isInteger(component.best_degree_by_max_abs_residual) &&
        finiteNonnegative(component.best_max_abs_midpoint_residual) &&
        Number.isInteger(
          component.best_estimated_taylor_partition_count_to_point_scale
        ) &&
        component.best_estimated_taylor_partition_count_to_point_scale > 0 &&
        Array.isArray(component.polynomial_fit_by_degree) &&
        component.polynomial_fit_by_degree.length ===
          diagnostic.polynomial_degrees.length &&
        component.polynomial_fit_by_degree.every(
          (fit) =>
            diagnostic.polynomial_degrees.includes(fit.polynomial_degree) &&
            Array.isArray(fit.coefficients) &&
            fit.coefficients.length === fit.polynomial_degree + 1 &&
            finiteNonnegative(fit.max_abs_midpoint_residual) &&
            finiteNonnegative(fit.rms_abs_midpoint_residual) &&
            Number.isInteger(
              fit.estimated_taylor_partition_count_to_point_scale
            ) &&
            fit.estimated_taylor_partition_count_to_point_scale > 0 &&
            Array.isArray(fit.residuals) &&
            fit.residuals.length === diagnostic.fit_subcell_count
        )
    )
  ) {
    errors.push("component Taylor fit diagnostics must cover direct expression and expression terms");
  }
  if (
    ![
      "expression-level-n38-local-taylor-route-required",
      "expression-level-n38-taylor-budget-mixed",
    ].includes(diagnostic?.n38_taylor_budget_diagnosis)
  ) {
    errors.push("N38 Taylor budget diagnosis must be classified");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_expression_level_n38_provider !== false ||
    diagnostic?.claim_boundary?.certifies_n38_taylor_remainder_bound !== false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep Taylor, shifted source, primitive, and retention closure open");
  }
  return errors;
}

export function validateH39H38ExpressionN38TaylorEnclosurePrototype(diagnostic) {
  const errors = [];
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TAYLOR_ENCLOSURE_PROTOTYPE_SCHEMA
  ) {
    errors.push("schema must match h39 h38 expression N38 Taylor enclosure prototype");
  }
  if (
    diagnostic?.status !==
    "h39-h38-expression-n38-taylor-enclosure-prototype-candidate-emitted"
  ) {
    errors.push("status must identify a candidate expression-level N38 Taylor enclosure prototype");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h38-expression-n38-local-taylor-enclosure-prototype"
  ) {
    errors.push("evaluation level must identify expression-level N38 Taylor enclosure prototype");
  }
  if (diagnostic?.h38_numerator_y_order !== H38_NUMERATOR_Y_ORDER) {
    errors.push("H38 numerator y order must match the predecessor source coefficient");
  }
  if (
    diagnostic?.source_taylor_budget?.status !==
      "h39-h38-expression-n38-taylor-budget-diagnostic-candidate-emitted" ||
    !finitePositive(
      diagnostic?.source_taylor_budget?.baseline_raw_expression_width
    ) ||
    !finitePositive(diagnostic?.source_taylor_budget?.point_term_width_scale) ||
    !finitePositive(
      diagnostic?.source_taylor_budget
        ?.estimated_uniform_subcell_count_for_point_term_scale
    ) ||
    !finitePositive(diagnostic?.source_taylor_budget?.sine_term_width_share)
  ) {
    errors.push("source Taylor budget summary must be present");
  }
  if (
    !diagnostic?.prototype_parameters ||
    !Array.isArray(diagnostic.prototype_parameters.components) ||
    diagnostic.prototype_parameters.components.length === 0 ||
    !Number.isInteger(diagnostic.prototype_parameters.fit_subcell_count) ||
    diagnostic.prototype_parameters.fit_subcell_count <= 0 ||
    !Array.isArray(diagnostic.prototype_parameters.polynomial_degrees) ||
    diagnostic.prototype_parameters.polynomial_degrees.length === 0 ||
    !Array.isArray(diagnostic.prototype_parameters.xi_domain_interval) ||
    diagnostic.prototype_parameters.xi_domain_interval.length !== 2 ||
    !finitePositive(diagnostic.prototype_parameters.remainder_inflation_factor)
  ) {
    errors.push("prototype parameters must describe components, fit, xi domain, and inflation");
  }
  if (
    !Array.isArray(diagnostic?.component_prototypes) ||
    diagnostic.component_prototypes.length !==
      diagnostic?.prototype_parameters?.components?.length ||
    !diagnostic.component_prototypes.every(
      (component) =>
        diagnostic.prototype_parameters.components.includes(component.component) &&
        Number.isInteger(component.polynomial_degree) &&
        component.polynomial_degree > 0 &&
        Number.isInteger(component.tile_count) &&
        component.tile_count > 0 &&
        finitePositive(component.parent_fit_max_abs_midpoint_residual) &&
        finitePositive(component.local_taylor_order) &&
        finitePositive(component.normalized_tile_radius_against_parent) &&
        finiteNonnegative(component.prototype_remainder_upper) &&
        finiteNonnegative(component.inflated_prototype_remainder_upper) &&
        finiteNonnegative(
          component.inflated_prototype_remainder_to_point_width_ratio
        ) &&
        finitePositive(
          component.residual_reduction_factor_against_parent_fit
        ) &&
        component.all_tiles_pass_point_width_scale === true &&
        Array.isArray(component.prototype_tile_rows) &&
        component.prototype_tile_rows.length === component.tile_count &&
        component.prototype_tile_rows.every(
          (row, index) =>
            row.tile_index === index &&
            Array.isArray(row.xi_interval) &&
            row.xi_interval.length === 2 &&
            Number.isFinite(Number(row.xi_center)) &&
            finitePositive(row.xi_half_width) &&
            row.polynomial_degree === component.polynomial_degree &&
            finiteNonnegative(row.prototype_remainder_upper) &&
            finiteNonnegative(row.prototype_remainder_to_point_width_ratio) &&
            row.passes_point_width_scale === true
        )
    )
  ) {
    errors.push("component prototypes must expose passing local Taylor tile rows");
  }
  if (
    !diagnostic?.prototype_summary ||
    !Number.isInteger(diagnostic.prototype_summary.component_count) ||
    diagnostic.prototype_summary.component_count !==
      diagnostic?.component_prototypes?.length ||
    !Number.isInteger(diagnostic.prototype_summary.max_tile_count) ||
    diagnostic.prototype_summary.max_tile_count <= 0 ||
    !Number.isInteger(diagnostic.prototype_summary.total_component_tile_rows) ||
    diagnostic.prototype_summary.total_component_tile_rows <= 0 ||
    !finiteNonnegative(
      diagnostic.prototype_summary.max_tile_remainder_to_point_width_ratio
    ) ||
    diagnostic.prototype_summary.all_components_pass_point_width_scale !== true ||
    !finitePositive(diagnostic.prototype_summary.brute_to_prototype_tile_count_ratio)
  ) {
    errors.push("prototype summary must report finite passing tile counts and ratios");
  }
  if (
    ![
      "candidate-local-taylor-prototype-replaces-brute-subcover",
      "candidate-local-taylor-prototype-open",
    ].includes(diagnostic?.n38_taylor_enclosure_prototype_diagnosis)
  ) {
    errors.push("N38 Taylor enclosure prototype diagnosis must be classified");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_expression_level_n38_provider !== false ||
    diagnostic?.claim_boundary?.certifies_n38_taylor_remainder_bound !== false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep Taylor provider, shifted source, primitive, and retention closure open");
  }
  return errors;
}

export function validateH39H38ExpressionN38TaylorDerivativeBoundPrototype(
  diagnostic
) {
  const errors = [];
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TAYLOR_DERIVATIVE_BOUND_PROTOTYPE_SCHEMA
  ) {
    errors.push("schema must match h39 h38 expression N38 Taylor derivative-bound prototype");
  }
  if (
    diagnostic?.status !==
    "h39-h38-expression-n38-taylor-derivative-bound-prototype-candidate-emitted"
  ) {
    errors.push("status must identify a candidate expression-level N38 Taylor derivative-bound prototype");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h38-expression-n38-local-taylor-derivative-bound-prototype"
  ) {
    errors.push("evaluation level must identify expression-level N38 Taylor derivative-bound prototype");
  }
  if (diagnostic?.h38_numerator_y_order !== H38_NUMERATOR_Y_ORDER) {
    errors.push("H38 numerator y order must match the predecessor source coefficient");
  }
  if (
    diagnostic?.source_taylor_enclosure_prototype?.status !==
      "h39-h38-expression-n38-taylor-enclosure-prototype-candidate-emitted" ||
    diagnostic?.source_taylor_enclosure_prototype?.diagnosis !==
      "candidate-local-taylor-prototype-replaces-brute-subcover" ||
    !Number.isInteger(
      diagnostic?.source_taylor_enclosure_prototype?.component_count
    ) ||
    diagnostic.source_taylor_enclosure_prototype.component_count <= 0 ||
    !Number.isInteger(
      diagnostic.source_taylor_enclosure_prototype.max_tile_count
    ) ||
    diagnostic.source_taylor_enclosure_prototype.max_tile_count <= 0 ||
    !Number.isInteger(
      diagnostic.source_taylor_enclosure_prototype.total_component_tile_rows
    ) ||
    diagnostic.source_taylor_enclosure_prototype.total_component_tile_rows <=
      0 ||
    !finiteNonnegative(
      diagnostic.source_taylor_enclosure_prototype
        .max_tile_remainder_to_point_width_ratio
    ) ||
    !finitePositive(
      diagnostic.source_taylor_enclosure_prototype
        .brute_to_prototype_tile_count_ratio
    ) ||
    !finitePositive(
      diagnostic.source_taylor_enclosure_prototype.point_term_width_scale
    )
  ) {
    errors.push("source Taylor enclosure prototype summary must be present");
  }
  if (
    !diagnostic?.derivative_bound_parameters ||
    !Array.isArray(diagnostic.derivative_bound_parameters.components) ||
    diagnostic.derivative_bound_parameters.components.length === 0 ||
    !Number.isInteger(diagnostic.derivative_bound_parameters.fit_subcell_count) ||
    diagnostic.derivative_bound_parameters.fit_subcell_count <= 0 ||
    !Array.isArray(diagnostic.derivative_bound_parameters.polynomial_degrees) ||
    diagnostic.derivative_bound_parameters.polynomial_degrees.length === 0 ||
    !Array.isArray(diagnostic.derivative_bound_parameters.xi_domain_interval) ||
    diagnostic.derivative_bound_parameters.xi_domain_interval.length !== 2 ||
    !finitePositive(
      diagnostic.derivative_bound_parameters.remainder_inflation_factor
    ) ||
    diagnostic.derivative_bound_parameters.proof_status !==
      "sampled-proxy-only-not-directed-rounded"
  ) {
    errors.push("derivative-bound parameters must describe the sampled proxy boundary");
  }
  if (
    !Array.isArray(diagnostic?.component_derivative_bound_prototypes) ||
    diagnostic.component_derivative_bound_prototypes.length !==
      diagnostic?.derivative_bound_parameters?.components?.length ||
    !diagnostic.component_derivative_bound_prototypes.every(
      (component) =>
        diagnostic.derivative_bound_parameters.components.includes(
          component.component
        ) &&
        component.polynomial_degree === 3 &&
        Number.isInteger(component.tile_count) &&
        component.tile_count > 0 &&
        component.taylor_remainder_order === 4 &&
        Array.isArray(component.xi_domain_interval) &&
        component.xi_domain_interval.length === 2 &&
        finitePositive(component.parent_xi_half_width) &&
        finitePositive(component.parent_fit_max_abs_midpoint_residual) &&
        finitePositive(
          component.parent_residual_upper_used_for_derivative_proxy
        ) &&
        finitePositive(
          component.sampled_parent_residual_implied_fourth_derivative_upper
        ) &&
        finitePositive(
          component.min_required_fourth_derivative_upper_for_point_scale
        ) &&
        finitePositive(
          component.max_required_fourth_derivative_upper_for_point_scale
        ) &&
        finiteNonnegative(component.max_derivative_bound_headroom_ratio) &&
        component.max_derivative_bound_headroom_ratio <= 1 &&
        finiteNonnegative(
          component.max_predicted_tile_remainder_to_point_width_ratio
        ) &&
        component.max_predicted_tile_remainder_to_point_width_ratio <= 1 &&
        finiteNonnegative(component.max_prototype_remainder_relative_gap) &&
        component.max_prototype_remainder_relative_gap < 1e-9 &&
        component.all_tiles_derivative_proxy_below_required_bound === true &&
        Array.isArray(component.derivative_tile_rows) &&
        component.derivative_tile_rows.length === component.tile_count &&
        component.derivative_tile_rows.every(
          (row, index) =>
            row.component === component.component &&
            row.tile_index === index &&
            Array.isArray(row.xi_interval) &&
            row.xi_interval.length === 2 &&
            Number.isFinite(Number(row.xi_center)) &&
            finitePositive(row.xi_half_width) &&
            row.polynomial_degree === component.polynomial_degree &&
            row.taylor_remainder_order === component.taylor_remainder_order &&
            finitePositive(row.point_term_width_scale) &&
            finitePositive(
              row.required_fourth_derivative_upper_for_point_scale
            ) &&
            finitePositive(
              row.sampled_parent_residual_implied_fourth_derivative_upper
            ) &&
            finiteNonnegative(row.derivative_bound_headroom_ratio) &&
            row.derivative_bound_headroom_ratio <= 1 &&
            finiteNonnegative(
              row.predicted_tile_remainder_from_derivative_proxy
            ) &&
            finiteNonnegative(
              row.predicted_tile_remainder_to_point_width_ratio
            ) &&
            row.predicted_tile_remainder_to_point_width_ratio <= 1 &&
            finiteNonnegative(row.prototype_remainder_upper) &&
            finiteNonnegative(row.prototype_remainder_gap) &&
            finiteNonnegative(row.prototype_remainder_relative_gap) &&
            row.prototype_remainder_relative_gap < 1e-9 &&
            row.derivative_proxy_passes_required_bound === true &&
            row.derivative_bound_status ===
              "sampled-fourth-derivative-proxy-below-required-bound"
        )
    )
  ) {
    errors.push("component derivative-bound prototypes must expose passing sampled proxy rows");
  }
  if (
    !Array.isArray(diagnostic?.prototype_tile_derivative_rows) ||
    diagnostic.prototype_tile_derivative_rows.length !==
      diagnostic?.derivative_bound_summary?.total_derivative_tile_rows ||
    !diagnostic.prototype_tile_derivative_rows.every(
      (row) =>
        diagnostic.derivative_bound_parameters.components.includes(
          row.component
        ) &&
        finitePositive(row.required_fourth_derivative_upper_for_point_scale) &&
        finitePositive(
          row.sampled_parent_residual_implied_fourth_derivative_upper
        ) &&
        finiteNonnegative(row.derivative_bound_headroom_ratio) &&
        row.derivative_bound_headroom_ratio <= 1 &&
        row.derivative_proxy_passes_required_bound === true
    )
  ) {
    errors.push("flat derivative tile rows must preserve finite passing component rows");
  }
  if (
    !diagnostic?.derivative_bound_summary ||
    !Number.isInteger(diagnostic.derivative_bound_summary.component_count) ||
    diagnostic.derivative_bound_summary.component_count !==
      diagnostic?.component_derivative_bound_prototypes?.length ||
    !Number.isInteger(
      diagnostic.derivative_bound_summary.total_derivative_tile_rows
    ) ||
    diagnostic.derivative_bound_summary.total_derivative_tile_rows !==
      diagnostic?.source_taylor_enclosure_prototype?.total_component_tile_rows ||
    !Number.isInteger(diagnostic.derivative_bound_summary.max_tile_count) ||
    diagnostic.derivative_bound_summary.max_tile_count !==
      diagnostic?.source_taylor_enclosure_prototype?.max_tile_count ||
    !finiteNonnegative(
      diagnostic.derivative_bound_summary.max_derivative_bound_headroom_ratio
    ) ||
    diagnostic.derivative_bound_summary.max_derivative_bound_headroom_ratio >
      1 ||
    !finiteNonnegative(
      diagnostic.derivative_bound_summary
        .max_predicted_tile_remainder_to_point_width_ratio
    ) ||
    diagnostic.derivative_bound_summary
      .max_predicted_tile_remainder_to_point_width_ratio > 1 ||
    !finiteNonnegative(
      diagnostic.derivative_bound_summary.max_prototype_remainder_relative_gap
    ) ||
    diagnostic.derivative_bound_summary.max_prototype_remainder_relative_gap >=
      1e-9 ||
    diagnostic.derivative_bound_summary
      .all_components_derivative_proxy_below_required_bound !== true
  ) {
    errors.push("derivative-bound summary must report finite passing sampled proxy bounds");
  }
  if (
    ![
      "candidate-fourth-derivative-bound-target-finite",
      "candidate-fourth-derivative-bound-target-open",
    ].includes(diagnostic?.n38_taylor_derivative_bound_prototype_diagnosis)
  ) {
    errors.push("N38 Taylor derivative-bound prototype diagnosis must be classified");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_expression_level_n38_provider !==
      false ||
    diagnostic?.claim_boundary?.certifies_n38_taylor_remainder_bound !==
      false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep derivative provider, shifted source, primitive, and retention closure open");
  }
  return errors;
}

export function validateH39H38ExpressionN38TaylorFourthDifferenceDiagnostic(
  diagnostic
) {
  const errors = [];
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TAYLOR_FOURTH_DIFFERENCE_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 h38 expression N38 Taylor fourth-difference diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-h38-expression-n38-taylor-fourth-difference-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate expression-level N38 Taylor fourth-difference diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h38-expression-n38-local-taylor-fourth-difference-diagnostic"
  ) {
    errors.push("evaluation level must identify expression-level N38 Taylor fourth-difference diagnostic");
  }
  if (diagnostic?.h38_numerator_y_order !== H38_NUMERATOR_Y_ORDER) {
    errors.push("H38 numerator y order must match the predecessor source coefficient");
  }
  if (
    diagnostic?.source_derivative_bound_prototype?.status !==
      "h39-h38-expression-n38-taylor-derivative-bound-prototype-candidate-emitted" ||
    diagnostic?.source_derivative_bound_prototype?.diagnosis !==
      "candidate-fourth-derivative-bound-target-finite" ||
    !Number.isInteger(
      diagnostic?.source_derivative_bound_prototype
        ?.total_derivative_tile_rows
    ) ||
    diagnostic.source_derivative_bound_prototype.total_derivative_tile_rows <=
      0 ||
    !Number.isInteger(
      diagnostic.source_derivative_bound_prototype.max_tile_count
    ) ||
    diagnostic.source_derivative_bound_prototype.max_tile_count <= 0 ||
    !finiteNonnegative(
      diagnostic.source_derivative_bound_prototype
        .max_derivative_bound_headroom_ratio
    )
  ) {
    errors.push("source derivative-bound prototype summary must be present");
  }
  if (
    !diagnostic?.fourth_difference_parameters ||
    !Array.isArray(diagnostic.fourth_difference_parameters.components) ||
    diagnostic.fourth_difference_parameters.components.length === 0 ||
    !Array.isArray(
      diagnostic.fourth_difference_parameters.stencil_subcell_counts
    ) ||
    diagnostic.fourth_difference_parameters.stencil_subcell_counts.length ===
      0 ||
    !diagnostic.fourth_difference_parameters.stencil_subcell_counts.every(
      (count) => Number.isInteger(count) && count >= 5
    ) ||
    !Number.isInteger(
      diagnostic.fourth_difference_parameters
        .derivative_prototype_fit_subcell_count
    ) ||
    diagnostic.fourth_difference_parameters
      .derivative_prototype_fit_subcell_count <= 0 ||
    !finitePositive(
      diagnostic.fourth_difference_parameters.point_term_width_scale
    ) ||
    diagnostic.fourth_difference_parameters.proof_status !==
      "finite-difference-sanity-check-not-directed-rounded-enclosure"
  ) {
    errors.push("fourth-difference parameters must describe finite stencil inputs and proof boundary");
  }
  if (
    !Array.isArray(diagnostic?.stencil_summaries) ||
    diagnostic.stencil_summaries.length !==
      diagnostic?.fourth_difference_parameters?.stencil_subcell_counts?.length ||
    !diagnostic.stencil_summaries.every(
      (summary) =>
        diagnostic.fourth_difference_parameters.stencil_subcell_counts.includes(
          summary.stencil_subcell_count
        ) &&
        Number.isInteger(summary.fit_sample_count) &&
        summary.fit_sample_count === summary.stencil_subcell_count &&
        Number.isInteger(summary.component_count) &&
        summary.component_count ===
          diagnostic.fourth_difference_parameters.components.length &&
        Array.isArray(summary.component_fourth_difference_rows) &&
        summary.component_fourth_difference_rows.length ===
          summary.component_count &&
        finitePositive(summary.summary?.max_fourth_derivative_estimate) &&
        finitePositive(
          summary.summary?.max_nonuniform_fourth_derivative_estimate
        ) &&
        finitePositive(
          summary.summary?.max_fourth_derivative_to_required_ratio
        ) &&
        finiteNonnegative(
          summary.summary
            ?.max_nonuniform_to_uniform_fourth_derivative_relative_gap
        ) &&
        Number.isInteger(
          summary.summary
            ?.max_retile_count_required_for_observed_fourth_difference
        ) &&
        summary.summary
          .max_retile_count_required_for_observed_fourth_difference > 0 &&
        summary.component_fourth_difference_rows.every(
          (component) =>
            diagnostic.fourth_difference_parameters.components.includes(
              component.component
            ) &&
            component.stencil_subcell_count ===
              summary.stencil_subcell_count &&
            finitePositive(component.xi_step) &&
            Number.isInteger(component.derivative_target_tile_count) &&
            component.derivative_target_tile_count > 0 &&
            finitePositive(
              component.required_fourth_derivative_upper_for_existing_tiles
            ) &&
            finitePositive(
              component.sampled_parent_residual_implied_fourth_derivative_upper
            ) &&
            Array.isArray(component.fourth_difference_rows) &&
            component.fourth_difference_rows.length ===
              summary.stencil_subcell_count - 4 &&
            finitePositive(
              component.fourth_difference_summary
                .max_fourth_derivative_estimate
            ) &&
            finitePositive(
              component.fourth_difference_summary
                .max_nonuniform_fourth_derivative_estimate
            ) &&
            finitePositive(
              component.fourth_difference_summary
                .max_fourth_derivative_to_required_ratio
            ) &&
            finiteNonnegative(
              component.fourth_difference_summary
                .max_nonuniform_to_uniform_fourth_derivative_relative_gap
            ) &&
            Number.isInteger(
              component.fourth_difference_summary
                .max_retile_count_required_for_observed_fourth_difference
            ) &&
            component.fourth_difference_rows.every(
              (row, index) =>
                row.component === component.component &&
                row.stencil_index === index &&
                Array.isArray(row.xi_midpoint_span) &&
                row.xi_midpoint_span.length === 2 &&
                finitePositive(row.xi_step) &&
                finiteNonnegative(row.max_xi_step_deviation) &&
                Number.isFinite(Number(row.fourth_difference)) &&
                finiteNonnegative(row.abs_fourth_difference) &&
                finiteNonnegative(row.fourth_derivative_estimate) &&
                finiteNonnegative(
                  row.nonuniform_fourth_derivative_estimate
                ) &&
                finiteNonnegative(
                  row.nonuniform_to_uniform_fourth_derivative_ratio
                ) &&
                finiteNonnegative(
                  row.nonuniform_to_uniform_fourth_derivative_relative_gap
                ) &&
                finitePositive(
                  row.required_fourth_derivative_upper_for_existing_tiles
                ) &&
                finitePositive(
                  row.sampled_parent_residual_implied_fourth_derivative_upper
                ) &&
                finiteNonnegative(row.fourth_derivative_to_required_ratio) &&
                finiteNonnegative(row.fourth_derivative_to_sampled_proxy_ratio) &&
                Number.isInteger(
                  row.retile_count_required_for_observed_fourth_difference
                ) &&
                row.retile_count_required_for_observed_fourth_difference > 0 &&
                [
                  "fourth-difference-compatible-with-existing-tile-bound",
                  "fourth-difference-exceeds-existing-tile-bound",
                ].includes(row.stencil_status)
            )
        )
    )
  ) {
    errors.push("stencil summaries must expose finite fourth-difference rows");
  }
  if (
    !diagnostic?.fourth_difference_summary ||
    !Number.isInteger(diagnostic.fourth_difference_summary.total_stencil_rows) ||
    diagnostic.fourth_difference_summary.total_stencil_rows <= 0 ||
    !finitePositive(
      diagnostic.fourth_difference_summary.max_fourth_derivative_estimate
    ) ||
    !finitePositive(
      diagnostic.fourth_difference_summary
        .max_nonuniform_fourth_derivative_estimate
    ) ||
    !finitePositive(
      diagnostic.fourth_difference_summary
        .max_fourth_derivative_to_required_ratio
    ) ||
    !finiteNonnegative(
      diagnostic.fourth_difference_summary
        .max_nonuniform_to_uniform_fourth_derivative_relative_gap
    ) ||
    !finitePositive(
      diagnostic.fourth_difference_summary
        .max_fourth_derivative_to_sampled_proxy_ratio
    ) ||
    !Number.isInteger(
      diagnostic.fourth_difference_summary
        .max_retile_count_required_for_observed_fourth_difference
    ) ||
    diagnostic.fourth_difference_summary
      .max_retile_count_required_for_observed_fourth_difference <= 0 ||
    typeof diagnostic.fourth_difference_summary
      .all_stencils_compatible_with_existing_tile_bound !== "boolean" ||
    !diagnostic.fourth_difference_summary.worst_stencil ||
    !diagnostic.fourth_difference_summary.worst_nonuniform_correction_stencil
  ) {
    errors.push("fourth-difference summary must report finite global stencil maxima");
  }
  if (
    ![
      "finite-fourth-difference-compatible-with-existing-taylor-target",
      "finite-fourth-difference-rejects-parent-residual-proxy-as-certificate",
    ].includes(diagnostic?.n38_taylor_fourth_difference_diagnosis)
  ) {
    errors.push("N38 Taylor fourth-difference diagnosis must be classified");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_expression_level_n38_provider !==
      false ||
    diagnostic?.claim_boundary?.certifies_n38_taylor_remainder_bound !==
      false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep fourth-difference diagnostic from promoting closure");
  }
  return errors;
}

export function validateH39H38ExpressionN38TaylorCorrectedRetilePrototype(
  diagnostic
) {
  const errors = [];
  const hasOrderedFiniteInterval = (interval) =>
    Array.isArray(interval) &&
    interval.length === 2 &&
    Number.isFinite(Number(interval[0])) &&
    Number.isFinite(Number(interval[1])) &&
    Number(interval[1]) > Number(interval[0]);
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TAYLOR_CORRECTED_RETILE_PROTOTYPE_SCHEMA
  ) {
    errors.push("schema must match h39 h38 expression N38 Taylor corrected-retile prototype");
  }
  if (
    diagnostic?.status !==
    "h39-h38-expression-n38-taylor-corrected-retile-prototype-candidate-emitted"
  ) {
    errors.push("status must identify a candidate expression-level N38 Taylor corrected-retile prototype");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h38-expression-n38-local-taylor-corrected-retile-prototype"
  ) {
    errors.push("evaluation level must identify expression-level N38 Taylor corrected-retile prototype");
  }
  if (diagnostic?.h38_numerator_y_order !== H38_NUMERATOR_Y_ORDER) {
    errors.push("H38 numerator y order must match the predecessor source coefficient");
  }
  if (
    diagnostic?.source_fourth_difference_diagnostic?.status !==
      "h39-h38-expression-n38-taylor-fourth-difference-diagnostic-candidate-emitted" ||
    diagnostic?.source_fourth_difference_diagnostic?.diagnosis !==
      "finite-fourth-difference-rejects-parent-residual-proxy-as-certificate" ||
    !Number.isInteger(
      diagnostic?.source_fourth_difference_diagnostic?.total_stencil_rows
    ) ||
    diagnostic.source_fourth_difference_diagnostic.total_stencil_rows <= 0 ||
    !finitePositive(
      diagnostic.source_fourth_difference_diagnostic
        .max_fourth_derivative_estimate
    ) ||
    !finitePositive(
      diagnostic.source_fourth_difference_diagnostic
        .max_nonuniform_fourth_derivative_estimate
    ) ||
    !finitePositive(
      diagnostic.source_fourth_difference_diagnostic
        .max_fourth_derivative_to_required_ratio
    ) ||
    !finiteNonnegative(
      diagnostic.source_fourth_difference_diagnostic
        .max_nonuniform_to_uniform_fourth_derivative_relative_gap
    ) ||
    diagnostic.source_fourth_difference_diagnostic
      .max_fourth_derivative_to_required_ratio <= 1 ||
    !Number.isInteger(
      diagnostic.source_fourth_difference_diagnostic
        .max_retile_count_required_for_observed_fourth_difference
    ) ||
    diagnostic.source_fourth_difference_diagnostic
      .max_retile_count_required_for_observed_fourth_difference <= 0 ||
    !Number.isInteger(
      diagnostic.source_fourth_difference_diagnostic
        .original_derivative_tile_rows
    ) ||
    diagnostic.source_fourth_difference_diagnostic
      .original_derivative_tile_rows <= 0
  ) {
    errors.push("source fourth-difference diagnostic must expose the rejected parent-residual proxy");
  }
  if (
    !diagnostic?.corrected_retile_parameters ||
    !Array.isArray(diagnostic.corrected_retile_parameters.components) ||
    diagnostic.corrected_retile_parameters.components.length === 0 ||
    !Array.isArray(
      diagnostic.corrected_retile_parameters.stencil_subcell_counts
    ) ||
    diagnostic.corrected_retile_parameters.stencil_subcell_counts.length ===
      0 ||
    !diagnostic.corrected_retile_parameters.stencil_subcell_counts.every(
      (count) => Number.isInteger(count) && count >= 5
    ) ||
    !Number.isInteger(
      diagnostic.corrected_retile_parameters
        .derivative_prototype_fit_subcell_count
    ) ||
    diagnostic.corrected_retile_parameters
      .derivative_prototype_fit_subcell_count <= 0 ||
    !finitePositive(
      diagnostic.corrected_retile_parameters.point_term_width_scale
    ) ||
    !finitePositive(
      diagnostic.corrected_retile_parameters.observed_m4_inflation_factor
    ) ||
    Number(
      diagnostic.corrected_retile_parameters.observed_m4_inflation_factor
    ) < 1 ||
    diagnostic.corrected_retile_parameters.proof_status !==
      "observed-fourth-difference-retile-not-directed-rounded"
  ) {
    errors.push("corrected-retile parameters must describe finite inputs and proof boundary");
  }
  const componentRows =
    diagnostic?.component_corrected_retile_prototypes ?? [];
  const flatRows = diagnostic?.corrected_retile_rows ?? [];
  const expectedComponents =
    diagnostic?.corrected_retile_parameters?.components ?? [];
  if (
    !Array.isArray(componentRows) ||
    componentRows.length !== expectedComponents.length ||
    !componentRows.every((component) => {
      const rows = component.corrected_retile_rows;
      return (
        expectedComponents.includes(component.component) &&
        diagnostic.corrected_retile_parameters.stencil_subcell_counts.includes(
          component.source_stencil_subcell_count
        ) &&
        Number.isInteger(component.source_derivative_target_tile_count) &&
        component.source_derivative_target_tile_count > 0 &&
        Number.isInteger(
          component.observed_retile_count_from_fourth_difference
        ) &&
        component.observed_retile_count_from_fourth_difference >
          component.source_derivative_target_tile_count &&
        Number.isInteger(component.corrected_tile_count) &&
        component.corrected_tile_count >=
          component.observed_retile_count_from_fourth_difference &&
        component.corrected_tile_count >
          component.source_derivative_target_tile_count &&
        hasOrderedFiniteInterval(component.xi_domain_interval) &&
        finitePositive(component.parent_xi_half_width) &&
        component.polynomial_degree === 3 &&
        component.taylor_remainder_order === 4 &&
        finitePositive(component.point_term_width_scale) &&
        finitePositive(component.observed_fourth_derivative_upper) &&
        finitePositive(component.observed_m4_inflation_factor) &&
        Number(component.observed_m4_inflation_factor) >= 1 &&
        finitePositive(component.corrected_fourth_derivative_upper) &&
        component.corrected_fourth_derivative_upper >=
          component.observed_fourth_derivative_upper &&
        finitePositive(
          component.corrected_tile_count_to_original_tile_count_ratio
        ) &&
        component.corrected_tile_count_to_original_tile_count_ratio > 1 &&
        finiteNonnegative(
          component.max_corrected_remainder_to_point_width_ratio
        ) &&
        component.max_corrected_remainder_to_point_width_ratio <= 1 &&
        component.all_corrected_tiles_pass_point_width_scale === true &&
        Array.isArray(rows) &&
        rows.length === component.corrected_tile_count &&
        rows.every(
          (row, index) =>
            row.component === component.component &&
            row.tile_index === index &&
            hasOrderedFiniteInterval(row.xi_interval) &&
            Number.isFinite(Number(row.xi_center)) &&
            finitePositive(row.xi_half_width) &&
            row.polynomial_degree === 3 &&
            row.taylor_remainder_order === 4 &&
            finitePositive(row.corrected_fourth_derivative_upper) &&
            finitePositive(
              row.required_fourth_derivative_upper_for_point_scale
            ) &&
            finitePositive(row.corrected_remainder_upper) &&
            finiteNonnegative(
              row.corrected_remainder_to_point_width_ratio
            ) &&
            row.corrected_remainder_to_point_width_ratio <= 1 &&
            finiteNonnegative(row.derivative_headroom_ratio) &&
            row.derivative_headroom_ratio <= 1 &&
            row.passes_point_width_scale === true
        )
      );
    })
  ) {
    errors.push("component corrected-retile prototypes must expose finite passing retile rows");
  }
  const expectedTotalRows = componentRows.reduce(
    (sum, component) => sum + Number(component.corrected_tile_count ?? 0),
    0
  );
  const maxCorrectedTileCount = Math.max(
    0,
    ...componentRows.map((component) =>
      Number(component.corrected_tile_count ?? 0)
    )
  );
  const maxObservedRetileCount = Math.max(
    0,
    ...componentRows.map((component) =>
      Number(component.observed_retile_count_from_fourth_difference ?? 0)
    )
  );
  if (
    !Array.isArray(flatRows) ||
    flatRows.length !== expectedTotalRows ||
    !diagnostic?.corrected_retile_summary ||
    diagnostic.corrected_retile_summary.component_count !==
      componentRows.length ||
    diagnostic.corrected_retile_summary.total_corrected_tile_rows !==
      expectedTotalRows ||
    diagnostic.corrected_retile_summary.max_corrected_tile_count !==
      maxCorrectedTileCount ||
    diagnostic.corrected_retile_summary
      .max_observed_retile_count_from_fourth_difference !==
      maxObservedRetileCount ||
    !finiteNonnegative(
      diagnostic.corrected_retile_summary
        .max_corrected_remainder_to_point_width_ratio
    ) ||
    diagnostic.corrected_retile_summary
      .max_corrected_remainder_to_point_width_ratio > 1 ||
    diagnostic.corrected_retile_summary.all_components_pass_point_width_scale !==
      true ||
    !finitePositive(
      diagnostic.corrected_retile_summary
        .corrected_to_original_tile_row_ratio
    ) ||
    diagnostic.corrected_retile_summary.corrected_to_original_tile_row_ratio <=
      1
  ) {
    errors.push("corrected-retile summary must match component rows and stay below point scale");
  }
  if (
    ![
      "candidate-corrected-retile-restores-finite-point-scale-target",
      "candidate-corrected-retile-open",
    ].includes(diagnostic?.n38_taylor_corrected_retile_prototype_diagnosis)
  ) {
    errors.push("N38 Taylor corrected-retile prototype diagnosis must be classified");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_expression_level_n38_provider !==
      false ||
    diagnostic?.claim_boundary?.certifies_n38_taylor_remainder_bound !==
      false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep corrected-retile prototype candidate-only");
  }
  return errors;
}

function validateSinePairNormalFormWitness(witness, {
  requireSourceCancellationMatch = false,
} = {}) {
  const errors = [];
  if (
    witness?.status !== "sine-pair-normal-form-witness-emitted" ||
    witness?.identity_basis !==
      "sum-to-product-delta-phi-half-sum-half-difference" ||
    witness?.proof_status !==
      "algebraic-series-identity-on-same-samples-not-directed-rounded-enclosure" ||
    witness?.fit_used !== false ||
    !Number.isInteger(witness?.refined_source_stencil_subcell_count) ||
    witness.refined_source_stencil_subcell_count < 5 ||
    !Number.isInteger(witness?.comparison_stencil_index) ||
    witness.comparison_stencil_index < 0 ||
    !Array.isArray(witness?.comparison_xi_midpoint_span) ||
    witness.comparison_xi_midpoint_span.length !== 2 ||
    !Number.isFinite(Number(witness?.comparison_xi_midpoint_center)) ||
    witness?.sample_count !== 5 ||
    !Array.isArray(witness?.sample_witness_rows) ||
    witness.sample_witness_rows.length !== 5
  ) {
    errors.push("sine-pair normal-form witness must describe five same-stencil samples");
  }
  if (
    requireSourceCancellationMatch &&
    witness?.same_sample_sequence_as_source_cancellation !== true
  ) {
    errors.push("sine-pair witness must use the same sample sequence as source cancellation");
  }
  if (
    !Array.isArray(witness?.sum_coordinate_nonzero_orders) ||
    witness.sum_coordinate_nonzero_orders.length !== 2 ||
    witness.sum_coordinate_nonzero_orders[0] !== 0 ||
    witness.sum_coordinate_nonzero_orders[1] !== 2 ||
    witness.sum_coordinate_branch_dependent !== false ||
    witness.sum_coordinate_h_row_dependent !== false ||
    witness.half_sum_h_row_dependency_status !== "h-row-free" ||
    !finiteNonnegative(witness.delta_plus_phi_y1_coefficient_abs_upper) ||
    witness.delta_plus_phi_y1_coefficient_abs_upper > 1e-12 ||
    witness.delta_plus_phi_y2_coefficient !== -2 ||
    !finiteNonnegative(witness.delta_plus_phi_h_tail_max_abs_upper) ||
    witness.explicit_half_sum_h_tail_max_abs_upper !== 0 ||
    witness.half_sum_y2_coefficient !== -1 ||
    !finiteNonnegative(
      witness.raw_sum_coordinate_rounding_residue_h_tail_abs_upper
    ) ||
    !finitePositive(witness.difference_coordinate_y1_coefficient_abs_upper) ||
    !finitePositive(witness.difference_coordinate_h_tail_max_abs_upper) ||
    witness.difference_coordinate_carries_branch_and_h_rows !== true
  ) {
    errors.push("sine-pair normal form must cancel branch and h-row dependence in the sum coordinate");
  }
  if (
    witness?.all_sample_sine_pair_identity_residuals_contain_zero !== true ||
    witness?.all_sample_sine_pair_identity_residuals_pass !== true ||
    !finiteNonnegative(witness?.max_sample_sine_pair_identity_absolute_gap) ||
    !finiteNonnegative(witness?.max_sample_sine_pair_identity_relative_gap) ||
    witness.max_sample_sine_pair_identity_relative_gap > 1e-9 ||
    !Number.isFinite(Number(witness?.sine_pair_fourth_difference_from_terms)) ||
    !Number.isFinite(
      Number(witness?.sine_pair_fourth_difference_from_direct_series)
    ) ||
    !Number.isFinite(
      Number(witness?.sine_pair_normal_form_fourth_difference)
    ) ||
    !finiteNonnegative(
      witness?.sine_pair_fourth_difference_relative_gap
    ) ||
    witness.sine_pair_fourth_difference_relative_gap > 1e-6 ||
    !finiteNonnegative(
      witness?.normal_form_fourth_difference_relative_gap
    ) ||
    witness.normal_form_fourth_difference_relative_gap > 1e-6 ||
    witness.sine_pair_fourth_difference_replays_sin_terms !== true ||
    !["positive", "negative", "zero"].includes(
      witness.sine_pair_fourth_difference_sign
    )
  ) {
    errors.push("sine-pair normal form must replay the sine-term fourth difference");
  }
  if (
    !finitePositive(witness?.sine_pair_abs_source_mass_share) ||
    witness.sine_pair_abs_source_mass_share > 1 + 1e-12 ||
    !Number.isFinite(
      Number(witness?.sine_pair_signed_to_direct_fourth_difference_ratio)
    ) ||
    witness?.normal_form_interpretation !==
      "sine-pair-sum-coordinate-cancels-branch-and-h-row-dependence"
  ) {
    errors.push("sine-pair normal form must classify the positive-xi curvature balance");
  }
  return errors;
}

export function validateH39H38ExpressionN38SinePairNormalFormDiagnostic(
  diagnostic
) {
  const errors = [];
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_SINE_PAIR_NORMAL_FORM_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 h38 expression N38 sine-pair normal-form diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-h38-expression-n38-sine-pair-normal-form-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate sine-pair normal-form diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h38-expression-n38-sine-pair-normal-form-diagnostic"
  ) {
    errors.push("evaluation level must identify sine-pair normal-form diagnostic");
  }
  if (
    diagnostic?.h38_numerator_y_order !== H38_NUMERATOR_Y_ORDER ||
    !Number.isInteger(diagnostic?.source_stencil_subcell_count) ||
    diagnostic.source_stencil_subcell_count < 5 ||
    !Number.isInteger(diagnostic?.comparison_stencil_index) ||
    diagnostic.comparison_stencil_index < 0
  ) {
    errors.push("sine-pair normal-form parameters must describe the live N38 stencil");
  }
  errors.push(
    ...validateSinePairNormalFormWitness(
      diagnostic?.sine_pair_normal_form_witness
    )
  );
  if (
    diagnostic?.n38_sine_pair_normal_form_diagnosis !==
    "sine-pair-normal-form-replays-live-positive-xi-source"
  ) {
    errors.push("sine-pair normal-form diagnosis must replay the live source");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_expression_level_n38_provider !==
      false ||
    diagnostic?.claim_boundary?.certifies_n38_taylor_remainder_bound !==
      false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep sine-pair normal-form diagnostic candidate-only");
  }
  return errors;
}

export function validateH39H38ExpressionN38ReducedSigmaEtaSourceDiagnostic(
  diagnostic
) {
  const errors = [];
  const hasOrderedFiniteInterval = (interval) =>
    Array.isArray(interval) &&
    interval.length === 2 &&
    Number.isFinite(Number(interval[0])) &&
    Number.isFinite(Number(interval[1])) &&
    Number(interval[1]) > Number(interval[0]);
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_REDUCED_SIGMA_ETA_SOURCE_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 h38 expression N38 reduced sigma-eta source diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-h38-expression-n38-reduced-sigma-eta-source-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate reduced sigma-eta source diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h38-expression-n38-reduced-sigma-eta-source-diagnostic"
  ) {
    errors.push("evaluation level must identify reduced sigma-eta source diagnostic");
  }
  if (
    diagnostic?.h38_numerator_y_order !== H38_NUMERATOR_Y_ORDER ||
    diagnostic?.proof_status !==
      "directed-interval-coordinate-replay-not-shifted-R43-certificate" ||
    !Number.isInteger(diagnostic?.source_stencil_subcell_count) ||
    diagnostic.source_stencil_subcell_count < 5 ||
    !Number.isInteger(diagnostic?.comparison_stencil_index) ||
    diagnostic.comparison_stencil_index < 0 ||
    !hasOrderedFiniteInterval(diagnostic?.comparison_xi_midpoint_span ?? [])
  ) {
    errors.push("reduced sigma-eta source parameters must describe the live N38 stencil");
  }
  const rows = diagnostic?.reduced_sigma_eta_rows ?? [];
  if (
    !Array.isArray(rows) ||
    rows.length !== 5 ||
    !rows.every((row) => {
      return (
        row.coordinate_route === "sigma-eta-before-h-row-substitution" &&
        Array.isArray(row.sigma_nonzero_orders) &&
        row.sigma_nonzero_orders.length === 2 &&
        row.sigma_nonzero_orders[0] === 0 &&
        row.sigma_nonzero_orders[1] === 2 &&
        row.h38_solve_target_zeroed === true &&
        row.sigma_h_tail_max_abs_upper === 0 &&
        row.sigma_y2_coefficient === -1 &&
        finitePositive(row.raw_sum_h_tail_max_abs_upper) &&
        row.raw_sum_has_rounding_h_tail_residue === true &&
        finitePositive(row.eta_y1_coefficient_abs_upper) &&
        finitePositive(row.eta_h_tail_max_abs_upper) &&
        row.eta_carries_branch_and_h_rows === true &&
        finitePositive(row.raw_sine_pair_width) &&
        finitePositive(row.reduced_sine_pair_width) &&
        finitePositive(row.raw_to_reduced_sine_pair_width_ratio) &&
        row.raw_to_reduced_sine_pair_width_ratio < 1 &&
        finitePositive(row.raw_direct_source_width) &&
        finitePositive(row.reduced_sigma_eta_full_source_width) &&
        finitePositive(row.reduced_full_to_raw_direct_width_ratio) &&
        row.reduced_full_to_raw_direct_width_ratio > 1 &&
        row.reduced_source_route_interpretation ===
          "h38-zeroed-sigma-eta-product-widens-eta-dependency" &&
        hasOrderedFiniteInterval(row.raw_sine_pair_coefficient_interval) &&
        hasOrderedFiniteInterval(row.reduced_sine_pair_coefficient_interval) &&
        hasOrderedFiniteInterval(row.raw_direct_source_coefficient_interval) &&
        hasOrderedFiniteInterval(
          row.reduced_sigma_eta_full_source_coefficient_interval
        )
      );
    })
  ) {
    errors.push("reduced sigma-eta rows must form h-free sigma, transported eta, widened h38-zeroed product rows, and wider naive full-source rows");
  }
  const summary = diagnostic?.reduced_sigma_eta_summary;
  if (
    summary?.row_count !== 5 ||
    summary?.all_rows_form_sigma_before_h_row_substitution !== true ||
    summary?.all_rows_reduce_sine_pair_width !== false ||
    summary?.all_rows_widen_sine_pair_width_after_h38_zeroing !== true ||
    summary?.naive_reduced_full_source_widens_every_row !== true ||
    summary?.route_interpretation !==
      "h38-zeroed-sigma-eta-product-exposes-eta-dependency-blocker" ||
    !finitePositive(summary?.min_raw_to_reduced_sine_pair_width_ratio) ||
    summary.min_raw_to_reduced_sine_pair_width_ratio >= 1 ||
    !finitePositive(summary?.max_raw_to_reduced_sine_pair_width_ratio) ||
    summary.max_raw_to_reduced_sine_pair_width_ratio >= 1 ||
    summary.max_raw_to_reduced_sine_pair_width_ratio <
      summary.min_raw_to_reduced_sine_pair_width_ratio ||
    !finitePositive(summary?.min_reduced_full_to_raw_direct_width_ratio) ||
    summary.min_reduced_full_to_raw_direct_width_ratio <= 1 ||
    !finitePositive(summary?.max_reduced_full_to_raw_direct_width_ratio) ||
    summary.max_reduced_full_to_raw_direct_width_ratio <
      summary.min_reduced_full_to_raw_direct_width_ratio ||
    !finitePositive(summary?.max_raw_sum_h_tail_rounding_residue) ||
    summary?.max_sigma_h_tail_abs_upper !== 0 ||
    !finitePositive(summary?.max_eta_h_tail_abs_upper)
  ) {
    errors.push("reduced sigma-eta summary must classify the eta-dependency source blocker");
  }
  if (
    diagnostic?.n38_reduced_sigma_eta_source_diagnosis !==
    "reduced-sigma-eta-product-route-widens-live-n38-source"
  ) {
    errors.push("reduced sigma-eta diagnosis must keep the full-source route open");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_expression_level_n38_provider !==
      false ||
    diagnostic?.claim_boundary?.certifies_n38_taylor_remainder_bound !==
      false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep reduced sigma-eta source diagnostic candidate-only");
  }
  return errors;
}

export function validateH39H38ExpressionN38EtaTransportCouplingDiagnostic(
  diagnostic
) {
  const errors = [];
  const hasOrderedFiniteInterval = (interval) =>
    Array.isArray(interval) &&
    interval.length === 2 &&
    Number.isFinite(Number(interval[0])) &&
    Number.isFinite(Number(interval[1])) &&
    Number(interval[1]) > Number(interval[0]);
  const hasFiniteInterval = (interval) =>
    Array.isArray(interval) &&
    interval.length === 2 &&
    Number.isFinite(Number(interval[0])) &&
    Number.isFinite(Number(interval[1]));
  const expectedHIndexes = Array.from({ length: 39 }, (_, index) => index);
  const replayValid = (replay, mode) =>
    replay?.eta_transport_mode === mode &&
    replay?.h38_solve_target_zeroed === true &&
    replay?.coordinate_route === "sigma-eta-before-h-row-substitution" &&
    Array.isArray(replay?.sigma_nonzero_orders) &&
    replay.sigma_nonzero_orders.length === 2 &&
    replay.sigma_nonzero_orders[0] === 0 &&
    replay.sigma_nonzero_orders[1] === 2 &&
    replay?.sigma_h_tail_max_abs_upper === 0 &&
    replay?.sigma_y2_coefficient === -1 &&
    finiteNonnegative(replay?.eta_h_tail_max_width) &&
    finiteNonnegative(replay?.eta_h_tail_max_abs_upper) &&
    finitePositive(replay?.full_source_width) &&
    hasOrderedFiniteInterval(replay?.full_source_coefficient_interval);
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_ETA_TRANSPORT_COUPLING_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 h38 expression N38 eta transport coupling diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-h38-expression-n38-eta-transport-coupling-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate eta transport coupling diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h38-expression-n38-eta-transport-coupling-diagnostic"
  ) {
    errors.push("evaluation level must identify eta transport coupling diagnostic");
  }
  if (
    diagnostic?.h38_numerator_y_order !== H38_NUMERATOR_Y_ORDER ||
    diagnostic?.proof_status !==
      "finite-eta-transport-replay-not-directed-rounded-source-certificate" ||
    !Number.isInteger(diagnostic?.source_stencil_subcell_count) ||
    diagnostic.source_stencil_subcell_count < 5 ||
    !Number.isInteger(diagnostic?.comparison_stencil_index) ||
    diagnostic.comparison_stencil_index < 0 ||
    !Number.isInteger(diagnostic?.top_contributor_count) ||
    diagnostic.top_contributor_count < 3 ||
    diagnostic.top_contributor_count > 39 ||
    !hasOrderedFiniteInterval(diagnostic?.comparison_xi_midpoint_span ?? [])
  ) {
    errors.push("eta transport coupling parameters must describe the live N38 stencil");
  }
  const rows = diagnostic?.eta_transport_coupling_rows ?? [];
  if (
    !Array.isArray(rows) ||
    rows.length !== 5 ||
    !rows.every((row) => {
      const replays = row.one_active_eta_h_row_replays ?? [];
      const topRows = row.top_eta_transport_width_rows ?? [];
      return (
        row.coordinate_route === "sigma-eta-before-h-row-substitution" &&
        row.h38_solve_target_zeroed === true &&
        row.y_order === H38_NUMERATOR_Y_ORDER &&
        hasOrderedFiniteInterval(row.raw_direct_source_coefficient_interval) &&
        finitePositive(row.raw_direct_source_width) &&
        replayValid(row.all_active_reduced_source, "all-active-reduced-source") &&
        replayValid(row.frozen_eta_h_rows, "frozen-eta-h-rows") &&
        row.all_active_reduced_source.eta_h_tail_max_width > 0 &&
        row.frozen_eta_h_rows.eta_h_tail_max_width <
          row.all_active_reduced_source.eta_h_tail_max_width * 1e-20 &&
        row.all_active_reduced_source.full_source_width >
          row.frozen_eta_h_rows.full_source_width &&
        Array.isArray(replays) &&
        replays.length === 39 &&
        replays.every((replay, index) => {
          return (
            replayValid(replay, "one-active-eta-h-row-replay") &&
            replay.active_h_index === expectedHIndexes[index] &&
            hasFiniteInterval(replay.active_h_interval) &&
            finiteNonnegative(replay.active_h_width) &&
            finitePositive(replay.full_source_width_share_of_all_active) &&
            finitePositive(replay.full_source_width_ratio_to_raw_direct) &&
            finitePositive(replay.full_source_width_ratio_to_frozen_eta) &&
            row.all_active_reduced_source.full_source_width >=
              replay.full_source_width * (1 - 1e-12)
          );
        }) &&
        replays[THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index]
          ?.active_h_width === 0 &&
        Array.isArray(topRows) &&
        topRows.length === diagnostic.top_contributor_count &&
        topRows[0]?.active_h_index === 37 &&
        topRows[1]?.active_h_index === 36 &&
        topRows[2]?.active_h_index === 35 &&
        topRows[0]?.full_source_width_share_of_all_active > 0.7 &&
        row.terminal_eta_transport_width_share_of_all > 0.95 &&
        Array.isArray(row.terminal_eta_h_indexes) &&
        row.terminal_eta_h_indexes[0] === 37 &&
        row.terminal_eta_h_indexes[1] === 36 &&
        row.terminal_eta_h_indexes[2] === 35 &&
        row.terminal_eta_rows_dominate === true &&
        row.h38_one_active_replay_matches_frozen === true &&
        finitePositive(row.all_active_to_raw_direct_width_ratio) &&
        row.all_active_to_raw_direct_width_ratio > 1 &&
        finitePositive(row.frozen_to_raw_direct_width_ratio) &&
        row.frozen_to_raw_direct_width_ratio < 1e-12 &&
        row.all_active_width_dominates_one_active_replays === true &&
        row.eta_transport_width_interpretation ===
          "terminal-h37-h36-h35-dominate-eta-transport-width"
      );
    })
  ) {
    errors.push("eta transport rows must freeze, replay, and localize width to terminal transported h rows");
  }
  const summary = diagnostic?.eta_transport_coupling_summary;
  if (
    summary?.row_count !== 5 ||
    summary?.h_row_count !== 39 ||
    summary?.one_active_replay_count !== 195 ||
    summary?.all_rows_positive_xi_stencil !== true ||
    summary?.all_rows_h38_solve_target_zeroed !== true ||
    summary?.all_rows_form_sigma_before_h_row_substitution !== true ||
    summary?.frozen_eta_h_rows_are_narrower_than_all_active_every_row !==
      true ||
    summary?.one_active_replays_cover_h0_through_h38 !== true ||
    summary?.h38_one_active_replay_matches_frozen !== true ||
    summary?.all_active_width_dominates_one_active_replays !== true ||
    !Array.isArray(summary?.terminal_eta_h_indexes) ||
    summary.terminal_eta_h_indexes[0] !== 37 ||
    summary.terminal_eta_h_indexes[1] !== 36 ||
    summary.terminal_eta_h_indexes[2] !== 35 ||
    summary?.all_rows_terminal_eta_rows_dominate !== true ||
    !finitePositive(summary?.min_top3_eta_transport_width_share_of_all) ||
    summary.min_top3_eta_transport_width_share_of_all <= 0.95 ||
    !finitePositive(summary?.min_h37_eta_transport_width_share_of_all) ||
    summary.min_h37_eta_transport_width_share_of_all <= 0.7 ||
    !finitePositive(summary?.min_all_active_to_raw_direct_width_ratio) ||
    summary.min_all_active_to_raw_direct_width_ratio <= 1 ||
    !finitePositive(summary?.max_all_active_to_raw_direct_width_ratio) ||
    summary.max_all_active_to_raw_direct_width_ratio <
      summary.min_all_active_to_raw_direct_width_ratio ||
    !finitePositive(summary?.max_frozen_to_raw_direct_width_ratio) ||
    summary.max_frozen_to_raw_direct_width_ratio >= 1e-12 ||
    summary?.route_interpretation !==
      "terminal-eta-transport-rows-dominate-reduced-source-width"
  ) {
    errors.push("eta transport summary must classify terminal-row localization without closure");
  }
  if (
    diagnostic?.n38_eta_transport_coupling_diagnosis !==
    "eta-transport-width-localizes-to-terminal-h37-h36-h35"
  ) {
    errors.push("eta transport diagnosis must localize the open source width");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_expression_level_n38_provider !==
      false ||
    diagnostic?.claim_boundary?.certifies_n38_taylor_remainder_bound !==
      false ||
    diagnostic?.claim_boundary?.certifies_eta_transport_enclosure !== false ||
    diagnostic?.claim_boundary?.certifies_reduced_source_enclosure !== false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep eta transport coupling diagnostic candidate-only");
  }
  return errors;
}

export function validateH39H38ExpressionN38TerminalEtaGraphDiagnostic(
  diagnostic
) {
  const errors = [];
  const hasOrderedFiniteInterval = (interval) =>
    Array.isArray(interval) &&
    interval.length === 2 &&
    Number.isFinite(Number(interval[0])) &&
    Number.isFinite(Number(interval[1])) &&
    Number(interval[1]) > Number(interval[0]);
  const terminalIndexes = diagnostic?.terminal_provider_h_indexes ?? [];
  const terminalIndexesMatch =
    Array.isArray(terminalIndexes) &&
    terminalIndexes.length === 3 &&
    terminalIndexes[0] === 37 &&
    terminalIndexes[1] === 36 &&
    terminalIndexes[2] === 35;
  const replayValid = (replay, mode) =>
    replay?.eta_transport_mode === mode &&
    replay?.h38_solve_target_zeroed === true &&
    replay?.coordinate_route === "sigma-eta-before-h-row-substitution" &&
    replay?.sigma_h_tail_max_abs_upper === 0 &&
    replay?.sigma_y2_coefficient === -1 &&
    finiteNonnegative(replay?.eta_h_tail_max_width) &&
    finitePositive(replay?.full_source_width) &&
    hasOrderedFiniteInterval(replay?.full_source_coefficient_interval);
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TERMINAL_ETA_GRAPH_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 h38 expression N38 terminal eta graph diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-h38-expression-n38-terminal-eta-graph-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate terminal eta graph diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h38-expression-n38-terminal-eta-graph-diagnostic"
  ) {
    errors.push("evaluation level must identify terminal eta graph diagnostic");
  }
  if (
    diagnostic?.h38_numerator_y_order !== H38_NUMERATOR_Y_ORDER ||
    diagnostic?.proof_status !==
      "finite-terminal-eta-graph-replay-not-directed-rounded-source-certificate" ||
    !Number.isInteger(diagnostic?.source_stencil_subcell_count) ||
    diagnostic.source_stencil_subcell_count < 5 ||
    !Number.isInteger(diagnostic?.comparison_stencil_index) ||
    diagnostic.comparison_stencil_index < 0 ||
    !hasOrderedFiniteInterval(diagnostic?.comparison_xi_midpoint_span ?? []) ||
    diagnostic?.polynomial_degree !== 2 ||
    !terminalIndexesMatch
  ) {
    errors.push("terminal eta graph parameters must describe the live local N38 stencil");
  }
  const rows = diagnostic?.terminal_eta_graph_rows ?? [];
  if (
    !Array.isArray(rows) ||
    rows.length !== 5 ||
    !rows.every((row) => {
      const topRows = row.top_eta_transport_width_rows ?? [];
      return (
        row.coordinate_route === "sigma-eta-before-h-row-substitution" &&
        row.h38_solve_target_zeroed === true &&
        row.y_order === H38_NUMERATOR_Y_ORDER &&
        Array.isArray(row.terminal_provider_h_indexes) &&
        row.terminal_provider_h_indexes[0] === 37 &&
        row.terminal_provider_h_indexes[1] === 36 &&
        row.terminal_provider_h_indexes[2] === 35 &&
        Array.isArray(row.nonterminal_provider_h_indexes) &&
        row.nonterminal_provider_h_indexes_exclude_terminal === true &&
        !row.nonterminal_provider_h_indexes.some((hIndex) =>
          row.terminal_provider_h_indexes.includes(hIndex)
        ) &&
        replayValid(row.terminal_replay, "terminal-active-eta-h-row-replay") &&
        replayValid(
          row.nonterminal_replay,
          "nonterminal-active-eta-h-row-replay"
        ) &&
        replayValid(
          row.terminal_graph_replay,
          "terminal-polynomial-graph-frozen-nonterminal-replay"
        ) &&
        replayValid(
          row.terminal_graph_with_nonterminal_replay,
          "terminal-polynomial-graph-active-nonterminal-replay"
        ) &&
        replayValid(
          row.terminal_graph_interval_residual_replay,
          "terminal-polynomial-graph-interval-residual-frozen-nonterminal-replay"
        ) &&
        finitePositive(row.terminal_width_share_of_all) &&
        row.terminal_width_share_of_all > 0.95 &&
        finitePositive(row.nonterminal_width_share_of_all) &&
        row.nonterminal_width_share_of_all < 0.05 &&
        finitePositive(row.terminal_plus_nonterminal_width_share_of_all) &&
        row.terminal_plus_nonterminal_width_share_of_all > 0.999 &&
        finitePositive(row.terminal_graph_width_share_of_terminal) &&
        row.terminal_graph_width_share_of_terminal < 1e-6 &&
        finitePositive(row.terminal_graph_with_nonterminal_width_share_of_all) &&
        row.terminal_graph_with_nonterminal_width_share_of_all < 0.05 &&
        finitePositive(
          row.terminal_graph_interval_residual_width_share_of_terminal
        ) &&
        row.terminal_graph_interval_residual_width_share_of_terminal > 0.9 &&
        row.terminal_replay.full_source_width >
          row.nonterminal_replay.full_source_width &&
        row.terminal_graph_reduces_terminal_width === true &&
        row.terminal_graph_with_nonterminal_below_nonterminal_wall === true &&
        row.terminal_interval_residual_recreates_terminal_width === true &&
        Array.isArray(row.terminal_graph_intervals) &&
        row.terminal_graph_intervals.length === 3 &&
        row.terminal_graph_intervals.every(
          (entry) =>
            row.terminal_provider_h_indexes.includes(entry.h_index) &&
            entry.polynomial_degree === 2 &&
            hasOrderedFiniteInterval(entry.graph_interval) &&
            finitePositive(entry.graph_width) &&
            finitePositive(entry.producer_interval_width) &&
            finitePositive(entry.graph_to_producer_width_ratio) &&
            entry.graph_to_producer_width_ratio < 1e-6 &&
            hasOrderedFiniteInterval(
              entry.graph_plus_interval_residual_interval
            ) &&
            finitePositive(entry.interval_residual_width_ratio_to_producer) &&
            entry.interval_residual_width_ratio_to_producer > 0.9
        ) &&
        Array.isArray(topRows) &&
        topRows[0]?.active_h_index === 37 &&
        topRows[1]?.active_h_index === 36 &&
        topRows[2]?.active_h_index === 35 &&
        row.h38_one_active_replay_matches_frozen === true &&
        row.one_active_eta_h_row_replays?.[
          THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h38_index
        ]?.active_h_width === 0 &&
        row.terminal_eta_graph_route_interpretation ===
          "terminal-polynomial-graph-collapses-terminal-eta-width-candidate"
      );
    })
  ) {
    errors.push("terminal eta graph rows must isolate terminal width and show graph-only collapse with raw residual no-go");
  }
  const summary = diagnostic?.terminal_eta_graph_summary;
  if (
    summary?.row_count !== 5 ||
    !Array.isArray(summary?.terminal_provider_h_indexes) ||
    summary.terminal_provider_h_indexes[0] !== 37 ||
    summary.terminal_provider_h_indexes[1] !== 36 ||
    summary.terminal_provider_h_indexes[2] !== 35 ||
    summary?.nonterminal_provider_h_indexes_exclude_terminal !== true ||
    summary?.all_rows_positive_xi_stencil !== true ||
    summary?.all_rows_h38_solve_target_zeroed !== true ||
    summary?.all_rows_form_sigma_before_h_row_substitution !== true ||
    summary?.all_rows_terminal_rows_dominate !== true ||
    summary?.all_rows_terminal_replay_exceeds_nonterminal_replay !== true ||
    summary?.all_rows_terminal_plus_nonterminal_replay_covers_all_active_width !==
      true ||
    summary?.all_rows_terminal_graph_reduces_terminal_width !== true ||
    summary?.all_rows_terminal_graph_with_nonterminal_below_nonterminal_wall !==
      true ||
    summary?.all_rows_terminal_interval_residual_recreates_terminal_width !==
      true ||
    summary?.h38_one_active_replay_matches_frozen !== true ||
    !finitePositive(summary?.min_terminal_width_share_of_all) ||
    summary.min_terminal_width_share_of_all <= 0.95 ||
    !finitePositive(summary?.max_nonterminal_width_share_of_all) ||
    summary.max_nonterminal_width_share_of_all >= 0.05 ||
    !finitePositive(summary?.min_terminal_plus_nonterminal_width_share_of_all) ||
    summary.min_terminal_plus_nonterminal_width_share_of_all <= 0.999 ||
    !finitePositive(summary?.max_terminal_graph_width_share_of_terminal) ||
    summary.max_terminal_graph_width_share_of_terminal >= 1e-6 ||
    !finitePositive(
      summary?.max_terminal_graph_with_nonterminal_width_share_of_all
    ) ||
    summary.max_terminal_graph_with_nonterminal_width_share_of_all >= 0.05 ||
    !finitePositive(
      summary?.min_terminal_graph_interval_residual_width_share_of_terminal
    ) ||
    summary.min_terminal_graph_interval_residual_width_share_of_terminal <=
      0.9 ||
    summary?.route_interpretation !==
      "terminal-polynomial-graph-collapses-localized-eta-width-candidate"
  ) {
    errors.push("terminal eta graph summary must classify graph-only collapse and raw residual obstruction");
  }
  if (
    diagnostic?.n38_terminal_eta_graph_diagnosis !==
    "terminal-row-polynomial-graph-is-next-certificate-route"
  ) {
    errors.push("terminal eta graph diagnosis must identify the next certificate route");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_expression_level_n38_provider !==
      false ||
    diagnostic?.claim_boundary?.certifies_terminal_row_provider_enclosure !==
      false ||
    diagnostic?.claim_boundary?.certifies_eta_transport_enclosure !== false ||
    diagnostic?.claim_boundary?.certifies_reduced_source_enclosure !== false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep terminal eta graph diagnostic candidate-only");
  }
  return errors;
}

export function validateH39H38ExpressionN38TerminalGraphRemainderBudgetDiagnostic(
  diagnostic
) {
  const errors = [];
  const hasOrderedFiniteInterval = (interval) =>
    Array.isArray(interval) &&
    interval.length === 2 &&
    Number.isFinite(Number(interval[0])) &&
    Number.isFinite(Number(interval[1])) &&
    Number(interval[1]) > Number(interval[0]);
  const terminalIndexes = diagnostic?.terminal_provider_h_indexes ?? [];
  const terminalIndexesMatch =
    Array.isArray(terminalIndexes) &&
    terminalIndexes.length === 3 &&
    terminalIndexes[0] === 37 &&
    terminalIndexes[1] === 36 &&
    terminalIndexes[2] === 35;
  const replayValid = (replay, mode) =>
    replay?.eta_transport_mode === mode &&
    replay?.h38_solve_target_zeroed === true &&
    replay?.coordinate_route === "sigma-eta-before-h-row-substitution" &&
    replay?.sigma_h_tail_max_abs_upper === 0 &&
    replay?.sigma_y2_coefficient === -1 &&
    finiteNonnegative(replay?.eta_h_tail_max_width) &&
    finitePositive(replay?.full_source_width) &&
    hasOrderedFiniteInterval(replay?.full_source_coefficient_interval);
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TERMINAL_GRAPH_REMAINDER_BUDGET_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 h38 expression N38 terminal graph remainder budget diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-h38-expression-n38-terminal-graph-remainder-budget-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate terminal graph remainder budget diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h38-expression-n38-terminal-graph-remainder-budget-diagnostic"
  ) {
    errors.push("evaluation level must identify terminal graph remainder budget diagnostic");
  }
  if (
    diagnostic?.h38_numerator_y_order !== H38_NUMERATOR_Y_ORDER ||
    diagnostic?.proof_status !==
      "finite-terminal-graph-remainder-budget-not-directed-rounded-provider-certificate" ||
    !Number.isInteger(diagnostic?.source_stencil_subcell_count) ||
    diagnostic.source_stencil_subcell_count < 5 ||
    !Number.isInteger(diagnostic?.comparison_stencil_index) ||
    diagnostic.comparison_stencil_index < 0 ||
    !hasOrderedFiniteInterval(diagnostic?.comparison_xi_midpoint_span ?? []) ||
    diagnostic?.polynomial_degree !== 2 ||
    !terminalIndexesMatch ||
    !finitePositive(diagnostic?.residual_budget_target_share_of_all) ||
    diagnostic.residual_budget_target_share_of_all >= 1 ||
    !Array.isArray(diagnostic?.residual_budget_scales) ||
    diagnostic.residual_budget_scales[0] !== 0 ||
    diagnostic.residual_budget_scales[
      diagnostic.residual_budget_scales.length - 1
    ] !== 1 ||
    !Array.isArray(diagnostic?.residual_noise_samples) ||
    diagnostic.residual_noise_samples[0] !== -1 ||
    diagnostic.residual_noise_samples[
      diagnostic.residual_noise_samples.length - 1
    ] !== 1 ||
    !Number.isInteger(diagnostic?.residual_coordinate_partition_count) ||
    diagnostic.residual_coordinate_partition_count < 2 ||
    diagnostic.residual_coordinate_partition_count > 64 ||
    !Array.isArray(diagnostic?.refinement_subcell_counts) ||
    diagnostic.refinement_subcell_counts.length < 1 ||
    diagnostic.refinement_subcell_counts[0] !==
      diagnostic.source_stencil_subcell_count
  ) {
    errors.push("terminal graph remainder budget parameters must describe the live local N38 stencil");
  }
  const rows = diagnostic?.terminal_graph_remainder_budget_rows ?? [];
  const targetShare = Number(diagnostic?.residual_budget_target_share_of_all);
  const partitionReplayValid = (partition) =>
    Number.isInteger(partition?.partition_index) &&
    hasOrderedFiniteInterval(partition?.residual_noise_interval) &&
    replayValid(
      partition?.replay,
      "terminal-polynomial-graph-shared-residual-partition-active-nonterminal-replay"
    ) &&
    finitePositive(partition?.full_source_width) &&
    finitePositive(partition?.full_source_width_share_of_all) &&
    typeof partition?.under_target === "boolean";
  const intervalPartitionDiagnosticValid = (partitionDiagnostic, expected) =>
    partitionDiagnostic?.residual_coordinate_partition_count ===
      diagnostic?.residual_coordinate_partition_count &&
    Array.isArray(partitionDiagnostic?.partition_replays) &&
    partitionDiagnostic.partition_replays.length ===
      diagnostic.residual_coordinate_partition_count &&
    partitionDiagnostic.partition_replays.every(partitionReplayValid) &&
    partitionDiagnostic?.all_partitions_under_target === expected &&
    finitePositive(partitionDiagnostic?.max_partition_width_share_of_all) &&
    partitionDiagnostic.max_partition_width_share_of_all > 0.1 &&
    partitionDiagnostic.max_partition_width_share_of_all < 0.25 &&
    partitionDiagnostic?.route_interpretation ===
      "shared-terminal-residual-coordinate-partition-slices-over-target";
  const endpointPartitionReplayValid = (partition) =>
    Number.isInteger(partition?.partition_index) &&
    hasOrderedFiniteInterval(partition?.residual_noise_interval) &&
    Array.isArray(partition?.endpoint_replays) &&
    partition.endpoint_replays.length === 2 &&
    partition.endpoint_replays.every(
      (endpoint) =>
        Number.isFinite(Number(endpoint?.residual_noise)) &&
        replayValid(
          endpoint?.replay,
          "terminal-polynomial-graph-shared-residual-endpoint-partition-active-nonterminal-replay"
        )
    ) &&
    Number.isFinite(Number(partition?.midpoint_replay?.residual_noise)) &&
    replayValid(
      partition?.midpoint_replay?.replay,
      "terminal-polynomial-graph-shared-residual-midpoint-partition-active-nonterminal-replay"
    ) &&
    hasOrderedFiniteInterval(partition?.midpoint_linear_prediction_interval) &&
    hasOrderedFiniteInterval(partition?.midpoint_linearity_gap_interval) &&
    finiteNonnegative(partition?.midpoint_linearity_gap_abs_upper) &&
    partition?.midpoint_linearity_check_passed === true &&
    hasOrderedFiniteInterval(partition?.endpoint_coefficient_hull) &&
    finitePositive(partition?.endpoint_coefficient_hull_width) &&
    finitePositive(partition?.endpoint_coefficient_hull_width_share_of_all) &&
    hasOrderedFiniteInterval(partition?.affine_zeta_envelope?.zeta_interval) &&
    finitePositive(partition?.affine_zeta_envelope?.zeta_width) &&
    hasOrderedFiniteInterval(
      partition?.affine_zeta_envelope?.endpoint_coefficient_intervals?.left
    ) &&
    hasOrderedFiniteInterval(
      partition?.affine_zeta_envelope?.endpoint_coefficient_intervals?.right
    ) &&
    hasOrderedFiniteInterval(partition?.affine_zeta_envelope?.slope_interval) &&
    finiteNonnegative(partition?.affine_zeta_envelope?.slope_abs_upper) &&
    hasOrderedFiniteInterval(
      partition?.affine_zeta_envelope?.intercept_interval
    ) &&
    hasOrderedFiniteInterval(partition?.affine_zeta_envelope?.endpoint_hull) &&
    finitePositive(partition?.affine_zeta_envelope?.endpoint_hull_width) &&
    intervalEndpointRelativeGap(
      partition.affine_zeta_envelope.endpoint_hull,
      partition.endpoint_coefficient_hull
    ) < 1e-12 &&
    finitePositive(partition?.affine_zeta_envelope_width_share_of_all) &&
    partition.affine_zeta_envelope_width_share_of_all < targetShare &&
    partition?.affine_zeta_envelope_under_target === true &&
    typeof partition?.endpoint_hull_under_target === "boolean";
  const endpointPartitionDiagnosticValid = (partitionDiagnostic) =>
    partitionDiagnostic?.residual_coordinate_partition_count ===
      diagnostic?.residual_coordinate_partition_count &&
    Array.isArray(partitionDiagnostic?.partition_replays) &&
    partitionDiagnostic.partition_replays.length ===
      diagnostic.residual_coordinate_partition_count &&
    partitionDiagnostic.partition_replays.every(endpointPartitionReplayValid) &&
    partitionDiagnostic?.all_endpoint_partition_hulls_under_target === true &&
    finitePositive(
      partitionDiagnostic?.max_endpoint_partition_hull_width_share_of_all
    ) &&
    partitionDiagnostic.max_endpoint_partition_hull_width_share_of_all >
      0.04 &&
    partitionDiagnostic.max_endpoint_partition_hull_width_share_of_all <
      targetShare &&
    partitionDiagnostic?.all_affine_zeta_envelopes_under_target === true &&
    finitePositive(
      partitionDiagnostic?.max_affine_zeta_envelope_width_share_of_all
    ) &&
    partitionDiagnostic.max_affine_zeta_envelope_width_share_of_all > 0.04 &&
    partitionDiagnostic.max_affine_zeta_envelope_width_share_of_all <
      targetShare &&
    finiteNonnegative(
      partitionDiagnostic?.max_affine_zeta_envelope_slope_abs_upper
    ) &&
    partitionDiagnostic?.terminal_zeta_degree_bound
      ?.affine_in_shared_residual_coordinate === true &&
    partitionDiagnostic?.terminal_zeta_degree_bound
      ?.source_coefficient_y_order === H38_NUMERATOR_Y_ORDER &&
    partitionDiagnostic?.terminal_zeta_degree_bound
      ?.min_terminal_y_order === 38 &&
    partitionDiagnostic?.terminal_zeta_degree_bound
      ?.two_terminal_factor_min_y_order === 76 &&
    partitionDiagnostic?.terminal_zeta_degree_bound
      ?.max_shared_residual_power_by_y_order === 1 &&
    partitionDiagnostic?.terminal_zeta_degree_bound?.route_interpretation ===
      "shared-terminal-residual-zeta-affine-by-y-order-gap" &&
    partitionDiagnostic?.endpoint_control_candidate === true &&
    partitionDiagnostic?.route_interpretation ===
      "shared-terminal-residual-coordinate-affine-endpoint-partitions-under-target";
  if (
    !Array.isArray(rows) ||
    rows.length !== 5 ||
    !rows.every((row) => {
      const scaleZero = row.residual_scale_sweep?.find(
        (entry) => entry.residual_scale === 0
      );
      const scaleOne = row.residual_scale_sweep?.find(
        (entry) => entry.residual_scale === 1
      );
      return (
        row.coordinate_route === "sigma-eta-before-h-row-substitution" &&
        row.h38_solve_target_zeroed === true &&
        row.y_order === H38_NUMERATOR_Y_ORDER &&
        Array.isArray(row.terminal_provider_h_indexes) &&
        row.terminal_provider_h_indexes[0] === 37 &&
        row.terminal_provider_h_indexes[1] === 36 &&
        row.terminal_provider_h_indexes[2] === 35 &&
        replayValid(
          row.terminal_graph_symmetric_residual_scale_one_replay,
          "terminal-polynomial-graph-symmetric-residual-active-nonterminal-replay"
        ) &&
        replayValid(
          row.terminal_graph_interval_residual_with_nonterminal_replay,
          "terminal-polynomial-graph-interval-residual-active-nonterminal-replay"
        ) &&
        finitePositive(row.terminal_width_share_of_all) &&
        row.terminal_width_share_of_all > 0.95 &&
        finitePositive(row.nonterminal_width_share_of_all) &&
        row.nonterminal_width_share_of_all < targetShare &&
        finitePositive(row.terminal_graph_with_nonterminal_width_share_of_all) &&
        row.terminal_graph_with_nonterminal_width_share_of_all < targetShare &&
        finitePositive(row.residual_budget_target_width) &&
        finitePositive(row.allowed_symmetric_raw_residual_scale_for_target) &&
        row.allowed_symmetric_raw_residual_scale_for_target > 0 &&
        row.allowed_symmetric_raw_residual_scale_for_target < 1 &&
        finiteNonnegative(row.max_midpoint_fit_residual_scale_to_raw) &&
        row.max_midpoint_fit_residual_scale_to_raw <
          row.allowed_symmetric_raw_residual_scale_for_target &&
        row.graph_plus_nonterminal_under_target === true &&
        row.symmetric_raw_residual_scale_one_over_target === true &&
        row.raw_interval_residual_with_nonterminal_over_target === true &&
        row.shared_residual_sample_hull_under_target === false &&
        row.correlated_terminal_residual_under_target === false &&
        row.correlated_terminal_residual_collapse_candidate === false &&
        finitePositive(
          row.max_terminal_graph_correlated_residual_width_share_of_all
        ) &&
        row.max_terminal_graph_correlated_residual_width_share_of_all <
          targetShare &&
        finitePositive(
          row.interval_to_correlated_terminal_residual_width_ratio
        ) &&
        row.interval_to_correlated_terminal_residual_width_ratio > 5 &&
        row.interval_to_correlated_terminal_residual_width_ratio < 6 &&
        row.terminal_graph_shared_residual_sample_diagnostic
          ?.sample_coefficient_hull_under_target === false &&
        finitePositive(
          row.terminal_graph_shared_residual_sample_diagnostic
            ?.sample_coefficient_hull_width_share_of_all
        ) &&
        row.terminal_graph_shared_residual_sample_diagnostic
          .sample_coefficient_hull_width_share_of_all > 0.1 &&
        row.terminal_graph_shared_residual_sample_diagnostic
          .sample_coefficient_hull_width_share_of_all < 0.25 &&
        row.terminal_graph_shared_residual_sample_diagnostic
          ?.route_interpretation ===
          "shared-terminal-residual-coordinate-needs-small-partition" &&
        Number.isInteger(
          row.terminal_graph_shared_residual_sample_diagnostic
            ?.projected_residual_coordinate_partition_count_for_target
        ) &&
        row.terminal_graph_shared_residual_sample_diagnostic
          .projected_residual_coordinate_partition_count_for_target > 1 &&
        row.terminal_graph_shared_residual_sample_diagnostic
          .projected_residual_coordinate_partition_count_for_target <= 16 &&
        finitePositive(
          row.terminal_graph_shared_residual_sample_diagnostic
            ?.projected_residual_coordinate_partitioned_hull_width_share_of_all
        ) &&
        row.terminal_graph_shared_residual_sample_diagnostic
          .projected_residual_coordinate_partitioned_hull_width_share_of_all <
          targetShare &&
        intervalPartitionDiagnosticValid(
          row.terminal_graph_shared_residual_point_partition_diagnostic,
          false
        ) &&
        intervalPartitionDiagnosticValid(
          row.terminal_graph_shared_residual_graph_partition_diagnostic,
          false
        ) &&
        endpointPartitionDiagnosticValid(
          row.terminal_graph_shared_residual_point_endpoint_partition_diagnostic
        ) &&
        endpointPartitionDiagnosticValid(
          row.terminal_graph_shared_residual_graph_endpoint_partition_diagnostic
        ) &&
        row.terminal_graph_correlated_residual_partition_count ===
          diagnostic.residual_coordinate_partition_count &&
        row.terminal_graph_correlated_residual_graph_partition_count ===
          diagnostic.residual_coordinate_partition_count &&
        row.correlated_terminal_residual_partitions_under_target ===
          false &&
        row.correlated_terminal_residual_graph_partitions_under_target ===
          false &&
        row.correlated_terminal_residual_endpoint_partitions_under_target ===
          true &&
        row
          .correlated_terminal_residual_graph_endpoint_partitions_under_target ===
          true &&
        row.correlated_terminal_residual_affine_envelopes_under_target ===
          true &&
        row
          .correlated_terminal_residual_graph_affine_envelopes_under_target ===
          true &&
        finitePositive(
          row.max_terminal_graph_correlated_residual_partition_width_share_of_all
        ) &&
        row.max_terminal_graph_correlated_residual_partition_width_share_of_all >
          0.1 &&
        row.max_terminal_graph_correlated_residual_partition_width_share_of_all <
          0.25 &&
        finitePositive(
          row
            .max_terminal_graph_correlated_residual_graph_partition_width_share_of_all
        ) &&
        row
          .max_terminal_graph_correlated_residual_graph_partition_width_share_of_all >
          0.1 &&
        row
          .max_terminal_graph_correlated_residual_graph_partition_width_share_of_all <
          0.25 &&
        finitePositive(
          row
            .max_terminal_graph_correlated_residual_endpoint_partition_width_share_of_all
        ) &&
        row
          .max_terminal_graph_correlated_residual_endpoint_partition_width_share_of_all <
          targetShare &&
        finitePositive(
          row
            .max_terminal_graph_correlated_residual_graph_endpoint_partition_width_share_of_all
        ) &&
        row
          .max_terminal_graph_correlated_residual_graph_endpoint_partition_width_share_of_all <
          targetShare &&
        finitePositive(
          row
            .max_terminal_graph_correlated_residual_affine_envelope_width_share_of_all
        ) &&
        row
          .max_terminal_graph_correlated_residual_affine_envelope_width_share_of_all <
          targetShare &&
        finitePositive(
          row
            .max_terminal_graph_correlated_residual_graph_affine_envelope_width_share_of_all
        ) &&
        row
          .max_terminal_graph_correlated_residual_graph_affine_envelope_width_share_of_all <
          targetShare &&
        finiteNonnegative(
          row
            .max_terminal_graph_correlated_residual_affine_envelope_slope_abs_upper
        ) &&
        finiteNonnegative(
          row
            .max_terminal_graph_correlated_residual_graph_affine_envelope_slope_abs_upper
        ) &&
        row.terminal_graph_shared_residual_zeta_degree_bound
          ?.affine_in_shared_residual_coordinate === true &&
        row.terminal_graph_shared_residual_zeta_degree_bound
          ?.source_coefficient_y_order === H38_NUMERATOR_Y_ORDER &&
        row.terminal_graph_shared_residual_zeta_degree_bound
          ?.min_terminal_y_order === 38 &&
        row.terminal_graph_shared_residual_zeta_degree_bound
          ?.two_terminal_factor_min_y_order === 76 &&
        row.terminal_graph_shared_residual_zeta_degree_bound
          ?.max_shared_residual_power_by_y_order === 1 &&
        row.terminal_graph_shared_residual_zeta_degree_bound
          ?.route_interpretation ===
          "shared-terminal-residual-zeta-affine-by-y-order-gap" &&
        row.correlated_terminal_residual_affine_endpoint_control_candidate ===
          true &&
        row.residual_coordinate_partition_route_interpretation ===
          "shared-terminal-residual-coordinate-affine-endpoint-partition-closes-graph-xi-candidate" &&
        Array.isArray(
          row.terminal_graph_correlated_residual_sample_replays
        ) &&
        row.terminal_graph_correlated_residual_sample_replays.length ===
          diagnostic.residual_noise_samples.length &&
        row.terminal_graph_correlated_residual_sample_replays.every(
          (sample) =>
            diagnostic.residual_noise_samples.includes(
              sample.residual_noise
            ) &&
            sample.replay.h38_solve_target_zeroed === true &&
            sample.replay.coordinate_route ===
              "sigma-eta-before-h-row-substitution" &&
            sample.replay.sigma_h_tail_max_abs_upper === 0 &&
            finitePositive(sample.replay.full_source_width)
        ) &&
        row.midpoint_fit_residual_below_symmetric_budget === true &&
        row.all_terminal_producer_intervals_contained_by_allowed_budget ===
          false &&
        row.all_terminal_midpoint_fit_residuals_inside_allowed_budget ===
          true &&
        finitePositive(row.max_required_scale_to_allowed_scale_ratio) &&
        row.max_required_scale_to_allowed_scale_ratio > 1 &&
        finitePositive(row.min_allowed_radius_to_producer_half_width_ratio) &&
        row.min_allowed_radius_to_producer_half_width_ratio < 1 &&
        finiteNonnegative(
          row.max_midpoint_fit_residual_to_allowed_radius_ratio
        ) &&
        row.max_midpoint_fit_residual_to_allowed_radius_ratio < 1 &&
        finitePositive(
          row.terminal_graph_interval_residual_width_share_of_terminal
        ) &&
        row.terminal_graph_interval_residual_width_share_of_terminal > 0.9 &&
        Array.isArray(row.terminal_graph_remainder_budget_entries) &&
        row.terminal_graph_remainder_budget_entries.length === 3 &&
        row.terminal_graph_remainder_budget_entries.every(
          (entry) =>
            row.terminal_provider_h_indexes.includes(entry.h_index) &&
            hasOrderedFiniteInterval(entry.raw_residual_interval_hull) &&
            finitePositive(entry.raw_residual_abs_upper) &&
            hasOrderedFiniteInterval(entry.graph_interval) &&
            hasOrderedFiniteInterval(entry.producer_interval) &&
            hasOrderedFiniteInterval(entry.budgeted_graph_interval) &&
            hasOrderedFiniteInterval(entry.row_residual_interval) &&
            finitePositive(entry.row_residual_abs_upper) &&
            finitePositive(
              entry.allowed_residual_radius_for_source_budget
            ) &&
            entry.producer_interval_contained_by_budget === false &&
            finitePositive(
              entry.required_symmetric_raw_residual_scale_to_cover_row
            ) &&
            finitePositive(entry.required_scale_to_allowed_scale_ratio) &&
            entry.required_scale_to_allowed_scale_ratio > 1 &&
            finitePositive(entry.producer_interval_half_width) &&
            finitePositive(entry.allowed_radius_to_producer_half_width_ratio) &&
            entry.allowed_radius_to_producer_half_width_ratio < 1 &&
            finiteNonnegative(entry.midpoint_fit_max_abs_residual) &&
            finiteNonnegative(entry.midpoint_fit_residual_scale_to_raw) &&
            finiteNonnegative(
              entry.midpoint_fit_residual_to_allowed_radius_ratio
            ) &&
            entry.midpoint_fit_residual_to_allowed_radius_ratio < 1 &&
            entry.midpoint_fit_residual_inside_allowed_budget === true
        ) &&
        Array.isArray(row.residual_scale_sweep) &&
        row.residual_scale_sweep.length ===
          diagnostic.residual_budget_scales.length &&
        scaleZero?.under_target === true &&
        scaleOne?.under_target === false &&
        row.residual_scale_sweep.every(
          (entry) =>
            Number.isFinite(Number(entry.residual_scale)) &&
            finitePositive(entry.full_source_width) &&
            finitePositive(entry.full_source_width_share_of_all) &&
            typeof entry.under_target === "boolean"
        ) &&
        row.terminal_graph_remainder_budget_route_interpretation ===
          "terminal-graph-remainder-budget-localizes-obstruction-to-producer-interval-width"
      );
    })
  ) {
    errors.push("terminal graph remainder budget rows must quantify finite residual budget without certifying the provider");
  }
  const summary = diagnostic?.terminal_graph_remainder_budget_summary;
  if (
    summary?.row_count !== 5 ||
    !Array.isArray(summary?.terminal_provider_h_indexes) ||
    summary.terminal_provider_h_indexes[0] !== 37 ||
    summary.terminal_provider_h_indexes[1] !== 36 ||
    summary.terminal_provider_h_indexes[2] !== 35 ||
    summary?.all_rows_positive_xi_stencil !== true ||
    summary?.all_rows_h38_solve_target_zeroed !== true ||
    summary?.all_rows_form_sigma_before_h_row_substitution !== true ||
    summary?.all_rows_terminal_rows_dominate !== true ||
    summary?.all_rows_graph_plus_nonterminal_under_target !== true ||
    summary?.all_rows_raw_interval_residual_over_target !== true ||
    summary?.all_rows_symmetric_raw_residual_scale_one_over_target !==
      true ||
    summary?.all_rows_have_finite_residual_scale_budget !== true ||
    summary?.all_rows_midpoint_fit_residual_below_symmetric_budget !==
      true ||
    summary?.all_rows_producer_intervals_contained_by_allowed_budget !==
      false ||
    summary?.all_rows_producer_interval_budget_no_go !== true ||
    summary?.all_rows_midpoint_fit_residuals_inside_allowed_budget !==
      true ||
    summary?.all_rows_shared_residual_sample_hull_under_target !== false ||
    summary?.all_rows_correlated_terminal_residual_under_target !== false ||
    summary?.all_rows_correlated_terminal_residual_partitions_under_target !==
      false ||
    summary
      ?.all_rows_correlated_terminal_residual_graph_partitions_under_target !==
      false ||
    summary
      ?.all_rows_correlated_terminal_residual_endpoint_partitions_under_target !==
      true ||
    summary
      ?.all_rows_correlated_terminal_residual_graph_endpoint_partitions_under_target !==
      true ||
    summary
      ?.all_rows_correlated_terminal_residual_affine_envelopes_under_target !==
      true ||
    summary
      ?.all_rows_correlated_terminal_residual_graph_affine_envelopes_under_target !==
      true ||
    summary
      ?.all_rows_correlated_terminal_residual_midpoint_linearity_checks_pass !==
      true ||
    summary
      ?.all_rows_correlated_terminal_residual_graph_midpoint_linearity_checks_pass !==
      true ||
    summary?.all_rows_correlated_terminal_residual_affine_endpoint_control !==
      true ||
    summary?.terminal_zeta_degree_bound_summary
      ?.source_coefficient_y_order !== H38_NUMERATOR_Y_ORDER ||
    summary?.terminal_zeta_degree_bound_summary
      ?.max_shared_residual_power_by_y_order !== 1 ||
    summary?.terminal_zeta_degree_bound_summary
      ?.min_two_terminal_factor_gap_to_source_order !== 34 ||
    summary?.terminal_zeta_degree_bound_summary
      ?.all_rows_affine_in_shared_residual_coordinate !== true ||
    summary?.terminal_zeta_degree_bound_summary?.route_interpretation !==
      "shared-terminal-residual-zeta-affine-by-y-order-gap" ||
    !finitePositive(summary?.min_terminal_width_share_of_all) ||
    summary.min_terminal_width_share_of_all <= 0.95 ||
    !finitePositive(summary?.max_nonterminal_width_share_of_all) ||
    summary.max_nonterminal_width_share_of_all >= targetShare ||
    !finitePositive(
      summary?.max_graph_plus_nonterminal_width_share_of_all
    ) ||
    summary.max_graph_plus_nonterminal_width_share_of_all >= targetShare ||
    !finitePositive(
      summary?.min_allowed_symmetric_raw_residual_scale_for_target
    ) ||
    summary.min_allowed_symmetric_raw_residual_scale_for_target <= 0 ||
    !finitePositive(
      summary?.max_allowed_symmetric_raw_residual_scale_for_target
    ) ||
    summary.max_allowed_symmetric_raw_residual_scale_for_target >= 1 ||
    !finiteNonnegative(summary?.max_midpoint_fit_residual_scale_to_raw) ||
    summary.max_midpoint_fit_residual_scale_to_raw >=
      summary.min_allowed_symmetric_raw_residual_scale_for_target ||
    !finitePositive(summary?.max_required_scale_to_allowed_scale_ratio) ||
    summary.max_required_scale_to_allowed_scale_ratio <= 1 ||
    !finitePositive(
      summary?.max_shared_residual_sample_hull_width_share_of_all
    ) ||
    summary.max_shared_residual_sample_hull_width_share_of_all <= 0.1 ||
    summary.max_shared_residual_sample_hull_width_share_of_all >= 0.25 ||
    !finitePositive(
      summary?.min_interval_to_shared_residual_sample_hull_width_ratio
    ) ||
    summary.min_interval_to_shared_residual_sample_hull_width_ratio <= 5 ||
    summary.min_interval_to_shared_residual_sample_hull_width_ratio >= 6 ||
    !finitePositive(
      summary?.max_correlated_terminal_residual_width_share_of_all
    ) ||
    summary.max_correlated_terminal_residual_width_share_of_all >=
      targetShare ||
    !finitePositive(
      summary?.min_interval_to_correlated_terminal_residual_width_ratio
    ) ||
    summary.min_interval_to_correlated_terminal_residual_width_ratio <= 5 ||
    summary.min_interval_to_correlated_terminal_residual_width_ratio >= 6 ||
    summary?.correlated_terminal_residual_route_interpretation !==
      "shared-terminal-residual-coordinate-needs-small-partition" ||
    !Number.isInteger(
      summary?.max_projected_residual_coordinate_partition_count_for_target
    ) ||
    summary.max_projected_residual_coordinate_partition_count_for_target <=
      1 ||
    summary.max_projected_residual_coordinate_partition_count_for_target >
      16 ||
    !finitePositive(
      summary
        ?.max_projected_residual_coordinate_partitioned_hull_width_share_of_all
    ) ||
    summary
      .max_projected_residual_coordinate_partitioned_hull_width_share_of_all >=
      targetShare ||
    summary?.max_residual_coordinate_partition_count !==
      diagnostic.residual_coordinate_partition_count ||
    summary?.max_graph_residual_coordinate_partition_count !==
      diagnostic.residual_coordinate_partition_count ||
    !finitePositive(
      summary?.max_correlated_terminal_residual_partition_width_share_of_all
    ) ||
    summary.max_correlated_terminal_residual_partition_width_share_of_all <=
      0.1 ||
    summary.max_correlated_terminal_residual_partition_width_share_of_all >=
      0.25 ||
    !finitePositive(
      summary
        ?.max_correlated_terminal_residual_graph_partition_width_share_of_all
    ) ||
    summary.max_correlated_terminal_residual_graph_partition_width_share_of_all <=
      0.1 ||
    summary.max_correlated_terminal_residual_graph_partition_width_share_of_all >=
      0.25 ||
    !finitePositive(
      summary
        ?.max_correlated_terminal_residual_endpoint_partition_width_share_of_all
    ) ||
    summary.max_correlated_terminal_residual_endpoint_partition_width_share_of_all <=
      0.04 ||
    summary.max_correlated_terminal_residual_endpoint_partition_width_share_of_all >=
      targetShare ||
    !finitePositive(
      summary
        ?.max_correlated_terminal_residual_graph_endpoint_partition_width_share_of_all
    ) ||
    summary.max_correlated_terminal_residual_graph_endpoint_partition_width_share_of_all <=
      0.04 ||
    summary.max_correlated_terminal_residual_graph_endpoint_partition_width_share_of_all >=
      targetShare ||
    !finitePositive(
      summary?.max_correlated_terminal_residual_affine_envelope_width_share_of_all
    ) ||
    summary.max_correlated_terminal_residual_affine_envelope_width_share_of_all <=
      0.04 ||
    summary.max_correlated_terminal_residual_affine_envelope_width_share_of_all >=
      targetShare ||
    !finitePositive(
      summary
        ?.max_correlated_terminal_residual_graph_affine_envelope_width_share_of_all
    ) ||
    summary.max_correlated_terminal_residual_graph_affine_envelope_width_share_of_all <=
      0.04 ||
    summary.max_correlated_terminal_residual_graph_affine_envelope_width_share_of_all >=
      targetShare ||
    !finiteNonnegative(
      summary
        ?.max_correlated_terminal_residual_affine_envelope_slope_abs_upper
    ) ||
    !finiteNonnegative(
      summary
        ?.max_correlated_terminal_residual_graph_affine_envelope_slope_abs_upper
    ) ||
    !finiteNonnegative(
      summary?.max_correlated_terminal_residual_midpoint_linearity_gap_abs_upper
    ) ||
    !finiteNonnegative(
      summary
        ?.max_correlated_terminal_residual_graph_midpoint_linearity_gap_abs_upper
    ) ||
    summary?.correlated_terminal_residual_partition_route_interpretation !==
      "shared-terminal-residual-coordinate-affine-endpoint-partition-closes-graph-xi-candidate" ||
    !finitePositive(
      summary?.min_allowed_radius_to_producer_half_width_ratio
    ) ||
    summary.min_allowed_radius_to_producer_half_width_ratio >= 1 ||
    !finiteNonnegative(
      summary?.max_midpoint_fit_residual_to_allowed_radius_ratio
    ) ||
    summary.max_midpoint_fit_residual_to_allowed_radius_ratio >= 1 ||
    !finitePositive(
      summary?.min_raw_interval_residual_width_share_of_terminal
    ) ||
    summary.min_raw_interval_residual_width_share_of_terminal <= 0.9 ||
    summary?.route_interpretation !==
      "terminal-graph-remainder-budget-localizes-enclosure-failure-to-producer-interval-width"
  ) {
    errors.push("terminal graph remainder budget summary must classify finite residual target and raw residual overbudget");
  }
  if (
    diagnostic?.n38_terminal_graph_remainder_budget_diagnosis !==
    "terminal-graph-remainder-affine-zeta-endpoint-partition-route-candidate"
  ) {
    errors.push("terminal graph remainder budget diagnosis must identify the next directed-rounded target");
  }
  const forecast = diagnostic?.terminal_producer_refinement_forecast;
  if (
    forecast?.base_subcell_count !== diagnostic?.source_stencil_subcell_count ||
    !Array.isArray(forecast?.refinement_subcell_counts) ||
    forecast.refinement_subcell_counts.length !==
      diagnostic.refinement_subcell_counts.length ||
    forecast.refinement_subcell_counts[0] !==
      diagnostic.source_stencil_subcell_count ||
    forecast?.comparison_window_row_count !== 5 ||
    !Array.isArray(forecast?.terminal_provider_h_indexes) ||
    forecast.terminal_provider_h_indexes[0] !== 37 ||
    forecast.terminal_provider_h_indexes[1] !== 36 ||
    forecast.terminal_provider_h_indexes[2] !== 35 ||
    !Array.isArray(forecast?.baseline_allowed_radius_by_h_index) ||
    forecast.baseline_allowed_radius_by_h_index.length !== 3 ||
    !forecast.baseline_allowed_radius_by_h_index.every(
      (entry) =>
        [37, 36, 35].includes(entry.h_index) &&
        finitePositive(entry.baseline_allowed_residual_radius)
    ) ||
    !Array.isArray(forecast?.refinement_rows) ||
    forecast.refinement_rows.length !==
      diagnostic.refinement_subcell_counts.length ||
    !forecast.refinement_rows.every(
      (row, index) =>
        row.subcell_count === diagnostic.refinement_subcell_counts[index] &&
        row.comparison_stencil_index === row.subcell_count - 5 &&
        Array.isArray(row.comparison_xi_midpoint_span) &&
        row.comparison_xi_midpoint_span.length === 2 &&
        row.terminal_entry_count === 15 &&
        Array.isArray(row.terminal_refinement_entries) &&
        row.terminal_refinement_entries.length === 15 &&
        finitePositive(row.max_terminal_row_residual_abs_upper) &&
        finitePositive(row.max_residual_to_baseline_allowed_radius_ratio) &&
        row.max_residual_to_baseline_allowed_radius_ratio > 1 &&
        finitePositive(row.min_residual_to_baseline_allowed_radius_ratio) &&
        row.min_residual_to_baseline_allowed_radius_ratio > 1 &&
        finitePositive(row.residual_width_ratio_to_base) &&
        row.all_terminal_entries_fit_baseline_allowed_radius === false &&
        row.terminal_refinement_entries.every(
          (entry) =>
            [37, 36, 35].includes(entry.h_index) &&
            hasOrderedFiniteInterval(entry.producer_interval) &&
            hasOrderedFiniteInterval(entry.graph_interval) &&
            hasOrderedFiniteInterval(entry.row_residual_interval) &&
            finitePositive(entry.row_residual_abs_upper) &&
            finitePositive(entry.producer_interval_half_width) &&
            finitePositive(entry.baseline_allowed_residual_radius) &&
            finitePositive(
              entry.residual_to_baseline_allowed_radius_ratio
            ) &&
            entry.residual_to_baseline_allowed_radius_ratio > 1 &&
            entry.producer_interval_contained_by_baseline_allowed_radius ===
              false
        )
    ) ||
    !finitePositive(forecast?.assumed_refinement_scaling_exponent) ||
    forecast.assumed_refinement_scaling_exponent !== 1 ||
    !finitePositive(forecast?.forecast_scaling_exponent_used) ||
    forecast.forecast_scaling_exponent_used <= 0.9 ||
    forecast.forecast_scaling_exponent_used >= 1.1 ||
    !finitePositive(
      forecast?.base_required_refinement_factor_to_fit_budget
    ) ||
    forecast.base_required_refinement_factor_to_fit_budget <= 1 ||
    !Number.isInteger(forecast?.projected_subcell_count_for_baseline_budget) ||
    forecast.projected_subcell_count_for_baseline_budget <=
      diagnostic.source_stencil_subcell_count ||
    !finitePositive(
      forecast?.projected_subcell_multiplier_for_baseline_budget
    ) ||
    forecast.projected_subcell_multiplier_for_baseline_budget <= 1 ||
    !finitePositive(forecast?.final_refined_ratio_to_baseline_budget) ||
    forecast.final_refined_ratio_to_baseline_budget <= 1 ||
    forecast?.final_refined_entries_fit_baseline_allowed_radius !== false ||
    forecast?.route_interpretation !==
      "linear-subcell-refinement-forecast-large-partition-needed"
  ) {
    errors.push("terminal producer refinement forecast must quantify the large local partition implied by the base producer interval gap");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_expression_level_n38_provider !==
      false ||
    diagnostic?.claim_boundary?.certifies_terminal_row_provider_enclosure !==
      false ||
    diagnostic?.claim_boundary?.certifies_terminal_graph_remainder_bound !==
      false ||
    diagnostic?.claim_boundary?.certifies_eta_transport_enclosure !== false ||
    diagnostic?.claim_boundary?.certifies_reduced_source_enclosure !== false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep terminal graph remainder budget candidate-only");
  }
  return errors;
}

export function validateH39H38ExpressionN38TaylorM4RefinementDiagnostic(
  diagnostic
) {
  const errors = [];
  if (
    diagnostic?.schema !==
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_H39_H38_EXPRESSION_N38_TAYLOR_M4_REFINEMENT_DIAGNOSTIC_SCHEMA
  ) {
    errors.push("schema must match h39 h38 expression N38 Taylor M4 refinement diagnostic");
  }
  if (
    diagnostic?.status !==
    "h39-h38-expression-n38-taylor-m4-refinement-diagnostic-candidate-emitted"
  ) {
    errors.push("status must identify a candidate expression-level N38 Taylor M4 refinement diagnostic");
  }
  if (
    diagnostic?.evaluation_level !==
    "candidate-h38-expression-n38-local-taylor-m4-refinement-diagnostic"
  ) {
    errors.push("evaluation level must identify expression-level N38 Taylor M4 refinement diagnostic");
  }
  if (diagnostic?.h38_numerator_y_order !== H38_NUMERATOR_Y_ORDER) {
    errors.push("H38 numerator y order must match the predecessor source coefficient");
  }
  if (
    diagnostic?.source_fourth_difference_diagnostic?.status !==
      "h39-h38-expression-n38-taylor-fourth-difference-diagnostic-candidate-emitted" ||
    diagnostic?.source_fourth_difference_diagnostic?.diagnosis !==
      "finite-fourth-difference-rejects-parent-residual-proxy-as-certificate" ||
    !Number.isInteger(
      diagnostic?.source_fourth_difference_diagnostic?.total_stencil_rows
    ) ||
    diagnostic.source_fourth_difference_diagnostic.total_stencil_rows <= 0 ||
    !finitePositive(
      diagnostic.source_fourth_difference_diagnostic
        .max_fourth_derivative_estimate
    ) ||
    !finitePositive(
      diagnostic.source_fourth_difference_diagnostic
        .max_fourth_derivative_to_required_ratio
    ) ||
    diagnostic.source_fourth_difference_diagnostic
      .max_fourth_derivative_to_required_ratio <= 1 ||
    !Number.isInteger(
      diagnostic.source_fourth_difference_diagnostic
        .max_retile_count_required_for_observed_fourth_difference
    ) ||
    diagnostic.source_fourth_difference_diagnostic
      .max_retile_count_required_for_observed_fourth_difference <= 0
  ) {
    errors.push("source fourth-difference diagnostic must expose a rejecting refinement stencil");
  }
  if (
    !diagnostic?.m4_refinement_parameters ||
    !Array.isArray(diagnostic.m4_refinement_parameters.components) ||
    diagnostic.m4_refinement_parameters.components.length === 0 ||
    !Array.isArray(
      diagnostic.m4_refinement_parameters.base_stencil_subcell_counts
    ) ||
    diagnostic.m4_refinement_parameters.base_stencil_subcell_counts.length ===
      0 ||
    !Array.isArray(
      diagnostic.m4_refinement_parameters.refinement_stencil_subcell_counts
    ) ||
    diagnostic.m4_refinement_parameters.refinement_stencil_subcell_counts
      .length <=
      diagnostic.m4_refinement_parameters.base_stencil_subcell_counts.length ||
    !diagnostic.m4_refinement_parameters.base_stencil_subcell_counts.every(
      (count) => Number.isInteger(count) && count >= 5
    ) ||
    !diagnostic.m4_refinement_parameters.refinement_stencil_subcell_counts.every(
      (count) => Number.isInteger(count) && count >= 5
    ) ||
    !finitePositive(
      diagnostic.m4_refinement_parameters.point_term_width_scale
    ) ||
    !finitePositive(
      diagnostic.m4_refinement_parameters.observed_m4_inflation_factor
    ) ||
    Number(diagnostic.m4_refinement_parameters.observed_m4_inflation_factor) <
      1 ||
    diagnostic.m4_refinement_parameters.proof_status !==
      "finite-difference-refinement-not-directed-rounded-enclosure"
  ) {
    errors.push("M4 refinement parameters must describe finite base and refinement stencils");
  }
  if (
    !Array.isArray(
      diagnostic?.m4_refinement_parameters?.source_term_components
    ) ||
    diagnostic.m4_refinement_parameters.source_term_components.length === 0 ||
    !Array.isArray(
      diagnostic?.m4_refinement_parameters?.fourth_difference_components
    ) ||
    !diagnostic.m4_refinement_parameters.components.every((component) =>
      diagnostic.m4_refinement_parameters.fourth_difference_components.includes(
        component
      )
    )
  ) {
    errors.push("M4 refinement parameters must expose source-term fourth-difference components");
  }
  const refinementRows = diagnostic?.component_m4_refinement_rows ?? [];
  const expectedComponents =
    diagnostic?.m4_refinement_parameters?.components ?? [];
  if (
    !Array.isArray(refinementRows) ||
    refinementRows.length !== expectedComponents.length ||
    !refinementRows.every(
      (row) =>
        expectedComponents.includes(row.component) &&
        diagnostic.m4_refinement_parameters.base_stencil_subcell_counts.includes(
          row.base_source_stencil_subcell_count
        ) &&
        diagnostic.m4_refinement_parameters
          .refinement_stencil_subcell_counts.includes(
            row.refined_source_stencil_subcell_count
          ) &&
        Number(row.refined_source_stencil_subcell_count) >=
          Number(row.base_source_stencil_subcell_count) &&
        finitePositive(row.base_observed_fourth_derivative_upper) &&
        finitePositive(row.refined_observed_fourth_derivative_upper) &&
        finitePositive(row.refined_to_base_observed_m4_ratio) &&
        row.refined_to_base_observed_m4_ratio > 1 &&
        finiteNonnegative(
          row.base_nonuniform_to_uniform_fourth_derivative_relative_gap
        ) &&
        finiteNonnegative(
          row.refined_nonuniform_to_uniform_fourth_derivative_relative_gap
        ) &&
        row.fourth_difference_growth_localization?.component ===
          row.component &&
        row.fourth_difference_growth_localization
          .base_source_stencil_subcell_count ===
          row.base_source_stencil_subcell_count &&
        row.fourth_difference_growth_localization
          .refined_source_stencil_subcell_count ===
          row.refined_source_stencil_subcell_count &&
        finitePositive(
          row.fourth_difference_growth_localization
            .refined_to_base_observed_m4_ratio
        ) &&
        row.fourth_difference_growth_localization
          .refined_to_base_observed_m4_ratio ===
          row.refined_to_base_observed_m4_ratio &&
        finitePositive(
          row.fourth_difference_growth_localization
            .observed_m4_growth_increment
        ) &&
        finiteNonnegative(
          row.fourth_difference_growth_localization
            .worst_stencil_xi_overlap_width
        ) &&
        finiteNonnegative(
          row.fourth_difference_growth_localization
            .refined_worst_stencil_overlap_fraction
        ) &&
        row.fourth_difference_growth_localization
          .refined_worst_stencil_overlap_fraction <= 1 + 1e-12 &&
        finiteNonnegative(
          row.fourth_difference_growth_localization
            .base_worst_stencil_overlap_fraction
        ) &&
        row.fourth_difference_growth_localization
          .base_worst_stencil_overlap_fraction <= 1 + 1e-12 &&
        typeof row.fourth_difference_growth_localization
          .refined_worst_stencil_nested_in_base === "boolean" &&
        finiteNonnegative(
          Math.abs(
            row.fourth_difference_growth_localization
              .worst_stencil_center_shift
          )
        ) &&
        [
          "refined-worst-stencil-nests-inside-base-worst-region",
          "refined-worst-stencil-partially-overlaps-base-worst-region",
          "refined-worst-stencil-disjoint-from-base-worst-region",
        ].includes(
          row.fourth_difference_growth_localization
            .growth_localization_status
        ) &&
        finitePositive(row.observed_m4_inflation_factor) &&
        finitePositive(row.base_corrected_fourth_derivative_upper) &&
        finitePositive(row.refined_corrected_fourth_derivative_upper) &&
        row.baseline_inflation_covers_refined_observed_m4 === false &&
        Number.isInteger(row.base_observed_retile_count) &&
        row.base_observed_retile_count > 0 &&
        Number.isInteger(row.refined_observed_retile_count) &&
        row.refined_observed_retile_count > row.base_observed_retile_count &&
        Number.isInteger(row.base_corrected_tile_count) &&
        row.base_corrected_tile_count > 0 &&
        Number.isInteger(row.refined_corrected_tile_count) &&
        row.refined_corrected_tile_count > row.base_corrected_tile_count &&
        finitePositive(row.refined_to_base_corrected_tile_count_ratio) &&
        row.refined_to_base_corrected_tile_count_ratio > 1 &&
        finiteNonnegative(
          row.base_max_corrected_remainder_to_point_width_ratio
        ) &&
        row.base_max_corrected_remainder_to_point_width_ratio <= 1 &&
        finiteNonnegative(
          row.refined_max_corrected_remainder_to_point_width_ratio
        ) &&
        row.refined_max_corrected_remainder_to_point_width_ratio <= 1 &&
        finitePositive(
          row.base_corrected_rows_max_remainder_ratio_under_refined_observed_m4
        ) &&
        row.base_corrected_rows_max_remainder_ratio_under_refined_observed_m4 >
          1 &&
        finitePositive(
          row.base_corrected_rows_max_remainder_ratio_under_refined_corrected_m4
        ) &&
        row.base_corrected_rows_max_remainder_ratio_under_refined_corrected_m4 >
          1 &&
        row.base_corrected_rows_cover_refined_observed_m4_point_scale ===
          false &&
        row.base_corrected_rows_cover_refined_corrected_m4_point_scale ===
          false &&
        row.refined_corrected_rows_pass_point_scale === true &&
        row.m4_refinement_status ===
          "base-inflation-undercovers-refined-stencil"
    )
  ) {
    errors.push("component M4 refinement rows must show finite refinement undercoverage and refined retile recovery");
  }
  const baseTotalRows = refinementRows.reduce(
    (total, row) => total + Number(row.base_corrected_tile_count ?? 0),
    0
  );
  const refinedTotalRows = refinementRows.reduce(
    (total, row) => total + Number(row.refined_corrected_tile_count ?? 0),
    0
  );
  const maxRefinedToBaseM4Ratio = Math.max(
    0,
    ...refinementRows.map((row) =>
      Number(row.refined_to_base_observed_m4_ratio ?? 0)
    )
  );
  const maxBaseRemainderRatioUnderRefinedObservedM4 = Math.max(
    0,
    ...refinementRows.map((row) =>
      Number(
        row.base_corrected_rows_max_remainder_ratio_under_refined_observed_m4 ??
          0
      )
    )
  );
  const maxComparedStencilNonuniformCorrectionGap = Math.max(
    0,
    ...refinementRows.flatMap((row) => [
      Number(row.base_nonuniform_to_uniform_fourth_derivative_relative_gap ?? 0),
      Number(
        row.refined_nonuniform_to_uniform_fourth_derivative_relative_gap ?? 0
      ),
    ])
  );
  const localizationRows = refinementRows.map(
    (row) => row.fourth_difference_growth_localization
  );
  const totalPositiveGrowthIncrement = localizationRows.reduce(
    (total, row) =>
      total + Math.max(0, Number(row?.observed_m4_growth_increment ?? 0)),
    0
  );
  const dominantLocalizationRow = localizationRows.reduce((best, row) => {
    const share = finitePositive(totalPositiveGrowthIncrement)
      ? Math.max(0, Number(row?.observed_m4_growth_increment ?? 0)) /
        totalPositiveGrowthIncrement
      : -1;
    const bestShare = finitePositive(totalPositiveGrowthIncrement)
      ? Math.max(0, Number(best?.observed_m4_growth_increment ?? 0)) /
        totalPositiveGrowthIncrement
      : -1;
    return share > bestShare ? row : best;
  }, null);
  const localizationMaxRatioRow = localizationRows.reduce((best, row) =>
    Number(row?.refined_to_base_observed_m4_ratio) >
    Number(best?.refined_to_base_observed_m4_ratio ?? -1)
      ? row
      : best,
  null);
  const minRefinedOverlapFraction = Math.min(
    ...localizationRows.map((row) =>
      Number(row?.refined_worst_stencil_overlap_fraction ?? 0)
    )
  );
  const allRefinedWorstStencilsNest = localizationRows.every(
    (row) => row?.refined_worst_stencil_nested_in_base === true
  );
  const refinedWorstSpans = localizationRows.map(
    (row) => row?.refined_worst_stencil?.xi_midpoint_span
  );
  const baseWorstSpans = localizationRows.map(
    (row) => row?.base_worst_stencil?.xi_midpoint_span
  );
  const refinedWorstSpanHull = intervalHull(refinedWorstSpans);
  const baseWorstSpanHull = intervalHull(baseWorstSpans);
  const sortedRefinedWorstSpans = [...refinedWorstSpans].sort(
    (left, right) => Number(left?.[0]) - Number(right?.[0])
  );
  const maxRefinedWorstSpanGap = Math.max(
    0,
    ...sortedRefinedWorstSpans.slice(1).map((span, index) =>
      Math.max(0, Number(span?.[0]) - Number(sortedRefinedWorstSpans[index]?.[1]))
    )
  );
  const refinedWorstStencilsPositiveXiOnly = refinedWorstSpans.every(
    (span) => Number(span?.[0]) > 0 && Number(span?.[1]) > 0
  );
  const refinedWorstStencilsFormContiguousRegion =
    maxRefinedWorstSpanGap <= 1e-12;
  const sourceCancellation =
    diagnostic?.m4_refinement_summary?.positive_xi_source_term_cancellation;
  const expectedRefinedStencilSubcellCount = Math.max(
    0,
    ...(diagnostic?.m4_refinement_parameters
      ?.refinement_stencil_subcell_counts ?? [0])
  );
  const expectedSourceTermComponents =
    diagnostic?.m4_refinement_parameters?.source_term_components ?? [];
  const sourceCancellationEmitted =
    sourceCancellation?.status === "source-term-cancellation-witness-emitted";
  if (
    expectedComponents.includes("direct_n38_expression") &&
    (!sourceCancellationEmitted ||
      sourceCancellation.refined_source_stencil_subcell_count !==
        expectedRefinedStencilSubcellCount ||
      sourceCancellation.comparison_basis !==
        "direct_n38_expression refined worst fourth-difference stencil" ||
      !Number.isInteger(sourceCancellation.comparison_stencil_index) ||
      sourceCancellation.comparison_stencil_index < 0 ||
      !Array.isArray(sourceCancellation.comparison_xi_midpoint_span) ||
      sourceCancellation.comparison_xi_midpoint_span.length !== 2 ||
      sourceCancellation.positive_xi_region_status !==
        diagnostic.m4_refinement_summary
          .fourth_difference_growth_localization_summary
          .refined_worst_stencil_region_status ||
      !Array.isArray(sourceCancellation.source_term_components) ||
      sourceCancellation.source_term_components.length !==
        expectedSourceTermComponents.length ||
      !sourceCancellation.source_term_components.every((component) =>
        expectedSourceTermComponents.includes(component)
      ) ||
      !Number.isFinite(Number(sourceCancellation.direct_fourth_difference)) ||
      !finiteNonnegative(sourceCancellation.direct_abs_fourth_difference) ||
      !finiteNonnegative(
        sourceCancellation.source_term_abs_fourth_difference_sum
      ) ||
      !Number.isFinite(
        Number(sourceCancellation.source_term_fourth_difference_sum)
      ) ||
      !finiteNonnegative(sourceCancellation.source_sum_to_direct_absolute_gap) ||
      !finiteNonnegative(sourceCancellation.source_sum_to_direct_relative_gap) ||
      typeof sourceCancellation.source_sum_replays_direct_fourth_difference !==
        "boolean" ||
      !finiteNonnegative(
        sourceCancellation.signed_source_sum_to_abs_source_sum_ratio
      ) ||
      sourceCancellation.signed_source_sum_to_abs_source_sum_ratio > 1 + 1e-12 ||
      !finiteNonnegative(sourceCancellation.source_cancellation_fraction) ||
      sourceCancellation.source_cancellation_fraction > 1 + 1e-12 ||
      Math.abs(
        sourceCancellation.source_cancellation_fraction -
          (1 -
            sourceCancellation.signed_source_sum_to_abs_source_sum_ratio)
      ) > 1e-12 ||
      !Number.isInteger(
        sourceCancellation.source_terms_matching_direct_sign_count
      ) ||
      !Number.isInteger(
        sourceCancellation.source_terms_opposing_direct_sign_count
      ) ||
      !expectedSourceTermComponents.includes(
        sourceCancellation.dominant_source_term_by_abs_fourth_difference
      ) ||
      !finiteNonnegative(
        sourceCancellation.dominant_source_term_abs_fourth_difference_share
      ) ||
      !Array.isArray(sourceCancellation.source_term_rows) ||
      sourceCancellation.source_term_rows.length !==
        expectedSourceTermComponents.length ||
      ![
        "source-term-sum-does-not-replay-direct-fourth-difference",
        "source-terms-reinforce-direct-positive-xi-fourth-difference",
        "source-terms-cancel-before-direct-positive-xi-fourth-difference",
        "source-terms-partially-cancel-direct-positive-xi-fourth-difference",
      ].includes(sourceCancellation.cancellation_interpretation))
  ) {
    errors.push("M4 refinement summary must expose a positive-xi source-term cancellation witness");
  }
  const sinePairNormalForm =
    diagnostic?.m4_refinement_summary?.positive_xi_sine_pair_normal_form;
  if (sourceCancellationEmitted) {
    errors.push(
      ...validateSinePairNormalFormWitness(sinePairNormalForm, {
        requireSourceCancellationMatch: true,
      })
    );
    if (
      sinePairNormalForm?.comparison_stencil_index !==
        sourceCancellation.comparison_stencil_index ||
      intervalEndpointMaxGap(
        sinePairNormalForm?.comparison_xi_midpoint_span ?? [NaN, NaN],
        sourceCancellation.comparison_xi_midpoint_span
      ) > 1e-12 ||
      sinePairNormalForm?.sine_pair_fourth_difference_sign !==
        sourceCancellation.direct_fourth_difference_sign ||
      !finitePositive(sinePairNormalForm?.sine_pair_abs_source_mass_share) ||
      sinePairNormalForm.sine_pair_abs_source_mass_share < 0.99 ||
      !Number.isFinite(
        Number(
          sinePairNormalForm?.sine_pair_signed_to_direct_fourth_difference_ratio
        )
      )
    ) {
      errors.push("M4 refinement sine-pair normal form must match the positive-xi source witness");
    }
  }
  if (
    !diagnostic?.m4_refinement_summary ||
    diagnostic.m4_refinement_summary.component_count !==
      refinementRows.length ||
    diagnostic.m4_refinement_summary.base_total_corrected_tile_rows !==
      baseTotalRows ||
    diagnostic.m4_refinement_summary.refined_total_corrected_tile_rows !==
      refinedTotalRows ||
    refinedTotalRows <= baseTotalRows ||
    !finitePositive(
      diagnostic.m4_refinement_summary
        .refined_to_base_total_corrected_tile_row_ratio
    ) ||
    diagnostic.m4_refinement_summary
      .refined_to_base_total_corrected_tile_row_ratio <= 1 ||
    diagnostic.m4_refinement_summary.max_refined_to_base_observed_m4_ratio !==
      maxRefinedToBaseM4Ratio ||
    diagnostic.m4_refinement_summary
      .max_base_corrected_rows_remainder_ratio_under_refined_observed_m4 !==
      maxBaseRemainderRatioUnderRefinedObservedM4 ||
    diagnostic.m4_refinement_summary
      .max_base_corrected_rows_remainder_ratio_under_refined_observed_m4 <=
      1 ||
    diagnostic.m4_refinement_summary
      .max_compared_stencil_nonuniform_to_uniform_fourth_derivative_relative_gap !==
      maxComparedStencilNonuniformCorrectionGap ||
    !finiteNonnegative(
      diagnostic.m4_refinement_summary
        .nonuniform_correction_to_growth_excess_ratio
    ) ||
    diagnostic.m4_refinement_summary
      .nonuniform_correction_to_growth_excess_ratio > 0.25 ||
    !diagnostic.m4_refinement_summary
      .fourth_difference_growth_localization_summary ||
    diagnostic.m4_refinement_summary
      .fourth_difference_growth_localization_summary.component_count !==
      refinementRows.length ||
    diagnostic.m4_refinement_summary
      .fourth_difference_growth_localization_summary
      .total_positive_observed_m4_growth_increment !==
      totalPositiveGrowthIncrement ||
    diagnostic.m4_refinement_summary
      .fourth_difference_growth_localization_summary
      .dominant_growth_component !== dominantLocalizationRow?.component ||
    !finiteNonnegative(
      diagnostic.m4_refinement_summary
        .fourth_difference_growth_localization_summary
        .dominant_growth_component_increment_share
    ) ||
    diagnostic.m4_refinement_summary
      .fourth_difference_growth_localization_summary
      .max_refined_to_base_observed_m4_ratio_component !==
      localizationMaxRatioRow?.component ||
    diagnostic.m4_refinement_summary
      .fourth_difference_growth_localization_summary
      .max_refined_to_base_observed_m4_ratio !==
      localizationMaxRatioRow?.refined_to_base_observed_m4_ratio ||
    diagnostic.m4_refinement_summary
      .fourth_difference_growth_localization_summary
      .all_refined_worst_stencils_nest_inside_base_worst_spans !==
      allRefinedWorstStencilsNest ||
    diagnostic.m4_refinement_summary
      .fourth_difference_growth_localization_summary
      .min_refined_worst_stencil_overlap_fraction !==
      minRefinedOverlapFraction ||
    intervalEndpointMaxGap(
      diagnostic.m4_refinement_summary
        .fourth_difference_growth_localization_summary
        .base_worst_stencil_span_hull,
      baseWorstSpanHull
    ) > 0 ||
    intervalEndpointMaxGap(
      diagnostic.m4_refinement_summary
        .fourth_difference_growth_localization_summary
        .refined_worst_stencil_span_hull,
      refinedWorstSpanHull
    ) > 0 ||
    diagnostic.m4_refinement_summary
      .fourth_difference_growth_localization_summary
      .max_refined_worst_stencil_gap !== maxRefinedWorstSpanGap ||
    diagnostic.m4_refinement_summary
      .fourth_difference_growth_localization_summary
      .refined_worst_stencils_positive_xi_only !==
      refinedWorstStencilsPositiveXiOnly ||
    diagnostic.m4_refinement_summary
      .fourth_difference_growth_localization_summary
      .refined_worst_stencils_form_contiguous_xi_region !==
      refinedWorstStencilsFormContiguousRegion ||
    ![
      "refined-worst-stencils-collapse-to-contiguous-positive-xi-region",
      "refined-worst-stencils-shift-to-positive-xi-region",
      "refined-worst-stencils-not-confined-to-positive-xi-region",
    ].includes(
      diagnostic.m4_refinement_summary
        .fourth_difference_growth_localization_summary
        .refined_worst_stencil_region_status
    ) ||
    ![
      "dominant-component-localized-growth",
      "multi-component-fourth-variation-growth",
    ].includes(
      diagnostic.m4_refinement_summary
        .fourth_difference_growth_localization_summary
        .growth_distribution_status
    ) ||
    ![
      "growth-localized-by-component-inside-existing-worst-fold-region",
      "growth-shared-across-components-inside-existing-worst-fold-region",
      "growth-shifts-fold-region-under-refinement",
      "growth-shifts-to-contiguous-positive-xi-region-under-refinement",
    ].includes(
      diagnostic.m4_refinement_summary
        .fourth_difference_growth_localization_summary
        .localization_interpretation
    ) ||
    !Array.isArray(
      diagnostic.m4_refinement_summary
        .fourth_difference_growth_localization_summary
        .component_growth_localization_rows
    ) ||
    diagnostic.m4_refinement_summary
      .fourth_difference_growth_localization_summary
      .component_growth_localization_rows.length !== refinementRows.length ||
    diagnostic.m4_refinement_summary
      .baseline_inflation_covers_refined_stencils !== false ||
    diagnostic.m4_refinement_summary
      .all_refined_corrected_rows_pass_point_scale !== true ||
    !Number.isInteger(
      diagnostic.m4_refinement_summary.max_refined_corrected_tile_count
    ) ||
    diagnostic.m4_refinement_summary.max_refined_corrected_tile_count <= 0 ||
    !Number.isInteger(
      diagnostic.m4_refinement_summary.max_refined_observed_retile_count
    ) ||
    diagnostic.m4_refinement_summary.max_refined_observed_retile_count <= 0 ||
    diagnostic.m4_refinement_summary
      .nonuniform_stencil_correction_explains_growth !== false ||
    diagnostic.m4_refinement_summary.fourth_difference_growth_interpretation !==
      "growth-not-explained-by-nonuniform-xi-spacing"
  ) {
    errors.push("M4 refinement summary must report base undercoverage and finite refined recovery");
  }
  if (
    diagnostic?.n38_taylor_m4_refinement_diagnosis !==
    "finer-stencil-rejects-base-m4-inflation-but-refined-retile-remains-finite"
  ) {
    errors.push("M4 refinement diagnosis must reject base inflation while preserving a finite refined route");
  }
  if (
    diagnostic?.claim_boundary?.certifies_standard_h38_cover !== false ||
    diagnostic?.claim_boundary?.certifies_expression_level_n38_provider !==
      false ||
    diagnostic?.claim_boundary?.certifies_n38_taylor_remainder_bound !==
      false ||
    diagnostic?.claim_boundary?.certifies_shifted_R43_outer_bound !== false ||
    diagnostic?.claim_boundary?.certifies_directed_rounded_shared_domain !==
      false ||
    diagnostic?.claim_boundary?.certifies_continuous_polydisc_primitives !==
      false ||
    diagnostic?.claim_boundary?.retained_branch !== false
  ) {
    errors.push("claim boundary must keep M4 refinement diagnostic candidate-only");
  }
  return errors;
}
