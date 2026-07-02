import assert from "node:assert/strict";
import test from "node:test";

import {
  FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT,
  NEGATIVE_CONTROL_REASONS,
  RETAINED_HISTORY_FIRST_MISSING_FIELD,
  RETAINED_HISTORY_FIRST_MISSING_OBJECT,
  SCHEMA,
  buildOblateSpheroidInternalTangentAuthorityCertificate,
  evaluateOblateSpheroidInternalTangentAuthorityEvidence,
  validateOblateSpheroidInternalTangentAuthorityCertificate,
} from "../scripts/braid-ideal/oblate-spheroid-internal-tangent-authority-certificate.mjs";

function makeTargetRow({ rowSuffix = "preferred", branchClockLockRms = 0.1, dynamicRootMargin = 0.025 } = {}) {
  return {
    row_id: `branch-clock-lock-target:${rowSuffix}`,
    schema: "oblate_spheroid_branch_clock_lock_target_row.v0",
    source_row_id: `two-speed-row:${rowSuffix}`,
    preferred_branch_curve_selected: true,
    u: 0.78,
    v_orb: 0.2,
    chi: 0.6257795138864807,
    local_values: {
      normalized_residual: 0.7,
      sampled_beta_max: 0.96,
      sampled_root_margin: 0.04,
      dynamic_beta_max: 0.985,
      dynamic_root_margin: dynamicRootMargin,
      branch_curve_objective: 0.5,
    },
    assigned_support_term: {
      active: true,
      rms_acceleration: 0.04,
      max_acceleration: 0.06,
      authority_class: "priority_only_support_term_not_retained_history_evidence",
    },
    assigned_branch_clock_lock_term: {
      active: branchClockLockRms > 0,
      mode: "ansatz_tangent",
      stiffness: 3.2,
      damping: 0.2,
      rms_acceleration: branchClockLockRms,
      max_acceleration: branchClockLockRms * 1.5,
      rms_tangent_position_error: 0.002,
      rms_tangent_velocity_error: 0.003,
      max_tangent_position_error: 0.005,
      max_tangent_velocity_error: 0.006,
      authority_class: "priority_only_branch_clock_lock_not_retained_history_evidence",
    },
    tangent_authority_target: {
      target_status: "near_edge_positive_margin_with_tangent_authority",
      clock_to_support_rms_ratio: branchClockLockRms / 0.04,
      dynamic_root_margin_minus_clock_rms: dynamicRootMargin - branchClockLockRms,
      dimension_note: "diagnostic_ratio_only_not_dimensionally_closed_physics",
    },
    internal_tangent_authority_ref: null,
    retained_root_ledger_ref: null,
    accepted: false,
  };
}

function makeReserveRow({ rowSuffix = "preferred", positiveReserve = true, dynamicRootMargin = 0.025 } = {}) {
  return {
    row_id: `branch-clock-lock-reserve:${rowSuffix}`,
    schema: "oblate_spheroid_branch_clock_lock_reserve_candidate_row.v0",
    source_row_id: `two-speed-row:${rowSuffix}`,
    u: 0.78,
    v_orb: 0.2,
    chi: 0.6257795138864807,
    dynamic_return_status: {
      dynamic_probe_present: true,
      bounded_dynamic_return: true,
      dynamic_beta_max: 0.985,
      dynamic_root_margin: dynamicRootMargin,
    },
    support_term: {
      active: true,
      rms_acceleration: 0.04,
      support_only_without_branch_clock_lock: false,
    },
    branch_clock_lock_term: {
      active: true,
      mode: "ansatz_tangent",
      status: "branch_clock_lock_active",
      rms_acceleration: 0.1,
      max_acceleration: 0.15,
      rms_tangent_position_error: 0.002,
      rms_tangent_velocity_error: 0.003,
    },
    tangent_correction: {
      ratio: 2.5,
    },
    root_margin_reserve_status: {
      minimum_dynamic_root_margin_reserve: 0.01,
      dynamic_root_margin: dynamicRootMargin,
      dynamic_beta_max: 0.985,
      positive_dynamic_root_margin_reserve: positiveReserve,
      status: positiveReserve ? "positive_dynamic_root_margin_reserve" : "insufficient_dynamic_root_margin_reserve",
    },
    retained_root_ledger_ref: null,
    accepted: false,
    hard_math_candidate: positiveReserve,
  };
}

