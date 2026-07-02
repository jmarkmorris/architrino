import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

export const SCHEMA = "central_solver_retained_history_row.v0";
export const DEFAULT_SEED_ID = "braid-ideal:held-release:face-opposite:six-point:v0";
export const DEFAULT_ROUTE_ID = "braid-ideal:self-hit-held-release:face-opposite:v0";
export const DEFAULT_GROUP_VELOCITY = [1 / 60, 1 / 60, 1 / 60];

const DEFAULT_FIELD_SPEED = 1;
const DEFAULT_COUPLING = 1 / 36;
const DEFAULT_DURATION = 18;
const DEFAULT_TIME_STEP = 0.024;
const DEFAULT_HOLD_TIME = 4;

const SIX_POINT_SEED = [
  { architrino_id: "P:+x:+y:+z", polarity: "P", sign: 1, position: [1, 1, 1] },
  { architrino_id: "P:+x:-y:-z", polarity: "P", sign: 1, position: [1, -1, -1] },
  { architrino_id: "P:-x:+y:-z", polarity: "P", sign: 1, position: [-1, 1, -1] },
  { architrino_id: "E:-x:-y:-z", polarity: "E", sign: -1, position: [-1, -1, -1] },
  { architrino_id: "E:-x:+y:+z", polarity: "E", sign: -1, position: [-1, 1, 1] },
  { architrino_id: "E:+x:-y:+z", polarity: "E", sign: -1, position: [1, -1, 1] },
];

export const FIRST_MISSING_SOURCE_PROOF_FIELD =
  "central_solver_retained_history_row.provider_provenance.provider_object_ref";
export const INTERNAL_TANGENT_AUTHORITY_VECTOR_REQUEST_SCHEMA =
  "central_solver_internal_tangent_authority_vector_request.v0";
export const INTERNAL_TANGENT_AUTHORITY_FIRST_MISSING_OBJECT =
  "same_record_retained_solver_vector_rows_for_internal_tangent_authority";
export const INTERNAL_TANGENT_AUTHORITY_FIRST_MISSING_FIELD =
  "central_solver_retained_history_row.internal_tangent_authority_vector_request.minimum_norm_retained_history_gain_witness_row_ref";

export const NEGATIVE_CONTROL_REASONS = {
  fixture: "fixture_not_accepted_retained_history_evidence",
  dirty_toy_output: "dirty_toy_output_not_accepted_retained_history_evidence",
  diagnostic: "diagnostic_not_accepted_retained_history_evidence",
  priority_prose: "priority_prose_not_accepted_retained_history_evidence",
  generated_decoy: "generated_decoy_not_accepted_retained_history_evidence",
  proxy_row: "proxy_row_not_accepted_retained_history_evidence",
  candidate_ref: "candidate_ref_not_accepted_retained_history_evidence",
  aggregate_row: "aggregate_row_not_same_record_retained_history_evidence",
  h39_theta3minus_quotient_row: "h39_theta3minus_row_not_braid_ideal_retained_history_evidence",
  source_contract_shell: "source_contract_shell_not_accepted_retained_history_evidence",
  temp_probe: "temp_probe_not_accepted_retained_history_evidence",
  t3_row: "t3_row_not_braid_ideal_retained_history_evidence",
  endpoint_only_row: "endpoint_only_row_not_retained_history_evidence",
  affine_geometry_alone: "affine_geometry_alone_not_retained_history_evidence",
  cross_row_bundle: "cross_row_bundle_not_same_record_retained_history_evidence",
};

const AUTHORIZATION_FLAGS = [
  "accepted_same_record_evidence",
  "central_solver_retained_history_row",
  "retained_branch_claim",
  "accepted_transition_source",
  "moving_retained_branch_certificate",
  "same_ledger_action_measure_row",
  "bounded_speed_live_ledger",
  "receiver_normal_branch_strength",
];

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function normalizeVector(value, fallback) {
  if (!Array.isArray(value) || value.length !== 3) {
    return [...fallback];
  }
  return value.map((entry, index) => {
    const number = Number(entry);
    return Number.isFinite(number) ? number : fallback[index];
  });
}

