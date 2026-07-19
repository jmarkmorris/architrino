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
  createSidePointerLineGeometry,
  EquationMappingRuntime,
  resolveCarouselClearanceCalloutPosition,
  resolveCalloutPlacements,
  resolveCalloutRowLayout,
  resolveEquationLineClearancePx,
  resolveEquationVerticalShift,
  resolveSideCalloutPosition,
} from "../src/apps/equation-mapping/EquationMappingRuntime.js";

function readRepoFile(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

function collectVisibleEquationMapText(document) {
  return [
    { source: `${document.id} title`, text: document.title },
    { source: `${document.id} subject`, text: document.subject },
    ...document.anchors.flatMap((anchor) => [
      { source: `${document.id} ${anchor.id} anchor label`, text: anchor.label },
      { source: `${document.id} ${anchor.id} anchor search`, text: anchor.searchText },
    ]),
    ...document.overlays.flatMap((overlay) => [
      { source: `${document.id} ${overlay.id} title`, text: overlay.title },
      ...overlay.content
        .filter((block) => block.type === "text")
        .map((block) => ({ source: `${document.id} ${overlay.id} text`, text: block.text })),
    ]),
  ].filter((entry) => entry.text);
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
  assert.equal(documents.length, 23);
  const [document] = documents;
  assert.equal(document.id, DEFAULT_EQUATION_MAP_DOCUMENT_ID);
  assert.equal(document.schema, "equation-map-document.v1");
  assert.equal(document.backgroundId, "architrinoPurple");
  assert.equal(document.claimLevel, "accepted-source-reference");
  assert.deepEqual(
    document.anchors.map((anchor) => anchor.id),
    ["nativeLayer", "layerMap", "effectiveLayer", "comparisonLayer"]
  );
  assert.equal(document.formulaParts.some((part) => part.anchorId === "layerMap"), true);
  assert.equal(document.overlays.length, 4);
  assert.equal(document.overlays[0].targetAnchorId, "nativeLayer");
  assert.equal(document.overlays.some((overlay) => overlay.targetAnchorId === "comparisonLayer"), true);
  assert.equal(document.overlays[0].content.some((block) => block.type === "math"), true);
  assert.equal(documents.some((entry) => entry.id === "eq-17-redshift-factorization"), true);
  assert.equal(documents.some((entry) => entry.id === "eq-19-friedmann-continuity-lcdm"), true);
  assert.equal(documents.some((entry) => entry.id === "eq-22-planck-blackbody-occupancy"), true);
  assert.equal(
    documents.every((entry) => !/^EQ-\d+/u.test(entry.title)),
    true
  );
  assert.deepEqual(
    documents.slice(0, 4).map((entry) => entry.title),
    [
      "Coordinate Layer Key",
      "Causal Wake Per-Hit Law",
      "Causal Wake Master Equation",
      "Lorentz Factor And Clock Rate",
    ]
  );
  assert.deepEqual(
    documents.slice(0, 4).map((entry) => entry.id),
    [
      "eq-00-coordinate-layer-key",
      "eq-01-causal-wake-master-equation",
      "eq-01b-causal-wake-master-equation",
      "eq-02-lorentz-clock-rate",
    ]
  );
});

test("equation mapping opens with coordinate layer terminology", () => {
  const document = createSeedEquationMapDocuments()[0];
  const layerMap = document.overlays.find((overlay) => overlay.id === "layer-map");
  const comparisonForms = document.overlays.find((overlay) => overlay.id === "comparison-forms");
  const placementByOverlayId = resolveCalloutPlacements(document);

  assert.equal(document.id, DEFAULT_EQUATION_MAP_DOCUMENT_ID);
  assert.equal(document.title, "Coordinate Layer Key");
  assert.equal(document.formulaTeX.includes("\\chi_{\\mathrm{eff}}"), true);
  assert.equal(document.formulaTeX.includes("x^\\mu_{\\mathrm{GR}}"), true);
  assert.deepEqual(
    document.formulaParts.slice(0, 4).map((part) => part.id),
    ["nativeLayer", "native-map-space", "layerMap", "effective-layer-break"]
  );
  assert.equal(placementByOverlayId.get("native-coordinates"), "above");
  assert.equal(placementByOverlayId.get("layer-map"), "above");
  assert.equal(placementByOverlayId.get("effective-coordinates"), "below");
  assert.equal(placementByOverlayId.get("comparison-forms"), "below");
  assert.equal(comparisonForms.position.width, 31.9);
  assert.equal(
    layerMap.content.some(
      (block) => block.type === "text" && block.text.includes("handoff from native variables")
    ),
    true
  );
});

