import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  CLOSED_LEDGER_PULLBACK_SCHEMA,
  buildClosedLedgerPullbackDiagnostic,
  buildDefaultClosedLedgerPullbackInput,
  validateClosedLedgerPullbackArtifact,
} from "../scripts/proof-programs/closed-ledger-pullback-diagnostic.mjs";
import {
  buildActionBoundaryPullbackDiagnostic,
  buildSyntheticActionBoundaryPullbackInput,
} from "../scripts/proof-programs/action-boundary-pullback-diagnostic.mjs";
import {
  buildDefaultEventWakeHistoryPullbackInput,
  buildEventWakeHistoryPullbackDiagnostic,
} from "../scripts/proof-programs/event-wake-history-pullback-diagnostic.mjs";

const scriptPath = fileURLToPath(
  new URL("../scripts/proof-programs/closed-ledger-pullback-diagnostic.mjs", import.meta.url)
);

function rowById(artifact, rowId) {
  return artifact.boundary_rows.find((row) => row.row_id === rowId);
}

test("closed-ledger pullback diagnostic fails closed on the default action boundary blocker", () => {
  const artifact = buildClosedLedgerPullbackDiagnostic(buildDefaultClosedLedgerPullbackInput());
  const errors = validateClosedLedgerPullbackArtifact(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, CLOSED_LEDGER_PULLBACK_SCHEMA);
  assert.equal(artifact.promotion_status, "priority-only diagnostic");
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.result.updates_live_validation_gate, false);
  assert.equal(rowById(artifact, "partial_R_act").status, "pass");
  assert.equal(rowById(artifact, "partial_M_sea").status, "pass");
  assert.equal(rowById(artifact, "partial_L_EpJ").status, "pass");
  assert.equal(rowById(artifact, "partial_S_B_eta").status, "fail");
  assert.equal(rowById(artifact, "C_AAA").status, "fail");
  assert.equal(artifact.result.first_failed_row, "partial_S_B_eta");
  assert.equal(artifact.result.failure_code, "residual.provenance_gap");
});

test("closed-ledger pullback diagnostic can validate a fully populated priority-only fixture", () => {
  const input = buildDefaultClosedLedgerPullbackInput({
    actionPullback: buildActionBoundaryPullbackDiagnostic(buildSyntheticActionBoundaryPullbackInput()),
    eventPullback: buildEventWakeHistoryPullbackDiagnostic(buildDefaultEventWakeHistoryPullbackInput()),
  });
  const artifact = buildClosedLedgerPullbackDiagnostic(input);

  assert.deepEqual(validateClosedLedgerPullbackArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_passed_priority_only");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.boundary_rows.every((row) => row.status === "pass"), true);
  assert.equal(artifact.result.first_failure_status, "closed_ledger_pullback_compatible_priority_only; branch_still_not_retained");
});

test("closed-ledger pullback diagnostic propagates Noether handoff mismatch", () => {
  const input = buildDefaultClosedLedgerPullbackInput({
    noetherControl: "retained-history-mismatch",
    actionPullback: buildActionBoundaryPullbackDiagnostic(buildSyntheticActionBoundaryPullbackInput()),
    eventPullback: buildEventWakeHistoryPullbackDiagnostic(buildDefaultEventWakeHistoryPullbackInput()),
  });
  const artifact = buildClosedLedgerPullbackDiagnostic(input);

  assert.deepEqual(validateClosedLedgerPullbackArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(rowById(artifact, "partial_M_sea").status, "fail");
  assert.equal(rowById(artifact, "partial_M_sea").failure_code, "residual.retained_history_mismatch");
  assert.equal(rowById(artifact, "C_AAA").status, "fail");
});

test("closed-ledger pullback diagnostic CLI writes, validates, and reports schema", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "closed-ledger-pullback-"));
  const artifactPath = path.join(tempDir, "artifact.json");

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], { encoding: "utf8" });
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateClosedLedgerPullbackArtifact(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.schema, CLOSED_LEDGER_PULLBACK_SCHEMA);
  assert.equal(validation.result.diagnostic_status, "diagnostic_failed");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, CLOSED_LEDGER_PULLBACK_SCHEMA);
  assert.equal(schema.action_pullback_schema, "aaa-proof/action-boundary-pullback-diagnostic/v1");
  assert.equal(schema.event_pullback_schema, "aaa-proof/event-wake-history-pullback-diagnostic/v1");
});
