#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildTopologicalCausalRootLedgerArtifact,
  validateTopologicalCausalRootLedgerArtifact,
} from "./topological-causal-root-ledger-checker.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const PHOTON_CONSTITUENT_ROOT_ROUTE_SCHEMA =
  "aaa-proof/photon-constituent-root-route-diagnostic/v1";

const PACKET_ID = "photon_constituent_root_route_diagnostic";
const PROMOTION_STATUS = "priority-only diagnostic";
const REQUIRED_ROW_IDS = [
  "speed_symbol_distinction",
  "absolute_velocity_split",
  "sample_source_record_identity",
  "super_field_speed_route",
  "centerline_not_constituent_route",
];
const SUPER_FIELD_ROUTE_KINDS = ["self-hit", "partner-hit", "caustic", "inactive-root"];
const NOT_REQUIRED_ROUTE_KIND = "not-required";
const ACCEPTED_ROUTE_PROOF_OBJECT_ROLE = "active_root_route_derivation_proof_object";
const CONTROLS = [
  "speed-conflation",
  "sample-source-record-mismatch",
  "missing-super-field-route",
  "centerline-only-route",
  "illegal-route",
];
const SPEED_TOLERANCE = 1e-9;
const REPLAY_ROOT_EPSILON = 1e-8;
const REPLAY_ROOT_TOLERANCE = 1e-12;

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function sameNumber(left, right, tolerance = SPEED_TOLERANCE) {
  return Number.isFinite(left) && Number.isFinite(right) && Math.abs(left - right) <= tolerance;
}

function collectMismatches(checks) {
  return checks.filter((entry) => !entry.ok).map((entry) => entry.field);
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
  return sample.speed_relation === "constituent_absolute_speed_exceeds_c_f";
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
  const proofObject = evidence.derivation_proof_object ?? {};
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
      field: "route_evidence.derivation_proof_object.role",
      ok: proofObject.role === ACCEPTED_ROUTE_PROOF_OBJECT_ROLE,
    },
    {
      field: "route_evidence.derivation_proof_object.accepted_evidence_id",
      ok:
        typeof evidence.accepted_evidence_id === "string" &&
        proofObject.accepted_evidence_id === evidence.accepted_evidence_id,
    },
    {
      field: "route_evidence.derivation_proof_object.source_record_id",
      ok: proofObject.source_record_id === evidence.source_record_id,
    },
    {
      field: "route_evidence.derivation_proof_object.status",
      ok: proofObject.status === "accepted",
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
  if (sample.route_evidence?.model === "helical_constituent_toy_replay") {
    return "toy_self_hit_replay";
  }
  if (sample.route_status === "declared_priority_route") {
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

function routeKindForIndex(index) {
  return SUPER_FIELD_ROUTE_KINDS[index % SUPER_FIELD_ROUTE_KINDS.length];
}

function formatNumber(value, digits = 12) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(digits));
}

function helicalSelfHitRootReplay(sample, omega = 1) {
  if (
    sample.speed_relation !== "constituent_absolute_speed_exceeds_c_f" ||
    sample.transverse_speed <= 0 ||
    sample.c_gamma >= sample.c_f
  ) {
    return null;
  }

  const radius = sample.transverse_speed / omega;
  const rootFunction = (tau) => {
    const axial = sample.c_gamma * tau;
    const transverseY = radius * (1 - Math.cos(omega * tau));
    const transverseZ = radius * Math.sin(omega * tau);
    return Math.hypot(axial, transverseY, transverseZ) - sample.c_f * tau;
  };
  let left = REPLAY_ROOT_EPSILON;
  let right = (2 * Math.PI) / omega;
  let leftValue = rootFunction(left);
  let rightValue = rootFunction(right);
  if (!(leftValue > 0 && rightValue < 0)) {
    return null;
  }

  for (let index = 0; index < 100; index += 1) {
    const middle = 0.5 * (left + right);
    const middleValue = rootFunction(middle);
    if (Math.abs(middleValue) <= REPLAY_ROOT_TOLERANCE || Math.abs(right - left) <= REPLAY_ROOT_TOLERANCE) {
      left = middle;
      right = middle;
      leftValue = middleValue;
      rightValue = middleValue;
      break;
    }
    if (leftValue * middleValue <= 0) {
      right = middle;
      rightValue = middleValue;
    } else {
      left = middle;
      leftValue = middleValue;
    }
  }

  const rootTau = 0.5 * (left + right);
  return {
    analysis_id: "prescribed-path-analysis",
    evidence_grade: "display-only-visualization",
    non_evidence: true,
    dynamical_evidence: false,
    retained_branch_evidence: false,
    model: "helical_constituent_toy_replay",
    route_kind: "self-hit",
    route_status: "self_hit_replay_diagnostic",
    endpoint_excluded: true,
    omega,
    transverse_radius: formatNumber(radius),
    root_tau: formatNumber(rootTau),
    root_residual: formatNumber(rootFunction(rootTau)),
    sign_change: {
      left_tau: REPLAY_ROOT_EPSILON,
      left_value: formatNumber(rootFunction(REPLAY_ROOT_EPSILON)),
      right_tau: formatNumber((2 * Math.PI) / omega),
      right_value: formatNumber(rootFunction((2 * Math.PI) / omega)),
    },
    claim_level: "toy diagnostic self-hit route; not photon closure or branch retention",
  };
}

