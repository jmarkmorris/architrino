import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_FOURTH_ORDER_POST_U_COEFFICIENT_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFourthOrderPostUCoefficientCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFourthOrderPostUCoefficientCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-fourth-order-post-u-coefficient-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-twenty-fourth-order-post-U-coefficient-certified";
const NO_SPEED_WINDOW =
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFourthOrderPostUCoefficientCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-fourth-order-post-u-coefficient-certificate.mjs"
  );
}

test("theta3minus fold-pair first-y G/D twenty-fourth-order post-U coefficient certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFourthOrderPostUCoefficientCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_FOURTH_ORDER_POST_U_COEFFICIENT_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_twenty_fourth_order_post_u_coefficient_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("twenty-fourth-order post-U coefficient certificate imposes no fixed speed band", () => {
  const packet = artifact();
  const params = packet.twenty_fourth_order_post_u_coefficient_parameters;

  assert.equal(params.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(params.speed_ratio_enclosure, [3.02156, 3.02157]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(params.speed_band, undefined);
  assert.equal(params.speed_window, undefined);
  assert.equal(params.speed_min, undefined);
  assert.equal(params.speed_max, undefined);
});

test("twenty-fourth-order post-U coefficient intervals certify h24 and Q_G/Q_D y24 coefficients", () => {
  const packet = artifact();
  const summary = packet.twenty_fourth_order_post_u_coefficient_summary;
  const firstRow = packet.twenty_fourth_order_post_u_coefficient_rows[0];

  assert.equal(summary.speed_cell_count, 128);
  assert.equal(summary.branch_cell_count, 256);
  assert.equal(summary.all_rows_certified, true);
  assert.equal(
    summary.all_source_equation_coefficients_contain_zero_y0_to_y28,
    true
  );
  assert.ok(
    Number(summary.max_abs_source_equation_coeff_y0_to_y28_interval) < 7e13
  );
  assert.ok(Number(summary.min_h24_solve_slope_clearance) > 0.79);
  assert.deepEqual(summary.h24_interval_hull, [
    -25502690592000,
    25502690592000,
  ]);
  assert.deepEqual(summary.Q_G_y24_coefficient_interval_hull, [
    -21722122111200,
    21723283979000,
  ]);
  assert.deepEqual(summary.Q_D_y24_coefficient_interval_hull, [
    -543082099475000,
    543053052779000,
  ]);
  assert.ok(Number(summary.max_abs_h24_interval) < 2.6e13);
  assert.ok(Number(summary.max_abs_Q_G_y24_coefficient_interval) < 2.2e13);
  assert.ok(Number(summary.max_abs_Q_D_y24_coefficient_interval) < 5.5e14);
  assert.ok(
    Number(summary.max_Q_G_y24_loss_on_first_y_cell) < 2.9e-53
  );
  assert.ok(
    Number(summary.max_Q_D_y24_loss_on_first_y_cell) < 7.1e-52
  );
  assert.equal(summary.all_QD_QG_coefficient_identity_intervals_contain_zero, true);
  assert.ok(
    Number(summary.max_abs_Q_D_plus_25Q_G_y24_coefficient_interval) < 1.1e15
  );
  assert.ok(firstRow.Q_D_plus_25Q_G_y24_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_25Q_G_y24_coefficient_interval[1] >= 0);
  assert.ok(
    Number(summary.min_Q_G_remaining_twenty_fifth_order_tail_budget) > 3e67
  );
  assert.ok(
    Number(summary.min_Q_D_remaining_twenty_fifth_order_tail_budget) > 3e67
  );
  assert.equal(
    firstRow.row_status,
    "directed-rounded-first-y-GD-twenty-fourth-order-post-U-coefficient-enclosed"
  );
});

test("twenty-fourth-order post-U coefficient certificate keeps continuous tail and retention open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_twenty_fourth_order_post_u_coefficient_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim
      .inherits_directed_rounded_first_y_GD_finite_shift27_U_root_tail_tube,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_continuous_post_u_tail_bound,
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
    "theta3minus.fold-pair-first-y-GD-twenty-fifth-order-post-U-tail-bound-directed-rounded-required"
  );
});

test("twenty-fourth-order post-U coefficient validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFourthOrderPostUCoefficientCertificate(
        { speedCellCount: 2 }
      ),
    /speedCellCount/
  );

  const packet = clone(artifact());
  packet.twenty_fourth_order_post_u_coefficient_parameters.speed_band =
    "forbidden";
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_continuous_post_u_tail_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder = true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFourthOrderPostUCoefficientCertificate(
      packet
    );

  assert.ok(
    errors.includes(
      "first-y twenty-fourth-order post-U coefficient parameters must not contain speed-band fields"
    )
  );
  assert.ok(
    errors.includes(
      "artifact claim must keep continuous post-U tail, full quotient, scaled remainder, I1, and retention open"
    )
  );
});

test("twenty-fourth-order post-U coefficient CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "theta3minus-first-y-post-u-")
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
