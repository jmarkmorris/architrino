import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  CANVAS_COLORS,
  DEFAULT_EQUATION_MAP_DOCUMENT_ID,
  createSeedEquationMapDocuments,
  filterEquationMapDocuments,
  normalizeEquationMapDocument,
} from "../src/apps/equation-mapping/EquationMappingData.js";
import { createPointerLineGeometry } from "../src/apps/equation-mapping/EquationMappingRuntime.js";

function readRepoFile(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

test("equation mapping seed document carries static layer anchors and comments", () => {
  const documents = createSeedEquationMapDocuments();
  assert.equal(documents.length, 1);
  const [document] = documents;
  assert.equal(document.id, DEFAULT_EQUATION_MAP_DOCUMENT_ID);
  assert.equal(document.schema, "equation-map-document.v1");
  assert.equal(document.backgroundId, "light");
  assert.deepEqual(
    document.anchors.map((anchor) => anchor.id),
    ["laplacian", "potential", "coupling", "source"]
  );
  assert.equal(document.formulaParts.some((part) => part.anchorId === "laplacian"), true);
  assert.equal(document.overlays.length, 2);
  assert.equal(document.overlays[0].targetAnchorId, "laplacian");
  assert.equal(document.overlays[0].content.some((block) => block.type === "math"), true);
});

test("equation mapping rejects overlays that do not target a formula section", () => {
  assert.throws(
    () =>
      normalizeEquationMapDocument({
        id: "bad",
        title: "Bad",
        subject: "Classical mechanics",
        formulaTeX: "a=b",
        anchors: [{ id: "a", label: "a" }],
        formulaParts: [{ kind: "math", tex: "a", anchorId: "a" }],
        overlays: [{ id: "bad-overlay", targetAnchorId: "missing", text: "Bad target" }],
      }),
    /targets missing formula section/u
  );
});

test("equation mapping search includes subject, formula text, anchors, and overlay content", () => {
  const documents = createSeedEquationMapDocuments();
  assert.equal(filterEquationMapDocuments(documents, "weak-field").length, 1);
  assert.equal(filterEquationMapDocuments(documents, "source density").length, 1);
  assert.equal(filterEquationMapDocuments(documents, "declared source row").length, 1);
  assert.equal(filterEquationMapDocuments(documents, "not-present").length, 0);
});

test("equation mapping pointer geometry attaches comments to section line edges", () => {
  const stageRect = { left: 100, top: 50, width: 900, height: 600 };
  const targetRect = { left: 460, top: 280, right: 540, bottom: 330, width: 80, height: 50 };
  const leftComment = { left: 180, top: 210, right: 340, bottom: 330, width: 160, height: 120 };
  const rightComment = { left: 680, top: 360, right: 840, bottom: 470, width: 160, height: 110 };

  assert.deepEqual(createPointerLineGeometry(stageRect, targetRect, leftComment, "above"), {
    x1: 240,
    y1: 255,
    x2: 400,
    y2: 230,
  });
  assert.deepEqual(createPointerLineGeometry(stageRect, targetRect, rightComment, "below"), {
    x1: 580,
    y1: 310,
    x2: 400,
    y2: 280,
  });
});

test("equation mapping page loads KaTeX assets and focused runtime module", () => {
  const html = readRepoFile("equation-mapping.html");
  assert.equal(html.includes("ReaderAssets/katex/katex.min.css"), true);
  assert.equal(html.includes("ReaderAssets/katex/katex.min.js"), true);
  assert.equal(html.includes("./src/apps/equation-mapping/main.js"), true);
  assert.equal(html.includes('id="equation-mapping-app"'), true);
});

test("equation mapping exposes the four standard background colors", () => {
  assert.deepEqual(
    CANVAS_COLORS.map((entry) => entry.label),
    ["Purple", "Light", "Warm", "Dark"]
  );
});
