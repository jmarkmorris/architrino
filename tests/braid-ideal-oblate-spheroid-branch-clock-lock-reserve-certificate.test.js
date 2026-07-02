import assert from "node:assert/strict";
import test from "node:test";

import {
  FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT,
  NEGATIVE_CONTROL_REASONS,
  SCHEMA,
  buildOblateSpheroidBranchClockLockReserveCertificate,
  evaluateOblateSpheroidBranchClockLockReserveCertificateEvidence,
  validateOblateSpheroidBranchClockLockReserveCertificate,
} from "../scripts/braid-ideal/oblate-spheroid-branch-clock-lock-reserve-certificate.mjs";

function makeSweepRow({
  rowSuffix = "candidate",
  u = 0.78,
  vOrb = 0.2,
  chi = 0.6257795138864807,
  residual = 0.7,
  objective = 0.5,
  sampledBetaMax = 0.96,
  sampledRootBudgetMargin = 0.04,
  bounded = true,
  dynamicBetaMax = 0.985,
  dynamicRootMargin = 0.025,
  supportActive = true,
  supportRmsAcceleration = 0.04,
  branchClockLockActive = true,
  branchClockLockRmsAcceleration = 0.1,
  branchCurveCandidate = true,
}) {
  return {
    row_id: `two-speed-row:${rowSuffix}`,
    schema: "oblate_spheroid_two_speed_sweep_row.v0",
    u,
    v_orb: vOrb,
    chi,
    candidate_objective: objective,
    speed_budget: {
      beta_max: sampledBetaMax,
      root_budget_margin: sampledRootBudgetMargin,
    },
    residual_status: {
      normalized_residual: residual,
    },
    root_ledger_status: {
      retained_root_ledger_ref: null,
    },
    return_status: {
      bounded_return_observed: bounded,
      stable_support_radius_observed: bounded,
      branch_curve_candidate: branchCurveCandidate,
      branch_curve_objective: branchCurveCandidate ? objective : null,
      dynamic_return_probe: {
        schema: "oblate_spheroid_dynamic_return_probe.v0",
        authority_class: "priority_only_dynamic_probe_not_retained_history_evidence",
        max_field_speed: dynamicBetaMax,
        root_budget_margin: dynamicRootMargin,
        final_metrics: {
          position_return_rms: bounded ? 0.035 : 0.35,
          velocity_return_rms: bounded ? 0.018 : 0.3,
        },
        max_radius_mean_deviation: bounded ? 0.012 : 0.25,
        support_term: {
          mode: supportActive ? "oblate_surface" : "none",
          active: supportActive,
          stiffness: supportActive ? 1 : 0,
          damping: supportActive ? 1.8 : 0,
          rms_acceleration: supportActive ? supportRmsAcceleration : 0,
          max_acceleration: supportActive ? supportRmsAcceleration * 1.5 : 0,
        },
        branch_clock_lock_term: {
          mode: branchClockLockActive ? "ansatz_tangent" : "none",
          active: branchClockLockActive,
          stiffness: branchClockLockActive ? 3.2 : 0,
          damping: branchClockLockActive ? 0.2 : 0,
          rms_acceleration: branchClockLockActive ? branchClockLockRmsAcceleration : null,
          max_acceleration: branchClockLockActive ? branchClockLockRmsAcceleration * 1.5 : 0,
          rms_tangent_position_error: branchClockLockActive ? 0.002 : null,
          rms_tangent_velocity_error: branchClockLockActive ? 0.003 : null,
          max_tangent_position_error: branchClockLockActive ? 0.005 : null,
          max_tangent_velocity_error: branchClockLockActive ? 0.006 : null,
        },
      },
    },
    accepted: false,
  };
}

function makeSourceArtifact(rows) {
  return {
    schema: "oblate_spheroid_two_speed_deformation_sweep.v0",
    row_id: "two-speed-sweep:test",
    artifact_status: "fail_closed_missing_retained_root_ledger",
    first_missing_object: FIRST_MISSING_OBJECT,
    first_missing_field: FIRST_MISSING_FIELD,
    rows,
    preferred_branch_curve_rows: rows
      .filter((row) => row.return_status.branch_curve_candidate)
      .map((row) => ({ row_id: row.row_id })),
  };
}

