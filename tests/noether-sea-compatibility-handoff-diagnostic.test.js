import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  NOETHER_SEA_COMPATIBILITY_HANDOFF_SCHEMA,
  applyNoetherSeaCompatibilityControl,
  buildDefaultNoetherSeaCompatibilityHandoffInput,
  buildNoetherSeaCompatibilityHandoffDiagnostic,
  validateNoetherSeaCompatibilityHandoffArtifact,
} from "../scripts/proof-programs/noether-sea-compatibility-handoff-diagnostic.mjs";

const scriptPath = fileURLToPath(
  new URL("../scripts/proof-programs/noether-sea-compatibility-handoff-diagnostic.mjs", import.meta.url)
);

function rowById(artifact, rowId) {
  return artifact.boundary_rows.find((row) => row.row_id === rowId);
}

test("Noether sea handoff diagnostic emits all priority-only boundary rows", () => {
  const input = buildDefaultNoetherSeaCompatibilityHandoffInput();
  const artifact = buildNoetherSeaCompatibilityHandoffDiagnostic(input);
  const errors = validateNoetherSeaCompatibilityHandoffArtifact(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, NOETHER_SEA_COMPATIBILITY_HANDOFF_SCHEMA);
  assert.equal(artifact.promotion_status, "priority-only diagnostic");
  assert.equal(artifact.result.diagnostic_status, "diagnostic_passed_priority_only");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.result.updates_live_validation_gate, false);
  assert.equal(artifact.result.failure_code, null);
  assert.equal(
    artifact.accepted_evidence_summary.counts_by_evidence_level
      .source_record_medium_response_declared,
    1
  );
  assert.equal(artifact.accepted_evidence_summary.accepted_response_count, 0);
  assert.equal(artifact.accepted_evidence_summary.accepted_for_medium_response_closure, false);
  assert.equal(artifact.result.accepted_medium_response_evidence_for_closure, false);
  assert.deepEqual(
    artifact.boundary_rows.map((row) => row.row_id),
    [
      "delta_id",
      "delta_W",
      "delta_reg",
      "delta_root",
      "delta_event",
      "delta_proj",
      "delta_coef",
      "speed_convention",
    ]
  );
  assert.equal(artifact.boundary_rows.every((row) => row.status === "pass"), true);
});

test("Noether sea accepted medium-response metadata without derivation proof object stays non-accepted", () => {
  const input = buildDefaultNoetherSeaCompatibilityHandoffInput();
  const source = input.retained_branch_source_record;
  input.accepted_medium_response_evidence = {
    evidence_level: "accepted_for_medium_response_closure",
    accepted_for_medium_response_closure: true,
    accepted_evidence_id: "accepted_medium_response_q0",
    source_record_id: source.record_id,
    response_object_id: input.handoff.medium_response.response_object_id,
    branch_class: source.branch_class,
    retained_chart_id: source.retained_chart_id,
    retained_window_id: source.retained_window.id,
    regulator_state: source.regulator_state,
  };
  const artifact = buildNoetherSeaCompatibilityHandoffDiagnostic(input);
  const responseEvidence = artifact.accepted_evidence_summary.response_evidence[0];

  assert.deepEqual(validateNoetherSeaCompatibilityHandoffArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_passed_priority_only");
  assert.equal(responseEvidence.evidence_level, "accepted_evidence_contract_mismatch");
  assert.equal(responseEvidence.accepted_evidence_contract_attempted, true);
  assert.equal(responseEvidence.accepted_for_medium_response_closure, false);
  assert.deepEqual(responseEvidence.accepted_evidence_mismatches, [
    "accepted_medium_response_evidence.derivation_proof_object.role",
    "accepted_medium_response_evidence.derivation_proof_object.accepted_evidence_id",
    "accepted_medium_response_evidence.derivation_proof_object.source_record_id",
    "accepted_medium_response_evidence.derivation_proof_object.response_object_id",
    "accepted_medium_response_evidence.derivation_proof_object.status",
  ]);
  assert.equal(artifact.accepted_evidence_summary.accepted_response_count, 0);
  assert.equal(artifact.result.accepted_medium_response_evidence_for_closure, false);
});

test("Noether sea handoff diagnostic CLI writes, validates, and reports schema", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "noether-sea-handoff-"));
  const artifactPath = path.join(tempDir, "artifact.json");

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], { encoding: "utf8" });
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateNoetherSeaCompatibilityHandoffArtifact(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.schema, NOETHER_SEA_COMPATIBILITY_HANDOFF_SCHEMA);
  assert.equal(validation.result.diagnostic_status, "diagnostic_passed_priority_only");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, NOETHER_SEA_COMPATIBILITY_HANDOFF_SCHEMA);
  assert.deepEqual(schema.accepted_evidence_summary, [
    "response_evidence",
    "counts_by_evidence_level",
    "accepted_evidence_contract_attempted",
    "accepted_evidence_mismatches",
    "derivation_proof_object",
    "accepted_for_medium_response_closure",
  ]);
  assert.deepEqual(schema.controls, ["retained-history-mismatch", "speed-conflation", "hidden-tuning"]);
});

test("retained-history mismatch control fails the same-history rows", () => {
  const input = applyNoetherSeaCompatibilityControl(
    buildDefaultNoetherSeaCompatibilityHandoffInput(),
    "retained-history-mismatch"
  );
  const artifact = buildNoetherSeaCompatibilityHandoffDiagnostic(input);

  assert.deepEqual(validateNoetherSeaCompatibilityHandoffArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(artifact.result.failure_code, "residual.retained_history_mismatch");
  assert.equal(rowById(artifact, "delta_id").status, "fail");
  assert.equal(rowById(artifact, "delta_W").status, "fail");
});

test("speed-conflation control fails the speed convention row", () => {
  const input = applyNoetherSeaCompatibilityControl(
    buildDefaultNoetherSeaCompatibilityHandoffInput(),
    "speed-conflation"
  );
  const artifact = buildNoetherSeaCompatibilityHandoffDiagnostic(input);

  assert.deepEqual(validateNoetherSeaCompatibilityHandoffArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(artifact.result.failure_code, "residual.speed_conflation");
  assert.equal(rowById(artifact, "speed_convention").status, "fail");
  assert.equal(rowById(artifact, "delta_coef").status, "pass");
});

test("hidden-tuning control fails coefficient non-refit", () => {
  const input = applyNoetherSeaCompatibilityControl(
    buildDefaultNoetherSeaCompatibilityHandoffInput(),
    "hidden-tuning"
  );
  const artifact = buildNoetherSeaCompatibilityHandoffDiagnostic(input);

  assert.deepEqual(validateNoetherSeaCompatibilityHandoffArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(artifact.result.failure_code, "gravity.hidden_tuning");
  assert.equal(rowById(artifact, "delta_coef").status, "fail");
  assert.equal(rowById(artifact, "speed_convention").status, "pass");
});
