#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "eq28a-path-frequency-exchange-attempt.v1.json");
const INPUT_SCHEMA = "aaa-equation-map-eq28a-path-frequency-exchange-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-eq28a-path-frequency-exchange-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";

const REQUIRED_ROWS = [
  "path_frequency_exchange_carrier",
  "theta_gamma_packet",
  "photon_gate_a_b_handoff",
  "electron_medium_population",
  "noether_sea_path_history",
  "exchange_event_ledger",
  "inverse_compton_row",
  "thermal_sz_row",
  "kinematic_sz_row",
  "recoil_remnant_row",
  "finite_window_thermal_record",
  "source_provenance",
  "no_hidden_retune_witness",
];

const DEFAULT_TOLERANCES = {
  carrier: 1e-12,
  inverseCompton: 1e-12,
  pathFrequency: 1e-12,
  thermalSz: 1e-12,
  kineticSz: 1e-12,
  photonGate: 1e-12,
  sourceProvenance: 1e-12,
  retune: 1e-12,
};

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const inputPath = path.resolve(args.input);
const input = readJson(inputPath);
const output = evaluateEq28aPathFrequencyExchange(input, inputPath);
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
  console.log(`Usage: node scripts/equation-mapping/eq28a-path-frequency-exchange-residual.mjs [options]

Options:
  --input PATH          EQ-28A path-frequency exchange residual input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the residual is populated.
  --help                Show this help.

This checker evaluates the score-neutral EQ-28A inverse-Compton/SZ
path-frequency exchange attempt. It computes inverse-Compton frequency boost,
signed path-frequency exchange, tSZ y/Rayleigh-Jeans shift, kSZ shift, photon
Gate A/B handoff, provenance, and hidden-retune diagnostics on one declared
carrier. Passing diagnostics do not raise scores unless the carrier and row
bindings are accepted.`);
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

function evaluateEq28aPathFrequencyExchange(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const packet = input.packet ?? input;
  const carrier = evaluateAcceptedEvidence(input.carrier ?? packet.carrier);
  const rows = packet.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedEvidence(rows[rowId])]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const carrierBinding = evaluateCarrierBinding(rows, input.commonCarrierId ?? packet.id);
  const solver = evaluatePathFrequencySolver(packet, tolerances);
  const negativeControls = evaluateNegativeControls(packet, packet.negativeControls ?? [], tolerances);
  const status = decideStatus({
    carrier,
    missingRows,
    carrierBinding,
    solver,
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
      row: "EQ-28A",
      solverTarget: "inverse_compton_sz_path_frequency_exchange",
      supportedRows: ["EQ-12", "EQ-17", "EQ-22", "EQ-22A", "EQ-28", "EQ-29"],
      claimLevel:
        "score-neutral solver-style path-frequency exchange residual; accepted photon/path/medium retained evidence is required before score movement",
    },
    tolerances,
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      nextBlocker: firstBlocker({ status, carrier, missingRows, carrierBinding, solver, negativeControls }),
      solverNextBlocker: firstSolverBlocker(solver, negativeControls),
      carrierAccepted: carrier.accepted,
      carrierReason: carrier.reason,
      missingRows,
      commonCarrierPass: carrierBinding.passed,
      solverResidualPass: allSolverChecksPass(solver),
      inverseComptonPass: solver.inverseCompton.passed,
      pathFrequencyPass: solver.pathFrequency.passed,
      thermalSzPass: solver.thermalSz.passed,
      kineticSzPass: solver.kineticSz.passed,
      photonGatePass: solver.photonGate.passed,
      sourceProvenancePass: solver.sourceProvenance.passed,
      hiddenRetunePass: solver.noHiddenRetune.passed,
      negativeControlPassCount: negativeControls.filter((control) => control.passed).length,
      negativeControlCount: negativeControls.length,
      failedNegativeControls: negativeControls.filter((control) => !control.passed).map((control) => control.id),
    },
    carrier: {
      status: normalizeStatus(input.carrier ?? packet.carrier),
      accepted: carrier.accepted,
      reason: carrier.reason,
      id: input.carrier?.id ?? packet.carrier?.id ?? null,
      sourcePath: input.carrier?.sourcePath ?? packet.carrier?.sourcePath ?? input.carrier?.source ?? null,
    },
    rows: Object.fromEntries(
      REQUIRED_ROWS.map((rowId) => [
        rowId,
        {
          status: normalizeStatus(rows[rowId]),
          accepted: rowChecks[rowId].accepted,
          reason: rowChecks[rowId].reason,
          carrierId: rows[rowId]?.carrierId ?? null,
          sourcePath: rows[rowId]?.sourcePath ?? rows[rowId]?.source ?? null,
        },
      ]),
    ),
    carrierBinding,
    solver,
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
    carrier: output.carrier,
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

