import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { createCausalDelayFeedbackRuntime } from "../src/apps/causal-delay-feedback/CausalDelayFeedbackRuntime.js";
import {
  CENTRAL_SOLVER_APP_PLAYBACK_REPLAY_MODE,
  CENTRAL_SOLVER_REPLAY_ADAPTER,
  CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
  CENTRAL_SOLVER_MOTION_REPLAY_MODE,
  CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackCentralBridgeAdapter.js";
import {
  CANVAS_COLORS,
  DESIGN_WIDTH,
  DIRECT_MANIPULATION_DRAFT_PREVIEW,
  PRESETS,
  REPRESENTATIVE_MOCK_SOLVER_REPLAY,
  TEMPORARY_MOCK_ADAPTER,
  createMockCausalDelayReplayDataset,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackReplayAdapter.js";
import {
  createCausalDelayFeedbackInitialReplayRequestOptions,
  createCausalDelayFeedbackRuntimeForPage,
  getCentralBridgeReplayMode,
  shouldUseCentralBridgeReplay,
} from "../src/apps/causal-delay-feedback/main.js";
import {
  createCausalDelayFeedbackDefaultSolverWasmBaseUrl,
  createCausalDelayFeedbackDefaultSolverWasmLoaderUrl,
  createCausalDelayFeedbackSolverBridgeOptions,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackSolverBridgeOptions.js";

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
}

class FakeDocument {
  createElement() {
    return new FakeElement();
  }
}

const fakeWindow = Object.freeze({
  location: { href: "http://localhost/causal-delay-feedback.html" },
});

function assertNear(actual, expected, epsilon = 1e-9) {
  assert.ok(Math.abs(actual - expected) <= epsilon, `${actual} should be near ${expected}`);
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
  assert.equal(readout.children[10].textContent, "partial arc");
});

test("causal delay feedback wake hover shows timing and contribution diagnostics", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const hoverLabel = new FakeElement();
  runtime.dom = {
    canvas: { getBoundingClientRect: () => ({ left: 0, top: 0 }) },
    hoverLabel,
  };
  const link = runtime.dataset.wakeLinks[0];
  const endpoints = runtime.getWakeEndpoints(link);
  const midpoint = runtime.worldToScreen({
    x: (endpoints.source.x + endpoints.receiver.x) * 0.5,
    y: (endpoints.source.y + endpoints.receiver.y) * 0.5,
  });

  runtime.updateHoverLabel({ clientX: midpoint.x, clientY: midpoint.y });

  assert.equal(hoverLabel.hidden, false);
  assert.match(hoverLabel.textContent, /^red 1 -> blue 2/);
  assert(hoverLabel.textContent.includes("emit=0.00"));
  assert(hoverLabel.textContent.includes("hit=0.08"));
  assert(hoverLabel.textContent.includes("travel=0.08"));
  assert(hoverLabel.textContent.includes("contrib="));
});

test("causal delay feedback path point hover stays compact", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const hoverLabel = new FakeElement();
  runtime.dom = {
    canvas: { getBoundingClientRect: () => ({ left: 0, top: 0 }) },
    hoverLabel,
  };
  const point = runtime.dataset.history.positrino[0];
  const screen = runtime.worldToScreen(point);

  runtime.updateHoverLabel({ clientX: screen.x, clientY: screen.y });

  assert.equal(hoverLabel.hidden, false);
  assert.equal(hoverLabel.textContent, "positrino 1");
});

test("causal delay feedback wake readout includes central solver diagnostics", () => {
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
      "partial arc",
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
    ["state=rejected", "reason=no_delayed_hit", "solver=unresolved", "roots=0", "hits=0", "partial arc"],
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
  const firstLink = runtime.dataset.wakeLinks[0];
  const receiverPoint = runtime.dataset.history[firstLink.receiverKind].find(
    (point) => point.depth === firstLink.receiverDepth,
  );
  const [start, end] = runtime.getReplayTimeRange();
  runtime.elapsedSeconds = ((receiverPoint.t + 0.01 - start) / (end - start)) * 9;

  runtime.updateReadout();
  const summary = runtime.getContributionSummary(runtime.getCurrentReplayTime());

  assert.equal(readout.hidden, true);
  assert.equal(readout.children.length, 0);
  assert.equal(summary.receivedCount, 2);
  assert.equal(summary.inFlightCount, 2);
  assert.equal(summary.pendingCount, 6);
  assert(summary.positiveContribution > 0);
  assert(summary.negativeContribution < 0);
  assert.equal(summary.netContribution, summary.positiveContribution + summary.negativeContribution);
});

test("causal delay feedback aggregate summary names an empty active wake set", () => {
  const { runtime, readout } = createRuntimeForReadout();
  runtime.dataset.wakeLinks = [];

  const summary = runtime.getContributionSummary(0.5);
  runtime.updateReadout(runtime.createContributionSummaryHit(0.5));
  const readoutText = readout.children.map((child) => child.textContent);

  assert.equal(summary.linkCount, 0);
  assert.equal(summary.activeLinkCount, 0);
  assert.equal(summary.emptyReason, "no_wake_links");
  assert.equal(readout.hidden, false);
  assert.equal(readout.children[0].textContent, "feedback sum");
  assert(readoutText.includes("received=0/0"));
  assert(readoutText.includes("why=no_wake_links"));
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
  assert.equal(nowValue.textContent, "t=0.5");
  assertNear(runtime.getCurrentReplayTime(), 0.5);
  assertNear(renderedTime, 0.5);
  assert.equal(readout.hidden, true);
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
  const link = runtime.dataset.wakeLinks[0];
  runtime.selectedItem = { type: "wake", linkId: link.id };

  runtime.setReplayNowSliderValue(1000);

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
  const link = runtime.dataset.wakeLinks[0];
  runtime.selectedItem = { type: "wake", linkId: link.id };
  runtime.setReplayNowSliderValue(1000);

  runtime.resetReplayTime();
  const readoutText = readout.children.map((child) => child.textContent);

  assert.equal(runtime.isPlaying, true);
  assert.equal(nowInput.value, "0");
  assert.equal(nowValue.textContent, "t=0");
  assert.equal(readout.hidden, false);
  assert.equal(readoutText.includes("received"), false);
});

test("causal delay feedback reset preset restores the loaded preset state", async () => {
  const replayStatus = new FakeElement();
  const settingsPanel = new FakeElement();
  const settingsButton = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = {
    replayStatus,
    settingsPanel,
    settingsButton,
  };
  settingsPanel.hidden = false;
  const expectedDataset = createMockCausalDelayReplayDataset(runtime.presetId);
  const expectedStart = expectedDataset.history.positrino.find((point) => point.depth === 1);

  runtime.applyRetainedPointDrag("positrino", 1, { x: 56, y: -18 });
  assert.equal(runtime.dataset.datasetSource, DIRECT_MANIPULATION_DRAFT_PREVIEW);
  assert.notEqual(runtime.dataset.history.positrino.find((point) => point.depth === 1).x, expectedStart.x);

  await runtime.resetPreset();
  const resetStart = runtime.dataset.history.positrino.find((point) => point.depth === 1);

  assert.equal(settingsPanel.hidden, true);
  assert.equal(settingsButton.attributes["aria-expanded"], "false");
  assert.equal(runtime.dataset.datasetSource, REPRESENTATIVE_MOCK_SOLVER_REPLAY);
  assert.equal(runtime.replayLoadState, "ready");
  assert.equal(replayStatus.textContent, "representative replay");
  assert.equal(resetStart.x, expectedStart.x);
  assert.equal(resetStart.y, expectedStart.y);
  assert.equal(runtime.dataset.draftPreview, undefined);
});

test("causal delay feedback reset preset reloads the current preset through the central adapter", async () => {
  const replayStatus = new FakeElement();
  const settingsPanel = new FakeElement();
  const settingsButton = new FakeElement();
  const loadedPresets = [];
  const adapter = {
    id: CENTRAL_SOLVER_REPLAY_ADAPTER,
    async createReplayAsync({ presetId }) {
      loadedPresets.push(presetId);
      return {
        ...createMockCausalDelayReplayDataset(presetId),
        runId: `central:${presetId}:${loadedPresets.length}`,
        datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
        solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
      };
    },
  };
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    replayAdapter: adapter,
    autoLoadReplay: false,
  });
  runtime.dom = {
    replayStatus,
    settingsPanel,
    settingsButton,
  };

  await runtime.setPreset("full_circular_arcs");
  const firstCentralRunId = runtime.dataset.runId;
  runtime.applyRetainedPointDrag("electrino", 2, { x: 28, y: -16 });

  await runtime.resetPreset();

  assert.deepEqual(loadedPresets, ["full_circular_arcs", "full_circular_arcs"]);
  assert.equal(runtime.presetId, "full_circular_arcs");
  assert.equal(runtime.dataset.datasetSource, CENTRAL_SOLVER_REPLAY_DATASET_SOURCE);
  assert.equal(runtime.dataset.solverIntegrationPath, CENTRAL_SOLVER_REPLAY_ADAPTER);
  assert.notEqual(runtime.dataset.runId, firstCentralRunId);
  assert.equal(runtime.dataset.draftPreview, undefined);
  assert.equal(replayStatus.textContent, "solver bridge replay");
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
  runtime.drawLine = (_ctx, _points, color, width) => {
    pathLines.push({ color, width });
  };

  runtime.drawPathTrail({}, "positrino", { r: 255, g: 0, b: 0, a: 1 });
  runtime.drawPathTrail({}, "electrino", { r: 0, g: 0, b: 255, a: 1 });

  assert.deepEqual(pathLines, [
    { color: { r: 255, g: 0, b: 0, a: 1 }, width: 5 },
    { color: { r: 0, g: 0, b: 255, a: 1 }, width: 5 },
  ]);
});

test("causal delay feedback background depth field remains an internal render option", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = {
    weakContributionCueInput: new FakeElement(),
  };
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

test("causal delay feedback weak contribution cue can disable threshold-only wake fading", () => {
  const weakContributionCueInput = new FakeElement();
  const settingsButton = new FakeElement();
  const settingsPanel = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  settingsPanel.hidden = false;
  runtime.dom = {
    weakContributionCueInput,
    settingsButton,
    settingsPanel,
  };
  runtime.dataset.assemblyThreshold = 1;
  const link = runtime.dataset.wakeLinks[0];
  const thresholdCueWeight = runtime.getWakeVisualWeight(link);

  runtime.setWeakContributionCueMode("off");
  const uncuedWeight = runtime.getWakeVisualWeight(link);

  assert.equal(weakContributionCueInput.value, "off");
  assert.equal(runtime.getWakeThresholdState(link), "below_threshold");
  assert(thresholdCueWeight.alphaScale < uncuedWeight.alphaScale);
  assert(thresholdCueWeight.radiusScale < uncuedWeight.radiusScale);
  assert(thresholdCueWeight.desaturation > uncuedWeight.desaturation);
  assert.equal(uncuedWeight.alphaScale, 1);
  assert.equal(uncuedWeight.radiusScale, 1);
  assert.equal(uncuedWeight.desaturation, 0);
  assert.equal(settingsPanel.hidden, true);
  assert.equal(settingsButton.attributes["aria-expanded"], "false");
});

test("causal delay feedback aggregate summary excludes rejected solver links", () => {
  const { runtime, readout } = createRuntimeForReadout();
  const rejectedLink = runtime.dataset.wakeLinks[0];
  const receiverPoint = runtime.dataset.history[rejectedLink.receiverKind].find(
    (point) => point.depth === rejectedLink.receiverDepth,
  );
  Object.assign(rejectedLink, {
    solverRunId: "causal-delay-feedback-rejected-red1-blue2-delayed-hit",
    rootCount: 0,
    solverHitCount: 0,
  });
  const summary = runtime.getContributionSummary(receiverPoint.t + 0.01);

  runtime.updateReadout(runtime.createContributionSummaryHit(receiverPoint.t + 0.01));

  assert.equal(summary.activeLinkCount, 9);
  assert.equal(summary.receivedCount, 1);
  assert.equal(summary.inFlightCount, 2);
  assert.equal(summary.pendingCount, 6);
  assert.equal(summary.rejectedCount, 1);
  assert.equal(summary.strongestContributionLabel, "blue 1 -> red 2");
  assert(summary.strongestContribution < 0);
  assert.equal(summary.strongestContributionMagnitude, Math.abs(summary.strongestContribution));
  assert.deepEqual(summary.invalidReasonCounts, { "rejected:no_delayed_hit": 1 });
  assert.equal(readout.children[2].textContent, "received=1/9");
  assert(readout.children.map((child) => child.textContent).some((text) => text.startsWith("strongest=blue_1_->_red_2:")));
  assert.equal(readout.children[readout.children.length - 2].textContent, "rejected=1");
  assert.equal(readout.children[readout.children.length - 1].textContent, "why=rejected:no_delayed_hitx1");
});

test("causal delay feedback wake-front cadence is fixed and not preset configurable", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const contrastRuntime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: {
      location: { href: "http://localhost/causal-delay-feedback.html?preset=contrast_stress&replay=mock" },
    },
  });
  const link = runtime.dataset.wakeLinks[0];
  const contrastLink = contrastRuntime.dataset.wakeLinks[0];
  const receiverPoint = runtime.dataset.history[link.receiverKind].find((point) => point.depth === link.receiverDepth);
  const contrastReceiverPoint = contrastRuntime.dataset.history[contrastLink.receiverKind].find(
    (point) => point.depth === contrastLink.receiverDepth,
  );

  assert(PRESETS.every((preset) => !("wakeBands" in preset)));
  assert.equal(runtime.getWakeFrontProgresses(runtime.getWakeTiming(link, receiverPoint.t)).length, 6);
  assert.equal(
    contrastRuntime.getWakeFrontProgresses(
      contrastRuntime.getWakeTiming(contrastLink, contrastReceiverPoint.t),
    ).length,
    6,
  );
});

