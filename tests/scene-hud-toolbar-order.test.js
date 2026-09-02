import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("main and Animator mount one generated bar while reading controls stay panel-local", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const animatorHtml = readFileSync(new URL("../animator.html", import.meta.url), "utf8");
  const runtimeSource = readFileSync(
    new URL("../src/apps/architrino/ArchitrinoSceneAppRuntime.js", import.meta.url),
    "utf8",
  );

  const sceneHudToolsIndex = html.indexOf('id="scene-hud-tools"');
  const markdownDocButtonIndex = html.indexOf('id="markdown-doc-button"');
  const markdownPdfButtonIndex = html.indexOf('id="markdown-pdf-button"');
  const markdownLayoutToggleIndex = html.indexOf('id="markdown-layout-toggle"');
  const markdownCloseIndex = html.indexOf('id="markdown-close"');
  const markdownPanelIndex = html.indexOf('id="markdown-panel"');

  assert.ok(sceneHudToolsIndex > -1);
  assert.ok(markdownDocButtonIndex > -1);
  assert.ok(markdownPdfButtonIndex > -1);
  assert.ok(markdownLayoutToggleIndex > -1);
  assert.ok(markdownCloseIndex > -1);
  assert.ok(markdownPanelIndex > -1);
  assert.match(html, /<div id="scene-hud-tools"><\/div>/u);
  assert.match(animatorHtml, /<div id="scene-hud-tools"><\/div>/u);
  assert.match(html, /src\/runtime\/top-dynamic-control-bar\.css/u);
  assert.match(animatorHtml, /src\/runtime\/top-dynamic-control-bar\.css/u);
  assert.match(html, /id="animator-top-dynamic-control-bar-mount"/u);
  assert.match(animatorHtml, /id="animator-top-dynamic-control-bar-mount"/u);
  for (const staticHtml of [html, animatorHtml]) {
    assert.doesNotMatch(staticHtml, /id="(?:textbook-toc-button|scene-nav-history|nav-up|nav-forward|home-button|scene-search-toggle)"/u);
  }

  const actionBlock = runtimeSource.match(
    /const topDynamicControlBarRuntime = createTopDynamicControlBar\(\{[\s\S]*?document: globalThis\.document/u,
  )?.[0] ?? "";
  const actionIndexes = ["toc", "back", "forward", "home", "search"].map((kind) =>
    actionBlock.indexOf(`kind: "${kind}"`),
  );
  assert.ok(actionIndexes.every((index) => index > -1));
  assert.deepEqual(actionIndexes, [...actionIndexes].sort((a, b) => a - b));

  assert.ok(sceneHudToolsIndex < markdownPanelIndex);
  assert.ok(markdownPanelIndex < markdownDocButtonIndex);
  assert.ok(markdownDocButtonIndex < markdownLayoutToggleIndex);
  assert.ok(markdownLayoutToggleIndex < markdownPdfButtonIndex);
  assert.ok(markdownPdfButtonIndex < markdownCloseIndex);
});

test("main scene shell uses the favored brand purple as its first-paint background", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const css = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  const tokens = readFileSync(new URL("../ui-tokens.css", import.meta.url), "utf8");

  assert.match(html, /<html lang="en" style="background:#6A0DAD;color:#f5f7ff;">/u);
  assert.match(html, /<meta name="theme-color" content="#6A0DAD" \/>/u);
  assert.match(tokens, /--ui-brand-purple: #6a0dad;/u);
  assert.match(css, /--scene-background-base: var\(--ui-brand-purple\);/u);
  assert.match(css, /--scene-background: var\(--ui-brand-purple\);/u);
});

test("canonical TOC lozenge retains its typography after the legacy stylesheet is removed", () => {
  const sharedCss = readFileSync(
    new URL("../src/runtime/top-dynamic-control-bar.css", import.meta.url),
    "utf8",
  );
  const canonicalRule =
    sharedCss.match(/\.top-dynamic-control-bar-action\.is-toc\s*\{(?<body>[^}]*)\}/u)?.groups?.body ?? "";

  assert.match(canonicalRule, /font-size:\s*12px/u);
  assert.match(canonicalRule, /font-weight:\s*700/u);
  assert.match(canonicalRule, /line-height:\s*1/u);
  assert.match(sharedCss, /\.top-dynamic-control-bar-action\s*\{[\s\S]*?box-sizing:\s*border-box/u);
  assert.match(sharedCss, /\.top-dynamic-control-bar-action\s*\{[\s\S]*?min-height:\s*32px/u);
  assert.match(sharedCss, /\.top-dynamic-control-bar-action\s*\{[\s\S]*?font:\s*inherit/u);
  assert.equal(
    existsSync(new URL("../src/apps/navigator/standalone-app-navigation.css", import.meta.url)),
    false,
  );
});
