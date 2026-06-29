#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildTopologicalCausalRootLedgerArtifact,
  validateTopologicalCausalRootLedgerArtifact,
} from "./topological-causal-root-ledger-checker.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const MIDDLE_HINGE_ROOT_STATUS_SCHEMA =
  "aaa-proof/middle-hinge-root-status-diagnostic/v1";

const PACKET_ID = "middle_hinge_root_status_diagnostic";
const PROMOTION_STATUS = "priority-only diagnostic";
const REQUIRED_ROW_IDS = [
  "speed_residual_word",
  "sample_source_record_identity",
  "super_field_root_replay_route",
  "caustic_finite_eta_route",
  "transition_rows",
  "not_literal_communication",
];
const SUPER_FIELD_ROUTE_KINDS = ["self-hit", "inactive-root"];
const CAUSTIC_ROUTE_KINDS = ["caustic", "finite-eta"];
const NOT_REQUIRED_ROUTE_KIND = "not-required";
const CONTROLS = [
  "literal-communication",
  "sample-source-record-mismatch",
  "missing-super-field-route",
  "missing-caustic-route",
  "wrong-root-status-word",
];
const RESIDUAL_TOLERANCE = 1e-10;

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function collectMismatches(checks) {
  return checks.filter((entry) => !entry.ok).map((entry) => entry.field);
}

function sameNumber(left, right, tolerance = 1e-12) {
  return Number.isFinite(left) && Number.isFinite(right) && Math.abs(left - right) <= tolerance;
}

function row(rowId, zeroCondition, failureCode, checks, details = {}) {
  const mismatches = collectMismatches(checks);
  const passed = mismatches.length === 0;
  return {
    row_id: rowId,
    zero_condition: zeroCondition,
    status: passed ? "pass" : "fail",
    failure_code: passed ? null : failureCode,
    mismatches,
    checks,
    ...details,
  };
}

function artifactSummary(artifact) {
  return {
    schema: artifact?.schema ?? artifact?.artifact_schema ?? null,
    packet_id: artifact?.packet_id ?? null,
    diagnostic_status: artifact?.result?.diagnostic_status ?? null,
    failure_code: artifact?.result?.failure_code ?? null,
  };
}

function routeRequired(sample) {
  return sample.root_status_symbol === "1" || sample.root_status_symbol === "C";
}

function acceptedEvidenceAttempted(sample) {
  return (
    sample.accepted_for_branch_retention === true ||
    sample.route_evidence?.accepted_for_branch_retention === true ||
    sample.route_evidence?.evidence_level === "accepted_for_branch_retention"
  );
}

function acceptedEvidenceContractChecks(sample, sourceRecordContract) {
  const evidence = sample.route_evidence ?? {};
  const retainedWindow = sourceRecordContract?.retained_window ?? {};
  const regulatorState = sourceRecordContract?.regulator_state ?? {};
  const evidenceRegulator = evidence.regulator_state ?? {};
  return [
    {
      field: "route_evidence.accepted_for_branch_retention",
      ok: evidence.accepted_for_branch_retention === true,
    },
    {
      field: "route_evidence.evidence_level",
      ok: evidence.evidence_level === "accepted_for_branch_retention",
    },
    {
      field: "route_evidence.accepted_evidence_id",
      ok:
        typeof evidence.accepted_evidence_id === "string" &&
        evidence.accepted_evidence_id.length > 0,
    },
    {
      field: "route_evidence.source_record_id",
      ok:
        evidence.source_record_id === sample.source_record_id &&
        evidence.source_record_id === sourceRecordContract?.source_record_id,
    },
    {
      field: "route_evidence.retained_chart_id",
      ok: evidence.retained_chart_id === sourceRecordContract?.retained_chart_id,
    },
    {
      field: "route_evidence.retained_window_id",
      ok: evidence.retained_window_id === retainedWindow.id,
    },
    {
      field: "route_evidence.regulator_state.eta",
      ok: sameNumber(evidenceRegulator.eta, regulatorState.eta),
    },
    {
      field: "route_evidence.regulator_state.epsilon_c",
      ok: sameNumber(evidenceRegulator.epsilon_c, regulatorState.epsilon_c),
    },
    {
      field: "route_evidence.regulator_state.status",
      ok: evidenceRegulator.status === regulatorState.status,
    },
  ];
}

