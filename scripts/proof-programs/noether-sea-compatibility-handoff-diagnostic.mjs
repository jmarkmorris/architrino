#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const NOETHER_SEA_COMPATIBILITY_HANDOFF_SCHEMA =
  "aaa-proof/noether-sea-compatibility-handoff-diagnostic/v1";

const INPUT_SCHEMA = "aaa-proof/noether-sea-compatibility-handoff-input/v1";
const PACKET_ID = "noether_sea_compatibility_handoff_diagnostic";
const PROMOTION_STATUS = "priority-only diagnostic";
const REQUIRED_ROW_IDS = [
  "delta_id",
  "delta_W",
  "delta_reg",
  "delta_root",
  "delta_event",
  "delta_proj",
  "delta_coef",
  "speed_convention",
];
const REQUIRED_PROJECTIONS = [
  "density",
  "delay",
  "effective_potential",
  "stress",
  "lapse",
  "shift",
  "spatial_compliance",
  "G_eff",
  "c_eff",
  "c_gamma",
];
const COEFFICIENT_FAMILIES = ["clock", "ruler", "photon", "ppn", "sme"];

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function stableArray(value) {
  return Array.isArray(value) ? value.map(String).sort() : [];
}

function sameArray(left, right) {
  const leftStable = stableArray(left);
  const rightStable = stableArray(right);
  return leftStable.length === rightStable.length && leftStable.every((value, index) => value === rightStable[index]);
}

function sameNumber(left, right, tolerance = 1e-12) {
  return Number.isFinite(left) && Number.isFinite(right) && Math.abs(left - right) <= tolerance;
}

function collectMismatches(entries) {
  return entries.filter((entry) => !entry.ok).map((entry) => entry.field);
}

function row(rowId, residualSymbol, zeroCondition, failureCode, checks) {
  const mismatches = collectMismatches(checks);
  const passed = mismatches.length === 0;
  return {
    row_id: rowId,
    residual_symbol: residualSymbol,
    zero_condition: zeroCondition,
    status: passed ? "pass" : "fail",
    failure_code: passed ? null : failureCode,
    mismatches,
    checks,
  };
}

