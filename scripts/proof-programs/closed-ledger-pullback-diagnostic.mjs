#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildTopologicalCausalRootLedgerArtifact,
  validateTopologicalCausalRootLedgerArtifact,
} from "./topological-causal-root-ledger-checker.mjs";
import {
  applyNoetherSeaCompatibilityControl,
  buildDefaultNoetherSeaCompatibilityHandoffInput,
  buildNoetherSeaCompatibilityHandoffDiagnostic,
  validateNoetherSeaCompatibilityHandoffArtifact,
} from "./noether-sea-compatibility-handoff-diagnostic.mjs";
import {
  EVENT_WAKE_HISTORY_PULLBACK_SCHEMA,
  buildDefaultEventWakeHistoryPullbackInput,
  buildEventWakeHistoryPullbackDiagnostic,
} from "./event-wake-history-pullback-diagnostic.mjs";
import {
  ACTION_BOUNDARY_PULLBACK_SCHEMA,
  buildActionBoundaryPullbackDiagnostic,
  buildDefaultActionBoundaryPullbackInput,
} from "./action-boundary-pullback-diagnostic.mjs";
import {
  CLOSED_LEDGER_SOURCE_RECORD_CONTRACT_SCHEMA,
  buildClosedLedgerSourceRecordContractDiagnostic,
  validateClosedLedgerSourceRecordContractArtifact,
} from "./closed-ledger-source-record-contract-diagnostic.mjs";
import {
  PHOTON_CONSTITUENT_ROOT_ROUTE_SCHEMA,
  buildDefaultPhotonConstituentRootRouteInput,
  buildPhotonConstituentRootRouteDiagnostic,
  buildSelfHitReplayPhotonConstituentRootRouteInput,
  validatePhotonConstituentRootRouteArtifact,
} from "./photon-constituent-root-route-diagnostic.mjs";
import {
  MIDDLE_HINGE_ROOT_STATUS_SCHEMA,
  buildDefaultMiddleHingeRootStatusInput,
  buildMiddleHingeRootStatusDiagnostic,
  buildThresholdReplayMiddleHingeRootStatusInput,
  validateMiddleHingeRootStatusArtifact,
} from "./middle-hinge-root-status-diagnostic.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const CLOSED_LEDGER_PULLBACK_SCHEMA =
  "aaa-proof/closed-ledger-pullback-diagnostic/v1";

const PACKET_ID = "closed_ledger_pullback_diagnostic";
const PROMOTION_STATUS = "priority-only diagnostic";
const REQUIRED_ROW_IDS = [
  "source_record_contract",
  "partial_R_act",
  "partial_L_EpJ",
  "partial_S_B_eta",
  "partial_M_sea",
  "C_AAA",
];
const ACTION_PULLBACK_SCHEMA = ACTION_BOUNDARY_PULLBACK_SCHEMA;
const EVENT_PULLBACK_SCHEMA = EVENT_WAKE_HISTORY_PULLBACK_SCHEMA;
const SOURCE_RECORD_CONTRACT_SCHEMA = CLOSED_LEDGER_SOURCE_RECORD_CONTRACT_SCHEMA;
const PHOTON_ROUTE_SCHEMA = PHOTON_CONSTITUENT_ROOT_ROUTE_SCHEMA;
const MIDDLE_HINGE_ROUTE_SCHEMA = MIDDLE_HINGE_ROOT_STATUS_SCHEMA;

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function row(rowId, boundarySymbol, zeroCondition, passed, failureCode, details = {}) {
  return {
    row_id: rowId,
    boundary_symbol: boundarySymbol,
    zero_condition: zeroCondition,
    status: passed ? "pass" : "fail",
    failure_code: passed ? null : failureCode,
    ...details,
  };
}

function statusPassed(artifact) {
  return artifact?.result?.diagnostic_status === "diagnostic_passed_priority_only";
}

