#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderRootTailSeedCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderRootTailSeedCertificate,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-root-tail-seed-certificate.mjs";
import {
  theta3minusFoldPairScaledRootTubeCellInternals as root,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_E_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-e-root-tail-tube-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_finite_e_root_tail_tube_certificate";
const PROMOTION_STATUS = "priority-only";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const FIRST_Y_CELL_UPPER = 0.115 / 64;
const SPEED_CELL_COUNT = 128;
const DEFAULT_Y_SUBCELL_COUNT = 16;
const DEFAULT_E_TUBE_PADDING = 1e16;
const CERTIFIED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-finite-E-root-tail-tube-obstruction-certified";
const ROW_CERTIFIED_STATUS =
  "direct-H-finite-E-root-tail-tube-obstruction-certified";

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

function validateETubePadding(value) {
  const padding = Number(value);
  if (!Number.isFinite(padding) || padding <= 0) {
    throw new Error("eTubePadding must be a positive finite number");
  }
  return padding;
}

function hPolynomialThroughTwenty(branchRow, yInterval) {
  let sum = [0, 0];
  let power = [1, 1];
  for (let index = 0; index <= 20; index += 1) {
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

function hWithEInterval({ branchRow, yInterval, eInterval }) {
  return root.addIntervals(
    hPolynomialThroughTwenty(branchRow, yInterval),
    root.multiplyIntervals(root.positivePowerInterval(yInterval, 21), eInterval)
  );
}

function eTubeForBranch(branchRow, padding) {
  const seed = numericInterval(branchRow.h21_interval);
  return root.outwardInterval([seed[0] - padding, seed[1] + padding]);
}

function eTubeEndpointIntervals(branchRow, padding) {
  const seed = numericInterval(branchRow.h21_interval);
  return {
    left: root.pointInterval(seed[0] - padding),
    right: root.pointInterval(seed[1] + padding),
    tube: eTubeForBranch(branchRow, padding),
    seed,
  };
}

function expectedEndpointSigns(branch) {
  if (branch === "-") {
    return { left: "-", right: "+", derivative: "+" };
  }
  return { left: "+", right: "-", derivative: "-" };
}

function directPartialEInterval({ jInterval, yInterval }) {
  return root.multiplyIntervals(jInterval, root.positivePowerInterval(yInterval, 21));
}

function requiredAdditionalPadding({ leftH, rightH, partialEClearance, expected }) {
  if (partialEClearance <= 0) {
    return Infinity;
  }
  const leftNeed =
    expected.left === "-"
      ? Math.max(0, leftH[1]) / partialEClearance
      : Math.max(0, -leftH[0]) / partialEClearance;
  const rightNeed =
    expected.right === "+"
      ? Math.max(0, -rightH[0]) / partialEClearance
      : Math.max(0, rightH[1]) / partialEClearance;
  return Math.max(leftNeed, rightNeed);
}

function directProbeRow({
  speedIndex,
  yIndex,
  yInterval,
  branchRow,
  cell,
  eTubePadding,
}) {
  const expected = expectedEndpointSigns(branchRow.branch);
  const sign = root.branchSign(branchRow.branch);
  const endpoints = eTubeEndpointIntervals(branchRow, eTubePadding);
  const leftH = root.branchHInterval({
    cell,
    yInterval,
    hInterval: hWithEInterval({
      branchRow,
      yInterval,
      eInterval: endpoints.left,
    }),
    sign,
  });
  const rightH = root.branchHInterval({
    cell,
    yInterval,
    hInterval: hWithEInterval({
      branchRow,
      yInterval,
      eInterval: endpoints.right,
    }),
    sign,
  });
  const tubeH = hWithEInterval({
    branchRow,
    yInterval,
    eInterval: endpoints.tube,
  });
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
  const directPartialE = directPartialEInterval({ jInterval, yInterval });
  const leftSign = root.intervalSignAndClearance(leftH);
  const rightSign = root.intervalSignAndClearance(rightH);
  const jSign = root.intervalSignAndClearance(jInterval);
  const directPartialESign = root.intervalSignAndClearance(directPartialE);
  const endpointSignsCertified =
    leftSign.sign === expected.left && rightSign.sign === expected.right;
  const directJCertified = jSign.sign === expected.derivative;
  const directPartialECertified =
    directPartialESign.sign === expected.derivative;
  const requiredPadding = requiredAdditionalPadding({
    leftH,
    rightH,
    partialEClearance: directPartialESign.clearance,
    expected,
  });
  return {
    cell_id: `speed.${speedIndex}.first-y-positive.${yIndex}.${branchRow.branch}`,
    speed_cell_id: `speed.${speedIndex}`,
    positive_y_subcell_index: yIndex,
    branch: branchRow.branch,
    y_interval: root.formatInterval(yInterval),
    E_seed_interval: root.formatInterval(endpoints.seed),
    E_tube_interval: root.formatInterval(endpoints.tube),
    E_tube_abs_upper: root.formatSmallNumber(maxAbsInterval(endpoints.tube)),
    direct_H_left_endpoint_interval: root.formatInterval(leftH),
    direct_H_left_endpoint_sign: leftSign.sign,
    direct_H_left_endpoint_clearance: root.formatSmallNumber(leftSign.clearance),
    direct_H_right_endpoint_interval: root.formatInterval(rightH),
    direct_H_right_endpoint_sign: rightSign.sign,
    direct_H_right_endpoint_clearance: root.formatSmallNumber(
      rightSign.clearance
    ),
    direct_H_endpoint_signs_certified: endpointSignsCertified,
    direct_J_interval: root.formatInterval(jInterval),
    direct_J_sign: jSign.sign,
    direct_J_clearance: root.formatSmallNumber(jSign.clearance),
    direct_J_sign_certified: directJCertified,
    direct_partial_E_H_interval: root.formatInterval(directPartialE),
    direct_partial_E_H_sign: directPartialESign.sign,
    direct_partial_E_H_clearance: root.formatSmallNumber(
      directPartialESign.clearance
    ),
    direct_partial_E_H_sign_certified: directPartialECertified,
    direct_required_additional_E_padding_for_endpoint_signs:
      root.formatSmallNumber(requiredPadding),
    direct_H_left_endpoint_contains_zero: containsZero(leftH),
    direct_H_right_endpoint_contains_zero: containsZero(rightH),
    shift_25_evaluator_status: "required-not-yet-certified",
    finite_E_root_tail_tube_certified: false,
    raw_y_inverse_division_used: false,
    row_status:
      !endpointSignsCertified &&
      directJCertified &&
      directPartialECertified &&
      containsZero(leftH) &&
      containsZero(rightH)
        ? ROW_CERTIFIED_STATUS
        : "direct-H-finite-E-root-tail-tube-obstruction-open",
  };
}

function buildDirectProbeRows({
  seedArtifact,
  speedBreaks,
  foldRows,
  ySubcellCount,
  eTubePadding,
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
    const seedRow = seedArtifact.twenty_first_order_root_tail_seed_rows[speedIndex];
    for (let yIndex = 1; yIndex < ySubcellCount; yIndex += 1) {
      const yInterval = root.outwardInterval([
        (FIRST_Y_CELL_UPPER * yIndex) / ySubcellCount,
        (FIRST_Y_CELL_UPPER * (yIndex + 1)) / ySubcellCount,
      ]);
      seedRow.branch_rows.forEach((branchRow) => {
        rows.push(
          directProbeRow({
            speedIndex,
            yIndex,
            yInterval,
            branchRow,
            cell,
            eTubePadding,
          })
        );
      });
    }
  }
  return rows;
}

function summarizeRows({ rows, seedArtifact, ySubcellCount, eTubePadding }) {
  const seedErrors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderRootTailSeedCertificate(
      seedArtifact
    );
  const allRowsCertified = rows.every((row) => row.row_status === ROW_CERTIFIED_STATUS);
  const allEndpointSignsFail = rows.every(
    (row) => row.direct_H_endpoint_signs_certified === false
  );
  const allEndpointIntervalsContainZero = rows.every(
    (row) =>
      row.direct_H_left_endpoint_contains_zero === true &&
      row.direct_H_right_endpoint_contains_zero === true
  );
  const allJSignsCertified = rows.every((row) => row.direct_J_sign_certified);
  const allPartialESignsCertified = rows.every(
    (row) => row.direct_partial_E_H_sign_certified
  );
  const allNoRawYDivision = rows.every(
    (row) => row.raw_y_inverse_division_used === false
  );
  const allFiniteTubesOpen = rows.every(
    (row) => row.finite_E_root_tail_tube_certified === false
  );
  const allShift25Open = rows.every(
    (row) => row.shift_25_evaluator_status === "required-not-yet-certified"
  );
  const passed =
    seedErrors.length === 0 &&
    allRowsCertified &&
    allEndpointSignsFail &&
    allEndpointIntervalsContainZero &&
    allJSignsCertified &&
    allPartialESignsCertified &&
    allNoRawYDivision &&
    allFiniteTubesOpen &&
    allShift25Open;
  return {
    speed_cell_count: SPEED_CELL_COUNT,
    branch_count: 2,
    first_y_cell: [0, root.formatSmallNumber(FIRST_Y_CELL_UPPER)],
    y_subcell_count: ySubcellCount,
    positive_y_subcell_count: ySubcellCount - 1,
    direct_probe_row_count: rows.length,
    E_tube_padding: root.formatSmallNumber(eTubePadding),
    seed_artifact_valid: seedErrors.length === 0,
    seed_validation_errors: seedErrors,
    all_rows_certified: allRowsCertified,
    all_direct_H_endpoint_signs_fail: allEndpointSignsFail,
    all_direct_H_endpoint_intervals_contain_zero: allEndpointIntervalsContainZero,
    all_direct_J_signs_certified: allJSignsCertified,
    all_direct_partial_E_H_signs_certified: allPartialESignsCertified,
    all_rows_avoid_raw_y_inverse_division: allNoRawYDivision,
    all_finite_E_root_tail_tubes_remain_open: allFiniteTubesOpen,
    all_shift_25_evaluators_remain_open: allShift25Open,
    min_direct_J_clearance: root.formatSmallNumber(
      minField(rows, "direct_J_clearance")
    ),
    min_direct_partial_E_H_clearance: root.formatSmallNumber(
      minField(rows, "direct_partial_E_H_clearance")
    ),
    max_direct_required_additional_E_padding_for_endpoint_signs:
      root.formatSmallNumber(
        maxField(rows, "direct_required_additional_E_padding_for_endpoint_signs")
      ),
    max_E_tube_abs_upper: root.formatSmallNumber(
      maxField(rows, "E_tube_abs_upper")
    ),
    direct_H_left_endpoint_interval_hull: coefficientHull(
      rows.map((row) => numericInterval(row.direct_H_left_endpoint_interval))
    ),
    direct_H_right_endpoint_interval_hull: coefficientHull(
      rows.map((row) => numericInterval(row.direct_H_right_endpoint_interval))
    ),
    inherited_h21_interval_hull:
      seedArtifact.twenty_first_order_root_tail_seed_summary.h21_interval_hull,
    inherited_Q_G_y21_coefficient_interval_hull:
      seedArtifact.twenty_first_order_root_tail_seed_summary
        .Q_G_y21_coefficient_interval_hull,
    inherited_Q_D_y21_coefficient_interval_hull:
      seedArtifact.twenty_first_order_root_tail_seed_summary
        .Q_D_y21_coefficient_interval_hull,
    inherited_min_Q_G_remaining_twenty_second_order_tail_budget:
      seedArtifact.twenty_first_order_root_tail_seed_summary
        .min_Q_G_remaining_twenty_second_order_tail_budget,
    inherited_min_Q_D_remaining_twenty_second_order_tail_budget:
      seedArtifact.twenty_first_order_root_tail_seed_summary
        .min_Q_D_remaining_twenty_second_order_tail_budget,
    obstruction_statement:
      "direct Taylor-cancelled H evaluation sees E only through y^21*E and cannot resolve the Shift_25 cancellation; a finite shifted residual evaluator R_epsilon=Shift_25(F_epsilon) is required",
    status: passed
      ? CERTIFIED_STATUS
      : "theta3minus-fold-pair-first-y-GD-finite-E-root-tail-tube-obstruction-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteERootTailTubeCertificate(
  options = {}
) {
  const ySubcellCount = validateYSubcellCount(
    options.ySubcellCount ?? DEFAULT_Y_SUBCELL_COUNT
  );
  const eTubePadding = validateETubePadding(
    options.eTubePadding ?? DEFAULT_E_TUBE_PADDING
  );
  const seedArtifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderRootTailSeedCertificate();
  const speedBreaks = root.makeSpeedBreaks(SPEED_CELL_COUNT);
  const normalForm =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm({
      speedSamples: speedBreaks,
      ySamples: [0.115, 0.01, 0.001, 0.0005],
      rootSubdivisions: root.DEFAULT_ROOT_SUBDIVISIONS,
    });
  const rows = buildDirectProbeRows({
    seedArtifact,
    speedBreaks,
    foldRows: normalForm.speed_dependent_fold_normal_form_rows,
    ySubcellCount,
    eTubePadding,
  });
  const summary = summarizeRows({
    rows,
    seedArtifact,
    ySubcellCount,
    eTubePadding,
  });
  const passed = summary.status === CERTIFIED_STATUS;
  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_E_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twentieth-order-jet-coefficient-interval-certificate.md",
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-shifted-tail-cancellation-certificate.md",
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-root-tail-seed-certificate.md",
    ],
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-e-root-tail-tube-certificate.md",
    finite_e_root_tail_tube_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: root.SPEED_RATIO_ENCLOSURE,
      speed_cell_count: SPEED_CELL_COUNT,
      first_y_cell: [0, root.formatSmallNumber(FIRST_Y_CELL_UPPER)],
      y_subcell_count: ySubcellCount,
      positive_y_subcell_count: ySubcellCount - 1,
      E_tube_padding: root.formatSmallNumber(eTubePadding),
      E_tube_definition:
        "E_tube=[h21_left-padding,h21_right+padding] around the certified root-tail seed interval",
      direct_probe_equation:
        "H_epsilon is evaluated by the existing Taylor-cancelled scaled root graph with h=h_<=20+y^21*E; this is a diagnostic obstruction, not Shift_25(F)",
      required_missing_evaluator:
        "R_epsilon(y,E,nu)=Shift_25(F_epsilon(y,h_<=20+y^21*E,nu)) with analytic finite-y remainder control",
      raw_y_inverse_division_used: false,
    },
    finite_e_root_tail_tube_rows: rows,
    finite_e_root_tail_tube_summary: summary,
    closure_burndown: [
      {
        row: "theta3minus.fold-pair-first-y-GD-twenty-first-order-root-tail-seed",
        status: "directed-rounded-interval-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-direct-H-finite-E-obstruction",
        status: passed ? "directed-rounded-obstruction-certified" : "open",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-finite-shift25-E-root-tail-tube",
        status: "requires-Shift_25-finite-y-evaluator",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure",
        status: "blocked-by-finite-E-root-tail-tube",
      },
      {
        row: "theta3minus.fold-pair-scaled-remainder-continuous-collar",
        status: "blocked-by-directed-rounded-first-y-GD-enclosure",
      },
    ],
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_direct_H_obstruction_to_finite_E_root_tail_tube: passed,
      certifies_shift_25_finite_y_residual_evaluator: false,
      certifies_directed_rounded_first_y_GD_finite_E_root_tail_tube: false,
      certifies_directed_rounded_first_y_GD_finite_remainder_bound: false,
      certifies_directed_rounded_first_y_GD_jet_enclosure: false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_I1_regular_critical_exhaustion: false,
      retained_branch: false,
      claim_level:
        "Directed-rounded obstruction certificate for the finite E_epsilon root-tail tube route: the existing direct Taylor-cancelled H evaluator preserves J and direct partial_E H signs on positive first-y subcells, but every tested endpoint interval remains zero-containing even with a large E tube. This proves the next required object is a finite-y Shift_25 residual evaluator, not more raw H endpoint probing.",
    },
    result: {
      theory_status: summary.status,
      first_successor_row:
        "theta3minus.fold-pair-first-y-GD-finite-shift25-E-root-tail-tube-evaluator-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The direct finite-y H route cannot certify the E tube because E enters the unshifted scaled graph as y^21*E. The finite tube remains open, now with a quantified obstruction and a precise successor: construct Shift_25(F_epsilon) with analytic finite-y remainder control.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteERootTailTubeCertificate(
  artifact
) {
  const errors = [];
  const summary = artifact?.finite_e_root_tail_tube_summary;
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_E_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA,
    "schema must match theta3minus fold-pair first-y G/D finite E root-tail tube certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus fold-pair first-y G/D finite E root-tail tube packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.finite_e_root_tail_tube_parameters?.speed_constraint ===
      NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "finite E root-tail tube certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.finite_e_root_tail_tube_parameters?.speed_band === undefined &&
      artifact?.finite_e_root_tail_tube_parameters?.speed_window === undefined &&
      artifact?.finite_e_root_tail_tube_parameters?.speed_min === undefined &&
      artifact?.finite_e_root_tail_tube_parameters?.speed_max === undefined,
    "finite E root-tail tube parameters must not contain speed-band fields",
    errors
  );
  assertField(
    summary?.status === CERTIFIED_STATUS &&
      summary?.speed_cell_count === SPEED_CELL_COUNT &&
      summary?.seed_artifact_valid === true &&
      summary?.all_rows_certified === true &&
      summary?.all_direct_H_endpoint_signs_fail === true &&
      summary?.all_direct_H_endpoint_intervals_contain_zero === true &&
      summary?.all_direct_J_signs_certified === true &&
      summary?.all_direct_partial_E_H_signs_certified === true &&
      summary?.all_rows_avoid_raw_y_inverse_division === true &&
      summary?.all_finite_E_root_tail_tubes_remain_open === true &&
      summary?.all_shift_25_evaluators_remain_open === true &&
      Number(summary?.min_direct_J_clearance) > 0.79 &&
      Number(summary?.min_direct_partial_E_H_clearance) > 0 &&
      Number(summary?.max_direct_required_additional_E_padding_for_endpoint_signs) >
        1e80 &&
      Number(summary?.inherited_min_Q_G_remaining_twenty_second_order_tail_budget) >
        1e59 &&
      Number(summary?.inherited_min_Q_D_remaining_twenty_second_order_tail_budget) >
        1e59,
    "finite E rows must certify the direct-H obstruction, preserved direct derivative signs, no raw y division, open finite tube, and inherited tail budgets",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_direct_H_obstruction_to_finite_E_root_tail_tube === true &&
      artifact?.artifact_claim?.certifies_shift_25_finite_y_residual_evaluator ===
        false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_finite_E_root_tail_tube ===
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
    "artifact claim must keep Shift_25 evaluator, finite E tube, full quotient, scaled remainder, I1, and retention open",
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
    } else if (arg === "--e-tube-padding") {
      options.eTubePadding = argv[++index];
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-e-root-tail-tube-certificate.mjs [options]",
    "",
    "Options:",
    "  --out <path>                 Write artifact JSON",
    "  --validate <path>            Validate an artifact JSON",
    "  --schema                     Print artifact schema metadata",
    "  --y-subcell-count <count>    Positive-y diagnostic subcell count",
    "  --e-tube-padding <value>     Padding around each certified h21 seed interval",
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
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_E_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteERootTailTubeCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  try {
    const artifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteERootTailTubeCertificate(
        options
      );
    const errors =
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteERootTailTubeCertificate(
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