test("equation mapping names the causal wake entry as the per-hit law", () => {
  const document = createSeedEquationMapDocuments().find(
    (entry) => entry.id === "eq-01-causal-wake-master-equation"
  );
  const acceleration = document.overlays.find((overlay) => overlay.id === "native-root");
  const accelerationText = acceleration.content.find((block) => block.type === "text").text;

  assert.equal(document.title, "Causal Wake Per-Hit Law");
  assert.match(accelerationText, /one acceleration contribution/u);
  assert.match(accelerationText, /full master equation sums this term/u);
});

test("equation mapping places the full master equation immediately after the per-hit law", () => {
  const documents = createSeedEquationMapDocuments();
  const masterEquation = documents[2];
  const perHitOverlay = masterEquation.overlays.find((overlay) => overlay.id === "per-hit-contribution");

  assert.equal(masterEquation.id, "eq-01b-causal-wake-master-equation");
  assert.equal(masterEquation.title, "Causal Wake Master Equation");
  assert.deepEqual(
    masterEquation.anchors.map((anchor) => anchor.id),
    ["totalAcceleration", "sourceSum", "emissionSum", "perHitLaw"]
  );
  assert.equal(
    masterEquation.formulaParts.some(
      (part) =>
        part.kind === "math" &&
        part.anchorId === "emissionSum" &&
        part.tex.includes("\\mathcal C_{r\\leftarrow t}(T_r)")
    ),
    true
  );
  assert.equal(masterEquation.formulaParts.some((part) => part.kind === "break"), false);
  assert.equal(
    perHitOverlay.content.some(
      (block) => block.type === "text" && block.text.includes("per-hit law from the previous screen")
    ),
    true
  );
});

test("equation mapping line-of-action callout names the emission point", () => {
  const document = createSeedEquationMapDocuments().find(
    (entry) => entry.id === "eq-01-causal-wake-master-equation"
  );
  const lineOfAction = document.overlays.find((overlay) => overlay.id === "line-of-action");

  assert.equal(
    lineOfAction.content.some(
      (block) => block.type === "text" && block.text.includes("transmitter's emission site")
    ),
    true
  );
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
  assert.equal(filterEquationMapDocuments(documents, "AAA native").length >= 1, true);
  assert.equal(filterEquationMapDocuments(documents, "Lorentz factor").length >= 1, true);
  assert.equal(filterEquationMapDocuments(documents, "receiver-weighted").length >= 1, true);
  assert.equal(filterEquationMapDocuments(documents, "redshift factor").length >= 1, true);
  assert.equal(filterEquationMapDocuments(documents, "not-present").length, 0);
});

test("equation mapping can target an inner Lorentz marker without splitting the fraction", () => {
  const document = createSeedEquationMapDocuments().find(
    (entry) => entry.id === "eq-02-lorentz-clock-rate"
  );
  const driftSpeedPart = document.formulaParts.find((part) => part.id === "driftSpeed");
  const driftOverlay = document.overlays.find((overlay) => overlay.id === "drift-through-sea");

  assert.equal(
    driftSpeedPart.tex,
    "\\frac{1}{\\rule{0pt}{1.06em}\\sqrt{1-\\lVert\\mathbf w_{\\mathrm{eff}}\\rVert^2/c_\\star^2}}"
  );
  assert.deepEqual(driftSpeedPart.sectionMarker, { left: 42, width: 24 });
  assert.equal(driftOverlay.position.maxWidth, 480);
  assert.equal(
    document.overlays.find((overlay) => overlay.id === "drift-through-sea").targetAnchorId,
    "driftSpeed"
  );
});

test("equation mapping callout prose uses the gamma symbol", () => {
  createSeedEquationMapDocuments().forEach((document) => {
    document.overlays.forEach((overlay) => {
      overlay.content
        .filter((block) => block.type === "text")
        .forEach((block) => {
          assert.equal(
            block.text.toLowerCase().includes("gamma"),
            false,
            `${document.id} ${overlay.id} should use γ in rendered callout prose`
          );
        });
    });
  });
});

test("equation mapping callout prose avoids underscore notation", () => {
  createSeedEquationMapDocuments().forEach((document) => {
    document.overlays.forEach((overlay) => {
      overlay.content
        .filter((block) => block.type === "text")
        .forEach((block) => {
          assert.equal(
            /_[A-Za-z0-9]/u.test(block.text),
            false,
            `${document.id} ${overlay.id} should use subscripted prose symbols`
          );
        });
    });
  });
});

test("equation mapping callout prose uses exponent notation instead of squared prose", () => {
  createSeedEquationMapDocuments().forEach((document) => {
    document.overlays.forEach((overlay) => {
      overlay.content
        .filter((block) => block.type === "text")
        .forEach((block) => {
          assert.equal(
            /\bsquared\b/iu.test(block.text),
            false,
            `${document.id} ${overlay.id} should use exponent notation instead of "squared"`
          );
        });
    });
  });
});

