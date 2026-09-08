import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { getStandaloneAppPathForScene } from "../src/apps/navigator/StandaloneAppLaunchRuntime.js";
import { bootBorgApp } from "../src/apps/borg/BorgBootstrap.js";
import { BORG_ASSEMBLY_RECORD_CATALOG } from "../src/apps/borg/BorgAssemblyRecordCatalog.js";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("Borg launches into visual assembly discovery", () => {
  assert.equal(getStandaloneAppPathForScene("borg"), "borg-library.html");
  assert.equal(getStandaloneAppPathForScene("content/scenes/archie/borg.json"), "borg-library.html");
  assert.match(read("reference/priorities/app-borg/contracts/requirements-and-design.md"), /Borg Library is the discoverable product entry/);
});

test("Borg discovery keeps random simulation separate from exact assemblies", () => {
  const html = read("borg-library.html");
  assert.match(html, /<h1>Borg Library<\/h1>/);
  assert.match(html, /src\/runtime\/top-dynamic-control-bar\.css/);
  assert.match(html, /<div id="scene-hud-tools" class="borg-library-navigation"><\/div>/);
  assert.match(html, /id="borg-workbench-entry"[^>]*>Start new simulation in Borg Workbench/);
  assert.match(html, /id="filter-drawer-toggle"[^>]*type="checkbox"/);
  assert.match(html, /id="open-record"[^>]*>Open in Borg Workbench/);
});

test("Borg discovery collapses the filter rail at narrow widths", () => {
  const css = read("src/apps/borg/library/library.css");
  assert.match(css, /@media \(max-width: 700px\)[^{]*\{[^}]*\.library-header/s);
  assert.match(css, /\.filter-drawer-checkbox:not\(:checked\) ~ \.filters \{ display: none; \}/);
});

test("Borg workbench leaves assembly selection on the discovery home", () => {
  const html = read("borg.html");
  assert.match(html, /id="borg-starting-geometry"[^>]*hidden/);
  assert.match(html, /id="borg-record-summary"[^>]*hidden/);
  assert.match(html, />EXACT RECORD<\/p>/);
  assert.match(html, /id="borg-mode-label"/);
  assert.match(html, /id="borg-assembly-view-controls"/);
  assert.match(html, /<h1>Borg Workbench<\/h1>/);
  assert.match(html, /id="borg-library-link"[^>]*>Back to Borg Library<\/a>/);
});

test("legacy Assembly Explorer remains a non-indexed state-preserving redirect", () => {
  const html = read("assembly-explorer.html");
  assert.match(html, /<meta name="robots" content="noindex">/);
  assert.match(html, /<link rel="canonical" href="\.\/borg-library\.html">/);
  assert.match(html, /target\.search = window\.location\.search/);
  assert.match(html, /target\.hash = window\.location\.hash/);
  assert.match(html, />Assembly Explorer moved to Borg Library</);
});

test("Borg workbench receives the selected home-page record summary", async () => {
  const entry = BORG_ASSEMBLY_RECORD_CATALOG.entries[0];
  const record = JSON.parse(read(entry.recordUrl));
  let mounted;
  await bootBorgApp({
    search: `?${new URLSearchParams({ assemblyId: entry.assemblyId, modelRevisionSha256: entry.modelRevisionSha256 })}`,
    fetchLike: async () => ({ ok: true, async json() { return record; } }),
    mountApp(options) { mounted = options; },
  });
  assert.equal(mounted.eomRecordReplay.librarySummary.assemblyId, entry.assemblyId);
  assert.equal(mounted.eomRecordReplay.librarySummary.modelRevisionSha256, entry.modelRevisionSha256);
  const runtime = read("src/apps/borg/BorgAppRuntime.js");
  assert.match(runtime, /function renderRecordSummary\(\)/);
  assert.match(runtime, /supplied\?\.assemblyId === rawRecord\.assemblyId/);
  assert.match(runtime, /Recorded description:/);
});
