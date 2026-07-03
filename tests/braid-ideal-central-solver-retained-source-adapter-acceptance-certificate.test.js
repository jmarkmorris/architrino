import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_SCHEMA,
  FIRST_MISSING_FIELD,
  NEGATIVE_CONTROL_REASONS,
  REQUIRED_ACCEPTED_EVIDENCE_PACKAGE_PROVENANCE_FIELDS,
  SCHEMA,
  SAME_RECORD_ACCEPTED_EVIDENCE_CONTRACT_SCHEMA,
  SAME_RECORD_ACCEPTED_EVIDENCE_PACKAGE_SCHEMA,
  SAME_RECORD_ACCEPTED_EVIDENCE_REQUIREMENT_SCHEMA,
  buildSameRecordAcceptedEvidencePackageContract,
  buildCentralSolverRetainedSourceAdapterAcceptanceCertificate,
  evaluateCentralSolverRetainedSourceAdapterAcceptanceCertificateEvidence,
  validateCentralSolverRetainedSourceAdapterAcceptanceCertificate,
} from "../scripts/braid-ideal/central-solver-retained-source-adapter-acceptance-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/braid-ideal/central-solver-retained-source-adapter-acceptance-certificate.mjs", import.meta.url)
);
const RETAINED_RECORD_ID = "retained-record:held-release-six-point:adapter-acceptance-certificate";
const SOURCE_ROW_ID = "two-speed-preferred-row:u0.8:v0.2";
const SAME_RECORD_ACCEPTED_EVIDENCE_PACKAGE_HASH =
  "sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
const EXPECTED_ACCEPTED_EVIDENCE_PACKAGE_REF_PREFIXES = Object.freeze({
  same_record_accepted_evidence_package_ref:
    `accepted:same-record-evidence-package:retained-source-adapter:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}:`,
  same_record_accepted_evidence_package_authority_ref:
    `accepted:same-record-evidence-package-authority:retained-source-adapter:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}:`,
  same_record_accepted_evidence_package_verification_ref:
    `accepted:same-record-evidence-package-verification:retained-source-adapter:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}:`,
});
const EXPECTED_ACCEPTED_EVIDENCE_FIELD_REF_PREFIXES = Object.freeze({
  held_release_seed_path_rows_acceptance_certificate_ref:
    `accepted:held-release-seed-path-rows:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}:`,
  held_release_path_history_stream_manifest_set_acceptance_certificate_ref:
    `accepted:path-history-stream-manifest-set:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}:`,
  central_solver_retained_history_row_acceptance_certificate_ref:
    `accepted:central-retained-history-row:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}:`,
  central_solver_retained_history_provider_object_acceptance_certificate_ref:
    `accepted:central-retained-history-provider-object:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}:`,
  native_app_path_history_stream_manifest_set_ref:
    `accepted:native-app:path-history:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}:`,
  native_root_ledger_detail_rows_ref:
    `accepted:native-root-ledger-detail:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}:`,
  causal_root_replay_rows_ref:
    `accepted:causal-root-replay:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}:`,
  same_record_action_closure_ref:
    `accepted:same-record-action-closure:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}:`,
  retained_wake_history_ref:
    `accepted:retained-wake-history:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}:`,
  provider_provenance_ref:
    `accepted:provider-provenance:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}:`,
});

function makeAcceptedEvidence({ retainedRecordId = RETAINED_RECORD_ID, sourceRowId = SOURCE_ROW_ID } = {}) {
  return {
    schema: SAME_RECORD_ACCEPTED_EVIDENCE_PACKAGE_SCHEMA,
    same_record_accepted_evidence_package_ref:
      `accepted:same-record-evidence-package:retained-source-adapter:${retainedRecordId}:${sourceRowId}:package`,
    same_record_accepted_evidence_package_authority_ref:
      `accepted:same-record-evidence-package-authority:retained-source-adapter:${retainedRecordId}:${sourceRowId}:authority`,
    same_record_accepted_evidence_package_verification_ref:
      `accepted:same-record-evidence-package-verification:retained-source-adapter:${retainedRecordId}:${sourceRowId}:verification`,
    same_record_accepted_evidence_package_artifact_hash: SAME_RECORD_ACCEPTED_EVIDENCE_PACKAGE_HASH,
    accepted_same_record_retained_source_adapter_evidence: true,
    retained_record_id: retainedRecordId,
    source_row_id: sourceRowId,
    held_release_seed_path_rows_acceptance_certificate_ref:
      `accepted:held-release-seed-path-rows:${retainedRecordId}:${sourceRowId}:certificate`,
    held_release_path_history_stream_manifest_set_acceptance_certificate_ref:
      `accepted:path-history-stream-manifest-set:${retainedRecordId}:${sourceRowId}:certificate`,
    central_solver_retained_history_row_acceptance_certificate_ref:
      `accepted:central-retained-history-row:${retainedRecordId}:${sourceRowId}:certificate`,
    central_solver_retained_history_provider_object_acceptance_certificate_ref:
      `accepted:central-retained-history-provider-object:${retainedRecordId}:${sourceRowId}:certificate`,
    native_app_path_history_stream_manifest_set_ref:
      `accepted:native-app:path-history:${retainedRecordId}:${sourceRowId}:manifest-set`,
    native_root_ledger_detail_rows_ref:
      `accepted:native-root-ledger-detail:${retainedRecordId}:${sourceRowId}:rows`,
    causal_root_replay_rows_ref: `accepted:causal-root-replay:${retainedRecordId}:${sourceRowId}:rows`,
    same_record_action_closure_ref:
      `accepted:same-record-action-closure:${retainedRecordId}:${sourceRowId}:closure`,
    retained_wake_history_ref: `accepted:retained-wake-history:${retainedRecordId}:${sourceRowId}:history`,
    provider_provenance_ref: `accepted:provider-provenance:${retainedRecordId}:${sourceRowId}:provenance`,
  };
}

