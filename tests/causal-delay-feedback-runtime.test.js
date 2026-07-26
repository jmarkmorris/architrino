import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import {
  createCausalDelayFeedbackRuntime,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackRuntime.js";
import {
  EOM_REPLAY_ADAPTER,
  EOM_REPLAY_DATASET_SOURCE,
  EOM_REPLAY_MAX_FRAME_COUNT,
  EOM_REPLAY_MAX_HISTORY_DEPTH,
  createCausalDelayFeedbackEomReplayAdapter,
  normalizeCausalDelayFeedbackEomReplay,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackEomReplayAdapter.js";
import {
  DIRECT_MANIPULATION_DRAFT_PREVIEW,
  REPRESENTATIVE_MOCK_SOLVER_REPLAY,
  TEMPORARY_MOCK_ADAPTER,
  createMockCausalDelayReplayDataset,
  getAngleDegrees,
  getDistance,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackReplayAdapter.js";
import {
  ARCHITRINO_BODY_HALO_RADIUS,
  ARCHITRINO_BODY_OUTLINE_WIDTH,
  ARCHITRINO_BODY_RADIUS,
  CAUSAL_PATH_STROKE_WIDTH,
  DEFAULT_TRANSMISSION_POINT_MARKER_VARIANT,
  FIXED_CANVAS_COLOR,
  FIXED_WAKE_VISUAL_STYLE,
  FRAME_COUNT,
  PATH_TIME_END_X,
  PATH_TIME_START_X,
  ELECTRINO_WAKE,
  POSITRINO_WAKE,
  TRANSMISSION_POINT_MARKER_STYLES,
  TRANSMISSION_POINT_MARKER_VARIANTS,
  TIME_AXIS_BASELINE_Y,
  TIME_AXIS_END_X,
  TIME_AXIS_LABEL_POSITION,
  TIME_AXIS_ORIGIN_X,
  TIMELINE_RAIL_AXIS_SAFE_INSET,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackDisplayContract.js";
import {
  createCausalDelayFeedbackEomReplayOptions,
  createCausalDelayFeedbackInitialReplayRequestOptions,
  createCausalDelayFeedbackRuntimeForPage,
  shouldUseEomReplay,
} from "../src/apps/causal-delay-feedback/main.js";
import {
  createStoryScene,
  createStorySampledWakeFronts,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackStoryMode.js";
import {
  C1_CUBIC_HERMITE_INTERPOLATION,
  getC1TimedPathBezierSegment,
  sampleTimedPath,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackTimedPath.js";
import {
  createEomRecordFixture,
} from "./helpers/causal-delay-feedback-eom-fixture.js";

class FakeElement {
  constructor() {
    this.children = [];
    this.dataset = {};
    this.hidden = true;
    this.textContent = "";
    this.title = "";
    this.attributes = {};
    this.style = {};
    this.classNames = new Set();
    this.listeners = new Map();
    this.classList = {
      add: (name) => {
        this.classNames.add(name);
      },
      remove: (name) => {
        this.classNames.delete(name);
      },
      contains: (name) => this.classNames.has(name),
      toggle: (name, force) => {
        const shouldAdd = force ?? !this.classNames.has(name);
        if (shouldAdd) {
          this.classNames.add(name);
        } else {
          this.classNames.delete(name);
        }
        return shouldAdd;
      },
    };
  }

  replaceChildren(...children) {
    this.children = children;
  }

  setAttribute(name, value) {
    this.attributes[name] = value;
  }

  addEventListener(type, handler) {
    const listeners = this.listeners.get(type) ?? new Set();
    listeners.add(handler);
    this.listeners.set(type, listeners);
  }

  removeEventListener(type, handler) {
    this.listeners.get(type)?.delete(handler);
  }
}

class FakeDocument {
  constructor() {
    this.listeners = new Map();
  }

  createElement() {
    return new FakeElement();
  }

  addEventListener(type, handler) {
    const listeners = this.listeners.get(type) ?? new Set();
    listeners.add(handler);
    this.listeners.set(type, listeners);
  }

  removeEventListener(type, handler) {
    this.listeners.get(type)?.delete(handler);
  }
}

const fakeWindow = Object.freeze({
  location: { href: "http://localhost/causal-delay-feedback.html" },
});

function assertNear(actual, expected, epsilon = 1e-9) {
  assert.ok(Math.abs(actual - expected) <= epsilon, `${actual} should be near ${expected}`);
}

function formatTestCompactNumber(value) {
  if (!Number.isFinite(value)) {
    return "--";
  }
  if (value === 0) {
    return "0";
  }
  const magnitude = Math.abs(value);
  if (magnitude < 0.001 || magnitude >= 1000) {
    return value.toExponential(1);
  }
  return value.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
}

function getTimingDistance(timing, link = null) {
  if (timing?.source && timing?.receiver) {
    return Math.hypot(timing.receiver.x - timing.source.x, timing.receiver.y - timing.source.y);
  }
  const linkDistance = Number(link?.distance);
  return Number.isFinite(linkDistance) ? linkDistance : Number.NaN;
}

function getWakeFrontDistances(runtime, timing, link = null) {
  const distance = getTimingDistance(timing, link);
  return runtime.getWakeFrontProgresses(timing, link).map((progress) => progress * distance);
}

function assertConstantWakeFrontSeparation(frontDistances, totalDistance) {
  assert(frontDistances.length > 0);
  assertNear(frontDistances.at(-1), totalDistance, 1e-6);
  const standardSpacing = frontDistances[0];
  assert(standardSpacing > 0);
  for (let index = 1; index < frontDistances.length - 1; index += 1) {
    assertNear(frontDistances[index] - frontDistances[index - 1], standardSpacing, 1e-6);
  }
  if (frontDistances.length > 1) {
    const finalSpacing = frontDistances.at(-1) - frontDistances.at(-2);
    assert(finalSpacing > 0);
    assert(finalSpacing <= standardSpacing + 1e-6);
  }
  return standardSpacing;
}

function normalizedDot(left, right) {
  const leftMagnitude = Math.hypot(left.x, left.y);
  const rightMagnitude = Math.hypot(right.x, right.y);
  assert(leftMagnitude > 0);
  assert(rightMagnitude > 0);
  return (left.x * right.x + left.y * right.y) / (leftMagnitude * rightMagnitude);
}

function assertStrictlyIncreasingDisplayedTimeAxis(runtime, kind, sampleCount = 4000) {
  const path = runtime.dataset.paths[kind];
  const startT = path[0].t;
  const endT = path.at(-1).t;
  let previous = sampleTimedPath(path, startT);
  for (let index = 1; index <= sampleCount; index += 1) {
    const time = startT + (endT - startT) * (index / sampleCount);
    const current = sampleTimedPath(path, time);
    assert(
      current.x > previous.x,
      `${kind} displayed time reversed between ${previous.t} and ${current.t}`,
    );
    previous = current;
  }
}

function createArcRecordingContext() {
  return {
    arcs: [],
    beginPath() {},
    fill() {},
    restore() {},
    save() {},
    stroke() {},
    arc(x, y, radius) {
      this.arcs.push({ x, y, radius });
    },
    set fillStyle(value) {
      this._fillStyle = value;
    },
    set lineWidth(value) {
      this._lineWidth = value;
    },
    set strokeStyle(value) {
      this._strokeStyle = value;
    },
  };
}

function createPathRecordingContext() {
  return {
    commands: [],
    beginPath() {
      this.commands.push({ type: "beginPath" });
    },
    moveTo(x, y) {
      this.commands.push({ type: "moveTo", x, y });
    },
    lineTo(x, y) {
      this.commands.push({ type: "lineTo", x, y });
    },
    quadraticCurveTo(controlX, controlY, x, y) {
      this.commands.push({
        type: "quadraticCurveTo",
        controlX,
        controlY,
        x,
        y,
      });
    },
    bezierCurveTo(controlStartX, controlStartY, controlEndX, controlEndY, x, y) {
      this.commands.push({
        type: "bezierCurveTo",
        controlStartX,
        controlStartY,
        controlEndX,
        controlEndY,
        x,
        y,
      });
    },
    restore() {
      this.commands.push({ type: "restore" });
    },
    save() {
      this.commands.push({ type: "save" });
    },
    stroke() {
      this.commands.push({ type: "stroke" });
    },
    set lineCap(value) {
      this._lineCap = value;
    },
    set lineJoin(value) {
      this._lineJoin = value;
    },
    set lineWidth(value) {
      this._lineWidth = value;
    },
    set strokeStyle(value) {
      this._strokeStyle = value;
    },
  };
}

function createRuntimeForReadout() {
  const readout = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = { readout };
  return { runtime, readout };
}

function readCausalDelayFeedbackHtml() {
  return readFileSync(new URL("../causal-delay-feedback.html", import.meta.url), "utf8");
}

function createMockEomReplayDataset(fixtureId, overrides = {}) {
  return {
    ...createMockCausalDelayReplayDataset(),
    runId: `eom:${fixtureId}`,
    datasetSource: EOM_REPLAY_DATASET_SOURCE,
    solverIntegrationPath: EOM_REPLAY_ADAPTER,
    engineId: "eom-solver",
    claimGrade: "evolved-record",
    ...overrides,
  };
}

test("causal delay feedback readout summarizes selected path history point", () => {
  const { runtime, readout } = createRuntimeForReadout();
  const point = runtime.dataset.history.positrino[0];
  const condition = runtime.dataset.initialConditions.positrino;
  const hit = runtime.createHistoryHit(point, 0);

  runtime.selectedItem = hit.selection;
  runtime.updateReadout(hit);

  assert.equal(readout.hidden, false);
  assert.deepEqual(
    readout.children.map((child) => child.textContent),
    [
      "positrino 1",
      "t=0.00",
      `x=${Math.round(point.x)}`,
      `y=${Math.round(point.y)}`,
      "weight=0.17",
      "older",
      `vx=${condition.vx.toFixed(1)}`,
      `vy=${condition.vy.toFixed(1)}`,
    ],
  );
});

test("causal delay feedback readout summarizes selected path line", () => {
  const { runtime, readout } = createRuntimeForReadout();
  const point = runtime.dataset.paths.positrino[75];
  const hit = runtime.createPathLineHit("positrino", point.t, 0);

  runtime.selectedItem = hit.selection;
  runtime.updateReadout(hit);

  assert.equal(readout.hidden, false);
  assert.deepEqual(
    readout.children.map((child) => child.textContent),
    [
      "positrino path",
      `t=${point.t.toFixed(2)}`,
      `x=${Math.round(point.x)}`,
      `y=${Math.round(point.y)}`,
      "drag=path",
    ],
  );
});

test("causal delay feedback readout summarizes selected wake link", () => {
  const { runtime, readout } = createRuntimeForReadout();
  const link = runtime.dataset.wakeLinks[0];
  const hit = runtime.createWakeHit(link, 0);

  runtime.selectedItem = hit.selection;
  runtime.updateReadout(hit);

  assert.equal(readout.hidden, false);
  assert.equal(readout.children[0].textContent, "red 1 -> blue 2");
  assert.match(readout.children[1].textContent, /^distance=\d+$/);
  assert.equal(readout.children[2].textContent, "emit=0.00");
  assert.equal(readout.children[3].textContent, "hit=0.08");
  assert.equal(readout.children[4].textContent, "travel=0.08");
  assert.match(readout.children[5].textContent, /^(pending|active=\d\.\d{2}|received)$/);
  assert.match(readout.children[6].textContent, /^1\/r=0\.\d{4}$/);
  assert.equal(readout.children[7].textContent, "weight=0.17");
  assert.match(readout.children[8].textContent, /^contrib=/);
  assert.match(readout.children[9].textContent, /^(threshold=above_threshold|threshold=near_threshold|threshold=below_threshold)$/);
  assert.equal(readout.children[10].textContent, "arc wakes");
});

test("causal delay feedback wake readout includes engine diagnostics", () => {
  const { runtime, readout } = createRuntimeForReadout();
  const link = runtime.dataset.wakeLinks[0];
  Object.assign(link, {
    solverRunId: "causal-delay-feedback-accepted_tight_bright-positrino1-to-electrino2-delayed-hit",
    rootCount: 1,
    solverHitCount: 1,
    solverHitTime: 0.25,
    solverResidual: 0,
    solverRootStatusCode: 13,
    solverHitStatusCode: 13,
  });
  const hit = runtime.createWakeHit(link, 0);

  runtime.selectedItem = hit.selection;
  runtime.updateReadout(hit);

  assert.deepEqual(
    readout.children.map((child) => child.textContent).slice(10, 18),
    [
      "solver=solved",
      "roots=1",
      "hits=1",
      "solverHit=0.25",
      "resid=0",
      "rootCode=13",
      "hitCode=13",
      "arc wakes",
    ],
  );
});

test("causal delay feedback wake readout includes compact root ledger details", () => {
  const { runtime, readout } = createRuntimeForReadout();
  const link = runtime.dataset.wakeLinks[0];
  Object.assign(link, {
    solverRunId: "causal-delay-feedback-ledger-red1-blue2-delayed-hit",
    rootCount: 1,
    solverHitCount: 1,
    rootLedgerDetails: [
      {
        bracketStart: 0,
        bracketEnd: 0.083333,
        residual: 1.2e-9,
        iterationCount: 7,
        statusCode: 22,
      },
    ],
  });
  const hit = runtime.createWakeHit(link, 0);

  runtime.selectedItem = hit.selection;
  runtime.updateReadout(hit);
  const readoutText = readout.children.map((child) => child.textContent);

  assert(readoutText.includes("ledgerRows=1"));
  assert(readoutText.includes("ledgerResid=1.2e-9"));
  assert(readoutText.includes("ledgerBracket=0.00-0.08"));
  assert(readoutText.includes("ledgerIter=7"));
  assert(readoutText.includes("ledgerCode=22"));
});

test("causal delay feedback wake readout and visual weight expose rejected solver links", () => {
  const { runtime, readout } = createRuntimeForReadout();
  const link = runtime.dataset.wakeLinks[0];
  Object.assign(link, {
    solverRunId: "causal-delay-feedback-accepted_tight_bright-positrino1-to-electrino2-delayed-hit",
    rootCount: 0,
    solverHitCount: 0,
  });
  const visualWeight = runtime.getWakeVisualWeight(link);
  const hit = runtime.createWakeHit(link, 0);

  runtime.selectedItem = hit.selection;
  runtime.updateReadout(hit);

  assert.equal(runtime.getWakeStatus(link).status, "rejected");
  assert.equal(runtime.getWakeStatus(link).reason, "no_delayed_hit");
  assert.equal(visualWeight.alphaScale, 0.18);
  assert.equal(visualWeight.radiusScale, 0.56);
  assert.equal(visualWeight.desaturation, 0.78);
  assert.deepEqual(
    readout.children.map((child) => child.textContent).slice(10, 16),
    ["state=rejected", "reason=no_delayed_hit", "solver=unresolved", "roots=0", "hits=0", "arc wakes"],
  );
});

test("causal delay feedback rejected wake readout reports solver root-status detail", () => {
  const { runtime, readout } = createRuntimeForReadout();
  const link = runtime.dataset.wakeLinks[0];
  Object.assign(link, {
    solverRunId: "causal-delay-feedback-rejected-red1-blue2-delayed-hit",
    rootCount: 0,
    solverHitCount: 0,
    rootStatus: {
      code: "solver_no_delayed_hit",
      severity: "warn",
      message: "no delayed hit crossed receiver before sample window ended",
    },
  });
  const hit = runtime.createWakeHit(link, 0);

  runtime.selectedItem = hit.selection;
  runtime.updateReadout(hit);
  const readoutText = readout.children.map((child) => child.textContent);

  assert.equal(runtime.getWakeStatus(link).status, "rejected");
  assert.equal(runtime.getWakeStatus(link).reason, "solver_no_delayed_hit");
  assert(readoutText.includes("state=rejected"));
  assert(readoutText.includes("reason=solver_no_delayed_hit"));
  assert(readoutText.includes("rootStatus=solver_no_delayed_hit"));
  assert(readoutText.includes("rootSeverity=warn"));
  assert(readoutText.includes("rootMsg=no_delayed_hit_crossed_receiver_before_sample_window_ended"));
});

test("causal delay feedback root-only wake readout reports inactive root detail", () => {
  const { runtime, readout } = createRuntimeForReadout();
  const link = runtime.dataset.wakeLinks[0];
  Object.assign(link, {
    solverRunId: "causal-delay-feedback-root-only-red1-blue2-delayed-hit",
    rootCount: 1,
    solverHitCount: 0,
    rootStatus: {
      code: "root_outside_receiver_segment",
      severity: "warn",
      message: "root solved outside retained receiver segment",
    },
  });
  const visualWeight = runtime.getWakeVisualWeight(link);
  const hit = runtime.createWakeHit(link, 0);

  runtime.selectedItem = hit.selection;
  runtime.updateReadout(hit);
  const readoutText = readout.children.map((child) => child.textContent);

  assert.equal(runtime.getWakeStatus(link).status, "inactive");
  assert.equal(runtime.getWakeStatus(link).reason, "root_outside_receiver_segment");
  assert.equal(visualWeight.alphaScale, 0.46);
  assert.equal(visualWeight.radiusScale, 0.78);
  assert.equal(visualWeight.desaturation, 0.32);
  assert(readoutText.includes("state=inactive"));
  assert(readoutText.includes("reason=root_outside_receiver_segment"));
  assert(readoutText.includes("solver=root-only"));
  assert(readoutText.includes("roots=1"));
  assert(readoutText.includes("hits=0"));
  assert(readoutText.includes("rootStatus=root_outside_receiver_segment"));
  assert(readoutText.includes("rootMsg=root_solved_outside_retained_receiver_segment"));
});

test("causal delay feedback invalid wake visual tiers distinguish inactive stale and rejected rows", () => {
  const { runtime } = createRuntimeForReadout();
  const baseLink = runtime.dataset.wakeLinks[0];
  const inactive = runtime.getWakeVisualWeight({
    ...baseLink,
    status: "inactive",
    reason: "root_without_hit",
  });
  const stale = runtime.getWakeVisualWeight({
    ...baseLink,
    status: "stale",
    reason: "retained_point_drag_preview",
  });
  const rejected = runtime.getWakeVisualWeight({
    ...baseLink,
    status: "rejected",
    reason: "no_delayed_hit",
  });

  assert(inactive.alphaScale > stale.alphaScale);
  assert(stale.alphaScale > rejected.alphaScale);
  assert(inactive.radiusScale > stale.radiusScale);
  assert(stale.radiusScale > rejected.radiusScale);
  assert(inactive.desaturation < stale.desaturation);
  assert(stale.desaturation < rejected.desaturation);
  assert.equal(inactive.status, "inactive");
  assert.equal(stale.status, "stale");
  assert.equal(rejected.status, "rejected");
});

test("causal delay feedback wake readout reports received rows after the hit time", () => {
  const { runtime, readout } = createRuntimeForReadout();
  const link = runtime.dataset.wakeLinks[0];
  const receiverPoint = runtime.dataset.history[link.receiverKind].find((point) => point.depth === link.receiverDepth);
  const [start, end] = runtime.getReplayTimeRange();
  runtime.elapsedSeconds = ((receiverPoint.t + 0.02 - start) / (end - start)) * 9;
  const hit = runtime.createWakeHit(link, 0);

  runtime.selectedItem = hit.selection;
  runtime.updateReadout(hit);

  assert.equal(readout.children[5].textContent, "received");
});

test("causal delay feedback default readout stays hidden while aggregate feedback updates", () => {
  const { runtime, readout } = createRuntimeForReadout();
  const [start, end] = runtime.getReplayTimeRange();
  runtime.elapsedSeconds = ((0.5 - start) / (end - start)) * 9;

  runtime.updateReadout();
  const summary = runtime.getContributionSummary(runtime.getCurrentReplayTime());

  assert.equal(readout.hidden, true);
  assert.equal(readout.children.length, 0);
  assert.equal(summary.linkCount, 2);
  assert.equal(summary.activeLinkCount, 2);
  assert.equal(summary.receivedCount, 2);
  assert.equal(summary.inFlightCount, 0);
  assert.equal(summary.pendingCount, 0);
  assert(summary.positiveContribution > 0);
  assert(summary.negativeContribution < 0);
  assert.equal(summary.netContribution, summary.positiveContribution + summary.negativeContribution);
});

test("causal delay feedback aggregate summary names a frame before live wake roots exist", () => {
  const { runtime, readout } = createRuntimeForReadout();

  const summary = runtime.getContributionSummary(0.05);
  runtime.updateReadout(runtime.createContributionSummaryHit(0.05));
  const readoutText = readout.children.map((child) => child.textContent);

  assert.equal(summary.linkCount, 0);
  assert.equal(summary.activeLinkCount, 0);
  assert.equal(summary.emptyReason, "no_visible_wake_links");
  assert.equal(readout.hidden, false);
  assert.equal(readout.children[0].textContent, "feedback sum");
  assert(readoutText.includes("received=0/0"));
  assert(readoutText.includes("why=no_visible_wake_links"));
});

test("causal delay feedback now scrubber pauses and moves replay time", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const nowInput = new FakeElement();
  const nowValue = new FakeElement();
  const readout = new FakeElement();
  runtime.dom = {
    nowInput,
    nowValue,
    readout,
    playButton: {
      dataset: {},
      setAttribute() {},
    },
  };
  runtime.context = {};
  let renderedTime = null;
  runtime.render = (replayTime = runtime.getCurrentReplayTime()) => {
    renderedTime = replayTime;
  };

  runtime.setReplayNowSliderValue(500);

  assert.equal(runtime.isPlaying, false);
  assert.equal(nowInput.value, "500");
  assert.equal(nowValue.textContent, "Replay time 0.5");
  assert.equal(nowInput.attributes["aria-valuetext"], "Replay time 0.5");
  assertNear(runtime.getCurrentReplayTime(), 0.5);
  assertNear(renderedTime, 0.5);
  assert.equal(readout.hidden, true);
});

test("Laboratory entry and First Frame use the earliest reciprocal-visible state", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    initialMode: "story",
  });
  const nowInput = new FakeElement();
  runtime.dom = {
    nowInput,
    nowValue: null,
    playButton: new FakeElement(),
    resetButton: new FakeElement(),
    lastFrameButton: new FakeElement(),
  };
  runtime.context = {};
  runtime.render = () => {};
  runtime.elapsedSeconds = runtime.getReplayLoopSeconds() * 0.72;

  runtime.handleLearnerModeChange("sandbox");

  const [rangeStart, rangeEnd] = runtime.getReplayTimeRange();
  const entryState = runtime.getLaboratoryInitialReplayState();
  const expectedTime = Math.max(
    entryState.directedFirstVisibilityTimes.positrino,
    entryState.directedFirstVisibilityTimes.electrino,
  );
  const expectedSliderValue = Math.round(
    ((expectedTime - rangeStart) / (rangeEnd - rangeStart)) * 1000,
  );
  const initialLinks = runtime.getVisibleWakeSeries(expectedTime);
  assert.equal(entryState.hasReciprocalVisibility, true);
  assert.equal(entryState.time, expectedTime);
  assertNear(runtime.getCurrentReplayTime(), expectedTime);
  assert.equal(nowInput.value, String(expectedSliderValue));
  assert.deepEqual(
    initialLinks.map((link) => link.sourceKind).sort(),
    ["electrino", "positrino"],
  );
  initialLinks.forEach((link) => {
    assert.equal(
      runtime.hasVisibleLaboratoryWakeArcGeometry(link, expectedTime),
      true,
    );
  });
  assert(
    entryState.directedFirstVisibilityTimes.electrino >
      entryState.directedFirstVisibilityTimes.positrino,
    "the current paths must expose the reciprocal direction later than the first direction",
  );
  const justBeforeReciprocalVisibility =
    entryState.directedFirstVisibilityTimes.electrino - 1e-5;
  assert.equal(
    runtime.createLiveWakeSeries(
      "electrino",
      justBeforeReciprocalVisibility,
    ),
    null,
  );

  runtime.setReplayNowSliderValue(420);
  assertNear(
    runtime.getCurrentReplayTime(),
    rangeStart + (rangeEnd - rangeStart) * 0.42,
  );

  runtime.resetReplayTime();
  assertNear(runtime.getCurrentReplayTime(), expectedTime);
});

test("Laboratory playback stops at and holds its final frame without looping", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    initialMode: "sandbox",
  });
  const nowInput = new FakeElement();
  runtime.dom = {
    nowInput,
    nowValue: null,
    playButton: new FakeElement(),
    resetButton: new FakeElement(),
    lastFrameButton: new FakeElement(),
  };
  runtime.context = {};
  runtime.render = () => {};
  runtime.isPlaying = true;
  runtime.learnerState.playback.playing = true;
  runtime.elapsedSeconds = runtime.getReplayLoopSeconds() - 0.01;
  runtime.lastFrameTime = 0;

  runtime.tick(60);

  const [, endTime] = runtime.getReplayTimeRange();
  assert.equal(runtime.isPlaying, false);
  assertNear(runtime.getCurrentReplayTime(), endTime);
  assert.equal(nowInput.value, "1000");

  runtime.tick(120);
  assertNear(runtime.getCurrentReplayTime(), endTime);

  runtime.setPlaying(true);
  assert.equal(runtime.isPlaying, true);
  assertNear(runtime.getCurrentReplayTime(), runtime.getLaboratoryInitialReplayTime());
});

