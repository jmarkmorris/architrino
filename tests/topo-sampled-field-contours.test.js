import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  createTopoContourLevelStyle,
  topoWorldPointForCanvasPixel,
} from "../src/apps/topo/TopoInteractionContract.js";
import {
  TOPO_CONTOUR_LEVELS_PER_DECADE,
  TOPO_SAMPLED_FIELD_CONTOUR_POLICY_ID,
  TOPO_SAMPLED_FIELD_STATE,
  connectTopoSampledFieldContourSegments,
  createTopoSignedContourLevels,
  extractTopoSampledFieldContourSegments,
} from "../src/apps/topo/TopoSampledFieldContours.js";
import {
  createTopoCollinearPartnerCharacteristicDiagnostic,
  createTopoCollinearPairRawSampler,
  solveTopoCollinearPairCausalDelay,
} from "../src/apps/topo/TopoCollinearPairScenario.js";
import {
  createTopoCircularBinaryRawSampler,
  topoCircularBinaryWorldPointForCanvasPixel,
} from "../src/apps/topo/TopoCircularBinaryScenario.js";
import {
  TOPO_PAIR_CROSSING_CONTOUR_GRID_WIDTH,
  TOPO_PAIR_CROSSING_PHASE_END,
  TOPO_PAIR_CROSSING_PHASE_START,
  TOPO_PAIR_PLAYBACK_CONTOUR_GRID_WIDTH,
  TOPO_PAIR_COINCIDENCE_CONTOUR_GRID_WIDTH,
  TOPO_PAIR_COINCIDENCE_PHASE_END,
  TOPO_PAIR_COINCIDENCE_PHASE_START,
  TOPO_BINARY_PLAYBACK_CONTOUR_GRID_WIDTH,
  TOPO_BINARY_PAUSED_CONTOUR_GRID_WIDTH,
  TOPO_BINARY_HIGH_SPEED_CONTOUR_BETA,
  TOPO_BINARY_HIGH_SPEED_PLAYBACK_CONTOUR_GRID_WIDTH,
  TOPO_BINARY_HIGH_SPEED_PAUSED_CONTOUR_GRID_WIDTH,
  TOPO_BINARY_SOURCE_REFINEMENT_GRID_SIZE,
  TOPO_BINARY_SOURCE_REFINEMENT_RADIUS_PIXELS,
  TOPO_BINARY_SOURCE_REFINEMENT_REPLACEMENT_RADIUS_PIXELS,
  TOPO_BINARY_SOURCE_REFINEMENT_MIN_RAW_DECADE,
  createTopoSampledContourPaintStyle,
  resolveTopoLinearViewportAnchor,
  resolveTopoCollinearSourceMaskRadius,
  resolveTopoPairPlaybackContourGridWidth,
  resolveTopoBinaryContourGridWidth,
  topoGlobalTransportOwnsSpace,
  topoRangePointerMoveOwnsInteraction,
} from "../src/apps/topo/TopoInteractionContractRuntime.js";

function closeTo(actual, expected, tolerance = 1e-12) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    String(actual) + " is not within " + tolerance + " of " + expected,
  );
}

test("signed sampled-field levels use one raw factor-of-ten level per decade plus zero", () => {
  assert.equal(
    TOPO_SAMPLED_FIELD_CONTOUR_POLICY_ID,
    "topo_sampled_field_symmetric_raw_decades/v2",
  );
  assert.equal(TOPO_CONTOUR_LEVELS_PER_DECADE, 1);
  const levels = createTopoSignedContourLevels({ rangeDecades: 3 });
  assert.equal(levels.length, 15);
  assert.deepEqual(
    levels.reduce((counts, level) => ({
      ...counts,
      [level.family]: (counts[level.family] ?? 0) + 1,
    }), {}),
    { zero: 1, negative: 7, positive: 7 },
  );
  assert.equal(levels[0].value, 0);
  const positive = levels.filter((level) => level.family === "positive");
  assert.deepEqual(
    positive.map(({ rawDecade }) => rawDecade),
    [3, 2, 1, 0, -1, -2, -3],
  );
  assert.deepEqual(
    positive.map(({ value }) => value),
    [64000, 6400, 640, 64, 6.4, 0.64, 0.064],
  );
  assert.equal(positive.filter(({ referenceLevel }) => referenceLevel).length, 1);
  assert.equal(new Set(positive.map(({ value }) => value)).size, positive.length);
});

