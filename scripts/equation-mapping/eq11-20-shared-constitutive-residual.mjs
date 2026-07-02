#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { providerEvidenceStatusForPath } from "../spacetime/noether-sea-density-compression-provider-evidence.mjs";
import { pressureProjectionEvidenceStatusForPath } from "./eq20-delta-p-eff-pressure-projection-evidence.mjs";
import { effectiveFrwHandoffEvidenceStatusForPath } from "./effective-frw-handoff-evidence.mjs";
import { theta1120WeakGravityEvidenceStatusForPath } from "./eq11-theta-11-20-weak-gravity-evidence.mjs";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const INPUT_SCHEMA = "aaa-equation-map-eq11-20-shared-constitutive-residual-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-eq11-20-shared-constitutive-residual-check/v1";
const SCORE_DECISION = "no_score_increase";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);

const REQUIRED_ROWS = [
  "theta_11_20_weak_gravity",
  "eq20_pressure_effective_lambda",
  "theta_sea_rho_NS_provider",
  "delta_P_eff_pressure_projection",
  "theta_cos_handoff",
  "shared_coupling",
  "shared_no_hidden_retune_witness",
];

const EXPECTED_SHARED_KEYS = [
  "theta_11_20_id",
  "provider_window_id",
  "theta_cos_id",
  "rho_NS",
  "M_sea_ab",
  "G_eff",
  "p_DE_eff",
  "Lambda_eff",
  "tau_rel",
];

const DEFAULT_TOLERANCES = {
  source: 1e-12,
  sharedKey: 1e-12,
  identity: 1e-12,
  coupling: 1e-12,
  pressureLambda: 1e-12,
  retune: 1e-12,
};

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}
if (!args.input) {
  throw new Error("Missing required --input PATH argument.");
}

const inputPath = path.resolve(args.input);
const input = readJson(inputPath);
const output = evaluateSharedConstitutiveResidual(input, inputPath);
writeOutput(output, args);

if (args.requirePopulated && output.summary.status !== "populated") {
  process.exitCode = 1;
}

function parseArgs(argv) {
  const parsed = {
    input: null,
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
  console.log(`Usage: node scripts/equation-mapping/eq11-20-shared-constitutive-residual.mjs --input PATH [options]

Options:
  --input PATH          Shared EQ-11/EQ-20 constitutive residual input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the shared residual is populated.
  --help                Show this help.

This checker evaluates the score-neutral shared weak-gravity / dark-energy
constitutive residual. It requires accepted theta_11_20 weak-gravity evidence,
the provider-backed EQ-20 pressure/effective-Lambda slice, the accepted density
provider, the retained delta_P_eff pressure report, and the accepted theta_cos
handoff to remain on the declared shared record without hidden retuning.`);
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

function evaluateSharedConstitutiveResidual(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const packet = input.packet ?? input;
  const rows = packet.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedRow(rowId, rows[rowId])]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const evidence = evaluateEvidenceSources(packet.evidenceSources ?? {}, rowChecks);
  const sharedKeys = evaluateSharedKeys(packet.sharedKeys ?? [], tolerances);
  const residualComponents = evaluateResidualComponents(
    packet.residualComponents ?? {},
    tolerances,
  );
  const status = decideStatus({
    missingRows,
    evidence,
    sharedKeys,
    residualComponents,
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
      row: "EQ-11/EQ-20",
      supportedRows: ["EQ-11", "EQ-18", "EQ-19", "EQ-20", "EQ-24", "EQ-32"],
      claimLevel:
        "score-neutral shared constitutive residual; no equation score increase follows from a populated slice",
    },
    tolerances,
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      missingRows,
      sourceEvidenceAccepted: evidence.accepted,
      sourceEvidenceFailureCount: evidence.failures.length,
      missingSharedKeys: sharedKeys.missingSharedKeys,
      sharedKeyMismatchCount: sharedKeys.mismatches.length,
      sharedKeysAccepted: sharedKeys.accepted,
      hiddenRetuneNumericPass: sharedKeys.hiddenRetuneNumericPass,
      identityResidualPass: residualComponents.identity.passed,
      couplingResidualPass: residualComponents.coupling.passed,
      pressureLambdaResidualPass: residualComponents.pressureLambda.passed,
      hiddenRetunePass: residualComponents.noHiddenRetune.passed,
      nextBlocker: firstBlocker({
        status,
        missingRows,
        evidence,
        sharedKeys,
        residualComponents,
      }),
    },
    rows: Object.fromEntries(
      REQUIRED_ROWS.map((rowId) => [
        rowId,
        {
          status: normalizeStatus(rows[rowId]),
          accepted: rowChecks[rowId].accepted,
          reason: rowChecks[rowId].reason,
          sourcePath: rows[rowId]?.sourcePath ?? rows[rowId]?.source ?? null,
        },
      ]),
    ),
    evidence,
    sharedKeys,
    residualComponents,
  };
}

