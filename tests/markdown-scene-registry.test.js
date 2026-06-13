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
