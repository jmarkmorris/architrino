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
  REPO_AUTHORIZATION_SCHEMA,
  buildHeldReleaseSeedPathRows,
} from "../scripts/braid-ideal/held-release-seed-path-rows.mjs";
import * as sh0SeaModule from "../scripts/braid-ideal/sh-0-sea-diagnostic-candidate-model.mjs";
import {
  ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
  ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_SCHEMA,
  ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_VERIFICATION_SCHEMA,
  ACCEPTED_PROVENANCE_REPLACEMENT_REQUIREMENT_SCHEMA,
  AUTHORITY_CLASS,
  CANDIDATE_SAME_RECORD_REQUEST_SCHEMA,
  DIPOLE_WAKE_SUM_MOTION_RUN_SCHEMA,
  DEFAULT_A_FCC_MAX,
  DEFAULT_A_FCC_MIN,
  DEFAULT_A_FCC_STEP,
  DEFAULT_HELD_HISTORY_WINDOW,
  DEFAULT_RESPONSE_DEADBAND,
  DIPOLE_WAKE_SUM_RETENTION_WINDOW_SCHEMA,
  DIPOLE_WAKE_SUM_RUN_SCHEMA,
  DIPOLE_WAKE_SUM_SOURCE_ROW_SCHEMA,
  DIPOLE_WAKE_SUM_SPACING_ROW_SCHEMA,
  FCC_SEA_DIAGNOSTIC_ATTEMPT_ID,
  FCC_SEA_POPULATION_SIZE,
  MASTER_EQUATION_KERNEL,
  MIN_NON_OVERLAP_A_FCC,
  REQUIRED_INWARD_RESPONSE_FLOOR,
  SCHEMA,
  TARGET_ARTIFACT_ID,
  TARGET_PROVIDER_ARTIFACT_HASH,
  TARGET_PROVIDER_OBJECT_REF,
  TARGET_RETAINED_RECORD_ID,
  TARGET_SOURCE_ROW_ID,
  REPO_AUTHORIZATION_FOR_ACCEPTED_HELD_RELEASE_SEED_PATH_ROWS_REF_PREFIX,
  WAKE_SUM_RESPONSE_KIND,
  buildSh0SeaDiagnosticCandidateModel,
  buildSh0SeaDipoleWakeSumMotionRun,
  buildSh0SeaDipoleWakeSumRun,
  evaluateSh0SeaDiagnosticCandidateModelEvidence,
  evaluateSh0SeaDipoleWakeSumMotionRunEvidence,
  evaluateSh0SeaDipoleWakeSumRunEvidence,
} from "../scripts/braid-ideal/sh-0-sea-diagnostic-candidate-model.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/braid-ideal/sh-0-sea-diagnostic-candidate-model.mjs", import.meta.url)
);

function rowById(model, suffix) {
  return model.rows.find((row) => row.row_id === `sh_0_sea_model:${suffix}`);
}

