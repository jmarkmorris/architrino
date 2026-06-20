import assert from "node:assert/strict";
import { test } from "node:test";

import {
  CAUSAL_DELAY_FEEDBACK_APP_ID,
  CENTRAL_SOLVER_REPLAY_ADAPTER,
  CENTRAL_SOLVER_REPLAY_DATASET_SOURCE,
  CENTRAL_SOLVER_MOTION_REPLAY_MODE,
  CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE,
  createCausalDelayFeedbackBridgeReplayRequest,
  createCausalDelayFeedbackCentralBridgeAdapter,
  normalizeCausalDelayFeedbackBridgeReplay,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackCentralBridgeAdapter.js";
import { createMockCausalDelayReplayDataset } from "../src/apps/causal-delay-feedback/CausalDelayFeedbackReplayAdapter.js";

function assertNear(actual, expected, epsilon = 1e-9) {
  assert.ok(Math.abs(actual - expected) <= epsilon, `${actual} should be near ${expected}`);
}

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
            x: motion.initialPosition.x + motion.initialVelocity.x * dt + 0.5 * motion.acceleration.x * dt * dt,
            y: motion.initialPosition.y + motion.initialVelocity.y * dt + 0.5 * motion.acceleration.y * dt * dt,
            z: motion.initialPosition.z + motion.initialVelocity.z * dt + 0.5 * motion.acceleration.z * dt * dt,
          },
          velocity: {
            x: motion.initialVelocity.x + motion.acceleration.x * dt,
            y: motion.initialVelocity.y + motion.acceleration.y * dt,
            z: motion.initialVelocity.z + motion.acceleration.z * dt,
          },
          errorBound: 0,
          stateFlags: motion.stateFlags,
        };
      }),
    },
  };
}

function createPairInteractionRunResponse(request) {
  const pair = request.config.pairInteractionRequest;
  const constraints = Array.isArray(pair.pathConstraints) ? pair.pathConstraints : [];
  const residualSampleCount = constraints.length > 0
    ? pair.initialStates.reduce((total, state) => {
        const pathTimes = new Set(
          constraints
            .filter((constraint) => constraint.pathKey === state.pathKey)
            .map((constraint) => constraint.time),
        );
        return total + Math.max(0, pathTimes.size - 2);
      }, 0)
    : 0;
  const maxConstraintResidual = residualSampleCount > 0 ? 0.125 : 0;
  const boundaryResidualSampleCount = residualSampleCount;
  const maxBoundaryResidual = boundaryResidualSampleCount > 0 ? 0.25 : 0;
  const guidanceSampleCount = constraints.length > 0 ? Math.max(0, constraints.length - 2) : 0;
  const times = constraints.length > 0
    ? Array.from(new Set([pair.startTime, pair.endTime, ...constraints.map((constraint) => constraint.time)]))
      .sort((left, right) => left - right)
    : [
        pair.startTime,
        pair.startTime + (pair.endTime - pair.startTime) * 0.5,
        pair.endTime,
      ];
  return {
    requestId: request.requestId,
    runId: request.runId,
    datasetId: request.datasetId,
    response: {
      runId: request.runId,
      datasetId: request.datasetId,
      status: { code: "ok", severity: "ok", message: "pair interaction path simulation completed" },
      summary: {
        frameCount: times.length * pair.initialStates.length,
        pathCount: pair.initialStates.length,
        stepCount: times.length - 1,
        interactionLaw: pair.interactionLaw,
        executionPath: "native_c_abi",
        pathConstraintCount: constraints.length,
        pathConstraintResidualSampleCount: residualSampleCount,
        maxPathConstraintResidual: maxConstraintResidual,
        meanPathConstraintResidual: residualSampleCount > 0 ? 0.0625 : 0,
        rmsPathConstraintResidual: residualSampleCount > 0 ? 0.088 : 0,
        pathConstraintGuidanceSampleCount: guidanceSampleCount,
        pathConstraintGuidanceMode: guidanceSampleCount > 0 ? "retained_knot_hermite_boundary" : undefined,
        maxPathConstraintGuidanceAcceleration: guidanceSampleCount > 0 ? 4.5 : 0,
        meanPathConstraintGuidanceAcceleration: guidanceSampleCount > 0 ? 2.25 : 0,
        rmsPathConstraintGuidanceAcceleration: guidanceSampleCount > 0 ? 3.1 : 0,
        pathConstraintBoundaryResidualSampleCount: boundaryResidualSampleCount,
        maxPathConstraintBoundaryResidual: maxBoundaryResidual,
        meanPathConstraintBoundaryResidual: boundaryResidualSampleCount > 0 ? 0.125 : 0,
        rmsPathConstraintBoundaryResidual: boundaryResidualSampleCount > 0 ? 0.177 : 0,
      },
      diagnostics: [{ code: "pair_interaction_path", severity: "info" }],
      frames: times.flatMap((time, frameIndex) => (
        pair.initialStates.map((state) => {
          const dt = time - pair.startTime;
          return {
            pathKey: state.pathKey,
            frameIndex,
            time,
            position: {
              ...pointAtPairConstraintOrLinearPath(pair, state, time, dt),
            },
            velocity: state.initialVelocity,
            errorBound: 0,
            stateFlags: state.stateFlags,
          };
        })
      )),
    },
  };
}

