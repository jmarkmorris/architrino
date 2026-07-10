import test from "node:test";
import assert from "node:assert/strict";

import {
  estimateLabelLineCount,
  resolveNodeLabelText,
  resolveSharedLabelTypography,
  resolveWrappedLabelFit,
} from "../src/runtime/SceneLabelSizingRuntime.js";
import {
  resolveCenterContextChapterLabel,
  shouldAllowCenterContext,
} from "../src/runtime/SceneCenterContextRuntime.js";
import {
  enforceSharedSceneSphereRadius,
  resolveSharedSceneSphereRadius,
} from "../src/runtime/SceneSphereSizingRuntime.js";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const philosophyHistoryLabels = [
  { labelTitle: "Overview", labelBadge: "doc", textbookChapterLabel: "Ch 11.1" },
  { labelTitle: "Philosophy of Science", textbookChapterLabel: "Ch 11.2" },
  { labelTitle: "Crisis in Physics", textbookChapterLabel: "Ch 11.3" },
  { labelTitle: "Unknowns and Paradoxes", textbookChapterLabel: "Ch 11.4" },
  { labelTitle: "Inherited Theory Interface", textbookChapterLabel: "Ch 11.5" },
  {
    labelTitle: "Geometry and Ontology",
    labelBadge: "doc",
    textbookChapterLabel: "Ch 11.6",
  },
  {
    labelTitle: "Substance / Structure",
    labelBadge: "doc",
    textbookChapterLabel: "Ch 11.7",
  },
  {
    labelTitle: "Historical Context and Missed Opportunities",
    textbookChapterLabel: "Ch 11.8",
  },
  { labelTitle: "Major Thinkers", textbookChapterLabel: "Ch 11.9" },
  { labelTitle: "Religious Ontologies", textbookChapterLabel: "Ch 11.10" },
  { labelTitle: "Information / Computation", textbookChapterLabel: "Ch 11.11" },
  {
    labelTitle: "Agency and Internal Causation",
    labelBadge: "doc",
    textbookChapterLabel: "Ch 11.12",
  },
  {
    labelTitle: "Perspectives",
    labelBadge: "scene",
    textbookChapterLabel: "Ch 11.13",
  },
];

const homeSceneLabels = [
  { labelTitle: "Foundations", textbookChapterLabel: "Ch 1" },
  { labelTitle: "Dynamics", textbookChapterLabel: "Ch 2" },
  { labelTitle: "Noether Braid", textbookChapterLabel: "Ch 3" },
  { labelTitle: "Noether Sea and Effective Spacetime", textbookChapterLabel: "Ch 4" },
  { labelTitle: "Standard Model Assemblies", textbookChapterLabel: "Ch 5" },
  { labelTitle: "Atomic and Nuclear Assemblies", textbookChapterLabel: "Ch 6" },
  { labelTitle: "Reactions", textbookChapterLabel: "Ch 7" },
  { labelTitle: "Quantum", textbookChapterLabel: "Ch 8" },
  { labelTitle: "Cosmology", textbookChapterLabel: "Ch 9" },
  { labelTitle: "Validation", textbookChapterLabel: "Ch 10" },
  { labelTitle: "Philosophy-History", textbookChapterLabel: "Ch 11" },
  { labelTitle: "Outreach" },
];

test("chapter-index scene labels use a shared sphere-scaled title cap", () => {
  const fits = philosophyHistoryLabels.map((nodeData) =>
    resolveWrappedLabelFit({
      nodeData,
      diameter: 198.7,
      maxWidth: 159,
      clamp,
    })
  );
  const typography = resolveSharedLabelTypography(fits, { clamp });

  assert.ok(typography);
  assert.ok(
    typography.titleSize <= 19.25,
    `expected shared title size to stay within the chapter-label cap, got ${typography.titleSize}`
  );
  assert.ok(
    typography.titleSize >= 15.5,
    `expected chapter labels to remain readable, got ${typography.titleSize}`
  );
});

test("home scene labels share one larger title size and allow three-line titles", () => {
  const fits = homeSceneLabels.map((nodeData) =>
    resolveWrappedLabelFit({
      nodeData,
      diameter: 211.3,
      maxWidth: 169,
      clamp,
    })
  );
  const typography = resolveSharedLabelTypography(fits, { clamp });

  assert.ok(typography);
  assert.ok(
    typography.titleSize > 15.5,
    `expected home scene shared title size to exceed the old cap, got ${typography.titleSize}`
  );

  const lineCounts = fits.map((fit) =>
    estimateLabelLineCount(fit.labelName, typography.titleSize, fit.maxWidth, {
      fontWeight: typography.titleWeight,
    })
  );
  assert.equal(Math.max(...lineCounts), 3);
});

test("ordinary wrapped scene labels can still use the larger visual cap", () => {
  const fit = resolveWrappedLabelFit({
    nodeData: { labelTitle: "Noether Sea and Effective Spacetime" },
    diameter: 211.3,
    maxWidth: 169,
    clamp,
  });

  assert.ok(fit.titleSize > 15.5);
});

test("explicit inline-TeX labels use their rendered text for sizing", () => {
  assert.deepEqual(
    resolveNodeLabelText({ labelTitle: "$\\mathbb{A}\\mathbb{A}\\mathbb{A}$ Journey" }),
    { labelName: "𝔸𝔸𝔸 Journey", labelSubtitle: "", labelDates: "" }
  );
});

test("center context chapter label collapses child chapter markers to the parent", () => {
  const nodes = philosophyHistoryLabels.map((data) => ({ data }));

  assert.equal(resolveCenterContextChapterLabel(nodes), "Ch 11");
});

test("center context chapter label omits mixed top-level chapter markers", () => {
  const nodes = homeSceneLabels.map((data) => ({ data }));

  assert.equal(resolveCenterContextChapterLabel(nodes), "");
});

test("center context honors explicit ring opt-out only", () => {
  assert.equal(shouldAllowCenterContext({ layoutConfig: null }), true);
  assert.equal(
    shouldAllowCenterContext({ layoutConfig: { centerNode: null } }),
    true
  );
  assert.equal(
    shouldAllowCenterContext({ layoutConfig: { centerMode: "none" } }),
    false
  );
});

test("scene sphere sizing resolves one shared visible sphere radius", () => {
  const nodes = [
    { id: "small", radius: 0.8 },
    { id: "middle", radius: 1.2 },
    { id: "large", radius: 2.4 },
    { id: "legend", category: "legend", radius: 99 },
    { id: "hidden", hideSphere: true, radius: 42 },
  ];

  assert.equal(resolveSharedSceneSphereRadius(nodes), 1.2);
  assert.equal(enforceSharedSceneSphereRadius(nodes), 1.2);
  assert.deepEqual(
    nodes.map((node) => node.radius),
    [1.2, 1.2, 1.2, 99, 42]
  );
});
