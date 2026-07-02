import crypto from "node:crypto";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

export const SCHEMA = "oblate_spheroid_internal_tangent_authority_certificate.v0";
export const FIRST_MISSING_OBJECT = "same_record_retained_root_ledger_for_two_speed_deformation_sweep";
export const FIRST_MISSING_FIELD =
  "oblate_spheroid_two_speed_deformation_sweep.rows[*].root_ledger_status.retained_root_ledger_ref";
export const RETAINED_HISTORY_FIRST_MISSING_OBJECT = "six_held_release_seed_path_rows_for_retained_record";
export const RETAINED_HISTORY_FIRST_MISSING_FIELD = "held_release_seed_path_rows[*].retained_record_id";
export const LEAST_NORM_PROVIDER_FIRST_MISSING_OBJECT =
  "accepted_same_record_least_norm_retained_vector_provider_for_internal_tangent_authority";
export const LEAST_NORM_PROVIDER_FIRST_MISSING_FIELD =
  "oblate_spheroid_internal_tangent_authority_certificate.measured_tangent_authority_rows[*].least_norm_retained_vector_provider.accepted_vector_provider_ref";
export const RETAINED_SOLVER_VECTOR_SOURCE_TARGET_FIRST_MISSING_OBJECT =
  "same_record_retained_solver_vector_rows_for_internal_tangent_authority";
export const RETAINED_SOLVER_VECTOR_SOURCE_TARGET_FIRST_MISSING_FIELD =
  "retained_solver_vector_witness_rows[*].same_record_provider_acceleration_vector_row";
export const RETAINED_SOLVER_VECTOR_WITNESS_ROW_SCHEMA =
  "retained_solver_internal_tangent_authority_vector_witness_row.v0";
export const RETAINED_HISTORY_TANGENT_RESPONSE_WITNESS_SCHEMA =
  "retained_history_tangent_response_witness_evaluation.v0";
export const RETAINED_HISTORY_MINIMUM_GAIN_WITNESS_SCHEMA =
  "minimum_norm_retained_history_gain_witness_evaluation.v0";
export const RETAINED_HISTORY_MINIMUM_GAIN_WITNESS_ROW_SCHEMA =
  "same_record_minimum_norm_retained_history_gain_witness_row.v0";

const EPSILON = 1e-12;
const DEFAULT_VECTOR_TOLERANCE = 1e-9;

const AUTHORIZATION_FLAGS = Object.freeze([
  "accepted_same_record_evidence",
  "accepted_internal_tangent_authority",
  "retainedBranchClaim",
  "acceptedSameLevelBranchClaim",
  "preferred_configuration_claim",
  "accepted_branch_chart",
  "accepted_transition_source",
  "moving_retained_branch_certificate",
  "same_ledger_action_measure_row",
  "bounded_speed_live_ledger",
  "receiver_normal_branch_strength",
]);

export const NEGATIVE_CONTROL_REASONS = Object.freeze({
  fixture: "fixture_not_accepted_internal_tangent_authority_evidence",
  diagnostic: "diagnostic_not_accepted_internal_tangent_authority_evidence",
  target_contract: "target_contract_not_accepted_internal_tangent_authority_evidence",
  proxy_row: "proxy_row_not_accepted_internal_tangent_authority_evidence",
  proxy_ref: "proxy_ref_not_accepted_internal_tangent_authority_evidence",
  candidate_ref: "candidate_ref_not_accepted_internal_tangent_authority_evidence",
  aggregate_row: "aggregate_row_not_same_record_internal_tangent_authority_evidence",
  source_contract_shell: "source_contract_shell_not_accepted_internal_tangent_authority_evidence",
  temp_probe: "temp_probe_not_accepted_internal_tangent_authority_evidence",
  endpoint_only_row: "endpoint_only_row_not_internal_tangent_authority_evidence",
  sampled_residual: "sampled_residual_not_accepted_internal_tangent_authority_evidence",
  branch_clock_lock_reserve_certificate:
    "branch_clock_lock_reserve_certificate_not_accepted_internal_tangent_authority_evidence",
  synthetic_accepted_ref: "synthetic_accepted_ref_not_internal_tangent_authority_evidence",
  assigned_clock_lock: "assigned_branch_clock_lock_not_internal_tangent_authority_evidence",
  support_only: "support_only_not_internal_tangent_authority_evidence",
});

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function finiteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function finiteVector(value) {
  if (!Array.isArray(value)) {
    return null;
  }
  const vector = value.map((entry) => finiteNumber(entry));
  return vector.every((entry) => entry != null) ? vector : null;
}

function finiteMatrix(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }
  const rows = value.map((row) => finiteVector(row));
  if (rows.some((row) => row == null)) {
    return null;
  }
  const width = rows[0].length;
  return width > 0 && rows.every((row) => row.length === width) ? rows : null;
}

function dot(a, b) {
  return a.reduce((sum, entry, index) => sum + entry * b[index], 0);
}

function norm(a) {
  return Math.sqrt(dot(a, a));
}

function add(a, b) {
  return a.map((entry, index) => entry + b[index]);
}

function subtract(a, b) {
  return a.map((entry, index) => entry - b[index]);
}

function scale(scalar, vector) {
  return vector.map((entry) => scalar * entry);
}

