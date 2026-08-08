import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

import {
  createTopoContourLevelStyle,
  topoCanvasPixelForWorldPoint,
  topoWorldPointForCanvasPixel,
} from "../src/apps/topo/TopoInteractionContract.js";
import {
  TOPO_CONTOUR_LEVELS_PER_DECADE,
  TOPO_SAMPLED_FIELD_CONTOUR_POLICY_ID,
  TOPO_SAMPLED_FIELD_STATE,
  TOPO_MARCHING_SQUARES_GLSL_CONTRACT,
  topoMarchingSquaresCaseIndex,
  topoMarchingSquaresEdgePairs,
  topoMarchingSquaresEdgePoint,
  topoMarchingSquaresScreenSpaceMask,
  topoMarchingSquaresScreenSpaceCenterlineDistance,
  topoGpuContourBandWidth,
  topoGpuContourBandContains,
  connectTopoSampledFieldContourSegments,
  createTopoSignedContourLevels,
  extractTopoSampledFieldContourSegments,
} from "../src/apps/topo/TopoSampledFieldContours.js";
import {
  createTopoCollinearPartnerCharacteristicDiagnostic,
  createTopoCollinearPairFrame,
  createTopoCollinearPairRawSampler,
  solveTopoCollinearPairCausalDelay,
} from "../src/apps/topo/TopoCollinearPairScenario.js";
import {
  createTopoCircularBinaryPlayback,
  createTopoCircularBinaryRawSampler,
  sampleTopoCircularBinaryWake,
  topoCircularBinarySourcePosition,
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
  TOPO_PAIR_SOURCE_REFINEMENT_GRID_SIZE,
  TOPO_PAIR_SOURCE_REFINEMENT_MAX_BETA,
  TOPO_PAIR_SOURCE_REFINEMENT_MIN_RAW_DECADE,
  TOPO_PAIR_SOURCE_REFINEMENT_RADIUS_PIXELS,
  TOPO_BINARY_PLAYBACK_CONTOUR_GRID_WIDTH,
  TOPO_BINARY_PAUSED_CONTOUR_GRID_WIDTH,
  TOPO_BINARY_HIGH_SPEED_CONTOUR_BETA,
  TOPO_BINARY_HIGH_SPEED_PLAYBACK_CONTOUR_GRID_WIDTH,
  TOPO_BINARY_HIGH_SPEED_PAUSED_CONTOUR_GRID_WIDTH,
  TOPO_BINARY_SOURCE_REFINEMENT_GRID_SIZE,
  TOPO_BINARY_SOURCE_REFINEMENT_RADIUS_PIXELS,
  TOPO_BINARY_SOURCE_REFINEMENT_REPLACEMENT_RADIUS_PIXELS,
  TOPO_BINARY_SOURCE_REFINEMENT_MIN_RAW_DECADE,
  TOPO_BINARY_PASS_TWO_DIAGNOSTIC_PHASES,
  TOPO_BINARY_PASS_TWO_EGG_DIAGNOSTIC_PHASE,
  createTopoSampledContourPaintStyle,
  createTopoPairSourceContourRefinement,
  topoPairRefinementContainsGlobalSegments,
  resolveTopoLinearViewportAnchor,
  resolveTopoVisibleSourceMarkerRadius,
  resolveTopoSourceMaskRadius,
  resolveTopoCollinearSourceMaskRadius,
  resolveTopoPairPlaybackContourGridWidth,
  resolveTopoBinaryContourGridWidth,
  topoGlobalTransportOwnsSpace,
  topoRangePointerMoveOwnsInteraction,
} from "../src/apps/topo/TopoInteractionContractRuntime.js";

function binaryVisibleSourceMaskRadius(width, height) {
  return resolveTopoSourceMaskRadius({
    polaritySign: -1,
    width,
    height,
    pixelRatio: 1,
  });
}

function closeTo(actual, expected, tolerance = 1e-12) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    String(actual) + " is not within " + tolerance + " of " + expected,
  );
}

function createGpuBandMask({ raw, sampleStates, width, height, rawDecade, sign = 0 }) {
  const mask = new Uint8Array(width * height);
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const index = y * width + x;
      const neighborIndexes = [index - 1, index + 1, index - width, index + width];
      if ([index, ...neighborIndexes].some((entry) =>
        sampleStates[entry] !== TOPO_SAMPLED_FIELD_STATE.VALID)) continue;
      mask[index] = (sign === 0 || Math.sign(raw[index]) === sign) && topoGpuContourBandContains({
        value: raw[index],
        levelRawDecade: rawDecade,
        neighbors: {
          left: raw[neighborIndexes[0]], right: raw[neighborIndexes[1]],
          down: raw[neighborIndexes[2]], up: raw[neighborIndexes[3]],
        },
      }) ? 1 : 0;
    }
  }
  return mask;
}

function rasterizeSegments({ segments, width, height }) {
  const mask = new Uint8Array(width * height);
  for (const segment of segments) {
    let x0 = Math.round(segment.x1), y0 = Math.round(segment.y1);
    const x1 = Math.round(segment.x2), y1 = Math.round(segment.y2);
    const dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
    const dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
    let error = dx + dy;
    while (true) {
      if (x0 >= 0 && x0 < width && y0 >= 0 && y0 < height) mask[y0 * width + x0] = 1;
      if (x0 === x1 && y0 === y1) break;
      const twice = 2 * error;
      if (twice >= dy) { error += dy; x0 += sx; }
      if (twice <= dx) { error += dx; y0 += sy; }
    }
  }
  return mask;
}

