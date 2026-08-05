import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  TOPO_DEFAULT_CONTOUR_DENSITY,
  TOPO_DEFAULT_CONTOUR_VISIBILITY,
  TOPO_DISPLAY_CLIP_MAGNITUDE,
  TOPO_DISPLAY_MAPPING_ID,
  TOPO_FIELD_COLOR_GAIN,
  TOPO_FIRST_CONTOUR_BUDGET_MS,
  TOPO_INTERACTION_CONTRACT_ID,
  TOPO_INVERSE_SQUARE_SCALE,
  TOPO_REFERENCE_SCALE,
  TOPO_SOURCE_POSITION,
  TOPO_SYNTHETIC_CONTOUR_DELAY_RANGE,
  TOPO_TRANSLATION_AXIS,
  applyTopoScenarioPolarity,
  createTopoAnalyticFieldRgbAtCanvasPixel,
  createTopoContourEmphasis,
  createTopoPreviewFrameIdentity,
  createTopoSampleRgb,
  createTopoSequentialContourStyle,
  createTopoSignedRgb,
  createTopoSyntheticContourCircles,
  createTopoSyntheticContourRenderPlan,
  createTopoSyntheticContourSelection,
  createTopoSyntheticRawSampler,
  inverseTopoTransform,
  normalizeTopoDisplayValue,
  normalizeTopoFieldColorValue,
  resolveTopoCanvasPixelSize,
  syntheticTopoCausalDelay,
  syntheticTopoSignedValue,
  topoContourRangeDecades,
  topoPreviewResultAt,
  topoWorldPointForCanvasPixel,
  transformTopoValue,
} from "../src/apps/topo/TopoInteractionContract.js";
import {
  getStandaloneAppPathForScene,
} from "../src/apps/navigator/StandaloneAppLaunchRuntime.js";

function readRepoFile(relativePath) {
  return readFileSync(new URL("../" + relativePath, import.meta.url), "utf8");
}

function closeTo(actual, expected, tolerance = 1e-12) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    String(actual) + " is not within " + tolerance + " of " + expected,
  );
}

test("TOPO-002 freezes one zero-safe signed base-10 display mapping", () => {
  assert.equal(TOPO_INTERACTION_CONTRACT_ID, "topo_interaction_and_color/v1");
  assert.equal(TOPO_DISPLAY_MAPPING_ID, "signed-log10");
  assert.equal(TOPO_REFERENCE_SCALE, 4);
  assert.equal(TOPO_DISPLAY_CLIP_MAGNITUDE, 64);
  assert.equal(TOPO_FIELD_COLOR_GAIN, 70);
  assert.equal(TOPO_DEFAULT_CONTOUR_DENSITY, 0.4);
  assert.equal(TOPO_DEFAULT_CONTOUR_VISIBILITY, 0.75);
  assert.ok(TOPO_FIRST_CONTOUR_BUDGET_MS <= 34);

  for (const rawValue of [-64, -4, -0.25, 0, 0.25, 4, 64]) {
    closeTo(inverseTopoTransform(transformTopoValue(rawValue)), rawValue);
  }
  closeTo(transformTopoValue(0), 0);
  for (const magnitude of [0.001, 0.01, 0.1, 1, 4, 16, 64]) {
    closeTo(transformTopoValue(-magnitude), -transformTopoValue(magnitude));
    closeTo(
      normalizeTopoFieldColorValue(-magnitude),
      -normalizeTopoFieldColorValue(magnitude),
    );
  }
  const monotone = [0, 0.001, 0.01, 0.1, 1, 4, 16, 64]
    .map(normalizeTopoDisplayValue);
  assert.equal(
    monotone.every((value, index) => index === 0 || value > monotone[index - 1]),
    true,
  );
});

