import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  MIDDLE_HINGE_ROOT_STATUS_SCHEMA,
  applyMiddleHingeRootStatusControl,
  buildDefaultMiddleHingeRootStatusInput,
  buildMiddleHingeRootStatusDiagnostic,
  buildSyntheticMiddleHingeRootStatusInput,
  buildThresholdReplayMiddleHingeRootStatusInput,
  validateMiddleHingeRootStatusArtifact,
} from "../scripts/proof-programs/middle-hinge-root-status-diagnostic.mjs";

const scriptPath = fileURLToPath(
  new URL("../scripts/proof-programs/middle-hinge-root-status-diagnostic.mjs", import.meta.url)
);

function rowById(artifact, rowId) {
  return artifact.diagnostic_rows.find((row) => row.row_id === rowId);
}

test("middle-hinge diagnostic fails closed when root-status routes are missing", () => {
  const artifact = buildMiddleHingeRootStatusDiagnostic(buildDefaultMiddleHingeRootStatusInput());
  const errors = validateMiddleHingeRootStatusArtifact(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, MIDDLE_HINGE_ROOT_STATUS_SCHEMA);
  assert.equal(artifact.artifact_schema, MIDDLE_HINGE_ROOT_STATUS_SCHEMA);
  assert.equal(artifact.promotion_status, "priority-only diagnostic");
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.result.updates_live_validation_gate, false);
  assert.equal(artifact.input_summary.declared_root_status_word, "0 1 C 0 1 1 0");
  assert.equal(artifact.input_summary.transition_count, 6);
  assert.equal(artifact.route_evidence_summary.route_required_sample_count, 4);
  assert.equal(artifact.route_evidence_summary.accepted_sample_count, 0);
  assert.equal(artifact.route_evidence_summary.accepted_for_branch_retention, false);
  assert.equal(artifact.route_evidence_summary.counts_by_evidence_level.missing, 4);
  assert.equal(artifact.result.accepted_route_evidence_for_branch_retention, false);
  assert.deepEqual(
    artifact.transition_rows.map((transition) => transition.transition_symbol),
    ["0->1", "1->C", "C->0", "0->1", "1->1", "1->0"]
  );
  assert.equal(rowById(artifact, "speed_residual_word").status, "pass");
  assert.equal(rowById(artifact, "super_field_root_replay_route").status, "fail");
  assert.deepEqual(rowById(artifact, "super_field_root_replay_route").mismatches, [
    "sample_1.route_kind",
    "sample_4.route_kind",
    "sample_5.route_kind",
  ]);
  assert.equal(rowById(artifact, "caustic_finite_eta_route").status, "fail");
  assert.deepEqual(rowById(artifact, "caustic_finite_eta_route").mismatches, [
    "sample_2.route_kind",
  ]);
  assert.equal(rowById(artifact, "transition_rows").status, "fail");
  assert.ok(rowById(artifact, "transition_rows").mismatches.includes("transition_1.route_present"));
});

