import test from "node:test";
import assert from "node:assert/strict";

import {
  resolveSharedLabelTypography,
  resolveWrappedLabelFit,
} from "../src/runtime/SceneLabelSizingRuntime.js";

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

test("chapter-index scene labels use a smaller shared title cap", () => {
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
    typography.titleSize <= 15.5,
    `expected shared title size to stay within the chapter-label cap, got ${typography.titleSize}`
  );
  assert.ok(
    typography.titleSize >= 12,
    `expected chapter labels to remain readable, got ${typography.titleSize}`
  );
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
