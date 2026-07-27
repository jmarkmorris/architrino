#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  validateB1CompleteCycleProbeProtocol,
} from "../../src/prescribed-path-analysis/B1CompleteCycleProbeProtocol.mjs";
import {
  sha256Canonical,
} from "../../src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs";
import {
  DEFAULT_MANIFEST_PATH,
  DEFAULT_PROTOCOL_PATH,
  MANIFEST_SCHEMA,
} from "./build-b1-1-score-landscape-manifest.mjs";
import {
  describeDenseRootAuditContract,
} from "./audit-b1-1-score-landscape-dense-roots.mjs";

export const DRY_RUN_RECEIPT_SCHEMA =
  "prescribed-path-analysis/b1-1-score-landscape-dry-run-receipt.v1";
export const DEFAULT_RECEIPT_PATH =
  "reference/priorities/braid-program/evidence/" +
  "2026-07-27-b1-1-score-landscape-manifest-freeze.v1.json";
export const DEFAULT_OUTPUT_ROOT =
  ".local-data/braid-analysis/b1-1-score-landscape-20260727-v1";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const EXPECTED_MANIFEST_FILE_SHA256 =
  "a1e6ca5d021dab22e1aef978463f87c4057295aa619217948b7e048349f58882";
const EXPECTED_PROTOCOL_FILE_SHA256 =
  "dbb58ffeb7e1c85214f2f7abffea85ba94b93c13ccfa3158060f0f61271611d7";
const EXPECTED_PROTOCOL_CANONICAL_SHA256 =
  "3c5641cd9cd88f47e8cdbdb0b7697df002d6bb9e6418ac0d390541f09a27b30d";
const IMPLEMENTATION_PATHS = Object.freeze([
  "scripts/eom/build-b1-1-score-landscape-manifest.mjs",
  "scripts/eom/run-b1-1-score-landscape.mjs",
  "scripts/eom/audit-b1-1-score-landscape-dense-roots.mjs",
  "scripts/eom/generate-prescribed-braid-record.mjs",
  "src/prescribed-path-analysis/CompactMonteCarloCampaign.mjs",
  "src/prescribed-path-analysis/B1CompleteCycleProbeProtocol.mjs",
  "src/prescribed-path-analysis/ExactPrescribedSourceWake.mjs",
]);
const NULL_SCORE_DISPOSITIONS = Object.freeze([
  "inapplicable-member-score",
  "unknown-numerical",
  "invalid-manifest-row",
]);

function fail(message) {
  throw new Error(message);
}

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function stableRead(file) {
  const link = lstatSync(file);
  if (!link.isFile() || link.isSymbolicLink()) {
    fail(`${file} must be a regular non-symlink file.`);
  }
  const before = statSync(file);
  const bytes = readFileSync(file);
  const after = statSync(file);
  if (before.size !== after.size || before.mtimeMs !== after.mtimeMs ||
      bytes.length !== after.size) {
    fail(`${file} changed during its stable read.`);
  }
  return bytes;
}

function stableJson(file) {
  const bytes = stableRead(file);
  let value;
  try {
    value = JSON.parse(bytes.toString("utf8"));
  } catch {
    fail(`${file} is not complete JSON.`);
  }
  return { bytes, value };
}

function parseArguments(args) {
  const command = args[0];
  if (!["dry-run", "check"].includes(command)) {
    fail(
      "BP-009 authorizes only dry-run or check; analytical campaign execution " +
      "is not implemented or authorized.",
    );
  }
  const values = new Map();
  for (let index = 1; index < args.length; index += 2) {
    const key = args[index];
    const value = args[index + 1];
    if (!key?.startsWith("--") || !value) fail(`invalid argument ${key}.`);
    values.set(key, value);
  }
  return { command, values };
}