test("causal delay feedback mock paths span five to ninety-five percent of the time axis", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const expectedStartX = DESIGN_WIDTH * 0.05;
  const expectedEndX = DESIGN_WIDTH * 0.95;

  ["positrino", "electrino"].forEach((kind) => {
    const points = runtime.dataset.paths[kind];
    assertNear(points[0].x, expectedStartX);
    assertNear(points.at(-1).x, expectedEndX);
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

test("causal delay feedback contrast stress preset exercises mixed purple-background states", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: {
      location: { href: "http://localhost/causal-delay-feedback.html?preset=contrast_stress" },
    },
  });
  const statuses = runtime.dataset.wakeLinks.map((link) => runtime.getWakeStatus(link).status);

  assert.equal(runtime.dataset.preset.id, "contrast_stress");
  assert.equal(runtime.dataset.canvasColorId, "architrinoPurple");
  assert.equal(runtime.dataset.assemblyThreshold, 0.00075);
  assert(statuses.includes("active"));
  assert(statuses.includes("inactive"));
  assert(statuses.includes("stale"));
  assert(statuses.includes("rejected"));
  assert.equal(runtime.dataset.wakeLinks[1].rootStatus.code, "contrast_root_without_hit");
  assert.equal(runtime.dataset.wakeLinks[2].reason, "contrast_stress_stale_solver_row");
  assert.equal(runtime.dataset.wakeLinks[3].rootStatus.code, "contrast_no_delayed_hit");
});

test("causal delay feedback aggregate summary surfaces compact invalid root reasons", () => {
  const { runtime, readout } = createRuntimeForReadout();
  runtime.applyReplayDataset(createMockCausalDelayReplayDataset("contrast_stress"), { loadState: "ready" });

  const summary = runtime.getContributionSummary(1);
  runtime.updateReadout(runtime.createContributionSummaryHit(1));
  const readoutText = readout.children.map((child) => child.textContent);

  assert.equal(summary.inactiveCount, 1);
  assert.equal(summary.staleCount, 1);
  assert.equal(summary.rejectedCount, 1);
  assert.deepEqual(summary.invalidReasonCounts, {
    "inactive:contrast_root_without_hit": 1,
    "stale:contrast_stress_stale_solver_row": 1,
    "rejected:contrast_no_delayed_hit": 1,
  });
  assert(readoutText.includes("inactive=1"));
  assert(readoutText.includes("stale=1"));
  assert(readoutText.includes("rejected=1"));
  assert(
    readoutText.includes(
      "why=inactive:contrast_root_without_hitx1,rejected:contrast_no_delayed_hitx1,stale:contrast_stress_stale_solver_rowx1",
    ),
  );
});

test("causal delay feedback aggregate summary surfaces compact pair solver diagnostics", () => {
  const { runtime, readout } = createRuntimeForReadout();
  runtime.dataset = {
    ...createMockCausalDelayReplayDataset("partial_arcs"),
    datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
    solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
    solverReplayMode: CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE,
    maxPathConstraintResidual: 0.004,
    pathConstraintFrameRefinementSampleCount: 15,
    pathConstraintGuidanceSampleCount: 12,
    pathConstraintGuidanceMode: "retained_knot_boundary",
    pathConstraintBoundaryMode: "law_aware_retained_knot_boundary",
    pathConstraintBoundarySeedMode: "law_aware_retained_knot_boundary_seed",
    pathConstraintBoundarySeedSampleCount: 18,
    pathConstraintBoundaryRelaxationMode: "finite_difference_frame_relaxation_v1",
    pathConstraintBoundaryRelaxationIterationCount: 8,
    pathConstraintBoundaryRelaxationAppliedIterationCount: 3,
    pathConstraintBoundaryRelaxationStopReason: "tolerance_reached",
    pathConstraintBoundaryRelaxationTolerance: 0.006,
    pathConstraintBoundaryRelaxationStepTolerance: 0.25,
    pathConstraintBoundaryRelaxationStatus: "converged",
    pathConstraintBoundaryRelaxationResidualEvidenceStatus: "aggregate_non_worsening",
    pathConstraintBoundaryRelaxationResidualMode: "causal_delay_pair_law",
    pathConstraintBoundaryRelaxationResidualRatio: 0.25,
    rmsPathConstraintBoundaryRelaxationResidualRatio: 0.125,
    pathConstraintBoundaryRelaxationResidualSettlingRate: 0.6299605249474366,
    rmsPathConstraintBoundaryRelaxationResidualSettlingRate: 0.5,
    rmsPathConstraintBoundaryRelaxationResidualAfter: 0.003,
    pathConstraintBoundaryRelaxationMaxStep: 7.25,
    pathConstraintBoundaryRelaxationFinalStepFactor: 0.5,
    pathConstraintBoundaryRelaxationCandidateVariantCount: 14,
    pathConstraintBoundaryRelaxationLineSearchTrialCount: 112,
    pathConstraintBoundaryRelaxationCandidateKindMask: 4194302,
    pathConstraintSolverStatus: "guided_constraint_path",
    pathConstraintSolverClaim: "diagnostic_constraint_replay_not_boundary_value_solve",
    pathConstraintPhysicalBoundarySolverStatus: "physical_boundary_solver_pending",
    pathConstraintPhysicalBoundarySolverClaim: "retained_knot_guidance_not_physical_boundary_value_solve",
    pathConstraintPhysicalBoundarySolverBlockingReason: "physical_boundary_solver_not_implemented",
    maxPathConstraintGuidanceAcceleration: 48.25,
    pathConstraintBoundaryResidualSampleCount: 10,
    pathConstraintBoundaryResidualStatus: "within_tolerance",
    pathConstraintBoundaryResidualTolerance: 0.02,
    maxPathConstraintBoundaryResidual: 0.018,
    pathConstraintInitialVelocityResidualSampleCount: 2,
    pathConstraintInitialVelocityResidualStatus: "within_tolerance",
    pathConstraintInitialVelocityResidualTolerance: 0.004,
    maxPathConstraintInitialVelocityResidual: 0.003,
  };

  runtime.updateReadout(runtime.createContributionSummaryHit(0.5));
  const readoutText = readout.children.map((child) => child.textContent);

  assert(readoutText.includes("refined=15"));
  assert(readoutText.includes("guide=retained_knot_boundary"));
  assert(readoutText.includes("bMode=law_aware_retained_knot_boundary"));
  assert(readoutText.includes("seed=law_aware_retained_knot_boundary_seed"));
  assert(readoutText.includes("seedRows=18"));
  assert(readoutText.includes("relax=finite_difference_frame_relaxation_v1"));
  assert(readoutText.includes("relaxIter=8"));
  assert(readoutText.includes("relaxApplied=3"));
  assert(readoutText.includes("relaxStop=tolerance_reached"));
  assert(readoutText.includes("relaxTol=0.006"));
  assert(readoutText.includes("relaxStepTol=0.25"));
  assert(readoutText.includes("relaxRatio=0.25"));
  assert(readoutText.includes("relaxRmsRatio=0.125"));
  assert(readoutText.includes("relaxRate=0.63"));
  assert(readoutText.includes("relaxRmsRate=0.5"));
  assert(readoutText.includes("relaxRms=0.003"));
  assert(readoutText.includes("relaxStep=7.25"));
  assert(readoutText.includes("relaxFactor=0.5"));
  assert(readoutText.includes("cand=14"));
  assert(readoutText.includes("trials=112"));
  assert(readoutText.includes("mask=0x3ffffe"));
  assert(readoutText.includes("relaxStatus=converged"));
  assert(readoutText.includes("relaxEvidence=aggregate_non_worsening"));
  assert(readoutText.includes("relaxLaw=causal_delay_pair_law"));
  assert(readoutText.includes("guideRows=12"));
  assert(readoutText.includes("maxA=48.25"));
  assert(readoutText.includes("constraint=guided_constraint_path"));
  assert(readoutText.includes("claim=diagnostic_constraint_replay_not_boundary_value_solve"));
  assert(readoutText.includes("physical=physical_boundary_solver_pending"));
  assert(readoutText.includes("physicalClaim=retained_knot_guidance_not_physical_boundary_value_solve"));
  assert(readoutText.includes("physicalWhy=physical_boundary_solver_not_implemented"));
  assert(readoutText.includes("boundary=10"));
  assert(readoutText.includes("maxB=0.018"));
  assert(readoutText.includes("tolB=0.02"));
  assert(readoutText.includes("bStatus=within_tolerance"));
  assert(readoutText.includes("initVelRows=2"));
  assert(readoutText.includes("initVelErr=0.003"));
  assert(readoutText.includes("initVelTol=0.004"));
  assert(readoutText.includes("initVelStatus=within_tolerance"));
  assert(readoutText.includes("solverResid=0.004"));
});

test("causal delay feedback canvas swatches match the iOS reader theme colors", () => {
  assert.deepEqual(
    CANVAS_COLORS.map(({ id, label, color }) => ({ id, label, color })),
    [
      { id: "architrinoPurple", label: "Purple", color: "#4b0082" },
      { id: "light", label: "Light", color: "#fdfdfd" },
      { id: "warm", label: "Warm", color: "#f4ecd8" },
      { id: "dark", label: "Dark", color: "#0f172a" },
    ],
  );
});

test("causal delay feedback settings sliders use themed range styling", () => {
  const html = readCausalDelayFeedbackHtml();

  assert.equal(html.includes(".causal-range::-webkit-slider-runnable-track"), true);
  assert.equal(html.includes(".causal-range::-webkit-slider-thumb"), true);
  assert.equal(html.includes(".causal-range::-moz-range-track"), true);
  assert.equal(html.includes(".causal-range::-moz-range-thumb"), true);
  assert.equal(html.includes("appearance: none;"), true);
  assert.equal(html.includes("background: #4ae5ff;"), false);
  assert.equal(html.includes("background: #f6f7ff;"), true);
  assert.equal(html.includes("c<sub>f</sub>"), true);
});

test("causal delay feedback settings popover includes reset preset without adding a toolbar control", () => {
  const html = readCausalDelayFeedbackHtml();

  assert.equal(html.includes('id="causal-delay-feedback-reset-preset"'), true);
  assert.equal(html.includes("Reset preset"), true);
  assert.equal(html.includes(".causal-settings-action"), true);
  assert.equal(html.includes('id="causal-delay-feedback-reduced-motion"'), false);
  assert.equal(html.includes("Reduced motion"), false);
  assert.equal(html.includes('id="causal-delay-feedback-high-contrast-paths"'), false);
  assert.equal(html.includes("High contrast paths"), false);
  assert.equal(html.includes('id="causal-delay-feedback-depth-field"'), false);
  assert.equal(html.includes("Depth field"), false);
  assert.equal(html.includes('id="causal-delay-feedback-virtual-observer"'), true);
  assert.equal(html.includes('id="causal-delay-feedback-weak-cue"'), true);
  assert.equal(html.includes('value="threshold_only"'), true);
  assert.equal(html.includes('value="off"'), true);
  assert.equal(html.includes(".causal-toggle-row"), true);
  assert.equal(html.includes(".causal-setting-select"), true);
  assert.equal(html.includes("Hide path history"), false);
  assert.equal(html.includes("Show path history"), false);
  assert.equal(html.includes("Paths on/off"), false);
  assert.equal(html.includes("Readout on/off"), false);
  assert.equal(html.includes("Feedback Links"), false);
  assert.equal(html.includes("trace count"), false);
  assert.equal(html.includes("Root Ledger"), false);
  assert.equal(html.includes("root ledger inspector"), false);
  assert.equal(html.includes("diagnostic table"), false);
  assert.equal(html.includes("diagnostics panel"), false);
});

test("causal delay feedback replay datasets can load preset canvas color state", () => {
  const colorSwatches = new FakeElement();
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = { colorSwatches, replayStatus };
  runtime.populateCanvasSwatches();

  runtime.applyReplayDataset(
    {
      ...createMockCausalDelayReplayDataset("accepted_tight_bright"),
      canvasColorId: "warm",
    },
    { loadState: "ready" },
  );

  assert.equal(runtime.canvasColorId, "warm");
  const activeSwatch = colorSwatches.children.find((button) => button.classList.contains("is-active"));
  assert.equal(activeSwatch.dataset.colorId, "warm");
});

test("causal delay feedback retained depth setting filters active history and wake rows on doubling options", () => {
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
  assert.equal(runtime.dataset.wakeLinks.length, 10);
  assert.equal(summary.linkCount, 6);
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

test("causal delay feedback retained depth controls use doubling options", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const historyDepthControls = new FakeElement();
  runtime.dom = { historyDepthControls };

  runtime.populateHistoryDepthControls();

  assert.deepEqual(
    historyDepthControls.children.map((button) => button.textContent),
    ["2", "4", "8", "16", "32", "64"],
  );
});

test("causal delay feedback c_f speed setting scales the replay clock", () => {
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
  runtime.setFieldSpeedScale(2);
  runtime.lastFrameTime = 984;

  runtime.tick(1000);

  assert.equal(runtime.fieldSpeedScale, 2);
  assertNear(runtime.elapsedSeconds, 0.032);
  assert.equal(runtime.replayRequestOptions.fieldSpeedScale, 2);
  assert.equal(scheduledFrames.length, 1);
});

test("causal delay feedback architrino speed setting uses the requested v over c_f sequence", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });

  assert.deepEqual(
    Array.from({ length: 10 }, (_, index) => runtime.getArchitrinoSpeedFraction(index)),
    [0.1, 0.3, 0.5, 0.7, 0.9, 0.99, 0.999, 0.9999, 0.99999, 0.999999],
  );
});

