import assert from "node:assert/strict";
import test from "node:test";

import {
  FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT,
  LEAST_NORM_PROVIDER_FIRST_MISSING_FIELD,
  LEAST_NORM_PROVIDER_FIRST_MISSING_OBJECT,
  NEGATIVE_CONTROL_REASONS,
  RETAINED_HISTORY_FIRST_MISSING_FIELD,
  RETAINED_HISTORY_FIRST_MISSING_OBJECT,
  SCHEMA,
  buildOblateSpheroidInternalTangentAuthorityCertificate,
  evaluateLeastNormRetainedVectorProviderWitness,
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
  const branchClockRms = 0.1;
  const minReserve = 0.01;
  const postTangentReserve = dynamicRootMargin - branchClockRms;
  const requiredMargin = minReserve + branchClockRms;
  const requiredMarginLift = Math.max(0, requiredMargin - dynamicRootMargin);
  const maxAuthorityFraction = (dynamicRootMargin - minReserve) / branchClockRms;
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
      rms_acceleration: branchClockRms,
      max_acceleration: branchClockRms * 1.5,
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
    tangent_authority_reserve_status: {
      minimum_dynamic_root_margin_reserve: minReserve,
      tangent_response_horizon: 1,
      dynamic_root_margin: dynamicRootMargin,
      branch_clock_lock_rms_acceleration: branchClockRms,
      branch_clock_lock_max_acceleration: branchClockRms * 1.5,
      required_dynamic_root_margin_for_full_tangent_authority: requiredMargin,
      minimum_margin_lift_for_full_tangent_authority: requiredMarginLift,
      maximum_tangent_authority_fraction_without_margin_lift: maxAuthorityFraction,
      minimum_tangent_authority_compression_without_margin_lift:
        Math.max(0, 1 - Math.max(0, Math.min(1, maxAuthorityFraction))),
      dynamic_root_margin_after_rms_tangent_authority: postTangentReserve,
      positive_rms_tangent_authority_reserve: postTangentReserve >= minReserve,
      status: postTangentReserve >= minReserve
        ? "positive_rms_tangent_authority_reserve"
        : "insufficient_rms_tangent_authority_reserve",
    },
    margin_lift_mechanism_requirement: {
      active_margin_gradient_equation:
        "g_mu = normalized gradient of the active minimum causal-margin factor with respect to receiver/source velocity",
      first_order_margin_lift_equation:
        "delta_mu ~= margin_lift_response_horizon * <a_internal_margin, g_mu>",
      combined_internal_acceleration_equation:
        "a_internal = P_T(a_ansatz-a_wake-a_support) + a_internal_margin + a_internal_null",
      required_margin_lift: requiredMarginLift,
      minimum_margin_lift_acceleration_proxy: requiredMarginLift,
      margin_lift_response_horizon: 1,
      candidate_provider_classes: [
        "retained_root_normal_gradient_response",
        "wake_ledger_phase_pressure_response",
        "angular_momentum_exchange_response",
        "shielding_induced_source_normal_response",
        "noether_sea_tangent_pressure_response",
      ],
      accepted_provider_ref: null,
      accepted: false,
    },
    retained_root_ledger_ref: null,
    accepted: false,
    hard_math_candidate: positiveReserve && postTangentReserve >= minReserve,
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
    rows,
    branch_clock_lock_reserve_candidate_rows: rows.filter((row) => row.hard_math_candidate),
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
  assert.equal(artifact.summary.positive_post_tangent_authority_reserve_count, 0);
  assert.equal(artifact.summary.rows_requiring_margin_lift_count, 1);
  assert.equal(Math.abs(artifact.summary.max_required_margin_lift - 0.085) < 1e-12, true);
  assert.equal(Math.abs(artifact.summary.max_minimum_margin_lift_acceleration_proxy - 0.085) < 1e-12, true);
  assert.equal(artifact.summary.full_replacement_without_margin_lift_count, 0);
  assert.equal(artifact.summary.full_replacement_requires_margin_lift_count, 1);
  assert.equal(artifact.summary.rows_with_raw_margin_deficit_before_tangent_count, 0);
  assert.equal(artifact.summary.accepted_vector_provider_count, 0);
  assert.equal(artifact.summary.vector_provider_missing_count, 1);
  assert.equal(artifact.summary.least_norm_provider_equation_row_count, 1);
  assert.equal(artifact.summary.accepted_least_norm_provider_count, 0);
  assert.equal(artifact.summary.provider_equation_vector_row_missing_count, 1);
  assert.equal(artifact.summary.normalized_diagnostic_witness_row_count, 1);
  assert.equal(artifact.summary.normalized_diagnostic_witness_pass_count, 1);
  assert.equal(artifact.summary.normalized_diagnostic_witness_missing_input_count, 0);
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
  assert.equal(
    retainedHistoryRoute.tangent_authority_equation,
    "P_T a_internal = P_T(a_ansatz - a_wake - a_support)"
  );
  assert.equal(
    retainedHistoryRoute.margin_lift_equation,
    "<a_internal_margin,g_mu> >= required_margin_lift/margin_lift_response_horizon"
  );
  assert.equal(retainedHistoryRoute.measured_margin_lift_fields.rows_requiring_margin_lift_count, 1);
  assert.equal(Math.abs(retainedHistoryRoute.measured_margin_lift_fields.max_required_margin_lift - 0.085) < 1e-12, true);
  assert.equal(retainedHistoryRoute.scalar_replacement_feasibility_fields.full_replacement_without_margin_lift_count, 0);
  assert.equal(retainedHistoryRoute.scalar_replacement_feasibility_fields.full_replacement_requires_margin_lift_count, 1);
  assert.equal(
    retainedHistoryRoute.scalar_replacement_feasibility_fields.equation,
    "delta_mu(lambda_T)=max(0, epsilon_mu + Delta_T*lambda_T*A_T - m_dyn)"
  );
  assert.equal(
    retainedHistoryRoute.vector_tangent_margin_compatibility_fields.tangent_projection_equation,
    "P_T a_internal = P_T(a_ansatz - a_wake - a_support)"
  );
  assert.equal(
    retainedHistoryRoute.vector_tangent_margin_compatibility_fields.minimum_null_correction,
    "n_* = max(0, delta_mu_req/Delta_M - <T,G_mu>) * P_N G_mu / ||P_N G_mu||^2"
  );
  assert.equal(retainedHistoryRoute.vector_tangent_margin_compatibility_fields.accepted_vector_provider_count, 0);
  assert.equal(retainedHistoryRoute.vector_tangent_margin_compatibility_fields.vector_provider_missing_count, 1);
  assert.equal(
    retainedHistoryRoute.least_norm_retained_vector_provider_fields.provider_equation,
    "a_provider^* = T + n_*"
  );
  assert.equal(
    retainedHistoryRoute.least_norm_retained_vector_provider_fields.post_provider_root_margin_condition,
    "m_dyn - Delta_T ||P_T a_provider^*|| + Delta_M <a_provider^*,G_mu> >= epsilon_mu"
  );
  assert.equal(
    retainedHistoryRoute.least_norm_retained_vector_provider_fields.first_missing_object,
    LEAST_NORM_PROVIDER_FIRST_MISSING_OBJECT
  );
  assert.equal(
    retainedHistoryRoute.least_norm_retained_vector_provider_fields.first_missing_field,
    LEAST_NORM_PROVIDER_FIRST_MISSING_FIELD
  );
  assert.equal(retainedHistoryRoute.least_norm_retained_vector_provider_fields.accepted_least_norm_provider_count, 0);
  assert.equal(retainedHistoryRoute.least_norm_retained_vector_provider_fields.provider_equation_vector_row_missing_count, 1);
  assert.equal(
    retainedHistoryRoute.normalized_diagnostic_vector_witness_fields.construction_equation,
    "T=[A_T,0], G_mu=[0,1], P_T=diag(1,0), P_N=diag(0,1), a_provider=[A_T,delta_mu_req/Delta_M]"
  );
  assert.equal(retainedHistoryRoute.normalized_diagnostic_vector_witness_fields.normalized_diagnostic_witness_row_count, 1);
  assert.equal(retainedHistoryRoute.normalized_diagnostic_vector_witness_fields.normalized_diagnostic_witness_pass_count, 1);
  assert.equal(retainedHistoryRoute.normalized_diagnostic_vector_witness_fields.accepted_provider_count, 0);
  assert.equal(retainedHistoryRoute.first_missing_object, RETAINED_HISTORY_FIRST_MISSING_OBJECT);
  assert.equal(retainedHistoryRoute.first_missing_field, RETAINED_HISTORY_FIRST_MISSING_FIELD);
  assert.equal(actionRoute.route_id, "same_ledger_action_measure_tangent_row");
  assert.equal(Math.abs(actionRoute.measured_margin_lift_fields.max_required_margin_lift - 0.085) < 1e-12, true);
  assert.equal(actionRoute.scalar_replacement_feasibility_fields.full_replacement_requires_margin_lift_count, 1);
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
  assert.equal(measured.post_tangent_authority_reserve_condition.positive_rms_tangent_authority_reserve, false);
  assert.equal(
    measured.post_tangent_authority_reserve_condition.dynamic_root_margin_after_rms_tangent_authority,
    -0.07500000000000001
  );
  assert.equal(Math.abs(measured.margin_lift_requirement.required_margin_lift - 0.085) < 1e-12, true);
  assert.deepEqual(measured.margin_lift_requirement.candidate_provider_classes, [
    "retained_root_normal_gradient_response",
    "wake_ledger_phase_pressure_response",
    "angular_momentum_exchange_response",
    "shielding_induced_source_normal_response",
    "noether_sea_tangent_pressure_response",
  ]);
  assert.equal(measured.margin_lift_requirement.accepted_provider_ref, null);
  assert.equal(
    measured.scalar_tangent_replacement_feasibility.replacement_curve_equation,
    "delta_mu(lambda_T)=max(0, epsilon_mu + Delta_T*lambda_T*A_T - m_dyn)"
  );
  assert.equal(
    Math.abs(
      measured.scalar_tangent_replacement_feasibility.required_margin_lift_at_full_measured_tangent_authority -
        0.085
    ) < 1e-12,
    true
  );
  assert.equal(measured.scalar_tangent_replacement_feasibility.required_margin_lift_at_zero_tangent_authority, 0);
  assert.equal(
    Math.abs(measured.scalar_tangent_replacement_feasibility.maximum_tangent_authority_fraction_without_margin_lift - 0.15) <
      1e-12,
    true
  );
  assert.equal(
    Math.abs(measured.scalar_tangent_replacement_feasibility.minimum_tangent_authority_compression_without_margin_lift - 0.85) <
      1e-12,
    true
  );
  assert.equal(
    measured.scalar_tangent_replacement_feasibility.full_measured_tangent_authority_passes_without_margin_lift,
    false
  );
  assert.equal(measured.scalar_tangent_replacement_feasibility.raw_margin_passes_without_tangent_authority, true);
  assert.equal(measured.scalar_tangent_replacement_feasibility.retained_vector_provider_required, true);
  assert.equal(measured.scalar_tangent_replacement_feasibility.accepted_vector_provider_ref, null);
  assert.equal(measured.scalar_tangent_replacement_feasibility.accepted, false);
  assert.equal(
    measured.vector_tangent_margin_compatibility.tangent_projection_equation,
    "P_T a_internal = T"
  );
  assert.equal(
    measured.vector_tangent_margin_compatibility.general_solution,
    "a_internal = T + n, with P_T n = 0"
  );
  assert.equal(
    measured.vector_tangent_margin_compatibility.margin_lift_compatibility_inequality,
    "<T,G_mu> + <n,P_N G_mu> >= delta_mu_req / Delta_M"
  );
  assert.equal(
    measured.vector_tangent_margin_compatibility.minimum_null_correction,
    "n_* = max(0, delta_mu_req/Delta_M - <T,G_mu>) * P_N G_mu / ||P_N G_mu||^2 when ||P_N G_mu|| > 0"
  );
  assert.deepEqual(measured.vector_tangent_margin_compatibility.required_vector_rows, [
    "retained_tangent_target_vector_row",
    "active_causal_margin_gradient_vector_row",
    "tangent_null_projection_row",
    "same_record_provider_acceleration_vector_row",
    "post_provider_root_margin_row",
  ]);
  assert.equal(measured.vector_tangent_margin_compatibility.provider_claim_status, "vector_provider_missing");
  assert.equal(measured.vector_tangent_margin_compatibility.accepted_vector_provider_ref, null);
  assert.equal(measured.vector_tangent_margin_compatibility.accepted, false);
  assert.equal(
    measured.least_norm_retained_vector_provider.provider_equation,
    "a_provider^* = T + n_*"
  );
  assert.equal(
    measured.least_norm_retained_vector_provider.tangent_replacement_condition,
    "P_T a_provider^* = T"
  );
  assert.equal(
    measured.least_norm_retained_vector_provider.minimum_norm_objective,
    "minimize ||n|| subject to P_T n = 0 and m_dyn - Delta_T ||T|| + Delta_M <T+n,G_mu> >= epsilon_mu"
  );
  assert.equal(
    measured.least_norm_retained_vector_provider.post_provider_root_margin_condition,
    "m_dyn - Delta_T ||P_T a_provider^*|| + Delta_M <a_provider^*,G_mu> >= epsilon_mu"
  );
  assert.equal(
    measured.least_norm_retained_vector_provider.witness_evaluation_schema,
    "least_norm_retained_vector_provider_witness_evaluation.v0"
  );
  assert.deepEqual(measured.least_norm_retained_vector_provider.required_witness_input_slots, [
    "tangent_target_vector",
    "active_margin_gradient_vector",
    "tangent_projector_matrix",
    "tangent_null_projector_matrix",
    "provider_acceleration_vector",
    "dynamic_root_margin",
    "tangent_response_horizon",
    "margin_lift_response_horizon",
    "minimum_dynamic_root_margin_reserve",
  ]);
  assert.equal(
    measured.least_norm_retained_vector_provider.witness_pass_conditions.tangent_replacement,
    "||P_T a_provider - T|| <= epsilon_vec"
  );
  assert.equal(
    measured.least_norm_retained_vector_provider.witness_pass_conditions.least_norm_solution,
    "||a_provider - (T+n_*)|| <= epsilon_vec"
  );
  assert.deepEqual(measured.least_norm_retained_vector_provider.required_same_record_rows, [
    "retained_tangent_target_vector_row",
    "active_causal_margin_gradient_vector_row",
    "tangent_null_projection_row",
    "least_norm_provider_acceleration_vector_row",
    "post_provider_root_margin_row",
    "same_record_retained_root_ledger",
    "same_record_action_closure_row",
  ]);
  assert.equal(
    measured.least_norm_retained_vector_provider.provider_claim_status,
    "least_norm_provider_equation_missing_same_record_vectors"
  );
  assert.equal(measured.least_norm_retained_vector_provider.first_missing_object, LEAST_NORM_PROVIDER_FIRST_MISSING_OBJECT);
  assert.equal(measured.least_norm_retained_vector_provider.first_missing_field, LEAST_NORM_PROVIDER_FIRST_MISSING_FIELD);
  assert.equal(measured.least_norm_retained_vector_provider.accepted_vector_provider_ref, null);
  assert.equal(measured.least_norm_retained_vector_provider.accepted, false);
  assert.equal(
    measured.normalized_diagnostic_vector_witness.scope_note,
    "diagnostic_normalized_basis_not_retained_solver_vector_evidence"
  );
  assert.equal(
    measured.normalized_diagnostic_vector_witness.construction_status,
    "normalized_local_tangent_margin_basis_constructed"
  );
  assert.deepEqual(measured.normalized_diagnostic_vector_witness.witness_vectors.tangent_target_vector, [0.1, 0]);
  assert.deepEqual(measured.normalized_diagnostic_vector_witness.witness_vectors.active_margin_gradient_vector, [0, 1]);
  assert.equal(
    Math.abs(measured.normalized_diagnostic_vector_witness.input_scalars.delta_mu_required - 0.085) < 1e-12,
    true
  );
  assert.equal(
    Math.abs(measured.normalized_diagnostic_vector_witness.input_scalars.required_null_lift - 0.085) < 1e-12,
    true
  );
  assert.equal(
    Math.abs(measured.normalized_diagnostic_vector_witness.witness_vectors.provider_acceleration_vector[1] - 0.085) <
      1e-12,
    true
  );
  assert.equal(measured.normalized_diagnostic_vector_witness.mathematical_witness_conditions_passed, true);
  assert.equal(measured.normalized_diagnostic_vector_witness.evaluation.mathematical_witness_conditions_passed, true);
  assert.equal(measured.normalized_diagnostic_vector_witness.evaluation.accepted, false);
  assert.equal(measured.normalized_diagnostic_vector_witness.accepted, false);
  assert.equal(measured.retained_root_ledger_ref, null);
  assert.equal(measured.accepted, false);
});

