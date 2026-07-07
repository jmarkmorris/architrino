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
  ENSEMBLE_KINDS,
  SCHEMA,
  buildSh0SeaOrientationOrderDiagnostic,
  evaluateSh0SeaOrientationOrderDiagnosticEvidence,
} from "../scripts/braid-ideal/sh-0-sea-orientation-order-diagnostic.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/braid-ideal/sh-0-sea-orientation-order-diagnostic.mjs", import.meta.url)
);

function assertAlmostEqual(actual, expected, epsilon = 1e-12) {
  assert.ok(
    Math.abs(actual - expected) <= epsilon,
    `expected ${actual} to be within ${epsilon} of ${expected}`
  );
}

function candidateSpacingArtifact(overrides = {}) {
  return buildSh0SeaOrientationOrderDiagnostic({
    aFccMin: CANDIDATE_A_FCC,
    aFccMax: CANDIDATE_A_FCC,
    aFccStep: 1,
    sampleCount: 64,
    ...overrides,
  });
}

test("orientation-order diagnostic reproduces the aligned wake-sum response and the exact conjugation lemmas", () => {
  const artifact = candidateSpacingArtifact();
  const row = artifact.ensemble_rows[0];

  assert.equal(artifact.schema, SCHEMA);
  assert.equal(artifact.authority_class, AUTHORITY_CLASS);
  assert.equal(ENSEMBLE_KINDS.length, 4);
  assert.equal(row.a_fcc, CANDIDATE_A_FCC);
  assertAlmostEqual(row.aligned.Pi_R_A_sea, -0.2833417889031177, 1e-9);
  assert.equal(row.aligned.crosses_inward_response_floor, true);
  assertAlmostEqual(row.conjugate_aligned.Pi_R_A_sea, -row.aligned.Pi_R_A_sea, 1e-12);
  assert.equal(row.conjugate_aligned.crosses_inward_response_floor, false);
  assert.ok(Math.abs(row.paired_antiphase.Pi_R_A_sea) < 1e-12);
  assert.equal(row.paired_antiphase.crosses_inward_response_floor, false);
  assert.ok(artifact.exact_conjugation_lemmas.paired_antiphase_max_abs_response_observed < 1e-12);
  assertAlmostEqual(
    row.conjugate_aligned.center_shell_energy,
    -row.aligned.center_shell_energy,
    1e-12
  );
  assert.equal(row.free_amplitude_parameter_count, 0);
});

test("orientation-order diagnostic records the dipole-shell cancellation and frustration structure", () => {
  const artifact = candidateSpacingArtifact();
  const lemma = artifact.dipole_shell_cancellation_lemma;
  const landscape = artifact.pair_energy_landscape_at_candidate_spacing;

  assert.equal(lemma.aligned_point_dipole_shell_sum, 0);
  assert.equal(lemma.attractive_class_count, 6);
  assert.equal(lemma.transverse_class_count, 6);

  const attractive = landscape.rows.find((row) => row.bond_class === "attractive_class");
  const transverse = landscape.rows.find((row) => row.bond_class === "transverse_class");
  assert.ok(attractive.aligned_energy < 0);
  assert.ok(transverse.aligned_energy > 0);
  assertAlmostEqual(attractive.dipole_flipped_energy, -attractive.aligned_energy, 1e-12);
  assertAlmostEqual(transverse.dipole_flipped_energy, -transverse.aligned_energy, 1e-12);

  const condition = artifact.orientational_order_condition;
  assert.equal(condition.energetic_status, "frustrated_not_energetically_selected");
  assert.equal(condition.retention_requires, "central-aligned neighbor braid dipole order");
  assert.ok(condition.evidence.aligned_center_shell_energy > 0);
  assert.ok(condition.evidence.conjugate_aligned_center_shell_energy < 0);
  assert.equal(condition.evidence.disordered_samples_beat_all_uniform_ensembles, true);
});

test("orientation-order diagnostic rejects the stochastic retention argument for isotropic disorder", () => {
  const artifact = candidateSpacingArtifact();
  const row = artifact.ensemble_rows[0];
  const stochastic = artifact.stochastic_retention;

  assert.ok(Math.abs(row.disordered.Pi_R_mean) < 0.06);
  assert.ok(row.disordered.Pi_R_std > 0.1);
  assert.ok(row.disordered.crossing_probability > 0.15);
  assert.ok(row.disordered.crossing_probability < 0.6);
  assert.equal(row.disordered.mean_crosses_inward_response_floor, false);
  assert.equal(stochastic.annealed_reading.mean_response_window_exists, false);
  assert.equal(stochastic.quenched_reading.majority_retention_window_exists, false);
  assert.ok(stochastic.quenched_reading.max_crossing_probability.crossing_probability < 0.5);
  assert.equal(stochastic.verdict.stochastic_retention_supported, false);
  assert.match(stochastic.verdict.named_remaining_mechanism, /polarization/);
});

test("orientation-order diagnostic uses a declared deterministic sampler", () => {
  const first = candidateSpacingArtifact({ sampleCount: 16 });
  const second = candidateSpacingArtifact({ sampleCount: 16 });

  assert.equal(first.declared_sampler.seed, DEFAULT_DISORDER_SEED);
  assert.equal(first.declared_sampler.sample_count, 16);
  assert.match(first.declared_sampler.status, /no undeclared environment degrees of freedom/);
  assert.equal(first.artifact_hash, second.artifact_hash);
});

test("orientation-order diagnostic stays fail-closed and emits JSON from the CLI", () => {
  const artifact = candidateSpacingArtifact({ sampleCount: 16 });

  assert.equal(artifact.evidence_status.accepted, false);
  assert.equal(artifact.evidence_status.first_missing_object, ACCEPTED_EVIDENCE_BLOCKER_OBJECT);
  assert.equal(artifact.evidence_status.first_missing_field, ACCEPTED_EVIDENCE_BLOCKER_FIELD);
  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
  assert.equal(artifact.authorization.accepted_retained_evidence, false);
  assert.equal(artifact.authorization.retained_branch_claim, false);
  assert.equal(artifact.authorization.accepted_noether_sea_response_closure, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
  assert.deepEqual(evaluateSh0SeaOrientationOrderDiagnosticEvidence(artifact), {
    accepted: false,
    reason: "diagnostic_orientation_order_analysis_not_accepted_retained_evidence",
    first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  });

  const output = execFileSync(
    process.execPath,
    [
      SCRIPT_PATH,
      "--a-fcc-min=4.25",
      "--a-fcc-max=4.25",
      "--a-fcc-step=1",
      "--samples=16",
      "--pretty",
    ],
    { encoding: "utf8" }
  );
  const cliArtifact = JSON.parse(output);
  assert.equal(cliArtifact.schema, SCHEMA);
  assert.equal(cliArtifact.ensemble_rows.length, 1);
  assert.equal(cliArtifact.evidence_status.accepted, false);
  assert.equal(cliArtifact.stochastic_retention.verdict.stochastic_retention_supported, false);
});
