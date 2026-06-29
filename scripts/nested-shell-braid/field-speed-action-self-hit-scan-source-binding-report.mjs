#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const SCHEMA = "field_speed_action_self_hit_scan_source_binding_report/v0";
const SOURCE_ACCEPTANCE_CONTRACT_SCHEMA =
  "field_speed_action_self_hit_scan_source_acceptance_contract/v0";

const SOURCE_FIELD_FAILURE_ORDER = [
  "non_fixture_transition_source",
  "accepted_action_increment_row",
  "branch_certificate_ref",
  "action_row_branch_certificate_ref",
  "branch_certificate_ref_mismatch",
  "root_ledger_hash",
  "action_row_root_ledger_hash",
  "root_ledger_hash_mismatch",
  "conservation_pullback_hash",
  "action_row_conservation_pullback_hash",
  "conservation_pullback_hash_mismatch",
  "negative_control_ref",
];

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

function orderedUniqueFailures(missing) {
  const seen = new Set(missing);
  const ordered = SOURCE_FIELD_FAILURE_ORDER.filter((code) => seen.has(code));
  for (const code of missing) {
    if (!ordered.includes(code)) {
      ordered.push(code);
    }
  }
  return ordered;
}

function fieldVerdict(failureCode) {
  return failureCode === null ? "present" : "blocked";
}

function firstPresent(values) {
  return values.find((value) => isNonemptyString(value)) ?? null;
}

function normalizeStatus(value) {
  const status = String(value ?? "").trim().toLowerCase();
  return status === "accepted" || status === "accept" || status === "pass" ? "accepted" : "rejected";
}

function rowField(row, field) {
  const value = row?.[field];
  return isNonemptyString(value) ? value.trim() : null;
}

function recordMissingOrMismatch({ missing, row, field, optionValue, optionField, missingRowCode, mismatchCode }) {
  const rowValue = rowField(row, field);
  const expectedValue = isNonemptyString(optionValue) ? optionValue.trim() : null;
  if (expectedValue === null) {
    missing.push(optionField);
  }
  if (rowValue === null) {
    missing.push(missingRowCode);
  }
  if (rowValue !== null && expectedValue !== null && rowValue !== expectedValue) {
    missing.push(mismatchCode);
  }
  return rowValue;
}

