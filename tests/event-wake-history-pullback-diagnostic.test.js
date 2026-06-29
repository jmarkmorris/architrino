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

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

const RECEIVER_NORMAL_DERIVATIVE_ARTIFACT_ID =
  "receiver-normal-retained-branch-family-first-derivative/v0";
const REQUIRED_EVENT_ROWS = ["energy_wake", "momentum_wake", "angular_momentum_wake", "medium_update"];

function buildSameRecordReceiverNormalDerivativeBundle(input, rowId, overrides = {}) {
  const retainedRecord = {
    record_id: "linear-moving-receiver-root-0",
    branch_family_id: "linear-moving-receiver-smoke",
    retained_root_id: "rootId=0",
    branch_label: "alpha0",
    source_receiver_ids: { receiver: "receiver", source: "source" },
    direction_convention: "source-emission-point-to-receiver-now",
    receiver_time: 10,
    source_time: 5,
    retained_box: "linear-moving-receiver-singleton",
    regulator_state: "simple-root-analytic-no-regulator",
    source_artifact_hash: "sha256:receiver-normal-wake-history-energy-row-v0",
    source_record_id: input.source_record_id,
    variation_key: "v=t",
    ...(overrides.retained_record_key ?? {}),
  };
  const receiverNormalFields = {
    D_s: 1,
    D_t: 1.5,
    zeta_s: 1,
    zeta_t: 1,
    W_rec: 1.5,
    ...(overrides.receiver_normal_fields ?? {}),
  };
  const receiverNormalDerivatives = {
    D_vD_s: 0.1,
    D_vD_t: 0.4,
    D_vW_rec: 0.25,
    ...(overrides.receiver_normal_derivatives ?? {}),
  };
  const branchFamilyChecksum = {
    retained_record_ids: [retainedRecord.record_id],
    consumer_row_ids: [rowId],
    source_artifact_hash: retainedRecord.source_artifact_hash,
    ...(overrides.branch_family_checksum ?? {}),
  };

  return {
    artifact_id: RECEIVER_NORMAL_DERIVATIVE_ARTIFACT_ID,
    source_record_id: input.source_record_id,
    event_ledger_id: input.event_ledger.ledger_id,
    consumer_row_id: rowId,
    retained_record_key: retainedRecord,
    receiver_normal_fields: receiverNormalFields,
    receiver_normal_derivatives: receiverNormalDerivatives,
    branch_family_checksum: branchFamilyChecksum,
    ...Object.fromEntries(
      Object.entries(overrides).filter(
        ([key]) =>
          ![
            "retained_record_key",
            "receiver_normal_fields",
            "receiver_normal_derivatives",
            "branch_family_checksum",
          ].includes(key)
      )
    ),
  };
}

function acceptedWakeHistoryEvidence(input, rowId, overrides = {}) {
  const acceptedEvidenceId = `accepted_${rowId}_same_record_receiver_normal_derivative_v0`;
  const base = {
    row_id: rowId,
    evidence_level: "accepted_for_wake_history_closure",
    accepted_for_wake_history_closure: true,
    accepted_evidence_id: acceptedEvidenceId,
    source_record_id: input.source_record_id,
    event_ledger_id: input.event_ledger.ledger_id,
    derivation_proof_object: {
      role: "wake_history_derivation_proof_object",
      accepted_evidence_id: acceptedEvidenceId,
      row_id: rowId,
      source_record_id: input.source_record_id,
      status: "accepted",
    },
    receiver_normal_derivative_bundle: buildSameRecordReceiverNormalDerivativeBundle(input, rowId),
  };

  return {
    ...base,
    ...overrides,
    derivation_proof_object: {
      ...base.derivation_proof_object,
      ...(overrides.derivation_proof_object ?? {}),
    },
    receiver_normal_derivative_bundle:
      overrides.receiver_normal_derivative_bundle ?? base.receiver_normal_derivative_bundle,
  };
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
  assert.equal(artifact.result.receiver_normal_derivative_contract_ready, false);
  assert.deepEqual(
    artifact.receiver_normal_derivative_contract_summary.blocked_row_ids,
    REQUIRED_EVENT_ROWS
  );
  assert.equal(
    artifact.receiver_normal_derivative_contract_summary.first_failure_code,
    "receiver-normal-first-derivative-row-missing"
  );
  assert.equal(
    artifact.receiver_normal_derivative_contract_summary.failure_counts[
      "receiver-normal-first-derivative-row-missing"
    ],
    4
  );
  for (const rowContract of artifact.receiver_normal_derivative_contract_summary.row_contracts) {
    assert.deepEqual(rowContract.required_object_blockers, [
      "wake_history_derivation_proof_object",
      "receiver_normal_derivative_bundle",
    ]);
  }
});

