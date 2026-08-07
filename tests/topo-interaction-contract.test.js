import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  TOPO_DEFAULT_CONTOUR_RANGE_DECADES,
  TOPO_DEFAULT_CONTOUR_VISIBILITY,
  TOPO_DEFAULT_DISPLAY_SCALE,
  TOPO_DEFAULT_HEATMAP_MODE,
  TOPO_DISPLAY_CLIP_MAGNITUDE,
  TOPO_DISPLAY_MAPPING_ID,
  TOPO_DISPLAY_SCALE_STEP,
  TOPO_EQUAL_RADIUS_CHART_ID,
  TOPO_EXPONENT_RADIUS_CHART_ID,
  TOPO_EXPONENT_RADIUS_MARKER_GAP_CSS,
  TOPO_FIRST_CONTOUR_BUDGET_MS,
  TOPO_INTERACTION_CONTRACT_ID,
  TOPO_HEATMAP_MODE,
  TOPO_INVERSE_SQUARE_SCALE,
  TOPO_MAX_DISPLAY_SCALE,
  TOPO_MIN_DISPLAY_SCALE,
  TOPO_REFERENCE_SCALE,
  TOPO_SOURCE_POSITION,
  TOPO_SYNTHETIC_CONTOUR_DELAY_RANGE,
  TOPO_TRANSLATION_AXIS,
  applyTopoScenarioPolarity,
  createTopoAnalyticFieldRgbAtCanvasPixel,
  createTopoContourEmphasis,
  createTopoContourMagnitudeSchedule,
  createTopoEqualRadiusChart,
  createTopoExponentRadiusChart,
  createTopoPreviewFrameIdentity,
  createTopoSampleRgb,
  createTopoSequentialContourStyle,
  createTopoSignedRgb,
  createTopoSyntheticContourCircles,
  createTopoSyntheticContourRenderPlan,
  createTopoSyntheticContourSelection,
  createTopoSyntheticRawSampler,
  inverseTopoTransform,
  normalizeTopoDisplayScale,
  normalizeTopoDisplayValue,
  normalizeTopoExponentRadiusColorValue,
  normalizeTopoFieldColorValue,
  normalizeTopoPhysicalMagnitudeValue,
  resolveTopoCanvasPixelSize,
  syntheticTopoCausalDelay,
  syntheticTopoSignedValue,
  topoContourRangeDecades,
  topoCanvasPixelForWorldPoint,
  topoEqualRadiusDisplayRadiusForExponent,
  topoExponentDisplayRadiusForExponent,
  topoExponentRadiusPhysicalPointForCanvasPixel,
  topoPhysicalRadiusForWakeExponent,
  topoPreviewResultAt,
  topoWorldPointForCanvasPixel,
  transformTopoValue,
} from "../src/apps/topo/TopoInteractionContract.js";
import {
  TOPO_COLLINEAR_PAIR_HISTORY_MODEL,
  TOPO_COLLINEAR_PAIR_PLAYBACK_SECONDS,
  TOPO_COLLINEAR_PAIR_REFERENCE_BETA,
  TOPO_COLLINEAR_PAIR_SCENARIO_ID,
  TOPO_COLLINEAR_PAIR_START,
  createTopoCollinearPairFrame,
  createTopoCollinearPairRawSampler,
  resolveTopoCollinearPairPlaybackSeconds,
  topoCollinearPairWorldXForScreenFraction,
} from "../src/apps/topo/TopoCollinearPairScenario.js";
import {
  getStandaloneAppPathForScene,
} from "../src/apps/navigator/StandaloneAppLaunchRuntime.js";
import {
  TOPO_SOURCE_MARKER_RADIUS_SCALE,
  TOPO_SOURCE_MASK_MARKER_RATIO,
  resolveTopoSourceMarkerRadius,
  resolveTopoSourceMaskRadius,
  topoEqualRadiusViewAvailable,
} from "../src/apps/topo/TopoInteractionContractRuntime.js";

function readRepoFile(relativePath) {
  return readFileSync(new URL("../" + relativePath, import.meta.url), "utf8");
}

function closeTo(actual, expected, tolerance = 1e-12) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    String(actual) + " is not within " + tolerance + " of " + expected,
  );
}

