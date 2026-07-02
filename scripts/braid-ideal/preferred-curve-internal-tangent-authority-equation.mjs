import crypto from "node:crypto";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

import {
  RETAINED_HISTORY_MINIMUM_GAIN_WITNESS_ROW_SCHEMA,
  RETAINED_HISTORY_MINIMUM_GAIN_WITNESS_SCHEMA,
  evaluateMinimumNormRetainedHistoryGainWitnessRow,
} from "./oblate-spheroid-internal-tangent-authority-certificate.mjs";

export const SCHEMA = "preferred_curve_internal_tangent_authority_equation.v0";
export const FIRST_MISSING_OBJECT = "same_record_preferred_curve_internal_tangent_authority_equation";
export const FIRST_MISSING_FIELD =
  "preferred_curve_internal_tangent_authority_equation.minimum_norm_retained_history_gain_witness_row";
export const ACCEPTANCE_CERTIFICATE_FIELD =
  "preferred_curve_internal_tangent_authority_equation.acceptance_certificate_ref";

export const NEGATIVE_CONTROL_REASONS = Object.freeze({
  fixture: "fixture_not_accepted_preferred_curve_internal_tangent_authority_evidence",
  diagnostic: "diagnostic_not_accepted_preferred_curve_internal_tangent_authority_evidence",
  priority_prose: "priority_prose_not_accepted_preferred_curve_internal_tangent_authority_evidence",
  generated_decoy: "generated_decoy_not_accepted_preferred_curve_internal_tangent_authority_evidence",
  proxy_row: "proxy_row_not_accepted_preferred_curve_internal_tangent_authority_evidence",
  candidate_ref: "candidate_ref_not_accepted_preferred_curve_internal_tangent_authority_evidence",
  aggregate_row: "aggregate_row_not_same_record_preferred_curve_internal_tangent_authority_evidence",
  source_contract_shell: "source_contract_shell_not_accepted_preferred_curve_internal_tangent_authority_evidence",
  temp_probe: "temp_probe_not_accepted_preferred_curve_internal_tangent_authority_evidence",
  assigned_clock_lock: "assigned_clock_lock_not_internal_tangent_authority_evidence",
  endpoint_only_row: "endpoint_only_row_not_preferred_curve_internal_tangent_authority_evidence",
});