function makeStaleSeedPathAcceptedEvidence(options = {}) {
  return {
    ...makeAcceptedEvidence(options),
    held_release_seed_path_rows_acceptance_certificate_ref:
      `accepted:seed-path-rows:${options.retainedRecordId ?? RETAINED_RECORD_ID}`,
  };
}

function makeAcceptedEvidenceWithoutPackageProvenance(options = {}) {
  const evidence = makeAcceptedEvidence(options);
  for (const field of REQUIRED_ACCEPTED_EVIDENCE_PACKAGE_PROVENANCE_FIELDS) {
    delete evidence[field];
  }
  return evidence;
}

function makeExternalVerification({ certificateArtifact }) {
  return {
    external_accepted_authority_package_ref:
      "external-authority-package:central-retained-source-adapter-review:adapter-acceptance-certificate",
    external_accepted_authority_ref: "external-authority:central-retained-source-adapter-review",
    external_accepted_authority_verification_ref:
      "external-verification:central-retained-source-adapter-review:adapter-acceptance-certificate",
    verified_adapter_acceptance_certificate_ref: certificateArtifact.adapter_acceptance_certificate_ref,
    verified_adapter_artifact_hash:
      certificateArtifact.central_solver_retained_source_adapter.consumed_artifact_hash,
    retained_record_id: certificateArtifact.retained_record_id,
    source_row_id: certificateArtifact.source_row_id,
    external_accepted_authority_package: {
      schema: EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_SCHEMA,
      accepted_external_authority: true,
      non_repo_external_authority: true,
      external_accepted_authority_ref: "external-authority:central-retained-source-adapter-review",
      external_accepted_authority_verification_ref:
        "external-verification:central-retained-source-adapter-review:adapter-acceptance-certificate",
      verified_adapter_acceptance_certificate_ref: certificateArtifact.adapter_acceptance_certificate_ref,
      verified_adapter_artifact_hash:
        certificateArtifact.central_solver_retained_source_adapter.consumed_artifact_hash,
      retained_record_id: certificateArtifact.retained_record_id,
      source_row_id: certificateArtifact.source_row_id,
    },
  };
}

function seedPathField(contract) {
  return contract.source_acquisition_field_map.find(
    (row) => row.package_field === "held_release_seed_path_rows_acceptance_certificate_ref"
  );
}