test("display scale changes the sampled world extent while preserving its anchor", () => {
  assert.equal(TOPO_DEFAULT_DISPLAY_SCALE, 1);
  assert.equal(TOPO_MIN_DISPLAY_SCALE, 0.5);
  assert.equal(TOPO_MAX_DISPLAY_SCALE, 2);
  assert.equal(TOPO_DISPLAY_SCALE_STEP, 0.25);
  assert.equal(normalizeTopoDisplayScale("1.25"), 1.25);
  assert.throws(() => normalizeTopoDisplayScale(0.49), /must lie in/u);
  assert.throws(() => normalizeTopoDisplayScale(2.01), /must lie in/u);

  const width = 916;
  const height = 720;
  const anchorPixel = topoCanvasPixelForWorldPoint({
    worldX: TOPO_SOURCE_POSITION.x,
    worldY: TOPO_SOURCE_POSITION.y,
    width,
    height,
    displayScale: 2,
  });
  closeTo(anchorPixel.x, TOPO_SOURCE_POSITION.x * (width - 1));
  closeTo(anchorPixel.y, (1 - TOPO_SOURCE_POSITION.y) * (height - 1));

  for (const [displayScale, visibleHeight] of [[0.5, 2], [1, 1], [2, 0.5]]) {
    const upperLeft = topoWorldPointForCanvasPixel({
      pixelX: 0,
      pixelY: 0,
      width,
      height,
      displayScale,
    });
    const lowerRight = topoWorldPointForCanvasPixel({
      pixelX: width - 1,
      pixelY: height - 1,
      width,
      height,
      displayScale,
    });
    closeTo(upperLeft.y - lowerRight.y, visibleHeight);
    const probe = { x: 0.72, y: 0.31 };
    const pixel = topoCanvasPixelForWorldPoint({
      worldX: probe.x,
      worldY: probe.y,
      width,
      height,
      displayScale,
    });
    const roundTrip = topoWorldPointForCanvasPixel({
      pixelX: pixel.x,
      pixelY: pixel.y,
      width,
      height,
      displayScale,
    });
    closeTo(roundTrip.x, probe.x);
    closeTo(roundTrip.y, probe.y);
  }
});