function summarizeOutput(output) {
  return {
    schema: output.schema,
    generatedAt: output.generatedAt,
    input: output.input,
    residual: output.residual,
    summary: output.summary,
    rows: output.rows,
    evidence: {
      accepted: output.evidence.accepted,
      failures: output.evidence.failures,
      theta1120: summarizeEvidence(output.evidence.theta1120),
      eq20Slice: summarizeEvidence(output.evidence.eq20Slice),
      provider: summarizeEvidence(output.evidence.provider),
      pressure: summarizeEvidence(output.evidence.pressure),
      thetaCos: summarizeEvidence(output.evidence.thetaCos),
    },
    sharedKeys: {
      accepted: output.sharedKeys.accepted,
      hiddenRetuneNumericPass: output.sharedKeys.hiddenRetuneNumericPass,
      missingSharedKeys: output.sharedKeys.missingSharedKeys,
      mismatches: output.sharedKeys.mismatches,
    },
    residualComponents: output.residualComponents,
  };
}

function parseTolerances(raw) {
  return Object.fromEntries(
    Object.entries(DEFAULT_TOLERANCES).map(([key, fallback]) => [
      key,
      positiveNumber(raw[key] ?? fallback, `tolerances.${key}`),
    ]),
  );
}

function evaluateAcceptedRow(rowId, row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return { accepted: false, reason: "missing_row" };
  }
  const status = row.status ?? row.retainedStatus ?? null;
  if (!ACCEPTED_STATUSES.has(status)) {
    return { accepted: false, reason: "row_not_accepted" };
  }
  if (!concreteString(row.rowId ?? row.id)) {
    return { accepted: false, reason: "row_identity_not_concrete" };
  }
  const sourcePath = row.sourcePath ?? row.source;
  const sourceCheck = sourceReferenceCheck(sourcePath);
  if (!sourceCheck.accepted) {
    return { accepted: false, reason: sourceCheck.reason };
  }
  const sourceEvidence = evidenceStatusForRow(rowId, sourcePath);
  if (!sourceEvidence.accepted) {
    return { accepted: false, reason: `${rowId}_${sourceEvidence.reason}` };
  }
  return { accepted: true, reason: "accepted", sourceEvidence };
}

function evidenceStatusForRow(rowId, sourcePath) {
  if (rowId === "theta_11_20_weak_gravity" || rowId === "shared_coupling" || rowId === "shared_no_hidden_retune_witness") {
    return theta1120WeakGravityEvidenceStatusForPath(sourcePath, { repoRoot: REPO_ROOT });
  }
  if (rowId === "eq20_pressure_effective_lambda") {
    return evaluateEq20SliceSource(sourcePath);
  }
  if (rowId === "theta_sea_rho_NS_provider") {
    return providerEvidenceStatusForPath(sourcePath, { repoRoot: REPO_ROOT });
  }
  if (rowId === "delta_P_eff_pressure_projection") {
    return pressureProjectionEvidenceStatusForPath(sourcePath, { repoRoot: REPO_ROOT });
  }
  if (rowId === "theta_cos_handoff") {
    return effectiveFrwHandoffEvidenceStatusForPath(sourcePath, { repoRoot: REPO_ROOT });
  }
  return { accepted: false, reason: "unsupported_row_source" };
}

