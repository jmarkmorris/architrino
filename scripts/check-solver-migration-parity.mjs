#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const options = parseArgs(args);

if (options.help) {
  printUsage(0);
}

const rootDir = process.cwd();
const defaultManifestPath = path.join(rootDir, ".tmp", "solver-baseline-sandbox", "manifest.json");
const defaultOutputPath = path.join(
  rootDir,
  ".tmp",
  "solver-migration-parity",
  "solver-migration-parity-report.json"
);
const manifestPath = path.resolve(options.manifestPath ?? defaultManifestPath);
const outputPath = path.resolve(options.outputPath ?? defaultOutputPath);
const classificationVocabulary = [
  "baseline_within_tolerance",
  "baseline_refined_result",
  "baseline_model_boundary_difference",
  "baseline_investigation_required_mismatch",
];

const migrationPlan = [
  {
    appId: "animator",
    order: 1,
    requiredCases: [
      "animator-causal-root-smoke",
      "animator-path-history-smoke",
      "animator-motion-dynamic-replay-smoke",
      "animator-worker-solver-bridge-smoke",
    ],
  },
  {
    appId: "photon",
    order: 2,
    requiredCases: [
      "photon-causal-root-smoke",
      "photon-causal-root-facade-smoke",
      "photon-causal-root-wasm-client-smoke",
      "photon-circular-source-roots-hits-ledger-facade-smoke",
      "photon-circular-source-roots-hits-ledger-wasm-client-smoke",
      "photon-normalized-circular-source-roots-hits-ledger-smoke",
      "photon-normalized-circular-source-run-smoke",
      "photon-phase-diagnostics-smoke",
    ],
  },
  {
    appId: "ideal-swarm",
    order: 3,
    requiredCases: [
      "ideal-swarm-causal-root-smoke",
      "ideal-swarm-geometry-smoke",
      "ideal-swarm-flight-time-smoke",
      "ideal-swarm-flight-time-wasm-client-smoke",
      "ideal-swarm-self-hit-wasm-client-smoke",
    ],
  },
];

const manifest = readJson(manifestPath);
const artifactByCaseId = validateManifest(manifest);
const apps = migrationPlan.map((entry) => evaluateAppParity(entry, artifactByCaseId));
const missingCases = apps.flatMap((entry) => entry.missingCases);
const failedCases = apps.flatMap((entry) => entry.cases.filter((testCase) => !testCase.readyForMigration));
const ready = missingCases.length === 0 && failedCases.length === 0;

const report = {
  schema: "solver-migration-parity-report.v1",
  generatedAt: new Date().toISOString(),
  sourceManifest: path.relative(rootDir, manifestPath),
  sourceManifestSchema: manifest.schema,
  migrationOrder: apps.map((entry) => entry.appId),
  classificationVocabulary,
  status: ready ? "parity_ready_for_ordered_adapter_migration" : "parity_blocked",
  summary: createParitySummary(apps, manifest.artifacts.length, missingCases, failedCases),
  migrationPolicy:
    "App adapters must continue to use the shared central solver bridge while this report remains green.",
  blockingCases: failedCases.map((entry) => ({
    appId: entry.appId,
    caseId: entry.caseId,
    classification: entry.classification,
    artifact: entry.artifact,
  })),
  missingCases,
  apps,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
if (!ready) {
  for (const missingCase of missingCases) {
    console.error(`${missingCase.appId}: missing baseline sandbox case ${missingCase.caseId}`);
  }
  for (const failedCase of failedCases) {
    console.error(
      `${failedCase.appId}: ${failedCase.caseId} classified as ${failedCase.classification}`
    );
  }
  console.error(`wrote ${path.relative(rootDir, outputPath)}`);
  process.exit(1);
}
console.log(
  `solver migration parity check passed: ${apps.length} app(s), ${manifest.artifacts.length} case(s), wrote ${path.relative(rootDir, outputPath)}`
);

function parseArgs(rawArgs) {
  const parsed = {
    help: false,
    manifestPath: undefined,
    outputPath: undefined,
  };
  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === "--help") {
      parsed.help = true;
    } else if (arg === "--manifest") {
      const nextValue = rawArgs[index + 1];
      if (!nextValue || nextValue.startsWith("--")) {
        console.error("--manifest requires a path");
        printUsage(2);
      }
      parsed.manifestPath = nextValue;
      index += 1;
    } else if (arg.startsWith("--manifest=")) {
      parsed.manifestPath = requireInlineValue(arg, "--manifest=");
    } else if (arg === "--out") {
      const nextValue = rawArgs[index + 1];
      if (!nextValue || nextValue.startsWith("--")) {
        console.error("--out requires a path");
        printUsage(2);
      }
      parsed.outputPath = nextValue;
      index += 1;
    } else if (arg.startsWith("--out=")) {
      parsed.outputPath = requireInlineValue(arg, "--out=");
    } else {
      console.error(`Unknown argument: ${arg}`);
      printUsage(2);
    }
  }
  return parsed;
}

function requireInlineValue(arg, prefix) {
  const value = arg.slice(prefix.length);
  if (!value) {
    console.error(`${prefix.slice(0, -1)} requires a path`);
    printUsage(2);
  }
  return value;
}

