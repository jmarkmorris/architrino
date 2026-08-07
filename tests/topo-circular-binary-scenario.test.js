import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  TOPO_CIRCULAR_BINARY_CENTER,
  TOPO_CIRCULAR_BINARY_CONTRACT_ID,
  TOPO_CIRCULAR_BINARY_DEFAULT_RADIUS,
  TOPO_CIRCULAR_BINARY_DIRECTION,
  TOPO_CIRCULAR_BINARY_FIELD_SPEED,
  TOPO_CIRCULAR_BINARY_HISTORY_POLICY,
  TOPO_CIRCULAR_BINARY_KAPPA,
  TOPO_CIRCULAR_BINARY_MAX_RADIUS,
  TOPO_CIRCULAR_BINARY_MIN_RADIUS,
  TOPO_CIRCULAR_BINARY_RADIUS,
  TOPO_CIRCULAR_BINARY_SCENARIO_ID,
  TOPO_CIRCULAR_BINARY_VERTICAL_OVERFLOW_POLICY,
  createTopoCircularBinaryChart,
  createTopoCircularBinaryFrameIdentity,
  createTopoCircularBinaryPlayback,
  sampleTopoCircularBinaryWake,
  solveTopoCircularBinaryCausalDelay,
  topoCircularBinaryCausalResidual,
  topoCircularBinarySourcePosition,
  topoCircularBinaryWorldPointForCanvasPixel,
} from "../src/apps/topo/TopoCircularBinaryScenario.js";
import {
  normalizeTopoFieldColorValue,
} from "../src/apps/topo/TopoInteractionContract.js";
import {
  evaluatePrescribedSourceWake,
} from "../src/prescribed-path-analysis/ExactPrescribedSourceWake.mjs";

function closeTo(actual, expected, tolerance = 1e-10) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    String(actual) + " is not within " + tolerance + " of " + expected,
  );
}

function readRepoFile(relativePath) {
  return readFileSync(new URL("../" + relativePath, import.meta.url), "utf8");
}

function createIndependentSourceRecord(
  beta,
  observationTime,
  radius = 0.3,
  direction = TOPO_CIRCULAR_BINARY_DIRECTION.COUNTERCLOCKWISE,
) {
  const commonTrajectory = {
    kind: "moving-circular.v1",
    epochTime: 0,
    centerAtEpoch: { x: 0.5, y: 0.5, z: 0 },
    centerVelocity: { x: 0, y: 0, z: 0 },
    radiusU: { x: radius, y: 0, z: 0 },
    radiusV: { x: 0, y: radius, z: 0 },
    angularVelocity: (direction === TOPO_CIRCULAR_BINARY_DIRECTION.CLOCKWISE
      ? -1
      : 1) * beta / radius,
    angularAcceleration: 0,
  };
  return {
    schema: "prescribed-path-analysis/exact-source-record.v1",
    recordId: "topo-circular-binary-independent-reference",
    engineId: "prescribed-geometry",
    history: { start: 0, end: observationTime },
    sources: [
      {
        id: "electrino",
        charge: -1,
        trajectory: { ...commonTrajectory, phaseAtEpoch: Math.PI },
      },
      {
        id: "positrino",
        charge: 1,
        trajectory: { ...commonTrajectory, phaseAtEpoch: 0 },
      },
    ],
  };
}

