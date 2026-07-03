import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

import {
  SCHEMA as PROVIDER_SOURCE_CARRIER_SCHEMA,
  buildCentralSolverRetainedHistoryProviderSourceCarrier,
  validateCentralSolverRetainedHistoryProviderSourceCarrier,
} from "./central-solver-retained-history-provider-source-carrier.mjs";

export const SCHEMA = "central_solver_retained_source_adapter_acceptance_certificate.v0";
export const EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_SCHEMA =
  "central_solver_retained_source_adapter_external_accepted_authority_package.v0";
export const FIRST_MISSING_OBJECT = "central_solver_retained_source_adapter_acceptance_certificate";
export const FIRST_MISSING_FIELD = "central_solver_retained_source_adapter.acceptance_certificate_ref";

const EXTERNAL_VERIFICATION_FIELD =
  "central_solver_retained_source_adapter.external_accepted_authority_verification_ref";
const ACCEPTED_RETAINED_SOURCE_ADAPTER_REF_FIELD =
  "central_solver_retained_source_adapter.accepted_retained_source_adapter_ref";

const REQUIRED_ACCEPTED_EVIDENCE_FIELDS = Object.freeze([
  "held_release_seed_path_rows_acceptance_certificate_ref",
  "held_release_path_history_stream_manifest_set_acceptance_certificate_ref",
  "central_solver_retained_history_row_acceptance_certificate_ref",
  "central_solver_retained_history_provider_object_acceptance_certificate_ref",
  "native_app_path_history_stream_manifest_set_ref",
  "native_root_ledger_detail_rows_ref",
  "causal_root_replay_rows_ref",
  "same_record_action_closure_ref",
  "retained_wake_history_ref",
  "provider_provenance_ref",
]);

const REQUIRED_EXTERNAL_VERIFICATION_FIELDS = Object.freeze([
  "external_accepted_authority_package_ref",
  "external_accepted_authority_ref",
  "external_accepted_authority_verification_ref",
  "verified_adapter_acceptance_certificate_ref",
  "verified_adapter_artifact_hash",
  "retained_record_id",
  "source_row_id",
]);

const AUTHORIZATION_FLAGS = Object.freeze([
  "accepted_same_record_evidence",
  "central_solver_retained_source_adapter_acceptance_certificate",
  "central_solver_retained_source_adapter",
  "central_solver_retained_history_provider_source_carrier",
  "retained_branch_claim",
  "accepted_transition_source",
  "moving_retained_branch_certificate",
  "same_ledger_action_measure_row",
  "bounded_speed_live_ledger",
  "receiver_normal_branch_strength",
]);

export const NEGATIVE_CONTROL_REASONS = Object.freeze({
  fixture: "fixture_not_accepted_retained_source_adapter_acceptance_certificate_evidence",
  diagnostic: "diagnostic_not_accepted_retained_source_adapter_acceptance_certificate_evidence",
  priority_prose: "priority_prose_not_accepted_retained_source_adapter_acceptance_certificate_evidence",
  generated_decoy: "generated_decoy_not_accepted_retained_source_adapter_acceptance_certificate_evidence",
  proxy_row: "proxy_row_not_accepted_retained_source_adapter_acceptance_certificate_evidence",
  candidate_ref: "candidate_ref_not_accepted_retained_source_adapter_acceptance_certificate_evidence",
  aggregate_row: "aggregate_row_not_same_record_retained_source_adapter_acceptance_certificate_evidence",
  declared_certificate_ref_only:
    "declared_certificate_ref_only_not_retained_source_adapter_acceptance_certificate_evidence",
  external_authority_ref_only:
    "external_authority_ref_only_not_retained_source_adapter_acceptance_certificate_evidence",
  earlier_fail_closed_adapter_row:
    "earlier_fail_closed_adapter_row_not_accepted_retained_source_adapter_acceptance_certificate_evidence",
});

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function stringRef(value) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function makeCarrier(options) {
  return options.providerSourceCarrier ??
    buildCentralSolverRetainedHistoryProviderSourceCarrier({
      retainedRecordId: options.retainedRecordId,
      sourceRowId: options.sourceRowId,
      providerObjectRef: options.providerObjectRef,
      providerArtifactHash: options.providerArtifactHash,
      seedPathRowOptions: options.seedPathRowOptions,
      retainedHistoryRowOptions: options.retainedHistoryRowOptions,
      durableManifestRefs: options.durableManifestRefs,
      nativeRootLedgerDetailRefs: options.nativeRootLedgerDetailRefs,
      causalRootReplayRefs: options.causalRootReplayRefs,
      sameRecordActionClosureRef: options.sameRecordActionClosureRef,
      retainedWakeHistoryRef: options.retainedWakeHistoryRef,
      autoBindNativeAppProvenance: options.autoBindNativeAppProvenance,
    });
}