function evaluateEvidenceSources(evidenceSources, rowChecks) {
  const theta1120Path =
    evidenceSources.theta1120WeakGravityPath ??
    rowChecks.theta_11_20_weak_gravity?.sourceEvidence?.resolvedPath;
  const eq20Path =
    evidenceSources.eq20PressureEffectiveLambdaSlicePath ??
    rowChecks.eq20_pressure_effective_lambda?.sourceEvidence?.resolvedPath;
  const providerPath =
    evidenceSources.providerPath ?? rowChecks.theta_sea_rho_NS_provider?.sourceEvidence?.resolvedPath;
  const pressurePath =
    evidenceSources.deltaPEffReportPath ??
    rowChecks.delta_P_eff_pressure_projection?.sourceEvidence?.resolvedPath;
  const thetaCosPath =
    evidenceSources.thetaCosHandoffPath ?? rowChecks.theta_cos_handoff?.sourceEvidence?.resolvedPath;

  const theta1120 = theta1120WeakGravityEvidenceStatusForPath(theta1120Path, { repoRoot: REPO_ROOT });
  const eq20Slice = evaluateEq20SliceSource(eq20Path);
  const provider = providerEvidenceStatusForPath(providerPath, { repoRoot: REPO_ROOT });
  const pressure = pressureProjectionEvidenceStatusForPath(pressurePath, { repoRoot: REPO_ROOT });
  const thetaCos = effectiveFrwHandoffEvidenceStatusForPath(thetaCosPath, { repoRoot: REPO_ROOT });

  const failures = [];
  collectEvidenceFailure(failures, "theta1120", theta1120);
  collectEvidenceFailure(failures, "eq20Slice", eq20Slice);
  collectEvidenceFailure(failures, "provider", provider);
  collectEvidenceFailure(failures, "pressure", pressure);
  collectEvidenceFailure(failures, "thetaCos", thetaCos);

  if (
    theta1120.accepted &&
    pressure.accepted &&
    theta1120.commonCarrierId !== pressure.commonCarrierId
  ) {
    failures.push({
      id: "theta1120_pressure_common_carrier_mismatch",
      reason: "common_carrier_mismatch",
    });
  }
  if (
    theta1120.accepted &&
    thetaCos.accepted &&
    theta1120.thetaCosId !== thetaCos.thetaCosId
  ) {
    failures.push({
      id: "theta1120_theta_cos_id_mismatch",
      reason: "theta_cos_id_mismatch",
    });
  }
  if (
    eq20Slice.accepted &&
    theta1120.accepted &&
    eq20Slice.commonCarrierId !== theta1120.commonCarrierId
  ) {
    failures.push({
      id: "eq20_theta1120_common_carrier_mismatch",
      reason: "common_carrier_mismatch",
    });
  }

  return {
    accepted: failures.length === 0,
    failures,
    theta1120,
    eq20Slice,
    provider,
    pressure,
    thetaCos,
  };
}

