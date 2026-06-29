import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  CLOSED_LEDGER_SOURCE_RECORD_CONTRACT_SCHEMA,
  applyClosedLedgerSourceRecordContractControl,
  buildClosedLedgerSourceRecordContractDiagnostic,
  buildDefaultClosedLedgerSourceRecordContractInput,
  validateClosedLedgerSourceRecordContractArtifact,
} from "../scripts/proof-programs/closed-ledger-source-record-contract-diagnostic.mjs";

const scriptPath = fileURLToPath(
  new URL("../scripts/proof-programs/closed-ledger-source-record-contract-diagnostic.mjs", import.meta.url)
);

function rowById(artifact, rowId) {
  return artifact.contract_rows.find((row) => row.row_id === rowId);
}

test("closed-ledger source-record contract passes the default same-retained-history fixture", () => {
  const artifact = buildClosedLedgerSourceRecordContractDiagnostic();
  const errors = validateClosedLedgerSourceRecordContractArtifact(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, CLOSED_LEDGER_SOURCE_RECORD_CONTRACT_SCHEMA);
  assert.equal(artifact.promotion_status, "priority-only diagnostic");
  assert.equal(artifact.result.diagnostic_status, "diagnostic_passed_priority_only");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.result.updates_live_validation_gate, false);
  assert.equal(artifact.input_summary.photon_route.diagnostic_status, "diagnostic_failed");
  assert.equal(artifact.input_summary.middle_hinge_route.diagnostic_status, "diagnostic_failed");
  assert.equal(artifact.input_summary.action_pullback.diagnostic_status, "diagnostic_failed");
  assert.deepEqual(artifact.input_summary.nested_validation_errors.photon_route, []);
  assert.deepEqual(artifact.input_summary.nested_validation_errors.middle_hinge_route, []);
  assert.deepEqual(
    artifact.contract_rows.map((row) => row.row_id),
    [
      "source_record_identity",
      "branch_chart_identity",
      "retained_window",
      "regulator_state",
      "active_root_ledger",
      "event_ledger",
      "response_object",
    ]
  );
  assert.equal(artifact.contract_rows.every((row) => row.status === "pass"), true);
});

