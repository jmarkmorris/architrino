import crypto from "node:crypto";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

export const SCHEMA = "oblate_spheroid_branch_clock_lock_target.v0";
export const FIRST_MISSING_OBJECT = "internal_retained_history_tangent_authority_for_preferred_branch_curve";
export const FIRST_MISSING_FIELD =
  "oblate_spheroid_branch_clock_lock_target.rows[*].internal_tangent_authority_ref";
export const RETAINED_ROOT_LEDGER_BLOCKER = "same_record_retained_root_ledger_for_two_speed_deformation_sweep";

const DEFAULT_NEAR_EDGE_DYNAMIC_ROOT_MARGIN = 0.01;
const EPSILON = 1e-12;

const AUTHORIZATION_FLAGS = Object.freeze([
  "accepted_same_record_evidence",
  "retainedBranchClaim",
  "acceptedSameLevelBranchClaim",
  "preferred_configuration_claim",
  "accepted_transition_source",
  "moving_retained_branch_certificate",
  "same_ledger_action_measure_row",
  "bounded_speed_live_ledger",
  "receiver_normal_branch_strength",
  "internal_tangent_authority_derived",
]);

export const NEGATIVE_CONTROL_REASONS = Object.freeze({
  fixture: "fixture_not_accepted_branch_clock_lock_target_evidence",
  diagnostic: "diagnostic_not_accepted_branch_clock_lock_target_evidence",
  dirty_priority_prose: "dirty_priority_prose_not_accepted_branch_clock_lock_target_evidence",
  generated_decoy: "generated_decoy_not_accepted_branch_clock_lock_target_evidence",
  proxy_row: "proxy_row_not_accepted_branch_clock_lock_target_evidence",
  candidate_ref: "candidate_ref_not_accepted_branch_clock_lock_target_evidence",
  aggregate_row: "aggregate_row_not_same_record_branch_clock_lock_target_evidence",
  source_contract_shell: "source_contract_shell_not_accepted_branch_clock_lock_target_evidence",
  temp_probe: "temp_probe_not_accepted_branch_clock_lock_target_evidence",
  assigned_clock_lock: "assigned_clock_lock_not_internal_tangent_authority_evidence",
  support_only: "support_only_not_tangent_branch_clock_lock_target_evidence",
  retained_root_ledger_placeholder: "retained_root_ledger_placeholder_not_branch_clock_lock_target_evidence",
});

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function finiteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function ratioOrNull(numerator, denominator) {
  if (numerator == null || denominator == null || Math.abs(denominator) <= EPSILON) {
    return null;
  }
  return numerator / denominator;
}

function reserveOrNull(rootMargin, authority) {
  if (rootMargin == null || authority == null) {
    return null;
  }
  return rootMargin - authority;
}

function sourceRowsById(sourceArtifact = {}) {
  return new Map((sourceArtifact.rows ?? []).map((row) => [row?.row_id, row]).filter(([rowId]) => rowId));
}

function preferredRows(sourceArtifact = {}) {
  if (Array.isArray(sourceArtifact.preferred_branch_curve_rows)) {
    return sourceArtifact.preferred_branch_curve_rows;
  }
  return [];
}

function branchStatus({ boundedReturn, dynamicRootMargin, branchClockLockActive, branchClockLockRms, nearEdge }) {
  if (!boundedReturn) {
    return "blocked_missing_bounded_dynamic_return";
  }
  if (dynamicRootMargin == null || dynamicRootMargin <= 0) {
    return "blocked_nonpositive_dynamic_root_margin";
  }
  if (!branchClockLockActive || branchClockLockRms == null || branchClockLockRms <= 0) {
    return "no_assigned_tangent_authority_measured";
  }
  if (branchClockLockRms > dynamicRootMargin) {
    return "missing_tangent_authority_exceeds_dynamic_root_margin";
  }
  if (nearEdge) {
    return "near_edge_positive_margin_with_tangent_authority";
  }
  return "positive_margin_tangent_authority_measured";
}

