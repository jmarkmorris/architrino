import crypto from "node:crypto";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

export const SCHEMA = "braid_ideal_wiggle_return_response_target.v0";
export const FIRST_MISSING_OBJECT = "central_solver_retained_history_provider_object";
export const FIRST_MISSING_FIELD = "central_solver_retained_history_row.provider_provenance.provider_object_ref";
export const RETAINED_ROOT_LEDGER_BLOCKER = "same_record_retained_root_ledger_for_two_speed_deformation_sweep";
export const RETAINED_ROOT_LEDGER_FIELD =
  "oblate_spheroid_two_speed_deformation_sweep.rows[*].root_ledger_status.retained_root_ledger_ref";

const AUTHORIZATION_FLAGS = Object.freeze([
  "accepted_same_record_evidence",
  "accepted_wiggle_return_response",
  "retainedBranchClaim",
  "acceptedSameLevelBranchClaim",
  "preferred_configuration_claim",
  "accepted_branch_chart",
  "accepted_transition_source",
  "moving_retained_branch_certificate",
  "same_ledger_action_measure_row",
  "bounded_speed_live_ledger",
  "receiver_normal_branch_strength",
  "noether_sea_response",
]);

export const NEGATIVE_CONTROL_REASONS = Object.freeze({
  fixture: "fixture_not_accepted_wiggle_return_response_evidence",
  diagnostic: "diagnostic_not_accepted_wiggle_return_response_evidence",
  target_contract: "target_contract_not_accepted_wiggle_return_response_evidence",
  dirty_toy_output: "dirty_toy_output_not_accepted_wiggle_return_response_evidence",
  generated_decoy: "generated_decoy_not_accepted_wiggle_return_response_evidence",
  proxy_row: "proxy_row_not_accepted_wiggle_return_response_evidence",
  proxy_ref: "proxy_ref_not_accepted_wiggle_return_response_evidence",
  candidate_ref: "candidate_ref_not_accepted_wiggle_return_response_evidence",
  aggregate_row: "aggregate_row_not_same_record_wiggle_return_response_evidence",
  source_contract_shell: "source_contract_shell_not_accepted_wiggle_return_response_evidence",
  temp_probe: "temp_probe_not_accepted_wiggle_return_response_evidence",
  endpoint_only_row: "endpoint_only_row_not_wiggle_return_response_evidence",
  sampled_residual: "sampled_residual_not_accepted_wiggle_return_response_evidence",
  toy_wiggle_window: "toy_wiggle_window_not_retained_history_evidence",
  noether_sea_parameter_guess: "noether_sea_parameter_guess_not_retained_pressure_row_evidence",
  retained_root_ledger_placeholder: "retained_root_ledger_placeholder_not_wiggle_return_response_evidence",
  synthetic_accepted_ref: "synthetic_accepted_ref_not_wiggle_return_response_evidence",
});

