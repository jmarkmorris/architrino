#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const SCHEMA = "field_speed_action_self_hit_scan_source_candidate_intake_report/v0";
const SOURCE_FAMILY_DELTA_SCOUT_SCHEMA =
  "field_speed_action_self_hit_scan_source_family_delta_scout/v0";
const NEAREST_CANDIDATE_READINESS_AUDIT_SCHEMA =
  "field_speed_action_self_hit_scan_nearest_candidate_provenance_readiness_audit/v0";
const SOURCE_BINDING_ABSENCE_RECORD_SCHEMA =
  "field_speed_action_self_hit_scan_source_binding_absence_record/v0";
const RETAINED_ACTIVE_ROW_EVIDENCE_OBJECT_SCHEMA =
  "torque_wake_retained_active_row_branch_certificate_evidence_object/v0";
const RANK2_FEED = "rank2_field_speed_action_self_hit_scan";

const DEFAULT_CANDIDATE_PATHS = [
  "scripts/nested-shell-braid/fixtures/action-increment-packet",
  "scripts/nested-shell-braid/fixtures/action-increment-source-contract-rank2-transition-source-attempt.json",
  "scripts/nested-shell-braid/fixtures/action-increment-source-contract-blocked.json",
  "scripts/solver-audits/fixtures/branch-provider-current-candidates.json",
];
const TORQUE_WAKE_DIAGNOSTIC_PATH =
  "scripts/nested-shell-braid/fixtures/torque-wake-same-row-diagnostic-priority-target.json";
const MOVING_BRANCH_STATUS_PATH =
  "scripts/nested-shell-braid/fixtures/moving-retained-branch-certificate-current-status.json";
const MOVING_BRANCH_PARTIAL_SCOUT_PATH =
  "scripts/nested-shell-braid/fixtures/moving-retained-branch-certificate-partial-same-record-identity-scout.json";
const MOVING_BRANCH_PROXY_NEGATIVE_CONTROL_PATH =
  "scripts/nested-shell-braid/fixtures/moving-retained-branch-certificate-branch-chart-proxy-negative-control.json";

const REQUIRED_SAME_RECORD_FIELDS = [
  "transition_source_ref",
  "action_increment_row_id",
  "branch_certificate_ref",
  "root_ledger_hash",
  "conservation_pullback_hash",
  "negative_control_ref",
];

const PROVIDER_REQUIRED_FIELDS = [
  "same_domain_record_ref",
  "branch_certificate_ref",
  "active_root_or_live_ledger_identity",
  "branch_local_projection_or_normalization_identity",
  "conservation_pullback_hash",
];
const DISALLOWED_ACCEPTED_REFERENCE_PREFIXES = [
  "priority-only:",
  "fixture:",
  "proxy:",
  "candidate:",
  "synthetic:",
];
const SAME_RECORD_IDENTITY_REQUIRED_FIELDS = [
  "same_record_identity.branch_label",
  "same_record_identity.extraction_window_id",
  "same_record_identity.active_root_ledger_hash",
  "same_record_identity.accepted_branch_chart_ref",
  "same_record_identity.separator_chart_ref",
  "same_record_identity.positive_gap_record_ref",
  "same_record_identity.memory_depth_record_ref",
  "same_record_identity.active_wave_vector_gap_ref",
];
const RETAINED_ACTIVE_ROW_TRANSITION_SOURCE_FIELDS = [
  "branch_certificate_ref",
  "retained_branch",
  "sampled_same_row_id_binding",
  "same_retained_active_row_ids",
  "accepted_branch_chart_ref",
  "moving_retained_branch_certificate_ref",
  ...SAME_RECORD_IDENTITY_REQUIRED_FIELDS,
  "accepted_transition_source_ref",
  "action_increment_row_id",
  "active_root_ledger_hash",
  "conservation_pullback_hash",
  "negative_control_ref",
];

const ACCEPTED_PACKET_PROMOTION_STATUSES = new Set([
  "accepted_transition_source",
  "accepted_non_fixture_source",
  "accepted-field-speed-transition-source",
]);
const ACCEPTED_SOURCE_STATUSES = new Set([
  "accepted_transition_source",
  "accepted_non_fixture_source",
]);

const MINIMUM_ACCEPTED_TRANSITION_SOURCE_OBJECT = {
  object_id: "non_fixture_branch_emitted_action_increment_transition_source",
  exact_row:
    "one accepted non-fixture action-increment row owned by a retained branch certificate",
  required_same_record_fields: REQUIRED_SAME_RECORD_FIELDS,
  current_closest_partial:
    "torque_wake_same_row_diagnostic:index-ratio:f2 supplies active_root_ledger_hash, conservation_pullback_hash, and negative_control_ref, but it is not retained and has no branch_certificate_ref or accepted transition_source_ref",
};

