#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const INPUT_SCHEMA = "aaa-equation-map-effective-frw-handoff-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-effective-frw-handoff-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";

const REQUIRED_ROWS = [
  "theta_cos",
  "cosmology_carrier",
  "noether_sea_window",
  "assembly_provenance_record",
  "metric_projection",
  "redshift_transfer_handoff",
  "pi_frw",
  "theta_read",
  "scale_factor_row",
  "hubble_row",
  "effective_density_row",
  "effective_pressure_row",
  "effective_coupling_row",
  "effective_lambda_row",
  "curvature_row",
  "source_term_row",
  "friedmann_residual",
  "continuity_residual",
  "source_provenance",
  "no_hidden_retune_witness",
];

const EXPECTED_SHARED_KEYS = [
  "theta_cos_id",
  "a_eff",
  "H_eff",
  "rho_eff",
  "P_eff",
  "G_eff",
  "Lambda_eff",
  "k",
  "S_eff",
];

const DEFAULT_TOLERANCES = {
  carrier: 1e-12,
  hubble: 1e-9,
  friedmann: 1e-9,
  continuity: 1e-9,
  sharedKey: 1e-12,
  sourceProvenance: 1e-12,
  fixedVoid: 1e-12,
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
const output = evaluateEffectiveFrwHandoff(input, inputPath);
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
  console.log(`Usage: node scripts/equation-mapping/effective-frw-handoff-residual.mjs --input PATH [options]

Options:
  --input PATH          Effective-FRW handoff residual input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the residual is populated.
  --help                Show this help.

This checker evaluates the score-neutral EQ-18/EQ-19 effective-FRW handoff.
Attempt rows, split theta_cos carriers, hidden source terms, void-expansion
claims, and non-durable sources never raise equation scores.`);
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

function evaluateEffectiveFrwHandoff(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const constants = parseConstants(input.constants ?? {});
  const handoff = input.handoff ?? input;
  const rows = handoff.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedRow(rows[rowId], inputPath)]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const carrierBinding = evaluateCarrierBinding(rows, handoff.commonCarrierId);
  const sharedKeys = evaluateSharedKeys(handoff.sharedKeys ?? [], tolerances, inputPath);
  const frw = evaluateFrwProjection(
    handoff.frwProjection ?? handoff.frw ?? {},
    constants,
    tolerances,
  );
  const friedmann = evaluateFriedmannResidual(
    handoff.friedmann ?? {},
    constants,
    tolerances,
  );
  const continuity = evaluateContinuityResidual(
    handoff.continuity ?? {},
    constants,
    tolerances,
  );
  const sourceProvenance = evaluateSourceProvenance(
    handoff.sourceProvenance ?? {},
    tolerances,
  );
  const fixedVoid = evaluateFixedVoid(handoff.fixedVoid ?? {}, tolerances);
  const noHiddenRetune = evaluateScalarResidual(
    handoff.noHiddenRetune?.residual ?? handoff.noHiddenRetune?.maxResidual,
    tolerances.retune,
  );
  const status = decideStatus({
    missingRows,
    carrierBinding,
    sharedKeys,
    frw,
    friedmann,
    continuity,
    sourceProvenance,
    fixedVoid,
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
      id: input.residualId ?? handoff.id ?? null,
      row: "EQ-18/EQ-19",
      supportedRows: ["EQ-17", "EQ-18", "EQ-19", "EQ-20", "EQ-21", "EQ-22"],
      claimLevel:
        "score-neutral effective-FRW handoff; accepted retained rows are required before score review",
    },
    constants,
    tolerances,
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      missingRows,
      sourceEvidenceFailureCount: sourceEvidenceFailureCount(rowChecks, sharedKeys),
      missingSharedKeys: sharedKeys.missingSharedKeys,
      sharedKeyMismatchCount: sharedKeys.mismatches.length,
      nextBlocker: firstBlocker({
        status,
        rowChecks,
        missingRows,
        carrierBinding,
        sharedKeys,
        frw,
        friedmann,
        continuity,
        sourceProvenance,
        fixedVoid,
        noHiddenRetune,
      }),
      commonCarrierPass: carrierBinding.passed,
      sharedKeysAccepted: sharedKeys.accepted,
      hiddenRetuneNumericPass: sharedKeys.hiddenRetuneNumericPass,
      frwProjectionComputed: frw.computed,
      frwHubblePass: frw.hubblePass,
      friedmannComputed: friedmann.computed,
      friedmannResidual: friedmann.residual,
      friedmannResidualPass: friedmann.passed,
      continuityComputed: continuity.computed,
      continuityResidual: continuity.residual,
      continuityResidualPass: continuity.passed,
      sourceProvenancePass: sourceProvenance.passed,
      fixedVoidPass: fixedVoid.passed,
      hiddenRetunePass: noHiddenRetune.passed,
    },
    rows: Object.fromEntries(
      REQUIRED_ROWS.map((rowId) => [
        rowId,
        {
          status: normalizeStatus(rows[rowId]),
          accepted: rowChecks[rowId].accepted,
          reason: rowChecks[rowId].reason,
          sourceReason: rowChecks[rowId].sourceReason ?? null,
          rowId: rows[rowId]?.rowId ?? rows[rowId]?.id ?? null,
          carrierId: rows[rowId]?.carrierId ?? null,
          sourcePath: rows[rowId]?.sourcePath ?? rows[rowId]?.source ?? null,
        },
      ]),
    ),
    carrierBinding,
    sharedKeys,
    frw,
    friedmann,
    continuity,
    sourceProvenance,
    fixedVoid,
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
    carrierBinding: output.carrierBinding,
    sharedKeys: {
      accepted: output.sharedKeys.accepted,
      missingSharedKeys: output.sharedKeys.missingSharedKeys,
      hiddenRetuneNumericPass: output.sharedKeys.hiddenRetuneNumericPass,
      mismatches: output.sharedKeys.mismatches,
    },
    frw: output.frw,
    friedmann: output.friedmann,
    continuity: output.continuity,
    sourceProvenance: output.sourceProvenance,
    fixedVoid: output.fixedVoid,
    noHiddenRetune: output.noHiddenRetune,
  };
}

