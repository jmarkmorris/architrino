import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

export const SCHEMA = "held_release_seed_path_rows.v0";
export const DEFAULT_SEED_ID = "braid-ideal:held-release:face-opposite:six-point:v0";
export const DEFAULT_ROUTE_ID = "braid-ideal:self-hit-held-release:face-opposite:v0";
export const DEFAULT_RUN_ID = "braid-ideal:held-release:seed-path-rows:v0";
export const DEFAULT_GROUP_VELOCITY = Object.freeze([1 / 60, 1 / 60, 1 / 60]);
export const FIRST_MISSING_OBJECT = "six_held_release_seed_path_rows_for_retained_record";
export const FIRST_MISSING_FIELD = "held_release_seed_path_rows[*].retained_record_id";

const DEFAULT_FIELD_SPEED = 1;
const DEFAULT_COUPLING = 1 / 36;
const DEFAULT_DURATION = 18;
const DEFAULT_TIME_STEP = 0.024;
const DEFAULT_HOLD_TIME = 4;
const DEFAULT_ERROR_BOUND = 0;
const DEFAULT_STATE_FLAGS = 0;

const SIX_POINT_SEED = Object.freeze([
  Object.freeze({ architrino_id: "P:+x:+y:+z", polarity: "P", sign: 1, position: [1, 1, 1] }),
  Object.freeze({ architrino_id: "P:+x:-y:-z", polarity: "P", sign: 1, position: [1, -1, -1] }),
  Object.freeze({ architrino_id: "P:-x:+y:-z", polarity: "P", sign: 1, position: [-1, 1, -1] }),
  Object.freeze({ architrino_id: "E:-x:-y:-z", polarity: "E", sign: -1, position: [-1, -1, -1] }),
  Object.freeze({ architrino_id: "E:-x:+y:+z", polarity: "E", sign: -1, position: [-1, 1, 1] }),
  Object.freeze({ architrino_id: "E:+x:-y:+z", polarity: "E", sign: -1, position: [1, -1, 1] }),
]);

export const NEGATIVE_CONTROL_REASONS = Object.freeze({
  fixture: "fixture_not_accepted_held_release_path_row_evidence",
  diagnostic: "diagnostic_not_accepted_held_release_path_row_evidence",
  priority_prose: "priority_prose_not_accepted_held_release_path_row_evidence",
  generated_decoy: "generated_decoy_not_accepted_held_release_path_row_evidence",
  proxy_row: "proxy_row_not_accepted_held_release_path_row_evidence",
  candidate_ref: "candidate_ref_not_accepted_held_release_path_row_evidence",
  aggregate_row: "aggregate_row_not_same_record_held_release_path_row_evidence",
  h39_theta3minus_quotient_row: "h39_theta3minus_row_not_braid_ideal_path_row_evidence",
  dirty_file_evidence: "dirty_file_not_accepted_held_release_path_row_evidence",
  source_contract_shell: "source_contract_shell_not_accepted_held_release_path_row_evidence",
  temp_probe: "temp_probe_not_accepted_held_release_path_row_evidence",
  t3_row: "t3_row_not_braid_ideal_path_row_evidence",
  endpoint_only_row: "endpoint_only_row_not_held_release_path_row_evidence",
  affine_geometry_alone: "affine_geometry_alone_not_held_release_path_row_evidence",
  cross_row_bundle: "cross_row_bundle_not_same_record_held_release_path_row_evidence",
  generic_stream_metadata_without_same_record_binding:
    "generic_stream_metadata_without_same_record_binding_not_accepted_path_row_evidence",
  earlier_fail_closed_adapter_row: "earlier_fail_closed_adapter_row_not_accepted_path_row_evidence",
});

const AUTHORIZATION_FLAGS = Object.freeze([
  "accepted_same_record_evidence",
  "held_release_seed_path_rows",
  "retained_branch_claim",
  "accepted_transition_source",
  "moving_retained_branch_certificate",
  "same_ledger_action_measure_row",
  "bounded_speed_live_ledger",
  "receiver_normal_branch_strength",
]);

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function stableUint32(value) {
  const digest = crypto.createHash("sha256").update(value).digest();
  return digest.readUInt32BE(0);
}

function normalizeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeVector(value, fallback) {
  if (!Array.isArray(value) || value.length !== 3) {
    return [...fallback];
  }
  return value.map((entry, index) => normalizeNumber(entry, fallback[index]));
}