function sourceRecordIdFromNoether(noetherArtifact) {
  return noetherArtifact?.input_summary?.source_record_id ?? null;
}

function artifactSummary(artifact) {
  return {
    schema: artifact?.schema ?? artifact?.artifact_schema ?? null,
    packet_id: artifact?.packet_id ?? null,
    diagnostic_status: artifact?.result?.diagnostic_status ?? artifact?.boundary_status ?? null,
    failure_code: artifact?.result?.failure_code ?? artifact?.failure_code ?? null,
  };
}

function routeEvidenceSummaries(photonRoute, middleHingeRoute) {
  return {
    photon_route: photonRoute?.route_evidence_summary ?? null,
    middle_hinge_route: middleHingeRoute?.route_evidence_summary ?? null,
  };
}

function acceptedRouteEvidenceStatus(routeSummaries) {
  const summaries = Object.values(routeSummaries);
  if (summaries.some((summary) => !summary)) {
    return "route_evidence_summary_missing";
  }
  return summaries.every((summary) => summary.accepted_for_branch_retention === true)
    ? "accepted_for_branch_retention"
    : "not_accepted_for_branch_retention";
}

function acceptedActionEvidenceStatus(actionPullback) {
  if (!actionPullback?.accepted_evidence_summary) {
    return "action_evidence_summary_missing";
  }
  return actionPullback.accepted_evidence_summary.accepted_for_action_closure === true
    ? "accepted_for_action_closure"
    : "not_accepted_for_action_closure";
}

function acceptedEventEvidenceStatus(eventPullback) {
  if (!eventPullback?.accepted_evidence_summary) {
    return "event_evidence_summary_missing";
  }
  return eventPullback.accepted_evidence_summary.accepted_for_wake_history_closure === true
    ? "accepted_for_wake_history_closure"
    : "not_accepted_for_wake_history_closure";
}

function acceptedMediumResponseEvidenceStatus(noether) {
  if (!noether?.accepted_evidence_summary) {
    return "medium_response_evidence_summary_missing";
  }
  return noether.accepted_evidence_summary.accepted_for_medium_response_closure === true
    ? "accepted_for_medium_response_closure"
    : "not_accepted_for_medium_response_closure";
}

export function buildDefaultClosedLedgerPullbackInput(options = {}) {
  const noetherInput = buildDefaultNoetherSeaCompatibilityHandoffInput();
  const noetherControlledInput = options.noetherControl
    ? applyNoetherSeaCompatibilityControl(noetherInput, options.noetherControl)
    : noetherInput;
  const topological = buildTopologicalCausalRootLedgerArtifact({
    subdivisions: options.subdivisions ?? 300,
    windingRadius: options.windingRadius ?? 1,
  });
  const noether = buildNoetherSeaCompatibilityHandoffDiagnostic(noetherControlledInput);
  const photonRoute =
    options.photonRoute ??
    buildPhotonConstituentRootRouteDiagnostic(
      options.routeReplayFixtures
        ? buildSelfHitReplayPhotonConstituentRootRouteInput()
        : buildDefaultPhotonConstituentRootRouteInput()
    );
  const middleHingeRoute =
    options.middleHingeRoute ??
    buildMiddleHingeRootStatusDiagnostic(
      options.routeReplayFixtures
        ? buildThresholdReplayMiddleHingeRootStatusInput()
        : buildDefaultMiddleHingeRootStatusInput()
    );
  const eventInput = buildDefaultEventWakeHistoryPullbackInput();
  const eventPullback =
    options.eventPullback ??
    buildEventWakeHistoryPullbackDiagnostic(eventInput);
  const actionInput = buildDefaultActionBoundaryPullbackInput();
  const actionPullback =
    options.actionPullback ??
    buildActionBoundaryPullbackDiagnostic(actionInput);
  return {
    topological,
    noether,
    source_record_contract:
      options.sourceRecordContract ??
      buildClosedLedgerSourceRecordContractDiagnostic({
        topological,
        noether_input: noetherControlledInput,
        noether,
        photon_route: photonRoute,
        middle_hinge_route: middleHingeRoute,
        event_input: eventInput,
        event_pullback: eventPullback,
        action_input: actionInput,
        action_pullback: actionPullback,
      }),
    photon_route: photonRoute,
    middle_hinge_route: middleHingeRoute,
    action_pullback: actionPullback,
    event_pullback: eventPullback,
  };
}

