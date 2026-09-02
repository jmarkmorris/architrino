#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import { isPublicProductSceneSearchEntry } from "../src/apps/navigator/StandaloneAppLaunchRuntime.js";

const SCENES_INDEX_PATH = "content/scenes/scenes_index.json";
const MARKDOWN_INDEX_PATH = "content/markdown/markdown_index.json";
const GENERATED_MARKDOWN_DIR = "content/generated/markdown";
const PERIODIC_TABLE_PATH = "content/scenes/chemistry/periodic_table.json";
const LEGEND_ROUTES_PATH = "content/graph/runtime_routes.json";
const ROOT_SCENE_PATH = "content/scenes/architrino_assembly_architecture.json";
const OUTPUT_PATH = "content/graph/scene_graph.json";
const TEXTBOOK_TOC_PATH = "content/graph/textbook_toc.json";
const TEXTBOOK_TOC_MARKDOWN_PATH = "content/generated/markdown/textbook/toc.md";

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
const warnings = [];
const errors = [];

function printUsage(exitCode) {
  console.log("Usage: node scripts/build-scene-graph.mjs [--check|--write] [--strict]");
  console.log(
    "  --check   Validate generated graph/TOC artifacts against content/graph/scene_graph.json, content/graph/textbook_toc.json, and content/generated/markdown/textbook/toc.md (default)"
  );
  console.log(
    "  --write   Regenerate content/graph/scene_graph.json, content/graph/textbook_toc.json, and content/generated/markdown/textbook/toc.md"
  );
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
    .replace(/\.[a-z0-9]+$/i, "")
    .split(/[-_]+/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function stripWalkthroughStepPrefix(title) {
  const cleaned = String(title || "").trim();
  if (!cleaned) {
    return "";
  }
  return cleaned
    .replace(/^Walkthrough\s+Step\s+\d+\s*[—\-:]\s*/i, "")
    .trim();
}

function extractMarkdownDocumentTitle(markdownText) {
  if (typeof markdownText !== "string" || !markdownText.trim()) {
    return null;
  }
  const lines = markdownText.split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^#\s+(.+)$/);
    if (!match) {
      continue;
    }
    const heading = match[1].trim();
    if (!heading) {
      continue;
    }
    return stripWalkthroughStepPrefix(heading) || heading;
  }
  return null;
}

function inferSceneId(scenePath) {
  const file = scenePath.split("/").pop() || "scene";
  return file.replace(/\.json$/i, "");
}

function inferMarkdownName(markdownPath, resolvedTitle = null) {
  if (resolvedTitle && resolvedTitle.trim()) {
    return resolvedTitle.trim();
  }
  const file = markdownPath.split("/").pop() || "notes";
  return stripWalkthroughStepPrefix(titleFromSlug(file)) || titleFromSlug(file);
}

function normalizeMarkdownKey(text) {
  return String(text)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
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
    level: startLevel,
  };
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

function readText(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  try {
    return { ok: true, data: fs.readFileSync(absolutePath, "utf8") };
  } catch (error) {
    return { ok: false, error };
  }
}

function walkFiles(relativeDir, predicate) {
  const dirPath = path.join(rootDir, relativeDir);
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  const files = [];
  const stack = [relativeDir];
  while (stack.length) {
    const currentRelativeDir = stack.pop();
    const currentAbsoluteDir = path.join(rootDir, currentRelativeDir);
    const entries = fs.readdirSync(currentAbsoluteDir, { withFileTypes: true });
    entries.forEach((entry) => {
      const childRelativePath = normalizePath(path.join(currentRelativeDir, entry.name));
      if (entry.isDirectory()) {
        stack.push(childRelativePath);
        return;
      }
      if (entry.isFile() && predicate(entry.name, childRelativePath)) {
        files.push(childRelativePath);
      }
    });
  }
  return files.sort((a, b) => a.localeCompare(b));
}

function sceneNodeId(scenePath) {
  return `scene:${scenePath}`;
}

function markdownDocNodeId(markdownPath) {
  return `markdown_doc:${markdownPath}`;
}

function assetNodeId(assetPath) {
  return `asset:${assetPath}`;
}

function resolveAuthoredMarkdownPath(entry) {
  if (entry?.source?.type === "markdown" && typeof entry?.source?.path === "string") {
    return entry.source.path;
  }
  return null;
}

function resolveAuthoredAssetPath(entry) {
  if (
    (entry?.source?.type === "pdf" ||
      entry?.source?.type === "file" ||
      entry?.source?.type === "asset") &&
    typeof entry?.source?.path === "string"
  ) {
    return entry.source.path;
  }
  return null;
}

function resolveAuthoredMarkdownSection(entry) {
  if (typeof entry?.view?.section === "string" && entry.view.section.trim()) {
    return entry.view.section.trim();
  }
  if (typeof entry?.source?.split?.section === "string" && entry.source.split.section.trim()) {
    return entry.source.split.section.trim();
  }
  if (typeof entry?.source?.tree?.section === "string" && entry.source.tree.section.trim()) {
    return entry.source.tree.section.trim();
  }
  return null;
}

function sceneKindFromType(sceneType) {
  switch (sceneType) {
    case "Scene-Index":
      return "scene-index";
    case "Scene-Markdown-View":
      return "markdown-view";
    case "Scene-Markdown-Split":
      return "markdown-split";
    case "Scene-Markdown-Tree":
      return "markdown-tree";
    case "Scene-Diagram":
      return "diagram";
    case "Scene-Animation":
      return "animation";
    default:
      return "scene";
  }
}

function escapeMarkdownLinkText(text) {
  return String(text).replace(/([\[\]])/g, "\\$1");
}

function normalizeTextbookTocMarkdownLabel(text) {
  const stylizedAAA = "$\\mathbb{A}\\mathbb{A}\\mathbb{A}$";
  const stylizedUNow = "$\\mathbb{U}_{\\text{now}}$";
  const preservedMathSegments = [];
  const labelWithMathTokens = String(text).replace(/\$[^$\n]+\$/g, (segment) => {
    const token = `TEXTBOOKMATHSEGMENT${preservedMathSegments.length}X`;
    preservedMathSegments.push(segment);
    return token;
  });

  let normalizedLabel = labelWithMathTokens
    .replace(/𝔸𝔸𝔸/g, stylizedAAA)
    .replace(/\bAAA\b/g, stylizedAAA)
    .replace(/\bU_now\b/g, stylizedUNow)
    .replace(/\|= /g, "| = ");
  preservedMathSegments.forEach((segment, index) => {
    normalizedLabel = normalizedLabel.replace(`TEXTBOOKMATHSEGMENT${index}X`, segment);
  });
  return normalizedLabel;
}

function compareNodes(a, b) {
  const typeOrder = {
    scene: 0,
    markdown_doc: 1,
  };
  const aType = typeOrder[a.nodeType] ?? 99;
  const bType = typeOrder[b.nodeType] ?? 99;
  if (aType !== bType) {
    return aType - bType;
  }
  const aPath = asText(a.path);
  const bPath = asText(b.path);
  if (aPath !== bPath) {
    return aPath.localeCompare(bPath);
  }
  return asText(a.id).localeCompare(asText(b.id));
}

function compareEdges(a, b) {
  const typeOrder = {
    subscene: 0,
    markdown_doc: 1,
    runtime_generated: 2,
  };
  const aType = typeOrder[a.edgeType] ?? 99;
  const bType = typeOrder[b.edgeType] ?? 99;
  if (aType !== bType) {
    return aType - bType;
  }
  if (a.from !== b.from) {
    return a.from.localeCompare(b.from);
  }
  if (a.to !== b.to) {
    return a.to.localeCompare(b.to);
  }
  if (a.source !== b.source) {
    return a.source.localeCompare(b.source);
  }
  return (a.field ?? "").localeCompare(b.field ?? "");
}

const scenesIndexResult = readJson(SCENES_INDEX_PATH);
if (!scenesIndexResult.ok) {
  errors.push(
    `${SCENES_INDEX_PATH}: failed to parse JSON (${scenesIndexResult.error.message})`
  );
}

const markdownIndexResult = readJson(MARKDOWN_INDEX_PATH);
if (!markdownIndexResult.ok) {
  errors.push(
    `${MARKDOWN_INDEX_PATH}: failed to parse JSON (${markdownIndexResult.error.message})`
  );
}

if (errors.length) {
  printReportAndExit({
    mode,
    strict,
    nodes: [],
    edges: [],
    searchEntries: [],
    tocEntryCount: 0,
    tocSectionCount: 0,
    wroteGraph: false,
    wroteToc: false,
    wroteTocMarkdown: false,
    graphDrift: false,
    tocDrift: false,
    tocMarkdownDrift: false,
  });
}

const sceneEntriesRaw = Array.isArray(scenesIndexResult.data?.scenes)
  ? scenesIndexResult.data.scenes
  : [];
if (!Array.isArray(scenesIndexResult.data?.scenes)) {
  errors.push(`${SCENES_INDEX_PATH}: expected { "scenes": [...] }`);
}

const markdownFilesRaw = Array.isArray(markdownIndexResult.data?.files)
  ? markdownIndexResult.data.files
  : [];
if (!Array.isArray(markdownIndexResult.data?.files)) {
  errors.push(`${MARKDOWN_INDEX_PATH}: expected { "files": [...] }`);
}

const sceneEntries = [];
const sceneEntryByPath = new Map();
const sceneEntryById = new Map();
const sceneDataByPath = new Map();

sceneEntriesRaw.forEach((entry, index) => {
  if (!entry || typeof entry !== "object") {
    errors.push(`${SCENES_INDEX_PATH}: scenes[${index}] is not an object`);
    return;
  }
  const scenePath = normalizePath(entry.path);
  if (!scenePath) {
    errors.push(`${SCENES_INDEX_PATH}: scenes[${index}].path must be a non-empty string`);
    return;
  }
  const sceneId = asText(entry.id) || inferSceneId(scenePath);
  const sceneName = asText(entry.name) || titleFromSlug(sceneId);
  const normalized = {
    id: sceneId,
    name: sceneName,
    path: scenePath,
  };
  sceneEntries.push(normalized);
  if (!sceneEntryByPath.has(scenePath)) {
    sceneEntryByPath.set(scenePath, normalized);
  }
  if (sceneId && !sceneEntryById.has(sceneId)) {
    sceneEntryById.set(sceneId, normalized);
  }
});

const markdownFiles = [];
const indexedMarkdownFileSet = new Set();
markdownFilesRaw.forEach((entry, index) => {
  if (typeof entry !== "string") {
    errors.push(`${MARKDOWN_INDEX_PATH}: files[${index}] must be a string`);
    return;
  }
  const markdownPath = normalizePath(entry);
  if (!markdownPath) {
    errors.push(`${MARKDOWN_INDEX_PATH}: files[${index}] must not be empty`);
    return;
  }
  if (indexedMarkdownFileSet.has(markdownPath)) {
    return;
  }
  indexedMarkdownFileSet.add(markdownPath);
  markdownFiles.push(markdownPath);
});

const generatedMarkdownFiles = walkFiles(
  GENERATED_MARKDOWN_DIR,
  (name) => name.toLowerCase().endsWith(".md")
);
const generatedPdfFiles = walkFiles(
  "content/generated/pdf",
  (name) => name.toLowerCase().endsWith(".pdf")
);
const servedMarkdownFiles = [...markdownFiles, ...generatedMarkdownFiles];
const servedMarkdownFileSet = new Set(servedMarkdownFiles);
servedMarkdownFileSet.add(TEXTBOOK_TOC_MARKDOWN_PATH);
const servedAssetFileSet = new Set(generatedPdfFiles);

for (const sceneEntry of sceneEntries) {
  const parsed = readJson(sceneEntry.path);
  if (!parsed.ok) {
    errors.push(`${sceneEntry.path}: failed to parse JSON (${parsed.error.message})`);
    continue;
  }
  const data = parsed.data;
  const hasScene = data && typeof data.scene === "object";
  const hasObjects = Array.isArray(data?.objects);
  if (!hasScene || !hasObjects) {
    errors.push(`${sceneEntry.path}: expected scene config object with { scene, objects[] }`);
    continue;
  }
  sceneDataByPath.set(sceneEntry.path, data);
}

const markdownTitleByPath = new Map();
const markdownTextByPath = new Map();
for (const markdownPath of markdownFiles) {
  const markdownRaw = readText(markdownPath);
  if (!markdownRaw.ok) {
    warnings.push(`${markdownPath}: failed to read markdown file (${markdownRaw.error.message})`);
    continue;
  }
  markdownTextByPath.set(markdownPath, markdownRaw.data);
  const title = extractMarkdownDocumentTitle(markdownRaw.data);
  if (title) {
    markdownTitleByPath.set(markdownPath, title);
  }
}

for (const markdownPath of generatedMarkdownFiles) {
  if (markdownTextByPath.has(markdownPath)) {
    continue;
  }
  const markdownRaw = readText(markdownPath);
  if (!markdownRaw.ok) {
    warnings.push(`${markdownPath}: failed to read generated markdown file (${markdownRaw.error.message})`);
    continue;
  }
  markdownTextByPath.set(markdownPath, markdownRaw.data);
  const title = extractMarkdownDocumentTitle(markdownRaw.data);
  if (title) {
    markdownTitleByPath.set(markdownPath, title);
  }
}

function resolveChildScenePath(childRef) {
  if (typeof childRef?.scenePath === "string" && childRef.scenePath.trim()) {
    return normalizePath(childRef.scenePath);
  }
  if (typeof childRef?.sceneId === "string" && childRef.sceneId.trim()) {
    return sceneEntryById.get(childRef.sceneId.trim())?.path ?? null;
  }
  return null;
}

const nodeById = new Map();
const edgeByKey = new Map();
const sceneSearchOrder = sceneEntries.map((entry) => entry.path);
const scenePathSet = new Set(sceneEntries.map((entry) => entry.path));
const periodicRuntimeRouteBySymbol = new Map();
const elementLegendRuntimeTargets = [];

function addNode(node) {
  const nodeId = asText(node.nodeId);
  if (!nodeId) {
    return;
  }
  if (nodeById.has(nodeId)) {
    return;
  }
  nodeById.set(nodeId, node);
}

function ensureSceneNode(scenePath, defaults = {}) {
  const normalizedPath = normalizePath(scenePath);
  if (!normalizedPath) {
    return null;
  }
  const nodeId = sceneNodeId(normalizedPath);
  if (!nodeById.has(nodeId)) {
    const indexed = sceneEntryByPath.get(normalizedPath);
    const id = asText(defaults.id) || indexed?.id || inferSceneId(normalizedPath);
    const name =
      asText(defaults.name) || indexed?.name || titleFromSlug(id) || titleFromSlug(normalizedPath);
    addNode({
      nodeId,
      nodeType: "scene",
      id,
      name,
      path: normalizedPath,
      searchTarget: normalizedPath,
      implicit: !indexed,
    });
  }
  return nodeId;
}

function ensureMarkdownDocNode(markdownPath) {
  const normalizedPath = normalizePath(markdownPath);
  if (!normalizedPath) {
    return null;
  }
  const nodeId = markdownDocNodeId(normalizedPath);
  if (!nodeById.has(nodeId)) {
    const resolvedTitle = markdownTitleByPath.get(normalizedPath) || null;
    addNode({
      nodeId,
      nodeType: "markdown_doc",
      id: normalizedPath,
      name: inferMarkdownName(normalizedPath, resolvedTitle),
      path: normalizedPath,
      searchTarget: normalizedPath,
      implicit: !servedMarkdownFileSet.has(normalizedPath),
    });
  }
  return nodeId;
}

function inferAssetName(assetPath) {
  const leaf = String(assetPath || "").split("/").filter(Boolean).pop() || "";
  return titleFromSlug(leaf.replace(/\.[^.]+$/, ""));
}

function ensureAssetNode(assetPath) {
  const normalizedPath = normalizePath(assetPath);
  if (!normalizedPath) {
    return null;
  }
  const nodeId = assetNodeId(normalizedPath);
  if (!nodeById.has(nodeId)) {
    addNode({
      nodeId,
      nodeType: "asset",
      id: normalizedPath,
      name: inferAssetName(normalizedPath),
      path: normalizedPath,
      searchTarget: normalizedPath,
      implicit: !servedAssetFileSet.has(normalizedPath),
    });
  }
  return nodeId;
}

function addEdge({ from, to, edgeType, source, field }) {
  if (!from || !to || !edgeType) {
    return;
  }
  const key = `${edgeType}|${from}|${to}`;
  if (edgeByKey.has(key)) {
    return;
  }
  edgeByKey.set(key, {
    from,
    to,
    edgeType,
    source: asText(source),
    field: asText(field),
  });
}

function addMarkdownDocEdge(scenePath, markdownPath, field) {
  const normalizedMarkdownPath = normalizePath(markdownPath);
  if (!normalizedMarkdownPath) {
    return;
  }
  if (!servedMarkdownFileSet.has(normalizedMarkdownPath)) {
    warnings.push(
      `${scenePath} -> ${field}: markdown file is not indexed or generated (${normalizedMarkdownPath})`
    );
  }
  const from = ensureSceneNode(scenePath);
  const to = ensureMarkdownDocNode(normalizedMarkdownPath);
  addEdge({
    from,
    to,
    edgeType: "markdown_doc",
    source: scenePath,
    field,
  });
}

function addAssetEdge(scenePath, assetPath, field) {
  const normalizedAssetPath = normalizePath(assetPath);
  if (!normalizedAssetPath) {
    return;
  }
  if (!servedAssetFileSet.has(normalizedAssetPath)) {
    warnings.push(
      `${scenePath} -> ${field}: asset file is not generated (${normalizedAssetPath})`
    );
  }
  const from = ensureSceneNode(scenePath);
  const to = ensureAssetNode(normalizedAssetPath);
  addEdge({
    from,
    to,
    edgeType: "asset",
    source: scenePath,
    field,
  });
}

for (const sceneEntry of sceneEntries) {
  ensureSceneNode(sceneEntry.path, {
    id: sceneEntry.id,
    name: sceneEntry.name,
  });
}

for (const markdownPath of markdownFiles) {
  ensureMarkdownDocNode(markdownPath);
}

for (const sceneEntry of sceneEntries) {
  const scenePath = sceneEntry.path;
  const data = sceneDataByPath.get(scenePath);
  if (!data) {
    continue;
  }
  const scene = data.scene || {};
  const sceneType = asText(scene.type);
  const objects = Array.isArray(data.objects) ? data.objects : [];

  const sceneMarkdownPath = resolveAuthoredMarkdownPath(scene);
  if (typeof sceneMarkdownPath === "string") {
    addMarkdownDocEdge(scenePath, sceneMarkdownPath, "scene.source.path");
  }
  if (Array.isArray(scene.children)) {
    scene.children.forEach((childRef, childIndex) => {
      const normalizedSubScenePath = resolveChildScenePath(childRef);
      if (!normalizedSubScenePath) {
        return;
      }
      if (!scenePathSet.has(normalizedSubScenePath)) {
        warnings.push(
          `${scenePath} -> scene.children[${childIndex}]: target scene missing from index (${normalizedSubScenePath})`
        );
      }
      const from = ensureSceneNode(scenePath);
      const to = ensureSceneNode(normalizedSubScenePath);
      addEdge({
        from,
        to,
        edgeType: "subscene",
        source: scenePath,
        field: `scene.children[${childIndex}]`,
      });
    });
  }

  objects.forEach((obj, objectIndex) => {
    const objectMarkdownPath = resolveAuthoredMarkdownPath(obj);
    if (typeof objectMarkdownPath === "string") {
      const objectId = asText(obj.id) || `objects[${objectIndex}]`;
      addMarkdownDocEdge(scenePath, objectMarkdownPath, `${objectId}.source.path`);
    }
    const objectAssetPath = resolveAuthoredAssetPath(obj);
    if (typeof objectAssetPath === "string") {
      const objectId = asText(obj.id) || `objects[${objectIndex}]`;
      addAssetEdge(scenePath, objectAssetPath, `${objectId}.source.path`);
    }
  });
}

const periodicDataResult = readJson(PERIODIC_TABLE_PATH);
if (!periodicDataResult.ok) {
  warnings.push(
    `${PERIODIC_TABLE_PATH}: failed to parse periodic table data (${periodicDataResult.error.message})`
  );
} else {
  const elements = Array.isArray(periodicDataResult.data?.elements)
    ? periodicDataResult.data.elements
    : [];
  const sourceScenePath = "content/scenes/chemistry/periodic_table_scene.json";
  elements.forEach((element) => {
    const symbol = asText(element?.symbol).toLowerCase();
    if (!symbol) {
      return;
    }
    const targetScenePath = normalizePath(`content/scenes/elements/${symbol}.json`);
    const absoluteTargetScenePath = path.join(rootDir, targetScenePath);
    if (!fs.existsSync(absoluteTargetScenePath)) {
      warnings.push(
        `Periodic runtime edge target missing scene file: ${targetScenePath}`
      );
      return;
    }
    const from = ensureSceneNode(sourceScenePath);
    const to = ensureSceneNode(targetScenePath, {
      id: symbol,
      name: `${titleFromSlug(symbol)} (${symbol.toUpperCase()})`,
    });
    addEdge({
      from,
      to,
      edgeType: "runtime_generated",
      source: "src/runtime/PeriodicOverlayRuntime.js",
      field: `periodicGrid:${symbol}`,
    });
    periodicRuntimeRouteBySymbol.set(symbol, targetScenePath);
  });
}

const legendRoutesResult = readJson(LEGEND_ROUTES_PATH);
if (!legendRoutesResult.ok) {
  warnings.push(
    `${LEGEND_ROUTES_PATH}: failed to parse JSON (${legendRoutesResult.error.message})`
  );
} else {
  const configuredTargets = Array.isArray(legendRoutesResult.data?.elementLegendTargets)
    ? legendRoutesResult.data.elementLegendTargets
    : null;
  if (!configuredTargets) {
    warnings.push(`${LEGEND_ROUTES_PATH}: expected { "elementLegendTargets": [...] }`);
  } else {
    const seenLegendTargets = new Set();
    configuredTargets.forEach((entry, index) => {
      if (typeof entry !== "string") {
        warnings.push(`${LEGEND_ROUTES_PATH}: elementLegendTargets[${index}] must be a string`);
        return;
      }
      const targetScenePath = normalizePath(entry);
      if (!targetScenePath) {
        warnings.push(`${LEGEND_ROUTES_PATH}: elementLegendTargets[${index}] must not be empty`);
        return;
      }
      if (seenLegendTargets.has(targetScenePath)) {
        return;
      }
      seenLegendTargets.add(targetScenePath);
      if (!scenePathSet.has(targetScenePath)) {
        warnings.push(
          `${LEGEND_ROUTES_PATH}: target scene missing from scene index (${targetScenePath})`
        );
      }
      elementLegendRuntimeTargets.push(targetScenePath);
    });
  }

  const elementScenePaths = sceneEntries
    .map((entry) => entry.path)
    .filter((scenePath) => scenePath.includes("/scenes/elements/"));

  for (const elementScenePath of elementScenePaths) {
    const from = ensureSceneNode(elementScenePath);
    for (const targetScenePath of elementLegendRuntimeTargets) {
      const to = ensureSceneNode(targetScenePath);
      addEdge({
        from,
        to,
        edgeType: "runtime_generated",
        source: "src/runtime/PeriodicOverlayRuntime.js",
        field: "elementLegend:route",
      });
    }
  }
}

function buildMarkdownSectionEntries({
  markdownPath,
  markdownSection,
  sceneType,
  sceneConfig,
}) {
  const normalizedMarkdownPath = normalizePath(markdownPath);
  const markdownText = markdownTextByPath.get(normalizedMarkdownPath);
  if (typeof markdownText !== "string" || !markdownText.trim()) {
    return [];
  }

  let scopedMarkdown = markdownText;
  let scopedSectionLevel = null;
  if (typeof markdownSection === "string" && markdownSection.trim()) {
    const extracted = extractMarkdownSection(markdownText, markdownSection);
    if (!extracted) {
      warnings.push(
        `${normalizedMarkdownPath}: textbook TOC could not resolve section "${markdownSection}"`
      );
      return [];
    }
    scopedMarkdown = extracted.body;
    scopedSectionLevel = extracted.level;
  }

  const source = sceneConfig?.source ?? {};
  const splitConfig =
    source.split && typeof source.split === "object" && !Array.isArray(source.split)
      ? source.split
      : null;
  const treeConfig =
    source.tree && typeof source.tree === "object" && !Array.isArray(source.tree)
      ? source.tree
      : null;

  let rootHeadingLevel = 2;
  let maxDepth = 1;
  if (sceneType === "Scene-Markdown-Split") {
    rootHeadingLevel =
      typeof splitConfig?.headingLevel === "number" ? splitConfig.headingLevel : rootHeadingLevel;
    maxDepth = typeof splitConfig?.maxDepth === "number" ? splitConfig.maxDepth : 1;
  } else if (sceneType === "Scene-Markdown-Tree") {
    rootHeadingLevel =
      typeof treeConfig?.rootHeadingLevel === "number"
        ? treeConfig.rootHeadingLevel
        : rootHeadingLevel;
    maxDepth = typeof treeConfig?.maxDepth === "number" ? treeConfig.maxDepth : 1;
  } else if (sceneType === "Scene-Markdown-View" && Number.isFinite(scopedSectionLevel)) {
    rootHeadingLevel = scopedSectionLevel + 1;
  }

  const boundedDepth = Math.max(1, Math.trunc(maxDepth || 1));
  const maxHeadingLevel = rootHeadingLevel + boundedDepth;
  const rawRoots = [];
  const stack = [];
  const lines = scopedMarkdown.split(/\r?\n/);
  lines.forEach((line) => {
    const heading = parseMarkdownHeading(line);
    if (!heading) {
      return;
    }
    if (heading.level < rootHeadingLevel || heading.level >= maxHeadingLevel) {
      return;
    }
    const rawTitle = heading.title;
    const title = stripWalkthroughStepPrefix(rawTitle) || rawTitle;
    const sectionKey = normalizeMarkdownKey(rawTitle);
    const node = {
      title,
      rawTitle,
      sectionKey,
      headingLevel: heading.level,
      children: [],
    };
    while (stack.length && stack[stack.length - 1].headingLevel >= heading.level) {
      stack.pop();
    }
    if (stack.length) {
      stack[stack.length - 1].children.push(node);
    } else {
      rawRoots.push(node);
    }
    stack.push(node);
  });

  const sectionOverridesSource =
    sceneType === "Scene-Markdown-Tree" ? treeConfig?.overrides : splitConfig?.overrides;
  const sectionOverrides =
    sectionOverridesSource &&
    typeof sectionOverridesSource === "object" &&
    !Array.isArray(sectionOverridesSource)
      ? sectionOverridesSource
      : null;

  function applyOverrides(nodes) {
    return nodes
      .map((node) => {
        const override =
          sectionOverrides && node.sectionKey ? sectionOverrides[node.sectionKey] : null;
        if (override?.hidden === true || override?.exclude === true) {
          return null;
        }
        const entry = {
          kind: "markdown-section",
          title:
            asText(override?.labelTitle) ||
            asText(override?.title) ||
            asText(node.title) ||
            node.rawTitle,
          markdownPath: normalizedMarkdownPath,
          markdownSection: node.rawTitle,
          sectionKey: node.sectionKey,
          headingLevel: node.headingLevel,
        };
        if (typeof markdownSection === "string" && markdownSection.trim()) {
          entry.parentMarkdownSection = markdownSection;
        }
        const forceDocMode = override?.mode === "doc";
        const children = forceDocMode ? [] : applyOverrides(node.children);
        if (children.length) {
          entry.children = children;
        }
        return entry;
      })
      .filter(Boolean);
  }

  return applyOverrides(rawRoots);
}

function buildTextbookTocEntry(scenePath, ancestry = new Set()) {
  const normalizedScenePath = normalizePath(scenePath);
  const indexedScene = sceneEntryByPath.get(normalizedScenePath);
  const sceneData = sceneDataByPath.get(normalizedScenePath);
  if (!indexedScene || !sceneData?.scene) {
    warnings.push(`Textbook TOC references missing scene data: ${normalizedScenePath}`);
    return null;
  }

  if (ancestry.has(normalizedScenePath)) {
    warnings.push(`Textbook TOC cycle detected at ${normalizedScenePath}`);
    return null;
  }

  const sceneConfig = sceneData.scene;
  const sceneType = asText(sceneConfig.type);
  const markdownPath = resolveAuthoredMarkdownPath(sceneConfig);
  const markdownSection = resolveAuthoredMarkdownSection(sceneConfig);
  const hideChildrenInToc = sceneConfig?.textbookToc?.hideChildren === true;
  const entry = {
    id: asText(sceneConfig.id) || indexedScene.id,
    title: asText(sceneConfig.title) || indexedScene.name,
    kind: sceneKindFromType(sceneType),
    sceneType,
    scenePath: normalizedScenePath,
  };

  if (typeof markdownPath === "string" && markdownPath.trim()) {
    entry.markdownPath = normalizePath(markdownPath);
  }
  if (typeof markdownSection === "string" && markdownSection.trim()) {
    entry.markdownSection = markdownSection;
    entry.sectionKey = normalizeMarkdownKey(markdownSection);
  }

  if (sceneType === "Scene-Markdown-View" ||
      sceneType === "Scene-Markdown-Split" ||
      sceneType === "Scene-Markdown-Tree") {
    const sections = buildMarkdownSectionEntries({
      markdownPath,
      markdownSection,
      sceneType,
      sceneConfig,
    });
    if (sections.length) {
      entry.sections = sections;
    }
  }

  if (!hideChildrenInToc && sceneType === "Scene-Index" && Array.isArray(sceneConfig.children)) {
    const nextAncestry = new Set(ancestry);
    nextAncestry.add(normalizedScenePath);
    const children = sceneConfig.children
      .filter((childRef) => childRef?.textbookToc?.hideEntry !== true)
      .map((childRef) => resolveChildScenePath(childRef))
      .filter(Boolean)
      .map((childScenePath) => buildTextbookTocEntry(childScenePath, nextAncestry))
      .filter(Boolean);
    if (children.length) {
      entry.children = children;
    }
  }

  return entry;
}

function countTocEntries(entry) {
  if (!entry || typeof entry !== "object") {
    return 0;
  }
  const children = Array.isArray(entry.children) ? entry.children : [];
  return 1 + children.reduce((sum, child) => sum + countTocEntries(child), 0);
}

function countTocSections(sections) {
  const list = Array.isArray(sections) ? sections : [];
  return list.reduce((sum, section) => {
    const childCount = countTocSections(section.children);
    return sum + 1 + childCount;
  }, 0);
}

function countAllTocSections(entry) {
  if (!entry || typeof entry !== "object") {
    return 0;
  }
  const ownSections = countTocSections(entry.sections);
  const childSections = Array.isArray(entry.children)
    ? entry.children.reduce((sum, child) => sum + countAllTocSections(child), 0)
    : 0;
  return ownSections + childSections;
}

function relativeRepoLink(fromPath, targetPath, searchParams = null) {
  const fromDir = path.posix.dirname(normalizePath(fromPath));
  const relativePath = path.posix.relative(fromDir, normalizePath(targetPath)) || ".";
  const normalizedRelativePath = toPosixPath(relativePath);
  if (!searchParams || !Object.keys(searchParams).length) {
    return normalizedRelativePath;
  }
  const query = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string" && value.trim()) {
      query.set(key, value);
    }
  });
  const serialized = query.toString();
  return serialized ? `${normalizedRelativePath}?${serialized}` : normalizedRelativePath;
}