test("causal delay feedback architrino speed setting rescales initial velocity magnitudes", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = { replayStatus };
  const previousMagnitudes = Object.fromEntries(
    ["positrino", "electrino"].map((kind) => {
      const condition = runtime.getInitialCondition(kind);
      return [kind, Math.hypot(condition.vx, condition.vy)];
    }),
  );

  runtime.setArchitrinoSpeedIndex(5);

  assert.equal(runtime.getArchitrinoSpeedFraction(), 0.99);
  assert.equal(runtime.dataset.datasetSource, DIRECT_MANIPULATION_DRAFT_PREVIEW);
  assert.equal(runtime.dataset.draftPreview.reason, "architrino_speed_fraction_preview");
  assert.equal(runtime.replayLoadState, "draft");
  assert.equal(replayStatus.textContent, "draft preview");
  assert.equal(runtime.replayRequestOptions.architrinoSpeedFraction, 0.99);
  ["positrino", "electrino"].forEach((kind) => {
    const condition = runtime.getInitialCondition(kind);
    assertNear(Math.hypot(condition.vx, condition.vy), previousMagnitudes[kind] * (0.99 / 0.7));
  });
});

test("causal delay feedback replay keeps initial conditions synced to path start history", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });

  assert.equal(runtime.dataset.initialConditions.positrino.kind, "positrino");
  assert.equal(runtime.dataset.initialConditions.electrino.kind, "electrino");
  assert.equal(runtime.dataset.initialConditions.virtualObserver.label, "Virtual Observer");
  assert.equal(runtime.dataset.virtualObserver.x, runtime.dataset.initialConditions.virtualObserver.x);
  assert.equal(runtime.dataset.initialConditions.historyDepth, 6);
  assert.equal(runtime.replayRequestOptions.initialConditions.positrino.x, runtime.dataset.paths.positrino[0].x);
  assert.equal(runtime.replayRequestOptions.initialConditions.electrino.y, runtime.dataset.paths.electrino[0].y);
  assert.equal(runtime.replayRequestOptions.virtualObserver.x, runtime.dataset.virtualObserver.x);
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

test("causal delay feedback exposes a draggable Virtual Observer handle", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const hit = runtime.findNearestHit(runtime.worldToScreen(runtime.getVirtualObserver()));

  assert.equal(hit.type, "virtual-observer");
  assert.deepEqual(hit.selection, { type: "virtual-observer" });
  assert.equal(hit.title, "Virtual Observer");
});

test("causal delay feedback can hide the Virtual Observer handle", () => {
  const readout = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = {
    virtualObserverInput: new FakeElement(),
    readout,
  };
  runtime.selectedItem = { type: "virtual-observer" };

  runtime.setVirtualObserverVisible(false);
  const hit = runtime.findNearestHit(runtime.worldToScreen(runtime.getVirtualObserver()));

  assert.equal(runtime.virtualObserverVisible, false);
  assert.equal(runtime.selectedItem, null);
  assert.equal(hit, null);
  assert.equal(runtime.dom.virtualObserverInput.checked, false);
  assert.equal(readout.hidden, true);
});

test("causal delay feedback flips the Virtual Observer label away from the portrait right edge", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.viewport = { scale: 0.2, offsetX: 0, offsetY: 0 };
  runtime.canvasWidth = 390;

  const rightEdgePlacement = runtime.getVirtualObserverLabelPlacement({ x: 330, y: 420 });
  const centerPlacement = runtime.getVirtualObserverLabelPlacement({ x: 160, y: 420 });

  assert.equal(rightEdgePlacement.align, "right");
  assert(rightEdgePlacement.x < 330);
  assert.equal(centerPlacement.align, "left");
  assert(centerPlacement.x > 160);
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

test("causal delay feedback wheel zoom ignores selectable path objects", () => {
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

  assert.equal(prevented, false);
  assert.equal(runtime.viewport.scale, beforeScale);
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

test("causal delay feedback pinch does not start on selectable path objects", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = {
    canvas: {
      getBoundingClientRect: () => ({ left: 0, top: 0 }),
    },
    readout: new FakeElement(),
  };
  runtime.render = () => {};
  const pathPoint = runtime.dataset.history.positrino[0];
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
  assert.equal(runtime.dragState.type, "history");
  assert.equal(runtime.dragState.depth, 1);
});

test("causal delay feedback runtime loads an async bridge replay over the mock fallback", async () => {
  const replayStatus = new FakeElement();
  const adapter = {
    id: CENTRAL_SOLVER_REPLAY_ADAPTER,
    async createReplayAsync({ presetId }) {
      return {
        ...createMockCausalDelayReplayDataset(presetId),
        runId: `central:${presetId}`,
        datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
        solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
      };
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

  await runtime.setPreset("full_circular_arcs");

  assert.equal(runtime.dataset.runId, "central:full_circular_arcs");
  assert.equal(runtime.dataset.datasetSource, CENTRAL_SOLVER_REPLAY_DATASET_SOURCE);
  assert.equal(runtime.dataset.solverIntegrationPath, CENTRAL_SOLVER_REPLAY_ADAPTER);
  assert.equal(runtime.replayLoadState, "ready");
  assert.equal(runtime.replayLoadError, null);
  assert.equal(replayStatus.textContent, "solver bridge replay");
  assert.equal(replayStatus.dataset.state, "bridge");
});

test("causal delay feedback status distinguishes pair-interaction bridge replay", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dataset = {
    ...createMockCausalDelayReplayDataset("partial_arcs"),
    datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
    solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
    solverReplayMode: CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE,
    pairInteractionStepCount: 179,
    interactionLaw: "display_pair_attraction_v1",
    executionPath: "native_c_abi",
    maxPathConstraintResidual: 0.00125,
  };
  runtime.dom = { replayStatus };

  runtime.updateReplayStatus();

  assert.equal(replayStatus.textContent, "solver pair replay");
  assert.equal(replayStatus.dataset.state, "bridge");
  assert.match(replayStatus.title, /mutual pair-interaction path run/);
  assert.match(replayStatus.title, /steps=179/);
  assert.match(replayStatus.title, /path=native_c_abi/);
  assert.match(replayStatus.title, /residual=0\.001/);
  assert.match(replayStatus.title, /display_pair_attraction_v1/);
});

test("causal delay feedback status distinguishes constraint-guided pair replay", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dataset = {
    ...createMockCausalDelayReplayDataset("partial_arcs"),
    datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
    solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
    solverReplayMode: CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE,
    pairInteractionStepCount: 181,
    pathConstraintFrameRefinementSampleCount: 15,
    interactionLaw: "display_pair_attraction_v1",
    executionPath: "native_c_abi",
    maxPathConstraintResidual: 0.004,
    pathConstraintPositionResidualSampleCount: 12,
    pathConstraintPositionResidualStatus: "within_tolerance",
    pathConstraintPositionResidualTolerance: 0.003,
    maxPathConstraintPositionResidual: 0.002,
    pathConstraintInitialVelocityResidualSampleCount: 2,
    pathConstraintInitialVelocityResidualStatus: "within_tolerance",
    pathConstraintInitialVelocityResidualTolerance: 0.004,
    maxPathConstraintInitialVelocityResidual: 0.003,
    pathConstraintBoundaryResidualSampleCount: 10,
    pathConstraintBoundaryResidualStatus: "within_tolerance",
    pathConstraintBoundaryResidualTolerance: 0.02,
    maxPathConstraintBoundaryResidual: 0.018,
    pathConstraintGuidanceSampleCount: 12,
    pathConstraintGuidanceMode: "retained_knot_boundary",
    pathConstraintBoundaryMode: "law_aware_retained_knot_boundary",
    pathConstraintBoundarySeedMode: "law_aware_retained_knot_boundary_seed",
    pathConstraintBoundarySeedSampleCount: 18,
    pathConstraintBoundaryRelaxationMode: "finite_difference_frame_relaxation_v1",
    pathConstraintBoundaryRelaxationIterationCount: 8,
    pathConstraintBoundaryRelaxationAppliedIterationCount: 3,
    pathConstraintBoundaryRelaxationStopReason: "tolerance_reached",
    pathConstraintBoundaryRelaxationTolerance: 0.006,
    pathConstraintBoundaryRelaxationStatus: "converged",
    pathConstraintBoundaryRelaxationResidualEvidenceStatus: "aggregate_non_worsening",
    pathConstraintBoundaryRelaxationResidualMode: "causal_delay_pair_law",
    pathConstraintBoundaryRelaxationResidualRatio: 0.25,
    rmsPathConstraintBoundaryRelaxationResidualRatio: 0.125,
    pathConstraintBoundaryRelaxationResidualSettlingRate: 0.6299605249474366,
    rmsPathConstraintBoundaryRelaxationResidualSettlingRate: 0.5,
    rmsPathConstraintBoundaryRelaxationResidualAfter: 0.003,
    pathConstraintBoundaryRelaxationMaxStep: 7.25,
    pathConstraintBoundaryRelaxationFinalStepFactor: 0.5,
    pathConstraintBoundaryRelaxationCandidateVariantCount: 14,
    pathConstraintBoundaryRelaxationLineSearchTrialCount: 112,
    pathConstraintBoundaryRelaxationCandidateKindMask: 4194302,
    pathConstraintSolverStatus: "guided_constraint_path",
    pathConstraintSolverClaim: "diagnostic_constraint_replay_not_boundary_value_solve",
    maxPathConstraintGuidanceAcceleration: 48.25,
    pathConstraintGuidanceAccelerationStatus: "within_tolerance",
    pathConstraintGuidanceAccelerationTolerance: 50,
  };
  runtime.dom = { replayStatus };

  runtime.updateReplayStatus();

  assert.equal(replayStatus.textContent, "solver guided replay");
  assert.equal(replayStatus.dataset.state, "bridge-guided");
  assert.match(replayStatus.title, /refined=15/);
  assert.match(replayStatus.title, /posRows=12/);
  assert.match(replayStatus.title, /posErr=0\.002/);
  assert.match(replayStatus.title, /posTol=0\.003/);
  assert.match(replayStatus.title, /posStatus=within_tolerance/);
  assert.match(replayStatus.title, /initVelRows=2/);
  assert.match(replayStatus.title, /initVelErr=0\.003/);
  assert.match(replayStatus.title, /initVelTol=0\.004/);
  assert.match(replayStatus.title, /initVelStatus=within_tolerance/);
  assert.match(replayStatus.title, /boundary=10/);
  assert.match(replayStatus.title, /maxB=0\.018/);
  assert.match(replayStatus.title, /tolB=0\.02/);
  assert.match(replayStatus.title, /bStatus=within_tolerance/);
  assert.match(replayStatus.title, /bMode=law_aware_retained_knot_boundary/);
  assert.match(replayStatus.title, /seed=law_aware_retained_knot_boundary_seed/);
  assert.match(replayStatus.title, /seedRows=18/);
  assert.match(replayStatus.title, /relax=finite_difference_frame_relaxation_v1/);
  assert.match(replayStatus.title, /relaxIter=8/);
  assert.match(replayStatus.title, /relaxApplied=3/);
  assert.match(replayStatus.title, /relaxStop=tolerance_reached/);
  assert.match(replayStatus.title, /relaxTol=0\.006/);
  assert.match(replayStatus.title, /relaxRatio=0\.25/);
  assert.match(replayStatus.title, /relaxRmsRatio=0\.125/);
  assert.match(replayStatus.title, /relaxRate=0\.63/);
  assert.match(replayStatus.title, /relaxRmsRate=0\.5/);
  assert.match(replayStatus.title, /relaxStep=7\.25/);
  assert.match(replayStatus.title, /relaxFactor=0\.5/);
  assert.match(replayStatus.title, /relaxEvidence=aggregate_non_worsening/);
  assert.match(replayStatus.title, /relaxLaw=causal_delay_pair_law/);
  assert.match(replayStatus.title, /cand=14/);
  assert.match(replayStatus.title, /trials=112/);
  assert.match(replayStatus.title, /mask=0x3ffffe/);
  assert.match(replayStatus.title, /relaxStatus=converged/);
  assert.match(replayStatus.title, /guidance=12/);
  assert.match(replayStatus.title, /mode=retained_knot_boundary/);
  assert.match(replayStatus.title, /maxA=48\.25/);
  assert.match(replayStatus.title, /tolA=50/);
  assert.match(replayStatus.title, /aStatus=within_tolerance/);
  assert.match(replayStatus.title, /constraint=guided_constraint_path/);
  assert.match(replayStatus.title, /claim=diagnostic_constraint_replay_not_boundary_value_solve/);
  assert.match(replayStatus.title, /retained-knot boundary guidance/);
  assert.match(replayStatus.title, /not yet the final physical boundary-value path solve/);
});

test("causal delay feedback status names skipped boundary relaxation", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dataset = {
    ...createMockCausalDelayReplayDataset("partial_arcs"),
    datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
    solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
    solverReplayMode: CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE,
    pairInteractionStepCount: 181,
    interactionLaw: "display_pair_attraction_v1",
    executionPath: "native_c_abi",
    pathConstraintGuidanceSampleCount: 12,
    pathConstraintGuidanceMode: "retained_knot_boundary",
    pathConstraintBoundaryRelaxationMode: "finite_difference_frame_relaxation_v1",
    pathConstraintBoundaryRelaxationIterationCount: 0,
    pathConstraintBoundaryRelaxationAppliedIterationCount: 0,
    pathConstraintBoundaryRelaxationStopReason: "not_requested",
    pathConstraintBoundaryRelaxationStatus: "not_requested",
    pathConstraintSolverStatus: "guided_constraint_path",
    pathConstraintSolverClaim: "diagnostic_constraint_replay_not_boundary_value_solve",
  };
  runtime.dom = { replayStatus };

  runtime.updateReplayStatus();

  assert.equal(replayStatus.textContent, "solver guided replay");
  assert.equal(replayStatus.dataset.state, "bridge-guided");
  assert.match(replayStatus.title, /relaxIter=0/);
  assert.match(replayStatus.title, /relaxApplied=0/);
  assert.match(replayStatus.title, /relaxStop=not_requested/);
  assert.match(replayStatus.title, /relaxStatus=not_requested/);
  assert.match(replayStatus.title, /not yet the final physical boundary-value path solve/);
});

test("causal delay feedback status distinguishes boundary-seeded diagnostic replay", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dataset = {
    ...createMockCausalDelayReplayDataset("partial_arcs"),
    datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
    solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
    solverReplayMode: CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE,
    pairInteractionStepCount: 181,
    interactionLaw: "display_pair_attraction_v1",
    executionPath: "native_c_abi",
    maxPathConstraintResidual: 0.004,
    pathConstraintPositionResidualSampleCount: 12,
    pathConstraintPositionResidualStatus: "within_tolerance",
    maxPathConstraintPositionResidual: 0,
    pathConstraintGuidanceSampleCount: 0,
    pathConstraintBoundaryMode: "law_aware_retained_knot_boundary",
    pathConstraintBoundarySeedMode: "law_aware_retained_knot_boundary_seed",
    pathConstraintBoundarySeedSampleCount: 18,
    pathConstraintBoundaryRelaxationMode: "finite_difference_frame_relaxation_v1",
    pathConstraintBoundaryRelaxationIterationCount: 8,
    pathConstraintBoundaryRelaxationAppliedIterationCount: 8,
    pathConstraintBoundaryRelaxationStopReason: "iteration_budget_exhausted",
    pathConstraintBoundaryRelaxationStatus: "accepted",
    pathConstraintBoundaryRelaxationResidualEvidenceStatus: "aggregate_non_worsening",
    pathConstraintBoundaryRelaxationResidualRatio: 0.01,
    rmsPathConstraintBoundaryRelaxationResidualRatio: 0.02,
    rmsPathConstraintBoundaryRelaxationResidualAfter: 0.0003,
    pathConstraintSolverStatus: "boundary_seeded_constraint_path",
    pathConstraintSolverClaim: "diagnostic_constraint_replay_not_boundary_value_solve",
    pathConstraintPhysicalBoundarySolverStatus: "physical_boundary_solver_pending",
    pathConstraintPhysicalBoundarySolverClaim: "retained_knot_guidance_not_physical_boundary_value_solve",
    pathConstraintPhysicalBoundarySolverBlockingReason: "finite_difference_boundary_relaxation_not_converged",
    maxPathConstraintGuidanceAcceleration: 0,
  };
  runtime.dom = { replayStatus };

  runtime.updateReplayStatus();

  assert.equal(replayStatus.textContent, "solver boundary-seed replay");
  assert.equal(replayStatus.dataset.state, "bridge-boundary-seed");
  assert.match(replayStatus.title, /seed=law_aware_retained_knot_boundary_seed/);
  assert.match(replayStatus.title, /seedRows=18/);
  assert.match(replayStatus.title, /relaxStatus=accepted/);
  assert.match(replayStatus.title, /relaxEvidence=aggregate_non_worsening/);
  assert.match(replayStatus.title, /constraint=boundary_seeded_constraint_path/);
  assert.match(replayStatus.title, /physical=physical_boundary_solver_pending/);
  assert.match(replayStatus.title, /physicalWhy=finite_difference_boundary_relaxation_not_converged/);
  assert.match(replayStatus.title, /Retained path constraints were reseeded from the retained-knot boundary/);
  assert.match(replayStatus.title, /not yet the final physical boundary-value path solve/);
});

