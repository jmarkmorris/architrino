import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  TOPO_DEFAULT_CONTOUR_RANGE_DECADES,
  TOPO_DEFAULT_CONTOUR_COUNT,
  TOPO_DEFAULT_CONTOUR_REACH,
  TOPO_DEFAULT_CONTOUR_VISIBILITY,
  TOPO_ABSOLUTE_OBSERVER,
  TOPO_DEFAULT_WAKE_VIEW,
  TOPO_CONTOUR_WEIGHT_POLICY_ID,
  TOPO_WEAKEST_CONTOUR_WEIGHT,
  TOPO_ZERO_CONTOUR_WEIGHT,
  TOPO_DEFAULT_DISPLAY_SCALE,
  TOPO_DEFAULT_SHADING_SPREAD,
  TOPO_DISPLAY_MAPPING_ID,
  TOPO_DISPLAY_SCALE_STEP,
  TOPO_FIRST_CONTOUR_BUDGET_MS,
  TOPO_INTERACTION_CONTRACT_ID,
  TOPO_INVERSE_SQUARE_SCALE,
  TOPO_MAX_DISPLAY_SCALE,
  TOPO_MAX_SHADING_REACH_SCALE,
  TOPO_MIN_DISPLAY_SCALE,
  TOPO_MIN_SHADING_REACH_SCALE,
  TOPO_REFERENCE_SCALE,
  TOPO_REFERENCE_WAKE_MAGNITUDE,
  TOPO_SOURCE_POSITION,
  TOPO_SYNTHETIC_CONTOUR_DELAY_RANGE,
  TOPO_TRANSLATION_AXIS,
  applyTopoScenarioPolarity,
  createTopoAnalyticFieldRgbAtCanvasPixel,
  createTopoContourEmphasis,
  createTopoContourLevelStyle,
  createTopoContourMagnitudeSchedule,
  createTopoPreviewFrameIdentity,
  createTopoSampleRgb,
  createTopoSignedRgb,
  createTopoSyntheticContourCircles,
  createTopoSyntheticContourRenderPlan,
  createTopoSyntheticContourSelection,
  createTopoSyntheticRawSampler,
  inverseTopoTransform,
  normalizeTopoDisplayScale,
  normalizeTopoContourCount,
  normalizeTopoContourReach,
  normalizeTopoFieldColorValue,
  normalizeTopoShadingSpread,
  normalizeTopoWakeView,
  resolveTopoCanvasPixelSize,
  syntheticTopoCausalDelay,
  syntheticTopoSignedValue,
  topoContourRangeDecades,
  topoCanvasPixelForWorldPoint,
  topoPreviewResultAt,
  topoShadingReachScale,
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
  createTopoCircularBinaryRawSampler,
  sampleTopoCircularBinaryWake,
} from "../src/apps/topo/TopoCircularBinaryScenario.js";
import {
  getStandaloneAppPathForScene,
} from "../src/apps/navigator/StandaloneAppLaunchRuntime.js";
import {
  TOPO_ELECTRINO_VISIBLE_MARKER_RADIUS_SCALE,
  TOPO_POSITRINO_VISIBLE_MARKER_RADIUS_SCALE,
  TOPO_SOURCE_MARKER_RADIUS_SCALE,
  TOPO_ANIMATED_MIN_BETA,
  TOPO_SOURCE_MARKER_RADIUS_CSS_PIXELS,
  TOPO_VISIBLE_SOURCE_MARKER_RADIUS_CSS_PIXELS,
  TOPO_EXACT_SOURCE_MASK_WORLD_RADIUS,
  TOPO_CANVAS_SAMPLE_CENTER_OFFSET,
  createTopoNeutralBackgroundRgb,
  resolveTopoLinearViewportAnchor,
  resolveTopoSourceMarkerRadius,
  resolveTopoSourceMaskRadius,
  resolveTopoVisibleSourceMarkerCssRadius,
  resolveTopoVisibleSourceMarkerRadius,
  resolveTopoVisibleSourceMarkerWorldRadius,
  createTopoVisibleMarkerPaintStyle,
  paintTopoSourceMarker,
  paintTopoPairSourceMarkerLayers,
  topoGlobalTransportOwnsSpace,
  topoAnimatedScenarioUsesMinimumBeta,
  normalizeTopoScenarioBeta,
  normalizeTopoNeutralWhiteMix,
  resetTopoVisiblePresentation,
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

test("neutral background adds only white to Electric Purple", () => {
  const electricPurple = [143, 0, 255];
  assert.equal(normalizeTopoNeutralWhiteMix(-1), 0);
  assert.equal(normalizeTopoNeutralWhiteMix(0.5), 0.5);
  assert.equal(normalizeTopoNeutralWhiteMix(2), 1);
  assert.deepEqual(
    createTopoNeutralBackgroundRgb(electricPurple, 0),
    electricPurple,
  );
  assert.deepEqual(
    createTopoNeutralBackgroundRgb(electricPurple, 0.5),
    [199, 128, 255],
  );
  assert.deepEqual(
    createTopoNeutralBackgroundRgb(electricPurple, 1),
    [255, 255, 255],
  );
});

test("control changes synchronously clear every visible presentation layer", () => {
  const calls = [];
  const canvas = { style: { opacity: "0" } };
  const analyticFieldCanvas = { style: { visibility: "visible" } };
  const fieldContext = {
    fillStyle: "",
    clearRect: (...args) => calls.push(["field-clear", ...args]),
    fillRect: (...args) => calls.push(["field-fill", ...args]),
  };
  const contourContext = {
    clearRect: (...args) => calls.push(["contour-clear", ...args]),
  };
  const contourStagingContext = {
    clearRect: (...args) => calls.push(["staging-clear", ...args]),
  };
  resetTopoVisiblePresentation({
    canvas,
    analyticFieldCanvas,
    fieldContext,
    contourContext,
    contourStagingContext,
    width: 916,
    height: 720,
    neutralColor: "rgb(143, 0, 255)",
  });
  assert.equal(canvas.style.opacity, "1");
  assert.equal(analyticFieldCanvas.style.visibility, "hidden");
  assert.equal(fieldContext.fillStyle, "rgb(143, 0, 255)");
  assert.deepEqual(calls, [
    ["field-clear", 0, 0, 916, 720],
    ["field-fill", 0, 0, 916, 720],
    ["contour-clear", 0, 0, 916, 720],
    ["staging-clear", 0, 0, 916, 720],
  ]);
});

test("pair display scale keeps every rendered layer on one fixed center anchor", () => {
  const runtime = readRepoFile(
    "src/apps/topo/TopoInteractionContractRuntime.js",
  );
  for (const [width, height] of [[916, 720], [390, 844]]) {
    let scenarioCenter = null;
    for (const phase of [0.35, 0.5, 0.75]) {
      const frame = createTopoCollinearPairFrame({
        beta: 0.5,
        phase,
        horizontalWorldSpan: (width - 1) / (height - 1),
      });
      const anchor = resolveTopoLinearViewportAnchor({
        width,
        height,
        pairMode: true,
        beta: 0.5,
        phase,
      });
      const sourceMidpoint = {
        x: (frame.sources[0].position.x + frame.sources[1].position.x) / 2,
        y: (frame.sources[0].position.y + frame.sources[1].position.y) / 2,
      };
      closeTo(anchor.viewportCenter.x, sourceMidpoint.x);
      closeTo(anchor.viewportCenter.y, sourceMidpoint.y);
      closeTo(anchor.canvasAnchor.x, 0.5);
      closeTo(anchor.canvasAnchor.y, 0.5);
      if (scenarioCenter == null) {
        scenarioCenter = anchor.viewportCenter;
      } else {
        closeTo(anchor.viewportCenter.x, scenarioCenter.x);
        closeTo(anchor.viewportCenter.y, scenarioCenter.y);
      }

      for (const displayScale of [0.5, 1, 2]) {
        const mapping = {
          width,
          height,
          displayScale,
          viewportCenter: anchor.viewportCenter,
          canvasAnchor: anchor.canvasAnchor,
        };
        const centerPixel = topoCanvasPixelForWorldPoint({
          worldX: anchor.viewportCenter.x,
          worldY: anchor.viewportCenter.y,
          ...mapping,
        });
        closeTo(centerPixel.x, (width - 1) / 2);
        closeTo(centerPixel.y, (height - 1) / 2);
        const centerWorld = topoWorldPointForCanvasPixel({
          pixelX: (width - 1) / 2,
          pixelY: (height - 1) / 2,
          ...mapping,
        });
        closeTo(centerWorld.x, anchor.viewportCenter.x);
        closeTo(centerWorld.y, anchor.viewportCenter.y);

        const sourcePixels = frame.sources.map(({ position }) =>
          topoCanvasPixelForWorldPoint({
            worldX: position.x,
            worldY: position.y,
            ...mapping,
          }));
        closeTo(
          (sourcePixels[0].x + sourcePixels[1].x) / 2,
          centerPixel.x,
        );
        closeTo(
          (sourcePixels[0].y + sourcePixels[1].y) / 2,
          centerPixel.y,
        );
        closeTo(
          (TOPO_TRANSLATION_AXIS.startX + TOPO_TRANSLATION_AXIS.endX) / 2 *
            (width - 1),
          centerPixel.x,
        );
      }
    }
  }

  assert.match(runtime, /uniform vec2 u_viewport_center/u);
  assert.match(runtime, /uniform vec2 u_canvas_anchor/u);
  assert.match(
    runtime,
    /vec2 worldPoint = u_viewport_center \+[\s\S]*pixel - anchorPixel/u,
  );
  assert.match(
    runtime,
    /topoWorldPointForCanvasPixel\(\{[\s\S]*viewportCenter: linearViewportAnchor\.viewportCenter,[\s\S]*canvasAnchor: linearViewportAnchor\.canvasAnchor/u,
  );
  assert.match(
    runtime,
    /sourceOverlayGeometry\([\s\S]*viewportCenter,[\s\S]*TOPO_CANVAS_CENTER/u,
  );
  assert.match(runtime, /dataset\.fieldViewportAnchorPixel = anchorPixel/u);
  assert.match(runtime, /dataset\.contourViewportAnchorPixel = anchorPixel/u);
  assert.match(runtime, /dataset\.guideCenterPixel = guideCenterPixel/u);
  assert.match(runtime, /dataset\.viewportTemporalFrameKey/u);
});

test("bounded square-root shading varies only its one-over-distance-like reach", () => {
  assert.equal(TOPO_INTERACTION_CONTRACT_ID, "topo_interaction_and_color/v1");
  assert.equal(
    TOPO_DISPLAY_MAPPING_ID,
    "signed-bounded-square-root-variable-reach/v1",
  );
  assert.equal(TOPO_REFERENCE_SCALE, 4);
  assert.equal(TOPO_REFERENCE_WAKE_MAGNITUDE, 64);
  assert.equal(TOPO_DEFAULT_SHADING_SPREAD, 0.5);
  assert.equal(TOPO_MIN_SHADING_REACH_SCALE, 0.25);
  assert.equal(TOPO_MAX_SHADING_REACH_SCALE, 4);
  closeTo(topoShadingReachScale(0), 0.25);
  closeTo(topoShadingReachScale(0.5), 1);
  closeTo(topoShadingReachScale(1), 4);
  assert.equal(TOPO_DEFAULT_CONTOUR_COUNT, 13);
  assert.equal(TOPO_DEFAULT_CONTOUR_REACH, 3);
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
      if (prior != null) {
        assert.ok(Math.abs(physical) > Math.abs(prior));
      }
      prior = physical;
    }
  }
  closeTo(normalizeTopoFieldColorValue(0), 0);
  closeTo(normalizeTopoFieldColorValue(64), 0.5);
  closeTo(normalizeTopoFieldColorValue(576), 0.75);
  closeTo(normalizeTopoFieldColorValue(-576), -0.75);
  assert.ok(
    normalizeTopoFieldColorValue(1, { spread: 1 }) >
      normalizeTopoFieldColorValue(1, { spread: 0 }),
  );
  for (const magnitude of [0.001, 0.01, 0.1, 1, 4, 16, 64]) {
    closeTo(
      normalizeTopoFieldColorValue(-magnitude),
      -normalizeTopoFieldColorValue(magnitude),
    );
  }
});

test("shading spread changes only the stationary one-over-distance visibility reach", () => {
  const anchor = TOPO_SYNTHETIC_CONTOUR_DELAY_RANGE.anchor;
  assert.equal(normalizeTopoShadingSpread(-1), 0);
  assert.equal(normalizeTopoShadingSpread(2), 1);
  for (const spread of [0, 0.5, 1]) {
    const reach = anchor * topoShadingReachScale(spread);
    for (const radius of [anchor / 4, anchor, anchor * 2, anchor * 10]) {
      const rawMagnitude = TOPO_INVERSE_SQUARE_SCALE / radius ** 2;
      closeTo(
        normalizeTopoFieldColorValue(rawMagnitude, { spread }),
        reach / (radius + reach),
      );
      closeTo(
        normalizeTopoFieldColorValue(-rawMagnitude, { spread }),
        -reach / (radius + reach),
      );
    }
  }
  assert.equal(normalizeTopoContourCount(99), 25);
  assert.equal(normalizeTopoContourReach(99), 6);
});

test("contour count and reach independently select genuine equal-value thresholds", () => {
  const sparse = createTopoContourMagnitudeSchedule({
    contourCount: 5,
    contourReach: 3,
  });
  const dense = createTopoContourMagnitudeSchedule({
    contourCount: 13,
    contourReach: 3,
  });
  const farther = createTopoContourMagnitudeSchedule({
    contourCount: 5,
    contourReach: 6,
  });
  assert.equal(sparse.length, 5);
  assert.equal(dense.length, 13);
  assert.equal(farther.length, 5);
  closeTo(sparse[0].rawDecade, 1);
  closeTo(sparse.at(-1).rawDecade, -3);
  closeTo(farther.at(-1).rawDecade, -6);
  assert.deepEqual(
    sparse.map(({ rawDecade }) => rawDecade),
    [1, 0, -1, -2, -3],
  );
  assert.equal(new Set(dense.map(({ magnitude }) => magnitude)).size, 13);

  for (const contourCount of [4, 5, 13, 25]) {
    for (const contourReach of [1, 3, 6]) {
      const schedule = createTopoContourMagnitudeSchedule({
        contourCount,
        contourReach,
      });
      assert.equal(schedule.length, contourCount);
      closeTo(schedule[0].rawDecade, 1);
      closeTo(schedule.at(-1).rawDecade, -contourReach);
      assert.equal(
        schedule.filter(({ referenceLevel }) => referenceLevel).length,
        1,
      );
    }
  }
});

test("inverse-square wake magnitude is anchored at the first contour", () => {
  closeTo(
    TOPO_INVERSE_SQUARE_SCALE,
    TOPO_REFERENCE_WAKE_MAGNITUDE * TOPO_SYNTHETIC_CONTOUR_DELAY_RANGE.anchor ** 2,
  );
  const anchorPoint = {
    x: TOPO_SOURCE_POSITION.x - TOPO_SYNTHETIC_CONTOUR_DELAY_RANGE.anchor,
    y: TOPO_SOURCE_POSITION.y,
    beta: 0,
    polaritySign: -1,
  };
  closeTo(
    syntheticTopoSignedValue(anchorPoint),
    -TOPO_REFERENCE_WAKE_MAGNITUDE,
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
    ["level:4", "level:3", "level:2", "level:1", "level:0", "level:-1", "level:-2", "level:-3", "level:-4"],
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
});

test("ordinary stationary singles retain the one linear presentation", () => {
  const runtime = readRepoFile("src/apps/topo/TopoInteractionContractRuntime.js");
  assert.match(runtime, /dataset\.coordinateMode = "linear-absolute-space"/u);
  assert.match(runtime, /Shading scale/u);
  assert.doesNotMatch(
    runtime,
    /source-local|equal-radius|specialistDisplay|advancedDisplay/u,
  );
});

test("contour strength scales one monotonic actual-level profile with symmetric signs", () => {
  assert.equal(
    TOPO_CONTOUR_WEIGHT_POLICY_ID,
    "actual-level-linear-fade-with-explicit-zero/v1",
  );
  assert.equal(TOPO_WEAKEST_CONTOUR_WEIGHT, 0.32);
  assert.equal(TOPO_ZERO_CONTOUR_WEIGHT, 0.56);
  for (const visibility of [0, 0.75, 1]) {
    assert.deepEqual(createTopoContourEmphasis(visibility), {
      opacity: visibility,
      whiteMix: 0,
      widthCss: 1.15,
    });
  }
  const rawDecades = [-3, -2, -1, 0, 1];
  const styles = rawDecades.map((rawDecade) => createTopoContourLevelStyle({
    rawDecade,
    strongestRawDecade: 1,
    weakestRawDecade: -3,
    visibility: 0.75,
  }));
  assert.equal(styles[0].levelWeight, TOPO_WEAKEST_CONTOUR_WEIGHT);
  assert.equal(styles.at(-1).levelWeight, 1);
  for (let index = 1; index < styles.length; index += 1) {
    assert.ok(styles[index].levelWeight > styles[index - 1].levelWeight);
    assert.ok(styles[index].opacity > styles[index - 1].opacity);
  }
  assert.equal(styles.every(({ whiteMix }) => whiteMix === 0), true);
  assert.equal(styles.every(({ widthCss }) => widthCss === 1.15), true);
  for (const rawDecade of rawDecades) {
    const positive = createTopoContourLevelStyle({
      rawDecade,
      strongestRawDecade: 1,
      weakestRawDecade: -3,
      family: "positive",
      visibility: 0.75,
    });
    const negative = createTopoContourLevelStyle({
      rawDecade,
      strongestRawDecade: 1,
      weakestRawDecade: -3,
      family: "negative",
      visibility: 0.75,
    });
    assert.equal(positive.levelWeight, negative.levelWeight);
    assert.equal(positive.opacity, negative.opacity);
  }
  const zero = createTopoContourLevelStyle({
    family: "zero",
    visibility: 0.75,
  });
  assert.equal(zero.levelWeight, TOPO_ZERO_CONTOUR_WEIGHT);
  assert.ok(zero.levelWeight > styles[0].levelWeight);
  assert.ok(zero.levelWeight < styles.at(-1).levelWeight);
  for (const rawDecade of rawDecades) {
    const low = createTopoContourLevelStyle({
      rawDecade,
      strongestRawDecade: 1,
      weakestRawDecade: -3,
      visibility: 0.1,
    });
    const high = createTopoContourLevelStyle({
      rawDecade,
      strongestRawDecade: 1,
      weakestRawDecade: -3,
      visibility: 1,
    });
    closeTo(low.opacity, high.opacity * 0.1);
  }
  const plan = createTopoSyntheticContourRenderPlan({
    beta: 0.5,
    contourRangeDecades: 3,
  });
  assert.equal(plan.length, 7);
  assert.equal(plan.some((circle) => "revealWeight" in circle), false);
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
  for (const beta of [0, 0.5, 0.83, 1]) {
    const sample = { pixelX: 210, pixelY: 357, width, height };
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

test("collinear perspectives retain only the admitted partner path-history contribution", () => {
  const initialFrame = createTopoCollinearPairFrame({ beta: 0.5, phase: 0 });
  assert.equal(
    initialFrame.sources.every((source) =>
      source.historyModel === TOPO_COLLINEAR_PAIR_HISTORY_MODEL &&
      source.historyStartTime === Number.NEGATIVE_INFINITY &&
      source.launchTime === 0 &&
      source.prelaunchVelocityBeta === 0 &&
      source.prelaunchPosition === source.start),
    true,
  );
  const initialSampler = createTopoCollinearPairRawSampler({
    beta: 0.5,
    phase: 0,
    sourceMaskRadius: 0,
  });
  const initialPositrinoPerspective = createTopoCollinearPairRawSampler({
    beta: 0.5,
    phase: 0,
    sourceMaskRadius: 0,
    observerId: "positrino",
  });
  assert.ok(initialSampler(0.5, 0.6) > 0);
  assert.ok(initialPositrinoPerspective(0.5, 0.6) < 0);
  closeTo(initialSampler(0.5, 0.6), -initialPositrinoPerspective(0.5, 0.6));
  const initialAbsoluteObserver = createTopoCollinearPairRawSampler({
    beta: 0.5,
    phase: 0,
    sourceMaskRadius: 0,
    superposition: true,
  });
  closeTo(
    initialAbsoluteObserver(0.5, 0.6),
    initialSampler(0.5, 0.6) + initialPositrinoPerspective(0.5, 0.6),
  );

  const approachingSampler = createTopoCollinearPairRawSampler({
    beta: 0.5,
    phase: 0.25,
    sourceMaskRadius: 0,
  });
  assert.ok(approachingSampler(0.38, 0.5) > 0);
  assert.ok(approachingSampler(0.62, 0.5) > 0);

  const approachingFrame = createTopoCollinearPairFrame({ beta: 0.5, phase: 0.25 });
  const selectedElectrino = approachingFrame.sources.find(({ id }) => id === "electrino");
  const retainedPositrino = approachingFrame.sources.find(({ id }) => id === "positrino");
  const maskedSampler = createTopoCollinearPairRawSampler({
    beta: 0.5,
    phase: 0.25,
    sourceMaskRadius: 1e-6,
  });
  assert.ok(Number.isFinite(maskedSampler(
    selectedElectrino.position.x,
    selectedElectrino.position.y,
  )));
  assert.equal(Number.isNaN(maskedSampler(
    retainedPositrino.position.x,
    retainedPositrino.position.y,
  )), true);

  const crossingSampler = createTopoCollinearPairRawSampler({
    beta: 0.5,
    phase: 0.5,
    sourceMaskRadius: 0,
  });
  assert.ok(crossingSampler(0.5, 0.6) > 0);

  const endpointSampler = createTopoCollinearPairRawSampler({
    beta: 1,
    phase: 0.5,
    sourceMaskRadius: 0,
  });
  assert.ok(Number.isFinite(endpointSampler(0.5, 0.8)));
});

test("beta-one absolute observer shows each arriving collinear wake", () => {
  const phase = 0;
  const absoluteSampler = createTopoCollinearPairRawSampler({
    beta: 1,
    phase,
    sourceMaskRadius: 0,
    superposition: true,
  });
  const electrinoWakeSampler = createTopoCollinearPairRawSampler({
    beta: 1,
    phase,
    sourceMaskRadius: 0,
    observerId: "positrino",
  });
  const positrinoWakeSampler = createTopoCollinearPairRawSampler({
    beta: 1,
    phase,
    sourceMaskRadius: 0,
    observerId: "electrino",
  });
  const leftTrailingPoint = [0.1, 0.6];
  const rightTrailingPoint = [0.9, 0.6];
  assert.ok(absoluteSampler(...leftTrailingPoint) < 0);
  assert.ok(absoluteSampler(...rightTrailingPoint) > 0);
  for (const point of [leftTrailingPoint, [0.5, 0.6], rightTrailingPoint]) {
    assert.ok(Number.isFinite(electrinoWakeSampler(...point)));
    assert.ok(Number.isFinite(positrinoWakeSampler(...point)));
    closeTo(
      absoluteSampler(...point),
      electrinoWakeSampler(...point) + positrinoWakeSampler(...point),
    );
  }
  closeTo(absoluteSampler(0.5, 0.6), 0);

  for (const replayPhase of [0, 0.25, 0.5, 0.75, 1]) {
    const fullHistorySampler = createTopoCollinearPairRawSampler({
      beta: 1,
      phase: replayPhase,
      horizontalWorldSpan: 16 / 9,
      sourceMaskRadius: 0,
      superposition: true,
    });
    for (const x of [-1, 0, 0.5, 1, 2]) {
      assert.ok(Number.isFinite(fullHistorySampler(x, 0.73)));
    }
  }

  const postCrossingPhase = 0.75;
  const postCrossingAbsolute = createTopoCollinearPairRawSampler({
    beta: 1,
    phase: postCrossingPhase,
    sourceMaskRadius: 0,
    superposition: true,
  });
  const postCrossingElectrinoWake = createTopoCollinearPairRawSampler({
    beta: 1,
    phase: postCrossingPhase,
    sourceMaskRadius: 0,
    observerId: "positrino",
  });
  const postCrossingPositrinoWake = createTopoCollinearPairRawSampler({
    beta: 1,
    phase: postCrossingPhase,
    sourceMaskRadius: 0,
    observerId: "electrino",
  });
  closeTo(
    postCrossingAbsolute(0.45, 0.6),
    postCrossingElectrinoWake(0.45, 0.6) +
      postCrossingPositrinoWake(0.45, 0.6),
  );
});

test("absolute observer sums both circular-binary wake contributions", () => {
  assert.equal(TOPO_DEFAULT_WAKE_VIEW, TOPO_ABSOLUTE_OBSERVER);
  assert.equal(normalizeTopoWakeView(), TOPO_ABSOLUTE_OBSERVER);
  assert.equal(normalizeTopoWakeView("absolute"), TOPO_ABSOLUTE_OBSERVER);
  const point = { x: 0.5, y: 0.8 };
  const electrinoView = sampleTopoCircularBinaryWake({
    point,
    beta: 0.5,
    sourceMaskRadius: 0,
    observerId: "electrino",
  });
  const positrinoView = sampleTopoCircularBinaryWake({
    point,
    beta: 0.5,
    sourceMaskRadius: 0,
    observerId: "positrino",
  });
  const absoluteView = sampleTopoCircularBinaryWake({
    point,
    beta: 0.5,
    sourceMaskRadius: 0,
    superposition: true,
  });
  assert.equal(electrinoView.state, "ordinary");
  assert.equal(positrinoView.state, "ordinary");
  assert.equal(absoluteView.state, "ordinary");
  closeTo(
    absoluteView.rawValue,
    electrinoView.rawValue + positrinoView.rawValue,
  );
  closeTo(
    createTopoCircularBinaryRawSampler({
      beta: 0.5,
      sourceMaskRadius: 0,
      superposition: true,
    })(point.x, point.y),
    absoluteView.rawValue,
  );
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

test("all Topo marker paths use one fixed CSS-pixel half-size radius", () => {
  assert.equal(TOPO_SOURCE_MARKER_RADIUS_SCALE, 0.5);
  assert.equal(TOPO_ELECTRINO_VISIBLE_MARKER_RADIUS_SCALE, 0.5);
  assert.equal(TOPO_POSITRINO_VISIBLE_MARKER_RADIUS_SCALE, 0.5);
  assert.equal(TOPO_SOURCE_MARKER_RADIUS_CSS_PIXELS, 4.5);
  assert.equal(TOPO_VISIBLE_SOURCE_MARKER_RADIUS_CSS_PIXELS, 2.25);
  closeTo(resolveTopoSourceMarkerRadius({
    width: 1000,
    height: 800,
    pixelRatio: 1,
  }), 4.5);
  closeTo(resolveTopoSourceMarkerRadius({
    width: 400,
    height: 300,
    pixelRatio: 2,
  }), 9);
  for (const [width, height, pixelRatio] of [
    [1000, 800, 1],
    [400, 300, 2],
    [916, 720, 1],
    [1832, 1440, 2],
  ]) {
    const baseline = resolveTopoSourceMarkerRadius({ width, height, pixelRatio });
    const expectedDeviceRadius = 2.25 * pixelRatio;
    closeTo(baseline, 4.5 * pixelRatio);
    closeTo(resolveTopoVisibleSourceMarkerRadius({
      polaritySign: -1, width, height, pixelRatio,
    }), expectedDeviceRadius);
    closeTo(resolveTopoVisibleSourceMarkerRadius({
      polaritySign: 1, width, height, pixelRatio,
    }), expectedDeviceRadius);
    closeTo(resolveTopoVisibleSourceMarkerCssRadius({ polaritySign: -1 }), 2.25);
    closeTo(resolveTopoVisibleSourceMarkerCssRadius({ polaritySign: 1 }), 2.25);
    closeTo(resolveTopoSourceMaskRadius({ width, height, pixelRatio }),
      TOPO_EXACT_SOURCE_MASK_WORLD_RADIUS);
    for (const displayScale of [0.5, 1, 2]) {
      closeTo(resolveTopoVisibleSourceMarkerWorldRadius({
        polaritySign: -1,
        width,
        height,
        pixelRatio,
        displayScale,
        axis: "vertical",
      }) * Math.max(1, height - 1) * displayScale, expectedDeviceRadius);
    }
  }

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
  assert.match(runtime, /sourceOverlayGeometry[\s\S]*resolveTopoVisibleSourceMarkerRadius/u);
  assert.match(runtime, /drawPairSourceOverlays[\s\S]*source\.polaritySign/u);
  assert.match(runtime, /drawCircularBinaryOverlay[\s\S]*polaritySign: sourceSign/u);
  assert.match(runtime, /markerDistance <[\s\S]*sourceMarkers\[0\]\.radius \+ sourceMarkers\[1\]\.radius/u);
  assert.match(runtime, /TOPO_EXACT_SOURCE_MASK_WORLD_RADIUS/u);
  assert.doesNotMatch(runtime, /drawCircularBinarySourceMarker/u);
});

test("moving pair marker compositor uses clips only for actual overlap", () => {
  const paintFrame = (positions) => {
    const operations = [];
    const drawn = [];
    const targetContext = {
      save: () => operations.push("save"),
      beginPath: () => operations.push("begin"),
      rect: (...values) => operations.push(["rect", ...values]),
      clip: () => operations.push("clip"),
      restore: () => operations.push("restore"),
    };
    const result = paintTopoPairSourceMarkerLayers({
      targetContext,
      width: 200,
      height: 100,
      positioned: positions,
      drawMarker: ({ source, geometry }) => drawn.push({
        polaritySign: source.polaritySign,
        x: geometry.x,
        radius: geometry.radius,
      }),
    });
    return { operations, drawn, result };
  };
  const separated = paintFrame([
    { source: { polaritySign: -1 }, geometry: { x: 90, y: 50, radius: 2.25 } },
    { source: { polaritySign: 1 }, geometry: { x: 110, y: 50, radius: 2.25 } },
  ]);
  const overlapping = paintFrame([
    { source: { polaritySign: -1 }, geometry: { x: 99, y: 50, radius: 2.25 } },
    { source: { polaritySign: 1 }, geometry: { x: 101, y: 50, radius: 2.25 } },
  ]);
  for (const frame of [separated, overlapping]) {
    assert.equal(frame.result.layerCount, 2);
    assert.equal(frame.drawn.length, 2);
    assert.deepEqual(frame.drawn.map(({ polaritySign, radius }) => ({ polaritySign, radius })), [
      { polaritySign: -1, radius: 2.25 },
      { polaritySign: 1, radius: 2.25 },
    ]);
  }
  assert.equal(separated.result.markersOverlap, false);
  assert.equal(separated.operations.filter((value) => value === "clip").length, 0);
  assert.equal(overlapping.result.markersOverlap, true);
  assert.equal(overlapping.operations.filter((value) => value === "clip").length, 2);
  assert.equal(separated.result.splitX, 100);
  assert.equal(overlapping.result.splitX, 100);
});

test("production marker paint style is fixed across Display scale", () => {
  for (const polaritySign of [-1, 1]) {
    for (const [pixelRatio, width, height] of [
      [1, 916, 720],
      [2, 1832, 1440],
    ]) {
      const styles = [0.5, 1, 2].map((displayScale) =>
        createTopoVisibleMarkerPaintStyle({
          polaritySign, width, height, pixelRatio, displayScale,
        }));
      assert.deepEqual(styles.map(({ radius }) => radius),
        [2.25 * pixelRatio, 2.25 * pixelRatio, 2.25 * pixelRatio]);
      styles.forEach((style) => assert.deepEqual(Object.keys(style), ["radius"]));
    }
  }
});

test("consecutive production marker paints emit only solid species-color coverage", () => {
  const style = createTopoVisibleMarkerPaintStyle({
    polaritySign: -1, width: 916, height: 720, pixelRatio: 1, displayScale: 1,
  });
  const paintCoverage = (x, sourceColor) => {
    const pixelsByColor = new Map();
    const operations = [];
    let path = null;
    const context = {
      canvas: { width: 16, height: 16 },
      fillStyle: "",
      globalAlpha: 0.25,
      globalCompositeOperation: "destination-out",
      save() { operations.push("save"); },
      restore() { operations.push("restore"); },
      beginPath() { operations.push("beginPath"); },
      arc(centerX, centerY, radius) {
        operations.push("arc");
        path = { centerX, centerY, radius };
      },
      fill() {
        operations.push("fill");
        assert.equal(this.globalAlpha, 1);
        assert.equal(this.globalCompositeOperation, "source-over");
      },
      fillRect(pixelX, pixelY, width, height) {
        operations.push("fillRect");
        assert.equal(width, 1);
        assert.equal(height, 1);
        const pixels = pixelsByColor.get(this.fillStyle) ?? [];
        pixels.push([pixelX, pixelY]);
        pixelsByColor.set(this.fillStyle, pixels);
      },
    };
    paintTopoSourceMarker({
      targetContext: context, x, y: 8, markerStyle: style,
      sourceColor,
    });
    return { pixelsByColor, operations, path };
  };
  for (const [centerX, sourceColor] of [[7.15, "blue"], [7.65, "blue"], [8, "red"]]) {
    const { pixelsByColor, operations, path } = paintCoverage(centerX, sourceColor);
    assert.deepEqual([...pixelsByColor.keys()], [sourceColor]);
    assert.deepEqual(operations.slice(0, 4), ["save", "beginPath", "arc", "fill"]);
    assert.equal(operations.at(-1), "restore");
    const pixels = pixelsByColor.get(sourceColor);
    assert.ok(pixels.length > 0);
    assert.equal(path.centerX, centerX + TOPO_CANVAS_SAMPLE_CENTER_OFFSET);
    assert.equal(path.centerY, 8 + TOPO_CANVAS_SAMPLE_CENTER_OFFSET);
    const expectedPixels = [];
    for (let pixelY = 0; pixelY < 16; pixelY += 1) {
      for (let pixelX = 0; pixelX < 16; pixelX += 1) {
        if (Math.hypot(pixelX - centerX, pixelY - 8) <= style.radius) {
          expectedPixels.push([pixelX, pixelY]);
        }
      }
    }
    assert.deepEqual(pixels, expectedPixels);
    for (const [pixelX, pixelY] of pixels) {
      assert.ok(Math.hypot(pixelX - centerX, pixelY - 8) <= style.radius + 1e-12);
    }
  }
});

test("moving pair marker coverage fully hides the exact source mask across subpixel frames", () => {
  const width = 40;
  const height = 18;
  const radius = 2.25;
  for (const background of ["white", "purple"]) {
    for (let step = 0; step <= 20; step += 1) {
      const leftX = 8.05 + step * 0.0475;
      const rightX = 30.95 - step * 0.0475;
      const positioned = [
        { source: { polaritySign: -1 }, geometry: { x: leftX, y: 8, radius } },
        { source: { polaritySign: 1 }, geometry: { x: rightX, y: 8, radius } },
      ];
      const pixels = new Map();
      const context = {
        canvas: { width, height },
        fillStyle: "",
        globalAlpha: 1,
        globalCompositeOperation: "source-over",
        save() {},
        restore() {},
        beginPath() {},
        arc() {},
        fill() {},
        fillRect(pixelX, pixelY) {
          pixels.set(pixelX + "," + pixelY, this.fillStyle);
        },
      };
      const result = paintTopoPairSourceMarkerLayers({
        targetContext: context,
        width,
        height,
        positioned,
        drawMarker: ({ source, geometry }) => paintTopoSourceMarker({
          targetContext: context,
          x: geometry.x,
          y: geometry.y,
          markerStyle: { radius: geometry.radius },
          sourceColor: source.polaritySign < 0 ? "blue" : "red",
        }),
      });
      assert.equal(result.markersOverlap, false);
      for (const { source, geometry } of positioned) {
        const color = source.polaritySign < 0 ? "blue" : "red";
        let maskPixelCount = 0;
        for (let pixelY = 0; pixelY < height; pixelY += 1) {
          for (let pixelX = 0; pixelX < width; pixelX += 1) {
            if (Math.hypot(
              pixelX - geometry.x,
              pixelY - geometry.y,
            ) <= geometry.radius) {
              maskPixelCount += 1;
              assert.equal(
                pixels.get(pixelX + "," + pixelY),
                color,
                background + " frame " + step + " exposed a source-mask pixel",
              );
            }
          }
        }
        assert.ok(maskPixelCount > 0);
      }
    }
  }
});

test("animated Topo scenarios enter paused at zero and keep Space context-safe", () => {
  const runtime = readRepoFile("src/apps/topo/TopoInteractionContractRuntime.js");
  const handlerStart = runtime.indexOf("function handleScenarioChange");
  const handlerEnd = runtime.indexOf(
    'listen(dom.scenarioControl, "pointerdown"',
    handlerStart,
  );
  const scenarioHandler = runtime.slice(handlerStart, handlerEnd);
  assert.match(scenarioHandler, /resetPairPlayback\(\)/u);
  assert.match(scenarioHandler, /stopBinaryPlayback\(\)/u);
  assert.match(scenarioHandler, /binaryProgress = 0/u);
  assert.match(scenarioHandler, /scheduleFrameChange\(\)/u);
  assert.doesNotMatch(scenarioHandler, /startPairPlayback/u);
  assert.match(runtime, /installRangeInteraction\(dom\.background\)/u);
  assert.match(runtime, /listen\(dom\.background, "input", scheduleFrameChange\)/u);
  assert.match(runtime, /binaryProgress = 0;[\s\S]*updateBinaryTransportPresentation\(\)/u);
  assert.equal(topoGlobalTransportOwnsSpace({
    code: "Space",
    target: { tagName: "INPUT", type: "radio" },
  }), false);
  assert.equal(topoGlobalTransportOwnsSpace({
    code: "Space",
    target: { tagName: "INPUT", type: "range" },
  }), true);
  assert.equal(topoGlobalTransportOwnsSpace({
    code: "Space",
    target: { tagName: "CANVAS" },
  }), true);
});

test("animated beta minimum is 0.05 while stationary singles retain beta zero", () => {
  assert.equal(TOPO_ANIMATED_MIN_BETA, 0.05);
  for (const scenarioId of [
    "approaching-collinear-electrino-positrino",
    "orbiting-binary",
  ]) {
    assert.equal(topoAnimatedScenarioUsesMinimumBeta(scenarioId), true);
    assert.equal(normalizeTopoScenarioBeta(0, scenarioId), 0.05);
    assert.equal(normalizeTopoScenarioBeta(0.01, scenarioId), 0.05);
    assert.equal(normalizeTopoScenarioBeta(0.05, scenarioId), 0.05);
    assert.equal(normalizeTopoScenarioBeta(1.2, scenarioId), 1);
  }
  for (const scenarioId of ["electrino", "positrino"]) {
    assert.equal(topoAnimatedScenarioUsesMinimumBeta(scenarioId), false);
    assert.equal(normalizeTopoScenarioBeta(0, scenarioId), 0);
    assert.equal(normalizeTopoScenarioBeta(0.01, scenarioId), 0.01);
  }
  const runtime = readRepoFile("src/apps/topo/TopoInteractionContractRuntime.js");
  assert.match(runtime, /dom\.beta\.min = minimum\.toFixed\(2\)/u);
  assert.match(runtime, /dom\.beta\.setAttribute\("aria-valuemin"/u);
  assert.match(runtime, /syncBetaControlForScenario\(scenarioId\)/u);
  assert.match(runtime, /minimum animated beta is 0\.05/u);
  assert.match(runtime, /resolveTopoCollinearPairPlaybackSeconds\([\s\S]*getState\(\)\.beta/u);
});

test("every display-affecting left-panel control invalidates the prior presentation", () => {
  const runtime = readRepoFile("src/apps/topo/TopoInteractionContractRuntime.js");
  const frameScheduler = runtime.slice(
    runtime.indexOf("function scheduleFrameChange"),
    runtime.indexOf("function scheduleContourChange"),
  );
  const contourScheduler = runtime.slice(
    runtime.indexOf("function scheduleContourChange"),
    runtime.indexOf("function render()"),
  );
  assert.match(frameScheduler, /resetPresentation: true/u);
  assert.match(contourScheduler, /resetPresentation: true/u);
  assert.doesNotMatch(
    runtime,
    /holding-complete-frame|holdCompletePairFrame|previousFrameBelongsToScenario/u,
  );
  for (const controlRoute of [
    /function handleScenarioChange[\s\S]*scheduleFrameChange\(\)/u,
    /dom\.partnerPerspectiveInputs\.forEach[\s\S]*scheduleFrameChange\(\)/u,
    /listen\(dom\.beta, "input", \(\) => \{[\s\S]*scheduleFrameChange\(\)/u,
    /listen\(dom\.binaryRadius, "input", \(\) => \{[\s\S]*scheduleFrameChange\(\)/u,
    /listen\(dom\.binaryOrbitGuide, "change", \(\) => \{[\s\S]*scheduleFrameChange\(\)/u,
    /dom\.binaryDirectionInputs\.forEach[\s\S]*scheduleFrameChange\(\)/u,
    /listen\(dom\.background, "input", scheduleFrameChange\)/u,
    /listen\(dom\.displayScale, "input", \(\) => \{[\s\S]*scheduleFrameChange\(\)/u,
    /listen\(dom\.contourCount, "input", scheduleContourChange\)/u,
    /listen\(dom\.shadingSpread, "input", scheduleFrameChange\)/u,
    /listen\(dom\.contourVisibility, "input", scheduleContourChange\)/u,
  ]) {
    assert.match(runtime, controlRoute);
  }
});

test("pointer-driven view controls return Space ownership to the stage", () => {
  const runtime = readRepoFile("src/apps/topo/TopoInteractionContractRuntime.js");
  for (const [control, activation] of [
    ["partnerPerspectiveControl", "partnerPerspectivePointerActivation"],
    ["binaryDirectionControl", "binaryDirectionPointerActivation"],
  ]) {
    assert.match(
      runtime,
      new RegExp(
        `listen\\(dom\\.${control}, "pointerdown", \\(\\) => \\{[\\s\\S]*?` +
        `${activation} = true`,
        "u",
      ),
    );
    assert.match(
      runtime,
      new RegExp(
        `listen\\(dom\\.${control}, "keydown", \\(\\) => \\{[\\s\\S]*?` +
        `${activation} = false`,
        "u",
      ),
    );
  }
  assert.match(
    runtime,
    /listen\(dom\.binaryOrbitGuide, "pointerdown", \(\) => \{[\s\S]*?binaryOrbitGuidePointerActivation = true/u,
  );
  for (const activation of [
    "partnerPerspectivePointerActivation",
    "binaryDirectionPointerActivation",
    "binaryOrbitGuidePointerActivation",
  ]) {
    assert.match(
      runtime,
      new RegExp(
        `const handFocusToStage = ${activation};[\\s\\S]*?` +
        `dom\\.canvas\\.focus\\?\\.\\(\\{ preventScroll: true \\}\\)`,
        "u",
      ),
    );
  }
  assert.equal(topoGlobalTransportOwnsSpace({
    code: "Space",
    target: { tagName: "INPUT", type: "radio" },
  }), false);
});

test("pointer-driven replay returns Space ownership to the stage", () => {
  const runtime = readRepoFile("src/apps/topo/TopoInteractionContractRuntime.js");
  assert.match(
    runtime,
    /function installPointerStageFocusHandoff\(control\)[\s\S]*listen\(control, "pointerdown"[\s\S]*pointerActivation = true[\s\S]*listen\(control, "keydown"[\s\S]*pointerActivation = false[\s\S]*dom\.canvas\.focus\?\.\(\{ preventScroll: true \}\)/u,
  );
  assert.match(
    runtime,
    /handPairReplayPointerFocusToStage =\s*installPointerStageFocusHandoff\(dom\.pairReplay\)/u,
  );
  assert.match(
    runtime,
    /handBinaryReplayPointerFocusToStage =\s*installPointerStageFocusHandoff\(dom\.binaryReplay\)/u,
  );
  assert.match(
    runtime,
    /listen\(dom\.pairReplay, "click"[\s\S]*handPairReplayPointerFocusToStage\(\)/u,
  );
  assert.match(
    runtime,
    /listen\(dom\.binaryReplay, "click"[\s\S]*handBinaryReplayPointerFocusToStage\(\)/u,
  );
  assert.equal(topoGlobalTransportOwnsSpace({
    code: "Space",
    target: { tagName: "BUTTON" },
  }), false);
});

test("Space-owned play and pause edges reset immediately without clearing animation frames", () => {
  const runtime = readRepoFile("src/apps/topo/TopoInteractionContractRuntime.js");
  const functionBody = (name, nextName) => runtime.slice(
    runtime.indexOf("function " + name),
    runtime.indexOf("function " + nextName),
  );
  assert.match(
    functionBody("pausePairPlayback", "startPairPlayback"),
    /resetPresentation: true/u,
  );
  assert.match(
    functionBody("startPairPlayback", "togglePairPlayback"),
    /resetPresentation: true/u,
  );
  assert.match(
    functionBody("startBinaryPlayback", "toggleBinaryPlayback"),
    /resetPresentation: true/u,
  );
  assert.match(
    functionBody("toggleBinaryPlayback", "beginBinaryTimelineScrub"),
    /resetPresentation: true/u,
  );
  assert.doesNotMatch(
    functionBody("advancePairPlayback", "beginPairTimelineScrub"),
    /resetPresentation: true/u,
  );
  assert.doesNotMatch(
    functionBody("runBinaryPlaybackFrame", "startBinaryPlayback"),
    /resetPresentation: true/u,
  );
  assert.match(
    runtime,
    /listen\(documentLike, "keydown", \(event\) => \{[\s\S]*event\.preventDefault\(\)[\s\S]*togglePairPlayback\(\)[\s\S]*toggleBinaryPlayback\(\)/u,
  );
});

test("Topo UI exposes partner-wake perspectives on one linear display path and preserves Home", () => {
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
  assert.doesNotMatch(runtime, /drawMajorDecadeLabels/u);
  assert.match(
    runtime,
    /function clearContourMapLabels\(\)[\s\S]*majorDecadeLabels = ""[\s\S]*majorDecadeLabelPositions = ""/u,
  );
  assert.match(runtime, /listen\(dom\.contourCount, "input", scheduleContourChange\)/u);
  assert.doesNotMatch(runtime, /dom\.contourReach/u);
  assert.doesNotMatch(runtime, /state\.contourReach|dataset\.contourReach/u);
  assert.equal(
    runtime.match(/contourReach: TOPO_DEFAULT_CONTOUR_REACH/gu)?.length,
    2,
  );
  assert.match(
    runtime,
    /listen\(dom\.shadingSpread, "input", scheduleFrameChange\)/u,
  );
  assert.match(runtime, /u_shading_reach_scale/u);
  assert.doesNotMatch(runtime, /u_shading_power|u_exponent_span/u);
  assert.match(
    runtime,
    /listen\(dom\.contourVisibility, "input", scheduleContourChange\)/u,
  );
  assert.match(
    runtime,
    /installRangeInteraction\(dom\.pairTimeline,[\s\S]*onInteractionStart: beginPairTimelineScrub,[\s\S]*onInteractionEnd: endPairTimelineScrub/u,
  );
  assert.match(
    runtime,
    /installRangeInteraction\(dom\.binaryTimeline,[\s\S]*onInteractionStart: beginBinaryTimelineScrub,[\s\S]*onInteractionEnd: endBinaryTimelineScrub/u,
  );
  assert.match(runtime, /listen\(dom\.pairTimeline, "input", seekPairTimeline\)/u);
  assert.match(runtime, /listen\(dom\.binaryTimeline, "input", seekBinaryTimeline\)/u);
  assert.match(
    runtime,
    /function seekPairTimeline\(\)[\s\S]*pairPlaybackPhase = timelinePhase\(dom\.pairTimeline\)[\s\S]*pairPlaybackPlaying = false/u,
  );
  assert.match(
    runtime,
    /function seekBinaryTimeline\(\)[\s\S]*binaryProgress = timelinePhase\(dom\.binaryTimeline\)[\s\S]*binaryPlaying = false/u,
  );
  assert.match(runtime, /pairPlaybackPhase = 0;[\s\S]*pairTimelineScrubbing = false/u);
  assert.match(
    runtime,
    /listen\(dom\.binaryReplay, "click", \(\) => \{[\s\S]*binaryProgress = 0;[\s\S]*beginRender/u,
  );
  assert.match(
    runtime,
    /pairPlaybackPlaying \|\| pairTimelineScrubbing/u,
  );
  assert.match(
    runtime,
    /binaryPlaying \|\| binaryTimelineScrubbing/u,
  );
  assert.match(
    runtime,
    /state\.contourVisibility === 0[\s\S]*\? "Hidden"/u,
  );
  assert.match(runtime, /partner-only-self-excluded/u);
  assert.match(runtime, /topoPartnerWakeSourceSign/u);
  assert.match(runtime, /u_partner_source_sign/u);
  assert.doesNotMatch(
    runtime,
    /sourceLocal|source-local|equalRadius|equal-radius|advancedDisplay|heatmapMode|u_enhanced_decade_contrast|u_source_local/u,
  );
  assert.doesNotMatch(runtime, /u_contour_reach/u);
  assert.equal(
    runtime.match(
      /rootMagnitude = sqrt\(abs\(rawValue\)\) \* u_shading_reach_scale/gu,
    )?.length,
    3,
  );
  assert.match(runtime, /createTopoNeutralBackgroundRgb[\s\S]*neutralWhiteMix/u);
  const markerSource = runtime.slice(
    runtime.indexOf("function drawSourceMarker"),
    runtime.indexOf("function drawSourceOverlay"),
  );
  assert.doesNotMatch(markerSource, /state\./u);
  assert.match(markerSource, /paintTopoSourceMarker/u);
  assert.doesNotMatch(markerSource, /outline|center|stroke|WHITE\.r/u);
  assert.doesNotMatch(runtime, /fillText\(\s*label/u);
  assert.doesNotMatch(runtime, /suppressed-responsive/u);
  assert.match(runtime, /contourRadii/u);
  assert.match(runtime, /TOPO_INVERSE_SQUARE_SCALE/u);
  assert.match(runtime, /createTopoCollinearPairRawSampler/u);
  assert.doesNotMatch(runtime, /createTopoCollinearPairContourRenderPlan/u);
  assert.match(runtime, /extractTopoSampledFieldContourSegments/u);
  assert.match(runtime, /drawSampledPartnerContours/u);
  assert.equal(runtime.match(/topoContourStyle\(/gu)?.length, 4);
  assert.match(runtime, /TOPO_CONTOUR_WEIGHT_POLICY_ID/u);
  assert.match(runtime, /contourWeightProfile/u);
  assert.doesNotMatch(runtime, /revealWeight|outwardProgress/u);
  const geometryKeyBodies = Array.from(runtime.matchAll(
    /dataset\.contourGeometryKey = \[([\s\S]*?)\]\.join\(":"\)/gu,
  )).map((match) => match[1]);
  assert.equal(geometryKeyBodies.length, 1);
  assert.equal(
    geometryKeyBodies.every((body) => !body.includes("contourVisibility")),
    true,
  );
  assert.match(
    runtime,
    /const contourKey = matchingFrame[\s\S]*matchingFrame\.key \+ ":count=" \+ state\.contourCount[\s\S]*: "pending"/u,
  );
  assert.match(
    runtime,
    /const contourRawFrame = \(state\.binary[\s\S]*createLiveSampledContourFrame/u,
  );
  assert.match(runtime, /contourScalarAuthority = state\.superpositionView[\s\S]*signed-two-source-superposition-field[\s\S]*partner-raw-wake-field/u);
  assert.match(runtime, /masked-and-unavailable-cells-excluded/u);
  assert.match(runtime, /sourceContribution/u);
  assert.match(runtime, /stationaryPrehistory/u);
  assert.doesNotMatch(
    runtime,
    /state\.pairMode && state\.superpositionView && state\.beta === 1/u,
  );
  assert.match(runtime, /setTransportControlButtonPresentation/u);
  assert.match(runtime, /TRANSPORT_CONTROL_ICON\.RESET/u);
  assert.doesNotMatch(runtime, /float magnitude = min\(/u);
  assert.match(
    runtime,
    /if \(u_scalar_pass > 0\.5\)[\s\S]*vec4\(rawValue, 1\.0, 0\.0, 1\.0\)[\s\S]*return;[\s\S]*rootMagnitude = sqrt\(abs\(rawValue\)\)/u,
  );
  assert.doesNotMatch(runtime, /asinh|arsinh|u_gain|TOPO_FIELD_COLOR_GAIN/iu);
  assert.doesNotMatch(runtime, /transformId|u_transform|scheduleTransformChange|dom\.transform/u);

  assert.match(html, /<title>Architrino Wake Topography<\/title>/u);
  assert.match(html, /<h1>Wake Topography<\/h1>/u);
  assert.doesNotMatch(html, /Two-dimensional prescribed motion/u);
  assert.match(html, /<h2 id="topo-about-title">About this view<\/h2>/u);
  assert.match(
    html,
    /Explore wake topography from a receiver perspective for prescribed what if transmitter path scenarios\./u,
  );
  assert.match(
    html,
    /id="topo-scenario-control"[\s\S]*?aria-describedby="topo-scenario-provenance-note"[\s\S]*?These paths are chosen inputs, not predictions of how architrinos naturally move\./u,
  );
  assert.match(html, /<span>Speed<\/span>/u);
  assert.match(html, /<span>Topo count<\/span>/u);
  assert.doesNotMatch(html, /Contour reach|topo-contour-reach/iu);
  assert.doesNotMatch(runtime, /steps outward|genuine levels reaching|per sign reaching/iu);
  assert.match(html, /<span>Shading<\/span>/u);
  assert.match(
    html,
    /id="topo-shading-spread"[\s\S]*?min="0"[\s\S]*?max="100"[\s\S]*?value="50"/u,
  );
  assert.doesNotMatch(
    html,
    /topo-shading-spread-output|% · broad|% · balanced|% · tight/u,
  );
  assert.match(html, /<span>Topo fade<\/span>/u);
  assert.match(html, /<span>Scale<\/span>/u);
  assert.doesNotMatch(
    html,
    /<span>(?:Prescribed speed|Contour count|Shading spread|Contour strength|Display scale · visible extent)<\/span>/u,
  );
  assert.doesNotMatch(html, /topo-contour-visibility-output|>75%<\/output>/u);
  assert.doesNotMatch(html, /topo-display-scale-output|1\.00× · 1\.00 high/u);
  assert.doesNotMatch(html, /Display coordinates: linear Euclidean/u);
  assert.match(
    html,
    /<h2 id="topo-definitions-title">Definitions<\/h2>[\s\S]*?<strong>Wake propagation<\/strong> follows wake emitted at earlier moments as it travels outward\.[\s\S]*?<strong>Wake topography<\/strong> takes one present-time slice and maps the wake arriving at every possible receiver location\. Each contour joins locations receiving the same wake value\. During uniform motion, the pattern keeps its shape because the causal geometry repeats, even though the wake producing it is continually renewed\./u,
  );
  assert.doesNotMatch(
    html,
    /topo-advanced-display|Advanced display choices|topo-view|topo-heatmap-mode|Source-local levels|Equal-radius levels|Enhanced tenfold contrast/u,
  );
  assert.match(html, />Approaching collinear electrino and positrino<\/span>/u);
  assert.match(html, /id="topo-partner-perspective-control"[\s\S]*<legend>View<\/legend>/u);
  assert.match(html, /name="topo-partner-perspective" value="electrino"/u);
  assert.match(html, /name="topo-partner-perspective" value="positrino"/u);
  assert.match(html, /name="topo-partner-perspective" value="absolute" checked[\s\S]*<span>Absolute Observer<\/span>/u);
  assert.match(runtime, /dom\.partnerPerspectiveControl\.hidden = !receiverViewAvailable/u);
  assert.match(runtime, /signed-two-source-superposition/u);
  assert.match(runtime, /superposition: state\.superpositionView/u);
  assert.match(runtime, /dom\.partnerPerspectiveInputs\.forEach/u);
  assert.match(html, /id="topo-pair-play"/u);
  assert.match(
    html,
    /id="topo-pair-play"[\s\S]*id="topo-pair-timeline"[\s\S]*id="topo-pair-replay"/u,
  );
  assert.match(
    html,
    /id="topo-binary-play"[\s\S]*id="topo-binary-timeline"[\s\S]*id="topo-binary-replay"/u,
  );
  assert.match(html, /aria-label="Collinear replay position"/u);
  assert.match(html, /aria-label="Orbit playback position"/u);
  assert.match(html, /aria-valuetext="0% of two rotations"/u);
  assert.match(runtime, /progressText \+ " of two rotations"/u);
  assert.match(runtime, /binaryReplayRotations/u);
  assert.doesNotMatch(
    html,
    /topo-pair-progress|topo-binary-progress-output/u,
  );
  assert.doesNotMatch(html, /role="progressbar"/u);
  assert.match(html, /id="topo-pair-replay"/u);
  assert.doesNotMatch(html, /topo-contour-count-output|per sign \+ zero/u);
  assert.match(html, /genuine equal-wake contour levels/u);
  assert.match(html, /id="topo-legend-mapping"/u);
  assert.match(html, />Shading scale<\/h2>/u);
  assert.match(
    html,
    /signed contributions are summed before drawing equal-value topographic contours/u,
  );
  assert.match(runtime, /self-wake is excluded/u);
  assert.doesNotMatch(html, /Scale transform|topo-transform|Linear|Signed log2|Asinh/u);
  assert.doesNotMatch(html, /Raw probe|Nonnumeric state legend|topo-stage-caption/u);
  assert.doesNotMatch(runtime, /R\(e\)=\(e\+1\)r|nonnegative-raw-exponents-only/u);
  assert.match(
    runtime,
    /signed contributions are summed before drawing equal-value topographic contours/u,
  );
  assert.match(html, /id="home-button"[\s\S]*id="nav-up"[\s\S]*id="nav-forward"[\s\S]*id="scene-search"/u);

  assert.match(css, /\.topo-range-note/u);
  assert.doesNotMatch(css, /topo-advanced-display|topo-heatmap-mode|topo-view/u);
  assert.match(css, /\.topo-pair-transport/u);
  assert.match(css, /\.topo-timeline/u);
  assert.match(
    css,
    /\.topo-field,[\s\S]*?\.topo-range-field \{[\s\S]*?grid-template-columns: 106px minmax\(0, 1fr\)/u,
  );
  assert.match(
    css,
    /\.topo-range-field > \.topo-range-row \{[\s\S]*?grid-column: 2/u,
  );
  assert.match(css, /#topo-background::-(?:webkit-slider-runnable-track|moz-range-track)[\s\S]*linear-gradient/u);
  assert.match(
    css,
    /\.topo-legend-gradient \{[\s\S]*?border: 0;[\s\S]*?background: linear-gradient/u,
  );
  assert.match(css, /@media \(max-width: 820px\)/u);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/u);
  assert.match(css, /input::-webkit-slider-runnable-track \{[\s\S]*height: 5px;/u);
  assert.match(css, /input:focus-visible::-webkit-slider-thumb/u);
  assert.match(tokens, /--ui-color-electric-purple: #8f00ff;/u);
  assert.match(tokens, /--ui-data-zero: var\(--ui-color-electric-purple\);/u);
});

test("Topo rendered copy does not expose exponent terminology", () => {
  const html = readRepoFile("topo.html");
  const runtime = readRepoFile("src/apps/topo/TopoInteractionContractRuntime.js");
  const renderedHtml = [
    ...html.matchAll(/>([^<]+)</gu),
    ...html.matchAll(/(?:aria-label|aria-description|aria-valuetext|title)="([^"]+)"/gu),
  ].map((match) => match[1]).join("\n");
  assert.doesNotMatch(
    renderedHtml,
    /\b(?:exponent|decade)s?\b|\be\s*(?:=|equals|≥)|R\(e\)|integer-e/iu,
  );
  assert.doesNotMatch(runtime, /drawMajorDecadeLabels/u);
  assert.match(runtime, /dom\.legendTicks\.replaceChildren\(\)/u);
  for (const formerCopy of [
    "Equal-radius exponent",
    "Source-local decades",
    "Enhanced decade contrast",
    "wake-strength exponent",
    "wake-intensity exponent",
    "e equals",
    "e≥",
    "integer-e",
  ]) {
    assert.equal(runtime.includes(formerCopy), false, formerCopy);
  }
});

test("binary scalar framebuffer probes renderability before accepting a precision path", () => {
  const runtime = readRepoFile("src/apps/topo/TopoInteractionContractRuntime.js");
  assert.match(runtime, /createTopoScalarFramebufferResources/u);
  assert.match(runtime, /OES_texture_float/u);
  assert.match(runtime, /OES_texture_half_float/u);
  assert.match(runtime, /WEBGL_color_buffer_float/u);
  assert.match(runtime, /EXT_color_buffer_half_float/u);
  assert.match(runtime, /TEXTURE_MIN_FILTER, fieldGl\.NEAREST/u);
  assert.match(runtime, /checkFramebufferStatus\(fieldGl\.FRAMEBUFFER\)/u);
  assert.match(runtime, /binaryScalarFramebufferReason/u);
  assert.match(runtime, /binaryScalarFramebufferPrecisionError/u);
  assert.match(runtime, /r=signed-raw,g=ordinary-availability/u);
  assert.match(runtime, /readPixels\(0, 0, 1, 1, fieldGl\.RGBA, fieldGl\.FLOAT/u);
  assert.match(runtime, /binaryScalarPassAuditMaxAbsoluteError/u);
  assert.match(runtime, /sampleTopoCircularBinaryWake/u);
  assert.match(runtime, /fieldGl\.bindFramebuffer\(fieldGl\.FRAMEBUFFER, topoScalarFramebuffer\.framebuffer\)/u);
  assert.match(runtime, /resizeTopoScalarFramebuffer\(topoScalarFramebuffer, width, height\)/u);
});

test("diagnostic scalar-texture marching-squares program restores state and routes one captured threshold", () => {
  const runtime = readRepoFile("src/apps/topo/TopoInteractionContractRuntime.js");
  assert.match(runtime, /TOPO_MARCHING_SQUARES_GLSL_CONTRACT/u);
  assert.match(runtime, /createTopoPassTwoDiagnosticProgram/u);
  for (const uniform of [
    "u_scalar_texture",
    "u_scalar_resolution",
    "u_threshold",
    "u_line_half_width",
    "u_ambiguous_parity",
  ]) {
    assert.match(runtime, new RegExp(`uniform (sampler2D|vec2|float) ${uniform}`, "u"));
  }
  assert.match(runtime, /a\.g < 0\.5 \|\| b\.g < 0\.5 \|\| c\.g < 0\.5 \|\| d\.g < 0\.5/u);
  assert.match(runtime, /caseIndex == 1 \|\| caseIndex == 14/u);
  assert.match(runtime, /caseIndex == 2 \|\| caseIndex == 13/u);
  assert.match(runtime, /caseIndex == 3 \|\| caseIndex == 12/u);
  assert.match(runtime, /caseIndex == 4 \|\| caseIndex == 11/u);
  assert.match(runtime, /caseIndex == 6 \|\| caseIndex == 9/u);
  assert.match(runtime, /caseIndex == 7 \|\| caseIndex == 8/u);
  assert.match(runtime, /caseIndex == 5 \|\| caseIndex == 10/u);
  assert.match(runtime, /determinant == 0\.0 && mod\(cell\.x \+ cell\.y \+ u_ambiguous_parity, 2\.0\) < 0\.5/u);
  assert.match(runtime, /pointSegmentDistance/u);
  assert.match(runtime, /binaryPassTwoDiagnostic/u);
  assert.match(runtime, /drawTopoPassTwoDiagnostic/u);
  assert.match(runtime, /fieldGl\.bindFramebuffer\(fieldGl\.FRAMEBUFFER, topoPassTwoDiagnosticTarget\.framebuffer\)/u);
  assert.match(runtime, /fieldGl\.bindTexture\(fieldGl\.TEXTURE_2D, topoScalarFramebuffer\.texture\)/u);
  assert.match(runtime, /fieldGl\.readPixels\(0, 0, width, height, fieldGl\.RGBA, fieldGl\.UNSIGNED_BYTE, raster\)/u);
  assert.match(runtime, /fieldGl\.bindFramebuffer\(fieldGl\.FRAMEBUFFER, savedFramebuffer\)/u);
  assert.match(runtime, /fieldGl\.viewport\(savedViewport\[0\], savedViewport\[1\], savedViewport\[2\], savedViewport\[3\]\)/u);
  assert.match(runtime, /fieldGl\.deleteFramebuffer\(topoPassTwoDiagnosticTarget\.framebuffer\)/u);
  assert.match(runtime, /fieldGl\.deleteTexture\(topoPassTwoDiagnosticTarget\.texture\)/u);
  assert.match(runtime, /all-partner-wake-raw-levels/u);
  assert.match(runtime, /binaryPassTwoDiagnosticAllLevels/u);
  assert.match(runtime, /not-applicable:partner-wake/u);
  assert.match(runtime, /binaryPassTwoDiagnosticAllLevelsSummary/u);
  assert.match(runtime, /TOPO_BINARY_PASS_TWO_EGG_DIAGNOSTIC_PHASE = 0\.375/u);
  assert.match(runtime, /TOPO_BINARY_PASS_TWO_DIAGNOSTIC_PHASES/u);
  assert.match(runtime, /binaryPassTwoDiagnosticPhases/u);
  assert.match(runtime, /diagnosticLevels\.map\(\(threshold\)/u);
  assert.match(runtime, /binaryPassTwoDiagnosticDraw/u);
});

test("ordinary binary rendering presents the scalar texture and bypasses coarse CPU contours", () => {
  const runtime = readRepoFile("src/apps/topo/TopoInteractionContractRuntime.js");
  assert.match(runtime, /createCircularBinaryScalarPresentationRenderer/u);
  assert.match(runtime, /u_contour_values\[\$\{TOPO_BINARY_GPU_CONTOUR_MAX_LEVELS\}\]/u);
  assert.match(runtime, /u_contour_opacities\[\$\{TOPO_BINARY_GPU_CONTOUR_MAX_LEVELS\}\]/u);
  assert.match(runtime, /u_contour_half_widths\[\$\{TOPO_BINARY_GPU_CONTOUR_MAX_LEVELS\}\]/u);
  assert.match(runtime, /u_contour_parities\[\$\{TOPO_BINARY_GPU_CONTOUR_MAX_LEVELS\}\]/u);
  assert.match(runtime, /topoMarchingSquaresLevelIdentity\(level\.value\) % 2/u);
  assert.match(runtime, /Coverage is a rasterization edge only/u);
  assert.match(runtime, /smoothstep\(max\(0\.0, halfWidth - 0\.75\),/u);
  assert.match(runtime, /gpu-scalar-marching-squares-current-frame/u);
  assert.match(runtime, /const contourRawFrame = \(state\.binary &&[\s\S]*?\? null/u);
  assert.match(runtime, /topoBinaryDiagnosticsEnabled[\s\S]*?dom\.app\.dataset\.topoBinaryDiagnostics === "enabled"/u);
  assert.match(runtime, /const diagnosticPhase = topoBinaryDiagnosticsEnabled && state\.beta === 1/u);
  assert.match(runtime, /circularBinaryScalarPresentationRenderer && topoScalarFramebuffer\.available/u);
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
