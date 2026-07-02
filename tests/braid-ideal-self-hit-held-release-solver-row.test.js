import assert from "node:assert/strict";
import test from "node:test";

import {
  buildSelfHitHeldReleaseSolverRow,
  validateSelfHitHeldReleaseSolverRow,
} from "../scripts/braid-ideal/self-hit-held-release-solver-row.mjs";

test("self-hit held-release solver row is deterministic and fail closed", () => {
  const first = buildSelfHitHeldReleaseSolverRow();
  const second = buildSelfHitHeldReleaseSolverRow();

  assert.deepEqual(first, second);
  assert.equal(first.schema, "self_hit_held_release_solver_row.v0");
  assert.equal(first.artifact_status, "fail_closed_missing_central_solver_retained_history_row");
  assert.equal(first.source_status, "source_acquisition_blocked");
  assert.equal(first.first_missing_object, "central_solver_retained_history_row");
  assert.equal(first.first_missing_field, "central_solver_retained_history_row");
  assert.equal(first.seed.point_count, 6);
  assert.equal(first.path_history_stream_requests.length, 6);
  assert.equal(first.same_source_self_hit_row_requirements.length, 6);
  assert.equal(first.partner_causal_root_replay_requirements.length, 30);
  assert.equal(first.artifact_hash.length, 64);
  assert.equal(first.row_id.startsWith("self_hit_held_release_solver_row:"), true);

  assert.deepEqual(first.dynamics.group_velocity.value, [1 / 60, 1 / 60, 1 / 60]);
  assert.equal(
    first.dynamics.group_velocity.source_status,
    "declared_seed_parameter_not_retained_history_evidence"
  );

  assert.deepEqual(validateSelfHitHeldReleaseSolverRow(first), []);
});

test("self-hit held-release solver row requests useful same-record inputs without authorizing evidence", () => {
  const row = buildSelfHitHeldReleaseSolverRow();

  assert.equal(
    row.path_history_stream_requests.every(
      (request) =>
        request.status === "request_only_missing_central_solver_retained_history_row" &&
        request.stream_id === null &&
        request.retained_history_binding === null
    ),
    true
  );
  assert.equal(
    row.same_source_self_hit_row_requirements.every(
      (request) =>
        request.receiver_architrino_id === request.source_architrino_id &&
        request.required_relation === "strictly-delayed-same-source-root" &&
        request.accepted_same_source_self_hit_row === null &&
        request.first_missing_field === "central_solver_retained_history_row"
    ),
    true
  );
  assert.equal(
    row.partner_causal_root_replay_requirements.every(
      (request) =>
        request.receiver_architrino_id !== request.source_architrino_id &&
        request.required_relation === "partner-causal-root-replay" &&
        request.retained_causal_root_row_id === null
    ),
    true
  );
  assert.equal(row.wake_ledger_hooks[0].accepted_rows.length, 0);
  assert.equal(row.action_ledger_hooks[0].accepted_rows.length, 0);
  assert.equal(row.branch_row_identity_requirements.branch_row_identity, null);
  assert.equal(row.oblate_spheroid_residual_row_requirements.residual_rows.length, 0);
  assert.equal(row.stability_or_return_margin_requirement.accepted_stability_or_return_margin_row, null);
  assert.equal(row.retained_source_binding_requirement.retained_source_binding, null);
  assert.equal(row.provider_provenance_requirement.provider_object, null);
});

test("self-hit held-release solver row rejects every retained-branch authorization", () => {
  const row = buildSelfHitHeldReleaseSolverRow();

  assert.equal(row.authorization.accepted_same_record_evidence, false);
  assert.equal(row.authorization.retained_branch_claim, false);
  assert.equal(row.authorization.accepted_transition_source, false);
  assert.equal(row.authorization.moving_retained_branch_certificate, false);
  assert.equal(row.authorization.same_ledger_action_measure_row, false);
  assert.equal(row.authorization.bounded_speed_live_ledger, false);
  assert.equal(row.authorization.receiver_normal_branch_strength, false);
  assert.equal(row.authorization.score_movement, "no_score_increase");
  assert.deepEqual(row.negative_controls, [
    "priority_only_held_release_toy_not_retained_history",
    "dirty_checkpoint_output_not_accepted_evidence",
    "circular_self_hit_span_not_six_point_retained_row",
    "moving_circular_same_source_roots_not_held_release_row",
    "path_history_stream_without_same_record_binding_not_accepted",
    "t3_retained_replay_rows_not_braid_ideal_evidence",
    "aggregate_or_cross_row_bundle_not_same_record",
    "candidate_or_proxy_refs_not_accepted",
  ]);
});
