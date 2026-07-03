import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

import {
  FIRST_MISSING_FIELD as SEED_PATH_ROWS_FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT as SEED_PATH_ROWS_FIRST_MISSING_OBJECT,
  buildHeldReleaseSeedPathRows,
} from "./held-release-seed-path-rows.mjs";
import { buildHeldReleasePathHistoryStreamManifestSet } from "./held-release-path-history-stream-manifest-set.mjs";
import { buildCentralSolverRetainedHistoryProviderObject } from "./central-solver-retained-history-provider-object.mjs";
import { buildCentralSolverRetainedHistoryRow } from "./central-solver-retained-history-row.mjs";

export const SCHEMA = "central_solver_retained_source_adapter.v0";
export const FIRST_MISSING_OBJECT = SEED_PATH_ROWS_FIRST_MISSING_OBJECT;
export const FIRST_MISSING_FIELD = SEED_PATH_ROWS_FIRST_MISSING_FIELD;

const PROVIDER_OBJECT_REF_FIELD =
  "central_solver_retained_source_adapter.provider_provenance.provider_object_ref";
const DURABLE_STREAM_REFS_FIELD =
  "central_solver_retained_source_adapter.path_history_binding.durable_stream_manifest_refs";
const SOURCE_ROW_ID_FIELD = "central_solver_retained_source_adapter.same_record_binding.source_row_id";
const ROOT_LEDGER_DETAIL_REFS_FIELD =
  "central_solver_retained_source_adapter.native_root_ledger_detail_refs";
const CAUSAL_ROOT_REPLAY_REFS_FIELD =
  "central_solver_retained_source_adapter.causal_root_replay_refs";
const ACTION_CLOSURE_REF_FIELD =
  "central_solver_retained_source_adapter.same_record_action_closure_ref";
const WAKE_HISTORY_REF_FIELD = "central_solver_retained_source_adapter.retained_wake_history_ref";
const ACCEPTANCE_CERTIFICATE_FIELD =
  "central_solver_retained_source_adapter.acceptance_certificate_ref";
const EXTERNAL_VERIFICATION_FIELD =
  "central_solver_retained_source_adapter.external_accepted_authority_verification_ref";

const PATH_SEGMENT_LAYOUT = "path_segment.v1";
const ROOT_LEDGER_DETAIL_LAYOUT = "root_ledger_detail.v1";

const AUTHORIZATION_FLAGS = Object.freeze([
  "accepted_same_record_evidence",
  "central_solver_retained_source_adapter",
  "central_solver_retained_history_provider_object",
  "retained_branch_claim",
  "accepted_transition_source",
  "moving_retained_branch_certificate",
  "same_ledger_action_measure_row",
  "bounded_speed_live_ledger",
  "receiver_normal_branch_strength",
]);

