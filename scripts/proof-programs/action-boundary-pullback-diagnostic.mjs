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
const ACCEPTED_ACTION_PROOF_OBJECT_ROLE = "action_boundary_derivation_proof_object";
const REQUIRED_ACTION_ROW_CONTRACTS = {
  action_endpoint_row: {
    boundary_symbol: "\\partial_{\\mathrm{end}}S_{\\mathfrak B}^{(\\eta)}",
    contract_role: "endpoint exclusions and retained-window endpoint terms",
  },
  action_multiplier_row: {
    boundary_symbol: "\\lambda\\,\\partial G_{ij,n}",
    contract_role: "root-constraint multiplier work on the retained root ledger",
  },
  eta_regulator_row: {
    boundary_symbol: "\\partial_{\\eta}S_{\\mathfrak B}^{(\\eta)}",
    contract_role: "finite-eta source-path neighborhood contribution",
  },
  epsilon_c_core_row: {
    boundary_symbol: "\\partial_{\\epsilon_c}S_{\\mathfrak B}^{(\\eta)}",
    contract_role: "core/collision regularization contribution",
  },
};

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

function deepRegulator(regulator) {
  return {
    eta: regulator.eta,
    epsilon_c: regulator.epsilon_c,
    status: regulator.status,
  };
}

function buildActionRowContract(rowId, sourceRecord, evidenceLevel = "synthetic_row_logic") {
  const contract = REQUIRED_ACTION_ROW_CONTRACTS[rowId];
  return {
    row_id: rowId,
    evidence_level: evidenceLevel,
    source_record_id: sourceRecord.record_id,
    retained_chart_id: sourceRecord.retained_chart_id,
    retained_window_id: sourceRecord.retained_window.id,
    regulator_state: deepRegulator(sourceRecord.regulator_state),
    boundary_symbol: contract.boundary_symbol,
    contract_role: contract.contract_role,
  };
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
  const sourceRecord = buildDefaultNoetherSeaCompatibilityHandoffInput().retained_branch_source_record;
  return {
    ...input,
    action_rows: REQUIRED_ACTION_ROWS.map((rowId) =>
      buildActionRowContract(rowId, sourceRecord, "synthetic_row_logic")
    ),
  };
}

export function buildRegulatorOnlyActionBoundaryPullbackInput() {
  const input = buildDefaultActionBoundaryPullbackInput();
  const sourceRecord = buildDefaultNoetherSeaCompatibilityHandoffInput().retained_branch_source_record;
  return {
    ...input,
    action_rows: ["eta_regulator_row", "epsilon_c_core_row"].map((rowId) =>
      buildActionRowContract(rowId, sourceRecord, "source_record_regulator_declared")
    ),
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
    packet.action_rows = packet.action_rows.filter((actionRow) => actionRow.row_id !== "action_multiplier_row");
    return packet;
  }
  if (controlName === "endpoint-source-record-mismatch") {
    const endpoint = packet.action_rows.find((actionRow) => actionRow.row_id === "action_endpoint_row");
    if (endpoint) {
      endpoint.source_record_id = "theta_sea_branch_q1_v0";
    }
    return packet;
  }
  if (controlName === "eta-row-regulator-mismatch") {
    const etaRow = packet.action_rows.find((actionRow) => actionRow.row_id === "eta_regulator_row");
    if (etaRow) {
      etaRow.regulator_state.eta = 0.04;
    }
    return packet;
  }
  if (controlName === "epsilon-c-row-regulator-mismatch") {
    const epsilonRow = packet.action_rows.find((actionRow) => actionRow.row_id === "epsilon_c_core_row");
    if (epsilonRow) {
      epsilonRow.regulator_state.epsilon_c = 0.02;
    }
    return packet;
  }
  throw new Error(`unknown control: ${controlName}`);
}

function actionRowById(input, rowId) {
  return (input.action_rows ?? []).find((actionRow) => actionRow?.row_id === rowId) ?? null;
}

