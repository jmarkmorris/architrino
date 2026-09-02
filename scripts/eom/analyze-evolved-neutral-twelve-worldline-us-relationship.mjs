#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  EVOLVED_NEUTRAL_TWELVE_WORLDLINE_US_RESULT_SCHEMA,
  evaluateEvolvedNeutralTwelveWorldlineUsRelationship,
  summarizeEvolvedUsRows,
  validateEvolvedNeutralTwelveWorldlineUsProtocol,
} from "../../src/eom-analysis/EvolvedNeutralTwelveWorldlineUsRelationship.mjs";

export const EVOLVED_NEUTRAL_TWELVE_WORLDLINE_US_STUDY_SCHEMA =
  "eom-analysis/evolved-neutral-twelve-worldline-us-study.v1";
export const EVOLVED_NEUTRAL_TWELVE_WORLDLINE_US_STUDY_RESULT_SCHEMA =
  "eom-analysis/evolved-neutral-twelve-worldline-us-study-result.v1";

function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value).sort().map((key) => [key, canonical(value[key])]),
    );
  }
  return value;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function sha256Canonical(value) {
  return sha256(JSON.stringify(canonical(value)));
}

function concreteString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new TypeError(`${label} must be a nonempty string.`);
  }
  return value;
}

function readJson(filePath, label) {
  let bytes;
  try {
    bytes = readFileSync(filePath);
  } catch (error) {
    throw new Error(`${label} could not be read at ${filePath}: ${error.message}`);
  }
  let value;
  try {
    value = JSON.parse(bytes);
  } catch (error) {
    throw new Error(`${label} is not valid JSON: ${error.message}`);
  }
  return { bytes, value };
}

function resolveBoundArtifact(raw, baseDirectory, label) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new TypeError(`${label} must bind an artifact.`);
  }
  const artifactPath = concreteString(raw.artifactPath, `${label}.artifactPath`);
  const expectedSha256 = concreteString(raw.sha256, `${label}.sha256`);
  if (!/^[0-9a-f]{64}$/u.test(expectedSha256)) {
    throw new TypeError(`${label}.sha256 must be a lowercase SHA-256 digest.`);
  }
  const resolvedPath = path.resolve(baseDirectory, artifactPath);
  const bytes = readFileSync(resolvedPath);
  const actualSha256 = sha256(bytes);
  if (actualSha256 !== expectedSha256) {
    throw new Error(
      `${label} hash mismatch: expected ${expectedSha256}, received ${actualSha256}.`,
    );
  }
  return {
    artifactPath,
    sha256: actualSha256,
  };
}

function validateQualification(raw, baseDirectory) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new TypeError("study.qualification must be an object.");
  }
  const declarations = [
    ["prehistoryCollapse", "passed"],
    ["rootClearance", "certified_complete"],
    ["refinement", "passed"],
    ["independentOracle", "passed"],
  ];
  return Object.fromEntries(declarations.map(([field, requiredStatus]) => {
    const row = raw[field];
    if (row?.status !== requiredStatus) {
      throw new Error(
        `study.qualification.${field}.status must be ${requiredStatus}.`,
      );
    }
    return [field, {
      status: requiredStatus,
      ...resolveBoundArtifact(
        row,
        baseDirectory,
        `study.qualification.${field}`,
      ),
    }];
  }));
}