function parseArgs(argv) {
  const args = {
    candidatePaths: [],
    repoRoot: process.cwd(),
    out: null,
    validate: null,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--candidate") {
      args.candidatePaths.push(argv[++index]);
    } else if (arg === "--repo-root") {
      args.repoRoot = argv[++index];
    } else if (arg === "--out") {
      args.out = argv[++index];
    } else if (arg === "--validate") {
      args.validate = argv[++index];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/nested-shell-braid/field-speed-action-self-hit-scan-source-binding-candidate-intake-report.mjs [options]

Options:
  --candidate PATH   Candidate path to inspect. Repeatable. Defaults to the current rank-2 candidate pool.
  --repo-root PATH   Repository root used to resolve relative candidate paths.
  --out PATH         Write JSON output to a file instead of stdout.
  --validate PATH    Validate an emitted candidate intake report.
  --pretty           Pretty-print JSON output.
  --help             Show this help.

This emits a fail-closed rank-2 candidate-intake report. It enumerates current
candidate source surfaces for field_speed_action_self_hit_scan/v0 and rejects
fixtures, attempt-only contracts, proxy diagnostics, and target-only provider rows.
It does not authorize candidate_h_recovery.`);
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function readJson(filePath) {
  return JSON.parse(readText(filePath));
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === "\"") {
      if (inQuotes && next === "\"") {
        cell += "\"";
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(cell);
      if (row.some((entry) => entry.trim() !== "")) {
        rows.push(row);
      }
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell);
  if (row.some((entry) => entry.trim() !== "")) {
    rows.push(row);
  }
  if (rows.length === 0) {
    return [];
  }

  const headers = rows[0].map((header) => header.trim());
  return rows
    .slice(1)
    .filter((cells) => cells.some((entry) => entry.trim() !== "") && !cells[0].trim().startsWith("#"))
    .map((cells) =>
      Object.fromEntries(headers.map((header, index) => [header, (cells[index] ?? "").trim()]))
    );
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function present(value) {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === "string") {
    return value.trim() !== "";
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (isObject(value)) {
    return Object.keys(value).length > 0;
  }
  return true;
}

function stringArray(value) {
  return Array.isArray(value) ? value.filter((entry) => typeof entry === "string" && entry.trim() !== "") : [];
}

function sameOrderedStrings(left, right) {
  if (left.length !== right.length) {
    return false;
  }
  return left.every((value, index) => value === right[index]);
}

function nestedValue(source, dottedPath) {
  return dottedPath.split(".").reduce((value, key) => (isObject(value) ? value[key] : undefined), source);
}

function failureFieldName(field) {
  return field.replaceAll(".", "_");
}

function rejectedAcceptedReferenceCode(field, value) {
  const normalized = present(value) ? String(value).trim() : null;
  if (normalized === null) {
    return `${failureFieldName(field)}_missing`;
  }
  for (const prefix of DISALLOWED_ACCEPTED_REFERENCE_PREFIXES) {
    if (normalized.startsWith(prefix)) {
      return `${failureFieldName(field)}_${prefix.slice(0, -1).replaceAll("-", "_")}_not_accepted`;
    }
  }
  if (normalized.includes("synthetic")) {
    return `${failureFieldName(field)}_synthetic_not_accepted`;
  }
  if (normalized.includes(":fixture") || normalized.includes("fixture-")) {
    return `${failureFieldName(field)}_fixture_not_accepted`;
  }
  return null;
}

function normalizeStatus(value) {
  const status = String(value ?? "").trim().toLowerCase();
  return status === "accepted" || status === "accept" || status === "pass" ? "accepted" : "rejected";
}

function relativePath(repoRoot, targetPath) {
  return path.relative(repoRoot, targetPath).replaceAll(path.sep, "/");
}

function stableJson(value) {
  if (Array.isArray(value)) {
    return `[${value.map(stableJson).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function baseCandidate({ id, sourcePath, sourceKind, sourceStatus, firstFailure, missingFields, details = {} }) {
  return {
    id,
    source_path: sourcePath,
    source_kind: sourceKind,
    source_status: sourceStatus,
    verdict: firstFailure === null ? "accepted_transition_source_candidate" : "rejected",
    first_failure: firstFailure,
    missing_or_rejected_fields: missingFields,
    accepted_transition_source_ready: firstFailure === null,
    candidate_h_recovery_vote: "not_authorized",
    details,
  };
}

function inspectActionIncrementPacket(absPath, sourcePath) {
  const actionRowsPath = path.join(absPath, "action_increment_rows.csv");
  const clusterSummaryPath = path.join(absPath, "cluster_summary.json");
  const rows = fs.existsSync(actionRowsPath) ? parseCsv(readText(actionRowsPath)) : [];
  const clusterSummary = fs.existsSync(clusterSummaryPath) ? readJson(clusterSummaryPath) : {};
  const promotionStatus = clusterSummary.promotion_status ?? "unknown";
  const acceptedRows = rows.filter((row) => normalizeStatus(row.status) === "accepted");
  const selectedRow = acceptedRows[0] ?? rows[0] ?? null;
  const packetNegativeControlRef =
    clusterSummary.negative_control_ref ??
    selectedRow?.negative_control_ref ??
    (fs.existsSync(path.join(absPath, "negative_control_report.md"))
      ? `${sourcePath}/negative_control_report.md`
      : null);
  const rowRequiredFields = [
    ["action_increment_row_id", selectedRow?.id],
    ["branch_certificate_ref", selectedRow?.branch_certificate_ref],
    ["root_ledger_hash", selectedRow?.root_ledger_hash],
    ["conservation_pullback_hash", selectedRow?.conservation_pullback_hash],
    ["negative_control_ref", packetNegativeControlRef],
  ];
  const missingFields = [];

  if (!ACCEPTED_PACKET_PROMOTION_STATUSES.has(promotionStatus)) {
    missingFields.push("transition_source_ref");
  }
  if (acceptedRows.length === 0) {
    missingFields.push("action_increment_row_id");
  }
  for (const [field, value] of rowRequiredFields) {
    if (!present(value) && !missingFields.includes(field)) {
      missingFields.push(field);
    }
  }
  let firstFailure = null;
  if (promotionStatus === "fixture-shape-only") {
    firstFailure = "fixture_shape_only_packet_not_source";
  } else if (!ACCEPTED_PACKET_PROMOTION_STATUSES.has(promotionStatus)) {
    firstFailure = "transition_source_not_explicitly_accepted";
  } else if (acceptedRows.length === 0) {
    firstFailure = "accepted_action_increment_row_missing";
  } else if (missingFields.includes("branch_certificate_ref")) {
    firstFailure = "action_row_branch_certificate_ref_missing";
  } else if (missingFields.includes("root_ledger_hash")) {
    firstFailure = "action_row_root_ledger_hash_missing";
  } else if (missingFields.includes("conservation_pullback_hash")) {
    firstFailure = "action_row_conservation_pullback_hash_missing";
  } else if (missingFields.includes("negative_control_ref")) {
    firstFailure = "negative_control_ref_missing";
  }

  return baseCandidate({
    id: "action-increment-packet-current",
    sourcePath,
    sourceKind: "action_increment_packet_dir",
    sourceStatus: promotionStatus,
    firstFailure,
    missingFields,
    details: {
      accepted_action_increment_row_count: acceptedRows.length,
      selected_row_id: selectedRow?.id ?? null,
      selected_row_hash: selectedRow ? `sha256:${sha256(stableJson(selectedRow))}` : null,
      negative_control_ref: packetNegativeControlRef,
      required_same_record_fields: REQUIRED_SAME_RECORD_FIELDS,
    },
  });
}

function inspectActionIncrementSourceContract(absPath, sourcePath, source) {
  const acceptedSourceStatus = source.metadata?.accepted_transition_source_status ?? "unknown";
  const acceptedSourceRef = source.metadata?.accepted_transition_source_ref ?? null;
  const acceptedStates = Array.isArray(source.accepted_branch_states)
    ? source.accepted_branch_states.filter((state) =>
        [
          "accepted_history_segment",
          "accepted_tier1_continuation",
          "tier1_continuation_accepted",
        ].includes(state.status)
      )
    : [];
  const transitions = Array.isArray(source.transitions) ? source.transitions : [];
  const acceptedTransitions = transitions.filter((transition) =>
    present(transition.provenance?.accepted_transition_source)
  );
  const convergenceRows = Array.isArray(source.convergence?.rows) ? source.convergence.rows : [];
  const convergencePassCount = convergenceRows.filter((row) => row.status === "pass").length;
  const missingFields = [];

  if (!ACCEPTED_SOURCE_STATUSES.has(acceptedSourceStatus) || !present(acceptedSourceRef)) {
    missingFields.push("transition_source_ref");
  }
  if (acceptedStates.length < 2) {
    missingFields.push("accepted_branch_states");
  }
  if (acceptedTransitions.length === 0) {
    missingFields.push("accepted_transition_row");
  }
  if (convergencePassCount < 5) {
    missingFields.push("convergence_gates");
  }
  if (source.negative_control?.status !== "pass") {
    missingFields.push("negative_control_ref");
  }

  let firstFailure = null;
  if (!ACCEPTED_SOURCE_STATUSES.has(acceptedSourceStatus) || !present(acceptedSourceRef)) {
    firstFailure =
      acceptedSourceStatus === "absent_in_current_repo_pool"
        ? "accepted_transition_source_absent_in_current_repo_pool"
        : "accepted_transition_source_ref_missing";
  } else if (acceptedStates.length < 2) {
    firstFailure = "accepted_history_source_missing";
  } else if (acceptedTransitions.length === 0) {
    firstFailure = "accepted_transition_row_missing";
  } else if (convergencePassCount < 5) {
    firstFailure = "convergence_gates_not_passed";
  } else if (source.negative_control?.status !== "pass") {
    firstFailure = "negative_control_ref_missing";
  }

  return baseCandidate({
    id: path.basename(absPath, ".json"),
    sourcePath,
    sourceKind: "action_increment_source_contract_json",
    sourceStatus: acceptedSourceStatus,
    firstFailure,
    missingFields,
    details: {
      accepted_transition_source_ref: acceptedSourceRef,
      accepted_branch_state_count: acceptedStates.length,
      transition_count: transitions.length,
      accepted_transition_row_count: acceptedTransitions.length,
      convergence_pass_count: convergencePassCount,
    },
  });
}

function inspectBranchProviderManifest(absPath, sourcePath, manifest) {
  const rows = Array.isArray(manifest.candidates) ? manifest.candidates : [];
  const rank2Rows = rows.filter((candidate) => Array.isArray(candidate.feeds) && candidate.feeds.includes(RANK2_FEED));
  return rank2Rows.map((candidate) => {
    const missingFields = [];
    if (candidate.provider_source_status !== "accepted_non_fixture_source") {
      missingFields.push("provider_source_status");
    }
    for (const field of PROVIDER_REQUIRED_FIELDS) {
      if (!present(candidate[field])) {
        missingFields.push(field);
      }
    }

    let firstFailure = null;
    if (candidate.provider_source_status !== "accepted_non_fixture_source") {
      firstFailure = "accepted_non_fixture_source_missing";
    } else if (missingFields.includes("same_domain_record_ref")) {
      firstFailure = "same_domain_record_ref_missing";
    } else if (missingFields.includes("branch_certificate_ref")) {
      firstFailure = "branch_certificate_ref_missing";
    } else if (missingFields.includes("active_root_or_live_ledger_identity")) {
      firstFailure = "active_root_or_live_ledger_identity_missing";
    } else if (missingFields.includes("branch_local_projection_or_normalization_identity")) {
      firstFailure = "branch_local_projection_or_normalization_identity_missing";
    } else if (missingFields.includes("conservation_pullback_hash")) {
      firstFailure = "conservation_pullback_hash_missing";
    }

    return baseCandidate({
      id: candidate.id ?? "unnamed-branch-provider-candidate",
      sourcePath,
      sourceKind: "branch_provider_manifest_rank2_row",
      sourceStatus: candidate.provider_source_status ?? "unknown",
      firstFailure,
      missingFields,
      details: {
        source_ref: candidate.source_ref ?? null,
        feeds: candidate.feeds ?? [],
        claim_scope: candidate.claim_scope ?? null,
        required_provider_fields: PROVIDER_REQUIRED_FIELDS,
      },
    });
  });
}

function unique(values) {
  return [...new Set(values.filter((value) => present(value)).map((value) => String(value)))];
}

function missingToFailureCode(field) {
  if (field === "transition_source_ref") {
    return "transition_source_ref_missing";
  }
  if (field === "accepted_transition_source") {
    return "source_row_binding_open";
  }
  return `${field}_missing`;
}

function sourceFamilyRow({
  id,
  sourceFamily,
  sourcePaths,
  candidateIds = [],
  presentFields = [],
  missingOrRejectedFields = [],
  firstFailure = null,
  smallestPositiveObject,
  details = {},
}) {
  return {
    id,
    source_family: sourceFamily,
    source_paths: sourcePaths,
    related_candidate_ids: candidateIds,
    verdict: firstFailure === null ? "accepted_transition_source_family" : "rejected",
    accepted_transition_source_family_ready: firstFailure === null,
    first_failure: firstFailure,
    present_fields: unique(presentFields),
    missing_or_rejected_fields: unique(missingOrRejectedFields),
    smallest_positive_object: smallestPositiveObject,
    candidate_h_recovery_vote: "not_authorized",
    details,
  };
}

function candidateById(candidates, id) {
  return candidates.find((candidate) => candidate.id === id) ?? null;
}

function candidatesByKind(candidates, sourceKind) {
  return candidates.filter((candidate) => candidate.source_kind === sourceKind);
}

function buildActionIncrementPacketFamily(candidates) {
  const packet = candidateById(candidates, "action-increment-packet-current");
  return sourceFamilyRow({
    id: "action_increment_packet_family",
    sourceFamily: "action_increment_packet",
    sourcePaths: [packet?.source_path ?? DEFAULT_CANDIDATE_PATHS[0]],
    candidateIds: packet ? [packet.id] : [],
    presentFields: [
      packet?.details?.accepted_action_increment_row_count > 0 ? "fixture_action_increment_row_id" : null,
      packet?.details?.negative_control_ref ? "fixture_negative_control_ref" : null,
    ],
    missingOrRejectedFields:
      packet?.missing_or_rejected_fields ?? [
        "transition_source_ref",
        "action_increment_row_id",
        "branch_certificate_ref",
        "root_ledger_hash",
        "conservation_pullback_hash",
        "negative_control_ref",
      ],
    firstFailure: packet?.first_failure ?? "candidate_path_missing",
    smallestPositiveObject:
      "replace the fixture-shape-only packet with a branch-emitted non-fixture action-increment packet carrying the required same-record fields",
    details: {
      selected_row_id: packet?.details?.selected_row_id ?? null,
      selected_row_hash: packet?.details?.selected_row_hash ?? null,
      source_status: packet?.source_status ?? null,
    },
  });
}

function buildSourceContractFamily(candidates) {
  const contracts = candidatesByKind(candidates, "action_increment_source_contract_json");
  const missing = unique(contracts.flatMap((candidate) => candidate.missing_or_rejected_fields ?? []));
  const firstFailure = contracts.find((candidate) => candidate.first_failure)?.first_failure ?? "candidate_path_missing";
  return sourceFamilyRow({
    id: "action_increment_source_contract_family",
    sourceFamily: "action_increment_source_contract",
    sourcePaths: contracts.map((candidate) => candidate.source_path),
    candidateIds: contracts.map((candidate) => candidate.id),
    presentFields: contracts.some((candidate) => candidate.details?.transition_count > 0)
      ? ["transition_shell"]
      : [],
    missingOrRejectedFields: missing,
    firstFailure,
    smallestPositiveObject:
      "fill the source contract with a real accepted_transition_source_ref, at least two accepted branch states, an accepted transition row, convergence passes, and a negative-control reference",
    details: {
      contract_count: contracts.length,
      transition_count: contracts.reduce((sum, candidate) => sum + (candidate.details?.transition_count ?? 0), 0),
      accepted_transition_row_count: contracts.reduce(
        (sum, candidate) => sum + (candidate.details?.accepted_transition_row_count ?? 0),
        0
      ),
    },
  });
}

function buildBranchProviderFamily(candidates) {
  const rank2ProviderRows = candidatesByKind(candidates, "branch_provider_manifest_rank2_row");
  const strongestPartial =
    rank2ProviderRows.find((candidate) => candidate.id === "tri-binary-torque-wake-same-row-diagnostic") ??
    rank2ProviderRows[0] ??
    null;
  const missing = unique(rank2ProviderRows.flatMap((candidate) => candidate.missing_or_rejected_fields ?? []));
  return sourceFamilyRow({
    id: "branch_provider_rank2_family",
    sourceFamily: "branch_provider_manifest_rank2_rows",
    sourcePaths: unique(rank2ProviderRows.map((candidate) => candidate.source_path)),
    candidateIds: rank2ProviderRows.map((candidate) => candidate.id),
    presentFields: strongestPartial?.details?.source_ref ? ["provider_source_ref"] : [],
    missingOrRejectedFields: missing,
    firstFailure: strongestPartial?.first_failure ?? "accepted_non_fixture_source_missing",
    smallestPositiveObject:
      "a provider manifest row with provider_source_status=accepted_non_fixture_source plus same_domain_record_ref, branch_certificate_ref, active-root identity, branch-local projection or normalization identity, and conservation_pullback_hash",
    details: {
      rank2_provider_row_count: rank2ProviderRows.length,
      strongest_partial_candidate_id: strongestPartial?.id ?? null,
      strongest_partial_status: strongestPartial?.source_status ?? null,
    },
  });
}

function readOptionalJson(repoRoot, sourcePath) {
  const absPath = path.resolve(repoRoot, sourcePath);
  if (!fs.existsSync(absPath)) {
    return { sourcePath, exists: false, data: null };
  }
  return { sourcePath, exists: true, data: readJson(absPath) };
}

function proxyOrMissing(value) {
  return !present(value) || String(value).startsWith("proxy:") || String(value).startsWith("candidate:");
}

function buildTorqueWakeFamily(repoRoot) {
  const readout = readOptionalJson(repoRoot, TORQUE_WAKE_DIAGNOSTIC_PATH);
  if (!readout.exists) {
    return sourceFamilyRow({
      id: "torque_wake_same_row_diagnostic_family",
      sourceFamily: "torque_wake_same_row_diagnostic",
      sourcePaths: [TORQUE_WAKE_DIAGNOSTIC_PATH],
      missingOrRejectedFields: ["branch_certificate_ref"],
      firstFailure: "candidate_path_missing",
      smallestPositiveObject:
        "materialize the torque/wake diagnostic file and bind it to a retained branch certificate before rank 2 consumes it",
    });
  }

  const candidate = readout.data;
  const sampledRows = stringArray(candidate.sampled_active_row_ids);
  const forceRows = stringArray(candidate.force_row_ids);
  const partitionRows = stringArray(candidate.partition_row_ids);
  const torqueRows = stringArray(candidate.torque_row_ids);
  const wakeRows = stringArray(candidate.wake_row_ids);
  const sameRetainedRows = stringArray(candidate.same_retained_active_row_ids);
  const sampledSameRowIdBinding =
    sampledRows.length > 0 &&
    [forceRows, partitionRows, torqueRows, wakeRows].every(
      (rows) => rows.length > 0 && sameOrderedStrings(sampledRows, rows)
    );
  const sameRetainedActiveRowIdBinding =
    sampledSameRowIdBinding &&
    sameRetainedRows.length > 0 &&
    sameOrderedStrings(sampledRows, sameRetainedRows);
  const missing = [];
  if (!present(candidate.branch_certificate_ref)) {
    missing.push("branch_certificate_ref");
  }
  if (candidate.retained_branch !== true) {
    missing.push("retained_branch");
  }
  if (!present(candidate.action_increment_row_ref) || String(candidate.action_increment_row_ref).startsWith("priority-only:")) {
    missing.push("accepted_action_increment_row_id");
  }
  if (!present(candidate.active_root_ledger_hash)) {
    missing.push("active_root_ledger_hash");
  }
  if (!present(candidate.conservation_pullback_hash)) {
    missing.push("conservation_pullback_hash");
  }
  if (!present(candidate.negative_control_ref)) {
    missing.push("negative_control_ref");
  }

  return sourceFamilyRow({
    id: "torque_wake_same_row_diagnostic_family",
    sourceFamily: "torque_wake_same_row_diagnostic",
    sourcePaths: [TORQUE_WAKE_DIAGNOSTIC_PATH],
    candidateIds: [candidate.id ?? "torque-wake-same-row-diagnostic"],
    presentFields: [
      present(candidate.action_increment_row_ref) ? "action_increment_row_ref" : null,
      present(candidate.active_root_ledger_hash) ? "active_root_ledger_hash" : null,
      present(candidate.conservation_pullback_hash) ? "conservation_pullback_hash" : null,
      present(candidate.negative_control_ref) ? "negative_control_ref" : null,
    ],
    missingOrRejectedFields: missing,
    firstFailure: missing.includes("branch_certificate_ref")
      ? "branch_certificate_ref_missing"
      : missing.length > 0
        ? missingToFailureCode(missing[0])
        : null,
    smallestPositiveObject:
      "promote the sampled torque/wake row ids into one retained active-row certificate with branch_certificate_ref, then emit the same row as a non-fixture accepted transition source",
    details: {
      source_report_ref: candidate.source_report_ref ?? null,
      selected_case_id: candidate.selected_case_id ?? null,
      route_root_key: candidate.route_root_key ?? null,
      sampled_active_row_ids: sampledRows,
      sampled_same_row_id_binding: sampledSameRowIdBinding,
      same_retained_active_row_ids: sameRetainedRows,
      same_retained_active_row_id_binding: sameRetainedActiveRowIdBinding,
      retained_branch: candidate.retained_branch === true,
      action_increment_row_ref: candidate.action_increment_row_ref ?? null,
      accepted_transition_source_ref: candidate.accepted_transition_source_ref ?? null,
      action_increment_row_id: candidate.action_increment_row_id ?? null,
      branch_certificate_ref: candidate.branch_certificate_ref ?? null,
      accepted_branch_chart_ref: candidate.accepted_branch_chart_ref ?? null,
      moving_retained_branch_certificate_ref: candidate.moving_retained_branch_certificate_ref ?? null,
      same_record_identity: isObject(candidate.same_record_identity) ? candidate.same_record_identity : {},
      active_root_ledger_hash: candidate.active_root_ledger_hash ?? null,
      conservation_pullback_hash: candidate.conservation_pullback_hash ?? null,
      negative_control_ref: candidate.negative_control_ref ?? null,
    },
  });
}

function readinessField({ field, requiredContent, currentReading, present, failureCode }) {
  return {
    field,
    required_content: requiredContent,
    current_reading: currentReading ?? null,
    verdict: present ? "present" : "missing_or_rejected",
    failure_code: present ? null : failureCode,
  };
}

function absenceField({ field, requiredContent, currentReading, pass, failureCode, details = {} }) {
  return {
    field,
    required_content: requiredContent,
    current_reading: currentReading ?? null,
    verdict: pass ? "present" : "missing_or_rejected",
    failure_code: pass ? null : failureCode,
    ...details,
  };
}

function buildSourceBindingAbsenceRecord(strongestPartial) {
  const details = strongestPartial?.details ?? {};
  const sampledRows = stringArray(details.sampled_active_row_ids);
  const sameRetainedRows = stringArray(details.same_retained_active_row_ids);
  const sameRecordIdentity = isObject(details.same_record_identity) ? details.same_record_identity : {};
  const actionIncrementRowId = details.action_increment_row_id ?? null;
  const actionIncrementRowRef = details.action_increment_row_ref ?? null;
  const actionIncrementCurrentReading = actionIncrementRowId ?? actionIncrementRowRef;
  const actionIncrementFailure =
    present(actionIncrementRowId)
      ? rejectedAcceptedReferenceCode("action_increment_row_id", actionIncrementRowId)
      : present(actionIncrementRowRef)
        ? rejectedAcceptedReferenceCode("action_increment_row_id", actionIncrementRowRef)
        : "action_increment_row_id_missing";
  const sameRetainedBinding =
    details.sampled_same_row_id_binding === true &&
    sameRetainedRows.length > 0 &&
    sameOrderedStrings(sampledRows, sameRetainedRows);
  const fields = [
    absenceField({
      field: "branch_certificate_ref",
      requiredContent: "accepted retained active-row branch_certificate_ref for the selected torque/wake row",
      currentReading: details.branch_certificate_ref,
      pass: rejectedAcceptedReferenceCode("branch_certificate_ref", details.branch_certificate_ref) === null,
      failureCode: rejectedAcceptedReferenceCode("branch_certificate_ref", details.branch_certificate_ref),
    }),
    absenceField({
      field: "retained_branch",
      requiredContent: "retained_branch=true for the selected row",
      currentReading: details.retained_branch,
      pass: details.retained_branch === true,
      failureCode: "retained_branch_false_not_retained_source",
    }),
    absenceField({
      field: "sampled_same_row_id_binding",
      requiredContent: "sampled active row ids match force, partition, torque, and wake rows",
      currentReading: details.sampled_same_row_id_binding,
      pass: details.sampled_same_row_id_binding === true,
      failureCode: "sampled_same_row_id_binding_missing",
      details: { sampled_active_row_ids: sampledRows },
    }),
    absenceField({
      field: "same_retained_active_row_ids",
      requiredContent: "same_retained_active_row_ids exactly equal the sampled active row ids",
      currentReading: sameRetainedRows,
      pass: sameRetainedBinding,
      failureCode:
        sameRetainedRows.length > 0 ? "same_retained_active_row_id_mismatch" : "same_retained_active_row_ids_missing",
      details: { required_same_retained_active_row_ids: sampledRows },
    }),
    absenceField({
      field: "accepted_branch_chart_ref",
      requiredContent: "accepted branch chart for the same retained active-row source",
      currentReading: details.accepted_branch_chart_ref,
      pass: rejectedAcceptedReferenceCode("accepted_branch_chart_ref", details.accepted_branch_chart_ref) === null,
      failureCode: rejectedAcceptedReferenceCode("accepted_branch_chart_ref", details.accepted_branch_chart_ref),
    }),
    absenceField({
      field: "moving_retained_branch_certificate_ref",
      requiredContent: "moving_retained_branch_certificate/v0 consuming the same branch certificate and branch chart",
      currentReading: details.moving_retained_branch_certificate_ref,
      pass:
        rejectedAcceptedReferenceCode(
          "moving_retained_branch_certificate_ref",
          details.moving_retained_branch_certificate_ref
        ) === null,
      failureCode: rejectedAcceptedReferenceCode(
        "moving_retained_branch_certificate_ref",
        details.moving_retained_branch_certificate_ref
      ),
    }),
    ...SAME_RECORD_IDENTITY_REQUIRED_FIELDS.map((field) => {
      const currentReading = nestedValue({ same_record_identity: sameRecordIdentity }, field);
      return absenceField({
        field,
        requiredContent: `same-record identity field required by the retained active-row source: ${field}`,
        currentReading,
        pass: rejectedAcceptedReferenceCode(field, currentReading) === null,
        failureCode: rejectedAcceptedReferenceCode(field, currentReading),
      });
    }),
    absenceField({
      field: "accepted_transition_source_ref",
      requiredContent: "branch-emitted non-fixture accepted_transition_source for the selected retained row",
      currentReading: details.accepted_transition_source_ref,
      pass: rejectedAcceptedReferenceCode("accepted_transition_source_ref", details.accepted_transition_source_ref) === null,
      failureCode: rejectedAcceptedReferenceCode("accepted_transition_source_ref", details.accepted_transition_source_ref),
    }),
    absenceField({
      field: "action_increment_row_id",
      requiredContent: "accepted non-fixture action-increment row id, not a priority-only placeholder",
      currentReading: actionIncrementCurrentReading,
      pass: actionIncrementFailure === null,
      failureCode: actionIncrementFailure,
      details: { action_increment_row_ref: actionIncrementRowRef },
    }),
    absenceField({
      field: "active_root_ledger_hash",
      requiredContent: "active-root ledger hash on the same selected row",
      currentReading: details.active_root_ledger_hash,
      pass: present(details.active_root_ledger_hash),
      failureCode: "active_root_ledger_hash_missing",
    }),
    absenceField({
      field: "conservation_pullback_hash",
      requiredContent: "conservation-pullback hash on the same selected row",
      currentReading: details.conservation_pullback_hash,
      pass: present(details.conservation_pullback_hash),
      failureCode: "conservation_pullback_hash_missing",
    }),
    absenceField({
      field: "negative_control_ref",
      requiredContent: "negative control for mismatched branch/source/hash bindings",
      currentReading: details.negative_control_ref,
      pass: present(details.negative_control_ref),
      failureCode: "negative_control_ref_missing",
    }),
  ];
  const firstMissing = fields.find((field) => field.verdict !== "present");

  return {
    schema: SOURCE_BINDING_ABSENCE_RECORD_SCHEMA,
    claim_scope:
      "fail-closed source-binding absence row for the nearest rank-2 non-fixture transition-source candidate",
    row_id: `torque_wake_same_row_diagnostic:${details.selected_case_id ?? "index-ratio:f2"}`,
    selected_family_id: strongestPartial?.id ?? null,
    selected_candidate_id: strongestPartial?.related_candidate_ids?.[0] ?? null,
    source_path: TORQUE_WAKE_DIAGNOSTIC_PATH,
    selected_case_id: details.selected_case_id ?? null,
    route_root_key: details.route_root_key ?? null,
    source_report_ref: details.source_report_ref ?? null,
    sampled_active_row_ids: sampledRows,
    sampled_same_row_id_binding: details.sampled_same_row_id_binding === true,
    required_same_retained_active_row_ids: sampledRows,
    same_retained_active_row_ids: sameRetainedRows,
    same_retained_active_row_id_binding: sameRetainedBinding,
    current_hash_bindings: {
      active_root_ledger_hash: details.active_root_ledger_hash ?? null,
      conservation_pullback_hash: details.conservation_pullback_hash ?? null,
      negative_control_ref: details.negative_control_ref ?? null,
    },
    same_record_identity_current: sameRecordIdentity,
    same_record_identity_required_fields: SAME_RECORD_IDENTITY_REQUIRED_FIELDS,
    required_accepted_source_fields: RETAINED_ACTIVE_ROW_TRANSITION_SOURCE_FIELDS,
    field_results: fields,
    present_useful_fields: fields.filter((field) => field.verdict === "present").map((field) => field.field),
    missing_or_rejected_fields: fields
      .filter((field) => field.verdict !== "present")
      .map((field) => field.field),
    first_missing_accepted_source_field: firstMissing?.field ?? null,
    first_failure: firstMissing?.failure_code ?? null,
    reference_rejection_policy: {
      schema: "accepted_reference_rejection_policy/v0",
      disallowed_prefixes: DISALLOWED_ACCEPTED_REFERENCE_PREFIXES,
      disallowed_substrings: ["synthetic", ":fixture", "fixture-"],
      rule:
        "A nonempty reference is not accepted evidence if it is priority-only, fixture, proxy, candidate, or synthetic.",
    },
    next_retained_active_row_evidence_object: {
      schema: RETAINED_ACTIVE_ROW_EVIDENCE_OBJECT_SCHEMA,
      current_family: `torque_wake_same_row_diagnostic:${details.selected_case_id ?? "index-ratio:f2"}`,
      required_same_retained_active_row_ids: sampledRows,
      required_fields: RETAINED_ACTIVE_ROW_TRANSITION_SOURCE_FIELDS,
      same_record_identity_required_fields: SAME_RECORD_IDENTITY_REQUIRED_FIELDS,
      rank2_follow_on_fields_after_certificate: ["accepted_transition_source_ref", "action_increment_row_id"],
      acceptance_boundary:
        "This is a target only. It becomes evidence only when accepted non-fixture same-record sources replace every missing or rejected reference.",
    },
    authorization: {
      accepted_transition_source: false,
      candidate_h_recovery: false,
      moving_retained_branch_certificate: false,
      retained_branch: false,
      bounded_speed_live_ledger: false,
      observer_export: false,
    },
  };
}

function buildNearestCandidateProvenanceReadinessAudit(strongestPartial) {
  if (!strongestPartial) {
    return {
      schema: NEAREST_CANDIDATE_READINESS_AUDIT_SCHEMA,
      claim_scope: "priority-only nearest candidate provenance/readiness audit",
      audit_status: "fail_closed_no_candidate_family",
      selected_family_id: null,
      selected_candidate_id: null,
      selected_case_id: null,
      route_root_key: null,
      accepted_transition_source_found: false,
      first_missing_required_field: "branch_certificate_ref",
      first_failure: "candidate_family_missing",
      fields: [],
      source_binding_absence_record: null,
      smallest_next_evidence_object:
        "materialize one retained branch certificate before attempting an accepted transition source",
      candidate_h_recovery_vote: "not_authorized",
      not_authorized: [
        "does not create a non-fixture accepted_transition_source",
        "does not run field_speed_action_self_hit_scan/v0",
        "does not authorize candidate_h_recovery",
      ],
    };
  }

  const details = strongestPartial.details ?? {};
  const missing = new Set(strongestPartial.missing_or_rejected_fields ?? []);
  const actionIncrementRowRef = details.action_increment_row_ref ?? null;
  const acceptedActionIncrementRowPresent =
    present(actionIncrementRowRef) && !String(actionIncrementRowRef).startsWith("priority-only:");
  const fields = [
    readinessField({
      field: "branch_certificate_ref",
      requiredContent: "retained branch certificate that owns the selected same-row diagnostic payload",
      currentReading: details.branch_certificate_ref,
      present: present(details.branch_certificate_ref),
      failureCode: "branch_certificate_ref_missing",
    }),
    readinessField({
      field: "active_root_ledger_hash",
      requiredContent: "active-root ledger identity for the same selected row",
      currentReading: details.active_root_ledger_hash,
      present: present(details.active_root_ledger_hash),
      failureCode: "active_root_ledger_hash_missing",
    }),
    readinessField({
      field: "conservation_pullback_hash",
      requiredContent: "conservation-pullback hash for the same selected row",
      currentReading: details.conservation_pullback_hash,
      present: present(details.conservation_pullback_hash),
      failureCode: "conservation_pullback_hash_missing",
    }),
    readinessField({
      field: "negative_control_ref",
      requiredContent: "fail-closed negative control attached to the same selected row",
      currentReading: details.negative_control_ref,
      present: present(details.negative_control_ref),
      failureCode: "negative_control_ref_missing",
    }),
    readinessField({
      field: "retained_branch",
      requiredContent: "retained_branch=true for the selected same-row payload",
      currentReading: details.retained_branch,
      present: details.retained_branch === true,
      failureCode: "retained_branch_missing",
    }),
    readinessField({
      field: "accepted_action_increment_row_id",
      requiredContent: "accepted non-fixture action-increment row id, not a priority-only placeholder",
      currentReading: actionIncrementRowRef,
      present: acceptedActionIncrementRowPresent,
      failureCode: "accepted_action_increment_row_id_missing",
    }),
    readinessField({
      field: "transition_source_ref",
      requiredContent: "branch-emitted non-fixture accepted_transition_source for the same row",
      currentReading: null,
      present: false,
      failureCode: "blocked_until_branch_certificate_ref",
    }),
  ];
  const firstMissing = fields.find((field) => field.verdict !== "present");
  const sourceBindingAbsenceRecord = buildSourceBindingAbsenceRecord(strongestPartial);

  return {
    schema: NEAREST_CANDIDATE_READINESS_AUDIT_SCHEMA,
    claim_scope: "priority-only nearest candidate provenance/readiness audit",
    audit_status: "fail_closed_no_accepted_transition_source",
    selected_family_id: strongestPartial.id,
    selected_candidate_id: strongestPartial.related_candidate_ids?.[0] ?? null,
    selected_case_id: details.selected_case_id ?? null,
    route_root_key: details.route_root_key ?? null,
    accepted_transition_source_found: false,
    strongest_partial_first_failure: strongestPartial.first_failure,
    first_missing_required_field: firstMissing?.field ?? null,
    first_failure: firstMissing?.failure_code ?? null,
    present_same_record_fields: fields.filter((field) => field.verdict === "present").map((field) => field.field),
    missing_or_rejected_same_record_fields: fields
      .filter((field) => field.verdict !== "present")
      .map((field) => field.field),
    first_blocking_context: missing.has("branch_certificate_ref")
      ? "The torque/wake same-row diagnostic already carries active-root ledger, conservation-pullback, and negative-control references, but no retained branch_certificate_ref owns the row."
      : "The strongest partial still lacks at least one same-record source-binding field.",
    smallest_next_evidence_object:
      "one retained active-row branch_certificate_ref for torque_wake_same_row_diagnostic:index-ratio:f2, preserving the sampled active row ids before emitting the non-fixture accepted transition_source_ref",
    fields,
    source_binding_absence_record: sourceBindingAbsenceRecord,
    source_binding_absence_rows: [sourceBindingAbsenceRecord],
    candidate_h_recovery_vote: "not_authorized",
    not_authorized: [
      "does not create a non-fixture accepted_transition_source",
      "does not run field_speed_action_self_hit_scan/v0",
      "does not authorize candidate_h_recovery",
    ],
  };
}

function buildMovingBranchCertificateFamily(repoRoot) {
  const current = readOptionalJson(repoRoot, MOVING_BRANCH_STATUS_PATH);
  const partial = readOptionalJson(repoRoot, MOVING_BRANCH_PARTIAL_SCOUT_PATH);
  const proxyControl = readOptionalJson(repoRoot, MOVING_BRANCH_PROXY_NEGATIVE_CONTROL_PATH);
  const candidate = partial.data ?? current.data ?? proxyControl.data ?? null;
  const sameRecordIdentity = candidate?.same_record_identity ?? {};
  const missing = [];
  if (!present(candidate?.branch_certificate_ref) || String(candidate?.branch_certificate_ref).startsWith("proxy:")) {
    missing.push("branch_certificate_ref");
  }
  if (proxyOrMissing(sameRecordIdentity.accepted_branch_chart_ref)) {
    missing.push("accepted_branch_chart_ref");
  }
  for (const field of [
    "separator_chart_ref",
    "positive_gap_record_ref",
    "memory_depth_record_ref",
    "active_wave_vector_gap_ref",
  ]) {
    if (!present(sameRecordIdentity[field])) {
      missing.push(field);
    }
  }

  return sourceFamilyRow({
    id: "moving_branch_certificate_family",
    sourceFamily: "moving_retained_branch_certificate",
    sourcePaths: [MOVING_BRANCH_STATUS_PATH, MOVING_BRANCH_PARTIAL_SCOUT_PATH, MOVING_BRANCH_PROXY_NEGATIVE_CONTROL_PATH],
    candidateIds: [candidate?.certificate_id ?? null],
    presentFields: [
      present(candidate?.source_root_ledger_ref) ? "source_root_ledger_ref" : null,
      present(sameRecordIdentity.active_root_ledger_hash) ? "same_record_identity.active_root_ledger_hash" : null,
      present(sameRecordIdentity.branch_label) ? "same_record_identity.branch_label" : null,
    ],
    missingOrRejectedFields: missing,
    firstFailure: missing.includes("accepted_branch_chart_ref")
      ? "accepted_branch_chart_ref_proxy_not_accepted"
      : missing.includes("branch_certificate_ref")
        ? "branch_certificate_ref_missing"
        : missing.length > 0
          ? missingToFailureCode(missing[0])
          : null,
    smallestPositiveObject:
      "issue an accepted branch chart whose same_record_identity carries branch label, extraction window, active-root ledger hash, separator chart, positive gap, memory depth, and active wave-vector gap",
    details: {
      source_paths_found: [current, partial, proxyControl].filter((entry) => entry.exists).map((entry) => entry.sourcePath),
      certificate_status: candidate?.certificate_status ?? null,
      first_failure: candidate?.first_failure ?? null,
    },
  });
}

function buildRank2Rank6JoinFamily(candidates, torqueWakeFamily) {
  const acceptedCount = candidates.filter((candidate) => candidate.accepted_transition_source_ready).length;
  const missing = [];
  if (acceptedCount === 0) {
    missing.push("accepted_transition_source");
  }
  if (torqueWakeFamily.missing_or_rejected_fields.includes("branch_certificate_ref")) {
    missing.push("common_branch_certificate_ref");
  }
  missing.push("common_active_root_ledger_identity");
  missing.push("common_conservation_pullback_hash");
  missing.push("common_negative_control_ref");

  return sourceFamilyRow({
    id: "rank2_rank6_branch_source_join_family",
    sourceFamily: "rank2_rank6_branch_source_join",
    sourcePaths: ["scripts/nested-shell-braid/rank2-rank6-branch-source-join-report.mjs"],
    candidateIds: ["rank2_rank6_branch_source_join_report/v0"],
    presentFields: torqueWakeFamily.present_fields.map((field) => `torque_wake.${field}`),
    missingOrRejectedFields: missing,
    firstFailure: acceptedCount === 0 ? "source_row_binding_open" : missingToFailureCode(missing[0]),
    smallestPositiveObject:
      "one same-record provider intake where rank 2 supplies accepted_transition_source and the rank 6 and torque/wake rows share branch certificate, active-root ledger identity, conservation pullback, and negative control",
    details: {
      rank2_accepted_transition_source_candidate_count: acceptedCount,
      torque_wake_family_first_failure: torqueWakeFamily.first_failure,
    },
  });
}

function buildSourceFamilyDeltaScout({ repoRoot, candidates, acceptedCandidates }) {
  const torqueWakeFamily = buildTorqueWakeFamily(repoRoot);
  const families = [
    buildActionIncrementPacketFamily(candidates),
    buildSourceContractFamily(candidates),
    buildBranchProviderFamily(candidates),
    torqueWakeFamily,
    buildMovingBranchCertificateFamily(repoRoot),
    buildRank2Rank6JoinFamily(candidates, torqueWakeFamily),
  ];
  const firstFamilyFailure = families.find((family) => family.first_failure !== null)?.first_failure ?? null;
  const strongestPartial = families.find((family) => family.id === "torque_wake_same_row_diagnostic_family");
  const nearestCandidateProvenanceReadinessAudit =
    acceptedCandidates.length > 0 ? null : buildNearestCandidateProvenanceReadinessAudit(strongestPartial);

  return {
    schema: SOURCE_FAMILY_DELTA_SCOUT_SCHEMA,
    claim_scope:
      "priority-only delta scout for current repo families that might feed rank-2 accepted_transition_source",
    report_status:
      acceptedCandidates.length > 0 ? "candidate_surface_ready_for_source_binding" : "source_row_binding_open",
    family_count: families.length,
    accepted_transition_source_family_count: acceptedCandidates.length > 0 ? 1 : 0,
    first_failure: acceptedCandidates.length > 0 ? null : "source_row_binding_open",
    first_family_failure_code: acceptedCandidates.length > 0 ? null : firstFamilyFailure,
    strongest_partial_family_id: strongestPartial?.id ?? null,
    strongest_partial_first_failure: strongestPartial?.first_failure ?? null,
    first_required_source_field: acceptedCandidates.length > 0 ? null : "transition_source_ref",
    exact_next_rank2_source_object:
      acceptedCandidates.length > 0 ? null : MINIMUM_ACCEPTED_TRANSITION_SOURCE_OBJECT,
    nearest_candidate_provenance_readiness_audit: nearestCandidateProvenanceReadinessAudit,
    families,
    candidate_h_recovery_vote: "not_authorized",
    not_authorized: [
      "does not run field_speed_action_self_hit_scan/v0",
      "does not authorize candidate_h_recovery",
      "does not promote torque/wake, moving-branch, H39, join, fixture, proxy, or target-only rows as accepted transition sources",
    ],
  };
}

function inspectCandidate(candidatePath, repoRoot) {
  const absPath = path.resolve(repoRoot, candidatePath);
  const sourcePath = relativePath(repoRoot, absPath);
  if (!fs.existsSync(absPath)) {
    return [
      baseCandidate({
        id: path.basename(candidatePath),
        sourcePath,
        sourceKind: "missing_path",
        sourceStatus: "missing",
        firstFailure: "candidate_path_missing",
        missingFields: ["transition_source_ref"],
      }),
    ];
  }

  const stat = fs.statSync(absPath);
  if (stat.isDirectory() && fs.existsSync(path.join(absPath, "action_increment_rows.csv"))) {
    return [inspectActionIncrementPacket(absPath, sourcePath)];
  }

  if (!stat.isFile() || path.extname(absPath) !== ".json") {
    return [
      baseCandidate({
        id: path.basename(candidatePath),
        sourcePath,
        sourceKind: stat.isDirectory() ? "unsupported_directory" : "unsupported_file",
        sourceStatus: "unsupported",
        firstFailure: "unsupported_candidate_shape",
        missingFields: ["transition_source_ref"],
      }),
    ];
  }

  const json = readJson(absPath);
  if (json.schema === "nested-shell-braid-action-increment-source/v1") {
    return [inspectActionIncrementSourceContract(absPath, sourcePath, json)];
  }
  if (json.schema === "branch_provider_evidence_candidates/v0") {
    return inspectBranchProviderManifest(absPath, sourcePath, json);
  }

  return [
    baseCandidate({
      id: path.basename(candidatePath, ".json"),
      sourcePath,
      sourceKind: json.schema ?? "unknown_json",
      sourceStatus: "unsupported",
      firstFailure: "unsupported_candidate_shape",
      missingFields: ["transition_source_ref"],
      details: { schema: json.schema ?? null },
    }),
  ];
}

function buildReport(options = {}) {
  const repoRoot = path.resolve(options.repoRoot ?? process.cwd());
  const candidatePaths =
    Array.isArray(options.candidatePaths) && options.candidatePaths.length > 0
      ? options.candidatePaths
      : DEFAULT_CANDIDATE_PATHS;
  const candidates = candidatePaths.flatMap((candidatePath) => inspectCandidate(candidatePath, repoRoot));
  const acceptedCandidates = candidates.filter((candidate) => candidate.accepted_transition_source_ready);
  const firstRejectedCandidate = candidates.find((candidate) => candidate.first_failure !== null) ?? null;
  const sourceFamilyDeltaScout = buildSourceFamilyDeltaScout({ repoRoot, candidates, acceptedCandidates });

  return {
    schema: SCHEMA,
    claim_scope: "priority-only rank-2 accepted_transition_source candidate intake",
    report_status:
      acceptedCandidates.length > 0
        ? "candidate_surface_ready_for_source_binding"
        : "source_row_binding_open",
    candidate_path_count: candidatePaths.length,
    candidate_count: candidates.length,
    accepted_transition_source_candidate_count: acceptedCandidates.length,
    first_failure: acceptedCandidates.length > 0 ? null : "source_row_binding_open",
    first_candidate_failure_code: firstRejectedCandidate?.first_failure ?? null,
    first_required_source_field: acceptedCandidates.length > 0 ? null : "transition_source_ref",
    next_required_field:
      acceptedCandidates.length > 0
        ? null
        : "non-fixture branch-emitted transition_source_ref with same-row branch_certificate_ref, root_ledger_hash, conservation_pullback_hash, and negative_control_ref",
    required_same_record_fields: REQUIRED_SAME_RECORD_FIELDS,
    source_family_delta_scout: sourceFamilyDeltaScout,
    nearest_candidate_provenance_readiness_audit:
      sourceFamilyDeltaScout.nearest_candidate_provenance_readiness_audit,
    candidates,
    candidate_h_recovery_vote: "not_authorized",
    not_authorized: [
      "does not run field_speed_action_self_hit_scan/v0",
      "does not authorize candidate_h_recovery",
      "does not treat fixture, synthetic, proxy, target-only, or attempt-only rows as accepted transition sources",
    ],
  };
}

function validationErrors(report) {
  const errors = [];
  if (report?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (!Array.isArray(report?.candidates)) {
    errors.push("candidates must be an array");
  }
  if (typeof report?.accepted_transition_source_candidate_count !== "number") {
    errors.push("accepted_transition_source_candidate_count must be a number");
  }
  if (report?.candidate_h_recovery_vote !== "not_authorized") {
    errors.push("candidate_h_recovery_vote must remain not_authorized");
  }
  if (report?.source_family_delta_scout?.schema !== SOURCE_FAMILY_DELTA_SCOUT_SCHEMA) {
    errors.push(`source_family_delta_scout.schema must be ${SOURCE_FAMILY_DELTA_SCOUT_SCHEMA}`);
  }
  if (report?.source_family_delta_scout?.candidate_h_recovery_vote !== "not_authorized") {
    errors.push("source_family_delta_scout candidate_h_recovery_vote must remain not_authorized");
  }
  if (
    report?.nearest_candidate_provenance_readiness_audit !== null &&
    report?.nearest_candidate_provenance_readiness_audit?.schema !== NEAREST_CANDIDATE_READINESS_AUDIT_SCHEMA
  ) {
    errors.push(`nearest_candidate_provenance_readiness_audit.schema must be ${NEAREST_CANDIDATE_READINESS_AUDIT_SCHEMA}`);
  }
  if (
    report?.nearest_candidate_provenance_readiness_audit?.source_binding_absence_record &&
    report.nearest_candidate_provenance_readiness_audit.source_binding_absence_record.schema !==
      SOURCE_BINDING_ABSENCE_RECORD_SCHEMA
  ) {
    errors.push(`source_binding_absence_record.schema must be ${SOURCE_BINDING_ABSENCE_RECORD_SCHEMA}`);
  }
  if (
    report?.nearest_candidate_provenance_readiness_audit?.source_binding_absence_record?.authorization
      ?.accepted_transition_source !== false
  ) {
    errors.push("source_binding_absence_record must not authorize accepted_transition_source");
  }
  if (
    report?.nearest_candidate_provenance_readiness_audit?.source_binding_absence_record?.authorization
      ?.candidate_h_recovery !== false
  ) {
    errors.push("source_binding_absence_record must not authorize candidate_h_recovery");
  }
  if (
    report?.nearest_candidate_provenance_readiness_audit &&
    report.nearest_candidate_provenance_readiness_audit.candidate_h_recovery_vote !== "not_authorized"
  ) {
    errors.push("nearest_candidate_provenance_readiness_audit candidate_h_recovery_vote must remain not_authorized");
  }
  if (!Array.isArray(report?.source_family_delta_scout?.families)) {
    errors.push("source_family_delta_scout families must be an array");
  }
  for (const candidate of report?.candidates ?? []) {
    if (!candidate.id) {
      errors.push("candidate id is required");
    }
    if (!candidate.source_path) {
      errors.push(`${candidate.id ?? "candidate"} source_path is required`);
    }
    if (!["accepted_transition_source_candidate", "rejected"].includes(candidate.verdict)) {
      errors.push(`${candidate.id ?? "candidate"} verdict is invalid`);
    }
    if (candidate.verdict === "accepted_transition_source_candidate" && candidate.first_failure !== null) {
      errors.push(`${candidate.id} accepted candidate cannot carry first_failure`);
    }
  }
  for (const family of report?.source_family_delta_scout?.families ?? []) {
    if (!family.id) {
      errors.push("source family id is required");
    }
    if (family.candidate_h_recovery_vote !== "not_authorized") {
      errors.push(`${family.id ?? "source family"} candidate_h_recovery_vote must remain not_authorized`);
    }
    if (!["accepted_transition_source_family", "rejected"].includes(family.verdict)) {
      errors.push(`${family.id ?? "source family"} verdict is invalid`);
    }
  }
  return errors;
}

function validateReport(filePath) {
  const report = readJson(filePath);
  const errors = validationErrors(report);
  return {
    valid: errors.length === 0,
    errors,
    schema: report.schema ?? null,
    report_status: report.report_status ?? null,
    accepted_transition_source_candidate_count:
      report.accepted_transition_source_candidate_count ?? null,
  };
}

function emitJson(value, options) {
  const json = JSON.stringify(value, null, options.pretty ? 2 : 0);
  if (options.out) {
    fs.writeFileSync(options.out, `${json}\n`);
  } else {
    console.log(json);
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  if (args.validate) {
    emitJson(validateReport(args.validate), args);
    return;
  }
  const report = buildReport(args);
  const errors = validationErrors(report);
  if (errors.length > 0) {
    report.validation_errors = errors;
  }
  emitJson(report, args);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

export { DEFAULT_CANDIDATE_PATHS, buildReport, validationErrors, validateReport };
