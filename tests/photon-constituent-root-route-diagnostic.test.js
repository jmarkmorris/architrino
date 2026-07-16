import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  PHOTON_CONSTITUENT_ROOT_ROUTE_SCHEMA,
  applyPhotonConstituentRootRouteControl,
  buildDefaultPhotonConstituentRootRouteInput,
  buildPhotonConstituentRootRouteDiagnostic,
  buildSelfHitReplayPhotonConstituentRootRouteInput,
  buildSyntheticPhotonConstituentRootRouteInput,
  validatePhotonConstituentRootRouteArtifact,
} from "../scripts/proof-programs/photon-constituent-root-route-diagnostic.mjs";

const scriptPath = fileURLToPath(
  new URL("../scripts/proof-programs/photon-constituent-root-route-diagnostic.mjs", import.meta.url)
);

function rowById(artifact, rowId) {
  return artifact.diagnostic_rows.find((row) => row.row_id === rowId);
}

test("photon constituent route diagnostic fails closed when a super-field-speed route is missing", () => {
  const artifact = buildPhotonConstituentRootRouteDiagnostic(buildDefaultPhotonConstituentRootRouteInput());
  const errors = validatePhotonConstituentRootRouteArtifact(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, PHOTON_CONSTITUENT_ROOT_ROUTE_SCHEMA);
  assert.equal(artifact.artifact_schema, PHOTON_CONSTITUENT_ROOT_ROUTE_SCHEMA);
  assert.equal(artifact.promotion_status, "priority-only diagnostic");
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.result.updates_live_validation_gate, false);
  assert.equal(artifact.input_summary.super_field_speed_sample_count >= 1, true);
  assert.equal(artifact.route_evidence_summary.route_required_sample_count, 1);
  assert.equal(artifact.route_evidence_summary.accepted_sample_count, 0);
  assert.equal(artifact.route_evidence_summary.accepted_for_branch_retention, false);
  assert.equal(artifact.route_evidence_summary.counts_by_evidence_level.missing, 1);
  assert.equal(artifact.result.accepted_route_evidence_for_branch_retention, false);
  assert.equal(rowById(artifact, "speed_symbol_distinction").status, "pass");
  assert.equal(rowById(artifact, "absolute_velocity_split").status, "pass");
  assert.equal(rowById(artifact, "sample_source_record_identity").status, "pass");
  assert.equal(rowById(artifact, "super_field_speed_route").status, "fail");
  assert.deepEqual(rowById(artifact, "super_field_speed_route").mismatches, ["sample_2.route_kind"]);
  assert.equal(artifact.result.first_failed_row, "super_field_speed_route");
});

