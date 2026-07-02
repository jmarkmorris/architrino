import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

export const SCHEMA = "self_hit_held_release_solver_row.v0";
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

const REQUIRED_RETAINED_HISTORY_FIELDS = [
  "central_solver_retained_history_row",
  "path_history_stream_ids",
  "same_source_self_hit_rows",
  "partner_causal_root_replay_rows",
  "retained_wake_history_rows",
  "same_record_action_ledger_rows",
  "branch_row_identity",
  "oblate_spheroid_residual_rows",
  "stability_or_return_margin_row",
  "retained_source_binding",
  "provider_provenance",
];

const NEGATIVE_CONTROLS = [
  "priority_only_held_release_toy_not_retained_history",
  "dirty_checkpoint_output_not_accepted_evidence",
  "circular_self_hit_span_not_six_point_retained_row",
  "moving_circular_same_source_roots_not_held_release_row",
  "path_history_stream_without_same_record_binding_not_accepted",
  "t3_retained_replay_rows_not_braid_ideal_evidence",
  "aggregate_or_cross_row_bundle_not_same_record",
  "candidate_or_proxy_refs_not_accepted",
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

function formatIdPart(value) {
  return String(value)
    .replaceAll("+", "plus")
    .replaceAll("-", "minus")
    .replaceAll(":", "_")
    .replaceAll(".", "_")
    .replaceAll("/", "_");
}

function makeRequestedPathHistoryStreams(rowPrefix, seedRows) {
  return seedRows.map((row, index) => ({
    architrino_id: row.architrino_id,
    requested_stream_id: `${rowPrefix}:path-history:${index}:${formatIdPart(row.architrino_id)}`,
    status: "request_only_missing_central_solver_retained_history_row",
    stream_id: null,
    path_segment_count: null,
    retained_history_binding: null,
  }));
}

function makeSameSourceSelfHitRequirements(rowPrefix, seedRows) {
  return seedRows.map((row, index) => ({
    row_id: `${rowPrefix}:same-source-self-hit:${index}:${formatIdPart(row.architrino_id)}`,
    receiver_architrino_id: row.architrino_id,
    source_architrino_id: row.architrino_id,
    required_relation: "strictly-delayed-same-source-root",
    required_path_history_stream_id: `${rowPrefix}:path-history:${index}:${formatIdPart(row.architrino_id)}`,
    causal_root_replay_ref: null,
    accepted_same_source_self_hit_row: null,
    first_missing_field: "central_solver_retained_history_row",
  }));
}

function makePartnerCausalRootRequirements(rowPrefix, seedRows) {
  const rows = [];
  for (const receiver of seedRows) {
    for (const source of seedRows) {
      if (receiver.architrino_id === source.architrino_id) {
        continue;
      }
      rows.push({
        row_id: `${rowPrefix}:partner-root:${formatIdPart(receiver.architrino_id)}:${formatIdPart(source.architrino_id)}`,
        receiver_architrino_id: receiver.architrino_id,
        source_architrino_id: source.architrino_id,
        required_relation: "partner-causal-root-replay",
        causal_root_replay_ref: null,
        retained_causal_root_row_id: null,
        first_missing_field: "central_solver_retained_history_row",
      });
    }
  }
  return rows;
}

function makeLedgerHook(name, rowPrefix) {
  return {
    ledger: name,
    required_same_record_binding: true,
    hook_id: `${rowPrefix}:${name}:hook`,
    accepted_rows: [],
    first_missing_field: "central_solver_retained_history_row",
    retained_source_binding: null,
    provider_provenance: null,
  };
}

export function buildSelfHitHeldReleaseSolverRow(options = {}) {
  const seedId = options.seedId ?? DEFAULT_SEED_ID;
  const routeId = options.routeId ?? DEFAULT_ROUTE_ID;
  const groupVelocity = normalizeVector(options.groupVelocity, DEFAULT_GROUP_VELOCITY);
  const seedRows = SIX_POINT_SEED.map((row) => ({ ...row, position: [...row.position] }));
  const rowKey = {
    schema: SCHEMA,
    seedId,
    routeId,
    fieldSpeed: Number(options.fieldSpeed ?? DEFAULT_FIELD_SPEED),
    coupling: Number(options.coupling ?? DEFAULT_COUPLING),
    duration: Number(options.duration ?? DEFAULT_DURATION),
    dt: Number(options.dt ?? DEFAULT_TIME_STEP),
    groupVelocity,
  };
  const rowHash = stableHash(rowKey);
  const rowPrefix = `self_hit_held_release_solver_row:${rowHash.slice(0, 16)}`;

  const pathHistoryStreamRequests = makeRequestedPathHistoryStreams(rowPrefix, seedRows);
  const sameSourceSelfHitRequirements = makeSameSourceSelfHitRequirements(rowPrefix, seedRows);
  const partnerCausalRootReplayRequirements = makePartnerCausalRootRequirements(rowPrefix, seedRows);

  return {
    schema: SCHEMA,
    row_id: rowPrefix,
    artifact_hash: rowHash,
    artifact_status: "fail_closed_missing_central_solver_retained_history_row",
    source_status: "source_acquisition_blocked",
    first_missing_object: "central_solver_retained_history_row",
    first_missing_field: "central_solver_retained_history_row",
    seed_id: seedId,
    route_id: routeId,
    seed: {
      seed_kind: "six_point_face_opposite_held_release",
      point_count: seedRows.length,
      rows: seedRows,
    },
    held_prehistory_metadata: {
      hold_time: Number(options.holdTime ?? DEFAULT_HOLD_TIME),
      prehistory_status: "declared_request_not_retained",
      stationary_in_moving_center_frame: true,
      central_solver_retained_history_row: null,
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
        first_missing_field: "central_solver_retained_history_row",
      },
      group_velocity: {
        required: true,
        value: groupVelocity,
        source_status: "declared_seed_parameter_not_retained_history_evidence",
      },
    },
    path_history_stream_requests: pathHistoryStreamRequests,
    same_source_self_hit_row_requirements: sameSourceSelfHitRequirements,
    partner_causal_root_replay_requirements: partnerCausalRootReplayRequirements,
    wake_ledger_hooks: [makeLedgerHook("retained_wake_history_rows", rowPrefix)],
    action_ledger_hooks: [makeLedgerHook("same_record_action_ledger_rows", rowPrefix)],
    branch_row_identity_requirements: {
      branch_row_identity: null,
      required_fields: [
        "branch_row_id",
        "retained_record_id",
        "same_record_binding",
        "receiver_normal_branch_strength_linkage",
      ],
      first_missing_field: "central_solver_retained_history_row",
    },
    oblate_spheroid_residual_row_requirements: {
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
      first_missing_field: "central_solver_retained_history_row",
    },
    stability_or_return_margin_requirement: {
      required: true,
      accepted_stability_or_return_margin_row: null,
      first_missing_field: "central_solver_retained_history_row",
    },
    retained_source_binding_requirement: {
      required: true,
      retained_source_binding: null,
      first_missing_field: "central_solver_retained_history_row",
    },
    provider_provenance_requirement: {
      required: true,
      provider_object: null,
      provider_provenance: null,
      first_missing_field: "central_solver_retained_history_row",
    },
    required_retained_history_fields: [...REQUIRED_RETAINED_HISTORY_FIELDS],
    missing_retained_history_fields: [...REQUIRED_RETAINED_HISTORY_FIELDS],
    authorization: {
      accepted_same_record_evidence: false,
      retained_branch_claim: false,
      accepted_transition_source: false,
      moving_retained_branch_certificate: false,
      same_ledger_action_measure_row: false,
      bounded_speed_live_ledger: false,
      receiver_normal_branch_strength: false,
      score_movement: "no_score_increase",
    },
    negative_controls: [...NEGATIVE_CONTROLS],
  };
}

