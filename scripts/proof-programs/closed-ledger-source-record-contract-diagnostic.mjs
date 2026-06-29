#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildTopologicalCausalRootLedgerArtifact,
  validateTopologicalCausalRootLedgerArtifact,
} from "./topological-causal-root-ledger-checker.mjs";
import {
  buildDefaultNoetherSeaCompatibilityHandoffInput,
  buildNoetherSeaCompatibilityHandoffDiagnostic,
  validateNoetherSeaCompatibilityHandoffArtifact,
} from "./noether-sea-compatibility-handoff-diagnostic.mjs";
import {
  buildDefaultEventWakeHistoryPullbackInput,
  buildEventWakeHistoryPullbackDiagnostic,
  validateEventWakeHistoryPullbackArtifact,
} from "./event-wake-history-pullback-diagnostic.mjs";
import {
  buildActionBoundaryPullbackDiagnostic,
  buildDefaultActionBoundaryPullbackInput,
  validateActionBoundaryPullbackArtifact,
} from "./action-boundary-pullback-diagnostic.mjs";
import {
  buildDefaultPhotonConstituentRootRouteInput,
  buildPhotonConstituentRootRouteDiagnostic,
  validatePhotonConstituentRootRouteArtifact,
} from "./photon-constituent-root-route-diagnostic.mjs";
import {
  buildDefaultMiddleHingeRootStatusInput,
  buildMiddleHingeRootStatusDiagnostic,
  validateMiddleHingeRootStatusArtifact,
} from "./middle-hinge-root-status-diagnostic.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const CLOSED_LEDGER_SOURCE_RECORD_CONTRACT_SCHEMA =
  "aaa-proof/closed-ledger-source-record-contract-diagnostic/v1";

const PACKET_ID = "closed_ledger_source_record_contract_diagnostic";
const PROMOTION_STATUS = "priority-only diagnostic";
const REQUIRED_ROW_IDS = [
  "source_record_identity",
  "branch_chart_identity",
  "retained_window",
  "regulator_state",
  "active_root_ledger",
  "event_ledger",
  "response_object",
];
const CONTROLS = [
  "topological-source-record-mismatch",
  "photon-route-source-record-mismatch",
  "photon-route-sample-source-record-mismatch",
  "photon-route-retained-chart-mismatch",
  "middle-hinge-source-record-mismatch",
  "middle-hinge-sample-source-record-mismatch",
  "middle-hinge-route-regulator-mismatch",
  "event-source-record-mismatch",
  "action-regulator-mismatch",
  "response-object-mismatch",
];

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function sameNumber(left, right, tolerance = 1e-12) {
  return Number.isFinite(left) && Number.isFinite(right) && Math.abs(left - right) <= tolerance;
}

function collectMismatches(checks) {
  return checks.filter((entry) => !entry.ok).map((entry) => entry.field);
}

function row(rowId, zeroCondition, failureCode, checks) {
  const mismatches = collectMismatches(checks);
  const passed = mismatches.length === 0;
  return {
    row_id: rowId,
    zero_condition: zeroCondition,
    status: passed ? "pass" : "fail",
    failure_code: passed ? null : failureCode,
    mismatches,
    checks,
  };
}

function artifactSummary(artifact) {
  return {
    schema: artifact?.schema ?? artifact?.artifact_schema ?? null,
    packet_id: artifact?.packet_id ?? null,
    diagnostic_status: artifact?.result?.diagnostic_status ?? artifact?.boundary_status ?? null,
    failure_code: artifact?.result?.failure_code ?? artifact?.failure_code ?? null,
  };
}

function topologicalContract(input) {
  return input.topological?.source_record_contract ?? {};
}

function noetherSourceRecord(input) {
  return input.noether_input?.retained_branch_source_record ?? {};
}

function routeSourceRecord(input, routeKey) {
  return input[routeKey]?.source_record_contract ?? {};
}

function noetherHandoff(input) {
  return input.noether_input?.handoff ?? {};
}

