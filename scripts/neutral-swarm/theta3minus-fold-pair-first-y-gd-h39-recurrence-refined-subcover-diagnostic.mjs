#!/usr/bin/env node

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyEighthOrderPostUSuccessorCoefficientCertificate,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-eighth-order-post-u-successor-coefficient-certificate.mjs";
import {
  theta3minusFoldPairScaledRootTubeCellInternals as root,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.mjs";
import {
  THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS,
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

function intervalMidpoint([left, right]) {
  return (Number(left) + Number(right)) / 2;
}

function intervalWidth([left, right]) {
  return Number(right) - Number(left);
}

function intervalAbsUpper([left, right]) {
  return Math.max(Math.abs(Number(left)), Math.abs(Number(right)));
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
  return {
    center_interval: solve.h39_center_interval,
    center_numeric_interval: root.formatInterval(
      solve.h39_center_numeric_interval
    ),
    row_pressure: rowPressure,
    pressure: rowPressure.source_pressure_contribution,
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
    h0_value: hIntervals[0][0],
    h38_value: hIntervals[38][0],
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