function acceptedEvidenceMismatches(sample, sourceRecordContract) {
  return acceptedEvidenceContractChecks(sample, sourceRecordContract)
    .filter((entry) => !entry.ok)
    .map((entry) => entry.field);
}

function acceptedForBranchRetention(sample, sourceRecordContract) {
  return (
    routeRequired(sample) &&
    acceptedEvidenceAttempted(sample) &&
    acceptedEvidenceMismatches(sample, sourceRecordContract).length === 0
  );
}

function thresholdReplayEvidenceLevel(sample) {
  if (sample.route_kind === "finite-eta") {
    return "toy_threshold_finite_eta_route";
  }
  return "toy_threshold_self_hit_route";
}

function routeEvidenceLevel(sample, sourceRecordContract) {
  if (!routeRequired(sample)) {
    return "not_required";
  }
  if (acceptedForBranchRetention(sample, sourceRecordContract)) {
    return "accepted_for_branch_retention";
  }
  if (acceptedEvidenceAttempted(sample)) {
    return "accepted_evidence_contract_mismatch";
  }
  if (!sample.route_kind) {
    return "missing";
  }
  if (sample.route_evidence?.model === "middle_hinge_threshold_toy_replay") {
    return thresholdReplayEvidenceLevel(sample);
  }
  if (
    sample.route_status === "declared_priority_root_replay_route" ||
    sample.route_status === "declared_priority_caustic_or_finite_eta_route"
  ) {
    return "synthetic_row_logic";
  }
  if (typeof sample.route_evidence?.evidence_level === "string") {
    return sample.route_evidence.evidence_level;
  }
  if (typeof sample.route_evidence?.model === "string") {
    return "declared_route_evidence";
  }
  return "declared_without_evidence";
}

function routeEvidenceSummary(samples, sourceRecordContract) {
  const sampleEvidence = samples.map((sample) => ({
    sample_index: sample.sample_index,
    root_status_symbol: sample.root_status_symbol,
    route_required: routeRequired(sample),
    route_kind: sample.route_kind,
    route_status: sample.route_status,
    evidence_level: routeEvidenceLevel(sample, sourceRecordContract),
    accepted_evidence_contract_attempted: acceptedEvidenceAttempted(sample),
    accepted_evidence_mismatches: acceptedEvidenceAttempted(sample)
      ? acceptedEvidenceMismatches(sample, sourceRecordContract)
      : [],
    accepted_for_branch_retention: acceptedForBranchRetention(sample, sourceRecordContract),
  }));
  const countsByEvidenceLevel = {};
  for (const entry of sampleEvidence) {
    countsByEvidenceLevel[entry.evidence_level] =
      (countsByEvidenceLevel[entry.evidence_level] ?? 0) + 1;
  }
  const routeRequiredCount = sampleEvidence.filter((entry) => entry.route_required).length;
  const acceptedSampleCount = sampleEvidence.filter(
    (entry) => entry.accepted_for_branch_retention
  ).length;
  return {
    route_required_sample_count: routeRequiredCount,
    accepted_sample_count: acceptedSampleCount,
    accepted_for_branch_retention:
      routeRequiredCount > 0 && acceptedSampleCount === routeRequiredCount,
    counts_by_evidence_level: countsByEvidenceLevel,
    sample_evidence: sampleEvidence,
  };
}

function expectedSymbol(residual) {
  if (Math.abs(residual) <= RESIDUAL_TOLERANCE) {
    return "C";
  }
  return residual > 0 ? "1" : "0";
}

