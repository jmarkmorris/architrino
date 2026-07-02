import test from "node:test";
import assert from "node:assert/strict";

import {
  FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT,
  NEGATIVE_CONTROL_REASONS,
  SAME_SOURCE_CAUSAL_ROOT_EXCLUSION_SCHEMA,
  SCHEMA,
  buildOblateSpheroidTwoSpeedSweep,
  evaluateOblateSpheroidTwoSpeedSweepEvidence,
  validateOblateSpheroidTwoSpeedSweep,
} from "../scripts/braid-ideal/oblate-spheroid-two-speed-sweep.mjs";

test("two-speed sweep is deterministic, canonical c_f=1, and fail closed", () => {
  const options = {
    uValues: [0, 0.2],
    vOrbValues: [0.2, 0.4],
    sampleCount: 2,
    rootSamples: 64,
  };
  const first = buildOblateSpheroidTwoSpeedSweep(options);
  const second = buildOblateSpheroidTwoSpeedSweep(options);

  assert.deepEqual(first, second);
  assert.equal(first.schema, SCHEMA);
  assert.equal(first.field_speed, 1);
  assert.equal(first.artifact_status, "fail_closed_missing_retained_root_ledger");
  assert.equal(first.first_missing_object, FIRST_MISSING_OBJECT);
  assert.equal(first.first_missing_field, FIRST_MISSING_FIELD);
  assert.equal(first.summary.residual_evaluated_row_count, first.rows.length);
  assert.deepEqual(validateOblateSpheroidTwoSpeedSweep(first), []);
});

test("two-speed sweep covers the requested u and orbital velocity grid", () => {
  const artifact = buildOblateSpheroidTwoSpeedSweep({
    uValues: [0, 0.3],
    vOrbValues: [0.2, 0.4, 0.6],
    betaStar: 0.5,
    sampleCount: 2,
    rootSamples: 64,
  });

  assert.equal(artifact.rows.length, 6);
  assert.deepEqual(artifact.parameters.u_values, [0, 0.3]);
  assert.deepEqual(artifact.parameters.v_orb_values, [0.2, 0.4, 0.6]);
  assert.equal(artifact.parameters.chi_mode, "lorentz_target");
  assert.equal(artifact.rows.every((row) => row.field_speed === 1), true);
  assert.equal(
    artifact.rows.every((row) => Number.isFinite(row.residual_status.normalized_residual)),
    true
  );
  assert.equal(
    artifact.rows.every(
      (row) => row.residual_status.sampled_wake_residual_diagnostic?.schema ===
        "oblate_spheroid_sampled_wake_residual_diagnostic.v0"
    ),
    true
  );
  assert.equal(artifact.summary.residual_evaluated_row_count, 6);
});

test("two-speed sweep prefilter selects objective-ranked rows with positive root budget", () => {
  const artifact = buildOblateSpheroidTwoSpeedSweep({
    uValues: [0, 0.3],
    vOrbValues: [0.2, 0.4, 0.5, 0.6],
    betaStar: 0.5,
    sampleCount: 2,
    rootSamples: 64,
  });

  assert.equal(artifact.candidate_prefilter_rows.length, 2);
  const atRest = artifact.candidate_prefilter_rows.find((row) => row.u === 0);
  const moving = artifact.candidate_prefilter_rows.find((row) => row.u === 0.3);

  assert.ok(Number.isFinite(atRest.candidate_objective));
  assert.ok(Number.isFinite(moving.candidate_objective));
  assert.ok(Number.isFinite(atRest.residual_status.normalized_residual));
  assert.ok(Number.isFinite(moving.residual_status.normalized_residual));
  assert.ok(atRest.speed_budget.root_budget_margin > 0);
  assert.ok(moving.speed_budget.root_budget_margin > 0);
  assert.equal(atRest.accepted, false);
  assert.equal(moving.accepted, false);
  assert.equal(atRest.residual_status.sampled_wake_residual_diagnostic.sample_count, 2);
  assert.equal(moving.residual_status.sampled_wake_residual_diagnostic.directed_partner_root_coverage, 1);
});