function multiplyMatrixVector(matrix, vector) {
  return matrix.map((row) => dot(row, vector));
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function normalizeRows(rows) {
  return Array.isArray(rows) ? rows : [];
}

function rowJoinKey(row = {}) {
  const sourceRowId = row.source_row_id ?? row.row_id ?? null;
  if (sourceRowId) {
    return `source:${sourceRowId}`;
  }
  return `u:${finiteNumber(row.u) ?? "missing"}:v:${finiteNumber(row.v_orb) ?? "missing"}`;
}

function routeEvidenceStatus({ firstMissingObject, firstMissingField, status = "source_acquisition_blocked" }) {
  return {
    status,
    accepted: false,
    first_missing_object: firstMissingObject,
    first_missing_field: firstMissingField,
  };
}

function vectorWitnessMissingField(name) {
  return `least_norm_retained_vector_provider_witness.${name}`;
}

function retainedHistoryResponseMissingField(name) {
  return `retained_history_tangent_response_witness.${name}`;
}

function retainedHistoryMinimumGainMissingField(name) {
  return `minimum_norm_retained_history_gain_witness.${name}`;
}

function retainedHistoryMinimumGainRowMissingField(name) {
  return `minimum_norm_retained_history_gain_witness_rows[*].${name}`;
}

function addMissingField(missingFields, condition, field) {
  if (condition) {
    missingFields.push(field);
  }
}

function firstPresent(...values) {
  return values.find((value) => value != null) ?? null;
}

function outerProduct(left, right) {
  return left.map((leftEntry) => right.map((rightEntry) => leftEntry * rightEntry));
}

function matrixFrobeniusNorm(matrix) {
  return Math.sqrt(matrix.reduce(
    (sum, row) => sum + row.reduce((rowSum, entry) => rowSum + entry * entry, 0),
    0
  ));
}

export function evaluateLeastNormRetainedVectorProviderWitness(candidate = {}) {
  const tolerance = finiteNumber(candidate.vector_tolerance) ?? DEFAULT_VECTOR_TOLERANCE;
  const tangentTarget = finiteVector(candidate.tangent_target_vector ?? candidate.T);
  const marginGradient = finiteVector(candidate.active_margin_gradient_vector ?? candidate.G_mu);
  const tangentProjector = finiteMatrix(candidate.tangent_projector_matrix ?? candidate.P_T);
  const tangentNullProjector = finiteMatrix(candidate.tangent_null_projector_matrix ?? candidate.P_N);
  const provider = finiteVector(candidate.provider_acceleration_vector ?? candidate.a_provider);
  const mDyn = finiteNumber(candidate.dynamic_root_margin ?? candidate.m_dyn);
  const deltaT = finiteNumber(candidate.tangent_response_horizon ?? candidate.Delta_T);
  const deltaM = finiteNumber(candidate.margin_lift_response_horizon ?? candidate.Delta_M);
  const epsilonMu = finiteNumber(candidate.minimum_dynamic_root_margin_reserve ?? candidate.epsilon_mu);
  const missingFields = [];
  if (!tangentTarget) missingFields.push(vectorWitnessMissingField("tangent_target_vector"));
  if (!marginGradient) missingFields.push(vectorWitnessMissingField("active_margin_gradient_vector"));
  if (!tangentProjector) missingFields.push(vectorWitnessMissingField("tangent_projector_matrix"));
  if (!tangentNullProjector) missingFields.push(vectorWitnessMissingField("tangent_null_projector_matrix"));
  if (!provider) missingFields.push(vectorWitnessMissingField("provider_acceleration_vector"));
  if (mDyn == null) missingFields.push(vectorWitnessMissingField("dynamic_root_margin"));
  if (deltaT == null) missingFields.push(vectorWitnessMissingField("tangent_response_horizon"));
  if (deltaM == null) missingFields.push(vectorWitnessMissingField("margin_lift_response_horizon"));
  if (epsilonMu == null) missingFields.push(vectorWitnessMissingField("minimum_dynamic_root_margin_reserve"));

  const dimension = tangentTarget?.length ?? null;
  const matricesAreSquare =
    dimension != null &&
    tangentProjector?.length === dimension &&
    tangentNullProjector?.length === dimension &&
    tangentProjector.every((row) => row.length === dimension) &&
    tangentNullProjector.every((row) => row.length === dimension);
  const vectorsMatchDimension =
    dimension != null &&
    marginGradient?.length === dimension &&
    provider?.length === dimension;
  if (missingFields.length === 0 && (!matricesAreSquare || !vectorsMatchDimension)) {
    missingFields.push(vectorWitnessMissingField("dimension_consistency"));
  }

  if (missingFields.length > 0) {
    return {
      schema: "least_norm_retained_vector_provider_witness_evaluation.v0",
      accepted: false,
      mathematical_witness_conditions_passed: false,
      reason: "least_norm_vector_witness_input_missing_or_dimensionally_inconsistent",
      missing_fields: missingFields,
      first_missing_object: LEAST_NORM_PROVIDER_FIRST_MISSING_OBJECT,
      first_missing_field: missingFields[0],
    };
  }

  const projectedProvider = multiplyMatrixVector(tangentProjector, provider);
  const tangentReplacementErrorNorm = norm(subtract(projectedProvider, tangentTarget));
  const tangentReplacementPassed = tangentReplacementErrorNorm <= tolerance;
  const tangentTargetNorm = norm(tangentTarget);
  const deltaMuRequired = Math.max(0, epsilonMu + deltaT * tangentTargetNorm - mDyn);
  const requiredMarginProjection =
    deltaM <= EPSILON
      ? (deltaMuRequired <= tolerance ? 0 : null)
      : deltaMuRequired / deltaM;
  const nullGradient = multiplyMatrixVector(tangentNullProjector, marginGradient);
  const nullGradientNormSquared = dot(nullGradient, nullGradient);
  const tangentMarginProjection = dot(tangentTarget, marginGradient);
  const leastNormFeasible =
    requiredMarginProjection == null
      ? false
      : nullGradientNormSquared > EPSILON ||
        tangentMarginProjection + tolerance >= requiredMarginProjection;
  const nullScale =
    leastNormFeasible && requiredMarginProjection != null && nullGradientNormSquared > EPSILON
      ? Math.max(0, requiredMarginProjection - tangentMarginProjection) / nullGradientNormSquared
      : 0;
  const leastNormNullCorrection = leastNormFeasible
    ? scale(nullScale, nullGradient)
    : null;
  const leastNormProvider = leastNormNullCorrection
    ? add(tangentTarget, leastNormNullCorrection)
    : null;
  const leastNormProviderErrorNorm = leastNormProvider
    ? norm(subtract(provider, leastNormProvider))
    : null;
  const leastNormProviderMatched =
    leastNormProviderErrorNorm != null && leastNormProviderErrorNorm <= tolerance;
  const postProviderRootMargin =
    mDyn - deltaT * norm(projectedProvider) + deltaM * dot(provider, marginGradient);
  const postProviderRootMarginPassed = postProviderRootMargin + tolerance >= epsilonMu;
  const mathematicalWitnessConditionsPassed =
    tangentReplacementPassed &&
    leastNormFeasible &&
    leastNormProviderMatched &&
    postProviderRootMarginPassed;

  return {
    schema: "least_norm_retained_vector_provider_witness_evaluation.v0",
    accepted: false,
    mathematical_witness_conditions_passed: mathematicalWitnessConditionsPassed,
    reason: mathematicalWitnessConditionsPassed
      ? "mathematical_witness_passes_but_same_record_acceptance_blocked"
      : "mathematical_witness_conditions_failed",
    variables: {
      dynamic_root_margin: mDyn,
      tangent_response_horizon: deltaT,
      margin_lift_response_horizon: deltaM,
      minimum_dynamic_root_margin_reserve: epsilonMu,
      vector_tolerance: tolerance,
    },
    computed: {
      tangent_target_norm: tangentTargetNorm,
      delta_mu_required: deltaMuRequired,
      required_margin_projection: requiredMarginProjection,
      tangent_margin_projection: tangentMarginProjection,
      null_gradient_vector: nullGradient,
      null_gradient_norm_squared: nullGradientNormSquared,
      least_norm_null_correction_vector: leastNormNullCorrection,
      least_norm_provider_vector: leastNormProvider,
      projected_provider_tangent_vector: projectedProvider,
      tangent_replacement_error_norm: tangentReplacementErrorNorm,
      least_norm_provider_error_norm: leastNormProviderErrorNorm,
      post_provider_root_margin: postProviderRootMargin,
    },
    checks: {
      tangent_replacement_passed: tangentReplacementPassed,
      least_norm_solution_feasible: leastNormFeasible,
      least_norm_provider_matched: leastNormProviderMatched,
      post_provider_root_margin_passed: postProviderRootMarginPassed,
    },
    first_missing_object: LEAST_NORM_PROVIDER_FIRST_MISSING_OBJECT,
    first_missing_field: LEAST_NORM_PROVIDER_FIRST_MISSING_FIELD,
    acceptance_requirements: [
      "accepted_same_record_least_norm_provider_acceleration_vector_row",
      "accepted_same_record_retained_root_ledger",
      "accepted_same_record_action_closure_row",
      "post_provider_root_margin_row",
    ],
  };
}

export function evaluateRetainedHistoryTangentResponseWitness(candidate = {}) {
  const tolerance = finiteNumber(candidate.vector_tolerance) ?? DEFAULT_VECTOR_TOLERANCE;
  const tangentTarget = finiteVector(candidate.tangent_target_vector ?? candidate.T);
  const tangentPositionError = finiteVector(candidate.tangent_position_error_vector ?? candidate.e_x);
  const tangentVelocityError = finiteVector(candidate.tangent_velocity_error_vector ?? candidate.e_v);
  const positionGainMatrix = finiteMatrix(candidate.retained_history_position_gain_matrix ?? candidate.K_x);
  const velocityGainMatrix = finiteMatrix(candidate.retained_history_velocity_gain_matrix ?? candidate.K_v);
  const tangentProjector = finiteMatrix(candidate.tangent_projector_matrix ?? candidate.P_T);
  const tangentNullProjector = finiteMatrix(candidate.tangent_null_projector_matrix ?? candidate.P_N);
  const activeMarginGradient = finiteVector(candidate.active_margin_gradient_vector ?? candidate.G_mu);
  const mDyn = finiteNumber(candidate.dynamic_root_margin ?? candidate.m_dyn);
  const deltaT = finiteNumber(candidate.tangent_response_horizon ?? candidate.Delta_T);
  const deltaM = finiteNumber(candidate.margin_lift_response_horizon ?? candidate.Delta_M);
  const epsilonMu = finiteNumber(candidate.minimum_dynamic_root_margin_reserve ?? candidate.epsilon_mu);
  const missingFields = [];

  if (!tangentTarget) missingFields.push(retainedHistoryResponseMissingField("tangent_target_vector"));
  if (!tangentPositionError) missingFields.push(retainedHistoryResponseMissingField("tangent_position_error_vector"));
  if (!tangentVelocityError) missingFields.push(retainedHistoryResponseMissingField("tangent_velocity_error_vector"));
  if (!positionGainMatrix) missingFields.push(retainedHistoryResponseMissingField("retained_history_position_gain_matrix"));
  if (!velocityGainMatrix) missingFields.push(retainedHistoryResponseMissingField("retained_history_velocity_gain_matrix"));
  if (!tangentProjector) missingFields.push(retainedHistoryResponseMissingField("tangent_projector_matrix"));
  if (!tangentNullProjector) missingFields.push(retainedHistoryResponseMissingField("tangent_null_projector_matrix"));
  if (!activeMarginGradient) missingFields.push(retainedHistoryResponseMissingField("active_margin_gradient_vector"));
  if (mDyn == null) missingFields.push(retainedHistoryResponseMissingField("dynamic_root_margin"));
  if (deltaT == null) missingFields.push(retainedHistoryResponseMissingField("tangent_response_horizon"));
  if (deltaM == null) missingFields.push(retainedHistoryResponseMissingField("margin_lift_response_horizon"));
  if (epsilonMu == null) {
    missingFields.push(retainedHistoryResponseMissingField("minimum_dynamic_root_margin_reserve"));
  }

  const dimension = tangentTarget?.length ?? null;
  const matricesMatchDimension =
    dimension != null &&
    positionGainMatrix?.length === dimension &&
    velocityGainMatrix?.length === dimension &&
    tangentProjector?.length === dimension &&
    tangentNullProjector?.length === dimension &&
    positionGainMatrix.every((row) => row.length === dimension) &&
    velocityGainMatrix.every((row) => row.length === dimension) &&
    tangentProjector.every((row) => row.length === dimension) &&
    tangentNullProjector.every((row) => row.length === dimension);
  const vectorsMatchDimension =
    dimension != null &&
    tangentPositionError?.length === dimension &&
    tangentVelocityError?.length === dimension &&
    activeMarginGradient?.length === dimension;
  if (missingFields.length === 0 && (!matricesMatchDimension || !vectorsMatchDimension)) {
    missingFields.push(retainedHistoryResponseMissingField("dimension_consistency"));
  }

  if (missingFields.length > 0) {
    return {
      schema: RETAINED_HISTORY_TANGENT_RESPONSE_WITNESS_SCHEMA,
      accepted: false,
      mathematical_response_conditions_passed: false,
      reason: "retained_history_tangent_response_input_missing_or_dimensionally_inconsistent",
      missing_fields: missingFields,
      first_missing_object: RETAINED_HISTORY_FIRST_MISSING_OBJECT,
      first_missing_field: missingFields[0],
    };
  }

  const positionResponse = multiplyMatrixVector(positionGainMatrix, tangentPositionError);
  const velocityResponse = multiplyMatrixVector(velocityGainMatrix, tangentVelocityError);
  const rawRetainedHistoryResponse = scale(-1, add(positionResponse, velocityResponse));
  const tangentResponse = multiplyMatrixVector(tangentProjector, rawRetainedHistoryResponse);
  const deltaMuRequired = Math.max(0, epsilonMu + deltaT * norm(tangentResponse) - mDyn);
  const requiredMarginProjection =
    deltaM <= EPSILON
      ? (deltaMuRequired <= tolerance ? 0 : null)
      : deltaMuRequired / deltaM;
  const nullGradient = multiplyMatrixVector(tangentNullProjector, activeMarginGradient);
  const nullGradientNormSquared = dot(nullGradient, nullGradient);
  const tangentMarginProjection = dot(tangentResponse, activeMarginGradient);
  const leastNormFeasible =
    requiredMarginProjection == null
      ? false
      : nullGradientNormSquared > EPSILON ||
        tangentMarginProjection + tolerance >= requiredMarginProjection;
  const nullScale =
    leastNormFeasible && requiredMarginProjection != null && nullGradientNormSquared > EPSILON
      ? Math.max(0, requiredMarginProjection - tangentMarginProjection) / nullGradientNormSquared
      : 0;
  const leastNormNullCorrection = leastNormFeasible ? scale(nullScale, nullGradient) : [0];
  const providerVector = leastNormNullCorrection.length === tangentResponse.length
    ? add(tangentResponse, leastNormNullCorrection)
    : tangentResponse;
  const leastNormEvaluation = evaluateLeastNormRetainedVectorProviderWitness({
    tangent_target_vector: tangentTarget,
    active_margin_gradient_vector: activeMarginGradient,
    tangent_projector_matrix: tangentProjector,
    tangent_null_projector_matrix: tangentNullProjector,
    provider_acceleration_vector: providerVector,
    dynamic_root_margin: mDyn,
    tangent_response_horizon: deltaT,
    margin_lift_response_horizon: deltaM,
    minimum_dynamic_root_margin_reserve: epsilonMu,
    vector_tolerance: tolerance,
  });
  const tangentResponseErrorNorm = norm(subtract(tangentResponse, tangentTarget));
  const tangentResponseMatchesTarget = tangentResponseErrorNorm <= tolerance;
  const mathematicalResponseConditionsPassed =
    tangentResponseMatchesTarget && leastNormEvaluation.mathematical_witness_conditions_passed === true;

  return {
    schema: RETAINED_HISTORY_TANGENT_RESPONSE_WITNESS_SCHEMA,
    accepted: false,
    mathematical_response_conditions_passed: mathematicalResponseConditionsPassed,
    reason: mathematicalResponseConditionsPassed
      ? "retained_history_tangent_response_passes_mathematically_but_acceptance_blocked"
      : "retained_history_tangent_response_conditions_failed",
    equation:
      "a_RH = -P_T(K_x e_x + K_v e_v); a_provider^RH = a_RH + n_*",
    variables: {
      vector_tolerance: tolerance,
      dynamic_root_margin: mDyn,
      tangent_response_horizon: deltaT,
      margin_lift_response_horizon: deltaM,
      minimum_dynamic_root_margin_reserve: epsilonMu,
    },
    response_vectors: {
      tangent_target_vector: tangentTarget,
      tangent_position_error_vector: tangentPositionError,
      tangent_velocity_error_vector: tangentVelocityError,
      retained_history_position_gain_matrix: positionGainMatrix,
      retained_history_velocity_gain_matrix: velocityGainMatrix,
      raw_retained_history_response_vector: rawRetainedHistoryResponse,
      tangent_retained_history_response_vector: tangentResponse,
      least_norm_null_correction_vector: leastNormNullCorrection,
      provider_acceleration_vector: providerVector,
    },
    computed: {
      tangent_response_error_norm: tangentResponseErrorNorm,
      delta_mu_required: deltaMuRequired,
      required_margin_projection: requiredMarginProjection,
      tangent_margin_projection: tangentMarginProjection,
      null_gradient_vector: nullGradient,
      null_gradient_norm_squared: nullGradientNormSquared,
    },
    checks: {
      tangent_response_matches_target: tangentResponseMatchesTarget,
      least_norm_solution_feasible: leastNormFeasible,
      post_provider_root_margin_passed:
        leastNormEvaluation.checks?.post_provider_root_margin_passed === true,
      least_norm_provider_matched:
        leastNormEvaluation.checks?.least_norm_provider_matched === true,
    },
    least_norm_provider_evaluation: leastNormEvaluation,
    first_missing_object: RETAINED_HISTORY_FIRST_MISSING_OBJECT,
    first_missing_field: RETAINED_HISTORY_FIRST_MISSING_FIELD,
    acceptance_requirements: [
      "same_record_retained_path_error_row",
      "same_record_retained_history_response_matrix_row",
      "same_record_active_causal_margin_gradient_row",
      "same_record_retained_root_ledger",
      "same_record_action_closure_row",
      "accepted_provider_provenance",
    ],
  };
}

export function evaluateMinimumNormRetainedHistoryGainWitness(candidate = {}) {
  const tolerance = finiteNumber(candidate.vector_tolerance) ?? DEFAULT_VECTOR_TOLERANCE;
  const tangentTarget = finiteVector(candidate.tangent_target_vector ?? candidate.T);
  const tangentPositionError = finiteVector(candidate.tangent_position_error_vector ?? candidate.e_x);
  const tangentVelocityError = finiteVector(candidate.tangent_velocity_error_vector ?? candidate.e_v);
  const tangentProjector = finiteMatrix(candidate.tangent_projector_matrix ?? candidate.P_T);
  const tangentNullProjector = finiteMatrix(candidate.tangent_null_projector_matrix ?? candidate.P_N);
  const activeMarginGradient = finiteVector(candidate.active_margin_gradient_vector ?? candidate.G_mu);
  const mDyn = finiteNumber(candidate.dynamic_root_margin ?? candidate.m_dyn);
  const deltaT = finiteNumber(candidate.tangent_response_horizon ?? candidate.Delta_T);
  const deltaM = finiteNumber(candidate.margin_lift_response_horizon ?? candidate.Delta_M);
  const epsilonMu = finiteNumber(candidate.minimum_dynamic_root_margin_reserve ?? candidate.epsilon_mu);
  const missingFields = [];

  if (!tangentTarget) missingFields.push(retainedHistoryMinimumGainMissingField("tangent_target_vector"));
  if (!tangentPositionError) {
    missingFields.push(retainedHistoryMinimumGainMissingField("tangent_position_error_vector"));
  }
  if (!tangentVelocityError) {
    missingFields.push(retainedHistoryMinimumGainMissingField("tangent_velocity_error_vector"));
  }
  if (!tangentProjector) missingFields.push(retainedHistoryMinimumGainMissingField("tangent_projector_matrix"));
  if (!tangentNullProjector) {
    missingFields.push(retainedHistoryMinimumGainMissingField("tangent_null_projector_matrix"));
  }
  if (!activeMarginGradient) {
    missingFields.push(retainedHistoryMinimumGainMissingField("active_margin_gradient_vector"));
  }
  if (mDyn == null) missingFields.push(retainedHistoryMinimumGainMissingField("dynamic_root_margin"));
  if (deltaT == null) missingFields.push(retainedHistoryMinimumGainMissingField("tangent_response_horizon"));
  if (deltaM == null) missingFields.push(retainedHistoryMinimumGainMissingField("margin_lift_response_horizon"));
  if (epsilonMu == null) {
    missingFields.push(retainedHistoryMinimumGainMissingField("minimum_dynamic_root_margin_reserve"));
  }

  const dimension = tangentTarget?.length ?? null;
  const matricesMatchDimension =
    dimension != null &&
    tangentProjector?.length === dimension &&
    tangentNullProjector?.length === dimension &&
    tangentProjector.every((row) => row.length === dimension) &&
    tangentNullProjector.every((row) => row.length === dimension);
  const vectorsMatchDimension =
    dimension != null &&
    tangentPositionError?.length === dimension &&
    tangentVelocityError?.length === dimension &&
    activeMarginGradient?.length === dimension;
  if (missingFields.length === 0 && (!matricesMatchDimension || !vectorsMatchDimension)) {
    missingFields.push(retainedHistoryMinimumGainMissingField("dimension_consistency"));
  }

  if (missingFields.length > 0) {
    return {
      schema: RETAINED_HISTORY_MINIMUM_GAIN_WITNESS_SCHEMA,
      accepted: false,
      mathematical_gain_conditions_passed: false,
      reason: "minimum_norm_retained_history_gain_input_missing_or_dimensionally_inconsistent",
      missing_fields: missingFields,
      first_missing_object: RETAINED_HISTORY_FIRST_MISSING_OBJECT,
      first_missing_field: missingFields[0],
    };
  }

  const combinedErrorNormSquared = dot(tangentPositionError, tangentPositionError) +
    dot(tangentVelocityError, tangentVelocityError);
  if (combinedErrorNormSquared <= EPSILON) {
    return {
      schema: RETAINED_HISTORY_MINIMUM_GAIN_WITNESS_SCHEMA,
      accepted: false,
      mathematical_gain_conditions_passed: false,
      reason: "minimum_norm_retained_history_gain_requires_nonzero_retained_path_error",
      missing_fields: [retainedHistoryMinimumGainMissingField("nonzero_combined_retained_path_error")],
      computed: {
        combined_error_norm_squared: combinedErrorNormSquared,
      },
      first_missing_object: RETAINED_HISTORY_FIRST_MISSING_OBJECT,
      first_missing_field: retainedHistoryMinimumGainMissingField("nonzero_combined_retained_path_error"),
    };
  }

  const scaledTangentTarget = scale(-1 / combinedErrorNormSquared, tangentTarget);
  const positionGainMatrix = outerProduct(scaledTangentTarget, tangentPositionError);
  const velocityGainMatrix = outerProduct(scaledTangentTarget, tangentVelocityError);
  const responseEvaluation = evaluateRetainedHistoryTangentResponseWitness({
    tangent_target_vector: tangentTarget,
    tangent_position_error_vector: tangentPositionError,
    tangent_velocity_error_vector: tangentVelocityError,
    retained_history_position_gain_matrix: positionGainMatrix,
    retained_history_velocity_gain_matrix: velocityGainMatrix,
    tangent_projector_matrix: tangentProjector,
    tangent_null_projector_matrix: tangentNullProjector,
    active_margin_gradient_vector: activeMarginGradient,
    dynamic_root_margin: mDyn,
    tangent_response_horizon: deltaT,
    margin_lift_response_horizon: deltaM,
    minimum_dynamic_root_margin_reserve: epsilonMu,
    vector_tolerance: tolerance,
  });
  const positionGainNorm = matrixFrobeniusNorm(positionGainMatrix);
  const velocityGainNorm = matrixFrobeniusNorm(velocityGainMatrix);
  const combinedGainFrobeniusNorm = Math.sqrt(positionGainNorm * positionGainNorm + velocityGainNorm * velocityGainNorm);
  const mathematicalGainConditionsPassed =
    responseEvaluation.mathematical_response_conditions_passed === true;

  return {
    schema: RETAINED_HISTORY_MINIMUM_GAIN_WITNESS_SCHEMA,
    accepted: false,
    mathematical_gain_conditions_passed: mathematicalGainConditionsPassed,
    reason: mathematicalGainConditionsPassed
      ? "minimum_norm_retained_history_gain_passes_mathematically_but_acceptance_blocked"
      : "minimum_norm_retained_history_gain_conditions_failed",
    equation:
      "K_x^*=-T e_x^T/(||e_x||^2+||e_v||^2), K_v^*=-T e_v^T/(||e_x||^2+||e_v||^2)",
    response_equation:
      "a_RH^*=-P_T(K_x^* e_x+K_v^* e_v)",
    variables: {
      vector_tolerance: tolerance,
      dynamic_root_margin: mDyn,
      tangent_response_horizon: deltaT,
      margin_lift_response_horizon: deltaM,
      minimum_dynamic_root_margin_reserve: epsilonMu,
    },
    computed: {
      combined_error_norm_squared: combinedErrorNormSquared,
      combined_gain_frobenius_norm: combinedGainFrobeniusNorm,
      position_gain_frobenius_norm: positionGainNorm,
      velocity_gain_frobenius_norm: velocityGainNorm,
    },
    response_matrices: {
      retained_history_position_gain_matrix: positionGainMatrix,
      retained_history_velocity_gain_matrix: velocityGainMatrix,
    },
    response_evaluation: responseEvaluation,
    first_missing_object: RETAINED_HISTORY_FIRST_MISSING_OBJECT,
    first_missing_field: RETAINED_HISTORY_FIRST_MISSING_FIELD,
    acceptance_requirements: [
      "same_record_retained_path_error_row",
      "accepted_minimum_norm_retained_history_gain_row",
      "same_record_active_causal_margin_gradient_row",
      "same_record_retained_root_ledger",
      "same_record_action_closure_row",
      "accepted_provider_provenance",
    ],
  };
}

export function evaluateMinimumNormRetainedHistoryGainWitnessRow(row = {}) {
  const pathErrorRow = row.same_record_retained_path_error_row ?? {};
  const tangentRow = row.retained_solver_tangent_target_vector_row ?? {};
  const marginRow = row.active_causal_margin_gradient_vector_row ?? {};
  const postProviderRow = row.post_provider_root_margin_row ?? {};
  const closureRows = row.same_record_closure_rows ?? {};
  const missingFields = [];

  addMissingField(
    missingFields,
    row.same_record_retained_path_error_row == null,
    retainedHistoryMinimumGainRowMissingField("same_record_retained_path_error_row")
  );
  addMissingField(
    missingFields,
    row.retained_solver_tangent_target_vector_row == null,
    retainedHistoryMinimumGainRowMissingField("retained_solver_tangent_target_vector_row")
  );
  addMissingField(
    missingFields,
    row.active_causal_margin_gradient_vector_row == null,
    retainedHistoryMinimumGainRowMissingField("active_causal_margin_gradient_vector_row")
  );
  addMissingField(
    missingFields,
    row.post_provider_root_margin_row == null,
    retainedHistoryMinimumGainRowMissingField("post_provider_root_margin_row")
  );
  addMissingField(
    missingFields,
    row.same_record_closure_rows == null,
    retainedHistoryMinimumGainRowMissingField("same_record_closure_rows")
  );

  const retainedRecordRefs = [
    row.retained_record_id,
    pathErrorRow.retained_record_id,
    tangentRow.retained_record_id,
    marginRow.retained_record_id,
    postProviderRow.retained_record_id,
    closureRows.retained_record_id,
  ].filter((ref) => ref != null);
  const uniqueRetainedRecordRefs = [...new Set(retainedRecordRefs)];
  const retainedRecordId = uniqueRetainedRecordRefs.length === 1 ? uniqueRetainedRecordRefs[0] : null;
  const sameRecordBindingPassed = retainedRecordRefs.length >= 5 && uniqueRetainedRecordRefs.length === 1;
  addMissingField(
    missingFields,
    !sameRecordBindingPassed,
    retainedHistoryMinimumGainRowMissingField("same_record_retained_record_id_binding")
  );

  const sourceRowRefs = [
    row.source_row_id,
    pathErrorRow.source_row_id,
    tangentRow.source_row_id,
  ].filter((ref) => ref != null);
  const sourceRowBindingPassed = sourceRowRefs.length >= 2 && new Set(sourceRowRefs).size === 1;
  addMissingField(
    missingFields,
    !sourceRowBindingPassed,
    retainedHistoryMinimumGainRowMissingField("same_source_row_id_binding")
  );

  const closureBindingPassed =
    closureRows.same_record_retained_root_ledger != null &&
    closureRows.same_record_action_closure_row != null &&
    closureRows.same_record_wake_history_ref != null &&
    closureRows.same_record_path_history_ref != null;
  addMissingField(
    missingFields,
    !closureBindingPassed,
    retainedHistoryMinimumGainRowMissingField("same_record_closure_rows")
  );

  const tangentTargetVector = firstPresent(tangentRow.tangent_target_vector, row.tangent_target_vector);
  const tangentPositionErrorVector = firstPresent(
    pathErrorRow.tangent_position_error_vector,
    row.tangent_position_error_vector
  );
  const tangentVelocityErrorVector = firstPresent(
    pathErrorRow.tangent_velocity_error_vector,
    row.tangent_velocity_error_vector
  );
  const tangentProjectorMatrix = firstPresent(tangentRow.tangent_projector_matrix, row.tangent_projector_matrix);
  const tangentNullProjectorMatrix = firstPresent(
    marginRow.tangent_null_projector_matrix,
    row.tangent_null_projector_matrix
  );
  const activeMarginGradientVector = firstPresent(
    marginRow.active_margin_gradient_vector,
    row.active_margin_gradient_vector
  );
  const dynamicRootMargin = firstPresent(
    marginRow.active_margin_value,
    postProviderRow.dynamic_root_margin,
    row.dynamic_root_margin
  );
  const tangentResponseHorizon = firstPresent(
    postProviderRow.tangent_response_horizon,
    row.tangent_response_horizon
  );
  const marginLiftResponseHorizon = firstPresent(
    postProviderRow.margin_lift_response_horizon,
    row.margin_lift_response_horizon
  );
  const minimumDynamicRootMarginReserve = firstPresent(
    postProviderRow.minimum_dynamic_root_margin_reserve,
    row.minimum_dynamic_root_margin_reserve
  );
  const evaluation = evaluateMinimumNormRetainedHistoryGainWitness({
    tangent_target_vector: tangentTargetVector,
    tangent_position_error_vector: tangentPositionErrorVector,
    tangent_velocity_error_vector: tangentVelocityErrorVector,
    tangent_projector_matrix: tangentProjectorMatrix,
    tangent_null_projector_matrix: tangentNullProjectorMatrix,
    active_margin_gradient_vector: activeMarginGradientVector,
    dynamic_root_margin: dynamicRootMargin,
    tangent_response_horizon: tangentResponseHorizon,
    margin_lift_response_horizon: marginLiftResponseHorizon,
    minimum_dynamic_root_margin_reserve: minimumDynamicRootMarginReserve,
    vector_tolerance: row.vector_tolerance,
  });
  const mathematicalGainConditionsPassed =
    missingFields.length === 0 &&
    evaluation.mathematical_gain_conditions_passed === true &&
    closureBindingPassed &&
    sameRecordBindingPassed &&
    sourceRowBindingPassed;

  return {
    schema: RETAINED_HISTORY_MINIMUM_GAIN_WITNESS_ROW_SCHEMA,
    row_id: row.row_id ?? null,
    source_row_id: row.source_row_id ?? pathErrorRow.source_row_id ?? tangentRow.source_row_id ?? null,
    retained_record_id: retainedRecordId,
    time: firstPresent(row.time, pathErrorRow.time, tangentRow.time),
    particle_slot_order: Array.isArray(pathErrorRow.particle_slot_order)
      ? [...pathErrorRow.particle_slot_order]
      : (Array.isArray(tangentRow.particle_slot_order) ? [...tangentRow.particle_slot_order] : null),
    source_row_schema: row.schema ?? null,
    source_authority_class: row.authority_class ?? "same_record_minimum_norm_retained_history_gain_source_unclassified",
    same_record_binding_passed: sameRecordBindingPassed,
    source_row_binding_passed: sourceRowBindingPassed,
    closure_binding_passed: closureBindingPassed,
    required_rows_present: missingFields.length === 0,
    missing_fields: missingFields,
    evaluator_schema: RETAINED_HISTORY_MINIMUM_GAIN_WITNESS_SCHEMA,
    evaluation,
    mathematical_gain_conditions_passed: mathematicalGainConditionsPassed,
    source_acquisition_status: mathematicalGainConditionsPassed
      ? "same_record_minimum_norm_retained_history_gain_mathematical_pass_acceptance_blocked"
      : "same_record_minimum_norm_retained_history_gain_failed_or_incomplete",
    accepted_minimum_gain_ref: row.accepted_minimum_gain_ref ?? null,
    accepted: false,
    acceptance_boundary:
      "mathematical same-record minimum-gain witness still requires accepted retained path history, retained-root ledger, action closure, wake history, and provider provenance before it can replace the assigned branch-clock lock",
    first_missing_object: mathematicalGainConditionsPassed
      ? RETAINED_HISTORY_FIRST_MISSING_OBJECT
      : RETAINED_HISTORY_FIRST_MISSING_OBJECT,
    first_missing_field: mathematicalGainConditionsPassed
      ? RETAINED_HISTORY_FIRST_MISSING_FIELD
      : (missingFields[0] ?? RETAINED_HISTORY_FIRST_MISSING_FIELD),
  };
}

export function evaluateRetainedSolverVectorProviderWitnessRow(row = {}) {
  const tangentRow = row.retained_solver_tangent_target_vector_row ?? {};
  const marginRow = row.active_causal_margin_gradient_vector_row ?? {};
  const providerRow = row.same_record_provider_acceleration_vector_row ?? {};
  const postProviderRow = row.post_provider_root_margin_row ?? {};
  const closureRows = row.same_record_closure_rows ?? {};
  const missingFields = [];

  addMissingField(
    missingFields,
    row.retained_solver_tangent_target_vector_row == null,
    "retained_solver_vector_witness_rows[*].retained_solver_tangent_target_vector_row"
  );
  addMissingField(
    missingFields,
    row.active_causal_margin_gradient_vector_row == null,
    "retained_solver_vector_witness_rows[*].active_causal_margin_gradient_vector_row"
  );
  addMissingField(
    missingFields,
    row.same_record_provider_acceleration_vector_row == null,
    RETAINED_SOLVER_VECTOR_SOURCE_TARGET_FIRST_MISSING_FIELD
  );
  addMissingField(
    missingFields,
    row.post_provider_root_margin_row == null,
    "retained_solver_vector_witness_rows[*].post_provider_root_margin_row"
  );
  addMissingField(
    missingFields,
    row.same_record_closure_rows == null,
    "retained_solver_vector_witness_rows[*].same_record_closure_rows"
  );

  const retainedRecordRefs = [
    row.retained_record_id,
    tangentRow.retained_record_id,
    marginRow.retained_record_id,
    providerRow.retained_record_id,
    postProviderRow.retained_record_id,
    closureRows.retained_record_id,
  ].filter((ref) => ref != null);
  const uniqueRetainedRecordRefs = [...new Set(retainedRecordRefs)];
  const retainedRecordId = uniqueRetainedRecordRefs.length === 1 ? uniqueRetainedRecordRefs[0] : null;
  const sameRecordBindingPassed = retainedRecordRefs.length >= 5 && uniqueRetainedRecordRefs.length === 1;
  addMissingField(
    missingFields,
    !sameRecordBindingPassed,
    "retained_solver_vector_witness_rows[*].same_record_retained_record_id_binding"
  );

  const closureBindingPassed =
    closureRows.same_record_retained_root_ledger != null &&
    closureRows.same_record_action_closure_row != null &&
    closureRows.same_record_wake_history_ref != null &&
    closureRows.same_record_path_history_ref != null;
  addMissingField(
    missingFields,
    !closureBindingPassed,
    "retained_solver_vector_witness_rows[*].same_record_closure_rows"
  );

  const tangentTargetVector = firstPresent(tangentRow.tangent_target_vector, row.tangent_target_vector);
  const activeMarginGradientVector = firstPresent(
    marginRow.active_margin_gradient_vector,
    row.active_margin_gradient_vector
  );
  const tangentProjectorMatrix = firstPresent(tangentRow.tangent_projector_matrix, row.tangent_projector_matrix);
  const tangentNullProjectorMatrix = firstPresent(
    marginRow.tangent_null_projector_matrix,
    row.tangent_null_projector_matrix
  );
  const providerAccelerationVector = firstPresent(
    providerRow.provider_acceleration_vector,
    row.provider_acceleration_vector
  );
  const dynamicRootMargin = firstPresent(
    marginRow.active_margin_value,
    postProviderRow.dynamic_root_margin,
    row.dynamic_root_margin
  );
  const tangentResponseHorizon = firstPresent(
    postProviderRow.tangent_response_horizon,
    row.tangent_response_horizon
  );
  const marginLiftResponseHorizon = firstPresent(
    postProviderRow.margin_lift_response_horizon,
    row.margin_lift_response_horizon
  );
  const minimumDynamicRootMarginReserve = firstPresent(
    postProviderRow.minimum_dynamic_root_margin_reserve,
    row.minimum_dynamic_root_margin_reserve
  );
  const evaluation = evaluateLeastNormRetainedVectorProviderWitness({
    tangent_target_vector: tangentTargetVector,
    active_margin_gradient_vector: activeMarginGradientVector,
    tangent_projector_matrix: tangentProjectorMatrix,
    tangent_null_projector_matrix: tangentNullProjectorMatrix,
    provider_acceleration_vector: providerAccelerationVector,
    dynamic_root_margin: dynamicRootMargin,
    tangent_response_horizon: tangentResponseHorizon,
    margin_lift_response_horizon: marginLiftResponseHorizon,
    minimum_dynamic_root_margin_reserve: minimumDynamicRootMarginReserve,
    vector_tolerance: row.vector_tolerance,
  });
  const mathematicalWitnessConditionsPassed =
    missingFields.length === 0 &&
    evaluation.mathematical_witness_conditions_passed === true &&
    closureBindingPassed &&
    sameRecordBindingPassed;

  return {
    schema: RETAINED_SOLVER_VECTOR_WITNESS_ROW_SCHEMA,
    row_id: row.row_id ?? null,
    source_row_id: row.source_row_id ?? tangentRow.source_row_id ?? null,
    retained_record_id: retainedRecordId,
    time: firstPresent(row.time, tangentRow.time),
    particle_slot_order: Array.isArray(tangentRow.particle_slot_order)
      ? [...tangentRow.particle_slot_order]
      : null,
    source_row_schema: row.schema ?? null,
    source_authority_class: row.authority_class ?? "same_record_retained_solver_vector_witness_source_unclassified",
    same_record_binding_passed: sameRecordBindingPassed,
    closure_binding_passed: closureBindingPassed,
    required_rows_present: missingFields.length === 0,
    missing_fields: missingFields,
    evaluator_schema: "least_norm_retained_vector_provider_witness_evaluation.v0",
    evaluation,
    mathematical_witness_conditions_passed: mathematicalWitnessConditionsPassed,
    source_acquisition_status: mathematicalWitnessConditionsPassed
      ? "same_record_retained_solver_vector_witness_mathematical_pass_acceptance_blocked"
      : "same_record_retained_solver_vector_witness_failed_or_incomplete",
    accepted_vector_provider_ref: providerRow.accepted_provider_ref ?? null,
    accepted: false,
    acceptance_boundary:
      "mathematical same-record vector witness still requires accepted retained-root ledger, action closure, and provider provenance before it can replace the assigned branch-clock lock",
    first_missing_object: mathematicalWitnessConditionsPassed
      ? LEAST_NORM_PROVIDER_FIRST_MISSING_OBJECT
      : RETAINED_SOLVER_VECTOR_SOURCE_TARGET_FIRST_MISSING_OBJECT,
    first_missing_field: mathematicalWitnessConditionsPassed
      ? LEAST_NORM_PROVIDER_FIRST_MISSING_FIELD
      : (missingFields[0] ?? RETAINED_SOLVER_VECTOR_SOURCE_TARGET_FIRST_MISSING_FIELD),
  };
}

function makeNormalizedDiagnosticVectorWitness({
  branchClockRms,
  dynamicRootMargin,
  tangentResponseHorizon,
  marginLiftResponseHorizon,
  minimumReserve,
}) {
  const missingFields = [];
  if (branchClockRms == null) missingFields.push("branch_clock_lock_rms_acceleration");
  if (dynamicRootMargin == null) missingFields.push("dynamic_root_margin");
  if (tangentResponseHorizon == null) missingFields.push("tangent_response_horizon");
  if (marginLiftResponseHorizon == null) missingFields.push("margin_lift_response_horizon");
  if (minimumReserve == null) missingFields.push("minimum_dynamic_root_margin_reserve");
  if (missingFields.length > 0) {
    return {
      schema: "oblate_spheroid_internal_tangent_authority_normalized_diagnostic_witness.v0",
      scope_note: "diagnostic_normalized_basis_not_retained_solver_vector_evidence",
      construction_status: "missing_scalar_inputs",
      missing_fields: missingFields,
      mathematical_witness_conditions_passed: false,
      accepted: false,
      first_missing_object: LEAST_NORM_PROVIDER_FIRST_MISSING_OBJECT,
      first_missing_field: LEAST_NORM_PROVIDER_FIRST_MISSING_FIELD,
    };
  }

  const deltaMuRequired = Math.max(0, minimumReserve + tangentResponseHorizon * branchClockRms - dynamicRootMargin);
  const requiredNullLift =
    marginLiftResponseHorizon <= EPSILON
      ? (deltaMuRequired <= DEFAULT_VECTOR_TOLERANCE ? 0 : null)
      : deltaMuRequired / marginLiftResponseHorizon;
  const tangentTarget = [branchClockRms, 0];
  const activeMarginGradient = [0, 1];
  const tangentProjector = [
    [1, 0],
    [0, 0],
  ];
  const tangentNullProjector = [
    [0, 0],
    [0, 1],
  ];
  const provider = [branchClockRms, requiredNullLift ?? 0];
  const evaluation = evaluateLeastNormRetainedVectorProviderWitness({
    tangent_target_vector: tangentTarget,
    active_margin_gradient_vector: activeMarginGradient,
    tangent_projector_matrix: tangentProjector,
    tangent_null_projector_matrix: tangentNullProjector,
    provider_acceleration_vector: provider,
    dynamic_root_margin: dynamicRootMargin,
    tangent_response_horizon: tangentResponseHorizon,
    margin_lift_response_horizon: marginLiftResponseHorizon,
    minimum_dynamic_root_margin_reserve: minimumReserve,
  });

  return {
    schema: "oblate_spheroid_internal_tangent_authority_normalized_diagnostic_witness.v0",
    scope_note: "diagnostic_normalized_basis_not_retained_solver_vector_evidence",
    construction_status: "normalized_local_tangent_margin_basis_constructed",
    basis_definition:
      "e_T is the measured tangent-authority axis and e_N is a unit tangent-null active-margin-lift axis",
    construction_equation:
      "T=[A_T,0], G_mu=[0,1], P_T=diag(1,0), P_N=diag(0,1), a_provider=[A_T,delta_mu_req/Delta_M]",
    input_scalars: {
      A_T: branchClockRms,
      m_dyn: dynamicRootMargin,
      Delta_T: tangentResponseHorizon,
      Delta_M: marginLiftResponseHorizon,
      epsilon_mu: minimumReserve,
      delta_mu_required: deltaMuRequired,
      required_null_lift: requiredNullLift,
    },
    witness_vectors: {
      tangent_target_vector: tangentTarget,
      active_margin_gradient_vector: activeMarginGradient,
      tangent_projector_matrix: tangentProjector,
      tangent_null_projector_matrix: tangentNullProjector,
      provider_acceleration_vector: provider,
    },
    evaluation,
    mathematical_witness_conditions_passed: evaluation.mathematical_witness_conditions_passed,
    accepted: false,
    acceptance_boundary:
      "normalized diagnostic witness must be replaced by same-record retained solver vectors before it can replace the assigned branch-clock lock",
    first_missing_object: LEAST_NORM_PROVIDER_FIRST_MISSING_OBJECT,
    first_missing_field: LEAST_NORM_PROVIDER_FIRST_MISSING_FIELD,
  };
}

function sourceTargetStatusFromWitnessEvaluations(evaluations) {
  if (evaluations.length === 0) {
    return {
      source_acquisition_status: "blocked_missing_same_record_retained_solver_vector_rows",
      first_missing_object: RETAINED_SOLVER_VECTOR_SOURCE_TARGET_FIRST_MISSING_OBJECT,
      first_missing_field: RETAINED_SOLVER_VECTOR_SOURCE_TARGET_FIRST_MISSING_FIELD,
    };
  }
  if (evaluations.some((evaluation) => evaluation.mathematical_witness_conditions_passed === true)) {
    return {
      source_acquisition_status: "same_record_retained_solver_vector_witness_mathematical_pass_acceptance_blocked",
      first_missing_object: LEAST_NORM_PROVIDER_FIRST_MISSING_OBJECT,
      first_missing_field: LEAST_NORM_PROVIDER_FIRST_MISSING_FIELD,
    };
  }
  return {
    source_acquisition_status: "same_record_retained_solver_vector_witness_present_but_failed",
    first_missing_object: RETAINED_SOLVER_VECTOR_SOURCE_TARGET_FIRST_MISSING_OBJECT,
    first_missing_field: evaluations[0]?.first_missing_field ?? RETAINED_SOLVER_VECTOR_SOURCE_TARGET_FIRST_MISSING_FIELD,
  };
}

function makeRetainedSolverVectorSourceTarget(witnessEvaluations = []) {
  const status = sourceTargetStatusFromWitnessEvaluations(witnessEvaluations);
  return {
    schema: "retained_solver_internal_tangent_authority_vector_source_target.v0",
    scope_note:
      "same_record_source_target_for_actual_retained_solver_vectors_not_satisfied_by_normalized_diagnostic_witness",
    target_statement:
      "emit retained solver vector rows that evaluate the least-norm provider equation in the actual multi-particle tangent and causal-margin geometry",
    vector_space:
      "global retained acceleration vector over all active architrino slots for one preferred-curve row and one declared retained time slice",
    required_same_record_rows: [
      {
        row: "retained_solver_tangent_target_vector_row",
        required_fields: [
          "source_row_id",
          "retained_record_id",
          "time",
          "particle_slot_order",
          "a_ansatz_vector",
          "a_wake_vector",
          "a_support_vector",
          "surface_normal_vectors",
          "tangent_projector_matrix",
          "tangent_target_vector",
        ],
        equation:
          "T = P_T(a_ansatz - a_wake - a_support)",
      },
      {
        row: "active_causal_margin_gradient_vector_row",
        required_fields: [
          "active_margin_channel",
          "active_margin_value",
          "active_margin_event_ref",
          "active_margin_gradient_vector",
          "tangent_null_projector_matrix",
        ],
        equation:
          "G_mu = gradient of the active min(c_f-|v|, D_s, D_t) factor in the same global acceleration vector space",
      },
      {
        row: "same_record_provider_acceleration_vector_row",
        required_fields: [
          "provider_acceleration_vector",
          "least_norm_null_correction_vector",
          "provider_equation",
          "provider_provenance",
          "accepted_provider_ref",
        ],
        equation:
          "a_provider^* = T + n_*",
      },
      {
        row: "post_provider_root_margin_row",
        required_fields: [
          "post_provider_root_margin",
          "minimum_dynamic_root_margin_reserve",
          "tangent_response_horizon",
          "margin_lift_response_horizon",
          "positive_post_provider_root_margin",
        ],
        equation:
          "m_dyn - Delta_T ||P_T a_provider^*|| + Delta_M <a_provider^*,G_mu> >= epsilon_mu",
      },
      {
        row: "same_record_closure_rows",
        required_fields: [
          "same_record_retained_root_ledger",
          "same_record_action_closure_row",
          "same_record_wake_history_ref",
          "same_record_path_history_ref",
        ],
        equation:
          "all vector rows bind to the same retained path-history and root/action record",
      },
    ],
    evaluator_binding: {
      evaluator_schema: "least_norm_retained_vector_provider_witness_evaluation.v0",
      input_mapping: {
        tangent_target_vector: "retained_solver_tangent_target_vector_row.tangent_target_vector",
        active_margin_gradient_vector: "active_causal_margin_gradient_vector_row.active_margin_gradient_vector",
        tangent_projector_matrix: "retained_solver_tangent_target_vector_row.tangent_projector_matrix",
        tangent_null_projector_matrix: "active_causal_margin_gradient_vector_row.tangent_null_projector_matrix",
        provider_acceleration_vector: "same_record_provider_acceleration_vector_row.provider_acceleration_vector",
        dynamic_root_margin: "active_causal_margin_gradient_vector_row.active_margin_value",
        tangent_response_horizon: "post_provider_root_margin_row.tangent_response_horizon",
        margin_lift_response_horizon: "post_provider_root_margin_row.margin_lift_response_horizon",
        minimum_dynamic_root_margin_reserve: "post_provider_root_margin_row.minimum_dynamic_root_margin_reserve",
      },
    },
    normalized_diagnostic_witness_policy:
      "normalized diagnostic witness rows may seed algebra checks but cannot satisfy any required same-record retained solver vector row",
    retained_solver_vector_witness_row_count: witnessEvaluations.length,
    retained_solver_vector_witness_mathematical_pass_count: witnessEvaluations.filter(
      (evaluation) => evaluation.mathematical_witness_conditions_passed === true
    ).length,
    retained_solver_vector_witness_same_record_pass_count: witnessEvaluations.filter(
      (evaluation) => evaluation.same_record_binding_passed === true
    ).length,
    source_acquisition_status: status.source_acquisition_status,
    first_missing_object: status.first_missing_object,
    first_missing_field: status.first_missing_field,
    accepted_vector_provider_ref: null,
    accepted: false,
  };
}

function minimumGainSourceStatusFromWitnessEvaluations(evaluations) {
  if (evaluations.length === 0) {
    return {
      source_acquisition_status: "blocked_missing_same_record_minimum_norm_retained_history_gain_rows",
      first_missing_object: RETAINED_HISTORY_FIRST_MISSING_OBJECT,
      first_missing_field: RETAINED_HISTORY_FIRST_MISSING_FIELD,
    };
  }
  if (evaluations.some((evaluation) => evaluation.mathematical_gain_conditions_passed === true)) {
    return {
      source_acquisition_status: "same_record_minimum_norm_retained_history_gain_mathematical_pass_acceptance_blocked",
      first_missing_object: RETAINED_HISTORY_FIRST_MISSING_OBJECT,
      first_missing_field: RETAINED_HISTORY_FIRST_MISSING_FIELD,
    };
  }
  return {
    source_acquisition_status: "same_record_minimum_norm_retained_history_gain_present_but_failed",
    first_missing_object: RETAINED_HISTORY_FIRST_MISSING_OBJECT,
    first_missing_field: evaluations[0]?.first_missing_field ?? RETAINED_HISTORY_FIRST_MISSING_FIELD,
  };
}

function makeRetainedHistoryTangentResponseEquationTarget(minimumGainWitnessEvaluations = []) {
  const minimumGainStatus = minimumGainSourceStatusFromWitnessEvaluations(minimumGainWitnessEvaluations);
  return {
    schema: "retained_history_tangent_response_equation_target.v0",
    scope_note:
      "candidate_internal_retained_history_response_equation_not_accepted_provider_evidence",
    response_equation:
      "a_RH = -P_T(K_x e_x + K_v e_v)",
    minimum_gain_equation:
      "K_x^*=-T e_x^T/(||e_x||^2+||e_v||^2), K_v^*=-T e_v^T/(||e_x||^2+||e_v||^2)",
    minimum_gain_response_equation:
      "a_RH^*=-P_T(K_x^* e_x+K_v^* e_v)",
    provider_equation:
      "a_provider^RH = a_RH + n_*",
    tangent_replacement_condition:
      "||a_RH - P_T(a_ansatz - a_wake - a_support)|| <= epsilon_vec",
    margin_reserve_condition:
      "m_dyn - Delta_T ||P_T a_provider^RH|| + Delta_M <a_provider^RH,G_mu> >= epsilon_mu",
    input_definitions: {
      e_x: "tangent projection of current position minus retained target position on the same branch record",
      e_v: "tangent projection of current velocity minus retained target velocity on the same branch record",
      K_x: "same-record retained-history position response matrix",
      K_v: "same-record retained-history velocity response matrix",
      G_mu: "active causal-margin gradient vector in the same global acceleration vector space",
    },
    evaluator_schema: RETAINED_HISTORY_TANGENT_RESPONSE_WITNESS_SCHEMA,
    minimum_gain_evaluator_schema: RETAINED_HISTORY_MINIMUM_GAIN_WITNESS_SCHEMA,
    minimum_gain_witness_row_schema: RETAINED_HISTORY_MINIMUM_GAIN_WITNESS_ROW_SCHEMA,
    required_same_record_rows: [
      "same_record_retained_path_error_row",
      "same_record_retained_history_response_matrix_row",
      "retained_solver_tangent_target_vector_row",
      "active_causal_margin_gradient_vector_row",
      "post_provider_root_margin_row",
      "same_record_retained_root_ledger",
      "same_record_action_closure_row",
    ],
    minimum_gain_source_target: {
      source_acquisition_status: minimumGainStatus.source_acquisition_status,
      witness_row_count: minimumGainWitnessEvaluations.length,
      witness_mathematical_pass_count: minimumGainWitnessEvaluations.filter(
        (evaluation) => evaluation.mathematical_gain_conditions_passed === true
      ).length,
      witness_same_record_pass_count: minimumGainWitnessEvaluations.filter(
        (evaluation) => evaluation.same_record_binding_passed === true
      ).length,
      accepted_minimum_gain_count: 0,
      evaluator_schema: RETAINED_HISTORY_MINIMUM_GAIN_WITNESS_SCHEMA,
      witness_row_schema: RETAINED_HISTORY_MINIMUM_GAIN_WITNESS_ROW_SCHEMA,
      first_missing_object: minimumGainStatus.first_missing_object,
      first_missing_field: minimumGainStatus.first_missing_field,
      accepted: false,
    },
    first_missing_object: RETAINED_HISTORY_FIRST_MISSING_OBJECT,
    first_missing_field: RETAINED_HISTORY_FIRST_MISSING_FIELD,
    accepted: false,
  };
}

function makeSourceSummary(targetArtifact = {}, reserveArtifact = {}) {
  return {
    branch_clock_lock_target: {
      schema: targetArtifact.schema ?? null,
      row_id: targetArtifact.row_id ?? null,
      artifact_hash: targetArtifact.artifact_hash ?? null,
      status: targetArtifact.artifact_status ?? null,
      first_missing_object: targetArtifact.retained_evidence_blocker?.first_missing_object ?? FIRST_MISSING_OBJECT,
      first_missing_field: targetArtifact.retained_evidence_blocker?.first_missing_field ?? FIRST_MISSING_FIELD,
    },
    branch_clock_lock_reserve_certificate: {
      schema: reserveArtifact.schema ?? null,
      row_id: reserveArtifact.row_id ?? null,
      artifact_hash: reserveArtifact.artifact_hash ?? null,
      status: reserveArtifact.artifact_status ?? null,
      first_missing_object: reserveArtifact.retained_evidence_blocker?.first_missing_object ?? FIRST_MISSING_OBJECT,
      first_missing_field: reserveArtifact.retained_evidence_blocker?.first_missing_field ?? FIRST_MISSING_FIELD,
    },
  };
}

function reserveRowsByKey(reserveArtifact = {}) {
  const reserveRows = normalizeRows(reserveArtifact.rows);
  const candidateRows = normalizeRows(reserveArtifact.branch_clock_lock_reserve_candidate_rows);
  const rows = reserveRows.length > 0 ? reserveRows : candidateRows;
  return new Map(
    rows.map((row) => [rowJoinKey(row), row])
  );
}

function vectorWitnessRowsByKey(rows) {
  const byKey = new Map();
  for (const row of rows) {
    const key = rowJoinKey(row);
    if (!byKey.has(key)) {
      byKey.set(key, []);
    }
    byKey.get(key).push(row);
  }
  return byKey;
}

function collectRetainedSolverVectorWitnessRows(input, targetArtifact = {}, reserveArtifact = {}) {
  return [
    ...normalizeRows(input.retainedSolverVectorWitnessRows),
    ...normalizeRows(input.retained_solver_vector_witness_rows),
    ...normalizeRows(targetArtifact.retained_solver_vector_witness_rows),
    ...normalizeRows(reserveArtifact.retained_solver_vector_witness_rows),
  ];
}

function collectMinimumNormRetainedHistoryGainWitnessRows(input, targetArtifact = {}, reserveArtifact = {}) {
  return [
    ...normalizeRows(input.minimumNormRetainedHistoryGainWitnessRows),
    ...normalizeRows(input.minimum_norm_retained_history_gain_witness_rows),
    ...normalizeRows(targetArtifact.minimum_norm_retained_history_gain_witness_rows),
    ...normalizeRows(reserveArtifact.minimum_norm_retained_history_gain_witness_rows),
  ];
}

function measuredNeedFromTargetRow(
  rowPrefix,
  targetRow,
  reserveRow,
  vectorWitnessRows = [],
  minimumGainWitnessRows = []
) {
  const branchClock = targetRow.assigned_branch_clock_lock_term ?? {};
  const support = targetRow.assigned_support_term ?? {};
  const reserve = reserveRow?.root_margin_reserve_status ?? {};
  const tangentReserve = reserveRow?.tangent_authority_reserve_status ?? {};
  const marginLift = reserveRow?.margin_lift_mechanism_requirement ?? {};
  const localValues = targetRow.local_values ?? {};
  const target = targetRow.tangent_authority_target ?? {};
  const branchClockRms = finiteNumber(branchClock.rms_acceleration ?? reserveRow?.branch_clock_lock_term?.rms_acceleration);
  const supportRms = finiteNumber(support.rms_acceleration ?? reserveRow?.support_term?.rms_acceleration);
  const dynamicRootMargin = finiteNumber(localValues.dynamic_root_margin ?? reserve.dynamic_root_margin);
  const reserveFlagIsPresent = typeof reserve.positive_dynamic_root_margin_reserve === "boolean";
  const positiveReserve = reserveFlagIsPresent
    ? reserve.positive_dynamic_root_margin_reserve
    : dynamicRootMargin != null && dynamicRootMargin > 0 && branchClockRms != null;
  const tangentResponseHorizon = finiteNumber(tangentReserve.tangent_response_horizon);
  const minimumReserve = finiteNumber(tangentReserve.minimum_dynamic_root_margin_reserve);
  const marginLiftResponseHorizon = finiteNumber(marginLift.margin_lift_response_horizon);
  const fullReplacementRequiredLift =
    dynamicRootMargin == null || branchClockRms == null || tangentResponseHorizon == null || minimumReserve == null
      ? null
      : Math.max(0, minimumReserve + tangentResponseHorizon * branchClockRms - dynamicRootMargin);
  const zeroTangentRequiredLift =
    dynamicRootMargin == null || minimumReserve == null
      ? null
      : Math.max(0, minimumReserve - dynamicRootMargin);
  const maximumTangentFractionWithoutLift =
    dynamicRootMargin == null ||
      branchClockRms == null ||
      tangentResponseHorizon == null ||
      minimumReserve == null ||
      branchClockRms <= EPSILON ||
      tangentResponseHorizon <= EPSILON
      ? null
      : (dynamicRootMargin - minimumReserve) / (tangentResponseHorizon * branchClockRms);
  const clampedNoLiftFraction =
    maximumTangentFractionWithoutLift == null
      ? null
      : Math.max(0, Math.min(1, maximumTangentFractionWithoutLift));
  const normalizedDiagnosticWitness = makeNormalizedDiagnosticVectorWitness({
    branchClockRms,
    dynamicRootMargin,
    tangentResponseHorizon,
    marginLiftResponseHorizon,
    minimumReserve,
  });
  const retainedSolverVectorWitnessEvaluations = vectorWitnessRows.map((row) =>
    evaluateRetainedSolverVectorProviderWitnessRow(row)
  );
  const retainedSolverVectorSourceTarget = makeRetainedSolverVectorSourceTarget(
    retainedSolverVectorWitnessEvaluations
  );
  const minimumNormRetainedHistoryGainWitnessEvaluations = minimumGainWitnessRows.map((row) =>
    evaluateMinimumNormRetainedHistoryGainWitnessRow(row)
  );
  const retainedHistoryTangentResponseEquationTarget = makeRetainedHistoryTangentResponseEquationTarget(
    minimumNormRetainedHistoryGainWitnessEvaluations
  );
  return {
    row_id: `${rowPrefix}:measured_need:${targetRow.row_id ?? rowJoinKey(targetRow)}`,
    schema: "oblate_spheroid_internal_tangent_authority_measured_need_row.v0",
    source_target_row_id: targetRow.row_id ?? null,
    source_reserve_row_id: reserveRow?.row_id ?? null,
    source_row_id: targetRow.source_row_id ?? reserveRow?.source_row_id ?? null,
    u: finiteNumber(targetRow.u),
    v_orb: finiteNumber(targetRow.v_orb),
    chi: finiteNumber(targetRow.chi),
    measured_branch_clock_lock_acceleration: {
      mode: branchClock.mode ?? reserveRow?.branch_clock_lock_term?.mode ?? "ansatz_tangent",
      active: branchClock.active === true || reserveRow?.branch_clock_lock_term?.active === true,
      rms_acceleration: branchClockRms,
      max_acceleration: finiteNumber(branchClock.max_acceleration ?? reserveRow?.branch_clock_lock_term?.max_acceleration),
      rms_tangent_position_error: finiteNumber(
        branchClock.rms_tangent_position_error ?? reserveRow?.branch_clock_lock_term?.rms_tangent_position_error
      ),
      rms_tangent_velocity_error: finiteNumber(
        branchClock.rms_tangent_velocity_error ?? reserveRow?.branch_clock_lock_term?.rms_tangent_velocity_error
      ),
      expected_direction: "opposes_tangent_position_and_velocity_error",
      authority_class: "assigned_branch_clock_lock_not_internal_tangent_authority_evidence",
    },
    support_comparison: {
      support_rms_acceleration: supportRms,
      branch_clock_lock_to_support_rms_ratio:
        branchClockRms == null ? null : branchClockRms / Math.max(supportRms ?? 0, EPSILON),
    },
    root_budget_margin_reserve_condition: {
      dynamic_root_margin: dynamicRootMargin,
      dynamic_beta_max: finiteNumber(localValues.dynamic_beta_max ?? reserve.dynamic_beta_max),
      positive_dynamic_root_margin_reserve: positiveReserve,
      status: positiveReserve ? "positive_root_budget_margin_reserve_measured" : "missing_positive_root_budget_margin_reserve",
    },
    post_tangent_authority_reserve_condition: {
      minimum_dynamic_root_margin_reserve: finiteNumber(tangentReserve.minimum_dynamic_root_margin_reserve),
      tangent_response_horizon: finiteNumber(tangentReserve.tangent_response_horizon),
      dynamic_root_margin_after_rms_tangent_authority: finiteNumber(
        tangentReserve.dynamic_root_margin_after_rms_tangent_authority
      ),
      positive_rms_tangent_authority_reserve:
        tangentReserve.positive_rms_tangent_authority_reserve === true,
      required_dynamic_root_margin_for_full_tangent_authority: finiteNumber(
        tangentReserve.required_dynamic_root_margin_for_full_tangent_authority
      ),
      minimum_margin_lift_for_full_tangent_authority: finiteNumber(
        tangentReserve.minimum_margin_lift_for_full_tangent_authority
      ),
      maximum_tangent_authority_fraction_without_margin_lift: finiteNumber(
        tangentReserve.maximum_tangent_authority_fraction_without_margin_lift
      ),
      minimum_tangent_authority_compression_without_margin_lift: finiteNumber(
        tangentReserve.minimum_tangent_authority_compression_without_margin_lift
      ),
      status: tangentReserve.status ?? null,
    },
    margin_lift_requirement: {
      active_margin_gradient_equation: marginLift.active_margin_gradient_equation ?? null,
      first_order_margin_lift_equation: marginLift.first_order_margin_lift_equation ?? null,
      combined_internal_acceleration_equation: marginLift.combined_internal_acceleration_equation ?? null,
      required_margin_lift: finiteNumber(marginLift.required_margin_lift),
      minimum_margin_lift_acceleration_proxy: finiteNumber(marginLift.minimum_margin_lift_acceleration_proxy),
      margin_lift_response_horizon: finiteNumber(marginLift.margin_lift_response_horizon),
      candidate_provider_classes: Array.isArray(marginLift.candidate_provider_classes)
        ? [...marginLift.candidate_provider_classes]
        : [],
      accepted_provider_ref: marginLift.accepted_provider_ref ?? null,
      accepted: marginLift.accepted === true,
    },
    scalar_tangent_replacement_feasibility: {
      scope_note: "scalar_rms_proxy_not_vector_provider_proof",
      tangent_authority_fraction_symbol: "lambda_T",
      margin_lift_symbol: "delta_mu(lambda_T)",
      replacement_curve_equation:
        "delta_mu(lambda_T)=max(0, epsilon_mu + Delta_T*lambda_T*A_T - m_dyn)",
      full_replacement_condition:
        "lambda_T=1 and delta_mu(1) supplied by same-record internal provider",
      no_margin_lift_condition:
        "0 <= lambda_T <= (m_dyn-epsilon_mu)/(Delta_T*A_T)",
      variables: {
        epsilon_mu: minimumReserve,
        Delta_T: tangentResponseHorizon,
        Delta_M: marginLiftResponseHorizon,
        A_T: branchClockRms,
        m_dyn: dynamicRootMargin,
      },
      required_margin_lift_at_full_measured_tangent_authority: fullReplacementRequiredLift,
      required_margin_lift_at_zero_tangent_authority: zeroTangentRequiredLift,
      maximum_tangent_authority_fraction_without_margin_lift: maximumTangentFractionWithoutLift,
      clamped_tangent_authority_fraction_without_margin_lift: clampedNoLiftFraction,
      minimum_tangent_authority_compression_without_margin_lift:
        clampedNoLiftFraction == null ? null : 1 - clampedNoLiftFraction,
      full_measured_tangent_authority_passes_without_margin_lift:
        clampedNoLiftFraction != null && clampedNoLiftFraction >= 1,
      raw_margin_passes_without_tangent_authority:
        zeroTangentRequiredLift != null && zeroTangentRequiredLift === 0,
      retained_vector_provider_required: true,
      accepted_vector_provider_ref: null,
      accepted: false,
    },
    vector_tangent_margin_compatibility: {
      scope_note: "symbolic_vector_condition_not_accepted_provider_evidence",
      tangent_target_definition:
        "T = P_T(a_ansatz - a_wake - a_support)",
      tangent_projection_equation:
        "P_T a_internal = T",
      active_margin_gradient_definition:
        "G_mu = velocity-gradient vector of the active causal-margin factor on receiver/source slots",
      tangent_null_projector:
        "P_N = I - P_T",
      general_solution:
        "a_internal = T + n, with P_T n = 0",
      margin_lift_compatibility_inequality:
        "<T,G_mu> + <n,P_N G_mu> >= delta_mu_req / Delta_M",
      minimum_null_correction:
        "n_* = max(0, delta_mu_req/Delta_M - <T,G_mu>) * P_N G_mu / ||P_N G_mu||^2 when ||P_N G_mu|| > 0",
      no_null_lift_condition:
        "if ||P_N G_mu|| = 0, then the tangent solution must already satisfy <T,G_mu> >= delta_mu_req/Delta_M",
      incompatibility_condition:
        "||P_N G_mu|| = 0 and <T,G_mu> < delta_mu_req/Delta_M",
      required_vector_rows: [
        "retained_tangent_target_vector_row",
        "active_causal_margin_gradient_vector_row",
        "tangent_null_projection_row",
        "same_record_provider_acceleration_vector_row",
        "post_provider_root_margin_row",
      ],
      provider_claim_status: "vector_provider_missing",
      accepted_vector_provider_ref: null,
      accepted: false,
    },
    least_norm_retained_vector_provider: {
      scope_note: "least_norm_symbolic_provider_equation_not_accepted_same_record_vector_evidence",
      provider_equation:
        "a_provider^* = T + n_*",
      tangent_component_equation:
        "T = P_T(a_ansatz - a_wake - a_support)",
      tangent_replacement_condition:
        "P_T a_provider^* = T",
      null_component_equation:
        "n_* = max(0, delta_mu_req/Delta_M - <T,G_mu>) * P_N G_mu / ||P_N G_mu||^2 when ||P_N G_mu|| > 0",
      no_null_component_condition:
        "n_*=0 when <T,G_mu> >= delta_mu_req/Delta_M",
      zero_null_gradient_feasibility_condition:
        "if ||P_N G_mu|| = 0, require <T,G_mu> >= delta_mu_req/Delta_M",
      minimum_norm_objective:
        "minimize ||n|| subject to P_T n = 0 and m_dyn - Delta_T ||T|| + Delta_M <T+n,G_mu> >= epsilon_mu",
      post_provider_root_margin_condition:
        "m_dyn - Delta_T ||P_T a_provider^*|| + Delta_M <a_provider^*,G_mu> >= epsilon_mu",
      scalar_proxy_binding:
        "||T|| is represented by A_T in the scalar rms replacement curve until retained vector rows exist",
      witness_evaluation_schema: "least_norm_retained_vector_provider_witness_evaluation.v0",
      required_witness_input_slots: [
        "tangent_target_vector",
        "active_margin_gradient_vector",
        "tangent_projector_matrix",
        "tangent_null_projector_matrix",
        "provider_acceleration_vector",
        "dynamic_root_margin",
        "tangent_response_horizon",
        "margin_lift_response_horizon",
        "minimum_dynamic_root_margin_reserve",
      ],
      witness_pass_conditions: {
        tangent_replacement:
          "||P_T a_provider - T|| <= epsilon_vec",
        least_norm_solution:
          "||a_provider - (T+n_*)|| <= epsilon_vec",
        post_provider_root_margin:
          "m_dyn - Delta_T ||P_T a_provider|| + Delta_M <a_provider,G_mu> >= epsilon_mu",
        same_record_acceptance:
          "mathematical pass plus accepted retained-root ledger, action closure, provider vector row, and post-provider root-margin row",
      },
      provider_claim_status: "least_norm_provider_equation_missing_same_record_vectors",
      required_same_record_rows: [
        "retained_tangent_target_vector_row",
        "active_causal_margin_gradient_vector_row",
        "tangent_null_projection_row",
        "least_norm_provider_acceleration_vector_row",
        "post_provider_root_margin_row",
        "same_record_retained_root_ledger",
        "same_record_action_closure_row",
      ],
      first_missing_object: LEAST_NORM_PROVIDER_FIRST_MISSING_OBJECT,
      first_missing_field: LEAST_NORM_PROVIDER_FIRST_MISSING_FIELD,
      accepted_vector_provider_ref: null,
      accepted: false,
    },
    retained_history_tangent_response_equation_target: retainedHistoryTangentResponseEquationTarget,
    minimum_norm_retained_history_gain_witness_evaluations: minimumNormRetainedHistoryGainWitnessEvaluations,
    normalized_diagnostic_vector_witness: normalizedDiagnosticWitness,
    retained_solver_vector_witness_evaluations: retainedSolverVectorWitnessEvaluations,
    retained_solver_vector_source_target: retainedSolverVectorSourceTarget,
    tangent_authority_target_status: target.target_status ?? null,
    retained_root_ledger_ref: targetRow.retained_root_ledger_ref ?? reserveRow?.retained_root_ledger_ref ?? null,
    accepted: false,
  };
}

function makeMeasuredNeedRows(
  rowPrefix,
  targetArtifact = {},
  reserveArtifact = {},
  vectorWitnessRows = [],
  minimumGainWitnessRows = []
) {
  const reserveByKey = reserveRowsByKey(reserveArtifact);
  const vectorWitnessByKey = vectorWitnessRowsByKey(vectorWitnessRows);
  const minimumGainWitnessByKey = vectorWitnessRowsByKey(minimumGainWitnessRows);
  return normalizeRows(targetArtifact.rows)
    .filter((row) => row?.assigned_branch_clock_lock_term?.active === true)
    .map((row) => measuredNeedFromTargetRow(
      rowPrefix,
      row,
      reserveByKey.get(rowJoinKey(row)),
      vectorWitnessByKey.get(rowJoinKey(row)) ?? [],
      minimumGainWitnessByKey.get(rowJoinKey(row)) ?? []
    ));
}

function makeRouteRows(rowPrefix, measuredRows) {
  const measuredFields = {
    measured_need_row_count: measuredRows.length,
    finite_branch_clock_lock_rms_count: measuredRows.filter(
      (row) => row.measured_branch_clock_lock_acceleration.rms_acceleration != null
    ).length,
    positive_root_budget_margin_reserve_count: measuredRows.filter(
      (row) => row.root_budget_margin_reserve_condition.positive_dynamic_root_margin_reserve
    ).length,
    measured_need_row_refs: measuredRows.map((row) => row.row_id),
  };
  const measuredMarginLiftFields = {
    post_tangent_authority_reserve_pass_count: measuredRows.filter(
      (row) => row.post_tangent_authority_reserve_condition.positive_rms_tangent_authority_reserve
    ).length,
    rows_requiring_margin_lift_count: measuredRows.filter(
      (row) => (row.margin_lift_requirement.required_margin_lift ?? 0) > 0
    ).length,
    max_required_margin_lift: measuredRows.length > 0
      ? Math.max(...measuredRows.map((row) => row.margin_lift_requirement.required_margin_lift ?? 0))
      : null,
    max_minimum_margin_lift_acceleration_proxy: measuredRows.length > 0
      ? Math.max(...measuredRows.map((row) => row.margin_lift_requirement.minimum_margin_lift_acceleration_proxy ?? 0))
      : null,
    margin_lift_equation:
      "delta_mu ~= Delta_M <a_internal_margin,g_mu>",
    combined_internal_acceleration_equation:
      "a_internal = P_T(a_ansatz-a_wake-a_support) + a_internal_margin + a_internal_null",
  };
  const scalarFeasibilityFields = {
    full_replacement_without_margin_lift_count: measuredRows.filter(
      (row) =>
        row.scalar_tangent_replacement_feasibility.full_measured_tangent_authority_passes_without_margin_lift
    ).length,
    full_replacement_requires_margin_lift_count: measuredRows.filter(
      (row) =>
        (row.scalar_tangent_replacement_feasibility.required_margin_lift_at_full_measured_tangent_authority ?? 0) > 0
    ).length,
    rows_with_raw_margin_deficit_before_tangent_count: measuredRows.filter(
      (row) => row.scalar_tangent_replacement_feasibility.raw_margin_passes_without_tangent_authority === false
    ).length,
    max_required_margin_lift_at_full_measured_tangent_authority: measuredRows.length > 0
      ? Math.max(
        ...measuredRows.map(
          (row) =>
            row.scalar_tangent_replacement_feasibility.required_margin_lift_at_full_measured_tangent_authority ?? 0
        )
      )
      : null,
    equation:
      "delta_mu(lambda_T)=max(0, epsilon_mu + Delta_T*lambda_T*A_T - m_dyn)",
  };
  const vectorCompatibilityFields = {
    measured_need_row_count: measuredRows.length,
    accepted_vector_provider_count: measuredRows.filter(
      (row) => row.vector_tangent_margin_compatibility.accepted === true
    ).length,
    vector_provider_missing_count: measuredRows.filter(
      (row) => row.vector_tangent_margin_compatibility.provider_claim_status === "vector_provider_missing"
    ).length,
    tangent_projection_equation:
      "P_T a_internal = P_T(a_ansatz - a_wake - a_support)",
    minimum_null_correction:
      "n_* = max(0, delta_mu_req/Delta_M - <T,G_mu>) * P_N G_mu / ||P_N G_mu||^2",
    incompatibility_condition:
      "||P_N G_mu|| = 0 and <T,G_mu> < delta_mu_req/Delta_M",
  };
  const leastNormProviderFields = {
    measured_need_row_count: measuredRows.length,
    least_norm_provider_equation_row_count: measuredRows.filter(
      (row) => row.least_norm_retained_vector_provider?.provider_equation === "a_provider^* = T + n_*"
    ).length,
    accepted_least_norm_provider_count: measuredRows.filter(
      (row) => row.least_norm_retained_vector_provider?.accepted === true
    ).length,
    provider_equation_vector_row_missing_count: measuredRows.filter(
      (row) =>
        row.least_norm_retained_vector_provider?.provider_claim_status ===
        "least_norm_provider_equation_missing_same_record_vectors"
    ).length,
    provider_equation:
      "a_provider^* = T + n_*",
    tangent_replacement_condition:
      "P_T a_provider^* = T",
    post_provider_root_margin_condition:
      "m_dyn - Delta_T ||P_T a_provider^*|| + Delta_M <a_provider^*,G_mu> >= epsilon_mu",
    witness_evaluation_schema: "least_norm_retained_vector_provider_witness_evaluation.v0",
    witness_pass_conditions: [
      "||P_T a_provider - T|| <= epsilon_vec",
      "||a_provider - (T+n_*)|| <= epsilon_vec",
      "m_dyn - Delta_T ||P_T a_provider|| + Delta_M <a_provider,G_mu> >= epsilon_mu",
    ],
    first_missing_object: LEAST_NORM_PROVIDER_FIRST_MISSING_OBJECT,
    first_missing_field: LEAST_NORM_PROVIDER_FIRST_MISSING_FIELD,
  };
  const normalizedDiagnosticWitnessFields = {
    measured_need_row_count: measuredRows.length,
    normalized_diagnostic_witness_row_count: measuredRows.filter(
      (row) => row.normalized_diagnostic_vector_witness?.construction_status ===
        "normalized_local_tangent_margin_basis_constructed"
    ).length,
    normalized_diagnostic_witness_pass_count: measuredRows.filter(
      (row) => row.normalized_diagnostic_vector_witness?.mathematical_witness_conditions_passed === true
    ).length,
    normalized_diagnostic_witness_missing_input_count: measuredRows.filter(
      (row) => row.normalized_diagnostic_vector_witness?.construction_status === "missing_scalar_inputs"
    ).length,
    normalized_witness_scope:
      "algebraic two-axis diagnostic only; not retained solver vector evidence",
    construction_equation:
      "T=[A_T,0], G_mu=[0,1], P_T=diag(1,0), P_N=diag(0,1), a_provider=[A_T,delta_mu_req/Delta_M]",
    accepted_provider_count: 0,
  };
  const retainedSolverVectorSourceTargetFields = {
    measured_need_row_count: measuredRows.length,
    source_target_row_count: measuredRows.filter(
      (row) => row.retained_solver_vector_source_target?.schema ===
        "retained_solver_internal_tangent_authority_vector_source_target.v0"
    ).length,
    witness_row_count: measuredRows.reduce(
      (sum, row) => sum + (row.retained_solver_vector_witness_evaluations?.length ?? 0),
      0
    ),
    witness_mathematical_pass_count: measuredRows.reduce(
      (sum, row) =>
        sum + (row.retained_solver_vector_witness_evaluations ?? []).filter(
          (evaluation) => evaluation.mathematical_witness_conditions_passed === true
        ).length,
      0
    ),
    witness_same_record_pass_count: measuredRows.reduce(
      (sum, row) =>
        sum + (row.retained_solver_vector_witness_evaluations ?? []).filter(
          (evaluation) => evaluation.same_record_binding_passed === true
        ).length,
      0
    ),
    missing_same_record_retained_solver_vector_row_count: measuredRows.filter(
      (row) =>
        row.retained_solver_vector_source_target?.source_acquisition_status ===
        "blocked_missing_same_record_retained_solver_vector_rows"
    ).length,
    accepted_retained_solver_vector_provider_count: measuredRows.filter(
      (row) => row.retained_solver_vector_source_target?.accepted === true
    ).length,
    evaluator_schema: "least_norm_retained_vector_provider_witness_evaluation.v0",
    first_missing_object: RETAINED_SOLVER_VECTOR_SOURCE_TARGET_FIRST_MISSING_OBJECT,
    first_missing_field: RETAINED_SOLVER_VECTOR_SOURCE_TARGET_FIRST_MISSING_FIELD,
  };
  const retainedHistoryTangentResponseEquationFields = {
    measured_need_row_count: measuredRows.length,
    equation_target_row_count: measuredRows.filter(
      (row) => row.retained_history_tangent_response_equation_target?.schema ===
        "retained_history_tangent_response_equation_target.v0"
    ).length,
    minimum_gain_witness_row_count: measuredRows.reduce(
      (sum, row) => sum + (row.minimum_norm_retained_history_gain_witness_evaluations?.length ?? 0),
      0
    ),
    minimum_gain_witness_mathematical_pass_count: measuredRows.reduce(
      (sum, row) =>
        sum + (row.minimum_norm_retained_history_gain_witness_evaluations ?? []).filter(
          (evaluation) => evaluation.mathematical_gain_conditions_passed === true
        ).length,
      0
    ),
    minimum_gain_witness_same_record_pass_count: measuredRows.reduce(
      (sum, row) =>
        sum + (row.minimum_norm_retained_history_gain_witness_evaluations ?? []).filter(
          (evaluation) => evaluation.same_record_binding_passed === true
        ).length,
      0
    ),
    response_equation:
      "a_RH = -P_T(K_x e_x + K_v e_v)",
    minimum_gain_equation:
      "K_x^*=-T e_x^T/(||e_x||^2+||e_v||^2), K_v^*=-T e_v^T/(||e_x||^2+||e_v||^2)",
    minimum_gain_response_equation:
      "a_RH^*=-P_T(K_x^* e_x+K_v^* e_v)",
    provider_equation:
      "a_provider^RH = a_RH + n_*",
    evaluator_schema: RETAINED_HISTORY_TANGENT_RESPONSE_WITNESS_SCHEMA,
    minimum_gain_evaluator_schema: RETAINED_HISTORY_MINIMUM_GAIN_WITNESS_SCHEMA,
    minimum_gain_witness_row_schema: RETAINED_HISTORY_MINIMUM_GAIN_WITNESS_ROW_SCHEMA,
    first_missing_object: RETAINED_HISTORY_FIRST_MISSING_OBJECT,
    first_missing_field: RETAINED_HISTORY_FIRST_MISSING_FIELD,
    accepted_response_count: 0,
    accepted_minimum_gain_count: 0,
  };
  return [
    {
      rank: 1,
      route_id: "retained_history_tangent_projection",
      row_id: `${rowPrefix}:route:retained_history_tangent_projection`,
      equation_form: "a_parallel^RH = -k_RH e_x - c_RH e_v",
      tangent_authority_equation:
        "P_T a_internal = P_T(a_ansatz - a_wake - a_support)",
      margin_lift_equation:
        "<a_internal_margin,g_mu> >= required_margin_lift/margin_lift_response_horizon",
      variables: {
        e_x: "Pi_T(x_i - x_i^ret(t))",
        e_v: "Pi_T(v_i - v_i^ret(t))",
        Pi_T: "tangent projection to the oblate support surface",
        g_mu: "active causal-margin gradient in field-speed, receiver-normal, or source-normal channel",
      },
      required_same_record_input_rows: [
        "held-release seed path row",
        "central_solver_retained_history_provider_object",
        "same_record_retained_root_ledger",
        "same_record_action_closure_row",
        "retained_history_tangent_projection_row",
        "retained_history_causal_margin_gradient_row",
      ],
      expected_tangent_acceleration_direction: "opposes tangent position and velocity error measured by branch-clock lock",
      measured_branch_clock_lock_acceleration_fields: measuredFields,
      measured_margin_lift_fields: measuredMarginLiftFields,
      scalar_replacement_feasibility_fields: scalarFeasibilityFields,
      vector_tangent_margin_compatibility_fields: vectorCompatibilityFields,
      least_norm_retained_vector_provider_fields: leastNormProviderFields,
      normalized_diagnostic_vector_witness_fields: normalizedDiagnosticWitnessFields,
      retained_solver_vector_source_target_fields: retainedSolverVectorSourceTargetFields,
      retained_history_tangent_response_equation_fields: retainedHistoryTangentResponseEquationFields,
      root_budget_margin_reserve_condition:
        "post-tangent-authority root-budget margin remains positive after retained-history tangent and margin-gradient components are applied",
      current_status: "fail_closed_missing_retained_record_id",
      first_missing_object: RETAINED_HISTORY_FIRST_MISSING_OBJECT,
      first_missing_field: RETAINED_HISTORY_FIRST_MISSING_FIELD,
      accepted: false,
    },
    {
      rank: 2,
      route_id: "same_ledger_action_measure_tangent_row",
      row_id: `${rowPrefix}:route:same_ledger_action_measure_tangent_row`,
      equation_form: "a_parallel^A = Pi_T R_A(action_functional, root_support_event_rows, retained_source_binding)",
      required_same_record_input_rows: [
        "bounded-speed live ledger",
        "same-ledger action-measure row",
        "accepted root-support event rows",
        "action_functional",
        "provider provenance",
      ],
      expected_tangent_acceleration_direction: "same tangent sign as the measured branch-clock lock correction",
      measured_branch_clock_lock_acceleration_fields: measuredFields,
      measured_margin_lift_fields: measuredMarginLiftFields,
      scalar_replacement_feasibility_fields: scalarFeasibilityFields,
      vector_tangent_margin_compatibility_fields: vectorCompatibilityFields,
      least_norm_retained_vector_provider_fields: leastNormProviderFields,
      normalized_diagnostic_vector_witness_fields: normalizedDiagnosticWitnessFields,
      retained_solver_vector_source_target_fields: retainedSolverVectorSourceTargetFields,
      retained_history_tangent_response_equation_fields: retainedHistoryTangentResponseEquationFields,
      root_budget_margin_reserve_condition: "same-ledger action row must preserve positive root-budget margin",
      current_status: "source_acquisition_blocked",
      first_missing_object: "bounded_speed_same_ledger_action_measure_row",
      first_missing_field: "action_functional",
      accepted: false,
    },
    {
      rank: 3,
      route_id: "wake_ledger_tangent_response",
      row_id: `${rowPrefix}:route:wake_ledger_tangent_response`,
      equation_form: "a_parallel^W = Pi_T R_W(wake_ledger_rows, causal_root_replay, action_closure)",
      required_same_record_input_rows: [
        "same-record wake ledger rows",
        "causal-root replay rows",
        "same-record action closure row",
        "retained root ledger",
      ],
      expected_tangent_acceleration_direction: "wake response pulls along the preferred branch-curve tangent",
      measured_branch_clock_lock_acceleration_fields: measuredFields,
      measured_margin_lift_fields: measuredMarginLiftFields,
      scalar_replacement_feasibility_fields: scalarFeasibilityFields,
      vector_tangent_margin_compatibility_fields: vectorCompatibilityFields,
      least_norm_retained_vector_provider_fields: leastNormProviderFields,
      normalized_diagnostic_vector_witness_fields: normalizedDiagnosticWitnessFields,
      retained_solver_vector_source_target_fields: retainedSolverVectorSourceTargetFields,
      retained_history_tangent_response_equation_fields: retainedHistoryTangentResponseEquationFields,
      root_budget_margin_reserve_condition: "wake tangent response cannot exhaust the positive root-budget margin",
      current_status: "source_acquisition_blocked",
      first_missing_object: "same_record_wake_ledger_tangent_response",
      first_missing_field: "same_record_wake_ledger_rows",
      accepted: false,
    },
    {
      rank: 4,
      route_id: "angular_momentum_shielding_response",
      row_id: `${rowPrefix}:route:angular_momentum_shielding_response`,
      equation_form: "a_parallel^J = Pi_T R_J(Delta L_branch, shielding_response_gradient, branch_row)",
      required_same_record_input_rows: [
        "angular momentum row",
        "shielding response row",
        "branch row",
        "moving retained branch certificate",
        "accepted branch chart",
      ],
      expected_tangent_acceleration_direction: "angular-momentum and shielding correction carries the branch curve tangent reserve",
      measured_branch_clock_lock_acceleration_fields: measuredFields,
      measured_margin_lift_fields: measuredMarginLiftFields,
      scalar_replacement_feasibility_fields: scalarFeasibilityFields,
      vector_tangent_margin_compatibility_fields: vectorCompatibilityFields,
      least_norm_retained_vector_provider_fields: leastNormProviderFields,
      normalized_diagnostic_vector_witness_fields: normalizedDiagnosticWitnessFields,
      retained_solver_vector_source_target_fields: retainedSolverVectorSourceTargetFields,
      retained_history_tangent_response_equation_fields: retainedHistoryTangentResponseEquationFields,
      root_budget_margin_reserve_condition: "branch row and shielding response preserve positive root-budget margin",
      current_status: "source_acquisition_blocked",
      first_missing_object: "torque_wake_retained_active_row_branch_certificate_evidence_object",
      first_missing_field: "branch_certificate_ref",
      accepted: false,
    },
    {
      rank: 5,
      route_id: "noether_sea_response",
      row_id: `${rowPrefix}:route:noether_sea_response`,
      equation_form: "a_parallel^NS = Pi_T R_NS(theta_sea, retained pressure-row, tension, relaxation)",
      required_same_record_input_rows: [
        "Noether sea retained pressure-row",
        "theta_sea_rho_NS",
        "pressure/tension/relaxation rows",
        "same-record provider provenance",
      ],
      expected_tangent_acceleration_direction: "Noether sea pressure or tension response supplies the tangent reserve",
      measured_branch_clock_lock_acceleration_fields: measuredFields,
      measured_margin_lift_fields: measuredMarginLiftFields,
      scalar_replacement_feasibility_fields: scalarFeasibilityFields,
      vector_tangent_margin_compatibility_fields: vectorCompatibilityFields,
      least_norm_retained_vector_provider_fields: leastNormProviderFields,
      normalized_diagnostic_vector_witness_fields: normalizedDiagnosticWitnessFields,
      retained_solver_vector_source_target_fields: retainedSolverVectorSourceTargetFields,
      retained_history_tangent_response_equation_fields: retainedHistoryTangentResponseEquationFields,
      root_budget_margin_reserve_condition: "Noether sea response leaves positive root-budget margin on the same retained record",
      current_status: "source_acquisition_blocked",
      first_missing_object: "retained_noether_sea_pressure_response_row",
      first_missing_field: "theta_sea_rho_NS",
      accepted: false,
    },
  ];
}

function firstMissing(measuredRows) {
  if (measuredRows.length === 0) {
    return {
      artifact_status: "fail_closed_missing_measured_branch_clock_lock_tangent_rows",
      hard_math_status: "measured_branch_clock_lock_tangent_need_missing",
      first_missing_object: "measured_branch_clock_lock_tangent_rows",
      first_missing_field:
        "oblate_spheroid_branch_clock_lock_target.rows[*].assigned_branch_clock_lock_term.rms_acceleration",
      reason: "measured_branch_clock_lock_tangent_rows_missing",
    };
  }
  if (
    measuredRows.every((row) => row.root_budget_margin_reserve_condition.positive_dynamic_root_margin_reserve !== true)
  ) {
    return {
      artifact_status: "fail_closed_missing_positive_root_budget_margin_reserve",
      hard_math_status: "positive_root_budget_margin_reserve_missing",
      first_missing_object: "positive_root_budget_margin_reserve_for_internal_tangent_authority",
      first_missing_field:
        "oblate_spheroid_internal_tangent_authority_certificate.measured_tangent_authority_rows[*].root_budget_margin_reserve_condition",
      reason: "positive_root_budget_margin_reserve_missing",
    };
  }
  return {
    artifact_status: "priority_only_internal_tangent_authority_certificate_present_retained_evidence_blocked",
    hard_math_status: "internal_tangent_authority_route_matrix_present",
    first_missing_object: FIRST_MISSING_OBJECT,
    first_missing_field: FIRST_MISSING_FIELD,
    reason: "retained_root_ledger_missing",
  };
}

export function evaluateOblateSpheroidInternalTangentAuthorityEvidence(candidate = {}) {
  const evidenceClass = candidate.evidence_class ?? candidate.authority_class ?? candidate.source_class ?? null;
  if (evidenceClass && NEGATIVE_CONTROL_REASONS[evidenceClass]) {
    return {
      accepted: false,
      reason: NEGATIVE_CONTROL_REASONS[evidenceClass],
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  const ref = candidate.retained_root_ledger_ref ?? candidate.accepted_internal_tangent_authority_ref ?? null;
  if (typeof ref === "string" && /^(proxy|candidate|synthetic):/.test(ref)) {
    return {
      accepted: false,
      reason: "proxy_or_synthetic_ref_not_accepted_internal_tangent_authority_evidence",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (
    candidate.accepted_internal_tangent_authority === true ||
    candidate.accepted_same_record_evidence === true ||
    candidate.acceptance_certificate_ref != null
  ) {
    return {
      accepted: false,
      reason: NEGATIVE_CONTROL_REASONS.synthetic_accepted_ref,
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (candidate.schema !== SCHEMA) {
    return {
      accepted: false,
      reason: "schema_not_oblate_spheroid_internal_tangent_authority_certificate_v0",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  return {
    accepted: false,
    reason: "producer_does_not_authorize_accepted_internal_tangent_authority_evidence",
    first_missing_field: "oblate_spheroid_internal_tangent_authority_certificate.acceptance_certificate_ref",
  };
}

export function buildOblateSpheroidInternalTangentAuthorityCertificate(input = {}) {
  const targetArtifact = input.targetArtifact ?? input.branchClockLockTarget ?? {};
  const reserveArtifact = input.reserveArtifact ?? input.branchClockLockReserveCertificate ?? {};
  const retainedSolverVectorWitnessRows = collectRetainedSolverVectorWitnessRows(
    input,
    targetArtifact,
    reserveArtifact
  );
  const minimumGainWitnessRows = collectMinimumNormRetainedHistoryGainWitnessRows(
    input,
    targetArtifact,
    reserveArtifact
  );
  const sourceSummary = makeSourceSummary(targetArtifact, reserveArtifact);
  const artifactKey = {
    schema: SCHEMA,
    sourceSummary,
    target_rows: normalizeRows(targetArtifact.rows).map((row) => ({
      row_id: row.row_id,
      source_row_id: row.source_row_id,
      u: row.u,
      v_orb: row.v_orb,
      branch_clock_lock_rms_acceleration: row.assigned_branch_clock_lock_term?.rms_acceleration,
      dynamic_root_margin: row.local_values?.dynamic_root_margin,
    })),
    reserve_rows: normalizeRows(reserveArtifact.branch_clock_lock_reserve_candidate_rows ?? reserveArtifact.rows).map(
      (row) => ({
        row_id: row.row_id,
        source_row_id: row.source_row_id,
        u: row.u,
        v_orb: row.v_orb,
        positive_dynamic_root_margin_reserve:
          row.root_margin_reserve_status?.positive_dynamic_root_margin_reserve,
      })
    ),
    retained_solver_vector_witness_rows: retainedSolverVectorWitnessRows.map((row) => ({
      row_id: row.row_id,
      source_row_id: row.source_row_id,
      retained_record_id: row.retained_record_id,
      time: row.time,
      provider_provenance: row.same_record_provider_acceleration_vector_row?.provider_provenance,
      accepted_provider_ref: row.same_record_provider_acceleration_vector_row?.accepted_provider_ref,
    })),
    minimum_norm_retained_history_gain_witness_rows: minimumGainWitnessRows.map((row) => ({
      row_id: row.row_id,
      source_row_id: row.source_row_id,
      retained_record_id: row.retained_record_id,
      time: row.time,
      accepted_minimum_gain_ref: row.accepted_minimum_gain_ref,
    })),
  };
  const artifactHash = stableHash(artifactKey);
  const rowPrefix = `oblate_spheroid_internal_tangent_authority_certificate:${artifactHash.slice(0, 16)}`;
  const measuredRows = makeMeasuredNeedRows(
    rowPrefix,
    targetArtifact,
    reserveArtifact,
    retainedSolverVectorWitnessRows,
    minimumGainWitnessRows
  );
  const routeRows = makeRouteRows(rowPrefix, measuredRows);
  const missing = firstMissing(measuredRows);

  return {
    schema: SCHEMA,
    row_id: rowPrefix,
    artifact_hash: artifactHash,
    authority_class: "priority_only_internal_tangent_authority_certificate_not_retained_evidence",
    source_artifacts: sourceSummary,
    measured_tangent_authority_rows: measuredRows,
    internal_term_route_rows: routeRows,
    route_matrix: routeRows.map((row) => ({
      rank: row.rank,
      route_id: row.route_id,
      current_status: row.current_status,
      first_missing_object: row.first_missing_object,
      first_missing_field: row.first_missing_field,
    })),
    summary: {
      measured_tangent_need_row_count: measuredRows.length,
      route_row_count: routeRows.length,
      top_ranked_route: routeRows[0]?.route_id ?? null,
      finite_measured_branch_clock_lock_rms_count: measuredRows.filter(
        (row) => row.measured_branch_clock_lock_acceleration.rms_acceleration != null
      ).length,
      positive_root_budget_margin_reserve_count: measuredRows.filter(
        (row) => row.root_budget_margin_reserve_condition.positive_dynamic_root_margin_reserve
      ).length,
      positive_post_tangent_authority_reserve_count: measuredRows.filter(
        (row) => row.post_tangent_authority_reserve_condition.positive_rms_tangent_authority_reserve
      ).length,
      rows_requiring_margin_lift_count: measuredRows.filter(
        (row) => (row.margin_lift_requirement.required_margin_lift ?? 0) > 0
      ).length,
      max_required_margin_lift: measuredRows.length > 0
        ? Math.max(...measuredRows.map((row) => row.margin_lift_requirement.required_margin_lift ?? 0))
        : null,
      max_minimum_margin_lift_acceleration_proxy: measuredRows.length > 0
        ? Math.max(
          ...measuredRows.map((row) => row.margin_lift_requirement.minimum_margin_lift_acceleration_proxy ?? 0)
        )
        : null,
      full_replacement_without_margin_lift_count: measuredRows.filter(
        (row) =>
          row.scalar_tangent_replacement_feasibility.full_measured_tangent_authority_passes_without_margin_lift
      ).length,
      full_replacement_requires_margin_lift_count: measuredRows.filter(
        (row) =>
          (row.scalar_tangent_replacement_feasibility.required_margin_lift_at_full_measured_tangent_authority ?? 0) > 0
      ).length,
      rows_with_raw_margin_deficit_before_tangent_count: measuredRows.filter(
        (row) => row.scalar_tangent_replacement_feasibility.raw_margin_passes_without_tangent_authority === false
      ).length,
      accepted_vector_provider_count: measuredRows.filter(
        (row) => row.vector_tangent_margin_compatibility.accepted === true
      ).length,
      vector_provider_missing_count: measuredRows.filter(
        (row) => row.vector_tangent_margin_compatibility.provider_claim_status === "vector_provider_missing"
      ).length,
      least_norm_provider_equation_row_count: measuredRows.filter(
        (row) => row.least_norm_retained_vector_provider?.provider_equation === "a_provider^* = T + n_*"
      ).length,
      accepted_least_norm_provider_count: measuredRows.filter(
        (row) => row.least_norm_retained_vector_provider?.accepted === true
      ).length,
      provider_equation_vector_row_missing_count: measuredRows.filter(
        (row) =>
          row.least_norm_retained_vector_provider?.provider_claim_status ===
          "least_norm_provider_equation_missing_same_record_vectors"
      ).length,
      normalized_diagnostic_witness_row_count: measuredRows.filter(
        (row) => row.normalized_diagnostic_vector_witness?.construction_status ===
          "normalized_local_tangent_margin_basis_constructed"
      ).length,
      normalized_diagnostic_witness_pass_count: measuredRows.filter(
        (row) => row.normalized_diagnostic_vector_witness?.mathematical_witness_conditions_passed === true
      ).length,
      normalized_diagnostic_witness_missing_input_count: measuredRows.filter(
        (row) => row.normalized_diagnostic_vector_witness?.construction_status === "missing_scalar_inputs"
      ).length,
      retained_history_tangent_response_equation_target_row_count: measuredRows.filter(
        (row) => row.retained_history_tangent_response_equation_target?.schema ===
          "retained_history_tangent_response_equation_target.v0"
      ).length,
      minimum_norm_retained_history_gain_witness_row_count: measuredRows.reduce(
        (sum, row) => sum + (row.minimum_norm_retained_history_gain_witness_evaluations?.length ?? 0),
        0
      ),
      minimum_norm_retained_history_gain_witness_mathematical_pass_count: measuredRows.reduce(
        (sum, row) =>
          sum + (row.minimum_norm_retained_history_gain_witness_evaluations ?? []).filter(
            (evaluation) => evaluation.mathematical_gain_conditions_passed === true
          ).length,
        0
      ),
      minimum_norm_retained_history_gain_witness_same_record_pass_count: measuredRows.reduce(
        (sum, row) =>
          sum + (row.minimum_norm_retained_history_gain_witness_evaluations ?? []).filter(
            (evaluation) => evaluation.same_record_binding_passed === true
          ).length,
        0
      ),
      accepted_minimum_norm_retained_history_gain_count: 0,
      retained_solver_vector_source_target_row_count: measuredRows.filter(
        (row) => row.retained_solver_vector_source_target?.schema ===
          "retained_solver_internal_tangent_authority_vector_source_target.v0"
      ).length,
      retained_solver_vector_witness_row_count: measuredRows.reduce(
        (sum, row) => sum + (row.retained_solver_vector_witness_evaluations?.length ?? 0),
        0
      ),
      retained_solver_vector_witness_mathematical_pass_count: measuredRows.reduce(
        (sum, row) =>
          sum + (row.retained_solver_vector_witness_evaluations ?? []).filter(
            (evaluation) => evaluation.mathematical_witness_conditions_passed === true
          ).length,
        0
      ),
      retained_solver_vector_witness_same_record_pass_count: measuredRows.reduce(
        (sum, row) =>
          sum + (row.retained_solver_vector_witness_evaluations ?? []).filter(
            (evaluation) => evaluation.same_record_binding_passed === true
          ).length,
        0
      ),
      missing_same_record_retained_solver_vector_row_count: measuredRows.filter(
        (row) =>
          row.retained_solver_vector_source_target?.source_acquisition_status ===
          "blocked_missing_same_record_retained_solver_vector_rows"
      ).length,
      accepted_retained_solver_vector_provider_count: measuredRows.filter(
        (row) => row.retained_solver_vector_source_target?.accepted === true
      ).length,
      retained_evidence_first_missing_object: FIRST_MISSING_OBJECT,
      retained_evidence_first_missing_field: FIRST_MISSING_FIELD,
      retained_history_first_missing_object: RETAINED_HISTORY_FIRST_MISSING_OBJECT,
      retained_history_first_missing_field: RETAINED_HISTORY_FIRST_MISSING_FIELD,
    },
    source_status: "source_acquisition_blocked",
    artifact_status: missing.artifact_status,
    hard_math_status: missing.hard_math_status,
    first_missing_object: missing.first_missing_object,
    first_missing_field: missing.first_missing_field,
    retained_evidence_blocker: {
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: FIRST_MISSING_FIELD,
    },
    sharper_retained_history_blocker: {
      first_missing_object: RETAINED_HISTORY_FIRST_MISSING_OBJECT,
      first_missing_field: RETAINED_HISTORY_FIRST_MISSING_FIELD,
    },
    authorization: makeAuthorization(),
    accepted_internal_tangent_authority_ref: null,
    retained_root_ledger_ref: null,
    held_release_retained_record_id: null,
    evidence_evaluation: {
      accepted: false,
      reason: missing.reason,
      first_missing_field: missing.first_missing_field,
    },
    negative_controls: Object.entries(NEGATIVE_CONTROL_REASONS).map(([evidence_class, reason]) => ({
      evidence_class,
      accepted: false,
      reason,
    })),
  };
}

export function validateOblateSpheroidInternalTangentAuthorityCertificate(artifact) {
  const errors = [];
  if (artifact?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (!Array.isArray(artifact?.measured_tangent_authority_rows)) {
    errors.push("measured_tangent_authority_rows must be an array");
  }
  if (!Array.isArray(artifact?.internal_term_route_rows)) {
    errors.push("internal_term_route_rows must be an array");
  }
  if (artifact?.summary?.route_row_count !== artifact?.internal_term_route_rows?.length) {
    errors.push("summary route_row_count must match internal_term_route_rows length");
  }
  if (artifact?.internal_term_route_rows?.[0]?.route_id !== "retained_history_tangent_projection") {
    errors.push("retained-history tangent projection must be the top-ranked route");
  }
  for (const row of artifact?.measured_tangent_authority_rows ?? []) {
    if (row.accepted !== false) {
      errors.push("measured tangent authority rows must remain non-authorizing");
    }
    if (row.retained_root_ledger_ref != null) {
      errors.push("measured tangent authority rows must not claim retained_root_ledger_ref");
    }
    if (row.scalar_tangent_replacement_feasibility?.accepted !== false) {
      errors.push("scalar tangent replacement feasibility must remain non-authorizing");
    }
    if (row.scalar_tangent_replacement_feasibility?.accepted_vector_provider_ref !== null) {
      errors.push("scalar tangent replacement feasibility must not claim an accepted vector provider");
    }
    if (row.vector_tangent_margin_compatibility?.accepted !== false) {
      errors.push("vector tangent-margin compatibility must remain non-authorizing");
    }
    if (row.vector_tangent_margin_compatibility?.accepted_vector_provider_ref !== null) {
      errors.push("vector tangent-margin compatibility must not claim an accepted vector provider");
    }
    if (row.least_norm_retained_vector_provider?.accepted !== false) {
      errors.push("least-norm retained vector provider must remain non-authorizing");
    }
    if (row.least_norm_retained_vector_provider?.accepted_vector_provider_ref !== null) {
      errors.push("least-norm retained vector provider must not claim an accepted vector provider");
    }
    if (row.normalized_diagnostic_vector_witness?.accepted !== false) {
      errors.push("normalized diagnostic vector witness must remain non-authorizing");
    }
    if (row.normalized_diagnostic_vector_witness?.evaluation?.accepted !== false) {
      errors.push("normalized diagnostic vector witness evaluation must remain non-authorizing");
    }
    if (row.retained_history_tangent_response_equation_target?.accepted !== false) {
      errors.push("retained-history tangent response equation target must remain non-authorizing");
    }
    if (row.retained_history_tangent_response_equation_target?.minimum_gain_source_target?.accepted !== false) {
      errors.push("minimum-gain retained-history source target must remain non-authorizing");
    }
    if (row.retained_solver_vector_source_target?.accepted !== false) {
      errors.push("retained solver vector source target must remain non-authorizing");
    }
    if (row.retained_solver_vector_source_target?.accepted_vector_provider_ref !== null) {
      errors.push("retained solver vector source target must not claim an accepted provider ref");
    }
    for (const evaluation of row.retained_solver_vector_witness_evaluations ?? []) {
      if (evaluation.accepted !== false) {
        errors.push("retained solver vector witness evaluations must remain non-authorizing");
      }
    }
    for (const evaluation of row.minimum_norm_retained_history_gain_witness_evaluations ?? []) {
      if (evaluation.accepted !== false) {
        errors.push("minimum-norm retained-history gain witness evaluations must remain non-authorizing");
      }
      if (evaluation.accepted_minimum_gain_ref !== null) {
        errors.push("minimum-norm retained-history gain witness evaluations must not claim accepted gain refs");
      }
    }
  }
  for (const row of artifact?.internal_term_route_rows ?? []) {
    if (row.accepted !== false) {
      errors.push("internal term route rows must remain non-authorizing");
    }
    if (!row.first_missing_object || !row.first_missing_field) {
      errors.push(`${row.route_id ?? "route"} must name a first missing object and field`);
    }
  }
  for (const flag of AUTHORIZATION_FLAGS) {
    if (artifact?.authorization?.[flag] !== false) {
      errors.push(`${flag} must remain false`);
    }
  }
  if (artifact?.authorization?.scoreMovement !== "no_score_increase") {
    errors.push("scoreMovement must remain no_score_increase");
  }
  if (artifact?.accepted_internal_tangent_authority_ref !== null) {
    errors.push("accepted_internal_tangent_authority_ref must remain null");
  }
  if (artifact?.retained_root_ledger_ref !== null) {
    errors.push("retained_root_ledger_ref must remain null");
  }
  if (artifact?.held_release_retained_record_id !== null) {
    errors.push("held_release_retained_record_id must remain null");
  }
  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    const result = evaluateOblateSpheroidInternalTangentAuthorityEvidence({ evidence_class: evidenceClass });
    if (result.accepted || result.reason !== reason) {
      errors.push(`${evidenceClass} negative control must reject as ${reason}`);
    }
  }
  return errors;
}

function runCli() {
  const inputPath = process.argv.find((arg) => arg.startsWith("--input="))?.slice("--input=".length);
  const input = inputPath ? JSON.parse(fs.readFileSync(inputPath, "utf8")) : {};
  const artifact = buildOblateSpheroidInternalTangentAuthorityCertificate(input);
  const errors = validateOblateSpheroidInternalTangentAuthorityCertificate(artifact);
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
    return;
  }
  const pretty = process.argv.includes("--pretty");
  console.log(JSON.stringify(artifact, null, pretty ? 2 : 0));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli();
}
