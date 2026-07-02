import test from "node:test";
import assert from "node:assert/strict";

import {
  FIRST_MISSING_FIELD,
  NEGATIVE_CONTROL_REASONS,
  SCHEMA,
  buildCentralSolverRetainedSourceAdapterAcceptanceCertificate,
  evaluateCentralSolverRetainedSourceAdapterAcceptanceCertificateEvidence,
  validateCentralSolverRetainedSourceAdapterAcceptanceCertificate,
} from "../scripts/braid-ideal/central-solver-retained-source-adapter-acceptance-certificate.mjs";

const RETAINED_RECORD_ID = "retained-record:held-release-six-point:adapter-acceptance-certificate";
const SOURCE_ROW_ID = "two-speed-preferred-row:u0.8:v0.2";

function makeAcceptedEvidence({ retainedRecordId = RETAINED_RECORD_ID, sourceRowId = SOURCE_ROW_ID } = {}) {
  return {
    accepted_same_record_retained_source_adapter_evidence: true,
    retained_record_id: retainedRecordId,
    source_row_id: sourceRowId,
    held_release_seed_path_rows_acceptance_certificate_ref: `accepted:seed-path-rows:${retainedRecordId}`,
    held_release_path_history_stream_manifest_set_acceptance_certificate_ref:
      `accepted:path-history-stream-manifest-set:${retainedRecordId}`,
    central_solver_retained_history_row_acceptance_certificate_ref:
      `accepted:central-retained-history-row:${retainedRecordId}`,
    central_solver_retained_history_provider_object_acceptance_certificate_ref:
      `accepted:central-retained-history-provider-object:${retainedRecordId}`,
    native_app_path_history_stream_manifest_set_ref: `accepted:native-app:path-history:${retainedRecordId}`,
    native_root_ledger_detail_rows_ref: `accepted:native-root-ledger-detail:${retainedRecordId}:${sourceRowId}`,
    causal_root_replay_rows_ref: `accepted:causal-root-replay:${retainedRecordId}:${sourceRowId}`,
    same_record_action_closure_ref: `accepted:same-record-action-closure:${retainedRecordId}:${sourceRowId}`,
    retained_wake_history_ref: `accepted:retained-wake-history:${retainedRecordId}:${sourceRowId}`,
    provider_provenance_ref: `accepted:provider-provenance:${retainedRecordId}:${sourceRowId}`,
  };
}

function makeExternalVerification({ certificateArtifact }) {
  return {
    external_accepted_authority_ref: "external-authority:central-retained-source-adapter-review",
    external_accepted_authority_verification_ref:
      "external-verification:central-retained-source-adapter-review:adapter-acceptance-certificate",
    verified_adapter_acceptance_certificate_ref: certificateArtifact.adapter_acceptance_certificate_ref,
    verified_adapter_artifact_hash:
      certificateArtifact.central_solver_retained_source_adapter.consumed_artifact_hash,
    retained_record_id: certificateArtifact.retained_record_id,
    source_row_id: certificateArtifact.source_row_id,
  };
}

test("central retained-source adapter acceptance certificate is deterministic and starts source-acquisition blocked", () => {
  const first = buildCentralSolverRetainedSourceAdapterAcceptanceCertificate();
  const second = buildCentralSolverRetainedSourceAdapterAcceptanceCertificate();

  assert.deepEqual(first, second);
  assert.equal(first.schema, SCHEMA);
  assert.equal(first.artifact_status, "adapter_acceptance_certificate_source_acquisition_blocked");
  assert.equal(first.source_status, "source_acquisition_blocked");
  assert.equal(first.adapter_acceptance_certificate_ref, null);
  assert.equal(first.accepted_retained_source_adapter_ref, null);
  assert.equal(first.same_record_accepted_evidence_criterion.criterion_passed, false);
  assert.equal(first.external_authority_verification.external_verification_conditionally_satisfied, false);
  assert.equal(first.authorization.scoreMovement, "no_score_increase");
  assert.deepEqual(validateCentralSolverRetainedSourceAdapterAcceptanceCertificate(first), []);
});

test("central retained-source adapter acceptance certificate requires accepted same-record evidence", () => {
  const artifact = buildCentralSolverRetainedSourceAdapterAcceptanceCertificate({
    retainedRecordId: RETAINED_RECORD_ID,
    sourceRowId: SOURCE_ROW_ID,
  });

  assert.equal(artifact.provider_source_carrier.artifact_status, "retained_history_provider_source_carrier_present_acceptance_blocked");
  assert.equal(artifact.central_solver_retained_source_adapter.artifact_status, "retained_source_adapter_present_acceptance_blocked");
  assert.equal(artifact.same_record_accepted_evidence_criterion.criterion_passed, false);
  assert.equal(
    artifact.same_record_accepted_evidence_criterion.missing_fields.includes(
      "central_solver_retained_source_adapter.accepted_evidence.accepted_same_record_retained_source_adapter_evidence"
    ),
    true
  );
  assert.equal(artifact.adapter_acceptance_certificate_ref, null);
  assert.deepEqual(validateCentralSolverRetainedSourceAdapterAcceptanceCertificate(artifact), []);
});

