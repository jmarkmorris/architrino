import assert from "node:assert/strict";
import test from "node:test";

import {
  buildSelfHitHeldReleaseSolverRow,
  summarizeSeaScreenedSelfHitComparison,
  validateSelfHitHeldReleaseSolverRow,
  CANDIDATE_SAME_RECORD_REQUEST_SCHEMA,
  SEA_SELF_HIT_COMPARISON_SCHEMA,
} from "../scripts/braid-ideal/self-hit-held-release-solver-row.mjs";

function makeSyntheticToyResult({ includeSelfHits, frames, turnTimes = [], selfHitRoots = 0, maxBranchWeight = 10 }) {
  return {
    configuration: {
      includeSelfHits,
      selfHitMinDelay: 0.002,
      prehistoryMode: "moving-prehistory",
      angularMomentumRelease: { surfaceSpeedFraction: 0.95 },
      fccSeaShell: { spacing: 4.25 },
    },
    frames: frames.map(([time, radiusMean, speedMax, fieldSpeedRatioMax]) => ({
      time,
      metrics: { radiusMean, speedMax, fieldSpeedRatioMax },
    })),
    trajectoryDiagnostics: {
      radialTurnRows: turnTimes.map((time) => ({ turnKind: "expansion_to_compression", time })),
    },
    rootStats: { selfHitRoots, maxSelfHitRootsPerDirectedPair: selfHitRoots > 0 ? 1 : 0, maxBranchWeight },
  };
}

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

test("candidate same-record target binding stays fail closed with and without the request", () => {
  const bare = buildSelfHitHeldReleaseSolverRow();
  assert.equal(bare.candidate_same_record_target_binding.supplied, false);
  assert.equal(bare.candidate_same_record_target_binding.binding_status, "candidate_request_missing");
  assert.equal(bare.candidate_same_record_target_binding.authorizes_nothing, true);
  assert.deepEqual(validateSelfHitHeldReleaseSolverRow(bare), []);

  const request = {
    schema: CANDIDATE_SAME_RECORD_REQUEST_SCHEMA,
    authority_class: "diagnostic_candidate_model_not_accepted_evidence",
    candidate: { candidate_id: "sh0sea-aa-fcc-dipole-wake-sum:a-fcc-4.25", a_fcc: 4.25, Pi_R_A_sea: -0.2833 },
    downstream_consumers: ["self_hit_held_release_solver_row"],
    first_missing_object: "held_release_seed_path_rows_acceptance_certificate.v0",
  };
  const bound = buildSelfHitHeldReleaseSolverRow({ candidateSameRecordRequest: request });
  const binding = bound.candidate_same_record_target_binding;
  assert.equal(binding.binding_status, "candidate_request_bound_not_accepted");
  assert.equal(binding.candidate_id, "sh0sea-aa-fcc-dipole-wake-sum:a-fcc-4.25");
  assert.equal(binding.consumer_listed, true);
  assert.equal(binding.request_first_missing_object, "held_release_seed_path_rows_acceptance_certificate.v0");
  assert.equal(binding.authorizes_nothing, true);
  // Binding never unblocks the row.
  assert.equal(bound.artifact_status, "fail_closed_missing_central_solver_retained_history_row");
  assert.deepEqual(validateSelfHitHeldReleaseSolverRow(bound), []);

  const rejected = buildSelfHitHeldReleaseSolverRow({
    candidateSameRecordRequest: { ...request, downstream_consumers: [] },
  });
  assert.equal(
    rejected.candidate_same_record_target_binding.binding_status,
    "candidate_request_invalid_or_consumer_not_listed"
  );
});

test("sea-screened self-hit comparison summarizer names hinge activation and post-hinge amplification", () => {
  // Sub-field frames identical, divergence exactly at the crossing frame,
  // self-hit row runs away while the baseline stays bounded.
  const withSelfHits = makeSyntheticToyResult({
    includeSelfHits: true,
    frames: [
      [0, 1, 0.9, 0.9],
      [0.2, 1.1, 0.95, 0.95],
      [0.4, 1.2, 1.0, 1.0],
      [0.6, 2.0, 4.0, 4.0],
    ],
    turnTimes: [0.34],
    selfHitRoots: 100,
    maxBranchWeight: 160,
  });
  const withoutSelfHits = makeSyntheticToyResult({
    includeSelfHits: false,
    frames: [
      [0, 1, 0.9, 0.9],
      [0.2, 1.1, 0.95, 0.95],
      [0.4, 1.2, 1.0, 1.0],
      [0.6, 1.4, 1.6, 1.6],
    ],
    turnTimes: [0.34],
    maxBranchWeight: 25,
  });
  const comparison = summarizeSeaScreenedSelfHitComparison({
    runHandle: "synthetic-vt095",
    withSelfHits,
    withoutSelfHits,
  });
  assert.equal(comparison.schema, SEA_SELF_HIT_COMPARISON_SCHEMA);
  assert.equal(comparison.accepted, false);
  assert.equal(comparison.first_divergence_frame_time, 0.6);
  assert.equal(comparison.field_speed_crossing_frame_time_with, 0.4);
  assert.equal(comparison.self_hit_activation_at_field_speed_hinge, true);
  assert.equal(comparison.hinge_absorber_finding, "self_hit_channel_amplifies_post_hinge_runaway_not_absorber");

  const row = buildSelfHitHeldReleaseSolverRow({ seaScreenedSelfHitComparisonRows: [comparison] });
  assert.equal(
    row.sea_screened_self_hit_diagnostic_witness.hinge_absorber_decision,
    "naive_self_hit_kernel_uniformly_ejective_toy_cannot_decide_controlled_click"
  );
  assert.equal(row.artifact_status, "fail_closed_missing_central_solver_retained_history_row");
  assert.deepEqual(validateSelfHitHeldReleaseSolverRow(row), []);
});

test("sea-screened self-hit comparison flags sub-field divergence as a policy defect", () => {
  const withSelfHits = makeSyntheticToyResult({
    includeSelfHits: true,
    frames: [
      [0, 1, 0.9, 0.9],
      [0.2, 1.5, 0.95, 0.95], // diverges before any crossing: defect
      [0.4, 1.6, 1.0, 1.0],
    ],
    selfHitRoots: 5,
  });
  const withoutSelfHits = makeSyntheticToyResult({
    includeSelfHits: false,
    frames: [
      [0, 1, 0.9, 0.9],
      [0.2, 1.1, 0.95, 0.95],
      [0.4, 1.2, 1.0, 1.0],
    ],
  });
  const comparison = summarizeSeaScreenedSelfHitComparison({
    runHandle: "synthetic-defect",
    withSelfHits,
    withoutSelfHits,
  });
  assert.equal(comparison.self_hit_activation_at_field_speed_hinge, false);
  assert.equal(comparison.hinge_absorber_finding, "sub_field_divergence_witnessed_self_hit_policy_defect");
  const row = buildSelfHitHeldReleaseSolverRow({ seaScreenedSelfHitComparisonRows: [comparison] });
  assert.equal(
    row.sea_screened_self_hit_diagnostic_witness.hinge_absorber_decision,
    "comparison_defect_sub_field_divergence"
  );
});
