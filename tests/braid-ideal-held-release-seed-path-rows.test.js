import assert from "node:assert/strict";
import test from "node:test";

import {
  FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT,
  NEGATIVE_CONTROL_REASONS,
  buildHeldReleaseSeedPathRows,
  evaluateHeldReleaseSeedPathRowsEvidence,
  validateHeldReleaseSeedPathRows,
} from "../scripts/braid-ideal/held-release-seed-path-rows.mjs";

test("held-release seed path rows are deterministic and fail closed at retained record binding", () => {
  const first = buildHeldReleaseSeedPathRows();
  const second = buildHeldReleaseSeedPathRows();

  assert.deepEqual(first, second);
  assert.equal(first.schema, "held_release_seed_path_rows.v0");
  assert.equal(first.artifact_status, "fail_closed_missing_retained_record_id");
  assert.equal(first.source_status, "source_acquisition_blocked");
  assert.equal(first.first_missing_object, FIRST_MISSING_OBJECT);
  assert.equal(first.first_missing_field, FIRST_MISSING_FIELD);
  assert.equal(first.rows.length, 6);
  assert.equal(first.artifact_hash.length, 64);
  assert.equal(first.artifact_id.startsWith("held_release_seed_path_rows:"), true);
  assert.deepEqual(validateHeldReleaseSeedPathRows(first), []);
});

test("held-release seed path rows expose SolverPathHistoryRowF64-compatible fields", () => {
  const artifact = buildHeldReleaseSeedPathRows();
  const runIds = new Set();
  const pathKeys = new Set();

  for (const row of artifact.rows) {
    runIds.add(row.path_identity.same_run_id);
    pathKeys.add(row.solver_path_history_row_f64.pathKey);

    assert.equal(row.schema, "held_release_seed_path_row.v0");
    assert.equal(row.accepted, false);
    assert.equal(row.path_identity.held_release_seed_id, artifact.seed_id);
    assert.equal(row.path_identity.retained_record_id, null);
    assert.equal(typeof row.path_identity.architrino_id, "string");
    assert.equal(Number.isSafeInteger(row.solver_path_history_row_f64.pathKey), true);
    assert.equal(row.solver_path_history_row_f64.segmentIndex, 0);
    assert.equal(row.solver_path_history_row_f64.startTime, 0);
    assert.equal(row.solver_path_history_row_f64.endTime, 18);
    assert.equal(row.solver_path_history_row_f64.start.length, 3);
    assert.equal(row.solver_path_history_row_f64.velocity.length, 3);
    assert.equal(row.solver_path_history_row_f64.errorBound, 0);
    assert.equal(row.solver_path_history_row_f64.stateFlags, 0);
    assert.equal(row.dynamic_replay_metadata.schema, "held-release-seed-path-dynamic-replay.v0");
    assert.equal(row.dynamic_replay_metadata.clean_central_solver_contract, "SolverPathHistoryRowF64");
    assert.equal(row.same_record_binding.required, true);
    assert.equal(row.same_record_binding.retained_record_id, null);
    assert.equal(row.same_record_binding.status, "missing_retained_record_id");
    assert.equal(row.provider_provenance.provider_object_ref, null);
    assert.equal(row.first_missing_field, FIRST_MISSING_FIELD);
    assert.equal(row.artifact_hash.length, 64);
  }

  assert.equal(runIds.size, 1);
  assert.equal(pathKeys.size, 6);
  assert.equal(artifact.row_contract.required_layout, "path_segment.v1");
  assert.equal(artifact.row_contract.manifest_consumer_schema, "held_release_path_history_stream_manifest_set.v0");
});