function renderTextbookTocMarkdown(rootEntry) {
  const lines = [
    "# Textbook TOC",
    "",
    "This generated table of contents mirrors the current authored scene order and local section structure.",
    "Chapter links open scenes. Section links open the corresponding markdown section.",
    "",
  ];

  function formatNumberedTocItem(numberPath, label, target, badge = "") {
    const chapterPrefix = `**Ch ${numberPath.join(".")}**`;
    const title = target ? `[${label}](${target})` : label;
    return `${chapterPrefix} ${title}${badge}`;
  }

  function renderEntry(entry, depth, numberPath) {
    if (!entry || typeof entry !== "object") {
      return;
    }
    const indent = "  ".repeat(depth);
    let target = null;
    if (typeof entry.scenePath === "string" && entry.scenePath.trim()) {
      target = relativeRepoLink(TEXTBOOK_TOC_MARKDOWN_PATH, entry.scenePath);
    } else if (typeof entry.markdownPath === "string" && entry.markdownPath.trim()) {
      target = relativeRepoLink(TEXTBOOK_TOC_MARKDOWN_PATH, entry.markdownPath);
    }

    const badge =
      entry.kind === "diagram"
        ? " _(diagram)_"
        : entry.kind === "animation"
          ? " _(animation)_"
          : "";
    const label = escapeMarkdownLinkText(normalizeTextbookTocMarkdownLabel(entry.title));
    lines.push(`${indent}- ${formatNumberedTocItem(numberPath, label, target, badge)}`);

    const sections = Array.isArray(entry.sections) ? entry.sections : [];
    const children = Array.isArray(entry.children) ? entry.children : [];
    let nextOrdinal = 1;
    sections.forEach((section) => {
      renderSection(section, depth + 1, [...numberPath, nextOrdinal]);
      nextOrdinal += 1;
    });
    children.forEach((child) => {
      renderEntry(child, depth + 1, [...numberPath, nextOrdinal]);
      nextOrdinal += 1;
    });
  }

  function renderSection(section, depth, numberPath) {
    if (!section || typeof section !== "object") {
      return;
    }
    const indent = "  ".repeat(depth);
    const target = relativeRepoLink(TEXTBOOK_TOC_MARKDOWN_PATH, section.markdownPath, {
      section: section.markdownSection,
    });
    const label = escapeMarkdownLinkText(normalizeTextbookTocMarkdownLabel(section.title));
    lines.push(`${indent}- ${formatNumberedTocItem(numberPath, label, target)}`);
    const children = Array.isArray(section.children) ? section.children : [];
    children.forEach((child, index) => renderSection(child, depth + 1, [...numberPath, index + 1]));
  }

  const rootChildren = Array.isArray(rootEntry?.children) ? rootEntry.children : [];
  rootChildren.forEach((entry, index) => renderEntry(entry, 0, [index + 1]));
  return `${lines.join("\n")}\n`;
}

