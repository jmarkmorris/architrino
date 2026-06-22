import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_THIRTY_FOURTH_ORDER_POST_U_SUCCESSOR_COEFFICIENT_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyFourthOrderPostUSuccessorCoefficientCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyFourthOrderPostUSuccessorCoefficientCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-fourth-order-post-u-successor-coefficient-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-thirty-fourth-order-post-U-successor-coefficient-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyFourthOrderPostUSuccessorCoefficientCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-fourth-order-post-u-successor-coefficient-certificate.mjs"
  );
}

test("theta3minus fold-pair first-y G/D thirty-fourth-order post-U successor coefficient certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyFourthOrderPostUSuccessorCoefficientCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_THIRTY_FOURTH_ORDER_POST_U_SUCCESSOR_COEFFICIENT_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_thirty_fourth_order_post_u_successor_coefficient_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("thirty-fourth-order post-U successor coefficient certificate imposes no fixed speed band", () => {
  const packet = artifact();
  const params =
    packet.thirty_fourth_order_post_u_successor_coefficient_parameters;

  assert.equal(params.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(params.speed_ratio_enclosure, [3.02156, 3.02157]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(params.speed_band, undefined);
  assert.equal(params.speed_window, undefined);
  assert.equal(params.speed_min, undefined);
  assert.equal(params.speed_max, undefined);
});

test("thirty-fourth-order post-U successor coefficient intervals certify h34 and Q_G/Q_D y34 coefficients", () => {
  const packet = artifact();
  const summary =
    packet.thirty_fourth_order_post_u_successor_coefficient_summary;
  const firstRow =
    packet.thirty_fourth_order_post_u_successor_coefficient_rows[0];

  assert.equal(summary.speed_cell_count, 128);
  assert.equal(summary.branch_cell_count, 256);
  assert.equal(summary.predecessor_h33_artifact_valid, true);
  assert.equal(summary.all_rows_certified, true);
  assert.equal(
    summary.all_source_equation_coefficients_contain_zero_y0_to_y38,
    true
  );
  assert.ok(
    Number(summary.max_abs_source_equation_coeff_y0_to_y38_interval) < 3.9e21
  );
  assert.ok(Number(summary.min_h34_solve_slope_clearance) > 0.79);
  assert.deepEqual(summary.h34_interval_hull, [
    -1.4623509893e21,
    1.4623509893e21,
  ]);
  assert.deepEqual(summary.Q_G_y34_coefficient_interval_hull, [
    -1.24573680421e21,
    1.24573692589e21,
  ]);
  assert.deepEqual(summary.Q_D_y34_coefficient_interval_hull, [
    -4.36007924061e22,
    4.36007881472e22,
  ]);
  assert.ok(Number(summary.max_abs_h34_interval) < 1.5e21);
  assert.ok(Number(summary.max_abs_Q_G_y34_coefficient_interval) < 1.3e21);
  assert.ok(Number(summary.max_abs_Q_D_y34_coefficient_interval) < 4.4e22);
  assert.ok(Number(summary.max_Q_G_y34_loss_on_first_y_cell) < 5.7e-73);
  assert.ok(Number(summary.max_Q_D_y34_loss_on_first_y_cell) < 2.0e-71);
  assert.equal(
    summary.all_QD_QG_coefficient_identity_intervals_contain_zero,
    true
  );
  assert.ok(
    Number(summary.max_abs_Q_D_plus_35Q_G_y34_coefficient_interval) < 8.8e22
  );
  assert.ok(firstRow.Q_D_plus_35Q_G_y34_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_35Q_G_y34_coefficient_interval[1] >= 0);
  assert.ok(
    Number(summary.min_Q_G_remaining_thirty_fifth_order_tail_budget) > 1e95
  );
  assert.ok(
    Number(summary.min_Q_D_remaining_thirty_fifth_order_tail_budget) > 1e95
  );
  assert.equal(
    firstRow.row_status,
    "directed-rounded-first-y-GD-thirty-fourth-order-post-U-successor-coefficient-enclosed"
  );
});

test("thirty-fourth-order post-U successor coefficient certificate keeps tube, continuous tail, and retention open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_thirty_fourth_order_post_u_successor_coefficient_enclosure,
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
    "theta3minus.fold-pair-first-y-GD-thirty-fifth-order-successor-tail-bound-required"
  );
});

test("thirty-fourth-order post-U successor coefficient validator rejects speed-band fields and overclaims", () => {
  const packet = clone(artifact());
  packet.thirty_fourth_order_post_u_successor_coefficient_parameters.speed_band =
    "forbidden";
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_successor_root_tail_tube = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder = true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyFourthOrderPostUSuccessorCoefficientCertificate(
      packet
    );

  assert.ok(
    errors.includes(
      "first-y thirty-fourth-order post-U successor coefficient parameters must not contain speed-band fields"
    )
  );
  assert.ok(
    errors.includes(
      "artifact claim must keep finite successor tube, continuous tail, full quotient, scaled remainder, I1, and retention open"
    )
  );
});

test("thirty-fourth-order post-U successor coefficient CLI writes and validates artifact JSON", () => {
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