function evaluateSourceRecordContract(sourceRecordContract) {
  const validationErrors = validateClosedLedgerSourceRecordContractArtifact(sourceRecordContract);
  const passed = validationErrors.length === 0 && statusPassed(sourceRecordContract);
  return row(
    "source_record_contract",
    "\\Theta_{\\mathrm{sea}}(\\mathfrak B)",
    "root topology, Noether handoff, route artifacts, event pullback, and action pullback share one retained source-record contract",
    passed,
    sourceRecordContract?.result?.failure_code ?? "residual.retained_history_mismatch",
    {
      artifact: artifactSummary(sourceRecordContract),
      validation_errors: validationErrors,
    }
  );
}

function retainedSourceChecks(topological, photonRoute, middleHingeRoute, sourceRecordId) {
  return [
    {
      field: "topological.source_record_contract.source_record_id",
      ok: topological?.source_record_contract?.source_record_id === sourceRecordId,
    },
    { field: "photon_route.source_record_id", ok: photonRoute?.source_record_id === sourceRecordId },
    {
      field: "photon_route.source_record_contract.source_record_id",
      ok: photonRoute?.source_record_contract?.source_record_id === sourceRecordId,
    },
    ...routeSampleSourceChecks("photon_route", photonRoute, sourceRecordId),
    { field: "middle_hinge_route.source_record_id", ok: middleHingeRoute?.source_record_id === sourceRecordId },
    {
      field: "middle_hinge_route.source_record_contract.source_record_id",
      ok: middleHingeRoute?.source_record_contract?.source_record_id === sourceRecordId,
    },
    ...routeSampleSourceChecks("middle_hinge_route", middleHingeRoute, sourceRecordId),
  ];
}

function routeSampleSourceChecks(routeKey, routeArtifact, sourceRecordId) {
  const samples = Array.isArray(routeArtifact?.sample_rows) ? routeArtifact.sample_rows : [];
  return [
    { field: `${routeKey}.sample_rows_present`, ok: samples.length > 0 },
    ...samples.map((sample) => ({
      field: `${routeKey}.sample_${sample.sample_index}.source_record_id`,
      ok: sample.source_record_id === sourceRecordId,
    })),
  ];
}

function evaluateTopological(topological, photonRoute, middleHingeRoute, sourceRecordId) {
  const validationErrors = validateTopologicalCausalRootLedgerArtifact(topological);
  const photonValidationErrors = validatePhotonConstituentRootRouteArtifact(photonRoute);
  const middleHingeValidationErrors = validateMiddleHingeRootStatusArtifact(middleHingeRoute);
  const routeSummaries = routeEvidenceSummaries(photonRoute, middleHingeRoute);
  const sourceChecks = retainedSourceChecks(topological, photonRoute, middleHingeRoute, sourceRecordId);
  const sourceOk = sourceChecks.every((check) => check.ok);
  const passed =
    validationErrors.length === 0 &&
    photonValidationErrors.length === 0 &&
    middleHingeValidationErrors.length === 0 &&
    sourceOk &&
    statusPassed(topological) &&
    statusPassed(photonRoute) &&
    statusPassed(middleHingeRoute);
  const topologicalFailed = validationErrors.length > 0 || !statusPassed(topological);
  const failureCode = topologicalFailed
    ? topological?.result?.first_failure_status ?? "residual.provenance_gap"
    : !sourceOk
    ? "residual.retained_history_mismatch"
    : photonRoute?.result?.failure_code ??
      middleHingeRoute?.result?.failure_code ??
      "residual.provenance_gap";
  return row(
    "partial_R_act",
    "\\partial\\mathcal{R}^{\\mathrm{act}}",
    "active causal-root rows are executable, winding-owned, separated from caustic candidates, and route photon/middle-hinge topological boundary samples",
    passed,
    failureCode,
    {
      artifact: artifactSummary(topological),
      photon_route: artifactSummary(photonRoute),
      middle_hinge_route: artifactSummary(middleHingeRoute),
      required_source_record_id: sourceRecordId,
      source_record_checks: sourceChecks,
      route_evidence_summary: routeSummaries,
      accepted_route_evidence_status: acceptedRouteEvidenceStatus(routeSummaries),
      validation_errors: validationErrors,
      photon_route_validation_errors: photonValidationErrors,
      middle_hinge_route_validation_errors: middleHingeValidationErrors,
      blocker:
        passed && topological?.result?.first_failure_status
          ? topological.result.first_failure_status
          : null,
    }
  );
}

