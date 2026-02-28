#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCENES_DIR = "content/scenes";
const MARKDOWN_DIR = "content/markdown";
const SCENES_INDEX_PATH = "content/scenes/scenes_index.json";
const MARKDOWN_INDEX_PATH = "content/markdown/markdown_index.json";

const args = new Set(process.argv.slice(2));
const wantsWrite = args.has("--write");
const wantsCheck = args.has("--check");
const strict = args.has("--strict");

const unknownArgs = [...args].filter(
  (arg) => !["--check", "--write", "--strict", "--help"].includes(arg)
);

if (args.has("--help")) {
  printUsage(0);
}
if (unknownArgs.length) {
  console.error(`Unknown argument(s): ${unknownArgs.join(", ")}`);
  printUsage(2);
}
if (wantsWrite && wantsCheck) {
  console.error("Use either --check or --write, not both.");
  printUsage(2);
}

const mode = wantsWrite ? "write" : "check";
const rootDir = process.cwd();
const errors = [];
const warnings = [];
const notes = [];

function printUsage(exitCode) {
  console.log("Usage: node scripts/validate-content.mjs [--check|--write] [--strict]");
  console.log("  --check   Validate content and index drift (default)");
  console.log("  --write   Regenerate scenes_index.json and markdown_index.json");
  console.log("  --strict  Treat warnings as failures");
  process.exit(exitCode);
}

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

function titleFromSlug(slug) {
  return String(slug)
    .replace(/\.json$/i, "")
    .split(/[-_]+/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function readJson(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  try {
    const raw = fs.readFileSync(absolutePath, "utf8");
    return { ok: true, data: JSON.parse(raw), raw };
  } catch (error) {
    return { ok: false, error };
  }
}

function walkFiles(relativeDir, predicate) {
  const absoluteDir = path.join(rootDir, relativeDir);
  const result = [];
  const stack = [absoluteDir];
  while (stack.length) {
    const currentDir = stack.pop();
    const entries = fs
      .readdirSync(currentDir, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      const absolutePath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        stack.push(absolutePath);
        continue;
      }
      if (!entry.isFile()) {
        continue;
      }
      if (!predicate(entry.name, absolutePath)) {
        continue;
      }
      result.push(normalizePath(path.relative(rootDir, absolutePath)));
    }
  }
  return result.sort((a, b) => a.localeCompare(b));
}

function walkDirs(relativeDir) {
  const absoluteDir = path.join(rootDir, relativeDir);
  const result = [];
  const stack = [absoluteDir];
  while (stack.length) {
    const currentDir = stack.pop();
    const rel = normalizePath(path.relative(rootDir, currentDir));
    result.push(rel);
    const entries = fs
      .readdirSync(currentDir, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      if (entry.isDirectory()) {
        stack.push(path.join(currentDir, entry.name));
      }
    }
  }
  return result.sort((a, b) => a.localeCompare(b));
}

function createLowerMap(paths) {
  const map = new Map();
  for (const p of paths) {
    const key = p.toLowerCase();
    if (!map.has(key)) {
      map.set(key, p);
    }
  }
  return map;
}

function summarizeIndexDrift(indexedPaths, actualPaths) {
  const exactSet = new Set();
  const lowerToIndexed = new Map();
  const duplicateExact = [];
  const duplicateCaseOnly = [];

  for (const originalPath of indexedPaths) {
    const normalized = normalizePath(originalPath);
    if (exactSet.has(normalized)) {
      duplicateExact.push(normalized);
      continue;
    }
    exactSet.add(normalized);
    const lower = normalized.toLowerCase();
    const prior = lowerToIndexed.get(lower);
    if (prior && prior !== normalized) {
      duplicateCaseOnly.push([prior, normalized]);
    } else if (!prior) {
      lowerToIndexed.set(lower, normalized);
    }
  }

  const actualSet = new Set(actualPaths);
  const lowerToActual = createLowerMap(actualPaths);
  const stale = [];
  const caseMismatch = [];
  const missing = [];

  for (const indexedPath of exactSet) {
    if (actualSet.has(indexedPath)) {
      continue;
    }
    const actual = lowerToActual.get(indexedPath.toLowerCase());
    if (actual) {
      caseMismatch.push({ indexed: indexedPath, actual });
    } else {
      stale.push(indexedPath);
    }
  }

  for (const actualPath of actualPaths) {
    if (exactSet.has(actualPath)) {
      continue;
    }
    const hasDifferentCaseEntry = lowerToIndexed.has(actualPath.toLowerCase());
    if (!hasDifferentCaseEntry) {
      missing.push(actualPath);
    }
  }

  return {
    stale: stale.sort((a, b) => a.localeCompare(b)),
    missing: missing.sort((a, b) => a.localeCompare(b)),
    caseMismatch: caseMismatch.sort((a, b) => a.indexed.localeCompare(b.indexed)),
    duplicateExact: duplicateExact.sort((a, b) => a.localeCompare(b)),
    duplicateCaseOnly: duplicateCaseOnly.sort((a, b) => a[0].localeCompare(b[0])),
  };
}

function printItems(title, items) {
  if (!items.length) {
    return;
  }
  console.log(`- ${title} (${items.length})`);
  for (const item of items) {
    console.log(`  - ${item}`);
  }
}

function printCaseItems(title, items) {
  if (!items.length) {
    return;
  }
  console.log(`- ${title} (${items.length})`);
  for (const item of items) {
    console.log(`  - ${item.indexed} (actual: ${item.actual})`);
  }
}

function printCaseDuplicateItems(title, items) {
  if (!items.length) {
    return;
  }
  console.log(`- ${title} (${items.length})`);
  for (const [a, b] of items) {
    console.log(`  - ${a} <> ${b}`);
  }
}

function writeJsonIfChanged(relativePath, data) {
  const absolutePath = path.join(rootDir, relativePath);
  const next = `${JSON.stringify(data, null, 2)}\n`;
  const current = fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, "utf8") : null;
  if (current === next) {
    return false;
  }
  fs.writeFileSync(absolutePath, next, "utf8");
  return true;
}