function pointAtPairConstraintOrLinearPath(pair, state, time, dt) {
  const constraints = (pair.pathConstraints ?? [])
    .filter((constraint) => constraint.pathKey === state.pathKey)
    .slice()
    .sort((left, right) => left.time - right.time);
  if (constraints.length === 0) {
    return {
      x: state.initialPosition.x + state.initialVelocity.x * dt,
      y: state.initialPosition.y + state.initialVelocity.y * dt,
      z: state.initialPosition.z + state.initialVelocity.z * dt,
    };
  }
  if (time <= constraints[0].time) {
    return constraints[0].position;
  }
  const last = constraints.at(-1);
  if (time >= last.time) {
    return last.position;
  }
  const rightIndex = constraints.findIndex((constraint) => constraint.time >= time);
  const left = constraints[Math.max(0, rightIndex - 1)];
  const right = constraints[rightIndex] ?? last;
  const span = right.time - left.time;
  const amount = span <= 0 ? 0 : (time - left.time) / span;
  return {
    x: left.position.x + (right.position.x - left.position.x) * amount,
    y: left.position.y + (right.position.y - left.position.y) * amount,
    z: left.position.z + (right.position.z - left.position.z) * amount,
  };
}

function createDelayedHitRunResponse(request) {
  const rootRequest = request.config.rootRequest;
  const link = request.config.link;
  const emissionPoint = pointAtSegment(rootRequest.source, link.emissionTime);
  const receiverPoint = pointAtSegment(rootRequest.receiver, link.hitTime);
  const distance = Math.hypot(
    receiverPoint.x - emissionPoint.x,
    receiverPoint.y - emissionPoint.y,
    receiverPoint.z - emissionPoint.z,
  );
  return {
    requestId: request.requestId,
    runId: request.runId,
    datasetId: request.datasetId,
    response: {
      runId: request.runId,
      datasetId: request.datasetId,
      status: { code: "ok", severity: "ok", message: "delayed-hit simulation completed" },
      summary: { rootCount: 1, eventCount: 1 },
      diagnostics: [{ code: `delayed_hit_${link.sourceDepth}_${link.receiverDepth}`, severity: "info" }],
      roots: [
        {
          rootId: 0,
          statusCode: 0,
          emissionTime: link.emissionTime,
          hitTime: link.hitTime,
          delay: link.travelTime,
          distance,
          residual: 0,
          jacobian: 1,
          branchWeight: 1,
          sourcePoint: emissionPoint,
          receiverPoint,
        },
      ],
      hits: [
        {
          eventId: 0,
          rootId: 0,
          statusCode: 0,
          emissionTime: link.emissionTime,
          hitTime: link.hitTime,
          distance,
          jacobian: 1,
          strength: link.weight,
          emissionPoint,
          receiverPoint,
          unitDirection: {
            x: distance === 0 ? 0 : (receiverPoint.x - emissionPoint.x) / distance,
            y: distance === 0 ? 0 : (receiverPoint.y - emissionPoint.y) / distance,
            z: distance === 0 ? 0 : (receiverPoint.z - emissionPoint.z) / distance,
          },
        },
      ],
      rootLedgerDetails: [
        {
          ledgerKey: link.sourceDepth * 100 + link.receiverDepth,
          rootKey: 0,
          bracketStart: link.emissionTime,
          bracketEnd: link.hitTime,
          residual: 0,
          iterationCount: 4,
          statusCode: 0,
        },
      ],
    },
  };
}