export const NEGATIVE_CONTROL_REASONS = Object.freeze({
  fixture: "fixture_not_accepted_retained_source_adapter_evidence",
  diagnostic: "diagnostic_not_accepted_retained_source_adapter_evidence",
  priority_prose: "priority_prose_not_accepted_retained_source_adapter_evidence",
  generated_decoy: "generated_decoy_not_accepted_retained_source_adapter_evidence",
  proxy_row: "proxy_row_not_accepted_retained_source_adapter_evidence",
  candidate_ref: "candidate_ref_not_accepted_retained_source_adapter_evidence",
  aggregate_row: "aggregate_row_not_same_record_retained_source_adapter_evidence",
  generic_stream_provider_metadata_without_same_record_binding:
    "generic_stream_provider_metadata_without_same_record_binding_not_retained_source_adapter_evidence",
  root_ledger_without_retained_record:
    "root_ledger_without_retained_record_not_retained_source_adapter_evidence",
  source_contract_shell: "source_contract_shell_not_accepted_retained_source_adapter_evidence",
  earlier_fail_closed_adapter_row:
    "earlier_fail_closed_adapter_row_not_accepted_retained_source_adapter_evidence",
});

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function normalizeStringRef(value) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function normalizeRefs(value) {
  return Array.isArray(value)
    ? value.filter((entry) => typeof entry === "string" && entry.length > 0)
    : [];
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function buildCandidateProviderBackedArtifacts(options, retainedRecordId, durableManifestRefs) {
  const seedPathRowOptions = {
    ...(options.seedPathRowOptions ?? {}),
    retainedRecordId,
  };
  const baseSeedArtifact = buildHeldReleaseSeedPathRows(seedPathRowOptions);
  const baseManifestSet = buildHeldReleasePathHistoryStreamManifestSet({
    seedArtifact: baseSeedArtifact,
    durableManifestRefs,
  });
  const baseRetainedHistoryRow = buildCentralSolverRetainedHistoryRow({
    ...(options.retainedHistoryRowOptions ?? {}),
    retainedRecordId,
  });
  const providerShell = buildCentralSolverRetainedHistoryProviderObject({
    seedArtifact: baseSeedArtifact,
    manifestSetArtifact: baseManifestSet,
    retainedHistoryRow: baseRetainedHistoryRow,
  });
  const providerObjectRef = normalizeStringRef(options.providerObjectRef) ?? providerShell.candidate_provider_object_ref;
  const providerArtifactHash = normalizeStringRef(options.providerArtifactHash) ?? providerShell.artifact_hash;
  const seedArtifact = buildHeldReleaseSeedPathRows({
    ...seedPathRowOptions,
    providerObjectRef,
    providerArtifactHash,
  });
  const manifestSet = buildHeldReleasePathHistoryStreamManifestSet({
    seedArtifact,
    providerObjectRef,
    providerArtifactHash,
    durableManifestRefs,
  });
  const retainedHistoryRow = buildCentralSolverRetainedHistoryRow({
    ...(options.retainedHistoryRowOptions ?? {}),
    retainedRecordId,
    providerObjectRef,
    providerArtifactHash,
  });
  const providerObject = buildCentralSolverRetainedHistoryProviderObject({
    seedArtifact,
    manifestSetArtifact: manifestSet,
    retainedHistoryRow,
  });
  return {
    seedArtifact,
    manifestSet,
    retainedHistoryRow,
    providerObject,
  };
}

function buildDefaultArtifacts(options, retainedRecordId, durableManifestRefs) {
  const seedArtifact =
    options.seedArtifact ??
    buildHeldReleaseSeedPathRows({
      ...(options.seedPathRowOptions ?? {}),
      retainedRecordId,
    });
  const manifestSet =
    options.manifestSetArtifact ??
    buildHeldReleasePathHistoryStreamManifestSet({
      seedArtifact,
      durableManifestRefs,
    });
  const retainedHistoryRow =
    options.retainedHistoryRow ??
    buildCentralSolverRetainedHistoryRow({
      ...(options.retainedHistoryRowOptions ?? {}),
      retainedRecordId,
    });
  const providerObject =
    options.providerObject ??
    buildCentralSolverRetainedHistoryProviderObject({
      seedArtifact,
      manifestSetArtifact: manifestSet,
      retainedHistoryRow,
    });
  return {
    seedArtifact,
    manifestSet,
    retainedHistoryRow,
    providerObject,
  };
}

function buildArtifacts(options, retainedRecordId, durableManifestRefs) {
  if (retainedRecordId != null && durableManifestRefs.length === 6) {
    return buildCandidateProviderBackedArtifacts(options, retainedRecordId, durableManifestRefs);
  }
  return buildDefaultArtifacts(options, retainedRecordId, durableManifestRefs);
}

function retainedRecordIds({ seedArtifact, manifestSet, retainedHistoryRow, providerObject }) {
  return [
    ...(seedArtifact?.rows ?? []).map((row) => row?.same_record_binding?.retained_record_id ?? null),
    ...(manifestSet?.stream_manifest_rows ?? []).map(
      (row) => row?.retained_record_binding?.retained_record_id ?? null
    ),
    retainedHistoryRow?.retained_record_request?.retained_record_id ?? null,
    providerObject?.retained_record_binding?.retained_record_id ?? null,
  ].filter((entry) => typeof entry === "string" && entry.length > 0);
}

function makePathHistoryBinding({ seedArtifact, manifestSet, providerObject }) {
  const seedRows = seedArtifact?.rows ?? [];
  const streamRows = manifestSet?.stream_manifest_rows ?? [];
  const durableStreamManifestRefs = providerObject?.durable_stream_manifest_refs ?? [];
  return {
    required: true,
    path_row_layout: PATH_SEGMENT_LAYOUT,
    seed_path_row_count: seedRows.length,
    stream_manifest_count: streamRows.length,
    durable_stream_manifest_refs: durableStreamManifestRefs,
    durable_stream_count: durableStreamManifestRefs.length,
    path_keys: seedRows.map((row) => row?.solver_path_history_row_f64?.pathKey ?? null),
    seed_path_row_refs: providerObject?.seed_row_refs ?? [],
    stream_manifest_refs: providerObject?.stream_manifest_refs ?? [],
  };
}

function makeRootReplayRequirements(retainedHistoryRow) {
  const partner = retainedHistoryRow?.partner_causal_root_replay_requirement_refs
    ?? retainedHistoryRow?.partner_causal_root_replay_requirements?.map((row) => row.row_id)
    ?? [];
  const self = retainedHistoryRow?.same_source_self_hit_requirement_refs
    ?? retainedHistoryRow?.same_source_self_hit_requirements?.map((row) => row.row_id)
    ?? [];
  return [...self, ...partner];
}

function firstMissing({
  retainedRecordId,
  retainedRecordIdCount,
  providerObjectRef,
  durableStreamCount,
  sourceRowId,
  nativeRootLedgerDetailRefs,
  causalRootReplayRefs,
  expectedRootReplayCount,
  sameRecordActionClosureRef,
  retainedWakeHistoryRef,
  acceptanceCertificateRef,
}) {
  if (retainedRecordId == null || retainedRecordIdCount === 0) {
    return {
      artifact_status: "fail_closed_missing_retained_record_id",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: FIRST_MISSING_FIELD,
      evidence_reason: "retained_record_id_missing",
    };
  }
  if (providerObjectRef == null) {
    return {
      artifact_status: "fail_closed_missing_provider_provenance",
      first_missing_object: "central_solver_retained_source_adapter_provider_provenance",
      first_missing_field: PROVIDER_OBJECT_REF_FIELD,
      evidence_reason: "provider_provenance_missing",
    };
  }
  if (durableStreamCount !== 6) {
    return {
      artifact_status: "fail_closed_missing_durable_stream_manifest_refs",
      first_missing_object: "central_solver_retained_source_adapter_durable_stream_manifest_refs",
      first_missing_field: DURABLE_STREAM_REFS_FIELD,
      evidence_reason: "durable_stream_manifest_refs_missing",
    };
  }
  if (sourceRowId == null) {
    return {
      artifact_status: "fail_closed_missing_source_row_id",
      first_missing_object: "central_solver_retained_source_adapter_source_row_binding",
      first_missing_field: SOURCE_ROW_ID_FIELD,
      evidence_reason: "source_row_id_missing",
    };
  }
  if (nativeRootLedgerDetailRefs.length !== expectedRootReplayCount) {
    return {
      artifact_status: "fail_closed_missing_native_root_ledger_detail_refs",
      first_missing_object: "central_solver_retained_source_adapter_native_root_ledger_detail_refs",
      first_missing_field: ROOT_LEDGER_DETAIL_REFS_FIELD,
      evidence_reason: "native_root_ledger_detail_refs_missing",
    };
  }
  if (causalRootReplayRefs.length !== expectedRootReplayCount) {
    return {
      artifact_status: "fail_closed_missing_causal_root_replay_refs",
      first_missing_object: "central_solver_retained_source_adapter_causal_root_replay_refs",
      first_missing_field: CAUSAL_ROOT_REPLAY_REFS_FIELD,
      evidence_reason: "causal_root_replay_refs_missing",
    };
  }
  if (sameRecordActionClosureRef == null) {
    return {
      artifact_status: "fail_closed_missing_same_record_action_closure_ref",
      first_missing_object: "central_solver_retained_source_adapter_same_record_action_closure",
      first_missing_field: ACTION_CLOSURE_REF_FIELD,
      evidence_reason: "same_record_action_closure_ref_missing",
    };
  }
  if (retainedWakeHistoryRef == null) {
    return {
      artifact_status: "fail_closed_missing_retained_wake_history_ref",
      first_missing_object: "central_solver_retained_source_adapter_retained_wake_history",
      first_missing_field: WAKE_HISTORY_REF_FIELD,
      evidence_reason: "retained_wake_history_ref_missing",
    };
  }
  if (acceptanceCertificateRef == null) {
    return {
      artifact_status: "retained_source_adapter_present_acceptance_blocked",
      first_missing_object: "central_solver_retained_source_adapter_acceptance_certificate",
      first_missing_field: ACCEPTANCE_CERTIFICATE_FIELD,
      evidence_reason: "producer_does_not_authorize_accepted_retained_source_adapter_evidence",
    };
  }
  return {
    artifact_status: "retained_source_adapter_declared_certificate_external_verification_required",
    first_missing_object: "central_solver_retained_source_adapter_external_accepted_authority_verification",
    first_missing_field: EXTERNAL_VERIFICATION_FIELD,
    evidence_reason: "external_accepted_authority_verification_missing",
  };
}

export function evaluateCentralSolverRetainedSourceAdapterEvidence(candidate = {}) {
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
      reason: "schema_not_central_solver_retained_source_adapter_v0",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (candidate.same_record_binding?.retained_record_id == null) {
    return {
      accepted: false,
      reason: "retained_record_id_missing",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (candidate.provider_provenance?.provider_object_ref == null) {
    return {
      accepted: false,
      reason: "provider_provenance_missing",
      first_missing_field: PROVIDER_OBJECT_REF_FIELD,
    };
  }
  if (!Array.isArray(candidate.path_history_binding?.durable_stream_manifest_refs) ||
    candidate.path_history_binding.durable_stream_manifest_refs.length !== 6) {
    return {
      accepted: false,
      reason: "durable_stream_manifest_refs_missing",
      first_missing_field: DURABLE_STREAM_REFS_FIELD,
    };
  }
  if (candidate.same_record_binding?.source_row_id == null) {
    return {
      accepted: false,
      reason: "source_row_id_missing",
      first_missing_field: SOURCE_ROW_ID_FIELD,
    };
  }
  if (
    !Array.isArray(candidate.native_root_ledger_detail_refs) ||
    candidate.native_root_ledger_detail_refs.length !== candidate.root_ledger_binding?.required_root_replay_count
  ) {
    return {
      accepted: false,
      reason: "native_root_ledger_detail_refs_missing",
      first_missing_field: ROOT_LEDGER_DETAIL_REFS_FIELD,
    };
  }
  if (
    !Array.isArray(candidate.causal_root_replay_refs) ||
    candidate.causal_root_replay_refs.length !== candidate.root_ledger_binding?.required_root_replay_count
  ) {
    return {
      accepted: false,
      reason: "causal_root_replay_refs_missing",
      first_missing_field: CAUSAL_ROOT_REPLAY_REFS_FIELD,
    };
  }
  if (candidate.same_record_action_closure_ref == null) {
    return {
      accepted: false,
      reason: "same_record_action_closure_ref_missing",
      first_missing_field: ACTION_CLOSURE_REF_FIELD,
    };
  }
  if (candidate.retained_wake_history_ref == null) {
    return {
      accepted: false,
      reason: "retained_wake_history_ref_missing",
      first_missing_field: WAKE_HISTORY_REF_FIELD,
    };
  }
  if (candidate.acceptance_certificate_ref == null) {
    return {
      accepted: false,
      reason: "producer_does_not_authorize_accepted_retained_source_adapter_evidence",
      first_missing_field: ACCEPTANCE_CERTIFICATE_FIELD,
    };
  }
  return {
    accepted: false,
    reason: "external_accepted_authority_verification_missing",
    first_missing_field: EXTERNAL_VERIFICATION_FIELD,
  };
}

export function buildCentralSolverRetainedSourceAdapter(options = {}) {
  const retainedRecordId = normalizeStringRef(options.retainedRecordId);
  const sourceRowId = normalizeStringRef(options.sourceRowId);
  const durableManifestRefs = normalizeRefs(options.durableManifestRefs);
  const nativeRootLedgerDetailRefs = normalizeRefs(options.nativeRootLedgerDetailRefs);
  const causalRootReplayRefs = normalizeRefs(options.causalRootReplayRefs);
  const sameRecordActionClosureRef = normalizeStringRef(options.sameRecordActionClosureRef);
  const retainedWakeHistoryRef = normalizeStringRef(options.retainedWakeHistoryRef);
  const acceptanceCertificateRef = normalizeStringRef(options.acceptanceCertificateRef);
  const artifacts = buildArtifacts(options, retainedRecordId, durableManifestRefs);
  const retainedRecordIdSet = new Set(retainedRecordIds(artifacts));
  const providerObjectRef = artifacts.providerObject?.provider_provenance?.provider_object_ref ?? null;
  const pathHistoryBinding = makePathHistoryBinding(artifacts);
  const rootReplayRequirementRefs = makeRootReplayRequirements(artifacts.retainedHistoryRow);
  const expectedRootReplayCount = rootReplayRequirementRefs.length;
  const missing = firstMissing({
    retainedRecordId,
    retainedRecordIdCount: retainedRecordIdSet.size,
    providerObjectRef,
    durableStreamCount: pathHistoryBinding.durable_stream_count,
    sourceRowId,
    nativeRootLedgerDetailRefs,
    causalRootReplayRefs,
    expectedRootReplayCount,
    sameRecordActionClosureRef,
    retainedWakeHistoryRef,
    acceptanceCertificateRef,
  });
  const artifactHash = stableHash({
    schema: SCHEMA,
    retainedRecordId,
    sourceRowId,
    seedArtifactHash: artifacts.seedArtifact?.artifact_hash ?? null,
    manifestSetHash: artifacts.manifestSet?.artifact_hash ?? null,
    retainedHistoryRowHash: artifacts.retainedHistoryRow?.artifact_hash ?? null,
    providerObjectHash: artifacts.providerObject?.artifact_hash ?? null,
    durableManifestRefs,
    nativeRootLedgerDetailRefs,
    causalRootReplayRefs,
    sameRecordActionClosureRef,
    retainedWakeHistoryRef,
    acceptanceCertificateRef,
  });
  const adapterId = `central_solver_retained_source_adapter:${artifactHash.slice(0, 16)}`;
  return {
    schema: SCHEMA,
    artifact_id: adapterId,
    artifact_hash: artifactHash,
    adapter_id: adapterId,
    accepted_retained_source_adapter_ref: null,
    retained_record_id: retainedRecordId,
    source_artifacts: {
      held_release_seed_path_rows: {
        consumed_schema: artifacts.seedArtifact?.schema ?? null,
        consumed_artifact_id: artifacts.seedArtifact?.artifact_id ?? null,
        consumed_artifact_hash: artifacts.seedArtifact?.artifact_hash ?? null,
        source_status: artifacts.seedArtifact?.source_status ?? null,
      },
      held_release_path_history_stream_manifest_set: {
        consumed_schema: artifacts.manifestSet?.schema ?? null,
        consumed_artifact_id: artifacts.manifestSet?.artifact_id ?? null,
        consumed_artifact_hash: artifacts.manifestSet?.artifact_hash ?? null,
        source_status: artifacts.manifestSet?.source_status ?? null,
      },
      central_solver_retained_history_row: {
        consumed_schema: artifacts.retainedHistoryRow?.schema ?? null,
        consumed_row_id: artifacts.retainedHistoryRow?.row_id ?? null,
        consumed_artifact_hash: artifacts.retainedHistoryRow?.artifact_hash ?? null,
        source_status: artifacts.retainedHistoryRow?.source_status ?? null,
      },
      central_solver_retained_history_provider_object: {
        consumed_schema: artifacts.providerObject?.schema ?? null,
        consumed_artifact_id: artifacts.providerObject?.artifact_id ?? null,
        consumed_artifact_hash: artifacts.providerObject?.artifact_hash ?? null,
        source_status: artifacts.providerObject?.source_status ?? null,
      },
    },
    same_record_binding: {
      required: true,
      retained_record_id: retainedRecordId,
      retained_record_id_count: retainedRecordIdSet.size,
      source_row_id: sourceRowId,
      provider_object_ref: providerObjectRef,
      status:
        retainedRecordId != null && providerObjectRef != null && sourceRowId != null
          ? "retained_record_provider_and_source_row_bound_unaccepted"
          : "same_record_binding_incomplete",
      first_missing_field:
        retainedRecordId == null
          ? FIRST_MISSING_FIELD
          : providerObjectRef == null
            ? PROVIDER_OBJECT_REF_FIELD
            : sourceRowId == null
              ? SOURCE_ROW_ID_FIELD
              : ROOT_LEDGER_DETAIL_REFS_FIELD,
    },
    path_history_binding: pathHistoryBinding,
    root_ledger_binding: {
      required: true,
      native_layout: ROOT_LEDGER_DETAIL_LAYOUT,
      required_root_replay_count: expectedRootReplayCount,
      requirement_refs: rootReplayRequirementRefs,
      native_root_ledger_detail_ref_count: nativeRootLedgerDetailRefs.length,
      causal_root_replay_ref_count: causalRootReplayRefs.length,
      status:
        nativeRootLedgerDetailRefs.length === expectedRootReplayCount &&
        causalRootReplayRefs.length === expectedRootReplayCount
          ? "native_root_ledger_detail_and_replay_refs_present_unaccepted"
          : "native_root_ledger_detail_or_replay_refs_missing",
    },
    native_root_ledger_detail_refs: nativeRootLedgerDetailRefs,
    causal_root_replay_refs: causalRootReplayRefs,
    same_record_action_closure_ref: sameRecordActionClosureRef,
    retained_wake_history_ref: retainedWakeHistoryRef,
    provider_provenance: {
      required: true,
      provider_object_ref: providerObjectRef,
      provider_artifact_hash: artifacts.providerObject?.artifact_hash ?? null,
      adapter_artifact_hash: artifactHash,
      status: providerObjectRef == null ? "missing_provider_object_ref" : "provider_object_ref_present_unaccepted",
      first_missing_field: providerObjectRef == null ? PROVIDER_OBJECT_REF_FIELD : missing.first_missing_field,
    },
    acceptance_certificate_ref: acceptanceCertificateRef,
    artifact_status: missing.artifact_status,
    source_status:
      missing.evidence_reason === "producer_does_not_authorize_accepted_retained_source_adapter_evidence"
        ? "candidate_retained_source_adapter_unaccepted"
        : "source_acquisition_blocked",
    first_missing_object: missing.first_missing_object,
    first_missing_field: missing.first_missing_field,
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
}

export function validateCentralSolverRetainedSourceAdapter(artifact) {
  const errors = [];
  const candidateAdapter = artifact?.source_status === "candidate_retained_source_adapter_unaccepted";
  if (artifact?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (artifact?.accepted_retained_source_adapter_ref !== null) {
    errors.push("accepted_retained_source_adapter_ref must remain null");
  }
  if (!candidateAdapter && artifact?.first_missing_field === ACCEPTANCE_CERTIFICATE_FIELD) {
    errors.push("only a fully populated candidate adapter may point to the missing acceptance certificate");
  }
  if (candidateAdapter && artifact?.first_missing_field !== ACCEPTANCE_CERTIFICATE_FIELD) {
    errors.push("candidate adapter must remain blocked at acceptance certificate");
  }
  if (candidateAdapter && artifact?.same_record_binding?.retained_record_id == null) {
    errors.push("candidate adapter must bind a retained record id");
  }
  if (candidateAdapter && artifact?.same_record_binding?.source_row_id == null) {
    errors.push("candidate adapter must bind a source row id");
  }
  if (candidateAdapter && artifact?.provider_provenance?.provider_object_ref == null) {
    errors.push("candidate adapter must carry provider provenance");
  }
  if (candidateAdapter && artifact?.path_history_binding?.durable_stream_count !== 6) {
    errors.push("candidate adapter must carry six durable path-history stream refs");
  }
  if (
    candidateAdapter &&
    artifact?.root_ledger_binding?.native_root_ledger_detail_ref_count !==
      artifact?.root_ledger_binding?.required_root_replay_count
  ) {
    errors.push("candidate adapter must carry all native root-ledger detail refs");
  }
  if (
    candidateAdapter &&
    artifact?.root_ledger_binding?.causal_root_replay_ref_count !==
      artifact?.root_ledger_binding?.required_root_replay_count
  ) {
    errors.push("candidate adapter must carry all causal-root replay refs");
  }
  if (candidateAdapter && artifact?.same_record_action_closure_ref == null) {
    errors.push("candidate adapter must carry same-record action closure ref");
  }
  if (candidateAdapter && artifact?.retained_wake_history_ref == null) {
    errors.push("candidate adapter must carry retained wake-history ref");
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
    const result = evaluateCentralSolverRetainedSourceAdapterEvidence({ evidence_class: evidenceClass });
    if (result.accepted || result.reason !== reason) {
      errors.push(`${evidenceClass} negative control must reject as ${reason}`);
    }
  }
  return errors;
}

function runCli() {
  const artifact = buildCentralSolverRetainedSourceAdapter();
  const errors = validateCentralSolverRetainedSourceAdapter(artifact);
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
