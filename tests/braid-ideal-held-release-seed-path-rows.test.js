import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  ACCEPTANCE_CERTIFICATE_REQUIREMENT_SCHEMA,
  ACCEPTANCE_CERTIFICATE_SCHEMA,
  EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_SCHEMA,
  EXTERNAL_ACCEPTED_AUTHORITY_REF_PREFIX,
  EXTERNAL_ACCEPTED_AUTHORITY_VERIFICATION_REF_PREFIX,
  FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT,
  NEGATIVE_CONTROL_REASONS,
  SURFACE_VELOCITY_PATTERN,
  buildHeldReleaseSeedPathRowsAcceptanceCertificateRequirement,
  buildHeldReleaseSeedPathRows,
  evaluateHeldReleaseSeedPathRowsAcceptanceCertificate,
  evaluateHeldReleaseSeedPathRowsEvidence,
  validateHeldReleaseSeedPathRows,
} from "../scripts/braid-ideal/held-release-seed-path-rows.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/braid-ideal/held-release-seed-path-rows.mjs", import.meta.url)
);
const RETAINED_RECORD_ID = "retained-record:held-release-six-point:adapter-acceptance-certificate";
const SOURCE_ROW_ID = "two-speed-preferred-row:u0.8:v0.2";
const PROVIDER_OBJECT_REF = "candidate:central_solver_retained_history_provider_object:7d4a8fe0a9792327";
const PROVIDER_ARTIFACT_HASH = "7d4a8fe0a97923270179f2ca0b49b4bc0d6b6ba3251b26e82569bdb4bd1f91df";

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function norm(vector) {
  return Math.hypot(...vector);
}

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function buildCurrentProviderBackedArtifact() {
  return buildHeldReleaseSeedPathRows({
    retainedRecordId: RETAINED_RECORD_ID,
    providerObjectRef: PROVIDER_OBJECT_REF,
    providerArtifactHash: PROVIDER_ARTIFACT_HASH,
  });
}

function makeMatchingAcceptanceCertificate(artifact) {
  return {
    schema: ACCEPTANCE_CERTIFICATE_SCHEMA,
    accepted_held_release_seed_path_rows: true,
    accepted_same_record_evidence: true,
    non_repo_external_authority: true,
    external_accepted_authority_ref:
      `external-authority:held-release-seed-path-rows:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}`,
    external_accepted_authority_verification_ref:
      `external-verification:held-release-seed-path-rows:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}`,
    held_release_seed_path_rows_acceptance_certificate_ref:
      `accepted:held-release-seed-path-rows:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}:certificate`,
    held_release_seed_path_rows_artifact_id: artifact.artifact_id,
    held_release_seed_path_rows_artifact_hash: artifact.artifact_hash,
    retained_record_id: RETAINED_RECORD_ID,
    source_row_id: SOURCE_ROW_ID,
    source_run_id: artifact.source_run_identity.source_run_id,
    source_dataset_id: artifact.source_run_identity.source_dataset_id,
    provider_object_ref: PROVIDER_OBJECT_REF,
    provider_artifact_hash: PROVIDER_ARTIFACT_HASH,
    row_ids: artifact.rows.map((row) => row.row_id),
    row_artifact_hashes: artifact.rows.map((row) => row.artifact_hash),
    negative_control_rejection_verified: true,
  };
}

function makeMatchingExternalAuthorityPackage(artifact, certificate) {
  return {
    schema: EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_SCHEMA,
    accepted_external_authority: true,
    non_repo_external_authority: true,
    external_accepted_authority_package_ref:
      `external-authority-package:held-release-seed-path-rows:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}`,
    external_accepted_authority_ref: certificate.external_accepted_authority_ref,
    external_accepted_authority_verification_ref: certificate.external_accepted_authority_verification_ref,
    verified_certificate_schema: ACCEPTANCE_CERTIFICATE_SCHEMA,
    verified_certificate_ref: certificate.held_release_seed_path_rows_acceptance_certificate_ref,
    verified_certificate_artifact_hash: stableHash(certificate),
    held_release_seed_path_rows_artifact_id: artifact.artifact_id,
    held_release_seed_path_rows_artifact_hash: artifact.artifact_hash,
    retained_record_id: RETAINED_RECORD_ID,
    source_row_id: SOURCE_ROW_ID,
    source_run_id: artifact.source_run_identity.source_run_id,
    source_dataset_id: artifact.source_run_identity.source_dataset_id,
    provider_object_ref: PROVIDER_OBJECT_REF,
    provider_artifact_hash: PROVIDER_ARTIFACT_HASH,
    row_ids: artifact.rows.map((row) => row.row_id),
    row_artifact_hashes: artifact.rows.map((row) => row.artifact_hash),
    negative_control_rejection_verified: true,
  };
}

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