function evaluatePathFrequencySolver(packet, tolerances) {
  const constants = parseConstants(packet.constants ?? {});
  const exchangeSegments = parseExchangeSegments(packet.exchangeSegments ?? []);
  const columnSamples = parseColumnSamples(packet.columnSamples ?? []);
  return {
    constants,
    inverseCompton: evaluateInverseCompton(exchangeSegments, constants, tolerances.inverseCompton),
    pathFrequency: evaluatePathFrequency(exchangeSegments, constants, tolerances.pathFrequency),
    thermalSz: evaluateThermalSz(columnSamples, constants, tolerances.thermalSz),
    kineticSz: evaluateKineticSz(columnSamples, constants, tolerances.kineticSz),
    photonGate: evaluatePhotonGate(packet.photonGate ?? {}, tolerances.photonGate),
    sourceProvenance: evaluateScalarResidual(
      packet.sourceProvenance?.maxResidual ?? packet.sourceProvenance?.residual,
      tolerances.sourceProvenance,
      "sourceProvenance",
    ),
    noHiddenRetune: evaluateNoHiddenRetune(packet.noHiddenRetune ?? {}, tolerances.retune),
  };
}

function parseConstants(constants) {
  const parsed = {
    h: finiteNumber(constants.h ?? 1, "constants.h"),
    c_gamma: finiteNumber(constants.c_gamma ?? 1, "constants.c_gamma"),
    sigma_T: finiteNumber(constants.sigma_T ?? 1, "constants.sigma_T"),
    m_e: finiteNumber(constants.m_e ?? 1, "constants.m_e"),
    k_B: finiteNumber(constants.k_B ?? 1, "constants.k_B"),
    thomsonParameterMax: finiteNumber(constants.thomsonParameterMax ?? 0.1, "constants.thomsonParameterMax"),
  };
  for (const [key, value] of Object.entries(parsed)) {
    if (value <= 0) {
      throw new Error(`constants.${key} must be positive.`);
    }
  }
  return parsed;
}

function parseExchangeSegments(segments) {
  if (!Array.isArray(segments) || segments.length === 0) {
    throw new Error("exchangeSegments must be a nonempty array.");
  }
  return segments.map((segment, index) => {
    const prefix = `exchangeSegments[${index}]`;
    return {
      id: segment.id ?? `exchange_${index + 1}`,
      nuIn: positiveNumber(segment.nuIn, `${prefix}.nuIn`),
      nuOut: positiveNumber(segment.nuOut, `${prefix}.nuOut`),
      electronGamma: positiveNumber(segment.electronGamma, `${prefix}.electronGamma`),
      signedPathIncrement: finiteNumber(segment.signedPathIncrement, `${prefix}.signedPathIncrement`),
      deltaE_target: finiteNumber(segment.deltaE_target ?? 0, `${prefix}.deltaE_target`),
      deltaE_medium: finiteNumber(segment.deltaE_medium ?? 0, `${prefix}.deltaE_medium`),
      deltaE_recoil: finiteNumber(segment.deltaE_recoil ?? 0, `${prefix}.deltaE_recoil`),
      deltaE_remnant: finiteNumber(segment.deltaE_remnant ?? 0, `${prefix}.deltaE_remnant`),
    };
  });
}

function parseColumnSamples(samples) {
  if (!Array.isArray(samples) || samples.length === 0) {
    throw new Error("columnSamples must be a nonempty array.");
  }
  return samples.map((sample, index) => {
    const prefix = `columnSamples[${index}]`;
    return {
      id: sample.id ?? `column_${index + 1}`,
      electronDensity: positiveNumber(sample.electronDensity, `${prefix}.electronDensity`),
      electronTemperature: positiveNumber(sample.electronTemperature, `${prefix}.electronTemperature`),
      pathLength: positiveNumber(sample.pathLength, `${prefix}.pathLength`),
      opticalDepth: finiteNumber(sample.opticalDepth, `${prefix}.opticalDepth`),
      y: finiteNumber(sample.y, `${prefix}.y`),
      thermalDeltaTOverT_RJ: finiteNumber(sample.thermalDeltaTOverT_RJ, `${prefix}.thermalDeltaTOverT_RJ`),
      bulkVelocityParallel: finiteNumber(sample.bulkVelocityParallel, `${prefix}.bulkVelocityParallel`),
      kineticDeltaTOverT: finiteNumber(sample.kineticDeltaTOverT, `${prefix}.kineticDeltaTOverT`),
    };
  });
}

