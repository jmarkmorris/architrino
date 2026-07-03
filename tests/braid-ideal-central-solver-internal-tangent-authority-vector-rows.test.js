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
  RETAINED_ROOT_LEDGER_DETAIL_FIRST_MISSING_FIELD,
  RETAINED_ROOT_LEDGER_DETAIL_ROW_SCHEMA,
  SAME_RECORD_ACTION_CLOSURE_FIRST_MISSING_FIELD,
  SAME_RECORD_ACTION_CLOSURE_ROW_SCHEMA,
  SCHEMA,
  buildCentralSolverInternalTangentAuthorityVectorRows,
  evaluateCentralSolverInternalTangentAuthorityVectorRowsEvidence,
  evaluateSameRecordRetainedRootLedgerDetailRows,
  evaluateSameRecordActionClosureRows,
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

function makeRootLedgerDetailRows({
  retainedRecordId,
  rowSuffix = "bridge",
  sourceRowId = `two-speed-row:${rowSuffix}`,
} = {}) {
  return [0, 1].map((index) => ({
    row_id: `retained-root-detail:${rowSuffix}:${index}`,
    schema: RETAINED_ROOT_LEDGER_DETAIL_ROW_SCHEMA,
    source_row_id: sourceRowId,
    retained_record_id: retainedRecordId,
    ledgerKey: `root-ledger:${rowSuffix}`,
    sourceKey: `P:${index}`,
    receiverKey: `E:${index}`,
    rootKey: `root:${rowSuffix}:${index}`,
    emissionTime: 0.25 - 0.04 - index * 0.001,
    hitTime: 0.25,
    delay: 0.04 + index * 0.001,
    residual: 0,
    jacobian: 0.72 + index * 0.01,
    branchWeight: 1.08 + index * 0.01,
    sourceNormalDenominator: 0.72 + index * 0.01,
    receiverNormalFactor: 1.08 + index * 0.01,
    entryKind: "retained",
    rootKind: "partner",
    statusCode: "ok",
    stateFlags: ["retained", "same-record"],
    epsilon_tau: 1e-9,
  }));
}

