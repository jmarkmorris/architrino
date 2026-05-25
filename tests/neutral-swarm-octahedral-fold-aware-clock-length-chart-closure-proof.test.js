import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_CHART_CLOSURE_PROOF_SCHEMA,
  buildOctahedralFoldAwareClockLengthChartClosureProof,
  validateOctahedralFoldAwareClockLengthChartClosureProof,
} from "../scripts/neutral-swarm/octahedral-fold-aware-clock-length-chart-closure-proof.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralFoldAwareClockLengthChartClosureProof({
      sampleCount: 24,
      rootSubdivisions: 5000,
    });
  }
  return cachedArtifact;
}

test("fold-aware clock length chart closure proof validates source reduction and scope", () => {
  const proof = artifact();

  assert.deepEqual(validateOctahedralFoldAwareClockLengthChartClosureProof(proof), []);
  assert.equal(proof.schema, OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_CHART_CLOSURE_PROOF_SCHEMA);
  assert.equal(proof.packet_id, "octahedral_fold_aware_clock_length_chart_closure_proof");
  assert.equal(proof.promotion_status, "priority-only");
  assert.equal(proof.source_reduction_check.valid, true);
  assert.equal(proof.theorem_scope.scope, "scalar fold-aware clock/length receiver-orbit chart closure");
  assert.equal(proof.theorem_scope.speed_constraint, "none; no fixed speed window is imposed");
  assert.equal(proof.theorem_scope.tensor_or_observer_export_claim, false);
});

test("fold-aware clock length chart closure proof states analytic transport identities", () => {
  const proof = artifact();

  assert.match(proof.analytic_identities.root_equation, /Phi_\{g i,g j\}/);
  assert.match(proof.analytic_identities.root_set_bijection, /iff/);
  assert.match(proof.analytic_identities.jacobian, /J_\{g i,g j\}/);
  assert.match(proof.analytic_identities.force_vector, /Q_g F_i/);
  assert.match(proof.analytic_identities.scalar_forcing, /dot/);
  assert.match(proof.analytic_identities.clock_length, /positivity criterion/);
});

test("fold-aware clock length chart closure proof guards signed-cyclic conventions", () => {
  const proof = artifact();

  assert.deepEqual(
    proof.signed_cyclic_generators.map((row) => row.id),
    ["C", "S"]
  );
  assert.equal(proof.signed_cyclic_generators[0].phase_shift, "0");
  assert.match(proof.signed_cyclic_generators[1].orthogonal_map, /Q_S=-I/);
  assert.match(proof.signed_cyclic_generators[1].phase_shift, /signed-label convention/);
  assert.equal(proof.theorem_scope.all_ordered_distinct_sources_required, true);
  assert.equal(proof.theorem_scope.fold_aware_all_positive_roots_required, true);
  assert.equal(proof.theorem_scope.same_coarea_convention_required, true);
  assert.match(proof.theorem_scope.S_phase_convention, /sigma_S=0/);
  assert.equal(proof.theorem_scope.representative_zero_ray_speed_ratio, 3.021564740248);
});

test("fold-aware clock length chart closure proof checksum covers both generators", () => {
  const proof = artifact();

  assert.equal(proof.executable_checksum.status, "signed-cyclic-chart-closure-covariance-check-passed");
  assert.equal(proof.executable_checksum.generator_rows.length, 2);
  for (const row of proof.executable_checksum.generator_rows) {
    assert.equal(row.checksum_status, "signed-cyclic-generator-covariance-check-passed");
    assert.equal(row.source_product_failures, 0);
    assert.ok(row.max_root_equation_residual <= 1e-10);
    assert.ok(row.max_jacobian_residual <= 1e-10);
    assert.ok(row.max_force_vector_residual <= 1e-10);
    assert.ok(row.max_scalar_forcing_residual <= 1e-10);
  }
});

test("fold-aware clock length chart closure proof reduces only the receiver-orbit interval burden", () => {
  const proof = artifact();

  assert.equal(proof.proof_burden_reduction.certifies_signed_cyclic_chart_closure, true);
  assert.equal(proof.proof_burden_reduction.can_transport_representative_interval_profile_to_receiver_orbit, true);
  assert.equal(proof.proof_burden_reduction.interval_certificate_receiver_rows_before, 6);
  assert.equal(proof.proof_burden_reduction.interval_certificate_representative_rows_after, 1);
  assert.ok(proof.proof_burden_reduction.remaining_interval_targets.length >= 3);
});

test("fold-aware clock length chart closure proof preserves non-retention boundaries", () => {
  const proof = artifact();

  assert.equal(proof.artifact_claim.certifies_receiver_orbit_chart_closure, true);
  assert.equal(proof.artifact_claim.certifies_interval_receiver_orbit_symmetry_reduction, true);
  assert.equal(proof.artifact_claim.certifies_representative_interval_profile, false);
  assert.equal(proof.artifact_claim.certifies_receiver_orbit_interval_clock_length_return, false);
  assert.equal(proof.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(proof.artifact_claim.retained_branch, false);
  assert.equal(proof.result.retention, "not_retained");
  assert.equal(proof.result.retained_branch, false);
  assert.equal(
    proof.result.theory_status,
    "fold-aware-clock-length-receiver-orbit-chart-closure-certified"
  );
});

test("fold-aware clock length chart closure proof CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-swarm-fold-aware-chart-closure-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL(
      "../scripts/neutral-swarm/octahedral-fold-aware-clock-length-chart-closure-proof.mjs",
      import.meta.url
    )
  );

  execFileSync(
    process.execPath,
    [scriptPath, "--samples", "24", "--subdivisions", "5000", "--out", artifactPath, "--pretty"],
    { encoding: "utf8" }
  );

  const proof = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralFoldAwareClockLengthChartClosureProof(proof), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(
    validation.result.theory_status,
    "fold-aware-clock-length-receiver-orbit-chart-closure-certified"
  );

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_CHART_CLOSURE_PROOF_SCHEMA);
});
