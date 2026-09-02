import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { getStandaloneAppPathForScene } from "../src/apps/navigator/StandaloneAppLaunchRuntime.js";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("Borg launches into visual assembly discovery", () => {
  assert.equal(getStandaloneAppPathForScene("borg"), "borg-library.html");
  assert.equal(getStandaloneAppPathForScene("content/scenes/archie/borg.json"), "borg-library.html");
  assert.match(read("reference/priorities/app-borg/requirements-and-design.md"), /application entry should open on the visual, property-based Assembly discovery surface/);
});

test("Borg discovery keeps random simulation separate from exact assemblies", () => {
  const html = read("borg-library.html");
  assert.match(html, /BORG ASSEMBLY DISCOVERY/);
  assert.match(html, /src\/runtime\/top-dynamic-control-bar\.css/);
  assert.match(html, /<div id="scene-hud-tools" class="borg-library-navigation"><\/div>/);
  assert.match(html, /href="\.\/borg\.html">Start random simulation/);
  assert.match(html, /id="filter-drawer-toggle"[^>]*type="checkbox"/);
  assert.match(html, /id="open-record"[^>]*>Open in workbench/);
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
  assert.match(html, /href="\.\/borg-library\.html">Browse assembly library<\/a>/);
});

test("Borg workbench receives the selected home-page record summary", () => {
  const bootstrap = read("src/apps/borg/BorgBootstrap.js");
  const runtime = read("src/apps/borg/BorgAppRuntime.js");
  assert.match(bootstrap, /librarySummary: createBorgWorkbenchRecordSummary/);
  assert.match(bootstrap, /Object\.entries\(LIBRARY_FACETS\)/);
  assert.match(runtime, /function renderRecordSummary\(\)/);
  assert.match(runtime, /supplied\?\.assemblyId === rawRecord\.assemblyId/);
  assert.match(runtime, /Recorded description:/);
});
