#!/usr/bin/env node

// BP-009 is a sealed, provenance-bound v1 compatibility artifact. Its embedded
// specifications are historical records, not live candidate sources. This
// verifier intentionally does not reconstruct them through the canonical v2
// prescribed-worldline implementation.

import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  validateB1CompleteCycleProbeProtocol,
} from "../../src/prescribed-path-analysis/B1CompleteCycleProbeProtocol.mjs";

export const MANIFEST_SCHEMA =
  "prescribed-path-analysis/b1-1-score-landscape-manifest.v1";
export const FREEZE_PROTOCOL_SCHEMA =
  "prescribed-path-analysis/b1-1-score-landscape-freeze-protocol.v1";
export const POPULATION_SEED =
  "braid-b1-1-score-landscape-design-20260727-v1";
export const HELD_OUT_SEED =
  "braid-b1-1-score-landscape-heldout-20260727-v1";
export const SEALED_SOURCE_SEED =
  "braid-bc-monte-carlo-basin-20260725-v1";
export const SEALED_SAMPLE_ORDINAL = 5;
export const DEFAULT_MANIFEST_PATH =
  "reference/priorities/braid-program/campaigns/" +
  "b1-1-score-landscape-manifest.v1.json";
export const DEFAULT_PROTOCOL_PATH =
  "reference/priorities/braid-program/campaigns/" +
  "b1-1-score-landscape-complete-cycle-protocol.v1.json";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const EXPECTED_MANIFEST_FILE_SHA256 =
  "a1e6ca5d021dab22e1aef978463f87c4057295aa619217948b7e048349f58882";
const EXPECTED_PROTOCOL_FILE_SHA256 =
  "dbb58ffeb7e1c85214f2f7abffea85ba94b93c13ccfa3158060f0f61271611d7";
const EXPECTED_CENTER_SAMPLED_SPEC_SHA256 =
  "c62c3e8ba3a393c7c090e79e7bd4b3869a8cbc1fcd007c3530cdafc0f45abe67";
const EXPECTED_CENTER_EXACT_SOURCE_SHA256 =
  "2fe5abc99c837a627c1817c4c27e39b71ecdae2264ea572d276e3d8e1b42f52a";

function fail(message) {
  throw new Error(message);
}

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function parseJsonBytes(bytes, label) {
  try {
    return JSON.parse(bytes.toString("utf8"));
  } catch (error) {
    throw new TypeError(`${label} must contain valid JSON: ${error.message}`);
  }
}

function validateHistoricalManifest(manifest) {
  if (manifest?.schema !== MANIFEST_SCHEMA ||
      manifest.status !== "frozen-score-free" ||
      !manifest.claimBoundary?.diagnosticOnly ||
      !manifest.claimBoundary?.prescribedPathsOnly ||
      manifest.claimBoundary?.pathEvolutionInvoked !== false ||
      manifest.claimBoundary?.scoresComputed !== false ||
      !Array.isArray(manifest.rows) || manifest.rows.length !== 377) {
    fail("BP-009 historical manifest contract is incomplete.");
  }
  if (manifest.sourceBinding?.sourcePath !==
      "reference/priorities/braid-program/configurations/illustrative-spindle-chart-hypothesis.v0.json") {
    fail("BP-009 historical source binding differs.");
  }
  const rowIds = new Set();
  const sampledSpecHashes = new Set();
  manifest.rows.forEach((row) => {
    if (rowIds.has(row.rowId) || sampledSpecHashes.has(row.sampledSpecSha256)) {
      fail("BP-009 historical rows must retain unique ids and sampled-spec hashes.");
    }
    rowIds.add(row.rowId);
    sampledSpecHashes.add(row.sampledSpecSha256);
    if (row.materializedSpec?.schema !== "prescribed-braid-spec.v1") {
      fail(`BP-009 row ${row.rowId} must remain an explicit v1 compatibility record.`);
    }
    const state = row.analyticalState;
    if (state?.evaluated !== false || state.disposition !== null ||
        state.primaryScore !== null || state.refinedScore !== null ||
        state.denseScore !== null) {
      fail(`BP-009 row ${row.rowId} no longer preserves its null-score freeze.`);
    }
  });
  const center = manifest.rows[0];
  if (center.rowType !== "center" ||
      center.sampledSpecSha256 !== EXPECTED_CENTER_SAMPLED_SPEC_SHA256 ||
      center.exactSourceSha256 !== EXPECTED_CENTER_EXACT_SOURCE_SHA256) {
    fail("BP-009 historical center identity differs.");
  }
  return manifest;
}