test("physical magnitude is the default and enhanced decade contrast is optional", () => {
  assert.equal(TOPO_INTERACTION_CONTRACT_ID, "topo_interaction_and_color/v1");
  assert.equal(TOPO_DISPLAY_MAPPING_ID, "signed-log10");
  assert.equal(TOPO_DEFAULT_HEATMAP_MODE, TOPO_HEATMAP_MODE.PHYSICAL_MAGNITUDE);
  assert.equal(TOPO_REFERENCE_SCALE, 4);
  assert.equal(TOPO_DISPLAY_CLIP_MAGNITUDE, 64);
  assert.equal(TOPO_DEFAULT_CONTOUR_RANGE_DECADES, 3);
  assert.equal(TOPO_DEFAULT_CONTOUR_VISIBILITY, 0.75);
  assert.ok(TOPO_FIRST_CONTOUR_BUDGET_MS <= 34);

  for (const rawValue of [-64, -4, -0.25, 0, 0.25, 4, 64]) {
    closeTo(inverseTopoTransform(transformTopoValue(rawValue)), rawValue);
  }
  closeTo(transformTopoValue(0), 0);
  for (const polaritySign of [-1, 1]) {
    let prior = null;
    for (const exponent of [-3, -2, -1, 0]) {
      const raw = polaritySign * 64 * 10 ** exponent;
      const physical = normalizeTopoFieldColorValue(raw);
      closeTo(physical, polaritySign * 10 ** exponent);
      closeTo(physical, normalizeTopoPhysicalMagnitudeValue(raw));
      if (prior != null) {
        closeTo(Math.abs(physical / prior), 10);
      }
      prior = physical;
    }
  }
  closeTo(normalizeTopoFieldColorValue(640), 1);
  closeTo(normalizeTopoFieldColorValue(-640), -1);
  for (const magnitude of [0.001, 0.01, 0.1, 1, 4, 16, 64]) {
    closeTo(
      normalizeTopoFieldColorValue(magnitude, {
        mode: TOPO_HEATMAP_MODE.ENHANCED_DECADE_CONTRAST,
      }),
      normalizeTopoDisplayValue(magnitude),
    );
    closeTo(
      normalizeTopoFieldColorValue(-magnitude),
      -normalizeTopoFieldColorValue(magnitude),
    );
  }
  assert.throws(
    () => normalizeTopoFieldColorValue(1, { mode: "unknown" }),
    /Unknown Topo heatmap mode/u,
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

test("Contour span selects exact inward and outward raw decades without duplicates", () => {
  assert.equal(topoContourRangeDecades(0), 1);
  assert.equal(topoContourRangeDecades(1), 1);
  assert.equal(topoContourRangeDecades(2), 2);
  assert.equal(topoContourRangeDecades(3), 3);
  assert.equal(topoContourRangeDecades(4), 4);
  assert.equal(topoContourRangeDecades(5), 4);

  const schedules = [1, 2, 3, 4].map((contourRangeDecades) =>
    createTopoContourMagnitudeSchedule({ contourRangeDecades }));
  const selections = [1, 2, 3, 4].map(createTopoSyntheticContourSelection);
  assert.deepEqual(selections.map((selection) => selection.length), [3, 5, 7, 9]);
  assert.deepEqual(
    selections[3].map(({ majorDecadeLabel }) => majorDecadeLabel),
    ["e=4", "e=3", "e=2", "e=1", "e=0", "e=-1", "e=-2", "e=-3", "e=-4"],
  );
  assert.equal(
    selections[3].filter(({ referenceLevel }) => referenceLevel).length,
    1,
  );
  assert.equal(new Set(
    selections[3].map(({ rawMagnitude, magnitude }) => rawMagnitude ?? magnitude),
  ).size, selections[3].length);
  assert.deepEqual(
    schedules[1].filter(({ rawDecade }) => Math.abs(rawDecade) <= 1),
    schedules[0],
  );
  for (let index = 1; index < selections[3].length; index += 1) {
    closeTo(
      selections[3][index].causalDelay / selections[3][index - 1].causalDelay,
      Math.sqrt(10),
    );
    const currentIntensity = TOPO_INVERSE_SQUARE_SCALE /
      selections[3][index].causalDelay ** 2;
    const priorIntensity = TOPO_INVERSE_SQUARE_SCALE /
      selections[3][index - 1].causalDelay ** 2;
    closeTo(currentIntensity / priorIntensity, 0.1);
  }
});

test("contour span preserves the raw kernel, frame identity, polarity, and moving linear geometry", () => {
  const sample = {
    x: TOPO_SOURCE_POSITION.x - 0.08,
    y: TOPO_SOURCE_POSITION.y + 0.03,
    beta: 0.5,
  };
  const rawBefore = syntheticTopoSignedValue({ ...sample, polaritySign: -1 });
  const frameBefore = createTopoPreviewFrameIdentity({
    beta: sample.beta,
    polaritySign: -1,
  });
  const narrow = createTopoSyntheticContourRenderPlan({
    beta: sample.beta,
    contourRangeDecades: 1,
  });
  const wide = createTopoSyntheticContourRenderPlan({
    beta: sample.beta,
    contourRangeDecades: 4,
  });
  assert.deepEqual(
    wide.filter(({ rawDecade }) => Math.abs(rawDecade) <= 1)
      .map(({ center, radius, rawMagnitude }) => ({ center, radius, rawMagnitude })),
    narrow.map(({ center, radius, rawMagnitude }) => ({ center, radius, rawMagnitude })),
  );
  closeTo(
    syntheticTopoSignedValue({ ...sample, polaritySign: -1 }),
    rawBefore,
  );
  assert.equal(createTopoPreviewFrameIdentity({
    beta: sample.beta,
    polaritySign: -1,
  }), frameBefore);
  closeTo(
    syntheticTopoSignedValue({ ...sample, polaritySign: 1 }),
    -rawBefore,
  );
  const runtime = readRepoFile("src/apps/topo/TopoInteractionContractRuntime.js");
  assert.match(runtime, /state\.beta === 0/u);
  assert.match(runtime, /state\.viewMode === "source-local"/u);
  assert.match(runtime, /sourceLocalViewAvailable/u);
  assert.match(runtime, /source-local-unavailable/u);
  assert.match(runtime, /enforceAvailableView/u);
  assert.match(runtime, /View switched to Combined wake/u);
  const rawFrameKeySource = runtime.slice(
    runtime.indexOf("function createRawFrameKey"),
    runtime.indexOf("async function buildRawFrame"),
  );
  assert.doesNotMatch(rawFrameKeySource, /heatmapMode/u);
  assert.match(runtime, /const displayKey = TOPO_DISPLAY_MAPPING_ID[\s\S]*state\.heatmapMode[\s\S]*state\.contourRangeDecades/u);
});

test("beta-zero single-source exponent radius maps integer exponents to equal display steps", () => {
  const width = 916;
  const height = 720;
  const markerRadius = 4.5;
  const chart = createTopoExponentRadiusChart({
    width,
    height,
    pixelRatio: 1,
    sourceMarkerRadiusPixels: markerRadius,
    contourRangeDecades: 3,
  });
  assert.equal(chart.chartId, TOPO_EXPONENT_RADIUS_CHART_ID);
  assert.equal(chart.span, 3);
  assert.equal(chart.referenceMagnitude, 64);
  assert.equal(chart.outsidePolicy, "neutral-clip-no-clamp");
  assert.equal(TOPO_EXPONENT_RADIUS_MARKER_GAP_CSS, 0);

  const exponents = [3, 2, 1, 0, -1, -2, -3];
  const radii = exponents.map((exponent) =>
    topoExponentDisplayRadiusForExponent({ exponent, chart }));
  for (let index = 1; index < radii.length; index += 1) {
    closeTo(radii[index] - radii[index - 1], chart.radialStepPixels);
  }
  closeTo(radii[0], chart.innerRadiusPixels);
  closeTo(radii.at(-1), chart.outerRadiusPixels);

  for (const exponent of exponents) {
    const radius = topoExponentDisplayRadiusForExponent({ exponent, chart });
    const mapped = topoExponentRadiusPhysicalPointForCanvasPixel({
      pixelX: chart.sourcePixelX - radius,
      pixelY: chart.sourcePixelY,
      width,
      height,
      chart,
    });
    assert.equal(mapped.state, "ordinary");
    closeTo(mapped.exponent, exponent);
    closeTo(mapped.physicalRadius, topoPhysicalRadiusForWakeExponent(exponent));
    for (const polaritySign of [-1, 1]) {
      const raw = syntheticTopoSignedValue({
        ...mapped.physicalPoint,
        beta: 0,
        polaritySign,
      });
      closeTo(raw, polaritySign * 64 * 10 ** exponent, Math.abs(raw) * 1e-12);
    }
  }

  assert.equal(topoExponentRadiusPhysicalPointForCanvasPixel({
    pixelX: chart.sourcePixelX + chart.innerRadiusPixels - 0.25,
    pixelY: chart.sourcePixelY,
    width,
    height,
    chart,
  }).state, "masked:inside_exponent_radius");
  assert.equal(topoExponentRadiusPhysicalPointForCanvasPixel({
    pixelX: chart.sourcePixelX + chart.outerRadiusPixels + 0.25,
    pixelY: chart.sourcePixelY,
    width,
    height,
    chart,
  }).state, "clipped:outside_exponent_radius");
});

test("selected-source equal-radius chart starts e=0 at r and shows only nonnegative exponent rings", () => {
  const chart = createTopoEqualRadiusChart({
    width: 916,
    height: 720,
    pixelRatio: 1,
    anchorPixelX: 183.2,
    anchorPixelY: 359.5,
    contourRangeDecades: 3,
  });
  assert.equal(chart.chartId, TOPO_EQUAL_RADIUS_CHART_ID);
  assert.equal(chart.exponentMinimum, 0);
  assert.equal(chart.exponentMaximum, 3);
  assert.equal(chart.anchorPixelX, 183.2);
  assert.equal(chart.anchorPixelY, 359.5);
  assert.equal(chart.levelPolicy, "nonnegative-raw-exponents-only");
  assert.equal(
    chart.coordinateAuthority,
    "display-only-not-global-physical-transform",
  );
  const radii = [0, 1, 2, 3].map((exponent) =>
    topoEqualRadiusDisplayRadiusForExponent({ exponent, chart }));
  assert.deepEqual(radii, [1, 2, 3, 4].map((multiple) =>
    multiple * chart.radialStepPixels));
  assert.equal(radii[0], chart.radialStepPixels);
  assert.equal(radii.at(-1), chart.outerRadiusPixels);
  assert.throws(
    () => topoEqualRadiusDisplayRadiusForExponent({ exponent: -1, chart }),
    /integers in \[0, exponentMaximum\]/u,
  );

  const physical = createTopoSyntheticContourRenderPlan({
    beta: 0.5,
    contourRangeDecades: 3,
  });
  assert.deepEqual(
    physical.map(({ rawDecade }) => rawDecade),
    [3, 2, 1, 0, -1, -2, -3],
  );
  assert.deepEqual(
    physical.filter(({ rawDecade }) => rawDecade >= 0)
      .map(({ rawDecade }) => rawDecade),
    [3, 2, 1, 0],
  );
});

test("equal-radius chart is available only for a stationary single source", () => {
  assert.equal(topoEqualRadiusViewAvailable({
    viewMode: "equal-radius",
    beta: 0,
    scenarioId: "electrino",
  }), true);
  assert.equal(topoEqualRadiusViewAvailable({
    viewMode: "equal-radius",
    beta: 0.01,
    scenarioId: "electrino",
  }), false);
  assert.equal(topoEqualRadiusViewAvailable({
    viewMode: "equal-radius",
    beta: 0,
    pairMode: true,
  }), false);
  assert.equal(topoEqualRadiusViewAvailable({
    viewMode: "equal-radius",
    beta: 0,
    binary: true,
  }), false);
  assert.equal(topoEqualRadiusViewAvailable({
    viewMode: "combined",
    beta: 0,
    scenarioId: "electrino",
  }), false);
});

test("source-local heatmap follows the original linear exponent legend without changing exponent geometry", () => {
  for (const span of [1, 2, 3, 4]) {
    for (let exponent = -span; exponent <= span; exponent += 1) {
      const magnitude = 64 * 10 ** exponent;
      const expectedPhysical = (exponent + span) / (2 * span);
      const expectedEnhanced = ((exponent + span) / (2 * span)) ** 0.72;
      for (const polaritySign of [-1, 1]) {
        closeTo(
          normalizeTopoExponentRadiusColorValue(
            polaritySign * magnitude,
            { span },
          ),
          polaritySign * expectedPhysical,
        );
        closeTo(
          normalizeTopoExponentRadiusColorValue(
            polaritySign * magnitude,
            {
              span,
              mode: TOPO_HEATMAP_MODE.ENHANCED_DECADE_CONTRAST,
            },
          ),
          polaritySign * expectedEnhanced,
        );
      }
    }
  }
});

test("source-local physical colors grade e=0 through e=-3 like the original legend", () => {
  const actual = [0, -1, -2, -3].map((exponent) =>
    normalizeTopoExponentRadiusColorValue(-64 * 10 ** exponent, { span: 3 }));
  assert.deepEqual(actual, [-0.5, -1 / 3, -1 / 6, -0]);

  const runtime = readRepoFile("src/apps/topo/TopoInteractionContractRuntime.js");
  assert.match(
    runtime,
    /physicalStrength = mix\([\s\S]*sourceLocalLegendStrength[\s\S]*u_source_local_mode/u,
  );
  assert.doesNotMatch(runtime, /createTopoSourceLocalLegendGradient/u);
  assert.match(
    runtime,
    /dom\.legendGradient\.style\.background = state\.pairMode \|\| state\.binary[\s\S]*linear-gradient\(90deg,[\s\S]*styles\.zero/u,
  );
});

test("exponent-radius resize changes display spacing without changing raw exponent values", () => {
  for (const { width, height } of [
    { width: 1440, height: 600 },
    { width: 390, height: 844 },
  ]) {
    const chart = createTopoExponentRadiusChart({
      width,
      height,
      pixelRatio: 1,
      sourceMarkerRadiusPixels: 4.5,
      contourRangeDecades: 4,
    });
    for (const exponent of [4, 0, -4]) {
      const radius = topoExponentDisplayRadiusForExponent({ exponent, chart });
      const mapped = topoExponentRadiusPhysicalPointForCanvasPixel({
        pixelX: chart.sourcePixelX,
        pixelY: chart.sourcePixelY - radius,
        width,
        height,
        chart,
      });
      closeTo(mapped.exponent, exponent);
      closeTo(
        Math.abs(syntheticTopoSignedValue({
          ...mapped.physicalPoint,
          beta: 0,
          polaritySign: 1,
        })),
        64 * 10 ** exponent,
        64 * 10 ** exponent * 1e-12,
      );
    }
  }
});

test("contour visibility changes opacity only and keeps equal scientific styling", () => {
  for (const visibility of [0, 0.75, 1]) {
    assert.deepEqual(createTopoContourEmphasis(visibility), {
      opacity: visibility,
      whiteMix: 0,
      widthCss: 1.15,
    });
  }
  const count = 4;
  const styles = Array.from({ length: count }, (_, index) =>
    createTopoSequentialContourStyle({ index, count, visibility: 0.75 }));
  assert.equal(styles.every(({ opacity }) => opacity === 0.75), true);
  assert.equal(styles.every(({ whiteMix }) => whiteMix === 0), true);
  assert.equal(styles.every(({ widthCss }) => widthCss === 1.15), true);
  const plan = createTopoSyntheticContourRenderPlan({
    beta: 0.5,
    contourRangeDecades: 3,
  });
  assert.equal(plan.length, 7);
  assert.equal(plan.every(({ revealWeight }) => revealWeight === 1), true);
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
  const width = 916;
  const height = 720;
  const chart = createTopoExponentRadiusChart({
    width,
    height,
    sourceMarkerRadiusPixels: 4.5,
    contourRangeDecades: 3,
  });
  for (const beta of [0, 0.5, 0.83, 1]) {
    const sample = beta === 0
      ? {
        pixelX: chart.sourcePixelX -
          topoExponentDisplayRadiusForExponent({ exponent: 0, chart }),
        pixelY: chart.sourcePixelY,
        width,
        height,
      }
      : { pixelX: 210, pixelY: 357, width, height };
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
    contourRangeDecades: 0.418,
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

test("collinear pair follows finite prescribed paths between 20% and 80%", () => {
  assert.equal(
    TOPO_COLLINEAR_PAIR_SCENARIO_ID,
    "approaching-collinear-electrino-positrino",
  );
  assert.equal(TOPO_COLLINEAR_PAIR_PLAYBACK_SECONDS, 21.6);
  assert.equal(TOPO_COLLINEAR_PAIR_REFERENCE_BETA, 0.5);
  closeTo(resolveTopoCollinearPairPlaybackSeconds(0.25), 43.2);
  closeTo(resolveTopoCollinearPairPlaybackSeconds(0.5), 21.6);
  closeTo(resolveTopoCollinearPairPlaybackSeconds(1), 10.8);
  assert.equal(
    resolveTopoCollinearPairPlaybackSeconds(0),
    Number.POSITIVE_INFINITY,
  );
  assert.deepEqual(TOPO_COLLINEAR_PAIR_START, {
    electrino: { x: 1 / 5, y: 1 / 2 },
    positrino: { x: 4 / 5, y: 1 / 2 },
  });

  const start = createTopoCollinearPairFrame({ beta: 0.5, phase: 0 });
  const crossing = createTopoCollinearPairFrame({ beta: 0.5, phase: 0.5 });
  const finish = createTopoCollinearPairFrame({ beta: 0.5, phase: 1 });
  closeTo(start.sources[0].position.x, 1 / 5);
  closeTo(start.sources[1].position.x, 4 / 5);
  closeTo(crossing.observationTime, 3 / 5);
  crossing.sources.forEach((source) => closeTo(source.position.x, 1 / 2));
  closeTo(finish.sources[0].position.x, 4 / 5);
  closeTo(finish.sources[1].position.x, 1 / 5);
  finish.sources.forEach((source) => closeTo(
    source.position.x,
    source.start.x + source.velocityBeta * finish.observationTime,
  ));

  const stationary = createTopoCollinearPairFrame({ beta: 0, phase: 1 });
  assert.equal(stationary.phase, 0);
  assert.equal(stationary.observationTime, 0);
  closeTo(stationary.sources[0].position.x, 1 / 5);
  closeTo(stationary.sources[1].position.x, 4 / 5);

  const wideSpan = 16 / 9;
  const wideStart = createTopoCollinearPairFrame({
    beta: 0.5,
    phase: 0,
    horizontalWorldSpan: wideSpan,
  });
  const wideFinish = createTopoCollinearPairFrame({
    beta: 0.5,
    phase: 1,
    horizontalWorldSpan: wideSpan,
  });
  closeTo(wideStart.sources[0].screenPosition.x, 1 / 5);
  closeTo(wideStart.sources[1].screenPosition.x, 4 / 5);
  closeTo(wideFinish.sources[0].screenPosition.x, 4 / 5);
  closeTo(wideFinish.sources[1].screenPosition.x, 1 / 5);
  closeTo(
    wideStart.sources[0].position.x,
    topoCollinearPairWorldXForScreenFraction(1 / 5, wideSpan),
  );
  closeTo(
    wideStart.sources[1].position.x,
    topoCollinearPairWorldXForScreenFraction(4 / 5, wideSpan),
  );
  closeTo(
    wideFinish.sources[0].position.x,
    topoCollinearPairWorldXForScreenFraction(4 / 5, wideSpan),
  );
  closeTo(
    wideFinish.sources[1].position.x,
    topoCollinearPairWorldXForScreenFraction(1 / 5, wideSpan),
  );
});

test("collinear pair superposes admitted path-history contributions before display", () => {
  const initialFrame = createTopoCollinearPairFrame({ beta: 0.5, phase: 0 });
  assert.equal(
    initialFrame.sources.every((source) =>
      source.historyModel === TOPO_COLLINEAR_PAIR_HISTORY_MODEL &&
      source.historyStartTime === Number.NEGATIVE_INFINITY),
    true,
  );
  const initialSampler = createTopoCollinearPairRawSampler({
    beta: 0.5,
    phase: 0,
    sourceMaskRadius: 0,
  });
  closeTo(initialSampler(0.5, 0.6), 0);
  assert.ok(initialSampler(0.3, 0.6) < 0);

  const approachingSampler = createTopoCollinearPairRawSampler({
    beta: 0.5,
    phase: 0.25,
    sourceMaskRadius: 0,
  });
  const leftValue = approachingSampler(0.38, 0.5);
  const rightValue = approachingSampler(0.62, 0.5);
  assert.ok(leftValue < 0);
  assert.ok(rightValue > 0);
  closeTo(leftValue, -rightValue, 1e-9);

  const crossingSampler = createTopoCollinearPairRawSampler({
    beta: 0.5,
    phase: 0.5,
    sourceMaskRadius: 0,
  });
  closeTo(crossingSampler(0.5, 0.6), 0);

  const endpointSampler = createTopoCollinearPairRawSampler({
    beta: 1,
    phase: 0.5,
    sourceMaskRadius: 0,
  });
  assert.equal(endpointSampler(0.5, 0.8), Number.POSITIVE_INFINITY);
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

test("all four scenarios share the half-size marker and contained source mask", () => {
  assert.equal(TOPO_SOURCE_MARKER_RADIUS_SCALE, 0.5);
  assert.equal(TOPO_SOURCE_MASK_MARKER_RATIO, 0.75);
  closeTo(resolveTopoSourceMarkerRadius({
    width: 1000,
    height: 800,
    pixelRatio: 1,
  }), 5);
  closeTo(resolveTopoSourceMarkerRadius({
    width: 400,
    height: 300,
    pixelRatio: 2,
  }), 9);
  const markerWorldRadius = resolveTopoSourceMarkerRadius({
    width: 1000,
    height: 800,
    pixelRatio: 1,
  }) / 999;
  const maskWorldRadius = resolveTopoSourceMaskRadius({
    width: 1000,
    height: 800,
    pixelRatio: 1,
  });
  closeTo(maskWorldRadius, markerWorldRadius * 0.75);
  assert.ok(maskWorldRadius < markerWorldRadius);

  const html = readRepoFile("topo.html");
  const optionValues = Array.from(html.matchAll(/name="topo-scenario" value="([^"]+)"/gu))
    .map((match) => match[1]);
  assert.deepEqual(optionValues, [
    "electrino",
    "positrino",
    "approaching-collinear-electrino-positrino",
    "orbiting-binary",
  ]);
  const runtime = readRepoFile("src/apps/topo/TopoInteractionContractRuntime.js");
  assert.match(runtime, /function drawSourceMarker/u);
  assert.match(runtime, /sourceOverlayGeometry[\s\S]*resolveTopoSourceMarkerRadius/u);
  assert.doesNotMatch(runtime, /drawCircularBinarySourceMarker/u);
});

test("Topo UI exposes distinct combined, source-local, and equal-radius views and preserves Home", () => {
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
  assert.match(
    runtime,
    /state\.contourVisibility === 0[\s\S]*majorDecadeLabels = ""[\s\S]*majorDecadeLabelPositions = ""/u,
  );
  assert.match(runtime, /listen\(dom\.contours, "input", scheduleContourChange\)/u);
  assert.match(
    runtime,
    /listen\(dom\.contourVisibility, "input", scheduleContourChange\)/u,
  );
  assert.match(
    runtime,
    /state\.contourVisibility === 0[\s\S]*\? "Hidden"/u,
  );
  assert.match(runtime, /createTopoExponentRadiusChart/u);
  assert.match(runtime, /sourceLocalViewRequested/u);
  assert.match(runtime, /sourceLocalViewAvailable/u);
  assert.match(runtime, /topoExponentRadiusPhysicalPointForCanvasPixel/u);
  assert.match(runtime, /Source-local display chart/u);
  assert.match(runtime, /Combined absolute-space wake/u);
  assert.match(runtime, /Source-local decades are not yet available/u);
  assert.match(runtime, /TOPO_HEATMAP_MODE\.PHYSICAL_MAGNITUDE/u);
  assert.match(runtime, /u_enhanced_decade_contrast/u);
  assert.match(runtime, /physicalStrength = clamp\(abs\(rawValue\) \/ 64\.0, 0\.0, 1\.0\)/u);
  assert.match(runtime, /heatmapModeInputs[\s\S]*listen\(input, "change", scheduleFrameChange\)/u);
  assert.match(runtime, /state\.backgroundMode === "white"[\s\S]*--ui-color-electric-purple/u);
  const markerSource = runtime.slice(
    runtime.indexOf("function drawSourceMarker"),
    runtime.indexOf("function drawSourceOverlay"),
  );
  assert.doesNotMatch(markerSource, /state\./u);
  assert.match(markerSource, /WHITE\.r/u);
  assert.match(runtime, /u_source_local_mode/u);
  assert.match(runtime, /displayRadius - u_source_local_inner_radius/u);
  assert.match(runtime, /radius <= markerRadius \+ 16 \* pixelRatio/u);
  assert.match(runtime, /globalAlpha = 0\.82 \* circle\.revealWeight/u);
  assert.match(runtime, /!occupied\.some/u);
  assert.doesNotMatch(runtime, /suppressed-responsive/u);
  assert.match(runtime, /contourRadii/u);
  assert.match(runtime, /TOPO_INVERSE_SQUARE_SCALE/u);
  assert.match(runtime, /createTopoCollinearPairRawSampler/u);
  assert.doesNotMatch(runtime, /createTopoCollinearPairContourRenderPlan/u);
  assert.match(runtime, /extractTopoSampledFieldContourSegments/u);
  assert.match(runtime, /drawSampledPairContours/u);
  assert.match(runtime, /rawFrame: cachedRawFrame/u);
  assert.match(runtime, /contourScalarAuthority = "combined-raw-wake-field"/u);
  assert.match(runtime, /masked-and-unavailable-cells-excluded/u);
  assert.match(runtime, /equalRadiusInput\.disabled = pairMode \|\| binaryMode \|\| state\.beta !== 0/u);
  assert.match(runtime, /sourceContribution/u);
  assert.match(runtime, /finiteHistory/u);
  assert.match(runtime, /setTransportControlButtonPresentation/u);
  assert.match(runtime, /TRANSPORT_CONTROL_ICON\.RESET/u);
  assert.doesNotMatch(runtime, /float magnitude = min\(/u);
  assert.match(runtime, /log\(abs\(rawValue\) \/ 64\.0\) \/ log\(10\.0\)/u);
  assert.doesNotMatch(runtime, /asinh|arsinh|u_gain|TOPO_FIELD_COLOR_GAIN/iu);
  assert.doesNotMatch(runtime, /transformId|u_transform|scheduleTransformChange|dom\.transform/u);

  assert.match(html, /<title>Architrino Wake Topological Map<\/title>/u);
  assert.match(html, /<h1>Wake Topological Map<\/h1>/u);
  assert.match(html, /Two-dimensional prescribed motion/u);
  assert.match(html, /<h2 id="topo-about-title">About this view<\/h2>/u);
  assert.match(html, /<span>Contour span<\/span>/u);
  assert.match(html, /id="topo-coordinate-mode"[^>]*aria-live="polite"/u);
  assert.match(html, /<legend>View<\/legend>/u);
  assert.match(html, /<legend>Heatmap<\/legend>/u);
  assert.match(html, /name="topo-heatmap-mode" value="physical-magnitude" checked/u);
  assert.match(html, /<span>Physical magnitude<\/span>/u);
  assert.match(html, /name="topo-heatmap-mode" value="enhanced-decade-contrast"/u);
  assert.match(html, /<span>Enhanced decade contrast<\/span>/u);
  assert.match(html, /name="topo-view" value="source-local"/u);
  assert.match(html, /<span>Source-local decades<\/span>/u);
  assert.match(html, /name="topo-view" value="equal-radius"/u);
  assert.match(html, /<span>Equal-radius exponents \(stationary source\)<\/span>/u);
  assert.doesNotMatch(html, /topo-chart-anchor/u);
  assert.match(html, /name="topo-view" value="combined" checked/u);
  assert.match(html, /<span>Combined wake<\/span>/u);
  assert.match(html, />Approaching collinear electrino and positrino<\/span>/u);
  assert.match(html, /id="topo-pair-play"/u);
  assert.match(html, /id="topo-pair-replay"/u);
  assert.match(html, />±3 decades<\/output>/u);
  assert.match(html, /One contour per factor of 10 in wake intensity/u);
  assert.match(html, /id="topo-legend-mapping"/u);
  assert.doesNotMatch(html, /Scale transform|topo-transform|Linear|Signed log2|Asinh/u);
  assert.doesNotMatch(html, /Raw probe|Nonnumeric state legend|topo-stage-caption/u);
  assert.match(runtime, /R\(e\)=\(e\+1\)r/u);
  assert.match(runtime, /nonnegative-raw-exponents-only/u);
  assert.match(runtime, /equalRadiusAnchorDisplayedTime/u);
  assert.match(runtime, /Moving and multi-source scenes use contours from their combined raw wake field/u);
  assert.match(runtime, /not a global physical-coordinate transform/u);
  assert.match(html, /id="home-button"[\s\S]*id="nav-up"[\s\S]*id="nav-forward"[\s\S]*id="scene-search"/u);

  assert.match(css, /\.topo-range-note/u);
  assert.match(css, /input\[name="topo-heatmap-mode"\]:checked/u);
  assert.match(css, /\.topo-pair-transport/u);
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