function referenceSourceRecordId(input) {
  return noetherSourceRecord(input).record_id ?? null;
}

export function buildDefaultClosedLedgerSourceRecordContractInput(options = {}) {
  const noetherInput = buildDefaultNoetherSeaCompatibilityHandoffInput();
  const photonRouteInput = buildDefaultPhotonConstituentRootRouteInput();
  const middleHingeRouteInput = buildDefaultMiddleHingeRootStatusInput();
  const eventInput = buildDefaultEventWakeHistoryPullbackInput();
  const actionInput = buildDefaultActionBoundaryPullbackInput();
  return {
    topological: buildTopologicalCausalRootLedgerArtifact({
      subdivisions: options.subdivisions ?? 300,
      windingRadius: options.windingRadius ?? 1,
    }),
    noether_input: noetherInput,
    noether: buildNoetherSeaCompatibilityHandoffDiagnostic(noetherInput),
    photon_route: buildPhotonConstituentRootRouteDiagnostic(photonRouteInput),
    middle_hinge_route: buildMiddleHingeRootStatusDiagnostic(middleHingeRouteInput),
    event_input: eventInput,
    event_pullback: buildEventWakeHistoryPullbackDiagnostic(eventInput),
    action_input: actionInput,
    action_pullback: buildActionBoundaryPullbackDiagnostic(actionInput),
  };
}

export function applyClosedLedgerSourceRecordContractControl(input, controlName) {
  const packet = deepClone(input);
  if (!controlName || controlName === "none") {
    return packet;
  }

  if (controlName === "topological-source-record-mismatch") {
    packet.topological.source_record_contract.source_record_id = "theta_sea_branch_q1_v0";
    return packet;
  }

  if (controlName === "photon-route-source-record-mismatch") {
    packet.photon_route.source_record_id = "theta_sea_branch_q1_v0";
    return packet;
  }

  if (controlName === "photon-route-sample-source-record-mismatch") {
    packet.photon_route.sample_rows[0].source_record_id = "theta_sea_branch_q1_v0";
    return packet;
  }

  if (controlName === "photon-route-retained-chart-mismatch") {
    packet.photon_route.source_record_contract.retained_chart_id = "torus_root_ledger_q1";
    return packet;
  }

  if (controlName === "middle-hinge-source-record-mismatch") {
    packet.middle_hinge_route.source_record_id = "theta_sea_branch_q1_v0";
    return packet;
  }

  if (controlName === "middle-hinge-sample-source-record-mismatch") {
    packet.middle_hinge_route.sample_rows[0].source_record_id = "theta_sea_branch_q1_v0";
    return packet;
  }

  if (controlName === "middle-hinge-route-regulator-mismatch") {
    packet.middle_hinge_route.source_record_contract.regulator_state.eta = 0.04;
    return packet;
  }

  if (controlName === "event-source-record-mismatch") {
    packet.event_pullback.source_record_id = "theta_sea_branch_q1_v0";
    return packet;
  }

  if (controlName === "action-regulator-mismatch") {
    packet.action_input.regulator_state.eta = 0.04;
    return packet;
  }

  if (controlName === "response-object-mismatch") {
    packet.topological.source_record_contract.response_object_id = "M_sea_q1";
    return packet;
  }

  throw new Error(`unknown control: ${controlName}`);
}

