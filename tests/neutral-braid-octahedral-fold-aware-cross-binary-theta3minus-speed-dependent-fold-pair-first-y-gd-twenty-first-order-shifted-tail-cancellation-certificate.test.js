import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_FIRST_ORDER_SHIFTED_TAIL_CANCELLATION_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderShiftedTailCancellationCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderShiftedTailCancellationCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-shifted-tail-cancellation-certificate.mjs";

const EXPECTED_STATUS =
  "zero-safe-theta3minus-fold-pair-first-y-GD-twenty-first-order-shifted-tail-cancellation-certified";
const NO_SPEED_WINDOW =
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderShiftedTailCancellationCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-shifted-tail-cancellation-certificate.mjs"
  );
}

test("theta3minus fold-pair first-y G/D twenty-first-order shifted-tail cancellation certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderShiftedTailCancellationCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_FIRST_ORDER_SHIFTED_TAIL_CANCELLATION_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_twenty_first_order_shifted_tail_cancellation_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("twenty-first-order shifted-tail certificate imposes no fixed speed band", () => {
  const packet = artifact();

  assert.equal(packet.shifted_tail_parameters.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(packet.shifted_tail_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(packet.shifted_tail_parameters.speed_band, undefined);
  assert.equal(packet.shifted_tail_parameters.speed_window, undefined);
  assert.equal(packet.shifted_tail_parameters.speed_min, undefined);
  assert.equal(packet.shifted_tail_parameters.speed_max, undefined);
});

test("twenty-first-order shifted-tail rows certify zero-safe lower-coefficient cancellation", () => {
  const packet = artifact();
  const summary = packet.shifted_tail_cancellation_summary;
  const firstRow = packet.shifted_tail_cancellation_rows[0];

  assert.equal(summary.speed_cell_count, 128);
  assert.equal(summary.predecessor_twentieth_order_artifact_valid, true);
  assert.deepEqual(summary.predecessor_validation_errors, []);
  assert.equal(summary.all_rows_certified, true);
  assert.equal(
    summary.all_G_shift_source_coefficients_y0_to_y22_contain_zero,
    true
  );
  assert.equal(
    summary.all_D_shift_source_coefficients_y0_to_y22_contain_zero,
    true
  );
  assert.equal(
    summary.all_shifted_tail_identity_coefficients_y0_to_y22_contain_zero,
    true
  );
  assert.equal(summary.all_rows_avoid_raw_y_inverse_division, true);
  assert.equal(summary.all_finite_tail_bounds_remain_open, true);
  assert.equal(summary.shift_power, 23);
  assert.equal(summary.quotient_tail_order, 21);
  assert.equal(summary.lower_shift_coefficient_count, 23);
  assert.deepEqual(summary.G_shift_source_residual_y0_to_y22_hull, [
    -33829901995.5,
    33829901995.5,
  ]);
  assert.deepEqual(summary.D_shift_source_residual_y0_to_y22_hull, [
    -710427941905,
    710427941905,
  ]);
  assert.deepEqual(summary.shifted_tail_identity_residual_y0_to_y22_hull, [
    -1420855883810,
    1420855883810,
  ]);
  assert.ok(Number(summary.max_abs_G_shift_source_residual_y0_to_y22) < 4e10);
  assert.ok(Number(summary.max_abs_D_shift_source_residual_y0_to_y22) < 8e11);
  assert.ok(
    Number(summary.max_abs_shifted_tail_identity_residual_y0_to_y22) < 1.5e12
  );
  assert.ok(
    Number(summary.min_Q_G_remaining_twenty_first_order_tail_budget) > 1e56
  );
  assert.ok(
    Number(summary.min_Q_D_remaining_twenty_first_order_tail_budget) > 1e56
  );
  assert.equal(firstRow.shift_power, 23);
  assert.equal(firstRow.quotient_tail_order, 21);
  assert.equal(firstRow.raw_y_inverse_division_used, false);
  assert.equal(firstRow.finite_tail_bound_certified, false);
  assert.equal(
    firstRow.row_status,
    "zero-safe-first-y-GD-twenty-first-order-shifted-tail-cancellation-enclosed"
  );
});

test("twenty-first-order shifted-tail certificate keeps finite tail and downstream closure open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_twentieth_order_jet_coefficient_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_zero_safe_first_y_GD_twenty_first_order_shifted_tail_cancellation,
    true
  );
  assert.equal(packet.artifact_claim.certifies_shifted_tail_identity_TD_from_TG, true);
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_finite_remainder_bound,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_remainder,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder,
    false
  );
  assert.equal(packet.artifact_claim.certifies_I1_regular_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(
    packet.result.first_successor_row,
    "theta3minus.fold-pair-first-y-GD-twenty-first-order-tail-bound-directed-rounded-required"
  );
});

test("twenty-first-order shifted-tail validator rejects invalid controls and overclaims", () => {
  const withSpeedBand = clone(artifact());
  withSpeedBand.shifted_tail_parameters.speed_band = "forbidden";
  assert.ok(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderShiftedTailCancellationCertificate(
      withSpeedBand
    ).includes("shifted-tail parameters must not contain speed-band fields")
  );

  const overclaim = clone(artifact());
  overclaim.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound =
    true;
  overclaim.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure =
    true;
  overclaim.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder =
    true;
  assert.ok(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderShiftedTailCancellationCertificate(
      overclaim
    ).includes(
      "artifact claim must keep finite tail, full quotient, scaled remainder, I1, and retention open"
    )
  );
});

test("twenty-first-order shifted-tail CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "theta3minus-shifted-tail-")
  );
  const outPath = path.join(tmpDir, "artifact.json");
  execFileSync(process.execPath, [scriptPath(), "--out", outPath], {
    encoding: "utf8",
  });
  const validateOutput = execFileSync(
    process.execPath,
    [scriptPath(), "--validate", outPath],
    { encoding: "utf8" }
  );
  assert.deepEqual(JSON.parse(validateOutput), { valid: true, errors: [] });
});
