#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift31NextSuccessorRootTailTubeCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift31NextSuccessorRootTailTubeCertificate,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-shift31-next-successor-root-tail-tube-certificate.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySixthOrderPostUSuccessorCoefficientCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySixthOrderPostUSuccessorCoefficientCertificate,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-sixth-order-post-u-successor-coefficient-certificate.mjs";
import {
  theta3minusFoldPairScaledRootTubeCellInternals as root,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_C1_TWENTY_SEVENTH_ORDER_TAIL_BOUND_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-c1-twenty-seventh-order-tail-bound-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_c1_twenty_seventh_order_tail_bound_certificate";
const PROMOTION_STATUS = "priority-only";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const FIRST_Y_CELL_UPPER = 0.115 / 64;
const SPEED_CELL_COUNT = 128;
const DEFAULT_Y_SUBCELL_COUNT = 16;
const DEFAULT_W_TUBE_PADDING = 1e18;
const DEFAULT_Z_PREDECESSOR_TUBE_PADDING = 1e16;
const TAIL_ORDER = 27;
const NUMERATOR_SHIFT_POWER = 29;
const ROOT_SHIFT_POWER = 31;
const Q_G_TAIL_BUDGET = 1.15377790014e73;
const Q_D_TAIL_BUDGET = 1.15370158828e73;
const IDENTITY_TG_ONLY_CEILING = Q_D_TAIL_BUDGET / 28;
const OBSTRUCTION_STATUS =
  "rigorous-obstruction-theta3minus-fold-pair-first-y-GD-C1-twenty-seventh-order-tail-bound-open";
const CERTIFIED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-C1-twenty-seventh-order-tail-bound-certified";
const ROW_OBSTRUCTION_STATUS =
  "C1-twenty-seventh-order-tail-bound-obstructed-by-positive-y-interval-enclosure";
const ROW_CERTIFIED_STATUS = "C1-twenty-seventh-order-tail-bound-certified";

function numericInterval(interval) {
  return interval.map(Number);
}

function validateYSubcellCount(value) {
  const count = Number.parseInt(value, 10);
  if (!Number.isInteger(count) || count < 4 || count > 256) {
    throw new Error("ySubcellCount must be an integer in [4,256]");
  }
  return count;
}

function validatePositivePadding(value, name) {
  const padding = Number(value);
  if (!Number.isFinite(padding) || padding <= 0) {
    throw new Error(`${name} must be a positive finite number`);
  }
  return padding;
}

function maxAbsInterval([left, right]) {
  return Math.max(Math.abs(left), Math.abs(right));
}

function minField(rows, fieldName) {
  return Math.min(...rows.map((row) => Number(row[fieldName])));
}

function maxField(rows, fieldName) {
  return Math.max(...rows.map((row) => Number(row[fieldName])));
}

function coefficientHull(intervals) {
  return root.formatInterval([
    Math.min(...intervals.map(([left]) => left)),
    Math.max(...intervals.map(([, right]) => right)),
  ]);
}

function hFieldName(index) {
  return `h${index}_interval`;
}

function qFieldName(prefix, index) {
  return `${prefix}_y${index}_coefficient_interval`;
}

function cellFromSeedRow(row) {
  const deltaInterval = numericInterval(row.delta_fold_interval);
  const phiInterval = numericInterval(row.phi_fold_interval);
  return {
    speed_interval: numericInterval(row.speed_interval),
    delta_fold_interval: deltaInterval,
    phi_fold_interval: phiInterval,
    beta_interval: numericInterval(row.beta_interval),
    gamma_interval: numericInterval(row.gamma_interval),
    L_interval: numericInterval(row.L_interval),
    sin_phi_interval: root.sinInterval(phiInterval),
    cos_phi_interval: root.cosInterval(phiInterval),
    sin_delta_interval: root.sinInterval(deltaInterval),
    cos_delta_interval: root.cosInterval(deltaInterval),
  };
}

function hPolynomialThroughTwentySix(branchRow, yInterval) {
  let sum = [0, 0];
  let power = [1, 1];
  for (let index = 0; index <= 26; index += 1) {
    sum = root.addIntervals(
      sum,
      root.multiplyIntervals(numericInterval(branchRow[hFieldName(index)]), power)
    );
    power = root.multiplyIntervals(power, yInterval);
  }
  return sum;
}

function hWithWInterval({ branchRow, yInterval, wInterval }) {
  return root.addIntervals(
    hPolynomialThroughTwentySix(branchRow, yInterval),
    root.multiplyIntervals(root.positivePowerInterval(yInterval, 27), wInterval)
  );
}

function y3hYDerivativeThroughW({ branchRow, yInterval, wInterval }) {
  let sum = [0, 0];
  for (let index = 0; index <= 26; index += 1) {
    sum = root.addIntervals(
      sum,
      root.multiplyIntervals(
        root.scaleInterval(numericInterval(branchRow[hFieldName(index)]), index + 3),
        root.positivePowerInterval(yInterval, index + 2)
      )
    );
  }
  return root.addIntervals(
    sum,
    root.multiplyIntervals(
      root.scaleInterval(wInterval, 30),
      root.positivePowerInterval(yInterval, 29)
    )
  );
}

function qPolynomial(row, prefix, yInterval) {
  let sum = [0, 0];
  let power = [1, 1];
  for (let index = 0; index <= 26; index += 1) {
    sum = root.addIntervals(
      sum,
      root.multiplyIntervals(numericInterval(row[qFieldName(prefix, index)]), power)
    );
    power = root.multiplyIntervals(power, yInterval);
  }
  return sum;
}

function yScaledY2QDerivative(row, prefix, yInterval) {
  let sum = [0, 0];
  for (let index = 0; index <= 26; index += 1) {
    sum = root.addIntervals(
      sum,
      root.multiplyIntervals(
        root.scaleInterval(numericInterval(row[qFieldName(prefix, index)]), index + 2),
        root.positivePowerInterval(yInterval, index + 2)
      )
    );
  }
  return sum;
}

function branchState({ cell, branchRow, yInterval, wInterval }) {
  const sign = root.branchSign(branchRow.branch);
  const hInterval = hWithWInterval({ branchRow, yInterval, wInterval });
  const y2 = root.positivePowerInterval(yInterval, 2);
  const y3 = root.positivePowerInterval(yInterval, 3);
  const y30 = root.positivePowerInterval(yInterval, 30);
  const speedInverseSquared = root.inverseSpeedSquaredInterval(
    cell.speed_interval
  );
  const signedBeta = root.scaleInterval(cell.beta_interval, sign);
  const y3h = root.multiplyIntervals(y3, hInterval);
  const delta = root.addIntervals(
    cell.delta_fold_interval,
    root.multiplyIntervals(yInterval, signedBeta),
    root.multiplyIntervals(y2, cell.gamma_interval),
    y3h
  );
  const phi = root.addIntervals(
    cell.phi_fold_interval,
    root.scaleInterval(root.multiplyIntervals(yInterval, signedBeta), -1),
    root.scaleInterval(
      root.multiplyIntervals(
        y2,
        root.addIntervals(cell.gamma_interval, [2, 2])
      ),
      -1
    ),
    root.scaleInterval(y3h, -1)
  );
  const y3hY = y3hYDerivativeThroughW({ branchRow, yInterval, wInterval });
  const deltaY = root.addIntervals(
    signedBeta,
    root.multiplyIntervals(root.scaleInterval(cell.gamma_interval, 2), yInterval),
    y3hY
  );
  const phiY = root.addIntervals(
    root.scaleInterval(signedBeta, -1),
    root.scaleInterval(
      root.multiplyIntervals(
        root.scaleInterval(root.addIntervals(cell.gamma_interval, [2, 2]), 2),
        yInterval
      ),
      -1
    ),
    root.scaleInterval(y3hY, -1)
  );
  const deltaW = y30;
  const phiW = root.scaleInterval(y30, -1);
  const sinDelta = root.sinInterval(delta);
  const cosDelta = root.cosInterval(delta);
  const sinPhi = root.sinInterval(phi);
  const cosPhi = root.cosInterval(phi);
  const scaledZ = root.addIntervals(
    cell.gamma_interval,
    root.multiplyIntervals(yInterval, hInterval)
  );
  const jInterval = root.scaledJInterval({
    cell,
    yInterval,
    zInterval: scaledZ,
    sign,
  });
  const jAbs = root.scaleInterval(jInterval, -sign);
  const gDenominator = root.multiplyIntervals(
    cell.speed_interval,
    root.positivePowerInterval(delta, 2),
    jAbs
  );
  const numerator = root.scaleInterval(root.addIntervals(cosPhi, cosDelta), 2);
  const gInterval = root.divideIntervals(numerator, gDenominator);
  const fInterval = root.addIntervals(
    root.multiplyIntervals(root.positivePowerInterval(delta, 2), speedInverseSquared),
    [-2, -2],
    sinPhi,
    sinDelta
  );
  const fY = root.addIntervals(
    root.multiplyIntervals(root.scaleInterval(delta, 2), deltaY, speedInverseSquared),
    root.multiplyIntervals(cosPhi, phiY),
    root.multiplyIntervals(cosDelta, deltaY)
  );
  const yRY = root.divideIntervals(
    root.subtractIntervals(root.multiplyIntervals(yInterval, fY), root.scaleInterval(fInterval, ROOT_SHIFT_POWER)),
    root.positivePowerInterval(yInterval, ROOT_SHIFT_POWER)
  );
  const xi = root.divideIntervals(root.scaleInterval(yRY, -1), jInterval);
  const fDeltaY = root.addIntervals(
    root.multiplyIntervals(
      root.subtractIntervals(root.scaleInterval(speedInverseSquared, 2), sinDelta),
      deltaY
    ),
    root.multiplyIntervals(sinPhi, phiY)
  );
  const fDeltaW = root.addIntervals(
    root.multiplyIntervals(
      root.subtractIntervals(root.scaleInterval(speedInverseSquared, 2), sinDelta),
      deltaW
    ),
    root.multiplyIntervals(sinPhi, phiW)
  );
  const yJAbsY = root.scaleInterval(root.subtractIntervals(fDeltaY, jInterval), -sign);
  const jAbsW = root.scaleInterval(
    root.divideIntervals(fDeltaW, yInterval),
    -sign
  );
  const yNumeratorY = root.scaleInterval(
    root.multiplyIntervals(
      yInterval,
      root.addIntervals(
        root.multiplyIntervals(sinPhi, phiY),
        root.multiplyIntervals(sinDelta, deltaY)
      )
    ),
    -2
  );
  const numeratorW = root.scaleInterval(
    root.addIntervals(
      root.multiplyIntervals(sinPhi, phiW),
      root.multiplyIntervals(sinDelta, deltaW)
    ),
    -2
  );
  const yDenominatorY = root.multiplyIntervals(
    cell.speed_interval,
    root.addIntervals(
      root.multiplyIntervals(
        root.scaleInterval(delta, 2),
        root.multiplyIntervals(yInterval, deltaY),
        jAbs
      ),
      root.multiplyIntervals(root.positivePowerInterval(delta, 2), yJAbsY)
    )
  );
  const gDenominatorW = root.multiplyIntervals(
    cell.speed_interval,
    root.addIntervals(
      root.multiplyIntervals(root.scaleInterval(delta, 2), deltaW, jAbs),
      root.multiplyIntervals(root.positivePowerInterval(delta, 2), jAbsW)
    )
  );
  const gDenominatorSquared = root.positivePowerInterval(gDenominator, 2);
  const yGy = root.divideIntervals(
    root.subtractIntervals(
      root.multiplyIntervals(yNumeratorY, gDenominator),
      root.multiplyIntervals(numerator, yDenominatorY)
    ),
    gDenominatorSquared
  );
  const gW = root.divideIntervals(
    root.subtractIntervals(
      root.multiplyIntervals(numeratorW, gDenominator),
      root.multiplyIntervals(numerator, gDenominatorW)
    ),
    gDenominatorSquared
  );
  return {
    G_interval: gInterval,
    y_partial_y_G_interval: yGy,
    partial_W_G_interval: gW,
    Xi_interval: xi,
    J_interval: jInterval,
    J_abs_interval: jAbs,
    y_partial_y_R_shift31_interval: yRY,
    G_denominator_interval: gDenominator,
  };
}

function rowsByCellId(rows) {
  return Object.fromEntries(rows.map((row) => [row.cell_id, row]));
}

function c1TailRow({ speedIndex, yIndex, seedRow, shift31RowsById }) {
  const yInterval = root.outwardInterval([
    (FIRST_Y_CELL_UPPER * yIndex) / DEFAULT_Y_SUBCELL_COUNT,
    (FIRST_Y_CELL_UPPER * (yIndex + 1)) / DEFAULT_Y_SUBCELL_COUNT,
  ]);
  const cell = cellFromSeedRow(seedRow);
  const branchRowsByName = Object.fromEntries(
    seedRow.branch_rows.map((row) => [row.branch, row])
  );
  const branchStates = ["-", "+"].map((branch) => {
    const tubeRow =
      shift31RowsById[`speed.${speedIndex}.first-y-positive.${yIndex}.${branch}`];
    const state = branchState({
      cell,
      branchRow: branchRowsByName[branch],
      yInterval,
      wInterval: numericInterval(tubeRow.W_tube_interval),
    });
    return { branch, tubeRow, state };
  });
  const pairG = root.addIntervals(
    branchStates[0].state.G_interval,
    branchStates[1].state.G_interval
  );
  const y2A = root.multiplyIntervals(
    root.positivePowerInterval(yInterval, 2),
    qPolynomial(seedRow, "Q_G", yInterval)
  );
  const numerator = root.subtractIntervals(
    root.subtractIntervals(pairG, cell.L_interval),
    y2A
  );
  const y28 = root.positivePowerInterval(yInterval, NUMERATOR_SHIFT_POWER);
  const tG = root.divideIntervals(numerator, y28);
  const branchTangentTerms = branchStates.map(({ state }) =>
    root.addIntervals(
      state.y_partial_y_G_interval,
      root.multiplyIntervals(state.Xi_interval, state.partial_W_G_interval)
    )
  );
  const yDyNumerator = root.subtractIntervals(
    root.addIntervals(branchTangentTerms[0], branchTangentTerms[1]),
    yScaledY2QDerivative(seedRow, "Q_G", yInterval)
  );
  const dyTG = root.subtractIntervals(
    root.divideIntervals(yDyNumerator, y28),
    root.scaleInterval(tG, NUMERATOR_SHIFT_POWER)
  );
  const tGAbs = maxAbsInterval(tG);
  const dyTGAbs = maxAbsInterval(dyTG);
  const identityDBound = 28 * tGAbs + dyTGAbs;
  const gBudgetExcess = tGAbs - Q_G_TAIL_BUDGET;
  const dBudgetExcess = identityDBound - Q_D_TAIL_BUDGET;
  const closes = gBudgetExcess < 0 && dBudgetExcess < 0;
  const jClearances = branchStates.map(({ state }) =>
    root.intervalSignAndClearance(state.J_interval).clearance
  );
  return {
    cell_id: `speed.${speedIndex}.first-y-positive.${yIndex}.pair`,
    speed_cell_id: `speed.${speedIndex}`,
    positive_y_subcell_index: yIndex,
    y_interval: root.formatInterval(yInterval),
    branch_W_tube_intervals: Object.fromEntries(
      branchStates.map(({ branch, tubeRow }) => [branch, tubeRow.W_tube_interval])
    ),
    branch_Xi_intervals: Object.fromEntries(
      branchStates.map(({ branch, state }) => [
        branch,
        root.formatInterval(state.Xi_interval),
      ])
    ),
    branch_y_partial_y_R_shift31_intervals: Object.fromEntries(
      branchStates.map(({ branch, state }) => [
        branch,
        root.formatInterval(state.y_partial_y_R_shift31_interval),
      ])
    ),
    branch_J_intervals: Object.fromEntries(
      branchStates.map(({ branch, state }) => [
        branch,
        root.formatInterval(state.J_interval),
      ])
    ),
    min_abs_branch_J_clearance: root.formatSmallNumber(Math.min(...jClearances)),
    branch_G_intervals: Object.fromEntries(
      branchStates.map(({ branch, state }) => [
        branch,
        root.formatInterval(state.G_interval),
      ])
    ),
    branch_y_partial_y_G_intervals: Object.fromEntries(
      branchStates.map(({ branch, state }) => [
        branch,
        root.formatInterval(state.y_partial_y_G_interval),
      ])
    ),
    branch_partial_W_G_intervals: Object.fromEntries(
      branchStates.map(({ branch, state }) => [
        branch,
        root.formatInterval(state.partial_W_G_interval),
      ])
    ),
    G_pair_interval: root.formatInterval(pairG),
    y2_A_G26_interval: root.formatInterval(y2A),
    shifted_G_tail_numerator_interval: root.formatInterval(numerator),
    T_G_27_interval: root.formatInterval(tG),
    max_abs_T_G_27: root.formatSmallNumber(tGAbs),
    D_y_T_G_27_interval: root.formatInterval(dyTG),
    max_abs_D_y_T_G_27: root.formatSmallNumber(dyTGAbs),
    T_D_27_identity_bound_abs:
      root.formatSmallNumber(identityDBound),
    Q_G_tail_budget: root.formatSmallNumber(Q_G_TAIL_BUDGET),
    Q_D_tail_budget: root.formatSmallNumber(Q_D_TAIL_BUDGET),
    Q_D_identity_TG_only_ceiling: root.formatSmallNumber(
      IDENTITY_TG_ONLY_CEILING
    ),
    Q_G_budget_excess: root.formatSmallNumber(gBudgetExcess),
    Q_D_identity_budget_excess: root.formatSmallNumber(dBudgetExcess),
    C1_root_tangent_Xi_used: true,
    tangent_operator:
      "D_y=y*partial_y+Xi_epsilon*partial_W with Xi_epsilon=-y*partial_y R_epsilon,31/J_epsilon",
    T_D_identity_used:
      "T_D^(27)=-28*T_G^(27)-D_y T_G^(27)",
    constant_W_derivative_used: false,
    direct_D_unfactored_F_delta_inverse_used: false,
    zero_touching_y_division_used: false,
    row_closes_budget: closes,
    row_status: closes ? ROW_CERTIFIED_STATUS : ROW_OBSTRUCTION_STATUS,
  };
}

function buildRows({ seedArtifact, finiteShift31Artifact }) {
  const shift31RowsById = rowsByCellId(
    finiteShift31Artifact.finite_shift31_next_successor_root_tail_tube_rows
  );
  const rows = [];
  seedArtifact.twenty_sixth_order_post_u_successor_coefficient_rows.forEach(
    (seedRow, speedIndex) => {
      for (let yIndex = 1; yIndex < DEFAULT_Y_SUBCELL_COUNT; yIndex += 1) {
        rows.push(c1TailRow({ speedIndex, yIndex, seedRow, shift31RowsById }));
      }
    }
  );
  return rows;
}

function summarizeRows({ rows, seedArtifact, finiteShift31Artifact }) {
  const h26Errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySixthOrderPostUSuccessorCoefficientCertificate(
      seedArtifact
    );
  const shift31Errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift31NextSuccessorRootTailTubeCertificate(
      finiteShift31Artifact
    );
  const allRowsClose = rows.every((row) => row.row_closes_budget === true);
  const allC1Tangent = rows.every((row) => row.C1_root_tangent_Xi_used === true);
  const allNoConstantWDerivative = rows.every(
    (row) => row.constant_W_derivative_used === false
  );
  const allNoDirectDInverse = rows.every(
    (row) => row.direct_D_unfactored_F_delta_inverse_used === false
  );
  const allNoZeroTouchingDivision = rows.every(
    (row) => row.zero_touching_y_division_used === false
  );
  const worstDRow = rows.reduce((worst, row) =>
    Number(row.Q_D_identity_budget_excess) >
    Number(worst.Q_D_identity_budget_excess)
      ? row
      : worst
  );
  const worstGRow = rows.reduce((worst, row) =>
    Number(row.Q_G_budget_excess) > Number(worst.Q_G_budget_excess) ? row : worst
  );
  const passed =
    h26Errors.length === 0 &&
    shift31Errors.length === 0 &&
    allRowsClose &&
    allC1Tangent &&
    allNoConstantWDerivative &&
    allNoDirectDInverse &&
    allNoZeroTouchingDivision;
  return {
    speed_cell_count: SPEED_CELL_COUNT,
    branch_count: 2,
    first_y_cell: [0, root.formatSmallNumber(FIRST_Y_CELL_UPPER)],
    positive_y_subcell_count: DEFAULT_Y_SUBCELL_COUNT - 1,
    c1_tail_row_count: rows.length,
    tail_order: TAIL_ORDER,
    numerator_shift_power: NUMERATOR_SHIFT_POWER,
    root_shift_power: ROOT_SHIFT_POWER,
    h26_seed_artifact_valid: h26Errors.length === 0,
    h26_seed_validation_errors: h26Errors,
    finite_shift31_artifact_valid: shift31Errors.length === 0,
    finite_shift31_validation_errors: shift31Errors,
    all_rows_close_C1_twenty_seventh_order_tail_budget: allRowsClose,
    all_rows_include_root_tangent_Xi: allC1Tangent,
    all_rows_reject_constant_W_derivative: allNoConstantWDerivative,
    all_rows_avoid_direct_D_unfactored_F_delta_inverse: allNoDirectDInverse,
    all_rows_avoid_zero_touching_y_division: allNoZeroTouchingDivision,
    min_abs_branch_J_clearance: root.formatSmallNumber(
      minField(rows, "min_abs_branch_J_clearance")
    ),
    max_abs_T_G_27: root.formatSmallNumber(maxField(rows, "max_abs_T_G_27")),
    max_abs_D_y_T_G_27: root.formatSmallNumber(
      maxField(rows, "max_abs_D_y_T_G_27")
    ),
    max_T_D_27_identity_bound_abs: root.formatSmallNumber(
      maxField(rows, "T_D_27_identity_bound_abs")
    ),
    Q_G_tail_budget: root.formatSmallNumber(Q_G_TAIL_BUDGET),
    Q_D_tail_budget: root.formatSmallNumber(Q_D_TAIL_BUDGET),
    Q_D_identity_TG_only_ceiling: root.formatSmallNumber(
      IDENTITY_TG_ONLY_CEILING
    ),
    max_Q_G_budget_excess: root.formatSmallNumber(
      maxField(rows, "Q_G_budget_excess")
    ),
    max_Q_D_identity_budget_excess: root.formatSmallNumber(
      maxField(rows, "Q_D_identity_budget_excess")
    ),
    worst_G_budget_row: worstGRow.cell_id,
    worst_D_identity_budget_row: worstDRow.cell_id,
    T_G_27_interval_hull: coefficientHull(
      rows.map((row) => numericInterval(row.T_G_27_interval))
    ),
    D_y_T_G_27_interval_hull: coefficientHull(
      rows.map((row) => numericInterval(row.D_y_T_G_27_interval))
    ),
    inherited_h26_interval_hull:
      seedArtifact.twenty_sixth_order_post_u_successor_coefficient_summary
        .h26_interval_hull,
    inherited_Q_G_y26_coefficient_interval_hull:
      seedArtifact.twenty_sixth_order_post_u_successor_coefficient_summary
        .Q_G_y26_coefficient_interval_hull,
    inherited_Q_D_y26_coefficient_interval_hull:
      seedArtifact.twenty_sixth_order_post_u_successor_coefficient_summary
        .Q_D_y26_coefficient_interval_hull,
    inherited_min_Q_G_remaining_twenty_seventh_order_tail_budget:
      seedArtifact.twenty_sixth_order_post_u_successor_coefficient_summary
        .min_Q_G_remaining_twenty_seventh_order_tail_budget,
    inherited_min_Q_D_remaining_twenty_seventh_order_tail_budget:
      seedArtifact.twenty_sixth_order_post_u_successor_coefficient_summary
        .min_Q_D_remaining_twenty_seventh_order_tail_budget,
    status: passed ? CERTIFIED_STATUS : OBSTRUCTION_STATUS,
    obstruction_driver: passed
      ? null
      : "The broad positive-y interval subtraction P-L-y^2*A_G,26 loses the certified lower-order cancellations before division by y^29. A successor must use a coefficient-preserving Taylor quotient/inverse model on the W_epsilon root graph.",
    obstruction_note: passed
      ? null
      : "The factored positive-y C1 interval evaluator includes Xi_epsilon and the tangent operator D_y, but its certified T_D identity enclosure exceeds the inherited twenty-seventh-order D budget. This is a rigorous obstruction to this evaluator closing the row, not a retained-branch or full quotient claim.",
  };
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdC1TwentySeventhOrderTailBoundCertificate(
  options = {}
) {
  const ySubcellCount = validateYSubcellCount(
    options.ySubcellCount ?? DEFAULT_Y_SUBCELL_COUNT
  );
  const wTubePadding = validatePositivePadding(
    options.wTubePadding ?? DEFAULT_W_TUBE_PADDING,
    "wTubePadding"
  );
  const zPredecessorTubePadding = validatePositivePadding(
    options.zPredecessorTubePadding ?? DEFAULT_Z_PREDECESSOR_TUBE_PADDING,
    "zPredecessorTubePadding"
  );
  if (ySubcellCount !== DEFAULT_Y_SUBCELL_COUNT) {
    throw new Error(
      `C1 tail evaluator currently requires ySubcellCount=${DEFAULT_Y_SUBCELL_COUNT} to align with the imported finite Shift31 rows`
    );
  }
  const seedArtifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySixthOrderPostUSuccessorCoefficientCertificate();
  const finiteShift31Artifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift31NextSuccessorRootTailTubeCertificate(
      {
        ySubcellCount,
        wTubePadding,
        zPredecessorTubePadding,
      }
    );
  const rows = buildRows({ seedArtifact, finiteShift31Artifact });
  const summary = summarizeRows({ rows, seedArtifact, finiteShift31Artifact });
  const passed = summary.status === CERTIFIED_STATUS;
  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_C1_TWENTY_SEVENTH_ORDER_TAIL_BOUND_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-sixth-order-post-u-successor-coefficient-certificate.md",
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-shift31-next-successor-root-tail-tube-certificate.md",
    ],
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-c1-twenty-seventh-order-tail-bound-certificate.md",
    c1_twenty_seventh_order_tail_bound_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: root.SPEED_RATIO_ENCLOSURE,
      speed_cell_count: SPEED_CELL_COUNT,
      first_y_cell: [0, root.formatSmallNumber(FIRST_Y_CELL_UPPER)],
      y_subcell_count: ySubcellCount,
      positive_y_subcell_count: ySubcellCount - 1,
      w_tube_padding: root.formatSmallNumber(wTubePadding),
      z_predecessor_tube_padding: root.formatSmallNumber(
        zPredecessorTubePadding
      ),
      tail_order: TAIL_ORDER,
      numerator_shift_power: NUMERATOR_SHIFT_POWER,
      root_shift_power: ROOT_SHIFT_POWER,
      G_tail_formula:
        "T_G^(27)=Shift_29(P-L-y^2*A_G,26) evaluated through the factored G denominator g_denominator=nu*delta^2*J_abs on positive-y subcells",
      root_tangent:
        "Xi_epsilon=-y*partial_y R_epsilon,31/J_epsilon",
      tangent_operator:
        "D_y=y*partial_y+Xi_epsilon*partial_W",
      D_tail_identity:
        "T_D^(27)=-28*T_G^(27)-D_y*T_G^(27)",
      direct_D_quotient_policy:
        "not used; the unfactored F_delta denominator is unsafe near y=0",
      constant_W_derivative_policy:
        "not used; the derivative follows the certified root graph through Xi_epsilon",
    },
    c1_twenty_seventh_order_tail_bound_rows: rows,
    c1_twenty_seventh_order_tail_bound_summary: summary,
    closure_burndown: [
      {
        row: "theta3minus.fold-pair-first-y-GD-twenty-sixth-order-post-U-successor-coefficient",
        status: "directed-rounded-interval-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-finite-shift31-next-successor-root-tail-tube",
        status: "directed-rounded-positive-y-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-C1-twenty-seventh-order-tail-bound",
        status: passed ? "directed-rounded-certified" : "rigorous-obstruction",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure",
        status: passed
          ? "blocked-by-full-quotient-and-scaled-remainder-successors"
          : "blocked-by-C1-twenty-seventh-order-tail-bound-obstruction",
      },
    ],
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_directed_rounded_first_y_GD_C1_twenty_seventh_order_tail_bound:
        passed,
      certifies_rigorous_C1_tail_bound_obstruction: !passed,
      includes_root_tangent_Xi: true,
      uses_tangent_operator_D_y: true,
      uses_T_D_from_T_G_C1_identity: true,
      uses_constant_W_derivative: false,
      uses_direct_D_unfactored_F_delta_inverse: false,
      certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
        passed,
      certifies_directed_rounded_first_y_GD_finite_remainder_bound: false,
      certifies_directed_rounded_first_y_GD_jet_enclosure: false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_directed_rounded_first_y_GD_quadrature: false,
      retained_branch: false,
      claim_level: passed
        ? "Directed-rounded C1 first-y G/D twenty-seventh-order quotient-tail bound on the finite Shift31 W_epsilon tube, using the root-tangent Xi_epsilon and the correlated T_D identity. Full first-y quotient enclosure, scaled remainder, I1 closure, quadrature, and retained branch status remain open."
        : "Rigorous diagnostic obstruction for the factored positive-y C1 twenty-seventh-order tail evaluator. The attempt includes Xi_epsilon and D_y and avoids the direct D quotient inverse, but its interval identity bound exceeds the inherited D budget; no continuous successor tail closure is claimed.",
    },
    result: {
      theory_status: summary.status,
      first_successor_row: passed
        ? "theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure-successor-required"
        : "theta3minus.fold-pair-first-y-GD-C1-twenty-seventh-order-tail-bound-needs-coefficient-preserving-root-tangent-taylor-quotient-model",
      retention: "not_retained",
      retained_branch: false,
      status_note: passed
        ? "The C1 twenty-seventh-order tail bound closes through the root-tangent identity."
        : "The C1 attempt is valid as a diagnostic: it includes the root tangent and avoids the unsafe direct D quotient inverse, but the certified D identity bound exceeds the budget.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdC1TwentySeventhOrderTailBoundCertificate(
  artifact
) {
  const errors = [];
  const summary = artifact?.c1_twenty_seventh_order_tail_bound_summary;
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_C1_TWENTY_SEVENTH_ORDER_TAIL_BOUND_CERTIFICATE_SCHEMA,
    "schema must match theta3minus fold-pair first-y G/D C1 twenty-seventh-order tail-bound certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus fold-pair first-y G/D C1 twenty-seventh-order tail-bound packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.c1_twenty_seventh_order_tail_bound_parameters?.speed_constraint ===
      NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "C1 twenty-seventh-order tail-bound certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.c1_twenty_seventh_order_tail_bound_parameters?.speed_band ===
      undefined &&
      artifact?.c1_twenty_seventh_order_tail_bound_parameters?.speed_window ===
        undefined &&
      artifact?.c1_twenty_seventh_order_tail_bound_parameters?.speed_min ===
        undefined &&
      artifact?.c1_twenty_seventh_order_tail_bound_parameters?.speed_max ===
        undefined,
    "C1 twenty-seventh-order tail-bound parameters must not contain speed-band fields",
    errors
  );
  assertField(
    summary?.h26_seed_artifact_valid === true &&
      summary?.finite_shift31_artifact_valid === true &&
      summary?.all_rows_include_root_tangent_Xi === true &&
      summary?.all_rows_reject_constant_W_derivative === true &&
      summary?.all_rows_avoid_direct_D_unfactored_F_delta_inverse === true &&
      summary?.all_rows_avoid_zero_touching_y_division === true &&
      Number(summary?.min_abs_branch_J_clearance) > 0.79 &&
      Number.isFinite(Number(summary?.max_abs_T_G_27)) &&
      Number.isFinite(Number(summary?.max_abs_D_y_T_G_27)) &&
      Number.isFinite(Number(summary?.max_T_D_27_identity_bound_abs)),
    "C1 attempt must validate predecessors, include Xi and D_y, avoid constant-W and direct D inverse paths, and keep finite interval bounds",
    errors
  );
  const certified =
    summary?.status === CERTIFIED_STATUS &&
    summary?.all_rows_close_C1_twenty_seventh_order_tail_budget === true &&
    Number(summary?.max_abs_T_G_27) < Q_G_TAIL_BUDGET &&
    Number(summary?.max_T_D_27_identity_bound_abs) < Q_D_TAIL_BUDGET;
  const obstructed =
    summary?.status === OBSTRUCTION_STATUS &&
    summary?.all_rows_close_C1_twenty_seventh_order_tail_budget === false &&
    Number(summary?.max_Q_D_identity_budget_excess) > 0 &&
    artifact?.artifact_claim?.certifies_rigorous_C1_tail_bound_obstruction ===
      true &&
    artifact?.artifact_claim
      ?.certifies_directed_rounded_first_y_GD_C1_twenty_seventh_order_tail_bound ===
      false;
  assertField(
    certified || obstructed,
    "C1 artifact must either certify the twenty-seventh-order tail budgets or record a rigorous positive D-identity budget obstruction",
    errors
  );
  assertField(
    artifact?.artifact_claim?.includes_root_tangent_Xi === true &&
      artifact?.artifact_claim?.uses_tangent_operator_D_y === true &&
      artifact?.artifact_claim?.uses_T_D_from_T_G_C1_identity === true &&
      artifact?.artifact_claim?.uses_constant_W_derivative === false &&
      artifact?.artifact_claim?.uses_direct_D_unfactored_F_delta_inverse ===
        false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_finite_remainder_bound ===
        false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_jet_enclosure === false &&
      artifact?.artifact_claim?.certifies_directed_rounded_fold_pair_scaled_remainder ===
        false &&
      artifact?.artifact_claim?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_quadrature === false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact claim must include root-tangent C1 identity discipline and keep full quotient, scaled remainder, I1, quadrature, and retention open",
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
    } else if (arg === "--y-subcell-count") {
      options.ySubcellCount = argv[++index];
    } else if (arg === "--w-tube-padding") {
      options.wTubePadding = argv[++index];
    } else if (arg === "--z-predecessor-tube-padding") {
      options.zPredecessorTubePadding = argv[++index];
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-c1-twenty-seventh-order-tail-bound-certificate.mjs [options]",
    "",
    "Options:",
    "  --out <path>                       Write artifact JSON",
    "  --validate <path>                  Validate an artifact JSON",
    "  --schema                           Print artifact schema metadata",
    "  --y-subcell-count <count>          Positive-y diagnostic subcell count; currently must be 16",
    "  --w-tube-padding <value>           Symmetric padding for the certified W tube",
    "  --z-predecessor-tube-padding <value>",
    "                                     Padding around each predecessor Z tube interval",
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
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_C1_TWENTY_SEVENTH_ORDER_TAIL_BOUND_CERTIFICATE_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdC1TwentySeventhOrderTailBoundCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  try {
    const artifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdC1TwentySeventhOrderTailBoundCertificate(
        options
      );
    const errors =
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdC1TwentySeventhOrderTailBoundCertificate(
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
