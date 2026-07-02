import assert from "node:assert/strict";
import test from "node:test";

import {
  FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT,
  NEGATIVE_CONTROL_REASONS,
  SCHEMA,
  buildOblateSpheroidBranchClockLockTarget,
  evaluateOblateSpheroidBranchClockLockTargetEvidence,
  validateOblateSpheroidBranchClockLockTarget,
} from "../scripts/braid-ideal/oblate-spheroid-branch-clock-lock-target.mjs";

function makeSourceRow({
  u,
  vOrb,
  residual,
  objective,
  dynamicRootMargin,
  clockRms,
  supportRms = 0.03,
}) {
  const rowId = `two-speed-row:u_${u}:v_orb_${vOrb}`;
  return {
    row_id: rowId,
    schema: "oblate_spheroid_two_speed_sweep_row.v0",
    u,
    v_orb: vOrb,
    chi: Math.sqrt(Math.max(0, 1 - u * u)),
    volume_ratio_candidate: Math.sqrt(Math.max(0, 1 - u * u)),
    candidate_objective: objective,
    speed_budget: {
      beta_max: Math.max(0, 1 - dynamicRootMargin - 0.01),
      root_budget_margin: dynamicRootMargin + 0.01,
    },
    residual_status: {
      normalized_residual: residual,
    },
    action_proxy: {
      action_drift_to_nearest_h: 0.15,
    },
    return_status: {
      bounded_return_observed: true,
      branch_curve_candidate: true,
      branch_curve_objective: objective,
      dynamic_return_probe: {
        bounded_return_observed: true,
        max_field_speed: 1 - dynamicRootMargin,
        root_budget_margin: dynamicRootMargin,
        final_metrics: {
          position_return_rms: 0.05,
          velocity_return_rms: 0.02,
        },
        max_radius_mean_deviation: 0.025,
        support_term: {
          active: true,
          rms_acceleration: supportRms,
          max_acceleration: supportRms * 2,
          authority_class: "priority_only_support_term_not_retained_history_evidence",
        },
        branch_clock_lock_term: {
          active: true,
          stiffness: 0.8,
          damping: 1.6,
          rms_acceleration: clockRms,
          max_acceleration: clockRms * 2,
          rms_tangent_position_error: 0.01,
          rms_tangent_velocity_error: 0.02,
          max_tangent_position_error: 0.03,
          max_tangent_velocity_error: 0.04,
          authority_class: "priority_only_branch_clock_lock_not_retained_history_evidence",
        },
      },
    },
    root_ledger_status: {
      retained_root_ledger_ref: null,
    },
    accepted: false,
  };
}

function sourceArtifactWithPreferredRows() {
  const rows = [
    makeSourceRow({
      u: 0.7,
      vOrb: 0.175,
      residual: 0.72,
      objective: 0.56,
      dynamicRootMargin: 0.13,
      clockRms: 0.05,
    }),
    makeSourceRow({
      u: 0.82,
      vOrb: 0.175,
      residual: 0.688,
      objective: 0.529,
      dynamicRootMargin: 0.003,
      clockRms: 0.058,
    }),
  ];
  return {
    schema: "oblate_spheroid_two_speed_deformation_sweep.v0",
    row_id: "two-speed-sweep:test",
    artifact_hash: "source-hash",
    artifact_status: "fail_closed_missing_retained_root_ledger",
    first_missing_object: "same_record_retained_root_ledger_for_two_speed_deformation_sweep",
    first_missing_field:
      "oblate_spheroid_two_speed_deformation_sweep.rows[*].root_ledger_status.retained_root_ledger_ref",
    rows,
    preferred_branch_curve_rows: rows.map((row) => ({
      row_id: row.row_id,
      authority_class: "priority_only_preferred_branch_curve_not_retained_history_evidence",
      u: row.u,
      v_orb: row.v_orb,
      chi: row.chi,
      volume_ratio_candidate: row.volume_ratio_candidate,
      normalized_residual: row.residual_status.normalized_residual,
      action_drift_to_nearest_h: row.action_proxy.action_drift_to_nearest_h,
      sampled_beta_max: row.speed_budget.beta_max,
      sampled_root_margin: row.speed_budget.root_budget_margin,
      dynamic_beta_max: row.return_status.dynamic_return_probe.max_field_speed,
      dynamic_root_margin: row.return_status.dynamic_return_probe.root_budget_margin,
      position_return_rms: row.return_status.dynamic_return_probe.final_metrics.position_return_rms,
      velocity_return_rms: row.return_status.dynamic_return_probe.final_metrics.velocity_return_rms,
      radius_mean_deviation: row.return_status.dynamic_return_probe.max_radius_mean_deviation,
      support_rms_acceleration: row.return_status.dynamic_return_probe.support_term.rms_acceleration,
      branch_clock_lock_rms_acceleration:
        row.return_status.dynamic_return_probe.branch_clock_lock_term.rms_acceleration,
      branch_curve_objective: row.return_status.branch_curve_objective,
    })),
  };
}