const nodes = Array.from(nodeById.values()).sort(compareNodes);
const edges = Array.from(edgeByKey.values()).sort(compareEdges);

const sceneNodes = nodes.filter((node) => node.nodeType === "scene");
const markdownDocNodes = nodes.filter((node) => node.nodeType === "markdown_doc");

const sceneNodeByPath = new Map(sceneNodes.map((node) => [node.path, node]));
const orderedSceneNodes = [];
const seenSceneNodeIds = new Set();
for (const scenePath of sceneSearchOrder) {
  const node = sceneNodeByPath.get(scenePath);
  if (!node) {
    continue;
  }
  orderedSceneNodes.push(node);
  seenSceneNodeIds.add(node.nodeId);
}
sceneNodes
  .filter((node) => !seenSceneNodeIds.has(node.nodeId))
  .sort((a, b) => a.path.localeCompare(b.path))
  .forEach((node) => orderedSceneNodes.push(node));

const orderedMarkdownDocNodes = [...markdownDocNodes].sort((a, b) =>
  a.path.localeCompare(b.path)
);

const rawSearchEntries = [
  ...orderedSceneNodes,
  ...orderedMarkdownDocNodes,
]
  .filter((node) => typeof node.searchTarget === "string" && node.searchTarget.length > 0)
  .map((node) => ({
    id: asText(node.id) || asText(node.path),
    name: asText(node.name) || asText(node.id) || asText(node.path),
    path: node.searchTarget,
    nodeType: node.nodeType,
  }));

