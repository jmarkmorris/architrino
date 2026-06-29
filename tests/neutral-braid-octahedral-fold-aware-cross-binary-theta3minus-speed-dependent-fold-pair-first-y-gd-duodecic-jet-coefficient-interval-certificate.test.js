import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_DUODECIC_JET_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdDuodecicJetCoefficientIntervalCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdDuodecicJetCoefficientIntervalCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-duodecic-jet-coefficient-interval-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-duodecic-jet-coefficient-interval-certified";
const NO_SPEED_WINDOW =
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdDuodecicJetCoefficientIntervalCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-duodecic-jet-coefficient-interval-certificate.mjs"
  );
}

test("theta3minus fold-pair first-y G/D duodecic jet coefficient interval certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdDuodecicJetCoefficientIntervalCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_DUODECIC_JET_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_duodecic_jet_coefficient_interval_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("first-y duodecic jet certificate imposes no fixed speed band", () => {
  const packet = artifact();

  assert.equal(packet.duodecic_jet_parameters.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(packet.duodecic_jet_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(packet.duodecic_jet_parameters.speed_band, undefined);
  assert.equal(packet.duodecic_jet_parameters.speed_window, undefined);
  assert.equal(packet.duodecic_jet_parameters.speed_min, undefined);
  assert.equal(packet.duodecic_jet_parameters.speed_max, undefined);
});

test("first-y duodecic jet intervals certify h12 and duodecic Q_G/Q_D coefficients", () => {
  const packet = artifact();
  const summary = packet.duodecic_jet_summary;
  const firstRow = packet.duodecic_jet_rows[0];

  assert.equal(summary.speed_cell_count, 128);
  assert.equal(summary.branch_cell_count, 256);
  assert.equal(summary.all_rows_certified, true);
  assert.equal(summary.all_h0_intervals_inside_predecessor_tubes, true);
  assert.ok(Number(summary.min_h0_solve_slope_clearance) > 0.79);
  assert.ok(Number(summary.min_h1_solve_slope_clearance) > 0.79);
  assert.ok(Number(summary.min_h2_solve_slope_clearance) > 0.78);
  assert.ok(Number(summary.min_h3_solve_slope_clearance) > 0.79);
  assert.ok(Number(summary.min_h4_solve_slope_clearance) > 0.79);
  assert.ok(Number(summary.min_h5_solve_slope_clearance) > 0.79);
  assert.ok(Number(summary.min_h6_solve_slope_clearance) > 0.79);
  assert.ok(Number(summary.min_h7_solve_slope_clearance) > 0.79);
  assert.ok(Number(summary.min_h8_solve_slope_clearance) > 0.79);
  assert.ok(Number(summary.min_h9_solve_slope_clearance) > 0.79);
  assert.ok(Number(summary.min_h10_solve_slope_clearance) > 0.79);
  assert.ok(Number(summary.min_h11_solve_slope_clearance) > 0.79);
  assert.ok(Number(summary.min_h12_solve_slope_clearance) > 0.79);
  assert.equal(summary.all_source_equation_coefficients_contain_zero_y0_to_y16, true);
  assert.ok(Number(summary.max_abs_source_equation_coeff_y0_to_y16_interval) < 32000);
  assert.ok(Number(summary.max_abs_h1_interval) < 6);
  assert.ok(Number(summary.max_abs_h2_interval) < 4);
  assert.ok(Number(summary.max_abs_h3_interval) < 23);
  assert.ok(Number(summary.max_abs_h4_interval) < 17);
  assert.ok(Number(summary.max_abs_h5_interval) < 97);
  assert.ok(Number(summary.max_abs_h6_interval) < 114);
  assert.ok(Number(summary.max_abs_h7_interval) < 458);
  assert.ok(Number(summary.max_abs_h8_interval) < 800);
  assert.ok(Number(summary.max_abs_h9_interval) < 2300);
  assert.ok(Number(summary.max_abs_h10_interval) < 5720);
  assert.ok(Number(summary.max_abs_h11_interval) < 12800);
  assert.ok(Number(summary.max_abs_h12_interval) < 48800);
  assert.deepEqual(summary.h1_interval_hull, [
    5.84817927394,
    5.84986019583,
  ]);
  assert.deepEqual(summary.h2_interval_hull, [
    -3.11092653056,
    3.11092653056,
  ]);
  assert.deepEqual(summary.h3_interval_hull, [
    -22.1073804202,
    -22.0947152283,
  ]);
  assert.deepEqual(summary.h4_interval_hull, [
    -16.9906831352,
    16.9906831352,
  ]);
  assert.deepEqual(summary.h5_interval_hull, [
    96.4156422581,
    96.5713366208,
  ]);
  assert.deepEqual(summary.h6_interval_hull, [
    -113.732732609,
    113.732732609,
  ]);
  assert.deepEqual(summary.h7_interval_hull, [
    -457.44717327,
    -453.781098734,
  ]);
  assert.deepEqual(summary.h8_interval_hull, [
    -792.598844512,
    792.598844512,
  ]);
  assert.deepEqual(summary.h9_interval_hull, [
    2156.81713729,
    2275.44061464,
  ]);
  assert.deepEqual(summary.h10_interval_hull, [
    -5716.60732588,
    5716.60732588,
  ]);
  assert.deepEqual(summary.h11_interval_hull, [
    -12767.1736763,
    -8617.99168602,
  ]);
  assert.deepEqual(summary.h12_interval_hull, [
    -48768.3807229,
    48768.3807229,
  ]);
  assert.deepEqual(summary.Q_G_y1_coefficient_interval_hull, [
    -0.0000310207499482,
    0.0000310207499482,
  ]);
  assert.deepEqual(summary.Q_G_y2_coefficient_interval_hull, [
    -0.871804598401,
    -0.870942601634,
  ]);
  assert.deepEqual(summary.Q_G_y3_coefficient_interval_hull, [
    -0.00110046379283,
    0.00110046379283,
  ]);
  assert.deepEqual(summary.Q_G_y4_coefficient_interval_hull, [
    6.82399504228,
    6.84166645452,
  ]);
  assert.deepEqual(summary.Q_D_y1_coefficient_interval_hull, [
    -0.0000620414998964,
    0.0000620414998964,
  ]);
  assert.deepEqual(summary.Q_D_y2_coefficient_interval_hull, [
    2.6128278049,
    2.6154137952,
  ]);
  assert.deepEqual(summary.Q_D_y3_coefficient_interval_hull, [
    -0.0044018551713,
    0.0044018551713,
  ]);
  assert.deepEqual(summary.Q_D_y4_coefficient_interval_hull, [
    -34.2083322726,
    -34.1199752114,
  ]);
  assert.deepEqual(summary.Q_G_y5_coefficient_interval_hull, [
    -0.0390934302031,
    0.0390934302031,
  ]);
  assert.deepEqual(summary.Q_D_y5_coefficient_interval_hull, [
    -0.234560581219,
    0.234560581219,
  ]);
  assert.deepEqual(summary.Q_G_y6_coefficient_interval_hull, [
    -50.0073387165,
    -49.500988368,
  ]);
  assert.deepEqual(summary.Q_D_y6_coefficient_interval_hull, [
    346.506918576,
    350.051371015,
  ]);
  assert.deepEqual(summary.Q_G_y7_coefficient_interval_hull, [
    -1.39097067929,
    1.39097067929,
  ]);
  assert.deepEqual(summary.Q_D_y7_coefficient_interval_hull, [
    -11.1277654343,
    11.1277654343,
  ]);
  assert.deepEqual(summary.Q_G_y8_coefficient_interval_hull, [
    343.421042015,
    360.34531026,
  ]);
  assert.deepEqual(summary.Q_D_y8_coefficient_interval_hull, [
    -3243.10779234,
    -3090.78937814,
  ]);
  assert.deepEqual(summary.Q_G_y9_coefficient_interval_hull, [
    -49.519752546,
    49.519752546,
  ]);
  assert.deepEqual(summary.Q_D_y9_coefficient_interval_hull, [
    -495.19752546,
    495.19752546,
  ]);
  assert.deepEqual(summary.Q_G_y10_coefficient_interval_hull, [
    -2720.94809446,
    -2127.83770085,
  ]);
  assert.deepEqual(summary.Q_D_y10_coefficient_interval_hull, [
    23406.2147094,
    29930.4290391,
  ]);
  assert.deepEqual(summary.Q_G_y11_coefficient_interval_hull, [
    -1763.21366961,
    1763.21366961,
  ]);
  assert.deepEqual(summary.Q_D_y11_coefficient_interval_hull, [
    -21158.5640353,
    21158.5640353,
  ]);
  assert.deepEqual(summary.Q_G_y12_coefficient_interval_hull, [
    5815.42031867,
    26858.3199138,
  ]);
  assert.deepEqual(summary.Q_D_y12_coefficient_interval_hull, [
    -349158.15888,
    -75600.4641427,
  ]);
  assert.ok(Number(summary.max_abs_Q_G_y1_coefficient_interval) < 0.000032);
  assert.ok(Number(summary.max_abs_Q_D_y1_coefficient_interval) < 0.000063);
  assert.ok(Number(summary.max_abs_Q_G_y2_coefficient_interval) < 1);
  assert.ok(Number(summary.max_abs_Q_D_y2_coefficient_interval) < 3);
  assert.ok(Number(summary.max_abs_Q_G_y3_coefficient_interval) < 0.0012);
  assert.ok(Number(summary.max_abs_Q_D_y3_coefficient_interval) < 0.0045);
  assert.ok(Number(summary.max_abs_Q_G_y4_coefficient_interval) < 6.9);
  assert.ok(Number(summary.max_abs_Q_D_y4_coefficient_interval) < 35);
  assert.ok(Number(summary.max_abs_Q_G_y5_coefficient_interval) < 0.04);
  assert.ok(Number(summary.max_abs_Q_D_y5_coefficient_interval) < 0.24);
  assert.ok(Number(summary.max_abs_Q_G_y6_coefficient_interval) < 51);
  assert.ok(Number(summary.max_abs_Q_D_y6_coefficient_interval) < 351);
  assert.ok(Number(summary.max_abs_Q_G_y7_coefficient_interval) < 1.4);
  assert.ok(Number(summary.max_abs_Q_D_y7_coefficient_interval) < 11.2);
  assert.ok(Number(summary.max_abs_Q_G_y8_coefficient_interval) < 361);
  assert.ok(Number(summary.max_abs_Q_D_y8_coefficient_interval) < 3244);
  assert.ok(Number(summary.max_abs_Q_G_y9_coefficient_interval) < 50);
  assert.ok(Number(summary.max_abs_Q_D_y9_coefficient_interval) < 496);
  assert.ok(Number(summary.max_abs_Q_G_y10_coefficient_interval) < 2721);
  assert.ok(Number(summary.max_abs_Q_D_y10_coefficient_interval) < 29931);
  assert.ok(Number(summary.max_abs_Q_G_y11_coefficient_interval) < 1764);
  assert.ok(Number(summary.max_abs_Q_D_y11_coefficient_interval) < 21159);
  assert.ok(Number(summary.max_abs_Q_G_y12_coefficient_interval) < 26859);
  assert.ok(Number(summary.max_abs_Q_D_y12_coefficient_interval) < 349159);
  assert.ok(Number(summary.max_Q_G_linear_loss_on_first_y_cell) < 5.6e-8);
  assert.ok(Number(summary.max_Q_D_linear_loss_on_first_y_cell) < 1.2e-7);
  assert.ok(Number(summary.max_Q_G_quadratic_loss_on_first_y_cell) < 0.0000029);
  assert.ok(Number(summary.max_Q_D_quadratic_loss_on_first_y_cell) < 0.0000086);
  assert.ok(Number(summary.max_Q_G_cubic_loss_on_first_y_cell) < 7e-12);
  assert.ok(Number(summary.max_Q_D_cubic_loss_on_first_y_cell) < 3e-11);
  assert.ok(Number(summary.max_Q_G_quartic_loss_on_first_y_cell) < 8e-11);
  assert.ok(Number(summary.max_Q_D_quartic_loss_on_first_y_cell) < 4e-10);
  assert.ok(Number(summary.max_Q_G_quintic_loss_on_first_y_cell) < 8e-16);
  assert.ok(Number(summary.max_Q_D_quintic_loss_on_first_y_cell) < 5e-15);
  assert.ok(Number(summary.max_Q_G_sextic_loss_on_first_y_cell) < 1.8e-15);
  assert.ok(Number(summary.max_Q_D_sextic_loss_on_first_y_cell) < 1.2e-14);
  assert.ok(Number(summary.max_Q_G_septic_loss_on_first_y_cell) < 9e-20);
  assert.ok(Number(summary.max_Q_D_septic_loss_on_first_y_cell) < 7e-19);
  assert.ok(Number(summary.max_Q_G_octic_loss_on_first_y_cell) < 4e-20);
  assert.ok(Number(summary.max_Q_D_octic_loss_on_first_y_cell) < 4e-19);
  assert.ok(Number(summary.max_Q_G_nonic_loss_on_first_y_cell) < 1e-23);
  assert.ok(Number(summary.max_Q_D_nonic_loss_on_first_y_cell) < 1e-22);
  assert.ok(Number(summary.max_Q_G_decic_loss_on_first_y_cell) < 1e-24);
  assert.ok(Number(summary.max_Q_D_decic_loss_on_first_y_cell) < 2e-23);
  assert.ok(Number(summary.max_Q_G_undecic_loss_on_first_y_cell) < 2e-27);
  assert.ok(Number(summary.max_Q_D_undecic_loss_on_first_y_cell) < 2e-26);
  assert.ok(Number(summary.max_Q_G_duodecic_loss_on_first_y_cell) < 4e-29);
  assert.ok(Number(summary.max_Q_D_duodecic_loss_on_first_y_cell) < 4e-28);
  assert.ok(Number(summary.min_Q_G_remaining_first_order_tail_budget) > 47);
  assert.ok(Number(summary.min_Q_D_remaining_first_order_tail_budget) > 47);
  assert.ok(Number(summary.min_Q_G_remaining_cubic_tail_budget) > 1e7);
  assert.ok(Number(summary.min_Q_D_remaining_cubic_tail_budget) > 1e7);
  assert.ok(Number(summary.min_Q_G_remaining_quartic_tail_budget) > 8e9);
  assert.ok(Number(summary.min_Q_D_remaining_quartic_tail_budget) > 8e9);
  assert.ok(Number(summary.min_Q_G_remaining_quintic_tail_budget) > 4.5e12);
  assert.ok(Number(summary.min_Q_D_remaining_quintic_tail_budget) > 4.5e12);
  assert.ok(Number(summary.min_Q_G_remaining_sextic_tail_budget) > 2.5e15);
  assert.ok(Number(summary.min_Q_D_remaining_sextic_tail_budget) > 2.5e15);
  assert.ok(Number(summary.min_Q_G_remaining_septic_tail_budget) > 1.4e18);
  assert.ok(Number(summary.min_Q_D_remaining_septic_tail_budget) > 1.4e18);
  assert.ok(Number(summary.min_Q_G_remaining_octic_tail_budget) > 7e20);
  assert.ok(Number(summary.min_Q_D_remaining_octic_tail_budget) > 7e20);
  assert.ok(Number(summary.min_Q_G_remaining_nonic_tail_budget) > 4e23);
  assert.ok(Number(summary.min_Q_D_remaining_nonic_tail_budget) > 4e23);
  assert.ok(Number(summary.min_Q_G_remaining_tenth_order_tail_budget) > 2e26);
  assert.ok(Number(summary.min_Q_D_remaining_tenth_order_tail_budget) > 2e26);
  assert.ok(Number(summary.min_Q_G_remaining_eleventh_order_tail_budget) > 1e29);
  assert.ok(Number(summary.min_Q_D_remaining_eleventh_order_tail_budget) > 1e29);
  assert.ok(Number(summary.min_Q_G_remaining_twelfth_order_tail_budget) > 7e31);
  assert.ok(Number(summary.min_Q_D_remaining_twelfth_order_tail_budget) > 7e31);
  assert.ok(Number(summary.min_Q_G_remaining_thirteenth_order_tail_budget) > 4e34);
  assert.ok(Number(summary.min_Q_D_remaining_thirteenth_order_tail_budget) > 4e34);
  assert.equal(summary.all_QD_QG_coefficient_identity_intervals_contain_zero, true);
  assert.ok(Number(summary.max_abs_Q_D_plus_11Q_G_y10_coefficient_interval) < 6501);
  assert.ok(Number(summary.max_abs_Q_D_plus_12Q_G_y11_coefficient_interval) < 42318);
  assert.ok(Number(summary.max_abs_Q_D_plus_13Q_G_y12_coefficient_interval) < 273558);
  assert.ok(firstRow.Q_D_plus_2Q_G_y1_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_2Q_G_y1_coefficient_interval[1] >= 0);
  assert.ok(firstRow.Q_D_plus_3Q_G_y2_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_3Q_G_y2_coefficient_interval[1] >= 0);
  assert.ok(firstRow.Q_D_plus_4Q_G_y3_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_4Q_G_y3_coefficient_interval[1] >= 0);
  assert.ok(firstRow.Q_D_plus_5Q_G_y4_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_5Q_G_y4_coefficient_interval[1] >= 0);
  assert.ok(firstRow.Q_D_plus_6Q_G_y5_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_6Q_G_y5_coefficient_interval[1] >= 0);
  assert.ok(firstRow.Q_D_plus_7Q_G_y6_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_7Q_G_y6_coefficient_interval[1] >= 0);
  assert.ok(firstRow.Q_D_plus_8Q_G_y7_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_8Q_G_y7_coefficient_interval[1] >= 0);
  assert.ok(firstRow.Q_D_plus_9Q_G_y8_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_9Q_G_y8_coefficient_interval[1] >= 0);
  assert.ok(firstRow.Q_D_plus_10Q_G_y9_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_10Q_G_y9_coefficient_interval[1] >= 0);
  assert.ok(firstRow.Q_D_plus_11Q_G_y10_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_11Q_G_y10_coefficient_interval[1] >= 0);
  assert.ok(firstRow.Q_D_plus_12Q_G_y11_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_12Q_G_y11_coefficient_interval[1] >= 0);
  assert.ok(firstRow.Q_D_plus_13Q_G_y12_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_13Q_G_y12_coefficient_interval[1] >= 0);
  assert.equal(firstRow.row_status, "directed-rounded-first-y-GD-duodecic-jet-coefficient-enclosed");
});

test("first-y duodecic jet certificate keeps finite remainder closure open", () => {
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
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_quartic_jet_coefficient_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_quintic_jet_coefficient_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_sextic_jet_coefficient_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_septic_jet_coefficient_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_octic_jet_coefficient_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_nonic_jet_coefficient_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_decic_jet_coefficient_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_undecic_jet_coefficient_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_duodecic_jet_coefficient_enclosure,
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

test("first-y duodecic jet validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdDuodecicJetCoefficientIntervalCertificate({
        speedCellCount: 2,
      }),
    /speedCellCount/
  );

  const packet = clone(artifact());
  packet.duodecic_jet_parameters.speed_band = "forbidden";
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_remainder = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder = true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdDuodecicJetCoefficientIntervalCertificate(
      packet
    );

  assert.ok(
    errors.includes(
      "first-y duodecic jet parameters must not contain speed-band fields"
    )
  );
  assert.ok(
    errors.includes(
      "artifact claim must keep first-y finite remainder, full quotient, scaled remainder, I1, and retention open"
    )
  );
});

test("first-y duodecic jet CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "theta3minus-first-y-duodecic-"));
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_DUODECIC_JET_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA
  );
});