function parseConstants(raw) {
  return {
    c0: positiveNumber(raw.c0 ?? 1, "constants.c0"),
    pi: positiveNumber(raw.pi ?? Math.PI, "constants.pi"),
  };
}

function parseTolerances(raw) {
  return {
    carrier: positiveNumber(raw.carrier ?? DEFAULT_TOLERANCES.carrier, "tolerances.carrier"),
    hubble: positiveNumber(raw.hubble ?? DEFAULT_TOLERANCES.hubble, "tolerances.hubble"),
    friedmann: positiveNumber(
      raw.friedmann ?? DEFAULT_TOLERANCES.friedmann,
      "tolerances.friedmann",
    ),
    continuity: positiveNumber(
      raw.continuity ?? DEFAULT_TOLERANCES.continuity,
      "tolerances.continuity",
    ),
    sharedKey: positiveNumber(
      raw.sharedKey ?? DEFAULT_TOLERANCES.sharedKey,
      "tolerances.sharedKey",
    ),
    sourceProvenance: positiveNumber(
      raw.sourceProvenance ?? DEFAULT_TOLERANCES.sourceProvenance,
      "tolerances.sourceProvenance",
    ),
    fixedVoid: positiveNumber(
      raw.fixedVoid ?? DEFAULT_TOLERANCES.fixedVoid,
      "tolerances.fixedVoid",
    ),
    retune: positiveNumber(raw.retune ?? DEFAULT_TOLERANCES.retune, "tolerances.retune"),
  };
}

function evaluateCarrierBinding(rows, commonCarrierId) {
  const rowCarrierIds = REQUIRED_ROWS.map((rowId) => ({
    rowId,
    carrierId: rows[rowId]?.carrierId ?? null,
  }));
  const expectedCarrierId =
    commonCarrierId ?? rowCarrierIds.find((row) => concreteString(row.carrierId))?.carrierId ?? null;
  const missingCarrierRows = rowCarrierIds
    .filter((row) => row.carrierId !== expectedCarrierId)
    .map((row) => row.rowId);
  const passed = concreteString(expectedCarrierId) && missingCarrierRows.length === 0;
  return {
    commonCarrierId: expectedCarrierId,
    passed,
    missingCarrierRows,
    rowCarrierIds,
    reason: passed ? "passed" : "frw_rows_do_not_share_common_carrier",
  };
}

