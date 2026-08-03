import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  TOPO_DEFAULT_CONTOUR_DENSITY,
  TOPO_DEFAULT_CONTOUR_LEVELS,
  TOPO_DEFAULT_CONTOUR_VISIBILITY,
  TOPO_DEFAULT_TRANSFORM,
  TOPO_CONTOUR_PROMINENCE_FLOOR,
  TOPO_CONTOUR_PROMINENCE_REFERENCE_DELAY,
  TOPO_DISPLAY_CLIP_MAGNITUDE,
  TOPO_FIELD_COLOR_GAIN,
  TOPO_FIELD_PERCEPTIBILITY_THRESHOLD,
  TOPO_FIRST_CONTOUR_BUDGET_MS,
  TOPO_INTERACTION_CONTRACT_ID,
  TOPO_REFERENCE_SCALE,
  TOPO_SOURCE_POSITION,
  applyTopoScenarioPolarity,
  createTopoContourDensityPlan,
  createTopoContourEmphasis,
  createTopoContourStyleProfile,
  createTopoContourThresholds,
  createTopoAnalyticFieldRgbAtCanvasPixel,
  createTopoSyntheticContourCircles,
  createTopoPreviewFrameIdentity,
  createTopoSampleRgb,
  createTopoSignedRgb,
  createTopoSyntheticRawSampler,
  forEachTopoContourSegment,
  inverseTopoTransform,
  measureTopoCenterlineColorFootprint,
  normalizeTopoFieldColorValue,
  normalizeTopoDisplayValue,
  resolveTopoCanvasPixelSize,
  syntheticTopoCausalDelay,
  syntheticTopoSignedValue,
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

test("TOPO-002 freezes the transform defaults and exact inverse pairs", () => {
  assert.equal(TOPO_INTERACTION_CONTRACT_ID, "topo_interaction_and_color/v1");
  assert.equal(TOPO_DEFAULT_TRANSFORM, "asinh");
  assert.equal(TOPO_REFERENCE_SCALE, 4);
  assert.equal(TOPO_DISPLAY_CLIP_MAGNITUDE, 64);
  assert.equal(TOPO_DEFAULT_CONTOUR_LEVELS, 24);
  assert.equal(TOPO_DEFAULT_CONTOUR_DENSITY, 0.4);
  assert.equal(TOPO_DEFAULT_CONTOUR_VISIBILITY, 0.75);
  assert.deepEqual(TOPO_FIELD_COLOR_GAIN, {
    linear: 900,
    "signed-log2": 70,
    asinh: 90,
  });
  assert.equal(TOPO_FIELD_PERCEPTIBILITY_THRESHOLD, 0.3);
  assert.ok(TOPO_FIRST_CONTOUR_BUDGET_MS <= 34);

  for (const transformId of ["linear", "signed-log2", "asinh"]) {
    for (const rawValue of [-64, -4, -0.25, 0, 0.25, 4, 64]) {
      closeTo(
        inverseTopoTransform(
          transformTopoValue(rawValue, transformId),
          transformId,
        ),
        rawValue,
      );
    }
  }
});

test("field-color calibration broadens every transform without changing zero or sign", () => {
  assert.deepEqual(createTopoSampleRgb(0), [143, 0, 255]);
  assert.deepEqual(createTopoSampleRgb(Number.POSITIVE_INFINITY), [143, 0, 255]);

  for (const transformId of ["linear", "signed-log2", "asinh"]) {
    closeTo(normalizeTopoFieldColorValue(0, transformId), 0);
    for (const magnitude of [0.001, 0.01, 0.1, 1, 4, 16, 64]) {
      closeTo(
        normalizeTopoFieldColorValue(-magnitude, transformId),
        -normalizeTopoFieldColorValue(magnitude, transformId),
      );
    }
    const monotone = [0, 0.001, 0.01, 0.1, 1, 4, 16, 64].map(
      (rawValue) => normalizeTopoFieldColorValue(rawValue, transformId),
    );
    assert.equal(
      monotone.every((value, index) => index === 0 || value > monotone[index - 1]),
      true,
    );
    const baseline = measureTopoCenterlineColorFootprint({
      transformId,
      calibrated: false,
    });
    const calibrated = measureTopoCenterlineColorFootprint({ transformId });
    assert.ok(calibrated.start <= 0.25, transformId + " reaches x <= 0.25");
    assert.ok(calibrated.end >= 0.8, transformId + " reaches x >= 0.80");
    assert.ok(
      calibrated.width >= 2 * baseline.width,
      transformId + " footprint is at least twice the baseline width",
    );
  }
});

