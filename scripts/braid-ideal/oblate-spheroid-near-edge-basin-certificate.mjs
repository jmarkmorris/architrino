import crypto from "node:crypto";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

export const SCHEMA = "oblate_spheroid_near_edge_basin_certificate.v0";
export const FIRST_MISSING_OBJECT = "same_record_retained_root_ledger_for_two_speed_deformation_sweep";
export const FIRST_MISSING_FIELD =
  "oblate_spheroid_two_speed_deformation_sweep.rows[*].root_ledger_status.retained_root_ledger_ref";

const DEFAULT_BETA_EDGE_TOLERANCE = 0.08;
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
  fixture: "fixture_not_accepted_near_edge_basin_evidence",
  diagnostic: "diagnostic_not_accepted_near_edge_basin_evidence",
  dirty_priority_prose: "dirty_priority_prose_not_accepted_near_edge_basin_evidence",
  generated_decoy: "generated_decoy_not_accepted_near_edge_basin_evidence",
  proxy_row: "proxy_row_not_accepted_near_edge_basin_evidence",
  candidate_ref: "candidate_ref_not_accepted_near_edge_basin_evidence",
  aggregate_row: "aggregate_row_not_same_record_near_edge_basin_evidence",
  source_contract_shell: "source_contract_shell_not_accepted_near_edge_basin_evidence",
  temp_probe: "temp_probe_not_accepted_near_edge_basin_evidence",
  t3_row: "t3_row_not_braid_ideal_near_edge_basin_evidence",
  endpoint_only_row: "endpoint_only_row_not_near_edge_basin_evidence",
  affine_geometry_alone: "affine_geometry_alone_not_near_edge_basin_evidence",
  cross_row_bundle: "cross_row_bundle_not_same_record_near_edge_basin_evidence",
  generic_display_metadata: "generic_display_metadata_not_near_edge_basin_evidence",
  earlier_fail_closed_adapter_row: "earlier_fail_closed_adapter_row_not_near_edge_basin_evidence",
});

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function finiteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function uniqueSorted(values) {
  return [...new Set(values.filter((value) => Number.isFinite(value)))].sort((left, right) => left - right);
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function normalizeRows(input = {}) {
  const rows = input.rows ?? input.sourceArtifact?.rows ?? [];
  return Array.isArray(rows) ? rows : [];
}

function rowKey(u, vOrb) {
  return `${u.toFixed(12)}:${vOrb.toFixed(12)}`;
}

function rowMetric(row, preferredBranchCurveRowIds) {
  const dynamicProbe = row.return_status?.dynamic_return_probe ?? null;
  return {
    row_id: row.row_id ?? `two-speed-row:u_${row.u}:v_orb_${row.v_orb}`,
    u: finiteNumber(row.u),
    v_orb: finiteNumber(row.v_orb),
    chi: finiteNumber(row.chi),
    residual_value: finiteNumber(row.residual_status?.normalized_residual),
    objective_value: finiteNumber(row.candidate_objective),
    beta_max: finiteNumber(row.speed_budget?.beta_max),
    root_budget_margin: finiteNumber(row.speed_budget?.root_budget_margin),
    partner_root_coverage: finiteNumber(
      row.residual_status?.sampled_wake_residual_diagnostic?.directed_partner_root_coverage
    ),
    same_source_root_coverage: finiteNumber(
      row.residual_status?.sampled_wake_residual_diagnostic?.directed_self_root_coverage
    ),
    directed_self_pairs_with_roots: finiteNumber(
      row.residual_status?.sampled_wake_residual_diagnostic?.directed_self_pairs_with_roots
    ),
    retained_root_ledger_ref: row.root_ledger_status?.retained_root_ledger_ref ?? null,
    bounded_return_observed: row.return_status?.bounded_return_observed === true,
    stable_support_radius_observed: row.return_status?.stable_support_radius_observed === true,
    dynamic_probe_present: dynamicProbe != null,
    dynamic_beta_max: finiteNumber(dynamicProbe?.max_field_speed),
    dynamic_root_margin: finiteNumber(dynamicProbe?.root_budget_margin),
    position_return_rms: finiteNumber(dynamicProbe?.final_metrics?.position_return_rms),
    velocity_return_rms: finiteNumber(dynamicProbe?.final_metrics?.velocity_return_rms),
    radius_mean_deviation: finiteNumber(dynamicProbe?.max_radius_mean_deviation),
    support_rms_acceleration: finiteNumber(dynamicProbe?.support_term?.rms_acceleration),
    branch_clock_lock_rms_acceleration: finiteNumber(dynamicProbe?.branch_clock_lock_term?.rms_acceleration),
    branch_curve_objective: finiteNumber(row.return_status?.branch_curve_objective),
    branch_curve_candidate: row.return_status?.branch_curve_candidate === true,
    preferred_branch_curve_selected: preferredBranchCurveRowIds.has(row.row_id),
  };
}

function buildMetricGrid(rows, preferredBranchCurveRowIds = new Set()) {
  const metrics = rows.map((row) => rowMetric(row, preferredBranchCurveRowIds)).filter(
    (row) => row.u != null && row.v_orb != null
  );
  const uValues = uniqueSorted(metrics.map((row) => row.u));
  const vOrbValues = uniqueSorted(metrics.map((row) => row.v_orb));
  const byKey = new Map(metrics.map((row) => [rowKey(row.u, row.v_orb), row]));
  return { metrics, uValues, vOrbValues, byKey };
}

function neighborValues(values, value) {
  const index = values.findIndex((entry) => Math.abs(entry - value) <= EPSILON);
  return {
    lower: index > 0 ? values[index - 1] : null,
    upper: index >= 0 && index < values.length - 1 ? values[index + 1] : null,
  };
}

function derivativeValue(current, lower, upper, axisField, valueField) {
  if (!lower || !upper || current[valueField] == null || lower[valueField] == null || upper[valueField] == null) {
    return {
      status: "blocked_missing_finite_difference_neighborhood",
      value: null,
      lower_neighbor_ref: lower?.row_id ?? null,
      upper_neighbor_ref: upper?.row_id ?? null,
    };
  }
  const denominator = upper[axisField] - lower[axisField];
  if (Math.abs(denominator) <= EPSILON) {
    return {
      status: "blocked_zero_neighbor_spacing",
      value: null,
      lower_neighbor_ref: lower.row_id,
      upper_neighbor_ref: upper.row_id,
    };
  }
  return {
    status: "central_difference",
    value: (upper[valueField] - lower[valueField]) / denominator,
    lower_neighbor_ref: lower.row_id,
    upper_neighbor_ref: upper.row_id,
    lower_value: lower[valueField],
    current_value: current[valueField],
    upper_value: upper[valueField],
    spacing: denominator,
  };
}

function isInteriorAdmissible(row) {
  return row?.beta_max != null && row.beta_max < 1 && row?.root_budget_margin != null && row.root_budget_margin > 0;
}

function lowerResidualNeighbors(current, neighbors) {
  return neighbors.filter(
    (neighbor) =>
      neighbor &&
      current.residual_value != null &&
      neighbor.residual_value != null &&
      neighbor.residual_value < current.residual_value
  );
}

function edgeConstrainedStatus(current, neighbors, finiteDifferenceComplete, nearEdge) {
  if (!finiteDifferenceComplete) {
    return "blocked_missing_finite_difference_neighborhood";
  }
  if (!nearEdge) {
    return "not_positive_margin_near_edge_row";
  }
  const lowerNeighbors = lowerResidualNeighbors(current, neighbors);
  if (lowerNeighbors.length === 0) {
    return "sampled_interior_local_minimum";
  }
  const inadmissible = lowerNeighbors.filter((neighbor) => !isInteriorAdmissible(neighbor));
  const interior = lowerNeighbors.filter(isInteriorAdmissible);
  if (inadmissible.length > 0 && interior.length === 0) {
    return "improvement_points_toward_inadmissible_beta_edge";
  }
  if (inadmissible.length > 0 && interior.length > 0) {
    return "mixed_interior_and_inadmissible_improvement";
  }
  return "interior_improvement_available";
}

function makeCertificateRow(rowPrefix, current, grid, betaEdgeTolerance) {
  const uNeighbors = neighborValues(grid.uValues, current.u);
  const vNeighbors = neighborValues(grid.vOrbValues, current.v_orb);
  const lowerU = uNeighbors.lower == null ? null : grid.byKey.get(rowKey(uNeighbors.lower, current.v_orb));
  const upperU = uNeighbors.upper == null ? null : grid.byKey.get(rowKey(uNeighbors.upper, current.v_orb));
  const lowerV = vNeighbors.lower == null ? null : grid.byKey.get(rowKey(current.u, vNeighbors.lower));
  const upperV = vNeighbors.upper == null ? null : grid.byKey.get(rowKey(current.u, vNeighbors.upper));
  const dEDu = derivativeValue(current, lowerU, upperU, "u", "residual_value");
  const dEDvOrb = derivativeValue(current, lowerV, upperV, "v_orb", "residual_value");
  const dObjectiveDu = derivativeValue(current, lowerU, upperU, "u", "objective_value");
  const dObjectiveDvOrb = derivativeValue(current, lowerV, upperV, "v_orb", "objective_value");
  const finiteDifferenceComplete =
    dEDu.status === "central_difference" &&
    dEDvOrb.status === "central_difference" &&
    dObjectiveDu.status === "central_difference" &&
    dObjectiveDvOrb.status === "central_difference";
  const betaEdgeDistance = current.beta_max == null ? null : 1 - current.beta_max;
  const positiveMargin = current.root_budget_margin != null && current.root_budget_margin > 0;
  const nearEdge =
    positiveMargin &&
    betaEdgeDistance != null &&
    betaEdgeDistance > 0 &&
    betaEdgeDistance <= betaEdgeTolerance;
  const neighbors = [lowerU, upperU, lowerV, upperV].filter(Boolean);
  const edgeStatus = edgeConstrainedStatus(current, neighbors, finiteDifferenceComplete, nearEdge);
  const partnerRootCoverageStatus =
    current.partner_root_coverage === 1 ? "directed_partner_root_coverage_full" : "directed_partner_root_coverage_incomplete";
  const sameSourceCoverageBlocker =
    current.same_source_root_coverage === 0
      ? "same_source_causal_root_coverage_absent"
      : "same_source_causal_root_coverage_present_but_unaccepted";
  const dynamicBoundedReturn =
    current.bounded_return_observed &&
    current.dynamic_probe_present &&
    current.dynamic_beta_max != null &&
    current.dynamic_beta_max < 1 &&
    current.dynamic_root_margin != null &&
    current.dynamic_root_margin > 0;
  const hardMathCandidate =
    nearEdge &&
    finiteDifferenceComplete &&
    dynamicBoundedReturn &&
    [
      "improvement_points_toward_inadmissible_beta_edge",
      "mixed_interior_and_inadmissible_improvement",
      "interior_improvement_available",
      "sampled_interior_local_minimum",
    ].includes(edgeStatus);

  return {
    row_id: `${rowPrefix}:candidate:u_${current.u.toFixed(6)}:v_orb_${current.v_orb.toFixed(6)}`,
    schema: "oblate_spheroid_near_edge_basin_candidate_row.v0",
    source_row_id: current.row_id,
    u: current.u,
    v_orb: current.v_orb,
    chi: current.chi,
    local_values: {
      residual_value: current.residual_value,
      objective_value: current.objective_value,
      beta_max: current.beta_max,
      root_budget_margin: current.root_budget_margin,
    },
    dynamic_return_status: {
      dynamic_probe_present: current.dynamic_probe_present,
      bounded_return_observed: current.bounded_return_observed,
      stable_support_radius_observed: current.stable_support_radius_observed,
      dynamic_beta_max: current.dynamic_beta_max,
      dynamic_root_margin: current.dynamic_root_margin,
      position_return_rms: current.position_return_rms,
      velocity_return_rms: current.velocity_return_rms,
      radius_mean_deviation: current.radius_mean_deviation,
      dynamic_bounded_return: dynamicBoundedReturn,
    },
    branch_curve_status: {
      branch_curve_candidate: current.branch_curve_candidate,
      preferred_branch_curve_selected: current.preferred_branch_curve_selected,
      branch_curve_objective: current.branch_curve_objective,
      support_rms_acceleration: current.support_rms_acceleration,
      branch_clock_lock_rms_acceleration: current.branch_clock_lock_rms_acceleration,
    },
    finite_difference: {
      dE_du: dEDu,
      dE_dv_orb: dEDvOrb,
      dObjective_du: dObjectiveDu,
      dObjective_dv_orb: dObjectiveDvOrb,
      finite_difference_complete: finiteDifferenceComplete,
    },
    near_edge_status: {
      beta_edge_tolerance: betaEdgeTolerance,
      beta_edge_distance: betaEdgeDistance,
      positive_root_budget_margin: positiveMargin,
      beta_max_subfield: current.beta_max != null && current.beta_max < 1,
      near_edge_positive_margin: nearEdge,
      status: nearEdge ? "positive_margin_near_edge_row" : "not_positive_margin_near_edge_row",
    },
    edge_constrained_basin_status: edgeStatus,
    partner_root_coverage_status: partnerRootCoverageStatus,
    same_source_coverage_blocker: sameSourceCoverageBlocker,
    retained_root_ledger_ref: current.retained_root_ledger_ref,
    accepted: false,
    hard_math_candidate: hardMathCandidate,
  };
}

function firstMissing(candidateRows, allCertificateRows) {
  if (candidateRows.length > 0) {
    return {
      artifact_status: "priority_only_near_edge_basin_certificate_present_retained_evidence_blocked",
      hard_math_status: "near_edge_finite_difference_certificate_present",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: FIRST_MISSING_FIELD,
      reason: "retained_root_ledger_missing",
    };
  }
  const nearEdgeRows = allCertificateRows.filter((row) => row.near_edge_status.near_edge_positive_margin);
  const nearEdgeBoundedRows = nearEdgeRows.filter((row) => row.dynamic_return_status.dynamic_bounded_return);
  if (nearEdgeRows.length > 0 && nearEdgeBoundedRows.length === 0) {
    return {
      artifact_status: "fail_closed_missing_bounded_dynamic_return",
      hard_math_status: "near_edge_rows_missing_bounded_dynamic_return",
      first_missing_object: "bounded_dynamic_return_for_near_edge_basin_certificate",
      first_missing_field: "oblate_spheroid_near_edge_basin_certificate.rows[*].dynamic_return_status",
      reason: "bounded_dynamic_return_missing",
    };
  }
  if (nearEdgeRows.length > 0) {
    return {
      artifact_status: "fail_closed_missing_finite_difference_neighborhood",
      hard_math_status: "missing_finite_difference_neighborhood",
      first_missing_object: "finite_difference_neighborhood_for_near_edge_basin_certificate",
      first_missing_field: "oblate_spheroid_near_edge_basin_certificate.rows[*].finite_difference",
      reason: "finite_difference_neighborhood_missing",
    };
  }
  return {
    artifact_status: "fail_closed_no_positive_margin_near_edge_row",
    hard_math_status: "no_positive_margin_near_edge_row",
    first_missing_object: "positive_margin_near_edge_row_for_basin_certificate",
    first_missing_field: "oblate_spheroid_near_edge_basin_certificate.rows[*].near_edge_status",
    reason: "positive_margin_near_edge_row_missing",
  };
}

export function evaluateOblateSpheroidNearEdgeBasinCertificateEvidence(candidate = {}) {
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
      reason: "schema_not_oblate_spheroid_near_edge_basin_certificate_v0",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  return {
    accepted: false,
    reason: "producer_does_not_authorize_accepted_near_edge_basin_evidence",
    first_missing_field: "oblate_spheroid_near_edge_basin_certificate.acceptance_certificate_ref",
  };
}

export function buildOblateSpheroidNearEdgeBasinCertificate(input = {}) {
  const rows = normalizeRows(input);
  const preferredBranchCurveRowIds = new Set(
    (input.sourceArtifact?.preferred_branch_curve_rows ?? [])
      .map((row) => row?.row_id)
      .filter((rowId) => typeof rowId === "string")
  );
  const betaEdgeTolerance = Number.isFinite(Number(input.betaEdgeTolerance))
    ? Number(input.betaEdgeTolerance)
    : DEFAULT_BETA_EDGE_TOLERANCE;
  const grid = buildMetricGrid(rows, preferredBranchCurveRowIds);
  const artifactKey = {
    schema: SCHEMA,
    source_schema: input.sourceArtifact?.schema ?? null,
    source_row_id: input.sourceArtifact?.row_id ?? null,
    rows: grid.metrics.map((row) => ({
      row_id: row.row_id,
      u: row.u,
      v_orb: row.v_orb,
      residual_value: row.residual_value,
      objective_value: row.objective_value,
      beta_max: row.beta_max,
      root_budget_margin: row.root_budget_margin,
      bounded_return_observed: row.bounded_return_observed,
      dynamic_beta_max: row.dynamic_beta_max,
      dynamic_root_margin: row.dynamic_root_margin,
      branch_curve_objective: row.branch_curve_objective,
      preferred_branch_curve_selected: row.preferred_branch_curve_selected,
    })),
    betaEdgeTolerance,
  };
  const artifactHash = stableHash(artifactKey);
  const rowPrefix = `oblate_spheroid_near_edge_basin_certificate:${artifactHash.slice(0, 16)}`;
  const certificateRows = grid.metrics.map((row) => makeCertificateRow(rowPrefix, row, grid, betaEdgeTolerance));
  const candidateRows = certificateRows.filter((row) => row.hard_math_candidate);
  const missing = firstMissing(candidateRows, certificateRows);

  return {
    schema: SCHEMA,
    row_id: rowPrefix,
    artifact_hash: artifactHash,
    authority_class: "priority_only_hard_math_near_edge_basin_certificate_not_retained_evidence",
    source_two_speed_deformation_sweep: {
      schema: input.sourceArtifact?.schema ?? null,
      row_id: input.sourceArtifact?.row_id ?? null,
      artifact_hash: input.sourceArtifact?.artifact_hash ?? null,
      status: input.sourceArtifact?.artifact_status ?? null,
      first_missing_object: input.sourceArtifact?.first_missing_object ?? FIRST_MISSING_OBJECT,
      first_missing_field: input.sourceArtifact?.first_missing_field ?? FIRST_MISSING_FIELD,
    },
    parameters: {
      beta_edge_tolerance: betaEdgeTolerance,
      row_count: grid.metrics.length,
      u_values: grid.uValues,
      v_orb_values: grid.vOrbValues,
    },
    rows: certificateRows,
    near_edge_candidate_rows: candidateRows,
    summary: {
      row_count: certificateRows.length,
      near_edge_positive_margin_row_count: certificateRows.filter(
        (row) => row.near_edge_status.near_edge_positive_margin
      ).length,
      near_edge_bounded_return_row_count: certificateRows.filter(
        (row) =>
          row.near_edge_status.near_edge_positive_margin &&
          row.dynamic_return_status.dynamic_bounded_return
      ).length,
      preferred_branch_curve_selected_row_count: certificateRows.filter(
        (row) => row.branch_curve_status.preferred_branch_curve_selected
      ).length,
      finite_difference_complete_row_count: certificateRows.filter(
        (row) => row.finite_difference.finite_difference_complete
      ).length,
      hard_math_candidate_count: candidateRows.length,
      first_candidate_row_id: candidateRows[0]?.row_id ?? null,
      edge_constrained_basin_statuses: [
        ...new Set(certificateRows.map((row) => row.edge_constrained_basin_status)),
      ],
      same_source_coverage_blocker: candidateRows[0]?.same_source_coverage_blocker ?? null,
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

export function validateOblateSpheroidNearEdgeBasinCertificate(artifact) {
  const errors = [];
  if (artifact?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (!Array.isArray(artifact?.rows)) {
    errors.push("rows must be an array");
  }
  if (!Array.isArray(artifact?.near_edge_candidate_rows)) {
    errors.push("near_edge_candidate_rows must be an array");
  }
  if (artifact?.summary?.hard_math_candidate_count !== artifact?.near_edge_candidate_rows?.length) {
    errors.push("hard_math_candidate_count must match near_edge_candidate_rows length");
  }
  for (const row of artifact?.near_edge_candidate_rows ?? []) {
    if (row.near_edge_status?.near_edge_positive_margin !== true) {
      errors.push("candidate rows must be positive-margin near-edge rows");
    }
    if (row.finite_difference?.finite_difference_complete !== true) {
      errors.push("candidate rows must have complete finite-difference neighborhoods");
    }
    if (row.local_values?.beta_max >= 1 || row.local_values?.root_budget_margin <= 0) {
      errors.push("candidate rows must stay inside the positive root-budget edge");
    }
    if (row.dynamic_return_status?.dynamic_bounded_return !== true) {
      errors.push("candidate rows must carry bounded dynamic-return status");
    }
    if (row.dynamic_return_status?.dynamic_beta_max >= 1 || row.dynamic_return_status?.dynamic_root_margin <= 0) {
      errors.push("candidate rows must preserve dynamic sub-field speed and positive root margin");
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
    const result = evaluateOblateSpheroidNearEdgeBasinCertificateEvidence({ evidence_class: evidenceClass });
    if (result.accepted || result.reason !== reason) {
      errors.push(`${evidenceClass} negative control must reject as ${reason}`);
    }
  }
  return errors;
}

function runCli() {
  const inputPath = process.argv.find((arg) => arg.startsWith("--input="))?.slice("--input=".length);
  const input = inputPath ? { sourceArtifact: JSON.parse(fs.readFileSync(inputPath, "utf8")) } : {};
  const artifact = buildOblateSpheroidNearEdgeBasinCertificate(input);
  const errors = validateOblateSpheroidNearEdgeBasinCertificate(artifact);
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