test("dense sampled levels preserve signed symmetry while count and reach vary independently", () => {
  const levels = createTopoSignedContourLevels({
    contourCount: 13,
    contourReach: 3,
  });
  const positive = levels.filter((level) => level.family === "positive");
  const negative = levels.filter((level) => level.family === "negative");
  assert.equal(levels.length, 27);
  assert.equal(positive.length, 13);
  assert.equal(negative.length, 13);
  assert.deepEqual(
    negative.map(({ value }) => value),
    positive.map(({ value }) => -value),
  );
  closeTo(positive[0].rawDecade, 1);
  closeTo(positive.at(-1).rawDecade, -3);
  for (let index = 0; index < positive.length; index += 1) {
    const positiveStyle = createTopoContourLevelStyle({
      ...positive[index],
      strongestRawDecade: 1,
      weakestRawDecade: -3,
      visibility: 0.75,
    });
    const negativeStyle = createTopoContourLevelStyle({
      ...negative[index],
      strongestRawDecade: 1,
      weakestRawDecade: -3,
      visibility: 0.75,
    });
    assert.equal(positiveStyle.opacity, negativeStyle.opacity);
    if (index > 0) {
      assert.ok(positiveStyle.opacity < createTopoContourLevelStyle({
        ...positive[index - 1],
        strongestRawDecade: 1,
        weakestRawDecade: -3,
        visibility: 0.75,
      }).opacity);
    }
  }

  const farther = createTopoSignedContourLevels({
    contourCount: 13,
    contourReach: 6,
  }).filter((level) => level.family === "positive");
  assert.equal(farther.length, positive.length);
  closeTo(farther[0].rawDecade, positive[0].rawDecade);
  assert.ok(farther.at(-1).value < positive.at(-1).value);
});

test("binary sampled paint keeps strong levels perceptible while weaker levels fade sooner", () => {
  const levels = createTopoSignedContourLevels({
    contourCount: 13,
    contourReach: 3,
  });
  const bounds = {
    strongestRawDecade: 1,
    weakestRawDecade: -3,
  };
  const positive = levels.filter((level) => level.family === "positive");
  const negative = levels.filter((level) => level.family === "negative");
  const strongest = positive[0];
  const weakest = positive.at(-1);
  const zero = levels.find((level) => level.family === "zero");
  const paint = (level, visibility, binary = true) =>
    createTopoSampledContourPaintStyle({
      level,
      bounds,
      visibility,
      binary,
      pixelRatio: 2,
    });

  const strongFull = paint(strongest, 1);
  const weakFull = paint(weakest, 1);
  closeTo(strongFull.opacity, 1);
  closeTo(weakFull.opacity, 0.32);
  closeTo(strongFull.lineWidth, 2.3);
  assert.equal(strongFull.strengthPolicy, "level-weighted-progressive-fade");

  const strongIntermediate = paint(strongest, 0.6);
  const weakIntermediate = paint(weakest, 0.6);
  const zeroIntermediate = paint(zero, 0.6);
  closeTo(strongIntermediate.opacity, Math.sqrt(0.6));
  closeTo(
    weakIntermediate.opacity,
    weakFull.levelWeight *
      Math.sqrt(0.6) ** (1 / weakFull.levelWeight),
  );
  assert.ok(weakIntermediate.opacity < weakFull.opacity * 0.6);
  assert.ok(zeroIntermediate.opacity < strongIntermediate.opacity);
  assert.ok(zeroIntermediate.opacity > weakIntermediate.opacity);
  assert.ok(
    strongIntermediate.opacity / weakIntermediate.opacity >
      strongFull.opacity / weakFull.opacity,
  );

  for (let index = 0; index < positive.length; index += 1) {
    closeTo(
      paint(positive[index], 0.35).opacity,
      paint(negative[index], 0.35).opacity,
    );
  }
  closeTo(paint(strongest, 0).opacity, 0);
  closeTo(paint(weakest, 0).opacity, 0);

  const passedPairStyle = paint(weakest, 0.6, false);
  closeTo(passedPairStyle.opacity, weakFull.opacity * 0.6);
  assert.equal(passedPairStyle.strengthPolicy, "linear-profile-scale");

  const runtime = readFileSync(new URL(
    "../src/apps/topo/TopoInteractionContractRuntime.js",
    import.meta.url,
  ), "utf8");
  assert.match(
    runtime,
    /createTopoSampledContourPaintStyle\(\{[\s\S]*binary: state\.binary,[\s\S]*pixelRatio,[\s\S]*\}\)/u,
  );
  assert.match(runtime, /contourStagingContext\.globalAlpha = contourStyle\.opacity/u);
  assert.match(runtime, /contourStagingContext\.lineWidth = contourStyle\.lineWidth/u);
  assert.match(runtime, /dataset\.contourPaintProfile = emittedContourStyles/u);
});