test("photon constituent route diagnostic validates a synthetic routed row-logic fixture", () => {
  const artifact = buildPhotonConstituentRootRouteDiagnostic(
    buildSyntheticPhotonConstituentRootRouteInput()
  );

  assert.deepEqual(validatePhotonConstituentRootRouteArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_passed_priority_only");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.diagnostic_rows.every((row) => row.status === "pass"), true);
  assert.equal(artifact.route_evidence_summary.counts_by_evidence_level.synthetic_row_logic, 1);
  assert.equal(artifact.route_evidence_summary.accepted_for_branch_retention, false);
  assert.equal(artifact.source_record_contract.source_record_id, artifact.source_record_id);
  assert.equal(artifact.source_record_contract.retained_chart_id, "torus_root_ledger_q0");
  assert.ok(
    artifact.sample_rows.some((sample) =>
      ["self-hit", "partner-hit", "caustic", "inactive-root"].includes(sample.route_kind)
    )
  );
});

test("photon constituent route diagnostic validates a toy helical self-hit replay fixture", () => {
  const artifact = buildPhotonConstituentRootRouteDiagnostic(
    buildSelfHitReplayPhotonConstituentRootRouteInput()
  );

  assert.deepEqual(validatePhotonConstituentRootRouteArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_passed_priority_only");
  const replayRows = artifact.sample_rows.filter((sample) => sample.route_evidence);
  assert.equal(replayRows.length, 1);
  assert.equal(replayRows[0].route_kind, "self-hit");
  assert.equal(replayRows[0].route_evidence.analysis_id, "prescribed-path-analysis");
  assert.equal(replayRows[0].route_evidence.evidence_grade, "display-only-visualization");
  assert.equal(replayRows[0].route_evidence.non_evidence, true);
  assert.equal(replayRows[0].route_evidence.dynamical_evidence, false);
  assert.equal(replayRows[0].route_evidence.retained_branch_evidence, false);
  assert.equal(replayRows[0].route_evidence.model, "helical_constituent_toy_replay");
  assert.equal(replayRows[0].route_evidence.endpoint_excluded, true);
  assert.equal(replayRows[0].route_evidence.root_tau > 0, true);
  assert.equal(Math.abs(replayRows[0].route_evidence.root_residual) < 1e-9, true);
  assert.equal(artifact.route_evidence_summary.counts_by_evidence_level.toy_self_hit_replay, 1);
  assert.equal(artifact.route_evidence_summary.accepted_sample_count, 0);
  assert.equal(artifact.route_evidence_summary.accepted_for_branch_retention, false);
  assert.deepEqual(
    artifact.route_evidence_summary.sample_evidence.filter((sample) => sample.route_required),
    [
      {
        sample_index: replayRows[0].sample_index,
        route_required: true,
        route_kind: "self-hit",
        route_status: "self_hit_replay_diagnostic",
        evidence_level: "toy_self_hit_replay",
        accepted_evidence_contract_attempted: false,
        accepted_evidence_mismatches: [],
        accepted_for_branch_retention: false,
      },
    ]
  );
});

test("photon route accepted metadata without derivation proof object stays non-accepted", () => {
  const input = buildSelfHitReplayPhotonConstituentRootRouteInput();
  const replayRow = input.sample_rows.find((sample) => sample.route_evidence);
  const sourceRecord = input.topological.source_record_contract;
  replayRow.route_evidence.accepted_for_branch_retention = true;
  replayRow.route_evidence.evidence_level = "accepted_for_branch_retention";
  replayRow.route_evidence.accepted_evidence_id = "accepted_route_attempt_q0";
  replayRow.route_evidence.source_record_id = replayRow.source_record_id;
  replayRow.route_evidence.retained_chart_id = sourceRecord.retained_chart_id;
  replayRow.route_evidence.retained_window_id = sourceRecord.retained_window.id;
  replayRow.route_evidence.regulator_state = sourceRecord.regulator_state;
  const artifact = buildPhotonConstituentRootRouteDiagnostic(input);
  const routeSample = artifact.route_evidence_summary.sample_evidence.find(
    (sample) => sample.route_required
  );

  assert.deepEqual(validatePhotonConstituentRootRouteArtifact(artifact), []);
  assert.equal(routeSample.evidence_level, "accepted_evidence_contract_mismatch");
  assert.equal(routeSample.accepted_evidence_contract_attempted, true);
  assert.equal(routeSample.accepted_for_branch_retention, false);
  assert.deepEqual(routeSample.accepted_evidence_mismatches, [
    "route_evidence.derivation_proof_object.role",
    "route_evidence.derivation_proof_object.accepted_evidence_id",
    "route_evidence.derivation_proof_object.source_record_id",
    "route_evidence.derivation_proof_object.status",
  ]);
  assert.equal(artifact.route_evidence_summary.accepted_sample_count, 0);
  assert.equal(artifact.result.accepted_route_evidence_for_branch_retention, false);
});

test("speed-conflation control fails the symbol distinction row", () => {
  const input = applyPhotonConstituentRootRouteControl(
    buildSyntheticPhotonConstituentRootRouteInput(),
    "speed-conflation"
  );
  const artifact = buildPhotonConstituentRootRouteDiagnostic(input);

  assert.deepEqual(validatePhotonConstituentRootRouteArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(rowById(artifact, "speed_symbol_distinction").status, "fail");
  assert.ok(rowById(artifact, "speed_symbol_distinction").mismatches.includes("sample_0.c_gamma_distinct"));
});

test("sample source-record mismatch control fails the photon sample identity row", () => {
  const input = applyPhotonConstituentRootRouteControl(
    buildSyntheticPhotonConstituentRootRouteInput(),
    "sample-source-record-mismatch"
  );
  const artifact = buildPhotonConstituentRootRouteDiagnostic(input);

  assert.deepEqual(validatePhotonConstituentRootRouteArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(rowById(artifact, "sample_source_record_identity").status, "fail");
  assert.deepEqual(rowById(artifact, "sample_source_record_identity").mismatches, [
    "sample_0.source_record_id",
  ]);
});

test("centerline-only and illegal route controls fail the super-field route row", () => {
  const centerlineInput = applyPhotonConstituentRootRouteControl(
    buildSyntheticPhotonConstituentRootRouteInput(),
    "centerline-only-route"
  );
  const centerlineArtifact = buildPhotonConstituentRootRouteDiagnostic(centerlineInput);

  assert.deepEqual(validatePhotonConstituentRootRouteArtifact(centerlineArtifact), []);
  assert.equal(centerlineArtifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(rowById(centerlineArtifact, "super_field_speed_route").status, "fail");
  assert.equal(rowById(centerlineArtifact, "centerline_not_constituent_route").status, "fail");

  const illegalInput = applyPhotonConstituentRootRouteControl(
    buildSyntheticPhotonConstituentRootRouteInput(),
    "illegal-route"
  );
  const illegalArtifact = buildPhotonConstituentRootRouteDiagnostic(illegalInput);

  assert.deepEqual(validatePhotonConstituentRootRouteArtifact(illegalArtifact), []);
  assert.equal(illegalArtifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(rowById(illegalArtifact, "super_field_speed_route").status, "fail");
  assert.deepEqual(rowById(illegalArtifact, "super_field_speed_route").mismatches, [
    "sample_2.route_kind",
  ]);
});

test("photon constituent route CLI writes, validates, and reports schema", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "photon-constituent-route-"));
  const artifactPath = path.join(tempDir, "artifact.json");

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], { encoding: "utf8" });
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validatePhotonConstituentRootRouteArtifact(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.schema, PHOTON_CONSTITUENT_ROOT_ROUTE_SCHEMA);
  assert.equal(validation.result.diagnostic_status, "diagnostic_failed");

  const routed = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--synthetic-routed"], { encoding: "utf8" })
  );
  assert.equal(routed.result.diagnostic_status, "diagnostic_passed_priority_only");

  const replay = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--self-hit-replay"], { encoding: "utf8" })
  );
  assert.equal(replay.result.diagnostic_status, "diagnostic_passed_priority_only");
  assert.equal(replay.sample_rows.some((sample) => sample.route_evidence?.model === "helical_constituent_toy_replay"), true);

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, PHOTON_CONSTITUENT_ROOT_ROUTE_SCHEMA);
  assert.deepEqual(schema.route_kinds, ["self-hit", "partner-hit", "caustic", "inactive-root"]);
  assert.equal(schema.replay_fixture, "self-hit-replay");
  assert.deepEqual(schema.route_evidence_summary, [
    "sample_evidence",
    "counts_by_evidence_level",
    "accepted_evidence_contract_attempted",
    "accepted_evidence_mismatches",
    "derivation_proof_object",
    "accepted_for_branch_retention",
  ]);
  assert.deepEqual(schema.controls, [
    "speed-conflation",
    "sample-source-record-mismatch",
    "missing-super-field-route",
    "centerline-only-route",
    "illegal-route",
  ]);
});
