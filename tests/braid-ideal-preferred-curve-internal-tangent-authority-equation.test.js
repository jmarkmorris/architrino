import assert from "node:assert/strict";
import test from "node:test";

import {
  ACCEPTANCE_CERTIFICATE_FIELD,
  FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT,
  NEGATIVE_CONTROL_REASONS,
  SCHEMA,
  buildPreferredCurveInternalTangentAuthorityEquation,
  evaluatePreferredCurveInternalTangentAuthorityEquationEvidence,
  validatePreferredCurveInternalTangentAuthorityEquation,
} from "../scripts/braid-ideal/preferred-curve-internal-tangent-authority-equation.mjs";

function tangentProjector() {
  return [
    [1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ];
}

function tangentNullProjector() {
  return [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1],
  ];
}

function makePreferredCurveCandidateRow({
  rowSuffix = "pass",
  sourceRowId = `two-speed-row:${rowSuffix}`,
  dObjectiveDu = -0.25,
  dObjectiveDvOrb = 0.5,
  dynamicRootMargin = 0.025,
} = {}) {
  return {
    row_id: `near-edge-candidate:${rowSuffix}`,
    schema: "oblate_spheroid_near_edge_basin_candidate_row.v0",
    source_row_id: sourceRowId,
    u: 0.82,
    v_orb: 0.175,
    chi: 0.5723635208501674,
    local_values: {
      residual_value: 0.6882728954707807,
      objective_value: 0.45,
      beta_max: 0.965,
      root_budget_margin: 0.035,
    },
    dynamic_return_status: {
      dynamic_probe_present: true,
      bounded_return_observed: true,
      dynamic_bounded_return: true,
      dynamic_beta_max: 0.985,
      dynamic_root_margin: dynamicRootMargin,
      position_return_rms: 0.002,
      velocity_return_rms: 0.003,
      radius_mean_deviation: 0.001,
    },
    branch_curve_status: {
      branch_curve_candidate: true,
      preferred_branch_curve_selected: true,
      branch_curve_objective: 0.45,
      support_rms_acceleration: 0.04,
      branch_clock_lock_rms_acceleration: 0.1,
    },
    finite_difference: {
      dE_du: {
        status: "central_difference",
        value: -0.3,
      },
      dE_dv_orb: {
        status: "central_difference",
        value: -0.44,
      },
      dObjective_du: {
        status: "central_difference",
        value: dObjectiveDu,
      },
      dObjective_dv_orb: {
        status: "central_difference",
        value: dObjectiveDvOrb,
      },
      finite_difference_complete: true,
    },
    hard_math_candidate: true,
    accepted: false,
  };
}

function makeMinimumGainWitnessRow({
  retainedRecordId = "retained-record:preferred-curve:pass",
  rowSuffix = "pass",
  sourceRowId = `two-speed-row:${rowSuffix}`,
  dynamicRootMargin = 0.025,
} = {}) {
  const particleSlotOrder = ["P:0", "E:0", "P:1", "E:1", "P:2", "E:2"];
  return {
    row_id: `minimum-gain-witness:${rowSuffix}`,
    schema: "same_record_minimum_norm_retained_history_gain_witness_source_row.v0",
    source_row_id: sourceRowId,
    retained_record_id: retainedRecordId,
    time: 0.25,
    authority_class: "diagnostic_same_record_minimum_gain_fixture_not_accepted_evidence",
    same_record_retained_path_error_row: {
      source_row_id: sourceRowId,
      retained_record_id: retainedRecordId,
      time: 0.25,
      particle_slot_order: particleSlotOrder,
      path_history_ref: "diagnostic:path-history",
      tangent_position_error_vector: [-0.02, 0, 0, 0, 0, 0],
      tangent_velocity_error_vector: [0, 0, 0, 0, 0, 0],
    },
    retained_solver_tangent_target_vector_row: {
      source_row_id: sourceRowId,
      retained_record_id: retainedRecordId,
      time: 0.25,
      particle_slot_order: particleSlotOrder,
      a_ansatz_vector: [0.11, 0, 0, 0, 0, 0],
      a_wake_vector: [0.01, 0, 0, 0, 0, 0],
      a_support_vector: [0, 0, 0, 0, 0, 0],
      tangent_projector_matrix: tangentProjector(),
      tangent_target_vector: [0.1, 0, 0, 0, 0, 0],
    },
    active_causal_margin_gradient_vector_row: {
      retained_record_id: retainedRecordId,
      active_margin_channel: "field_speed",
      active_margin_value: dynamicRootMargin,
      active_margin_event_ref: "event:field-speed-edge",
      active_margin_gradient_vector: [0, 1, 0, 0, 0, 0],
      tangent_null_projector_matrix: tangentNullProjector(),
    },
    post_provider_root_margin_row: {
      retained_record_id: retainedRecordId,
      post_provider_root_margin: 0.01,
      minimum_dynamic_root_margin_reserve: 0.01,
      tangent_response_horizon: 1,
      margin_lift_response_horizon: 1,
      positive_post_provider_root_margin: true,
    },
    same_record_closure_rows: {
      retained_record_id: retainedRecordId,
      same_record_retained_root_ledger: "diagnostic:root-ledger",
      same_record_action_closure_row: "diagnostic:action-closure",
      same_record_wake_history_ref: "diagnostic:wake-history",
      same_record_path_history_ref: "diagnostic:path-history",
    },
  };
}