function spacingRowAt(run, aFcc) {
  return run.spacing_rows.find((row) => Math.abs(row.a_fcc - aFcc) <= 1e-9) ?? null;
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

function buildMatchingRepoAuthorization({ acceptanceCertificate, externalAuthorityPackage }) {
  return {
    schema: REPO_AUTHORIZATION_SCHEMA,
    accepted_repo_authorization: true,
    accepted_held_release_seed_path_rows: true,
    accepted_same_record_evidence: true,
    repo_authorization_for_accepted_held_release_seed_path_rows_ref:
      `${REPO_AUTHORIZATION_FOR_ACCEPTED_HELD_RELEASE_SEED_PATH_ROWS_REF_PREFIX}${TARGET_RETAINED_RECORD_ID}:${TARGET_SOURCE_ROW_ID}`,
    held_release_seed_path_rows_acceptance_certificate_ref:
      acceptanceCertificate.held_release_seed_path_rows_acceptance_certificate_ref,
    held_release_seed_path_rows_external_accepted_authority_package_ref:
      externalAuthorityPackage.external_accepted_authority_package_ref,
    external_accepted_authority_ref: acceptanceCertificate.external_accepted_authority_ref,
    external_accepted_authority_verification_ref:
      acceptanceCertificate.external_accepted_authority_verification_ref,
    verified_certificate_artifact_hash:
      externalAuthorityPackage.verified_certificate_artifact_hash,
    held_release_seed_path_rows_artifact_id:
      acceptanceCertificate.held_release_seed_path_rows_artifact_id,
    held_release_seed_path_rows_artifact_hash:
      acceptanceCertificate.held_release_seed_path_rows_artifact_hash,
    retained_record_id: TARGET_RETAINED_RECORD_ID,
    source_row_id: TARGET_SOURCE_ROW_ID,
    source_run_id: acceptanceCertificate.source_run_id,
    source_dataset_id: acceptanceCertificate.source_dataset_id,
    provider_object_ref: TARGET_PROVIDER_OBJECT_REF,
    provider_artifact_hash: TARGET_PROVIDER_ARTIFACT_HASH,
    row_ids: [...acceptanceCertificate.row_ids],
    row_artifact_hashes: [...acceptanceCertificate.row_artifact_hashes],
    negative_control_rejection_verified: true,
  };
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
  const seaResponseRow = rowById(model, "sea_response_equation_row");
  assert.equal(seaResponseRow.accepted, false);
  assert.match(seaResponseRow.equation_computed_wake_sum, /zero free amplitude/);
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

test("SH-0-sea dipole wake sum computes the delayed kernel sum over held FCC neighbor braids with zero free amplitude", () => {
  const run = buildSh0SeaDipoleWakeSumRun();

  assert.equal(run.schema, DIPOLE_WAKE_SUM_RUN_SCHEMA);
  assert.equal(run.target_artifact_id, TARGET_ARTIFACT_ID);
  assert.equal(run.master_equation_kernel.coupling, MASTER_EQUATION_KERNEL.coupling);
  assert.equal(run.master_equation_kernel.softening, MASTER_EQUATION_KERNEL.softening);
  assert.equal(run.master_equation_kernel.fieldSpeed, MASTER_EQUATION_KERNEL.fieldSpeed);
  assert.equal(run.declared_spacing_range.a_fcc_min, DEFAULT_A_FCC_MIN);
  assert.equal(run.declared_spacing_range.a_fcc_max, DEFAULT_A_FCC_MAX);
  assert.equal(run.declared_spacing_range.a_fcc_step, DEFAULT_A_FCC_STEP);
  assert.equal(run.declared_held_history_window, DEFAULT_HELD_HISTORY_WINDOW);
  assert.equal(run.spacing_rows.length, run.declared_spacing_range.spacing_row_count);
  assert.equal(run.spacing_rows.length, 37);
  assert.equal(run.free_amplitude_parameter_count, 0);
  assert.equal(run.fitted_response_amplitude_present, false);

  const sourceRow = run.wake_sum_source_row;
  assert.equal(sourceRow.schema, DIPOLE_WAKE_SUM_SOURCE_ROW_SCHEMA);
  assert.equal(sourceRow.response_kind, WAKE_SUM_RESPONSE_KIND);
  assert.equal(sourceRow.free_amplitude_parameter_count, 0);
  assert.equal(sourceRow.fitted_response_amplitude_present, false);
  assert.equal(sourceRow.held_history_declaration.neighbor_population, 12);
  assert.equal(sourceRow.held_history_declaration.undeclared_environment_degrees_of_freedom, 0);
  assert.deepEqual(sourceRow.braid_signed_polarity_dipole.components, [2, 2, 2]);
  assertAlmostEqual(sourceRow.braid_signed_polarity_dipole.norm, 2 * Math.sqrt(3));
  assert.equal(sourceRow.target_binding.target_artifact_id, TARGET_ARTIFACT_ID);
  assert.equal(sourceRow.target_binding.target_path_row_ids.length, 6);
  assert.equal(sourceRow.accepted, false);
  assert.equal(sourceRow.retained_evidence_authorized, false);

  const rowAtFour = spacingRowAt(run, 4);
  assert.equal(rowAtFour.schema, DIPOLE_WAKE_SUM_SPACING_ROW_SCHEMA);
  assertAlmostEqual(rowAtFour.Pi_R_A_sea, -0.3712418671549982, 1e-9);
  assert.equal(rowAtFour.floor_evaluation.crosses_inward_response_floor, true);
  assert.equal(rowAtFour.floor_evaluation.post_turn_return_condition_passed, true);
  assert.equal(rowAtFour.root_coverage.pass, true);
  assert.equal(rowAtFour.root_coverage.expected_directed_root_count, 432);
  assert.equal(rowAtFour.root_coverage.missing_root_count, 0);
  assert.equal(rowAtFour.field_speed.pass, true);
  assert.equal(rowAtFour.geometry_validity.pass, true);
  assert.equal(rowAtFour.free_amplitude_parameter_count, 0);
  assertAlmostEqual(rowAtFour.nearest_neighbor_center_distance, 4 / Math.SQRT2, 1e-12);

  const rowAtSix = spacingRowAt(run, 6);
  assertAlmostEqual(rowAtSix.Pi_R_A_sea, -0.0519410281723061, 1e-9);
  assert.equal(rowAtSix.floor_evaluation.crosses_inward_response_floor, false);
  assert.equal(rowAtSix.floor_evaluation.post_turn_return_condition_passed, false);

  assert.equal(
    run.spacing_rows.every((row) => row.field_speed.max_held_source_speed === 0),
    true
  );
  assert.equal(
    run.spacing_rows.every((row) => row.free_amplitude_parameter_count === 0),
    true
  );
});

test("SH-0-sea dipole wake sum reports a computed retention window against the escape floor", () => {
  const run = buildSh0SeaDipoleWakeSumRun();
  const window = run.retention_window;

  assert.equal(window.schema, DIPOLE_WAKE_SUM_RETENTION_WINDOW_SCHEMA);
  assert.equal(window.retention_window_exists, true);
  assert.equal(
    window.required_projected_response_floor,
    REQUIRED_INWARD_RESPONSE_FLOOR - DEFAULT_RESPONSE_DEADBAND
  );
  assert.equal(window.a_fcc_window_min, DEFAULT_A_FCC_MIN);
  assert.equal(window.a_fcc_window_min_boundary, "bounded_by_declared_range_min");
  assert.equal(window.a_fcc_window_max_boundary, "computed_floor_crossing");
  assert.ok(window.a_fcc_window_max > 5.34 && window.a_fcc_window_max < 5.36);
  assertAlmostEqual(window.a_fcc_window_max, 5.3469014, 1e-6);
  assert.equal(window.eligible_crossing_row_count, 10);
  assert.ok(window.a_fcc_window_min > MIN_NON_OVERLAP_A_FCC);

  const candidate = window.named_sea_spacing_candidate;
  assert.equal(candidate.a_fcc, 4.25);
  assert.equal(candidate.candidate_id, "sh0sea-aa-fcc-dipole-wake-sum:a-fcc-4.25");
  assert.ok(candidate.inward_margin_below_required_floor > 0);
  assert.match(candidate.claim_level, /not retained evidence/);

  assert.equal(run.evidence_status.accepted, false);
  assert.equal(run.authorization.accepted_retained_evidence, false);
  assert.equal(run.authorization.retained_branch_claim, false);
  assert.equal(run.authorization.accepted_noether_sea_response_closure, false);
  assert.equal(run.authorization.scoreMovement, "no_score_increase");
  assert.deepEqual(evaluateSh0SeaDipoleWakeSumRunEvidence(run), {
    accepted: false,
    reason: "diagnostic_wake_sum_run_not_accepted_retained_evidence",
    first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  });
});

test("SH-0-sea dipole wake sum truncates the retention window fail-closed when root coverage is lost", () => {
  const run = buildSh0SeaDipoleWakeSumRun({ heldHistoryWindow: 5 });
  const window = run.retention_window;

  const uncoveredRows = run.spacing_rows.filter((row) => !row.root_coverage.pass);
  assert.ok(uncoveredRows.length > 0);
  assert.ok(uncoveredRows.every((row) => row.root_coverage.missing_root_count > 0));
  assert.equal(window.retention_window_exists, true);
  assert.equal(window.a_fcc_window_max_boundary, "truncated_by_root_coverage");
  assert.ok(window.a_fcc_window_max < 5.25);
  assert.equal(run.authorization.scoreMovement, "no_score_increase");
});

test("SH-0-sea fitted-amplitude path is gone from the module and the output path", () => {
  assert.equal("buildSh0SeaDiagnosticResponseRun" in sh0SeaModule, false);
  assert.equal("evaluateSh0SeaDiagnosticResponseRunEvidence" in sh0SeaModule, false);
  assert.equal("PRODUCED_RESPONSE_SOURCE_ROW_SCHEMA" in sh0SeaModule, false);
  assert.equal("CANDIDATE_RESPONSE_ROW_SCHEMA" in sh0SeaModule, false);
  assert.equal("RESPONSE_RUN_SCHEMA" in sh0SeaModule, false);
  assert.equal("DEFAULT_PRODUCED_SOURCE_MARGIN_STEP" in sh0SeaModule, false);

  const plainOutput = execFileSync(process.execPath, [SCRIPT_PATH, "--wake-sum-run"], {
    encoding: "utf8",
  });
  const legacyFlagOutput = execFileSync(
    process.execPath,
    [
      SCRIPT_PATH,
      "--wake-sum-run",
      "--produced-response-source",
      "--response-amplitude=99",
      "--produced-source-phi=9",
      "--response-stiffness=1000",
    ],
    { encoding: "utf8" }
  );
  assert.equal(legacyFlagOutput, plainOutput);
  assert.equal(plainOutput.includes("Phi_probe"), false);
  assert.equal(plainOutput.includes("produced_response_source"), false);
  assert.equal(plainOutput.includes('"response_amplitude"'), false);

  const run = JSON.parse(plainOutput);
  assert.equal(run.free_amplitude_parameter_count, 0);
  assert.equal(run.fitted_response_amplitude_present, false);
});

test("SH-0-sea accepted-provenance replacement requirement propagates staged seed-path blockers", () => {
  const { acceptanceCertificate, externalAuthorityPackage } = buildMatchingSeedPathAuthorityInputs();
  const certificateOnlyRun = buildSh0SeaDipoleWakeSumRun({
    seedPathAcceptanceCertificate: acceptanceCertificate,
  });
  const certificateOnly = certificateOnlyRun.accepted_provenance_replacement_requirement;

  assert.equal(certificateOnly.accepted, false);
  assert.equal(certificateOnly.requirement_passed, false);
  assert.equal(certificateOnly.status, "seed_path_external_authority_package_missing");
  assert.equal(certificateOnly.response_kind, WAKE_SUM_RESPONSE_KIND);
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

  const conditionallyVerifiedRun = buildSh0SeaDipoleWakeSumRun({
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

  const repoAuthorization = buildMatchingRepoAuthorization({
    acceptanceCertificate,
    externalAuthorityPackage,
  });
  const repoAuthorizedRun = buildSh0SeaDipoleWakeSumRun({
    seedPathAcceptanceCertificate: acceptanceCertificate,
    seedPathExternalAuthorityPackage: externalAuthorityPackage,
    seedPathRepoAuthorization: repoAuthorization,
  });
  const repoAuthorized = repoAuthorizedRun.accepted_provenance_replacement_requirement;

  assert.equal(repoAuthorized.accepted, false);
  assert.equal(repoAuthorized.requirement_passed, false);
  assert.equal(repoAuthorized.status, "same_target_accepted_provenance_package_missing");
  assert.equal(repoAuthorized.seed_path_acceptance.accepted, true);
  assert.equal(repoAuthorized.seed_path_acceptance.requirement_passed, true);
  assert.equal(repoAuthorized.seed_path_acceptance.repo_authorization_status, "repo_authorization_verified");
  assert.equal(
    repoAuthorized.first_missing_object,
    "sh_0_sea_same_target_accepted_provenance_package"
  );
  assert.equal(repoAuthorized.first_missing_field, "accepted_provenance_package");
  assert.equal(repoAuthorized.accepted_provenance_status.accepted_geometry_provenance, false);
  assert.equal(repoAuthorized.authorization.scoreMovement, "no_score_increase");
});

test("SH-0-sea accepted-provenance package verifier can match the FCC carrier without authorizing evidence", () => {
  const { acceptanceCertificate, externalAuthorityPackage } = buildMatchingSeedPathAuthorityInputs();
  const stagedRun = buildSh0SeaDipoleWakeSumRun({
    seedPathAcceptanceCertificate: acceptanceCertificate,
    seedPathExternalAuthorityPackage: externalAuthorityPackage,
  });
  const acceptedProvenancePackage = buildMatchingAcceptedProvenancePackage(stagedRun, {
    acceptanceCertificate,
    externalAuthorityPackage,
  });
  const run = buildSh0SeaDipoleWakeSumRun({
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
  const badGeometryRun = buildSh0SeaDipoleWakeSumRun({
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

test("SH-0-sea replacement requirement accepts same-target provenance only after seed path repo authorization", () => {
  const { acceptanceCertificate, externalAuthorityPackage } = buildMatchingSeedPathAuthorityInputs();
  const repoAuthorization = buildMatchingRepoAuthorization({
    acceptanceCertificate,
    externalAuthorityPackage,
  });
  const stagedRun = buildSh0SeaDipoleWakeSumRun({
    seedPathAcceptanceCertificate: acceptanceCertificate,
    seedPathExternalAuthorityPackage: externalAuthorityPackage,
    seedPathRepoAuthorization: repoAuthorization,
  });
  const acceptedProvenancePackage = buildMatchingAcceptedProvenancePackage(stagedRun, {
    acceptanceCertificate,
    externalAuthorityPackage,
  });
  const run = buildSh0SeaDipoleWakeSumRun({
    seedPathAcceptanceCertificate: acceptanceCertificate,
    seedPathExternalAuthorityPackage: externalAuthorityPackage,
    seedPathRepoAuthorization: repoAuthorization,
    acceptedProvenancePackage,
  });
  const replacement = run.accepted_provenance_replacement_requirement;

  assert.equal(replacement.schema, ACCEPTED_PROVENANCE_REPLACEMENT_REQUIREMENT_SCHEMA);
  assert.equal(replacement.accepted, true);
  assert.equal(replacement.requirement_passed, true);
  assert.equal(replacement.status, "same_target_accepted_provenance_package_conditionally_verified");
  assert.equal(replacement.first_missing_object, null);
  assert.equal(replacement.first_missing_field, null);
  assert.equal(replacement.seed_path_acceptance.accepted, true);
  assert.equal(replacement.seed_path_acceptance.requirement_passed, true);
  assert.equal(
    replacement.accepted_provenance_package_verification.package_conditionally_verified,
    true
  );
  assert.deepEqual(replacement.accepted_provenance_package_verification.missing_fields, []);
  assert.equal(replacement.accepted_provenance_status.accepted_geometry_provenance, true);
  assert.equal(replacement.accepted_provenance_status.accepted_event_provenance, true);
  assert.equal(replacement.accepted_provenance_status.accepted_support_provenance, true);
  assert.equal(replacement.accepted_provenance_status.accepted_action_provenance, true);
  assert.equal(
    replacement.accepted_provenance_status.accepted_replacement_source_row_id,
    acceptedProvenancePackage.accepted_replacement_source_row_id
  );
  assert.equal(replacement.authorization.accepted_same_record_evidence, true);
  assert.equal(replacement.authorization.accepted_retained_evidence, false);
  assert.equal(replacement.authorization.accepted_noether_sea_response_closure, false);
  assert.equal(replacement.authorization.receiver_normal_branch_strength, false);
  assert.equal(replacement.authorization.scoreMovement, "no_score_increase");
  assert.equal(run.evidence_status.accepted, false);
  assert.equal(run.authorization.accepted_retained_evidence, false);

  const staleRepoAuthorizationPackage = {
    ...acceptedProvenancePackage,
    repo_authorization_for_accepted_held_release_seed_path_rows_ref:
      `${REPO_AUTHORIZATION_FOR_ACCEPTED_HELD_RELEASE_SEED_PATH_ROWS_REF_PREFIX}stale-record:stale-source`,
  };
  const staleRepoAuthorizationRun = buildSh0SeaDipoleWakeSumRun({
    seedPathAcceptanceCertificate: acceptanceCertificate,
    seedPathExternalAuthorityPackage: externalAuthorityPackage,
    seedPathRepoAuthorization: repoAuthorization,
    acceptedProvenancePackage: staleRepoAuthorizationPackage,
  });
  const staleVerification =
    staleRepoAuthorizationRun.accepted_provenance_replacement_requirement
      .accepted_provenance_package_verification;

  assert.equal(staleVerification.package_conditionally_verified, false);
  assert.equal(
    staleVerification.missing_fields.includes(
      "accepted_provenance_package.repo_authorization_for_accepted_held_release_seed_path_rows_ref"
    ),
    true
  );
  assert.equal(
    staleRepoAuthorizationRun.accepted_provenance_replacement_requirement.accepted,
    false
  );
});

test("SH-0-sea accepted-provenance package shape cannot bypass missing seed-path acceptance", () => {
  const provisionalRun = buildSh0SeaDipoleWakeSumRun();
  const provisionalPackage = {
    ...provisionalRun.accepted_provenance_replacement_requirement
      .accepted_provenance_package_verification.expected_package_payload,
  };
  const run = buildSh0SeaDipoleWakeSumRun({
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

test("SH-0-sea dipole wake-sum CLI emits JSON without authorizing evidence", () => {
  const output = execFileSync(
    process.execPath,
    [SCRIPT_PATH, "--wake-sum-run", "--pretty"],
    { encoding: "utf8" }
  );
  const run = JSON.parse(output);

  assert.equal(run.schema, DIPOLE_WAKE_SUM_RUN_SCHEMA);
  assert.equal(run.wake_sum_source_row.schema, DIPOLE_WAKE_SUM_SOURCE_ROW_SCHEMA);
  assert.equal(run.retention_window.retention_window_exists, true);
  assert.equal(run.retention_window.a_fcc_window_max_boundary, "computed_floor_crossing");
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

test("SH-0-sea dipole wake-sum CLI propagates supplied seed-path authority diagnostics", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sh0sea-seed-path-authority-"));
  const certificatePath = path.join(tempDir, "acceptance-certificate.json");
  const externalAuthorityPackagePath = path.join(tempDir, "external-authority-package.json");
  const repoAuthorizationPath = path.join(tempDir, "repo-authorization.json");
  const acceptedProvenancePackagePath = path.join(tempDir, "accepted-provenance-package.json");
  try {
    const { acceptanceCertificate, externalAuthorityPackage } =
      buildMatchingSeedPathAuthorityInputs();
    const repoAuthorization = buildMatchingRepoAuthorization({
      acceptanceCertificate,
      externalAuthorityPackage,
    });
    const stagedRun = buildSh0SeaDipoleWakeSumRun({
      seedPathAcceptanceCertificate: acceptanceCertificate,
      seedPathExternalAuthorityPackage: externalAuthorityPackage,
      seedPathRepoAuthorization: repoAuthorization,
    });
    const acceptedProvenancePackage = buildMatchingAcceptedProvenancePackage(stagedRun, {
      acceptanceCertificate,
      externalAuthorityPackage,
    });
    fs.writeFileSync(certificatePath, JSON.stringify(acceptanceCertificate));
    fs.writeFileSync(externalAuthorityPackagePath, JSON.stringify(externalAuthorityPackage));
    fs.writeFileSync(repoAuthorizationPath, JSON.stringify(repoAuthorization));
    fs.writeFileSync(acceptedProvenancePackagePath, JSON.stringify(acceptedProvenancePackage));

    const output = execFileSync(
      process.execPath,
      [
        SCRIPT_PATH,
        "--wake-sum-run",
        `--acceptance-certificate-json=${certificatePath}`,
        `--external-authority-package-json=${externalAuthorityPackagePath}`,
        `--repo-authorization-json=${repoAuthorizationPath}`,
        `--accepted-provenance-package-json=${acceptedProvenancePackagePath}`,
      ],
      { encoding: "utf8" }
    );
    const run = JSON.parse(output);
    const replacement = run.accepted_provenance_replacement_requirement;

    assert.equal(replacement.accepted, true);
    assert.equal(replacement.requirement_passed, true);
    assert.equal(
      replacement.status,
      "same_target_accepted_provenance_package_conditionally_verified"
    );
    assert.equal(replacement.first_missing_object, null);
    assert.equal(replacement.first_missing_field, null);
    assert.equal(replacement.seed_path_acceptance.conditionally_verified, true);
    assert.equal(replacement.seed_path_acceptance.repo_authorization_status, "repo_authorization_verified");
    assert.equal(
      replacement.accepted_provenance_package_verification.package_conditionally_verified,
      true
    );
    assert.equal(replacement.accepted_provenance_status.accepted_action_provenance, true);
    assert.equal(replacement.authorization.scoreMovement, "no_score_increase");
    assert.equal(run.evidence_status.accepted, false);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("SH-0-sea delayed-echo motion run reproduces the static sum in the zero-amplitude motion limit", () => {
  const run = buildSh0SeaDipoleWakeSumMotionRun({
    neighborMotion: "breathing",
    motionDelta: 0,
    motionOmegaGrid: [2],
    motionPhaseSamples: 4,
    aFccMin: 4,
    aFccMax: 5,
    aFccStep: 0.5,
  });

  assert.equal(run.schema, DIPOLE_WAKE_SUM_MOTION_RUN_SCHEMA);
  assert.equal(run.neighbor_motion_declaration.kind, "breathing");
  assert.equal(run.neighbor_motion_declaration.breathing_delta, 0);
  assert.equal(run.neighbor_motion_declaration.undeclared_environment_degrees_of_freedom, 0);
  assert.equal(run.free_amplitude_parameter_count, 0);
  assert.equal(run.fitted_response_amplitude_present, false);
  assert.equal(run.omega_results.length, 1);

  const rowAtFour = run.omega_results[0].spacing_rows.find(
    (row) => Math.abs(row.a_fcc - 4) <= 1e-9
  );
  assert.ok(rowAtFour.phase_envelope.spread <= 1e-12);
  assertAlmostEqual(rowAtFour.phase_envelope.Pi_R_mean, -0.3712418671549982, 1e-9);
  assert.equal(rowAtFour.floor_evaluation.crosses_inward_response_floor_all_phases, true);
  assert.equal(rowAtFour.floor_evaluation.crosses_inward_response_floor_some_phase, true);
  assert.equal(rowAtFour.root_coverage.pass, true);
  assert.equal(rowAtFour.field_speed.pass, true);
  assert.equal(rowAtFour.free_amplitude_parameter_count, 0);

  const staticReference = run.static_reference_rows.find(
    (row) => Math.abs(row.a_fcc - 4) <= 1e-9
  );
  assertAlmostEqual(rowAtFour.phase_envelope.Pi_R_mean, staticReference.Pi_R_A_sea, 1e-9);

  assert.equal(run.evidence_status.accepted, false);
  assert.equal(run.authorization.retained_branch_claim, false);
  assert.equal(run.authorization.scoreMovement, "no_score_increase");
  assert.deepEqual(evaluateSh0SeaDipoleWakeSumMotionRunEvidence(run), {
    accepted: false,
    reason: "diagnostic_wake_sum_motion_run_not_accepted_retained_evidence",
    first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  });
});

test("SH-0-sea delayed-echo breathing run splits the retention window boundary by phase", () => {
  const run = buildSh0SeaDipoleWakeSumMotionRun({
    neighborMotion: "breathing",
    motionDelta: 0.2,
    motionOmegaGrid: [2],
    motionPhaseSamples: 16,
    aFccMin: 4,
    aFccMax: 7,
    aFccStep: 0.5,
  });
  const result = run.omega_results[0];
  const guaranteed = result.retention_windows.guaranteed_all_phases;
  const conditional = result.retention_windows.phase_conditional;

  assert.equal(result.field_speed_pass, true);
  assert.equal(guaranteed.retention_window_exists, true);
  assert.equal(conditional.retention_window_exists, true);
  assert.ok(guaranteed.a_fcc_window_max < conditional.a_fcc_window_max);
  assert.ok(guaranteed.a_fcc_window_max < run.delayed_echo_verdict.static_reference_boundary);
  assert.ok(conditional.a_fcc_window_max > run.delayed_echo_verdict.static_reference_boundary);
  assert.equal(result.phase_dependence.observed, true);
  assert.ok(result.candidate_spacing_status.phase_envelope.spread > 0.01);
  assert.equal(result.candidate_spacing_status.a_fcc, 4.25);
  assert.equal(run.delayed_echo_verdict.phase_dependence_observed, true);
  assert.equal(run.delayed_echo_verdict.retention_window_boundary_split_observed, true);
  assert.equal(run.delayed_echo_verdict.per_omega_boundaries.length, 1);
  assert.equal(run.wake_sum_source_row.neighbor_motion_declaration.kind, "breathing");
  assert.equal(run.authorization.accepted_noether_sea_response_closure, false);
  assert.equal(run.authorization.scoreMovement, "no_score_increase");
});

test("SH-0-sea delayed-echo orbiting run reports phase-conditional retention and excludes super-field-speed rows fail-closed", () => {
  const run = buildSh0SeaDipoleWakeSumMotionRun({
    neighborMotion: "orbiting",
    motionOmegaGrid: [0.5, 1.5],
    motionPhaseSamples: 8,
    motionSpinAxis: [0, 0, 1],
    aFccMin: 4,
    aFccMax: 5.5,
    aFccStep: 0.5,
  });
  const subField = run.omega_results.find((result) => result.omega === 0.5);
  const superField = run.omega_results.find((result) => result.omega === 1.5);

  assert.deepEqual(run.neighbor_motion_declaration.spin_axis_unit, [0, 0, 1]);
  assert.equal(subField.field_speed_pass, true);
  assert.equal(subField.retention_windows.guaranteed_all_phases.retention_window_exists, false);
  assert.equal(subField.retention_windows.phase_conditional.retention_window_exists, true);
  assert.equal(subField.phase_dependence.observed, true);

  assert.equal(superField.max_source_speed_bound, 1.5);
  assert.equal(superField.field_speed_pass, false);
  assert.equal(
    superField.spacing_rows.every((row) => row.field_speed.pass === false),
    true
  );
  assert.equal(superField.retention_windows.guaranteed_all_phases.retention_window_exists, false);
  assert.equal(superField.retention_windows.phase_conditional.retention_window_exists, false);
  assert.equal(run.authorization.scoreMovement, "no_score_increase");
});

test("SH-0-sea candidate same-record request feeds the a_FCC=4.25 candidate into the chain fail-closed", () => {
  const run = buildSh0SeaDipoleWakeSumRun();
  const request = run.candidate_same_record_request;

  assert.equal(request.schema, CANDIDATE_SAME_RECORD_REQUEST_SCHEMA);
  assert.equal(request.authority_class, AUTHORITY_CLASS);
  assert.equal(request.candidate.a_fcc, 4.25);
  assert.equal(request.candidate.candidate_id, "sh0sea-aa-fcc-dipole-wake-sum:a-fcc-4.25");
  assertAlmostEqual(request.candidate.Pi_R_A_sea, -0.2833417889031177, 1e-9);
  assert.ok(request.candidate.inward_margin_below_required_floor > 0);
  assert.equal(request.target_binding.target_artifact_id, TARGET_ARTIFACT_ID);
  assert.equal(request.target_binding.retained_record_id, TARGET_RETAINED_RECORD_ID);
  assert.equal(
    request.required_same_record_objects.includes(
      "held_release_seed_path_rows_acceptance_certificate.v0"
    ),
    true
  );
  assert.equal(
    request.required_same_record_objects.includes(
      "central_solver_retained_source_adapter_same_record_accepted_evidence_package.v0"
    ),
    true
  );
  assert.equal(request.downstream_consumers.includes("self_hit_held_release_solver_row"), true);
  assert.equal(request.accepted, false);
  assert.equal(request.retained_evidence_authorized, false);
  assert.equal(request.first_missing_object, ACCEPTED_EVIDENCE_BLOCKER_OBJECT);
  assert.equal(request.first_missing_field, ACCEPTED_EVIDENCE_BLOCKER_FIELD);
  assert.equal(request.authorization.accepted_same_record_evidence, false);
  assert.equal(request.authorization.scoreMovement, "no_score_increase");

  const motionRun = buildSh0SeaDipoleWakeSumMotionRun({
    neighborMotion: "breathing",
    motionDelta: 0.2,
    motionOmegaGrid: [2],
    motionPhaseSamples: 4,
    aFccMin: 4,
    aFccMax: 5,
    aFccStep: 0.5,
  });
  const motionRequest = motionRun.candidate_same_record_request;
  assert.equal(motionRequest.schema, CANDIDATE_SAME_RECORD_REQUEST_SCHEMA);
  // The reduced test grid names its own midpoint candidate; the default declared
  // range names a_FCC=4.25 (asserted on the static run above).
  assert.equal(motionRequest.candidate.a_fcc, 4.5);
  assert.equal(motionRequest.neighbor_motion_declaration.kind, "breathing");
  assert.equal(
    motionRequest.neighbor_motion_declaration.candidate_spacing_status_per_omega.length,
    1
  );
  assert.equal(motionRequest.accepted, false);
});
