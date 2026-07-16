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

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_H_GRAPH_G_QUOTIENT_CELL_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-h-graph-g-quotient-cell-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_h_graph_g_quotient_cell_certificate";
const PROMOTION_STATUS = "priority-only";
const NO_SPEED_WINDOW =
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";
const SOURCE_COEFFICIENT = -1;
const SIGMA = 1;
const DEFAULT_H_CONTRACTION_STEPS = 14;
const DEFAULT_H_CONTRACTION_TARGET_WIDTH = 0.002;
const G_QUOTIENT_CERTIFIED_STATUS =
  "directed-rounded-theta3minus-fold-pair-h-graph-positive-y-GD-quotient-cell-cover-certified";

function numericInterval(interval) {
  return interval.map(Number);
}

function definiteAbsoluteInterval(interval) {
  const [left, right] = interval;
  if (left > 0) {
    return interval;
  }
  if (right < 0) {
    return root.scaleInterval(interval, -1);
  }
  return [0, Math.max(Math.abs(left), Math.abs(right))];
}

function intervalWidth([left, right]) {
  return right - left;
}

function finiteInterval(interval) {
  return interval.every((entry) => Number.isFinite(entry));
}

function maxAbsInterval(interval) {
  return Math.max(...interval.map((entry) => Math.abs(Number(entry))));
}

function foldLimitInterval(cell) {
  const foldKernel = root.scaleInterval(
    root.addIntervals(cell.cos_phi_interval, cell.cos_delta_interval),
    -0.5
  );
  const numerator = root.scaleInterval(
    foldKernel,
    8 * SOURCE_COEFFICIENT * SIGMA
  );
  const denominator = root.multiplyIntervals(
    cell.speed_interval,
    root.positivePowerInterval(cell.delta_fold_interval, 2),
    definiteAbsoluteInterval(cell.F_delta_delta_interval),
    cell.beta_interval
  );
  return root.divideIntervals(numerator, denominator);
}

function branchCoordinates({ cell, yInterval, hInterval, branch }) {
  const sign = root.branchSign(branch);
  const zInterval = root.addIntervals(
    cell.gamma_interval,
    root.multiplyIntervals(yInterval, hInterval)
  );
  const rInterval = root.branchRInterval({
    betaInterval: cell.beta_interval,
    yInterval,
    zInterval,
    sign,
  });
  const qInterval = root.branchQInterval({
    betaInterval: cell.beta_interval,
    yInterval,
    zInterval,
    sign,
  });
  const deltaInterval = root.addIntervals(
    cell.delta_fold_interval,
    root.multiplyIntervals(yInterval, rInterval)
  );
  const phiInterval = root.subtractIntervals(
    cell.phi_fold_interval,
    root.multiplyIntervals(yInterval, qInterval)
  );
  return {
    sign,
    zInterval,
    rInterval,
    qInterval,
    deltaInterval,
    phiInterval,
  };
}

function contractHRootTube({
  cell,
  yInterval,
  branch,
  hContractionSteps,
  hContractionTargetWidth,
}) {
  const sign = root.branchSign(branch);
  let [left, right] = root.BRANCH_H_TUBES[branch];
  const expectedLeftSign = branch === "-" ? "-" : "+";
  const expectedRightSign = branch === "-" ? "+" : "-";

  const evaluateH = (h) =>
    root.branchHInterval({
      cell,
      yInterval,
      hInterval: root.pointInterval(h),
      sign,
    });

  let leftInterval = evaluateH(left);
  let rightInterval = evaluateH(right);
  let leftSign = root.intervalSignAndClearance(leftInterval);
  let rightSign = root.intervalSignAndClearance(rightInterval);
  let completedSteps = 0;
  let stoppedByMixedMidpoint = false;

  if (
    leftSign.sign === expectedLeftSign &&
    rightSign.sign === expectedRightSign
  ) {
    for (
      let step = 0;
      step < hContractionSteps && right - left > hContractionTargetWidth;
      step += 1
    ) {
      const midpoint = 0.5 * (left + right);
      const midpointInterval = evaluateH(midpoint);
      const midpointSign = root.intervalSignAndClearance(midpointInterval);
      if (midpointSign.sign === expectedLeftSign) {
        left = midpoint;
        leftInterval = midpointInterval;
        leftSign = midpointSign;
      } else if (midpointSign.sign === expectedRightSign) {
        right = midpoint;
        rightInterval = midpointInterval;
        rightSign = midpointSign;
      } else {
        stoppedByMixedMidpoint = true;
        break;
      }
      completedSteps += 1;
    }
  }

  const hInterval = root.outwardInterval([left, right]);
  const zInterval = root.addIntervals(
    cell.gamma_interval,
    root.multiplyIntervals(yInterval, hInterval)
  );
  const jInterval = root.scaledJInterval({
    cell,
    yInterval,
    zInterval,
    sign,
  });
  const jSign = root.intervalSignAndClearance(jInterval);
  const expectedJSign = branch === "-" ? "+" : "-";
  const certified =
    leftSign.sign === expectedLeftSign &&
    rightSign.sign === expectedRightSign &&
    jSign.sign === expectedJSign;

  return {
    branch,
    h_interval: hInterval,
    z_interval: zInterval,
    H_left_endpoint_interval: leftInterval,
    H_left_endpoint_sign: leftSign.sign,
    H_left_endpoint_clearance: leftSign.clearance,
    H_right_endpoint_interval: rightInterval,
    H_right_endpoint_sign: rightSign.sign,
    H_right_endpoint_clearance: rightSign.clearance,
    J_interval: jInterval,
    J_sign: jSign.sign,
    J_clearance: jSign.clearance,
    h_width: intervalWidth(hInterval),
    completed_h_contraction_steps: completedSteps,
    stopped_by_mixed_midpoint: stoppedByMixedMidpoint,
    uses_h_monotonicity_from_certified_J_sign: true,
    h_contraction_certified: certified,
  };
}