test("preferred-curve internal tangent-authority equation fails closed without a curve row", () => {
  const artifact = buildPreferredCurveInternalTangentAuthorityEquation();

  assert.equal(artifact.schema, SCHEMA);
  assert.equal(artifact.artifact_status, "fail_closed_missing_preferred_curve_differential");
  assert.equal(artifact.source_status, "source_acquisition_blocked");
  assert.equal(artifact.first_missing_object, "preferred_curve_finite_difference_row");
  assert.equal(
    artifact.first_missing_field,
    "oblate_spheroid_near_edge_basin_certificate.near_edge_candidate_rows"
  );
  assert.equal(artifact.summary.preferred_curve_differential_passed, false);
  assert.equal(artifact.summary.mathematical_preferred_curve_internal_tangent_authority_equation_passed, false);
  assert.equal(artifact.accepted, false);
  assert.deepEqual(validatePreferredCurveInternalTangentAuthorityEquation(artifact), []);
});

test("preferred-curve equation derives the curve tangent and passes mathematically without authorizing", () => {
  const sourceRowId = "two-speed-row:preferred-pass";
  const nearEdgeCandidateRow = makePreferredCurveCandidateRow({
    sourceRowId,
    rowSuffix: "preferred-pass",
    dObjectiveDu: -0.25,
    dObjectiveDvOrb: 0.5,
  });
  const minimumGainRow = makeMinimumGainWitnessRow({
    sourceRowId,
    rowSuffix: "preferred-pass",
  });
  const artifact = buildPreferredCurveInternalTangentAuthorityEquation({
    nearEdgeCandidateRow,
    minimumNormRetainedHistoryGainWitnessRow: minimumGainRow,
  });

  assert.equal(
    artifact.artifact_status,
    "preferred_curve_internal_tangent_authority_equation_mathematical_pass_acceptance_blocked"
  );
  assert.equal(artifact.source_status, "candidate_preferred_curve_equation_unaccepted");
  assert.equal(artifact.first_missing_object, "preferred_curve_internal_tangent_authority_acceptance_certificate");
  assert.equal(artifact.first_missing_field, ACCEPTANCE_CERTIFICATE_FIELD);
  assert.equal(artifact.curve_differential.preferred_curve_tangent.dv_orb_du, 0.5);
  assert.equal(
    Math.abs(artifact.curve_differential.preferred_curve_tangent.objective_directional_derivative) < 1e-12,
    true
  );
  assert.equal(
    Math.abs(artifact.curve_differential.preferred_curve_tangent.residual_directional_derivative + 0.52) < 1e-12,
    true
  );
  assert.equal(artifact.bindings.same_source_row_id_binding_passed, true);
  assert.equal(artifact.bindings.dynamic_root_margin_binding_passed, true);
  assert.equal(artifact.summary.minimum_gain_mathematical_passed, true);
  assert.equal(artifact.summary.mathematical_preferred_curve_internal_tangent_authority_equation_passed, true);
  assert.equal(artifact.diagnostics.tangent_target_norm, 0.1);
  assert.equal(artifact.diagnostics.tangent_target_to_branch_clock_rms_ratio, 1);
  assert.equal(artifact.accepted, false);
  assert.equal(artifact.accepted_internal_tangent_authority_ref, null);
  assert.equal(artifact.authorization.accepted_internal_tangent_authority, false);
  assert.deepEqual(evaluatePreferredCurveInternalTangentAuthorityEquationEvidence(artifact), {
    accepted: false,
    reason: "producer_does_not_authorize_preferred_curve_internal_tangent_authority_evidence",
    first_missing_field: ACCEPTANCE_CERTIFICATE_FIELD,
  });
  assert.deepEqual(validatePreferredCurveInternalTangentAuthorityEquation(artifact), []);
});