test("two-speed sweep records same-source causal-root exclusion as non-authorizing sampled lemma", () => {
  const artifact = buildOblateSpheroidTwoSpeedSweep({
    uValues: [0.78],
    vOrbValues: [0.2, 0.4],
    betaStar: 0.5,
    sampleCount: 2,
    rootSamples: 64,
  });
  const strictSubFieldSpeedRow = artifact.rows.find((row) => row.v_orb === 0.2);
  const overBudgetRow = artifact.rows.find((row) => row.v_orb === 0.4);
  const strictLemma = strictSubFieldSpeedRow.residual_status.same_source_causal_root_exclusion_lemma;
  const overBudgetLemma = overBudgetRow.residual_status.same_source_causal_root_exclusion_lemma;

  assert.equal(strictLemma.schema, SAME_SOURCE_CAUSAL_ROOT_EXCLUSION_SCHEMA);
  assert.equal(strictLemma.same_source_search_executed, true);
  assert.equal(strictLemma.directed_self_pairs_with_roots, 0);
  assert.equal(strictLemma.strict_sub_field_speed_interval, true);
  assert.equal(strictLemma.positive_root_budget_margin, true);
  assert.equal(strictLemma.self_root_nonexistence_bound_pass, true);
  assert.equal(strictLemma.accepted_same_record_evidence, false);
  assert.equal(strictLemma.retained_root_ledger_ref, null);
  assert.equal(strictLemma.first_missing_field, FIRST_MISSING_FIELD);

  assert.equal(overBudgetLemma.schema, SAME_SOURCE_CAUSAL_ROOT_EXCLUSION_SCHEMA);
  assert.equal(overBudgetLemma.strict_sub_field_speed_interval, false);
  assert.equal(overBudgetLemma.positive_root_budget_margin, false);
  assert.equal(overBudgetLemma.self_root_nonexistence_bound_pass, false);
  assert.ok(overBudgetLemma.directed_self_pairs_with_roots > 0);
  assert.deepEqual(validateOblateSpheroidTwoSpeedSweep(artifact), []);
});