test("middle-hinge diagnostic validates a synthetic routed row-logic fixture", () => {
  const artifact = buildMiddleHingeRootStatusDiagnostic(
    buildSyntheticMiddleHingeRootStatusInput()
  );

  assert.deepEqual(validateMiddleHingeRootStatusArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_passed_priority_only");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.diagnostic_rows.every((row) => row.status === "pass"), true);
  assert.equal(artifact.route_evidence_summary.counts_by_evidence_level.synthetic_row_logic, 4);
  assert.equal(artifact.route_evidence_summary.accepted_for_branch_retention, false);
  assert.equal(artifact.source_record_contract.source_record_id, artifact.source_record_id);
  assert.equal(artifact.source_record_contract.retained_chart_id, "torus_root_ledger_q0");
  assert.equal(artifact.transition_rows.length, 6);
  assert.deepEqual(
    artifact.transition_rows.map((transition) => transition.route_obligation),
    [
      "root_replay_route",
      "caustic_or_finite_eta_route",
      "caustic_or_finite_eta_route",
      "root_replay_route",
      "none",
      "root_replay_route",
    ]
  );
  assert.ok(artifact.sample_rows.some((sample) => sample.route_kind === "self-hit"));
  assert.ok(artifact.sample_rows.some((sample) => sample.route_kind === "caustic"));
});

test("middle-hinge diagnostic validates a toy threshold replay fixture", () => {
  const artifact = buildMiddleHingeRootStatusDiagnostic(
    buildThresholdReplayMiddleHingeRootStatusInput()
  );

  assert.deepEqual(validateMiddleHingeRootStatusArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_passed_priority_only");
  const evidenceRows = artifact.sample_rows.filter((sample) => sample.route_evidence);
  assert.equal(evidenceRows.length, 4);
  assert.equal(evidenceRows.filter((sample) => sample.route_kind === "self-hit").length, 3);
  assert.equal(evidenceRows.filter((sample) => sample.route_kind === "finite-eta").length, 1);
  assert.ok(
    evidenceRows.every((sample) => sample.route_evidence.model === "middle_hinge_threshold_toy_replay")
  );
  assert.equal(
    artifact.route_evidence_summary.counts_by_evidence_level.toy_threshold_self_hit_route,
    3
  );
  assert.equal(
    artifact.route_evidence_summary.counts_by_evidence_level.toy_threshold_finite_eta_route,
    1
  );
  assert.equal(artifact.route_evidence_summary.accepted_sample_count, 0);
  assert.equal(artifact.route_evidence_summary.accepted_for_branch_retention, false);
});

test("middle-hinge accepted flag without same-record evidence stays non-accepted", () => {
  const input = buildThresholdReplayMiddleHingeRootStatusInput();
  const replayRow = input.sample_rows.find((sample) => sample.route_evidence);
  replayRow.route_evidence.accepted_for_branch_retention = true;
  replayRow.route_evidence.evidence_level = "accepted_for_branch_retention";
  const artifact = buildMiddleHingeRootStatusDiagnostic(input);
  const routeSample = artifact.route_evidence_summary.sample_evidence.find(
    (sample) => sample.sample_index === replayRow.sample_index
  );

  assert.deepEqual(validateMiddleHingeRootStatusArtifact(artifact), []);
  assert.equal(routeSample.evidence_level, "accepted_evidence_contract_mismatch");
  assert.equal(routeSample.accepted_evidence_contract_attempted, true);
  assert.equal(routeSample.accepted_for_branch_retention, false);
  assert.ok(routeSample.accepted_evidence_mismatches.includes("route_evidence.source_record_id"));
  assert.equal(artifact.route_evidence_summary.accepted_sample_count, 0);
  assert.equal(artifact.result.accepted_route_evidence_for_branch_retention, false);
});

test("sample source-record mismatch control fails the middle-hinge sample identity row", () => {
  const input = applyMiddleHingeRootStatusControl(
    buildSyntheticMiddleHingeRootStatusInput(),
    "sample-source-record-mismatch"
  );
  const artifact = buildMiddleHingeRootStatusDiagnostic(input);

  assert.deepEqual(validateMiddleHingeRootStatusArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(rowById(artifact, "sample_source_record_identity").status, "fail");
  assert.deepEqual(rowById(artifact, "sample_source_record_identity").mismatches, [
    "sample_0.source_record_id",
  ]);
});

test("literal-communication control fails the communication guard row", () => {
  const input = applyMiddleHingeRootStatusControl(
    buildSyntheticMiddleHingeRootStatusInput(),
    "literal-communication"
  );
  const artifact = buildMiddleHingeRootStatusDiagnostic(input);

  assert.deepEqual(validateMiddleHingeRootStatusArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(rowById(artifact, "not_literal_communication").status, "fail");
  assert.deepEqual(rowById(artifact, "not_literal_communication").mismatches, [
    "not_literal_communication",
    "route_status_no_literal_message",
  ]);
});

test("missing-route controls fail the matching hinge route rows", () => {
  const superInput = applyMiddleHingeRootStatusControl(
    buildSyntheticMiddleHingeRootStatusInput(),
    "missing-super-field-route"
  );
  const superArtifact = buildMiddleHingeRootStatusDiagnostic(superInput);

  assert.deepEqual(validateMiddleHingeRootStatusArtifact(superArtifact), []);
  assert.equal(superArtifact.result.diagnostic_status, "diagnostic_failed");
  assert.deepEqual(rowById(superArtifact, "super_field_root_replay_route").mismatches, [
    "sample_1.route_kind",
  ]);
  assert.ok(rowById(superArtifact, "transition_rows").mismatches.includes("transition_0.route_present"));

  const causticInput = applyMiddleHingeRootStatusControl(
    buildSyntheticMiddleHingeRootStatusInput(),
    "missing-caustic-route"
  );
  const causticArtifact = buildMiddleHingeRootStatusDiagnostic(causticInput);

  assert.deepEqual(validateMiddleHingeRootStatusArtifact(causticArtifact), []);
  assert.equal(causticArtifact.result.diagnostic_status, "diagnostic_failed");
  assert.deepEqual(rowById(causticArtifact, "caustic_finite_eta_route").mismatches, [
    "sample_2.route_kind",
  ]);
  assert.ok(rowById(causticArtifact, "transition_rows").mismatches.includes("transition_1.route_present"));
});

test("wrong-root-status-word control fails the residual word row", () => {
  const input = applyMiddleHingeRootStatusControl(
    buildSyntheticMiddleHingeRootStatusInput(),
    "wrong-root-status-word"
  );
  const artifact = buildMiddleHingeRootStatusDiagnostic(input);

  assert.deepEqual(validateMiddleHingeRootStatusArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(rowById(artifact, "speed_residual_word").status, "fail");
  assert.deepEqual(rowById(artifact, "speed_residual_word").mismatches, [
    "sample_2.root_status_symbol",
    "root_status_word",
  ]);
  assert.deepEqual(
    artifact.transition_rows.map((transition) => transition.transition_symbol),
    ["0->1", "1->1", "1->0", "0->1", "1->1", "1->0"]
  );
});

test("middle-hinge diagnostic CLI writes, validates, and reports schema", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "middle-hinge-route-"));
  const artifactPath = path.join(tempDir, "artifact.json");

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], { encoding: "utf8" });
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateMiddleHingeRootStatusArtifact(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.schema, MIDDLE_HINGE_ROOT_STATUS_SCHEMA);
  assert.equal(validation.result.diagnostic_status, "diagnostic_failed");

  const routed = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--synthetic-routed"], { encoding: "utf8" })
  );
  assert.equal(routed.result.diagnostic_status, "diagnostic_passed_priority_only");

  const replay = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--threshold-replay"], { encoding: "utf8" })
  );
  assert.equal(replay.result.diagnostic_status, "diagnostic_passed_priority_only");
  assert.equal(
    replay.sample_rows.some((sample) => sample.route_evidence?.model === "middle_hinge_threshold_toy_replay"),
    true
  );

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, MIDDLE_HINGE_ROOT_STATUS_SCHEMA);
  assert.deepEqual(schema.super_field_route_kinds, ["self-hit", "inactive-root"]);
  assert.deepEqual(schema.caustic_route_kinds, ["caustic", "finite-eta"]);
  assert.equal(schema.replay_fixture, "threshold-replay");
  assert.deepEqual(schema.route_evidence_summary, [
    "sample_evidence",
    "counts_by_evidence_level",
    "accepted_evidence_contract_attempted",
    "accepted_evidence_mismatches",
    "accepted_for_branch_retention",
  ]);
  assert.deepEqual(schema.controls, [
    "literal-communication",
    "sample-source-record-mismatch",
    "missing-super-field-route",
    "missing-caustic-route",
    "wrong-root-status-word",
  ]);
});