function branchGContributionInterval({ cell, yInterval, hInterval, branch }) {
  const geometry = branchCoordinates({ cell, yInterval, hInterval, branch });
  const cosPhi = root.cosInterval(geometry.phiInterval);
  const cosDelta = root.cosInterval(geometry.deltaInterval);
  const kernel = root.scaleInterval(root.addIntervals(cosPhi, cosDelta), -0.5);
  const jInterval = root.scaledJInterval({
    cell,
    yInterval,
    zInterval: geometry.zInterval,
    sign: geometry.sign,
  });
  const jSign = root.intervalSignAndClearance(jInterval);
  const expectedJSign = branch === "-" ? "+" : "-";
  const absJInterval =
    branch === "-" ? jInterval : root.scaleInterval(jInterval, -1);
  const denominator = root.multiplyIntervals(
    cell.speed_interval,
    root.positivePowerInterval(geometry.deltaInterval, 2),
    absJInterval
  );
  const denominatorSign = root.intervalSignAndClearance(denominator);
  const numerator = root.scaleInterval(
    kernel,
    4 * SOURCE_COEFFICIENT * SIGMA
  );
  const contribution = root.divideIntervals(numerator, denominator);
  return {
    branch,
    z_image_interval: geometry.zInterval,
    r_interval: geometry.rInterval,
    q_interval: geometry.qInterval,
    delta_interval: geometry.deltaInterval,
    phi_interval: geometry.phiInterval,
    B_interval: kernel,
    J_interval: jInterval,
    J_sign: jSign.sign,
    J_clearance: jSign.clearance,
    expected_J_sign: expectedJSign,
    denominator_interval: denominator,
    denominator_sign: denominatorSign.sign,
    denominator_positive_clearance: denominatorSign.clearance,
    G_branch_interval: contribution,
    branch_G_certified:
      jSign.sign === expectedJSign &&
      denominatorSign.sign === "+" &&
      finiteInterval(contribution),
  };
}

