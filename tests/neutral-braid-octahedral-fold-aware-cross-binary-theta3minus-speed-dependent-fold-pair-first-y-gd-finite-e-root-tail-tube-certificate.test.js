import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_E_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteERootTailTubeCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteERootTailTubeCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-e-root-tail-tube-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-GD-finite-E-root-tail-tube-obstruction-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteERootTailTubeCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-e-root-tail-tube-certificate.mjs"
  );
}

test("theta3minus fold-pair first-y finite E root-tail tube obstruction certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteERootTailTubeCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_E_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_finite_e_root_tail_tube_certificate"
  );
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("finite E root-tail tube obstruction certificate imposes no fixed speed band", () => {
  const packet = artifact();
  const params = packet.finite_e_root_tail_tube_parameters;

  assert.equal(params.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(params.speed_ratio_enclosure, [3.02156, 3.02157]);
  assert.equal(params.speed_cell_count, 128);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(params.speed_band, undefined);
  assert.equal(params.speed_window, undefined);
  assert.equal(params.speed_min, undefined);
  assert.equal(params.speed_max, undefined);
});

test("finite E root-tail tube obstruction quantifies the direct-H failure", () => {
  const packet = artifact();
  const summary = packet.finite_e_root_tail_tube_summary;

  assert.equal(summary.speed_cell_count, 128);
  assert.equal(summary.y_subcell_count, 16);
  assert.equal(summary.positive_y_subcell_count, 15);
  assert.equal(summary.direct_probe_row_count, 3840);
  assert.equal(summary.seed_artifact_valid, true);
  assert.equal(summary.all_rows_certified, true);
  assert.equal(summary.all_direct_H_endpoint_signs_fail, true);
  assert.equal(summary.all_direct_H_endpoint_intervals_contain_zero, true);
  assert.equal(summary.all_direct_J_signs_certified, true);
  assert.equal(summary.all_direct_partial_E_H_signs_certified, true);
  assert.equal(summary.all_rows_avoid_raw_y_inverse_division, true);
  assert.equal(summary.all_finite_E_root_tail_tubes_remain_open, true);
  assert.equal(summary.all_shift_25_evaluators_remain_open, true);
  assert.ok(Number(summary.min_direct_J_clearance) > 0.791);
  assert.ok(Number(summary.min_direct_partial_E_H_clearance) > 9e-84);
  assert.ok(
    Number(summary.max_direct_required_additional_E_padding_for_endpoint_signs) >
      1e80
  );
  assert.ok(
    Number(summary.max_direct_required_additional_E_padding_for_endpoint_signs) <
      1.1e80
  );
  assert.deepEqual(summary.direct_H_left_endpoint_interval_hull, [
    -0.000994320972445,
    0.00099428717414,
  ]);
  assert.deepEqual(summary.direct_H_right_endpoint_interval_hull, [
    -0.000994320972445,
    0.00099428717414,
  ]);
  assert.deepEqual(summary.inherited_h21_interval_hull, [
    -118506150229,
    118431723907,
  ]);
  assert.ok(
    Number(summary.inherited_min_Q_G_remaining_twenty_second_order_tail_budget) >
      2.16e59
  );
  assert.ok(
    Number(summary.inherited_min_Q_D_remaining_twenty_second_order_tail_budget) >
      2.16e59
  );
});

test("finite E root-tail tube obstruction keeps finite tube and closure claims open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim.certifies_direct_H_obstruction_to_finite_E_root_tail_tube,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_shift_25_finite_y_residual_evaluator,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_E_root_tail_tube,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder,
    false
  );
  assert.equal(packet.artifact_claim.certifies_I1_regular_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
});

test("finite E root-tail tube validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteERootTailTubeCertificate({
        ySubcellCount: 2,
      }),
    /ySubcellCount/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteERootTailTubeCertificate({
        eTubePadding: -1,
      }),
    /eTubePadding/
  );

  const packet = clone(artifact());
  packet.finite_e_root_tail_tube_parameters.speed_band = "forbidden";
  packet.artifact_claim.certifies_shift_25_finite_y_residual_evaluator = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_E_root_tail_tube = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder = true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdFiniteERootTailTubeCertificate(
      packet
    );

  assert.ok(
    errors.includes(
      "finite E root-tail tube parameters must not contain speed-band fields"
    )
  );
  assert.ok(
    errors.includes(
      "artifact claim must keep Shift_25 evaluator, finite E tube, full quotient, scaled remainder, I1, and retention open"
    )
  );
});

test("finite E root-tail tube CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "theta3minus-finite-e-root-tail-tube-")
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_FINITE_E_ROOT_TAIL_TUBE_CERTIFICATE_SCHEMA
  );
});
