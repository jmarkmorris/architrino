import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

import {
  FIRST_MISSING_FIELD as SEED_PATH_ROWS_FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT as SEED_PATH_ROWS_FIRST_MISSING_OBJECT,
  buildHeldReleaseSeedPathRows,
} from "./held-release-seed-path-rows.mjs";
import { buildHeldReleasePathHistoryStreamManifestSet } from "./held-release-path-history-stream-manifest-set.mjs";
import {
  FIRST_MISSING_SOURCE_PROOF_FIELD as RETAINED_HISTORY_ROW_PROVIDER_FIELD,
  buildCentralSolverRetainedHistoryRow,
} from "./central-solver-retained-history-row.mjs";

export const SCHEMA = "central_solver_retained_history_provider_object.v0";
export const FIRST_MISSING_OBJECT = SEED_PATH_ROWS_FIRST_MISSING_OBJECT;
export const FIRST_MISSING_FIELD = SEED_PATH_ROWS_FIRST_MISSING_FIELD;

const SEED_PATH_ROWS_SCHEMA = "held_release_seed_path_rows.v0";
const STREAM_MANIFEST_SET_SCHEMA = "held_release_path_history_stream_manifest_set.v0";
const RETAINED_HISTORY_ROW_SCHEMA = "central_solver_retained_history_row.v0";
const PATH_SEGMENT_LAYOUT = "path_segment.v1";
const PROVIDER_OBJECT_REF_FIELD =
  "central_solver_retained_history_provider_object.provider_provenance.provider_object_ref";
const DURABLE_STREAM_REFS_FIELD =
  "central_solver_retained_history_provider_object.durable_stream_manifest_refs";

export const NEGATIVE_CONTROL_REASONS = Object.freeze({
  fixture: "fixture_not_accepted_retained_history_provider_object_evidence",
  diagnostic: "diagnostic_not_accepted_retained_history_provider_object_evidence",
  priority_prose: "priority_prose_not_accepted_retained_history_provider_object_evidence",
  generated_decoy: "generated_decoy_not_accepted_retained_history_provider_object_evidence",
  proxy_row: "proxy_row_not_accepted_retained_history_provider_object_evidence",
  candidate_ref: "candidate_ref_not_accepted_retained_history_provider_object_evidence",
  aggregate_row: "aggregate_row_not_same_record_retained_history_provider_object_evidence",
  h39_theta3minus_quotient_row:
    "h39_theta3minus_row_not_braid_ideal_retained_history_provider_object_evidence",
  dirty_file_evidence: "dirty_file_not_accepted_retained_history_provider_object_evidence",
  source_contract_shell: "source_contract_shell_not_accepted_retained_history_provider_object_evidence",
  temp_probe: "temp_probe_not_accepted_retained_history_provider_object_evidence",
  t3_row: "t3_row_not_braid_ideal_retained_history_provider_object_evidence",
  endpoint_only_row: "endpoint_only_row_not_retained_history_provider_object_evidence",
  affine_geometry_alone: "affine_geometry_alone_not_retained_history_provider_object_evidence",
  cross_row_bundle: "cross_row_bundle_not_same_record_retained_history_provider_object_evidence",
  generic_stream_provider_metadata_without_same_record_binding:
    "generic_stream_provider_metadata_without_same_record_binding_not_accepted_provider_object_evidence",
  earlier_fail_closed_adapter_row:
    "earlier_fail_closed_adapter_row_not_accepted_retained_history_provider_object_evidence",
});

const AUTHORIZATION_FLAGS = Object.freeze([
  "accepted_same_record_evidence",
  "central_solver_retained_history_provider_object",
  "retainedBranchClaim",
  "accepted_transition_source",
  "moving_retained_branch_certificate",
  "same_ledger_action_measure_row",
  "bounded_speed_live_ledger",
  "receiver_normal_branch_strength",
]);

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function retainedRecordIdForSeedRow(row) {
  return row?.same_record_binding?.retained_record_id ?? row?.path_identity?.retained_record_id ?? null;
}

function retainedRecordIdForManifestRow(row) {
  return row?.retained_record_binding?.retained_record_id ?? null;
}

function sameRunIdentityForSeedArtifact(seedArtifact) {
  return {
    source_run_id: seedArtifact?.source_run_identity?.source_run_id ?? null,
    source_dataset_id: seedArtifact?.source_run_identity?.source_dataset_id ?? null,
  };
}

function sameRunIdentityForManifestSet(manifestSet) {
  return {
    source_run_id: manifestSet?.same_run_identity?.source_run_id ?? null,
    source_dataset_id: manifestSet?.same_run_identity?.source_dataset_id ?? null,
  };
}

