#!/usr/bin/env node

// Builds the local-only operator navigation manifest for reference/.
//
// This surface is a development aid, not a published artifact. Its output is a
// reproducible ignored build product, and reference.html plus
// src/apps/reference/ are listed in the static-site builder's internal developer
// harness paths, so nothing here can reach a Pages deployment.
//
// Default scope is three directory levels below the reference root, which
// measured 939 of 1,084 markdown files on 2026-09-03. Pass --depth N to change
// it; --depth 5 captures everything currently present.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
// Surface roots, each walked independently and presented as a top-level folder
// under a synthetic repository node. Labels are explicit because deriving them
// from the last path segment gives useless names such as "Aaa".
const SURFACE_ROOTS = [
  { path: "reference", label: "Reference" },
  { path: "content/markdown/aaa", label: "Corpus" },
];
const OUTPUT_PATH = "content/generated/reference/reference-surface.v1.json";
const SCHEMA = "architrino/reference-surface.v1";
const DEFAULT_MAX_DEPTH = 3;

function humanize(name) {
  return name
    .split(/[-_.]/u)
    .filter(Boolean)
    .map((part) => (/^[a-z]/u.test(part) ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}

function describeFile(relativePath) {
  const absolutePath = path.join(ROOT_DIR, relativePath);
  const fallback = humanize(path.basename(relativePath, ".md"));
  let text = "";
  let bytes = 0;
  let modified = null;
  try {
    text = fs.readFileSync(absolutePath, "utf8");
    const stats = fs.statSync(absolutePath);
    bytes = stats.size;
    modified = stats.mtime.toISOString();
  } catch {
    return { path: relativePath, name: path.basename(relativePath), title: fallback, words: 0, bytes: 0, modified: null };
  }
  const words = text.split(/\s+/u).filter(Boolean).length;
  let title = fallback;
  for (const line of text.split("\n", 60)) {
    const heading = line.match(/^#\s+(.+?)\s*$/u);
    if (heading) {
      title = heading[1].replace(/[`*_]/gu, "");
      break;
    }
  }
  return { path: relativePath, name: path.basename(relativePath), title, words, bytes, modified };
}

function readEntries(relativeDir) {
  try {
    return fs.readdirSync(path.join(ROOT_DIR, relativeDir), { withFileTypes: true });
  } catch {
    return [];
  }
}

// Walks one directory into a node. `depth` counts directory levels already
// descended below the surface root, so depth 0 is the root itself.
function walk(relativeDir, depth, maxDepth) {
  const entries = readEntries(relativeDir);
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name)
    .sort()
    .map((name) => describeFile(`${relativeDir}/${name}`));

  const dirs = [];
  if (depth < maxDepth) {
    const childNames = entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
      .map((entry) => entry.name)
      .sort();
    for (const name of childNames) {
      const child = walk(`${relativeDir}/${name}`, depth + 1, maxDepth);
      if (child.fileCount) dirs.push(child);
    }
  }

  const fileCount = files.length + dirs.reduce((sum, dir) => sum + dir.fileCount, 0);
  const words = files.reduce((sum, file) => sum + file.words, 0) + dirs.reduce((sum, dir) => sum + dir.words, 0);

  return {
    id: relativeDir,
    name: humanize(path.basename(relativeDir)),
    path: relativeDir,
    depth,
    fileCount,
    directFileCount: files.length,
    words,
    dirs,
    files,
  };
}

function countDirectories(node) {
  return node.dirs.reduce((sum, dir) => sum + 1 + countDirectories(dir), 0);
}

function serialize(manifest) {
  return `${JSON.stringify(manifest, null, 2)}\n`;
}

function stripVolatile(text) {
  return text.replace(/"generatedAt":\s*"[^"]*",?\n/u, "");
}

function main() {
  const args = process.argv.slice(2);
  const mode = args.includes("--check") ? "check" : args.includes("--write") ? "write" : null;
  const depthFlag = args.indexOf("--depth");
  const maxDepth = depthFlag >= 0 ? Number.parseInt(args[depthFlag + 1], 10) : DEFAULT_MAX_DEPTH;

  if (!mode || !Number.isInteger(maxDepth) || maxDepth < 0) {
    process.stdout.write("usage: node scripts/build-reference-surface.mjs --write | --check [--depth N]\n");
    process.exitCode = 2;
    return;
  }

  // Each surface root is walked on its own, then hung under a synthetic
  // repository node so the surface opens at the repo rather than inside one
  // subtree. The synthetic node holds no files of its own.
  const rootNodes = SURFACE_ROOTS.map(({ path: rootPath, label }) => {
    const node = walk(rootPath, 0, maxDepth);
    return { ...node, name: label };
  }).filter((node) => node.fileCount);

  const tree = {
    id: "",
    name: "Repository",
    path: "",
    depth: 0,
    fileCount: rootNodes.reduce((sum, node) => sum + node.fileCount, 0),
    directFileCount: 0,
    words: rootNodes.reduce((sum, node) => sum + node.words, 0),
    dirs: rootNodes,
    files: [],
  };

  const manifest = {
    schema: SCHEMA,
    generatedAt: new Date().toISOString(),
    roots: SURFACE_ROOTS.map((entry) => entry.path),
    maxDepth,
    totals: { directories: countDirectories(tree) - 1, files: tree.fileCount, words: tree.words },
    tree,
  };

  const outputAbsolute = path.join(ROOT_DIR, OUTPUT_PATH);
  const next = serialize(manifest);

  if (mode === "check") {
    if (!fs.existsSync(outputAbsolute)) {
      process.stdout.write(`[reference-surface] ${OUTPUT_PATH} is missing\nRun: node scripts/build-reference-surface.mjs --write\n`);
      process.exitCode = 1;
      return;
    }
    if (stripVolatile(fs.readFileSync(outputAbsolute, "utf8")) !== stripVolatile(next)) {
      process.stdout.write(`[reference-surface] ${OUTPUT_PATH} is stale\nRun: node scripts/build-reference-surface.mjs --write\n`);
      process.exitCode = 1;
      return;
    }
    process.stdout.write(`[reference-surface] ${OUTPUT_PATH} is current\n`);
    return;
  }

  fs.mkdirSync(path.dirname(outputAbsolute), { recursive: true });
  fs.writeFileSync(outputAbsolute, next);
  const { directories, files, words } = manifest.totals;
  process.stdout.write(
    `[reference-surface] wrote ${OUTPUT_PATH} (depth ${maxDepth}, ${directories} directories, ${files} files, ${words.toLocaleString("en-US")} words)\n`
  );
}

main();