function buildSampleRows(topological, routed) {
  return (topological.photon_constituent_speed_split?.rows ?? []).map((speedRow, index) => {
    const superField = speedRow.speed_relation === "constituent_absolute_speed_exceeds_c_f";
    return {
      sample_index: index,
      source_record_id: topological.source_record_contract?.source_record_id ?? null,
      c_f: speedRow.c_f,
      c_gamma: speedRow.c_gamma,
      c_eff: speedRow.c_eff,
      c_0: speedRow.c_0,
      transverse_speed: speedRow.transverse_speed,
      constituent_absolute_speed: speedRow.constituent_absolute_speed,
      speed_relation: speedRow.speed_relation,
      route_kind: superField ? (routed ? routeKindForIndex(index) : null) : NOT_REQUIRED_ROUTE_KIND,
      route_status: superField
        ? routed
          ? "declared_priority_route"
          : "missing_super_field_speed_route"
        : "speed_split_does_not_force_root_replay",
    };
  });
}

export function buildDefaultPhotonConstituentRootRouteInput(options = {}) {
  const topological = buildTopologicalCausalRootLedgerArtifact({
    subdivisions: options.subdivisions ?? 300,
    windingRadius: options.windingRadius ?? 1,
  });
  return {
    topological,
    sample_rows: buildSampleRows(topological, false),
  };
}

export function buildSyntheticPhotonConstituentRootRouteInput(options = {}) {
  const topological = buildTopologicalCausalRootLedgerArtifact({
    subdivisions: options.subdivisions ?? 300,
    windingRadius: options.windingRadius ?? 1,
  });
  return {
    topological,
    sample_rows: buildSampleRows(topological, true),
  };
}

export function buildSelfHitReplayPhotonConstituentRootRouteInput(options = {}) {
  const input = buildDefaultPhotonConstituentRootRouteInput(options);
  const omega = options.omega ?? 1;
  for (const sample of input.sample_rows) {
    const evidence = helicalSelfHitRootReplay(sample, omega);
    if (evidence) {
      sample.route_kind = evidence.route_kind;
      sample.route_status = evidence.route_status;
      sample.route_evidence = evidence;
    }
  }
  return input;
}

export function applyPhotonConstituentRootRouteControl(input, controlName) {
  const packet = deepClone(input);
  if (!controlName || controlName === "none") {
    return packet;
  }

  if (controlName === "speed-conflation") {
    for (const sample of packet.sample_rows ?? []) {
      sample.c_gamma = sample.c_f;
      sample.c_eff = sample.c_f;
      sample.c_0 = sample.c_f;
      sample.constituent_absolute_speed = Math.hypot(sample.c_gamma, sample.transverse_speed);
      sample.speed_relation =
        sample.constituent_absolute_speed > sample.c_f
          ? "constituent_absolute_speed_exceeds_c_f"
          : "constituent_absolute_speed_not_above_c_f";
    }
    return packet;
  }

  if (controlName === "sample-source-record-mismatch") {
    packet.sample_rows[0].source_record_id = "theta_sea_branch_q1_v0";
    return packet;
  }

  const superFieldSample = (packet.sample_rows ?? []).find(
    (sample) => sample.speed_relation === "constituent_absolute_speed_exceeds_c_f"
  );
  if (!superFieldSample) {
    throw new Error("control requires at least one super-field-speed sample");
  }

  if (controlName === "missing-super-field-route") {
    superFieldSample.route_kind = null;
    superFieldSample.route_status = "missing_super_field_speed_route";
    return packet;
  }

  if (controlName === "centerline-only-route") {
    superFieldSample.route_kind = NOT_REQUIRED_ROUTE_KIND;
    superFieldSample.route_status = "centerline_speed_only";
    return packet;
  }

  if (controlName === "illegal-route") {
    superFieldSample.route_kind = "smooth-photon-label";
    superFieldSample.route_status = "illegal_route";
    return packet;
  }

  throw new Error(`unknown control: ${controlName}`);
}

