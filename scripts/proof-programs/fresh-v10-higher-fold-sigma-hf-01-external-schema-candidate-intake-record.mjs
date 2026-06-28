#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const PROOF_INTERVAL = "proof-interval-v6";
const LAMBDA_BRANCH = "lambda0305";
const TARGET_SLOT = "Sigma_hf_01";
const FOLD_INTERVAL = "F01";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const OUTPUT_STEM =
  "sigma_hf_01_external_schema_candidate_intake_record.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305";
const OUTPUT_JSON = `${OUTPUT_STEM}.json`;
const OUTPUT_REPORT = `${OUTPUT_STEM}_report.md`;

const REQUIRED_FIELDS = [
  "compatible_schema_role_lock",
  "compatible_proof_object_role_lock",
  "derivation_proof_target_lock",
  "derivation_proof_source_data_record_lock",
  "rule_kernel_obligation_binding",
  "rule_kernel_derivation_payload_target_binding",
  "proof_grade_derivation_schema_statement",
  "non_reinterpretation_guard",
];

const EXPECTED_LOCKS = {
  packet_id: PACKET_ID,
  proof_interval: PROOF_INTERVAL,
  lambda_branch: LAMBDA_BRANCH,
  target_slot: TARGET_SLOT,
  fold_interval: FOLD_INTERVAL,
};

function parseArgs(argv) {
  const args = {
    candidate: null,
    outDir: CERT_DIR,
    validate: null,
    pretty: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--candidate") {
      args.candidate = argv[++i];
    } else if (arg === "--out-dir") {
      args.outDir = argv[++i];
    } else if (arg === "--validate") {
      args.validate = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-sigma-hf-01-external-schema-candidate-intake-record.mjs [options]

Options:
  --candidate PATH  Optional candidate external schema JSON to test against the Sigma_hf_01 intake predicate.
  --out-dir PATH    Output directory. Defaults to ${CERT_DIR}.
  --validate PATH   Validate an emitted Sigma_hf_01 intake record.
  --pretty          Pretty-print JSON output.
  --help            Show this help.

Default mode emits the current fail-closed absent-input record plus a Markdown
report. A complete candidate can only move the separator slot to schema
validation intake; it does not consume rows or authorize a branch chart.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value, pretty) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`);
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
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

function lockMismatch(candidate) {
  return Object.entries(EXPECTED_LOCKS)
    .filter(([key, expected]) => candidate[key] !== undefined && candidate[key] !== expected)
    .map(([key, expected]) => ({ key, expected, actual: candidate[key] }));
}

export function buildRecord(candidate = null, options = {}) {
  const candidateInput = candidate && isObject(candidate) ? candidate : {};
  const mismatches = lockMismatch(candidateInput);
  const candidateRef =
    options.candidateRef ?? candidateInput.candidate_external_schema_ref ?? candidateInput.source_ref ?? null;
  const candidateReceived = candidateRef !== null && mismatches.length === 0;
  const fieldResults = REQUIRED_FIELDS.map((field) => ({
    field,
    present: present(candidateInput[field]),
    verdict: present(candidateInput[field]) ? "present_for_schema_validation" : "external_input_required",
  }));
  const presentCount = fieldResults.filter((field) => field.present).length;
  const missingFields = fieldResults.filter((field) => !field.present).map((field) => field.field);
  const allFieldsPresent = presentCount === REQUIRED_FIELDS.length;
  const slotResult =
    candidateReceived && allFieldsPresent
      ? "external_schema_input_received_for_schema_validation"
      : "external_input_required";

  return {
    schema: "sigma_hf_01_external_schema_candidate_intake_record/v0",
    packet_id: PACKET_ID,
    proof_interval: PROOF_INTERVAL,
    lambda_branch: LAMBDA_BRANCH,
    target_slot: TARGET_SLOT,
    fold_interval: FOLD_INTERVAL,
    candidate_external_schema_ref: candidateRef,
    candidate_external_schema_received: candidateReceived,
    required_fields_total: REQUIRED_FIELDS.length,
    required_fields_present: presentCount,
    missing_fields: missingFields,
    lock_mismatches: mismatches,
    field_results: fieldResults,
    slot_result: slotResult,
    row_slots_parked: 11,
    row_consumption_count: 0,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    authorization: {
      schema_validation_intake: slotResult === "external_schema_input_received_for_schema_validation",
      row_consumption: false,
      accepted_source_packet: false,
      branch_chart: false,
    },
  };
}

export function validationErrors(record) {
  const errors = [];
  if (!isObject(record)) {
    return ["record must be an object"];
  }
  if (record.schema !== "sigma_hf_01_external_schema_candidate_intake_record/v0") {
    errors.push("schema must be sigma_hf_01_external_schema_candidate_intake_record/v0");
  }
  for (const [key, expected] of Object.entries(EXPECTED_LOCKS)) {
    if (record[key] !== expected) {
      errors.push(`${key} must be ${expected}`);
    }
  }
  if (record.required_fields_total !== REQUIRED_FIELDS.length) {
    errors.push(`required_fields_total must be ${REQUIRED_FIELDS.length}`);
  }
  if (!Number.isInteger(record.required_fields_present) || record.required_fields_present < 0) {
    errors.push("required_fields_present must be a nonnegative integer");
  }
  if (!["external_input_required", "external_schema_input_received_for_schema_validation"].includes(record.slot_result)) {
    errors.push("slot_result is not recognized");
  }
  if (record.row_slots_parked !== 11) {
    errors.push("row_slots_parked must remain 11");
  }
  if (record.row_consumption_count !== 0) {
    errors.push("row_consumption_count must remain 0");
  }
  if (record.preledger_pass !== false || record.updates_live_ledger !== false) {
    errors.push("preledger/live-ledger locks must remain false");
  }
  if (record.branch_chart_authorized !== false) {
    errors.push("branch_chart_authorized must remain false");
  }
  if (record.authorization?.row_consumption !== false) {
    errors.push("authorization.row_consumption must remain false");
  }
  if (record.authorization?.accepted_source_packet !== false) {
    errors.push("authorization.accepted_source_packet must remain false");
  }
  if (record.authorization?.branch_chart !== false) {
    errors.push("authorization.branch_chart must remain false");
  }
  return errors;
}

function renderReport(record) {
  const rows = record.field_results
    .map((field) => `| \`${field.field}\` | ${field.present ? "present" : "absent"} | \`${field.verdict}\` |`)
    .join("\n");

  return `# Sigma_hf_01 External Schema Candidate Intake Record

Status: \`${record.slot_result}\`

## Scope

- Packet identity: \`${record.packet_id}\`
- Proof interval: \`${record.proof_interval}\`
- Lambda branch: \`${record.lambda_branch}\`
- Target slot: \`${record.target_slot}\`
- Fold interval: \`${record.fold_interval}\`
- Candidate external schema ref: ${record.candidate_external_schema_ref ? `\`${record.candidate_external_schema_ref}\`` : "absent"}