test("event wake-history accepts one same-record receiver-normal derivative consumer row", () => {
  const input = buildDefaultEventWakeHistoryPullbackInput();
  input.event_evidence_rows = [acceptedWakeHistoryEvidence(input, "energy_wake")];
  const artifact = buildEventWakeHistoryPullbackDiagnostic(input);
  const energyEvidence = artifact.accepted_evidence_summary.row_evidence.find(
    (row) => row.row_id === "energy_wake"
  );

  assert.deepEqual(validateEventWakeHistoryPullbackArtifact(artifact), []);
  assert.equal(artifact.boundary_status, "closed");
  assert.equal(energyEvidence.evidence_level, "accepted_for_wake_history_closure");
  assert.equal(energyEvidence.accepted_for_wake_history_closure, true);
  assert.deepEqual(energyEvidence.accepted_evidence_mismatches, []);
  assert.equal(artifact.accepted_evidence_summary.accepted_row_count, 1);
  assert.equal(artifact.accepted_evidence_summary.accepted_for_wake_history_closure, false);
  assert.equal(artifact.result.accepted_event_evidence_for_closure, false);
  assert.deepEqual(artifact.receiver_normal_derivative_contract_summary.accepted_row_ids, [
    "energy_wake",
  ]);
  assert.deepEqual(artifact.receiver_normal_derivative_contract_summary.blocked_row_ids, [
    "momentum_wake",
    "angular_momentum_wake",
    "medium_update",
  ]);
});

test("event wake-history accepts same-record receiver-normal derivative bundles for each consumer row", () => {
  for (const rowId of REQUIRED_EVENT_ROWS) {
    const input = buildDefaultEventWakeHistoryPullbackInput();
    input.event_evidence_rows = [acceptedWakeHistoryEvidence(input, rowId)];
    const artifact = buildEventWakeHistoryPullbackDiagnostic(input);
    const rowEvidence = artifact.accepted_evidence_summary.row_evidence.find(
      (row) => row.row_id === rowId
    );

    assert.deepEqual(validateEventWakeHistoryPullbackArtifact(artifact), []);
    assert.equal(rowEvidence.evidence_level, "accepted_for_wake_history_closure");
    assert.equal(rowEvidence.accepted_for_wake_history_closure, true);
    assert.deepEqual(rowEvidence.accepted_evidence_mismatches, []);
    assert.deepEqual(artifact.receiver_normal_derivative_contract_summary.accepted_row_ids, [
      rowId,
    ]);
    assert.equal(artifact.receiver_normal_derivative_contract_summary.all_required_rows_bound, false);
    assert.equal(artifact.result.receiver_normal_derivative_contract_ready, false);
  }
});

test("event wake-history row-logic fixture binds all required receiver-normal derivative rows without retaining a branch", () => {
  const input = buildDefaultEventWakeHistoryPullbackInput();
  input.event_evidence_rows = REQUIRED_EVENT_ROWS.map((rowId) =>
    acceptedWakeHistoryEvidence(input, rowId)
  );
  const artifact = buildEventWakeHistoryPullbackDiagnostic(input);

  assert.deepEqual(validateEventWakeHistoryPullbackArtifact(artifact), []);
  assert.equal(artifact.boundary_status, "closed");
  assert.equal(artifact.accepted_evidence_summary.accepted_row_count, 4);
  assert.equal(artifact.accepted_evidence_summary.accepted_for_wake_history_closure, true);
  assert.equal(artifact.result.accepted_event_evidence_for_closure, true);
  assert.equal(artifact.result.receiver_normal_derivative_contract_ready, true);
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.result.updates_live_validation_gate, false);
  assert.deepEqual(
    artifact.receiver_normal_derivative_contract_summary.accepted_row_ids,
    REQUIRED_EVENT_ROWS
  );
  assert.deepEqual(artifact.receiver_normal_derivative_contract_summary.blocked_row_ids, []);
  assert.equal(artifact.receiver_normal_derivative_contract_summary.first_failure_code, null);
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
    "event_evidence.receiver_normal_derivative_bundle",
  ]);
  assert.deepEqual(
    artifact.receiver_normal_derivative_contract_summary.row_contracts.find(
      (row) => row.row_id === "energy_wake"
    ).required_object_blockers,
    ["wake_history_derivation_proof_object", "receiver_normal_derivative_bundle"]
  );
  assert.equal(artifact.accepted_evidence_summary.accepted_row_count, 0);
  assert.equal(artifact.result.accepted_event_evidence_for_closure, false);
});