function pointAtSegment(segment, time) {
  const dt = time - segment.startTime;
  return {
    x: segment.positionAtStart.x + segment.velocity.x * dt,
    y: segment.positionAtStart.y + segment.velocity.y * dt,
    z: (segment.positionAtStart.z ?? 0) + (segment.velocity.z ?? 0) * dt,
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
  assert.equal(request.config.geometry.virtualObserver.label, "Virtual Observer");
  assert.equal(request.config.geometry.canvasColorId, "architrinoPurple");
  assert.equal(request.config.replay.historyDepth, 4);
  assert.equal(request.config.motion.accelerationPolicy, "pair_segmented_attraction_seed");
  assert.equal(request.config.motion.pairSegmentCount, 12);
  assert(request.config.frames.length > 0);
  assert.equal(request.config.hits.length, 10);
  assert.equal(request.config.geometry.history.positrino.length, 6);
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
  assert.equal(dataset.history.positrino.length, 6);
  assert.equal(dataset.wakeLinks.length, 10);
  assert.equal(dataset.wakeLinks[0].label, "red 1 -> blue 2");
  assert.equal(dataset.virtualObserver.x, request.config.geometry.virtualObserver.x);
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
  assert.equal(dataset.canvasColorId, "architrinoPurple");
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

  const colorDataset = normalizeCausalDelayFeedbackBridgeReplay({
    requestId: "request",
    response: createBridgeReplayResponse({ canvasColorId: "warm" }),
  });
  assert.equal(colorDataset.canvasColorId, "warm");
});

test("causal delay central bridge adapter uses pair interaction by default", async () => {
  const requests = [];
  const adapter = createCausalDelayFeedbackCentralBridgeAdapter({
    async runSolverBridge(request) {
      requests.push(request);
      assert.equal(request.appId, CAUSAL_DELAY_FEEDBACK_APP_ID);
      if (request.runKind === CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE) {
        assert.equal(request.config.pairInteractionRequest.initialStates.length, 2);
        assert.equal(request.config.pairInteractionRequest.pathConstraints.length, 0);
        return createPairInteractionRunResponse(request);
      }
      return createDelayedHitRunResponse(request);
    },
  });

  const dataset = await adapter.createReplayAsync({ presetId: "accepted_tight_bright" });
  const pairRequests = requests.filter((request) => request.runKind === CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE);

  assert.equal(adapter.id, CENTRAL_SOLVER_REPLAY_ADAPTER);
  assert.equal(dataset.runId, "causal-delay-feedback-accepted_tight_bright");
  assert.equal(dataset.datasetId, "causal-delay-feedback-accepted_tight_bright-dataset");
  assert.equal(pairRequests.length, 1);
  assert.equal(dataset.solverReplayMode, CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE);
  assert.equal(dataset.solverSummary.replayMode, CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE);
  assert.equal(dataset.solverSummary.pairInteractionStepCount, 2);
  assert.equal(dataset.solverSummary.executionPath, "native_c_abi");
  assert.equal(dataset.executionPath, "native_c_abi");
  assert.equal(dataset.displayProjection, "time_space_canvas_fit_v1");
  assert.equal(dataset.pairInteractionStepCount, 2);
  assert.equal(dataset.interactionLaw, "display_pair_attraction_v1");
  assert.equal(dataset.wakeLinks.length, 10);
  assert.equal(dataset.frames[0].t, 0);
  assert.equal(dataset.frames.at(-1).t, 1);
  assertNear(dataset.paths.positrino[0].x, 96);
  assertNear(dataset.paths.positrino.at(-1).x, 1824);
  assertNear(dataset.paths.electrino[0].x, 96);
  assertNear(dataset.paths.electrino.at(-1).x, 1824);
  const projectedYValues = [
    ...dataset.paths.positrino.map((point) => point.y),
    ...dataset.paths.electrino.map((point) => point.y),
  ];
  assert(Math.min(...projectedYValues) >= 215.9);
  assert(Math.max(...projectedYValues) <= 864.1);
});