function excludeInvalidStencil(mask, sampleStates, width, height) {
  const filtered = new Uint8Array(mask);
  for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
    const index = y * width + x;
    if (x === 0 || y === 0 || x === width - 1 || y === height - 1 ||
        [index, index - 1, index + 1, index - width, index + width].some((entry) =>
          sampleStates[entry] !== TOPO_SAMPLED_FIELD_STATE.VALID)) filtered[index] = 0;
  }
  return filtered;
}

function componentCount(mask, width, height) {
  const seen = new Uint8Array(mask.length);
  let count = 0;
  for (let start = 0; start < mask.length; start += 1) {
    if (!mask[start] || seen[start]) continue;
    count += 1;
    const queue = [start];
    seen[start] = 1;
    while (queue.length) {
      const index = queue.pop();
      const x = index % width, y = Math.floor(index / width);
      for (let dy = -1; dy <= 1; dy += 1) for (let dx = -1; dx <= 1; dx += 1) {
        const nx = x + dx, ny = y + dy, next = ny * width + nx;
        if (nx >= 0 && nx < width && ny >= 0 && ny < height && mask[next] && !seen[next]) {
          seen[next] = 1; queue.push(next);
        }
      }
    }
  }
  return count;
}

function bidirectionalMaskDistance(left, right, width) {
  const points = (mask) => [...mask].flatMap((value, index) => value ? [{
    x: index % width, y: Math.floor(index / width),
  }] : []);
  const nearest = (from, to) => from.map((point) => {
    let nearestPoint = null;
    let distance = Infinity;
    for (const candidate of to) {
      const nextDistance = Math.hypot(point.x - candidate.x, point.y - candidate.y);
      if (nextDistance < distance) {
        distance = nextDistance;
        nearestPoint = candidate;
      }
    }
    return { ...point, nearestPoint, distance };
  });
  const leftToRight = nearest(points(left), points(right));
  const rightToLeft = nearest(points(right), points(left));
  const values = [...leftToRight, ...rightToLeft].map((entry) => entry.distance).sort((a, b) => a - b);
  const worst = (entries) => entries.reduce((current, entry) =>
    !current || entry.distance > current.distance ? entry : current, null);
  return {
    p95: values[Math.floor(0.95 * (values.length - 1))],
    max: values.at(-1),
    worstLeftToRight: worst(leftToRight),
    worstRightToLeft: worst(rightToLeft),
  };
}

function describeBandOutlier({
  entry, direction, raw, states, width, height, rawDecade, cpuSegments,
  sourcePositions = [], sourceMaskRadius = 0,
}) {
  if (!entry) return null;
  const index = entry.y * width + entry.x;
  const stencil = {
    center: index,
    left: index - 1,
    right: index + 1,
    down: index - width,
    up: index + width,
  };
  const neighbors = Object.fromEntries(Object.entries(stencil).slice(1).map(([name, sampleIndex]) =>
    [name, raw[sampleIndex]]));
  const bandWidth = topoGpuContourBandWidth(neighbors);
  const rawValues = Object.fromEntries(Object.entries(stencil).map(([name, sampleIndex]) =>
    [name, raw[sampleIndex]]));
  const sampleStates = Object.fromEntries(Object.entries(stencil).map(([name, sampleIndex]) =>
    [name, sampleStatesLabel(states[sampleIndex])])) ;
  const componentEndpoint = cpuSegments.some((segment) =>
    (Math.round(segment.x1) === entry.x && Math.round(segment.y1) === entry.y) ||
    (Math.round(segment.x2) === entry.x && Math.round(segment.y2) === entry.y));
  const rawDecades = Object.fromEntries(Object.entries(rawValues).map(([name, value]) =>
    [name, Number.isFinite(value) ? Math.log10(Math.max(Math.abs(value), 1e-30) / 64) : null]));
  const relative = Object.fromEntries(Object.entries(rawDecades).map(([name, value]) =>
    [name, value == null ? null : value - rawDecade]));
  const point = topoCircularBinaryWorldPointForCanvasPixel({
    pixelX: entry.x, pixelY: entry.y, width, height, displayScale: 1,
  });
  const sourceDistances = sourcePositions.map((source) => ({
    sourceSign: source.sourceSign,
    distance: Math.hypot(point.x - source.x, point.y - source.y),
  }));
  return {
    direction,
    pixel: { x: entry.x, y: entry.y },
    nearest: entry.nearestPoint,
    distance: entry.distance,
    thresholdRawDecade: rawDecade,
    raw: rawValues,
    rawDecades,
    sampleStates,
    estimatedGradient: {
      x: (neighbors.right - neighbors.left) / 2,
      y: (neighbors.up - neighbors.down) / 2,
      magnitude: Math.hypot(neighbors.right - neighbors.left, neighbors.up - neighbors.down) / 2,
    },
    halfBandWidth: 0.45 * bandWidth,
    viewportEdge: entry.x <= 1 || entry.y <= 1 || entry.x >= width - 2 || entry.y >= height - 2,
    invalidStencil: Object.values(sampleStates).some((state) => state !== "valid"),
    sourceMaskBoundary: sourceDistances.some(({ distance }) => distance <= sourceMaskRadius + 1 / width),
    localExtremum: (relative.center >= 0 && Object.values(relative).slice(1).every((value) => value <= 0)) ||
      (relative.center <= 0 && Object.values(relative).slice(1).every((value) => value >= 0)),
    levelSaddle: relative.left * relative.right < 0 && relative.down * relative.up < 0,
    sourceDistances,
    componentEndpoint,
  };
}

