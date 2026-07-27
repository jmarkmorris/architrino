import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("markdown toolbar controls grow left of persistent scene controls", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

  const markdownDocButtonIndex = html.indexOf('id="markdown-doc-button"');
  const markdownPdfButtonIndex = html.indexOf('id="markdown-pdf-button"');
  const markdownLayoutToggleIndex = html.indexOf('id="markdown-layout-toggle"');
  const sceneNavHistoryIndex = html.indexOf('id="scene-nav-history"');
  const navUpButtonIndex = html.indexOf('id="nav-up"');
  const navForwardButtonIndex = html.indexOf('id="nav-forward"');

  assert.ok(markdownDocButtonIndex > -1);
  assert.ok(markdownPdfButtonIndex > -1);
  assert.ok(markdownLayoutToggleIndex > -1);
  assert.ok(sceneNavHistoryIndex > -1);
  assert.ok(navUpButtonIndex > -1);
  assert.ok(navForwardButtonIndex > -1);

  assert.ok(markdownDocButtonIndex < markdownPdfButtonIndex);
  assert.ok(markdownPdfButtonIndex < markdownLayoutToggleIndex);
  assert.ok(markdownLayoutToggleIndex < sceneNavHistoryIndex);
  assert.ok(sceneNavHistoryIndex < navUpButtonIndex);
  assert.ok(navUpButtonIndex < navForwardButtonIndex);
});

test("main scene shell uses true purple as its first-paint background", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const css = readFileSync(new URL("../style.css", import.meta.url), "utf8");

  assert.match(html, /<html lang="en" style="background:#6A0DAD;color:#f5f7ff;">/u);
  assert.match(html, /<meta name="theme-color" content="#6A0DAD" \/>/u);
  assert.match(css, /--scene-background-base: #6A0DAD;/u);
  assert.match(css, /--scene-background: #6A0DAD;/u);
});

test("main and standalone TOC lozenges share the canonical label typography", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const sharedNavigationCss = readFileSync(
    new URL("../src/apps/navigator/standalone-app-navigation.css", import.meta.url),
    "utf8",
  );

  assert.match(
    html,
    /href="\.\/src\/apps\/navigator\/standalone-app-navigation\.css"/u,
  );
  assert.match(
    html,
    /id="textbook-toc-button"\s+class="standalone-app-toc-button"/u,
  );

  const tocRule =
    sharedNavigationCss.match(
      /\.standalone-app-toc-button\s*\{(?<body>[^}]*)\}/u,
    )?.groups?.body ?? "";
  assert.match(tocRule, /font-family:\s*var\(--ui-font-family\)/u);
  assert.match(tocRule, /font-size:\s*var\(--ui-label-size\)/u);
  assert.match(tocRule, /font-weight:\s*var\(--ui-label-weight\)/u);
  assert.match(tocRule, /line-height:\s*var\(--ui-label-line-height\)/u);
  assert.doesNotMatch(tocRule, /font:\s*inherit/u);
});