test("branch-clock-lock target is deterministic, non-authorizing, and classifies near-edge authority", () => {
  const sourceArtifact = sourceArtifactWithPreferredRows();
  const artifact = buildOblateSpheroidBranchClockLockTarget({ sourceArtifact });
  const repeated = buildOblateSpheroidBranchClockLockTarget({ sourceArtifact });

  assert.deepEqual(artifact, repeated);
  assert.equal(artifact.schema, SCHEMA);
  assert.equal(
    artifact.artifact_status,
    "priority_only_branch_clock_lock_target_present_internal_mechanism_blocked"
  );
  assert.equal(artifact.hard_math_status, "branch_clock_lock_target_rows_present");
  assert.equal(artifact.first_missing_object, FIRST_MISSING_OBJECT);
  assert.equal(artifact.first_missing_field, FIRST_MISSING_FIELD);
  assert.equal(artifact.summary.row_count, 2);
  assert.equal(artifact.summary.rows_with_assigned_branch_clock_lock, 2);
  assert.equal(artifact.summary.near_edge_dynamic_root_margin_row_count, 1);
  assert.equal(artifact.summary.tangent_authority_dominates_dynamic_margin_row_count, 1);
  assert.deepEqual(validateOblateSpheroidBranchClockLockTarget(artifact), []);

  const lowSpeed = artifact.rows.find((row) => row.u === 0.7);
  const nearEdge = artifact.rows.find((row) => row.u === 0.82);

  assert.equal(lowSpeed.tangent_authority_target.target_status, "positive_margin_tangent_authority_measured");
  assert.equal(nearEdge.tangent_authority_target.target_status, "missing_tangent_authority_exceeds_dynamic_root_margin");
  assert.equal(nearEdge.tangent_authority_target.near_edge_dynamic_root_margin, true);
  assert.equal(nearEdge.tangent_authority_target.clock_to_dynamic_root_margin_ratio > 19, true);
  assert.equal(nearEdge.internal_tangent_authority_ref, null);
  assert.equal(nearEdge.retained_root_ledger_ref, null);
  assert.equal(nearEdge.accepted, false);
});

test("missing preferred branch curve rows fail closed", () => {
  const artifact = buildOblateSpheroidBranchClockLockTarget({
    sourceArtifact: {
      schema: "oblate_spheroid_two_speed_deformation_sweep.v0",
      rows: [makeSourceRow({
        u: 0.7,
        vOrb: 0.175,
        residual: 0.72,
        objective: 0.56,
        dynamicRootMargin: 0.13,
        clockRms: 0.05,
      })],
      preferred_branch_curve_rows: [],
    },
  });

  assert.equal(artifact.artifact_status, "fail_closed_missing_preferred_branch_curve_rows");
  assert.equal(artifact.hard_math_status, "preferred_branch_curve_rows_missing");
  assert.equal(artifact.summary.row_count, 0);
  assert.equal(artifact.first_missing_field, "oblate_spheroid_two_speed_deformation_sweep.preferred_branch_curve_rows");
  assert.deepEqual(validateOblateSpheroidBranchClockLockTarget(artifact), []);
});

test("support-only preferred rows fail closed as missing assigned tangent lock", () => {
  const sourceArtifact = sourceArtifactWithPreferredRows();
  const sourceRow = sourceArtifact.rows[0];
  sourceRow.return_status.dynamic_return_probe.branch_clock_lock_term = {
    active: false,
    rms_acceleration: 0,
    max_acceleration: 0,
  };
  sourceArtifact.rows = [sourceRow];
  sourceArtifact.preferred_branch_curve_rows = [{
    row_id: sourceRow.row_id,
    u: sourceRow.u,
    v_orb: sourceRow.v_orb,
    chi: sourceRow.chi,
    normalized_residual: sourceRow.residual_status.normalized_residual,
    dynamic_beta_max: sourceRow.return_status.dynamic_return_probe.max_field_speed,
    dynamic_root_margin: sourceRow.return_status.dynamic_return_probe.root_budget_margin,
    support_rms_acceleration: sourceRow.return_status.dynamic_return_probe.support_term.rms_acceleration,
    branch_clock_lock_rms_acceleration: 0,
    branch_curve_objective: sourceRow.return_status.branch_curve_objective,
  }];
  const artifact = buildOblateSpheroidBranchClockLockTarget({ sourceArtifact });

  assert.equal(artifact.artifact_status, "fail_closed_missing_assigned_branch_clock_lock_rows");
  assert.equal(artifact.hard_math_status, "assigned_branch_clock_lock_rows_missing");
  assert.equal(artifact.rows[0].tangent_authority_target.target_status, "no_assigned_tangent_authority_measured");
  assert.deepEqual(validateOblateSpheroidBranchClockLockTarget(artifact), []);
});

test("retained authorization and excluded evidence classes remain rejected", () => {
  const artifact = buildOblateSpheroidBranchClockLockTarget({ sourceArtifact: sourceArtifactWithPreferredRows() });

  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
  assert.equal(artifact.authorization.retainedBranchClaim, false);
  assert.equal(artifact.authorization.accepted_transition_source, false);
  assert.equal(artifact.authorization.moving_retained_branch_certificate, false);
  assert.equal(artifact.authorization.same_ledger_action_measure_row, false);
  assert.equal(artifact.authorization.bounded_speed_live_ledger, false);
  assert.equal(artifact.authorization.receiver_normal_branch_strength, false);
  assert.equal(artifact.authorization.internal_tangent_authority_derived, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");

  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    assert.deepEqual(evaluateOblateSpheroidBranchClockLockTargetEvidence({ evidence_class: evidenceClass }), {
      accepted: false,
      reason,
      first_missing_field: FIRST_MISSING_FIELD,
    });
  }
});
