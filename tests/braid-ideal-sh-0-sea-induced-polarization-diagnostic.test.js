import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
  AUTHORITY_CLASS,
} from "../scripts/braid-ideal/sh-0-sea-diagnostic-candidate-model.mjs";
import {
  CANDIDATE_A_FCC,
  DEFAULT_DISORDER_SEED,
  INITIAL_ENSEMBLE_KINDS,
  SCHEMA,
  buildSh0SeaInducedPolarizationDiagnostic,
  evaluateSh0SeaInducedPolarizationDiagnosticEvidence,
} from "../scripts/braid-ideal/sh-0-sea-induced-polarization-diagnostic.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/braid-ideal/sh-0-sea-induced-polarization-diagnostic.mjs", import.meta.url)
);

function assertAlmostEqual(actual, expected, epsilon = 1e-12) {
  assert.ok(
    Math.abs(actual - expected) <= epsilon,
    `expected ${actual} to be within ${epsilon} of ${expected}`
  );
}

function candidateArtifact(overrides = {}) {
  return buildSh0SeaInducedPolarizationDiagnostic({
    spacings: [CANDIDATE_A_FCC],
    sampleCount: 4,
    iterationCap: 1500,
    ...overrides,
  });
}

test("induced-polarization diagnostic reproduces the exact static control lemmas", () => {
  const artifact = candidateArtifact();
  const row = artifact.spacing_rows[0];
  const controls = row.control_lemmas;

  assert.equal(artifact.schema, SCHEMA);
  assert.equal(artifact.authority_class, AUTHORITY_CLASS);
  assert.equal(INITIAL_ENSEMBLE_KINDS.length, 3);
  assert.equal(row.a_fcc, CANDIDATE_A_FCC);

  // Aligned static reference reproduces the wake-sum / orientation-order aligned response.
  assertAlmostEqual(row.aligned_static_reference_response, -0.2833417889031177, 1e-9);

  // Conjugation antisymmetry: conjugating all neighbors flips Pi_R exactly.
  assert.equal(controls.conjugation_antisymmetry.exact, true);
  assert.ok(Math.abs(controls.conjugation_antisymmetry.aligned_plus_conjugate_sum) < 1e-12);
  assertAlmostEqual(
    controls.conjugation_antisymmetry.all_conjugated_response,
    -row.aligned_static_reference_response,
    1e-12
  );

  // Paired-antiphase is an exact response null in both the charge-conjugation and the
  // SO(3) 180-degree-rotation representations.
  assert.equal(controls.paired_antiphase_null.exact, true);
  assert.ok(Math.abs(controls.paired_antiphase_null.charge_conjugation_response) < 1e-12);
  assert.ok(Math.abs(controls.paired_antiphase_null.so3_rotation_response) < 1e-12);
});

test("paired-antiphase is a response null but not an energy fixed point, and relaxation escapes it", () => {
  const artifact = candidateArtifact();
  const fixedPoint = artifact.spacing_rows[0].control_lemmas.paired_antiphase_fixed_point;

  assert.equal(fixedPoint.paired_is_energy_fixed_point, false);
  assert.equal(fixedPoint.aligned_is_energy_fixed_point, false);
  assert.equal(fixedPoint.relaxation_escapes_paired_antiphase, true);
  assert.ok(fixedPoint.so3_paired_max_torque > artifact.relaxation_numerics.convergence_tolerance);
  assert.ok(fixedPoint.aligned_max_torque > artifact.relaxation_numerics.convergence_tolerance);
});

