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
  assert.equal(rowById(artifact, "action_multiplier_row").status, "fail");
});

test("action boundary pullback diagnostic validates a synthetic closed row-logic fixture", () => {
  const artifact = buildActionBoundaryPullbackDiagnostic(buildSyntheticActionBoundaryPullbackInput());

  assert.deepEqual(validateActionBoundaryPullbackArtifact(artifact), []);
  assert.equal(artifact.boundary_status, "closed");
  assert.equal(artifact.residual_norm, 0);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_passed_priority_only");
  assert.equal(artifact.action_rows.every((row) => row.status === "pass"), true);
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
  assert.deepEqual(schema.controls, ["source-record-mismatch", "regulator-mismatch", "missing-multiplier-row"]);
});
