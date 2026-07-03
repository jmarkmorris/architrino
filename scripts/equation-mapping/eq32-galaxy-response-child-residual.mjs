#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import {
  EQ32_GALAXY_RESPONSE_KEYS,
  EQ32_GALAXY_RESPONSE_ROWS,
  evaluateGalaxyResponseModel,
  galaxyResponseEvidenceStatusForPath,
} from "./eq32-galaxy-response-evidence.mjs";
import { sharedObservationEvidenceStatusForPath } from "./shared-observation-evidence.mjs";
import { outputProjectionEvidenceStatusForPath } from "../spacetime/noether-sea-density-compression-output-projection-evidence.mjs";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const DEFAULT_INPUT_PATH = path.join(
  SCRIPT_DIR,
  "eq32-galaxy-response-child-attempt.v1.json",
);
const INPUT_SCHEMA = "aaa-equation-map-eq32-galaxy-response-child-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-eq32-galaxy-response-child-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";
const DEFAULT_TOLERANCES = {
  residual: 1,
  btfr: 1,
  highAcceleration: 1,
  lensing: 1e-12,
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
const output = evaluateEq32GalaxyResponseChild(input, inputPath);
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
  console.log(`Usage: node scripts/equation-mapping/eq32-galaxy-response-child-residual.mjs [options]

Options:
  --input PATH          EQ-32 galaxy-response child input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the residual is populated.
  --help                Show this help.

This checker evaluates the score-neutral EQ-32 predictive galaxy-response
child. It consumes the accepted shared-observation parent and accepted
delta_a_star output projection; it does not raise equation scores.`);
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

function evaluateEq32GalaxyResponseChild(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const packet = input.packet ?? input;
  const rows = packet.rows ?? {};
  const rowChecks = Object.fromEntries(
    EQ32_GALAXY_RESPONSE_ROWS.map((rowId) => [
      rowId,
      evaluateAcceptedRow(rows[rowId]),
    ]),
  );
  const missingRows = EQ32_GALAXY_RESPONSE_ROWS.filter(
    (rowId) => !rowChecks[rowId].accepted,
  );
  const parent = evaluateSharedObservationParent(
    input.sharedObservation ?? packet.sharedObservation ?? {},
  );
  const outputProjection = evaluateOutputProjectionParent(
    input.outputProjection ?? packet.outputProjection ?? {},
  );
  const sharedKeys = evaluateSharedKeys(
    packet.sharedKeys ?? [],
    parent,
    tolerances,
  );
  const model = evaluateModel(
    packet.model ?? {},
    sharedKeys.values,
    outputProjection.raw,
    tolerances,
  );
  const sourceEvidence = evaluateSourceEvidence({
    rows,
    sharedKeys: packet.sharedKeys ?? [],
    model: packet.model ?? {},
  });
  const status = decideStatus({
    missingRows,
    parent,
    outputProjection,
    sharedKeys,
    model,
    sourceEvidence,
  });
  const nextBlocker = firstBlocker({
    status,
    missingRows,
    parent,
    outputProjection,
    sharedKeys,
    model,
    sourceEvidence,
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
      row: "EQ-32",
      childConsumer: "galaxy_response",
      claimLevel:
        "score-neutral predictive galaxy-response child; accepted shared-observation and delta_a_star evidence are required before score review",
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
        parent,
        outputProjection,
        sharedKeys,
        model,
        sourceEvidence,
      }),
      missingRows,
      missingSharedKeys: sharedKeys.missingSharedKeys,
      sharedKeyMismatchCount: sharedKeys.mismatches.length,
      sourceEvidenceAccepted: sourceEvidence.passed,
      sourceEvidenceFailureCount: sourceEvidence.failures.length,
      parentSharedObservationAccepted: parent.accepted,
      parentSharedObservationReason: parent.reason,
      parentOutputProjectionAccepted: outputProjection.accepted,
      parentOutputProjectionReason: outputProjection.reason,
      deltaAStarAccepted: outputProjection.deltaAStar !== null,
      sharedKeysAccepted: sharedKeys.accepted,
      hiddenRetuneNumericPass: sharedKeys.hiddenRetuneNumericPass,
      modelComputed: model.computed,
      modelDerivedPass: model.derivedPass,
      rarGridResidualPass: model.rarGridResidualPass,
      btfrLowAccelerationPass: model.btfrLowAccelerationPass,
      highAccelerationRecoveryPass: model.highAccelerationRecoveryPass,
      lensingDynamicsSplitPass: model.lensingDynamicsSplitPass,
      noHiddenRetunePass: model.noHiddenRetunePass,
      sampleCount: model.derived?.sample_count ?? 0,
      rarGridNormalizedResidual:
        model.derived?.rar_grid_normalized_residual ?? null,
      btfrLowAccelerationResidual:
        model.derived?.btfr_low_acceleration_residual ?? null,
      highAccelerationRecoveryResidual:
        model.derived?.high_acceleration_recovery_residual ?? null,
      lensingDynamicsSplit: model.derived?.lensing_dynamics_split ?? null,
    },
    rows: Object.fromEntries(
      EQ32_GALAXY_RESPONSE_ROWS.map((rowId) => [
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
    parentOutputProjection: {
      accepted: outputProjection.accepted,
      reason: outputProjection.reason,
      sourcePath: outputProjection.sourcePath,
      deltaAStar: outputProjection.deltaAStar,
    },
    sharedKeys,
    sourceEvidence,
    galaxyResponseModel: model,
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
    parentOutputProjection: output.parentOutputProjection,
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
    galaxyResponseModel: {
      computed: output.galaxyResponseModel.computed,
      derivedPass: output.galaxyResponseModel.derivedPass,
      rarGridResidualPass: output.galaxyResponseModel.rarGridResidualPass,
      btfrLowAccelerationPass: output.galaxyResponseModel.btfrLowAccelerationPass,
      highAccelerationRecoveryPass:
        output.galaxyResponseModel.highAccelerationRecoveryPass,
      lensingDynamicsSplitPass:
        output.galaxyResponseModel.lensingDynamicsSplitPass,
      noHiddenRetunePass: output.galaxyResponseModel.noHiddenRetunePass,
      derived: output.galaxyResponseModel.derived,
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
  const rarValues = Object.fromEntries(
    (Array.isArray(raw?.sharedKeys) ? raw.sharedKeys : []).map((row) => [
      row.key,
      finiteNumberOrNull(row.projectionValues?.RAR),
    ]),
  );
  return {
    ...status,
    sourcePath,
    raw,
    rarValues,
    eventLedgerId: raw?.window?.eventLedgerId ?? null,
  };
}

function evaluateOutputProjectionParent(rawParent) {
  const sourcePath = rawParent.path ?? rawParent.sourcePath ?? null;
  if (!concreteString(sourcePath)) {
    return { accepted: false, reason: "missing_output_projection_path", sourcePath };
  }
  const status = outputProjectionEvidenceStatusForPath(sourcePath, {
    repoRoot: process.cwd(),
  });
  const raw = readJsonOrNull(sourcePath);
  return {
    ...status,
    sourcePath,
    raw,
    deltaAStar: acceptedOutputValue(raw, "delta_a_star"),
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

function evaluateSharedKeys(rawKeys, parent, tolerances) {
  const keyRows = new Map(
    (Array.isArray(rawKeys) ? rawKeys : []).map((row) => [row.key, row]),
  );
  const keys = Object.fromEntries(
    EQ32_GALAXY_RESPONSE_KEYS.map((key) => {
      const row = keyRows.get(key);
      const check = evaluateAcceptedKey(row);
      const value = finiteNumberOrNull(row?.value);
      const parentValue = finiteNumberOrNull(parent.rarValues?.[key]);
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
          parentRarValue: parentValue,
          mismatch,
          maxDelta:
            value !== null && parentValue !== null
              ? Math.abs(value - parentValue)
              : null,
          sourcePath: row?.sourcePath ?? row?.source ?? null,
        },
      ];
    }),
  );
  const missingSharedKeys = EQ32_GALAXY_RESPONSE_KEYS.filter(
    (key) => !keys[key].accepted,
  );
  const mismatches = EQ32_GALAXY_RESPONSE_KEYS.filter((key) => keys[key].mismatch)
    .map((key) => ({
      key,
      value: keys[key].value,
      parentRarValue: keys[key].parentRarValue,
      maxDelta: keys[key].maxDelta,
    }));
  return {
    accepted: missingSharedKeys.length === 0,
    hiddenRetuneNumericPass: mismatches.length === 0,
    missingSharedKeys,
    mismatches,
    values: Object.fromEntries(
      Object.entries(keys).map(([key, row]) => [key, row.value]),
    ),
    keys,
  };
}

function evaluateModel(rawModel, keyValues, outputProjection, tolerances) {
  const evaluated = evaluateGalaxyResponseModel(rawModel, keyValues, outputProjection);
  if (!evaluated.computed) {
    return {
      ...evaluated,
      derivedPass: false,
      rarGridResidualPass: false,
      btfrLowAccelerationPass: false,
      highAccelerationRecoveryPass: false,
      lensingDynamicsSplitPass: false,
      noHiddenRetunePass: false,
    };
  }
  const derived = evaluated.derived;
  return {
    ...evaluated,
    derivedPass: true,
    rarGridResidualPass:
      derived.rar_grid_normalized_residual <= tolerances.residual,
    btfrLowAccelerationPass:
      derived.btfr_low_acceleration_residual <= tolerances.btfr,
    highAccelerationRecoveryPass:
      derived.high_acceleration_recovery_residual <= tolerances.highAcceleration,
    lensingDynamicsSplitPass:
      derived.lensing_dynamics_split <= tolerances.lensing,
    noHiddenRetunePass: true,
  };
}

function evaluateSourceEvidence({ rows, sharedKeys, model }) {
  const failures = [];
  for (const rowId of EQ32_GALAXY_RESPONSE_ROWS) {
    const sourcePath = rows[rowId]?.sourcePath ?? rows[rowId]?.source ?? null;
    const status = galaxyResponseEvidenceStatusForPath(sourcePath, {
      repoRoot: process.cwd(),
    });
    if (!status.accepted) {
      failures.push({
        id: `rows.${rowId}`,
        reason: status.reason,
        sourcePath,
      });
    }
  }
  for (const key of sharedKeys) {
    const sourcePath = key?.sourcePath ?? key?.source ?? null;
    const status = galaxyResponseEvidenceStatusForPath(sourcePath, {
      repoRoot: process.cwd(),
    });
    if (!status.accepted) {
      failures.push({
        id: `sharedKeys.${key?.key ?? "unknown"}`,
        reason: status.reason,
        sourcePath,
      });
    }
  }
  const modelSourcePath =
    model.galaxyResponse?.sourcePath ?? model.sourcePath ?? null;
  const modelSource = galaxyResponseEvidenceStatusForPath(modelSourcePath, {
    repoRoot: process.cwd(),
  });
  if (!modelSource.accepted) {
    failures.push({
      id: "model.galaxyResponse",
      reason: modelSource.reason,
      sourcePath: modelSourcePath,
    });
  }
  return {
    passed: failures.length === 0,
    failures,
    firstFailure: failures[0] ?? null,
  };
}

function decideStatus({
  missingRows,
  parent,
  outputProjection,
  sharedKeys,
  model,
  sourceEvidence,
}) {
  if (missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  if (!parent.accepted) {
    return "blocked_parent_shared_observation";
  }
  if (!outputProjection.accepted) {
    return "blocked_parent_output_projection";
  }
  if (!sharedKeys.accepted) {
    return "blocked_shared_keys";
  }
  if (!sharedKeys.hiddenRetuneNumericPass) {
    return "blocked_hidden_retune";
  }
  if (!sourceEvidence.passed) {
    return "blocked_source_evidence";
  }
  if (!model.computed) {
    return "blocked_model";
  }
  if (!model.rarGridResidualPass) {
    return "blocked_rar_grid_residual";
  }
  if (!model.btfrLowAccelerationPass) {
    return "blocked_btfr_low_acceleration";
  }
  if (!model.highAccelerationRecoveryPass) {
    return "blocked_high_acceleration_recovery";
  }
  if (!model.lensingDynamicsSplitPass) {
    return "blocked_lensing_dynamics_split";
  }
  return "populated";
}

function firstBlocker({
  status,
  missingRows,
  parent,
  outputProjection,
  sharedKeys,
  model,
  sourceEvidence,
}) {
  if (status === "populated") {
    return null;
  }
  if (missingRows.length > 0) {
    return `missing_accepted_${missingRows[0]}`;
  }
  if (!parent.accepted) {
    return `parent_shared_observation_${parent.reason}`;
  }
  if (!outputProjection.accepted) {
    return `parent_output_projection_${outputProjection.reason}`;
  }
  if (!sharedKeys.accepted) {
    return `missing_accepted_shared_key_${sharedKeys.missingSharedKeys[0]}`;
  }
  if (!sharedKeys.hiddenRetuneNumericPass) {
    return `hidden_retune_${sharedKeys.mismatches[0]?.key ?? "shared_key"}`;
  }
  if (!sourceEvidence.passed) {
    return `source_evidence_${sourceEvidence.firstFailure?.reason ?? "rejected"}`;
  }
  if (!model.computed) {
    return model.reason ?? "model_not_computed";
  }
  if (!model.rarGridResidualPass) {
    return "rar_grid_residual_failed";
  }
  if (!model.btfrLowAccelerationPass) {
    return "btfr_low_acceleration_failed";
  }
  if (!model.highAccelerationRecoveryPass) {
    return "high_acceleration_recovery_failed";
  }
  if (!model.lensingDynamicsSplitPass) {
    return "lensing_dynamics_split_failed";
  }
  return "unknown_blocker";
}

function firstBlockerDetails({
  nextBlocker,
  missingRows,
  rows,
  rowChecks,
  parent,
  outputProjection,
  sharedKeys,
  model,
  sourceEvidence,
}) {
  if (!nextBlocker) {
    return null;
  }
  const missingRow = missingRows[0];
  if (missingRow) {
    return {
      blocker: nextBlocker,
      row: missingRow,
      reason: rowChecks[missingRow]?.reason ?? null,
      status: normalizeStatus(rows[missingRow]),
      sourcePath: rows[missingRow]?.sourcePath ?? rows[missingRow]?.source ?? null,
    };
  }
  if (!parent.accepted) {
    return { blocker: nextBlocker, parent };
  }
  if (!outputProjection.accepted) {
    return {
      blocker: nextBlocker,
      outputProjection: {
        accepted: outputProjection.accepted,
        reason: outputProjection.reason,
        sourcePath: outputProjection.sourcePath,
      },
    };
  }
  if (sharedKeys.missingSharedKeys.length > 0) {
    const key = sharedKeys.missingSharedKeys[0];
    return {
      blocker: nextBlocker,
      key,
      details: sharedKeys.keys[key],
    };
  }
  if (sharedKeys.mismatches.length > 0) {
    return {
      blocker: nextBlocker,
      mismatch: sharedKeys.mismatches[0],
    };
  }
  if (!sourceEvidence.passed) {
    return { blocker: nextBlocker, firstFailure: sourceEvidence.firstFailure };
  }
  if (!model.computed) {
    return { blocker: nextBlocker, reason: model.reason };
  }
  return { blocker: nextBlocker };
}

function evaluateAcceptedRow(row) {
  if (!acceptedRow(row)) {
    return { accepted: false, reason: "row_not_accepted" };
  }
  const sourcePath = row.sourcePath ?? row.source ?? null;
  const sourceStatus = galaxyResponseEvidenceStatusForPath(sourcePath, {
    repoRoot: process.cwd(),
  });
  if (!sourceStatus.accepted) {
    return { accepted: false, reason: sourceStatus.reason };
  }
  return { accepted: true, reason: "accepted" };
}

function evaluateAcceptedKey(row) {
  if (!acceptedRow(row)) {
    return { accepted: false, reason: "key_not_accepted" };
  }
  if (finiteNumberOrNull(row.value) === null) {
    return { accepted: false, reason: "key_value_not_numeric" };
  }
  const sourcePath = row.sourcePath ?? row.source ?? null;
  const sourceStatus = galaxyResponseEvidenceStatusForPath(sourcePath, {
    repoRoot: process.cwd(),
  });
  if (!sourceStatus.accepted) {
    return { accepted: false, reason: sourceStatus.reason };
  }
  return { accepted: true, reason: "accepted" };
}

function parseTolerances(raw) {
  return {
    ...DEFAULT_TOLERANCES,
    ...Object.fromEntries(
      Object.entries(raw).filter(([, value]) => Number.isFinite(Number(value))),
    ),
  };
}

function acceptedOutputValue(raw, rowId) {
  const row = raw?.rows?.[rowId];
  if (!acceptedRow(row)) {
    return null;
  }
  return finiteNumberOrNull(row.value);
}

function acceptedRow(value) {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    ACCEPTED_STATUSES.has(value.status ?? value.retainedStatus ?? null)
  );
}

function normalizeStatus(value) {
  return value?.status ?? value?.retainedStatus ?? null;
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
