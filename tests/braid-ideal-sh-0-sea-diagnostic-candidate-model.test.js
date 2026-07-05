import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  ACCEPTANCE_CERTIFICATE_SCHEMA,
  EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_SCHEMA,
  buildHeldReleaseSeedPathRows,
} from "../scripts/braid-ideal/held-release-seed-path-rows.mjs";
import {
  ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
  ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_SCHEMA,
  ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_VERIFICATION_SCHEMA,
  ACCEPTED_PROVENANCE_REPLACEMENT_REQUIREMENT_SCHEMA,
  AUTHORITY_CLASS,
  CANDIDATE_RESPONSE_ROW_SCHEMA,
  DEFAULT_RESPONSE_DEADBAND,
  FCC_SEA_DIAGNOSTIC_ATTEMPT_ID,
  FCC_SEA_POPULATION_SIZE,
  PRODUCED_RESPONSE_SOURCE_ROW_SCHEMA,
  RESPONSE_RUN_SCHEMA,
  REQUIRED_INWARD_RESPONSE_FLOOR,
  SCHEMA,
  TARGET_ARTIFACT_ID,
  TARGET_PROVIDER_ARTIFACT_HASH,
  TARGET_PROVIDER_OBJECT_REF,
  TARGET_RETAINED_RECORD_ID,
  TARGET_SOURCE_ROW_ID,
  REPO_AUTHORIZATION_FOR_ACCEPTED_HELD_RELEASE_SEED_PATH_ROWS_REF_PREFIX,
  buildSh0SeaDiagnosticCandidateModel,
  buildSh0SeaDiagnosticResponseRun,
  evaluateSh0SeaDiagnosticCandidateModelEvidence,
  evaluateSh0SeaDiagnosticResponseRunEvidence,
} from "../scripts/braid-ideal/sh-0-sea-diagnostic-candidate-model.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/braid-ideal/sh-0-sea-diagnostic-candidate-model.mjs", import.meta.url)
);

function rowById(model, suffix) {
  return model.rows.find((row) => row.row_id === `sh_0_sea_model:${suffix}`);
}

function assertAlmostEqual(actual, expected, epsilon = 1e-12) {
  assert.ok(
    Math.abs(actual - expected) <= epsilon,
    `expected ${actual} to be within ${epsilon} of ${expected}`
  );
}

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function buildMatchingSeedPathAuthorityInputs() {
  const artifact = buildHeldReleaseSeedPathRows({
    retainedRecordId: TARGET_RETAINED_RECORD_ID,
    sourceRowId: TARGET_SOURCE_ROW_ID,
    providerObjectRef: TARGET_PROVIDER_OBJECT_REF,
    providerArtifactHash: TARGET_PROVIDER_ARTIFACT_HASH,
  });
  const acceptanceCertificate = {
    schema: ACCEPTANCE_CERTIFICATE_SCHEMA,
    accepted_held_release_seed_path_rows: true,
    accepted_same_record_evidence: true,
    non_repo_external_authority: true,
    external_accepted_authority_ref:
      `external-authority:held-release-seed-path-rows:${TARGET_RETAINED_RECORD_ID}:${TARGET_SOURCE_ROW_ID}`,
    external_accepted_authority_verification_ref:
      `external-verification:held-release-seed-path-rows:${TARGET_RETAINED_RECORD_ID}:${TARGET_SOURCE_ROW_ID}`,
    held_release_seed_path_rows_acceptance_certificate_ref:
      `accepted:held-release-seed-path-rows:${TARGET_RETAINED_RECORD_ID}:${TARGET_SOURCE_ROW_ID}:certificate`,
    held_release_seed_path_rows_artifact_id: artifact.artifact_id,
    held_release_seed_path_rows_artifact_hash: artifact.artifact_hash,
    retained_record_id: TARGET_RETAINED_RECORD_ID,
    source_row_id: TARGET_SOURCE_ROW_ID,
    source_run_id: artifact.source_run_identity.source_run_id,
    source_dataset_id: artifact.source_run_identity.source_dataset_id,
    provider_object_ref: TARGET_PROVIDER_OBJECT_REF,
    provider_artifact_hash: TARGET_PROVIDER_ARTIFACT_HASH,
    row_ids: artifact.rows.map((row) => row.row_id),
    row_artifact_hashes: artifact.rows.map((row) => row.artifact_hash),
    negative_control_rejection_verified: true,
  };
  const externalAuthorityPackage = {
    schema: EXTERNAL_ACCEPTED_AUTHORITY_PACKAGE_SCHEMA,
    accepted_external_authority: true,
    non_repo_external_authority: true,
    external_accepted_authority_package_ref:
      `external-authority-package:held-release-seed-path-rows:${TARGET_RETAINED_RECORD_ID}:${TARGET_SOURCE_ROW_ID}`,
    external_accepted_authority_ref: acceptanceCertificate.external_accepted_authority_ref,
    external_accepted_authority_verification_ref:
      acceptanceCertificate.external_accepted_authority_verification_ref,
    verified_certificate_schema: ACCEPTANCE_CERTIFICATE_SCHEMA,
    verified_certificate_ref:
      acceptanceCertificate.held_release_seed_path_rows_acceptance_certificate_ref,
    verified_certificate_artifact_hash: stableHash(acceptanceCertificate),
    held_release_seed_path_rows_artifact_id: artifact.artifact_id,
    held_release_seed_path_rows_artifact_hash: artifact.artifact_hash,
    retained_record_id: TARGET_RETAINED_RECORD_ID,
    source_row_id: TARGET_SOURCE_ROW_ID,
    source_run_id: artifact.source_run_identity.source_run_id,
    source_dataset_id: artifact.source_run_identity.source_dataset_id,
    provider_object_ref: TARGET_PROVIDER_OBJECT_REF,
    provider_artifact_hash: TARGET_PROVIDER_ARTIFACT_HASH,
    row_ids: artifact.rows.map((row) => row.row_id),
    row_artifact_hashes: artifact.rows.map((row) => row.artifact_hash),
    negative_control_rejection_verified: true,
  };
  return { acceptanceCertificate, externalAuthorityPackage };
}