function buildSampleRows(topological, routed) {
  return (topological.middle_hinge_root_count_word?.rows ?? []).map((hingeRow, index) => {
    const symbol = hingeRow.root_status_symbol;
    let routeKind = NOT_REQUIRED_ROUTE_KIND;
    let routeStatus = "strict_sub_field_speed_no_nearby_simple_self_hit";
    if (symbol === "1") {
      routeKind = routed ? SUPER_FIELD_ROUTE_KINDS[index % SUPER_FIELD_ROUTE_KINDS.length] : null;
      routeStatus = routed
        ? "declared_priority_root_replay_route"
        : "missing_super_field_root_replay_route";
    } else if (symbol === "C") {
      routeKind = routed ? CAUSTIC_ROUTE_KINDS[index % CAUSTIC_ROUTE_KINDS.length] : null;
      routeStatus = routed
        ? "declared_priority_caustic_or_finite_eta_route"
        : "missing_caustic_or_finite_eta_route";
    }
    return {
      sample_index: index,
      source_record_id: topological.source_record_contract?.source_record_id ?? null,
      v_M_rel: hingeRow.v_M_rel,
      c_f: hingeRow.c_f,
      residual: hingeRow.residual,
      root_status_symbol: symbol,
      row_status: hingeRow.row_status,
      route_kind: routeKind,
      route_status: routeStatus,
    };
  });
}

function transitionKind(fromSymbol, toSymbol) {
  if (fromSymbol === toSymbol) {
    return "same_status";
  }
  if (fromSymbol === "C") {
    return "caustic_boundary_exit";
  }
  if (toSymbol === "C") {
    return "caustic_boundary_entry";
  }
  if (fromSymbol === "0" && toSymbol === "1") {
    return "sub_to_super_field_crossing";
  }
  if (fromSymbol === "1" && toSymbol === "0") {
    return "super_to_sub_field_crossing";
  }
  return "unclassified_transition";
}

function transitionRouteObligation(kind) {
  if (kind === "same_status") {
    return "none";
  }
  if (kind === "caustic_boundary_entry" || kind === "caustic_boundary_exit") {
    return "caustic_or_finite_eta_route";
  }
  return "root_replay_route";
}

function buildTransitionRows(samples) {
  const transitions = [];
  for (let index = 0; index < samples.length - 1; index += 1) {
    const from = samples[index];
    const to = samples[index + 1];
    const kind = transitionKind(from.root_status_symbol, to.root_status_symbol);
    transitions.push({
      transition_index: index,
      from_sample_index: from.sample_index,
      to_sample_index: to.sample_index,
      from_symbol: from.root_status_symbol,
      to_symbol: to.root_status_symbol,
      transition_symbol: `${from.root_status_symbol}->${to.root_status_symbol}`,
      residual_interval: [from.residual, to.residual],
      transition_kind: kind,
      route_obligation: transitionRouteObligation(kind),
    });
  }
  return transitions;
}

export function buildDefaultMiddleHingeRootStatusInput(options = {}) {
  const topological = buildTopologicalCausalRootLedgerArtifact({
    subdivisions: options.subdivisions ?? 300,
    windingRadius: options.windingRadius ?? 1,
  });
  const sampleRows = buildSampleRows(topological, false);
  return {
    topological,
    not_literal_communication: topological.middle_hinge_root_count_word?.not_literal_communication === true,
    sample_rows: sampleRows,
    transition_rows: buildTransitionRows(sampleRows),
  };
}

export function buildSyntheticMiddleHingeRootStatusInput(options = {}) {
  const topological = buildTopologicalCausalRootLedgerArtifact({
    subdivisions: options.subdivisions ?? 300,
    windingRadius: options.windingRadius ?? 1,
  });
  const sampleRows = buildSampleRows(topological, true);
  return {
    topological,
    not_literal_communication: true,
    sample_rows: sampleRows,
    transition_rows: buildTransitionRows(sampleRows),
  };
}