test("held-release seed path rows CLI emits the current provider-backed source artifact", () => {
  const output = execFileSync(
    process.execPath,
    [
      SCRIPT_PATH,
      `--retained-record-id=${RETAINED_RECORD_ID}`,
      `--provider-object-ref=${PROVIDER_OBJECT_REF}`,
      `--provider-artifact-hash=${PROVIDER_ARTIFACT_HASH}`,
      "--pretty",
    ],
    { encoding: "utf8" }
  );
  const artifact = JSON.parse(output);

  assert.equal(artifact.artifact_id, "held_release_seed_path_rows:5833f18e53586201");
  assert.equal(artifact.source_status, "candidate_provider_backed_source_unaccepted");
  assert.equal(artifact.first_missing_object, "held_release_seed_path_rows_acceptance_certificate");
  assert.equal(artifact.first_missing_field, "held_release_seed_path_rows.acceptance_certificate_ref");
  assert.equal(artifact.retained_record_requirement.retained_record_id, RETAINED_RECORD_ID);
  assert.equal(
    artifact.rows.every(
      (row) =>
        row.same_record_binding.retained_record_id === RETAINED_RECORD_ID &&
        row.provider_provenance.provider_object_ref === PROVIDER_OBJECT_REF &&
        row.provider_provenance.provider_artifact_hash === PROVIDER_ARTIFACT_HASH
    ),
    true
  );
  assert.equal(artifact.authorization.held_release_seed_path_rows, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
  assert.deepEqual(validateHeldReleaseSeedPathRows(artifact), []);
});

test("held-release seed path rows emit run-matrix metadata and transverse surface velocities", () => {
  const artifact = buildHeldReleaseSeedPathRows({
    proofId: "SH-0",
    runHandle: "sh0-g0-vt080-moving-prehistory",
    sourceRowId: "diagnostic-source-row:sh0-g0-vt080-moving-prehistory",
    groupVelocity: [0, 0, 0],
    surfaceSpeedFraction: 0.8,
    prehistoryMode: "moving-prehistory",
    retainedRecordId: RETAINED_RECORD_ID,
    providerObjectRef: PROVIDER_OBJECT_REF,
    providerArtifactHash: PROVIDER_ARTIFACT_HASH,
  });

  assert.equal(artifact.artifact_id.startsWith("held_release_seed_path_rows:"), true);
  assert.notEqual(artifact.artifact_id, "held_release_seed_path_rows:5833f18e53586201");
  assert.equal(artifact.artifact_hash.length, 64);
  assert.equal(artifact.run_matrix_metadata.schema, "sh_shell_braid_run_matrix_metadata.v0");
  assert.equal(artifact.run_matrix_metadata.proof_id, "SH-0");
  assert.equal(artifact.run_matrix_metadata.run_handle, "sh0-g0-vt080-moving-prehistory");
  assert.equal(
    artifact.run_matrix_metadata.source_row_id,
    "diagnostic-source-row:sh0-g0-vt080-moving-prehistory"
  );
  assert.deepEqual(artifact.run_matrix_metadata.target_center_group_velocity, [0, 0, 0]);
  assert.equal(artifact.run_matrix_metadata.surface_speed_fraction, 0.8);
  assert.equal(artifact.run_matrix_metadata.surface_velocity_pattern, SURFACE_VELOCITY_PATTERN);
  assert.equal(artifact.run_matrix_metadata.prehistory_mode, "moving-prehistory");
  assert.equal(artifact.source_status, "candidate_provider_backed_source_unaccepted");
  assert.equal(artifact.evidence_status.accepted, false);
  assert.equal(artifact.evidence_status.source_artifact_id, artifact.artifact_id);
  assert.equal(artifact.evidence_status.source_artifact_hash, artifact.artifact_hash);
  assert.equal(
    artifact.evidence_status.source_row_id,
    "diagnostic-source-row:sh0-g0-vt080-moving-prehistory"
  );
  assert.equal(artifact.first_missing_object, "held_release_seed_path_rows_acceptance_certificate");
  assert.equal(artifact.first_missing_field, "held_release_seed_path_rows.acceptance_certificate_ref");

  for (const row of artifact.rows) {
    const velocity = row.solver_path_history_row_f64.velocity;
    assert.equal(Math.abs(norm(velocity) - 0.8) < 1e-12, true);
    assert.equal(Math.abs(dot(row.solver_path_history_row_f64.start, velocity)) < 1e-12, true);
    assert.equal(row.dynamic_replay_metadata.run_handle, "sh0-g0-vt080-moving-prehistory");
    assert.deepEqual(row.dynamic_replay_metadata.target_center_group_velocity, [0, 0, 0]);
    assert.equal(row.dynamic_replay_metadata.surface_speed_fraction, 0.8);
    assert.equal(row.dynamic_replay_metadata.prehistory_mode, "moving-prehistory");
    assert.deepEqual(row.dynamic_replay_metadata.prehistory_velocity, velocity);
  }

  assert.deepEqual(validateHeldReleaseSeedPathRows(artifact), []);
});

test("held-release seed path rows CLI accepts run-matrix diagnostic options", () => {
  const output = execFileSync(
    process.execPath,
    [
      SCRIPT_PATH,
      "--proof-id=SH-0",
      "--run-handle=sh0-g0-vt050-kick-at-release",
      "--source-row-id=diagnostic-source-row:sh0-g0-vt050-kick-at-release",
      "--target-center-group-velocity=0,0,0",
      "--surface-speed-fraction=0.5",
      "--prehistory-mode=kick-at-release",
      `--retained-record-id=${RETAINED_RECORD_ID}`,
      `--provider-object-ref=${PROVIDER_OBJECT_REF}`,
      `--provider-artifact-hash=${PROVIDER_ARTIFACT_HASH}`,
      "--pretty",
    ],
    { encoding: "utf8" }
  );
  const artifact = JSON.parse(output);

  assert.equal(artifact.run_matrix_metadata.run_handle, "sh0-g0-vt050-kick-at-release");
  assert.equal(artifact.run_matrix_metadata.prehistory_mode, "kick-at-release");
  assert.equal(artifact.run_matrix_metadata.surface_speed_fraction, 0.5);
  assert.deepEqual(artifact.run_matrix_metadata.target_center_group_velocity, [0, 0, 0]);
  assert.equal(
    artifact.evidence_status.accepted_evidence_status,
    "candidate_provider_backed_source_unaccepted"
  );
  assert.equal(artifact.authorization.held_release_seed_path_rows, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
  assert.equal(
    artifact.rows.every((row) => row.dynamic_replay_metadata.prehistory_velocity.every((entry) => entry === 0)),
    true
  );
});

test("seed path acceptance-certificate requirement names the exact non-repo authority object", () => {
  const artifact = buildCurrentProviderBackedArtifact();
  const requirement = buildHeldReleaseSeedPathRowsAcceptanceCertificateRequirement({
    artifact,
    sourceRowId: SOURCE_ROW_ID,
  });

  assert.equal(requirement.schema, ACCEPTANCE_CERTIFICATE_REQUIREMENT_SCHEMA);
  assert.equal(requirement.accepted, false);
  assert.equal(requirement.requirement_passed, false);
  assert.equal(requirement.artifact_id, "held_release_seed_path_rows:5833f18e53586201");
  assert.equal(requirement.first_missing_object, "held_release_seed_path_rows_acceptance_certificate");
  assert.equal(requirement.first_missing_field, "held_release_seed_path_rows.acceptance_certificate_ref");
  assert.equal(requirement.required_certificate_schema, ACCEPTANCE_CERTIFICATE_SCHEMA);
  assert.equal(
    requirement.required_certificate_ref_prefix,
    `accepted:held-release-seed-path-rows:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}:`
  );
  assert.equal(
    requirement.required_external_authority_package_schema,
    EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_SCHEMA
  );
  assert.equal(
    requirement.required_external_authority_package_ref_prefix,
    "external-authority-package:held-release-seed-path-rows:"
  );
  assert.equal(
    requirement.required_external_authority_package_ref,
    `external-authority-package:held-release-seed-path-rows:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}`
  );
  assert.equal(
    requirement.required_certificate_fields.includes("held_release_seed_path_rows_acceptance_certificate_ref"),
    true
  );
  assert.equal(
    requirement.required_external_authority_ref_prefix,
    "external-authority:held-release-seed-path-rows:"
  );
  assert.equal(
    requirement.required_external_authority_ref,
    `external-authority:held-release-seed-path-rows:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}`
  );
  assert.equal(
    requirement.required_external_authority_verification_ref_prefix,
    "external-verification:held-release-seed-path-rows:"
  );
  assert.equal(
    requirement.required_external_authority_verification_ref,
    `external-verification:held-release-seed-path-rows:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}`
  );
  assert.deepEqual(requirement.missing_fields, ["held_release_seed_path_rows.acceptance_certificate_ref"]);
  assert.equal(
    requirement.acceptance_certificate_verification.expected_certificate_payload.retained_record_id,
    RETAINED_RECORD_ID
  );
  assert.equal(requirement.acceptance_certificate_verification.expected_certificate_payload.source_row_id, SOURCE_ROW_ID);
  assert.equal(
    requirement.acceptance_certificate_verification.expected_certificate_payload.provider_object_ref,
    PROVIDER_OBJECT_REF
  );
  assert.equal(requirement.acceptance_certificate_verification.expected_certificate_payload.row_ids.length, 6);
  assert.equal(
    requirement.acceptance_certificate_verification.expected_external_authority_package_payload.schema,
    EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_SCHEMA
  );
  assert.equal(
    requirement.acceptance_certificate_verification.expected_external_authority_package_payload
      .external_accepted_authority_package_ref,
    `external-authority-package:held-release-seed-path-rows:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}`
  );
  assert.equal(requirement.authorization.held_release_seed_path_rows, false);
  assert.equal(requirement.authorization.scoreMovement, "no_score_increase");
});

test("seed path certificate verifier rejects ref-only and copied candidate packages", () => {
  const artifact = buildCurrentProviderBackedArtifact();
  const refOnly = {
    schema: ACCEPTANCE_CERTIFICATE_SCHEMA,
    held_release_seed_path_rows_acceptance_certificate_ref:
      `accepted:held-release-seed-path-rows:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}:certificate`,
  };
  const verification = evaluateHeldReleaseSeedPathRowsAcceptanceCertificate({
    artifact,
    sourceRowId: SOURCE_ROW_ID,
    certificate: refOnly,
  });

  assert.equal(verification.accepted, false);
  assert.equal(verification.certificate_conditionally_verified, false);
  assert.equal(
    verification.missing_fields.includes(
      "held_release_seed_path_rows.acceptance_certificate.non_repo_external_authority"
    ),
    true
  );
  assert.equal(
    verification.missing_fields.includes("held_release_seed_path_rows.acceptance_certificate.provider_object_ref"),
    true
  );
  assert.equal(verification.authorization.held_release_seed_path_rows, false);

  const fixtureLooking = {
    ...makeMatchingAcceptanceCertificate(artifact),
    external_accepted_authority_ref: "external:seed-path-authority:fixture",
    external_accepted_authority_verification_ref: "external:seed-path-authority-verification:fixture",
    held_release_seed_path_rows_acceptance_certificate_ref: `accepted:seed-path-rows:${RETAINED_RECORD_ID}`,
  };
  const fixtureVerification = evaluateHeldReleaseSeedPathRowsAcceptanceCertificate({
    artifact,
    sourceRowId: SOURCE_ROW_ID,
    certificate: fixtureLooking,
  });
  assert.equal(fixtureVerification.certificate_conditionally_verified, false);
  assert.equal(
    fixtureVerification.missing_fields.includes(
      "held_release_seed_path_rows.acceptance_certificate.held_release_seed_path_rows_acceptance_certificate_ref"
    ),
    true
  );
  assert.equal(
    fixtureVerification.missing_fields.includes(
      "held_release_seed_path_rows.acceptance_certificate.external_accepted_authority_ref"
    ),
    true
  );
});

test("seed path certificate verifier rejects wrong-family external authority refs", () => {
  const artifact = buildCurrentProviderBackedArtifact();
  const certificate = {
    ...makeMatchingAcceptanceCertificate(artifact),
    external_accepted_authority_ref: "external-authority:generic-review",
    external_accepted_authority_verification_ref: "external-verification:generic-review",
  };
  const verification = evaluateHeldReleaseSeedPathRowsAcceptanceCertificate({
    artifact,
    sourceRowId: SOURCE_ROW_ID,
    certificate,
  });

  assert.equal(verification.certificate_conditionally_verified, false);
  assert.equal(
    verification.required_external_authority_ref_prefix,
    EXTERNAL_ACCEPTED_AUTHORITY_REF_PREFIX
  );
  assert.equal(
    verification.required_external_authority_ref,
    `external-authority:held-release-seed-path-rows:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}`
  );
  assert.equal(
    verification.required_external_authority_verification_ref_prefix,
    EXTERNAL_ACCEPTED_AUTHORITY_VERIFICATION_REF_PREFIX
  );
  assert.equal(
    verification.required_external_authority_verification_ref,
    `external-verification:held-release-seed-path-rows:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}`
  );
  assert.equal(
    verification.missing_fields.includes(
      "held_release_seed_path_rows.acceptance_certificate.external_accepted_authority_ref"
    ),
    true
  );
  assert.equal(
    verification.missing_fields.includes(
      "held_release_seed_path_rows.acceptance_certificate.external_accepted_authority_verification_ref"
    ),
    true
  );
  assert.equal(verification.authorization.held_release_seed_path_rows, false);
});

test("seed path certificate verifier rejects same-family stale external authority refs", () => {
  const artifact = buildCurrentProviderBackedArtifact();
  const certificate = {
    ...makeMatchingAcceptanceCertificate(artifact),
    external_accepted_authority_ref: "external-authority:held-release-seed-path-rows:temp-probe",
    external_accepted_authority_verification_ref:
      "external-verification:held-release-seed-path-rows:temp-probe",
  };
  const verification = evaluateHeldReleaseSeedPathRowsAcceptanceCertificate({
    artifact,
    sourceRowId: SOURCE_ROW_ID,
    certificate,
  });

  assert.equal(verification.certificate_conditionally_verified, false);
  assert.equal(
    verification.missing_fields.includes(
      "held_release_seed_path_rows.acceptance_certificate.external_accepted_authority_ref"
    ),
    true
  );
  assert.equal(
    verification.missing_fields.includes(
      "held_release_seed_path_rows.acceptance_certificate.external_accepted_authority_verification_ref"
    ),
    true
  );
  assert.equal(verification.authorization.held_release_seed_path_rows, false);
});

test("seed path certificate verifier rejects same-family stale certificate refs", () => {
  const artifact = buildCurrentProviderBackedArtifact();
  const certificate = {
    ...makeMatchingAcceptanceCertificate(artifact),
    held_release_seed_path_rows_acceptance_certificate_ref:
      "accepted:held-release-seed-path-rows:stale-record:stale-source:certificate",
  };
  const verification = evaluateHeldReleaseSeedPathRowsAcceptanceCertificate({
    artifact,
    sourceRowId: SOURCE_ROW_ID,
    certificate,
  });

  assert.equal(verification.certificate_conditionally_verified, false);
  assert.equal(
    verification.required_certificate_ref_prefix,
    `accepted:held-release-seed-path-rows:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}:`
  );
  assert.equal(
    verification.missing_fields.includes(
      "held_release_seed_path_rows.acceptance_certificate.held_release_seed_path_rows_acceptance_certificate_ref"
    ),
    true
  );
  assert.equal(verification.authorization.held_release_seed_path_rows, false);
});

test("matching seed path certificate still requires an external authority package", () => {
  const artifact = buildCurrentProviderBackedArtifact();
  const certificate = makeMatchingAcceptanceCertificate(artifact);
  const requirement = buildHeldReleaseSeedPathRowsAcceptanceCertificateRequirement({
    artifact,
    sourceRowId: SOURCE_ROW_ID,
    acceptanceCertificate: certificate,
  });

  assert.equal(requirement.requirement_passed, false);
  assert.equal(requirement.accepted, false);
  assert.equal(requirement.status, "seed_path_external_authority_package_missing");
  assert.equal(requirement.acceptance_certificate_verification.certificate_conditionally_verified, true);
  assert.equal(
    requirement.acceptance_certificate_verification.external_authority_package_conditionally_verified,
    false
  );
  assert.equal(
    requirement.first_missing_object,
    "held_release_seed_path_rows_external_accepted_authority_package"
  );
  assert.equal(
    requirement.first_missing_field,
    "held_release_seed_path_rows.external_authority.external_accepted_authority_package_ref"
  );
  assert.equal(
    requirement.required_repo_authorization_object,
    "repo_authorization_for_accepted_held_release_seed_path_rows"
  );
  assert.equal(
    requirement.required_repo_authorization_field,
    "held_release_seed_path_rows.acceptance_certificate_ref"
  );
  assert.equal(
    requirement.repo_authorization_status,
    "pending_seed_path_certificate_and_external_authority_package"
  );
  assert.equal(requirement.authorization.held_release_seed_path_rows, false);
  assert.equal(requirement.authorization.scoreMovement, "no_score_increase");
});

test("matching seed path certificate and external authority package conditionally verify without repo authorization", () => {
  const artifact = buildCurrentProviderBackedArtifact();
  const certificate = makeMatchingAcceptanceCertificate(artifact);
  const externalAuthorityPackage = makeMatchingExternalAuthorityPackage(artifact, certificate);
  const requirement = buildHeldReleaseSeedPathRowsAcceptanceCertificateRequirement({
    artifact,
    sourceRowId: SOURCE_ROW_ID,
    acceptanceCertificate: certificate,
    externalAuthorityPackage,
  });

  assert.equal(requirement.requirement_passed, false);
  assert.equal(requirement.accepted, false);
  assert.equal(
    requirement.status,
    "seed_path_acceptance_certificate_and_external_authority_conditionally_verified_repo_authorization_blocked"
  );
  assert.equal(requirement.acceptance_certificate_verification.conditionally_verified, true);
  assert.equal(
    requirement.acceptance_certificate_verification.supplied_external_authority_package_ref,
    `external-authority-package:held-release-seed-path-rows:${RETAINED_RECORD_ID}:${SOURCE_ROW_ID}`
  );
  assert.equal(requirement.first_missing_object, "repo_authorization_for_accepted_held_release_seed_path_rows");
  assert.equal(requirement.first_missing_field, "held_release_seed_path_rows.acceptance_certificate_ref");
  assert.equal(
    requirement.required_repo_authorization_object,
    "repo_authorization_for_accepted_held_release_seed_path_rows"
  );
  assert.equal(
    requirement.required_repo_authorization_field,
    "held_release_seed_path_rows.acceptance_certificate_ref"
  );
  assert.equal(
    requirement.repo_authorization_status,
    "missing_after_conditionally_verified_external_authority_package"
  );
  assert.equal(
    requirement.acceptance_certificate_verification.required_repo_authorization_object,
    "repo_authorization_for_accepted_held_release_seed_path_rows"
  );
  assert.equal(
    requirement.acceptance_certificate_verification.required_repo_authorization_field,
    "held_release_seed_path_rows.acceptance_certificate_ref"
  );
  assert.equal(
    requirement.acceptance_certificate_verification.repo_authorization_status,
    "missing_after_conditionally_verified_external_authority_package"
  );
  assert.deepEqual(requirement.missing_fields, ["held_release_seed_path_rows.acceptance_certificate_ref"]);
  assert.deepEqual(requirement.acceptance_certificate_verification.missing_fields, [
    "held_release_seed_path_rows.acceptance_certificate_ref",
  ]);
  assert.equal(requirement.authorization.held_release_seed_path_rows, false);
  assert.equal(requirement.authorization.scoreMovement, "no_score_increase");
});

test("external authority package verifier rejects copied certificate hashes and fixture refs", () => {
  const artifact = buildCurrentProviderBackedArtifact();
  const certificate = makeMatchingAcceptanceCertificate(artifact);
  const externalAuthorityPackage = {
    ...makeMatchingExternalAuthorityPackage(artifact, certificate),
    external_accepted_authority_package_ref: "external:seed-path-authority-package:fixture",
    verified_certificate_artifact_hash: "copied-candidate-hash",
  };
  const verification = evaluateHeldReleaseSeedPathRowsAcceptanceCertificate({
    artifact,
    sourceRowId: SOURCE_ROW_ID,
    certificate,
    externalAuthorityPackage,
  });

  assert.equal(verification.certificate_conditionally_verified, true);
  assert.equal(verification.external_authority_package_conditionally_verified, false);
  assert.equal(
    verification.missing_fields.includes(
      "held_release_seed_path_rows.external_authority.external_accepted_authority_package_ref"
    ),
    true
  );
  assert.equal(
    verification.missing_fields.includes(
      "held_release_seed_path_rows.external_authority.verified_certificate_artifact_hash"
    ),
    true
  );
  assert.equal(verification.authorization.held_release_seed_path_rows, false);
});

test("external authority package verifier rejects wrong package ref family", () => {
  const artifact = buildCurrentProviderBackedArtifact();
  const certificate = makeMatchingAcceptanceCertificate(artifact);
  const externalAuthorityPackage = {
    ...makeMatchingExternalAuthorityPackage(artifact, certificate),
    external_accepted_authority_package_ref:
      `external-authority-package:central-retained-source-adapter-review:${RETAINED_RECORD_ID}`,
  };
  const verification = evaluateHeldReleaseSeedPathRowsAcceptanceCertificate({
    artifact,
    sourceRowId: SOURCE_ROW_ID,
    certificate,
    externalAuthorityPackage,
  });

  assert.equal(verification.certificate_conditionally_verified, true);
  assert.equal(verification.external_authority_package_conditionally_verified, false);
  assert.equal(
    verification.missing_fields.includes(
      "held_release_seed_path_rows.external_authority.external_accepted_authority_package_ref"
    ),
    true
  );
  assert.equal(
    verification.first_missing_field,
    "held_release_seed_path_rows.external_authority.external_accepted_authority_package_ref"
  );
  assert.equal(verification.authorization.held_release_seed_path_rows, false);
});

test("seed path certificate verifier rejects null-copy fail-closed source artifacts", () => {
  const failClosedArtifact = buildHeldReleaseSeedPathRows();
  const nullCopyCertificate = {
    schema: ACCEPTANCE_CERTIFICATE_SCHEMA,
    accepted_held_release_seed_path_rows: true,
    accepted_same_record_evidence: true,
    non_repo_external_authority: true,
    external_accepted_authority_ref: "external-authority:held-release-seed-path-review",
    external_accepted_authority_verification_ref: "external-verification:held-release-seed-path-review",
    held_release_seed_path_rows_acceptance_certificate_ref:
      "accepted:held-release-seed-path-rows:null-copy",
    held_release_seed_path_rows_artifact_id: failClosedArtifact.artifact_id,
    held_release_seed_path_rows_artifact_hash: failClosedArtifact.artifact_hash,
    retained_record_id: null,
    source_row_id: null,
    source_run_id: failClosedArtifact.source_run_identity.source_run_id,
    source_dataset_id: failClosedArtifact.source_run_identity.source_dataset_id,
    provider_object_ref: null,
    provider_artifact_hash: null,
    row_ids: failClosedArtifact.rows.map((row) => row.row_id),
    row_artifact_hashes: failClosedArtifact.rows.map((row) => row.artifact_hash),
    negative_control_rejection_verified: true,
  };
  const verification = evaluateHeldReleaseSeedPathRowsAcceptanceCertificate({
    artifact: failClosedArtifact,
    sourceRowId: null,
    certificate: nullCopyCertificate,
  });

  assert.equal(verification.certificate_conditionally_verified, false);
  assert.equal(
    verification.missing_fields.includes("held_release_seed_path_rows.acceptance_certificate.retained_record_id"),
    true
  );
  assert.equal(
    verification.missing_fields.includes("held_release_seed_path_rows.acceptance_certificate.source_row_id"),
    true
  );
  assert.equal(
    verification.missing_fields.includes("held_release_seed_path_rows.acceptance_certificate.provider_object_ref"),
    true
  );
  assert.equal(
    verification.missing_fields.includes("held_release_seed_path_rows.acceptance_certificate.provider_artifact_hash"),
    true
  );
  assert.equal(verification.authorization.held_release_seed_path_rows, false);

  const retainedOnlyArtifact = buildHeldReleaseSeedPathRows({
    retainedRecordId: RETAINED_RECORD_ID,
  });
  const retainedOnlyNullCopyCertificate = {
    ...nullCopyCertificate,
    held_release_seed_path_rows_artifact_id: retainedOnlyArtifact.artifact_id,
    held_release_seed_path_rows_artifact_hash: retainedOnlyArtifact.artifact_hash,
    retained_record_id: RETAINED_RECORD_ID,
    source_row_id: SOURCE_ROW_ID,
    source_run_id: retainedOnlyArtifact.source_run_identity.source_run_id,
    source_dataset_id: retainedOnlyArtifact.source_run_identity.source_dataset_id,
    row_ids: retainedOnlyArtifact.rows.map((row) => row.row_id),
    row_artifact_hashes: retainedOnlyArtifact.rows.map((row) => row.artifact_hash),
  };
  const retainedOnlyVerification = evaluateHeldReleaseSeedPathRowsAcceptanceCertificate({
    artifact: retainedOnlyArtifact,
    sourceRowId: SOURCE_ROW_ID,
    certificate: retainedOnlyNullCopyCertificate,
  });

  assert.equal(retainedOnlyVerification.certificate_conditionally_verified, false);
  assert.equal(
    retainedOnlyVerification.missing_fields.includes(
      "held_release_seed_path_rows.acceptance_certificate.provider_object_ref"
    ),
    true
  );
  assert.equal(
    retainedOnlyVerification.missing_fields.includes(
      "held_release_seed_path_rows.acceptance_certificate.provider_artifact_hash"
    ),
    true
  );
  assert.equal(retainedOnlyVerification.authorization.held_release_seed_path_rows, false);
});

test("external authority package verifier rejects correct-prefix temp probes", () => {
  const artifact = buildCurrentProviderBackedArtifact();
  const certificate = makeMatchingAcceptanceCertificate(artifact);
  const externalAuthorityPackage = {
    ...makeMatchingExternalAuthorityPackage(artifact, certificate),
    external_accepted_authority_package_ref:
      "external-authority-package:held-release-seed-path-rows:temp-probe",
  };
  const verification = evaluateHeldReleaseSeedPathRowsAcceptanceCertificate({
    artifact,
    sourceRowId: SOURCE_ROW_ID,
    certificate,
    externalAuthorityPackage,
  });

  assert.equal(verification.certificate_conditionally_verified, true);
  assert.equal(verification.external_authority_package_conditionally_verified, false);
  assert.equal(
    verification.first_missing_field,
    "held_release_seed_path_rows.external_authority.external_accepted_authority_package_ref"
  );
  assert.equal(verification.authorization.held_release_seed_path_rows, false);
});

test("held-release seed path rows CLI fails required certificate mode without source package", () => {
  let error;
  try {
    execFileSync(
      process.execPath,
      [
        SCRIPT_PATH,
        `--retained-record-id=${RETAINED_RECORD_ID}`,
        `--source-row-id=${SOURCE_ROW_ID}`,
        `--provider-object-ref=${PROVIDER_OBJECT_REF}`,
        `--provider-artifact-hash=${PROVIDER_ARTIFACT_HASH}`,
        "--require-acceptance-certificate",
        "--pretty",
      ],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
    );
  } catch (caught) {
    error = caught;
  }

  assert.ok(error);
  const diagnostic = JSON.parse(error.stderr.toString());
  assert.equal(diagnostic.schema, ACCEPTANCE_CERTIFICATE_REQUIREMENT_SCHEMA);
  assert.equal(diagnostic.requirement_passed, false);
  assert.equal(diagnostic.first_missing_object, "held_release_seed_path_rows_acceptance_certificate");
  assert.equal(diagnostic.first_missing_field, "held_release_seed_path_rows.acceptance_certificate_ref");
});

test("held-release seed path rows CLI requires the external authority package with a supplied certificate", () => {
  const artifact = buildCurrentProviderBackedArtifact();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "seed-path-certificate-"));
  const certificatePath = path.join(tempDir, "seed-path-certificate.json");
  const authorityPackagePath = path.join(tempDir, "seed-path-external-authority-package.json");
  try {
    const certificate = makeMatchingAcceptanceCertificate(artifact);
    fs.writeFileSync(certificatePath, JSON.stringify(certificate));
    fs.writeFileSync(
      authorityPackagePath,
      JSON.stringify(makeMatchingExternalAuthorityPackage(artifact, certificate))
    );

    let missingAuthorityError;
    try {
      execFileSync(
        process.execPath,
        [
          SCRIPT_PATH,
          `--retained-record-id=${RETAINED_RECORD_ID}`,
          `--source-row-id=${SOURCE_ROW_ID}`,
          `--provider-object-ref=${PROVIDER_OBJECT_REF}`,
          `--provider-artifact-hash=${PROVIDER_ARTIFACT_HASH}`,
          `--acceptance-certificate-json=${certificatePath}`,
          "--require-acceptance-certificate",
          "--pretty",
        ],
        { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
      );
    } catch (caught) {
      missingAuthorityError = caught;
    }
    assert.ok(missingAuthorityError);
    const missingAuthorityDiagnostic = JSON.parse(missingAuthorityError.stderr.toString());
    assert.equal(
      missingAuthorityDiagnostic.first_missing_object,
      "held_release_seed_path_rows_external_accepted_authority_package"
    );

    const output = execFileSync(
      process.execPath,
      [
        SCRIPT_PATH,
        `--retained-record-id=${RETAINED_RECORD_ID}`,
        `--source-row-id=${SOURCE_ROW_ID}`,
        `--provider-object-ref=${PROVIDER_OBJECT_REF}`,
        `--provider-artifact-hash=${PROVIDER_ARTIFACT_HASH}`,
        `--acceptance-certificate-json=${certificatePath}`,
        `--external-authority-package-json=${authorityPackagePath}`,
        "--pretty",
      ],
      { encoding: "utf8" }
    );
    const verifiedArtifact = JSON.parse(output);

    assert.equal(verifiedArtifact.artifact_id, "held_release_seed_path_rows:5833f18e53586201");
    assert.equal(verifiedArtifact.source_status, "candidate_provider_backed_source_unaccepted");
    assert.equal(verifiedArtifact.acceptance_certificate_requirement.requirement_passed, false);
    assert.equal(
      verifiedArtifact.acceptance_certificate_requirement.acceptance_certificate_verification.conditionally_verified,
      true
    );
    assert.equal(verifiedArtifact.acceptance_certificate_requirement.accepted, false);
    assert.equal(verifiedArtifact.authorization.held_release_seed_path_rows, false);
    assert.equal(verifiedArtifact.authorization.scoreMovement, "no_score_increase");

    let unacceptedRequirementError;
    try {
      execFileSync(
        process.execPath,
        [
          SCRIPT_PATH,
          `--retained-record-id=${RETAINED_RECORD_ID}`,
          `--source-row-id=${SOURCE_ROW_ID}`,
          `--provider-object-ref=${PROVIDER_OBJECT_REF}`,
          `--provider-artifact-hash=${PROVIDER_ARTIFACT_HASH}`,
          `--acceptance-certificate-json=${certificatePath}`,
          `--external-authority-package-json=${authorityPackagePath}`,
          "--require-acceptance-certificate",
          "--pretty",
        ],
        { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
      );
    } catch (caught) {
      unacceptedRequirementError = caught;
    }
    assert.ok(unacceptedRequirementError);
    const unacceptedRequirementDiagnostic = JSON.parse(unacceptedRequirementError.stderr.toString());
    assert.equal(unacceptedRequirementDiagnostic.requirement_passed, false);
    assert.equal(
      unacceptedRequirementDiagnostic.status,
      "seed_path_acceptance_certificate_and_external_authority_conditionally_verified_repo_authorization_blocked"
    );
    assert.equal(
      unacceptedRequirementDiagnostic.first_missing_object,
      "repo_authorization_for_accepted_held_release_seed_path_rows"
    );
    assert.equal(
      unacceptedRequirementDiagnostic.first_missing_field,
      "held_release_seed_path_rows.acceptance_certificate_ref"
    );
    assert.equal(
      unacceptedRequirementDiagnostic.required_repo_authorization_object,
      "repo_authorization_for_accepted_held_release_seed_path_rows"
    );
    assert.equal(
      unacceptedRequirementDiagnostic.required_repo_authorization_field,
      "held_release_seed_path_rows.acceptance_certificate_ref"
    );
    assert.equal(
      unacceptedRequirementDiagnostic.repo_authorization_status,
      "missing_after_conditionally_verified_external_authority_package"
    );
    assert.equal(
      unacceptedRequirementDiagnostic.acceptance_certificate_verification.required_repo_authorization_object,
      "repo_authorization_for_accepted_held_release_seed_path_rows"
    );
    assert.equal(
      unacceptedRequirementDiagnostic.acceptance_certificate_verification.required_repo_authorization_field,
      "held_release_seed_path_rows.acceptance_certificate_ref"
    );
    assert.equal(
      unacceptedRequirementDiagnostic.acceptance_certificate_verification.repo_authorization_status,
      "missing_after_conditionally_verified_external_authority_package"
    );
    assert.deepEqual(unacceptedRequirementDiagnostic.missing_fields, [
      "held_release_seed_path_rows.acceptance_certificate_ref",
    ]);
    assert.deepEqual(unacceptedRequirementDiagnostic.acceptance_certificate_verification.missing_fields, [
      "held_release_seed_path_rows.acceptance_certificate_ref",
    ]);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
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
