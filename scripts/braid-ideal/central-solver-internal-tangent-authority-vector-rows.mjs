import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

import {
  INTERNAL_TANGENT_AUTHORITY_FIRST_MISSING_FIELD,
  INTERNAL_TANGENT_AUTHORITY_FIRST_MISSING_OBJECT,
  INTERNAL_TANGENT_AUTHORITY_VECTOR_REQUEST_SCHEMA,
  buildCentralSolverRetainedHistoryRow,
} from "./central-solver-retained-history-row.mjs";
import {
  RETAINED_HISTORY_MINIMUM_GAIN_WITNESS_ROW_SCHEMA,
  RETAINED_SOLVER_VECTOR_WITNESS_ROW_SCHEMA,
  evaluateMinimumNormRetainedHistoryGainWitnessRow,
  evaluateRetainedSolverVectorProviderWitnessRow,
} from "./oblate-spheroid-internal-tangent-authority-certificate.mjs";
import {
  SCHEMA as PREFERRED_CURVE_INTERNAL_TANGENT_AUTHORITY_EQUATION_SCHEMA,
} from "./preferred-curve-internal-tangent-authority-equation.mjs";

export const SCHEMA = "central_solver_internal_tangent_authority_vector_rows.v0";
export const FIRST_MISSING_OBJECT = INTERNAL_TANGENT_AUTHORITY_FIRST_MISSING_OBJECT;
export const FIRST_MISSING_FIELD =
  "central_solver_internal_tangent_authority_vector_rows.minimum_norm_retained_history_gain_witness_rows";
export const PREFERRED_CURVE_EQUATION_FIRST_MISSING_FIELD =
  "central_solver_internal_tangent_authority_vector_rows.preferred_curve_internal_tangent_authority_equation_artifacts";
export const ACCEPTANCE_CERTIFICATE_FIELD =
  "central_solver_internal_tangent_authority_vector_rows.acceptance_certificate_ref";
export const ACCEPTED_BRIDGE_EVIDENCE_FIRST_MISSING_OBJECT =
  "same_record_accepted_central_solver_evidence_for_internal_tangent_authority_bridge";
export const ACCEPTED_BRIDGE_EVIDENCE_FIRST_MISSING_FIELD =
  "central_solver_internal_tangent_authority_vector_rows.same_record_accepted_evidence";
export const RETAINED_ROOT_LEDGER_DETAIL_ROW_SCHEMA =
  "same_record_retained_root_ledger_detail_row.v0";
export const RETAINED_ROOT_LEDGER_DETAIL_FIRST_MISSING_FIELD =
  "central_solver_internal_tangent_authority_vector_rows.same_record_retained_root_ledger_detail_rows";
export const SAME_RECORD_ACTION_CLOSURE_ROW_SCHEMA =
  "same_record_action_closure_row.v0";
export const SAME_RECORD_ACTION_CLOSURE_FIRST_MISSING_FIELD =
  "central_solver_internal_tangent_authority_vector_rows.same_record_action_closure_rows";

export const NEGATIVE_CONTROL_REASONS = Object.freeze({
  fixture: "fixture_not_accepted_internal_tangent_authority_vector_rows_evidence",
  diagnostic: "diagnostic_not_accepted_internal_tangent_authority_vector_rows_evidence",
  priority_prose: "priority_prose_not_accepted_internal_tangent_authority_vector_rows_evidence",
  generated_decoy: "generated_decoy_not_accepted_internal_tangent_authority_vector_rows_evidence",
  proxy_row: "proxy_row_not_accepted_internal_tangent_authority_vector_rows_evidence",
  candidate_ref: "candidate_ref_not_accepted_internal_tangent_authority_vector_rows_evidence",
  aggregate_row: "aggregate_row_not_same_record_internal_tangent_authority_vector_rows_evidence",
  source_contract_shell: "source_contract_shell_not_accepted_internal_tangent_authority_vector_rows_evidence",
  temp_probe: "temp_probe_not_accepted_internal_tangent_authority_vector_rows_evidence",
  endpoint_only_row: "endpoint_only_row_not_internal_tangent_authority_vector_rows_evidence",
});

const AUTHORIZATION_FLAGS = Object.freeze([
  "accepted_same_record_evidence",
  "accepted_internal_tangent_authority",
  "retainedBranchClaim",
  "preferred_configuration_claim",
  "accepted_transition_source",
  "moving_retained_branch_certificate",
  "same_ledger_action_measure_row",
  "bounded_speed_live_ledger",
]);

const ACCEPTED_BRIDGE_EVIDENCE_FIELDS = Object.freeze([
  "central_retained_history_acceptance_certificate_ref",
  "central_internal_tangent_authority_vector_rows_acceptance_certificate_ref",
  "preferred_curve_internal_tangent_authority_acceptance_certificate_ref",
  "same_record_retained_path_error_row_ref",
  "minimum_norm_retained_history_gain_witness_row_ref",
  "retained_solver_vector_witness_row_ref",
  "retained_solver_tangent_target_vector_row_ref",
  "active_causal_margin_gradient_vector_row_ref",
  "same_record_provider_acceleration_vector_row_ref",
  "post_provider_root_margin_row_ref",
  "branch_clock_lock_replacement_residual_row_ref",
  "same_record_retained_root_ledger_ref",
  "same_record_retained_root_ledger_detail_rows_ref",
  "same_record_action_closure_row_ref",
  "same_record_wake_history_ref",
  "same_record_path_history_ref",
  "same_record_provider_provenance_ref",
]);

const ACCEPTED_BRIDGE_BINDING_FIELDS = Object.freeze([
  "retained_record_id",
  "source_row_id",
]);

const RETAINED_ROOT_LEDGER_DETAIL_REQUIRED_FIELDS = Object.freeze([
  "source_row_id",
  "retained_record_id",
  "ledgerKey",
  "sourceKey",
  "receiverKey",
  "rootKey",
  "emissionTime",
  "hitTime",
  "delay",
  "residual",
  "jacobian",
  "branchWeight",
  "sourceNormalDenominator",
  "receiverNormalFactor",
  "entryKind",
  "rootKind",
  "statusCode",
  "stateFlags",
]);