function rowFromPreferred(rowPrefix, preferredRow, sourceRow, nearEdgeDynamicRootMargin) {
  const probe = sourceRow?.return_status?.dynamic_return_probe ?? null;
  const supportTerm = probe?.support_term ?? null;
  const clockTerm = probe?.branch_clock_lock_term ?? null;
  const dynamicRootMargin = finiteNumber(preferredRow.dynamic_root_margin ?? probe?.root_budget_margin);
  const dynamicBetaMax = finiteNumber(preferredRow.dynamic_beta_max ?? probe?.max_field_speed);
  const branchClockLockRms = finiteNumber(
    preferredRow.branch_clock_lock_rms_acceleration ?? clockTerm?.rms_acceleration
  );
  const branchClockLockMax = finiteNumber(clockTerm?.max_acceleration);
  const supportRms = finiteNumber(preferredRow.support_rms_acceleration ?? supportTerm?.rms_acceleration);
  const supportMax = finiteNumber(supportTerm?.max_acceleration);
  const boundedReturn =
    sourceRow?.return_status?.bounded_return_observed === true ||
    probe?.bounded_return_observed === true ||
    preferredRow.position_return_rms != null;
  const branchClockLockActive = clockTerm?.active === true || branchClockLockRms != null && branchClockLockRms > 0;
  const nearEdge =
    dynamicRootMargin != null && dynamicRootMargin > 0 && dynamicRootMargin <= nearEdgeDynamicRootMargin;
  const clockToDynamicMarginRatio = ratioOrNull(branchClockLockRms, dynamicRootMargin);
  const clockMaxToDynamicMarginRatio = ratioOrNull(branchClockLockMax, dynamicRootMargin);
  const supportToDynamicMarginRatio = ratioOrNull(supportRms, dynamicRootMargin);
  const status = branchStatus({
    boundedReturn,
    dynamicRootMargin,
    branchClockLockActive,
    branchClockLockRms,
    nearEdge,
  });

  return {
    row_id: `${rowPrefix}:target:u_${Number(preferredRow.u).toFixed(6)}:v_orb_${Number(preferredRow.v_orb).toFixed(6)}`,
    schema: "oblate_spheroid_branch_clock_lock_target_row.v0",
    source_row_id: preferredRow.row_id ?? sourceRow?.row_id ?? null,
    preferred_branch_curve_selected: true,
    u: finiteNumber(preferredRow.u),
    v_orb: finiteNumber(preferredRow.v_orb),
    chi: finiteNumber(preferredRow.chi ?? sourceRow?.chi),
    volume_ratio_candidate: finiteNumber(preferredRow.volume_ratio_candidate ?? sourceRow?.volume_ratio_candidate),
    local_values: {
      normalized_residual: finiteNumber(preferredRow.normalized_residual ?? sourceRow?.residual_status?.normalized_residual),
      action_drift_to_nearest_h: finiteNumber(
        preferredRow.action_drift_to_nearest_h ?? sourceRow?.action_proxy?.action_drift_to_nearest_h
      ),
      sampled_beta_max: finiteNumber(preferredRow.sampled_beta_max ?? sourceRow?.speed_budget?.beta_max),
      sampled_root_margin: finiteNumber(preferredRow.sampled_root_margin ?? sourceRow?.speed_budget?.root_budget_margin),
      dynamic_beta_max: dynamicBetaMax,
      dynamic_root_margin: dynamicRootMargin,
      branch_curve_objective: finiteNumber(
        preferredRow.branch_curve_objective ?? sourceRow?.return_status?.branch_curve_objective
      ),
    },
    return_status: {
      bounded_return_observed: boundedReturn,
      position_return_rms: finiteNumber(preferredRow.position_return_rms ?? probe?.final_metrics?.position_return_rms),
      velocity_return_rms: finiteNumber(preferredRow.velocity_return_rms ?? probe?.final_metrics?.velocity_return_rms),
      radius_mean_deviation: finiteNumber(preferredRow.radius_mean_deviation ?? probe?.max_radius_mean_deviation),
    },
    assigned_support_term: {
      active: supportTerm?.active === true || supportRms != null && supportRms > 0,
      rms_acceleration: supportRms,
      max_acceleration: supportMax,
      authority_class: supportTerm?.authority_class ?? "priority_only_support_term_not_retained_history_evidence",
    },
    assigned_branch_clock_lock_term: {
      active: branchClockLockActive,
      rms_acceleration: branchClockLockRms,
      max_acceleration: branchClockLockMax,
      rms_tangent_position_error: finiteNumber(clockTerm?.rms_tangent_position_error),
      rms_tangent_velocity_error: finiteNumber(clockTerm?.rms_tangent_velocity_error),
      max_tangent_position_error: finiteNumber(clockTerm?.max_tangent_position_error),
      max_tangent_velocity_error: finiteNumber(clockTerm?.max_tangent_velocity_error),
      stiffness: finiteNumber(clockTerm?.stiffness),
      damping: finiteNumber(clockTerm?.damping),
      authority_class:
        clockTerm?.authority_class ?? "priority_only_branch_clock_lock_not_retained_history_evidence",
    },
    tangent_authority_target: {
      near_edge_dynamic_root_margin_threshold: nearEdgeDynamicRootMargin,
      near_edge_dynamic_root_margin: nearEdge,
      clock_to_support_rms_ratio: ratioOrNull(branchClockLockRms, supportRms),
      clock_to_dynamic_root_margin_ratio: clockToDynamicMarginRatio,
      clock_max_to_dynamic_root_margin_ratio: clockMaxToDynamicMarginRatio,
      support_to_dynamic_root_margin_ratio: supportToDynamicMarginRatio,
      dynamic_root_margin_minus_clock_rms: reserveOrNull(dynamicRootMargin, branchClockLockRms),
      dynamic_root_margin_minus_clock_max: reserveOrNull(dynamicRootMargin, branchClockLockMax),
      dimension_note: "diagnostic_ratio_only_not_dimensionally_closed_physics",
      target_status: status,
    },
    internal_tangent_authority_ref: null,
    retained_root_ledger_ref: null,
    accepted: false,
  };
}

