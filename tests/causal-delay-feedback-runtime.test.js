import assert from "node:assert/strict";
import { test } from "node:test";

import { createCausalDelayFeedbackRuntime } from "../src/apps/causal-delay-feedback/CausalDelayFeedbackRuntime.js";
import {
  CENTRAL_SOLVER_REPLAY_ADAPTER,
  CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
  CENTRAL_SOLVER_MOTION_REPLAY_MODE,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackCentralBridgeAdapter.js";
import {
  DIRECT_MANIPULATION_DRAFT_PREVIEW,
  TEMPORARY_MOCK_ADAPTER,
  createMockCausalDelayReplayDataset,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackReplayAdapter.js";
import {
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

function createRuntimeForReadout() {
  const readout = new FakeElement();
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  runtime.dom = { readout };
  return { runtime, readout };
}

test("causal delay feedback readout summarizes selected path history point", () => {
  const { runtime, readout } = createRuntimeForReadout();
  const point = runtime.dataset.history.positrino[0];
  const hit = runtime.createHistoryHit(point, 0);

  runtime.selectedItem = hit.selection;
  runtime.updateReadout(hit);

  assert.equal(readout.hidden, false);
  assert.deepEqual(
    readout.children.map((child) => child.textContent),
    ["positrino 1", "t=0.08", "weight=0.24", "older"],
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
  assert.equal(readout.children[2].textContent, "emit=0.08");
  assert.equal(readout.children[3].textContent, "hit=0.25");
  assert.equal(readout.children[4].textContent, "travel=0.17");
  assert.match(readout.children[5].textContent, /^(pending|active=\d\.\d{2}|received)$/);
  assert.match(readout.children[6].textContent, /^1\/r=0\.\d{4}$/);
  assert.equal(readout.children[7].textContent, "weight=0.24");
  assert.match(readout.children[8].textContent, /^contrib=/);
  assert.match(readout.children[9].textContent, /^(threshold=above_threshold|threshold=near_threshold|threshold=below_threshold)$/);
  assert.equal(readout.children[10].textContent, "partial arc");
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
  assert.equal(visualWeight.alphaScale, 0.28);
  assert.equal(visualWeight.desaturation, 0.56);
  assert.deepEqual(
    readout.children.map((child) => child.textContent).slice(10, 16),
    ["state=rejected", "reason=no_delayed_hit", "solver=unresolved", "roots=0", "hits=0", "partial arc"],
  );
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

test("causal delay feedback default readout summarizes aggregate feedback contributions", () => {
  const { runtime, readout } = createRuntimeForReadout();
  const firstLink = runtime.dataset.wakeLinks[0];
  const receiverPoint = runtime.dataset.history[firstLink.receiverKind].find(
    (point) => point.depth === firstLink.receiverDepth,
  );
  const [start, end] = runtime.getReplayTimeRange();
  runtime.elapsedSeconds = ((receiverPoint.t + 0.01 - start) / (end - start)) * 9;

  runtime.updateReadout();
  const summary = runtime.getContributionSummary(runtime.getCurrentReplayTime());

  assert.equal(readout.hidden, false);
  assert.equal(readout.children[0].textContent, "feedback sum");
  assert.equal(readout.children[2].textContent, "received=2/6");
  assert.equal(readout.children[3].textContent, "in_flight=2");
  assert.equal(readout.children[4].textContent, "pending=2");
  assert.equal(summary.receivedCount, 2);
  assert.equal(summary.inFlightCount, 2);
  assert.equal(summary.pendingCount, 2);
  assert(summary.positiveContribution > 0);
  assert(summary.negativeContribution < 0);
  assert.equal(summary.netContribution, summary.positiveContribution + summary.negativeContribution);
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

  assert.equal(summary.activeLinkCount, 5);
  assert.equal(summary.receivedCount, 1);
  assert.equal(summary.inFlightCount, 2);
  assert.equal(summary.pendingCount, 2);
  assert.equal(summary.rejectedCount, 1);
  assert.equal(readout.children[2].textContent, "received=1/5");
  assert.equal(readout.children[readout.children.length - 1].textContent, "rejected=1");
});

test("causal delay feedback partial wake presets use dense emission-to-receipt bands", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });

  assert.equal(runtime.dataset.preset.id, "accepted_tight_bright");
  assert.equal(runtime.dataset.preset.wakeBands, 30);
});

test("causal delay feedback replay exposes draggable initial conditions", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });

  assert.equal(runtime.dataset.initialConditions.positrino.kind, "positrino");
  assert.equal(runtime.dataset.initialConditions.electrino.kind, "electrino");
  assert.equal(runtime.dataset.initialConditions.historyDepth, 4);
  assert.equal(runtime.replayRequestOptions.initialConditions.positrino.x, runtime.dataset.paths.positrino[0].x);
  assert.equal(runtime.replayRequestOptions.initialConditions.electrino.y, runtime.dataset.paths.electrino[0].y);
});

