#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const SCHEMA = "field_speed_action_self_hit_scan_source_candidate_intake_report/v0";
const RANK2_FEED = "rank2_field_speed_action_self_hit_scan";

const DEFAULT_CANDIDATE_PATHS = [
  "scripts/nested-shell-braid/fixtures/action-increment-packet",
  "scripts/nested-shell-braid/fixtures/action-increment-source-contract-rank2-transition-source-attempt.json",
  "scripts/nested-shell-braid/fixtures/action-increment-source-contract-blocked.json",
  "scripts/solver-audits/fixtures/branch-provider-current-candidates.json",
];

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

const ACCEPTED_PACKET_PROMOTION_STATUSES = new Set([
  "accepted_transition_source",
  "accepted_non_fixture_source",
  "accepted-field-speed-transition-source",
]);
const ACCEPTED_SOURCE_STATUSES = new Set([
  "accepted_transition_source",
  "accepted_non_fixture_source",
]);

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
