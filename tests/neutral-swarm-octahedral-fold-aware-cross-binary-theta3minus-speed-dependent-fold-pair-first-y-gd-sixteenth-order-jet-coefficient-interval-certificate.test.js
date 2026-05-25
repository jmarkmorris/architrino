import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_SIXTEENTH_ORDER_JET_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdSixteenthOrderJetCoefficientIntervalCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdSixteenthOrderJetCoefficientIntervalCertificate,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-sixteenth-order-jet-coefficient-interval-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-sixteenth-order-jet-coefficient-interval-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdSixteenthOrderJetCoefficientIntervalCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-sixteenth-order-jet-coefficient-interval-certificate.mjs"
  );
}

test("theta3minus fold-pair first-y G/D sixteenth-order jet coefficient interval certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdSixteenthOrderJetCoefficientIntervalCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_SIXTEENTH_ORDER_JET_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_sixteenth_order_jet_coefficient_interval_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("first-y sixteenth-order jet certificate imposes no fixed speed band", () => {
  const packet = artifact();

  assert.equal(
    packet.sixteenth_order_jet_parameters.speed_constraint,
    NO_SPEED_WINDOW
  );
  assert.deepEqual(packet.sixteenth_order_jet_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(packet.sixteenth_order_jet_parameters.speed_band, undefined);
  assert.equal(packet.sixteenth_order_jet_parameters.speed_window, undefined);
  assert.equal(packet.sixteenth_order_jet_parameters.speed_min, undefined);
  assert.equal(packet.sixteenth_order_jet_parameters.speed_max, undefined);
});

test("first-y sixteenth-order jet intervals certify h16 and Q_G/Q_D y16 coefficients", () => {
  const packet = artifact();
  const summary = packet.sixteenth_order_jet_summary;
  const firstRow = packet.sixteenth_order_jet_rows[0];

  assert.equal(summary.speed_cell_count, 128);
  assert.equal(summary.branch_cell_count, 256);
  assert.equal(summary.all_rows_certified, true);
  assert.equal(summary.all_h0_intervals_inside_predecessor_tubes, true);
  assert.equal(
    summary.all_source_equation_coefficients_contain_zero_y0_to_y20,
    true
  );
  assert.ok(Number(summary.max_abs_source_equation_coeff_y0_to_y20_interval) < 40508316);
  assert.ok(Number(summary.min_h16_solve_slope_clearance) > 0.79);
  assert.deepEqual(summary.h15_interval_hull, [
    -2822625.21673,
    2425285.72,
  ]);
  assert.deepEqual(summary.h16_interval_hull, [
    -17271814.3662,
    17271814.3662,
  ]);
  assert.deepEqual(summary.Q_G_y15_coefficient_interval_hull, [
    -2235611.16493,
    2235611.16493,
  ]);
  assert.deepEqual(summary.Q_D_y15_coefficient_interval_hull, [
    -35769778.639,
    35769778.639,
  ]);
  assert.deepEqual(summary.Q_G_y16_coefficient_interval_hull, [
    -12656271.9864,
    14024649.6318,
  ]);
  assert.deepEqual(summary.Q_D_y16_coefficient_interval_hull, [
    -238419043.741,
    215156623.769,
  ]);
  assert.ok(Number(summary.max_abs_Q_G_y16_coefficient_interval) < 14024650);
  assert.ok(Number(summary.max_abs_Q_D_y16_coefficient_interval) < 238419044);
  assert.ok(Number(summary.max_Q_G_sixteenth_order_loss_on_first_y_cell) < 2e-37);
  assert.ok(Number(summary.max_Q_D_sixteenth_order_loss_on_first_y_cell) < 3e-36);
  assert.ok(Number(summary.min_Q_G_remaining_seventeenth_order_tail_budget) > 4.04e45);
  assert.ok(Number(summary.min_Q_D_remaining_seventeenth_order_tail_budget) > 4.04e45);
  assert.equal(summary.all_QD_QG_coefficient_identity_intervals_contain_zero, true);
  assert.ok(Number(summary.max_abs_Q_D_plus_17Q_G_y16_coefficient_interval) < 453575668);
  assert.ok(firstRow.Q_D_plus_17Q_G_y16_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_17Q_G_y16_coefficient_interval[1] >= 0);
  assert.equal(
    firstRow.row_status,
    "directed-rounded-first-y-GD-sixteenth-order-jet-coefficient-enclosed"
  );
});

test("first-y sixteenth-order jet certificate keeps finite remainder closure open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_fourteenth_order_jet_coefficient_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_fifteenth_order_jet_coefficient_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_sixteenth_order_jet_coefficient_enclosure,
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
  assert.equal(
    packet.result.first_successor_row,
    "theta3minus.fold-pair-first-y-GD-seventeenth-order-tail-bound-directed-rounded-required"
  );
});

test("first-y sixteenth-order jet validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdSixteenthOrderJetCoefficientIntervalCertificate({
        speedCellCount: 2,
      }),
    /speedCellCount/
  );

  const packet = clone(artifact());
  packet.sixteenth_order_jet_parameters.speed_band = "forbidden";
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_remainder = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder = true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdSixteenthOrderJetCoefficientIntervalCertificate(
      packet
    );

  assert.ok(
    errors.includes(
      "first-y sixteenth-order jet parameters must not contain speed-band fields"
    )
  );
  assert.ok(
    errors.includes(
      "artifact claim must keep first-y finite remainder, full quotient, scaled remainder, I1, and retention open"
    )
  );
});

test("first-y sixteenth-order jet CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "theta3minus-first-y-sixteenth-order-")
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

  const schemaOutput = JSON.parse(
    execFileSync(process.execPath, [scriptPath(), "--schema"], {
      encoding: "utf8",
    })
  );
  assert.equal(
    schemaOutput.artifact_schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_SIXTEENTH_ORDER_JET_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA
  );
});
