import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

import {
  FIRST_MISSING_FIELD as ADAPTER_FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT as ADAPTER_FIRST_MISSING_OBJECT,
  SCHEMA as ADAPTER_SCHEMA,
  buildCentralSolverRetainedSourceAdapter,
  evaluateCentralSolverRetainedSourceAdapterEvidence,
  validateCentralSolverRetainedSourceAdapter,
} from "./central-solver-retained-source-adapter.mjs";

export const SCHEMA = "central_solver_retained_history_provider_source_carrier.v0";
export const FIRST_MISSING_OBJECT = ADAPTER_FIRST_MISSING_OBJECT;
export const FIRST_MISSING_FIELD = ADAPTER_FIRST_MISSING_FIELD;

const ACCEPTANCE_CERTIFICATE_FIELD =
  "central_solver_retained_source_adapter.acceptance_certificate_ref";
const EXTERNAL_VERIFICATION_FIELD =
  "central_solver_retained_source_adapter.external_accepted_authority_verification_ref";

const PATH_HISTORY_LAYOUT = "path_segment.v1";
const PATH_HISTORY_STREAM_SCHEMA = "solver-path-history-stream.v1";
const PATH_HISTORY_NATIVE_FILE_MANIFEST_SCHEMA = "solver-native-file-stream-manifest.v1";
const ROOT_LEDGER_LAYOUT = "root_ledger_detail.v1";

const NATIVE_PATH_HISTORY_PROVENANCE_SCHEMA =
  "native_app_path_history_stream_provenance.v0";
const NATIVE_ROOT_LEDGER_PROVENANCE_SCHEMA =
  "native_app_root_ledger_detail_provenance.v0";