test("marching squares locates the explicit zero contour in sampled-grid coordinates", () => {
  const result = extractTopoSampledFieldContourSegments({
    raw: new Float32Array([
      -1, 0, 1,
      -1, 0, 1,
      -1, 0, 1,
    ]),
    width: 3,
    height: 3,
    levels: [{ value: 0, family: "zero" }],
  });
  assert.equal(result.invalidCellCount, 0);
  assert.equal(result.segments.length, 2);
  result.segments.forEach((segment) => {
    assert.equal(segment.family, "zero");
    closeTo(segment.x1, 1);
    closeTo(segment.x2, 1);
  });
});

test("contour paint paths join existing shared marching-squares endpoints without changing edges", () => {
  const extracted = extractTopoSampledFieldContourSegments({
    raw: new Float32Array([
      -1, 0, 1,
      -1, 0, 1,
      -1, 0, 1,
    ]),
    width: 3,
    height: 3,
    levels: [{ value: 0, family: "zero" }],
  });
  const paths = connectTopoSampledFieldContourSegments(extracted.segments);
  assert.equal(paths.length, 1);
  assert.equal(paths[0].length, extracted.segments.length + 1);
  const joinedEdgeCount = paths.reduce((count, path) => count + path.length - 1, 0);
  assert.equal(joinedEdgeCount, extracted.segments.length);
  assert.deepEqual(
    paths[0].map((point) => point.x),
    [1, 1, 1],
  );
});

test("high-speed binary uses the dense-grid component topology rather than the coarse preview alias", () => {
  const levels = createTopoSignedContourLevels({
    contourCount: 13,
    contourReach: 3,
  });
  const selected = levels.find((level) =>
    level.family === "negative" && level.rawDecade === -2);
  const componentCount = (width, height) => {
    const sample = createTopoCircularBinaryRawSampler({
      beta: 1,
      progress: 0,
      radius: 0.3,
      sourceMaskRadius: 0.003688525,
    });
    const raw = new Float32Array(width * height);
    const sampleStates = new Uint8Array(raw.length);
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const point = topoCircularBinaryWorldPointForCanvasPixel({
          pixelX: x,
          pixelY: y,
          width,
          height,
          displayScale: 1,
        });
        const index = y * width + x;
        const value = sample(point.x, point.y);
        raw[index] = value;
        sampleStates[index] = Number.isNaN(value)
          ? TOPO_SAMPLED_FIELD_STATE.MASKED
          : Number.isFinite(value)
            ? TOPO_SAMPLED_FIELD_STATE.VALID
            : TOPO_SAMPLED_FIELD_STATE.UNAVAILABLE;
      }
    }
    const extracted = extractTopoSampledFieldContourSegments({
      raw,
      sampleStates,
      width,
      height,
      levels,
    });
    return connectTopoSampledFieldContourSegments(extracted.segments.filter(
      (segment) => segment.family === selected.family &&
        segment.value === selected.value,
    )).length;
  };
  assert.equal(componentCount(120, 94), 1);
  assert.equal(componentCount(240, 188), 2);
});

test("positive and negative contours share the authoritative samples", () => {
  const raw = new Float32Array([
    -20, 0, 20,
    -20, 0, 20,
  ]);
  const result = extractTopoSampledFieldContourSegments({
    raw,
    width: 3,
    height: 2,
    levels: [-10, 0, 10],
  });
  assert.deepEqual(
    new Set(result.segments.map((segment) => segment.family)),
    new Set(["negative", "zero", "positive"]),
  );
  assert.deepEqual(Array.from(raw), [-20, 0, 20, -20, 0, 20]);
});

test("invalid source-mask cells fail closed and saddles resolve deterministically", () => {
  const invalid = extractTopoSampledFieldContourSegments({
    raw: new Float32Array([Number.NaN, 1, -1, 1]),
    width: 2,
    height: 2,
    levels: [0],
  });
  assert.equal(invalid.invalidCellCount, 1);
  assert.equal(invalid.segments.length, 0);

  const saddleInput = new Float32Array([1, -1, -1, 1]);
  const first = extractTopoSampledFieldContourSegments({
    raw: saddleInput,
    width: 2,
    height: 2,
    levels: [0],
  });
  const second = extractTopoSampledFieldContourSegments({
    raw: saddleInput,
    width: 2,
    height: 2,
    levels: [0],
  });
  assert.equal(first.segments.length, 2);
  assert.deepEqual(first.segments, second.segments);
});