function makeSeedRowRefs(seedArtifact) {
  return (seedArtifact?.rows ?? []).map((row, index) => ({
    index,
    source_seed_row_id: row.row_id,
    source_seed_row_artifact_hash: row.artifact_hash,
    source_seed_row_schema: row.schema,
    architrino_id: row.path_identity?.architrino_id ?? null,
    path_key: row.path_identity?.path_key ?? row.solver_path_history_row_f64?.pathKey ?? null,
    segment_index: row.solver_path_history_row_f64?.segmentIndex ?? null,
    retained_record_id: retainedRecordIdForSeedRow(row),
    provider_object_ref: row.provider_provenance?.provider_object_ref ?? null,
    first_missing_field: row.first_missing_field ?? null,
  }));
}

function makeStreamManifestRefs(manifestSet) {
  return (manifestSet?.stream_manifest_rows ?? []).map((row, index) => ({
    index,
    stream_manifest_row_id: row.row_id,
    stream_manifest_artifact_hash: row.artifact_hash,
    source_seed_row_id: row.source_seed_row_binding?.source_seed_row_id ?? null,
    source_seed_row_artifact_hash: row.source_seed_row_binding?.source_seed_row_artifact_hash ?? null,
    path_key: row.source_seed_row_binding?.path_key ?? null,
    segment_index: row.source_seed_row_binding?.segment_index ?? null,
    stream_id: row.stream_identity?.stream_id ?? null,
    local_stream_manifest_ref: row.stream_identity?.local_stream_manifest_ref ?? null,
    stream_manifest_ref: row.stream_identity?.stream_manifest_ref ?? null,
    durable_manifest_ref: row.durable_stream_binding?.durable_manifest_ref ?? null,
    stream_chunk_digest: row.path_segment_stream?.stream_chunk_digest ?? null,
    local_manifest_hash: row.path_segment_stream?.local_manifest_hash ?? null,
    row_count: row.path_segment_stream?.row_count ?? null,
    path_segment_layout: row.path_segment_stream?.required_layout ?? null,
    retained_record_id: retainedRecordIdForManifestRow(row),
    provider_object_ref: row.provider_provenance?.provider_object_ref ?? null,
    first_missing_field: row.first_missing_field ?? null,
  }));
}

function makeSourceArtifacts(seedArtifact, manifestSet, retainedHistoryRow) {
  return {
    held_release_seed_path_rows: {
      required: true,
      consumed_schema: seedArtifact?.schema ?? null,
      consumed_artifact_id: seedArtifact?.artifact_id ?? null,
      consumed_artifact_hash: seedArtifact?.artifact_hash ?? null,
      source_status: seedArtifact?.source_status ?? null,
      first_missing_object: seedArtifact?.first_missing_object ?? null,
      first_missing_field: seedArtifact?.first_missing_field ?? null,
    },
    held_release_path_history_stream_manifest_set: {
      required: true,
      consumed_schema: manifestSet?.schema ?? null,
      consumed_artifact_id: manifestSet?.artifact_id ?? null,
      consumed_artifact_hash: manifestSet?.artifact_hash ?? null,
      source_status: manifestSet?.source_status ?? null,
      first_missing_object: manifestSet?.first_missing_object ?? null,
      first_missing_field: manifestSet?.first_missing_field ?? null,
    },
    central_solver_retained_history_row_request: {
      required: true,
      consumed_schema: retainedHistoryRow?.schema ?? null,
      consumed_row_id: retainedHistoryRow?.row_id ?? null,
      consumed_artifact_hash: retainedHistoryRow?.artifact_hash ?? null,
      source_status: retainedHistoryRow?.source_status ?? null,
      first_missing_object: retainedHistoryRow?.first_missing_object ?? null,
      first_missing_field: retainedHistoryRow?.first_missing_field ?? null,
    },
  };
}

