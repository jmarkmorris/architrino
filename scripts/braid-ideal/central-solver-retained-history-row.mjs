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
