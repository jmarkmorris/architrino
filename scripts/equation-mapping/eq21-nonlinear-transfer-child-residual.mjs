#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { growthTransferEvidenceStatusForPath } from "./eq21-growth-transfer-evidence.mjs";
import {
  EQ21_NONLINEAR_TRANSFER_KEYS,
  EQ21_NONLINEAR_TRANSFER_ROWS,
  evaluateNonlinearTransferModel,
  nonlinearTransferEvidenceStatusForPath,
} from "./eq21-nonlinear-transfer-evidence.mjs";
import { matterPowerTransferEvidenceStatusForPath } from "./eq21-matter-power-transfer-evidence.mjs";
import { lensingTransferEvidenceStatusForPath } from "./eq21-lensing-transfer-evidence.mjs";
import { shearRsdTransferEvidenceStatusForPath } from "./eq21-shear-rsd-transfer-evidence.mjs";
import { haloClusterTransferEvidenceStatusForPath } from "./eq21-halo-cluster-transfer-evidence.mjs";
import { sharedObservationEvidenceStatusForPath } from "./shared-observation-evidence.mjs";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const DEFAULT_INPUT_PATH = path.join(
  SCRIPT_DIR,
  "eq21-nonlinear-transfer-child-attempt.v1.json",
);
const INPUT_SCHEMA = "aaa-equation-map-eq21-nonlinear-transfer-child-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-eq21-nonlinear-transfer-child-check/v1";
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
const output = evaluateEq21NonlinearTransferChild(input, inputPath);
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
  console.log(`Usage: node scripts/equation-mapping/eq21-nonlinear-transfer-child-residual.mjs [options]

Options:
  --input PATH          EQ-21 nonlinear transfer child input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the residual is populated.
  --help                Show this help.

This checker evaluates the score-neutral EQ-21 nonlinear transfer child.
It consumes the accepted shared-observation parent, accepted f-sigma8 child,
accepted normalized P(k,z) child, accepted CMB-lensing child, and accepted
shear/RSD child, and accepted halo/cluster child; it does not raise equation
scores.`);
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