function evaluateEventPullback(eventPullback, sourceRecordId) {
  const present = eventPullback && typeof eventPullback === "object" && !Array.isArray(eventPullback);
  const schemaOk =
    eventPullback?.schema === EVENT_PULLBACK_SCHEMA ||
    eventPullback?.artifact_schema === EVENT_PULLBACK_SCHEMA;
  const sourceOk = eventPullback?.source_record_id === sourceRecordId;
  const statusOk = eventPullback?.boundary_status === "closed";
  const residualOk = eventPullback?.residual_norm === 0;
  const passed = present && schemaOk && sourceOk && statusOk && residualOk;
  return row(
    "partial_L_EpJ",
    "\\partial\\mathcal{L}_{E\\mathbf{p}\\mathbf{J}}",
    "energy, momentum, and angular-momentum wake-history boundary is closed on the same retained source record",
    passed,
    present ? "event.ledger_residual" : "residual.provenance_gap",
    {
      artifact: artifactSummary(eventPullback),
      required_source_record_id: sourceRecordId,
      accepted_evidence_summary: eventPullback?.accepted_evidence_summary ?? null,
      accepted_event_evidence_status: acceptedEventEvidenceStatus(eventPullback),
      checks: [
        { field: "artifact_present", ok: present },
        { field: "artifact_schema", ok: schemaOk },
        { field: "source_record_id", ok: sourceOk },
        { field: "boundary_status", ok: statusOk },
        { field: "residual_norm", ok: residualOk },
      ],
    }
  );
}

function evaluateActionPullback(actionPullback, sourceRecordId) {
  const present = actionPullback && typeof actionPullback === "object" && !Array.isArray(actionPullback);
  const schemaOk =
    actionPullback?.schema === ACTION_PULLBACK_SCHEMA ||
    actionPullback?.artifact_schema === ACTION_PULLBACK_SCHEMA;
  const sourceOk = actionPullback?.source_record_id === sourceRecordId;
  const statusOk = actionPullback?.boundary_status === "closed";
  const residualOk = actionPullback?.residual_norm === 0;
  const passed = present && schemaOk && sourceOk && statusOk && residualOk;
  return row(
    "partial_S_B_eta",
    "\\partial S_{\\mathfrak B}^{(\\eta)}",
    "variational endpoint and multiplier residual boundary is closed on the same retained branch chart",
    passed,
    "residual.provenance_gap",
    {
      artifact: artifactSummary(actionPullback),
      required_source_record_id: sourceRecordId,
      evidence_level_summary: actionPullback?.evidence_level_summary ?? null,
      accepted_evidence_summary: actionPullback?.accepted_evidence_summary ?? null,
      accepted_action_evidence_status: acceptedActionEvidenceStatus(actionPullback),
      checks: [
        { field: "artifact_present", ok: present },
        { field: "artifact_schema", ok: schemaOk },
        { field: "source_record_id", ok: sourceOk },
        { field: "boundary_status", ok: statusOk },
        { field: "residual_norm", ok: residualOk },
      ],
    }
  );
}