function branchDContributionInterval({ cell, yInterval, hInterval, branch }) {
  const geometry = branchCoordinates({ cell, yInterval, hInterval, branch });
  const sinPhi = root.sinInterval(geometry.phiInterval);
  const cosPhi = root.cosInterval(geometry.phiInterval);
  const sinDelta = root.sinInterval(geometry.deltaInterval);
  const cosDelta = root.cosInterval(geometry.deltaInterval);
  const kernel = root.scaleInterval(root.addIntervals(cosPhi, cosDelta), -0.5);
  const jInterval = root.scaledJInterval({
    cell,
    yInterval,
    zInterval: geometry.zInterval,
    sign: geometry.sign,
  });
  const jSign = root.intervalSignAndClearance(jInterval);
  const expectedJSign = branch === "-" ? "+" : "-";
  const fDeltaInterval = root.multiplyIntervals(yInterval, jInterval);
  const fDeltaSign = root.intervalSignAndClearance(fDeltaInterval);
  const expectedFDeltaSign = expectedJSign;
  const signFDelta = fDeltaSign.sign === "+" ? 1 : -1;
  const absFDelta = definiteAbsoluteInterval(fDeltaInterval);
  const deltaSquared = root.positivePowerInterval(geometry.deltaInterval, 2);
  const deltaPrime = root.divideIntervals(
    root.scaleInterval(cosPhi, -2),
    fDeltaInterval
  );
  const kernelPrime = root.addIntervals(
    sinPhi,
    root.scaleInterval(
      root.multiplyIntervals(
        root.subtractIntervals(sinDelta, sinPhi),
        deltaPrime
      ),
      0.5
    )
  );
  const fDeltaDelta = root.addIntervals(
    root.scaleInterval(root.inverseSpeedSquaredInterval(cell.speed_interval), 2),
    root.scaleInterval(sinPhi, -1),
    root.scaleInterval(sinDelta, -1)
  );
  const fDeltaPrime = root.addIntervals(
    root.scaleInterval(sinPhi, 2),
    root.multiplyIntervals(fDeltaDelta, deltaPrime)
  );
  const inverseFactor = root.reciprocalInterval(
    root.multiplyIntervals(deltaSquared, absFDelta)
  );
  const inverseFactorPrime = root.addIntervals(
    root.divideIntervals(
      root.scaleInterval(deltaPrime, -2),
      root.multiplyIntervals(
        root.positivePowerInterval(geometry.deltaInterval, 3),
        absFDelta
      )
    ),
    root.divideIntervals(
      root.scaleInterval(fDeltaPrime, -signFDelta),
      root.multiplyIntervals(
        deltaSquared,
        root.positivePowerInterval(absFDelta, 2)
      )
    )
  );
  const sourceDerivativeContribution = root.scaleInterval(
    root.divideIntervals(
      root.addIntervals(
        root.multiplyIntervals(kernelPrime, inverseFactor),
        root.multiplyIntervals(kernel, inverseFactorPrime)
      ),
      cell.speed_interval
    ),
    2 * SIGMA
  );
  const contribution = root.scaleInterval(
    root.multiplyIntervals(
      root.positivePowerInterval(yInterval, 3),
      sourceDerivativeContribution
    ),
    4 * SOURCE_COEFFICIENT
  );
  return {
    branch,
    z_image_interval: geometry.zInterval,
    delta_interval: geometry.deltaInterval,
    phi_interval: geometry.phiInterval,
    B_interval: kernel,
    B_prime_interval: kernelPrime,
    J_interval: jInterval,
    J_sign: jSign.sign,
    J_clearance: jSign.clearance,
    expected_J_sign: expectedJSign,
    F_delta_interval: fDeltaInterval,
    F_delta_sign: fDeltaSign.sign,
    F_delta_clearance: fDeltaSign.clearance,
    expected_F_delta_sign: expectedFDeltaSign,
    delta_prime_interval: deltaPrime,
    F_delta_delta_interval: fDeltaDelta,
    F_delta_prime_interval: fDeltaPrime,
    inverse_factor_interval: inverseFactor,
    inverse_factor_prime_interval: inverseFactorPrime,
    D_branch_interval: contribution,
    branch_D_certified:
      jSign.sign === expectedJSign &&
      fDeltaSign.sign === expectedFDeltaSign &&
      finiteInterval(contribution),
  };
}

function formatHContractionRow(row) {
  return {
    branch: row.branch,
    h_interval: root.formatInterval(row.h_interval),
    z_image_interval: root.formatInterval(row.z_interval),
    H_left_endpoint_interval: root.formatInterval(row.H_left_endpoint_interval),
    H_left_endpoint_sign: row.H_left_endpoint_sign,
    H_left_endpoint_clearance: root.formatSmallNumber(
      row.H_left_endpoint_clearance
    ),
    H_right_endpoint_interval: root.formatInterval(row.H_right_endpoint_interval),
    H_right_endpoint_sign: row.H_right_endpoint_sign,
    H_right_endpoint_clearance: root.formatSmallNumber(
      row.H_right_endpoint_clearance
    ),
    J_interval: root.formatInterval(row.J_interval),
    J_sign: row.J_sign,
    J_clearance: root.formatSmallNumber(row.J_clearance),
    h_width: root.formatSmallNumber(row.h_width),
    completed_h_contraction_steps: row.completed_h_contraction_steps,
    stopped_by_mixed_midpoint: row.stopped_by_mixed_midpoint,
    uses_h_monotonicity_from_certified_J_sign:
      row.uses_h_monotonicity_from_certified_J_sign,
    h_contraction_certified: row.h_contraction_certified,
  };
}

