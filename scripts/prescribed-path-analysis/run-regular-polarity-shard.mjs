#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

import {
  buildRegularCircularRootKernel,
  projectRegularPolarityKernel,
} from "../../src/prescribed-path-analysis/PlanarCoRotatingRingBalance.mjs";

const SELF = "scripts/prescribed-path-analysis/run-regular-polarity-shard.mjs";
const KERNEL_SOURCE = "src/prescribed-path-analysis/PlanarCoRotatingRingBalance.mjs";

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function readBoundJson(path) {
  const absolutePath = resolve(path);
  const bytes = readFileSync(absolutePath);
  return { absolutePath, bytes, sha256: sha256Bytes(bytes), document: JSON.parse(bytes) };
}

function writeNewJson(path, document) {
  const absolutePath = resolve(path);
  const bytes = Buffer.from(`${JSON.stringify(document, null, 2)}\n`);
  writeFileSync(absolutePath, bytes, { flag: "wx" });
  return { path: absolutePath, bytes: bytes.length, sha256: sha256Bytes(bytes) };
}

function sourceBinding(path) {
  const bytes = readFileSync(path);
  return { path, bytes: bytes.length, sha256: sha256Bytes(bytes) };
}

function requireInteger(value, label, minimum = 0) {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < minimum) throw new TypeError(`${label} must be an integer >= ${minimum}`);
  return parsed;
}

function requireFinite(value, label) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) throw new TypeError(`${label} must be finite`);
  return parsed;
}

function polaritiesFor(word) {
  if (!/^[+-]+$/u.test(word)) throw new TypeError("invalid canonical polarity word");
  return [...word].map((value) => value === "+" ? 1 : -1);
}

