import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_REPRESENTATIVE_PROFILE_DECOMPOSITION_SCHEMA,
  buildOctahedralFoldAwareRepresentativeProfileDecomposition,
  validateOctahedralFoldAwareRepresentativeProfileDecomposition,
} from "../scripts/neutral-swarm/octahedral-fold-aware-representative-profile-decomposition.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralFoldAwareRepresentativeProfileDecomposition({
      sampleCount: 64,
      rootSubdivisions: 5000,
    });
  }
  return cachedArtifact;
}

test("fold-aware representative profile decomposition validates source packets", () => {
  const decomposition = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareRepresentativeProfileDecomposition(decomposition),
    []
  );
  assert.equal(
    decomposition.schema,
    OCTAHEDRAL_FOLD_AWARE_REPRESENTATIVE_PROFILE_DECOMPOSITION_SCHEMA
  );
  assert.equal(
    decomposition.packet_id,
    "octahedral_fold_aware_representative_profile_decomposition"
  );
  assert.equal(decomposition.promotion_status, "priority-only");
  assert.equal(decomposition.source_zero_check.valid, true);
  assert.equal(decomposition.source_chart_closure_check.valid, true);
});

test("fold-aware representative profile decomposition imposes no fixed speed window", () => {
  const decomposition = artifact();

  assert.equal(
    decomposition.representative_profile_decomposition.speed_constraint,
    "none; uses the certified positive speed-ratio zero enclosure only"
  );
  assert.deepEqual(
    decomposition.representative_profile_decomposition.speed_ratio_enclosure,
    [3.02156, 3.02157]
  );
  assert.equal(
    decomposition.representative_profile_decomposition.speed_ratio_estimate,
    3.021564740248
  );
  assert.equal(decomposition.artifact_claim.assumes_fixed_speed_window, false);
});

test("fold-aware representative profile decomposition states the partner null identity", () => {
  const decomposition = artifact();
  const partner = decomposition.analytic_partner_null;

  assert.equal(partner.root_coordinate, "x=delta/2");
  assert.match(partner.positive_sheet_equation, /x-v\*cos\(x\)=0/);
  assert.match(partner.negative_sheet_equation, /x\+v\*cos\(x\)=0/);
  assert.equal(partner.proportionality_relation, "P_alpha(v)=2*pi*v*S_alpha(v)");
  assert.equal(partner.all_root_relation, "P_all(v)=2*pi*v*S_partner(v)");
  assert.equal(partner.theta_independent, true);
  assert.equal(partner.root_count_at_zero, 3);
  assert.equal(partner.certifies_partner_pointwise_tangential_zero, true);
  assert.ok(Math.abs(partner.partner_scalar_sum_estimate) <= 1e-10);
});

test("fold-aware representative profile decomposition checksum covers folds and partner nullity", () => {
  const decomposition = artifact();
  const checksum = decomposition.executable_checksum;

  assert.equal(checksum.status, "representative-partner-pointwise-null-check-passed");
  assert.deepEqual(checksum.active_root_counts, [7, 9]);
  assert.deepEqual(checksum.partner_root_counts, [3]);
  assert.deepEqual(checksum.cross_root_counts, [4, 6]);
  assert.ok(checksum.max_partner_tangential_abs <= 1e-10);
  assert.ok(checksum.max_total_minus_cross_tangential_abs <= 1e-10);
  assert.equal(
    checksum.cross_binary_symmetry.status,
    "cross-binary-quarter-antisymmetry-check-passed"
  );
  assert.ok(checksum.cross_binary_symmetry.max_quarter_shift_antisymmetry_residual <= 1e-10);
  assert.ok(checksum.cross_binary_symmetry.max_half_period_residual <= 1e-10);
});

test("fold-aware representative profile decomposition preserves the fixed-speed obstruction", () => {
  const decomposition = artifact();
  const witness = decomposition.executable_checksum.fixed_speed_rejection_witness;

  assert.equal(witness.theta, 0.785398163397);
  assert.equal(witness.partner_root_count, 3);
  assert.equal(witness.cross_root_count, 6);
  assert.ok(Math.abs(witness.partner_tangential_value) <= 1e-10);
  assert.ok(Math.abs(witness.total_tangential_value) > 0.1);
  assert.equal(witness.status, "fixed-speed-total-tangential-closure-still-rejected");
  assert.equal(decomposition.artifact_claim.certifies_total_pointwise_tangential_zero, false);
});

test("fold-aware representative profile decomposition leaves cross-binary interval profile open", () => {
  const decomposition = artifact();

  assert.equal(
    decomposition.cross_binary_remainder.certifies_cross_binary_coarea_interval_profile,
    false
  );
  assert.equal(
    decomposition.cross_binary_remainder.symmetry_reduction.quarter_shift_identity,
    "f_cross(u+H/4)=-f_cross(u)"
  );
  assert.equal(
    decomposition.cross_binary_remainder.symmetry_reduction.primitive_quarter_transport,
    "A_cross(u+H/4)=C_cross-A_cross(u)"
  );
  assert.equal(
    decomposition.cross_binary_remainder.symmetry_reduction.primitive_mean_relation,
    "Abar_cross=C_cross/2"
  );
  assert.equal(
    decomposition.cross_binary_remainder.symmetry_reduction.certifies_cross_binary_period_mean_zero,
    true
  );
  assert.equal(decomposition.cross_binary_remainder.regular_subcharts_required, true);
  assert.equal(decomposition.cross_binary_remainder.explicit_fold_rows_required, true);
  assert.equal(decomposition.artifact_claim.certifies_cross_binary_period_mean_zero, true);
  assert.equal(decomposition.artifact_claim.certifies_cross_binary_coarea_interval_profile, false);
  assert.equal(decomposition.artifact_claim.certifies_representative_interval_profile, false);
  assert.equal(
    decomposition.artifact_claim.certifies_receiver_orbit_interval_clock_length_return,
    false
  );
  assert.equal(decomposition.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(decomposition.result.retention, "not_retained");
  assert.equal(decomposition.result.retained_branch, false);
});

test("fold-aware representative profile decomposition CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-swarm-fold-aware-rep-profile-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL(
      "../scripts/neutral-swarm/octahedral-fold-aware-representative-profile-decomposition.mjs",
      import.meta.url
    )
  );

  execFileSync(
    process.execPath,
    [scriptPath, "--samples", "64", "--subdivisions", "5000", "--out", artifactPath, "--pretty"],
    { encoding: "utf8" }
  );

  const decomposition = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(
    validateOctahedralFoldAwareRepresentativeProfileDecomposition(decomposition),
    []
  );

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], {
      encoding: "utf8",
    })
  );
  assert.equal(validation.valid, true);
  assert.equal(
    validation.result.theory_status,
    "fold-aware-representative-partner-null-decomposition-certified"
  );

  const schema = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" })
  );
  assert.equal(
    schema.artifact_schema,
    OCTAHEDRAL_FOLD_AWARE_REPRESENTATIVE_PROFILE_DECOMPOSITION_SCHEMA
  );
});