test("causal delay feedback status distinguishes converged discrete boundary replay", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dataset = {
    ...createMockCausalDelayReplayDataset("partial_arcs"),
    datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
    solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
    solverReplayMode: CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE,
    pairInteractionStepCount: 181,
    interactionLaw: "display_pair_attraction_v1",
    executionPath: "native_c_abi",
    maxPathConstraintResidual: 0.004,
    pathConstraintPositionResidualSampleCount: 12,
    pathConstraintPositionResidualStatus: "within_tolerance",
    pathConstraintPositionResidualTolerance: 0.003,
    maxPathConstraintPositionResidual: 0.002,
    pathConstraintBoundaryResidualSampleCount: 10,
    pathConstraintBoundaryResidualStatus: "within_tolerance",
    pathConstraintBoundaryResidualTolerance: 0.02,
    maxPathConstraintBoundaryResidual: 0.018,
    pathConstraintGuidanceSampleCount: 12,
    pathConstraintGuidanceMode: "retained_knot_boundary",
    pathConstraintBoundaryMode: "law_aware_retained_knot_boundary",
    pathConstraintBoundarySeedMode: "law_aware_retained_knot_boundary_seed",
    pathConstraintBoundarySeedSampleCount: 18,
    pathConstraintBoundaryRelaxationMode: "finite_difference_frame_relaxation_v1",
    pathConstraintBoundaryRelaxationIterationCount: 8,
    pathConstraintBoundaryRelaxationAppliedIterationCount: 3,
    pathConstraintBoundaryRelaxationStopReason: "tolerance_reached",
    pathConstraintBoundaryRelaxationTolerance: 0.006,
    pathConstraintBoundaryRelaxationStatus: "converged",
    pathConstraintBoundaryRelaxationResidualEvidenceStatus: "aggregate_non_worsening",
    pathConstraintBoundaryRelaxationResidualRatio: 0.25,
    rmsPathConstraintBoundaryRelaxationResidualRatio: 0.125,
    pathConstraintBoundaryRelaxationResidualSettlingRate: 0.6299605249474366,
    rmsPathConstraintBoundaryRelaxationResidualSettlingRate: 0.5,
    rmsPathConstraintBoundaryRelaxationResidualAfter: 0.003,
    pathConstraintSolverStatus: "discrete_boundary_value_converged",
    pathConstraintSolverClaim: "finite_difference_pair_boundary_value_solve_converged",
    pathConstraintPhysicalBoundarySolverStatus: "physical_boundary_solver_pending",
    pathConstraintPhysicalBoundarySolverClaim: "retained_knot_guidance_not_physical_boundary_value_solve",
    pathConstraintPhysicalBoundarySolverBlockingReason: "physical_boundary_solver_not_implemented",
    maxPathConstraintGuidanceAcceleration: 48.25,
  };
  runtime.dom = { replayStatus };

  runtime.updateReplayStatus();

  assert.equal(replayStatus.textContent, "solver boundary replay");
  assert.equal(replayStatus.dataset.state, "bridge-boundary");
  assert.match(replayStatus.title, /seed=law_aware_retained_knot_boundary_seed/);
  assert.match(replayStatus.title, /seedRows=18/);
  assert.match(replayStatus.title, /posRows=12/);
  assert.match(replayStatus.title, /posErr=0\.002/);
  assert.match(replayStatus.title, /posTol=0\.003/);
  assert.match(replayStatus.title, /posStatus=within_tolerance/);
  assert.match(replayStatus.title, /relaxStop=tolerance_reached/);
  assert.match(replayStatus.title, /relaxRmsRatio=0\.125/);
  assert.match(replayStatus.title, /relaxRate=0\.63/);
  assert.match(replayStatus.title, /relaxRmsRate=0\.5/);
  assert.match(replayStatus.title, /relaxStatus=converged/);
  assert.match(replayStatus.title, /relaxEvidence=aggregate_non_worsening/);
  assert.match(replayStatus.title, /constraint=discrete_boundary_value_converged/);
  assert.match(replayStatus.title, /claim=finite_difference_pair_boundary_value_solve_converged/);
  assert.match(replayStatus.title, /physical=physical_boundary_solver_pending/);
  assert.match(replayStatus.title, /physicalClaim=retained_knot_guidance_not_physical_boundary_value_solve/);
  assert.match(replayStatus.title, /physicalWhy=physical_boundary_solver_not_implemented/);
  assert.match(replayStatus.title, /bStatus=within_tolerance/);
  assert.match(replayStatus.title, /converged against the discrete finite-difference pair equation/);
  assert.match(replayStatus.title, /finite-difference retained-knot boundary relaxation/);
  assert.match(replayStatus.title, /not the full physical pair-interaction\/path-constraint boundary-value solver/);
  assert.match(replayStatus.title, /full physical pair-interaction\/path-constraint boundary-value solver is still pending/);
});

test("causal delay feedback status flags unchecked boundary residual acceptance on boundary replay", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dataset = {
    ...createMockCausalDelayReplayDataset("partial_arcs"),
    datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
    solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
    solverReplayMode: CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE,
    pathConstraintGuidanceSampleCount: 12,
    pathConstraintGuidanceMode: "retained_knot_boundary",
    pathConstraintBoundaryRelaxationMode: "finite_difference_frame_relaxation_v1",
    pathConstraintBoundaryRelaxationIterationCount: 8,
    pathConstraintBoundaryRelaxationStopReason: "tolerance_reached",
    pathConstraintBoundaryRelaxationTolerance: 0.006,
    pathConstraintBoundaryRelaxationStatus: "converged",
    pathConstraintSolverStatus: "discrete_boundary_value_converged",
    pathConstraintSolverClaim: "finite_difference_pair_boundary_value_solve_converged",
  };
  runtime.dom = { replayStatus };

  runtime.updateReplayStatus();

  assert.equal(replayStatus.textContent, "solver boundary replay");
  assert.equal(replayStatus.dataset.state, "bridge-boundary");
  assert.match(replayStatus.title, /posStatus=unchecked/);
  assert.match(replayStatus.title, /bStatus=unchecked/);
  assert.match(replayStatus.title, /Retained-position preservation evidence remains unchecked/);
  assert.match(replayStatus.title, /Retained-knot boundary residual acceptance remains unchecked/);
  assert.match(replayStatus.title, /not the full physical pair-interaction\/path-constraint boundary-value solver/);
});

test("causal delay feedback status distinguishes pair-initial seeded bridge replay", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dataset = {
    ...createMockCausalDelayReplayDataset("partial_arcs"),
    datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
    solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
    motionAccelerationPolicy: "pair_initial_attraction_seed",
    pairAccelerationScale: 0.18,
  };
  runtime.dom = { replayStatus };

  runtime.updateReplayStatus();

  assert.equal(replayStatus.textContent, "solver seed replay");
  assert.equal(replayStatus.dataset.state, "bridge-seed");
  assert.match(replayStatus.title, /pair_initial_attraction_seed/);
  assert.match(replayStatus.title, /not the final full pair-interaction path solver/);
  assert.equal(replayStatus.attributes["aria-label"], replayStatus.title);
});

test("causal delay feedback status distinguishes segmented pair seeded bridge replay", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dataset = {
    ...createMockCausalDelayReplayDataset("partial_arcs"),
    datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
    solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
    motionAccelerationPolicy: "pair_segmented_attraction_seed",
    pairAccelerationScale: 0.18,
    pairSegmentCount: 12,
  };
  runtime.dom = { replayStatus };

  runtime.updateReplayStatus();

  assert.equal(replayStatus.textContent, "solver seed replay");
  assert.equal(replayStatus.dataset.state, "bridge-seed");
  assert.match(replayStatus.title, /pair_segmented_attraction_seed/);
  assert.match(replayStatus.title, /segments=12/);
  assert.match(replayStatus.title, /segmented pair-interaction approximation/);
});

test("causal delay feedback contrast stress preset stays representative under central bridge", async () => {
  const replayStatus = new FakeElement();
  let centralCalls = 0;
  const adapter = {
    id: CENTRAL_SOLVER_REPLAY_ADAPTER,
    async createReplayAsync({ presetId }) {
      centralCalls += 1;
      return {
        ...createMockCausalDelayReplayDataset(presetId),
        runId: `central:${presetId}`,
        datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
        solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
      };
    },
  };
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: {
      location: { href: "http://localhost/causal-delay-feedback.html?preset=contrast_stress" },
    },
    replayAdapter: adapter,
    autoLoadReplay: false,
  });
  runtime.dom = { replayStatus };

  await runtime.loadReplay();
  const statuses = runtime.dataset.wakeLinks.map((link) => runtime.getWakeStatus(link).status);

  assert.equal(centralCalls, 0);
  assert.equal(runtime.dataset.preset.id, "contrast_stress");
  assert.equal(runtime.dataset.datasetSource, REPRESENTATIVE_MOCK_SOLVER_REPLAY);
  assert.equal(runtime.dataset.solverIntegrationPath, TEMPORARY_MOCK_ADAPTER);
  assert.equal(runtime.replayLoadState, "ready");
  assert.equal(replayStatus.textContent, "representative replay");
  assert.equal(replayStatus.dataset.state, "representative");
  assert(statuses.includes("active"));
  assert(statuses.includes("inactive"));
  assert(statuses.includes("stale"));
  assert(statuses.includes("rejected"));
});

