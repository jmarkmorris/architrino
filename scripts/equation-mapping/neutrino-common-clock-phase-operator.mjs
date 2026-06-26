#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const INPUT_SCHEMA = "aaa-equation-map-neutrino-common-clock-phase-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-neutrino-common-clock-phase-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";

const REQUIRED_ROWS = [
  "neutral_lepton_retained_branch",
  "s_eq",
  "common_clock",
  "residual_operator",
  "phase_gaps",
  "spectrum_shape",
  "pmns_readout",
  "weak_domain",
  "matter_correction",
  "cancellation",
  "event_ledger",
];

const WEAK_DOMAIN_ID_ROWS = [
  "pmns_readout",
  "weak_domain",
  "matter_correction",
  "event_ledger",
];

const DEFAULT_TOLERANCES = {
  clock: 1e-12,
  trace: 1e-12,
  additivity: 1e-12,
  ratio: 1e-3,
  cancellation: 1e-6,
  residualNorm: 1e-12,
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
const output = evaluateNeutrinoPhaseOperator(input, path.resolve(args.input));
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
  console.log(`Usage: node scripts/equation-mapping/neutrino-common-clock-phase-operator.mjs --input PATH [options]

Options:
  --input PATH          Neutrino common-clock phase input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the operator packet is populated.
  --help                Show this help.

This checker evaluates the score-neutral EQ-16A common-clock plus residual
phase-operator packet. It protects the f:f:f common-clock reading from being
treated as three observed absolute clocks. Attempt rows, toy rows, and
non-durable sources never raise scores.`);
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

function evaluateNeutrinoPhaseOperator(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const rows = input.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedRow(rows[rowId])]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const commonClock = evaluateCommonClock(rows.common_clock, tolerances);
  const residualOperator = evaluateResidualOperator(rows.residual_operator, tolerances);
  const phaseGaps = evaluatePhaseGaps(rows.phase_gaps, tolerances);
  const spectrumShape = evaluateSpectrumShape(rows.spectrum_shape, phaseGaps, tolerances);
  const cancellation = evaluateCancellation(
    rows.cancellation,
    residualOperator,
    tolerances,
  );
  const weakDomain = evaluateWeakDomain(rows.weak_domain);
  const weakDomainIdentity = evaluateWeakDomainIdentity(rows);
  const matterCorrection = evaluateMatterCorrection(rows.matter_correction);
  const status = decideStatus({
    missingRows,
    commonClock,
    residualOperator,
    phaseGaps,
    spectrumShape,
    cancellation,
    weakDomain,
    weakDomainIdentity,
    matterCorrection,
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
    operator: {
      id: input.operatorId ?? null,
      row: "EQ-16A",
      supportedRows: ["EQ-16A"],
      claimLevel:
        "score-neutral neutrino common-clock residual-phase operator; accepted retained rows are required before score movement",
    },
    tolerances,
    summary: {
      status,
      scoreDecision:
        status === "populated" ? "score_review_required" : SCORE_DECISION,
      missingRows,
      nextBlocker: firstBlocker({
        status,
        missingRows,
        commonClock,
        residualOperator,
        phaseGaps,
        spectrumShape,
        cancellation,
        weakDomain,
        weakDomainIdentity,
        matterCorrection,
      }),
      inheritedSEqBlocker: rows.s_eq?.nextBlocker ?? null,
      commonClockEqualPass: commonClock.equalPass,
      commonClockFactorsOut: commonClock.factorsOut,
      residualTracePass: residualOperator.tracePass,
      residualNonzeroPass: residualOperator.nonzeroPass,
      phaseGapAdditivityPass: phaseGaps.additivityPass,
      phaseRateOriginPass: phaseGaps.phaseRateOriginPass,
      ratio: phaseGaps.ratio,
      ratioPass: phaseGaps.ratioPass,
      spectrumShapePass: spectrumShape.passed,
      cancellationPass: cancellation.passed,
      residualSurvivalPass: cancellation.residualSurvivalPass,
      weakDomainIdentityPass: weakDomainIdentity.passed,
      sharedWeakDomainId: weakDomainIdentity.sharedDomainId,
      weakDomainSplitCount: weakDomainIdentity.uniqueDomainIds.length,
      pmnsReadoutDomainPass: weakDomain.pmnsReadoutDomainPass,
      matterCorrectionDomainPass: matterCorrection.domainPass,
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
    diagnostics: {
      commonClock,
      residualOperator,
      phaseGaps,
      spectrumShape,
      cancellation,
      weakDomain,
      weakDomainIdentity,
      matterCorrection,
    },
  };
}

function summarizeOutput(output) {
  return {
    schema: output.schema,
    generatedAt: output.generatedAt,
    input: output.input,
    operator: output.operator,
    summary: output.summary,
    rows: output.rows,
  };
}

function evaluateCommonClock(row, tolerances) {
  const frequencies = row?.frequencies ?? {};
  const values = ["I", "M", "O"].map((role) => finiteNumberOrNull(frequencies[role]));
  const allFinite = values.every((value) => value !== null);
  const maxDelta = allFinite
    ? Math.max(
        Math.abs(values[0] - values[1]),
        Math.abs(values[0] - values[2]),
        Math.abs(values[1] - values[2]),
      )
    : null;
  return {
    frequencies: { I: values[0], M: values[1], O: values[2] },
    maxDelta,
    tolerance: tolerances.clock,
    equalPass: maxDelta !== null && maxDelta <= tolerances.clock,
    factorsOut: row?.identityTermFactorsOut === true,
    roleMapStatus: row?.roleMapStatus ?? null,
  };
}

function evaluateResidualOperator(row, tolerances) {
  const eigenvalues = Array.isArray(row?.tracelessEigenvalues)
    ? row.tracelessEigenvalues.map((value) => finiteNumberOrNull(value))
    : [];
  const allFinite = eigenvalues.length === 3 && eigenvalues.every((value) => value !== null);
  const trace = allFinite
    ? eigenvalues.reduce((sum, value) => sum + value, 0)
    : null;
  const norm = allFinite
    ? Math.sqrt(eigenvalues.reduce((sum, value) => sum + value * value, 0))
    : null;
  return {
    eigenvalues: allFinite ? eigenvalues : null,
    trace,
    norm,
    tracePass: trace !== null && Math.abs(trace) <= tolerances.trace,
    nonzeroPass: norm !== null && norm > tolerances.residualNorm,
    identityShiftInvariant: row?.identityShiftInvariant === true,
  };
}

function evaluatePhaseGaps(row, tolerances) {
  const delta21 = finiteNumberOrNull(row?.delta21);
  const delta32 = finiteNumberOrNull(row?.delta32);
  const delta31 = finiteNumberOrNull(row?.delta31);
  const targetRatio = finiteNumberOrNull(row?.targetRatio ?? row?.r_atm_sol);
  const additivityResidual =
    delta21 === null || delta32 === null || delta31 === null
      ? null
      : Math.abs(delta31 - delta32 - delta21);
  const ratio = delta21 !== null && delta32 !== null && delta21 !== 0
    ? Math.abs(delta32 / delta21)
    : null;
  const ratioResidual =
    ratio === null || targetRatio === null
      ? null
      : Math.abs((ratio - targetRatio) / targetRatio);
  return {
    delta21,
    delta32,
    delta31,
    targetRatio,
    ratio,
    additivityResidual,
    additivityPass:
      additivityResidual !== null && additivityResidual <= tolerances.additivity,
    ratioResidual,
    ratioPass: ratioResidual !== null && ratioResidual <= tolerances.ratio,
    phaseRateOriginPass: row?.phaseRateOrigin === "residual_phase_rate",
    staticPhaseSubstitutionRejected: row?.staticPhaseSubstitutionRejected === true,
  };
}

function evaluateSpectrumShape(row, phaseGaps, tolerances) {
  const target = Array.isArray(row?.normalizedTracelessTarget)
    ? row.normalizedTracelessTarget.map((value) => finiteNumberOrNull(value))
    : [];
  const actual = Array.isArray(row?.normalizedTracelessActual)
    ? row.normalizedTracelessActual.map((value) => finiteNumberOrNull(value))
    : [];
  const targetFinite = target.length === 3 && target.every((value) => value !== null);
  const actualFinite = actual.length === 3 && actual.every((value) => value !== null);
  const maxResidual =
    targetFinite && actualFinite
      ? Math.max(...target.map((value, index) => Math.abs(value - actual[index])))
      : null;
  return {
    ordering: row?.ordering ?? null,
    expectedShape: row?.expectedShape ?? null,
    equalSpacingRejected: row?.equalSpacingRejected === true,
    target: targetFinite ? target : null,
    actual: actualFinite ? actual : null,
    maxResidual,
    phaseGapRatio: phaseGaps.ratio,
    passed:
      maxResidual !== null &&
      maxResidual <= tolerances.ratio &&
      row?.expectedShape === "doublet_plus_singlet" &&
      row?.equalSpacingRejected === true,
  };
}

function evaluateCancellation(row, residualOperator, tolerances) {
  const residual = finiteNumberOrNull(row?.R_nu_cancel ?? row?.residual);
  return {
    residual,
    tolerance: tolerances.cancellation,
    passed: residual !== null && residual <= tolerances.cancellation,
    residualSurvivalPass: residualOperator.nonzeroPass && row?.residualOperatorErased !== true,
  };
}

function evaluateWeakDomain(row) {
  return {
    pmnsReadoutDomainPass: row?.pmnsReadoutFromWeakDomain === true,
    importedMatrixRejected: row?.importedMatrixRejected === true,
    sameWeakDomainForVA: row?.sameWeakDomainForVA === true,
  };
}

function evaluateWeakDomainIdentity(rows) {
  const rowDomainIds = Object.fromEntries(
    WEAK_DOMAIN_ID_ROWS.map((rowId) => [rowId, domainIdForRow(rows[rowId])]),
  );
  const missingDomainRows = WEAK_DOMAIN_ID_ROWS.filter((rowId) => !rowDomainIds[rowId]);
  const uniqueDomainIds = uniqueStrings(Object.values(rowDomainIds).filter(Boolean));
  const passed = missingDomainRows.length === 0 && uniqueDomainIds.length === 1;
  return {
    requiredRows: WEAK_DOMAIN_ID_ROWS,
    rowDomainIds,
    uniqueDomainIds,
    missingDomainRows,
    sharedDomainId: passed ? uniqueDomainIds[0] : null,
    passed,
  };
}

function domainIdForRow(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return null;
  }
  return (
    stringOrNull(row.domainId) ??
    stringOrNull(row.retainedDomainId) ??
    stringOrNull(row.eventId) ??
    stringOrNull(row.carrierId) ??
    null
  );
}

function evaluateMatterCorrection(row) {
  return {
    domainPass: row?.sameWeakDomain === true && row?.sameUnitsAsVacuumResidual === true,
    sameWeakDomain: row?.sameWeakDomain === true,
    sameUnitsAsVacuumResidual: row?.sameUnitsAsVacuumResidual === true,
  };
}

function decideStatus({
  missingRows,
  commonClock,
  residualOperator,
  phaseGaps,
  spectrumShape,
  cancellation,
  weakDomain,
  weakDomainIdentity,
  matterCorrection,
}) {
  if (missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  if (!commonClock.equalPass || !commonClock.factorsOut) {
    return "blocked_common_clock_not_factored";
  }
  if (!residualOperator.tracePass || !residualOperator.nonzeroPass) {
    return "blocked_residual_operator";
  }
  if (!phaseGaps.additivityPass || !phaseGaps.ratioPass || !phaseGaps.phaseRateOriginPass) {
    return "blocked_phase_gap_shape";
  }
  if (!spectrumShape.passed) {
    return "blocked_spectrum_shape";
  }
  if (!cancellation.passed || !cancellation.residualSurvivalPass) {
    return "blocked_cancellation_without_residual_survival";
  }
  if (!weakDomainIdentity.passed) {
    return "blocked_hidden_domain_split";
  }
  if (!weakDomain.pmnsReadoutDomainPass) {
    return "blocked_pmns_readout_domain";
  }
  if (!matterCorrection.domainPass) {
    return "blocked_matter_correction_domain";
  }
  return "populated";
}

function firstBlocker({
  status,
  missingRows,
  commonClock,
  residualOperator,
  phaseGaps,
  spectrumShape,
  cancellation,
  weakDomain,
  weakDomainIdentity,
  matterCorrection,
}) {
  if (status === "populated") {
    return null;
  }
  if (missingRows.length > 0) {
    return `missing_accepted_${missingRows[0]}`;
  }
  if (!commonClock.equalPass || !commonClock.factorsOut) {
    return "common_clock_not_factored";
  }
  if (!residualOperator.tracePass) {
    return "residual_operator_not_traceless";
  }
  if (!residualOperator.nonzeroPass) {
    return "residual_operator_erased";
  }
  if (!phaseGaps.additivityPass) {
    return "phase_gap_additivity";
  }
  if (!phaseGaps.ratioPass) {
    return "phase_gap_ratio";
  }
  if (!phaseGaps.phaseRateOriginPass) {
    return "phase_rate_origin_not_residual";
  }
  if (!spectrumShape.passed) {
    return "spectrum_shape";
  }
  if (!cancellation.passed) {
    return "cancellation_residual";
  }
  if (!cancellation.residualSurvivalPass) {
    return "residual_operator_erased_by_cancellation";
  }
  if (!weakDomainIdentity.passed) {
    if (weakDomainIdentity.missingDomainRows.length > 0) {
      return `missing_domain_id_${weakDomainIdentity.missingDomainRows[0]}`;
    }
    return "weak_hidden_domain_split";
  }
  if (!weakDomain.pmnsReadoutDomainPass) {
    return "pmns_readout_domain";
  }
  if (!matterCorrection.domainPass) {
    return "matter_correction_domain";
  }
  return status;
}

function parseTolerances(raw) {
  return {
    clock: positiveNumber(raw.clock ?? DEFAULT_TOLERANCES.clock, "tolerances.clock"),
    trace: positiveNumber(raw.trace ?? DEFAULT_TOLERANCES.trace, "tolerances.trace"),
    additivity: positiveNumber(
      raw.additivity ?? DEFAULT_TOLERANCES.additivity,
      "tolerances.additivity",
    ),
    ratio: positiveNumber(raw.ratio ?? DEFAULT_TOLERANCES.ratio, "tolerances.ratio"),
    cancellation: positiveNumber(
      raw.cancellation ?? DEFAULT_TOLERANCES.cancellation,
      "tolerances.cancellation",
    ),
    residualNorm: positiveNumber(
      raw.residualNorm ?? DEFAULT_TOLERANCES.residualNorm,
      "tolerances.residualNorm",
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
  if (!concreteString(row.rowId ?? row.id)) {
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

function stringOrNull(value) {
  const text = typeof value === "string" ? value.trim() : "";
  return text === "" ? null : text;
}

function uniqueStrings(values) {
  return [...new Set(values.map((value) => String(value)))];
}

function sourceReferenceExists(value) {
  if (!concreteString(value)) {
    return false;
  }
  const resolvedPath = path.resolve(value.trim());
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
  return (
    normalized.startsWith(`${path.normalize("/tmp")}${path.sep}`) ||
    normalized.startsWith(`${path.normalize("/private/tmp")}${path.sep}`) ||
    normalized.includes(`${path.sep}content${path.sep}generated${path.sep}`) ||
    path.basename(normalized).includes(".tmp")
  );
}