function evaluateInverseCompton(segments, constants, tolerance) {
  const rows = segments.map((segment) => {
    const expectedRatio = (4 / 3) * Math.pow(segment.electronGamma, 2);
    const observedRatio = segment.nuOut / segment.nuIn;
    const thomsonParameter =
      (4 * segment.electronGamma * constants.h * segment.nuIn) /
      (constants.m_e * Math.pow(constants.c_gamma, 2));
    const residuals = [observedRatio - expectedRatio];
    if (thomsonParameter > constants.thomsonParameterMax) {
      residuals.push(thomsonParameter - constants.thomsonParameterMax);
    }
    return {
      id: segment.id,
      observedRatio,
      expectedRatio,
      thomsonParameter,
      thomsonParameterMax: constants.thomsonParameterMax,
      residuals,
      maxAbsResidual: maxAbs(residuals),
      passed: maxAbs(residuals) <= tolerance,
    };
  });
  return summarizeRows(rows);
}

function evaluatePathFrequency(segments, constants, tolerance) {
  const rows = segments.map((segment) => {
    const expectedSignedPathIncrement = -Math.log(segment.nuOut / segment.nuIn);
    const energyLedgerResidual =
      constants.h * (segment.nuOut - segment.nuIn) +
      segment.deltaE_target +
      segment.deltaE_medium +
      segment.deltaE_recoil +
      segment.deltaE_remnant;
    const residuals = [segment.signedPathIncrement - expectedSignedPathIncrement, energyLedgerResidual];
    return {
      id: segment.id,
      expectedSignedPathIncrement,
      observedSignedPathIncrement: segment.signedPathIncrement,
      energyLedgerResidual,
      residuals,
      maxAbsResidual: maxAbs(residuals),
      passed: maxAbs(residuals) <= tolerance,
    };
  });
  return summarizeRows(rows);
}

function evaluateThermalSz(samples, constants, tolerance) {
  const rows = samples.map((sample) => {
    const expectedOpticalDepth = constants.sigma_T * sample.electronDensity * sample.pathLength;
    const expectedY =
      expectedOpticalDepth *
      ((constants.k_B * sample.electronTemperature) / (constants.m_e * Math.pow(constants.c_gamma, 2)));
    const expectedThermalDeltaTOverT_RJ = -2 * expectedY;
    const residuals = [
      sample.opticalDepth - expectedOpticalDepth,
      sample.y - expectedY,
      sample.thermalDeltaTOverT_RJ - expectedThermalDeltaTOverT_RJ,
    ];
    return {
      id: sample.id,
      expectedOpticalDepth,
      observedOpticalDepth: sample.opticalDepth,
      expectedY,
      observedY: sample.y,
      expectedThermalDeltaTOverT_RJ,
      observedThermalDeltaTOverT_RJ: sample.thermalDeltaTOverT_RJ,
      residuals,
      maxAbsResidual: maxAbs(residuals),
      passed: maxAbs(residuals) <= tolerance,
    };
  });
  return summarizeRows(rows);
}

function evaluateKineticSz(samples, constants, tolerance) {
  const rows = samples.map((sample) => {
    const expectedOpticalDepth = constants.sigma_T * sample.electronDensity * sample.pathLength;
    const expectedKineticDeltaTOverT = -(expectedOpticalDepth * sample.bulkVelocityParallel) / constants.c_gamma;
    const residuals = [
      sample.opticalDepth - expectedOpticalDepth,
      sample.kineticDeltaTOverT - expectedKineticDeltaTOverT,
    ];
    return {
      id: sample.id,
      expectedKineticDeltaTOverT,
      observedKineticDeltaTOverT: sample.kineticDeltaTOverT,
      residuals,
      maxAbsResidual: maxAbs(residuals),
      passed: maxAbs(residuals) <= tolerance,
    };
  });
  return summarizeRows(rows);
}

function evaluatePhotonGate(photonGate, tolerance) {
  const residuals = [
    finiteNumber(photonGate.gateAResidual, "photonGate.gateAResidual"),
    finiteNumber(photonGate.gateBResidual, "photonGate.gateBResidual"),
    finiteNumber(photonGate.polarizationHandoffResidual ?? 0, "photonGate.polarizationHandoffResidual"),
  ];
  const packetIdentityCount = finiteNumber(photonGate.packetIdentityCount ?? 1, "photonGate.packetIdentityCount");
  if (packetIdentityCount !== 1) {
    residuals.push(packetIdentityCount - 1);
  }
  return {
    gateAResidual: residuals[0],
    gateBResidual: residuals[1],
    polarizationHandoffResidual: residuals[2],
    packetIdentityCount,
    maxAbsResidual: maxAbs(residuals),
    passed: maxAbs(residuals) <= tolerance,
  };
}

