import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_SHIFT31_NEXT_SUCCESSOR_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift31NextSuccessorRootTailTubeCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift31NextSuccessorRootTailTubeCertificate,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-shift31-next-successor-root-tail-tube-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-finite-shift31-next-successor-root-tail-tube-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift31NextSuccessorRootTailTubeCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-shift31-next-successor-root-tail-tube-certificate.mjs"
  );
}

test("theta3minus fold-pair first-y finite Shift31 next-successor root-tail tube certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift31NextSuccessorRootTailTubeCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_SHIFT31_NEXT_SUCCESSOR_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_finite_shift31_next_successor_root_tail_tube_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("finite Shift31 next-successor root-tail tube certificate imposes no fixed speed band", () => {
  const packet = artifact();
  const params = packet.finite_shift31_next_successor_root_tail_tube_parameters;

  assert.equal(params.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(params.speed_ratio_enclosure, [3.02156, 3.02157]);
  assert.equal(params.speed_cell_count, 128);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(params.speed_band, undefined);
  assert.equal(params.speed_window, undefined);
  assert.equal(params.speed_min, undefined);
  assert.equal(params.speed_max, undefined);
});

test("finite Shift31 next-successor root-tail tube certifies endpoint signs, monotonicity, and predecessor Z containment", () => {
  const packet = artifact();
  const summary = packet.finite_shift31_next_successor_root_tail_tube_summary;
  const firstRow = packet.finite_shift31_next_successor_root_tail_tube_rows[0];

  assert.equal(summary.speed_cell_count, 128);
  assert.equal(summary.branch_count, 2);
  assert.equal(summary.y_subcell_count, 16);
  assert.equal(summary.positive_y_subcell_count, 15);
  assert.equal(summary.finite_shift31_row_count, 3840);
  assert.equal(summary.shift_power, 31);
  assert.equal(summary.shift_series_order, 60);
  assert.equal(summary.h26_seed_artifact_valid, true);
  assert.equal(summary.finite_shift29_predecessor_artifact_valid, true);
  assert.equal(summary.all_rows_certified, true);
  assert.equal(
    summary.all_lower_shift_coefficients_contain_zero_y0_to_y30,
    true
  );
  assert.equal(summary.all_shift31_endpoint_signs_certified, true);
  assert.equal(summary.all_partial_W_R_shift31_signs_certified, true);
  assert.equal(
    summary.all_Z_images_from_W_tube_inside_predecessor_tube,
    true
  );
  assert.equal(summary.all_rows_use_coefficient_shift, true);
  assert.equal(summary.all_rows_avoid_raw_y_inverse_division, true);
  assert.equal(summary.all_finite_shift31_W_root_tail_tubes_certified, true);
  assert.ok(Number(summary.min_shift31_endpoint_clearance) > 7.87e17);
  assert.ok(Number(summary.min_partial_W_R_shift31_clearance) > 0.79);
  assert.ok(Number(summary.max_abs_shift31_trig_remainder) < 1e-150);
  assert.equal(Number(summary.max_W_tube_abs_upper), 1e18);
  assert.ok(Number(summary.max_Z_image_from_W_tube_abs_upper) < 1.6e14);
  assert.ok(Number(summary.max_abs_lower_shift_residual_y0_to_y30) > 1.9e18);
  assert.ok(Number(summary.max_abs_lower_shift_residual_y0_to_y30) < 2e18);
  assert.deepEqual(summary.inherited_h26_interval_hull, [
    -908343826729000,
    908343826729000,
  ]);
  assert.deepEqual(summary.inherited_Q_G_y26_coefficient_interval_hull, [
    -773778357003000,
    773775566334000,
  ]);
  assert.deepEqual(summary.inherited_Q_D_y26_coefficient_interval_hull, [
    -20891940291000000,
    20892015639100000,
  ]);
  assert.ok(
    Number(summary.inherited_min_Q_G_remaining_twenty_seventh_order_tail_budget) >
      1e73
  );
  assert.ok(
    Number(summary.inherited_min_Q_D_remaining_twenty_seventh_order_tail_budget) >
      1e73
  );
  assert.equal(firstRow.shift31_coefficient_shift_used, true);
  assert.equal(firstRow.shift31_raw_y_inverse_division_used, false);
  assert.equal(firstRow.zero_touching_y_division_used, false);
  assert.equal(firstRow.Z_image_from_W_tube_inside_predecessor_tube, true);
  assert.equal(
    firstRow.row_status,
    "finite-shift31-next-successor-root-tail-tube-certified"
  );
});

test("finite Shift31 next-successor root-tail tube closes only the finite next-successor tube row", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim.certifies_shift_31_finite_y_residual_w_evaluator,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_finite_shift31_W_root_tail_tube_positive_y,
    true
  );
  assert.equal(packet.artifact_claim.certifies_h26_imported_next_successor_chart, true);
  assert.equal(packet.artifact_claim.certifies_predecessor_Z_tube_containment, true);
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_finite_next_successor_root_tail_tube,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_continuous_next_successor_tail_bound,
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
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_first_y_GD_quadrature,
    false
  );
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(
    packet.result.first_successor_row,
    "theta3minus.fold-pair-first-y-GD-twenty-seventh-order-tail-bound-directed-rounded-required"
  );
});

test("finite Shift31 next-successor root-tail tube validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift31NextSuccessorRootTailTubeCertificate(
        { ySubcellCount: 2 }
      ),
    /ySubcellCount/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift31NextSuccessorRootTailTubeCertificate(
        { wTubePadding: -1 }
      ),
    /wTubePadding/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift31NextSuccessorRootTailTubeCertificate(
        { zPredecessorTubePadding: -1 }
      ),
    /zPredecessorTubePadding/
  );

  const packet = clone(artifact());
  packet.finite_shift31_next_successor_root_tail_tube_parameters.speed_band =
    "forbidden";
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_continuous_next_successor_tail_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder = true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_quadrature = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift31NextSuccessorRootTailTubeCertificate(
      packet
    );

  assert.ok(
    errors.includes(
      "finite Shift31 next-successor root-tail tube parameters must not contain speed-band fields"
    )
  );
  assert.ok(
    errors.includes(
      "artifact claim must certify only the finite Shift31 next-successor tube and keep continuous quotient tail, full quotient, scaled remainder, I1, quadrature, and retention open"
    )
  );
});

test("finite Shift31 next-successor root-tail tube CLI validates artifact JSON and reports schema", () => {
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "theta3minus-finite-shift31-root-tail-tube-")
  );
  const outPath = path.join(tmpDir, "artifact.json");
  fs.writeFileSync(outPath, `${JSON.stringify(artifact(), null, 2)}\n`);

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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_SHIFT31_NEXT_SUCCESSOR_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA
  );
});