test("event wake-history rejects receiver-normal derivative record mismatch", () => {
  const input = buildDefaultEventWakeHistoryPullbackInput();
  input.event_evidence_rows = [
    acceptedWakeHistoryEvidence(input, "energy_wake", {
      receiver_normal_derivative_bundle: buildSameRecordReceiverNormalDerivativeBundle(
        input,
        "energy_wake",
        { source_record_id: "theta_sea_branch_q1_v0" }
      ),
    }),
  ];
  const artifact = buildEventWakeHistoryPullbackDiagnostic(input);
  const energyEvidence = artifact.accepted_evidence_summary.row_evidence.find(
    (row) => row.row_id === "energy_wake"
  );

  assert.deepEqual(validateEventWakeHistoryPullbackArtifact(artifact), []);
  assert.equal(energyEvidence.evidence_level, "accepted_evidence_contract_mismatch");
  assert.equal(energyEvidence.accepted_for_wake_history_closure, false);
  assert.equal(
    artifact.receiver_normal_derivative_contract_summary.first_failure_code,
    "receiver-normal-derivative-record-mismatch"
  );
  assert.equal(
    energyEvidence.accepted_evidence_mismatches.includes(
      "event_evidence.receiver_normal_derivative_bundle.source_record_id"
    ),
    true
  );
});

test("event wake-history rejects receiver-normal derivative reconstruction drift", () => {
  const input = buildDefaultEventWakeHistoryPullbackInput();
  input.event_evidence_rows = [
    acceptedWakeHistoryEvidence(input, "energy_wake", {
      receiver_normal_derivative_bundle: buildSameRecordReceiverNormalDerivativeBundle(
        input,
        "energy_wake",
        { receiver_normal_derivatives: { D_vW_rec: 0.5 } }
      ),
    }),
  ];
  const artifact = buildEventWakeHistoryPullbackDiagnostic(input);
  const energyEvidence = artifact.accepted_evidence_summary.row_evidence.find(
    (row) => row.row_id === "energy_wake"
  );

  assert.deepEqual(validateEventWakeHistoryPullbackArtifact(artifact), []);
  assert.equal(energyEvidence.evidence_level, "accepted_evidence_contract_mismatch");
  assert.equal(energyEvidence.accepted_for_wake_history_closure, false);
  assert.equal(
    artifact.receiver_normal_derivative_contract_summary.first_failure_code,
    "receiver-normal-derivative-reconstruction-failed"
  );
  assert.equal(
    energyEvidence.accepted_evidence_mismatches.includes(
      "event_evidence.receiver_normal_derivative_bundle.receiver_normal_derivatives.D_vW_rec_reconstruction"
    ),
    true
  );
});

test("event wake-history rejects branch-family checksum drift", () => {
  const input = buildDefaultEventWakeHistoryPullbackInput();
  input.event_evidence_rows = [
    acceptedWakeHistoryEvidence(input, "energy_wake", {
      receiver_normal_derivative_bundle: buildSameRecordReceiverNormalDerivativeBundle(
        input,
        "energy_wake",
        { branch_family_checksum: { retained_record_ids: ["other-root"] } }
      ),
    }),
  ];
  const artifact = buildEventWakeHistoryPullbackDiagnostic(input);
  const energyEvidence = artifact.accepted_evidence_summary.row_evidence.find(
    (row) => row.row_id === "energy_wake"
  );

  assert.deepEqual(validateEventWakeHistoryPullbackArtifact(artifact), []);
  assert.equal(energyEvidence.evidence_level, "accepted_evidence_contract_mismatch");
  assert.equal(energyEvidence.accepted_for_wake_history_closure, false);
  assert.equal(
    artifact.receiver_normal_derivative_contract_summary.first_failure_code,
    "branch-family-consumer-checksum-mismatch"
  );
  assert.equal(
    energyEvidence.accepted_evidence_mismatches.includes(
      "event_evidence.receiver_normal_derivative_bundle.branch_family_checksum.retained_record_ids"
    ),
    true
  );
});

