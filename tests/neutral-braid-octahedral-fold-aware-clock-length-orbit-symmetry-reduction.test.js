import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_ORBIT_SYMMETRY_REDUCTION_SCHEMA,
  buildOctahedralFoldAwareClockLengthOrbitSymmetryReduction,
  validateOctahedralFoldAwareClockLengthOrbitSymmetryReduction,
} from "../scripts/neutral-braid/octahedral-fold-aware-clock-length-orbit-symmetry-reduction.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralFoldAwareClockLengthOrbitSymmetryReduction({
      sampleCount: 64,
      rootSubdivisions: 5000,
    });
  }
  return cachedArtifact;
}

test("fold-aware clock length orbit symmetry reduction states the sampled scope", () => {
  const reduction = artifact();

  assert.deepEqual(validateOctahedralFoldAwareClockLengthOrbitSymmetryReduction(reduction), []);
  assert.equal(reduction.schema, OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_ORBIT_SYMMETRY_REDUCTION_SCHEMA);
  assert.equal(reduction.packet_id, "octahedral_fold_aware_clock_length_orbit_symmetry_reduction");
  assert.equal(reduction.promotion_status, "priority-only");
  assert.equal(reduction.source_orbit_check.valid, true);
  assert.equal(reduction.reduction_scope, "sampled-clock-length-receiver-orbit");
  assert.equal(reduction.reduction_domain.reference_receiver_label, "1+");
  assert.deepEqual(reduction.reduction_domain.covered_receiver_labels, ["1+", "1-", "2+", "2-", "3+", "3-"]);
});

test("fold-aware clock length orbit symmetry reduction records chart assumptions", () => {
  const reduction = artifact();

  assert.equal(reduction.reduction_domain.speed_constraint, "none; no fixed speed window is imposed");
  assert.equal(reduction.reduction_domain.requires_source_relabeling, true);
  assert.equal(reduction.reduction_domain.requires_phase_shift, true);
  assert.equal(reduction.reduction_domain.fold_aware_all_roots_required, true);
  assert.equal(reduction.reduction_domain.ordinary_theta_dropped_root_ledger_allowed, false);
  assert.equal(reduction.reduction_domain.same_zero_ray_required, true);
  assert.deepEqual(
    reduction.reduction_domain.orbit_generators.map((row) => row.id),
    ["C", "S"]
  );
  assert.equal(reduction.reduction_domain.receiver_maps.length, 6);
  assert.equal(reduction.reduction_domain.maps_cover_receiver_orbit, true);
});

test("fold-aware clock length orbit symmetry reduction keeps interval replacement conditional", () => {
  const reduction = artifact();

  assert.equal(reduction.reduction_lemma.status, "candidate-for-interval-chart-proof");
  assert.match(reduction.reduction_lemma.interval_certificate_reduction_condition, /would be sufficient/);
  assert.match(reduction.reduction_lemma.root_equation_identity, /Phi_\{g i,g j\}/);
  assert.match(reduction.reduction_lemma.jacobian_identity, /same root eta/);
  assert.match(reduction.reduction_lemma.force_vector_identity, /Q_g F_i/);
  assert.equal(reduction.proof_burden_reduction.interval_certificate_receiver_rows_before_chart_proof, 6);
  assert.equal(reduction.proof_burden_reduction.conditional_representative_rows_after_chart_proof, 1);
  assert.equal(reduction.proof_burden_reduction.can_replace_six_receiver_interval_certification, false);
  assert.ok(reduction.proof_burden_reduction.remaining_interval_targets.length >= 4);
});

test("fold-aware clock length orbit symmetry reduction verifies sampled equivariance checksum", () => {
  const reduction = artifact();

  assert.equal(reduction.sampled_checksum.equivariance_status, "sampled-receiver-orbit-equivariance-checked");
  assert.deepEqual(reduction.sampled_checksum.root_count_set, [7, 9]);
  assert.ok(reduction.sampled_checksum.jacobian_floor_min > 0.1);
  assert.ok(reduction.sampled_checksum.weakest_positivity_margin > 2.8);
  assert.ok(reduction.sampled_checksum.direct_spread_checks.primitive_minimum < 1e-9);
  assert.ok(reduction.sampled_checksum.direct_spread_checks.positivity_margin < 1e-9);
});

test("fold-aware clock length orbit symmetry reduction preserves non-retention boundaries", () => {
  const reduction = artifact();

  assert.equal(reduction.artifact_claim.certifies_sampled_receiver_orbit_equivariance, true);
  assert.equal(reduction.artifact_claim.certifies_interval_receiver_orbit_symmetry_reduction, false);
  assert.equal(reduction.artifact_claim.certifies_receiver_orbit_interval_clock_length_return, false);
  assert.equal(reduction.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(reduction.artifact_claim.retained_branch, false);
  assert.equal(reduction.result.retention, "not_retained");
  assert.equal(reduction.result.retained_branch, false);
  assert.equal(
    reduction.result.theory_status,
    "sampled-fold-aware-clock-length-receiver-orbit-equivariance-reduction-staged"
  );
});

test("fold-aware clock length orbit symmetry reduction CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-fold-aware-clock-orbit-symmetry-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL(
      "../scripts/neutral-braid/octahedral-fold-aware-clock-length-orbit-symmetry-reduction.mjs",
      import.meta.url
    )
  );

  execFileSync(
    process.execPath,
    [scriptPath, "--samples", "64", "--subdivisions", "5000", "--out", artifactPath, "--pretty"],
    { encoding: "utf8" }
  );

  const reduction = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralFoldAwareClockLengthOrbitSymmetryReduction(reduction), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(
    validation.result.theory_status,
    "sampled-fold-aware-clock-length-receiver-orbit-equivariance-reduction-staged"
  );

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(
    schema.artifact_schema,
    OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_ORBIT_SYMMETRY_REDUCTION_SCHEMA
  );
});