function inferSceneId(scenePath) {
  const file = scenePath.split("/").pop() || "scene";
  return file.replace(/\.json$/i, "");
}

function inferSceneName(scenePath, sceneMeta, sceneId) {
  return (
    asText(sceneMeta.name) ||
    asText(sceneMeta.title) ||
    titleFromSlug(sceneId) ||
    titleFromSlug(scenePath.split("/").pop() || "scene")
  );
}

function buildGeneratedScenesIndex(scenePaths, sceneDataByPath, currentSceneEntries) {
  const derivedByPath = new Map(
    scenePaths.map((scenePath) => {
      const sceneData = sceneDataByPath.get(scenePath) || {};
      const sceneMeta = sceneData.scene || {};
      const sceneId = asText(sceneMeta.id) || inferSceneId(scenePath);
      const sceneName = inferSceneName(scenePath, sceneMeta, sceneId);
      return [
        scenePath,
        {
          id: sceneId,
          name: sceneName,
          path: scenePath,
        },
      ];
    })
  );

  const generated = [];
  const seenPaths = new Set();

  for (const entry of currentSceneEntries) {
    if (!entry || typeof entry.path !== "string") {
      continue;
    }
    if (seenPaths.has(entry.path)) {
      continue;
    }
    const derived = derivedByPath.get(entry.path);
    if (!derived) {
      continue;
    }
    generated.push({
      id: asText(entry.id) || derived.id,
      name: asText(entry.name) || derived.name,
      path: entry.path,
    });
    seenPaths.add(entry.path);
  }

  const newPaths = scenePaths
    .filter((scenePath) => !seenPaths.has(scenePath))
    .sort((a, b) => a.localeCompare(b));
  for (const scenePath of newPaths) {
    generated.push(derivedByPath.get(scenePath));
  }

  return { scenes: generated };
}

function addMissingRefError(sourcePath, field, refPath) {
  errors.push(`${sourcePath} -> ${field}: missing path "${refPath}"`);
}

function addCaseMismatchWarning(sourcePath, field, refPath, actualPath) {
  warnings.push(
    `${sourcePath} -> ${field}: case mismatch "${refPath}" (actual: "${actualPath}")`
  );
}

