#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.mjs";
import {
  theta3minusFoldPairScaledRootTubeCellInternals as root,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_QUARTIC_JET_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quartic-jet-coefficient-interval-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_quartic_jet_coefficient_interval_certificate";
const PROMOTION_STATUS = "priority-only";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const ORDER = 8;
const H_COUNT = 5;
const SOURCE_COEFFICIENT = -1;
const FIRST_Y_CELL_UPPER = 0.115 / 64;
const QUARTIC_SPEED_CELL_COUNT = 128;
const CERTIFIED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-quartic-jet-coefficient-interval-certified";
const ROW_CERTIFIED_STATUS =
  "directed-rounded-first-y-GD-quartic-jet-coefficient-enclosed";
const SOURCE_FIELD = "source_equation_coefficients_y0_to_y8";
const SOURCE_CONTAINS_ZERO_FIELD =
  "source_equation_coefficients_contain_zero_y0_to_y8";
const ALL_SOURCE_CONTAINS_ZERO_FIELD =
  "all_source_equation_coefficients_contain_zero_y0_to_y8";
const MAX_SOURCE_FIELD = "max_abs_source_equation_coeff_y0_to_y8";
const H_SLOPE_MINIMUMS = [0.79, 0.79, 0.79, 0.79, 0.79];

function zeros() {
  return Array.from({ length: ORDER + 1 }, () => [0, 0]);
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
  for (let leftIndex = 0; leftIndex <= ORDER; leftIndex += 1) {
    for (
      let rightIndex = 0;
      rightIndex + leftIndex <= ORDER;
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
  for (let order = 1; order <= ORDER; order += 1) {
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

function nilpotentPowers(series) {
  const nilpotent = [...series];
  nilpotent[0] = [0, 0];
  const n2 = power(nilpotent, 2);
  const n3 = multiply(n2, nilpotent);
  const n4 = multiply(n2, n2);
  const n5 = multiply(n4, nilpotent);
  const n6 = multiply(n4, n2);
  const n7 = multiply(n6, nilpotent);
  const n8 = multiply(n4, n4);
  return { nilpotent, n2, n3, n4, n5, n6, n7, n8 };
}

function sinSeries(series) {
  const center = series[0];
  const { nilpotent, n2, n3, n4, n5, n6, n7, n8 } =
    nilpotentPowers(series);
  const sinN = subtract(
    add(add(nilpotent, scale(n3, -1 / 6)), scale(n5, 1 / 120)),
    scale(n7, 1 / 5040)
  );
  const cosN = add(
    subtract(
      add(subtract(constant(1), scale(n2, 1 / 2)), scale(n4, 1 / 24)),
      scale(n6, 1 / 720)
    ),
    scale(n8, 1 / 40320)
  );
  return add(
    scaleByInterval(cosN, root.sinInterval(center)),
    scaleByInterval(sinN, root.cosInterval(center))
  );
}

function cosSeries(series) {
  const center = series[0];
  const { nilpotent, n2, n3, n4, n5, n6, n7, n8 } =
    nilpotentPowers(series);
  const sinN = subtract(
    add(add(nilpotent, scale(n3, -1 / 6)), scale(n5, 1 / 120)),
    scale(n7, 1 / 5040)
  );
  const cosN = add(
    subtract(
      add(subtract(constant(1), scale(n2, 1 / 2)), scale(n4, 1 / 24)),
      scale(n6, 1 / 720)
    ),
    scale(n8, 1 / 40320)
  );
  return subtract(
    scaleByInterval(cosN, root.cosInterval(center)),
    scaleByInterval(sinN, root.sinInterval(center))
  );
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

function foldLimitInterval(cell) {
  const foldKernel = root.scaleInterval(
    root.addIntervals(cell.cos_phi_interval, cell.cos_delta_interval),
    -0.5
  );
  const numerator = root.scaleInterval(foldKernel, 8 * SOURCE_COEFFICIENT);
  const denominator = root.multiplyIntervals(
    cell.speed_interval,
    root.positivePowerInterval(cell.delta_fold_interval, 2),
    root.scaleInterval(cell.F_delta_delta_interval, -1),
    cell.beta_interval
  );
  return root.divideIntervals(numerator, denominator);
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

function solveHInterval({ cell, branchSign, index, hIntervals }) {
  const zeroHIntervals = [...hIntervals];
  zeroHIntervals[index] = [0, 0];
  const zeroSeries = sourceEquationSeries({
    cell,
    branchSign,
    hIntervals: zeroHIntervals,
  });
  const sourceCoefficientIndex = index + 4;
  const slope = root.multiplyIntervals(
    root.scaleInterval(cell.F_delta_delta_interval, branchSign),
    cell.beta_interval
  );
  return {
    hInterval: root.divideIntervals(
      root.scaleInterval(zeroSeries[sourceCoefficientIndex], -1),
      slope
    ),
    hSlopeInterval: slope,
    hResidualBeforeSolve: zeroSeries[sourceCoefficientIndex],
  };
}

function solveHIntervals({ cell, branchSign }) {
  const hIntervals = Array.from({ length: H_COUNT }, () => [0, 0]);
  const solves = [];
  for (let index = 0; index < H_COUNT; index += 1) {
    const solve = solveHInterval({ cell, branchSign, index, hIntervals });
    hIntervals[index] = solve.hInterval;
    solves.push(solve);
  }
  return { hIntervals, solves };
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
  for (let order = 0; order < ORDER; order += 1) {
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

function hFieldName(index, suffix) {
  return `h${index}_${suffix}`;
}

function qFieldName(prefix, index, suffix = "coefficient_interval") {
  return `${prefix}_y${index}_${suffix}`;
}

function lossFieldName(prefix, label) {
  return `${prefix}_${label}_loss_on_first_y_cell`;
}

function budgetFieldName(prefix, label) {
  return `${prefix}_remaining_${label}_tail_budget`;
}

function hRowsCertified(branchRows) {
  return branchRows.every((row) =>
    H_SLOPE_MINIMUMS.every(
      (minimum, index) =>
        Number(row[hFieldName(index, "solve_slope_clearance")]) > minimum
    )
  );
}

function intervalRowForSpeedCell({
  speedIndex,
  speedInterval,
  leftRow,
  rightRow,
}) {
  const cell = root.foldCellFromEndpointRows({
    leftRow,
    rightRow,
    speedInterval,
  });
  const branchSolves = ["-", "+"].map((branch) => {
    const branchSign = root.branchSign(branch);
    const { hIntervals, solves } = solveHIntervals({ cell, branchSign });
    const sourceSeries = sourceEquationSeries({
      cell,
      branchSign,
      hIntervals,
    });
    const gSeries = branchGSeries({
      cell,
      branchSign,
      hIntervals,
    });
    const hTube = root.BRANCH_H_TUBES[branch];
    const row = {
      branch,
      h_tube: root.formatInterval(hTube),
      h0_interval_inside_predecessor_tube:
        hIntervals[0][0] >= hTube[0] && hIntervals[0][1] <= hTube[1],
      [SOURCE_FIELD]: sourceSeries.map(root.formatInterval),
      [SOURCE_CONTAINS_ZERO_FIELD]: sourceSeries.every(containsZero),
      [MAX_SOURCE_FIELD]: root.formatSmallNumber(
        Math.max(...sourceSeries.map(maxAbsInterval))
      ),
      G_branch_coefficients_y0_to_y6: gSeries
        .slice(0, 7)
        .map(root.formatInterval),
    };

    solves.forEach((solve, index) => {
      const slope = root.intervalSignAndClearance(solve.hSlopeInterval);
      row[hFieldName(index, "interval")] = root.formatInterval(solve.hInterval);
      row[hFieldName(index, "solve_slope_interval")] = root.formatInterval(
        solve.hSlopeInterval
      );
      row[hFieldName(index, "solve_slope_sign")] = slope.sign;
      row[hFieldName(index, "solve_slope_clearance")] = root.formatSmallNumber(
        slope.clearance
      );
      row[hFieldName(index, "residual_before_solve")] = root.formatInterval(
        solve.hResidualBeforeSolve
      );
    });

    return {
      branch,
      hIntervals,
      row,
    };
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
  const limit = foldLimitInterval(cell);
  const p0MinusL = root.subtractIntervals(pairG[0], limit);
  const d0MinusL = root.subtractIntervals(pairD[0], limit);
  const qG = Array.from({ length: 5 }, (_, index) => pairG[index + 2]);
  const qD = Array.from({ length: 5 }, (_, index) => pairD[index + 2]);
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
  const qGRemainingFirstOrderBudget =
    qGRemainingMargin / FIRST_Y_CELL_UPPER;
  const qDRemainingFirstOrderBudget =
    qDRemainingMargin / FIRST_Y_CELL_UPPER;
  const qGRemainingCubicTailBudget =
    qGRemainingMargin / FIRST_Y_CELL_UPPER ** 3;
  const qDRemainingCubicTailBudget =
    qDRemainingMargin / FIRST_Y_CELL_UPPER ** 3;
  const qGRemainingQuarticTailBudget =
    qGRemainingMargin / FIRST_Y_CELL_UPPER ** 4;
  const qDRemainingQuarticTailBudget =
    qDRemainingMargin / FIRST_Y_CELL_UPPER ** 4;
  const qGRemainingQuinticTailBudget =
    qGRemainingMargin / FIRST_Y_CELL_UPPER ** 5;
  const qDRemainingQuinticTailBudget =
    qDRemainingMargin / FIRST_Y_CELL_UPPER ** 5;
  const qDPlusQGIdentities = qD.map((interval, index) =>
    root.addIntervals(interval, root.scaleInterval(qG[index], index + 1))
  );
  const row = {
    cell_id: `speed.${speedIndex}.first-y`,
    speed_interval: root.formatInterval(speedInterval),
    first_y_cell: [0, root.formatSmallNumber(FIRST_Y_CELL_UPPER)],
    delta_fold_interval: root.formatInterval(cell.delta_fold_interval),
    phi_fold_interval: root.formatInterval(cell.phi_fold_interval),
    beta_interval: root.formatInterval(cell.beta_interval),
    gamma_interval: root.formatInterval(cell.gamma_interval),
    L_interval: root.formatInterval(limit),
    branch_rows: branchRows,
    G_pair_coefficients_y0_to_y6: pairG.slice(0, 7).map(root.formatInterval),
    D_pair_coefficients_y0_to_y6: pairD.slice(0, 7).map(root.formatInterval),
    P0_minus_L_interval: root.formatInterval(p0MinusL),
    P1_interval: root.formatInterval(pairG[1]),
    D0_minus_L_interval: root.formatInterval(d0MinusL),
    D1_interval: root.formatInterval(pairD[1]),
    Q_G_y0_coefficient_sign: qG0Sign.sign,
    Q_G_y0_coefficient_clearance: root.formatSmallNumber(qG0Sign.clearance),
    Q_D_y0_coefficient_sign: qD0Sign.sign,
    Q_D_y0_coefficient_clearance: root.formatSmallNumber(qD0Sign.clearance),
    Q_G_remaining_first_order_tail_budget: root.formatSmallNumber(
      qGRemainingFirstOrderBudget
    ),
    Q_D_remaining_first_order_tail_budget: root.formatSmallNumber(
      qDRemainingFirstOrderBudget
    ),
    Q_G_remaining_cubic_tail_budget: root.formatSmallNumber(
      qGRemainingCubicTailBudget
    ),
    Q_D_remaining_cubic_tail_budget: root.formatSmallNumber(
      qDRemainingCubicTailBudget
    ),
    Q_G_remaining_quartic_tail_budget: root.formatSmallNumber(
      qGRemainingQuarticTailBudget
    ),
    Q_D_remaining_quartic_tail_budget: root.formatSmallNumber(
      qDRemainingQuarticTailBudget
    ),
    Q_G_remaining_quintic_tail_budget: root.formatSmallNumber(
      qGRemainingQuinticTailBudget
    ),
    Q_D_remaining_quintic_tail_budget: root.formatSmallNumber(
      qDRemainingQuinticTailBudget
    ),
  };

  ["linear", "quadratic", "cubic", "quartic"].forEach((label, labelIndex) => {
    const coefficientIndex = labelIndex + 1;
    row[qFieldName("Q_G", coefficientIndex, "max_abs_coefficient")] =
      root.formatSmallNumber(qGAbs[coefficientIndex]);
    row[qFieldName("Q_D", coefficientIndex, "max_abs_coefficient")] =
      root.formatSmallNumber(qDAbs[coefficientIndex]);
    row[lossFieldName("Q_G", label)] = root.formatSmallNumber(
      qGLosses[coefficientIndex]
    );
    row[lossFieldName("Q_D", label)] = root.formatSmallNumber(
      qDLosses[coefficientIndex]
    );
  });

  qG.forEach((interval, index) => {
    row[qFieldName("Q_G", index)] = root.formatInterval(interval);
    row[qFieldName("Q_D", index)] = root.formatInterval(qD[index]);
    row[
      `Q_D_plus_${index + 1 === 1 ? "" : `${index + 1}`}Q_G_y${index}_coefficient_interval`
    ] = root.formatInterval(qDPlusQGIdentities[index]);
  });

  row.row_status =
    branchRows.every((branchRow) => branchRow.h0_interval_inside_predecessor_tube) &&
    branchRows.every((branchRow) => branchRow[SOURCE_CONTAINS_ZERO_FIELD]) &&
    hRowsCertified(branchRows) &&
    containsZero(p0MinusL) &&
    containsZero(pairG[1]) &&
    containsZero(d0MinusL) &&
    containsZero(pairD[1]) &&
    qG0Sign.sign === "+" &&
    qD0Sign.sign === "-" &&
    qG.slice(1).every(finiteInterval) &&
    qD.slice(1).every(finiteInterval) &&
    qDPlusQGIdentities.every(containsZero) &&
    qGRemainingFirstOrderBudget > 47 &&
    qDRemainingFirstOrderBudget > 47 &&
    qGRemainingCubicTailBudget > 1e7 &&
    qDRemainingCubicTailBudget > 1e7 &&
    qGRemainingQuarticTailBudget > 1e9 &&
    qDRemainingQuarticTailBudget > 1e9 &&
    qGRemainingQuinticTailBudget > 1e12 &&
    qDRemainingQuinticTailBudget > 1e12
      ? ROW_CERTIFIED_STATUS
      : "first-y-GD-quartic-jet-coefficient-enclosure-open";

  return row;
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

function summarizeRows(rows) {
  const branchRows = rows.flatMap((row) => row.branch_rows);
  const allRowsCertified = rows.every(
    (row) => row.row_status === ROW_CERTIFIED_STATUS
  );
  const summary = {
    speed_cell_count: rows.length,
    branch_cell_count: branchRows.length,
    all_rows_certified: allRowsCertified,
    all_h0_intervals_inside_predecessor_tubes: branchRows.every(
      (row) => row.h0_interval_inside_predecessor_tube
    ),
    [ALL_SOURCE_CONTAINS_ZERO_FIELD]: branchRows.every(
      (row) => row[SOURCE_CONTAINS_ZERO_FIELD]
    ),
    max_abs_source_equation_coeff_y0_to_y8_interval: root.formatSmallNumber(
      maxField(branchRows, MAX_SOURCE_FIELD)
    ),
    max_abs_Q_D_plus_Q_G_y0_coefficient_interval: root.formatSmallNumber(
      maxIdentityAbs(rows, "Q_D_plus_Q_G_y0_coefficient_interval")
    ),
    max_abs_Q_D_plus_2Q_G_y1_coefficient_interval: root.formatSmallNumber(
      maxIdentityAbs(rows, "Q_D_plus_2Q_G_y1_coefficient_interval")
    ),
    max_abs_Q_D_plus_3Q_G_y2_coefficient_interval: root.formatSmallNumber(
      maxIdentityAbs(rows, "Q_D_plus_3Q_G_y2_coefficient_interval")
    ),
    max_abs_Q_D_plus_4Q_G_y3_coefficient_interval: root.formatSmallNumber(
      maxIdentityAbs(rows, "Q_D_plus_4Q_G_y3_coefficient_interval")
    ),
    max_abs_Q_D_plus_5Q_G_y4_coefficient_interval: root.formatSmallNumber(
      maxIdentityAbs(rows, "Q_D_plus_5Q_G_y4_coefficient_interval")
    ),
    all_QD_QG_coefficient_identity_intervals_contain_zero: rows.every(
      (row) =>
        containsZero(row.Q_D_plus_Q_G_y0_coefficient_interval.map(Number)) &&
        containsZero(row.Q_D_plus_2Q_G_y1_coefficient_interval.map(Number)) &&
        containsZero(row.Q_D_plus_3Q_G_y2_coefficient_interval.map(Number)) &&
        containsZero(row.Q_D_plus_4Q_G_y3_coefficient_interval.map(Number)) &&
        containsZero(row.Q_D_plus_5Q_G_y4_coefficient_interval.map(Number))
    ),
    min_Q_G_remaining_first_order_tail_budget: root.formatSmallNumber(
      minField(rows, "Q_G_remaining_first_order_tail_budget")
    ),
    min_Q_D_remaining_first_order_tail_budget: root.formatSmallNumber(
      minField(rows, "Q_D_remaining_first_order_tail_budget")
    ),
    min_Q_G_remaining_cubic_tail_budget: root.formatSmallNumber(
      minField(rows, "Q_G_remaining_cubic_tail_budget")
    ),
    min_Q_D_remaining_cubic_tail_budget: root.formatSmallNumber(
      minField(rows, "Q_D_remaining_cubic_tail_budget")
    ),
    min_Q_G_remaining_quartic_tail_budget: root.formatSmallNumber(
      minField(rows, "Q_G_remaining_quartic_tail_budget")
    ),
    min_Q_D_remaining_quartic_tail_budget: root.formatSmallNumber(
      minField(rows, "Q_D_remaining_quartic_tail_budget")
    ),
    min_Q_G_remaining_quintic_tail_budget: root.formatSmallNumber(
      minField(rows, "Q_G_remaining_quintic_tail_budget")
    ),
    min_Q_D_remaining_quintic_tail_budget: root.formatSmallNumber(
      minField(rows, "Q_D_remaining_quintic_tail_budget")
    ),
    status: allRowsCertified
      ? CERTIFIED_STATUS
      : "theta3minus-fold-pair-first-y-GD-quartic-jet-coefficient-interval-open",
  };

  for (let index = 0; index < H_COUNT; index += 1) {
    summary[`min_h${index}_solve_slope_clearance`] =
      root.formatSmallNumber(
        minField(branchRows, hFieldName(index, "solve_slope_clearance"))
      );
    summary[hFieldName(index, "interval_hull")] = coefficientHull(
      branchRows.map((row) => row[hFieldName(index, "interval")].map(Number))
    );
    summary[`max_abs_h${index}_interval`] =
      root.formatSmallNumber(
        Math.max(
          ...branchRows.map((row) =>
            maxAbsInterval(row[hFieldName(index, "interval")].map(Number))
          )
        )
      );
  }

  for (let index = 0; index < 5; index += 1) {
    summary[`Q_G_y${index}_coefficient_interval_hull`] = coefficientHull(
      rows.map((row) => row[qFieldName("Q_G", index)].map(Number))
    );
    summary[`Q_D_y${index}_coefficient_interval_hull`] = coefficientHull(
      rows.map((row) => row[qFieldName("Q_D", index)].map(Number))
    );
    if (index > 0) {
      summary[`max_abs_Q_G_y${index}_coefficient_interval`] =
        root.formatSmallNumber(
          maxField(rows, qFieldName("Q_G", index, "max_abs_coefficient"))
        );
      summary[`max_abs_Q_D_y${index}_coefficient_interval`] =
        root.formatSmallNumber(
          maxField(rows, qFieldName("Q_D", index, "max_abs_coefficient"))
        );
    }
  }

  ["linear", "quadratic", "cubic", "quartic"].forEach((label) => {
    summary[`max_${lossFieldName("Q_G", label)}`] = root.formatSmallNumber(
      maxField(rows, lossFieldName("Q_G", label))
    );
    summary[`max_${lossFieldName("Q_D", label)}`] = root.formatSmallNumber(
      maxField(rows, lossFieldName("Q_D", label))
    );
  });

  return summary;
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdQuarticJetCoefficientIntervalCertificate(
  options = {}
) {
  const speedBreaks = root.makeSpeedBreaks(
    options.speedCellCount ?? QUARTIC_SPEED_CELL_COUNT
  );
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? root.DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  const normalForm =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm({
      speedSamples: speedBreaks,
      ySamples: [0.115, 0.01, 0.001, 0.0005],
      rootSubdivisions,
    });
  const foldRows = normalForm.speed_dependent_fold_normal_form_rows;
  const rows = [];
  for (let speedIndex = 0; speedIndex < speedBreaks.length - 1; speedIndex += 1) {
    rows.push(
      intervalRowForSpeedCell({
        speedIndex,
        speedInterval: root.outwardInterval([
          speedBreaks[speedIndex],
          speedBreaks[speedIndex + 1],
        ]),
        leftRow: foldRows[speedIndex],
        rightRow: foldRows[speedIndex + 1],
      })
    );
  }
  const summary = summarizeRows(rows);
  const passed = summary.status === CERTIFIED_STATUS;
  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_QUARTIC_JET_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate.md",
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-linear-jet-coefficient-interval-certificate.md",
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quadratic-jet-coefficient-interval-certificate.md",
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-cubic-jet-coefficient-interval-certificate.md",
    ],
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quartic-jet-coefficient-interval-certificate.md",
    quartic_jet_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: root.SPEED_RATIO_ENCLOSURE,
      speed_cell_count: speedBreaks.length - 1,
      speed_ratio_cells: speedBreaks.map(root.formatSmallNumber),
      series_order: ORDER,
      first_y_cell: [0, root.formatSmallNumber(FIRST_Y_CELL_UPPER)],
      moving_fold_chart: "theta=theta_3minus(nu)-y^2",
      h_root_graph_chart:
        "delta_epsilon=delta_f+epsilon*beta*y+gamma*y^2+h0_epsilon*y^3+h1_epsilon*y^4+h2_epsilon*y^5+h3_epsilon*y^6+h4_epsilon*y^7+O(y^8)",
      h_solve_slope_policy:
        "uses the fold-local slope S_epsilon=epsilon*beta*F_delta_delta for h0 through h4; avoids uncorrelated subtraction of large source-coefficient intervals at h4",
      intervalized_quantity:
        "constant, linear, quadratic, cubic, and quartic coefficients of Q_G=(P-L)/y^2 and Q_D=(D_pair-L)/y^2 at y=0",
      finite_remainder_policy:
        "quartic coefficient interval only; the O(y^5) quotient tail remains open and must be bounded before full first-y enclosure",
      root_subdivisions_for_fold_rows: rootSubdivisions,
    },
    quartic_jet_rows: rows,
    quartic_jet_summary: summary,
    closure_burndown: [
      {
        row: "theta3minus.fold-pair-first-y-GD-constant-coefficient",
        status: "directed-rounded-interval-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-linear-jet-coefficient",
        status: "directed-rounded-interval-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-quadratic-jet-coefficient",
        status: "directed-rounded-interval-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-cubic-jet-coefficient",
        status: "directed-rounded-interval-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-quartic-jet-coefficient",
        status: passed ? "directed-rounded-interval-certified" : "open",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-quintic-tail-bound",
        status: "directed-rounded-open",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure",
        status: "blocked-by-quintic-tail-bound",
      },
      {
        row: "theta3minus.fold-pair-scaled-remainder-continuous-collar",
        status: "blocked-by-directed-rounded-first-y-GD-enclosure",
      },
    ],
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_directed_rounded_first_y_GD_constant_coefficient_enclosure: true,
      certifies_directed_rounded_first_y_GD_linear_jet_coefficient_enclosure:
        true,
      certifies_directed_rounded_first_y_GD_quadratic_jet_coefficient_enclosure:
        true,
      certifies_directed_rounded_first_y_GD_cubic_jet_coefficient_enclosure:
        true,
      certifies_directed_rounded_first_y_GD_quartic_jet_coefficient_enclosure:
        passed,
      certifies_directed_rounded_first_y_GD_finite_remainder_bound: false,
      certifies_directed_rounded_first_y_GD_jet_remainder: false,
      certifies_directed_rounded_first_y_GD_jet_enclosure: false,
      certifies_directed_rounded_fold_pair_G_quotient_full_cell_cover: false,
      certifies_directed_rounded_fold_pair_D_quotient_cell_cover: false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_I1_regular_critical_exhaustion: false,
      retained_branch: false,
      claim_level:
        "Directed-rounded speed-cell interval certificate for the constant, linear, quadratic, cubic, and quartic first-y quotient coefficients Q_G0 through Q_G4 and Q_D0 through Q_D4 on the fold-pair h-root graph. It closes the quartic coefficient row only; the finite quintic quotient tail/enclosure and downstream collar closure remain open.",
    },
    result: {
      theory_status: summary.status,
      first_successor_row:
        "theta3minus.fold-pair-first-y-GD-quintic-tail-bound-directed-rounded-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The first-y blocker is narrowed from a finite O(y^4) tail problem to a finite quintic-tail problem after the certified quartic coefficient. The remaining sign condition is now a directed-rounded bound on the O(y^5) quotient tail.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdQuarticJetCoefficientIntervalCertificate(
  artifact
) {
  const errors = [];
  const summary = artifact?.quartic_jet_summary;
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_QUARTIC_JET_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA,
    "schema must match theta3minus fold-pair first-y G/D quartic jet coefficient interval certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus fold-pair first-y G/D quartic jet packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.quartic_jet_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "first-y quartic jet certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.quartic_jet_parameters?.speed_band === undefined &&
      artifact?.quartic_jet_parameters?.speed_window === undefined &&
      artifact?.quartic_jet_parameters?.speed_min === undefined &&
      artifact?.quartic_jet_parameters?.speed_max === undefined,
    "first-y quartic jet parameters must not contain speed-band fields",
    errors
  );
  assertField(
    summary?.status === CERTIFIED_STATUS &&
      summary?.speed_cell_count === QUARTIC_SPEED_CELL_COUNT &&
      summary?.branch_cell_count === 2 * QUARTIC_SPEED_CELL_COUNT &&
      summary?.all_rows_certified === true &&
      summary?.all_h0_intervals_inside_predecessor_tubes === true &&
      H_SLOPE_MINIMUMS.every(
        (minimum, index) =>
          Number(summary?.[`min_h${index}_solve_slope_clearance`]) > minimum
      ) &&
      summary?.all_source_equation_coefficients_contain_zero_y0_to_y8 ===
        true &&
      Number(summary?.max_abs_source_equation_coeff_y0_to_y8_interval) <
        0.02 &&
      Number(summary?.max_abs_h1_interval) < 6 &&
      Number(summary?.max_abs_h2_interval) < 4 &&
      Number(summary?.max_abs_h3_interval) < 23 &&
      Number(summary?.max_abs_h4_interval) < 17 &&
      Number(summary?.max_abs_Q_G_y1_coefficient_interval) < 0.000032 &&
      Number(summary?.max_abs_Q_D_y1_coefficient_interval) < 0.000063 &&
      Number(summary?.max_abs_Q_G_y2_coefficient_interval) < 1 &&
      Number(summary?.max_abs_Q_D_y2_coefficient_interval) < 3 &&
      Number(summary?.max_abs_Q_G_y3_coefficient_interval) < 0.0012 &&
      Number(summary?.max_abs_Q_D_y3_coefficient_interval) < 0.0045 &&
      Number(summary?.max_abs_Q_G_y4_coefficient_interval) < 6.9 &&
      Number(summary?.max_abs_Q_D_y4_coefficient_interval) < 35 &&
      Number(summary?.min_Q_G_remaining_first_order_tail_budget) > 47 &&
      Number(summary?.min_Q_D_remaining_first_order_tail_budget) > 47 &&
      Number(summary?.min_Q_G_remaining_cubic_tail_budget) > 1e7 &&
      Number(summary?.min_Q_D_remaining_cubic_tail_budget) > 1e7 &&
      Number(summary?.min_Q_G_remaining_quartic_tail_budget) > 1e9 &&
      Number(summary?.min_Q_D_remaining_quartic_tail_budget) > 1e9 &&
      Number(summary?.min_Q_G_remaining_quintic_tail_budget) > 1e12 &&
      Number(summary?.min_Q_D_remaining_quintic_tail_budget) > 1e12 &&
      summary?.all_QD_QG_coefficient_identity_intervals_contain_zero === true,
    "first-y quartic jet rows must certify h solves, source coefficient containment, quartic coefficients, and positive quintic-tail budget",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_directed_rounded_first_y_GD_constant_coefficient_enclosure ===
      true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_linear_jet_coefficient_enclosure ===
        true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_quadratic_jet_coefficient_enclosure ===
        true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_cubic_jet_coefficient_enclosure ===
        true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_quartic_jet_coefficient_enclosure ===
        true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_finite_remainder_bound ===
        false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_jet_remainder === false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_jet_enclosure === false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_fold_pair_scaled_remainder === false &&
      artifact?.artifact_claim?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact claim must keep first-y finite remainder, full quotient, scaled remainder, I1, and retention open",
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
    } else if (arg === "--speed-cell-count") {
      options.speedCellCount = argv[++index];
    } else if (arg === "--root-subdivisions") {
      options.rootSubdivisions = argv[++index];
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quartic-jet-coefficient-interval-certificate.mjs [options]",
    "",
    "Options:",
    "  --out <path>                  Write artifact JSON",
    "  --validate <path>             Validate an artifact JSON",
    "  --schema                      Print artifact schema metadata",
    "  --speed-cell-count <count>    Number of speed cells covering [3.02156,3.02157]",
    "  --root-subdivisions <count>   Root subdivisions passed to the normal-form predecessor",
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
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_QUARTIC_JET_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdQuarticJetCoefficientIntervalCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  try {
    const artifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdQuarticJetCoefficientIntervalCertificate(
        options
      );
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
