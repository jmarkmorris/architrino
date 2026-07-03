import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  FIRST_MISSING_SOURCE_PROOF_FIELD,
  INTERNAL_TANGENT_AUTHORITY_FIRST_MISSING_FIELD,
  INTERNAL_TANGENT_AUTHORITY_FIRST_MISSING_OBJECT,
  INTERNAL_TANGENT_AUTHORITY_VECTOR_REQUEST_SCHEMA,
  NEGATIVE_CONTROL_REASONS,
  buildCentralSolverRetainedHistoryRow,
  evaluateRetainedHistoryEvidenceCandidate,
  validateCentralSolverRetainedHistoryRow,
} from "../scripts/braid-ideal/central-solver-retained-history-row.mjs";

const SCRIPT_PATH = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../scripts/braid-ideal/central-solver-retained-history-row.mjs"
);

test("central solver retained-history row is deterministic and sharpens the first blocker", () => {
  const first = buildCentralSolverRetainedHistoryRow();
  const second = buildCentralSolverRetainedHistoryRow();

  assert.deepEqual(first, second);
  assert.equal(first.schema, "central_solver_retained_history_row.v0");
  assert.equal(first.artifact_status, "fail_closed_missing_provider_provenance");
  assert.equal(first.source_status, "source_acquisition_blocked");
  assert.equal(first.first_missing_object, "central_solver_retained_history_provider_object");
  assert.equal(first.first_missing_field, FIRST_MISSING_SOURCE_PROOF_FIELD);
  assert.equal(
    first.consumer_blocker_replacement.previous_first_missing_field,
    "central_solver_retained_history_row"
  );
  assert.equal(
    first.consumer_blocker_replacement.sharpened_first_missing_field,
    FIRST_MISSING_SOURCE_PROOF_FIELD
  );
  assert.equal(first.seed.point_count, 6);
  assert.equal(first.artifact_hash.length, 64);
  assert.equal(first.row_id.startsWith("central_solver_retained_history_row:"), true);

  assert.deepEqual(validateCentralSolverRetainedHistoryRow(first), []);
});