test("causal delay feedback runtime keeps the mock replay when bridge replay loading fails", async () => {
  const replayStatus = new FakeElement();
  const adapter = {
    id: CENTRAL_SOLVER_REPLAY_ADAPTER,
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

test("causal delay feedback rejected direct edit preserves the draft and reports solver diagnostics", async () => {
  const replayStatus = new FakeElement();
  const readout = new FakeElement();
  const adapter = {
    id: CENTRAL_SOLVER_REPLAY_ADAPTER,
    async createReplayAsync() {
      throw new Error("edited position outside solver domain");
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

  const readoutText = readout.children.map((child) => child.textContent);

  assert.equal(runtime.dataset.datasetSource, DIRECT_MANIPULATION_DRAFT_PREVIEW);
  assert.equal(runtime.replayLoadState, "draft-rejected");
  assert.equal(runtime.dataset.initialConditions.electrino.x, editedX);
  assert.equal(runtime.dataset.draftPreview.solverRejected, true);
  assert.equal(runtime.dataset.draftPreview.solverRejection.message, "edited position outside solver domain");
  assert.equal(runtime.replayRequestOptions.replayDataset, runtime.dataset);
  assert.equal(runtime.replayRequestOptions.initialConditions.electrino.x, editedX);
  assert.equal(replayStatus.textContent, "solver rejected edit");
  assert.equal(replayStatus.dataset.state, "draft-rejected");
  assert.match(replayStatus.title, /edited position outside solver domain/);
  assert(readoutText.includes("edit=not_solved"));
  assert(readoutText.includes("reason=edited_position_outside_solver_domain"));
});

test("causal delay feedback runtime ignores stale async replay responses", async () => {
  const pending = [];
  const adapter = {
    id: CENTRAL_SOLVER_REPLAY_ADAPTER,
    createReplayAsync({ presetId }) {
      return new Promise((resolve) => {
        pending.push({ presetId, resolve });
      });
    },
  };
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    replayAdapter: adapter,
    autoLoadReplay: false,
  });

  const firstLoad = runtime.loadReplay({ presetId: "accepted_tight_bright" });
  const secondLoad = runtime.loadReplay({ presetId: "full_circular_arcs" });

  pending[1].resolve({
    ...createMockCausalDelayReplayDataset("full_circular_arcs"),
    runId: "newer-central-dataset",
    datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
    solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
  });
  await secondLoad;

  pending[0].resolve({
    ...createMockCausalDelayReplayDataset("accepted_tight_bright"),
    runId: "older-central-dataset",
    datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
    solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
  });
  await firstLoad;

  assert.equal(runtime.dataset.runId, "newer-central-dataset");
  assert.equal(runtime.dataset.preset.id, "full_circular_arcs");
});

test("causal delay feedback page uses central replay by default with a mock escape hatch", () => {
  assert.equal(shouldUseCentralBridgeReplay(fakeWindow), true);
  assert.equal(
    shouldUseCentralBridgeReplay({
      location: { href: "http://localhost/causal-delay-feedback.html?replay=central" },
    }),
    true,
  );
  assert.equal(
    shouldUseCentralBridgeReplay({
      location: { href: "http://localhost/causal-delay-feedback.html?solver=central" },
    }),
    true,
  );
  assert.equal(
    shouldUseCentralBridgeReplay({
      location: { href: "http://localhost/causal-delay-feedback.html?replay=mock" },
    }),
    false,
  );

  const defaultRuntime = createCausalDelayFeedbackRuntimeForPage(fakeWindow);
  const mockRuntime = createCausalDelayFeedbackRuntimeForPage({
    location: { href: "http://localhost/causal-delay-feedback.html?replay=mock" },
  });

  const centralRuntime = createCausalDelayFeedbackRuntimeForPage({
    location: { href: "http://localhost/causal-delay-feedback.html?adapter=bridge" },
  });

  assert.equal(defaultRuntime.replayAdapter.id, CENTRAL_SOLVER_REPLAY_ADAPTER);
  assert.equal(mockRuntime.replayAdapter.id, TEMPORARY_MOCK_ADAPTER);
  assert.equal(centralRuntime.replayAdapter.id, CENTRAL_SOLVER_REPLAY_ADAPTER);
  assert.equal(centralRuntime.dataset.datasetSource, "representative_mock_solver_replay");
});

test("causal delay feedback page accepts central motion replay review URLs", () => {
  assert.equal(
    getCentralBridgeReplayMode(fakeWindow, { defaultMode: CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE }),
    CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE,
  );
  assert.equal(
    getCentralBridgeReplayMode({
      location: {
        href: "http://localhost/causal-delay-feedback.html?replay=central",
      },
    }, { defaultMode: CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE }),
    CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE,
  );
  assert.equal(
    getCentralBridgeReplayMode({
      location: {
        href: "http://localhost/causal-delay-feedback.html?replay=central&solverReplay=pair-interaction",
      },
    }),
    CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE,
  );
  assert.equal(
    getCentralBridgeReplayMode({
      location: {
        href: "http://localhost/causal-delay-feedback.html?replay=central&solverReplay=motion",
      },
    }),
    CENTRAL_SOLVER_MOTION_REPLAY_MODE,
  );
  assert.equal(
    getCentralBridgeReplayMode({
      location: {
        href: "http://localhost/causal-delay-feedback.html?replay=central&replayMode=motion-simulation",
      },
    }),
    CENTRAL_SOLVER_MOTION_REPLAY_MODE,
  );
  assert.equal(
    getCentralBridgeReplayMode(fakeWindow, { defaultMode: CENTRAL_SOLVER_MOTION_REPLAY_MODE }),
    CENTRAL_SOLVER_MOTION_REPLAY_MODE,
  );
  assert.equal(
    getCentralBridgeReplayMode({
      location: {
        href: "http://localhost/causal-delay-feedback.html?replay=central&solverReplay=app-playback",
      },
    }),
    CENTRAL_SOLVER_APP_PLAYBACK_REPLAY_MODE,
  );
});

test("causal delay feedback page accepts central motion policy review URL options", () => {
  const options = createCausalDelayFeedbackInitialReplayRequestOptions({
    location: {
      href:
        "http://localhost/causal-delay-feedback.html?motionPolicy=pair_initial_attraction_seed" +
        "&pairSegmentCount=5.8&pairAccelerationScale=0.22" +
        "&pairInteractionSignalSpeed=1234.5" +
        "&pairInteractionLaw=inverse_distance_pair_attraction_v1" +
        "&pathConstraintBoundaryResidualTolerance=0.015" +
        "&pathConstraintPositionResidualTolerance=0.003" +
        "&pathConstraintGuidanceAccelerationTolerance=0.45" +
        "&pathConstraintInitialVelocityResidualTolerance=0.004" +
        "&pathConstraintBoundaryRelaxationIterationCount=12.9" +
        "&pathConstraintBoundaryRelaxationTolerance=0.006" +
        "&pathConstraintBoundaryRelaxationStepTolerance=0.25",
    },
  });

  assert.equal(options.motionAccelerationPolicy, "pair_initial_attraction_seed");
  assert.equal(options.pairSegmentCount, 5);
  assert.equal(options.pairAccelerationScale, 0.22);
  assert.equal(options.pairInteractionSignalSpeed, 1234.5);
  assert.equal(options.pairInteractionLaw, "inverse_distance_pair_attraction_v1");
  assert.equal(options.pathConstraintBoundaryResidualTolerance, 0.015);
  assert.equal(options.pathConstraintPositionResidualTolerance, 0.003);
  assert.equal(options.pathConstraintGuidanceAccelerationTolerance, 0.45);
  assert.equal(options.pathConstraintInitialVelocityResidualTolerance, 0.004);
  assert.equal(options.pathConstraintBoundaryRelaxationIterationCount, 12);
  assert.equal(options.pathConstraintBoundaryRelaxationTolerance, 0.006);
  assert.equal(options.pathConstraintBoundaryRelaxationStepTolerance, 0.25);
});

test("causal delay feedback page leaves absent boundary tuning unset", () => {
  const defaultOptions = createCausalDelayFeedbackInitialReplayRequestOptions({
    location: { href: "http://localhost/causal-delay-feedback.html?replay=central" },
  });
  const explicitZeroOptions = createCausalDelayFeedbackInitialReplayRequestOptions({
    location: {
      href:
        "http://localhost/causal-delay-feedback.html?replay=central&boundaryResidualTolerance=0" +
        "&positionResidualTolerance=0&guidanceAccelerationTolerance=0&initialVelocityResidualTolerance=0" +
        "&boundaryRelaxationIterations=0&boundaryRelaxationTolerance=0&boundaryRelaxationStepTolerance=0",
    },
  });

  assert.equal(defaultOptions.pathConstraintBoundaryResidualTolerance, undefined);
  assert.equal(defaultOptions.pathConstraintPositionResidualTolerance, undefined);
  assert.equal(defaultOptions.pathConstraintGuidanceAccelerationTolerance, undefined);
  assert.equal(defaultOptions.pathConstraintInitialVelocityResidualTolerance, undefined);
  assert.equal(defaultOptions.pathConstraintBoundaryRelaxationIterationCount, undefined);
  assert.equal(defaultOptions.pathConstraintBoundaryRelaxationTolerance, undefined);
  assert.equal(defaultOptions.pathConstraintBoundaryRelaxationStepTolerance, undefined);
  assert.equal(explicitZeroOptions.pathConstraintBoundaryResidualTolerance, 0);
  assert.equal(explicitZeroOptions.pathConstraintPositionResidualTolerance, 0);
  assert.equal(explicitZeroOptions.pathConstraintGuidanceAccelerationTolerance, 0);
  assert.equal(explicitZeroOptions.pathConstraintInitialVelocityResidualTolerance, 0);
  assert.equal(explicitZeroOptions.pathConstraintBoundaryRelaxationIterationCount, 0);
  assert.equal(explicitZeroOptions.pathConstraintBoundaryRelaxationTolerance, 0);
  assert.equal(explicitZeroOptions.pathConstraintBoundaryRelaxationStepTolerance, 0);
});

test("causal delay feedback solver bridge options resolve the default WASM loader path", () => {
  const createWasmModule = () => ({});
  const scope = {
    location: { href: "http://localhost/causal-delay-feedback.html?replay=central" },
    createArchitrinoSolverSmoke: createWasmModule,
  };

  const options = createCausalDelayFeedbackSolverBridgeOptions(scope);

  assert.equal(options.scope, scope);
  assert.equal(options.createWasmModule, createWasmModule);
  assert.equal(options.wasmBaseUrl, createCausalDelayFeedbackDefaultSolverWasmBaseUrl());
  assert.equal(
    options.locateFile("architrino_solver_wasm_smoke.wasm"),
    `${new URL("architrino_solver_wasm_smoke.wasm", options.wasmBaseUrl).href}?v=causal-delay-feedback-solver-wasm-v1`,
  );
  assert.match(
    createCausalDelayFeedbackDefaultSolverWasmLoaderUrl(),
    /\/\.tmp\/solver-build\/wasm\/architrino_solver_wasm_smoke\.mjs$/,
  );
});

test("causal delay feedback page central replay uses configured bridge options from scope", async () => {
  const replayStatus = new FakeElement();
  let capturedRequest = null;
  const windowLike = {
    location: { href: "http://localhost/causal-delay-feedback.html?replay=central&solverReplay=app-playback" },
    ARCHITRINO_CAUSAL_DELAY_FEEDBACK_SOLVER_BRIDGE_OPTIONS: {
      async runSolverBridge(request) {
        capturedRequest = request;
        return {
          response: {
            ...createMockCausalDelayReplayDataset(request.config.presetId),
            runId: "configured-central-bridge-replay",
            datasetId: "configured-central-bridge-dataset",
          },
        };
      },
    },
  };
  const runtime = createCausalDelayFeedbackRuntimeForPage(windowLike);
  runtime.dom = { replayStatus };

  await runtime.loadReplay();

  assert.equal(capturedRequest.appId, "causal-delay-feedback");
  assert.equal(capturedRequest.runKind, "appPlayback");
  assert.equal(runtime.dataset.runId, "configured-central-bridge-replay");
  assert.equal(runtime.dataset.datasetId, "configured-central-bridge-dataset");
  assert.equal(runtime.dataset.datasetSource, CENTRAL_SOLVER_REPLAY_DATASET_SOURCE);
  assert.equal(runtime.replayLoadState, "ready");
  assert.equal(replayStatus.textContent, "solver bridge replay");
  assert.equal(replayStatus.dataset.state, "bridge");
});

test("causal delay feedback wake fronts and receiver markers synchronize for every retained link", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });

  runtime.dataset.wakeLinks.forEach((link) => {
    const sourcePoint = runtime.dataset.history[link.sourceKind].find((point) => point.depth === link.sourceDepth);
    const receiverPoint = runtime.dataset.history[link.receiverKind].find((point) => point.depth === link.receiverDepth);

    runtime.updateWakeLinkGeometry();

    const beforeSource = runtime.getWakeTiming(link, sourcePoint.t - 0.01);
    const atSource = runtime.getWakeTiming(link, sourcePoint.t);
    const atReceiver = runtime.getWakeTiming(link, receiverPoint.t);
    const justAfterReceiver = runtime.getWakeTiming(link, receiverPoint.t + 1e-9);
    const afterReceiver = runtime.getWakeTiming(link, receiverPoint.t + 0.01);
    const sourceFront = runtime.getWakeFrontCenterPoint(link, sourcePoint.t);
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
    assert.equal(link.emissionTime, sourcePoint.t);
    assert.equal(link.hitTime, receiverPoint.t);
    assert.equal(link.travelTime, receiverPoint.t - sourcePoint.t);
    assertNear(sourceFront.x, sourcePoint.x);
    assertNear(sourceFront.y, sourcePoint.y);
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
  const sourcePoint = runtime.dataset.history[link.sourceKind].find((point) => point.depth === link.sourceDepth);
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
  runtime.drawWakeProgression({}, link, sourcePoint.t + (receiverPoint.t - sourcePoint.t) * 0.5);
  assert(drawnArcCount > 0);
});

test("causal delay feedback full circular wake series disappears after reception until the loop restarts", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: {
      location: { href: "http://localhost/causal-delay-feedback.html?preset=full_circular_arcs" },
    },
  });
  const link = runtime.dataset.wakeLinks[0];
  const sourcePoint = runtime.dataset.history[link.sourceKind].find((point) => point.depth === link.sourceDepth);
  const receiverPoint = runtime.dataset.history[link.receiverKind].find((point) => point.depth === link.receiverDepth);
  let drawnArcCount = 0;
  runtime.drawDottedArc = () => {
    drawnArcCount += 1;
  };

  runtime.drawFullCircularWakeProgression({}, link, receiverPoint.t);
  assert(drawnArcCount > 0);

  drawnArcCount = 0;
  runtime.drawFullCircularWakeProgression({}, link, receiverPoint.t + 0.01);
  assert.equal(drawnArcCount, 0);

  drawnArcCount = 0;
  runtime.drawFullCircularWakeProgression({}, link, sourcePoint.t + (receiverPoint.t - sourcePoint.t) * 0.5);
  assert(drawnArcCount > 0);
});

