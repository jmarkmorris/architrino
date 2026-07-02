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
  const candidateSourceRowIds = intersectStrings(
    intersectStrings(minimumGainSourceRowIds, vectorSourceRowIds),
    preferredCurveSourceRowIds
  );

  return {
    request_retained_record_id: retainedRecordId,
    retained_record_id_binding_available: retainedRecordId != null,
    minimum_gain_source_row_ids: minimumGainSourceRowIds,
    retained_solver_vector_source_row_ids: vectorSourceRowIds,
    preferred_curve_source_row_ids: preferredCurveSourceRowIds,
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

function firstMissing({ retainedRecordId, request, minimumGainEvaluations, vectorEvaluations, preferredCurveEvaluations }) {
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
  const minimumGainEvaluations = minimumGainRows
    .map((row) => evaluateMinimumNormRetainedHistoryGainWitnessRow(row))
    .map((evaluation) => addRequestBinding(evaluation, retainedRecordId));
  const vectorEvaluations = vectorRows
    .map((row) => evaluateRetainedSolverVectorProviderWitnessRow(row))
    .map((evaluation) => addRequestBinding(evaluation, retainedRecordId));
  const preferredCurveEvaluations = preferredCurveEquationArtifacts
    .map((artifact) => evaluatePreferredCurveEquationArtifact(artifact, retainedRecordId));
  const missing = firstMissing({
    retainedRecordId,
    request,
    minimumGainEvaluations,
    vectorEvaluations,
    preferredCurveEvaluations,
  });
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
  const mathematicalPreferredCurveBridgePassed =
    mathematicalVectorBridgePassed &&
    preferredCurveEvaluations.some(
      (evaluation) =>
        evaluation.mathematical_preferred_curve_equation_passed === true &&
        evaluation.branch_clock_lock_replacement_residual_passed === true &&
        evaluation.request_retained_record_binding_passed === true
    );
  const sameRecordBridgeBinding = summarizeSameRecordBridgeBinding({
    retainedRecordId,
    minimumGainEvaluations,
    vectorEvaluations,
    preferredCurveEvaluations,
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
    preferred_curve_internal_tangent_authority_equation_artifacts: preferredCurveEquationArtifacts,
    same_record_accepted_evidence: sameRecordAcceptedEvidence,
    minimum_norm_retained_history_gain_witness_evaluations: minimumGainEvaluations,
    retained_solver_vector_witness_evaluations: vectorEvaluations,
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