function acceptedRefFromPrefix(prefix, suffix) {
  return `${prefix}${suffix}`;
}

function buildMatchingAcceptedProvenancePackage(run, {
  acceptanceCertificate,
  externalAuthorityPackage,
}) {
  const replacement = run.accepted_provenance_replacement_requirement;
  const target = replacement.target_binding;
  const prefixes = replacement.expected_ref_prefixes;
  return {
    schema: ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_SCHEMA,
    accepted_same_target_sh_0_sea_source: true,
    response_kind: replacement.response_kind,
    diagnostic_source_row_id: replacement.diagnostic_source_row_id,
    accepted_replacement_source_row_id: acceptedRefFromPrefix(
      prefixes.accepted_replacement_source_row_ref,
      "synthetic-package-row"
    ),
    held_release_seed_path_rows_acceptance_certificate_ref:
      acceptanceCertificate.held_release_seed_path_rows_acceptance_certificate_ref,
    held_release_seed_path_rows_external_accepted_authority_package_ref:
      externalAuthorityPackage.external_accepted_authority_package_ref,
    repo_authorization_for_accepted_held_release_seed_path_rows_ref:
      `${REPO_AUTHORIZATION_FOR_ACCEPTED_HELD_RELEASE_SEED_PATH_ROWS_REF_PREFIX}${TARGET_RETAINED_RECORD_ID}:${TARGET_SOURCE_ROW_ID}`,
    accepted_geometry_provenance_ref: acceptedRefFromPrefix(
      prefixes.accepted_geometry_provenance_ref,
      "synthetic-package-geometry"
    ),
    accepted_event_provenance_ref: acceptedRefFromPrefix(
      prefixes.accepted_event_provenance_ref,
      "synthetic-package-event"
    ),
    accepted_support_provenance_ref: acceptedRefFromPrefix(
      prefixes.accepted_support_provenance_ref,
      "synthetic-package-support"
    ),
    accepted_action_provenance_ref: acceptedRefFromPrefix(
      prefixes.accepted_action_provenance_ref,
      "synthetic-package-action"
    ),
    geometry_carrier_row_ref: replacement.geometry_carrier.geometry_carrier_row_ref,
    target_artifact_id: target.target_artifact_id,
    target_artifact_hash: target.target_artifact_hash,
    target_source_row_id: target.target_source_row_id,
    retained_record_id: target.retained_record_id,
    provider_object_ref: target.provider_object_ref,
    provider_artifact_hash: target.provider_artifact_hash,
    target_path_row_ids: [...target.target_path_row_ids],
    accepted_same_record_evidence: true,
    negative_control_rejection_verified: true,
  };
}

test("SH-0-sea diagnostic candidate model binds the candidate central target", () => {
  const model = buildSh0SeaDiagnosticCandidateModel();
  const targetRow = rowById(model, "target_source_row");

  assert.equal(model.schema, SCHEMA);
  assert.equal(model.authority_class, AUTHORITY_CLASS);
  assert.equal(model.proof_id, "SH-0-sea");
  assert.equal(model.target_artifact_id, TARGET_ARTIFACT_ID);
  assert.equal(targetRow.candidate_artifact_id, TARGET_ARTIFACT_ID);
  assert.equal(targetRow.path_rows.length, 6);
  assert.equal(
    targetRow.path_rows.every((row) => row.accepted === false),
    true
  );
  assert.equal(targetRow.first_missing_object, "held_release_seed_path_rows_acceptance_certificate");
  assert.equal(targetRow.first_missing_field, ACCEPTED_EVIDENCE_BLOCKER_FIELD);
});