function evaluateEq20SliceSource(value) {
  if (!concreteString(value)) {
    return { accepted: false, reason: "missing_source_path" };
  }
  const resolvedPath = path.isAbsolute(value) ? value : path.resolve(REPO_ROOT, value);
  const sourceCheck = sourceReferenceCheck(resolvedPath);
  if (!sourceCheck.accepted) {
    return { accepted: false, reason: sourceCheck.reason, resolvedPath };
  }
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
  } catch (error) {
    return {
      accepted: false,
      reason: error.code === "ENOENT" ? "source_not_found" : "source_not_parseable_json",
      resolvedPath,
    };
  }
  const missing = [];
  if (raw.schema !== "aaa-equation-map-eq20-pressure-effective-lambda-input/v1") {
    missing.push("eq20_slice_schema");
  }
  if (raw.packet?.rows?.theta_11_20?.status !== "populated") {
    missing.push("rows.theta_11_20.populated");
  }
  if (raw.packet?.frwHandoff?.status !== "accepted") {
    missing.push("frwHandoff.accepted");
  }
  if (concreteString(raw.packet?.frwHandoff?.inheritedBlocker)) {
    missing.push("frwHandoff.inheritedBlocker_absent");
  }
  if (finiteNumberOrNull(raw.packet?.noHiddenRetune?.residual) !== 0) {
    missing.push("noHiddenRetune.residual_zero");
  }
  const pressurePath =
    raw.providerBackedSlice?.deltaPEffReportPath ?? raw.packet?.frwHandoff?.deltaPEffReportPath;
  const thetaCosPath = raw.providerBackedSlice?.thetaCosHandoffPath ?? raw.packet?.frwHandoff?.sourcePath;
  const pressureEvidence = pressureProjectionEvidenceStatusForPath(pressurePath, {
    repoRoot: REPO_ROOT,
  });
  const thetaCosEvidence = effectiveFrwHandoffEvidenceStatusForPath(thetaCosPath, {
    repoRoot: REPO_ROOT,
  });
  if (!pressureEvidence.accepted) {
    missing.push(`pressure.${pressureEvidence.reason}`);
  }
  if (!thetaCosEvidence.accepted) {
    missing.push(`thetaCos.${thetaCosEvidence.reason}`);
  }
  return {
    accepted: missing.length === 0,
    reason: missing.length === 0 ? "accepted" : "eq20_slice_fields_missing",
    missingOrRejectedFields: missing,
    resolvedPath,
    commonCarrierId: raw.packet?.commonCarrierId ?? null,
    thetaCosId: raw.packet?.frwHandoff?.thetaCosId ?? null,
    pressureEvidence,
    thetaCosEvidence,
  };
}

function evaluateSharedKeys(rawKeys, tolerances) {
  const keyRows = new Map(
    (Array.isArray(rawKeys) ? rawKeys : []).map((row) => [row.key, row]),
  );
  const keys = Object.fromEntries(
    EXPECTED_SHARED_KEYS.map((key) => {
      const row = keyRows.get(key);
      const values = row?.projectionValues ?? {};
      const comparison = compareProjectionValues(values, tolerances.sharedKey);
      return [
        key,
        {
          status: normalizeStatus(row),
          accepted: ACCEPTED_STATUSES.has(row?.status ?? row?.retainedStatus),
          values,
          mismatch: comparison.mismatch,
          maxDelta: comparison.maxDelta,
        },
      ];
    }),
  );
  const missingSharedKeys = EXPECTED_SHARED_KEYS.filter((key) => !keys[key].accepted);
  const mismatches = Object.entries(keys)
    .filter(([, value]) => value.mismatch)
    .map(([key, value]) => ({ key, maxDelta: value.maxDelta }));
  return {
    accepted: missingSharedKeys.length === 0,
    hiddenRetuneNumericPass: mismatches.length === 0,
    missingSharedKeys,
    mismatches,
    keys,
  };
}

function compareProjectionValues(values, tolerance) {
  const entries = Object.values(values);
  if (entries.length < 2) {
    return { mismatch: false, maxDelta: 0 };
  }
  const first = entries[0];
  let maxDelta = 0;
  for (const value of entries.slice(1)) {
    maxDelta = Math.max(maxDelta, Math.abs(comparableResidual(value, first)));
  }
  return {
    mismatch: maxDelta > tolerance,
    maxDelta,
  };
}

function evaluateResidualComponents(raw, tolerances) {
  return {
    identity: evaluateMaxResidual(raw.identity ?? {}, tolerances.identity),
    coupling: evaluateCouplingResidual(raw.coupling ?? {}, tolerances.coupling),
    pressureLambda: evaluatePressureLambdaResidual(
      raw.pressureLambda ?? {},
      tolerances.pressureLambda,
    ),
    noHiddenRetune: evaluateMaxResidual(raw.noHiddenRetune ?? {}, tolerances.retune),
  };
}