test("circular binary geometry starts at visible 20/80 and preserves a true world circle", () => {
  assert.equal(TOPO_CIRCULAR_BINARY_SCENARIO_ID, "orbiting-binary");
  assert.equal(TOPO_CIRCULAR_BINARY_CONTRACT_ID, "topo_prescribed_circular_binary/v1");
  assert.equal(TOPO_CIRCULAR_BINARY_FIELD_SPEED, 1);
  assert.deepEqual(TOPO_CIRCULAR_BINARY_CENTER, { x: 0.5, y: 0.5 });
  assert.equal(TOPO_CIRCULAR_BINARY_RADIUS, 0.3);
  assert.equal(TOPO_CIRCULAR_BINARY_DEFAULT_RADIUS, 0.3);
  assert.equal(TOPO_CIRCULAR_BINARY_MIN_RADIUS, 0.01);
  assert.equal(TOPO_CIRCULAR_BINARY_MAX_RADIUS, 0.45);

  const playback = createTopoCircularBinaryPlayback({ beta: 0.5, progress: 0 });
  const electrino = topoCircularBinarySourcePosition({
    sourceSign: -1,
    time: playback.observationTime,
    beta: playback.beta,
  });
  const positrino = topoCircularBinarySourcePosition({
    sourceSign: 1,
    time: playback.observationTime,
    beta: playback.beta,
  });
  closeTo(electrino.x, 0.2);
  closeTo(electrino.y, 0.5);
  closeTo(positrino.x, 0.8);
  closeTo(positrino.y, 0.5);
  closeTo((electrino.x + positrino.x) / 2, 0.5);
  closeTo((electrino.y + positrino.y) / 2, 0.5);

  const width = 1000;
  const height = 800;
  const centerPixel = topoCircularBinaryWorldPointForCanvasPixel({
    pixelX: 500,
    pixelY: 400,
    width,
    height,
  });
  const horizontal = topoCircularBinaryWorldPointForCanvasPixel({
    pixelX: 600,
    pixelY: 400,
    width,
    height,
  });
  const vertical = topoCircularBinaryWorldPointForCanvasPixel({
    pixelX: 500,
    pixelY: 300,
    width,
    height,
  });
  closeTo(horizontal.x - centerPixel.x, vertical.y - centerPixel.y, 1e-12);
});

test("orbital-radius endpoints stay antipodal and preserve tangential beta", () => {
  for (const direction of Object.values(TOPO_CIRCULAR_BINARY_DIRECTION)) {
    const directionSign = direction === TOPO_CIRCULAR_BINARY_DIRECTION.CLOCKWISE
      ? -1
      : 1;
    for (const radius of [
      TOPO_CIRCULAR_BINARY_MIN_RADIUS,
      TOPO_CIRCULAR_BINARY_DEFAULT_RADIUS,
      TOPO_CIRCULAR_BINARY_MAX_RADIUS,
    ]) {
      const beta = 0.6;
      const playback = createTopoCircularBinaryPlayback({
        beta,
        radius,
        progress: 0,
        direction,
      });
      closeTo(playback.angularVelocity, directionSign * beta / radius);
      closeTo(Math.abs(playback.angularVelocity) * radius, beta);
      closeTo(playback.orbitPeriod, 2 * Math.PI * radius / beta);
      const negative = topoCircularBinarySourcePosition({
        sourceSign: -1,
        time: playback.observationTime,
        beta,
        radius,
        direction,
      });
      const positive = topoCircularBinarySourcePosition({
        sourceSign: 1,
        time: playback.observationTime,
        beta,
        radius,
        direction,
      });
      closeTo((negative.x + positive.x) / 2, 0.5);
      closeTo((negative.y + positive.y) / 2, 0.5);
      closeTo(Math.hypot(negative.x - positive.x, negative.y - positive.y), 2 * radius);
    }
  }
  assert.throws(
    () => createTopoCircularBinaryPlayback({ beta: 0.5, radius: 0.009 }),
    /radius must lie/u,
  );
});

test("responsive policy clips vertical overflow without shrinking or distorting the orbit", () => {
  const fitting = createTopoCircularBinaryChart({ width: 1000, height: 800 });
  assert.equal(fitting.orbitClippedVertically, false);
  const wide = createTopoCircularBinaryChart({ width: 1200, height: 600 });
  assert.equal(wide.orbitClippedVertically, true);
  assert.equal(
    wide.verticalOverflowPolicy,
    TOPO_CIRCULAR_BINARY_VERTICAL_OVERFLOW_POLICY,
  );
  assert.equal(wide.radius, 0.3);
  closeTo(wide.worldUnitsPerPixel * 1199, 1);
});