test("least-norm provider witness can pass mathematically while staying non-authorizing", () => {
  const evaluation = evaluateLeastNormRetainedVectorProviderWitness({
    tangent_target_vector: [1, 0],
    active_margin_gradient_vector: [0, 1],
    tangent_projector_matrix: [
      [1, 0],
      [0, 0],
    ],
    tangent_null_projector_matrix: [
      [0, 0],
      [0, 1],
    ],
    provider_acceleration_vector: [1, 0.15],
    dynamic_root_margin: 0.05,
    tangent_response_horizon: 0.1,
    margin_lift_response_horizon: 1,
    minimum_dynamic_root_margin_reserve: 0.1,
  });

  assert.equal(evaluation.schema, "least_norm_retained_vector_provider_witness_evaluation.v0");
  assert.equal(evaluation.mathematical_witness_conditions_passed, true);
  assert.equal(evaluation.accepted, false);
  assert.equal(evaluation.reason, "mathematical_witness_passes_but_same_record_acceptance_blocked");
  assert.equal(evaluation.computed.least_norm_null_correction_vector[0], 0);
  assert.equal(Math.abs(evaluation.computed.least_norm_null_correction_vector[1] - 0.15) < 1e-12, true);
  assert.equal(evaluation.computed.least_norm_provider_vector[0], 1);
  assert.equal(Math.abs(evaluation.computed.least_norm_provider_vector[1] - 0.15) < 1e-12, true);
  assert.equal(Math.abs(evaluation.computed.delta_mu_required - 0.15) < 1e-12, true);
  assert.equal(Math.abs(evaluation.computed.post_provider_root_margin - 0.1) < 1e-12, true);
  assert.equal(evaluation.checks.tangent_replacement_passed, true);
  assert.equal(evaluation.checks.least_norm_solution_feasible, true);
  assert.equal(evaluation.checks.least_norm_provider_matched, true);
  assert.equal(evaluation.checks.post_provider_root_margin_passed, true);
  assert.equal(evaluation.first_missing_object, LEAST_NORM_PROVIDER_FIRST_MISSING_OBJECT);
  assert.equal(evaluation.first_missing_field, LEAST_NORM_PROVIDER_FIRST_MISSING_FIELD);
});

test("least-norm provider witness fails when the active margin gradient has no null lift", () => {
  const evaluation = evaluateLeastNormRetainedVectorProviderWitness({
    tangent_target_vector: [1, 0],
    active_margin_gradient_vector: [0, 1],
    tangent_projector_matrix: [
      [1, 0],
      [0, 0],
    ],
    tangent_null_projector_matrix: [
      [0, 0],
      [0, 0],
    ],
    provider_acceleration_vector: [1, 0],
    dynamic_root_margin: 0.05,
    tangent_response_horizon: 0.1,
    margin_lift_response_horizon: 1,
    minimum_dynamic_root_margin_reserve: 0.1,
  });

  assert.equal(evaluation.mathematical_witness_conditions_passed, false);
  assert.equal(evaluation.accepted, false);
  assert.equal(evaluation.reason, "mathematical_witness_conditions_failed");
  assert.equal(evaluation.computed.null_gradient_norm_squared, 0);
  assert.equal(evaluation.checks.least_norm_solution_feasible, false);
  assert.equal(evaluation.checks.post_provider_root_margin_passed, false);
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