function evaluateEq21NonlinearTransferChild(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const packet = input.packet ?? input;
  const rows = packet.rows ?? {};
  const rowChecks = Object.fromEntries(
    EQ21_NONLINEAR_TRANSFER_ROWS.map((rowId) => [
      rowId,
      evaluateAcceptedRow(rows[rowId]),
    ]),
  );
  const missingRows = EQ21_NONLINEAR_TRANSFER_ROWS.filter(
    (rowId) => !rowChecks[rowId].accepted,
  );
  const parent = evaluateSharedObservationParent(
    input.sharedObservation ?? packet.sharedObservation ?? {},
  );
  const growthChild = evaluateGrowthTransferParent(
    input.growthTransferChild ?? packet.growthTransferChild ?? {},
  );
  const matterChild = evaluateMatterPowerTransferParent(
    input.matterPowerTransferChild ?? packet.matterPowerTransferChild ?? {},
  );
  const lensingChild = evaluateLensingTransferParent(
    input.lensingTransferChild ?? packet.lensingTransferChild ?? {},
  );
  const shearRsdChild = evaluateShearRsdTransferParent(
    input.shearRsdTransferChild ?? packet.shearRsdTransferChild ?? {},
  );
  const haloClusterChild = evaluateHaloClusterTransferParent(
    input.haloClusterTransferChild ?? packet.haloClusterTransferChild ?? {},
  );
  const sharedKeys = evaluateSharedKeys(
    packet.sharedKeys ?? [],
    parent,
    growthChild,
    matterChild,
    lensingChild,
    shearRsdChild,
    haloClusterChild,
    tolerances,
  );
  const model = evaluateModel(
    packet.model ?? {},
    matterChild.raw,
    lensingChild.raw,
    shearRsdChild.raw,
    haloClusterChild.raw,
    tolerances,
  );
  const sourceEvidence = evaluateSourceEvidence({
    rows,
    sharedKeys,
    model: packet.model ?? {},
  });
  const status = decideStatus({
    missingRows,
    sourceEvidence,
    parent,
    growthChild,
    matterChild,
    lensingChild,
    shearRsdChild,
    haloClusterChild,
    sharedKeys,
    model,
  });
  const nextBlocker = firstBlocker({
    status,
    missingRows,
    sourceEvidence,
    parent,
    growthChild,
    matterChild,
    lensingChild,
    shearRsdChild,
    haloClusterChild,
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
      childConsumer: "nonlinear_transfer",
      claimLevel:
        "score-neutral nonlinear transfer child; accepted shared-observation, growth, matter-power, CMB-lensing, shear/RSD, and halo/cluster child evidence are required before score review",
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
        growthChild,
        matterChild,
        lensingChild,
        shearRsdChild,
        haloClusterChild,
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
      parentGrowthTransferAccepted: growthChild.accepted,
      parentGrowthTransferReason: growthChild.reason,
      parentMatterPowerTransferAccepted: matterChild.accepted,
      parentMatterPowerTransferReason: matterChild.reason,
      parentLensingTransferAccepted: lensingChild.accepted,
      parentLensingTransferReason: lensingChild.reason,
      parentShearRsdTransferAccepted: shearRsdChild.accepted,
      parentShearRsdTransferReason: shearRsdChild.reason,
      parentHaloClusterTransferAccepted: haloClusterChild.accepted,
      parentHaloClusterTransferReason: haloClusterChild.reason,
      sharedKeysAccepted: sharedKeys.accepted,
      hiddenRetuneNumericPass: sharedKeys.hiddenRetuneNumericPass,
      modelComputed: model.computed,
      modelDerivedPass: model.derivedPass,
      nonlinearGridResidualPass: model.nonlinearGridResidualPass,
      noHiddenRetunePass: model.noHiddenRetunePass,
      sampleCount: model.derived?.samples?.length ?? 0,
      nonlinearGridNormalizedResidual:
        model.derived?.nonlinear_grid_normalized_residual ?? null,
    },
    rows: Object.fromEntries(
      EQ21_NONLINEAR_TRANSFER_ROWS.map((rowId) => [
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
    parentGrowthTransfer: {
      accepted: growthChild.accepted,
      reason: growthChild.reason,
      sourcePath: growthChild.sourcePath,
      growthTransferChildId: growthChild.growthTransferChildId,
    },
    parentMatterPowerTransfer: {
      accepted: matterChild.accepted,
      reason: matterChild.reason,
      sourcePath: matterChild.sourcePath,
      matterPowerTransferChildId: matterChild.matterPowerTransferChildId,
    },
    parentLensingTransfer: {
      accepted: lensingChild.accepted,
      reason: lensingChild.reason,
      sourcePath: lensingChild.sourcePath,
      lensingTransferChildId: lensingChild.lensingTransferChildId,
    },
    parentShearRsdTransfer: {
      accepted: shearRsdChild.accepted,
      reason: shearRsdChild.reason,
      sourcePath: shearRsdChild.sourcePath,
      shearRsdTransferChildId: shearRsdChild.shearRsdTransferChildId,
    },
    parentHaloClusterTransfer: {
      accepted: haloClusterChild.accepted,
      reason: haloClusterChild.reason,
      sourcePath: haloClusterChild.sourcePath,
      haloClusterTransferChildId: haloClusterChild.haloClusterTransferChildId,
    },
    sharedKeys,
    sourceEvidence,
    nonlinearModel: model,
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
    parentGrowthTransfer: output.parentGrowthTransfer,
    parentMatterPowerTransfer: output.parentMatterPowerTransfer,
    parentLensingTransfer: output.parentLensingTransfer,
    parentShearRsdTransfer: output.parentShearRsdTransfer,
    parentHaloClusterTransfer: output.parentHaloClusterTransfer,
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
    nonlinearModel: {
      computed: output.nonlinearModel.computed,
      derivedPass: output.nonlinearModel.derivedPass,
      nonlinearGridResidualPass: output.nonlinearModel.nonlinearGridResidualPass,
      noHiddenRetunePass: output.nonlinearModel.noHiddenRetunePass,
      derived: output.nonlinearModel.derived,
    },
  };
}

function evaluateSharedObservationParent(rawParent) {
  const sourcePath = rawParent.path ?? rawParent.sourcePath ?? null;
  if (!concreteString(sourcePath)) {
    return { accepted: false, reason: "missing_shared_observation_path", sourcePath };
  }
  const status = sharedObservationEvidenceStatusForPath(sourcePath, {
    repoRoot: process.cwd(),
  });
  const raw = readJsonOrNull(sourcePath);
  const growthValues = Object.fromEntries(
    (Array.isArray(raw?.sharedKeys) ? raw.sharedKeys : []).map((row) => [
      row.key,
      finiteNumberOrNull(row.projectionValues?.growth),
    ]),
  );
  return {
    ...status,
    sourcePath,
    growthValues,
    eventLedgerId: raw?.window?.eventLedgerId ?? null,
  };
}

function evaluateGrowthTransferParent(rawParent) {
  const sourcePath = rawParent.path ?? rawParent.sourcePath ?? null;
  if (!concreteString(sourcePath)) {
    return { accepted: false, reason: "missing_growth_transfer_child_path", sourcePath };
  }
  const status = growthTransferEvidenceStatusForPath(sourcePath, {
    repoRoot: process.cwd(),
  });
  const raw = readJsonOrNull(sourcePath);
  const sharedKeyValues = Object.fromEntries(
    (Array.isArray(raw?.sharedKeys) ? raw.sharedKeys : []).map((row) => [
      row.key,
      finiteNumberOrNull(row.value),
    ]),
  );
  return {
    ...status,
    sourcePath,
    raw,
    sharedKeyValues,
    growthTransferChildId: raw?.window?.growthTransferChildId ?? null,
  };
}

function evaluateMatterPowerTransferParent(rawParent) {
  const sourcePath = rawParent.path ?? rawParent.sourcePath ?? null;
  if (!concreteString(sourcePath)) {
    return {
      accepted: false,
      reason: "missing_matter_power_transfer_child_path",
      sourcePath,
    };
  }
  const status = matterPowerTransferEvidenceStatusForPath(sourcePath, {
    repoRoot: process.cwd(),
  });
  const raw = readJsonOrNull(sourcePath);
  const sharedKeyValues = Object.fromEntries(
    (Array.isArray(raw?.sharedKeys) ? raw.sharedKeys : []).map((row) => [
      row.key,
      finiteNumberOrNull(row.value),
    ]),
  );
  return {
    ...status,
    sourcePath,
    raw,
    sharedKeyValues,
    matterPowerTransferChildId: raw?.window?.matterPowerTransferChildId ?? null,
  };
}

function evaluateLensingTransferParent(rawParent) {
  const sourcePath = rawParent.path ?? rawParent.sourcePath ?? null;
  if (!concreteString(sourcePath)) {
    return {
      accepted: false,
      reason: "missing_lensing_transfer_child_path",
      sourcePath,
    };
  }
  const status = lensingTransferEvidenceStatusForPath(sourcePath, {
    repoRoot: process.cwd(),
  });
  const raw = readJsonOrNull(sourcePath);
  const sharedKeyValues = Object.fromEntries(
    (Array.isArray(raw?.sharedKeys) ? raw.sharedKeys : []).map((row) => [
      row.key,
      finiteNumberOrNull(row.value),
    ]),
  );
  return {
    ...status,
    sourcePath,
    raw,
    sharedKeyValues,
    lensingTransferChildId: raw?.window?.lensingTransferChildId ?? null,
  };
}

function evaluateShearRsdTransferParent(rawParent) {
  const sourcePath = rawParent.path ?? rawParent.sourcePath ?? null;
  if (!concreteString(sourcePath)) {
    return {
      accepted: false,
      reason: "missing_shear_rsd_transfer_child_path",
      sourcePath,
    };
  }
  const status = shearRsdTransferEvidenceStatusForPath(sourcePath, {
    repoRoot: process.cwd(),
  });
  const raw = readJsonOrNull(sourcePath);
  const sharedKeyValues = Object.fromEntries(
    (Array.isArray(raw?.sharedKeys) ? raw.sharedKeys : []).map((row) => [
      row.key,
      finiteNumberOrNull(row.value),
    ]),
  );
  return {
    ...status,
    sourcePath,
    raw,
    sharedKeyValues,
    shearRsdTransferChildId: raw?.window?.shearRsdTransferChildId ?? null,
  };
}

function evaluateHaloClusterTransferParent(rawParent) {
  const sourcePath = rawParent.path ?? rawParent.sourcePath ?? null;
  if (!concreteString(sourcePath)) {
    return {
      accepted: false,
      reason: "missing_halo_cluster_transfer_child_path",
      sourcePath,
    };
  }
  const status = haloClusterTransferEvidenceStatusForPath(sourcePath, {
    repoRoot: process.cwd(),
  });
  const raw = readJsonOrNull(sourcePath);
  const sharedKeyValues = Object.fromEntries(
    (Array.isArray(raw?.sharedKeys) ? raw.sharedKeys : []).map((row) => [
      row.key,
      finiteNumberOrNull(row.value),
    ]),
  );
  return {
    ...status,
    sourcePath,
    raw,
    sharedKeyValues,
    haloClusterTransferChildId: raw?.window?.haloClusterTransferChildId ?? null,
  };
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

function evaluateSharedKeys(
  rawKeys,
  parent,
  growthChild,
  matterChild,
  lensingChild,
  shearRsdChild,
  haloClusterChild,
  tolerances,
) {
  const keyRows = new Map(
    (Array.isArray(rawKeys) ? rawKeys : []).map((row) => [row.key, row]),
  );
  const keys = Object.fromEntries(
    EQ21_NONLINEAR_TRANSFER_KEYS.map((key) => {
      const row = keyRows.get(key);
      const check = evaluateAcceptedKey(row);
      const value = finiteNumberOrNull(row?.value);
      const parentValue = finiteNumberOrNull(parent.growthValues?.[key]);
      const growthChildValue = finiteNumberOrNull(growthChild.sharedKeyValues?.[key]);
      const matterChildValue = finiteNumberOrNull(matterChild.sharedKeyValues?.[key]);
      const lensingChildValue = finiteNumberOrNull(lensingChild.sharedKeyValues?.[key]);
      const shearRsdChildValue = finiteNumberOrNull(shearRsdChild.sharedKeyValues?.[key]);
      const haloClusterChildValue = finiteNumberOrNull(
        haloClusterChild.sharedKeyValues?.[key],
      );
      const parentMismatch =
        check.accepted &&
        value !== null &&
        parentValue !== null &&
        Math.abs(value - parentValue) > tolerances.sharedKey;
      const growthChildMismatch =
        check.accepted &&
        value !== null &&
        growthChildValue !== null &&
        Math.abs(value - growthChildValue) > tolerances.sharedKey;
      const matterChildMismatch =
        check.accepted &&
        value !== null &&
        matterChildValue !== null &&
        Math.abs(value - matterChildValue) > tolerances.sharedKey;
      const lensingChildMismatch =
        check.accepted &&
        value !== null &&
        lensingChildValue !== null &&
        Math.abs(value - lensingChildValue) > tolerances.sharedKey;
      const shearRsdChildMismatch =
        check.accepted &&
        value !== null &&
        shearRsdChildValue !== null &&
        Math.abs(value - shearRsdChildValue) > tolerances.sharedKey;
      const haloClusterChildMismatch =
        check.accepted &&
        value !== null &&
        haloClusterChildValue !== null &&
        Math.abs(value - haloClusterChildValue) > tolerances.sharedKey;
      return [
        key,
        {
          status: normalizeStatus(row),
          accepted: check.accepted,
          reason: check.reason,
          value,
          parentGrowthValue: parentValue,
          growthChildValue,
          matterChildValue,
          lensingChildValue,
          shearRsdChildValue,
          haloClusterChildValue,
          mismatch:
            parentMismatch ||
            growthChildMismatch ||
            matterChildMismatch ||
            lensingChildMismatch ||
            shearRsdChildMismatch ||
            haloClusterChildMismatch,
          mismatchSource: parentMismatch
            ? "shared_observation_parent"
            : growthChildMismatch
              ? "growth_transfer_child"
              : matterChildMismatch
                ? "matter_power_transfer_child"
                : lensingChildMismatch
                  ? "lensing_transfer_child"
                  : shearRsdChildMismatch
                    ? "shear_rsd_transfer_child"
                    : haloClusterChildMismatch
                      ? "halo_cluster_transfer_child"
                      : null,
          maxDelta:
            value !== null
              ? Math.max(
                  parentValue !== null ? Math.abs(value - parentValue) : 0,
                  growthChildValue !== null ? Math.abs(value - growthChildValue) : 0,
                  matterChildValue !== null ? Math.abs(value - matterChildValue) : 0,
                  lensingChildValue !== null ? Math.abs(value - lensingChildValue) : 0,
                  shearRsdChildValue !== null ? Math.abs(value - shearRsdChildValue) : 0,
                  haloClusterChildValue !== null
                    ? Math.abs(value - haloClusterChildValue)
                    : 0,
                )
              : null,
          sourcePath: row?.sourcePath ?? row?.source ?? null,
        },
      ];
    }),
  );
  const missingSharedKeys = EQ21_NONLINEAR_TRANSFER_KEYS.filter(
    (key) => !keys[key].accepted,
  );
  const mismatches = Object.entries(keys)
    .filter(([, value]) => value.mismatch)
    .map(([key, value]) => ({
      key,
      mismatchSource: value.mismatchSource,
      maxDelta: value.maxDelta,
      value: value.value,
      parentGrowthValue: value.parentGrowthValue,
      growthChildValue: value.growthChildValue,
      matterChildValue: value.matterChildValue,
      lensingChildValue: value.lensingChildValue,
      shearRsdChildValue: value.shearRsdChildValue,
      haloClusterChildValue: value.haloClusterChildValue,
    }));
  return {
    accepted: missingSharedKeys.length === 0,
    allExpectedKeysDeclared: EQ21_NONLINEAR_TRANSFER_KEYS.every((key) =>
      keyRows.has(key),
    ),
    missingSharedKeys,
    expectedKeys: EQ21_NONLINEAR_TRANSFER_KEYS,
    hiddenRetuneNumericPass: mismatches.length === 0,
    mismatches,
    keys,
    keyValues: Object.fromEntries(
      Object.entries(keys).map(([key, row]) => [key, row.value]),
    ),
  };
}

function evaluateModel(
  rawModel,
  matterChildRaw,
  lensingChildRaw,
  shearRsdChildRaw,
  haloClusterChildRaw,
  tolerances,
) {
  const base = evaluateNonlinearTransferModel(
    rawModel,
    matterChildRaw,
    lensingChildRaw,
    shearRsdChildRaw,
    haloClusterChildRaw,
  );
  if (!base.computed) {
    return {
      ...base,
      derivedPass: false,
      nonlinearGridResidualPass: false,
      noHiddenRetunePass: false,
    };
  }
  const derivedMismatches = [];
  compareDerived(rawModel.derived ?? {}, base.derived, tolerances, derivedMismatches);
  const residualActual = finiteNumberOrNull(
    rawModel.residualComponents?.nonlinear_grid_normalized ??
      rawModel.nonlinear_grid_normalized,
  );
  const residualExpected = base.derived.nonlinear_grid_normalized_residual;
  const nonlinearGridResidualPass =
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
    nonlinearGridResidualPass,
    nonlinearGridResidualActual: residualActual,
    noHiddenRetunePass: retune !== null && retune <= tolerances.retune,
    noHiddenRetuneResidual: retune,
  };
}

function compareDerived(actual, expected, tolerances, mismatches) {
  for (const [key, expectedValue] of Object.entries(expected)) {
    if (key === "samples" || key === "nonlinear_grid_normalized_residual") {
      continue;
    }
    const actualValue = finiteNumberOrNull(actual[key]);
    if (actualValue === null || Math.abs(actualValue - expectedValue) > tolerances.derived) {
      mismatches.push({ key, actual: actualValue, expected: expectedValue });
    }
  }
  const actualSamples = Array.isArray(actual.samples) ? actual.samples : [];
  if (actualSamples.length !== expected.samples.length) {
    mismatches.push({
      key: "samples.length",
      actual: actualSamples.length,
      expected: expected.samples.length,
    });
    return;
  }
  const actualById = new Map(actualSamples.map((sample) => [sample.sampleId, sample]));
  for (const expectedSample of expected.samples) {
    const actualSample = actualById.get(expectedSample.sampleId);
    if (!actualSample) {
      mismatches.push({ key: `samples.${expectedSample.sampleId}`, actual: null });
      continue;
    }
    for (const [key, expectedValue] of Object.entries(expectedSample)) {
      if (key === "sampleId" || key === "nonlinear_normalized_residual") {
        continue;
      }
      if (typeof expectedValue === "string") {
        if (actualSample[key] !== expectedValue) {
          mismatches.push({
            key: `samples.${expectedSample.sampleId}.${key}`,
            actual: actualSample[key] ?? null,
            expected: expectedValue,
          });
        }
        continue;
      }
      const actualValue = finiteNumberOrNull(actualSample[key]);
      if (actualValue === null || Math.abs(actualValue - expectedValue) > tolerances.derived) {
        mismatches.push({
          key: `samples.${expectedSample.sampleId}.${key}`,
          actual: actualValue,
          expected: expectedValue,
        });
      }
    }
  }
}

function evaluateSourceEvidence({ rows, sharedKeys, model }) {
  const rowEntries = EQ21_NONLINEAR_TRANSFER_ROWS.map((rowId) =>
    evaluateSourceEvidenceEntry({
      scope: "row",
      id: rowId,
      status: rows[rowId]?.status ?? rows[rowId]?.retainedStatus ?? null,
      sourcePath: rows[rowId]?.sourcePath ?? rows[rowId]?.source ?? null,
    }),
  );
  const keyEntries = EQ21_NONLINEAR_TRANSFER_KEYS.map((key) =>
    evaluateSourceEvidenceEntry({
      scope: "shared_key",
      id: key,
      status: sharedKeys.keys[key]?.status,
      sourcePath: sharedKeys.keys[key]?.sourcePath,
    }),
  );
  const modelEntries = [
    evaluateSourceEvidenceEntry({
      scope: "model_input",
      id: "nonlinearTransfer",
      status: model.nonlinearTransfer?.status ?? null,
      sourcePath:
        model.nonlinearTransfer?.sourcePath ?? model.nonlinearTransfer?.source ?? null,
    }),
  ];
  const entries = [...rowEntries, ...keyEntries, ...modelEntries];
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
  const evidence = nonlinearTransferEvidenceStatusForPath(sourcePath, {
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

function decideStatus({
  missingRows,
  sourceEvidence,
  parent,
  growthChild,
  matterChild,
  lensingChild,
  shearRsdChild,
  haloClusterChild,
  sharedKeys,
  model,
}) {
  if (missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  if (!sourceEvidence.passed) {
    return "blocked_source_evidence";
  }
  if (!parent.accepted) {
    return "blocked_parent_shared_observation";
  }
  if (!growthChild.accepted) {
    return "blocked_parent_growth_transfer_child";
  }
  if (!matterChild.accepted) {
    return "blocked_parent_matter_power_transfer_child";
  }
  if (!lensingChild.accepted) {
    return "blocked_parent_lensing_transfer_child";
  }
  if (!shearRsdChild.accepted) {
    return "blocked_parent_shear_rsd_transfer_child";
  }
  if (!haloClusterChild.accepted) {
    return "blocked_parent_halo_cluster_transfer_child";
  }
  if (!sharedKeys.accepted) {
    return "blocked_missing_shared_keys";
  }
  if (!sharedKeys.hiddenRetuneNumericPass) {
    return "blocked_hidden_retune";
  }
  if (!model.computed) {
    return "blocked_nonlinear_model_not_computed";
  }
  if (!model.derivedPass) {
    return "blocked_nonlinear_model_derived_mismatch";
  }
  if (!model.nonlinearGridResidualPass) {
    return "blocked_nonlinear_grid_residual";
  }
  if (!model.noHiddenRetunePass) {
    return "blocked_no_hidden_retune";
  }
  return "populated";
}

function firstBlocker({
  status,
  missingRows,
  sourceEvidence,
  parent,
  growthChild,
  matterChild,
  lensingChild,
  shearRsdChild,
  haloClusterChild,
  sharedKeys,
  model,
}) {
  if (status === "populated") {
    return null;
  }
  if (missingRows.length > 0) {
    return `missing_accepted_${missingRows[0]}`;
  }
  if (!sourceEvidence.passed) {
    return "accepted_without_nonlinear_transfer_evidence";
  }
  if (!parent.accepted) {
    return `parent_shared_observation_${parent.reason}`;
  }
  if (!growthChild.accepted) {
    return `parent_growth_transfer_${growthChild.reason}`;
  }
  if (!matterChild.accepted) {
    return `parent_matter_power_transfer_${matterChild.reason}`;
  }
  if (!lensingChild.accepted) {
    return `parent_lensing_transfer_${lensingChild.reason}`;
  }
  if (!shearRsdChild.accepted) {
    return `parent_shear_rsd_transfer_${shearRsdChild.reason}`;
  }
  if (!haloClusterChild.accepted) {
    return `parent_halo_cluster_transfer_${haloClusterChild.reason}`;
  }
  if (!sharedKeys.accepted) {
    return `missing_accepted_shared_key_${sharedKeys.missingSharedKeys[0]}`;
  }
  if (!sharedKeys.hiddenRetuneNumericPass) {
    return `hidden_retune_${sharedKeys.mismatches[0]?.key ?? "shared_key"}`;
  }
  if (!model.computed) {
    return model.reason ?? "nonlinear_model_not_computed";
  }
  if (!model.derivedPass) {
    return `nonlinear_model_derived_mismatch_${model.derivedMismatches[0]?.key ?? "unknown"}`;
  }
  if (!model.nonlinearGridResidualPass) {
    return "nonlinear_grid_residual_failed";
  }
  if (!model.noHiddenRetunePass) {
    return "nonlinear_child_hidden_retune";
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
  growthChild,
  matterChild,
  lensingChild,
  shearRsdChild,
  haloClusterChild,
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
  if (nextBlocker === "accepted_without_nonlinear_transfer_evidence") {
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
  if (nextBlocker.startsWith("parent_growth_transfer_")) {
    return growthChild;
  }
  if (nextBlocker.startsWith("parent_matter_power_transfer_")) {
    return matterChild;
  }
  if (nextBlocker.startsWith("parent_lensing_transfer_")) {
    return lensingChild;
  }
  if (nextBlocker.startsWith("parent_shear_rsd_transfer_")) {
    return shearRsdChild;
  }
  if (nextBlocker.startsWith("parent_halo_cluster_transfer_")) {
    return haloClusterChild;
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
      reason: "shared_key_value_differs_from_parent_growth_projection_or_child",
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
  const evidence = nonlinearTransferEvidenceStatusForPath(
    row.sourcePath ?? row.source ?? null,
    { repoRoot: process.cwd() },
  );
  if (!evidence.accepted) {
    return {
      accepted: false,
      reason: `nonlinear_${evidence.reason}`,
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
  const evidence = nonlinearTransferEvidenceStatusForPath(
    row.sourcePath ?? row.source ?? null,
    { repoRoot: process.cwd() },
  );
  if (!evidence.accepted) {
    return {
      accepted: false,
      reason: `nonlinear_${evidence.reason}`,
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
