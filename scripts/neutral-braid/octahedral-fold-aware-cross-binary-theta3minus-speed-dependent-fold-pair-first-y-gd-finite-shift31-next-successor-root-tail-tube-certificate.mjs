#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift29SuccessorRootTailTubeCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift29SuccessorRootTailTubeCertificate,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-shift29-successor-root-tail-tube-certificate.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySixthOrderPostUSuccessorCoefficientCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySixthOrderPostUSuccessorCoefficientCertificate,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-sixth-order-post-u-successor-coefficient-certificate.mjs";
import {
  theta3minusFoldPairScaledRootTubeCellInternals as root,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_SHIFT31_NEXT_SUCCESSOR_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-shift31-next-successor-root-tail-tube-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_finite_shift31_next_successor_root_tail_tube_certificate";
const PROMOTION_STATUS = "priority-only";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const FIRST_Y_CELL_UPPER = 0.115 / 64;
const SPEED_CELL_COUNT = 128;
const DEFAULT_Y_SUBCELL_COUNT = 16;
const DEFAULT_W_TUBE_PADDING = 1e18;
const DEFAULT_Z_PREDECESSOR_TUBE_PADDING = 1e16;
const SHIFT_POWER = 31;
const SERIES_ORDER = 60;
const CERTIFIED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-finite-shift31-next-successor-root-tail-tube-certified";
const ROW_CERTIFIED_STATUS =
  "finite-shift31-next-successor-root-tail-tube-certified";

const FACTORIALS = Array.from({ length: SERIES_ORDER + 2 }, (_, index) => {
  if (index === 0) {
    return 1;
  }
  return null;
});
for (let index = 1; index < FACTORIALS.length; index += 1) {
  FACTORIALS[index] = FACTORIALS[index - 1] * index;
}

function zeros() {
  return Array.from({ length: SERIES_ORDER + 1 }, () => [0, 0]);
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

function sinSeries(series) {
  const center = series[0];
  const nilpotent = [...series];
  nilpotent[0] = [0, 0];
  let power = constant(1);
  let sum = zeros();
  for (let order = 0; order <= SERIES_ORDER; order += 1) {
    sum = add(
      sum,
      scaleByInterval(
        power,
        root.scaleInterval(
          sinDerivativeInterval(center, order),
          1 / FACTORIALS[order]
        )
      )
    );
    power = multiply(power, nilpotent);
  }
  return sum;
}

function numericInterval(interval) {
  return interval.map(Number);
}

function hFieldName(index) {
  return `h${index}_interval`;
}

function containsZero([left, right]) {
  return left <= 0 && right >= 0;
}

function coefficientHull(intervals) {
  return root.formatInterval([
    Math.min(...intervals.map(([left]) => left)),
    Math.max(...intervals.map(([, right]) => right)),
  ]);
}

function maxAbsInterval([left, right]) {
  return Math.max(Math.abs(left), Math.abs(right));
}

function maxField(rows, fieldName) {
  return Math.max(...rows.map((row) => Number(row[fieldName])));
}

function minField(rows, fieldName) {
  return Math.min(...rows.map((row) => Number(row[fieldName])));
}

function validateYSubcellCount(value) {
  const count = Number.parseInt(value, 10);
  if (!Number.isInteger(count) || count < 4 || count > 256) {
    throw new Error("ySubcellCount must be an integer in [4,256]");
  }
  return count;
}

function validateWTubePadding(value) {
  const padding = Number(value);
  if (!Number.isFinite(padding) || padding <= 0) {
    throw new Error("wTubePadding must be a positive finite number");
  }
  return padding;
}

function validateZPredecessorTubePadding(value) {
  const padding = Number(value);
  if (!Number.isFinite(padding) || padding <= 0) {
    throw new Error("zPredecessorTubePadding must be a positive finite number");
  }
  return padding;
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
      root.multiplyIntervals(
        numericInterval(branchRow[hFieldName(index)]),
        power
      )
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

function hIntervalsThroughTwentySixWithW(branchRow, wInterval) {
  const hIntervals = [];
  for (let index = 0; index <= 26; index += 1) {
    hIntervals[index] = numericInterval(branchRow[hFieldName(index)]);
  }
  hIntervals[27] = wInterval;
  return hIntervals;
}

function wTubeEndpointIntervals(padding) {
  return {
    left: root.pointInterval(-padding),
    right: root.pointInterval(padding),
    tube: root.outwardInterval([-padding, padding]),
    seed: [0, 0],
  };
}

function zPredecessorTubeInterval(branchRow, padding) {
  const seed = numericInterval(branchRow.h25_interval);
  return {
    tube: root.outwardInterval([seed[0] - padding, seed[1] + padding]),
    seed,
  };
}

function zImageFromWTube({ branchRow, yInterval, wInterval }) {
  return root.addIntervals(
    root.addIntervals(
      numericInterval(branchRow.h25_interval),
      root.multiplyIntervals(
        yInterval,
        numericInterval(branchRow.h26_interval)
      )
    ),
    root.multiplyIntervals(root.positivePowerInterval(yInterval, 2), wInterval)
  );
}

function intervalInside(inner, outer) {
  return inner[0] >= outer[0] && inner[1] <= outer[1];
}

function expectedEndpointSigns(branch) {
  if (branch === "-") {
    return { left: "-", right: "+", derivative: "+" };
  }
  return { left: "+", right: "-", derivative: "-" };
}

function sourceEquationSeries({ cell, branchSign, hIntervals }) {
  const delta = constant(cell.delta_fold_interval);
  delta[1] = root.scaleInterval(cell.beta_interval, branchSign);
  delta[2] = cell.gamma_interval;

  const phi = constant(cell.phi_fold_interval);
  phi[1] = root.scaleInterval(cell.beta_interval, -branchSign);
  phi[2] = root.scaleInterval(root.addIntervals(cell.gamma_interval, [2, 2]), -1);

  hIntervals.forEach((hInterval, index) => {
    delta[index + 3] = hInterval;
    phi[index + 3] = root.scaleInterval(hInterval, -1);
  });

  return add(
    add(
      scaleByInterval(
        multiply(delta, delta),
        root.inverseSpeedSquaredInterval(cell.speed_interval)
      ),
      constant(-2)
    ),
    add(sinSeries(phi), sinSeries(delta))
  );
}

function evaluateShiftedSeries(coefficients, yInterval) {
  let sum = [0, 0];
  let power = [1, 1];
  for (let index = SHIFT_POWER; index <= SERIES_ORDER; index += 1) {
    sum = root.addIntervals(
      sum,
      root.multiplyIntervals(coefficients[index], power)
    );
    power = root.multiplyIntervals(power, yInterval);
  }
  return sum;
}

function branchArgumentIntervals({ cell, yInterval, branchRow, wInterval, sign }) {
  const hInterval = hWithWInterval({ branchRow, yInterval, wInterval });
  const s = root.scaleInterval(cell.beta_interval, sign);
  const z = root.addIntervals(
    cell.gamma_interval,
    root.multiplyIntervals(yInterval, hInterval)
  );
  const r = root.addIntervals(s, root.multiplyIntervals(yInterval, z));
  const q = root.addIntervals(r, root.scaleInterval(yInterval, 2));
  return {
    delta_argument: root.multiplyIntervals(yInterval, r),
    phi_argument: root.scaleInterval(root.multiplyIntervals(yInterval, q), -1),
  };
}

function shiftedTrigRemainderInterval({
  cell,
  yInterval,
  branchRow,
  wInterval,
  sign,
}) {
  const { delta_argument: deltaArgument, phi_argument: phiArgument } =
    branchArgumentIntervals({ cell, yInterval, branchRow, wInterval, sign });
  const deltaBound = maxAbsInterval(deltaArgument);
  const phiBound = maxAbsInterval(phiArgument);
  const unshiftedRemainder =
    (deltaBound ** (SERIES_ORDER + 1) + phiBound ** (SERIES_ORDER + 1)) /
    FACTORIALS[SERIES_ORDER + 1];
  const shiftedRemainder = unshiftedRemainder / yInterval[0] ** SHIFT_POWER;
  return root.outwardInterval([-shiftedRemainder, shiftedRemainder]);
}

function shiftedEndpointInterval({
  coefficients,
  cell,
  yInterval,
  branchRow,
  wInterval,
  sign,
}) {
  return root.addIntervals(
    evaluateShiftedSeries(coefficients, yInterval),
    shiftedTrigRemainderInterval({
      cell,
      yInterval,
      branchRow,
      wInterval,
      sign,
    })
  );
}

function lowerShiftCoefficients(tubeCoefficients) {
  return tubeCoefficients.slice(0, SHIFT_POWER);
}

function finiteShift31Row({
  speedIndex,
  yIndex,
  yInterval,
  branchRow,
  cell,
  wTubePadding,
  zPredecessorTubePadding,
  leftCoefficients,
  rightCoefficients,
  lowerCoefficients,
}) {
  const expected = expectedEndpointSigns(branchRow.branch);
  const sign = root.branchSign(branchRow.branch);
  const endpoints = wTubeEndpointIntervals(wTubePadding);
  const zPredecessor = zPredecessorTubeInterval(
    branchRow,
    zPredecessorTubePadding
  );
  const leftR = shiftedEndpointInterval({
    coefficients: leftCoefficients,
    cell,
    yInterval,
    branchRow,
    wInterval: endpoints.left,
    sign,
  });
  const rightR = shiftedEndpointInterval({
    coefficients: rightCoefficients,
    cell,
    yInterval,
    branchRow,
    wInterval: endpoints.right,
    sign,
  });
  const tubeH = hWithWInterval({
    branchRow,
    yInterval,
    wInterval: endpoints.tube,
  });
  const zImage = zImageFromWTube({
    branchRow,
    yInterval,
    wInterval: endpoints.tube,
  });
  const zImageInsidePredecessorTube = intervalInside(
    zImage,
    zPredecessor.tube
  );
  const zInterval = root.addIntervals(
    cell.gamma_interval,
    root.multiplyIntervals(yInterval, tubeH)
  );
  const jInterval = root.scaledJInterval({
    cell,
    yInterval,
    zInterval,
    sign,
  });
  const leftSign = root.intervalSignAndClearance(leftR);
  const rightSign = root.intervalSignAndClearance(rightR);
  const jSign = root.intervalSignAndClearance(jInterval);
  const endpointSignsCertified =
    leftSign.sign === expected.left && rightSign.sign === expected.right;
  const derivativeCertified = jSign.sign === expected.derivative;
  const lowerContainsZero = lowerCoefficients.every(containsZero);
  const leftRemainder = shiftedTrigRemainderInterval({
    cell,
    yInterval,
    branchRow,
    wInterval: endpoints.left,
    sign,
  });
  const rightRemainder = shiftedTrigRemainderInterval({
    cell,
    yInterval,
    branchRow,
    wInterval: endpoints.right,
    sign,
  });
  const endpointClearance = Math.min(leftSign.clearance, rightSign.clearance);
  const rowCertified =
    endpointSignsCertified &&
    derivativeCertified &&
    lowerContainsZero &&
    zImageInsidePredecessorTube;
  return {
    cell_id: `speed.${speedIndex}.first-y-positive.${yIndex}.${branchRow.branch}`,
    speed_cell_id: `speed.${speedIndex}`,
    positive_y_subcell_index: yIndex,
    branch: branchRow.branch,
    y_interval: root.formatInterval(yInterval),
    W_tube_center_interval: root.formatInterval(endpoints.seed),
    W_tube_interval: root.formatInterval(endpoints.tube),
    W_tube_abs_upper: root.formatSmallNumber(maxAbsInterval(endpoints.tube)),
    Z_predecessor_seed_interval: root.formatInterval(zPredecessor.seed),
    Z_predecessor_tube_interval: root.formatInterval(zPredecessor.tube),
    Z_image_from_W_tube_interval: root.formatInterval(zImage),
    Z_image_from_W_tube_inside_predecessor_tube:
      zImageInsidePredecessorTube,
    shift_power: SHIFT_POWER,
    shift_series_order: SERIES_ORDER,
    lower_shift_coefficients_y0_to_y30: lowerCoefficients.map(root.formatInterval),
    lower_shift_coefficients_contain_zero_y0_to_y30: lowerContainsZero,
    max_abs_lower_shift_residual_y0_to_y30: root.formatSmallNumber(
      Math.max(...lowerCoefficients.map(maxAbsInterval))
    ),
    R_shift31_left_endpoint_interval: root.formatInterval(leftR),
    R_shift31_left_endpoint_sign: leftSign.sign,
    R_shift31_left_endpoint_clearance: root.formatSmallNumber(leftSign.clearance),
    R_shift31_right_endpoint_interval: root.formatInterval(rightR),
    R_shift31_right_endpoint_sign: rightSign.sign,
    R_shift31_right_endpoint_clearance: root.formatSmallNumber(
      rightSign.clearance
    ),
    R_shift31_endpoint_min_clearance:
      root.formatSmallNumber(endpointClearance),
    R_shift31_endpoint_signs_certified: endpointSignsCertified,
    partial_W_R_shift31_interval: root.formatInterval(jInterval),
    partial_W_R_shift31_sign: jSign.sign,
    partial_W_R_shift31_clearance: root.formatSmallNumber(jSign.clearance),
    partial_W_R_shift31_sign_certified: derivativeCertified,
    shift31_trig_remainder_interval_hull: root.formatInterval([
      Math.min(leftRemainder[0], rightRemainder[0]),
      Math.max(leftRemainder[1], rightRemainder[1]),
    ]),
    max_abs_shift31_trig_remainder: root.formatSmallNumber(
      Math.max(maxAbsInterval(leftRemainder), maxAbsInterval(rightRemainder))
    ),
    shift31_coefficient_shift_used: true,
    shift31_raw_y_inverse_division_used: false,
    zero_touching_y_division_used: false,
    finite_shift31_W_root_tail_tube_certified: rowCertified,
    row_status: rowCertified
      ? ROW_CERTIFIED_STATUS
      : "finite-shift31-next-successor-root-tail-tube-open",
  };
}

function buildRows({
  seedArtifact,
  ySubcellCount,
  wTubePadding,
  zPredecessorTubePadding,
}) {
  const rows = [];
  seedArtifact.twenty_sixth_order_post_u_successor_coefficient_rows.forEach(
    (seedRow, speedIndex) => {
      const cell = cellFromSeedRow(seedRow);
      seedRow.branch_rows.forEach((branchRow) => {
        const sign = root.branchSign(branchRow.branch);
        const endpoints = wTubeEndpointIntervals(wTubePadding);
        const leftCoefficients = sourceEquationSeries({
          cell,
          branchSign: sign,
          hIntervals: hIntervalsThroughTwentySixWithW(
            branchRow,
            endpoints.left
          ),
        });
        const rightCoefficients = sourceEquationSeries({
          cell,
          branchSign: sign,
          hIntervals: hIntervalsThroughTwentySixWithW(
            branchRow,
            endpoints.right
          ),
        });
        const tubeCoefficients = sourceEquationSeries({
          cell,
          branchSign: sign,
          hIntervals: hIntervalsThroughTwentySixWithW(
            branchRow,
            endpoints.tube
          ),
        });
        const lowerCoefficients = lowerShiftCoefficients(tubeCoefficients);
        for (let yIndex = 1; yIndex < ySubcellCount; yIndex += 1) {
          const yInterval = root.outwardInterval([
            (FIRST_Y_CELL_UPPER * yIndex) / ySubcellCount,
            (FIRST_Y_CELL_UPPER * (yIndex + 1)) / ySubcellCount,
          ]);
          rows.push(
            finiteShift31Row({
              speedIndex,
              yIndex,
              yInterval,
              branchRow,
              cell,
              wTubePadding,
              zPredecessorTubePadding,
              leftCoefficients,
              rightCoefficients,
              lowerCoefficients,
            })
          );
        }
      });
    }
  );
  return rows;
}

function summarizeRows({
  rows,
  seedArtifact,
  predecessorArtifact,
  ySubcellCount,
  wTubePadding,
  zPredecessorTubePadding,
}) {
  const seedErrors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySixthOrderPostUSuccessorCoefficientCertificate(
      seedArtifact
    );
  const predecessorErrors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift29SuccessorRootTailTubeCertificate(
      predecessorArtifact
    );
  const allRowsCertified = rows.every((row) => row.row_status === ROW_CERTIFIED_STATUS);
  const allLowerContainZero = rows.every(
    (row) => row.lower_shift_coefficients_contain_zero_y0_to_y30 === true
  );
  const allEndpointSigns = rows.every(
    (row) => row.R_shift31_endpoint_signs_certified === true
  );
  const allDerivativeSigns = rows.every(
    (row) => row.partial_W_R_shift31_sign_certified === true
  );
  const allCoefficientShift = rows.every(
    (row) => row.shift31_coefficient_shift_used === true
  );
  const allZImagesInsidePredecessorTube = rows.every(
    (row) => row.Z_image_from_W_tube_inside_predecessor_tube === true
  );
  const allNoRawDivision = rows.every(
    (row) =>
      row.shift31_raw_y_inverse_division_used === false &&
      row.zero_touching_y_division_used === false
  );
  const allTubesCertified = rows.every(
    (row) => row.finite_shift31_W_root_tail_tube_certified === true
  );
  const passed =
    seedErrors.length === 0 &&
    predecessorErrors.length === 0 &&
    allRowsCertified &&
    allLowerContainZero &&
    allEndpointSigns &&
    allDerivativeSigns &&
    allZImagesInsidePredecessorTube &&
    allCoefficientShift &&
    allNoRawDivision &&
    allTubesCertified;
  return {
    speed_cell_count: SPEED_CELL_COUNT,
    branch_count: 2,
    first_y_cell: [0, root.formatSmallNumber(FIRST_Y_CELL_UPPER)],
    y_subcell_count: ySubcellCount,
    positive_y_subcell_count: ySubcellCount - 1,
    shift_power: SHIFT_POWER,
    shift_series_order: SERIES_ORDER,
    lower_shift_coefficient_count: SHIFT_POWER,
    finite_shift31_row_count: rows.length,
    W_tube_padding: root.formatSmallNumber(wTubePadding),
    Z_predecessor_tube_padding: root.formatSmallNumber(
      zPredecessorTubePadding
    ),
    h26_seed_artifact_valid: seedErrors.length === 0,
    h26_seed_validation_errors: seedErrors,
    finite_shift29_predecessor_artifact_valid: predecessorErrors.length === 0,
    finite_shift29_predecessor_validation_errors: predecessorErrors,
    all_rows_certified: allRowsCertified,
    all_lower_shift_coefficients_contain_zero_y0_to_y30: allLowerContainZero,
    all_shift31_endpoint_signs_certified: allEndpointSigns,
    all_partial_W_R_shift31_signs_certified: allDerivativeSigns,
    all_Z_images_from_W_tube_inside_predecessor_tube:
      allZImagesInsidePredecessorTube,
    all_rows_use_coefficient_shift: allCoefficientShift,
    all_rows_avoid_raw_y_inverse_division: allNoRawDivision,
    all_finite_shift31_W_root_tail_tubes_certified: allTubesCertified,
    min_shift31_endpoint_clearance: root.formatSmallNumber(
      minField(rows, "R_shift31_endpoint_min_clearance")
    ),
    min_partial_W_R_shift31_clearance: root.formatSmallNumber(
      minField(rows, "partial_W_R_shift31_clearance")
    ),
    max_W_tube_abs_upper: root.formatSmallNumber(
      maxField(rows, "W_tube_abs_upper")
    ),
    max_Z_image_from_W_tube_abs_upper: root.formatSmallNumber(
      Math.max(
        ...rows.map((row) =>
          maxAbsInterval(numericInterval(row.Z_image_from_W_tube_interval))
        )
      )
    ),
    max_abs_lower_shift_residual_y0_to_y30: root.formatSmallNumber(
      maxField(rows, "max_abs_lower_shift_residual_y0_to_y30")
    ),
    max_abs_shift31_trig_remainder: root.formatSmallNumber(
      maxField(rows, "max_abs_shift31_trig_remainder")
    ),
    R_shift31_left_endpoint_interval_hull: coefficientHull(
      rows.map((row) => numericInterval(row.R_shift31_left_endpoint_interval))
    ),
    R_shift31_right_endpoint_interval_hull: coefficientHull(
      rows.map((row) => numericInterval(row.R_shift31_right_endpoint_interval))
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
    inherited_shift29_min_endpoint_clearance:
      predecessorArtifact.finite_shift29_successor_root_tail_tube_summary
        .min_shift29_endpoint_clearance,
    inherited_shift29_min_partial_Z_R_clearance:
      predecessorArtifact.finite_shift29_successor_root_tail_tube_summary
        .min_partial_Z_R_shift29_clearance,
    status: passed
      ? CERTIFIED_STATUS
      : "theta3minus-fold-pair-first-y-GD-finite-shift31-next-successor-root-tail-tube-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift31NextSuccessorRootTailTubeCertificate(
  options = {}
) {
  const ySubcellCount = validateYSubcellCount(
    options.ySubcellCount ?? DEFAULT_Y_SUBCELL_COUNT
  );
  const wTubePadding = validateWTubePadding(
    options.wTubePadding ?? DEFAULT_W_TUBE_PADDING
  );
  const zPredecessorTubePadding = validateZPredecessorTubePadding(
    options.zPredecessorTubePadding ?? DEFAULT_Z_PREDECESSOR_TUBE_PADDING
  );
  const seedArtifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySixthOrderPostUSuccessorCoefficientCertificate();
  const predecessorArtifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift29SuccessorRootTailTubeCertificate();
  const rows = buildRows({
    seedArtifact,
    ySubcellCount,
    wTubePadding,
    zPredecessorTubePadding,
  });
  const summary = summarizeRows({
    rows,
    seedArtifact,
    predecessorArtifact,
    ySubcellCount,
    wTubePadding,
    zPredecessorTubePadding,
  });
  const passed = summary.status === CERTIFIED_STATUS;
  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_SHIFT31_NEXT_SUCCESSOR_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-shift29-successor-root-tail-tube-certificate.md",
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-sixth-order-post-u-successor-coefficient-certificate.md",
    ],
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-shift31-next-successor-root-tail-tube-certificate.md",
    finite_shift31_next_successor_root_tail_tube_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: root.SPEED_RATIO_ENCLOSURE,
      speed_cell_count: SPEED_CELL_COUNT,
      first_y_cell: [0, root.formatSmallNumber(FIRST_Y_CELL_UPPER)],
      y_subcell_count: ySubcellCount,
      positive_y_subcell_count: ySubcellCount - 1,
      shift_power: SHIFT_POWER,
      shift_series_order: SERIES_ORDER,
      W_tube_padding: root.formatSmallNumber(wTubePadding),
      Z_predecessor_tube_padding: root.formatSmallNumber(
        zPredecessorTubePadding
      ),
      W_tube_definition:
        "W_tube=[-padding,padding] for the next successor coordinate after the certified h26 coefficient",
      root_tail_chart:
        "h_epsilon(y,nu)=h_{epsilon,<=26}(y,nu)+y^27*W_epsilon(y,nu)",
      Z_predecessor_image_policy:
        "the induced Z=h25+y*h26+y^2*W_tube image is interval-certified inside the predecessor finite Shift29 Z tube on every positive-y subcell",
      shifted_residual:
        "R_epsilon,31(y,W,nu)=Shift_31(F_epsilon(y,h_{<=26}+y^27*W,nu))",
      coefficient_shift_policy:
        "lower coefficients y0 through y30 are dropped only after interval containment of zero; no raw division by a zero-touching y interval is used",
      finite_positive_y_policy:
        "positive first-y subcells are certified by endpoint signs and the shifted derivative partial_W R=J; the y=0 h26 endpoint is inherited as the predecessor Z derivative rather than as an h27 coefficient solve",
    },
    finite_shift31_next_successor_root_tail_tube_rows: rows,
    finite_shift31_next_successor_root_tail_tube_summary: summary,
    closure_burndown: [
      {
        row: "theta3minus.fold-pair-first-y-GD-finite-shift29-successor-root-tail-tube",
        status: "directed-rounded-positive-y-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-twenty-sixth-order-post-U-successor-coefficient",
        status: "directed-rounded-interval-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-finite-shift31-next-successor-root-tail-tube",
        status: passed ? "directed-rounded-positive-y-certified" : "open",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-twenty-seventh-order-tail-bound",
        status: "directed-rounded-open",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure",
        status: "blocked-by-twenty-seventh-order-tail-bound",
      },
      {
        row: "theta3minus.fold-pair-scaled-remainder-continuous-collar",
        status: "blocked-by-directed-rounded-first-y-GD-enclosure",
      },
    ],
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_shift_31_finite_y_residual_w_evaluator: passed,
      certifies_directed_rounded_first_y_GD_finite_shift31_W_root_tail_tube_positive_y:
        passed,
      certifies_h26_imported_next_successor_chart: true,
      certifies_predecessor_Z_tube_containment: passed,
      certifies_directed_rounded_first_y_GD_finite_next_successor_root_tail_tube:
        passed,
      certifies_directed_rounded_first_y_GD_continuous_next_successor_tail_bound:
        false,
      certifies_directed_rounded_first_y_GD_finite_remainder_bound: false,
      certifies_directed_rounded_first_y_GD_jet_enclosure: false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_directed_rounded_first_y_GD_quadrature: false,
      retained_branch: false,
      claim_level:
        "Directed-rounded coefficient-shifted finite-y Shift_31 residual evaluator for the next-successor W_epsilon root-tail tube on positive first-y subcells, using h_{<=26}+y^27 W, with endpoint signs, partial_W R=J signs, and predecessor Z_epsilon-tube containment certified over the no-fixed-speed-window speed cover. It closes only the finite next-successor root-tail tube row; the continuous twenty-seventh-order quotient-tail bound, full quotient enclosure, scaled remainder, I1 closure, quadrature, and retained branch status remain open.",
    },
    result: {
      theory_status: summary.status,
      first_successor_row:
        "theta3minus.fold-pair-first-y-GD-twenty-seventh-order-tail-bound-directed-rounded-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The finite W_epsilon next-successor root-tail tube is certified on the positive first-y subcells by the coefficient-shifted Shift_31 evaluator after importing h26. The remaining first-y blocker is the continuous twenty-seventh-order quotient-tail bound needed for the full directed-rounded first-y enclosure.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift31NextSuccessorRootTailTubeCertificate(
  artifact
) {
  const errors = [];
  const summary = artifact?.finite_shift31_next_successor_root_tail_tube_summary;
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_SHIFT31_NEXT_SUCCESSOR_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA,
    "schema must match theta3minus fold-pair first-y G/D finite Shift31 next-successor root-tail tube certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus fold-pair first-y G/D finite Shift31 next-successor root-tail tube packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.finite_shift31_next_successor_root_tail_tube_parameters
      ?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "finite Shift31 next-successor root-tail tube certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.finite_shift31_next_successor_root_tail_tube_parameters
      ?.speed_band === undefined &&
      artifact?.finite_shift31_next_successor_root_tail_tube_parameters
        ?.speed_window === undefined &&
      artifact?.finite_shift31_next_successor_root_tail_tube_parameters
        ?.speed_min === undefined &&
      artifact?.finite_shift31_next_successor_root_tail_tube_parameters
        ?.speed_max === undefined,
    "finite Shift31 next-successor root-tail tube parameters must not contain speed-band fields",
    errors
  );
  assertField(
    summary?.status === CERTIFIED_STATUS &&
      summary?.speed_cell_count === SPEED_CELL_COUNT &&
      summary?.finite_shift31_row_count ===
        SPEED_CELL_COUNT * 2 * (summary?.positive_y_subcell_count ?? 0) &&
      summary?.shift_power === SHIFT_POWER &&
      summary?.shift_series_order === SERIES_ORDER &&
      summary?.h26_seed_artifact_valid === true &&
      summary?.finite_shift29_predecessor_artifact_valid === true &&
      summary?.all_rows_certified === true &&
      summary?.all_lower_shift_coefficients_contain_zero_y0_to_y30 === true &&
      summary?.all_shift31_endpoint_signs_certified === true &&
      summary?.all_partial_W_R_shift31_signs_certified === true &&
      summary?.all_Z_images_from_W_tube_inside_predecessor_tube === true &&
      summary?.all_rows_use_coefficient_shift === true &&
      summary?.all_rows_avoid_raw_y_inverse_division === true &&
      summary?.all_finite_shift31_W_root_tail_tubes_certified === true &&
      Number(summary?.min_shift31_endpoint_clearance) > 7.8e17 &&
      Number(summary?.min_partial_W_R_shift31_clearance) > 0.79 &&
      Number(summary?.max_abs_shift31_trig_remainder) < 1e-100 &&
      Number(
        summary?.inherited_min_Q_G_remaining_twenty_seventh_order_tail_budget
      ) > 1e73 &&
      Number(
        summary?.inherited_min_Q_D_remaining_twenty_seventh_order_tail_budget
      ) > 1e73,
    "finite Shift31 rows must certify shifted endpoint signs, shifted derivative signs, lower coefficient containment, predecessor Z containment, no raw y division, and inherited h26 budgets",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_shift_31_finite_y_residual_w_evaluator ===
      true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_finite_shift31_W_root_tail_tube_positive_y ===
        true &&
      artifact?.artifact_claim?.certifies_h26_imported_next_successor_chart ===
        true &&
      artifact?.artifact_claim?.certifies_predecessor_Z_tube_containment ===
        true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_finite_next_successor_root_tail_tube ===
        true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_continuous_next_successor_tail_bound ===
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
    "artifact claim must certify only the finite Shift31 next-successor tube and keep continuous quotient tail, full quotient, scaled remainder, I1, quadrature, and retention open",
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
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-shift31-next-successor-root-tail-tube-certificate.mjs [options]",
    "",
    "Options:",
    "  --out <path>                       Write artifact JSON",
    "  --validate <path>                  Validate an artifact JSON",
    "  --schema                           Print artifact schema metadata",
    "  --y-subcell-count <count>          Positive-y diagnostic subcell count",
    "  --w-tube-padding <value>           Symmetric padding for the W next-successor tube",
    "  --z-predecessor-tube-padding <value>",
    "                                     Padding around each predecessor h25 Z seed interval",
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
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_SHIFT31_NEXT_SUCCESSOR_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift31NextSuccessorRootTailTubeCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  try {
    const artifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift31NextSuccessorRootTailTubeCertificate(
        options
      );
    const errors =
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift31NextSuccessorRootTailTubeCertificate(
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
