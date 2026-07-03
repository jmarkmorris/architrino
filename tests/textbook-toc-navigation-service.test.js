import test from "node:test";
import assert from "node:assert/strict";

import {
  RUNTIME_MARKDOWN_DOC_PREFIX,
  buildTextbookTocPageSequence,
  createTextbookTocNavigationService,
  resolveTextbookPageNavigation,
} from "../src/services/TextbookTocNavigationService.js";

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
            id: "foundations__ontology",
            title: "Ontology",
            kind: "markdown-view",
            scenePath: "content/scenes/foundations/ontology.json",
            markdownPath: "content/markdown/aaa/foundations/ontology.md",
            sections: [
              {
                title: "Purpose",
                markdownPath: "content/markdown/aaa/foundations/ontology.md",
              },
            ],
          },
          {
            id: "foundations__architrino",
            title: "Architrino",
            kind: "markdown-split",
            scenePath: "content/scenes/foundations/architrino.json",
            markdownPath: "content/markdown/aaa/foundations/architrino.md",
          },
        ],
      },
      {
        id: "dynamics",
        title: "Dynamics",
        scenePath: "content/scenes/dynamics/dynamics.json",
      },
      {
        id: "validation__protocols",
        title: "Validation Protocols",
        kind: "markdown-view",
        markdownPath: "content/markdown/aaa/validation/validation-protocols.md",
      },
    ],
  },
};

test("textbook TOC page sequence flattens markdown documents in book order", () => {
  const sequence = buildTextbookTocPageSequence(tocFixture.tocRoot);

  assert.deepEqual(
    sequence.pages.map((page) => page.title),
    ["Ontology", "Architrino", "Validation Protocols"]
  );
  assert.deepEqual(
    sequence.pages.map((page) => page.markdownPath),
    [
      "content/markdown/aaa/foundations/ontology.md",
      "content/markdown/aaa/foundations/architrino.md",
      "content/markdown/aaa/validation/validation-protocols.md",
    ]
  );
});

test("textbook TOC page navigation resolves previous and next by markdown path", () => {
  const sequence = buildTextbookTocPageSequence(tocFixture.tocRoot);
  const navigation = resolveTextbookPageNavigation(sequence, {
    id: "runtime:markdown:reader:content/markdown/aaa/foundations/architrino.md::Core",
    markdownPath: "content/markdown/aaa/foundations/architrino.md",
    markdownSection: "Core",
  });

  assert.equal(navigation.current.title, "Architrino");
  assert.equal(navigation.previous.title, "Ontology");
  assert.equal(navigation.next.title, "Validation Protocols");
  assert.equal(navigation.index, 1);
  assert.equal(navigation.total, 3);
});

test("textbook TOC page navigation resolves current page by scene path", () => {
  const sequence = buildTextbookTocPageSequence(tocFixture.tocRoot);
  const navigation = resolveTextbookPageNavigation(sequence, {
    id: "content/scenes/foundations/ontology.json",
  });

  assert.equal(navigation.current.title, "Ontology");
  assert.equal(navigation.previous, null);
  assert.equal(navigation.next.title, "Architrino");
});

test("textbook TOC page navigation resolves current page by TOC id", () => {
  const sequence = buildTextbookTocPageSequence(tocFixture.tocRoot);
  const navigation = resolveTextbookPageNavigation(sequence, {
    id: "foundations__ontology",
  });

  assert.equal(navigation.current.title, "Ontology");
  assert.equal(navigation.previous, null);
  assert.equal(navigation.next.title, "Architrino");
});

test("textbook TOC page entries prefer authored scenes and fall back to runtime markdown", () => {
  const sequence = buildTextbookTocPageSequence(tocFixture.tocRoot);

  assert.equal(
    sequence.pages[0].targetPath,
    "content/scenes/foundations/ontology.json"
  );
  assert.equal(
    sequence.pages[1].targetPath,
    "content/scenes/foundations/architrino.json"
  );
  assert.equal(
    sequence.pages[2].targetPath,
    `${RUNTIME_MARKDOWN_DOC_PREFIX}content/markdown/aaa/validation/validation-protocols.md`
  );
});

test("textbook TOC navigation service loads page navigation once", async () => {
  let fetchCount = 0;
  const service = createTextbookTocNavigationService({
    fetchImpl: async () => {
      fetchCount += 1;
      return {
        ok: true,
        json: async () => tocFixture,
      };
    },
    appendCacheBust: (path) => path,
    logger: null,
  });

  const first = await service.resolvePageNavigation({
    markdownPath: "content/markdown/aaa/foundations/ontology.md",
  });
  const second = await service.resolvePageNavigation({
    markdownPath: "content/markdown/aaa/foundations/architrino.md",
  });

  assert.equal(first.current.title, "Ontology");
  assert.equal(second.current.title, "Architrino");
  assert.equal(fetchCount, 1);
});