function normalizeStringRef(value) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function formatIdPart(value) {
  return String(value)
    .replaceAll("+", "plus")
    .replaceAll("-", "minus")
    .replaceAll(":", "_")
    .replaceAll(".", "_")
    .replaceAll("/", "_");
}

function makeSeedRows() {
  return SIX_POINT_SEED.map((row) => ({ ...row, position: [...row.position] }));
}

function makePathHistoryStreamRequirements(rowPrefix, seedRows) {
  return seedRows.map((row, index) => ({
    architrino_id: row.architrino_id,
    required_stream_request_id: `${rowPrefix}:path-history-stream-request:${index}:${formatIdPart(
      row.architrino_id
    )}`,
    required_layout: "path_segment.v1",
    required_same_record_binding: true,
    required_dynamic_replay: true,
    path_history_stream_id: null,
    path_segment_manifest_ref: null,
    path_segment_artifact_hash: null,
    retained_record_id: null,
    first_missing_field: FIRST_MISSING_SOURCE_PROOF_FIELD,
  }));
}

function makeSameSourceSelfHitRequirements(rowPrefix, seedRows) {
  return seedRows.map((row, index) => ({
    row_id: `${rowPrefix}:same-source-self-hit:${index}:${formatIdPart(row.architrino_id)}`,
    receiver_architrino_id: row.architrino_id,
    source_architrino_id: row.architrino_id,
    required_relation: "strictly-delayed-same-source-root",
    required_same_record_binding: true,
    accepted_same_source_self_hit_row_ref: null,
    causal_root_replay_ref: null,
    first_missing_field: FIRST_MISSING_SOURCE_PROOF_FIELD,
  }));
}

function makePartnerCausalRootReplayRequirements(rowPrefix, seedRows) {
  const rows = [];
  for (const receiver of seedRows) {
    for (const source of seedRows) {
      if (receiver.architrino_id === source.architrino_id) {
        continue;
      }
      rows.push({
        row_id: `${rowPrefix}:partner-causal-root-replay:${formatIdPart(
          receiver.architrino_id
        )}:${formatIdPart(source.architrino_id)}`,
        receiver_architrino_id: receiver.architrino_id,
        source_architrino_id: source.architrino_id,
        required_relation: "directed-partner-causal-root-replay",
        required_same_record_binding: true,
        retained_causal_root_row_ref: null,
        causal_root_replay_ref: null,
        first_missing_field: FIRST_MISSING_SOURCE_PROOF_FIELD,
      });
    }
  }
  return rows;
}

function makeLedgerRequirement(rowPrefix, ledgerName) {
  return {
    ledger: ledgerName,
    hook_id: `${rowPrefix}:${ledgerName}:hook`,
    required_same_record_binding: true,
    accepted_rows: [],
    retained_record_id: null,
    provider_object_ref: null,
    first_missing_field: FIRST_MISSING_SOURCE_PROOF_FIELD,
  };
}

