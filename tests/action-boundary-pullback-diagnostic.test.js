import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  ACTION_BOUNDARY_PULLBACK_SCHEMA,
  applyActionBoundaryControl,
  buildActionBoundaryPullbackDiagnostic,
  buildDefaultActionBoundaryPullbackInput,
  buildRegulatorOnlyActionBoundaryPullbackInput,
  buildSyntheticActionBoundaryPullbackInput,
  validateActionBoundaryPullbackArtifact,
} from "../scripts/proof-programs/action-boundary-pullback-diagnostic.mjs";

const scriptPath = fileURLToPath(
  new URL("../scripts/proof-programs/action-boundary-pullback-diagnostic.mjs", import.meta.url)
);

function rowById(artifact, rowId) {
  return artifact.action_rows.find((row) => row.row_id === rowId);
}

test("action boundary pullback diagnostic fails closed without action rows", () => {
  const artifact = buildActionBoundaryPullbackDiagnostic(buildDefaultActionBoundaryPullbackInput());
  const errors = validateActionBoundaryPullbackArtifact(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, ACTION_BOUNDARY_PULLBACK_SCHEMA);
  assert.equal(artifact.artifact_schema, ACTION_BOUNDARY_PULLBACK_SCHEMA);
  assert.equal(artifact.promotion_status, "priority-only diagnostic");
  assert.equal(artifact.boundary_status, "failed");
  assert.equal(artifact.residual_norm, null);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.result.updates_live_validation_gate, false);
  assert.equal(rowById(artifact, "action_endpoint_row").status, "fail");
  assert.deepEqual(rowById(artifact, "action_endpoint_row").mismatches, [
    "row_present",
    "evidence_level",
    "source_record_id",
    "retained_chart_id",
    "retained_window_id",
    "regulator_state.eta",
    "regulator_state.epsilon_c",
    "regulator_state.status",
    "boundary_symbol",
  ]);
  assert.equal(rowById(artifact, "action_endpoint_row").evidence_level, null);
  assert.deepEqual(artifact.evidence_level_summary, {
    action_endpoint_row: "missing",
    action_multiplier_row: "missing",
    eta_regulator_row: "missing",
    epsilon_c_core_row: "missing",
  });
  assert.equal(artifact.accepted_evidence_summary.required_row_count, 4);
  assert.equal(artifact.accepted_evidence_summary.accepted_row_count, 0);
  assert.equal(artifact.accepted_evidence_summary.accepted_for_action_closure, false);
  assert.equal(artifact.accepted_evidence_summary.counts_by_evidence_level.missing, 4);
  assert.equal(artifact.result.accepted_action_evidence_for_closure, false);
  assert.equal(rowById(artifact, "action_multiplier_row").status, "fail");
});

test("action boundary pullback diagnostic validates a synthetic closed row-logic fixture", () => {
  const artifact = buildActionBoundaryPullbackDiagnostic(buildSyntheticActionBoundaryPullbackInput());

  assert.deepEqual(validateActionBoundaryPullbackArtifact(artifact), []);
  assert.equal(artifact.boundary_status, "closed");
  assert.equal(artifact.residual_norm, 0);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_passed_priority_only");
  assert.equal(artifact.action_rows.every((row) => row.status === "pass"), true);
  assert.equal(rowById(artifact, "action_endpoint_row").evidence_level, "synthetic_row_logic");
  assert.equal(rowById(artifact, "action_endpoint_row").boundary_symbol, "\\partial_{\\mathrm{end}}S_{\\mathfrak B}^{(\\eta)}");
  assert.deepEqual(rowById(artifact, "eta_regulator_row").mismatches, []);
  assert.equal(artifact.accepted_evidence_summary.counts_by_evidence_level.synthetic_row_logic, 4);
  assert.equal(artifact.accepted_evidence_summary.accepted_row_count, 0);
  assert.equal(artifact.accepted_evidence_summary.accepted_for_action_closure, false);
  assert.equal(artifact.result.accepted_action_evidence_for_closure, false);
});

test("action boundary accepted metadata without derivation proof object stays non-accepted", () => {
  const input = buildSyntheticActionBoundaryPullbackInput();
  const endpoint = input.action_rows.find((row) => row.row_id === "action_endpoint_row");
  endpoint.evidence_level = "accepted_for_action_closure";
  endpoint.accepted_for_action_closure = true;
  endpoint.accepted_evidence_id = "accepted_action_endpoint_q0";
  const artifact = buildActionBoundaryPullbackDiagnostic(input);
  const endpointEvidence = artifact.accepted_evidence_summary.row_evidence.find(
    (row) => row.row_id === "action_endpoint_row"
  );

  assert.deepEqual(validateActionBoundaryPullbackArtifact(artifact), []);
  assert.equal(artifact.boundary_status, "closed");
  assert.equal(endpointEvidence.accepted_evidence_contract_attempted, true);
  assert.equal(endpointEvidence.accepted_for_action_closure, false);
  assert.deepEqual(endpointEvidence.accepted_evidence_mismatches, [
    "derivation_proof_object.role",
    "derivation_proof_object.accepted_evidence_id",
    "derivation_proof_object.row_id",
    "derivation_proof_object.source_record_id",
    "derivation_proof_object.status",
  ]);
  assert.equal(artifact.accepted_evidence_summary.accepted_row_count, 0);
  assert.equal(artifact.result.accepted_action_evidence_for_closure, false);
});

