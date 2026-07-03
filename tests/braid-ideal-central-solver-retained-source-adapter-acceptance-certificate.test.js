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

test("central retained-source adapter accepted-evidence contract names the exact package fields", () => {
  const contract = buildSameRecordAcceptedEvidencePackageContract({
    retainedRecordId: RETAINED_RECORD_ID,
    sourceRowId: SOURCE_ROW_ID,
  });

  assert.equal(contract.schema, SAME_RECORD_ACCEPTED_EVIDENCE_CONTRACT_SCHEMA);
  assert.equal(contract.accepted, false);
  assert.equal(contract.source_status, "source_acquisition_contract");
  assert.equal(contract.required_package_schema, SAME_RECORD_ACCEPTED_EVIDENCE_PACKAGE_SCHEMA);
  assert.equal(contract.package_template.accepted_same_record_retained_source_adapter_evidence, true);
  assert.equal(contract.package_template.retained_record_id, RETAINED_RECORD_ID);
  assert.equal(contract.package_template.source_row_id, SOURCE_ROW_ID);
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
  assert.equal(contract.authorization.scoreMovement, "no_score_increase");
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

test("central retained-source adapter acceptance certificate CLI passes required evidence mode with package", () => {
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
    const output = execFileSync(
      process.execPath,
      [
        SCRIPT_PATH,
        `--retained-record-id=${RETAINED_RECORD_ID}`,
        `--source-row-id=${SOURCE_ROW_ID}`,
        `--same-record-accepted-evidence-json=${evidencePath}`,
        "--require-same-record-accepted-evidence",
        "--pretty",
      ],
      { encoding: "utf8" }
    );
    const artifact = JSON.parse(output);

    assert.equal(artifact.same_record_accepted_evidence_criterion.criterion_passed, true);
    assert.match(
      artifact.adapter_acceptance_certificate_ref,
      /^candidate:central_solver_retained_source_adapter_acceptance_certificate:[0-9a-f]{16}$/
    );
    assert.equal(
      artifact.first_missing_field,
      "central_solver_retained_source_adapter.external_accepted_authority_verification_ref"
    );
    assert.equal(artifact.authorization.accepted_same_record_evidence, false);
    assert.equal(artifact.authorization.retained_branch_claim, false);
    assert.deepEqual(validateCentralSolverRetainedSourceAdapterAcceptanceCertificate(artifact), []);
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("central retained-source adapter acceptance certificate rejects wrong accepted-evidence package schema", () => {
  const artifact = buildCentralSolverRetainedSourceAdapterAcceptanceCertificate({
    retainedRecordId: RETAINED_RECORD_ID,
    sourceRowId: SOURCE_ROW_ID,
    sameRecordAcceptedEvidence: {
      schema: "central_solver_retained_source_adapter_same_record_accepted_evidence_package.v99",
      ...makeAcceptedEvidence(),
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