function thresholdReplayEvidence(sample) {
  if (sample.root_status_symbol === "1") {
    return {
      model: "middle_hinge_threshold_toy_replay",
      route_kind: "self-hit",
      route_status: "threshold_self_hit_replay_diagnostic",
      residual: sample.residual,
      v_M_rel: sample.v_M_rel,
      c_f: sample.c_f,
      residual_positive: sample.v_M_rel - sample.c_f > RESIDUAL_TOLERANCE,
      claim_level: "toy threshold route; not middle-hinge communication, action increment, or branch retention",
    };
  }
  if (sample.root_status_symbol === "C") {
    return {
      model: "middle_hinge_threshold_toy_replay",
      route_kind: "finite-eta",
      route_status: "finite_eta_threshold_route_diagnostic",
      residual: sample.residual,
      v_M_rel: sample.v_M_rel,
      c_f: sample.c_f,
      residual_within_tolerance: Math.abs(sample.v_M_rel - sample.c_f) <= RESIDUAL_TOLERANCE,
      claim_level: "toy threshold route; not middle-hinge communication, action increment, or branch retention",
    };
  }
  return null;
}

export function buildThresholdReplayMiddleHingeRootStatusInput(options = {}) {
  const input = buildDefaultMiddleHingeRootStatusInput(options);
  for (const sample of input.sample_rows) {
    const evidence = thresholdReplayEvidence(sample);
    if (!evidence) {
      continue;
    }
    sample.route_kind = evidence.route_kind;
    sample.route_status = evidence.route_status;
    sample.route_evidence = evidence;
  }
  return input;
}

export function applyMiddleHingeRootStatusControl(input, controlName) {
  const packet = deepClone(input);
  if (!controlName || controlName === "none") {
    return packet;
  }

  if (controlName === "literal-communication") {
    packet.not_literal_communication = false;
    const superFieldSample = (packet.sample_rows ?? []).find((sample) => sample.root_status_symbol === "1");
    if (superFieldSample) {
      superFieldSample.route_status = "literal_telegraph_message";
    }
    return packet;
  }

  if (controlName === "sample-source-record-mismatch") {
    packet.sample_rows[0].source_record_id = "theta_sea_branch_q1_v0";
    return packet;
  }

  if (controlName === "missing-super-field-route") {
    const superFieldSample = (packet.sample_rows ?? []).find((sample) => sample.root_status_symbol === "1");
    if (superFieldSample) {
      superFieldSample.route_kind = null;
      superFieldSample.route_status = "missing_super_field_root_replay_route";
    }
    return packet;
  }

  if (controlName === "missing-caustic-route") {
    const causticSample = (packet.sample_rows ?? []).find((sample) => sample.root_status_symbol === "C");
    if (causticSample) {
      causticSample.route_kind = null;
      causticSample.route_status = "missing_caustic_or_finite_eta_route";
    }
    return packet;
  }

  if (controlName === "wrong-root-status-word") {
    const causticSample = (packet.sample_rows ?? []).find((sample) => sample.root_status_symbol === "C");
    if (causticSample) {
      causticSample.root_status_symbol = "1";
      packet.transition_rows = buildTransitionRows(packet.sample_rows ?? []);
    }
    return packet;
  }

  throw new Error(`unknown control: ${controlName}`);
}

function evaluateSpeedResidualWord(input) {
  const samples = input.sample_rows ?? [];
  const expectedWord = samples.map((sample) => expectedSymbol(sample.v_M_rel - sample.c_f)).join(" ");
  const declaredWord = samples.map((sample) => sample.root_status_symbol).join(" ");
  const checks = samples.map((sample) => ({
    field: `sample_${sample.sample_index}.root_status_symbol`,
    ok: sample.root_status_symbol === expectedSymbol(sample.v_M_rel - sample.c_f),
  }));
  checks.push({ field: "root_status_word", ok: declaredWord === expectedWord });
  return row(
    "speed_residual_word",
    "the middle-hinge word is computed from sign(v_M^rel-c_f), with C reserved for tangent or finite-eta routing",
    "residual.middle_hinge_word_mismatch",
    checks,
    {
      declared_root_status_word: declaredWord,
      expected_root_status_word: expectedWord,
    }
  );
}