function makeCertificateRef({ retainedRecordId, sourceRowId, adapterArtifactHash, evidenceHash }) {
  if (retainedRecordId == null || sourceRowId == null || adapterArtifactHash == null) {
    return null;
  }
  const digest = stableHash({
    schema: SCHEMA,
    retainedRecordId,
    sourceRowId,
    adapterArtifactHash,
    evidenceHash,
  });
  return `candidate:central_solver_retained_source_adapter_acceptance_certificate:${digest.slice(0, 16)}`;
}

function makeSameRecordAcceptedEvidenceCriterion({ carrier, evidence = {} }) {
  const adapter = carrier?.central_solver_retained_source_adapter ?? null;
  const retainedRecordId = stringRef(carrier?.same_record_binding?.retained_record_id);
  const sourceRowId = stringRef(carrier?.same_record_binding?.source_row_id);
  const suppliedRetainedRecordId = stringRef(evidence.retained_record_id ?? evidence.same_record_retained_record_id);
  const suppliedSourceRowId = stringRef(evidence.source_row_id ?? evidence.same_record_source_row_id);
  const acceptedSameRecordEvidence =
    evidence.accepted_same_record_retained_source_adapter_evidence === true ||
    evidence.accepted_same_record_evidence === true;
  const missingFields = [];
  if (carrier?.schema !== PROVIDER_SOURCE_CARRIER_SCHEMA) {
    missingFields.push("central_solver_retained_history_provider_source_carrier.schema");
  }
  if (adapter?.artifact_status !== "retained_source_adapter_present_acceptance_blocked") {
    missingFields.push("central_solver_retained_source_adapter.artifact_status");
  }
  if (!acceptedSameRecordEvidence) {
    missingFields.push(
      "central_solver_retained_source_adapter.accepted_evidence.accepted_same_record_retained_source_adapter_evidence"
    );
  }
  if (retainedRecordId == null || suppliedRetainedRecordId !== retainedRecordId) {
    missingFields.push("central_solver_retained_source_adapter.accepted_evidence.retained_record_id");
  }
  if (sourceRowId == null || suppliedSourceRowId !== sourceRowId) {
    missingFields.push("central_solver_retained_source_adapter.accepted_evidence.source_row_id");
  }
  for (const field of REQUIRED_ACCEPTED_EVIDENCE_FIELDS) {
    if (stringRef(evidence[field]) == null) {
      missingFields.push(`central_solver_retained_source_adapter.accepted_evidence.${field}`);
    }
  }
  const evidenceHash = stableHash({
    retainedRecordId: suppliedRetainedRecordId,
    sourceRowId: suppliedSourceRowId,
    acceptedSameRecordEvidence,
    refs: Object.fromEntries(REQUIRED_ACCEPTED_EVIDENCE_FIELDS.map((field) => [field, stringRef(evidence[field])])),
  });
  const criterionPassed = missingFields.length === 0;
  const adapterAcceptanceCertificateRef = criterionPassed
    ? makeCertificateRef({
        retainedRecordId,
        sourceRowId,
        adapterArtifactHash: adapter?.artifact_hash ?? null,
        evidenceHash,
      })
    : null;
  return {
    schema: "central_solver_retained_source_adapter_same_record_evidence_criterion.v0",
    criterion_passed: criterionPassed,
    status: criterionPassed
      ? "adapter_acceptance_certificate_conditionally_satisfied_by_same_record_evidence"
      : "adapter_acceptance_certificate_missing_same_record_evidence",
    accepted: false,
    candidate_artifact_authorizes_adapter_acceptance: false,
    adapter_acceptance_certificate_ref: adapterAcceptanceCertificateRef,
    required_accepted_evidence_fields: [...REQUIRED_ACCEPTED_EVIDENCE_FIELDS],
    supplied_accepted_evidence_refs: Object.fromEntries(
      REQUIRED_ACCEPTED_EVIDENCE_FIELDS.map((field) => [field, stringRef(evidence[field])])
    ),
    same_record_binding: {
      retained_record_id: {
        expected: retainedRecordId,
        supplied: suppliedRetainedRecordId,
        binding_passed: retainedRecordId != null && suppliedRetainedRecordId === retainedRecordId,
      },
      source_row_id: {
        expected: sourceRowId,
        supplied: suppliedSourceRowId,
        binding_passed: sourceRowId != null && suppliedSourceRowId === sourceRowId,
      },
      adapter_artifact_hash: adapter?.artifact_hash ?? null,
      provider_source_carrier_id: carrier?.carrier_id ?? null,
    },
    accepted_same_record_retained_source_adapter_evidence: acceptedSameRecordEvidence,
    missing_fields: missingFields,
    first_missing_object: criterionPassed
      ? "central_solver_retained_source_adapter_external_accepted_authority_verification"
      : FIRST_MISSING_OBJECT,
    first_missing_field: criterionPassed
      ? EXTERNAL_VERIFICATION_FIELD
      : (missingFields[0] ?? FIRST_MISSING_FIELD),
  };
}