test("display scale changes circular-binary extent without moving its center", () => {
  const width = 1000;
  const height = 800;
  const wide = createTopoCircularBinaryChart({
    width,
    height,
    displayScale: 0.5,
  });
  const normal = createTopoCircularBinaryChart({
    width,
    height,
    displayScale: 1,
  });
  const close = createTopoCircularBinaryChart({
    width,
    height,
    displayScale: 2,
  });
  closeTo(wide.maximumX - wide.minimumX, 2);
  closeTo(normal.maximumX - normal.minimumX, 1);
  closeTo(close.maximumX - close.minimumX, 0.5);
  for (const chart of [wide, normal, close]) {
    closeTo((chart.minimumX + chart.maximumX) / 2, 0.5);
    closeTo((chart.minimumY + chart.maximumY) / 2, 0.5);
  }
  const wideCenter = topoCircularBinaryWorldPointForCanvasPixel({
    pixelX: (width - 1) / 2,
    pixelY: (height - 1) / 2,
    width,
    height,
    displayScale: 0.5,
  });
  const closeCenter = topoCircularBinaryWorldPointForCanvasPixel({
    pixelX: (width - 1) / 2,
    pixelY: (height - 1) / 2,
    width,
    height,
    displayScale: 2,
  });
  closeTo(wideCenter.x, TOPO_CIRCULAR_BINARY_CENTER.x);
  closeTo(wideCenter.y, TOPO_CIRCULAR_BINARY_CENTER.y);
  closeTo(closeCenter.x, TOPO_CIRCULAR_BINARY_CENTER.x);
  closeTo(closeCenter.y, TOPO_CIRCULAR_BINARY_CENTER.y);
});

test("one replay is one orbit and beta zero is stationary with playback disabled", () => {
  const movingStart = createTopoCircularBinaryPlayback({ beta: 0.75, progress: 0 });
  const movingQuarter = createTopoCircularBinaryPlayback({ beta: 0.75, progress: 0.25 });
  const movingEnd = createTopoCircularBinaryPlayback({ beta: 0.75, progress: 1 });
  closeTo(movingStart.angularVelocity, 0.75 / TOPO_CIRCULAR_BINARY_RADIUS);
  closeTo(
    movingEnd.observationTime - movingStart.observationTime,
    movingStart.orbitPeriod,
  );
  const start = topoCircularBinarySourcePosition({
    sourceSign: -1,
    time: movingStart.observationTime,
    beta: 0.75,
  });
  const quarter = topoCircularBinarySourcePosition({
    sourceSign: -1,
    time: movingQuarter.observationTime,
    beta: 0.75,
  });
  const end = topoCircularBinarySourcePosition({
    sourceSign: -1,
    time: movingEnd.observationTime,
    beta: 0.75,
  });
  closeTo(start.x, end.x);
  closeTo(start.y, end.y);
  closeTo(quarter.x, 0.5);
  closeTo(quarter.y, 0.2);

  const stationary = createTopoCircularBinaryPlayback({ beta: 0, progress: 0.8 });
  assert.equal(stationary.playbackEnabled, false);
  assert.equal(stationary.progress, 0);
  assert.equal(stationary.angularVelocity, 0);
  assert.equal(stationary.orbitPeriod, null);
  assert.equal(stationary.historyPolicy, TOPO_CIRCULAR_BINARY_HISTORY_POLICY);
});

test("clockwise reverses every prescribed history while preserving replay duration", () => {
  for (const progress of [0, 0.25, 0.5, 1]) {
    const counterclockwise = createTopoCircularBinaryPlayback({
      beta: 0.75,
      radius: 0.01,
      progress,
      direction: TOPO_CIRCULAR_BINARY_DIRECTION.COUNTERCLOCKWISE,
    });
    const clockwise = createTopoCircularBinaryPlayback({
      beta: 0.75,
      radius: 0.01,
      progress,
      direction: TOPO_CIRCULAR_BINARY_DIRECTION.CLOCKWISE,
    });
    closeTo(counterclockwise.observationTime, clockwise.observationTime);
    closeTo(counterclockwise.orbitPeriod, clockwise.orbitPeriod);
    closeTo(counterclockwise.angularVelocity, -clockwise.angularVelocity);
    for (const sourceSign of [-1, 1]) {
      const ccw = topoCircularBinarySourcePosition({
        sourceSign,
        time: counterclockwise.observationTime,
        beta: counterclockwise.beta,
        radius: counterclockwise.radius,
        direction: counterclockwise.direction,
      });
      const cw = topoCircularBinarySourcePosition({
        sourceSign,
        time: clockwise.observationTime,
        beta: clockwise.beta,
        radius: clockwise.radius,
        direction: clockwise.direction,
      });
      closeTo(ccw.x, cw.x);
      closeTo(ccw.y + cw.y, 1);
    }
  }
});