test("SH-0-sea diagnostic candidate model defines sea, frame, response, support, action, and receiver-normal rows", () => {
  const model = buildSh0SeaDiagnosticCandidateModel();
  const fccShell = rowById(model, "fcc_nearest_neighbor_shell_row");

  assert.equal(rowById(model, "like_braid_population_row").accepted, false);
  assert.equal(
    rowById(model, "like_braid_population_row").diagnostic_specialization_row_ref,
    "sh_0_sea_model:fcc_nearest_neighbor_shell_row"
  );
  assert.equal(fccShell.diagnostic_attempt_id, FCC_SEA_DIAGNOSTIC_ATTEMPT_ID);
  assert.equal(fccShell.population_size, FCC_SEA_POPULATION_SIZE);
  assert.equal(fccShell.neighbor_directions.length, 12);
  assert.deepEqual(
    fccShell.neighbor_directions.map((row) => row.direction),
    [
      [1, 1, 0],
      [1, -1, 0],
      [-1, 1, 0],
      [-1, -1, 0],
      [1, 0, 1],
      [1, 0, -1],
      [-1, 0, 1],
      [-1, 0, -1],
      [0, 1, 1],
      [0, 1, -1],
      [0, -1, 1],
      [0, -1, -1],
    ]
  );
  assert.equal(fccShell.accepted, false);
  assert.equal(fccShell.first_missing_object, ACCEPTED_EVIDENCE_BLOCKER_OBJECT);
  assert.equal(rowById(model, "local_target_sea_frame_row").accepted, false);
  assert.equal(rowById(model, "theta_sea_state_row").accepted_for_sh_0_sea, false);
  assert.equal(rowById(model, "boundary_condition_row").hard_wall_allowed, false);
  assert.equal(rowById(model, "sea_response_equation_row").accepted, false);
  assert.equal(
    rowById(model, "support_envelope_row").diagnostic_inward_response_floor,
    REQUIRED_INWARD_RESPONSE_FLOOR
  );
  assert.equal(rowById(model, "action_exchange_row").accepted_same_record_action_closure, false);
  assert.deepEqual(rowById(model, "receiver_normal_requirement_row").required_target_coverage, {
    same_source_self_hit_rows: 6,
    directed_partner_causal_root_replay_rows: 30,
  });
});

test("SH-0-sea diagnostic candidate model never authorizes retained evidence", () => {
  const model = buildSh0SeaDiagnosticCandidateModel();

  assert.equal(model.authorization.accepted_same_record_evidence, false);
  assert.equal(model.authorization.accepted_retained_evidence, false);
  assert.equal(model.authorization.retained_branch_claim, false);
  assert.equal(model.authorization.accepted_force_action_closure, false);
  assert.equal(model.authorization.accepted_noether_sea_response_closure, false);
  assert.equal(model.authorization.accepted_stability_claim, false);
  assert.equal(model.authorization.receiver_normal_branch_strength, false);
  assert.equal(model.authorization.scoreMovement, "no_score_increase");
  assert.deepEqual(evaluateSh0SeaDiagnosticCandidateModelEvidence(model), {
    accepted: false,
    reason: "diagnostic_candidate_model_not_accepted_retained_evidence",
    first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  });
});

test("SH-0-sea diagnostic candidate model CLI emits JSON", () => {
  const output = execFileSync(process.execPath, [SCRIPT_PATH, "--pretty"], {
    encoding: "utf8",
  });
  const model = JSON.parse(output);

  assert.equal(model.schema, SCHEMA);
  assert.equal(model.target_artifact_id, TARGET_ARTIFACT_ID);
  assert.equal(model.accepted_evidence_blocker.first_missing_object, ACCEPTED_EVIDENCE_BLOCKER_OBJECT);
  assert.equal(model.accepted_evidence_blocker.first_missing_field, ACCEPTED_EVIDENCE_BLOCKER_FIELD);
});

test("SH-0-sea diagnostic candidate model CLI emits embedded run-matrix metadata", () => {
  const output = execFileSync(
    process.execPath,
    [
      SCRIPT_PATH,
      "--run-handle=sh0sea-g0-vt080-moving-prehistory",
      "--embedded-central-run-handle=sh0-g0-vt080-moving-prehistory",
      "--source-row-id=diagnostic-source-row:sh0-g0-vt080-moving-prehistory",
      "--target-center-group-velocity=0,0,0",
      "--surface-speed-fraction=0.8",
      "--prehistory-mode=moving-prehistory",
      "--pretty",
    ],
    { encoding: "utf8" }
  );
  const model = JSON.parse(output);
  const targetRow = rowById(model, "target_source_row");

  assert.equal(model.schema, SCHEMA);
  assert.equal(model.run_matrix_metadata.proof_id, "SH-0-sea");
  assert.equal(model.run_matrix_metadata.run_handle, "sh0sea-g0-vt080-moving-prehistory");
  assert.equal(model.run_matrix_metadata.embedded_central_run_handle, "sh0-g0-vt080-moving-prehistory");
  assert.equal(model.run_matrix_metadata.source_artifact_id, model.target_artifact_id);
  assert.equal(model.run_matrix_metadata.source_artifact_hash, model.target_artifact_hash);
  assert.equal(
    model.run_matrix_metadata.source_row_id,
    "diagnostic-source-row:sh0-g0-vt080-moving-prehistory"
  );
  assert.deepEqual(model.run_matrix_metadata.target_center_group_velocity, [0, 0, 0]);
  assert.equal(model.run_matrix_metadata.surface_speed_fraction, 0.8);
  assert.equal(model.run_matrix_metadata.prehistory_mode, "moving-prehistory");
  assert.equal(
    model.run_matrix_metadata.evidence_status,
    "candidate_provider_backed_source_unaccepted"
  );
  assert.equal(targetRow.run_matrix_metadata.run_handle, "sh0-g0-vt080-moving-prehistory");
  assert.equal(targetRow.candidate_artifact_id, model.target_artifact_id);
  assert.equal(
    targetRow.source_row_id,
    "diagnostic-source-row:sh0-g0-vt080-moving-prehistory"
  );
  assert.equal(targetRow.evidence_status.accepted, false);
  assert.equal(model.evidence_status.accepted, false);
  assert.equal(model.authorization.accepted_retained_evidence, false);
  assert.equal(model.authorization.scoreMovement, "no_score_increase");
  assert.equal(
    model.accepted_evidence_blocker.required_certificate_ref_prefix,
    "accepted:held-release-seed-path-rows:retained-record:held-release-six-point:adapter-acceptance-certificate:diagnostic-source-row:sh0-g0-vt080-moving-prehistory:"
  );
});