function evaluateNoHiddenRetune(noHiddenRetune, tolerance) {
  const maxResidual = finiteNumber(
    noHiddenRetune.maxResidual ?? noHiddenRetune.residual,
    "noHiddenRetune.maxResidual",
  );
  const counts = {
    perObservableCarrierCount: finiteNumber(
      noHiddenRetune.perObservableCarrierCount ?? 1,
      "noHiddenRetune.perObservableCarrierCount",
    ),
    perPathMediumRecordCount: finiteNumber(
      noHiddenRetune.perPathMediumRecordCount ?? 1,
      "noHiddenRetune.perPathMediumRecordCount",
    ),
    perFormulaFitHandleCount: finiteNumber(
      noHiddenRetune.perFormulaFitHandleCount ?? 0,
      "noHiddenRetune.perFormulaFitHandleCount",
    ),
  };
  const countViolations = Object.entries(counts)
    .filter(([key, value]) => (key === "perFormulaFitHandleCount" ? value !== 0 : value !== 1))
    .map(([key, value]) => ({ key, value }));
  return {
    sharedRecordId: noHiddenRetune.sharedRecordId ?? null,
    maxResidual,
    counts,
    countViolations,
    passed: Math.abs(maxResidual) <= tolerance && countViolations.length === 0,
  };
}

function evaluateScalarResidual(value, tolerance, label) {
  const residual = finiteNumber(value, `${label}.residual`);
  return {
    residual,
    passed: Math.abs(residual) <= tolerance,
  };
}

function summarizeRows(rows) {
  const maxAbsResidual = Math.max(...rows.map((row) => row.maxAbsResidual ?? Math.abs(row.residual ?? 0)));
  return {
    rows,
    maxAbsResidual,
    passed: rows.every((row) => row.passed),
  };
}

function evaluateNegativeControls(basePacket, negativeControls, tolerances) {
  return negativeControls.map((control) => {
    const packet = deepClone(basePacket);
    for (const mutation of control.mutations ?? []) {
      setByPath(packet, mutation.path, mutation.value);
    }
    const mutatedPacket = deepMerge(packet, control.overrides ?? {});
    const solver = evaluatePathFrequencySolver(mutatedPacket, tolerances);
    const expectedFailedCheck = String(control.expectedFailedCheck ?? "");
    const check = getByPath(solver, expectedFailedCheck);
    const failedAsExpected = check && check.passed === false;
    return {
      id: control.id ?? null,
      expectedFailedCheck,
      passed: Boolean(failedAsExpected),
      wholePacketPassed: allSolverChecksPass(solver),
      expectedCheckPassed: check?.passed ?? null,
      expectedCheckResidual: check?.maxAbsResidual ?? check?.residual ?? check?.maxResidual ?? null,
    };
  });
}

function allSolverChecksPass(solver) {
  return (
    solver.inverseCompton.passed &&
    solver.pathFrequency.passed &&
    solver.thermalSz.passed &&
    solver.kineticSz.passed &&
    solver.photonGate.passed &&
    solver.sourceProvenance.passed &&
    solver.noHiddenRetune.passed
  );
}

function firstSolverBlocker(solver, negativeControls) {
  if (!solver.inverseCompton.passed) {
    return "inverse_compton_residual";
  }
  if (!solver.pathFrequency.passed) {
    return "path_frequency_exchange_residual";
  }
  if (!solver.thermalSz.passed) {
    return "thermal_sz_residual";
  }
  if (!solver.kineticSz.passed) {
    return "kinetic_sz_residual";
  }
  if (!solver.photonGate.passed) {
    return "photon_gate_handoff_residual";
  }
  if (!solver.sourceProvenance.passed) {
    return "source_provenance_residual";
  }
  if (!solver.noHiddenRetune.passed) {
    return "hidden_retune_witness";
  }
  const failedControl = negativeControls.find((control) => !control.passed);
  return failedControl ? `negative_control_${failedControl.id ?? "unknown"}` : null;
}

function evaluateCarrierBinding(rows, commonCarrierId) {
  const rowBindings = REQUIRED_ROWS.map((rowId) => ({
    rowId,
    carrierId: rows[rowId]?.carrierId ?? null,
    matches: rows[rowId]?.carrierId === commonCarrierId,
  }));
  const mismatches = rowBindings.filter((binding) => !binding.matches).map((binding) => binding.rowId);
  return {
    commonCarrierId: commonCarrierId ?? null,
    passed: Boolean(commonCarrierId) && mismatches.length === 0,
    mismatches,
    rowBindings,
  };
}

