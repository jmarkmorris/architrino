#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "eq07a-tov-compact-support-attempt.v1.json");
const INPUT_SCHEMA = "aaa-equation-map-eq07a-tov-compact-support-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-eq07a-tov-compact-support-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";

const REQUIRED_ROWS = [
  "compact_region_carrier",
  "radial_support_row",
  "tov_pressure_gradient_row",
  "mass_continuity_row",
  "eos_projection_row",
  "metric_compliance_row",
  "compact_region_ledger",
  "source_provenance",
  "no_hidden_retune_witness",
  "horizon_interface_witness",
];

const DEFAULT_TOLERANCES = {
  tovPressureGradient: 1e-12,
  massContinuity: 1e-12,
  eosProjection: 1e-12,
  radialSupport: 1e-12,
  metricCompactness: 1e-12,
  ledger: 1e-12,
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
const output = evaluateEq07aTovCompactSupport(input, inputPath);
writeOutput(output, args);

if (args.requireSolved && output.summary.status !== "populated") {
  process.exitCode = 1;
}

function parseArgs(argv) {
  const parsed = {
    input: DEFAULT_INPUT_PATH,
    out: null,
    pretty: false,
    summary: false,
    requireSolved: false,
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
    } else if (arg === "--require-solved") {
      parsed.requireSolved = true;
    } else if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return parsed;
}

function printHelp() {
  console.log(`Usage: node scripts/equation-mapping/eq07a-tov-compact-support-residual.mjs [options]

Options:
  --input PATH       EQ-07A TOV compact-support input JSON.
  --out PATH         Write JSON output to PATH.
  --summary          Emit compact summary JSON.
  --pretty           Pretty-print JSON output.
  --require-solved   Exit nonzero unless the residual is populated.
  --help             Show this help.

This solver-style residual evaluates the score-neutral EQ-07A TOV compact-
support attempt. It computes pressure-gradient, mass-continuity, EOS,
radial-support, compactness, ledger, source-provenance, no-hidden-retune, and
negative-control diagnostics on one declared compact-region carrier. Passing
diagnostics do not raise scores unless the carrier and row bindings are
accepted.`);
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

function evaluateEq07aTovCompactSupport(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const packet = input.packet ?? input;
  const carrier = evaluateAcceptedEvidence(input.carrier ?? packet.carrier);
  const rows = packet.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedEvidence(rows[rowId])]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const carrierBinding = evaluateCarrierBinding(rows, input.commonCarrierId ?? packet.id);
  const solver = evaluateTovSolver(packet, tolerances);
  const negativeControls = evaluateNegativeControls(packet, packet.negativeControls ?? [], tolerances);
  const status = decideStatus({
    carrier,
    missingRows,
    carrierBinding,
    solver,
    negativeControls,
  });
  const nextBlocker = firstBlocker({ status, carrier, missingRows, carrierBinding, solver, negativeControls });
  const solverDiagnosticBlocker = firstSolverBlocker(solver, negativeControls);
  const solverDiagnosticMaskedByRetainedEvidence =
    solverDiagnosticBlocker !== null && (!carrier.accepted || missingRows.length > 0);

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
      row: "EQ-07A",
      solverTarget: "tov_compact_support",
      claimLevel:
        "score-neutral solver-style TOV compact-support residual; accepted compact-region retained evidence is required before score review",
    },
    tolerances,
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      nextBlocker,
      solverDiagnosticBlocker,
      solverDiagnosticMaskedByRetainedEvidence,
      carrierAccepted: carrier.accepted,
      carrierReason: carrier.reason,
      missingRows,
      commonCarrierPass: carrierBinding.passed,
      solverResidualPass: allSolverChecksPass(solver),
      tovPressureGradientPass: solver.tovPressureGradient.passed,
      massContinuityPass: solver.massContinuity.passed,
      eosProjectionPass: solver.eosProjection.passed,
      radialSupportPass: solver.radialSupport.passed,
      metricCompactnessPass: solver.metricCompactness.passed,
      compactLedgerPass: solver.compactRegionLedger.passed,
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

function evaluateTovSolver(packet, tolerances) {
  const constants = packet.constants ?? {};
  const samples = parseSamples(packet.tovSamples ?? []);
  return {
    tovPressureGradient: evaluateTovPressureGradient(samples, constants, tolerances.tovPressureGradient),
    massContinuity: evaluateMassContinuity(samples, constants, tolerances.massContinuity),
    eosProjection: evaluateEosProjection(samples, constants, tolerances.eosProjection),
    radialSupport: evaluateRadialSupport(samples, tolerances.radialSupport),
    metricCompactness: evaluateMetricCompactness(samples, constants, tolerances.metricCompactness),
    compactRegionLedger: evaluateLedger(packet.compactRegionLedger ?? {}, tolerances.ledger),
    sourceProvenance: evaluateScalarResidual(
      packet.sourceProvenance?.maxResidual ?? packet.sourceProvenance?.residual,
      tolerances.sourceProvenance,
    ),
    noHiddenRetune: evaluateNoHiddenRetune(packet.noHiddenRetune ?? {}, tolerances.retune),
  };
}

function parseSamples(samples) {
  return samples.map((sample) => ({
    id: sample.id ?? null,
    r: positiveNumber(sample.r, `${sample.id}.r`),
    epsilon: positiveNumber(sample.epsilon, `${sample.id}.epsilon`),
    P: positiveNumber(sample.P, `${sample.id}.P`),
    m: positiveNumber(sample.m, `${sample.id}.m`),
    dPdr: finiteNumber(sample.dPdr, `${sample.id}.dPdr`),
    dm_dr: finiteNumber(sample.dm_dr, `${sample.id}.dm_dr`),
  }));
}

function evaluateTovPressureGradient(samples, constants, tolerance) {
  const sampleReports = samples.map((sample) => {
    const expected = expectedTovGradient(sample, constants);
    const residual = Number.isFinite(expected) ? relativeResidual(sample.dPdr, expected) : Infinity;
    return {
      id: sample.id,
      observed: { dPdr: sample.dPdr },
      expected: { dPdr: expected },
      residual,
      passed: Math.abs(residual) <= tolerance,
    };
  });
  const maxResidual = maxAbs(sampleReports.map((sample) => sample.residual));
  return {
    solverForm:
      "fixed_constants_tov_pressure_gradient_with_energy_pressure_mass_and_compactness_denominator",
    sampleCount: sampleReports.length,
    samples: sampleReports,
    maxResidual,
    failedSamples: sampleReports.filter((sample) => !sample.passed).map((sample) => sample.id),
    tolerance,
    passed: sampleReports.length > 0 && sampleReports.every((sample) => sample.passed),
  };
}

function expectedTovGradient(sample, constants) {
  const G = positiveNumber(constants.G ?? 1, "constants.G");
  const c0 = positiveNumber(constants.c0 ?? 1, "constants.c0");
  const denominator = metricDenominator(sample, constants);
  if (!Number.isFinite(denominator) || Math.abs(denominator) <= 0) {
    return Infinity;
  }
  return (
    (-G *
      (sample.epsilon + sample.P / c0 ** 2) *
      (sample.m + (4 * Math.PI * sample.r ** 3 * sample.P) / c0 ** 2)) /
    (sample.r ** 2 * denominator)
  );
}

function evaluateMassContinuity(samples, constants, tolerance) {
  const G = positiveNumber(constants.G ?? 1, "constants.G");
  const sampleReports = samples.map((sample) => {
    const expected = 4 * Math.PI * sample.r ** 2 * sample.epsilon;
    const residual = relativeResidual(sample.dm_dr, expected);
    return {
      id: sample.id,
      observed: { dm_dr: sample.dm_dr },
      expected: { dm_dr: expected },
      residual,
      passed: Math.abs(residual) <= tolerance,
    };
  });
  const maxResidual = maxAbs(sampleReports.map((sample) => sample.residual));
  return {
    G,
    sampleCount: sampleReports.length,
    samples: sampleReports,
    maxResidual,
    failedSamples: sampleReports.filter((sample) => !sample.passed).map((sample) => sample.id),
    tolerance,
    passed: sampleReports.length > 0 && sampleReports.every((sample) => sample.passed),
  };
}

function evaluateEosProjection(samples, constants, tolerance) {
  const coefficient = positiveNumber(constants.eosCoefficient, "constants.eosCoefficient");
  const exponent = positiveNumber(constants.eosExponent, "constants.eosExponent");
  const sampleReports = samples.map((sample) => {
    const expected = coefficient * sample.epsilon ** exponent;
    const residual = relativeResidual(sample.P, expected);
    return {
      id: sample.id,
      observed: { epsilon: sample.epsilon, P: sample.P },
      expected: { P: expected },
      residual,
      passed: Math.abs(residual) <= tolerance,
    };
  });
  const maxResidual = maxAbs(sampleReports.map((sample) => sample.residual));
  return {
    coefficient,
    exponent,
    sampleCount: sampleReports.length,
    samples: sampleReports,
    maxResidual,
    failedSamples: sampleReports.filter((sample) => !sample.passed).map((sample) => sample.id),
    tolerance,
    passed: sampleReports.length > 0 && sampleReports.every((sample) => sample.passed),
  };
}

function evaluateRadialSupport(samples, tolerance) {
  const ordered = [...samples].sort((left, right) => left.r - right.r);
  const pressureIncreases = [];
  const massDecreases = [];
  for (let index = 1; index < ordered.length; index += 1) {
    const previous = ordered[index - 1];
    const current = ordered[index];
    if (current.P - previous.P > tolerance) {
      pressureIncreases.push([previous.id, current.id]);
    }
    if (previous.m - current.m > tolerance) {
      massDecreases.push([previous.id, current.id]);
    }
  }
  const nonNegativeGradients = ordered.filter((sample) => sample.dPdr >= -tolerance).map((sample) => sample.id);
  return {
    pressureIncreases,
    massDecreases,
    nonNegativeGradients,
    tolerance,
    passed: pressureIncreases.length === 0 && massDecreases.length === 0 && nonNegativeGradients.length === 0,
  };
}

function evaluateMetricCompactness(samples, constants, tolerance) {
  const minMetricDenominator = positiveNumber(
    constants.minMetricDenominator ?? tolerance,
    "constants.minMetricDenominator",
  );
  const sampleReports = samples.map((sample) => {
    const denominator = metricDenominator(sample, constants);
    const compactness = 1 - denominator;
    return {
      id: sample.id,
      compactness,
      metricDenominator: denominator,
      passed: denominator > minMetricDenominator,
    };
  });
  return {
    minMetricDenominator,
    samples: sampleReports,
    failedSamples: sampleReports.filter((sample) => !sample.passed).map((sample) => sample.id),
    tolerance,
    passed: sampleReports.length > 0 && sampleReports.every((sample) => sample.passed),
  };
}

function metricDenominator(sample, constants) {
  const G = positiveNumber(constants.G ?? 1, "constants.G");
  const c0 = positiveNumber(constants.c0 ?? 1, "constants.c0");
  return 1 - (2 * G * sample.m) / (sample.r * c0 ** 2);
}

function evaluateLedger(ledger, tolerance) {
  const residuals = Object.fromEntries(
    Object.entries(ledger).map(([key, value]) => [key, finiteNumber(value, key)]),
  );
  const maxResidual = maxAbs(Object.values(residuals));
  return {
    residuals,
    maxResidual,
    tolerance,
    passed: Object.keys(residuals).length > 0 && maxResidual <= tolerance,
  };
}

function evaluateScalarResidual(value, tolerance) {
  const residual = finiteNumber(value ?? Infinity, "residual");
  return {
    residual,
    tolerance,
    passed: Math.abs(residual) <= tolerance,
  };
}

function evaluateNoHiddenRetune(retune, tolerance) {
  const maxResidual = Math.abs(finiteNumber(retune.maxResidual ?? retune.residual ?? Infinity, "noHiddenRetune"));
  const perSampleTovCoefficientCount = finiteNumber(
    retune.perSampleTovCoefficientCount ?? 0,
    "noHiddenRetune.perSampleTovCoefficientCount",
  );
  const perSampleMetricCoefficientCount = finiteNumber(
    retune.perSampleMetricCoefficientCount ?? 0,
    "noHiddenRetune.perSampleMetricCoefficientCount",
  );
  const perShellEosCoefficientCount = finiteNumber(
    retune.perShellEosCoefficientCount ?? 0,
    "noHiddenRetune.perShellEosCoefficientCount",
  );
  return {
    maxResidual,
    perSampleTovCoefficientCount,
    perSampleMetricCoefficientCount,
    perShellEosCoefficientCount,
    tolerance,
    passed:
      maxResidual <= tolerance &&
      perSampleTovCoefficientCount === 0 &&
      perSampleMetricCoefficientCount === 0 &&
      perShellEosCoefficientCount === 0,
  };
}

function evaluateNegativeControls(basePacket, negativeControls, tolerances) {
  return negativeControls.map((control) => {
    const packet = deepMerge(basePacket, control.overrides ?? {});
    const result = evaluateTovSolver(packet, tolerances);
    const expectedFailedCheck = String(control.expectedFailedCheck ?? "");
    const check = getByPath(result, expectedFailedCheck);
    const failedAsExpected = check && check.passed === false;
    return {
      id: control.id ?? null,
      expectedFailedCheck,
      passed: Boolean(failedAsExpected),
      wholeSolverPassed: allSolverChecksPass(result),
      expectedCheckPassed: check?.passed ?? null,
      expectedCheckResidual:
        check?.maxResidual ??
        check?.minMetricDenominator ??
        check?.nonNegativeGradients?.length ??
        null,
    };
  });
}

function allSolverChecksPass(solver) {
  return [
    solver.tovPressureGradient,
    solver.massContinuity,
    solver.eosProjection,
    solver.radialSupport,
    solver.metricCompactness,
    solver.compactRegionLedger,
    solver.sourceProvenance,
    solver.noHiddenRetune,
  ].every((entry) => entry?.passed === true);
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
    return "blocked_missing_accepted_compact_region_carrier";
  }
  if (missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  if (!carrierBinding.passed) {
    return "blocked_carrier_split";
  }
  if (!allSolverChecksPass(solver)) {
    return "blocked_solver_residuals";
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
    return "missing_accepted_compact_region_carrier";
  }
  if (missingRows.length > 0) {
    return `missing_accepted_${missingRows[0]}`;
  }
  if (!carrierBinding.passed) {
    return carrierBinding.commonCarrierId ? "carrier_split" : "missing_common_carrier";
  }
  const solverBlocker = firstSolverBlocker(solver, negativeControls);
  return solverBlocker ?? carrier.reason ?? status;
}

function firstSolverBlocker(solver, negativeControls) {
  const orderedChecks = [
    ["tov_pressure_gradient", solver.tovPressureGradient],
    ["mass_continuity", solver.massContinuity],
    ["eos_projection", solver.eosProjection],
    ["radial_support", solver.radialSupport],
    ["metric_compactness", solver.metricCompactness],
    ["compact_region_ledger", solver.compactRegionLedger],
    ["source_provenance", solver.sourceProvenance],
    ["hidden_retune", solver.noHiddenRetune],
  ];
  const failed = orderedChecks.find(([, check]) => check?.passed === false);
  if (failed) {
    return failed[0];
  }
  const failedControl = negativeControls.find((control) => !control.passed);
  return failedControl ? `negative_control_failed_${failedControl.id}` : null;
}

function normalizeStatus(row) {
  if (row === undefined || row === null) {
    return "missing";
  }
  if (typeof row === "string") {
    return row;
  }
  return String(row.status ?? row.evidenceStatus ?? "missing");
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a finite number.`);
  }
  return number;
}

function positiveNumber(value, label) {
  const number = finiteNumber(value, label);
  if (number <= 0) {
    throw new Error(`${label} must be positive.`);
  }
  return number;
}

function relativeResidual(observed, expected) {
  return (observed - expected) / Math.max(Math.abs(expected), 1);
}

function maxAbs(values) {
  return values.length === 0 ? Infinity : Math.max(...values.map((value) => Math.abs(value)));
}

function deepMerge(base, override) {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override;
  }
  const result = { ...base };
  for (const [key, value] of Object.entries(override)) {
    result[key] = key in result ? deepMerge(result[key], value) : value;
  }
  return result;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getByPath(object, pathExpression) {
  return pathExpression
    .split(".")
    .filter(Boolean)
    .reduce((current, key) => (current === undefined || current === null ? undefined : current[key]), object);
}
