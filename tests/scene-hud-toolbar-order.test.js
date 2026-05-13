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
