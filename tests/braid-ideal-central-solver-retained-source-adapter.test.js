import test from "node:test";
import assert from "node:assert/strict";

import {
  FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT,
  NEGATIVE_CONTROL_REASONS,
  SCHEMA,
  buildCentralSolverRetainedSourceAdapter,
  evaluateCentralSolverRetainedSourceAdapterEvidence,
  validateCentralSolverRetainedSourceAdapter,
} from "../scripts/braid-ideal/central-solver-retained-source-adapter.mjs";

function makeRefs(prefix, count = 36) {
  return Array.from({ length: count }, (_, index) => `${prefix}:${index}`);
}

test("central retained-source adapter is deterministic and fails closed at retained record binding", () => {
  const first = buildCentralSolverRetainedSourceAdapter();
  const second = buildCentralSolverRetainedSourceAdapter();

  assert.deepEqual(first, second);
  assert.equal(first.schema, SCHEMA);
  assert.equal(first.artifact_status, "fail_closed_missing_retained_record_id");
  assert.equal(first.source_status, "source_acquisition_blocked");
  assert.equal(first.first_missing_object, FIRST_MISSING_OBJECT);
  assert.equal(first.first_missing_field, FIRST_MISSING_FIELD);
  assert.equal(first.path_history_binding.seed_path_row_count, 6);
  assert.equal(first.path_history_binding.stream_manifest_count, 6);
  assert.equal(first.path_history_binding.durable_stream_count, 0);
  assert.equal(first.root_ledger_binding.required_root_replay_count, 36);
  assert.equal(first.accepted_retained_source_adapter_ref, null);
  assert.deepEqual(validateCentralSolverRetainedSourceAdapter(first), []);
});

test("central retained-source adapter binds candidate provider-backed path history before source row evidence", () => {
  const retainedRecordId = "retained-record:held-release-six-point:source-adapter";
  const durableManifestRefs = makeRefs("durable:braid-ideal:source-adapter:path-history-stream", 6);
  const artifact = buildCentralSolverRetainedSourceAdapter({
    retainedRecordId,
    durableManifestRefs,
  });

  assert.equal(artifact.artifact_status, "fail_closed_missing_source_row_id");
  assert.equal(
    artifact.first_missing_field,
    "central_solver_retained_source_adapter.same_record_binding.source_row_id"
  );
  assert.equal(artifact.same_record_binding.retained_record_id, retainedRecordId);
  assert.equal(artifact.same_record_binding.source_row_id, null);
  assert.match(
    artifact.provider_provenance.provider_object_ref,
    /^candidate:central_solver_retained_history_provider_object:[0-9a-f]{16}$/
  );
  assert.equal(artifact.path_history_binding.durable_stream_count, 6);
  assert.deepEqual(artifact.path_history_binding.durable_stream_manifest_refs, durableManifestRefs);
  assert.equal(
    artifact.source_artifacts.central_solver_retained_history_provider_object.source_status,
    "candidate_provider_backed_source_unaccepted"
  );
  assert.equal(artifact.authorization.central_solver_retained_source_adapter, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
  assert.deepEqual(validateCentralSolverRetainedSourceAdapter(artifact), []);
});

test("central retained-source adapter carries root, replay, action, and wake refs but remains non-authorizing", () => {
  const retainedRecordId = "retained-record:held-release-six-point:source-adapter-full";
  const sourceRowId = "two-speed-preferred-row:u0.8:v0.2";
  const durableManifestRefs = makeRefs("durable:braid-ideal:source-adapter-full:path-history-stream", 6);
  const nativeRootLedgerDetailRefs = makeRefs("native-root-ledger-detail:braid-ideal:source-adapter-full");
  const causalRootReplayRefs = makeRefs("causal-root-replay:braid-ideal:source-adapter-full");
  const artifact = buildCentralSolverRetainedSourceAdapter({
    retainedRecordId,
    sourceRowId,
    durableManifestRefs,
    nativeRootLedgerDetailRefs,
    causalRootReplayRefs,
    sameRecordActionClosureRef: "accepted:action-closure-row:source-adapter-full",
    retainedWakeHistoryRef: "accepted:wake-history:source-adapter-full",
  });

  assert.equal(artifact.artifact_status, "retained_source_adapter_present_acceptance_blocked");
  assert.equal(artifact.source_status, "candidate_retained_source_adapter_unaccepted");
  assert.equal(
    artifact.first_missing_field,
    "central_solver_retained_source_adapter.acceptance_certificate_ref"
  );
  assert.equal(artifact.same_record_binding.retained_record_id, retainedRecordId);
  assert.equal(artifact.same_record_binding.source_row_id, sourceRowId);
  assert.equal(artifact.path_history_binding.durable_stream_count, 6);
  assert.equal(artifact.root_ledger_binding.native_root_ledger_detail_ref_count, 36);
  assert.equal(artifact.root_ledger_binding.causal_root_replay_ref_count, 36);
  assert.equal(
    artifact.root_ledger_binding.status,
    "native_root_ledger_detail_and_replay_refs_present_unaccepted"
  );
  assert.deepEqual(evaluateCentralSolverRetainedSourceAdapterEvidence(artifact), {
    accepted: false,
    reason: "producer_does_not_authorize_accepted_retained_source_adapter_evidence",
    first_missing_field: "central_solver_retained_source_adapter.acceptance_certificate_ref",
  });
  assert.equal(artifact.accepted_retained_source_adapter_ref, null);
  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
  assert.equal(artifact.authorization.retained_branch_claim, false);
  assert.deepEqual(validateCentralSolverRetainedSourceAdapter(artifact), []);
});

test("central retained-source adapter rejects generic metadata and non-evidence classes", () => {
  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    assert.deepEqual(evaluateCentralSolverRetainedSourceAdapterEvidence({ evidence_class: evidenceClass }), {
      accepted: false,
      reason,
      first_missing_field: FIRST_MISSING_FIELD,
    });
  }

  assert.deepEqual(evaluateCentralSolverRetainedSourceAdapterEvidence({ schema: "path-history-only.v0" }), {
    accepted: false,
    reason: "schema_not_central_solver_retained_source_adapter_v0",
    first_missing_field: FIRST_MISSING_FIELD,
  });

  assert.deepEqual(
    evaluateCentralSolverRetainedSourceAdapterEvidence({
      schema: SCHEMA,
      same_record_binding: { retained_record_id: "retained-record:generic" },
    }),
    {
      accepted: false,
      reason: "provider_provenance_missing",
      first_missing_field: "central_solver_retained_source_adapter.provider_provenance.provider_object_ref",
    }
  );
});