const searchEntries = rawSearchEntries.filter(isPublicProductSceneSearchEntry);

for (const edge of edges) {
  if (!nodeById.has(edge.from)) {
    errors.push(`Edge from missing node: ${edge.from}`);
  }
  if (!nodeById.has(edge.to)) {
    errors.push(`Edge to missing node: ${edge.to}`);
  }
}

const periodicGridRoutes = Object.fromEntries(
  [...periodicRuntimeRouteBySymbol.entries()].sort(([a], [b]) => a.localeCompare(b))
);
const orderedElementLegendTargets = [...elementLegendRuntimeTargets];

const manifest = {
  meta: {
    schemaVersion: 1,
    generator: "scripts/build-scene-graph.mjs",
    sources: {
      scenesIndex: SCENES_INDEX_PATH,
      markdownIndex: MARKDOWN_INDEX_PATH,
      periodicTable: PERIODIC_TABLE_PATH,
      elementLegendSource: LEGEND_ROUTES_PATH,
    },
    counts: {
      nodes: nodes.length,
      edges: edges.length,
      scenes: sceneNodes.length,
      markdownIndexes: 0,
      markdownDocs: markdownDocNodes.length,
      runtimeEdges: edges.filter((edge) => edge.edgeType === "runtime_generated").length,
      periodicGridRoutes: Object.keys(periodicGridRoutes).length,
      elementLegendTargets: orderedElementLegendTargets.length,
    },
  },
  runtimeRoutes: {
    periodicGrid: periodicGridRoutes,
    elementLegendTargets: orderedElementLegendTargets,
  },
  searchEntries,
  nodes,
  edges,
};