const EPSILON = 1e-12;
const DEFAULT_BINDING_TOLERANCE = 1e-9;

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
]);

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function finiteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function vectorNorm(vector) {
  if (!Array.isArray(vector)) {
    return null;
  }
  const entries = vector.map(finiteNumber);
  if (entries.some((entry) => entry == null)) {
    return null;
  }
  return Math.sqrt(entries.reduce((sum, entry) => sum + entry * entry, 0));
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function preferredCurveCandidateRowFromCertificate(certificate = {}) {
  const rows = certificate.near_edge_candidate_rows;
  if (!Array.isArray(rows) || rows.length === 0) {
    return null;
  }
  return rows.find(
    (row) =>
      row?.branch_curve_status?.preferred_branch_curve_selected === true ||
      row?.preferred_branch_curve_selected === true
  ) ?? rows[0];
}

function pickNearEdgeCandidateRow(input = {}) {
  return input.nearEdgeCandidateRow ??
    input.near_edge_candidate_row ??
    input.preferredCurveCandidateRow ??
    input.preferred_curve_candidate_row ??
    preferredCurveCandidateRowFromCertificate(input.nearEdgeCertificate) ??
    preferredCurveCandidateRowFromCertificate(input.near_edge_certificate) ??
    null;
}

function pickMinimumGainWitnessRow(input = {}) {
  return input.minimumNormRetainedHistoryGainWitnessRow ??
    input.minimum_norm_retained_history_gain_witness_row ??
    input.minimumNormRetainedHistoryGainWitnessRows?.[0] ??
    input.minimum_norm_retained_history_gain_witness_rows?.[0] ??
    null;
}

function derivativeValue(row, field) {
  const derivative = row?.finite_difference?.[field];
  if (derivative?.status !== "central_difference") {
    return null;
  }
  return finiteNumber(derivative.value);
}

function curveDynamicRootMargin(row = {}) {
  return finiteNumber(
    row.dynamic_return_status?.dynamic_root_margin ??
      row.local_values?.dynamic_root_margin ??
      row.local_values?.root_budget_margin
  );
}

function branchClockLockRms(row = {}) {
  return finiteNumber(
    row.branch_curve_status?.branch_clock_lock_rms_acceleration ??
      row.assigned_branch_clock_lock_term?.rms_acceleration
  );
}

function curveSourceRowId(row = {}) {
  return row.source_row_id ?? row.row_id ?? null;
}

function addMissing(missingFields, condition, field) {
  if (condition) {
    missingFields.push(field);
  }
}

function buildCurveDifferential(row) {
  const missingFields = [];
  if (!row) {
    return {
      preferred_curve_differential_passed: false,
      reason: "preferred_curve_candidate_row_missing",
      missing_fields: [
        "oblate_spheroid_near_edge_basin_certificate.near_edge_candidate_rows",
      ],
    };
  }

  const dEDu = derivativeValue(row, "dE_du");
  const dEDvOrb = derivativeValue(row, "dE_dv_orb");
  const dObjectiveDu = derivativeValue(row, "dObjective_du");
  const dObjectiveDvOrb = derivativeValue(row, "dObjective_dv_orb");
  const finiteDifferenceComplete = row.finite_difference?.finite_difference_complete === true;
  const preferredBranchCurveSelected =
    row.branch_curve_status?.preferred_branch_curve_selected === true ||
    row.preferred_branch_curve_selected === true;
  const dynamicRootMargin = curveDynamicRootMargin(row);
  const dynamicBetaMax = finiteNumber(row.dynamic_return_status?.dynamic_beta_max ?? row.local_values?.beta_max);
  const dynamicBoundedReturn =
    row.dynamic_return_status?.dynamic_bounded_return === true ||
    row.dynamic_return_status?.bounded_return_observed === true;

  addMissing(
    missingFields,
    !finiteDifferenceComplete,
    "preferred_curve_candidate_row.finite_difference.finite_difference_complete"
  );
  addMissing(
    missingFields,
    dEDu == null,
    "preferred_curve_candidate_row.finite_difference.dE_du"
  );
  addMissing(
    missingFields,
    dEDvOrb == null,
    "preferred_curve_candidate_row.finite_difference.dE_dv_orb"
  );
  addMissing(
    missingFields,
    dObjectiveDu == null,
    "preferred_curve_candidate_row.finite_difference.dObjective_du"
  );
  addMissing(
    missingFields,
    dObjectiveDvOrb == null,
    "preferred_curve_candidate_row.finite_difference.dObjective_dv_orb"
  );
  addMissing(
    missingFields,
    !preferredBranchCurveSelected,
    "preferred_curve_candidate_row.branch_curve_status.preferred_branch_curve_selected"
  );
  addMissing(
    missingFields,
    !dynamicBoundedReturn,
    "preferred_curve_candidate_row.dynamic_return_status.dynamic_bounded_return"
  );
  addMissing(
    missingFields,
    dynamicRootMargin == null || dynamicRootMargin <= 0,
    "preferred_curve_candidate_row.dynamic_return_status.dynamic_root_margin"
  );
  addMissing(
    missingFields,
    dynamicBetaMax == null || dynamicBetaMax >= 1,
    "preferred_curve_candidate_row.dynamic_return_status.dynamic_beta_max"
  );

  if (missingFields.length > 0) {
    return {
      preferred_curve_differential_passed: false,
      reason: "preferred_curve_candidate_row_incomplete_or_not_admissible",
      missing_fields: missingFields,
      source_row_id: curveSourceRowId(row),
      u: finiteNumber(row.u),
      v_orb: finiteNumber(row.v_orb),
      dynamic_root_margin: dynamicRootMargin,
      dynamic_beta_max: dynamicBetaMax,
    };
  }

  if (Math.abs(dObjectiveDvOrb) <= EPSILON) {
    return {
      preferred_curve_differential_passed: false,
      reason: "preferred_curve_slope_requires_nonzero_dObjective_dv_orb",
      missing_fields: [
        "preferred_curve_candidate_row.finite_difference.dObjective_dv_orb.nonzero",
      ],
      source_row_id: curveSourceRowId(row),
      u: finiteNumber(row.u),
      v_orb: finiteNumber(row.v_orb),
      dynamic_root_margin: dynamicRootMargin,
      dynamic_beta_max: dynamicBetaMax,
    };
  }

  const dvOrbDu = -dObjectiveDu / dObjectiveDvOrb;
  const tangentNorm = Math.sqrt(1 + dvOrbDu * dvOrbDu);
  return {
    preferred_curve_differential_passed: true,
    reason: "preferred_curve_stationarity_differential_available",
    source_row_id: curveSourceRowId(row),
    u: finiteNumber(row.u),
    v_orb: finiteNumber(row.v_orb),
    chi: finiteNumber(row.chi),
    dynamic_root_margin: dynamicRootMargin,
    dynamic_beta_max: dynamicBetaMax,
    branch_clock_lock_rms_acceleration: branchClockLockRms(row),
    objective_gradient: {
      dObjective_du: dObjectiveDu,
      dObjective_dv_orb: dObjectiveDvOrb,
    },
    residual_gradient: {
      dE_du: dEDu,
      dE_dv_orb: dEDvOrb,
    },
    preferred_curve_tangent: {
      stationarity_equation: "J_u + J_v v_*'(u)=0",
      dv_orb_du: dvOrbDu,
      tangent_vector: [1, dvOrbDu],
      unit_tangent_vector: [1 / tangentNorm, dvOrbDu / tangentNorm],
      objective_directional_derivative: dObjectiveDu + dObjectiveDvOrb * dvOrbDu,
      residual_directional_derivative: dEDu + dEDvOrb * dvOrbDu,
    },
  };
}

function minimumGainDynamicRootMargin(evaluation = {}) {
  return finiteNumber(evaluation.evaluation?.variables?.dynamic_root_margin);
}

function minimumGainTangentTargetNorm(evaluation = {}) {
  const tangentTargetVector =
    evaluation.evaluation?.response_evaluation?.response_vectors?.tangent_target_vector ??
    evaluation.evaluation?.response_evaluation?.least_norm_provider_evaluation?.computed?.projected_provider_tangent_vector ??
    null;
  return vectorNorm(tangentTargetVector);
}

function sameSourceBinding(curveDifferential = {}, minimumGainEvaluation = {}) {
  const curveSource = curveDifferential.source_row_id ?? null;
  const minimumGainSource = minimumGainEvaluation.source_row_id ?? null;
  return curveSource != null && minimumGainSource != null && curveSource === minimumGainSource;
}

function dynamicRootMarginBinding(curveDifferential = {}, minimumGainEvaluation = {}, tolerance) {
  const curveMargin = finiteNumber(curveDifferential.dynamic_root_margin);
  const minimumGainMargin = minimumGainDynamicRootMargin(minimumGainEvaluation);
  return (
    curveMargin != null &&
    minimumGainMargin != null &&
    curveMargin > 0 &&
    minimumGainMargin > 0 &&
    Math.abs(curveMargin - minimumGainMargin) <= tolerance
  );
}

function firstMissing({
  curveDifferential,
  minimumGainWitnessRow,
  minimumGainEvaluation,
  sameSourcePassed,
  dynamicRootMarginPassed,
}) {
  if (curveDifferential.preferred_curve_differential_passed !== true) {
    return {
      artifact_status: "fail_closed_missing_preferred_curve_differential",
      source_status: "source_acquisition_blocked",
      first_missing_object: "preferred_curve_finite_difference_row",
      first_missing_field: curveDifferential.missing_fields?.[0] ??
        "preferred_curve_candidate_row.finite_difference",
      reason: curveDifferential.reason,
    };
  }
  if (!minimumGainWitnessRow) {
    return {
      artifact_status: "fail_closed_missing_minimum_norm_retained_history_gain_witness_row",
      source_status: "source_acquisition_blocked",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: FIRST_MISSING_FIELD,
      reason: "minimum_norm_retained_history_gain_witness_row_missing",
    };
  }
  if (!sameSourcePassed) {
    return {
      artifact_status: "fail_closed_curve_and_minimum_gain_source_row_mismatch",
      source_status: "source_acquisition_blocked",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field:
        "preferred_curve_internal_tangent_authority_equation.same_source_row_id_binding",
      reason: "preferred_curve_row_and_minimum_gain_row_do_not_share_source_row_id",
    };
  }
  if (!dynamicRootMarginPassed) {
    return {
      artifact_status: "fail_closed_curve_and_minimum_gain_dynamic_root_margin_mismatch",
      source_status: "source_acquisition_blocked",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field:
        "preferred_curve_internal_tangent_authority_equation.dynamic_root_margin_binding",
      reason: "preferred_curve_row_and_minimum_gain_row_do_not_share_positive_dynamic_root_margin",
    };
  }
  if (minimumGainEvaluation.mathematical_gain_conditions_passed !== true) {
    return {
      artifact_status: "fail_closed_minimum_norm_retained_history_gain_equation_failed",
      source_status: "source_acquisition_blocked",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: minimumGainEvaluation.first_missing_field ?? FIRST_MISSING_FIELD,
      reason: "minimum_norm_retained_history_gain_equation_failed_or_unbound",
    };
  }
  return {
    artifact_status: "preferred_curve_internal_tangent_authority_equation_mathematical_pass_acceptance_blocked",
    source_status: "candidate_preferred_curve_equation_unaccepted",
    first_missing_object: "preferred_curve_internal_tangent_authority_acceptance_certificate",
    first_missing_field: ACCEPTANCE_CERTIFICATE_FIELD,
    reason: "preferred_curve_internal_tangent_authority_equation_passes_mathematically_but_acceptance_certificate_missing",
  };
}

export function evaluatePreferredCurveInternalTangentAuthorityEquationEvidence(candidate = {}) {
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
      reason: "schema_not_preferred_curve_internal_tangent_authority_equation_v0",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  return {
    accepted: false,
    reason: "producer_does_not_authorize_preferred_curve_internal_tangent_authority_evidence",
    first_missing_field: ACCEPTANCE_CERTIFICATE_FIELD,
  };
}

export function buildPreferredCurveInternalTangentAuthorityEquation(input = {}) {
  const bindingTolerance = finiteNumber(input.bindingTolerance ?? input.binding_tolerance) ?? DEFAULT_BINDING_TOLERANCE;
  const nearEdgeCandidateRow = pickNearEdgeCandidateRow(input);
  const minimumGainWitnessRow = pickMinimumGainWitnessRow(input);
  const curveDifferential = buildCurveDifferential(nearEdgeCandidateRow);
  const minimumGainEvaluation = minimumGainWitnessRow
    ? evaluateMinimumNormRetainedHistoryGainWitnessRow(minimumGainWitnessRow)
    : {
      schema: RETAINED_HISTORY_MINIMUM_GAIN_WITNESS_ROW_SCHEMA,
      accepted: false,
      mathematical_gain_conditions_passed: false,
      missing_fields: [FIRST_MISSING_FIELD],
      first_missing_field: FIRST_MISSING_FIELD,
    };
  const sameSourcePassed =
    minimumGainWitnessRow != null && sameSourceBinding(curveDifferential, minimumGainEvaluation);
  const dynamicRootMarginPassed =
    minimumGainWitnessRow != null &&
    dynamicRootMarginBinding(curveDifferential, minimumGainEvaluation, bindingTolerance);
  const missing = firstMissing({
    curveDifferential,
    minimumGainWitnessRow,
    minimumGainEvaluation,
    sameSourcePassed,
    dynamicRootMarginPassed,
  });
  const tangentTargetNorm = minimumGainTangentTargetNorm(minimumGainEvaluation);
  const branchClockRms = curveDifferential.branch_clock_lock_rms_acceleration ?? null;
  const branchClockScaleRatio =
    tangentTargetNorm == null || branchClockRms == null || Math.abs(branchClockRms) <= EPSILON
      ? null
      : tangentTargetNorm / branchClockRms;
  const mathematicalEquationPassed =
    curveDifferential.preferred_curve_differential_passed === true &&
    sameSourcePassed &&
    dynamicRootMarginPassed &&
    minimumGainEvaluation.mathematical_gain_conditions_passed === true;
  const artifactHash = stableHash({
    schema: SCHEMA,
    curve_source_row_id: curveDifferential.source_row_id ?? null,
    u: curveDifferential.u ?? null,
    v_orb: curveDifferential.v_orb ?? null,
    dv_orb_du: curveDifferential.preferred_curve_tangent?.dv_orb_du ?? null,
    retained_record_id: minimumGainEvaluation.retained_record_id ?? null,
    minimum_gain_row_id: minimumGainWitnessRow?.row_id ?? null,
    minimum_gain_source_row_id: minimumGainEvaluation.source_row_id ?? null,
    mathematical_equation_passed: mathematicalEquationPassed,
  });

  return {
    schema: SCHEMA,
    artifact_id: `${SCHEMA}:${artifactHash.slice(0, 16)}`,
    artifact_hash: artifactHash,
    authority_class: "candidate_preferred_curve_internal_tangent_authority_equation_not_accepted_evidence",
    claim_level: "candidate_mathematical_equation",
    source_preferred_curve_row: {
      schema: nearEdgeCandidateRow?.schema ?? null,
      row_id: nearEdgeCandidateRow?.row_id ?? null,
      source_row_id: curveSourceRowId(nearEdgeCandidateRow ?? {}),
      u: curveDifferential.u ?? finiteNumber(nearEdgeCandidateRow?.u),
      v_orb: curveDifferential.v_orb ?? finiteNumber(nearEdgeCandidateRow?.v_orb),
    },
    curve_differential: curveDifferential,
    curve_parameterized_equation: {
      preferred_curve_stationarity: "J_u + J_v v_*'(u)=0",
      preferred_curve_slope: "v_*'(u)=-J_u/J_v",
      tangent_target:
        "T(q)=P_T(a_ansatz(q)-a_wake(q)-a_support(q)), q=(u,v_orb)",
      retained_history_minimum_gain:
        "K_x^*(q)=-T(q)e_x^T/(||e_x||^2+||e_v||^2), K_v^*(q)=-T(q)e_v^T/(||e_x||^2+||e_v||^2)",
      retained_history_response:
        "a_RH^*(q)=-P_T(K_x^*(q)e_x+K_v^*(q)e_v)",
      tangent_null_margin_lift:
        "n_*(q)=lambda_+(q)P_NG_mu(q), lambda_+=max(0,(epsilon_mu+Delta_T||T||-m_dyn-Delta_M<T,G_mu>)/(Delta_M||P_NG_mu||^2))",
      internal_provider:
        "a_internal^*(q)=a_RH^*(q)+n_*(q)",
      positive_causal_root_margin:
        "m_dyn-Delta_T||P_Ta_internal^*||+Delta_M<a_internal^*,G_mu> >= epsilon_mu",
    },
    minimum_norm_retained_history_gain_witness_row: minimumGainWitnessRow,
    minimum_norm_retained_history_gain_evaluation: minimumGainEvaluation,
    bindings: {
      binding_tolerance: bindingTolerance,
      same_source_row_id_binding_passed: sameSourcePassed,
      dynamic_root_margin_binding_passed: dynamicRootMarginPassed,
      curve_source_row_id: curveDifferential.source_row_id ?? null,
      minimum_gain_source_row_id: minimumGainEvaluation.source_row_id ?? null,
      curve_dynamic_root_margin: curveDifferential.dynamic_root_margin ?? null,
      minimum_gain_dynamic_root_margin: minimumGainDynamicRootMargin(minimumGainEvaluation),
    },
    diagnostics: {
      tangent_target_norm: tangentTargetNorm,
      branch_clock_lock_rms_acceleration: branchClockRms,
      tangent_target_to_branch_clock_rms_ratio: branchClockScaleRatio,
      branch_clock_scale_alignment_policy:
        "diagnostic_only_because_clock_lock_rms_is_time_sampled_and_T_is_the_same-record_vector_target",
      evaluator_schema: RETAINED_HISTORY_MINIMUM_GAIN_WITNESS_SCHEMA,
      witness_row_schema: RETAINED_HISTORY_MINIMUM_GAIN_WITNESS_ROW_SCHEMA,
    },
    summary: {
      preferred_curve_differential_passed: curveDifferential.preferred_curve_differential_passed === true,
      same_source_row_id_binding_passed: sameSourcePassed,
      dynamic_root_margin_binding_passed: dynamicRootMarginPassed,
      minimum_gain_mathematical_passed:
        minimumGainEvaluation.mathematical_gain_conditions_passed === true,
      mathematical_preferred_curve_internal_tangent_authority_equation_passed:
        mathematicalEquationPassed,
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
      "curve-parameterized equation is a mathematical pass marker only; replacing the assigned branch-clock lock still requires accepted central retained-history evidence, retained-root ledger, action closure, wake history, path history, provider provenance, and an acceptance certificate",
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

export function validatePreferredCurveInternalTangentAuthorityEquation(artifact) {
  const errors = [];
  if (artifact?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
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
      "preferred_curve_internal_tangent_authority_equation_mathematical_pass_acceptance_blocked" &&
    artifact?.summary?.mathematical_preferred_curve_internal_tangent_authority_equation_passed !== true
  ) {
    errors.push("mathematical-pass status requires preferred-curve equation pass");
  }
  if (
    artifact?.summary?.mathematical_preferred_curve_internal_tangent_authority_equation_passed === true &&
    artifact?.first_missing_field !== ACCEPTANCE_CERTIFICATE_FIELD
  ) {
    errors.push("mathematical preferred-curve pass must remain acceptance-certificate blocked");
  }
  if (artifact?.minimum_norm_retained_history_gain_evaluation?.accepted !== false) {
    errors.push("minimum gain evaluation must remain non-authorizing");
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
    const result = evaluatePreferredCurveInternalTangentAuthorityEquationEvidence({
      evidence_class: evidenceClass,
    });
    if (result.accepted || result.reason !== reason) {
      errors.push(`${evidenceClass} negative control must reject as ${reason}`);
    }
  }
  return errors;
}

function runCli() {
  const inputPath = process.argv.find((arg) => arg.startsWith("--input="))?.slice("--input=".length);
  const input = inputPath ? JSON.parse(fs.readFileSync(inputPath, "utf8")) : {};
  const artifact = buildPreferredCurveInternalTangentAuthorityEquation(input);
  const errors = validatePreferredCurveInternalTangentAuthorityEquation(artifact);
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
