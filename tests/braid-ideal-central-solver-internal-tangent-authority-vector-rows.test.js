import assert from "node:assert/strict";
import test from "node:test";

import {
  buildCentralSolverRetainedHistoryRow,
} from "../scripts/braid-ideal/central-solver-retained-history-row.mjs";
import {
  buildPreferredCurveInternalTangentAuthorityEquation,
} from "../scripts/braid-ideal/preferred-curve-internal-tangent-authority-equation.mjs";
import {
  ACCEPTANCE_CERTIFICATE_FIELD,
  FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT,
  NEGATIVE_CONTROL_REASONS,
  SCHEMA,
  buildCentralSolverInternalTangentAuthorityVectorRows,
  evaluateCentralSolverInternalTangentAuthorityVectorRowsEvidence,
  validateCentralSolverInternalTangentAuthorityVectorRows,
} from "../scripts/braid-ideal/central-solver-internal-tangent-authority-vector-rows.mjs";

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

function makeMinimumGainWitnessRow({ retainedRecordId, rowSuffix = "bridge", sourceRowId = `two-speed-row:${rowSuffix}` }) {
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
      active_margin_value: 0.025,
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

function makeRetainedSolverVectorWitnessRow({ retainedRecordId, rowSuffix = "bridge", sourceRowId = `two-speed-row:${rowSuffix}` }) {
  const particleSlotOrder = ["P:0", "E:0", "P:1", "E:1", "P:2", "E:2"];
  return {
    row_id: `retained-vector-witness:${rowSuffix}`,
    schema: "retained_solver_internal_tangent_authority_vector_witness_row.v0",
    source_row_id: sourceRowId,
    retained_record_id: retainedRecordId,
    time: 0.25,
    authority_class: "diagnostic_same_record_vector_fixture_not_accepted_evidence",
    retained_solver_tangent_target_vector_row: {
      source_row_id: sourceRowId,
      retained_record_id: retainedRecordId,
      time: 0.25,
      particle_slot_order: particleSlotOrder,
      a_ansatz_vector: [0.11, 0, 0, 0, 0, 0],
      a_wake_vector: [0.01, 0, 0, 0, 0, 0],
      a_support_vector: [0, 0, 0, 0, 0, 0],
      surface_normal_vectors: [
        [0, 0, 1],
        [0, 0, -1],
        [0, 0, 1],
        [0, 0, -1],
        [0, 0, 1],
        [0, 0, -1],
      ],
      tangent_projector_matrix: tangentProjector(),
      tangent_target_vector: [0.1, 0, 0, 0, 0, 0],
    },
    active_causal_margin_gradient_vector_row: {
      retained_record_id: retainedRecordId,
      active_margin_channel: "field_speed",
      active_margin_value: 0.025,
      active_margin_event_ref: "event:field-speed-edge",
      active_margin_gradient_vector: [0, 1, 0, 0, 0, 0],
      tangent_null_projector_matrix: tangentNullProjector(),
    },
    same_record_provider_acceleration_vector_row: {
      retained_record_id: retainedRecordId,
      provider_acceleration_vector: [0.1, 0.085, 0, 0, 0, 0],
      least_norm_null_correction_vector: [0, 0.085, 0, 0, 0, 0],
      provider_equation: "a_provider^* = T + n_*",
      provider_provenance: "synthetic_test_vector_not_accepted",
      accepted_provider_ref: null,
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

function makePreferredCurveCandidateRow({
  rowSuffix = "bridge",
  sourceRowId = `two-speed-row:${rowSuffix}`,
  branchClockLockRmsAcceleration = 0.1,
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
      dynamic_root_margin: 0.025,
      position_return_rms: 0.002,
      velocity_return_rms: 0.003,
      radius_mean_deviation: 0.001,
    },
    branch_curve_status: {
      branch_curve_candidate: true,
      preferred_branch_curve_selected: true,
      branch_curve_objective: 0.45,
      support_rms_acceleration: 0.04,
      branch_clock_lock_rms_acceleration: branchClockLockRmsAcceleration,
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
        value: -0.25,
      },
      dObjective_dv_orb: {
        status: "central_difference",
        value: 0.5,
      },
      finite_difference_complete: true,
    },
    hard_math_candidate: true,
    accepted: false,
  };
}

function makePreferredCurveEquationArtifact({
  minimumGainRow,
  rowSuffix = "bridge",
  sourceRowId = `two-speed-row:${rowSuffix}`,
  branchClockLockRmsAcceleration = 0.1,
}) {
  return buildPreferredCurveInternalTangentAuthorityEquation({
    nearEdgeCandidateRow: makePreferredCurveCandidateRow({
      rowSuffix,
      sourceRowId,
      branchClockLockRmsAcceleration,
    }),
    minimumNormRetainedHistoryGainWitnessRow: minimumGainRow,
  });
}

test("internal tangent-authority vector rows bridge fails closed without retained record id", () => {
  const artifact = buildCentralSolverInternalTangentAuthorityVectorRows();

  assert.equal(artifact.schema, SCHEMA);
  assert.equal(artifact.artifact_status, "fail_closed_missing_retained_record_id");
  assert.equal(artifact.source_status, "source_acquisition_blocked");
  assert.equal(artifact.first_missing_object, "central_solver_retained_history_row");
  assert.equal(
    artifact.first_missing_field,
    "central_solver_retained_history_row.retained_record_request.retained_record_id"
  );
  assert.equal(artifact.summary.request_present, true);
  assert.equal(artifact.summary.mathematical_internal_tangent_authority_bridge_passed, false);
  assert.equal(artifact.accepted, false);
  assert.deepEqual(validateCentralSolverInternalTangentAuthorityVectorRows(artifact), []);
});

test("internal tangent-authority vector rows bridge names missing minimum-gain rows", () => {
  const retainedHistoryRow = buildCentralSolverRetainedHistoryRow({
    retainedRecordId: "retained-record:internal-tangent:missing-rows",
    providerObjectRef: "candidate:provider-object:missing-rows",
    providerArtifactHash: "provider-hash-missing-rows",
  });
  const artifact = buildCentralSolverInternalTangentAuthorityVectorRows({ retainedHistoryRow });

  assert.equal(artifact.artifact_status, "fail_closed_missing_minimum_norm_retained_history_gain_rows");
  assert.equal(artifact.first_missing_object, FIRST_MISSING_OBJECT);
  assert.equal(artifact.first_missing_field, FIRST_MISSING_FIELD);
  assert.equal(artifact.source_retained_history_row.retained_record_id, "retained-record:internal-tangent:missing-rows");
  assert.equal(artifact.summary.minimum_gain_witness_row_count, 0);
  assert.equal(artifact.summary.retained_solver_vector_witness_row_count, 0);
  assert.equal(artifact.accepted_internal_tangent_authority_ref, null);
  assert.deepEqual(validateCentralSolverInternalTangentAuthorityVectorRows(artifact), []);
});

test("internal tangent-authority vector rows bridge requires preferred-curve equation after vector rows pass", () => {
  const retainedRecordId = "retained-record:internal-tangent:pass";
  const retainedHistoryRow = buildCentralSolverRetainedHistoryRow({
    retainedRecordId,
    providerObjectRef: "candidate:provider-object:pass",
    providerArtifactHash: "provider-hash-pass",
  });
  const minimumGainRow = makeMinimumGainWitnessRow({ retainedRecordId, rowSuffix: "pass" });
  const vectorRow = makeRetainedSolverVectorWitnessRow({ retainedRecordId, rowSuffix: "pass" });
  const artifact = buildCentralSolverInternalTangentAuthorityVectorRows({
    retainedHistoryRow,
    minimumNormRetainedHistoryGainWitnessRows: [minimumGainRow],
    retainedSolverVectorWitnessRows: [vectorRow],
  });

  assert.equal(artifact.artifact_status, "minimum_gain_and_vector_pass_preferred_curve_equation_missing");
  assert.equal(artifact.source_status, "source_acquisition_blocked");
  assert.equal(artifact.first_missing_object, FIRST_MISSING_OBJECT);
  assert.equal(
    artifact.first_missing_field,
    "central_solver_internal_tangent_authority_vector_rows.preferred_curve_internal_tangent_authority_equation_artifacts"
  );
  assert.equal(artifact.summary.mathematical_internal_tangent_authority_vector_bridge_passed, true);
  assert.equal(artifact.summary.mathematical_internal_tangent_authority_bridge_passed, false);
  assert.deepEqual(validateCentralSolverInternalTangentAuthorityVectorRows(artifact), []);
});

test("internal tangent-authority vector rows bridge can pass the preferred-curve equation while staying non-authorizing", () => {
  const retainedRecordId = "retained-record:internal-tangent:pass";
  const sourceRowId = "two-speed-row:pass";
  const retainedHistoryRow = buildCentralSolverRetainedHistoryRow({
    retainedRecordId,
    providerObjectRef: "candidate:provider-object:pass",
    providerArtifactHash: "provider-hash-pass",
  });
  const minimumGainRow = makeMinimumGainWitnessRow({ retainedRecordId, rowSuffix: "pass", sourceRowId });
  const vectorRow = makeRetainedSolverVectorWitnessRow({ retainedRecordId, rowSuffix: "pass", sourceRowId });
  const preferredCurveEquationArtifact = makePreferredCurveEquationArtifact({
    minimumGainRow,
    rowSuffix: "pass",
    sourceRowId,
  });
  const artifact = buildCentralSolverInternalTangentAuthorityVectorRows({
    retainedHistoryRow,
    minimumNormRetainedHistoryGainWitnessRows: [minimumGainRow],
    retainedSolverVectorWitnessRows: [vectorRow],
    preferredCurveInternalTangentAuthorityEquationArtifacts: [preferredCurveEquationArtifact],
  });

  assert.equal(
    artifact.artifact_status,
    "same_record_preferred_curve_internal_tangent_authority_equation_mathematical_pass_acceptance_blocked"
  );
  assert.equal(artifact.source_status, "candidate_same_record_preferred_curve_equation_unaccepted");
  assert.equal(
    artifact.first_missing_object,
    "central_solver_internal_tangent_authority_vector_rows_acceptance_certificate"
  );
  assert.equal(artifact.first_missing_field, ACCEPTANCE_CERTIFICATE_FIELD);
  assert.equal(artifact.summary.minimum_gain_witness_row_count, 1);
  assert.equal(artifact.summary.minimum_gain_witness_mathematical_pass_count, 1);
  assert.equal(artifact.summary.minimum_gain_witness_request_binding_pass_count, 1);
  assert.equal(artifact.summary.retained_solver_vector_witness_row_count, 1);
  assert.equal(artifact.summary.retained_solver_vector_witness_mathematical_pass_count, 1);
  assert.equal(artifact.summary.retained_solver_vector_witness_request_binding_pass_count, 1);
  assert.equal(artifact.summary.preferred_curve_equation_artifact_count, 1);
  assert.equal(artifact.summary.preferred_curve_equation_core_mathematical_pass_count, 1);
  assert.equal(artifact.summary.preferred_curve_equation_mathematical_pass_count, 1);
  assert.equal(artifact.summary.preferred_curve_equation_request_binding_pass_count, 1);
  assert.equal(artifact.summary.preferred_curve_branch_clock_lock_replacement_residual_pass_count, 1);
  assert.equal(artifact.summary.mathematical_internal_tangent_authority_vector_bridge_passed, true);
  assert.equal(artifact.summary.mathematical_internal_tangent_authority_bridge_passed, true);
  assert.equal(
    artifact.minimum_norm_retained_history_gain_witness_evaluations[0].request_retained_record_binding_passed,
    true
  );
  assert.equal(
    artifact.retained_solver_vector_witness_evaluations[0].request_retained_record_binding_passed,
    true
  );
  assert.equal(
    artifact.preferred_curve_internal_tangent_authority_equation_evaluations[0]
      .request_retained_record_binding_passed,
    true
  );
  assert.equal(
    artifact.preferred_curve_internal_tangent_authority_equation_evaluations[0]
      .core_mathematical_preferred_curve_equation_passed,
    true
  );
  assert.equal(
    artifact.preferred_curve_internal_tangent_authority_equation_evaluations[0]
      .mathematical_preferred_curve_equation_passed,
    true
  );
  assert.equal(
    artifact.preferred_curve_internal_tangent_authority_equation_evaluations[0]
      .branch_clock_lock_replacement_residual_passed,
    true
  );
  assert.equal(artifact.accepted, false);
  assert.equal(artifact.accepted_internal_tangent_authority_ref, null);
  assert.equal(artifact.authorization.accepted_internal_tangent_authority, false);
  assert.equal(artifact.authorization.preferred_configuration_claim, false);
  assert.deepEqual(evaluateCentralSolverInternalTangentAuthorityVectorRowsEvidence(artifact), {
    accepted: false,
    reason: "producer_does_not_authorize_internal_tangent_authority_vector_rows_evidence",
    first_missing_field: ACCEPTANCE_CERTIFICATE_FIELD,
  });
  assert.deepEqual(validateCentralSolverInternalTangentAuthorityVectorRows(artifact), []);
});

test("internal tangent-authority bridge rejects preferred-curve math when clock-lock replacement residual fails", () => {
  const retainedRecordId = "retained-record:internal-tangent:residual-fail";
  const sourceRowId = "two-speed-row:residual-fail";
  const retainedHistoryRow = buildCentralSolverRetainedHistoryRow({
    retainedRecordId,
    providerObjectRef: "candidate:provider-object:residual-fail",
    providerArtifactHash: "provider-hash-residual-fail",
  });
  const minimumGainRow = makeMinimumGainWitnessRow({
    retainedRecordId,
    rowSuffix: "residual-fail",
    sourceRowId,
  });
  const vectorRow = makeRetainedSolverVectorWitnessRow({
    retainedRecordId,
    rowSuffix: "residual-fail",
    sourceRowId,
  });
  const preferredCurveEquationArtifact = makePreferredCurveEquationArtifact({
    minimumGainRow,
    rowSuffix: "residual-fail",
    sourceRowId,
    branchClockLockRmsAcceleration: 0.12,
  });
  const artifact = buildCentralSolverInternalTangentAuthorityVectorRows({
    retainedHistoryRow,
    minimumNormRetainedHistoryGainWitnessRows: [minimumGainRow],
    retainedSolverVectorWitnessRows: [vectorRow],
    preferredCurveInternalTangentAuthorityEquationArtifacts: [preferredCurveEquationArtifact],
  });

  assert.equal(
    artifact.artifact_status,
    "fail_closed_preferred_curve_branch_clock_lock_replacement_residual_failed"
  );
  assert.equal(
    artifact.first_missing_field,
    "central_solver_internal_tangent_authority_vector_rows.preferred_curve_internal_tangent_authority_equation_artifacts[*].branch_clock_lock_replacement_residual.replacement_residual_passed"
  );
  assert.equal(artifact.summary.mathematical_internal_tangent_authority_vector_bridge_passed, true);
  assert.equal(artifact.summary.preferred_curve_equation_core_mathematical_pass_count, 1);
  assert.equal(artifact.summary.preferred_curve_equation_mathematical_pass_count, 0);
  assert.equal(artifact.summary.preferred_curve_branch_clock_lock_replacement_residual_pass_count, 0);
  assert.equal(artifact.summary.mathematical_internal_tangent_authority_bridge_passed, false);
  assert.equal(
    artifact.preferred_curve_internal_tangent_authority_equation_evaluations[0]
      .core_mathematical_preferred_curve_equation_passed,
    true
  );
  assert.equal(
    artifact.preferred_curve_internal_tangent_authority_equation_evaluations[0]
      .branch_clock_lock_replacement_residual_passed,
    false
  );
  assert.equal(
    artifact.preferred_curve_internal_tangent_authority_equation_evaluations[0]
      .branch_clock_lock_replacement_residual.absolute_residual > 0,
    true
  );
  assert.deepEqual(validateCentralSolverInternalTangentAuthorityVectorRows(artifact), []);
});

test("internal tangent-authority vector rows bridge rejects rows that do not bind to the retained request", () => {
  const retainedHistoryRow = buildCentralSolverRetainedHistoryRow({
    retainedRecordId: "retained-record:internal-tangent:request",
    providerObjectRef: "candidate:provider-object:mismatch",
    providerArtifactHash: "provider-hash-mismatch",
  });
  const minimumGainRow = makeMinimumGainWitnessRow({
    retainedRecordId: "retained-record:internal-tangent:different",
    rowSuffix: "mismatch",
  });
  const artifact = buildCentralSolverInternalTangentAuthorityVectorRows({
    retainedHistoryRow,
    minimumNormRetainedHistoryGainWitnessRows: [minimumGainRow],
  });

  assert.equal(artifact.artifact_status, "fail_closed_minimum_norm_retained_history_gain_rows_failed");
  assert.equal(
    artifact.first_missing_field,
    "central_solver_internal_tangent_authority_vector_rows.minimum_norm_retained_history_gain_witness_rows[*].mathematical_gain_conditions_passed"
  );
  assert.equal(artifact.summary.minimum_gain_witness_mathematical_pass_count, 1);
  assert.equal(artifact.summary.minimum_gain_witness_request_binding_pass_count, 0);
  assert.equal(
    artifact.minimum_norm_retained_history_gain_witness_evaluations[0].request_retained_record_binding_passed,
    false
  );
  assert.equal(artifact.summary.mathematical_internal_tangent_authority_bridge_passed, false);
  assert.deepEqual(validateCentralSolverInternalTangentAuthorityVectorRows(artifact), []);
});

test("internal tangent-authority vector rows evidence guard rejects non-evidence classes", () => {
  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    assert.deepEqual(evaluateCentralSolverInternalTangentAuthorityVectorRowsEvidence({ evidence_class: evidenceClass }), {
      accepted: false,
      reason,
      first_missing_field: FIRST_MISSING_FIELD,
    });
  }

  assert.deepEqual(evaluateCentralSolverInternalTangentAuthorityVectorRowsEvidence({ schema: "other.v0" }), {
    accepted: false,
    reason: "schema_not_central_solver_internal_tangent_authority_vector_rows_v0",
    first_missing_field: FIRST_MISSING_FIELD,
  });
});