test("SH-0-sea diagnostic response run uses provider-seeded probe and does not cross the floor by default", () => {
  const run = buildSh0SeaDiagnosticResponseRun();

  assert.equal(run.schema, RESPONSE_RUN_SCHEMA);
  assert.equal(run.target_artifact_id, TARGET_ARTIFACT_ID);
  assert.equal(run.response_probe.K_NS_diag, 2.49);
  assert.equal(run.response_probe.Phi_probe, 0.008);
  assert.equal(run.response_probe.Gamma_NS_diag, 0);
  assert.equal(run.response_probe.W_boundary_projection, 0);
  assert.equal(
    run.response_probe.geometry_carrier.geometry_carrier_row_ref,
    "sh_0_sea_model:fcc_nearest_neighbor_shell_row"
  );
  assert.equal(run.response_probe.geometry_carrier.diagnostic_attempt_id, "aa");
  assert.equal(run.response_probe.geometry_carrier.population_size, 12);
  assert.equal(run.candidate_response_row.schema, CANDIDATE_RESPONSE_ROW_SCHEMA);
  assert.equal(run.candidate_response_row.response_kind, "pressure_tension");
  assert.equal(run.candidate_response_row.target_binding.target_artifact_id, TARGET_ARTIFACT_ID);
  assert.equal(run.candidate_response_row.target_binding.target_artifact_hash, run.target_artifact_hash);
  assert.equal(run.candidate_response_row.target_binding.target_source_row_id, run.target_source_row_id);
  assert.equal(run.candidate_response_row.target_binding.target_path_row_ids.length, 6);
  assert.equal(
    run.candidate_response_row.local_row_refs.fcc_nearest_neighbor_shell_row_ref,
    "sh_0_sea_model:fcc_nearest_neighbor_shell_row"
  );
  assert.equal(
    run.candidate_response_row.response_components.geometry_carrier_row_ref,
    "sh_0_sea_model:fcc_nearest_neighbor_shell_row"
  );
  assert.equal(run.candidate_response_row.response_components.geometry_carrier_attempt_id, "aa");
  assert.equal(run.candidate_response_row.accepted, false);
  assert.equal(run.candidate_response_row.retained_evidence_authorized, false);
  assert.equal(run.accepted_provenance_replacement_requirement, null);
  assert.equal(
    run.floor_evaluation.candidate_response_row_id,
    run.candidate_response_row.row_id
  );
  assertAlmostEqual(run.floor_evaluation.Pi_R_A_sea, -0.01992);
  assert.equal(
    run.floor_evaluation.required_projected_response_floor,
    REQUIRED_INWARD_RESPONSE_FLOOR - DEFAULT_RESPONSE_DEADBAND
  );
  assert.equal(run.floor_evaluation.crosses_inward_response_floor, false);
  assert.equal(run.floor_evaluation.post_turn_return_condition_passed, false);
  assert.ok(run.floor_evaluation.additional_inward_projection_needed > 0);
  assert.ok(run.floor_evaluation.required_Phi_multiplier_vs_current_probe > 4);
  assert.equal(run.evidence_status.accepted, false);
  assert.equal(run.authorization.accepted_retained_evidence, false);
  assert.deepEqual(evaluateSh0SeaDiagnosticResponseRunEvidence(run), {
    accepted: false,
    reason: "diagnostic_response_run_not_accepted_retained_evidence",
    first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  });
});