test("equation mapping visible theory text uses ledger terminology", () => {
  createSeedEquationMapDocuments().forEach((document) => {
    collectVisibleEquationMapText(document).forEach(({ source, text }) => {
      assert.equal(
        /\b(?:row|rows|record|records)\b/iu.test(text),
        false,
        `${source} should use ledger terminology instead of bare row or record language`
      );
    });
  });
});

test("equation mapping gives Noether sea continuity residual its own callout", () => {
  const document = createSeedEquationMapDocuments().find(
    (entry) => entry.id === "eq-06-noether-sea-continuity"
  );
  const residualOverlay = document.overlays.find(
    (overlay) => overlay.targetAnchorId === "residual"
  );

  assert.equal(
    document.formulaParts.some(
      (part) => part.id === "residual" && part.tex === "r_{\\rho}"
    ),
    true
  );
  assert.equal(residualOverlay?.id, "density-residual");
  assert.equal(resolveCalloutPlacements(document).get(residualOverlay.id), "below");
});

test("equation mapping computes callout placement from formula order instead of seed line choices", () => {
  const placementByOverlayId = resolveCalloutPlacements({
    formulaParts: [
      { kind: "math", anchorId: "first" },
      { kind: "math", anchorId: "second" },
      { kind: "math", anchorId: "third" },
      { kind: "math", anchorId: "fourth" },
    ],
    overlays: [
      { id: "fourth-note", targetAnchorId: "fourth", sectionLinePlacement: "above" },
      { id: "first-note", targetAnchorId: "first", sectionLinePlacement: "below" },
      { id: "third-note", targetAnchorId: "third", sectionLinePlacement: "below" },
      { id: "second-note", targetAnchorId: "second", sectionLinePlacement: "above" },
    ],
  });

  assert.deepEqual([...placementByOverlayId.entries()], [
    ["first-note", "above"],
    ["second-note", "below"],
    ["third-note", "above"],
    ["fourth-note", "below"],
  ]);
});

test("equation mapping places explicit formula rows by row instead of per-equation tuning", () => {
  const placementByOverlayId = resolveCalloutPlacements({
    formulaParts: [
      { kind: "math", anchorId: "topLeft" },
      { kind: "math", anchorId: "topRight" },
      { kind: "break" },
      { kind: "math", anchorId: "bottomLeft" },
      { kind: "math", anchorId: "bottomRight" },
    ],
    overlays: [
      { id: "bottom-right-note", targetAnchorId: "bottomRight", sectionLinePlacement: "above" },
      { id: "top-right-note", targetAnchorId: "topRight", sectionLinePlacement: "below" },
      { id: "bottom-left-note", targetAnchorId: "bottomLeft", sectionLinePlacement: "above" },
      { id: "top-left-note", targetAnchorId: "topLeft", sectionLinePlacement: "below" },
    ],
  });

  assert.deepEqual([...placementByOverlayId.entries()], [
    ["bottom-right-note", "below"],
    ["top-right-note", "above"],
    ["bottom-left-note", "below"],
    ["top-left-note", "above"],
  ]);
});

test("equation mapping keeps only the first row above on three-row maps", () => {
  const placementByOverlayId = resolveCalloutPlacements({
    formulaParts: [
      { kind: "math", anchorId: "topLeft" },
      { kind: "math", anchorId: "topRight" },
      { kind: "break" },
      { kind: "math", anchorId: "middle" },
      { kind: "break" },
      { kind: "math", anchorId: "bottom" },
    ],
    overlays: [
      { id: "top-left-note", targetAnchorId: "topLeft", sectionLinePlacement: "below" },
      { id: "top-right-note", targetAnchorId: "topRight", sectionLinePlacement: "below" },
      { id: "middle-note", targetAnchorId: "middle", sectionLinePlacement: "above" },
      { id: "bottom-note", targetAnchorId: "bottom", sectionLinePlacement: "above" },
    ],
  });

  assert.deepEqual([...placementByOverlayId.entries()], [
    ["top-left-note", "above"],
    ["top-right-note", "above"],
    ["middle-note", "below"],
    ["bottom-note", "below"],
  ]);
});