function normalizeStringRef(value) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function addVectors(left, right) {
  return left.map((value, index) => value + right[index]);
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function makeSeedRows() {
  return SIX_POINT_SEED.map((row) => ({
    ...row,
    position: [...row.position],
  }));
}

function makePathRow({
  rowPrefix,
  seedRow,
  index,
  rowKey,
  groupVelocity,
  retainedRecordId,
  providerObjectRef,
  providerArtifactHash,
}) {
  const pathKey = stableUint32(`${rowKey.seedId}:${seedRow.architrino_id}`);
  const pathRow = {
    pathKey,
    segmentIndex: 0,
    startTime: 0,
    endTime: rowKey.duration,
    start: addVectors(seedRow.position, groupVelocity.map((value) => value * rowKey.holdTime)),
    velocity: [...groupVelocity],
    errorBound: DEFAULT_ERROR_BOUND,
    stateFlags: DEFAULT_STATE_FLAGS,
  };
  const pathIdentity = {
    held_release_seed_id: rowKey.seedId,
    architrino_id: seedRow.architrino_id,
    polarity: seedRow.polarity,
    seed_sign: seedRow.sign,
    path_key: pathKey,
    same_run_id: rowKey.sourceRunId,
    source_dataset_id: rowKey.sourceDatasetId,
    retained_record_id: retainedRecordId ?? null,
  };
  const artifactInput = {
    schema: "held_release_seed_path_row.v0",
    pathIdentity,
    pathRow,
    dynamicReplay: {
      replayKind: "held-release-seed-path-row-request",
      fieldSpeed: rowKey.fieldSpeed,
      coupling: rowKey.coupling,
      duration: rowKey.duration,
      dt: rowKey.dt,
      holdTime: rowKey.holdTime,
      groupVelocity,
    },
  };
  const artifactHash = stableHash(artifactInput);
  const retainedRecordPresent = typeof retainedRecordId === "string" && retainedRecordId.length > 0;
  const providerBacked = retainedRecordPresent && providerObjectRef != null;
  const firstMissingField = retainedRecordPresent
    ? providerBacked
      ? "held_release_seed_path_rows.acceptance_certificate_ref"
      : "held_release_seed_path_rows[*].provider_provenance.provider_object_ref"
    : FIRST_MISSING_FIELD;
  return {
    row_id: `${rowPrefix}:path-row:${index}:${pathKey.toString(16)}`,
    schema: "held_release_seed_path_row.v0",
    authority_class: providerBacked
      ? "same_run_path_row_provider_backed_acceptance_blocked"
      : retainedRecordPresent
        ? "same_run_path_row_missing_provider_provenance"
        : "same_run_path_row_request_missing_retained_record",
    accepted: false,
    path_identity: pathIdentity,
    solver_path_history_row_f64: pathRow,
    dynamic_replay_metadata: {
      schema: "held-release-seed-path-dynamic-replay.v0",
      replay_kind: "held-release-seed-path-row-request",
      field_speed: rowKey.fieldSpeed,
      coupling: rowKey.coupling,
      duration: rowKey.duration,
      dt: rowKey.dt,
      hold_time: rowKey.holdTime,
      group_velocity: [...groupVelocity],
      clean_central_solver_contract: "SolverPathHistoryRowF64",
      source_run_id: rowKey.sourceRunId,
      source_dataset_id: rowKey.sourceDatasetId,
      retained_record_id: retainedRecordId ?? null,
    },
    same_record_binding: {
      required: true,
      retained_record_id: retainedRecordId ?? null,
      status: providerBacked
        ? "provider_backed_retained_record_present_unaccepted"
        : retainedRecordPresent
          ? "retained_record_id_present_unaccepted"
          : "missing_retained_record_id",
      first_missing_field: firstMissingField,
    },
    provider_provenance: {
      required: true,
      provider_object_ref: providerObjectRef,
      provider_artifact_hash: providerArtifactHash,
      source_run_id: rowKey.sourceRunId,
      source_dataset_id: rowKey.sourceDatasetId,
      status: providerBacked ? "provider_object_ref_present_unaccepted" : "missing_provider_object_ref",
      first_missing_field: firstMissingField,
    },
    artifact_hash: artifactHash,
    first_missing_object: providerBacked
      ? "held_release_seed_path_rows_acceptance_certificate"
      : retainedRecordPresent
        ? "held_release_seed_path_rows_provider_object"
        : FIRST_MISSING_OBJECT,
    first_missing_field: firstMissingField,
  };
}

export function evaluateHeldReleaseSeedPathRowsEvidence(candidate = {}) {
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
      reason: "schema_not_held_release_seed_path_rows_v0",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (!Array.isArray(candidate.rows) || candidate.rows.length !== 6) {
    return {
      accepted: false,
      reason: "six_held_release_seed_path_rows_required",
      first_missing_field: "held_release_seed_path_rows.rows",
    };
  }
  if (candidate.rows.some((row) => row?.same_record_binding?.retained_record_id == null)) {
    return {
      accepted: false,
      reason: "retained_record_id_missing",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (candidate.rows.some((row) => row?.provider_provenance?.provider_object_ref == null)) {
    return {
      accepted: false,
      reason: "provider_provenance_missing",
      first_missing_field: "held_release_seed_path_rows[*].provider_provenance.provider_object_ref",
    };
  }
  return {
    accepted: false,
    reason: "producer_does_not_authorize_accepted_path_row_evidence",
    first_missing_field: "held_release_seed_path_rows.acceptance_certificate_ref",
  };
}

export function buildHeldReleaseSeedPathRows(options = {}) {
  const groupVelocity = normalizeVector(options.groupVelocity, DEFAULT_GROUP_VELOCITY);
  const providerObjectRef = normalizeStringRef(options.providerObjectRef);
  const providerArtifactHash = normalizeStringRef(options.providerArtifactHash);
  const rowKey = {
    schema: SCHEMA,
    seedId: options.seedId ?? DEFAULT_SEED_ID,
    routeId: options.routeId ?? DEFAULT_ROUTE_ID,
    sourceRunId: options.sourceRunId ?? DEFAULT_RUN_ID,
    sourceDatasetId: options.sourceDatasetId ?? `${options.sourceRunId ?? DEFAULT_RUN_ID}:dataset`,
    fieldSpeed: normalizeNumber(options.fieldSpeed, DEFAULT_FIELD_SPEED),
    coupling: normalizeNumber(options.coupling, DEFAULT_COUPLING),
    duration: normalizeNumber(options.duration, DEFAULT_DURATION),
    dt: normalizeNumber(options.dt, DEFAULT_TIME_STEP),
    holdTime: normalizeNumber(options.holdTime, DEFAULT_HOLD_TIME),
    groupVelocity,
  };
  const retainedRecordId =
    typeof options.retainedRecordId === "string" && options.retainedRecordId.length > 0
      ? options.retainedRecordId
      : null;
  const artifactHash = stableHash({ ...rowKey, retainedRecordId });
  const rowPrefix = `held_release_seed_path_rows:${artifactHash.slice(0, 16)}`;
  const rows = makeSeedRows().map((seedRow, index) =>
    makePathRow({
      rowPrefix,
      seedRow,
      index,
      rowKey,
      groupVelocity,
      retainedRecordId,
      providerObjectRef,
      providerArtifactHash,
    })
  );
  const evidence = evaluateHeldReleaseSeedPathRowsEvidence({ schema: SCHEMA, rows });
  const firstMissingObject =
    evidence.first_missing_field === FIRST_MISSING_FIELD
      ? FIRST_MISSING_OBJECT
      : evidence.reason === "provider_provenance_missing"
        ? "held_release_seed_path_rows_provider_object"
        : "held_release_seed_path_rows_acceptance_certificate";
  const providerBacked = evidence.reason === "producer_does_not_authorize_accepted_path_row_evidence";

  return {
    schema: SCHEMA,
    artifact_id: rowPrefix,
    artifact_hash: artifactHash,
    seed_id: rowKey.seedId,
    route_id: rowKey.routeId,
    source_run_identity: {
      same_run_required: true,
      source_run_id: rowKey.sourceRunId,
      source_dataset_id: rowKey.sourceDatasetId,
      source_run_authority: "declared_clean_central_solver_input_not_accepted_evidence",
    },
    row_contract: {
      clean_central_solver_contract: "SolverPathHistoryRowF64",
      required_layout: "path_segment.v1",
      required_row_count: 6,
      manifest_consumer_schema: "held_release_path_history_stream_manifest_set.v0",
    },
    retained_record_requirement: {
      required: true,
      retained_record_id: retainedRecordId,
      same_record_binding_status: providerBacked
        ? "provider_backed_retained_record_present_unaccepted"
        : retainedRecordId
          ? "retained_record_id_present_unaccepted"
          : "missing_retained_record_id",
      first_missing_field: providerBacked
        ? "held_release_seed_path_rows.acceptance_certificate_ref"
        : retainedRecordId
          ? "held_release_seed_path_rows[*].provider_provenance.provider_object_ref"
          : FIRST_MISSING_FIELD,
    },
    dynamic_replay_requirements: {
      required: true,
      replay_kind: "held-release-seed-path-row-request",
      field_speed: rowKey.fieldSpeed,
      coupling: rowKey.coupling,
      duration: rowKey.duration,
      dt: rowKey.dt,
      hold_time: rowKey.holdTime,
      group_velocity: [...groupVelocity],
    },
    rows,
    artifact_status:
      evidence.reason === "retained_record_id_missing"
        ? "fail_closed_missing_retained_record_id"
        : evidence.reason === "provider_provenance_missing"
          ? "fail_closed_missing_provider_provenance"
          : "provider_backed_seed_path_rows_present_acceptance_blocked",
    source_status: providerBacked ? "candidate_provider_backed_source_unaccepted" : "source_acquisition_blocked",
    first_missing_object: firstMissingObject,
    first_missing_field: evidence.first_missing_field,
    evidence_evaluation: evidence,
    authorization: makeAuthorization(),
    negative_controls: Object.entries(NEGATIVE_CONTROL_REASONS).map(([evidence_class, reason]) => ({
      evidence_class,
      accepted: false,
      reason,
    })),
  };
}

export function validateHeldReleaseSeedPathRows(artifact) {
  const errors = [];
  const providerBacked = artifact?.source_status === "candidate_provider_backed_source_unaccepted";
  if (artifact?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (!Array.isArray(artifact?.rows) || artifact.rows.length !== 6) {
    errors.push("six held-release seed path rows are required");
  }
  if (!providerBacked && artifact?.first_missing_field !== FIRST_MISSING_FIELD) {
    errors.push(`first missing field must be ${FIRST_MISSING_FIELD}`);
  }
  if (providerBacked && artifact?.first_missing_field !== "held_release_seed_path_rows.acceptance_certificate_ref") {
    errors.push("provider-backed seed path rows must point to the missing acceptance certificate");
  }
  if (!providerBacked && artifact?.retained_record_requirement?.retained_record_id != null) {
    errors.push("default producer output must not claim retained_record_id");
  }
  const runIds = new Set(artifact?.rows?.map((row) => row?.path_identity?.same_run_id));
  if (runIds.size !== 1) {
    errors.push("all path rows must share one same-run identity");
  }
  const pathKeys = new Set(artifact?.rows?.map((row) => row?.solver_path_history_row_f64?.pathKey));
  if (pathKeys.size !== 6) {
    errors.push("six distinct pathKey values are required");
  }
  for (const row of artifact?.rows ?? []) {
    if (row?.schema !== "held_release_seed_path_row.v0") {
      errors.push("each row must use held_release_seed_path_row.v0");
    }
    if (row?.solver_path_history_row_f64?.segmentIndex !== 0) {
      errors.push("each seed row must use segmentIndex 0");
    }
    if (row?.solver_path_history_row_f64?.startTime !== 0) {
      errors.push("each seed row must start at time 0");
    }
    if (!providerBacked && row?.same_record_binding?.retained_record_id != null) {
      errors.push("default seed path rows must not claim retained_record_id");
    }
    if (!providerBacked && row?.provider_provenance?.provider_object_ref != null) {
      errors.push("default seed path rows must not claim provider_object_ref");
    }
    if (providerBacked && row?.same_record_binding?.retained_record_id == null) {
      errors.push("provider-backed seed path rows must carry retained_record_id");
    }
    if (providerBacked && row?.provider_provenance?.provider_object_ref == null) {
      errors.push("provider-backed seed path rows must carry provider_object_ref");
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
  return errors;
}

function runCli() {
  const artifact = buildHeldReleaseSeedPathRows();
  const errors = validateHeldReleaseSeedPathRows(artifact);
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
