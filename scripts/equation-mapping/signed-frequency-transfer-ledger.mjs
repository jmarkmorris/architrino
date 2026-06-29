#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const INPUT_SCHEMA = "aaa-equation-map-signed-frequency-transfer-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-signed-frequency-transfer-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";

const REQUIRED_ROWS = [
  "theta_transfer",
  "endpoint_cadence_emitter",
  "endpoint_cadence_receiver",
  "source_branch_factor",
  "launch_geometry_factor",
  "path_history_propagation",
  "photon_channel_record",
  "event_ledger",
  "energy_exchange_segments",
  "path_quality_constraints",
  "no_hidden_retune_witness",
];

const REQUIRED_SHARED_KEYS = [
  "Gamma_N_E",
  "Gamma_N_R",
  "B_X_E",
  "D_v",
  "Y_X_E_to_R",
  "chi_gamma",
  "chi_sea",
  "event_id",
  "source_branch_id",
  "receiver_branch_id",
];

const DEFAULT_TOLERANCES = {
  frequency: 1e-12,
  segmentEnergy: 1e-12,
  pathQuality: 1e-6,
  retune: 1e-12,
  sharedKey: 1e-12,
  epsilon: 1e-12,
};

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}
if (!args.input) {
  throw new Error("Missing required --input PATH argument.");
}

const input = readJson(path.resolve(args.input));
const output = evaluateSignedFrequencyTransfer(input, path.resolve(args.input));
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
  console.log(`Usage: node scripts/equation-mapping/signed-frequency-transfer-ledger.mjs --input PATH [options]

Options:
  --input PATH          Signed frequency-transfer input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the residual is populated.
  --help                Show this help.

This checker evaluates the score-neutral EQ-17 signed source-path-receiver
frequency-transfer ledger. Attempt rows, collapsed redshift factors, hidden
retuning, and non-durable sources never raise scores.`);
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

function evaluateSignedFrequencyTransfer(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const transfer = input.transfer ?? {};
  const rows = transfer.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedRow(rows[rowId])]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const factors = evaluateFactors(transfer.factors ?? {});
  const frequency = evaluateFrequencyResidual(transfer.frequency ?? {}, factors, tolerances);
  const segments = evaluateSegments(transfer.energyExchangeSegments ?? [], tolerances);
  const pathQuality = evaluatePathQuality(transfer.pathQuality ?? {}, tolerances);
  const sharedKeys = evaluateSharedKeys(transfer.sharedKeys ?? [], tolerances);
  const noHiddenRetune = evaluateScalarResidual(
    transfer.noHiddenRetune?.residual ?? transfer.noHiddenRetune?.maxResidual,
    tolerances.retune,
    "no_hidden_retune",
  );
  const status = decideStatus({
    missingRows,
    factors,
    frequency,
    segments,
    pathQuality,
    sharedKeys,
    noHiddenRetune,
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
      id: input.residualId ?? transfer.id ?? null,
      row: "EQ-17",
      supportedRows: ["EQ-12", "EQ-17", "EQ-22", "EQ-26", "EQ-28", "EQ-29"],
      claimLevel:
        "score-neutral signed frequency-transfer ledger; accepted retained rows are required before score movement",
    },
    tolerances,
    summary: {
      status,
      scoreDecision: status === "populated" ? "score_review_required" : SCORE_DECISION,
      missingRows,
      nextBlocker: firstBlocker({
        status,
        missingRows,
        factors,
        frequency,
        segments,
        pathQuality,
        sharedKeys,
        noHiddenRetune,
      }),
      transferFactorsComputed: factors.computed,
      signedBudgetZ: factors.Z,
      frequencyResidual: frequency.normalizedResidual,
      frequencyPass: frequency.passed,
      segmentCount: segments.rows.length,
      segmentEnergyPass: segments.passed,
      maxSegmentEnergyResidual: segments.maxNormalizedResidual,
      pathQualityPass: pathQuality.passed,
      sharedKeysAccepted: sharedKeys.accepted,
      hiddenRetunePass: noHiddenRetune.passed,
    },
    rows: Object.fromEntries(
      REQUIRED_ROWS.map((rowId) => [
        rowId,
        {
          status: normalizeStatus(rows[rowId]),
          accepted: rowChecks[rowId].accepted,
          reason: rowChecks[rowId].reason,
          rowId: rows[rowId]?.rowId ?? rows[rowId]?.id ?? null,
          sourcePath: rows[rowId]?.sourcePath ?? rows[rowId]?.source ?? null,
        },
      ]),
    ),
    factors,
    frequency,
    segments,
    pathQuality,
    sharedKeys,
    noHiddenRetune,
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
  };
}

