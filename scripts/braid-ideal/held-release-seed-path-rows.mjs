import crypto from "node:crypto";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

export const SCHEMA = "held_release_seed_path_rows.v0";
export const ACCEPTANCE_CERTIFICATE_SCHEMA = "held_release_seed_path_rows_acceptance_certificate.v0";
export const ACCEPTANCE_CERTIFICATE_REQUIREMENT_SCHEMA =
  "held_release_seed_path_rows_acceptance_certificate_requirement.v0";
export const ACCEPTANCE_CERTIFICATE_VERIFICATION_SCHEMA =
  "held_release_seed_path_rows_acceptance_certificate_verification.v0";
export const EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_SCHEMA =
  "held_release_seed_path_rows_external_accepted_authority_package.v0";
export const EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_REF_PREFIX =
  "external-authority-package:held-release-seed-path-rows:";
export const ACCEPTANCE_CERTIFICATE_REF_PREFIX = "accepted:held-release-seed-path-rows:";
export const EXTERNAL_ACCEPTED_AUTHORITY_REF_PREFIX = "external-authority:held-release-seed-path-rows:";
export const EXTERNAL_ACCEPTED_AUTHORITY_VERIFICATION_REF_PREFIX =
  "external-verification:held-release-seed-path-rows:";
export const DEFAULT_SEED_ID = "braid-ideal:held-release:face-opposite:six-point:v0";
export const DEFAULT_ROUTE_ID = "braid-ideal:self-hit-held-release:face-opposite:v0";
export const DEFAULT_RUN_ID = "braid-ideal:held-release:seed-path-rows:v0";
export const DEFAULT_GROUP_VELOCITY = Object.freeze([1 / 60, 1 / 60, 1 / 60]);
export const DEFAULT_PREHISTORY_MODE = "stationary-held-release";
export const PREHISTORY_MODES = Object.freeze([
  DEFAULT_PREHISTORY_MODE,
  "kick-at-release",
  "moving-prehistory",
]);
export const SURFACE_VELOCITY_PATTERN = "antipodal-shell-tangent-diagnostic-v0";
export const FIRST_MISSING_OBJECT = "six_held_release_seed_path_rows_for_retained_record";
export const FIRST_MISSING_FIELD = "held_release_seed_path_rows[*].retained_record_id";
export const ACCEPTANCE_CERTIFICATE_FIELD = "held_release_seed_path_rows.acceptance_certificate_ref";
export const EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_FIELD =
  "held_release_seed_path_rows.external_authority.external_accepted_authority_package_ref";
export const REPO_AUTHORIZATION_OBJECT = "repo_authorization_for_accepted_held_release_seed_path_rows";
export const REPO_AUTHORIZATION_FIELD = ACCEPTANCE_CERTIFICATE_FIELD;

const DEFAULT_FIELD_SPEED = 1;
const DEFAULT_COUPLING = 1 / 36;
const DEFAULT_DURATION = 18;
const DEFAULT_TIME_STEP = 0.024;
const DEFAULT_HOLD_TIME = 4;
const DEFAULT_ERROR_BOUND = 0;
const DEFAULT_STATE_FLAGS = 0;

const REQUIRED_ACCEPTANCE_CERTIFICATE_FIELDS = Object.freeze([
  "schema",
  "accepted_held_release_seed_path_rows",
  "accepted_same_record_evidence",
  "non_repo_external_authority",
  "external_accepted_authority_ref",
  "external_accepted_authority_verification_ref",
  "held_release_seed_path_rows_acceptance_certificate_ref",
  "held_release_seed_path_rows_artifact_id",
  "held_release_seed_path_rows_artifact_hash",
  "retained_record_id",
  "source_row_id",
  "source_run_id",
  "source_dataset_id",
  "provider_object_ref",
  "provider_artifact_hash",
  "row_ids",
  "row_artifact_hashes",
  "negative_control_rejection_verified",
]);

const REQUIRED_EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_FIELDS = Object.freeze([
  "schema",
  "accepted_external_authority",
  "non_repo_external_authority",
  "external_accepted_authority_package_ref",
  "external_accepted_authority_ref",
  "external_accepted_authority_verification_ref",
  "verified_certificate_schema",
  "verified_certificate_ref",
  "verified_certificate_artifact_hash",
  "held_release_seed_path_rows_artifact_id",
  "held_release_seed_path_rows_artifact_hash",
  "retained_record_id",
  "source_row_id",
  "source_run_id",
  "source_dataset_id",
  "provider_object_ref",
  "provider_artifact_hash",
  "row_ids",
  "row_artifact_hashes",
  "negative_control_rejection_verified",
]);

const SIX_POINT_SEED = Object.freeze([
  Object.freeze({ architrino_id: "P:+x:+y:+z", polarity: "P", sign: 1, position: [1, 1, 1] }),
  Object.freeze({ architrino_id: "P:+x:-y:-z", polarity: "P", sign: 1, position: [1, -1, -1] }),
  Object.freeze({ architrino_id: "P:-x:+y:-z", polarity: "P", sign: 1, position: [-1, 1, -1] }),
  Object.freeze({ architrino_id: "E:-x:-y:-z", polarity: "E", sign: -1, position: [-1, -1, -1] }),
  Object.freeze({ architrino_id: "E:-x:+y:+z", polarity: "E", sign: -1, position: [-1, 1, 1] }),
  Object.freeze({ architrino_id: "E:+x:-y:+z", polarity: "E", sign: -1, position: [1, -1, 1] }),
]);

const TANGENT_REFERENCE_AXES = Object.freeze([
  Object.freeze([0, 0, 1]),
  Object.freeze([1, 0, 0]),
  Object.freeze([0, 1, 0]),
  Object.freeze([0, 0, 1]),
  Object.freeze([1, 0, 0]),
  Object.freeze([0, 1, 0]),
]);

export const NEGATIVE_CONTROL_REASONS = Object.freeze({
  fixture: "fixture_not_accepted_held_release_path_row_evidence",
  diagnostic: "diagnostic_not_accepted_held_release_path_row_evidence",
  priority_prose: "priority_prose_not_accepted_held_release_path_row_evidence",
  generated_decoy: "generated_decoy_not_accepted_held_release_path_row_evidence",
  proxy_row: "proxy_row_not_accepted_held_release_path_row_evidence",
  candidate_ref: "candidate_ref_not_accepted_held_release_path_row_evidence",
  aggregate_row: "aggregate_row_not_same_record_held_release_path_row_evidence",
  h39_theta3minus_quotient_row: "h39_theta3minus_row_not_braid_ideal_path_row_evidence",
  dirty_file_evidence: "dirty_file_not_accepted_held_release_path_row_evidence",
  source_contract_shell: "source_contract_shell_not_accepted_held_release_path_row_evidence",
  temp_probe: "temp_probe_not_accepted_held_release_path_row_evidence",
  t3_row: "t3_row_not_braid_ideal_path_row_evidence",
  endpoint_only_row: "endpoint_only_row_not_held_release_path_row_evidence",
  affine_geometry_alone: "affine_geometry_alone_not_held_release_path_row_evidence",
  cross_row_bundle: "cross_row_bundle_not_same_record_held_release_path_row_evidence",
  generic_stream_metadata_without_same_record_binding:
    "generic_stream_metadata_without_same_record_binding_not_accepted_path_row_evidence",
  earlier_fail_closed_adapter_row: "earlier_fail_closed_adapter_row_not_accepted_path_row_evidence",
});