function rowRef(row) {
  if (!row) {
    return null;
  }
  return {
    source_row_id: row.source_row_id,
    u: row.u,
    v_orb: row.v_orb,
    normalized_residual: row.local_values.normalized_residual,
    action_drift_to_nearest_h: row.local_values.action_drift_to_nearest_h,
    dynamic_beta_max: row.local_values.dynamic_beta_max,
    dynamic_root_margin: row.local_values.dynamic_root_margin,
    branch_clock_lock_rms_acceleration: row.assigned_branch_clock_lock_term.rms_acceleration,
    branch_curve_objective: row.local_values.branch_curve_objective,
    target_status: row.tangent_authority_target.target_status,
  };
}

function minBy(rows, getter) {
  return rows
    .filter((row) => getter(row) != null)
    .sort((left, right) => getter(left) - getter(right))[0] ?? null;
}

function maxBy(rows, getter) {
  return rows
    .filter((row) => getter(row) != null)
    .sort((left, right) => getter(right) - getter(left))[0] ?? null;
}

function firstMissing(targetRows) {
  if (targetRows.length === 0) {
    return {
      artifact_status: "fail_closed_missing_preferred_branch_curve_rows",
      hard_math_status: "preferred_branch_curve_rows_missing",
      first_missing_object: "preferred_branch_curve_rows_for_branch_clock_lock_target",
      first_missing_field: "oblate_spheroid_two_speed_deformation_sweep.preferred_branch_curve_rows",
      reason: "preferred_branch_curve_rows_missing",
    };
  }
  if (targetRows.every((row) => row.assigned_branch_clock_lock_term.active !== true)) {
    return {
      artifact_status: "fail_closed_missing_assigned_branch_clock_lock_rows",
      hard_math_status: "assigned_branch_clock_lock_rows_missing",
      first_missing_object: "assigned_branch_clock_lock_rows_for_target_extraction",
      first_missing_field: "oblate_spheroid_two_speed_deformation_sweep.rows[*].return_status.dynamic_return_probe.branch_clock_lock_term",
      reason: "assigned_branch_clock_lock_rows_missing",
    };
  }
  return {
    artifact_status: "priority_only_branch_clock_lock_target_present_internal_mechanism_blocked",
    hard_math_status: "branch_clock_lock_target_rows_present",
    first_missing_object: FIRST_MISSING_OBJECT,
    first_missing_field: FIRST_MISSING_FIELD,
    reason: "internal_tangent_authority_missing",
  };
}