function makeInternalTangentAuthorityVectorRequest(rowPrefix) {
  return {
    schema: INTERNAL_TANGENT_AUTHORITY_VECTOR_REQUEST_SCHEMA,
    request_id: `${rowPrefix}:internal-tangent-authority-vector-request`,
    required: true,
    consumer_schema: "oblate_spheroid_internal_tangent_authority_certificate.v0",
    scope_note:
      "central-retained-history row request for the same-record vectors consumed by the internal tangent-authority evaluator",
    vector_space:
      "global retained acceleration vector over the declared architrino slot order for one preferred-curve row and one retained time slice",
    equations: {
      preferred_curve_stationarity:
        "J_u + J_v v_*'(u)=0",
      preferred_curve_slope:
        "v_*'(u)=-J_u/J_v",
      tangent_target:
        "T(q) = P_T(a_ansatz(q) - a_wake(q) - a_support(q)), q=(u,v_orb)",
      branch_clock_lock_replacement_residual:
        "abs(||T(q)|| - A_clock_rms(q)) <= epsilon_lock",
      causal_root_residual:
        "Phi_ab(t,tau;q)=||x_a(t;q)-x_b(t-tau;q)||^2-c_f^2 tau^2=0",
      causal_root_sensitivity:
        "d tau_ab/d q_i = - partial_{q_i} Phi_ab / partial_tau Phi_ab when |partial_tau Phi_ab| >= epsilon_tau",
      least_norm_provider:
        "a_provider^* = T + n_*",
      retained_history_response:
        "a_RH^*(q) = -P_T(K_x^*(q) e_x + K_v^*(q) e_v)",
      minimum_gain:
        "K_x^*(q)=-T(q) e_x^T/(||e_x||^2+||e_v||^2), K_v^*(q)=-T(q) e_v^T/(||e_x||^2+||e_v||^2)",
      preferred_curve_internal_provider:
        "a_internal^*(q)=a_RH^*(q)+n_*(q)",
      post_provider_margin:
        "m_dyn - Delta_T ||P_T a_internal^*(q)|| + Delta_M <a_internal^*(q),G_mu(q)> >= epsilon_mu",
    },
    preferred_curve_binding: {
      required: true,
      preferred_curve_finite_difference_row_ref: null,
      preferred_curve_internal_tangent_authority_equation_ref: null,
      branch_clock_lock_replacement_residual_ref: null,
      branch_clock_lock_target_row_ref: null,
      branch_clock_lock_reserve_row_ref: null,
      same_record_binding_required: true,
      required_equation_schema: "preferred_curve_internal_tangent_authority_equation.v0",
      first_missing_field: INTERNAL_TANGENT_AUTHORITY_FIRST_MISSING_FIELD,
    },
    required_same_record_rows: [
      {
        row: "same_record_retained_path_error_row",
        required_fields: [
          "source_row_id",
          "retained_record_id",
          "time",
          "particle_slot_order",
          "path_history_ref",
          "tangent_position_error_vector",
          "tangent_velocity_error_vector",
        ],
        evaluator_input_mapping: {
          tangent_position_error_vector:
            "minimum_norm_retained_history_gain_witness.tangent_position_error_vector",
          tangent_velocity_error_vector:
            "minimum_norm_retained_history_gain_witness.tangent_velocity_error_vector",
        },
      },
      {
        row: "same_record_retained_root_ledger_detail_rows",
        required_fields: [
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
        ],
        evaluator_input_mapping: {
          causal_root_residual_equation:
            "retained_history_tangent_response_equation_target.causal_root_residual_equation",
          root_sensitivity_equation:
            "retained_history_tangent_response_equation_target.root_sensitivity_equation",
          retained_path_error_vectors:
            "minimum_norm_retained_history_gain_witness.same_record_retained_path_error_row",
        },
      },
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
        evaluator_input_mapping: {
          tangent_target_vector: "minimum_norm_retained_history_gain_witness.tangent_target_vector",
          tangent_projector_matrix: "minimum_norm_retained_history_gain_witness.tangent_projector_matrix",
        },
      },
      {
        row: "active_causal_margin_gradient_vector_row",
        required_fields: [
          "retained_record_id",
          "active_margin_channel",
          "active_margin_value",
          "active_margin_event_ref",
          "active_margin_gradient_vector",
          "tangent_null_projector_matrix",
        ],
        evaluator_input_mapping: {
          active_margin_gradient_vector:
            "minimum_norm_retained_history_gain_witness.active_margin_gradient_vector",
          tangent_null_projector_matrix:
            "minimum_norm_retained_history_gain_witness.tangent_null_projector_matrix",
          dynamic_root_margin: "minimum_norm_retained_history_gain_witness.dynamic_root_margin",
        },
      },
      {
        row: "post_provider_root_margin_row",
        required_fields: [
          "retained_record_id",
          "post_provider_root_margin",
          "minimum_dynamic_root_margin_reserve",
          "tangent_response_horizon",
          "margin_lift_response_horizon",
          "positive_post_provider_root_margin",
        ],
        evaluator_input_mapping: {
          minimum_dynamic_root_margin_reserve:
            "minimum_norm_retained_history_gain_witness.minimum_dynamic_root_margin_reserve",
          tangent_response_horizon:
            "minimum_norm_retained_history_gain_witness.tangent_response_horizon",
          margin_lift_response_horizon:
            "minimum_norm_retained_history_gain_witness.margin_lift_response_horizon",
        },
      },
      {
        row: "same_record_closure_rows",
        required_fields: [
          "retained_record_id",
          "same_record_retained_root_ledger",
          "same_record_action_closure_row",
          "same_record_wake_history_ref",
          "same_record_path_history_ref",
        ],
        evaluator_input_mapping: {
          same_record_closure_rows:
            "minimum_norm_retained_history_gain_witness.same_record_closure_rows",
        },
      },
    ],
    evaluator_binding: {
      preferred_curve_equation_schema: "preferred_curve_internal_tangent_authority_equation.v0",
      minimum_gain_evaluator_schema: "minimum_norm_retained_history_gain_witness_evaluation.v0",
      same_record_witness_row_schema: "same_record_minimum_norm_retained_history_gain_witness_row.v0",
      retained_solver_vector_witness_row_schema: "retained_solver_internal_tangent_authority_vector_witness_row.v0",
      mathematical_pass_is_non_authorizing: true,
    },
    preferred_curve_internal_tangent_authority_equation_ref: null,
    retained_solver_vector_witness_row_ref: null,
    minimum_norm_retained_history_gain_witness_row_ref: null,
    accepted_internal_tangent_authority_ref: null,
    accepted: false,
    first_missing_object: INTERNAL_TANGENT_AUTHORITY_FIRST_MISSING_OBJECT,
    first_missing_field: INTERNAL_TANGENT_AUTHORITY_FIRST_MISSING_FIELD,
  };
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["score_movement", "no_score_increase"],
  ]);
}