const SAME_RECORD_ACTION_CLOSURE_REQUIRED_FIELDS = Object.freeze([
  "source_row_id",
  "retained_record_id",
  "action_ledger_ref",
  "assigned_clock_lock_action_increment",
  "internal_replacement_action_increment",
  "action_increment_residual",
  "action_residual_tolerance",
  "action_closure_passed",
]);

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function normalizeRows(rows) {
  return Array.isArray(rows) ? rows : [];
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function retainedRecordIdFromRow(row = {}) {
  return row.retained_record_request?.retained_record_id ?? null;
}

function stringRef(value) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function pickSameRecordAcceptedEvidence(input = {}) {
  return input.sameRecordAcceptedEvidence ?? input.same_record_accepted_evidence ?? {};
}

function requestFromRow(row = {}) {
  return row.internal_tangent_authority_vector_request ?? null;
}

function sourceRowSummary(row) {
  return {
    row_id: row?.row_id ?? null,
    schema: row?.schema ?? null,
    source_row_id: row?.source_row_id ?? null,
    retained_record_id: row?.retained_record_id ?? null,
    time: row?.time ?? null,
  };
}

function finiteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function minOrNull(values) {
  return values.length > 0 ? Math.min(...values) : null;
}

function maxOrNull(values) {
  return values.length > 0 ? Math.max(...values) : null;
}

export function evaluateSameRecordRetainedRootLedgerDetailRows(rows = [], retainedRecordId = null) {
  const normalizedRows = normalizeRows(rows);
  const rowEvaluations = normalizedRows.map((row, index) => {
    const missingFields = [];
    if (row?.schema !== RETAINED_ROOT_LEDGER_DETAIL_ROW_SCHEMA) {
      missingFields.push(`${RETAINED_ROOT_LEDGER_DETAIL_FIRST_MISSING_FIELD}[${index}].schema`);
    }
    for (const field of RETAINED_ROOT_LEDGER_DETAIL_REQUIRED_FIELDS) {
      if (row?.[field] == null) {
        missingFields.push(`${RETAINED_ROOT_LEDGER_DETAIL_FIRST_MISSING_FIELD}[${index}].${field}`);
      }
    }
    const sameRecordBindingPassed =
      retainedRecordId != null && row?.retained_record_id === retainedRecordId;
    if (!sameRecordBindingPassed) {
      missingFields.push(`${RETAINED_ROOT_LEDGER_DETAIL_FIRST_MISSING_FIELD}[${index}].retained_record_id`);
    }
    const sourceRowId = stringRef(row?.source_row_id);
    if (sourceRowId == null) {
      missingFields.push(`${RETAINED_ROOT_LEDGER_DETAIL_FIRST_MISSING_FIELD}[${index}].source_row_id`);
    }
    const residualFinite = finiteNumber(row?.residual);
    const jacobianFinite = finiteNumber(row?.jacobian);
    const branchWeightFinite = finiteNumber(row?.branchWeight);
    const sourceNormalFinite = finiteNumber(row?.sourceNormalDenominator);
    const receiverNormalFinite = finiteNumber(row?.receiverNormalFactor);
    if (!residualFinite) {
      missingFields.push(`${RETAINED_ROOT_LEDGER_DETAIL_FIRST_MISSING_FIELD}[${index}].residual`);
    }
    if (!jacobianFinite) {
      missingFields.push(`${RETAINED_ROOT_LEDGER_DETAIL_FIRST_MISSING_FIELD}[${index}].jacobian`);
    }
    if (!branchWeightFinite) {
      missingFields.push(`${RETAINED_ROOT_LEDGER_DETAIL_FIRST_MISSING_FIELD}[${index}].branchWeight`);
    }
    if (!sourceNormalFinite) {
      missingFields.push(`${RETAINED_ROOT_LEDGER_DETAIL_FIRST_MISSING_FIELD}[${index}].sourceNormalDenominator`);
    }
    if (!receiverNormalFinite) {
      missingFields.push(`${RETAINED_ROOT_LEDGER_DETAIL_FIRST_MISSING_FIELD}[${index}].receiverNormalFactor`);
    }
    const epsilonTau = Math.max(
      finiteNumber(row?.epsilon_tau) ? Math.abs(row.epsilon_tau) : 1e-12,
      1e-12
    );
    const jacobianAbs = jacobianFinite ? Math.abs(row.jacobian) : null;
    const rootJacobianAwayFromZero = jacobianAbs != null && jacobianAbs >= epsilonTau;
    if (!rootJacobianAwayFromZero) {
      missingFields.push(`${RETAINED_ROOT_LEDGER_DETAIL_FIRST_MISSING_FIELD}[${index}].jacobian_nonzero_floor`);
    }
    const sourceNormalAbs = sourceNormalFinite ? Math.abs(row.sourceNormalDenominator) : null;
    const sourceNormalAwayFromZero = sourceNormalAbs != null && sourceNormalAbs >= epsilonTau;
    if (!sourceNormalAwayFromZero) {
      missingFields.push(
        `${RETAINED_ROOT_LEDGER_DETAIL_FIRST_MISSING_FIELD}[${index}].sourceNormalDenominator_nonzero_floor`
      );
    }
    const rowPassed = missingFields.length === 0;
    return {
      schema: "same_record_retained_root_ledger_detail_row_evaluation.v0",
      row_id: row?.row_id ?? null,
      source_row_id: sourceRowId,
      retained_record_id: row?.retained_record_id ?? null,
      request_retained_record_id: retainedRecordId,
      same_record_binding_passed: sameRecordBindingPassed,
      causal_root_residual_equation:
        "Phi_ab(t,tau;q)=||x_a(t;q)-x_b(t-tau;q)||^2-c_f^2 tau^2=0",
      root_sensitivity_equation:
        "d tau_ab/d q_i = - partial_{q_i} Phi_ab / partial_tau Phi_ab when |partial_tau Phi_ab| >= epsilon_tau",
      root_residual_abs: residualFinite ? Math.abs(row.residual) : null,
      jacobian_abs: jacobianAbs,
      source_normal_denominator_abs: sourceNormalAbs,
      receiver_normal_factor_abs: receiverNormalFinite ? Math.abs(row.receiverNormalFactor) : null,
      branch_weight: branchWeightFinite ? row.branchWeight : null,
      root_jacobian_away_from_zero: rootJacobianAwayFromZero,
      source_normal_denominator_away_from_zero: sourceNormalAwayFromZero,
      root_detail_differential_row_passed: rowPassed,
      missing_fields: missingFields,
      first_missing_field:
        rowPassed
          ? "central_solver_internal_tangent_authority_vector_rows.same_record_retained_root_ledger_detail_rows_acceptance_certificate_ref"
          : (missingFields[0] ?? RETAINED_ROOT_LEDGER_DETAIL_FIRST_MISSING_FIELD),
      accepted: false,
    };
  });
  const mathematicalRootDifferentialConditionsPassed =
    rowEvaluations.length > 0 &&
    rowEvaluations.every((evaluation) => evaluation.root_detail_differential_row_passed === true);
  const passedRows = mathematicalRootDifferentialConditionsPassed ? rowEvaluations : [];
  return {
    schema: "same_record_retained_root_ledger_detail_rows_evaluation.v0",
    row_schema: RETAINED_ROOT_LEDGER_DETAIL_ROW_SCHEMA,
    request_retained_record_id: retainedRecordId,
    causal_root_residual_equation:
      "Phi_ab(t,tau;q)=||x_a(t;q)-x_b(t-tau;q)||^2-c_f^2 tau^2=0",
    root_sensitivity_equation:
      "d tau_ab/d q_i = - partial_{q_i} Phi_ab / partial_tau Phi_ab when |partial_tau Phi_ab| >= epsilon_tau",
    required_fields: [...RETAINED_ROOT_LEDGER_DETAIL_REQUIRED_FIELDS],
    row_count: rowEvaluations.length,
    valid_row_count: countPassed(
      rowEvaluations,
      (evaluation) => evaluation.root_detail_differential_row_passed === true
    ),
    same_record_binding_pass_count: countPassed(
      rowEvaluations,
      (evaluation) => evaluation.same_record_binding_passed === true
    ),
    source_row_ids: uniqueStrings(passedRows.map((evaluation) => evaluation.source_row_id)),
    root_residual_abs_max: maxOrNull(
      rowEvaluations.map((evaluation) => evaluation.root_residual_abs).filter(finiteNumber)
    ),
    jacobian_abs_min: minOrNull(
      rowEvaluations.map((evaluation) => evaluation.jacobian_abs).filter(finiteNumber)
    ),
    source_normal_denominator_abs_min: minOrNull(
      rowEvaluations.map((evaluation) => evaluation.source_normal_denominator_abs).filter(finiteNumber)
    ),
    receiver_normal_factor_abs_max: maxOrNull(
      rowEvaluations.map((evaluation) => evaluation.receiver_normal_factor_abs).filter(finiteNumber)
    ),
    mathematical_root_differential_conditions_passed: mathematicalRootDifferentialConditionsPassed,
    row_evaluations: rowEvaluations,
    first_missing_field:
      mathematicalRootDifferentialConditionsPassed
        ? "central_solver_internal_tangent_authority_vector_rows.same_record_retained_root_ledger_detail_rows_acceptance_certificate_ref"
        : (rowEvaluations.find((evaluation) => evaluation.root_detail_differential_row_passed !== true)
            ?.first_missing_field ?? RETAINED_ROOT_LEDGER_DETAIL_FIRST_MISSING_FIELD),
    accepted: false,
  };
}

export function evaluateSameRecordActionClosureRows(rows = [], retainedRecordId = null) {
  const normalizedRows = normalizeRows(rows);
  const rowEvaluations = normalizedRows.map((row, index) => {
    const missingFields = [];
    if (row?.schema !== SAME_RECORD_ACTION_CLOSURE_ROW_SCHEMA) {
      missingFields.push(`${SAME_RECORD_ACTION_CLOSURE_FIRST_MISSING_FIELD}[${index}].schema`);
    }
    for (const field of SAME_RECORD_ACTION_CLOSURE_REQUIRED_FIELDS) {
      if (row?.[field] == null) {
        missingFields.push(`${SAME_RECORD_ACTION_CLOSURE_FIRST_MISSING_FIELD}[${index}].${field}`);
      }
    }
    const sameRecordBindingPassed =
      retainedRecordId != null && row?.retained_record_id === retainedRecordId;
    if (!sameRecordBindingPassed) {
      missingFields.push(`${SAME_RECORD_ACTION_CLOSURE_FIRST_MISSING_FIELD}[${index}].retained_record_id`);
    }
    const sourceRowId = stringRef(row?.source_row_id);
    if (sourceRowId == null) {
      missingFields.push(`${SAME_RECORD_ACTION_CLOSURE_FIRST_MISSING_FIELD}[${index}].source_row_id`);
    }
    const assignedActionFinite = finiteNumber(row?.assigned_clock_lock_action_increment);
    const replacementActionFinite = finiteNumber(row?.internal_replacement_action_increment);
    const residualFinite = finiteNumber(row?.action_increment_residual);
    const toleranceFinite = finiteNumber(row?.action_residual_tolerance);
    if (!assignedActionFinite) {
      missingFields.push(
        `${SAME_RECORD_ACTION_CLOSURE_FIRST_MISSING_FIELD}[${index}].assigned_clock_lock_action_increment`
      );
    }
    if (!replacementActionFinite) {
      missingFields.push(
        `${SAME_RECORD_ACTION_CLOSURE_FIRST_MISSING_FIELD}[${index}].internal_replacement_action_increment`
      );
    }
    if (!residualFinite) {
      missingFields.push(`${SAME_RECORD_ACTION_CLOSURE_FIRST_MISSING_FIELD}[${index}].action_increment_residual`);
    }
    if (!toleranceFinite || row.action_residual_tolerance < 0) {
      missingFields.push(`${SAME_RECORD_ACTION_CLOSURE_FIRST_MISSING_FIELD}[${index}].action_residual_tolerance`);
    }
    const computedResidual =
      assignedActionFinite && replacementActionFinite
        ? Math.abs(row.internal_replacement_action_increment - row.assigned_clock_lock_action_increment)
        : null;
    const residualConsistencyTolerance = Math.max(
      1e-12,
      toleranceFinite ? row.action_residual_tolerance * 1e-9 : 1e-12
    );
    const residualConsistent =
      computedResidual != null &&
      residualFinite &&
      Math.abs(row.action_increment_residual - computedResidual) <= residualConsistencyTolerance;
    if (!residualConsistent) {
      missingFields.push(
        `${SAME_RECORD_ACTION_CLOSURE_FIRST_MISSING_FIELD}[${index}].action_increment_residual_consistency`
      );
    }
    const actionResidualWithinTolerance =
      computedResidual != null &&
      toleranceFinite &&
      computedResidual <= row.action_residual_tolerance;
    if (!actionResidualWithinTolerance) {
      missingFields.push(`${SAME_RECORD_ACTION_CLOSURE_FIRST_MISSING_FIELD}[${index}].action_residual_tolerance_pass`);
    }
    if (row?.action_closure_passed !== true) {
      missingFields.push(`${SAME_RECORD_ACTION_CLOSURE_FIRST_MISSING_FIELD}[${index}].action_closure_passed`);
    }
    const rowPassed = missingFields.length === 0;
    return {
      schema: "same_record_action_closure_row_evaluation.v0",
      row_id: row?.row_id ?? null,
      source_row_id: sourceRowId,
      retained_record_id: row?.retained_record_id ?? null,
      request_retained_record_id: retainedRecordId,
      same_record_binding_passed: sameRecordBindingPassed,
      action_closure_equation:
        "abs(Delta A_internal(q)-Delta A_clock(q)) <= epsilon_A",
      assigned_clock_lock_action_increment:
        assignedActionFinite ? row.assigned_clock_lock_action_increment : null,
      internal_replacement_action_increment:
        replacementActionFinite ? row.internal_replacement_action_increment : null,
      computed_action_increment_residual: computedResidual,
      supplied_action_increment_residual:
        residualFinite ? row.action_increment_residual : null,
      action_residual_tolerance:
        toleranceFinite ? row.action_residual_tolerance : null,
      action_increment_residual_consistent: residualConsistent,
      action_residual_within_tolerance: actionResidualWithinTolerance,
      action_closure_row_passed: rowPassed,
      missing_fields: missingFields,
      first_missing_field:
        rowPassed
          ? "central_solver_internal_tangent_authority_vector_rows.same_record_action_closure_rows_acceptance_certificate_ref"
          : (missingFields[0] ?? SAME_RECORD_ACTION_CLOSURE_FIRST_MISSING_FIELD),
      accepted: false,
    };
  });
  const mathematicalActionClosureConditionsPassed =
    rowEvaluations.length > 0 &&
    rowEvaluations.every((evaluation) => evaluation.action_closure_row_passed === true);
  const passedRows = mathematicalActionClosureConditionsPassed ? rowEvaluations : [];
  return {
    schema: "same_record_action_closure_rows_evaluation.v0",
    row_schema: SAME_RECORD_ACTION_CLOSURE_ROW_SCHEMA,
    request_retained_record_id: retainedRecordId,
    action_closure_equation:
      "abs(Delta A_internal(q)-Delta A_clock(q)) <= epsilon_A",
    required_fields: [...SAME_RECORD_ACTION_CLOSURE_REQUIRED_FIELDS],
    row_count: rowEvaluations.length,
    valid_row_count: countPassed(
      rowEvaluations,
      (evaluation) => evaluation.action_closure_row_passed === true
    ),
    same_record_binding_pass_count: countPassed(
      rowEvaluations,
      (evaluation) => evaluation.same_record_binding_passed === true
    ),
    source_row_ids: uniqueStrings(passedRows.map((evaluation) => evaluation.source_row_id)),
    action_increment_residual_abs_max: maxOrNull(
      rowEvaluations.map((evaluation) => evaluation.computed_action_increment_residual).filter(finiteNumber)
    ),
    mathematical_action_closure_conditions_passed: mathematicalActionClosureConditionsPassed,
    row_evaluations: rowEvaluations,
    first_missing_field:
      mathematicalActionClosureConditionsPassed
        ? "central_solver_internal_tangent_authority_vector_rows.same_record_action_closure_rows_acceptance_certificate_ref"
        : (rowEvaluations.find((evaluation) => evaluation.action_closure_row_passed !== true)
            ?.first_missing_field ?? SAME_RECORD_ACTION_CLOSURE_FIRST_MISSING_FIELD),
    accepted: false,
  };
}

function addRequestBinding(evaluation, retainedRecordId) {
  const bindingPassed =
    retainedRecordId != null &&
    evaluation.retained_record_id === retainedRecordId &&
    evaluation.same_record_binding_passed === true;
  return {
    ...evaluation,
    request_retained_record_id: retainedRecordId,
    request_retained_record_binding_passed: bindingPassed,
  };
}

function evaluatePreferredCurveEquationArtifact(artifact = {}, retainedRecordId) {
  const artifactRetainedRecordId =
    artifact.minimum_norm_retained_history_gain_evaluation?.retained_record_id ?? null;
  const requestBindingPassed =
    retainedRecordId != null &&
    artifactRetainedRecordId === retainedRecordId;
  const coreMathematicalPreferredCurveEquationPassed =
    artifact.schema === PREFERRED_CURVE_INTERNAL_TANGENT_AUTHORITY_EQUATION_SCHEMA &&
    artifact.summary?.mathematical_preferred_curve_internal_tangent_authority_equation_passed === true &&
    artifact.summary?.same_source_row_id_binding_passed === true &&
    artifact.summary?.dynamic_root_margin_binding_passed === true;
  const branchClockLockReplacementResidualPassed =
    artifact.summary?.branch_clock_lock_replacement_residual_passed === true &&
    artifact.branch_clock_lock_replacement_residual?.replacement_residual_passed === true;

  return {
    schema: PREFERRED_CURVE_INTERNAL_TANGENT_AUTHORITY_EQUATION_SCHEMA,
    artifact_id: artifact.artifact_id ?? null,
    artifact_hash: artifact.artifact_hash ?? null,
    source_row_id: artifact.source_preferred_curve_row?.source_row_id ?? null,
    retained_record_id: artifactRetainedRecordId,
    request_retained_record_id: retainedRecordId,
    request_retained_record_binding_passed: requestBindingPassed,
    preferred_curve_differential_passed: artifact.summary?.preferred_curve_differential_passed === true,
    same_source_row_id_binding_passed: artifact.summary?.same_source_row_id_binding_passed === true,
    dynamic_root_margin_binding_passed: artifact.summary?.dynamic_root_margin_binding_passed === true,
    minimum_gain_mathematical_passed: artifact.summary?.minimum_gain_mathematical_passed === true,
    core_mathematical_preferred_curve_equation_passed:
      coreMathematicalPreferredCurveEquationPassed && requestBindingPassed,
    branch_clock_lock_replacement_residual_passed: branchClockLockReplacementResidualPassed,
    branch_clock_lock_replacement_residual:
      artifact.branch_clock_lock_replacement_residual ?? null,
    mathematical_preferred_curve_equation_passed:
      coreMathematicalPreferredCurveEquationPassed &&
      branchClockLockReplacementResidualPassed &&
      requestBindingPassed,
    accepted: false,
    reason: coreMathematicalPreferredCurveEquationPassed && requestBindingPassed && !branchClockLockReplacementResidualPassed
      ? "preferred_curve_branch_clock_lock_replacement_residual_failed"
      : coreMathematicalPreferredCurveEquationPassed && branchClockLockReplacementResidualPassed && requestBindingPassed
        ? "preferred_curve_equation_passes_mathematically_but_acceptance_blocked"
      : "preferred_curve_equation_missing_failed_or_not_bound_to_request",
    first_missing_field: coreMathematicalPreferredCurveEquationPassed && requestBindingPassed && !branchClockLockReplacementResidualPassed
      ? "central_solver_internal_tangent_authority_vector_rows.preferred_curve_internal_tangent_authority_equation_artifacts[*].branch_clock_lock_replacement_residual.replacement_residual_passed"
      : coreMathematicalPreferredCurveEquationPassed && branchClockLockReplacementResidualPassed && requestBindingPassed
        ? ACCEPTANCE_CERTIFICATE_FIELD
      : PREFERRED_CURVE_EQUATION_FIRST_MISSING_FIELD,
  };
}

function countPassed(evaluations, predicate) {
  return evaluations.filter(predicate).length;
}

function uniqueStrings(values) {
  return [...new Set(values.filter((value) => typeof value === "string" && value.length > 0))];
}

function intersectStrings(first, second) {
  const secondSet = new Set(second);
  return first.filter((value) => secondSet.has(value));
}

function summarizeSameRecordBridgeBinding({
  retainedRecordId,
  minimumGainEvaluations,
  vectorEvaluations,
  preferredCurveEvaluations,
  rootDetailEvaluation,
  actionClosureEvaluation,
}) {
  const passingMinimumGainRows = minimumGainEvaluations.filter(
    (evaluation) =>
      evaluation.mathematical_gain_conditions_passed === true &&
      evaluation.request_retained_record_binding_passed === true
  );
  const passingVectorRows = vectorEvaluations.filter(
    (evaluation) =>
      evaluation.mathematical_witness_conditions_passed === true &&
      evaluation.request_retained_record_binding_passed === true
  );
  const passingPreferredCurveRows = preferredCurveEvaluations.filter(
    (evaluation) =>
      evaluation.mathematical_preferred_curve_equation_passed === true &&
      evaluation.request_retained_record_binding_passed === true
  );
  const minimumGainSourceRowIds = uniqueStrings(passingMinimumGainRows.map((evaluation) => evaluation.source_row_id));
  const vectorSourceRowIds = uniqueStrings(passingVectorRows.map((evaluation) => evaluation.source_row_id));
  const preferredCurveSourceRowIds = uniqueStrings(passingPreferredCurveRows.map((evaluation) => evaluation.source_row_id));
  const rootDetailSourceRowIds =
    rootDetailEvaluation?.mathematical_root_differential_conditions_passed === true
      ? uniqueStrings(rootDetailEvaluation.source_row_ids ?? [])
      : [];
  const actionClosureSourceRowIds =
    actionClosureEvaluation?.mathematical_action_closure_conditions_passed === true
      ? uniqueStrings(actionClosureEvaluation.source_row_ids ?? [])
      : [];
  const candidateSourceRowIds = intersectStrings(
    intersectStrings(
      intersectStrings(minimumGainSourceRowIds, vectorSourceRowIds),
      preferredCurveSourceRowIds
    ),
    intersectStrings(rootDetailSourceRowIds, actionClosureSourceRowIds)
  );

  return {
    request_retained_record_id: retainedRecordId,
    retained_record_id_binding_available: retainedRecordId != null,
    minimum_gain_source_row_ids: minimumGainSourceRowIds,
    retained_solver_vector_source_row_ids: vectorSourceRowIds,
    preferred_curve_source_row_ids: preferredCurveSourceRowIds,
    retained_root_detail_source_row_ids: rootDetailSourceRowIds,
    same_record_action_closure_source_row_ids: actionClosureSourceRowIds,
    candidate_source_row_ids: candidateSourceRowIds,
    source_row_id_binding_available: candidateSourceRowIds.length > 0,
  };
}

function evaluateAcceptedBridgeEvidenceCriterion({
  mathematicalBridgePassed,
  sameRecordAcceptedEvidence,
  sameRecordBridgeBinding,
}) {
  const evidence = sameRecordAcceptedEvidence ?? {};
  const bridgeBinding = sameRecordBridgeBinding ?? {};
  const missingFields = [];
  if (!mathematicalBridgePassed) {
    missingFields.push(
      "central_solver_internal_tangent_authority_vector_rows.mathematical_internal_tangent_authority_bridge_passed"
    );
  }
  const acceptedSameRecordEvidence =
    evidence.accepted_same_record_central_solver_evidence === true ||
    evidence.accepted_same_record_evidence === true;
  if (!acceptedSameRecordEvidence) {
    missingFields.push(
      "central_solver_internal_tangent_authority_vector_rows.same_record_accepted_evidence.accepted_same_record_central_solver_evidence"
    );
  }
  const suppliedRetainedRecordId = stringRef(evidence.retained_record_id ?? evidence.same_record_retained_record_id);
  const suppliedSourceRowId = stringRef(evidence.source_row_id ?? evidence.same_record_source_row_id);
  const expectedRetainedRecordId = stringRef(bridgeBinding.request_retained_record_id);
  const candidateSourceRowIds = Array.isArray(bridgeBinding.candidate_source_row_ids)
    ? bridgeBinding.candidate_source_row_ids
    : [];
  const retainedRecordIdBindingPassed =
    expectedRetainedRecordId != null && suppliedRetainedRecordId === expectedRetainedRecordId;
  const sourceRowIdBindingPassed =
    suppliedSourceRowId != null && candidateSourceRowIds.includes(suppliedSourceRowId);
  if (!retainedRecordIdBindingPassed) {
    missingFields.push(
      "central_solver_internal_tangent_authority_vector_rows.same_record_accepted_evidence.retained_record_id"
    );
  }
  if (!sourceRowIdBindingPassed) {
    missingFields.push(
      "central_solver_internal_tangent_authority_vector_rows.same_record_accepted_evidence.source_row_id"
    );
  }
  for (const field of ACCEPTED_BRIDGE_EVIDENCE_FIELDS) {
    if (stringRef(evidence[field]) == null) {
      missingFields.push(`central_solver_internal_tangent_authority_vector_rows.same_record_accepted_evidence.${field}`);
    }
  }
  const criterionPassed = missingFields.length === 0;
  return {
    schema: "central_solver_internal_tangent_authority_accepted_bridge_criterion.v0",
    accepted_bridge_criterion_passed: criterionPassed,
    candidate_artifact_authorizes_removal: false,
    can_replace_assigned_branch_clock_lock:
      criterionPassed ? "conditional_on_external_accepted_authority" : false,
    status: criterionPassed
      ? "accepted_bridge_criterion_conditionally_satisfied_by_declared_same_record_evidence"
      : "accepted_bridge_criterion_missing_math_or_same_record_accepted_evidence",
    theorem_statement:
      "If the central bridge passes mathematically and the listed same-record central retained-solver evidence refs are accepted, the assigned branch-clock lock is replaceable by the retained-history internal tangent authority while preserving the positive causal-root margin.",
    required_accepted_evidence_fields: [...ACCEPTED_BRIDGE_EVIDENCE_FIELDS],
    required_same_record_binding_fields: [...ACCEPTED_BRIDGE_BINDING_FIELDS],
    same_record_ref_binding: {
      same_record_ref_binding_passed: retainedRecordIdBindingPassed && sourceRowIdBindingPassed,
      retained_record_id: {
        expected: expectedRetainedRecordId,
        supplied: suppliedRetainedRecordId,
        binding_passed: retainedRecordIdBindingPassed,
      },
      source_row_id: {
        candidate_source_row_ids: candidateSourceRowIds,
        supplied: suppliedSourceRowId,
        binding_passed: sourceRowIdBindingPassed,
      },
      mathematical_bridge_binding: bridgeBinding,
    },
    supplied_accepted_evidence_refs: Object.fromEntries(
      ACCEPTED_BRIDGE_EVIDENCE_FIELDS.map((field) => [field, stringRef(evidence[field])])
    ),
    accepted_same_record_central_solver_evidence: acceptedSameRecordEvidence,
    missing_fields: missingFields,
    first_missing_object: criterionPassed
      ? "external_acceptance_authority_for_central_internal_tangent_authority_bridge"
      : ACCEPTED_BRIDGE_EVIDENCE_FIRST_MISSING_OBJECT,
    first_missing_field: criterionPassed
      ? "central_solver_internal_tangent_authority_vector_rows.external_promotion_authority_ref"
      : (missingFields[0] ?? ACCEPTED_BRIDGE_EVIDENCE_FIRST_MISSING_FIELD),
    accepted: false,
  };
}

function firstMissing({
  retainedRecordId,
  request,
  minimumGainEvaluations,
  vectorEvaluations,
  preferredCurveEvaluations,
  rootDetailEvaluation,
  actionClosureEvaluation,
  sameRecordBridgeBinding,
}) {
  const requestPresent = request?.schema === INTERNAL_TANGENT_AUTHORITY_VECTOR_REQUEST_SCHEMA;
  if (!requestPresent) {
    return {
      artifact_status: "fail_closed_missing_internal_tangent_authority_vector_request",
      source_status: "source_acquisition_blocked",
      first_missing_object: "central_solver_internal_tangent_authority_vector_request",
      first_missing_field: "central_solver_retained_history_row.internal_tangent_authority_vector_request",
      reason: "internal_tangent_authority_vector_request_missing",
    };
  }
  if (retainedRecordId == null) {
    return {
      artifact_status: "fail_closed_missing_retained_record_id",
      source_status: "source_acquisition_blocked",
      first_missing_object: "central_solver_retained_history_row",
      first_missing_field: "central_solver_retained_history_row.retained_record_request.retained_record_id",
      reason: "retained_record_id_missing",
    };
  }
  if (minimumGainEvaluations.length === 0) {
    return {
      artifact_status: "fail_closed_missing_minimum_norm_retained_history_gain_rows",
      source_status: "source_acquisition_blocked",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: FIRST_MISSING_FIELD,
      reason: "minimum_norm_retained_history_gain_witness_rows_missing",
    };
  }
  const minimumGainPass = minimumGainEvaluations.some(
    (evaluation) =>
      evaluation.mathematical_gain_conditions_passed === true &&
      evaluation.request_retained_record_binding_passed === true
  );
  if (!minimumGainPass) {
    return {
      artifact_status: "fail_closed_minimum_norm_retained_history_gain_rows_failed",
      source_status: "source_acquisition_blocked",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field:
        "central_solver_internal_tangent_authority_vector_rows.minimum_norm_retained_history_gain_witness_rows[*].mathematical_gain_conditions_passed",
      reason: "minimum_norm_retained_history_gain_witness_rows_failed_or_not_bound_to_request",
    };
  }
  if (vectorEvaluations.length === 0) {
    return {
      artifact_status: "minimum_gain_passed_retained_solver_vector_witness_missing",
      source_status: "source_acquisition_blocked",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field:
        "central_solver_internal_tangent_authority_vector_rows.retained_solver_vector_witness_rows",
      reason: "retained_solver_vector_witness_rows_missing_after_minimum_gain_pass",
    };
  }
  const vectorPass = vectorEvaluations.some(
    (evaluation) =>
      evaluation.mathematical_witness_conditions_passed === true &&
      evaluation.request_retained_record_binding_passed === true
  );
  if (!vectorPass) {
    return {
      artifact_status: "fail_closed_retained_solver_vector_witness_rows_failed",
      source_status: "source_acquisition_blocked",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field:
        "central_solver_internal_tangent_authority_vector_rows.retained_solver_vector_witness_rows[*].mathematical_witness_conditions_passed",
      reason: "retained_solver_vector_witness_rows_failed_or_not_bound_to_request",
    };
  }
  if (preferredCurveEvaluations.length === 0) {
    return {
      artifact_status: "minimum_gain_and_vector_pass_preferred_curve_equation_missing",
      source_status: "source_acquisition_blocked",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: PREFERRED_CURVE_EQUATION_FIRST_MISSING_FIELD,
      reason: "preferred_curve_internal_tangent_authority_equation_missing_after_vector_pass",
    };
  }
  const preferredCurvePass = preferredCurveEvaluations.some(
    (evaluation) =>
      evaluation.mathematical_preferred_curve_equation_passed === true &&
      evaluation.request_retained_record_binding_passed === true
  );
  const preferredCurveMathPassWithoutResidual = preferredCurveEvaluations.some(
    (evaluation) =>
      evaluation.core_mathematical_preferred_curve_equation_passed === true &&
      evaluation.branch_clock_lock_replacement_residual_passed !== true
  );
  if (preferredCurveMathPassWithoutResidual) {
    return {
      artifact_status: "fail_closed_preferred_curve_branch_clock_lock_replacement_residual_failed",
      source_status: "source_acquisition_blocked",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field:
        "central_solver_internal_tangent_authority_vector_rows.preferred_curve_internal_tangent_authority_equation_artifacts[*].branch_clock_lock_replacement_residual.replacement_residual_passed",
      reason: "preferred_curve_branch_clock_lock_replacement_residual_failed",
    };
  }
  if (!preferredCurvePass) {
    return {
      artifact_status: "fail_closed_preferred_curve_internal_tangent_authority_equation_failed",
      source_status: "source_acquisition_blocked",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: PREFERRED_CURVE_EQUATION_FIRST_MISSING_FIELD,
      reason: "preferred_curve_internal_tangent_authority_equation_failed_or_not_bound_to_request",
    };
  }
  if (rootDetailEvaluation?.row_count === 0) {
    return {
      artifact_status: "preferred_curve_passed_retained_root_ledger_detail_rows_missing",
      source_status: "source_acquisition_blocked",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: RETAINED_ROOT_LEDGER_DETAIL_FIRST_MISSING_FIELD,
      reason: "retained_root_ledger_detail_rows_missing_after_preferred_curve_pass",
    };
  }
  if (rootDetailEvaluation?.mathematical_root_differential_conditions_passed !== true) {
    return {
      artifact_status: "fail_closed_retained_root_ledger_detail_rows_failed",
      source_status: "source_acquisition_blocked",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: rootDetailEvaluation?.first_missing_field ?? RETAINED_ROOT_LEDGER_DETAIL_FIRST_MISSING_FIELD,
      reason: "retained_root_ledger_detail_rows_failed_or_not_bound_to_request",
    };
  }
  if (actionClosureEvaluation?.row_count === 0) {
    return {
      artifact_status: "preferred_curve_passed_same_record_action_closure_rows_missing",
      source_status: "source_acquisition_blocked",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: SAME_RECORD_ACTION_CLOSURE_FIRST_MISSING_FIELD,
      reason: "same_record_action_closure_rows_missing_after_preferred_curve_pass",
    };
  }
  if (actionClosureEvaluation?.mathematical_action_closure_conditions_passed !== true) {
    return {
      artifact_status: "fail_closed_same_record_action_closure_rows_failed",
      source_status: "source_acquisition_blocked",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field:
        actionClosureEvaluation?.first_missing_field ?? SAME_RECORD_ACTION_CLOSURE_FIRST_MISSING_FIELD,
      reason: "same_record_action_closure_rows_failed_or_not_bound_to_request",
    };
  }
  if (sameRecordBridgeBinding?.source_row_id_binding_available !== true) {
    return {
      artifact_status: "fail_closed_same_record_source_row_binding_missing",
      source_status: "source_acquisition_blocked",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field:
        "central_solver_internal_tangent_authority_vector_rows.same_record_source_row_binding",
      reason: "minimum_gain_vector_preferred_curve_root_detail_and_action_rows_do_not_share_source_row_id",
    };
  }
  return {
    artifact_status: "same_record_preferred_curve_internal_tangent_authority_equation_mathematical_pass_acceptance_blocked",
    source_status: "candidate_same_record_preferred_curve_equation_unaccepted",
    first_missing_object: "central_solver_internal_tangent_authority_vector_rows_acceptance_certificate",
    first_missing_field: ACCEPTANCE_CERTIFICATE_FIELD,
    reason: "mathematical_preferred_curve_internal_tangent_authority_equation_passes_but_acceptance_certificate_missing",
  };
}

export function evaluateCentralSolverInternalTangentAuthorityVectorRowsEvidence(candidate = {}) {
  const evidenceClass = candidate.evidence_class ?? candidate.authority_class ?? candidate.source_class ?? null;
  if (evidenceClass && NEGATIVE_CONTROL_REASONS[evidenceClass]) {
    return {
      accepted: false,
      reason: NEGATIVE_CONTROL_REASONS[evidenceClass],
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (candidate.schema !== SCHEMA) {
    return {
      accepted: false,
      reason: "schema_not_central_solver_internal_tangent_authority_vector_rows_v0",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  return {
    accepted: false,
    reason: "producer_does_not_authorize_internal_tangent_authority_vector_rows_evidence",
    first_missing_field: ACCEPTANCE_CERTIFICATE_FIELD,
  };
}

export function buildCentralSolverInternalTangentAuthorityVectorRows(input = {}) {
  const retainedHistoryRow = input.retainedHistoryRow ?? buildCentralSolverRetainedHistoryRow();
  const retainedRecordId = retainedRecordIdFromRow(retainedHistoryRow);
  const request = requestFromRow(retainedHistoryRow);
  const sameRecordAcceptedEvidence = pickSameRecordAcceptedEvidence(input);
  const minimumGainRows = [
    ...normalizeRows(input.minimumNormRetainedHistoryGainWitnessRows),
    ...normalizeRows(input.minimum_norm_retained_history_gain_witness_rows),
  ];
  const vectorRows = [
    ...normalizeRows(input.retainedSolverVectorWitnessRows),
    ...normalizeRows(input.retained_solver_vector_witness_rows),
  ];
  const preferredCurveEquationArtifacts = [
    ...normalizeRows(input.preferredCurveInternalTangentAuthorityEquationArtifacts),
    ...normalizeRows(input.preferred_curve_internal_tangent_authority_equation_artifacts),
  ];
  const retainedRootLedgerDetailRows = [
    ...normalizeRows(input.sameRecordRetainedRootLedgerDetailRows),
    ...normalizeRows(input.same_record_retained_root_ledger_detail_rows),
  ];
  const sameRecordActionClosureRows = [
    ...normalizeRows(input.sameRecordActionClosureRows),
    ...normalizeRows(input.same_record_action_closure_rows),
  ];
  const minimumGainEvaluations = minimumGainRows
    .map((row) => evaluateMinimumNormRetainedHistoryGainWitnessRow(row))
    .map((evaluation) => addRequestBinding(evaluation, retainedRecordId));
  const vectorEvaluations = vectorRows
    .map((row) => evaluateRetainedSolverVectorProviderWitnessRow(row))
    .map((evaluation) => addRequestBinding(evaluation, retainedRecordId));
  const preferredCurveEvaluations = preferredCurveEquationArtifacts
    .map((artifact) => evaluatePreferredCurveEquationArtifact(artifact, retainedRecordId));
  const rootDetailEvaluation = evaluateSameRecordRetainedRootLedgerDetailRows(
    retainedRootLedgerDetailRows,
    retainedRecordId
  );
  const actionClosureEvaluation = evaluateSameRecordActionClosureRows(
    sameRecordActionClosureRows,
    retainedRecordId
  );
  const artifactHash = stableHash({
    schema: SCHEMA,
    retained_history_row: {
      row_id: retainedHistoryRow?.row_id ?? null,
      artifact_hash: retainedHistoryRow?.artifact_hash ?? null,
      retained_record_id: retainedRecordId,
      request_schema: request?.schema ?? null,
      request_id: request?.request_id ?? null,
    },
    minimum_gain_rows: minimumGainRows.map(sourceRowSummary),
    vector_rows: vectorRows.map(sourceRowSummary),
    retained_root_ledger_detail_rows: retainedRootLedgerDetailRows.map(sourceRowSummary),
    same_record_action_closure_rows: sameRecordActionClosureRows.map(sourceRowSummary),
    preferred_curve_equation_artifacts: preferredCurveEquationArtifacts.map((artifact) => ({
      schema: artifact?.schema ?? null,
      artifact_id: artifact?.artifact_id ?? null,
      artifact_hash: artifact?.artifact_hash ?? null,
      source_row_id: artifact?.source_preferred_curve_row?.source_row_id ?? null,
      retained_record_id: artifact?.minimum_norm_retained_history_gain_evaluation?.retained_record_id ?? null,
    })),
  });
  const mathematicalVectorBridgePassed =
    minimumGainEvaluations.some(
      (evaluation) =>
        evaluation.mathematical_gain_conditions_passed === true &&
        evaluation.request_retained_record_binding_passed === true
    ) &&
    vectorEvaluations.some(
      (evaluation) =>
        evaluation.mathematical_witness_conditions_passed === true &&
        evaluation.request_retained_record_binding_passed === true
    );
  const sameRecordBridgeBinding = summarizeSameRecordBridgeBinding({
    retainedRecordId,
    minimumGainEvaluations,
    vectorEvaluations,
    preferredCurveEvaluations,
    rootDetailEvaluation,
    actionClosureEvaluation,
  });
  const mathematicalPreferredCurveBridgePassed =
    mathematicalVectorBridgePassed &&
    rootDetailEvaluation.mathematical_root_differential_conditions_passed === true &&
    actionClosureEvaluation.mathematical_action_closure_conditions_passed === true &&
    sameRecordBridgeBinding.source_row_id_binding_available === true &&
    preferredCurveEvaluations.some(
      (evaluation) =>
        evaluation.mathematical_preferred_curve_equation_passed === true &&
        evaluation.branch_clock_lock_replacement_residual_passed === true &&
        evaluation.request_retained_record_binding_passed === true
    );
  const missing = firstMissing({
    retainedRecordId,
    request,
    minimumGainEvaluations,
    vectorEvaluations,
    preferredCurveEvaluations,
    rootDetailEvaluation,
    actionClosureEvaluation,
    sameRecordBridgeBinding,
  });
  const acceptedBridgeCriterion = evaluateAcceptedBridgeEvidenceCriterion({
    mathematicalBridgePassed: mathematicalPreferredCurveBridgePassed,
    sameRecordAcceptedEvidence,
    sameRecordBridgeBinding,
  });

  return {
    schema: SCHEMA,
    artifact_id: `${SCHEMA}:${artifactHash.slice(0, 16)}`,
    artifact_hash: artifactHash,
    source_retained_history_row: {
      schema: retainedHistoryRow?.schema ?? null,
      row_id: retainedHistoryRow?.row_id ?? null,
      artifact_hash: retainedHistoryRow?.artifact_hash ?? null,
      retained_record_id: retainedRecordId,
      provider_object_ref: retainedHistoryRow?.provider_provenance?.provider_object_ref ?? null,
      internal_tangent_authority_vector_request_schema: request?.schema ?? null,
      internal_tangent_authority_vector_request_id: request?.request_id ?? null,
    },
    internal_tangent_authority_vector_request: request,
    minimum_norm_retained_history_gain_witness_rows: minimumGainRows,
    retained_solver_vector_witness_rows: vectorRows,
    same_record_retained_root_ledger_detail_rows: retainedRootLedgerDetailRows,
    same_record_action_closure_rows: sameRecordActionClosureRows,
    preferred_curve_internal_tangent_authority_equation_artifacts: preferredCurveEquationArtifacts,
    same_record_accepted_evidence: sameRecordAcceptedEvidence,
    minimum_norm_retained_history_gain_witness_evaluations: minimumGainEvaluations,
    retained_solver_vector_witness_evaluations: vectorEvaluations,
    same_record_retained_root_ledger_detail_rows_evaluation: rootDetailEvaluation,
    same_record_action_closure_rows_evaluation: actionClosureEvaluation,
    preferred_curve_internal_tangent_authority_equation_evaluations: preferredCurveEvaluations,
    accepted_internal_tangent_authority_bridge_criterion: acceptedBridgeCriterion,
    summary: {
      retained_record_id: retainedRecordId,
      request_present: request?.schema === INTERNAL_TANGENT_AUTHORITY_VECTOR_REQUEST_SCHEMA,
      minimum_gain_witness_row_count: minimumGainEvaluations.length,
      minimum_gain_witness_mathematical_pass_count: countPassed(
        minimumGainEvaluations,
        (evaluation) => evaluation.mathematical_gain_conditions_passed === true
      ),
      minimum_gain_witness_request_binding_pass_count: countPassed(
        minimumGainEvaluations,
        (evaluation) => evaluation.request_retained_record_binding_passed === true
      ),
      retained_solver_vector_witness_row_count: vectorEvaluations.length,
      retained_solver_vector_witness_mathematical_pass_count: countPassed(
        vectorEvaluations,
        (evaluation) => evaluation.mathematical_witness_conditions_passed === true
      ),
      retained_solver_vector_witness_request_binding_pass_count: countPassed(
        vectorEvaluations,
        (evaluation) => evaluation.request_retained_record_binding_passed === true
      ),
      preferred_curve_equation_artifact_count: preferredCurveEvaluations.length,
      preferred_curve_equation_core_mathematical_pass_count: countPassed(
        preferredCurveEvaluations,
        (evaluation) => evaluation.core_mathematical_preferred_curve_equation_passed === true
      ),
      preferred_curve_equation_mathematical_pass_count: countPassed(
        preferredCurveEvaluations,
        (evaluation) => evaluation.mathematical_preferred_curve_equation_passed === true
      ),
      preferred_curve_equation_request_binding_pass_count: countPassed(
        preferredCurveEvaluations,
        (evaluation) => evaluation.request_retained_record_binding_passed === true
      ),
      preferred_curve_branch_clock_lock_replacement_residual_pass_count: countPassed(
        preferredCurveEvaluations,
        (evaluation) => evaluation.branch_clock_lock_replacement_residual_passed === true
      ),
      retained_root_detail_row_count: rootDetailEvaluation.row_count,
      retained_root_detail_valid_row_count: rootDetailEvaluation.valid_row_count,
      retained_root_detail_same_record_binding_pass_count: rootDetailEvaluation.same_record_binding_pass_count,
      retained_root_detail_differential_passed:
        rootDetailEvaluation.mathematical_root_differential_conditions_passed,
      retained_root_detail_source_row_ids: rootDetailEvaluation.source_row_ids,
      same_record_action_closure_row_count: actionClosureEvaluation.row_count,
      same_record_action_closure_valid_row_count: actionClosureEvaluation.valid_row_count,
      same_record_action_closure_binding_pass_count: actionClosureEvaluation.same_record_binding_pass_count,
      same_record_action_closure_passed:
        actionClosureEvaluation.mathematical_action_closure_conditions_passed,
      same_record_action_closure_source_row_ids: actionClosureEvaluation.source_row_ids,
      same_record_bridge_source_row_ids: sameRecordBridgeBinding.candidate_source_row_ids,
      mathematical_internal_tangent_authority_vector_bridge_passed: mathematicalVectorBridgePassed,
      mathematical_internal_tangent_authority_bridge_passed: mathematicalPreferredCurveBridgePassed,
      accepted_internal_tangent_authority_bridge_criterion_passed:
        acceptedBridgeCriterion.accepted_bridge_criterion_passed,
      same_record_accepted_evidence_binding_passed:
        acceptedBridgeCriterion.same_record_ref_binding.same_record_ref_binding_passed,
      accepted_internal_tangent_authority_count: 0,
    },
    artifact_status: missing.artifact_status,
    source_status: missing.source_status,
    first_missing_object: missing.first_missing_object,
    first_missing_field: missing.first_missing_field,
    evidence_evaluation: {
      accepted: false,
      reason: missing.reason,
      first_missing_field: missing.first_missing_field,
    },
    acceptance_boundary:
      "same-record preferred-curve mathematical pass is still not accepted internal tangent authority without the central retained-history acceptance certificate, retained-root ledger, action closure, wake history, path history, and provider provenance",
    accepted_internal_tangent_authority_ref: null,
    accepted: false,
    authorization: makeAuthorization(),
    negative_controls: Object.entries(NEGATIVE_CONTROL_REASONS).map(([evidence_class, reason]) => ({
      evidence_class,
      accepted: false,
      reason,
    })),
  };
}

export function validateCentralSolverInternalTangentAuthorityVectorRows(artifact) {
  const errors = [];
  if (artifact?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (
    artifact?.internal_tangent_authority_vector_request?.schema !==
    INTERNAL_TANGENT_AUTHORITY_VECTOR_REQUEST_SCHEMA
  ) {
    errors.push(`request must use ${INTERNAL_TANGENT_AUTHORITY_VECTOR_REQUEST_SCHEMA}`);
  }
  if (!Array.isArray(artifact?.minimum_norm_retained_history_gain_witness_evaluations)) {
    errors.push("minimum gain witness evaluations must be an array");
  }
  if (!Array.isArray(artifact?.retained_solver_vector_witness_evaluations)) {
    errors.push("retained solver vector witness evaluations must be an array");
  }
  if (
    artifact?.same_record_retained_root_ledger_detail_rows_evaluation?.schema !==
    "same_record_retained_root_ledger_detail_rows_evaluation.v0"
  ) {
    errors.push("retained-root ledger detail rows evaluation must be present");
  }
  if (
    artifact?.same_record_action_closure_rows_evaluation?.schema !==
    "same_record_action_closure_rows_evaluation.v0"
  ) {
    errors.push("same-record action closure rows evaluation must be present");
  }
  if (!Array.isArray(artifact?.preferred_curve_internal_tangent_authority_equation_evaluations)) {
    errors.push("preferred-curve equation evaluations must be an array");
  }
  if (artifact?.accepted !== false) {
    errors.push("artifact must remain non-authorizing");
  }
  if (artifact?.accepted_internal_tangent_authority_ref !== null) {
    errors.push("accepted_internal_tangent_authority_ref must remain null");
  }
  if (artifact?.summary?.accepted_internal_tangent_authority_count !== 0) {
    errors.push("accepted internal tangent-authority count must remain zero");
  }
  if (
    artifact?.artifact_status ===
      "same_record_preferred_curve_internal_tangent_authority_equation_mathematical_pass_acceptance_blocked" &&
    artifact?.summary?.mathematical_internal_tangent_authority_bridge_passed !== true
  ) {
    errors.push("preferred-curve mathematical-pass status requires mathematical bridge pass");
  }
  for (const evaluation of artifact?.minimum_norm_retained_history_gain_witness_evaluations ?? []) {
    if (evaluation.accepted !== false) {
      errors.push("minimum gain evaluations must remain non-authorizing");
    }
  }
  for (const evaluation of artifact?.retained_solver_vector_witness_evaluations ?? []) {
    if (evaluation.accepted !== false) {
      errors.push("retained solver vector evaluations must remain non-authorizing");
    }
  }
  if (artifact?.same_record_retained_root_ledger_detail_rows_evaluation?.accepted !== false) {
    errors.push("retained-root detail rows evaluation must remain non-authorizing");
  }
  for (const evaluation of artifact?.same_record_retained_root_ledger_detail_rows_evaluation?.row_evaluations ?? []) {
    if (evaluation.accepted !== false) {
      errors.push("retained-root detail row evaluations must remain non-authorizing");
    }
  }
  if (artifact?.same_record_action_closure_rows_evaluation?.accepted !== false) {
    errors.push("same-record action closure rows evaluation must remain non-authorizing");
  }
  for (const evaluation of artifact?.same_record_action_closure_rows_evaluation?.row_evaluations ?? []) {
    if (evaluation.accepted !== false) {
      errors.push("same-record action closure row evaluations must remain non-authorizing");
    }
  }
  for (const evaluation of artifact?.preferred_curve_internal_tangent_authority_equation_evaluations ?? []) {
    if (evaluation.accepted !== false) {
      errors.push("preferred-curve equation evaluations must remain non-authorizing");
    }
  }
  if (artifact?.accepted_internal_tangent_authority_bridge_criterion?.accepted !== false) {
    errors.push("accepted bridge criterion must remain non-authorizing");
  }
  if (
    artifact?.summary?.accepted_internal_tangent_authority_bridge_criterion_passed === true &&
    artifact?.accepted_internal_tangent_authority_bridge_criterion?.can_replace_assigned_branch_clock_lock !==
      "conditional_on_external_accepted_authority"
  ) {
    errors.push("accepted bridge criterion pass must remain conditional on external accepted authority");
  }
  if (
    artifact?.summary?.accepted_internal_tangent_authority_bridge_criterion_passed === true &&
    artifact?.accepted_internal_tangent_authority_bridge_criterion?.same_record_ref_binding
      ?.same_record_ref_binding_passed !== true
  ) {
    errors.push("accepted bridge criterion pass requires retained-record and source-row binding");
  }
  if (
    artifact?.summary?.mathematical_internal_tangent_authority_bridge_passed === true &&
    artifact?.summary?.preferred_curve_branch_clock_lock_replacement_residual_pass_count < 1
  ) {
    errors.push("mathematical bridge pass requires a preferred-curve replacement residual pass");
  }
  if (
    artifact?.summary?.mathematical_internal_tangent_authority_bridge_passed === true &&
    artifact?.same_record_retained_root_ledger_detail_rows_evaluation
      ?.mathematical_root_differential_conditions_passed !== true
  ) {
    errors.push("mathematical bridge pass requires retained-root detail differential rows");
  }
  if (
    artifact?.summary?.mathematical_internal_tangent_authority_bridge_passed === true &&
    artifact?.same_record_action_closure_rows_evaluation
      ?.mathematical_action_closure_conditions_passed !== true
  ) {
    errors.push("mathematical bridge pass requires same-record action closure rows");
  }
  if (
    artifact?.summary?.mathematical_internal_tangent_authority_bridge_passed === true &&
    !(artifact?.summary?.same_record_bridge_source_row_ids?.length > 0)
  ) {
    errors.push("mathematical bridge pass requires a shared source row across all bridge row families");
  }
  for (const flag of AUTHORIZATION_FLAGS) {
    if (artifact?.authorization?.[flag] !== false) {
      errors.push(`${flag} must remain false`);
    }
  }
  if (artifact?.authorization?.scoreMovement !== "no_score_increase") {
    errors.push("scoreMovement must remain no_score_increase");
  }
  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    const result = evaluateCentralSolverInternalTangentAuthorityVectorRowsEvidence({ evidence_class: evidenceClass });
    if (result.accepted || result.reason !== reason) {
      errors.push(`${evidenceClass} negative control must reject as ${reason}`);
    }
  }
  return errors;
}

function runCli() {
  const artifact = buildCentralSolverInternalTangentAuthorityVectorRows();
  const errors = validateCentralSolverInternalTangentAuthorityVectorRows(artifact);
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