test("causal delay feedback full circular wakes share arc-series timing and styling", () => {
  const partialRuntime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const fullRuntime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: {
      location: { href: "http://localhost/causal-delay-feedback.html?preset=full_circular_arcs" },
    },
  });
  const partialLink = partialRuntime.dataset.wakeLinks[0];
  const fullLink = fullRuntime.dataset.wakeLinks[0];
  const sourcePoint = partialRuntime.dataset.history[partialLink.sourceKind].find(
    (point) => point.depth === partialLink.sourceDepth,
  );
  const receiverPoint = partialRuntime.dataset.history[partialLink.receiverKind].find(
    (point) => point.depth === partialLink.receiverDepth,
  );
  const replayTime = sourcePoint.t + (receiverPoint.t - sourcePoint.t) * 0.75;
  const partialCalls = [];
  const fullCalls = [];
  partialRuntime.drawDottedArc = (_ctx, _center, radius, startDeg, endDeg, color, dotRadius) => {
    partialCalls.push({ radius, startDeg, endDeg, color, dotRadius });
  };
  fullRuntime.drawDottedArc = (_ctx, _center, radius, startDeg, endDeg, color, dotRadius) => {
    fullCalls.push({ radius, startDeg, endDeg, color, dotRadius });
  };

  partialRuntime.drawWakeProgression({}, partialLink, replayTime);
  fullRuntime.drawFullCircularWakeProgression({}, fullLink, replayTime);

  assert.equal(fullRuntime.dataset.preset.dotRadius, partialRuntime.dataset.preset.dotRadius);
  assert.equal(fullRuntime.dataset.preset.alphaScale, partialRuntime.dataset.preset.alphaScale);
  assert.equal(partialCalls.length, fullCalls.length);
  partialCalls.forEach((partialCall, index) => {
    const fullCall = fullCalls[index];
    assertNear(fullCall.radius, partialCall.radius);
    assertNear(fullCall.dotRadius, partialCall.dotRadius);
    assert.deepEqual(fullCall.color, partialCall.color);
    assert.notEqual(partialCall.startDeg, 0);
    assert.notEqual(partialCall.endDeg, 360);
    assert.equal(fullCall.startDeg, 0);
    assert.equal(fullCall.endDeg, 360);
  });
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

test("causal delay feedback skipped animation frames snap to the crossed reception point", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const link = runtime.dataset.wakeLinks[0];
  const receiverPoint = runtime.dataset.history[link.receiverKind].find((point) => point.depth === link.receiverDepth);
  const previousReplayTime = receiverPoint.t - 0.006;
  const nextReplayTime = receiverPoint.t + 0.006;

  const snappedReplayTime = runtime.getFrameReceptionReplayTime(previousReplayTime, nextReplayTime);
  const receiverFront = runtime.getWakeFrontCenterPoint(link, snappedReplayTime);
  const receivingMarker = runtime.getReplayPathPoint(link.receiverKind, snappedReplayTime);

  assert.equal(snappedReplayTime, receiverPoint.t);
  assert.equal(receiverFront.x, receiverPoint.x);
  assert.equal(receiverFront.y, receiverPoint.y);
  assert.equal(receivingMarker.x, receiverPoint.x);
  assert.equal(receivingMarker.y, receiverPoint.y);
  assert.equal(runtime.getFrameReceptionReplayTime(receiverPoint.t + 0.006, receiverPoint.t + 0.012), null);
});

test("causal delay feedback arrival snap only follows visible wake arcs", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const visibleLink = runtime.dataset.wakeLinks.find((link) => link.receiverDepth === 2);
  const hiddenLink = runtime.dataset.wakeLinks.find((link) => link.receiverDepth === 3);
  const visibleReceiver = runtime.dataset.history[visibleLink.receiverKind].find(
    (point) => point.depth === visibleLink.receiverDepth,
  );
  const hiddenReceiver = runtime.dataset.history[hiddenLink.receiverKind].find(
    (point) => point.depth === hiddenLink.receiverDepth,
  );

  runtime.setRetainedDepthLimit(2);

  assert.equal(runtime.getVisibleWakeLinks().some((link) => link.id === visibleLink.id), true);
  assert.equal(runtime.getVisibleWakeLinks().some((link) => link.id === hiddenLink.id), false);
  assert.equal(
    runtime.getFrameReceptionReplayTime(visibleReceiver.t - 0.006, visibleReceiver.t + 0.006),
    visibleReceiver.t,
  );
  assert.equal(runtime.getFrameReceptionReplayTime(hiddenReceiver.t - 0.006, hiddenReceiver.t + 0.006), null);
});

test("causal delay feedback hit testing prefers reception points over wake links", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const receptionPoint = runtime.dataset.history.electrino.find((point) => point.depth === 2);
  const hit = runtime.findNearestHit(runtime.worldToScreen(receptionPoint), { includeWakes: true });

  assert.equal(hit.type, "history");
  assert.deepEqual(hit.selection, { type: "history", kind: "electrino", depth: 2 });
});

test("causal delay feedback path endpoints are first-class history hits", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const startPoint = runtime.dataset.history.positrino.find((point) => point.depth === 1);
  const endDepth = runtime.getMaxHistoryDepth("positrino");
  const endPoint = runtime.dataset.history.positrino.find((point) => point.depth === endDepth);

  const startHit = runtime.findNearestHit(runtime.worldToScreen(startPoint), { includeWakes: true });
  const endHit = runtime.findNearestHit(runtime.worldToScreen(endPoint), { includeWakes: true });

  assert.equal(startPoint.t, 0);
  assert.equal(endPoint.t, 1);
  assert.deepEqual(startHit.selection, { type: "history", kind: "positrino", depth: 1 });
  assert.deepEqual(endHit.selection, { type: "history", kind: "positrino", depth: endDepth });
});

test("causal delay feedback path endpoint handles stay visible under lower retained wake depth", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.setRetainedDepthLimit(2);
  const endDepth = runtime.getMaxHistoryDepth("electrino");
  const endPoint = runtime.dataset.history.electrino.find((point) => point.depth === endDepth);

  const visibleDepths = runtime.getVisibleHistory("electrino").map((point) => point.depth);
  const endHit = runtime.findNearestHit(runtime.worldToScreen(endPoint), { includeWakes: true });
  const before = { x: endPoint.x, y: endPoint.y };
  const didEdit = runtime.applyRetainedPointDrag("electrino", endDepth, { x: -18, y: 12 });

  assert.deepEqual(visibleDepths, [1, 2, endDepth]);
  assert(runtime.getVisibleWakeLinks().every((link) => link.sourceDepth <= 2 && link.receiverDepth <= 2));
  assert.deepEqual(endHit.selection, { type: "history", kind: "electrino", depth: endDepth });
  assert.equal(didEdit, true);
  assert.equal(endPoint.x, before.x - 18);
  assert.equal(endPoint.y, before.y + 12);
});

test("causal delay feedback does not expose a separate initial-position canvas hit", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const condition = runtime.dataset.initialConditions.positrino;
  const startPoint = runtime.dataset.history.positrino.find((point) => point.depth === 1);

  const hit = runtime.findNearestHit(runtime.worldToScreen(runtime.initialConditionPoint(condition)));

  assert.equal(startPoint.x, condition.x);
  assert.equal(startPoint.y, condition.y);
  assert.equal(hit.type, "history");
  assert.deepEqual(hit.selection, { type: "history", kind: "positrino", depth: 1 });
});