## Intake Predicate

| Required field | Current reading | Verdict |
| --- | --- | --- |
${rows}

Current count: ${record.required_fields_present} / ${record.required_fields_total} required fields present.

## Authorization Locks

- Slot result: \`${record.slot_result}\`
- Row slots parked: ${record.row_slots_parked}
- Row consumption count: ${record.row_consumption_count}
- \`preledger_pass\`: \`${record.preledger_pass}\`
- \`updates_live_ledger\`: \`${record.updates_live_ledger}\`
- Branch chart authorized: \`${record.branch_chart_authorized}\`

This record is priority-only. It does not construct an external schema, accept a source packet, consume rows, update the live ledger, or authorize a branch chart.
`;
}

function validateAndPrint(filePath) {
  const record = readJson(filePath);
  const errors = validationErrors(record);
  process.stdout.write(
    `${JSON.stringify(
      {
        valid: errors.length === 0,
        errors,
        slot_result: record.slot_result ?? null,
        required_fields_present: record.required_fields_present ?? null,
      },
      null,
      2,
    )}\n`,
  );
  process.exitCode = errors.length === 0 ? 0 : 1;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  if (args.validate) {
    validateAndPrint(args.validate);
    return;
  }

  const candidate = args.candidate ? readJson(args.candidate) : null;
  const record = buildRecord(candidate, { candidateRef: args.candidate ?? null });
  const errors = validationErrors(record);
  if (errors.length > 0) {
    throw new Error(`Generated invalid record: ${errors.join("; ")}`);
  }
  writeJson(path.join(args.outDir, OUTPUT_JSON), record, args.pretty);
  writeText(path.join(args.outDir, OUTPUT_REPORT), renderReport(record));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
