import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
  AUTHORITY_CLASS,
  REQUIRED_INWARD_RESPONSE_FLOOR,
  SCHEMA,
  TARGET_ARTIFACT_ID,
  buildSh0SeaDiagnosticCandidateModel,
  evaluateSh0SeaDiagnosticCandidateModelEvidence,
} from "../scripts/braid-ideal/sh-0-sea-diagnostic-candidate-model.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/braid-ideal/sh-0-sea-diagnostic-candidate-model.mjs", import.meta.url)
);

function rowById(model, suffix) {
  return model.rows.find((row) => row.row_id === `sh_0_sea_model:${suffix}`);
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