function evaluateSampleSourceRecordIdentity(input) {
  const referenceId = input.topological?.source_record_contract?.source_record_id ?? null;
  const samples = input.sample_rows ?? [];
  const checks = [
    { field: "topological.source_record_contract.source_record_id", ok: typeof referenceId === "string" },
    { field: "sample_rows_present", ok: samples.length > 0 },
  ];
  for (const sample of samples) {
    checks.push({
      field: `sample_${sample.sample_index}.source_record_id`,
      ok: sample.source_record_id === referenceId,
    });
  }
  return row(
    "sample_source_record_identity",
    "every middle-hinge route sample belongs to the same retained source record as the causal-root topology",
    "residual.retained_history_mismatch",
    checks
  );
}

function evaluateSuperFieldRoute(input) {
  const checks = [];
  for (const sample of input.sample_rows ?? []) {
    if (sample.root_status_symbol === "1") {
      checks.push({
        field: `sample_${sample.sample_index}.route_kind`,
        ok: SUPER_FIELD_ROUTE_KINDS.includes(sample.route_kind),
      });
      checks.push({
        field: `sample_${sample.sample_index}.source_record_id`,
        ok: typeof sample.source_record_id === "string" && sample.source_record_id.length > 0,
      });
    }
  }
  return row(
    "super_field_root_replay_route",
    "each super-field middle-hinge sample has a self-hit or inactive-root replay route",
    "residual.middle_hinge_unrouted",
    checks,
    { allowed_route_kinds: SUPER_FIELD_ROUTE_KINDS }
  );
}

function evaluateCausticRoute(input) {
  const checks = [];
  for (const sample of input.sample_rows ?? []) {
    if (sample.root_status_symbol === "C") {
      checks.push({
        field: `sample_${sample.sample_index}.route_kind`,
        ok: CAUSTIC_ROUTE_KINDS.includes(sample.route_kind),
      });
    }
  }
  return row(
    "caustic_finite_eta_route",
    "each threshold sample has a caustic or finite-eta route rather than an ordinary force row",
    "residual.middle_hinge_unrouted",
    checks,
    { allowed_route_kinds: CAUSTIC_ROUTE_KINDS }
  );
}

function routePresentForTransition(input, transition) {
  if (transition.route_obligation === "none") {
    return true;
  }
  const samples = input.sample_rows ?? [];
  const from = samples.find((sample) => sample.sample_index === transition.from_sample_index);
  const to = samples.find((sample) => sample.sample_index === transition.to_sample_index);
  if (transition.route_obligation === "caustic_or_finite_eta_route") {
    return [from, to].some((sample) => CAUSTIC_ROUTE_KINDS.includes(sample?.route_kind));
  }
  return [from, to].some((sample) => SUPER_FIELD_ROUTE_KINDS.includes(sample?.route_kind));
}

function evaluateTransitionRows(input) {
  const samples = input.sample_rows ?? [];
  const transitions = input.transition_rows ?? [];
  const checks = [
    { field: "transition_count", ok: transitions.length === Math.max(samples.length - 1, 0) },
  ];
  for (const transition of transitions) {
    checks.push({
      field: `transition_${transition.transition_index}.classified`,
      ok: transition.transition_kind !== "unclassified_transition",
    });
    checks.push({
      field: `transition_${transition.transition_index}.route_obligation`,
      ok: ["none", "root_replay_route", "caustic_or_finite_eta_route"].includes(transition.route_obligation),
    });
    checks.push({
      field: `transition_${transition.transition_index}.route_present`,
      ok: routePresentForTransition(input, transition),
    });
  }
  return row(
    "transition_rows",
    "adjacent middle-hinge word samples emit classified threshold transitions with route obligations",
    "residual.middle_hinge_unrouted",
    checks,
    {
      transition_rows: transitions,
    }
  );
}