test("causal delay feedback exposes draggable initial velocity handles", () => {
  const runtime = createCausalDelayFeedbackRuntime({
    document: new FakeDocument(),
    window: fakeWindow,
  });
  const condition = runtime.dataset.initialConditions.positrino;
  const hit = runtime.findNearestHit(runtime.worldToScreen(runtime.initialConditionVelocityEnd(condition)));

  assert.equal(hit.type, "initial-velocity");
  assert.deepEqual(hit.selection, { type: "initial-velocity", kind: "positrino" });
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
        href: "http://localhost/causal-delay-feedback.html?replay=central",
      },
    }),
    undefined,
  );
  assert.equal(
    getCentralBridgeReplayMode({
      location: {
        href: "http://localhost/causal-delay-feedback.html?replay=central&solverReplay=app-playback",
      },
    }),
    undefined,
  );
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
    location: { href: "http://localhost/causal-delay-feedback.html?replay=central" },
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
    assert.equal(afterReceiver.active, false);
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
  assert.equal(visualWeight.alphaScale, 0.28);
  assert.equal(visualWeight.desaturation, 0.56);
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

  assert.equal(summary.activeLinkCount, 5);
  assert.equal(summary.staleCount, 1);
  assert.equal(summary.rejectedCount, 0);
  assert.equal(summary.receivedCount, 1);
  assert.equal(readout.children[2].textContent, "received=1/5");
  assert.equal(readout.children[readout.children.length - 1].textContent, "stale=1");
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

test("causal delay feedback initial-condition drag translates setup and replay preview", () => {
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

  const didEdit = runtime.applyInitialConditionDrag("positrino", { x: 56, y: -18 });

  assert.equal(didEdit, true);
  assert.equal(condition.x, before.conditionX + 56);
  assert.equal(condition.y, before.conditionY - 18);
  assert.equal(pathStart.x, before.pathX + 56);
  assert.equal(historyPoint.x, before.historyX + 56);
  assert.equal(runtime.dataset.datasetSource, DIRECT_MANIPULATION_DRAFT_PREVIEW);
  assert.equal(runtime.dataset.draftPreview.reason, "initial_condition_drag_preview");
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
  const laterPoint = runtime.dataset.history.positrino.find((point) => point.depth === 4);
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
  assertNear(condition.vx, before.vx + 400);
  assertNear(condition.vy, before.vy - 200);
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

test("causal delay feedback initial-condition release reruns central replay with edited setup", async () => {
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

  runtime.applyInitialConditionDrag("electrino", { x: -42, y: 31 });
  runtime.dragState = { type: "initial-condition", kind: "electrino", didEdit: true };
  await runtime.finishDrag();

  assert.equal(capturedRequestOptions.initialConditions.electrino.x, runtime.dataset.initialConditions.electrino.x);
  assert.equal(capturedRequestOptions.initialConditions.electrino.y, runtime.dataset.initialConditions.electrino.y);
  assert.equal(capturedRequestOptions.replayDataset.datasetSource, DIRECT_MANIPULATION_DRAFT_PREVIEW);
  assert.equal(runtime.dataset.datasetSource, CENTRAL_SOLVER_REPLAY_DATASET_SOURCE);
  assert.equal(runtime.replayLoadState, "ready");
  assert.equal(replayStatus.textContent, "solver bridge replay");
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
