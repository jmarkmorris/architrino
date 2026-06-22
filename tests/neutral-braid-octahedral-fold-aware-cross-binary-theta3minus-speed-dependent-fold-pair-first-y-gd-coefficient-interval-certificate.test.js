import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdCoefficientIntervalCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdCoefficientIntervalCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-constant-coefficient-interval-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdCoefficientIntervalCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate.mjs"
  );
}

test("theta3minus fold-pair first-y G/D coefficient interval certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdCoefficientIntervalCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_coefficient_interval_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("first-y coefficient interval certificate imposes no fixed speed band", () => {
  const packet = artifact();

  assert.equal(packet.coefficient_interval_parameters.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(packet.coefficient_interval_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(packet.coefficient_interval_parameters.speed_band, undefined);
  assert.equal(packet.coefficient_interval_parameters.speed_window, undefined);
  assert.equal(packet.coefficient_interval_parameters.speed_min, undefined);
  assert.equal(packet.coefficient_interval_parameters.speed_max, undefined);
});

test("first-y coefficient intervals certify Q_G and Q_D constant signs", () => {
  const packet = artifact();
  const summary = packet.coefficient_interval_summary;
  const firstRow = packet.coefficient_interval_rows[0];

  assert.equal(summary.speed_cell_count, 16);
  assert.equal(summary.branch_cell_count, 32);
  assert.equal(summary.all_rows_certified, true);
  assert.equal(summary.all_h0_intervals_inside_predecessor_tubes, true);
  assert.equal(summary.all_source_equation_coefficients_contain_zero_y0_to_y4, true);
  assert.equal(summary.all_constant_and_first_order_cancellations_contain_zero, true);
  assert.ok(Number(summary.max_abs_P0_minus_L_interval) < 1e-5);
  assert.ok(Number(summary.max_abs_P1_interval) < 1e-5);
  assert.ok(Number(summary.max_abs_D0_minus_L_interval) < 1e-5);
  assert.ok(Number(summary.max_abs_D1_interval) < 1e-300);
  assert.deepEqual(summary.Q_G_y0_coefficient_interval_hull, [
    0.0858514065706,
    0.0860595284316,
  ]);
  assert.deepEqual(summary.Q_D_y0_coefficient_interval_hull, [
    -0.0860595284316,
    -0.0858514065706,
  ]);
  assert.ok(Number(summary.min_Q_G_y0_positive_clearance) > 0.085);
  assert.ok(Number(summary.min_Q_D_y0_negative_clearance) > 0.085);
  assert.equal(Number(summary.max_abs_Q_D_plus_Q_G_y0_coefficient_interval), 0);
  assert.ok(firstRow.P0_minus_L_interval[0] <= 0);
  assert.ok(firstRow.P0_minus_L_interval[1] >= 0);
  assert.ok(firstRow.P1_interval[0] <= 0);
  assert.ok(firstRow.P1_interval[1] >= 0);
  assert.equal(firstRow.Q_G_y0_coefficient_sign, "+");
  assert.equal(firstRow.Q_D_y0_coefficient_sign, "-");
  assert.equal(firstRow.row_status, "directed-rounded-first-y-GD-constant-coefficient-enclosed");
});

test("first-y coefficient interval certificate keeps remainder closure open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_constant_coefficient_enclosure,
    true
  );
  assert.equal(packet.artifact_claim.certifies_sampled_first_y_GD_jet_cancellation, true);
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
});

test("first-y coefficient interval validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdCoefficientIntervalCertificate({
        speedCellCount: 2,
      }),
    /speedCellCount/
  );

  const packet = clone(artifact());
  packet.coefficient_interval_parameters.speed_band = [0.5, 1.5];
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_remainder = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder = true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdCoefficientIntervalCertificate(
      packet
    );

  assert.ok(
    errors.includes(
      "first-y coefficient interval parameters must not contain speed-band fields"
    )
  );
  assert.ok(
    errors.includes(
      "artifact claim must keep first-y remainder, full quotient, scaled remainder, I1, and retention open"
    )
  );
});

test("first-y coefficient interval CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "theta3minus-first-y-coeff-"));
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_COEFFICIENT_INTERVAL_CERTIFICATE_SCHEMA
  );
});