test("topological source-record mismatch fails the identity contract", () => {
  const input = applyClosedLedgerSourceRecordContractControl(
    buildDefaultClosedLedgerSourceRecordContractInput(),
    "topological-source-record-mismatch"
  );
  const artifact = buildClosedLedgerSourceRecordContractDiagnostic(input);

  assert.deepEqual(validateClosedLedgerSourceRecordContractArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(artifact.result.failure_code, "residual.retained_history_mismatch");
  assert.equal(artifact.result.first_failed_row, "source_record_identity");
  assert.equal(rowById(artifact, "source_record_identity").status, "fail");
  assert.deepEqual(rowById(artifact, "source_record_identity").mismatches, [
    "topological.source_record_contract.source_record_id",
  ]);
});

test("photon route source-record mismatch fails the identity contract", () => {
  const input = applyClosedLedgerSourceRecordContractControl(
    buildDefaultClosedLedgerSourceRecordContractInput(),
    "photon-route-source-record-mismatch"
  );
  const artifact = buildClosedLedgerSourceRecordContractDiagnostic(input);

  assert.deepEqual(validateClosedLedgerSourceRecordContractArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(artifact.result.first_failed_row, "source_record_identity");
  assert.equal(rowById(artifact, "source_record_identity").status, "fail");
  assert.deepEqual(rowById(artifact, "source_record_identity").mismatches, [
    "photon_route.source_record_id",
  ]);
});

test("photon route sample source-record mismatch fails the identity contract", () => {
  const input = applyClosedLedgerSourceRecordContractControl(
    buildDefaultClosedLedgerSourceRecordContractInput(),
    "photon-route-sample-source-record-mismatch"
  );
  const artifact = buildClosedLedgerSourceRecordContractDiagnostic(input);

  assert.deepEqual(validateClosedLedgerSourceRecordContractArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(artifact.result.first_failed_row, "source_record_identity");
  assert.equal(rowById(artifact, "source_record_identity").status, "fail");
  assert.deepEqual(rowById(artifact, "source_record_identity").mismatches, [
    "photon_route.sample_0.source_record_id",
  ]);
});

test("photon route retained-chart mismatch fails the branch-chart contract", () => {
  const input = applyClosedLedgerSourceRecordContractControl(
    buildDefaultClosedLedgerSourceRecordContractInput(),
    "photon-route-retained-chart-mismatch"
  );
  const artifact = buildClosedLedgerSourceRecordContractDiagnostic(input);

  assert.deepEqual(validateClosedLedgerSourceRecordContractArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(rowById(artifact, "source_record_identity").status, "pass");
  assert.equal(rowById(artifact, "branch_chart_identity").status, "fail");
  assert.deepEqual(rowById(artifact, "branch_chart_identity").mismatches, [
    "photon_route.source_record_contract.retained_chart_id",
  ]);
});

test("middle-hinge route source-record mismatch fails the identity contract", () => {
  const input = applyClosedLedgerSourceRecordContractControl(
    buildDefaultClosedLedgerSourceRecordContractInput(),
    "middle-hinge-source-record-mismatch"
  );
  const artifact = buildClosedLedgerSourceRecordContractDiagnostic(input);

  assert.deepEqual(validateClosedLedgerSourceRecordContractArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(artifact.result.first_failed_row, "source_record_identity");
  assert.equal(rowById(artifact, "source_record_identity").status, "fail");
  assert.deepEqual(rowById(artifact, "source_record_identity").mismatches, [
    "middle_hinge_route.source_record_id",
  ]);
});

test("middle-hinge route sample source-record mismatch fails the identity contract", () => {
  const input = applyClosedLedgerSourceRecordContractControl(
    buildDefaultClosedLedgerSourceRecordContractInput(),
    "middle-hinge-sample-source-record-mismatch"
  );
  const artifact = buildClosedLedgerSourceRecordContractDiagnostic(input);

  assert.deepEqual(validateClosedLedgerSourceRecordContractArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(artifact.result.first_failed_row, "source_record_identity");
  assert.equal(rowById(artifact, "source_record_identity").status, "fail");
  assert.deepEqual(rowById(artifact, "source_record_identity").mismatches, [
    "middle_hinge_route.sample_0.source_record_id",
  ]);
});

test("middle-hinge route regulator mismatch fails the regulator contract", () => {
  const input = applyClosedLedgerSourceRecordContractControl(
    buildDefaultClosedLedgerSourceRecordContractInput(),
    "middle-hinge-route-regulator-mismatch"
  );
  const artifact = buildClosedLedgerSourceRecordContractDiagnostic(input);

  assert.deepEqual(validateClosedLedgerSourceRecordContractArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(rowById(artifact, "source_record_identity").status, "pass");
  assert.equal(rowById(artifact, "regulator_state").status, "fail");
  assert.deepEqual(rowById(artifact, "regulator_state").mismatches, ["regulator_state.eta"]);
});

test("event pullback source-record mismatch fails before closure can be claimed", () => {
  const input = applyClosedLedgerSourceRecordContractControl(
    buildDefaultClosedLedgerSourceRecordContractInput(),
    "event-source-record-mismatch"
  );
  const artifact = buildClosedLedgerSourceRecordContractDiagnostic(input);

  assert.deepEqual(validateClosedLedgerSourceRecordContractArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(rowById(artifact, "source_record_identity").status, "fail");
  assert.deepEqual(rowById(artifact, "source_record_identity").mismatches, [
    "event_pullback.source_record_id",
  ]);
});

test("action regulator mismatch fails the same-regulator row", () => {
  const input = applyClosedLedgerSourceRecordContractControl(
    buildDefaultClosedLedgerSourceRecordContractInput(),
    "action-regulator-mismatch"
  );
  const artifact = buildClosedLedgerSourceRecordContractDiagnostic(input);

  assert.deepEqual(validateClosedLedgerSourceRecordContractArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(rowById(artifact, "regulator_state").status, "fail");
  assert.deepEqual(rowById(artifact, "regulator_state").mismatches, ["regulator_state.eta"]);
  assert.equal(rowById(artifact, "source_record_identity").status, "pass");
});

test("response object mismatch fails the Noether sea response row", () => {
  const input = applyClosedLedgerSourceRecordContractControl(
    buildDefaultClosedLedgerSourceRecordContractInput(),
    "response-object-mismatch"
  );
  const artifact = buildClosedLedgerSourceRecordContractDiagnostic(input);

  assert.deepEqual(validateClosedLedgerSourceRecordContractArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(rowById(artifact, "response_object").status, "fail");
  assert.deepEqual(rowById(artifact, "response_object").mismatches, ["topological.response_object_id"]);
});

test("EOM label decoy cannot replace the topology-native active root ledger", () => {
  const input = applyClosedLedgerSourceRecordContractControl(
    buildDefaultClosedLedgerSourceRecordContractInput(),
    "eom-label-decoy-without-topological-ledger"
  );
  const artifact = buildClosedLedgerSourceRecordContractDiagnostic(input);

  assert.deepEqual(validateClosedLedgerSourceRecordContractArtifact(artifact), []);
  assert.equal(input.topological.source_record_contract.eom_label, "receiver_normal_master_eom");
  assert.equal(input.topological.source_record_contract.label_substitution_attempt, true);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(rowById(artifact, "source_record_identity").status, "pass");
  assert.equal(rowById(artifact, "branch_chart_identity").status, "pass");
  assert.equal(rowById(artifact, "retained_window").status, "pass");
  assert.equal(rowById(artifact, "regulator_state").status, "pass");
  assert.equal(rowById(artifact, "active_root_ledger").status, "fail");
  assert.deepEqual(rowById(artifact, "active_root_ledger").mismatches, [
    "active_root_ledger.ledger_id",
    "topological.active_root_ledger.root_row_count",
    "topological.active_root_ledger.winding_owner_present",
    "topological.active_root_ledger.jacobian_floor",
  ]);
});

test("closed-ledger source-record contract CLI writes, validates, and reports schema", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "closed-ledger-source-record-"));
  const artifactPath = path.join(tempDir, "artifact.json");

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], { encoding: "utf8" });
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateClosedLedgerSourceRecordContractArtifact(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.schema, CLOSED_LEDGER_SOURCE_RECORD_CONTRACT_SCHEMA);
  assert.equal(validation.result.diagnostic_status, "diagnostic_passed_priority_only");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, CLOSED_LEDGER_SOURCE_RECORD_CONTRACT_SCHEMA);
  assert.deepEqual(schema.controls, [
    "topological-source-record-mismatch",
    "photon-route-source-record-mismatch",
    "photon-route-sample-source-record-mismatch",
    "photon-route-retained-chart-mismatch",
    "middle-hinge-source-record-mismatch",
    "middle-hinge-sample-source-record-mismatch",
    "middle-hinge-route-regulator-mismatch",
    "event-source-record-mismatch",
    "action-regulator-mismatch",
    "response-object-mismatch",
    "eom-label-decoy-without-topological-ledger",
  ]);
});