function evaluateActionRowContract(input, sourceRecord, rowId) {
  const declaredRow = actionRowById(input, rowId);
  const contract = REQUIRED_ACTION_ROW_CONTRACTS[rowId];
  const regulator = declaredRow?.regulator_state ?? {};
  const checks = [
    { field: "row_present", ok: Boolean(declaredRow) },
    { field: "evidence_level", ok: typeof declaredRow?.evidence_level === "string" },
    { field: "source_record_id", ok: declaredRow?.source_record_id === sourceRecord.record_id },
    { field: "retained_chart_id", ok: declaredRow?.retained_chart_id === sourceRecord.retained_chart_id },
    { field: "retained_window_id", ok: declaredRow?.retained_window_id === sourceRecord.retained_window.id },
    { field: "regulator_state.eta", ok: sameNumber(regulator.eta, sourceRecord.regulator_state.eta) },
    {
      field: "regulator_state.epsilon_c",
      ok: sameNumber(regulator.epsilon_c, sourceRecord.regulator_state.epsilon_c),
    },
    { field: "regulator_state.status", ok: regulator.status === sourceRecord.regulator_state.status },
    { field: "boundary_symbol", ok: declaredRow?.boundary_symbol === contract.boundary_symbol },
  ];
  const mismatches = checks.filter((entry) => !entry.ok).map((entry) => entry.field);
  const acceptedAttempted =
    declaredRow?.accepted_for_action_closure === true ||
    declaredRow?.evidence_level === "accepted_for_action_closure";
  const proofObject = declaredRow?.derivation_proof_object ?? {};
  const acceptedMismatches = acceptedAttempted
    ? [
        ...mismatches,
        ...(declaredRow?.accepted_for_action_closure === true
          ? []
          : ["accepted_for_action_closure"]),
        ...(declaredRow?.evidence_level === "accepted_for_action_closure"
          ? []
          : ["evidence_level"]),
        ...(typeof declaredRow?.accepted_evidence_id === "string" &&
        declaredRow.accepted_evidence_id.length > 0
          ? []
          : ["accepted_evidence_id"]),
        ...(proofObject.role === ACCEPTED_ACTION_PROOF_OBJECT_ROLE
          ? []
          : ["derivation_proof_object.role"]),
        ...(typeof declaredRow?.accepted_evidence_id === "string" &&
        proofObject.accepted_evidence_id === declaredRow.accepted_evidence_id
          ? []
          : ["derivation_proof_object.accepted_evidence_id"]),
        ...(proofObject.row_id === rowId ? [] : ["derivation_proof_object.row_id"]),
        ...(proofObject.source_record_id === declaredRow?.source_record_id
          ? []
          : ["derivation_proof_object.source_record_id"]),
        ...(proofObject.status === "accepted" ? [] : ["derivation_proof_object.status"]),
      ]
    : [];
  return row(
    rowId,
    `${rowId} matches the retained action boundary row contract`,
    mismatches.length === 0,
    "residual.provenance_gap",
    {
      boundary_symbol: contract.boundary_symbol,
      contract_role: contract.contract_role,
      evidence_level: declaredRow?.evidence_level ?? null,
      accepted_evidence_contract_attempted: acceptedAttempted,
      accepted_evidence_mismatches: acceptedMismatches,
      accepted_for_action_closure:
        acceptedAttempted && acceptedMismatches.length === 0,
      mismatches,
      checks,
    }
  );
}

function evaluateRows(input, sourceRecord) {
  return REQUIRED_ACTION_ROWS.map((rowId) => evaluateActionRowContract(input, sourceRecord, rowId));
}

function evidenceLevelSummary(actionRows) {
  return Object.fromEntries(
    REQUIRED_ACTION_ROWS.map((rowId) => {
      const actionRow = actionRows.find((entry) => entry.row_id === rowId);
      return [rowId, actionRow?.evidence_level ?? "missing"];
    })
  );
}