test("inverse-square wake magnitude is anchored at the first contour", () => {
  closeTo(
    TOPO_INVERSE_SQUARE_SCALE,
    TOPO_DISPLAY_CLIP_MAGNITUDE * TOPO_SYNTHETIC_CONTOUR_DELAY_RANGE.anchor ** 2,
  );
  const anchorPoint = {
    x: TOPO_SOURCE_POSITION.x - TOPO_SYNTHETIC_CONTOUR_DELAY_RANGE.anchor,
    y: TOPO_SOURCE_POSITION.y,
    beta: 0,
    polaritySign: -1,
  };
  closeTo(
    syntheticTopoSignedValue(anchorPoint),
    -TOPO_DISPLAY_CLIP_MAGNITUDE,
  );
  const farther = { ...anchorPoint, x: TOPO_SOURCE_POSITION.x - 0.05 };
  closeTo(
    Math.abs(syntheticTopoSignedValue(farther)),
    Math.abs(syntheticTopoSignedValue(anchorPoint)) / 4,
  );
});

test("beta-one leading pixels use neutral Electric Purple without fabricated zero", () => {
  const sampler = createTopoSyntheticRawSampler({ beta: 1, polaritySign: -1 });
  const leading = sampler(0.82, TOPO_SOURCE_POSITION.y);
  assert.equal(leading, Number.POSITIVE_INFINITY);
  assert.deepEqual(createTopoSampleRgb(leading), [143, 0, 255]);
  assert.equal(topoPreviewResultAt({
    x: 0.82,
    y: TOPO_SOURCE_POSITION.y,
    beta: 1,
    polaritySign: -1,
  }).rawValue, null);
});

test("Contour range maps continuously from one to three decades", () => {
  closeTo(topoContourRangeDecades(0), 1);
  closeTo(topoContourRangeDecades(0.4), 2);
  closeTo(topoContourRangeDecades(1), 3);
  closeTo(topoContourRangeDecades(0.2), 1.5);
  closeTo(topoContourRangeDecades(0.7), 2.5);

  const minimum = createTopoSyntheticContourSelection(0);
  const partial = createTopoSyntheticContourSelection(0.2);
  const normal = createTopoSyntheticContourSelection(0.4);
  const maximum = createTopoSyntheticContourSelection(1);
  assert.deepEqual([minimum.length, normal.length, maximum.length], [4, 7, 10]);
  assert.equal(partial.length, 6);
  closeTo(partial.at(-1).revealWeight, 0.5);
  assert.equal(partial.slice(0, -1).every(({ revealWeight }) => revealWeight === 1), true);
  assert.deepEqual(
    minimum.map(({ causalDelay }) => causalDelay),
    partial.slice(0, minimum.length).map(({ causalDelay }) => causalDelay),
  );
  assert.deepEqual(
    normal.map(({ causalDelay }) => causalDelay),
    maximum.slice(0, normal.length).map(({ causalDelay }) => causalDelay),
  );
  assert.deepEqual(
    maximum.filter(({ majorDecade }) => majorDecade).map(({ latticeIndex }) => latticeIndex),
    [0, 3, 6, 9],
  );
  assert.deepEqual(
    maximum.filter(({ majorDecade }) => majorDecade).map(({ majorDecadeLabel }) => majorDecadeLabel),
    ["10⁰", "10⁻¹", "10⁻²", "10⁻³"],
  );
});

test("three logarithmic intensity levels per decade keep fixed anchors", () => {
  const selection = createTopoSyntheticContourSelection(1);
  assert.equal(selection.length, TOPO_SYNTHETIC_CONTOUR_DELAY_RANGE.masterCount);
  closeTo(selection[0].causalDelay, 0.025);
  for (let index = 1; index < selection.length; index += 1) {
    closeTo(
      selection[index].causalDelay / selection[index - 1].causalDelay,
      10 ** (1 / 6),
    );
    const currentIntensity = TOPO_INVERSE_SQUARE_SCALE /
      selection[index].causalDelay ** 2;
    const priorIntensity = TOPO_INVERSE_SQUARE_SCALE /
      selection[index - 1].causalDelay ** 2;
    closeTo(currentIntensity / priorIntensity, 10 ** (-1 / 3));
  }
  for (const majorIndex of [0, 3, 6, 9]) {
    closeTo(
      selection[majorIndex].causalDelay / selection[0].causalDelay,
      10 ** (majorIndex / 6),
    );
  }
});