const EPSILON_FALLBACK = 1e-9;

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function finiteNumber(value) {
  if (value == null) {
    return null;
  }
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function cleanNumber(value) {
  const number = finiteNumber(value);
  if (number == null) {
    return null;
  }
  return Object.is(number, -0) ? 0 : number;
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function normalizeToyResult(input) {
  return input?.toyResult ?? input?.result ?? input ?? {};
}

function reducedRadiusDiagnostics(toyResult) {
  return toyResult?.reducedRadiusDiagnostics ?? toyResult?.reduced_radius_diagnostics ?? null;
}

function trajectoryDiagnostics(toyResult) {
  return toyResult?.trajectoryDiagnostics ?? toyResult?.trajectory_diagnostics ?? null;
}

function firstPresent(pairs) {
  for (const [condition, value] of pairs) {
    if (condition) {
      return value;
    }
  }
  return null;
}

function makeSourceSummary(toyResult) {
  const reduced = reducedRadiusDiagnostics(toyResult);
  const wiggle = trajectoryDiagnostics(toyResult);
  return {
    toy_result_schema: toyResult?.schema ?? null,
    preset: toyResult?.configuration?.preset ?? reduced?.preset ?? wiggle?.preset ?? null,
    configuration: toyResult?.configuration
      ? {
          fieldSpeed: cleanNumber(toyResult.configuration.fieldSpeed),
          duration: cleanNumber(toyResult.configuration.duration),
          dt: cleanNumber(toyResult.configuration.dt),
          includeSelfHits: toyResult.configuration.includeSelfHits === true,
          groupVelocity: toyResult.configuration.groupVelocity ?? null,
        }
      : null,
    trajectory_diagnostic_schema: wiggle?.schema ?? null,
    trajectory_status: wiggle?.status ?? null,
    first_wiggle_blocker: wiggle?.firstWiggleBlocker ?? null,
    reduced_radius_diagnostic_schema: reduced?.schema ?? null,
    reduced_radius_status: reduced?.status ?? null,
    first_reduced_radius_blocker: reduced?.firstReducedRadiusBlocker ?? null,
  };
}

function makeReturnResponseGap(reduced = {}) {
  const epsilon = finiteNumber(reduced?.thresholds?.radialAccelerationEpsilon) ?? EPSILON_FALLBACK;
  const summary = reduced?.postFirstExpansionSummary ?? {};
  const minRow = summary?.minRadialAccelerationRow ?? null;
  const maxRow = summary?.maxRadialAccelerationRow ?? null;
  const minAcceleration = finiteNumber(minRow?.radialAccelerationMean);
  const maxAcceleration = finiteNumber(maxRow?.radialAccelerationMean);
  const requiredInwardAccelerationMagnitude =
    minAcceleration == null ? null : Math.max(0, minAcceleration + epsilon);
  return {
    schema: "braid_ideal_wiggle_return_response_gap_row.v0",
    source_reduced_radius_status: reduced?.status ?? null,
    first_compression_to_expansion_turn: reduced?.firstCompressionToExpansionTurn ?? null,
    post_first_expansion_row_count: summary?.rowCount ?? 0,
    post_first_expansion_inward_rows: summary?.inwardRows ?? 0,
    post_first_expansion_outward_rows: summary?.outwardRows ?? 0,
    post_first_expansion_deadband_rows: summary?.deadbandRows ?? 0,
    min_post_first_expansion_radial_acceleration_row: minRow,
    max_post_first_expansion_radial_acceleration_row: maxRow,
    min_post_first_expansion_radial_acceleration: cleanNumber(minAcceleration),
    max_post_first_expansion_radial_acceleration: cleanNumber(maxAcceleration),
    required_inward_acceleration_magnitude: cleanNumber(requiredInwardAccelerationMagnitude),
    required_response_acceleration_delta:
      requiredInwardAccelerationMagnitude == null ? null : cleanNumber(-requiredInwardAccelerationMagnitude),
    equation_form:
      "ddot_R_total(t)=ddot_R_toy(t)+a_R_response(t); require some post-first-pass row with ddot_R_total < 0",
    accepted: false,
  };
}

function makeRouteRows(rowPrefix, responseGap) {
  const responseFields = {
    required_inward_acceleration_magnitude: responseGap.required_inward_acceleration_magnitude,
    required_response_acceleration_delta: responseGap.required_response_acceleration_delta,
    min_post_first_expansion_radial_acceleration: responseGap.min_post_first_expansion_radial_acceleration,
    post_first_expansion_row_count: responseGap.post_first_expansion_row_count,
  };
  return [
    {
      rank: 1,
      route_id: "central_solver_retained_history_return_response",
      row_id: `${rowPrefix}:route:central_solver_retained_history_return_response`,
      equation_form: "a_R^RH = Pi_R R_RH(path_history, same_source_self_hits, causal_root_replay)",
      required_same_record_input_rows: [
        "central_solver_retained_history_row",
        "path_history_stream_ids",
        "same_source_self_hit_rows",
        "partner_causal_root_replay_rows",
        "retained_wake_history_rows",
        "retained_source_binding",
        "provider_provenance",
      ],
      expected_radial_acceleration_direction: "inward after the first compression-to-expansion turn",
      measured_response_gap: responseFields,
      current_status: "source_acquisition_blocked",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: FIRST_MISSING_FIELD,
      accepted: false,
    },
    {
      rank: 2,
      route_id: "same_record_wake_ledger_return_response",
      row_id: `${rowPrefix}:route:same_record_wake_ledger_return_response`,
      equation_form: "a_R^W = Pi_R R_W(wake_ledger_rows, causal_root_replay, action_closure)",
      required_same_record_input_rows: [
        "same-record wake ledger rows",
        "causal-root replay rows",
        "same-record action closure row",
        "retained root ledger",
      ],
      expected_radial_acceleration_direction: "wake response supplies a second inward turn",
      measured_response_gap: responseFields,
      current_status: "source_acquisition_blocked",
      first_missing_object: "same_record_wake_ledger_return_response",
      first_missing_field: "same_record_wake_ledger_rows",
      accepted: false,
    },
    {
      rank: 3,
      route_id: "same_ledger_action_measure_return_response",
      row_id: `${rowPrefix}:route:same_ledger_action_measure_return_response`,
      equation_form: "a_R^A = Pi_R R_A(action_functional, root_support_event_rows, retained_source_binding)",
      required_same_record_input_rows: [
        "bounded-speed live ledger",
        "same-ledger action-measure row",
        "accepted root-support event rows",
        "action_functional",
        "provider provenance",
      ],
      expected_radial_acceleration_direction: "action functional changes sign after first expansion",
      measured_response_gap: responseFields,
      current_status: "source_acquisition_blocked",
      first_missing_object: "bounded_speed_same_ledger_action_measure_row",
      first_missing_field: "action_functional",
      accepted: false,
    },
    {
      rank: 4,
      route_id: "noether_sea_pressure_tension_return_response",
      row_id: `${rowPrefix}:route:noether_sea_pressure_tension_return_response`,
      equation_form: "a_R^NS = Pi_R R_NS(theta_sea, retained pressure-row, tension, relaxation)",
      required_same_record_input_rows: [
        "Noether sea retained pressure-row",
        "theta_sea_rho_NS",
        "pressure/tension/relaxation rows",
        "same-record provider provenance",
      ],
      expected_radial_acceleration_direction: "Noether sea pressure or tension supplies the missing inward return response",
      measured_response_gap: responseFields,
      current_status: "source_acquisition_blocked",
      first_missing_object: "retained_noether_sea_pressure_response_row",
      first_missing_field: "theta_sea_rho_NS",
      accepted: false,
    },
    {
      rank: 5,
      route_id: "angular_momentum_shielding_return_response",
      row_id: `${rowPrefix}:route:angular_momentum_shielding_return_response`,
      equation_form: "a_R^J = Pi_R R_J(Delta L_branch, shielding_response_gradient, branch_row)",
      required_same_record_input_rows: [
        "angular momentum row",
        "shielding response row",
        "branch row",
        "moving retained branch certificate",
        "accepted branch chart",
      ],
      expected_radial_acceleration_direction: "angular-momentum and shielding rows supply a retained return response",
      measured_response_gap: responseFields,
      current_status: "source_acquisition_blocked",
      first_missing_object: "torque_wake_retained_active_row_branch_certificate_evidence_object",
      first_missing_field: "branch_certificate_ref",
      accepted: false,
    },
  ];
}

function firstMissing(toyResult, responseGap) {
  const reduced = reducedRadiusDiagnostics(toyResult);
  const wiggle = trajectoryDiagnostics(toyResult);
  const checks = reduced?.checks ?? {};
  const wiggleChecks = wiggle?.checks ?? {};
  const missingStatus = firstPresent([
    [
      reduced?.schema !== "braid-ideal-reduced-radius-equation-diagnostic.v1",
      {
        artifact_status: "fail_closed_missing_reduced_radius_diagnostic",
        hard_math_status: "reduced_radius_diagnostic_missing",
        first_missing_object: "braid_ideal_reduced_radius_equation_diagnostic",
        first_missing_field: "toyResult.reducedRadiusDiagnostics",
        reason: "reduced_radius_diagnostic_missing",
      },
    ],
    [
      checks.symmetryWindowPass !== true,
      {
        artifact_status: "fail_closed_same_level_window_lost",
        hard_math_status: "same_level_window_missing",
        first_missing_object: "same_level_symmetry_window",
        first_missing_field: "trajectoryDiagnostics.checks.symmetryWindowPass",
        reason: wiggle?.firstWiggleBlocker ?? "same_level_window_symmetry_lost",
      },
    ],
    [
      checks.rootCoveragePass !== true,
      {
        artifact_status: "fail_closed_causal_root_coverage_lost",
        hard_math_status: "causal_root_coverage_missing",
        first_missing_object: "same_record_causal_root_replay",
        first_missing_field: "trajectoryDiagnostics.checks.rootCoveragePass",
        reason: wiggle?.firstWiggleBlocker ?? "causal_root_coverage_lost_in_toy_window",
      },
    ],
    [
      checks.fieldSpeedPass !== true,
      {
        artifact_status: "fail_closed_field_speed_crossing_before_return_response_target",
        hard_math_status: "field_speed_crossing_blocks_return_response_target",
        first_missing_object: "sub_field_speed_wiggle_window",
        first_missing_field: "trajectoryDiagnostics.checks.fieldSpeedPass",
        reason: wiggle?.firstWiggleBlocker ?? "field_speed_crossing_before_reduced_radius_equation",
      },
    ],
    [
      checks.selfHitProbePass !== true,
      {
        artifact_status: "fail_closed_same_source_self_hit_rows_absent_in_toy_probe",
        hard_math_status: "same_source_self_hit_rows_missing",
        first_missing_object: "same_source_self_hit_rows",
        first_missing_field: "trajectoryDiagnostics.checks.selfHitProbePass",
        reason: wiggle?.firstWiggleBlocker ?? "same_source_self_hit_rows_absent_in_toy_probe",
      },
    ],
    [
      checks.compressionToExpansionTurnObserved !== true,
      {
        artifact_status: "fail_closed_first_compression_turn_absent",
        hard_math_status: "compression_to_expansion_turn_missing",
        first_missing_object: "first_compression_to_expansion_turn",
        first_missing_field: "reducedRadiusDiagnostics.firstCompressionToExpansionTurn",
        reason: reduced?.firstReducedRadiusBlocker ?? "first_radial_turn_not_detected",
      },
    ],
    [
      responseGap.post_first_expansion_row_count <= 0 ||
        responseGap.min_post_first_expansion_radial_acceleration == null,
      {
        artifact_status: "fail_closed_missing_post_first_expansion_acceleration_rows",
        hard_math_status: "post_first_expansion_acceleration_rows_missing",
        first_missing_object: "post_first_expansion_radial_acceleration_rows",
        first_missing_field: "reducedRadiusDiagnostics.postFirstExpansionSummary.minRadialAccelerationRow",
        reason: "post_first_expansion_acceleration_rows_missing",
      },
    ],
  ]);
  if (missingStatus) {
    return missingStatus;
  }
  if (wiggleChecks.postFirstExpansionReturnObserved === true && checks.postFirstExpansionInwardAccelerationObserved === true) {
    return {
      artifact_status: "return_candidate_observed_but_retained_solver_row_absent",
      hard_math_status: "return_response_candidate_measured",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: FIRST_MISSING_FIELD,
      reason: "retained_history_solver_row_absent",
    };
  }
  return {
    artifact_status: "priority_only_wiggle_return_response_target_present_retained_evidence_blocked",
    hard_math_status: "return_response_acceleration_floor_measured",
    first_missing_object: FIRST_MISSING_OBJECT,
    first_missing_field: FIRST_MISSING_FIELD,
    reason: "retained_history_solver_row_absent",
  };
}

export function evaluateBraidIdealWiggleReturnResponseEvidence(candidate = {}) {
  const evidenceClass = candidate.evidence_class ?? candidate.authority_class ?? candidate.source_class ?? null;
  if (evidenceClass && NEGATIVE_CONTROL_REASONS[evidenceClass]) {
    return {
      accepted: false,
      reason: NEGATIVE_CONTROL_REASONS[evidenceClass],
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  const ref =
    candidate.retained_root_ledger_ref ??
    candidate.accepted_wiggle_return_response_ref ??
    candidate.acceptance_certificate_ref ??
    null;
  if (typeof ref === "string" && /^(proxy|candidate|synthetic|placeholder):/.test(ref)) {
    return {
      accepted: false,
      reason: "proxy_or_synthetic_ref_not_accepted_wiggle_return_response_evidence",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (
    candidate.accepted_wiggle_return_response === true ||
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
      reason: "schema_not_braid_ideal_wiggle_return_response_target_v0",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  return {
    accepted: false,
    reason: "producer_does_not_authorize_accepted_wiggle_return_response_evidence",
    first_missing_field: "braid_ideal_wiggle_return_response_target.acceptance_certificate_ref",
  };
}

export function buildBraidIdealWiggleReturnResponseTarget(input = {}) {
  const toyResult = normalizeToyResult(input);
  const sourceSummary = makeSourceSummary(toyResult);
  const reduced = reducedRadiusDiagnostics(toyResult);
  const responseGap = makeReturnResponseGap(reduced ?? {});
  const artifactKey = {
    schema: SCHEMA,
    sourceSummary,
    responseGap,
  };
  const artifactHash = stableHash(artifactKey);
  const rowPrefix = `braid_ideal_wiggle_return_response_target:${artifactHash.slice(0, 16)}`;
  const routeRows = makeRouteRows(rowPrefix, responseGap);
  const missing = firstMissing(toyResult, responseGap);

  return {
    schema: SCHEMA,
    row_id: rowPrefix,
    artifact_hash: artifactHash,
    authority_class: "priority_only_wiggle_return_response_target_not_retained_evidence",
    source_artifacts: sourceSummary,
    response_gap_row: {
      row_id: `${rowPrefix}:response_gap`,
      ...responseGap,
    },
    return_response_route_rows: routeRows,
    route_matrix: routeRows.map((row) => ({
      rank: row.rank,
      route_id: row.route_id,
      current_status: row.current_status,
      first_missing_object: row.first_missing_object,
      first_missing_field: row.first_missing_field,
    })),
    summary: {
      route_row_count: routeRows.length,
      top_ranked_route: routeRows[0]?.route_id ?? null,
      post_first_expansion_row_count: responseGap.post_first_expansion_row_count,
      post_first_expansion_inward_rows: responseGap.post_first_expansion_inward_rows,
      required_inward_acceleration_magnitude: responseGap.required_inward_acceleration_magnitude,
      required_response_acceleration_delta: responseGap.required_response_acceleration_delta,
      retained_root_ledger_first_missing_object: RETAINED_ROOT_LEDGER_BLOCKER,
      retained_root_ledger_first_missing_field: RETAINED_ROOT_LEDGER_FIELD,
    },
    source_status: "source_acquisition_blocked",
    artifact_status: missing.artifact_status,
    hard_math_status: missing.hard_math_status,
    first_missing_object: missing.first_missing_object,
    first_missing_field: missing.first_missing_field,
    retained_evidence_blocker: {
      first_missing_object: RETAINED_ROOT_LEDGER_BLOCKER,
      first_missing_field: RETAINED_ROOT_LEDGER_FIELD,
    },
    authorization: makeAuthorization(),
    accepted_wiggle_return_response_ref: null,
    retained_root_ledger_ref: null,
    accepted_noether_sea_response_ref: null,
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

export function validateBraidIdealWiggleReturnResponseTarget(artifact) {
  const errors = [];
  if (artifact?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (!artifact?.response_gap_row || artifact.response_gap_row.schema !== "braid_ideal_wiggle_return_response_gap_row.v0") {
    errors.push("response_gap_row must be present");
  }
  if (!Array.isArray(artifact?.return_response_route_rows)) {
    errors.push("return_response_route_rows must be an array");
  }
  if (artifact?.summary?.route_row_count !== artifact?.return_response_route_rows?.length) {
    errors.push("summary route_row_count must match return_response_route_rows length");
  }
  if (artifact?.return_response_route_rows?.[0]?.route_id !== "central_solver_retained_history_return_response") {
    errors.push("central solver retained-history return response must be the top-ranked route");
  }
  for (const row of artifact?.return_response_route_rows ?? []) {
    if (row.accepted !== false) {
      errors.push("return response route rows must remain non-authorizing");
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
  if (artifact?.accepted_wiggle_return_response_ref !== null) {
    errors.push("accepted_wiggle_return_response_ref must remain null");
  }
  if (artifact?.retained_root_ledger_ref !== null) {
    errors.push("retained_root_ledger_ref must remain null");
  }
  if (artifact?.accepted_noether_sea_response_ref !== null) {
    errors.push("accepted_noether_sea_response_ref must remain null");
  }
  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    const result = evaluateBraidIdealWiggleReturnResponseEvidence({ evidence_class: evidenceClass });
    if (result.accepted || result.reason !== reason) {
      errors.push(`${evidenceClass} negative control must reject as ${reason}`);
    }
  }
  return errors;
}

function runCli() {
  const inputPath = process.argv.find((arg) => arg.startsWith("--input="))?.slice("--input=".length);
  const input = inputPath ? JSON.parse(fs.readFileSync(inputPath, "utf8")) : {};
  const artifact = buildBraidIdealWiggleReturnResponseTarget(input);
  const errors = validateBraidIdealWiggleReturnResponseTarget(artifact);
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