function evaluateFactors(raw) {
  const gammaEmitter = positiveNumberOrNull(raw.Gamma_N_E ?? raw.gammaEmitter);
  const gammaReceiver = positiveNumberOrNull(raw.Gamma_N_R ?? raw.gammaReceiver);
  const sourceBranch = positiveNumberOrNull(raw.B_X_E ?? raw.sourceBranchFactor);
  const launchGeometry = positiveNumberOrNull(raw.D_v ?? raw.launchGeometryFactor);
  const pathHistory = finiteNumberOrNull(raw.Y_X_E_to_R ?? raw.pathHistoryLog);
  const computed =
    gammaEmitter !== null &&
    gammaReceiver !== null &&
    sourceBranch !== null &&
    launchGeometry !== null &&
    pathHistory !== null;
  const Z = computed
    ? Math.log(gammaEmitter) -
      Math.log(gammaReceiver) +
      pathHistory -
      Math.log(sourceBranch) -
      Math.log(launchGeometry)
    : null;
  return {
    computed,
    Gamma_N_E: gammaEmitter,
    Gamma_N_R: gammaReceiver,
    B_X_E: sourceBranch,
    D_v: launchGeometry,
    Y_X_E_to_R: pathHistory,
    Z,
  };
}

function evaluateFrequencyResidual(raw, factors, tolerances) {
  const nuEmitter = positiveNumberOrNull(raw.nu_E ?? raw.emitterFrequency);
  const nuReceiver = positiveNumberOrNull(raw.nu_R ?? raw.receiverFrequency);
  const computed = factors.computed && nuEmitter !== null && nuReceiver !== null;
  const predictedReceiverFrequency =
    computed && factors.Z !== null ? nuEmitter * Math.exp(-factors.Z) : null;
  const residual =
    predictedReceiverFrequency !== null && nuReceiver !== null
      ? nuReceiver - predictedReceiverFrequency
      : null;
  const denominator =
    predictedReceiverFrequency !== null && nuReceiver !== null
      ? Math.abs(nuReceiver) + Math.abs(predictedReceiverFrequency) + tolerances.epsilon
      : null;
  const normalizedResidual =
    residual !== null && denominator !== null ? Math.abs(residual) / denominator : null;
  return {
    computed,
    nu_E: nuEmitter,
    nu_R: nuReceiver,
    predictedReceiverFrequency,
    residual,
    normalizedResidual,
    tolerance: tolerances.frequency,
    passed: normalizedResidual !== null && normalizedResidual <= tolerances.frequency,
  };
}

function evaluateSegments(rawSegments, tolerances) {
  const rows = Array.isArray(rawSegments)
    ? rawSegments.map((segment, index) => evaluateSegment(segment, index, tolerances))
    : [];
  const computed = rows.length > 0 && rows.every((row) => row.computed);
  const maxNormalizedResidual =
    rows.length > 0
      ? Math.max(...rows.map((row) => row.normalizedResidual ?? Number.POSITIVE_INFINITY))
      : null;
  return {
    computed,
    passed: computed && rows.every((row) => row.passed),
    maxNormalizedResidual,
    rows,
  };
}

function evaluateSegment(segment, index, tolerances) {
  const h = positiveNumberOrNull(segment.h ?? 1);
  const nuPlus = finiteNumberOrNull(segment.nu_plus ?? segment.nuPlus);
  const nuMinus = finiteNumberOrNull(segment.nu_minus ?? segment.nuMinus);
  const deltaEMed = finiteNumberOrNull(segment.deltaE_med ?? segment.deltaEMed) ?? 0;
  const deltaERecoil =
    finiteNumberOrNull(segment.deltaE_recoil ?? segment.deltaERecoil) ?? 0;
  const deltaERem = finiteNumberOrNull(segment.deltaE_rem ?? segment.deltaERem) ?? 0;
  const computed = h !== null && nuPlus !== null && nuMinus !== null;
  const residual = computed
    ? h * (nuPlus - nuMinus) + deltaEMed + deltaERecoil + deltaERem
    : null;
  const denominator = computed
    ? Math.abs(h * (nuPlus - nuMinus)) +
      Math.abs(deltaEMed) +
      Math.abs(deltaERecoil) +
      Math.abs(deltaERem) +
      tolerances.epsilon
    : null;
  const normalizedResidual =
    residual !== null && denominator !== null ? Math.abs(residual) / denominator : null;
  return {
    id: segment.id ?? `segment_${index}`,
    computed,
    h,
    nuPlus,
    nuMinus,
    deltaEMed,
    deltaERecoil,
    deltaERem,
    residual,
    denominator,
    normalizedResidual,
    tolerance: tolerances.segmentEnergy,
    passed:
      normalizedResidual !== null &&
      normalizedResidual <= tolerances.segmentEnergy,
  };
}