test("central solver retained-history row carries all same-record request families", () => {
  const row = buildCentralSolverRetainedHistoryRow();

  assert.equal(row.path_history_stream_requirements.length, 6);
  assert.equal(row.same_source_self_hit_requirements.length, 6);
  assert.equal(row.partner_causal_root_replay_requirements.length, 30);

  assert.equal(
    row.path_history_stream_requirements.every(
      (request) =>
        request.required_layout === "path_segment.v1" &&
        request.required_same_record_binding === true &&
        request.required_dynamic_replay === true &&
        request.path_history_stream_id === null &&
        request.first_missing_field === FIRST_MISSING_SOURCE_PROOF_FIELD
    ),
    true
  );
  assert.equal(
    row.same_source_self_hit_requirements.every(
      (request) =>
        request.receiver_architrino_id === request.source_architrino_id &&
        request.required_relation === "strictly-delayed-same-source-root" &&
        request.accepted_same_source_self_hit_row_ref === null &&
        request.first_missing_field === FIRST_MISSING_SOURCE_PROOF_FIELD
    ),
    true
  );
  assert.equal(
    row.partner_causal_root_replay_requirements.every(
      (request) =>
        request.receiver_architrino_id !== request.source_architrino_id &&
        request.required_relation === "directed-partner-causal-root-replay" &&
        request.retained_causal_root_row_ref === null &&
        request.causal_root_replay_ref === null
    ),
    true
  );
  assert.deepEqual(row.dynamics.group_velocity.value, [1 / 60, 1 / 60, 1 / 60]);
  assert.equal(row.wake_ledger_hook_requirement.accepted_rows.length, 0);
  assert.equal(row.action_ledger_hook_requirement.accepted_rows.length, 0);
  assert.equal(row.branch_row_identity_requirement.branch_row_identity_ref, null);
  assert.equal(row.oblate_spheroid_residual_row_requirement.residual_rows.length, 0);
  assert.equal(row.internal_tangent_authority_vector_request.schema, INTERNAL_TANGENT_AUTHORITY_VECTOR_REQUEST_SCHEMA);
  assert.equal(
    row.internal_tangent_authority_vector_request.consumer_schema,
    "oblate_spheroid_internal_tangent_authority_certificate.v0"
  );
  assert.equal(
    row.internal_tangent_authority_vector_request.vector_space,
    "global retained acceleration vector over the declared architrino slot order for one preferred-curve row and one retained time slice"
  );
  assert.equal(
    row.internal_tangent_authority_vector_request.equations.tangent_target,
    "T(q) = P_T(a_ansatz(q) - a_wake(q) - a_support(q)), q=(u,v_orb)"
  );
  assert.equal(
    row.internal_tangent_authority_vector_request.equations.branch_clock_lock_replacement_residual,
    "abs(||T(q)|| - A_clock_rms(q)) <= epsilon_lock"
  );
  assert.equal(
    row.internal_tangent_authority_vector_request.equations.causal_root_residual,
    "Phi_ab(t,tau;q)=||x_a(t;q)-x_b(t-tau;q)||^2-c_f^2 tau^2=0"
  );
  assert.equal(
    row.internal_tangent_authority_vector_request.equations.causal_root_sensitivity,
    "d tau_ab/d q_i = - partial_{q_i} Phi_ab / partial_tau Phi_ab when |partial_tau Phi_ab| >= epsilon_tau"
  );
  assert.equal(
    row.internal_tangent_authority_vector_request.equations.action_closure,
    "abs(Delta A_internal(q)-Delta A_clock(q)) <= epsilon_A"
  );
  assert.equal(
    row.internal_tangent_authority_vector_request.equations.minimum_gain,
    "K_x^*(q)=-T(q) e_x^T/(||e_x||^2+||e_v||^2), K_v^*(q)=-T(q) e_v^T/(||e_x||^2+||e_v||^2)"
  );
  assert.equal(
    row.internal_tangent_authority_vector_request.equations.preferred_curve_slope,
    "v_*'(u)=-J_u/J_v"
  );
  assert.equal(
    row.internal_tangent_authority_vector_request.preferred_curve_binding.required_equation_schema,
    "preferred_curve_internal_tangent_authority_equation.v0"
  );
  assert.deepEqual(
    row.internal_tangent_authority_vector_request.required_same_record_rows.map((request) => request.row),
    [
      "same_record_retained_path_error_row",
      "same_record_retained_root_ledger_detail_rows",
      "retained_solver_tangent_target_vector_row",
      "active_causal_margin_gradient_vector_row",
      "post_provider_root_margin_row",
      "same_record_action_closure_row",
      "same_record_closure_rows",
    ]
  );
  assert.deepEqual(row.internal_tangent_authority_vector_request.required_same_record_rows[0].required_fields, [
    "source_row_id",
    "retained_record_id",
    "time",
    "particle_slot_order",
    "path_history_ref",
    "tangent_position_error_vector",
    "tangent_velocity_error_vector",
  ]);
  assert.deepEqual(row.internal_tangent_authority_vector_request.required_same_record_rows[1].required_fields, [
    "source_row_id",
    "retained_record_id",
    "ledgerKey",
    "sourceKey",
    "receiverKey",
    "rootKey",
    "emissionTime",
    "hitTime",
    "delay",
    "residual",
    "jacobian",
    "branchWeight",
    "sourceNormalDenominator",
    "receiverNormalFactor",
    "entryKind",
    "rootKind",
    "statusCode",
    "stateFlags",
  ]);
  assert.deepEqual(row.internal_tangent_authority_vector_request.required_same_record_rows[5].required_fields, [
    "source_row_id",
    "retained_record_id",
    "action_ledger_ref",
    "assigned_clock_lock_action_increment",
    "internal_replacement_action_increment",
    "action_increment_residual",
    "action_residual_tolerance",
    "action_closure_passed",
  ]);
  assert.equal(
    row.internal_tangent_authority_vector_request.evaluator_binding.minimum_gain_evaluator_schema,
    "minimum_norm_retained_history_gain_witness_evaluation.v0"
  );
  assert.equal(
    row.internal_tangent_authority_vector_request.evaluator_binding.preferred_curve_equation_schema,
    "preferred_curve_internal_tangent_authority_equation.v0"
  );
  assert.equal(
    row.internal_tangent_authority_vector_request.evaluator_binding.same_record_witness_row_schema,
    "same_record_minimum_norm_retained_history_gain_witness_row.v0"
  );
  assert.equal(
    row.internal_tangent_authority_vector_request.preferred_curve_internal_tangent_authority_equation_ref,
    null
  );
  assert.equal(
    row.internal_tangent_authority_vector_request.preferred_curve_binding.branch_clock_lock_replacement_residual_ref,
    null
  );
  assert.equal(row.internal_tangent_authority_vector_request.minimum_norm_retained_history_gain_witness_row_ref, null);
  assert.equal(row.internal_tangent_authority_vector_request.accepted_internal_tangent_authority_ref, null);
  assert.equal(row.internal_tangent_authority_vector_request.accepted, false);
  assert.equal(
    row.internal_tangent_authority_vector_request.first_missing_object,
    INTERNAL_TANGENT_AUTHORITY_FIRST_MISSING_OBJECT
  );
  assert.equal(
    row.internal_tangent_authority_vector_request.first_missing_field,
    INTERNAL_TANGENT_AUTHORITY_FIRST_MISSING_FIELD
  );
  assert.equal(row.retained_source_binding_requirement.retained_source_binding_ref, null);
  assert.equal(row.provider_provenance.provider_object_ref, null);
});