test("causal delay feedback path start marker is the movable point 1 history object", () => {
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

test("causal delay feedback path end marker is the movable final history object", () => {
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

test("causal delay feedback right-click insertion renumbers retained path points and rebuilds wake links", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = { replayStatus };
  const insertionPoint = runtime.getReplayPathPoint("positrino", 0.48);

  const inserted = runtime.addReceptionPointAtPath("positrino", insertionPoint);

  assert.equal(inserted.kind, "positrino");
  assert.equal(inserted.depth, 4);
  assert.equal(runtime.dataset.history.positrino.length, 7);
  assert.equal(runtime.dataset.history.electrino.length, 7);
  assert.deepEqual(runtime.dataset.history.positrino.map((point) => point.depth), [1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(runtime.dataset.history.electrino.map((point) => point.depth), [1, 2, 3, 4, 5, 6, 7]);
  assert.equal(runtime.dataset.initialConditions.historyDepth, 7);
  assert.equal(runtime.retainedDepthLimit, 8);
  assert.equal(runtime.dataset.draftPreview.reason, "reception_point_insert_preview");
  assert.equal(runtime.dataset.datasetSource, DIRECT_MANIPULATION_DRAFT_PREVIEW);
  assert.equal(replayStatus.textContent, "draft preview");
  assert.equal(runtime.replayRequestOptions.initialConditions.historyDepth, 7);
  assert.equal(runtime.dataset.wakeLinks.length, 12);
  assert(runtime.dataset.wakeLinks.every((link) => link.receiverDepth === link.sourceDepth + 1));
  assert(runtime.dataset.wakeLinks.some((link) => link.label === "red 4 -> blue 5"));
  assert(runtime.dataset.wakeLinks.some((link) => link.label === "blue 3 -> red 4"));
  assert(runtime.dataset.wakeLinks.some((link) => link.label === "blue 6 -> red 7"));
  assert.equal(runtime.dataset.wakeLinks.find((link) => link.label === "blue 3 -> red 4").receiver.t, inserted.t);

  const startPoint = runtime.dataset.history.positrino.find((point) => point.depth === 1);
  const finalPoint = runtime.dataset.history.positrino.find((point) => point.depth === 7);
  const finalPathPoint = runtime.dataset.paths.positrino.at(-1);
  const beforeFinal = { x: finalPoint.x, y: finalPoint.y };
  runtime.setRetainedDepthLimit(2);

  const startHit = runtime.findNearestHit(runtime.worldToScreen(startPoint), { includeWakes: true });
  const finalHit = runtime.findNearestHit(runtime.worldToScreen(finalPoint), { includeWakes: true });
  const didEditFinal = runtime.applyRetainedPointDrag("positrino", 7, { x: 22, y: -18 });

  assert.deepEqual(startHit.selection, { type: "history", kind: "positrino", depth: 1 });
  assert.deepEqual(finalHit.selection, { type: "history", kind: "positrino", depth: 7 });
  assert.deepEqual(runtime.getVisibleHistory("positrino").map((point) => point.depth), [1, 2, 7]);
  assert.equal(didEditFinal, true);
  assert.equal(finalPoint.x, beforeFinal.x + 22);
  assert.equal(finalPoint.y, beforeFinal.y - 18);
  assert.equal(finalPathPoint.x, finalPoint.x);
  assert.equal(finalPathPoint.y, finalPoint.y);
});

test("causal delay feedback inserted path endpoints remain movable history on both paths", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = { replayStatus };

  runtime.addReceptionPointAtPath("positrino", runtime.getReplayPathPoint("positrino", 0.48));
  runtime.setRetainedDepthLimit(2);

  ["positrino", "electrino"].forEach((kind, index) => {
    const endDepth = runtime.getMaxHistoryDepth(kind);
    const startPoint = runtime.dataset.history[kind].find((point) => point.depth === 1);
    const endPoint = runtime.dataset.history[kind].find((point) => point.depth === endDepth);
    const startHit = runtime.findNearestHit(runtime.worldToScreen(startPoint), { includeWakes: true });
    const endHit = runtime.findNearestHit(runtime.worldToScreen(endPoint), { includeWakes: true });
    const startBefore = { x: startPoint.x, y: startPoint.y };
    const endBefore = { x: endPoint.x, y: endPoint.y };
    const startDelta = { x: 18 + index * 5, y: -11 - index * 4 };
    const endDelta = { x: -24 - index * 6, y: 14 + index * 5 };

    assert.equal(startPoint.t, 0);
    assert.equal(startPoint.depth, 1);
    assert.equal(endPoint.t, 1);
    assert.equal(endPoint.depth, endDepth);
    assert.deepEqual(runtime.getVisibleHistory(kind).map((point) => point.depth), [1, 2, endDepth]);
    assert.deepEqual(startHit.selection, { type: "history", kind, depth: 1 });
    assert.deepEqual(endHit.selection, { type: "history", kind, depth: endDepth });

    assert.equal(runtime.applyRetainedPointDrag(kind, 1, startDelta), true);
    assert.equal(startPoint.x, startBefore.x + startDelta.x);
    assert.equal(startPoint.y, startBefore.y + startDelta.y);
    assert.equal(runtime.dataset.initialConditions[kind].x, startPoint.x);
    assert.equal(runtime.dataset.initialConditions[kind].y, startPoint.y);
    assert.equal(runtime.dataset.paths[kind][0].x, startPoint.x);
    assert.equal(runtime.dataset.paths[kind][0].y, startPoint.y);

    assert.equal(runtime.applyRetainedPointDrag(kind, endDepth, endDelta), true);
    assert.equal(endPoint.x, endBefore.x + endDelta.x);
    assert.equal(endPoint.y, endBefore.y + endDelta.y);
    assert.equal(runtime.dataset.paths[kind].at(-1).x, endPoint.x);
    assert.equal(runtime.dataset.paths[kind].at(-1).y, endPoint.y);
    assert.equal(runtime.dataset.frames.at(-1)[kind].x, endPoint.x);
    assert.equal(runtime.dataset.frames.at(-1)[kind].y, endPoint.y);
  });
});

test("causal delay feedback context menu inserts a retained point on the nearest path", () => {
  const readout = new FakeElement();
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = {
    readout,
    replayStatus,
    canvas: {
      getBoundingClientRect: () => ({ left: 0, top: 0 }),
    },
  };
  runtime.render = () => {};
  const screen = runtime.worldToScreen(runtime.getReplayPathPoint("electrino", 0.48));
  let preventedDefault = false;

  runtime.handleCanvasContextMenu({
    clientX: screen.x,
    clientY: screen.y,
    preventDefault() {
      preventedDefault = true;
    },
  });

  assert.equal(preventedDefault, true);
  assert.equal(runtime.dataset.history.electrino.length, 7);
  assert.equal(runtime.dataset.history.positrino.length, 7);
  assert.deepEqual(runtime.selectedItem, { type: "history", kind: "electrino", depth: 4 });
  assert.equal(readout.children[0].textContent, "electrino 4");
});

test("causal delay feedback context menu insertion submits central replay when available", async () => {
  const readout = new FakeElement();
  const replayStatus = new FakeElement();
  let capturedRequestOptions = null;
  const adapter = {
    id: CENTRAL_SOLVER_REPLAY_ADAPTER,
    async createReplayAsync({ presetId, requestOptions }) {
      capturedRequestOptions = requestOptions;
      return {
        ...createMockCausalDelayReplayDataset(presetId),
        initialConditions: requestOptions.initialConditions,
        history: requestOptions.replayDataset.history,
        wakeLinks: requestOptions.replayDataset.wakeLinks,
        datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
        solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
      };
    },
  };
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    replayAdapter: adapter,
    autoLoadReplay: false,
  });
  runtime.dom = {
    readout,
    replayStatus,
    canvas: {
      getBoundingClientRect: () => ({ left: 0, top: 0 }),
    },
  };
  runtime.render = () => {};
  const screen = runtime.worldToScreen(runtime.getReplayPathPoint("electrino", 0.48));
  let preventedDefault = false;

  await runtime.handleCanvasContextMenu({
    clientX: screen.x,
    clientY: screen.y,
    preventDefault() {
      preventedDefault = true;
    },
  });

  assert.equal(preventedDefault, true);
  assert.equal(capturedRequestOptions.initialConditions.historyDepth, 7);
  assert.equal(capturedRequestOptions.replayDataset.datasetSource, DIRECT_MANIPULATION_DRAFT_PREVIEW);
  assert.equal(capturedRequestOptions.replayDataset.draftPreview.reason, "reception_point_insert_preview");
  assert.equal(capturedRequestOptions.replayDataset.history.electrino.length, 7);
  assert.equal(capturedRequestOptions.replayDataset.wakeLinks.length, 12);
  assert.equal(capturedRequestOptions.pathConstraintBoundaryRelaxationIterationCount, 256);
  assert.equal(capturedRequestOptions.pathConstraintBoundaryRelaxationTolerance, 1);
  assert.equal(runtime.dataset.datasetSource, CENTRAL_SOLVER_REPLAY_DATASET_SOURCE);
  assert.equal(runtime.dataset.history.electrino.length, 7);
  assert.deepEqual(runtime.selectedItem, { type: "history", kind: "electrino", depth: 4 });
  assert.equal(replayStatus.textContent, "solver bridge replay");
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
  const receiverPoint = runtime.dataset.history[staleLink.receiverKind].find(
    (point) => point.depth === staleLink.receiverDepth,
  );
  Object.assign(staleLink, {
    solverRunId: "central-solved-red1-blue2",
    rootCount: 1,
    solverHitCount: 1,
  });

  runtime.applyRetainedPointDrag("electrino", 2, { x: 12, y: -10 });
  const summary = runtime.getContributionSummary(receiverPoint.t + 0.01);
  runtime.updateReadout(runtime.createContributionSummaryHit(receiverPoint.t + 0.01));

  assert.equal(summary.activeLinkCount, 9);
  assert.equal(summary.staleCount, 1);
  assert.equal(summary.rejectedCount, 0);
  assert.equal(summary.receivedCount, 1);
  assert.deepEqual(summary.invalidReasonCounts, { "stale:retained_point_drag_preview": 1 });
  assert.equal(readout.children[2].textContent, "received=1/9");
  assert.equal(readout.children[readout.children.length - 2].textContent, "stale=1");
  assert.equal(readout.children[readout.children.length - 1].textContent, "why=stale:retained_point_drag_previewx1");
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

test("causal delay feedback Virtual Observer drag updates diagnostic contribution without staling wake roots", () => {
  const replayStatus = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = { replayStatus };
  const link = runtime.dataset.wakeLinks[0];
  Object.assign(link, {
    solverRunId: "central-solved-red1-blue2",
    rootCount: 1,
    solverHitCount: 1,
    solverHitTime: link.hitTime,
  });
  const endpoints = runtime.getWakeEndpoints(link);
  const observer = runtime.getVirtualObserver();
  const before = runtime.getWakeContributionMagnitude(link);

  const didEdit = runtime.applyVirtualObserverDrag({
    x: endpoints.receiver.x + 120 - observer.x,
    y: endpoints.receiver.y - observer.y,
  });
  const after = runtime.getWakeContributionMagnitude(link);

  assert.equal(didEdit, true);
  assert(after > before);
  assert.equal(runtime.dataset.datasetSource, REPRESENTATIVE_MOCK_SOLVER_REPLAY);
  assert.equal(runtime.dataset.draftPreview, undefined);
  assertNear(runtime.dataset.virtualObserver.x, endpoints.receiver.x + 120);
  assertNear(runtime.dataset.initialConditions.virtualObserver.x, runtime.dataset.virtualObserver.x);
  assertNear(runtime.replayRequestOptions.virtualObserver.x, runtime.dataset.virtualObserver.x);
  assertNear(runtime.replayRequestOptions.initialConditions.virtualObserver.x, runtime.dataset.virtualObserver.x);
  assert.equal(runtime.getWakeStatus(link).status, "active");
  assert.equal(link.status, undefined);
  assert.equal(replayStatus.textContent, "");
});

test("causal delay feedback point 1 release reruns central replay with edited setup", async () => {
  const replayStatus = new FakeElement();
  let capturedRequestOptions = null;
  const adapter = {
    id: CENTRAL_SOLVER_REPLAY_ADAPTER,
    async createReplayAsync({ presetId, requestOptions }) {
      capturedRequestOptions = requestOptions;
      return {
        ...createMockCausalDelayReplayDataset(presetId),
        initialConditions: requestOptions.initialConditions,
        datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
        solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
      };
    },
  };
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    replayAdapter: adapter,
    autoLoadReplay: false,
  });
  runtime.dom = { replayStatus };

  runtime.applyRetainedPointDrag("positrino", 1, { x: 34, y: -19 });
  runtime.dragState = { type: "history", kind: "positrino", depth: 1, didEdit: true };
  await runtime.finishDrag();

  assert.equal(capturedRequestOptions.initialConditions.positrino.x, runtime.dataset.initialConditions.positrino.x);
  assert.equal(capturedRequestOptions.initialConditions.positrino.y, runtime.dataset.initialConditions.positrino.y);
  assert.equal(capturedRequestOptions.replayDataset.draftPreview.reason, "retained_point_drag_preview");
  assert.equal(capturedRequestOptions.pathConstraintBoundaryRelaxationIterationCount, 256);
  assert.equal(capturedRequestOptions.pathConstraintBoundaryRelaxationTolerance, 1);
  assert.equal(runtime.dataset.datasetSource, CENTRAL_SOLVER_REPLAY_DATASET_SOURCE);
  assert.equal(replayStatus.textContent, "solver bridge replay");
});

test("causal delay feedback final path point release submits central replay constraints", async () => {
  const replayStatus = new FakeElement();
  let capturedRequestOptions = null;
  const adapter = {
    id: CENTRAL_SOLVER_REPLAY_ADAPTER,
    async createReplayAsync({ presetId, requestOptions }) {
      capturedRequestOptions = requestOptions;
      return {
        ...createMockCausalDelayReplayDataset(presetId),
        history: requestOptions.replayDataset.history,
        wakeLinks: requestOptions.replayDataset.wakeLinks,
        initialConditions: requestOptions.initialConditions,
        datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
        solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
      };
    },
  };
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    replayAdapter: adapter,
    autoLoadReplay: false,
  });
  runtime.dom = { replayStatus };

  const endDepth = runtime.getMaxHistoryDepth("electrino");
  runtime.applyRetainedPointDrag("electrino", endDepth, { x: -32, y: 23 });
  runtime.dragState = { type: "history", kind: "electrino", depth: endDepth, didEdit: true };
  await runtime.finishDrag();

  assert.equal(capturedRequestOptions.replayDataset.draftPreview.reason, "retained_point_drag_preview");
  assert.equal(capturedRequestOptions.replayDataset.history.electrino.at(-1).x, runtime.dataset.history.electrino.at(-1).x);
  assert.equal(capturedRequestOptions.pathConstraintBoundaryRelaxationIterationCount, 256);
  assert.equal(capturedRequestOptions.pathConstraintBoundaryRelaxationTolerance, 1);
  assert.equal(runtime.dataset.datasetSource, CENTRAL_SOLVER_REPLAY_DATASET_SOURCE);
  assert.equal(replayStatus.textContent, "solver bridge replay");
});

test("causal delay feedback retained path releases retry weak default boundary solves", async () => {
  const replayStatus = new FakeElement();
  const capturedCalls = [];
  const adapter = {
    id: CENTRAL_SOLVER_REPLAY_ADAPTER,
    async createReplayAsync({ presetId, requestOptions }) {
      capturedCalls.push({
        iterationCount: requestOptions.pathConstraintBoundaryRelaxationIterationCount,
        tolerance: requestOptions.pathConstraintBoundaryRelaxationTolerance,
        reason: requestOptions.replayDataset.draftPreview.reason,
      });
      const isAdaptiveRetry = capturedCalls.length === 2;
      return {
        ...createMockCausalDelayReplayDataset(presetId),
        history: requestOptions.replayDataset.history,
        wakeLinks: requestOptions.replayDataset.wakeLinks,
        initialConditions: requestOptions.initialConditions,
        datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
        solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
        solverReplayMode: CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE,
        pairInteractionStepCount: 181,
        pathConstraintGuidanceSampleCount: 6,
        pathConstraintGuidanceMode: "retained_knot_boundary",
        pathConstraintBoundaryRelaxationMode: "finite_difference_frame_relaxation_v1",
        pathConstraintBoundaryRelaxationIterationCount:
          requestOptions.pathConstraintBoundaryRelaxationIterationCount,
        pathConstraintBoundaryRelaxationAppliedIterationCount: isAdaptiveRetry ? 5 : 1,
        pathConstraintBoundaryRelaxationTolerance:
          requestOptions.pathConstraintBoundaryRelaxationTolerance,
        pathConstraintBoundaryRelaxationStatus: isAdaptiveRetry ? "converged" : "accepted",
        pathConstraintBoundaryRelaxationResidualRatio: isAdaptiveRetry ? 0.003 : 0.15,
        pathConstraintSolverStatus: isAdaptiveRetry
          ? "discrete_boundary_value_converged"
          : "guided_constraint_path",
        pathConstraintSolverClaim: isAdaptiveRetry
          ? "finite_difference_pair_boundary_value_solve_converged"
          : "diagnostic_constraint_replay_not_boundary_value_solve",
        maxPathConstraintBoundaryRelaxationResidualAfter: isAdaptiveRetry ? 0.42 : 12.5,
      };
    },
  };
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    replayAdapter: adapter,
    autoLoadReplay: false,
  });
  runtime.dom = { replayStatus };

  runtime.applyRetainedPointDrag("electrino", 3, { x: 46, y: -34 });
  runtime.dragState = { type: "history", kind: "electrino", depth: 3, didEdit: true };
  await runtime.finishDrag();

  assert.deepEqual(capturedCalls, [
    { iterationCount: 64, tolerance: 10, reason: "retained_point_drag_preview" },
    { iterationCount: 256, tolerance: 1, reason: "retained_point_drag_preview" },
  ]);
  assert.equal(runtime.dataset.pathConstraintSolverStatus, "discrete_boundary_value_converged");
  assert.equal(runtime.dataset.pathConstraintBoundaryRelaxationAdaptiveRetry, true);
  assert.equal(runtime.dataset.pathConstraintBoundaryRelaxationRetryCount, 1);
  assert.equal(runtime.dataset.pathConstraintBoundaryRelaxationInitialIterationCount, 64);
  assert.equal(runtime.dataset.pathConstraintBoundaryRelaxationInitialTolerance, 10);
  assert.equal(runtime.dataset.maxPathConstraintBoundaryRelaxationResidualAfterInitialAttempt, 12.5);
  assert.equal(runtime.dataset.pathConstraintBoundaryRelaxationRetryIterationCount, 256);
  assert.equal(runtime.dataset.pathConstraintBoundaryRelaxationRetryTolerance, 1);
  assert.equal(runtime.dataset.maxPathConstraintBoundaryRelaxationResidualAfter, 0.42);
  assert.equal(replayStatus.textContent, "solver boundary replay");
  assert.match(replayStatus.title, /adaptiveRetry=64->256/);
  assert.match(replayStatus.title, /firstTol=10/);
  assert.match(replayStatus.title, /firstResidual=12\.5/);
  assert(runtime.createContributionSummarySolverDetails().includes("relaxRetry=64->256"));
  assert(runtime.createContributionSummarySolverDetails().includes("firstResidual=12.5"));
});