function evaluateSourceRecordIdentity(input) {
  const topological = topologicalContract(input);
  const source = noetherSourceRecord(input);
  const photonRouteSource = routeSourceRecord(input, "photon_route");
  const middleHingeRouteSource = routeSourceRecord(input, "middle_hinge_route");
  const referenceId = referenceSourceRecordId(input);
  const photonSampleChecks = sampleSourceRecordChecks("photon_route", input.photon_route, referenceId);
  const middleHingeSampleChecks = sampleSourceRecordChecks("middle_hinge_route", input.middle_hinge_route, referenceId);
  return row(
    "source_record_identity",
    "root topology, Noether handoff, photon route, middle-hinge route, event pullback, and action pullback name the same retained source record",
    "residual.retained_history_mismatch",
    [
      { field: "noether_input.retained_branch_source_record.record_id", ok: typeof referenceId === "string" },
      { field: "topological.source_record_contract.source_record_id", ok: topological.source_record_id === referenceId },
      { field: "noether.input_summary.source_record_id", ok: input.noether?.input_summary?.source_record_id === referenceId },
      { field: "photon_route.source_record_id", ok: input.photon_route?.source_record_id === referenceId },
      { field: "photon_route.source_record_contract.source_record_id", ok: photonRouteSource.source_record_id === referenceId },
      ...photonSampleChecks,
      { field: "middle_hinge_route.source_record_id", ok: input.middle_hinge_route?.source_record_id === referenceId },
      {
        field: "middle_hinge_route.source_record_contract.source_record_id",
        ok: middleHingeRouteSource.source_record_id === referenceId,
      },
      ...middleHingeSampleChecks,
      { field: "event_pullback.source_record_id", ok: input.event_pullback?.source_record_id === referenceId },
      { field: "action_pullback.source_record_id", ok: input.action_pullback?.source_record_id === referenceId },
      { field: "source.record_id", ok: source.record_id === referenceId },
    ]
  );
}

function sampleSourceRecordChecks(routeKey, routeArtifact, referenceId) {
  const samples = Array.isArray(routeArtifact?.sample_rows) ? routeArtifact.sample_rows : [];
  return [
    { field: `${routeKey}.sample_rows_present`, ok: samples.length > 0 },
    ...samples.map((sample) => ({
      field: `${routeKey}.sample_${sample.sample_index}.source_record_id`,
      ok: sample.source_record_id === referenceId,
    })),
  ];
}

function evaluateBranchChartIdentity(input) {
  const topological = topologicalContract(input);
  const source = noetherSourceRecord(input);
  const photonRouteSource = routeSourceRecord(input, "photon_route");
  const middleHingeRouteSource = routeSourceRecord(input, "middle_hinge_route");
  return row(
    "branch_chart_identity",
    "root topology, route artifacts, and Noether sea response use the same branch class and retained chart",
    "residual.retained_history_mismatch",
    [
      { field: "branch_class", ok: topological.branch_class === source.branch_class },
      { field: "retained_chart_id", ok: topological.retained_chart_id === source.retained_chart_id },
      { field: "photon_route.source_record_contract.branch_class", ok: photonRouteSource.branch_class === source.branch_class },
      {
        field: "photon_route.source_record_contract.retained_chart_id",
        ok: photonRouteSource.retained_chart_id === source.retained_chart_id,
      },
      {
        field: "middle_hinge_route.source_record_contract.branch_class",
        ok: middleHingeRouteSource.branch_class === source.branch_class,
      },
      {
        field: "middle_hinge_route.source_record_contract.retained_chart_id",
        ok: middleHingeRouteSource.retained_chart_id === source.retained_chart_id,
      },
      { field: "noether.input_summary.branch_class", ok: input.noether?.input_summary?.branch_class === source.branch_class },
      {
        field: "noether.input_summary.retained_chart_id",
        ok: input.noether?.input_summary?.retained_chart_id === source.retained_chart_id,
      },
    ]
  );
}