function buildSourceAcceptanceContract({
  packetDir,
  selectedRow,
  rowStatus,
  promotionStatus,
  fixtureShapeOnly,
  actionRowBranchCertificateRef,
  actionRowRootLedgerHash,
  actionRowConservationPullbackHash,
  options,
}) {
  const optionBranchCertificateRef = isNonemptyString(options.branchCertificateRef)
    ? options.branchCertificateRef.trim()
    : null;
  const optionRootLedgerHash = isNonemptyString(options.rootLedgerHash) ? options.rootLedgerHash.trim() : null;
  const optionConservationPullbackHash = isNonemptyString(options.conservationPullbackHash)
    ? options.conservationPullbackHash.trim()
    : null;
  const optionNegativeControlRef = isNonemptyString(options.negativeControlRef)
    ? options.negativeControlRef.trim()
    : null;

  const branchFailure =
    optionBranchCertificateRef === null
      ? "branch_certificate_ref"
      : actionRowBranchCertificateRef === null
        ? "action_row_branch_certificate_ref"
        : actionRowBranchCertificateRef !== optionBranchCertificateRef
          ? "branch_certificate_ref_mismatch"
          : null;
  const rootFailure =
    optionRootLedgerHash === null
      ? "root_ledger_hash"
      : actionRowRootLedgerHash === null
        ? "action_row_root_ledger_hash"
        : actionRowRootLedgerHash !== optionRootLedgerHash
          ? "root_ledger_hash_mismatch"
          : null;
  const conservationFailure =
    optionConservationPullbackHash === null
      ? "conservation_pullback_hash"
      : actionRowConservationPullbackHash === null
        ? "action_row_conservation_pullback_hash"
        : actionRowConservationPullbackHash !== optionConservationPullbackHash
          ? "conservation_pullback_hash_mismatch"
          : null;

  const fields = [
    {
      field: "transition_source_ref",
      required_content: "non-fixture branch-emitted transition source packet",
      current_reading: packetDir,
      verdict: fieldVerdict(fixtureShapeOnly ? "fixture_shape_only_packet_not_source" : null),
      failure_code: fixtureShapeOnly ? "fixture_shape_only_packet_not_source" : null,
    },
    {
      field: "action_increment_row_id",
      required_content: "named non-fixture action-increment row with accepted status",
      current_reading: selectedRow.id,
      verdict: fieldVerdict(
        rowStatus !== "accepted"
          ? "accepted_action_increment_row"
          : fixtureShapeOnly
            ? "fixture_action_increment_row_not_source"
            : null
      ),
      failure_code:
        rowStatus !== "accepted"
          ? "accepted_action_increment_row"
          : fixtureShapeOnly
            ? "fixture_action_increment_row_not_source"
            : null,
    },
    {
      field: "branch_certificate_ref",
      required_content: "retained branch certificate reference owned by the same action-increment row",
      current_reading: firstPresent([actionRowBranchCertificateRef, optionBranchCertificateRef]),
      verdict: fieldVerdict(branchFailure),
      failure_code: branchFailure,
    },
    {
      field: "root_ledger_hash",
      required_content: "active-root ledger hash on the same action-increment row",
      current_reading: firstPresent([actionRowRootLedgerHash, optionRootLedgerHash]),
      verdict: fieldVerdict(rootFailure),
      failure_code: rootFailure,
    },
    {
      field: "conservation_pullback_hash",
      required_content: "conservation-pullback hash on the same action-increment row",
      current_reading: firstPresent([actionRowConservationPullbackHash, optionConservationPullbackHash]),
      verdict: fieldVerdict(conservationFailure),
      failure_code: conservationFailure,
    },
    {
      field: "negative_control_ref",
      required_content: "fail-closed control showing mismatched root or conservation hashes reject",
      current_reading: optionNegativeControlRef,
      verdict: fieldVerdict(optionNegativeControlRef === null ? "negative_control_ref" : null),
      failure_code: optionNegativeControlRef === null ? "negative_control_ref" : null,
    },
  ];

  const firstBlockingField = fields.find((field) => field.failure_code !== null) ?? null;

  return {
    schema: SOURCE_ACCEPTANCE_CONTRACT_SCHEMA,
    claim_scope: "priority-only rank-2 source-row acceptance contract",
    status: firstBlockingField === null ? "satisfied" : "blocked",
    packet_promotion_status: promotionStatus,
    first_blocking_field: firstBlockingField?.field ?? null,
    first_blocking_failure_code: firstBlockingField?.failure_code ?? null,
    same_record_required: true,
    fields,
    not_authorized: [
      "does not create a non-fixture accepted_transition_source",
      "does not run field_speed_action_self_hit_scan/v0",
      "does not authorize candidate_h_recovery",
    ],
  };
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
  const actionRowBranchCertificateRef = rowField(selectedRow, "branch_certificate_ref");
  const actionRowRootLedgerHash = recordMissingOrMismatch({
    missing,
    row: selectedRow,
    field: "root_ledger_hash",
    optionValue: options.rootLedgerHash,
    optionField: "root_ledger_hash",
    missingRowCode: "action_row_root_ledger_hash",
    mismatchCode: "root_ledger_hash_mismatch",
  });
  const actionRowConservationPullbackHash = recordMissingOrMismatch({
    missing,
    row: selectedRow,
    field: "conservation_pullback_hash",
    optionValue: options.conservationPullbackHash,
    optionField: "conservation_pullback_hash",
    missingRowCode: "action_row_conservation_pullback_hash",
    mismatchCode: "conservation_pullback_hash_mismatch",
  });

  if (!isNonemptyString(options.branchCertificateRef)) {
    missing.push("branch_certificate_ref");
  }
  if (actionRowBranchCertificateRef === null) {
    missing.push("action_row_branch_certificate_ref");
  } else if (
    isNonemptyString(options.branchCertificateRef) &&
    actionRowBranchCertificateRef !== options.branchCertificateRef.trim()
  ) {
    missing.push("branch_certificate_ref_mismatch");
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

  const orderedMissing = orderedUniqueFailures(missing);
  const sourceAcceptanceContract = buildSourceAcceptanceContract({
    packetDir,
    selectedRow,
    rowStatus,
    promotionStatus,
    fixtureShapeOnly,
    actionRowBranchCertificateRef,
    actionRowRootLedgerHash,
    actionRowConservationPullbackHash,
    options,
  });
  const acceptedTransitionSource = orderedMissing.length === 0;
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
    action_row_branch_certificate_ref: actionRowBranchCertificateRef,
    root_ledger_hash: options.rootLedgerHash ?? null,
    action_row_root_ledger_hash: actionRowRootLedgerHash,
    conservation_pullback_hash: options.conservationPullbackHash ?? null,
    action_row_conservation_pullback_hash: actionRowConservationPullbackHash,
    negative_control_ref: options.negativeControlRef ?? null,
    packet_promotion_status: promotionStatus,
    fixture_shape_only: fixtureShapeOnly,
    same_record_binding: acceptedTransitionSource,
    source_acceptance_contract: sourceAcceptanceContract,
    first_required_source_field: sourceAcceptanceContract.first_blocking_field,
    first_missing_or_rejected_field: orderedMissing[0] ?? null,
    first_missing_or_rejected_failure_code:
      sourceAcceptanceContract.first_blocking_failure_code ?? orderedMissing[0] ?? null,
    missing_or_rejected_fields: orderedMissing,
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