test("beta-one leading pixels use neutral Electric Purple without fabricating raw zero", () => {
  const sampler = createTopoSyntheticRawSampler({ beta: 1, polaritySign: -1 });
  const leading = sampler(0.82, TOPO_SOURCE_POSITION.y);
  assert.equal(leading, Number.POSITIVE_INFINITY);
  assert.deepEqual(createTopoSampleRgb(leading), [143, 0, 255]);
  assert.equal(
    topoPreviewResultAt({
      x: 0.82,
      y: TOPO_SOURCE_POSITION.y,
      beta: 1,
      polaritySign: -1,
    }).rawValue,
    null,
  );
});

test("contour density fades valid fixed isolines without moving them", () => {
  const minimum = createTopoContourDensityPlan(0);
  const middle = createTopoContourDensityPlan(0.501);
  const maximum = createTopoContourDensityPlan(1);

  assert.equal(minimum.length, 47);
  assert.deepEqual(
    minimum.map(({ normalized }) => normalized),
    middle.map(({ normalized }) => normalized),
  );
  assert.deepEqual(
    middle.map(({ normalized }) => normalized),
    maximum.map(({ normalized }) => normalized),
  );
  assert.equal(minimum.filter(({ weight }) => weight === 1).length, 7);
  assert.equal(minimum.filter(({ weight }) => weight === 0).length, 40);
  assert.equal(middle.some(({ weight }) => weight > 0 && weight < 1), true);
  assert.equal(maximum.every(({ weight }) => weight === 1), true);
  assert.equal(
    middle.every(({ weight }, index) => weight >= minimum[index].weight),
    true,
  );
});