function evaluateNotLiteralCommunication(input) {
  const checks = [
    { field: "not_literal_communication", ok: input.not_literal_communication === true },
    {
      field: "route_status_no_literal_message",
      ok: (input.sample_rows ?? []).every((sample) => sample.route_status !== "literal_telegraph_message"),
    },
  ];
  return row(
    "not_literal_communication",
    "the hinge word is interpreted as root-status routing, not literal communication",
    "residual.literal_communication_conflation",
    checks
  );
}

export function buildMiddleHingeRootStatusDiagnostic(
  input = buildDefaultMiddleHingeRootStatusInput()
) {
  const evidenceSummary = routeEvidenceSummary(
    input.sample_rows ?? [],
    input.topological?.source_record_contract ?? null
  );
  const diagnosticRows = [
    evaluateSpeedResidualWord(input),
    evaluateSampleSourceRecordIdentity(input),
    evaluateSuperFieldRoute(input),
    evaluateCausticRoute(input),
    evaluateTransitionRows(input),
    evaluateNotLiteralCommunication(input),
  ];
  const failedRows = diagnosticRows.filter((entry) => entry.status === "fail");
  const topologicalValidationErrors = validateTopologicalCausalRootLedgerArtifact(input.topological ?? {});

  return {
    schema: MIDDLE_HINGE_ROOT_STATUS_SCHEMA,
    artifact_schema: MIDDLE_HINGE_ROOT_STATUS_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    claim_level:
      "diagnostic-only priority artifact; does not prove middle-hinge communication, action increments, or branch retention",
    source_record_id: input.topological?.source_record_contract?.source_record_id ?? null,
    source_record_contract: deepClone(input.topological?.source_record_contract ?? null),
    input_summary: {
      topological: artifactSummary(input.topological),
      topological_validation_errors: topologicalValidationErrors,
      sample_count: input.sample_rows?.length ?? 0,
      transition_count: input.transition_rows?.length ?? 0,
      declared_root_status_word: (input.sample_rows ?? []).map((sample) => sample.root_status_symbol).join(" "),
    },
    route_evidence_summary: evidenceSummary,
    sample_rows: input.sample_rows ?? [],
    transition_rows: input.transition_rows ?? [],
    diagnostic_rows: diagnosticRows,
    negative_controls: Object.fromEntries(
      CONTROLS.map((controlName) => [controlName, "residual.middle_hinge_unrouted"])
    ),
    result: {
      diagnostic_status: failedRows.length === 0 ? "diagnostic_passed_priority_only" : "diagnostic_failed",
      retained_branch: false,
      updates_live_validation_gate: false,
      accepted_route_evidence_for_branch_retention:
        evidenceSummary.accepted_for_branch_retention,
      failure_code: failedRows[0]?.failure_code ?? null,
      first_failed_row: failedRows[0]?.row_id ?? null,
      first_failure_status:
        failedRows[0]?.failure_code ??
        "middle_hinge_routes_populated_priority_only; action_increment_still_not_proved",
      strongest_artifact:
        "middle-hinge root-status route diagnostic for sign(v_M^rel-c_f), self-hit/inactive-root replay, and caustic/finite-eta routing",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateMiddleHingeRootStatusArtifact(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(artifact.schema === MIDDLE_HINGE_ROOT_STATUS_SCHEMA, `schema must be ${MIDDLE_HINGE_ROOT_STATUS_SCHEMA}`, errors);
  assertField(artifact.artifact_schema === MIDDLE_HINGE_ROOT_STATUS_SCHEMA, `artifact_schema must be ${MIDDLE_HINGE_ROOT_STATUS_SCHEMA}`, errors);
  assertField(artifact.packet_id === PACKET_ID, `packet_id must be ${PACKET_ID}`, errors);
  assertField(artifact.promotion_status === PROMOTION_STATUS, `promotion_status must be ${PROMOTION_STATUS}`, errors);
  assertField(artifact.result?.retained_branch === false, "artifact must declare retained_branch=false", errors);
  assertField(artifact.result?.updates_live_validation_gate === false, "artifact must not update a live validation gate", errors);
  assertField(Array.isArray(artifact.sample_rows), "sample_rows must be an array", errors);
  assertField(Array.isArray(artifact.transition_rows), "transition_rows must be an array", errors);
  assertField(Array.isArray(artifact.diagnostic_rows), "diagnostic_rows must be an array", errors);

  if (Array.isArray(artifact.diagnostic_rows)) {
    const rowIds = artifact.diagnostic_rows.map((entry) => entry.row_id);
    for (const rowId of REQUIRED_ROW_IDS) {
      assertField(rowIds.includes(rowId), `diagnostic_rows must include ${rowId}`, errors);
    }
    for (const entry of artifact.diagnostic_rows) {
      assertField(entry.status === "pass" || entry.status === "fail", `${entry.row_id} must have pass/fail status`, errors);
      assertField(Array.isArray(entry.checks), `${entry.row_id} must include checks`, errors);
      assertField(Array.isArray(entry.mismatches), `${entry.row_id} must include mismatches`, errors);
      assertField(
        entry.status === "pass" ? entry.failure_code === null : typeof entry.failure_code === "string",
        `${entry.row_id} must carry failure_code only when failed`,
        errors
      );
    }

    const failedRows = artifact.diagnostic_rows.filter((entry) => entry.status === "fail");
    assertField(
      artifact.result?.diagnostic_status ===
        (failedRows.length === 0 ? "diagnostic_passed_priority_only" : "diagnostic_failed"),
      "result.diagnostic_status must match diagnostic row failures",
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
    "Usage: node scripts/proof-programs/middle-hinge-root-status-diagnostic.mjs [options]",
    "",
    "Options:",
    "  --input <path>       Read middle-hinge input JSON instead of the default fail-closed fixture",
    `  --control <name>     Apply a negative control: ${CONTROLS.join(", ")}`,
    "  --synthetic-routed   Build a synthetic routed fixture for row-logic tests",
    "  --threshold-replay   Build a toy threshold replay fixture for 1/C root-status samples",
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
    syntheticRouted: false,
    thresholdReplay: false,
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
    } else if (arg === "--synthetic-routed") {
      args.syntheticRouted = true;
    } else if (arg === "--threshold-replay") {
      args.thresholdReplay = true;
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
          schema: "aaa-proof/middle-hinge-root-status-diagnostic-schema/v1",
          artifact_schema: MIDDLE_HINGE_ROOT_STATUS_SCHEMA,
          promotion_status: PROMOTION_STATUS,
          packet_id: PACKET_ID,
          super_field_route_kinds: SUPER_FIELD_ROUTE_KINDS,
          caustic_route_kinds: CAUSTIC_ROUTE_KINDS,
          replay_fixture: "threshold-replay",
          route_evidence_summary: [
            "sample_evidence",
            "counts_by_evidence_level",
            "accepted_evidence_contract_attempted",
            "accepted_evidence_mismatches",
            "accepted_for_branch_retention",
          ],
          controls: CONTROLS,
        },
        args.pretty
      )
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors = validateMiddleHingeRootStatusArtifact(artifact);
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
    : args.thresholdReplay
      ? buildThresholdReplayMiddleHingeRootStatusInput()
      : args.syntheticRouted
      ? buildSyntheticMiddleHingeRootStatusInput()
      : buildDefaultMiddleHingeRootStatusInput();
  const input = applyMiddleHingeRootStatusControl(baseInput, args.control);
  const artifact = buildMiddleHingeRootStatusDiagnostic(input);
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
