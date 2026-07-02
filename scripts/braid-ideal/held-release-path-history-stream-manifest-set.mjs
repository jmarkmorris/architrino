import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

import {
  FIRST_MISSING_FIELD as SEED_PATH_ROWS_FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT as SEED_PATH_ROWS_FIRST_MISSING_OBJECT,
  buildHeldReleaseSeedPathRows,
} from "./held-release-seed-path-rows.mjs";

export const SCHEMA = "held_release_path_history_stream_manifest_set.v0";
export const FIRST_MISSING_OBJECT = SEED_PATH_ROWS_FIRST_MISSING_OBJECT;
export const FIRST_MISSING_FIELD = SEED_PATH_ROWS_FIRST_MISSING_FIELD;

const SEED_PATH_ROWS_SCHEMA = "held_release_seed_path_rows.v0";
const STREAM_MANIFEST_SCHEMA = "held_release_path_history_stream_manifest.v0";
const LOCAL_MANIFEST_SCHEMA = "solver-native-file-stream-manifest.v1";
const STREAM_DESCRIPTOR_SCHEMA = "solver-path-history-stream.v1";
const STREAM_MANIFEST_VERSION = "solver-stream-manifest.v1";
const PATH_SEGMENT_LAYOUT = "path_segment.v1";
const PROVIDER_OBJECT_MISSING_FIELD =
  "held_release_path_history_stream_manifest_set[*].provider_provenance.provider_object_ref";
const DURABLE_STREAM_MISSING_FIELD =
  "held_release_path_history_stream_manifest_set[*].durable_stream_binding.durable_manifest_ref";

export const NEGATIVE_CONTROL_REASONS = Object.freeze({
  fixture: "fixture_not_accepted_path_history_stream_manifest_evidence",
  diagnostic: "diagnostic_not_accepted_path_history_stream_manifest_evidence",
  priority_prose: "priority_prose_not_accepted_path_history_stream_manifest_evidence",
  generated_decoy: "generated_decoy_not_accepted_path_history_stream_manifest_evidence",
  proxy_row: "proxy_row_not_accepted_path_history_stream_manifest_evidence",
  candidate_ref: "candidate_ref_not_accepted_path_history_stream_manifest_evidence",
  aggregate_row: "aggregate_row_not_same_record_path_history_stream_manifest_evidence",
  h39_theta3minus_quotient_row:
    "h39_theta3minus_row_not_braid_ideal_path_history_stream_manifest_evidence",
  dirty_file_evidence: "dirty_file_not_accepted_path_history_stream_manifest_evidence",
  source_contract_shell: "source_contract_shell_not_accepted_path_history_stream_manifest_evidence",
  temp_probe: "temp_probe_not_accepted_path_history_stream_manifest_evidence",
  t3_row: "t3_row_not_braid_ideal_path_history_stream_manifest_evidence",
  endpoint_only_row: "endpoint_only_row_not_path_history_stream_manifest_evidence",
  affine_geometry_alone: "affine_geometry_alone_not_path_history_stream_manifest_evidence",
  cross_row_bundle: "cross_row_bundle_not_same_record_path_history_stream_manifest_evidence",
  generic_stream_metadata_without_same_record_binding:
    "generic_stream_metadata_without_same_record_binding_not_accepted_manifest_evidence",
  earlier_fail_closed_adapter_row:
    "earlier_fail_closed_adapter_row_not_accepted_path_history_stream_manifest_evidence",
});