function authorityPackageMissingFields({ authorityPackage, candidateCertificateRef, adapter, retainedRecordId, sourceRowId }) {
  const missingFields = [];
  if (authorityPackage?.schema !== EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_SCHEMA) {
    missingFields.push(
      "central_solver_retained_source_adapter.external_accepted_authority_verification.authority_package.schema"
    );
  }
  if (authorityPackage?.accepted_external_authority !== true) {
    missingFields.push(
      "central_solver_retained_source_adapter.external_accepted_authority_verification.authority_package.accepted_external_authority"
    );
  }
  if (authorityPackage?.non_repo_external_authority !== true) {
    missingFields.push(
      "central_solver_retained_source_adapter.external_accepted_authority_verification.authority_package.non_repo_external_authority"
    );
  }
  if (stringRef(authorityPackage?.external_accepted_authority_ref) == null) {
    missingFields.push(
      "central_solver_retained_source_adapter.external_accepted_authority_verification.authority_package.external_accepted_authority_ref"
    );
  }
  if (stringRef(authorityPackage?.external_accepted_authority_verification_ref) == null) {
    missingFields.push(
      "central_solver_retained_source_adapter.external_accepted_authority_verification.authority_package.external_accepted_authority_verification_ref"
    );
  }
  if (stringRef(authorityPackage?.verified_adapter_acceptance_certificate_ref) !== candidateCertificateRef) {
    missingFields.push(
      "central_solver_retained_source_adapter.external_accepted_authority_verification.authority_package.verified_adapter_acceptance_certificate_ref"
    );
  }
  if (adapter?.artifact_hash != null && stringRef(authorityPackage?.verified_adapter_artifact_hash) !== adapter.artifact_hash) {
    missingFields.push(
      "central_solver_retained_source_adapter.external_accepted_authority_verification.authority_package.verified_adapter_artifact_hash"
    );
  }
  if (retainedRecordId != null && stringRef(authorityPackage?.retained_record_id) !== retainedRecordId) {
    missingFields.push(
      "central_solver_retained_source_adapter.external_accepted_authority_verification.authority_package.retained_record_id"
    );
  }
  if (sourceRowId != null && stringRef(authorityPackage?.source_row_id) !== sourceRowId) {
    missingFields.push(
      "central_solver_retained_source_adapter.external_accepted_authority_verification.authority_package.source_row_id"
    );
  }
  return missingFields;
}