export function evaluateRetainedHistoryEvidenceCandidate(candidate = {}) {
  const evidenceClass = candidate.evidence_class ?? candidate.authority_class ?? candidate.source_class ?? null;
  if (evidenceClass && NEGATIVE_CONTROL_REASONS[evidenceClass]) {
    return {
      accepted: false,
      reason: NEGATIVE_CONTROL_REASONS[evidenceClass],
      first_missing_field: FIRST_MISSING_SOURCE_PROOF_FIELD,
    };
  }
  if (candidate.schema !== SCHEMA) {
    return {
      accepted: false,
      reason: "schema_not_central_solver_retained_history_row_v0",
      first_missing_field: FIRST_MISSING_SOURCE_PROOF_FIELD,
    };
  }
  if (candidate.provider_provenance?.provider_object_ref == null) {
    return {
      accepted: false,
      reason: "provider_provenance_missing",
      first_missing_field: FIRST_MISSING_SOURCE_PROOF_FIELD,
    };
  }
  return {
    accepted: false,
    reason: "adapter_does_not_authorize_retained_history_evidence",
    first_missing_field: FIRST_MISSING_SOURCE_PROOF_FIELD,
  };
}

export function buildCentralSolverRetainedHistoryRow(options = {}) {
  const seedId = options.seedId ?? DEFAULT_SEED_ID;
  const routeId = options.routeId ?? DEFAULT_ROUTE_ID;
  const groupVelocity = normalizeVector(options.groupVelocity, DEFAULT_GROUP_VELOCITY);
  const retainedRecordId = normalizeStringRef(options.retainedRecordId);
  const providerObjectRef = normalizeStringRef(options.providerObjectRef);
  const providerArtifactHash = normalizeStringRef(options.providerArtifactHash);
  const providerBacked = providerObjectRef != null && retainedRecordId != null;
  const seedRows = makeSeedRows();
  const rowKey = {
    schema: SCHEMA,
    seedId,
    routeId,
    fieldSpeed: Number(options.fieldSpeed ?? DEFAULT_FIELD_SPEED),
    coupling: Number(options.coupling ?? DEFAULT_COUPLING),
    duration: Number(options.duration ?? DEFAULT_DURATION),
    dt: Number(options.dt ?? DEFAULT_TIME_STEP),
    holdTime: Number(options.holdTime ?? DEFAULT_HOLD_TIME),
    groupVelocity,
    retainedRecordId,
    providerObjectRef,
  };
  const artifactHash = stableHash(rowKey);
  const rowPrefix = `central_solver_retained_history_row:${artifactHash.slice(0, 16)}`;
  const firstMissingObject = providerBacked
    ? "central_solver_retained_history_row_acceptance_certificate"
    : "central_solver_retained_history_provider_object";
  const firstMissingField = providerBacked
    ? "central_solver_retained_history_row.acceptance_certificate_ref"
    : FIRST_MISSING_SOURCE_PROOF_FIELD;

  return {
    schema: SCHEMA,
    row_id: rowPrefix,
    artifact_hash: artifactHash,
    seed_id: seedId,
    route_id: routeId,
    retained_record_request: {
      required: true,
      retained_record_id: retainedRecordId,
      same_record_binding_status: providerBacked
        ? "provider_backed_retained_record_present_unaccepted"
        : "missing_provider_provenance",
      accepted_same_record_evidence: false,
      first_missing_field: firstMissingField,
    },
    artifact_status: providerBacked
      ? "provider_backed_retained_history_row_present_acceptance_blocked"
      : "fail_closed_missing_provider_provenance",
    source_status: providerBacked ? "candidate_provider_backed_source_unaccepted" : "source_acquisition_blocked",
    first_missing_object: firstMissingObject,
    first_missing_field: firstMissingField,
    consumer_blocker_replacement: {
      consumer_schema: "self_hit_held_release_solver_row.v0",
      previous_first_missing_field: "central_solver_retained_history_row",
      sharpened_first_missing_field: FIRST_MISSING_SOURCE_PROOF_FIELD,
    },
    seed: {
      seed_kind: "six_point_face_opposite_held_release",
      point_count: seedRows.length,
      rows: seedRows,
    },
    held_prehistory_metadata: {
      hold_time: rowKey.holdTime,
      prehistory_status: "declared_request_not_retained",
      stationary_in_moving_center_frame: true,
      central_solver_retained_history_row_ref: null,
    },
    dynamics: {
      field_speed: rowKey.fieldSpeed,
      coupling: rowKey.coupling,
      duration: rowKey.duration,
      dt: rowKey.dt,
      dynamic_center: {
        required: true,
        center_kind: "same-record-dynamic-center",
        value: null,
        first_missing_field: FIRST_MISSING_SOURCE_PROOF_FIELD,
      },
      group_velocity: {
        required: true,
        value: groupVelocity,
        source_status: "declared_seed_parameter_not_retained_history_evidence",
      },
    },
    path_history_stream_requirements: makePathHistoryStreamRequirements(rowPrefix, seedRows),
    same_source_self_hit_requirements: makeSameSourceSelfHitRequirements(rowPrefix, seedRows),
    partner_causal_root_replay_requirements: makePartnerCausalRootReplayRequirements(rowPrefix, seedRows),
    wake_ledger_hook_requirement: makeLedgerRequirement(rowPrefix, "retained_wake_history_rows"),
    action_ledger_hook_requirement: makeLedgerRequirement(rowPrefix, "same_record_action_ledger_rows"),
    branch_row_identity_requirement: {
      required: true,
      branch_row_identity_ref: null,
      required_fields: [
        "branch_row_id",
        "retained_record_id",
        "same_record_binding",
        "receiver_normal_branch_strength_linkage",
      ],
      first_missing_field: FIRST_MISSING_SOURCE_PROOF_FIELD,
    },
    oblate_spheroid_residual_row_requirement: {
      required: true,
      residual_rows: [],
      required_fields: [
        "dynamic_center",
        "group_velocity",
        "equatorial_radius",
        "polar_radius",
        "flattening_ratio",
        "same_record_residual_norm",
      ],
      first_missing_field: FIRST_MISSING_SOURCE_PROOF_FIELD,
    },
    internal_tangent_authority_vector_request: makeInternalTangentAuthorityVectorRequest(rowPrefix),
    retained_source_binding_requirement: {
      required: true,
      retained_source_binding_ref: null,
      retained_record_id: null,
      first_missing_field: FIRST_MISSING_SOURCE_PROOF_FIELD,
    },
    provider_provenance: {
      required: true,
      provider_object_ref: providerObjectRef,
      provider_artifact_hash: providerArtifactHash,
      producer_owner: "central_solver_retained_history_row.v0",
      status: providerBacked ? "provider_object_ref_present_unaccepted" : "missing_provider_object_ref",
      first_missing_field: firstMissingField,
    },
    authorization: makeAuthorization(),
    negative_controls: Object.entries(NEGATIVE_CONTROL_REASONS).map(([evidence_class, reason]) => ({
      evidence_class,
      accepted: false,
      reason,
    })),
  };
}