test("contour visibility continuously reaches one crisp canonical-white stroke", () => {
  assert.deepEqual(createTopoContourEmphasis(0), {
    opacity: 0,
    whiteMix: 0,
    widthCss: 0.8,
  });
  assert.deepEqual(createTopoContourEmphasis(0.6), {
    opacity: 0.6,
    whiteMix: 0.6,
    widthCss: 1.52,
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
});

test("contour style applies one inverse-square prominence per exact circle", () => {
  assert.equal(TOPO_CONTOUR_PROMINENCE_REFERENCE_DELAY, 0.08);
  assert.equal(TOPO_CONTOUR_PROMINENCE_FLOOR, 0.22);
  const delays = [0.04, 0.08, 0.1, 0.12, 0.16, 0.24];
  const styles = delays.map((causalDelay) =>
    createTopoContourStyleProfile({ causalDelay, visibility: 0.75 }));
  for (let index = 1; index < styles.length; index += 1) {
    assert.ok(styles[index].prominence <= styles[index - 1].prominence);
    assert.ok(styles[index].opacity <= styles[index - 1].opacity);
    assert.ok(styles[index].whiteMix <= styles[index - 1].whiteMix);
    assert.ok(styles[index].widthCss <= styles[index - 1].widthCss);
  }
  closeTo(styles[2].prominence, (0.08 / 0.1) ** 2);
  closeTo(styles[3].prominence, (0.08 / 0.12) ** 2);
  closeTo(
    styles[2].prominence / styles[3].prominence,
    (0.12 / 0.1) ** 2,
  );
  const defaultInner = createTopoContourStyleProfile({
    causalDelay: 0.04,
    visibility: 0.75,
  });
  assert.deepEqual(defaultInner, {
    prominence: 1,
    readableProminence: 1,
    opacity: 0.75,
    whiteMix: 0.75,
    widthCss: 1.7,
  });
  const maximumOuter = createTopoContourStyleProfile({
    causalDelay: 0.24,
    visibility: 1,
  });
  assert.equal(maximumOuter.prominence < 1, true);
  assert.equal(maximumOuter.opacity < 1, true);
  assert.equal(maximumOuter.whiteMix < 1, true);
  assert.equal(maximumOuter.widthCss < 2, true);
  assert.equal(
    createTopoContourStyleProfile({ causalDelay: 0.1, visibility: 0 }).opacity,
    0,
  );
});

test("analytic synthetic contours are exact complete causal-delay circles", () => {
  const normalizedLevels = [0.125, 0.25, 0.5, 0.75];
  for (const beta of [0, 0.5, 1]) {
    const circles = createTopoSyntheticContourCircles({
      beta,
      transformId: "asinh",
      normalizedLevels,
    });
    assert.deepEqual(circles.map(({ level }) => level), normalizedLevels);
    for (const circle of circles) {
      closeTo(circle.center.x, TOPO_SOURCE_POSITION.x - beta * circle.radius);
      closeTo(circle.center.y, TOPO_SOURCE_POSITION.y);
      assert.ok(circle.radius > 0);
      if (beta === 0) {
        closeTo(circle.center.x, TOPO_SOURCE_POSITION.x);
      }
      if (beta === 1) {
        closeTo(circle.center.x + circle.radius, TOPO_SOURCE_POSITION.x);
      }
      for (let index = 0; index < 32; index += 1) {
        if (beta === 1 && index === 0) {
          continue;
        }
        const angle = index * Math.PI * 2 / 32;
        const point = {
          x: circle.center.x + circle.radius * Math.cos(angle),
          y: circle.center.y + circle.radius * Math.sin(angle),
        };
        closeTo(syntheticTopoCausalDelay({ ...point, beta }), circle.causalDelay, 1e-10);
        closeTo(
          Math.abs(syntheticTopoSignedValue({ ...point, beta, polaritySign: -1 })),
          circle.rawMagnitude,
          1e-9,
        );
      }
    }
  }
});

test("beta zero raw values use one Euclidean pixel scale on a wide canvas", () => {
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

test("analytic display-pixel reference stays deterministic across field states", () => {
  const sample = { pixelX: 210, pixelY: 357, width: 916, height: 720 };
  for (const beta of [0, 0.5, 0.83, 1]) {
    for (const transformId of ["linear", "signed-log2", "asinh"]) {
      const electrino = createTopoAnalyticFieldRgbAtCanvasPixel({
        ...sample,
        beta,
        transformId,
        polaritySign: -1,
      });
      const positrino = createTopoAnalyticFieldRgbAtCanvasPixel({
        ...sample,
        beta,
        transformId,
        polaritySign: 1,
      });
      assert.equal(electrino.length, 3);
      assert.equal(positrino.length, 3);
      assert.equal(electrino.every(Number.isInteger), true);
      assert.equal(positrino.every(Number.isInteger), true);
      assert.notDeepEqual(electrino, positrino);
    }
  }
});

test("TOPO-002 contour thresholds are uniform in transformed display space", () => {
  for (const transformId of ["linear", "signed-log2", "asinh"]) {
    const thresholds = createTopoContourThresholds(24, transformId);
    assert.equal(thresholds.length, 25);
    assert.equal(thresholds[0].normalized, -1);
    assert.equal(thresholds[12].normalized, 0);
    assert.equal(thresholds.at(-1).normalized, 1);
    closeTo(thresholds[0].raw, -64);
    closeTo(thresholds.at(-1).raw, 64);
    for (let index = 1; index < thresholds.length; index += 1) {
      closeTo(
        thresholds[index].normalized - thresholds[index - 1].normalized,
        1 / 12,
      );
    }
  }
});

test("synthetic comparison surface reverses sign without changing raw magnitude", () => {
  const sample = { x: 0.24, y: 0.61, beta: 0.5 };
  const electrino = syntheticTopoSignedValue({
    ...sample,
    polaritySign: -1,
  });
  const positrino = syntheticTopoSignedValue({
    ...sample,
    polaritySign: 1,
  });
  closeTo(positrino, -electrino);
  closeTo(Math.abs(positrino), Math.abs(electrino));
});

test("scenario polarity switches preserve every independent interaction control", () => {
  const configured = {
    beta: 0.73,
    contourDensity: 0.418,
    contourVisibility: 0.867,
    transformId: "signed-log2",
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

test("synthetic comparison surface has one source-anchored causal center", () => {
  const trailing = { x: TOPO_SOURCE_POSITION.x - 0.2, y: TOPO_SOURCE_POSITION.y };
  const leading = { x: TOPO_SOURCE_POSITION.x + 0.2, y: TOPO_SOURCE_POSITION.y };

  closeTo(syntheticTopoCausalDelay({ ...trailing, beta: 0 }), 0.2);
  closeTo(
    syntheticTopoCausalDelay({ ...trailing, beta: 0 }),
    syntheticTopoCausalDelay({ ...leading, beta: 0 }),
  );
  assert.ok(
    syntheticTopoCausalDelay({ ...trailing, beta: 0.5 }) <
      syntheticTopoCausalDelay({ ...leading, beta: 0.5 }),
  );
  assert.ok(
    Math.abs(syntheticTopoSignedValue({ ...trailing, beta: 0.5 })) >
      Math.abs(syntheticTopoSignedValue({ ...leading, beta: 0.5 })),
  );
  assert.ok(
    syntheticTopoSignedValue({ ...trailing, beta: 0.5, polaritySign: -1 }) < 0,
  );
  assert.ok(
    syntheticTopoSignedValue({ ...leading, beta: 0.5, polaritySign: -1 }) < 0,
  );
});

test("cached-frame sampler preserves ordinary and nonnumeric provider states", () => {
  const sampler = createTopoSyntheticRawSampler({
    beta: 1,
    polaritySign: -1,
  });
  assert.equal(Number.isNaN(sampler(TOPO_SOURCE_POSITION.x, TOPO_SOURCE_POSITION.y)), true);
  assert.equal(sampler(0.8, 0.5), Number.POSITIVE_INFINITY);
  assert.ok(Number.isFinite(sampler(0.3, 0.5)));
  closeTo(
    sampler(0.3, 0.5),
    topoPreviewResultAt({ x: 0.3, y: 0.5, beta: 1, polaritySign: -1 }).rawValue,
    1e-5,
  );
});

test("canvas resolution follows device density until the safety ceiling", () => {
  assert.deepEqual(
    resolveTopoCanvasPixelSize({
      cssWidth: 1280,
      cssHeight: 720,
      devicePixelRatio: 2,
    }),
    {
      width: 2560,
      height: 1440,
      requestedWidth: 2560,
      requestedHeight: 1440,
      safetyScale: 1,
    },
  );
  const bounded = resolveTopoCanvasPixelSize({
    cssWidth: 8000,
    cssHeight: 6000,
    devicePixelRatio: 2,
  });
  assert.ok(bounded.width <= 4096);
  assert.ok(bounded.height <= 4096);
  assert.ok(bounded.width * bounded.height <= 12 * 1024 * 1024 + 4096);
  assert.ok(bounded.safetyScale < 1);
});

test("contour interpolation produces an anti-aliasable geometric segment", () => {
  const segments = [];
  const count = forEachTopoContourSegment({
    values: new Float32Array([-1, 1, -1, 1]),
    columns: 2,
    rows: 2,
    levels: [0],
    onSegment(start, end, level) {
      segments.push({ start, end, level });
    },
  });
  assert.equal(count, 1);
  assert.deepEqual(segments, [{
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
    level: 0,
  }]);
});

test("display transforms and contours leave the selected raw sample unchanged", () => {
  const sample = { x: 0.35, y: 0.58, beta: 0.75, polaritySign: -1 };
  const rawValue = syntheticTopoSignedValue(sample);
  const displayValues = ["linear", "signed-log2", "asinh"].map((transformId) => ({
    normalized: normalizeTopoDisplayValue(rawValue, transformId),
    thresholds: createTopoContourThresholds(TOPO_DEFAULT_CONTOUR_LEVELS, transformId),
  }));

  assert.equal(syntheticTopoSignedValue(sample), rawValue);
  assert.equal(displayValues.every((entry) => Number.isFinite(entry.normalized)), true);
  assert.equal(displayValues.every((entry) => entry.thresholds.length === 25), true);
});

test("preview result states distinguish source, field-speed unavailability, and ordinary values", () => {
  assert.deepEqual(TOPO_SOURCE_POSITION, { x: 2 / 3, y: 1 / 2 });
  assert.equal(
    topoPreviewResultAt({
      ...TOPO_SOURCE_POSITION,
      beta: 0.5,
      polaritySign: -1,
    }).state,
    "singular:endpoint_source",
  );
  assert.equal(
    topoPreviewResultAt({
      ...TOPO_SOURCE_POSITION,
      beta: 1,
      polaritySign: -1,
    }).state,
    "nonordinary:degenerate_root_family",
  );
  assert.equal(
    topoPreviewResultAt({
      x: 0.8,
      y: 0.5,
      beta: 1,
      polaritySign: -1,
    }).state,
    "unavailable:no_positive_causal_root",
  );
  assert.match(
    topoPreviewResultAt({
      x: 0.3,
      y: 0.5,
      beta: 1,
      polaritySign: -1,
    }).state,
    /^ordinary/u,
  );
});

test("signed palette anchors negative blue, zero Electric Purple, and positive red", () => {
  assert.deepEqual(createTopoSignedRgb(-1), [37, 99, 235]);
  assert.deepEqual(createTopoSignedRgb(0), [143, 0, 255]);
  assert.deepEqual(createTopoSignedRgb(1), [220, 38, 38]);
});

test("preview frame identity excludes display-only controls", () => {
  const identity = createTopoPreviewFrameIdentity({
    beta: 0.5,
    polaritySign: -1,
  });
  assert.equal(
    identity,
    "topo_synthetic_causal_envelope/v1:electrino:beta=0.50",
  );
  assert.equal(identity.includes("contour"), false);
  assert.equal(identity.includes("asinh"), false);
});

test("Topo preview uses shared shell primitives and preserves Home behavior", () => {
  const html = readRepoFile("topo.html");
  const css = readRepoFile("src/apps/topo/topo.css");
  const runtime = readRepoFile("src/apps/topo/TopoInteractionContractRuntime.js");
  const tokens = readRepoFile("ui-tokens.css");

  assert.match(runtime, /createPanelCollapseIconSvg/u);
  assert.match(runtime, /navigateStandaloneAppHome/u);
  assert.match(runtime, /resolveStandaloneAppHomeHref/u);
  assert.match(runtime, /createStandaloneAppSceneSearchRuntime/u);
  assert.match(runtime, /panelContent\.inert = collapsed/u);
  assert.match(runtime, /aria-hidden/u);
  assert.match(runtime, /resolveTopoCanvasPixelSize/u);
  assert.match(runtime, /createTopoSyntheticContourCircles/u);
  assert.match(runtime, /targetContext\.arc\(x, y, radius, 0, Math\.PI \* 2\)/u);
  assert.match(runtime, /ARCHITRINO_BODY_OUTLINE_WIDTH \* pixelRatio/u);
  assert.match(runtime, /\[WHITE\.r, WHITE\.g, WHITE\.b\]/u);
  assert.doesNotMatch(runtime, /upperJoinAngle/u);
  assert.doesNotMatch(runtime, /shadowBlur|globalCompositeOperation/u);
  assert.doesNotMatch(runtime, /960 \/ requestedWidth|720 \/ requestedHeight/u);
  assert.match(runtime, /PHOTON_CHARGE_COLORS\.electrino/u);
  assert.match(runtime, /rawFrameCache/u);
  assert.match(runtime, /rawFrameCaches/u);
  assert.match(runtime, /displays: new Map\(\)/u);
  assert.doesNotMatch(runtime, /drawFastContourPreview|drawSmoothContours/u);
  assert.match(runtime, /contourStagingContext\.arc\(/u);
  assert.match(runtime, /fieldRenderer = analyticFieldRenderer/u);
  assert.match(runtime, /getContext\("webgl"/u);
  assert.match(runtime, /contourContext\.drawImage\(contourStagingCanvas/u);
  assert.match(runtime, /lastFirstContourLatencyMs/u);
  assert.match(runtime, /Updating contour lines from the cached field/u);
  assert.match(html, /id="home-button"[\s\S]*id="nav-up"[\s\S]*id="nav-forward"[\s\S]*id="scene-search"/u);
  assert.match(html, /<title>Architrino Wake Intensity Map<\/title>/u);
  assert.match(html, /<h1>Wake Intensity Map<\/h1>/u);
  assert.match(html, /Two-dimensional prescribed-motion slice/u);
  assert.doesNotMatch(html, /TOPO-002 preview/u);
  assert.match(html, /<h2 id="topo-about-title">About this view<\/h2>/u);
  assert.match(html, /Explore a theoretical two-dimensional view of signed wake intensity around a prescribed electrino or positrino\./u);
  assert.doesNotMatch(html, /Interaction contract preview|TOPO-001|synthetic causal envelope/u);
  assert.match(html, /id="topo-contours"[\s\S]*step="0\.1"[\s\S]*data-keyboard-step="1"/u);
  assert.match(html, /id="topo-contour-visibility"[\s\S]*aria-label="Contour line visibility"/u);
  assert.match(html, /id="topo-contour-visibility-output"/u);
  assert.match(html, /id="topo-contour-visibility"[\s\S]*value="75"/u);
  assert.match(html, /id="topo-contour-canvas" aria-hidden="true"/u);
  assert.doesNotMatch(html, /Midpoint purple|Temporary comparison|topo-zero-/u);
  assert.doesNotMatch(html, /topo-state-key|Nonnumeric state legend/u);
  assert.doesNotMatch(html, /topo-probe|Raw probe|Raw synthetic/u);
  assert.doesNotMatch(runtime, /currentProbe|handleProbe|updateProbe|getRawSample/u);
  assert.doesNotMatch(html, /topo-stage-caption|DISPLAY-ONLY CONTRACT PREVIEW|Not TOPO-001 data/u);
  assert.doesNotMatch(html, /<dt>Source marker<\/dt>|<dt>Frame<\/dt>|topo-frame-identity/u);
  assert.match(css, /@media \(max-width: 820px\)/u);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/u);
  assert.match(css, /input::-webkit-slider-runnable-track \{[\s\S]*height: 5px;/u);
  assert.match(css, /input:focus-visible::-webkit-slider-thumb/u);
  assert.match(css, /\.topo-range-field input:focus-visible \{\s*outline: none;\s*\}/u);
  assert.match(css, /var\(--ui-stage\)/u);
  assert.match(css, /\.topo-status \{[\s\S]*clip: rect\(0, 0, 0, 0\);/u);
  assert.match(tokens, /--ui-data-negative: #2563eb;/u);
  assert.match(tokens, /--ui-color-electric-purple: #8f00ff;/u);
  assert.match(tokens, /--ui-data-zero: var\(--ui-color-electric-purple\);/u);
  assert.match(tokens, /--ui-data-positive: #dc2626;/u);
  assert.match(css, /\.topo-field select \{[\s\S]*font-family: var\(--ui-font-family\);[\s\S]*font-size: var\(--ui-label-size\);[\s\S]*font-weight: var\(--ui-body-weight\);/u);
  assert.match(css, /\.topo-field select option \{[\s\S]*font-family: var\(--ui-font-family\);/u);
});

test("Applications uses four category spheres and exposes fifteen alphabetized apps", () => {
  const applications = JSON.parse(
    readRepoFile("content/scenes/archie/applications.json"),
  );
  const categories = [
    ["learn_reference", "applications_learn_reference.json", [
      "atom",
      "causal_delay_feedback",
      "greek_letter_match",
      "hyde_periodic_table",
      "periodic_table",
      "standard_model",
    ]],
    ["explore_models", "applications_explore_models.json", [
      "lattice_lab",
      "ideal_braid",
      "molecule",
      "photon",
      "topo",
    ]],
    ["analyze_evidence", "applications_analyze_evidence.json", [
      "braid_search",
      "equation_mapping",
    ]],
    ["build_simulate", "applications_build_simulate.json", [
      "animator",
      "borg",
    ]],
  ];

  assert.deepEqual(
    applications.scene.children.map((entry) => entry.nodeId),
    categories.map(([categoryId]) => categoryId),
  );
  assert.equal(applications.objects.length, 4);

  const appIds = [];
  for (const [categoryId, fileName, expectedIds] of categories) {
    const category = JSON.parse(
      readRepoFile("content/scenes/archie/" + fileName),
    );
    assert.equal(
      applications.scene.children.find((entry) => entry.nodeId === categoryId)
        ?.scenePath,
      "content/scenes/archie/" + fileName,
    );
    assert.deepEqual(
      category.scene.children.map((entry) => entry.nodeId),
      expectedIds,
    );
    assert.deepEqual(
      category.objects.map((entry) => entry.id),
      expectedIds,
    );
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