test("contour visibility and sequential fade stay monotone during reveal", () => {
  assert.deepEqual(createTopoContourEmphasis(0), {
    opacity: 0,
    whiteMix: 0,
    widthCss: 0.8,
  });
  assert.deepEqual(createTopoContourEmphasis(), {
    opacity: 0.75,
    whiteMix: 0.75,
    widthCss: 1.7,
  });
  assert.deepEqual(createTopoContourEmphasis(1), {
    opacity: 1,
    whiteMix: 1,
    widthCss: 2,
  });

  const count = TOPO_SYNTHETIC_CONTOUR_DELAY_RANGE.masterCount;
  const styles = Array.from({ length: count }, (_, index) =>
    createTopoSequentialContourStyle({ index, count, visibility: 0.75 }));
  for (let index = 1; index < styles.length; index += 1) {
    assert.ok(styles[index].opacity <= styles[index - 1].opacity);
    assert.ok(styles[index].whiteMix <= styles[index - 1].whiteMix);
    assert.ok(styles[index].widthCss <= styles[index - 1].widthCss);
  }
  const plan = createTopoSyntheticContourRenderPlan({
    beta: 0.5,
    contourDensity: 0.2,
  });
  const effectiveOpacities = plan.map((circle) =>
    createTopoSequentialContourStyle({
      index: circle.latticeIndex,
      count,
      visibility: 0.75,
    }).opacity * circle.revealWeight);
  assert.equal(effectiveOpacities.every((opacity, index) =>
    index === 0 || opacity <= effectiveOpacities[index - 1]), true);
});

test("analytic contours are exact complete causal-delay circles and raw isolines", () => {
  const causalDelays = createTopoSyntheticContourSelection(1)
    .map(({ causalDelay }) => causalDelay);
  for (const beta of [0, 0.5, 1]) {
    const circles = createTopoSyntheticContourCircles({ beta, causalDelays });
    assert.equal(circles.length, causalDelays.length);
    for (const circle of circles) {
      closeTo(circle.center.x, TOPO_SOURCE_POSITION.x - beta * circle.radius);
      closeTo(circle.center.y, TOPO_SOURCE_POSITION.y);
      closeTo(circle.rawMagnitude, TOPO_INVERSE_SQUARE_SCALE / circle.radius ** 2);
      if (beta === 0) {
        closeTo(circle.center.x, TOPO_SOURCE_POSITION.x);
      }
      if (beta === 1) {
        closeTo(circle.center.x + circle.radius, TOPO_SOURCE_POSITION.x);
      }
      for (let index = beta === 1 ? 1 : 0; index < 32; index += 1) {
        const angle = index * Math.PI * 2 / 32;
        const point = {
          x: circle.center.x + circle.radius * Math.cos(angle),
          y: circle.center.y + circle.radius * Math.sin(angle),
        };
        closeTo(syntheticTopoCausalDelay({ ...point, beta }), circle.causalDelay, 1e-9);
        closeTo(
          Math.abs(syntheticTopoSignedValue({ ...point, beta, polaritySign: -1 })),
          circle.rawMagnitude,
          1e-8,
        );
      }
    }
  }
});

test("true x-y chart maps equal pixel distances to equal beta-zero values", () => {
  const width = 916;
  const height = 720;
  const offset = 120;
  const sourcePixelX = TOPO_SOURCE_POSITION.x * (width - 1);
  const sourcePixelY = (1 - TOPO_SOURCE_POSITION.y) * (height - 1);
  const horizontal = topoWorldPointForCanvasPixel({
    pixelX: sourcePixelX + offset,
    pixelY: sourcePixelY,
    width,
    height,
  });
  const vertical = topoWorldPointForCanvasPixel({
    pixelX: sourcePixelX,
    pixelY: sourcePixelY - offset,
    width,
    height,
  });
  closeTo(horizontal.x - TOPO_SOURCE_POSITION.x, vertical.y - TOPO_SOURCE_POSITION.y);
  closeTo(
    syntheticTopoSignedValue({ ...horizontal, beta: 0, polaritySign: -1 }),
    syntheticTopoSignedValue({ ...vertical, beta: 0, polaritySign: -1 }),
  );
});

