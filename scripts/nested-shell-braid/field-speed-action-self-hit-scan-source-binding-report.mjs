#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const SCHEMA = "field_speed_action_self_hit_scan_source_binding_report/v0";

function parseArgs(argv) {
  const args = {
    packetDir: null,
    branchRowId: null,
    branchCertificateRef: null,
    rootLedgerHash: null,
    conservationPullbackHash: null,
    negativeControlRef: null,
    out: null,
    validate: null,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--packet-dir") {
      args.packetDir = argv[++index];
    } else if (arg === "--branch-row-id") {
      args.branchRowId = argv[++index];
    } else if (arg === "--branch-certificate-ref") {
      args.branchCertificateRef = argv[++index];
    } else if (arg === "--root-ledger-hash") {
      args.rootLedgerHash = argv[++index];
    } else if (arg === "--conservation-pullback-hash") {
      args.conservationPullbackHash = argv[++index];
    } else if (arg === "--negative-control-ref") {
      args.negativeControlRef = argv[++index];
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
  console.log(`Usage: node scripts/nested-shell-braid/field-speed-action-self-hit-scan-source-binding-report.mjs [options]

Options:
  --packet-dir PATH                  Action-increment packet directory.
  --branch-row-id ID                 Action-increment row id to bind.
  --branch-certificate-ref REF       Retained branch certificate reference.
  --root-ledger-hash HASH            Active-root ledger hash for the same row.
  --conservation-pullback-hash HASH  Conservation-pullback hash for the same row.
  --negative-control-ref REF         Fail-closed negative-control reference.
  --out PATH                         Write JSON output to a file instead of stdout.
  --validate PATH                    Validate an existing report JSON.
  --pretty                           Pretty-print JSON output.
  --help                             Show this help.

This emits a fail-closed source-binding report for field_speed_action_self_hit_scan/v0.
It does not run the field-speed scan, validate delayed dynamics, prove delayed-Noether
conservation, derive a benchmark, or authorize candidate_h_recovery unless the source
row is non-fixture and all same-record binding fields are present.`);
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

function isNonemptyString(value) {
  return typeof value === "string" && value.trim() !== "";
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

function normalizeStatus(value) {
  const status = String(value ?? "").trim().toLowerCase();
  return status === "accepted" || status === "accept" || status === "pass" ? "accepted" : "rejected";
}

function buildReport(options) {
  if (!isNonemptyString(options.packetDir)) {
    throw new Error("--packet-dir is required unless --validate is used");
  }
  const packetDir = options.packetDir;
  const actionRowsPath = path.join(packetDir, "action_increment_rows.csv");
  const clusterSummaryPath = path.join(packetDir, "cluster_summary.json");
  const rows = parseCsv(readText(actionRowsPath));
  const clusterSummary = readJson(clusterSummaryPath);
  const selectedRow =
    rows.find((row) => row.id === options.branchRowId) ??
    rows.find((row) => normalizeStatus(row.status) === "accepted") ??
    null;
  if (!selectedRow) {
    throw new Error(`no action-increment row found for ${options.branchRowId ?? "first accepted row"}`);
  }

  const rowStatus = normalizeStatus(selectedRow.status);
  const promotionStatus = clusterSummary.promotion_status ?? "unknown";
  const fixtureShapeOnly = promotionStatus === "fixture-shape-only";
  const actionRowHash = `sha256:${sha256(stableJson(selectedRow))}`;
  const missing = [];

  if (!isNonemptyString(options.branchCertificateRef)) {
    missing.push("branch_certificate_ref");
  }
  if (!isNonemptyString(options.rootLedgerHash)) {
    missing.push("root_ledger_hash");
  }
  if (!isNonemptyString(options.conservationPullbackHash)) {
    missing.push("conservation_pullback_hash");
  }
  if (!isNonemptyString(options.negativeControlRef)) {
    missing.push("negative_control_ref");
  }
  if (rowStatus !== "accepted") {
    missing.push("accepted_action_increment_row");
  }
  if (fixtureShapeOnly) {
    missing.push("non_fixture_transition_source");
  }

  const acceptedTransitionSource = missing.length === 0;
  const sourceVerdict = acceptedTransitionSource
    ? "accepted_transition_source"
    : rowStatus === "accepted"
      ? "diagnostic_rejected_endpoint_source"
      : "source_row_binding_open";

  return {
    schema: SCHEMA,
    claim_scope: "field-speed-action-self-hit-scan-source-binding-report",
    promotion_status: "priority-only",
    transition_source_ref: packetDir,
    branch_row_id: selectedRow.id,
    action_row_status: rowStatus,
    action_row_hash: actionRowHash,
    branch_from: selectedRow.branch_from ?? null,
    branch_to: selectedRow.branch_to ?? null,
    endpoint_eligibility: acceptedTransitionSource ? "accepted_transition_source" : "not_eligible",
    source_verdict: sourceVerdict,
    branch_certificate_ref: options.branchCertificateRef ?? null,
    root_ledger_hash: options.rootLedgerHash ?? null,
    conservation_pullback_hash: options.conservationPullbackHash ?? null,
    negative_control_ref: options.negativeControlRef ?? null,
    packet_promotion_status: promotionStatus,
    fixture_shape_only: fixtureShapeOnly,
    same_record_binding: acceptedTransitionSource,
    missing_or_rejected_fields: missing,
    candidate_h_recovery_vote: acceptedTransitionSource ? "authorized_not_computed" : "not_authorized",
    first_failure: acceptedTransitionSource ? null : "source_row_binding_open",
    strongest_claim: acceptedTransitionSource
      ? "The named non-fixture action-increment row has the source-binding fields required before a field-speed scan may compute a candidate_h_recovery vote."
      : "The named action-increment row is not a legal accepted_transition_source for field_speed_action_self_hit_scan/v0.",
    not_authorized: [
      "does not run the approach-to-c_f field-speed scan",
      "does not validate delayed dynamics",
      "does not prove delayed-Noether conservation",
      "does not derive the Planck benchmark",
      "does not authorize candidate_h_recovery unless source_verdict is accepted_transition_source",
    ],
  };
}

function validationErrors(report) {
  const errors = [];
  if (report?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (!isNonemptyString(report?.branch_row_id)) {
    errors.push("branch_row_id is required");
  }
  if (!isNonemptyString(report?.action_row_hash)) {
    errors.push("action_row_hash is required");
  }
  if (!["accepted_transition_source", "diagnostic_rejected_endpoint_source", "source_row_binding_open"].includes(report?.source_verdict)) {
    errors.push("source_verdict is invalid");
  }
  if (report?.source_verdict !== "accepted_transition_source" && report?.candidate_h_recovery_vote !== "not_authorized") {
    errors.push("candidate_h_recovery_vote must be not_authorized unless source_verdict is accepted_transition_source");
  }
  if (report?.source_verdict === "accepted_transition_source") {
    for (const field of [
      "branch_certificate_ref",
      "root_ledger_hash",
      "conservation_pullback_hash",
      "negative_control_ref",
    ]) {
      if (!isNonemptyString(report[field])) {
        errors.push(`${field} is required for accepted_transition_source`);
      }
    }
    if (report.fixture_shape_only === true) {
      errors.push("fixture_shape_only cannot be accepted_transition_source");
    }
  }
  return errors;
}

function validateReport(filePath) {
  const report = readJson(filePath);
  const errors = validationErrors(report);
  return { valid: errors.length === 0, errors, schema: report.schema ?? null, source_verdict: report.source_verdict ?? null };
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

export { buildReport, validationErrors, validateReport };
