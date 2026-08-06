import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

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
  resolveTopoCollinearSourceMaskRadius,
  topoGlobalTransportOwnsSpace,
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
    beta: 1,
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
