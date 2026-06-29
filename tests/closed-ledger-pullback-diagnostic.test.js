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
  buildRegulatorOnlyActionBoundaryPullbackInput,
  buildSyntheticActionBoundaryPullbackInput,
} from "../scripts/proof-programs/action-boundary-pullback-diagnostic.mjs";
import {
  buildDefaultEventWakeHistoryPullbackInput,
  buildEventWakeHistoryPullbackDiagnostic,
} from "../scripts/proof-programs/event-wake-history-pullback-diagnostic.mjs";
import {
  applyClosedLedgerSourceRecordContractControl,
  buildClosedLedgerSourceRecordContractDiagnostic,
  buildDefaultClosedLedgerSourceRecordContractInput,
} from "../scripts/proof-programs/closed-ledger-source-record-contract-diagnostic.mjs";
import {
  buildPhotonConstituentRootRouteDiagnostic,
  buildSelfHitReplayPhotonConstituentRootRouteInput,
} from "../scripts/proof-programs/photon-constituent-root-route-diagnostic.mjs";
import {
  buildMiddleHingeRootStatusDiagnostic,
  buildThresholdReplayMiddleHingeRootStatusInput,
} from "../scripts/proof-programs/middle-hinge-root-status-diagnostic.mjs";

const scriptPath = fileURLToPath(
  new URL("../scripts/proof-programs/closed-ledger-pullback-diagnostic.mjs", import.meta.url)
);

function rowById(artifact, rowId) {
  return artifact.boundary_rows.find((row) => row.row_id === rowId);
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function syntheticPhotonRoute() {
  return buildPhotonConstituentRootRouteDiagnostic(buildSelfHitReplayPhotonConstituentRootRouteInput());
}

function thresholdMiddleHingeRoute() {
  return buildMiddleHingeRootStatusDiagnostic(buildThresholdReplayMiddleHingeRootStatusInput());
}

test("closed-ledger pullback diagnostic fails closed on default active-root route blockers", () => {
  const artifact = buildClosedLedgerPullbackDiagnostic(buildDefaultClosedLedgerPullbackInput());
  const errors = validateClosedLedgerPullbackArtifact(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, CLOSED_LEDGER_PULLBACK_SCHEMA);
  assert.equal(artifact.promotion_status, "priority-only diagnostic");
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.result.updates_live_validation_gate, false);
  assert.equal(rowById(artifact, "source_record_contract").status, "pass");
  assert.equal(rowById(artifact, "partial_R_act").status, "fail");
  assert.equal(
    rowById(artifact, "partial_R_act").accepted_route_evidence_status,
    "not_accepted_for_branch_retention"
  );
  assert.equal(
    rowById(artifact, "partial_R_act").route_evidence_summary.photon_route
      .counts_by_evidence_level.missing,
    1
  );
  assert.equal(
    rowById(artifact, "partial_R_act").route_evidence_summary.middle_hinge_route
      .counts_by_evidence_level.missing,
    4
  );
  assert.equal(rowById(artifact, "partial_M_sea").status, "pass");
  assert.equal(
    rowById(artifact, "partial_M_sea").accepted_medium_response_evidence_status,
    "not_accepted_for_medium_response_closure"
  );
  assert.equal(rowById(artifact, "partial_L_EpJ").status, "pass");
  assert.equal(
    rowById(artifact, "partial_L_EpJ").accepted_event_evidence_status,
    "not_accepted_for_wake_history_closure"
  );
  assert.equal(rowById(artifact, "partial_S_B_eta").status, "fail");
  assert.equal(rowById(artifact, "C_AAA").status, "fail");
  assert.equal(rowById(artifact, "C_AAA").cross_sector_acceptance_status, "blocked_by_boundary_rows");
  assert.equal(rowById(artifact, "C_AAA").accepted_evidence_ready, false);
  assert.deepEqual(
    rowById(artifact, "C_AAA").accepted_evidence_statuses.map((entry) => [
      entry.row_id,
      entry.accepted,
    ]),
    [
      ["partial_R_act", false],
      ["partial_L_EpJ", false],
      ["partial_S_B_eta", false],
      ["partial_M_sea", false],
    ]
  );
  assert.equal(artifact.result.first_failed_row, "partial_R_act");
  assert.equal(artifact.result.failure_code, "residual.photon_constituent_unrouted");
  assert.equal(artifact.result.branch_retention_status, "not_retained; boundary_rows_failed");
  assert.deepEqual(
    artifact.blocker_order.map((entry) => [entry.row_id, entry.status]),
    [
      ["source_record_contract", "pass"],
      ["partial_R_act", "fail"],
      ["partial_L_EpJ", "pass"],
      ["partial_S_B_eta", "fail"],
      ["partial_M_sea", "pass"],
      ["C_AAA", "fail"],
    ]
  );
});

