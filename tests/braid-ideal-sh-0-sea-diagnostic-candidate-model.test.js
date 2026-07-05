import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
  AUTHORITY_CLASS,
  DEFAULT_RESPONSE_DEADBAND,
  RESPONSE_RUN_SCHEMA,
  REQUIRED_INWARD_RESPONSE_FLOOR,
  SCHEMA,
  TARGET_ARTIFACT_ID,
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

  assert.equal(rowById(model, "like_braid_population_row").accepted, false);
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

test("SH-0-sea diagnostic response run can cross the floor only as a non-authorizing parameter probe", () => {
  const run = buildSh0SeaDiagnosticResponseRun({
    responseAmplitude: 0.04,
    responseRunHandle: "sh0sea-provider-stiffness-crossing-probe",
  });

  assert.equal(run.response_probe.probe_id, "sh0sea-provider-stiffness-crossing-probe");
  assertAlmostEqual(run.floor_evaluation.Pi_R_A_sea, -0.0996);
  assert.equal(run.floor_evaluation.crosses_inward_response_floor, true);
  assert.equal(run.floor_evaluation.post_turn_return_condition_passed, true);
  assert.equal(run.floor_evaluation.additional_inward_projection_needed, 0);
  assert.equal(run.evidence_status.accepted, false);
  assert.equal(run.authorization.accepted_noether_sea_response_closure, false);
  assert.equal(run.authorization.scoreMovement, "no_score_increase");
});

test("SH-0-sea diagnostic response run CLI emits JSON without authorizing evidence", () => {
  const output = execFileSync(
    process.execPath,
    [SCRIPT_PATH, "--response-run", "--response-amplitude=0.04", "--pretty"],
    { encoding: "utf8" }
  );
  const run = JSON.parse(output);

  assert.equal(run.schema, RESPONSE_RUN_SCHEMA);
  assert.equal(run.floor_evaluation.crosses_inward_response_floor, true);
  assert.equal(run.evidence_status.accepted, false);
  assert.equal(run.accepted_evidence_blocker.first_missing_object, ACCEPTED_EVIDENCE_BLOCKER_OBJECT);
  assert.equal(run.accepted_evidence_blocker.first_missing_field, ACCEPTED_EVIDENCE_BLOCKER_FIELD);
});