function evaluateRetainedWindow(input) {
  const topologicalWindow = topologicalContract(input).retained_window ?? {};
  const sourceWindow = noetherSourceRecord(input).retained_window ?? {};
  const photonRouteWindow = routeSourceRecord(input, "photon_route").retained_window ?? {};
  const middleHingeRouteWindow = routeSourceRecord(input, "middle_hinge_route").retained_window ?? {};
  const mediumWindow = noetherHandoff(input).medium_response?.retained_window ?? {};
  return row(
    "retained_window",
    "root topology, route artifacts, source record, and medium response use the same retained window and memory depth",
    "residual.retained_history_mismatch",
    [
      { field: "retained_window.id", ok: topologicalWindow.id === sourceWindow.id && mediumWindow.id === sourceWindow.id },
      { field: "retained_window.h", ok: sameNumber(topologicalWindow.h, sourceWindow.h) && sameNumber(mediumWindow.h, sourceWindow.h) },
      {
        field: "retained_window.memory_depth",
        ok:
          sameNumber(topologicalWindow.memory_depth, sourceWindow.memory_depth) &&
          sameNumber(mediumWindow.memory_depth, sourceWindow.memory_depth),
      },
      { field: "photon_route.source_record_contract.retained_window.id", ok: photonRouteWindow.id === sourceWindow.id },
      { field: "photon_route.source_record_contract.retained_window.h", ok: sameNumber(photonRouteWindow.h, sourceWindow.h) },
      {
        field: "photon_route.source_record_contract.retained_window.memory_depth",
        ok: sameNumber(photonRouteWindow.memory_depth, sourceWindow.memory_depth),
      },
      { field: "middle_hinge_route.source_record_contract.retained_window.id", ok: middleHingeRouteWindow.id === sourceWindow.id },
      {
        field: "middle_hinge_route.source_record_contract.retained_window.h",
        ok: sameNumber(middleHingeRouteWindow.h, sourceWindow.h),
      },
      {
        field: "middle_hinge_route.source_record_contract.retained_window.memory_depth",
        ok: sameNumber(middleHingeRouteWindow.memory_depth, sourceWindow.memory_depth),
      },
    ]
  );
}

function evaluateRegulatorState(input) {
  const topologicalRegulator = topologicalContract(input).regulator_state ?? {};
  const sourceRegulator = noetherSourceRecord(input).regulator_state ?? {};
  const photonRouteRegulator = routeSourceRecord(input, "photon_route").regulator_state ?? {};
  const middleHingeRouteRegulator = routeSourceRecord(input, "middle_hinge_route").regulator_state ?? {};
  const mediumRegulator = noetherHandoff(input).medium_response?.regulator_state ?? {};
  const actionRegulator = input.action_input?.regulator_state ?? {};
  return row(
    "regulator_state",
    "root topology, route artifacts, Noether handoff, and action boundary packet use the same eta and epsilon_c regulator state",
    "residual.retained_history_mismatch",
    [
      {
        field: "regulator_state.eta",
        ok:
          sameNumber(topologicalRegulator.eta, sourceRegulator.eta) &&
          sameNumber(photonRouteRegulator.eta, sourceRegulator.eta) &&
          sameNumber(middleHingeRouteRegulator.eta, sourceRegulator.eta) &&
          sameNumber(mediumRegulator.eta, sourceRegulator.eta) &&
          sameNumber(actionRegulator.eta, sourceRegulator.eta),
      },
      {
        field: "regulator_state.epsilon_c",
        ok:
          sameNumber(topologicalRegulator.epsilon_c, sourceRegulator.epsilon_c) &&
          sameNumber(photonRouteRegulator.epsilon_c, sourceRegulator.epsilon_c) &&
          sameNumber(middleHingeRouteRegulator.epsilon_c, sourceRegulator.epsilon_c) &&
          sameNumber(mediumRegulator.epsilon_c, sourceRegulator.epsilon_c) &&
          sameNumber(actionRegulator.epsilon_c, sourceRegulator.epsilon_c),
      },
      {
        field: "regulator_state.status",
        ok:
          topologicalRegulator.status === sourceRegulator.status &&
          photonRouteRegulator.status === sourceRegulator.status &&
          middleHingeRouteRegulator.status === sourceRegulator.status &&
          mediumRegulator.status === sourceRegulator.status &&
          actionRegulator.status === sourceRegulator.status,
      },
    ]
  );
}

