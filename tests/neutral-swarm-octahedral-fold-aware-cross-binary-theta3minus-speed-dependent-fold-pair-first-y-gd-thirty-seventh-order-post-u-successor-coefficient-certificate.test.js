import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_THIRTY_SEVENTH_ORDER_POST_U_SUCCESSOR_COEFFICIENT_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtySeventhOrderPostUSuccessorCoefficientCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtySeventhOrderPostUSuccessorCoefficientCertificate,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-seventh-order-post-u-successor-coefficient-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-thirty-seventh-order-post-U-successor-coefficient-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtySeventhOrderPostUSuccessorCoefficientCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-seventh-order-post-u-successor-coefficient-certificate.mjs"
  );
}

test("theta3minus fold-pair first-y G/D thirty-seventh-order post-U successor coefficient certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtySeventhOrderPostUSuccessorCoefficientCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_THIRTY_SEVENTH_ORDER_POST_U_SUCCESSOR_COEFFICIENT_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_thirty_seventh_order_post_u_successor_coefficient_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("thirty-seventh-order post-U successor coefficient certificate imposes no fixed speed band", () => {
  const packet = artifact();
  const params =
    packet.thirty_seventh_order_post_u_successor_coefficient_parameters;

  assert.equal(params.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(params.speed_ratio_enclosure, [3.02156, 3.02157]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(params.speed_band, undefined);
  assert.equal(params.speed_window, undefined);
  assert.equal(params.speed_min, undefined);
  assert.equal(params.speed_max, undefined);
});

test("thirty-seventh-order post-U successor coefficient intervals certify h37 and Q_G/Q_D y37 coefficients", () => {
  const packet = artifact();
  const summary =
    packet.thirty_seventh_order_post_u_successor_coefficient_summary;
  const firstRow =
    packet.thirty_seventh_order_post_u_successor_coefficient_rows[0];

  assert.equal(summary.speed_cell_count, 128);
  assert.equal(summary.branch_cell_count, 256);
  assert.equal(summary.predecessor_h36_artifact_valid, true);
  assert.equal(summary.all_rows_certified, true);
  assert.equal(
    summary.all_source_equation_coefficients_contain_zero_y0_to_y41,
    true
  );
  assert.ok(
    Number(summary.max_abs_source_equation_coeff_y0_to_y41_interval) < 8.1e23
  );
  assert.ok(Number(summary.min_h37_solve_slope_clearance) > 0.79);
  assert.deepEqual(summary.h37_interval_hull, [
    -3.10889437276e23,
    3.10889434346e23,
  ]);
  assert.deepEqual(summary.Q_G_y37_coefficient_interval_hull, [
    -2.64838543511e23,
    2.64838543511e23,
  ]);
  assert.deepEqual(summary.Q_D_y37_coefficient_interval_hull, [
    -1.00638646534e25,
    1.00638646534e25,
  ]);
  assert.ok(Number(summary.max_abs_h37_interval) < 3.2e23);
  assert.ok(Number(summary.max_abs_Q_G_y37_coefficient_interval) < 2.7e23);
  assert.ok(Number(summary.max_abs_Q_D_y37_coefficient_interval) < 1.1e25);
  assert.ok(Number(summary.max_Q_G_y37_loss_on_first_y_cell) < 7e-79);
  assert.ok(Number(summary.max_Q_D_y37_loss_on_first_y_cell) < 2.7e-77);
  assert.equal(
    summary.all_QD_QG_coefficient_identity_intervals_contain_zero,
    true
  );
  assert.ok(
    Number(summary.max_abs_Q_D_plus_38Q_G_y37_coefficient_interval) < 2.1e25
  );
  assert.ok(firstRow.Q_D_plus_38Q_G_y37_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_38Q_G_y37_coefficient_interval[1] >= 0);
  assert.ok(
    Number(summary.min_Q_G_remaining_thirty_eighth_order_tail_budget) > 1.8e103
  );
  assert.ok(
    Number(summary.min_Q_D_remaining_thirty_eighth_order_tail_budget) > 1.8e103
  );
  assert.equal(
    firstRow.row_status,
    "directed-rounded-first-y-GD-thirty-seventh-order-post-U-successor-coefficient-enclosed"
  );
});

test("thirty-seventh-order post-U successor coefficient certificate keeps tube, continuous tail, and retention open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_thirty_seventh_order_post_u_successor_coefficient_enclosure,
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
    "theta3minus.fold-pair-first-y-GD-thirty-eighth-order-successor-tail-bound-required"
  );
});

test("thirty-seventh-order post-U successor coefficient validator rejects speed-band fields and overclaims", () => {
  const packet = clone(artifact());
  packet.thirty_seventh_order_post_u_successor_coefficient_parameters.speed_band =
    "forbidden";
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_successor_root_tail_tube = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder = true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtySeventhOrderPostUSuccessorCoefficientCertificate(
      packet
    );

  assert.ok(
    errors.includes(
      "first-y thirty-seventh-order post-U successor coefficient parameters must not contain speed-band fields"
    )
  );
  assert.ok(
    errors.includes(
      "artifact claim must keep finite successor tube, continuous tail, full quotient, scaled remainder, I1, and retention open"
    )
  );
});

test("thirty-seventh-order post-U successor coefficient CLI writes and validates artifact JSON", () => {
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