test("causal delay feedback now scrubber updates selected wake state", () => {
  const { runtime, readout } = createRuntimeForReadout();
  const nowInput = new FakeElement();
  const nowValue = new FakeElement();
  runtime.dom = {
    ...runtime.dom,
    nowInput,
    nowValue,
    playButton: {
      dataset: {},
      setAttribute() {},
    },
  };
  runtime.setCurrentReplayTime(0.5);
  const link = runtime.getVisibleWakeSeries(0.5)[0];
  runtime.selectedItem = { type: "wake", linkId: link.id };

  runtime.setReplayNowSliderValue(500);

  assert.equal(readout.hidden, false);
  assert.equal(readout.children[0].textContent, link.label);
  assert(readout.children.map((child) => child.textContent).includes("received"));
});

test("causal delay feedback reset resyncs now control and selected readout", () => {
  const { runtime, readout } = createRuntimeForReadout();
  const nowInput = new FakeElement();
  const nowValue = new FakeElement();
  runtime.dom = {
    ...runtime.dom,
    nowInput,
    nowValue,
    playButton: {
      dataset: {},
      setAttribute() {},
    },
  };
  runtime.context = {};
  runtime.render = () => {};
  runtime.setCurrentReplayTime(0.5);
  const link = runtime.getVisibleWakeSeries(0.5)[0];
  runtime.selectedItem = { type: "wake", linkId: link.id };
  runtime.setReplayNowSliderValue(500);

  runtime.resetReplayTime();

  assert.equal(runtime.isPlaying, false);
  assert.equal(nowInput.value, "0");
  assert.equal(nowValue.textContent, "Replay time 0");
  assert.equal(nowInput.attributes["aria-valuetext"], "Replay time 0");
});

test("causal delay feedback reduced motion preference starts paused but allows manual play", () => {
  const nowInput = new FakeElement();
  const nowValue = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    reducedMotionEnabled: true,
  });
  runtime.dom = {
    playButton: new FakeElement(),
    nowInput,
    nowValue,
    readout: new FakeElement(),
  };
  runtime.render = () => {};
  const frameTimes = runtime.getReplayFrameStepTimes();

  assert.equal(runtime.isPlaying, false);

  runtime.setCurrentReplayTime(frameTimes[0]);
  const didStep = runtime.stepReplayFrame(1);

  assert.equal(runtime.isPlaying, false);
  assert.equal(didStep, true);
  assertNear(runtime.getCurrentReplayTime(), frameTimes[1]);

  runtime.setPlaying(true);

  assert.equal(runtime.isPlaying, true);
});

test("causal delay feedback path trails use one pure-color stroke", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const pathLines = [];
  runtime.drawSmoothLine = (_ctx, _points, color, width) => {
    pathLines.push({ color, width });
  };

  runtime.drawPathTrail({}, "positrino", { r: 255, g: 0, b: 0, a: 1 });
  runtime.drawPathTrail({}, "electrino", { r: 0, g: 0, b: 255, a: 1 });

  assert.deepEqual(pathLines, [
    { color: { r: 255, g: 0, b: 0, a: 1 }, width: 5 },
    { color: { r: 0, g: 0, b: 255, a: 1 }, width: 5 },
  ]);
});

test("causal delay feedback edited path trails render as continuous curve strokes", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const context = createPathRecordingContext();
  const anchor = runtime.dataset.paths.positrino[90];

  runtime.applyPathLineDrag("positrino", anchor.t, { x: 48, y: -72 });
  runtime.drawPathTrail(context, "positrino", { r: 255, g: 0, b: 0, a: 1 });

  const commandTypes = context.commands.map((command) => command.type);
  assert(commandTypes.includes("bezierCurveTo"));
  assert.equal(commandTypes.includes("lineTo"), false);
  assert.equal(commandTypes.includes("quadraticCurveTo"), false);
});

test("causal delay feedback edited path uses one C1 spline for rendering and evaluation", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const path = runtime.dataset.paths.positrino;
  const anchor = path[90];

  runtime.applyPathLineDrag("positrino", anchor.t, { x: 42, y: -64 });

  assert.equal(path.interpolationMode, C1_CUBIC_HERMITE_INTERPOLATION);
  const knotIndex = 90;
  const incoming = getC1TimedPathBezierSegment(path, knotIndex - 1);
  const outgoing = getC1TimedPathBezierSegment(path, knotIndex);
  const incomingDerivative = {
    x: 3 * (incoming.end.x - incoming.controlEnd.x) / incoming.timeSpan,
    y: 3 * (incoming.end.y - incoming.controlEnd.y) / incoming.timeSpan,
  };
  const outgoingDerivative = {
    x: 3 * (outgoing.controlStart.x - outgoing.start.x) / outgoing.timeSpan,
    y: 3 * (outgoing.controlStart.y - outgoing.start.y) / outgoing.timeSpan,
  };
  assertNear(incomingDerivative.x, outgoingDerivative.x, 1e-7);
  assertNear(incomingDerivative.y, outgoingDerivative.y, 1e-7);

  const sampleTime = (path[knotIndex].t + path[knotIndex + 1].t) * 0.5;
  assert.deepEqual(
    runtime.getReplayPathPoint("positrino", sampleTime),
    sampleTimedPath(path, sampleTime),
  );
  const link = runtime.getVisibleWakeSeries(0.7).find(
    (candidate) => candidate.sourceKind === "positrino",
  );
  assert.deepEqual(
    link.source,
    sampleTimedPath(path, link.emissionTime),
  );
});

test("causal delay feedback path trail smoothing uses Catmull-Rom cubic interpolation", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const context = createPathRecordingContext();
  const tip = { x: 128, y: 72 };
  const end = { x: 0, y: 144 };

  runtime.drawSmoothLine(
    context,
    [
      { x: 0, y: 0 },
      tip,
      end,
    ],
    { r: 0, g: 0, b: 255, a: 1 },
    5,
  );

  const curveCommands = context.commands.filter((command) => command.type === "bezierCurveTo");

  assert.equal(curveCommands.length, 2);
  assert.equal(context.commands.some((command) => command.type === "quadraticCurveTo"), false);
  assertNear(curveCommands[0].x, tip.x, 1e-9);
  assertNear(curveCommands[0].y, tip.y, 1e-9);
  assertNear(curveCommands[1].x, end.x, 1e-9);
  assertNear(curveCommands[1].y, end.y, 1e-9);
  assert.notEqual(curveCommands[0].controlStartX, curveCommands[0].controlEndX);
  assert.notEqual(curveCommands[0].controlStartY, curveCommands[0].controlEndY);
});

test("causal delay feedback Catmull-Rom path uses centripetal parameter spacing", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });

  assertNear(
    runtime.getCentripetalCatmullRomParameterDistance({ x: 0, y: 0 }, { x: 16, y: 0 }),
    4,
  );
  assertNear(
    runtime.getCentripetalCatmullRomParameterDistance({ x: 0, y: 0 }, { x: 0, y: 9 }),
    3,
  );
});

test("causal delay feedback background depth field remains an internal render option", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = {};
  let renderCount = 0;
  runtime.context = {};
  runtime.render = () => {
    renderCount += 1;
  };

  runtime.setBackgroundDepthFieldEnabled(true);

  assert.equal(renderCount, 1);
  assert.equal(runtime.replayRequestOptions.backgroundDepthFieldEnabled, undefined);

  let fieldRenderCount = 0;
  const context = {
    fillRect() {},
  };
  runtime.drawLine = () => {};
  runtime.drawTriangle = () => {};
  runtime.drawText = () => {};
  runtime.drawBackgroundDepthField = () => {
    fieldRenderCount += 1;
  };

  runtime.setBackgroundDepthFieldEnabled(false);
  runtime.drawBackground(context);
  runtime.setBackgroundDepthFieldEnabled(true);
  runtime.drawBackground(context);

  assert.equal(fieldRenderCount, 1);
});

test("causal delay feedback weak contribution cue always fades below-threshold wakes", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dataset.assemblyThreshold = 1;
  const link = runtime.dataset.wakeLinks[0];
  const visualWeight = runtime.getWakeVisualWeight(link);

  assert.equal(runtime.getWakeThresholdState(link), "below_threshold");
  assert(visualWeight.alphaScale < 1);
  assert(visualWeight.radiusScale < 1);
  assert(visualWeight.desaturation > 0);
});

test("causal delay feedback weak contribution cue affects live above-threshold wakes", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const link = runtime.getVisibleWakeSeries(0.25)[0];
  const visualWeight = runtime.getWakeVisualWeight(link);

  assert.equal(runtime.getWakeThresholdState(link), "above_threshold");
  assert(visualWeight.alphaScale < 1);
  assert(visualWeight.radiusScale < 1);
  assert(visualWeight.desaturation > 0);
});

test("causal delay feedback aggregate summary excludes rejected solver links", () => {
  const { runtime, readout } = createRuntimeForReadout();
  const rejectedLink = runtime.dataset.wakeLinks[0];
  Object.assign(rejectedLink, {
    solverRunId: "causal-delay-feedback-rejected-red1-blue2-delayed-hit",
    rootCount: 0,
    solverHitCount: 0,
  });
  const summary = runtime.getContributionSummary(0.5);

  runtime.updateReadout(runtime.createContributionSummaryHit(0.5));
  const readoutText = readout.children.map((child) => child.textContent);

  assert.equal(summary.linkCount, 2);
  assert.equal(summary.activeLinkCount, 2);
  assert.equal(summary.receivedCount, 2);
  assert.equal(summary.inFlightCount, 0);
  assert.equal(summary.pendingCount, 0);
  assert.equal(summary.rejectedCount, 0);
  assert.equal(summary.strongestContributionLabel, "positrino wake -> electrino now");
  assert(summary.strongestContribution > 0);
  assert.equal(summary.strongestContributionMagnitude, Math.abs(summary.strongestContribution));
  assert.deepEqual(summary.invalidReasonCounts, {});
  assert.equal(readout.children[2].textContent, "received=2/2");
  assert(readoutText.some((text) => text.startsWith("strongest=positrino_wake_->_electrino_now:")));
  assert.equal(readoutText.includes("rejected=1"), false);
});

test("causal delay feedback wake-front separation is locked to the smaller gap", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const secondRuntime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const replayTime = 0.25;
  const link = runtime.getVisibleWakeSeries(replayTime)[0];
  const secondLink = secondRuntime.getVisibleWakeSeries(replayTime)[0];
  const timing = runtime.getWakeTiming(link, replayTime);
  const secondTiming = secondRuntime.getWakeTiming(secondLink, replayTime);
  const frontDistances = getWakeFrontDistances(runtime, timing, link);
  const secondFrontDistances = getWakeFrontDistances(secondRuntime, secondTiming, secondLink);
  const shortTiming = {
    liveWakeSeries: true,
    source: { x: 0, y: 0 },
    receiver: { x: 72, y: 0 },
  };
  const longTiming = {
    liveWakeSeries: true,
    source: { x: 0, y: 0 },
    receiver: { x: 180, y: 0 },
  };
  const shortFronts = runtime.getWakeFrontProgresses(shortTiming);
  const longFronts = runtime.getWakeFrontProgresses(longTiming);

  const spacing = assertConstantWakeFrontSeparation(frontDistances, getTimingDistance(timing, link));
  assertNear(spacing, 9, 1e-6);
  assertNear(
    assertConstantWakeFrontSeparation(secondFrontDistances, getTimingDistance(secondTiming, secondLink)),
    spacing,
    1e-6,
  );
  assert(longFronts.length > shortFronts.length);

  runtime.setWakeVisualSwitch("wideWakeFrontGapEnabled", true);
  const staleGapSpacing = assertConstantWakeFrontSeparation(
    getWakeFrontDistances(runtime, timing, link),
    getTimingDistance(timing, link),
  );
  assertNear(staleGapSpacing, spacing, 1e-6);
});

test("causal delay feedback wake visual switches derive combinable rendering settings", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const sphere = runtime.getCausalIsochronSpheres("positrino", 0.82)[0];
  const normalStyle = runtime.getWakeVisualStyle();
  const normalSphereWeight = runtime.getCausalIsochronSphereVisualWeight(sphere);

  runtime.setWakeVisualSwitch("fullCircularWakesEnabled", true);
  const combinedStyle = runtime.getWakeVisualStyle();
  const combinedSphereWeight = runtime.getCausalIsochronSphereVisualWeight(sphere);

  assert.equal(normalStyle.falloffPower, 1);
  assert.equal(normalStyle.finalSpan, 7);
  assert.equal(normalStyle.startSpan, 7);
  assert.equal(normalStyle.dotRadius, 1.35);
  assert.equal(normalStyle.alphaScale, 0.86);
  assert.deepEqual(combinedStyle, normalStyle);
  assert.equal(runtime.getWakeVisualModeLabel(), "full circles + emission lines");
  assert.equal(combinedSphereWeight, normalSphereWeight);
});

test("causal delay feedback live wake series back-solves one emission point per architrino", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const replayTime = 0.5;
  const series = runtime.getVisibleWakeSeries(replayTime);

  assert.equal(series.length, 2);
  assert.deepEqual(series.map((link) => link.id), [
    "live-positrino-to-electrino",
    "live-electrino-to-positrino",
  ]);
  series.forEach((link) => {
    const timing = runtime.getWakeTiming(link, replayTime);
    const distance = link.distance;
    const causalDistance = link.signalSpeed * link.travelTime;

    assert(link.source.t < replayTime);
    assert.equal(link.receiver.t, replayTime);
    assertNear(distance, causalDistance, 1e-3);
    assert.equal(timing.liveWakeSeries, true);
    assert.equal(timing.progress, 1);
    assertConstantWakeFrontSeparation(getWakeFrontDistances(runtime, timing, link), distance);
  });
});

test("causal delay feedback mock paths span five to ninety-five percent of the time axis", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });

  ["positrino", "electrino"].forEach((kind) => {
    const points = runtime.dataset.paths[kind];
    const startHistory = runtime.dataset.history[kind].find((point) => point.depth === 1);
    assert.equal(points.length, FRAME_COUNT);
    assertNear(points[0].x, PATH_TIME_START_X);
    assertNear(points.at(-1).x, PATH_TIME_END_X);
    assertNear(startHistory.x, PATH_TIME_START_X);
  });
});

test("causal delay feedback mock initial motion state spans retained path endpoints", () => {
  const dataset = createMockCausalDelayReplayDataset("accepted_tight_bright");
  const runDuration = dataset.initialConditions.runDuration;

  ["positrino", "electrino"].forEach((kind) => {
    const condition = dataset.initialConditions[kind];
    const pathEnd = dataset.paths[kind].at(-1);

    assert.notEqual(condition.ax, 0);
    assert.notEqual(condition.ay, 0);
    assertNear(condition.x + condition.vx * runDuration + 0.5 * condition.ax * runDuration * runDuration, pathEnd.x);
    assertNear(condition.y + condition.vy * runDuration + 0.5 * condition.ay * runDuration * runDuration, pathEnd.y);
  });
});

test("causal delay feedback aggregate summary omits retained-link invalid root reasons", () => {
  const { runtime, readout } = createRuntimeForReadout();
  runtime.applyReplayDataset(createMockCausalDelayReplayDataset("contrast_stress"), { loadState: "ready" });

  const summary = runtime.getContributionSummary(0.5);
  runtime.updateReadout(runtime.createContributionSummaryHit(0.5));
  const readoutText = readout.children.map((child) => child.textContent);

  assert.equal(summary.linkCount, 2);
  assert.equal(summary.activeLinkCount, 2);
  assert.equal(summary.inactiveCount, 0);
  assert.equal(summary.staleCount, 0);
  assert.equal(summary.rejectedCount, 0);
  assert.deepEqual(summary.invalidReasonCounts, {});
  assert.equal(readoutText.includes("inactive=1"), false);
  assert.equal(readoutText.includes("stale=1"), false);
  assert.equal(readoutText.includes("rejected=1"), false);
  assert.equal(readoutText.some((text) => text.startsWith("why=inactive:")), false);
});

test("causal delay feedback aggregate summary omits solver constraint telemetry details", () => {
  const { runtime, readout } = createRuntimeForReadout();
  runtime.dataset = createMockEomReplayDataset("partial_arcs", {
    // Stale solver-run constraint telemetry (from the retired bridge era) must
    // no longer surface as readout diagnostics; the viewer draws recorded data
    // only.
    maxPathConstraintResidual: 0.004,
    pathConstraintFrameRefinementSampleCount: 15,
    pathConstraintGuidanceSampleCount: 12,
    pathConstraintGuidanceMode: "retained_knot_boundary",
    pathConstraintBoundaryRelaxationMode: "finite_difference_frame_relaxation_v1",
    pathConstraintBoundaryRelaxationIterationCount: 8,
    pathConstraintBoundaryRelaxationStatus: "converged",
    pathConstraintSolverStatus: "discrete_boundary_value_converged",
    pathConstraintSolverClaim: "finite_difference_pair_boundary_value_solve_converged",
    maxPathConstraintGuidanceAcceleration: 48.25,
  });

  runtime.updateReadout(runtime.createContributionSummaryHit(0.5));
  const readoutText = readout.children.map((child) => child.textContent);

  assert.deepEqual(runtime.createContributionSummarySolverDetails(), []);
  assert.equal(readout.children[0].textContent, "feedback sum");
  assert.equal(readoutText.includes("refined=15"), false);
  assert.equal(readoutText.includes("guide=retained_knot_boundary"), false);
  assert.equal(readoutText.includes("guideRows=12"), false);
  assert.equal(readoutText.includes("maxA=48.25"), false);
  assert.equal(readoutText.includes("solverResid=0.004"), false);
  assert.equal(readoutText.some((text) => text.startsWith("relax")), false);
  assert.equal(readoutText.some((text) => text.startsWith("constraint=")), false);
  assert.equal(readoutText.some((text) => text.startsWith("claim=")), false);
});

test("causal delay feedback uses one fixed learner display with no settings surface", () => {
  const html = readCausalDelayFeedbackHtml();

  assert.equal(FIXED_CANVAS_COLOR, "#4b0082");
  assert.equal(FIXED_WAKE_VISUAL_STYLE.wakeArcDisplayMode, "partial_propagating_arcs");
  assert.doesNotMatch(html, /causal-delay-feedback-settings/u);
  assert.doesNotMatch(html, /causal-settings/u);
  assert.doesNotMatch(html, /Canvas settings|Animation speed|Architrino speed|Reset preset/u);
  assert.doesNotMatch(html, /causal-delay-feedback-(?:color-swatches|cf-speed|architrino-speed|reset-preset)/u);
});

test("causal delay feedback legend lozenges use the fixed canvas and trace colors", () => {
  const html = readCausalDelayFeedbackHtml();
  assert.equal(html.includes("background: var(--causal-selected-canvas-color, #4b0082);"), true);
  assert.match(html, /\.causal-legend-line\s*\{[^}]*height: 22px;/);
  assert.match(html, /\.causal-legend-line::before,\s*\.causal-legend-line::after\s*\{[^}]*height: 5px;/);
  assert.equal(html.includes("border-radius: 999px;"), true);
  assert.equal(html.includes("background: var(--causal-positrino-color, #ff0000);"), true);
  assert.equal(html.includes("background: var(--causal-electrino-color, #0000ff);"), true);
  assert.match(html, /\.causal-legend-dots\s*\{[^}]*height: 18px;/);
  assert.match(html, /\.causal-legend-dots i\s*\{[^}]*width: 3px;[^}]*height: 3px;/);
  assert.match(html, /\.causal-legend-dots i:nth-child\(3\)\s*\{[^}]*top: 5px;/);

});