function validateRunGrid(runs) {
  if (!Array.isArray(runs) || runs.length === 0) {
    throw new TypeError("study.runs must be a nonempty array.");
  }
  const prehistories = [...new Set(runs.map((run, index) =>
    concreteString(run?.prehistoryId, `study.runs[${index}].prehistoryId`)))].sort();
  const refinements = [...new Set(runs.map((run, index) =>
    concreteString(run?.refinementId, `study.runs[${index}].refinementId`)))].sort();
  if (prehistories.length < 3) {
    throw new RangeError(
      "study requires at least three materially different prehistory ids.",
    );
  }
  if (refinements.length < 2) {
    throw new RangeError("study requires at least two refinement ids.");
  }
  const combinations = new Set();
  runs.forEach((run, index) => {
    const key = `${run.prehistoryId}\u0000${run.refinementId}`;
    if (combinations.has(key)) {
      throw new TypeError(
        `study duplicates prehistory/refinement coordinate at runs[${index}].`,
      );
    }
    combinations.add(key);
  });
  for (const prehistoryId of prehistories) {
    for (const refinementId of refinements) {
      if (!combinations.has(`${prehistoryId}\u0000${refinementId}`)) {
        throw new Error(
          `study lacks ${prehistoryId}/${refinementId}; the collapse/refinement ` +
          "grid must be Cartesian-complete.",
        );
      }
    }
  }
  return { prehistories, refinements };
}

function groupRows(rows, key) {
  const grouped = new Map();
  for (const row of rows) {
    const value = row[key];
    const current = grouped.get(value) ?? [];
    current.push(row);
    grouped.set(value, current);
  }
  return grouped;
}

function summarizeGroups(rows, key, minimumPower) {
  return Object.fromEntries(
    [...groupRows(rows, key).entries()]
      .sort(([left], [right]) => String(left).localeCompare(String(right)))
      .map(([value, group]) => [
        value,
        summarizeEvolvedUsRows(group, minimumPower),
      ]),
  );
}

export function evaluateEvolvedNeutralTwelveWorldlineUsStudy({
  study,
  baseDirectory,
}) {
  if (!study || typeof study !== "object" || Array.isArray(study)) {
    throw new TypeError("evolved neutral twelve-worldline U-S study must be an object.");
  }
  if (study.schema !== EVOLVED_NEUTRAL_TWELVE_WORLDLINE_US_STUDY_SCHEMA) {
    throw new TypeError(
      `study.schema must be ${EVOLVED_NEUTRAL_TWELVE_WORLDLINE_US_STUDY_SCHEMA}.`,
    );
  }
  const resolvedBase = path.resolve(baseDirectory);
  const studyId = concreteString(study.studyId, "study.studyId");
  const branchId = concreteString(study.branchId, "study.branchId");
  const protocol = validateEvolvedNeutralTwelveWorldlineUsProtocol(study.protocol);
  const qualification = validateQualification(study.qualification, resolvedBase);
  const grid = validateRunGrid(study.runs);
  const runIds = new Set();
  const results = study.runs.map((run, index) => {
    const recordBinding = resolveBoundArtifact(
      {
        artifactPath: run.recordPath,
        sha256: run.recordSha256,
      },
      resolvedBase,
      `study.runs[${index}].record`,
    );
    const resolvedRecordPath = path.resolve(resolvedBase, recordBinding.artifactPath);
    const { value: record } = readJson(
      resolvedRecordPath,
      `study.runs[${index}].record`,
    );
    const result = evaluateEvolvedNeutralTwelveWorldlineUsRelationship({ record, protocol });
    if (result.schema !== EVOLVED_NEUTRAL_TWELVE_WORLDLINE_US_RESULT_SCHEMA) {
      throw new Error(`study.runs[${index}] returned an unexpected result schema.`);
    }
    if (runIds.has(result.source.runId)) {
      throw new TypeError(`study repeats EOM runId ${result.source.runId}.`);
    }
    runIds.add(result.source.runId);
    return {
      prehistoryId: run.prehistoryId,
      refinementId: run.refinementId,
      record: recordBinding,
      result,
    };
  });
  const generatingSpecs = new Set(
    results.map((run) => run.result.source.generatingSpec),
  );
  if (generatingSpecs.size !== 1) {
    throw new Error(
      "all study runs must bind the same neutral twelve-worldline campaign generatingSpec.",
    );
  }
  const rows = results.flatMap((run) => run.result.rows.map((row) => ({
    branchId,
    runId: run.result.source.runId,
    prehistoryId: run.prehistoryId,
    refinementId: run.refinementId,
    ...row,
  })));
  const minimumPower = protocol.minimumPower;
  const resultWithoutHash = {
    schema: EVOLVED_NEUTRAL_TWELVE_WORLDLINE_US_STUDY_RESULT_SCHEMA,
    studyId,
    branchId,
    configurationKind: protocol.configurationKind,
    configurationId: protocol.configurationId,
    claimGrade: "measured",
    qualification,
    grid: {
      prehistoryIds: grid.prehistories,
      refinementIds: grid.refinements,
      runCount: results.length,
      cartesianComplete: true,
    },
    protocol: study.protocol,
    runs: results,
    summary: {
      pooled: summarizeEvolvedUsRows(rows, minimumPower),
      byRadius: summarizeGroups(rows, "radius", minimumPower),
      byPrehistory: summarizeGroups(rows, "prehistoryId", minimumPower),
      byRefinement: summarizeGroups(rows, "refinementId", minimumPower),
      maximumQuadratureRelativeDifference: {
        finiteRatio: Math.max(
          0,
          ...rows.map((row) =>
            row.quadratureRelativeDifference.finiteRatio ?? 0),
        ),
        farRatio: Math.max(
          0,
          ...rows.map((row) =>
            row.quadratureRelativeDifference.farRatio ?? 0),
        ),
      },
      minimumEmissionTime: Math.min(
        ...results.map((run) => run.result.summary.minimumEmissionTime),
      ),
      maximumAbsoluteRootResidual: Math.max(
        ...results.map((run) =>
          run.result.summary.maximumAbsoluteRootResidual),
      ),
    },
    eligibilityBoundary:
      "The study verifies exact hashes and required status tokens for the " +
      "campaign qualification artifacts. The owning campaign and its independent " +
      "acceptance instruments, not this consumer, establish the semantics of " +
      "prehistory collapse, root clearance, refinement, and oracle parity.",
    claimBoundary:
      "This result measures whether exact exterior angular ratios track the " +
      "same-row U-S predictor across the qualified evolved records. It does not " +
      "establish persistence, binding, stability, energy, particle identity, or " +
      "canonical authority.",
  };
  return {
    ...resultWithoutHash,
    resultHash: sha256Canonical(resultWithoutHash),
  };
}