function evaluatePathQuality(raw, tolerances) {
  const checks = [
    pathQualityCheck("image_sharpness", raw.imageSharpnessVariance, tolerances.pathQuality),
    pathQualityCheck("chromaticity", raw.chromaticityResidual, tolerances.pathQuality),
    pathQualityCheck("spectral_coherence", raw.spectralCoherenceResidual, tolerances.pathQuality),
    pathQualityCheck("time_dilation", raw.timeDilationResidual, tolerances.pathQuality),
  ];
  return {
    computed: checks.every((check) => check.computed),
    passed: checks.every((check) => check.passed),
    checks,
  };
}

function pathQualityCheck(id, value, tolerance) {
  const parsed = finiteNumberOrNull(value);
  return {
    id,
    value: parsed,
    tolerance,
    computed: parsed !== null,
    passed: parsed !== null && parsed <= tolerance,
  };
}

function evaluateSharedKeys(rawKeys, tolerances) {
  const rowByKey = new Map(
    (Array.isArray(rawKeys) ? rawKeys : []).map((row) => [row.key, row]),
  );
  const keys = Object.fromEntries(
    REQUIRED_SHARED_KEYS.map((key) => {
      const row = rowByKey.get(key);
      const check = evaluateAcceptedRow(row);
      const comparison = compareProjectionValues(row?.projectionValues ?? {}, tolerances);
      return [
        key,
        {
          status: normalizeStatus(row),
          accepted: check.accepted,
          reason: check.reason,
          sourcePath: row?.sourcePath ?? row?.source ?? null,
          values: row?.projectionValues ?? {},
          mismatch: comparison.mismatch,
          maxDelta: comparison.maxDelta,
          pass: comparison.pass,
        },
      ];
    }),
  );
  const missingSharedKeys = REQUIRED_SHARED_KEYS.filter((key) => !keys[key].accepted);
  const mismatches = Object.entries(keys)
    .filter(([, value]) => value.mismatch)
    .map(([key, value]) => ({ key, maxDelta: value.maxDelta }));
  return {
    accepted: missingSharedKeys.length === 0,
    allExpectedKeysDeclared: REQUIRED_SHARED_KEYS.every((key) => rowByKey.has(key)),
    missingSharedKeys,
    expectedKeys: REQUIRED_SHARED_KEYS,
    hiddenRetuneNumericPass: mismatches.length === 0,
    mismatches,
    keys,
  };
}

function compareProjectionValues(projectionValues, tolerances) {
  const values = Object.values(projectionValues)
    .map((value) => finiteNumberOrNull(value))
    .filter((value) => value !== null);
  if (values.length < 2) {
    return { mismatch: false, maxDelta: 0, pass: true };
  }
  let maxDelta = 0;
  for (let index = 0; index < values.length; index += 1) {
    for (let other = index + 1; other < values.length; other += 1) {
      maxDelta = Math.max(maxDelta, Math.abs(values[index] - values[other]));
    }
  }
  return {
    mismatch: maxDelta > tolerances.sharedKey,
    maxDelta,
    pass: maxDelta <= tolerances.sharedKey,
  };
}

function evaluateScalarResidual(value, tolerance, label) {
  const parsed = finiteNumberOrNull(value);
  return {
    label,
    value: parsed,
    tolerance,
    computed: parsed !== null,
    passed: parsed !== null && Math.abs(parsed) <= tolerance,
  };
}

