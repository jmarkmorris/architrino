#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "eq07a-chandrasekhar-scaling-attempt.v1.json");
const INPUT_SCHEMA = "aaa-equation-map-eq07a-chandrasekhar-scaling-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-eq07a-chandrasekhar-scaling-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";

const REQUIRED_ROWS = [
  "compact_region_carrier",
  "electron_state_counting_row",
  "nonrelativistic_pressure_scaling_row",
  "relativistic_pressure_scaling_row",
  "mass_radius_support_row",
  "composition_boundary_row",
  "source_provenance",
  "no_hidden_retune_witness",
  "level_separation_witness",
];

const DEFAULT_TOLERANCES = {
  stateCounting: 1e-12,
  pressureScaling: 1e-12,
  massRadius: 1e-12,
  composition: 1e-12,
  sourceProvenance: 1e-12,
  retune: 1e-12,
  levelSeparation: 1e-12,
};

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const inputPath = path.resolve(args.input);
const input = readJson(inputPath);
const output = evaluateEq07aChandrasekharScaling(input, inputPath);
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
  console.log(`Usage: node scripts/equation-mapping/eq07a-chandrasekhar-scaling-residual.mjs [options]

Options:
  --input PATH       EQ-07A Chandrasekhar scaling input JSON.
  --out PATH         Write JSON output to PATH.
  --summary          Emit compact summary JSON.
  --pretty           Pretty-print JSON output.
  --require-solved   Exit nonzero unless the residual is populated.
  --help             Show this help.

This solver-style residual evaluates the score-neutral EQ-07A Chandrasekhar
scaling attempt. It computes Fermi state-counting, fixed-exponent pressure
power laws, nonrelativistic mass-radius scaling, composition scaling, and
negative controls on one declared compact-region carrier. Passing diagnostics
do not raise scores unless the carrier and row bindings are accepted.`);
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

function evaluateEq07aChandrasekharScaling(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const packet = input.packet ?? input;
  const carrier = evaluateAcceptedEvidence(input.carrier ?? packet.carrier);
  const rows = packet.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedEvidence(rows[rowId])]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const carrierBinding = evaluateCarrierBinding(rows, input.commonCarrierId ?? packet.id);
  const solver = evaluateChandrasekharSolver(packet, tolerances);
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
      solverTarget: "chandrasekhar_scaling",
      claimLevel:
        "score-neutral solver-style Chandrasekhar scaling residual; accepted compact-region retained evidence is required before score review",
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
      stateCountingPass: solver.stateCounting.passed,
      nonrelPressureScalingPass: solver.pressureScaling.nonrelativistic_white_dwarf.passed,
      relPressureScalingPass: solver.pressureScaling.relativistic_white_dwarf.passed,
      massRadiusScalingPass: solver.massRadiusScaling.passed,
      compositionScalingPass: solver.compositionScaling.passed,
      sourceProvenancePass: solver.sourceProvenance.passed,
      hiddenRetunePass: solver.noHiddenRetune.passed,
      levelSeparationPass: solver.levelSeparation.passed,
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

function evaluateChandrasekharSolver(packet, tolerances) {
  const constants = packet.constants ?? {};
  return {
    stateCounting: evaluateStateCounting(packet.stateCountingSamples ?? [], constants, tolerances.stateCounting),
    pressureScaling: evaluatePressureScaling(packet.pressureSamples ?? [], constants, tolerances.pressureScaling),
    massRadiusScaling: evaluateMassRadiusScaling(packet.massRadiusSamples ?? [], constants, tolerances.massRadius),
    compositionScaling: evaluateCompositionScaling(
      packet.compositionBoundarySamples ?? [],
      constants,
      tolerances.composition,
    ),
    sourceProvenance: evaluateScalarResidual(
      packet.sourceProvenance?.maxResidual ?? packet.sourceProvenance?.residual,
      tolerances.sourceProvenance,
    ),
    noHiddenRetune: evaluateNoHiddenRetune(packet.noHiddenRetune ?? {}, tolerances.retune),
    levelSeparation: evaluateLevelSeparation(packet.levelSeparation ?? {}, tolerances.levelSeparation),
  };
}