function makeExternalAuthorityVerification({ carrier, certificateCriterion, verification = {} }) {
  const adapter = carrier?.central_solver_retained_source_adapter ?? null;
  const retainedRecordId = stringRef(carrier?.same_record_binding?.retained_record_id);
  const sourceRowId = stringRef(carrier?.same_record_binding?.source_row_id);
  const candidateCertificateRef = certificateCriterion.adapter_acceptance_certificate_ref;
  const authorityPackage = verification.external_accepted_authority_package ?? null;
  const missingFields = [];
  if (certificateCriterion.criterion_passed !== true) {
    missingFields.push(FIRST_MISSING_FIELD);
  }
  const verificationFieldPresent = REQUIRED_EXTERNAL_VERIFICATION_FIELDS.some((field) => stringRef(verification[field]) != null);
  if (!verificationFieldPresent) {
    missingFields.push(EXTERNAL_VERIFICATION_FIELD);
  } else {
    for (const field of REQUIRED_EXTERNAL_VERIFICATION_FIELDS) {
      if (stringRef(verification[field]) == null) {
        missingFields.push(`central_solver_retained_source_adapter.external_accepted_authority_verification.${field}`);
      }
    }
  }
  if (authorityPackage == null) {
    missingFields.push(
      "central_solver_retained_source_adapter.external_accepted_authority_verification.external_accepted_authority_package"
    );
  } else {
    missingFields.push(
      ...authorityPackageMissingFields({
        authorityPackage,
        candidateCertificateRef,
        adapter,
        retainedRecordId,
        sourceRowId,
      })
    );
  }
  if (
    candidateCertificateRef != null &&
    stringRef(verification.verified_adapter_acceptance_certificate_ref) !== candidateCertificateRef
  ) {
    missingFields.push(
      "central_solver_retained_source_adapter.external_accepted_authority_verification.verified_adapter_acceptance_certificate_ref"
    );
  }
  if (
    adapter?.artifact_hash != null &&
    stringRef(verification.verified_adapter_artifact_hash) !== adapter.artifact_hash
  ) {
    missingFields.push(
      "central_solver_retained_source_adapter.external_accepted_authority_verification.verified_adapter_artifact_hash"
    );
  }
  if (retainedRecordId != null && stringRef(verification.retained_record_id) !== retainedRecordId) {
    missingFields.push("central_solver_retained_source_adapter.external_accepted_authority_verification.retained_record_id");
  }
  if (sourceRowId != null && stringRef(verification.source_row_id) !== sourceRowId) {
    missingFields.push("central_solver_retained_source_adapter.external_accepted_authority_verification.source_row_id");
  }
  const declaredVerificationPassed = missingFields.length === 0;
  return {
    schema: "central_solver_retained_source_adapter_external_authority_verification.v0",
    external_verification_conditionally_satisfied: declaredVerificationPassed,
    status: declaredVerificationPassed
      ? "adapter_acceptance_certificate_conditionally_verified_by_declared_external_authority"
      : "adapter_acceptance_certificate_external_authority_verification_missing",
    accepted: false,
    candidate_artifact_authorizes_adapter_acceptance: false,
    required_external_verification_fields: [...REQUIRED_EXTERNAL_VERIFICATION_FIELDS],
    supplied_external_verification_refs: Object.fromEntries(
      REQUIRED_EXTERNAL_VERIFICATION_FIELDS.map((field) => [field, stringRef(verification[field])])
    ),
    external_accepted_authority_package_schema: EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_SCHEMA,
    external_accepted_authority_package_ref: stringRef(verification.external_accepted_authority_package_ref),
    external_accepted_authority_package: authorityPackage,
    verified_adapter_acceptance_certificate_ref: stringRef(verification.verified_adapter_acceptance_certificate_ref),
    expected_adapter_acceptance_certificate_ref: candidateCertificateRef,
    missing_fields: [...new Set(missingFields)],
    first_missing_object: declaredVerificationPassed
      ? "external_acceptance_authority_for_retained_source_adapter"
      : "central_solver_retained_source_adapter_external_accepted_authority_verification",
    first_missing_field: declaredVerificationPassed
      ? ACCEPTED_RETAINED_SOURCE_ADAPTER_REF_FIELD
      : (missingFields[0] ?? EXTERNAL_VERIFICATION_FIELD),
  };
}