const AUTHORIZATION_FLAGS = Object.freeze([
  "accepted_same_record_evidence",
  "held_release_path_history_stream_manifest_set",
  "central_solver_retained_history_provider_object",
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

function formatIdPart(value) {
  return String(value)
    .replaceAll("+", "plus")
    .replaceAll("-", "minus")
    .replaceAll(":", "_")
    .replaceAll(".", "_")
    .replaceAll("/", "_");
}

function normalizeStringRef(value) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function firstMissingForSeedRow(seedRow, { providerObjectRef, durableManifestRef } = {}) {
  if (seedRow?.same_record_binding?.retained_record_id == null) {
    return {
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: FIRST_MISSING_FIELD,
      status: "missing_retained_record_id",
    };
  }
  if (seedRow?.provider_provenance?.provider_object_ref == null || providerObjectRef == null) {
    return {
      first_missing_object: "held_release_path_history_stream_manifest_set_provider_object",
      first_missing_field: PROVIDER_OBJECT_MISSING_FIELD,
      status: "missing_provider_object_ref",
    };
  }
  if (durableManifestRef == null) {
    return {
      first_missing_object: "held_release_path_history_stream_durable_manifest",
      first_missing_field: DURABLE_STREAM_MISSING_FIELD,
      status: "missing_durable_stream_manifest_ref",
    };
  }
  return {
    first_missing_object: "held_release_path_history_stream_manifest_set_acceptance_certificate",
    first_missing_field: "held_release_path_history_stream_manifest_set.acceptance_certificate_ref",
    status: "provider_backed_stream_manifest_present_unaccepted",
  };
}

function makeManifestRow({
  rowPrefix,
  seedArtifact,
  seedRow,
  index,
  providerObjectRef,
  providerArtifactHash,
  durableManifestRef,
}) {
  const pathRow = seedRow.solver_path_history_row_f64;
  const retainedRecordId = seedRow.same_record_binding?.retained_record_id ?? null;
  const rowProviderObjectRef =
    providerObjectRef ?? normalizeStringRef(seedRow.provider_provenance?.provider_object_ref);
  const rowProviderArtifactHash =
    providerArtifactHash ?? normalizeStringRef(seedRow.provider_provenance?.provider_artifact_hash);
  const missing = firstMissingForSeedRow(seedRow, {
    providerObjectRef: rowProviderObjectRef,
    durableManifestRef,
  });
  const sourceSeedRowHash = seedRow.artifact_hash;
  const streamId = `${seedArtifact.source_run_identity.source_run_id}:path-history-stream:${index}:${formatIdPart(
    seedRow.path_identity.architrino_id
  )}`;
  const streamManifestId = `${rowPrefix}:stream-manifest:${index}:${pathRow.pathKey.toString(16)}`;
  const chunkDigest = stableHash({
    layout: PATH_SEGMENT_LAYOUT,
    row_count: 1,
    path_row: pathRow,
    source_seed_row_artifact_hash: sourceSeedRowHash,
  });
  const localManifest = {
    schema: LOCAL_MANIFEST_SCHEMA,
    accepted: false,
    manifest_authority: "locally_constructed_manifest_object_not_durable_evidence",
    stream: {
      schema: STREAM_DESCRIPTOR_SCHEMA,
      manifestVersion: STREAM_MANIFEST_VERSION,
      layout: PATH_SEGMENT_LAYOUT,
      streamId,
      runId: seedArtifact.source_run_identity.source_run_id,
      datasetId: seedArtifact.source_run_identity.source_dataset_id,
      rowCount: 1,
      chunkCount: 1,
      pathKey: pathRow.pathKey,
      segmentIndex: pathRow.segmentIndex,
      sourceSeedRowId: seedRow.row_id,
      sourceSeedRowArtifactHash: sourceSeedRowHash,
    },
    chunks: [
      {
        chunkIndex: 0,
        layout: PATH_SEGMENT_LAYOUT,
        rowOffset: 0,
        rowCount: 1,
        pathKeyStart: pathRow.pathKey,
        pathKeyEnd: pathRow.pathKey,
        timeRange: {
          start: pathRow.startTime,
          end: pathRow.endTime,
        },
        chunkDigest,
        durableChunkRef: durableManifestRef == null ? null : `${durableManifestRef}:chunk:0`,
      },
    ],
    index: {
      schema: "solver-stream-index.v1",
      indexLayout: "stream_index.v1",
      rowCount: 1,
      durableIndexRef: durableManifestRef == null ? null : `${durableManifestRef}:index`,
    },
  };
  const localManifestHash = stableHash(localManifest);
  const providerBacked = rowProviderObjectRef != null && durableManifestRef != null;
  return {
    row_id: streamManifestId,
    schema: STREAM_MANIFEST_SCHEMA,
    accepted: false,
    authority_class:
      retainedRecordId == null
        ? "same_run_stream_manifest_request_missing_retained_record"
        : providerBacked
          ? "same_run_stream_manifest_provider_backed_acceptance_blocked"
          : "same_run_stream_manifest_request_missing_provider_provenance",
    held_release_seed_id: seedArtifact.seed_id,
    same_run_identity: {
      same_run_required: true,
      source_run_id: seedArtifact.source_run_identity.source_run_id,
      source_dataset_id: seedArtifact.source_run_identity.source_dataset_id,
    },
    source_seed_row_binding: {
      source_seed_row_id: seedRow.row_id,
      source_seed_row_artifact_hash: sourceSeedRowHash,
      source_seed_row_schema: seedRow.schema,
      path_key: pathRow.pathKey,
      segment_index: pathRow.segmentIndex,
    },
    stream_identity: {
      stream_id: streamId,
      stream_manifest_id: streamManifestId,
      local_stream_manifest_ref: `local:${streamManifestId}`,
      stream_manifest_ref: `local:${streamManifestId}`,
      durable_manifest_ref: durableManifestRef,
    },
    path_segment_stream: {
      required_layout: PATH_SEGMENT_LAYOUT,
      row_count: 1,
      rows_per_chunk: 1,
      chunk_count: 1,
      stream_chunk_digest: chunkDigest,
      local_manifest_hash: localManifestHash,
      start_time: pathRow.startTime,
      end_time: pathRow.endTime,
    },
    stream_manifest_object: localManifest,
    retained_record_binding: {
      required: true,
      retained_record_id: retainedRecordId,
      status: providerBacked
        ? "provider_backed_retained_record_present_unaccepted"
        : retainedRecordId == null
          ? "missing_retained_record_id"
          : "retained_record_id_present_unaccepted",
      first_missing_field: missing.first_missing_field,
    },
    durable_stream_binding: {
      required: true,
      durable_manifest_ref: durableManifestRef,
      durable_chunk_refs: durableManifestRef == null ? [] : [`${durableManifestRef}:chunk:0`],
      status: durableManifestRef == null
        ? "missing_durable_stream_manifest_ref"
        : "durable_manifest_ref_present_unaccepted",
      first_missing_field: durableManifestRef == null
        ? DURABLE_STREAM_MISSING_FIELD
        : "held_release_path_history_stream_manifest_set.acceptance_certificate_ref",
    },
    provider_provenance: {
      required: true,
      provider_object_ref: rowProviderObjectRef,
      provider_artifact_hash: rowProviderArtifactHash,
      source_run_id: seedArtifact.source_run_identity.source_run_id,
      source_dataset_id: seedArtifact.source_run_identity.source_dataset_id,
      status: rowProviderObjectRef == null ? "missing_provider_object_ref" : "provider_object_ref_present_unaccepted",
      first_missing_field: rowProviderObjectRef == null
        ? PROVIDER_OBJECT_MISSING_FIELD
        : missing.first_missing_field,
    },
    first_missing_object: missing.first_missing_object,
    first_missing_field: missing.first_missing_field,
    artifact_hash: stableHash({
      schema: STREAM_MANIFEST_SCHEMA,
      streamManifestId,
      sourceSeedRowHash,
      chunkDigest,
      localManifestHash,
      retainedRecordId,
    }),
  };
}

export function evaluateHeldReleasePathHistoryStreamManifestSetEvidence(candidate = {}) {
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
      reason: "schema_not_held_release_path_history_stream_manifest_set_v0",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (!Array.isArray(candidate.stream_manifest_rows) || candidate.stream_manifest_rows.length !== 6) {
    return {
      accepted: false,
      reason: "six_path_history_stream_manifest_rows_required",
      first_missing_field: "held_release_path_history_stream_manifest_set.stream_manifest_rows",
    };
  }
  if (candidate.stream_manifest_rows.some((row) => row?.retained_record_binding?.retained_record_id == null)) {
    return {
      accepted: false,
      reason: "retained_record_id_missing",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (candidate.stream_manifest_rows.some((row) => row?.provider_provenance?.provider_object_ref == null)) {
    return {
      accepted: false,
      reason: "provider_provenance_missing",
      first_missing_field: PROVIDER_OBJECT_MISSING_FIELD,
    };
  }
  if (candidate.stream_manifest_rows.some((row) => row?.durable_stream_binding?.durable_manifest_ref == null)) {
    return {
      accepted: false,
      reason: "durable_stream_manifest_ref_missing",
      first_missing_field: DURABLE_STREAM_MISSING_FIELD,
    };
  }
  return {
    accepted: false,
    reason: "producer_does_not_authorize_accepted_stream_manifest_evidence",
    first_missing_field: "held_release_path_history_stream_manifest_set.acceptance_certificate_ref",
  };
}

export function buildHeldReleasePathHistoryStreamManifestSet(options = {}) {
  const seedArtifact = options.seedArtifact ?? buildHeldReleaseSeedPathRows(options.seedPathRowOptions ?? {});
  const providerObjectRef = normalizeStringRef(options.providerObjectRef);
  const providerArtifactHash = normalizeStringRef(options.providerArtifactHash);
  const durableManifestRefs = Array.isArray(options.durableManifestRefs) ? options.durableManifestRefs : [];
  const seedArtifactStatus =
    seedArtifact?.schema === SEED_PATH_ROWS_SCHEMA
      ? "seed_path_rows_consumed"
      : "seed_path_rows_schema_missing";
  const baseKey = {
    schema: SCHEMA,
    seedArtifactHash: seedArtifact?.artifact_hash ?? null,
    seedId: seedArtifact?.seed_id ?? null,
    routeId: seedArtifact?.route_id ?? null,
    sourceRunId: seedArtifact?.source_run_identity?.source_run_id ?? null,
    sourceDatasetId: seedArtifact?.source_run_identity?.source_dataset_id ?? null,
  };
  const artifactHash = stableHash(baseKey);
  const rowPrefix = `held_release_path_history_stream_manifest_set:${artifactHash.slice(0, 16)}`;
  const streamManifestRows =
    seedArtifact?.schema === SEED_PATH_ROWS_SCHEMA && Array.isArray(seedArtifact.rows)
      ? seedArtifact.rows.map((seedRow, index) =>
          makeManifestRow({
            rowPrefix,
            seedArtifact,
            seedRow,
            index,
            providerObjectRef,
            providerArtifactHash,
            durableManifestRef: normalizeStringRef(durableManifestRefs[index]),
          })
        )
      : [];
  const evidence = evaluateHeldReleasePathHistoryStreamManifestSetEvidence({
    schema: SCHEMA,
    stream_manifest_rows: streamManifestRows,
  });
  const firstMissingObject =
    evidence.first_missing_field === FIRST_MISSING_FIELD
      ? FIRST_MISSING_OBJECT
      : evidence.reason === "provider_provenance_missing"
        ? "held_release_path_history_stream_manifest_set_provider_object"
        : evidence.reason === "durable_stream_manifest_ref_missing"
          ? "held_release_path_history_stream_durable_manifest"
          : "held_release_path_history_stream_manifest_set_acceptance_certificate";
  const providerBacked = evidence.reason === "producer_does_not_authorize_accepted_stream_manifest_evidence";
  const populatedDurableManifestRefs = streamManifestRows
    .map((row) => row.durable_stream_binding?.durable_manifest_ref)
    .filter((ref) => typeof ref === "string" && ref.length > 0);

  return {
    schema: SCHEMA,
    artifact_id: rowPrefix,
    artifact_hash: artifactHash,
    seed_id: seedArtifact?.seed_id ?? null,
    route_id: seedArtifact?.route_id ?? null,
    source_seed_path_rows: {
      required: true,
      consumed_schema: seedArtifact?.schema ?? null,
      consumed_artifact_id: seedArtifact?.artifact_id ?? null,
      consumed_artifact_hash: seedArtifact?.artifact_hash ?? null,
      consumed_status: seedArtifactStatus,
      source_status: seedArtifact?.source_status ?? null,
      source_first_missing_object: seedArtifact?.first_missing_object ?? null,
      source_first_missing_field: seedArtifact?.first_missing_field ?? null,
    },
    same_run_identity: {
      same_run_required: true,
      source_run_id: seedArtifact?.source_run_identity?.source_run_id ?? null,
      source_dataset_id: seedArtifact?.source_run_identity?.source_dataset_id ?? null,
    },
    stream_contract: {
      required_layout: PATH_SEGMENT_LAYOUT,
      required_manifest_schema: LOCAL_MANIFEST_SCHEMA,
      required_stream_manifest_version: STREAM_MANIFEST_VERSION,
      required_stream_count: 6,
      required_row_count_per_stream: 1,
      central_solver_consumer_schema: "central_solver_retained_history_row.v0",
    },
    stream_manifest_rows: streamManifestRows,
    retained_record_requirement: {
      required: true,
      retained_record_id: streamManifestRows[0]?.retained_record_binding?.retained_record_id ?? null,
      same_record_binding_status: providerBacked
        ? "provider_backed_retained_record_present_unaccepted"
        : evidence.reason === "retained_record_id_missing"
          ? "missing_retained_record_id"
          : "retained_record_id_present_unaccepted",
      first_missing_field:
        evidence.reason === "retained_record_id_missing"
          ? FIRST_MISSING_FIELD
          : evidence.reason === "provider_provenance_missing"
            ? PROVIDER_OBJECT_MISSING_FIELD
            : evidence.first_missing_field,
    },
    durable_stream_requirement: {
      required: true,
      durable_manifest_refs: populatedDurableManifestRefs,
      durable_stream_count: populatedDurableManifestRefs.length,
      local_manifest_count: streamManifestRows.length,
      status: populatedDurableManifestRefs.length === streamManifestRows.length && streamManifestRows.length > 0
        ? "durable_manifest_refs_present_unaccepted"
        : "local_manifest_objects_constructed_but_not_durable_evidence",
      first_missing_field: populatedDurableManifestRefs.length === streamManifestRows.length && streamManifestRows.length > 0
        ? "held_release_path_history_stream_manifest_set.acceptance_certificate_ref"
        : DURABLE_STREAM_MISSING_FIELD,
    },
    artifact_status:
      evidence.reason === "retained_record_id_missing"
        ? "fail_closed_missing_retained_record_id"
        : evidence.reason === "provider_provenance_missing"
          ? "fail_closed_missing_provider_provenance"
          : evidence.reason === "durable_stream_manifest_ref_missing"
            ? "fail_closed_missing_durable_stream_manifest_refs"
            : "provider_backed_stream_manifest_set_present_acceptance_blocked",
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

export function validateHeldReleasePathHistoryStreamManifestSet(artifact) {
  const errors = [];
  const providerBacked = artifact?.source_status === "candidate_provider_backed_source_unaccepted";
  if (artifact?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (!Array.isArray(artifact?.stream_manifest_rows) || artifact.stream_manifest_rows.length !== 6) {
    errors.push("six path-history stream manifest rows are required");
  }
  if (!providerBacked && artifact?.first_missing_field !== FIRST_MISSING_FIELD) {
    errors.push(`first missing field must be ${FIRST_MISSING_FIELD}`);
  }
  if (
    providerBacked &&
    artifact?.first_missing_field !== "held_release_path_history_stream_manifest_set.acceptance_certificate_ref"
  ) {
    errors.push("provider-backed manifest set must point to the missing acceptance certificate");
  }
  if (!providerBacked && artifact?.retained_record_requirement?.retained_record_id != null) {
    errors.push("default manifest-set output must not claim retained_record_id");
  }
  const runIds = new Set(artifact?.stream_manifest_rows?.map((row) => row?.same_run_identity?.source_run_id));
  if (runIds.size !== 1) {
    errors.push("all manifest rows must share one same-run identity");
  }
  const sourceSeedRowIds = new Set(
    artifact?.stream_manifest_rows?.map((row) => row?.source_seed_row_binding?.source_seed_row_id)
  );
  if (sourceSeedRowIds.size !== 6) {
    errors.push("six distinct source seed-row bindings are required");
  }
  for (const row of artifact?.stream_manifest_rows ?? []) {
    if (row?.schema !== STREAM_MANIFEST_SCHEMA) {
      errors.push(`each manifest row must use ${STREAM_MANIFEST_SCHEMA}`);
    }
    if (row?.stream_manifest_object?.schema !== LOCAL_MANIFEST_SCHEMA) {
      errors.push(`each local stream manifest object must use ${LOCAL_MANIFEST_SCHEMA}`);
    }
    if (row?.stream_manifest_object?.stream?.layout !== PATH_SEGMENT_LAYOUT) {
      errors.push(`each stream manifest must use ${PATH_SEGMENT_LAYOUT}`);
    }
    if (row?.path_segment_stream?.row_count !== 1) {
      errors.push("each seed stream manifest must carry one path segment row");
    }
    if (!providerBacked && row?.retained_record_binding?.retained_record_id != null) {
      errors.push("default stream manifest rows must not claim retained_record_id");
    }
    if (!providerBacked && row?.provider_provenance?.provider_object_ref != null) {
      errors.push("default stream manifest rows must not claim provider_object_ref");
    }
    if (!providerBacked && row?.durable_stream_binding?.durable_manifest_ref != null) {
      errors.push("default stream manifest rows must not claim durable_manifest_ref");
    }
    if (providerBacked && row?.retained_record_binding?.retained_record_id == null) {
      errors.push("provider-backed stream manifest rows must carry retained_record_id");
    }
    if (providerBacked && row?.provider_provenance?.provider_object_ref == null) {
      errors.push("provider-backed stream manifest rows must carry provider_object_ref");
    }
    if (providerBacked && row?.durable_stream_binding?.durable_manifest_ref == null) {
      errors.push("provider-backed stream manifest rows must carry durable_manifest_ref");
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
  const artifact = buildHeldReleasePathHistoryStreamManifestSet();
  const errors = validateHeldReleasePathHistoryStreamManifestSet(artifact);
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
