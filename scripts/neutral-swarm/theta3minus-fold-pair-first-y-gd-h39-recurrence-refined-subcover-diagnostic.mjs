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