test("bounded branch-clock-lock row with root-margin reserve emits a non-authorizing certificate", () => {
  const rows = [
    makeSweepRow({ rowSuffix: "preferred", supportRmsAcceleration: 0.04, branchClockLockRmsAcceleration: 0.1 }),
  ];
  const artifact = buildOblateSpheroidBranchClockLockReserveCertificate({
    sourceArtifact: makeSourceArtifact(rows),
    minDynamicRootMarginReserve: 0.01,
  });
  const repeated = buildOblateSpheroidBranchClockLockReserveCertificate({
    sourceArtifact: makeSourceArtifact(rows),
    minDynamicRootMarginReserve: 0.01,
  });

  assert.deepEqual(artifact, repeated);
  assert.equal(artifact.schema, SCHEMA);
  assert.equal(
    artifact.artifact_status,
    "priority_only_branch_clock_lock_reserve_certificate_present_retained_evidence_blocked"
  );
  assert.equal(artifact.hard_math_status, "branch_clock_lock_tangent_reserve_certificate_present");
  assert.equal(artifact.first_missing_object, FIRST_MISSING_OBJECT);
  assert.equal(artifact.first_missing_field, FIRST_MISSING_FIELD);
  assert.equal(artifact.summary.hard_math_candidate_count, 1);
  assert.deepEqual(validateOblateSpheroidBranchClockLockReserveCertificate(artifact), []);

  const candidate = artifact.branch_clock_lock_reserve_candidate_rows[0];
  assert.equal(candidate.dynamic_return_status.bounded_dynamic_return, true);
  assert.equal(candidate.branch_clock_lock_term.status, "branch_clock_lock_active");
  assert.equal(candidate.root_margin_reserve_status.positive_dynamic_root_margin_reserve, true);
  assert.equal(candidate.preferred_branch_curve_selection_status, "selected_preferred_branch_curve_row");
  assert.equal(candidate.tangent_correction.ratio, 2.5);
  assert.equal(
    candidate.internal_term_proof_obligation.required_artifact,
    "retained_history_tangent_projection_approximating_branch_clock_lock_diagnostic"
  );
  assert.equal(candidate.accepted, false);
});

test("support-only bounded rows fail closed at the branch-clock-lock field", () => {
  const artifact = buildOblateSpheroidBranchClockLockReserveCertificate({
    sourceArtifact: makeSourceArtifact([
      makeSweepRow({
        rowSuffix: "support-only",
        branchClockLockActive: false,
        branchClockLockRmsAcceleration: 0,
      }),
    ]),
  });

  assert.equal(artifact.artifact_status, "fail_closed_missing_branch_clock_lock_term");
  assert.equal(artifact.hard_math_status, "branch_clock_lock_term_missing");
  assert.equal(
    artifact.first_missing_field,
    "oblate_spheroid_branch_clock_lock_reserve_certificate.rows[*].branch_clock_lock_term.active"
  );
  assert.equal(artifact.summary.support_only_bounded_row_count, 1);
  assert.equal(artifact.summary.hard_math_candidate_count, 0);
  assert.deepEqual(validateOblateSpheroidBranchClockLockReserveCertificate(artifact), []);
});

test("branch-clock-lock rows with insufficient root-margin reserve fail closed", () => {
  const artifact = buildOblateSpheroidBranchClockLockReserveCertificate({
    sourceArtifact: makeSourceArtifact([
      makeSweepRow({
        rowSuffix: "low-reserve",
        dynamicBetaMax: 0.999,
        dynamicRootMargin: 0.005,
      }),
    ]),
    minDynamicRootMarginReserve: 0.01,
  });

  assert.equal(artifact.artifact_status, "fail_closed_missing_dynamic_root_margin_reserve");
  assert.equal(artifact.hard_math_status, "dynamic_root_margin_reserve_missing");
  assert.equal(
    artifact.first_missing_field,
    "oblate_spheroid_branch_clock_lock_reserve_certificate.rows[*].root_margin_reserve_status"
  );
  assert.equal(artifact.summary.active_branch_clock_lock_row_count, 1);
  assert.equal(artifact.summary.positive_dynamic_root_margin_reserve_row_count, 0);
  assert.equal(artifact.summary.hard_math_candidate_count, 0);
});

test("non-positive dynamic root margin cannot satisfy bounded dynamic return", () => {
  const artifact = buildOblateSpheroidBranchClockLockReserveCertificate({
    sourceArtifact: makeSourceArtifact([
      makeSweepRow({
        rowSuffix: "nonpositive-margin",
        dynamicBetaMax: 0.98,
        dynamicRootMargin: 0,
      }),
    ]),
  });

  assert.equal(artifact.artifact_status, "fail_closed_missing_bounded_dynamic_return");
  assert.equal(artifact.hard_math_status, "bounded_dynamic_return_missing");
  assert.equal(artifact.summary.hard_math_candidate_count, 0);
});

test("retained authorization and excluded evidence classes remain rejected", () => {
  const artifact = buildOblateSpheroidBranchClockLockReserveCertificate({
    sourceArtifact: makeSourceArtifact([makeSweepRow({ rowSuffix: "preferred" })]),
  });

  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
  assert.equal(artifact.authorization.retainedBranchClaim, false);
  assert.equal(artifact.authorization.accepted_transition_source, false);
  assert.equal(artifact.authorization.moving_retained_branch_certificate, false);
  assert.equal(artifact.authorization.same_ledger_action_measure_row, false);
  assert.equal(artifact.authorization.bounded_speed_live_ledger, false);
  assert.equal(artifact.authorization.receiver_normal_branch_strength, false);
  assert.equal(artifact.authorization.preferred_configuration_claim, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");

  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    assert.deepEqual(
      evaluateOblateSpheroidBranchClockLockReserveCertificateEvidence({ evidence_class: evidenceClass }),
      {
        accepted: false,
        reason,
        first_missing_field: FIRST_MISSING_FIELD,
      }
    );
  }
});
