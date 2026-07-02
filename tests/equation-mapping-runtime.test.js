import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  CANVAS_COLORS,
  DEFAULT_COMMENT_FONT_SIZE,
  DEFAULT_EQUATION_MAP_DOCUMENT_ID,
  DEFAULT_EQUATION_SCALE,
  createSeedEquationMapDocuments,
  filterEquationMapDocuments,
  normalizeCommentFontSize,
  normalizeEquationMapDocument,
} from "../src/apps/equation-mapping/EquationMappingData.js";
import {
  createEquationAnchor,
  createEquationOverlay,
  getFormulaPartTeXForAnchor,
  getOverlayContentDraft,
  updateEquationAnchor,
  updateEquationOverlay,
} from "../src/apps/equation-mapping/EquationMappingEditor.js";
import {
  createEquationMappingHomeHref,
  createPointerLineGeometry,
} from "../src/apps/equation-mapping/EquationMappingRuntime.js";

function readRepoFile(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

test("equation mapping seed document carries static layer anchors and comments", () => {
  const documents = createSeedEquationMapDocuments();
  assert.equal(documents.length, 10);
  const [document] = documents;
  assert.equal(document.id, DEFAULT_EQUATION_MAP_DOCUMENT_ID);
  assert.equal(document.schema, "equation-map-document.v1");
  assert.equal(document.backgroundId, "architrinoPurple");
  assert.equal(document.claimLevel, "accepted-aaa-derivation");
  assert.deepEqual(
    document.anchors.map((anchor) => anchor.id),
    ["acceleration", "polarity", "inverseSquare", "branchStrength", "direction"]
  );
  assert.equal(document.formulaParts.some((part) => part.anchorId === "branchStrength"), true);
  assert.equal(document.overlays.length, 4);
  assert.equal(document.overlays[0].targetAnchorId, "acceleration");
  assert.equal(document.overlays[0].content.some((block) => block.type === "math"), true);
  assert.equal(documents.some((entry) => entry.id === "eq-17-redshift-factorization"), true);
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
  assert.equal(filterEquationMapDocuments(documents, "Lorentz factor").length >= 1, true);
  assert.equal(filterEquationMapDocuments(documents, "receiver-normal").length >= 1, true);
  assert.equal(filterEquationMapDocuments(documents, "redshift factor").length >= 1, true);
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

test("equation mapping uses one foreground ink color per background family", () => {
  const html = readRepoFile("equation-mapping.html");
  assert.match(html, /--equation-ink: #4b0082;/u);
  assert.match(html, /--line-ink: #4b0082;/u);
  assert.match(
    html,
    /\.equation-mapping-shell\[data-background="architrinoPurple"\] \{[\s\S]*?--equation-ink: #ffffff;/u
  );
  assert.match(
    html,
    /\.equation-mapping-shell\[data-background="architrinoPurple"\] \{[\s\S]*?--line-ink: #ffffff;/u
  );
  assert.match(
    html,
    /\.equation-mapping-shell\[data-background="warm"\] \{[\s\S]*?--equation-ink: #4b0082;/u
  );
  assert.match(
    html,
    /\.equation-mapping-shell\[data-background="warm"\] \{[\s\S]*?--line-ink: #4b0082;/u
  );
  assert.match(
    html,
    /\.equation-mapping-shell\[data-background="dark"\] \{[\s\S]*?--equation-ink: #ffffff;/u
  );
  assert.match(
    html,
    /\.equation-mapping-shell\[data-background="dark"\] \{[\s\S]*?--line-ink: #ffffff;/u
  );
  assert.equal(
    html.includes(".equation-mapping-formula-part.is-editor-selected-anchor {\n        color: var(--accent);"),
    false
  );
  assert.match(html, /border: 1px solid var\(--line-ink\);/u);
  assert.match(html, /stroke: var\(--line-ink\);/u);
});

test("equation mapping settings control uses a gear icon", () => {
  const runtime = readRepoFile("src/apps/equation-mapping/EquationMappingRuntime.js");
  assert.equal(runtime.includes('case "settings":'), true);
  assert.equal(runtime.includes("M12.2 2h-.4"), true);
  assert.equal(runtime.includes("M12 3v3M12 18v3"), false);
});

test("equation mapping settings omit the global section-line control", () => {
  const runtime = readRepoFile("src/apps/equation-mapping/EquationMappingRuntime.js");
  const requirements = readRepoFile("reference/priorities/app-equation-mapping/requirements-and-design.md");
  assert.equal(runtime.includes('this.renderSegmentedSetting("Section line"'), false);
  assert.equal(runtime.includes("this.sectionLinePlacement ="), false);
  assert.equal(runtime.includes("sectionLinePlacement: this.sectionLinePlacement"), false);
  assert.equal(runtime.includes("normalizeSectionLinePlacement"), false);
  assert.equal(runtime.includes('this.renderEditorSelect("Line"'), true);
  assert.equal(requirements.includes("section-line placement: above or below formula section"), false);
});

test("equation mapping home button targets the Applications scene without replacing history", () => {
  const runtime = readRepoFile("src/apps/equation-mapping/EquationMappingRuntime.js");
  assert.equal(
    createEquationMappingHomeHref({
      location: {
        href: "http://127.0.0.1:5173/equation-mapping.html",
      },
    }),
    "http://127.0.0.1:5173/index.html#scene=content%2Fscenes%2Farchie%2Fapplications.json"
  );
  assert.equal(runtime.includes('assign?.("./index.html")'), false);
  assert.equal(runtime.includes("location?.replace"), false);
  assert.equal(runtime.includes("createEquationMappingHomeHref(this.window)"), true);
});

test("equation mapping resets stale saved sizing into the new medium defaults", () => {
  const runtime = readRepoFile("src/apps/equation-mapping/EquationMappingRuntime.js");
  assert.equal(runtime.includes('SETTINGS_STORAGE_KEY = "architrino.equationMapping.settings.v7"'), true);
  assert.equal(runtime.includes("const SIZE_CALIBRATION_VERSION = 2;"), true);
  assert.equal(runtime.includes("savedSettings.sizeCalibrationVersion === SIZE_CALIBRATION_VERSION"), true);
  assert.equal(runtime.includes("savedSizeSettingsAreCurrent ? savedSettings.equationScale : DEFAULT_EQUATION_SCALE"), true);
  assert.equal(
    runtime.includes("savedSizeSettingsAreCurrent ? savedSettings.commentFontSize : DEFAULT_COMMENT_FONT_SIZE"),
    true
  );
  assert.equal(runtime.includes("sizeCalibrationVersion: SIZE_CALIBRATION_VERSION"), true);
});

test("equation mapping merges built-in seed maps with saved draft maps", () => {
  const runtime = readRepoFile("src/apps/equation-mapping/EquationMappingRuntime.js");
  assert.equal(runtime.includes("function mergeSeedAndSavedDocuments"), true);
  assert.equal(runtime.includes("savedById.get(seedDocument.id) ?? seedDocument"), true);
  assert.equal(runtime.includes("mergedDocuments.push(document)"), true);
});

test("equation mapping defaults to medium equation scale", () => {
  assert.equal(DEFAULT_EQUATION_SCALE, "medium");
});

test("equation mapping calibrates medium visual sizes from requested adjacent levels", () => {
  const html = readRepoFile("equation-mapping.html");
  assert.match(
    html,
    /\.equation-mapping-equation \{[\s\S]*?font-size: clamp\(30px, 4\.6vw, 62px\);/u
  );
  assert.match(
    html,
    /\.equation-mapping-shell\[data-equation-scale="small"\] \.equation-mapping-equation \{[\s\S]*?font-size: clamp\(24px, 3\.7vw, 52px\);/u
  );
  assert.match(
    html,
    /\.equation-mapping-shell\[data-equation-scale="large"\] \.equation-mapping-equation \{[\s\S]*?font-size: clamp\(36px, 5\.6vw, 76px\);/u
  );
  assert.match(html, /\.equation-mapping-equation-title \{[\s\S]*?font-size: 18px;/u);
  assert.match(html, /\.equation-mapping-equation-title strong \{[\s\S]*?font-size: 22px;/u);
  assert.match(html, /\.equation-mapping-index-header strong \{[\s\S]*?font-size: 22px;/u);
  assert.match(html, /\.equation-mapping-index-group h2 \{[\s\S]*?font-size: 20px;/u);
  assert.match(html, /\.equation-mapping-index-item span \{[\s\S]*?font-size: 21px;/u);
  assert.equal(html.includes(".equation-mapping-equation-title span"), false);
  assert.equal(html.includes(".equation-mapping-index-item small"), false);
  assert.equal(html.includes(".equation-mapping-comment-header span"), false);
  assert.match(html, /\.equation-mapping-comment-header strong \{[\s\S]*?font-size: 21px;/u);
  assert.match(html, /\.equation-mapping-comment-body \{[\s\S]*?font-size: 21px;/u);
  assert.match(
    html,
    /\.equation-mapping-shell\[data-comment-font-size="small"\] \.equation-mapping-comment-header strong,[\s\S]*?font-size: 18px;/u
  );
  assert.match(
    html,
    /\.equation-mapping-shell\[data-comment-font-size="large"\] \.equation-mapping-comment-header strong,[\s\S]*?font-size: 24px;/u
  );
});

test("equation mapping keeps claim level out of visible document labels", () => {
  const runtime = readRepoFile("src/apps/equation-mapping/EquationMappingRuntime.js");
  assert.equal(runtime.includes("entry.claimLevel.replaceAll"), false);
  assert.equal(runtime.includes("document.claimLevel.replaceAll"), false);
});

test("equation mapping keeps overlay status out of visible comment labels", () => {
  const runtime = readRepoFile("src/apps/equation-mapping/EquationMappingRuntime.js");
  const data = readRepoFile("src/apps/equation-mapping/EquationMappingData.js");
  const editor = readRepoFile("src/apps/equation-mapping/EquationMappingEditor.js");
  assert.equal(runtime.includes("overlay.status"), false);
  assert.equal(runtime.includes('name="overlay-status"'), false);
  assert.equal(runtime.includes('"Status", "overlay-status"'), false);
  assert.equal(data.includes("overlay.title} ${overlay.status}"), false);
  assert.equal(editor.includes('normalizePlainText(draft.status, "candidate")'), false);
});

test("equation mapping defaults to medium comment font size", () => {
  assert.equal(DEFAULT_COMMENT_FONT_SIZE, "medium");
  assert.equal(normalizeCommentFontSize("large"), "large");
  assert.equal(normalizeCommentFontSize("compact"), "medium");
});

test("equation mapping editor creates a formula section anchor without mutating seed data", () => {
  const [document] = createSeedEquationMapDocuments();
  const nextDocument = normalizeEquationMapDocument(
    createEquationAnchor(document, {
      label: "retained carrier",
      tex: "\\Theta_W",
      searchText: "accepted carrier target",
    })
  );

  assert.equal(document.anchors.some((anchor) => anchor.id === "retained-carrier"), false);
  assert.equal(nextDocument.anchors.some((anchor) => anchor.id === "retained-carrier"), true);
  assert.equal(getFormulaPartTeXForAnchor(nextDocument, "retained-carrier"), "\\Theta_W");
  assert.equal(nextDocument.formulaTeX.includes("\\Theta_W"), true);
});

test("equation mapping editor updates anchor labels and formula TeX", () => {
  const [document] = createSeedEquationMapDocuments();
  const nextDocument = normalizeEquationMapDocument(
    updateEquationAnchor(document, "branchStrength", {
      label: "receiver-normal factor",
      tex: "W^{\\mathrm{rec}}",
      searchText: "retained branch ledger",
    })
  );
  const sourceAnchor = nextDocument.anchors.find((anchor) => anchor.id === "branchStrength");

  assert.equal(sourceAnchor.label, "receiver-normal factor");
  assert.equal(sourceAnchor.searchText, "retained branch ledger");
  assert.equal(getFormulaPartTeXForAnchor(nextDocument, "branchStrength"), "W^{\\mathrm{rec}}");
  assert.equal(nextDocument.formulaTeX.includes("W^{\\mathrm{rec}}"), true);
});

test("equation mapping editor creates and retargets overlay comments", () => {
  const [document] = createSeedEquationMapDocuments();
  const withOverlay = normalizeEquationMapDocument(
    createEquationOverlay(document, {
      title: "Polarity note",
      targetAnchorId: "polarity",
      text: "Compare the polarity term before accepting a map.",
      mathTex: "\\kappa\\sigma",
      sectionLinePlacement: "above",
    })
  );
  const createdOverlay = withOverlay.overlays.find((overlay) => overlay.id === "polarity-note");

  assert.equal(createdOverlay.targetAnchorId, "polarity");
  assert.equal(createdOverlay.sectionLinePlacement, "above");
  assert.equal(getOverlayContentDraft(createdOverlay).mathTex, "\\kappa\\sigma");

  const retargeted = normalizeEquationMapDocument(
    updateEquationOverlay(withOverlay, createdOverlay.id, {
      targetAnchorId: "direction",
      sectionLinePlacement: "below",
      text: "Retarget the pointer to the line-of-action side.",
      mathTex: "\\hat{\\mathbf r}",
      position: { x: 30, y: 44, width: 28 },
    })
  );
  const overlay = retargeted.overlays.find((entry) => entry.id === createdOverlay.id);

  assert.equal(overlay.targetAnchorId, "direction");
  assert.equal(overlay.sectionLinePlacement, "below");
  assert.deepEqual(overlay.position, { x: 30, y: 44, width: 28 });
  assert.equal(getOverlayContentDraft(overlay).text, "Retarget the pointer to the line-of-action side.");
  assert.equal(getOverlayContentDraft(overlay).mathTex, "\\hat{\\mathbf r}");
});