function evaluateSpeedSymbolDistinction(samples) {
  const checks = [];
  for (const sample of samples) {
    checks.push({ field: `sample_${sample.sample_index}.c_f_positive`, ok: sample.c_f > 0 });
    checks.push({ field: `sample_${sample.sample_index}.c_gamma_distinct`, ok: sample.c_gamma !== sample.c_f });
    checks.push({ field: `sample_${sample.sample_index}.c_eff_distinct`, ok: sample.c_eff !== sample.c_f });
    checks.push({ field: `sample_${sample.sample_index}.c_0_distinct`, ok: sample.c_0 !== sample.c_f });
    checks.push({ field: `sample_${sample.sample_index}.c_gamma_not_above_c_f`, ok: sample.c_gamma <= sample.c_f });
  }
  return row(
    "speed_symbol_distinction",
    "$c_f$, $c_\\gamma$, $c_{\\text{eff}}$, and $c_0$ remain distinct until a common-limit proof supplies the identification",
    "residual.speed_conflation",
    checks
  );
}

function evaluateAbsoluteVelocitySplit(samples) {
  const checks = [];
  for (const sample of samples) {
    const expected = Math.hypot(sample.c_gamma, sample.transverse_speed);
    checks.push({
      field: `sample_${sample.sample_index}.constituent_absolute_speed`,
      ok: sameNumber(sample.constituent_absolute_speed, expected),
    });
  }
  checks.push({
    field: "super_field_speed_sample_present",
    ok: samples.some((sample) => sample.speed_relation === "constituent_absolute_speed_exceeds_c_f"),
  });
  return row(
    "absolute_velocity_split",
    "constituent absolute speed is computed from the photon-channel centerline speed plus transverse internal speed",
    "residual.photon_constituent_speed_split",
    checks
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
    "every photon constituent route sample belongs to the same retained source record as the causal-root topology",
    "residual.retained_history_mismatch",
    checks
  );
}

function evaluateSuperFieldSpeedRoute(samples) {
  const checks = [];
  for (const sample of samples) {
    if (sample.speed_relation === "constituent_absolute_speed_exceeds_c_f") {
      checks.push({
        field: `sample_${sample.sample_index}.route_kind`,
        ok: SUPER_FIELD_ROUTE_KINDS.includes(sample.route_kind),
      });
      checks.push({
        field: `sample_${sample.sample_index}.source_record_id`,
        ok: typeof sample.source_record_id === "string" && sample.source_record_id.length > 0,
      });
    } else {
      checks.push({
        field: `sample_${sample.sample_index}.not_required_route`,
        ok: sample.route_kind === NOT_REQUIRED_ROUTE_KIND,
      });
    }
  }
  return row(
    "super_field_speed_route",
    "every constituent absolute speed above $c_f$ has an explicit self-hit, partner-hit, caustic, or inactive-root route",
    "residual.photon_constituent_unrouted",
    checks,
    { allowed_route_kinds: SUPER_FIELD_ROUTE_KINDS }
  );
}

function evaluateCenterlineNotConstituentRoute(samples) {
  const checks = [];
  for (const sample of samples.filter(
    (entry) => entry.speed_relation === "constituent_absolute_speed_exceeds_c_f"
  )) {
    checks.push({
      field: `sample_${sample.sample_index}.centerline_not_sufficient`,
      ok: sample.c_gamma <= sample.c_f && sample.route_kind !== NOT_REQUIRED_ROUTE_KIND,
    });
  }
  return row(
    "centerline_not_constituent_route",
    "a legal photon-channel centerline speed does not by itself route a super-field-speed constituent absolute history",
    "residual.photon_constituent_unrouted",
    checks
  );
}