function evaluateMaxResidual(raw, tolerance) {
  const values = Object.values(raw).map(finiteNumberOrNull).filter((value) => value !== null);
  const residual =
    values.length > 0
      ? Math.max(...values.map((value) => Math.abs(value)))
      : finiteNumberOrNull(raw.residual ?? raw.maxResidual);
  return {
    residual,
    tolerance,
    passed: residual !== null && residual <= tolerance,
  };
}

function evaluateCouplingResidual(raw, tolerance) {
  const weak = finiteNumberOrNull(raw.G_eff_weak);
  const pressure = finiteNumberOrNull(raw.G_eff_pressure);
  const frw = finiteNumberOrNull(raw.G_eff_frw);
  const values = [weak, pressure, frw].filter((value) => value !== null);
  const residual =
    values.length >= 2
      ? Math.max(...values.map((value) => Math.abs(value - values[0])))
      : finiteNumberOrNull(raw.residual);
  return {
    G_eff_weak: weak,
    G_eff_pressure: pressure,
    G_eff_frw: frw,
    residual,
    tolerance,
    passed: residual !== null && residual <= tolerance,
  };
}

function evaluatePressureLambdaResidual(raw, tolerance) {
  const pWeak = finiteNumberOrNull(raw.p_DE_eff_weak);
  const pPressure = finiteNumberOrNull(raw.p_DE_eff_pressure);
  const lambdaWeak = finiteNumberOrNull(raw.Lambda_eff_weak);
  const lambdaPressure = finiteNumberOrNull(raw.Lambda_eff_pressure);
  const residuals = [];
  if (pWeak !== null && pPressure !== null) {
    residuals.push(Math.abs(pWeak - pPressure));
  }
  if (lambdaWeak !== null && lambdaPressure !== null) {
    residuals.push(Math.abs(lambdaWeak - lambdaPressure));
  }
  const residual = residuals.length > 0 ? Math.max(...residuals) : finiteNumberOrNull(raw.residual);
  return {
    p_DE_eff_weak: pWeak,
    p_DE_eff_pressure: pPressure,
    Lambda_eff_weak: lambdaWeak,
    Lambda_eff_pressure: lambdaPressure,
    residual,
    tolerance,
    passed: residual !== null && residual <= tolerance,
  };
}

