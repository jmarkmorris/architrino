import assert from "node:assert/strict";
import test from "node:test";

import { buildHeldReleaseSeedPathRows } from "../scripts/braid-ideal/held-release-seed-path-rows.mjs";
import {
  FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT,
  NEGATIVE_CONTROL_REASONS,
  buildHeldReleasePathHistoryStreamManifestSet,
  evaluateHeldReleasePathHistoryStreamManifestSetEvidence,
  validateHeldReleasePathHistoryStreamManifestSet,
} from "../scripts/braid-ideal/held-release-path-history-stream-manifest-set.mjs";

test("held-release path-history stream manifest set is deterministic and fails closed at retained record binding", () => {
  const first = buildHeldReleasePathHistoryStreamManifestSet();
  const second = buildHeldReleasePathHistoryStreamManifestSet();

  assert.deepEqual(first, second);
  assert.equal(first.schema, "held_release_path_history_stream_manifest_set.v0");
  assert.equal(first.artifact_status, "fail_closed_missing_retained_record_id");
  assert.equal(first.source_status, "source_acquisition_blocked");
  assert.equal(first.first_missing_object, FIRST_MISSING_OBJECT);
  assert.equal(first.first_missing_field, FIRST_MISSING_FIELD);
  assert.equal(first.stream_manifest_rows.length, 6);
  assert.equal(first.artifact_hash.length, 64);
  assert.equal(first.artifact_id.startsWith("held_release_path_history_stream_manifest_set:"), true);
  assert.deepEqual(validateHeldReleasePathHistoryStreamManifestSet(first), []);
});

test("manifest rows inherit same-run identity and bind to seed-row hashes", () => {
  const seedArtifact = buildHeldReleaseSeedPathRows();
  const artifact = buildHeldReleasePathHistoryStreamManifestSet({ seedArtifact });
  const runIds = new Set();
  const sourceSeedRowIds = new Set();

  assert.equal(artifact.source_seed_path_rows.consumed_artifact_hash, seedArtifact.artifact_hash);
  assert.equal(artifact.same_run_identity.source_run_id, seedArtifact.source_run_identity.source_run_id);

  artifact.stream_manifest_rows.forEach((row, index) => {
    const seedRow = seedArtifact.rows[index];
    runIds.add(row.same_run_identity.source_run_id);
    sourceSeedRowIds.add(row.source_seed_row_binding.source_seed_row_id);

    assert.equal(row.schema, "held_release_path_history_stream_manifest.v0");
    assert.equal(row.accepted, false);
    assert.equal(row.held_release_seed_id, seedArtifact.seed_id);
    assert.equal(row.source_seed_row_binding.source_seed_row_id, seedRow.row_id);
    assert.equal(row.source_seed_row_binding.source_seed_row_artifact_hash, seedRow.artifact_hash);
    assert.equal(row.source_seed_row_binding.path_key, seedRow.solver_path_history_row_f64.pathKey);
    assert.equal(row.source_seed_row_binding.segment_index, seedRow.solver_path_history_row_f64.segmentIndex);
    assert.equal(row.stream_identity.stream_id.includes("path-history-stream"), true);
    assert.equal(row.stream_identity.stream_manifest_ref, row.stream_identity.local_stream_manifest_ref);
    assert.equal(row.stream_identity.durable_manifest_ref, null);
    assert.equal(row.path_segment_stream.required_layout, "path_segment.v1");
    assert.equal(row.path_segment_stream.row_count, 1);
    assert.equal(row.path_segment_stream.chunk_count, 1);
    assert.equal(row.path_segment_stream.stream_chunk_digest.length, 64);
    assert.equal(row.path_segment_stream.local_manifest_hash.length, 64);
    assert.equal(row.stream_manifest_object.schema, "solver-native-file-stream-manifest.v1");
    assert.equal(row.stream_manifest_object.stream.schema, "solver-path-history-stream.v1");
    assert.equal(row.stream_manifest_object.stream.layout, "path_segment.v1");
    assert.equal(row.stream_manifest_object.stream.rowCount, 1);
    assert.equal(row.stream_manifest_object.chunks[0].chunkDigest, row.path_segment_stream.stream_chunk_digest);
    assert.equal(row.retained_record_binding.retained_record_id, null);
    assert.equal(row.provider_provenance.provider_object_ref, null);
    assert.equal(row.first_missing_field, FIRST_MISSING_FIELD);
  });

  assert.equal(runIds.size, 1);
  assert.equal(sourceSeedRowIds.size, 6);
});

