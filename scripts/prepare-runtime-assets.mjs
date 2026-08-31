#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { PRESCRIBED_ASSEMBLY_TARGETS } from "./eom/generate-prescribed-braid-record.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const RUNTIME_ASSET_MANIFEST_PATH = "scripts/config/generated-runtime-assets.json";

export function readRuntimeAssetFamilies(rootDir = ROOT) {
  const manifest = JSON.parse(fs.readFileSync(path.join(rootDir, RUNTIME_ASSET_MANIFEST_PATH), "utf8"));
  if (manifest.schema !== "architrino/generated-runtime-assets.v1") throw new Error("invalid runtime asset manifest");
  return manifest.families;
}

export function isGeneratedRuntimeAsset(relativePath, families) {
  return families.some((family) => family.path === relativePath ||
    (family.directory && relativePath.startsWith(`${family.directory}/`)));
}

export function runtimeAssetPaths(rootDir = ROOT) {
  return readRuntimeAssetFamilies(rootDir).flatMap((family) => {
    if (family.path) return [family.path];
    if (family.id === "borg-records") return PRESCRIBED_ASSEMBLY_TARGETS.map((target) => path.relative(ROOT, target.outPath).split(path.sep).join("/"));
    throw new Error(`runtime family has no output enumerator: ${family.id}`);
  });
}

// Only declared runtime outputs are built here (temporarily tracked during the
// Pages proof phase, then ignored). Authored-source repair and
// tracked textbook/scene regeneration remain separate, explicitly requested work.
export function prepareRuntimeAssets({ rootDir = ROOT, mode = "write", familyId = null, log = console.log } = {}) {
  if (!["write", "check"].includes(mode)) throw new Error("choose write or check");
  const families = readRuntimeAssetFamilies(rootDir).filter((family) => !familyId || family.id === familyId);
  if (!families.length) throw new Error(`unknown runtime asset family: ${familyId}`);
  for (const family of families) {
    const args = [...family.command];
    if (mode === "check") args[args.length - 1] = "--check";
    log(`[runtime-assets] ${mode}: ${family.id}`);
    const result = spawnSync(process.execPath, args, { cwd: rootDir, encoding: "utf8", maxBuffer: 8 * 1024 * 1024 });
    if (result.error || result.status !== 0) {
      throw new Error(`${family.id}: ${result.error?.message || result.stderr || result.stdout || `exit ${result.status}`}`);
    }
  }
  return families;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.length !== 1 || !["--write", "--check"].includes(args[0])) {
    throw new Error("Usage: node scripts/prepare-runtime-assets.mjs --write|--check");
  }
  prepareRuntimeAssets({ mode: args[0].slice(2) });
}
