#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCHEMA = "torque_wake_same_row_diagnostic_report/v0";
const CANDIDATE_SCHEMA = "torque_wake_same_row_diagnostic/v0";

const REQUIRED_BINDING_FIELDS = [
  "source_report_ref",
  "selected_case_id",
  "route_root_key",
  "sampled_active_row_ids",
  "action_increment_row_ref",
  "active_root_ledger_hash",
  "conservation_pullback_hash",
  "torque_integrals_ref",
  "wake_energy_routing_ref",
  "event_ledger_convention_ref",
  "negative_control_ref",
];

function parseArgs(argv) {
  const args = {
    input: null,
    out: null,
    validate: null,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") {
      args.input = argv[++index];
    } else if (arg === "--out") {
      args.out = argv[++index];
    } else if (arg === "--validate") {
      args.validate = argv[++index];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/nested-shell-braid/torque-wake-same-row-diagnostic-report.mjs [options]

Options:
  --input PATH       Candidate torque/wake same-row diagnostic JSON.
  --validate PATH    Validate an emitted report.
  --out PATH         Write JSON output to a file instead of stdout.
  --pretty           Pretty-print JSON output.
  --help             Show this help.

This is a fail-closed priority-side bridge report. It records whether the
angular-momentum torque/wake diagnostic uses the same sampled active rows needed
by rank 2 and rank 6, but it never promotes candidate_h_recovery, a moving
retained branch certificate, a bounded-speed live ledger, or observer export.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
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

function nonemptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}

function stringArray(value) {
  return Array.isArray(value) ? value.filter((entry) => nonemptyString(entry)) : [];
}

function sameOrderedStrings(left, right) {
  if (left.length !== right.length) {
    return false;
  }
  return left.every((value, index) => value === right[index]);
}

function missingFields(candidate) {
  return REQUIRED_BINDING_FIELDS.filter((field) => !present(candidate[field]));
}

function rowBinding(candidate) {
  const activeRows = stringArray(candidate.sampled_active_row_ids);
  const forceRows = stringArray(candidate.force_row_ids);
  const partitionRows = stringArray(candidate.partition_row_ids);
  const torqueRows = stringArray(candidate.torque_row_ids);
  const wakeRows = stringArray(candidate.wake_row_ids);
  const arrays = [forceRows, partitionRows, torqueRows, wakeRows];
  const sameRows =
    activeRows.length > 0 && arrays.every((rows) => rows.length > 0 && sameOrderedStrings(activeRows, rows));

  return {
    same_row_id_binding: sameRows,
    activeRows,
    forceRows,
    partitionRows,
    torqueRows,
    wakeRows,
  };
}

function computeFirstFailure(candidate, binding, missing) {
  if (candidate.schema && candidate.schema !== CANDIDATE_SCHEMA) {
    return "candidate_schema_mismatch";
  }
  if (candidate.retained_branch !== false) {
    return "retained_branch_not_false";
  }
  if (!present(candidate.branch_certificate_ref)) {
    return "branch_certificate_ref_missing";
  }
  if (!binding.same_row_id_binding) {
    return "same_row_id_mismatch";
  }
  if (missing.length > 0) {
    return `${missing[0]}_missing`;
  }
  return "diagnostic_only_not_authorization_source";
}

function consumerStatus(firstFailure, retainedBranch) {
  return {
    rank2_field_speed_action_self_hit_scan: {
      required_source: "accepted_transition_source",
      status: "source_row_binding_open",
      first_failure: "source_row_binding_open",
      candidate_h_recovery_authorized: false,
      note:
        firstFailure === "diagnostic_only_not_authorization_source"
          ? "Same-row diagnostic fields are populated, but the object is not an accepted transition source."
          : "Diagnostic payload does not satisfy the accepted transition-source boundary.",
    },
    rank6_moving_retained_branch_certificate: {
      required_source: "moving_retained_branch_certificate/v0",
      status: "blocked_pending_accepted_branch_chart",
      first_failure: "blocked_pending_accepted_branch_chart",
      moving_retained_branch_certificate_authorized: false,
      note: "No accepted branch chart is supplied by the torque/wake diagnostic.",
    },
    rank5_bounded_speed_normal_reconstruction: {
      required_source: "bounded_speed_live_ledger",
      status: "bounded-speed-live-ledger-open",
      retained_branch: retainedBranch,
      bounded_speed_live_ledger_authorized: false,
      observer_export_authorized: false,
      note: "The diagnostic is explicitly below retained-branch and bounded-speed live-ledger closure.",
    },
  };
}

export function buildReport(candidate, options = {}) {
  if (!isObject(candidate)) {
    throw new Error("Candidate torque/wake same-row diagnostic must be a JSON object.");
  }

  const missing = missingFields(candidate);
  const binding = rowBinding(candidate);
  const retainedBranch = candidate.retained_branch === true;
  const firstFailure = computeFirstFailure(candidate, binding, missing);
  const sameRecordSourceBinding =
    binding.same_row_id_binding &&
    present(candidate.branch_certificate_ref) &&
    present(candidate.action_increment_row_ref) &&
    present(candidate.active_root_ledger_hash) &&
    present(candidate.conservation_pullback_hash) &&
    present(candidate.negative_control_ref);

  return {
    schema: SCHEMA,
    source_ref: options.sourceRef ?? candidate.source_ref ?? null,
    candidate_schema: candidate.schema ?? null,
    diagnostic_id: candidate.id ?? "tri-binary-torque-wake-same-row-diagnostic",
    promotion_status: "priority-only",
    source_report_ref: candidate.source_report_ref ?? null,
    selected_case_id: candidate.selected_case_id ?? null,
    route_root_key: candidate.route_root_key ?? null,
    retained_branch: retainedBranch,
    branch_certificate_ref: candidate.branch_certificate_ref ?? null,
    sampled_active_row_ids: binding.activeRows,
    force_row_ids: binding.forceRows,
    partition_row_ids: binding.partitionRows,
    torque_row_ids: binding.torqueRows,
    wake_row_ids: binding.wakeRows,
    same_row_id_binding: binding.same_row_id_binding,
    same_record_source_binding: sameRecordSourceBinding,
    action_increment_row_ref: candidate.action_increment_row_ref ?? null,
    active_root_ledger_hash: candidate.active_root_ledger_hash ?? null,
    conservation_pullback_hash: candidate.conservation_pullback_hash ?? null,
    torque_integrals_ref: candidate.torque_integrals_ref ?? null,
    wake_energy_routing_ref: candidate.wake_energy_routing_ref ?? null,
    event_ledger_convention_ref: candidate.event_ledger_convention_ref ?? null,
    negative_control_ref: candidate.negative_control_ref ?? null,
    missing_or_rejected_fields: [
      ...missing,
      ...(candidate.branch_certificate_ref ? [] : ["branch_certificate_ref"]),
      ...(binding.same_row_id_binding ? [] : ["same_row_id_binding"]),
    ],
    diagnostic_verdict: firstFailure,
    first_failure: firstFailure,
    retained_upgrade_required: {
      same_retained_active_row_ids: "missing",
      accepted_branch_chart: "missing",
      moving_branch_certificate: "missing",
    },
    consumer_status: consumerStatus(firstFailure, retainedBranch),
    authorization: {
      candidate_h_recovery: false,
      moving_retained_branch_certificate: false,
      bounded_speed_live_ledger: false,
      observer_export: false,
    },
    not_authorized: [
      "does not supply a non-fixture accepted_transition_source for field_speed_action_self_hit_scan/v0",
      "does not supply moving_retained_branch_certificate/v0",
      "does not certify a bounded-speed live ledger",
      "does not authorize observer export",
    ],
  };
}

export function validationErrors(report) {
  const errors = [];
  if (!isObject(report)) {
    return ["report must be an object"];
  }
  if (report.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (report.promotion_status !== "priority-only") {
    errors.push("promotion_status must remain priority-only");
  }
  if (!nonemptyString(report.diagnostic_id)) {
    errors.push("diagnostic_id must be a nonempty string");
  }
  if (!nonemptyString(report.first_failure)) {
    errors.push("first_failure must be a nonempty string");
  }
  if (report.retained_branch !== false) {
    errors.push("retained_branch must remain false");
  }
  if (typeof report.same_row_id_binding !== "boolean") {
    errors.push("same_row_id_binding must be boolean");
  }
  if (typeof report.same_record_source_binding !== "boolean") {
    errors.push("same_record_source_binding must be boolean");
  }
  if (!isObject(report.consumer_status)) {
    errors.push("consumer_status must be an object");
  }
  if (report.consumer_status?.rank2_field_speed_action_self_hit_scan?.candidate_h_recovery_authorized !== false) {
    errors.push("rank2 candidate_h_recovery_authorized must remain false");
  }
  if (
    report.consumer_status?.rank6_moving_retained_branch_certificate
      ?.moving_retained_branch_certificate_authorized !== false
  ) {
    errors.push("rank6 moving_retained_branch_certificate_authorized must remain false");
  }
  if (
    report.consumer_status?.rank5_bounded_speed_normal_reconstruction
      ?.bounded_speed_live_ledger_authorized !== false
  ) {
    errors.push("rank5 bounded_speed_live_ledger_authorized must remain false");
  }
  if (!isObject(report.authorization)) {
    errors.push("authorization must be an object");
  }
  for (const field of [
    "candidate_h_recovery",
    "moving_retained_branch_certificate",
    "bounded_speed_live_ledger",
    "observer_export",
  ]) {
    if (report.authorization?.[field] !== false) {
      errors.push(`${field} authorization must remain false`);
    }
  }
  return errors;
}

function writeOutput(value, args) {
  const body = `${JSON.stringify(value, null, args.pretty ? 2 : 0)}\n`;
  if (args.out) {
    fs.mkdirSync(path.dirname(args.out), { recursive: true });
    fs.writeFileSync(args.out, body);
  } else {
    process.stdout.write(body);
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  if (args.validate) {
    const report = readJson(args.validate);
    const errors = validationErrors(report);
    writeOutput(
      {
        valid: errors.length === 0,
        errors,
        diagnostic_id: report.diagnostic_id ?? null,
        diagnostic_verdict: report.diagnostic_verdict ?? null,
        first_failure: report.first_failure ?? null,
      },
      args,
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  if (!args.input) {
    throw new Error("--input is required unless --validate is used.");
  }
  const candidate = readJson(args.input);
  writeOutput(buildReport(candidate, { sourceRef: args.input }), args);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