function validateManifest(manifest) {
  if (manifest.schema !== MANIFEST_SCHEMA ||
      manifest.status !== "frozen-score-free") {
    fail("manifest schema or frozen status differs.");
  }
  if (manifest.population?.rowCount !== 377 ||
      !Array.isArray(manifest.rows) ||
      manifest.rows.length !== 377) {
    fail("manifest must contain exactly 377 rows.");
  }
  const rowIds = new Set(manifest.rows.map((row) => row.rowId));
  const specHashes = new Set(manifest.rows.map((row) => row.sampledSpecSha256));
  if (rowIds.size !== 377 || specHashes.size !== 377) {
    fail("manifest row ids and materialized specifications must be unique.");
  }
  const counts = Object.fromEntries(
    ["center", "axial", "pairwise-interaction", "held-out-latin-hypercube"]
      .map((kind) => [
        kind,
        manifest.rows.filter((row) => row.rowType === kind).length,
      ]),
  );
  if (counts.center !== 1 || counts.axial !== 48 ||
      counts["pairwise-interaction"] !== 264 ||
      counts["held-out-latin-hypercube"] !== 64) {
    fail("manifest population strata differ.");
  }
  const center = manifest.rows[0];
  if (center.rowType !== "center" ||
      center.sampledSpecSha256 !==
        manifest.sourceBinding.sealedIdentities.sampledSpecSha256 ||
      center.exactSourceSha256 !==
        manifest.sourceBinding.sealedIdentities.exactSourceSha256) {
    fail("manifest center does not reproduce the sealed identity.");
  }
  for (const row of manifest.rows) {
    if (row.analyticalState?.evaluated !== false ||
        row.analyticalState?.disposition !== null ||
        row.analyticalState?.primaryScore !== null ||
        row.analyticalState?.refinedScore !== null ||
        row.analyticalState?.denseScore !== null) {
      fail(`${row.rowId} is not a score-free frozen row.`);
    }
  }
  const dispositions = manifest.evaluationContract?.dispositions;
  for (const disposition of NULL_SCORE_DISPOSITIONS) {
    if (dispositions?.[disposition]?.scorePermitted !== false) {
      fail(`${disposition} must remain null-score.`);
    }
  }
  if (dispositions?.["applicable-threshold-crossing"]?.scorePermitted !== true ||
      dispositions?.["applicable-threshold-noncrossing"]?.scorePermitted !== true) {
    fail("only applicable dispositions may carry scores.");
  }
  return { counts, center };
}

function outputPlan(manifest, outputRoot) {
  const rowPaths = manifest.rows.map(
    (row) => `${outputRoot}/rows/${row.rowId}.v1.json`,
  );
  return {
    outputRoot,
    writePolicy: "create-exclusive-no-overwrite.v1",
    campaignReceiptPath: `${outputRoot}/execution-receipt.v1.json`,
    rowPathTemplate: `${outputRoot}/rows/{frozen-row-id}.v1.json`,
    denseRawPathTemplate:
      `${outputRoot}/raw/dense/{frozen-row-id}/{resolution}/{content-sha256}.json`,
    rowPathCount: rowPaths.length,
    rowPathSetSha256: sha256Canonical(rowPaths),
    rowPaths,
    mutationPolicy:
      "no row may be added, moved, removed, or replaced after any analytical " +
      "evaluation; score-dependent point creation is forbidden",
  };
}

function implementationHashes() {
  return Object.fromEntries(IMPLEMENTATION_PATHS.map((file) => [
    file,
    sha256Bytes(stableRead(file)),
  ]));
}

