import test from "node:test";
import assert from "node:assert/strict";

import {
  FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT,
  NEGATIVE_CONTROL_REASONS,
  SCHEMA,
  buildCentralSolverRetainedHistoryProviderObject,
  evaluateCentralSolverRetainedHistoryProviderObjectEvidence,
  validateCentralSolverRetainedHistoryProviderObject,
} from "../scripts/braid-ideal/central-solver-retained-history-provider-object.mjs";
import {
  INTERNAL_TANGENT_AUTHORITY_VECTOR_REQUEST_SCHEMA,
  buildCentralSolverRetainedHistoryRow,
} from "../scripts/braid-ideal/central-solver-retained-history-row.mjs";
import { buildHeldReleaseSeedPathRows } from "../scripts/braid-ideal/held-release-seed-path-rows.mjs";
import { buildHeldReleasePathHistoryStreamManifestSet } from "../scripts/braid-ideal/held-release-path-history-stream-manifest-set.mjs";

test("central solver retained-history provider object assembles one fail-closed provider object", () => {
  const artifact = buildCentralSolverRetainedHistoryProviderObject();

  assert.equal(artifact.schema, SCHEMA);
  assert.equal(artifact.artifact_status, "fail_closed_missing_retained_record_id");
  assert.equal(artifact.source_status, "source_acquisition_blocked");
  assert.equal(artifact.first_missing_object, FIRST_MISSING_OBJECT);
  assert.equal(artifact.first_missing_field, FIRST_MISSING_FIELD);
  assert.match(artifact.provider_object_id, /^central_solver_retained_history_provider_object:[0-9a-f]{16}$/);
  assert.equal(artifact.accepted_provider_object_ref, null);
  assert.equal(artifact.provider_provenance.provider_object_ref, null);
  assert.deepEqual(validateCentralSolverRetainedHistoryProviderObject(artifact), []);
});

test("provider object binds six seed rows and six stream manifests by same-run source artifacts", () => {
  const seedArtifact = buildHeldReleaseSeedPathRows();
  const manifestSet = buildHeldReleasePathHistoryStreamManifestSet({ seedArtifact });
  const artifact = buildCentralSolverRetainedHistoryProviderObject({
    seedArtifact,
    manifestSetArtifact: manifestSet,
  });

  assert.equal(artifact.source_artifacts.held_release_seed_path_rows.consumed_artifact_hash, seedArtifact.artifact_hash);
  assert.equal(
    artifact.source_artifacts.held_release_path_history_stream_manifest_set.consumed_artifact_hash,
    manifestSet.artifact_hash
  );
  assert.equal(artifact.same_run_binding.source_run_id, seedArtifact.source_run_identity.source_run_id);
  assert.equal(artifact.same_run_binding.source_run_id, manifestSet.same_run_identity.source_run_id);
  assert.equal(artifact.same_run_binding.seed_row_count, 6);
  assert.equal(artifact.same_run_binding.stream_manifest_row_count, 6);
  assert.equal(artifact.seed_row_refs.length, 6);
  assert.equal(artifact.stream_manifest_refs.length, 6);
  assert.equal(artifact.path_segment_layout.required_layout, "path_segment.v1");
  assert.equal(artifact.path_segment_layout.local_manifest_count, 6);
  assert.equal(artifact.path_segment_layout.durable_stream_count, 0);
  assert.equal(
    artifact.internal_tangent_authority_vector_request.schema,
    INTERNAL_TANGENT_AUTHORITY_VECTOR_REQUEST_SCHEMA
  );
  assert.deepEqual(
    artifact.internal_tangent_authority_vector_request.required_same_record_rows.map((request) => request.row),
    [
      "same_record_retained_path_error_row",
      "same_record_retained_root_ledger_detail_rows",
      "retained_solver_tangent_target_vector_row",
      "active_causal_margin_gradient_vector_row",
      "post_provider_root_margin_row",
      "same_record_closure_rows",
    ]
  );
  assert.equal(artifact.internal_tangent_authority_vector_request.accepted, false);

  for (let index = 0; index < 6; index += 1) {
    assert.equal(artifact.seed_row_refs[index].source_seed_row_id, seedArtifact.rows[index].row_id);
    assert.equal(
      artifact.seed_row_refs[index].source_seed_row_artifact_hash,
      seedArtifact.rows[index].artifact_hash
    );
    assert.equal(artifact.stream_manifest_refs[index].stream_manifest_row_id, manifestSet.stream_manifest_rows[index].row_id);
    assert.equal(
      artifact.stream_manifest_refs[index].stream_manifest_artifact_hash,
      manifestSet.stream_manifest_rows[index].artifact_hash
    );
    assert.equal(
      artifact.stream_manifest_refs[index].source_seed_row_artifact_hash,
      seedArtifact.rows[index].artifact_hash
    );
  }
});

test("retained-record injected path sharpens to provider provenance and durable stream absence", () => {
  const retainedRecordId = "retained-record:held-release-six-point:demo";
  const seedArtifact = buildHeldReleaseSeedPathRows({ retainedRecordId });
  const manifestSet = buildHeldReleasePathHistoryStreamManifestSet({ seedArtifact });
  const artifact = buildCentralSolverRetainedHistoryProviderObject({
    seedArtifact,
    manifestSetArtifact: manifestSet,
  });

  assert.equal(artifact.artifact_status, "fail_closed_missing_provider_provenance");
  assert.equal(
    artifact.first_missing_object,
    "central_solver_retained_history_provider_object_provider_provenance"
  );
  assert.equal(
    artifact.first_missing_field,
    "central_solver_retained_history_provider_object.provider_provenance.provider_object_ref"
  );
  assert.equal(
    artifact.first_internal_blocker,
    "central_solver_retained_history_provider_object.durable_stream_manifest_refs"
  );
  assert.equal(artifact.retained_record_binding.retained_record_id, retainedRecordId);
  assert.equal(artifact.path_segment_layout.durable_stream_count, 0);
  assert.equal(artifact.provider_provenance.provider_object_ref, null);
  assert.equal(artifact.authorization.central_solver_retained_history_provider_object, false);
  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
});