export function validateSelfHitHeldReleaseSolverRow(row) {
  const errors = [];
  if (row?.schema !== SCHEMA) {
    errors.push("schema mismatch");
  }
  if (row?.artifact_status !== "fail_closed_missing_central_solver_retained_history_row") {
    errors.push("artifact must fail closed at central_solver_retained_history_row");
  }
  if (row?.first_missing_field !== "central_solver_retained_history_row") {
    errors.push("first missing field must be central_solver_retained_history_row");
  }
  if (!Array.isArray(row?.path_history_stream_requests) || row.path_history_stream_requests.length !== 6) {
    errors.push("six path-history stream requests are required");
  }
  if (!Array.isArray(row?.same_source_self_hit_row_requirements) || row.same_source_self_hit_row_requirements.length !== 6) {
    errors.push("six same-source self-hit row requirements are required");
  }
  if (
    !Array.isArray(row?.partner_causal_root_replay_requirements) ||
    row.partner_causal_root_replay_requirements.length !== 30
  ) {
    errors.push("thirty directed partner causal-root replay requirements are required");
  }
  for (const [field, expected] of Object.entries({
    accepted_same_record_evidence: false,
    retained_branch_claim: false,
    accepted_transition_source: false,
    moving_retained_branch_certificate: false,
    same_ledger_action_measure_row: false,
    bounded_speed_live_ledger: false,
    receiver_normal_branch_strength: false,
  })) {
    if (row?.authorization?.[field] !== expected) {
      errors.push(`${field} must remain ${expected}`);
    }
  }
  if (row?.authorization?.score_movement !== "no_score_increase") {
    errors.push("score movement must remain no_score_increase");
  }
  return errors;
}

function runCli() {
  const row = buildSelfHitHeldReleaseSolverRow();
  const errors = validateSelfHitHeldReleaseSolverRow(row);
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