function evaluateNoether(noether) {
  const validationErrors = validateNoetherSeaCompatibilityHandoffArtifact(noether);
  const passed = validationErrors.length === 0 && statusPassed(noether);
  return row(
    "partial_M_sea",
    "\\partial\\mathcal{M}_{\\mathrm{sea}}",
    "Noether sea response handoff is compatible with the same retained causal-root source record",
    passed,
    noether?.result?.failure_code ?? "residual.medium_response_missing",
    {
      artifact: artifactSummary(noether),
      accepted_evidence_summary: noether?.accepted_evidence_summary ?? null,
      accepted_medium_response_evidence_status: acceptedMediumResponseEvidenceStatus(noether),
      validation_errors: validationErrors,
    }
  );
}

function acceptedEvidenceStatusEntries(rows) {
  const statusFields = {
    partial_R_act: "accepted_route_evidence_status",
    partial_L_EpJ: "accepted_event_evidence_status",
    partial_S_B_eta: "accepted_action_evidence_status",
    partial_M_sea: "accepted_medium_response_evidence_status",
  };
  return Object.entries(statusFields).map(([rowId, statusField]) => {
    const boundaryRow = rows.find((entry) => entry.row_id === rowId);
    const status = boundaryRow?.[statusField] ?? null;
    return {
      row_id: rowId,
      status,
      accepted: typeof status === "string" && status.startsWith("accepted_for_"),
    };
  });
}

function evaluateCrossSector(rows) {
  const failedRows = rows.filter((entry) => entry.status === "fail");
  const acceptedEvidenceStatuses = acceptedEvidenceStatusEntries(rows);
  const acceptedEvidenceReady = acceptedEvidenceStatuses.every((entry) => entry.accepted);
  return row(
    "C_AAA",
    "\\mathcal{C}_{\\mathbb{A}\\mathbb{A}\\mathbb{A}}",
    "all closed-ledger boundary terms vanish on the same retained history record",
    failedRows.length === 0,
    "residual.provenance_gap",
    {
      blocked_by: failedRows.map((entry) => ({
        row_id: entry.row_id,
        failure_code: entry.failure_code,
      })),
      accepted_evidence_ready: acceptedEvidenceReady,
      accepted_evidence_statuses: acceptedEvidenceStatuses,
      accepted_evidence_blockers: acceptedEvidenceStatuses
        .filter((entry) => !entry.accepted)
        .map((entry) => ({
          row_id: entry.row_id,
          status: entry.status,
        })),
    }
  );
}

