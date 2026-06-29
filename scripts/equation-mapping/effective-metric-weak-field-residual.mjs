#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "effective-metric-weak-field-attempt.v1.json");
const INPUT_SCHEMA = "aaa-equation-map-effective-metric-weak-field-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-effective-metric-weak-field-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";
const RESPONSE_KEYS = ["n", "chi", "lambda", "R"];

const REQUIRED_ROWS = [
  "theta_W",
  "noether_sea_cell",
  "constitutive_response",
  "metric_projection",
  "lapse_row",
  "drift_row",
  "spatial_compliance_row",
  "signal_delay_row",
  "cadence_row",
  "weak_clock_row",
  "redshift_row",
  "shapiro_row",
  "lensing_row",
  "acceleration_row",
  "ppn_decision_row",
  "null_eikonal_row",
  "geodesic_action_row",
  "source_provenance",
  "no_hidden_retune_witness",
];

const DEFAULT_TOLERANCES = {
  carrier: 1e-12,
  staticResponse: 1e-12,
  weakClock: 1e-12,
  observable: 1e-12,
  ppn: 1,
  sharedKey: 1e-12,
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
const output = evaluateEffectiveMetricWeakField(input, inputPath);
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
  console.log(`Usage: node scripts/equation-mapping/effective-metric-weak-field-residual.mjs [options]

Options:
  --input PATH          EQ-07 through EQ-10 weak-field residual input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the residual is populated.
  --help                Show this help.

This checker evaluates the score-neutral EQ-07 through EQ-10 weak-field
effective-metric residual. Attempt rows, split metric carriers, scalar-delay
half-closures, preferred-frame leakage, and hidden retunes never raise scores.`);
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

function evaluateEffectiveMetricWeakField(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const packet = input.packet ?? input;
  const rows = packet.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedRow(rows[rowId])]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const carrierBinding = evaluateCarrierBinding(rows, packet.commonCarrierId ?? input.commonCarrierId);
  const sharedKeys = evaluateSharedKeys(packet.sharedKeys ?? [], tolerances);
  const weakField = evaluateWeakField(packet.weakField ?? {}, tolerances);
  const negativeControls = evaluateNegativeControls(packet.weakField ?? {}, packet.negativeControls ?? [], tolerances);
  const status = decideStatus({
    missingRows,
    carrierBinding,
    sharedKeys,
    weakField,
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
      row: "EQ-07/EQ-08/EQ-09/EQ-10",
      supportedRows: ["EQ-07", "EQ-08", "EQ-09", "EQ-10", "EQ-17", "EQ-11"],
      claimLevel:
        "score-neutral weak-field effective-metric residual; accepted retained rows are required before score review",
    },
    tolerances,
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      missingRows,
      missingSharedKeys: sharedKeys.missingSharedKeys,
      sharedKeyMismatchCount: sharedKeys.mismatches.length,
      nextBlocker: firstBlocker({
        status,
        missingRows,
        carrierBinding,
        sharedKeys,
        weakField,
        negativeControls,
      }),
      commonCarrierPass: carrierBinding.passed,
      sharedKeysAccepted: sharedKeys.accepted,
      weakFieldNumericPass: weakField.passed,
      staticResponsePass: weakField.staticResponse.passed,
      sharedDelayPass: weakField.staticResponse.sharedDelay.passed,
      weakClockPass: weakField.weakClock.passed,
      ppnPass: weakField.ppn.passed,
      observablePass: weakField.observables.passed,
      sourceProvenancePass: weakField.sourceProvenance.passed,
      hiddenRetunePass: weakField.noHiddenRetune.passed,
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
    sharedKeys,
    weakField,
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

function evaluateWeakField(weakField, tolerances) {
  const staticResponse = evaluateStaticResponse(weakField, tolerances.staticResponse);
  const weakClock = evaluateWeakClock(weakField.weakClock ?? {}, tolerances.weakClock);
  const observables = evaluateObservables(weakField.observables ?? {}, tolerances.observable);
  const ppn = evaluatePpn(weakField.ppn ?? {}, tolerances.ppn);
  const sourceProvenance = evaluateScalarResidual(
    weakField.sourceProvenance?.residual ?? weakField.sourceProvenance?.maxResidual,
    tolerances.sourceProvenance,
  );
  const noHiddenRetune = evaluateScalarResidual(
    weakField.noHiddenRetune?.maxResidual ?? weakField.noHiddenRetune?.residual,
    tolerances.retune,
  );
  const passed =
    staticResponse.passed &&
    weakClock.passed &&
    observables.passed &&
    ppn.passed &&
    sourceProvenance.passed &&
    noHiddenRetune.passed;

  return {
    passed,
    staticResponse,
    weakClock,
    observables,
    ppn,
    sourceProvenance,
    noHiddenRetune,
  };
}

function evaluateStaticResponse(weakField, tolerance) {
  const gammaEff = finiteNumber(weakField.gamma_eff, "weakField.gamma_eff");
  const response = weakField.staticResponse ?? {};
  const cadenceRow = weakField.cadenceRow ?? {};
  const clockRateRow = weakField.clockRateRow ?? {};
  const aChi = responseCoefficient(response, "chi");
  const expectedDelay = 1 + gammaEff;
  const sharedDelayResidual = aChi - expectedDelay;
  const endpointSum = dotResponse(cadenceCoefficient, cadenceRow, response);
  const endpointResidual = endpointSum - 1;
  const clockRateSum = dotResponse(clockRateCoefficient, clockRateRow, response);
  const clockRateResidual = clockRateSum + 1;
  const inverseResiduals = Object.fromEntries(
    RESPONSE_KEYS.map((key) => [
      key,
      cadenceCoefficient(cadenceRow, key) + clockRateCoefficient(clockRateRow, key),
    ]),
  );
  const inverseMaxResidual = Math.max(...Object.values(inverseResiduals).map((value) => Math.abs(value)));
  const sharedDelay = evaluatePassResidual(sharedDelayResidual, tolerance);
  const endpoint = evaluatePassResidual(endpointResidual, tolerance);
  const clockRate = evaluatePassResidual(clockRateResidual, tolerance);
  const rowInverse = evaluatePassResidual(inverseMaxResidual, tolerance);

  return {
    passed: sharedDelay.passed && endpoint.passed && clockRate.passed && rowInverse.passed,
    gamma_eff: gammaEff,
    response,
    expected_a_chi_signal_clock: expectedDelay,
    sharedDelay,
    endpoint: {
      sum: endpointSum,
      ...endpoint,
    },
    clockRate: {
      sum: clockRateSum,
      ...clockRate,
    },
    rowInverse: {
      residuals: inverseResiduals,
      maxResidual: inverseMaxResidual,
      ...rowInverse,
    },
  };
}

function evaluateWeakClock(weakClock, tolerance) {
  const phiOverC2 = finiteNumber(weakClock.phi_over_c2, "weakClock.phi_over_c2");
  const w2OverC2 = finiteNumber(weakClock.w2_over_c2 ?? 0, "weakClock.w2_over_c2");
  const observed = finiteNumber(weakClock.d_tau_over_dt, "weakClock.d_tau_over_dt");
  const expected = 1 + phiOverC2 - 0.5 * w2OverC2;
  const residual = observed - expected;
  return {
    phi_over_c2: phiOverC2,
    w2_over_c2: w2OverC2,
    observed_d_tau_over_dt: observed,
    expected_d_tau_over_dt: expected,
    ...evaluatePassResidual(residual, tolerance),
  };
}

function evaluateObservables(observables, tolerance) {
  const shapiro = evaluateGammaObservable(observables.shapiro ?? {}, tolerance, "shapiro");
  const lensing = evaluateGammaObservable(observables.lensing ?? {}, tolerance, "lensing");
  const acceleration = evaluateTwoValueResidual(
    observables.acceleration?.observed,
    observables.acceleration?.minus_grad_phi,
    tolerance,
    "observables.acceleration",
  );
  const nullEikonal = evaluateScalarResidual(observables.null_eikonal?.residual, tolerance);
  const geodesicAction = evaluateScalarResidual(observables.geodesic_action?.residual, tolerance);

  return {
    passed:
      shapiro.passed &&
      lensing.passed &&
      acceleration.passed &&
      nullEikonal.passed &&
      geodesicAction.passed,
    shapiro,
    lensing,
    acceleration,
    nullEikonal,
    geodesicAction,
  };
}

function evaluateGammaObservable(observable, tolerance, label) {
  const gammaPpn = finiteNumber(observable.gamma_PPN, `${label}.gamma_PPN`);
  const factor = finiteNumber(observable.factor, `${label}.factor`);
  const expected = 2 * (1 + gammaPpn);
  const residual = factor - expected;
  return {
    gamma_PPN: gammaPpn,
    factor,
    expectedFactor: expected,
    ...evaluatePassResidual(residual, tolerance),
  };
}

function evaluatePpn(ppn, tolerance) {
  const bounds = ppn.bounds ?? {};
  const entries = {
    gamma_PPN_minus_1: finiteNumber(ppn.gamma_PPN, "ppn.gamma_PPN") - 1,
    beta_PPN_minus_1: finiteNumber(ppn.beta_PPN, "ppn.beta_PPN") - 1,
    alpha1: finiteNumber(ppn.alpha1 ?? 0, "ppn.alpha1"),
    alpha2: finiteNumber(ppn.alpha2 ?? 0, "ppn.alpha2"),
    alpha3: finiteNumber(ppn.alpha3 ?? 0, "ppn.alpha3"),
  };
  const normalized = Object.fromEntries(
    Object.entries(entries).map(([key, value]) => {
      const bound = finiteNumber(bounds[key], `ppn.bounds.${key}`);
      if (bound <= 0) {
        throw new Error(`ppn.bounds.${key} must be positive.`);
      }
      return [key, value / bound];
    }),
  );
  const maxAbsNormalized = Math.max(...Object.values(normalized).map((value) => Math.abs(value)));
  return {
    entries,
    bounds,
    normalized,
    maxAbsNormalized,
    passed: maxAbsNormalized <= tolerance,
  };
}

function evaluateNegativeControls(baseWeakField, negativeControls, tolerances) {
  return negativeControls.map((control) => {
    const weakField = deepMerge(baseWeakField, control.overrides ?? {});
    const result = evaluateWeakField(weakField, tolerances);
    const expectedFailedCheck = String(control.expectedFailedCheck ?? "");
    const check = getByPath(result, expectedFailedCheck);
    const failedAsExpected = check && check.passed === false;
    return {
      id: control.id ?? null,
      expectedFailedCheck,
      passed: Boolean(failedAsExpected),
      wholePacketPassed: result.passed,
      expectedCheckPassed: check?.passed ?? null,
      expectedCheckResidual: check?.residual ?? check?.maxAbsNormalized ?? check?.maxResidual ?? null,
    };
  });
}

function evaluateSharedKeys(sharedKeys, tolerances) {
  const rows = sharedKeys.map((entry) => {
    const values = Array.isArray(entry.values) ? entry.values : [];
    const missing = values.length === 0;
    const first = values[0];
    const mismatches = values
      .map((value, index) => ({ index, value, residual: comparableResidual(value, first) }))
      .filter((result) => Math.abs(result.residual) > tolerances.sharedKey);
    return {
      key: entry.key ?? null,
      values,
      missing,
      passed: !missing && mismatches.length === 0,
      mismatches,
    };
  });
  return {
    accepted: rows.every((row) => row.passed),
    missingSharedKeys: rows.filter((row) => row.missing).map((row) => row.key),
    mismatches: rows.flatMap((row) =>
      row.mismatches.map((mismatch) => ({ key: row.key, ...mismatch })),
    ),
    rows,
  };
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

function evaluateAcceptedRow(row) {
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
  if (relative === "" || relative.startsWith("..") || path.isAbsolute(relative)) {
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
    lowerBasename.includes("mock") ||
    lowerBasename.includes("toy") ||
    lowerBasename.includes("source-contract") ||
    lowerBasename.includes("probe") ||
    lowerBasename.includes("negative-control")
  );
}

function decideStatus({ missingRows, carrierBinding, sharedKeys, weakField, negativeControls }) {
  if (missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  if (!carrierBinding.passed) {
    return "blocked_carrier_split";
  }
  if (!sharedKeys.accepted) {
    return "blocked_shared_key_retune";
  }
  if (!weakField.passed) {
    return "blocked_residuals";
  }
  if (!negativeControls.every((control) => control.passed)) {
    return "blocked_negative_control";
  }
  return "populated";
}

function firstBlocker({ status, missingRows, carrierBinding, sharedKeys, weakField, negativeControls }) {
  if (status === "populated") {
    return null;
  }
  if (missingRows.length > 0) {
    return `missing_accepted_${missingRows[0]}`;
  }
  if (!carrierBinding.passed) {
    return carrierBinding.commonCarrierId ? "carrier_split" : "missing_common_carrier";
  }
  if (!sharedKeys.accepted) {
    return sharedKeys.missingSharedKeys[0]
      ? `missing_shared_key_${sharedKeys.missingSharedKeys[0]}`
      : `shared_key_mismatch_${sharedKeys.mismatches[0]?.key ?? "unknown"}`;
  }
  if (!weakField.staticResponse.passed) {
    return "weak_static_response_residual";
  }
  if (!weakField.weakClock.passed) {
    return "weak_clock_residual";
  }
  if (!weakField.observables.passed) {
    return "weak_observable_residual";
  }
  if (!weakField.ppn.passed) {
    return "ppn_bound_vector_residual";
  }
  if (!weakField.sourceProvenance.passed) {
    return "source_provenance_residual";
  }
  if (!weakField.noHiddenRetune.passed) {
    return "hidden_retune_residual";
  }
  const failedControl = negativeControls.find((control) => !control.passed);
  if (failedControl) {
    return `negative_control_failed_${failedControl.id}`;
  }
  return status;
}

function responseCoefficient(response, key) {
  return finiteNumber(response[`a_${key}`], `staticResponse.a_${key}`);
}

function cadenceCoefficient(row, key) {
  return optionalFiniteNumber(row?.[`b_${key}`], `cadenceRow.b_${key}`);
}

function clockRateCoefficient(row, key) {
  return optionalFiniteNumber(row?.[`omega_${key}`], `clockRateRow.omega_${key}`);
}

function dotResponse(rowReader, row, response) {
  return RESPONSE_KEYS.reduce(
    (sum, key) => sum + rowReader(row, key) * responseCoefficient(response, key),
    0,
  );
}

function evaluateTwoValueResidual(left, right, tolerance, label) {
  const observed = finiteNumber(left, `${label}.observed`);
  const expected = finiteNumber(right, `${label}.expected`);
  return {
    observed,
    expected,
    ...evaluatePassResidual(observed - expected, tolerance),
  };
}

function evaluateScalarResidual(value, tolerance) {
  const residual = finiteNumber(value ?? 0, "residual");
  return evaluatePassResidual(residual, tolerance);
}

function evaluatePassResidual(residual, tolerance) {
  return {
    residual,
    tolerance,
    passed: Math.abs(residual) <= tolerance,
  };
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

function optionalFiniteNumber(value, label, fallback = 0) {
  return value === undefined ? fallback : finiteNumber(value, label);
}

function comparableResidual(value, expected) {
  if (typeof value === "number" && typeof expected === "number") {
    return value - expected;
  }
  return JSON.stringify(value) === JSON.stringify(expected) ? 0 : Infinity;
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
