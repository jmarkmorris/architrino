#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtySeventhOrderPostUSuccessorCoefficientCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtySeventhOrderPostUSuccessorCoefficientCertificate,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-seventh-order-post-u-successor-coefficient-certificate.mjs";
import {
  theta3minusFoldPairScaledRootTubeCellInternals as root,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_THIRTY_EIGHTH_ORDER_POST_U_SUCCESSOR_COEFFICIENT_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-eighth-order-post-u-successor-coefficient-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_thirty_eighth_order_post_u_successor_coefficient_certificate";
const PROMOTION_STATUS = "priority-only";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const SOURCE_COEFFICIENT = -1;
const SERIES_ORDER = 42;
const H_COUNT = 39;
const PREDECESSOR_H_COUNT = 38;
const TARGET_INDEX = 38;
const FIRST_Y_CELL_UPPER = 0.115 / 64;
const SPEED_CELL_COUNT = 128;
const CERTIFIED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-thirty-eighth-order-post-U-successor-coefficient-certified";
const ROW_CERTIFIED_STATUS =
  "directed-rounded-first-y-GD-thirty-eighth-order-post-U-successor-coefficient-enclosed";
const SOURCE_FIELD = "source_equation_coefficients_y0_to_y42";
const SOURCE_CONTAINS_ZERO_FIELD =
  "source_equation_coefficients_contain_zero_y0_to_y42";
const ALL_SOURCE_CONTAINS_ZERO_FIELD =
  "all_source_equation_coefficients_contain_zero_y0_to_y42";
const MAX_SOURCE_FIELD = "max_abs_source_equation_coeff_y0_to_y42";
const H_SLOPE_MINIMUMS = Array.from({ length: H_COUNT }, () => 0.79);

const FACTORIALS = Array.from({ length: SERIES_ORDER + 1 }, (_, index) =>
  index === 0 ? 1 : null
);
for (let index = 1; index < FACTORIALS.length; index += 1) {
  FACTORIALS[index] = FACTORIALS[index - 1] * index;
}

function zeros() {
  return Array.from({ length: SERIES_ORDER + 1 }, () => [0, 0]);
}

function numericInterval(interval) {
  return interval.map(Number);
}

function constant(valueOrInterval) {
  const series = zeros();
  series[0] = Array.isArray(valueOrInterval)
    ? root.outwardInterval(valueOrInterval)
    : root.pointInterval(valueOrInterval);
  return series;
}

function add(left, right) {
  return left.map((value, index) => root.addIntervals(value, right[index]));
}

function subtract(left, right) {
  return left.map((value, index) =>
    root.subtractIntervals(value, right[index])
  );
}

function scale(series, factor) {
  return series.map((value) => root.scaleInterval(value, factor));
}

function scaleByInterval(series, factorInterval) {
  return series.map((value) => root.multiplyIntervals(value, factorInterval));
}

function multiply(left, right) {
  const result = zeros();
  for (let leftIndex = 0; leftIndex <= SERIES_ORDER; leftIndex += 1) {
    for (
      let rightIndex = 0;
      leftIndex + rightIndex <= SERIES_ORDER;
      rightIndex += 1
    ) {
      result[leftIndex + rightIndex] = root.addIntervals(
        result[leftIndex + rightIndex],
        root.multiplyIntervals(left[leftIndex], right[rightIndex])
      );
    }
  }
  return result;
}

function power(series, exponent) {
  let result = constant(1);
  for (let index = 0; index < exponent; index += 1) {
    result = multiply(result, series);
  }
  return result;
}

function inverse(series) {
  const result = zeros();
  result[0] = root.reciprocalInterval(series[0]);
  for (let order = 1; order <= SERIES_ORDER; order += 1) {
    let convolution = [0, 0];
    for (let index = 1; index <= order; index += 1) {
      convolution = root.addIntervals(
        convolution,
        root.multiplyIntervals(series[index], result[order - index])
      );
    }
    result[order] = root.divideIntervals(
      root.scaleInterval(convolution, -1),
      series[0]
    );
  }
  return result;
}

function divide(left, right) {
  return multiply(left, inverse(right));
}

function sinDerivativeInterval(center, derivativeIndex) {
  if (derivativeIndex % 4 === 0) {
    return root.sinInterval(center);
  }
  if (derivativeIndex % 4 === 1) {
    return root.cosInterval(center);
  }
  if (derivativeIndex % 4 === 2) {
    return root.scaleInterval(root.sinInterval(center), -1);
  }
  return root.scaleInterval(root.cosInterval(center), -1);
}

function cosDerivativeInterval(center, derivativeIndex) {
  if (derivativeIndex % 4 === 0) {
    return root.cosInterval(center);
  }
  if (derivativeIndex % 4 === 1) {
    return root.scaleInterval(root.sinInterval(center), -1);
  }
  if (derivativeIndex % 4 === 2) {
    return root.scaleInterval(root.cosInterval(center), -1);
  }
  return root.sinInterval(center);
}

function analyticSeries(series, derivativeInterval) {
  const center = series[0];
  const nilpotent = [...series];
  nilpotent[0] = [0, 0];
  let nilpotentPower = constant(1);
  let sum = zeros();
  for (let order = 0; order <= SERIES_ORDER; order += 1) {
    sum = add(
      sum,
      scaleByInterval(
        nilpotentPower,
        root.scaleInterval(
          derivativeInterval(center, order),
          1 / FACTORIALS[order]
        )
      )
    );
    nilpotentPower = multiply(nilpotentPower, nilpotent);
  }
  return sum;
}

function sinSeries(series) {
  return analyticSeries(series, sinDerivativeInterval);
}

function cosSeries(series) {
  return analyticSeries(series, cosDerivativeInterval);
}

function containsZero([left, right]) {
  return left <= 0 && right >= 0;
}

function finiteInterval(interval) {
  return interval.every((entry) => Number.isFinite(entry));
}

function maxAbsInterval([left, right]) {
  return Math.max(Math.abs(left), Math.abs(right));
}

function coefficientHull(intervals) {
  return root.formatInterval([
    Math.min(...intervals.map(([left]) => left)),
    Math.max(...intervals.map(([, right]) => right)),
  ]);
}

function minField(rows, fieldName) {
  return Math.min(...rows.map((row) => Number(row[fieldName])));
}

function maxField(rows, fieldName) {
  return Math.max(...rows.map((row) => Number(row[fieldName])));
}

function maxIdentityAbs(rows, fieldName) {
  return Math.max(
    ...rows.map((row) => maxAbsInterval(row[fieldName].map(Number)))
  );
}

function hFieldName(index, suffix = "interval") {
  return `h${index}_${suffix}`;
}

function qFieldName(prefix, index, suffix = "coefficient_interval") {
  return `${prefix}_y${index}_${suffix}`;
}

function hIntervalsFromPredecessorBranch(branchRow) {
  const hIntervals = Array.from({ length: H_COUNT }, () => [0, 0]);
  for (let index = 0; index < PREDECESSOR_H_COUNT; index += 1) {
    hIntervals[index] = numericInterval(branchRow[hFieldName(index)]);
  }
  return hIntervals;
}

function cellFromPredecessorRow(row) {
  return {
    speed_interval: numericInterval(row.speed_interval),
    delta_fold_interval: numericInterval(row.delta_fold_interval),
    phi_fold_interval: numericInterval(row.phi_fold_interval),
    beta_interval: numericInterval(row.beta_interval),
    gamma_interval: numericInterval(row.gamma_interval),
    L_interval: numericInterval(row.L_interval),
  };
}

function hIntervalAt(hIntervals, index) {
  return hIntervals[index] ?? [0, 0];
}

function branchSeriesCoordinates({ cell, branchSign, hIntervals }) {
  const delta = constant(cell.delta_fold_interval);
  delta[1] = root.scaleInterval(cell.beta_interval, branchSign);
  delta[2] = cell.gamma_interval;

  const phi = constant(cell.phi_fold_interval);
  phi[1] = root.scaleInterval(cell.beta_interval, -branchSign);
  phi[2] = root.scaleInterval(root.addIntervals(cell.gamma_interval, [2, 2]), -1);

  for (let index = 0; index < H_COUNT; index += 1) {
    delta[index + 3] = hIntervalAt(hIntervals, index);
    phi[index + 3] = root.scaleInterval(hIntervalAt(hIntervals, index), -1);
  }

  return { delta, phi };
}

function sourceEquationSeriesTermDecomposition({ cell, branchSign, hIntervals }) {
  const { delta, phi } = branchSeriesCoordinates({
    cell,
    branchSign,
    hIntervals,
  });
  const inverseSpeedSquared = root.inverseSpeedSquaredInterval(cell.speed_interval);
  const deltaSquaredSpeed = scaleByInterval(
    power(delta, 2),
    inverseSpeedSquared
  );
  const constantMinusTwo = constant(-2);
  const sinPhi = sinSeries(phi);
  const sinDelta = sinSeries(delta);
  const source = add(
    add(
      deltaSquaredSpeed,
      constantMinusTwo
    ),
    add(sinPhi, sinDelta)
  );
  return {
    delta,
    phi,
    inverse_speed_squared_interval: root.formatInterval(inverseSpeedSquared),
    terms: {
      delta_squared_speed: deltaSquaredSpeed,
      constant_minus_two: constantMinusTwo,
      sin_phi: sinPhi,
      sin_delta: sinDelta,
    },
    source,
  };
}

function sourceEquationSeries({ cell, branchSign, hIntervals }) {
  return sourceEquationSeriesTermDecomposition({
    cell,
    branchSign,
    hIntervals,
  }).source;
}

export function evaluateH38RecurrenceNumeratorBeforeSolve({
  cell,
  branch,
  branchSign = root.branchSign(branch),
  hIntervals,
  includeSourceSeries = false,
  includeTermDecomposition = true,
} = {}) {
  if (!Array.isArray(hIntervals)) {
    throw new Error("hIntervals must be supplied");
  }
  const zeroHIntervals = Array.from({ length: H_COUNT }, (_, index) =>
    Array.isArray(hIntervals[index]) ? numericInterval(hIntervals[index]) : [0, 0]
  );
  zeroHIntervals[TARGET_INDEX] = [0, 0];
  const decomposed = sourceEquationSeriesTermDecomposition({
    cell,
    branchSign,
    hIntervals: zeroHIntervals,
  });
  const numeratorInterval = decomposed.source[TARGET_INDEX + 4];
  return {
    branch: branch ?? branchSign,
    branch_sign: branchSign,
    target_h_index: TARGET_INDEX,
    source_y_order: TARGET_INDEX + 4,
    numerator_interval: numeratorInterval,
    h38_residual_before_solve: numeratorInterval,
    source_series: includeSourceSeries ? decomposed.source : undefined,
    term_decomposition: includeTermDecomposition ? decomposed.terms : undefined,
  };
}

function solveH38Interval({ cell, branchSign, branchRow, hIntervals }) {
  const zeroHIntervals = [...hIntervals];
  zeroHIntervals[TARGET_INDEX] = [0, 0];
  const zeroSeries = sourceEquationSeries({
    cell,
    branchSign,
    hIntervals: zeroHIntervals,
  });
  const slope = numericInterval(branchRow.h37_solve_slope_interval);
  return {
    hInterval: root.divideIntervals(
      root.scaleInterval(zeroSeries[TARGET_INDEX + 4], -1),
      slope
    ),
    hSlopeInterval: slope,
    hResidualBeforeSolve: zeroSeries[TARGET_INDEX + 4],
  };
}

function branchGSeries({ cell, branchSign, hIntervals }) {
  const { delta, phi } = branchSeriesCoordinates({
    cell,
    branchSign,
    hIntervals,
  });
  const kernel = scale(add(cosSeries(phi), cosSeries(delta)), -0.5);
  const fDelta = add(
    add(
      scaleByInterval(
        delta,
        root.scaleInterval(
          root.inverseSpeedSquaredInterval(cell.speed_interval),
          2
        )
      ),
      scale(cosSeries(phi), -1)
    ),
    cosSeries(delta)
  );
  const j = zeros();
  for (let order = 0; order < SERIES_ORDER; order += 1) {
    j[order] = fDelta[order + 1];
  }
  const absJ = scale(j, -branchSign);
  const denominator = scaleByInterval(
    multiply(power(delta, 2), absJ),
    cell.speed_interval
  );
  return divide(scale(kernel, 4 * SOURCE_COEFFICIENT), denominator);
}

function transformedDSeries(pairGSeries) {
  return pairGSeries.map((coefficient, order) =>
    root.scaleInterval(coefficient, 1 - order)
  );
}

function branchRowsCertified(branchRows) {
  return branchRows.every((row) =>
    H_SLOPE_MINIMUMS.every(
      (minimum, index) =>
        Number(row[hFieldName(index, "solve_slope_clearance")]) > minimum
    )
  );
}

function hRowProviderClaimBoundary() {
  return {
    certifies_shifted_R43_outer_bound: false,
    certifies_directed_rounded_shared_domain: false,
    certifies_continuous_polydisc_primitives: false,
    retained_branch: false,
  };
}

function hRowDependencyTrace({ cellId, branch, predecessorRow }) {
  const inheritedRows = Array.from(
    { length: PREDECESSOR_H_COUNT },
    (_, index) => ({
      h_index: index,
      source: "predecessor-directed-rounded-successor-row",
      predecessor_packet:
        "thirty-seventh-order post-U successor coefficient certificate",
      predecessor_cell_id: predecessorRow.cell_id,
      current_cell_id: cellId,
      branch,
      inherited_interval_field: hFieldName(index),
      inherited_solve_slope_field: hFieldName(index, "solve_slope_interval"),
    })
  );
  return [
    ...inheritedRows,
    {
      h_index: TARGET_INDEX,
      source: "current-successor-recurrence-solve",
      predecessor_packet:
        "thirty-seventh-order post-U successor coefficient certificate",
      current_packet:
        "thirty-eighth-order post-U successor coefficient certificate",
      predecessor_cell_id: predecessorRow.cell_id,
      current_cell_id: cellId,
      branch,
      residual_field: "h38_residual_before_solve",
      solve_slope_field: "h38_solve_slope_interval",
      solved_interval_field: "h38_interval",
      recurrence_equation:
        "h38_interval=-Shift_42(F_epsilon(y,h_{<=37}+y^38*0,nu))/h37_solve_slope_interval",
    },
  ];
}

function hRowProviderProvenance({ cellId, branch, predecessorRow }) {
  return {
    provider_kind: "thirty-eighth-successor-recurrence-provider",
    current_packet:
      "thirty-eighth-order post-U successor coefficient certificate",
    predecessor_packet:
      "thirty-seventh-order post-U successor coefficient certificate",
    predecessor_cell_id: predecessorRow.cell_id,
    source_cell_id: cellId,
    branch,
    h_count: H_COUNT,
    inherited_h_count: PREDECESSOR_H_COUNT,
    target_h_index: TARGET_INDEX,
    recurrence_source_field: "h38_residual_before_solve",
    recurrence_slope_field: "h37_solve_slope_interval",
    generated_interval_field: "h38_interval",
    provider_claim:
      "dependency-preserving provider metadata for replaying the certified h0..h38 row; it does not certify the H39 shifted source or primitive bounds",
  };
}

function hRowDependencyWitness({
  cellId,
  branch,
  predecessorRow,
  solve,
  sourceSeries,
}) {
  return {
    parent_row_identity: predecessorRow.row_status,
    parent_cell_id: predecessorRow.cell_id,
    current_cell_id: cellId,
    branch,
    target_h_index: TARGET_INDEX,
    recurrence_equation:
      "Shift_42(F_epsilon(y,h_{<=37}+y^38*X38,nu))=C38+S38*X38+O(y)",
    residual_before_solve: root.formatInterval(solve.hResidualBeforeSolve),
    solve_slope_interval: root.formatInterval(solve.hSlopeInterval),
    solved_h_interval: root.formatInterval(solve.hInterval),
    source_coefficients_contain_zero_y0_to_y42:
      sourceSeries.every(containsZero),
    coverage:
      "current h38 interval is computed from the predecessor row on the same speed/first-y cell; inherited h0..h37 intervals are copied from the validated h37 artifact",
    claim_boundary: hRowProviderClaimBoundary(),
  };
}

function intervalRowForPredecessorRow({ speedIndex, predecessorRow }) {
  const cellId = `speed.${speedIndex}.first-y`;
  const cell = cellFromPredecessorRow(predecessorRow);
  const branchSolves = predecessorRow.branch_rows.map((predecessorBranchRow) => {
    const branch = predecessorBranchRow.branch;
    const branchSign = root.branchSign(branch);
    const hIntervals = hIntervalsFromPredecessorBranch(predecessorBranchRow);
    const solve = solveH38Interval({
      cell,
      branchSign,
      branchRow: predecessorBranchRow,
      hIntervals,
    });
    hIntervals[TARGET_INDEX] = solve.hInterval;
    const sourceSeries = sourceEquationSeries({
      cell,
      branchSign,
      hIntervals,
    });
    const gSeries = branchGSeries({ cell, branchSign, hIntervals });
    const slope = root.intervalSignAndClearance(solve.hSlopeInterval);
    const row = {
      branch,
      inherited_h37_interval: predecessorBranchRow.h37_interval,
      h38_interval: root.formatInterval(solve.hInterval),
      h38_solve_slope_interval: root.formatInterval(solve.hSlopeInterval),
      h38_solve_slope_sign: slope.sign,
      h38_solve_slope_clearance: root.formatSmallNumber(slope.clearance),
      h38_residual_before_solve: root.formatInterval(
        solve.hResidualBeforeSolve
      ),
      dependency_preserving_h_row_provider: true,
      h_row_provider_preserves_dependencies: true,
      provider_kind: "thirty-eighth-successor-recurrence-provider",
      h_row_provider_kind: "thirty-eighth-successor-recurrence-provider",
      source_cell_id: cellId,
      h_row_provider_source_cell_id: cellId,
      h_row_provider_replay_kind: "h39-embedded-h38-provider-replay",
      h_row_provider_provenance: hRowProviderProvenance({
        cellId,
        branch,
        predecessorRow,
      }),
      h_row_dependency_trace: hRowDependencyTrace({
        cellId,
        branch,
        predecessorRow,
      }),
      h_row_dependency_witness: hRowDependencyWitness({
        cellId,
        branch,
        predecessorRow,
        solve,
        sourceSeries,
      }),
      h_row_provider_claim_boundary: hRowProviderClaimBoundary(),
      [SOURCE_FIELD]: sourceSeries.map(root.formatInterval),
      [SOURCE_CONTAINS_ZERO_FIELD]: sourceSeries.every(containsZero),
      [MAX_SOURCE_FIELD]: root.formatSmallNumber(
        Math.max(...sourceSeries.map(maxAbsInterval))
      ),
      G_branch_coefficients_y0_to_y40: gSeries
        .slice(0, 41)
        .map(root.formatInterval),
    };
    for (let index = 0; index < PREDECESSOR_H_COUNT; index += 1) {
      row[hFieldName(index)] = predecessorBranchRow[hFieldName(index)];
      row[hFieldName(index, "solve_slope_interval")] =
        predecessorBranchRow[hFieldName(index, "solve_slope_interval")];
      row[hFieldName(index, "solve_slope_clearance")] =
        predecessorBranchRow[hFieldName(index, "solve_slope_clearance")];
    }
    return { branch, hIntervals, row };
  });

  const branchRows = branchSolves.map((branchSolve) => branchSolve.row);
  const branchByName = Object.fromEntries(
    branchSolves.map((branchSolve) => [branchSolve.branch, branchSolve])
  );
  const gMinus = branchGSeries({
    cell,
    branchSign: -1,
    hIntervals: branchByName["-"].hIntervals,
  });
  const gPlus = branchGSeries({
    cell,
    branchSign: 1,
    hIntervals: branchByName["+"].hIntervals,
  });
  const pairG = add(gMinus, gPlus);
  const pairD = transformedDSeries(pairG);
  const p0MinusL = root.subtractIntervals(pairG[0], cell.L_interval);
  const d0MinusL = root.subtractIntervals(pairD[0], cell.L_interval);
  const qG = Array.from({ length: H_COUNT }, (_, index) => pairG[index + 2]);
  const qD = Array.from({ length: H_COUNT }, (_, index) => pairD[index + 2]);
  const qG0Sign = root.intervalSignAndClearance(qG[0]);
  const qD0Sign = root.intervalSignAndClearance(qD[0]);
  const qGAbs = qG.map(maxAbsInterval);
  const qDAbs = qD.map(maxAbsInterval);
  const qGLosses = qGAbs.map((absValue, index) =>
    index === 0 ? 0 : absValue * FIRST_Y_CELL_UPPER ** index
  );
  const qDLosses = qDAbs.map((absValue, index) =>
    index === 0 ? 0 : absValue * FIRST_Y_CELL_UPPER ** index
  );
  const qGRemainingMargin =
    qG0Sign.clearance -
    qGLosses.slice(1).reduce((total, value) => total + value, 0);
  const qDRemainingMargin =
    qD0Sign.clearance -
    qDLosses.slice(1).reduce((total, value) => total + value, 0);
  const qGRemainingThirtyNinthOrderTailBudget =
    qGRemainingMargin / FIRST_Y_CELL_UPPER ** 39;
  const qDRemainingThirtyNinthOrderTailBudget =
    qDRemainingMargin / FIRST_Y_CELL_UPPER ** 39;
  const qDPlusQGIdentities = qD.map((interval, index) =>
    root.addIntervals(interval, root.scaleInterval(qG[index], index + 1))
  );
  const row = {
    cell_id: cellId,
    speed_interval: predecessorRow.speed_interval,
    first_y_cell: [0, root.formatSmallNumber(FIRST_Y_CELL_UPPER)],
    delta_fold_interval: predecessorRow.delta_fold_interval,
    phi_fold_interval: predecessorRow.phi_fold_interval,
    beta_interval: predecessorRow.beta_interval,
    gamma_interval: predecessorRow.gamma_interval,
    L_interval: predecessorRow.L_interval,
    branch_rows: branchRows,
    G_pair_coefficients_y0_to_y40: pairG.slice(0, 41).map(root.formatInterval),
    D_pair_coefficients_y0_to_y40: pairD.slice(0, 41).map(root.formatInterval),
    P0_minus_L_interval: root.formatInterval(p0MinusL),
    P1_interval: root.formatInterval(pairG[1]),
    D0_minus_L_interval: root.formatInterval(d0MinusL),
    D1_interval: root.formatInterval(pairD[1]),
    Q_G_y0_coefficient_sign: qG0Sign.sign,
    Q_G_y0_coefficient_clearance: root.formatSmallNumber(qG0Sign.clearance),
    Q_D_y0_coefficient_sign: qD0Sign.sign,
    Q_D_y0_coefficient_clearance: root.formatSmallNumber(qD0Sign.clearance),
    Q_G_y38_loss_on_first_y_cell: root.formatSmallNumber(qGLosses[38]),
    Q_D_y38_loss_on_first_y_cell: root.formatSmallNumber(qDLosses[38]),
    Q_G_remaining_thirty_ninth_order_tail_budget: root.formatSmallNumber(
      qGRemainingThirtyNinthOrderTailBudget
    ),
    Q_D_remaining_thirty_ninth_order_tail_budget: root.formatSmallNumber(
      qDRemainingThirtyNinthOrderTailBudget
    ),
  };

  qG.forEach((interval, index) => {
    row[qFieldName("Q_G", index)] = root.formatInterval(interval);
    row[qFieldName("Q_D", index)] = root.formatInterval(qD[index]);
    row[qFieldName("Q_G", index, "max_abs_coefficient")] =
      root.formatSmallNumber(qGAbs[index]);
    row[qFieldName("Q_D", index, "max_abs_coefficient")] =
      root.formatSmallNumber(qDAbs[index]);
    row[
      `Q_D_plus_${index + 1 === 1 ? "" : `${index + 1}`}Q_G_y${index}_coefficient_interval`
    ] = root.formatInterval(qDPlusQGIdentities[index]);
  });

  row.row_status =
    branchRows.every((branchRow) => branchRow[SOURCE_CONTAINS_ZERO_FIELD]) &&
    branchRowsCertified(branchRows) &&
    containsZero(p0MinusL) &&
    containsZero(pairG[1]) &&
    containsZero(d0MinusL) &&
    containsZero(pairD[1]) &&
    qG0Sign.sign === "+" &&
    qD0Sign.sign === "-" &&
    qG.slice(1).every(finiteInterval) &&
    qD.slice(1).every(finiteInterval) &&
    qDPlusQGIdentities.every(containsZero) &&
    qGRemainingThirtyNinthOrderTailBudget > 6e75 &&
    qDRemainingThirtyNinthOrderTailBudget > 6e75
      ? ROW_CERTIFIED_STATUS
      : "first-y-GD-thirty-eighth-order-post-U-successor-coefficient-enclosure-open";

  return row;
}

function summarizeRows({ rows, predecessorArtifact }) {
  const predecessorErrors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtySeventhOrderPostUSuccessorCoefficientCertificate(
      predecessorArtifact
    );
  const branchRows = rows.flatMap((row) => row.branch_rows);
  const allRowsCertified = rows.every(
    (row) => row.row_status === ROW_CERTIFIED_STATUS
  );
  const summary = {
    speed_cell_count: rows.length,
    branch_cell_count: branchRows.length,
    predecessor_h37_artifact_valid: predecessorErrors.length === 0,
    all_rows_certified: allRowsCertified,
    [ALL_SOURCE_CONTAINS_ZERO_FIELD]: branchRows.every(
      (row) => row[SOURCE_CONTAINS_ZERO_FIELD]
    ),
    max_abs_source_equation_coeff_y0_to_y42_interval: root.formatSmallNumber(
      maxField(branchRows, MAX_SOURCE_FIELD)
    ),
    max_abs_Q_D_plus_39Q_G_y38_coefficient_interval: root.formatSmallNumber(
      maxIdentityAbs(rows, "Q_D_plus_39Q_G_y38_coefficient_interval")
    ),
    all_QD_QG_coefficient_identity_intervals_contain_zero: rows.every((row) =>
      Array.from({ length: H_COUNT }, (_, index) => {
        const fieldName = `Q_D_plus_${index + 1 === 1 ? "" : `${index + 1}`}Q_G_y${index}_coefficient_interval`;
        return containsZero(row[fieldName].map(Number));
      }).every(Boolean)
    ),
    h38_interval_hull: coefficientHull(
      branchRows.map((row) => row.h38_interval.map(Number))
    ),
    Q_G_y38_coefficient_interval_hull: coefficientHull(
      rows.map((row) => row.Q_G_y38_coefficient_interval.map(Number))
    ),
    Q_D_y38_coefficient_interval_hull: coefficientHull(
      rows.map((row) => row.Q_D_y38_coefficient_interval.map(Number))
    ),
    max_abs_h38_interval: root.formatSmallNumber(
      Math.max(
        ...branchRows.map((row) => maxAbsInterval(row.h38_interval.map(Number)))
      )
    ),
    max_abs_Q_G_y38_coefficient_interval: root.formatSmallNumber(
      maxField(rows, qFieldName("Q_G", 38, "max_abs_coefficient"))
    ),
    max_abs_Q_D_y38_coefficient_interval: root.formatSmallNumber(
      maxField(rows, qFieldName("Q_D", 38, "max_abs_coefficient"))
    ),
    max_Q_G_y38_loss_on_first_y_cell: root.formatSmallNumber(
      maxField(rows, "Q_G_y38_loss_on_first_y_cell")
    ),
    max_Q_D_y38_loss_on_first_y_cell: root.formatSmallNumber(
      maxField(rows, "Q_D_y38_loss_on_first_y_cell")
    ),
    min_Q_G_remaining_thirty_ninth_order_tail_budget: root.formatSmallNumber(
      minField(rows, "Q_G_remaining_thirty_ninth_order_tail_budget")
    ),
    min_Q_D_remaining_thirty_ninth_order_tail_budget: root.formatSmallNumber(
      minField(rows, "Q_D_remaining_thirty_ninth_order_tail_budget")
    ),
    inherited_h37_interval_hull:
      predecessorArtifact.thirty_seventh_order_post_u_successor_coefficient_summary
        .h37_interval_hull,
    inherited_Q_G_y37_coefficient_interval_hull:
      predecessorArtifact.thirty_seventh_order_post_u_successor_coefficient_summary
        .Q_G_y37_coefficient_interval_hull,
    inherited_Q_D_y37_coefficient_interval_hull:
      predecessorArtifact.thirty_seventh_order_post_u_successor_coefficient_summary
        .Q_D_y37_coefficient_interval_hull,
    status:
      allRowsCertified && predecessorErrors.length === 0
        ? CERTIFIED_STATUS
        : "theta3minus-fold-pair-first-y-GD-thirty-eighth-order-post-U-successor-coefficient-open",
  };

  for (let index = 0; index < H_COUNT; index += 1) {
    summary[`min_h${index}_solve_slope_clearance`] =
      root.formatSmallNumber(
        minField(branchRows, hFieldName(index, "solve_slope_clearance"))
      );
    summary[hFieldName(index, "interval_hull")] = coefficientHull(
      branchRows.map((row) => row[hFieldName(index)].map(Number))
    );
  }

  return summary;
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyEighthOrderPostUSuccessorCoefficientCertificate(options = {}) {
  const predecessorArtifact =
    options.predecessorArtifact ??
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtySeventhOrderPostUSuccessorCoefficientCertificate(options.predecessorOptions ?? options);
  const rows =
    predecessorArtifact.thirty_seventh_order_post_u_successor_coefficient_rows.map(
      (predecessorRow, speedIndex) =>
        intervalRowForPredecessorRow({ speedIndex, predecessorRow })
    );
  const summary = summarizeRows({ rows, predecessorArtifact });
  const passed = summary.status === CERTIFIED_STATUS;

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_THIRTY_EIGHTH_ORDER_POST_U_SUCCESSOR_COEFFICIENT_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-seventh-order-post-u-successor-coefficient-certificate.md",
    ],
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-eighth-order-post-u-successor-coefficient-certificate.md",
    thirty_eighth_order_post_u_successor_coefficient_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: root.SPEED_RATIO_ENCLOSURE,
      speed_cell_count: SPEED_CELL_COUNT,
      series_order: SERIES_ORDER,
      first_y_cell: [0, root.formatSmallNumber(FIRST_Y_CELL_UPPER)],
      moving_fold_chart: "theta=theta_3minus(nu)-y^2",
      predecessor_h37_artifact:
        "thirty-seventh-order post-U successor coefficient certificate",
      h_root_graph_chart:
        "delta_epsilon=delta_f+epsilon*beta*y+gamma*y^2+h0_epsilon*y^3+...+h37_epsilon*y^40+h38_epsilon*y^41+O(y^42)",
      h_solve_slope_policy:
        "uses the inherited fold-null slope S_epsilon=epsilon*beta*F_eta_eta for h38 after the h37 predecessor row",
      intervalized_quantity:
        "thirty-eighth-order coefficients of Q_G=(P-L)/y^2 and Q_D=(D_pair-L)/y^2 at y=0",
      finite_remainder_policy:
        "coefficient interval only; the successor O(y^39) quotient tail remains open before full first-y enclosure",
      successor_coefficient_equation:
        "Shift_42(F_epsilon(y,h_{<=37}+y^38*X38,nu))=C_{38,epsilon}(nu)+S_{38,epsilon}(nu)*X38+O(y), with X38(0,nu)=h38_epsilon(nu)",
    },
    thirty_eighth_order_post_u_successor_coefficient_rows: rows,
    thirty_eighth_order_post_u_successor_coefficient_summary: summary,
    closure_burndown: [
      {
        row: "theta3minus.fold-pair-first-y-GD-thirty-seventh-order-post-U-successor-coefficient",
        status: "directed-rounded-interval-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-thirty-eighth-order-post-U-successor-coefficient",
        status: passed ? "directed-rounded-interval-certified" : "open",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-finite-shift31-next-successor-root-tail-tube",
        status: "directed-rounded-positive-y-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-thirty-ninth-order-successor-tail-bound",
        status: "directed-rounded-open",
      },
    ],
    artifact_claim: {
      assumes_fixed_speed_window: false,
      inherits_directed_rounded_first_y_GD_thirty_seventh_order_post_u_successor_coefficient_enclosure:
        true,
      certifies_directed_rounded_first_y_GD_thirty_eighth_order_post_u_successor_coefficient_enclosure:
        passed,
      certifies_directed_rounded_first_y_GD_finite_successor_root_tail_tube:
        false,
      certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
        false,
      certifies_directed_rounded_first_y_GD_finite_remainder_bound: false,
      certifies_directed_rounded_first_y_GD_jet_enclosure: false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_I1_regular_critical_exhaustion: false,
      retained_branch: false,
      claim_level:
        "Directed-rounded interval certificate for h38 and the induced thirty-eighth-order first-y quotient coefficients Q_G38 and Q_D38 on the fold-pair h-root graph. It turns the thirty-eighth-order quotient-tail constant term into a coefficient row and sharpens the zero-touching quotient burden to the thirty-ninth-order successor tail; full first-y enclosure, scaled remainder, I1 closure, quadrature, and retained branch status remain open.",
    },
    result: {
      theory_status: summary.status,
      first_successor_row:
        "theta3minus.fold-pair-first-y-GD-thirty-ninth-order-successor-tail-bound-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The zero-touching first-y quotient tail has been sharpened again: h38, Q_G38, and Q_D38 are interval-certified with the preserved Q_D38+39Q_G38 identity.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyEighthOrderPostUSuccessorCoefficientCertificate(
  artifact
) {
  const errors = [];
  const summary =
    artifact?.thirty_eighth_order_post_u_successor_coefficient_summary;
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_THIRTY_EIGHTH_ORDER_POST_U_SUCCESSOR_COEFFICIENT_CERTIFICATE_SCHEMA,
    "schema must match theta3minus fold-pair first-y G/D thirty-eighth-order post-U successor coefficient certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus fold-pair first-y G/D thirty-eighth-order post-U successor coefficient packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.thirty_eighth_order_post_u_successor_coefficient_parameters
      ?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "first-y thirty-eighth-order post-U successor coefficient certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.thirty_eighth_order_post_u_successor_coefficient_parameters
      ?.speed_band === undefined &&
      artifact?.thirty_eighth_order_post_u_successor_coefficient_parameters
        ?.speed_window === undefined &&
      artifact?.thirty_eighth_order_post_u_successor_coefficient_parameters
        ?.speed_min === undefined &&
      artifact?.thirty_eighth_order_post_u_successor_coefficient_parameters
        ?.speed_max === undefined,
    "first-y thirty-eighth-order post-U successor coefficient parameters must not contain speed-band fields",
    errors
  );
  assertField(
    summary?.status === CERTIFIED_STATUS &&
      summary?.speed_cell_count === SPEED_CELL_COUNT &&
      summary?.branch_cell_count === 2 * SPEED_CELL_COUNT &&
      summary?.predecessor_h37_artifact_valid === true &&
      summary?.all_rows_certified === true &&
      H_SLOPE_MINIMUMS.every(
        (minimum, index) =>
          Number(summary?.[`min_h${index}_solve_slope_clearance`]) > minimum
      ) &&
      summary?.[ALL_SOURCE_CONTAINS_ZERO_FIELD] === true &&
      Number.isFinite(
        Number(summary?.max_abs_source_equation_coeff_y0_to_y42_interval)
      ) &&
      Number(summary?.max_abs_source_equation_coeff_y0_to_y42_interval) <
        4.9e24 &&
      Number.isFinite(Number(summary?.max_abs_h38_interval)) &&
      Number(summary?.max_abs_h38_interval) < 1.9e24 &&
      Number.isFinite(Number(summary?.max_abs_Q_G_y38_coefficient_interval)) &&
      Number(summary?.max_abs_Q_G_y38_coefficient_interval) < 1.6e24 &&
      Number.isFinite(Number(summary?.max_abs_Q_D_y38_coefficient_interval)) &&
      Number(summary?.max_abs_Q_D_y38_coefficient_interval) < 6.2e25 &&
      Number.isFinite(
        Number(summary?.max_abs_Q_D_plus_39Q_G_y38_coefficient_interval)
      ) &&
      Number(summary?.max_abs_Q_D_plus_39Q_G_y38_coefficient_interval) <
        1.3e26 &&
      Number(summary?.min_Q_G_remaining_thirty_ninth_order_tail_budget) >
        1e106 &&
      Number(summary?.min_Q_D_remaining_thirty_ninth_order_tail_budget) >
        1e106 &&
      summary?.all_QD_QG_coefficient_identity_intervals_contain_zero === true,
    "first-y thirty-eighth-order post-U successor coefficient rows must certify h38, source coefficient containment, Q_G38/Q_D38 coefficients, and positive successor-tail budget",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_directed_rounded_first_y_GD_thirty_eighth_order_post_u_successor_coefficient_enclosure ===
      true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_finite_successor_root_tail_tube ===
        false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound ===
        false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_finite_remainder_bound ===
        false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_jet_enclosure === false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_fold_pair_scaled_remainder === false &&
      artifact?.artifact_claim?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact claim must keep finite successor tube, continuous tail, full quotient, scaled remainder, I1, and retention open",
    errors
  );
  return errors;
}

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out") {
      options.out = argv[++index];
    } else if (arg === "--validate") {
      options.validate = argv[++index];
    } else if (arg === "--schema") {
      options.schema = true;
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-eighth-order-post-u-successor-coefficient-certificate.mjs [options]",
    "",
    "Options:",
    "  --out <path>       Write artifact JSON",
    "  --validate <path>  Validate an artifact JSON",
    "  --schema           Print artifact schema metadata",
  ].join("\n");
}

