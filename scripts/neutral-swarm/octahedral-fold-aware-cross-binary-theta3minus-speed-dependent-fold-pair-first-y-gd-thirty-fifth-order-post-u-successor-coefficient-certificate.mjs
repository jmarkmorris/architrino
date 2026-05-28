#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyFourthOrderPostUSuccessorCoefficientCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyFourthOrderPostUSuccessorCoefficientCertificate,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-fourth-order-post-u-successor-coefficient-certificate.mjs";
import {
  theta3minusFoldPairScaledRootTubeCellInternals as root,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_THIRTY_FIFTH_ORDER_POST_U_SUCCESSOR_COEFFICIENT_CERTIFICATE_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-fifth-order-post-u-successor-coefficient-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_thirty_fifth_order_post_u_successor_coefficient_certificate";
const PROMOTION_STATUS = "priority-only";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const SOURCE_COEFFICIENT = -1;
const SERIES_ORDER = 39;
const H_COUNT = 36;
const PREDECESSOR_H_COUNT = 35;
const TARGET_INDEX = 35;
const FIRST_Y_CELL_UPPER = 0.115 / 64;
const SPEED_CELL_COUNT = 128;
const CERTIFIED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-thirty-fifth-order-post-U-successor-coefficient-certified";
const ROW_CERTIFIED_STATUS =
  "directed-rounded-first-y-GD-thirty-fifth-order-post-U-successor-coefficient-enclosed";
const SOURCE_FIELD = "source_equation_coefficients_y0_to_y39";
const SOURCE_CONTAINS_ZERO_FIELD =
  "source_equation_coefficients_contain_zero_y0_to_y39";
const ALL_SOURCE_CONTAINS_ZERO_FIELD =
  "all_source_equation_coefficients_contain_zero_y0_to_y39";
const MAX_SOURCE_FIELD = "max_abs_source_equation_coeff_y0_to_y39";
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

function sourceEquationSeries({ cell, branchSign, hIntervals }) {
  const { delta, phi } = branchSeriesCoordinates({
    cell,
    branchSign,
    hIntervals,
  });
  return add(
    add(
      scaleByInterval(
        power(delta, 2),
        root.inverseSpeedSquaredInterval(cell.speed_interval)
      ),
      constant(-2)
    ),
    add(sinSeries(phi), sinSeries(delta))
  );
}

function solveH35Interval({ cell, branchSign, branchRow, hIntervals }) {
  const zeroHIntervals = [...hIntervals];
  zeroHIntervals[TARGET_INDEX] = [0, 0];
  const zeroSeries = sourceEquationSeries({
    cell,
    branchSign,
    hIntervals: zeroHIntervals,
  });
  const slope = numericInterval(branchRow.h34_solve_slope_interval);
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

function intervalRowForPredecessorRow({ speedIndex, predecessorRow }) {
  const cell = cellFromPredecessorRow(predecessorRow);
  const branchSolves = predecessorRow.branch_rows.map((predecessorBranchRow) => {
    const branch = predecessorBranchRow.branch;
    const branchSign = root.branchSign(branch);
    const hIntervals = hIntervalsFromPredecessorBranch(predecessorBranchRow);
    const solve = solveH35Interval({
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
      inherited_h34_interval: predecessorBranchRow.h34_interval,
      h35_interval: root.formatInterval(solve.hInterval),
      h35_solve_slope_interval: root.formatInterval(solve.hSlopeInterval),
      h35_solve_slope_sign: slope.sign,
      h35_solve_slope_clearance: root.formatSmallNumber(slope.clearance),
      h35_residual_before_solve: root.formatInterval(
        solve.hResidualBeforeSolve
      ),
      [SOURCE_FIELD]: sourceSeries.map(root.formatInterval),
      [SOURCE_CONTAINS_ZERO_FIELD]: sourceSeries.every(containsZero),
      [MAX_SOURCE_FIELD]: root.formatSmallNumber(
        Math.max(...sourceSeries.map(maxAbsInterval))
      ),
      G_branch_coefficients_y0_to_y37: gSeries
        .slice(0, 38)
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
  const qGRemainingThirtySixthOrderTailBudget =
    qGRemainingMargin / FIRST_Y_CELL_UPPER ** 36;
  const qDRemainingThirtySixthOrderTailBudget =
    qDRemainingMargin / FIRST_Y_CELL_UPPER ** 36;
  const qDPlusQGIdentities = qD.map((interval, index) =>
    root.addIntervals(interval, root.scaleInterval(qG[index], index + 1))
  );
  const row = {
    cell_id: `speed.${speedIndex}.first-y`,
    speed_interval: predecessorRow.speed_interval,
    first_y_cell: [0, root.formatSmallNumber(FIRST_Y_CELL_UPPER)],
    delta_fold_interval: predecessorRow.delta_fold_interval,
    phi_fold_interval: predecessorRow.phi_fold_interval,
    beta_interval: predecessorRow.beta_interval,
    gamma_interval: predecessorRow.gamma_interval,
    L_interval: predecessorRow.L_interval,
    branch_rows: branchRows,
    G_pair_coefficients_y0_to_y37: pairG.slice(0, 38).map(root.formatInterval),
    D_pair_coefficients_y0_to_y37: pairD.slice(0, 38).map(root.formatInterval),
    P0_minus_L_interval: root.formatInterval(p0MinusL),
    P1_interval: root.formatInterval(pairG[1]),
    D0_minus_L_interval: root.formatInterval(d0MinusL),
    D1_interval: root.formatInterval(pairD[1]),
    Q_G_y0_coefficient_sign: qG0Sign.sign,
    Q_G_y0_coefficient_clearance: root.formatSmallNumber(qG0Sign.clearance),
    Q_D_y0_coefficient_sign: qD0Sign.sign,
    Q_D_y0_coefficient_clearance: root.formatSmallNumber(qD0Sign.clearance),
    Q_G_y35_loss_on_first_y_cell: root.formatSmallNumber(qGLosses[35]),
    Q_D_y35_loss_on_first_y_cell: root.formatSmallNumber(qDLosses[35]),
    Q_G_remaining_thirty_sixth_order_tail_budget: root.formatSmallNumber(
      qGRemainingThirtySixthOrderTailBudget
    ),
    Q_D_remaining_thirty_sixth_order_tail_budget: root.formatSmallNumber(
      qDRemainingThirtySixthOrderTailBudget
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
    qGRemainingThirtySixthOrderTailBudget > 6e75 &&
    qDRemainingThirtySixthOrderTailBudget > 6e75
      ? ROW_CERTIFIED_STATUS
      : "first-y-GD-thirty-fifth-order-post-U-successor-coefficient-enclosure-open";

  return row;
}

function summarizeRows({ rows, predecessorArtifact }) {
  const predecessorErrors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyFourthOrderPostUSuccessorCoefficientCertificate(
      predecessorArtifact
    );
  const branchRows = rows.flatMap((row) => row.branch_rows);
  const allRowsCertified = rows.every(
    (row) => row.row_status === ROW_CERTIFIED_STATUS
  );
  const summary = {
    speed_cell_count: rows.length,
    branch_cell_count: branchRows.length,
    predecessor_h34_artifact_valid: predecessorErrors.length === 0,
    all_rows_certified: allRowsCertified,
    [ALL_SOURCE_CONTAINS_ZERO_FIELD]: branchRows.every(
      (row) => row[SOURCE_CONTAINS_ZERO_FIELD]
    ),
    max_abs_source_equation_coeff_y0_to_y39_interval: root.formatSmallNumber(
      maxField(branchRows, MAX_SOURCE_FIELD)
    ),
    max_abs_Q_D_plus_36Q_G_y35_coefficient_interval: root.formatSmallNumber(
      maxIdentityAbs(rows, "Q_D_plus_36Q_G_y35_coefficient_interval")
    ),
    all_QD_QG_coefficient_identity_intervals_contain_zero: rows.every((row) =>
      Array.from({ length: H_COUNT }, (_, index) => {
        const fieldName = `Q_D_plus_${index + 1 === 1 ? "" : `${index + 1}`}Q_G_y${index}_coefficient_interval`;
        return containsZero(row[fieldName].map(Number));
      }).every(Boolean)
    ),
    h35_interval_hull: coefficientHull(
      branchRows.map((row) => row.h35_interval.map(Number))
    ),
    Q_G_y35_coefficient_interval_hull: coefficientHull(
      rows.map((row) => row.Q_G_y35_coefficient_interval.map(Number))
    ),
    Q_D_y35_coefficient_interval_hull: coefficientHull(
      rows.map((row) => row.Q_D_y35_coefficient_interval.map(Number))
    ),
    max_abs_h35_interval: root.formatSmallNumber(
      Math.max(
        ...branchRows.map((row) => maxAbsInterval(row.h35_interval.map(Number)))
      )
    ),
    max_abs_Q_G_y35_coefficient_interval: root.formatSmallNumber(
      maxField(rows, qFieldName("Q_G", 35, "max_abs_coefficient"))
    ),
    max_abs_Q_D_y35_coefficient_interval: root.formatSmallNumber(
      maxField(rows, qFieldName("Q_D", 35, "max_abs_coefficient"))
    ),
    max_Q_G_y35_loss_on_first_y_cell: root.formatSmallNumber(
      maxField(rows, "Q_G_y35_loss_on_first_y_cell")
    ),
    max_Q_D_y35_loss_on_first_y_cell: root.formatSmallNumber(
      maxField(rows, "Q_D_y35_loss_on_first_y_cell")
    ),
    min_Q_G_remaining_thirty_sixth_order_tail_budget: root.formatSmallNumber(
      minField(rows, "Q_G_remaining_thirty_sixth_order_tail_budget")
    ),
    min_Q_D_remaining_thirty_sixth_order_tail_budget: root.formatSmallNumber(
      minField(rows, "Q_D_remaining_thirty_sixth_order_tail_budget")
    ),
    inherited_h34_interval_hull:
      predecessorArtifact.thirty_fourth_order_post_u_successor_coefficient_summary
        .h34_interval_hull,
    inherited_Q_G_y34_coefficient_interval_hull:
      predecessorArtifact.thirty_fourth_order_post_u_successor_coefficient_summary
        .Q_G_y34_coefficient_interval_hull,
    inherited_Q_D_y34_coefficient_interval_hull:
      predecessorArtifact.thirty_fourth_order_post_u_successor_coefficient_summary
        .Q_D_y34_coefficient_interval_hull,
    status:
      allRowsCertified && predecessorErrors.length === 0
        ? CERTIFIED_STATUS
        : "theta3minus-fold-pair-first-y-GD-thirty-fifth-order-post-U-successor-coefficient-open",
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

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyFifthOrderPostUSuccessorCoefficientCertificate(options = {}) {
  const predecessorArtifact =
    options.predecessorArtifact ??
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyFourthOrderPostUSuccessorCoefficientCertificate(options.predecessorOptions ?? options);
  const rows =
    predecessorArtifact.thirty_fourth_order_post_u_successor_coefficient_rows.map(
      (predecessorRow, speedIndex) =>
        intervalRowForPredecessorRow({ speedIndex, predecessorRow })
    );
  const summary = summarizeRows({ rows, predecessorArtifact });
  const passed = summary.status === CERTIFIED_STATUS;

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_THIRTY_FIFTH_ORDER_POST_U_SUCCESSOR_COEFFICIENT_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-fourth-order-post-u-successor-coefficient-certificate.md",
    ],
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-fifth-order-post-u-successor-coefficient-certificate.md",
    thirty_fifth_order_post_u_successor_coefficient_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: root.SPEED_RATIO_ENCLOSURE,
      speed_cell_count: SPEED_CELL_COUNT,
      series_order: SERIES_ORDER,
      first_y_cell: [0, root.formatSmallNumber(FIRST_Y_CELL_UPPER)],
      moving_fold_chart: "theta=theta_3minus(nu)-y^2",
      predecessor_h34_artifact:
        "thirty-fourth-order post-U successor coefficient certificate",
      h_root_graph_chart:
        "delta_epsilon=delta_f+epsilon*beta*y+gamma*y^2+h0_epsilon*y^3+...+h34_epsilon*y^37+h35_epsilon*y^38+O(y^39)",
      h_solve_slope_policy:
        "uses the inherited fold-null slope S_epsilon=epsilon*beta*F_eta_eta for h35 after the h34 predecessor row",
      intervalized_quantity:
        "thirty-fifth-order coefficients of Q_G=(P-L)/y^2 and Q_D=(D_pair-L)/y^2 at y=0",
      finite_remainder_policy:
        "coefficient interval only; the successor O(y^36) quotient tail remains open before full first-y enclosure",
      successor_coefficient_equation:
        "Shift_39(F_epsilon(y,h_{<=34}+y^35*X35,nu))=C_{35,epsilon}(nu)+S_{35,epsilon}(nu)*X35+O(y), with X35(0,nu)=h35_epsilon(nu)",
    },
    thirty_fifth_order_post_u_successor_coefficient_rows: rows,
    thirty_fifth_order_post_u_successor_coefficient_summary: summary,
    closure_burndown: [
      {
        row: "theta3minus.fold-pair-first-y-GD-thirty-fourth-order-post-U-successor-coefficient",
        status: "directed-rounded-interval-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-thirty-fifth-order-post-U-successor-coefficient",
        status: passed ? "directed-rounded-interval-certified" : "open",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-finite-shift31-next-successor-root-tail-tube",
        status: "directed-rounded-positive-y-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-thirty-sixth-order-successor-tail-bound",
        status: "directed-rounded-open",
      },
    ],
    artifact_claim: {
      assumes_fixed_speed_window: false,
      inherits_directed_rounded_first_y_GD_thirty_fourth_order_post_u_successor_coefficient_enclosure:
        true,
      certifies_directed_rounded_first_y_GD_thirty_fifth_order_post_u_successor_coefficient_enclosure:
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
        "Directed-rounded interval certificate for h35 and the induced thirty-fifth-order first-y quotient coefficients Q_G35 and Q_D35 on the fold-pair h-root graph. It turns the thirty-fifth-order quotient-tail constant term into a coefficient row and sharpens the zero-touching quotient burden to the thirty-sixth-order successor tail; full first-y enclosure, scaled remainder, I1 closure, quadrature, and retained branch status remain open.",
    },
    result: {
      theory_status: summary.status,
      first_successor_row:
        "theta3minus.fold-pair-first-y-GD-thirty-sixth-order-successor-tail-bound-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The zero-touching first-y quotient tail has been sharpened again: h35, Q_G35, and Q_D35 are interval-certified with the preserved Q_D35+36Q_G35 identity.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyFifthOrderPostUSuccessorCoefficientCertificate(
  artifact
) {
  const errors = [];
  const summary =
    artifact?.thirty_fifth_order_post_u_successor_coefficient_summary;
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_THIRTY_FIFTH_ORDER_POST_U_SUCCESSOR_COEFFICIENT_CERTIFICATE_SCHEMA,
    "schema must match theta3minus fold-pair first-y G/D thirty-fifth-order post-U successor coefficient certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus fold-pair first-y G/D thirty-fifth-order post-U successor coefficient packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.thirty_fifth_order_post_u_successor_coefficient_parameters
      ?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "first-y thirty-fifth-order post-U successor coefficient certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.thirty_fifth_order_post_u_successor_coefficient_parameters
      ?.speed_band === undefined &&
      artifact?.thirty_fifth_order_post_u_successor_coefficient_parameters
        ?.speed_window === undefined &&
      artifact?.thirty_fifth_order_post_u_successor_coefficient_parameters
        ?.speed_min === undefined &&
      artifact?.thirty_fifth_order_post_u_successor_coefficient_parameters
        ?.speed_max === undefined,
    "first-y thirty-fifth-order post-U successor coefficient parameters must not contain speed-band fields",
    errors
  );
  assertField(
    summary?.status === CERTIFIED_STATUS &&
      summary?.speed_cell_count === SPEED_CELL_COUNT &&
      summary?.branch_cell_count === 2 * SPEED_CELL_COUNT &&
      summary?.predecessor_h34_artifact_valid === true &&
      summary?.all_rows_certified === true &&
      H_SLOPE_MINIMUMS.every(
        (minimum, index) =>
          Number(summary?.[`min_h${index}_solve_slope_clearance`]) > minimum
      ) &&
      summary?.[ALL_SOURCE_CONTAINS_ZERO_FIELD] === true &&
      Number.isFinite(
        Number(summary?.max_abs_source_equation_coeff_y0_to_y39_interval)
      ) &&
      Number(summary?.max_abs_source_equation_coeff_y0_to_y39_interval) <
        2.3e22 &&
      Number.isFinite(Number(summary?.max_abs_h35_interval)) &&
      Number(summary?.max_abs_h35_interval) < 8.8e21 &&
      Number.isFinite(Number(summary?.max_abs_Q_G_y35_coefficient_interval)) &&
      Number(summary?.max_abs_Q_G_y35_coefficient_interval) < 7.5e21 &&
      Number.isFinite(Number(summary?.max_abs_Q_D_y35_coefficient_interval)) &&
      Number(summary?.max_abs_Q_D_y35_coefficient_interval) < 2.7e23 &&
      Number.isFinite(
        Number(summary?.max_abs_Q_D_plus_36Q_G_y35_coefficient_interval)
      ) &&
      Number(summary?.max_abs_Q_D_plus_36Q_G_y35_coefficient_interval) <
        5.4e23 &&
      Number(summary?.min_Q_G_remaining_thirty_sixth_order_tail_budget) >
        5e97 &&
      Number(summary?.min_Q_D_remaining_thirty_sixth_order_tail_budget) >
        5e97 &&
      summary?.all_QD_QG_coefficient_identity_intervals_contain_zero === true,
    "first-y thirty-fifth-order post-U successor coefficient rows must certify h35, source coefficient containment, Q_G35/Q_D35 coefficients, and positive successor-tail budget",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_directed_rounded_first_y_GD_thirty_fifth_order_post_u_successor_coefficient_enclosure ===
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
    "Usage: node scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-fifth-order-post-u-successor-coefficient-certificate.mjs [options]",
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
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_THIRTY_FIFTH_ORDER_POST_U_SUCCESSOR_COEFFICIENT_CERTIFICATE_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyFifthOrderPostUSuccessorCoefficientCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  try {
    const artifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyFifthOrderPostUSuccessorCoefficientCertificate();
    const errors =
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyFifthOrderPostUSuccessorCoefficientCertificate(
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
