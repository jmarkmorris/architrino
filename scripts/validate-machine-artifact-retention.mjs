#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { isGeneratedRuntimeAsset, readRuntimeAssetFamilies } from "./prepare-runtime-assets.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY_PATH = "reference/op/machine-artifact-retention-registry.v1.json";
const MACHINE_EXTENSION = /\.(?:json|jsonl|ndjson|csv|tsv)$/i;
const git = (rootDir, args, options = {}) => execFileSync("git", args, {
  cwd: rootDir, encoding: "utf8", maxBuffer: 256 * 1024 * 1024, ...options,
});

export function measureMachineFile(bytes) {
  let lineCount = 0;
  for (const byte of bytes) if (byte === 10) lineCount += 1;
  if (bytes.length && bytes.at(-1) !== 10) lineCount += 1;
  return { byteCount: bytes.length, lineCount };
}

export function machineCollection(relativePath, registry) {
  const explicit = registry.collections.find((entry) => relativePath.startsWith(`${entry.path}/`));
  if (explicit) return explicit.path;
  return relativePath.match(/^(content\/(?:assets|generated)\/[^/]+|reference\/priorities\/[^/]+\/evidence)(?:\/|$)/)?.[1]
    ?? path.posix.dirname(relativePath);
}

const exceeds = (value, limit) => value.lineCount >= limit.lineCount || value.byteCount >= limit.byteCount;

export function auditMachineFiles(files, { registry, families, allPaths = [...files.keys()] }) {
  const errors = [];
  for (const record of registry.records) {
    if (!files.has(record.path)) errors.push(`registered machine file is absent: ${record.path}`);
  }
  for (const name of allPaths) {
    if (isGeneratedRuntimeAsset(name, families)) errors.push(`generated runtime output must not be tracked: ${name}`);
  }
  const totals = new Map();
  for (const [name, value] of files) {
    const threshold = name.startsWith("reference/priorities/") && name.includes("/evidence/")
      ? { lineCount: registry.thresholds.evidenceLineCount, byteCount: registry.thresholds.evidenceByteCount }
      : registry.thresholds;
    if (exceeds(value, threshold) && !registry.records.some((entry) => entry.path === name)) {
      errors.push(`unregistered large machine file: ${name} (${value.lineCount} lines, ${value.byteCount} bytes)`);
    }
    const collection = machineCollection(name, registry);
    const total = totals.get(collection) ?? { lineCount: 0, byteCount: 0, fileCount: 0 };
    total.lineCount += value.lineCount;
    total.byteCount += value.byteCount;
    total.fileCount += 1;
    totals.set(collection, total);
  }
  for (const [name, value] of totals) {
    const retained = registry.collections.find((entry) => entry.path === name);
    const limit = retained?.budget ?? registry.collectionThresholds;
    if (exceeds(value, limit)) {
      errors.push(`machine collection budget exceeded: ${name} (${value.fileCount} files, ${value.lineCount} lines, ${value.byteCount} bytes)`);
    }
  }
  return { errors, totals };
}

function validateRegistry(registry) {
  if (registry.schema !== "architrino/machine-artifact-retention-registry.v1") throw new Error("invalid retention registry schema");
  for (const thresholds of [registry.thresholds, registry.collectionThresholds, registry.branchThresholds]) {
    if (!thresholds || ![thresholds.lineCount, thresholds.byteCount, ...Object.values(thresholds)].every((value) => Number.isSafeInteger(value) && value > 0)) {
      throw new Error("retention thresholds must be positive integers");
    }
  }
  const seen = new Set();
  for (const record of [...registry.records, ...registry.collections]) {
    if (seen.has(record.path)) throw new Error(`duplicate retention entry: ${record.path}`);
    seen.add(record.path);
    for (const key of ["path", "owner", "retentionReason", "compactAlternativeInsufficient"]) {
      if (typeof record[key] !== "string" || !record[key].trim()) throw new Error(`retention entry needs ${key}`);
    }
    if (!Array.isArray(record.consumers) || !record.consumers.length || record.consumers.some((value) => typeof value !== "string" || !value.trim())) throw new Error(`retention entry needs consumers: ${record.path}`);
    if (record.sourceKind !== "authored" && !record.regenerationCommand?.trim()) throw new Error(`retention entry needs regeneration command: ${record.path}`);
    if (record.budget && !Object.values(record.budget).every((n) => Number.isSafeInteger(n) && n > 0)) throw new Error("invalid collection budget");
  }
  if (Object.hasOwn(registry, "runtimeTransition")) throw new Error("runtimeTransition is retired; generated runtime outputs must remain untracked");
}

