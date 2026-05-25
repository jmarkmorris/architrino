import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_SECOND_ORDER_POST_SEED_COEFFICIENT_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySecondOrderPostSeedCoefficientCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySecondOrderPostSeedCoefficientCertificate,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-second-order-post-seed-coefficient-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-twenty-second-order-post-seed-coefficient-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySecondOrderPostSeedCoefficientCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-second-order-post-seed-coefficient-certificate.mjs"
  );
}

test("theta3minus fold-pair first-y G/D twenty-second-order post-seed coefficient certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySecondOrderPostSeedCoefficientCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_SECOND_ORDER_POST_SEED_COEFFICIENT_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_twenty_second_order_post_seed_coefficient_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("first-y twenty-second-order post-seed coefficient certificate imposes no fixed speed band", () => {
  const packet = artifact();
  const params = packet.twenty_second_order_post_seed_coefficient_parameters;

  assert.equal(params.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(params.speed_ratio_enclosure, [3.02156, 3.02157]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(params.speed_band, undefined);
  assert.equal(params.speed_window, undefined);
  assert.equal(params.speed_min, undefined);
  assert.equal(params.speed_max, undefined);
});

test("first-y post-seed coefficient intervals certify h22 and Q_G/Q_D y22 coefficients", () => {
  const packet = artifact();
  const summary = packet.twenty_second_order_post_seed_coefficient_summary;
  const firstRow = packet.twenty_second_order_post_seed_coefficient_rows[0];

  assert.equal(summary.speed_cell_count, 128);
  assert.equal(summary.branch_cell_count, 256);
  assert.equal(summary.all_rows_certified, true);
  assert.equal(
    summary.all_source_equation_coefficients_contain_zero_y0_to_y26,
    true
  );
  assert.ok(
    Number(summary.max_abs_source_equation_coeff_y0_to_y26_interval) < 2e12
  );
  assert.ok(Number(summary.min_h22_solve_slope_clearance) > 0.79);
  assert.deepEqual(summary.h22_interval_hull, [
    -707360216399,
    707360216399,
  ]);
  assert.deepEqual(summary.Q_G_y22_coefficient_interval_hull, [
    -602441567891,
    602182148318,
  ]);
  assert.deepEqual(summary.Q_D_y22_coefficient_interval_hull, [
    -13850189411300,
    13856156061500,
  ]);
  assert.ok(Number(summary.max_abs_h22_interval) < 8e11);
  assert.ok(Number(summary.max_abs_Q_G_y22_coefficient_interval) < 6.1e11);
  assert.ok(Number(summary.max_abs_Q_D_y22_coefficient_interval) < 1.39e13);
  assert.ok(
    Number(summary.max_Q_G_twenty_second_order_loss_on_first_y_cell) <
      2.5e-49
  );
  assert.ok(
    Number(summary.max_Q_D_twenty_second_order_loss_on_first_y_cell) <
      5.6e-48
  );
  assert.equal(summary.all_QD_QG_coefficient_identity_intervals_contain_zero, true);
  assert.ok(
    Number(summary.max_abs_Q_D_plus_23Q_G_y22_coefficient_interval) <
      2.78e13
  );
  assert.ok(firstRow.Q_D_plus_23Q_G_y22_coefficient_interval[0] <= 0);
  assert.ok(firstRow.Q_D_plus_23Q_G_y22_coefficient_interval[1] >= 0);
  assert.ok(
    Number(summary.min_Q_G_remaining_twenty_third_order_tail_budget) >
      1.2e62
  );
  assert.ok(
    Number(summary.min_Q_D_remaining_twenty_third_order_tail_budget) >
      1.2e62
  );
  assert.equal(
    firstRow.row_status,
    "directed-rounded-first-y-GD-twenty-second-order-post-seed-coefficient-enclosed"
  );
});

test("first-y post-seed coefficient certificate keeps finite tube and quotient closure open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_twenty_second_order_post_seed_coefficient_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_root_tail_tube,
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
    "theta3minus.fold-pair-first-y-GD-twenty-third-order-tail-bound-directed-rounded-required"
  );
});

test("first-y post-seed coefficient validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySecondOrderPostSeedCoefficientCertificate({
        speedCellCount: 2,
      }),
    /speedCellCount/
  );

  const packet = clone(artifact());
  packet.twenty_second_order_post_seed_coefficient_parameters.speed_band =
    "forbidden";
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_root_tail_tube = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_remainder = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder = true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentySecondOrderPostSeedCoefficientCertificate(
      packet
    );

  assert.ok(
    errors.includes(
      "first-y twenty-second-order post-seed coefficient parameters must not contain speed-band fields"
    )
  );
  assert.ok(
    errors.includes(
      "artifact claim must keep finite root-tail tube, first-y finite remainder, full quotient, scaled remainder, I1, and retention open"
    )
  );
});

test("first-y post-seed coefficient CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "theta3minus-first-y-post-seed-")
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_SECOND_ORDER_POST_SEED_COEFFICIENT_CERTIFICATE_SCHEMA
  );
});
