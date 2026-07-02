import crypto from "node:crypto";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

export const SCHEMA = "oblate_spheroid_branch_clock_lock_reserve_certificate.v0";
export const FIRST_MISSING_OBJECT = "same_record_retained_root_ledger_for_two_speed_deformation_sweep";
export const FIRST_MISSING_FIELD =
  "oblate_spheroid_two_speed_deformation_sweep.rows[*].root_ledger_status.retained_root_ledger_ref";

const DEFAULT_MIN_DYNAMIC_ROOT_MARGIN_RESERVE = 0.01;
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
]);

export const NEGATIVE_CONTROL_REASONS = Object.freeze({
  fixture: "fixture_not_accepted_branch_clock_lock_reserve_evidence",
  diagnostic: "diagnostic_not_accepted_branch_clock_lock_reserve_evidence",
  dirty_priority_prose: "dirty_priority_prose_not_accepted_branch_clock_lock_reserve_evidence",
  generated_decoy: "generated_decoy_not_accepted_branch_clock_lock_reserve_evidence",
  proxy_row: "proxy_row_not_accepted_branch_clock_lock_reserve_evidence",
  candidate_ref: "candidate_ref_not_accepted_branch_clock_lock_reserve_evidence",
  aggregate_row: "aggregate_row_not_same_record_branch_clock_lock_reserve_evidence",
  source_contract_shell: "source_contract_shell_not_accepted_branch_clock_lock_reserve_evidence",
  temp_probe: "temp_probe_not_accepted_branch_clock_lock_reserve_evidence",
  t3_row: "t3_row_not_braid_ideal_branch_clock_lock_reserve_evidence",
  endpoint_only_row: "endpoint_only_row_not_branch_clock_lock_reserve_evidence",
  affine_geometry_alone: "affine_geometry_alone_not_branch_clock_lock_reserve_evidence",
  cross_row_bundle: "cross_row_bundle_not_same_record_branch_clock_lock_reserve_evidence",
  generic_return_metadata: "generic_return_metadata_not_branch_clock_lock_reserve_evidence",
  earlier_fail_closed_adapter_row: "earlier_fail_closed_adapter_row_not_branch_clock_lock_reserve_evidence",
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

function normalizeRows(input = {}) {
  const rows = input.rows ?? input.sourceArtifact?.rows ?? input.sourceArtifact?.candidate_prefilter_rows ?? [];
  return Array.isArray(rows) ? rows : [];
}

function preferredBranchCurveRowIds(input = {}) {
  return new Set(
    (input.sourceArtifact?.preferred_branch_curve_rows ?? [])
      .map((row) => row?.row_id)
      .filter((rowId) => typeof rowId === "string")
  );
}

function makeSourceSummary(input = {}) {
  return {
    schema: input.sourceArtifact?.schema ?? null,
    row_id: input.sourceArtifact?.row_id ?? null,
    artifact_hash: input.sourceArtifact?.artifact_hash ?? null,
    status: input.sourceArtifact?.artifact_status ?? null,
    first_missing_object: input.sourceArtifact?.first_missing_object ?? FIRST_MISSING_OBJECT,
    first_missing_field: input.sourceArtifact?.first_missing_field ?? FIRST_MISSING_FIELD,
  };
}

function rowMetric(row, preferredRowIds) {
  const dynamicProbe = row.return_status?.dynamic_return_probe ?? null;
  const supportTerm = dynamicProbe?.support_term ?? {};
  const branchClockLockTerm = dynamicProbe?.branch_clock_lock_term ?? {};
  return {
    row_id: row.row_id ?? `two-speed-row:u_${row.u}:v_orb_${row.v_orb}`,
    u: finiteNumber(row.u),
    v_orb: finiteNumber(row.v_orb),
    chi: finiteNumber(row.chi),
    residual_value: finiteNumber(row.residual_status?.normalized_residual),
    objective_value: finiteNumber(row.candidate_objective),
    sampled_beta_max: finiteNumber(row.speed_budget?.beta_max),
    sampled_root_budget_margin: finiteNumber(row.speed_budget?.root_budget_margin),
    retained_root_ledger_ref: row.root_ledger_status?.retained_root_ledger_ref ?? null,
    bounded_return_observed: row.return_status?.bounded_return_observed === true,
    stable_support_radius_observed: row.return_status?.stable_support_radius_observed === true,
    branch_curve_candidate: row.return_status?.branch_curve_candidate === true,
    branch_curve_objective: finiteNumber(row.return_status?.branch_curve_objective),
    preferred_branch_curve_selected: preferredRowIds.has(row.row_id),
    dynamic_probe_present: dynamicProbe != null,
    dynamic_beta_max: finiteNumber(dynamicProbe?.max_field_speed),
    dynamic_root_margin: finiteNumber(dynamicProbe?.root_budget_margin),
    position_return_rms: finiteNumber(dynamicProbe?.final_metrics?.position_return_rms),
    velocity_return_rms: finiteNumber(dynamicProbe?.final_metrics?.velocity_return_rms),
    radius_mean_deviation: finiteNumber(dynamicProbe?.max_radius_mean_deviation),
    support_term: {
      active: supportTerm.active === true,
      mode: supportTerm.mode ?? null,
      stiffness: finiteNumber(supportTerm.stiffness),
      damping: finiteNumber(supportTerm.damping),
      rms_acceleration: finiteNumber(supportTerm.rms_acceleration),
      max_acceleration: finiteNumber(supportTerm.max_acceleration),
    },
    branch_clock_lock_term: {
      active: branchClockLockTerm.active === true,
      mode: branchClockLockTerm.mode ?? null,
      stiffness: finiteNumber(branchClockLockTerm.stiffness),
      damping: finiteNumber(branchClockLockTerm.damping),
      rms_acceleration: finiteNumber(branchClockLockTerm.rms_acceleration),
      max_acceleration: finiteNumber(branchClockLockTerm.max_acceleration),
      rms_tangent_position_error: finiteNumber(branchClockLockTerm.rms_tangent_position_error),
      rms_tangent_velocity_error: finiteNumber(branchClockLockTerm.rms_tangent_velocity_error),
      max_tangent_position_error: finiteNumber(branchClockLockTerm.max_tangent_position_error),
      max_tangent_velocity_error: finiteNumber(branchClockLockTerm.max_tangent_velocity_error),
    },
  };
}

function hasBoundedDynamicReturn(row) {
  return (
    row.bounded_return_observed &&
    row.dynamic_probe_present &&
    row.dynamic_beta_max != null &&
    row.dynamic_beta_max < 1 &&
    row.dynamic_root_margin != null &&
    row.dynamic_root_margin > 0
  );
}

function rootMarginReserveStatus(row, minDynamicRootMarginReserve) {
  const dynamicRootMargin = row.dynamic_root_margin;
  const dynamicBetaMax = row.dynamic_beta_max;
  const reserve = dynamicRootMargin == null ? null : dynamicRootMargin - minDynamicRootMarginReserve;
  const positiveReserve =
    dynamicBetaMax != null &&
    dynamicBetaMax < 1 &&
    dynamicRootMargin != null &&
    dynamicRootMargin >= minDynamicRootMarginReserve;
  return {
    minimum_dynamic_root_margin_reserve: minDynamicRootMarginReserve,
    dynamic_root_margin: dynamicRootMargin,
    dynamic_beta_max: dynamicBetaMax,
    reserve,
    positive_dynamic_root_margin_reserve: positiveReserve,
    status: positiveReserve ? "positive_dynamic_root_margin_reserve" : "insufficient_dynamic_root_margin_reserve",
  };
}

function tangentCorrectionRatio(row) {
  const branchRms = row.branch_clock_lock_term.rms_acceleration;
  const supportRms = row.support_term.rms_acceleration;
  if (branchRms == null) {
    return null;
  }
  return branchRms / Math.max(supportRms ?? 0, EPSILON);
}

function preferredBranchCurveStatus(row) {
  if (row.preferred_branch_curve_selected) {
    return "selected_preferred_branch_curve_row";
  }
  if (row.branch_curve_candidate) {
    return "branch_curve_candidate_not_selected";
  }
  return "not_preferred_branch_curve_candidate";
}

function branchClockLockStatus(row) {
  if (!row.dynamic_probe_present) {
    return "missing_dynamic_return_probe";
  }
  if (row.branch_clock_lock_term.active !== true) {
    return "branch_clock_lock_inactive";
  }
  if (row.branch_clock_lock_term.rms_acceleration == null) {
    return "branch_clock_lock_missing_rms_acceleration";
  }
  return "branch_clock_lock_active";
}

function makeCertificateRow(rowPrefix, row, minDynamicRootMarginReserve) {
  const boundedDynamicReturn = hasBoundedDynamicReturn(row);
  const branchLockStatus = branchClockLockStatus(row);
  const reserveStatus = rootMarginReserveStatus(row, minDynamicRootMarginReserve);
  const supportOnly =
    row.support_term.active === true &&
    row.branch_clock_lock_term.active !== true &&
    row.support_term.rms_acceleration != null;
  const tangentReserveCandidate =
    boundedDynamicReturn &&
    branchLockStatus === "branch_clock_lock_active" &&
    reserveStatus.positive_dynamic_root_margin_reserve;

  return {
    row_id: `${rowPrefix}:candidate:u_${row.u?.toFixed(6) ?? "missing"}:v_orb_${row.v_orb?.toFixed(6) ?? "missing"}`,
    schema: "oblate_spheroid_branch_clock_lock_reserve_candidate_row.v0",
    source_row_id: row.row_id,
    u: row.u,
    v_orb: row.v_orb,
    chi: row.chi,
    sampled_values: {
      residual_value: row.residual_value,
      objective_value: row.objective_value,
      beta_max: row.sampled_beta_max,
      root_budget_margin: row.sampled_root_budget_margin,
    },
    dynamic_return_status: {
      dynamic_probe_present: row.dynamic_probe_present,
      bounded_return_observed: row.bounded_return_observed,
      stable_support_radius_observed: row.stable_support_radius_observed,
      dynamic_beta_max: row.dynamic_beta_max,
      dynamic_root_margin: row.dynamic_root_margin,
      position_return_rms: row.position_return_rms,
      velocity_return_rms: row.velocity_return_rms,
      radius_mean_deviation: row.radius_mean_deviation,
      bounded_dynamic_return: boundedDynamicReturn,
    },
    support_term: {
      ...row.support_term,
      support_only_without_branch_clock_lock: supportOnly,
    },
    branch_clock_lock_term: {
      ...row.branch_clock_lock_term,
      status: branchLockStatus,
    },
    tangent_correction: {
      ratio: tangentCorrectionRatio(row),
      numerator_branch_clock_lock_rms_acceleration: row.branch_clock_lock_term.rms_acceleration,
      denominator_support_rms_acceleration: Math.max(row.support_term.rms_acceleration ?? 0, EPSILON),
      interpretation: "branch_clock_lock_to_support_rms_acceleration_ratio",
    },
    root_margin_reserve_status: reserveStatus,
    preferred_branch_curve_selection_status: preferredBranchCurveStatus(row),
    internal_term_proof_obligation: {
      required_artifact: "retained_history_tangent_projection_approximating_branch_clock_lock_diagnostic",
      statement:
        "Derive a same-record retained-history tangent projection that approximates the branch-clock lock diagnostic while preserving positive root-budget margin and same-record action closure.",
      required_rows: [
        "same_record_retained_root_ledger",
        "same_record_action_closure_row",
        "retained_history_tangent_projection_row",
        "positive_root_budget_margin_reserve_row",
      ],
      accepted: false,
    },
    retained_root_ledger_ref: row.retained_root_ledger_ref,
    accepted: false,
    hard_math_candidate: tangentReserveCandidate,
  };
}

function firstMissing(candidateRows, certificateRows) {
  if (candidateRows.length > 0) {
    return {
      artifact_status: "priority_only_branch_clock_lock_reserve_certificate_present_retained_evidence_blocked",
      hard_math_status: "branch_clock_lock_tangent_reserve_certificate_present",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: FIRST_MISSING_FIELD,
      reason: "retained_root_ledger_missing",
    };
  }
  const boundedRows = certificateRows.filter((row) => row.dynamic_return_status.bounded_dynamic_return);
  if (boundedRows.length === 0) {
    return {
      artifact_status: "fail_closed_missing_bounded_dynamic_return",
      hard_math_status: "bounded_dynamic_return_missing",
      first_missing_object: "bounded_dynamic_return_for_branch_clock_lock_reserve_certificate",
      first_missing_field:
        "oblate_spheroid_branch_clock_lock_reserve_certificate.rows[*].dynamic_return_status",
      reason: "bounded_dynamic_return_missing",
    };
  }
  const branchLockRows = boundedRows.filter((row) => row.branch_clock_lock_term.status === "branch_clock_lock_active");
  if (branchLockRows.length === 0) {
    return {
      artifact_status: "fail_closed_missing_branch_clock_lock_term",
      hard_math_status: "branch_clock_lock_term_missing",
      first_missing_object: "active_branch_clock_lock_term_for_branch_clock_lock_reserve_certificate",
      first_missing_field:
        "oblate_spheroid_branch_clock_lock_reserve_certificate.rows[*].branch_clock_lock_term.active",
      reason: "branch_clock_lock_term_missing",
    };
  }
  return {
    artifact_status: "fail_closed_missing_dynamic_root_margin_reserve",
    hard_math_status: "dynamic_root_margin_reserve_missing",
    first_missing_object: "positive_dynamic_root_margin_reserve_for_branch_clock_lock_reserve_certificate",
    first_missing_field:
      "oblate_spheroid_branch_clock_lock_reserve_certificate.rows[*].root_margin_reserve_status",
    reason: "dynamic_root_margin_reserve_missing",
  };
}

export function evaluateOblateSpheroidBranchClockLockReserveCertificateEvidence(candidate = {}) {
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
      reason: "schema_not_oblate_spheroid_branch_clock_lock_reserve_certificate_v0",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  return {
    accepted: false,
    reason: "producer_does_not_authorize_accepted_branch_clock_lock_reserve_evidence",
    first_missing_field: "oblate_spheroid_branch_clock_lock_reserve_certificate.acceptance_certificate_ref",
  };
}

export function buildOblateSpheroidBranchClockLockReserveCertificate(input = {}) {
  const rows = normalizeRows(input);
  const preferredRowIds = preferredBranchCurveRowIds(input);
  const minDynamicRootMarginReserve = Number.isFinite(Number(input.minDynamicRootMarginReserve))
    ? Number(input.minDynamicRootMarginReserve)
    : DEFAULT_MIN_DYNAMIC_ROOT_MARGIN_RESERVE;
  const metrics = rows
    .map((row) => rowMetric(row, preferredRowIds))
    .filter((row) => row.u != null && row.v_orb != null);
  const artifactKey = {
    schema: SCHEMA,
    source: makeSourceSummary(input),
    minDynamicRootMarginReserve,
    rows: metrics.map((row) => ({
      row_id: row.row_id,
      u: row.u,
      v_orb: row.v_orb,
      residual_value: row.residual_value,
      objective_value: row.objective_value,
      sampled_beta_max: row.sampled_beta_max,
      sampled_root_budget_margin: row.sampled_root_budget_margin,
      dynamic_beta_max: row.dynamic_beta_max,
      dynamic_root_margin: row.dynamic_root_margin,
      support_rms_acceleration: row.support_term.rms_acceleration,
      branch_clock_lock_rms_acceleration: row.branch_clock_lock_term.rms_acceleration,
      branch_curve_candidate: row.branch_curve_candidate,
      preferred_branch_curve_selected: row.preferred_branch_curve_selected,
    })),
  };
  const artifactHash = stableHash(artifactKey);
  const rowPrefix = `oblate_spheroid_branch_clock_lock_reserve_certificate:${artifactHash.slice(0, 16)}`;
  const certificateRows = metrics.map((row) => makeCertificateRow(rowPrefix, row, minDynamicRootMarginReserve));
  const candidateRows = certificateRows.filter((row) => row.hard_math_candidate);
  const missing = firstMissing(candidateRows, certificateRows);

  return {
    schema: SCHEMA,
    row_id: rowPrefix,
    artifact_hash: artifactHash,
    authority_class: "priority_only_hard_math_branch_clock_lock_reserve_certificate_not_retained_evidence",
    source_two_speed_deformation_sweep: makeSourceSummary(input),
    parameters: {
      minimum_dynamic_root_margin_reserve: minDynamicRootMarginReserve,
      row_count: metrics.length,
      preferred_branch_curve_row_id_count: preferredRowIds.size,
    },
    rows: certificateRows,
    branch_clock_lock_reserve_candidate_rows: candidateRows,
    summary: {
      row_count: certificateRows.length,
      bounded_dynamic_return_row_count: certificateRows.filter(
        (row) => row.dynamic_return_status.bounded_dynamic_return
      ).length,
      support_only_bounded_row_count: certificateRows.filter(
        (row) =>
          row.dynamic_return_status.bounded_dynamic_return &&
          row.support_term.support_only_without_branch_clock_lock
      ).length,
      active_branch_clock_lock_row_count: certificateRows.filter(
        (row) => row.branch_clock_lock_term.status === "branch_clock_lock_active"
      ).length,
      positive_dynamic_root_margin_reserve_row_count: certificateRows.filter(
        (row) => row.root_margin_reserve_status.positive_dynamic_root_margin_reserve
      ).length,
      hard_math_candidate_count: candidateRows.length,
      first_candidate_row_id: candidateRows[0]?.row_id ?? null,
      retained_evidence_first_missing_object: FIRST_MISSING_OBJECT,
      retained_evidence_first_missing_field: FIRST_MISSING_FIELD,
    },
    artifact_status: missing.artifact_status,
    hard_math_status: missing.hard_math_status,
    source_status: "source_acquisition_blocked",
    first_missing_object: missing.first_missing_object,
    first_missing_field: missing.first_missing_field,
    retained_evidence_blocker: {
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: FIRST_MISSING_FIELD,
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

export function validateOblateSpheroidBranchClockLockReserveCertificate(artifact) {
  const errors = [];
  if (artifact?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (!Array.isArray(artifact?.rows)) {
    errors.push("rows must be an array");
  }
  if (!Array.isArray(artifact?.branch_clock_lock_reserve_candidate_rows)) {
    errors.push("branch_clock_lock_reserve_candidate_rows must be an array");
  }
  if (artifact?.summary?.hard_math_candidate_count !== artifact?.branch_clock_lock_reserve_candidate_rows?.length) {
    errors.push("hard_math_candidate_count must match branch_clock_lock_reserve_candidate_rows length");
  }
  for (const row of artifact?.branch_clock_lock_reserve_candidate_rows ?? []) {
    if (row.dynamic_return_status?.bounded_dynamic_return !== true) {
      errors.push("candidate rows must have bounded dynamic return");
    }
    if (row.branch_clock_lock_term?.status !== "branch_clock_lock_active") {
      errors.push("candidate rows must have an active branch-clock lock term");
    }
    if (row.root_margin_reserve_status?.positive_dynamic_root_margin_reserve !== true) {
      errors.push("candidate rows must have positive dynamic root-margin reserve");
    }
    if (row.accepted !== false || row.internal_term_proof_obligation?.accepted !== false) {
      errors.push("candidate rows must remain non-authorizing");
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
    const result = evaluateOblateSpheroidBranchClockLockReserveCertificateEvidence({
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
  const input = inputPath ? { sourceArtifact: JSON.parse(fs.readFileSync(inputPath, "utf8")) } : {};
  const artifact = buildOblateSpheroidBranchClockLockReserveCertificate(input);
  const errors = validateOblateSpheroidBranchClockLockReserveCertificate(artifact);
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