const AUTHORIZATION_FLAGS = Object.freeze([
  "accepted_same_record_evidence",
  "held_release_seed_path_rows",
  "retained_branch_claim",
  "accepted_transition_source",
  "moving_retained_branch_certificate",
  "same_ledger_action_measure_row",
  "bounded_speed_live_ledger",
  "receiver_normal_branch_strength",
]);

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function stableUint32(value) {
  const digest = crypto.createHash("sha256").update(value).digest();
  return digest.readUInt32BE(0);
}

function normalizeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeFiniteNumber(value, fallback, fieldName) {
  const number = normalizeNumber(value, fallback);
  if (!Number.isFinite(number)) {
    throw new TypeError(`${fieldName} must be finite`);
  }
  return number;
}

function normalizeVector(value, fallback) {
  if (!Array.isArray(value) || value.length !== 3) {
    return [...fallback];
  }
  return value.map((entry, index) => normalizeNumber(entry, fallback[index]));
}

function normalizePrehistoryMode(value) {
  const mode = normalizeStringRef(value) ?? DEFAULT_PREHISTORY_MODE;
  if (!PREHISTORY_MODES.includes(mode)) {
    throw new TypeError(`prehistory mode must be one of: ${PREHISTORY_MODES.join(", ")}`);
  }
  return mode;
}

function normalizeStringRef(value) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function acceptedRef(value) {
  const ref = normalizeStringRef(value);
  return ref != null && ref.startsWith("accepted:") ? ref : null;
}

function acceptedSeedPathCertificateRef(value, requiredPrefix = ACCEPTANCE_CERTIFICATE_REF_PREFIX) {
  const ref = acceptedRef(value);
  return ref != null && requiredPrefix != null && ref.startsWith(requiredPrefix) ? ref : null;
}

function externalAuthorityRef(value) {
  const ref = normalizeStringRef(value);
  return ref != null && ref.startsWith(EXTERNAL_ACCEPTED_AUTHORITY_REF_PREFIX) ? ref : null;
}

function externalVerificationRef(value) {
  const ref = normalizeStringRef(value);
  return ref != null && ref.startsWith(EXTERNAL_ACCEPTED_AUTHORITY_VERIFICATION_REF_PREFIX) ? ref : null;
}

function externalAuthorityPackageRef(value) {
  const ref = normalizeStringRef(value);
  return ref != null && ref.startsWith(EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_REF_PREFIX) ? ref : null;
}

function matchingNonEmptyString(value, expected) {
  const ref = normalizeStringRef(value);
  const expectedRef = normalizeStringRef(expected);
  return expectedRef != null && ref === expectedRef;
}

function pushMissingUnlessMatchingString({ missingFields, value, expected, field }) {
  if (!matchingNonEmptyString(value, expected)) {
    missingFields.push(field);
  }
}

function makeExternalAcceptedAuthorityPackageRef({ artifact, sourceRowId }) {
  const retainedRecordId = normalizeStringRef(artifact?.retained_record_requirement?.retained_record_id);
  const sourceRowRef = normalizeStringRef(sourceRowId);
  if (retainedRecordId == null || sourceRowRef == null) {
    return null;
  }
  return `${EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_REF_PREFIX}${retainedRecordId}:${sourceRowRef}`;
}

function makeAcceptedSeedPathCertificateRefPrefix({ artifact, sourceRowId }) {
  const retainedRecordId = normalizeStringRef(artifact?.retained_record_requirement?.retained_record_id);
  const sourceRowRef = normalizeStringRef(sourceRowId);
  if (retainedRecordId == null || sourceRowRef == null) {
    return null;
  }
  return `${ACCEPTANCE_CERTIFICATE_REF_PREFIX}${retainedRecordId}:${sourceRowRef}:`;
}

function makeExternalAcceptedAuthorityRef({ artifact, sourceRowId }) {
  const retainedRecordId = normalizeStringRef(artifact?.retained_record_requirement?.retained_record_id);
  const sourceRowRef = normalizeStringRef(sourceRowId);
  if (retainedRecordId == null || sourceRowRef == null) {
    return null;
  }
  return `${EXTERNAL_ACCEPTED_AUTHORITY_REF_PREFIX}${retainedRecordId}:${sourceRowRef}`;
}

function makeExternalAcceptedAuthorityVerificationRef({ artifact, sourceRowId }) {
  const retainedRecordId = normalizeStringRef(artifact?.retained_record_requirement?.retained_record_id);
  const sourceRowRef = normalizeStringRef(sourceRowId);
  if (retainedRecordId == null || sourceRowRef == null) {
    return null;
  }
  return `${EXTERNAL_ACCEPTED_AUTHORITY_VERIFICATION_REF_PREFIX}${retainedRecordId}:${sourceRowRef}`;
}

function arraysEqual(left, right) {
  return (
    Array.isArray(left) &&
    Array.isArray(right) &&
    left.length === right.length &&
    left.every((entry, index) => entry === right[index])
  );
}

function addVectors(left, right) {
  return left.map((value, index) => value + right[index]);
}

function scaleVector(vector, scale) {
  return vector.map((value) => value * scale);
}