test("causal delay feedback bottom scrubber uses a dedicated purple transport theme", () => {
  const html = readCausalDelayFeedbackHtml();
  const themeStart = html.indexOf(".causal-timeline-range {");
  const themeEnd = html.indexOf(".causal-readout {", themeStart);
  const timelineTheme = html.slice(themeStart, themeEnd);

  assert(themeStart > 0);
  assert(themeEnd > themeStart);
  assert.match(html, /id="causal-delay-feedback-now"[\s\S]*?class="causal-range causal-timeline-range"/u);
  assert.match(timelineTheme, /\.causal-timeline-range::-webkit-slider-runnable-track/u);
  assert.match(timelineTheme, /\.causal-timeline-range::-webkit-slider-thumb/u);
  assert.match(timelineTheme, /\.causal-timeline-range::-moz-range-track/u);
  assert.match(timelineTheme, /\.causal-timeline-range::-moz-range-thumb/u);
  assert.match(timelineTheme, /\.causal-timeline-range:focus-visible/u);
  assert.match(timelineTheme, /accent-color: #8b4fbf/u);
  assert.match(
    timelineTheme,
    /\.causal-timeline-range::-webkit-slider-runnable-track[\s\S]*?background: #7a36aa/u,
  );
  assert.match(
    timelineTheme,
    /\.causal-timeline-range::-webkit-slider-thumb[\s\S]*?background: #8b4fbf/u,
  );
  assert.match(
    timelineTheme,
    /\.causal-timeline-range::-moz-range-track[\s\S]*?background: #7a36aa/u,
  );
  assert.match(
    timelineTheme,
    /\.causal-timeline-range::-moz-range-thumb[\s\S]*?background: #8b4fbf/u,
  );
  assert.match(timelineTheme, /border-color: rgba\(246, 247, 255, 0\.94\)/u);
  assert.match(timelineTheme, /rgba\(225, 205, 255, 0\.96\)/u);
  assert.doesNotMatch(timelineTheme, /#(?:ff0000|0000ff|ff96a6|96aaff|4ae5ff)/iu);
});

test("causal delay feedback toolbar exposes independent wake visual switches", () => {
  const html = readCausalDelayFeedbackHtml();

  assert.equal(html.includes("right: max(20px, env(safe-area-inset-right));"), true);
  assert.equal(html.includes("max-width: calc(100vw - 40px);"), false);
  assert.equal(
    html.includes("grid-template-columns: auto auto auto minmax(0, 1fr);"),
    true,
  );
  assert.equal(html.includes("grid-template-columns: minmax(320px, 1fr) 48px;"), false);
  assert.equal(html.includes("grid-template-columns: minmax(118px, 18vw) 48px;"), false);
  assert.equal(html.includes('id="causal-delay-feedback-visual-switches"'), true);
  [
    "arcWakesEnabled",
    "fullCircularWakesEnabled",
  ].forEach((switchId) => {
    assert.equal(html.includes(`data-visual-switch="${switchId}"`), true);
  });
  assert.equal(html.includes(">Arcs</button>"), true);
  assert.equal(html.includes(">Full</button>"), true);
  assert.equal(html.includes('data-visual-switch="strongFalloffEnabled"'), false);
  assert.equal(html.includes(">Strong</button>"), false);
  assert.equal(html.includes('data-visual-switch="wideArcsEnabled"'), false);
  assert.equal(html.includes(">Wide</button>"), false);
  assert.equal(html.includes('data-visual-switch="thinFrontsEnabled"'), false);
  assert.equal(html.includes(">Thin</button>"), false);
  assert.equal(html.includes('data-visual-switch="brightFrontsEnabled"'), false);
  assert.equal(html.includes(">Bright</button>"), false);
  assert.equal(html.includes('data-visual-switch="wideWakeFrontGapEnabled"'), false);
  assert.equal(html.includes(">Gap+</button>"), false);
});

test("causal delay feedback bottom rail keeps timeline-only transport before the scrubber", () => {
  const html = readCausalDelayFeedbackHtml();
  const firstIndex = html.indexOf('id="causal-delay-feedback-guided-first-frame"');
  const playIndex = html.indexOf('id="causal-delay-feedback-guided-play"');
  const lastIndex = html.indexOf('id="causal-delay-feedback-guided-last-frame"');
  const scrubIndex = html.indexOf('id="causal-delay-feedback-now"');
  const replayStatusIndex = html.indexOf('id="causal-delay-feedback-replay-status"');

  assert(firstIndex > 0);
  assert(playIndex > firstIndex);
  assert(lastIndex > playIndex);
  assert(scrubIndex > lastIndex);
  assert(replayStatusIndex > scrubIndex);
  assert.match(html.slice(playIndex, lastIndex), /aria-label="Play"/);
  assert.doesNotMatch(html, /id="causal-delay-feedback-pause"/);
  assert.doesNotMatch(
    html.slice(
      html.indexOf('id="causal-delay-feedback-bottom-rail"'),
      replayStatusIndex,
    ),
    />Back<|>Next</u,
  );
  assert.doesNotMatch(html, /id="causal-delay-feedback-now-value"/u);
  assert.match(html.slice(replayStatusIndex, replayStatusIndex + 180), /hidden/);
});

test("causal delay feedback shares one time-axis label position above the axis", () => {
  assert.equal(TIME_AXIS_LABEL_POSITION.x, TIME_AXIS_END_X - 22);
  assert.equal(TIME_AXIS_LABEL_POSITION.y, TIME_AXIS_BASELINE_Y - 24);
  assert.ok(TIME_AXIS_LABEL_POSITION.y < TIME_AXIS_BASELINE_Y);
  const source = readFileSync(
    new URL(
      "../src/apps/causal-delay-feedback/CausalDelayFeedbackRuntime.js",
      import.meta.url,
    ),
    "utf8",
  );
  assert.match(source, /"time",\s*TIME_AXIS_LABEL_POSITION/u);
});

test("causal delay feedback aligns the bottom rail to the transformed time axis", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.canvasWidth = 1000;
  runtime.viewport = {
    scale: 0.5,
    offsetX: 10,
    offsetY: 20,
  };
  runtime.dom = {
    bottomRail: new FakeElement(),
  };

  const bounds = runtime.alignBottomRailToTimeAxis();

  assert.equal(bounds.left, TIME_AXIS_ORIGIN_X * 0.5 + 10);
  assert.equal(
    bounds.right,
    TIME_AXIS_END_X * 0.5 + 10 - TIMELINE_RAIL_AXIS_SAFE_INSET,
  );
  assert.equal(runtime.dom.bottomRail.style.left, "56.00px");
  assert.equal(runtime.dom.bottomRail.style.right, "87.00px");
  assert.equal(runtime.dom.bottomRail.dataset.axisAlignedBounds, "56.00,913.00");
});

test("causal delay feedback Laboratory omits the redundant polarity legend and readout lozenge", () => {
  const html = readCausalDelayFeedbackHtml();
  const toolbarIndex = html.indexOf('class="causal-toolbar"');
  const replayStatusIndex = html.indexOf('id="causal-delay-feedback-replay-status"');

  assert(toolbarIndex > 0);
  assert(replayStatusIndex > toolbarIndex);
  assert.doesNotMatch(html, /red Positrino above · blue Electrino below/u);
  assert.doesNotMatch(html, /class="causal-legend"/u);
  assert.match(
    html,
    /id="causal-delay-feedback-readout" class="causal-readout" aria-hidden="true" hidden/u,
  );
});

test("causal delay feedback does not render a floating hover overlay", () => {
  const html = readCausalDelayFeedbackHtml();

  assert.equal(html.includes("causal-delay-feedback-hover-label"), false);
  assert.equal(html.includes("causal-hover-label"), false);
});

test("causal delay feedback retained depth setting filters history while live wake count stays continuous", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const hiddenPoint = runtime.dataset.history.positrino.find((point) => point.depth === 5);

  runtime.setRetainedDepthLimit(4);
  const hiddenHit = runtime.findNearestHit(runtime.worldToScreen(hiddenPoint), { includeWakes: true });
  const summary = runtime.getContributionSummary(1);

  assert.equal(runtime.retainedDepthLimit, 4);
  assert.deepEqual(runtime.getVisibleHistory("positrino").map((point) => point.depth), [1, 2, 3, 4, 6]);
  assert.deepEqual(runtime.getVisibleHistory("electrino").map((point) => point.depth), [1, 2, 3, 4, 6]);
  assert.equal(runtime.getVisibleWakeLinks().length, 6);
  assert.equal(runtime.getVisibleWakeSeries(1).length, 2);
  assert.equal(runtime.dataset.wakeLinks.length, 10);
  assert.equal(summary.linkCount, 2);
  assert.equal(hiddenHit, null);
  assert.equal(runtime.replayRequestOptions.retainedDepthLimit, 4);
});

test("causal delay feedback retained depth setting clears hidden selected rows", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.selectedItem = { type: "wake", linkId: "positrino-3-to-electrino-4" };

  runtime.setRetainedDepthLimit(2);

  assert.equal(runtime.selectedItem, null);
});

test("causal delay feedback learner surface omits retained point controls", () => {
  const html = readCausalDelayFeedbackHtml();

  assert.equal(html.includes('id="causal-delay-feedback-history-depth"'), false);
  assert.equal(html.includes("Retained points"), false);
  assert.equal(html.includes("causal-depth-button"), false);
});

test("Story 1 uses the shared eighty-percent wake-display rate", () => {
  const scheduledFrames = [];
  const replayTimes = [];
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: {
      ...fakeWindow,
      requestAnimationFrame(callback) {
        scheduledFrames.push(callback);
        return scheduledFrames.length;
      },
    },
    initialMode: "story",
  });
  runtime.render = (replayTime) => replayTimes.push(replayTime);
  runtime.lastFrameTime = 0;
  runtime.setPlaying(true);
  runtime.tick(0);

  for (let index = 1; index <= 470; index += 1) {
    runtime.tick(index * 60);
  }

  const expectedStart = Math.max(
    runtime.learnerState.paths.positrino[0].t,
    runtime.learnerState.paths.electrino[0].t,
  );
  const expectedEnd = Math.min(
    runtime.learnerState.paths.positrino.at(-1).t,
    runtime.learnerState.paths.electrino.at(-1).t,
  );
  assert.equal(runtime.isPlaying, false);
  assert.ok(replayTimes.length > 460);
  assert.equal(replayTimes[0], expectedStart);
  assert.equal(replayTimes.at(-1), expectedEnd);
  const positiveSteps = replayTimes.slice(1).map(
    (replayTime, index) => replayTime - replayTimes[index],
  ).filter((step) => step > 0);
  assert.ok(positiveSteps.length > 455);
  assert.ok(Math.max(...positiveSteps) < (expectedEnd - expectedStart) * 0.03);
  assert.ok(scheduledFrames.length > 0);
});

test("Story 2 starts with both arcs and reaches the fifty-percent time-axis handoff", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: {
      ...fakeWindow,
      requestAnimationFrame() {
        return 1;
      },
    },
    initialMode: "story",
  });
  runtime.learnerState.storyStep = 1;
  runtime.render = () => {};
  runtime.lastFrameTime = 0;
  runtime.setPlaying(true);
  runtime.tick(0);

  for (let index = 1; index <= 300; index += 1) {
    runtime.tick(index * 60);
  }

  const scene = runtime.storyHeldFrame.scene;
  const expectedHoldTime = scene.playbackEndTime;
  assert.equal(runtime.isPlaying, false);
  assert.equal(scene.id, "emission");
  assertNear(runtime.storyHeldFrame.replayTime, expectedHoldTime);
  assertNear(
    runtime.storyStageElapsedSeconds,
    scene.playbackDurationSeconds,
    0.02,
  );
  assertNear(scene.pausePathProgress, 0.5);
  assert.equal(runtime.getStoryVisibleWakeSeries(scene.playbackStartTime).length, 2);
  assert.equal(runtime.learnerState.playback.completed, true);

  assert.equal(runtime.setPlaying(true), false);
  assert.equal(runtime.storyHeldFrame.scene.id, "emission");
  assertNear(runtime.storyHeldFrame.replayTime, expectedHoldTime);

  runtime.setPlaying(true, { restartStory: true });
  assert.equal(runtime.storyHeldFrame, null);
  assert.equal(runtime.storyPlaybackScene.id, "emission");
  assert.equal(runtime.storyStageElapsedSeconds, 0);
});

test("Story 1 renders only circles while Story 2 reuses the Sandbox partial-front primitive", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    initialMode: "story",
  });
  runtime.dom = { canvas: { dataset: {} } };
  runtime.drawGuidedLiveMarkers = () => {};
  runtime.drawStoryLiveMarkers = () => {};
  runtime.drawTransmissionGhost = () => {};
  const transientRings = [];
  runtime.drawCircle = (...args) => transientRings.push(args);
  const circles = [];
  const arcs = [];
  const origins = [];
  const sandboxProgressions = [];
  runtime.drawSolidWakeCircle = (_ctx, center, radius) => {
    circles.push({ center, radius });
  };
  runtime.drawDottedArc = (_ctx, center, radius, start, end) => {
    arcs.push({ center, radius, start, end });
  };
  runtime.drawWakeProgression = (_ctx, link, replayTime) => {
    sandboxProgressions.push({ link, replayTime });
  };
  runtime.drawStoryEmissionOriginMarker = (_ctx, center) => {
    origins.push(center);
  };

  runtime.setPlaying(true);
  runtime.drawStoryScene({}, 0.35);

  assert(circles.length > 0);
  assert.equal(arcs.length, 0);
  assert.equal(origins.length, circles.length);
  assert.equal(runtime.dom.canvas.dataset.storyWakeGuideArcCount, "0");
  assert.equal(
    runtime.dom.canvas.dataset.storyEmissionOriginMarkerCount,
    String(origins.length),
  );
  runtime.drawStoryScene({}, runtime.learnerState.receiverTime);
  assert.equal(transientRings.length, 0);

  runtime.setPlaying(false);
  runtime.learnerState.storyStep = 1;
  circles.length = 0;
  arcs.length = 0;
  origins.length = 0;
  sandboxProgressions.length = 0;
  runtime.setPlaying(true);
  runtime.drawStoryScene({}, 0.35);

  assert.equal(circles.length, 0);
  assert.equal(arcs.length, 0);
  assert.equal(sandboxProgressions.length, 2);
  assert(origins.length > 0);
  assert.equal(runtime.dom.canvas.dataset.storyWakeCircleCount, "0");
  assert.equal(runtime.dom.canvas.dataset.storyLiveWakeSeriesCount, "2");
  assert.equal(runtime.dom.canvas.dataset.storyLiveWakeMaxEndpointError, "0.000000000");
  assert(Number(runtime.dom.canvas.dataset.storyWakeGuideArcCount) > 2);
  assert.equal(
    runtime.dom.canvas.dataset.storyEmissionOriginMarkerCount,
    String(origins.length),
  );
  sandboxProgressions.forEach(({ link, replayTime }) => {
    assert.equal(replayTime, 0.35);
    assert.ok(origins.some(
      (center) => center.x === link.source.x && center.y === link.source.y,
    ));
    assert.deepEqual(
      link.receiver,
      runtime.getStoryPathPoint(link.receiverKind, replayTime),
    );
    assert(Math.abs(link.rootResidual) < 1e-5);
  });

  origins.length = 0;
  sandboxProgressions.length = 0;
  runtime.drawStoryScene({}, 0.4);
  assert.equal(sandboxProgressions.length, 2);
  sandboxProgressions.forEach(({ link, replayTime }) => {
    assert.equal(replayTime, 0.4);
    assert.ok(origins.some(
      (center) => center.x === link.source.x && center.y === link.source.y,
    ));
  });
});

test("transmission-point markers retain the internal open-ring baseline and use the solid-dot standard", () => {
  const trialRuntime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    initialMode: "story",
  });
  const baselineRuntime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    initialMode: "story",
    transmissionPointMarkerVariant:
      TRANSMISSION_POINT_MARKER_VARIANTS.OPEN_RING_BASELINE,
  });
  const queryRuntime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: {
      ...fakeWindow,
      location: {
        href:
          "http://localhost/causal-delay-feedback.html" +
          "?transmissionMarker=open-ring-baseline",
      },
    },
    initialMode: "story",
  });
  const trialCalls = [];
  const baselineCalls = [];
  trialRuntime.drawCircle = (...args) => trialCalls.push(args);
  baselineRuntime.drawCircle = (...args) => baselineCalls.push(args);

  trialRuntime.drawTransmissionPointMarker({}, { x: 0.4, y: 0.2 });
  baselineRuntime.drawTransmissionPointMarker({}, { x: 0.4, y: 0.2 });

  const trialStyle =
      TRANSMISSION_POINT_MARKER_STYLES[
      TRANSMISSION_POINT_MARKER_VARIANTS.SOLID_DOT_STANDARD
    ];
  const baselineStyle =
    TRANSMISSION_POINT_MARKER_STYLES[
      TRANSMISSION_POINT_MARKER_VARIANTS.OPEN_RING_BASELINE
    ];
  assert.equal(
    trialRuntime.transmissionPointMarkerVariant,
    DEFAULT_TRANSMISSION_POINT_MARKER_VARIANT,
  );
  assert.equal(
    baselineRuntime.transmissionPointMarkerVariant,
    TRANSMISSION_POINT_MARKER_VARIANTS.OPEN_RING_BASELINE,
  );
  assert.equal(
    queryRuntime.transmissionPointMarkerVariant,
    TRANSMISSION_POINT_MARKER_VARIANTS.SOLID_DOT_STANDARD,
  );
  assert.equal(trialCalls.length, 1);
  assert.equal(trialCalls[0][2], trialStyle.radius);
  assert.equal(trialCalls[0][4], undefined);
  assert.equal(trialStyle.radius * 2 < CAUSAL_PATH_STROKE_WIDTH, true);
  assert.equal(baselineCalls.length, 1);
  assert.equal(
    baselineCalls[0][2],
    Math.max(
      baselineStyle.minimumRadius,
      baselineStyle.radius * baselineRuntime.viewport.scale,
    ),
  );
  assert.ok(baselineCalls[0][4]);
  assert.equal(baselineCalls[0][5], baselineStyle.outlineWidth);
});

test("Story and guided-mode transmission markers share the selected marker renderer", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    initialMode: "story",
  });
  const calls = [];
  runtime.drawTransmissionPointMarker = (_ctx, point) => calls.push(point);
  const storyPoint = { x: 0.25, y: 0.3 };
  const guidedPoint = { x: 0.65, y: 0.7 };

  runtime.drawStoryEmissionOriginMarker({}, storyPoint);
  runtime.drawTransmissionGhost({}, guidedPoint, "electrino");

  assert.deepEqual(calls, [storyPoint, guidedPoint]);
});

test("transmission-history dots use pale source colors while current-emission dots stay neutral", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    initialMode: "story",
  });
  const circles = [];
  runtime.drawCircle = (_ctx, point, radius, fill, outline, outlineWidth) => {
    circles.push({ point, radius, fill, outline, outlineWidth });
  };

  runtime.drawTransmissionGhost({}, { x: 0.2, y: 0.3 }, "positrino");
  runtime.drawTransmissionGhost({}, { x: 0.4, y: 0.5 }, "electrino");
  runtime.drawStoryEmissionOriginMarker({}, { x: 0.6, y: 0.7 });

  assert.equal(circles.length, 3);
  assert.deepEqual(circles[0].fill, { ...POSITRINO_WAKE, a: 0.92 });
  assert.deepEqual(circles[1].fill, { ...ELECTRINO_WAKE, a: 0.92 });
  assert.deepEqual(circles[2].fill, { r: 246, g: 247, b: 255, a: 0.92 });
  assert(circles.every(({ outline }) => outline === undefined));
});

test("Story 2 trails stay receiver-centered on the shared time-axis mapping", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    initialMode: "story",
  });
  const frameSignatures = [];

  const replayTimes = Array.from({ length: 23 }, (_unused, index) => 0.25 + index * 0.025);
  for (const replayTime of replayTimes) {
    const links = runtime.getStoryVisibleWakeSeries(replayTime);
    assert.equal(links.length, 2);
    const frame = {};
    for (const link of links) {
      const arcs = [];
      runtime.drawDottedArc = (_ctx, center, radius, startDegrees, endDegrees) => {
        arcs.push({ center, radius, startDegrees, endDegrees });
      };
      runtime.drawWakeProgression({}, link, replayTime);
      assert(arcs.length > 4);
      const outerArc = arcs.reduce(
        (outer, arc) => arc.radius > outer.radius ? arc : outer,
      );
      const midpointAngle =
        ((outerArc.startDegrees + outerArc.endDegrees) * 0.5 * Math.PI) / 180;
      const outerMidpoint = {
        x: outerArc.center.x + outerArc.radius * Math.cos(midpointAngle),
        y: outerArc.center.y + outerArc.radius * Math.sin(midpointAngle),
      };
      assertNear(outerMidpoint.x, link.receiver.x, 1e-8);
      assertNear(outerMidpoint.y, link.receiver.y, 1e-8);
      assert.deepEqual(
        link.receiver,
        runtime.getStoryPathPoint(link.receiverKind, replayTime),
      );
      assert(Math.abs(link.rootResidual) < 1e-5);
      frame[link.sourceKind] = {
        sourceX: link.source.x,
        sourceY: link.source.y,
        receiverX: link.receiver.x,
        receiverY: link.receiver.y,
        arcCount: arcs.length,
      };
    }
    frameSignatures.push(frame);
  }

  for (const sourceKind of ["positrino", "electrino"]) {
    assert.notDeepEqual(
      frameSignatures[0][sourceKind],
      frameSignatures[11][sourceKind],
    );
    assert.notDeepEqual(
      frameSignatures[11][sourceKind],
      frameSignatures.at(-1)[sourceKind],
    );
  }
});

test("Story 2 shows only the two active arc-origin dots through the time-axis midpoint handoff", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    initialMode: "story",
  });
  runtime.dom = { canvas: { dataset: {} } };
  runtime.learnerState.storyStep = 1;
  runtime.setPlaying(true);
  runtime.drawWakeProgression = () => {};
  runtime.drawGuidedLiveMarkers = () => {};
  runtime.drawStoryLiveMarkers = () => {};
  runtime.drawCircle = () => {};
  runtime.drawSolidWakeCircle = () => {};
  const scene = runtime.storyPlaybackScene;

  for (const amount of [0, 0.25, 0.5, 0.75, 1]) {
    const replayTime =
      scene.playbackStartTime +
      (scene.playbackEndTime - scene.playbackStartTime) * amount;
    const expectedFronts = createStorySampledWakeFronts(
      runtime.learnerState,
      scene,
      replayTime,
    );
    const liveLinks = runtime.getStoryVisibleWakeSeries(replayTime);
    const markerCenters = [];
    runtime.drawStoryEmissionOriginMarker = (_ctx, center) => {
      markerCenters.push(center);
    };

    runtime.drawStoryScene({}, replayTime);

    assert.deepEqual(expectedFronts, []);
    assert.equal(liveLinks.length, 2);
    assert.equal(markerCenters.length, liveLinks.length);
    assert(Number(runtime.dom.canvas.dataset.storyEmissionMarkerMaxLeadTime) < 0);
    liveLinks.forEach((link) => {
      assert(link.emissionTime < replayTime);
      assert.ok(markerCenters.some(
        (center) =>
          Math.abs(center.x - link.source.x) < 1e-8 &&
          Math.abs(center.y - link.source.y) < 1e-8,
      ));
    });
  }
});

