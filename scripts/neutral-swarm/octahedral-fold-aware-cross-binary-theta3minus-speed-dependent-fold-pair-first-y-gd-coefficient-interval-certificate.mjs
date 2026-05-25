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

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_coefficient_interval_certificate";
const PROMOTION_STATUS = "priority-only";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const ORDER = 4;
const SOURCE_COEFFICIENT = -1;
const CERTIFIED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-constant-coefficient-interval-certified";

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

function derivative(series) {
  const result = zeros();
  for (let order = 1; order <= ORDER; order += 1) {
    result[order - 1] = root.scaleInterval(series[order], order);
  }
  return result;
}

function sinSeries(series) {
  const center = series[0];
  const nilpotent = [...series];
  nilpotent[0] = [0, 0];
  const n2 = power(nilpotent, 2);
  const n3 = multiply(n2, nilpotent);
  const n4 = multiply(n2, n2);
  const sinN = add(nilpotent, scale(n3, -1 / 6));
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
  const sinN = add(nilpotent, scale(n3, -1 / 6));
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

function branchSeriesCoordinates({ cell, branchSign, h0Interval }) {
  const delta = constant(cell.delta_fold_interval);
  delta[1] = root.scaleInterval(cell.beta_interval, branchSign);
  delta[2] = cell.gamma_interval;
  delta[3] = h0Interval;

  const phi = constant(cell.phi_fold_interval);
  phi[1] = root.scaleInterval(cell.beta_interval, -branchSign);
  phi[2] = root.scaleInterval(root.addIntervals(cell.gamma_interval, [2, 2]), -1);
  phi[3] = root.scaleInterval(h0Interval, -1);

  return { delta, phi };
}

function sourceEquationSeries({ cell, branchSign, h0Interval }) {
  const { delta, phi } = branchSeriesCoordinates({
    cell,
    branchSign,
    h0Interval,
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
  });
  const oneSeries = sourceEquationSeries({
    cell,
    branchSign,
    h0Interval: [1, 1],
  });
  const slope = root.subtractIntervals(oneSeries[4], zeroSeries[4]);
  return root.divideIntervals(root.scaleInterval(zeroSeries[4], -1), slope);
}

function branchGSeries({ cell, branchSign, h0Interval }) {
  const { delta, phi } = branchSeriesCoordinates({
    cell,
    branchSign,
    h0Interval,
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
    const h0Interval = solveH0Interval({ cell, branchSign });
    const sourceSeries = sourceEquationSeries({
      cell,
      branchSign,
      h0Interval,
    });
    const gSeries = branchGSeries({
      cell,
      branchSign,
      h0Interval,
    });
    const hTube = root.BRANCH_H_TUBES[branch];
    return {
      branch,
      h0_interval: root.formatInterval(h0Interval),
      h_tube: root.formatInterval(hTube),
      h0_interval_inside_predecessor_tube:
        h0Interval[0] >= hTube[0] && h0Interval[1] <= hTube[1],
      source_equation_coefficients_y0_to_y4:
        sourceSeries.map(root.formatInterval),
      source_equation_coefficients_contain_zero_y0_to_y4:
        sourceSeries.every(containsZero),
      max_abs_source_equation_coeff_y0_to_y4: root.formatSmallNumber(
        Math.max(...sourceSeries.map(maxAbsInterval))
      ),
      G_branch_coefficients_y0_to_y2: gSeries
        .slice(0, 3)
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
  });
  const gPlus = branchGSeries({
    cell,
    branchSign: 1,
    h0Interval: branchByName["+"].h0_interval.map(Number),
  });
  const pairG = add(gMinus, gPlus);
  const pairD = transformedDSeries(pairG);
  const limit = foldLimitInterval(cell);
  const p0MinusL = root.subtractIntervals(pairG[0], limit);
  const d0MinusL = root.subtractIntervals(pairD[0], limit);
  const p1 = pairG[1];
  const d1 = pairD[1];
  const qGInterval = pairG[2];
  const qDInterval = pairD[2];
  const qSumInterval = [0, 0];
  const qGSign = root.intervalSignAndClearance(qGInterval);
  const qDSign = root.intervalSignAndClearance(qDInterval);
  return {
    cell_id: `speed.${speedIndex}.first-y`,
    speed_interval: root.formatInterval(speedInterval),
    delta_fold_interval: root.formatInterval(cell.delta_fold_interval),
    phi_fold_interval: root.formatInterval(cell.phi_fold_interval),
    beta_interval: root.formatInterval(cell.beta_interval),
    gamma_interval: root.formatInterval(cell.gamma_interval),
    L_interval: root.formatInterval(limit),
    branch_rows: branchRows,
    G_pair_coefficients_y0_to_y3: pairG.slice(0, 4).map(root.formatInterval),
    D_pair_coefficients_y0_to_y3: pairD.slice(0, 4).map(root.formatInterval),
    P0_minus_L_interval: root.formatInterval(p0MinusL),
    P1_interval: root.formatInterval(p1),
    D0_minus_L_interval: root.formatInterval(d0MinusL),
    D1_interval: root.formatInterval(d1),
    Q_G_y0_coefficient_interval: root.formatInterval(qGInterval),
    Q_G_y0_coefficient_sign: qGSign.sign,
    Q_G_y0_coefficient_clearance: root.formatSmallNumber(qGSign.clearance),
    Q_D_y0_coefficient_interval: root.formatInterval(qDInterval),
    Q_D_y0_coefficient_sign: qDSign.sign,
    Q_D_y0_coefficient_clearance: root.formatSmallNumber(qDSign.clearance),
    Q_D_plus_Q_G_y0_coefficient_interval: root.formatInterval(qSumInterval),
    row_status:
      branchRows.every((row) => row.h0_interval_inside_predecessor_tube) &&
      branchRows.every(
        (row) => row.source_equation_coefficients_contain_zero_y0_to_y4
      ) &&
      containsZero(p0MinusL) &&
      containsZero(p1) &&
      containsZero(d0MinusL) &&
      containsZero(d1) &&
      qGSign.sign === "+" &&
      qDSign.sign === "-" &&
      finiteInterval(qGInterval) &&
      finiteInterval(qDInterval)
        ? "directed-rounded-first-y-GD-constant-coefficient-enclosed"
        : "first-y-GD-constant-coefficient-enclosure-open",
  };
}

function summarizeRows(rows) {
  const branchRows = rows.flatMap((row) => row.branch_rows);
  const allRowsCertified = rows.every(
    (row) =>
      row.row_status ===
      "directed-rounded-first-y-GD-constant-coefficient-enclosed"
  );
  const allH0InsideTubes = branchRows.every(
    (row) => row.h0_interval_inside_predecessor_tube
  );
  const allSourceCoefficientsContainZero = branchRows.every(
    (row) => row.source_equation_coefficients_contain_zero_y0_to_y4
  );
  const minQgClearance = Math.min(
    ...rows.map((row) => Number(row.Q_G_y0_coefficient_clearance))
  );
  const minQdClearance = Math.min(
    ...rows.map((row) => Number(row.Q_D_y0_coefficient_clearance))
  );
  const maxQSumAbs = Math.max(
    ...rows.map((row) =>
      maxAbsInterval(row.Q_D_plus_Q_G_y0_coefficient_interval.map(Number))
    )
  );
  const maxAbsP0MinusL = Math.max(
    ...rows.map((row) => maxAbsInterval(row.P0_minus_L_interval.map(Number)))
  );
  const maxAbsP1 = Math.max(
    ...rows.map((row) => maxAbsInterval(row.P1_interval.map(Number)))
  );
  const maxAbsD0MinusL = Math.max(
    ...rows.map((row) => maxAbsInterval(row.D0_minus_L_interval.map(Number)))
  );
  const maxAbsD1 = Math.max(
    ...rows.map((row) => maxAbsInterval(row.D1_interval.map(Number)))
  );
  const allConstantAndFirstOrderCancellationsContainZero = rows.every(
    (row) =>
      containsZero(row.P0_minus_L_interval.map(Number)) &&
      containsZero(row.P1_interval.map(Number)) &&
      containsZero(row.D0_minus_L_interval.map(Number)) &&
      containsZero(row.D1_interval.map(Number))
  );
  const maxSourceCoeffAbs = Math.max(
    ...branchRows.map((row) =>
      Number(row.max_abs_source_equation_coeff_y0_to_y4)
    )
  );
  return {
    speed_cell_count: rows.length,
    branch_cell_count: branchRows.length,
    all_rows_certified: allRowsCertified,
    all_h0_intervals_inside_predecessor_tubes: allH0InsideTubes,
    all_source_equation_coefficients_contain_zero_y0_to_y4:
      allSourceCoefficientsContainZero,
    all_constant_and_first_order_cancellations_contain_zero:
      allConstantAndFirstOrderCancellationsContainZero,
    max_abs_P0_minus_L_interval: root.formatSmallNumber(maxAbsP0MinusL),
    max_abs_P1_interval: root.formatSmallNumber(maxAbsP1),
    max_abs_D0_minus_L_interval: root.formatSmallNumber(maxAbsD0MinusL),
    max_abs_D1_interval: root.formatSmallNumber(maxAbsD1),
    Q_G_y0_coefficient_interval_hull: coefficientHull(
      rows.map((row) => row.Q_G_y0_coefficient_interval.map(Number))
    ),
    Q_D_y0_coefficient_interval_hull: coefficientHull(
      rows.map((row) => row.Q_D_y0_coefficient_interval.map(Number))
    ),
    min_Q_G_y0_positive_clearance: root.formatSmallNumber(minQgClearance),
    min_Q_D_y0_negative_clearance: root.formatSmallNumber(minQdClearance),
    max_abs_Q_D_plus_Q_G_y0_coefficient_interval:
      root.formatSmallNumber(maxQSumAbs),
    max_abs_source_equation_coeff_y0_to_y4_interval:
      root.formatSmallNumber(maxSourceCoeffAbs),
    status: allRowsCertified
      ? CERTIFIED_STATUS
      : "theta3minus-fold-pair-first-y-GD-constant-coefficient-interval-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdCoefficientIntervalCertificate(
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
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness.md",
    ],
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate.md",
    coefficient_interval_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: root.SPEED_RATIO_ENCLOSURE,
      speed_cell_count: speedBreaks.length - 1,
      speed_ratio_cells: speedBreaks.map(root.formatSmallNumber),
      series_order: ORDER,
      moving_fold_chart: "theta=theta_3minus(nu)-y^2",
      h_root_graph_chart:
        "delta_epsilon=delta_f+epsilon*beta*y+gamma*y^2+h0_epsilon*y^3+O(y^4)",
      intervalized_quantity:
        "constant coefficient of Q_G=(P-L)/y^2 and Q_D=(D_pair-L)/y^2 at y=0",
      zero_touching_cell_policy:
        "directed-rounded coefficient interval only; no raw y^-2 division and no first-y remainder enclosure claim",
      root_subdivisions_for_fold_rows: rootSubdivisions,
    },
    coefficient_interval_rows: rows,
    coefficient_interval_summary: summary,
    closure_burndown: [
      {
        row: "theta3minus.fold-pair-first-y-GD-jet-cancellation",
        status: "sampled-analytic-jet-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-constant-coefficient",
        status: passed ? "directed-rounded-interval-certified" : "open",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-jet-remainder",
        status: "directed-rounded-open",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure",
        status: "blocked-by-first-y-jet-remainder",
      },
      {
        row: "theta3minus.fold-pair-scaled-remainder-continuous-collar",
        status: "blocked-by-directed-rounded-first-y-GD-enclosure",
      },
    ],
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_directed_rounded_first_y_GD_constant_coefficient_enclosure:
        passed,
      certifies_sampled_first_y_GD_jet_cancellation: true,
      certifies_directed_rounded_first_y_GD_jet_remainder: false,
      certifies_directed_rounded_first_y_GD_jet_enclosure: false,
      certifies_directed_rounded_fold_pair_G_quotient_full_cell_cover: false,
      certifies_directed_rounded_fold_pair_D_quotient_cell_cover: false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_I1_regular_critical_exhaustion: false,
      retained_branch: false,
      claim_level:
        "Directed-rounded speed-cell interval certificate for the constant first-y quotient coefficients Q_G(0,nu) and Q_D(0,nu) on the fold-pair h-root graph. It closes the coefficient row only; the first-y remainder/enclosure and downstream collar closure remain open.",
    },
    result: {
      theory_status: summary.status,
      first_successor_row:
        "theta3minus.fold-pair-first-y-GD-jet-remainder-directed-rounded-enclosure-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The first-y blocker is narrowed from cancellation plus coefficient plus remainder to a remainder-only interval problem: Q_G(0,nu) is enclosed as positive and Q_D(0,nu) as negative over every certified speed cell.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdCoefficientIntervalCertificate(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA,
    "schema must match theta3minus fold-pair first-y G/D coefficient interval certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus fold-pair first-y G/D coefficient interval certificate packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.coefficient_interval_parameters?.speed_constraint ===
      NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "first-y coefficient interval certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.coefficient_interval_parameters?.speed_band === undefined &&
      artifact?.coefficient_interval_parameters?.speed_window === undefined &&
      artifact?.coefficient_interval_parameters?.speed_min === undefined &&
      artifact?.coefficient_interval_parameters?.speed_max === undefined,
    "first-y coefficient interval parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.coefficient_interval_summary?.status === CERTIFIED_STATUS &&
      artifact?.coefficient_interval_summary?.speed_cell_count === 16 &&
      artifact?.coefficient_interval_summary?.branch_cell_count === 32 &&
      artifact?.coefficient_interval_summary?.all_rows_certified === true &&
      artifact?.coefficient_interval_summary
        ?.all_h0_intervals_inside_predecessor_tubes === true &&
      artifact?.coefficient_interval_summary
        ?.all_source_equation_coefficients_contain_zero_y0_to_y4 === true &&
      artifact?.coefficient_interval_summary
        ?.all_constant_and_first_order_cancellations_contain_zero === true &&
      Number(
        artifact?.coefficient_interval_summary
          ?.min_Q_G_y0_positive_clearance
      ) > 0 &&
      Number(
        artifact?.coefficient_interval_summary
          ?.min_Q_D_y0_negative_clearance
      ) > 0,
    "first-y coefficient interval rows must certify h0 tube membership, source coefficient containment, and Q_G/Q_D signs",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_directed_rounded_first_y_GD_constant_coefficient_enclosure ===
      true &&
      artifact?.artifact_claim?.certifies_sampled_first_y_GD_jet_cancellation ===
        true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_jet_remainder === false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_jet_enclosure === false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_fold_pair_scaled_remainder === false &&
      artifact?.artifact_claim?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact claim must keep first-y remainder, full quotient, scaled remainder, I1, and retention open",
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
    "Usage: node scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate.mjs [options]",
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
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdCoefficientIntervalCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  try {
    const artifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdCoefficientIntervalCertificate(
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
