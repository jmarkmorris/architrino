#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCENES_DIR = "content/scenes";
const MARKDOWN_INDEX_PATH = "content/markdown/markdown_index.json";
const ALLOWLIST_PATH = "scripts/config/orphan-markdown-scene-allowlist.json";

const args = process.argv.slice(2);
const wantsHelp = args.includes("--help") || args.includes("-h");
const strict = args.includes("--strict");
const unknownArgs = args.filter((arg) => !["--help", "-h", "--strict"].includes(arg));

if (wantsHelp) {
  console.log("Usage: node scripts/audit-unlinked-markdown-scenes.mjs [--strict]");
  console.log(
    "Reports authored markdown files that are not attached to scene markdown sources."
  );
  process.exit(0);
}

if (unknownArgs.length) {
  console.error(`Unknown argument(s): ${unknownArgs.join(", ")}`);
  process.exit(2);
}

const rootDir = process.cwd();
const errors = [];
const warnings = [];

function toPosixPath(value) {
  return String(value).replace(/\\/g, "/");
}

function normalizePath(value) {
  return toPosixPath(String(value).trim())
    .replace(/^\.?\//, "")
    .replace(/\/+/g, "/")
    .replace(/\/$/, "");
}

function asText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function readJson(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  try {
    return JSON.parse(fs.readFileSync(absolutePath, "utf8"));
  } catch (error) {
    errors.push(`${relativePath}: failed to read JSON (${error.message})`);
    return null;
  }
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(rootDir, relativePath));
}

function walkFiles(relativeDir, predicate) {
  const absoluteDir = path.join(rootDir, relativeDir);
  if (!fs.existsSync(absoluteDir)) {
    return [];
  }
  const result = [];
  const stack = [absoluteDir];
  while (stack.length) {
    const currentDir = stack.pop();
    const entries = fs
      .readdirSync(currentDir, { withFileTypes: true })
      .sort((a, b) => b.name.localeCompare(a.name));
    for (const entry of entries) {
      const absolutePath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        stack.push(absolutePath);
        continue;
      }
      if (!entry.isFile() || !predicate(entry.name, absolutePath)) {
        continue;
      }
      result.push(normalizePath(path.relative(rootDir, absolutePath)));
    }
  }
  return result.sort((a, b) => a.localeCompare(b));
}

function resolveMarkdownIndex() {
  const data = readJson(MARKDOWN_INDEX_PATH);
  const files = Array.isArray(data?.files) ? data.files : [];
  return files.map(normalizePath).filter((filePath) => filePath.endsWith(".md"));
}

function resolveAllowlist() {
  const data = readJson(ALLOWLIST_PATH);
  const entries = Array.isArray(data?.paths) ? data.paths : [];
  const paths = new Set();
  for (const entry of entries) {
    const allowPath = normalizePath(typeof entry === "string" ? entry : entry?.path);
    if (!allowPath) {
      warnings.push(`${ALLOWLIST_PATH}: skipped allowlist entry without a path`);
      continue;
    }
    paths.add(allowPath);
  }
  return paths;
}

function collectSceneMarkdownSources(scenePath, state) {
  const normalizedScenePath = normalizePath(scenePath);
  if (!normalizedScenePath) {
    return;
  }

  if (!fileExists(normalizedScenePath)) {
    errors.push(`Scene is missing: ${normalizedScenePath}`);
    return;
  }

  const data = readJson(normalizedScenePath);
  const scene = data?.scene;
  if (!scene || typeof scene !== "object") {
    return;
  }

  const sceneMarkdownPath =
    scene.source?.type === "markdown" && typeof scene.source?.path === "string"
      ? normalizePath(scene.source.path)
      : "";
  if (sceneMarkdownPath) {
    state.linkedMarkdownPaths.add(sceneMarkdownPath);
    state.markdownSourceRows.push([sceneMarkdownPath, normalizedScenePath]);
  }

  const objects = Array.isArray(data.objects) ? data.objects : [];
  for (const objectData of objects) {
    const objectMarkdownPath = normalizePath(asText(objectData?.markdownPath));
    if (objectMarkdownPath) {
      state.linkedMarkdownPaths.add(objectMarkdownPath);
      state.markdownSourceRows.push([objectMarkdownPath, normalizedScenePath]);
    }
  }
}

const markdownFiles = resolveMarkdownIndex();
const allowlistedPaths = resolveAllowlist();
const markdownIndexSet = new Set(markdownFiles);

for (const allowPath of allowlistedPaths) {
  if (!markdownIndexSet.has(allowPath)) {
    warnings.push(`${ALLOWLIST_PATH}: allowlisted path is not in markdown index: ${allowPath}`);
  }
}

const state = {
  linkedMarkdownPaths: new Set(),
  markdownSourceRows: [],
};

const sceneFiles = walkFiles(SCENES_DIR, (name) => name.toLowerCase().endsWith(".json"));
sceneFiles.forEach((scenePath) => collectSceneMarkdownSources(scenePath, state));

const unlinkedMarkdownPaths = markdownFiles.filter(
  (markdownPath) => !state.linkedMarkdownPaths.has(markdownPath) && !allowlistedPaths.has(markdownPath)
);

console.log("audit-unlinked-markdown-scenes mode: check");
console.log(`- Markdown index files: ${markdownFiles.length}`);
console.log(`- Scene files scanned: ${sceneFiles.length}`);
console.log(`- Scene-linked markdown files: ${state.linkedMarkdownPaths.size}`);
console.log(`- Allowlisted markdown files: ${allowlistedPaths.size}`);
console.log(`- Unlinked markdown files: ${unlinkedMarkdownPaths.length}`);

if (allowlistedPaths.size) {
  console.log("");
  console.log("allowlisted:");
  [...allowlistedPaths].sort().forEach((allowPath) => {
    console.log(`- ${allowPath}`);
  });
}

if (unlinkedMarkdownPaths.length) {
  console.log("");
  console.log("unlinked:");
  unlinkedMarkdownPaths.forEach((markdownPath) => {
    console.log(`- ${markdownPath}`);
  });
}

if (warnings.length) {
  console.log("");
  console.log("warnings:");
  warnings.forEach((warning) => console.log(`- ${warning}`));
}

if (errors.length) {
  console.log("");
  console.log("errors:");
  errors.forEach((error) => console.log(`- ${error}`));
}

if (errors.length || (strict && (warnings.length || unlinkedMarkdownPaths.length))) {
  process.exitCode = 1;
}