function formatBranchGRow(row) {
  return {
    branch: row.branch,
    z_image_interval: root.formatInterval(row.z_image_interval),
    r_interval: root.formatInterval(row.r_interval),
    q_interval: root.formatInterval(row.q_interval),
    delta_interval: root.formatInterval(row.delta_interval),
    phi_interval: root.formatInterval(row.phi_interval),
    B_interval: root.formatInterval(row.B_interval),
    J_interval: root.formatInterval(row.J_interval),
    J_sign: row.J_sign,
    J_clearance: root.formatSmallNumber(row.J_clearance),
    expected_J_sign: row.expected_J_sign,
    denominator_interval: root.formatInterval(row.denominator_interval),
    denominator_sign: row.denominator_sign,
    denominator_positive_clearance: root.formatSmallNumber(
      row.denominator_positive_clearance
    ),
    G_branch_interval: root.formatInterval(row.G_branch_interval),
    branch_G_certified: row.branch_G_certified,
  };
}

function formatBranchDRow(row) {
  return {
    branch: row.branch,
    z_image_interval: root.formatInterval(row.z_image_interval),
    delta_interval: root.formatInterval(row.delta_interval),
    phi_interval: root.formatInterval(row.phi_interval),
    B_interval: root.formatInterval(row.B_interval),
    B_prime_interval: root.formatInterval(row.B_prime_interval),
    J_interval: root.formatInterval(row.J_interval),
    J_sign: row.J_sign,
    J_clearance: root.formatSmallNumber(row.J_clearance),
    expected_J_sign: row.expected_J_sign,
    F_delta_interval: root.formatInterval(row.F_delta_interval),
    F_delta_sign: row.F_delta_sign,
    F_delta_clearance: root.formatSmallNumber(row.F_delta_clearance),
    expected_F_delta_sign: row.expected_F_delta_sign,
    delta_prime_interval: root.formatInterval(row.delta_prime_interval),
    F_delta_delta_interval: root.formatInterval(row.F_delta_delta_interval),
    F_delta_prime_interval: root.formatInterval(row.F_delta_prime_interval),
    inverse_factor_interval: root.formatInterval(row.inverse_factor_interval),
    inverse_factor_prime_interval: root.formatInterval(
      row.inverse_factor_prime_interval
    ),
    D_branch_interval: root.formatInterval(row.D_branch_interval),
    branch_D_certified: row.branch_D_certified,
  };
}

function quotientRowForCell({
  speedIndex,
  yIndex,
  speedInterval,
  yInterval,
  cell,
  hContractionRows,
}) {
  const branchRows = hContractionRows.map((hRow) =>
    branchGContributionInterval({
      cell,
      yInterval,
      hInterval: hRow.h_interval,
      branch: hRow.branch,
    })
  );
  const derivativeBranchRows = hContractionRows.map((hRow) =>
    branchDContributionInterval({
      cell,
      yInterval,
      hInterval: hRow.h_interval,
      branch: hRow.branch,
    })
  );
  const branchByName = Object.fromEntries(
    branchRows.map((row) => [row.branch, row])
  );
  const derivativeBranchByName = Object.fromEntries(
    derivativeBranchRows.map((row) => [row.branch, row])
  );
  const gPairInterval = root.addIntervals(
    branchByName["-"].G_branch_interval,
    branchByName["+"].G_branch_interval
  );
  const dPairInterval = root.addIntervals(
    derivativeBranchByName["-"].D_branch_interval,
    derivativeBranchByName["+"].D_branch_interval
  );
  const lCellInterval = foldLimitInterval(cell);
  const residualInterval = root.subtractIntervals(gPairInterval, lCellInterval);
  const derivativeResidualInterval = root.subtractIntervals(
    dPairInterval,
    lCellInterval
  );
  const ySquaredInterval = root.positivePowerInterval(yInterval, 2);
  const quotientInterval = root.divideIntervals(
    residualInterval,
    ySquaredInterval
  );
  const derivativeQuotientInterval = root.divideIntervals(
    derivativeResidualInterval,
    ySquaredInterval
  );
  const minDenominatorClearance = Math.min(
    ...branchRows.map((row) => row.denominator_positive_clearance)
  );
  const minJClearance = Math.min(...branchRows.map((row) => row.J_clearance));
  const minFDeltaClearance = Math.min(
    ...derivativeBranchRows.map((row) => row.F_delta_clearance)
  );
  const allBranchGCertified = branchRows.every((row) => row.branch_G_certified);
  const allBranchDCertified = derivativeBranchRows.every(
    (row) => row.branch_D_certified
  );
  return {
    cell_id: `speed.${speedIndex}.y.${yIndex}`,
    speed_interval: root.formatInterval(speedInterval),
    y_interval: root.formatInterval(yInterval),
    branch_h_contraction_rows: hContractionRows.map(formatHContractionRow),
    branch_G_rows: branchRows.map(formatBranchGRow),
    branch_D_rows: derivativeBranchRows.map(formatBranchDRow),
    L_cell_interval: root.formatInterval(lCellInterval),
    G_pair_interval: root.formatInterval(gPairInterval),
    R_G_pair_interval: root.formatInterval(residualInterval),
    D_pair_interval: root.formatInterval(dPairInterval),
    R_D_pair_interval: root.formatInterval(derivativeResidualInterval),
    y_squared_interval: root.formatInterval(ySquaredInterval),
    Q_G_pair_interval: root.formatInterval(quotientInterval),
    Q_D_pair_interval: root.formatInterval(derivativeQuotientInterval),
    max_abs_Q_G_pair_interval_upper: root.formatSmallNumber(
      maxAbsInterval(quotientInterval)
    ),
    max_abs_Q_D_pair_interval_upper: root.formatSmallNumber(
      maxAbsInterval(derivativeQuotientInterval)
    ),
    min_denominator_positive_clearance: root.formatSmallNumber(
      minDenominatorClearance
    ),
    min_J_clearance: root.formatSmallNumber(minJClearance),
    min_F_delta_clearance: root.formatSmallNumber(minFDeltaClearance),
    first_y_cell_zero_safe: true,
    raw_y_inverse_division_used: false,
    used_correlated_L_subtraction: true,
    quotient_status:
      allBranchGCertified &&
      allBranchDCertified &&
      finiteInterval(quotientInterval) &&
      finiteInterval(derivativeQuotientInterval)
        ? "positive-y-GD-quotients-enclosed"
        : "positive-y-GD-quotient-open",
  };
}

