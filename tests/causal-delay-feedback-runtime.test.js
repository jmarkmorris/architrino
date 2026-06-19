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
  assert.equal(readout.children[8].textContent, "partial arc");
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

test("causal delay feedback page selects central replay only from explicit query flags", () => {
  assert.equal(shouldUseCentralBridgeReplay(fakeWindow), false);
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

  const centralRuntime = createCausalDelayFeedbackRuntimeForPage({
    location: { href: "http://localhost/causal-delay-feedback.html?adapter=bridge" },
  });

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
    getCentralBridgeReplayMode({
      location: {
        href: "http://localhost/causal-delay-feedback.html?replay=central",
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
