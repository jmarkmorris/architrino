import test from "node:test";
import assert from "node:assert/strict";

import { createTextbookTocNumberingService } from "../src/services/TextbookTocNumberingService.js";

const tocFixture = {
  tocRoot: {
    id: "textbook",
    title: "Textbook",
    children: [
      {
        id: "foundations",
        title: "Foundations",
        scenePath: "content/scenes/foundations/foundations.json",
        children: [
          {
            id: "foundations__architrino",
            title: "Architrino",
            scenePath: "content/scenes/foundations/architrino.json",
            markdownPath: "content/markdown/aaa/foundations/architrino.md",
            sections: [
              {
                title: "Core Definition",
                markdownPath: "content/markdown/aaa/foundations/architrino.md",
                markdownSection: "Core Definition",
                sectionKey: "core definition",
              },
            ],
          },
        ],
      },
      {
        id: "dynamics",
        title: "Dynamics",
        scenePath: "content/scenes/dynamics/dynamics.json",
      },
    ],
  },
};

function createService() {
  return createTextbookTocNumberingService({
    fetchImpl: async () => ({
      ok: true,
      json: async () => tocFixture,
    }),
    appendCacheBust: (path) => path,
    logger: null,
  });
}

test("textbook TOC numbering resolves markdown-backed scene nodes", async () => {
  const service = createService();

  assert.equal(
    await service.resolveNodeChapterLabel({
      childScene: "content/scenes/foundations/foundations.json",
    }),
    null
  );
  assert.equal(
    await service.resolveNodeChapterLabel({
      childScene: "content/scenes/foundations/architrino.json",
    }),
    "Ch 1.1"
  );
  assert.equal(
    await service.resolveNodeChapterLabel({
      markdownPath: "content/markdown/aaa/foundations/architrino.md",
    }),
    "Ch 1.1"
  );
  assert.equal(
    await service.resolveNodeChapterLabel({
      childScene: "content/scenes/dynamics/dynamics.json",
    }),
    null
  );
});

test("textbook TOC numbering skips orphan node IDs without a markdown target", async () => {
  const service = createService();

  assert.equal(
    await service.resolveNodeChapterLabel({
      id: "foundations__architrino",
    }),
    null
  );
});

test("textbook TOC numbering resolves markdown section nodes", async () => {
  const service = createService();

  assert.equal(
    await service.resolveNodeChapterLabel({
      markdownPath: "content/markdown/aaa/foundations/architrino.md",
      markdownSection: "Core Definition",
    }),
    "Ch 1.1.1"
  );
});
