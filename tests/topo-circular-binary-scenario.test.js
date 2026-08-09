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
  TOPO_CIRCULAR_BINARY_PLAYBACK_SECONDS,
  TOPO_CIRCULAR_BINARY_RADIUS,
  TOPO_CIRCULAR_BINARY_REPLAY_ROTATIONS,
  TOPO_CIRCULAR_BINARY_SCENARIO_ID,
  TOPO_CIRCULAR_BINARY_VERTICAL_OVERFLOW_POLICY,
  createTopoCircularBinaryChart,
  createTopoCircularBinaryFrameIdentity,
  createTopoCircularBinaryPlayback,
  resolveTopoCircularBinaryHistoryWarmup,
  sampleTopoCircularBinaryWake,
  solveTopoCircularBinaryCausalDelay,
  topoCircularBinaryCausalResidual,
  topoCircularBinarySourcePosition,
  topoCircularBinaryWorldPointForCanvasPixel,
} from "../src/apps/topo/TopoCircularBinaryScenario.js";
import {
  normalizeTopoFieldColorValue,
  TOPO_PARTNER_WAKE_OBSERVER,
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
  sourceId = "positrino",
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
    ].filter((source) => source.id === sourceId),
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

test("one replay is two rotations and beta zero is stationary with playback disabled", () => {
  const movingStart = createTopoCircularBinaryPlayback({ beta: 0.75, progress: 0 });
  const movingEighth = createTopoCircularBinaryPlayback({ beta: 0.75, progress: 0.125 });
  const movingHalf = createTopoCircularBinaryPlayback({ beta: 0.75, progress: 0.5 });
  const movingEnd = createTopoCircularBinaryPlayback({ beta: 0.75, progress: 1 });
  assert.equal(TOPO_CIRCULAR_BINARY_REPLAY_ROTATIONS, 2);
  assert.equal(TOPO_CIRCULAR_BINARY_PLAYBACK_SECONDS, 16);
  closeTo(movingStart.angularVelocity, 0.75 / TOPO_CIRCULAR_BINARY_RADIUS);
  closeTo(
    movingEnd.observationTime - movingStart.observationTime,
    2 * movingStart.orbitPeriod,
  );
  const start = topoCircularBinarySourcePosition({
    sourceSign: -1,
    time: movingStart.observationTime,
    beta: 0.75,
  });
  const quarter = topoCircularBinarySourcePosition({
    sourceSign: -1,
    time: movingEighth.observationTime,
    beta: 0.75,
  });
  const half = topoCircularBinarySourcePosition({
    sourceSign: -1,
    time: movingHalf.observationTime,
    beta: 0.75,
  });
  const end = topoCircularBinarySourcePosition({
    sourceSign: -1,
    time: movingEnd.observationTime,
    beta: 0.75,
  });
  closeTo(start.x, end.x);
  closeTo(start.y, end.y);
  closeTo(start.x, half.x);
  closeTo(start.y, half.y);
  closeTo(quarter.x, 0.5);
  closeTo(quarter.y, 0.2);
  assert.equal(movingEnd.replayRotations, 2);

  const stationary = createTopoCircularBinaryPlayback({ beta: 0, progress: 0.8 });
  assert.equal(stationary.playbackEnabled, false);
  assert.equal(stationary.progress, 0);
  assert.equal(stationary.angularVelocity, 0);
  assert.equal(stationary.orbitPeriod, null);
  assert.equal(stationary.replayRotations, 2);
  assert.equal(stationary.historyPolicy, TOPO_CIRCULAR_BINARY_HISTORY_POLICY);
});

