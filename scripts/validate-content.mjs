#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCENES_DIR = "content/scenes";
const MARKDOWN_DIR = "content/markdown";
const SCENES_INDEX_PATH = "content/scenes/scenes_index.json";
const MARKDOWN_INDEX_PATH = "content/markdown/markdown_index.json";
const ROOT_SCENE_PATH = "content/scenes/architrino_assembly_architecture.json";
const NO_INCOMING_LINK_REPORT_LIMIT = 25;
const SCENE_SCHEMA_PATH = "scripts/schema/scene.schema.json";
const STABLE_ID_LABEL_LOCK_PATH = "scripts/config/stable-scene-id-label-lock.json";
const LEGACY_AUTOGEN_ALLOWLIST_PATH =
  "scripts/config/legacy-scene-autogen-allowlist.json";
const ALLOWED_SCENE_KINDS = new Set(["branching", "diagram", "markdown_split", "element"]);
// Explicit-only migration policy:
// Scene authoring should converge on explicit objects/subScenes/markdownPath links.
// These legacy scene-level automation fields remain temporarily supported for migration.
const LEGACY_AUTOGEN_SCENE_FIELDS = [
  "markdown",
  "autoMarkdownPath",
  "autoMarkdownDirectory",
  "autoMarkdownSection",
  "autoMarkdownHeadingLevel",
  "autoMarkdownIncludeExistingInLayout",
  "autoMarkdownNodeRadius",
  "autoMarkdownRingRadius",
  "autoMarkdownMaxRingCount",
  "autoMarkdownGridSpacing",
  "autoMarkdownColumns",
  "autoMarkdownColor",
  "autoMarkdownSubdirectories",
  "autoMarkdownExcludePaths",
  "autoMarkdownIndexPaths",
  "autoMarkdownPlainPaths",
  "autoMarkdownPlainSectionPaths",
  "autoMarkdownPalette",
  "autoMarkdownPaletteName",
  "autoMarkdownDefaultIndex",
  "autoMarkdownSectionDepth",
  "autoMarkdownOverrides",
];

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

function resolveKnownPath(refPath, exactSet, lowerMap) {
  const normalized = normalizePath(refPath);
  if (!normalized) {
    return null;
  }
  if (exactSet.has(normalized)) {
    return normalized;
  }
  return lowerMap.get(normalized.toLowerCase()) ?? null;
}

function schemaLocation(pathParts) {
  return pathParts.length ? pathParts.join("") : "$";
}

function schemaTypeMatches(value, expectedType) {
  if (expectedType === "array") {
    return Array.isArray(value);
  }
  if (expectedType === "null") {
    return value === null;
  }
  if (expectedType === "integer") {
    return Number.isInteger(value);
  }
  if (expectedType === "number") {
    return typeof value === "number" && Number.isFinite(value);
  }
  if (expectedType === "object") {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }
  if (expectedType === "string") {
    return typeof value === "string";
  }
  if (expectedType === "boolean") {
    return typeof value === "boolean";
  }
  return true;
}