test("Story 2 terminal frame exactly hands off to Story 3 synthesis", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    initialMode: "story",
  });
  runtime.dom = { canvas: { dataset: {} } };
  runtime.learnerState.storyStep = 1;
  const storyTwoScene = createStoryScene(runtime.learnerState);
  runtime.learnerState.storyStep = 2;
  const scene = createStoryScene(runtime.learnerState);
  assert.equal(storyTwoScene.playbackEndTime, scene.playbackStartTime);
  const frames = [];
  let currentFrame = null;
  runtime.drawStoryEmissionOriginMarker = (_ctx, center) => {
    currentFrame.origins.push(center);
  };
  runtime.drawSolidWakeCircle = (_ctx, center, radius) => {
    currentFrame.circles.push({ center, radius });
  };
  runtime.drawWakeProgression = (_ctx, link, replayTime, options) => {
    currentFrame.progressions.push({ link, replayTime, options });
  };
  runtime.drawLiveMarker = (_ctx, kind, _color, point) => {
    currentFrame.bodies[String(kind).toLowerCase()] = point;
  };

  for (const progress of [0, 0.5, 1]) {
    const displayTime =
      scene.playbackStartTime +
      (scene.playbackEndTime - scene.playbackStartTime) * progress;
    currentFrame = {
      progress,
      displayTime,
      circles: [],
      progressions: [],
      origins: [],
      bodies: {},
    };
    runtime.drawStorySynthesisScene({}, scene, displayTime);
    frames.push(currentFrame);
  }

  assert.equal(frames[0].circles.length, 0);
  assert.equal(frames[0].progressions.length, 2);
  assert.equal(frames[0].origins.length, 2);
  assert.equal(frames[1].circles.length, 2);
  assert.equal(frames[2].circles.length, 2);
  assert.equal(runtime.dom.canvas.dataset.storyWakeCircleCount, "2");
  assert.equal(runtime.dom.canvas.dataset.storyLiveWakeSeriesCount, "2");
  assert.equal(runtime.dom.canvas.dataset.storySynthesisEndpointError, "0.000000000");
  assert.equal(
    runtime.dom.canvas.dataset.storySynthesisDisplayMapping,
    "continuous_reception_time_from_story_2_handoff",
  );
  frames.forEach((frame) => {
    frame.progressions.forEach(({ link, replayTime, options }, index) => {
      if (frame.progress > 0) {
        assert.deepEqual(frame.circles[index].center, link.source);
        assertNear(frame.circles[index].radius, link.distance);
      }
      assert.equal(replayTime, frame.displayTime);
      assert.equal(options, undefined);
    });
  });
  assert.notDeepEqual(frames[0].bodies, frames[1].bodies);
  assert.notDeepEqual(frames[1].bodies, frames[2].bodies);
  for (const kind of ["positrino", "electrino"]) {
    assert.deepEqual(
      frames[0].bodies[kind],
      runtime.getStoryPathPoint(kind, storyTwoScene.playbackEndTime),
    );
    assert.deepEqual(
      frames[2].bodies[kind],
      runtime.getStoryPathPoint(kind, scene.playbackEndTime),
    );
    assertNear(
      frames[0].bodies[kind].x,
      TIME_AXIS_ORIGIN_X + (TIME_AXIS_END_X - TIME_AXIS_ORIGIN_X) * 0.5,
      1e-8,
    );
    assertNear(
      frames[2].bodies[kind].x,
      TIME_AXIS_ORIGIN_X + (TIME_AXIS_END_X - TIME_AXIS_ORIGIN_X) * 0.8,
      1e-8,
    );
  }
  const storyTwoTerminalLinks = runtime.getStoryVisibleWakeSeries(
    storyTwoScene.playbackEndTime,
  );
  assert.deepEqual(
    frames[0].progressions.map(({ link, replayTime }) => ({
      source: link.source,
      receiver: link.receiver,
      replayTime,
    })),
    storyTwoTerminalLinks.map((link) => ({
      source: link.source,
      receiver: link.receiver,
      replayTime: storyTwoScene.playbackEndTime,
    })),
  );
});

test("Story 4 renders all declared speed fixtures from one evaluator-backed geometry", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    initialMode: "story",
  });
  runtime.dom = { canvas: { dataset: {} } };
  runtime.learnerState.storyStep = 3;
  const circles = [];
  const origins = [];
  const lines = [];
  const bodyCircles = [];
  const comparisonLabels = [];
  runtime.drawSolidWakeCircle = (_ctx, center, radius) => {
    circles.push({ center, radius });
  };
  runtime.drawStoryEmissionOriginMarker = (_ctx, center) => {
    origins.push(center);
  };
  runtime.drawLine = (_ctx, points, _color, width) => lines.push({ points, width });
  runtime.drawCircle = (_ctx, _point, radius, _fill, outline, outlineWidth) => {
    bodyCircles.push({ radius, outline, outlineWidth });
  };
  runtime.drawScreenText = (_ctx, text, screenPoint) => {
    comparisonLabels.push({ text, screenPoint });
  };
  runtime.drawStorySpeedLabel = () => {};

  runtime.drawStoryMotionWakeComparison(
    {},
    createStoryScene(runtime.learnerState),
    0.6,
  );

  assert.equal(circles.length, 15);
  assert.equal(origins.length, circles.length + 3);
  assert.deepEqual(
    origins.slice(-3).map((point) => point.y),
    Array(3).fill((182 + 908) * 0.5),
  );
  assert.equal(lines.length, 3);
  assert.ok(lines.every((line) => line.width === CAUSAL_PATH_STROKE_WIDTH));
  assert.deepEqual(
    bodyCircles.map((circle) => circle.radius),
    [
      ARCHITRINO_BODY_HALO_RADIUS,
      ARCHITRINO_BODY_RADIUS,
      ARCHITRINO_BODY_HALO_RADIUS,
      ARCHITRINO_BODY_RADIUS,
      ARCHITRINO_BODY_HALO_RADIUS,
      ARCHITRINO_BODY_RADIUS,
    ],
  );
  assert.ok(
    bodyCircles
      .filter((circle) => circle.outline)
      .every(
        (circle) =>
          circle.outlineWidth === ARCHITRINO_BODY_OUTLINE_WIDTH,
      ),
  );
  assert.deepEqual(
    comparisonLabels.map((label) => label.text),
    ["Expanded", "Compressed"],
  );
  assert.equal(
    comparisonLabels[0].screenPoint.y,
    comparisonLabels[1].screenPoint.y,
  );
  const expandedWidth = "Expanded".length * 9 * 0.56;
  const compressedWidth = "Compressed".length * 9 * 0.56;
  assert.ok(
    comparisonLabels[1].screenPoint.x -
      compressedWidth * 0.5 -
      (comparisonLabels[0].screenPoint.x + expandedWidth * 0.5) >=
      9 * 0.56 - 1e-9,
  );
  assert.equal(
    runtime.dom.canvas.dataset.storyMotionFixture,
    "declared_constant_speed_transmitter_history",
  );
  assert.equal(runtime.dom.canvas.dataset.storyMotionSpeeds, "0.3,0.6,0.9");
  assert.equal(runtime.dom.canvas.dataset.storyMotionSelectedSpeed, "0.6");
  assert.equal(runtime.dom.canvas.dataset.storyEmissionOriginMarkerCount, "18");
  assert(Number(runtime.dom.canvas.dataset.storyMotionMaximumResidual) < 1e-12);
  const frontReaches = runtime.dom.canvas.dataset.storyMotionFrontReach
    .split(",")
    .map(Number);
  const rearReaches = runtime.dom.canvas.dataset.storyMotionRearReach
    .split(",")
    .map(Number);
  assert.ok(frontReaches[0] > frontReaches[1] && frontReaches[1] > frontReaches[2]);
  assert.ok(rearReaches[0] < rearReaches[1] && rearReaches[1] < rearReaches[2]);
  assert(Number(runtime.dom.canvas.dataset.storyWakeContainmentMargin) >= 0);
});

test("Story 4 compression labels begin with a two-space gap and then follow wake separation", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    initialMode: "story",
  });
  const labels = [];
  runtime.drawScreenText = (_ctx, text, screenPoint) => {
    labels.push({ text, screenPoint });
  };
  const context = {
    save() {},
    restore() {},
    measureText(text) {
      return { width: text.length * 6 };
    },
  };

  runtime.drawStoryCompressionLabels(
    context,
    { x: 500, y: 600 },
    { x: 500, y: 600 },
    780,
    { x: 500, y: 600 },
  );

  const initialExpanded = labels.find((label) => label.text === "Expanded");
  const initialCompressed = labels.find((label) => label.text === "Compressed");
  const initialGap =
    initialCompressed.screenPoint.x -
    "Compressed".length * 6 * 0.5 -
    (initialExpanded.screenPoint.x + "Expanded".length * 6 * 0.5);
  assertNear(initialExpanded.screenPoint.y, initialCompressed.screenPoint.y);
  assertNear(initialGap, 12);

  labels.length = 0;
  runtime.drawStoryCompressionLabels(
    context,
    { x: 400, y: 600 },
    { x: 700, y: 600 },
    780,
    { x: 550, y: 600 },
  );

  assert.deepEqual(
    labels.map((label) => ({
      text: label.text,
      x: label.screenPoint.x,
      y: label.screenPoint.y,
    })),
    [
      { text: "Expanded", x: 400, y: 780 },
      { text: "Compressed", x: 700, y: 780 },
    ],
  );
});

test("Story 4 compressed-front label x is monotonic through playback", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    initialMode: "story",
  });
  runtime.learnerState.storyStep = 3;
  runtime.drawStorySpeedLabel = () => {};
  runtime.drawLine = () => {};
  runtime.drawSolidWakeCircle = () => {};
  runtime.drawStoryEmissionOriginMarker = () => {};
  runtime.drawCircle = () => {};
  const compressedX = [];
  runtime.drawScreenText = (_ctx, text, screenPoint) => {
    if (text === "Compressed") {
      compressedX.push(screenPoint.x);
    }
  };
  const context = {
    save() {},
    restore() {},
    measureText(text) {
      return { width: text.length * 6 };
    },
  };
  const scene = createStoryScene(runtime.learnerState);

  for (let index = 0; index <= 60; index += 1) {
    runtime.drawStoryMotionWakeComparison(
      context,
      scene,
      index / 100,
    );
  }

  assert.equal(compressedX.length, 61);
  compressedX.slice(1).forEach((position, index) => {
    assert.ok(position >= compressedX[index] - 1e-9);
  });
});

test("Story 4 speed changes reset playing, paused, and completed scenarios", () => {
  for (const playbackState of ["playing", "paused", "completed"]) {
    const runtime = createCausalDelayFeedbackRuntime({
      document: new FakeDocument(),
      window: fakeWindow,
      initialMode: "story",
    });
    runtime.learnerState.storyStep = 3;
    runtime.isPlaying = playbackState === "playing";
    runtime.learnerState.playback.playing = playbackState === "playing";
    runtime.learnerState.playback.resumable = playbackState === "paused";
    runtime.learnerState.playback.completed = playbackState === "completed";
    runtime.storyStageElapsedSeconds = 2.5;
    runtime.storyHeldFrame = {
      scene: createStoryScene(runtime.learnerState),
      replayTime: 0.4,
    };
    runtime.storyPlaybackScene = createStoryScene(runtime.learnerState);
    runtime.dom = {
      playButton: new FakeElement(),
      resetButton: new FakeElement(),
    };
    let guidedRenderCount = 0;
    runtime.modeController = {
      render() {
        guidedRenderCount += 1;
      },
    };

    runtime.learnerState.storyMotionSpeedFraction = 0.9;
    runtime.handleLearnerStateChange();

    assert.equal(runtime.isPlaying, false);
    assert.equal(runtime.storyStageElapsedSeconds, 0);
    assert.equal(runtime.storyHeldFrame, null);
    assert.equal(runtime.storyPlaybackScene, null);
    assert.equal(runtime.learnerState.playback.playing, false);
    assert.equal(runtime.learnerState.playback.resumable, false);
    assert.equal(runtime.learnerState.playback.completed, false);
    assert.equal(runtime.dom.playButton.disabled, false);
    assert.equal(runtime.dom.playButton.attributes["aria-label"], "Play replay");
    assert.equal(guidedRenderCount, 1);
  }
});

test("dormant diagnostic history renderer preserves reciprocal geometry", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    initialMode: "story",
  });
  runtime.dom = { canvas: { dataset: {} } };
  const circles = [];
  const arcs = [];
  const markers = [];
  runtime.drawSolidWakeCircle = (_ctx, center, radius) => {
    circles.push({ center, radius });
  };
  runtime.drawFadingSolidWakeArc = (_ctx, center, radius, angle, color) => {
    arcs.push({ center, radius, angle, color });
  };
  runtime.drawTransmissionGhost = (_ctx, point, kind) => {
    markers.push({ point, kind });
  };
  runtime.drawCircle = () => {};

  runtime.drawGuidedCausalHistory({}, runtime.learnerState.receiverTime);

  assert.equal(circles.length, 2);
  assert.equal(arcs.length, 0);
  assert.equal(markers.length, 2);
  assert.deepEqual(new Set(markers.map((marker) => marker.kind)), new Set([
    "positrino",
    "electrino",
  ]));
  assert.equal(runtime.dom.canvas.dataset.historyEmissionMarkerCount, "2");
  assert.equal(runtime.dom.canvas.dataset.historyWakeCircleCount, "2");
  assert.equal(runtime.dom.canvas.dataset.historyWakeGuideArcCount, "0");
});

test("Lesson Five starts at emission zero and visibly differs from Lesson One at equal body-wake speed", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    initialMode: "story",
  });
  runtime.dom = { canvas: { dataset: {} } };
  runtime.learnerState.storyStep = 4;
  runtime.drawStoryEmissionOriginMarker = () => {};
  runtime.drawLiveMarker = () => {};
  runtime.drawPathTrail = () => {};
  const renders = [];
  runtime.drawForwardWakeBuildupHistory = (_ctx, frame) => {
    renders.push(frame);
  };

  const scene = createStoryScene(runtime.learnerState);
  runtime.drawStoryScene({}, scene.playbackStartTime);
  assert.equal(renders.length, 1);
  assert.equal(renders[0].fronts.length, 0);
  assert.equal(
    runtime.dom.canvas.dataset.forwardWakeBuildupInheritedHistory,
    "false",
  );

  runtime.learnerState.playback.playing = true;
  runtime.storyPlaybackScene = scene;
  runtime.drawStoryScene(
    {},
    scene.playbackStartTime +
      (scene.playbackEndTime - scene.playbackStartTime) * 0.5,
  );

  assert.equal(renders.length, 2);
  assert(renders[1].fronts.length > 0);
  assert.deepEqual(
    new Set(renders[1].fronts.map((front) => front.transmitterId)),
    new Set(["positrino", "electrino"]),
  );
  assert.ok(renders[1].fronts.every((front) => front.declaredFieldSpeed));
  assert.ok(renders[1].fronts.every(
    (front) =>
      Math.abs(front.bodySpeed - front.wakeExpansionSpeed) <= Number.EPSILON,
  ));
  assert.equal(
    runtime.dom.canvas.dataset.forwardWakeBuildupMinimumSpeedRatio,
    "1.000000000",
  );
  assert.equal(
    runtime.dom.canvas.dataset.forwardWakeBuildupMaximumSpeedRatio,
    "1.000000000",
  );
  assert.equal(
    runtime.dom.canvas.dataset.forwardWakeBuildupDiffersFromMeet,
    "equal-body-and-wake-speed",
  );
  assert.equal(
    runtime.dom.canvas.dataset.forwardWakeBuildupMaximumLeadingError,
    "0.000000000",
  );
  assert.equal(
    runtime.dom.canvas.dataset.forwardWakeBuildupFrontClip,
    "trailing-half-plane-through-current-body",
  );
  for (const progress of [0.1, 0.3, 0.5, 0.7, 1]) {
    const frame = runtime.createStoryForwardWakeBuildupFrame(
      scene,
      scene.playbackStartTime +
        (scene.playbackEndTime - scene.playbackStartTime) * progress,
    );
    assert.ok(frame.fronts.length > 0);
    assert.equal(frame.maximumLeadingCoincidenceError, 0);
    frame.fronts.forEach((front) => {
      assert.equal(front.currentBody, frame.bodies[front.transmitterId]);
      assert.equal(front.leadingPoint, front.currentBody);
      assert.ok(
        Math.abs(
          front.radius - getDistance(front.center, front.currentBody),
        ) <= 1e-9,
      );
      assert.equal(front.trailingHalfPlaneOnly, true);
    });
  }
  const meetScene = createStoryScene({
    ...runtime.learnerState,
    storyStep: 0,
  });
  const meetFronts = createStorySampledWakeFronts(
    runtime.learnerState,
    meetScene,
    meetScene.playbackStartTime +
      (meetScene.playbackEndTime - meetScene.playbackStartTime) * 0.5,
  );
  assert.ok(meetFronts.length > 0);
  assert.ok(meetFronts.every((front) => front.declaredFieldSpeed !== true));
  assert.match(
    runtime.dom.canvas.dataset.forwardWakeBuildupEvidenceBoundary,
    /Declared paired-path display fixture/u,
  );
  assert.match(
    runtime.dom.canvas.dataset.forwardWakeBuildupEvidenceBoundary,
    /sampled trailing wake arcs are anchored to the current body/u,
  );
});

test("Story replay restarts the stage even while playback is already running", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    initialMode: "story",
  });
  runtime.render = () => {};
  runtime.setPlaying(true);
  runtime.storyStageElapsedSeconds = 18;

  runtime.setPlaying(true, { restartStory: true });

  assert.equal(runtime.isPlaying, true);
  assert.equal(runtime.storyStageElapsedSeconds, 0);
  assert.equal(runtime.storyHeldFrame, null);
  assert.equal(runtime.storyPlaybackScene.id, "meet");
});

test("Story graph viewport remains fixed from initial through mid-play and end-play", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    initialMode: "story",
  });
  runtime.canvasWidth = 1440;
  runtime.canvasHeight = 900;
  runtime.dom = {
    canvas: {
      getBoundingClientRect() {
        return { left: 0, top: 0, right: 1440, bottom: 900, width: 1440, height: 900 };
      },
    },
  };
  runtime.modeController = {
    dom: {
      panel: {
        getBoundingClientRect() {
          const height = [229, 187, 243, 235][runtime.learnerState.storyStep] ?? 229;
          return {
            left: 12,
            top: 12,
            right: 652,
            bottom: 12 + height,
            width: 640,
            height,
          };
        },
      },
      tabs: {
        getBoundingClientRect() {
          return { left: 880, top: 16, right: 1422, bottom: 60, width: 542, height: 44 };
        },
      },
    },
  };

  const initial = runtime.createStoryChartViewport();
  runtime.learnerState.playback.playing = true;
  runtime.storyStageElapsedSeconds = 1.6;
  const midpoint = runtime.createStoryChartViewport();
  runtime.storyStageElapsedSeconds = 3.2;
  const endpoint = runtime.createStoryChartViewport();
  const stepViewports = Array.from({ length: 4 }, (_unused, storyStep) => {
    runtime.learnerState.storyStep = storyStep;
    return runtime.createStoryChartViewport();
  });

  for (const viewport of [midpoint, endpoint, ...stepViewports]) {
    assert.equal(viewport.scale, initial.scale);
    assert.equal(viewport.offsetX, initial.offsetX);
    assert.equal(viewport.offsetY, initial.offsetY);
    assert.deepEqual(viewport.chartBounds, initial.chartBounds);
  }
  assert.equal(initial.chartBounds.top, 278);
  assert.ok(initial.chartBounds.top > 255);
  assert.ok(
    initial.offsetY + initial.designBounds.minY * initial.scale >=
      initial.chartBounds.top - 1e-9,
  );
  assert.ok(
    initial.offsetY + initial.designBounds.maxY * initial.scale <=
      initial.chartBounds.bottom + 1e-9,
  );
});

test("all Story steps use one desktop chart template despite different panel heights", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    initialMode: "story",
  });
  runtime.canvasWidth = 1280;
  runtime.canvasHeight = 720;
  runtime.dom = {
    canvas: {
      getBoundingClientRect() {
        return { left: 0, top: 0, right: 1280, bottom: 720, width: 1280, height: 720 };
      },
    },
  };
  runtime.modeController = {
    dom: {
      panel: {
        getBoundingClientRect() {
          const height = [249.5, 228.75, 263.75, 264.375][runtime.learnerState.storyStep];
          return {
            left: 18,
            top: 70,
            right: 658,
            bottom: 70 + height,
            width: 640,
            height,
          };
        },
      },
      tabs: {
        getBoundingClientRect() {
          return { left: 738, top: 16, right: 1262, bottom: 60, width: 524, height: 44 };
        },
      },
    },
  };

  const stepViewports = Array.from({ length: 4 }, (_unused, storyStep) => {
    runtime.learnerState.storyStep = storyStep;
    return runtime.createStoryChartViewport();
  });
  const reference = stepViewports[0];

  for (const viewport of stepViewports.slice(1)) {
    assert.equal(viewport.scale, reference.scale);
    assert.equal(viewport.offsetX, reference.offsetX);
    assert.equal(viewport.offsetY, reference.offsetY);
    assert.deepEqual(viewport.chartBounds, reference.chartBounds);
  }
  assert.equal(reference.chartBounds.top, 336);
});

test("causal delay feedback does not keep a frame loop alive while paused", () => {
  const scheduledFrames = [];
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: {
      ...fakeWindow,
      requestAnimationFrame(callback) {
        scheduledFrames.push(callback);
        return scheduledFrames.length;
      },
    },
  });
  runtime.render = () => {};
  runtime.isPlaying = false;
  runtime.animationFrame = null;
  runtime.lastFrameTime = 0;

  runtime.tick(16);
  assert.equal(scheduledFrames.length, 0);

  runtime.setPlaying(true);
  assert.equal(scheduledFrames.length, 1);
});

test("lesson playback advances its scene without polling dormant diagnostic panels", () => {
  let panelRefreshes = 0;
  let renderCount = 0;
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: {
      ...fakeWindow,
      requestAnimationFrame() {
        return 1;
      },
    },
    initialMode: "story",
  });
  runtime.render = () => {
    renderCount += 1;
  };
  runtime.modeController = {
    render() {},
    renderLiveState() {
      panelRefreshes += 1;
    },
  };
  runtime.lastFrameTime = 0;
  runtime.setPlaying(true);

  runtime.tick(200);

  assert(runtime.storyStageElapsedSeconds > 0);
  assert.equal(renderCount, 1);
  assert.equal(panelRefreshes, 0);
});

test("causal delay feedback display sampler uses fixed path speed", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dataset.paths.positrino = [
    { t: 0, x: 0, y: 0 },
    { t: 0.5, x: 100, y: 0 },
    { t: 1, x: 300, y: 0 },
  ];
  runtime.dataset.history.positrino = [];

  const solverTimePoint = runtime.getReplayPathPoint("positrino", 0.5);
  const fixedDisplayPoint = runtime.getTraversalPathPoint("positrino", 0.5);

  assert.equal("traversalMode" in runtime, false);
  assert.equal("traversalMode" in runtime.replayRequestOptions, false);
  assert.equal(solverTimePoint.x, 100);
  assert.equal(fixedDisplayPoint.x, 150);
  assert.equal(fixedDisplayPoint.t, 0.5);
});

test("causal delay feedback recorded EOM sampler preserves recorded time-position data", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dataset = {
    ...runtime.dataset,
    datasetSource: EOM_REPLAY_DATASET_SOURCE,
    eomProvenance: { runId: "recorded-time-fixture" },
    paths: {
      ...runtime.dataset.paths,
      positrino: [
        { t: 0, x: 0, y: 0 },
        { t: 0.5, x: 100, y: 0 },
        { t: 1, x: 300, y: 0 },
      ],
    },
  };
  runtime.invalidateComputedCaches();

  const point = runtime.getTraversalPathPoint("positrino", 0.5);

  assert.deepEqual(point, { t: 0.5, x: 100, y: 0 });
});