test("SH-0-sea diagnostic response run can cross the floor through a produced same-target source row", () => {
  const run = buildSh0SeaDiagnosticResponseRun({
    producedResponseSource: true,
    responseRunHandle: "sh0sea-produced-pressure-tension-source",
  });

  assert.equal(run.response_probe.probe_id, "sh0sea-produced-pressure-tension-source");
  assert.equal(run.produced_response_source_row.schema, PRODUCED_RESPONSE_SOURCE_ROW_SCHEMA);
  assert.equal(run.produced_response_source_row.response_kind, "pressure_tension");
  assert.equal(run.produced_response_source_row.target_binding.target_artifact_id, TARGET_ARTIFACT_ID);
  assert.equal(run.produced_response_source_row.target_binding.target_artifact_hash, run.target_artifact_hash);
  assert.equal(
    run.produced_response_source_row.target_binding.target_source_row_id,
    run.target_source_row_id
  );
  assert.equal(run.produced_response_source_row.target_binding.target_path_row_ids.length, 6);
  assert.equal(
    run.produced_response_source_row.event_provenance.boundary_condition_row_ref,
    "sh_0_sea_model:boundary_condition_row"
  );
  assert.equal(
    run.produced_response_source_row.event_provenance.geometry_carrier_row_ref,
    "sh_0_sea_model:fcc_nearest_neighbor_shell_row"
  );
  assert.equal(
    run.produced_response_source_row.event_provenance.event_source,
    "candidate_same_target_aa_fcc_shell_pressure_tension_event"
  );
  assert.equal(
    run.produced_response_source_row.geometry_carrier.geometry_carrier_row_ref,
    "sh_0_sea_model:fcc_nearest_neighbor_shell_row"
  );
  assert.equal(run.produced_response_source_row.geometry_carrier.diagnostic_attempt_id, "aa");
  assert.equal(run.produced_response_source_row.geometry_carrier.population_size, 12);
  assert.equal(run.produced_response_source_row.geometry_carrier.neighbor_directions.length, 12);
  assert.equal(
    run.produced_response_source_row.geometry_carrier.source_production_role,
    "pressure_tension_diagnostic_geometry_carrier"
  );
  assert.equal(
    run.produced_response_source_row.support_provenance.support_envelope_row_ref,
    "sh_0_sea_model:support_envelope_row"
  );
  assert.equal(
    run.produced_response_source_row.support_provenance.geometry_carrier_row_ref,
    "sh_0_sea_model:fcc_nearest_neighbor_shell_row"
  );
  assert.equal(
    run.produced_response_source_row.action_provenance.action_exchange_row_ref,
    "sh_0_sea_model:action_exchange_row"
  );
  assert.equal(
    run.produced_response_source_row.action_provenance.geometry_carrier_row_ref,
    "sh_0_sea_model:fcc_nearest_neighbor_shell_row"
  );
  assert.equal(run.produced_response_source_row.accepted, false);
  assert.equal(run.produced_response_source_row.retained_evidence_authorized, false);
  assert.equal(
    run.response_probe.produced_response_source_row_ref,
    run.produced_response_source_row.row_id
  );
  assert.equal(run.candidate_response_row.target_binding.target_artifact_id, TARGET_ARTIFACT_ID);
  assert.equal(
    run.candidate_response_row.response_components.Phi_probe,
    run.produced_response_source_row.produced_response_components.Phi_probe
  );
  assert.equal(
    run.candidate_response_row.response_components.produced_response_source_row_ref,
    run.produced_response_source_row.row_id
  );
  assertAlmostEqual(run.floor_evaluation.Pi_R_A_sea, -0.09462);
  assert.equal(run.floor_evaluation.crosses_inward_response_floor, true);
  assert.equal(run.floor_evaluation.post_turn_return_condition_passed, true);
  assert.equal(run.floor_evaluation.additional_inward_projection_needed, 0);
  assert.equal(run.evidence_status.accepted, false);
  assert.equal(run.authorization.accepted_noether_sea_response_closure, false);
  assert.equal(run.authorization.scoreMovement, "no_score_increase");

  const replacement = run.accepted_provenance_replacement_requirement;
  assert.equal(replacement.schema, ACCEPTED_PROVENANCE_REPLACEMENT_REQUIREMENT_SCHEMA);
  assert.equal(replacement.accepted, false);
  assert.equal(replacement.requirement_passed, false);
  assert.equal(replacement.status, "seed_path_acceptance_certificate_missing");
  assert.equal(replacement.response_kind, "pressure_tension");
  assert.equal(replacement.diagnostic_source_row_id, run.produced_response_source_row.row_id);
  assert.equal(replacement.candidate_response_row_id, run.candidate_response_row.row_id);
  assert.equal(replacement.required_package_schema, ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_SCHEMA);
  assert.equal(
    replacement.accepted_provenance_package_verification.schema,
    ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_VERIFICATION_SCHEMA
  );
  assert.equal(
    replacement.accepted_provenance_package_verification.status,
    "same_target_accepted_provenance_package_missing"
  );
  assert.equal(
    replacement.accepted_provenance_package_verification.package_conditionally_verified,
    false
  );
  assert.equal(
    replacement.accepted_provenance_package_verification.first_missing_object,
    "sh_0_sea_same_target_accepted_provenance_package"
  );
  assert.equal(
    replacement.accepted_provenance_package_verification.first_missing_field,
    "accepted_provenance_package"
  );
  assert.equal(replacement.seed_path_acceptance.first_missing_object, "held_release_seed_path_rows_acceptance_certificate");
  assert.equal(replacement.first_missing_object, "held_release_seed_path_rows_acceptance_certificate");
  assert.equal(replacement.first_missing_field, ACCEPTED_EVIDENCE_BLOCKER_FIELD);
  assert.equal(
    replacement.current_diagnostic_refs.geometry_carrier_row_ref,
    "sh_0_sea_model:fcc_nearest_neighbor_shell_row"
  );
  assert.equal(
    replacement.expected_ref_prefixes.accepted_geometry_provenance_ref,
    "accepted:sh-0-sea:geometry:aa-fcc-nearest-neighbor-shell:"
  );
  assert.equal(
    replacement.expected_ref_prefixes.accepted_event_provenance_ref,
    "accepted:sh-0-sea:event:pressure_tension:aa-fcc-shell:"
  );
  assert.deepEqual(replacement.accepted_provenance_status, {
    accepted_geometry_provenance: false,
    accepted_event_provenance: false,
    accepted_support_provenance: false,
    accepted_action_provenance: false,
  });
});