test("sub-field-speed roots retain a strict bracket and satisfy the direct circular residual", () => {
  for (const beta of [0, 0.2, 0.65, 0.99]) {
    const playback = createTopoCircularBinaryPlayback({ beta, progress: 0.37 });
    for (const sourceSign of [-1, 1]) {
      const root = solveTopoCircularBinaryCausalDelay({
        point: { x: 0.14, y: 0.31 },
        sourceSign,
        observationTime: playback.observationTime,
        beta,
      });
      assert.equal(root.state, "ordinary");
      assert.equal(root.uniqueness, "strict-sub-field-speed");
      assert.ok(root.delay > 0 && root.delay <= playback.observationTime);
      assert.ok(root.bracket[0] <= root.delay && root.delay <= root.bracket[1]);
      closeTo(topoCircularBinaryCausalResidual({
        point: { x: 0.14, y: 0.31 },
        sourceSign,
        observationTime: playback.observationTime,
        delay: root.delay,
        beta,
      }), 0, 1e-9);
    }
  }
});

test("selected moving samples agree with the separately authored prescribed-path CPU evaluator", () => {
  const samples = [
    {
      beta: 0.25,
      radius: 0.01,
      progress: 0,
      direction: TOPO_CIRCULAR_BINARY_DIRECTION.CLOCKWISE,
      point: { x: 0.4, y: 0.4 },
    },
    { beta: 0.5, radius: 0.3, progress: 0.25, point: { x: 0.15, y: 0.27 } },
    {
      beta: 0.8,
      radius: 0.45,
      progress: 0.73,
      direction: TOPO_CIRCULAR_BINARY_DIRECTION.CLOCKWISE,
      point: { x: 0.76, y: 0.62 },
    },
  ];
  for (const sample of samples) {
    const playback = createTopoCircularBinaryPlayback(sample);
    const independent = evaluatePrescribedSourceWake({
      sourceRecord: createIndependentSourceRecord(
        sample.beta,
        playback.observationTime,
        sample.radius,
        sample.direction,
      ),
      observationTime: playback.observationTime,
      probePosition: { ...sample.point, z: 0 },
      probeCharge: 1,
      fieldSpeed: 1,
      coupling: 1,
      minimumDelay: 1e-12,
      rootTolerance: 1e-12,
    });
    assert.equal(independent.contributionCount, 2);
    const actual = sampleTopoCircularBinaryWake(sample);
    assert.equal(actual.state, "ordinary");
    for (let index = 0; index < 2; index += 1) {
      closeTo(
        actual.roots[index].delay,
        independent.contributions[index].delay,
        2e-9,
      );
    }
    const expectedRaw = independent.contributions.reduce(
      (sum, contribution) => sum +
        Math.sign(contribution.transmitterCharge) *
        TOPO_CIRCULAR_BINARY_KAPPA / contribution.delay ** 2,
      0,
    );
    closeTo(actual.rawValue, expectedRaw, 2e-8);
  }
});