function makeSameRunBinding({ seedArtifact, manifestSet, seedRowRefs, streamManifestRefs }) {
  const seedRun = sameRunIdentityForSeedArtifact(seedArtifact);
  const manifestRun = sameRunIdentityForManifestSet(manifestSet);
  const manifestRowRunIds = new Set(
    (manifestSet?.stream_manifest_rows ?? []).map((row) => row?.same_run_identity?.source_run_id ?? null)
  );
  const seedRowRunIds = new Set(
    (seedArtifact?.rows ?? []).map((row) => row?.path_identity?.same_run_id ?? null)
  );
  const sourceRunId = seedRun.source_run_id ?? manifestRun.source_run_id ?? null;
  return {
    same_run_required: true,
    source_run_id: sourceRunId,
    source_dataset_id: seedRun.source_dataset_id ?? manifestRun.source_dataset_id ?? null,
    seed_path_rows_same_run_id: seedRun.source_run_id,
    stream_manifest_set_same_run_id: manifestRun.source_run_id,
    seed_row_run_count: seedRowRunIds.size,
    stream_manifest_row_run_count: manifestRowRunIds.size,
    seed_row_count: seedRowRefs.length,
    stream_manifest_row_count: streamManifestRefs.length,
    status:
      seedRun.source_run_id != null &&
      seedRun.source_run_id === manifestRun.source_run_id &&
      seedRowRunIds.size === 1 &&
      manifestRowRunIds.size === 1
        ? "same_run_identity_inherited_unaccepted"
        : "same_run_identity_incomplete",
  };
}

function firstMissing({ seedRowRefs, streamManifestRefs, retainedHistoryRow }) {
  if (seedRowRefs.length !== 6) {
    return {
      artifact_status: "fail_closed_missing_seed_path_rows",
      first_missing_object: SEED_PATH_ROWS_FIRST_MISSING_OBJECT,
      first_missing_field: "held_release_seed_path_rows.rows",
      evidence_reason: "six_seed_path_rows_required",
    };
  }
  if (streamManifestRefs.length !== 6) {
    return {
      artifact_status: "fail_closed_missing_stream_manifest_rows",
      first_missing_object: "held_release_path_history_stream_manifest_set",
      first_missing_field: "held_release_path_history_stream_manifest_set.stream_manifest_rows",
      evidence_reason: "six_stream_manifest_rows_required",
    };
  }
  if (
    seedRowRefs.some((row) => row.retained_record_id == null) ||
    streamManifestRefs.some((row) => row.retained_record_id == null)
  ) {
    return {
      artifact_status: "fail_closed_missing_retained_record_id",
      first_missing_object: SEED_PATH_ROWS_FIRST_MISSING_OBJECT,
      first_missing_field: SEED_PATH_ROWS_FIRST_MISSING_FIELD,
      evidence_reason: "retained_record_id_missing",
    };
  }
  if (
    seedRowRefs.some((row) => row.provider_object_ref == null) ||
    streamManifestRefs.some((row) => row.provider_object_ref == null) ||
    retainedHistoryRow?.provider_provenance?.provider_object_ref == null
  ) {
    return {
      artifact_status: "fail_closed_missing_provider_provenance",
      first_missing_object: "central_solver_retained_history_provider_object_provider_provenance",
      first_missing_field: PROVIDER_OBJECT_REF_FIELD,
      first_internal_blocker: DURABLE_STREAM_REFS_FIELD,
      evidence_reason: "provider_provenance_missing",
    };
  }
  if (streamManifestRefs.some((row) => row.durable_manifest_ref == null)) {
    return {
      artifact_status: "fail_closed_missing_durable_stream_manifest_refs",
      first_missing_object: "central_solver_retained_history_provider_object_durable_stream_manifest_refs",
      first_missing_field: DURABLE_STREAM_REFS_FIELD,
      evidence_reason: "durable_stream_manifest_ref_missing",
    };
  }
  return {
    artifact_status: "fail_closed_missing_acceptance_certificate",
    first_missing_object: "central_solver_retained_history_provider_object_acceptance_certificate",
    first_missing_field: "central_solver_retained_history_provider_object.acceptance_certificate_ref",
    evidence_reason: "producer_does_not_authorize_accepted_provider_object_evidence",
  };
}

export function evaluateCentralSolverRetainedHistoryProviderObjectEvidence(candidate = {}) {
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
      reason: "schema_not_central_solver_retained_history_provider_object_v0",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (!Array.isArray(candidate.seed_row_refs) || candidate.seed_row_refs.length !== 6) {
    return {
      accepted: false,
      reason: "six_seed_path_row_refs_required",
      first_missing_field: "central_solver_retained_history_provider_object.seed_row_refs",
    };
  }
  if (!Array.isArray(candidate.stream_manifest_refs) || candidate.stream_manifest_refs.length !== 6) {
    return {
      accepted: false,
      reason: "six_stream_manifest_refs_required",
      first_missing_field: "central_solver_retained_history_provider_object.stream_manifest_refs",
    };
  }
  if (
    candidate.seed_row_refs.some((row) => row?.retained_record_id == null) ||
    candidate.stream_manifest_refs.some((row) => row?.retained_record_id == null)
  ) {
    return {
      accepted: false,
      reason: "retained_record_id_missing",
      first_missing_field: SEED_PATH_ROWS_FIRST_MISSING_FIELD,
    };
  }
  if (candidate.provider_provenance?.provider_object_ref == null) {
    return {
      accepted: false,
      reason: "provider_provenance_missing",
      first_missing_field: PROVIDER_OBJECT_REF_FIELD,
    };
  }
  if (!Array.isArray(candidate.durable_stream_manifest_refs) || candidate.durable_stream_manifest_refs.length !== 6) {
    return {
      accepted: false,
      reason: "durable_stream_manifest_ref_missing",
      first_missing_field: DURABLE_STREAM_REFS_FIELD,
    };
  }
  return {
    accepted: false,
    reason: "producer_does_not_authorize_accepted_provider_object_evidence",
    first_missing_field: "central_solver_retained_history_provider_object.acceptance_certificate_ref",
  };
}