export function evaluateOblateSpheroidBranchClockLockTargetEvidence(candidate = {}) {
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
      reason: "schema_not_oblate_spheroid_branch_clock_lock_target_v0",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  return {
    accepted: false,
    reason: "producer_does_not_authorize_accepted_branch_clock_lock_target_evidence",
    first_missing_field: "oblate_spheroid_branch_clock_lock_target.acceptance_certificate_ref",
  };
}

export function buildOblateSpheroidBranchClockLockTarget(input = {}) {
  const sourceArtifact = input.sourceArtifact ?? {};
  const nearEdgeDynamicRootMargin = Math.max(
    EPSILON,
    finiteNumber(input.nearEdgeDynamicRootMargin) ?? DEFAULT_NEAR_EDGE_DYNAMIC_ROOT_MARGIN
  );
  const rowMap = sourceRowsById(sourceArtifact);
  const targetKey = {
    schema: SCHEMA,
    source_schema: sourceArtifact.schema ?? null,
    source_row_id: sourceArtifact.row_id ?? null,
    source_artifact_hash: sourceArtifact.artifact_hash ?? null,
    preferred_rows: preferredRows(sourceArtifact).map((row) => ({
      row_id: row?.row_id ?? null,
      u: row?.u ?? null,
      v_orb: row?.v_orb ?? null,
      dynamic_root_margin: row?.dynamic_root_margin ?? null,
      branch_clock_lock_rms_acceleration: row?.branch_clock_lock_rms_acceleration ?? null,
      branch_curve_objective: row?.branch_curve_objective ?? null,
    })),
    nearEdgeDynamicRootMargin,
  };
  const artifactHash = stableHash(targetKey);
  const rowPrefix = `oblate_spheroid_branch_clock_lock_target:${artifactHash.slice(0, 16)}`;
  const targetRows = preferredRows(sourceArtifact).map((preferredRow) =>
    rowFromPreferred(rowPrefix, preferredRow, rowMap.get(preferredRow.row_id), nearEdgeDynamicRootMargin)
  );
  const missing = firstMissing(targetRows);
  const rowsWithClockLock = targetRows.filter((row) => row.assigned_branch_clock_lock_term.active);
  const rowsWhereClockDominatesMargin = targetRows.filter(
    (row) => row.tangent_authority_target.target_status === "missing_tangent_authority_exceeds_dynamic_root_margin"
  );
  const nearEdgeRows = targetRows.filter((row) => row.tangent_authority_target.near_edge_dynamic_root_margin);
  const lowestObjective = minBy(targetRows, (row) => row.local_values.branch_curve_objective);
  const lowestResidual = minBy(targetRows, (row) => row.local_values.normalized_residual);
  const smallestDynamicRootMargin = minBy(targetRows, (row) => row.local_values.dynamic_root_margin);
  const largestClockToMargin = maxBy(targetRows, (row) => row.tangent_authority_target.clock_to_dynamic_root_margin_ratio);

  return {
    schema: SCHEMA,
    row_id: rowPrefix,
    artifact_hash: artifactHash,
    authority_class: "priority_only_branch_clock_lock_target_not_retained_evidence",
    source_two_speed_deformation_sweep: {
      schema: sourceArtifact.schema ?? null,
      row_id: sourceArtifact.row_id ?? null,
      artifact_hash: sourceArtifact.artifact_hash ?? null,
      status: sourceArtifact.artifact_status ?? null,
      first_missing_object: sourceArtifact.first_missing_object ?? RETAINED_ROOT_LEDGER_BLOCKER,
      first_missing_field: sourceArtifact.first_missing_field ?? null,
    },
    parameters: {
      near_edge_dynamic_root_margin: nearEdgeDynamicRootMargin,
      preferred_branch_curve_row_count: preferredRows(sourceArtifact).length,
    },
    rows: targetRows,
    preferred_curve_sequence: targetRows.map((row) => ({
      u: row.u,
      v_orb: row.v_orb,
      dynamic_root_margin: row.local_values.dynamic_root_margin,
      branch_clock_lock_rms_acceleration: row.assigned_branch_clock_lock_term.rms_acceleration,
      branch_curve_objective: row.local_values.branch_curve_objective,
      target_status: row.tangent_authority_target.target_status,
    })),
    summary: {
      row_count: targetRows.length,
      rows_with_assigned_branch_clock_lock: rowsWithClockLock.length,
      near_edge_dynamic_root_margin_row_count: nearEdgeRows.length,
      tangent_authority_dominates_dynamic_margin_row_count: rowsWhereClockDominatesMargin.length,
      min_branch_curve_objective_row: rowRef(lowestObjective),
      min_normalized_residual_row: rowRef(lowestResidual),
      min_dynamic_root_margin_row: rowRef(smallestDynamicRootMargin),
      max_clock_to_dynamic_root_margin_ratio_row: rowRef(largestClockToMargin),
      retained_evidence_first_missing_object: RETAINED_ROOT_LEDGER_BLOCKER,
      internal_mechanism_first_missing_object: FIRST_MISSING_OBJECT,
      internal_mechanism_first_missing_field: FIRST_MISSING_FIELD,
    },
    artifact_status: missing.artifact_status,
    hard_math_status: missing.hard_math_status,
    source_status: "source_acquisition_blocked",
    first_missing_object: missing.first_missing_object,
    first_missing_field: missing.first_missing_field,
    retained_evidence_blocker: {
      first_missing_object: RETAINED_ROOT_LEDGER_BLOCKER,
      first_missing_field:
        sourceArtifact.first_missing_field ??
        "oblate_spheroid_two_speed_deformation_sweep.rows[*].root_ledger_status.retained_root_ledger_ref",
    },
    evidence_evaluation: {
      accepted: false,
      reason: missing.reason,
      first_missing_field: missing.first_missing_field,
    },
    authorization: makeAuthorization(),
    negative_controls: Object.entries(NEGATIVE_CONTROL_REASONS).map(([evidence_class, reason]) => ({
      evidence_class,
      accepted: false,
      reason,
    })),
  };
}