const textbookTocRoot = buildTextbookTocEntry(ROOT_SCENE_PATH);
const textbookTocManifest = {
  meta: {
    schemaVersion: 1,
    generator: "scripts/build-scene-graph.mjs",
    rootScenePath: ROOT_SCENE_PATH,
    sources: {
      scenesIndex: SCENES_INDEX_PATH,
      markdownIndex: MARKDOWN_INDEX_PATH,
    },
    counts: {
      entries: countTocEntries(textbookTocRoot),
      sections: countAllTocSections(textbookTocRoot),
    },
  },
  tocRoot: textbookTocRoot,
};
const serializedTextbookTocMarkdown = renderTextbookTocMarkdown(textbookTocRoot);

const serializedManifest = `${JSON.stringify(manifest, null, 2)}\n`;
const outputAbsolutePath = path.join(rootDir, OUTPUT_PATH);
const currentManifestRaw = fs.existsSync(outputAbsolutePath)
  ? fs.readFileSync(outputAbsolutePath, "utf8")
  : null;
const graphDrift = currentManifestRaw !== serializedManifest;

const serializedTextbookToc = `${JSON.stringify(textbookTocManifest, null, 2)}\n`;
const textbookTocAbsolutePath = path.join(rootDir, TEXTBOOK_TOC_PATH);
const currentTextbookTocRaw = fs.existsSync(textbookTocAbsolutePath)
  ? fs.readFileSync(textbookTocAbsolutePath, "utf8")
  : null;
