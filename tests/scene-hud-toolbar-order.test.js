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

test("standalone TOC lozenges retain the Home TOC typography", () => {
  const homeCss = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  const sharedNavigationCss = readFileSync(
    new URL("../src/apps/navigator/standalone-app-navigation.css", import.meta.url),
    "utf8",
  );

  const homeRule =
    homeCss.match(/#textbook-toc-button\s*\{(?<body>[^}]*)\}/u)?.groups?.body ?? "";

  const tocRule =
    sharedNavigationCss.match(
      /\.standalone-app-toc-button\s*\{(?<body>[^}]*)\}/u,
    )?.groups?.body ?? "";
  for (const rule of [homeRule, tocRule]) {
    assert.match(rule, /font:\s*inherit/u);
    assert.match(rule, /font-size:\s*12px/u);
    assert.match(rule, /font-weight:\s*700/u);
    assert.match(rule, /line-height:\s*1/u);
  }
});
