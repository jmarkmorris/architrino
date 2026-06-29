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
const REQUIRED_SOURCE_RECORD_ID = "theta_sea_branch_q0_v0";
const ACCEPTED_EVENT_PROOF_OBJECT_ROLE = "wake_history_derivation_proof_object";

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
    event_evidence_rows: [],
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

function eventEvidenceById(input, rowId) {
  return (input.event_evidence_rows ?? []).find((entry) => entry?.row_id === rowId) ?? null;
}

function acceptedEvidenceAttempted(evidence) {
  return (
    evidence?.accepted_for_wake_history_closure === true ||
    evidence?.evidence_level === "accepted_for_wake_history_closure"
  );
}

function acceptedEvidenceMismatches(input, rowId, rowPresent) {
  const evidence = eventEvidenceById(input, rowId);
  const proofObject = evidence?.derivation_proof_object ?? {};
  const checks = [
    { field: "row_present", ok: rowPresent },
    {
      field: "event_evidence.accepted_for_wake_history_closure",
      ok: evidence?.accepted_for_wake_history_closure === true,
    },
    {
      field: "event_evidence.evidence_level",
      ok: evidence?.evidence_level === "accepted_for_wake_history_closure",
    },
    {
      field: "event_evidence.accepted_evidence_id",
      ok:
        typeof evidence?.accepted_evidence_id === "string" &&
        evidence.accepted_evidence_id.length > 0,
    },
    {
      field: "event_evidence.derivation_proof_object.role",
      ok: proofObject.role === ACCEPTED_EVENT_PROOF_OBJECT_ROLE,
    },
    {
      field: "event_evidence.derivation_proof_object.accepted_evidence_id",
      ok:
        typeof evidence?.accepted_evidence_id === "string" &&
        proofObject.accepted_evidence_id === evidence.accepted_evidence_id,
    },
    {
      field: "event_evidence.derivation_proof_object.row_id",
      ok: proofObject.row_id === rowId,
    },
    {
      field: "event_evidence.derivation_proof_object.source_record_id",
      ok: proofObject.source_record_id === evidence?.source_record_id,
    },
    {
      field: "event_evidence.derivation_proof_object.status",
      ok: proofObject.status === "accepted",
    },
    {
      field: "event_evidence.source_record_id",
      ok: evidence?.source_record_id === REQUIRED_SOURCE_RECORD_ID,
    },
    {
      field: "event_evidence.event_ledger_id",
      ok: evidence?.event_ledger_id === input.event_ledger?.ledger_id,
    },
  ];
  return checks.filter((entry) => !entry.ok).map((entry) => entry.field);
}

function eventEvidenceSummaryForRow(input, rowId, rowPresent) {
  const evidence = eventEvidenceById(input, rowId);
  const attempted = acceptedEvidenceAttempted(evidence);
  const mismatches = attempted ? acceptedEvidenceMismatches(input, rowId, rowPresent) : [];
  const accepted = attempted && mismatches.length === 0;
  return {
    evidence_level: accepted
      ? "accepted_for_wake_history_closure"
      : attempted
      ? "accepted_evidence_contract_mismatch"
      : rowPresent
      ? "source_record_event_ledger_declared"
      : "missing",
    accepted_evidence_contract_attempted: attempted,
    accepted_evidence_mismatches: mismatches,
    accepted_for_wake_history_closure: accepted,
  };
}

function evaluateRows(input) {
  const rows = input.event_ledger?.rows ?? [];
  return REQUIRED_EVENT_ROWS.map((rowId) => {
    const rowPresent = rows.includes(rowId);
    const evidenceSummary = eventEvidenceSummaryForRow(input, rowId, rowPresent);
    return row(
      rowId,
      `${rowId} is present in the retained event ledger`,
      rowPresent,
      "event.ledger_residual",
      {
        event_ledger_id: input.event_ledger?.ledger_id ?? null,
        ...evidenceSummary,
      }
    );
  });
}

function acceptedEvidenceSummary(eventRows) {
  const rowEvidence = REQUIRED_EVENT_ROWS.map((rowId) => {
    const eventRow = eventRows.find((entry) => entry.row_id === rowId);
    return {
      row_id: rowId,
      evidence_level: eventRow?.evidence_level ?? "missing",
      accepted_evidence_contract_attempted:
        eventRow?.accepted_evidence_contract_attempted === true,
      accepted_evidence_mismatches:
        eventRow?.accepted_evidence_mismatches ?? [],
      accepted_for_wake_history_closure:
        eventRow?.accepted_for_wake_history_closure === true,
    };
  });
  const countsByEvidenceLevel = {};
  for (const entry of rowEvidence) {
    countsByEvidenceLevel[entry.evidence_level] =
      (countsByEvidenceLevel[entry.evidence_level] ?? 0) + 1;
  }
  const acceptedRowCount = rowEvidence.filter(
    (entry) => entry.accepted_for_wake_history_closure
  ).length;
  return {
    required_row_count: REQUIRED_EVENT_ROWS.length,
    accepted_row_count: acceptedRowCount,
    accepted_for_wake_history_closure:
      acceptedRowCount === REQUIRED_EVENT_ROWS.length,
    counts_by_evidence_level: countsByEvidenceLevel,
    row_evidence: rowEvidence,
  };
}