const tocDrift = currentTextbookTocRaw !== serializedTextbookToc;

const textbookTocMarkdownAbsolutePath = path.join(rootDir, TEXTBOOK_TOC_MARKDOWN_PATH);
const currentTextbookTocMarkdownRaw = fs.existsSync(textbookTocMarkdownAbsolutePath)
  ? fs.readFileSync(textbookTocMarkdownAbsolutePath, "utf8")
  : null;
const tocMarkdownDrift = currentTextbookTocMarkdownRaw !== serializedTextbookTocMarkdown;

let wroteGraph = false;
let wroteToc = false;
let wroteTocMarkdown = false;
if (mode === "write" && graphDrift) {
  fs.mkdirSync(path.dirname(outputAbsolutePath), { recursive: true });
  fs.writeFileSync(outputAbsolutePath, serializedManifest, "utf8");
  wroteGraph = true;
}
if (mode === "write" && tocDrift) {
  fs.mkdirSync(path.dirname(textbookTocAbsolutePath), { recursive: true });
  fs.writeFileSync(textbookTocAbsolutePath, serializedTextbookToc, "utf8");
  wroteToc = true;
}
if (mode === "write" && tocMarkdownDrift) {
  fs.mkdirSync(path.dirname(textbookTocMarkdownAbsolutePath), { recursive: true });
  fs.writeFileSync(textbookTocMarkdownAbsolutePath, serializedTextbookTocMarkdown, "utf8");
  wroteTocMarkdown = true;
}

