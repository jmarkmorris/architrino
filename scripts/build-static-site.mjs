#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { prepareRuntimeAssets, runtimeAssetPaths, isGeneratedRuntimeAsset, readRuntimeAssetFamilies } from "./prepare-runtime-assets.mjs";
import { selectPagesImages, deploymentImageCatalog, IMAGE_CATALOG } from "./pages-image-assets.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const PAGES_MAX_BYTES = 1_000_000_000;

// Keep PowerPoint authoring files in Git, but publish their reader-facing PDF
// exports instead. This is an operator-approved deployment-only exclusion.
export const isPowerPointOriginal = (name) => /\.(?:ppt|pptx|pptm|pot|potx|potm|pps|ppsx|ppsm)$/i.test(name);
export const WEB_KATEX_DIRECTORY = "apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/";
const INTERNAL_DEVELOPER_HARNESS_PATHS = [
  "solver-gpu-harness.html",
  "src/apps/solver-gpu-harness/",
];
const INTERNAL_SERVICE_PROTOCOL_PATHS = [
  "src/archie-service/",
  "scripts/archie-service/",
  "tests/archie-service",
  "reference/priorities/dormant-deferred/archie/mcp/",
  "content/generated/source-index/",
];

// Internal developer harnesses and authoring assets remain repository sources.
// The web apps share only the KaTeX subtree with the iOS app, including its
// fonts and license at their current URLs.
export const isPagesDeploymentExcluded = (name) => isPowerPointOriginal(name) ||
  INTERNAL_DEVELOPER_HARNESS_PATHS.some((internalPath) => name === internalPath ||
    (internalPath.endsWith("/") && name.startsWith(internalPath))) ||
  INTERNAL_SERVICE_PROTOCOL_PATHS.some((internalPath) => name === internalPath || name.startsWith(internalPath)) ||
  name.startsWith("reference/design/") ||
  (name.startsWith("apps/ios/") && !name.startsWith(WEB_KATEX_DIRECTORY));

export function buildStaticSite({ rootDir = ROOT, outputDir = path.join(rootDir, ".tmp/site"), trackedPaths, prepare = prepareRuntimeAssets, maxBytes = PAGES_MAX_BYTES } = {}) {
  if (!Number.isSafeInteger(maxBytes) || maxBytes < 1 || maxBytes > PAGES_MAX_BYTES) throw new Error("invalid Pages size budget");
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
  const publicPaths = tracked.filter((name) => !name.split("/").some((part) => part.startsWith(".")) &&
    !isGeneratedRuntimeAsset(name, families) && !isPagesDeploymentExcluded(name));
  const deployableRuntimeAssets = runtimeAssetPaths(rootDir).filter((name) => !isPagesDeploymentExcluded(name));
  const candidates = [...new Set([...publicPaths, ...deployableRuntimeAssets])];
  // Validate every candidate before the dependency scanner reads any source.
  const candidatePayload = candidates.map((name) => {
    const source = path.resolve(rootDir, name);
    if (!source.startsWith(`${rootDir}${path.sep}`)) throw new Error(`site path escapes repository: ${name}`);
    const stat = fs.lstatSync(source);
    if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`site payload must be a regular file: ${name}`);
    if (!fs.realpathSync(source).startsWith(`${fs.realpathSync(rootDir)}${path.sep}`)) throw new Error(`site source resolves outside repository: ${name}`);
    return { name, source, bytes: stat.size };
  });
  const imageSelection = selectPagesImages({ rootDir, paths: candidates });
  const excludedImages = new Set(imageSelection.excludedPaths);
  const payload = candidatePayload.filter(({ name }) => !excludedImages.has(name)).map((entry) => {
    if (entry.name !== IMAGE_CATALOG) return entry;
    const content = deploymentImageCatalog(rootDir, imageSelection.retainedPaths);
    return { ...entry, content, bytes: Buffer.byteLength(content) };
  });
  const byteCount = payload.reduce((sum, entry) => sum + entry.bytes, 0);
  if (byteCount > maxBytes) throw new Error(`Pages payload exceeds supported size budget: ${byteCount} bytes > ${maxBytes}; review deployment scope before publishing`);
  for (const { name, source, content } of payload) {
    const target = path.join(outputDir, name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    if (content !== undefined) fs.writeFileSync(target, content);
    else fs.copyFileSync(source, target);
  }
  fs.writeFileSync(path.join(outputDir, ".nojekyll"), "");
  return { outputDir, fileCount: payload.length, runtimeAssetCount: deployableRuntimeAssets.length, byteCount,
    images: { retained: imageSelection.retainedPaths.length, excluded: excludedImages.size,
      excludedBytes: candidatePayload.filter(({ name }) => excludedImages.has(name)).reduce((sum, entry) => sum + entry.bytes, 0) } };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.length && (args.length !== 2 || args[0] !== "--out")) throw new Error("Usage: build-static-site.mjs [--out <empty-directory>]");
  console.log(JSON.stringify(buildStaticSite({ outputDir: args[1] ? path.resolve(args[1]) : undefined }), null, 2));
}
