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

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_LINEAR_JET_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-linear-jet-coefficient-interval-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_linear_jet_coefficient_interval_certificate";
const PROMOTION_STATUS = "priority-only";
const NO_SPEED_WINDOW =
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";
const ORDER = 5;
const SOURCE_COEFFICIENT = -1;
const FIRST_Y_CELL_UPPER = 0.115 / 64;
const CERTIFIED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-linear-jet-coefficient-interval-certified";

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

function sinSeries(series) {
  const center = series[0];
  const nilpotent = [...series];
  nilpotent[0] = [0, 0];
  const n2 = power(nilpotent, 2);
  const n3 = multiply(n2, nilpotent);
  const n4 = multiply(n2, n2);
  const n5 = multiply(n4, nilpotent);
  const sinN = add(add(nilpotent, scale(n3, -1 / 6)), scale(n5, 1 / 120));
  const cosN = add(subtract(constant(1), scale(n2, 1 / 2)), scale(n4, 1 / 24));
  return add(
    scaleByInterval(cosN, root.sinInterval(center)),
    scaleByInterval(sinN, root.cosInterval(center))
  );
}

function cosSeries(series) {
  const center = series[0];
  const nilpotent = [...series];
  nilpotent[0] = [0, 0];
  const n2 = power(nilpotent, 2);
  const n3 = multiply(n2, nilpotent);
  const n4 = multiply(n2, n2);
  const n5 = multiply(n4, nilpotent);
  const sinN = add(add(nilpotent, scale(n3, -1 / 6)), scale(n5, 1 / 120));
  const cosN = add(subtract(constant(1), scale(n2, 1 / 2)), scale(n4, 1 / 24));
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

function branchSeriesCoordinates({ cell, branchSign, h0Interval, h1Interval }) {
  const delta = constant(cell.delta_fold_interval);
  delta[1] = root.scaleInterval(cell.beta_interval, branchSign);
  delta[2] = cell.gamma_interval;
  delta[3] = h0Interval;
  delta[4] = h1Interval;

  const phi = constant(cell.phi_fold_interval);
  phi[1] = root.scaleInterval(cell.beta_interval, -branchSign);
  phi[2] = root.scaleInterval(root.addIntervals(cell.gamma_interval, [2, 2]), -1);
  phi[3] = root.scaleInterval(h0Interval, -1);
  phi[4] = root.scaleInterval(h1Interval, -1);

  return { delta, phi };
}

function sourceEquationSeries({ cell, branchSign, h0Interval, h1Interval }) {
  const { delta, phi } = branchSeriesCoordinates({
    cell,
    branchSign,
    h0Interval,
    h1Interval,
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

function solveH0Interval({ cell, branchSign }) {
  const zeroSeries = sourceEquationSeries({
    cell,
    branchSign,
    h0Interval: [0, 0],
    h1Interval: [0, 0],
  });
  const oneSeries = sourceEquationSeries({
    cell,
    branchSign,
    h0Interval: [1, 1],
    h1Interval: [0, 0],
  });
  const slope = root.subtractIntervals(oneSeries[4], zeroSeries[4]);
  return {
    h0Interval: root.divideIntervals(root.scaleInterval(zeroSeries[4], -1), slope),
    h0SlopeInterval: slope,
    h0ResidualBeforeSolve: zeroSeries[4],
  };
}

function solveH1Interval({ cell, branchSign, h0Interval }) {
  const zeroSeries = sourceEquationSeries({
    cell,
    branchSign,
    h0Interval,
    h1Interval: [0, 0],
  });
  const oneSeries = sourceEquationSeries({
    cell,
    branchSign,
    h0Interval,
    h1Interval: [1, 1],
  });
  const slope = root.subtractIntervals(oneSeries[5], zeroSeries[5]);
  return {
    h1Interval: root.divideIntervals(root.scaleInterval(zeroSeries[5], -1), slope),
    h1SlopeInterval: slope,
    h1ResidualBeforeSolve: zeroSeries[5],
  };
}

function branchGSeries({ cell, branchSign, h0Interval, h1Interval }) {
  const { delta, phi } = branchSeriesCoordinates({
    cell,
    branchSign,
    h0Interval,
    h1Interval,
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
  const branchRows = ["-", "+"].map((branch) => {
    const branchSign = root.branchSign(branch);
    const h0Solve = solveH0Interval({ cell, branchSign });
    const h1Solve = solveH1Interval({
      cell,
      branchSign,
      h0Interval: h0Solve.h0Interval,
    });
    const sourceSeries = sourceEquationSeries({
      cell,
      branchSign,
      h0Interval: h0Solve.h0Interval,
      h1Interval: h1Solve.h1Interval,
    });
    const gSeries = branchGSeries({
      cell,
      branchSign,
      h0Interval: h0Solve.h0Interval,
      h1Interval: h1Solve.h1Interval,
    });
    const hTube = root.BRANCH_H_TUBES[branch];
    const h0Slope = root.intervalSignAndClearance(h0Solve.h0SlopeInterval);
    const h1Slope = root.intervalSignAndClearance(h1Solve.h1SlopeInterval);
    return {
      branch,
      h0_interval: root.formatInterval(h0Solve.h0Interval),
      h1_interval: root.formatInterval(h1Solve.h1Interval),
      h_tube: root.formatInterval(hTube),
      h0_interval_inside_predecessor_tube:
        h0Solve.h0Interval[0] >= hTube[0] &&
        h0Solve.h0Interval[1] <= hTube[1],
      h0_solve_slope_interval: root.formatInterval(h0Solve.h0SlopeInterval),
      h0_solve_slope_sign: h0Slope.sign,
      h0_solve_slope_clearance: root.formatSmallNumber(h0Slope.clearance),
      h0_residual_before_solve: root.formatInterval(
        h0Solve.h0ResidualBeforeSolve
      ),
      h1_solve_slope_interval: root.formatInterval(h1Solve.h1SlopeInterval),
      h1_solve_slope_sign: h1Slope.sign,
      h1_solve_slope_clearance: root.formatSmallNumber(h1Slope.clearance),
      h1_residual_before_solve: root.formatInterval(
        h1Solve.h1ResidualBeforeSolve
      ),
      source_equation_coefficients_y0_to_y5:
        sourceSeries.map(root.formatInterval),
      source_equation_coefficients_contain_zero_y0_to_y5:
        sourceSeries.every(containsZero),
      max_abs_source_equation_coeff_y0_to_y5: root.formatSmallNumber(
        Math.max(...sourceSeries.map(maxAbsInterval))
      ),
      G_branch_coefficients_y0_to_y3: gSeries
        .slice(0, 4)
        .map(root.formatInterval),
    };
  });
  const branchByName = Object.fromEntries(
    branchRows.map((branchRow) => [branchRow.branch, branchRow])
  );
  const gMinus = branchGSeries({
    cell,
    branchSign: -1,
    h0Interval: branchByName["-"].h0_interval.map(Number),
    h1Interval: branchByName["-"].h1_interval.map(Number),
  });
  const gPlus = branchGSeries({
    cell,
    branchSign: 1,
    h0Interval: branchByName["+"].h0_interval.map(Number),
    h1Interval: branchByName["+"].h1_interval.map(Number),
  });
  const pairG = add(gMinus, gPlus);
  const pairD = transformedDSeries(pairG);
  const limit = foldLimitInterval(cell);
  const p0MinusL = root.subtractIntervals(pairG[0], limit);
  const d0MinusL = root.subtractIntervals(pairD[0], limit);
  const qG0Interval = pairG[2];
  const qG1Interval = pairG[3];
  const qD0Interval = pairD[2];
  const qD1Interval = pairD[3];
  const qG0Sign = root.intervalSignAndClearance(qG0Interval);
  const qD0Sign = root.intervalSignAndClearance(qD0Interval);
  const qG1Abs = maxAbsInterval(qG1Interval);
  const qD1Abs = maxAbsInterval(qD1Interval);
  const qGLinearLoss = qG1Abs * FIRST_Y_CELL_UPPER;
  const qDLinearLoss = qD1Abs * FIRST_Y_CELL_UPPER;
  const qGRemainingFirstOrderBudget =
    (qG0Sign.clearance - qGLinearLoss) / FIRST_Y_CELL_UPPER;
  const qDRemainingFirstOrderBudget =
    (qD0Sign.clearance - qDLinearLoss) / FIRST_Y_CELL_UPPER;
  return {
    cell_id: `speed.${speedIndex}.first-y`,
    speed_interval: root.formatInterval(speedInterval),
    first_y_cell: [0, root.formatSmallNumber(FIRST_Y_CELL_UPPER)],
    delta_fold_interval: root.formatInterval(cell.delta_fold_interval),
    phi_fold_interval: root.formatInterval(cell.phi_fold_interval),
    beta_interval: root.formatInterval(cell.beta_interval),
    gamma_interval: root.formatInterval(cell.gamma_interval),
    L_interval: root.formatInterval(limit),
    branch_rows: branchRows,
    G_pair_coefficients_y0_to_y3: pairG.slice(0, 4).map(root.formatInterval),
    D_pair_coefficients_y0_to_y3: pairD.slice(0, 4).map(root.formatInterval),
    P0_minus_L_interval: root.formatInterval(p0MinusL),
    P1_interval: root.formatInterval(pairG[1]),
    D0_minus_L_interval: root.formatInterval(d0MinusL),
    D1_interval: root.formatInterval(pairD[1]),
    Q_G_y0_coefficient_interval: root.formatInterval(qG0Interval),
    Q_G_y1_coefficient_interval: root.formatInterval(qG1Interval),
    Q_G_y0_coefficient_sign: qG0Sign.sign,
    Q_G_y0_coefficient_clearance: root.formatSmallNumber(qG0Sign.clearance),
    Q_G_y1_max_abs_coefficient: root.formatSmallNumber(qG1Abs),
    Q_G_linear_loss_on_first_y_cell: root.formatSmallNumber(qGLinearLoss),
    Q_G_remaining_first_order_tail_budget: root.formatSmallNumber(
      qGRemainingFirstOrderBudget
    ),
    Q_D_y0_coefficient_interval: root.formatInterval(qD0Interval),
    Q_D_y1_coefficient_interval: root.formatInterval(qD1Interval),
    Q_D_y0_coefficient_sign: qD0Sign.sign,
    Q_D_y0_coefficient_clearance: root.formatSmallNumber(qD0Sign.clearance),
    Q_D_y1_max_abs_coefficient: root.formatSmallNumber(qD1Abs),
    Q_D_linear_loss_on_first_y_cell: root.formatSmallNumber(qDLinearLoss),
    Q_D_remaining_first_order_tail_budget: root.formatSmallNumber(
      qDRemainingFirstOrderBudget
    ),
    Q_D_plus_Q_G_y0_coefficient_interval: root.formatInterval([0, 0]),
    Q_D_plus_2Q_G_y1_coefficient_interval: root.formatInterval(
      root.addIntervals(qD1Interval, root.scaleInterval(qG1Interval, 2))
    ),
    row_status:
      branchRows.every((row) => row.h0_interval_inside_predecessor_tube) &&
      branchRows.every(
        (row) => row.source_equation_coefficients_contain_zero_y0_to_y5
      ) &&
      branchRows.every(
        (row) =>
          Number(row.h0_solve_slope_clearance) > 0.79 &&
          Number(row.h1_solve_slope_clearance) > 0.79
      ) &&
      containsZero(p0MinusL) &&
      containsZero(pairG[1]) &&
      containsZero(d0MinusL) &&
      containsZero(pairD[1]) &&
      qG0Sign.sign === "+" &&
      qD0Sign.sign === "-" &&
      finiteInterval(qG1Interval) &&
      finiteInterval(qD1Interval) &&
      qGRemainingFirstOrderBudget > 47 &&
      qDRemainingFirstOrderBudget > 47
        ? "directed-rounded-first-y-GD-linear-jet-coefficient-enclosed"
        : "first-y-GD-linear-jet-coefficient-enclosure-open",
  };
}

function summarizeRows(rows) {
  const branchRows = rows.flatMap((row) => row.branch_rows);
  const allRowsCertified = rows.every(
    (row) =>
      row.row_status ===
      "directed-rounded-first-y-GD-linear-jet-coefficient-enclosed"
  );
  const maxQg1Abs = Math.max(
    ...rows.map((row) => Number(row.Q_G_y1_max_abs_coefficient))
  );
  const maxQd1Abs = Math.max(
    ...rows.map((row) => Number(row.Q_D_y1_max_abs_coefficient))
  );
  const minQgTailBudget = Math.min(
    ...rows.map((row) => Number(row.Q_G_remaining_first_order_tail_budget))
  );
  const minQdTailBudget = Math.min(
    ...rows.map((row) => Number(row.Q_D_remaining_first_order_tail_budget))
  );
  return {
    speed_cell_count: rows.length,
    branch_cell_count: branchRows.length,
    all_rows_certified: allRowsCertified,
    all_h0_intervals_inside_predecessor_tubes: branchRows.every(
      (row) => row.h0_interval_inside_predecessor_tube
    ),
    min_h0_solve_slope_clearance: root.formatSmallNumber(
      Math.min(...branchRows.map((row) => Number(row.h0_solve_slope_clearance)))
    ),
    min_h1_solve_slope_clearance: root.formatSmallNumber(
      Math.min(...branchRows.map((row) => Number(row.h1_solve_slope_clearance)))
    ),
    all_source_equation_coefficients_contain_zero_y0_to_y5: branchRows.every(
      (row) => row.source_equation_coefficients_contain_zero_y0_to_y5
    ),
    max_abs_source_equation_coeff_y0_to_y5_interval: root.formatSmallNumber(
      Math.max(
        ...branchRows.map((row) =>
          Number(row.max_abs_source_equation_coeff_y0_to_y5)
        )
      )
    ),
    h1_interval_hull: coefficientHull(
      branchRows.map((row) => row.h1_interval.map(Number))
    ),
    max_abs_h1_interval: root.formatSmallNumber(
      Math.max(...branchRows.map((row) => maxAbsInterval(row.h1_interval.map(Number))))
    ),
    Q_G_y0_coefficient_interval_hull: coefficientHull(
      rows.map((row) => row.Q_G_y0_coefficient_interval.map(Number))
    ),
    Q_G_y1_coefficient_interval_hull: coefficientHull(
      rows.map((row) => row.Q_G_y1_coefficient_interval.map(Number))
    ),
    Q_D_y0_coefficient_interval_hull: coefficientHull(
      rows.map((row) => row.Q_D_y0_coefficient_interval.map(Number))
    ),
    Q_D_y1_coefficient_interval_hull: coefficientHull(
      rows.map((row) => row.Q_D_y1_coefficient_interval.map(Number))
    ),
    max_abs_Q_G_y1_coefficient_interval: root.formatSmallNumber(maxQg1Abs),
    max_abs_Q_D_y1_coefficient_interval: root.formatSmallNumber(maxQd1Abs),
    max_Q_G_linear_loss_on_first_y_cell: root.formatSmallNumber(
      maxQg1Abs * FIRST_Y_CELL_UPPER
    ),
    max_Q_D_linear_loss_on_first_y_cell: root.formatSmallNumber(
      maxQd1Abs * FIRST_Y_CELL_UPPER
    ),
    min_Q_G_remaining_first_order_tail_budget:
      root.formatSmallNumber(minQgTailBudget),
    min_Q_D_remaining_first_order_tail_budget:
      root.formatSmallNumber(minQdTailBudget),
    max_abs_Q_D_plus_Q_G_y0_coefficient_interval: 0,
    max_abs_Q_D_plus_2Q_G_y1_coefficient_interval: root.formatSmallNumber(
      Math.max(
        ...rows.map((row) =>
          maxAbsInterval(row.Q_D_plus_2Q_G_y1_coefficient_interval.map(Number))
        )
      )
    ),
    status: allRowsCertified
      ? CERTIFIED_STATUS
      : "theta3minus-fold-pair-first-y-GD-linear-jet-coefficient-interval-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdLinearJetCoefficientIntervalCertificate(
  options = {}
) {
  const speedBreaks = root.makeSpeedBreaks(
    options.speedCellCount ?? root.DEFAULT_SPEED_CELL_COUNT
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
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_LINEAR_JET_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate.md",
    ],
    priority_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-linear-jet-coefficient-interval-certificate.md",
    linear_jet_parameters: {
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
        "delta_epsilon=delta_f+epsilon*beta*y+gamma*y^2+h0_epsilon*y^3+h1_epsilon*y^4+O(y^5)",
      intervalized_quantity:
        "constant and linear coefficients of Q_G=(P-L)/y^2 and Q_D=(D_pair-L)/y^2 at y=0",
      finite_remainder_policy:
        "linear coefficient interval only; the O(y^2) tail remains open and must be bounded before full first-y enclosure",
      root_subdivisions_for_fold_rows: rootSubdivisions,
    },
    linear_jet_rows: rows,
    linear_jet_summary: summary,
    closure_burndown: [
      {
        row: "theta3minus.fold-pair-first-y-GD-constant-coefficient",
        status: "directed-rounded-interval-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-linear-jet-coefficient",
        status: passed ? "directed-rounded-interval-certified" : "open",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-finite-remainder-bound",
        status: "directed-rounded-open",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure",
        status: "blocked-by-finite-remainder-bound",
      },
      {
        row: "theta3minus.fold-pair-scaled-remainder-continuous-collar",
        status: "blocked-by-directed-rounded-first-y-GD-enclosure",
      },
    ],
    artifact_claim: {
      receiver_normal_eom_evidence_status: "invalidated-by-receiver-normal-master-eom",
      receiver_normal_restart_required: true,
      assumes_fixed_speed_window: false,
      certifies_directed_rounded_first_y_GD_constant_coefficient_enclosure: true,
      certifies_directed_rounded_first_y_GD_linear_jet_coefficient_enclosure:
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
        "Directed-rounded speed-cell interval certificate for the constant and linear first-y quotient coefficients Q_G(0,nu), Q_G_y(0,nu), Q_D(0,nu), and Q_D_y(0,nu) on the fold-pair h-root graph. It closes the linear coefficient row only; the finite first-y remainder/enclosure and downstream collar closure remain open.",
    },
    result: {
      theory_status: summary.status,
      first_successor_row:
        "theta3minus.fold-pair-first-y-GD-finite-remainder-bound-directed-rounded-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The first-y blocker is narrowed from coefficient plus arbitrary first-order remainder to a finite-remainder problem after the certified linear coefficient: the linear loss is under 1.3e-5, leaving more than 47 units of first-order tail budget.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdLinearJetCoefficientIntervalCertificate(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_LINEAR_JET_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA,
    "schema must match theta3minus fold-pair first-y G/D linear jet coefficient interval certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus fold-pair first-y G/D linear jet packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.linear_jet_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "first-y linear jet certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.linear_jet_parameters?.speed_band === undefined &&
      artifact?.linear_jet_parameters?.speed_window === undefined &&
      artifact?.linear_jet_parameters?.speed_min === undefined &&
      artifact?.linear_jet_parameters?.speed_max === undefined,
    "first-y linear jet parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.linear_jet_summary?.status === CERTIFIED_STATUS &&
      artifact?.linear_jet_summary?.speed_cell_count === 16 &&
      artifact?.linear_jet_summary?.branch_cell_count === 32 &&
      artifact?.linear_jet_summary?.all_rows_certified === true &&
      artifact?.linear_jet_summary?.all_h0_intervals_inside_predecessor_tubes ===
        true &&
      Number(artifact?.linear_jet_summary?.min_h0_solve_slope_clearance) >
        0.79 &&
      Number(artifact?.linear_jet_summary?.min_h1_solve_slope_clearance) >
        0.79 &&
      artifact?.linear_jet_summary
        ?.all_source_equation_coefficients_contain_zero_y0_to_y5 === true &&
      Number(artifact?.linear_jet_summary?.max_abs_h1_interval) < 6 &&
      Number(
        artifact?.linear_jet_summary?.max_abs_Q_G_y1_coefficient_interval
      ) < 0.0034 &&
      Number(
        artifact?.linear_jet_summary?.max_abs_Q_D_y1_coefficient_interval
      ) < 0.0068 &&
      Number(
        artifact?.linear_jet_summary?.min_Q_G_remaining_first_order_tail_budget
      ) > 47 &&
      Number(
        artifact?.linear_jet_summary?.min_Q_D_remaining_first_order_tail_budget
      ) > 47,
    "first-y linear jet rows must certify h solves, source coefficient containment, linear coefficients, and positive remainder budget",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_directed_rounded_first_y_GD_linear_jet_coefficient_enclosure ===
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
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-linear-jet-coefficient-interval-certificate.mjs [options]",
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
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_LINEAR_JET_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdLinearJetCoefficientIntervalCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  try {
    const artifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdLinearJetCoefficientIntervalCertificate(
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