test("equation mapping alternates crowded first-row callouts on multi-row maps", () => {
  const placementByOverlayId = resolveCalloutPlacements({
    formulaParts: [
      { kind: "math", anchorId: "first" },
      { kind: "math", anchorId: "second" },
      { kind: "math", anchorId: "third" },
      { kind: "math", anchorId: "fourth" },
      { kind: "break" },
      { kind: "math", anchorId: "solveLine" },
    ],
    overlays: [
      { id: "first-note", targetAnchorId: "first", sectionLinePlacement: "above" },
      { id: "second-note", targetAnchorId: "second", sectionLinePlacement: "above" },
      { id: "fourth-note", targetAnchorId: "fourth", sectionLinePlacement: "above" },
      { id: "third-note", targetAnchorId: "third", sectionLinePlacement: "above" },
    ],
  });

  assert.deepEqual([...placementByOverlayId.entries()], [
    ["first-note", "above"],
    ["second-note", "below"],
    ["fourth-note", "below"],
    ["third-note", "above"],
  ]);
});

test("equation mapping computes staggered master-equation callouts by target order", () => {
  const document = createSeedEquationMapDocuments().find(
    (entry) => entry.id === "eq-01-causal-wake-master-equation"
  );
  const placementByOverlayId = resolveCalloutPlacements(document);

  assert.deepEqual(
    document.overlays.map((overlay) => [
      overlay.targetAnchorId,
      placementByOverlayId.get(overlay.id),
    ]),
    [
      ["acceleration", "above"],
      ["polarity", "below"],
      ["inverseSquare", "above"],
      ["branchStrength", "below"],
      ["direction", "above"],
    ]
  );
});

test("equation mapping uses generated alternating placement for single-row maps", () => {
  const document = createSeedEquationMapDocuments().find(
    (entry) => entry.id === "eq-07-effective-metric-adm-cartan"
  );
  const placementByOverlayId = resolveCalloutPlacements(document);

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
  assert.equal(placementByOverlayId.get("spatial-channel"), "below");
  assert.equal(placementByOverlayId.get("drift-channel"), "above");
  assert.equal(placementByOverlayId.get("clock-channel"), "below");
});

test("equation mapping gives oblate-envelope perpendicular radius its own callout", () => {
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

test("equation mapping seed formulas use layer-explicit coordinate notation", () => {
  const renderedTeX = createSeedEquationMapDocuments()
    .flatMap((document) => [
      document.formulaTeX,
      ...document.formulaParts.map((part) => part.tex ?? ""),
      ...document.overlays.flatMap((overlay) =>
        overlay.content
          .filter((block) => block.type === "math")
          .map((block) => block.tex)
      ),
    ])
    .join("\n");

  [
    "D_s",
    "D_T",
    "T_{\\mathrm{em}}",
    "W^{\\mathrm{rec}}",
    "\\partial_t",
    "dx^\\mu",
    "a_{\\mathrm{eff}}^2(t)",
    "a_{\\mathrm{eff}}(t)",
    "\\dot\\rho",
    "\\mathbf a",
  ].forEach((stalePattern) => {
    assert.equal(renderedTeX.includes(stalePattern), false, `stale pattern: ${stalePattern}`);
  });
});

test("equation mapping effective FRW scale factor starts with the positive spatial term", () => {
  const document = createSeedEquationMapDocuments().find(
    (entry) => entry.id === "eq-18-effective-frw-scale-factor"
  );

  assert.equal(
    document.formulaTeX,
    "ds_{\\mathrm{FRW,eff}}^2=a_{\\mathrm{eff}}^2(t_{\\mathrm{eff}})d\\Sigma_k^2-c_0^2d\\tau_c^2"
  );
  assert.deepEqual(
    document.formulaParts.map((part) => part.id),
    ["frwMetric", "eq", "scaleFactor", "spatialSlice", "minus", "cosmicClock"]
  );
  assert.equal(
    document.formulaParts.find((part) => part.id === "cosmicClock").tex,
    "c_0^2d\\tau_c^2"
  );
});

test("equation mapping energy-momentum map substitutes momentum before solving rest mass", () => {
  const document = createSeedEquationMapDocuments().find(
    (entry) => entry.id === "eq-04-energy-momentum-rest-energy"
  );
  const motionOverlay = document.overlays.find((overlay) => overlay.id === "motion-response");

  assert.equal(document.calloutPlacementMode, "explicit");
  assert.deepEqual([...resolveCalloutPlacements(document).entries()], [
    ["energy-readout", "above"],
    ["motion-response", "above"],
    ["mass-response", "above"],
    ["speed-role", "above"],
  ]);
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
        part.id === "momentumSubstitution" &&
        part.anchorId === "" &&
        part.tex ===
          "p=\\gamma_{\\mathrm{eff}}M_0v_{\\mathrm{eff}}\\Rightarrow E^2=\\gamma_{\\mathrm{eff}}^2M_0^2c_{\\mathrm{eff}}^4"
    ),
    true
  );
  assert.equal(
    document.formulaParts.some(
      (part) =>
        part.id === "restMassSolve" &&
        part.anchorId === "" &&
        part.tex === "M_0=\\frac{E}{\\gamma_{\\mathrm{eff}}c_{\\mathrm{eff}}^2}"
    ),
    true
  );
  assert.equal(
    motionOverlay.content.some(
      (block) =>
        block.type === "text" &&
        block.text.includes("first substitute") &&
        block.text.includes("collapses the motion and rest terms")
    ),
    true
  );
});