test("retained record presence sharpens the blocker to provider provenance without authorizing claims", () => {
  const artifact = buildHeldReleaseSeedPathRows({
    retainedRecordId: "retained-record:held-release-six-point:demo",
  });

  assert.equal(artifact.retained_record_requirement.retained_record_id, "retained-record:held-release-six-point:demo");
  assert.equal(artifact.artifact_status, "fail_closed_missing_provider_provenance");
  assert.equal(artifact.first_missing_object, "held_release_seed_path_rows_provider_object");
  assert.equal(
    artifact.first_missing_field,
    "held_release_seed_path_rows[*].provider_provenance.provider_object_ref"
  );
  assert.equal(
    artifact.rows.every(
      (row) =>
        row.same_record_binding.retained_record_id === "retained-record:held-release-six-point:demo" &&
        row.same_record_binding.status === "retained_record_id_present_unaccepted" &&
        row.provider_provenance.provider_object_ref === null
    ),
    true
  );
  assert.equal(artifact.authorization.retained_branch_claim, false);
  assert.equal(artifact.authorization.accepted_transition_source, false);
  assert.equal(artifact.authorization.moving_retained_branch_certificate, false);
  assert.equal(artifact.authorization.same_ledger_action_measure_row, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
});

test("held-release seed path rows can carry candidate provider backing without authorizing evidence", () => {
  const artifact = buildHeldReleaseSeedPathRows({
    retainedRecordId: "retained-record:held-release-six-point:provider-backed",
    providerObjectRef: "candidate:central_solver_retained_history_provider_object:test",
    providerArtifactHash: "provider-hash-test",
  });

  assert.equal(artifact.artifact_status, "provider_backed_seed_path_rows_present_acceptance_blocked");
  assert.equal(artifact.source_status, "candidate_provider_backed_source_unaccepted");
  assert.equal(artifact.first_missing_object, "held_release_seed_path_rows_acceptance_certificate");
  assert.equal(artifact.first_missing_field, "held_release_seed_path_rows.acceptance_certificate_ref");
  assert.equal(
    artifact.rows.every(
      (row) =>
        row.same_record_binding.retained_record_id ===
          "retained-record:held-release-six-point:provider-backed" &&
        row.provider_provenance.provider_object_ref ===
          "candidate:central_solver_retained_history_provider_object:test" &&
        row.provider_provenance.provider_artifact_hash === "provider-hash-test"
    ),
    true
  );
  assert.deepEqual(evaluateHeldReleaseSeedPathRowsEvidence(artifact), {
    accepted: false,
    reason: "producer_does_not_authorize_accepted_path_row_evidence",
    first_missing_field: "held_release_seed_path_rows.acceptance_certificate_ref",
  });
  assert.equal(artifact.authorization.held_release_seed_path_rows, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
  assert.deepEqual(validateHeldReleaseSeedPathRows(artifact), []);
});

test("generic path rows without same-record binding are rejected as source evidence", () => {
  const generic = {
    schema: "held_release_seed_path_rows.v0",
    rows: Array.from({ length: 6 }, (_, index) => ({
      solver_path_history_row_f64: {
        pathKey: index + 1,
        segmentIndex: 0,
        startTime: 0,
        endTime: 1,
        start: [0, 0, 0],
        velocity: [0, 0, 0],
      },
      same_record_binding: { retained_record_id: null },
      provider_provenance: { provider_object_ref: null },
    })),
  };

  assert.deepEqual(evaluateHeldReleaseSeedPathRowsEvidence(generic), {
    accepted: false,
    reason: "retained_record_id_missing",
    first_missing_field: FIRST_MISSING_FIELD,
  });
});

test("held-release seed path-row guard rejects non-evidence classes and never authorizes downstream claims", () => {
  const artifact = buildHeldReleaseSeedPathRows();

  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
  assert.equal(artifact.authorization.held_release_seed_path_rows, false);
  assert.equal(artifact.authorization.retained_branch_claim, false);
  assert.equal(artifact.authorization.accepted_transition_source, false);
  assert.equal(artifact.authorization.moving_retained_branch_certificate, false);
  assert.equal(artifact.authorization.same_ledger_action_measure_row, false);
  assert.equal(artifact.authorization.bounded_speed_live_ledger, false);
  assert.equal(artifact.authorization.receiver_normal_branch_strength, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");

  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    assert.deepEqual(evaluateHeldReleaseSeedPathRowsEvidence({ evidence_class: evidenceClass }), {
      accepted: false,
      reason,
      first_missing_field: FIRST_MISSING_FIELD,
    });
  }

  assert.deepEqual(evaluateHeldReleaseSeedPathRowsEvidence({ schema: "central_solver_retained_history_row.v0" }), {
    accepted: false,
    reason: "schema_not_held_release_seed_path_rows_v0",
    first_missing_field: FIRST_MISSING_FIELD,
  });
});