function evaluateStateCounting(samples, constants, tolerance) {
  const hbarNorm = positiveNumber(constants.hbarNorm ?? 1, "constants.hbarNorm");
  const mec0Norm = positiveNumber(constants.mec0Norm ?? 1, "constants.mec0Norm");
  const transitionXF = positiveNumber(constants.transitionXF ?? 1, "constants.transitionXF");
  const sampleReports = samples.map((sample) => {
    const n_e = positiveNumber(sample.n_e, `${sample.id}.n_e`);
    const p_F = positiveNumber(sample.p_F, `${sample.id}.p_F`);
    const x_F = positiveNumber(sample.x_F, `${sample.id}.x_F`);
    const expectedPF = hbarNorm * Math.cbrt(n_e);
    const expectedXF = expectedPF / mec0Norm;
    const expectedRegime =
      expectedXF < transitionXF ? "nonrelativistic_white_dwarf" : "relativistic_white_dwarf";
    const pResidual = relativeResidual(p_F, expectedPF);
    const xResidual = relativeResidual(x_F, expectedXF);
    const regimeMatches = sample.regime === expectedRegime;
    return {
      id: sample.id ?? null,
      regime: sample.regime ?? null,
      expectedRegime,
      observed: { n_e, p_F, x_F },
      expected: { p_F: expectedPF, x_F: expectedXF },
      residuals: { p_F: pResidual, x_F: xResidual },
      regimeMatches,
      passed: Math.abs(pResidual) <= tolerance && Math.abs(xResidual) <= tolerance && regimeMatches,
    };
  });
  const maxResidual = maxAbs(sampleReports.flatMap((sample) => Object.values(sample.residuals)));
  return {
    hbarNorm,
    mec0Norm,
    transitionXF,
    sampleCount: sampleReports.length,
    samples: sampleReports,
    maxResidual,
    failedSamples: sampleReports.filter((sample) => !sample.passed).map((sample) => sample.id),
    tolerance,
    passed: sampleReports.length > 0 && sampleReports.every((sample) => sample.passed),
  };
}

function evaluatePressureScaling(samples, constants, tolerance) {
  const nonrel = samples.filter((sample) => sample.regime === "nonrelativistic_white_dwarf");
  const rel = samples.filter((sample) => sample.regime === "relativistic_white_dwarf");
  const nonrelReport = evaluatePowerLaw({
    samples: nonrel,
    xKey: "n_e",
    yKey: "P_pack_theta",
    expectedExponent: 5 / 3,
    expectedCoefficient: finiteNumber(
      constants.nonrelPressureCoefficient,
      "constants.nonrelPressureCoefficient",
    ),
    tolerance,
  });
  const relReport = evaluatePowerLaw({
    samples: rel,
    xKey: "n_e",
    yKey: "P_pack_theta",
    expectedExponent: 4 / 3,
    expectedCoefficient: finiteNumber(constants.relPressureCoefficient, "constants.relPressureCoefficient"),
    tolerance,
  });
  return {
    solverForm: "fixed_exponent_single_coefficient_log_residual",
    nonrelativistic_white_dwarf: nonrelReport,
    relativistic_white_dwarf: relReport,
    passed: nonrelReport.passed && relReport.passed,
  };
}

function evaluateMassRadiusScaling(samples, constants, tolerance) {
  return evaluatePowerLaw({
    samples,
    xKey: "M",
    yKey: "R",
    expectedExponent: -1 / 3,
    expectedCoefficient: finiteNumber(
      constants.nonrelMassRadiusCoefficient,
      "constants.nonrelMassRadiusCoefficient",
    ),
    tolerance,
  });
}

function evaluateCompositionScaling(samples, constants, tolerance) {
  return evaluatePowerLaw({
    samples,
    xKey: "Y_e",
    yKey: "M_Ch",
    expectedExponent: 2,
    expectedCoefficient: finiteNumber(
      constants.chandrasekharMassCoefficient,
      "constants.chandrasekharMassCoefficient",
    ),
    tolerance,
  });
}

function evaluatePowerLaw({ samples, xKey, yKey, expectedExponent, expectedCoefficient, tolerance }) {
  const parsedSamples = samples.map((sample) => ({
    id: sample.id ?? null,
    x: positiveNumber(sample[xKey], `${sample.id}.${xKey}`),
    y: positiveNumber(sample[yKey], `${sample.id}.${yKey}`),
  }));
  const fittedCoefficient =
    parsedSamples.length > 0
      ? Math.exp(
          mean(parsedSamples.map((sample) => Math.log(sample.y) - expectedExponent * Math.log(sample.x))),
        )
      : NaN;
  const coefficientResidual = relativeResidual(fittedCoefficient, expectedCoefficient);
  const sampleReports = parsedSamples.map((sample) => {
    const expectedY = expectedCoefficient * sample.x ** expectedExponent;
    const fittedY = fittedCoefficient * sample.x ** expectedExponent;
    return {
      id: sample.id,
      observed: { [xKey]: sample.x, [yKey]: sample.y },
      expected: { [yKey]: expectedY },
      fitted: { [yKey]: fittedY },
      expectedResidual: relativeResidual(sample.y, expectedY),
      fittedResidual: relativeResidual(sample.y, fittedY),
    };
  });
  const pairExponents = computePairExponents(parsedSamples);
  const exponentResiduals = pairExponents.map((pair) => pair.exponent - expectedExponent);
  const maxExpectedResidual = maxAbs(sampleReports.map((sample) => sample.expectedResidual));
  const maxFittedResidual = maxAbs(sampleReports.map((sample) => sample.fittedResidual));
  const maxExponentResidual = maxAbs(exponentResiduals);
  return {
    xKey,
    yKey,
    expectedExponent,
    expectedCoefficient,
    fittedCoefficient,
    coefficientResidual,
    samples: sampleReports,
    pairExponents,
    maxExpectedResidual,
    maxFittedResidual,
    maxExponentResidual,
    tolerance,
    passed:
      parsedSamples.length >= 2 &&
      Math.abs(coefficientResidual) <= tolerance &&
      maxExpectedResidual <= tolerance &&
      maxFittedResidual <= tolerance &&
      maxExponentResidual <= tolerance,
  };
}