test("closed-ledger pullback diagnostic can validate a fully populated priority-only fixture", () => {
  const input = buildDefaultClosedLedgerPullbackInput({
    photonRoute: syntheticPhotonRoute(),
    middleHingeRoute: thresholdMiddleHingeRoute(),
    actionPullback: buildActionBoundaryPullbackDiagnostic(buildSyntheticActionBoundaryPullbackInput()),
    eventPullback: buildEventWakeHistoryPullbackDiagnostic(buildDefaultEventWakeHistoryPullbackInput()),
  });
  const artifact = buildClosedLedgerPullbackDiagnostic(input);

  assert.deepEqual(validateClosedLedgerPullbackArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_passed_priority_only");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(rowById(artifact, "source_record_contract").status, "pass");
  assert.equal(artifact.boundary_rows.every((row) => row.status === "pass"), true);
  assert.equal(
    rowById(artifact, "partial_R_act").accepted_route_evidence_status,
    "not_accepted_for_branch_retention"
  );
  assert.equal(
    rowById(artifact, "partial_R_act").route_evidence_summary.photon_route
      .counts_by_evidence_level.toy_self_hit_replay,
    1
  );
  assert.equal(
    rowById(artifact, "partial_R_act").route_evidence_summary.middle_hinge_route
      .counts_by_evidence_level.toy_threshold_self_hit_route,
    3
  );
  assert.equal(
    rowById(artifact, "partial_R_act").route_evidence_summary.middle_hinge_route
      .counts_by_evidence_level.toy_threshold_finite_eta_route,
    1
  );
  assert.equal(
    rowById(artifact, "partial_S_B_eta").accepted_action_evidence_status,
    "not_accepted_for_action_closure"
  );
  assert.equal(
    rowById(artifact, "partial_L_EpJ").accepted_event_evidence_status,
    "not_accepted_for_wake_history_closure"
  );
  assert.equal(
    rowById(artifact, "partial_M_sea").accepted_medium_response_evidence_status,
    "not_accepted_for_medium_response_closure"
  );
  assert.equal(
    rowById(artifact, "partial_S_B_eta").accepted_evidence_summary
      .counts_by_evidence_level.synthetic_row_logic,
    4
  );
  assert.equal(rowById(artifact, "C_AAA").status, "pass");
  assert.equal(
    rowById(artifact, "C_AAA").cross_sector_acceptance_status,
    "row_logic_passed_priority_only; accepted_evidence_missing"
  );
  assert.equal(rowById(artifact, "C_AAA").accepted_evidence_ready, false);
  assert.deepEqual(
    rowById(artifact, "C_AAA").accepted_evidence_blockers.map((entry) => entry.row_id),
    ["partial_R_act", "partial_L_EpJ", "partial_S_B_eta", "partial_M_sea"]
  );
  assert.equal(artifact.result.first_failure_status, "closed_ledger_pullback_compatible_priority_only; branch_still_not_retained");
  assert.equal(artifact.result.branch_retention_status, "not_retained; accepted_evidence_missing");
});

test("closed-ledger pullback diagnostic exposes action endpoint and multiplier blockers after active-root routes are populated", () => {
  const input = buildDefaultClosedLedgerPullbackInput({
    photonRoute: syntheticPhotonRoute(),
    middleHingeRoute: thresholdMiddleHingeRoute(),
    actionPullback: buildActionBoundaryPullbackDiagnostic(buildRegulatorOnlyActionBoundaryPullbackInput()),
    eventPullback: buildEventWakeHistoryPullbackDiagnostic(buildDefaultEventWakeHistoryPullbackInput()),
  });
  const artifact = buildClosedLedgerPullbackDiagnostic(input);

  assert.deepEqual(validateClosedLedgerPullbackArtifact(artifact), []);
  assert.equal(rowById(artifact, "partial_R_act").status, "pass");
  assert.equal(
    rowById(artifact, "partial_R_act").accepted_route_evidence_status,
    "not_accepted_for_branch_retention"
  );
  assert.equal(rowById(artifact, "partial_L_EpJ").status, "pass");
  assert.equal(rowById(artifact, "partial_M_sea").status, "pass");
  assert.equal(rowById(artifact, "partial_S_B_eta").status, "fail");
  assert.deepEqual(rowById(artifact, "partial_S_B_eta").evidence_level_summary, {
    action_endpoint_row: "missing",
    action_multiplier_row: "missing",
    eta_regulator_row: "source_record_regulator_declared",
    epsilon_c_core_row: "source_record_regulator_declared",
  });
  assert.equal(
    rowById(artifact, "partial_S_B_eta").accepted_action_evidence_status,
    "not_accepted_for_action_closure"
  );
  assert.equal(rowById(artifact, "partial_S_B_eta").accepted_evidence_summary.accepted_row_count, 0);
  assert.equal(artifact.result.first_failed_row, "partial_S_B_eta");
  assert.equal(artifact.result.failure_code, "residual.provenance_gap");
  assert.deepEqual(
    artifact.blocker_order.map((entry) => [entry.row_id, entry.status]),
    [
      ["source_record_contract", "pass"],
      ["partial_R_act", "pass"],
      ["partial_L_EpJ", "pass"],
      ["partial_S_B_eta", "fail"],
      ["partial_M_sea", "pass"],
      ["C_AAA", "fail"],
    ]
  );
});

test("closed-ledger pullback diagnostic propagates Noether handoff mismatch", () => {
  const input = buildDefaultClosedLedgerPullbackInput({
    noetherControl: "retained-history-mismatch",
    photonRoute: syntheticPhotonRoute(),
    middleHingeRoute: thresholdMiddleHingeRoute(),
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

test("closed-ledger pullback diagnostic propagates source-record contract mismatch", () => {
  const sourceRecordContract = buildClosedLedgerSourceRecordContractDiagnostic(
    applyClosedLedgerSourceRecordContractControl(
      buildDefaultClosedLedgerSourceRecordContractInput(),
      "topological-source-record-mismatch"
    )
  );
  const input = buildDefaultClosedLedgerPullbackInput({
    sourceRecordContract,
    photonRoute: syntheticPhotonRoute(),
    middleHingeRoute: thresholdMiddleHingeRoute(),
    actionPullback: buildActionBoundaryPullbackDiagnostic(buildSyntheticActionBoundaryPullbackInput()),
    eventPullback: buildEventWakeHistoryPullbackDiagnostic(buildDefaultEventWakeHistoryPullbackInput()),
  });
  const artifact = buildClosedLedgerPullbackDiagnostic(input);

  assert.deepEqual(validateClosedLedgerPullbackArtifact(artifact), []);
  assert.equal(artifact.result.diagnostic_status, "diagnostic_failed");
  assert.equal(rowById(artifact, "source_record_contract").status, "fail");
  assert.equal(rowById(artifact, "source_record_contract").failure_code, "residual.retained_history_mismatch");
  assert.equal(artifact.result.first_failed_row, "source_record_contract");
  assert.equal(rowById(artifact, "C_AAA").status, "fail");
});

test("closed-ledger pullback diagnostic rejects a swapped route artifact outside the source-record contract", () => {
  const baselineInput = buildDefaultClosedLedgerPullbackInput({
    photonRoute: syntheticPhotonRoute(),
    middleHingeRoute: thresholdMiddleHingeRoute(),
    actionPullback: buildActionBoundaryPullbackDiagnostic(buildSyntheticActionBoundaryPullbackInput()),
    eventPullback: buildEventWakeHistoryPullbackDiagnostic(buildDefaultEventWakeHistoryPullbackInput()),
  });
  const swappedPhotonRoute = deepClone(baselineInput.photon_route);
  swappedPhotonRoute.source_record_id = "theta_sea_branch_q1_v0";
  swappedPhotonRoute.source_record_contract.source_record_id = "theta_sea_branch_q1_v0";
  for (const sample of swappedPhotonRoute.sample_rows) {
    sample.source_record_id = "theta_sea_branch_q1_v0";
  }
  const artifact = buildClosedLedgerPullbackDiagnostic({
    ...baselineInput,
    photon_route: swappedPhotonRoute,
  });

  assert.deepEqual(validateClosedLedgerPullbackArtifact(artifact), []);
  assert.equal(rowById(artifact, "source_record_contract").status, "pass");
  assert.equal(rowById(artifact, "partial_R_act").status, "fail");
  assert.equal(rowById(artifact, "partial_R_act").failure_code, "residual.retained_history_mismatch");
  assert.equal(
    rowById(artifact, "partial_R_act").source_record_checks.find(
      (check) => check.field === "photon_route.source_record_id"
    ).ok,
    false
  );
  assert.equal(artifact.result.first_failed_row, "partial_R_act");
});

test("closed-ledger pullback diagnostic rejects swapped route sample rows outside the source-record contract", () => {
  const baselineInput = buildDefaultClosedLedgerPullbackInput({
    photonRoute: syntheticPhotonRoute(),
    middleHingeRoute: thresholdMiddleHingeRoute(),
    actionPullback: buildActionBoundaryPullbackDiagnostic(buildSyntheticActionBoundaryPullbackInput()),
    eventPullback: buildEventWakeHistoryPullbackDiagnostic(buildDefaultEventWakeHistoryPullbackInput()),
  });
  const swappedMiddleHingeRoute = deepClone(baselineInput.middle_hinge_route);
  swappedMiddleHingeRoute.sample_rows[0].source_record_id = "theta_sea_branch_q1_v0";
  const artifact = buildClosedLedgerPullbackDiagnostic({
    ...baselineInput,
    middle_hinge_route: swappedMiddleHingeRoute,
  });

  assert.deepEqual(validateClosedLedgerPullbackArtifact(artifact), []);
  assert.equal(rowById(artifact, "source_record_contract").status, "pass");
  assert.equal(rowById(artifact, "partial_R_act").status, "fail");
  assert.equal(rowById(artifact, "partial_R_act").failure_code, "residual.retained_history_mismatch");
  assert.equal(
    rowById(artifact, "partial_R_act").source_record_checks.find(
      (check) => check.field === "middle_hinge_route.sample_0.source_record_id"
    ).ok,
    false
  );
});

test("closed-ledger pullback diagnostic rejects forged action accepted summary", () => {
  const baselineInput = buildDefaultClosedLedgerPullbackInput({
    photonRoute: syntheticPhotonRoute(),
    middleHingeRoute: thresholdMiddleHingeRoute(),
    actionPullback: buildActionBoundaryPullbackDiagnostic(buildSyntheticActionBoundaryPullbackInput()),
    eventPullback: buildEventWakeHistoryPullbackDiagnostic(buildDefaultEventWakeHistoryPullbackInput()),
  });
  const forgedAction = deepClone(baselineInput.action_pullback);
  forgedAction.accepted_evidence_summary.accepted_row_count = 4;
  forgedAction.accepted_evidence_summary.accepted_for_action_closure = true;
  forgedAction.result.accepted_action_evidence_for_closure = true;
  for (const rowEvidence of forgedAction.accepted_evidence_summary.row_evidence) {
    rowEvidence.accepted_for_action_closure = true;
  }
  const artifact = buildClosedLedgerPullbackDiagnostic({
    ...baselineInput,
    action_pullback: forgedAction,
  });
  const actionRow = rowById(artifact, "partial_S_B_eta");

  assert.deepEqual(validateClosedLedgerPullbackArtifact(artifact), []);
  assert.equal(actionRow.status, "fail");
  assert.equal(actionRow.accepted_action_evidence_status, "action_evidence_summary_invalid");
  assert.equal(
    actionRow.validation_errors.includes("action_endpoint_row accepted flag must match action row"),
    true
  );
  assert.equal(rowById(artifact, "C_AAA").status, "fail");
});

test("closed-ledger pullback diagnostic rejects forged event accepted summary", () => {
  const baselineInput = buildDefaultClosedLedgerPullbackInput({
    photonRoute: syntheticPhotonRoute(),
    middleHingeRoute: thresholdMiddleHingeRoute(),
    actionPullback: buildActionBoundaryPullbackDiagnostic(buildSyntheticActionBoundaryPullbackInput()),
    eventPullback: buildEventWakeHistoryPullbackDiagnostic(buildDefaultEventWakeHistoryPullbackInput()),
  });
  const forgedEvent = deepClone(baselineInput.event_pullback);
  forgedEvent.accepted_evidence_summary.accepted_row_count = 4;
  forgedEvent.accepted_evidence_summary.accepted_for_wake_history_closure = true;
  forgedEvent.result.accepted_event_evidence_for_closure = true;
  for (const rowEvidence of forgedEvent.accepted_evidence_summary.row_evidence) {
    rowEvidence.accepted_for_wake_history_closure = true;
  }
  const artifact = buildClosedLedgerPullbackDiagnostic({
    ...baselineInput,
    event_pullback: forgedEvent,
  });
  const eventRow = rowById(artifact, "partial_L_EpJ");

  assert.deepEqual(validateClosedLedgerPullbackArtifact(artifact), []);
  assert.equal(eventRow.status, "fail");
  assert.equal(eventRow.accepted_event_evidence_status, "event_evidence_summary_invalid");
  assert.equal(
    eventRow.validation_errors.includes("energy_wake accepted flag must match event row"),
    true
  );
  assert.equal(rowById(artifact, "C_AAA").status, "fail");
});

test("closed-ledger pullback diagnostic CLI writes, validates, and reports schema", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "closed-ledger-pullback-"));
  const artifactPath = path.join(tempDir, "artifact.json");

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], { encoding: "utf8" });
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateClosedLedgerPullbackArtifact(artifact), []);
  assert.equal(rowById(artifact, "source_record_contract").status, "pass");
  assert.equal(rowById(artifact, "partial_R_act").status, "fail");

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.schema, CLOSED_LEDGER_PULLBACK_SCHEMA);
  assert.equal(validation.result.diagnostic_status, "diagnostic_failed");

  const replay = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--route-replay-fixtures"], { encoding: "utf8" })
  );
  assert.equal(rowById(replay, "partial_R_act").status, "pass");
  assert.equal(
    rowById(replay, "partial_R_act").accepted_route_evidence_status,
    "not_accepted_for_branch_retention"
  );
  assert.equal(
    rowById(replay, "partial_R_act").route_evidence_summary.photon_route
      .counts_by_evidence_level.toy_self_hit_replay,
    1
  );
  assert.equal(rowById(replay, "partial_S_B_eta").status, "fail");
  assert.equal(replay.result.first_failed_row, "partial_S_B_eta");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, CLOSED_LEDGER_PULLBACK_SCHEMA);
  assert.equal(schema.action_pullback_schema, "aaa-proof/action-boundary-pullback-diagnostic/v1");
  assert.equal(schema.event_pullback_schema, "aaa-proof/event-wake-history-pullback-diagnostic/v1");
  assert.equal(
    schema.source_record_contract_schema,
    "aaa-proof/closed-ledger-source-record-contract-diagnostic/v1"
  );
  assert.equal(schema.photon_route_schema, "aaa-proof/photon-constituent-root-route-diagnostic/v1");
  assert.equal(schema.middle_hinge_route_schema, "aaa-proof/middle-hinge-root-status-diagnostic/v1");
  assert.deepEqual(schema.route_replay_fixtures, ["photon-self-hit-replay", "middle-hinge-threshold-replay"]);
  assert.deepEqual(schema.route_evidence_summary, ["photon_route", "middle_hinge_route"]);
  assert.equal(schema.noether_accepted_evidence_summary, true);
  assert.equal(schema.event_accepted_evidence_summary, true);
  assert.equal(schema.action_accepted_evidence_summary, true);
  assert.equal(schema.cross_sector_acceptance_status, true);
  assert.equal(schema.branch_retention_status, true);
});
