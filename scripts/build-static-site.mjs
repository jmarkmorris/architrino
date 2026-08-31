#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { prepareRuntimeAssets, runtimeAssetPaths, isGeneratedRuntimeAsset, readRuntimeAssetFamilies } from "./prepare-runtime-assets.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function buildStaticSite({ rootDir = ROOT, outputDir = path.join(rootDir, ".tmp/site"), trackedPaths, prepare = prepareRuntimeAssets } = {}) {
  rootDir = path.resolve(rootDir);
  outputDir = path.resolve(outputDir);
  if (outputDir === rootDir || rootDir.startsWith(`${outputDir}${path.sep}`)) throw new Error("site output must not contain the source repository");
  if (outputDir.startsWith(`${rootDir}${path.sep}`) && !outputDir.startsWith(`${rootDir}/.tmp/`)) throw new Error("in-repository site output must be under ignored .tmp/");
  if (fs.existsSync(outputDir) && (fs.lstatSync(outputDir).isSymbolicLink() || fs.readdirSync(outputDir).length)) throw new Error("site output must be an empty directory");
  prepare({ rootDir });
  const families = readRuntimeAssetFamilies(rootDir);
  const tracked = trackedPaths ?? execFileSync("git", ["ls-files", "-z"], { cwd: rootDir, encoding: "utf8" }).split("\0").filter(Boolean);
  // Copy only versioned public paths plus the explicitly enumerated outputs.
  // Never recursively copy the checkout: it contains local runs and credentials.
  const publicPaths = tracked.filter((name) => !name.split("/").some((part) => part.startsWith(".")) && !isGeneratedRuntimeAsset(name, families));
  const paths = [...new Set([...publicPaths, ...runtimeAssetPaths(rootDir)])];
  for (const name of paths) {
    const source = path.resolve(rootDir, name);
    if (!source.startsWith(`${rootDir}${path.sep}`)) throw new Error(`site path escapes repository: ${name}`);
    const stat = fs.lstatSync(source);
    if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`site payload must be a regular file: ${name}`);
    if (!fs.realpathSync(source).startsWith(`${fs.realpathSync(rootDir)}${path.sep}`)) throw new Error(`site source resolves outside repository: ${name}`);
    const target = path.join(outputDir, name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
  }
  fs.writeFileSync(path.join(outputDir, ".nojekyll"), "");
  return { outputDir, fileCount: paths.length, runtimeAssetCount: runtimeAssetPaths(rootDir).length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.length && (args.length !== 2 || args[0] !== "--out")) throw new Error("Usage: build-static-site.mjs [--out <empty-directory>]");
  console.log(JSON.stringify(buildStaticSite({ outputDir: args[1] ? path.resolve(args[1]) : undefined }), null, 2));
}