function acceptedEvidenceSummary(actionRows) {
  const rowEvidence = REQUIRED_ACTION_ROWS.map((rowId) => {
    const actionRow = actionRows.find((entry) => entry.row_id === rowId);
    return {
      row_id: rowId,
      evidence_level: actionRow?.evidence_level ?? "missing",
      accepted_evidence_contract_attempted:
        actionRow?.accepted_evidence_contract_attempted === true,
      accepted_evidence_mismatches:
        actionRow?.accepted_evidence_mismatches ?? [],
      accepted_for_action_closure:
        actionRow?.accepted_for_action_closure === true,
    };
  });
  const countsByEvidenceLevel = {};
  for (const entry of rowEvidence) {
    countsByEvidenceLevel[entry.evidence_level] =
      (countsByEvidenceLevel[entry.evidence_level] ?? 0) + 1;
  }
  const acceptedRowCount = rowEvidence.filter(
    (entry) => entry.accepted_for_action_closure
  ).length;
  return {
    required_row_count: REQUIRED_ACTION_ROWS.length,
    accepted_row_count: acceptedRowCount,
    accepted_for_action_closure: acceptedRowCount === REQUIRED_ACTION_ROWS.length,
    counts_by_evidence_level: countsByEvidenceLevel,
    row_evidence: rowEvidence,
  };
}

export function buildActionBoundaryPullbackDiagnostic(input = buildDefaultActionBoundaryPullbackInput()) {
  const sourceRecord = buildDefaultNoetherSeaCompatibilityHandoffInput().retained_branch_source_record;
  const actionRows = evaluateRows(input, sourceRecord);
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
  const acceptedSummary = acceptedEvidenceSummary(actionRows);

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
    row_refs: (input.action_rows ?? []).map((entry) => entry.row_id),
    evidence_level_summary: evidenceLevelSummary(actionRows),
    accepted_evidence_summary: acceptedSummary,
    action_rows: diagnosticRows,
    result: {
      diagnostic_status: boundaryClosed ? "diagnostic_passed_priority_only" : "diagnostic_failed",
      retained_branch: false,
      updates_live_validation_gate: false,
      accepted_action_evidence_for_closure:
        acceptedSummary.accepted_for_action_closure,
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
    for (const rowId of REQUIRED_ACTION_ROWS) {
      const actionRow = artifact.action_rows.find((entry) => entry.row_id === rowId);
      assertField(typeof actionRow?.boundary_symbol === "string", `${rowId} must include boundary_symbol`, errors);
      assertField(Object.hasOwn(actionRow ?? {}, "evidence_level"), `${rowId} must include evidence_level`, errors);
      assertField(Array.isArray(actionRow?.mismatches), `${rowId} must include mismatches`, errors);
      assertField(Array.isArray(actionRow?.checks), `${rowId} must include checks`, errors);
    }
  }

  return errors;
}

function usage() {
  return [
    "Usage: node scripts/proof-programs/action-boundary-pullback-diagnostic.mjs [options]",
    "",
    "Options:",
    "  --input <path>       Read action boundary input JSON instead of the default fail-closed fixture",
    "  --control <name>     Apply a negative control: source-record-mismatch, regulator-mismatch, missing-multiplier-row, endpoint-source-record-mismatch, eta-row-regulator-mismatch, epsilon-c-row-regulator-mismatch",
    "  --synthetic-closed   Build a synthetic closed fixture for row-logic tests",
    "  --regulator-only     Build a partial fixture with only eta and epsilon_c regulator rows",
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
    regulatorOnly: false,
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
    } else if (arg === "--regulator-only") {
      args.regulatorOnly = true;
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
          fixtures: ["regulator-only", "synthetic-closed"],
          accepted_evidence_summary: [
            "row_evidence",
            "counts_by_evidence_level",
            "accepted_evidence_contract_attempted",
            "accepted_evidence_mismatches",
            "derivation_proof_object",
            "accepted_for_action_closure",
          ],
          controls: [
            "source-record-mismatch",
            "regulator-mismatch",
            "missing-multiplier-row",
            "endpoint-source-record-mismatch",
            "eta-row-regulator-mismatch",
            "epsilon-c-row-regulator-mismatch",
          ],
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
    : args.regulatorOnly
      ? buildRegulatorOnlyActionBoundaryPullbackInput()
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