export function buildPhotonConstituentRootRouteDiagnostic(
  input = buildDefaultPhotonConstituentRootRouteInput()
) {
  const samples = input.sample_rows ?? [];
  const evidenceSummary = routeEvidenceSummary(
    samples,
    input.topological?.source_record_contract ?? null
  );
  const diagnosticRows = [
    evaluateSpeedSymbolDistinction(samples),
    evaluateAbsoluteVelocitySplit(samples),
    evaluateSampleSourceRecordIdentity(input),
    evaluateSuperFieldSpeedRoute(samples),
    evaluateCenterlineNotConstituentRoute(samples),
  ];
  const failedRows = diagnosticRows.filter((entry) => entry.status === "fail");
  const topologicalValidationErrors = validateTopologicalCausalRootLedgerArtifact(input.topological ?? {});

  return {
    schema: PHOTON_CONSTITUENT_ROOT_ROUTE_SCHEMA,
    artifact_schema: PHOTON_CONSTITUENT_ROOT_ROUTE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    claim_level:
      "diagnostic-only priority artifact; does not prove photon closure, retain a branch, or update a validation gate",
    source_record_id: input.topological?.source_record_contract?.source_record_id ?? null,
    source_record_contract: deepClone(input.topological?.source_record_contract ?? null),
    input_summary: {
      topological: artifactSummary(input.topological),
      topological_validation_errors: topologicalValidationErrors,
      sample_count: samples.length,
      super_field_speed_sample_count: samples.filter(
        (sample) => sample.speed_relation === "constituent_absolute_speed_exceeds_c_f"
      ).length,
    },
    route_evidence_summary: evidenceSummary,
    sample_rows: samples,
    diagnostic_rows: diagnosticRows,
    negative_controls: Object.fromEntries(
      CONTROLS.map((controlName) => [controlName, "residual.photon_constituent_unrouted"])
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
        "photon_constituent_routes_populated_priority_only; photon_closure_still_not_proved",
      strongest_artifact:
        "photon constituent absolute-speed route diagnostic separating centerline speed from self-hit, partner-hit, caustic, and inactive-root routes",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validatePhotonConstituentRootRouteArtifact(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(artifact.schema === PHOTON_CONSTITUENT_ROOT_ROUTE_SCHEMA, `schema must be ${PHOTON_CONSTITUENT_ROOT_ROUTE_SCHEMA}`, errors);
  assertField(artifact.artifact_schema === PHOTON_CONSTITUENT_ROOT_ROUTE_SCHEMA, `artifact_schema must be ${PHOTON_CONSTITUENT_ROOT_ROUTE_SCHEMA}`, errors);
  assertField(artifact.packet_id === PACKET_ID, `packet_id must be ${PACKET_ID}`, errors);
  assertField(artifact.promotion_status === PROMOTION_STATUS, `promotion_status must be ${PROMOTION_STATUS}`, errors);
  assertField(artifact.result?.retained_branch === false, "artifact must declare retained_branch=false", errors);
  assertField(artifact.result?.updates_live_validation_gate === false, "artifact must not update a live validation gate", errors);
  assertField(Array.isArray(artifact.sample_rows), "sample_rows must be an array", errors);
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
    "Usage: node scripts/proof-programs/photon-constituent-root-route-diagnostic.mjs [options]",
    "",
    "Options:",
    "  --input <path>       Read photon route input JSON instead of the default fail-closed fixture",
    `  --control <name>     Apply a negative control: ${CONTROLS.join(", ")}`,
    "  --synthetic-routed   Build a synthetic routed fixture for row-logic tests",
    "  --self-hit-replay    Build a toy helical self-hit replay fixture for super-field-speed samples",
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
    selfHitReplay: false,
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
    } else if (arg === "--self-hit-replay") {
      args.selfHitReplay = true;
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
          schema: "aaa-proof/photon-constituent-root-route-diagnostic-schema/v1",
          artifact_schema: PHOTON_CONSTITUENT_ROOT_ROUTE_SCHEMA,
          promotion_status: PROMOTION_STATUS,
          packet_id: PACKET_ID,
          route_kinds: SUPER_FIELD_ROUTE_KINDS,
          replay_fixture: "self-hit-replay",
          route_evidence_summary: [
            "sample_evidence",
            "counts_by_evidence_level",
            "accepted_evidence_contract_attempted",
            "accepted_evidence_mismatches",
            "derivation_proof_object",
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
    const errors = validatePhotonConstituentRootRouteArtifact(artifact);
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
    : args.selfHitReplay
      ? buildSelfHitReplayPhotonConstituentRootRouteInput()
      : args.syntheticRouted
      ? buildSyntheticPhotonConstituentRootRouteInput()
      : buildDefaultPhotonConstituentRootRouteInput();
  const input = applyPhotonConstituentRootRouteControl(baseInput, args.control);
  const artifact = buildPhotonConstituentRootRouteDiagnostic(input);
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
