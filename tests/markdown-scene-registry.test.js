import assert from "node:assert/strict";
import test from "node:test";

import { createMarkdownSceneRegistry } from "../src/services/MarkdownSceneRegistryService.js";

test("markdown reader scenes preserve download-only node options", () => {
  const levelConfigs = {};
  const registry = createMarkdownSceneRegistry({
    levelConfigs,
    titleFromSlug: (slug) => slug,
  });

  const sceneId = registry.ensureMarkdownDocScene({
    name: "Foundations",
    markdownPath: "content/generated/markdown/textbook/reading-copies/foundations.md",
    markdownColumns: 1,
    markdownAutoOpen: false,
    markdownDownloadOnly: true,
  });

  assert.equal(
    sceneId,
    "runtime:markdown:doc:content/generated/markdown/textbook/reading-copies/foundations.md"
  );
  assert.equal(
    levelConfigs[sceneId].markdownPath,
    "content/generated/markdown/textbook/reading-copies/foundations.md"
  );
  assert.equal(levelConfigs[sceneId].markdownColumns, 1);
  assert.equal(levelConfigs[sceneId].markdownAutoOpen, false);
  assert.equal(levelConfigs[sceneId].markdownDownloadOnly, true);
});

test("runtime markdown heading targets use readable scene names", async () => {
  const levelConfigs = {};
  const registry = createMarkdownSceneRegistry({
    levelConfigs,
    titleFromSlug: (slug) =>
      slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
  });

  const sceneId = await registry.ensureRuntimeMarkdownScene(
    "runtime:markdown:reader:content/markdown/aaa/foundations/architrino.md::the-condition-that-picks-out-a-causal-root"
  );

  assert.equal(
    levelConfigs[sceneId].sceneName,
    "The Condition That Picks Out A Causal Root"
  );
  assert.equal(
    levelConfigs[sceneId].markdownSection,
    "the-condition-that-picks-out-a-causal-root"
  );
});
