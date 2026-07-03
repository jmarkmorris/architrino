#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import {
  EQ21_GROWTH_TRANSFER_KEYS,
  EQ21_GROWTH_TRANSFER_ROWS,
  evaluateGrowthModel,
  growthTransferEvidenceStatusForPath,
} from "./eq21-growth-transfer-evidence.mjs";
import { sharedObservationEvidenceStatusForPath } from "./shared-observation-evidence.mjs";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const DEFAULT_INPUT_PATH = path.join(
  SCRIPT_DIR,
  "eq21-growth-transfer-child-attempt.v1.json",
);
const INPUT_SCHEMA = "aaa-equation-map-eq21-growth-transfer-child-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-eq21-growth-transfer-child-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";
const DEFAULT_TOLERANCES = {
  residual: 1,
  retune: 1e-12,
  sharedKey: 1e-12,
  derived: 1e-12,
};

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const inputPath = path.resolve(args.input);
const input = readJson(inputPath);
const output = evaluateEq21GrowthTransferChild(input, inputPath);
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
  console.log(`Usage: node scripts/equation-mapping/eq21-growth-transfer-child-residual.mjs [options]

Options:
  --input PATH          EQ-21 growth-transfer child input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the residual is populated.
  --help                Show this help.

This checker evaluates the score-neutral EQ-21 growth-transfer child
consumer. It computes a first f-sigma8 row from the accepted shared
observation record; it does not raise equation scores.`);
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

