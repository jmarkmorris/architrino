import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_SHIFT25_E_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift25ERootTailTubeCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift25ERootTailTubeCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-shift25-e-root-tail-tube-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-finite-shift25-E-root-tail-tube-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift25ERootTailTubeCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-shift25-e-root-tail-tube-certificate.mjs"
  );
}

test("theta3minus fold-pair first-y finite Shift25 E root-tail tube certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift25ERootTailTubeCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_SHIFT25_E_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_finite_shift25_e_root_tail_tube_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("finite Shift25 E root-tail tube certificate imposes no fixed speed band", () => {
  const packet = artifact();
  const params = packet.finite_shift25_e_root_tail_tube_parameters;

  assert.equal(params.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(params.speed_ratio_enclosure, [3.02156, 3.02157]);
  assert.equal(params.speed_cell_count, 128);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(params.speed_band, undefined);
  assert.equal(params.speed_window, undefined);
  assert.equal(params.speed_min, undefined);
  assert.equal(params.speed_max, undefined);
});

test("finite Shift25 E root-tail tube certifies positive-y shifted endpoints and derivative signs", () => {
  const packet = artifact();
  const summary = packet.finite_shift25_e_root_tail_tube_summary;
  const firstRow = packet.finite_shift25_e_root_tail_tube_rows[0];

  assert.equal(summary.speed_cell_count, 128);
  assert.equal(summary.branch_count, 2);
  assert.equal(summary.y_subcell_count, 16);
  assert.equal(summary.positive_y_subcell_count, 15);
  assert.equal(summary.finite_shift25_row_count, 3840);
  assert.equal(summary.shift_power, 25);
  assert.equal(summary.shift_series_order, 48);
  assert.equal(summary.seed_artifact_valid, true);
  assert.equal(summary.post_seed_artifact_valid, true);
  assert.equal(summary.all_rows_certified, true);
  assert.equal(
    summary.all_lower_shift_coefficients_contain_zero_y0_to_y24,
    true
  );
  assert.equal(summary.all_shift25_endpoint_signs_certified, true);
  assert.equal(summary.all_partial_E_R_shift25_signs_certified, true);
  assert.equal(summary.all_rows_use_coefficient_shift, true);
  assert.equal(summary.all_rows_avoid_raw_y_inverse_division, true);
  assert.equal(summary.all_finite_shift25_E_root_tail_tubes_certified, true);
  assert.ok(Number(summary.min_shift25_endpoint_clearance) > 7.9e15);
  assert.ok(Number(summary.min_partial_E_R_shift25_clearance) > 0.79);
  assert.ok(Number(summary.max_abs_shift25_trig_remainder) < 1e-100);
  assert.ok(Number(summary.max_abs_lower_shift_residual_y0_to_y24) > 1e16);
  assert.ok(Number(summary.max_abs_lower_shift_residual_y0_to_y24) < 2e16);
  assert.deepEqual(summary.R_shift25_left_endpoint_interval_hull, [
    -7935967179380000,
    7927616128260000,
  ]);
  assert.deepEqual(summary.R_shift25_right_endpoint_interval_hull, [
    -7927616128190000,
    7935967180590000,
  ]);
  assert.deepEqual(summary.inherited_h21_interval_hull, [
    -118506150229,
    118431723907,
  ]);
  assert.deepEqual(summary.inherited_h22_interval_hull, [
    -707360216399,
    707360216399,
  ]);
  assert.ok(
    Number(summary.inherited_min_Q_G_remaining_twenty_third_order_tail_budget) >
      1.2e62
  );
  assert.ok(
    Number(summary.inherited_min_Q_D_remaining_twenty_third_order_tail_budget) >
      1.2e62
  );
  assert.equal(firstRow.shift25_coefficient_shift_used, true);
  assert.equal(firstRow.shift25_raw_y_inverse_division_used, false);
  assert.equal(firstRow.zero_touching_y_division_used, false);
  assert.equal(firstRow.row_status, "finite-shift25-E-root-tail-tube-certified");
});

test("finite Shift25 E root-tail tube closes only the root-tail tube row", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim.certifies_shift_25_finite_y_residual_evaluator,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_finite_shift25_E_root_tail_tube_positive_y,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_first_y_zero_endpoint_root_tail_seed,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_finite_E_root_tail_tube,
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
    "theta3minus.fold-pair-first-y-GD-continuous-post-seed-GD-tail-bound-directed-rounded-required"
  );
});

test("finite Shift25 E root-tail tube validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift25ERootTailTubeCertificate(
        { ySubcellCount: 2 }
      ),
    /ySubcellCount/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift25ERootTailTubeCertificate(
        { eTubePadding: -1 }
      ),
    /eTubePadding/
  );

  const packet = clone(artifact());
  packet.finite_shift25_e_root_tail_tube_parameters.speed_band = "forbidden";
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder = true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift25ERootTailTubeCertificate(
      packet
    );

  assert.ok(
    errors.includes(
      "finite Shift25 E root-tail tube parameters must not contain speed-band fields"
    )
  );
  assert.ok(
    errors.includes(
      "artifact claim must certify only the finite Shift25 E tube and keep quotient remainder, scaled remainder, I1, and retention open"
    )
  );
});

test("finite Shift25 E root-tail tube CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "theta3minus-finite-shift25-e-root-tail-tube-")
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_SHIFT25_E_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA
  );
});
