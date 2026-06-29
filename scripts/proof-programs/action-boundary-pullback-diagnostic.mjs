#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildDefaultNoetherSeaCompatibilityHandoffInput,
} from "./noether-sea-compatibility-handoff-diagnostic.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const ACTION_BOUNDARY_PULLBACK_SCHEMA =
  "aaa-proof/action-boundary-pullback-diagnostic/v1";

const PACKET_ID = "action_boundary_pullback_diagnostic";
const PROMOTION_STATUS = "priority-only diagnostic";
const REQUIRED_ACTION_ROWS = [
  "action_endpoint_row",
  "action_multiplier_row",
  "eta_regulator_row",
  "epsilon_c_core_row",
];

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
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

function sameNumber(left, right, tolerance = 1e-12) {
  return Number.isFinite(left) && Number.isFinite(right) && Math.abs(left - right) <= tolerance;
}

export function buildDefaultActionBoundaryPullbackInput() {
  const sourceRecord = buildDefaultNoetherSeaCompatibilityHandoffInput().retained_branch_source_record;
  return {
    source_record_id: sourceRecord.record_id,
    regulator_state: deepClone(sourceRecord.regulator_state),
    action_rows: [],
    expected_rows: REQUIRED_ACTION_ROWS,
  };
}

export function buildSyntheticActionBoundaryPullbackInput() {
  const input = buildDefaultActionBoundaryPullbackInput();
  return {
    ...input,
    action_rows: REQUIRED_ACTION_ROWS,
  };
}

export function applyActionBoundaryControl(input, controlName) {
  const packet = deepClone(input);
  if (!controlName || controlName === "none") {
    return packet;
  }
  if (controlName === "source-record-mismatch") {
    packet.source_record_id = "theta_sea_branch_q1_v0";
    return packet;
  }
  if (controlName === "regulator-mismatch") {
    packet.regulator_state.eta = 0.04;
    return packet;
  }
  if (controlName === "missing-multiplier-row") {
    packet.action_rows = packet.action_rows.filter((rowId) => rowId !== "action_multiplier_row");
    return packet;
  }
  throw new Error(`unknown control: ${controlName}`);
}

function evaluateRows(input) {
  const declaredRows = input.action_rows ?? [];
  return REQUIRED_ACTION_ROWS.map((rowId) =>
    row(
      rowId,
      `${rowId} is present in the retained action boundary packet`,
      declaredRows.includes(rowId),
      "residual.provenance_gap"
    )
  );
}