test("provider object can bind provider-backed source rows and durable stream refs without authorizing evidence", () => {
  const retainedRecordId = "retained-record:held-release-six-point:provider-backed";
  const durableManifestRefs = Array.from(
    { length: 6 },
    (_, index) => `durable:braid-ideal:test:path-history-stream:${index}`
  );
  const baseSeedArtifact = buildHeldReleaseSeedPathRows({ retainedRecordId });
  const baseManifestSet = buildHeldReleasePathHistoryStreamManifestSet({
    seedArtifact: baseSeedArtifact,
    durableManifestRefs,
  });
  const requestRow = buildCentralSolverRetainedHistoryRow({ retainedRecordId });
  const providerShell = buildCentralSolverRetainedHistoryProviderObject({
    seedArtifact: baseSeedArtifact,
    manifestSetArtifact: baseManifestSet,
    retainedHistoryRow: requestRow,
  });
  const providerObjectRef = providerShell.candidate_provider_object_ref;

  const seedArtifact = buildHeldReleaseSeedPathRows({
    retainedRecordId,
    providerObjectRef,
    providerArtifactHash: providerShell.artifact_hash,
  });
  const manifestSet = buildHeldReleasePathHistoryStreamManifestSet({
    seedArtifact,
    providerObjectRef,
    providerArtifactHash: providerShell.artifact_hash,
    durableManifestRefs,
  });
  const retainedHistoryRow = buildCentralSolverRetainedHistoryRow({
    retainedRecordId,
    providerObjectRef,
    providerArtifactHash: providerShell.artifact_hash,
  });
  const artifact = buildCentralSolverRetainedHistoryProviderObject({
    seedArtifact,
    manifestSetArtifact: manifestSet,
    retainedHistoryRow,
  });

  assert.equal(artifact.candidate_provider_object_ref, providerObjectRef);
  assert.equal(artifact.artifact_hash, providerShell.artifact_hash);
  assert.equal(artifact.artifact_status, "fail_closed_missing_acceptance_certificate");
  assert.equal(artifact.source_status, "candidate_provider_backed_source_unaccepted");
  assert.equal(
    artifact.first_missing_object,
    "central_solver_retained_history_provider_object_acceptance_certificate"
  );
  assert.equal(
    artifact.first_missing_field,
    "central_solver_retained_history_provider_object.acceptance_certificate_ref"
  );
  assert.equal(artifact.provider_provenance.provider_object_ref, providerObjectRef);
  assert.equal(artifact.provider_provenance.provider_artifact_hash, providerShell.artifact_hash);
  assert.equal(artifact.path_segment_layout.durable_stream_count, 6);
  assert.equal(
    artifact.internal_tangent_authority_vector_request.request_id,
    retainedHistoryRow.internal_tangent_authority_vector_request.request_id
  );
  assert.equal(
    artifact.internal_tangent_authority_vector_request.minimum_norm_retained_history_gain_witness_row_ref,
    null
  );
  assert.equal(
    artifact.stream_manifest_refs.every(
      (row, index) =>
        row.provider_object_ref === providerObjectRef &&
        row.durable_manifest_ref === durableManifestRefs[index]
    ),
    true
  );
  assert.deepEqual(evaluateCentralSolverRetainedHistoryProviderObjectEvidence(artifact), {
    accepted: false,
    reason: "producer_does_not_authorize_accepted_provider_object_evidence",
    first_missing_field: "central_solver_retained_history_provider_object.acceptance_certificate_ref",
  });
  assert.equal(artifact.authorization.central_solver_retained_history_provider_object, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
  assert.deepEqual(validateCentralSolverRetainedHistoryProviderObject(artifact), []);
});

test("generic provider metadata without same-record binding is rejected", () => {
  const result = evaluateCentralSolverRetainedHistoryProviderObjectEvidence({
    evidence_class: "generic_stream_provider_metadata_without_same_record_binding",
  });

  assert.equal(result.accepted, false);
  assert.equal(
    result.reason,
    NEGATIVE_CONTROL_REASONS.generic_stream_provider_metadata_without_same_record_binding
  );

  const schemaOnly = evaluateCentralSolverRetainedHistoryProviderObjectEvidence({
    schema: SCHEMA,
    seed_row_refs: Array.from({ length: 6 }, (_, index) => ({ index })),
    stream_manifest_refs: Array.from({ length: 6 }, (_, index) => ({ index })),
  });
  assert.equal(schemaOnly.accepted, false);
  assert.equal(schemaOnly.reason, "retained_record_id_missing");
  assert.equal(schemaOnly.first_missing_field, FIRST_MISSING_FIELD);
});

test("provider object does not authorize retained branch or downstream evidence", () => {
  const artifact = buildCentralSolverRetainedHistoryProviderObject();

  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
  assert.equal(artifact.authorization.central_solver_retained_history_provider_object, false);
  assert.equal(artifact.authorization.retainedBranchClaim, false);
  assert.equal(artifact.authorization.accepted_transition_source, false);
  assert.equal(artifact.authorization.moving_retained_branch_certificate, false);
  assert.equal(artifact.authorization.same_ledger_action_measure_row, false);
  assert.equal(artifact.authorization.bounded_speed_live_ledger, false);
  assert.equal(artifact.authorization.receiver_normal_branch_strength, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
});