test("event wake-history validator rejects accepted summary drift", () => {
  const artifact = buildEventWakeHistoryPullbackDiagnostic(buildDefaultEventWakeHistoryPullbackInput());
  const tampered = deepClone(artifact);
  tampered.accepted_evidence_summary.accepted_row_count = 4;
  tampered.accepted_evidence_summary.accepted_for_wake_history_closure = true;
  tampered.result.accepted_event_evidence_for_closure = true;
  for (const rowEvidence of tampered.accepted_evidence_summary.row_evidence) {
    rowEvidence.accepted_for_wake_history_closure = true;
  }
  tampered.receiver_normal_derivative_contract_summary.all_required_rows_bound = true;
  tampered.result.receiver_normal_derivative_contract_ready = true;

  const errors = validateEventWakeHistoryPullbackArtifact(tampered);
  assert.equal(errors.includes("energy_wake accepted flag must match event row"), true);
  assert.equal(errors.includes("momentum_wake accepted flag must match event row"), true);
  assert.equal(
    errors.includes(
      "receiver_normal_derivative_contract_summary.all_required_rows_bound must match accepted rows"
    ),
    true
  );
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

test("event wake-history CLI reports branch-family checksum mismatch control", () => {
  const artifact = JSON.parse(
    execFileSync(
      process.execPath,
      [
        scriptPath,
        "--control",
        "receiver-normal-branch-family-checksum-mismatch",
        "--event-row",
        "momentum_wake",
      ],
      { encoding: "utf8" }
    )
  );
  const rowContract = artifact.receiver_normal_derivative_contract_summary.row_contracts.find(
    (row) => row.row_id === "momentum_wake"
  );

  assert.deepEqual(validateEventWakeHistoryPullbackArtifact(artifact), []);
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.result.updates_live_validation_gate, false);
  assert.equal(artifact.result.receiver_normal_derivative_contract_ready, false);
  assert.equal(
    artifact.receiver_normal_derivative_contract_summary.first_blocked_row_id,
    "momentum_wake"
  );
  assert.equal(
    artifact.receiver_normal_derivative_contract_summary.first_failure_code,
    "branch-family-consumer-checksum-mismatch"
  );
  assert.equal(rowContract.failure_code, "branch-family-consumer-checksum-mismatch");
  assert.equal(rowContract.receiver_normal_derivative_bundle_accepted, false);
});

test("event wake-history CLI reports missing receiver-normal derivative bundle control", () => {
  const artifact = JSON.parse(
    execFileSync(
      process.execPath,
      [
        scriptPath,
        "--control",
        "receiver-normal-missing-derivative-bundle",
        "--event-row",
        "angular_momentum_wake",
      ],
      { encoding: "utf8" }
    )
  );
  const rowContract = artifact.receiver_normal_derivative_contract_summary.row_contracts.find(
    (row) => row.row_id === "angular_momentum_wake"
  );

  assert.deepEqual(validateEventWakeHistoryPullbackArtifact(artifact), []);
  assert.equal(
    artifact.receiver_normal_derivative_contract_summary.first_blocked_row_id,
    "angular_momentum_wake"
  );
  assert.equal(
    artifact.receiver_normal_derivative_contract_summary.first_failure_code,
    "receiver-normal-first-derivative-row-missing"
  );
  assert.deepEqual(rowContract.required_object_blockers, [
    "receiver_normal_derivative_bundle",
  ]);
});

test("event wake-history CLI reports receiver-normal reconstruction drift control", () => {
  const artifact = JSON.parse(
    execFileSync(
      process.execPath,
      [
        scriptPath,
        "--control",
        "receiver-normal-reconstruction-drift",
        "--event-row",
        "medium_update",
      ],
      { encoding: "utf8" }
    )
  );
  const rowContract = artifact.receiver_normal_derivative_contract_summary.row_contracts.find(
    (row) => row.row_id === "medium_update"
  );

  assert.deepEqual(validateEventWakeHistoryPullbackArtifact(artifact), []);
  assert.equal(
    artifact.receiver_normal_derivative_contract_summary.first_blocked_row_id,
    "medium_update"
  );
  assert.equal(
    artifact.receiver_normal_derivative_contract_summary.first_failure_code,
    "receiver-normal-derivative-reconstruction-failed"
  );
  assert.equal(
    rowContract.accepted_evidence_mismatches.includes(
      "event_evidence.receiver_normal_derivative_bundle.receiver_normal_derivatives.D_vW_rec_reconstruction"
    ),
    true
  );
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
    "receiver_normal_derivative_bundle",
    "accepted_for_wake_history_closure",
  ]);
  assert.deepEqual(schema.receiver_normal_derivative_contract_summary, [
    "required_row_ids",
    "accepted_row_ids",
    "blocked_row_ids",
    "first_failure_code",
    "required_object_blockers",
    "row_contracts",
  ]);
  assert.deepEqual(schema.controls, ["missing-angular-momentum-row", "source-record-mismatch"]);
  assert.deepEqual(schema.receiver_normal_controls, [
    "receiver-normal-derivative-contract-row-logic",
    "receiver-normal-missing-derivative-bundle",
    "receiver-normal-reconstruction-drift",
    "receiver-normal-record-mismatch",
    "receiver-normal-branch-family-checksum-mismatch",
  ]);
  assert.deepEqual(schema.receiver_normal_event_rows, [
    "energy_wake",
    "momentum_wake",
    "angular_momentum_wake",
    "medium_update",
    "all",
  ]);
});
