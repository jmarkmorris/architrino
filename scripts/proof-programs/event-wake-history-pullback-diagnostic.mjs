#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildDefaultNoetherSeaCompatibilityHandoffInput,
} from "./noether-sea-compatibility-handoff-diagnostic.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const EVENT_WAKE_HISTORY_PULLBACK_SCHEMA =
  "aaa-proof/event-wake-history-pullback-diagnostic/v1";

const PACKET_ID = "event_wake_history_pullback_diagnostic";
const PROMOTION_STATUS = "priority-only diagnostic";
const REQUIRED_EVENT_ROWS = ["energy_wake", "momentum_wake", "angular_momentum_wake", "medium_update"];

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function sameArray(left, right) {
  const leftStable = Array.isArray(left) ? left.map(String).sort() : [];
  const rightStable = Array.isArray(right) ? right.map(String).sort() : [];
  return leftStable.length === rightStable.length && leftStable.every((value, index) => value === rightStable[index]);
}

function row(rowId, zeroCondition, passed, failureCode, details = {}) {
  return {
    row_id: rowId,
    zero_condition: zeroCondition,
    status: passed ? "pass" : "fail",
    failure_code: passed ? null : failureCode,
    ...details,
  };
}

export function buildDefaultEventWakeHistoryPullbackInput() {
  const sourceRecord = buildDefaultNoetherSeaCompatibilityHandoffInput().retained_branch_source_record;
  return {
    source_record_id: sourceRecord.record_id,
    event_ledger: deepClone(sourceRecord.event_ledger),
    expected_rows: REQUIRED_EVENT_ROWS,
  };
}

export function applyEventWakeHistoryControl(input, controlName) {
  const packet = deepClone(input);
  if (!controlName || controlName === "none") {
    return packet;
  }
  if (controlName === "missing-angular-momentum-row") {
    packet.event_ledger.rows = packet.event_ledger.rows.filter((rowId) => rowId !== "angular_momentum_wake");
    return packet;
  }
  if (controlName === "source-record-mismatch") {
    packet.source_record_id = "theta_sea_branch_q1_v0";
    return packet;
  }
  throw new Error(`unknown control: ${controlName}`);
}

function evaluateRows(input) {
  const rows = input.event_ledger?.rows ?? [];
  return REQUIRED_EVENT_ROWS.map((rowId) =>
    row(
      rowId,
      `${rowId} is present in the retained event ledger`,
      rows.includes(rowId),
      "event.ledger_residual",
      {
        event_ledger_id: input.event_ledger?.ledger_id ?? null,
      }
    )
  );
}