test("causal delay feedback live markers use fixed path speed", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dataset.paths.positrino = [
    { t: 0, x: 0, y: 0 },
    { t: 0.5, x: 100, y: 0 },
    { t: 1, x: 300, y: 0 },
  ];
  runtime.dataset.paths.electrino = [
    { t: 0, x: 0, y: 100 },
    { t: 0.5, x: 100, y: 100 },
    { t: 1, x: 300, y: 100 },
  ];
  runtime.dataset.history.positrino = [];
  runtime.dataset.history.electrino = [];
  const markerPoints = [];
  runtime.drawLiveMarker = (_ctx, kind, _color, point) => {
    markerPoints.push({ kind, point });
  };

  runtime.drawLiveMarkers({}, 0.5);

  assert.deepEqual(
    markerPoints.map(({ kind, point }) => ({ kind, x: point.x, y: point.y, t: point.t })),
    [
      { kind: "positrino", x: 150, y: 0, t: 0.5 },
      { kind: "electrino", x: 150, y: 100, t: 0.5 },
    ],
  );
});

test("causal delay feedback replay keeps initial conditions synced to path start history", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });

  assert.equal(runtime.dataset.initialConditions.positrino.kind, "positrino");
  assert.equal(runtime.dataset.initialConditions.electrino.kind, "electrino");
  assert.equal(runtime.dataset.initialConditions.historyDepth, 6);
  assert.equal(runtime.replayRequestOptions.initialConditions.positrino.x, runtime.dataset.paths.positrino[0].x);
  assert.equal(runtime.replayRequestOptions.initialConditions.electrino.y, runtime.dataset.paths.electrino[0].y);
  assert.equal("virtualObserver" in runtime.dataset.initialConditions, false);
  assert.equal("virtualObserver" in runtime.dataset, false);
  assert.equal("virtualObserver" in runtime.replayRequestOptions, false);
});

test("causal delay feedback eom normalization projects recorded worldlines onto the canvas", () => {
  const normalized = normalizeCausalDelayFeedbackEomReplay(createEomRecordFixture());

  assert.equal(normalized.runId, "cdf-runtime-eom-fixture");
  assert.equal(normalized.datasetSource, EOM_REPLAY_DATASET_SOURCE);
  assert.equal(normalized.solverIntegrationPath, EOM_REPLAY_ADAPTER);
  assert.equal(normalized.engineId, "eom-solver");
  assert.equal(normalized.claimGrade, "evolved-record");
  assert.equal(normalized.evidenceStatus, "canonical");
  assert.equal(normalized.eomProvenance.runId, "cdf-runtime-eom-fixture");
  assert.equal(normalized.eomProvenance.claimGrade, "evolved-record");
  assert.deepEqual(normalized.eomWorldlineRoles, { positrino: "10", electrino: "20" });
  assert.equal("preset" in normalized, false);
  // Both worldlines only move along y, so the display projection picks y.
  assert.equal(normalized.displayProjection.spaceAxis, "y");
  assert.deepEqual(normalized.wakeLinks, []);

  ["positrino", "electrino"].forEach((kind) => {
    const points = normalized.paths[kind];
    assert.equal(points.length, FRAME_COUNT);
    assert.equal(points[0].t, 0);
    assert.equal(points.at(-1).t, 1);
    assertNear(points[0].x, PATH_TIME_START_X);
    assertNear(points.at(-1).x, PATH_TIME_END_X);
  });
  // Inertial fixture: positrino sits 2 space units above electrino; over the
  // run each moves +1 space unit, so canvas offsets stay in a 2:1 ratio.
  const positrinoRise = normalized.paths.positrino[0].y - normalized.paths.positrino.at(-1).y;
  const pairOffset = normalized.paths.electrino[0].y - normalized.paths.positrino[0].y;
  assert(positrinoRise > 0);
  assertNear(pairOffset, 2 * positrinoRise, 1e-6);
  assertNear(
    normalized.paths.electrino[0].y - normalized.paths.electrino.at(-1).y,
    positrinoRise,
    1e-6,
  );

  assert.equal(normalized.initialConditions.historyDepth, 6);
  assert.equal(normalized.initialConditions.positrino.kind, "positrino");
  assert.equal(normalized.initialConditions.positrino.polarity, "positive");
  assert.equal(normalized.initialConditions.positrino.role, "source");
  assert.equal(normalized.initialConditions.positrino.ax, 0);
  assert.equal(normalized.initialConditions.positrino.ay, 0);
  assert.equal(normalized.initialConditions.electrino.polarity, "negative");
  assert.deepEqual(
    normalized.history.positrino.map((point) => point.depth),
    [1, 2, 3, 4, 5, 6],
  );
  assert.equal(normalized.frames.length, FRAME_COUNT);
  assert.equal(normalized.frames[0].positrino, normalized.paths.positrino[0]);
  assert.equal(normalized.frames[0].electrino, normalized.paths.electrino[0]);
  assert.equal("virtualObserver" in normalized, false);
  assert.equal("virtualObserver" in normalized.initialConditions, false);
});

test("causal delay feedback does not expose initial velocity handles on the canvas", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const condition = runtime.dataset.initialConditions.positrino;
  const hit = runtime.findNearestHit(runtime.worldToScreen(runtime.initialConditionVelocityEnd(condition)));

  assert.notEqual(hit?.type, "initial-velocity");
});

test("causal delay feedback does not expose a Virtual Observer handle", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const hits = [
    runtime.findNearestHit(runtime.worldToScreen({ x: 1600, y: 540 })),
    runtime.findNearestHit(runtime.worldToScreen({ x: 1600, y: 540 }), { includeWakes: true }),
  ].filter(Boolean);

  assert.equal(runtime.getVirtualObserver, undefined);
  assert.equal(runtime.setVirtualObserverVisible, undefined);
  assert.equal(runtime.applyVirtualObserverDrag, undefined);
  assert.equal(hits.some((hit) => hit.type === "virtual-observer"), false);
});

test("causal delay feedback exposes visible path lines only for path editing hits", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const point = runtime.dataset.paths.electrino[80];
  const screen = runtime.worldToScreen(point);

  const defaultHit = runtime.findNearestHit(screen);
  const pathHit = runtime.findNearestHit(screen, { includePaths: true });

  assert.equal(defaultHit, null);
  assert.equal(pathHit.type, "path-line");
  assert.equal(pathHit.selection.kind, "electrino");
  assertNear(pathHit.selection.anchorT, point.t, 0.01);
});

test("causal delay feedback wheel zoom anchors on empty canvas background", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = {
    canvas: {
      getBoundingClientRect: () => ({ left: 0, top: 0 }),
    },
  };
  const screen = { x: 960, y: 150 };
  const beforeScale = runtime.viewport.scale;
  const beforeWorld = runtime.screenToWorld(screen);
  let prevented = false;

  runtime.handleCanvasWheel({
    clientX: screen.x,
    clientY: screen.y,
    deltaY: -240,
    preventDefault() {
      prevented = true;
    },
  });
  const afterWorld = runtime.screenToWorld(screen);

  assert.equal(prevented, true);
  assert(runtime.viewport.scale > beforeScale);
  assertNear(afterWorld.x, beforeWorld.x);
  assertNear(afterWorld.y, beforeWorld.y);
});

test("causal delay feedback reuses one hit test during a wheel gesture", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = {
    canvas: {
      getBoundingClientRect: () => ({ left: 0, top: 0 }),
    },
  };
  let hitTests = 0;
  runtime.findNearestHit = () => {
    hitTests += 1;
    return null;
  };
  const event = {
    clientX: 960,
    clientY: 150,
    deltaY: -10,
    preventDefault() {},
  };

  runtime.handleCanvasWheel({ ...event, timeStamp: 1000 });
  runtime.handleCanvasWheel({ ...event, timeStamp: 1020 });

  assert.equal(hitTests, 1);
});

test("causal delay feedback wheel zoom treats removed history points as background", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = {
    canvas: {
      getBoundingClientRect: () => ({ left: 0, top: 0 }),
    },
  };
  const pathPoint = runtime.dataset.history.positrino[0];
  const screen = runtime.worldToScreen(pathPoint);
  const beforeScale = runtime.viewport.scale;
  let prevented = false;

  runtime.handleCanvasWheel({
    clientX: screen.x,
    clientY: screen.y,
    deltaY: -240,
    preventDefault() {
      prevented = true;
    },
  });

  assert.equal(prevented, true);
  assert(runtime.viewport.scale > beforeScale);
});

test("causal delay feedback wheel zoom ignores active drags", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = {
    canvas: {
      getBoundingClientRect: () => ({ left: 0, top: 0 }),
    },
  };
  runtime.dragState = { type: "history", kind: "positrino", depth: 1, didEdit: true };
  const beforeScale = runtime.viewport.scale;
  let prevented = false;

  runtime.handleCanvasWheel({
    clientX: 960,
    clientY: 150,
    deltaY: -240,
    preventDefault() {
      prevented = true;
    },
  });

  assert.equal(prevented, false);
  assert.equal(runtime.viewport.scale, beforeScale);
});

test("causal delay feedback pinch zoom anchors on empty canvas background", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = {
    canvas: {
      getBoundingClientRect: () => ({ left: 0, top: 0 }),
    },
  };
  const first = { pointerId: 1, pointerType: "touch", clientX: 860, clientY: 150, preventDefault() {} };
  const second = { pointerId: 2, pointerType: "touch", clientX: 1060, clientY: 150, preventDefault() {} };
  runtime.startBackgroundPointer(first, { x: first.clientX, y: first.clientY });
  runtime.startBackgroundPointer(second, { x: second.clientX, y: second.clientY });
  const beforeScale = runtime.viewport.scale;
  const anchoredWorld = runtime.screenToWorld({ x: 960, y: 150 });
  let prevented = false;

  runtime.handleCanvasPointerMove({
    pointerId: 2,
    pointerType: "touch",
    clientX: 1160,
    clientY: 150,
    preventDefault() {
      prevented = true;
    },
  });
  const afterWorld = runtime.screenToWorld({ x: 1010, y: 150 });

  assert.equal(prevented, true);
  assert(runtime.viewport.scale > beforeScale);
  assertNear(afterWorld.x, anchoredWorld.x);
  assertNear(afterWorld.y, anchoredWorld.y);
});

test("causal delay feedback pinch state clears as touch pointers release", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = {
    canvas: {
      getBoundingClientRect: () => ({ left: 0, top: 0 }),
    },
  };
  runtime.startBackgroundPointer(
    { pointerId: 1, pointerType: "touch", clientX: 860, clientY: 150, preventDefault() {} },
    { x: 860, y: 150 },
  );
  runtime.startBackgroundPointer(
    { pointerId: 2, pointerType: "touch", clientX: 1060, clientY: 150, preventDefault() {} },
    { x: 1060, y: 150 },
  );

  const returnedDataset = runtime.finishDrag({ pointerId: 2 });

  assert.equal(returnedDataset, runtime.dataset);
  assert.equal(runtime.backgroundPointers.size, 1);
  assert.equal(runtime.pinchState, null);
});

test("causal delay feedback path line drag can start over removed history point positions", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.setRetainedDepthLimit(4);
  runtime.dom = {
    canvas: {
      getBoundingClientRect: () => ({ left: 0, top: 0 }),
    },
    readout: new FakeElement(),
  };
  runtime.render = () => {};
  const pathPoint = runtime.dataset.history.positrino.find((point) => point.depth === 5);
  const screen = runtime.worldToScreen(pathPoint);
  let prevented = false;

  runtime.handleCanvasPointerDown({
    pointerId: 1,
    pointerType: "touch",
    clientX: screen.x,
    clientY: screen.y,
    preventDefault() {
      prevented = true;
    },
  });

  assert.equal(prevented, true);
  assert.equal(runtime.backgroundPointers.size, 0);
  assert.equal(runtime.pinchState, null);
  assert.equal(runtime.dragState.type, "path-line");
  assert.equal(runtime.dragState.kind, "positrino");
});

test("causal delay feedback runtime loads an async eom replay over the mock fallback", async () => {
  const replayStatus = new FakeElement();
  const adapter = {
    id: EOM_REPLAY_ADAPTER,
    async createReplayAsync() {
      return createMockEomReplayDataset("fixed-display");
    },
  };
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    replayAdapter: adapter,
    autoLoadReplay: false,
  });
  runtime.dom = { replayStatus };

  assert.equal(runtime.dataset.datasetSource, "representative_mock_solver_replay");

  await runtime.loadReplay();

  assert.equal(runtime.dataset.runId, "eom:fixed-display");
  assert.equal(runtime.dataset.datasetSource, EOM_REPLAY_DATASET_SOURCE);
  assert.equal(runtime.dataset.solverIntegrationPath, EOM_REPLAY_ADAPTER);
  assert.equal(runtime.replayLoadState, "ready");
  assert.equal(runtime.replayLoadError, null);
  assert.equal(replayStatus.textContent, "EOM recorded replay");
  assert.equal(replayStatus.dataset.state, "eom-replay");
  assert.equal(
    replayStatus.title,
    "Showing recorded EOM paths. This viewer does not recompute the record or infer delayed hits.",
  );
});

test("causal delay feedback status keeps raw recorded provenance out of learner-facing copy", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dataset = createMockEomReplayDataset("partial_arcs", {
    runId: "eom:partial_arcs:full",
    evidenceStatus: "canonical",
    eomProvenance: {
      engineId: "eom-solver",
      runId: "eom:partial_arcs:full",
      claimGrade: "evolved-record",
      evidenceStatus: "canonical",
      contractId: "eom_evolution_contract/v0",
    },
    eomWorldlineRoles: { positrino: "10", electrino: "20" },
  });
  runtime.dom = { replayStatus };

  runtime.updateReplayStatus();

  assert.equal(replayStatus.textContent, "EOM recorded replay");
  assert.equal(replayStatus.dataset.state, "eom-replay");
  assert.match(replayStatus.title, /recorded EOM paths/u);
  assert.match(replayStatus.title, /does not recompute/u);
  assert.doesNotMatch(replayStatus.title, /engine=|run=|claim=|evidence=|worldlines=/u);
  assert.equal(replayStatus.attributes["aria-label"], replayStatus.title);
});

test("causal delay feedback status does not expose dataset-level eom provenance fields", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dataset = createMockEomReplayDataset("partial_arcs", {
    runId: "eom:partial_arcs:flat",
  });
  runtime.dom = { replayStatus };

  runtime.updateReplayStatus();

  assert.equal(replayStatus.textContent, "EOM recorded replay");
  assert.equal(replayStatus.dataset.state, "eom-replay");
  assert.match(replayStatus.title, /recorded EOM paths/u);
  assert.doesNotMatch(replayStatus.title, /engine=|run=|claim=|evidence=|worldlines=/u);
});

test("causal delay feedback status ignores legacy solver telemetry on eom datasets", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dataset = createMockEomReplayDataset("partial_arcs", {
    runId: "eom:partial_arcs:legacy",
    pairInteractionStepCount: 181,
    interactionLaw: "display_pair_attraction_v1",
    executionPath: "native_c_abi",
    pathConstraintGuidanceSampleCount: 12,
    pathConstraintGuidanceMode: "retained_knot_boundary",
    pathConstraintBoundaryRelaxationMode: "finite_difference_frame_relaxation_v1",
    pathConstraintBoundaryRelaxationStatus: "converged",
    pathConstraintSolverStatus: "guided_constraint_path",
    pathConstraintSolverClaim: "diagnostic_constraint_replay_not_boundary_value_solve",
  });
  runtime.dom = { replayStatus };

  runtime.updateReplayStatus();

  assert.equal(replayStatus.textContent, "EOM recorded replay");
  assert.equal(replayStatus.dataset.state, "eom-replay");
  assert.doesNotMatch(replayStatus.title, /steps=/);
  assert.doesNotMatch(replayStatus.title, /relax/);
  assert.doesNotMatch(replayStatus.title, /constraint=/);
  assert.doesNotMatch(replayStatus.title, /pair-interaction/);
  assert.match(replayStatus.title, /does not recompute the record or infer delayed hits/u);
});

test("causal delay feedback status reports plain recorded replay for non-eom recorded datasets", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dataset = {
    ...createMockCausalDelayReplayDataset("partial_arcs"),
    solverIntegrationPath: "archived_replay_adapter",
  };
  runtime.dom = { replayStatus };

  runtime.updateReplayStatus();

  assert.equal(replayStatus.textContent, "recorded replay");
  assert.equal(replayStatus.dataset.state, "recorded");
  assert.equal(replayStatus.title, "Showing a recorded replay dataset.");
  assert.equal(replayStatus.attributes["aria-label"], replayStatus.title);
});

test("causal delay feedback recorded replay status ignores legacy path-constraint telemetry", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dataset = {
    ...createMockCausalDelayReplayDataset("partial_arcs"),
    solverIntegrationPath: "archived_replay_adapter",
    solverReplayMode: "pair-interaction-path",
    pairInteractionStepCount: 181,
    interactionLaw: "display_pair_attraction_v1",
    executionPath: "native_c_abi",
    maxPathConstraintResidual: 0.004,
    pathConstraintBoundarySeedSampleCount: 18,
    pathConstraintBoundaryRelaxationStatus: "converged",
    pathConstraintSolverStatus: "discrete_boundary_value_converged",
    pathConstraintSolverClaim: "finite_difference_pair_boundary_value_solve_converged",
    pathConstraintPhysicalBoundarySolverStatus: "physical_boundary_value_converged",
  };
  runtime.dom = { replayStatus };

  runtime.updateReplayStatus();

  assert.equal(replayStatus.textContent, "recorded replay");
  assert.equal(replayStatus.dataset.state, "recorded");
  assert.equal(replayStatus.title, "Showing a recorded replay dataset.");
  assert.doesNotMatch(replayStatus.title, /constraint=|relax|seedRows=|physical=/);
});

test("causal delay feedback status remains plain when eom provenance is incomplete", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dataset = {
    ...createMockCausalDelayReplayDataset("partial_arcs"),
    datasetSource: EOM_REPLAY_DATASET_SOURCE,
    solverIntegrationPath: EOM_REPLAY_ADAPTER,
    runId: undefined,
  };
  runtime.dom = { replayStatus };

  runtime.updateReplayStatus();

  assert.equal(replayStatus.textContent, "EOM recorded replay");
  assert.equal(replayStatus.dataset.state, "eom-replay");
  assert.match(replayStatus.title, /recorded EOM paths/u);
  assert.doesNotMatch(replayStatus.title, /engine=|run=|claim=/u);
});

test("causal delay feedback status treats legacy motion-policy datasets as plain recorded replay", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dataset = {
    ...createMockCausalDelayReplayDataset("partial_arcs"),
    solverIntegrationPath: "archived_replay_adapter",
    motionAccelerationPolicy: "pair_initial_attraction_seed",
    pairAccelerationScale: 0.18,
    pairSegmentCount: 12,
  };
  runtime.dom = { replayStatus };

  runtime.updateReplayStatus();

  assert.equal(replayStatus.textContent, "recorded replay");
  assert.equal(replayStatus.dataset.state, "recorded");
  assert.doesNotMatch(replayStatus.title, /pair_initial_attraction_seed|segments=/);
  assert.equal(replayStatus.attributes["aria-label"], replayStatus.title);
});

test("causal delay feedback eom replay adapter rejects draft-preview recompute requests", async () => {
  const adapter = createCausalDelayFeedbackEomReplayAdapter({ record: createEomRecordFixture() });

  assert.equal(adapter.id, EOM_REPLAY_ADAPTER);
  await assert.rejects(
    adapter.createReplayAsync({
      requestOptions: { replayDataset: { draftPreview: { reason: "retained_point_drag_preview" } } },
    }),
    /recorded solver output; canvas edits cannot be recomputed/,
  );

  const dataset = await adapter.createReplayAsync();
  assert.equal(dataset.datasetSource, EOM_REPLAY_DATASET_SOURCE);
  assert.equal(dataset.runId, "cdf-runtime-eom-fixture");
});

test("causal delay feedback runtime keeps the mock replay when eom replay loading fails", async () => {
  const replayStatus = new FakeElement();
  const adapter = {
    id: EOM_REPLAY_ADAPTER,
    async createReplayAsync() {
      throw new Error("solver client missing");
    },
  };
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    replayAdapter: adapter,
    autoLoadReplay: false,
  });
  runtime.dom = { replayStatus };

  await runtime.loadReplay();

  assert.equal(runtime.dataset.datasetSource, "representative_mock_solver_replay");
  assert.equal(runtime.dataset.solverIntegrationPath, "temporary_mock_adapter");
  assert.equal(runtime.replayLoadState, "fallback");
  assert.match(runtime.replayLoadError.message, /solver client missing/);
  assert.equal(replayStatus.textContent, "representative fallback");
  assert.equal(replayStatus.dataset.state, "fallback");
});

test("causal delay feedback direct edit remains a local draft without calling the replay adapter", async () => {
  const replayStatus = new FakeElement();
  const readout = new FakeElement();
  let adapterCalls = 0;
  const adapter = {
    id: EOM_REPLAY_ADAPTER,
    async createReplayAsync() {
      adapterCalls += 1;
      return createMockEomReplayDataset("accepted_tight_bright");
    },
  };
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    replayAdapter: adapter,
    autoLoadReplay: false,
  });
  runtime.dom = { replayStatus, readout };
  runtime.selectedItem = { type: "history", kind: "electrino", depth: 1 };

  runtime.applyRetainedPointDrag("electrino", 1, { x: 84, y: -32 });
  const editedX = runtime.dataset.initialConditions.electrino.x;
  runtime.dragState = { type: "history", kind: "electrino", depth: 1, didEdit: true };
  await runtime.finishDrag();
  runtime.updateReadout();

  const readoutText = readout.children.map((child) => child.textContent);

  assert.equal(runtime.dataset.datasetSource, DIRECT_MANIPULATION_DRAFT_PREVIEW);
  assert.equal(runtime.replayLoadState, "draft");
  assert.equal(runtime.dataset.initialConditions.electrino.x, editedX);
  assert.equal(adapterCalls, 0);
  assert.equal(runtime.replayRequestOptions.replayDataset, runtime.dataset);
  assert.equal(runtime.replayRequestOptions.initialConditions.electrino.x, editedX);
  assert.equal(replayStatus.textContent, "draft preview");
  assert.equal(replayStatus.dataset.state, "draft");
  assert.match(replayStatus.title, /local teaching preview/u);
  assert(readoutText.includes("preview=local_teaching_only"));
  assert(readoutText.includes("recorded_replay=unchanged"));
});

test("causal delay feedback runtime ignores stale async replay responses", async () => {
  const pending = [];
  const adapter = {
    id: EOM_REPLAY_ADAPTER,
    createReplayAsync() {
      return new Promise((resolve) => {
        pending.push({ resolve });
      });
    },
  };
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    replayAdapter: adapter,
    autoLoadReplay: false,
  });

  const firstLoad = runtime.loadReplay();
  const secondLoad = runtime.loadReplay();

  pending[1].resolve(createMockEomReplayDataset("full_circular_arcs", { runId: "newer-eom-dataset" }));
  await secondLoad;

  pending[0].resolve(createMockEomReplayDataset("accepted_tight_bright", { runId: "older-eom-dataset" }));
  await firstLoad;

  assert.equal(runtime.dataset.runId, "newer-eom-dataset");
  assert.equal("preset" in runtime.dataset, false);
});