export function validateOblateSpheroidBranchClockLockTarget(artifact) {
  const errors = [];
  if (artifact?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (!Array.isArray(artifact?.rows)) {
    errors.push("rows must be an array");
  }
  if (!Array.isArray(artifact?.preferred_curve_sequence)) {
    errors.push("preferred_curve_sequence must be an array");
  }
  if (artifact?.summary?.row_count !== artifact?.rows?.length) {
    errors.push("summary row_count must match rows length");
  }
  for (const row of artifact?.rows ?? []) {
    if (row.accepted !== false) {
      errors.push("target rows must remain non-authorizing");
    }
    if (row.internal_tangent_authority_ref !== null) {
      errors.push("target rows must not claim an internal tangent authority reference");
    }
    if (row.retained_root_ledger_ref !== null) {
      errors.push("target rows must not claim a retained root ledger");
    }
    if (row.tangent_authority_target?.dimension_note !== "diagnostic_ratio_only_not_dimensionally_closed_physics") {
      errors.push("target rows must preserve diagnostic dimension note");
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
  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    const result = evaluateOblateSpheroidBranchClockLockTargetEvidence({ evidence_class: evidenceClass });
    if (result.accepted || result.reason !== reason) {
      errors.push(`${evidenceClass} negative control must reject as ${reason}`);
    }
  }
  return errors;
}

function runCli() {
  const inputPath = process.argv.find((arg) => arg.startsWith("--input="))?.slice("--input=".length);
  const outPath = process.argv.find((arg) => arg.startsWith("--out="))?.slice("--out=".length);
  const nearEdgeArg = process.argv.find((arg) => arg.startsWith("--near-edge-dynamic-root-margin="));
  const sourceArtifact = inputPath ? JSON.parse(fs.readFileSync(inputPath, "utf8")) : {};
  const artifact = buildOblateSpheroidBranchClockLockTarget({
    sourceArtifact,
    nearEdgeDynamicRootMargin: nearEdgeArg
      ? nearEdgeArg.slice("--near-edge-dynamic-root-margin=".length)
      : DEFAULT_NEAR_EDGE_DYNAMIC_ROOT_MARGIN,
  });
  const errors = validateOblateSpheroidBranchClockLockTarget(artifact);
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
    return;
  }
  const pretty = process.argv.includes("--pretty");
  const output = JSON.stringify(artifact, null, pretty ? 2 : 0);
  if (outPath) {
    fs.writeFileSync(outPath, `${output}\n`);
    return;
  }
  console.log(output);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli();
}
