import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  topoWorldPointForCanvasPixel,
} from "../src/apps/topo/TopoInteractionContract.js";
import {
  TOPO_CONTOUR_LEVELS_PER_DECADE,
  TOPO_SAMPLED_FIELD_CONTOUR_POLICY_ID,
  TOPO_SAMPLED_FIELD_STATE,
  createTopoSignedContourLevels,
  extractTopoSampledFieldContourSegments,
} from "../src/apps/topo/TopoSampledFieldContours.js";
import {
  createTopoCollinearPartnerCharacteristicDiagnostic,
  createTopoCollinearPairRawSampler,
  solveTopoCollinearPairCausalDelay,
} from "../src/apps/topo/TopoCollinearPairScenario.js";
import {
  TOPO_PAIR_CROSSING_CONTOUR_GRID_WIDTH,
  TOPO_PAIR_CROSSING_PHASE_END,
  TOPO_PAIR_CROSSING_PHASE_START,
  TOPO_PAIR_PLAYBACK_CONTOUR_GRID_WIDTH,
  resolveTopoCollinearSourceMaskRadius,
  resolveTopoPairPlaybackContourGridWidth,
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

test("display-only scale slider changes framing outside calculation state", () => {
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
  assert.match(html, /Display scale \(display only\)/u);
  assert.match(html, /id="topo-display-scale"[\s\S]*min="50"[\s\S]*max="150"[\s\S]*value="100"/u);
  assert.match(html, /calculated wake values, contour levels and physical coordinates stay unchanged/u);
  assert.match(css, /transform: scale\(var\(--topo-map-display-scale\)\)/u);
  assert.match(runtime, /listen\(dom\.displayScale, "input", updateDisplayScalePresentation\)/u);
  assert.match(runtime, /physical calculation unchanged/u);
  assert.match(runtime, /function canvasLayoutSize\(\)[\s\S]*dom\.canvas\.clientWidth[\s\S]*dom\.canvas\.clientHeight/u);
  const stateSource = runtime.slice(
    runtime.indexOf("function getState()"),
    runtime.indexOf("function sourceLocalViewRequested"),
  );
  assert.doesNotMatch(stateSource, /displayScale/u);
});

test("collinear playback extracts a current fail-closed contour frame while motion remains active", () => {
  assert.equal(TOPO_PAIR_PLAYBACK_CONTOUR_GRID_WIDTH, 400);
  assert.equal(TOPO_PAIR_CROSSING_CONTOUR_GRID_WIDTH, 480);
  assert.equal(TOPO_PAIR_CROSSING_PHASE_START, 0.42);
  assert.equal(TOPO_PAIR_CROSSING_PHASE_END, 0.66);
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
    phase: 0.659,
  }), 480);
  assert.equal(resolveTopoPairPlaybackContourGridWidth({
    canvasWidth: 916,
    phase: 0.661,
  }), 400);
  assert.equal(resolveTopoPairPlaybackContourGridWidth({
    canvasWidth: 500,
    phase: 0.5,
  }), 480);
  const runtime = readFileSync(new URL(
    "../src/apps/topo/TopoInteractionContractRuntime.js",
    import.meta.url,
  ), "utf8");

  assert.match(runtime, /function createPairPlaybackContourFrame/u);
  assert.match(runtime, /contourFrameKind: "playback-preview"/u);
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
    /state\.pairMode && pairPlaybackPlaying[\s\S]*createPairPlaybackContourFrame\(width, height, state\)/u,
  );
  assert.match(runtime, /lastContourPathCacheHit = matchingFrame[\s\S]*"live-grid"/u);
  assert.match(
    runtime,
    /live Combined wake contours follow the current prescribed-time field/u,
  );
});

test("crossing refinement preserves the full-density high-level component count", () => {
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
    for (let pixelY = 0; pixelY < gridHeight; pixelY += 1) {
      for (let pixelX = 0; pixelX < gridWidth; pixelX += 1) {
        const point = topoWorldPointForCanvasPixel({
          pixelX,
          pixelY,
          width: gridWidth,
          height: gridHeight,
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

  for (const phase of [0.501, 0.51]) {
    assert.equal(
      componentCount(TOPO_PAIR_PLAYBACK_CONTOUR_GRID_WIDTH, phase),
      3,
    );
    assert.equal(
      componentCount(TOPO_PAIR_CROSSING_CONTOUR_GRID_WIDTH, phase),
      1,
    );
    assert.equal(componentCount(canvasWidth, phase), 1);
  }
});
