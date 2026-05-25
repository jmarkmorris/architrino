import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_SEVENTH_ORDER_LOWER_COEFFICIENT_CANCELLATION_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySeventhOrderLowerCoefficientCancellationCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySeventhOrderLowerCoefficientCancellationCertificate,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-seventh-order-lower-coefficient-cancellation-certificate.mjs";

const EXPECTED_STATUS =
  "coefficient-preserving-theta3minus-fold-pair-first-y-GD-twenty-seventh-order-lower-coefficient-cancellation-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySeventhOrderLowerCoefficientCancellationCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-seventh-order-lower-coefficient-cancellation-certificate.mjs"
  );
}

test("theta3minus fold-pair first-y G/D twenty-seventh-order lower-coefficient cancellation certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySeventhOrderLowerCoefficientCancellationCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_SEVENTH_ORDER_LOWER_COEFFICIENT_CANCELLATION_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_twenty_seventh_order_lower_coefficient_cancellation_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("twenty-seventh-order lower-coefficient cancellation imposes no fixed speed band", () => {
  const packet = artifact();
  const params = packet.lower_coefficient_cancellation_parameters;

  assert.equal(params.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(params.speed_ratio_enclosure, [3.02156, 3.02157]);
  assert.equal(params.speed_cell_count, 128);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(params.speed_band, undefined);
  assert.equal(params.speed_window, undefined);
  assert.equal(params.speed_min, undefined);
  assert.equal(params.speed_max, undefined);
});

test("twenty-seventh-order lower numerator coefficients cancel through y28 before y29 division", () => {
  const packet = artifact();
  const summary = packet.lower_coefficient_cancellation_summary;
  const firstRow = packet.lower_coefficient_cancellation_rows[0];

  assert.equal(summary.speed_cell_count, 128);
  assert.equal(summary.predecessor_twenty_sixth_order_artifact_valid, true);
  assert.deepEqual(summary.predecessor_validation_errors, []);
  assert.equal(summary.all_rows_certified, true);
  assert.equal(summary.missing_coefficient_data_count, 0);
  assert.deepEqual(summary.missing_coefficient_data, []);
  assert.equal(
    summary.all_G_lower_numerator_coefficients_y0_to_y28_contain_zero,
    true
  );
  assert.equal(
    summary.all_D_lower_numerator_coefficients_y0_to_y28_contain_zero,
    true
  );
  assert.equal(
    summary.all_lower_numerator_identity_coefficients_y0_to_y28_contain_zero,
    true
  );
  assert.equal(summary.all_rows_avoid_raw_y_inverse_division_before_shift, true);
  assert.equal(summary.all_finite_tail_bounds_remain_open, true);
  assert.equal(summary.numerator_shift_power, 29);
  assert.equal(summary.quotient_tail_order, 27);
  assert.equal(summary.lower_coefficient_count, 29);
  assert.deepEqual(summary.G_lower_numerator_residual_y0_to_y28_hull, [
    -1547553923340000,
    1547553923340000,
  ]);
  assert.deepEqual(summary.D_lower_numerator_residual_y0_to_y28_hull, [
    -41783955930100000,
    41783955930100000,
  ]);
  assert.deepEqual(summary.lower_numerator_identity_residual_y0_to_y28_hull, [
    -83567911860200000,
    83567911860200000,
  ]);
  assert.ok(
    Number(summary.max_abs_G_lower_numerator_residual_y0_to_y28) < 1.6e15
  );
  assert.ok(
    Number(summary.max_abs_D_lower_numerator_residual_y0_to_y28) < 4.2e16
  );
  assert.ok(
    Number(summary.max_abs_lower_numerator_identity_residual_y0_to_y28) <
      8.4e16
  );
  assert.equal(firstRow.raw_y_inverse_division_used, false);
  assert.equal(firstRow.y29_division_used, false);
  assert.equal(firstRow.finite_tail_bound_certified, false);
  assert.equal(firstRow.missing_coefficient_data.length, 0);
  assert.equal(
    firstRow.row_status,
    "coefficient-preserving-first-y-GD-twenty-seventh-order-lower-coefficient-cancellation-enclosed"
  );
});

test("twenty-seventh-order lower-coefficient certificate keeps C1 tail and downstream closure open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_coefficient_preserving_first_y_GD_twenty_seventh_order_lower_numerator_cancellation,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_lower_numerator_cancellation_through_y28_before_y29_division,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_shift29_is_licensed_for_lower_terms,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_C1_twenty_seventh_order_tail_bound,
    false
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_finite_remainder_bound,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder,
    false
  );
  assert.equal(packet.artifact_claim.certifies_I1_regular_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
});

test("twenty-seventh-order lower-coefficient validator rejects speed-band fields and overclaims", () => {
  const packet = clone(artifact());
  packet.lower_coefficient_cancellation_parameters.speed_band = "forbidden";
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_C1_twenty_seventh_order_tail_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder = true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySeventhOrderLowerCoefficientCancellationCertificate(
      packet
    );

  assert.ok(
    errors.includes(
      "lower-coefficient cancellation parameters must not contain speed-band fields"
    )
  );
  assert.ok(
    errors.includes(
      "artifact claim must certify only lower numerator cancellation and keep C1 tail, full quotient, scaled remainder, I1, and retention open"
    )
  );
});

test("twenty-seventh-order lower-coefficient CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "theta3minus-lower-cancellation-")
  );
  const outPath = path.join(tmpDir, "artifact.json");

  execFileSync(process.execPath, [scriptPath(), "--out", outPath]);
  const validateOutput = JSON.parse(
    execFileSync(process.execPath, [scriptPath(), "--validate", outPath], {
      encoding: "utf8",
    })
  );
  assert.equal(validateOutput.valid, true);

  const schemaOutput = JSON.parse(
    execFileSync(process.execPath, [scriptPath(), "--schema"], {
      encoding: "utf8",
    })
  );
  assert.equal(
    schemaOutput.artifact_schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_SEVENTH_ORDER_LOWER_COEFFICIENT_CANCELLATION_CERTIFICATE_SCHEMA
  );
});