function sampleStatesLabel(state) {
  return Object.entries(TOPO_SAMPLED_FIELD_STATE).find(([, value]) => value === state)?.[0].toLowerCase() ?? "unknown";
}

function writeDiagnosticCrop({ directory, name, raw, states, width, height, entry }) {
  if (!directory || !entry) return;
  const radius = 12;
  const cropWidth = radius * 2 + 1;
  const pixels = [];
  for (let y = entry.y - radius; y <= entry.y + radius; y += 1) for (let x = entry.x - radius; x <= entry.x + radius; x += 1) {
    const index = y * width + x;
    const valid = x >= 0 && y >= 0 && x < width && y < height && states[index] === TOPO_SAMPLED_FIELD_STATE.VALID;
    const exponent = valid ? Math.log10(Math.max(Math.abs(raw[index]), 1e-30) / 64) : -6;
    pixels.push(Math.max(0, Math.min(255, Math.round((exponent + 4) * 64))));
  }
  mkdirSync(directory, { recursive: true });
  writeFileSync(`${directory}/${name}.pgm`, `P2\n${cropWidth} ${cropWidth}\n255\n${pixels.join(" ")}\n`);
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

test("binary GPU paint reuses the level-weighted profile at intermediate strength", () => {
  const runtime = readFileSync(new URL(
    "../src/apps/topo/TopoInteractionContractRuntime.js",
    import.meta.url,
  ), "utf8");
  assert.match(
    runtime,
    /const binaryContourPaintProfile = \[\][\s\S]*createTopoSampledContourPaintStyle\(\{[\s\S]*binary: true,[\s\S]*levelOpacities\[index\] = contourStyle\.opacity/u,
  );
  assert.match(runtime, /dataset\.binaryContourPaintProfile = JSON\.stringify\(binaryContourPaintProfile\)/u);
  assert.match(runtime, /dataset\.binaryContourStrengthPolicy = "level-weighted-progressive-fade"/u);
  assert.match(
    runtime,
    /function scheduleContourChange\(\) \{[\s\S]*currentState\.binary[\s\S]*beginRender\(\{ finalDelay: 0, redrawContours: true \}\)/u,
  );
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

test("canonical marching-squares helpers cover all cases, saddles, interpolation, and invalid corners", () => {
  assert.deepEqual(TOPO_MARCHING_SQUARES_GLSL_CONTRACT.ambiguousCases, [5, 10]);
  for (let caseIndex = 0; caseIndex < 16; caseIndex += 1) {
    const corners = [0, 1, 2, 3].map((index) => caseIndex & (1 << index) ? 1 : -1);
    assert.equal(topoMarchingSquaresCaseIndex(corners, 0), caseIndex);
    const pairs = topoMarchingSquaresEdgePairs(caseIndex, corners, 0, 2, 3, 7);
    if (caseIndex === 0 || caseIndex === 15) assert.equal(pairs.length, 0);
    else assert.ok(pairs.length >= 1);
  }
  assert.deepEqual(topoMarchingSquaresEdgePairs(5, [1, -1, 1, -1], 0, 0, 0, 0), [[0, 1], [2, 3]]);
  assert.deepEqual(topoMarchingSquaresEdgePairs(5, [1, -1, 1, -1], 0, 0, 1, 0), [[3, 0], [1, 2]]);
  const zero = topoMarchingSquaresEdgePoint(0, 4, 5, [-1, 1, 1, -1], 0);
  closeTo(zero.x, 4.5); closeTo(zero.y, 5);
  const endpoint = topoMarchingSquaresEdgePoint(0, 0, 0, [0, 2, 2, 0], 0);
  closeTo(endpoint.x, 0); closeTo(endpoint.y, 0);
  const invalid = extractTopoSampledFieldContourSegments({
    raw: new Float32Array([1, -1, -1, 1]), width: 2, height: 2,
    sampleStates: new Uint8Array([0, 0, TOPO_SAMPLED_FIELD_STATE.MASKED, 0]), levels: [0],
  });
  assert.equal(invalid.segments.length, 0);
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

test("GPU finite-difference contour band fails closed at unavailable neighbors", () => {
  assert.equal(topoGpuContourBandWidth({
    left: Number.NaN, right: 1, down: 1, up: 1,
  }), 0);
  assert.ok(topoGpuContourBandWidth({
    left: 1, right: 2, down: 1, up: 2,
  }) > 0);
  assert.equal(topoGpuContourBandContains({
    value: 64,
    levelRawDecade: 0,
    neighbors: { left: 32, right: 128, down: 32, up: 128 },
  }), true);
});

test("binary exact-point source mask preserves the high-speed branch without an annulus", () => {
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
      sourceMaskRadius: binaryVisibleSourceMaskRadius(width, height),
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
  assert.equal(componentCount(240, 188), 1);
});

test("GPU-equivalent band and full-stage CPU masks preserve the high-speed branch and fail closed", () => {
  const width = 916, height = 720;
  const sourceMaskRadius = binaryVisibleSourceMaskRadius(width, height);
  const sample = createTopoCircularBinaryRawSampler({
    beta: 1, progress: 0, radius: 0.3, sourceMaskRadius,
  });
  const playback = createTopoCircularBinaryPlayback({ beta: 1, progress: 0, radius: 0.3 });
  const sourcePositions = [-1, 1].map((sourceSign) => ({
    sourceSign,
    ...topoCircularBinarySourcePosition({
      sourceSign, time: playback.observationTime, beta: playback.beta,
      radius: playback.radius, direction: playback.direction,
    }),
  }));
  const raw = new Float32Array(width * height);
  const states = new Uint8Array(raw.length);
  for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
    const index = y * width + x;
    const point = topoCircularBinaryWorldPointForCanvasPixel({ pixelX: x, pixelY: y, width, height, displayScale: 1 });
    raw[index] = sample(point.x, point.y);
    states[index] = Number.isFinite(raw[index]) ? TOPO_SAMPLED_FIELD_STATE.VALID : TOPO_SAMPLED_FIELD_STATE.MASKED;
  }
  const level = createTopoSignedContourLevels({ contourCount: 13, contourReach: 3 })
    .find((entry) => entry.family === "negative" && entry.rawDecade === -2);
  const extracted = extractTopoSampledFieldContourSegments({ raw, sampleStates: states, width, height, levels: [level] });
  const gpu = createGpuBandMask({ raw, sampleStates: states, width, height, rawDecade: -2, sign: -1 });
  const cpu = excludeInvalidStencil(rasterizeSegments({
    segments: extracted.segments, width, height,
  }), states, width, height);
  assert.ok(gpu.some(Boolean));
  assert.ok(cpu.some(Boolean));
  assert.equal(connectTopoSampledFieldContourSegments(extracted.segments).length, 1);
  assert.equal(componentCount(cpu, width, height), 1);
  assert.equal(componentCount(gpu, width, height), 1);
  const distance = bidirectionalMaskDistance(cpu, gpu, width);
  const diagnostics = {
    components: {
      cpuRaster: componentCount(cpu, width, height),
      gpuBand: componentCount(gpu, width, height),
      cpuPaths: connectTopoSampledFieldContourSegments(extracted.segments).length,
    },
    gpuToCpu: describeBandOutlier({
      entry: distance.worstRightToLeft, direction: "gpu-to-cpu", raw, states, width, height,
      rawDecade: -2, cpuSegments: extracted.segments, sourcePositions, sourceMaskRadius,
    }),
    cpuToGpu: describeBandOutlier({
      entry: distance.worstLeftToRight, direction: "cpu-to-gpu", raw, states, width, height,
      rawDecade: -2, cpuSegments: extracted.segments, sourcePositions, sourceMaskRadius,
    }),
  };
  if (process.env.TOPO_CONTOUR_DIAGNOSTICS_DIR) {
    for (const [name, diagnostic] of Object.entries(diagnostics)) {
      writeDiagnosticCrop({
        directory: process.env.TOPO_CONTOUR_DIAGNOSTICS_DIR, name, raw, states, width, height,
        entry: diagnostic && (name === "gpuToCpu" ? distance.worstRightToLeft : distance.worstLeftToRight),
      });
    }
    console.info("Topo GPU contour comparator diagnostics", JSON.stringify({ distance, diagnostics }));
  }
  assert.ok(distance.p95 <= 1, "GPU center band should remain within one pixel of CPU segments: " + JSON.stringify({ distance, diagnostics }));
  assert.ok(distance.max <= 2, "GPU center band should remain within two pixels of CPU segments: " + JSON.stringify({ distance, diagnostics }));
  states[120 * width + 120] = TOPO_SAMPLED_FIELD_STATE.MASKED;
  const masked = createGpuBandMask({ raw, sampleStates: states, width, height, rawDecade: -2 });
  assert.equal(masked[120 * width + 120], 0);
});

test("every selected signed binary level matches the canonical screen-space marching-squares mask at beta one phase zero", () => {
  const width = 916, height = 720;
  const sample = createTopoCircularBinaryRawSampler({
    beta: 1, progress: 0, radius: 0.3, sourceMaskRadius: binaryVisibleSourceMaskRadius(width, height),
  });
  const raw = new Float32Array(width * height);
  const states = new Uint8Array(raw.length);
  for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
    const index = y * width + x;
    const point = topoCircularBinaryWorldPointForCanvasPixel({ pixelX: x, pixelY: y, width, height, displayScale: 1 });
    raw[index] = sample(point.x, point.y);
    states[index] = Number.isFinite(raw[index]) ? TOPO_SAMPLED_FIELD_STATE.VALID : TOPO_SAMPLED_FIELD_STATE.MASKED;
  }
  const levels = createTopoSignedContourLevels({ contourCount: 13, contourReach: 3 })
    .filter((level) => level.family === "negative" || level.family === "positive");
  const extracted = extractTopoSampledFieldContourSegments({ raw, sampleStates: states, width, height, levels });
  const table = levels.map((level) => {
    const segments = extracted.segments.filter((segment) => segment.value === level.value);
    const cpu = excludeInvalidStencil(rasterizeSegments({ segments, width, height }), states, width, height);
    const gpu = topoMarchingSquaresScreenSpaceMask({
      raw, sampleStates: states, width, height, level, lineHalfWidth: 0.5,
    });
    const distance = topoMarchingSquaresScreenSpaceCenterlineDistance({
      segments, mask: gpu, width, lineHalfWidth: 0.5,
    });
    return {
      sign: level.family,
      rawDecade: level.rawDecade,
      cpuPaths: connectTopoSampledFieldContourSegments(segments).length,
      cpuRasterComponents: componentCount(cpu, width, height),
      gpuMaskComponents: componentCount(gpu, width, height),
      invalidBridgePixels: gpu.reduce((count, value, index) => count +
        (value && states[index] !== TOPO_SAMPLED_FIELD_STATE.VALID ? 1 : 0), 0),
      p95: distance.p95,
      max: distance.max,
    };
  });
  if (process.env.TOPO_CONTOUR_DIAGNOSTICS_DIR) {
    console.info("Topo phase-zero all-level GPU contour comparator", JSON.stringify(table));
  }
  for (const row of table) {
    assert.equal(row.gpuMaskComponents, row.cpuPaths,
      "phase-zero true component topology: " + JSON.stringify(row));
    assert.equal(row.invalidBridgePixels, 0,
      "phase-zero mask must stay fail-closed: " + JSON.stringify(row));
    assert.ok(row.p95 <= 1, "phase-zero p95 displacement: " + JSON.stringify(row));
    assert.ok(row.max <= 1, "phase-zero centerline maximum displacement: " + JSON.stringify(row));
  }
  for (const negative of table.filter((row) => row.sign === "negative")) {
    const positive = table.find((row) => row.sign === "positive" &&
      row.rawDecade === negative.rawDecade);
    assert.equal(negative.cpuPaths, positive?.cpuPaths,
      "signed CPU topology symmetry: " + JSON.stringify({ negative, positive }));
    assert.equal(negative.gpuMaskComponents, positive?.gpuMaskComponents,
      "signed GPU topology symmetry: " + JSON.stringify({ negative, positive }));
  }
});

test("table-driven beta-one diagnostic phases retain all signed screen-space contour contracts", () => {
  assert.ok(TOPO_BINARY_PASS_TWO_DIAGNOSTIC_PHASES.includes(
    TOPO_BINARY_PASS_TWO_EGG_DIAGNOSTIC_PHASE,
  ));
  const width = 240, height = 188;
  const levels = createTopoSignedContourLevels({ contourCount: 13, contourReach: 3 })
    .filter((level) => level.family === "negative" || level.family === "positive");
  const phaseRows = TOPO_BINARY_PASS_TWO_DIAGNOSTIC_PHASES.map((phase) => {
    const raw = new Float32Array(width * height);
    const states = new Uint8Array(raw.length);
    const sample = createTopoCircularBinaryRawSampler({
      beta: 1, progress: phase, radius: 0.3, sourceMaskRadius: binaryVisibleSourceMaskRadius(width, height),
    });
    for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
      const index = y * width + x;
      const point = topoCircularBinaryWorldPointForCanvasPixel({
        pixelX: x, pixelY: y, width, height, displayScale: 1,
      });
      raw[index] = sample(point.x, point.y);
      states[index] = Number.isFinite(raw[index])
        ? TOPO_SAMPLED_FIELD_STATE.VALID
        : TOPO_SAMPLED_FIELD_STATE.MASKED;
    }
    const extracted = extractTopoSampledFieldContourSegments({
      raw, sampleStates: states, width, height, levels,
    });
    const rows = levels.map((level) => {
      const segments = extracted.segments.filter((segment) => segment.value === level.value);
      const gpu = topoMarchingSquaresScreenSpaceMask({
        raw, sampleStates: states, width, height, level, lineHalfWidth: 0.5,
      });
      const distance = topoMarchingSquaresScreenSpaceCenterlineDistance({
        segments, mask: gpu, width, lineHalfWidth: 0.5,
      });
      return {
        family: level.family,
        rawDecade: level.rawDecade,
        cpuPaths: connectTopoSampledFieldContourSegments(segments).length,
        cpuRasterComponents: componentCount(
          excludeInvalidStencil(rasterizeSegments({ segments, width, height }), states, width, height),
          width,
          height,
        ),
        gpuComponents: componentCount(gpu, width, height),
        invalidBridgePixels: gpu.reduce((count, value, index) => count +
          (value && states[index] !== TOPO_SAMPLED_FIELD_STATE.VALID ? 1 : 0), 0),
        p95: distance.p95,
        max: distance.max,
      };
    });
    return { phase, rows };
  });
  for (const { phase, rows } of phaseRows) {
    assert.equal(rows.length, 26, `selected signed level count at phase ${phase}`);
    for (const row of rows) {
      assert.equal(row.gpuComponents, row.cpuRasterComponents,
        `screen-space component topology at phase ${phase}: ${JSON.stringify(row)}`);
      assert.equal(row.invalidBridgePixels, 0,
        `fail-closed mask at phase ${phase}: ${JSON.stringify(row)}`);
      assert.ok(row.p95 <= 1 && row.max <= 1,
        `centerline bounds at phase ${phase}: ${JSON.stringify(row)}`);
    }
    for (const negative of rows.filter((row) => row.family === "negative")) {
      const positive = rows.find((row) => row.family === "positive" &&
        row.rawDecade === negative.rawDecade);
      assert.equal(negative.cpuPaths, positive?.cpuPaths,
        `signed CPU symmetry at phase ${phase}: ${negative.rawDecade}`);
      assert.equal(negative.gpuComponents, positive?.gpuComponents,
        `signed GPU symmetry at phase ${phase}: ${negative.rawDecade}`);
    }
  }
});

test("binary scalar-pass audit grid preserves pixel mapping, signs, singular state, and selected-level neighborhoods", () => {
  const width = 916, height = 720;
  const sample = createTopoCircularBinaryRawSampler({
    beta: 1, progress: 0, radius: 0.3, sourceMaskRadius: binaryVisibleSourceMaskRadius(width, height),
  });
  const probes = [
    [0, 0], [width - 1, height - 1], [Math.floor(width / 2), Math.floor(height / 2)],
    [Math.floor(width * .2), Math.floor(height / 2)], [Math.floor(width * .8), Math.floor(height / 2)],
  ].map(([pixelX, pixelY]) => ({ pixelX, pixelY, point: topoCircularBinaryWorldPointForCanvasPixel({
    pixelX, pixelY, width, height, displayScale: 1,
  }) }));
  const values = probes.map(({ point }) => sample(point.x, point.y));
  assert.ok(values.some((value) => value > 0));
  assert.ok(values.some((value) => value < 0));
  assert.ok(Math.abs(values[2]) < 0.01, "center remains the cancellation probe");
  assert.equal(Number.isFinite(values[3]), true, "near-source positive-distance samples stay ordinary");
  assert.equal(Number.isFinite(values[4]), true, "near-source positive-distance samples stay ordinary");
  const thresholds = createTopoSignedContourLevels({ contourCount: 13, contourReach: 3 })
    .filter((level) => level.family === "negative" || level.family === "positive");
  assert.equal(thresholds.length, 26);
  assert.ok(thresholds.every((level) => Number.isFinite(level.value)));
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

test("visible source disk uses display occlusion while providers fail closed only at the exact singularity", () => {
  const width = 1000;
  const height = 800;
  const maskRadius = resolveTopoCollinearSourceMaskRadius({
    polaritySign: -1,
    width,
    height,
    pixelRatio: 1,
  });
  const positiveMaskRadius = resolveTopoCollinearSourceMaskRadius({
    polaritySign: 1,
    width,
    height,
    pixelRatio: 1,
  });
  closeTo(maskRadius, positiveMaskRadius);
  closeTo(maskRadius, 0);
  const frame = createTopoCollinearPairFrame({ beta: 0.5, phase: 0.3 });
  const sampler = createTopoCollinearPairRawSampler({
    beta: 0.5, phase: 0.3,
    sourceMaskRadius: maskRadius,
  });
  for (const source of frame.sources) {
    assert.equal(Number.isNaN(sampler(source.position.x, source.position.y)), true);
    assert.equal(Number.isFinite(sampler(
      source.position.x, source.position.y + 1e-6,
    )), true);
  }

  const binaryMaskRadius = binaryVisibleSourceMaskRadius(width, height);
  closeTo(binaryMaskRadius, 0);
  const playback = createTopoCircularBinaryPlayback({ beta: 0.5, progress: 0.3 });
  for (const sourceSign of [-1, 1]) {
    const source = topoCircularBinarySourcePosition({
      sourceSign,
      time: playback.observationTime,
      beta: playback.beta,
      radius: playback.radius,
      direction: playback.direction,
    });
    const singular = sampleTopoCircularBinaryWake({
      point: { x: source.x, y: source.y },
      beta: playback.beta,
      radius: playback.radius,
      progress: playback.progress,
      sourceMaskRadius: binaryMaskRadius,
      direction: playback.direction,
    });
    const outside = sampleTopoCircularBinaryWake({
      point: { x: source.x, y: source.y + 1e-6 },
      beta: playback.beta,
      radius: playback.radius,
      progress: playback.progress,
      sourceMaskRadius: binaryMaskRadius,
      direction: playback.direction,
    });
    assert.match(singular.state, /^(singular|nonordinary):/u);
    assert.equal(outside.state, "ordinary");
    assert.equal(Number.isFinite(outside.rawValue), true);
  }

  const runtime = readFileSync(new URL(
    "../src/apps/topo/TopoInteractionContractRuntime.js",
    import.meta.url,
  ), "utf8");
  assert.match(runtime, /uniform float u_source_mask_radius;/u);
  assert.match(runtime, /resolveTopoCollinearSourceMaskRadius/u);
  assert.match(runtime, /uniforms\.u_source_mask_radius/u);
  assert.match(runtime, /sourceMasked = u_pair_mode/u);
  assert.match(runtime, /distance\(worldPoint, vec2\(2\.0 \/ 3\.0, 0\.5\)\) <= u_source_mask_radius/u);
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
  assert.equal(TOPO_PAIR_COINCIDENCE_CONTOUR_GRID_WIDTH, 916);
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
  }), 916);
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

test("paused pair refinement holds the last complete visible frame until atomic swap", () => {
  const runtime = readFileSync(new URL(
    "../src/apps/topo/TopoInteractionContractRuntime.js",
    import.meta.url,
  ), "utf8");
  assert.match(
    runtime,
    /const holdCompletePairFrame = state\.pairMode[\s\S]*!pairPlaybackPlaying[\s\S]*!pairTimelineScrubbing[\s\S]*cachedRawFrame[\s\S]*contourFrameKey/u,
  );
  assert.match(
    runtime,
    /if \(!holdCompletePairFrame && \([\s\S]*drawSyntheticContours\(\{/u,
  );
  assert.match(
    runtime,
    /if \(!matchingFrame && state\.pairMode && previousFrameBelongsToScenario\)[\s\S]*pairFrameHandoff = "holding-complete-frame"[\s\S]*return true/u,
  );
  assert.match(
    runtime,
    /if \(state\.pairMode\) \{[\s\S]*drawSyntheticContours\(\{[\s\S]*rawFrame,[\s\S]*pairFrameHandoff = "complete"/u,
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

test("centered crossing previews retain the current visible-disk mask topology at full density", () => {
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

  for (const phase of [0.5075, 0.51]) {
    const previewComponents = componentCount(resolveTopoPairPlaybackContourGridWidth({
      canvasWidth,
      phase,
    }), phase);
    const fullComponents = componentCount(canvasWidth, phase);
    assert.ok(fullComponents > 0, `crossing phase ${phase} retains genuine contour components`);
    assert.equal(previewComponents, fullComponents,
      `crossing phase ${phase} cannot change topology between live and paused frames`);
  }
});

test("low-speed pair source contours refine complete components against a dense authoritative reference", () => {
  assert.equal(TOPO_PAIR_SOURCE_REFINEMENT_MAX_BETA, 0.25);
  assert.equal(TOPO_PAIR_SOURCE_REFINEMENT_MIN_RAW_DECADE, 2 / 3);
  assert.equal(TOPO_PAIR_SOURCE_REFINEMENT_RADIUS_PIXELS, 24);
  assert.equal(TOPO_PAIR_SOURCE_REFINEMENT_GRID_SIZE, 121);

  const width = 916;
  const height = 720;
  const beta = 0.1;
  const phase = 0.23;
  const horizontalWorldSpan = (width - 1) / (height - 1);
  const levels = createTopoSignedContourLevels({
    contourCount: 13,
    contourReach: 3,
  });
  const nearLevels = levels.filter((level) =>
    Number.isFinite(level.rawDecade) &&
    level.rawDecade >= TOPO_PAIR_SOURCE_REFINEMENT_MIN_RAW_DECADE);

  const buildFrame = (gridWidth, replayPhase = phase) => {
    const gridHeight = Math.round(gridWidth * height / width);
    const raw = new Float32Array(gridWidth * gridHeight);
    const sampleStates = new Uint8Array(raw.length);
    const sampleRaw = createTopoCollinearPairRawSampler({
      beta,
      phase: replayPhase,
      horizontalWorldSpan,
      sourceMaskRadius: resolveTopoCollinearSourceMaskRadius({
        polaritySign: -1,
        width,
        height,
        pixelRatio: 1,
      }),
    });
    const viewportAnchor = resolveTopoLinearViewportAnchor({
      width,
      height,
      pairMode: true,
      beta,
      phase: replayPhase,
    });
    for (let y = 0; y < gridHeight; y += 1) {
      for (let x = 0; x < gridWidth; x += 1) {
        const point = topoWorldPointForCanvasPixel({
          pixelX: x,
          pixelY: y,
          width: gridWidth,
          height: gridHeight,
          viewportCenter: viewportAnchor.viewportCenter,
          canvasAnchor: viewportAnchor.canvasAnchor,
        });
        const index = y * gridWidth + x;
        const value = sampleRaw(point.x, point.y);
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
      width: gridWidth,
      height: gridHeight,
      levels: nearLevels,
    });
    return {
      width: gridWidth,
      height: gridHeight,
      scaleX: (width - 1) / (gridWidth - 1),
      scaleY: (height - 1) / (gridHeight - 1),
      extracted,
    };
  };

  const pathPoints = (path) => path.flatMap((point, index) => {
    if (index === path.length - 1) return [];
    const next = path[index + 1];
    const steps = Math.max(1, Math.ceil(
      Math.hypot(next.x - point.x, next.y - point.y) / 0.25,
    ));
    return Array.from({ length: steps }, (_, step) => {
      const t = step / steps;
      return {
        x: point.x + (next.x - point.x) * t,
        y: point.y + (next.y - point.y) * t,
      };
    });
  });
  const pathDistance = (leftPath, rightPath) => {
    const left = pathPoints(leftPath);
    const right = pathPoints(rightPath);
    const nearest = (from, to) => from.map((point) =>
      to.reduce((distance, candidate) => Math.min(
        distance,
        Math.hypot(point.x - candidate.x, point.y - candidate.y),
      ), Infinity));
    const values = [...nearest(left, right), ...nearest(right, left)]
      .sort((a, b) => a - b);
    return {
      p95: values[Math.floor(0.95 * (values.length - 1))],
      max: values.at(-1),
    };
  };

  const preview = buildFrame(TOPO_PAIR_PLAYBACK_CONTOUR_GRID_WIDTH);
  const dense = buildFrame(width * 2);
  const sourceFrame = createTopoCollinearPairFrame({
    beta,
    phase,
    horizontalWorldSpan,
  });
  const viewportAnchor = resolveTopoLinearViewportAnchor({
    width,
    height,
    pairMode: true,
    beta,
    phase,
  });
  const markerRadius = resolveTopoVisibleSourceMarkerRadius({
    polaritySign: -1,
    width,
    height,
    pixelRatio: 1,
  });
  const measurements = [];

  for (const polaritySign of [-1, 1]) {
    const refinement = createTopoPairSourceContourRefinement({
      width,
      height,
      pixelRatio: 1,
      beta,
      phase,
      displayScale: 1,
      levels,
      polaritySign,
    });
    closeTo(refinement.step, 0.4);
    assert.equal(refinement.replacements.length, 2);
    closeTo(refinement.replacements[0].level.rawDecade, 1);
    closeTo(refinement.replacements[1].level.rawDecade, 2 / 3);
    const source = sourceFrame.sources.find((entry) =>
      entry.polaritySign === polaritySign);
    const sourcePixel = topoCanvasPixelForWorldPoint({
      worldX: source.position.x,
      worldY: source.position.y,
      width,
      height,
      viewportCenter: viewportAnchor.viewportCenter,
      canvasAnchor: viewportAnchor.canvasAnchor,
    });

    for (const replacement of refinement.replacements) {
      const level = replacement.level;
      const previewSegments = preview.extracted.segments.filter((segment) =>
        segment.value === level.value);
      const denseSegments = dense.extracted.segments.filter((segment) =>
        segment.value === level.value);
      const previewPaths = connectTopoSampledFieldContourSegments(previewSegments);
      const densePaths = connectTopoSampledFieldContourSegments(denseSegments);
      assert.equal(previewPaths.length, 1);
      assert.equal(densePaths.length, 1);
      const refinedPath = replacement.path.map((point) => ({
        x: refinement.sourceX - refinement.radius + point.x * refinement.step,
        y: refinement.sourceY - refinement.radius + point.y * refinement.step,
      }));
      const densePath = densePaths[0].map((point) => ({
        x: point.x * dense.scaleX,
        y: point.y * dense.scaleY,
      }));
      const distance = pathDistance(refinedPath, densePath);
      assert.ok(distance.p95 <= 0.1, JSON.stringify({ level, distance }));
      assert.ok(distance.max <= 0.15, JSON.stringify({ level, distance }));
      assert.ok(
        replacement.segments.length > denseSegments.length &&
        denseSegments.length > previewSegments.length,
        "the source component must gain genuine scalar samples, not smoothed vertices",
      );
      const minimumRadius = Math.min(...refinedPath.map((point) =>
        Math.hypot(point.x - sourcePixel.x, point.y - sourcePixel.y)));
      assert.ok(
        minimumRadius > markerRadius,
        "a refined contour centerline cannot enter the canonical source disk",
      );
      measurements.push({
        polaritySign,
        rawDecade: level.rawDecade,
        previewSegments: previewSegments.length,
        denseSegments: denseSegments.length,
        refinedSegments: replacement.segments.length,
        p95: distance.p95,
        max: distance.max,
        minimumRadius,
      });
    }
  }

  assert.equal(measurements.length, 4);
  for (const displayScale of [0.5, 1, 2]) {
    for (const polaritySign of [-1, 1]) {
      const refinement = createTopoPairSourceContourRefinement({
        width,
        height,
        pixelRatio: 1,
        beta,
        phase,
        displayScale,
        levels,
        polaritySign,
      });
      assert.equal(refinement.replacements.length, 2);
    }
  }

  for (const replayPhase of [0.20432, 0.20633, 0.22346, 0.22747, 0.23147]) {
    const previewFrame = buildFrame(
      TOPO_PAIR_PLAYBACK_CONTOUR_GRID_WIDTH,
      replayPhase,
    );
    for (const polaritySign of [-1, 1]) {
      const refinement = createTopoPairSourceContourRefinement({
        width,
        height,
        pixelRatio: 1,
        beta,
        phase: replayPhase,
        displayScale: 1,
        levels,
        polaritySign,
      });
      assert.equal(refinement.replacements.length, 2);
      for (const replacement of refinement.replacements) {
        const globalSegments = previewFrame.extracted.segments.filter((segment) =>
          segment.value === replacement.level.value);
        assert.equal(topoPairRefinementContainsGlobalSegments({
          segments: globalSegments,
          scaleX: previewFrame.scaleX,
          scaleY: previewFrame.scaleY,
          refinement,
        }), true, "each coarse source component remains wholly inside its closed replacement");
      }
    }
  }

  const runtime = readFileSync(new URL(
    "../src/apps/topo/TopoInteractionContractRuntime.js",
    import.meta.url,
  ), "utf8");
  assert.match(runtime, /contourLayerVisible = String\([\s\S]*state\.contourVisibility > 0/u);
  assert.match(
    runtime,
    /state\.pairPhase < TOPO_PAIR_CROSSING_PHASE_START \|\|[\s\S]*state\.pairPhase > TOPO_PAIR_CROSSING_PHASE_END/u,
    "accepted crossing extraction must remain on its existing global path",
  );
  assert.match(
    runtime,
    /if \(extracted && state\.contourVisibility > 0\)[\s\S]*drawPairSourceOverlays/u,
    "the ordinary strength-zero diagnostic hides contours without suppressing markers",
  );
});
