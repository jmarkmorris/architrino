#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "eq11-weak-gravity-constitutive-attempt.v1.json");
const INPUT_SCHEMA = "aaa-equation-map-eq11-weak-gravity-constitutive-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-eq11-weak-gravity-constitutive-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";

const REQUIRED_ROWS = [
  "theta_11_20",
  "theta_sea",
  "theta_src",
  "constitutive_response",
  "source_branch_ledger",
  "wake_ledger",
  "mass_loading_row",
  "metric_projection",
  "effective_coupling_row",
  "poisson_handoff_row",
  "sea_stress_pressure_source_row",
  "curvature_readout_row",
  "stress_energy_readout_row",
  "effective_coupling_continuity_row",
  "ppn_metric_handoff",
  "source_provenance",
  "no_hidden_retune_witness",
];

const DEFAULT_TOLERANCES = {
  carrier: 1e-12,
  poisson: 1e-12,
  curvature: 1e-12,
  coupling: 1e-12,
  ppn: 1,
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
const output = evaluateEq11WeakGravity(input, inputPath);
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
  console.log(`Usage: node scripts/equation-mapping/eq11-weak-gravity-constitutive-residual.mjs [options]

Options:
  --input PATH          EQ-11 weak-gravity constitutive residual input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the residual is populated.
  --help                Show this help.

This checker evaluates the score-neutral EQ-11 Poisson/curvature/effective-
coupling residual. Attempt rows, scalar-only weak gravity, split G_eff rows,
unledgered source loading, and hidden retunes never raise equation scores.`);
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

function evaluateEq11WeakGravity(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const packet = input.packet ?? input;
  const rows = packet.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedRow(rows[rowId])]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const carrierBinding = evaluateCarrierBinding(rows, packet.commonCarrierId ?? input.commonCarrierId);
  const sharedKeys = evaluateSharedKeys(packet.sharedKeys ?? [], tolerances);
  const weakGravity = evaluateWeakGravity(packet.weakGravity ?? {}, tolerances);
  const negativeControls = evaluateNegativeControls(packet.weakGravity ?? {}, packet.negativeControls ?? [], tolerances);
  const status = decideStatus({
    missingRows,
    carrierBinding,
    sharedKeys,
    weakGravity,
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
      row: "EQ-11",
      supportedRows: ["EQ-07", "EQ-09", "EQ-11", "EQ-20", "EQ-21", "EQ-32"],
      claimLevel:
        "score-neutral weak-gravity constitutive residual; accepted retained rows are required before score movement",
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
        weakGravity,
        negativeControls,
      }),
      commonCarrierPass: carrierBinding.passed,
      sharedKeysAccepted: sharedKeys.accepted,
      weakGravityNumericPass: weakGravity.passed,
      poissonPass: weakGravity.poisson.passed,
      curvaturePass: weakGravity.curvature.passed,
      couplingContinuityPass: weakGravity.couplingContinuity.passed,
      ppnHandoffPass: weakGravity.ppnHandoff.passed,
      sourceProvenancePass: weakGravity.sourceProvenance.passed,
      hiddenRetunePass: weakGravity.noHiddenRetune.passed,
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
    weakGravity,
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

function evaluateWeakGravity(weakGravity, tolerances) {
  const constants = parseConstants(weakGravity.constants ?? {});
  const poisson = evaluatePoisson(weakGravity.poisson ?? {}, tolerances.poisson);
  const curvature = evaluateCurvature(weakGravity.curvature ?? {}, constants, tolerances.curvature);
  const couplingContinuity = evaluateCouplingContinuity(
    weakGravity.couplingContinuity ?? {},
    tolerances.coupling,
  );
  const ppnHandoff = evaluatePpn(weakGravity.ppnHandoff ?? {}, tolerances.ppn);
  const sourceProvenance = evaluateScalarResidual(
    weakGravity.sourceProvenance?.residual ?? weakGravity.sourceProvenance?.maxResidual,
    tolerances.sourceProvenance,
  );
  const noHiddenRetune = evaluateScalarResidual(
    weakGravity.noHiddenRetune?.maxResidual ?? weakGravity.noHiddenRetune?.residual,
    tolerances.retune,
  );
  const passed =
    poisson.passed &&
    curvature.passed &&
    couplingContinuity.passed &&
    ppnHandoff.passed &&
    sourceProvenance.passed &&
    noHiddenRetune.passed;

  return {
    passed,
    constants,
    poisson,
    curvature,
    couplingContinuity,
    ppnHandoff,
    sourceProvenance,
    noHiddenRetune,
  };
}

function parseConstants(constants) {
  return {
    c0: finiteNumber(constants.c0 ?? 1, "constants.c0"),
  };
}

function evaluatePoisson(poisson, tolerance) {
  const laplacian = finiteNumber(poisson.laplacian_phi_eff, "poisson.laplacian_phi_eff");
  const gEff = finiteNumber(poisson.G_eff, "poisson.G_eff");
  const rhoSrc = finiteNumber(poisson.rho_src_eff, "poisson.rho_src_eff");
  const seaSource = finiteNumber(poisson.sea_source_phi ?? 0, "poisson.sea_source_phi");
  const expected = 4 * Math.PI * gEff * rhoSrc + seaSource;
  return {
    laplacian_phi_eff: laplacian,
    expected,
    G_eff: gEff,
    rho_src_eff: rhoSrc,
    sea_source_phi: seaSource,
    ...evaluatePassResidual(laplacian - expected, tolerance),
  };
}

function evaluateCurvature(curvature, constants, tolerance) {
  const gTensor = finiteArray(curvature.G_tensor, "curvature.G_tensor");
  const metricTensor = finiteArray(curvature.metric_tensor, "curvature.metric_tensor");
  const tEff = finiteArray(curvature.T_eff, "curvature.T_eff");
  if (gTensor.length !== metricTensor.length || gTensor.length !== tEff.length) {
    throw new Error("curvature.G_tensor, metric_tensor, and T_eff must have the same length.");
  }
  const lambdaEff = finiteNumber(curvature.lambda_eff ?? 0, "curvature.lambda_eff");
  const gEff = finiteNumber(curvature.G_eff, "curvature.G_eff");
  const rhsScale = (8 * Math.PI * gEff) / Math.pow(constants.c0, 4);
  const residuals = gTensor.map((component, index) => {
    const left = component + lambdaEff * metricTensor[index];
    const right = rhsScale * tEff[index];
    return left - right;
  });
  const maxAbsResidual = Math.max(...residuals.map((value) => Math.abs(value)));
  return {
    G_tensor: gTensor,
    metric_tensor: metricTensor,
    T_eff: tEff,
    lambda_eff: lambdaEff,
    G_eff: gEff,
    residuals,
    maxAbsResidual,
    passed: maxAbsResidual <= tolerance,
  };
}

function evaluateCouplingContinuity(coupling, tolerance) {
  const projection = finiteNumber(coupling.projection, "couplingContinuity.projection");
  const rows = Array.isArray(coupling.rows) ? coupling.rows : [];
  if (rows.length === 0) {
    throw new Error("couplingContinuity.rows must be a nonempty array.");
  }
  const rowResults = rows.map((row, index) => {
    const gEff = finiteNumber(row.G_eff, `couplingContinuity.rows[${index}].G_eff`);
    const sigma = finiteNumber(row.sigma, `couplingContinuity.rows[${index}].sigma`);
    if (sigma <= 0) {
      throw new Error(`couplingContinuity.rows[${index}].sigma must be positive.`);
    }
    const normalizedResidual = (gEff - projection) / sigma;
    return {
      id: row.id ?? `row_${index + 1}`,
      G_eff: gEff,
      sigma,
      normalizedResidual,
      passed: Math.abs(normalizedResidual) <= tolerance,
    };
  });
  const provenanceResidual = finiteNumber(
    coupling.provenanceResidual ?? 0,
    "couplingContinuity.provenanceResidual",
  );
  const maxAbsNormalized = Math.max(...rowResults.map((row) => Math.abs(row.normalizedResidual)));
  return {
    projection,
    rows: rowResults,
    provenanceResidual,
    maxAbsNormalized,
    passed: rowResults.every((row) => row.passed) && Math.abs(provenanceResidual) <= tolerance,
  };
}

function evaluatePpn(ppn, tolerance) {
  const bounds = ppn.bounds ?? {};
  const entries = {
    gamma_PPN_minus_1: finiteNumber(ppn.gamma_PPN, "ppnHandoff.gamma_PPN") - 1,
    beta_PPN_minus_1: finiteNumber(ppn.beta_PPN, "ppnHandoff.beta_PPN") - 1,
    alpha1: finiteNumber(ppn.alpha1 ?? 0, "ppnHandoff.alpha1"),
    alpha2: finiteNumber(ppn.alpha2 ?? 0, "ppnHandoff.alpha2"),
    alpha3: finiteNumber(ppn.alpha3 ?? 0, "ppnHandoff.alpha3"),
  };
  const normalized = Object.fromEntries(
    Object.entries(entries).map(([key, value]) => {
      const bound = finiteNumber(bounds[key], `ppnHandoff.bounds.${key}`);
      if (bound <= 0) {
        throw new Error(`ppnHandoff.bounds.${key} must be positive.`);
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

function evaluateNegativeControls(baseWeakGravity, negativeControls, tolerances) {
  return negativeControls.map((control) => {
    const weakGravity = deepMerge(baseWeakGravity, control.overrides ?? {});
    const result = evaluateWeakGravity(weakGravity, tolerances);
    const expectedFailedCheck = String(control.expectedFailedCheck ?? "");
    const check = getByPath(result, expectedFailedCheck);
    const failedAsExpected = check && check.passed === false;
    return {
      id: control.id ?? null,
      expectedFailedCheck,
      passed: Boolean(failedAsExpected),
      wholePacketPassed: result.passed,
      expectedCheckPassed: check?.passed ?? null,
      expectedCheckResidual:
        check?.residual ?? check?.maxAbsNormalized ?? check?.maxAbsResidual ?? check?.provenanceResidual ?? null,
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
      .filter((result) => Math.abs(result.residual) > tolerances.carrier);
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
    lowerBasename.includes("negative-control")
  );
}

function decideStatus({ missingRows, carrierBinding, sharedKeys, weakGravity, negativeControls }) {
  if (missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  if (!carrierBinding.passed) {
    return "blocked_carrier_split";
  }
  if (!sharedKeys.accepted) {
    return "blocked_shared_key_retune";
  }
  if (!weakGravity.passed) {
    return "blocked_residuals";
  }
  if (!negativeControls.every((control) => control.passed)) {
    return "blocked_negative_control";
  }
  return "populated";
}

function firstBlocker({ status, missingRows, carrierBinding, sharedKeys, weakGravity, negativeControls }) {
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
  if (!weakGravity.poisson.passed) {
    return "poisson_handoff_residual";
  }
  if (!weakGravity.curvature.passed) {
    return "curvature_readout_residual";
  }
  if (!weakGravity.couplingContinuity.passed) {
    return "effective_coupling_continuity_residual";
  }
  if (!weakGravity.ppnHandoff.passed) {
    return "ppn_metric_handoff_residual";
  }
  if (!weakGravity.sourceProvenance.passed) {
    return "source_provenance_residual";
  }
  if (!weakGravity.noHiddenRetune.passed) {
    return "hidden_retune_residual";
  }
  const failedControl = negativeControls.find((control) => !control.passed);
  if (failedControl) {
    return `negative_control_failed_${failedControl.id}`;
  }
  return "unknown_blocker";
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

function finiteArray(value, label) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${label} must be a nonempty array.`);
  }
  return value.map((entry, index) => finiteNumber(entry, `${label}[${index}]`));
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