function makeTargetArtifact(rows) {
  return {
    schema: "oblate_spheroid_branch_clock_lock_target.v0",
    row_id: "oblate_spheroid_branch_clock_lock_target:test",
    artifact_hash: "target-hash",
    artifact_status: "priority_only_branch_clock_lock_target_present_internal_mechanism_blocked",
    first_missing_object: "internal_retained_history_tangent_authority_for_preferred_branch_curve",
    first_missing_field: "oblate_spheroid_branch_clock_lock_target.rows[*].internal_tangent_authority_ref",
    retained_evidence_blocker: {
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: FIRST_MISSING_FIELD,
    },
    rows,
  };
}

function makeReserveArtifact(rows) {
  return {
    schema: "oblate_spheroid_branch_clock_lock_reserve_certificate.v0",
    row_id: "oblate_spheroid_branch_clock_lock_reserve_certificate:test",
    artifact_hash: "reserve-hash",
    artifact_status: "priority_only_branch_clock_lock_reserve_certificate_present_retained_evidence_blocked",
    first_missing_object: FIRST_MISSING_OBJECT,
    first_missing_field: FIRST_MISSING_FIELD,
    retained_evidence_blocker: {
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: FIRST_MISSING_FIELD,
    },
    branch_clock_lock_reserve_candidate_rows: rows,
  };
}

test("internal tangent authority certificate emits deterministic fail-closed route rows", () => {
  const targetArtifact = makeTargetArtifact([makeTargetRow()]);
  const reserveArtifact = makeReserveArtifact([makeReserveRow()]);
  const artifact = buildOblateSpheroidInternalTangentAuthorityCertificate({ targetArtifact, reserveArtifact });
  const repeated = buildOblateSpheroidInternalTangentAuthorityCertificate({ targetArtifact, reserveArtifact });

  assert.deepEqual(artifact, repeated);
  assert.equal(artifact.schema, SCHEMA);
  assert.equal(
    artifact.artifact_status,
    "priority_only_internal_tangent_authority_certificate_present_retained_evidence_blocked"
  );
  assert.equal(artifact.hard_math_status, "internal_tangent_authority_route_matrix_present");
  assert.equal(artifact.first_missing_object, FIRST_MISSING_OBJECT);
  assert.equal(artifact.first_missing_field, FIRST_MISSING_FIELD);
  assert.equal(artifact.summary.measured_tangent_need_row_count, 1);
  assert.equal(artifact.summary.route_row_count, 5);
  assert.equal(artifact.summary.top_ranked_route, "retained_history_tangent_projection");
  assert.deepEqual(validateOblateSpheroidInternalTangentAuthorityCertificate(artifact), []);
});

test("retained-history tangent projection is top-ranked and names the sharper retained-record blocker", () => {
  const artifact = buildOblateSpheroidInternalTangentAuthorityCertificate({
    targetArtifact: makeTargetArtifact([makeTargetRow()]),
    reserveArtifact: makeReserveArtifact([makeReserveRow()]),
  });

  const [retainedHistoryRoute, actionRoute] = artifact.internal_term_route_rows;
  assert.equal(retainedHistoryRoute.rank, 1);
  assert.equal(retainedHistoryRoute.route_id, "retained_history_tangent_projection");
  assert.equal(retainedHistoryRoute.equation_form, "a_parallel^RH = -k_RH e_x - c_RH e_v");
  assert.equal(retainedHistoryRoute.first_missing_object, RETAINED_HISTORY_FIRST_MISSING_OBJECT);
  assert.equal(retainedHistoryRoute.first_missing_field, RETAINED_HISTORY_FIRST_MISSING_FIELD);
  assert.equal(actionRoute.route_id, "same_ledger_action_measure_tangent_row");
  assert.equal(actionRoute.first_missing_field, "action_functional");
  assert.equal(artifact.sharper_retained_history_blocker.first_missing_field, RETAINED_HISTORY_FIRST_MISSING_FIELD);
});