function parseArguments(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--study") options.studyPath = argv[++index];
    else if (argument === "--out") options.outputPath = argv[++index];
    else throw new TypeError(`unknown argument ${argument}`);
  }
  if (!options.studyPath || !options.outputPath) {
    throw new TypeError(
      "usage: analyze-evolved-neutral-twelve-worldline-us-relationship.mjs " +
      "--study <study.json> --out <result.json>",
    );
  }
  return options;
}

function writeJsonAtomic(outputPath, value) {
  mkdirSync(path.dirname(outputPath), { recursive: true });
  const temporaryPath = `${outputPath}.tmp`;
  writeFileSync(temporaryPath, `${JSON.stringify(value, null, 2)}\n`);
  renameSync(temporaryPath, outputPath);
}

function main(argv) {
  const options = parseArguments(argv);
  const studyPath = path.resolve(options.studyPath);
  const { value: study } = readJson(studyPath, "study");
  const result = evaluateEvolvedNeutralTwelveWorldlineUsStudy({
    study,
    baseDirectory: path.dirname(studyPath),
  });
  const outputPath = path.resolve(options.outputPath);
  writeJsonAtomic(outputPath, result);
  process.stdout.write(
    `evolved neutral twelve-worldline U-S study written: ${outputPath}\n` +
    `runs=${result.grid.runCount} rows=${result.summary.pooled.rowRadiusCount} ` +
    `hash=${result.resultHash}\n`,
  );
}

const isCli = process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    process.stderr.write(`${error.stack ?? error.message}\n`);
    process.exitCode = 1;
  }
}
