#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCENES_INDEX_PATH = "content/scenes/scenes_index.json";
const MARKDOWN_INDEX_PATH = "content/markdown/markdown_index.json";
const PERIODIC_TABLE_PATH = "content/scenes/chemistry/periodic_table.json";
const LEGEND_ROUTES_PATH = "content/graph/runtime_routes.json";
const OUTPUT_PATH = "content/graph/scene_graph.json";

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
  console.log("  --check   Validate generated graph against content/graph/scene_graph.json (default)");
  console.log("  --write   Regenerate content/graph/scene_graph.json");
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

function sceneNodeId(scenePath) {
  return `scene:${scenePath}`;
}

function markdownDocNodeId(markdownPath) {
  return `markdown_doc:${markdownPath}`;
}

function resolveAuthoredMarkdownPath(entry) {
  if (entry?.source?.type === "markdown" && typeof entry?.source?.path === "string") {
    return entry.source.path;
  }
  return null;
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
    wrote: false,
    drift: false,
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
});

const markdownFiles = [];
const markdownFileSet = new Set();
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
  if (markdownFileSet.has(markdownPath)) {
    return;
  }
  markdownFileSet.add(markdownPath);
  markdownFiles.push(markdownPath);
});

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
for (const markdownPath of markdownFiles) {
  const markdownRaw = readText(markdownPath);
  if (!markdownRaw.ok) {
    warnings.push(`${markdownPath}: failed to read markdown file (${markdownRaw.error.message})`);
    continue;
  }
  const title = extractMarkdownDocumentTitle(markdownRaw.data);
  if (title) {
    markdownTitleByPath.set(markdownPath, title);
  }
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
      implicit: !markdownFileSet.has(normalizedPath),
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
  if (!markdownFileSet.has(normalizedMarkdownPath)) {
    warnings.push(
      `${scenePath} -> ${field}: markdown file is not indexed (${normalizedMarkdownPath})`
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
      const childTarget =
        typeof childRef?.scenePath === "string"
          ? childRef.scenePath
          : typeof childRef?.sceneId === "string"
            ? childRef.sceneId
            : null;
      if (!childTarget) {
        return;
      }
      const normalizedSubScenePath = normalizePath(childTarget);
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

const searchEntries = rawSearchEntries;

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

const serializedManifest = `${JSON.stringify(manifest, null, 2)}\n`;
const outputAbsolutePath = path.join(rootDir, OUTPUT_PATH);
const currentManifestRaw = fs.existsSync(outputAbsolutePath)
  ? fs.readFileSync(outputAbsolutePath, "utf8")
  : null;
const drift = currentManifestRaw !== serializedManifest;

let wrote = false;
if (mode === "write" && drift) {
  fs.mkdirSync(path.dirname(outputAbsolutePath), { recursive: true });
  fs.writeFileSync(outputAbsolutePath, serializedManifest, "utf8");
  wrote = true;
}

printReportAndExit({
  mode,
  strict,
  nodes,
  edges,
  searchEntries,
  wrote,
  drift,
});

function printReportAndExit({
  mode: reportMode,
  strict: reportStrict,
  nodes: reportNodes,
  edges: reportEdges,
  searchEntries: reportSearchEntries,
  wrote: reportWrote,
  drift: reportDrift,
}) {
  console.log(`build-scene-graph mode: ${reportMode}${reportStrict ? " (strict)" : ""}`);
  console.log(`- Scene index entries: ${sceneEntries.length}`);
  console.log(`- Markdown index files: ${markdownFiles.length}`);
  console.log(`- Generated nodes: ${reportNodes.length}`);
  console.log(`- Generated edges: ${reportEdges.length}`);
  console.log(`- Search entries: ${reportSearchEntries.length}`);
  if (reportWrote) {
    console.log(`- Wrote graph manifest: ${OUTPUT_PATH}`);
  }

  if (reportDrift && !(reportMode === "write" && reportWrote)) {
    console.log(`- Drift detected: ${OUTPUT_PATH} is out of date`);
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
    (reportMode === "check" && reportDrift);
  if (failed) {
    process.exit(1);
  }
}