function validateManifest(manifestValue) {
  if (manifestValue?.schema !== "solver-baseline-sandbox-manifest/v1") {
    throw new Error("baseline sandbox manifest has an unsupported schema");
  }
  if (!Array.isArray(manifestValue.artifacts)) {
    throw new Error("baseline sandbox manifest artifacts must be an array");
  }
  if (manifestValue.caseCount !== manifestValue.artifacts.length) {
    throw new Error("baseline sandbox manifest caseCount does not match artifact count");
  }
  const byCaseId = new Map();
  for (const artifact of manifestValue.artifacts) {
    validateArtifactRow(artifact);
    if (byCaseId.has(artifact.caseId)) {
      throw new Error(`duplicate baseline sandbox case ${artifact.caseId}`);
    }
    byCaseId.set(artifact.caseId, artifact);
  }
  return byCaseId;
}

function validateArtifactRow(artifact) {
  requireString(artifact.caseId, "artifact.caseId");
  requireString(artifact.appId, `${artifact.caseId}.appId`);
  requireString(artifact.path, `${artifact.caseId}.path`);
  requireString(artifact.artifactSha256, `${artifact.caseId}.artifactSha256`);
  requireString(artifact.classification, `${artifact.caseId}.classification`);
  if (!classificationVocabulary.includes(artifact.classification)) {
    throw new Error(`${artifact.caseId} classification is not in the solver baseline vocabulary`);
  }
  validateTolerancePolicy(artifact);
  const artifactPath = path.resolve(artifact.path);
  assertInsideRoot(artifactPath, `${artifact.caseId}.path`);
  if (!fs.existsSync(artifactPath)) {
    throw new Error(`${artifact.caseId} artifact file does not exist`);
  }
  const payload = fs.readFileSync(artifactPath);
  const actualSha256 = crypto.createHash("sha256").update(payload).digest("hex");
  if (actualSha256 !== artifact.artifactSha256) {
    throw new Error(`${artifact.caseId} artifact hash mismatch`);
  }
}

function validateTolerancePolicy(artifact) {
  if (!artifact.tolerancePolicy || typeof artifact.tolerancePolicy !== "object") {
    throw new Error(`${artifact.caseId}.tolerancePolicy must be an object`);
  }
  const vocabulary = artifact.tolerancePolicy.classificationVocabulary;
  if (!Array.isArray(vocabulary)) {
    throw new Error(`${artifact.caseId}.tolerancePolicy.classificationVocabulary must be an array`);
  }
  const missingVocabulary = classificationVocabulary.filter((classification) => !vocabulary.includes(classification));
  if (missingVocabulary.length > 0) {
    throw new Error(
      `${artifact.caseId}.tolerancePolicy.classificationVocabulary is missing ${missingVocabulary.join(", ")}`
    );
  }
}

function evaluateAppParity(planEntry, artifactByCaseId) {
  const cases = [];
  const missingCases = [];
  for (const caseId of planEntry.requiredCases) {
    const artifact = artifactByCaseId.get(caseId);
    if (!artifact) {
      missingCases.push({ appId: planEntry.appId, caseId });
      continue;
    }
    if (artifact.appId !== planEntry.appId) {
      throw new Error(`${caseId} belongs to ${artifact.appId}, expected ${planEntry.appId}`);
    }
    cases.push({
      appId: planEntry.appId,
      caseId,
      classification: artifact.classification,
      readyForMigration: artifact.classification === "baseline_within_tolerance",
      artifact: path.relative(rootDir, path.resolve(artifact.path)),
      artifactSha256: artifact.artifactSha256,
      manifestHash: artifact.manifestHash ?? "",
      tolerancePolicy: artifact.tolerancePolicy,
    });
  }
  return {
    appId: planEntry.appId,
    order: planEntry.order,
    status: missingCases.length === 0 && cases.every((testCase) => testCase.readyForMigration)
      ? "parity_ready"
      : "parity_blocked",
    requiredCaseCount: planEntry.requiredCases.length,
    cases,
    missingCases,
  };
}

function createParitySummary(apps, manifestCaseCount, missingCases, failedCases) {
  const requiredCaseCount = apps.reduce((sum, app) => sum + app.requiredCaseCount, 0);
  const evaluatedCaseCount = apps.reduce((sum, app) => sum + app.cases.length, 0);
  const readyCaseCount = apps.reduce(
    (sum, app) => sum + app.cases.filter((testCase) => testCase.readyForMigration).length,
    0
  );
  return {
    appCount: apps.length,
    manifestCaseCount,
    requiredCaseCount,
    evaluatedCaseCount,
    readyCaseCount,
    blockedCaseCount: failedCases.length,
    missingCaseCount: missingCases.length,
    readyAppCount: apps.filter((app) => app.status === "parity_ready").length,
    blockedAppCount: apps.filter((app) => app.status === "parity_blocked").length,
  };
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing JSON file: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function requireString(value, label) {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`${label} must be a non-empty string`);
  }
}

function assertInsideRoot(filePath, label) {
  const relative = path.relative(rootDir, filePath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`${label} must stay inside the repo root`);
  }
}

function printUsage(exitCode) {
  console.log("Usage: node scripts/check-solver-migration-parity.mjs [--manifest <path>] [--out <path>]");
  console.log("  Reads the solver baseline sandbox manifest and writes an ordered migration parity report.");
  process.exit(exitCode);
}
