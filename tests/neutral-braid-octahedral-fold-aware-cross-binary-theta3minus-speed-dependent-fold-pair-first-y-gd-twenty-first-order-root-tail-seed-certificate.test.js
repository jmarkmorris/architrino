import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_FIRST_ORDER_ROOT_TAIL_SEED_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderRootTailSeedCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderRootTailSeedCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-root-tail-seed-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-twenty-first-order-root-tail-seed-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderRootTailSeedCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-root-tail-seed-certificate.mjs"
  );
}

test("theta3minus fold-pair first-y G/D twenty-first-order root-tail seed certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderRootTailSeedCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_FIRST_ORDER_ROOT_TAIL_SEED_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_twenty_first_order_root_tail_seed_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("first-y twenty-first-order root-tail seed certificate imposes no fixed speed band", () => {
  const packet = artifact();

  assert.equal(
    packet.twenty_first_order_root_tail_seed_parameters.speed_constraint,
    NO_SPEED_WINDOW
  );
  assert.deepEqual(
    packet.twenty_first_order_root_tail_seed_parameters.speed_ratio_enclosure,
    [3.02156, 3.02157]
  );
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(
    packet.twenty_first_order_root_tail_seed_parameters.speed_band,
    undefined
  );
  assert.equal(
    packet.twenty_first_order_root_tail_seed_parameters.speed_window,
    undefined
  );
  assert.equal(
    packet.twenty_first_order_root_tail_seed_parameters.speed_min,
    undefined
  );
  assert.equal(
    packet.twenty_first_order_root_tail_seed_parameters.speed_max,
    undefined
  );
});

test("first-y root-tail seed intervals certify h21 and Q_G/Q_D y21 coefficients", () => {
  const packet = artifact();
  const summary = packet.twenty_first_order_root_tail_seed_summary;
  const firstRow = packet.twenty_first_order_root_tail_seed_rows[0];

  assert.equal(summary.speed_cell_count, 128);
  assert.equal(summary.branch_cell_count, 256);
  assert.equal(summary.all_rows_certified, true);
  assert.equal(summary.all_h0_intervals_inside_predecessor_tubes, true);
  assert.equal(
    summary.all_source_equation_coefficients_contain_zero_y0_to_y25,
    true
  );
  assert.ok(
    Number(summary.max_abs_source_equation_coeff_y0_to_y25_interval) <
      306491061588
  );
  assert.ok(Number(summary.min_h21_solve_slope_clearance) > 0.79);
  assert.deepEqual(summary.h21_interval_hull, [
    -118506150229,
    118431723907,
  ]);
  assert.deepEqual(summary.Q_G_y21_coefficient_interval_hull, [
    -100935984646,
    100935984646,
  ]);
  assert.deepEqual(summary.Q_D_y21_coefficient_interval_hull, [
    -2220591662220,
    2220591662220,
  ]);
  assert.ok(Number(summary.max_abs_h21_interval) < 118506150230);
  assert.ok(Number(summary.max_abs_Q_G_y21_coefficient_interval) < 100935984647);
  assert.ok(Number(summary.max_abs_Q_D_y21_coefficient_interval) < 2220591662221);
  assert.ok(
    Number(summary.max_Q_G_twenty_first_order_loss_on_first_y_cell) <
      2.24e-47
  );
  assert.ok(
    Number(summary.max_Q_D_twenty_first_order_loss_on_first_y_cell) <
      4.92e-46
  );
  assert.equal(summary.all_QD_QG_coefficient_identity_intervals_contain_zero, true);
  assert.ok(
    Number(summary.max_abs_Q_D_plus_22Q_G_y21_coefficient_interval) <
      4441183324431
  );
  assert.ok(
    firstRow.Q_D_plus_22Q_G_y21_coefficient_interval[0] <= 0
  );
  assert.ok(
    firstRow.Q_D_plus_22Q_G_y21_coefficient_interval[1] >= 0
  );
  assert.ok(
    Number(summary.min_Q_G_remaining_twenty_second_order_tail_budget) >
      2.16e59
  );
  assert.ok(
    Number(summary.min_Q_D_remaining_twenty_second_order_tail_budget) >
      2.16e59
  );
  assert.equal(
    firstRow.row_status,
    "directed-rounded-first-y-GD-twenty-first-order-root-tail-seed-enclosed"
  );
});

test("first-y root-tail seed certificate keeps finite E tube and quotient closure open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_twentieth_order_jet_coefficient_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_twenty_first_order_root_tail_seed_coefficient_enclosure,
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
    "theta3minus.fold-pair-first-y-GD-twenty-second-order-tail-bound-directed-rounded-required"
  );
});

test("first-y root-tail seed validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderRootTailSeedCertificate({
        speedCellCount: 2,
      }),
    /speedCellCount/
  );

  const packet = clone(artifact());
  packet.twenty_first_order_root_tail_seed_parameters.speed_band = "forbidden";
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_root_tail_tube = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_remainder = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder = true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdTwentyFirstOrderRootTailSeedCertificate(
      packet
    );

  assert.ok(
    errors.includes(
      "first-y twenty-first-order root-tail seed parameters must not contain speed-band fields"
    )
  );
  assert.ok(
    errors.includes(
      "artifact claim must keep finite root-tail tube, first-y finite remainder, full quotient, scaled remainder, I1, and retention open"
    )
  );
});

test("first-y root-tail seed CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "theta3minus-first-y-root-tail-seed-")
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_TWENTY_FIRST_ORDER_ROOT_TAIL_SEED_CERTIFICATE_SCHEMA
  );
});