test("SH-0-sea diagnostic response run can use the FCC shell carrier for boundary-wake source rows", () => {
  const run = buildSh0SeaDiagnosticResponseRun({
    producedResponseSource: true,
    responseRowKind: "boundary_wake",
    responseRunHandle: "sh0sea-aa-fcc-boundary-wake-source",
  });

  assert.equal(run.produced_response_source_row.response_kind, "boundary_wake");
  assert.equal(
    run.produced_response_source_row.geometry_carrier.geometry_carrier_row_ref,
    "sh_0_sea_model:fcc_nearest_neighbor_shell_row"
  );
  assert.equal(
    run.produced_response_source_row.geometry_carrier.source_production_role,
    "boundary_wake_diagnostic_geometry_carrier"
  );
  assert.equal(
    run.produced_response_source_row.event_provenance.event_source,
    "candidate_same_target_aa_fcc_shell_boundary_wake_event"
  );
  assert.equal(
    run.candidate_response_row.response_components.geometry_carrier_row_ref,
    "sh_0_sea_model:fcc_nearest_neighbor_shell_row"
  );
  assert.equal(run.floor_evaluation.crosses_inward_response_floor, true);
  assert.equal(run.produced_response_source_row.accepted, false);
  assert.equal(run.produced_response_source_row.retained_evidence_authorized, false);
  assert.equal(run.authorization.scoreMovement, "no_score_increase");
  assert.equal(
    run.accepted_provenance_replacement_requirement.expected_ref_prefixes
      .accepted_replacement_source_row_ref,
    "accepted:sh-0-sea:boundary_wake:same-target-aa-fcc-source:"
  );
  assert.equal(
    run.accepted_provenance_replacement_requirement.expected_ref_prefixes
      .accepted_event_provenance_ref,
    "accepted:sh-0-sea:event:boundary_wake:aa-fcc-shell:"
  );
  assert.equal(
    run.accepted_provenance_replacement_requirement.required_package_fields.includes(
      "accepted_geometry_provenance_ref"
    ),
    true
  );
  assert.equal(
    run.accepted_provenance_replacement_requirement.required_package_fields.includes(
      "accepted_action_provenance_ref"
    ),
    true
  );
});

test("SH-0-sea accepted-provenance replacement requirement propagates staged seed-path blockers", () => {
  const { acceptanceCertificate, externalAuthorityPackage } = buildMatchingSeedPathAuthorityInputs();
  const certificateOnlyRun = buildSh0SeaDiagnosticResponseRun({
    producedResponseSource: true,
    seedPathAcceptanceCertificate: acceptanceCertificate,
  });
  const certificateOnly = certificateOnlyRun.accepted_provenance_replacement_requirement;

  assert.equal(certificateOnly.accepted, false);
  assert.equal(certificateOnly.requirement_passed, false);
  assert.equal(certificateOnly.status, "seed_path_external_authority_package_missing");
  assert.equal(
    certificateOnly.first_missing_object,
    "held_release_seed_path_rows_external_accepted_authority_package"
  );
  assert.equal(
    certificateOnly.first_missing_field,
    "held_release_seed_path_rows.external_authority.external_accepted_authority_package_ref"
  );
  assert.equal(certificateOnly.seed_path_acceptance.conditionally_verified, false);
  assert.equal(
    certificateOnly.seed_path_acceptance.repo_authorization_status,
    "pending_seed_path_certificate_and_external_authority_package"
  );
  assert.equal(certificateOnly.authorization.scoreMovement, "no_score_increase");

  const conditionallyVerifiedRun = buildSh0SeaDiagnosticResponseRun({
    producedResponseSource: true,
    seedPathAcceptanceCertificate: acceptanceCertificate,
    seedPathExternalAuthorityPackage: externalAuthorityPackage,
  });
  const conditionallyVerified =
    conditionallyVerifiedRun.accepted_provenance_replacement_requirement;

  assert.equal(conditionallyVerified.accepted, false);
  assert.equal(conditionallyVerified.requirement_passed, false);
  assert.equal(
    conditionallyVerified.status,
    "seed_path_acceptance_certificate_and_external_authority_conditionally_verified_repo_authorization_blocked"
  );
  assert.equal(
    conditionallyVerified.first_missing_object,
    "repo_authorization_for_accepted_held_release_seed_path_rows"
  );
  assert.equal(conditionallyVerified.first_missing_field, ACCEPTED_EVIDENCE_BLOCKER_FIELD);
  assert.equal(conditionallyVerified.seed_path_acceptance.conditionally_verified, true);
  assert.equal(
    conditionallyVerified.seed_path_acceptance.repo_authorization_status,
    "missing_after_conditionally_verified_external_authority_package"
  );
  assert.equal(conditionallyVerified.accepted_provenance_status.accepted_geometry_provenance, false);
  assert.equal(conditionallyVerified.accepted_provenance_status.accepted_event_provenance, false);
  assert.equal(conditionallyVerified.accepted_provenance_status.accepted_support_provenance, false);
  assert.equal(conditionallyVerified.accepted_provenance_status.accepted_action_provenance, false);
  assert.equal(conditionallyVerified.authorization.scoreMovement, "no_score_increase");
});