const AUTHORIZATION_FLAGS = Object.freeze([
  "accepted_same_record_evidence",
  "central_solver_retained_history_provider_source_carrier",
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
  fixture: "fixture_not_accepted_retained_history_provider_source_carrier_evidence",
  diagnostic: "diagnostic_not_accepted_retained_history_provider_source_carrier_evidence",
  priority_prose: "priority_prose_not_accepted_retained_history_provider_source_carrier_evidence",
  generated_decoy: "generated_decoy_not_accepted_retained_history_provider_source_carrier_evidence",
  proxy_row: "proxy_row_not_accepted_retained_history_provider_source_carrier_evidence",
  candidate_ref: "candidate_ref_not_accepted_retained_history_provider_source_carrier_evidence",
  aggregate_row: "aggregate_row_not_same_record_retained_history_provider_source_carrier_evidence",
  generic_path_history_stream_without_same_record_binding:
    "generic_path_history_stream_without_same_record_binding_not_provider_source_carrier_evidence",
  generic_root_ledger_detail_without_retained_record:
    "generic_root_ledger_detail_without_retained_record_not_provider_source_carrier_evidence",
  generic_stream_provider_metadata_without_same_record_binding:
    "generic_stream_provider_metadata_without_same_record_binding_not_provider_source_carrier_evidence",
  root_ledger_without_retained_record:
    "root_ledger_without_retained_record_not_provider_source_carrier_evidence",
  source_contract_shell: "source_contract_shell_not_accepted_retained_history_provider_source_carrier_evidence",
  earlier_fail_closed_adapter_row:
    "earlier_fail_closed_adapter_row_not_accepted_retained_history_provider_source_carrier_evidence",
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

function formatRefPart(value) {
  return String(value ?? "missing")
    .replaceAll("+", "plus")
    .replaceAll("-", "minus")
    .replaceAll(":", "_")
    .replaceAll(".", "_")
    .replaceAll("/", "_");
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function makeCandidateRefs({ prefix, retainedRecordId, sourceRowId, count }) {
  const retainedPart = formatRefPart(retainedRecordId);
  const sourcePart = sourceRowId == null ? null : formatRefPart(sourceRowId);
  return Array.from({ length: count }, (_, index) =>
    sourcePart == null
      ? `${prefix}:${retainedPart}:${index}`
      : `${prefix}:${retainedPart}:${sourcePart}:${index}`
  );
}

function normalizeOrMakeRefs({ refs, prefix, retainedRecordId, sourceRowId, count, enabled }) {
  const normalized = normalizeRefs(refs);
  if (normalized.length > 0 || !enabled) {
    return normalized;
  }
  if (retainedRecordId == null) {
    return [];
  }
  return makeCandidateRefs({ prefix, retainedRecordId, sourceRowId, count });
}

function makeCandidateSingletonRef(prefix, retainedRecordId, sourceRowId) {
  if (retainedRecordId == null || sourceRowId == null) {
    return null;
  }
  return `${prefix}:${formatRefPart(retainedRecordId)}:${formatRefPart(sourceRowId)}`;
}

function makePathHistoryProvenance({
  retainedRecordId,
  sourceRowId,
  adapter,
  durableManifestRefs,
}) {
  const durableCount = durableManifestRefs.length;
  return {
    schema: NATIVE_PATH_HISTORY_PROVENANCE_SCHEMA,
    required: true,
    source_surfaces: [
      {
        path: "src/solver/app/SolverAppBridge.mjs",
        producer: "createPathHistoryStreamF64",
        response_schema: PATH_HISTORY_STREAM_SCHEMA,
        local_manifest_schema: PATH_HISTORY_NATIVE_FILE_MANIFEST_SCHEMA,
      },
      {
        path: "src/solver/include/architrino/solver/PathHistoryStream.hpp",
        native_struct: "PathHistoryRowF64",
        layout: PATH_HISTORY_LAYOUT,
      },
    ],
    retained_record_id: retainedRecordId,
    source_row_id: sourceRowId,
    seed_path_row_count: adapter.path_history_binding?.seed_path_row_count ?? 0,
    stream_manifest_count: adapter.path_history_binding?.stream_manifest_count ?? 0,
    durable_stream_manifest_refs: durableManifestRefs,
    durable_stream_count: durableCount,
    path_keys: adapter.path_history_binding?.path_keys ?? [],
    seed_path_row_refs: adapter.path_history_binding?.seed_path_row_refs ?? [],
    stream_manifest_refs: adapter.path_history_binding?.stream_manifest_refs ?? [],
    status:
      retainedRecordId == null
        ? "missing_retained_record_id"
        : durableCount === 6
          ? "candidate_native_app_path_history_streams_bound_unaccepted"
          : "native_app_path_history_stream_refs_missing",
    first_missing_field:
      retainedRecordId == null
        ? FIRST_MISSING_FIELD
        : durableCount === 6
          ? adapter.first_missing_field
          : "central_solver_retained_source_adapter.path_history_binding.durable_stream_manifest_refs",
  };
}

function makeRootLedgerProvenance({
  retainedRecordId,
  sourceRowId,
  adapter,
  nativeRootLedgerDetailRefs,
  causalRootReplayRefs,
}) {
  const requiredRootReplayCount = adapter.root_ledger_binding?.required_root_replay_count ?? 0;
  const rootDetailCount = nativeRootLedgerDetailRefs.length;
  const replayCount = causalRootReplayRefs.length;
  return {
    schema: NATIVE_ROOT_LEDGER_PROVENANCE_SCHEMA,
    required: true,
    source_surfaces: [
      {
        path: "src/solver/app/SolverAppBridge.mjs",
        producer: "buildRootLedgerDetailF64WithModule",
        buffer_layout: ROOT_LEDGER_LAYOUT,
      },
      {
        path: "src/solver/include/architrino/solver/RootLedger.hpp",
        native_struct: "RootLedgerDetailRowF64",
        layout: ROOT_LEDGER_LAYOUT,
      },
    ],
    retained_record_id: retainedRecordId,
    source_row_id: sourceRowId,
    required_root_replay_count: requiredRootReplayCount,
    requirement_refs: adapter.root_ledger_binding?.requirement_refs ?? [],
    native_root_ledger_detail_refs: nativeRootLedgerDetailRefs,
    native_root_ledger_detail_ref_count: rootDetailCount,
    causal_root_replay_refs: causalRootReplayRefs,
    causal_root_replay_ref_count: replayCount,
    status:
      retainedRecordId != null &&
      sourceRowId != null &&
      rootDetailCount === requiredRootReplayCount &&
      replayCount === requiredRootReplayCount
        ? "candidate_native_app_root_ledger_detail_and_replay_bound_unaccepted"
        : "native_app_root_ledger_detail_or_replay_refs_missing",
    first_missing_field:
      retainedRecordId == null
        ? FIRST_MISSING_FIELD
        : sourceRowId == null
          ? "central_solver_retained_source_adapter.same_record_binding.source_row_id"
          : rootDetailCount !== requiredRootReplayCount
            ? "central_solver_retained_source_adapter.native_root_ledger_detail_refs"
            : replayCount !== requiredRootReplayCount
              ? "central_solver_retained_source_adapter.causal_root_replay_refs"
              : adapter.first_missing_field,
  };
}

function makeCarrierStatus(adapterStatus) {
  if (adapterStatus === "retained_source_adapter_present_acceptance_blocked") {
    return "retained_history_provider_source_carrier_present_acceptance_blocked";
  }
  if (adapterStatus === "retained_source_adapter_declared_certificate_external_verification_required") {
    return "retained_history_provider_source_carrier_declared_certificate_external_verification_required";
  }
  return adapterStatus;
}

function makeCarrierSourceStatus(adapter) {
  return adapter.source_status === "candidate_retained_source_adapter_unaccepted"
    ? "candidate_retained_history_provider_source_carrier_unaccepted"
    : "source_acquisition_blocked";
}

function makeAdapterOptions(options, refs) {
  return {
    ...(options.adapterOptions ?? {}),
    retainedRecordId: refs.retainedRecordId,
    sourceRowId: refs.sourceRowId,
    durableManifestRefs: refs.durableManifestRefs,
    nativeRootLedgerDetailRefs: refs.nativeRootLedgerDetailRefs,
    causalRootReplayRefs: refs.causalRootReplayRefs,
    sameRecordActionClosureRef: refs.sameRecordActionClosureRef,
    retainedWakeHistoryRef: refs.retainedWakeHistoryRef,
    acceptanceCertificateRef: refs.acceptanceCertificateRef,
    providerObjectRef: options.providerObjectRef,
    providerArtifactHash: options.providerArtifactHash,
    seedPathRowOptions: options.seedPathRowOptions,
    retainedHistoryRowOptions: options.retainedHistoryRowOptions,
  };
}

function resolveRefs(options = {}) {
  const retainedRecordId = normalizeStringRef(options.retainedRecordId);
  const sourceRowId = normalizeStringRef(options.sourceRowId);
  const autoBind = options.autoBindNativeAppProvenance !== false;
  const durableManifestRefs = normalizeOrMakeRefs({
    refs: options.durableManifestRefs,
    prefix: "candidate:native-app:path-history-stream-manifest",
    retainedRecordId,
    sourceRowId: null,
    count: 6,
    enabled: autoBind,
  });
  const probeAdapter = buildCentralSolverRetainedSourceAdapter(
    makeAdapterOptions(options, {
      retainedRecordId,
      sourceRowId,
      durableManifestRefs,
      nativeRootLedgerDetailRefs: [],
      causalRootReplayRefs: [],
      sameRecordActionClosureRef: null,
      retainedWakeHistoryRef: null,
      acceptanceCertificateRef: null,
    })
  );
  const requiredRootReplayCount = probeAdapter.root_ledger_binding?.required_root_replay_count ?? 0;
  const canBindRootLedger = retainedRecordId != null && sourceRowId != null;
  const nativeRootLedgerDetailRefs = normalizeOrMakeRefs({
    refs: options.nativeRootLedgerDetailRefs,
    prefix: "candidate:native-app:root-ledger-detail",
    retainedRecordId,
    sourceRowId,
    count: requiredRootReplayCount,
    enabled: autoBind && canBindRootLedger,
  });
  const causalRootReplayRefs = normalizeOrMakeRefs({
    refs: options.causalRootReplayRefs,
    prefix: "candidate:native-app:causal-root-replay",
    retainedRecordId,
    sourceRowId,
    count: requiredRootReplayCount,
    enabled: autoBind && canBindRootLedger,
  });
  const sameRecordActionClosureRef =
    normalizeStringRef(options.sameRecordActionClosureRef) ??
    (autoBind
      ? makeCandidateSingletonRef("candidate:native-app:same-record-action-closure", retainedRecordId, sourceRowId)
      : null);
  const retainedWakeHistoryRef =
    normalizeStringRef(options.retainedWakeHistoryRef) ??
    (autoBind
      ? makeCandidateSingletonRef("candidate:native-app:retained-wake-history", retainedRecordId, sourceRowId)
      : null);
  return {
    retainedRecordId,
    sourceRowId,
    durableManifestRefs,
    nativeRootLedgerDetailRefs,
    causalRootReplayRefs,
    sameRecordActionClosureRef,
    retainedWakeHistoryRef,
    acceptanceCertificateRef: normalizeStringRef(options.acceptanceCertificateRef),
  };
}

export function evaluateCentralSolverRetainedHistoryProviderSourceCarrierEvidence(candidate = {}) {
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
      reason: "schema_not_central_solver_retained_history_provider_source_carrier_v0",
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
  if (!Array.isArray(candidate.native_app_path_history_provenance?.durable_stream_manifest_refs) ||
    candidate.native_app_path_history_provenance.durable_stream_manifest_refs.length !== 6) {
    return {
      accepted: false,
      reason: "native_app_path_history_stream_manifest_refs_missing",
      first_missing_field:
        "central_solver_retained_source_adapter.path_history_binding.durable_stream_manifest_refs",
    };
  }
  if (candidate.same_record_binding?.source_row_id == null) {
    return {
      accepted: false,
      reason: "source_row_id_missing",
      first_missing_field: "central_solver_retained_source_adapter.same_record_binding.source_row_id",
    };
  }
  const requiredRootReplayCount =
    candidate.native_app_root_ledger_provenance?.required_root_replay_count ??
    candidate.central_solver_retained_source_adapter?.root_ledger_binding?.required_root_replay_count ??
    0;
  if (
    !Array.isArray(candidate.native_app_root_ledger_provenance?.native_root_ledger_detail_refs) ||
    candidate.native_app_root_ledger_provenance.native_root_ledger_detail_refs.length !== requiredRootReplayCount
  ) {
    return {
      accepted: false,
      reason: "native_app_root_ledger_detail_refs_missing",
      first_missing_field: "central_solver_retained_source_adapter.native_root_ledger_detail_refs",
    };
  }
  if (
    !Array.isArray(candidate.native_app_root_ledger_provenance?.causal_root_replay_refs) ||
    candidate.native_app_root_ledger_provenance.causal_root_replay_refs.length !== requiredRootReplayCount
  ) {
    return {
      accepted: false,
      reason: "causal_root_replay_refs_missing",
      first_missing_field: "central_solver_retained_source_adapter.causal_root_replay_refs",
    };
  }
  const adapterEvaluation = evaluateCentralSolverRetainedSourceAdapterEvidence(
    candidate.central_solver_retained_source_adapter ?? {}
  );
  if (adapterEvaluation.reason !== "producer_does_not_authorize_accepted_retained_source_adapter_evidence") {
    return adapterEvaluation;
  }
  if (candidate.acceptance_certificate_ref == null) {
    return {
      accepted: false,
      reason: "producer_does_not_authorize_accepted_retained_history_provider_source_carrier_evidence",
      first_missing_field: ACCEPTANCE_CERTIFICATE_FIELD,
    };
  }
  return {
    accepted: false,
    reason: "external_accepted_authority_verification_missing",
    first_missing_field: EXTERNAL_VERIFICATION_FIELD,
  };
}

export function buildCentralSolverRetainedHistoryProviderSourceCarrier(options = {}) {
  const refs = resolveRefs(options);
  const adapter = buildCentralSolverRetainedSourceAdapter(makeAdapterOptions(options, refs));
  const adapterEvaluation = evaluateCentralSolverRetainedSourceAdapterEvidence(adapter);
  const pathHistoryProvenance = makePathHistoryProvenance({
    retainedRecordId: refs.retainedRecordId,
    sourceRowId: refs.sourceRowId,
    adapter,
    durableManifestRefs: refs.durableManifestRefs,
  });
  const rootLedgerProvenance = makeRootLedgerProvenance({
    retainedRecordId: refs.retainedRecordId,
    sourceRowId: refs.sourceRowId,
    adapter,
    nativeRootLedgerDetailRefs: refs.nativeRootLedgerDetailRefs,
    causalRootReplayRefs: refs.causalRootReplayRefs,
  });
  const artifactHash = stableHash({
    schema: SCHEMA,
    retainedRecordId: refs.retainedRecordId,
    sourceRowId: refs.sourceRowId,
    adapterArtifactHash: adapter.artifact_hash,
    pathHistoryProvenance,
    rootLedgerProvenance,
    sameRecordActionClosureRef: refs.sameRecordActionClosureRef,
    retainedWakeHistoryRef: refs.retainedWakeHistoryRef,
    acceptanceCertificateRef: refs.acceptanceCertificateRef,
  });
  const carrierId = `central_solver_retained_history_provider_source_carrier:${artifactHash.slice(0, 16)}`;
  const providerObjectRef = adapter.provider_provenance?.provider_object_ref ?? null;
  const artifact = {
    schema: SCHEMA,
    artifact_id: carrierId,
    artifact_hash: artifactHash,
    carrier_id: carrierId,
    retained_record_id: refs.retainedRecordId,
    source_row_id: refs.sourceRowId,
    accepted_retained_history_provider_source_carrier_ref: null,
    same_record_binding: {
      required: true,
      retained_record_id: refs.retainedRecordId,
      source_row_id: refs.sourceRowId,
      provider_object_ref: providerObjectRef,
      retained_source_adapter_id: adapter.adapter_id,
      status:
        refs.retainedRecordId != null && refs.sourceRowId != null && providerObjectRef != null
          ? "retained_record_source_row_and_provider_object_bound_unaccepted"
          : "same_record_binding_incomplete",
      first_missing_field: adapter.same_record_binding?.first_missing_field ?? adapter.first_missing_field,
    },
    native_app_path_history_provenance: pathHistoryProvenance,
    native_app_root_ledger_provenance: rootLedgerProvenance,
    same_record_action_closure_ref: refs.sameRecordActionClosureRef,
    retained_wake_history_ref: refs.retainedWakeHistoryRef,
    central_solver_retained_source_adapter: adapter,
    adapter_evidence_evaluation: adapterEvaluation,
    acceptance_certificate_ref: refs.acceptanceCertificateRef,
    artifact_status: makeCarrierStatus(adapter.artifact_status),
    adapter_artifact_status: adapter.artifact_status,
    source_status: makeCarrierSourceStatus(adapter),
    first_missing_object: adapter.first_missing_object,
    first_missing_field: adapter.first_missing_field,
    evidence_evaluation: {
      accepted: false,
      reason:
        adapter.first_missing_field === ACCEPTANCE_CERTIFICATE_FIELD
          ? "producer_does_not_authorize_accepted_retained_history_provider_source_carrier_evidence"
          : adapter.evidence_evaluation?.reason ?? adapterEvaluation.reason,
      first_missing_field: adapter.first_missing_field,
    },
    authorization: makeAuthorization(),
    negative_controls: Object.entries(NEGATIVE_CONTROL_REASONS).map(([evidence_class, reason]) => ({
      evidence_class,
      accepted: false,
      reason,
    })),
  };
  artifact.evidence_evaluation =
    evaluateCentralSolverRetainedHistoryProviderSourceCarrierEvidence(artifact);
  return artifact;
}

export function validateCentralSolverRetainedHistoryProviderSourceCarrier(artifact) {
  const errors = [];
  if (artifact?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (artifact?.accepted_retained_history_provider_source_carrier_ref !== null) {
    errors.push("accepted_retained_history_provider_source_carrier_ref must remain null");
  }
  if (artifact?.central_solver_retained_source_adapter?.schema !== ADAPTER_SCHEMA) {
    errors.push(`central_solver_retained_source_adapter must carry ${ADAPTER_SCHEMA}`);
  } else {
    errors.push(...validateCentralSolverRetainedSourceAdapter(artifact.central_solver_retained_source_adapter));
  }
  if (artifact?.native_app_path_history_provenance?.schema !== NATIVE_PATH_HISTORY_PROVENANCE_SCHEMA) {
    errors.push(`native_app_path_history_provenance must carry ${NATIVE_PATH_HISTORY_PROVENANCE_SCHEMA}`);
  }
  if (artifact?.native_app_root_ledger_provenance?.schema !== NATIVE_ROOT_LEDGER_PROVENANCE_SCHEMA) {
    errors.push(`native_app_root_ledger_provenance must carry ${NATIVE_ROOT_LEDGER_PROVENANCE_SCHEMA}`);
  }
  if (
    artifact?.source_status === "candidate_retained_history_provider_source_carrier_unaccepted" &&
    artifact?.first_missing_field !== ACCEPTANCE_CERTIFICATE_FIELD
  ) {
    errors.push("candidate provider/source carrier must remain blocked at adapter acceptance certificate");
  }
  if (
    artifact?.source_status === "candidate_retained_history_provider_source_carrier_unaccepted" &&
    artifact?.same_record_binding?.retained_record_id == null
  ) {
    errors.push("candidate provider/source carrier must bind a retained record id");
  }
  if (
    artifact?.source_status === "candidate_retained_history_provider_source_carrier_unaccepted" &&
    artifact?.same_record_binding?.source_row_id == null
  ) {
    errors.push("candidate provider/source carrier must bind a source row id");
  }
  if (
    artifact?.source_status === "candidate_retained_history_provider_source_carrier_unaccepted" &&
    artifact?.native_app_path_history_provenance?.durable_stream_count !== 6
  ) {
    errors.push("candidate provider/source carrier must carry six native/app path-history stream manifest refs");
  }
  if (
    artifact?.source_status === "candidate_retained_history_provider_source_carrier_unaccepted" &&
    artifact?.native_app_root_ledger_provenance?.native_root_ledger_detail_ref_count !==
      artifact?.native_app_root_ledger_provenance?.required_root_replay_count
  ) {
    errors.push("candidate provider/source carrier must carry all native/app root-ledger detail refs");
  }
  if (
    artifact?.source_status === "candidate_retained_history_provider_source_carrier_unaccepted" &&
    artifact?.native_app_root_ledger_provenance?.causal_root_replay_ref_count !==
      artifact?.native_app_root_ledger_provenance?.required_root_replay_count
  ) {
    errors.push("candidate provider/source carrier must carry all causal-root replay refs");
  }
  const evidence = evaluateCentralSolverRetainedHistoryProviderSourceCarrierEvidence(artifact ?? {});
  if (artifact?.evidence_evaluation?.accepted !== evidence.accepted ||
    artifact?.evidence_evaluation?.reason !== evidence.reason ||
    artifact?.evidence_evaluation?.first_missing_field !== evidence.first_missing_field) {
    errors.push("evidence_evaluation must match provider/source carrier evaluator");
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
    const result = evaluateCentralSolverRetainedHistoryProviderSourceCarrierEvidence({
      evidence_class: evidenceClass,
    });
    if (result.accepted || result.reason !== reason) {
      errors.push(`${evidenceClass} negative control must reject as ${reason}`);
    }
  }
  return errors;
}

function cliStringOption(name) {
  return process.argv.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3) ?? null;
}

function runCli() {
  const artifact = buildCentralSolverRetainedHistoryProviderSourceCarrier({
    retainedRecordId: cliStringOption("retained-record-id"),
    sourceRowId: cliStringOption("source-row-id"),
    acceptanceCertificateRef: cliStringOption("acceptance-certificate-ref"),
    autoBindNativeAppProvenance: !process.argv.includes("--no-auto-bind-native-app-provenance"),
  });
  const errors = validateCentralSolverRetainedHistoryProviderSourceCarrier(artifact);
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