test("causal delay central bridge adapter submits retained path constraints after a draft point edit", async () => {
  const draftDataset = createMockCausalDelayReplayDataset("accepted_tight_bright");
  const finalPoint = draftDataset.history.electrino.at(-1);
  finalPoint.x -= 72;
  finalPoint.y += 44;
  draftDataset.paths.electrino.at(-1).x = finalPoint.x;
  draftDataset.paths.electrino.at(-1).y = finalPoint.y;
  draftDataset.draftPreview = {
    reason: "retained_point_drag_preview",
    authoritative: false,
  };
  let capturedPairRequest = null;
  const adapter = createCausalDelayFeedbackCentralBridgeAdapter({
    async runSolverBridge(request) {
      if (request.runKind === CENTRAL_SOLVER_PAIR_INTERACTION_REPLAY_MODE) {
        capturedPairRequest = request;
        return createPairInteractionRunResponse(request);
      }
      return createDelayedHitRunResponse(request);
    },
  });

  const dataset = await adapter.createReplayAsync({
    presetId: "accepted_tight_bright",
    requestOptions: {
      replayDataset: draftDataset,
      initialConditions: draftDataset.initialConditions,
    },
  });
  const constrainedFinal = capturedPairRequest.config.pairInteractionRequest.pathConstraints.find(
    (constraint) => constraint.pathKey === 2 && constraint.depth === 6,
  );
  const constrainedStart = capturedPairRequest.config.pairInteractionRequest.pathConstraints.find(
    (constraint) => constraint.pathKey === 1 && constraint.depth === 1,
  );

  assert.equal(capturedPairRequest.config.pairInteractionRequest.pathConstraints.length, 12);
  assert.equal(constrainedStart.time, draftDataset.history.positrino[0].t);
  assert.equal(constrainedStart.position.x, draftDataset.history.positrino[0].x);
  assert.equal(constrainedStart.position.y, draftDataset.history.positrino[0].y);
  assert.equal(constrainedFinal.position.x, finalPoint.x);
  assert.equal(constrainedFinal.position.y, finalPoint.y);
  assert.equal(dataset.pathConstraintCount, 12);
  assert.equal(dataset.pathConstraintResidualSampleCount, 8);
  assert.equal(dataset.maxPathConstraintResidual, 0.125);
  assert.equal(dataset.pathConstraintGuidanceSampleCount, 10);
  assert.equal(dataset.pathConstraintGuidanceMode, "retained_knot_hermite_boundary");
  assert.equal(dataset.maxPathConstraintGuidanceAcceleration, 4.5);
  assert.equal(dataset.pathConstraintBoundaryResidualSampleCount, 8);
  assert.equal(dataset.maxPathConstraintBoundaryResidual, 0.25);
  assert.equal(dataset.displayProjection, undefined);
  assert.equal(dataset.solverSummary.pathConstraintCount, 12);
  assert.equal(dataset.solverSummary.pathConstraintResidualSampleCount, 8);
  assert.equal(dataset.solverSummary.pathConstraintGuidanceSampleCount, 10);
  assert.equal(dataset.solverSummary.pathConstraintGuidanceMode, "retained_knot_hermite_boundary");
  assert.equal(dataset.solverSummary.pathConstraintBoundaryResidualSampleCount, 8);
  assert.equal(dataset.history.electrino.at(-1).x, finalPoint.x);
  assert.equal(dataset.history.electrino.at(-1).y, finalPoint.y);
});