function evaluateAcceptedEvidence(row) {
  const status = normalizeStatus(row);
  if (!ACCEPTED_STATUSES.has(status)) {
    return { accepted: false, reason: "row_not_accepted" };
  }
  const sourcePath = row?.sourcePath ?? row?.source;
  const source = evaluateSourcePath(sourcePath);
  if (!source.accepted) {
    return { accepted: false, reason: source.reason };
  }
  return { accepted: true, reason: "accepted" };
}

function evaluateSourcePath(sourcePath) {
  if (typeof sourcePath !== "string" || sourcePath.trim() === "") {
    return { accepted: false, reason: "missing_source_path" };
  }
  if (sourcePath.includes("placeholder") || sourcePath.includes("pending")) {
    return { accepted: false, reason: "placeholder_source_path" };
  }
  if (sourcePath.startsWith("/tmp/") || sourcePath.startsWith("/private/tmp/")) {
    return { accepted: false, reason: "temp_source_path" };
  }
  if (sourcePath.includes("content/generated/")) {
    return { accepted: false, reason: "generated_source_path" };
  }
  const resolved = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(REPO_ROOT, sourcePath.replace(/#.*/, ""));
  if (!resolved.startsWith(REPO_ROOT)) {
    return { accepted: false, reason: "source_outside_repo" };
  }
  if (!fs.existsSync(resolved)) {
    return { accepted: false, reason: "source_missing" };
  }
  if (!fs.statSync(resolved).isFile()) {
    return { accepted: false, reason: "source_not_file" };
  }
  return { accepted: true, reason: "accepted" };
}

function decideStatus({ carrier, missingRows, carrierBinding, solver, negativeControls }) {
  if (!carrier.accepted) {
    return "blocked_missing_accepted_path_frequency_exchange_carrier";
  }
  if (missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  if (!carrierBinding.passed) {
    return "blocked_carrier_split";
  }
  if (!allSolverChecksPass(solver)) {
    return "blocked_residuals";
  }
  if (!negativeControls.every((control) => control.passed)) {
    return "blocked_negative_control";
  }
  return "populated";
}

function firstBlocker({ status, carrier, missingRows, carrierBinding, solver, negativeControls }) {
  if (status === "populated") {
    return null;
  }
  if (!carrier.accepted) {
    return "missing_accepted_path_frequency_exchange_carrier";
  }
  if (missingRows.length > 0) {
    return `missing_accepted_${missingRows[0]}`;
  }
  if (!carrierBinding.passed) {
    return carrierBinding.commonCarrierId ? "carrier_split" : "missing_common_carrier";
  }
  return firstSolverBlocker(solver, negativeControls);
}

function normalizeStatus(row) {
  return String(row?.status ?? "missing").trim().toLowerCase();
}

function positiveNumber(value, label) {
  const number = finiteNumber(value, label);
  if (number <= 0) {
    throw new Error(`${label} must be positive.`);
  }
  return number;
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a finite number.`);
  }
  return number;
}

function maxAbs(values) {
  return Math.max(...values.map((value) => Math.abs(finiteNumber(value, "residual"))));
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function deepMerge(base, override) {
  if (Array.isArray(base) || Array.isArray(override)) {
    return override === undefined ? base : override;
  }
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override === undefined ? base : override;
  }
  const result = { ...base };
  for (const [key, value] of Object.entries(override)) {
    result[key] = key in result ? deepMerge(result[key], value) : value;
  }
  return result;
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function setByPath(object, dottedPath, value) {
  if (typeof dottedPath !== "string" || dottedPath.trim() === "") {
    throw new Error("Negative-control mutation path must be a nonempty string.");
  }
  const parts = dottedPath.split(".");
  let cursor = object;
  for (let index = 0; index < parts.length - 1; index += 1) {
    const key = arrayIndex(parts[index]);
    cursor = cursor[key];
    if (cursor === undefined) {
      throw new Error(`Negative-control mutation path does not exist: ${dottedPath}`);
    }
  }
  cursor[arrayIndex(parts[parts.length - 1])] = value;
}

function getByPath(object, dottedPath) {
  return dottedPath.split(".").reduce((cursor, key) => {
    if (cursor === undefined || cursor === null) {
      return undefined;
    }
    return cursor[arrayIndex(key)];
  }, object);
}

function arrayIndex(key) {
  return /^\d+$/.test(key) ? Number(key) : key;
}
