#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const DEFAULT_INPUT_PATH = path.join(
  SCRIPT_DIR,
  "eq29-synchrotron-source-ledger-attempt.v1.json",
);
const INPUT_SCHEMA = "aaa-equation-map-eq29-radiation-source-ledger-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-eq29-radiation-source-ledger-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";

const REQUIRED_ROWS = [
  "radiation_source_carrier",
  "carrier_channel_family_row",
  "source_mechanism_row",
  "source_branch_row",
  "noether_sea_magnetic_state_row",
  "closure_residual_planar_mode_row",
  "photon_output_gate_A_B_row",
  "source_depletion_row",
  "recoil_medium_wake_remnant_rows",
  "power_spectrum_benchmark_row",
  "cooling_row",
  "polarization_angular_momentum_handoff_row",
  "event_ledger_row",
  "source_provenance",
  "no_hidden_retune_witness",
];

const DEFAULT_TOLERANCES = {
  carrier: 1e-12,
  power: 1e-12,
  frequency: 1e-12,
  cooling: 1e-12,
  polarization: 1e-12,
  eventBalance: 1e-12,
  sourceProvenance: 1e-12,
  retune: 1e-12,
  negativeControl: 1e-12,
};

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const inputPath = path.resolve(args.input);
const input = readJson(inputPath);
const output = evaluateEq29RadiationSourceLedger(input, inputPath);
writeOutput(output, args);

if (args.requirePopulated && output.summary.status !== "populated") {
  process.exitCode = 1;
}

function parseArgs(argv) {
  const parsed = {
    input: DEFAULT_INPUT_PATH,
    out: null,
    pretty: false,
    summary: false,
    requirePopulated: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") {
      parsed.input = argv[++index];
    } else if (arg === "--out") {
      parsed.out = argv[++index];
    } else if (arg === "--pretty") {
      parsed.pretty = true;
    } else if (arg === "--summary") {
      parsed.summary = true;
    } else if (arg === "--require-populated") {
      parsed.requirePopulated = true;
    } else if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return parsed;
}