test("causal delay central bridge adapter normalizes appPlayback-shaped bridge responses", async () => {
  const adapter = createCausalDelayFeedbackCentralBridgeAdapter({
    solverReplayMode: "appPlayback",
    async runSolverBridge(request) {
      assert.equal(request.appId, CAUSAL_DELAY_FEEDBACK_APP_ID);
      assert(request.config.frames.length > 0);
      assert.equal(request.config.hits.length, 10);
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
  assert.equal(dataset.wakeLinks.length, 10);
  assert.equal(dataset.history.electrino[1].depth, 2);
});

test("causal delay central bridge adapter can build replay frames from central motion simulations", async () => {
  const requests = [];
  const adapter = createCausalDelayFeedbackCentralBridgeAdapter({
    solverReplayMode: CENTRAL_SOLVER_MOTION_REPLAY_MODE,
    async runSolverBridge(request) {
      requests.push(request);
      assert.equal(request.appId, CAUSAL_DELAY_FEEDBACK_APP_ID);
      assert.equal(request.config.appId, CAUSAL_DELAY_FEEDBACK_APP_ID);
      if (request.runKind === CENTRAL_SOLVER_MOTION_REPLAY_MODE) {
        assert.equal(request.output.outputs.includes("frameBuffer"), true);
        assert.equal(request.output.outputs.includes("pathStream"), true);
        return createMotionRunResponse(request);
      }
      assert.equal(request.runKind, "delayedHits");
      assert.equal(request.output.outputs.includes("delayedHitEvents"), true);
      assert.equal(request.config.rootRequest.hitTime, request.config.link.hitTime);
      assert.equal(request.config.rootRequest.signalSpeed > 0, true);
      return createDelayedHitRunResponse(request);
    },
  });

  const dataset = await adapter.createReplayAsync({
    presetId: "accepted_tight_bright",
    requestOptions: {
      frameCount: 3,
      runDuration: 1,
      motionAccelerationPolicy: "pair_initial_attraction_seed",
      initialConditions: {
        positrino: { kind: "positrino", t: 0, x: 10, y: 20, vx: 100, vy: 0, ax: 6, ay: -4 },
        electrino: { kind: "electrino", t: 0, x: 30, y: 700, vx: 80, vy: -50 },
      },
    },
  });

  assert.equal(requests.length, 12);
  assert.deepEqual(
    requests
      .filter((request) => request.runKind === CENTRAL_SOLVER_MOTION_REPLAY_MODE)
      .map((request) => request.config.motionIntegrationRequest.pathKey),
    [1, 2],
  );
  assert.equal(requests[0].config.motionIntegrationRequest.maxFrames, 3);
  assertNear(requests[0].config.motionIntegrationRequest.acceleration.x, 3.6);
  assertNear(requests[0].config.motionIntegrationRequest.acceleration.y, 122.4);
  assertNear(requests[1].config.motionIntegrationRequest.acceleration.x, -3.6);
  assertNear(requests[1].config.motionIntegrationRequest.acceleration.y, -122.4);
  assert.equal(requests[0].config.motionIntegrationRequest.acceleration.z, 0);
  assert.equal(requests[0].config.metadata.accelerationPolicy, "pair_initial_attraction_seed");
  assert.equal(requests.filter((request) => request.runKind === "delayedHits").length, 10);
  assert.equal(dataset.datasetSource, CENTRAL_SOLVER_REPLAY_DATASET_SOURCE);
  assert.equal(dataset.solverIntegrationPath, CENTRAL_SOLVER_REPLAY_ADAPTER);
  assert.equal(dataset.frames.length, 3);
  assertNear(dataset.frames[2].positrino.x, 111.8);
  assertNear(dataset.frames[2].positrino.y, 81.2);
  assertNear(dataset.frames[2].electrino.y, 588.8);
  assert.equal(dataset.history.positrino.length, 6);
  assert.equal(dataset.wakeLinks.length, 10);
  assert.equal(dataset.wakeLinks[0].emissionTime, dataset.history.positrino[0].t);
  assert.equal(dataset.wakeLinks[0].hitTime, dataset.history.electrino[1].t);
  assert.equal(dataset.wakeLinks[0].solverEmissionTime, dataset.wakeLinks[0].emissionTime);
  assert.equal(dataset.wakeLinks[0].solverHitTime, dataset.wakeLinks[0].hitTime);
  assert.equal(dataset.wakeLinks[0].solverResidual, 0);
  assert.equal(dataset.wakeLinks[0].solverRootStatusCode, 0);
  assert.equal(dataset.wakeLinks[0].solverHitStatusCode, 0);
  assert.equal(dataset.wakeLinks[0].solverRunId.endsWith("-delayed-hit"), true);
  assert.equal(dataset.wakeLinks[0].rootLedgerDetails.length, 1);
  assert.equal(dataset.wakeLinks[0].rootLedgerDetails[0].ledgerKey, 102);
  assert.equal(dataset.wakeLinks[0].rootLedgerDetails[0].iterationCount, 4);
  assert.equal(dataset.solverSummary.delayedHitRunIds.length, 10);
  assert.equal(dataset.solverSummary.replayMode, CENTRAL_SOLVER_MOTION_REPLAY_MODE);
  assert.equal(dataset.solverSummary.motionAccelerationPolicy, "pair_initial_attraction_seed");
  assert.equal(dataset.solverReplayMode, CENTRAL_SOLVER_MOTION_REPLAY_MODE);
  assert.equal(dataset.motionAccelerationPolicy, "pair_initial_attraction_seed");
  assert.equal(dataset.diagnostics[0].code, "causal_delay_motion_solver_replay");
  assert.match(dataset.diagnostics[0].message, /pair_initial_attraction_seed/);
});

test("causal delay central bridge adapter can opt into segmented pair attraction", async () => {
  const requests = [];
  const adapter = createCausalDelayFeedbackCentralBridgeAdapter({
    solverReplayMode: CENTRAL_SOLVER_MOTION_REPLAY_MODE,
    async runSolverBridge(request) {
      requests.push(request);
      if (request.runKind === CENTRAL_SOLVER_MOTION_REPLAY_MODE) {
        return createMotionRunResponse(request);
      }
      return createDelayedHitRunResponse(request);
    },
  });

  const dataset = await adapter.createReplayAsync({
    presetId: "accepted_tight_bright",
    requestOptions: {
      frameCount: 5,
      runDuration: 1,
      pairSegmentCount: 2,
      initialConditions: {
        positrino: { kind: "positrino", t: 0, x: 10, y: 20, vx: 100, vy: 0 },
        electrino: { kind: "electrino", t: 0, x: 30, y: 700, vx: 80, vy: -50 },
      },
    },
  });
  const motionRequests = requests.filter((request) => request.runKind === CENTRAL_SOLVER_MOTION_REPLAY_MODE);

  assert.equal(motionRequests.length, 4);
  assert.deepEqual(
    motionRequests.map((request) => request.config.metadata.provenance.segmentIndex),
    [0, 0, 1, 1],
  );
  assert.deepEqual(
    motionRequests.map((request) => request.config.motionIntegrationRequest.pathKey),
    [1, 2, 1, 2],
  );
  assert.equal(motionRequests[0].config.metadata.accelerationPolicy, "pair_segmented_attraction_seed");
  assert.equal(motionRequests[2].config.motionIntegrationRequest.startTime, 0.5);
  assert.notEqual(
    motionRequests[2].config.motionIntegrationRequest.acceleration.x,
    motionRequests[0].config.motionIntegrationRequest.acceleration.x,
  );
  assert.equal(dataset.solverSummary.motionAccelerationPolicy, "pair_segmented_attraction_seed");
  assert.equal(dataset.solverSummary.pairSegmentCount, 2);
  assert.equal(dataset.motionAccelerationPolicy, "pair_segmented_attraction_seed");
  assert.equal(dataset.pairSegmentCount, 2);
  assert.equal(dataset.solverSummary.motionRunIds.length, 4);
  assert.equal(dataset.frames[0].t, 0);
  assert.equal(dataset.frames.at(-1).t, 1);
  assert.equal(dataset.wakeLinks.length, 10);
});

test("causal delay central bridge adapter can opt into explicit acceleration", async () => {
  const requests = [];
  const adapter = createCausalDelayFeedbackCentralBridgeAdapter({
    solverReplayMode: CENTRAL_SOLVER_MOTION_REPLAY_MODE,
    async runSolverBridge(request) {
      requests.push(request);
      if (request.runKind === CENTRAL_SOLVER_MOTION_REPLAY_MODE) {
        return createMotionRunResponse(request);
      }
      return createDelayedHitRunResponse(request);
    },
  });

  await adapter.createReplayAsync({
    presetId: "accepted_tight_bright",
    requestOptions: {
      frameCount: 3,
      runDuration: 1,
      motionAccelerationPolicy: "explicit",
      initialConditions: {
        positrino: { kind: "positrino", t: 0, x: 10, y: 20, vx: 100, vy: 0, ax: 6, ay: -4 },
        electrino: { kind: "electrino", t: 0, x: 30, y: 700, vx: 80, vy: -50 },
      },
    },
  });

  const motionRequests = requests.filter((request) => request.runKind === CENTRAL_SOLVER_MOTION_REPLAY_MODE);

  assert.deepEqual(motionRequests[0].config.motionIntegrationRequest.acceleration, { x: 6, y: -4, z: 0 });
  assert.deepEqual(motionRequests[1].config.motionIntegrationRequest.acceleration, { x: 0, y: 0, z: 0 });
  assert.equal(motionRequests[0].config.metadata.accelerationPolicy, "explicit");
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