export function buildActionBoundaryPullbackDiagnostic(input = buildDefaultActionBoundaryPullbackInput()) {
  const sourceRecord = buildDefaultNoetherSeaCompatibilityHandoffInput().retained_branch_source_record;
  const actionRows = evaluateRows(input);
  const sourceRecordOk = input.source_record_id === sourceRecord.record_id;
  const etaOk = sameNumber(input.regulator_state?.eta, sourceRecord.regulator_state.eta);
  const epsilonOk = sameNumber(input.regulator_state?.epsilon_c, sourceRecord.regulator_state.epsilon_c);
  const statusOk = input.regulator_state?.status === sourceRecord.regulator_state.status;
  const expectedRowsOk =
    Array.isArray(input.expected_rows) &&
    REQUIRED_ACTION_ROWS.every((rowId) => input.expected_rows.includes(rowId));
  const actionRowsOk = actionRows.every((entry) => entry.status === "pass");
  const boundaryClosed = sourceRecordOk && etaOk && epsilonOk && statusOk && expectedRowsOk && actionRowsOk;
  const diagnosticRows = [
    row(
      "source_record_id",
      "action boundary rows use the retained Noether sea source record",
      sourceRecordOk,
      "residual.provenance_gap",
      { required_source_record_id: sourceRecord.record_id }
    ),
    row(
      "regulator_state",
      "action boundary rows use the retained eta and epsilon_c regulator state",
      etaOk && epsilonOk && statusOk,
      "residual.provenance_gap",
      { required_regulator_state: sourceRecord.regulator_state, declared_regulator_state: input.regulator_state ?? null }
    ),
    row(
      "expected_rows",
      "endpoint, multiplier, eta-regulator, and epsilon_c-core rows are declared before closure is claimed",
      expectedRowsOk,
      "residual.provenance_gap",
      { expected_rows: REQUIRED_ACTION_ROWS, declared_rows: input.expected_rows ?? [] }
    ),
    ...actionRows,
  ];
  const failedRows = diagnosticRows.filter((entry) => entry.status === "fail");

  return {
    schema: ACTION_BOUNDARY_PULLBACK_SCHEMA,
    artifact_schema: ACTION_BOUNDARY_PULLBACK_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    claim_level:
      "diagnostic-only priority artifact; default fixture names the missing action rows and does not prove action closure",
    source_record_id: input.source_record_id,
    boundary_status: boundaryClosed ? "closed" : "failed",
    residual_norm: boundaryClosed ? 0 : null,
    row_refs: input.action_rows ?? [],
    action_rows: diagnosticRows,
    result: {
      diagnostic_status: boundaryClosed ? "diagnostic_passed_priority_only" : "diagnostic_failed",
      retained_branch: false,
      updates_live_validation_gate: false,
      failure_code: failedRows[0]?.failure_code ?? null,
      first_failed_row: failedRows[0]?.row_id ?? null,
      first_failure_status:
        failedRows[0]?.failure_code ?? "action_boundary_pullback_compatible_priority_only",
      strongest_artifact:
        "same-source action boundary pullback diagnostic for endpoint, multiplier, eta-regulator, and epsilon_c-core rows",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateActionBoundaryPullbackArtifact(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(artifact.schema === ACTION_BOUNDARY_PULLBACK_SCHEMA, `schema must be ${ACTION_BOUNDARY_PULLBACK_SCHEMA}`, errors);
  assertField(artifact.artifact_schema === ACTION_BOUNDARY_PULLBACK_SCHEMA, `artifact_schema must be ${ACTION_BOUNDARY_PULLBACK_SCHEMA}`, errors);
  assertField(artifact.packet_id === PACKET_ID, `packet_id must be ${PACKET_ID}`, errors);
  assertField(artifact.promotion_status === PROMOTION_STATUS, `promotion_status must be ${PROMOTION_STATUS}`, errors);
  assertField(artifact.result?.retained_branch === false, "artifact must declare retained_branch=false", errors);
  assertField(artifact.result?.updates_live_validation_gate === false, "artifact must not update a live validation gate", errors);
  assertField(Array.isArray(artifact.action_rows), "action_rows must be an array", errors);

  if (Array.isArray(artifact.action_rows)) {
    const rowIds = artifact.action_rows.map((entry) => entry.row_id);
    for (const rowId of ["source_record_id", "regulator_state", "expected_rows", ...REQUIRED_ACTION_ROWS]) {
      assertField(rowIds.includes(rowId), `action_rows must include ${rowId}`, errors);
    }
    const failedRows = artifact.action_rows.filter((entry) => entry.status === "fail");
    assertField(
      artifact.result?.diagnostic_status ===
        (failedRows.length === 0 ? "diagnostic_passed_priority_only" : "diagnostic_failed"),
      "result.diagnostic_status must match action row failures",
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
    "Usage: node scripts/proof-programs/action-boundary-pullback-diagnostic.mjs [options]",
    "",
    "Options:",
    "  --input <path>       Read action boundary input JSON instead of the default fail-closed fixture",
    "  --control <name>     Apply a negative control: source-record-mismatch, regulator-mismatch, missing-multiplier-row",
    "  --synthetic-closed   Build a synthetic closed fixture for row-logic tests",
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
    syntheticClosed: false,
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
    } else if (arg === "--synthetic-closed") {
      args.syntheticClosed = true;
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
          schema: "aaa-proof/action-boundary-pullback-diagnostic-schema/v1",
          artifact_schema: ACTION_BOUNDARY_PULLBACK_SCHEMA,
          promotion_status: PROMOTION_STATUS,
          packet_id: PACKET_ID,
          controls: ["source-record-mismatch", "regulator-mismatch", "missing-multiplier-row"],
        },
        args.pretty
      )
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors = validateActionBoundaryPullbackArtifact(artifact);
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
    : args.syntheticClosed
      ? buildSyntheticActionBoundaryPullbackInput()
      : buildDefaultActionBoundaryPullbackInput();
  const input = args.control ? applyActionBoundaryControl(baseInput, args.control) : baseInput;
  const artifact = buildActionBoundaryPullbackDiagnostic(input);
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