function printHelp() {
  console.log(`Usage: node scripts/equation-mapping/eq29-radiation-source-ledger-residual.mjs [options]

Options:
  --input PATH          EQ-29 radiation source-ledger input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the residual is populated.
  --help                Show this help.

This checker evaluates the score-neutral EQ-29 radiation source-ledger
residual. It keeps carrier/channel family separate from source mechanism and
checks synchrotron power, characteristic frequency, cooling, polarization,
event balance, source provenance, and hidden retune diagnostics.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeOutput(output, parsedArgs) {
  const payload = parsedArgs.summary ? summarizeOutput(output) : output;
  const text = JSON.stringify(payload, null, parsedArgs.pretty ? 2 : 0);
  if (parsedArgs.out) {
    fs.writeFileSync(path.resolve(parsedArgs.out), `${text}\n`);
  } else {
    console.log(text);
  }
}

function evaluateEq29RadiationSourceLedger(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const packet = input.packet ?? input;
  const rows = packet.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedRow(rows[rowId], rowId)]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const sourceEvidence = evaluateSourceEvidence(rowChecks);
  const carrierBinding = evaluateCarrierBinding(rows, packet.commonCarrierId ?? input.commonCarrierId);
  const sourceLedger = evaluateSourceLedger(packet.radiationSource ?? {}, tolerances);
  const negativeControls = evaluateNegativeControls(
    packet.radiationSource ?? {},
    packet.negativeControls ?? [],
    tolerances,
  );
  const status = decideStatus({
    missingRows,
    sourceEvidence,
    carrierBinding,
    sourceLedger,
    negativeControls,
  });

  return {
    schema: OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      path: inputPath,
      schema: input.schema ?? null,
      schemaOk: input.schema === INPUT_SCHEMA,
      claimLevel: input.claimLevel ?? null,
    },
    residual: {
      id: input.residualId ?? packet.id ?? null,
      row: "EQ-29",
      supportedRows: ["EQ-12", "EQ-13", "EQ-28", "EQ-29"],
      sourceMechanism: sourceLedger.mechanism,
      claimLevel:
        "score-neutral radiation source-ledger residual; accepted retained rows are required before score review",
    },
    tolerances,
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      missingRows,
      nextBlocker: firstBlocker({
        status,
        missingRows,
        sourceEvidence,
        carrierBinding,
        sourceLedger,
        negativeControls,
      }),
      sourceEvidencePass: sourceEvidence.passed,
      sourceEvidenceFailureCount: sourceEvidence.failures.length,
      commonCarrierPass: carrierBinding.passed,
      sourceLedgerNumericPass: sourceLedger.passed,
      powerPass: sourceLedger.power.passed,
      characteristicFrequencyPass: sourceLedger.characteristicFrequency.passed,
      coolingPass: sourceLedger.cooling.passed,
      polarizationPass: sourceLedger.polarization.passed,
      eventBalancePass: sourceLedger.eventBalance.passed,
      sourceProvenancePass: sourceLedger.sourceProvenance.passed,
      hiddenRetunePass: sourceLedger.noHiddenRetune.passed,
      negativeControlPassCount: negativeControls.filter((control) => control.passed).length,
      negativeControlCount: negativeControls.length,
      failedNegativeControls: negativeControls.filter((control) => !control.passed).map((control) => control.id),
    },
    rows: Object.fromEntries(
      REQUIRED_ROWS.map((rowId) => [
        rowId,
        {
          status: normalizeStatus(rows[rowId]),
          accepted: rowChecks[rowId].accepted,
          reason: rowChecks[rowId].reason,
          rowId: rows[rowId]?.rowId ?? rows[rowId]?.id ?? null,
          carrierId: rows[rowId]?.carrierId ?? null,
          sourcePath: rows[rowId]?.sourcePath ?? rows[rowId]?.source ?? null,
        },
      ]),
    ),
    carrierBinding,
    sourceEvidence,
    sourceLedger,
    negativeControls,
  };
}

function summarizeOutput(output) {
  return {
    schema: output.schema,
    generatedAt: output.generatedAt,
    input: output.input,
    residual: output.residual,
    summary: output.summary,
    rowStatuses: Object.fromEntries(
      Object.entries(output.rows).map(([rowId, row]) => [rowId, { status: row.status, reason: row.reason }]),
    ),
  };
}

function parseTolerances(tolerances) {
  return Object.fromEntries(
    Object.entries(DEFAULT_TOLERANCES).map(([key, fallback]) => [
      key,
      finiteNumber(tolerances[key] ?? fallback, `tolerances.${key}`),
    ]),
  );
}

function evaluateSourceLedger(source, tolerances) {
  const mechanism = String(source.mechanism ?? "undeclared");
  const power = evaluateSynchrotronPower(source.power ?? {}, tolerances.power);
  const characteristicFrequency = evaluateCharacteristicFrequency(
    source.characteristicFrequency ?? {},
    tolerances.frequency,
  );
  const cooling = evaluateCooling(source.cooling ?? {}, tolerances.cooling);
  const polarization = evaluateScalarResidual(
    source.polarization?.residual ?? source.polarization?.maxResidual,
    tolerances.polarization,
  );
  const eventBalance = evaluateVectorNorm(
    source.eventBalance?.components ?? source.eventBalance?.delta ?? source.eventBalance,
    tolerances.eventBalance,
  );
  const sourceProvenance = evaluateScalarResidual(
    source.sourceProvenance?.residual ?? source.sourceProvenance?.maxResidual,
    tolerances.sourceProvenance,
  );
  const noHiddenRetune = evaluateScalarResidual(
    source.noHiddenRetune?.maxResidual ?? source.noHiddenRetune?.residual,
    tolerances.retune,
  );
  const passed =
    mechanism === "synchrotron" &&
    power.passed &&
    characteristicFrequency.passed &&
    cooling.passed &&
    polarization.passed &&
    eventBalance.passed &&
    sourceProvenance.passed &&
    noHiddenRetune.passed;

  return {
    passed,
    mechanism,
    power,
    characteristicFrequency,
    cooling,
    polarization,
    eventBalance,
    sourceProvenance,
    noHiddenRetune,
  };
}

function evaluateSynchrotronPower(row, tolerance) {
  const observedPower = finiteNumber(row.sourceDepletionPower, "radiationSource.power.sourceDepletionPower");
  const sigmaT = finiteNumber(row.sigmaT, "radiationSource.power.sigmaT");
  const c = finiteNumber(row.c, "radiationSource.power.c");
  const magneticEnergyDensity = finiteNumber(
    row.magneticEnergyDensity,
    "radiationSource.power.magneticEnergyDensity",
  );
  const gamma = finiteNumber(row.gamma, "radiationSource.power.gamma");
  const beta = finiteNumber(row.beta ?? 1, "radiationSource.power.beta");
  const sinPitch = finiteNumber(row.sinPitch ?? 1, "radiationSource.power.sinPitch");
  const epsilon = finiteNumber(row.epsilonPower ?? 0, "radiationSource.power.epsilonPower");
  const expectedPower = (4 / 3) * sigmaT * c * magneticEnergyDensity * gamma ** 2 * beta ** 2 * sinPitch ** 2;
  const residual = relativeResidual(observedPower, expectedPower, epsilon);
  return {
    passed: residual <= tolerance,
    residual,
    tolerance,
    observedPower,
    expectedPower,
  };
}

function evaluateCharacteristicFrequency(row, tolerance) {
  const observedFrequency = finiteNumber(
    row.observedFrequency,
    "radiationSource.characteristicFrequency.observedFrequency",
  );
  const gamma = finiteNumber(row.gamma, "radiationSource.characteristicFrequency.gamma");
  const charge = finiteNumber(row.charge, "radiationSource.characteristicFrequency.charge");
  const magneticField = finiteNumber(row.magneticField, "radiationSource.characteristicFrequency.magneticField");
  const mass = finiteNumber(row.mass, "radiationSource.characteristicFrequency.mass");
  const sinPitch = finiteNumber(row.sinPitch ?? 1, "radiationSource.characteristicFrequency.sinPitch");
  const epsilon = finiteNumber(
    row.epsilonFrequency ?? 0,
    "radiationSource.characteristicFrequency.epsilonFrequency",
  );
  const expectedFrequency = 1.5 * gamma ** 2 * ((charge * magneticField) / (2 * Math.PI * mass)) * sinPitch;
  const residual = relativeResidual(observedFrequency, expectedFrequency, epsilon);
  return {
    passed: residual <= tolerance,
    residual,
    tolerance,
    observedFrequency,
    expectedFrequency,
  };
}

function evaluateCooling(row, tolerance) {
  const observedCoolingTime = finiteNumber(row.observedCoolingTime, "radiationSource.cooling.observedCoolingTime");
  const sourceEnergy = finiteNumber(row.sourceEnergy, "radiationSource.cooling.sourceEnergy");
  const emittedPower = finiteNumber(row.emittedPower, "radiationSource.cooling.emittedPower");
  const epsilon = finiteNumber(row.epsilonTime ?? 0, "radiationSource.cooling.epsilonTime");
  const expectedCoolingTime = sourceEnergy / emittedPower;
  const residual = relativeResidual(observedCoolingTime, expectedCoolingTime, epsilon);
  return {
    passed: residual <= tolerance,
    residual,
    tolerance,
    observedCoolingTime,
    expectedCoolingTime,
  };
}

function evaluateScalarResidual(value, tolerance) {
  const residual = Math.abs(finiteNumber(value ?? Number.POSITIVE_INFINITY, "scalarResidual"));
  return {
    passed: residual <= tolerance,
    residual,
    tolerance,
  };
}

function evaluateVectorNorm(value, tolerance) {
  const components = Array.isArray(value) ? value : Object.values(value ?? {});
  const numbers = components.map((component, index) => finiteNumber(component, `eventBalance.${index}`));
  const norm = Math.sqrt(numbers.reduce((sum, component) => sum + component * component, 0));
  return {
    passed: norm <= tolerance,
    norm,
    tolerance,
    components: numbers,
  };
}

function evaluateNegativeControls(source, controls, tolerances) {
  return controls.map((control) => {
    const result = evaluateNegativeControl(source, control, tolerances);
    return {
      id: control.id ?? "unnamed_negative_control",
      expectedFailure: true,
      passed: result.failedAsExpected,
      reason: result.reason,
      residual: result.residual,
      tolerance: result.tolerance,
    };
  });
}

function evaluateNegativeControl(source, control, tolerances) {
  if (control.kind === "source_channel_collapse") {
    const expectedMechanism = String(control.expectedMechanism ?? source.mechanism ?? "synchrotron");
    const sourceMechanism = String(control.sourceMechanism ?? "undeclared");
    const failedAsExpected = sourceMechanism !== expectedMechanism;
    return {
      failedAsExpected,
      reason: failedAsExpected ? "source_channel_collapse_detected" : "source_channel_collapse_not_detected",
      residual: failedAsExpected ? 1 : 0,
      tolerance: 0,
    };
  }
  if (control.kind === "power_without_source_depletion") {
    const residual = Math.abs(
      finiteNumber(control.sourceDepletionResidual, "negativeControl.sourceDepletionResidual"),
    );
    return {
      failedAsExpected: residual > tolerances.power,
      reason: residual > tolerances.power ? "source_depletion_failure_detected" : "source_depletion_failure_not_detected",
      residual,
      tolerance: tolerances.power,
    };
  }
  if (control.kind === "hidden_B_or_gamma_retune") {
    const mismatches = sharedKeyMismatches(control.powerKeys ?? {}, control.frequencyKeys ?? {});
    return {
      failedAsExpected: mismatches.length > 0,
      reason: mismatches.length > 0 ? "hidden_field_or_gamma_retune_detected" : "hidden_field_or_gamma_retune_not_detected",
      residual: mismatches.length,
      tolerance: 0,
      mismatches,
    };
  }
  if (control.kind === "polarization_without_gate_B") {
    const residual = Math.abs(finiteNumber(control.polarizationResidual, "negativeControl.polarizationResidual"));
    const gateBAccepted = control.gateBAccepted === true;
    const failedAsExpected = residual <= tolerances.polarization && !gateBAccepted;
    return {
      failedAsExpected,
      reason: failedAsExpected ? "polarization_without_gate_B_detected" : "polarization_without_gate_B_not_detected",
      residual,
      tolerance: tolerances.polarization,
    };
  }
  if (control.kind === "thermal_fit_without_event_ledger") {
    const mechanism = String(control.sourceMechanism ?? "");
    const eventLedgerPresent = control.eventLedgerPresent === true;
    const failedAsExpected = /thermal|free[-_]?free|blackbody/.test(mechanism) && !eventLedgerPresent;
    return {
      failedAsExpected,
      reason: failedAsExpected ? "thermal_fit_without_event_ledger_detected" : "thermal_fit_without_event_ledger_not_detected",
      residual: failedAsExpected ? 1 : 0,
      tolerance: 0,
    };
  }
  return {
    failedAsExpected: false,
    reason: `unknown_negative_control_${control.kind ?? "missing_kind"}`,
    residual: Number.NaN,
    tolerance: tolerances.negativeControl,
  };
}

function sharedKeyMismatches(left, right) {
  const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
  return [...keys]
    .filter((key) => left[key] !== right[key])
    .map((key) => ({ key, left: left[key] ?? null, right: right[key] ?? null }));
}

function evaluateCarrierBinding(rows, commonCarrierId) {
  const rowCarrierIds = Object.fromEntries(
    Object.entries(rows).map(([rowId, row]) => [rowId, row?.carrierId ?? null]),
  );
  const mismatches = Object.entries(rowCarrierIds)
    .filter(([, carrierId]) => carrierId !== null && commonCarrierId !== null && carrierId !== commonCarrierId)
    .map(([rowId, carrierId]) => ({ rowId, carrierId, expectedCarrierId: commonCarrierId }));
  return {
    passed: Boolean(commonCarrierId) && mismatches.length === 0,
    commonCarrierId: commonCarrierId ?? null,
    mismatches,
    rowCarrierIds,
  };
}

function evaluateSourceEvidence(rowChecks) {
  const failures = Object.entries(rowChecks)
    .filter(([, check]) =>
      [
        "accepted_without_evidence_source",
        "carrier_channel_family_source_contract_mismatch",
        "source_mechanism_source_contract_mismatch",
      ].includes(check.reason),
    )
    .map(([rowId, check]) => ({ rowId, sourcePath: check.sourcePath ?? null }));
  return {
    passed: failures.length === 0,
    failures,
  };
}

function evaluateAcceptedRow(row, rowId) {
  if (!row) {
    return { accepted: false, reason: "missing_row" };
  }
  if (!ACCEPTED_STATUSES.has(normalizeStatus(row))) {
    return { accepted: false, reason: "row_not_accepted" };
  }
  if (!hasConcreteIdentity(row)) {
    return { accepted: false, reason: "row_identity_not_concrete" };
  }
  const sourceCheck = evaluateSourceReference(row);
  if (!sourceCheck.accepted) {
    return {
      accepted: false,
      reason: sourceCheck.reason,
      sourcePath: row?.sourcePath ?? row?.source ?? null,
    };
  }
  if (rowId === "carrier_channel_family_row" && !sourceSupportsCarrierChannelFamilyRow(row)) {
    return {
      accepted: false,
      reason: "carrier_channel_family_source_contract_mismatch",
      sourcePath: row?.sourcePath ?? row?.source ?? null,
    };
  }
  if (rowId === "source_mechanism_row" && !sourceSupportsSourceMechanismRow(row)) {
    return {
      accepted: false,
      reason: "source_mechanism_source_contract_mismatch",
      sourcePath: row?.sourcePath ?? row?.source ?? null,
    };
  }
  return { accepted: true, reason: "accepted" };
}

function normalizeStatus(row) {
  return String(row?.status ?? row ?? "missing").toLowerCase();
}

function hasConcreteIdentity(row) {
  const id = row?.rowId ?? row?.id;
  return typeof id === "string" && id.trim().length > 0 && !id.includes("attempt");
}

function evaluateSourceReference(row) {
  const source = row?.sourcePath ?? row?.source;
  if (typeof source !== "string" || source.trim().length === 0) {
    return { accepted: false, reason: "source_missing" };
  }
  if (/^https?:\/\//.test(source)) {
    return sourceSupportsEq29(row)
      ? { accepted: true, reason: "source_url" }
      : { accepted: false, reason: "accepted_without_evidence_source" };
  }
  if (source.includes("/tmp/") || source.includes("content/generated/")) {
    return { accepted: false, reason: "source_not_durable" };
  }
  const resolved = path.resolve(REPO_ROOT, source);
  if (!fs.existsSync(resolved)) {
    return { accepted: false, reason: "source_not_found" };
  }
  if (fs.statSync(resolved).isDirectory()) {
    return { accepted: false, reason: "source_is_directory" };
  }
  if (!isEvidenceSourcePath(resolved)) {
    return { accepted: false, reason: "accepted_without_evidence_source" };
  }
  if (!sourceSupportsEq29(row)) {
    return { accepted: false, reason: "accepted_without_evidence_source" };
  }
  return { accepted: true, reason: "source_file" };
}

function sourceSupportsEq29(row) {
  const supportValues = [
    row?.sourceFamily,
    row?.sourceKind,
    row?.sourceRole,
    row?.sourceSupport,
    row?.sourceSupports,
    row?.evidenceFamily,
    row?.evidenceRole,
    row?.evidenceSupports,
    row?.claimLevel,
  ].flatMap((value) => (Array.isArray(value) ? value : [value]));
  const normalized = supportValues
    .filter((value) => typeof value === "string")
    .map((value) => value.toLowerCase());
  return normalized.some(
    (value) =>
      value.includes("eq-29") ||
      value.includes("eq29") ||
      value.includes("radiation_source") ||
      value.includes("radiation source") ||
      value.includes("synchrotron source"),
  );
}

function sourceSupportsCarrierChannelFamilyRow(row) {
  const supportValues = [
    row?.sourceFamily,
    row?.sourceKind,
    row?.sourceRole,
    row?.sourceSupport,
    row?.sourceSupports,
    row?.evidenceFamily,
    row?.evidenceRole,
    row?.evidenceSupports,
    row?.claimLevel,
  ].flatMap((value) => (Array.isArray(value) ? value : [value]));
  const normalized = supportValues
    .filter((value) => typeof value === "string")
    .map((value) => value.toLowerCase());
  const rowSupported = normalized.some((value) => value.includes("carrier_channel_family_row"));
  const familySupported = normalized.some(
    (value) =>
      value.includes("photon-channel output family") ||
      value.includes("photon channel output family"),
  );
  const kindSupported = normalized.some(
    (value) =>
      value.includes("carrier_channel_family") ||
      value.includes("carrier channel family"),
  );
  return rowSupported && familySupported && kindSupported;
}

function sourceSupportsSourceMechanismRow(row) {
  const supportValues = [
    row?.sourceFamily,
    row?.sourceKind,
    row?.sourceRole,
    row?.sourceSupport,
    row?.sourceSupports,
    row?.sourceMechanism,
    row?.evidenceFamily,
    row?.evidenceRole,
    row?.evidenceSupports,
    row?.claimLevel,
  ].flatMap((value) => (Array.isArray(value) ? value : [value]));
  const normalized = supportValues
    .filter((value) => typeof value === "string")
    .map((value) => value.toLowerCase());
  const rowSupported = normalized.some((value) => value.includes("source_mechanism_row"));
  const roleSupported = normalized.some(
    (value) => value.includes("source_mechanism") || value.includes("source mechanism"),
  );
  const mechanismSupported = normalized.some(
    (value) => value.includes("synchrotron source mechanism") || value === "synchrotron",
  );
  return rowSupported && roleSupported && mechanismSupported;
}

function isEvidenceSourcePath(filePath) {
  const relative = path.relative(REPO_ROOT, path.normalize(filePath));
  if (relative === "" || relative.startsWith("..") || path.isAbsolute(relative)) {
    return false;
  }
  if (relative.startsWith(`reference${path.sep}priorities${path.sep}`)) {
    return false;
  }
  if (relative.startsWith(`content${path.sep}markdown${path.sep}aaa${path.sep}`)) {
    return false;
  }
  if (relative.startsWith(`content${path.sep}generated${path.sep}`)) {
    return false;
  }
  const basename = path.basename(relative).toLowerCase();
  return (
    !basename.includes("attempt") &&
    !basename.includes("toy") &&
    !basename.includes("source-evidence-probe") &&
    !basename.includes("probe") &&
    !basename.includes("mock") &&
    !basename.includes("negative-control")
  );
}

function decideStatus({ missingRows, sourceEvidence, carrierBinding, sourceLedger, negativeControls }) {
  if (missingRows.length > 0) {
    if (!sourceEvidence.passed && sourceEvidence.failures.length === missingRows.length) {
      return "blocked_source_evidence";
    }
    return "blocked_missing_rows";
  }
  if (!carrierBinding.passed) {
    return "blocked_carrier_split";
  }
  if (!sourceLedger.passed) {
    return "failed_residual";
  }
  if (negativeControls.some((control) => !control.passed)) {
    return "failed_negative_control";
  }
  return "populated";
}

function firstBlocker({ status, missingRows, sourceEvidence, carrierBinding, sourceLedger, negativeControls }) {
  if (missingRows.length > 0) {
    if (!sourceEvidence.passed && sourceEvidence.failures.length === missingRows.length) {
      return "accepted_without_evidence_source";
    }
    return `missing_accepted_${missingRows[0]}`;
  }
  if (!carrierBinding.passed) {
    return "carrier_split_or_missing_common_carrier";
  }
  if (sourceLedger.mechanism !== "synchrotron") {
    return "source_mechanism_not_synchrotron";
  }
  if (!sourceLedger.power.passed) {
    return "power_residual_failed";
  }
  if (!sourceLedger.characteristicFrequency.passed) {
    return "characteristic_frequency_residual_failed";
  }
  if (!sourceLedger.cooling.passed) {
    return "cooling_residual_failed";
  }
  if (!sourceLedger.polarization.passed) {
    return "polarization_residual_failed";
  }
  if (!sourceLedger.eventBalance.passed) {
    return "event_balance_residual_failed";
  }
  if (!sourceLedger.sourceProvenance.passed) {
    return "source_provenance_residual_failed";
  }
  if (!sourceLedger.noHiddenRetune.passed) {
    return "hidden_retune_residual_failed";
  }
  const failedControl = negativeControls.find((control) => !control.passed);
  if (failedControl) {
    return `negative_control_${failedControl.id}_did_not_fail`;
  }
  return status === "populated" ? null : status;
}

function relativeResidual(observed, expected, epsilon) {
  const denominator = Math.abs(observed) + Math.abs(expected) + epsilon;
  return denominator === 0 ? 0 : Math.abs(observed - expected) / denominator;
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`Expected finite number for ${label}`);
  }
  return number;
}