test("SH-0-sea accepted-provenance package verifier can match the FCC carrier without authorizing evidence", () => {
  const { acceptanceCertificate, externalAuthorityPackage } = buildMatchingSeedPathAuthorityInputs();
  const stagedRun = buildSh0SeaDiagnosticResponseRun({
    producedResponseSource: true,
    seedPathAcceptanceCertificate: acceptanceCertificate,
    seedPathExternalAuthorityPackage: externalAuthorityPackage,
  });
  const acceptedProvenancePackage = buildMatchingAcceptedProvenancePackage(stagedRun, {
    acceptanceCertificate,
    externalAuthorityPackage,
  });
  const run = buildSh0SeaDiagnosticResponseRun({
    producedResponseSource: true,
    seedPathAcceptanceCertificate: acceptanceCertificate,
    seedPathExternalAuthorityPackage: externalAuthorityPackage,
    acceptedProvenancePackage,
  });
  const replacement = run.accepted_provenance_replacement_requirement;
  const packageVerification = replacement.accepted_provenance_package_verification;

  assert.equal(packageVerification.schema, ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_VERIFICATION_SCHEMA);
  assert.equal(
    packageVerification.status,
    "same_target_accepted_provenance_package_conditionally_verified"
  );
  assert.equal(packageVerification.package_conditionally_verified, true);
  assert.deepEqual(packageVerification.missing_fields, []);
  assert.equal(
    packageVerification.expected_package_payload.geometry_carrier_row_ref,
    "sh_0_sea_model:fcc_nearest_neighbor_shell_row"
  );
  assert.equal(
    packageVerification.supplied_accepted_replacement_source_row_id,
    acceptedProvenancePackage.accepted_replacement_source_row_id
  );
  assert.equal(replacement.accepted, false);
  assert.equal(replacement.requirement_passed, false);
  assert.equal(
    replacement.status,
    "seed_path_acceptance_certificate_and_external_authority_conditionally_verified_repo_authorization_blocked"
  );
  assert.equal(
    replacement.first_missing_object,
    "repo_authorization_for_accepted_held_release_seed_path_rows"
  );
  assert.equal(replacement.first_missing_field, ACCEPTED_EVIDENCE_BLOCKER_FIELD);
  assert.equal(replacement.authorization.scoreMovement, "no_score_increase");

  const badGeometryPackage = {
    ...acceptedProvenancePackage,
    geometry_carrier_row_ref: "sh_0_sea_model:not_the_fcc_shell_row",
  };
  const badGeometryRun = buildSh0SeaDiagnosticResponseRun({
    producedResponseSource: true,
    seedPathAcceptanceCertificate: acceptanceCertificate,
    seedPathExternalAuthorityPackage: externalAuthorityPackage,
    acceptedProvenancePackage: badGeometryPackage,
  });
  const badVerification =
    badGeometryRun.accepted_provenance_replacement_requirement
      .accepted_provenance_package_verification;

  assert.equal(badVerification.package_conditionally_verified, false);
  assert.equal(
    badVerification.missing_fields.includes(
      "accepted_provenance_package.geometry_carrier_row_ref"
    ),
    true
  );
  assert.equal(
    badGeometryRun.accepted_provenance_replacement_requirement.first_missing_object,
    "repo_authorization_for_accepted_held_release_seed_path_rows"
  );
  assert.equal(badGeometryRun.authorization.scoreMovement, "no_score_increase");
});