function validateSchemaValue(scenePath, value, schema, pathParts = []) {
  if (!schema || typeof schema !== "object") {
    return;
  }
  const location = schemaLocation(pathParts);

  const rawTypes = Array.isArray(schema.type) ? schema.type : schema.type ? [schema.type] : [];
  if (rawTypes.length) {
    const typeMatches = rawTypes.some((type) => schemaTypeMatches(value, type));
    if (!typeMatches) {
      errors.push(
        `${scenePath}: schema ${location}: expected ${rawTypes.join(" | ")}, got ${
          Array.isArray(value) ? "array" : value === null ? "null" : typeof value
        }`
      );
      return;
    }
  }

  if (Array.isArray(schema.enum) && schema.enum.length && !schema.enum.includes(value)) {
    errors.push(`${scenePath}: schema ${location}: value is not in enum`);
    return;
  }

  if (typeof value === "string") {
    if (typeof schema.minLength === "number" && value.length < schema.minLength) {
      errors.push(
        `${scenePath}: schema ${location}: string length ${value.length} < minLength ${schema.minLength}`
      );
    }
    if (typeof schema.maxLength === "number" && value.length > schema.maxLength) {
      errors.push(
        `${scenePath}: schema ${location}: string length ${value.length} > maxLength ${schema.maxLength}`
      );
    }
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    if (typeof schema.minimum === "number" && value < schema.minimum) {
      errors.push(`${scenePath}: schema ${location}: ${value} < minimum ${schema.minimum}`);
    }
    if (typeof schema.maximum === "number" && value > schema.maximum) {
      errors.push(`${scenePath}: schema ${location}: ${value} > maximum ${schema.maximum}`);
    }
  }

  if (Array.isArray(value)) {
    if (typeof schema.minItems === "number" && value.length < schema.minItems) {
      errors.push(
        `${scenePath}: schema ${location}: array length ${value.length} < minItems ${schema.minItems}`
      );
    }
    if (typeof schema.maxItems === "number" && value.length > schema.maxItems) {
      errors.push(
        `${scenePath}: schema ${location}: array length ${value.length} > maxItems ${schema.maxItems}`
      );
    }
    if (schema.items && typeof schema.items === "object") {
      value.forEach((item, index) => {
        validateSchemaValue(scenePath, item, schema.items, [...pathParts, `[${index}]`]);
      });
    }
    return;
  }

  if (value && typeof value === "object") {
    const props = schema.properties && typeof schema.properties === "object" ? schema.properties : {};
    const required = Array.isArray(schema.required) ? schema.required : [];

    for (const key of required) {
      if (!(key in value)) {
        errors.push(`${scenePath}: schema ${location}: missing required property "${key}"`);
      }
    }

    for (const [key, propSchema] of Object.entries(props)) {
      if (!(key in value)) {
        continue;
      }
      validateSchemaValue(scenePath, value[key], propSchema, [...pathParts, `.${key}`]);
    }

    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!(key in props)) {
          errors.push(`${scenePath}: schema ${location}: unexpected property "${key}"`);
        }
      }
    } else if (schema.additionalProperties && typeof schema.additionalProperties === "object") {
      for (const key of Object.keys(value)) {
        if (key in props) {
          continue;
        }
        validateSchemaValue(
          scenePath,
          value[key],
          schema.additionalProperties,
          [...pathParts, `.${key}`]
        );
      }
    }
  }
}