test("action boundary pullback diagnostic separates regulator-only row population from action closure", () => {
  const artifact = buildActionBoundaryPullbackDiagnostic(buildRegulatorOnlyActionBoundaryPullbackInput());

  assert.deepEqual(validateActionBoundaryPullbackArtifact(artifact), []);
  assert.equal(artifact.boundary_status, "failed");
  assert.equal(artifact.residual_norm, null);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(rowById(artifact, "eta_regulator_row").status, "pass");
  assert.equal(rowById(artifact, "eta_regulator_row").evidence_level, "source_record_regulator_declared");
  assert.equal(rowById(artifact, "epsilon_c_core_row").status, "pass");
  assert.equal(rowById(artifact, "epsilon_c_core_row").evidence_level, "source_record_regulator_declared");
  assert.equal(rowById(artifact, "action_endpoint_row").status, "fail");
  assert.equal(rowById(artifact, "action_multiplier_row").status, "fail");
  assert.deepEqual(artifact.evidence_level_summary, {
    action_endpoint_row: "missing",
    action_multiplier_row: "missing",
    eta_regulator_row: "source_record_regulator_declared",
    epsilon_c_core_row: "source_record_regulator_declared",
  });
  assert.equal(
    artifact.accepted_evidence_summary.counts_by_evidence_level.source_record_regulator_declared,
    2
  );
  assert.equal(artifact.accepted_evidence_summary.counts_by_evidence_level.missing, 2);
  assert.equal(artifact.accepted_evidence_summary.accepted_row_count, 0);
  assert.equal(artifact.accepted_evidence_summary.accepted_for_action_closure, false);
  assert.deepEqual(artifact.row_refs, ["eta_regulator_row", "epsilon_c_core_row"]);
});

test("action boundary pullback diagnostic fails regulator mismatch", () => {
  const input = applyActionBoundaryControl(
    buildSyntheticActionBoundaryPullbackInput(),
    "regulator-mismatch"
  );
  const artifact = buildActionBoundaryPullbackDiagnostic(input);

  assert.deepEqual(validateActionBoundaryPullbackArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(artifact.result.failure_code, "residual.provenance_gap");
  assert.equal(rowById(artifact, "regulator_state").status, "fail");
});

test("action boundary pullback diagnostic fails a row-level source-record mismatch", () => {
  const input = applyActionBoundaryControl(
    buildSyntheticActionBoundaryPullbackInput(),
    "endpoint-source-record-mismatch"
  );
  const artifact = buildActionBoundaryPullbackDiagnostic(input);

  assert.deepEqual(validateActionBoundaryPullbackArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(rowById(artifact, "action_endpoint_row").status, "fail");
  assert.deepEqual(rowById(artifact, "action_endpoint_row").mismatches, ["source_record_id"]);
  assert.equal(rowById(artifact, "action_multiplier_row").status, "pass");
});

test("action boundary pullback diagnostic fails row-level regulator mismatches", () => {
  const etaInput = applyActionBoundaryControl(
    buildSyntheticActionBoundaryPullbackInput(),
    "eta-row-regulator-mismatch"
  );
  const etaArtifact = buildActionBoundaryPullbackDiagnostic(etaInput);

  assert.deepEqual(validateActionBoundaryPullbackArtifact(etaArtifact), []);
  assert.equal(etaArtifact.result.diagnostic_status, "diagnostic_failed");
  assert.deepEqual(rowById(etaArtifact, "eta_regulator_row").mismatches, ["regulator_state.eta"]);

  const epsilonInput = applyActionBoundaryControl(
    buildSyntheticActionBoundaryPullbackInput(),
    "epsilon-c-row-regulator-mismatch"
  );
  const epsilonArtifact = buildActionBoundaryPullbackDiagnostic(epsilonInput);

  assert.deepEqual(validateActionBoundaryPullbackArtifact(epsilonArtifact), []);
  assert.equal(epsilonArtifact.result.diagnostic_status, "diagnostic_failed");
  assert.deepEqual(rowById(epsilonArtifact, "epsilon_c_core_row").mismatches, ["regulator_state.epsilon_c"]);
});

test("action boundary pullback diagnostic CLI writes, validates, and reports schema", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "action-boundary-"));
  const artifactPath = path.join(tempDir, "artifact.json");

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], { encoding: "utf8" });
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateActionBoundaryPullbackArtifact(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.schema, ACTION_BOUNDARY_PULLBACK_SCHEMA);
  assert.equal(validation.result.diagnostic_status, "diagnostic_failed");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, ACTION_BOUNDARY_PULLBACK_SCHEMA);
  assert.deepEqual(schema.fixtures, ["regulator-only", "synthetic-closed"]);
  assert.deepEqual(schema.accepted_evidence_summary, [
    "row_evidence",
    "counts_by_evidence_level",
    "accepted_evidence_contract_attempted",
    "accepted_evidence_mismatches",
    "derivation_proof_object",
    "accepted_for_action_closure",
  ]);
  assert.deepEqual(schema.controls, [
    "source-record-mismatch",
    "regulator-mismatch",
    "missing-multiplier-row",
    "endpoint-source-record-mismatch",
    "eta-row-regulator-mismatch",
    "epsilon-c-row-regulator-mismatch",
  ]);

  const regulatorOnly = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--regulator-only"], { encoding: "utf8" })
  );
  assert.equal(regulatorOnly.result.diagnostic_status, "diagnostic_failed");
  assert.equal(rowById(regulatorOnly, "eta_regulator_row").status, "pass");
  assert.equal(rowById(regulatorOnly, "action_endpoint_row").status, "fail");
});