test("stationary, superposition, source masking, and physical-magnitude display mapping stays explicit", () => {
  const point = { x: 0.1, y: 0.5 };
  const stationary = sampleTopoCircularBinaryWake({ point, beta: 0, progress: 0 });
  const negativeDistance = Math.hypot(point.x - 0.2, point.y - 0.5);
  const positiveDistance = Math.hypot(point.x - 0.8, point.y - 0.5);
  const expected = -TOPO_CIRCULAR_BINARY_KAPPA / negativeDistance ** 2 +
    TOPO_CIRCULAR_BINARY_KAPPA / positiveDistance ** 2;
  closeTo(stationary.rawValue, expected, 1e-8);
  closeTo(stationary.displayCoordinate, normalizeTopoFieldColorValue(expected));

  for (const beta of [0, 0.4, 1]) {
    const center = sampleTopoCircularBinaryWake({
      point: TOPO_CIRCULAR_BINARY_CENTER,
      beta,
      progress: 0.33,
    });
    assert.equal(center.state, "ordinary");
    closeTo(center.rawValue, 0, 1e-12);
  }

  const playback = createTopoCircularBinaryPlayback({ beta: 0.5, progress: 0.4 });
  const source = topoCircularBinarySourcePosition({
    sourceSign: -1,
    time: playback.observationTime,
    beta: playback.beta,
  });
  assert.equal(sampleTopoCircularBinaryWake({
    point: source,
    beta: playback.beta,
    progress: playback.progress,
  }).state, "singular:endpoint_source");
});

test("beta-one endpoint is explicit and a missing finite-history root fails closed", () => {
  for (const direction of Object.values(TOPO_CIRCULAR_BINARY_DIRECTION)) {
    for (const beta of [0, 0.5, 1]) {
      const endpoint = sampleTopoCircularBinaryWake({
        point: { x: 0.55, y: 0.5 },
        beta,
        radius: 0.01,
        progress: 0.25,
        direction,
      });
      assert.equal(endpoint.state, "ordinary");
      assert.equal(endpoint.roots.every(({ endpoint }) => endpoint === (beta === 1)), true);
      if (beta === 1) {
        assert.equal(
          endpoint.roots.every(({ uniqueness }) =>
            uniqueness === "circular-endpoint-monotone"),
          true,
        );
      }
    }
  }

  const unavailable = sampleTopoCircularBinaryWake({
    point: { x: 0.5, y: 0.5 },
    beta: 1,
    progress: 0,
    observationTime: 0.05,
    direction: TOPO_CIRCULAR_BINARY_DIRECTION.CLOCKWISE,
  });
  assert.equal(unavailable.state, "unavailable:incomplete_source_ledger");
  assert.equal(unavailable.rawValue, null);
  assert.equal(
    unavailable.roots.some(({ state }) =>
      state === "unavailable:no_ordinary_root_in_retained_history"),
    true,
  );
});

test("frame identity changes with beta and orbit progress without changing the one-orbit contract", () => {
  const open = createTopoCircularBinaryFrameIdentity({ beta: 0.5, progress: 0 });
  const quarter = createTopoCircularBinaryFrameIdentity({ beta: 0.5, progress: 0.25 });
  const faster = createTopoCircularBinaryFrameIdentity({ beta: 0.75, progress: 0.25 });
  const tighter = createTopoCircularBinaryFrameIdentity({
    beta: 0.75,
    progress: 0.25,
    radius: 0.1,
  });
  const clockwise = createTopoCircularBinaryFrameIdentity({
    beta: 0.75,
    progress: 0.25,
    radius: 0.1,
    direction: TOPO_CIRCULAR_BINARY_DIRECTION.CLOCKWISE,
  });
  assert.notEqual(open, quarter);
  assert.notEqual(quarter, faster);
  assert.notEqual(faster, tighter);
  assert.notEqual(tighter, clockwise);
  assert.match(clockwise, /direction=clockwise/u);
  assert.match(open, /^topo_prescribed_circular_binary\/v1:/u);
});