function decideStatus({ missingRows, evidence, sharedKeys, residualComponents }) {
  if (missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  if (!evidence.accepted) {
    return "blocked_source_evidence";
  }
  if (!sharedKeys.accepted) {
    return "blocked_missing_shared_keys";
  }
  if (!sharedKeys.hiddenRetuneNumericPass) {
    return "blocked_hidden_retune";
  }
  if (!residualComponents.identity.passed) {
    return "blocked_identity_residual";
  }
  if (!residualComponents.coupling.passed) {
    return "blocked_coupling_residual";
  }
  if (!residualComponents.pressureLambda.passed) {
    return "blocked_pressure_lambda_residual";
  }
  if (!residualComponents.noHiddenRetune.passed) {
    return "blocked_hidden_retune";
  }
  return "populated";
}

function firstBlocker({ status, missingRows, evidence, sharedKeys, residualComponents }) {
  if (status === "populated") {
    return null;
  }
  if (missingRows.length > 0) {
    return `missing_accepted_${missingRows[0]}`;
  }
  if (!evidence.accepted) {
    return evidence.failures[0]?.id ?? "source_evidence";
  }
  if (!sharedKeys.accepted) {
    return `missing_accepted_shared_key_${sharedKeys.missingSharedKeys[0]}`;
  }
  if (!sharedKeys.hiddenRetuneNumericPass) {
    return `hidden_retune_${sharedKeys.mismatches[0]?.key ?? "shared_key"}`;
  }
  if (!residualComponents.identity.passed) {
    return "identity_residual";
  }
  if (!residualComponents.coupling.passed) {
    return "coupling_residual";
  }
  if (!residualComponents.pressureLambda.passed) {
    return "pressure_lambda_residual";
  }
  if (!residualComponents.noHiddenRetune.passed) {
    return "hidden_retune";
  }
  return status;
}

function collectEvidenceFailure(failures, id, evidence) {
  if (!evidence.accepted) {
    failures.push({
      id,
      reason: evidence.reason,
      missingOrRejectedFields: evidence.missingOrRejectedFields ?? [],
    });
  }
}

function summarizeEvidence(evidence) {
  return {
    accepted: evidence.accepted,
    reason: evidence.reason,
    missingOrRejectedFields: evidence.missingOrRejectedFields ?? [],
    commonCarrierId: evidence.commonCarrierId ?? null,
    thetaCosId: evidence.thetaCosId ?? null,
  };
}

function sourceReferenceCheck(value) {
  if (!concreteString(value)) {
    return { accepted: false, reason: "missing_source_path" };
  }
  const sourcePath = value.trim().replace(/#.*/, "");
  const resolved = path.isAbsolute(sourcePath) ? sourcePath : path.resolve(REPO_ROOT, sourcePath);
  const rejectionReason = sourceReferenceRejectionReason(resolved);
  if (rejectionReason) {
    return { accepted: false, reason: rejectionReason };
  }
  try {
    if (!fs.statSync(resolved).isFile()) {
      return { accepted: false, reason: "source_not_file" };
    }
  } catch {
    return { accepted: false, reason: "source_not_found" };
  }
  return { accepted: true, reason: "accepted" };
}

function sourceReferenceRejectionReason(filePath) {
  const normalized = path.normalize(filePath);
  const tempRoot = path.normalize("/tmp");
  const privateTempRoot = path.normalize("/private/tmp");
  if (
    normalized.startsWith(`${tempRoot}${path.sep}`) ||
    normalized.startsWith(`${privateTempRoot}${path.sep}`)
  ) {
    return "temp_source_path";
  }
  const relative = path.relative(REPO_ROOT, normalized);
  if (relative === "" || relative.startsWith("..") || path.isAbsolute(relative)) {
    return "source_outside_repo";
  }
  if (relative.startsWith(`reference${path.sep}priorities${path.sep}`)) {
    return "coordination_source_path";
  }
  if (relative.startsWith(`content${path.sep}markdown${path.sep}aaa${path.sep}`)) {
    return "authored_prose_source_path";
  }
  if (relative.startsWith(`content${path.sep}generated${path.sep}`)) {
    return "generated_source_path";
  }
  const basename = path.basename(normalized).toLowerCase();
  if (
    basename.includes("attempt") ||
    basename.includes("mock") ||
    basename.includes("toy") ||
    basename.includes("probe") ||
    basename.includes("negative-control") ||
    basename.includes("source-contract") ||
    basename.includes("contract") ||
    basename.includes(".tmp")
  ) {
    return "control_or_attempt_source_path";
  }
  return null;
}

function normalizeStatus(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return "missing";
  }
  return row.status ?? row.retainedStatus ?? "declared";
}

function positiveNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`${label} must be a positive finite number.`);
  }
  return number;
}

function finiteNumberOrNull(value) {
  if (value === undefined || value === null) {
    return null;
  }
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function comparableResidual(value, expected) {
  if (typeof value === "number" && typeof expected === "number") {
    return value - expected;
  }
  return JSON.stringify(value) === JSON.stringify(expected) ? 0 : Infinity;
}

function concreteString(value) {
  const text = typeof value === "string" ? value.trim() : "";
  const lowerText = text.toLowerCase();
  return (
    text !== "" &&
    text !== "..." &&
    !text.includes("<") &&
    !lowerText.includes("todo") &&
    !lowerText.includes("pending") &&
    !lowerText.includes("placeholder")
  );
}
