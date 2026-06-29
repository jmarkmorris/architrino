import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  EVENT_WAKE_HISTORY_PULLBACK_SCHEMA,
  applyEventWakeHistoryControl,
  buildDefaultEventWakeHistoryPullbackInput,
  buildEventWakeHistoryPullbackDiagnostic,
  validateEventWakeHistoryPullbackArtifact,
} from "../scripts/proof-programs/event-wake-history-pullback-diagnostic.mjs";

const scriptPath = fileURLToPath(
  new URL("../scripts/proof-programs/event-wake-history-pullback-diagnostic.mjs", import.meta.url)
);

function rowById(artifact, rowId) {
  return artifact.event_rows.find((row) => row.row_id === rowId);
}

test("event wake-history pullback diagnostic emits a priority-only closed boundary fixture", () => {
  const artifact = buildEventWakeHistoryPullbackDiagnostic(buildDefaultEventWakeHistoryPullbackInput());
  const errors = validateEventWakeHistoryPullbackArtifact(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, EVENT_WAKE_HISTORY_PULLBACK_SCHEMA);
  assert.equal(artifact.artifact_schema, EVENT_WAKE_HISTORY_PULLBACK_SCHEMA);
  assert.equal(artifact.promotion_status, "priority-only diagnostic");
  assert.equal(artifact.boundary_status, "closed");
  assert.equal(artifact.residual_norm, 0);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_passed_priority_only");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.result.updates_live_validation_gate, false);
  assert.equal(rowById(artifact, "energy_wake").status, "pass");
  assert.equal(rowById(artifact, "momentum_wake").status, "pass");
  assert.equal(rowById(artifact, "angular_momentum_wake").status, "pass");
  assert.equal(rowById(artifact, "medium_update").status, "pass");
  assert.equal(
    artifact.accepted_evidence_summary.counts_by_evidence_level
      .source_record_event_ledger_declared,
    4
  );
  assert.equal(artifact.accepted_evidence_summary.accepted_row_count, 0);
  assert.equal(artifact.accepted_evidence_summary.accepted_for_wake_history_closure, false);
  assert.equal(artifact.result.accepted_event_evidence_for_closure, false);
});

test("event wake-history accepted metadata without derivation proof object stays non-accepted", () => {
  const input = buildDefaultEventWakeHistoryPullbackInput();
  input.event_evidence_rows = [
    {
      row_id: "energy_wake",
      evidence_level: "accepted_for_wake_history_closure",
      accepted_for_wake_history_closure: true,
      accepted_evidence_id: "accepted_energy_wake_q0",
      source_record_id: input.source_record_id,
      event_ledger_id: input.event_ledger.ledger_id,
    },
  ];
  const artifact = buildEventWakeHistoryPullbackDiagnostic(input);
  const energyEvidence = artifact.accepted_evidence_summary.row_evidence.find(
    (row) => row.row_id === "energy_wake"
  );

  assert.deepEqual(validateEventWakeHistoryPullbackArtifact(artifact), []);
  assert.equal(artifact.boundary_status, "closed");
  assert.equal(energyEvidence.accepted_evidence_contract_attempted, true);
  assert.equal(energyEvidence.accepted_for_wake_history_closure, false);
  assert.deepEqual(energyEvidence.accepted_evidence_mismatches, [
    "event_evidence.derivation_proof_object.role",
    "event_evidence.derivation_proof_object.accepted_evidence_id",
    "event_evidence.derivation_proof_object.row_id",
    "event_evidence.derivation_proof_object.source_record_id",
    "event_evidence.derivation_proof_object.status",
  ]);
  assert.equal(artifact.accepted_evidence_summary.accepted_row_count, 0);
  assert.equal(artifact.result.accepted_event_evidence_for_closure, false);
});

test("event wake-history pullback diagnostic fails missing angular momentum rows", () => {
  const input = applyEventWakeHistoryControl(
    buildDefaultEventWakeHistoryPullbackInput(),
    "missing-angular-momentum-row"
  );
  const artifact = buildEventWakeHistoryPullbackDiagnostic(input);

  assert.deepEqual(validateEventWakeHistoryPullbackArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(artifact.result.failure_code, "event.ledger_residual");
  assert.equal(rowById(artifact, "angular_momentum_wake").status, "fail");
});

test("event wake-history pullback diagnostic fails source-record mismatch", () => {
  const input = applyEventWakeHistoryControl(
    buildDefaultEventWakeHistoryPullbackInput(),
    "source-record-mismatch"
  );
  const artifact = buildEventWakeHistoryPullbackDiagnostic(input);

  assert.deepEqual(validateEventWakeHistoryPullbackArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(artifact.result.failure_code, "residual.provenance_gap");
  assert.equal(rowById(artifact, "source_record_id").status, "fail");
});

test("event wake-history pullback diagnostic CLI writes, validates, and reports schema", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "event-wake-history-"));
  const artifactPath = path.join(tempDir, "artifact.json");

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], { encoding: "utf8" });
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateEventWakeHistoryPullbackArtifact(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.schema, EVENT_WAKE_HISTORY_PULLBACK_SCHEMA);
  assert.equal(validation.result.diagnostic_status, "diagnostic_passed_priority_only");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, EVENT_WAKE_HISTORY_PULLBACK_SCHEMA);
  assert.deepEqual(schema.accepted_evidence_summary, [
    "row_evidence",
    "counts_by_evidence_level",
    "accepted_evidence_contract_attempted",
    "accepted_evidence_mismatches",
    "derivation_proof_object",
    "accepted_for_wake_history_closure",
  ]);
  assert.deepEqual(schema.controls, ["missing-angular-momentum-row", "source-record-mismatch"]);
});