test("ambiguous-cell topology is keyed by raw level value rather than range index", () => {
  const raw = new Float32Array([1, -1, -1, 1]);
  const sharedAlone = extractTopoSampledFieldContourSegments({
    raw,
    width: 2,
    height: 2,
    levels: [0],
  }).segments.map(({ x1, y1, x2, y2 }) => ({ x1, y1, x2, y2 }));
  const sharedAfterOtherLevels = extractTopoSampledFieldContourSegments({
    raw,
    width: 2,
    height: 2,
    levels: [-0.5, 0, 0.5],
  }).segments
    .filter(({ value }) => value === 0)
    .map(({ x1, y1, x2, y2 }) => ({ x1, y1, x2, y2 }));
  assert.deepEqual(sharedAfterOtherLevels, sharedAlone);
});

test("sampled scientific states remain distinct and every unavailable corner terminates contours", () => {
  assert.notEqual(TOPO_SAMPLED_FIELD_STATE.MASKED, TOPO_SAMPLED_FIELD_STATE.UNAVAILABLE);
  assert.notEqual(TOPO_SAMPLED_FIELD_STATE.UNRESOLVED, TOPO_SAMPLED_FIELD_STATE.SINGULAR);
  for (const state of [
    TOPO_SAMPLED_FIELD_STATE.MASKED,
    TOPO_SAMPLED_FIELD_STATE.UNAVAILABLE,
    TOPO_SAMPLED_FIELD_STATE.UNRESOLVED,
    TOPO_SAMPLED_FIELD_STATE.SINGULAR,
  ]) {
    const result = extractTopoSampledFieldContourSegments({
      raw: new Float32Array([-1, 1, -1, 1]),
      sampleStates: new Uint8Array([
        state,
        TOPO_SAMPLED_FIELD_STATE.VALID,
        TOPO_SAMPLED_FIELD_STATE.VALID,
        TOPO_SAMPLED_FIELD_STATE.VALID,
      ]),
      width: 2,
      height: 2,
      levels: [0],
    });
    assert.equal(result.invalidCellCount, 1);
    assert.equal(result.segments.length, 0);
  }
});

test("beta-one post-crossing source positions ride partner trailing characteristics", () => {
  for (const observerId of ["electrino", "positrino"]) {
    const diagnostic = createTopoCollinearPartnerCharacteristicDiagnostic({
      phase: 0.517,
      observerId,
    });
    const crossingTime = 0.3;
    const expectedDelay = diagnostic.frame.observationTime - crossingTime;
    assert.equal(diagnostic.ordinaryRoot, true);
    closeTo(diagnostic.causalDelay, expectedDelay);
    closeTo(diagnostic.emissionTime, crossingTime);
    closeTo(diagnostic.emissionLocation.x, 0.5);
    closeTo(diagnostic.emissionLocation.y, 0.5);
    assert.equal(diagnostic.partnerCharacteristic, "trailing");
    assert.ok(Math.abs(diagnostic.partnerWakeValue) > 64);
    closeTo(
      solveTopoCollinearPairCausalDelay(
        diagnostic.observer.position.x,
        diagnostic.observer.position.y,
        diagnostic.partner,
      ),
      expectedDelay,
    );
  }
});

test("collinear source mask is contained by the marker and CPU/WebGL use the same radius", () => {
  const maskRadius = resolveTopoCollinearSourceMaskRadius({
    width: 1000,
    height: 800,
    pixelRatio: 1,
  });
  const diagnostic = createTopoCollinearPartnerCharacteristicDiagnostic({
    phase: 0.517,
  });
  const sampler = createTopoCollinearPairRawSampler({
    beta: 0.5,
    phase: 0.517,
    sourceMaskRadius: maskRadius,
  });
  assert.equal(Number.isNaN(sampler(
    diagnostic.observer.position.x,
    diagnostic.observer.position.y,
  )), true);
  const justOutside = diagnostic.observer.position.x + maskRadius * 1.1;
  assert.equal(Number.isFinite(sampler(justOutside, 0.5)), true);

  const runtime = readFileSync(new URL(
    "../src/apps/topo/TopoInteractionContractRuntime.js",
    import.meta.url,
  ), "utf8");
  assert.match(runtime, /uniform float u_source_mask_radius;/u);
  assert.match(runtime, /resolveTopoCollinearSourceMaskRadius/u);
  assert.match(runtime, /uniforms\.u_source_mask_radius/u);
  assert.match(runtime, /distance\(worldPoint, vec2\(u_electrino_x, 0\.5\)\)/u);
  assert.match(runtime, /distance\(worldPoint, vec2\(u_positrino_x, 0\.5\)\)/u);
});