function evaluateSharedKeys(rawKeys, tolerances, inputPath) {
  const keyRows = new Map(
    (Array.isArray(rawKeys) ? rawKeys : []).map((row) => [row.key, row]),
  );
  const keys = Object.fromEntries(
    EXPECTED_SHARED_KEYS.map((key) => {
      const row = keyRows.get(key);
      const check = evaluateAcceptedRow(row, inputPath);
      const comparison = compareProjectionValues(row?.projectionValues ?? {}, tolerances);
      return [
        key,
        {
          status: normalizeStatus(row),
          accepted: check.accepted,
          reason: check.reason,
          sourceReason: check.sourceReason ?? null,
          sourcePath: row?.sourcePath ?? row?.source ?? null,
          values: row?.projectionValues ?? {},
          mismatch: comparison.mismatch,
          maxDelta: comparison.maxDelta,
          pass: comparison.pass,
        },
      ];
    }),
  );
  const missingSharedKeys = EXPECTED_SHARED_KEYS.filter(
    (key) => !keys[key].accepted,
  );
  const mismatches = Object.entries(keys)
    .filter(([, value]) => value.mismatch)
    .map(([key, value]) => ({
      key,
      maxDelta: value.maxDelta,
    }));
  return {
    accepted: missingSharedKeys.length === 0,
    allExpectedKeysDeclared: EXPECTED_SHARED_KEYS.every((key) => keyRows.has(key)),
    missingSharedKeys,
    expectedKeys: EXPECTED_SHARED_KEYS,
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

function evaluateFrwProjection(raw, constants, tolerances) {
  const aBefore = positiveNumberOrNull(raw.aBefore ?? raw.a_eff_before);
  const aAfter = positiveNumberOrNull(raw.aAfter ?? raw.a_eff_after);
  const aEff = positiveNumberOrNull(raw.aEff ?? raw.a_eff);
  const deltaTau = positiveNumberOrNull(raw.deltaTau ?? raw.delta_tau);
  const hEff = finiteNumberOrNull(raw.H_eff ?? raw.hEff);
  const computedH =
    aBefore !== null && aAfter !== null && aEff !== null && deltaTau !== null
      ? (aAfter - aBefore) / (deltaTau * aEff)
      : null;
  const residual =
    computedH !== null && hEff !== null
      ? Math.abs(computedH - hEff)
      : finiteNumberOrNull(raw.hubbleResidual ?? raw.residual);
  return {
    computed: residual !== null,
    aBefore,
    aAfter,
    aEff,
    deltaTau,
    H_eff: hEff,
    computedH,
    hubbleResidual: residual,
    tolerance: tolerances.hubble,
    hubblePass: residual !== null && residual <= tolerances.hubble,
    k: finiteNumberOrNull(raw.k),
    tauClockId: raw.tauClockId ?? null,
    fixedVoidMetricId: raw.fixedVoidMetricId ?? null,
    c0: constants.c0,
  };
}

function evaluateFriedmannResidual(raw, constants, tolerances) {
  const H_eff = finiteNumberOrNull(raw.H_eff ?? raw.hEff);
  const G_eff = finiteNumberOrNull(raw.G_eff ?? raw.gEff);
  const rho_eff = finiteNumberOrNull(raw.rho_eff ?? raw.rhoEff);
  const a_eff = positiveNumberOrNull(raw.a_eff ?? raw.aEff);
  const k = finiteNumberOrNull(raw.k) ?? 0;
  const Lambda_eff = finiteNumberOrNull(raw.Lambda_eff ?? raw.lambdaEff) ?? 0;
  const target =
    H_eff !== null && G_eff !== null && rho_eff !== null && a_eff !== null
      ? (8 * constants.pi * G_eff * rho_eff) / (3 * constants.c0 ** 2) -
        (k * constants.c0 ** 2) / (a_eff ** 2) +
        Lambda_eff / 3
      : null;
  const residual =
    target !== null && H_eff !== null
      ? Math.abs(H_eff ** 2 - target)
      : finiteNumberOrNull(raw.residual ?? raw.friedmannResidual);
  return {
    computed: residual !== null,
    H_eff,
    G_eff,
    rho_eff,
    a_eff,
    k,
    Lambda_eff,
    target,
    residual,
    tolerance: tolerances.friedmann,
    passed: residual !== null && residual <= tolerances.friedmann,
  };
}

function evaluateContinuityResidual(raw, constants, tolerances) {
  const rhoBefore = finiteNumberOrNull(raw.rhoBefore ?? raw.rho_eff_before);
  const rhoAfter = finiteNumberOrNull(raw.rhoAfter ?? raw.rho_eff_after);
  const deltaTau = positiveNumberOrNull(raw.deltaTau ?? raw.delta_tau);
  const rhoDot =
    rhoBefore !== null && rhoAfter !== null && deltaTau !== null
      ? (rhoAfter - rhoBefore) / deltaTau
      : finiteNumberOrNull(raw.rhoDot ?? raw.rho_dot);
  const H_eff = finiteNumberOrNull(raw.H_eff ?? raw.hEff);
  const rho_eff = finiteNumberOrNull(raw.rho_eff ?? raw.rhoEff);
  const P_eff = finiteNumberOrNull(raw.P_eff ?? raw.pEff) ?? 0;
  const S_eff = finiteNumberOrNull(raw.S_eff ?? raw.sourceTerm) ?? 0;
  const residual =
    rhoDot !== null && H_eff !== null && rho_eff !== null
      ? Math.abs(rhoDot + 3 * H_eff * (rho_eff + P_eff / constants.c0 ** 2) - S_eff)
      : finiteNumberOrNull(raw.residual ?? raw.continuityResidual);
  return {
    computed: residual !== null,
    rhoBefore,
    rhoAfter,
    deltaTau,
    rhoDot,
    H_eff,
    rho_eff,
    P_eff,
    S_eff,
    residual,
    tolerance: tolerances.continuity,
    passed: residual !== null && residual <= tolerances.continuity,
  };
}

function evaluateSourceProvenance(raw, tolerances) {
  const rows = Array.isArray(raw.rows) ? raw.rows : [];
  const missingRows = rows
    .filter((row) => !concreteString(row.id ?? row.rowId) || !concreteString(row.kind))
    .map((row, index) => row.id ?? row.rowId ?? `source_${index}`);
  const residual = finiteNumberOrNull(raw.residual ?? raw.maxResidual);
  const passed =
    rows.length > 0 &&
    missingRows.length === 0 &&
    residual !== null &&
    residual <= tolerances.sourceProvenance;
  return {
    rows: rows.map((row, index) => ({
      id: row.id ?? row.rowId ?? `source_${index}`,
      kind: row.kind ?? null,
      contribution: finiteNumberOrNull(row.contribution),
      provenanceId: row.provenanceId ?? null,
    })),
    missingRows,
    residual,
    tolerance: tolerances.sourceProvenance,
    passed,
    reason: passed ? "passed" : "source_term_lacks_provenance_or_residual",
  };
}

function evaluateFixedVoid(raw, tolerances) {
  const voidScaleDrift = finiteNumberOrNull(raw.voidScaleDrift ?? raw.residual);
  const euclideanVoidExpansion = raw.euclideanVoidExpansion === true;
  const passed =
    euclideanVoidExpansion === false &&
    voidScaleDrift !== null &&
    voidScaleDrift <= tolerances.fixedVoid;
  return {
    euclideanVoidExpansion,
    voidScaleDrift,
    tolerance: tolerances.fixedVoid,
    passed,
    reason: passed ? "passed" : "void_expansion_or_missing_fixed_void_witness",
  };
}

function evaluateScalarResidual(value, tolerance) {
  const residual = finiteNumberOrNull(value);
  return {
    residual,
    tolerance,
    passed: residual !== null && residual <= tolerance,
  };
}

function decideStatus({
  missingRows,
  carrierBinding,
  sharedKeys,
  frw,
  friedmann,
  continuity,
  sourceProvenance,
  fixedVoid,
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
  if (!carrierBinding.passed) {
    return "blocked_frw_handoff_split";
  }
  if (!fixedVoid.passed) {
    return "blocked_void_expansion_level_collapse";
  }
  if (!frw.computed) {
    return "blocked_missing_frw_projection";
  }
  if (!frw.hubblePass) {
    return "blocked_frw_handoff_residual";
  }
  if (!friedmann.computed) {
    return "blocked_missing_friedmann_rows";
  }
  if (!friedmann.passed) {
    return "blocked_friedmann_residual_above_tolerance";
  }
  if (!continuity.computed) {
    return "blocked_missing_continuity_rows";
  }
  if (!continuity.passed) {
    return "blocked_continuity_residual_above_tolerance";
  }
  if (!sourceProvenance.passed) {
    return "blocked_source_provenance";
  }
  if (!noHiddenRetune.passed) {
    return "blocked_hidden_retune";
  }
  return "populated";
}

function firstBlocker({
  status,
  rowChecks,
  missingRows,
  carrierBinding,
  sharedKeys,
  frw,
  friedmann,
  continuity,
  sourceProvenance,
  fixedVoid,
  noHiddenRetune,
}) {
  if (status === "populated") {
    return null;
  }
  if (missingRows.length > 0) {
    if (rowChecks?.[missingRows[0]]?.reason === "accepted_without_evidence_source") {
      return "accepted_without_evidence_source";
    }
    return `missing_accepted_${missingRows[0]}`;
  }
  if (!sharedKeys.accepted) {
    const firstMissingKey = sharedKeys.missingSharedKeys[0];
    if (sharedKeys.keys?.[firstMissingKey]?.reason === "accepted_without_evidence_source") {
      return "accepted_without_evidence_source";
    }
    return `missing_accepted_shared_key_${firstMissingKey}`;
  }
  if (!sharedKeys.hiddenRetuneNumericPass) {
    return `hidden_retune_${sharedKeys.mismatches[0]?.key ?? "shared_key"}`;
  }
  if (!carrierBinding.passed) {
    return "frw_handoff_split";
  }
  if (!fixedVoid.passed) {
    return "void_expansion_level_collapse";
  }
  if (!frw.computed) {
    return "missing_frw_projection";
  }
  if (!frw.hubblePass) {
    return "frw_handoff_residual";
  }
  if (!friedmann.computed) {
    return "missing_friedmann_rows";
  }
  if (!friedmann.passed) {
    return "friedmann_residual_above_tolerance";
  }
  if (!continuity.computed) {
    return "missing_continuity_rows";
  }
  if (!continuity.passed) {
    return "continuity_residual_above_tolerance";
  }
  if (!sourceProvenance.passed) {
    return "source_provenance";
  }
  if (!noHiddenRetune.passed) {
    return "hidden_retune";
  }
  return status;
}

function evaluateAcceptedRow(row, inputPath = null) {
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
  const sourceCheck = firstSourceReferenceCheck(inputPath, row.sourcePath, row.source);
  if (!sourceCheck.accepted) {
    if (isNonEvidenceSourceReason(sourceCheck.reason)) {
      return {
        accepted: false,
        reason: "accepted_without_evidence_source",
        sourceReason: sourceCheck.reason,
      };
    }
    return { accepted: false, reason: sourceCheck.reason, sourceReason: sourceCheck.reason };
  }
  return { accepted: true, reason: "accepted" };
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

function positiveNumberOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
}

function finiteNumberOrNull(value) {
  if (value === undefined || value === null) {
    return null;
  }
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
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

function sourceReferenceExists(value, inputPath = null) {
  return sourceReferenceCheck(value, inputPath).accepted;
}

function firstSourceReferenceCheck(inputPath, ...values) {
  let firstFailure = { accepted: false, reason: "missing_source_path" };
  for (const value of values) {
    const check = sourceReferenceCheck(value, inputPath);
    if (check.accepted) {
      return check;
    }
    if (firstFailure.reason === "missing_source_path") {
      firstFailure = check;
    }
  }
  return firstFailure;
}

function sourceReferenceCheck(value, inputPath = null) {
  if (!concreteString(value)) {
    return { accepted: false, reason: "missing_source_path" };
  }
  const sourcePath = value.trim().replace(/#.*/, "");
  const resolvedPath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(REPO_ROOT, sourcePath);
  if (inputPath && path.resolve(inputPath) === resolvedPath) {
    return { accepted: false, reason: "self_referential_source" };
  }
  const rejectionReason = sourceReferenceRejectionReason(resolvedPath);
  if (rejectionReason) {
    return { accepted: false, reason: rejectionReason };
  }
  try {
    if (!fs.statSync(resolvedPath).isFile()) {
      return { accepted: false, reason: "source_not_file" };
    }
  } catch {
    return { accepted: false, reason: "source_not_found" };
  }
  return { accepted: true, reason: "accepted" };
}

function isNonDurableSourcePath(filePath) {
  return sourceReferenceRejectionReason(filePath) !== null;
}

function sourceEvidenceFailureCount(rowChecks, sharedKeys) {
  const rowFailures = Object.values(rowChecks).filter(
    (check) => check.reason === "accepted_without_evidence_source",
  ).length;
  const sharedKeyFailures = Object.values(sharedKeys.keys ?? {}).filter(
    (check) => check.reason === "accepted_without_evidence_source",
  ).length;
  return rowFailures + sharedKeyFailures;
}

function isNonEvidenceSourceReason(reason) {
  return new Set([
    "temp_source_path",
    "coordination_source_path",
    "authored_prose_source_path",
    "generated_source_path",
    "control_or_attempt_source_path",
    "self_referential_source",
    "source_contract_path",
  ]).has(reason);
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
  const basename = path.basename(normalized).toLowerCase();
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
  if (
    basename.includes("attempt") ||
    basename.includes("mock") ||
    basename.includes("toy") ||
    basename.includes("probe") ||
    basename.includes("negative-control") ||
    basename.includes("source-contract") ||
    basename.includes(".tmp")
  ) {
    return basename.includes("source-contract")
      ? "source_contract_path"
      : "control_or_attempt_source_path";
  }
  return null;
}