function computePairExponents(samples) {
  const pairs = [];
  for (let leftIndex = 0; leftIndex < samples.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < samples.length; rightIndex += 1) {
      const left = samples[leftIndex];
      const right = samples[rightIndex];
      pairs.push({
        left: left.id,
        right: right.id,
        exponent: Math.log(right.y / left.y) / Math.log(right.x / left.x),
      });
    }
  }
  return pairs;
}

function evaluateNoHiddenRetune(retune, tolerance) {
  const maxResidual = Math.abs(finiteNumber(retune.maxResidual ?? retune.residual ?? Infinity, "noHiddenRetune"));
  const perSamplePressureCoefficientCount = finiteNumber(
    retune.perSamplePressureCoefficientCount ?? 0,
    "noHiddenRetune.perSamplePressureCoefficientCount",
  );
  const perSampleMassBoundaryCoefficientCount = finiteNumber(
    retune.perSampleMassBoundaryCoefficientCount ?? 0,
    "noHiddenRetune.perSampleMassBoundaryCoefficientCount",
  );
  return {
    maxResidual,
    perSamplePressureCoefficientCount,
    perSampleMassBoundaryCoefficientCount,
    tolerance,
    passed:
      maxResidual <= tolerance &&
      perSamplePressureCoefficientCount === 0 &&
      perSampleMassBoundaryCoefficientCount === 0,
  };
}

function evaluateLevelSeparation(levels, tolerance) {
  const fermiSpacingReference = positiveNumber(levels.fermiSpacingReference, "levelSeparation.fermiSpacingReference");
  const atomicOrbitalScale = positiveNumber(levels.atomicOrbitalScale, "levelSeparation.atomicOrbitalScale");
  const materialNoetherBraidScale = positiveNumber(
    levels.materialNoetherBraidScale,
    "levelSeparation.materialNoetherBraidScale",
  );
  const lambda_A = positiveNumber(levels.lambda_A, "levelSeparation.lambda_A");
  const separations = {
    atomic_minus_fermi: Math.abs(atomicOrbitalScale - fermiSpacingReference),
    material_minus_fermi: Math.abs(materialNoetherBraidScale - fermiSpacingReference),
    lambda_minus_fermi: Math.abs(lambda_A - fermiSpacingReference),
  };
  const minSeparation = Math.min(...Object.values(separations));
  return {
    fermiSpacingReference,
    atomicOrbitalScale,
    materialNoetherBraidScale,
    lambda_A,
    separations,
    minSeparation,
    tolerance,
    passed: minSeparation > tolerance,
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

function evaluateNegativeControls(basePacket, negativeControls, tolerances) {
  return negativeControls.map((control) => {
    const packet = deepMerge(basePacket, control.overrides ?? {});
    const result = evaluateChandrasekharSolver(packet, tolerances);
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
        check?.maxExpectedResidual ??
        check?.maxExponentResidual ??
        check?.coefficientResidual ??
        check?.minSeparation ??
        null,
    };
  });
}

function allSolverChecksPass(solver) {
  return [
    solver.stateCounting,
    solver.pressureScaling,
    solver.massRadiusScaling,
    solver.compositionScaling,
    solver.sourceProvenance,
    solver.noHiddenRetune,
    solver.levelSeparation,
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
    ["state_counting", solver.stateCounting],
    ["nonrelativistic_pressure_scaling", solver.pressureScaling.nonrelativistic_white_dwarf],
    ["relativistic_pressure_scaling", solver.pressureScaling.relativistic_white_dwarf],
    ["mass_radius_scaling", solver.massRadiusScaling],
    ["composition_scaling", solver.compositionScaling],
    ["source_provenance", solver.sourceProvenance],
    ["hidden_retune", solver.noHiddenRetune],
    ["level_separation", solver.levelSeparation],
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

function mean(values) {
  if (values.length === 0) {
    return NaN;
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length;
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
