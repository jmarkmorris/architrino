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
  calculateEquationAutoFit,
  createEquationMappingHomeHref,
  createPointerLineGeometry,
  EquationMappingRuntime,
  resolveCalloutRowLayout,
  resolveEquationLineClearancePx,
  resolveEquationVerticalShift,
} from "../src/apps/equation-mapping/EquationMappingRuntime.js";

function readRepoFile(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

function createFakeStyle() {
  return {
    flexWrap: "",
    values: new Map(),
    getPropertyValue(name) {
      return this.values.get(name) ?? "";
    },
    removeProperty(name) {
      this.values.delete(name);
    },
    setProperty(name, value) {
      this.values.set(name, value);
    },
  };
}

function createFakeFormulaChild(width, className = "") {
  return {
    classList: {
      contains(name) {
        return className.split(/\s+/u).includes(name);
      },
    },
    scrollWidth: width,
    offsetWidth: width,
    clientWidth: width,
    getBoundingClientRect() {
      return { width };
    },
  };
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
  assert.equal(document.overlays.length, 5);
  assert.equal(document.overlays[0].targetAnchorId, "acceleration");
  assert.equal(document.overlays.some((overlay) => overlay.targetAnchorId === "polarity"), true);
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

test("equation mapping can target an inner EQ-02 marker without splitting the fraction", () => {
  const document = createSeedEquationMapDocuments().find(
    (entry) => entry.id === "eq-02-lorentz-clock-rate"
  );
  const driftSpeedPart = document.formulaParts.find((part) => part.id === "driftSpeed");

  assert.equal(
    driftSpeedPart.tex,
    "\\frac{1}{\\mathstrut\\sqrt{1-\\lVert\\mathbf w_{\\mathrm{eff}}\\rVert^2/c_\\star^2}}"
  );
  assert.deepEqual(driftSpeedPart.sectionMarker, { left: 42, width: 24 });
  assert.equal(
    document.overlays.find((overlay) => overlay.id === "drift-through-sea").targetAnchorId,
    "driftSpeed"
  );
});

test("equation mapping keeps same-side seed callouts ordered with their target terms", () => {
  createSeedEquationMapDocuments().forEach((document) => {
    const anchorOrder = new Map();
    document.formulaParts.forEach((part, index) => {
      if (part.anchorId && !anchorOrder.has(part.anchorId)) {
        anchorOrder.set(part.anchorId, index);
      }
    });
    ["above", "below"].forEach((placement) => {
      const targetOrderByBoxPosition = document.overlays
        .filter((overlay) => overlay.sectionLinePlacement === placement)
        .sort((left, right) => left.position.x - right.position.x)
        .map((overlay) => anchorOrder.get(overlay.targetAnchorId));
      assert.deepEqual(
        targetOrderByBoxPosition,
        [...targetOrderByBoxPosition].sort((left, right) => left - right),
        `${document.id} ${placement} callouts should not cross target order`
      );
    });
  });
});

test("equation mapping places EQ-07 upper-row callouts above and drift callout below", () => {
  const document = createSeedEquationMapDocuments().find(
    (entry) => entry.id === "eq-07-effective-metric-adm-cartan"
  );
  const placementByOverlayId = new Map(
    document.overlays.map((overlay) => [overlay.id, overlay.sectionLinePlacement])
  );

  assert.equal(
    document.formulaTeX,
    "ds_{\\mathrm{eff}}^2=\\gamma_{ij}^{\\mathrm{eff}}(dx_{\\mathrm{eff}}^i-u^i_{\\mathrm{sea,eff}}dt_{\\mathrm{eff}})(dx_{\\mathrm{eff}}^j-u^j_{\\mathrm{sea,eff}}dt_{\\mathrm{eff}})-N^2c_0^2dt_{\\mathrm{eff}}^2"
  );
  assert.equal(document.formulaTeX.includes("=-N^2"), false);
  assert.equal(document.formulaTeX.includes("\\gamma_{ij}^{\\mathrm{eff}}\\cdot("), false);
  assert.equal(
    document.formulaParts.some((part) => part.id === "spatialProduct" || part.tex === "\\cdot"),
    false
  );
  assert.deepEqual(
    document.formulaParts
      .filter((part) => part.anchorId)
      .map((part) => part.anchorId),
    ["lineElement", "spatialCompliance", "drift", "lapse"]
  );
  assert.equal(
    document.formulaParts.some((part) => part.id === "minus" && part.text === " - "),
    true
  );
  assert.equal(placementByOverlayId.get("observer-level"), "above");
  assert.equal(placementByOverlayId.get("clock-channel"), "above");
  assert.equal(placementByOverlayId.get("spatial-channel"), "above");
  assert.equal(placementByOverlayId.get("drift-channel"), "below");
});

test("equation mapping gives EQ-03 perpendicular radius its own callout", () => {
  const document = createSeedEquationMapDocuments().find(
    (entry) => entry.id === "eq-03-oblate-spheroidal-envelope"
  );

  assert.equal(
    document.overlays.some(
      (overlay) =>
        overlay.id === "transverse-radius" &&
        overlay.targetAnchorId === "perpendicularRadius"
    ),
    true
  );
  assert.equal(
    document.overlays.some(
      (overlay) =>
        overlay.targetAnchorId === "perpendicularRadius" &&
        overlay.searchText.includes("radius across the motion") &&
        overlay.searchText.includes("reference radius")
    ),
    true
  );
});

test("equation mapping EQ-04 adds corrected motion relation and rest-mass solve row", () => {
  const document = createSeedEquationMapDocuments().find(
    (entry) => entry.id === "eq-04-energy-momentum-rest-energy"
  );
  const motionOverlay = document.overlays.find((overlay) => overlay.id === "motion-response");

  assert.equal(
    document.overlays.every((overlay) => overlay.sectionLinePlacement === "above"),
    true
  );
  assert.equal(
    motionOverlay.content.some(
      (block) =>
        block.type === "math" &&
        block.tex ===
          "p^2c_{\\mathrm{eff}}^2=\\gamma_{\\mathrm{eff}}^2M_0^2v_{\\mathrm{eff}}^2c_{\\mathrm{eff}}^2"
    ),
    true
  );
  assert.equal(
    document.formulaParts.some(
      (part) => part.id === "rest-mass-solve-break" && part.kind === "break"
    ),
    true
  );
  assert.equal(
    document.formulaParts.some(
      (part) =>
        part.id === "restMassSolve" &&
        part.anchorId === "" &&
        part.tex ===
          "M_0=\\frac{\\sqrt{E^2-p^2c_{\\mathrm{eff}}^2}}{c_{\\mathrm{eff}}^2}"
    ),
    true
  );
});

test("equation mapping pointer geometry attaches comments to section line edges", () => {
  const stageRect = { left: 100, top: 50, width: 900, height: 600 };
  const targetRect = { left: 460, top: 280, right: 540, bottom: 330, width: 80, height: 50 };
  const leftComment = { left: 180, top: 210, right: 340, bottom: 330, width: 160, height: 120 };
  const rightComment = { left: 680, top: 360, right: 840, bottom: 470, width: 160, height: 110 };

  assert.deepEqual(createPointerLineGeometry(stageRect, targetRect, leftComment, "above"), {
    x1: 222,
    y1: 280,
    x2: 400,
    y2: 214,
  });
  assert.deepEqual(createPointerLineGeometry(stageRect, targetRect, rightComment, "below"), {
    x1: 598,
    y1: 310,
    x2: 400,
    y2: 294,
  });
});

test("equation mapping compact callout layout stays near the equation until width requires edges", () => {
  const layout = resolveCalloutRowLayout({
    stageWidth: 1400,
    stageHeight: 900,
    equationRect: { left: 500, top: 420, right: 900, bottom: 500, width: 400, height: 80 },
    titleRect: { bottom: 70 },
    placement: "below",
    items: [
      { id: "left", width: 260, height: 120, targetCenterX: 520 },
      { id: "middle", width: 260, height: 120, targetCenterX: 700 },
      { id: "right", width: 260, height: 120, targetCenterX: 880 },
    ],
  });

  assert.equal(layout.get("middle").y, 528);
  assert.equal(layout.get("left").x > 200, true);
  assert.equal(layout.get("right").x < 940, true);
  assert.equal(layout.get("middle").x >= layout.get("left").x + 260 + 24, true);
  assert.equal(layout.get("right").x >= layout.get("middle").x + 260 + 24, true);
});

test("equation mapping callout layout can reserve one full equation line", () => {
  const equationRect = { left: 500, top: 420, right: 900, bottom: 500, width: 400, height: 80 };
  const titleRect = { bottom: 70 };
  const aboveLayout = resolveCalloutRowLayout({
    stageWidth: 1400,
    stageHeight: 900,
    equationRect,
    titleRect,
    placement: "above",
    equationGapPx: 96,
    items: [{ id: "above", width: 260, height: 120, targetCenterX: 700 }],
  });
  const belowLayout = resolveCalloutRowLayout({
    stageWidth: 1400,
    stageHeight: 900,
    equationRect,
    titleRect,
    placement: "below",
    equationGapPx: 96,
    items: [{ id: "below", width: 260, height: 120, targetCenterX: 700 }],
  });

  assert.equal(aboveLayout.get("above").y, 204);
  assert.equal(belowLayout.get("below").y, 596);
});

test("equation mapping derives callout clearance from the tallest equation row", () => {
  assert.equal(
    resolveEquationLineClearancePx([{ height: 64 }, { height: 112 }], 72),
    112
  );
  assert.equal(resolveEquationLineClearancePx([], 78), 78);
  assert.equal(resolveEquationLineClearancePx([], 0), 28);
});

test("equation mapping shifts explicit formula rows below a top callout row", () => {
  assert.equal(
    resolveEquationVerticalShift({
      stageHeight: 900,
      equationShellRect: { top: 390, bottom: 650, height: 260 },
      rowRects: [
        { top: 470, bottom: 560 },
        { top: 635, bottom: 730 },
      ],
      aboveCalloutRects: [
        { top: 80, bottom: 360 },
        { top: 80, bottom: 420 },
      ],
      belowCalloutRects: [],
    }),
    165
  );
  assert.equal(
    resolveEquationVerticalShift({
      stageHeight: 900,
      equationShellRect: { top: 390, bottom: 650, height: 260 },
      rowRects: [
        { top: 650, bottom: 740 },
        { top: 815, bottom: 890 },
      ],
      aboveCalloutRects: [{ top: 80, bottom: 420 }],
      belowCalloutRects: [],
    }),
    0
  );
  assert.equal(
    resolveEquationVerticalShift({
      stageHeight: 900,
      equationShellRect: { top: 390, bottom: 650, height: 260 },
      rowRects: [
        { top: 470, bottom: 560 },
        { top: 635, bottom: 730 },
      ],
      aboveCalloutRects: [{ top: 80, bottom: 420 }],
      belowCalloutRects: [{ top: 700, bottom: 820 }],
    }),
    0
  );
});

test("equation mapping auto-fit shrinks long equations before wrapping", () => {
  assert.deepEqual(
    calculateEquationAutoFit({
      availableWidth: 900,
      naturalWidth: 800,
      baseFontSize: 60,
      minFontSize: 26,
    }),
    { fontSize: 60, shouldWrap: false, mode: "base" }
  );
  const scaled = calculateEquationAutoFit({
    availableWidth: 900,
    naturalWidth: 1200,
    baseFontSize: 60,
    minFontSize: 26,
  });
  assert.equal(Math.round(scaled.fontSize), 45);
  assert.equal(scaled.shouldWrap, false);
  assert.equal(scaled.mode, "scaled");
  assert.deepEqual(
    calculateEquationAutoFit({
      availableWidth: 900,
      naturalWidth: 2400,
      baseFontSize: 60,
      minFontSize: 13,
    }),
    { fontSize: 22.5, shouldWrap: false, mode: "scaled" }
  );
  assert.deepEqual(
    calculateEquationAutoFit({
      availableWidth: 900,
      naturalWidth: 6000,
      baseFontSize: 60,
      minFontSize: 13,
    }),
    { fontSize: 13, shouldWrap: true, mode: "wrapped" }
  );
});

test("equation mapping runtime applies fitted font size before enabling wrap", () => {
  const runtime = new EquationMappingRuntime({
    document: {},
    window: {
      getComputedStyle() {
        return { fontSize: "60px" };
      },
    },
  });
  const equationStyle = createFakeStyle();
  runtime.equationElement = {
    dataset: {},
    scrollWidth: 1200,
    style: equationStyle,
  };
  runtime.equationShellElement = {
    clientWidth: 900,
    getBoundingClientRect() {
      return { width: 900 };
    },
  };

  const scaled = runtime.applyEquationAutoFit();

  assert.equal(scaled.mode, "scaled");
  assert.equal(runtime.equationElement.dataset.fitMode, "scaled");
  assert.equal(equationStyle.getPropertyValue("--equation-fit-font-size"), "45.00px");
  assert.equal(equationStyle.flexWrap, "nowrap");

  runtime.equationElement.scrollWidth = 2400;
  const veryScaled = runtime.applyEquationAutoFit();

  assert.equal(veryScaled.mode, "scaled");
  assert.equal(runtime.equationElement.dataset.fitMode, "scaled");
  assert.equal(equationStyle.getPropertyValue("--equation-fit-font-size"), "22.50px");
  assert.equal(equationStyle.flexWrap, "nowrap");

  runtime.equationElement.scrollWidth = 6000;
  const wrapped = runtime.applyEquationAutoFit();

  assert.equal(wrapped.mode, "wrapped");
  assert.equal(runtime.equationElement.dataset.fitMode, "wrapped");
  assert.equal(equationStyle.getPropertyValue("--equation-fit-font-size"), "13.00px");
  assert.equal(equationStyle.flexWrap, "wrap");
});

test("equation mapping runtime keeps explicit solve rows centered instead of measuring one long row", () => {
  const runtime = new EquationMappingRuntime({
    document: {},
    window: {
      getComputedStyle() {
        return { fontSize: "60px" };
      },
    },
  });
  const equationStyle = createFakeStyle();
  runtime.equationElement = {
    children: [
      createFakeFormulaChild(260),
      createFakeFormulaChild(120),
      createFakeFormulaChild(210),
      createFakeFormulaChild(900, "equation-mapping-formula-break"),
      createFakeFormulaChild(520),
    ],
    dataset: {},
    scrollWidth: 1110,
    style: equationStyle,
  };
  runtime.equationShellElement = {
    clientWidth: 900,
    getBoundingClientRect() {
      return { width: 900 };
    },
  };

  const fit = runtime.applyEquationAutoFit();

  assert.equal(fit.mode, "base");
  assert.equal(equationStyle.flexWrap, "wrap");
  assert.equal(equationStyle.getPropertyValue("--equation-fit-font-size"), "");
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
  assert.match(html, /--marker-ink: rgba\(232, 226, 236, 0\.58\);/u);
  assert.equal(html.includes(".equation-mapping-pointer-line.is-active"), false);
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
  assert.equal(runtime.includes("const SIZE_CALIBRATION_VERSION = 3;"), true);
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

test("equation mapping ignores large sizing saved under the previous calibration", () => {
  const staleSettings = JSON.stringify({
    sizeCalibrationVersion: 2,
    equationScale: "large",
    commentFontSize: "large",
  });
  const runtime = new EquationMappingRuntime({
    document: {},
    window: {
      localStorage: {
        getItem(key) {
          return key === "architrino.equationMapping.settings.v7" ? staleSettings : null;
        },
      },
    },
  });

  assert.equal(runtime.equationScale, "medium");
  assert.equal(runtime.commentFontSize, "medium");
});

test("equation mapping calibrates medium visual sizes from requested adjacent levels", () => {
  const html = readRepoFile("equation-mapping.html");
  assert.match(
    html,
    /\.equation-mapping-equation-shell \{[\s\S]*?width: min\(96vw, 1320px\);[\s\S]*?max-width: calc\(100vw - var\(--index-width\) - 24px\);/u
  );
  assert.match(
    html,
    /\.equation-mapping-equation-shell \{[\s\S]*?top: var\(--equation-layout-y, 50%\);/u
  );
  assert.match(
    html,
    /\.equation-mapping-equation \{[\s\S]*?font-size: var\(--equation-fit-font-size, clamp\(30px, 4\.6vw, 62px\)\);/u
  );
  assert.match(
    html,
    /\.equation-mapping-shell\[data-equation-scale="small"\] \.equation-mapping-equation \{[\s\S]*?font-size: var\(--equation-fit-font-size, clamp\(24px, 3\.7vw, 52px\)\);/u
  );
  assert.match(
    html,
    /\.equation-mapping-shell\[data-equation-scale="large"\] \.equation-mapping-equation \{[\s\S]*?font-size: var\(--equation-fit-font-size, clamp\(36px, 5\.6vw, 76px\)\);/u
  );
  assert.match(
    html,
    /\.equation-mapping-formula-part,[\s\S]*?\.equation-mapping-formula-text \{[\s\S]*?flex: 0 0 auto;[\s\S]*?white-space: nowrap;/u
  );
  assert.match(
    html,
    /\.equation-mapping-formula-break \{[\s\S]*?flex: 0 0 100%;[\s\S]*?height: clamp\(5px, 0\.8vw, 12px\);/u
  );
  assert.match(
    html,
    /\.equation-mapping-formula-part\.is-targeted\[data-section-line="above"\]::before \{[\s\S]*?top: -16px;/u
  );
  assert.match(
    html,
    /\.equation-mapping-formula-part\.is-targeted\[data-section-line="below"\]::after \{[\s\S]*?bottom: -14px;/u
  );
  assert.match(
    html,
    /\.equation-mapping-formula-part\.is-targeted\[data-section-line="above"\]::before,[\s\S]*?left: var\(--section-marker-left, max\(8px, 18%\)\);[\s\S]*?background: var\(--marker-ink\);/u
  );
  assert.match(
    html,
    /\.equation-mapping-pointer-line \{[\s\S]*?stroke: var\(--marker-ink\);/u
  );
  assert.match(
    html,
    /\.equation-mapping-comment \{[\s\S]*?left: var\(--overlay-layout-x, calc\(var\(--overlay-x\) \* 1%\)\);[\s\S]*?top: var\(--overlay-layout-y, calc\(var\(--overlay-y\) \* 1%\)\);/u
  );
  assert.match(html, /\.equation-mapping-comment \{[\s\S]*?width: min\(calc\(var\(--overlay-width\) \* 1%\), 390px\);/u);
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
