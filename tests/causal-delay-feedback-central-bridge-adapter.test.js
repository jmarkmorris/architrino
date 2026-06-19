import assert from "node:assert/strict";
import { test } from "node:test";

import {
  CAUSAL_DELAY_FEEDBACK_APP_ID,
  CENTRAL_SOLVER_REPLAY_ADAPTER,
  CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
  CENTRAL_SOLVER_MOTION_REPLAY_MODE,
  createCausalDelayFeedbackBridgeReplayRequest,
  createCausalDelayFeedbackCentralBridgeAdapter,
  normalizeCausalDelayFeedbackBridgeReplay,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackCentralBridgeAdapter.js";

function createBridgeReplayResponse(overrides = {}) {
  return {
    runId: "causal-delay-test-run",
    datasetId: "causal-delay-test-dataset",
    presetId: "accepted_tight_bright",
    status: { code: "ok", severity: "ok", message: "bridge replay ready" },
    frames: [
      {
        t: 0,
        positrino: { x: 100, y: 220, vx: 12, vy: 5 },
        electrino: { x: 100, y: 780, vx: 12, vy: -5 },
      },
      {
        t: 0.5,
        positrino: { x: 620, y: 470, vx: 20, vy: 8 },
        electrino: { x: 640, y: 560, vx: 20, vy: -8 },
      },
      {
        t: 1,
        positrino: { x: 1300, y: 520, vx: 16, vy: -2 },
        electrino: { x: 1300, y: 620, vx: 16, vy: 2 },
      },
    ],
    history: {
      positrino: [
        { depth: 1, t: 0.1, x: 240, y: 260, weight: 0.25, state: "older" },
        { depth: 2, t: 0.35, x: 520, y: 390, weight: 0.5, state: "active" },
        { depth: 3, t: 0.65, x: 870, y: 505, weight: 0.75, state: "active" },
        { depth: 4, t: 0.9, x: 1220, y: 515, weight: 1, state: "newer" },
      ],
      electrino: [
        { depth: 1, t: 0.1, x: 230, y: 820, weight: 0.25, state: "older" },
        { depth: 2, t: 0.35, x: 520, y: 680, weight: 0.5, state: "active" },
        { depth: 3, t: 0.65, x: 890, y: 595, weight: 0.75, state: "active" },
        { depth: 4, t: 0.9, x: 1230, y: 610, weight: 1, state: "newer" },
      ],
    },
    delayedHits: [
      {
        sourceKind: "positrino",
        receiverKind: "electrino",
        sourceDepth: 1,
        receiverDepth: 2,
        weight: 0.25,
        rootStatus: "active",
      },
      {
        sourceKind: "electrino",
        receiverKind: "positrino",
        sourceDepth: 1,
        receiverDepth: 2,
        weight: 0.25,
        rootStatus: "active",
      },
      {
        sourceKind: "positrino",
        receiverKind: "electrino",
        sourceDepth: 2,
        receiverDepth: 3,
        weight: 0.5,
        rootStatus: "active",
      },
    ],
    diagnostics: [{ code: "causal_delay_replay_fixture", severity: "info" }],
    summary: { retainedDepth: 4 },
    ...overrides,
  };
}

function createMotionRunResponse(request) {
  const motion = request.config.motionIntegrationRequest;
  const times = [
    motion.startTime,
    motion.startTime + (motion.endTime - motion.startTime) * 0.5,
    motion.endTime,
  ];
  return {
    requestId: request.requestId,
    runId: request.runId,
    datasetId: request.datasetId,
    response: {
      runId: request.runId,
      datasetId: request.datasetId,
      status: { code: "ok", severity: "ok", message: "motion simulation completed" },
      summary: { frameCount: times.length, pathCount: 1 },
      diagnostics: [{ code: `motion_path_${motion.pathKey}`, severity: "info" }],
      frames: times.map((time, frameIndex) => {
        const dt = time - motion.startTime;
        return {
          pathKey: motion.pathKey,
          frameIndex,
          time,
          position: {
            x: motion.initialPosition.x + motion.initialVelocity.x * dt,
            y: motion.initialPosition.y + motion.initialVelocity.y * dt,
            z: 0,
          },
          velocity: motion.initialVelocity,
          errorBound: 0,
          stateFlags: motion.stateFlags,
        };
      }),
    },
  };
}

test("causal delay bridge replay request declares the central bridge contract", () => {
  const request = createCausalDelayFeedbackBridgeReplayRequest({
    presetId: "full_circular_arcs",
    runId: "causal-delay-bridge-proof",
    historyDepth: 4,
    frameCount: 96,
    runDuration: 2,
    initialConditions: {
      positrino: { x: 100, y: 200, vx: 1, vy: 0 },
      electrino: { x: 100, y: 800, vx: 1, vy: 0 },
    },
  });

  assert.equal(request.appId, CAUSAL_DELAY_FEEDBACK_APP_ID);
  assert.equal(request.runKind, "appPlayback");
  assert.equal(request.model.modelId, "aaa.central-solver");
  assert.equal(request.model.unitConvention, "solver-si");
  assert.deepEqual(request.model.compatiblePrecisionPaths, [
    "scaled_f64_strict",
    "event_root_focused",
    "extended_precision",
  ]);
  assert.equal(request.envelope.entityCount, 16);
  assert.equal(request.envelope.memoryBudgetBytes, 128 * 1024 * 1024);
  assert.equal(request.envelope.storageBudgetBytes, 512 * 1024 * 1024);
  assert.equal(request.errorBudget.rootIsolationTolerance, 1e-14);
  assert.equal(request.config.solverTarget, "central_solver_bridge_path_history_stream");
  assert.equal(request.config.presetId, "full_circular_arcs");
  assert.equal(request.config.initialConditions.positrino.x, 100);
  assert.equal(request.config.initialConditions.electrino.y, 800);
  assert.equal(request.config.geometry.initialConditions.positrino.vx, 1);
  assert.equal(request.config.replay.historyDepth, 4);
  assert(request.config.frames.length > 0);
  assert.equal(request.config.hits.length, 6);
  assert.equal(request.config.geometry.history.positrino.length, 4);
  assert.equal(request.config.frames[0].pathKey, 1);
  assert.equal(request.config.hits[0].sourceKind, "positrino");
  assert.deepEqual(request.output.outputs, [
    "frameBuffer",
    "pathStream",
    "rootLedger",
    "delayedHitEvents",
    "diagnostics",
  ]);
});

test("causal delay bridge replay normalizer accepts central appPlayback motion frames", () => {
  const request = createCausalDelayFeedbackBridgeReplayRequest({
    presetId: "accepted_tight_bright",
    runId: "causal-delay-bridge-motion-frame-proof",
  });
  const dataset = normalizeCausalDelayFeedbackBridgeReplay({
    requestId: request.requestId,
    runId: request.runId,
    datasetId: request.datasetId,
    response: {
      runId: request.runId,
      datasetId: request.datasetId,
      status: { code: "ok", severity: "ok", message: "app playback dataset prepared" },
      summary: { frameCount: request.config.frames.length, pathCount: 2 },
      frames: request.config.frames,
      hits: request.config.hits,
      geometry: request.config.geometry,
      diagnostics: request.config.diagnostics,
    },
  });

  assert.equal(dataset.runId, "causal-delay-bridge-motion-frame-proof");
  assert.equal(dataset.frames.length, 180);
  assert.equal(dataset.paths.positrino[0].x, request.config.frames[0].position.x);
  assert.equal(
    dataset.paths.electrino.at(-1).x,
    request.config.frames.filter((frame) => frame.pathKey === 2).at(-1).position.x,
  );
  assert.equal(dataset.history.positrino.length, 4);
  assert.equal(dataset.wakeLinks.length, 6);
  assert.equal(dataset.wakeLinks[0].label, "red 1 -> blue 2");
});

test("causal delay bridge replay normalizer returns runtime dataset shape", () => {
  const dataset = normalizeCausalDelayFeedbackBridgeReplay({
    requestId: "request",
    response: createBridgeReplayResponse(),
  });

  assert.equal(dataset.datasetSource, CENTRAL_SOLVER_REPLAY_DATASET_SOURCE);
  assert.equal(dataset.solverIntegrationPath, CENTRAL_SOLVER_REPLAY_ADAPTER);
  assert.equal(dataset.futureSolverTarget, "central_solver_bridge_path_history_stream");
  assert.equal(dataset.wakeArcDisplayMode, "partial_propagating_arcs");
  assert.equal(dataset.paths.positrino.length, 3);
  assert.equal(dataset.paths.electrino[1].x, 640);
  assert.equal(dataset.history.positrino[0].depth, 1);
  assert.equal(dataset.history.electrino[3].state, "newer");
  assert.equal(dataset.wakeLinks.length, 3);
  assert.equal(dataset.wakeLinks[0].label, "red 1 -> blue 2");
  assert.deepEqual(dataset.wakeLinks[0].color, { r: 255, g: 150, b: 166, a: 1 });
  assert.deepEqual(dataset.wakeLinks[1].color, { r: 150, g: 170, b: 255, a: 1 });
  assert.equal(dataset.wakeLinks[0].receiver.x, 520);
  assert.equal(dataset.wakeLinks[0].emissionTime, dataset.history.positrino[0].t);
  assert.equal(dataset.wakeLinks[0].hitTime, dataset.history.electrino[1].t);
  assert.equal(dataset.wakeLinks[0].travelTime, dataset.history.electrino[1].t - dataset.history.positrino[0].t);
  assert.equal(dataset.diagnostics[0].code, "causal_delay_replay_fixture");
});

test("causal delay central bridge adapter normalizes an injected bridge run", async () => {
  const adapter = createCausalDelayFeedbackCentralBridgeAdapter({
    async runSolverBridge(request) {
      assert.equal(request.appId, CAUSAL_DELAY_FEEDBACK_APP_ID);
      assert.equal(request.config.presetId, "accepted_tight_bright");
      return {
        requestId: request.requestId,
        runId: request.runId,
        datasetId: request.datasetId,
        response: createBridgeReplayResponse({
          runId: request.runId,
          datasetId: request.datasetId,
        }),
      };
    },
  });

  const dataset = await adapter.createReplayAsync({ presetId: "accepted_tight_bright" });

  assert.equal(adapter.id, CENTRAL_SOLVER_REPLAY_ADAPTER);
  assert.equal(dataset.runId, "causal-delay-feedback-accepted_tight_bright");
  assert.equal(dataset.datasetId, "causal-delay-feedback-accepted_tight_bright-dataset");
  assert.equal(dataset.frames[2].positrino.x, 1300);
});

test("causal delay central bridge adapter normalizes appPlayback-shaped bridge responses", async () => {
  const adapter = createCausalDelayFeedbackCentralBridgeAdapter({
    async runSolverBridge(request) {
      assert.equal(request.appId, CAUSAL_DELAY_FEEDBACK_APP_ID);
      assert(request.config.frames.length > 0);
      assert.equal(request.config.hits.length, 6);
      return {
        requestId: request.requestId,
        runId: request.runId,
        datasetId: request.datasetId,
        response: {
          runId: request.runId,
          datasetId: request.datasetId,
          status: { code: "ok", severity: "ok", message: "app playback dataset prepared" },
          summary: { frameCount: request.config.frames.length, pathCount: 2 },
          frames: request.config.frames,
          hits: request.config.hits,
          geometry: request.config.geometry,
          diagnostics: [{ code: "ok", severity: "ok", message: "bridge callback accepted" }],
        },
      };
    },
  });

  const dataset = await adapter.createReplayAsync({ presetId: "accepted_tight_bright" });

  assert.equal(dataset.datasetSource, CENTRAL_SOLVER_REPLAY_DATASET_SOURCE);
  assert.equal(dataset.solverIntegrationPath, CENTRAL_SOLVER_REPLAY_ADAPTER);
  assert.equal(dataset.solverStatus.code, "ok");
  assert.equal(dataset.frames.length, 180);
  assert.equal(dataset.wakeLinks.length, 6);
  assert.equal(dataset.history.electrino[1].depth, 2);
});

test("causal delay central bridge adapter can build replay frames from central motion simulations", async () => {
  const requests = [];
  const adapter = createCausalDelayFeedbackCentralBridgeAdapter({
    solverReplayMode: CENTRAL_SOLVER_MOTION_REPLAY_MODE,
    async runSolverBridge(request) {
      requests.push(request);
      assert.equal(request.appId, CAUSAL_DELAY_FEEDBACK_APP_ID);
      assert.equal(request.runKind, CENTRAL_SOLVER_MOTION_REPLAY_MODE);
      assert.equal(request.config.appId, CAUSAL_DELAY_FEEDBACK_APP_ID);
      assert.equal(request.output.outputs.includes("frameBuffer"), true);
      assert.equal(request.output.outputs.includes("pathStream"), true);
      return createMotionRunResponse(request);
    },
  });

  const dataset = await adapter.createReplayAsync({
    presetId: "accepted_tight_bright",
    requestOptions: {
      frameCount: 3,
      runDuration: 1,
      initialConditions: {
        positrino: { kind: "positrino", t: 0, x: 10, y: 20, vx: 100, vy: 0 },
        electrino: { kind: "electrino", t: 0, x: 30, y: 700, vx: 80, vy: -50 },
      },
    },
  });

  assert.equal(requests.length, 2);
  assert.deepEqual(
    requests.map((request) => request.config.motionIntegrationRequest.pathKey),
    [1, 2],
  );
  assert.equal(requests[0].config.motionIntegrationRequest.maxFrames, 3);
  assert.equal(dataset.datasetSource, CENTRAL_SOLVER_REPLAY_DATASET_SOURCE);
  assert.equal(dataset.solverIntegrationPath, CENTRAL_SOLVER_REPLAY_ADAPTER);
  assert.equal(dataset.frames.length, 3);
  assert.equal(dataset.frames[2].positrino.x, 110);
  assert.equal(dataset.frames[2].electrino.y, 650);
  assert.equal(dataset.history.positrino.length, 4);
  assert.equal(dataset.wakeLinks.length, 6);
  assert.equal(dataset.wakeLinks[0].emissionTime, dataset.history.positrino[0].t);
  assert.equal(dataset.wakeLinks[0].hitTime, dataset.history.electrino[1].t);
  assert.equal(dataset.solverSummary.replayMode, CENTRAL_SOLVER_MOTION_REPLAY_MODE);
  assert.equal(dataset.diagnostics[0].code, "causal_delay_motion_solver_replay");
});

test("causal delay bridge replay normalizer fails closed without retained history", () => {
  const response = createBridgeReplayResponse({ history: undefined });

  assert.throws(
    () => normalizeCausalDelayFeedbackBridgeReplay(response),
    /bridge response history must be an object/,
  );
});

test("causal delay bridge replay normalizer fails closed for unresolved wake references", () => {
  const response = createBridgeReplayResponse({
    delayedHits: [
      {
        sourceKind: "positrino",
        receiverKind: "electrino",
        sourceDepth: 1,
        receiverDepth: 8,
        weight: 0.2,
      },
    ],
  });

  assert.throws(
    () => normalizeCausalDelayFeedbackBridgeReplay(response),
    /missing receiver electrino 8/,
  );
});
