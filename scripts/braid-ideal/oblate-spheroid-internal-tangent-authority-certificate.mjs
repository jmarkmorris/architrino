import crypto from "node:crypto";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

export const SCHEMA = "oblate_spheroid_internal_tangent_authority_certificate.v0";
export const FIRST_MISSING_OBJECT = "same_record_retained_root_ledger_for_two_speed_deformation_sweep";
export const FIRST_MISSING_FIELD =
  "oblate_spheroid_two_speed_deformation_sweep.rows[*].root_ledger_status.retained_root_ledger_ref";
export const RETAINED_HISTORY_FIRST_MISSING_OBJECT = "six_held_release_seed_path_rows_for_retained_record";
export const RETAINED_HISTORY_FIRST_MISSING_FIELD = "held_release_seed_path_rows[*].retained_record_id";

const EPSILON = 1e-12;

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
  return new Map(
    normalizeRows(reserveArtifact.branch_clock_lock_reserve_candidate_rows ?? reserveArtifact.rows)
      .map((row) => [rowJoinKey(row), row])
  );
}

function measuredNeedFromTargetRow(rowPrefix, targetRow, reserveRow) {
  const branchClock = targetRow.assigned_branch_clock_lock_term ?? {};
  const support = targetRow.assigned_support_term ?? {};
  const reserve = reserveRow?.root_margin_reserve_status ?? {};
  const localValues = targetRow.local_values ?? {};
  const target = targetRow.tangent_authority_target ?? {};
  const branchClockRms = finiteNumber(branchClock.rms_acceleration ?? reserveRow?.branch_clock_lock_term?.rms_acceleration);
  const supportRms = finiteNumber(support.rms_acceleration ?? reserveRow?.support_term?.rms_acceleration);
  const dynamicRootMargin = finiteNumber(localValues.dynamic_root_margin ?? reserve.dynamic_root_margin);
  const reserveFlagIsPresent = typeof reserve.positive_dynamic_root_margin_reserve === "boolean";
  const positiveReserve = reserveFlagIsPresent
    ? reserve.positive_dynamic_root_margin_reserve
    : dynamicRootMargin != null && dynamicRootMargin > 0 && branchClockRms != null;
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
    tangent_authority_target_status: target.target_status ?? null,
    retained_root_ledger_ref: targetRow.retained_root_ledger_ref ?? reserveRow?.retained_root_ledger_ref ?? null,
    accepted: false,
  };
}

function makeMeasuredNeedRows(rowPrefix, targetArtifact = {}, reserveArtifact = {}) {
  const reserveByKey = reserveRowsByKey(reserveArtifact);
  return normalizeRows(targetArtifact.rows)
    .filter((row) => row?.assigned_branch_clock_lock_term?.active === true)
    .map((row) => measuredNeedFromTargetRow(rowPrefix, row, reserveByKey.get(rowJoinKey(row))));
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
  return [
    {
      rank: 1,
      route_id: "retained_history_tangent_projection",
      row_id: `${rowPrefix}:route:retained_history_tangent_projection`,
      equation_form: "a_parallel^RH = -k_RH e_x - c_RH e_v",
      variables: {
        e_x: "Pi_T(x_i - x_i^ret(t))",
        e_v: "Pi_T(v_i - v_i^ret(t))",
        Pi_T: "tangent projection to the oblate support surface",
      },
      required_same_record_input_rows: [
        "held-release seed path row",
        "central_solver_retained_history_provider_object",
        "same_record_retained_root_ledger",
        "same_record_action_closure_row",
        "retained_history_tangent_projection_row",
      ],
      expected_tangent_acceleration_direction: "opposes tangent position and velocity error measured by branch-clock lock",
      measured_branch_clock_lock_acceleration_fields: measuredFields,
      root_budget_margin_reserve_condition:
        "dynamic root-budget margin remains positive after the retained-history tangent projection residual is applied",
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
  };
  const artifactHash = stableHash(artifactKey);
  const rowPrefix = `oblate_spheroid_internal_tangent_authority_certificate:${artifactHash.slice(0, 16)}`;
  const measuredRows = makeMeasuredNeedRows(rowPrefix, targetArtifact, reserveArtifact);
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
