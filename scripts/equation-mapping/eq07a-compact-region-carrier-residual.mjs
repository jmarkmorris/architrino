#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "eq07a-compact-region-carrier-attempt.v1.json");
const INPUT_SCHEMA = "aaa-equation-map-eq07a-compact-region-carrier-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-eq07a-compact-region-carrier-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";

const REQUIRED_ROWS = [
  "standard_benchmark_row",
  "electron_inventory_row",
  "fermi_state_counting_row",
  "pressure_regime_row",
  "composition_row",
  "compact_region_record",
  "material_scale_compression_row",
  "native_pressure_packing_row",
  "neutron_star_radial_support_row",
  "reaction_inventory_row",
  "compact_region_conservation_ledger",
  "metric_compliance_row",
  "eos_projection",
  "metric_projection",
  "source_provenance",
  "no_hidden_retune_witness",
  "level_separation_witness",
];

const REQUIRED_VARIABLES = [
  "n_e",
  "ell_e",
  "p_F",
  "x_F",
  "Y_e",
  "mu_e",
  "M",
  "R",
  "r",
  "lambda_A",
  "S_mat",
  "Theta_NS_branchSurvival",
  "S_metric",
  "atomicOrbitalScale",
  "materialNoetherBraidScale",
];

const DEFAULT_TOLERANCES = {
  carrier: 1e-12,
  fermi: 1e-12,
  composition: 1e-12,
  support: 1e-12,
  ledger: 1e-12,
  scaleMetric: 1e-12,
  neutronStar: 1e-12,
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
const output = evaluateEq07aCompactRegionCarrier(input, inputPath);
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
  console.log(`Usage: node scripts/equation-mapping/eq07a-compact-region-carrier-residual.mjs [options]

Options:
  --input PATH          EQ-07A compact-region carrier input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the residual is populated.
  --help                Show this help.

This checker evaluates the score-neutral EQ-07A compact-star support and
collapse carrier. Attempt carriers, imported pressure formulae, split support
and metric records, and level collapse between Fermi spacing and material
Noether braid scale never raise equation scores.`);
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

function evaluateEq07aCompactRegionCarrier(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const packet = input.packet ?? input;
  const carrier = evaluateAcceptedEvidence(input.carrier ?? packet.carrier);
  const rows = packet.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedEvidence(rows[rowId])]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const carrierBinding = evaluateCarrierBinding(rows, input.commonCarrierId ?? packet.id);
  const variableDictionary = evaluateVariableDictionary(packet.variables ?? {});
  const residual = evaluateCompactResidual(packet, tolerances);
  const negativeControls = evaluateNegativeControls(packet, packet.negativeControls ?? [], tolerances);
  const status = decideStatus({
    carrier,
    missingRows,
    carrierBinding,
    variableDictionary,
    residual,
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
      row: "EQ-07A",
      supportedRows: ["EQ-07A", "EQ-07", "EQ-08", "EQ-09", "EQ-10", "EQ-11"],
      claimLevel:
        "score-neutral compact-region carrier residual; accepted compact-region retained evidence is required before score movement",
    },
    tolerances,
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      carrierAccepted: carrier.accepted,
      carrierReason: carrier.reason,
      missingRows,
      missingVariableCount: variableDictionary.missing.length,
      nextBlocker: firstBlocker({
        status,
        carrier,
        missingRows,
        carrierBinding,
        variableDictionary,
        residual,
        negativeControls,
      }),
      commonCarrierPass: carrierBinding.passed,
      variableDictionaryPass: variableDictionary.passed,
      fermiStateCountingPass: residual.fermiStateCounting.passed,
      pressureRegimePass: residual.pressureRegime.passed,
      compositionPass: residual.composition.passed,
      supportResidualPass: residual.support.passed,
      reactionLedgerPass: residual.reactionLedger.passed,
      compactLedgerPass: residual.compactRegionLedger.passed,
      scaleMetricPass: residual.scaleMetric.passed,
      neutronStarPass: residual.neutronStarRadialSupport.passed,
      sourceProvenancePass: residual.sourceProvenance.passed,
      hiddenRetunePass: residual.noHiddenRetune.passed,
      levelSeparationPass: residual.levelSeparation.passed,
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
          rowId: rows[rowId]?.rowId ?? rows[rowId]?.id ?? null,
          carrierId: rows[rowId]?.carrierId ?? null,
          sourcePath: rows[rowId]?.sourcePath ?? rows[rowId]?.source ?? null,
        },
      ]),
    ),
    carrierBinding,
    variableDictionary,
    compactCarrier: residual,
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