test("global Space transport respects native controls but owns focused ranges", () => {
  const event = (tagName, type = "") => ({
    code: "Space",
    repeat: false,
    target: { tagName, type, isContentEditable: false },
  });
  assert.equal(topoGlobalTransportOwnsSpace(event("DIV")), true);
  assert.equal(topoGlobalTransportOwnsSpace(event("INPUT", "range")), true);
  for (const [tagName, type] of [
    ["BUTTON", ""],
    ["SELECT", ""],
    ["TEXTAREA", ""],
    ["A", ""],
    ["INPUT", "radio"],
    ["INPUT", "checkbox"],
    ["INPUT", "text"],
  ]) {
    assert.equal(topoGlobalTransportOwnsSpace(event(tagName, type)), false);
  }
  assert.equal(topoGlobalTransportOwnsSpace({
    ...event("DIV"),
    repeat: true,
  }), false);
  assert.equal(topoGlobalTransportOwnsSpace({
    ...event("DIV"),
    target: { tagName: "DIV", isContentEditable: true },
  }), false);
});

test("range pointer movement owns a value change only during its primary press", () => {
  assert.equal(topoRangePointerMoveOwnsInteraction({
    pointerId: 7,
    buttons: 1,
  }, 7), true);
  assert.equal(topoRangePointerMoveOwnsInteraction({
    pointerId: 7,
    buttons: 0,
  }, 7), false);
  assert.equal(topoRangePointerMoveOwnsInteraction({
    pointerId: 7,
    buttons: 2,
  }, 7), false);
  assert.equal(topoRangePointerMoveOwnsInteraction({
    pointerId: 8,
    buttons: 1,
  }, 7), false);
  assert.equal(topoRangePointerMoveOwnsInteraction({
    pointerId: 7,
    buttons: 1,
  }), false);

  const runtime = readFileSync(new URL(
    "../src/apps/topo/TopoInteractionContractRuntime.js",
    import.meta.url,
  ), "utf8");
  assert.match(runtime, /event\.button !== 0 \|\| event\.isPrimary === false/u);
  assert.match(runtime, /listen\(input, "lostpointercapture"/u);
  assert.match(
    runtime,
    /!topoRangePointerMoveOwnsInteraction\(event, activePointerId\)[\s\S]*activePointerId = null/u,
  );
});

test("pointer scenario selection hands focus to the stage while keyboard radios stay native", () => {
  const html = readFileSync(new URL("../topo.html", import.meta.url), "utf8");
  const runtime = readFileSync(new URL(
    "../src/apps/topo/TopoInteractionContractRuntime.js",
    import.meta.url,
  ), "utf8");
  assert.match(html, /id="topo-scenario-control"/u);
  assert.match(html, /id="topo-canvas"[\s\S]*tabindex="0"/u);
  assert.match(runtime, /listen\(dom\.scenarioControl, "pointerdown"/u);
  assert.match(runtime, /scenarioPointerActivation = false/u);
  assert.match(runtime, /dom\.canvas\.focus\?\.\(\{ preventScroll: true \}\)/u);
  assert.match(runtime, /listen\(dom\.scenarioControl, "keydown"[\s\S]*scenarioPointerActivation = false/u);
});

test("custom radio controls keep a non-shrinking circular border box", () => {
  const css = readFileSync(new URL(
    "../src/apps/topo/topo.css",
    import.meta.url,
  ), "utf8");
  const radioRule = css.match(
    /\.topo-radio-field input \{([\s\S]*?)\n\}/u,
  )?.[1] ?? "";
  assert.notEqual(radioRule, "");
  assert.match(radioRule, /appearance: none/u);
  assert.match(radioRule, /flex: 0 0 15px/u);
  assert.match(radioRule, /width: 15px/u);
  assert.match(radioRule, /height: 15px/u);
  assert.match(radioRule, /border-radius: 50%/u);
  assert.match(css, /\.topo-radio-field label \{[\s\S]*display: inline-flex[\s\S]*align-items: center/u);
  assert.match(css, /\.topo-radio-field input:focus-visible \{[\s\S]*outline: 2px solid/u);
});

test("one native Purple/White control persists across all four display-only scenarios", () => {
  const html = readFileSync(new URL("../topo.html", import.meta.url), "utf8");
  const runtime = readFileSync(new URL(
    "../src/apps/topo/TopoInteractionContractRuntime.js",
    import.meta.url,
  ), "utf8");
  assert.match(
    html,
    /<fieldset id="topo-background-control" class="topo-radio-field">[\s\S]*name="topo-background" value="purple" checked[\s\S]*name="topo-background" value="white"[\s\S]*<\/fieldset>/u,
  );
  assert.doesNotMatch(html, /id="topo-background-control"[^>]*hidden/u);
  assert.equal((html.match(/name="topo-scenario"/gu) ?? []).length, 4);
  assert.match(
    runtime,
    /const baseState = \{[\s\S]*backgroundMode:[\s\S]*dom\.backgroundInputs/u,
  );
  assert.match(
    runtime,
    /dom\.backgroundInputs\.forEach\(\(input\) =>[\s\S]*listen\(input, "change", scheduleFrameChange\)/u,
  );
  const rawFrameKeyBody = runtime.match(
    /function createRawFrameKey\([^)]*\) \{([\s\S]*?)\n  \}/u,
  )?.[1] ?? "";
  assert.notEqual(rawFrameKeyBody, "");
  assert.doesNotMatch(rawFrameKeyBody, /background/u);
  assert.match(
    runtime,
    /const displayKey = TOPO_DISPLAY_MAPPING_ID[\s\S]*state\.backgroundMode/u,
  );
  assert.match(runtime, /dom\.scenarioInputs\.forEach\(\(input\) =>[\s\S]*listen\(input, "change", handleScenarioChange\)/u);
  assert.doesNotMatch(runtime, /dom\.scenario\.value/u);
});

test("display scale redraws a full-viewport computed coordinate window", () => {
  const html = readFileSync(new URL("../topo.html", import.meta.url), "utf8");
  const css = readFileSync(new URL(
    "../src/apps/topo/topo.css",
    import.meta.url,
  ), "utf8");
  const runtime = readFileSync(new URL(
    "../src/apps/topo/TopoInteractionContractRuntime.js",
    import.meta.url,
  ), "utf8");
  const sliderIndex = html.indexOf('id="topo-display-scale"');
  const backgroundIndex = html.indexOf('id="topo-background-control"');

  assert.notEqual(sliderIndex, -1);
  assert.ok(sliderIndex < backgroundIndex);
  assert.match(html, /Display scale · visible extent/u);
  assert.match(html, /id="topo-display-scale"[\s\S]*min="0\.5"[\s\S]*max="2"[\s\S]*step="0\.25"[\s\S]*value="1"/u);
  assert.match(html, /Lower scale shows a wider coordinate window/u);
  assert.doesNotMatch(css, /topo-map-display-scale/u);
  const canvasRule = css.match(
    /#topo-canvas,\n#topo-contour-canvas \{([\s\S]*?)\n\}/u,
  )?.[1] ?? "";
  assert.notEqual(canvasRule, "");
  assert.doesNotMatch(canvasRule, /transform/u);
  assert.match(runtime, /listen\(dom\.displayScale, "input", \(\) => \{[\s\S]*updateDisplayScalePresentation\(\);[\s\S]*scheduleFrameChange\(\);/u);
  assert.match(runtime, /physical calculation unchanged/u);
  assert.match(runtime, /function canvasLayoutSize\(\)[\s\S]*dom\.canvas\.clientWidth[\s\S]*dom\.canvas\.clientHeight/u);
  assert.match(runtime, /function updateVisibleExtentPresentation\([\s\S]*fieldViewportPixels[\s\S]*contourViewportPixels/u);
  const stateSource = runtime.slice(
    runtime.indexOf("function getState()"),
    runtime.indexOf("function sourceLocalViewRequested"),
  );
  assert.match(stateSource, /displayScale: normalizeTopoDisplayScale/u);
  const rawFrameKeyBody = runtime.match(
    /function createRawFrameKey\([^)]*\) \{([\s\S]*?)\n  \}/u,
  )?.[1] ?? "";
  assert.match(rawFrameKeyBody, /state\.displayScale/u);
});

test("collinear playback extracts a current fail-closed contour frame while motion remains active", () => {
  assert.equal(TOPO_PAIR_PLAYBACK_CONTOUR_GRID_WIDTH, 400);
  assert.equal(TOPO_PAIR_CROSSING_CONTOUR_GRID_WIDTH, 480);
  assert.equal(TOPO_PAIR_CROSSING_PHASE_START, 0.42);
  assert.equal(TOPO_PAIR_CROSSING_PHASE_END, 0.66);
  assert.equal(TOPO_PAIR_COINCIDENCE_CONTOUR_GRID_WIDTH, 620);
  assert.equal(TOPO_PAIR_COINCIDENCE_PHASE_START, 0.505);
  assert.equal(TOPO_PAIR_COINCIDENCE_PHASE_END, 0.515);
  assert.ok(
    (916 - 1) / (TOPO_PAIR_PLAYBACK_CONTOUR_GRID_WIDTH - 1) < 2.3,
    "the live desktop contour grid must keep marching-squares facets below 2.3 canvas pixels",
  );
  assert.equal(resolveTopoPairPlaybackContourGridWidth({
    canvasWidth: 916,
    phase: 0.419,
  }), 400);
  assert.equal(resolveTopoPairPlaybackContourGridWidth({
    canvasWidth: 916,
    phase: 0.5,
  }), 480);
  assert.equal(resolveTopoPairPlaybackContourGridWidth({
    canvasWidth: 916,
    phase: 0.51,
  }), 620);
  assert.equal(resolveTopoPairPlaybackContourGridWidth({
    canvasWidth: 916,
    phase: 0.659,
  }), 480);
  assert.equal(resolveTopoPairPlaybackContourGridWidth({
    canvasWidth: 916,
    phase: 0.661,
  }), 400);
  assert.equal(resolveTopoPairPlaybackContourGridWidth({
    canvasWidth: 500,
    phase: 0.51,
  }), 500);
  const runtime = readFileSync(new URL(
    "../src/apps/topo/TopoInteractionContractRuntime.js",
    import.meta.url,
  ), "utf8");

  assert.match(runtime, /function createLiveSampledContourFrame/u);
  assert.match(runtime, /\? "binary-live-preview"[\s\S]*: "playback-preview"/u);
  assert.match(
    runtime,
    /const matchingFrame = rawFrame\?\.key === expectedKey/u,
  );
  assert.doesNotMatch(
    runtime,
    /const matchingFrame = !pairPlaybackPlaying/u,
  );
  assert.match(
    runtime,
    /Number\.isNaN\(value\)[\s\S]*TOPO_SAMPLED_FIELD_STATE\.MASKED[\s\S]*Number\.isFinite\(value\)[\s\S]*TOPO_SAMPLED_FIELD_STATE\.VALID[\s\S]*TOPO_SAMPLED_FIELD_STATE\.UNAVAILABLE/u,
  );
  assert.match(
    runtime,
    /state\.binary \|\|[\s\S]*state\.pairMode && \(pairPlaybackPlaying \|\| pairTimelineScrubbing\)[\s\S]*createLiveSampledContourFrame\(width, height, state\)/u,
  );
  assert.match(runtime, /lastContourPathCacheHit = matchingFrame[\s\S]*"live-grid"/u);
  assert.match(
    runtime,
    /live Combined wake contours follow the current prescribed-time field/u,
  );
});

test("circular-binary live contours use a bounded preview and refine when paused", () => {
  assert.equal(TOPO_BINARY_PLAYBACK_CONTOUR_GRID_WIDTH, 120);
  assert.equal(TOPO_BINARY_PAUSED_CONTOUR_GRID_WIDTH, 180);
  assert.equal(TOPO_BINARY_HIGH_SPEED_CONTOUR_BETA, 0.9);
  assert.equal(TOPO_BINARY_HIGH_SPEED_PLAYBACK_CONTOUR_GRID_WIDTH, 180);
  assert.equal(TOPO_BINARY_HIGH_SPEED_PAUSED_CONTOUR_GRID_WIDTH, 240);
  assert.equal(resolveTopoBinaryContourGridWidth({
    canvasWidth: 916,
    beta: 0.5,
    playing: true,
  }), 120);
  assert.equal(resolveTopoBinaryContourGridWidth({
    canvasWidth: 916,
    beta: 1,
    playing: true,
  }), 180);
  assert.equal(resolveTopoBinaryContourGridWidth({
    canvasWidth: 916,
    beta: 1,
    playing: false,
  }), 240);
  assert.equal(TOPO_BINARY_SOURCE_REFINEMENT_GRID_SIZE, 56);
  assert.equal(TOPO_BINARY_SOURCE_REFINEMENT_RADIUS_PIXELS, 64);
  assert.equal(TOPO_BINARY_SOURCE_REFINEMENT_REPLACEMENT_RADIUS_PIXELS, 48);
  assert.ok(
    TOPO_BINARY_SOURCE_REFINEMENT_RADIUS_PIXELS >
      TOPO_BINARY_SOURCE_REFINEMENT_REPLACEMENT_RADIUS_PIXELS,
    "the independently sampled local contour grid must overlap the coarse hand-off",
  );
  assert.equal(TOPO_BINARY_SOURCE_REFINEMENT_MIN_RAW_DECADE, -1);
  assert.ok(
    TOPO_BINARY_PLAYBACK_CONTOUR_GRID_WIDTH <
      TOPO_BINARY_PAUSED_CONTOUR_GRID_WIDTH,
  );
  const runtime = readFileSync(new URL(
    "../src/apps/topo/TopoInteractionContractRuntime.js",
    import.meta.url,
  ), "utf8");
  assert.match(
    runtime,
    /resolveTopoBinaryContourGridWidth\([\s\S]*beta: state\.beta,[\s\S]*playing: binaryPlaying \|\| binaryTimelineScrubbing/u,
  );
  assert.match(
    runtime,
    /function toggleBinaryPlayback[\s\S]*stopBinaryPlayback\(\);[\s\S]*beginRender/u,
  );
  assert.match(
    runtime,
    /function createBinaryContourRefinementFrames[\s\S]*createRawSamplerForState[\s\S]*topoCircularBinaryWorldPointForCanvasPixel[\s\S]*extractTopoSampledFieldContourSegments/u,
  );
  assert.match(
    runtime,
    /replacementRadius[\s\S]*TOPO_BINARY_SOURCE_REFINEMENT_REPLACEMENT_RADIUS_PIXELS[\s\S]*refinement\.replacementRadius/u,
  );
  assert.match(
    runtime,
    /refinedContourLevels = contourLevels\.filter[\s\S]*rawDecade >= TOPO_BINARY_SOURCE_REFINEMENT_MIN_RAW_DECADE/u,
  );
  assert.match(
    runtime,
    /state\.beta < TOPO_BINARY_HIGH_SPEED_CONTOUR_BETA[\s\S]*createBinaryContourRefinementFrames/u,
  );
  assert.match(
    runtime,
    /if \(state\.binary\) \{[\s\S]*drawSyntheticContours\([\s\S]*rawFrame,[\s\S]*Full-density circular-binary contours complete/u,
  );
  assert.match(
    runtime,
    /binaryContourRefinement[\s\S]*source patches at/u,
  );
});

test("centered crossing previews preserve the full-density high-level component count", () => {
  const canvasWidth = 916;
  const canvasHeight = 720;
  const horizontalWorldSpan = (canvasWidth - 1) / (canvasHeight - 1);
  const sourceMaskRadius = resolveTopoCollinearSourceMaskRadius({
    width: canvasWidth,
    height: canvasHeight,
    pixelRatio: 1,
  });
  const componentCount = (gridWidth, phase) => {
    const gridHeight = Math.round(gridWidth * canvasHeight / canvasWidth);
    const raw = new Float32Array(gridWidth * gridHeight);
    const sampleStates = new Uint8Array(raw.length);
    const sampleRaw = createTopoCollinearPairRawSampler({
      beta: 0.5,
      phase,
      horizontalWorldSpan,
      sourceMaskRadius,
    });
    const viewportAnchor = resolveTopoLinearViewportAnchor({
      width: canvasWidth,
      height: canvasHeight,
      pairMode: true,
      beta: 0.5,
      phase,
    });
    for (let pixelY = 0; pixelY < gridHeight; pixelY += 1) {
      for (let pixelX = 0; pixelX < gridWidth; pixelX += 1) {
        const point = topoWorldPointForCanvasPixel({
          pixelX,
          pixelY,
          width: gridWidth,
          height: gridHeight,
          viewportCenter: viewportAnchor.viewportCenter,
          canvasAnchor: viewportAnchor.canvasAnchor,
        });
        const index = pixelY * gridWidth + pixelX;
        const value = sampleRaw(point.x, point.y);
        raw[index] = value;
        sampleStates[index] = Number.isNaN(value)
          ? TOPO_SAMPLED_FIELD_STATE.MASKED
          : Number.isFinite(value)
            ? TOPO_SAMPLED_FIELD_STATE.VALID
            : TOPO_SAMPLED_FIELD_STATE.UNAVAILABLE;
      }
    }
    const { segments } = extractTopoSampledFieldContourSegments({
      raw,
      sampleStates,
      width: gridWidth,
      height: gridHeight,
      levels: [{ value: -640, family: "negative" }],
    });
    const adjacency = new Map();
    const key = (x, y) => x.toFixed(10) + "," + y.toFixed(10);
    const connect = (from, to) => {
      if (!adjacency.has(from)) {
        adjacency.set(from, new Set());
      }
      adjacency.get(from).add(to);
    };
    for (const segment of segments) {
      const start = key(segment.x1, segment.y1);
      const end = key(segment.x2, segment.y2);
      connect(start, end);
      connect(end, start);
    }
    const visited = new Set();
    let components = 0;
    for (const start of adjacency.keys()) {
      if (visited.has(start)) continue;
      components += 1;
      visited.add(start);
      const pending = [start];
      while (pending.length > 0) {
        const current = pending.pop();
        for (const neighbor of adjacency.get(current) ?? []) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            pending.push(neighbor);
          }
        }
      }
    }
    return components;
  };

  for (const [phase, previewComponents, fullComponents] of [
    [0.5075, 4, 3],
    [0.51, 3, 1],
  ]) {
    assert.equal(
      componentCount(TOPO_PAIR_CROSSING_CONTOUR_GRID_WIDTH, phase),
      previewComponents,
    );
    assert.equal(
      componentCount(resolveTopoPairPlaybackContourGridWidth({
        canvasWidth,
        phase,
      }), phase),
      fullComponents,
    );
    assert.equal(componentCount(canvasWidth, phase), fullComponents);
  }
});