function normalizeMarkdownKey(text) {
  return String(text)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeMarkdownPath(pathValue) {
  return normalizePath(pathValue).toLowerCase();
}

function stripWalkthroughStepPrefix(title) {
  return String(title || "")
    .trim()
    .replace(/^Walkthrough\s+Step\s+\d+\s*[\u2014\-:]\s*/i, "")
    .trim();
}

function slugifyAutogeneratedId(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function parseMarkdownHeading(line) {
  const match = line.match(/^(#{2,3})\s+(.*)$/);
  if (!match) {
    const numbered = line.match(/^\*\*(\d+)\.\s+(.+?)\*\*/);
    if (!numbered) {
      return null;
    }
    return { level: 3, title: numbered[2].trim() };
  }
  const level = match[1].length;
  let title = match[2].trim();
  const boldMatch = title.match(/^\*\*(.+?)\*\*/);
  if (boldMatch) {
    title = boldMatch[1].trim();
  }
  return { level, title };
}

function extractMarkdownSection(markdown, sectionKey) {
  const target = normalizeMarkdownKey(sectionKey);
  if (!target) {
    return null;
  }
  const lines = markdown.split(/\r?\n/);
  let sectionTitle = null;
  let start = -1;
  let end = lines.length;
  let startLevel = null;
  for (let i = 0; i < lines.length; i += 1) {
    const heading = parseMarkdownHeading(lines[i]);
    if (!heading) {
      continue;
    }
    const headingKey = normalizeMarkdownKey(heading.title);
    if (start === -1) {
      if (headingKey === target) {
        sectionTitle = heading.title;
        start = i + 1;
        startLevel = heading.level;
      }
      continue;
    }
    if (heading.level <= (startLevel ?? heading.level)) {
      end = i;
      break;
    }
  }
  if (start === -1) {
    return null;
  }
  return {
    title: sectionTitle,
    body: lines.slice(start, end).join("\n").trim(),
  };
}

function deriveMarkdownConfig(markdownPolicy) {
  if (!markdownPolicy || typeof markdownPolicy !== "object") {
    return null;
  }
  const derived = {};
  const source = markdownPolicy.source ?? {};
  const sourcePath = typeof source.path === "string" ? source.path : null;
  const sourceType =
    source.type ??
    (sourcePath && sourcePath.toLowerCase().endsWith(".md") ? "file" : "directory");
  if (sourceType === "file" && sourcePath) {
    derived.autoMarkdownPath = sourcePath;
  } else if (sourceType === "directory" && sourcePath) {
    derived.autoMarkdownDirectory = sourcePath;
    derived.autoMarkdownSubdirectories = source.subdirectories === true;
  }

  const render = markdownPolicy.render ?? {};
  if (typeof render.headingLevel === "number") {
    derived.autoMarkdownHeadingLevel = render.headingLevel;
  }
  if (typeof render.sectionDepth === "number") {
    derived.autoMarkdownSectionDepth = render.sectionDepth;
  }

  if (Array.isArray(markdownPolicy.exclude)) {
    derived.autoMarkdownExcludePaths = markdownPolicy.exclude;
  }

  return derived;
}

function collectLegacyAutogenSceneFields(scene) {
  if (!scene || typeof scene !== "object") {
    return [];
  }
  const present = [];
  for (const field of LEGACY_AUTOGEN_SCENE_FIELDS) {
    if (!(field in scene)) {
      continue;
    }
    if (field === "markdown") {
      if (scene.markdown && typeof scene.markdown === "object") {
        present.push(field);
      }
      continue;
    }
    if (Array.isArray(scene[field])) {
      if (scene[field].length > 0) {
        present.push(field);
      }
      continue;
    }
    if (scene[field] !== null && scene[field] !== undefined && scene[field] !== "") {
      present.push(field);
    }
  }
  return present;
}

function readLegacyAutogenAllowlist() {
  const parsed = readJson(LEGACY_AUTOGEN_ALLOWLIST_PATH);
  if (!parsed.ok) {
    errors.push(
      `${LEGACY_AUTOGEN_ALLOWLIST_PATH}: failed to parse JSON (${parsed.error.message})`
    );
    return { scenes: new Set(), removeBy: null };
  }
  const entries = parsed.data?.scenes;
  if (!Array.isArray(entries)) {
    errors.push(`${LEGACY_AUTOGEN_ALLOWLIST_PATH}: expected { "scenes": [...] }`);
    return { scenes: new Set(), removeBy: null };
  }
  const scenes = new Set();
  entries.forEach((entry, index) => {
    if (typeof entry !== "string") {
      errors.push(
        `${LEGACY_AUTOGEN_ALLOWLIST_PATH}: scenes[${index}] must be a string`
      );
      return;
    }
    const normalized = normalizePath(entry);
    if (!normalized) {
      errors.push(
        `${LEGACY_AUTOGEN_ALLOWLIST_PATH}: scenes[${index}] must not be empty`
      );
      return;
    }
    scenes.add(normalized);
  });
  const removeBy =
    typeof parsed.data?.removeBy === "string" && parsed.data.removeBy.trim()
      ? parsed.data.removeBy.trim()
      : null;
  return { scenes, removeBy };
}

function readStableIdLabelLock() {
  const parsed = readJson(STABLE_ID_LABEL_LOCK_PATH);
  if (!parsed.ok) {
    errors.push(`${STABLE_ID_LABEL_LOCK_PATH}: failed to parse JSON (${parsed.error.message})`);
    return { entries: new Map() };
  }
  const entriesRaw = parsed.data?.entries;
  if (!entriesRaw || typeof entriesRaw !== "object" || Array.isArray(entriesRaw)) {
    errors.push(`${STABLE_ID_LABEL_LOCK_PATH}: expected { "entries": { ... } }`);
    return { entries: new Map() };
  }

  const entries = new Map();
  for (const [scenePathRaw, lock] of Object.entries(entriesRaw)) {
    const scenePath = normalizePath(scenePathRaw);
    if (!scenePath) {
      errors.push(`${STABLE_ID_LABEL_LOCK_PATH}: scene path key must not be empty`);
      continue;
    }
    if (!lock || typeof lock !== "object" || Array.isArray(lock)) {
      errors.push(`${STABLE_ID_LABEL_LOCK_PATH}: ${scenePath}: lock entry must be an object`);
      continue;
    }
    const sceneId = asText(lock.sceneId);
    const sceneName = asText(lock.sceneName);
    const objectsRaw = lock.objects;
    if (!objectsRaw || typeof objectsRaw !== "object" || Array.isArray(objectsRaw)) {
      errors.push(`${STABLE_ID_LABEL_LOCK_PATH}: ${scenePath}: objects must be an object`);
      continue;
    }
    const objectLabels = new Map();
    for (const [objectIdRaw, labelRaw] of Object.entries(objectsRaw)) {
      const objectId = asText(objectIdRaw);
      if (!objectId) {
        errors.push(`${STABLE_ID_LABEL_LOCK_PATH}: ${scenePath}: object id key must not be empty`);
        continue;
      }
      const label = asText(labelRaw);
      if (!label) {
        errors.push(
          `${STABLE_ID_LABEL_LOCK_PATH}: ${scenePath}: object "${objectId}" label must be non-empty`
        );
        continue;
      }
      objectLabels.set(objectId, label);
    }
    entries.set(scenePath, { sceneId, sceneName, objectLabels });
  }
  return { entries };
}

function listMarkdownFilesInDirectory(directory, markdownFiles) {
  const normalizedDir = normalizePath(directory);
  if (!normalizedDir) {
    return [];
  }
  const prefix = `${normalizedDir}/`;
  return markdownFiles.filter((filePath) => {
    if (!filePath.startsWith(prefix)) {
      return false;
    }
    const remainder = filePath.slice(prefix.length);
    return remainder.length > 0 && !remainder.includes("/");
  });
}

function listMarkdownDirectoriesInDirectory(directory, markdownDirectories) {
  const normalizedDir = normalizePath(directory);
  if (!normalizedDir) {
    return [];
  }
  const prefix = `${normalizedDir}/`;
  const subdirs = new Set();
  for (const dirPath of markdownDirectories) {
    if (!dirPath.startsWith(prefix)) {
      continue;
    }
    const remainder = dirPath.slice(prefix.length);
    if (!remainder || remainder.includes("/")) {
      continue;
    }
    subdirs.add(dirPath);
  }
  return [...subdirs];
}

function validateSceneIntegrity(scenePath, data, markdownContext) {
  const scene = data.scene ?? {};
  const objects = Array.isArray(data.objects) ? data.objects : [];
  const links = Array.isArray(data.links) ? data.links : [];

  const nodeIdToIndex = new Map();
  for (const [index, obj] of objects.entries()) {
    const objectId = asText(obj?.id);
    if (!objectId) {
      continue;
    }
    if (nodeIdToIndex.has(objectId)) {
      errors.push(
        `${scenePath}: duplicate node id "${objectId}" at objects[${nodeIdToIndex.get(
          objectId
        )}] and objects[${index}]`
      );
    } else {
      nodeIdToIndex.set(objectId, index);
    }
  }

  const explicitLinkIds = new Map();
  const autogeneratedLinkIds = new Map();
  for (const [index, link] of links.entries()) {
    if (!link || typeof link !== "object") {
      continue;
    }
    const fromId = asText(link.from);
    const toId = asText(link.to);
    if (fromId && !nodeIdToIndex.has(fromId)) {
      errors.push(
        `${scenePath}: orphan link links[${index}] references missing source node "${fromId}"`
      );
    }
    if (toId && !nodeIdToIndex.has(toId)) {
      errors.push(`${scenePath}: orphan link links[${index}] references missing target node "${toId}"`);
    }

    const explicitId = asText(link.id);
    if (explicitId) {
      if (explicitLinkIds.has(explicitId)) {
        errors.push(
          `${scenePath}: duplicate link id "${explicitId}" at links[${explicitLinkIds.get(
            explicitId
          )}] and links[${index}]`
        );
      } else {
        explicitLinkIds.set(explicitId, index);
      }
      continue;
    }

    if (!fromId || !toId) {
      continue;
    }
    const autoId = `${fromId}::${toId}::${asText(link.kind) || "default"}`;
    if (autogeneratedLinkIds.has(autoId)) {
      errors.push(
        `${scenePath}: duplicate autogenerated link id "${autoId}" at links[${autogeneratedLinkIds.get(
          autoId
        )}] and links[${index}]`
      );
    } else {
      autogeneratedLinkIds.set(autoId, index);
    }
  }

  const markdownDerived = deriveMarkdownConfig(scene.markdown);
  const autoScene = markdownDerived ? { ...scene, ...markdownDerived } : scene;
  const autoLayoutMode = String(autoScene.layoutMode ?? "").toLowerCase();
  if (
    autoLayoutMode !== "rings" ||
    (!autoScene.autoMarkdownPath && !autoScene.autoMarkdownDirectory)
  ) {
    return;
  }

  let entries = [];
  let useDirectories = false;
  let usedHeadingLevel =
    typeof autoScene.autoMarkdownHeadingLevel === "number" ? autoScene.autoMarkdownHeadingLevel : 3;
  const existingIds = new Set(nodeIdToIndex.keys());

  if (autoScene.autoMarkdownPath) {
    const markdownPath = normalizePath(autoScene.autoMarkdownPath);
    const markdownSource = markdownContext.markdownTextByPath.get(markdownPath);
    if (typeof markdownSource !== "string") {
      return;
    }
    const preferredLevels = [usedHeadingLevel];
    if (usedHeadingLevel === 2) {
      preferredLevels.push(3);
    } else if (usedHeadingLevel !== 2) {
      preferredLevels.push(2);
    }
    let content = markdownSource;
    if (autoScene.autoMarkdownSection) {
      const section = extractMarkdownSection(markdownSource, autoScene.autoMarkdownSection);
      content = section?.body ?? "";
    }
    const lines = content.split(/\r?\n/);
    for (const level of preferredLevels) {
      const levelEntries = [];
      lines.forEach((line) => {
        const heading = parseMarkdownHeading(line);
        if (heading && heading.level === level) {
          levelEntries.push(heading.title);
        }
      });
      if (levelEntries.length) {
        entries = levelEntries;
        usedHeadingLevel = level;
        break;
      }
    }
  } else {
    useDirectories = autoScene.autoMarkdownSubdirectories === true;
    const sourceDirectory = normalizePath(autoScene.autoMarkdownDirectory);
    entries = useDirectories
      ? listMarkdownDirectoriesInDirectory(sourceDirectory, markdownContext.markdownDirectories).sort()
      : listMarkdownFilesInDirectory(sourceDirectory, markdownContext.markdownFiles).sort();
  }

  if (Array.isArray(autoScene.autoMarkdownExcludePaths) && autoScene.autoMarkdownExcludePaths.length) {
    const excluded = new Set(autoScene.autoMarkdownExcludePaths.map((entry) => normalizeMarkdownPath(entry)));
    entries = entries.filter((entry) => !excluded.has(normalizeMarkdownPath(entry)));
  }

  const autogeneratedIds = new Map();
  for (const [index, rawEntry] of entries.entries()) {
    let idBasis = "";
    if (autoScene.autoMarkdownPath) {
      const stripped = stripWalkthroughStepPrefix(rawEntry);
      idBasis = stripped || rawEntry;
    } else {
      const entryName = String(rawEntry).split("/").pop() || "";
      idBasis = useDirectories ? entryName : entryName.replace(/\.md$/i, "");
    }
    const generatedId = slugifyAutogeneratedId(idBasis);
    if (!generatedId) {
      errors.push(`${scenePath}: autogenerated markdown node id is empty for entry "${rawEntry}"`);
      continue;
    }
    if (existingIds.has(generatedId)) {
      errors.push(
        `${scenePath}: duplicate autogenerated node id "${generatedId}" collides with existing object id`
      );
      continue;
    }
    if (autogeneratedIds.has(generatedId)) {
      const first = autogeneratedIds.get(generatedId);
      errors.push(
        `${scenePath}: duplicate autogenerated node id "${generatedId}" for entries "${first.entry}" and "${rawEntry}" (indices ${first.index} and ${index})`
      );
      continue;
    }
    autogeneratedIds.set(generatedId, { entry: rawEntry, index });
  }
}

const allSceneJson = walkFiles(SCENES_DIR, (name) => name.toLowerCase().endsWith(".json"));
const allMarkdownFiles = walkFiles(MARKDOWN_DIR, (name) => name.toLowerCase().endsWith(".md"));
const indexableMarkdownFiles = allMarkdownFiles.filter(
  (markdownPath) => !normalizePath(markdownPath).includes("/_meta/")
);
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

const sceneSchemaResult = readJson(SCENE_SCHEMA_PATH);
const sceneSchema = sceneSchemaResult.ok ? sceneSchemaResult.data : null;
if (!sceneSchemaResult.ok) {
  errors.push(
    `${SCENE_SCHEMA_PATH}: failed to parse JSON schema (${sceneSchemaResult.error.message})`
  );
}

const markdownTextByPath = new Map();
const markdownHeadingKeyCountByPath = new Map();
for (const markdownPath of indexableMarkdownFiles) {
  const absoluteMarkdownPath = path.join(rootDir, markdownPath);
  try {
    const markdownText = fs.readFileSync(absoluteMarkdownPath, "utf8");
    markdownTextByPath.set(markdownPath, markdownText);
    const headingCounts = new Map();
    markdownText.split(/\r?\n/).forEach((line) => {
      const heading = parseMarkdownHeading(line);
      if (!heading || (heading.level !== 2 && heading.level !== 3)) {
        return;
      }
      const key = normalizeMarkdownKey(heading.title);
      if (!key) {
        return;
      }
      headingCounts.set(key, (headingCounts.get(key) ?? 0) + 1);
    });
    markdownHeadingKeyCountByPath.set(markdownPath, headingCounts);
  } catch (error) {
    warnings.push(`${markdownPath}: failed to read markdown source (${error.message})`);
  }
}

const scenePathBySceneId = new Map();
for (const scenePath of sceneConfigs) {
  const sceneId = asText(sceneDataByPath.get(scenePath)?.scene?.id);
  if (!sceneId) {
    errors.push(`${scenePath}: scene.id is required and must be non-empty`);
    continue;
  }
  const priorPath = scenePathBySceneId.get(sceneId);
  if (priorPath && priorPath !== scenePath) {
    errors.push(`${scenePath}: duplicate scene.id "${sceneId}" already defined in ${priorPath}`);
  } else if (!priorPath) {
    scenePathBySceneId.set(sceneId, scenePath);
  }
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
  files: [...indexableMarkdownFiles],
};

const sceneIndexDrift = summarizeIndexDrift(indexedScenePaths, sceneConfigs);
const markdownIndexDrift = summarizeIndexDrift(
  indexedMarkdownPaths,
  indexableMarkdownFiles
);

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
const markdownContext = {
  markdownFiles: allMarkdownFiles,
  markdownDirectories: allMarkdownDirectories,
  markdownTextByPath,
};
const incomingSceneRefCount = new Map(sceneConfigs.map((scenePath) => [scenePath, 0]));
const stableIdLabelLock = readStableIdLabelLock();
const legacyAutogenAllowlist = readLegacyAutogenAllowlist();
const legacyAutogenScenes = [];

if (legacyAutogenAllowlist.scenes.size > 0) {
  errors.push(
    `${LEGACY_AUTOGEN_ALLOWLIST_PATH}: migration allowlist must be empty now; remove entries instead of allowlisting legacy auto-generation fields`
  );
}

if (stableIdLabelLock.entries.size) {
  notes.push(`Stable ID/label lock coverage: ${stableIdLabelLock.entries.size} scene file(s).`);
}
stableIdLabelLock.entries.forEach((lock, scenePath) => {
  const sceneData = sceneDataByPath.get(scenePath);
  if (!sceneData) {
    warnings.push(`${STABLE_ID_LABEL_LOCK_PATH}: locked scene not found (${scenePath})`);
    return;
  }
  const scene = sceneData.scene ?? {};
  const actualSceneId = asText(scene.id);
  const actualSceneName = asText(scene.name);
  if (lock.sceneId && actualSceneId !== lock.sceneId) {
    errors.push(
      `${scenePath}: scene.id changed from locked "${lock.sceneId}" to "${actualSceneId}"`
    );
  }
  if (lock.sceneName && actualSceneName !== lock.sceneName) {
    errors.push(
      `${scenePath}: scene.name changed from locked "${lock.sceneName}" to "${actualSceneName}"`
    );
  }

  const objects = Array.isArray(sceneData.objects) ? sceneData.objects : [];
  const objectLabelById = new Map();
  objects.forEach((obj) => {
    const objectId = asText(obj?.id);
    if (!objectId) {
      return;
    }
    const objectLabel = asText(obj?.label) || objectId;
    objectLabelById.set(objectId, objectLabel);
  });

  lock.objectLabels.forEach((expectedLabel, objectId) => {
    if (!objectLabelById.has(objectId)) {
      errors.push(`${scenePath}: locked object id missing "${objectId}"`);
      return;
    }
    const actualLabel = objectLabelById.get(objectId);
    if (actualLabel !== expectedLabel) {
      errors.push(
        `${scenePath}: object "${objectId}" label changed from locked "${expectedLabel}" to "${actualLabel}"`
      );
    }
  });
});

for (const scenePath of sceneConfigs) {
  const data = sceneDataByPath.get(scenePath);
  const scene = data.scene || {};
  const objects = Array.isArray(data.objects) ? data.objects : [];
  const rawKind = asText(scene.kind);
  if (!rawKind) {
    errors.push(
      `${scenePath}: scene.kind is required and must be one of ${[...ALLOWED_SCENE_KINDS].join(
        ", "
      )}`
    );
  } else if (!ALLOWED_SCENE_KINDS.has(rawKind)) {
    errors.push(
      `${scenePath}: scene.kind "${rawKind}" is not allowed (allowed: ${[
        ...ALLOWED_SCENE_KINDS,
      ].join(", ")})`
    );
  }
  const legacyFields = collectLegacyAutogenSceneFields(scene);
  if (legacyFields.length) {
    legacyAutogenScenes.push({ scenePath, fields: legacyFields });
  }

  if (sceneSchema) {
    validateSchemaValue(scenePath, data, sceneSchema, []);
  }
  validateSceneIntegrity(scenePath, data, markdownContext);

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
    if (typeof obj?.markdownPath === "string" && typeof obj?.markdownSection === "string") {
      const normalizedPath = normalizePath(obj.markdownPath);
      const sectionKey = normalizeMarkdownKey(obj.markdownSection);
      const headingCounts = markdownHeadingKeyCountByPath.get(normalizedPath);
      const matches = headingCounts?.get(sectionKey) ?? 0;
      if (matches > 1) {
        warnings.push(
          `${scenePath} -> ${objectLabel}.markdownSection: ambiguous section key "${obj.markdownSection}" in ${normalizedPath} (${matches} matching headings)`
        );
      }
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
      const resolvedTarget = resolveKnownPath(subScenePath, sceneConfigSet, sceneConfigLower);
      if (resolvedTarget) {
        incomingSceneRefCount.set(
          resolvedTarget,
          (incomingSceneRefCount.get(resolvedTarget) ?? 0) + 1
        );
      }
    });
  });
}

if (legacyAutogenScenes.length) {
  const allowlistedCount = legacyAutogenScenes.filter((entry) =>
    legacyAutogenAllowlist.scenes.has(entry.scenePath)
  ).length;
  notes.push(
    `Explicit-only migration: ${legacyAutogenScenes.length} scene file(s) still use legacy auto-generation fields (${allowlistedCount} allowlisted).`
  );
  if (legacyAutogenAllowlist.removeBy) {
    notes.push(
      `${LEGACY_AUTOGEN_ALLOWLIST_PATH}: remove allowlist by ${legacyAutogenAllowlist.removeBy}`
    );
  }
  legacyAutogenScenes
    .sort((a, b) => a.scenePath.localeCompare(b.scenePath))
    .forEach((entry) => {
      if (!legacyAutogenAllowlist.scenes.has(entry.scenePath)) {
        errors.push(
          `${entry.scenePath}: uses legacy auto-generation fields but is not allowlisted in ${LEGACY_AUTOGEN_ALLOWLIST_PATH}`
        );
      }
      notes.push(`${entry.scenePath}: ${entry.fields.join(", ")}`);
    });
}

legacyAutogenAllowlist.scenes.forEach((scenePath) => {
  if (!sceneConfigSet.has(scenePath)) {
    notes.push(
      `${LEGACY_AUTOGEN_ALLOWLIST_PATH}: allowlisted scene not found (${scenePath})`
    );
  }
});

const scenesWithNoIncomingLinks = sceneConfigs
  .filter((scenePath) => scenePath !== ROOT_SCENE_PATH)
  .filter((scenePath) => (incomingSceneRefCount.get(scenePath) ?? 0) === 0)
  .sort((a, b) => a.localeCompare(b));
if (scenesWithNoIncomingLinks.length) {
  notes.push(
    `No incoming scene links (${scenesWithNoIncomingLinks.length}) excluding root ${ROOT_SCENE_PATH}`
  );
  scenesWithNoIncomingLinks.slice(0, NO_INCOMING_LINK_REPORT_LIMIT).forEach((scenePath) => {
    notes.push(`no-incoming-link: ${scenePath}`);
  });
  if (scenesWithNoIncomingLinks.length > NO_INCOMING_LINK_REPORT_LIMIT) {
    notes.push(
      `no-incoming-link: ... ${
        scenesWithNoIncomingLinks.length - NO_INCOMING_LINK_REPORT_LIMIT
      } more`
    );
  }
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
