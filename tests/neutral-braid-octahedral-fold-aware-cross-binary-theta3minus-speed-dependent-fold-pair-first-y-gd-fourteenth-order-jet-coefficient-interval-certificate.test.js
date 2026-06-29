import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FOURTEENTH_ORDER_JET_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFourteenthOrderJetCoefficientIntervalCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFourteenthOrderJetCoefficientIntervalCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-fourteenth-order-jet-coefficient-interval-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-fourteenth-order-jet-coefficient-interval-certified";
const NO_SPEED_WINDOW =
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFourteenthOrderJetCoefficientIntervalCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-fourteenth-order-jet-coefficient-interval-certificate.mjs"
  );
}

test("theta3minus fold-pair first-y G/D fourteenth-order jet coefficient interval certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFourteenthOrderJetCoefficientIntervalCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FOURTEENTH_ORDER_JET_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_fourteenth_order_jet_coefficient_interval_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("first-y fourteenth-order jet certificate imposes no fixed speed band", () => {
  const packet = artifact();

  assert.equal(
    packet.fourteenth_order_jet_parameters.speed_constraint,
    NO_SPEED_WINDOW
  );
  assert.deepEqual(packet.fourteenth_order_jet_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(packet.fourteenth_order_jet_parameters.speed_band, undefined);
  assert.equal(packet.fourteenth_order_jet_parameters.speed_window, undefined);
  assert.equal(packet.fourteenth_order_jet_parameters.speed_min, undefined);
  assert.equal(packet.fourteenth_order_jet_parameters.speed_max, undefined);
});

test("first-y fourteenth-order jet intervals certify h14 and Q_G/Q_D y14 coefficients", () => {
  const packet = artifact();
  const summary = packet.fourteenth_order_jet_summary;
  const firstRow = packet.fourteenth_order_jet_rows[0];

  assert.equal(summary.speed_cell_count, 128);
  assert.equal(summary.branch_cell_count, 256);
  assert.equal(summary.all_rows_certified, true);
  assert.equal(summary.all_h0_intervals_inside_predecessor_tubes, true);
  assert.equal(
    summary.all_source_equation_coefficients_contain_zero_y0_to_y18,
    true
  );
  assert.ok(Number(summary.max_abs_source_equation_coeff_y0_to_y18_interval) < 1200000);
  assert.ok(Number(summary.min_h14_solve_slope_clearance) > 0.79);
  assert.deepEqual(summary.h14_interval_hull, [
    -683742.026225,
    683742.026225,
  ]);
  assert.deepEqual(summary.Q_G_y14_coefficient_interval_hull, [
    -481973.551349,
    267320.048282,
  ]);
  assert.deepEqual(summary.Q_D_y14_coefficient_interval_hull, [
    -4009800.72423,
    7229603.27024,
  ]);
  assert.ok(Number(summary.max_abs_Q_G_y14_coefficient_interval) < 481974);
  assert.ok(Number(summary.max_abs_Q_D_y14_coefficient_interval) < 7229604);
  assert.ok(Number(summary.max_Q_G_fourteenth_order_loss_on_first_y_cell) < 2e-33);
  assert.ok(Number(summary.max_Q_D_fourteenth_order_loss_on_first_y_cell) < 3e-32);
  assert.ok(Number(summary.min_Q_G_remaining_fifteenth_order_tail_budget) > 1.3e40);
  assert.ok(Number(summary.min_Q_D_remaining_fifteenth_order_tail_budget) > 1.3e40);
  assert.equal(summary.all_QD_QG_coefficient_identity_intervals_contain_zero, true);
  assert.ok(Number(summary.max_abs_Q_D_plus_15Q_G_y14_coefficient_interval) < 11239404);
  assert.ok(firstRow.Q_D_plus_15Q_G_y14_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_15Q_G_y14_coefficient_interval[1] >= 0);
  assert.equal(
    firstRow.row_status,
    "directed-rounded-first-y-GD-fourteenth-order-jet-coefficient-enclosed"
  );
});

test("first-y fourteenth-order jet certificate keeps finite remainder closure open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_tridecic_jet_coefficient_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_fourteenth_order_jet_coefficient_enclosure,
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
    "theta3minus.fold-pair-first-y-GD-fifteenth-order-tail-bound-directed-rounded-required"
  );
});

test("first-y fourteenth-order jet validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFourteenthOrderJetCoefficientIntervalCertificate({
        speedCellCount: 2,
      }),
    /speedCellCount/
  );

  const packet = clone(artifact());
  packet.fourteenth_order_jet_parameters.speed_band = "forbidden";
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_remainder = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder = true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFourteenthOrderJetCoefficientIntervalCertificate(
      packet
    );

  assert.ok(
    errors.includes(
      "first-y fourteenth-order jet parameters must not contain speed-band fields"
    )
  );
  assert.ok(
    errors.includes(
      "artifact claim must keep first-y finite remainder, full quotient, scaled remainder, I1, and retention open"
    )
  );
});

test("first-y fourteenth-order jet CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "theta3minus-first-y-fourteenth-order-")
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FOURTEENTH_ORDER_JET_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA
  );
});
