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
const REPO_MARKDOWN_AUDIT_IGNORED_DIRS = new Set([".git", "node_modules", "__pycache__"]);
const ALLOWED_SCENE_TYPES = new Set([
  "Scene-Index",
  "Scene-Markdown-View",
  "Scene-Markdown-Split",
  "Scene-Markdown-Tree",
  "Scene-Diagram",
  "Scene-Animation",
]);

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

function resolveAuthoredMarkdownPath(entry) {
  if (entry?.source?.type === "markdown" && typeof entry?.source?.path === "string") {
    return entry.source.path;
  }
  return null;
}

function resolveAuthoredMarkdownSection(entry) {
  if (typeof entry?.view?.section === "string") {
    return entry.view.section;
  }
  return null;
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

function walkFiles(relativeDir, predicate, options = {}) {
  const ignoreDirNames = options.ignoreDirNames ?? new Set();
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
        if (ignoreDirNames.has(entry.name)) {
          continue;
        }
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

function stripMarkdownLinkTarget(linkTarget) {
  const trimmed = String(linkTarget || "").trim();
  const match = trimmed.match(/^(\S+)(?:\s+["'][^"']*["'])?$/);
  return match ? match[1] : trimmed;
}

function isExternalMarkdownLinkTarget(linkTarget) {
  return /^(https?:|mailto:|tel:|data:|#)/i.test(linkTarget);
}

function extractMarkdownLinks(markdownText) {
  const links = [];
  const lines = String(markdownText || "").split(/\r?\n/);
  let fencedCodeBlock = false;
  for (const [index, line] of lines.entries()) {
    if (/^```/.test(line)) {
      fencedCodeBlock = !fencedCodeBlock;
      continue;
    }
    if (fencedCodeBlock) {
      continue;
    }
    const linkRegex = /!?\[[^\]]*\]\(([^)]+)\)/g;
    let match;
    while ((match = linkRegex.exec(line))) {
      links.push({ line: index + 1, target: stripMarkdownLinkTarget(match[1]) });
    }
  }
  return links;
}

function splitMarkdownLinkTarget(linkTarget) {
  const trimmed = String(linkTarget || "").trim();
  const hashIndex = trimmed.indexOf("#");
  const beforeHash = hashIndex >= 0 ? trimmed.slice(0, hashIndex) : trimmed;
  const queryIndex = beforeHash.indexOf("?");
  return queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash;
}

function auditMarkdownRelativeLinks(markdownPaths, markdownTextByPath) {
  for (const markdownPath of markdownPaths) {
    const markdownText = markdownTextByPath.get(markdownPath);
    if (typeof markdownText !== "string") {
      continue;
    }
    const sourceAbsolutePath = path.join(rootDir, markdownPath);
    for (const link of extractMarkdownLinks(markdownText)) {
      const target = link.target;
      if (!target || isExternalMarkdownLinkTarget(target)) {
        continue;
      }
      if (target.startsWith("/")) {
        errors.push(
          `${markdownPath}:${link.line}: markdown link target must be relative, not "${target}"`
        );
        continue;
      }
      const pathTarget = splitMarkdownLinkTarget(target);
      if (!pathTarget) {
        continue;
      }
      const resolvedAbsolutePath = path.resolve(path.dirname(sourceAbsolutePath), pathTarget);
      const resolvedRelativePath = normalizePath(path.relative(rootDir, resolvedAbsolutePath));
      if (resolvedRelativePath.startsWith("..")) {
        errors.push(
          `${markdownPath}:${link.line}: markdown link target escapes repo "${target}"`
        );
        continue;
      }
      if (!fs.existsSync(resolvedAbsolutePath)) {
        errors.push(
          `${markdownPath}:${link.line}: markdown link target "${target}" resolves to missing path "${resolvedRelativePath}"`
        );
        continue;
      }
      if (fs.statSync(resolvedAbsolutePath).isDirectory()) {
        warnings.push(
          `${markdownPath}:${link.line}: markdown link target "${target}" resolves to a directory "${resolvedRelativePath}"`
        );
      }
    }
  }
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

function collectStableObjectLabels(sceneData) {
  const labels = new Map();
  const objects = Array.isArray(sceneData?.objects) ? sceneData.objects : [];
  objects.forEach((obj) => {
    const objectId = asText(obj?.id);
    if (!objectId) {
      return;
    }
    const objectLabel = asText(obj?.labelTitle) || asText(obj?.label) || asText(obj?.title) || objectId;
    labels.set(objectId, objectLabel);
  });

  const splitOverrides = sceneData?.scene?.source?.split?.overrides;
  if (splitOverrides && typeof splitOverrides === "object" && !Array.isArray(splitOverrides)) {
    Object.values(splitOverrides).forEach((override) => {
      if (!override || typeof override !== "object" || Array.isArray(override)) {
        return;
      }
      const objectId = asText(override.id);
      if (!objectId || labels.has(objectId)) {
        return;
      }
      const objectLabel =
        asText(override.labelTitle) || asText(override.title) || asText(override.label) || objectId;
      labels.set(objectId, objectLabel);
    });
  }

  return labels;
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

}

function validateSceneTypeSpecificRules(scenePath, data) {
  const scene = data.scene ?? {};
  const sceneType = asText(scene.type);
  const source = scene.source ?? null;
  const split = source?.split ?? null;
  const tree = source?.tree ?? null;
  const view = scene.view ?? null;
  const hasSource = source && typeof source === "object" && !Array.isArray(source);
  const hasChildren = Array.isArray(scene.children) && scene.children.length > 0;
  const markdownSourceOk =
    source?.type === "markdown" &&
    typeof source?.path === "string" &&
    source.path.trim().length > 0;

  if (sceneType === "Scene-Index") {
    if (!hasChildren) {
      errors.push(`${scenePath}: Scene-Index requires scene.children`);
    }
    if (hasSource) {
      errors.push(`${scenePath}: Scene-Index must not declare scene.source`);
    }
    if (view && typeof view === "object" && !Array.isArray(view)) {
      errors.push(`${scenePath}: Scene-Index must not declare scene.view`);
    }
    return;
  }

  if (sceneType === "Scene-Markdown-View") {
    if (!markdownSourceOk) {
      errors.push(
        `${scenePath}: Scene-Markdown-View requires scene.source.type=markdown and scene.source.path`
      );
    }
    if (split && typeof split === "object") {
      errors.push(`${scenePath}: Scene-Markdown-View must not declare scene.source.split`);
    }
    if (tree && typeof tree === "object") {
      errors.push(`${scenePath}: Scene-Markdown-View must not declare scene.source.tree`);
    }
    return;
  }

  if (sceneType === "Scene-Markdown-Split") {
    if (!markdownSourceOk) {
      errors.push(
        `${scenePath}: Scene-Markdown-Split requires scene.source.type=markdown and scene.source.path`
      );
    }
    if (!split || typeof split !== "object" || Array.isArray(split)) {
      errors.push(`${scenePath}: Scene-Markdown-Split requires scene.source.split`);
    } else {
      if (Object.prototype.hasOwnProperty.call(split, "sectionDepth")) {
        errors.push(`${scenePath}: Scene-Markdown-Split uses legacy scene.source.split.sectionDepth`);
      }
      if (Object.prototype.hasOwnProperty.call(split, "mode")) {
        errors.push(`${scenePath}: Scene-Markdown-Split uses legacy scene.source.split.mode`);
      }
      if (Object.prototype.hasOwnProperty.call(split, "sectionPresentationType")) {
        errors.push(
          `${scenePath}: Scene-Markdown-Split uses legacy scene.source.split.sectionPresentationType`
        );
      }
    }
    if (tree && typeof tree === "object") {
      errors.push(`${scenePath}: Scene-Markdown-Split must not declare scene.source.tree`);
    }
    return;
  }

  if (sceneType === "Scene-Markdown-Tree") {
    if (!markdownSourceOk) {
      errors.push(
        `${scenePath}: Scene-Markdown-Tree requires scene.source.type=markdown and scene.source.path`
      );
    }
    if (!tree || typeof tree !== "object" || Array.isArray(tree)) {
      errors.push(`${scenePath}: Scene-Markdown-Tree requires scene.source.tree`);
      return;
    }
    if (Object.prototype.hasOwnProperty.call(tree, "headingLevel")) {
      errors.push(`${scenePath}: Scene-Markdown-Tree uses legacy scene.source.tree.headingLevel`);
    }
    if (split && typeof split === "object") {
      errors.push(`${scenePath}: Scene-Markdown-Tree must not declare scene.source.split`);
    }
    if (typeof tree.rootHeadingLevel !== "number") {
      errors.push(`${scenePath}: Scene-Markdown-Tree requires scene.source.tree.rootHeadingLevel`);
    }
    if (typeof tree.maxDepth !== "number") {
      errors.push(`${scenePath}: Scene-Markdown-Tree requires scene.source.tree.maxDepth`);
    }
  }
}

const allSceneJson = walkFiles(SCENES_DIR, (name) => name.toLowerCase().endsWith(".json"));
const allMarkdownFiles = walkFiles(MARKDOWN_DIR, (name) => name.toLowerCase().endsWith(".md"));
const indexableMarkdownFiles = allMarkdownFiles;
const repoMarkdownAuditFiles = walkFiles(".", (name) => name.toLowerCase().endsWith(".md"), {
  ignoreDirNames: REPO_MARKDOWN_AUDIT_IGNORED_DIRS,
});

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
for (const markdownPath of repoMarkdownAuditFiles) {
  const absoluteMarkdownPath = path.join(rootDir, markdownPath);
  try {
    const markdownText = fs.readFileSync(absoluteMarkdownPath, "utf8");
    markdownTextByPath.set(markdownPath, markdownText);
    if (!indexableMarkdownFiles.includes(markdownPath)) {
      continue;
    }
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

auditMarkdownRelativeLinks(repoMarkdownAuditFiles, markdownTextByPath);

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
const markdownContext = {
  markdownFiles: allMarkdownFiles,
  markdownTextByPath,
};
const incomingSceneRefCount = new Map(sceneConfigs.map((scenePath) => [scenePath, 0]));
const stableIdLabelLock = readStableIdLabelLock();

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
  const actualSceneName = asText(scene.name) || asText(scene.title);
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

  const objectLabelById = collectStableObjectLabels(sceneData);

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
  const rawType = asText(scene.type);
  if (!rawType) {
    errors.push(`${scenePath}: scene.type is required`);
  } else if (!ALLOWED_SCENE_TYPES.has(rawType)) {
    errors.push(
      `${scenePath}: scene.type "${rawType}" is not allowed (allowed: ${[
        ...ALLOWED_SCENE_TYPES,
      ].join(", ")})`
    );
  }

  const legacySceneFields = [
    "kind",
    "layoutMode",
    "autoMarkdownPath",
    "autoMarkdownSection",
    "autoMarkdownHeadingLevel",
    "autoMarkdownColumns",
    "autoMarkdownSectionDepth",
    "autoMarkdownIncludeExistingInLayout",
    "autoMarkdownNodeRadius",
    "autoMarkdownRingRadius",
    "autoMarkdownMaxRingCount",
    "autoMarkdownGridSpacing",
    "autoMarkdownPalette",
    "autoMarkdownPaletteName",
    "autoMarkdownColor",
    "autoMarkdownExcludePaths",
    "autoMarkdownPlainPaths",
    "autoMarkdownDefaultIndex",
    "autoMarkdownIndexPaths",
    "autoMarkdownPlainSectionPaths",
    "autoMarkdownOverrides",
  ];
  legacySceneFields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(scene, field)) {
      errors.push(`${scenePath}: legacy scene field "${field}" is not allowed`);
    }
  });

  if (sceneSchema) {
    validateSchemaValue(scenePath, data, sceneSchema, []);
  }
  validateSceneTypeSpecificRules(scenePath, data);
  validateSceneIntegrity(scenePath, data, markdownContext);

  const sceneMarkdownPath = resolveAuthoredMarkdownPath(scene);
  if (typeof sceneMarkdownPath === "string") {
    validateFileReference(
      scenePath,
      "scene.source.path",
      sceneMarkdownPath,
      markdownFileSet,
      markdownFileLower
    );
  }

  const objectIdSet = new Set(
    objects
      .map((obj) => (typeof obj?.id === "string" ? obj.id : null))
      .filter((value) => typeof value === "string" && value.length > 0)
  );
  if (Array.isArray(scene.children)) {
    scene.children.forEach((childRef, childIndex) => {
      if (!childRef || typeof childRef !== "object") {
        errors.push(`${scenePath} -> scene.children[${childIndex}]: expected object`);
        return;
      }
      const nodeId = typeof childRef.nodeId === "string" ? childRef.nodeId : "";
      if (!nodeId) {
        errors.push(`${scenePath} -> scene.children[${childIndex}]: expected nodeId`);
        return;
      }
      if (!objectIdSet.has(nodeId)) {
        errors.push(
          `${scenePath} -> scene.children[${childIndex}]: nodeId "${nodeId}" does not match any object id`
        );
      }
      const childTarget =
        typeof childRef.scenePath === "string"
          ? childRef.scenePath
          : typeof childRef.sceneId === "string"
            ? childRef.sceneId
            : "";
      if (!childTarget) {
        errors.push(
          `${scenePath} -> scene.children[${childIndex}]: expected scenePath or sceneId`
        );
        return;
      }
      validateFileReference(
        scenePath,
        `scene.children[${childIndex}]`,
        childTarget,
        sceneConfigSet,
        sceneConfigLower
      );
      const resolvedTarget = resolveKnownPath(childTarget, sceneConfigSet, sceneConfigLower);
      if (resolvedTarget) {
        incomingSceneRefCount.set(
          resolvedTarget,
          (incomingSceneRefCount.get(resolvedTarget) ?? 0) + 1
        );
      }
    });
  }

  objects.forEach((obj, index) => {
    const objectLabel = typeof obj?.id === "string" && obj.id ? obj.id : `objects[${index}]`;
    if (Array.isArray(obj?.children) && obj.children.length > 0) {
      errors.push(
        `${scenePath} -> ${objectLabel}.children: child-scene refs must live in scene.children`
      );
    }
    const objectMarkdownPath = resolveAuthoredMarkdownPath(obj);
    const objectMarkdownSection = resolveAuthoredMarkdownSection(obj);
    if (typeof objectMarkdownPath === "string") {
      validateFileReference(
        scenePath,
        `${objectLabel}.source.path`,
        objectMarkdownPath,
        markdownFileSet,
        markdownFileLower
      );
    }
    if (typeof objectMarkdownPath === "string" && typeof objectMarkdownSection === "string") {
      const normalizedPath = normalizePath(objectMarkdownPath);
      const sectionKey = normalizeMarkdownKey(objectMarkdownSection);
      const headingCounts = markdownHeadingKeyCountByPath.get(normalizedPath);
      const matches = headingCounts?.get(sectionKey) ?? 0;
      if (matches > 1) {
        warnings.push(
          `${scenePath} -> ${objectLabel}.view.section: ambiguous section key "${objectMarkdownSection}" in ${normalizedPath} (${matches} matching headings)`
        );
      }
    }
  });
}

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
console.log(`- Repo markdown files audited: ${repoMarkdownAuditFiles.length}`);
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