function decideStatus({
  missingRows,
  factors,
  frequency,
  segments,
  pathQuality,
  sharedKeys,
  noHiddenRetune,
}) {
  if (missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  if (!sharedKeys.accepted) {
    return "blocked_missing_shared_keys";
  }
  if (!sharedKeys.hiddenRetuneNumericPass) {
    return "blocked_hidden_retune";
  }
  if (!factors.computed) {
    return "blocked_missing_signed_transfer_factors";
  }
  if (!frequency.computed) {
    return "blocked_missing_frequency_rows";
  }
  if (!frequency.passed) {
    return "blocked_frequency_residual_above_tolerance";
  }
  if (!segments.computed) {
    return "blocked_missing_segment_energy_rows";
  }
  if (!segments.passed) {
    return "blocked_segment_energy_residual";
  }
  if (!pathQuality.computed) {
    return "blocked_missing_path_quality_rows";
  }
  if (!pathQuality.passed) {
    return "blocked_path_quality_failure";
  }
  if (!noHiddenRetune.computed) {
    return "blocked_missing_no_hidden_retune_witness";
  }
  if (!noHiddenRetune.passed) {
    return "blocked_hidden_retune";
  }
  return "populated";
}

function firstBlocker({
  status,
  missingRows,
  factors,
  frequency,
  segments,
  pathQuality,
  sharedKeys,
  noHiddenRetune,
}) {
  if (status === "populated") {
    return null;
  }
  if (missingRows.length > 0) {
    return `missing_accepted_${missingRows[0]}`;
  }
  if (!sharedKeys.accepted) {
    return `missing_accepted_shared_key_${sharedKeys.missingSharedKeys[0]}`;
  }
  if (!sharedKeys.hiddenRetuneNumericPass) {
    return `hidden_retune_${sharedKeys.mismatches[0]?.key ?? "shared_key"}`;
  }
  if (!factors.computed) {
    return "missing_signed_transfer_factors";
  }
  if (!frequency.computed) {
    return "missing_frequency_rows";
  }
  if (!frequency.passed) {
    return "frequency_residual_above_tolerance";
  }
  if (!segments.computed) {
    return "missing_segment_energy_rows";
  }
  if (!segments.passed) {
    return "segment_energy_residual";
  }
  if (!pathQuality.computed) {
    return "missing_path_quality_rows";
  }
  if (!pathQuality.passed) {
    return "path_quality_failure";
  }
  if (!noHiddenRetune.computed) {
    return "missing_no_hidden_retune_witness";
  }
  if (!noHiddenRetune.passed) {
    return "hidden_retune";
  }
  return status;
}

function parseTolerances(raw) {
  return {
    frequency: positiveNumber(
      raw.frequency ?? DEFAULT_TOLERANCES.frequency,
      "tolerances.frequency",
    ),
    segmentEnergy: positiveNumber(
      raw.segmentEnergy ?? DEFAULT_TOLERANCES.segmentEnergy,
      "tolerances.segmentEnergy",
    ),
    pathQuality: positiveNumber(
      raw.pathQuality ?? DEFAULT_TOLERANCES.pathQuality,
      "tolerances.pathQuality",
    ),
    retune: positiveNumber(raw.retune ?? DEFAULT_TOLERANCES.retune, "tolerances.retune"),
    sharedKey: positiveNumber(
      raw.sharedKey ?? DEFAULT_TOLERANCES.sharedKey,
      "tolerances.sharedKey",
    ),
    epsilon: positiveNumber(
      raw.epsilon ?? DEFAULT_TOLERANCES.epsilon,
      "tolerances.epsilon",
    ),
  };
}

function evaluateAcceptedRow(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return { accepted: false, reason: "missing_row" };
  }
  const status = row.status ?? row.retainedStatus ?? null;
  if (!ACCEPTED_STATUSES.has(status)) {
    return { accepted: false, reason: "row_not_accepted" };
  }
  if (!concreteString(row.rowId ?? row.id ?? row.key)) {
    return { accepted: false, reason: "row_identity_not_concrete" };
  }
  if (!sourceReferenceExists(row.sourcePath) && !sourceReferenceExists(row.source)) {
    return { accepted: false, reason: "row_source_not_found" };
  }
  return { accepted: true, reason: "accepted" };
}

function normalizeStatus(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return "missing";
  }
  return row.status ?? row.retainedStatus ?? "declared";
}

function finiteNumberOrNull(value) {
  if (value === undefined || value === null) {
    return null;
  }
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function positiveNumberOrNull(value) {
  const number = finiteNumberOrNull(value);
  return number !== null && number > 0 ? number : null;
}

function positiveNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`${label} must be a positive finite number.`);
  }
  return number;
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

function sourceReferenceExists(value) {
  if (!concreteString(value)) {
    return false;
  }
  const sourcePath = value.trim().replace(/#.*/, "");
  const resolvedPath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(REPO_ROOT, sourcePath);
  if (isNonDurableSourcePath(resolvedPath)) {
    return false;
  }
  try {
    return fs.statSync(resolvedPath).isFile();
  } catch {
    return false;
  }
}

function isNonDurableSourcePath(filePath) {
  const normalized = path.normalize(filePath);
  const relative = path.relative(REPO_ROOT, normalized);
  const basename = path.basename(normalized).toLowerCase();
  return (
    relative === "" ||
    relative.startsWith("..") ||
    path.isAbsolute(relative) ||
    normalized.startsWith(`${path.normalize("/tmp")}${path.sep}`) ||
    normalized.startsWith(`${path.normalize("/private/tmp")}${path.sep}`) ||
    relative.startsWith(`reference${path.sep}priorities${path.sep}`) ||
    relative.startsWith(`content${path.sep}markdown${path.sep}aaa${path.sep}`) ||
    relative.startsWith(`content${path.sep}generated${path.sep}`) ||
    basename.includes("attempt") ||
    basename.includes("mock") ||
    basename.includes("toy") ||
    basename.includes("probe") ||
    basename.includes("negative-control") ||
    basename.includes(".tmp")
  );
}