function assertObject(value, fieldName) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${fieldName} must be an object`);
  }
}

function defaultProjectionMap(responseObjectId) {
  return Object.fromEntries(REQUIRED_PROJECTIONS.map((projection) => [projection, responseObjectId]));
}

function defaultCoefficientMap(responseObjectId) {
  return Object.fromEntries(COEFFICIENT_FAMILIES.map((family) => [family, responseObjectId]));
}

export function buildDefaultNoetherSeaCompatibilityHandoffInput() {
  const responseObjectId = "M_sea_q0";
  const sourceRecord = {
    record_id: "theta_sea_branch_q0_v0",
    branch_class: "q0",
    retained_chart_id: "torus_root_ledger_q0",
    retained_window: {
      id: "W0",
      h: 7.25,
      memory_depth: 7.25,
    },
    regulator_state: {
      eta: 0.02,
      epsilon_c: 0.01,
      status: "declared",
    },
    active_root_ledger: {
      ledger_id: "R_act_q0",
      root_rows: ["r_pair_01", "r_pair_02", "r_self_01"],
      inactive_gap_rows: ["g_inact_01"],
      jacobian_floor: 0.640510868519,
      caustic_routes: ["middle_hinge_C"],
    },
    event_ledger: {
      ledger_id: "L_EpJ_q0",
      rows: ["energy_wake", "momentum_wake", "angular_momentum_wake", "medium_update"],
    },
    projection_maps: defaultProjectionMap(responseObjectId),
    coefficient_sources: defaultCoefficientMap(responseObjectId),
    speed_convention: {
      c_f: { source: "primitive_wake_speed", value: 1 },
      c_gamma: { source: responseObjectId, value: 0.995 },
      c_eff: { source: responseObjectId, value: 0.997 },
      c_0: { source: "asymptotic_response_limit", value: 0.996 },
      c_f_used_as_observer_speed: false,
    },
  };

  return {
    input_schema: INPUT_SCHEMA,
    packet_id: PACKET_ID,
    retained_branch_source_record: sourceRecord,
    handoff: {
      medium_response: {
        row_id: "medium_response",
        source_record_id: sourceRecord.record_id,
        response_object_id: responseObjectId,
        branch_class: sourceRecord.branch_class,
        retained_chart_id: sourceRecord.retained_chart_id,
        retained_window: deepClone(sourceRecord.retained_window),
        regulator_state: deepClone(sourceRecord.regulator_state),
        active_root_ledger: deepClone(sourceRecord.active_root_ledger),
        event_ledger: deepClone(sourceRecord.event_ledger),
        projection_maps: defaultProjectionMap(responseObjectId),
      },
      event_ledger: deepClone(sourceRecord.event_ledger),
      speed_convention: deepClone(sourceRecord.speed_convention),
      observable_coefficients: defaultCoefficientMap(responseObjectId),
      dependency_gates: {
        G4_effective_metric_and_shift: {
          row_state: "blocked_upstream",
          source_record_id: sourceRecord.record_id,
          response_object_id: responseObjectId,
        },
        G7_null_row_audit: {
          row_state: "blocked_upstream",
          expected_rows_present: true,
        },
      },
    },
    accepted_medium_response_evidence: null,
  };
}

export function applyNoetherSeaCompatibilityControl(input, controlName) {
  const packet = deepClone(input);
  if (!controlName || controlName === "none") {
    return packet;
  }

  if (controlName === "retained-history-mismatch") {
    packet.handoff.medium_response.source_record_id = "theta_sea_branch_q1_v0";
    packet.handoff.medium_response.retained_window.h = 6.5;
    packet.handoff.dependency_gates.G4_effective_metric_and_shift.source_record_id =
      "theta_sea_branch_q1_v0";
    return packet;
  }

  if (controlName === "speed-conflation") {
    packet.handoff.speed_convention.c_gamma.source = "primitive_wake_speed";
    packet.handoff.speed_convention.c_0.source = "primitive_wake_speed";
    packet.handoff.speed_convention.c_f_used_as_observer_speed = true;
    return packet;
  }

  if (controlName === "hidden-tuning") {
    packet.handoff.observable_coefficients.photon = "M_sea_photon_fit";
    packet.handoff.observable_coefficients.ppn = "M_sea_ppn_fit";
    return packet;
  }

  throw new Error(`unknown control: ${controlName}`);
}

function evaluateIdentity(source, handoff) {
  const medium = handoff.medium_response ?? {};
  return row(
    "delta_id",
    "\\Delta_{\\mathrm{id}}",
    "medium-response row names the same branch class and retained chart as the force/action rows",
    "residual.retained_history_mismatch",
    [
      { field: "source_record_id", ok: medium.source_record_id === source.record_id },
      { field: "branch_class", ok: medium.branch_class === source.branch_class },
      { field: "retained_chart_id", ok: medium.retained_chart_id === source.retained_chart_id },
      {
        field: "G4_source_record_id",
        ok: handoff.dependency_gates?.G4_effective_metric_and_shift?.source_record_id === source.record_id,
      },
    ]
  );
}

function evaluateWindow(source, handoff) {
  const sourceWindow = source.retained_window ?? {};
  const mediumWindow = handoff.medium_response?.retained_window ?? {};
  return row(
    "delta_W",
    "\\Delta_W",
    "medium-response row uses the same retained window and memory depth",
    "residual.retained_history_mismatch",
    [
      { field: "retained_window.id", ok: mediumWindow.id === sourceWindow.id },
      { field: "retained_window.h", ok: sameNumber(mediumWindow.h, sourceWindow.h) },
      {
        field: "retained_window.memory_depth",
        ok: sameNumber(mediumWindow.memory_depth, sourceWindow.memory_depth),
      },
    ]
  );
}

function evaluateRegulator(source, handoff) {
  const sourceRegulator = source.regulator_state ?? {};
  const mediumRegulator = handoff.medium_response?.regulator_state ?? {};
  return row(
    "delta_reg",
    "\\Delta_{\\mathrm{reg}}",
    "medium-response row declares the same eta, epsilon_c, and regulator status",
    "residual.retained_history_mismatch",
    [
      { field: "regulator_state.eta", ok: sameNumber(mediumRegulator.eta, sourceRegulator.eta) },
      {
        field: "regulator_state.epsilon_c",
        ok: sameNumber(mediumRegulator.epsilon_c, sourceRegulator.epsilon_c),
      },
      { field: "regulator_state.status", ok: mediumRegulator.status === sourceRegulator.status },
    ]
  );
}

function evaluateRootLedger(source, handoff) {
  const sourceLedger = source.active_root_ledger ?? {};
  const mediumLedger = handoff.medium_response?.active_root_ledger ?? {};
  return row(
    "delta_root",
    "\\Delta_{\\mathrm{root}}",
    "active roots, inactive gaps, Jacobian floor, and caustic routes match the retained root ledger",
    "residual.retained_history_mismatch",
    [
      { field: "active_root_ledger.ledger_id", ok: mediumLedger.ledger_id === sourceLedger.ledger_id },
      { field: "active_root_ledger.root_rows", ok: sameArray(mediumLedger.root_rows, sourceLedger.root_rows) },
      {
        field: "active_root_ledger.inactive_gap_rows",
        ok: sameArray(mediumLedger.inactive_gap_rows, sourceLedger.inactive_gap_rows),
      },
      {
        field: "active_root_ledger.jacobian_floor",
        ok: sameNumber(mediumLedger.jacobian_floor, sourceLedger.jacobian_floor),
      },
      {
        field: "active_root_ledger.caustic_routes",
        ok: sameArray(mediumLedger.caustic_routes, sourceLedger.caustic_routes),
      },
    ]
  );
}

function evaluateEventLedger(source, handoff) {
  const sourceLedger = source.event_ledger ?? {};
  const mediumLedger = handoff.medium_response?.event_ledger ?? {};
  const handoffLedger = handoff.event_ledger ?? {};
  return row(
    "delta_event",
    "\\Delta_{\\mathrm{event}}",
    "medium updates consume the same event ledger as clock, ruler, signal, and metric outputs",
    "residual.retained_history_mismatch",
    [
      { field: "medium_response.event_ledger.ledger_id", ok: mediumLedger.ledger_id === sourceLedger.ledger_id },
      { field: "medium_response.event_ledger.rows", ok: sameArray(mediumLedger.rows, sourceLedger.rows) },
      { field: "handoff.event_ledger.ledger_id", ok: handoffLedger.ledger_id === sourceLedger.ledger_id },
      { field: "handoff.event_ledger.rows", ok: sameArray(handoffLedger.rows, sourceLedger.rows) },
    ]
  );
}

function evaluateProjection(source, handoff) {
  const responseObjectId = handoff.medium_response?.response_object_id;
  const sourceProjection = source.projection_maps ?? {};
  const mediumProjection = handoff.medium_response?.projection_maps ?? {};
  const checks = [
    {
      field: "G4_response_object_id",
      ok: handoff.dependency_gates?.G4_effective_metric_and_shift?.response_object_id === responseObjectId,
    },
  ];
  for (const projection of REQUIRED_PROJECTIONS) {
    checks.push({
      field: `source.projection_maps.${projection}`,
      ok: sourceProjection[projection] === responseObjectId,
    });
    checks.push({
      field: `medium_response.projection_maps.${projection}`,
      ok: mediumProjection[projection] === responseObjectId,
    });
  }

  return row(
    "delta_proj",
    "\\Delta_{\\mathrm{proj}}",
    "density, delay, effective-potential, metric, signal-speed, and photon projections come from one response object",
    "residual.medium_response_missing",
    checks
  );
}

function evaluateCoefficients(source, handoff) {
  const responseObjectId = handoff.medium_response?.response_object_id;
  const sourceCoefficients = source.coefficient_sources ?? {};
  const handoffCoefficients = handoff.observable_coefficients ?? {};
  const checks = [];
  for (const family of COEFFICIENT_FAMILIES) {
    checks.push({
      field: `source.coefficient_sources.${family}`,
      ok: sourceCoefficients[family] === responseObjectId,
    });
    checks.push({
      field: `handoff.observable_coefficients.${family}`,
      ok: handoffCoefficients[family] === responseObjectId,
    });
  }

  return row(
    "delta_coef",
    "\\Delta_{\\mathrm{coef}}",
    "clock, ruler, photon, PPN, and SME rows do not change coefficients per observable",
    "gravity.hidden_tuning",
    checks
  );
}

function evaluateSpeedConvention(source, handoff) {
  const speed = handoff.speed_convention ?? {};
  const sourceSpeed = source.speed_convention ?? {};
  const primitive = "primitive_wake_speed";
  return row(
    "speed_convention",
    "c_f/c_gamma/c_eff/c_0",
    "primitive c_f remains distinct from observer-facing channel speeds until the shared response record derives a legal common limit",
    "residual.speed_conflation",
    [
      { field: "c_f.source", ok: speed.c_f?.source === primitive && sourceSpeed.c_f?.source === primitive },
      {
        field: "c_gamma.source",
        ok: speed.c_gamma?.source === sourceSpeed.c_gamma?.source && speed.c_gamma?.source !== primitive,
      },
      {
        field: "c_eff.source",
        ok: speed.c_eff?.source === sourceSpeed.c_eff?.source && speed.c_eff?.source !== primitive,
      },
      {
        field: "c_0.source",
        ok: speed.c_0?.source === sourceSpeed.c_0?.source && speed.c_0?.source !== primitive,
      },
      {
        field: "c_f_used_as_observer_speed",
        ok: speed.c_f_used_as_observer_speed === false && sourceSpeed.c_f_used_as_observer_speed === false,
      },
    ]
  );
}

function acceptedMediumResponseAttempted(evidence) {
  return (
    evidence?.accepted_for_medium_response_closure === true ||
    evidence?.evidence_level === "accepted_for_medium_response_closure"
  );
}

function acceptedMediumResponseMismatches(source, handoff, evidence) {
  const medium = handoff.medium_response ?? {};
  const sourceWindow = source.retained_window ?? {};
  const sourceRegulator = source.regulator_state ?? {};
  const evidenceRegulator = evidence?.regulator_state ?? {};
  const checks = [
    {
      field: "accepted_medium_response_evidence.accepted_for_medium_response_closure",
      ok: evidence?.accepted_for_medium_response_closure === true,
    },
    {
      field: "accepted_medium_response_evidence.evidence_level",
      ok: evidence?.evidence_level === "accepted_for_medium_response_closure",
    },
    {
      field: "accepted_medium_response_evidence.accepted_evidence_id",
      ok:
        typeof evidence?.accepted_evidence_id === "string" &&
        evidence.accepted_evidence_id.length > 0,
    },
    {
      field: "accepted_medium_response_evidence.source_record_id",
      ok: evidence?.source_record_id === source.record_id,
    },
    {
      field: "accepted_medium_response_evidence.response_object_id",
      ok: evidence?.response_object_id === medium.response_object_id,
    },
    {
      field: "accepted_medium_response_evidence.branch_class",
      ok: evidence?.branch_class === source.branch_class,
    },
    {
      field: "accepted_medium_response_evidence.retained_chart_id",
      ok: evidence?.retained_chart_id === source.retained_chart_id,
    },
    {
      field: "accepted_medium_response_evidence.retained_window_id",
      ok: evidence?.retained_window_id === sourceWindow.id,
    },
    {
      field: "accepted_medium_response_evidence.regulator_state.eta",
      ok: sameNumber(evidenceRegulator.eta, sourceRegulator.eta),
    },
    {
      field: "accepted_medium_response_evidence.regulator_state.epsilon_c",
      ok: sameNumber(evidenceRegulator.epsilon_c, sourceRegulator.epsilon_c),
    },
    {
      field: "accepted_medium_response_evidence.regulator_state.status",
      ok: evidenceRegulator.status === sourceRegulator.status,
    },
  ];
  return collectMismatches(checks);
}

function acceptedMediumResponseEvidenceSummary(source, handoff, declaredEvidence = null) {
  const evidence = declaredEvidence ?? handoff.accepted_medium_response_evidence ?? null;
  const attempted = acceptedMediumResponseAttempted(evidence);
  const mismatches = attempted ? acceptedMediumResponseMismatches(source, handoff, evidence) : [];
  const accepted = attempted && mismatches.length === 0;
  const evidenceLevel = accepted
    ? "accepted_for_medium_response_closure"
    : attempted
    ? "accepted_evidence_contract_mismatch"
    : handoff.medium_response?.row_id
    ? "source_record_medium_response_declared"
    : "missing";
  return {
    required_response_count: 1,
    accepted_response_count: accepted ? 1 : 0,
    accepted_for_medium_response_closure: accepted,
    counts_by_evidence_level: {
      [evidenceLevel]: 1,
    },
    response_evidence: [
      {
        row_id: handoff.medium_response?.row_id ?? "medium_response",
        response_object_id: handoff.medium_response?.response_object_id ?? null,
        evidence_level: evidenceLevel,
        accepted_evidence_contract_attempted: attempted,
        accepted_evidence_mismatches: mismatches,
        accepted_for_medium_response_closure: accepted,
      },
    ],
  };
}

export function buildNoetherSeaCompatibilityHandoffDiagnostic(input = buildDefaultNoetherSeaCompatibilityHandoffInput()) {
  assertObject(input, "input");
  assertObject(input.retained_branch_source_record, "retained_branch_source_record");
  assertObject(input.handoff, "handoff");

  const source = input.retained_branch_source_record;
  const handoff = input.handoff;
  const rows = [
    evaluateIdentity(source, handoff),
    evaluateWindow(source, handoff),
    evaluateRegulator(source, handoff),
    evaluateRootLedger(source, handoff),
    evaluateEventLedger(source, handoff),
    evaluateProjection(source, handoff),
    evaluateCoefficients(source, handoff),
    evaluateSpeedConvention(source, handoff),
  ];
  const failedRows = rows.filter((entry) => entry.status === "fail");
  const acceptedSummary = acceptedMediumResponseEvidenceSummary(
    source,
    handoff,
    input.accepted_medium_response_evidence ?? null
  );

  return {
    schema: NOETHER_SEA_COMPATIBILITY_HANDOFF_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    claim_level:
      "diagnostic-only priority artifact; does not close Lorentz/GR recovery, retain a branch, or update a validation gate",
    input_summary: {
      source_record_id: source.record_id,
      branch_class: source.branch_class,
      retained_chart_id: source.retained_chart_id,
      medium_response_row: handoff.medium_response?.row_id ?? null,
      response_object_id: handoff.medium_response?.response_object_id ?? null,
    },
    accepted_evidence_summary: acceptedSummary,
    boundary_rows: rows,
    negative_controls: {
      retained_history_mismatch: "residual.retained_history_mismatch",
      speed_conflation: "residual.speed_conflation",
      hidden_tuning: "gravity.hidden_tuning",
    },
    result: {
      diagnostic_status: failedRows.length === 0 ? "diagnostic_passed_priority_only" : "diagnostic_failed",
      retained_branch: false,
      updates_live_validation_gate: false,
      accepted_medium_response_evidence_for_closure:
        acceptedSummary.accepted_for_medium_response_closure,
      failure_code: failedRows[0]?.failure_code ?? null,
      first_failed_row: failedRows[0]?.row_id ?? null,
      first_failure_status:
        failedRows[0]?.failure_code ?? "lorentz_gr_bridge_not_closed; handoff compatibility only",
      strongest_artifact:
        "same-history Noether sea compatibility diagnostic for Lorentz/GR medium-response handoff rows",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateNoetherSeaCompatibilityHandoffArtifact(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(
    artifact.schema === NOETHER_SEA_COMPATIBILITY_HANDOFF_SCHEMA,
    `schema must be ${NOETHER_SEA_COMPATIBILITY_HANDOFF_SCHEMA}`,
    errors
  );
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
      assertField(Array.isArray(entry.checks), `${entry.row_id} must include checks`, errors);
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

function usage() {
  return [
    "Usage: node scripts/proof-programs/noether-sea-compatibility-handoff-diagnostic.mjs [options]",
    "",
    "Options:",
    "  --input <path>       Read handoff input JSON instead of the default fixture",
    "  --control <name>     Apply a negative control: retained-history-mismatch, speed-conflation, hidden-tuning",
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
          schema: "aaa-proof/noether-sea-compatibility-handoff-diagnostic-schema/v1",
          artifact_schema: NOETHER_SEA_COMPATIBILITY_HANDOFF_SCHEMA,
          input_schema: INPUT_SCHEMA,
          promotion_status: PROMOTION_STATUS,
          packet_id: PACKET_ID,
          accepted_evidence_summary: [
            "response_evidence",
            "counts_by_evidence_level",
            "accepted_evidence_contract_attempted",
            "accepted_evidence_mismatches",
            "accepted_for_medium_response_closure",
          ],
          controls: ["retained-history-mismatch", "speed-conflation", "hidden-tuning"],
        },
        args.pretty
      )
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors = validateNoetherSeaCompatibilityHandoffArtifact(artifact);
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
    : buildDefaultNoetherSeaCompatibilityHandoffInput();
  const input = args.control ? applyNoetherSeaCompatibilityControl(baseInput, args.control) : baseInput;
  const artifact = buildNoetherSeaCompatibilityHandoffDiagnostic(input);
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
