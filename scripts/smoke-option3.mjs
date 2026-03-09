#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const SCENE_GRAPH_PATH = "content/graph/scene_graph.json";
// scenes_index is used here only for integrity cross-checks, not runtime routing/search.
const SCENES_INDEX_PATH = "content/scenes/scenes_index.json";
const PERIODIC_TABLE_PATH = "content/scenes/chemistry/periodic_table.json";

const errors = [];
const warnings = [];

function normalizePath(value) {
  return String(value).replace(/\\/g, "/").replace(/^\.?\//, "").replace(/\/+$/, "");
}

function readJson(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  try {
    const raw = fs.readFileSync(absolutePath, "utf8");
    return { ok: true, data: JSON.parse(raw) };
  } catch (error) {
    return { ok: false, error };
  }
}

function asStringArray(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
}

const sceneGraphResult = readJson(SCENE_GRAPH_PATH);
if (!sceneGraphResult.ok) {
  errors.push(`${SCENE_GRAPH_PATH}: failed to read/parse JSON (${sceneGraphResult.error.message})`);
}

const scenesIndexResult = readJson(SCENES_INDEX_PATH);
if (!scenesIndexResult.ok) {
  errors.push(`${SCENES_INDEX_PATH}: failed to read/parse JSON (${scenesIndexResult.error.message})`);
}

const periodicTableResult = readJson(PERIODIC_TABLE_PATH);
if (!periodicTableResult.ok) {
  errors.push(`${PERIODIC_TABLE_PATH}: failed to read/parse JSON (${periodicTableResult.error.message})`);
}

if (errors.length) {
  printReportAndExit({
    sceneCount: 0,
    periodicSymbolCount: 0,
    periodicRouteCount: 0,
    legendTargetCount: 0,
    searchEntryCount: 0,
  });
}

const sceneGraph = sceneGraphResult.data;
const sceneIndex = scenesIndexResult.data;
const periodicTable = periodicTableResult.data;

const scenePaths = new Set(
  (Array.isArray(sceneIndex?.scenes) ? sceneIndex.scenes : [])
    .map((entry) => normalizePath(entry?.path))
    .filter(Boolean)
);

const periodicSymbols = Array.from(
  new Set(
    (Array.isArray(periodicTable?.elements) ? periodicTable.elements : [])
      .map((element) => String(element?.symbol ?? "").trim().toLowerCase())
      .filter(Boolean)
  )
).sort((a, b) => a.localeCompare(b));

const runtimeRoutes =
  sceneGraph?.runtimeRoutes && typeof sceneGraph.runtimeRoutes === "object"
    ? sceneGraph.runtimeRoutes
    : {};
const periodicRoutes =
  runtimeRoutes.periodicGrid && typeof runtimeRoutes.periodicGrid === "object"
    ? runtimeRoutes.periodicGrid
    : {};
const legendTargets = asStringArray(runtimeRoutes.elementLegendTargets).map((target) =>
  normalizePath(target)
);
const searchEntries = Array.isArray(sceneGraph?.searchEntries) ? sceneGraph.searchEntries : [];

for (const symbol of periodicSymbols) {
  if (!(symbol in periodicRoutes)) {
    errors.push(`runtimeRoutes.periodicGrid: missing route for symbol "${symbol}"`);
    continue;
  }
  const target = normalizePath(periodicRoutes[symbol]);
  if (!target) {
    errors.push(`runtimeRoutes.periodicGrid.${symbol}: empty target`);
    continue;
  }
  if (!scenePaths.has(target)) {
    errors.push(`runtimeRoutes.periodicGrid.${symbol}: target scene missing in index (${target})`);
  }
}

for (const symbol of Object.keys(periodicRoutes)) {
  if (!periodicSymbols.includes(symbol)) {
    warnings.push(`runtimeRoutes.periodicGrid: extra symbol "${symbol}" not in periodic table data`);
  }
}

legendTargets.forEach((target, index) => {
  if (!scenePaths.has(target)) {
    errors.push(`runtimeRoutes.elementLegendTargets[${index}]: missing scene in index (${target})`);
  }
});

const searchNodeTypes = new Set();
searchEntries.forEach((entry, index) => {
  if (!entry || typeof entry !== "object") {
    errors.push(`searchEntries[${index}]: expected object`);
    return;
  }
  const entryPath = String(entry.path ?? "").trim();
  const entryName = String(entry.name ?? "").trim();
  const nodeType = String(entry.nodeType ?? "").trim();
  if (!entryPath) {
    errors.push(`searchEntries[${index}]: missing path`);
  }
  if (!entryName) {
    errors.push(`searchEntries[${index}]: missing name`);
  }
  if (!nodeType) {
    warnings.push(`searchEntries[${index}]: missing nodeType`);
  } else {
    searchNodeTypes.add(nodeType);
  }
});

if (!searchNodeTypes.has("markdown_doc")) {
  errors.push('searchEntries: missing "markdown_doc" entries');
}
if (!searchNodeTypes.has("scene")) {
  errors.push('searchEntries: missing "scene" entries');
}

printReportAndExit({
  sceneCount: scenePaths.size,
  periodicSymbolCount: periodicSymbols.length,
  periodicRouteCount: Object.keys(periodicRoutes).length,
  legendTargetCount: legendTargets.length,
  searchEntryCount: searchEntries.length,
});

function printReportAndExit({
  sceneCount,
  periodicSymbolCount,
  periodicRouteCount,
  legendTargetCount,
  searchEntryCount,
}) {
  console.log("smoke-option3");
  console.log(`- Scene index entries: ${sceneCount}`);
  console.log(`- Periodic symbols: ${periodicSymbolCount}`);
  console.log(`- Periodic runtime routes: ${periodicRouteCount}`);
  console.log(`- Element legend targets: ${legendTargetCount}`);
  console.log(`- Search entries: ${searchEntryCount}`);

  if (warnings.length) {
    console.log("\nwarnings:");
    warnings.forEach((warning) => console.log(`- ${warning}`));
  }
  if (errors.length) {
    console.log("\nerrors:");
    errors.forEach((error) => console.log(`- ${error}`));
  }

  console.log(`\nsummary: ${errors.length} error(s), ${warnings.length} warning(s)`);
  if (errors.length) {
    process.exit(1);
  }
}