function validateHistoricalProtocol(protocol) {
  const validated = validateB1CompleteCycleProbeProtocol(protocol);
  if (validated.eventEvaluator.fieldSpeed !== 1 ||
      validated.completeCycle.primary.timeSamples !== 24 ||
      validated.completeCycle.primary.polarOrder !== 12 ||
      validated.completeCycle.primary.azimuthCount !== 24 ||
      validated.completeCycle.refined.timeSamples !== 48 ||
      validated.completeCycle.refined.polarOrder !== 16 ||
      validated.completeCycle.refined.azimuthCount !== 32) {
    fail("BP-009 historical protocol differs from the sealed c_f=1 resolution.");
  }
  return validated;
}

function readSealedArtifact(file, expectedSha256, label) {
  if (!existsSync(file)) fail(`${label} is missing: ${file}`);
  const bytes = readFileSync(file);
  const fileSha256 = sha256Bytes(bytes);
  if (fileSha256 !== expectedSha256) {
    fail(`${label} bytes differ: expected ${expectedSha256}, received ${fileSha256}.`);
  }
  return { bytes, parsed: parseJsonBytes(bytes, label), fileSha256 };
}

export function buildScoreLandscapeManifest() {
  const { parsed } = readSealedArtifact(
    DEFAULT_MANIFEST_PATH,
    EXPECTED_MANIFEST_FILE_SHA256,
    "BP-009 historical manifest",
  );
  return validateHistoricalManifest(parsed);
}

export function buildFrozenCompleteCycleProtocol() {
  const { parsed } = readSealedArtifact(
    DEFAULT_PROTOCOL_PATH,
    EXPECTED_PROTOCOL_FILE_SHA256,
    "BP-009 historical protocol",
  );
  return validateHistoricalProtocol(parsed);
}

function writeOnceOrMatch(file, bytes) {
  if (existsSync(file)) {
    if (!readFileSync(file).equals(bytes)) fail(`${file} exists with different bytes.`);
    return "matched-existing";
  }
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, bytes, { flag: "wx" });
  return "copied-sealed-compatibility-artifact";
}

function parseArguments(args) {
  const command = args[0];
  if (!["write", "check", "summary"].includes(command)) {
    fail("command must be write, check, or summary.");
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

export function verifyFrozenFiles({
  manifestPath = DEFAULT_MANIFEST_PATH,
  protocolPath = DEFAULT_PROTOCOL_PATH,
} = {}) {
  const manifest = readSealedArtifact(
    manifestPath,
    EXPECTED_MANIFEST_FILE_SHA256,
    "BP-009 historical manifest",
  );
  const protocol = readSealedArtifact(
    protocolPath,
    EXPECTED_PROTOCOL_FILE_SHA256,
    "BP-009 historical protocol",
  );
  validateHistoricalManifest(manifest.parsed);
  validateHistoricalProtocol(protocol.parsed);
  return {
    manifestPath,
    manifestBytes: manifest.bytes.length,
    manifestFileSha256: manifest.fileSha256,
    protocolPath,
    protocolBytes: protocol.bytes.length,
    protocolFileSha256: protocol.fileSha256,
    rowCount: 377,
    implementationPath: path.relative(process.cwd(), SCRIPT_PATH),
    compatibilityBoundary:
      "immutable provenance-bound v1 artifact; not a live candidate source or v2 reconstruction",
    causalRootsEvaluated: false,
    scoresComputed: false,
  };
}

async function runCli() {
  const { command, values } = parseArguments(process.argv.slice(2));
  const manifestPath = values.get("--manifest") ?? DEFAULT_MANIFEST_PATH;
  const protocolPath = values.get("--protocol") ?? DEFAULT_PROTOCOL_PATH;
  if (command === "write") {
    const sourceManifest = readFileSync(DEFAULT_MANIFEST_PATH);
    const sourceProtocol = readFileSync(DEFAULT_PROTOCOL_PATH);
    const manifestResult = writeOnceOrMatch(manifestPath, sourceManifest);
    const protocolResult = writeOnceOrMatch(protocolPath, sourceProtocol);
    process.stdout.write(`${JSON.stringify({
      manifestResult,
      protocolResult,
      ...verifyFrozenFiles({ manifestPath, protocolPath }),
    }, null, 2)}\n`);
    return;
  }
  const result = command === "check"
    ? verifyFrozenFiles({ manifestPath, protocolPath })
    : {
        manifest: buildScoreLandscapeManifest(),
        protocol: buildFrozenCompleteCycleProtocol(),
      };
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

if (path.resolve(process.argv[1] ?? "") === SCRIPT_PATH) {
  runCli().catch((error) => {
    process.stderr.write(`${error.stack ?? error.message}\n`);
    process.exitCode = 1;
  });
}