export function buildDryRunReceipt({
  manifestPath = DEFAULT_MANIFEST_PATH,
  protocolPath = DEFAULT_PROTOCOL_PATH,
  outputRoot = DEFAULT_OUTPUT_ROOT,
} = {}) {
  const manifestFile = stableJson(manifestPath);
  const protocolFile = stableJson(protocolPath);
  const manifestFileSha256 = sha256Bytes(manifestFile.bytes);
  const protocolFileSha256 = sha256Bytes(protocolFile.bytes);
  if (manifestFileSha256 !== EXPECTED_MANIFEST_FILE_SHA256) {
    fail("manifest file hash differs from the runner binding.");
  }
  if (protocolFileSha256 !== EXPECTED_PROTOCOL_FILE_SHA256) {
    fail("protocol file hash differs from the runner binding.");
  }
  const { counts, center } = validateManifest(manifestFile.value);
  const protocol = validateB1CompleteCycleProbeProtocol(protocolFile.value);
  const protocolCanonicalSha256 = sha256Canonical(protocol);
  if (protocolCanonicalSha256 !== EXPECTED_PROTOCOL_CANONICAL_SHA256 ||
      protocol.completeCycle.primary.timeSamples !== 24 ||
      protocol.completeCycle.refined.timeSamples !== 48 ||
      protocol.eventEvaluator.fieldSpeed !== 1) {
    fail("complete-cycle protocol identity or declared resolution differs.");
  }
  return {
    schema: DRY_RUN_RECEIPT_SCHEMA,
    receiptId: "b1-1-score-landscape-manifest-freeze-20260727-v1",
    status: "frozen-awaiting-operator-review",
    authority: "BP-009 score-free manifest and instrument freeze only",
    manifest: {
      path: manifestPath,
      fileSha256: manifestFileSha256,
      canonicalSha256: sha256Canonical(manifestFile.value),
      rowCount: manifestFile.value.rows.length,
      uniqueRowIdCount: new Set(
        manifestFile.value.rows.map((row) => row.rowId),
      ).size,
      uniqueMaterializedSpecCount: new Set(
        manifestFile.value.rows.map((row) => row.sampledSpecSha256),
      ).size,
      strata: counts,
      heldOutCounterTokenCount: manifestFile.value.rows
        .filter((row) => row.rowType === "held-out-latin-hypercube")
        .reduce((sum, row) => sum + row.counterTokens.length * 2, 0),
    },
    centerIdentity: {
      rowId: center.rowId,
      sealedCaseSha256:
        manifestFile.value.sourceBinding.sealedIdentities.caseSha256,
      sampledSpecSha256: center.sampledSpecSha256,
      exactSourceSha256: center.exactSourceSha256,
      reproduced: true,
    },
    protocol: {
      path: protocolPath,
      fileSha256: protocolFileSha256,
      canonicalSha256: protocolCanonicalSha256,
      fieldSpeed: protocol.eventEvaluator.fieldSpeed,
      primary: protocol.completeCycle.primary,
      refined: protocol.completeCycle.refined,
      rootPolicy: protocol.eventEvaluator.rootPolicy,
      failClosedGates: protocol.failClosedGates,
    },
    runnerContract: {
      implementationPath:
        "scripts/eom/run-b1-1-score-landscape.mjs",
      acceptedManifestFileSha256: EXPECTED_MANIFEST_FILE_SHA256,
      acceptedProtocolFileSha256: EXPECTED_PROTOCOL_FILE_SHA256,
      commandsAuthorizedByImplementation: ["dry-run", "check"],
      analyticalExecutionImplemented: false,
      scoreDependentRowCreationPermitted: false,
      output: outputPlan(manifestFile.value, outputRoot),
    },
    denseRootAuditContract: describeDenseRootAuditContract(),
    implementationSha256: implementationHashes(),
    failClosedRules: {
      scoreBearingDispositions: [
        "applicable-threshold-crossing",
        "applicable-threshold-noncrossing",
      ],
      nullScoreDispositions: NULL_SCORE_DISPOSITIONS,
      rootOrCertificationFailure: "unknown-numerical",
      incompleteMovingInventory: "inapplicable-member-score",
      identityMismatch: "invalid-manifest-row",
      nullRowsCountAsCandidateFailures: false,
      thresholdRelaxationPermitted: false,
    },
    execution: {
      causalRootsEvaluated: false,
      scoresComputed: false,
      centerPilotRun: false,
      remainingLandscapeRowsRun: false,
      multiFrequencySliceRun: false,
      randomOrBroadScreenRun: false,
      solverCampaignRun: false,
      filesAtOutputRootCreated: false,
    },
    claimBoundary: manifestFile.value.claimBoundary,
  };
}

function receiptBytes(receipt) {
  return Buffer.from(`${JSON.stringify(receipt, null, 2)}\n`);
}

function writeReceiptOnce(file, receipt) {
  if (existsSync(file)) fail(`${file} already exists; receipt is write-once.`);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, receiptBytes(receipt), { flag: "wx" });
}

function verifyReceipt(file, receipt) {
  if (!existsSync(file)) fail(`${file} does not exist.`);
  const actual = stableRead(file);
  const expected = receiptBytes(receipt);
  if (!actual.equals(expected)) fail(`${file} differs from the recomputed receipt.`);
  return {
    receiptPath: file,
    receiptFileSha256: sha256Bytes(actual),
    receiptBytes: actual.length,
  };
}

async function runCli() {
  const { command, values } = parseArguments(process.argv.slice(2));
  const manifestPath = values.get("--manifest") ?? DEFAULT_MANIFEST_PATH;
  const protocolPath = values.get("--protocol") ?? DEFAULT_PROTOCOL_PATH;
  const receiptPath = values.get("--receipt") ?? DEFAULT_RECEIPT_PATH;
  const outputRoot = values.get("--output-root") ?? DEFAULT_OUTPUT_ROOT;
  const receipt = buildDryRunReceipt({
    manifestPath,
    protocolPath,
    outputRoot,
  });
  if (command === "dry-run") writeReceiptOnce(receiptPath, receipt);
  const verified = verifyReceipt(receiptPath, receipt);
  process.stdout.write(`${JSON.stringify({
    ...verified,
    rowCount: receipt.manifest.rowCount,
    status: receipt.status,
    causalRootsEvaluated: false,
    scoresComputed: false,
  }, null, 2)}\n`);
}

if (path.resolve(process.argv[1] ?? "") === SCRIPT_PATH) {
  runCli().catch((error) => {
    process.stderr.write(`${error.stack ?? error.message}\n`);
    process.exitCode = 1;
  });
}
