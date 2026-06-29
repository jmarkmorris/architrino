import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_SHIFT29_SUCCESSOR_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift29SuccessorRootTailTubeCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift29SuccessorRootTailTubeCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-shift29-successor-root-tail-tube-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-finite-shift29-successor-root-tail-tube-certified";
const NO_SPEED_WINDOW =
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift29SuccessorRootTailTubeCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-shift29-successor-root-tail-tube-certificate.mjs"
  );
}

test("theta3minus fold-pair first-y finite Shift29 successor root-tail tube certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift29SuccessorRootTailTubeCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_SHIFT29_SUCCESSOR_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_finite_shift29_successor_root_tail_tube_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("finite Shift29 successor root-tail tube certificate imposes no fixed speed band", () => {
  const packet = artifact();
  const params = packet.finite_shift29_successor_root_tail_tube_parameters;

  assert.equal(params.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(params.speed_ratio_enclosure, [3.02156, 3.02157]);
  assert.equal(params.speed_cell_count, 128);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(params.speed_band, undefined);
  assert.equal(params.speed_window, undefined);
  assert.equal(params.speed_min, undefined);
  assert.equal(params.speed_max, undefined);
});

test("finite Shift29 successor root-tail tube certifies endpoint signs, monotonicity, and predecessor U containment", () => {
  const packet = artifact();
  const summary = packet.finite_shift29_successor_root_tail_tube_summary;
  const firstRow = packet.finite_shift29_successor_root_tail_tube_rows[0];

  assert.equal(summary.speed_cell_count, 128);
  assert.equal(summary.branch_count, 2);
  assert.equal(summary.y_subcell_count, 16);
  assert.equal(summary.positive_y_subcell_count, 15);
  assert.equal(summary.finite_shift29_row_count, 3840);
  assert.equal(summary.shift_power, 29);
  assert.equal(summary.shift_series_order, 56);
  assert.equal(summary.h25_seed_artifact_valid, true);
  assert.equal(summary.all_rows_certified, true);
  assert.equal(
    summary.all_lower_shift_coefficients_contain_zero_y0_to_y28,
    true
  );
  assert.equal(summary.all_shift29_endpoint_signs_certified, true);
  assert.equal(summary.all_partial_Z_R_shift29_signs_certified, true);
  assert.equal(
    summary.all_U_images_from_Z_tube_inside_predecessor_tube,
    true
  );
  assert.equal(summary.all_rows_use_coefficient_shift, true);
  assert.equal(summary.all_rows_avoid_raw_y_inverse_division, true);
  assert.equal(summary.all_finite_shift29_Z_root_tail_tubes_certified, true);
  assert.ok(Number(summary.min_shift29_endpoint_clearance) > 7.9e15);
  assert.ok(Number(summary.min_partial_Z_R_shift29_clearance) > 0.79);
  assert.ok(Number(summary.max_abs_shift29_trig_remainder) < 1e-140);
  assert.ok(Number(summary.max_Z_tube_abs_upper) > 1e16);
  assert.ok(Number(summary.max_U_image_from_Z_tube_abs_upper) < 5e12);
  assert.ok(Number(summary.max_abs_lower_shift_residual_y0_to_y28) > 2e16);
  assert.ok(Number(summary.max_abs_lower_shift_residual_y0_to_y28) < 2.1e16);
  assert.deepEqual(summary.inherited_h25_interval_hull, [
    -152196183760000,
    152188011264000,
  ]);
  assert.deepEqual(summary.inherited_Q_G_y25_coefficient_interval_hull, [
    -129647700798000,
    129647700798000,
  ]);
  assert.deepEqual(summary.inherited_Q_D_y25_coefficient_interval_hull, [
    -3370840220760000,
    3370840220760000,
  ]);
  assert.ok(
    Number(summary.inherited_min_Q_G_remaining_twenty_sixth_order_tail_budget) >
      2e70
  );
  assert.ok(
    Number(summary.inherited_min_Q_D_remaining_twenty_sixth_order_tail_budget) >
      2e70
  );
  assert.equal(firstRow.shift29_coefficient_shift_used, true);
  assert.equal(firstRow.shift29_raw_y_inverse_division_used, false);
  assert.equal(firstRow.zero_touching_y_division_used, false);
  assert.equal(firstRow.U_image_from_Z_tube_inside_predecessor_tube, true);
  assert.equal(firstRow.row_status, "finite-shift29-successor-root-tail-tube-certified");
});

test("finite Shift29 successor root-tail tube closes only the finite successor tube row", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim.certifies_shift_29_finite_y_residual_z_evaluator,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_finite_shift29_Z_root_tail_tube_positive_y,
    true
  );
  assert.equal(packet.artifact_claim.certifies_first_y_zero_endpoint_Z_seed, true);
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_finite_successor_root_tail_tube,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound,
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
    "theta3minus.fold-pair-first-y-GD-twenty-sixth-order-tail-bound-directed-rounded-required"
  );
});

test("finite Shift29 successor root-tail tube validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift29SuccessorRootTailTubeCertificate(
        { ySubcellCount: 2 }
      ),
    /ySubcellCount/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift29SuccessorRootTailTubeCertificate(
        { zTubePadding: -1 }
      ),
    /zTubePadding/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift29SuccessorRootTailTubeCertificate(
        { uPredecessorTubePadding: -1 }
      ),
    /uPredecessorTubePadding/
  );

  const packet = clone(artifact());
  packet.finite_shift29_successor_root_tail_tube_parameters.speed_band =
    "forbidden";
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder = true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_quadrature = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteShift29SuccessorRootTailTubeCertificate(
      packet
    );

  assert.ok(
    errors.includes(
      "finite Shift29 successor root-tail tube parameters must not contain speed-band fields"
    )
  );
  assert.ok(
    errors.includes(
      "artifact claim must certify only the finite Shift29 successor tube and keep continuous quotient tail, full quotient, scaled remainder, I1, quadrature, and retention open"
    )
  );
});

test("finite Shift29 successor root-tail tube CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "theta3minus-finite-shift29-root-tail-tube-")
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_SHIFT29_SUCCESSOR_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA
  );
});
