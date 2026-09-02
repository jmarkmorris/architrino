#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const MARKDOWN_ROOT = "content/markdown/aaa";
const SCENES_ROOT = "content/scenes";
const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "at",
  "for",
  "from",
  "in",
  "of",
  "the",
  "to",
  "versus",
  "vs",
  "with",
]);

// Stable compatibility routes may intentionally retain a legacy filename while
// presenting the current reader-facing title.
const COMPATIBILITY_TITLE_ALIASES = new Map([
  ["content/markdown/aaa/archie/ideal-braid-guide.md", "Coincident-Midpoint Three-Axis Circular Lorentz Geometry Guide"],
  [
    "content/markdown/aaa/archie/licenses-attributions.md",
    "Licenses, Attribution & Source Use",
  ],
  ["content/markdown/aaa/noether-braid/2d-braid-assemblies.md", "Planar (2D) Braid Assemblies"],
  ["content/markdown/aaa/noether-braid/3d-braid-assemblies.md", "Spatial (3D) Braid Assemblies"],
]);

const args = process.argv.slice(2);
const wantsHelp = args.includes("--help") || args.includes("-h");
const unknownArgs = args.filter((arg) => !["--help", "-h"].includes(arg));

if (wantsHelp) {
  console.log("Usage: node scripts/audit-title-filename-sync.mjs");
  console.log("Reports authored markdown and scene titles that do not map cleanly to source markdown filenames.");
  process.exit(0);
}

if (unknownArgs.length) {
  console.error(`Unknown argument(s): ${unknownArgs.join(", ")}`);
  process.exit(2);
}

const rootDir = process.cwd();
const errors = [];
const warnings = [];

function normalizePath(value) {
  return String(value || "")
    .replace(/\\/g, "/")
    .replace(/^\.?\//, "")
    .replace(/\/+/g, "/")
    .replace(/\/$/, "");
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

function readJson(relativePath) {
  try {
    return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
  } catch (error) {
    warnings.push(`${relativePath}: skipped invalid JSON (${error.message})`);
    return null;
  }
}

function readMarkdownH1(relativePath) {
  const text = fs.readFileSync(path.join(rootDir, relativePath), "utf8");
  const match = text.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

function stripColonSubtitle(value) {
  return String(value || "").split(":")[0].trim();
}

function normalizeTitleText(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\$\\mathbb\{A\}\\mathbb\{A\}\\mathbb\{A\}\$/g, "aaa")
    .replace(/\\mathbb\{A\}\\mathbb\{A\}\\mathbb\{A\}/g, "aaa")
    .replace(/\$S_8\$/g, "s8")
    .replace(/\$A_0\$/g, "a0")
    .replace(/\\Gamma_N/g, "gamma n")
    .replace(/&/g, " and ")
    .replace(/\bSU\s*\(\s*3\s*\)/gi, "su3")
    .replace(/\([^)]*\)/g, " ")
    .replace(/`/g, "")
    .toLowerCase()
    .replace(/\bmathematical\b/g, "mathematics")
    .replace(/\bgamma[_ -]?n\b/g, "gamma n")
    .replace(/([a-z])([0-9])/g, "$1 $2")
    .replace(/([0-9])([a-z])/g, "$1 $2")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokensForTitle(value) {
  const normalized = normalizeTitleText(stripColonSubtitle(value));
  if (!normalized) {
    return [];
  }
  return normalized.split(/\s+/).filter((token) => token && !STOP_WORDS.has(token));
}

function tokensForFilename(value) {
  const normalized = normalizeTitleText(value);
  if (!normalized) {
    return [];
  }
  return normalized.split(/\s+/).filter((token) => token && !STOP_WORDS.has(token));
}

function titleMatchesFilename(title, filenameBase) {
  const titleTokens = tokensForTitle(title);
  const fileTokens = tokensForFilename(filenameBase);
  if (!titleTokens.length || !fileTokens.length) {
    return true;
  }
  if (titleTokens.join("-") === fileTokens.join("-")) {
    return true;
  }

  const titleSet = new Set(titleTokens);
  const fileSet = new Set(fileTokens);
  const titleContainsFile = fileTokens.every((token) => titleSet.has(token));
  const fileContainsTitle = titleTokens.every((token) => fileSet.has(token));
  if (titleContainsFile || fileContainsTitle) {
    return true;
  }

  const overlap = fileTokens.filter((token) => titleSet.has(token)).length;
  return overlap / fileTokens.length >= 0.75 && overlap / titleTokens.length >= 0.5;
}

function isApprovedCompatibilityAlias(sourcePath, title) {
  return COMPATIBILITY_TITLE_ALIASES.get(sourcePath) === title;
}

function sourceMarkdownTitleRows() {
  const markdownPaths = walkFiles(
    MARKDOWN_ROOT,
    (name) => name.toLowerCase().endsWith(".md")
  );
  const rows = [];
  for (const markdownPath of markdownPaths) {
    if (path.basename(markdownPath).toLowerCase() === "readme.md") {
      continue;
    }
    const title = readMarkdownH1(markdownPath);
    if (!title) {
      continue;
    }
    const filenameBase = path.basename(markdownPath, ".md");
    if (!isApprovedCompatibilityAlias(markdownPath, title) && !titleMatchesFilename(title, filenameBase)) {
      rows.push({ title, filenameBase, sourcePath: markdownPath });
    }
  }
  return rows;
}

function sceneMarkdownSourceRows() {
  const scenePaths = walkFiles(SCENES_ROOT, (name) => name.toLowerCase().endsWith(".json"));
  const rows = [];
  for (const scenePath of scenePaths) {
    const data = readJson(scenePath);
    const scene = data?.scene;
    if (!scene || typeof scene !== "object") {
      continue;
    }
    const sourcePath =
      scene.source?.type === "markdown" && typeof scene.source?.path === "string"
        ? normalizePath(scene.source.path)
        : "";
    if (!sourcePath || !sourcePath.startsWith(MARKDOWN_ROOT)) {
      continue;
    }
    const title = typeof scene.title === "string" ? scene.title.trim() : "";
    if (!title) {
      continue;
    }
    const filenameBase = path.basename(sourcePath, ".md");
    if (!isApprovedCompatibilityAlias(sourcePath, title) && !titleMatchesFilename(title, filenameBase)) {
      rows.push({ title, filenameBase, sourcePath, scenePath });
    }
  }
  return rows;
}

const sourceRows = sourceMarkdownTitleRows();
const sceneRows = sceneMarkdownSourceRows();

console.log("audit-title-filename-sync mode: check");
console.log(`- Source markdown title mismatches: ${sourceRows.length}`);
console.log(`- Scene title/source filename mismatches: ${sceneRows.length}`);

if (sourceRows.length) {
  console.log("");
  console.log("source markdown mismatches:");
  for (const row of sourceRows) {
    console.log(`- ${row.sourcePath}: title "${row.title}" does not match filename "${row.filenameBase}"`);
  }
}

if (sceneRows.length) {
  console.log("");
  console.log("scene title/source filename mismatches:");
  for (const row of sceneRows) {
    console.log(
      `- ${row.scenePath}: title "${row.title}" points to "${row.sourcePath}" (filename "${row.filenameBase}")`
    );
  }
}

if (warnings.length) {
  console.log("");
  console.log("warnings:");
  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}

if (sourceRows.length || sceneRows.length) {
  errors.push("title/source filename mismatches remain");
}

if (errors.length) {
  process.exitCode = 1;
}