function validateFileReference(sourcePath, field, refPath, exactSet, lowerMap) {
  const normalized = normalizePath(refPath);
  if (!normalized) {
    errors.push(`${sourcePath} -> ${field}: empty path`);
    return;
  }
  if (exactSet.has(normalized)) {
    return;
  }
  const actual = lowerMap.get(normalized.toLowerCase());
  if (actual) {
    addCaseMismatchWarning(sourcePath, field, normalized, actual);
  } else {
    addMissingRefError(sourcePath, field, normalized);
  }
}

function validateDirectoryReference(sourcePath, field, refPath, exactSet, lowerMap) {
  const normalized = normalizePath(refPath);
  if (!normalized) {
    errors.push(`${sourcePath} -> ${field}: empty directory`);
    return;
  }
  if (exactSet.has(normalized)) {
    return;
  }
  const actual = lowerMap.get(normalized.toLowerCase());
  if (actual) {
    addCaseMismatchWarning(sourcePath, field, normalized, actual);
  } else {
    addMissingRefError(sourcePath, field, normalized);
  }
}

const allSceneJson = walkFiles(SCENES_DIR, (name) => name.toLowerCase().endsWith(".json"));
const allMarkdownFiles = walkFiles(MARKDOWN_DIR, (name) => name.toLowerCase().endsWith(".md"));
const allMarkdownDirectories = walkDirs(MARKDOWN_DIR).map((d) => normalizePath(d));

const sceneConfigs = [];
const ancillarySceneJson = [];
const sceneDataByPath = new Map();

for (const sceneJsonPath of allSceneJson) {
  if (sceneJsonPath === SCENES_INDEX_PATH) {
    continue;
  }
  const parsed = readJson(sceneJsonPath);
  if (!parsed.ok) {
    errors.push(`${sceneJsonPath}: failed to parse JSON (${parsed.error.message})`);
    continue;
  }
  const data = parsed.data;
  const isSceneConfig =
    data &&
    typeof data === "object" &&
    data.scene &&
    typeof data.scene === "object" &&
    Array.isArray(data.objects);
  if (isSceneConfig) {
    sceneConfigs.push(sceneJsonPath);
    sceneDataByPath.set(sceneJsonPath, data);
  } else {
    ancillarySceneJson.push(sceneJsonPath);
  }
}

sceneConfigs.sort((a, b) => a.localeCompare(b));
ancillarySceneJson.sort((a, b) => a.localeCompare(b));

if (ancillarySceneJson.length) {
  notes.push(
    `Ignored non-scene JSON under ${SCENES_DIR}: ${ancillarySceneJson.join(", ")}`
  );
}

const indexedScenePaths = [];
const indexedMarkdownPaths = [];
const indexedSceneIds = [];
const currentSceneEntries = [];

const currentScenesIndex = readJson(SCENES_INDEX_PATH);
if (!currentScenesIndex.ok) {
  errors.push(
    `${SCENES_INDEX_PATH}: failed to parse JSON (${currentScenesIndex.error.message})`
  );
} else if (!Array.isArray(currentScenesIndex.data?.scenes)) {
  errors.push(`${SCENES_INDEX_PATH}: expected { \"scenes\": [...] }`);
} else {
  for (const [index, scene] of currentScenesIndex.data.scenes.entries()) {
    if (!scene || typeof scene !== "object") {
      errors.push(`${SCENES_INDEX_PATH}: scenes[${index}] is not an object`);
      continue;
    }
    if (typeof scene.path !== "string") {
      errors.push(`${SCENES_INDEX_PATH}: scenes[${index}].path must be a string`);
      continue;
    }
    const normalizedPath = normalizePath(scene.path);
    indexedScenePaths.push(normalizedPath);
    const sceneId = typeof scene.id === "string" ? scene.id.trim() : "";
    const sceneName = typeof scene.name === "string" ? scene.name.trim() : "";
    currentSceneEntries.push({
      id: sceneId,
      name: sceneName,
      path: normalizedPath,
    });
    if (sceneId) {
      indexedSceneIds.push(sceneId);
    } else {
      warnings.push(`${SCENES_INDEX_PATH}: scenes[${index}] has missing/empty id`);
    }
    if (!sceneName) {
      warnings.push(`${SCENES_INDEX_PATH}: scenes[${index}] has missing/empty name`);
    }
  }
}