export function evaluateCentralSolverRetainedSourceAdapterAcceptanceCertificateEvidence(candidate = {}) {
  const evidenceClass = candidate.evidence_class ?? candidate.authority_class ?? candidate.source_class ?? null;
  if (evidenceClass && NEGATIVE_CONTROL_REASONS[evidenceClass]) {
    return {
      accepted: false,
      reason: NEGATIVE_CONTROL_REASONS[evidenceClass],
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (candidate.schema !== SCHEMA) {
    return {
      accepted: false,
      reason: "schema_not_central_solver_retained_source_adapter_acceptance_certificate_v0",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (candidate.same_record_accepted_evidence_criterion?.criterion_passed !== true) {
    return {
      accepted: false,
      reason: "adapter_acceptance_certificate_missing_same_record_evidence",
      first_missing_field:
        candidate.same_record_accepted_evidence_criterion?.first_missing_field ?? FIRST_MISSING_FIELD,
    };
  }
  if (candidate.external_authority_verification?.external_verification_conditionally_satisfied !== true) {
    return {
      accepted: false,
      reason: "external_accepted_authority_verification_missing",
      first_missing_field:
        candidate.external_authority_verification?.first_missing_field ?? EXTERNAL_VERIFICATION_FIELD,
    };
  }
  return {
    accepted: false,
    reason: "repo_artifact_does_not_authorize_accepted_retained_source_adapter",
    first_missing_field: ACCEPTED_RETAINED_SOURCE_ADAPTER_REF_FIELD,
  };
}

export function buildCentralSolverRetainedSourceAdapterAcceptanceCertificate(options = {}) {
  const carrier = makeCarrier(options);
  const sameRecordAcceptedEvidenceCriterion = makeSameRecordAcceptedEvidenceCriterion({
    carrier,
    evidence: options.sameRecordAcceptedEvidence ?? {},
  });
  const externalAuthorityVerification = makeExternalAuthorityVerification({
    carrier,
    certificateCriterion: sameRecordAcceptedEvidenceCriterion,
    verification: options.externalAcceptedAuthorityVerification ?? {},
  });
  const artifactHash = stableHash({
    schema: SCHEMA,
    carrier_hash: carrier?.artifact_hash ?? null,
    sameRecordAcceptedEvidenceCriterion,
    externalAuthorityVerification,
  });
  const certificateArtifactId =
    `central_solver_retained_source_adapter_acceptance_certificate:${artifactHash.slice(0, 16)}`;
  const evaluation = evaluateCentralSolverRetainedSourceAdapterAcceptanceCertificateEvidence({
    schema: SCHEMA,
    same_record_accepted_evidence_criterion: sameRecordAcceptedEvidenceCriterion,
    external_authority_verification: externalAuthorityVerification,
  });
  return {
    schema: SCHEMA,
    artifact_id: certificateArtifactId,
    artifact_hash: artifactHash,
    certificate_artifact_id: certificateArtifactId,
    retained_record_id: carrier?.same_record_binding?.retained_record_id ?? null,
    source_row_id: carrier?.same_record_binding?.source_row_id ?? null,
    accepted_retained_source_adapter_ref: null,
    adapter_acceptance_certificate_ref: sameRecordAcceptedEvidenceCriterion.adapter_acceptance_certificate_ref,
    provider_source_carrier: {
      consumed_schema: carrier?.schema ?? null,
      consumed_artifact_id: carrier?.artifact_id ?? null,
      consumed_artifact_hash: carrier?.artifact_hash ?? null,
      artifact_status: carrier?.artifact_status ?? null,
      first_missing_field: carrier?.first_missing_field ?? null,
    },
    central_solver_retained_source_adapter: {
      consumed_schema: carrier?.central_solver_retained_source_adapter?.schema ?? null,
      consumed_adapter_id: carrier?.central_solver_retained_source_adapter?.adapter_id ?? null,
      consumed_artifact_hash: carrier?.central_solver_retained_source_adapter?.artifact_hash ?? null,
      artifact_status: carrier?.central_solver_retained_source_adapter?.artifact_status ?? null,
      first_missing_field: carrier?.central_solver_retained_source_adapter?.first_missing_field ?? null,
    },
    same_record_accepted_evidence_criterion: sameRecordAcceptedEvidenceCriterion,
    external_authority_verification: externalAuthorityVerification,
    artifact_status:
      evaluation.reason === "repo_artifact_does_not_authorize_accepted_retained_source_adapter"
        ? "adapter_acceptance_certificate_externally_verified_but_repo_authorization_blocked"
        : sameRecordAcceptedEvidenceCriterion.criterion_passed
          ? "adapter_acceptance_certificate_present_external_verification_blocked"
          : "adapter_acceptance_certificate_source_acquisition_blocked",
    source_status:
      sameRecordAcceptedEvidenceCriterion.criterion_passed
        ? "candidate_adapter_acceptance_certificate_unaccepted"
        : "source_acquisition_blocked",
    first_missing_object:
      evaluation.reason === "repo_artifact_does_not_authorize_accepted_retained_source_adapter"
        ? "accepted_retained_source_adapter_external_promotion"
        : sameRecordAcceptedEvidenceCriterion.criterion_passed
          ? externalAuthorityVerification.first_missing_object
          : sameRecordAcceptedEvidenceCriterion.first_missing_object,
    first_missing_field: evaluation.first_missing_field,
    evidence_evaluation: evaluation,
    authorization: makeAuthorization(),
    negative_controls: Object.entries(NEGATIVE_CONTROL_REASONS).map(([evidence_class, reason]) => ({
      evidence_class,
      accepted: false,
      reason,
    })),
  };
}

export function validateCentralSolverRetainedSourceAdapterAcceptanceCertificate(artifact) {
  const errors = [];
  if (artifact?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (artifact?.accepted_retained_source_adapter_ref !== null) {
    errors.push("accepted_retained_source_adapter_ref must remain null");
  }
  if (artifact?.provider_source_carrier?.consumed_schema !== PROVIDER_SOURCE_CARRIER_SCHEMA) {
    errors.push(`provider_source_carrier must consume ${PROVIDER_SOURCE_CARRIER_SCHEMA}`);
  }
  const carrierValidationErrors = validateCentralSolverRetainedHistoryProviderSourceCarrier(
    artifact?.providerSourceCarrier ?? {}
  );
  if (artifact?.providerSourceCarrier != null && carrierValidationErrors.length > 0) {
    errors.push(...carrierValidationErrors.map((error) => `providerSourceCarrier: ${error}`));
  }
  if (artifact?.same_record_accepted_evidence_criterion?.criterion_passed === true) {
    if (artifact?.adapter_acceptance_certificate_ref == null) {
      errors.push("passed same-record evidence criterion must emit an adapter acceptance certificate ref");
    }
    if (artifact?.first_missing_field === FIRST_MISSING_FIELD) {
      errors.push("passed same-record evidence criterion must advance beyond the acceptance certificate ref field");
    }
  }
  if (
    artifact?.external_authority_verification?.external_verification_conditionally_satisfied === true &&
    artifact?.first_missing_field !== ACCEPTED_RETAINED_SOURCE_ADAPTER_REF_FIELD
  ) {
    errors.push("declared external verification must still stop at accepted retained-source adapter promotion");
  }
  const evaluation = evaluateCentralSolverRetainedSourceAdapterAcceptanceCertificateEvidence(artifact ?? {});
  if (
    artifact?.evidence_evaluation?.accepted !== evaluation.accepted ||
    artifact?.evidence_evaluation?.reason !== evaluation.reason ||
    artifact?.evidence_evaluation?.first_missing_field !== evaluation.first_missing_field
  ) {
    errors.push("evidence_evaluation must match acceptance-certificate evaluator");
  }
  for (const flag of AUTHORIZATION_FLAGS) {
    if (artifact?.authorization?.[flag] !== false) {
      errors.push(`${flag} must remain false`);
    }
  }
  if (artifact?.authorization?.scoreMovement !== "no_score_increase") {
    errors.push("scoreMovement must remain no_score_increase");
  }
  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    const result = evaluateCentralSolverRetainedSourceAdapterAcceptanceCertificateEvidence({
      evidence_class: evidenceClass,
    });
    if (result.accepted || result.reason !== reason) {
      errors.push(`${evidenceClass} negative control must reject as ${reason}`);
    }
  }
  return errors;
}

function cliStringOption(name) {
  return process.argv.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3) ?? null;
}

function runCli() {
  const artifact = buildCentralSolverRetainedSourceAdapterAcceptanceCertificate({
    retainedRecordId: cliStringOption("retained-record-id"),
    sourceRowId: cliStringOption("source-row-id"),
  });
  const errors = validateCentralSolverRetainedSourceAdapterAcceptanceCertificate(artifact);
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
    return;
  }
  const pretty = process.argv.includes("--pretty");
  console.log(JSON.stringify(artifact, null, pretty ? 2 : 0));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli();
}