export function buildCentralSolverRetainedHistoryProviderObject(options = {}) {
  const seedArtifact = options.seedArtifact ?? buildHeldReleaseSeedPathRows(options.seedPathRowOptions ?? {});
  const manifestSet =
    options.manifestSetArtifact ?? buildHeldReleasePathHistoryStreamManifestSet({ seedArtifact });
  const retainedHistoryRow = options.retainedHistoryRow ?? buildCentralSolverRetainedHistoryRow();
  const seedRowRefs = makeSeedRowRefs(seedArtifact);
  const streamManifestRefs = makeStreamManifestRefs(manifestSet);
  const durableStreamManifestRefs = streamManifestRefs
    .map((row) => row.durable_manifest_ref)
    .filter((ref) => typeof ref === "string" && ref.length > 0);
  const missing = firstMissing({ seedRowRefs, streamManifestRefs, retainedHistoryRow });
  const sourceArtifacts = makeSourceArtifacts(seedArtifact, manifestSet, retainedHistoryRow);
  const sameRunBinding = makeSameRunBinding({ seedArtifact, manifestSet, seedRowRefs, streamManifestRefs });
  const providerObjectHash = stableHash({
    schema: SCHEMA,
    sourceArtifacts,
    sameRunBinding,
    seedRowRefs,
    streamManifestRefs,
    retainedHistoryRowId: retainedHistoryRow?.row_id ?? null,
  });
  const providerObjectId = `central_solver_retained_history_provider_object:${providerObjectHash.slice(0, 16)}`;
  const providerObjectRef = `candidate:${providerObjectId}`;
  const providerProvenance = {
    required: true,
    provider_object_id: providerObjectId,
    candidate_provider_object_ref: providerObjectRef,
    provider_object_ref: null,
    provider_artifact_hash: null,
    source_run_id: sameRunBinding.source_run_id,
    source_dataset_id: sameRunBinding.source_dataset_id,
    status:
      missing.evidence_reason === "provider_provenance_missing"
        ? "missing_provider_object_ref"
        : "provider_object_ref_not_authorized",
    first_missing_field: PROVIDER_OBJECT_REF_FIELD,
  };
  const artifact = {
    schema: SCHEMA,
    artifact_id: providerObjectId,
    artifact_hash: providerObjectHash,
    provider_object_id: providerObjectId,
    candidate_provider_object_ref: providerObjectRef,
    accepted_provider_object_ref: null,
    seed_id: seedArtifact?.seed_id ?? retainedHistoryRow?.seed_id ?? null,
    route_id: seedArtifact?.route_id ?? retainedHistoryRow?.route_id ?? null,
    source_artifacts: sourceArtifacts,
    same_run_binding: sameRunBinding,
    retained_record_binding: {
      required: true,
      retained_record_id: seedRowRefs[0]?.retained_record_id ?? null,
      status:
        missing.evidence_reason === "retained_record_id_missing"
          ? "missing_retained_record_id"
          : "retained_record_id_present_unaccepted",
      first_missing_field:
        missing.evidence_reason === "retained_record_id_missing"
          ? SEED_PATH_ROWS_FIRST_MISSING_FIELD
          : PROVIDER_OBJECT_REF_FIELD,
    },
    seed_row_refs: seedRowRefs,
    stream_manifest_refs: streamManifestRefs,
    durable_stream_manifest_refs: durableStreamManifestRefs,
    path_segment_layout: {
      required_layout: PATH_SEGMENT_LAYOUT,
      seed_row_count: seedRowRefs.length,
      stream_manifest_row_count: streamManifestRefs.length,
      durable_stream_count: durableStreamManifestRefs.length,
      local_manifest_count: streamManifestRefs.filter((row) => row.local_stream_manifest_ref != null).length,
    },
    dynamic_replay_metadata: {
      from_seed_path_rows: seedArtifact?.dynamic_replay_requirements ?? null,
      from_retained_history_row: retainedHistoryRow?.dynamics ?? null,
    },
    same_source_self_hit_requirement_refs: (retainedHistoryRow?.same_source_self_hit_requirements ?? []).map(
      (row) => row.row_id
    ),
    partner_causal_root_replay_requirement_refs: (
      retainedHistoryRow?.partner_causal_root_replay_requirements ?? []
    ).map((row) => row.row_id),
    wake_ledger_hook_requirement: retainedHistoryRow?.wake_ledger_hook_requirement ?? null,
    action_ledger_hook_requirement: retainedHistoryRow?.action_ledger_hook_requirement ?? null,
    branch_row_identity_requirement: retainedHistoryRow?.branch_row_identity_requirement ?? null,
    oblate_spheroid_residual_row_requirement:
      retainedHistoryRow?.oblate_spheroid_residual_row_requirement ?? null,
    retained_source_binding_requirement: retainedHistoryRow?.retained_source_binding_requirement ?? null,
    provider_provenance: providerProvenance,
    artifact_status: missing.artifact_status,
    source_status: "source_acquisition_blocked",
    first_missing_object: missing.first_missing_object,
    first_missing_field: missing.first_missing_field,
    first_internal_blocker: missing.first_internal_blocker ?? null,
    evidence_evaluation: {
      accepted: false,
      reason: missing.evidence_reason,
      first_missing_field: missing.first_missing_field,
    },
    authorization: makeAuthorization(),
    negative_controls: Object.entries(NEGATIVE_CONTROL_REASONS).map(([evidence_class, reason]) => ({
      evidence_class,
      accepted: false,
      reason,
    })),
  };
  return artifact;
}