function same(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

export function produceKernelArtifact({ n, beta, out }) {
  const kernel = buildRegularCircularRootKernel({ n: requireInteger(n, "n", 1), beta: requireFinite(beta, "beta") });
  return writeNewJson(out, {
    schema: "braid-program/regular-polarity-shared-kernel-artifact.v1",
    sourceBindings: [sourceBinding(SELF), sourceBinding(KERNEL_SOURCE)],
    kernel,
    claimBoundary: "one polarity-independent prescribed circular root kernel at one fixed (N,beta_f); no speed-domain or dynamical claim",
  });
}

export function produceProjectionShard({ manifestPath, kernelPath, shardCount, shardIndex, out }) {
  const manifest = readBoundJson(manifestPath);
  const kernelArtifact = readBoundJson(kernelPath);
  const count = requireInteger(shardCount, "shardCount", 1);
  const index = requireInteger(shardIndex, "shardIndex", 0);
  if (index >= count) throw new RangeError("shardIndex must be smaller than shardCount");
  if (manifest.document.schema !== "braid-program/regular-polarity-orbit-manifest.v1") throw new TypeError("unexpected manifest schema");
  if (kernelArtifact.document.schema !== "braid-program/regular-polarity-shared-kernel-artifact.v1") throw new TypeError("unexpected kernel schema");
  for (const binding of [...manifest.document.sourceBindings, ...kernelArtifact.document.sourceBindings]) {
    const live = sourceBinding(binding.path);
    if (live.path !== binding.path || live.bytes !== binding.bytes || live.sha256 !== binding.sha256) {
      throw new Error(`source binding mismatch: ${binding.path}`);
    }
  }
  const kernel = kernelArtifact.document.kernel;
  const inventory = manifest.document.inventories.find((row) => row.n === kernel.n);
  if (!inventory) throw new Error(`manifest lacks N=${kernel.n}`);
  const selected = inventory.representatives.filter((_, representativeIndex) => representativeIndex % count === index);
  const records = selected.map((representative) => ({
    classId: representative.classId,
    canonicalWord: representative.canonicalWord,
    orbitSize: representative.orbitSize,
    subclass: representative.subclass,
    projection: projectRegularPolarityKernel({ kernel, polarities: polaritiesFor(representative.canonicalWord) }),
  }));
  return writeNewJson(out, {
    schema: "braid-program/regular-polarity-projection-shard.v1",
    manifest: { path: manifest.absolutePath, bytes: manifest.bytes.length, sha256: manifest.sha256 },
    kernel: { path: kernelArtifact.absolutePath, bytes: kernelArtifact.bytes.length, sha256: kernelArtifact.sha256, n: kernel.n, beta: kernel.beta },
    shard: { count, index, assignment: "representative-index-modulo-shard-count", records: records.length },
    records,
    claimBoundary: "fixed-speed regular-ring kernel projections only; no continuous speed-domain, zero-census, bounded-negative or dynamical claim",
  });
}

export function reduceProjectionShards({ manifestPath, kernelPath, shardPaths, out }) {
  const manifest = readBoundJson(manifestPath);
  const kernelArtifact = readBoundJson(kernelPath);
  const shards = shardPaths.map(readBoundJson);
  if (shards.length === 0) throw new Error("at least one shard is required");
  const expectedCount = shards[0].document.shard.count;
  if (shards.length !== expectedCount) throw new Error("incomplete shard set");
  const indices = shards.map((row) => row.document.shard.index).sort((a, b) => a - b);
  if (!same(indices, Array.from({ length: expectedCount }, (_, index) => index))) throw new Error("duplicate or missing shard index");
  const kernel = kernelArtifact.document.kernel;
  const inventory = manifest.document.inventories.find((row) => row.n === kernel.n);
  const expected = new Map(inventory.representatives.map((row) => [row.classId, row]));
  const seen = new Set();
  for (const shard of shards) {
    const document = shard.document;
    if (document.schema !== "braid-program/regular-polarity-projection-shard.v1") throw new TypeError("unexpected shard schema");
    if (document.manifest.sha256 !== manifest.sha256 || document.kernel.sha256 !== kernelArtifact.sha256 ||
        document.shard.count !== expectedCount) throw new Error("cross-shard source mismatch");
    for (const record of document.records) {
      const representative = expected.get(record.classId);
      if (!representative || seen.has(record.classId)) throw new Error("unknown or duplicate classId");
      if (record.canonicalWord !== representative.canonicalWord || record.orbitSize !== representative.orbitSize ||
          record.subclass !== representative.subclass) throw new Error("manifest row mismatch");
      const recomputed = projectRegularPolarityKernel({ kernel, polarities: polaritiesFor(record.canonicalWord) });
      if (!same(record.projection, recomputed)) throw new Error("projection replay mismatch");
      seen.add(record.classId);
    }
  }
  if (seen.size !== expected.size) throw new Error("incomplete representative coverage");
  return writeNewJson(out, {
    schema: "braid-program/regular-polarity-projection-reduction.v1",
    manifest: { path: manifest.absolutePath, bytes: manifest.bytes.length, sha256: manifest.sha256 },
    kernel: { path: kernelArtifact.absolutePath, bytes: kernelArtifact.bytes.length, sha256: kernelArtifact.sha256, n: kernel.n, beta: kernel.beta },
    shards: shards.map((row) => ({ path: row.absolutePath, bytes: row.bytes.length, sha256: row.sha256, index: row.document.shard.index })),
    completeness: {
      expectedRepresentatives: expected.size,
      receivedRepresentatives: seen.size,
      duplicateRepresentatives: 0,
      missingRepresentatives: 0,
      replayedProjections: seen.size,
      allPassed: true,
    },
    claimBoundary: "fixed-speed producer/reducer completeness only; no topology-boundary, continuous speed-domain, bounded-negative or dynamical claim",
  });
}

function argument(name) {
  const index = process.argv.indexOf(`--${name}`);
  if (index < 0 || !process.argv[index + 1]) throw new Error(`missing --${name}`);
  return process.argv[index + 1];
}

function main() {
  const mode = process.argv[2];
  let result;
  if (mode === "kernel") {
    result = produceKernelArtifact({ n: argument("n"), beta: argument("beta"), out: argument("out") });
  } else if (mode === "project") {
    result = produceProjectionShard({
      manifestPath: argument("manifest"), kernelPath: argument("kernel"),
      shardCount: argument("shard-count"), shardIndex: argument("shard-index"), out: argument("out"),
    });
  } else if (mode === "reduce") {
    result = reduceProjectionShards({
      manifestPath: argument("manifest"), kernelPath: argument("kernel"),
      shardPaths: argument("shards").split(","), out: argument("out"),
    });
  } else {
    throw new Error("mode must be kernel, project, or reduce");
  }
  console.log(JSON.stringify(result, null, 2));
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