test("retained record presence sharpens the manifest blocker to provider provenance", () => {
  const seedArtifact = buildHeldReleaseSeedPathRows({
    retainedRecordId: "retained-record:held-release-six-point:demo",
  });
  const artifact = buildHeldReleasePathHistoryStreamManifestSet({ seedArtifact });

  assert.equal(artifact.artifact_status, "fail_closed_missing_provider_provenance");
  assert.equal(artifact.first_missing_object, "held_release_path_history_stream_manifest_set_provider_object");
  assert.equal(
    artifact.first_missing_field,
    "held_release_path_history_stream_manifest_set[*].provider_provenance.provider_object_ref"
  );
  assert.equal(
    artifact.stream_manifest_rows.every(
      (row) =>
        row.retained_record_binding.retained_record_id === "retained-record:held-release-six-point:demo" &&
        row.retained_record_binding.status === "retained_record_id_present_unaccepted" &&
        row.provider_provenance.provider_object_ref === null &&
        row.durable_stream_binding.durable_manifest_ref === null
    ),
    true
  );
  assert.equal(artifact.authorization.retained_branch_claim, false);
  assert.equal(artifact.authorization.accepted_transition_source, false);
  assert.equal(artifact.authorization.moving_retained_branch_certificate, false);
  assert.equal(artifact.authorization.same_ledger_action_measure_row, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
});

test("path-history stream manifests can carry provider backing and durable refs without authorizing evidence", () => {
  const durableManifestRefs = Array.from(
    { length: 6 },
    (_, index) => `durable:braid-ideal:test:path-history-stream:${index}`
  );
  const seedArtifact = buildHeldReleaseSeedPathRows({
    retainedRecordId: "retained-record:held-release-six-point:provider-backed",
    providerObjectRef: "candidate:central_solver_retained_history_provider_object:test",
    providerArtifactHash: "provider-hash-test",
  });
  const artifact = buildHeldReleasePathHistoryStreamManifestSet({
    seedArtifact,
    providerObjectRef: "candidate:central_solver_retained_history_provider_object:test",
    providerArtifactHash: "provider-hash-test",
    durableManifestRefs,
  });

  assert.equal(artifact.artifact_status, "provider_backed_stream_manifest_set_present_acceptance_blocked");
  assert.equal(artifact.source_status, "candidate_provider_backed_source_unaccepted");
  assert.equal(
    artifact.first_missing_object,
    "held_release_path_history_stream_manifest_set_acceptance_certificate"
  );
  assert.equal(
    artifact.first_missing_field,
    "held_release_path_history_stream_manifest_set.acceptance_certificate_ref"
  );
  assert.equal(artifact.durable_stream_requirement.durable_stream_count, 6);
  assert.deepEqual(artifact.durable_stream_requirement.durable_manifest_refs, durableManifestRefs);
  assert.equal(
    artifact.stream_manifest_rows.every(
      (row, index) =>
        row.provider_provenance.provider_object_ref ===
          "candidate:central_solver_retained_history_provider_object:test" &&
        row.durable_stream_binding.durable_manifest_ref === durableManifestRefs[index] &&
        row.stream_identity.durable_manifest_ref === durableManifestRefs[index]
    ),
    true
  );
  assert.deepEqual(evaluateHeldReleasePathHistoryStreamManifestSetEvidence(artifact), {
    accepted: false,
    reason: "producer_does_not_authorize_accepted_stream_manifest_evidence",
    first_missing_field: "held_release_path_history_stream_manifest_set.acceptance_certificate_ref",
  });
  assert.equal(artifact.authorization.held_release_path_history_stream_manifest_set, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
  assert.deepEqual(validateHeldReleasePathHistoryStreamManifestSet(artifact), []);
});

test("generic stream metadata without same-record binding is rejected", () => {
  assert.deepEqual(
    evaluateHeldReleasePathHistoryStreamManifestSetEvidence({
      evidence_class: "generic_stream_metadata_without_same_record_binding",
    }),
    {
      accepted: false,
      reason: NEGATIVE_CONTROL_REASONS.generic_stream_metadata_without_same_record_binding,
      first_missing_field: FIRST_MISSING_FIELD,
    }
  );

  const generic = {
    schema: "held_release_path_history_stream_manifest_set.v0",
    stream_manifest_rows: Array.from({ length: 6 }, (_, index) => ({
      stream_manifest_object: {
        schema: "solver-native-file-stream-manifest.v1",
        stream: { layout: "path_segment.v1", rowCount: 1 },
      },
      source_seed_row_binding: { source_seed_row_id: `row:${index}` },
      retained_record_binding: { retained_record_id: null },
      provider_provenance: { provider_object_ref: null },
      durable_stream_binding: { durable_manifest_ref: null },
    })),
  };

  assert.deepEqual(evaluateHeldReleasePathHistoryStreamManifestSetEvidence(generic), {
    accepted: false,
    reason: "retained_record_id_missing",
    first_missing_field: FIRST_MISSING_FIELD,
  });
});

test("manifest-set guard rejects non-evidence classes and never authorizes downstream claims", () => {
  const artifact = buildHeldReleasePathHistoryStreamManifestSet();

  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
  assert.equal(artifact.authorization.held_release_path_history_stream_manifest_set, false);
  assert.equal(artifact.authorization.central_solver_retained_history_provider_object, false);
  assert.equal(artifact.authorization.retained_branch_claim, false);
  assert.equal(artifact.authorization.accepted_transition_source, false);
  assert.equal(artifact.authorization.moving_retained_branch_certificate, false);
  assert.equal(artifact.authorization.same_ledger_action_measure_row, false);
  assert.equal(artifact.authorization.bounded_speed_live_ledger, false);
  assert.equal(artifact.authorization.receiver_normal_branch_strength, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");

  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    assert.deepEqual(
      evaluateHeldReleasePathHistoryStreamManifestSetEvidence({ evidence_class: evidenceClass }),
      {
        accepted: false,
        reason,
        first_missing_field: FIRST_MISSING_FIELD,
      }
    );
  }

  assert.deepEqual(
    evaluateHeldReleasePathHistoryStreamManifestSetEvidence({ schema: "held_release_seed_path_rows.v0" }),
    {
      accepted: false,
      reason: "schema_not_held_release_path_history_stream_manifest_set_v0",
      first_missing_field: FIRST_MISSING_FIELD,
    }
  );
});