test("adaptive whole-orbit warmup covers the visible frame without moving replay start", () => {
  const settings = {
    beta: 1,
    radius: TOPO_CIRCULAR_BINARY_MIN_RADIUS,
    width: 1600,
    height: 900,
    displayScale: 0.5,
  };
  const warmup = resolveTopoCircularBinaryHistoryWarmup(settings);
  const playback = createTopoCircularBinaryPlayback({
    beta: settings.beta,
    radius: settings.radius,
    progress: 0,
    ...warmup,
  });
  assert.ok(warmup.historyWarmupOrbits > 1);
  assert.ok(warmup.historyWarmupDuration >= warmup.historyRequiredDuration);
  assert.ok(
    warmup.historyWarmupDuration - playback.orbitPeriod <
      warmup.historyRequiredDuration,
  );
  closeTo(
    warmup.historyWarmupDuration,
    warmup.historyWarmupOrbits * playback.orbitPeriod,
  );
  const chart = createTopoCircularBinaryChart(settings);
  const corners = [
    { x: chart.minimumX, y: chart.minimumY },
    { x: chart.minimumX, y: chart.maximumY },
    { x: chart.maximumX, y: chart.minimumY },
    { x: chart.maximumX, y: chart.maximumY },
  ];
  for (const sourceSign of [-1, 1]) {
    const start = topoCircularBinarySourcePosition({
      sourceSign,
      time: playback.observationTime,
      beta: playback.beta,
      radius: playback.radius,
    });
    closeTo(start.x, sourceSign < 0 ? 0.49 : 0.51);
    closeTo(start.y, 0.5);
    for (const point of corners) {
      assert.equal(solveTopoCircularBinaryCausalDelay({
        point,
        sourceSign,
        observationTime: playback.observationTime,
        beta: playback.beta,
        radius: playback.radius,
      }).state, "ordinary");
    }
  }

  const stationaryWarmup = resolveTopoCircularBinaryHistoryWarmup({
    ...settings,
    beta: 0,
  });
  const stationary = createTopoCircularBinaryPlayback({
    beta: 0,
    radius: settings.radius,
    ...stationaryWarmup,
  });
  closeTo(stationary.observationTime, stationaryWarmup.historyRequiredDuration);
  assert.equal(stationary.historyWarmupOrbits, 0);
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

test("each partner-wake perspective agrees with the separately authored prescribed-path CPU evaluator", () => {
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
    for (const observerId of Object.values(TOPO_PARTNER_WAKE_OBSERVER)) {
      const partnerId = observerId === "electrino" ? "positrino" : "electrino";
      const playback = createTopoCircularBinaryPlayback(sample);
      const independent = evaluatePrescribedSourceWake({
        sourceRecord: createIndependentSourceRecord(
          sample.beta,
          playback.observationTime,
          sample.radius,
          sample.direction,
          partnerId,
        ),
        observationTime: playback.observationTime,
        probePosition: { ...sample.point, z: 0 },
        probeCharge: 1,
        fieldSpeed: 1,
        coupling: 1,
        minimumDelay: 1e-12,
        rootTolerance: 1e-12,
      });
      assert.equal(independent.contributionCount, 1);
      const actual = sampleTopoCircularBinaryWake({ ...sample, observerId });
      assert.equal(actual.state, "ordinary");
      closeTo(
        actual.roots[0].delay,
        independent.contributions[0].delay,
        2e-9,
      );
      const contribution = independent.contributions[0];
      const expectedRaw = Math.sign(contribution.transmitterCharge) *
        TOPO_CIRCULAR_BINARY_KAPPA / contribution.delay ** 2;
      closeTo(actual.rawValue, expectedRaw, 2e-8);
    }
  }
});

test("stationary partner wake, self exclusion, source masking, and variable-reach visibility mapping stay explicit", () => {
  const point = { x: 0.1, y: 0.5 };
  const stationary = sampleTopoCircularBinaryWake({ point, beta: 0, progress: 0 });
  const positiveDistance = Math.hypot(point.x - 0.8, point.y - 0.5);
  const expected = TOPO_CIRCULAR_BINARY_KAPPA / positiveDistance ** 2;
  closeTo(stationary.rawValue, expected, 1e-8);
  closeTo(stationary.displayCoordinate, normalizeTopoFieldColorValue(expected));

  for (const beta of [0, 0.4, 1]) {
    const center = sampleTopoCircularBinaryWake({
      point: TOPO_CIRCULAR_BINARY_CENTER,
      beta,
      progress: 0.33,
    });
    assert.equal(center.state, "ordinary");
    assert.ok(center.rawValue > 0);
  }

  const playback = createTopoCircularBinaryPlayback({ beta: 0.5, progress: 0.4 });
  const selectedObserver = topoCircularBinarySourcePosition({
    sourceSign: -1,
    time: playback.observationTime,
    beta: playback.beta,
  });
  const partnerSource = topoCircularBinarySourcePosition({
    sourceSign: 1,
    time: playback.observationTime,
    beta: playback.beta,
  });
  assert.equal(sampleTopoCircularBinaryWake({
    point: selectedObserver,
    beta: playback.beta,
    progress: playback.progress,
  }).state, "ordinary");
  assert.equal(sampleTopoCircularBinaryWake({
    point: partnerSource,
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

test("frame identity changes with beta and two-rotation replay progress", () => {
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
  const positrinoPerspective = createTopoCircularBinaryFrameIdentity({
    beta: 0.5,
    progress: 0,
    observerId: "positrino",
  });
  assert.notEqual(open, quarter);
  assert.notEqual(quarter, faster);
  assert.notEqual(faster, tighter);
  assert.notEqual(tighter, clockwise);
  assert.notEqual(open, positrinoPerspective);
  assert.match(clockwise, /direction=clockwise/u);
  assert.match(open, /view=electrino/u);
  assert.match(positrinoPerspective, /view=positrino/u);
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
  assert.match(html, /<legend>View<\/legend>/u);
  assert.match(html, /name="topo-partner-perspective" value="electrino"/u);
  assert.match(html, /name="topo-partner-perspective" value="positrino"/u);
  assert.match(html, /name="topo-partner-perspective" value="absolute" checked/u);
  assert.match(html, /id="topo-contour-controls"/u);
  assert.match(html, /id="topo-binary-radius"[\s\S]*min="0\.01"[\s\S]*max="0\.45"[\s\S]*value="0\.30"/u);
  assert.match(html, /<legend>Orbit direction<\/legend>/u);
  assert.match(html, /name="topo-binary-direction" value="counterclockwise" checked/u);
  assert.match(html, /name="topo-binary-direction" value="clockwise"/u);
  assert.match(html, /id="topo-binary-orbit-guide" type="checkbox" checked/u);
  assert.match(html, /Show solid orbit guide/u);
  assert.match(html, /Prescribed reference path only/u);
  assert.doesNotMatch(html, /topo-binary-axes/u);
  assert.match(html, /<span>Neutral<\/span>/u);
  assert.match(html, /id="topo-background-control"[\s\S]*class="topo-range-field"/u);
  assert.match(
    html,
    /id="topo-background"[\s\S]*type="range"[\s\S]*min="0"[\s\S]*max="100"[\s\S]*value="0"/u,
  );
  assert.match(
    html,
    /id="topo-background"[\s\S]*aria-label="Neutral, Electric Purple to white"/u,
  );
  assert.match(html, /id="topo-binary-play"[\s\S]*aria-label="Play"/u);
  assert.match(html, /id="topo-binary-replay"[\s\S]*aria-label="Reset orbit playback"/u);
  assert.match(html, /id="topo-binary-timeline"[\s\S]*aria-label="Orbit playback position"/u);
  assert.match(runtime, /setTransportControlButtonPresentation/u);
  assert.match(
    runtime,
    /dom\.contourControls\.hidden = false/u,
  );
  assert.doesNotMatch(runtime, /localUnavailable/u);
  assert.match(runtime, /drawCircularBinaryOverlay/u);
  assert.match(runtime, /"source-markers-only"/u);
  assert.match(runtime, /"solid-orbit-guide-and-source-markers"/u);
  assert.match(runtime, /"disabled:orbiting-binary"/u);
  assert.match(runtime, /createTopoNeutralBackgroundRgb[\s\S]*\[255, 255, 255\]/u);
  assert.match(runtime, /dataset\.neutralBackgroundWhiteMix[\s\S]*state\.neutralWhiteMix/u);
  assert.doesNotMatch(runtime, /backgroundControl\.hidden/u);
  assert.match(runtime, /const mobileOverlayOpen =/u);
  assert.match(runtime, /dom\.binaryTransport\.hidden = hidden/u);
  assert.match(
    runtime,
    /gpu-direct-signed-bounded-square-root-variable-reach/u,
  );
  assert.match(runtime, /for \(int iteration = 0; iteration < 56; iteration \+= 1\)/u);
  assert.match(runtime, /sourceSign \* u_kappa \/ \(delay \* delay\)/u);
  assert.match(runtime, /partner-only-self-excluded/u);
  assert.match(runtime, /TOPO_SOURCE_MARKER_RADIUS_SCALE = 0\.5/u);
  assert.match(runtime, /TOPO_EXACT_SOURCE_MASK_WORLD_RADIUS/u);
  assert.match(runtime, /u_source_mask_radius/u);
  assert.match(runtime, /sourceMaskRadius/u);
  assert.match(runtime, /setLineDash\(\[\]\)/u);
  assert.match(runtime, /"#f2e6ff"/u);
  assert.match(runtime, /createTopoNeutralBackgroundRgb/u);
  assert.match(runtime, /split-perpendicular-bisector/u);
  assert.match(runtime, /u_direction_sign/u);
  assert.match(runtime, /event\?\.repeat/u);
  assert.match(runtime, /togglePairPlayback/u);
  assert.match(runtime, /getState\(\)\.playback\.playbackEnabled/u);
  assert.match(css, /#topo-background::-(?:webkit-slider-runnable-track|moz-range-track)/u);
  assert.match(css, /var\(--ui-color-electric-purple\)[\s\S]*#ffffff/u);
  assert.match(css, /\.topo-radio-field input:focus-visible/u);
  assert.match(runtime, /topoGlobalTransportOwnsSpace/u);
  assert.match(runtime, /String\(event\.target\?\.type/u);
  assert.match(runtime, /event\.preventDefault\(\);[\s\S]*togglePairPlayback/u);
  assert.match(runtime, /event\.preventDefault\(\);[\s\S]*toggleBinaryPlayback/u);
  assert.match(runtime, /--ui-color-electric-purple/u);
  assert.doesNotMatch(scenario, /asinh|arsinh|constant.velocity/iu);
  assert.match(tokens, /--ui-color-electric-purple: #8f00ff;/u);
});
