import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_CUBIC_JET_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdCubicJetCoefficientIntervalCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdCubicJetCoefficientIntervalCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-cubic-jet-coefficient-interval-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-cubic-jet-coefficient-interval-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdCubicJetCoefficientIntervalCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-cubic-jet-coefficient-interval-certificate.mjs"
  );
}

test("theta3minus fold-pair first-y G/D cubic jet coefficient interval certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdCubicJetCoefficientIntervalCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_CUBIC_JET_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_cubic_jet_coefficient_interval_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("first-y cubic jet certificate imposes no fixed speed band", () => {
  const packet = artifact();

  assert.equal(packet.cubic_jet_parameters.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(packet.cubic_jet_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(packet.cubic_jet_parameters.speed_band, undefined);
  assert.equal(packet.cubic_jet_parameters.speed_window, undefined);
  assert.equal(packet.cubic_jet_parameters.speed_min, undefined);
  assert.equal(packet.cubic_jet_parameters.speed_max, undefined);
});

test("first-y cubic jet intervals certify h3 and cubic Q_G/Q_D coefficients", () => {
  const packet = artifact();
  const summary = packet.cubic_jet_summary;
  const firstRow = packet.cubic_jet_rows[0];

  assert.equal(summary.speed_cell_count, 128);
  assert.equal(summary.branch_cell_count, 256);
  assert.equal(summary.all_rows_certified, true);
  assert.equal(summary.all_h0_intervals_inside_predecessor_tubes, true);
  assert.ok(Number(summary.min_h0_solve_slope_clearance) > 0.79);
  assert.ok(Number(summary.min_h1_solve_slope_clearance) > 0.79);
  assert.ok(Number(summary.min_h2_solve_slope_clearance) > 0.78);
  assert.ok(Number(summary.min_h3_solve_slope_clearance) > 0.56);
  assert.equal(summary.all_source_equation_coefficients_contain_zero_y0_to_y7, true);
  assert.ok(Number(summary.max_abs_source_equation_coeff_y0_to_y7_interval) < 15);
  assert.ok(Number(summary.max_abs_h1_interval) < 6);
  assert.ok(Number(summary.max_abs_h2_interval) < 4);
  assert.ok(Number(summary.max_abs_h3_interval) < 32);
  assert.deepEqual(summary.h1_interval_hull, [
    5.84702922033,
    5.85101191802,
  ]);
  assert.deepEqual(summary.h2_interval_hull, [
    -3.14420972344,
    3.14574687438,
  ]);
  assert.deepEqual(summary.h3_interval_hull, [
    -31.3074345924,
    -17.0318103498,
  ]);
  assert.deepEqual(summary.Q_G_y1_coefficient_interval_hull, [
    -0.000419486540367,
    0.000419489280989,
  ]);
  assert.deepEqual(summary.Q_G_y2_coefficient_interval_hull, [
    -0.884509154374,
    -0.858164859378,
  ]);
  assert.deepEqual(summary.Q_G_y3_coefficient_interval_hull, [
    -2.33229280147,
    2.30497148098,
  ]);
  assert.deepEqual(summary.Q_D_y1_coefficient_interval_hull, [
    -0.000838978561978,
    0.000838973080734,
  ]);
  assert.deepEqual(summary.Q_D_y2_coefficient_interval_hull, [
    2.57449457813,
    2.65352746312,
  ]);
  assert.deepEqual(summary.Q_D_y3_coefficient_interval_hull, [
    -9.21988592393,
    9.32917120589,
  ]);
  assert.ok(Number(summary.max_abs_Q_G_y1_coefficient_interval) < 0.00042);
  assert.ok(Number(summary.max_abs_Q_D_y1_coefficient_interval) < 0.00084);
  assert.ok(Number(summary.max_abs_Q_G_y2_coefficient_interval) < 1);
  assert.ok(Number(summary.max_abs_Q_D_y2_coefficient_interval) < 3);
  assert.ok(Number(summary.max_abs_Q_G_y3_coefficient_interval) < 2.4);
  assert.ok(Number(summary.max_abs_Q_D_y3_coefficient_interval) < 9.4);
  assert.ok(Number(summary.max_Q_G_linear_loss_on_first_y_cell) < 8e-7);
  assert.ok(Number(summary.max_Q_D_linear_loss_on_first_y_cell) < 0.0000016);
  assert.ok(Number(summary.max_Q_G_quadratic_loss_on_first_y_cell) < 0.0000029);
  assert.ok(Number(summary.max_Q_D_quadratic_loss_on_first_y_cell) < 0.0000086);
  assert.ok(Number(summary.max_Q_G_cubic_loss_on_first_y_cell) < 1.4e-8);
  assert.ok(Number(summary.max_Q_D_cubic_loss_on_first_y_cell) < 5.5e-8);
  assert.ok(Number(summary.min_Q_G_remaining_first_order_tail_budget) > 47);
  assert.ok(Number(summary.min_Q_D_remaining_first_order_tail_budget) > 47);
  assert.ok(Number(summary.min_Q_G_remaining_cubic_tail_budget) > 1e7);
  assert.ok(Number(summary.min_Q_D_remaining_cubic_tail_budget) > 1e7);
  assert.ok(Number(summary.min_Q_G_remaining_quartic_tail_budget) > 8e9);
  assert.ok(Number(summary.min_Q_D_remaining_quartic_tail_budget) > 8e9);
  assert.equal(summary.all_QD_QG_coefficient_identity_intervals_contain_zero, true);
  assert.ok(firstRow.Q_D_plus_2Q_G_y1_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_2Q_G_y1_coefficient_interval[1] >= 0);
  assert.ok(firstRow.Q_D_plus_3Q_G_y2_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_3Q_G_y2_coefficient_interval[1] >= 0);
  assert.ok(firstRow.Q_D_plus_4Q_G_y3_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_4Q_G_y3_coefficient_interval[1] >= 0);
  assert.equal(firstRow.row_status, "directed-rounded-first-y-GD-cubic-jet-coefficient-enclosed");
});

test("first-y cubic jet certificate keeps finite remainder closure open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_constant_coefficient_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_linear_jet_coefficient_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_quadratic_jet_coefficient_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_cubic_jet_coefficient_enclosure,
    true
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
});

test("first-y cubic jet validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdCubicJetCoefficientIntervalCertificate({
        speedCellCount: 2,
      }),
    /speedCellCount/
  );

  const packet = clone(artifact());
  packet.cubic_jet_parameters.speed_band = [0.5, 1.5];
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_remainder = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder = true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdCubicJetCoefficientIntervalCertificate(
      packet
    );

  assert.ok(
    errors.includes(
      "first-y cubic jet parameters must not contain speed-band fields"
    )
  );
  assert.ok(
    errors.includes(
      "artifact claim must keep first-y finite remainder, full quotient, scaled remainder, I1, and retention open"
    )
  );
});

test("first-y cubic jet CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "theta3minus-first-y-cubic-"));
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

  const schemaOutput = JSON.parse(
    execFileSync(process.execPath, [scriptPath(), "--schema"], {
      encoding: "utf8",
    })
  );
  assert.equal(
    schemaOutput.artifact_schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_CUBIC_JET_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA
  );
});
