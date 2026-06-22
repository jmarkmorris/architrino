import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_SIXTH_ORDER_POST_U_SUCCESSOR_COEFFICIENT_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySixthOrderPostUSuccessorCoefficientCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySixthOrderPostUSuccessorCoefficientCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-sixth-order-post-u-successor-coefficient-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-twenty-sixth-order-post-U-successor-coefficient-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySixthOrderPostUSuccessorCoefficientCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-sixth-order-post-u-successor-coefficient-certificate.mjs"
  );
}

test("theta3minus fold-pair first-y G/D twenty-sixth-order post-U successor coefficient certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySixthOrderPostUSuccessorCoefficientCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_SIXTH_ORDER_POST_U_SUCCESSOR_COEFFICIENT_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_twenty_sixth_order_post_u_successor_coefficient_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("twenty-sixth-order post-U successor coefficient certificate imposes no fixed speed band", () => {
  const packet = artifact();
  const params =
    packet.twenty_sixth_order_post_u_successor_coefficient_parameters;

  assert.equal(params.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(params.speed_ratio_enclosure, [3.02156, 3.02157]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(params.speed_band, undefined);
  assert.equal(params.speed_window, undefined);
  assert.equal(params.speed_min, undefined);
  assert.equal(params.speed_max, undefined);
});

test("twenty-sixth-order post-U successor coefficient intervals certify h26 and Q_G/Q_D y26 coefficients", () => {
  const packet = artifact();
  const summary =
    packet.twenty_sixth_order_post_u_successor_coefficient_summary;
  const firstRow =
    packet.twenty_sixth_order_post_u_successor_coefficient_rows[0];

  assert.equal(summary.speed_cell_count, 128);
  assert.equal(summary.branch_cell_count, 256);
  assert.equal(summary.predecessor_h25_artifact_valid, true);
  assert.equal(summary.all_rows_certified, true);
  assert.equal(
    summary.all_source_equation_coefficients_contain_zero_y0_to_y30,
    true
  );
  assert.ok(
    Number(summary.max_abs_source_equation_coeff_y0_to_y30_interval) < 2.4e15
  );
  assert.ok(Number(summary.min_h26_solve_slope_clearance) > 0.79);
  assert.deepEqual(summary.h26_interval_hull, [
    -908343826729000,
    908343826729000,
  ]);
  assert.deepEqual(summary.Q_G_y26_coefficient_interval_hull, [
    -773778357003000,
    773775566334000,
  ]);
  assert.deepEqual(summary.Q_D_y26_coefficient_interval_hull, [
    -20891940291000000,
    20892015639100000,
  ]);
  assert.ok(Number(summary.max_abs_h26_interval) < 9.1e14);
  assert.ok(Number(summary.max_abs_Q_G_y26_coefficient_interval) < 7.8e14);
  assert.ok(Number(summary.max_abs_Q_D_y26_coefficient_interval) < 2.1e16);
  assert.ok(Number(summary.max_Q_G_y26_loss_on_first_y_cell) < 3.3e-57);
  assert.ok(Number(summary.max_Q_D_y26_loss_on_first_y_cell) < 8.7e-56);
  assert.equal(
    summary.all_QD_QG_coefficient_identity_intervals_contain_zero,
    true
  );
  assert.ok(
    Number(summary.max_abs_Q_D_plus_27Q_G_y26_coefficient_interval) < 4.2e16
  );
  assert.ok(firstRow.Q_D_plus_27Q_G_y26_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_27Q_G_y26_coefficient_interval[1] >= 0);
  assert.ok(
    Number(summary.min_Q_G_remaining_twenty_seventh_order_tail_budget) >
      1.1e73
  );
  assert.ok(
    Number(summary.min_Q_D_remaining_twenty_seventh_order_tail_budget) >
      1.1e73
  );
  assert.equal(
    firstRow.row_status,
    "directed-rounded-first-y-GD-twenty-sixth-order-post-U-successor-coefficient-enclosed"
  );
});

test("twenty-sixth-order post-U successor coefficient certificate keeps tube, continuous tail, and retention open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_twenty_sixth_order_post_u_successor_coefficient_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_finite_successor_root_tail_tube,
    false
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound,
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
    "theta3minus.fold-pair-first-y-GD-finite-shift31-next-successor-root-tail-tube-directed-rounded-required"
  );
});

test("twenty-sixth-order post-U successor coefficient validator rejects speed-band fields and overclaims", () => {
  const packet = clone(artifact());
  packet.twenty_sixth_order_post_u_successor_coefficient_parameters.speed_band =
    "forbidden";
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_successor_root_tail_tube = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder = true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySixthOrderPostUSuccessorCoefficientCertificate(
      packet
    );

  assert.ok(
    errors.includes(
      "first-y twenty-sixth-order post-U successor coefficient parameters must not contain speed-band fields"
    )
  );
  assert.ok(
    errors.includes(
      "artifact claim must keep finite successor tube, continuous tail, full quotient, scaled remainder, I1, and retention open"
    )
  );
});

test("twenty-sixth-order post-U successor coefficient CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "theta3minus-first-y-post-u-successor-")
  );
  const outPath = path.join(tmpDir, "artifact.json");

  execFileSync(process.execPath, [scriptPath(), "--out", outPath]);
  const validateOutput = JSON.parse(
    execFileSync(process.execPath, [scriptPath(), "--validate", outPath], {
      encoding: "utf8",
    })
  );

  assert.equal(validateOutput.valid, true);
  const packet = JSON.parse(fs.readFileSync(outPath, "utf8"));
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});