test("central solver retained-history row remains unauthorized for downstream claims", () => {
  const row = buildCentralSolverRetainedHistoryRow();

  assert.equal(row.authorization.accepted_same_record_evidence, false);
  assert.equal(row.authorization.central_solver_retained_history_row, false);
  assert.equal(row.authorization.retained_branch_claim, false);
  assert.equal(row.authorization.accepted_transition_source, false);
  assert.equal(row.authorization.moving_retained_branch_certificate, false);
  assert.equal(row.authorization.same_ledger_action_measure_row, false);
  assert.equal(row.authorization.bounded_speed_live_ledger, false);
  assert.equal(row.authorization.receiver_normal_branch_strength, false);
  assert.equal(row.authorization.score_movement, "no_score_increase");
});

test("central solver retained-history row can carry candidate provider backing without authorizing evidence", () => {
  const row = buildCentralSolverRetainedHistoryRow({
    retainedRecordId: "retained-record:braid-ideal:test-provider-backed",
    providerObjectRef: "candidate:central_solver_retained_history_provider_object:test",
    providerArtifactHash: "provider-hash-test",
  });

  assert.equal(row.artifact_status, "provider_backed_retained_history_row_present_acceptance_blocked");
  assert.equal(row.source_status, "candidate_provider_backed_source_unaccepted");
  assert.equal(row.first_missing_object, "central_solver_retained_history_row_acceptance_certificate");
  assert.equal(row.first_missing_field, "central_solver_retained_history_row.acceptance_certificate_ref");
  assert.equal(row.retained_record_request.retained_record_id, "retained-record:braid-ideal:test-provider-backed");
  assert.equal(
    row.retained_record_request.same_record_binding_status,
    "provider_backed_retained_record_present_unaccepted"
  );
  assert.equal(
    row.provider_provenance.provider_object_ref,
    "candidate:central_solver_retained_history_provider_object:test"
  );
  assert.equal(row.provider_provenance.provider_artifact_hash, "provider-hash-test");
  assert.equal(row.provider_provenance.status, "provider_object_ref_present_unaccepted");
  assert.equal(row.authorization.central_solver_retained_history_row, false);
  assert.equal(row.authorization.score_movement, "no_score_increase");
  assert.deepEqual(validateCentralSolverRetainedHistoryRow(row), []);
  assert.deepEqual(evaluateRetainedHistoryEvidenceCandidate(row), {
    accepted: false,
    reason: "adapter_does_not_authorize_retained_history_evidence",
    first_missing_field: FIRST_MISSING_SOURCE_PROOF_FIELD,
  });
});

test("central solver retained-history row CLI emits provider-backed acceptance blocker", () => {
  const retainedRecordId = "retained-record:braid-ideal:cli-provider-backed";
  const providerObjectRef = "candidate:central_solver_retained_history_provider_object:cli";
  const providerArtifactHash = "provider-hash-cli";
  const output = execFileSync(
    process.execPath,
    [
      SCRIPT_PATH,
      `--retained-record-id=${retainedRecordId}`,
      `--provider-object-ref=${providerObjectRef}`,
      `--provider-artifact-hash=${providerArtifactHash}`,
      "--pretty",
    ],
    { encoding: "utf8" }
  );
  const row = JSON.parse(output);

  assert.equal(row.source_status, "candidate_provider_backed_source_unaccepted");
  assert.equal(row.first_missing_object, "central_solver_retained_history_row_acceptance_certificate");
  assert.equal(row.first_missing_field, "central_solver_retained_history_row.acceptance_certificate_ref");
  assert.equal(row.retained_record_request.retained_record_id, retainedRecordId);
  assert.equal(row.provider_provenance.provider_object_ref, providerObjectRef);
  assert.equal(row.provider_provenance.provider_artifact_hash, providerArtifactHash);
  assert.equal(row.authorization.central_solver_retained_history_row, false);
  assert.equal(row.authorization.score_movement, "no_score_increase");
});

test("central solver retained-history evidence guard rejects non-evidence classes", () => {
  const rejectedClasses = Object.keys(NEGATIVE_CONTROL_REASONS);
  assert.equal(rejectedClasses.length, 15);

  for (const evidenceClass of rejectedClasses) {
    const result = evaluateRetainedHistoryEvidenceCandidate({ evidence_class: evidenceClass });
    assert.deepEqual(result, {
      accepted: false,
      reason: NEGATIVE_CONTROL_REASONS[evidenceClass],
      first_missing_field: FIRST_MISSING_SOURCE_PROOF_FIELD,
    });
  }

  assert.deepEqual(evaluateRetainedHistoryEvidenceCandidate({ schema: "t3-retained-causal-root-replay.v1" }), {
    accepted: false,
    reason: "schema_not_central_solver_retained_history_row_v0",
    first_missing_field: FIRST_MISSING_SOURCE_PROOF_FIELD,
  });
  assert.deepEqual(evaluateRetainedHistoryEvidenceCandidate(buildCentralSolverRetainedHistoryRow()), {
    accepted: false,
    reason: "provider_provenance_missing",
    first_missing_field: FIRST_MISSING_SOURCE_PROOF_FIELD,
  });
});