function evaluateActiveRootLedger(input) {
  const topologicalLedger = topologicalContract(input).active_root_ledger ?? {};
  const sourceLedger = noetherSourceRecord(input).active_root_ledger ?? {};
  const mediumLedger = noetherHandoff(input).medium_response?.active_root_ledger ?? {};
  return row(
    "active_root_ledger",
    "root topology and Noether handoff name the same active root ledger and a positive Jacobian floor",
    "residual.retained_history_mismatch",
    [
      {
        field: "active_root_ledger.ledger_id",
        ok: topologicalLedger.ledger_id === sourceLedger.ledger_id && mediumLedger.ledger_id === sourceLedger.ledger_id,
      },
      { field: "topological.active_root_ledger.root_row_count", ok: topologicalLedger.root_row_count > 0 },
      { field: "topological.active_root_ledger.winding_owner_present", ok: topologicalLedger.winding_owner_present === true },
      { field: "topological.active_root_ledger.jacobian_floor", ok: topologicalLedger.jacobian_floor > 0 },
      { field: "source.active_root_ledger.jacobian_floor", ok: sourceLedger.jacobian_floor > 0 },
    ]
  );
}

function evaluateEventLedger(input) {
  const topological = topologicalContract(input);
  const sourceLedger = noetherSourceRecord(input).event_ledger ?? {};
  const handoffLedger = noetherHandoff(input).event_ledger ?? {};
  return row(
    "event_ledger",
    "root topology, Noether handoff, and event pullback name the same wake-history event ledger",
    "residual.retained_history_mismatch",
    [
      { field: "topological.event_ledger_id", ok: topological.event_ledger_id === sourceLedger.ledger_id },
      { field: "handoff.event_ledger.ledger_id", ok: handoffLedger.ledger_id === sourceLedger.ledger_id },
      { field: "event_pullback.event_ledger_id", ok: input.event_pullback?.event_ledger_id === sourceLedger.ledger_id },
    ]
  );
}

function evaluateResponseObject(input) {
  const topological = topologicalContract(input);
  const responseObjectId = noetherHandoff(input).medium_response?.response_object_id ?? null;
  return row(
    "response_object",
    "root topology and Noether handoff name the same Noether sea response object",
    "residual.medium_response_missing",
    [
      { field: "topological.response_object_id", ok: topological.response_object_id === responseObjectId },
      { field: "noether.input_summary.response_object_id", ok: input.noether?.input_summary?.response_object_id === responseObjectId },
    ]
  );
}

function nestedValidation(input) {
  return {
    topological: validateTopologicalCausalRootLedgerArtifact(input.topological ?? {}),
    noether: validateNoetherSeaCompatibilityHandoffArtifact(input.noether ?? {}),
    photon_route: validatePhotonConstituentRootRouteArtifact(input.photon_route ?? {}),
    middle_hinge_route: validateMiddleHingeRootStatusArtifact(input.middle_hinge_route ?? {}),
    event_pullback: validateEventWakeHistoryPullbackArtifact(input.event_pullback ?? {}),
    action_pullback: validateActionBoundaryPullbackArtifact(input.action_pullback ?? {}),
  };
}