export function buildEventWakeHistoryPullbackDiagnostic(input = buildDefaultEventWakeHistoryPullbackInput()) {
  const eventRows = evaluateRows(input);
  const sourceRecordOk = input.source_record_id === "theta_sea_branch_q0_v0";
  const expectedRowsOk = sameArray(input.expected_rows, REQUIRED_EVENT_ROWS);
  const eventRowsOk = eventRows.every((entry) => entry.status === "pass");
  const failedRows = eventRows.filter((entry) => entry.status === "fail");
  if (!sourceRecordOk) {
    failedRows.unshift({ row_id: "source_record_id", failure_code: "residual.provenance_gap" });
  }
  if (!expectedRowsOk) {
    failedRows.unshift({ row_id: "expected_rows", failure_code: "event.ledger_residual" });
  }
  const boundaryClosed = sourceRecordOk && expectedRowsOk && eventRowsOk;

  return {
    schema: EVENT_WAKE_HISTORY_PULLBACK_SCHEMA,
    artifact_schema: EVENT_WAKE_HISTORY_PULLBACK_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    claim_level:
      "diagnostic-only priority artifact; does not close the action boundary, retain a branch, or update a validation gate",
    source_record_id: input.source_record_id,
    event_ledger_id: input.event_ledger?.ledger_id ?? null,
    boundary_status: boundaryClosed ? "closed" : "failed",
    residual_norm: boundaryClosed ? 0 : null,
    row_refs: input.event_ledger?.rows ?? [],
    event_rows: [
      row(
        "source_record_id",
        "event wake-history rows use the retained Noether sea source record",
        sourceRecordOk,
        "residual.provenance_gap",
        { required_source_record_id: "theta_sea_branch_q0_v0" }
      ),
      row(
        "expected_rows",
        "expected wake-history rows are declared before closure is claimed",
        expectedRowsOk,
        "event.ledger_residual",
        { expected_rows: REQUIRED_EVENT_ROWS, declared_rows: input.expected_rows ?? [] }
      ),
      ...eventRows,
    ],
    result: {
      diagnostic_status: boundaryClosed ? "diagnostic_passed_priority_only" : "diagnostic_failed",
      retained_branch: false,
      updates_live_validation_gate: false,
      failure_code: failedRows[0]?.failure_code ?? null,
      first_failed_row: failedRows[0]?.row_id ?? null,
      first_failure_status:
        failedRows[0]?.failure_code ?? "event_wake_history_pullback_compatible_priority_only",
      strongest_artifact:
        "same-source event wake-history pullback diagnostic for energy, momentum, angular-momentum, and medium-update rows",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateEventWakeHistoryPullbackArtifact(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(artifact.schema === EVENT_WAKE_HISTORY_PULLBACK_SCHEMA, `schema must be ${EVENT_WAKE_HISTORY_PULLBACK_SCHEMA}`, errors);
  assertField(artifact.artifact_schema === EVENT_WAKE_HISTORY_PULLBACK_SCHEMA, `artifact_schema must be ${EVENT_WAKE_HISTORY_PULLBACK_SCHEMA}`, errors);
  assertField(artifact.packet_id === PACKET_ID, `packet_id must be ${PACKET_ID}`, errors);
  assertField(artifact.promotion_status === PROMOTION_STATUS, `promotion_status must be ${PROMOTION_STATUS}`, errors);
  assertField(artifact.result?.retained_branch === false, "artifact must declare retained_branch=false", errors);
  assertField(artifact.result?.updates_live_validation_gate === false, "artifact must not update a live validation gate", errors);
  assertField(Array.isArray(artifact.event_rows), "event_rows must be an array", errors);

  if (Array.isArray(artifact.event_rows)) {
    const rowIds = artifact.event_rows.map((entry) => entry.row_id);
    for (const rowId of ["source_record_id", "expected_rows", ...REQUIRED_EVENT_ROWS]) {
      assertField(rowIds.includes(rowId), `event_rows must include ${rowId}`, errors);
    }
    const failedRows = artifact.event_rows.filter((entry) => entry.status === "fail");
    assertField(
      artifact.result?.diagnostic_status ===
        (failedRows.length === 0 ? "diagnostic_passed_priority_only" : "diagnostic_failed"),
      "result.diagnostic_status must match event row failures",
      errors
    );
    assertField(
      artifact.result?.failure_code === (failedRows[0]?.failure_code ?? null),
      "result.failure_code must match first failed row",
      errors
    );
  }

  return errors;
}

function usage() {
  return [
    "Usage: node scripts/proof-programs/event-wake-history-pullback-diagnostic.mjs [options]",
    "",
    "Options:",
    "  --input <path>       Read event pullback input JSON instead of the default fixture",
    "  --control <name>     Apply a negative control: missing-angular-momentum-row, source-record-mismatch",
    "  --out <path>         Write artifact JSON to path instead of stdout",
    "  --validate <path>    Validate an existing diagnostic artifact JSON file",
    "  --schema             Print the artifact schema identifier",
    "  --pretty             Pretty-print JSON output",
    "  --help               Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    input: null,
    control: null,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") {
      args.input = argv[++index];
    } else if (arg === "--control") {
      args.control = argv[++index];
    } else if (arg === "--out") {
      args.out = argv[++index];
    } else if (arg === "--validate") {
      args.validate = argv[++index];
    } else if (arg === "--schema") {
      args.schema = true;
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

function printJson(value, pretty) {
  return `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }
  if (args.schema) {
    process.stdout.write(
      printJson(
        {
          schema: "aaa-proof/event-wake-history-pullback-diagnostic-schema/v1",
          artifact_schema: EVENT_WAKE_HISTORY_PULLBACK_SCHEMA,
          promotion_status: PROMOTION_STATUS,
          packet_id: PACKET_ID,
          controls: ["missing-angular-momentum-row", "source-record-mismatch"],
        },
        args.pretty
      )
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors = validateEventWakeHistoryPullbackArtifact(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          result: artifact.result ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const baseInput = args.input
    ? JSON.parse(fs.readFileSync(args.input, "utf8"))
    : buildDefaultEventWakeHistoryPullbackInput();
  const input = args.control ? applyEventWakeHistoryControl(baseInput, args.control) : baseInput;
  const artifact = buildEventWakeHistoryPullbackDiagnostic(input);
  const output = printJson(artifact, args.pretty);
  if (args.out) {
    fs.mkdirSync(path.dirname(args.out), { recursive: true });
    fs.writeFileSync(args.out, output);
  } else {
    process.stdout.write(output);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