function evaluateCompactResidual(packet, tolerances) {
  const variables = packet.variables ?? {};
  return {
    fermiStateCounting: evaluateFermiStateCounting(variables, packet.standardBenchmark ?? {}, tolerances.fermi),
    pressureRegime: evaluatePressureRegime(packet, tolerances.fermi),
    composition: evaluateComposition(variables, packet.standardBenchmark ?? {}, tolerances.composition),
    support: evaluateSupport(packet.standardBenchmark ?? {}, tolerances.support),
    reactionLedger: evaluateLedger(packet.reactionLedger ?? {}, tolerances.ledger),
    compactRegionLedger: evaluateLedger(packet.compactRegionLedger ?? {}, tolerances.ledger),
    scaleMetric: evaluateLedger(packet.scaleMetric ?? {}, tolerances.scaleMetric),
    neutronStarRadialSupport: evaluateLedger(packet.neutronStarRadialSupport ?? {}, tolerances.neutronStar),
    sourceProvenance: evaluateScalarResidual(
      packet.sourceProvenance?.maxResidual ?? packet.sourceProvenance?.residual,
      tolerances.sourceProvenance,
    ),
    noHiddenRetune: evaluateScalarResidual(
      packet.noHiddenRetune?.maxResidual ?? packet.noHiddenRetune?.residual,
      tolerances.retune,
    ),
    levelSeparation: evaluateLevelSeparation(variables, tolerances.levelSeparation),
  };
}

function evaluateVariableDictionary(variables) {
  const missing = REQUIRED_VARIABLES.filter((key) => !Number.isFinite(Number(variables[key])));
  return {
    passed: missing.length === 0,
    missing,
    variables: Object.fromEntries(
      REQUIRED_VARIABLES.map((key) => [
        key,
        Number.isFinite(Number(variables[key])) ? Number(variables[key]) : null,
      ]),
    ),
  };
}

function evaluateFermiStateCounting(variables, benchmark, tolerance) {
  const n_e = positiveNumber(variables.n_e, "variables.n_e");
  const ell_e = positiveNumber(variables.ell_e, "variables.ell_e");
  const p_F = positiveNumber(variables.p_F, "variables.p_F");
  const x_F = positiveNumber(variables.x_F, "variables.x_F");
  const hbarNorm = positiveNumber(benchmark.hbarNorm ?? 1, "standardBenchmark.hbarNorm");
  const mec0Norm = positiveNumber(benchmark.mec0Norm ?? 1, "standardBenchmark.mec0Norm");
  const ellExpected = n_e ** (-1 / 3);
  const pExpected = hbarNorm / ell_e;
  const xExpected = p_F / mec0Norm;
  const residuals = {
    ell_e: ell_e - ellExpected,
    p_F: p_F - pExpected,
    x_F: x_F - xExpected,
  };
  const maxResidual = maxAbs(Object.values(residuals));
  return {
    n_e,
    hbarNorm,
    mec0Norm,
    observed: { ell_e, p_F, x_F },
    expected: { ell_e: ellExpected, p_F: pExpected, x_F: xExpected },
    residuals,
    maxResidual,
    tolerance,
    passed: maxResidual <= tolerance,
  };
}

function evaluatePressureRegime(packet, tolerance) {
  const variables = packet.variables ?? {};
  const benchmark = packet.standardBenchmark ?? {};
  const x_F = positiveNumber(variables.x_F, "variables.x_F");
  const observedRegime = String(packet.activePressureRegime ?? "");
  const expectedRegime = x_F < 1 ? "nonrelativistic_white_dwarf" : "relativistic_white_dwarf";
  const observedExponent = positiveNumber(benchmark.pressureExponent, "standardBenchmark.pressureExponent");
  const expectedExponent = expectedRegime === "nonrelativistic_white_dwarf" ? 5 / 3 : 4 / 3;
  const exponentResidual = observedExponent - expectedExponent;
  return {
    observedRegime,
    expectedRegime,
    observedExponent,
    expectedExponent,
    exponentResidual,
    tolerance,
    passed: observedRegime === expectedRegime && Math.abs(exponentResidual) <= tolerance,
  };
}

function evaluateComposition(variables, benchmark, tolerance) {
  const Y_e = positiveNumber(variables.Y_e, "variables.Y_e");
  const mu_e = positiveNumber(variables.mu_e, "variables.mu_e");
  const reciprocalResidual = Y_e * mu_e - 1;
  const compositionResidual = finiteNumber(
    benchmark.chandrasekharCompositionObserved,
    "standardBenchmark.chandrasekharCompositionObserved",
  ) - finiteNumber(
    benchmark.chandrasekharCompositionExpected,
    "standardBenchmark.chandrasekharCompositionExpected",
  );
  const maxResidual = maxAbs([reciprocalResidual, compositionResidual]);
  return {
    Y_e,
    mu_e,
    reciprocalResidual,
    compositionResidual,
    maxResidual,
    tolerance,
    passed: maxResidual <= tolerance,
  };
}