test("equation mapping widens long coordinate-system callout headers selectively", () => {
  const document = createSeedEquationMapDocuments().find(
    (entry) => entry.id === "eq-19-friedmann-continuity-lcdm"
  );
  const continuity = document.overlays.find((overlay) => overlay.id === "cosmic-continuity");

  assert.equal(continuity.position.maxWidth, 580);
});

test("equation mapping pointer geometry attaches comments to section line edges", () => {
  const stageRect = { left: 100, top: 50, width: 900, height: 600 };
  const targetRect = { left: 460, top: 280, right: 540, bottom: 330, width: 80, height: 50 };
  const leftComment = { left: 180, top: 210, right: 340, bottom: 330, width: 160, height: 120 };
  const rightComment = { left: 680, top: 360, right: 840, bottom: 470, width: 160, height: 110 };

  assert.deepEqual(createPointerLineGeometry(stageRect, targetRect, leftComment, "above"), {
    x1: 208,
    y1: 280,
    x2: 400,
    y2: 214,
  });
  assert.deepEqual(createPointerLineGeometry(stageRect, targetRect, rightComment, "below"), {
    x1: 612,
    y1: 310,
    x2: 400,
    y2: 294,
  });
});

test("equation mapping can place a side callout on the same line as its target", () => {
  const position = resolveSideCalloutPosition({
    stageWidth: 1200,
    stageHeight: 900,
    targetRect: { left: 700, top: 420, right: 980, bottom: 540, width: 280, height: 120 },
    commentRect: { left: 0, top: 0, right: 260, bottom: 160, width: 260, height: 160 },
  });

  assert.deepEqual(position, { x: 408, y: 400 });
  assert.deepEqual(
    createSidePointerLineGeometry(
      { left: 100, top: 50, width: 1200, height: 900 },
      { left: 700, top: 420, right: 980, bottom: 540, width: 280, height: 120 },
      { left: 408, top: 400, right: 668, bottom: 560, width: 260, height: 160 }
    ),
    {
      x1: 568,
      y1: 430,
      x2: 600,
      y2: 430,
    }
  );
});

