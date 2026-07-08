import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  CENTRAL_RETAINED_HISTORY_ROW_BLOCKER,
  SCHEMA,
  SEED_PATH_CERTIFICATE_FIELD,
  SEED_PATH_CERTIFICATE_OBJECT,
  buildFoldCrossingSustainedAlignmentWindowDiagnostic,
  evaluateFoldCrossingSustainedAlignmentWindowEvidence,
} from "../scripts/braid-ideal/fold-crossing-sustained-alignment-window-diagnostic.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/braid-ideal/fold-crossing-sustained-alignment-window-diagnostic.mjs", import.meta.url)
);

const SMALL_CONFIGS = [
  { rhoM: 1.0, betaM: 1.1, rhoR: 2.0, betaR: 0.3, phase: 0 },
  { rhoM: 1.0, betaM: 1.2, rhoR: 2.0, betaR: 0.5, phase: 0 },
];

function smallArtifact(overrides = {}) {
  return buildFoldCrossingSustainedAlignmentWindowDiagnostic({ configs: SMALL_CONFIGS, ...overrides });
}

test("the cross-hit fold is reached at finite chord in the nested hinge geometry", () => {
  const artifact = smallArtifact();
  assert.equal(artifact.schema, SCHEMA);
  assert.equal(artifact.verdict.cross_hit_fold_reached_at_finite_chord, true);
  for (const row of artifact.config_rows) {
    assert.equal(row.fold_reached, true);
    assert.ok(row.global_min_abs_ds < 0.2);
    // finite chord in every window
    for (const w of row.windows) {
      assert.ok(w.min_fold_chord > 0.05);
    }
  }
});

test("the alignment is transient, not sustained, and the clicks are insufficient", () => {
  const artifact = smallArtifact();
  const verdict = artifact.verdict;
  assert.equal(verdict.alignment_sustained_kinematically, false);
  assert.ok(verdict.max_window_fraction < 0.1);
  // kinematic clicks absorb well under 1% of the pump
  assert.ok(verdict.max_absorbed_fraction < 0.05);
  for (const row of artifact.config_rows) {
    assert.equal(row.alignment_sustained, false);
    assert.ok(row.absorbed_fraction < 0.05);
    assert.ok(row.beats_pump === false);
  }
});

test("even a conservative full-dwell hold stays insufficient, reducing to the formation-history burden", () => {
  const artifact = smallArtifact();
  const verdict = artifact.verdict;
  assert.ok(verdict.full_dwell_absorbed_fraction_conservative < 1);
  assert.equal(verdict.full_dwell_still_insufficient_conservative, true);
  assert.equal(
    verdict.disposition,
    "cross_hit_alignment_transient_not_sustained_insufficient_reduces_to_declared_hinge_branch"
  );
  assert.match(verdict.statement, /formation-history/);
  assert.match(verdict.shared_burden_note, /same dynamic-alignment/);
});

test("diagnostic is deterministic, zero free amplitude, and fail-closed", () => {
  const first = smallArtifact();
  const second = smallArtifact();
  assert.equal(first.artifact_hash, second.artifact_hash);
  assert.equal(first.free_amplitude_parameter_count, 0);
  for (const row of first.config_rows) {
    assert.equal(row.free_amplitude_parameter_count, 0);
  }

  assert.equal(first.authorization.retained_branch_claim, false);
  assert.equal(first.authorization.accepted_click_mechanism_closure, false);
  assert.equal(first.authorization.scoreMovement, "no_score_increase");
  assert.equal(first.evidence_status.accepted, false);
  assert.equal(first.evidence_status.first_missing_object, SEED_PATH_CERTIFICATE_OBJECT);
  assert.equal(first.evidence_status.downstream_producer_boundary, CENTRAL_RETAINED_HISTORY_ROW_BLOCKER);

  assert.deepEqual(evaluateFoldCrossingSustainedAlignmentWindowEvidence(first), {
    accepted: false,
    reason: "diagnostic_sustained_alignment_window_not_accepted_retained_evidence",
    first_missing_object: SEED_PATH_CERTIFICATE_OBJECT,
    first_missing_field: SEED_PATH_CERTIFICATE_FIELD,
    downstream_producer_boundary: CENTRAL_RETAINED_HISTORY_ROW_BLOCKER,
  });
});

test("CLI emits fail-closed JSON", () => {
  const output = execFileSync(process.execPath, [SCRIPT_PATH, "--pretty"], { encoding: "utf8" });
  const artifact = JSON.parse(output);
  assert.equal(artifact.schema, SCHEMA);
  assert.equal(artifact.verdict.alignment_sustained_kinematically, false);
  assert.equal(artifact.evidence_status.accepted, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
});