function makeSeedPathCertificateFromRequirement(requirement) {
  return {
    ...requirement.acceptance_certificate_verification.expected_certificate_payload,
    held_release_seed_path_rows_acceptance_certificate_ref:
      `${requirement.required_certificate_ref_prefix}certificate`,
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

test("central retained-source adapter acceptance certificate rejects stale seed-path accepted refs", () => {
  const artifact = buildCentralSolverRetainedSourceAdapterAcceptanceCertificate({
    retainedRecordId: RETAINED_RECORD_ID,
    sourceRowId: SOURCE_ROW_ID,
    sameRecordAcceptedEvidence: makeStaleSeedPathAcceptedEvidence(),
  });

  assert.equal(artifact.same_record_accepted_evidence_criterion.criterion_passed, false);
  assert.equal(
    artifact.same_record_accepted_evidence_criterion.missing_fields.includes(
      "central_solver_retained_source_adapter.accepted_evidence.held_release_seed_path_rows_acceptance_certificate_ref"
    ),
    true
  );
  assert.equal(
    artifact.same_record_accepted_evidence_criterion.required_accepted_evidence_field_ref_prefixes
      .held_release_seed_path_rows_acceptance_certificate_ref,
    `accepted:held-release-seed-path-rows:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}:`
  );
  assert.equal(
    artifact.same_record_accepted_evidence_criterion.supplied_accepted_evidence_refs
      .held_release_seed_path_rows_acceptance_certificate_ref,
    `accepted:seed-path-rows:${RETAINED_RECORD_ID}`
  );
  assert.equal(artifact.adapter_acceptance_certificate_ref, null);
  assert.deepEqual(validateCentralSolverRetainedSourceAdapterAcceptanceCertificate(artifact), []);
});

test("central retained-source adapter acceptance certificate rejects wrong-family package provenance refs", () => {
  for (const [field, requiredPrefix] of Object.entries(EXPECTED_ACCEPTED_EVIDENCE_PACKAGE_REF_PREFIXES)) {
    const sameRecordAcceptedEvidence = makeAcceptedEvidence();
    sameRecordAcceptedEvidence[field] = `accepted:wrong-family:${field}`;
    const artifact = buildCentralSolverRetainedSourceAdapterAcceptanceCertificate({
      retainedRecordId: RETAINED_RECORD_ID,
      sourceRowId: SOURCE_ROW_ID,
      sameRecordAcceptedEvidence,
    });

    assert.equal(artifact.same_record_accepted_evidence_criterion.criterion_passed, false);
    assert.equal(
      artifact.same_record_accepted_evidence_criterion.missing_fields.includes(
        `central_solver_retained_source_adapter.accepted_evidence.${field}`
      ),
      true
    );
    assert.equal(
      artifact.same_record_accepted_evidence_criterion.required_accepted_evidence_package_ref_prefixes[field],
      requiredPrefix
    );
    assert.equal(artifact.adapter_acceptance_certificate_ref, null);
    assert.deepEqual(validateCentralSolverRetainedSourceAdapterAcceptanceCertificate(artifact), []);
  }
});

test("central retained-source adapter acceptance certificate rejects same-family stale package provenance refs", () => {
  for (const [field, requiredPrefix] of Object.entries(EXPECTED_ACCEPTED_EVIDENCE_PACKAGE_REF_PREFIXES)) {
    const sameRecordAcceptedEvidence = makeAcceptedEvidence();
    sameRecordAcceptedEvidence[field] = requiredPrefix.replace(
      `${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}:`,
      "retained-record:stale:stale-source:"
    ) + field;
    const artifact = buildCentralSolverRetainedSourceAdapterAcceptanceCertificate({
      retainedRecordId: RETAINED_RECORD_ID,
      sourceRowId: SOURCE_ROW_ID,
      sameRecordAcceptedEvidence,
    });

    assert.equal(artifact.same_record_accepted_evidence_criterion.criterion_passed, false);
    assert.equal(
      artifact.same_record_accepted_evidence_criterion.missing_fields.includes(
        `central_solver_retained_source_adapter.accepted_evidence.${field}`
      ),
      true
    );
    assert.equal(
      artifact.same_record_accepted_evidence_criterion.required_accepted_evidence_package_ref_prefixes[field],
      requiredPrefix
    );
    assert.equal(artifact.adapter_acceptance_certificate_ref, null);
    assert.deepEqual(validateCentralSolverRetainedSourceAdapterAcceptanceCertificate(artifact), []);
  }
});

test("central retained-source adapter acceptance certificate rejects wrong-family accepted evidence refs", () => {
  for (const [field, requiredPrefix] of Object.entries(EXPECTED_ACCEPTED_EVIDENCE_FIELD_REF_PREFIXES)) {
    const sameRecordAcceptedEvidence = makeAcceptedEvidence();
    sameRecordAcceptedEvidence[field] = `accepted:wrong-family:${field}`;
    const artifact = buildCentralSolverRetainedSourceAdapterAcceptanceCertificate({
      retainedRecordId: RETAINED_RECORD_ID,
      sourceRowId: SOURCE_ROW_ID,
      sameRecordAcceptedEvidence,
    });

    assert.equal(artifact.same_record_accepted_evidence_criterion.criterion_passed, false);
    assert.equal(
      artifact.same_record_accepted_evidence_criterion.missing_fields.includes(
        `central_solver_retained_source_adapter.accepted_evidence.${field}`
      ),
      true
    );
    assert.equal(
      artifact.same_record_accepted_evidence_criterion.required_accepted_evidence_field_ref_prefixes[field],
      requiredPrefix
    );
    assert.equal(
      artifact.same_record_accepted_evidence_criterion.supplied_accepted_evidence_refs[field],
      `accepted:wrong-family:${field}`
    );
    assert.equal(artifact.adapter_acceptance_certificate_ref, null);
    assert.deepEqual(validateCentralSolverRetainedSourceAdapterAcceptanceCertificate(artifact), []);
  }
});

test("central retained-source adapter acceptance certificate rejects same-family stale accepted evidence refs", () => {
  for (const [field, requiredPrefix] of Object.entries(EXPECTED_ACCEPTED_EVIDENCE_FIELD_REF_PREFIXES)) {
    const sameRecordAcceptedEvidence = makeAcceptedEvidence();
    sameRecordAcceptedEvidence[field] = requiredPrefix.replace(
      `${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}:`,
      "retained-record:stale:stale-source:"
    ) + field;
    const artifact = buildCentralSolverRetainedSourceAdapterAcceptanceCertificate({
      retainedRecordId: RETAINED_RECORD_ID,
      sourceRowId: SOURCE_ROW_ID,
      sameRecordAcceptedEvidence,
    });

    assert.equal(artifact.same_record_accepted_evidence_criterion.criterion_passed, false);
    assert.equal(
      artifact.same_record_accepted_evidence_criterion.missing_fields.includes(
        `central_solver_retained_source_adapter.accepted_evidence.${field}`
      ),
      true
    );
    assert.equal(
      artifact.same_record_accepted_evidence_criterion.required_accepted_evidence_field_ref_prefixes[field],
      requiredPrefix
    );
    assert.equal(
      artifact.same_record_accepted_evidence_criterion.supplied_accepted_evidence_refs[field],
      sameRecordAcceptedEvidence[field]
    );
    assert.equal(artifact.adapter_acceptance_certificate_ref, null);
    assert.deepEqual(validateCentralSolverRetainedSourceAdapterAcceptanceCertificate(artifact), []);
  }
});

test("central retained-source adapter acceptance certificate rejects accepted-looking refs without package provenance", () => {
  const artifact = buildCentralSolverRetainedSourceAdapterAcceptanceCertificate({
    retainedRecordId: RETAINED_RECORD_ID,
    sourceRowId: SOURCE_ROW_ID,
    sameRecordAcceptedEvidence: makeAcceptedEvidenceWithoutPackageProvenance(),
  });

  assert.equal(artifact.same_record_accepted_evidence_criterion.criterion_passed, false);
  assert.deepEqual(
    REQUIRED_ACCEPTED_EVIDENCE_PACKAGE_PROVENANCE_FIELDS.filter((field) =>
      artifact.same_record_accepted_evidence_criterion.missing_fields.includes(
        `central_solver_retained_source_adapter.accepted_evidence.${field}`
      )
    ),
    REQUIRED_ACCEPTED_EVIDENCE_PACKAGE_PROVENANCE_FIELDS
  );
  assert.equal(
    artifact.same_record_accepted_evidence_criterion.first_missing_field,
    "central_solver_retained_source_adapter.accepted_evidence.same_record_accepted_evidence_package_ref"
  );
  assert.equal(artifact.adapter_acceptance_certificate_ref, null);
  assert.deepEqual(validateCentralSolverRetainedSourceAdapterAcceptanceCertificate(artifact), []);
});

test("central retained-source adapter acceptance certificate rejects unaccepted package provenance shell", () => {
  const artifact = buildCentralSolverRetainedSourceAdapterAcceptanceCertificate({
    retainedRecordId: RETAINED_RECORD_ID,
    sourceRowId: SOURCE_ROW_ID,
    sameRecordAcceptedEvidence: {
      ...makeAcceptedEvidence(),
      same_record_accepted_evidence_package_ref:
        `accepted-evidence-package:retained-source-adapter:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}`,
      same_record_accepted_evidence_package_authority_ref:
        `accepted-evidence-package-authority:retained-source-adapter:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}`,
      same_record_accepted_evidence_package_verification_ref:
        `accepted-evidence-package-verification:retained-source-adapter:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}`,
      same_record_accepted_evidence_package_artifact_hash:
        `sha256:same-record-retained-source-adapter-evidence-package:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}`,
    },
  });

  assert.equal(artifact.same_record_accepted_evidence_criterion.criterion_passed, false);
  assert.deepEqual(
    [
      "same_record_accepted_evidence_package_ref",
      "same_record_accepted_evidence_package_authority_ref",
      "same_record_accepted_evidence_package_verification_ref",
      "same_record_accepted_evidence_package_artifact_hash",
    ].filter((field) =>
      artifact.same_record_accepted_evidence_criterion.missing_fields.includes(
        `central_solver_retained_source_adapter.accepted_evidence.${field}`
      )
    ),
    [
      "same_record_accepted_evidence_package_ref",
      "same_record_accepted_evidence_package_authority_ref",
      "same_record_accepted_evidence_package_verification_ref",
      "same_record_accepted_evidence_package_artifact_hash",
    ]
  );
  assert.equal(artifact.adapter_acceptance_certificate_ref, null);
  assert.deepEqual(validateCentralSolverRetainedSourceAdapterAcceptanceCertificate(artifact), []);
});

test("central retained-source adapter acceptance certificate rejects copied candidate source refs", () => {
  const candidateEvidence = {
    ...makeAcceptedEvidence(),
    native_root_ledger_detail_rows_ref: "candidate:native-root-ledger-detail:not-accepted",
  };
  const artifact = buildCentralSolverRetainedSourceAdapterAcceptanceCertificate({
    retainedRecordId: RETAINED_RECORD_ID,
    sourceRowId: SOURCE_ROW_ID,
    sameRecordAcceptedEvidence: candidateEvidence,
  });

  assert.equal(artifact.same_record_accepted_evidence_criterion.criterion_passed, false);
  assert.equal(
    artifact.same_record_accepted_evidence_criterion.missing_fields.includes(
      "central_solver_retained_source_adapter.accepted_evidence.native_root_ledger_detail_rows_ref"
    ),
    true
  );
  assert.equal(
    artifact.same_record_accepted_evidence_criterion.supplied_accepted_evidence_refs
      .native_root_ledger_detail_rows_ref,
    "candidate:native-root-ledger-detail:not-accepted"
  );
  assert.equal(artifact.adapter_acceptance_certificate_ref, null);
  assert.deepEqual(validateCentralSolverRetainedSourceAdapterAcceptanceCertificate(artifact), []);
});

test("central retained-source adapter accepted-evidence contract names the exact package fields", () => {
  const contract = buildSameRecordAcceptedEvidencePackageContract({
    retainedRecordId: RETAINED_RECORD_ID,
    sourceRowId: SOURCE_ROW_ID,
  });

  assert.equal(contract.schema, SAME_RECORD_ACCEPTED_EVIDENCE_CONTRACT_SCHEMA);
  assert.equal(contract.accepted, false);
  assert.equal(contract.source_status, "source_acquisition_contract");
  assert.equal(contract.required_package_schema, SAME_RECORD_ACCEPTED_EVIDENCE_PACKAGE_SCHEMA);
  assert.deepEqual(
    contract.required_accepted_evidence_package_provenance_fields,
    REQUIRED_ACCEPTED_EVIDENCE_PACKAGE_PROVENANCE_FIELDS
  );
  assert.deepEqual(
    REQUIRED_ACCEPTED_EVIDENCE_PACKAGE_PROVENANCE_FIELDS.map((field) => contract.package_template[field]),
    REQUIRED_ACCEPTED_EVIDENCE_PACKAGE_PROVENANCE_FIELDS.map(() => null)
  );
  assert.equal(contract.package_template.accepted_same_record_retained_source_adapter_evidence, true);
  assert.equal(contract.package_template.retained_record_id, RETAINED_RECORD_ID);
  assert.equal(contract.package_template.source_row_id, SOURCE_ROW_ID);
  assert.equal(contract.source_acquisition_summary.required_package_field_count, 10);
  assert.equal(contract.source_acquisition_summary.observed_source_field_count, 10);
  assert.equal(contract.source_acquisition_summary.accepted_for_package_field_count, 0);
  assert.equal(contract.source_acquisition_summary.candidate_or_unverified_field_count, 10);
  assert.equal(contract.source_acquisition_field_map.length, 10);
  const seedPathField = contract.source_acquisition_field_map.find(
    (row) => row.package_field === "held_release_seed_path_rows_acceptance_certificate_ref"
  );
  assert.equal(
    seedPathField?.source_requirement?.schema,
    "held_release_seed_path_rows_acceptance_certificate_requirement.v0"
  );
  assert.equal(seedPathField?.source_requirement?.source_row_id, SOURCE_ROW_ID);
  assert.equal(seedPathField?.source_requirement?.requirement_passed, false);
  assert.equal(
    seedPathField?.source_requirement?.first_missing_object,
    "held_release_seed_path_rows_acceptance_certificate"
  );
  assert.equal(
    seedPathField?.source_requirement?.first_missing_field,
    "held_release_seed_path_rows.acceptance_certificate_ref"
  );
  assert.equal(
    seedPathField?.source_requirement?.required_repo_authorization_object,
    "repo_authorization_for_accepted_held_release_seed_path_rows"
  );
  assert.equal(
    seedPathField?.source_requirement?.required_repo_authorization_field,
    "held_release_seed_path_rows.acceptance_certificate_ref"
  );
  assert.equal(
    seedPathField?.source_requirement?.repo_authorization_status,
    "pending_seed_path_certificate_and_external_authority_package"
  );
  assert.equal(
    seedPathField?.source_requirement?.required_external_authority_package_schema,
    "held_release_seed_path_rows_external_accepted_authority_package.v0"
  );
  assert.equal(
    seedPathField?.source_requirement?.required_external_authority_ref,
    `external-authority:held-release-seed-path-rows:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}`
  );
  assert.equal(
    seedPathField?.source_requirement?.required_external_authority_verification_ref,
    `external-verification:held-release-seed-path-rows:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}`
  );
  assert.equal(
    seedPathField?.source_requirement?.required_external_authority_package_ref,
    `external-authority-package:held-release-seed-path-rows:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}`
  );
  assert.deepEqual(seedPathField?.source_artifact, {
    consumed_schema: "held_release_seed_path_rows.v0",
    consumed_artifact_id: "held_release_seed_path_rows:5833f18e53586201",
    consumed_artifact_hash: "5833f18e53586201775fdcd490efcc1e649841e5268a15eea022cad9ff706063",
    source_status: "candidate_provider_backed_source_unaccepted",
    first_missing_object: "held_release_seed_path_rows_acceptance_certificate",
    first_missing_field: "held_release_seed_path_rows.acceptance_certificate_ref",
  });
  assert.deepEqual(
    contract.source_acquisition_field_map.find(
      (row) =>
        row.package_field ===
        "held_release_path_history_stream_manifest_set_acceptance_certificate_ref"
    )?.source_artifact,
    {
      consumed_schema: "held_release_path_history_stream_manifest_set.v0",
      consumed_artifact_id: "held_release_path_history_stream_manifest_set:49297bfc0206431a",
      consumed_artifact_hash: "49297bfc0206431a62d40d6756d5a2f81dda3d3c0026066eba2315160bbc7060",
      source_status: "candidate_provider_backed_source_unaccepted",
      first_missing_object: "held_release_path_history_stream_manifest_set_acceptance_certificate",
      first_missing_field: "held_release_path_history_stream_manifest_set.acceptance_certificate_ref",
    }
  );
  assert.deepEqual(
    contract.source_acquisition_field_map.find(
      (row) => row.package_field === "central_solver_retained_history_row_acceptance_certificate_ref"
    )?.source_artifact,
    {
      consumed_schema: "central_solver_retained_history_row.v0",
      consumed_artifact_id: "central_solver_retained_history_row:5cea06554a38513a",
      consumed_artifact_hash: "5cea06554a38513a6c7311a8c85c9ebdf0852b557437cbc12482e4a7f6f6a1fd",
      source_status: "candidate_provider_backed_source_unaccepted",
      first_missing_object: "central_solver_retained_history_row_acceptance_certificate",
      first_missing_field: "central_solver_retained_history_row.acceptance_certificate_ref",
    }
  );
  assert.deepEqual(
    contract.source_acquisition_field_map.find(
      (row) =>
        row.package_field ===
        "central_solver_retained_history_provider_object_acceptance_certificate_ref"
    )?.source_artifact,
    {
      consumed_schema: "central_solver_retained_history_provider_object.v0",
      consumed_artifact_id: "central_solver_retained_history_provider_object:7d4a8fe0a9792327",
      consumed_artifact_hash: "7d4a8fe0a97923270179f2ca0b49b4bc0d6b6ba3251b26e82569bdb4bd1f91df",
      source_status: "candidate_provider_backed_source_unaccepted",
      first_missing_object: "central_solver_retained_history_provider_object_acceptance_certificate",
      first_missing_field: "central_solver_retained_history_provider_object.acceptance_certificate_ref",
    }
  );
  assert.deepEqual(
    contract.source_acquisition_field_map.map((row) => row.package_field),
    contract.required_accepted_evidence_fields
  );
  assert.equal(
    contract.source_acquisition_field_map.find(
      (row) => row.package_field === "native_root_ledger_detail_rows_ref"
    )?.observed_ref_count,
    36
  );
  assert.equal(
    contract.source_acquisition_field_map.find(
      (row) => row.package_field === "native_root_ledger_detail_rows_ref"
    )?.observed_ref_class,
    "candidate_ref_not_accepted"
  );
  assert.equal(contract.source_acquisition_field_map.every((row) => row.accepted_for_package === false), true);
  assert.equal(
    contract.first_missing_field,
    "central_solver_retained_source_adapter.accepted_evidence.accepted_same_record_retained_source_adapter_evidence"
  );
  assert.equal(
    contract.next_after_package.field,
    "central_solver_retained_source_adapter.external_accepted_authority_verification_ref"
  );
  assert.equal(contract.authorization.retained_branch_claim, false);
});

test("central retained-source adapter contract threads seed-path authority package diagnostics", () => {
  const baseContract = buildSameRecordAcceptedEvidencePackageContract({
    retainedRecordId: RETAINED_RECORD_ID,
    sourceRowId: SOURCE_ROW_ID,
  });
  const seedPathRequirement = seedPathField(baseContract)?.source_requirement;
  const seedPathAcceptanceCertificate = makeSeedPathCertificateFromRequirement(seedPathRequirement);

  const certificateOnlyContract = buildSameRecordAcceptedEvidencePackageContract({
    retainedRecordId: RETAINED_RECORD_ID,
    sourceRowId: SOURCE_ROW_ID,
    seedPathAcceptanceCertificate,
  });
  const certificateOnlyRequirement = seedPathField(certificateOnlyContract)?.source_requirement;

  assert.equal(certificateOnlyRequirement?.accepted, false);
  assert.equal(certificateOnlyRequirement?.requirement_passed, false);
  assert.equal(certificateOnlyRequirement?.status, "seed_path_external_authority_package_missing");
  assert.equal(
    certificateOnlyRequirement?.first_missing_object,
    "held_release_seed_path_rows_external_accepted_authority_package"
  );
  assert.equal(
    certificateOnlyRequirement?.first_missing_field,
    "held_release_seed_path_rows.external_authority.external_accepted_authority_package_ref"
  );
  assert.equal(
    certificateOnlyRequirement?.acceptance_certificate_verification.certificate_conditionally_verified,
    true
  );
  assert.equal(
    certificateOnlyRequirement?.acceptance_certificate_verification.external_authority_package_conditionally_verified,
    false
  );
  assert.equal(certificateOnlyRequirement?.authorization.held_release_seed_path_rows, false);

  const seedPathExternalAuthorityPackage =
    certificateOnlyRequirement.acceptance_certificate_verification.expected_external_authority_package_payload;
  const fullSourceContract = buildSameRecordAcceptedEvidencePackageContract({
    retainedRecordId: RETAINED_RECORD_ID,
    sourceRowId: SOURCE_ROW_ID,
    seedPathAcceptanceCertificate,
    seedPathExternalAuthorityPackage,
  });
  const fullSourceRequirement = seedPathField(fullSourceContract)?.source_requirement;

  assert.equal(fullSourceRequirement?.accepted, false);
  assert.equal(fullSourceRequirement?.requirement_passed, false);
  assert.equal(
    fullSourceRequirement?.status,
    "seed_path_acceptance_certificate_and_external_authority_conditionally_verified_repo_authorization_blocked"
  );
  assert.equal(
    fullSourceRequirement?.first_missing_object,
    "repo_authorization_for_accepted_held_release_seed_path_rows"
  );
  assert.equal(
    fullSourceRequirement?.first_missing_field,
    "held_release_seed_path_rows.acceptance_certificate_ref"
  );
  assert.equal(
    fullSourceRequirement?.required_repo_authorization_object,
    "repo_authorization_for_accepted_held_release_seed_path_rows"
  );
  assert.equal(
    fullSourceRequirement?.required_repo_authorization_field,
    "held_release_seed_path_rows.acceptance_certificate_ref"
  );
  assert.equal(
    fullSourceRequirement?.repo_authorization_status,
    "missing_after_conditionally_verified_external_authority_package"
  );
  assert.equal(
    fullSourceRequirement?.acceptance_certificate_verification.required_repo_authorization_object,
    "repo_authorization_for_accepted_held_release_seed_path_rows"
  );
  assert.equal(
    fullSourceRequirement?.acceptance_certificate_verification.required_repo_authorization_field,
    "held_release_seed_path_rows.acceptance_certificate_ref"
  );
  assert.equal(
    fullSourceRequirement?.acceptance_certificate_verification.repo_authorization_status,
    "missing_after_conditionally_verified_external_authority_package"
  );
  assert.deepEqual(fullSourceRequirement?.missing_fields, [
    "held_release_seed_path_rows.acceptance_certificate_ref",
  ]);
  assert.deepEqual(fullSourceRequirement?.acceptance_certificate_verification.missing_fields, [
    "held_release_seed_path_rows.acceptance_certificate_ref",
  ]);
  assert.equal(
    fullSourceRequirement?.acceptance_certificate_verification.conditionally_verified,
    true
  );
  assert.equal(fullSourceRequirement?.authorization.held_release_seed_path_rows, false);
  assert.equal(
    fullSourceContract.first_missing_field,
    "central_solver_retained_source_adapter.accepted_evidence.accepted_same_record_retained_source_adapter_evidence"
  );
  assert.equal(fullSourceContract.authorization.scoreMovement, "no_score_increase");
});

test("central retained-source adapter acceptance certificate CLI prints accepted-evidence contract", () => {
  const output = execFileSync(
    process.execPath,
    [
      SCRIPT_PATH,
      `--retained-record-id=${RETAINED_RECORD_ID}`,
      `--source-row-id=${SOURCE_ROW_ID}`,
      "--print-same-record-accepted-evidence-contract",
      "--pretty",
    ],
    { encoding: "utf8" }
  );
  const contract = JSON.parse(output);

  assert.equal(contract.schema, SAME_RECORD_ACCEPTED_EVIDENCE_CONTRACT_SCHEMA);
  assert.equal(contract.package_template.schema, SAME_RECORD_ACCEPTED_EVIDENCE_PACKAGE_SCHEMA);
  assert.equal(contract.same_record_binding.retained_record_id, RETAINED_RECORD_ID);
  assert.equal(contract.same_record_binding.source_row_id, SOURCE_ROW_ID);
  assert.equal(contract.required_accepted_evidence_fields.includes("provider_provenance_ref"), true);
  assert.deepEqual(
    contract.required_accepted_evidence_package_provenance_fields,
    REQUIRED_ACCEPTED_EVIDENCE_PACKAGE_PROVENANCE_FIELDS
  );
  assert.equal(contract.source_acquisition_summary.accepted_for_package_field_count, 0);
  assert.equal(
    contract.source_acquisition_field_map.find(
      (row) => row.package_field === "held_release_seed_path_rows_acceptance_certificate_ref"
    )?.source_requirement?.required_certificate_schema,
    "held_release_seed_path_rows_acceptance_certificate.v0"
  );
  assert.equal(
    contract.source_acquisition_field_map.find((row) => row.package_field === "provider_provenance_ref")
      ?.observed_ref_class,
    "candidate_ref_not_accepted"
  );
  assert.equal(contract.authorization.scoreMovement, "no_score_increase");
});

test("central retained-source adapter contract CLI accepts seed-path source requirement JSON", () => {
  const baseContract = buildSameRecordAcceptedEvidencePackageContract({
    retainedRecordId: RETAINED_RECORD_ID,
    sourceRowId: SOURCE_ROW_ID,
  });
  const seedPathAcceptanceCertificate = makeSeedPathCertificateFromRequirement(
    seedPathField(baseContract).source_requirement
  );
  const certificateOnlyContract = buildSameRecordAcceptedEvidencePackageContract({
    retainedRecordId: RETAINED_RECORD_ID,
    sourceRowId: SOURCE_ROW_ID,
    seedPathAcceptanceCertificate,
  });
  const seedPathExternalAuthorityPackage =
    seedPathField(certificateOnlyContract)
      .source_requirement
      .acceptance_certificate_verification
      .expected_external_authority_package_payload;
  const tempDir = mkdtempSync(path.join(tmpdir(), "retained-source-adapter-seed-path-"));
  const certificatePath = path.join(tempDir, "seed-path-certificate.json");
  const authorityPackagePath = path.join(tempDir, "seed-path-authority-package.json");

  try {
    writeFileSync(certificatePath, `${JSON.stringify(seedPathAcceptanceCertificate)}\n`);
    writeFileSync(authorityPackagePath, `${JSON.stringify(seedPathExternalAuthorityPackage)}\n`);
    const output = execFileSync(
      process.execPath,
      [
        SCRIPT_PATH,
        `--retained-record-id=${RETAINED_RECORD_ID}`,
        `--source-row-id=${SOURCE_ROW_ID}`,
        `--seed-path-acceptance-certificate-json=${certificatePath}`,
        `--seed-path-external-authority-package-json=${authorityPackagePath}`,
        "--print-same-record-accepted-evidence-contract",
        "--pretty",
      ],
      { encoding: "utf8" }
    );
    const contract = JSON.parse(output);
    const sourceRequirement = seedPathField(contract).source_requirement;

    assert.equal(
      sourceRequirement.first_missing_object,
      "repo_authorization_for_accepted_held_release_seed_path_rows"
    );
    assert.equal(sourceRequirement.first_missing_field, "held_release_seed_path_rows.acceptance_certificate_ref");
    assert.equal(
      sourceRequirement.required_repo_authorization_object,
      "repo_authorization_for_accepted_held_release_seed_path_rows"
    );
    assert.equal(
      sourceRequirement.required_repo_authorization_field,
      "held_release_seed_path_rows.acceptance_certificate_ref"
    );
    assert.equal(
      sourceRequirement.repo_authorization_status,
      "missing_after_conditionally_verified_external_authority_package"
    );
    assert.equal(
      sourceRequirement.acceptance_certificate_verification.required_repo_authorization_object,
      "repo_authorization_for_accepted_held_release_seed_path_rows"
    );
    assert.equal(
      sourceRequirement.acceptance_certificate_verification.required_repo_authorization_field,
      "held_release_seed_path_rows.acceptance_certificate_ref"
    );
    assert.equal(
      sourceRequirement.acceptance_certificate_verification.repo_authorization_status,
      "missing_after_conditionally_verified_external_authority_package"
    );
    assert.deepEqual(sourceRequirement.missing_fields, [
      "held_release_seed_path_rows.acceptance_certificate_ref",
    ]);
    assert.equal(sourceRequirement.acceptance_certificate_verification.conditionally_verified, true);
    assert.equal(sourceRequirement.requirement_passed, false);
    assert.equal(contract.authorization.scoreMovement, "no_score_increase");
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("central retained-source adapter acceptance certificate CLI consumes same-record accepted evidence package JSON", () => {
  const tempDir = mkdtempSync(path.join(tmpdir(), "retained-source-adapter-evidence-"));
  const evidencePath = path.join(tempDir, "same-record-accepted-evidence.json");
  writeFileSync(
    evidencePath,
    JSON.stringify(
      {
        schema: SAME_RECORD_ACCEPTED_EVIDENCE_PACKAGE_SCHEMA,
        evidence_package_ref: `accepted-evidence-package:retained-source-adapter:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}`,
        ...makeAcceptedEvidence(),
      },
      null,
      2
    )
  );

  try {
    const output = execFileSync(
      process.execPath,
      [
        SCRIPT_PATH,
        `--retained-record-id=${RETAINED_RECORD_ID}`,
        `--source-row-id=${SOURCE_ROW_ID}`,
        `--same-record-accepted-evidence-json=${evidencePath}`,
        "--pretty",
      ],
      { encoding: "utf8" }
    );
    const artifact = JSON.parse(output);

    assert.equal(artifact.same_record_accepted_evidence_criterion.criterion_passed, true);
    assert.equal(
      artifact.same_record_accepted_evidence_criterion.supplied_same_record_accepted_evidence_package_schema,
      SAME_RECORD_ACCEPTED_EVIDENCE_PACKAGE_SCHEMA
    );
    assert.match(
      artifact.adapter_acceptance_certificate_ref,
      /^candidate:central_solver_retained_source_adapter_acceptance_certificate:[0-9a-f]{16}$/
    );
    assert.equal(
      artifact.first_missing_field,
      "central_solver_retained_source_adapter.external_accepted_authority_verification_ref"
    );
    assert.equal(artifact.authorization.accepted_same_record_evidence, false);
    assert.deepEqual(validateCentralSolverRetainedSourceAdapterAcceptanceCertificate(artifact), []);
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("central retained-source adapter acceptance certificate CLI fails required evidence mode without package", () => {
  let error;
  try {
    execFileSync(
      process.execPath,
      [
        SCRIPT_PATH,
        `--retained-record-id=${RETAINED_RECORD_ID}`,
        `--source-row-id=${SOURCE_ROW_ID}`,
        "--require-same-record-accepted-evidence",
        "--pretty",
      ],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
    );
  } catch (caught) {
    error = caught;
  }

  assert.ok(error);
  assert.equal(error.status, 1);
  assert.equal(error.stdout, "");
  const diagnostic = JSON.parse(error.stderr.toString());

  assert.equal(diagnostic.schema, SAME_RECORD_ACCEPTED_EVIDENCE_REQUIREMENT_SCHEMA);
  assert.equal(diagnostic.status, "same_record_accepted_evidence_missing");
  assert.equal(diagnostic.accepted, false);
  assert.equal(diagnostic.requirement_passed, false);
  assert.equal(diagnostic.required_package_schema, SAME_RECORD_ACCEPTED_EVIDENCE_PACKAGE_SCHEMA);
  assert.equal(
    diagnostic.first_missing_object,
    "central_solver_retained_source_adapter_same_record_accepted_evidence_package"
  );
  assert.equal(
    diagnostic.first_missing_field,
    "central_solver_retained_source_adapter.accepted_evidence.accepted_same_record_retained_source_adapter_evidence"
  );
  assert.equal(diagnostic.authorization.retained_branch_claim, false);
});

test("central retained-source adapter acceptance certificate CLI keeps required evidence mode accepted-only with package", () => {
  const tempDir = mkdtempSync(path.join(tmpdir(), "retained-source-adapter-required-evidence-"));
  const evidencePath = path.join(tempDir, "same-record-accepted-evidence.json");
  writeFileSync(
    evidencePath,
    JSON.stringify(
      {
        schema: SAME_RECORD_ACCEPTED_EVIDENCE_PACKAGE_SCHEMA,
        evidence_package_ref: `accepted-evidence-package:retained-source-adapter:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}`,
        ...makeAcceptedEvidence(),
      },
      null,
      2
    )
  );

  try {
    let error;
    try {
      execFileSync(
        process.execPath,
        [
          SCRIPT_PATH,
          `--retained-record-id=${RETAINED_RECORD_ID}`,
          `--source-row-id=${SOURCE_ROW_ID}`,
          `--same-record-accepted-evidence-json=${evidencePath}`,
          "--require-same-record-accepted-evidence",
          "--pretty",
        ],
        { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
      );
    } catch (caught) {
      error = caught;
    }

    assert.ok(error);
    assert.equal(error.status, 1);
    assert.equal(error.stdout, "");
    const diagnostic = JSON.parse(error.stderr.toString());

    assert.equal(diagnostic.schema, SAME_RECORD_ACCEPTED_EVIDENCE_REQUIREMENT_SCHEMA);
    assert.equal(
      diagnostic.status,
      "same_record_accepted_evidence_conditionally_satisfied_repo_authorization_blocked"
    );
    assert.equal(diagnostic.accepted, false);
    assert.equal(diagnostic.requirement_passed, false);
    assert.equal(diagnostic.same_record_accepted_evidence_criterion_passed, true);
    assert.equal(diagnostic.evidence_evaluation.accepted, false);
    assert.equal(
      diagnostic.evidence_evaluation.reason,
      "external_accepted_authority_verification_missing"
    );
    assert.equal(
      diagnostic.first_missing_field,
      "central_solver_retained_source_adapter.external_accepted_authority_verification_ref"
    );
    assert.equal(diagnostic.authorization.accepted_same_record_evidence, false);
    assert.equal(diagnostic.authorization.retained_branch_claim, false);
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("central retained-source adapter acceptance certificate rejects wrong accepted-evidence package schema", () => {
  const artifact = buildCentralSolverRetainedSourceAdapterAcceptanceCertificate({
    retainedRecordId: RETAINED_RECORD_ID,
    sourceRowId: SOURCE_ROW_ID,
    sameRecordAcceptedEvidence: {
      ...makeAcceptedEvidence(),
      schema: "central_solver_retained_source_adapter_same_record_accepted_evidence_package.v99",
    },
  });

  assert.equal(artifact.same_record_accepted_evidence_criterion.criterion_passed, false);
  assert.equal(
    artifact.same_record_accepted_evidence_criterion.missing_fields.includes(
      "central_solver_retained_source_adapter.accepted_evidence.schema"
    ),
    true
  );
  assert.equal(artifact.adapter_acceptance_certificate_ref, null);
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
    artifact.external_authority_verification.external_accepted_authority_package?.schema,
    EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_SCHEMA
  );
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

test("central retained-source adapter acceptance certificate rejects string-only external verification", () => {
  const certificateArtifact = buildCentralSolverRetainedSourceAdapterAcceptanceCertificate({
    retainedRecordId: RETAINED_RECORD_ID,
    sourceRowId: SOURCE_ROW_ID,
    sameRecordAcceptedEvidence: makeAcceptedEvidence(),
  });
  const {
    external_accepted_authority_package: _package,
    ...stringOnlyVerification
  } = makeExternalVerification({ certificateArtifact });
  const artifact = buildCentralSolverRetainedSourceAdapterAcceptanceCertificate({
    retainedRecordId: RETAINED_RECORD_ID,
    sourceRowId: SOURCE_ROW_ID,
    sameRecordAcceptedEvidence: makeAcceptedEvidence(),
    externalAcceptedAuthorityVerification: stringOnlyVerification,
  });

  assert.equal(artifact.external_authority_verification.external_verification_conditionally_satisfied, false);
  assert.equal(
    artifact.external_authority_verification.missing_fields.includes(
      "central_solver_retained_source_adapter.external_accepted_authority_verification.external_accepted_authority_package"
    ),
    true
  );
  assert.equal(
    artifact.first_missing_field,
    "central_solver_retained_source_adapter.external_accepted_authority_verification.external_accepted_authority_package"
  );
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