export function buildClosedLedgerSourceRecordContractDiagnostic(
  input = buildDefaultClosedLedgerSourceRecordContractInput()
) {
  const rows = [
    evaluateSourceRecordIdentity(input),
    evaluateBranchChartIdentity(input),
    evaluateRetainedWindow(input),
    evaluateRegulatorState(input),
    evaluateActiveRootLedger(input),
    evaluateEventLedger(input),
    evaluateResponseObject(input),
  ];
  const failedRows = rows.filter((entry) => entry.status === "fail");

  return {
    schema: CLOSED_LEDGER_SOURCE_RECORD_CONTRACT_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    claim_level:
      "diagnostic-only priority artifact; checks same retained source-record identity and does not close the action boundary or retain a branch",
    input_summary: {
      source_record_id: referenceSourceRecordId(input),
      topological: artifactSummary(input.topological),
      noether: artifactSummary(input.noether),
      photon_route: artifactSummary(input.photon_route),
      middle_hinge_route: artifactSummary(input.middle_hinge_route),
      event_pullback: artifactSummary(input.event_pullback),
      action_pullback: artifactSummary(input.action_pullback),
      nested_validation_errors: nestedValidation(input),
    },
    contract_rows: rows,
    negative_controls: Object.fromEntries(
      CONTROLS.map((controlName) => [controlName, "residual.retained_history_mismatch"])
    ),
    result: {
      diagnostic_status: failedRows.length === 0 ? "diagnostic_passed_priority_only" : "diagnostic_failed",
      retained_branch: false,
      updates_live_validation_gate: false,
      failure_code: failedRows[0]?.failure_code ?? null,
      first_failed_row: failedRows[0]?.row_id ?? null,
      first_failure_status:
        failedRows[0]?.failure_code ??
        "closed_ledger_source_record_contract_compatible_priority_only; action_boundary_still_not_closed",
      strongest_artifact:
        "same-retained-history source-record contract across causal-root, photon route, middle-hinge route, wake-history, action, and Noether sea pullbacks",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateClosedLedgerSourceRecordContractArtifact(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(
    artifact.schema === CLOSED_LEDGER_SOURCE_RECORD_CONTRACT_SCHEMA,
    `schema must be ${CLOSED_LEDGER_SOURCE_RECORD_CONTRACT_SCHEMA}`,
    errors
  );
  assertField(artifact.packet_id === PACKET_ID, `packet_id must be ${PACKET_ID}`, errors);
  assertField(artifact.promotion_status === PROMOTION_STATUS, `promotion_status must be ${PROMOTION_STATUS}`, errors);
  assertField(artifact.result?.retained_branch === false, "artifact must declare retained_branch=false", errors);
  assertField(artifact.result?.updates_live_validation_gate === false, "artifact must not update a live validation gate", errors);

  const rows = artifact.contract_rows;
  assertField(Array.isArray(rows), "contract_rows must be an array", errors);
  if (Array.isArray(rows)) {
    const rowIds = rows.map((entry) => entry.row_id);
    for (const rowId of REQUIRED_ROW_IDS) {
      assertField(rowIds.includes(rowId), `contract_rows must include ${rowId}`, errors);
    }
    for (const entry of rows) {
      assertField(entry.status === "pass" || entry.status === "fail", `${entry.row_id} must have pass/fail status`, errors);
      assertField(
        entry.status === "pass" ? entry.failure_code === null : typeof entry.failure_code === "string",
        `${entry.row_id} must carry failure_code only when failed`,
        errors
      );
      assertField(Array.isArray(entry.checks), `${entry.row_id} must include checks`, errors);
      assertField(Array.isArray(entry.mismatches), `${entry.row_id} must include mismatches`, errors);
    }

    const failedRows = rows.filter((entry) => entry.status === "fail");
    assertField(
      artifact.result?.diagnostic_status ===
        (failedRows.length === 0 ? "diagnostic_passed_priority_only" : "diagnostic_failed"),
      "result.diagnostic_status must match contract row failures",
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
    "Usage: node scripts/proof-programs/closed-ledger-source-record-contract-diagnostic.mjs [options]",
    "",
    "Options:",
    "  --input <path>       Read source-record contract input JSON instead of the default fixture",
    `  --control <name>     Apply a negative control: ${CONTROLS.join(", ")}`,
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
          schema: "aaa-proof/closed-ledger-source-record-contract-diagnostic-schema/v1",
          artifact_schema: CLOSED_LEDGER_SOURCE_RECORD_CONTRACT_SCHEMA,
          promotion_status: PROMOTION_STATUS,
          packet_id: PACKET_ID,
          controls: CONTROLS,
        },
        args.pretty
      )
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors = validateClosedLedgerSourceRecordContractArtifact(artifact);
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
    : buildDefaultClosedLedgerSourceRecordContractInput();
  const input = applyClosedLedgerSourceRecordContractControl(baseInput, args.control);
  const artifact = buildClosedLedgerSourceRecordContractDiagnostic(input);
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