export function validateCentralSolverRetainedHistoryRow(row) {
  const errors = [];
  const providerBacked = row?.provider_provenance?.provider_object_ref != null;
  if (row?.schema !== SCHEMA) {
    errors.push("schema must be central_solver_retained_history_row.v0");
  }
  if (
    !providerBacked &&
    row?.artifact_status !== "fail_closed_missing_provider_provenance"
  ) {
    errors.push("artifact must fail closed at missing provider provenance when provider ref is absent");
  }
  if (
    providerBacked &&
    row?.artifact_status !== "provider_backed_retained_history_row_present_acceptance_blocked"
  ) {
    errors.push("provider-backed row must remain blocked at acceptance");
  }
  if (!providerBacked && row?.first_missing_field !== FIRST_MISSING_SOURCE_PROOF_FIELD) {
    errors.push(`first missing field must be ${FIRST_MISSING_SOURCE_PROOF_FIELD}`);
  }
  if (
    providerBacked &&
    row?.first_missing_field !== "central_solver_retained_history_row.acceptance_certificate_ref"
  ) {
    errors.push("provider-backed row must point to the missing acceptance certificate");
  }
  if (providerBacked && row?.retained_record_request?.retained_record_id == null) {
    errors.push("provider-backed row must carry retained_record_id");
  }
  if (row?.consumer_blocker_replacement?.previous_first_missing_field !== "central_solver_retained_history_row") {
    errors.push("consumer blocker replacement must sharpen central_solver_retained_history_row");
  }
  if (!Array.isArray(row?.path_history_stream_requirements) || row.path_history_stream_requirements.length !== 6) {
    errors.push("six path-history stream requirements are required");
  }
  if (!Array.isArray(row?.same_source_self_hit_requirements) || row.same_source_self_hit_requirements.length !== 6) {
    errors.push("six same-source self-hit requirements are required");
  }
  if (
    !Array.isArray(row?.partner_causal_root_replay_requirements) ||
    row.partner_causal_root_replay_requirements.length !== 30
  ) {
    errors.push("thirty directed partner causal-root replay requirements are required");
  }
  if (row?.internal_tangent_authority_vector_request?.schema !== INTERNAL_TANGENT_AUTHORITY_VECTOR_REQUEST_SCHEMA) {
    errors.push(`internal tangent-authority vector request must use ${INTERNAL_TANGENT_AUTHORITY_VECTOR_REQUEST_SCHEMA}`);
  }
  if (row?.internal_tangent_authority_vector_request?.required_same_record_rows?.length !== 6) {
    errors.push("internal tangent-authority vector request must name six same-record row families");
  }
  if (
    row?.internal_tangent_authority_vector_request?.preferred_curve_binding?.required_equation_schema !==
    "preferred_curve_internal_tangent_authority_equation.v0"
  ) {
    errors.push("internal tangent-authority vector request must require the preferred-curve equation schema");
  }
  if (
    row?.internal_tangent_authority_vector_request?.preferred_curve_internal_tangent_authority_equation_ref !== null
  ) {
    errors.push("internal tangent-authority vector request must not claim a preferred-curve equation ref");
  }
  if (row?.internal_tangent_authority_vector_request?.accepted !== false) {
    errors.push("internal tangent-authority vector request must remain non-authorizing");
  }
  if (row?.internal_tangent_authority_vector_request?.accepted_internal_tangent_authority_ref !== null) {
    errors.push("internal tangent-authority vector request must not claim an accepted authority ref");
  }
  for (const flag of AUTHORIZATION_FLAGS) {
    if (row?.authorization?.[flag] !== false) {
      errors.push(`${flag} must remain false`);
    }
  }
  if (row?.authorization?.score_movement !== "no_score_increase") {
    errors.push("score movement must remain no_score_increase");
  }
  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    const result = evaluateRetainedHistoryEvidenceCandidate({ evidence_class: evidenceClass });
    if (result.accepted || result.reason !== reason) {
      errors.push(`${evidenceClass} negative control must reject as ${reason}`);
    }
  }
  return errors;
}

function runCli() {
  const row = buildCentralSolverRetainedHistoryRow();
  const errors = validateCentralSolverRetainedHistoryRow(row);
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
    return;
  }
  const pretty = process.argv.includes("--pretty");
  console.log(JSON.stringify(row, null, pretty ? 2 : 0));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli();
}
