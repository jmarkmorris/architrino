import test from "node:test";
import assert from "node:assert/strict";

import {
  createMarkdownNodeBuilder,
  resolveAutoMarkdownGridColumns,
} from "../src/services/MarkdownNodeBuilder.js";
import {
  extractMarkdownSection,
  normalizeMarkdownKey,
  parseMarkdownHeading,
} from "../src/services/MarkdownPolicyService.js";
import {
  compactMarkdownNodeLabel,
  extractMarkdownDocumentTitle,
  stripWalkthroughStepPrefix,
  titleFromSlug,
} from "../src/services/MarkdownNamingService.js";

function createBuilder(markdownByPath) {
  return createMarkdownNodeBuilder({
    fetchImpl: async (path) => ({
      ok: Object.hasOwn(markdownByPath, path),
      text: async () => markdownByPath[path] ?? "",
    }),
    appendCacheBust: (path) => path,
    parseMarkdownHeading,
    extractMarkdownSection,
    normalizeMarkdownKey,
    normalizeMarkdownPath: (path) => String(path ?? "").replace(/\\/g, "/").toLowerCase(),
    titleFromSlug,
    stripWalkthroughStepPrefix,
    extractMarkdownDocumentTitle,
    compactMarkdownNodeLabel,
    colorTokens: {},
    autoMarkdownPalettes: {},
    defaultAutoMarkdownPalette: ["#345678"],
    computeRingLayout: () => null,
    maxRingNodeRadius: () => Infinity,
    logger: { warn() {} },
  });
}

function uniqueCoordinateCount(nodes, axisIndex) {
  return new Set(nodes.map((node) => node.position[axisIndex])).size;
}

test("markdown grid autolayout gives 13 split headings five columns", async () => {
  const markdown = Array.from({ length: 13 }, (_, index) => {
    const day = String(index + 1).padStart(2, "0");
    return `## 2026-06-${day}: Entry ${index + 1}`;
  }).join("\n\nBody\n\n");
  const builder = createBuilder({
    "content/markdown/example.md": markdown,
  });

  const nodes = await builder(
    {
      layoutType: "grid",
      splitSourcePath: "content/markdown/example.md",
      splitHeadingLevel: 2,
      splitMaxDepth: 1,
      wrapLabels: true,
    },
    []
  );

  assert.equal(nodes.length, 13);
  assert.equal(resolveAutoMarkdownGridColumns(nodes.length), 5);
  assert.equal(uniqueCoordinateCount(nodes, 0), 5);
  assert.equal(uniqueCoordinateCount(nodes, 1), 3);
});

test("markdown grid gap multiplier scales the open grid gap", async () => {
  const markdown = Array.from({ length: 13 }, (_, index) => {
    const day = String(index + 1).padStart(2, "0");
    return `## 2026-06-${day}: Entry ${index + 1}`;
  }).join("\n\nBody\n\n");
  const builder = createBuilder({
    "content/markdown/example.md": markdown,
  });
  const baseScene = {
    layoutType: "grid",
    splitSourcePath: "content/markdown/example.md",
    splitHeadingLevel: 2,
    splitMaxDepth: 1,
    wrapLabels: true,
  };

  const defaultNodes = await builder(baseScene, []);
  const expandedNodes = await builder(
    {
      ...baseScene,
      splitGridGapMultiplier: 2,
    },
    []
  );

  const defaultPitch = defaultNodes[1].position[0] - defaultNodes[0].position[0];
  const expandedPitch = expandedNodes[1].position[0] - expandedNodes[0].position[0];
  const diameter = defaultNodes[0].radius * 2;
  const defaultGap = defaultPitch - diameter;
  const expandedGap = expandedPitch - diameter;

  assert.ok(defaultGap > 0);
  assert.ok(Math.abs(expandedGap / defaultGap - 2) < 0.04);
});

test("markdown split node radius controls generated sphere radius", async () => {
  const markdown = "## Section One\n\nBody";
  const builder = createBuilder({
    "content/markdown/example.md": markdown,
  });

  const [node] = await builder(
    {
      layoutType: "grid",
      splitSourcePath: "content/markdown/example.md",
      splitHeadingLevel: 2,
      splitMaxDepth: 1,
      splitNodeRadius: 1.76,
    },
    []
  );

  assert.equal(node.radius, 1.76);
});

test("markdown split nodes derive title and date labels from dated headings", async () => {
  const builder = createBuilder({
    "content/markdown/example.md": "## 2026-06-10: Ideal Noether Braid Lorentz Geometry\n\nBody",
  });

  const [node] = await builder(
    {
      layoutType: "grid",
      splitSourcePath: "content/markdown/example.md",
      splitHeadingLevel: 2,
      splitMaxDepth: 1,
      wrapLabels: true,
    },
    []
  );

  assert.equal(node.labelTitle, "Ideal Noether Braid Lorentz Geometry");
  assert.equal(node.labelSubtitle, "2026-06-10");
  assert.equal(node.shortName, "Ideal Noether Braid Lorentz…");
});

test("explicit markdown layoutColumns still override grid autolayout", async () => {
  const markdown = Array.from(
    { length: 13 },
    (_, index) => `## Section ${index + 1}`
  ).join("\n\n");
  const builder = createBuilder({
    "content/markdown/example.md": markdown,
  });

  const nodes = await builder(
    {
      layoutType: "grid",
      layoutColumns: 3,
      splitSourcePath: "content/markdown/example.md",
      splitHeadingLevel: 2,
      splitMaxDepth: 1,
    },
    []
  );

  assert.equal(nodes.length, 13);
  assert.equal(uniqueCoordinateCount(nodes, 0), 3);
});