test("causal delay feedback page uses eom replay by default with a mock escape hatch", () => {
  assert.equal(shouldUseEomReplay(fakeWindow), true);
  assert.equal(
    shouldUseEomReplay({
      location: { href: "http://localhost/causal-delay-feedback.html?replay=central" },
    }),
    true,
  );
  assert.equal(
    shouldUseEomReplay({
      location: { href: "http://localhost/causal-delay-feedback.html?solver=central" },
    }),
    true,
  );
  assert.equal(
    shouldUseEomReplay({
      location: { href: "http://localhost/causal-delay-feedback.html?replay=mock" },
    }),
    false,
  );
  assert.equal(
    shouldUseEomReplay({
      location: { href: "http://localhost/causal-delay-feedback.html?solver=off" },
    }),
    false,
  );
  assert.equal(
    shouldUseEomReplay({
      location: { href: "http://localhost/causal-delay-feedback.html?adapter=temporary_mock_adapter" },
    }),
    false,
  );

  const defaultRuntime = createCausalDelayFeedbackRuntimeForPage(fakeWindow);
  const mockRuntime = createCausalDelayFeedbackRuntimeForPage({
    location: { href: "http://localhost/causal-delay-feedback.html?replay=mock" },
  });

  const eomRuntime = createCausalDelayFeedbackRuntimeForPage({
    location: { href: "http://localhost/causal-delay-feedback.html?adapter=bridge" },
  });

  assert.equal(defaultRuntime.replayAdapter.id, EOM_REPLAY_ADAPTER);
  assert.equal(mockRuntime.replayAdapter.id, TEMPORARY_MOCK_ADAPTER);
  assert.equal(eomRuntime.replayAdapter.id, EOM_REPLAY_ADAPTER);
  assert.equal(eomRuntime.dataset.datasetSource, "representative_mock_solver_replay");
});

test("causal delay feedback page builds eom replay options from scope and record URLs", async () => {
  const scopeOptions = { record: createEomRecordFixture() };
  assert.equal(
    createCausalDelayFeedbackEomReplayOptions({
      location: { href: "http://localhost/causal-delay-feedback.html" },
      ARCHITRINO_CAUSAL_DELAY_FEEDBACK_EOM_REPLAY: scopeOptions,
    }),
    scopeOptions,
  );
  assert.deepEqual(createCausalDelayFeedbackEomReplayOptions(fakeWindow), {});

  const fetchCalls = [];
  const fetchedOptions = createCausalDelayFeedbackEomReplayOptions({
    location: {
      href: "http://localhost/causal-delay-feedback.html?eomRecord=https://records.test/run.json",
    },
    async fetch(url) {
      fetchCalls.push(url);
      return {
        ok: true,
        async json() {
          return { runId: "fetched-eom-record" };
        },
      };
    },
  });
  assert.equal(typeof fetchedOptions.loadEomRecord, "function");
  const fetchedRecord = await fetchedOptions.loadEomRecord({});
  assert.deepEqual(fetchCalls, ["https://records.test/run.json"]);
  assert.equal(fetchedRecord.runId, "fetched-eom-record");

  const failingOptions = createCausalDelayFeedbackEomReplayOptions({
    location: {
      href: "http://localhost/causal-delay-feedback.html?eomRecord=https://records.test/missing.json",
    },
    async fetch() {
      return { ok: false, status: 404 };
    },
  });
  await assert.rejects(failingOptions.loadEomRecord({}), /EOM record fetch failed \(404\)/);
});

test("causal delay feedback page accepts eom replay review URL options", () => {
  const options = createCausalDelayFeedbackInitialReplayRequestOptions({
    location: {
      href:
        "http://localhost/causal-delay-feedback.html?solverFrameCount=18000.9" +
        "&historyDepth=9.7&spaceAxis=y&positrinoWorldline=10&electrinoWorldline=20",
    },
  });
  const preferredFrameCountOptions = createCausalDelayFeedbackInitialReplayRequestOptions({
    location: {
      href: "http://localhost/causal-delay-feedback.html?frameCount=120.6&solverFrameCount=999",
    },
  });
  const boundedOptions = createCausalDelayFeedbackInitialReplayRequestOptions({
    location: {
      href: "http://localhost/causal-delay-feedback.html?frameCount=999999999&historyDepth=999999999",
    },
  });

  assert.deepEqual(options, {
    frameCount: 18000,
    historyDepth: 9,
    spaceAxis: "y",
    positrinoWorldlineId: "10",
    electrinoWorldlineId: "20",
  });
  assert.equal(preferredFrameCountOptions.frameCount, 120);
  assert.equal(boundedOptions.frameCount, EOM_REPLAY_MAX_FRAME_COUNT);
  assert.equal(boundedOptions.historyDepth, EOM_REPLAY_MAX_HISTORY_DEPTH);
});

test("causal delay feedback page and direct runtime share one default learner mode", () => {
  const pageRuntime = createCausalDelayFeedbackRuntimeForPage({
    location: { href: "http://localhost/causal-delay-feedback.html?mode=unknown-mode" },
  });
  const directRuntime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    initialMode: "unknown-mode",
  });
  const defaultRuntime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });

  assert.equal(pageRuntime.learnerState.mode, "story");
  assert.equal(directRuntime.learnerState.mode, "story");
  assert.equal(defaultRuntime.learnerState.mode, "story");
});

test("causal delay feedback page leaves absent replay request options unset", () => {
  const defaultOptions = createCausalDelayFeedbackInitialReplayRequestOptions(fakeWindow);
  const clampedOptions = createCausalDelayFeedbackInitialReplayRequestOptions({
    location: {
      href: "http://localhost/causal-delay-feedback.html?frameCount=1&historyDepth=1",
    },
  });
  const invalidOptions = createCausalDelayFeedbackInitialReplayRequestOptions({
    location: {
      href: "http://localhost/causal-delay-feedback.html?frameCount=0&historyDepth=-3&spaceAxis=",
    },
  });

  assert.deepEqual(defaultOptions, {});
  assert.equal(clampedOptions.frameCount, 2);
  assert.equal(clampedOptions.historyDepth, 2);
  assert.deepEqual(invalidOptions, {});
});

test("causal delay feedback eom replay adapter requires a recorded dataset", async () => {
  const emptyAdapter = createCausalDelayFeedbackEomReplayAdapter();

  await assert.rejects(
    emptyAdapter.createReplayAsync(),
    /requires a recorded eom_evolution_contract\/v0 dataset/,
  );

  const loaderContexts = [];
  const loaderAdapter = createCausalDelayFeedbackEomReplayAdapter({
    async loadEomRecord(context) {
      loaderContexts.push(context);
      return createEomRecordFixture();
    },
  });
  const dataset = await loaderAdapter.createReplayAsync();

  assert.equal(loaderContexts.length, 1);
  assert.equal("presetId" in loaderContexts[0], false);
  assert.equal(dataset.datasetSource, EOM_REPLAY_DATASET_SOURCE);
  assert.equal(dataset.solverIntegrationPath, EOM_REPLAY_ADAPTER);
  assert.equal(dataset.runId, "cdf-runtime-eom-fixture");
});

test("causal delay feedback page eom replay uses configured record from scope", async () => {
  const replayStatus = new FakeElement();
  const windowLike = {
    location: { href: "http://localhost/causal-delay-feedback.html" },
    ARCHITRINO_CAUSAL_DELAY_FEEDBACK_EOM_REPLAY: {
      record: createEomRecordFixture(),
    },
  };
  const runtime = createCausalDelayFeedbackRuntimeForPage(windowLike);
  runtime.dom = { replayStatus };

  await runtime.loadReplay();

  assert.equal(runtime.replayAdapter.id, EOM_REPLAY_ADAPTER);
  assert.equal(runtime.dataset.datasetSource, EOM_REPLAY_DATASET_SOURCE);
  assert.equal(runtime.dataset.solverIntegrationPath, EOM_REPLAY_ADAPTER);
  assert.equal(runtime.dataset.runId, "cdf-runtime-eom-fixture");
  assert.equal(runtime.dataset.engineId, "eom-solver");
  assert.equal(runtime.dataset.claimGrade, "evolved-record");
  assert.deepEqual(runtime.dataset.eomWorldlineRoles, { positrino: "10", electrino: "20" });
  assert.deepEqual(runtime.dataset.wakeLinks, []);
  assert.equal(runtime.replayLoadState, "ready");
  assert.equal(replayStatus.textContent, "EOM recorded replay");
  assert.equal(replayStatus.dataset.state, "eom-replay");
  assert.match(replayStatus.title, /recorded EOM paths/u);
  assert.doesNotMatch(replayStatus.title, /run=|evidence=/u);
});

test("causal delay feedback wake fronts and receiver markers synchronize for every retained link", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });

  runtime.dataset.wakeLinks.forEach((link) => {
    const transmitterPoint = runtime.dataset.history[link.sourceKind].find((point) => point.depth === link.sourceDepth);
    const receiverPoint = runtime.dataset.history[link.receiverKind].find((point) => point.depth === link.receiverDepth);

    runtime.updateWakeLinkGeometry();

    const beforeSource = runtime.getWakeTiming(link, transmitterPoint.t - 0.01);
    const atSource = runtime.getWakeTiming(link, transmitterPoint.t);
    const atReceiver = runtime.getWakeTiming(link, receiverPoint.t);
    const justAfterReceiver = runtime.getWakeTiming(link, receiverPoint.t + 1e-9);
    const afterReceiver = runtime.getWakeTiming(link, receiverPoint.t + 0.01);
    const sourceFront = runtime.getWakeFrontCenterPoint(link, transmitterPoint.t);
    const receiverFront = runtime.getWakeFrontCenterPoint(link, receiverPoint.t);
    const receivingMarker = runtime.getReplayPathPoint(link.receiverKind, receiverPoint.t);
    const synchronization = runtime.getWakeArrivalSynchronization(link);

    assert.equal(beforeSource.active, false);
    assert.equal(atSource.active, true);
    assert.equal(atSource.progress, 0);
    assert.equal(atReceiver.active, true);
    assert.equal(atReceiver.progress, 1);
    assert.equal(justAfterReceiver.active, false);
    assert.equal(justAfterReceiver.completedForLoop, true);
    assert.equal(afterReceiver.active, false);
    assert.equal(atReceiver.completedForLoop, false);
    assert.equal(afterReceiver.completedForLoop, true);
    assert.equal(link.emissionTime, transmitterPoint.t);
    assert.equal(link.hitTime, receiverPoint.t);
    assert.equal(link.travelTime, receiverPoint.t - transmitterPoint.t);
    assertNear(sourceFront.x, transmitterPoint.x);
    assertNear(sourceFront.y, transmitterPoint.y);
    assertNear(receiverFront.x, receiverPoint.x);
    assertNear(receiverFront.y, receiverPoint.y);
    assert.equal(receivingMarker.x, receiverPoint.x);
    assert.equal(receivingMarker.y, receiverPoint.y);
    assert.equal(synchronization.isSynchronized, true);
    assertNear(synchronization.timeError, 0);
    assertNear(synchronization.distanceError, 0);
  });
});

test("causal delay feedback partial wake arc series disappears after reception until the loop restarts", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const link = runtime.dataset.wakeLinks[0];
  const transmitterPoint = runtime.dataset.history[link.sourceKind].find((point) => point.depth === link.sourceDepth);
  const receiverPoint = runtime.dataset.history[link.receiverKind].find((point) => point.depth === link.receiverDepth);
  let drawnArcCount = 0;
  runtime.drawDottedArc = () => {
    drawnArcCount += 1;
  };

  runtime.drawWakeProgression({}, link, receiverPoint.t);
  assert(drawnArcCount > 0);

  drawnArcCount = 0;
  runtime.drawWakeProgression({}, link, receiverPoint.t + 0.01);
  assert.equal(drawnArcCount, 0);

  drawnArcCount = 0;
  runtime.drawWakeProgression({}, link, transmitterPoint.t + (receiverPoint.t - transmitterPoint.t) * 0.5);
  assert(drawnArcCount > 0);
});

test("causal delay feedback partial wake arc fronts keep radial sector boundaries", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const link = runtime.dataset.wakeLinks[0];
  const transmitterPoint = runtime.dataset.history[link.sourceKind].find((point) => point.depth === link.sourceDepth);
  const receiverPoint = runtime.dataset.history[link.receiverKind].find((point) => point.depth === link.receiverDepth);
  const replayTime = transmitterPoint.t + (receiverPoint.t - transmitterPoint.t) * 0.75;
  const arcs = [];
  runtime.drawDottedArc = (_ctx, center, radius, startDeg, endDeg) => {
    arcs.push({ center, radius, startDeg, endDeg });
  };

  runtime.drawWakeProgression({}, link, replayTime);

  const timing = runtime.getWakeTiming(link, replayTime);
  const theta = getAngleDegrees(timing.source, timing.receiver);
  const firstArc = arcs[0];
  assert(arcs.length > 1);
  assertNear(firstArc.startDeg, theta - 3.5);
  assertNear(firstArc.endDeg, theta + 3.5);
  arcs.forEach((arc) => {
    assert.deepEqual(arc.center, firstArc.center);
    assertNear(arc.startDeg, firstArc.startDeg);
    assertNear(arc.endDeg, firstArc.endDeg);
    assertNear(arc.endDeg - arc.startDeg, 7);
  });
});

test("causal delay feedback full circular wakes keep expanding after retained receptions", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const link = runtime.dataset.wakeLinks[0];
  const receiverPoint = runtime.dataset.history[link.receiverKind].find((point) => point.depth === link.receiverDepth);
  const drawnCircles = [];
  runtime.drawSolidWakeCircle = (_ctx, center, radius, color) => {
    drawnCircles.push({ center, radius, color });
  };

  runtime.drawFullCircularWakes({}, receiverPoint.t);
  const retainedReceptionCircleCount = drawnCircles.length;

  drawnCircles.length = 0;
  runtime.drawFullCircularWakes({}, receiverPoint.t + 0.01);

  assert(retainedReceptionCircleCount > 0);
  assert(drawnCircles.length > 0);

  drawnCircles.length = 0;
  const [, pathEnd] = runtime.getReplayTimeRange();
  runtime.drawFullCircularWakes({}, pathEnd + 10);
  assert.equal(drawnCircles.length, 0);
});

test("causal delay feedback full circular wakes are emitted from moving path origins", () => {
  const partialRuntime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const fullRuntime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  fullRuntime.setWakeVisualSwitch("fullCircularWakesEnabled", true);
  const partialLink = partialRuntime.dataset.wakeLinks[0];
  const transmitterPoint = partialRuntime.dataset.history[partialLink.sourceKind].find(
    (point) => point.depth === partialLink.sourceDepth,
  );
  const receiverPoint = partialRuntime.dataset.history[partialLink.receiverKind].find(
    (point) => point.depth === partialLink.receiverDepth,
  );
  const replayTime = transmitterPoint.t + (receiverPoint.t - transmitterPoint.t) * 0.75;
  const partialCalls = [];
  const fullCalls = [];
  partialRuntime.drawDottedArc = (_ctx, _center, radius, startDeg, endDeg, color, dotRadius) => {
    partialCalls.push({ radius, startDeg, endDeg, color, dotRadius });
  };
  fullRuntime.drawSolidWakeCircle = (_ctx, center, radius, color) => {
    fullCalls.push({ center, radius, color });
  };

  partialRuntime.drawWakeProgression({}, partialLink, replayTime);
  fullRuntime.drawFullCircularWakes({}, replayTime);
  const positrinoSpheres = fullRuntime.getCausalIsochronSpheres("positrino", 0.5);
  const laterSpheres = fullRuntime.getCausalIsochronSpheres("positrino", 0.56);
  const sharedEmission = positrinoSpheres[Math.min(5, positrinoSpheres.length - 1)];
  const laterSharedEmission = laterSpheres.find(
    (sphere) => Math.abs(sphere.emissionTime - sharedEmission.emissionTime) <= 1e-9,
  );
  const [, pathEnd] = fullRuntime.getReplayTimeRange();
  const endSpheres = fullRuntime.getCausalIsochronSpheres("positrino", pathEnd);
  const postPathSpheres = fullRuntime.getCausalIsochronSpheres("positrino", pathEnd + 0.2);
  const endSharedEmission = endSpheres.find(
    (sphere) => Math.abs(sphere.emissionTime - sharedEmission.emissionTime) <= 1e-9,
  );
  const postPathSharedEmission = postPathSpheres.find(
    (sphere) => Math.abs(sphere.emissionTime - sharedEmission.emissionTime) <= 1e-9,
  );
  const distinctOrigins = new Set(
    positrinoSpheres.map((sphere) => `${Math.round(sphere.origin.x)}:${Math.round(sphere.origin.y)}`),
  );

  assert.deepEqual(fullRuntime.getWakeVisualStyle(), partialRuntime.getWakeVisualStyle());
  assert(fullCalls.length > partialCalls.length);
  assert(positrinoSpheres.length > 8);
  assert(distinctOrigins.size > 3);
  assert(laterSharedEmission);
  assert(endSharedEmission);
  assert(postPathSharedEmission);
  assert(laterSharedEmission.radius > sharedEmission.radius);
  assert.equal(laterSharedEmission.origin.x, sharedEmission.origin.x);
  assert.equal(laterSharedEmission.origin.y, sharedEmission.origin.y);
  assert(postPathSharedEmission.radius > endSharedEmission.radius);
  assert(postPathSpheres.every((sphere) => sphere.emissionTime <= pathEnd + 1e-9));
  positrinoSpheres.forEach((sphere, index) => {
    if (index === 0) {
      return;
    }
    assert(sphere.radius < positrinoSpheres[index - 1].radius);
  });
  assert(fullCalls.every((fullCall) => fullCall.radius > 0));
});

test("causal delay feedback wake switches can combine full circles with emission lines", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const solidCircles = [];
  const lines = [];
  runtime.drawSolidWakeCircle = (_ctx, center, radius, color) => {
    solidCircles.push({ center, radius, color });
  };
  runtime.drawLine = (_ctx, points, color, width) => {
    lines.push({ points, color, width });
  };
  runtime.setWakeVisualSwitch("fullCircularWakesEnabled", true);
  runtime.setWakeVisualSwitch("arcWakesEnabled", true);

  runtime.drawWakes({}, 0.5);
  const lineCountBeforeForeground = lines.length;
  runtime.drawForegroundWakeEmissionLines({}, 0.5);

  assert(solidCircles.length > 0);
  assert.equal(lineCountBeforeForeground, 0);
  assert(lines.length > 0);
  assert(lines.every((line) => line.color.a > 0.3));
  assert(lines.every((line) => line.width > 1.4));
  assert(solidCircles.every((circle) => circle.radius > 0));
});

test("causal delay feedback full circle emission lines render above path trails", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    initialMode: "sandbox",
    window: fakeWindow,
  });
  const calls = [];
  const liveWakeSeriesConsumers = [];
  runtime.context = {
    clearRect() {},
    setTransform() {},
  };
  runtime.drawBackground = () => calls.push("background");
  runtime.drawWakes = (_ctx, _replayTime, visibleWakeSeries) => {
    calls.push("wakes");
    liveWakeSeriesConsumers.push(visibleWakeSeries);
  };
  runtime.drawPathTrail = (_ctx, kind) => calls.push(`path:${kind}`);
  runtime.drawForegroundWakeEmissionLines = (_ctx, _replayTime, visibleWakeSeries) => {
    calls.push("emission-lines");
    liveWakeSeriesConsumers.push(visibleWakeSeries);
  };
  runtime.drawPathEndpointHandles = () => calls.push("endpoint-handles");
  runtime.drawSelection = () => calls.push("selection");
  runtime.drawSandboxTransmissionGhost = (_ctx, visibleWakeSeries) => {
    calls.push("transmission-ghost");
    liveWakeSeriesConsumers.push(visibleWakeSeries);
  };
  runtime.drawLiveMarkers = () => calls.push("markers");

  runtime.render(0.5);

  assert.deepEqual(calls, [
    "background",
    "wakes",
    "path:positrino",
    "path:electrino",
    "emission-lines",
    "endpoint-handles",
    "selection",
    "transmission-ghost",
    "markers",
  ]);
  assert.equal(liveWakeSeriesConsumers.length, 3);
  assert(
    liveWakeSeriesConsumers.every(
      (visibleWakeSeries) => visibleWakeSeries === liveWakeSeriesConsumers[0],
    ),
    "wake arcs, foreground emission lines, and emission dots must consume one shared live frame",
  );
});

test("causal delay feedback Sandbox draws emission markers from exact live wake sources after path drag", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    initialMode: "sandbox",
    window: fakeWindow,
  });
  const replayTime = 0.7;
  const beforeLinks = runtime.getVisibleWakeSeries(replayTime);
  assert.equal(beforeLinks.length, 2);
  const beforeSources = new Map(
    beforeLinks.map((link) => [link.sourceKind, { ...link.source }]),
  );
  const calls = [];
  runtime.drawTransmissionGhost = (_ctx, point, kind, options) => {
    calls.push({ point, kind, options });
  };

  runtime.drawSandboxTransmissionGhost({}, beforeLinks);

  assert.equal(calls.length, 2);
  calls.forEach((call, index) => {
    assert.equal(call.point, beforeLinks[index].source);
    assert.equal(call.kind, beforeLinks[index].sourceKind);
    assert.deepEqual(call.options, { showLabel: false });
  });

  const anchor = runtime.dataset.paths.positrino[90];
  assert.equal(
    runtime.applyPathLineDrag("positrino", anchor.t, { x: 24, y: -38 }),
    true,
  );
  const afterLinks = runtime.getVisibleWakeSeries(replayTime);
  assert.equal(afterLinks.length, 2);
  calls.length = 0;

  runtime.drawSandboxTransmissionGhost({}, afterLinks);

  calls.forEach((call, index) => {
    const link = afterLinks[index];
    assert.equal(call.point, link.source);
    assert.equal(call.kind, link.sourceKind);
    assert.deepEqual(call.options, { showLabel: false });
  });
  assert(afterLinks.some((link) => {
    const before = beforeSources.get(link.sourceKind);
    return Math.hypot(link.source.x - before.x, link.source.y - before.y) > 0.1;
  }));
});

test("causal delay feedback shared axes stop at both arrowhead bases", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    initialMode: "sandbox",
    window: fakeWindow,
  });
  const lines = [];
  const triangles = [];
  runtime.dom = {};
  runtime.drawLine = (_ctx, points) => lines.push(points);
  runtime.drawTriangle = (_ctx, points) => triangles.push(points);
  runtime.drawText = () => {};
  runtime.drawBackgroundDepthField = () => {};

  runtime.drawBackground({ fillStyle: "", fillRect() {} });

  assert.equal(lines[0][1].x, triangles[0][1].x);
  assert.equal(lines[0][1].x, triangles[0][2].x);
  assert.equal(lines[1][1].y, triangles[1][1].y);
  assert.equal(lines[1][1].y, triangles[1][2].y);
});

