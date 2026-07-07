import test from "node:test";
import assert from "node:assert/strict";

import { createAppSceneChromeRuntime } from "../src/runtime/AppSceneChromeRuntime.js";

function createClassList() {
  const classes = new Set();
  return {
    classes,
    toggle(name, force) {
      if (force === undefined ? !classes.has(name) : force) {
        classes.add(name);
      } else {
        classes.delete(name);
      }
    },
    contains(name) {
      return classes.has(name);
    },
  };
}

function createFakeButton() {
  return {
    classList: createClassList(),
    disabled: false,
  };
}

test("markdown doc button shows for suppressed auto-open markdown scenes", () => {
  const markdownDocButton = createFakeButton();
  const runtime = createAppSceneChromeRuntime({ markdownDocButton });

  runtime.updateMarkdownDocButton({
    markdownPath: "content/markdown/aaa/nuclear-atomic/hyde-periodic-table.md",
    markdownAutoOpen: false,
  });

  assert.equal(markdownDocButton.classList.contains("is-hidden"), false);
  assert.equal(markdownDocButton.disabled, false);
});

test("markdown doc button stays hidden for already-open full-document scenes", () => {
  const markdownDocButton = createFakeButton();
  const runtime = createAppSceneChromeRuntime({ markdownDocButton });

  runtime.updateMarkdownDocButton({
    markdownPath: "content/markdown/aaa/nuclear-atomic/hyde-periodic-table.md",
    markdownAutoOpen: true,
  });

  assert.equal(markdownDocButton.classList.contains("is-hidden"), true);
  assert.equal(markdownDocButton.disabled, true);
});

test("markdown doc button still shows for section markdown scenes", () => {
  const markdownDocButton = createFakeButton();
  const runtime = createAppSceneChromeRuntime({ markdownDocButton });

  runtime.updateMarkdownDocButton({
    markdownPath: "content/markdown/aaa/foundations/ontology.md",
    markdownSection: "Purpose",
  });

  assert.equal(markdownDocButton.classList.contains("is-hidden"), false);
  assert.equal(markdownDocButton.disabled, false);
});