test("binary UI removes no-op contours and preserves accessible shared transport", () => {
  const html = readRepoFile("topo.html");
  const runtime = readRepoFile("src/apps/topo/TopoInteractionContractRuntime.js");
  const scenario = readRepoFile("src/apps/topo/TopoCircularBinaryScenario.js");
  const css = readRepoFile("src/apps/topo/topo.css");
  const tokens = readRepoFile("ui-tokens.css");

  assert.match(html, /Orbiting binary electrino and positrino/u);
  assert.match(html, /Approaching collinear electrino and positrino/u);
  assert.match(html, /id="topo-contour-controls"/u);
  assert.match(html, /id="topo-binary-radius"[\s\S]*min="0\.01"[\s\S]*max="0\.45"[\s\S]*value="0\.30"/u);
  assert.match(html, /<legend>Orbit direction<\/legend>/u);
  assert.match(html, /name="topo-binary-direction" value="counterclockwise" checked/u);
  assert.match(html, /name="topo-binary-direction" value="clockwise"/u);
  assert.match(html, /id="topo-binary-orbit-guide" type="checkbox" checked/u);
  assert.match(html, /Show solid orbit guide/u);
  assert.match(html, /Prescribed reference path only/u);
  assert.doesNotMatch(html, /topo-binary-axes/u);
  assert.match(html, /<legend>Neutral background<\/legend>/u);
  assert.match(html, /id="topo-background-control" class="topo-radio-field"/u);
  assert.match(html, /name="topo-background" value="purple" checked/u);
  assert.match(html, /name="topo-background" value="white"/u);
  assert.match(html, /id="topo-binary-play"[\s\S]*aria-label="Play"/u);
  assert.match(html, /id="topo-binary-replay"[\s\S]*aria-label="Replay"/u);
  assert.match(html, /role="progressbar"[\s\S]*aria-label="Orbit progress"/u);
  assert.match(runtime, /setTransportControlButtonPresentation/u);
  assert.match(
    runtime,
    /dom\.contourControls\.hidden = binaryMode \|\| localUnavailable/u,
  );
  assert.match(runtime, /drawCircularBinaryOverlay/u);
  assert.match(runtime, /"source-markers-only"/u);
  assert.match(runtime, /"solid-orbit-guide-and-source-markers"/u);
  assert.match(runtime, /"disabled:orbiting-binary"/u);
  assert.match(runtime, /whiteBackground[\s\S]*\? "#ffffff"/u);
  assert.match(runtime, /dom\.app\.dataset\.neutralBackground = state\.backgroundMode/u);
  assert.doesNotMatch(runtime, /backgroundControl\.hidden/u);
  assert.match(runtime, /const mobileOverlayOpen =/u);
  assert.match(runtime, /dom\.binaryTransport\.hidden = hidden/u);
  assert.match(runtime, /gpu-direct-signed-log10/u);
  assert.match(runtime, /for \(int iteration = 0; iteration < 56; iteration \+= 1\)/u);
  assert.match(runtime, /u_kappa \/ \(positiveDelay \* positiveDelay\)/u);
  assert.match(runtime, /TOPO_SOURCE_MARKER_RADIUS_SCALE = 0\.5/u);
  assert.match(runtime, /TOPO_SOURCE_MASK_MARKER_RATIO = 0\.75/u);
  assert.match(runtime, /u_source_mask_radius/u);
  assert.match(runtime, /sourceMaskRadius/u);
  assert.match(runtime, /setLineDash\(\[\]\)/u);
  assert.match(runtime, /"#f2e6ff"/u);
  assert.match(runtime, /state\.backgroundMode === "white"/u);
  assert.match(runtime, /split-perpendicular-bisector/u);
  assert.match(runtime, /u_direction_sign/u);
  assert.match(runtime, /event\?\.repeat/u);
  assert.match(runtime, /togglePairPlayback/u);
  assert.match(runtime, /getState\(\)\.playback\.playbackEnabled/u);
  assert.match(css, /input\[value="purple"\]:checked::before/u);
  assert.match(css, /input\[value="white"\]:checked::before/u);
  assert.match(css, /background: #ffffff;/u);
  assert.match(css, /\.topo-radio-field input:focus-visible/u);
  assert.match(runtime, /topoGlobalTransportOwnsSpace/u);
  assert.match(runtime, /String\(event\.target\?\.type/u);
  assert.match(runtime, /event\.preventDefault\(\);[\s\S]*togglePairPlayback/u);
  assert.match(runtime, /event\.preventDefault\(\);[\s\S]*toggleBinaryPlayback/u);
  assert.match(runtime, /--ui-color-electric-purple/u);
  assert.doesNotMatch(scenario, /asinh|arsinh|constant.velocity/iu);
  assert.match(tokens, /--ui-color-electric-purple: #8f00ff;/u);
});
