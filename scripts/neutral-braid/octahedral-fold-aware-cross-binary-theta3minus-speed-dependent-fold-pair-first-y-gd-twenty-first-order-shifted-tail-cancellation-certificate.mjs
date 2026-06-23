#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentiethOrderJetCoefficientIntervalCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentiethOrderJetCoefficientIntervalCertificate,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twentieth-order-jet-coefficient-interval-certificate.mjs";
import {
  theta3minusFoldPairScaledRootTubeCellInternals as root,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_FIRST_ORDER_SHIFTED_TAIL_CANCELLATION_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-shifted-tail-cancellation-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_twenty_first_order_shifted_tail_cancellation_certificate";
const PROMOTION_STATUS = "priority-only";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const CERTIFIED_STATUS =
  "zero-safe-theta3minus-fold-pair-first-y-GD-twenty-first-order-shifted-tail-cancellation-certified";
const ROW_CERTIFIED_STATUS =
  "zero-safe-first-y-GD-twenty-first-order-shifted-tail-cancellation-enclosed";
const SHIFT_POWER = 23;
const QUOTIENT_TAIL_ORDER = 21;
const TWENTIETH_COEFFICIENT_COUNT = 21;
const LOWER_SHIFT_COEFFICIENT_COUNT = 23;
const SPEED_CELL_COUNT = 128;

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

function intervalAt(row, fieldName) {
  return numericInterval(row[fieldName]);
}

function qField(prefix, index) {
  return `${prefix}_y${index}_coefficient_interval`;
}

function sourceJetCoefficient(row, sourceName, powerIndex) {
  return numericInterval(row[sourceName][powerIndex]);
}

function quotientJetLift(row, prefix, powerIndex) {
  if (powerIndex < 2) {
    return zeroInterval();
  }
  return intervalAt(row, qField(prefix, powerIndex - 2));
}

function limitLift(row, powerIndex) {
  return powerIndex === 0 ? intervalAt(row, "L_interval") : zeroInterval();
}

function residualCoefficient({ row, sourceName, prefix, powerIndex }) {
  return root.subtractIntervals(
    root.subtractIntervals(
      sourceJetCoefficient(row, sourceName, powerIndex),
      limitLift(row, powerIndex)
    ),
    quotientJetLift(row, prefix, powerIndex)
  );
}

function residualSeries({ row, sourceName, prefix }) {
  return Array.from({ length: LOWER_SHIFT_COEFFICIENT_COUNT }, (_, powerIndex) =>
    residualCoefficient({ row, sourceName, prefix, powerIndex })
  );
}

function shiftedTailIdentityResidual({ gResidual, dResidual }, powerIndex) {
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

function intervalHull(seriesRows, fieldName) {
  const intervals = seriesRows.flatMap((row) =>
    row[fieldName].map(numericInterval)
  );
  return root.formatInterval([
    Math.min(...intervals.map(([left]) => left)),
    Math.max(...intervals.map(([, right]) => right)),
  ]);
}

function shiftedTailRow(row) {
  const gResidual = residualSeries({
    row,
    sourceName: "G_pair_coefficients_y0_to_y22",
    prefix: "Q_G",
  });
  const dResidual = residualSeries({
    row,
    sourceName: "D_pair_coefficients_y0_to_y22",
    prefix: "Q_D",
  });
  const identityResidual = Array.from(
    { length: LOWER_SHIFT_COEFFICIENT_COUNT },
    (_, powerIndex) =>
      shiftedTailIdentityResidual({ gResidual, dResidual }, powerIndex)
  );
  const gContainZero = allContainZero(gResidual);
  const dContainZero = allContainZero(dResidual);
  const identityContainZero = allContainZero(identityResidual);
  const predecessorStatus =
    row.row_status ===
    "directed-rounded-first-y-GD-twentieth-order-jet-coefficient-enclosed";

  return {
    cell_id: row.cell_id,
    speed_interval: row.speed_interval,
    first_y_cell: row.first_y_cell,
    predecessor_twentieth_order_row_status: row.row_status,
    shift_power: SHIFT_POWER,
    quotient_tail_order: QUOTIENT_TAIL_ORDER,
    G_shift_source_residual_coefficients_y0_to_y22: gResidual.map(
      root.formatInterval
    ),
    D_shift_source_residual_coefficients_y0_to_y22: dResidual.map(
      root.formatInterval
    ),
    shifted_tail_identity_residual_coefficients_y0_to_y22:
      identityResidual.map(root.formatInterval),
    G_shift_source_coefficients_y0_to_y22_contain_zero: gContainZero,
    D_shift_source_coefficients_y0_to_y22_contain_zero: dContainZero,
    shifted_tail_identity_coefficients_y0_to_y22_contain_zero:
      identityContainZero,
    max_abs_G_shift_source_residual_y0_to_y22: root.formatSmallNumber(
      maxAbsSeries(gResidual)
    ),
    max_abs_D_shift_source_residual_y0_to_y22: root.formatSmallNumber(
      maxAbsSeries(dResidual)
    ),
    max_abs_shifted_tail_identity_residual_y0_to_y22:
      root.formatSmallNumber(maxAbsSeries(identityResidual)),
    raw_y_inverse_division_used: false,
    shifted_tail_operator:
      "Shift_23 first certifies coefficients below y^23 contain zero, then drops those powers symbolically",
    T_G_shifted_tail_formula: "T_G^(21)=Shift_23(P-L-y^2*A_G,20)",
    T_D_shifted_tail_formula: "T_D^(21)=Shift_23(D_pair-L-y^2*A_D,20)",
    T_D_from_T_G_identity: "T_D^(21)=-22*T_G^(21)-y*d_y*T_G^(21)",
    finite_tail_bound_certified: false,
    row_status:
      predecessorStatus && gContainZero && dContainZero && identityContainZero
        ? ROW_CERTIFIED_STATUS
        : "first-y-GD-twenty-first-order-shifted-tail-cancellation-open",
  };
}

function summarizeRows(rows, predecessorArtifact) {
  const predecessorErrors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentiethOrderJetCoefficientIntervalCertificate(
      predecessorArtifact
    );
  const allRowsCertified = rows.every(
    (row) => row.row_status === ROW_CERTIFIED_STATUS
  );
  const allGShiftZeros = rows.every(
    (row) => row.G_shift_source_coefficients_y0_to_y22_contain_zero
  );
  const allDShiftZeros = rows.every(
    (row) => row.D_shift_source_coefficients_y0_to_y22_contain_zero
  );
  const allIdentityZeros = rows.every(
    (row) => row.shifted_tail_identity_coefficients_y0_to_y22_contain_zero
  );
  const allNoRawYDivision = rows.every(
    (row) => row.raw_y_inverse_division_used === false
  );
  const allFiniteTailOpen = rows.every(
    (row) => row.finite_tail_bound_certified === false
  );
  const passed =
    predecessorErrors.length === 0 &&
    allRowsCertified &&
    allGShiftZeros &&
    allDShiftZeros &&
    allIdentityZeros &&
    allNoRawYDivision &&
    allFiniteTailOpen;

  return {
    speed_cell_count: rows.length,
    predecessor_twentieth_order_artifact_valid: predecessorErrors.length === 0,
    predecessor_validation_errors: predecessorErrors,
    all_rows_certified: allRowsCertified,
    all_G_shift_source_coefficients_y0_to_y22_contain_zero: allGShiftZeros,
    all_D_shift_source_coefficients_y0_to_y22_contain_zero: allDShiftZeros,
    all_shifted_tail_identity_coefficients_y0_to_y22_contain_zero:
      allIdentityZeros,
    all_rows_avoid_raw_y_inverse_division: allNoRawYDivision,
    all_finite_tail_bounds_remain_open: allFiniteTailOpen,
    shift_power: SHIFT_POWER,
    quotient_tail_order: QUOTIENT_TAIL_ORDER,
    lower_shift_coefficient_count: LOWER_SHIFT_COEFFICIENT_COUNT,
    G_shift_source_residual_y0_to_y22_hull: intervalHull(
      rows,
      "G_shift_source_residual_coefficients_y0_to_y22"
    ),
    D_shift_source_residual_y0_to_y22_hull: intervalHull(
      rows,
      "D_shift_source_residual_coefficients_y0_to_y22"
    ),
    shifted_tail_identity_residual_y0_to_y22_hull: intervalHull(
      rows,
      "shifted_tail_identity_residual_coefficients_y0_to_y22"
    ),
    max_abs_G_shift_source_residual_y0_to_y22: root.formatSmallNumber(
      maxField(rows, "max_abs_G_shift_source_residual_y0_to_y22")
    ),
    max_abs_D_shift_source_residual_y0_to_y22: root.formatSmallNumber(
      maxField(rows, "max_abs_D_shift_source_residual_y0_to_y22")
    ),
    max_abs_shifted_tail_identity_residual_y0_to_y22: root.formatSmallNumber(
      maxField(rows, "max_abs_shifted_tail_identity_residual_y0_to_y22")
    ),
    max_abs_Q_D_plus_21Q_G_y20_coefficient_interval:
      predecessorArtifact.twentieth_order_jet_summary
        .max_abs_Q_D_plus_21Q_G_y20_coefficient_interval,
    min_Q_G_remaining_twenty_first_order_tail_budget:
      predecessorArtifact.twentieth_order_jet_summary
        .min_Q_G_remaining_twenty_first_order_tail_budget,
    min_Q_D_remaining_twenty_first_order_tail_budget:
      predecessorArtifact.twentieth_order_jet_summary
        .min_Q_D_remaining_twenty_first_order_tail_budget,
    status: passed
      ? CERTIFIED_STATUS
      : "theta3minus-fold-pair-first-y-GD-twenty-first-order-shifted-tail-cancellation-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderShiftedTailCancellationCertificate(
  options = {}
) {
  const predecessorArtifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentiethOrderJetCoefficientIntervalCertificate(
      options
    );
  const rows = predecessorArtifact.twentieth_order_jet_rows.map(shiftedTailRow);
  const summary = summarizeRows(rows, predecessorArtifact);
  const passed = summary.status === CERTIFIED_STATUS;
  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_FIRST_ORDER_SHIFTED_TAIL_CANCELLATION_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twentieth-order-jet-coefficient-interval-certificate.md",
    ],
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-shifted-tail-cancellation-certificate.md",
    shifted_tail_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: root.SPEED_RATIO_ENCLOSURE,
      speed_cell_count: rows.length,
      first_y_cell:
        predecessorArtifact.twentieth_order_jet_parameters.first_y_cell,
      predecessor_series_order:
        predecessorArtifact.twentieth_order_jet_parameters.series_order,
      predecessor_quotient_jet_order: 20,
      quotient_tail_order: QUOTIENT_TAIL_ORDER,
      shift_power: SHIFT_POWER,
      lower_shift_coefficient_count: LOWER_SHIFT_COEFFICIENT_COUNT,
      shift_operator_definition:
        "Shift_n is permitted only after interval-certifying that every coefficient below y^n contains zero; it then drops those powers symbolically instead of dividing by a zero-touching y interval",
      G_shift_input: "P-L-y^2*A_G,20",
      D_shift_input: "D_pair-L-y^2*A_D,20",
      root_graph_shift_target:
        "H_epsilon,21=Shift_21(H_epsilon(y,h_epsilon,<=20+y^21*E,nu)); a finite E_epsilon tube is still required",
    },
    shifted_tail_cancellation_rows: rows,
    shifted_tail_cancellation_summary: summary,
    closure_burndown: [
      {
        row: "theta3minus.fold-pair-first-y-GD-twentieth-order-jet-coefficient",
        status: "directed-rounded-interval-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-twenty-first-order-shifted-tail-cancellation",
        status: passed ? "zero-safe-symbolic-cancellation-certified" : "open",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-twenty-first-order-tail-bound",
        status: "directed-rounded-open",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure",
        status: "blocked-by-twenty-first-order-tail-bound",
      },
      {
        row: "theta3minus.fold-pair-scaled-remainder-continuous-collar",
        status: "blocked-by-directed-rounded-first-y-GD-enclosure",
      },
    ],
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_directed_rounded_first_y_GD_twentieth_order_jet_coefficient_enclosure:
        predecessorArtifact.artifact_claim
          .certifies_directed_rounded_first_y_GD_twentieth_order_jet_coefficient_enclosure,
      certifies_zero_safe_first_y_GD_twenty_first_order_shifted_tail_cancellation:
        passed,
      certifies_shifted_tail_identity_TD_from_TG: passed,
      certifies_directed_rounded_first_y_GD_finite_remainder_bound: false,
      certifies_directed_rounded_first_y_GD_jet_remainder: false,
      certifies_directed_rounded_first_y_GD_jet_enclosure: false,
      certifies_directed_rounded_fold_pair_G_quotient_full_cell_cover: false,
      certifies_directed_rounded_fold_pair_D_quotient_cell_cover: false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_I1_regular_critical_exhaustion: false,
      retained_branch: false,
      claim_level:
        "Zero-safe shifted-tail cancellation certificate for the first-y fold-pair G,D quotient after the certified twentieth-order jet. It certifies that the lower coefficients of P-L-y^2*A_G,20 and D_pair-L-y^2*A_D,20 through y^22 contain zero over all 128 speed cells, records the exact T_D^(21)=-22*T_G^(21)-y*d_y*T_G^(21) tail identity, and licenses Shift_23 as the next evaluator input. It does not bound the continuous twenty-first-order tail.",
    },
    result: {
      theory_status: summary.status,
      first_successor_row:
        "theta3minus.fold-pair-first-y-GD-twenty-first-order-tail-bound-directed-rounded-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The first-y singularity is now factored at the numerator level: the shifted-tail numerators have certified zero lower coefficients through y^22, so the next evaluator can work on T_G^(21) and T_D^(21) without raw division by a zero-touching y interval. The finite tail bound remains open.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderShiftedTailCancellationCertificate(
  artifact
) {
  const errors = [];
  const summary = artifact?.shifted_tail_cancellation_summary;
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_FIRST_ORDER_SHIFTED_TAIL_CANCELLATION_CERTIFICATE_SCHEMA,
    "schema must match theta3minus fold-pair first-y G/D shifted-tail cancellation certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus fold-pair first-y G/D shifted-tail packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.shifted_tail_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "shifted-tail certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.shifted_tail_parameters?.speed_band === undefined &&
      artifact?.shifted_tail_parameters?.speed_window === undefined &&
      artifact?.shifted_tail_parameters?.speed_min === undefined &&
      artifact?.shifted_tail_parameters?.speed_max === undefined,
    "shifted-tail parameters must not contain speed-band fields",
    errors
  );
  assertField(
    summary?.status === CERTIFIED_STATUS &&
      summary?.speed_cell_count === SPEED_CELL_COUNT &&
      summary?.predecessor_twentieth_order_artifact_valid === true &&
      summary?.all_rows_certified === true &&
      summary?.all_G_shift_source_coefficients_y0_to_y22_contain_zero ===
        true &&
      summary?.all_D_shift_source_coefficients_y0_to_y22_contain_zero ===
        true &&
      summary?.all_shifted_tail_identity_coefficients_y0_to_y22_contain_zero ===
        true &&
      summary?.all_rows_avoid_raw_y_inverse_division === true &&
      summary?.all_finite_tail_bounds_remain_open === true &&
      summary?.shift_power === SHIFT_POWER &&
      summary?.quotient_tail_order === QUOTIENT_TAIL_ORDER &&
      summary?.lower_shift_coefficient_count ===
        LOWER_SHIFT_COEFFICIENT_COUNT &&
      Number(summary?.max_abs_G_shift_source_residual_y0_to_y22) < 4e10 &&
      Number(summary?.max_abs_D_shift_source_residual_y0_to_y22) < 8e11 &&
      Number(summary?.max_abs_shifted_tail_identity_residual_y0_to_y22) <
        1.5e12 &&
      Number(summary?.min_Q_G_remaining_twenty_first_order_tail_budget) >
        1e56 &&
      Number(summary?.min_Q_D_remaining_twenty_first_order_tail_budget) >
        1e56,
    "shifted-tail rows must certify lower-coefficient cancellation, identity residual containment, no raw y division, and open finite-tail status",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_directed_rounded_first_y_GD_twentieth_order_jet_coefficient_enclosure ===
      true &&
      artifact?.artifact_claim
        ?.certifies_zero_safe_first_y_GD_twenty_first_order_shifted_tail_cancellation ===
        true &&
      artifact?.artifact_claim?.certifies_shifted_tail_identity_TD_from_TG ===
        true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_finite_remainder_bound ===
        false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_jet_remainder === false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_jet_enclosure === false &&
      artifact?.artifact_claim?.certifies_directed_rounded_fold_pair_scaled_remainder ===
        false &&
      artifact?.artifact_claim?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact claim must keep finite tail, full quotient, scaled remainder, I1, and retention open",
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
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-shifted-tail-cancellation-certificate.mjs [options]",
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
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_FIRST_ORDER_SHIFTED_TAIL_CANCELLATION_CERTIFICATE_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderShiftedTailCancellationCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  const artifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderShiftedTailCancellationCertificate(
      options
    );
  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderShiftedTailCancellationCertificate(
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