test("central retained-source adapter acceptance certificate emits candidate cert when same-record evidence is complete", () => {
  const artifact = buildCentralSolverRetainedSourceAdapterAcceptanceCertificate({
    retainedRecordId: RETAINED_RECORD_ID,
    sourceRowId: SOURCE_ROW_ID,
    sameRecordAcceptedEvidence: makeAcceptedEvidence(),
  });

  assert.equal(artifact.artifact_status, "adapter_acceptance_certificate_present_external_verification_blocked");
  assert.equal(artifact.source_status, "candidate_adapter_acceptance_certificate_unaccepted");
  assert.equal(artifact.same_record_accepted_evidence_criterion.criterion_passed, true);
  assert.match(
    artifact.adapter_acceptance_certificate_ref,
    /^candidate:central_solver_retained_source_adapter_acceptance_certificate:[0-9a-f]{16}$/
  );
  assert.equal(
    artifact.same_record_accepted_evidence_criterion.status,
    "adapter_acceptance_certificate_conditionally_satisfied_by_same_record_evidence"
  );
  assert.equal(
    artifact.first_missing_field,
    "central_solver_retained_source_adapter.external_accepted_authority_verification_ref"
  );
  assert.deepEqual(evaluateCentralSolverRetainedSourceAdapterAcceptanceCertificateEvidence(artifact), {
    accepted: false,
    reason: "external_accepted_authority_verification_missing",
    first_missing_field: "central_solver_retained_source_adapter.external_accepted_authority_verification_ref",
  });
  assert.equal(artifact.authorization.central_solver_retained_source_adapter_acceptance_certificate, false);
  assert.equal(artifact.authorization.retained_branch_claim, false);
  assert.deepEqual(validateCentralSolverRetainedSourceAdapterAcceptanceCertificate(artifact), []);
});

test("central retained-source adapter acceptance certificate records declared external verification without repo authorization", () => {
  const certificateArtifact = buildCentralSolverRetainedSourceAdapterAcceptanceCertificate({
    retainedRecordId: RETAINED_RECORD_ID,
    sourceRowId: SOURCE_ROW_ID,
    sameRecordAcceptedEvidence: makeAcceptedEvidence(),
  });
  const artifact = buildCentralSolverRetainedSourceAdapterAcceptanceCertificate({
    retainedRecordId: RETAINED_RECORD_ID,
    sourceRowId: SOURCE_ROW_ID,
    sameRecordAcceptedEvidence: makeAcceptedEvidence(),
    externalAcceptedAuthorityVerification: makeExternalVerification({ certificateArtifact }),
  });

  assert.equal(
    artifact.artifact_status,
    "adapter_acceptance_certificate_externally_verified_but_repo_authorization_blocked"
  );
  assert.equal(artifact.same_record_accepted_evidence_criterion.criterion_passed, true);
  assert.equal(artifact.external_authority_verification.external_verification_conditionally_satisfied, true);
  assert.equal(
    artifact.external_authority_verification.status,
    "adapter_acceptance_certificate_conditionally_verified_by_declared_external_authority"
  );
  assert.equal(
    artifact.first_missing_field,
    "central_solver_retained_source_adapter.accepted_retained_source_adapter_ref"
  );
  assert.deepEqual(evaluateCentralSolverRetainedSourceAdapterAcceptanceCertificateEvidence(artifact), {
    accepted: false,
    reason: "repo_artifact_does_not_authorize_accepted_retained_source_adapter",
    first_missing_field: "central_solver_retained_source_adapter.accepted_retained_source_adapter_ref",
  });
  assert.equal(artifact.accepted_retained_source_adapter_ref, null);
  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
  assert.deepEqual(validateCentralSolverRetainedSourceAdapterAcceptanceCertificate(artifact), []);
});

test("central retained-source adapter acceptance certificate rejects cross-record accepted evidence", () => {
  const artifact = buildCentralSolverRetainedSourceAdapterAcceptanceCertificate({
    retainedRecordId: RETAINED_RECORD_ID,
    sourceRowId: SOURCE_ROW_ID,
    sameRecordAcceptedEvidence: makeAcceptedEvidence({
      retainedRecordId: "retained-record:wrong",
      sourceRowId: SOURCE_ROW_ID,
    }),
  });

  assert.equal(artifact.same_record_accepted_evidence_criterion.criterion_passed, false);
  assert.equal(
    artifact.same_record_accepted_evidence_criterion.same_record_binding.retained_record_id.binding_passed,
    false
  );
  assert.equal(
    artifact.same_record_accepted_evidence_criterion.missing_fields.includes(
      "central_solver_retained_source_adapter.accepted_evidence.retained_record_id"
    ),
    true
  );
  assert.equal(artifact.adapter_acceptance_certificate_ref, null);
  assert.deepEqual(validateCentralSolverRetainedSourceAdapterAcceptanceCertificate(artifact), []);
});

test("central retained-source adapter acceptance certificate rejects generic metadata and non-evidence classes", () => {
  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    assert.deepEqual(
      evaluateCentralSolverRetainedSourceAdapterAcceptanceCertificateEvidence({ evidence_class: evidenceClass }),
      {
        accepted: false,
        reason,
        first_missing_field: FIRST_MISSING_FIELD,
      }
    );
  }

  assert.deepEqual(evaluateCentralSolverRetainedSourceAdapterAcceptanceCertificateEvidence({ schema: "fixture.v0" }), {
    accepted: false,
    reason: "schema_not_central_solver_retained_source_adapter_acceptance_certificate_v0",
    first_missing_field: FIRST_MISSING_FIELD,
  });
});