test("analytic display-pixel reference is deterministic for both polarities", () => {
  const sample = { pixelX: 210, pixelY: 357, width: 916, height: 720 };
  for (const beta of [0, 0.5, 0.83, 1]) {
    const electrino = createTopoAnalyticFieldRgbAtCanvasPixel({
      ...sample,
      beta,
      polaritySign: -1,
    });
    const positrino = createTopoAnalyticFieldRgbAtCanvasPixel({
      ...sample,
      beta,
      polaritySign: 1,
    });
    assert.equal(electrino.every(Number.isInteger), true);
    assert.equal(positrino.every(Number.isInteger), true);
    assert.notDeepEqual(electrino, positrino);
  }
});

test("scenario polarity changes preserve beta, range, and visibility", () => {
  const configured = {
    beta: 0.73,
    contourDensity: 0.418,
    contourVisibility: 0.867,
  };
  const positrino = applyTopoScenarioPolarity(configured, "positrino");
  const electrino = applyTopoScenarioPolarity(positrino, "electrino");
  assert.deepEqual(positrino, {
    ...configured,
    scenarioId: "positrino",
    polaritySign: 1,
  });
  assert.deepEqual(electrino, {
    ...configured,
    scenarioId: "electrino",
    polaritySign: -1,
  });
});

test("private provider states remain distinct from visible neutral color", () => {
  const sampler = createTopoSyntheticRawSampler({ beta: 1, polaritySign: -1 });
  assert.equal(Number.isNaN(sampler(...Object.values(TOPO_SOURCE_POSITION))), true);
  assert.equal(sampler(0.8, 0.5), Number.POSITIVE_INFINITY);
  assert.ok(Number.isFinite(sampler(0.3, 0.5)));
  closeTo(
    sampler(0.3, 0.5),
    topoPreviewResultAt({ x: 0.3, y: 0.5, beta: 1, polaritySign: -1 }).rawValue,
    1e-5,
  );
});

test("canvas resolution follows device density until its safety ceiling", () => {
  assert.deepEqual(resolveTopoCanvasPixelSize({
    cssWidth: 1280,
    cssHeight: 720,
    devicePixelRatio: 2,
  }), {
    width: 2560,
    height: 1440,
    requestedWidth: 2560,
    requestedHeight: 1440,
    safetyScale: 1,
  });
  const bounded = resolveTopoCanvasPixelSize({
    cssWidth: 8000,
    cssHeight: 6000,
    devicePixelRatio: 2,
  });
  assert.ok(bounded.width <= 4096);
  assert.ok(bounded.height <= 4096);
  assert.ok(bounded.width * bounded.height <= 12 * 1024 * 1024 + 4096);
});

test("accepted palette, axis, and frame identity remain fixed", () => {
  assert.deepEqual(createTopoSignedRgb(-1), [37, 99, 235]);
  assert.deepEqual(createTopoSignedRgb(0), [143, 0, 255]);
  assert.deepEqual(createTopoSignedRgb(1), [220, 38, 38]);
  assert.deepEqual(TOPO_TRANSLATION_AXIS, {
    startX: 0.1,
    endX: 0.9,
    opacity: 0.52,
    widthCss: 1,
    dashCss: 5,
    arrowCss: 5,
  });
  assert.equal(
    createTopoPreviewFrameIdentity({ beta: 0.5, polaritySign: -1 }),
    "topo_synthetic_causal_envelope/v1:electrino:beta=0.50",
  );
});