const currentMarkdownIndex = readJson(MARKDOWN_INDEX_PATH);
if (!currentMarkdownIndex.ok) {
  errors.push(
    `${MARKDOWN_INDEX_PATH}: failed to parse JSON (${currentMarkdownIndex.error.message})`
  );
} else if (!Array.isArray(currentMarkdownIndex.data?.files)) {
  errors.push(`${MARKDOWN_INDEX_PATH}: expected { \"files\": [...] }`);
} else {
  for (const [index, filePath] of currentMarkdownIndex.data.files.entries()) {
    if (typeof filePath !== "string") {
      errors.push(`${MARKDOWN_INDEX_PATH}: files[${index}] must be a string`);
      continue;
    }
    indexedMarkdownPaths.push(normalizePath(filePath));
  }
}

const duplicateSceneIds = [];
const seenSceneIds = new Set();
for (const sceneId of indexedSceneIds) {
  if (seenSceneIds.has(sceneId)) {
    duplicateSceneIds.push(sceneId);
  } else {
    seenSceneIds.add(sceneId);
  }
}
if (duplicateSceneIds.length) {
  warnings.push(
    `${SCENES_INDEX_PATH}: duplicate scene ids (${duplicateSceneIds.join(", ")})`
  );
}

const generatedScenesIndex = buildGeneratedScenesIndex(
  sceneConfigs,
  sceneDataByPath,
  currentSceneEntries
);

const generatedMarkdownIndex = {
  files: [...allMarkdownFiles],
};

const sceneIndexDrift = summarizeIndexDrift(indexedScenePaths, sceneConfigs);
const markdownIndexDrift = summarizeIndexDrift(indexedMarkdownPaths, allMarkdownFiles);

if (
  sceneIndexDrift.stale.length ||
  sceneIndexDrift.missing.length ||
  sceneIndexDrift.caseMismatch.length ||
  sceneIndexDrift.duplicateExact.length ||
  sceneIndexDrift.duplicateCaseOnly.length
) {
  warnings.push(`${SCENES_INDEX_PATH}: index drift detected`);
}

if (
  markdownIndexDrift.stale.length ||
  markdownIndexDrift.missing.length ||
  markdownIndexDrift.caseMismatch.length ||
  markdownIndexDrift.duplicateExact.length ||
  markdownIndexDrift.duplicateCaseOnly.length
) {
  warnings.push(`${MARKDOWN_INDEX_PATH}: index drift detected`);
}

const sceneConfigSet = new Set(sceneConfigs);
const sceneConfigLower = createLowerMap(sceneConfigs);
const markdownFileSet = new Set(allMarkdownFiles);
const markdownFileLower = createLowerMap(allMarkdownFiles);
const markdownDirSet = new Set(allMarkdownDirectories);
const markdownDirLower = createLowerMap(allMarkdownDirectories);