export function buildClosedLedgerPullbackDiagnostic(input = buildDefaultClosedLedgerPullbackInput()) {
  const topological = deepClone(input.topological);
  const noether = deepClone(input.noether);
  const sourceRecordId = sourceRecordIdFromNoether(noether);
  const boundaryRows = [
    evaluateSourceRecordContract(input.source_record_contract ?? null),
    evaluateTopological(topological, input.photon_route ?? null, input.middle_hinge_route ?? null, sourceRecordId),
    evaluateEventPullback(input.event_pullback ?? null, sourceRecordId),
    evaluateActionPullback(input.action_pullback ?? null, sourceRecordId),
    evaluateNoether(noether),
  ];
  boundaryRows.push(evaluateCrossSector(boundaryRows));
  const failedRows = boundaryRows.filter((entry) => entry.status === "fail");
  const blockerOrder = boundaryRows.map((entry) => ({
    row_id: entry.row_id,
    status: entry.status,
    failure_code: entry.failure_code,
  }));

  return {
    schema: CLOSED_LEDGER_PULLBACK_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    claim_level:
      "diagnostic-only priority artifact; does not prove the closed-ledger conjecture, retain a branch, or update a validation gate",
    input_summary: {
      topological: artifactSummary(topological),
      photon_route: artifactSummary(input.photon_route),
      middle_hinge_route: artifactSummary(input.middle_hinge_route),
      route_evidence_summary: routeEvidenceSummaries(
        input.photon_route,
        input.middle_hinge_route
      ),
      source_record_contract: artifactSummary(input.source_record_contract),
      noether: artifactSummary(noether),
      noether_accepted_evidence_summary:
        noether?.accepted_evidence_summary ?? null,
      action_pullback: artifactSummary(input.action_pullback),
      action_accepted_evidence_summary:
        input.action_pullback?.accepted_evidence_summary ?? null,
      event_pullback: artifactSummary(input.event_pullback),
      event_accepted_evidence_summary:
        input.event_pullback?.accepted_evidence_summary ?? null,
      source_record_id: sourceRecordId,
    },
    boundary_equation:
      "\\partial\\mathcal{R}^{\\mathrm{act}}+\\partial\\mathcal{L}_{E\\mathbf{p}\\mathbf{J}}+\\partial S_{\\mathfrak B}^{(\\eta)}+\\partial\\mathcal{M}_{\\mathrm{sea}}=0",
    boundary_rows: boundaryRows,
    blocker_order: blockerOrder,
    result: {
      diagnostic_status: failedRows.length === 0 ? "diagnostic_passed_priority_only" : "diagnostic_failed",
      retained_branch: false,
      updates_live_validation_gate: false,
      failure_code: failedRows[0]?.failure_code ?? null,
      first_failed_row: failedRows[0]?.row_id ?? null,
      first_failure_status:
        failedRows[0]?.failure_code ??
        "closed_ledger_pullback_compatible_priority_only; branch_still_not_retained",
      strongest_artifact:
        "closed-ledger pullback compositor for causal-root, wake-history, action, and Noether sea boundary rows",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateClosedLedgerPullbackArtifact(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(artifact.schema === CLOSED_LEDGER_PULLBACK_SCHEMA, `schema must be ${CLOSED_LEDGER_PULLBACK_SCHEMA}`, errors);
  assertField(artifact.packet_id === PACKET_ID, `packet_id must be ${PACKET_ID}`, errors);
  assertField(artifact.promotion_status === PROMOTION_STATUS, `promotion_status must be ${PROMOTION_STATUS}`, errors);
  assertField(artifact.result?.retained_branch === false, "artifact must declare retained_branch=false", errors);
  assertField(artifact.result?.updates_live_validation_gate === false, "artifact must not update a live validation gate", errors);

  const rows = artifact.boundary_rows;
  assertField(Array.isArray(rows), "boundary_rows must be an array", errors);
  if (Array.isArray(rows)) {
    const rowIds = rows.map((entry) => entry.row_id);
    for (const rowId of REQUIRED_ROW_IDS) {
      assertField(rowIds.includes(rowId), `boundary_rows must include ${rowId}`, errors);
    }
    for (const entry of rows) {
      assertField(entry.status === "pass" || entry.status === "fail", `${entry.row_id} must have pass/fail status`, errors);
      assertField(
        entry.status === "pass" ? entry.failure_code === null : typeof entry.failure_code === "string",
        `${entry.row_id} must carry failure_code only when failed`,
        errors
      );
    }
    const failedRows = rows.filter((entry) => entry.status === "fail");
    assertField(
      artifact.result?.diagnostic_status ===
        (failedRows.length === 0 ? "diagnostic_passed_priority_only" : "diagnostic_failed"),
      "result.diagnostic_status must match boundary row failures",
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

function readJsonIfPath(filePath) {
  return filePath ? JSON.parse(fs.readFileSync(filePath, "utf8")) : null;
}

function usage() {
  return [
    "Usage: node scripts/proof-programs/closed-ledger-pullback-diagnostic.mjs [options]",
    "",
    "Options:",
    "  --topological <path>       Read topological causal-root diagnostic JSON",
    "  --noether <path>           Read Noether sea compatibility diagnostic JSON",
    "  --source-record-contract <path> Read source-record contract diagnostic JSON",
    "  --photon-route <path>      Read photon constituent route diagnostic JSON",
    "  --middle-hinge-route <path> Read middle-hinge route diagnostic JSON",
    "  --action-pullback <path>   Read action boundary pullback JSON",
    "  --event-pullback <path>    Read wake-history event pullback JSON",
    "  --noether-control <name>   Build default Noether diagnostic with a negative control",
    "  --route-replay-fixtures    Build photon self-hit and middle-hinge threshold replay fixtures",
    "  --out <path>               Write artifact JSON to path instead of stdout",
    "  --validate <path>          Validate an existing diagnostic artifact JSON file",
    "  --schema                   Print the artifact schema identifier",
    "  --pretty                   Pretty-print JSON output",
    "  --help                     Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    topological: null,
    noether: null,
    sourceRecordContract: null,
    photonRoute: null,
    middleHingeRoute: null,
    actionPullback: null,
    eventPullback: null,
    noetherControl: null,
    routeReplayFixtures: false,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--topological") {
      args.topological = argv[++index];
    } else if (arg === "--noether") {
      args.noether = argv[++index];
    } else if (arg === "--source-record-contract") {
      args.sourceRecordContract = argv[++index];
    } else if (arg === "--photon-route") {
      args.photonRoute = argv[++index];
    } else if (arg === "--middle-hinge-route") {
      args.middleHingeRoute = argv[++index];
    } else if (arg === "--action-pullback") {
      args.actionPullback = argv[++index];
    } else if (arg === "--event-pullback") {
      args.eventPullback = argv[++index];
    } else if (arg === "--noether-control") {
      args.noetherControl = argv[++index];
    } else if (arg === "--route-replay-fixtures") {
      args.routeReplayFixtures = true;
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
          schema: "aaa-proof/closed-ledger-pullback-diagnostic-schema/v1",
          artifact_schema: CLOSED_LEDGER_PULLBACK_SCHEMA,
          action_pullback_schema: ACTION_PULLBACK_SCHEMA,
          event_pullback_schema: EVENT_PULLBACK_SCHEMA,
          source_record_contract_schema: SOURCE_RECORD_CONTRACT_SCHEMA,
          photon_route_schema: PHOTON_ROUTE_SCHEMA,
          middle_hinge_route_schema: MIDDLE_HINGE_ROUTE_SCHEMA,
          route_replay_fixtures: ["photon-self-hit-replay", "middle-hinge-threshold-replay"],
          route_evidence_summary: ["photon_route", "middle_hinge_route"],
          noether_accepted_evidence_summary: true,
          event_accepted_evidence_summary: true,
          action_accepted_evidence_summary: true,
          promotion_status: PROMOTION_STATUS,
          packet_id: PACKET_ID,
        },
        args.pretty
      )
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors = validateClosedLedgerPullbackArtifact(artifact);
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

  const defaults = buildDefaultClosedLedgerPullbackInput({
    noetherControl: args.noetherControl,
    routeReplayFixtures: args.routeReplayFixtures,
  });
  const input = {
    topological: readJsonIfPath(args.topological) ?? defaults.topological,
    noether: readJsonIfPath(args.noether) ?? defaults.noether,
    source_record_contract: readJsonIfPath(args.sourceRecordContract) ?? defaults.source_record_contract,
    photon_route: readJsonIfPath(args.photonRoute) ?? defaults.photon_route,
    middle_hinge_route: readJsonIfPath(args.middleHingeRoute) ?? defaults.middle_hinge_route,
    action_pullback: readJsonIfPath(args.actionPullback) ?? defaults.action_pullback,
    event_pullback: readJsonIfPath(args.eventPullback) ?? defaults.event_pullback,
  };
  const artifact = buildClosedLedgerPullbackDiagnostic(input);
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