test("overdamped relaxation polarizes anti-retentive: outward response, no floor crossing at any start", () => {
  const artifact = candidateArtifact();
  const row = artifact.spacing_rows[0];

  // Every structured start relaxes to an outward (anti-retentive) response that does not
  // cross the inward escape floor.
  assert.ok(row.relaxed_aligned.Pi_R_A_sea > 0);
  assert.equal(row.relaxed_aligned.crosses_inward_response_floor, false);
  assert.equal(row.relaxed_aligned.classification, "induced_anti_aligned");
  assert.ok(row.relaxed_paired_antiphase.Pi_R_A_sea > 0);
  assert.equal(row.relaxed_paired_antiphase.crosses_inward_response_floor, false);

  // Every disordered seed relaxes outward; none crosses the floor.
  const disordered = row.relaxed_disordered;
  assert.equal(disordered.crossing_count, 0);
  assert.ok(disordered.Pi_R_summary.mean > 0);
  assert.equal(disordered.mean_crosses_inward_response_floor, false);
  for (const sample of disordered.per_seed_samples) {
    assert.ok(sample.Pi_R_A_sea > 0);
    assert.equal(sample.crosses_inward_response_floor, false);
  }

  const verdict = artifact.induced_polarization_verdict;
  assert.equal(verdict.induced_aligned_route_confirmed, false);
  assert.equal(verdict.generic_start_polarizes_anti_retentive, true);
  assert.equal(verdict.disposition, "induced_polarization_relaxes_anti_retentive_no_bounded_window");
  assert.match(verdict.caveat_disposition_for_sea_screened_rows, /hardens/);
  assert.match(verdict.caveat_disposition_for_sea_screened_rows, /hinge-click/);
});

test("induced-polarization diagnostic asserts zero free amplitude everywhere", () => {
  const artifact = candidateArtifact();
  const row = artifact.spacing_rows[0];
  assert.equal(row.free_amplitude_parameter_count, 0);
  assert.equal(row.relaxed_aligned.free_amplitude_parameter_count, 0);
  assert.equal(row.relaxed_paired_antiphase.free_amplitude_parameter_count, 0);
  assert.equal(row.relaxed_disordered.free_amplitude_parameter_count, 0);
});

test("induced-polarization diagnostic uses a declared deterministic relaxation", () => {
  const first = candidateArtifact();
  const second = candidateArtifact();

  assert.equal(first.declared_sampler.seed, DEFAULT_DISORDER_SEED);
  assert.equal(first.declared_sampler.sample_count, 4);
  assert.equal(first.relaxation_numerics.dynamics, "overdamped_gradient_relaxation_on_total_potential_superposition_energy");
  assert.match(first.declared_sampler.status, /no undeclared environment degrees of freedom/);
  assert.equal(first.artifact_hash, second.artifact_hash);

  // Per-seed relaxed responses are identical across builds.
  const a = first.spacing_rows[0].relaxed_disordered.per_seed_samples;
  const b = second.spacing_rows[0].relaxed_disordered.per_seed_samples;
  for (let index = 0; index < a.length; index += 1) {
    assert.equal(a[index].Pi_R_A_sea, b[index].Pi_R_A_sea);
    assert.equal(a[index].relaxed_order_parameter, b[index].relaxed_order_parameter);
  }
});

test("induced-polarization diagnostic stays fail-closed and emits JSON from the CLI", () => {
  const artifact = candidateArtifact();

  assert.equal(artifact.evidence_status.accepted, false);
  assert.equal(artifact.evidence_status.first_missing_object, ACCEPTED_EVIDENCE_BLOCKER_OBJECT);
  assert.equal(artifact.evidence_status.first_missing_field, ACCEPTED_EVIDENCE_BLOCKER_FIELD);
  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
  assert.equal(artifact.authorization.accepted_retained_evidence, false);
  assert.equal(artifact.authorization.retained_branch_claim, false);
  assert.equal(artifact.authorization.accepted_noether_sea_response_closure, false);
  assert.equal(artifact.authorization.receiver_normal_branch_strength, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
  assert.deepEqual(evaluateSh0SeaInducedPolarizationDiagnosticEvidence(artifact), {
    accepted: false,
    reason: "diagnostic_induced_polarization_relaxation_not_accepted_retained_evidence",
    first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  });

  const output = execFileSync(
    process.execPath,
    [
      SCRIPT_PATH,
      "--spacings=4.25",
      "--samples=3",
      "--iteration-cap=1200",
      "--pretty",
    ],
    { encoding: "utf8" }
  );
  const cliArtifact = JSON.parse(output);
  assert.equal(cliArtifact.schema, SCHEMA);
  assert.equal(cliArtifact.spacing_rows.length, 1);
  assert.equal(cliArtifact.evidence_status.accepted, false);
  assert.equal(
    cliArtifact.induced_polarization_verdict.induced_aligned_route_confirmed,
    false
  );
});