test("equation mapping can keep a bottom callout clear of the carousel", () => {
  const clearPosition = resolveCarouselClearanceCalloutPosition({
    position: { x: 420, y: 620 },
    commentRect: { left: 0, top: 0, right: 300, bottom: 180, width: 300, height: 180 },
    carouselRect: { left: 500, top: 840, right: 620, bottom: 892, width: 120, height: 52 },
  });

  assert.deepEqual(clearPosition, { x: 420, y: 620 });
  assert.deepEqual(
    resolveCarouselClearanceCalloutPosition({
      position: { x: 420, y: 700 },
      commentRect: { left: 0, top: 0, right: 300, bottom: 180, width: 300, height: 180 },
      carouselRect: { left: 500, top: 840, right: 620, bottom: 892, width: 120, height: 52 },
      clearancePx: 20,
    }),
    { x: 420, y: 640 }
  );
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

test("equation mapping shifts a callout row when that makes angled connectors vertical", () => {
  const layout = resolveCalloutRowLayout({
    stageWidth: 1000,
    stageHeight: 700,
    equationRect: { left: 300, top: 360, right: 700, bottom: 430, width: 400, height: 70 },
    titleRect: { bottom: 70 },
    placement: "above",
    items: [
      { id: "left", width: 300, height: 120, targetCenterX: 300 },
      { id: "right", width: 300, height: 120, targetCenterX: 450 },
    ],
  });

  assert.equal(Math.round(layout.get("left").x), 94);
  assert.equal(Math.round(layout.get("right").x), 418);
});

test("equation mapping keeps wide-row edge callouts centered on their markers", () => {
  const layout = resolveCalloutRowLayout({
    stageWidth: 1976,
    stageHeight: 1246,
    equationRect: { left: 430, top: 548, right: 1690, bottom: 698, width: 1260, height: 150 },
    titleRect: { bottom: 70 },
    placement: "above",
    items: [
      { id: "left-edge", width: 429, height: 176, targetCenterX: 426.65 },
      { id: "middle", width: 429, height: 177, targetCenterX: 851.23 },
    ],
  });

  assert.equal(Math.abs(layout.get("left-edge").x - (426.65 - 429 / 2)) < 0.1, true);
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
  assert.equal(runtime.includes('this.renderEditorSelect("Line"'), false);
  assert.equal(runtime.includes('name="overlay-line"'), false);
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

test("equation mapping arrow keys navigate through the visible equation list", () => {
  const runtime = new EquationMappingRuntime({
    document: {},
    window: {
      localStorage: {
        getItem() {
          return null;
        },
        setItem() {},
      },
    },
  });
  let renderCount = 0;
  let preventDefaultCount = 0;
  const arrowEvent = (key) => ({
    key,
    target: {
      tagName: "DIV",
      closest() {
        return null;
      },
    },
    preventDefault() {
      preventDefaultCount += 1;
    },
  });
  runtime.render = () => {
    renderCount += 1;
  };
  runtime.activeDocumentId = "eq-04-energy-momentum-rest-energy";

  assert.equal(runtime.handleDocumentKeyDown(arrowEvent("ArrowRight")), true);
  assert.equal(runtime.activeDocumentId, "eq-07-effective-metric-adm-cartan");
  assert.equal(runtime.handleDocumentKeyDown(arrowEvent("ArrowDown")), true);
  assert.equal(runtime.activeDocumentId, "eq-08-weak-field-clock-redshift");
  assert.equal(runtime.handleDocumentKeyDown(arrowEvent("ArrowLeft")), true);
  assert.equal(runtime.activeDocumentId, "eq-07-effective-metric-adm-cartan");
  assert.equal(runtime.handleDocumentKeyDown(arrowEvent("ArrowUp")), true);
  assert.equal(runtime.activeDocumentId, "eq-04-energy-momentum-rest-energy");
  assert.equal(renderCount, 4);
  assert.equal(preventDefaultCount, 4);
});

test("equation mapping renders bottom carousel controls for equations", () => {
  const runtimeSource = readRepoFile("src/apps/equation-mapping/EquationMappingRuntime.js");
  const html = readRepoFile("equation-mapping.html");
  const runtime = new EquationMappingRuntime({
    document: {},
    window: {
      location: {
        href: "http://127.0.0.1:5173/equation-mapping.html",
        hash: "",
      },
      localStorage: {
        getItem() {
          return null;
        },
        setItem() {},
      },
    },
  });

  assert.equal(runtime.getDocumentByOffset(-1), null);
  assert.equal(runtime.getDocumentByOffset(1)?.id, "eq-01-causal-wake-master-equation");
  runtime.activeDocumentId = "eq-01b-causal-wake-master-equation";
  assert.equal(runtime.getDocumentByOffset(-1)?.id, "eq-01-causal-wake-master-equation");
  assert.equal(runtime.getDocumentByOffset(1)?.id, "eq-02-lorentz-clock-rate");
  assert.equal(runtimeSource.includes("renderEquationCarousel()"), true);
  assert.equal(runtimeSource.includes('this.renderCarouselButton("previous", -1, "Previous equation")'), true);
  assert.equal(runtimeSource.includes('this.renderCarouselButton("next", 1, "Next equation")'), true);
  assert.match(
    html,
    /\.equation-mapping-carousel \{[\s\S]*?bottom: max\(16px, env\(safe-area-inset-bottom\)\);[\s\S]*?left: 50%;[\s\S]*?transform: translateX\(-50%\);/u
  );
  assert.match(html, /\.equation-mapping-carousel-button \{[\s\S]*?width: 44px;[\s\S]*?height: 38px;/u);
  assert.equal(/\.equation-mapping-carousel-button\.is-previous \{/u.test(html), false);
  assert.equal(/\.equation-mapping-carousel-button\.is-next \{/u.test(html), false);
  assert.match(html, /\.equation-mapping-carousel-button:disabled \{[\s\S]*?opacity: 0\.18;/u);
});

test("equation mapping arrow keys ignore text-entry targets", () => {
  const runtime = new EquationMappingRuntime({
    document: {},
    window: {
      localStorage: {
        getItem() {
          return null;
        },
        setItem() {},
      },
    },
  });
  runtime.render = () => {};
  runtime.activeDocumentId = "eq-04-energy-momentum-rest-energy";
  let prevented = false;

  const didNavigate = runtime.handleDocumentKeyDown({
    key: "ArrowRight",
    target: { tagName: "INPUT" },
    preventDefault() {
      prevented = true;
    },
  });

  assert.equal(didNavigate, false);
  assert.equal(prevented, false);
  assert.equal(runtime.activeDocumentId, "eq-04-energy-momentum-rest-energy");
});

test("equation mapping resolves semantic hashes without renaming stable document ids", () => {
  const replaceCalls = [];
  const runtime = new EquationMappingRuntime({
    document: {},
    window: {
      location: {
        href: "http://127.0.0.1:5173/equation-mapping.html#lorentz-clock-rate",
        hash: "#lorentz-clock-rate",
      },
      history: {
        state: null,
        replaceState(...args) {
          replaceCalls.push(args);
        },
      },
      localStorage: {
        getItem() {
          return null;
        },
        setItem() {},
      },
    },
  });
  runtime.render = () => {};

  assert.equal(runtime.activeDocumentId, "eq-02-lorentz-clock-rate");
  runtime.setActiveDocument("eq-19-friedmann-continuity-lcdm");
  assert.equal(replaceCalls.length, 1);
  assert.equal(
    replaceCalls[0][2],
    "http://127.0.0.1:5173/equation-mapping.html#friedmann-continuity-lcdm"
  );
});

test("equation mapping defaults to the coordinate layer key instead of saved document state", () => {
  const staleSettings = JSON.stringify({
    activeDocumentId: "eq-02-lorentz-clock-rate",
    activeOverlayId: "clock-consumer",
    activeAnchorId: "clockRate",
  });
  const runtime = new EquationMappingRuntime({
    document: {},
    window: {
      location: {
        href: "http://127.0.0.1:5173/equation-mapping.html",
        hash: "",
      },
      localStorage: {
        getItem(key) {
          return key === "architrino.equationMapping.settings.v7" ? staleSettings : null;
        },
        setItem() {},
      },
    },
  });

  assert.equal(runtime.activeDocumentId, DEFAULT_EQUATION_MAP_DOCUMENT_ID);
  assert.equal(runtime.activeOverlayId, "native-coordinates");
  assert.equal(runtime.activeAnchorId, "nativeLayer");
});

test("equation mapping subject selector defaults to folded groups", () => {
  const runtime = readRepoFile("src/apps/equation-mapping/EquationMappingRuntime.js");
  const html = readRepoFile("equation-mapping.html");
  assert.equal(runtime.includes("groupEquationMapDocumentsBySubject(this.getVisibleDocumentList())"), true);
  assert.equal(runtime.includes("this.expandedSubjectIds = normalizeExpandedSubjectIds"), true);
  assert.equal(runtime.includes("expandedSubjectIds: [...this.expandedSubjectIds]"), true);
  assert.equal(runtime.includes('group.dataset.expanded = isExpanded ? "true" : "false"'), true);
  assert.match(
    html,
    /\.equation-mapping-index-group\[data-expanded="false"\] \.equation-mapping-index-items \{[\s\S]*?display: none;/u
  );
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
    /\.equation-mapping-stage\[data-document-id="eq-00-coordinate-layer-key"\] \.equation-mapping-equation-shell \{[\s\S]*?width: min\(96vw, 1600px\);/u
  );
  assert.match(
    html,
    /\.equation-mapping-stage\[data-document-id="eq-00-coordinate-layer-key"\] \.equation-mapping-formula-part\[data-anchor-id="effectiveLayer"\] \{[\s\S]*?transform: translateX\(clamp\(96px, 10vw, 180px\)\);/u
  );
  assert.match(
    html,
    /\.equation-mapping-stage\[data-document-id="eq-00-coordinate-layer-key"\] \.equation-mapping-formula-break\[data-part-id="comparison-layer-break"\] \{[\s\S]*?height: clamp\(56px, 5vw, 88px\);/u
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
    /\.equation-mapping-formula-break \{[\s\S]*?flex: 0 0 100%;[\s\S]*?height: clamp\(28px, 3\.2vw, 52px\);/u
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
  assert.match(
    html,
    /\.equation-mapping-comment \{[\s\S]*?width: min\(calc\(var\(--overlay-width\) \* 1%\), var\(--overlay-max-width, 429px\)\);/u
  );
  assert.match(html, /\.equation-mapping-equation-title \{[\s\S]*?font-size: 18px;/u);
  assert.match(html, /\.equation-mapping-equation-title strong \{[\s\S]*?font-size: 22px;/u);
  assert.match(html, /\.equation-mapping-index-header strong \{[\s\S]*?font-size: 22px;/u);
  assert.match(html, /\.equation-mapping-index-group-toggle strong \{[\s\S]*?font-size: 18px;/u);
  assert.match(html, /\.equation-mapping-index-item span \{[\s\S]*?font-size: 21px;/u);
  assert.match(html, /\.equation-mapping-index-item small \{[\s\S]*?font-size: 15px;/u);
  assert.equal(html.includes(".equation-mapping-equation-title span"), false);
  assert.match(html, /\.equation-mapping-comment-header strong \{[\s\S]*?flex: 0 1 auto;[\s\S]*?font-size: 21px;/u);
  assert.match(
    html,
    /\.equation-mapping-comment-target \{[\s\S]*?flex: 0 0 auto;[\s\S]*?margin-left: auto;[\s\S]*?text-align: right;[\s\S]*?white-space: nowrap;/u
  );
  assert.match(html, /\.equation-mapping-comment-body \{[\s\S]*?font-size: 21px;/u);
  assert.match(
    html,
    /\.equation-mapping-shell\[data-comment-font-size="small"\] \.equation-mapping-comment-header strong,[\s\S]*?\.equation-mapping-comment-target,[\s\S]*?font-size: 18px;/u
  );
  assert.match(
    html,
    /\.equation-mapping-shell\[data-comment-font-size="large"\] \.equation-mapping-comment-header strong,[\s\S]*?\.equation-mapping-comment-target,[\s\S]*?font-size: 24px;/u
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

test("user-facing equation mapping and scene sources use TeX for stylized AAA", () => {
  const equationData = readRepoFile("src/apps/equation-mapping/EquationMappingData.js");
  const runtime = readRepoFile("src/apps/equation-mapping/EquationMappingRuntime.js");
  const sceneSources = [
    "content/scenes/archie/aaa_journey.json",
    "content/scenes/archie/presentations.json",
    "content/scenes/archie/project.json",
    "content/scenes/philosophy_history/crisis_in_physics.json",
    "content/scenes/philosophy_history/theory_bridges/bell_theorem.json",
    "content/scenes/philosophy_history/theory_bridges/entanglement_nonlocality.json",
    "content/scenes/philosophy_history/theory_bridges/pilot_wave_character.json",
    "content/scenes/philosophy_history/theory_bridges/superposition_mechanism.json",
  ].map((path) => [path, readRepoFile(path)]);

  assert.equal(equationData.includes("𝔸𝔸𝔸"), false);
  assert.equal(
    equationData.includes("$\\\\mathbb{A}\\\\mathbb{A}\\\\mathbb{A}$ native ledgers"),
    true
  );
  assert.equal(runtime.includes("createInlineMathTextElement"), true);
  sceneSources.forEach(([path, source]) => {
    assert.equal(source.includes("𝔸𝔸𝔸"), false, path);
    assert.equal(source.includes("$\\\\mathbb{A}\\\\mathbb{A}\\\\mathbb{A}$"), true, path);
  });
});

test("equation mapping uses the standard tone for former geometry callouts", () => {
  const documents = createSeedEquationMapDocuments();
  const runtime = readRepoFile("src/apps/equation-mapping/EquationMappingRuntime.js");
  const html = readRepoFile("equation-mapping.html");
  assert.equal(
    documents.some((document) => document.overlays.some((overlay) => overlay.tone === "geometry")),
    false
  );
  assert.equal(runtime.includes("comment.dataset.tone = overlay.tone ?? \"standard\""), true);
  assert.equal(runtime.includes("line.dataset.tone = overlay.tone ?? \"standard\""), true);
  assert.equal(html.includes("--geometry-note-ink"), false);
  assert.equal(html.includes('data-tone="geometry"'), false);
});

test("equation mapping defaults to medium comment font size", () => {
  assert.equal(DEFAULT_COMMENT_FONT_SIZE, "medium");
  assert.equal(normalizeCommentFontSize("large"), "large");
  assert.equal(normalizeCommentFontSize("compact"), "medium");
});

test("equation mapping editor creates a formula section anchor without mutating seed data", () => {
  const document = createSeedEquationMapDocuments().find(
    (entry) => entry.id === "eq-01-causal-wake-master-equation"
  );
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
  const document = createSeedEquationMapDocuments().find(
    (entry) => entry.id === "eq-01-causal-wake-master-equation"
  );
  const nextDocument = normalizeEquationMapDocument(
    updateEquationAnchor(document, "branchStrength", {
      label: "receiver-weighted acceleration factor",
      tex: "W^{\\mathrm{acc}}",
      searchText: "retained branch ledger",
    })
  );
  const sourceAnchor = nextDocument.anchors.find((anchor) => anchor.id === "branchStrength");

  assert.equal(sourceAnchor.label, "receiver-weighted acceleration factor");
  assert.equal(sourceAnchor.searchText, "retained branch ledger");
  assert.equal(getFormulaPartTeXForAnchor(nextDocument, "branchStrength"), "W^{\\mathrm{acc}}");
  assert.equal(nextDocument.formulaTeX.includes("W^{\\mathrm{acc}}"), true);
});

test("equation mapping editor creates and retargets overlay comments", () => {
  const document = createSeedEquationMapDocuments().find(
    (entry) => entry.id === "eq-01-causal-wake-master-equation"
  );
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