// Audit the index itself: a small unstaged file cannot hide a large staged
// payload. Batch-reading blobs does not update the index or create git objects.
function readIndex(rootDir) {
  const entries = git(rootDir, ["ls-files", "--stage", "-z"]).split("\0").filter(Boolean).map((line) => {
    const [, mode, oid, stage, name] = line.match(/^(\d+) ([a-f0-9]+) (\d)\t([\s\S]+)$/);
    if (stage !== "0") throw new Error(`unmerged index entry: ${name}`);
    return { mode, oid, name };
  });
  const machine = entries.filter((entry) => MACHINE_EXTENSION.test(entry.name));
  if (machine.some((entry) => entry.mode === "120000")) throw new Error("machine files must not be symlinks");
  const packed = machine.length ? git(rootDir, ["cat-file", "--batch"], {
    input: Buffer.from(`${machine.map((entry) => entry.oid).join("\n")}\n`), encoding: null,
  }) : Buffer.alloc(0);
  const files = new Map();
  let offset = 0;
  for (const entry of machine) {
    const end = packed.indexOf(10, offset);
    const size = Number(packed.subarray(offset, end).toString().split(" ")[2]);
    if (!Number.isSafeInteger(size)) throw new Error(`cannot read indexed blob: ${entry.name}`);
    files.set(entry.name, measureMachineFile(packed.subarray(end + 1, end + 1 + size)));
    offset = end + size + 2;
  }
  return { files, allPaths: entries.map((entry) => entry.name) };
}

function readWorking(rootDir, trackedPaths) {
  const otherPaths = git(rootDir, ["ls-files", "--others", "--exclude-standard", "-z"]).split("\0").filter(Boolean);
  const allPaths = [...new Set([...trackedPaths, ...otherPaths])].filter((name) => fs.existsSync(path.join(rootDir, name)));
  const files = new Map();
  for (const name of allPaths.filter((name) => MACHINE_EXTENSION.test(name))) {
    const absolute = path.join(rootDir, name);
    if (fs.lstatSync(absolute).isSymbolicLink()) throw new Error(`machine file must not be a symlink: ${name}`);
    files.set(name, measureMachineFile(fs.readFileSync(absolute)));
  }
  return { files, allPaths, otherPaths };
}

export function auditBranchGrowth({ rootDir, base, files, cached = false, otherPaths = [], thresholds }) {
  const args = ["diff", "--no-renames", "--numstat", "-z", ...(cached ? ["--cached"] : []), base, "--"];
  const rows = git(rootDir, args).split("\0").filter(Boolean).map((row) => row.match(/^([^\t]+)\t([^\t]+)\t([\s\S]+)$/).slice(1));
  let lineCount = 0;
  let byteCount = 0;
  for (const [added, , name] of rows) {
    if (!MACHINE_EXTENSION.test(name)) continue;
    lineCount += Number(added) || 0;
    const current = files.get(name)?.byteCount ?? 0;
    let previous = 0;
    try { previous = Number(git(rootDir, ["cat-file", "-s", `${base}:${name}`], { stdio: ["pipe", "pipe", "pipe"] }).trim()); } catch { /* newly added file */ }
    byteCount += Math.max(0, current - previous);
  }
  for (const name of otherPaths) {
    const file = files.get(name);
    if (file) { lineCount += file.lineCount; byteCount += file.byteCount; }
  }
  return {
    lineCount, byteCount,
    errors: exceeds({ lineCount, byteCount }, thresholds)
      ? [`branch machine-output budget exceeded: ${lineCount} added lines, ${byteCount} positive byte growth; deletions do not offset additions`] : [],
  };
}

export function validateMachineArtifactRetention({ rootDir = ROOT, baseRef = "origin/main" } = {}) {
  const registry = JSON.parse(fs.readFileSync(path.join(rootDir, REGISTRY_PATH), "utf8"));
  validateRegistry(registry);
  const families = readRuntimeAssetFamilies(rootDir);
  const base = git(rootDir, ["merge-base", baseRef, "HEAD"]).trim();
  const index = readIndex(rootDir);
  const working = readWorking(rootDir, index.allPaths);
  const errors = [];
  const results = {};
  for (const [label, snapshot] of [["index", index], ["working tree", working]]) {
    const audit = auditMachineFiles(snapshot.files, { registry, families, allPaths: snapshot.allPaths });
    const growth = auditBranchGrowth({ rootDir, base, files: snapshot.files, cached: label === "index", otherPaths: snapshot.otherPaths, thresholds: registry.branchThresholds });
    errors.push(...[...audit.errors, ...growth.errors].map((error) => `${label}: ${error}`));
    results[label] = { fileCount: snapshot.files.size, collectionCount: audit.totals.size, growth };
  }
  return { errors, results, base };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.length && (args.length !== 2 || args[0] !== "--base")) throw new Error("Usage: validate-machine-artifact-retention.mjs [--base <ref>]");
  const result = validateMachineArtifactRetention({ baseRef: args[1] ?? "origin/main" });
  if (result.errors.length) {
    result.errors.forEach((error) => process.stderr.write(`[machine-artifact-retention] ${error}\n`));
    process.exitCode = 1;
  } else {
    process.stdout.write(`[machine-artifact-retention] index and working tree passed file, collection, branch, and generated-output checks (${result.results["working tree"].fileCount} machine files)\n`);
  }
}
