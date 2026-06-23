#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyThirdOrderUSeedCoefficientCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyThirdOrderUSeedCoefficientCertificate,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-third-order-u-seed-coefficient-certificate.mjs";
import {
  theta3minusFoldPairScaledRootTubeCellInternals as root,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_SHIFT27_U_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-shift27-u-root-tail-tube-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_finite_shift27_u_root_tail_tube_certificate";
const PROMOTION_STATUS = "priority-only";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const FIRST_Y_CELL_UPPER = 0.115 / 64;
const SPEED_CELL_COUNT = 128;
const DEFAULT_Y_SUBCELL_COUNT = 16;
const DEFAULT_U_TUBE_PADDING = 1e16;
const DEFAULT_E_PREDECESSOR_TUBE_PADDING = 1e16;
const SHIFT_POWER = 27;
const SERIES_ORDER = 52;
const CERTIFIED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-finite-shift27-U-root-tail-tube-certified";
const ROW_CERTIFIED_STATUS =
  "finite-shift27-U-root-tail-tube-certified";

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

function validateUTubePadding(value) {
  const padding = Number(value);
  if (!Number.isFinite(padding) || padding <= 0) {
    throw new Error("uTubePadding must be a positive finite number");
  }
  return padding;
}

function validateEPredecessorTubePadding(value) {
  const padding = Number(value);
  if (!Number.isFinite(padding) || padding <= 0) {
    throw new Error("ePredecessorTubePadding must be a positive finite number");
  }
  return padding;
}

function hPolynomialThroughTwentyTwo(branchRow, yInterval) {
  let sum = [0, 0];
  let power = [1, 1];
  for (let index = 0; index <= 22; index += 1) {
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

function hWithUInterval({ branchRow, yInterval, uInterval }) {
  return root.addIntervals(
    hPolynomialThroughTwentyTwo(branchRow, yInterval),
    root.multiplyIntervals(root.positivePowerInterval(yInterval, 23), uInterval)
  );
}

function hIntervalsThroughTwentyTwoWithU(branchRow, uInterval) {
  const hIntervals = [];
  for (let index = 0; index <= 22; index += 1) {
    hIntervals[index] = numericInterval(branchRow[hFieldName(index)]);
  }
  hIntervals[23] = uInterval;
  return hIntervals;
}

function uTubeEndpointIntervals(branchRow, padding) {
  const seed = numericInterval(branchRow.h23_interval);
  return {
    left: root.pointInterval(seed[0] - padding),
    right: root.pointInterval(seed[1] + padding),
    tube: root.outwardInterval([seed[0] - padding, seed[1] + padding]),
    seed,
  };
}

function ePredecessorTubeInterval(branchRow, padding) {
  const seed = numericInterval(branchRow.h21_interval);
  return {
    tube: root.outwardInterval([seed[0] - padding, seed[1] + padding]),
    seed,
  };
}

function eImageFromUTube({ branchRow, yInterval, uInterval }) {
  return root.addIntervals(
    numericInterval(branchRow.h21_interval),
    root.multiplyIntervals(yInterval, numericInterval(branchRow.h22_interval)),
    root.multiplyIntervals(root.positivePowerInterval(yInterval, 2), uInterval)
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

function branchArgumentIntervals({ cell, yInterval, branchRow, uInterval, sign }) {
  const hInterval = hWithUInterval({ branchRow, yInterval, uInterval });
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
  uInterval,
  sign,
}) {
  const { delta_argument: deltaArgument, phi_argument: phiArgument } =
    branchArgumentIntervals({ cell, yInterval, branchRow, uInterval, sign });
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
  uInterval,
  sign,
}) {
  return root.addIntervals(
    evaluateShiftedSeries(coefficients, yInterval),
    shiftedTrigRemainderInterval({
      cell,
      yInterval,
      branchRow,
      uInterval,
      sign,
    })
  );
}

function lowerShiftCoefficients(tubeCoefficients) {
  return tubeCoefficients.slice(0, SHIFT_POWER);
}

function finiteShift27Row({
  speedIndex,
  yIndex,
  yInterval,
  branchRow,
  cell,
  uTubePadding,
  ePredecessorTubePadding,
  leftCoefficients,
  rightCoefficients,
  lowerCoefficients,
}) {
  const expected = expectedEndpointSigns(branchRow.branch);
  const sign = root.branchSign(branchRow.branch);
  const endpoints = uTubeEndpointIntervals(branchRow, uTubePadding);
  const ePredecessor = ePredecessorTubeInterval(
    branchRow,
    ePredecessorTubePadding
  );
  const leftR = shiftedEndpointInterval({
    coefficients: leftCoefficients,
    cell,
    yInterval,
    branchRow,
    uInterval: endpoints.left,
    sign,
  });
  const rightR = shiftedEndpointInterval({
    coefficients: rightCoefficients,
    cell,
    yInterval,
    branchRow,
    uInterval: endpoints.right,
    sign,
  });
  const tubeH = hWithUInterval({
    branchRow,
    yInterval,
    uInterval: endpoints.tube,
  });
  const eImage = eImageFromUTube({
    branchRow,
    yInterval,
    uInterval: endpoints.tube,
  });
  const eImageInsidePredecessorTube = intervalInside(
    eImage,
    ePredecessor.tube
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
    uInterval: endpoints.left,
    sign,
  });
  const rightRemainder = shiftedTrigRemainderInterval({
    cell,
    yInterval,
    branchRow,
    uInterval: endpoints.right,
    sign,
  });
  const endpointClearance = Math.min(leftSign.clearance, rightSign.clearance);
  const rowCertified =
    endpointSignsCertified &&
    derivativeCertified &&
    lowerContainsZero &&
    eImageInsidePredecessorTube;
  return {
    cell_id: `speed.${speedIndex}.first-y-positive.${yIndex}.${branchRow.branch}`,
    speed_cell_id: `speed.${speedIndex}`,
    positive_y_subcell_index: yIndex,
    branch: branchRow.branch,
    y_interval: root.formatInterval(yInterval),
    U_seed_interval: root.formatInterval(endpoints.seed),
    U_tube_interval: root.formatInterval(endpoints.tube),
    U_tube_abs_upper: root.formatSmallNumber(maxAbsInterval(endpoints.tube)),
    E_predecessor_seed_interval: root.formatInterval(ePredecessor.seed),
    E_predecessor_tube_interval: root.formatInterval(ePredecessor.tube),
    E_image_from_U_tube_interval: root.formatInterval(eImage),
    E_image_from_U_tube_inside_predecessor_tube:
      eImageInsidePredecessorTube,
    shift_power: SHIFT_POWER,
    shift_series_order: SERIES_ORDER,
    lower_shift_coefficients_y0_to_y26: lowerCoefficients.map(root.formatInterval),
    lower_shift_coefficients_contain_zero_y0_to_y26: lowerContainsZero,
    max_abs_lower_shift_residual_y0_to_y26: root.formatSmallNumber(
      Math.max(...lowerCoefficients.map(maxAbsInterval))
    ),
    R_shift27_left_endpoint_interval: root.formatInterval(leftR),
    R_shift27_left_endpoint_sign: leftSign.sign,
    R_shift27_left_endpoint_clearance: root.formatSmallNumber(leftSign.clearance),
    R_shift27_right_endpoint_interval: root.formatInterval(rightR),
    R_shift27_right_endpoint_sign: rightSign.sign,
    R_shift27_right_endpoint_clearance: root.formatSmallNumber(
      rightSign.clearance
    ),
    R_shift27_endpoint_min_clearance:
      root.formatSmallNumber(endpointClearance),
    R_shift27_endpoint_signs_certified: endpointSignsCertified,
    partial_U_R_shift27_interval: root.formatInterval(jInterval),
    partial_U_R_shift27_sign: jSign.sign,
    partial_U_R_shift27_clearance: root.formatSmallNumber(jSign.clearance),
    partial_U_R_shift27_sign_certified: derivativeCertified,
    shift27_trig_remainder_interval_hull: root.formatInterval([
      Math.min(leftRemainder[0], rightRemainder[0]),
      Math.max(leftRemainder[1], rightRemainder[1]),
    ]),
    max_abs_shift27_trig_remainder: root.formatSmallNumber(
      Math.max(maxAbsInterval(leftRemainder), maxAbsInterval(rightRemainder))
    ),
    shift27_coefficient_shift_used: true,
    shift27_raw_y_inverse_division_used: false,
    zero_touching_y_division_used: false,
    finite_shift27_U_root_tail_tube_certified: rowCertified,
    row_status: rowCertified
      ? ROW_CERTIFIED_STATUS
      : "finite-shift27-U-root-tail-tube-open",
  };
}

function buildRows({
  seedArtifact,
  speedBreaks,
  foldRows,
  ySubcellCount,
  uTubePadding,
  ePredecessorTubePadding,
}) {
  const rows = [];
  for (let speedIndex = 0; speedIndex < SPEED_CELL_COUNT; speedIndex += 1) {
    const speedInterval = root.outwardInterval([
      speedBreaks[speedIndex],
      speedBreaks[speedIndex + 1],
    ]);
    const cell = root.foldCellFromEndpointRows({
      leftRow: foldRows[speedIndex],
      rightRow: foldRows[speedIndex + 1],
      speedInterval,
    });
    const seedRow =
      seedArtifact.twenty_third_order_u_seed_coefficient_rows[speedIndex];
    seedRow.branch_rows.forEach((branchRow) => {
      const sign = root.branchSign(branchRow.branch);
      const endpoints = uTubeEndpointIntervals(branchRow, uTubePadding);
      const leftCoefficients = sourceEquationSeries({
        cell,
        branchSign: sign,
        hIntervals: hIntervalsThroughTwentyTwoWithU(branchRow, endpoints.left),
      });
      const rightCoefficients = sourceEquationSeries({
        cell,
        branchSign: sign,
        hIntervals: hIntervalsThroughTwentyTwoWithU(branchRow, endpoints.right),
      });
      const tubeCoefficients = sourceEquationSeries({
        cell,
        branchSign: sign,
        hIntervals: hIntervalsThroughTwentyTwoWithU(branchRow, endpoints.tube),
      });
      const lowerCoefficients = lowerShiftCoefficients(tubeCoefficients);
      for (let yIndex = 1; yIndex < ySubcellCount; yIndex += 1) {
        const yInterval = root.outwardInterval([
          (FIRST_Y_CELL_UPPER * yIndex) / ySubcellCount,
          (FIRST_Y_CELL_UPPER * (yIndex + 1)) / ySubcellCount,
        ]);
        rows.push(
          finiteShift27Row({
            speedIndex,
            yIndex,
            yInterval,
            branchRow,
            cell,
            uTubePadding,
            ePredecessorTubePadding,
            leftCoefficients,
            rightCoefficients,
            lowerCoefficients,
          })
        );
      }
    });
  }
  return rows;
}

function summarizeRows({
  rows,
  seedArtifact,
  ySubcellCount,
  uTubePadding,
  ePredecessorTubePadding,
}) {
  const seedErrors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyThirdOrderUSeedCoefficientCertificate(
      seedArtifact
    );
  const allRowsCertified = rows.every((row) => row.row_status === ROW_CERTIFIED_STATUS);
  const allLowerContainZero = rows.every(
    (row) => row.lower_shift_coefficients_contain_zero_y0_to_y26 === true
  );
  const allEndpointSigns = rows.every(
    (row) => row.R_shift27_endpoint_signs_certified === true
  );
  const allDerivativeSigns = rows.every(
    (row) => row.partial_U_R_shift27_sign_certified === true
  );
  const allCoefficientShift = rows.every(
    (row) => row.shift27_coefficient_shift_used === true
  );
  const allEImagesInsidePredecessorTube = rows.every(
    (row) => row.E_image_from_U_tube_inside_predecessor_tube === true
  );
  const allNoRawDivision = rows.every(
    (row) =>
      row.shift27_raw_y_inverse_division_used === false &&
      row.zero_touching_y_division_used === false
  );
  const allTubesCertified = rows.every(
    (row) => row.finite_shift27_U_root_tail_tube_certified === true
  );
  const passed =
    seedErrors.length === 0 &&
    allRowsCertified &&
    allLowerContainZero &&
    allEndpointSigns &&
    allDerivativeSigns &&
    allEImagesInsidePredecessorTube &&
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
    finite_shift27_row_count: rows.length,
    U_tube_padding: root.formatSmallNumber(uTubePadding),
    E_predecessor_tube_padding: root.formatSmallNumber(
      ePredecessorTubePadding
    ),
    u_seed_artifact_valid: seedErrors.length === 0,
    u_seed_validation_errors: seedErrors,
    all_rows_certified: allRowsCertified,
    all_lower_shift_coefficients_contain_zero_y0_to_y26: allLowerContainZero,
    all_shift27_endpoint_signs_certified: allEndpointSigns,
    all_partial_U_R_shift27_signs_certified: allDerivativeSigns,
    all_E_images_from_U_tube_inside_predecessor_tube:
      allEImagesInsidePredecessorTube,
    all_rows_use_coefficient_shift: allCoefficientShift,
    all_rows_avoid_raw_y_inverse_division: allNoRawDivision,
    all_finite_shift27_U_root_tail_tubes_certified: allTubesCertified,
    min_shift27_endpoint_clearance: root.formatSmallNumber(
      minField(rows, "R_shift27_endpoint_min_clearance")
    ),
    min_partial_U_R_shift27_clearance: root.formatSmallNumber(
      minField(rows, "partial_U_R_shift27_clearance")
    ),
    max_U_tube_abs_upper: root.formatSmallNumber(
      maxField(rows, "U_tube_abs_upper")
    ),
    max_E_image_from_U_tube_abs_upper: root.formatSmallNumber(
      Math.max(
        ...rows.map((row) =>
          maxAbsInterval(numericInterval(row.E_image_from_U_tube_interval))
        )
      )
    ),
    max_abs_lower_shift_residual_y0_to_y26: root.formatSmallNumber(
      maxField(rows, "max_abs_lower_shift_residual_y0_to_y26")
    ),
    max_abs_shift27_trig_remainder: root.formatSmallNumber(
      maxField(rows, "max_abs_shift27_trig_remainder")
    ),
    R_shift27_left_endpoint_interval_hull: coefficientHull(
      rows.map((row) => numericInterval(row.R_shift27_left_endpoint_interval))
    ),
    R_shift27_right_endpoint_interval_hull: coefficientHull(
      rows.map((row) => numericInterval(row.R_shift27_right_endpoint_interval))
    ),
    inherited_h23_interval_hull:
      seedArtifact.twenty_third_order_u_seed_coefficient_summary
        .h23_interval_hull,
    inherited_Q_G_y23_coefficient_interval_hull:
      seedArtifact.twenty_third_order_u_seed_coefficient_summary
        .Q_G_y23_coefficient_interval_hull,
    inherited_Q_D_y23_coefficient_interval_hull:
      seedArtifact.twenty_third_order_u_seed_coefficient_summary
        .Q_D_y23_coefficient_interval_hull,
    inherited_min_Q_G_remaining_twenty_fourth_order_tail_budget:
      seedArtifact.twenty_third_order_u_seed_coefficient_summary
        .min_Q_G_remaining_twenty_fourth_order_tail_budget,
    inherited_min_Q_D_remaining_twenty_fourth_order_tail_budget:
      seedArtifact.twenty_third_order_u_seed_coefficient_summary
        .min_Q_D_remaining_twenty_fourth_order_tail_budget,
    status: passed
      ? CERTIFIED_STATUS
      : "theta3minus-fold-pair-first-y-GD-finite-shift27-U-root-tail-tube-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift27URootTailTubeCertificate(
  options = {}
) {
  const ySubcellCount = validateYSubcellCount(
    options.ySubcellCount ?? DEFAULT_Y_SUBCELL_COUNT
  );
  const uTubePadding = validateUTubePadding(
    options.uTubePadding ?? DEFAULT_U_TUBE_PADDING
  );
  const ePredecessorTubePadding = validateEPredecessorTubePadding(
    options.ePredecessorTubePadding ?? DEFAULT_E_PREDECESSOR_TUBE_PADDING
  );
  const seedArtifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyThirdOrderUSeedCoefficientCertificate();
  const speedBreaks = root.makeSpeedBreaks(SPEED_CELL_COUNT);
  const normalForm =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm({
      speedSamples: speedBreaks,
      ySamples: [0.115, 0.01, 0.001, 0.0005],
      rootSubdivisions: root.DEFAULT_ROOT_SUBDIVISIONS,
    });
  const rows = buildRows({
    seedArtifact,
    speedBreaks,
    foldRows: normalForm.speed_dependent_fold_normal_form_rows,
    ySubcellCount,
    uTubePadding,
    ePredecessorTubePadding,
  });
  const summary = summarizeRows({
    rows,
    seedArtifact,
    ySubcellCount,
    uTubePadding,
    ePredecessorTubePadding,
  });
  const passed = summary.status === CERTIFIED_STATUS;
  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_SHIFT27_U_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-third-order-u-seed-coefficient-certificate.md",
    ],
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-shift27-u-root-tail-tube-certificate.md",
    finite_shift27_u_root_tail_tube_parameters: {
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
      U_tube_padding: root.formatSmallNumber(uTubePadding),
      E_predecessor_tube_padding: root.formatSmallNumber(
        ePredecessorTubePadding
      ),
      U_tube_definition:
        "U_tube=[h23_left-padding,h23_right+padding] around the certified U-seed interval",
      E_predecessor_image_policy:
        "the induced E=h21+y*h22+y^2*U_tube image is interval-certified inside the predecessor E tube on every positive-y subcell",
      shifted_residual:
        "R_U,27(y,U,nu)=Shift_27(F_epsilon(y,h_<=22+y^23*U,nu))",
      coefficient_shift_policy:
        "lower coefficients y0 through y26 are dropped only after interval containment of zero; no raw division by a zero-touching y interval is used",
      finite_positive_y_policy:
        "positive first-y subcells are certified by endpoint signs and the shifted derivative partial_U R=J; the zero endpoint is inherited from the h23 U seed",
    },
    finite_shift27_u_root_tail_tube_rows: rows,
    finite_shift27_u_root_tail_tube_summary: summary,
    closure_burndown: [
      {
        row: "theta3minus.fold-pair-first-y-GD-twenty-third-order-u-seed-coefficient",
        status: "directed-rounded-interval-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-finite-shift27-U-root-tail-tube",
        status: passed ? "directed-rounded-positive-y-certified" : "open",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-twenty-fourth-order-U-tail-bound",
        status: "directed-rounded-open",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure",
        status: "blocked-by-twenty-fourth-order-U-tail-bound",
      },
      {
        row: "theta3minus.fold-pair-scaled-remainder-continuous-collar",
        status: "blocked-by-directed-rounded-first-y-GD-enclosure",
      },
    ],
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_shift_27_finite_y_residual_u_evaluator: passed,
      certifies_directed_rounded_first_y_GD_finite_shift27_U_root_tail_tube_positive_y:
        passed,
      certifies_first_y_zero_endpoint_U_seed: true,
      certifies_directed_rounded_first_y_GD_finite_U_root_tail_tube:
        passed,
      certifies_directed_rounded_first_y_GD_continuous_U_tail_bound: false,
      certifies_directed_rounded_first_y_GD_finite_remainder_bound: false,
      certifies_directed_rounded_first_y_GD_jet_enclosure: false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_I1_regular_critical_exhaustion: false,
      retained_branch: false,
      claim_level:
        "Directed-rounded coefficient-shifted finite-y Shift_27 residual evaluator for the U_epsilon root-tail tube on positive first-y subcells, with endpoint signs and partial_U R=J signs certified over the no-fixed-speed-window speed cover. It closes the finite U tube row for the root graph, while the continuous U-coordinate quotient-tail bound, full quotient enclosure, scaled remainder, I1 closure, quadrature, and retained branch status remain open.",
    },
    result: {
      theory_status: summary.status,
      first_successor_row:
        "theta3minus.fold-pair-first-y-GD-twenty-fourth-order-U-tail-bound-directed-rounded-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The finite U_epsilon root-tail tube is certified on the positive first-y subcells by the coefficient-shifted Shift_27 evaluator and inherited at y=0 from the h23 seed. The remaining first-y blocker is the continuous U-coordinate post-seed quotient-tail bound needed for the full directed-rounded first-y enclosure.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift27URootTailTubeCertificate(
  artifact
) {
  const errors = [];
  const summary = artifact?.finite_shift27_u_root_tail_tube_summary;
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_SHIFT27_U_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA,
    "schema must match theta3minus fold-pair first-y G/D finite Shift27 U root-tail tube certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus fold-pair first-y G/D finite Shift27 U root-tail tube packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.finite_shift27_u_root_tail_tube_parameters?.speed_constraint ===
      NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "finite Shift27 U root-tail tube certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.finite_shift27_u_root_tail_tube_parameters?.speed_band === undefined &&
      artifact?.finite_shift27_u_root_tail_tube_parameters?.speed_window ===
        undefined &&
      artifact?.finite_shift27_u_root_tail_tube_parameters?.speed_min ===
        undefined &&
      artifact?.finite_shift27_u_root_tail_tube_parameters?.speed_max ===
        undefined,
    "finite Shift27 U root-tail tube parameters must not contain speed-band fields",
    errors
  );
  assertField(
    summary?.status === CERTIFIED_STATUS &&
      summary?.speed_cell_count === SPEED_CELL_COUNT &&
      summary?.finite_shift27_row_count ===
        SPEED_CELL_COUNT * 2 * (summary?.positive_y_subcell_count ?? 0) &&
      summary?.shift_power === SHIFT_POWER &&
      summary?.shift_series_order === SERIES_ORDER &&
      summary?.u_seed_artifact_valid === true &&
      summary?.all_rows_certified === true &&
      summary?.all_lower_shift_coefficients_contain_zero_y0_to_y26 === true &&
      summary?.all_shift27_endpoint_signs_certified === true &&
      summary?.all_partial_U_R_shift27_signs_certified === true &&
      summary?.all_E_images_from_U_tube_inside_predecessor_tube === true &&
      summary?.all_rows_use_coefficient_shift === true &&
      summary?.all_rows_avoid_raw_y_inverse_division === true &&
      summary?.all_finite_shift27_U_root_tail_tubes_certified === true &&
      Number(summary?.min_shift27_endpoint_clearance) > 7.9e15 &&
      Number(summary?.min_partial_U_R_shift27_clearance) > 0.79 &&
      Number(summary?.max_abs_shift27_trig_remainder) < 1e-100 &&
      Number(summary?.inherited_min_Q_G_remaining_twenty_fourth_order_tail_budget) >
        1e64 &&
      Number(summary?.inherited_min_Q_D_remaining_twenty_fourth_order_tail_budget) >
        1e64,
    "finite Shift27 rows must certify shifted endpoint signs, shifted derivative signs, lower coefficient containment, no raw y division, and inherited U-seed budgets",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_shift_27_finite_y_residual_u_evaluator ===
      true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_finite_shift27_U_root_tail_tube_positive_y ===
        true &&
      artifact?.artifact_claim?.certifies_first_y_zero_endpoint_U_seed === true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_finite_U_root_tail_tube ===
        true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_continuous_U_tail_bound ===
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
      artifact?.artifact_claim?.retained_branch === false,
    "artifact claim must certify only the finite Shift27 U tube and keep continuous U tail, quotient remainder, scaled remainder, I1, and retention open",
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
    } else if (arg === "--u-tube-padding") {
      options.uTubePadding = argv[++index];
    } else if (arg === "--e-predecessor-tube-padding") {
      options.ePredecessorTubePadding = argv[++index];
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-shift27-u-root-tail-tube-certificate.mjs [options]",
    "",
    "Options:",
    "  --out <path>                 Write artifact JSON",
    "  --validate <path>            Validate an artifact JSON",
    "  --schema                     Print artifact schema metadata",
    "  --y-subcell-count <count>    Positive-y diagnostic subcell count",
    "  --u-tube-padding <value>     Padding around each certified h23 U seed interval",
    "  --e-predecessor-tube-padding <value>",
    "                               Padding around each predecessor h21 E seed interval",
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
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_SHIFT27_U_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift27URootTailTubeCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  try {
    const artifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift27URootTailTubeCertificate(
        options
      );
    const errors =
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift27URootTailTubeCertificate(
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