function evaluateSupport(benchmark, tolerance) {
  const pressureResidual =
    finiteNumber(benchmark.P_pack_theta, "standardBenchmark.P_pack_theta") -
    finiteNumber(benchmark.P_std, "standardBenchmark.P_std");
  return {
    pressureResidual,
    tolerance,
    passed: Math.abs(pressureResidual) <= tolerance,
  };
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

function evaluateLevelSeparation(variables, tolerance) {
  const ell_e = positiveNumber(variables.ell_e, "variables.ell_e");
  const atomicOrbitalScale = positiveNumber(variables.atomicOrbitalScale, "variables.atomicOrbitalScale");
  const materialNoetherBraidScale = positiveNumber(
    variables.materialNoetherBraidScale,
    "variables.materialNoetherBraidScale",
  );
  const lambda_A = positiveNumber(variables.lambda_A, "variables.lambda_A");
  const separations = {
    atomic_minus_fermi: Math.abs(atomicOrbitalScale - ell_e),
    material_minus_fermi: Math.abs(materialNoetherBraidScale - ell_e),
    lambda_minus_fermi: Math.abs(lambda_A - ell_e),
  };
  const minSeparation = Math.min(...Object.values(separations));
  return {
    separations,
    minSeparation,
    tolerance,
    passed: minSeparation > tolerance,
  };
}

function evaluateNegativeControls(basePacket, negativeControls, tolerances) {
  return negativeControls.map((control) => {
    const packet = deepMerge(basePacket, control.overrides ?? {});
    const result = evaluateCompactResidual(packet, tolerances);
    const expectedFailedCheck = String(control.expectedFailedCheck ?? "");
    const check = getByPath(result, expectedFailedCheck);
    const failedAsExpected = check && check.passed === false;
    return {
      id: control.id ?? null,
      expectedFailedCheck,
      passed: Boolean(failedAsExpected),
      wholePacketPassed: allResidualsPass(result),
      expectedCheckPassed: check?.passed ?? null,
      expectedCheckResidual: check?.maxResidual ?? check?.residual ?? check?.minSeparation ?? null,
    };
  });
}

function allResidualsPass(result) {
  return Object.values(result).every((entry) => entry?.passed === true);
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
  const resolved = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(REPO_ROOT, sourcePath.replace(/#.*/, ""));
  if (!resolved.startsWith(REPO_ROOT)) {
    return { accepted: false, reason: "source_outside_repo" };
  }
  if (isNonDurableSourcePath(resolved)) {
    return { accepted: false, reason: "non_durable_source_path" };
  }
  if (!fs.existsSync(resolved)) {
    return { accepted: false, reason: "source_missing" };
  }
  if (!fs.statSync(resolved).isFile()) {
    return { accepted: false, reason: "source_not_file" };
  }
  if (!isEvidenceSourcePath(resolved)) {
    return { accepted: false, reason: "accepted_without_evidence_source" };
  }
  return { accepted: true, reason: "accepted" };
}

function isNonDurableSourcePath(filePath) {
  const normalized = path.normalize(filePath);
  return (
    normalized.startsWith(`${path.normalize("/tmp")}${path.sep}`) ||
    normalized.startsWith(`${path.normalize("/private/tmp")}${path.sep}`) ||
    normalized.includes(`${path.sep}content${path.sep}generated${path.sep}`) ||
    path.basename(normalized).includes(".tmp")
  );
}

function isEvidenceSourcePath(filePath) {
  const normalized = path.normalize(filePath);
  const relative = path.relative(REPO_ROOT, normalized);
  if (
    relative === "" ||
    relative.startsWith("..") ||
    path.isAbsolute(relative)
  ) {
    return false;
  }
  if (relative.startsWith(`reference${path.sep}priorities${path.sep}`)) {
    return false;
  }
  if (relative.startsWith(`content${path.sep}markdown${path.sep}aaa${path.sep}`)) {
    return false;
  }
  const lowerBasename = path.basename(normalized).toLowerCase();
  return !(
    lowerBasename.includes("attempt") ||
    lowerBasename.includes("toy") ||
    lowerBasename.includes("source-evidence-probe") ||
    lowerBasename.includes("probe") ||
    lowerBasename.includes("mock") ||
    lowerBasename.includes("negative-control")
  );
}

function decideStatus({ carrier, missingRows, carrierBinding, variableDictionary, residual, negativeControls }) {
  if (!carrier.accepted) {
    return "blocked_missing_accepted_compact_region_carrier";
  }
  if (missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  if (!carrierBinding.passed) {
    return "blocked_carrier_split";
  }
  if (!variableDictionary.passed) {
    return "blocked_variable_dictionary";
  }
  if (!allResidualsPass(residual)) {
    return "blocked_residuals";
  }
  if (!negativeControls.every((control) => control.passed)) {
    return "blocked_negative_control";
  }
  return "populated";
}

function firstBlocker({ status, carrier, missingRows, carrierBinding, variableDictionary, residual, negativeControls }) {
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
  if (!variableDictionary.passed) {
    return `missing_variable_${variableDictionary.missing[0] ?? "unknown"}`;
  }
  for (const [key, value] of Object.entries(residual)) {
    if (value?.passed === false) {
      return `${key}_residual`;
    }
  }
  const failedControl = negativeControls.find((control) => !control.passed);
  if (failedControl) {
    return `negative_control_failed_${failedControl.id}`;
  }
  return carrier.reason ?? "unknown_blocker";
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

function maxAbs(values) {
  return Math.max(...values.map((value) => Math.abs(value)));
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