export function buildEventWakeHistoryPullbackDiagnostic(input = buildDefaultEventWakeHistoryPullbackInput()) {
  const eventRows = evaluateRows(input);
  const sourceRecordOk = input.source_record_id === REQUIRED_SOURCE_RECORD_ID;
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
  const acceptedSummary = acceptedEvidenceSummary(eventRows);

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
    accepted_evidence_summary: acceptedSummary,
    event_rows: [
      row(
        "source_record_id",
        "event wake-history rows use the retained Noether sea source record",
        sourceRecordOk,
        "residual.provenance_gap",
        { required_source_record_id: REQUIRED_SOURCE_RECORD_ID }
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
      accepted_event_evidence_for_closure:
        acceptedSummary.accepted_for_wake_history_closure,
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

function sameStringArray(left, right) {
  const leftStable = Array.isArray(left) ? left : [];
  const rightStable = Array.isArray(right) ? right : [];
  return (
    leftStable.length === rightStable.length &&
    leftStable.every((value, index) => value === rightStable[index])
  );
}

function validateAcceptedEvidenceSummary(artifact, errors) {
  const summary = artifact.accepted_evidence_summary;
  assertField(summary && typeof summary === "object" && !Array.isArray(summary), "accepted_evidence_summary must be an object", errors);
  if (!summary || typeof summary !== "object" || Array.isArray(summary)) {
    return;
  }
  assertField(summary.required_row_count === REQUIRED_EVENT_ROWS.length, "accepted_evidence_summary.required_row_count must match required event rows", errors);
  assertField(Array.isArray(summary.row_evidence), "accepted_evidence_summary.row_evidence must be an array", errors);
  if (!Array.isArray(summary.row_evidence) || !Array.isArray(artifact.event_rows)) {
    return;
  }

  let acceptedRowCount = 0;
  for (const rowId of REQUIRED_EVENT_ROWS) {
    const eventRow = artifact.event_rows.find((entry) => entry.row_id === rowId);
    const evidence = summary.row_evidence.find((entry) => entry.row_id === rowId);
    assertField(Boolean(evidence), `accepted_evidence_summary.row_evidence must include ${rowId}`, errors);
    if (!evidence) {
      continue;
    }
    const rowEvidenceLevel = eventRow?.evidence_level ?? "missing";
    const rowAccepted = eventRow?.accepted_for_wake_history_closure === true;
    const rowAttempted = eventRow?.accepted_evidence_contract_attempted === true;
    const rowMismatches = eventRow?.accepted_evidence_mismatches ?? [];
    if (evidence.accepted_for_wake_history_closure === true) {
      acceptedRowCount += 1;
    }
    assertField(evidence.evidence_level === rowEvidenceLevel, `${rowId} accepted evidence level must match event row`, errors);
    assertField(evidence.accepted_for_wake_history_closure === rowAccepted, `${rowId} accepted flag must match event row`, errors);
    assertField(evidence.accepted_evidence_contract_attempted === rowAttempted, `${rowId} accepted attempt flag must match event row`, errors);
    assertField(sameStringArray(evidence.accepted_evidence_mismatches, rowMismatches), `${rowId} accepted mismatches must match event row`, errors);
  }

  assertField(summary.accepted_row_count === acceptedRowCount, "accepted_evidence_summary.accepted_row_count must match row evidence", errors);
  assertField(
    summary.accepted_for_wake_history_closure === (acceptedRowCount === REQUIRED_EVENT_ROWS.length),
    "accepted_evidence_summary.accepted_for_wake_history_closure must match accepted row count",
    errors
  );
  assertField(
    artifact.result?.accepted_event_evidence_for_closure === summary.accepted_for_wake_history_closure,
    "result.accepted_event_evidence_for_closure must match accepted_evidence_summary",
    errors
  );
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
  validateAcceptedEvidenceSummary(artifact, errors);

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
          accepted_evidence_summary: [
            "row_evidence",
            "counts_by_evidence_level",
            "accepted_evidence_contract_attempted",
            "accepted_evidence_mismatches",
            "derivation_proof_object",
            "accepted_for_wake_history_closure",
          ],
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