test("Topo UI exposes the fixed logarithmic architecture and preserves Home", () => {
  const html = readRepoFile("topo.html");
  const css = readRepoFile("src/apps/topo/topo.css");
  const runtime = readRepoFile("src/apps/topo/TopoInteractionContractRuntime.js");
  const tokens = readRepoFile("ui-tokens.css");

  assert.match(runtime, /createPanelCollapseIconSvg/u);
  assert.match(runtime, /navigateStandaloneAppHome/u);
  assert.match(runtime, /resolveStandaloneAppHomeHref/u);
  assert.match(runtime, /createStandaloneAppSceneSearchRuntime/u);
  assert.match(runtime, /panelContent\.inert = collapsed/u);
  assert.match(runtime, /getContext\("webgl"/u);
  assert.match(runtime, /createTopoSyntheticContourRenderPlan/u);
  assert.match(runtime, /contourStagingContext\.arc\(/u);
  assert.match(runtime, /drawMajorDecadeLabels/u);
  assert.match(runtime, /compact = cssWidth < 520/u);
  assert.match(runtime, /intersectionX - 7 \* pixelRatio/u);
  assert.match(runtime, /minimumLabelX = \(compact \? 82 : 28\) \* pixelRatio/u);
  assert.match(runtime, /globalAlpha = 0\.82 \* circle\.revealWeight/u);
  assert.match(runtime, /sourcePixelY - \(8 \+ tier \* \(compact \? 10 : 11\)\) \* pixelRatio/u);
  assert.match(runtime, /Math\.abs\(position\.x - labelX\) < 30 \* pixelRatio/u);
  assert.doesNotMatch(runtime, /suppressed-responsive/u);
  assert.match(runtime, /contourRadii/u);
  assert.match(runtime, /TOPO_INVERSE_SQUARE_SCALE/u);
  assert.match(runtime, /log\(1\.0 \+ magnitude \/ 4\.0\) \/ log\(17\.0\)/u);
  assert.doesNotMatch(runtime, /transformId|u_transform|scheduleTransformChange|dom\.transform/u);

  assert.match(html, /<title>Architrino Wake Intensity Map<\/title>/u);
  assert.match(html, /<h1>Wake Intensity Map<\/h1>/u);
  assert.match(html, /Two-dimensional prescribed-motion slice/u);
  assert.match(html, /<h2 id="topo-about-title">About this view<\/h2>/u);
  assert.match(html, /<span>Contour range<\/span>/u);
  assert.match(html, />2\.0 decades<\/output>/u);
  assert.match(html, /3 levels \/ decade · I ∝ 1\/r²/u);
  assert.match(html, /id="topo-legend-mapping"/u);
  assert.doesNotMatch(html, /Scale transform|topo-transform|Linear|Signed log2|Asinh/u);
  assert.doesNotMatch(html, /Raw probe|Nonnumeric state legend|topo-stage-caption/u);
  assert.match(html, /id="home-button"[\s\S]*id="nav-up"[\s\S]*id="nav-forward"[\s\S]*id="scene-search"/u);

  assert.match(css, /\.topo-range-note/u);
  assert.match(css, /@media \(max-width: 820px\)/u);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/u);
  assert.match(css, /input::-webkit-slider-runnable-track \{[\s\S]*height: 5px;/u);
  assert.match(css, /input:focus-visible::-webkit-slider-thumb/u);
  assert.match(tokens, /--ui-color-electric-purple: #8f00ff;/u);
  assert.match(tokens, /--ui-data-zero: var\(--ui-color-electric-purple\);/u);
});

test("Applications retains four category scenes and all fifteen direct app routes", () => {
  const applications = JSON.parse(
    readRepoFile("content/scenes/archie/applications.json"),
  );
  const categories = [
    ["learn_reference", "applications_learn_reference.json", [
      "atom", "causal_delay_feedback", "greek_letter_match",
      "hyde_periodic_table", "periodic_table", "standard_model",
    ]],
    ["explore_models", "applications_explore_models.json", [
      "lattice_lab", "ideal_braid", "molecule", "photon", "topo",
    ]],
    ["analyze_evidence", "applications_analyze_evidence.json", [
      "braid_search", "equation_mapping",
    ]],
    ["build_simulate", "applications_build_simulate.json", ["animator", "borg"]],
  ];
  assert.deepEqual(
    applications.scene.children.map(({ nodeId }) => nodeId),
    categories.map(([categoryId]) => categoryId),
  );
  const appIds = [];
  for (const [categoryId, fileName, expectedIds] of categories) {
    const category = JSON.parse(readRepoFile("content/scenes/archie/" + fileName));
    assert.equal(
      applications.scene.children.find(({ nodeId }) => nodeId === categoryId)?.scenePath,
      "content/scenes/archie/" + fileName,
    );
    assert.deepEqual(category.scene.children.map(({ nodeId }) => nodeId), expectedIds);
    appIds.push(...expectedIds);
  }
  assert.equal(appIds.length, 15);
  assert.equal(new Set(appIds).size, 15);
  assert.equal(getStandaloneAppPathForScene("topo"), "topo.html");
  assert.equal(
    getStandaloneAppPathForScene("content/scenes/archie/topo.json"),
    "topo.html",
  );
});