function firstYCellDeferredRow({
  speedIndex,
  yIndex,
  speedInterval,
  yInterval,
  hContractionRows,
}) {
  return {
    cell_id: `speed.${speedIndex}.y.${yIndex}`,
    speed_interval: root.formatInterval(speedInterval),
    y_interval: root.formatInterval(yInterval),
    branch_h_contraction_rows: hContractionRows.map(formatHContractionRow),
    first_y_cell_zero_safe: false,
    raw_y_inverse_division_used: false,
    quotient_status: "requires-Taylor-cancelled-first-y-cell-jet-certificate",
    required_zero_safe_formula:
      "G_epsilon=g0+epsilon*y*g0*Lambda+y^2*S_epsilon with Q_G_pair=S_-+S_+; no raw division by y^2 on a cell touching y=0",
  };
}

function summarizeRows({ quotientRows, firstYCellRows }) {
  const branchRows = quotientRows.flatMap((row) => row.branch_G_rows);
  const derivativeBranchRows = quotientRows.flatMap((row) => row.branch_D_rows);
  const contractionRows = [
    ...quotientRows.flatMap((row) => row.branch_h_contraction_rows),
    ...firstYCellRows.flatMap((row) => row.branch_h_contraction_rows),
  ];
  const allPositiveYQuotientsCertified = quotientRows.every(
    (row) => row.quotient_status === "positive-y-GD-quotients-enclosed"
  );
  const allHContractionsCertified = contractionRows.every(
    (row) => row.h_contraction_certified
  );
  const noRawZeroDivision = firstYCellRows.every(
    (row) => row.raw_y_inverse_division_used === false
  );
  const minDenominatorClearance = Math.min(
    ...branchRows.map((row) => Number(row.denominator_positive_clearance))
  );
  const minJClearance = Math.min(
    ...branchRows.map((row) => Number(row.J_clearance))
  );
  const minFDeltaClearance = Math.min(
    ...derivativeBranchRows.map((row) => Number(row.F_delta_clearance))
  );
  const minHClearance = Math.min(
    ...contractionRows.flatMap((row) => [
      Number(row.H_left_endpoint_clearance),
      Number(row.H_right_endpoint_clearance),
    ])
  );
  const maxHWidth = Math.max(
    ...contractionRows.map((row) => Number(row.h_width))
  );
  const maxAbsQuotient = Math.max(
    ...quotientRows.map((row) => Number(row.max_abs_Q_G_pair_interval_upper))
  );
  const maxAbsDerivativeQuotient = Math.max(
    ...quotientRows.map((row) => Number(row.max_abs_Q_D_pair_interval_upper))
  );
  const passed =
    allPositiveYQuotientsCertified &&
    allHContractionsCertified &&
    noRawZeroDivision &&
    minDenominatorClearance > 0.5 &&
    minJClearance > 0.7 &&
    minFDeltaClearance > 0 &&
    minHClearance > 0 &&
    Number.isFinite(maxAbsQuotient) &&
    Number.isFinite(maxAbsDerivativeQuotient);
  return {
    speed_cell_count: new Set(
      [...quotientRows, ...firstYCellRows].map((row) =>
        row.speed_interval.join(",")
      )
    ).size,
    y_cell_count: new Set(
      [...quotientRows, ...firstYCellRows].map((row) =>
        row.y_interval.join(",")
      )
    ).size,
    positive_y_cell_count: quotientRows.length,
    first_y_cell_count: firstYCellRows.length,
    positive_y_branch_G_count: branchRows.length,
    positive_y_branch_D_count: derivativeBranchRows.length,
    h_contraction_branch_count: contractionRows.length,
    all_positive_y_GD_quotients_certified: allPositiveYQuotientsCertified,
    all_positive_y_G_quotients_certified: allPositiveYQuotientsCertified,
    all_positive_y_D_quotients_certified: allPositiveYQuotientsCertified,
    all_h_contractions_certified: allHContractionsCertified,
    no_raw_y_inverse_division_on_zero_touching_cells: noRawZeroDivision,
    min_denominator_positive_clearance: root.formatSmallNumber(
      minDenominatorClearance
    ),
    min_J_clearance: root.formatSmallNumber(minJClearance),
    min_F_delta_clearance: root.formatSmallNumber(minFDeltaClearance),
    min_H_endpoint_clearance_after_contraction: root.formatSmallNumber(
      minHClearance
    ),
    max_h_contraction_width: root.formatSmallNumber(maxHWidth),
    max_abs_Q_G_pair_interval_upper: root.formatSmallNumber(maxAbsQuotient),
    max_abs_Q_D_pair_interval_upper: root.formatSmallNumber(
      maxAbsDerivativeQuotient
    ),
    first_y_cell_taylor_rows_required: firstYCellRows.length,
    status: passed
      ? G_QUOTIENT_CERTIFIED_STATUS
      : "theta3minus-fold-pair-h-graph-positive-y-GD-quotient-cell-cover-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairHGraphGQuotientCellCertificate(
  options = {}
) {
  const speedBreaks = root.makeSpeedBreaks(
    options.speedCellCount ?? root.DEFAULT_SPEED_CELL_COUNT
  );
  const yBreaks = root.parseNumberList(options.yBreaks, root.DEFAULT_Y_BREAKS);
  root.validateYBreaks(yBreaks);
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? root.DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  const hContractionSteps = Number.parseInt(
    options.hContractionSteps ?? DEFAULT_H_CONTRACTION_STEPS,
    10
  );
  if (!Number.isInteger(hContractionSteps) || hContractionSteps < 1) {
    throw new Error("hContractionSteps must be a positive integer");
  }
  const hContractionTargetWidth = Number(
    options.hContractionTargetWidth ?? DEFAULT_H_CONTRACTION_TARGET_WIDTH
  );
  if (
    !Number.isFinite(hContractionTargetWidth) ||
    hContractionTargetWidth <= 0
  ) {
    throw new Error("hContractionTargetWidth must be positive");
  }

  const normalForm =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm({
      speedSamples: speedBreaks,
      ySamples: [0.115, 0.01, 0.001, 0.0005],
      rootSubdivisions,
    });
  const foldRows = normalForm.speed_dependent_fold_normal_form_rows;
  const quotientRows = [];
  const firstYCellRows = [];

  for (let speedIndex = 0; speedIndex < speedBreaks.length - 1; speedIndex += 1) {
    const speedInterval = root.outwardInterval([
      speedBreaks[speedIndex],
      speedBreaks[speedIndex + 1],
    ]);
    const cell = root.foldCellFromEndpointRows({
      leftRow: foldRows[speedIndex],
      rightRow: foldRows[speedIndex + 1],
      speedInterval,
    });
    for (let yIndex = 0; yIndex < yBreaks.length - 1; yIndex += 1) {
      const yInterval = root.outwardInterval([
        yBreaks[yIndex],
        yBreaks[yIndex + 1],
      ]);
      const hContractionRows = Object.keys(root.BRANCH_H_TUBES).map((branch) =>
        contractHRootTube({
          cell,
          yInterval,
          branch,
          hContractionSteps,
          hContractionTargetWidth,
        })
      );
      if (yBreaks[yIndex] === 0) {
        firstYCellRows.push(
          firstYCellDeferredRow({
            speedIndex,
            yIndex,
            speedInterval,
            yInterval,
            hContractionRows,
          })
        );
      } else {
        quotientRows.push(
          quotientRowForCell({
            speedIndex,
            yIndex,
            speedInterval,
            yInterval,
            cell,
            hContractionRows,
          })
        );
      }
    }
  }

  const summary = summarizeRows({ quotientRows, firstYCellRows });
  const passed = summary.status === G_QUOTIENT_CERTIFIED_STATUS;

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_H_GRAPH_G_QUOTIENT_CELL_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.md",
    ],
    priority_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-h-graph-g-quotient-cell-certificate.md",
    certificate_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: root.SPEED_RATIO_ENCLOSURE,
      speed_cell_count: speedBreaks.length - 1,
      speed_ratio_cells: speedBreaks.map(root.formatSmallNumber),
      y_interval_hull: [0, 0.115],
      y_breaks: yBreaks.map(root.formatSmallNumber),
      h_contraction_steps: hContractionSteps,
      h_contraction_target_width: root.formatSmallNumber(
        hContractionTargetWidth
      ),
      branch_h_tubes: root.BRANCH_H_TUBES,
      moving_fold_chart: "theta=theta_3minus(nu)-y^2",
      h_root_graph_chart: "z_epsilon=gamma(nu)+y*h_epsilon",
      G_branch_formula:
        "G_epsilon=4*sigma_star*B_epsilon/(nu*delta_epsilon^2*(-epsilon*J_epsilon)); sigma_star=-1 and the certified J signs supply |J_epsilon|=-epsilon*J_epsilon",
      G_pair_quotient_formula:
        "Q_G_pair=(G_-+G_+-L_cell)/y^2 on cells with y>0",
      D_branch_formula:
        "D_epsilon=4*y^3*sigma_star*(2/nu)*d_theta(B_epsilon/(delta_epsilon^2*|F_delta|)) with the regular implicit source derivative delta_theta=-2*cos(phi)/F_delta; evaluated only on cells with y>0",
      D_pair_quotient_formula:
        "Q_D_pair=(D_-+D_+-L_cell)/y^2 on cells with y>0",
      zero_touching_cell_policy:
        "no raw y^-2 division; first y cells require the Taylor-cancelled S_-+S_+ jet certificate",
      root_subdivisions_for_fold_rows: rootSubdivisions,
    },
    positive_y_G_quotient_rows: quotientRows,
    first_y_cell_deferred_rows: firstYCellRows,
    G_quotient_summary: summary,
    closure_burndown: [
      {
        row: "theta3minus.fold-pair-h-root-graph-cell-cover",
        status: "directed-rounded-cell-cover-certified",
      },
      {
        row: "theta3minus.fold-pair-h-graph-positive-y-GD-quotient",
        status: passed ? "directed-rounded-cell-cover-certified" : "open",
      },
      {
        row: "theta3minus.fold-pair-h-graph-first-y-cell-G-quotient",
        status: "requires-Taylor-cancelled-jet-certificate",
      },
      {
        row: "theta3minus.fold-pair-h-graph-D-quotient",
        status: "requires-implicit-h-graph-jet-certificate",
      },
      {
        row: "theta3minus.fold-pair-scaled-remainder-continuous-collar",
        status: "blocked-by-first-y-cell-GD-jet-certificate",
      },
    ],
    artifact_claim: {
      receiver_normal_eom_evidence_status: "invalidated-by-receiver-normal-master-eom",
      receiver_normal_restart_required: true,
      assumes_fixed_speed_window: false,
      certifies_directed_rounded_fold_pair_h_graph_positive_y_G_quotient_cell_cover:
        passed,
      certifies_directed_rounded_fold_pair_h_graph_positive_y_D_quotient_cell_cover:
        passed,
      certifies_directed_rounded_fold_pair_G_quotient_full_cell_cover: false,
      certifies_directed_rounded_fold_pair_D_quotient_cell_cover: false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_directed_rounded_regular_root_remainder: false,
      certifies_directed_rounded_speed_dependent_fold_normal_form_remainder:
        false,
      certifies_I1_regular_critical_exhaustion: false,
      retained_branch: false,
      claim_level:
        "Directed-rounded positive-y cell-cover certificate for the fold-pair G and D quotients on the certified h-root graph. It avoids raw division on zero-touching cells and leaves first-y-cell Taylor cancellation open.",
    },
    result: {
      theory_status: summary.status,
      first_successor_row:
        "theta3minus.fold-pair-h-graph-first-y-cell-GD-jet-certificate-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The root-geometry blocker has been converted into a quotient certificate: all positive-y cells now have directed-rounded G and D quotient enclosures on certified h-root tubes. The remaining blocker is the first-y-cell Taylor/implicit-jet certificate.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairHGraphGQuotientCellCertificate(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_H_GRAPH_G_QUOTIENT_CELL_CERTIFICATE_SCHEMA,
    "schema must match theta3minus fold-pair h-graph G/D quotient cell certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus fold-pair h-graph G/D quotient packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.certificate_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "G/D quotient certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.certificate_parameters?.speed_band === undefined &&
      artifact?.certificate_parameters?.speed_window === undefined &&
      artifact?.certificate_parameters?.speed_min === undefined &&
      artifact?.certificate_parameters?.speed_max === undefined,
    "G quotient parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.G_quotient_summary?.status === G_QUOTIENT_CERTIFIED_STATUS &&
      artifact?.G_quotient_summary?.positive_y_cell_count === 1008 &&
      artifact?.G_quotient_summary?.first_y_cell_count === 16 &&
      artifact?.G_quotient_summary?.all_positive_y_GD_quotients_certified ===
        true &&
      artifact?.G_quotient_summary?.all_positive_y_G_quotients_certified ===
        true &&
      artifact?.G_quotient_summary?.all_positive_y_D_quotients_certified ===
        true &&
      artifact?.G_quotient_summary?.all_h_contractions_certified === true &&
      artifact?.G_quotient_summary
        ?.no_raw_y_inverse_division_on_zero_touching_cells === true &&
      Number(artifact?.G_quotient_summary?.min_denominator_positive_clearance) >
        0.5 &&
      Number(artifact?.G_quotient_summary?.min_J_clearance) > 0.7 &&
      Number(artifact?.G_quotient_summary?.min_F_delta_clearance) > 0 &&
      Number.isFinite(
        Number(artifact?.G_quotient_summary?.max_abs_Q_G_pair_interval_upper)
      ) &&
      Number.isFinite(
        Number(artifact?.G_quotient_summary?.max_abs_Q_D_pair_interval_upper)
      ),
    "G/D quotient rows must certify positive-y quotients, h contractions, denominator signs, J signs, and zero-cell raw-division exclusion",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_directed_rounded_fold_pair_h_graph_positive_y_G_quotient_cell_cover ===
      true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_fold_pair_G_quotient_full_cell_cover ===
        false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_fold_pair_h_graph_positive_y_D_quotient_cell_cover ===
        true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_fold_pair_D_quotient_cell_cover === false &&
      artifact?.artifact_claim?.certifies_directed_rounded_fold_pair_scaled_remainder ===
        false &&
      artifact?.artifact_claim?.certifies_directed_rounded_regular_root_remainder ===
        false &&
      artifact?.artifact_claim?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact claim must keep full G, D, remainder, I1 closure, and retention open",
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
    } else if (arg === "--y-breaks") {
      options.yBreaks = argv[++index];
    } else if (arg === "--root-subdivisions") {
      options.rootSubdivisions = argv[++index];
    } else if (arg === "--h-contraction-steps") {
      options.hContractionSteps = argv[++index];
    } else if (arg === "--h-contraction-target-width") {
      options.hContractionTargetWidth = argv[++index];
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-h-graph-g-quotient-cell-certificate.mjs [options]",
    "",
    "Options:",
    "  --out <path>                         Write artifact JSON",
    "  --validate <path>                    Validate an artifact JSON",
    "  --schema                             Print artifact schema metadata",
    "  --speed-cell-count <count>           Number of speed cells covering [3.02156,3.02157]",
    "  --y-breaks <csv>                     Increasing y-cell breakpoints from 0 to 0.115",
    "  --root-subdivisions <count>          Root subdivisions passed to the normal-form predecessor",
    "  --h-contraction-steps <count>        Bisection steps for the h-root graph",
    "  --h-contraction-target-width <width> Stop h bisection at this interval width",
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
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_H_GRAPH_G_QUOTIENT_CELL_CERTIFICATE_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairHGraphGQuotientCellCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  const artifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairHGraphGQuotientCellCertificate(
      options
    );
  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairHGraphGQuotientCellCertificate(
      artifact
    );
  if (errors.length > 0) {
    console.error(JSON.stringify({ valid: false, errors }, null, 2));
    process.exitCode = 1;
    return;
  }
  const output = `${JSON.stringify(artifact, null, 2)}\n`;
  if (options.out) {
    fs.mkdirSync(path.dirname(options.out), { recursive: true });
    fs.writeFileSync(options.out, output);
  } else {
    process.stdout.write(output);
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  main();
}