test("causal delay feedback wake switches can hide all wake overlays", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  let dottedArcCount = 0;
  let lineCount = 0;
  runtime.drawDottedArc = () => {
    dottedArcCount += 1;
  };
  runtime.drawLine = () => {
    lineCount += 1;
  };
  runtime.setWakeVisualSwitch("arcWakesEnabled", false);
  runtime.setWakeVisualSwitch("fullCircularWakesEnabled", false);

  runtime.drawWakes({}, 0.5);

  assert.equal(dottedArcCount, 0);
  assert.equal(lineCount, 0);
});

test("causal delay feedback solver hit diagnostics do not desynchronize receiver-point arrivals", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const link = runtime.dataset.wakeLinks[0];
  const receiverPoint = runtime.dataset.history[link.receiverKind].find((point) => point.depth === link.receiverDepth);
  const solverDiagnosticHitTime = receiverPoint.t + 0.06;
  Object.assign(link, {
    hitTime: solverDiagnosticHitTime,
    solverRunId: "central-solved-with-diagnostic-hit-offset",
    rootCount: 1,
    solverHitCount: 1,
    solverHitTime: solverDiagnosticHitTime,
  });

  const atReceiver = runtime.getWakeTiming(link, receiverPoint.t);
  const atSolverDiagnosticTime = runtime.getWakeTiming(link, solverDiagnosticHitTime);
  const receiverFront = runtime.getWakeFrontCenterPoint(link, receiverPoint.t);
  const receivingMarker = runtime.getReplayPathPoint(link.receiverKind, receiverPoint.t);
  const synchronization = runtime.getWakeArrivalSynchronization(link);
  const hit = runtime.createWakeHit(link, 0);

  assert.equal(atReceiver.receiverT, receiverPoint.t);
  assert.equal(atReceiver.progress, 1);
  assert.equal(atReceiver.active, true);
  assert.equal(atSolverDiagnosticTime.active, false);
  assert.equal(atSolverDiagnosticTime.progress, 1);
  assert.equal(receiverFront.x, receiverPoint.x);
  assert.equal(receiverFront.y, receiverPoint.y);
  assert.equal(receivingMarker.x, receiverPoint.x);
  assert.equal(receivingMarker.y, receiverPoint.y);
  assert.equal(synchronization.isSynchronized, true);
  assert(hit.details.includes(`hit=${receiverPoint.t.toFixed(2)}`));
  assert(hit.details.includes(`solverHit=${solverDiagnosticHitTime.toFixed(2)}`));
});

test("causal delay feedback hit testing does not expose retained reception points", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const receptionPoint = runtime.dataset.history.electrino.find((point) => point.depth === 2);
  const hit = runtime.findNearestHit(runtime.worldToScreen(receptionPoint), { includeWakes: true });

  assert.notEqual(hit?.type, "history");
});

test("causal delay feedback draws path endpoint handles", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const circles = [];
  runtime.drawCircle = (_ctx, point, radius, fill, stroke, lineWidth) => {
    circles.push({ point, radius, fill, stroke, lineWidth });
  };

  runtime.drawPathEndpointHandles({});

  assert.equal(circles.length, 4);
  assert(circles.every((circle) => circle.radius > 0 && circle.radius < 8));
  assert(circles.every((circle) => circle.fill.a > 0 && circle.stroke.a > circle.fill.a));
  assert.deepEqual(
    circles.map((circle) => Math.round(circle.point.x)),
    [
      Math.round(runtime.worldToScreen(runtime.getPathEndpointHandles("positrino")[0]).x),
      Math.round(runtime.worldToScreen(runtime.getPathEndpointHandles("positrino")[1]).x),
      Math.round(runtime.worldToScreen(runtime.getPathEndpointHandles("electrino")[0]).x),
      Math.round(runtime.worldToScreen(runtime.getPathEndpointHandles("electrino")[1]).x),
    ],
  );
});

test("causal delay feedback path endpoint handles are selectable", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const startPoint = runtime.dataset.history.positrino.find((point) => point.depth === 1);
  const endDepth = runtime.getMaxHistoryDepth("positrino");
  const endPoint = runtime.dataset.history.positrino.find((point) => point.depth === endDepth);

  const startHit = runtime.findNearestHit(runtime.worldToScreen(startPoint), { includePaths: true });
  const endHit = runtime.findNearestHit(runtime.worldToScreen(endPoint), { includePaths: true });

  assert.equal(startPoint.t, 0);
  assert.equal(endPoint.t, 1);
  assert.equal(startHit?.type, "history");
  assert.equal(startHit.selection.depth, 1);
  assert.equal(endHit?.type, "history");
  assert.equal(endHit.selection.depth, endDepth);
});

test("causal delay feedback endpoint handles remain visible under lower retained wake depth", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.setRetainedDepthLimit(2);
  const endDepth = runtime.getMaxHistoryDepth("electrino");
  const endPoint = runtime.dataset.history.electrino.find((point) => point.depth === endDepth);

  const visibleDepths = runtime.getVisibleHistory("electrino").map((point) => point.depth);
  const endHit = runtime.findNearestHit(runtime.worldToScreen(endPoint), { includePaths: true });
  const before = { x: endPoint.x, y: endPoint.y };
  const didEdit = runtime.applyRetainedPointDrag("electrino", endDepth, { x: -18, y: 12 });

  assert.deepEqual(visibleDepths, [1, 2, endDepth]);
  assert(runtime.getVisibleWakeLinks().every((link) => link.sourceDepth <= 2 && link.receiverDepth <= 2));
  assert.equal(endHit?.type, "history");
  assert.equal(endHit.selection.depth, endDepth);
  assert.equal(didEdit, true);
  assert.equal(endPoint.x, before.x - 18);
  assert.equal(endPoint.y, before.y + 12);
});

test("causal delay feedback does not expose an initial-position canvas hit", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const condition = runtime.dataset.initialConditions.positrino;
  const startPoint = runtime.dataset.history.positrino.find((point) => point.depth === 1);

  const hit = runtime.findNearestHit(runtime.worldToScreen(runtime.initialConditionPoint(condition)));

  assert.equal(startPoint.x, condition.x);
  assert.equal(startPoint.y, condition.y);
  assert.notEqual(hit?.type, "history");
  assert.notEqual(hit?.type, "initial-position");
});

test("causal delay feedback retained start constraint updates the initial condition", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const startPoint = runtime.dataset.history.positrino.find((point) => point.depth === 1);
  const firstPathPoint = runtime.dataset.paths.positrino[0];
  const firstFramePoint = runtime.dataset.frames[0].positrino;
  const before = { x: startPoint.x, y: startPoint.y };

  const didEdit = runtime.applyRetainedPointDrag("positrino", 1, { x: 42, y: -24 });

  assert.equal(didEdit, true);
  assert.equal(startPoint.depth, 1);
  assert.equal(startPoint.x, before.x + 42);
  assert.equal(startPoint.y, before.y - 24);
  assert.equal(runtime.dataset.initialConditions.positrino.x, startPoint.x);
  assert.equal(runtime.dataset.initialConditions.positrino.y, startPoint.y);
  assert.equal(firstPathPoint.x, startPoint.x);
  assert.equal(firstPathPoint.y, startPoint.y);
  assert.equal(firstFramePoint.x, startPoint.x);
  assert.equal(firstFramePoint.y, startPoint.y);
});

test("causal delay feedback retained end constraint updates the final path point", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const endDepth = runtime.getMaxHistoryDepth("electrino");
  const endPoint = runtime.dataset.history.electrino.find((point) => point.depth === endDepth);
  const lastPathPoint = runtime.dataset.paths.electrino.at(-1);
  const lastFramePoint = runtime.dataset.frames.at(-1).electrino;
  const before = { x: endPoint.x, y: endPoint.y };

  const didEdit = runtime.applyRetainedPointDrag("electrino", endDepth, { x: -38, y: 26 });

  assert.equal(didEdit, true);
  assert.equal(endPoint.depth, runtime.getMaxHistoryDepth("electrino"));
  assert.equal(endPoint.x, before.x - 38);
  assert.equal(endPoint.y, before.y + 26);
  assert.equal(lastPathPoint.x, endPoint.x);
  assert.equal(lastPathPoint.y, endPoint.y);
  assert.equal(lastFramePoint.x, endPoint.x);
  assert.equal(lastFramePoint.y, endPoint.y);
});

test("causal delay feedback velocity endpoint is not a canvas hit target", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const startPoint = runtime.dataset.history.positrino.find((point) => point.depth === 1);
  const condition = runtime.dataset.initialConditions.positrino;
  startPoint.x += 80;
  startPoint.y -= 35;
  condition.x -= 90;
  condition.y += 70;
  const velocityEnd = runtime.initialConditionVelocityEnd(
    condition,
    runtime.getInitialVelocityAnchorPoint("positrino", condition),
  );

  const hit = runtime.findNearestHit(runtime.worldToScreen(velocityEnd));

  assert.notEqual(hit?.type, "initial-velocity");
});

test("causal delay feedback velocity selection does not draw a canvas highlight", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const startPoint = runtime.dataset.history.positrino.find((point) => point.depth === 1);
  const condition = runtime.dataset.initialConditions.positrino;
  startPoint.x += 72;
  startPoint.y -= 41;
  condition.x -= 86;
  condition.y += 63;
  runtime.selectedItem = { type: "initial-velocity", kind: "positrino" };
  const context = createArcRecordingContext();

  runtime.drawSelection(context);

  assert.equal(context.arcs.length, 0);
});

test("causal delay feedback does not expose path-history insertion entry points", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });

  assert.equal(runtime.handleCanvasContextMenu, undefined);
  assert.equal(runtime.addReceptionPointAtPath, undefined);
  assert.equal(runtime.findNearestPathInsertion, undefined);
});

test("causal delay feedback path line drag deforms the visible path without adding fixed points", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const path = runtime.dataset.paths.electrino;
  const anchorIndex = 90;
  const anchor = path[anchorIndex];
  const before = {
    anchorX: anchor.x,
    anchorY: anchor.y,
    neighborY: path[anchorIndex + 4].y,
    farStartX: path[0].x,
    farStartY: path[0].y,
    historyLength: runtime.dataset.history.electrino.length,
    liveY: runtime.getReplayPathPoint("electrino", anchor.t).y,
  };

  const didEdit = runtime.applyPathLineDrag("electrino", anchor.t, { x: 28, y: -42 });

  assert.equal(didEdit, true);
  assert.equal(anchor.x, before.anchorX + 28);
  assert.equal(anchor.y, before.anchorY - 42);
  assert(path[anchorIndex + 4].y < before.neighborY);
  assert.equal(path[0].x, before.farStartX);
  assert.equal(path[0].y, before.farStartY);
  assert.equal(runtime.dataset.history.electrino.length, before.historyLength);
  assert(runtime.getReplayPathPoint("electrino", anchor.t).y < before.liveY);
  assert.equal(runtime.dataset.datasetSource, DIRECT_MANIPULATION_DRAFT_PREVIEW);
  assert.equal(runtime.dataset.draftPreview.reason, "path_line_drag_preview");
  assert.equal(runtime.dataset.draftPreview.pathLineKind, "electrino");
  assert.equal(runtime.dataset.draftPreview.pathLineAnchorT, anchor.t);
  assert.equal(runtime.replayRequestOptions.replayDataset, runtime.dataset);
});

test("causal delay feedback path line drag keeps path endpoints fixed", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const path = runtime.dataset.paths.positrino;
  const startHistory = runtime.dataset.history.positrino.find((point) => point.depth === 1);
  const endHistory = runtime.dataset.history.positrino.find((point) => point.depth === runtime.getMaxHistoryDepth("positrino"));
  const startBefore = {
    pathX: path[0].x,
    pathY: path[0].y,
    historyX: startHistory.x,
    historyY: startHistory.y,
    frameX: runtime.dataset.frames[0].positrino.x,
    frameY: runtime.dataset.frames[0].positrino.y,
    neighborY: path[1].y,
  };
  const endBefore = {
    pathX: path.at(-1).x,
    pathY: path.at(-1).y,
    historyX: endHistory.x,
    historyY: endHistory.y,
    frameX: runtime.dataset.frames.at(-1).positrino.x,
    frameY: runtime.dataset.frames.at(-1).positrino.y,
    neighborY: path.at(-2).y,
  };

  const startEdit = runtime.applyPathLineDrag("positrino", path[0].t, { x: 36, y: -28 });
  const endEdit = runtime.applyPathLineDrag("positrino", path.at(-1).t, { x: -30, y: 24 });

  assert.equal(startEdit, true);
  assert.equal(endEdit, true);
  assert.equal(path[0].x, startBefore.pathX);
  assert.equal(path[0].y, startBefore.pathY);
  assert.equal(startHistory.x, startBefore.historyX);
  assert.equal(startHistory.y, startBefore.historyY);
  assert.equal(runtime.dataset.frames[0].positrino.x, startBefore.frameX);
  assert.equal(runtime.dataset.frames[0].positrino.y, startBefore.frameY);
  assert.notEqual(path[1].y, startBefore.neighborY);
  assert.equal(path.at(-1).x, endBefore.pathX);
  assert.equal(path.at(-1).y, endBefore.pathY);
  assert.equal(endHistory.x, endBefore.historyX);
  assert.equal(endHistory.y, endBefore.historyY);
  assert.equal(runtime.dataset.frames.at(-1).positrino.x, endBefore.frameX);
  assert.equal(runtime.dataset.frames.at(-1).positrino.y, endBefore.frameY);
  assert.notEqual(path.at(-2).y, endBefore.neighborY);
});

test("causal delay feedback path line drag has no visible one-sided tangent kink", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const path = runtime.dataset.paths.positrino;
  const anchorIndex = Math.floor(path.length * 0.5);
  const anchorT = path[anchorIndex].t;
  const startBefore = { ...path[0] };
  const endBefore = { ...path.at(-1) };

  const didEdit = runtime.applyPathLineDrag(
    "positrino",
    anchorT,
    { x: 0, y: -220 },
  );

  const visibleHalfWindow = 0.005;
  const previous = runtime.getReplayPathPoint(
    "positrino",
    anchorT - visibleHalfWindow,
  );
  const anchor = runtime.getReplayPathPoint("positrino", anchorT);
  const next = runtime.getReplayPathPoint(
    "positrino",
    anchorT + visibleHalfWindow,
  );
  const incoming = { x: anchor.x - previous.x, y: anchor.y - previous.y };
  const outgoing = { x: next.x - anchor.x, y: next.y - anchor.y };

  assert.equal(didEdit, true);
  assert.deepEqual(path[0], startBefore);
  assert.deepEqual(path.at(-1), endBefore);
  assert(
    normalizedDot(incoming, outgoing) > 0.999,
    "the rendered-scale incoming and outgoing chords must remain visually tangent",
  );
});

test("causal delay feedback near-start backward drags preserve endpoint continuity and displayed time order", () => {
  for (const [kind, yDelta] of [
    ["positrino", -260],
    ["electrino", 260],
  ]) {
    const runtime = createCausalDelayFeedbackRuntime({
      document: new FakeDocument(),
      window: fakeWindow,
    });
    const path = runtime.dataset.paths[kind];
    const startBefore = { ...path[0] };
    const endBefore = { ...path.at(-1) };
    const anchor = path[Math.round((path.length - 1) * 0.025)];

    assert.equal(
      runtime.applyPathLineDrag(kind, anchor.t, { x: -900, y: yDelta }),
      true,
    );

    assert.deepEqual(path[0], startBefore);
    assert.deepEqual(path.at(-1), endBefore);
    assertStrictlyIncreasingDisplayedTimeAxis(runtime, kind);
    const h = (path.at(-1).t - path[0].t) / 4000;
    const start = sampleTimedPath(path, path[0].t);
    const first = sampleTimedPath(path, path[0].t + h);
    const second = sampleTimedPath(path, path[0].t + 2 * h);
    assert(
      normalizedDot(
        { x: first.x - start.x, y: first.y - start.y },
        { x: second.x - first.x, y: second.y - first.y },
      ) > 0.999,
      `${kind} must leave its fixed start without an endpoint-adjacent kink`,
    );
  }
});

test("causal delay feedback aggressive interior drag cannot fold displayed time backward", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const kind = "electrino";
  const path = runtime.dataset.paths[kind];
  const anchor = path[Math.round((path.length - 1) * 0.48)];
  const anchorT = anchor.t;

  assert.equal(
    runtime.applyPathLineDrag(kind, anchorT, { x: -1400, y: 360 }),
    true,
  );

  assertStrictlyIncreasingDisplayedTimeAxis(runtime, kind);
  const halfWindow = 0.005;
  const previous = sampleTimedPath(path, anchorT - halfWindow);
  const center = sampleTimedPath(path, anchorT);
  const next = sampleTimedPath(path, anchorT + halfWindow);
  assert(
    normalizedDot(
      { x: center.x - previous.x, y: center.y - previous.y },
      { x: next.x - center.x, y: next.y - center.y },
    ) > 0.999,
    "the aggressive interior edit must retain visible C1 continuity",
  );
});

test("causal delay feedback path drag uses a curvature-smooth truthful falloff", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const anchorT = 0.5;
  const boundaryT = anchorT + 0.32;
  const h = 1e-5;
  const boundarySecondDerivative = (
    runtime.getPathLineDragWeight(anchorT, boundaryT - 2 * h) -
    2 * runtime.getPathLineDragWeight(anchorT, boundaryT - h) +
    runtime.getPathLineDragWeight(anchorT, boundaryT)
  ) / (h * h);
  assert.equal(runtime.getPathLineDragWeight(anchorT, anchorT), 1);
  assert.equal(runtime.getPathLineDragWeight(anchorT, boundaryT), 0);
  assert(Math.abs(boundarySecondDerivative) < 0.05);

  const beforeLinks = runtime.getVisibleWakeSeries(0.7).map((link) => ({
    sourceKind: link.sourceKind,
    source: { ...link.source },
  }));
  for (const [kind, index, delta] of [
    ["positrino", 72, { x: 22, y: -34 }],
    ["positrino", 104, { x: -16, y: 27 }],
    ["electrino", 78, { x: 18, y: 31 }],
    ["electrino", 112, { x: -20, y: -25 }],
  ]) {
    const anchor = runtime.dataset.paths[kind][index];
    assert.equal(runtime.applyPathLineDrag(kind, anchor.t, delta), true);
  }
  const afterLinks = runtime.getVisibleWakeSeries(0.7);
  assert.equal(afterLinks.length, 2);
  afterLinks.forEach((link) => {
    assert.deepEqual(
      link.receiver,
      runtime.getTraversalPathPoint(link.receiverKind, 0.7),
    );
    assert(Math.abs(link.rootResidual) < 1e-5);
  });
  assert(afterLinks.some((link) => {
    const before = beforeLinks.find((candidate) => candidate.sourceKind === link.sourceKind);
    return Math.hypot(link.source.x - before.source.x, link.source.y - before.source.y) > 0.1;
  }));
});

test("causal delay feedback pointer drag on path line updates the path preview", () => {
  const readout = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = {
    canvas: {
      getBoundingClientRect: () => ({ left: 0, top: 0 }),
      setPointerCapture() {},
    },
    readout,
  };
  runtime.render = () => {};
  const anchor = runtime.dataset.paths.positrino[60];
  const beforeY = anchor.y;
  const screen = runtime.worldToScreen(anchor);
  let prevented = false;

  runtime.handleCanvasPointerDown({
    pointerId: 7,
    pointerType: "mouse",
    clientX: screen.x,
    clientY: screen.y,
    preventDefault() {
      prevented = true;
    },
  });
  runtime.handleCanvasPointerMove({
    pointerId: 7,
    pointerType: "mouse",
    clientX: screen.x,
    clientY: screen.y - 30,
    preventDefault() {},
  });

  assert.equal(prevented, true);
  assert.equal(runtime.dragState.type, "path-line");
  assert.equal(runtime.dragState.didEdit, true);
  assert(anchor.y < beforeY);
  assert.equal(runtime.dataset.draftPreview.reason, "path_line_drag_preview");
  assert.equal(readout.hidden, false);
});

test("causal delay feedback cancels a pending replay only when a direct edit begins", async () => {
  let resolveReplay;
  const replayPending = new Promise((resolve) => {
    resolveReplay = resolve;
  });
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    replayAdapter: {
      async createReplayAsync() {
        return replayPending;
      },
    },
    autoLoadReplay: false,
  });
  runtime.dom = {
    canvas: {
      getBoundingClientRect: () => ({ left: 0, top: 0 }),
      setPointerCapture() {},
    },
    readout: new FakeElement(),
    replayStatus: new FakeElement(),
  };
  runtime.render = () => {};
  const pendingLoad = runtime.loadReplay();
  assert.equal(runtime.replayLoadState, "loading");

  const backgroundScreen = runtime.worldToScreen({ x: 10, y: 10 });
  runtime.handleCanvasPointerDown({
    pointerId: 9,
    pointerType: "mouse",
    clientX: backgroundScreen.x,
    clientY: backgroundScreen.y,
    preventDefault() {},
  });
  assert.equal(runtime.replayLoadState, "loading");

  const anchor = runtime.dataset.paths.positrino[80];
  runtime.applyPathLineDrag("positrino", anchor.t, { x: 0, y: -25 });
  assert.equal(runtime.replayLoadState, "draft");
  resolveReplay(createMockCausalDelayReplayDataset());
  await pendingLoad;
  assert.equal(runtime.dataset.datasetSource, DIRECT_MANIPULATION_DRAFT_PREVIEW);
});

test("causal delay feedback pointer drag on endpoint handle moves the endpoint", () => {
  const readout = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = {
    canvas: {
      getBoundingClientRect: () => ({ left: 0, top: 0 }),
      setPointerCapture() {},
    },
    readout,
  };
  runtime.render = () => {};
  const startPoint = runtime.dataset.history.positrino.find((point) => point.depth === 1);
  const screen = runtime.worldToScreen(startPoint);
  const before = { x: startPoint.x, y: startPoint.y };
  let prevented = false;

  runtime.handleCanvasPointerDown({
    pointerId: 8,
    pointerType: "mouse",
    clientX: screen.x,
    clientY: screen.y,
    preventDefault() {
      prevented = true;
    },
  });
  runtime.handleCanvasPointerMove({
    pointerId: 8,
    pointerType: "mouse",
    clientX: screen.x + 34,
    clientY: screen.y - 22,
    preventDefault() {},
  });

  assert.equal(prevented, true);
  assert.equal(runtime.dragState.type, "history");
  assert.equal(runtime.dragState.kind, "positrino");
  assert.equal(runtime.dragState.depth, 1);
  assert.equal(runtime.dragState.didEdit, true);
  assert.notEqual(startPoint.x, before.x);
  assert.notEqual(startPoint.y, before.y);
  assert.equal(runtime.dataset.initialConditions.positrino.x, startPoint.x);
  assert.equal(runtime.dataset.initialConditions.positrino.y, startPoint.y);
  assert.equal(runtime.dataset.draftPreview.reason, "retained_point_drag_preview");
  assert.equal(readout.hidden, false);
});