for (const scenePath of sceneConfigs) {
  const data = sceneDataByPath.get(scenePath);
  const scene = data.scene || {};
  const objects = Array.isArray(data.objects) ? data.objects : [];

  if (typeof scene.markdownPath === "string") {
    validateFileReference(
      scenePath,
      "scene.markdownPath",
      scene.markdownPath,
      markdownFileSet,
      markdownFileLower
    );
  }
  if (typeof scene.autoMarkdownPath === "string") {
    validateFileReference(
      scenePath,
      "scene.autoMarkdownPath",
      scene.autoMarkdownPath,
      markdownFileSet,
      markdownFileLower
    );
  }
  if (typeof scene.autoMarkdownDirectory === "string") {
    validateDirectoryReference(
      scenePath,
      "scene.autoMarkdownDirectory",
      scene.autoMarkdownDirectory,
      markdownDirSet,
      markdownDirLower
    );
  }
  const markdownPolicy = scene.markdown;
  if (markdownPolicy && typeof markdownPolicy === "object") {
    const source = markdownPolicy.source;
    if (source && typeof source === "object" && typeof source.path === "string") {
      const sourcePath = source.path;
      const sourceType = source.type;
      const inferType = sourcePath.toLowerCase().endsWith(".md") ? "file" : "directory";
      const resolvedType = sourceType === "file" || sourceType === "directory" ? sourceType : inferType;
      if (resolvedType === "file") {
        validateFileReference(
          scenePath,
          "scene.markdown.source.path",
          sourcePath,
          markdownFileSet,
          markdownFileLower
        );
      } else {
        validateDirectoryReference(
          scenePath,
          "scene.markdown.source.path",
          sourcePath,
          markdownDirSet,
          markdownDirLower
        );
      }
    }
  }

  objects.forEach((obj, index) => {
    const objectLabel = typeof obj?.id === "string" && obj.id ? obj.id : `objects[${index}]`;
    if (typeof obj?.markdownPath === "string") {
      validateFileReference(
        scenePath,
        `${objectLabel}.markdownPath`,
        obj.markdownPath,
        markdownFileSet,
        markdownFileLower
      );
    }
    if (obj?.subScenes === undefined) {
      return;
    }
    if (!Array.isArray(obj.subScenes)) {
      errors.push(`${scenePath} -> ${objectLabel}.subScenes: expected array`);
      return;
    }
    obj.subScenes.forEach((subScenePath, subIndex) => {
      if (typeof subScenePath !== "string") {
        errors.push(
          `${scenePath} -> ${objectLabel}.subScenes[${subIndex}]: expected string path`
        );
        return;
      }
      validateFileReference(
        scenePath,
        `${objectLabel}.subScenes[${subIndex}]`,
        subScenePath,
        sceneConfigSet,
        sceneConfigLower
      );
    });
  });
}

const wroteFiles = [];
if (mode === "write") {
  if (writeJsonIfChanged(SCENES_INDEX_PATH, generatedScenesIndex)) {
    wroteFiles.push(SCENES_INDEX_PATH);
  }
  if (writeJsonIfChanged(MARKDOWN_INDEX_PATH, generatedMarkdownIndex)) {
    wroteFiles.push(MARKDOWN_INDEX_PATH);
  }
}

console.log(`validate-content mode: ${mode}${strict ? " (strict)" : ""}`);
console.log(`- Scene config files discovered: ${sceneConfigs.length}`);
console.log(`- Markdown files discovered: ${allMarkdownFiles.length}`);
if (ancillarySceneJson.length) {
  console.log(`- Non-scene JSON ignored: ${ancillarySceneJson.length}`);
}
if (wroteFiles.length) {
  console.log(`- Wrote index files: ${wroteFiles.join(", ")}`);
}

console.log(`\n${SCENES_INDEX_PATH}`);
printItems("missing", sceneIndexDrift.missing);
printItems("stale", sceneIndexDrift.stale);
printCaseItems("case mismatch", sceneIndexDrift.caseMismatch);
printItems("duplicate entries", sceneIndexDrift.duplicateExact);
printCaseDuplicateItems("case-only duplicate entries", sceneIndexDrift.duplicateCaseOnly);

console.log(`\n${MARKDOWN_INDEX_PATH}`);
printItems("missing", markdownIndexDrift.missing);
printItems("stale", markdownIndexDrift.stale);
printCaseItems("case mismatch", markdownIndexDrift.caseMismatch);
printItems("duplicate entries", markdownIndexDrift.duplicateExact);
printCaseDuplicateItems("case-only duplicate entries", markdownIndexDrift.duplicateCaseOnly);

if (notes.length) {
  console.log("\nnotes:");
  for (const note of notes) {
    console.log(`- ${note}`);
  }
}

if (warnings.length) {
  console.log("\nwarnings:");
  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}

if (errors.length) {
  console.log("\nerrors:");
  for (const error of errors) {
    console.log(`- ${error}`);
  }
}

const failed = errors.length > 0 || (strict && warnings.length > 0);
console.log(
  `\nsummary: ${errors.length} error(s), ${warnings.length} warning(s), ${notes.length} note(s)`
);
if (failed) {
  process.exit(1);
}