test("preferred-curve equation rejects a minimum-gain row from a different source row", () => {
  const nearEdgeCandidateRow = makePreferredCurveCandidateRow({
    sourceRowId: "two-speed-row:curve-source",
    rowSuffix: "source-mismatch",
  });
  const minimumGainRow = makeMinimumGainWitnessRow({
    sourceRowId: "two-speed-row:other-source",
    rowSuffix: "source-mismatch",
  });
  const artifact = buildPreferredCurveInternalTangentAuthorityEquation({
    nearEdgeCandidateRow,
    minimumNormRetainedHistoryGainWitnessRow: minimumGainRow,
  });

  assert.equal(artifact.artifact_status, "fail_closed_curve_and_minimum_gain_source_row_mismatch");
  assert.equal(artifact.bindings.same_source_row_id_binding_passed, false);
  assert.equal(artifact.summary.mathematical_preferred_curve_internal_tangent_authority_equation_passed, false);
  assert.equal(
    artifact.first_missing_field,
    "preferred_curve_internal_tangent_authority_equation.same_source_row_id_binding"
  );
  assert.deepEqual(validatePreferredCurveInternalTangentAuthorityEquation(artifact), []);
});

test("preferred-curve equation rejects mismatched positive dynamic root margin", () => {
  const sourceRowId = "two-speed-row:margin-mismatch";
  const nearEdgeCandidateRow = makePreferredCurveCandidateRow({
    sourceRowId,
    rowSuffix: "margin-mismatch",
    dynamicRootMargin: 0.025,
  });
  const minimumGainRow = makeMinimumGainWitnessRow({
    sourceRowId,
    rowSuffix: "margin-mismatch",
    dynamicRootMargin: 0.03,
  });
  const artifact = buildPreferredCurveInternalTangentAuthorityEquation({
    nearEdgeCandidateRow,
    minimumNormRetainedHistoryGainWitnessRow: minimumGainRow,
  });

  assert.equal(artifact.artifact_status, "fail_closed_curve_and_minimum_gain_dynamic_root_margin_mismatch");
  assert.equal(artifact.bindings.same_source_row_id_binding_passed, true);
  assert.equal(artifact.bindings.dynamic_root_margin_binding_passed, false);
  assert.equal(
    artifact.first_missing_field,
    "preferred_curve_internal_tangent_authority_equation.dynamic_root_margin_binding"
  );
  assert.deepEqual(validatePreferredCurveInternalTangentAuthorityEquation(artifact), []);
});

test("preferred-curve equation requires a nonzero objective derivative in v_orb", () => {
  const nearEdgeCandidateRow = makePreferredCurveCandidateRow({
    rowSuffix: "zero-slope-denominator",
    dObjectiveDvOrb: 0,
  });
  const minimumGainRow = makeMinimumGainWitnessRow({
    rowSuffix: "zero-slope-denominator",
  });
  const artifact = buildPreferredCurveInternalTangentAuthorityEquation({
    nearEdgeCandidateRow,
    minimumNormRetainedHistoryGainWitnessRow: minimumGainRow,
  });

  assert.equal(artifact.artifact_status, "fail_closed_missing_preferred_curve_differential");
  assert.equal(
    artifact.first_missing_field,
    "preferred_curve_candidate_row.finite_difference.dObjective_dv_orb.nonzero"
  );
  assert.equal(artifact.curve_differential.preferred_curve_differential_passed, false);
  assert.deepEqual(validatePreferredCurveInternalTangentAuthorityEquation(artifact), []);
});

test("preferred-curve equation evidence guard rejects non-evidence classes", () => {
  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    assert.deepEqual(evaluatePreferredCurveInternalTangentAuthorityEquationEvidence({
      evidence_class: evidenceClass,
    }), {
      accepted: false,
      reason,
      first_missing_field: FIRST_MISSING_FIELD,
    });
  }
});