function evaluateEq21GrowthTransferChild(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const packet = input.packet ?? input;
  const rows = packet.rows ?? {};
  const rowChecks = Object.fromEntries(
    EQ21_GROWTH_TRANSFER_ROWS.map((rowId) => [
      rowId,
      evaluateAcceptedRow(rows[rowId]),
    ]),
  );
  const missingRows = EQ21_GROWTH_TRANSFER_ROWS.filter(
    (rowId) => !rowChecks[rowId].accepted,
  );
  const parent = evaluateParent(input.sharedObservation ?? packet.sharedObservation ?? {});
  const sharedKeys = evaluateSharedKeys(packet.sharedKeys ?? [], parent, tolerances);
  const model = evaluateModel(packet.model ?? {}, sharedKeys.keyValues, tolerances);
  const sourceEvidence = evaluateSourceEvidence({ rows, sharedKeys });
  const status = decideStatus({
    missingRows,
    sourceEvidence,
    parent,
    sharedKeys,
    model,
  });
  const nextBlocker = firstBlocker({
    status,
    missingRows,
    sourceEvidence,
    parent,
    sharedKeys,
    model,
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
      row: "EQ-21",
      childConsumer: "growth_transfer_f_sigma8",
      claimLevel:
        "score-neutral predictive growth-transfer child; accepted shared-observation evidence is required before score review",
    },
    tolerances,
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      scoreReviewPreconditionsMet: status === "populated",
      nextBlocker,
      nextBlockerDetails: firstBlockerDetails({
        nextBlocker,
        missingRows,
        rows,
        rowChecks,
        sourceEvidence,
        parent,
        sharedKeys,
        model,
      }),
      missingRows,
      missingSharedKeys: sharedKeys.missingSharedKeys,
      sharedKeyMismatchCount: sharedKeys.mismatches.length,
      sourceEvidenceAccepted: sourceEvidence.passed,
      sourceEvidenceFailureCount: sourceEvidence.failures.length,
      parentSharedObservationAccepted: parent.accepted,
      parentSharedObservationReason: parent.reason,
      sharedKeysAccepted: sharedKeys.accepted,
      hiddenRetuneNumericPass: sharedKeys.hiddenRetuneNumericPass,
      modelComputed: model.computed,
      modelDerivedPass: model.derivedPass,
      fSigma8ResidualPass: model.fSigma8ResidualPass,
      noHiddenRetunePass: model.noHiddenRetunePass,
      omegaMEff: model.derived?.omega_m_eff ?? null,
      growthRateF: model.derived?.growth_rate_f ?? null,
      fSigma8: model.derived?.f_sigma8 ?? null,
      fSigma8NormalizedResidual:
        model.derived?.f_sigma8_normalized_residual ?? null,
    },
    rows: Object.fromEntries(
      EQ21_GROWTH_TRANSFER_ROWS.map((rowId) => [
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
    parentSharedObservation: parent,
    sharedKeys,
    sourceEvidence,
    growthModel: model,
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
    parentSharedObservation: {
      accepted: output.parentSharedObservation.accepted,
      reason: output.parentSharedObservation.reason,
      thetaObsId: output.parentSharedObservation.thetaObsId,
      providerWindowId: output.parentSharedObservation.providerWindowId,
    },
    sharedKeys: {
      accepted: output.sharedKeys.accepted,
      missingSharedKeys: output.sharedKeys.missingSharedKeys,
      hiddenRetuneNumericPass: output.sharedKeys.hiddenRetuneNumericPass,
      mismatches: output.sharedKeys.mismatches,
    },
    sourceEvidence: {
      accepted: output.sourceEvidence.passed,
      failureCount: output.sourceEvidence.failures.length,
      firstFailure: output.sourceEvidence.firstFailure,
    },
    growthModel: {
      computed: output.growthModel.computed,
      derivedPass: output.growthModel.derivedPass,
      fSigma8ResidualPass: output.growthModel.fSigma8ResidualPass,
      noHiddenRetunePass: output.growthModel.noHiddenRetunePass,
      derived: output.growthModel.derived,
    },
  };
}

function evaluateParent(rawParent) {
  const sourcePath = rawParent.path ?? rawParent.sourcePath ?? null;
  const status = growthParentStatus(sourcePath);
  return {
    ...status,
    sourcePath,
  };
}

function growthParentStatus(sourcePath) {
  if (!concreteString(sourcePath)) {
    return { accepted: false, reason: "missing_shared_observation_path" };
  }
  const status = parentEvidenceStatus(sourcePath);
  if (!status.accepted) {
    return status;
  }
  const raw = readJsonOrNull(sourcePath);
  const growthValues = Object.fromEntries(
    (Array.isArray(raw?.sharedKeys) ? raw.sharedKeys : []).map((row) => [
      row.key,
      finiteNumberOrNull(row.projectionValues?.growth),
    ]),
  );
  return {
    ...status,
    growthValues,
    eventLedgerId: raw?.window?.eventLedgerId ?? null,
  };
}

function parentEvidenceStatus(sourcePath) {
  return sharedObservationEvidenceStatusForPath(sourcePath, { repoRoot: process.cwd() });
}

function readJsonOrNull(value) {
  if (!concreteString(value)) {
    return null;
  }
  const resolvedPath = path.isAbsolute(value)
    ? value
    : path.resolve(process.cwd(), value.trim().replace(/#.*/, ""));
  try {
    return JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
  } catch {
    return null;
  }
}

function evaluateSharedKeys(rawKeys, parent, tolerances) {
  const keyRows = new Map(
    (Array.isArray(rawKeys) ? rawKeys : []).map((row) => [row.key, row]),
  );
  const keys = Object.fromEntries(
    EQ21_GROWTH_TRANSFER_KEYS.map((key) => {
      const row = keyRows.get(key);
      const check = evaluateAcceptedKey(row);
      const value = finiteNumberOrNull(row?.value);
      const parentValue = finiteNumberOrNull(parent.growthValues?.[key]);
      const mismatch =
        check.accepted &&
        value !== null &&
        parentValue !== null &&
        Math.abs(value - parentValue) > tolerances.sharedKey;
      return [
        key,
        {
          status: normalizeStatus(row),
          accepted: check.accepted,
          reason: check.reason,
          value,
          parentGrowthValue: parentValue,
          mismatch,
          maxDelta:
            value !== null && parentValue !== null ? Math.abs(value - parentValue) : null,
          sourcePath: row?.sourcePath ?? row?.source ?? null,
        },
      ];
    }),
  );
  const missingSharedKeys = EQ21_GROWTH_TRANSFER_KEYS.filter(
    (key) => !keys[key].accepted,
  );
  const mismatches = Object.entries(keys)
    .filter(([, value]) => value.mismatch)
    .map(([key, value]) => ({
      key,
      maxDelta: value.maxDelta,
      value: value.value,
      parentGrowthValue: value.parentGrowthValue,
    }));
  return {
    accepted: missingSharedKeys.length === 0,
    allExpectedKeysDeclared: EQ21_GROWTH_TRANSFER_KEYS.every((key) => keyRows.has(key)),
    missingSharedKeys,
    expectedKeys: EQ21_GROWTH_TRANSFER_KEYS,
    hiddenRetuneNumericPass: mismatches.length === 0,
    mismatches,
    keys,
    keyValues: Object.fromEntries(
      Object.entries(keys).map(([key, row]) => [key, row.value]),
    ),
  };
}

function evaluateModel(rawModel, keyValues, tolerances) {
  const base = evaluateGrowthModel(rawModel, keyValues);
  if (!base.computed) {
    return {
      ...base,
      derivedPass: false,
      fSigma8ResidualPass: false,
      noHiddenRetunePass: false,
    };
  }
  const derivedMismatches = [];
  for (const [key, expected] of Object.entries(base.derived)) {
    if (key === "f_sigma8_normalized_residual") {
      continue;
    }
    const actual = finiteNumberOrNull(rawModel.derived?.[key]);
    if (actual === null || Math.abs(actual - expected) > tolerances.derived) {
      derivedMismatches.push({ key, actual, expected });
    }
  }
  const residualActual = finiteNumberOrNull(
    rawModel.residualComponents?.f_sigma8_normalized ??
      rawModel.f_sigma8_normalized,
  );
  const residualExpected = base.derived.f_sigma8_normalized_residual;
  const fSigma8ResidualPass =
    residualActual !== null &&
    residualExpected !== null &&
    Math.abs(residualActual - residualExpected) <= tolerances.derived &&
    residualActual <= tolerances.residual;
  const retune = finiteNumberOrNull(
    rawModel.residualComponents?.S_retune ?? rawModel.noHiddenRetuneResidual,
  );
  return {
    ...base,
    derivedPass: derivedMismatches.length === 0,
    derivedMismatches,
    fSigma8ResidualPass,
    fSigma8ResidualActual: residualActual,
    noHiddenRetunePass: retune !== null && retune <= tolerances.retune,
    noHiddenRetuneResidual: retune,
  };
}

function evaluateSourceEvidence({ rows, sharedKeys }) {
  const rowEntries = EQ21_GROWTH_TRANSFER_ROWS.map((rowId) =>
    evaluateSourceEvidenceEntry({
      scope: "row",
      id: rowId,
      status: rows[rowId]?.status ?? rows[rowId]?.retainedStatus ?? null,
      sourcePath: rows[rowId]?.sourcePath ?? rows[rowId]?.source ?? null,
    }),
  );
  const keyEntries = EQ21_GROWTH_TRANSFER_KEYS.map((key) =>
    evaluateSourceEvidenceEntry({
      scope: "shared_key",
      id: key,
      status: sharedKeys.keys[key]?.status,
      sourcePath: sharedKeys.keys[key]?.sourcePath,
    }),
  );
  const entries = [...rowEntries, ...keyEntries];
  const failures = entries.filter((entry) => !entry.passed);
  return {
    passed: failures.length === 0,
    failures,
    firstFailure: failures[0] ?? null,
    entries,
  };
}

function evaluateSourceEvidenceEntry({ scope, id, status, sourcePath }) {
  const requiresEvidence = ACCEPTED_STATUSES.has(status);
  if (!requiresEvidence) {
    return {
      scope,
      id,
      status: status ?? "missing",
      sourcePath: sourcePath ?? null,
      passed: true,
      reason: "not_accepted",
    };
  }
  const evidence = growthTransferEvidenceStatusForPath(sourcePath, {
    repoRoot: process.cwd(),
  });
  return {
    scope,
    id,
    status,
    sourcePath: sourcePath ?? null,
    passed: evidence.accepted,
    reason: evidence.accepted ? "accepted" : evidence.reason,
  };
}

function decideStatus({ missingRows, sourceEvidence, parent, sharedKeys, model }) {
  if (missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  if (!sourceEvidence.passed) {
    return "blocked_source_evidence";
  }
  if (!parent.accepted) {
    return "blocked_parent_shared_observation";
  }
  if (!sharedKeys.accepted) {
    return "blocked_missing_shared_keys";
  }
  if (!sharedKeys.hiddenRetuneNumericPass) {
    return "blocked_hidden_retune";
  }
  if (!model.computed) {
    return "blocked_growth_model_not_computed";
  }
  if (!model.derivedPass) {
    return "blocked_growth_model_derived_mismatch";
  }
  if (!model.fSigma8ResidualPass) {
    return "blocked_f_sigma8_residual";
  }
  if (!model.noHiddenRetunePass) {
    return "blocked_no_hidden_retune";
  }
  return "populated";
}

function firstBlocker({ status, missingRows, sourceEvidence, parent, sharedKeys, model }) {
  if (status === "populated") {
    return null;
  }
  if (missingRows.length > 0) {
    return `missing_accepted_${missingRows[0]}`;
  }
  if (!sourceEvidence.passed) {
    return "accepted_without_growth_transfer_evidence";
  }
  if (!parent.accepted) {
    return `parent_shared_observation_${parent.reason}`;
  }
  if (!sharedKeys.accepted) {
    return `missing_accepted_shared_key_${sharedKeys.missingSharedKeys[0]}`;
  }
  if (!sharedKeys.hiddenRetuneNumericPass) {
    return `hidden_retune_${sharedKeys.mismatches[0]?.key ?? "shared_key"}`;
  }
  if (!model.computed) {
    return model.reason ?? "growth_model_not_computed";
  }
  if (!model.derivedPass) {
    return `growth_model_derived_mismatch_${model.derivedMismatches[0]?.key ?? "unknown"}`;
  }
  if (!model.fSigma8ResidualPass) {
    return "f_sigma8_residual_failed";
  }
  if (!model.noHiddenRetunePass) {
    return "growth_child_hidden_retune";
  }
  return status;
}

function firstBlockerDetails({
  nextBlocker,
  missingRows,
  rows,
  rowChecks,
  sourceEvidence,
  parent,
  sharedKeys,
  model,
}) {
  if (!nextBlocker) {
    return null;
  }
  const missingRowId = missingRows.find(
    (rowId) => nextBlocker === `missing_accepted_${rowId}`,
  );
  if (missingRowId) {
    return {
      id: missingRowId,
      status: normalizeStatus(rows[missingRowId]),
      accepted: rowChecks[missingRowId]?.accepted ?? false,
      reason: rowChecks[missingRowId]?.reason ?? "missing_row",
      rowId: rows[missingRowId]?.rowId ?? rows[missingRowId]?.id ?? null,
      sourcePath: rows[missingRowId]?.sourcePath ?? rows[missingRowId]?.source ?? null,
    };
  }
  if (nextBlocker === "accepted_without_growth_transfer_evidence") {
    return {
      id: sourceEvidence.firstFailure?.id ?? "source_evidence",
      scope: sourceEvidence.firstFailure?.scope ?? null,
      status: sourceEvidence.firstFailure?.status ?? "failed",
      reason: sourceEvidence.firstFailure?.reason ?? nextBlocker,
      sourcePath: sourceEvidence.firstFailure?.sourcePath ?? null,
      failureCount: sourceEvidence.failures.length,
    };
  }
  if (nextBlocker.startsWith("parent_shared_observation_")) {
    return parent;
  }
  if (nextBlocker.startsWith("missing_accepted_shared_key_")) {
    const key = nextBlocker.replace("missing_accepted_shared_key_", "");
    return {
      id: key,
      ...sharedKeys.keys[key],
    };
  }
  if (nextBlocker.startsWith("hidden_retune_")) {
    return {
      reason: "shared_key_value_differs_from_parent_growth_projection",
      mismatch: sharedKeys.mismatches[0] ?? null,
    };
  }
  return {
    id: nextBlocker,
    reason: nextBlocker,
    model,
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
  const evidence = growthTransferEvidenceStatusForPath(
    row.sourcePath ?? row.source ?? null,
    { repoRoot: process.cwd() },
  );
  if (!evidence.accepted) {
    return {
      accepted: false,
      reason: `growth_transfer_${evidence.reason}`,
      evidence,
    };
  }
  return { accepted: true, reason: "accepted" };
}

function evaluateAcceptedKey(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return { accepted: false, reason: "missing_shared_key" };
  }
  const status = row.status ?? row.retainedStatus ?? null;
  if (!ACCEPTED_STATUSES.has(status)) {
    return { accepted: false, reason: "row_not_accepted" };
  }
  if (!concreteString(row.key)) {
    return { accepted: false, reason: "key_identity_not_concrete" };
  }
  if (finiteNumberOrNull(row.value) === null) {
    return { accepted: false, reason: "key_value_not_numeric" };
  }
  const evidence = growthTransferEvidenceStatusForPath(
    row.sourcePath ?? row.source ?? null,
    { repoRoot: process.cwd() },
  );
  if (!evidence.accepted) {
    return {
      accepted: false,
      reason: `growth_transfer_${evidence.reason}`,
      evidence,
    };
  }
  return { accepted: true, reason: "accepted" };
}

function parseTolerances(raw) {
  return {
    residual: positiveNumber(raw.residual ?? DEFAULT_TOLERANCES.residual),
    retune: positiveNumber(raw.retune ?? DEFAULT_TOLERANCES.retune),
    sharedKey: positiveNumber(raw.sharedKey ?? DEFAULT_TOLERANCES.sharedKey),
    derived: positiveNumber(raw.derived ?? DEFAULT_TOLERANCES.derived),
  };
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

function positiveNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new Error("tolerance must be a positive finite number.");
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
