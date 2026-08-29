#!/usr/bin/env node

import { existsSync, readFileSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY_PATH = "reference/op/machine-artifact-retention-registry.v1.json";
const registry = JSON.parse(readFileSync(path.join(ROOT, REGISTRY_PATH), "utf8"));

if (registry.schema !== "architrino/machine-artifact-retention-registry.v1") {
  throw new Error(`unexpected registry schema in ${REGISTRY_PATH}`);
}
const lineThreshold = Number(registry.thresholds?.lineCount);
const byteThreshold = Number(registry.thresholds?.byteCount);
const evidenceLineThreshold = Number(registry.thresholds?.evidenceLineCount);
const evidenceByteThreshold = Number(registry.thresholds?.evidenceByteCount);
if (!Number.isSafeInteger(lineThreshold) || lineThreshold <= 0 ||
    !Number.isSafeInteger(byteThreshold) || byteThreshold <= 0 ||
    !Number.isSafeInteger(evidenceLineThreshold) || evidenceLineThreshold <= 0 ||
    !Number.isSafeInteger(evidenceByteThreshold) || evidenceByteThreshold <= 0) {
  throw new Error("machine-artifact retention thresholds must be positive integers");
}

function thresholdsFor(relativePath) {
  if (relativePath.startsWith("reference/priorities/") && relativePath.includes("/evidence/")) {
    return { lineCount: evidenceLineThreshold, byteCount: evidenceByteThreshold };
  }
  return { lineCount: lineThreshold, byteCount: byteThreshold };
}

const listed = spawnSync("git", ["ls-files", "-z", "--", "*.json"], {
  cwd: ROOT,
  encoding: "buffer",
});
if (listed.status !== 0) {
  throw new Error(`git ls-files failed: ${listed.stderr?.toString("utf8") ?? "unknown error"}`);
}
const trackedJson = listed.stdout.toString("utf8").split("\0").filter(Boolean);
const qualifying = new Map();
for (const relativePath of trackedJson) {
  const absolutePath = path.join(ROOT, relativePath);
  if (!existsSync(absolutePath)) continue;
  const byteCount = statSync(absolutePath).size;
  const thresholds = thresholdsFor(relativePath);
  if (byteCount < thresholds.byteCount) {
    const text = readFileSync(absolutePath, "utf8");
    const lineCount = text.endsWith("\n") ? text.split("\n").length - 1 : text.split("\n").length;
    if (lineCount < thresholds.lineCount) continue;
    qualifying.set(relativePath, { byteCount, lineCount });
    continue;
  }
  const text = readFileSync(absolutePath, "utf8");
  const lineCount = text.endsWith("\n") ? text.split("\n").length - 1 : text.split("\n").length;
  qualifying.set(relativePath, { byteCount, lineCount });
}

const errors = [];
const registryPaths = new Set();
for (const record of registry.records ?? []) {
  const requiredStrings = ["path", "owner", "regenerationCommand", "retentionReason", "compactAlternativeInsufficient"];
  for (const key of requiredStrings) {
    if (typeof record[key] !== "string" || record[key].trim() === "") {
      errors.push(`registry record ${record.path ?? "<unknown>"} has no ${key}`);
    }
  }
  if (!Array.isArray(record.consumers) || record.consumers.length === 0 ||
      record.consumers.some((consumer) => typeof consumer !== "string" || consumer.trim() === "")) {
    errors.push(`registry record ${record.path ?? "<unknown>"} must name at least one consumer`);
  }
  if (registryPaths.has(record.path)) errors.push(`duplicate registry path: ${record.path}`);
  registryPaths.add(record.path);
  if (!qualifying.has(record.path)) errors.push(`registered path is absent or below threshold: ${record.path}`);
}
for (const [relativePath, measurements] of qualifying) {
  if (!registryPaths.has(relativePath)) {
    errors.push(`unregistered large JSON: ${relativePath} (${measurements.lineCount} lines, ${measurements.byteCount} bytes)`);
  }
}

if (errors.length > 0) {
  errors.forEach((error) => process.stderr.write(`[machine-artifact-retention] ${error}\n`));
  process.exit(1);
}
process.stdout.write(`[machine-artifact-retention] checked ${trackedJson.length} tracked JSON files; ${qualifying.size} require registered retention\n`);