test("causal delay feedback retained point drag deforms the path and updates wake endpoints", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const receptionPoint = runtime.dataset.history.electrino.find((point) => point.depth === 2);
  const wakeLink = runtime.dataset.wakeLinks.find((link) => link.label === "red 1 -> blue 2");
  const start = { x: receptionPoint.x, y: receptionPoint.y };

  runtime.deformPathAroundHistoryPoint("electrino", 2, { x: 40, y: -25 });
  runtime.updateWakeLinkGeometry();

  assert.equal(receptionPoint.x, start.x + 40);
  assert.equal(receptionPoint.y, start.y - 25);
  assert.equal(wakeLink.receiver.x, receptionPoint.x);
  assert.equal(wakeLink.receiver.y, receptionPoint.y);
});

test("causal delay feedback retained point drag rebuilds a smooth path through the moved point", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const retainedPoint = runtime.dataset.history.positrino.find((point) => point.depth === 4);

  runtime.applyRetainedPointDrag("positrino", 4, { x: -84, y: -62 });

  const path = runtime.dataset.paths.positrino;
  const retainedPathIndex = path.findIndex((point) => Math.abs(point.t - retainedPoint.t) <= 1e-6);
  const pathPoint = path[retainedPathIndex];
  const previous = path[retainedPathIndex - 1];
  const next = path[retainedPathIndex + 1];
  const incoming = { x: pathPoint.x - previous.x, y: pathPoint.y - previous.y };
  const outgoing = { x: next.x - pathPoint.x, y: next.y - pathPoint.y };
  const dot = incoming.x * outgoing.x + incoming.y * outgoing.y;

  assert(retainedPathIndex > 0);
  assert(retainedPathIndex < path.length - 1);
  assert.equal(pathPoint.x, retainedPoint.x);
  assert.equal(pathPoint.y, retainedPoint.y);
  assert(dot > 0);
});

test("causal delay feedback retained start point drag updates the initial condition", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const startPoint = runtime.dataset.history.positrino.find((point) => point.depth === 1);
  const pathStart = runtime.dataset.paths.positrino[0];
  const condition = runtime.dataset.initialConditions.positrino;
  const before = {
    startX: startPoint.x,
    startY: startPoint.y,
    pathX: pathStart.x,
    pathY: pathStart.y,
  };

  const didEdit = runtime.applyRetainedPointDrag("positrino", 1, { x: 42, y: -18 });

  assert.equal(didEdit, true);
  assert.equal(startPoint.x, before.startX + 42);
  assert.equal(startPoint.y, before.startY - 18);
  assert.equal(pathStart.x, before.pathX + 42);
  assert.equal(pathStart.y, before.pathY - 18);
  assert.equal(condition.x, startPoint.x);
  assert.equal(condition.y, startPoint.y);
  assert.equal(runtime.replayRequestOptions.initialConditions.positrino.x, condition.x);
});

test("causal delay feedback retained end point drag updates the path endpoint", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const endDepth = runtime.getMaxHistoryDepth("electrino");
  const endPoint = runtime.dataset.history.electrino.find((point) => point.depth === endDepth);
  const pathEnd = runtime.dataset.paths.electrino.at(-1);
  const wakeLink = runtime.dataset.wakeLinks.find(
    (link) => link.sourceKind === "positrino" && link.receiverKind === "electrino" && link.receiverDepth === endDepth,
  );
  const before = {
    endX: endPoint.x,
    endY: endPoint.y,
    pathX: pathEnd.x,
    pathY: pathEnd.y,
  };

  const didEdit = runtime.applyRetainedPointDrag("electrino", endDepth, { x: -36, y: 24 });

  assert.equal(didEdit, true);
  assert.equal(endPoint.x, before.endX - 36);
  assert.equal(endPoint.y, before.endY + 24);
  assert.equal(pathEnd.x, before.pathX - 36);
  assert.equal(pathEnd.y, before.pathY + 24);
  assert.equal(wakeLink.receiver.x, endPoint.x);
  assert.equal(wakeLink.receiver.y, endPoint.y);
});

test("causal delay feedback retained point drag preserves wake and receiver arrival synchronization", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const wakeLink = runtime.dataset.wakeLinks.find((link) => link.label === "red 1 -> blue 2");

  runtime.applyRetainedPointDrag("electrino", 2, { x: 44, y: -28 });

  const receiverPoint = runtime.dataset.history.electrino.find((point) => point.depth === 2);
  const receiverFront = runtime.getWakeFrontCenterPoint(wakeLink, receiverPoint.t);
  const receivingMarker = runtime.getReplayPathPoint("electrino", receiverPoint.t);
  const synchronization = runtime.getWakeArrivalSynchronization(wakeLink);

  assert.equal(wakeLink.hitTime, receiverPoint.t);
  assert.equal(wakeLink.receiver.x, receiverPoint.x);
  assert.equal(wakeLink.receiver.y, receiverPoint.y);
  assert.equal(receiverFront.x, receiverPoint.x);
  assert.equal(receiverFront.y, receiverPoint.y);
  assert.equal(receivingMarker.x, receiverPoint.x);
  assert.equal(receivingMarker.y, receiverPoint.y);
  assert.equal(synchronization.isSynchronized, true);
  assertNear(synchronization.timeError, 0);
  assertNear(synchronization.distanceError, 0);
});

test("causal delay feedback draft path edits mark prior solver wake diagnostics stale", () => {
  const { runtime, readout } = createRuntimeForReadout();
  const wakeLink = runtime.dataset.wakeLinks.find((link) => link.label === "red 1 -> blue 2");
  Object.assign(wakeLink, {
    solverRunId: "central-solved-red1-blue2",
    rootCount: 1,
    solverHitCount: 1,
    solverHitTime: 0.25,
    solverResidual: 0,
  });

  const didEdit = runtime.applyRetainedPointDrag("electrino", 2, { x: 28, y: -16 });
  const visualWeight = runtime.getWakeVisualWeight(wakeLink);
  const hit = runtime.createWakeHit(wakeLink, 0);
  runtime.selectedItem = hit.selection;
  runtime.updateReadout(hit);
  const readoutText = readout.children.map((child) => child.textContent);

  assert.equal(didEdit, true);
  assert.equal(runtime.getWakeStatus(wakeLink).status, "stale");
  assert.equal(runtime.getWakeStatus(wakeLink).reason, "retained_point_drag_preview");
  assert.equal(wakeLink.staleSolverRunId, "central-solved-red1-blue2");
  assert.equal(wakeLink.staleReplaySource, runtime.dataset.runId);
  assert.equal(visualWeight.alphaScale, 0.24);
  assert.equal(visualWeight.radiusScale, 0.62);
  assert.equal(visualWeight.desaturation, 0.7);
  assert(readoutText.includes("state=stale"));
  assert(readoutText.includes("reason=retained_point_drag_preview"));
  assert(readoutText.includes("solver=stale"));
  assert(readoutText.includes("roots=1"));
  assert(readoutText.includes("hits=1"));
});

test("causal delay feedback aggregate summary separates stale solver rows from rejected rows", () => {
  const { runtime, readout } = createRuntimeForReadout();
  const staleLink = runtime.dataset.wakeLinks[0];
  Object.assign(staleLink, {
    solverRunId: "central-solved-red1-blue2",
    rootCount: 1,
    solverHitCount: 1,
  });

  runtime.applyRetainedPointDrag("electrino", 2, { x: 12, y: -10 });
  const summary = runtime.getContributionSummary(0.5);
  runtime.updateReadout(runtime.createContributionSummaryHit(0.5));
  const readoutText = readout.children.map((child) => child.textContent);

  assert.equal(summary.linkCount, 2);
  assert.equal(summary.activeLinkCount, 2);
  assert.equal(summary.staleCount, 0);
  assert.equal(summary.rejectedCount, 0);
  assert.equal(summary.receivedCount, 2);
  assert.deepEqual(summary.invalidReasonCounts, {});
  assert.equal(readout.children[2].textContent, "received=2/2");
  assert.equal(readoutText.includes("stale=1"), false);
  assert.equal(readoutText.some((text) => text.startsWith("why=stale:")), false);
});

test("causal delay feedback retained point drag marks the replay as a draft preview", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = { replayStatus };

  const didEdit = runtime.applyRetainedPointDrag("electrino", 2, { x: 18, y: -11 });

  assert.equal(didEdit, true);
  assert.equal(runtime.dataset.datasetSource, DIRECT_MANIPULATION_DRAFT_PREVIEW);
  assert.equal(runtime.dataset.draftPreview.reason, "retained_point_drag_preview");
  assert.equal(runtime.dataset.draftPreview.authoritative, false);
  assert.equal(runtime.replayLoadState, "draft");
  assert.equal(replayStatus.textContent, "draft preview");
  assert.equal(replayStatus.dataset.state, "draft");
});

test("causal delay feedback path start history drag updates setup and replay preview", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = { replayStatus };
  const condition = runtime.dataset.initialConditions.positrino;
  const pathStart = runtime.dataset.paths.positrino[0];
  const historyPoint = runtime.dataset.history.positrino[0];
  const before = {
    conditionX: condition.x,
    conditionY: condition.y,
    pathX: pathStart.x,
    historyX: historyPoint.x,
  };

  const didEdit = runtime.applyRetainedPointDrag("positrino", 1, { x: 56, y: -18 });

  assert.equal(didEdit, true);
  assert.equal(condition.x, before.conditionX + 56);
  assert.equal(condition.y, before.conditionY - 18);
  assert.equal(pathStart.x, before.pathX + 56);
  assert.equal(historyPoint.x, before.historyX + 56);
  assert.equal(runtime.dataset.datasetSource, DIRECT_MANIPULATION_DRAFT_PREVIEW);
  assert.equal(runtime.dataset.draftPreview.reason, "retained_point_drag_preview");
  assert.equal(runtime.replayRequestOptions.initialConditions.positrino.x, condition.x);
  assert.equal(runtime.replayRequestOptions.replayDataset, runtime.dataset);
  assert.equal(replayStatus.textContent, "draft preview");
});

test("causal delay feedback initial velocity drag updates setup and bends the preview path", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = { replayStatus };
  const condition = runtime.dataset.initialConditions.positrino;
  const velocityEnd = runtime.initialConditionVelocityEnd(condition);
  const pathStart = runtime.dataset.paths.positrino[0];
  const laterPoint = runtime.dataset.history.positrino.find((point) => point.depth === 5);
  const before = {
    vx: condition.vx,
    vy: condition.vy,
    conditionX: condition.x,
    conditionY: condition.y,
    pathStartX: pathStart.x,
    pathStartY: pathStart.y,
    laterX: laterPoint.x,
    laterY: laterPoint.y,
  };

  const didEdit = runtime.applyInitialVelocityDrag("positrino", {
    x: velocityEnd.x + 28,
    y: velocityEnd.y - 14,
  });

  assert.equal(didEdit, true);
  assertNear(condition.vx, before.vx + 700);
  assertNear(condition.vy, before.vy - 350);
  assert.equal(condition.x, before.conditionX);
  assert.equal(condition.y, before.conditionY);
  assert.equal(pathStart.x, before.pathStartX);
  assert.equal(pathStart.y, before.pathStartY);
  assert(laterPoint.x > before.laterX + 100);
  assert(laterPoint.y < before.laterY - 50);
  assert.equal(runtime.dataset.datasetSource, DIRECT_MANIPULATION_DRAFT_PREVIEW);
  assert.equal(runtime.dataset.draftPreview.reason, "initial_velocity_drag_preview");
  assertNear(runtime.replayRequestOptions.initialConditions.positrino.vx, condition.vx);
  assert.equal(runtime.replayRequestOptions.replayDataset, runtime.dataset);
  assert.equal(replayStatus.textContent, "draft preview");
});

test("causal delay feedback edit release keeps a local draft and never invokes the replay adapter", async () => {
  let adapterCalls = 0;
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    replayAdapter: {
      id: EOM_REPLAY_ADAPTER,
      async createReplayAsync() {
        adapterCalls += 1;
        return createMockEomReplayDataset("accepted_tight_bright");
      },
    },
    autoLoadReplay: false,
  });
  runtime.dom = { replayStatus: new FakeElement() };
  const anchor = runtime.dataset.paths.positrino[82];

  runtime.applyPathLineDrag("positrino", anchor.t, { x: 26, y: -31 });
  runtime.dragState = { type: "path-line", kind: "positrino", anchorT: anchor.t, didEdit: true };
  await runtime.finishDrag();

  assert.equal(adapterCalls, 0);
  assert.equal(runtime.dataset.datasetSource, DIRECT_MANIPULATION_DRAFT_PREVIEW);
  assert.equal(runtime.replayLoadState, "draft");
  assert.equal(runtime.dataset.draftPreview.reason, "path_line_drag_preview");
});

test("causal delay feedback no-op retained point drag does not mark a draft preview", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = { replayStatus };

  const didEdit = runtime.applyRetainedPointDrag("electrino", 2, { x: 0, y: 0 });

  assert.equal(didEdit, false);
  assert.equal(runtime.dataset.datasetSource, "representative_mock_solver_replay");
  assert.notEqual(runtime.replayLoadState, "draft");
  assert.equal(replayStatus.textContent, "");
});

test("causal delay feedback live marker follows the edited replay path", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const pathPoint = runtime.dataset.history.positrino.find((point) => point.depth === 2);
  const before = runtime.getReplayPathPoint("positrino", pathPoint.t);

  runtime.deformPathAroundHistoryPoint("positrino", 2, { x: 34, y: 22 });
  const after = runtime.getReplayPathPoint("positrino", pathPoint.t);

  assert(after.x > before.x + 28);
  assert(after.y > before.y + 18);
});

test("causal delay feedback live marker reaches retained path point at the point time", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const pathPoint = runtime.dataset.history.electrino.find((point) => point.depth === 2);
  const livePoint = runtime.getReplayPathPoint("electrino", pathPoint.t);

  assert.equal(livePoint.x, pathPoint.x);
  assert.equal(livePoint.y, pathPoint.y);
});

test("causal delay feedback live marker labels are centered above and below the moving dots", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const circles = [];
  const labels = [];
  const currentEmissionDots = [];
  runtime.drawCircle = (_ctx, _point, radius, fill) => {
    circles.push({ radius, fill });
  };
  runtime.drawScreenText = (_ctx, text, point, _size, color, align) => {
    labels.push({ text, point, color, align });
  };
  runtime.drawStoryEmissionOriginMarker = (_ctx, point) => {
    currentEmissionDots.push(point);
  };
  const replayTime = 0.42;
  const positrinoScreen = runtime.worldToScreen(runtime.getTraversalPathPoint("positrino", replayTime));
  const electrinoScreen = runtime.worldToScreen(runtime.getTraversalPathPoint("electrino", replayTime));

  runtime.drawLiveMarkers({}, replayTime);

  assert.deepEqual(
    labels.map((label) => ({ text: label.text, align: label.align })),
    [
      { text: "positrino", align: "center" },
      { text: "electrino", align: "center" },
    ],
  );
  assertNear(labels[0].point.x, positrinoScreen.x);
  assert(labels[0].point.y < positrinoScreen.y - 20 * runtime.viewport.scale);
  assertNear(labels[1].point.x, electrinoScreen.x);
  assert(labels[1].point.y > electrinoScreen.y + 20 * runtime.viewport.scale);
  assert.deepEqual(
    currentEmissionDots,
    [
      runtime.getTraversalPathPoint("positrino", replayTime),
      runtime.getTraversalPathPoint("electrino", replayTime),
    ],
  );
  assert.deepEqual(labels[0].color, { r: 255, g: 0, b: 0, a: 0.9 });
  assert.deepEqual(labels[1].color, { r: 143, g: 143, b: 255, a: 1 });
  assert.deepEqual(circles[3].fill, { r: 0, g: 0, b: 255, a: 1 });
});

test("causal delay feedback path deformation updates detached frame samples", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dataset.frames = runtime.dataset.frames.map((frame) => ({
    ...frame,
    positrino: { ...frame.positrino },
    electrino: { ...frame.electrino },
  }));
  const pathPoint = runtime.dataset.history.electrino.find((point) => point.depth === 2);
  const frame = runtime.dataset.frames.reduce((nearest, candidate) => (
    Math.abs(candidate.t - pathPoint.t) < Math.abs(nearest.t - pathPoint.t) ? candidate : nearest
  ));
  const before = { x: frame.electrino.x, y: frame.electrino.y };

  runtime.deformPathAroundHistoryPoint("electrino", 2, { x: 40, y: -25 });

  assert(frame.electrino.x > before.x + 34);
  assert(frame.electrino.y < before.y - 21);
});

test("causal delay feedback spacebar toggles play state", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    initialMode: "sandbox",
    window: fakeWindow,
  });
  runtime.dom = {
    playButton: {
      dataset: {},
      setAttribute() {},
    },
  };
  let prevented = false;

  runtime.handleKeyDown({
    key: " ",
    code: "Space",
    target: { tagName: "CANVAS" },
    preventDefault() {
      prevented = true;
    },
  });

  assert.equal(prevented, true);
  assert.equal(runtime.isPlaying, false);
});

test("causal delay feedback play-pause toggle follows the shared transport state", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const playButton = new FakeElement();
  const resetButton = new FakeElement();
  runtime.dom = { playButton, resetButton };

  runtime.setPlaying(true);

  assert.equal(playButton.attributes["aria-label"], "Pause replay");
  assert.equal(playButton.attributes["aria-pressed"], "true");
  assert.match(playButton.innerHTML, /data-transport-icon="pause"/);
  assert.match(playButton.innerHTML, /M8 5v14/);
  assert.match(resetButton.innerHTML, /data-transport-icon="first-frame"/);

  runtime.setPlaying(false);

  assert.equal(playButton.attributes["aria-label"], "Resume replay");
  assert.equal(playButton.attributes["aria-pressed"], "false");
  assert.equal(playButton.attributes["aria-keyshortcuts"], "Space");
  assert.match(playButton.innerHTML, /data-transport-icon="play"/);

  const pausedTime = runtime.storyHeldFrame.replayTime;
  runtime.setPlaying(true);

  assert.equal(playButton.attributes["aria-label"], "Pause replay");
  assertNear(
    runtime.getStoryPlaybackFrame(runtime.storyPlaybackScene).replayTime,
    pausedTime,
  );
});

test("causal delay feedback destroy removes every runtime listener and invalidates pending loads", () => {
  const documentLike = new FakeDocument();
  const windowLike = new FakeElement();
  Object.assign(windowLike, {
    location: fakeWindow.location,
    performance: { now: () => 0 },
    cancelAnimationFrame() {},
  });
  const runtime = createCausalDelayFeedbackRuntime({
    document: documentLike,
    window: windowLike,
    autoLoadReplay: false,
  });
  runtime.dom = {
    playButton: new FakeElement(),
    resetButton: new FakeElement(),
    lastFrameButton: new FakeElement(),
    visualSwitches: new FakeElement(),
    nowInput: new FakeElement(),
    canvas: new FakeElement(),
  };

  runtime.bindEvents();
  const sequenceBeforeDestroy = runtime.replayLoadSequence;
  assert.ok(runtime.eventListeners.length > 3);

  runtime.destroy();

  assert.equal(runtime.eventListeners.length, 0);
  assert.equal(runtime.replayLoadSequence, sequenceBeforeDestroy + 1);
  assert.ok([...windowLike.listeners.values()].every((listeners) => listeners.size === 0));
  assert.ok([...documentLike.listeners.values()].every((listeners) => listeners.size === 0));
  assert.ok(
    Object.values(runtime.dom).every(
      (element) => [...element.listeners.values()].every((listeners) => listeners.size === 0),
    ),
  );
});

test("causal delay feedback spacebar leaves native controls alone", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    initialMode: "sandbox",
    window: fakeWindow,
  });
  let prevented = false;

  runtime.handleKeyDown({
    key: " ",
    code: "Space",
    target: { tagName: "SELECT" },
    preventDefault() {
      prevented = true;
    },
  });

  assert.equal(prevented, false);
  assert.equal(runtime.isPlaying, true);
});

test("causal delay feedback spacebar toggles play even when a toolbar button has focus", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    initialMode: "sandbox",
    window: fakeWindow,
  });
  runtime.dom = {
    playButton: {
      dataset: {},
      setAttribute() {},
    },
  };
  let prevented = false;

  runtime.handleKeyDown({
    key: " ",
    code: "Space",
    target: { tagName: "BUTTON" },
    preventDefault() {
      prevented = true;
    },
  });

  assert.equal(prevented, true);
  assert.equal(runtime.isPlaying, false);
});

test("causal delay feedback arrow keys pause and step solver replay frames", () => {
  const nowInput = new FakeElement();
  const nowValue = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = {
    playButton: new FakeElement(),
    nowInput,
    nowValue,
    readout: new FakeElement(),
  };
  const frameTimes = runtime.getReplayFrameStepTimes();
  let prevented = false;

  runtime.setCurrentReplayTime(frameTimes[0]);
  runtime.handleKeyDown({
    key: "ArrowRight",
    code: "ArrowRight",
    target: { tagName: "CANVAS" },
    preventDefault() {
      prevented = true;
    },
  });

  assert.equal(prevented, true);
  assert.equal(runtime.isPlaying, false);
  assertNear(runtime.getCurrentReplayTime(), frameTimes[1]);
  assert.equal(nowValue.textContent, `Replay time ${formatTestCompactNumber(frameTimes[1])}`);
  assert.equal(
    nowInput.attributes["aria-valuetext"],
    `Replay time ${formatTestCompactNumber(frameTimes[1])}`,
  );

  prevented = false;
  runtime.handleKeyDown({
    key: "ArrowLeft",
    code: "ArrowLeft",
    target: { tagName: "CANVAS" },
    preventDefault() {
      prevented = true;
    },
  });

  assert.equal(prevented, true);
  assertNear(runtime.getCurrentReplayTime(), frameTimes[0]);
});

test("causal delay feedback arrow keys leave native controls alone", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    initialMode: "sandbox",
    window: fakeWindow,
  });
  const beforeTime = runtime.getCurrentReplayTime();
  let prevented = false;

  runtime.handleKeyDown({
    key: "ArrowRight",
    code: "ArrowRight",
    target: { tagName: "INPUT" },
    preventDefault() {
      prevented = true;
    },
  });

  assert.equal(prevented, false);
  assert.equal(runtime.isPlaying, true);
  assertNear(runtime.getCurrentReplayTime(), beforeTime);
});

test("causal delay feedback ignores removed display-setting query parameters", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: {
      location: {
        href:
          "http://localhost/causal-delay-feedback.html?preset=full_circular_arcs" +
          "&canvas=warm&animationSpeed=1.75&architrinoSpeed=9",
      },
    },
  });

  assert.equal("presetId" in runtime, false);
  assert.equal("canvasColorId" in runtime, false);
  assert.equal("architrinoSpeedIndex" in runtime, false);
  assert.equal(runtime.fieldSpeedScale, 1);
  assert.equal(runtime.dataset.wakeArcDisplayMode, "partial_propagating_arcs");
  assert.equal(runtime.wakeVisualSettings.fullCircularWakesEnabled, false);
  assert.equal(runtime.wakeVisualSettings.arcWakesEnabled, true);
});