test("SH-0-sea accepted-provenance package shape cannot bypass missing seed-path acceptance", () => {
  const provisionalRun = buildSh0SeaDiagnosticResponseRun({
    producedResponseSource: true,
  });
  const provisionalPackage = {
    ...provisionalRun.accepted_provenance_replacement_requirement
      .accepted_provenance_package_verification.expected_package_payload,
  };
  const run = buildSh0SeaDiagnosticResponseRun({
    producedResponseSource: true,
    acceptedProvenancePackage: provisionalPackage,
  });
  const replacement = run.accepted_provenance_replacement_requirement;

  assert.equal(
    replacement.accepted_provenance_package_verification.package_conditionally_verified,
    true
  );
  assert.equal(replacement.accepted, false);
  assert.equal(replacement.requirement_passed, false);
  assert.equal(replacement.status, "seed_path_acceptance_certificate_missing");
  assert.equal(replacement.first_missing_object, "held_release_seed_path_rows_acceptance_certificate");
  assert.equal(replacement.first_missing_field, ACCEPTED_EVIDENCE_BLOCKER_FIELD);
  assert.equal(replacement.seed_path_acceptance.conditionally_verified, false);
  assert.equal(replacement.authorization.scoreMovement, "no_score_increase");
});

test("SH-0-sea diagnostic response run CLI emits JSON without authorizing evidence", () => {
  const output = execFileSync(
    process.execPath,
    [SCRIPT_PATH, "--response-run", "--produced-response-source", "--pretty"],
    { encoding: "utf8" }
  );
  const run = JSON.parse(output);

  assert.equal(run.schema, RESPONSE_RUN_SCHEMA);
  assert.equal(run.produced_response_source_row.schema, PRODUCED_RESPONSE_SOURCE_ROW_SCHEMA);
  assert.equal(run.candidate_response_row.schema, CANDIDATE_RESPONSE_ROW_SCHEMA);
  assert.equal(
    run.candidate_response_row.response_components.produced_response_source_row_ref,
    run.produced_response_source_row.row_id
  );
  assert.equal(
    run.floor_evaluation.candidate_response_row_id,
    run.candidate_response_row.row_id
  );
  assert.equal(run.floor_evaluation.crosses_inward_response_floor, true);
  assert.equal(run.evidence_status.accepted, false);
  assert.equal(run.accepted_evidence_blocker.first_missing_object, ACCEPTED_EVIDENCE_BLOCKER_OBJECT);
  assert.equal(run.accepted_evidence_blocker.first_missing_field, ACCEPTED_EVIDENCE_BLOCKER_FIELD);
  assert.equal(
    run.accepted_provenance_replacement_requirement.schema,
    ACCEPTED_PROVENANCE_REPLACEMENT_REQUIREMENT_SCHEMA
  );
  assert.equal(
    run.accepted_provenance_replacement_requirement.required_package_schema,
    ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_SCHEMA
  );
});

test("SH-0-sea diagnostic response run CLI propagates supplied seed-path authority diagnostics", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sh0sea-seed-path-authority-"));
  const certificatePath = path.join(tempDir, "acceptance-certificate.json");
  const externalAuthorityPackagePath = path.join(tempDir, "external-authority-package.json");
  const acceptedProvenancePackagePath = path.join(tempDir, "accepted-provenance-package.json");
  try {
    const { acceptanceCertificate, externalAuthorityPackage } =
      buildMatchingSeedPathAuthorityInputs();
    const stagedRun = buildSh0SeaDiagnosticResponseRun({
      producedResponseSource: true,
      seedPathAcceptanceCertificate: acceptanceCertificate,
      seedPathExternalAuthorityPackage: externalAuthorityPackage,
    });
    const acceptedProvenancePackage = buildMatchingAcceptedProvenancePackage(stagedRun, {
      acceptanceCertificate,
      externalAuthorityPackage,
    });
    fs.writeFileSync(certificatePath, JSON.stringify(acceptanceCertificate));
    fs.writeFileSync(externalAuthorityPackagePath, JSON.stringify(externalAuthorityPackage));
    fs.writeFileSync(acceptedProvenancePackagePath, JSON.stringify(acceptedProvenancePackage));

    const output = execFileSync(
      process.execPath,
      [
        SCRIPT_PATH,
        "--response-run",
        "--produced-response-source",
        `--acceptance-certificate-json=${certificatePath}`,
        `--external-authority-package-json=${externalAuthorityPackagePath}`,
        `--accepted-provenance-package-json=${acceptedProvenancePackagePath}`,
      ],
      { encoding: "utf8" }
    );
    const run = JSON.parse(output);
    const replacement = run.accepted_provenance_replacement_requirement;

    assert.equal(replacement.accepted, false);
    assert.equal(replacement.requirement_passed, false);
    assert.equal(
      replacement.status,
      "seed_path_acceptance_certificate_and_external_authority_conditionally_verified_repo_authorization_blocked"
    );
    assert.equal(
      replacement.first_missing_object,
      "repo_authorization_for_accepted_held_release_seed_path_rows"
    );
    assert.equal(replacement.first_missing_field, ACCEPTED_EVIDENCE_BLOCKER_FIELD);
    assert.equal(replacement.seed_path_acceptance.conditionally_verified, true);
    assert.equal(
      replacement.accepted_provenance_package_verification.package_conditionally_verified,
      true
    );
    assert.equal(replacement.authorization.scoreMovement, "no_score_increase");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