printReportAndExit({
  mode,
  strict,
  nodes,
  edges,
  searchEntries,
  tocEntryCount: countTocEntries(textbookTocRoot),
  tocSectionCount: countAllTocSections(textbookTocRoot),
  wroteGraph,
  wroteToc,
  wroteTocMarkdown,
  graphDrift,
  tocDrift,
  tocMarkdownDrift,
});

function printReportAndExit({
  mode: reportMode,
  strict: reportStrict,
  nodes: reportNodes,
  edges: reportEdges,
  searchEntries: reportSearchEntries,
  tocEntryCount: reportTocEntryCount,
  tocSectionCount: reportTocSectionCount,
  wroteGraph: reportWroteGraph,
  wroteToc: reportWroteToc,
  wroteTocMarkdown: reportWroteTocMarkdown,
  graphDrift: reportGraphDrift,
  tocDrift: reportTocDrift,
  tocMarkdownDrift: reportTocMarkdownDrift,
}) {
  console.log(`build-scene-graph mode: ${reportMode}${reportStrict ? " (strict)" : ""}`);
  console.log(`- Scene index entries: ${sceneEntries.length}`);
  console.log(`- Markdown index files: ${markdownFiles.length}`);
  console.log(`- Generated nodes: ${reportNodes.length}`);
  console.log(`- Generated edges: ${reportEdges.length}`);
  console.log(`- Search entries: ${reportSearchEntries.length}`);
  console.log(`- Textbook TOC entries: ${reportTocEntryCount}`);
  console.log(`- Textbook TOC sections: ${reportTocSectionCount}`);
  if (reportWroteGraph) {
    console.log(`- Wrote graph manifest: ${OUTPUT_PATH}`);
  }
  if (reportWroteToc) {
    console.log(`- Wrote textbook TOC: ${TEXTBOOK_TOC_PATH}`);
  }
  if (reportWroteTocMarkdown) {
    console.log(`- Wrote textbook TOC markdown: ${TEXTBOOK_TOC_MARKDOWN_PATH}`);
  }

  if (reportGraphDrift && !(reportMode === "write" && reportWroteGraph)) {
    console.log(`- Drift detected: ${OUTPUT_PATH} is out of date`);
  }
  if (reportTocDrift && !(reportMode === "write" && reportWroteToc)) {
    console.log(`- Drift detected: ${TEXTBOOK_TOC_PATH} is out of date`);
  }
  if (reportTocMarkdownDrift && !(reportMode === "write" && reportWroteTocMarkdown)) {
    console.log(`- Drift detected: ${TEXTBOOK_TOC_MARKDOWN_PATH} is out of date`);
  }

  if (warnings.length) {
    console.log("\nwarnings:");
    warnings.forEach((warning) => console.log(`- ${warning}`));
  }

  if (errors.length) {
    console.log("\nerrors:");
    errors.forEach((error) => console.log(`- ${error}`));
  }

  console.log(`\nsummary: ${errors.length} error(s), ${warnings.length} warning(s)`);

  const failed =
    errors.length > 0 ||
    (reportStrict && warnings.length > 0) ||
    (reportMode === "check" && (reportGraphDrift || reportTocDrift || reportTocMarkdownDrift));
  if (failed) {
    process.exit(1);
  }
}