function crossVectors(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function vectorNorm(vector) {
  return Math.hypot(...vector);
}

function normalizeUnitVector(vector) {
  const norm = vectorNorm(vector);
  return norm > 0 ? scaleVector(vector, 1 / norm) : [0, 0, 0];
}

function makeSurfaceVelocity({ seedRow, index, fieldSpeed, surfaceSpeedFraction }) {
  if (surfaceSpeedFraction === 0) {
    return [0, 0, 0];
  }
  const referenceAxis = TANGENT_REFERENCE_AXES[index] ?? TANGENT_REFERENCE_AXES[0];
  const tangentDirection = normalizeUnitVector(crossVectors(referenceAxis, seedRow.position));
  return scaleVector(tangentDirection, fieldSpeed * surfaceSpeedFraction);
}

function makeRunMatrixMetadata({
  proofId,
  runHandle,
  sourceRowId,
  rowKey,
  surfaceSpeedFraction,
  prehistoryMode,
  matrixOptionsActive,
}) {
  if (!matrixOptionsActive) {
    return null;
  }
  return {
    schema: "sh_shell_braid_run_matrix_metadata.v0",
    proof_id: proofId ?? "SH-0",
    run_handle: runHandle,
    source_row_id: sourceRowId,
    target_center_group_velocity: [...rowKey.groupVelocity],
    surface_speed_fraction: surfaceSpeedFraction,
    surface_speed: rowKey.fieldSpeed * surfaceSpeedFraction,
    surface_speed_units: "fraction_of_field_speed",
    surface_velocity_pattern: SURFACE_VELOCITY_PATTERN,
    prehistory_mode: prehistoryMode,
    evidence_status: "diagnostic_candidate_only_not_accepted_evidence",
  };
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function makeSeedRows() {
  return SIX_POINT_SEED.map((row) => ({
    ...row,
    position: [...row.position],
  }));
}

function makePathRow({
  rowPrefix,
  seedRow,
  index,
  rowKey,
  proofId,
  runHandle,
  groupVelocity,
  surfaceSpeedFraction,
  prehistoryMode,
  matrixOptionsActive,
  retainedRecordId,
  providerObjectRef,
  providerArtifactHash,
}) {
  const pathKey = stableUint32(`${rowKey.seedId}:${seedRow.architrino_id}`);
  const surfaceVelocity = makeSurfaceVelocity({
    seedRow,
    index,
    fieldSpeed: rowKey.fieldSpeed,
    surfaceSpeedFraction,
  });
  const releaseVelocity =
    prehistoryMode === DEFAULT_PREHISTORY_MODE
      ? [...groupVelocity]
      : addVectors(groupVelocity, surfaceVelocity);
  const prehistoryVelocity =
    prehistoryMode === "moving-prehistory" ? [...releaseVelocity] : [...groupVelocity];
  const pathRow = {
    pathKey,
    segmentIndex: 0,
    startTime: 0,
    endTime: rowKey.duration,
    start: addVectors(seedRow.position, groupVelocity.map((value) => value * rowKey.holdTime)),
    velocity: releaseVelocity,
    errorBound: DEFAULT_ERROR_BOUND,
    stateFlags: DEFAULT_STATE_FLAGS,
  };
  const pathIdentity = {
    held_release_seed_id: rowKey.seedId,
    architrino_id: seedRow.architrino_id,
    polarity: seedRow.polarity,
    seed_sign: seedRow.sign,
    path_key: pathKey,
    same_run_id: rowKey.sourceRunId,
    source_dataset_id: rowKey.sourceDatasetId,
    retained_record_id: retainedRecordId ?? null,
  };
  const dynamicReplay = {
    replayKind: "held-release-seed-path-row-request",
    fieldSpeed: rowKey.fieldSpeed,
    coupling: rowKey.coupling,
    duration: rowKey.duration,
    dt: rowKey.dt,
    holdTime: rowKey.holdTime,
    groupVelocity,
  };
  if (matrixOptionsActive) {
    dynamicReplay.proofId = proofId ?? "SH-0";
    dynamicReplay.runHandle = runHandle;
    dynamicReplay.targetCenterGroupVelocity = [...groupVelocity];
    dynamicReplay.surfaceSpeedFraction = surfaceSpeedFraction;
    dynamicReplay.surfaceVelocity = [...surfaceVelocity];
    dynamicReplay.releaseVelocity = [...releaseVelocity];
    dynamicReplay.prehistoryVelocity = [...prehistoryVelocity];
    dynamicReplay.prehistoryMode = prehistoryMode;
    dynamicReplay.surfaceVelocityPattern = SURFACE_VELOCITY_PATTERN;
  }
  const artifactInput = {
    schema: "held_release_seed_path_row.v0",
    pathIdentity,
    pathRow,
    dynamicReplay,
  };
  const artifactHash = stableHash(artifactInput);
  const retainedRecordPresent = typeof retainedRecordId === "string" && retainedRecordId.length > 0;
  const providerBacked = retainedRecordPresent && providerObjectRef != null;
  const firstMissingField = retainedRecordPresent
    ? providerBacked
      ? "held_release_seed_path_rows.acceptance_certificate_ref"
      : "held_release_seed_path_rows[*].provider_provenance.provider_object_ref"
    : FIRST_MISSING_FIELD;
  return {
    row_id: `${rowPrefix}:path-row:${index}:${pathKey.toString(16)}`,
    schema: "held_release_seed_path_row.v0",
    authority_class: providerBacked
      ? "same_run_path_row_provider_backed_acceptance_blocked"
      : retainedRecordPresent
        ? "same_run_path_row_missing_provider_provenance"
        : "same_run_path_row_request_missing_retained_record",
    accepted: false,
    path_identity: pathIdentity,
    solver_path_history_row_f64: pathRow,
    dynamic_replay_metadata: {
      schema: "held-release-seed-path-dynamic-replay.v0",
      replay_kind: "held-release-seed-path-row-request",
      field_speed: rowKey.fieldSpeed,
      coupling: rowKey.coupling,
      duration: rowKey.duration,
      dt: rowKey.dt,
      hold_time: rowKey.holdTime,
      group_velocity: [...groupVelocity],
      clean_central_solver_contract: "SolverPathHistoryRowF64",
      source_run_id: rowKey.sourceRunId,
      source_dataset_id: rowKey.sourceDatasetId,
      retained_record_id: retainedRecordId ?? null,
      ...(matrixOptionsActive
        ? {
            proof_id: proofId ?? "SH-0",
            run_handle: runHandle,
            target_center_group_velocity: [...groupVelocity],
            surface_speed_fraction: surfaceSpeedFraction,
            surface_speed: rowKey.fieldSpeed * surfaceSpeedFraction,
            surface_velocity: [...surfaceVelocity],
            release_velocity: [...releaseVelocity],
            prehistory_velocity: [...prehistoryVelocity],
            prehistory_mode: prehistoryMode,
            surface_velocity_pattern: SURFACE_VELOCITY_PATTERN,
          }
        : {}),
    },
    same_record_binding: {
      required: true,
      retained_record_id: retainedRecordId ?? null,
      status: providerBacked
        ? "provider_backed_retained_record_present_unaccepted"
        : retainedRecordPresent
          ? "retained_record_id_present_unaccepted"
          : "missing_retained_record_id",
      first_missing_field: firstMissingField,
    },
    provider_provenance: {
      required: true,
      provider_object_ref: providerObjectRef,
      provider_artifact_hash: providerArtifactHash,
      source_run_id: rowKey.sourceRunId,
      source_dataset_id: rowKey.sourceDatasetId,
      status: providerBacked ? "provider_object_ref_present_unaccepted" : "missing_provider_object_ref",
      first_missing_field: firstMissingField,
    },
    artifact_hash: artifactHash,
    first_missing_object: providerBacked
      ? "held_release_seed_path_rows_acceptance_certificate"
      : retainedRecordPresent
        ? "held_release_seed_path_rows_provider_object"
        : FIRST_MISSING_OBJECT,
    first_missing_field: firstMissingField,
  };
}

export function evaluateHeldReleaseSeedPathRowsEvidence(candidate = {}) {
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
      reason: "schema_not_held_release_seed_path_rows_v0",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (!Array.isArray(candidate.rows) || candidate.rows.length !== 6) {
    return {
      accepted: false,
      reason: "six_held_release_seed_path_rows_required",
      first_missing_field: "held_release_seed_path_rows.rows",
    };
  }
  if (candidate.rows.some((row) => row?.same_record_binding?.retained_record_id == null)) {
    return {
      accepted: false,
      reason: "retained_record_id_missing",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (candidate.rows.some((row) => row?.provider_provenance?.provider_object_ref == null)) {
    return {
      accepted: false,
      reason: "provider_provenance_missing",
      first_missing_field: "held_release_seed_path_rows[*].provider_provenance.provider_object_ref",
    };
  }
  return {
    accepted: false,
    reason: "producer_does_not_authorize_accepted_path_row_evidence",
    first_missing_field: ACCEPTANCE_CERTIFICATE_FIELD,
  };
}

function makeAcceptanceCertificateExpectation({ artifact, sourceRowId }) {
  const acceptedCertificateRefPrefix = makeAcceptedSeedPathCertificateRefPrefix({ artifact, sourceRowId });
  return {
    schema: ACCEPTANCE_CERTIFICATE_SCHEMA,
    accepted_held_release_seed_path_rows: true,
    accepted_same_record_evidence: true,
    non_repo_external_authority: true,
    external_accepted_authority_ref: makeExternalAcceptedAuthorityRef({ artifact, sourceRowId }),
    external_accepted_authority_verification_ref: makeExternalAcceptedAuthorityVerificationRef({
      artifact,
      sourceRowId,
    }),
    held_release_seed_path_rows_acceptance_certificate_ref:
      acceptedCertificateRefPrefix == null ? null : `${acceptedCertificateRefPrefix}<certificate-ref>`,
    held_release_seed_path_rows_artifact_id: artifact?.artifact_id ?? null,
    held_release_seed_path_rows_artifact_hash: artifact?.artifact_hash ?? null,
    retained_record_id: artifact?.retained_record_requirement?.retained_record_id ?? null,
    source_row_id: normalizeStringRef(sourceRowId),
    source_run_id: artifact?.source_run_identity?.source_run_id ?? null,
    source_dataset_id: artifact?.source_run_identity?.source_dataset_id ?? null,
    provider_object_ref: artifact?.rows?.[0]?.provider_provenance?.provider_object_ref ?? null,
    provider_artifact_hash: artifact?.rows?.[0]?.provider_provenance?.provider_artifact_hash ?? null,
    row_ids: artifact?.rows?.map((row) => row?.row_id) ?? [],
    row_artifact_hashes: artifact?.rows?.map((row) => row?.artifact_hash) ?? [],
    negative_control_rejection_verified: true,
  };
}

function makeExternalAcceptedAuthorityPackageExpectation({ artifact, sourceRowId, certificate }) {
  const certificateRef = normalizeStringRef(certificate?.held_release_seed_path_rows_acceptance_certificate_ref);
  const certificateHash = certificate == null || Object.keys(certificate).length === 0 ? null : stableHash(certificate);
  return {
    schema: EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_SCHEMA,
    accepted_external_authority: true,
    non_repo_external_authority: true,
    external_accepted_authority_package_ref: makeExternalAcceptedAuthorityPackageRef({ artifact, sourceRowId }),
    external_accepted_authority_ref: normalizeStringRef(certificate?.external_accepted_authority_ref),
    external_accepted_authority_verification_ref: normalizeStringRef(
      certificate?.external_accepted_authority_verification_ref
    ),
    verified_certificate_schema: ACCEPTANCE_CERTIFICATE_SCHEMA,
    verified_certificate_ref: certificateRef,
    verified_certificate_artifact_hash: certificateHash,
    held_release_seed_path_rows_artifact_id: artifact?.artifact_id ?? null,
    held_release_seed_path_rows_artifact_hash: artifact?.artifact_hash ?? null,
    retained_record_id: artifact?.retained_record_requirement?.retained_record_id ?? null,
    source_row_id: normalizeStringRef(sourceRowId),
    source_run_id: artifact?.source_run_identity?.source_run_id ?? null,
    source_dataset_id: artifact?.source_run_identity?.source_dataset_id ?? null,
    provider_object_ref: artifact?.rows?.[0]?.provider_provenance?.provider_object_ref ?? null,
    provider_artifact_hash: artifact?.rows?.[0]?.provider_provenance?.provider_artifact_hash ?? null,
    row_ids: artifact?.rows?.map((row) => row?.row_id) ?? [],
    row_artifact_hashes: artifact?.rows?.map((row) => row?.artifact_hash) ?? [],
    negative_control_rejection_verified: true,
  };
}

function acceptanceCertificateMissingFields({ artifact, sourceRowId, certificate }) {
  const missingFields = [];
  const hasCertificateInput = certificate != null && Object.keys(certificate).length > 0;
  if (!hasCertificateInput) {
    return [ACCEPTANCE_CERTIFICATE_FIELD];
  }
  const expected = makeAcceptanceCertificateExpectation({ artifact, sourceRowId });
  const expectedCertificateRefPrefix = makeAcceptedSeedPathCertificateRefPrefix({ artifact, sourceRowId });
  if (certificate?.schema !== ACCEPTANCE_CERTIFICATE_SCHEMA) {
    missingFields.push("held_release_seed_path_rows.acceptance_certificate.schema");
  }
  if (certificate?.accepted_held_release_seed_path_rows !== true) {
    missingFields.push("held_release_seed_path_rows.acceptance_certificate.accepted_held_release_seed_path_rows");
  }
  if (certificate?.accepted_same_record_evidence !== true) {
    missingFields.push("held_release_seed_path_rows.acceptance_certificate.accepted_same_record_evidence");
  }
  if (certificate?.non_repo_external_authority !== true) {
    missingFields.push("held_release_seed_path_rows.acceptance_certificate.non_repo_external_authority");
  }
  if (externalAuthorityRef(certificate?.external_accepted_authority_ref) == null) {
    missingFields.push("held_release_seed_path_rows.acceptance_certificate.external_accepted_authority_ref");
  } else {
    pushMissingUnlessMatchingString({
      missingFields,
      value: certificate?.external_accepted_authority_ref,
      expected: expected.external_accepted_authority_ref,
      field: "held_release_seed_path_rows.acceptance_certificate.external_accepted_authority_ref",
    });
  }
  if (externalVerificationRef(certificate?.external_accepted_authority_verification_ref) == null) {
    missingFields.push(
      "held_release_seed_path_rows.acceptance_certificate.external_accepted_authority_verification_ref"
    );
  } else {
    pushMissingUnlessMatchingString({
      missingFields,
      value: certificate?.external_accepted_authority_verification_ref,
      expected: expected.external_accepted_authority_verification_ref,
      field: "held_release_seed_path_rows.acceptance_certificate.external_accepted_authority_verification_ref",
    });
  }
  if (
    acceptedSeedPathCertificateRef(
      certificate?.held_release_seed_path_rows_acceptance_certificate_ref,
      expectedCertificateRefPrefix
    ) == null
  ) {
    missingFields.push(
      "held_release_seed_path_rows.acceptance_certificate.held_release_seed_path_rows_acceptance_certificate_ref"
    );
  }
  pushMissingUnlessMatchingString({
    missingFields,
    value: certificate?.held_release_seed_path_rows_artifact_id,
    expected: expected.held_release_seed_path_rows_artifact_id,
    field: "held_release_seed_path_rows.acceptance_certificate.held_release_seed_path_rows_artifact_id",
  });
  pushMissingUnlessMatchingString({
    missingFields,
    value: certificate?.held_release_seed_path_rows_artifact_hash,
    expected: expected.held_release_seed_path_rows_artifact_hash,
    field: "held_release_seed_path_rows.acceptance_certificate.held_release_seed_path_rows_artifact_hash",
  });
  pushMissingUnlessMatchingString({
    missingFields,
    value: certificate?.retained_record_id,
    expected: expected.retained_record_id,
    field: "held_release_seed_path_rows.acceptance_certificate.retained_record_id",
  });
  pushMissingUnlessMatchingString({
    missingFields,
    value: certificate?.source_row_id,
    expected: expected.source_row_id,
    field: "held_release_seed_path_rows.acceptance_certificate.source_row_id",
  });
  pushMissingUnlessMatchingString({
    missingFields,
    value: certificate?.source_run_id,
    expected: expected.source_run_id,
    field: "held_release_seed_path_rows.acceptance_certificate.source_run_id",
  });
  pushMissingUnlessMatchingString({
    missingFields,
    value: certificate?.source_dataset_id,
    expected: expected.source_dataset_id,
    field: "held_release_seed_path_rows.acceptance_certificate.source_dataset_id",
  });
  pushMissingUnlessMatchingString({
    missingFields,
    value: certificate?.provider_object_ref,
    expected: expected.provider_object_ref,
    field: "held_release_seed_path_rows.acceptance_certificate.provider_object_ref",
  });
  pushMissingUnlessMatchingString({
    missingFields,
    value: certificate?.provider_artifact_hash,
    expected: expected.provider_artifact_hash,
    field: "held_release_seed_path_rows.acceptance_certificate.provider_artifact_hash",
  });
  if (!arraysEqual(certificate?.row_ids, expected.row_ids)) {
    missingFields.push("held_release_seed_path_rows.acceptance_certificate.row_ids");
  }
  if (!arraysEqual(certificate?.row_artifact_hashes, expected.row_artifact_hashes)) {
    missingFields.push("held_release_seed_path_rows.acceptance_certificate.row_artifact_hashes");
  }
  if (certificate?.negative_control_rejection_verified !== true) {
    missingFields.push("held_release_seed_path_rows.acceptance_certificate.negative_control_rejection_verified");
  }
  return missingFields;
}

function externalAcceptedAuthorityPackageMissingFields({ artifact, sourceRowId, certificate, authorityPackage }) {
  const missingFields = [];
  const hasAuthorityPackageInput = authorityPackage != null && Object.keys(authorityPackage).length > 0;
  if (!hasAuthorityPackageInput) {
    return [EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_FIELD];
  }
  const expected = makeExternalAcceptedAuthorityPackageExpectation({ artifact, sourceRowId, certificate });
  if (authorityPackage?.schema !== EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_SCHEMA) {
    missingFields.push("held_release_seed_path_rows.external_authority.schema");
  }
  if (authorityPackage?.accepted_external_authority !== true) {
    missingFields.push("held_release_seed_path_rows.external_authority.accepted_external_authority");
  }
  if (authorityPackage?.non_repo_external_authority !== true) {
    missingFields.push("held_release_seed_path_rows.external_authority.non_repo_external_authority");
  }
  if (externalAuthorityPackageRef(authorityPackage?.external_accepted_authority_package_ref) == null) {
    missingFields.push(
      "held_release_seed_path_rows.external_authority.external_accepted_authority_package_ref"
    );
  } else {
    pushMissingUnlessMatchingString({
      missingFields,
      value: authorityPackage?.external_accepted_authority_package_ref,
      expected: expected.external_accepted_authority_package_ref,
      field: "held_release_seed_path_rows.external_authority.external_accepted_authority_package_ref",
    });
  }
  pushMissingUnlessMatchingString({
    missingFields,
    value: authorityPackage?.external_accepted_authority_ref,
    expected: expected.external_accepted_authority_ref,
    field: "held_release_seed_path_rows.external_authority.external_accepted_authority_ref",
  });
  pushMissingUnlessMatchingString({
    missingFields,
    value: authorityPackage?.external_accepted_authority_verification_ref,
    expected: expected.external_accepted_authority_verification_ref,
    field: "held_release_seed_path_rows.external_authority.external_accepted_authority_verification_ref",
  });
  pushMissingUnlessMatchingString({
    missingFields,
    value: authorityPackage?.verified_certificate_schema,
    expected: expected.verified_certificate_schema,
    field: "held_release_seed_path_rows.external_authority.verified_certificate_schema",
  });
  pushMissingUnlessMatchingString({
    missingFields,
    value: authorityPackage?.verified_certificate_ref,
    expected: expected.verified_certificate_ref,
    field: "held_release_seed_path_rows.external_authority.verified_certificate_ref",
  });
  pushMissingUnlessMatchingString({
    missingFields,
    value: authorityPackage?.verified_certificate_artifact_hash,
    expected: expected.verified_certificate_artifact_hash,
    field: "held_release_seed_path_rows.external_authority.verified_certificate_artifact_hash",
  });
  pushMissingUnlessMatchingString({
    missingFields,
    value: authorityPackage?.held_release_seed_path_rows_artifact_id,
    expected: expected.held_release_seed_path_rows_artifact_id,
    field: "held_release_seed_path_rows.external_authority.held_release_seed_path_rows_artifact_id",
  });
  pushMissingUnlessMatchingString({
    missingFields,
    value: authorityPackage?.held_release_seed_path_rows_artifact_hash,
    expected: expected.held_release_seed_path_rows_artifact_hash,
    field: "held_release_seed_path_rows.external_authority.held_release_seed_path_rows_artifact_hash",
  });
  pushMissingUnlessMatchingString({
    missingFields,
    value: authorityPackage?.retained_record_id,
    expected: expected.retained_record_id,
    field: "held_release_seed_path_rows.external_authority.retained_record_id",
  });
  pushMissingUnlessMatchingString({
    missingFields,
    value: authorityPackage?.source_row_id,
    expected: expected.source_row_id,
    field: "held_release_seed_path_rows.external_authority.source_row_id",
  });
  pushMissingUnlessMatchingString({
    missingFields,
    value: authorityPackage?.source_run_id,
    expected: expected.source_run_id,
    field: "held_release_seed_path_rows.external_authority.source_run_id",
  });
  pushMissingUnlessMatchingString({
    missingFields,
    value: authorityPackage?.source_dataset_id,
    expected: expected.source_dataset_id,
    field: "held_release_seed_path_rows.external_authority.source_dataset_id",
  });
  pushMissingUnlessMatchingString({
    missingFields,
    value: authorityPackage?.provider_object_ref,
    expected: expected.provider_object_ref,
    field: "held_release_seed_path_rows.external_authority.provider_object_ref",
  });
  pushMissingUnlessMatchingString({
    missingFields,
    value: authorityPackage?.provider_artifact_hash,
    expected: expected.provider_artifact_hash,
    field: "held_release_seed_path_rows.external_authority.provider_artifact_hash",
  });
  if (!arraysEqual(authorityPackage?.row_ids, expected.row_ids)) {
    missingFields.push("held_release_seed_path_rows.external_authority.row_ids");
  }
  if (!arraysEqual(authorityPackage?.row_artifact_hashes, expected.row_artifact_hashes)) {
    missingFields.push("held_release_seed_path_rows.external_authority.row_artifact_hashes");
  }
  if (authorityPackage?.negative_control_rejection_verified !== true) {
    missingFields.push("held_release_seed_path_rows.external_authority.negative_control_rejection_verified");
  }
  return missingFields;
}

export function evaluateHeldReleaseSeedPathRowsAcceptanceCertificate({
  artifact,
  sourceRowId,
  certificate = {},
  externalAuthorityPackage = {},
} = {}) {
  const expected = makeAcceptanceCertificateExpectation({ artifact, sourceRowId });
  const missingFields = acceptanceCertificateMissingFields({ artifact, sourceRowId, certificate });
  const certificateConditionallyVerified = missingFields.length === 0;
  const expectedExternalAuthorityPackage = makeExternalAcceptedAuthorityPackageExpectation({
    artifact,
    sourceRowId,
    certificate,
  });
  const externalAuthorityPackageMissingFields = certificateConditionallyVerified
    ? externalAcceptedAuthorityPackageMissingFields({
        artifact,
        sourceRowId,
        certificate,
        authorityPackage: externalAuthorityPackage,
      })
    : [];
  const externalAuthorityPackageConditionallyVerified =
    certificateConditionallyVerified && externalAuthorityPackageMissingFields.length === 0;
  const conditionallyVerified =
    certificateConditionallyVerified && externalAuthorityPackageConditionallyVerified;
  const firstMissingObject = conditionallyVerified
    ? REPO_AUTHORIZATION_OBJECT
    : certificateConditionallyVerified
      ? "held_release_seed_path_rows_external_accepted_authority_package"
      : "held_release_seed_path_rows_acceptance_certificate";
  const firstMissingField = conditionallyVerified
    ? REPO_AUTHORIZATION_FIELD
    : certificateConditionallyVerified
      ? (externalAuthorityPackageMissingFields[0] ?? EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_FIELD)
      : (missingFields[0] ?? ACCEPTANCE_CERTIFICATE_FIELD);
  const requirementMissingFields = conditionallyVerified
    ? [REPO_AUTHORIZATION_FIELD]
    : [...missingFields, ...externalAuthorityPackageMissingFields];
  return {
    schema: ACCEPTANCE_CERTIFICATE_VERIFICATION_SCHEMA,
    accepted: false,
    certificate_conditionally_verified: certificateConditionallyVerified,
    external_authority_package_conditionally_verified: externalAuthorityPackageConditionallyVerified,
    conditionally_verified: conditionallyVerified,
    status: conditionallyVerified
      ? "seed_path_acceptance_certificate_and_external_authority_conditionally_verified_repo_authorization_blocked"
      : certificateConditionallyVerified
        ? "seed_path_acceptance_certificate_verified_external_authority_package_missing_or_unverified"
        : "seed_path_acceptance_certificate_missing_or_unverified",
    required_certificate_schema: ACCEPTANCE_CERTIFICATE_SCHEMA,
    required_certificate_ref_prefix:
      makeAcceptedSeedPathCertificateRefPrefix({ artifact, sourceRowId }) ?? ACCEPTANCE_CERTIFICATE_REF_PREFIX,
    required_certificate_fields: [...REQUIRED_ACCEPTANCE_CERTIFICATE_FIELDS],
    required_external_authority_ref: expected.external_accepted_authority_ref,
    required_external_authority_ref_prefix: EXTERNAL_ACCEPTED_AUTHORITY_REF_PREFIX,
    required_external_authority_verification_ref: expected.external_accepted_authority_verification_ref,
    required_external_authority_verification_ref_prefix: EXTERNAL_ACCEPTED_AUTHORITY_VERIFICATION_REF_PREFIX,
    required_external_authority_package_schema: EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_SCHEMA,
    required_external_authority_package_ref:
      expectedExternalAuthorityPackage.external_accepted_authority_package_ref,
    required_external_authority_package_ref_prefix: EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_REF_PREFIX,
    required_external_authority_package_fields: [...REQUIRED_EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_FIELDS],
    required_repo_authorization_object: REPO_AUTHORIZATION_OBJECT,
    required_repo_authorization_field: REPO_AUTHORIZATION_FIELD,
    repo_authorization_status: conditionallyVerified
      ? "missing_after_conditionally_verified_external_authority_package"
      : "pending_seed_path_certificate_and_external_authority_package",
    expected_certificate_payload: expected,
    expected_external_authority_package_payload: expectedExternalAuthorityPackage,
    supplied_certificate_ref: normalizeStringRef(certificate?.held_release_seed_path_rows_acceptance_certificate_ref),
    supplied_external_accepted_authority_ref: normalizeStringRef(certificate?.external_accepted_authority_ref),
    supplied_external_accepted_authority_verification_ref: normalizeStringRef(
      certificate?.external_accepted_authority_verification_ref
    ),
    supplied_external_authority_package_ref: normalizeStringRef(
      externalAuthorityPackage?.external_accepted_authority_package_ref
    ),
    missing_fields: requirementMissingFields,
    first_missing_object: firstMissingObject,
    first_missing_field: firstMissingField,
    authorization: makeAuthorization(),
  };
}

export function buildHeldReleaseSeedPathRowsAcceptanceCertificateRequirement(options = {}) {
  const artifact = options.artifact ?? buildHeldReleaseSeedPathRows(options);
  const sourceRowId = normalizeStringRef(options.sourceRowId);
  const verification = evaluateHeldReleaseSeedPathRowsAcceptanceCertificate({
    artifact,
    sourceRowId,
    certificate: options.acceptanceCertificate ?? {},
    externalAuthorityPackage: options.externalAuthorityPackage ?? {},
  });
  return {
    schema: ACCEPTANCE_CERTIFICATE_REQUIREMENT_SCHEMA,
    accepted: false,
    requirement_passed: verification.accepted === true,
    status: verification.conditionally_verified
      ? "seed_path_acceptance_certificate_and_external_authority_conditionally_verified_repo_authorization_blocked"
      : verification.certificate_conditionally_verified
        ? "seed_path_external_authority_package_missing"
        : "seed_path_acceptance_certificate_missing",
    retained_record_id: artifact?.retained_record_requirement?.retained_record_id ?? null,
    source_row_id: sourceRowId,
    source_run_id: artifact?.source_run_identity?.source_run_id ?? null,
    source_dataset_id: artifact?.source_run_identity?.source_dataset_id ?? null,
    artifact_id: artifact?.artifact_id ?? null,
    artifact_hash: artifact?.artifact_hash ?? null,
    required_certificate_schema: ACCEPTANCE_CERTIFICATE_SCHEMA,
    required_certificate_ref_prefix:
      makeAcceptedSeedPathCertificateRefPrefix({ artifact, sourceRowId }) ?? ACCEPTANCE_CERTIFICATE_REF_PREFIX,
    required_certificate_fields: [...REQUIRED_ACCEPTANCE_CERTIFICATE_FIELDS],
    required_external_authority_ref:
      verification.expected_certificate_payload.external_accepted_authority_ref,
    required_external_authority_ref_prefix: EXTERNAL_ACCEPTED_AUTHORITY_REF_PREFIX,
    required_external_authority_verification_ref:
      verification.expected_certificate_payload.external_accepted_authority_verification_ref,
    required_external_authority_verification_ref_prefix: EXTERNAL_ACCEPTED_AUTHORITY_VERIFICATION_REF_PREFIX,
    required_external_authority_package_schema: EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_SCHEMA,
    required_external_authority_package_ref:
      verification.expected_external_authority_package_payload.external_accepted_authority_package_ref,
    required_external_authority_package_ref_prefix: EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_REF_PREFIX,
    required_external_authority_package_fields: [...REQUIRED_EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_FIELDS],
    required_repo_authorization_object: verification.required_repo_authorization_object,
    required_repo_authorization_field: verification.required_repo_authorization_field,
    repo_authorization_status: verification.repo_authorization_status,
    acceptance_certificate_verification: verification,
    first_missing_object: verification.first_missing_object,
    first_missing_field: verification.first_missing_field,
    missing_fields: verification.missing_fields,
    authorization: makeAuthorization(),
  };
}

export function buildHeldReleaseSeedPathRows(options = {}) {
  const groupVelocity = normalizeVector(options.groupVelocity, DEFAULT_GROUP_VELOCITY);
  const proofId = normalizeStringRef(options.proofId);
  const runHandle = normalizeStringRef(options.runHandle);
  const sourceRowId = normalizeStringRef(options.sourceRowId);
  const prehistoryMode = normalizePrehistoryMode(options.prehistoryMode);
  const surfaceSpeedFraction = normalizeFiniteNumber(
    options.surfaceSpeedFraction,
    0,
    "surfaceSpeedFraction"
  );
  if (surfaceSpeedFraction < 0) {
    throw new TypeError("surfaceSpeedFraction must be nonnegative");
  }
  const providerObjectRef = normalizeStringRef(options.providerObjectRef);
  const providerArtifactHash = normalizeStringRef(options.providerArtifactHash);
  const rowKey = {
    schema: SCHEMA,
    seedId: options.seedId ?? DEFAULT_SEED_ID,
    routeId: options.routeId ?? DEFAULT_ROUTE_ID,
    sourceRunId: options.sourceRunId ?? DEFAULT_RUN_ID,
    sourceDatasetId: options.sourceDatasetId ?? `${options.sourceRunId ?? DEFAULT_RUN_ID}:dataset`,
    fieldSpeed: normalizeNumber(options.fieldSpeed, DEFAULT_FIELD_SPEED),
    coupling: normalizeNumber(options.coupling, DEFAULT_COUPLING),
    duration: normalizeNumber(options.duration, DEFAULT_DURATION),
    dt: normalizeNumber(options.dt, DEFAULT_TIME_STEP),
    holdTime: normalizeNumber(options.holdTime, DEFAULT_HOLD_TIME),
    groupVelocity,
  };
  const matrixOptionsActive =
    runHandle != null ||
    proofId != null ||
    prehistoryMode !== DEFAULT_PREHISTORY_MODE ||
    surfaceSpeedFraction !== 0 ||
    options.matrixOptionsActive === true;
  const rowKeyHashInput = matrixOptionsActive
    ? {
        ...rowKey,
        proofId: proofId ?? "SH-0",
        runHandle,
        sourceRowId,
        surfaceSpeedFraction,
        prehistoryMode,
        surfaceVelocityPattern: SURFACE_VELOCITY_PATTERN,
      }
    : rowKey;
  const retainedRecordId =
    typeof options.retainedRecordId === "string" && options.retainedRecordId.length > 0
      ? options.retainedRecordId
      : null;
  const artifactHash = stableHash({ ...rowKeyHashInput, retainedRecordId });
  const rowPrefix = `held_release_seed_path_rows:${artifactHash.slice(0, 16)}`;
  const runMatrixMetadata = makeRunMatrixMetadata({
    proofId,
    runHandle,
    sourceRowId,
    rowKey,
    surfaceSpeedFraction,
    prehistoryMode,
    matrixOptionsActive,
  });
  const rows = makeSeedRows().map((seedRow, index) =>
    makePathRow({
      rowPrefix,
      seedRow,
      index,
      rowKey,
      proofId,
      runHandle,
      groupVelocity,
      surfaceSpeedFraction,
      prehistoryMode,
      matrixOptionsActive,
      retainedRecordId,
      providerObjectRef,
      providerArtifactHash,
    })
  );
  const evidence = evaluateHeldReleaseSeedPathRowsEvidence({ schema: SCHEMA, rows });
  const firstMissingObject =
    evidence.first_missing_field === FIRST_MISSING_FIELD
      ? FIRST_MISSING_OBJECT
      : evidence.reason === "provider_provenance_missing"
        ? "held_release_seed_path_rows_provider_object"
        : "held_release_seed_path_rows_acceptance_certificate";
  const providerBacked = evidence.reason === "producer_does_not_authorize_accepted_path_row_evidence";

  return {
    schema: SCHEMA,
    artifact_id: rowPrefix,
    artifact_hash: artifactHash,
    seed_id: rowKey.seedId,
    route_id: rowKey.routeId,
    ...(sourceRowId == null ? {} : { source_row_id: sourceRowId }),
    ...(runMatrixMetadata == null ? {} : { run_matrix_metadata: runMatrixMetadata }),
    source_run_identity: {
      same_run_required: true,
      source_run_id: rowKey.sourceRunId,
      source_dataset_id: rowKey.sourceDatasetId,
      source_run_authority: "declared_clean_central_solver_input_not_accepted_evidence",
    },
    row_contract: {
      clean_central_solver_contract: "SolverPathHistoryRowF64",
      required_layout: "path_segment.v1",
      required_row_count: 6,
      manifest_consumer_schema: "held_release_path_history_stream_manifest_set.v0",
    },
    retained_record_requirement: {
      required: true,
      retained_record_id: retainedRecordId,
      same_record_binding_status: providerBacked
        ? "provider_backed_retained_record_present_unaccepted"
        : retainedRecordId
          ? "retained_record_id_present_unaccepted"
          : "missing_retained_record_id",
      first_missing_field: providerBacked
        ? "held_release_seed_path_rows.acceptance_certificate_ref"
        : retainedRecordId
          ? "held_release_seed_path_rows[*].provider_provenance.provider_object_ref"
          : FIRST_MISSING_FIELD,
    },
    dynamic_replay_requirements: {
      required: true,
      replay_kind: "held-release-seed-path-row-request",
      field_speed: rowKey.fieldSpeed,
      coupling: rowKey.coupling,
      duration: rowKey.duration,
      dt: rowKey.dt,
      hold_time: rowKey.holdTime,
      group_velocity: [...groupVelocity],
      ...(runMatrixMetadata == null
        ? {}
        : {
            proof_id: runMatrixMetadata.proof_id,
            run_handle: runMatrixMetadata.run_handle,
            source_row_id: runMatrixMetadata.source_row_id,
            target_center_group_velocity: runMatrixMetadata.target_center_group_velocity,
            surface_speed_fraction: runMatrixMetadata.surface_speed_fraction,
            surface_speed: runMatrixMetadata.surface_speed,
            prehistory_mode: runMatrixMetadata.prehistory_mode,
            surface_velocity_pattern: runMatrixMetadata.surface_velocity_pattern,
          }),
    },
    rows,
    artifact_status:
      evidence.reason === "retained_record_id_missing"
        ? "fail_closed_missing_retained_record_id"
        : evidence.reason === "provider_provenance_missing"
          ? "fail_closed_missing_provider_provenance"
          : "provider_backed_seed_path_rows_present_acceptance_blocked",
    source_status: providerBacked ? "candidate_provider_backed_source_unaccepted" : "source_acquisition_blocked",
    first_missing_object: firstMissingObject,
    first_missing_field: evidence.first_missing_field,
    evidence_evaluation: evidence,
    evidence_status: {
      accepted: false,
      accepted_evidence_status: providerBacked
        ? "candidate_provider_backed_source_unaccepted"
        : "source_acquisition_blocked",
      claim_level: "diagnostic_candidate_only_not_accepted_evidence",
      first_missing_object: firstMissingObject,
      first_missing_field: evidence.first_missing_field,
      source_artifact_id: rowPrefix,
      source_artifact_hash: artifactHash,
      source_row_id: sourceRowId,
    },
    authorization: makeAuthorization(),
    negative_controls: Object.entries(NEGATIVE_CONTROL_REASONS).map(([evidence_class, reason]) => ({
      evidence_class,
      accepted: false,
      reason,
    })),
  };
}

export function validateHeldReleaseSeedPathRows(artifact) {
  const errors = [];
  const providerBacked = artifact?.source_status === "candidate_provider_backed_source_unaccepted";
  if (artifact?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (!Array.isArray(artifact?.rows) || artifact.rows.length !== 6) {
    errors.push("six held-release seed path rows are required");
  }
  if (!providerBacked && artifact?.first_missing_field !== FIRST_MISSING_FIELD) {
    errors.push(`first missing field must be ${FIRST_MISSING_FIELD}`);
  }
  if (providerBacked && artifact?.first_missing_field !== "held_release_seed_path_rows.acceptance_certificate_ref") {
    errors.push("provider-backed seed path rows must point to the missing acceptance certificate");
  }
  if (!providerBacked && artifact?.retained_record_requirement?.retained_record_id != null) {
    errors.push("default producer output must not claim retained_record_id");
  }
  const runIds = new Set(artifact?.rows?.map((row) => row?.path_identity?.same_run_id));
  if (runIds.size !== 1) {
    errors.push("all path rows must share one same-run identity");
  }
  const pathKeys = new Set(artifact?.rows?.map((row) => row?.solver_path_history_row_f64?.pathKey));
  if (pathKeys.size !== 6) {
    errors.push("six distinct pathKey values are required");
  }
  for (const row of artifact?.rows ?? []) {
    if (row?.schema !== "held_release_seed_path_row.v0") {
      errors.push("each row must use held_release_seed_path_row.v0");
    }
    if (row?.solver_path_history_row_f64?.segmentIndex !== 0) {
      errors.push("each seed row must use segmentIndex 0");
    }
    if (row?.solver_path_history_row_f64?.startTime !== 0) {
      errors.push("each seed row must start at time 0");
    }
    if (!providerBacked && row?.same_record_binding?.retained_record_id != null) {
      errors.push("default seed path rows must not claim retained_record_id");
    }
    if (!providerBacked && row?.provider_provenance?.provider_object_ref != null) {
      errors.push("default seed path rows must not claim provider_object_ref");
    }
    if (providerBacked && row?.same_record_binding?.retained_record_id == null) {
      errors.push("provider-backed seed path rows must carry retained_record_id");
    }
    if (providerBacked && row?.provider_provenance?.provider_object_ref == null) {
      errors.push("provider-backed seed path rows must carry provider_object_ref");
    }
  }
  for (const flag of AUTHORIZATION_FLAGS) {
    if (artifact?.authorization?.[flag] !== false) {
      errors.push(`${flag} must remain false`);
    }
  }
  if (artifact?.authorization?.scoreMovement !== "no_score_increase") {
    errors.push("scoreMovement must remain no_score_increase");
  }
  return errors;
}

function cliStringOption(name) {
  return process.argv.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3) ?? null;
}

function cliNumberOption(name) {
  const value = cliStringOption(name);
  return value == null ? undefined : Number(value);
}

function cliVectorOption(name) {
  const value = cliStringOption(name);
  if (value == null) {
    return undefined;
  }
  const parts = value.split(",").map((entry) => Number(entry.trim()));
  if (parts.length !== 3 || parts.some((entry) => !Number.isFinite(entry))) {
    throw new TypeError(`--${name} must be a comma-separated vector with three finite numbers`);
  }
  return parts;
}

function cliJsonOption(name) {
  const path = cliStringOption(name);
  if (path == null) {
    return null;
  }
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

function runCli() {
  let acceptanceCertificate = null;
  let externalAuthorityPackage = null;
  try {
    acceptanceCertificate = cliJsonOption("acceptance-certificate-json");
    externalAuthorityPackage = cliJsonOption("external-authority-package-json");
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
    return;
  }
  const artifact = buildHeldReleaseSeedPathRows({
    proofId: cliStringOption("proof-id"),
    runHandle: cliStringOption("run-handle"),
    sourceRowId: cliStringOption("source-row-id"),
    groupVelocity: cliVectorOption("target-center-group-velocity") ?? cliVectorOption("group-velocity"),
    surfaceSpeedFraction: cliNumberOption("surface-speed-fraction") ?? cliNumberOption("surface-speed"),
    prehistoryMode: cliStringOption("prehistory-mode"),
    retainedRecordId: cliStringOption("retained-record-id"),
    providerObjectRef: cliStringOption("provider-object-ref"),
    providerArtifactHash: cliStringOption("provider-artifact-hash"),
  });
  const errors = validateHeldReleaseSeedPathRows(artifact);
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
    return;
  }
  const pretty = process.argv.includes("--pretty");
  const certificateRequirement = buildHeldReleaseSeedPathRowsAcceptanceCertificateRequirement({
    artifact,
    sourceRowId: cliStringOption("source-row-id"),
    acceptanceCertificate: acceptanceCertificate ?? {},
    externalAuthorityPackage: externalAuthorityPackage ?? {},
  });
  if (process.argv.includes("--print-acceptance-certificate-requirement")) {
    console.log(JSON.stringify(certificateRequirement, null, pretty ? 2 : 0));
    return;
  }
  if (
    process.argv.includes("--require-acceptance-certificate") &&
    certificateRequirement.requirement_passed !== true
  ) {
    console.error(JSON.stringify(certificateRequirement, null, pretty ? 2 : 0));
    process.exitCode = 1;
    return;
  }
  const output =
    acceptanceCertificate == null
      ? artifact
      : {
          ...artifact,
          acceptance_certificate_requirement: certificateRequirement,
        };
  console.log(JSON.stringify(output, null, pretty ? 2 : 0));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli();
}
