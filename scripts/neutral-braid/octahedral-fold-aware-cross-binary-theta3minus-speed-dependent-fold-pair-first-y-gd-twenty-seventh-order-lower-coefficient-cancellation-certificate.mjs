#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySixthOrderPostUSuccessorCoefficientCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySixthOrderPostUSuccessorCoefficientCertificate,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-sixth-order-post-u-successor-coefficient-certificate.mjs";
import {
  theta3minusFoldPairScaledRootTubeCellInternals as root,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_SEVENTH_ORDER_LOWER_COEFFICIENT_CANCELLATION_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-seventh-order-lower-coefficient-cancellation-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_twenty_seventh_order_lower_coefficient_cancellation_certificate";
const PROMOTION_STATUS = "priority-only";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const SPEED_CELL_COUNT = 128;
const NUMERATOR_SHIFT_POWER = 29;
const QUOTIENT_TAIL_ORDER = 27;
const LOWER_COEFFICIENT_COUNT = 29;
const Q_COEFFICIENT_COUNT = 27;
const CERTIFIED_STATUS =
  "coefficient-preserving-theta3minus-fold-pair-first-y-GD-twenty-seventh-order-lower-coefficient-cancellation-certified";
const PROBE_STATUS =
  "coefficient-preserving-theta3minus-fold-pair-first-y-GD-twenty-seventh-order-lower-coefficient-cancellation-probe-obstructed-by-missing-data";
const ROW_CERTIFIED_STATUS =
  "coefficient-preserving-first-y-GD-twenty-seventh-order-lower-coefficient-cancellation-enclosed";
const ROW_MISSING_DATA_STATUS =
  "coefficient-preserving-first-y-GD-twenty-seventh-order-lower-coefficient-cancellation-missing-coefficient-data";

function numericInterval(interval) {
  return interval.map(Number);
}

function zeroInterval() {
  return [0, 0];
}

function containsZero([left, right]) {
  return left <= 0 && right >= 0;
}

function maxAbsInterval([left, right]) {
  return Math.max(Math.abs(left), Math.abs(right));
}

function maxField(rows, fieldName) {
  return Math.max(...rows.map((row) => Number(row[fieldName])));
}

function intervalHull(seriesRows, fieldName) {
  const intervals = seriesRows.flatMap((row) =>
    row[fieldName].map(numericInterval)
  );
  return root.formatInterval([
    Math.min(...intervals.map(([left]) => left)),
    Math.max(...intervals.map(([, right]) => right)),
  ]);
}

function qFieldName(prefix, index) {
  return `${prefix}_y${index}_coefficient_interval`;
}

function requiredCoefficientFields(row) {
  const fields = [
    "G_pair_coefficients_y0_to_y28",
    "D_pair_coefficients_y0_to_y28",
    "L_interval",
  ];
  for (let index = 0; index < Q_COEFFICIENT_COUNT; index += 1) {
    fields.push(qFieldName("Q_G", index), qFieldName("Q_D", index));
  }
  return fields.filter((fieldName) => {
    const value = row[fieldName];
    if (
      fieldName === "G_pair_coefficients_y0_to_y28" ||
      fieldName === "D_pair_coefficients_y0_to_y28"
    ) {
      return !Array.isArray(value) || value.length < LOWER_COEFFICIENT_COUNT;
    }
    return !Array.isArray(value) || value.length !== 2;
  });
}

function sourceCoefficient(row, sourceName, powerIndex) {
  return numericInterval(row[sourceName][powerIndex]);
}

function quotientLift(row, prefix, powerIndex) {
  if (powerIndex < 2) {
    return zeroInterval();
  }
  return numericInterval(row[qFieldName(prefix, powerIndex - 2)]);
}

function limitLift(row, powerIndex) {
  return powerIndex === 0 ? numericInterval(row.L_interval) : zeroInterval();
}

function lowerNumeratorCoefficient({ row, sourceName, prefix, powerIndex }) {
  return root.subtractIntervals(
    root.subtractIntervals(
      sourceCoefficient(row, sourceName, powerIndex),
      limitLift(row, powerIndex)
    ),
    quotientLift(row, prefix, powerIndex)
  );
}

function lowerNumeratorSeries({ row, sourceName, prefix }) {
  return Array.from({ length: LOWER_COEFFICIENT_COUNT }, (_, powerIndex) =>
    lowerNumeratorCoefficient({ row, sourceName, prefix, powerIndex })
  );
}

function lowerIdentityResidual({ gResidual, dResidual }, powerIndex) {
  return root.subtractIntervals(
    dResidual[powerIndex],
    root.scaleInterval(gResidual[powerIndex], 1 - powerIndex)
  );
}

function maxAbsSeries(series) {
  return Math.max(...series.map(maxAbsInterval));
}

function allContainZero(series) {
  return series.every(containsZero);
}

function cancellationRow(row) {
  const missingCoefficientData = requiredCoefficientFields(row);
  const predecessorStatus =
    row.row_status ===
    "directed-rounded-first-y-GD-twenty-sixth-order-post-U-successor-coefficient-enclosed";

  if (missingCoefficientData.length > 0) {
    return {
      cell_id: row.cell_id,
      speed_interval: row.speed_interval,
      first_y_cell: row.first_y_cell,
      predecessor_twenty_sixth_order_row_status: row.row_status,
      numerator_shift_power: NUMERATOR_SHIFT_POWER,
      quotient_tail_order: QUOTIENT_TAIL_ORDER,
      lower_coefficient_count: LOWER_COEFFICIENT_COUNT,
      required_source_coefficients:
        "G_pair_coefficients_y0_to_y28, D_pair_coefficients_y0_to_y28, L_interval, Q_G_y0_to_y26_coefficient_interval, Q_D_y0_to_y26_coefficient_interval",
      missing_coefficient_data: missingCoefficientData,
      raw_y_inverse_division_used: false,
      y29_division_used: false,
      row_status: ROW_MISSING_DATA_STATUS,
    };
  }

  const gResidual = lowerNumeratorSeries({
    row,
    sourceName: "G_pair_coefficients_y0_to_y28",
    prefix: "Q_G",
  });
  const dResidual = lowerNumeratorSeries({
    row,
    sourceName: "D_pair_coefficients_y0_to_y28",
    prefix: "Q_D",
  });
  const identityResidual = Array.from(
    { length: LOWER_COEFFICIENT_COUNT },
    (_, powerIndex) =>
      lowerIdentityResidual({ gResidual, dResidual }, powerIndex)
  );
  const gContainZero = allContainZero(gResidual);
  const dContainZero = allContainZero(dResidual);
  const identityContainZero = allContainZero(identityResidual);

  return {
    cell_id: row.cell_id,
    speed_interval: row.speed_interval,
    first_y_cell: row.first_y_cell,
    predecessor_twenty_sixth_order_row_status: row.row_status,
    numerator_shift_power: NUMERATOR_SHIFT_POWER,
    quotient_tail_order: QUOTIENT_TAIL_ORDER,
    lower_coefficient_count: LOWER_COEFFICIENT_COUNT,
    G_lower_numerator_coefficients_y0_to_y28:
      gResidual.map(root.formatInterval),
    D_lower_numerator_coefficients_y0_to_y28:
      dResidual.map(root.formatInterval),
    lower_numerator_identity_residual_coefficients_y0_to_y28:
      identityResidual.map(root.formatInterval),
    G_lower_numerator_coefficients_y0_to_y28_contain_zero: gContainZero,
    D_lower_numerator_coefficients_y0_to_y28_contain_zero: dContainZero,
    lower_numerator_identity_coefficients_y0_to_y28_contain_zero:
      identityContainZero,
    max_abs_G_lower_numerator_residual_y0_to_y28: root.formatSmallNumber(
      maxAbsSeries(gResidual)
    ),
    max_abs_D_lower_numerator_residual_y0_to_y28: root.formatSmallNumber(
      maxAbsSeries(dResidual)
    ),
    max_abs_lower_numerator_identity_residual_y0_to_y28:
      root.formatSmallNumber(maxAbsSeries(identityResidual)),
    required_source_coefficients:
      "G_pair_coefficients_y0_to_y28, D_pair_coefficients_y0_to_y28, L_interval, Q_G_y0_to_y26_coefficient_interval, Q_D_y0_to_y26_coefficient_interval",
    missing_coefficient_data: [],
    raw_y_inverse_division_used: false,
    y29_division_used: false,
    lower_shift_operator:
      "Shift_29 is licensed only after interval-certifying that coefficients y0 through y28 of P-L-y^2*A_G,26 and D_pair-L-y^2*A_D,26 contain zero",
    T_G_shifted_tail_formula: "T_G^(27)=Shift_29(P-L-y^2*A_G,26)",
    T_D_shifted_tail_formula: "T_D^(27)=Shift_29(D_pair-L-y^2*A_D,26)",
    T_D_from_T_G_lower_identity:
      "N_D,k=(1-k)*N_G,k for lower numerator coefficients k=0..28",
    finite_tail_bound_certified: false,
    row_status:
      predecessorStatus && gContainZero && dContainZero && identityContainZero
        ? ROW_CERTIFIED_STATUS
        : ROW_MISSING_DATA_STATUS,
  };
}

function summarizeRows(rows, predecessorArtifact) {
  const predecessorErrors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySixthOrderPostUSuccessorCoefficientCertificate(
      predecessorArtifact
    );
  const allRowsCertified = rows.every(
    (row) => row.row_status === ROW_CERTIFIED_STATUS
  );
  const missingCoefficientData = Array.from(
    new Set(rows.flatMap((row) => row.missing_coefficient_data ?? []))
  );
  const allGLowerZeros = rows.every(
    (row) => row.G_lower_numerator_coefficients_y0_to_y28_contain_zero === true
  );
  const allDLowerZeros = rows.every(
    (row) => row.D_lower_numerator_coefficients_y0_to_y28_contain_zero === true
  );
  const allIdentityZeros = rows.every(
    (row) =>
      row.lower_numerator_identity_coefficients_y0_to_y28_contain_zero === true
  );
  const allNoRawYDivision = rows.every(
    (row) =>
      row.raw_y_inverse_division_used === false &&
      row.y29_division_used === false
  );
  const allFiniteTailOpen = rows.every(
    (row) => row.finite_tail_bound_certified === false
  );
  const passed =
    predecessorErrors.length === 0 &&
    allRowsCertified &&
    missingCoefficientData.length === 0 &&
    allGLowerZeros &&
    allDLowerZeros &&
    allIdentityZeros &&
    allNoRawYDivision &&
    allFiniteTailOpen;

  return {
    speed_cell_count: rows.length,
    predecessor_twenty_sixth_order_artifact_valid:
      predecessorErrors.length === 0,
    predecessor_validation_errors: predecessorErrors,
    all_rows_certified: allRowsCertified,
    required_source_coefficients:
      "G_pair_coefficients_y0_to_y28, D_pair_coefficients_y0_to_y28, L_interval, Q_G_y0_to_y26_coefficient_interval, Q_D_y0_to_y26_coefficient_interval",
    missing_coefficient_data: missingCoefficientData,
    missing_coefficient_data_count: missingCoefficientData.length,
    all_G_lower_numerator_coefficients_y0_to_y28_contain_zero:
      allGLowerZeros,
    all_D_lower_numerator_coefficients_y0_to_y28_contain_zero:
      allDLowerZeros,
    all_lower_numerator_identity_coefficients_y0_to_y28_contain_zero:
      allIdentityZeros,
    all_rows_avoid_raw_y_inverse_division_before_shift: allNoRawYDivision,
    all_finite_tail_bounds_remain_open: allFiniteTailOpen,
    numerator_shift_power: NUMERATOR_SHIFT_POWER,
    quotient_tail_order: QUOTIENT_TAIL_ORDER,
    lower_coefficient_count: LOWER_COEFFICIENT_COUNT,
    G_lower_numerator_residual_y0_to_y28_hull: passed
      ? intervalHull(rows, "G_lower_numerator_coefficients_y0_to_y28")
      : null,
    D_lower_numerator_residual_y0_to_y28_hull: passed
      ? intervalHull(rows, "D_lower_numerator_coefficients_y0_to_y28")
      : null,
    lower_numerator_identity_residual_y0_to_y28_hull: passed
      ? intervalHull(
          rows,
          "lower_numerator_identity_residual_coefficients_y0_to_y28"
        )
      : null,
    max_abs_G_lower_numerator_residual_y0_to_y28: passed
      ? root.formatSmallNumber(
          maxField(rows, "max_abs_G_lower_numerator_residual_y0_to_y28")
        )
      : null,
    max_abs_D_lower_numerator_residual_y0_to_y28: passed
      ? root.formatSmallNumber(
          maxField(rows, "max_abs_D_lower_numerator_residual_y0_to_y28")
        )
      : null,
    max_abs_lower_numerator_identity_residual_y0_to_y28: passed
      ? root.formatSmallNumber(
          maxField(
            rows,
            "max_abs_lower_numerator_identity_residual_y0_to_y28"
          )
        )
      : null,
    inherited_h26_interval_hull:
      predecessorArtifact.twenty_sixth_order_post_u_successor_coefficient_summary
        .h26_interval_hull,
    inherited_Q_G_y26_coefficient_interval_hull:
      predecessorArtifact.twenty_sixth_order_post_u_successor_coefficient_summary
        .Q_G_y26_coefficient_interval_hull,
    inherited_Q_D_y26_coefficient_interval_hull:
      predecessorArtifact.twenty_sixth_order_post_u_successor_coefficient_summary
        .Q_D_y26_coefficient_interval_hull,
    inherited_min_Q_G_remaining_twenty_seventh_order_tail_budget:
      predecessorArtifact.twenty_sixth_order_post_u_successor_coefficient_summary
        .min_Q_G_remaining_twenty_seventh_order_tail_budget,
    inherited_min_Q_D_remaining_twenty_seventh_order_tail_budget:
      predecessorArtifact.twenty_sixth_order_post_u_successor_coefficient_summary
        .min_Q_D_remaining_twenty_seventh_order_tail_budget,
    status: passed ? CERTIFIED_STATUS : PROBE_STATUS,
    obstruction_note: passed
      ? null
      : "The available predecessor artifact does not contain all coefficient data needed to prove lower numerator cancellation through y^28 before y^29 division.",
  };
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySeventhOrderLowerCoefficientCancellationCertificate() {
  const predecessorArtifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySixthOrderPostUSuccessorCoefficientCertificate();
  const rows =
    predecessorArtifact.twenty_sixth_order_post_u_successor_coefficient_rows.map(
      cancellationRow
    );
  const summary = summarizeRows(rows, predecessorArtifact);
  const passed = summary.status === CERTIFIED_STATUS;

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_SEVENTH_ORDER_LOWER_COEFFICIENT_CANCELLATION_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-sixth-order-post-u-successor-coefficient-certificate.md",
    ],
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-seventh-order-lower-coefficient-cancellation-certificate.md",
    lower_coefficient_cancellation_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: root.SPEED_RATIO_ENCLOSURE,
      speed_cell_count: SPEED_CELL_COUNT,
      first_y_cell:
        predecessorArtifact
          .twenty_sixth_order_post_u_successor_coefficient_parameters
          .first_y_cell,
      predecessor_quotient_jet_order: 26,
      quotient_tail_order: QUOTIENT_TAIL_ORDER,
      numerator_shift_power: NUMERATOR_SHIFT_POWER,
      lower_coefficient_count: LOWER_COEFFICIENT_COUNT,
      cancellation_target:
        "coefficients y0 through y28 of P-L-y^2*A_G,26 and D_pair-L-y^2*A_D,26",
      shift_operator_definition:
        "Shift_29 is allowed only after coefficient intervals certify all lower numerator coefficients through y^28 contain zero; no zero-touching y interval division is used in this artifact",
      G_shift_input: "P-L-y^2*A_G,26",
      D_shift_input: "D_pair-L-y^2*A_D,26",
      C1_successor_role:
        "feeds the C1 twenty-seventh-order tail route by preserving the lower cancellations before any y^29 division",
    },
    lower_coefficient_cancellation_rows: rows,
    lower_coefficient_cancellation_summary: summary,
    closure_burndown: [
      {
        row: "theta3minus.fold-pair-first-y-GD-twenty-sixth-order-post-U-successor-coefficient",
        status: "directed-rounded-interval-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-twenty-seventh-order-lower-coefficient-cancellation",
        status: passed
          ? "coefficient-preserving-cancellation-certified"
          : "missing-coefficient-data-probe",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-C1-twenty-seventh-order-tail-bound",
        status: passed
          ? "blocked-by-coefficient-preserving-y29-remainder-bound"
          : "blocked-by-missing-lower-coefficient-data",
      },
    ],
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_directed_rounded_first_y_GD_twenty_sixth_order_post_u_successor_coefficient_enclosure:
        predecessorArtifact.artifact_claim
          .certifies_directed_rounded_first_y_GD_twenty_sixth_order_post_u_successor_coefficient_enclosure,
      certifies_coefficient_preserving_first_y_GD_twenty_seventh_order_lower_numerator_cancellation:
        passed,
      certifies_lower_numerator_cancellation_through_y28_before_y29_division:
        passed,
      certifies_shift29_is_licensed_for_lower_terms: passed,
      certifies_directed_rounded_first_y_GD_C1_twenty_seventh_order_tail_bound:
        false,
      certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
        false,
      certifies_directed_rounded_first_y_GD_finite_remainder_bound: false,
      certifies_directed_rounded_first_y_GD_jet_enclosure: false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_I1_regular_critical_exhaustion: false,
      retained_branch: false,
      claim_level: passed
        ? "Coefficient-preserving lower-numerator cancellation certificate for the theta3minus first-y G,D fold-pair C1 twenty-seventh-order route. It certifies coefficients y0 through y28 of P-L-y^2*A_G,26 and D_pair-L-y^2*A_D,26 contain zero over all 128 speed cells before any y^29 division. It does not certify the y^29 remainder or the C1 tail bound."
        : "Rigorous probe obstruction: the predecessor artifact lacks coefficient data needed to certify lower numerator cancellation through y^28 before y^29 division. No new gate or tail-bound claim is made.",
    },
    result: {
      theory_status: summary.status,
      first_successor_row: passed
        ? "theta3minus.fold-pair-first-y-GD-C1-twenty-seventh-order-coefficient-preserving-y29-remainder-bound-required"
        : "theta3minus.fold-pair-first-y-GD-twenty-seventh-order-lower-coefficient-data-required",
      retention: "not_retained",
      retained_branch: false,
      status_note: passed
        ? "The lower numerator cancellations through y^28 are certified at coefficient level, so the next C1 route may divide by y^29 only after preserving these cancellations."
        : "The probe identifies missing source coefficient fields exactly and leaves C1 tail closure open.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySeventhOrderLowerCoefficientCancellationCertificate(
  artifact
) {
  const errors = [];
  const summary = artifact?.lower_coefficient_cancellation_summary;
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_SEVENTH_ORDER_LOWER_COEFFICIENT_CANCELLATION_CERTIFICATE_SCHEMA,
    "schema must match theta3minus fold-pair first-y G/D twenty-seventh-order lower-coefficient cancellation certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus fold-pair first-y G/D lower-coefficient cancellation packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.lower_coefficient_cancellation_parameters?.speed_constraint ===
      NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "lower-coefficient cancellation certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.lower_coefficient_cancellation_parameters?.speed_band ===
      undefined &&
      artifact?.lower_coefficient_cancellation_parameters?.speed_window ===
        undefined &&
      artifact?.lower_coefficient_cancellation_parameters?.speed_min ===
        undefined &&
      artifact?.lower_coefficient_cancellation_parameters?.speed_max ===
        undefined,
    "lower-coefficient cancellation parameters must not contain speed-band fields",
    errors
  );
  assertField(
    summary?.status === CERTIFIED_STATUS &&
      summary?.speed_cell_count === SPEED_CELL_COUNT &&
      summary?.predecessor_twenty_sixth_order_artifact_valid === true &&
      summary?.all_rows_certified === true &&
      summary?.missing_coefficient_data_count === 0 &&
      summary?.all_G_lower_numerator_coefficients_y0_to_y28_contain_zero ===
        true &&
      summary?.all_D_lower_numerator_coefficients_y0_to_y28_contain_zero ===
        true &&
      summary
        ?.all_lower_numerator_identity_coefficients_y0_to_y28_contain_zero ===
        true &&
      summary?.all_rows_avoid_raw_y_inverse_division_before_shift === true &&
      summary?.all_finite_tail_bounds_remain_open === true &&
      summary?.numerator_shift_power === NUMERATOR_SHIFT_POWER &&
      summary?.quotient_tail_order === QUOTIENT_TAIL_ORDER &&
      summary?.lower_coefficient_count === LOWER_COEFFICIENT_COUNT &&
      Number(summary?.max_abs_G_lower_numerator_residual_y0_to_y28) < 1.6e15 &&
      Number(summary?.max_abs_D_lower_numerator_residual_y0_to_y28) < 4.2e16 &&
      Number(summary?.max_abs_lower_numerator_identity_residual_y0_to_y28) <
        8.4e16,
    "lower-coefficient rows must certify y0 through y28 numerator cancellation, no y29 division, and open finite-tail status",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_directed_rounded_first_y_GD_twenty_sixth_order_post_u_successor_coefficient_enclosure ===
      true &&
      artifact?.artifact_claim
        ?.certifies_coefficient_preserving_first_y_GD_twenty_seventh_order_lower_numerator_cancellation ===
        true &&
      artifact?.artifact_claim
        ?.certifies_lower_numerator_cancellation_through_y28_before_y29_division ===
        true &&
      artifact?.artifact_claim?.certifies_shift29_is_licensed_for_lower_terms ===
        true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_C1_twenty_seventh_order_tail_bound ===
        false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound ===
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
    "artifact claim must certify only lower numerator cancellation and keep C1 tail, full quotient, scaled remainder, I1, and retention open",
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
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-seventh-order-lower-coefficient-cancellation-certificate.mjs [options]",
    "",
    "Options:",
    "  --out <path>         Write artifact JSON",
    "  --validate <path>    Validate an artifact JSON",
    "  --schema             Print artifact schema metadata",
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
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_SEVENTH_ORDER_LOWER_COEFFICIENT_CANCELLATION_CERTIFICATE_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySeventhOrderLowerCoefficientCancellationCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  const artifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySeventhOrderLowerCoefficientCancellationCertificate();
  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySeventhOrderLowerCoefficientCancellationCertificate(
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