function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    console.error(usage());
    process.exitCode = 1;
    return;
  }
  if (options.schema) {
    console.log(
      JSON.stringify(
        {
          artifact_schema:
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_THIRTY_EIGHTH_ORDER_POST_U_SUCCESSOR_COEFFICIENT_CERTIFICATE_SCHEMA,
          packet_id: PACKET_ID,
          promotion_status: PROMOTION_STATUS,
        },
        null,
        2
      )
    );
    return;
  }
  if (options.validate) {
    const artifact = JSON.parse(fs.readFileSync(options.validate, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyEighthOrderPostUSuccessorCoefficientCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  try {
    const artifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyEighthOrderPostUSuccessorCoefficientCertificate();
    const errors =
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyEighthOrderPostUSuccessorCoefficientCertificate(
        artifact
      );
    if (errors.length > 0) {
      throw new Error(`artifact validation failed: ${errors.join("; ")}`);
    }
    const output = `${JSON.stringify(artifact, null, 2)}\n`;
    if (options.out) {
      fs.mkdirSync(path.dirname(options.out), { recursive: true });
      fs.writeFileSync(options.out, output);
    } else {
      process.stdout.write(output);
    }
  } catch (error) {
    console.error(error.stack ?? error.message);
    process.exitCode = 1;
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  main();
}
