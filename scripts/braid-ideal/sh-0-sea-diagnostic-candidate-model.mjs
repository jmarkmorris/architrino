import crypto from "node:crypto";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

import { buildHeldReleaseSeedPathRows } from "./held-release-seed-path-rows.mjs";

export const SCHEMA = "sh_0_sea_diagnostic_candidate_model.v0";
export const AUTHORITY_CLASS = "diagnostic_candidate_model_not_accepted_evidence";

export const TARGET_RETAINED_RECORD_ID =
  "retained-record:held-release-six-point:adapter-acceptance-certificate";
export const TARGET_SOURCE_ROW_ID = "two-speed-preferred-row:u0.8:v0.2";
export const TARGET_PROVIDER_OBJECT_REF =
  "candidate:central_solver_retained_history_provider_object:7d4a8fe0a9792327";
export const TARGET_PROVIDER_ARTIFACT_HASH =
  "7d4a8fe0a97923270179f2ca0b49b4bc0d6b6ba3251b26e82569bdb4bd1f91df";
export const TARGET_ARTIFACT_ID = "held_release_seed_path_rows:5833f18e53586201";
export const TARGET_ARTIFACT_HASH =
  "5833f18e53586201775fdcd490efcc1e649841e5268a15eea022cad9ff706063";
export const ACCEPTED_EVIDENCE_BLOCKER_OBJECT = "held_release_seed_path_rows_acceptance_certificate.v0";
export const ACCEPTED_EVIDENCE_BLOCKER_FIELD = "held_release_seed_path_rows.acceptance_certificate_ref";
export const REQUIRED_INWARD_RESPONSE_FLOOR = -0.0934863484737535;
export const RESPONSE_RUN_SCHEMA = "sh_0_sea_diagnostic_response_run.v0";
export const DEFAULT_RESPONSE_DEADBAND = 1e-9;

const PROVIDER_PATH = new URL("../spacetime/noether-sea-density-compression-provider.v1.json", import.meta.url);

const AUTHORIZATION_FLAGS = Object.freeze([
  "accepted_same_record_evidence",
  "accepted_retained_evidence",
  "retained_branch_claim",
  "accepted_force_action_closure",
  "accepted_noether_sea_response_closure",
  "accepted_stability_claim",
  "accepted_branch_chart",
  "moving_retained_branch_certificate",
  "observer_export",
  "receiver_normal_branch_strength",
]);

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function normalizeStringRef(value) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function normalizeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeVector(value, fallback = null) {
  if (!Array.isArray(value) || value.length !== 3) {
    return fallback == null ? undefined : [...fallback];
  }
  const vector = value.map((entry) => Number(entry));
  if (vector.some((entry) => !Number.isFinite(entry))) {
    return fallback == null ? undefined : [...fallback];
  }
  return vector;
}