function makeActionClosureRows({
  retainedRecordId,
  rowSuffix = "bridge",
  sourceRowId = `two-speed-row:${rowSuffix}`,
  internalReplacementActionIncrement = 0.004,
  assignedClockLockActionIncrement = 0.004,
  actionResidualTolerance = 1e-9,
} = {}) {
  const actionIncrementResidual = Math.abs(
    internalReplacementActionIncrement - assignedClockLockActionIncrement
  );
  return [
    {
      row_id: `action-closure:${rowSuffix}`,
      schema: SAME_RECORD_ACTION_CLOSURE_ROW_SCHEMA,
      source_row_id: sourceRowId,
      retained_record_id: retainedRecordId,
      action_ledger_ref: `action-ledger:${rowSuffix}`,
      assigned_clock_lock_action_increment: assignedClockLockActionIncrement,
      internal_replacement_action_increment: internalReplacementActionIncrement,
      action_increment_residual: actionIncrementResidual,
      action_residual_tolerance: actionResidualTolerance,
      action_closure_passed: actionIncrementResidual <= actionResidualTolerance,
    },
  ];
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

function makeAcceptedBridgeEvidence({
  retainedRecordId = "retained-record:internal-tangent:accepted-criterion",
  sourceRowId = "two-speed-row:accepted-criterion",
} = {}) {
  return {
    accepted_same_record_central_solver_evidence: true,
    retained_record_id: retainedRecordId,
    source_row_id: sourceRowId,
    central_retained_history_acceptance_certificate_ref: "accepted:central-retained-history",
    central_internal_tangent_authority_vector_rows_acceptance_certificate_ref:
      "accepted:central-internal-tangent-authority-vector-rows",
    preferred_curve_internal_tangent_authority_acceptance_certificate_ref:
      "accepted:preferred-curve-internal-tangent-authority",
    same_record_retained_path_error_row_ref: "accepted:path-error-row",
    minimum_norm_retained_history_gain_witness_row_ref: "accepted:minimum-gain-row",
    retained_solver_vector_witness_row_ref: "accepted:retained-vector-witness-row",
    retained_solver_tangent_target_vector_row_ref: "accepted:tangent-target-row",
    active_causal_margin_gradient_vector_row_ref: "accepted:active-margin-gradient-row",
    same_record_provider_acceleration_vector_row_ref: "accepted:provider-acceleration-vector-row",
    post_provider_root_margin_row_ref: "accepted:post-provider-root-margin-row",
    branch_clock_lock_replacement_residual_row_ref: "accepted:branch-clock-lock-replacement-residual-row",
    same_record_retained_root_ledger_ref: "accepted:retained-root-ledger",
    same_record_retained_root_ledger_detail_rows_ref: "accepted:retained-root-ledger-detail-rows",
    same_record_action_closure_row_ref: "accepted:action-closure-row",
    same_record_wake_history_ref: "accepted:wake-history",
    same_record_path_history_ref: "accepted:path-history",
    same_record_provider_provenance_ref: "accepted:provider-provenance",
  };
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
  const rootDetailRows = makeRootLedgerDetailRows({ retainedRecordId, rowSuffix: "pass", sourceRowId });
  const actionClosureRows = makeActionClosureRows({ retainedRecordId, rowSuffix: "pass", sourceRowId });
  const preferredCurveEquationArtifact = makePreferredCurveEquationArtifact({
    minimumGainRow,
    rowSuffix: "pass",
    sourceRowId,
  });
  const artifact = buildCentralSolverInternalTangentAuthorityVectorRows({
    retainedHistoryRow,
    minimumNormRetainedHistoryGainWitnessRows: [minimumGainRow],
    retainedSolverVectorWitnessRows: [vectorRow],
    sameRecordRetainedRootLedgerDetailRows: rootDetailRows,
    sameRecordActionClosureRows: actionClosureRows,
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
  assert.equal(artifact.summary.retained_root_detail_row_count, 2);
  assert.equal(artifact.summary.retained_root_detail_valid_row_count, 2);
  assert.equal(artifact.summary.retained_root_detail_differential_passed, true);
  assert.deepEqual(artifact.summary.retained_root_detail_source_row_ids, [sourceRowId]);
  assert.equal(artifact.summary.same_record_action_closure_row_count, 1);
  assert.equal(artifact.summary.same_record_action_closure_valid_row_count, 1);
  assert.equal(artifact.summary.same_record_action_closure_passed, true);
  assert.deepEqual(artifact.summary.same_record_action_closure_source_row_ids, [sourceRowId]);
  assert.deepEqual(artifact.summary.same_record_bridge_source_row_ids, [sourceRowId]);
  assert.equal(artifact.summary.mathematical_internal_tangent_authority_vector_bridge_passed, true);
  assert.equal(artifact.summary.mathematical_internal_tangent_authority_bridge_passed, true);
  assert.equal(artifact.summary.accepted_internal_tangent_authority_bridge_criterion_passed, false);
  assert.equal(
    artifact.accepted_internal_tangent_authority_bridge_criterion.missing_fields.includes(
      "central_solver_internal_tangent_authority_vector_rows.same_record_accepted_evidence.accepted_same_record_central_solver_evidence"
    ),
    true
  );
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
  assert.equal(
    artifact.same_record_retained_root_ledger_detail_rows_evaluation
      .mathematical_root_differential_conditions_passed,
    true
  );
  assert.equal(
    artifact.same_record_action_closure_rows_evaluation
      .mathematical_action_closure_conditions_passed,
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

test("internal tangent-authority bridge requires retained-root detail rows after preferred-curve math passes", () => {
  const retainedRecordId = "retained-record:internal-tangent:root-detail-missing";
  const sourceRowId = "two-speed-row:root-detail-missing";
  const retainedHistoryRow = buildCentralSolverRetainedHistoryRow({
    retainedRecordId,
    providerObjectRef: "candidate:provider-object:root-detail-missing",
    providerArtifactHash: "provider-hash-root-detail-missing",
  });
  const minimumGainRow = makeMinimumGainWitnessRow({
    retainedRecordId,
    rowSuffix: "root-detail-missing",
    sourceRowId,
  });
  const vectorRow = makeRetainedSolverVectorWitnessRow({
    retainedRecordId,
    rowSuffix: "root-detail-missing",
    sourceRowId,
  });
  const preferredCurveEquationArtifact = makePreferredCurveEquationArtifact({
    minimumGainRow,
    rowSuffix: "root-detail-missing",
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
    "preferred_curve_passed_retained_root_ledger_detail_rows_missing"
  );
  assert.equal(artifact.first_missing_field, RETAINED_ROOT_LEDGER_DETAIL_FIRST_MISSING_FIELD);
  assert.equal(artifact.summary.mathematical_internal_tangent_authority_vector_bridge_passed, true);
  assert.equal(artifact.summary.preferred_curve_equation_mathematical_pass_count, 1);
  assert.equal(artifact.summary.retained_root_detail_row_count, 0);
  assert.equal(artifact.summary.retained_root_detail_differential_passed, false);
  assert.equal(artifact.summary.mathematical_internal_tangent_authority_bridge_passed, false);
  assert.equal(
    artifact.accepted_internal_tangent_authority_bridge_criterion.missing_fields.includes(
      "central_solver_internal_tangent_authority_vector_rows.mathematical_internal_tangent_authority_bridge_passed"
    ),
    true
  );
  assert.deepEqual(validateCentralSolverInternalTangentAuthorityVectorRows(artifact), []);
});

test("retained-root detail row evaluator fails closed when the root jacobian loses its floor", () => {
  const retainedRecordId = "retained-record:internal-tangent:root-jacobian";
  const rows = makeRootLedgerDetailRows({
    retainedRecordId,
    rowSuffix: "root-jacobian",
    sourceRowId: "two-speed-row:root-jacobian",
  });
  rows[0] = {
    ...rows[0],
    jacobian: 0,
  };
  const evaluation = evaluateSameRecordRetainedRootLedgerDetailRows(rows, retainedRecordId);

  assert.equal(evaluation.row_count, 2);
  assert.equal(evaluation.valid_row_count, 1);
  assert.equal(evaluation.mathematical_root_differential_conditions_passed, false);
  assert.equal(
    evaluation.first_missing_field,
    `${RETAINED_ROOT_LEDGER_DETAIL_FIRST_MISSING_FIELD}[0].jacobian_nonzero_floor`
  );
  assert.equal(evaluation.accepted, false);
});

test("internal tangent-authority bridge requires action closure rows after root detail rows pass", () => {
  const retainedRecordId = "retained-record:internal-tangent:action-missing";
  const sourceRowId = "two-speed-row:action-missing";
  const retainedHistoryRow = buildCentralSolverRetainedHistoryRow({
    retainedRecordId,
    providerObjectRef: "candidate:provider-object:action-missing",
    providerArtifactHash: "provider-hash-action-missing",
  });
  const minimumGainRow = makeMinimumGainWitnessRow({
    retainedRecordId,
    rowSuffix: "action-missing",
    sourceRowId,
  });
  const vectorRow = makeRetainedSolverVectorWitnessRow({
    retainedRecordId,
    rowSuffix: "action-missing",
    sourceRowId,
  });
  const rootDetailRows = makeRootLedgerDetailRows({
    retainedRecordId,
    rowSuffix: "action-missing",
    sourceRowId,
  });
  const preferredCurveEquationArtifact = makePreferredCurveEquationArtifact({
    minimumGainRow,
    rowSuffix: "action-missing",
    sourceRowId,
  });
  const artifact = buildCentralSolverInternalTangentAuthorityVectorRows({
    retainedHistoryRow,
    minimumNormRetainedHistoryGainWitnessRows: [minimumGainRow],
    retainedSolverVectorWitnessRows: [vectorRow],
    sameRecordRetainedRootLedgerDetailRows: rootDetailRows,
    preferredCurveInternalTangentAuthorityEquationArtifacts: [preferredCurveEquationArtifact],
  });

  assert.equal(
    artifact.artifact_status,
    "preferred_curve_passed_same_record_action_closure_rows_missing"
  );
  assert.equal(artifact.first_missing_field, SAME_RECORD_ACTION_CLOSURE_FIRST_MISSING_FIELD);
  assert.equal(artifact.summary.retained_root_detail_differential_passed, true);
  assert.equal(artifact.summary.same_record_action_closure_row_count, 0);
  assert.equal(artifact.summary.same_record_action_closure_passed, false);
  assert.equal(artifact.summary.mathematical_internal_tangent_authority_bridge_passed, false);
  assert.deepEqual(validateCentralSolverInternalTangentAuthorityVectorRows(artifact), []);
});

test("same-record action closure evaluator fails when replacement action differs from clock action", () => {
  const retainedRecordId = "retained-record:internal-tangent:action-residual";
  const rows = makeActionClosureRows({
    retainedRecordId,
    rowSuffix: "action-residual",
    sourceRowId: "two-speed-row:action-residual",
    assignedClockLockActionIncrement: 0.004,
    internalReplacementActionIncrement: 0.006,
    actionResidualTolerance: 1e-4,
  });
  const evaluation = evaluateSameRecordActionClosureRows(rows, retainedRecordId);

  assert.equal(evaluation.row_count, 1);
  assert.equal(evaluation.valid_row_count, 0);
  assert.equal(evaluation.mathematical_action_closure_conditions_passed, false);
  assert.equal(
    evaluation.first_missing_field,
    `${SAME_RECORD_ACTION_CLOSURE_FIRST_MISSING_FIELD}[0].action_residual_tolerance_pass`
  );
  assert.equal(evaluation.accepted, false);
});

test("internal tangent-authority bridge states conditional accepted-evidence criterion with refs", () => {
  const retainedRecordId = "retained-record:internal-tangent:accepted-criterion";
  const sourceRowId = "two-speed-row:accepted-criterion";
  const retainedHistoryRow = buildCentralSolverRetainedHistoryRow({
    retainedRecordId,
    providerObjectRef: "candidate:provider-object:accepted-criterion",
    providerArtifactHash: "provider-hash-accepted-criterion",
  });
  const minimumGainRow = makeMinimumGainWitnessRow({
    retainedRecordId,
    rowSuffix: "accepted-criterion",
    sourceRowId,
  });
  const vectorRow = makeRetainedSolverVectorWitnessRow({
    retainedRecordId,
    rowSuffix: "accepted-criterion",
    sourceRowId,
  });
  const rootDetailRows = makeRootLedgerDetailRows({
    retainedRecordId,
    rowSuffix: "accepted-criterion",
    sourceRowId,
  });
  const actionClosureRows = makeActionClosureRows({
    retainedRecordId,
    rowSuffix: "accepted-criterion",
    sourceRowId,
  });
  const preferredCurveEquationArtifact = makePreferredCurveEquationArtifact({
    minimumGainRow,
    rowSuffix: "accepted-criterion",
    sourceRowId,
  });
  const artifact = buildCentralSolverInternalTangentAuthorityVectorRows({
    retainedHistoryRow,
    minimumNormRetainedHistoryGainWitnessRows: [minimumGainRow],
    retainedSolverVectorWitnessRows: [vectorRow],
    sameRecordRetainedRootLedgerDetailRows: rootDetailRows,
    sameRecordActionClosureRows: actionClosureRows,
    preferredCurveInternalTangentAuthorityEquationArtifacts: [preferredCurveEquationArtifact],
    sameRecordAcceptedEvidence: makeAcceptedBridgeEvidence({ retainedRecordId, sourceRowId }),
  });

  assert.equal(artifact.summary.mathematical_internal_tangent_authority_bridge_passed, true);
  assert.equal(artifact.summary.accepted_internal_tangent_authority_bridge_criterion_passed, true);
  assert.equal(artifact.summary.same_record_accepted_evidence_binding_passed, true);
  assert.equal(
    artifact.accepted_internal_tangent_authority_bridge_criterion.status,
    "accepted_bridge_criterion_conditionally_satisfied_by_declared_same_record_evidence"
  );
  assert.equal(
    artifact.accepted_internal_tangent_authority_bridge_criterion.can_replace_assigned_branch_clock_lock,
    "conditional_on_external_accepted_authority"
  );
  assert.equal(
    artifact.accepted_internal_tangent_authority_bridge_criterion.required_accepted_evidence_fields.includes(
      "same_record_retained_root_ledger_detail_rows_ref"
    ),
    true
  );
  assert.equal(
    artifact.accepted_internal_tangent_authority_bridge_criterion.candidate_artifact_authorizes_removal,
    false
  );
  assert.deepEqual(
    artifact.accepted_internal_tangent_authority_bridge_criterion.required_same_record_binding_fields,
    ["retained_record_id", "source_row_id"]
  );
  assert.deepEqual(
    artifact.accepted_internal_tangent_authority_bridge_criterion.same_record_ref_binding.retained_record_id,
    {
      expected: retainedRecordId,
      supplied: retainedRecordId,
      binding_passed: true,
    }
  );
  assert.deepEqual(
    artifact.accepted_internal_tangent_authority_bridge_criterion.same_record_ref_binding.source_row_id,
    {
      candidate_source_row_ids: [sourceRowId],
      supplied: sourceRowId,
      binding_passed: true,
    }
  );
  assert.equal(artifact.accepted_internal_tangent_authority_bridge_criterion.accepted, false);
  assert.equal(artifact.accepted, false);
  assert.equal(artifact.accepted_internal_tangent_authority_ref, null);
  assert.equal(artifact.authorization.accepted_internal_tangent_authority, false);
  assert.deepEqual(validateCentralSolverInternalTangentAuthorityVectorRows(artifact), []);
});

test("internal tangent-authority bridge rejects accepted refs not bound to the retained record", () => {
  const retainedRecordId = "retained-record:internal-tangent:accepted-retained-binding";
  const sourceRowId = "two-speed-row:accepted-retained-binding";
  const retainedHistoryRow = buildCentralSolverRetainedHistoryRow({
    retainedRecordId,
    providerObjectRef: "candidate:provider-object:accepted-retained-binding",
    providerArtifactHash: "provider-hash-accepted-retained-binding",
  });
  const minimumGainRow = makeMinimumGainWitnessRow({
    retainedRecordId,
    rowSuffix: "accepted-retained-binding",
    sourceRowId,
  });
  const vectorRow = makeRetainedSolverVectorWitnessRow({
    retainedRecordId,
    rowSuffix: "accepted-retained-binding",
    sourceRowId,
  });
  const rootDetailRows = makeRootLedgerDetailRows({
    retainedRecordId,
    rowSuffix: "accepted-retained-binding",
    sourceRowId,
  });
  const actionClosureRows = makeActionClosureRows({
    retainedRecordId,
    rowSuffix: "accepted-retained-binding",
    sourceRowId,
  });
  const preferredCurveEquationArtifact = makePreferredCurveEquationArtifact({
    minimumGainRow,
    rowSuffix: "accepted-retained-binding",
    sourceRowId,
  });
  const artifact = buildCentralSolverInternalTangentAuthorityVectorRows({
    retainedHistoryRow,
    minimumNormRetainedHistoryGainWitnessRows: [minimumGainRow],
    retainedSolverVectorWitnessRows: [vectorRow],
    sameRecordRetainedRootLedgerDetailRows: rootDetailRows,
    sameRecordActionClosureRows: actionClosureRows,
    preferredCurveInternalTangentAuthorityEquationArtifacts: [preferredCurveEquationArtifact],
    sameRecordAcceptedEvidence: makeAcceptedBridgeEvidence({
      retainedRecordId: "retained-record:internal-tangent:other",
      sourceRowId,
    }),
  });

  assert.equal(artifact.summary.mathematical_internal_tangent_authority_bridge_passed, true);
  assert.equal(artifact.summary.accepted_internal_tangent_authority_bridge_criterion_passed, false);
  assert.equal(artifact.summary.same_record_accepted_evidence_binding_passed, false);
  assert.equal(
    artifact.accepted_internal_tangent_authority_bridge_criterion.same_record_ref_binding.retained_record_id
      .expected,
    retainedRecordId
  );
  assert.equal(
    artifact.accepted_internal_tangent_authority_bridge_criterion.same_record_ref_binding.retained_record_id
      .supplied,
    "retained-record:internal-tangent:other"
  );
  assert.equal(
    artifact.accepted_internal_tangent_authority_bridge_criterion.same_record_ref_binding.retained_record_id
      .binding_passed,
    false
  );
  assert.equal(
    artifact.accepted_internal_tangent_authority_bridge_criterion.same_record_ref_binding.source_row_id
      .binding_passed,
    true
  );
  assert.equal(
    artifact.accepted_internal_tangent_authority_bridge_criterion.missing_fields.includes(
      "central_solver_internal_tangent_authority_vector_rows.same_record_accepted_evidence.retained_record_id"
    ),
    true
  );
  assert.equal(
    artifact.accepted_internal_tangent_authority_bridge_criterion.can_replace_assigned_branch_clock_lock,
    false
  );
  assert.deepEqual(validateCentralSolverInternalTangentAuthorityVectorRows(artifact), []);
});

test("internal tangent-authority bridge rejects accepted refs not bound to the passing source row", () => {
  const retainedRecordId = "retained-record:internal-tangent:accepted-source-binding";
  const sourceRowId = "two-speed-row:accepted-source-binding";
  const retainedHistoryRow = buildCentralSolverRetainedHistoryRow({
    retainedRecordId,
    providerObjectRef: "candidate:provider-object:accepted-source-binding",
    providerArtifactHash: "provider-hash-accepted-source-binding",
  });
  const minimumGainRow = makeMinimumGainWitnessRow({
    retainedRecordId,
    rowSuffix: "accepted-source-binding",
    sourceRowId,
  });
  const vectorRow = makeRetainedSolverVectorWitnessRow({
    retainedRecordId,
    rowSuffix: "accepted-source-binding",
    sourceRowId,
  });
  const rootDetailRows = makeRootLedgerDetailRows({
    retainedRecordId,
    rowSuffix: "accepted-source-binding",
    sourceRowId,
  });
  const actionClosureRows = makeActionClosureRows({
    retainedRecordId,
    rowSuffix: "accepted-source-binding",
    sourceRowId,
  });
  const preferredCurveEquationArtifact = makePreferredCurveEquationArtifact({
    minimumGainRow,
    rowSuffix: "accepted-source-binding",
    sourceRowId,
  });
  const artifact = buildCentralSolverInternalTangentAuthorityVectorRows({
    retainedHistoryRow,
    minimumNormRetainedHistoryGainWitnessRows: [minimumGainRow],
    retainedSolverVectorWitnessRows: [vectorRow],
    sameRecordRetainedRootLedgerDetailRows: rootDetailRows,
    sameRecordActionClosureRows: actionClosureRows,
    preferredCurveInternalTangentAuthorityEquationArtifacts: [preferredCurveEquationArtifact],
    sameRecordAcceptedEvidence: makeAcceptedBridgeEvidence({
      retainedRecordId,
      sourceRowId: "two-speed-row:accepted-source-binding:other",
    }),
  });

  assert.equal(artifact.summary.mathematical_internal_tangent_authority_bridge_passed, true);
  assert.equal(artifact.summary.accepted_internal_tangent_authority_bridge_criterion_passed, false);
  assert.equal(artifact.summary.same_record_accepted_evidence_binding_passed, false);
  assert.deepEqual(
    artifact.accepted_internal_tangent_authority_bridge_criterion.same_record_ref_binding.source_row_id
      .candidate_source_row_ids,
    [sourceRowId]
  );
  assert.equal(
    artifact.accepted_internal_tangent_authority_bridge_criterion.same_record_ref_binding.source_row_id.supplied,
    "two-speed-row:accepted-source-binding:other"
  );
  assert.equal(
    artifact.accepted_internal_tangent_authority_bridge_criterion.same_record_ref_binding.source_row_id
      .binding_passed,
    false
  );
  assert.equal(
    artifact.accepted_internal_tangent_authority_bridge_criterion.same_record_ref_binding.retained_record_id
      .binding_passed,
    true
  );
  assert.equal(
    artifact.accepted_internal_tangent_authority_bridge_criterion.missing_fields.includes(
      "central_solver_internal_tangent_authority_vector_rows.same_record_accepted_evidence.source_row_id"
    ),
    true
  );
  assert.equal(
    artifact.accepted_internal_tangent_authority_bridge_criterion.can_replace_assigned_branch_clock_lock,
    false
  );
  assert.deepEqual(validateCentralSolverInternalTangentAuthorityVectorRows(artifact), []);
});

test("internal tangent-authority bridge rejects retained-root detail rows from a different source row", () => {
  const retainedRecordId = "retained-record:internal-tangent:root-source-binding";
  const sourceRowId = "two-speed-row:root-source-binding";
  const retainedHistoryRow = buildCentralSolverRetainedHistoryRow({
    retainedRecordId,
    providerObjectRef: "candidate:provider-object:root-source-binding",
    providerArtifactHash: "provider-hash-root-source-binding",
  });
  const minimumGainRow = makeMinimumGainWitnessRow({
    retainedRecordId,
    rowSuffix: "root-source-binding",
    sourceRowId,
  });
  const vectorRow = makeRetainedSolverVectorWitnessRow({
    retainedRecordId,
    rowSuffix: "root-source-binding",
    sourceRowId,
  });
  const rootDetailRows = makeRootLedgerDetailRows({
    retainedRecordId,
    rowSuffix: "root-source-binding",
    sourceRowId: "two-speed-row:root-source-binding:other",
  });
  const actionClosureRows = makeActionClosureRows({
    retainedRecordId,
    rowSuffix: "root-source-binding",
    sourceRowId,
  });
  const preferredCurveEquationArtifact = makePreferredCurveEquationArtifact({
    minimumGainRow,
    rowSuffix: "root-source-binding",
    sourceRowId,
  });
  const artifact = buildCentralSolverInternalTangentAuthorityVectorRows({
    retainedHistoryRow,
    minimumNormRetainedHistoryGainWitnessRows: [minimumGainRow],
    retainedSolverVectorWitnessRows: [vectorRow],
    sameRecordRetainedRootLedgerDetailRows: rootDetailRows,
    sameRecordActionClosureRows: actionClosureRows,
    preferredCurveInternalTangentAuthorityEquationArtifacts: [preferredCurveEquationArtifact],
  });

  assert.equal(artifact.artifact_status, "fail_closed_same_record_source_row_binding_missing");
  assert.equal(
    artifact.first_missing_field,
    "central_solver_internal_tangent_authority_vector_rows.same_record_source_row_binding"
  );
  assert.deepEqual(
    artifact.accepted_internal_tangent_authority_bridge_criterion.same_record_ref_binding
      .mathematical_bridge_binding.minimum_gain_source_row_ids,
    [sourceRowId]
  );
  assert.deepEqual(
    artifact.accepted_internal_tangent_authority_bridge_criterion.same_record_ref_binding
      .mathematical_bridge_binding.retained_root_detail_source_row_ids,
    ["two-speed-row:root-source-binding:other"]
  );
  assert.deepEqual(artifact.summary.same_record_bridge_source_row_ids, []);
  assert.equal(artifact.summary.retained_root_detail_differential_passed, true);
  assert.equal(artifact.summary.mathematical_internal_tangent_authority_bridge_passed, false);
  assert.deepEqual(validateCentralSolverInternalTangentAuthorityVectorRows(artifact), []);
});

test("internal tangent-authority bridge rejects action closure rows from a different source row", () => {
  const retainedRecordId = "retained-record:internal-tangent:action-source-binding";
  const sourceRowId = "two-speed-row:action-source-binding";
  const retainedHistoryRow = buildCentralSolverRetainedHistoryRow({
    retainedRecordId,
    providerObjectRef: "candidate:provider-object:action-source-binding",
    providerArtifactHash: "provider-hash-action-source-binding",
  });
  const minimumGainRow = makeMinimumGainWitnessRow({
    retainedRecordId,
    rowSuffix: "action-source-binding",
    sourceRowId,
  });
  const vectorRow = makeRetainedSolverVectorWitnessRow({
    retainedRecordId,
    rowSuffix: "action-source-binding",
    sourceRowId,
  });
  const rootDetailRows = makeRootLedgerDetailRows({
    retainedRecordId,
    rowSuffix: "action-source-binding",
    sourceRowId,
  });
  const actionClosureRows = makeActionClosureRows({
    retainedRecordId,
    rowSuffix: "action-source-binding",
    sourceRowId: "two-speed-row:action-source-binding:other",
  });
  const preferredCurveEquationArtifact = makePreferredCurveEquationArtifact({
    minimumGainRow,
    rowSuffix: "action-source-binding",
    sourceRowId,
  });
  const artifact = buildCentralSolverInternalTangentAuthorityVectorRows({
    retainedHistoryRow,
    minimumNormRetainedHistoryGainWitnessRows: [minimumGainRow],
    retainedSolverVectorWitnessRows: [vectorRow],
    sameRecordRetainedRootLedgerDetailRows: rootDetailRows,
    sameRecordActionClosureRows: actionClosureRows,
    preferredCurveInternalTangentAuthorityEquationArtifacts: [preferredCurveEquationArtifact],
  });

  assert.equal(artifact.artifact_status, "fail_closed_same_record_source_row_binding_missing");
  assert.deepEqual(
    artifact.accepted_internal_tangent_authority_bridge_criterion.same_record_ref_binding
      .mathematical_bridge_binding.same_record_action_closure_source_row_ids,
    ["two-speed-row:action-source-binding:other"]
  );
  assert.deepEqual(artifact.summary.same_record_bridge_source_row_ids, []);
  assert.equal(artifact.summary.same_record_action_closure_passed, true);
  assert.equal(artifact.summary.mathematical_internal_tangent_authority_bridge_passed, false);
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