export function validateCentralSolverRetainedHistoryProviderObject(artifact) {
  const errors = [];
  if (artifact?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (!Array.isArray(artifact?.seed_row_refs) || artifact.seed_row_refs.length !== 6) {
    errors.push("six seed-row refs are required");
  }
  if (!Array.isArray(artifact?.stream_manifest_refs) || artifact.stream_manifest_refs.length !== 6) {
    errors.push("six stream-manifest refs are required");
  }
  if (artifact?.source_artifacts?.held_release_seed_path_rows?.consumed_schema !== SEED_PATH_ROWS_SCHEMA) {
    errors.push(`seed rows input must use ${SEED_PATH_ROWS_SCHEMA}`);
  }
  if (
    artifact?.source_artifacts?.held_release_path_history_stream_manifest_set?.consumed_schema !==
    STREAM_MANIFEST_SET_SCHEMA
  ) {
    errors.push(`manifest-set input must use ${STREAM_MANIFEST_SET_SCHEMA}`);
  }
  if (
    artifact?.source_artifacts?.central_solver_retained_history_row_request?.consumed_schema !==
    RETAINED_HISTORY_ROW_SCHEMA
  ) {
    errors.push(`retained-history row input must use ${RETAINED_HISTORY_ROW_SCHEMA}`);
  }
  if (artifact?.first_missing_field !== SEED_PATH_ROWS_FIRST_MISSING_FIELD) {
    errors.push(`default first missing field must be ${SEED_PATH_ROWS_FIRST_MISSING_FIELD}`);
  }
  if (artifact?.provider_provenance?.provider_object_ref != null) {
    errors.push("provider_object_ref must not be authorized");
  }
  if (artifact?.accepted_provider_object_ref != null) {
    errors.push("accepted_provider_object_ref must remain null");
  }
  if (artifact?.path_segment_layout?.durable_stream_count !== 0) {
    errors.push("default durable stream count must remain zero");
  }
  if (artifact?.same_source_self_hit_requirement_refs?.length !== 6) {
    errors.push("six same-source self-hit requirement refs are required");
  }
  if (artifact?.partner_causal_root_replay_requirement_refs?.length !== 30) {
    errors.push("thirty partner causal-root replay requirement refs are required");
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
    const result = evaluateCentralSolverRetainedHistoryProviderObjectEvidence({
      evidence_class: evidenceClass,
    });
    if (result.accepted || result.reason !== reason) {
      errors.push(`${evidenceClass} negative control must reject as ${reason}`);
    }
  }
  return errors;
}

function runCli() {
  const artifact = buildCentralSolverRetainedHistoryProviderObject();
  const errors = validateCentralSolverRetainedHistoryProviderObject(artifact);
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