test("measured tangent need remains finite and tied to target and reserve rows", () => {
  const artifact = buildOblateSpheroidInternalTangentAuthorityCertificate({
    targetArtifact: makeTargetArtifact([makeTargetRow({ rowSuffix: "joined" })]),
    reserveArtifact: makeReserveArtifact([makeReserveRow({ rowSuffix: "joined" })]),
  });

  const measured = artifact.measured_tangent_authority_rows[0];
  assert.equal(measured.source_target_row_id, "branch-clock-lock-target:joined");
  assert.equal(measured.source_reserve_row_id, "branch-clock-lock-reserve:joined");
  assert.equal(measured.measured_branch_clock_lock_acceleration.rms_acceleration, 0.1);
  assert.equal(measured.measured_branch_clock_lock_acceleration.rms_tangent_position_error, 0.002);
  assert.equal(measured.measured_branch_clock_lock_acceleration.expected_direction, "opposes_tangent_position_and_velocity_error");
  assert.equal(measured.support_comparison.branch_clock_lock_to_support_rms_ratio, 2.5);
  assert.equal(measured.root_budget_margin_reserve_condition.positive_dynamic_root_margin_reserve, true);
  assert.equal(measured.retained_root_ledger_ref, null);
  assert.equal(measured.accepted, false);
});

test("missing positive root-budget margin reserve fails closed without authorization", () => {
  const artifact = buildOblateSpheroidInternalTangentAuthorityCertificate({
    targetArtifact: makeTargetArtifact([makeTargetRow({ dynamicRootMargin: 0.005 })]),
    reserveArtifact: makeReserveArtifact([makeReserveRow({ positiveReserve: false, dynamicRootMargin: 0.005 })]),
  });

  assert.equal(artifact.artifact_status, "fail_closed_missing_positive_root_budget_margin_reserve");
  assert.equal(artifact.hard_math_status, "positive_root_budget_margin_reserve_missing");
  assert.equal(
    artifact.first_missing_field,
    "oblate_spheroid_internal_tangent_authority_certificate.measured_tangent_authority_rows[*].root_budget_margin_reserve_condition"
  );
  assert.equal(artifact.authorization.accepted_internal_tangent_authority, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
});

test("authorization flags remain false and synthetic accepted refs are rejected", () => {
  const artifact = buildOblateSpheroidInternalTangentAuthorityCertificate({
    targetArtifact: makeTargetArtifact([makeTargetRow()]),
    reserveArtifact: makeReserveArtifact([makeReserveRow()]),
  });

  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
  assert.equal(artifact.authorization.accepted_internal_tangent_authority, false);
  assert.equal(artifact.authorization.retainedBranchClaim, false);
  assert.equal(artifact.authorization.accepted_branch_chart, false);
  assert.equal(artifact.authorization.accepted_transition_source, false);
  assert.equal(artifact.authorization.moving_retained_branch_certificate, false);
  assert.equal(artifact.authorization.same_ledger_action_measure_row, false);
  assert.equal(artifact.authorization.bounded_speed_live_ledger, false);
  assert.equal(artifact.authorization.receiver_normal_branch_strength, false);
  assert.equal(artifact.authorization.preferred_configuration_claim, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
  assert.equal(artifact.retained_root_ledger_ref, null);
  assert.equal(artifact.held_release_retained_record_id, null);
  assert.equal(artifact.accepted_internal_tangent_authority_ref, null);

  assert.equal(
    evaluateOblateSpheroidInternalTangentAuthorityEvidence({
      schema: SCHEMA,
      accepted_internal_tangent_authority: true,
    }).reason,
    NEGATIVE_CONTROL_REASONS.synthetic_accepted_ref
  );
  assert.equal(
    evaluateOblateSpheroidInternalTangentAuthorityEvidence({
      schema: SCHEMA,
      retained_root_ledger_ref: "proxy:retained-root-ledger",
    }).reason,
    "proxy_or_synthetic_ref_not_accepted_internal_tangent_authority_evidence"
  );
  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    assert.deepEqual(
      evaluateOblateSpheroidInternalTangentAuthorityEvidence({ evidence_class: evidenceClass }),
      {
        accepted: false,
        reason,
        first_missing_field: FIRST_MISSING_FIELD,
      }
    );
  }
});