test("causal delay feedback retained path releases keep first solve when adaptive retry worsens", async () => {
  const replayStatus = new FakeElement();
  const capturedCalls = [];
  const adapter = {
    id: CENTRAL_SOLVER_REPLAY_ADAPTER,
    async createReplayAsync({ presetId, requestOptions }) {
      capturedCalls.push({
        iterationCount: requestOptions.pathConstraintBoundaryRelaxationIterationCount,
        tolerance: requestOptions.pathConstraintBoundaryRelaxationTolerance,
        reason: requestOptions.replayDataset.draftPreview.reason,
      });
      const isAdaptiveRetry = capturedCalls.length === 2;
      return {
        ...createMockCausalDelayReplayDataset(presetId),
        history: requestOptions.replayDataset.history,
        wakeLinks: requestOptions.replayDataset.wakeLinks,
        initialConditions: requestOptions.initialConditions,
        datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
        solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
        solverReplayMode: CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE,
        pairInteractionStepCount: 181,
        pathConstraintGuidanceSampleCount: 6,
        pathConstraintGuidanceMode: "retained_knot_boundary",
        pathConstraintBoundaryRelaxationMode: "finite_difference_frame_relaxation_v1",
        pathConstraintBoundaryRelaxationIterationCount:
          requestOptions.pathConstraintBoundaryRelaxationIterationCount,
        pathConstraintBoundaryRelaxationAppliedIterationCount: isAdaptiveRetry ? 6 : 1,
        pathConstraintBoundaryRelaxationTolerance:
          requestOptions.pathConstraintBoundaryRelaxationTolerance,
        pathConstraintBoundaryRelaxationStatus: "accepted",
        pathConstraintBoundaryRelaxationResidualRatio: isAdaptiveRetry ? 0.4 : 0.1,
        pathConstraintSolverStatus: "guided_constraint_path",
        pathConstraintSolverClaim: "diagnostic_constraint_replay_not_boundary_value_solve",
        maxPathConstraintBoundaryRelaxationResidualAfter: isAdaptiveRetry ? 30 : 8,
      };
    },
  };
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    replayAdapter: adapter,
    autoLoadReplay: false,
  });
  runtime.dom = { replayStatus };

  runtime.applyRetainedPointDrag("electrino", 3, { x: 46, y: -34 });
  runtime.dragState = { type: "history", kind: "electrino", depth: 3, didEdit: true };
  await runtime.finishDrag();

  assert.deepEqual(capturedCalls, [
    { iterationCount: 64, tolerance: 10, reason: "retained_point_drag_preview" },
    { iterationCount: 256, tolerance: 1, reason: "retained_point_drag_preview" },
  ]);
  assert.equal(runtime.dataset.pathConstraintSolverStatus, "guided_constraint_path");
  assert.equal(runtime.dataset.pathConstraintBoundaryRelaxationAdaptiveRetry, undefined);
  assert.equal(runtime.dataset.pathConstraintBoundaryRelaxationAdaptiveRetryRejected, true);
  assert.equal(runtime.dataset.pathConstraintBoundaryRelaxationRetryCount, 1);
  assert.equal(runtime.dataset.pathConstraintBoundaryRelaxationInitialIterationCount, 64);
  assert.equal(runtime.dataset.pathConstraintBoundaryRelaxationInitialTolerance, 10);
  assert.equal(runtime.dataset.maxPathConstraintBoundaryRelaxationResidualAfterInitialAttempt, 8);
  assert.equal(runtime.dataset.pathConstraintBoundaryRelaxationRejectedRetryIterationCount, 256);
  assert.equal(runtime.dataset.pathConstraintBoundaryRelaxationRejectedRetryTolerance, 1);
  assert.equal(runtime.dataset.maxPathConstraintBoundaryRelaxationResidualAfterRejectedRetry, 30);
  assert.equal(runtime.dataset.pathConstraintSolverStatusRejectedRetry, "guided_constraint_path");
  assert.equal(runtime.dataset.maxPathConstraintBoundaryRelaxationResidualAfter, 8);
  assert.equal(replayStatus.textContent, "solver guided replay");
  assert.match(replayStatus.title, /adaptiveRetryRejected=64->256/);
  assert.match(replayStatus.title, /retryTol=1/);
  assert.match(replayStatus.title, /retryResidual=30/);
  assert(runtime.createContributionSummarySolverDetails().includes("relaxRetryRejected=64->256"));
  assert(runtime.createContributionSummarySolverDetails().includes("retryResidual=30"));
});

test("causal delay feedback retained path releases preserve explicit boundary relaxation settings", async () => {
  let capturedRequestOptions = null;
  let callCount = 0;
  const adapter = {
    id: CENTRAL_SOLVER_REPLAY_ADAPTER,
    async createReplayAsync({ presetId, requestOptions }) {
      callCount += 1;
      capturedRequestOptions = requestOptions;
      return {
        ...createMockCausalDelayReplayDataset(presetId),
        history: requestOptions.replayDataset.history,
        wakeLinks: requestOptions.replayDataset.wakeLinks,
        datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
        solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
      };
    },
  };
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    replayAdapter: adapter,
    replayRequestOptions: {
      pathConstraintBoundaryRelaxationIterationCount: 12,
      pathConstraintBoundaryRelaxationTolerance: 6,
    },
    autoLoadReplay: false,
  });
  runtime.dom = { replayStatus: new FakeElement() };

  runtime.applyRetainedPointDrag("positrino", 3, { x: 28, y: -18 });
  runtime.dragState = { type: "history", kind: "positrino", depth: 3, didEdit: true };
  await runtime.finishDrag();

  assert.equal(capturedRequestOptions.replayDataset.draftPreview.reason, "retained_point_drag_preview");
  assert.equal(capturedRequestOptions.pathConstraintBoundaryRelaxationIterationCount, 12);
  assert.equal(capturedRequestOptions.pathConstraintBoundaryRelaxationTolerance, 6);
  assert.equal(callCount, 1);
});

test("causal delay feedback retained depth survives central replay reruns", async () => {
  const replayStatus = new FakeElement();
  let capturedRequestOptions = null;
  const adapter = {
    id: CENTRAL_SOLVER_REPLAY_ADAPTER,
    async createReplayAsync({ presetId, requestOptions }) {
      capturedRequestOptions = requestOptions;
      return {
        ...createMockCausalDelayReplayDataset(presetId),
        initialConditions: requestOptions.initialConditions,
        datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
        solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
      };
    },
  };
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    replayAdapter: adapter,
    autoLoadReplay: false,
  });
  runtime.dom = { replayStatus };

  runtime.setRetainedDepthLimit(2);
  runtime.applyRetainedPointDrag("electrino", 1, { x: -12, y: 9 });
  runtime.dragState = { type: "history", kind: "electrino", depth: 1, didEdit: true };
  await runtime.finishDrag();

  assert.equal(capturedRequestOptions.retainedDepthLimit, 2);
  assert.equal(runtime.retainedDepthLimit, 2);
  assert.equal(runtime.getVisibleWakeLinks().length, 2);
  assert.equal(runtime.dataset.initialConditions.electrino.x, capturedRequestOptions.initialConditions.electrino.x);
  assert.equal(runtime.dataset.datasetSource, CENTRAL_SOLVER_REPLAY_DATASET_SOURCE);
});

test("causal delay feedback Virtual Observer release does not rerun central replay", async () => {
  const replayStatus = new FakeElement();
  let capturedRequestOptions = null;
  let callCount = 0;
  const adapter = {
    id: CENTRAL_SOLVER_REPLAY_ADAPTER,
    async createReplayAsync({ presetId, requestOptions }) {
      callCount += 1;
      capturedRequestOptions = requestOptions;
      return {
        ...createMockCausalDelayReplayDataset(presetId),
        initialConditions: requestOptions.initialConditions,
        virtualObserver: requestOptions.virtualObserver,
        datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
        solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
      };
    },
  };
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    replayAdapter: adapter,
    autoLoadReplay: false,
  });
  runtime.dom = { replayStatus };

  runtime.applyVirtualObserverDrag({ x: -180, y: 44 });
  runtime.dragState = { type: "virtual-observer", didEdit: true };
  await runtime.finishDrag();

  assert.equal(callCount, 0);
  assert.equal(capturedRequestOptions, null);
  assert.equal(runtime.dataset.initialConditions.virtualObserver.y, runtime.dataset.virtualObserver.y);
  assert.equal(runtime.dataset.datasetSource, REPRESENTATIVE_MOCK_SOLVER_REPLAY);
  assert.equal(replayStatus.textContent, "");
});

test("causal delay feedback initial velocity release reruns central replay with edited setup", async () => {
  const replayStatus = new FakeElement();
  let capturedRequestOptions = null;
  const adapter = {
    id: CENTRAL_SOLVER_REPLAY_ADAPTER,
    async createReplayAsync({ presetId, requestOptions }) {
      capturedRequestOptions = requestOptions;
      return {
        ...createMockCausalDelayReplayDataset(presetId),
        initialConditions: requestOptions.initialConditions,
        datasetSource: CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
        solverIntegrationPath: CENTRAL_SOLVER_REPLAY_ADAPTER,
      };
    },
  };
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
    replayAdapter: adapter,
    autoLoadReplay: false,
  });
  runtime.dom = { replayStatus };
  const condition = runtime.dataset.initialConditions.electrino;
  const velocityEnd = runtime.initialConditionVelocityEnd(condition);

  runtime.applyInitialVelocityDrag("electrino", {
    x: velocityEnd.x - 21,
    y: velocityEnd.y - 7,
  });
  runtime.dragState = { type: "initial-velocity", kind: "electrino", didEdit: true };
  await runtime.finishDrag();

  assertNear(capturedRequestOptions.initialConditions.electrino.vx, runtime.dataset.initialConditions.electrino.vx);
  assertNear(capturedRequestOptions.initialConditions.electrino.vy, runtime.dataset.initialConditions.electrino.vy);
  assert.equal(capturedRequestOptions.replayDataset.datasetSource, DIRECT_MANIPULATION_DRAFT_PREVIEW);
  assert.equal(capturedRequestOptions.pathConstraintBoundaryRelaxationIterationCount, undefined);
  assert.equal(capturedRequestOptions.pathConstraintBoundaryRelaxationTolerance, undefined);
  assert.equal(runtime.dataset.datasetSource, CENTRAL_SOLVER_REPLAY_DATASET_SOURCE);
  assert.equal(runtime.replayLoadState, "ready");
  assert.equal(replayStatus.textContent, "solver bridge replay");
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
  const labels = [];
  runtime.drawCircle = () => {};
  runtime.drawScreenText = (_ctx, text, point, _size, _color, align) => {
    labels.push({ text, point, align });
  };
  const replayTime = 0.42;
  const positrinoScreen = runtime.worldToScreen(runtime.getReplayPathPoint("positrino", replayTime));
  const electrinoScreen = runtime.worldToScreen(runtime.getReplayPathPoint("electrino", replayTime));

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

test("causal delay feedback spacebar leaves native controls alone", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
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
  assert.equal(nowValue.textContent, `t=${frameTimes[1].toFixed(3).replace(/0+$/, "").replace(/\.$/, "")}`);

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

test("causal delay feedback runtime accepts direct full-circular preset review URL", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: {
      location: { href: "http://localhost/causal-delay-feedback.html?preset=full_circular_arcs" },
    },
  });

  assert.equal(runtime.presetId, "full_circular_arcs");
  assert.equal(runtime.dataset.wakeArcDisplayMode, "full_circular_arcs");
});