function cleanNumber(value) {
  const number = normalizeNumber(value, null);
  return number == null || Object.is(number, -0) ? 0 : number;
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function rowBySuffix(model, suffix) {
  return model.rows.find((row) => row.row_id === `sh_0_sea_model:${suffix}`) ?? null;
}

function buildDiagnosticResponseProbe({ model, options }) {
  const seaStateRow = rowBySuffix(model, "theta_sea_state_row");
  const thetaSea = seaStateRow?.theta_sea_rho_NS ?? {};
  const responseInputs = seaStateRow?.response_inputs ?? {};
  const rhoNs = normalizeNumber(thetaSea.rho_NS, 1);
  const normalizedDensity = normalizeNumber(thetaSea.n, 1);
  const eSea = normalizeNumber(thetaSea.e_sea, 0);
  const c1111 = normalizeNumber(responseInputs.C1111_X, 0);
  const providerStiffness = c1111 * rhoNs * normalizedDensity;
  return {
    schema: "sh_0_sea_diagnostic_response_probe.v0",
    probe_id:
      normalizeStringRef(options.responseRunHandle) ??
      `${model.run_matrix_metadata?.run_handle ?? "sh0sea-default"}:theta-sea-provider-e-sea-probe`,
    coefficient_source: "theta_sea_rho_NS provider row",
    stiffness_source: "C1111_X * rho_NS * n",
    radial_displacement_source:
      options.responseAmplitude == null ? "theta_sea_rho_NS.e_sea" : "cli:response-amplitude",
    radial_rate_source: options.responseRate == null ? "default_zero_radial_rate_probe" : "cli:response-rate",
    boundary_wake_source:
      options.boundaryWakeProjection == null
        ? "default_zero_boundary_wake_projection"
        : "cli:boundary-wake-projection",
    rho_NS: cleanNumber(rhoNs),
    n: cleanNumber(normalizedDensity),
    e_sea: cleanNumber(eSea),
    C1111_X: cleanNumber(c1111),
    K_NS_diag: cleanNumber(normalizeNumber(options.responseStiffness, providerStiffness)),
    Gamma_NS_diag: cleanNumber(normalizeNumber(options.responseDamping, 0)),
    Phi_probe: cleanNumber(normalizeNumber(options.responseAmplitude, eSea)),
    dot_Phi_probe: cleanNumber(normalizeNumber(options.responseRate, 0)),
    W_boundary_projection: cleanNumber(normalizeNumber(options.boundaryWakeProjection, 0)),
  };
}

function projectDiagnosticSeaResponse(probe) {
  return cleanNumber(
    -probe.K_NS_diag * probe.Phi_probe -
      probe.Gamma_NS_diag * probe.dot_Phi_probe +
      probe.W_boundary_projection
  );
}

function buildResponseFloorEvaluation({ probe, piRASea, options }) {
  const deadband = Math.max(0, normalizeNumber(options.inwardDeadband, DEFAULT_RESPONSE_DEADBAND));
  const requiredProjection = cleanNumber(REQUIRED_INWARD_RESPONSE_FLOOR - deadband);
  const weakestToyAcceleration = cleanNumber(-REQUIRED_INWARD_RESPONSE_FLOOR);
  const totalPostTurnAcceleration = cleanNumber(weakestToyAcceleration + piRASea);
  const crosses = piRASea < requiredProjection;
  const additionalInwardProjectionNeeded = cleanNumber(Math.max(0, piRASea - requiredProjection));
  const denominator = probe.K_NS_diag;
  const numerator =
    weakestToyAcceleration +
    deadband -
    probe.Gamma_NS_diag * probe.dot_Phi_probe +
    probe.W_boundary_projection;
  const requiredPhi =
    denominator > 0 ? cleanNumber(Math.max(0, numerator / denominator)) : null;
  const multiplier =
    requiredPhi != null && probe.Phi_probe > 0 ? cleanNumber(requiredPhi / probe.Phi_probe) : null;
  return {
    schema: "sh_0_sea_response_floor_evaluation.diagnostic.v0",
    weakest_outward_post_turn_ddot_R_toy: weakestToyAcceleration,
    inward_deadband: deadband,
    required_projected_response_floor: requiredProjection,
    Pi_R_A_sea: piRASea,
    total_post_turn_radial_acceleration: totalPostTurnAcceleration,
    crosses_inward_response_floor: crosses,
    post_turn_return_condition_passed: totalPostTurnAcceleration < -deadband,
    additional_inward_projection_needed: additionalInwardProjectionNeeded,
    required_Phi_probe_at_current_coefficients: requiredPhi,
    required_Phi_multiplier_vs_current_probe: multiplier,
    evidence_status: "diagnostic_floor_test_not_retained_evidence",
  };
}

function readNoetherSeaProvider() {
  return JSON.parse(fs.readFileSync(PROVIDER_PATH, "utf8"));
}

function buildTargetSourceArtifact(options = {}) {
  const targetRunOptionsActive =
    normalizeStringRef(options.embeddedCentralRunHandle) != null ||
    normalizeStringRef(options.proofId) != null ||
    normalizeVector(options.targetCenterGroupVelocity) != null ||
    options.surfaceSpeedFraction != null ||
    normalizeStringRef(options.prehistoryMode) != null;
  return buildHeldReleaseSeedPathRows({
    ...(targetRunOptionsActive
      ? {
          proofId: "SH-0",
          runHandle: normalizeStringRef(options.embeddedCentralRunHandle),
          sourceRowId: normalizeStringRef(options.targetSourceRowId) ?? TARGET_SOURCE_ROW_ID,
          groupVelocity: normalizeVector(options.targetCenterGroupVelocity),
          surfaceSpeedFraction: normalizeNumber(options.surfaceSpeedFraction, 0),
          prehistoryMode: normalizeStringRef(options.prehistoryMode),
        }
      : {}),
    retainedRecordId: TARGET_RETAINED_RECORD_ID,
    providerObjectRef: TARGET_PROVIDER_OBJECT_REF,
    providerArtifactHash: TARGET_PROVIDER_ARTIFACT_HASH,
  });
}

function summarizeTargetRows(artifact) {
  return artifact.rows.map((row, index) => ({
    index,
    row_id: row.row_id,
    architrino_id: row.path_identity.architrino_id,
    polarity: row.path_identity.polarity,
    seed_sign: row.path_identity.seed_sign,
    path_key: row.path_identity.path_key,
    retained_record_id: row.path_identity.retained_record_id,
    provider_object_ref: row.provider_provenance.provider_object_ref,
    accepted: false,
    first_missing_object: row.first_missing_object,
    first_missing_field: row.first_missing_field,
  }));
}

function buildTargetSourceRow(artifact) {
  return {
    row_id: "sh_0_sea_model:target_source_row",
    schema: "sh_0_sea_target_source_row.diagnostic.v0",
    authority_class: AUTHORITY_CLASS,
    proof_id: "SH-0-sea",
    target_proof_id: "SH-0",
    target_role: "central candidate target identity",
    candidate_artifact_id: artifact.artifact_id,
    candidate_artifact_hash: artifact.artifact_hash,
    run_matrix_metadata: artifact.run_matrix_metadata ?? null,
    seed_id: artifact.seed_id,
    route_id: artifact.route_id,
    retained_record_id: TARGET_RETAINED_RECORD_ID,
    source_row_id: artifact.source_row_id ?? TARGET_SOURCE_ROW_ID,
    provider_object_ref: TARGET_PROVIDER_OBJECT_REF,
    provider_artifact_hash: TARGET_PROVIDER_ARTIFACT_HASH,
    source_run_identity: artifact.source_run_identity,
    dynamic_replay_requirements: artifact.dynamic_replay_requirements,
    evidence_status: artifact.evidence_status,
    path_rows: summarizeTargetRows(artifact),
    accepted: false,
    first_missing_object: "held_release_seed_path_rows_acceptance_certificate",
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  };
}

function buildSeaStateRow(provider) {
  const rows = provider.thetaSeaRows;
  const responseRows = provider.responseRows;
  return {
    row_id: "sh_0_sea_model:theta_sea_state_row",
    schema: "sh_0_sea_theta_sea_state_row.diagnostic.v0",
    authority_class: AUTHORITY_CLASS,
    provider_source_path: "scripts/spacetime/noether-sea-density-compression-provider.v1.json",
    provider_schema: provider.schema,
    provider_status_for_own_domain: provider.providerStatus,
    target_binding_status: "not_bound_to_sh_0_sea_target_record",
    theta_sea_rho_NS: {
      rho_NS: rows.rho_NS?.rho_NS ?? null,
      n: rows.n?.n ?? null,
      u_sea: rows.u_sea?.u_sea ?? null,
      e_sea: rows.e_sea?.e_sea ?? null,
      thetaSeaId: rows.theta_sea?.thetaSeaId ?? null,
      f_N: rows.f_N?.f_N ?? null,
      eventLedgerRef: rows.rho_NS?.eventLedgerRef ?? null,
    },
    response_inputs: {
      channelId: responseRows.channel_declaration_row?.channelId ?? null,
      channelType: responseRows.channel_declaration_row?.channelType ?? null,
      c_X_disp_squared: responseRows.speed_row?.c_X_disp_squared ?? null,
      C1111_X: responseRows.stress_strain_row?.C1111_X ?? null,
      causality_residual: responseRows.causality_row?.residual ?? null,
      sameWindow: responseRows.correlation_row?.sameWindow ?? null,
    },
    accepted_for_sh_0_sea: false,
  };
}

function buildSeaPopulationRow() {
  return {
    row_id: "sh_0_sea_model:like_braid_population_row",
    schema: "sh_0_sea_like_braid_population_row.diagnostic.v0",
    authority_class: AUTHORITY_CLASS,
    population_role: "surrounding like Noether braid assemblies",
    population_variables: [
      "N_sea",
      "X_k(t)",
      "U_k(t)",
      "O_k(t)",
      "varphi_k(t)",
      "B_k(t)",
    ],
    paired_center_condition: "X_kprime(t)-C(t)=-(X_k(t)-C(t))",
    paired_velocity_condition: "U_kprime(t)-dot_C(t)=-(U_k(t)-dot_C(t))",
    orientation_phase_status: "recorded_not_assumed",
    selection_status: "diagnostic_symmetry_control_not_noether_sea_selection_rule",
    accepted: false,
  };
}

function buildFrameRow(artifact) {
  const targetVelocity = artifact.dynamic_replay_requirements.group_velocity;
  return {
    row_id: "sh_0_sea_model:local_target_sea_frame_row",
    schema: "sh_0_sea_local_target_sea_frame_row.diagnostic.v0",
    authority_class: AUTHORITY_CLASS,
    center_definition: "C(t)=mean_a x_a(t)",
    relative_position_definition: "y_a(t)=x_a(t)-C(t)",
    candidate_target_center_velocity: targetVelocity,
    rest_model_condition: "dot_C(t)-u_sea(C,t)=0 after target-center frame normalization",
    frame_note:
      "The candidate source rows carry center drift; this diagnostic model subtracts target-center motion before testing rest-shell support.",
    accepted: false,
  };
}

function buildBoundaryRow() {
  return {
    row_id: "sh_0_sea_model:boundary_condition_row",
    schema: "sh_0_sea_boundary_condition_row.diagnostic.v0",
    authority_class: AUTHORITY_CLASS,
    local_region: "Omega_C(t)",
    boundary_history: "H_boundary(t)={W_boundary,E_boundary,J_boundary,A_boundary}",
    required_inputs: [
      "candidate wake data from surrounding like-braid assemblies",
      "event rows crossing the local boundary",
      "diagnostic exchange flux through the boundary",
      "boundary action/exchange accumulator",
    ],
    hard_wall_allowed: false,
    accepted: false,
  };
}

function buildSeaResponseRow() {
  return {
    row_id: "sh_0_sea_model:sea_response_equation_row",
    schema: "sh_0_sea_response_equation_row.diagnostic.v0",
    authority_class: AUTHORITY_CLASS,
    equation_general:
      "a_sea_a(t)=A_sea_a(B_T(t),Theta_sea(t),Theta_asm(t),H_boundary(t))",
    equation_diagnostic_split:
      "A_sea_a=-K_NS[Theta,H] Phi_a yhat_a-Gamma_NS[Theta,H] dot_Phi_a yhat_a+W_boundary_a",
    radial_projection: "Pi_R A_sea=(1/6) sum_a yhat_a dot A_sea_a",
    coefficient_status:
      "K_NS and Gamma_NS are placeholders until derived from Noether sea state, like-braid population, boundary rows, and action/exchange provenance",
    accepted: false,
    first_missing_object: "retained_noether_sea_pressure_response_row",
    first_missing_field: "theta_sea_rho_NS",
  };
}

function buildSupportEnvelopeRow() {
  return {
    row_id: "sh_0_sea_model:support_envelope_row",
    schema: "sh_0_sea_support_envelope_row.diagnostic.v0",
    authority_class: AUTHORITY_CLASS,
    radius_definition: "R(t)=(1/6) sum_a |y_a(t)|",
    radial_velocity_definition: "dot_R(t)=(1/6) sum_a <y_a(t),dot_y_a(t)>/|y_a(t)|",
    radial_acceleration_definition: "ddot_R(t) approximately Delta dot_R / Delta t",
    post_turn_return_condition:
      "ddot_R_toy(t_i)+Pi_R A_sea(t_i)<0 for some t_i>t_star",
    stable_radius_condition:
      "dot_R=0 and ddot_R_toy+Pi_R A_sea=0 and partial_R(ddot_R_toy+Pi_R A_sea)<0",
    diagnostic_inward_response_floor: REQUIRED_INWARD_RESPONSE_FLOOR,
    floor_source:
      "weakest outward post-turn row in the current high-field held-release toy diagnostic",
    accepted: false,
  };
}

function buildActionExchangeRow() {
  return {
    row_id: "sh_0_sea_model:action_exchange_row",
    schema: "sh_0_sea_action_exchange_row.diagnostic.v0",
    authority_class: AUTHORITY_CLASS,
    response_work_rate: "dot_A_diag_sea_to_T=sum_a dot_y_a dot A_sea_a",
    diagnostic_action_residual: "R_A_diag=Delta_A_T+Delta_A_sea+Delta_A_boundary",
    physical_mass_claim: false,
    accepted_same_record_action_closure: false,
    accepted: false,
  };
}

function buildReceiverNormalRequirementRow() {
  return {
    row_id: "sh_0_sea_model:receiver_normal_requirement_row",
    schema: "sh_0_sea_receiver_normal_requirement_row.diagnostic.v0",
    authority_class: AUTHORITY_CLASS,
    required_fields: [
      "retained_record_id",
      "source_row_id",
      "receiver_path_identity",
      "source_path_identity",
      "causal_root_identity",
      "causal_root_residual",
      "jacobian",
      "sourceNormalDenominator",
      "receiverNormalFactor",
      "branchWeight",
      "provider_provenance",
      "action_wake_event_support_refs",
    ],
    current_equivalent_optional_fields: [
      "receiverNormalNumerator",
      "unsignedReceiverNormalFactor",
    ],
    required_target_coverage: {
      same_source_self_hit_rows: 6,
      directed_partner_causal_root_replay_rows: 30,
    },
    boundary_coverage:
      "boundary wake/event rows and any additional sea-response causal roots required by A_sea_a",
    rejected_weight_classes: [
      "source-normal-only",
      "jacobian-only",
      "eta^-2 |J|^-1",
    ],
    accepted: false,
  };
}

function buildAcceptedEvidenceBlocker(targetArtifact) {
  const sourceRowId = targetArtifact?.source_row_id ?? TARGET_SOURCE_ROW_ID;
  return {
    first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
    candidate_artifact_id: targetArtifact?.artifact_id ?? TARGET_ARTIFACT_ID,
    candidate_artifact_hash: targetArtifact?.artifact_hash ?? TARGET_ARTIFACT_HASH,
    required_certificate_ref_prefix:
      `accepted:held-release-seed-path-rows:${TARGET_RETAINED_RECORD_ID}:${sourceRowId}:`,
    next_external_authority_package:
      "held_release_seed_path_rows_external_accepted_authority_package.v0",
    later_requirements: [
      "repo_authorization_for_accepted_held_release_seed_path_rows",
      "central_solver_retained_source_adapter_same_record_accepted_evidence_package.v0",
      "same-record receiver-normal root-detail rows",
      "same-record action closure",
      "retained wake history",
      "provider provenance",
      "event/support rows",
      "SH-0-sea sea-response row",
    ],
  };
}

function buildRunMatrixMetadata({ options, targetArtifact }) {
  const runHandle = normalizeStringRef(options.runHandle);
  if (runHandle == null && targetArtifact?.run_matrix_metadata == null) {
    return null;
  }
  return {
    schema: "sh_0_sea_run_matrix_metadata.v0",
    proof_id: "SH-0-sea",
    run_handle: runHandle,
    embedded_central_run_handle: targetArtifact?.run_matrix_metadata?.run_handle ?? null,
    embedded_central_proof_id: "SH-0",
    source_artifact_id: targetArtifact?.artifact_id ?? null,
    source_artifact_hash: targetArtifact?.artifact_hash ?? null,
    source_row_id: targetArtifact?.source_row_id ?? TARGET_SOURCE_ROW_ID,
    target_center_group_velocity:
      targetArtifact?.run_matrix_metadata?.target_center_group_velocity ??
      targetArtifact?.dynamic_replay_requirements?.group_velocity ??
      null,
    surface_speed_fraction: targetArtifact?.run_matrix_metadata?.surface_speed_fraction ?? 0,
    prehistory_mode: targetArtifact?.run_matrix_metadata?.prehistory_mode ?? "stationary-held-release",
    evidence_status: targetArtifact?.evidence_status?.accepted_evidence_status ?? null,
  };
}

export function buildSh0SeaDiagnosticCandidateModel(options = {}) {
  const targetArtifact = buildTargetSourceArtifact(options);
  const provider = readNoetherSeaProvider();
  const rows = [
    buildTargetSourceRow(targetArtifact),
    buildSeaPopulationRow(),
    buildFrameRow(targetArtifact),
    buildSeaStateRow(provider),
    buildBoundaryRow(),
    buildSeaResponseRow(),
    buildSupportEnvelopeRow(),
    buildActionExchangeRow(),
    buildReceiverNormalRequirementRow(),
  ];
  const core = {
    schema: SCHEMA,
    proof_id: "SH-0-sea",
    ...(buildRunMatrixMetadata({ options, targetArtifact }) == null
      ? {}
      : { run_matrix_metadata: buildRunMatrixMetadata({ options, targetArtifact }) }),
    authority_class: AUTHORITY_CLASS,
    claim_level: "diagnostic/candidate model construction only",
    target_artifact_id: targetArtifact.artifact_id,
    target_artifact_hash: targetArtifact.artifact_hash,
    target_source_row_id: targetArtifact.source_row_id ?? TARGET_SOURCE_ROW_ID,
    row_count: rows.length,
    rows,
    evidence_status: {
      accepted: false,
      accepted_evidence_status: "diagnostic_candidate_model_not_accepted_evidence",
      source_artifact_id: targetArtifact.artifact_id,
      source_artifact_hash: targetArtifact.artifact_hash,
      source_row_id: targetArtifact.source_row_id ?? TARGET_SOURCE_ROW_ID,
      first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
      first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
    },
    accepted_evidence_blocker: buildAcceptedEvidenceBlocker(targetArtifact),
    authorization: makeAuthorization(),
  };
  return {
    ...core,
    artifact_hash: stableHash(core),
  };
}

export function evaluateSh0SeaDiagnosticCandidateModelEvidence(candidate) {
  if (candidate?.schema !== SCHEMA) {
    return {
      accepted: false,
      reason: "schema_not_sh_0_sea_diagnostic_candidate_model_v0",
      first_missing_field: "sh_0_sea_diagnostic_candidate_model.schema",
    };
  }
  return {
    accepted: false,
    reason: "diagnostic_candidate_model_not_accepted_retained_evidence",
    first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  };
}

export function buildSh0SeaDiagnosticResponseRun(options = {}) {
  const model = buildSh0SeaDiagnosticCandidateModel(options);
  const probe = buildDiagnosticResponseProbe({ model, options });
  const piRASea = projectDiagnosticSeaResponse(probe);
  const floorEvaluation = buildResponseFloorEvaluation({
    probe,
    piRASea,
    options,
  });
  const core = {
    schema: RESPONSE_RUN_SCHEMA,
    proof_id: "SH-0-sea",
    authority_class: AUTHORITY_CLASS,
    claim_level: "diagnostic response-run floor test only",
    target_artifact_id: model.target_artifact_id,
    target_artifact_hash: model.target_artifact_hash,
    target_source_row_id: model.target_source_row_id,
    run_matrix_metadata: model.run_matrix_metadata ?? null,
    model_artifact_hash: model.artifact_hash,
    response_probe: probe,
    response_equation:
      "Pi_R A_sea=-K_NS_diag*Phi_probe-Gamma_NS_diag*dot_Phi_probe+W_boundary_projection",
    floor_evaluation: floorEvaluation,
    evidence_status: {
      accepted: false,
      accepted_evidence_status: "diagnostic_response_run_not_accepted_evidence",
      first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
      first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
    },
    accepted_evidence_blocker: model.accepted_evidence_blocker,
    authorization: makeAuthorization(),
  };
  return {
    ...core,
    artifact_hash: stableHash(core),
  };
}

export function evaluateSh0SeaDiagnosticResponseRunEvidence(candidate) {
  if (candidate?.schema !== RESPONSE_RUN_SCHEMA) {
    return {
      accepted: false,
      reason: "schema_not_sh_0_sea_diagnostic_response_run_v0",
      first_missing_field: "sh_0_sea_diagnostic_response_run.schema",
    };
  }
  return {
    accepted: false,
    reason: "diagnostic_response_run_not_accepted_retained_evidence",
    first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  };
}

function parseArgs(args) {
  const stringOption = (name) => args.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3) ?? null;
  const numberOption = (name) => {
    const value = stringOption(name);
    return value == null ? undefined : Number(value);
  };
  const vectorOption = (name) => {
    const value = stringOption(name);
    if (value == null) {
      return undefined;
    }
    const vector = value.split(",").map((entry) => Number(entry.trim()));
    if (vector.length !== 3 || vector.some((entry) => !Number.isFinite(entry))) {
      throw new TypeError(`--${name} must be a comma-separated vector with three finite numbers`);
    }
    return vector;
  };
  return {
    pretty: args.includes("--pretty"),
    responseRun: args.includes("--response-run"),
    runHandle: stringOption("run-handle"),
    responseRunHandle: stringOption("response-run-handle"),
    embeddedCentralRunHandle: stringOption("embedded-central-run-handle"),
    targetSourceRowId: stringOption("source-row-id"),
    targetCenterGroupVelocity: vectorOption("target-center-group-velocity") ?? vectorOption("group-velocity"),
    surfaceSpeedFraction: numberOption("surface-speed-fraction") ?? numberOption("surface-speed"),
    prehistoryMode: stringOption("prehistory-mode"),
    responseAmplitude: numberOption("response-amplitude"),
    responseRate: numberOption("response-rate"),
    responseStiffness: numberOption("response-stiffness"),
    responseDamping: numberOption("response-damping"),
    boundaryWakeProjection: numberOption("boundary-wake-projection"),
    inwardDeadband: numberOption("inward-deadband"),
  };
}

function printUsage() {
  console.log(
    `Usage: node ${fileURLToPath(import.meta.url)} [--pretty] [--response-run] [--run-handle=<handle>] [--embedded-central-run-handle=<handle>] [--target-center-group-velocity=x,y,z] [--surface-speed-fraction=<number>] [--prehistory-mode=stationary-held-release|kick-at-release|moving-prehistory] [--response-amplitude=<number>] [--response-rate=<number>] [--response-stiffness=<number>] [--response-damping=<number>] [--boundary-wake-projection=<number>] [--inward-deadband=<number>]`
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    printUsage();
    process.exit(0);
  }
  const options = parseArgs(process.argv.slice(2));
  const artifact = options.responseRun
    ? buildSh0SeaDiagnosticResponseRun(options)
    : buildSh0SeaDiagnosticCandidateModel(options);
  console.log(JSON.stringify(artifact, null, options.pretty ? 2 : 0));
}