test("two-speed sweep remains non-authorizing for preferred configuration claims", () => {
  const artifact = buildOblateSpheroidTwoSpeedSweep({
    uValues: [0],
    vOrbValues: [0.4],
    sampleCount: 2,
    rootSamples: 64,
  });

  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
  assert.equal(artifact.authorization.two_speed_deformation_sweep, false);
  assert.equal(artifact.authorization.retainedBranchClaim, false);
  assert.equal(artifact.authorization.acceptedSameLevelBranchClaim, false);
  assert.equal(artifact.authorization.preferred_configuration_claim, false);
  assert.equal(artifact.authorization.moving_retained_branch_certificate, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
  assert.match(
    artifact.summary.preferred_configuration_status,
    /sampled_residual_prefilter_only_no_accepted_bounded_return|bounded_return_rows_present_requires_retained_evidence_review/
  );
});

test("two-speed sweep can run an explicit priority-only dynamic return probe", () => {
  const artifact = buildOblateSpheroidTwoSpeedSweep({
    uValues: [0.78],
    vOrbValues: [0.2],
    sampleCount: 1,
    rootSamples: 32,
    returnProbe: true,
    returnProbePeriods: 0.05,
    returnProbeStepsPerPeriod: 4,
    returnProbeRootSamples: 16,
    returnProbeHistoryPeriods: 0.25,
    returnProbeHistoryStepsPerPeriod: 8,
    returnProbeCandidateLimit: 1,
    returnProbeSupportStiffness: 0.5,
    returnProbeSupportDamping: 0.1,
    returnProbeBranchClockLockStiffness: 0.2,
    returnProbeBranchClockLockDamping: 0.05,
  });
  const row = artifact.candidate_prefilter_rows[0];
  const probe = row.return_status.dynamic_return_probe;

  assert.equal(artifact.summary.dynamic_return_probe_row_count, 1);
  assert.equal(artifact.summary.support_return_probe_row_count, 1);
  assert.equal(artifact.summary.branch_clock_lock_return_probe_row_count, 1);
  assert.equal(probe.schema, "oblate_spheroid_dynamic_return_probe.v0");
  assert.equal(probe.authority_class, "priority_only_dynamic_probe_not_retained_history_evidence");
  assert.equal(probe.support_term.mode, "oblate_surface");
  assert.equal(probe.support_term.active, true);
  assert.equal(probe.support_term.authority_class, "priority_only_support_term_not_retained_history_evidence");
  assert.equal(probe.branch_clock_lock_term.mode, "ansatz_tangent");
  assert.equal(probe.branch_clock_lock_term.active, true);
  assert.equal(
    probe.branch_clock_lock_term.authority_class,
    "priority_only_branch_clock_lock_not_retained_history_evidence"
  );
  assert.equal(artifact.parameters.return_probe_support_stiffness, 0.5);
  assert.equal(artifact.parameters.return_probe_support_damping, 0.1);
  assert.equal(artifact.parameters.return_probe_branch_clock_lock_stiffness, 0.2);
  assert.equal(artifact.parameters.return_probe_branch_clock_lock_damping, 0.05);
  assert.equal(probe.periods, 0.05);
  assert.equal(probe.step_count, 1);
  assert.equal(Number.isFinite(probe.final_metrics.position_return_rms), true);
  assert.equal(row.accepted, false);
  assert.equal(artifact.authorization.preferred_configuration_claim, false);
  assert.deepEqual(validateOblateSpheroidTwoSpeedSweep(artifact), []);
});

test("two-speed sweep can probe positive-root rows and emit a preferred branch curve", () => {
  const artifact = buildOblateSpheroidTwoSpeedSweep({
    uValues: [0, 0.1],
    vOrbValues: [0.1],
    sampleCount: 1,
    rootSamples: 32,
    returnProbe: true,
    returnProbeSelectionMode: "positive_root",
    returnProbePeriods: 1,
    returnProbeStepsPerPeriod: 80,
    returnProbeRootSamples: 32,
    returnProbeHistoryPeriods: 1,
    returnProbeHistoryStepsPerPeriod: 48,
    returnProbeSupportStiffness: 1,
    returnProbeSupportDamping: 1.8,
    returnProbeBranchClockLockStiffness: 3.2,
    returnProbeBranchClockLockDamping: 0.2,
  });

  assert.equal(artifact.return_probe_selection.mode, "positive_root");
  assert.equal(artifact.return_probe_selection.row_count, 2);
  assert.equal(artifact.summary.dynamic_return_probe_row_count, 2);
  assert.equal(artifact.summary.preferred_branch_curve_row_count, 2);
  assert.equal(artifact.summary.preferred_branch_curve_u_coverage_ratio, 1);
  assert.equal(artifact.preferred_branch_curve_rows.length, 2);
  assert.equal(
    artifact.preferred_branch_curve_rows.every(
      (row) => row.authority_class === "priority_only_preferred_branch_curve_not_retained_history_evidence"
    ),
    true
  );
  assert.equal(artifact.authorization.preferred_configuration_claim, false);
  assert.deepEqual(validateOblateSpheroidTwoSpeedSweep(artifact), []);
});

test("two-speed sweep evidence guard rejects non-evidence classes", () => {
  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    const result = evaluateOblateSpheroidTwoSpeedSweepEvidence({ evidence_class: evidenceClass });
    assert.deepEqual(result, {
      accepted: false,
      reason,
      first_missing_field: FIRST_MISSING_FIELD,
    });
  }

  const schemaOnly = evaluateOblateSpheroidTwoSpeedSweepEvidence({ schema: SCHEMA });
  assert.equal(schemaOnly.accepted, false);
  assert.equal(schemaOnly.reason, "producer_does_not_authorize_accepted_two_speed_deformation_sweep_evidence");
});
