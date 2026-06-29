import test from "node:test";
import assert from "node:assert/strict";

import {
  PHOTON_CONTROL_RANGES,
  PHOTON_DEFAULT_LAYER_RADII,
  PHOTON_DEFAULT_PLAYBACK_SPEED_MULTIPLIER,
  PHOTON_DEFAULT_LAYER_FREQUENCIES_HZ,
  PHOTON_LAYER_META,
  PHOTON_LAYER_SPEED_RATIO_TARGETS,
  PHOTON_MAX_OUTER_RADIUS,
  createDefaultPhotonState,
  getPhotonLocalCFromLorentzFactor,
  getPhotonLayerEnabled,
  getPhotonLayerAngleRadians,
  getPhotonLayerRadiusBounds,
  getPhotonFrequencyExponent,
  getPhotonFrequencyFromExponent,
  getPhotonPairSeparationFromLog10Ratio,
  getPhotonSeparationLog10Ratio,
  getPhotonSeparationReferenceRadius,
  getPhotonLayerTangentialSpeedRatio,
  getPhotonMiddleCycleBounds,
  getPhotonRunDuration,
  normalizePhotonState,
  resolvePhotonSpeedSettings,
  setPhotonLayerValue,
} from "../src/apps/photon/PhotonStateRuntime.js";
import {
  PHOTON_NAMED_PRESETS,
  createPhotonPresetState,
} from "../src/apps/photon/PhotonPresetRuntime.js";
import {
  getPhotonControlZeroPositionPercent,
  getPhotonControlZeroSnapThreshold,
  getPhotonPlaybackSpeedMultiplier,
  getPhotonPlaybackSpeedSliderValue,
  getPhotonSeparationLog10RatioFromParts,
  getPhotonSeparationLogTick,
  getPhotonSeparationLogTicks,
  snapPhotonSeparationLogTick,
  snapPhotonControlValueToZero,
  snapPhotonPhaseDegrees,
  snapPhotonRangeControlValue,
} from "../src/apps/photon/PhotonControlsRuntime.js";
import {
  buildPhotonArchitrinoSourceRefs,
  buildPhotonDerivedPolarizationTraceWithSolverBridge,
  buildPhotonPlotSamplesWithSolverBridge,
  computePhotonDelayedEmissionFieldWithSolverBridge,
  computePhotonFormulaSummaryWithSolverBridge,
  computePhotonObserverFieldWithSolverBridge,
  createPhotonAbsoluteMovingCircularCausalRootRequest,
  createPhotonAbsoluteSourceSegmentCausalRootRequests,
  createPhotonCircularSourceCausalRootRequest,
  createPhotonCircularSelfHitSpansRunRequest,
  createPhotonCausalRootsSolverRunRequest,
  computePhotonSelfHitDiagnosticsWithSolverBridge,
  fitPhotonPolarizationFromSamples,
  getPhotonArchitrinoKinematics,
  solvePhotonAbsoluteCausalRootsForSourceWithSolverBridge,
  solvePhotonCircularSourceCausalRootsWithSolverBridge,
  solvePhotonCircularSourceRootsHitsLedgerWithSolverBridge,
  solvePhotonCausalRootsWithSolverBridge,
} from "../src/apps/photon/PhotonFormulaRuntime.js";
import {
  computePhotonDiagnostics,
  getPhotonDiagnosticRows,
} from "../src/apps/photon/PhotonDiagnosticsRuntime.js";
import {
  createPhotonConfigurationSearchResultsWithSolverBridge,
  parsePhotonSearchResultsJson,
  serializePhotonSearchResults,
} from "../src/apps/photon/PhotonSearchRuntime.js";
import {
  advancePhotonModelTime,
  getPhotonRuntimeTimes,
  shouldHandlePhotonSpaceToggle,
} from "../src/apps/photon/PhotonRuntime.js";
import {
  createSolverAppBridgeClient,
} from "../src/solver/app/SolverAppBridge.mjs";
import {
  computePhotonStageLayout,
  getPhotonFieldPlotSampleCount,
  isPhotonPlotSampleInForwardGap,
} from "../src/apps/photon/PhotonBraidVisualRuntime.js";
import { createSolverBridgeLoopbackWorker } from "./solver-worker-loopback.mjs";

function assertNear(actual, expected, epsilon = 1e-12) {
  assert.ok(Math.abs(actual - expected) < epsilon, `${actual} should be near ${expected}`);
}

function createPhotonTestSolverInitRequest() {
  return {
    appId: "photon",
    apiVersion: "solver-app-bridge.v1",
    requestedCapabilities: ["causalRoots", "delayedHits"],
    storagePolicy: {
      target: "caller-buffer",
      durable: false,
      maxBytes: 64 * 1024 * 1024,
    },
    threadingPolicy: {
      mode: "single-thread",
      deterministic: true,
    },
  };
}

function evaluateCircularSourceRequestPosition(segment, time) {
  const phase = segment.phaseAtEpoch + segment.angularVelocity * (time - segment.epochTime);
  return {
    x: segment.center.x + segment.radiusU.x * Math.cos(phase) + segment.radiusV.x * Math.sin(phase),
    y: segment.center.y + segment.radiusU.y * Math.cos(phase) + segment.radiusV.y * Math.sin(phase),
    z: segment.center.z + segment.radiusU.z * Math.cos(phase) + segment.radiusV.z * Math.sin(phase),
  };
}

function evaluateLinearSegmentPosition(segment, time) {
  const dt = time - segment.startTime;
  return {
    x: segment.positionAtStart.x + segment.velocity.x * dt,
    y: segment.positionAtStart.y + segment.velocity.y * dt,
    z: segment.positionAtStart.z + segment.velocity.z * dt,
  };
}

function createPhotonCircularSourceBridgeStub() {
  const calls = [];
  const solveCircularSourceRootsHitsLedger = async (request) => {
    calls.push(request);
    let emissionTime = Number(request.hitTime) || 0;
    let sourcePoint = evaluateCircularSourceRequestPosition(request.source, emissionTime);
    const receiverPoint = request.receiver.positionAtStart;
    let distance = Math.hypot(
      receiverPoint.x - sourcePoint.x,
      receiverPoint.y - sourcePoint.y,
      receiverPoint.z - sourcePoint.z
    );
    for (let index = 0; index < 6; index += 1) {
      emissionTime = request.hitTime - distance / Math.max(1e-12, request.signalSpeed);
      sourcePoint = evaluateCircularSourceRequestPosition(request.source, emissionTime);
      distance = Math.hypot(
        receiverPoint.x - sourcePoint.x,
        receiverPoint.y - sourcePoint.y,
        receiverPoint.z - sourcePoint.z
      );
    }
    const delay = request.hitTime - emissionTime;
    return {
      schema: "solver-circular-source-roots-hits-ledger-f64.v1",
      roots: [
        {
          rootId: 0,
          statusCode: 0,
          emissionTime,
          hitTime: request.hitTime,
          delay,
          distance,
          residual: distance - delay * request.signalSpeed,
          jacobian: 1,
          branchWeight: 1,
          sourcePoint,
          receiverPoint,
        },
      ],
      hits: [],
      rootLedgerDetails: [
        {
          rowId: 0,
          rootId: 0,
          entryKind: 1,
          statusCode: 0,
          iterationCount: 6,
          bracketStart: request.source.startTime,
          bracketEnd: request.source.endTime,
          emissionTime,
          hitTime: request.hitTime,
          residual: distance - delay * request.signalSpeed,
          jacobian: 1,
          branchWeight: 1,
        },
      ],
      status: { code: "ok", severity: "ok", message: "circular-source causal roots solved" },
    };
  };
  return { calls, solveCircularSourceRootsHitsLedger };
}

function createPhotonLinearRootBridgeStub() {
  const calls = [];
  const runSolverBridge = async (runRequest) => {
    const request = runRequest.config.rootRequest;
    calls.push(request);
    const emissionTime = (request.source.startTime + request.source.endTime) / 2;
    const sourcePoint = evaluateLinearSegmentPosition(request.source, emissionTime);
    const receiverPoint = evaluateLinearSegmentPosition(request.receiver, request.hitTime);
    const distance = Math.hypot(
      receiverPoint.x - sourcePoint.x,
      receiverPoint.y - sourcePoint.y,
      receiverPoint.z - sourcePoint.z
    );
    const delay = request.hitTime - emissionTime;
    return {
      requestId: runRequest.requestId,
      runId: runRequest.runId,
      datasetId: runRequest.datasetId,
      status: { code: "ok", severity: "ok", message: "causal roots solved" },
      response: {
        runId: runRequest.runId,
        datasetId: runRequest.datasetId,
        roots: [
          {
            rootId: 0,
            statusCode: 0,
            emissionTime,
            hitTime: request.hitTime,
            delay,
            distance,
            residual: 0,
            jacobian: 1,
            branchWeight: 1,
            sourcePoint,
            receiverPoint,
          },
        ],
        status: { code: "ok", severity: "ok", message: "causal roots solved" },
      },
    };
  };
  return { calls, runSolverBridge };
}

function createPhotonMixedSearchBridgeStub() {
  const circularBridge = createPhotonCircularSourceBridgeStub();
  const runCalls = [];
  const runSolverBridge = async (runRequest) => {
    runCalls.push(runRequest);
    if (runRequest.runKind === "sharedGeometry") {
      return createPhotonSelfHitRunHandle(
        runRequest,
        runRequest.config.geometryRequest.circularSelfHitSpans.map((request) =>
          request.fieldSpeedRatio > 1.015 ? 1.25 : 0
        )
      );
    }
    const request = runRequest.config.rootRequest;
    assert.ok(request, "mixed search bridge requires a rootRequest for causal root runs");
    const emissionTime = (request.source.startTime + request.source.endTime) / 2;
    const sourcePoint = evaluateLinearSegmentPosition(request.source, emissionTime);
    const receiverPoint = evaluateLinearSegmentPosition(request.receiver, request.hitTime);
    const distance = Math.hypot(
      receiverPoint.x - sourcePoint.x,
      receiverPoint.y - sourcePoint.y,
      receiverPoint.z - sourcePoint.z
    );
    return {
      requestId: runRequest.requestId,
      runId: runRequest.runId,
      datasetId: runRequest.datasetId,
      status: { code: "ok", severity: "ok", message: "causal roots solved" },
      response: {
        runId: runRequest.runId,
        datasetId: runRequest.datasetId,
        roots: [
          {
            rootId: 0,
            statusCode: 0,
            emissionTime,
            hitTime: request.hitTime,
            delay: request.hitTime - emissionTime,
            distance,
            residual: 0,
            jacobian: 1,
            branchWeight: 1,
            sourcePoint,
            receiverPoint,
          },
        ],
        status: { code: "ok", severity: "ok", message: "causal roots solved" },
      },
    };
  };
  return {
    circularCalls: circularBridge.calls,
    runCalls,
    solveCircularSourceRootsHitsLedger: circularBridge.solveCircularSourceRootsHitsLedger,
    runSolverBridge,
  };
}

function createPhotonSelfHitRunHandle(runRequest, spans) {
  const requests = runRequest.config.geometryRequest.circularSelfHitSpans;
  return {
    requestId: runRequest.requestId,
    runId: runRequest.runId,
    datasetId: runRequest.datasetId,
    status: { code: "ok", severity: "ok", message: "shared geometry completed" },
    response: {
      runId: runRequest.runId,
      datasetId: runRequest.datasetId,
      geometry: {
        circularSelfHitSpans: requests.map((request, index) => {
          const span = spans[index] ?? 0;
          const rootFound = span > 0;
          return {
            itemIndex: index,
            statusCode: 0,
            fieldSpeedRatio: request.fieldSpeedRatio,
            fieldSpeedTolerance: request.fieldSpeedTolerance ?? 0.015,
            regime: request.fieldSpeedRatio > 1.015 ? "super_field" : "sub_field",
            resultKind: rootFound ? "root_solved" : "below_threshold",
            span,
            rootFound,
            bracketLow: span,
            bracketHigh: span,
            residual: 0,
            iterations: request.maxIterations ?? 28,
          };
        }),
      },
      status: { code: "ok", severity: "ok", message: "shared geometry completed" },
    },
  };
}

function buildSyntheticPolarizationSamples({ ampY = 1, ampZ = 0, phaseLag = 0, count = 144 } = {}) {
  return Array.from({ length: count }, (_, index) => {
    const progress = index / count;
    const phase = Math.PI * 2 * progress;
    return {
      progress,
      phase,
      ey: ampY * Math.cos(phase),
      ez: ampZ * Math.cos(phase + phaseLag),
    };
  });
}

test("default photon state encodes trailing and leading braid convention", () => {
  const state = createDefaultPhotonState();

  assert.equal(state.pair.left.role, "trailing");
  assert.equal(state.pair.left.direction, "ccw");
  assert.equal(state.pair.right.role, "leading");
  assert.equal(state.pair.right.direction, "cw");
  assert.deepEqual(
    ["I", "M", "O"].map((layerId) => state.pair.left.layers[layerId].phaseDeg),
    [0, 0, 0]
  );
  assert.deepEqual(
    ["I", "M", "O"].map((layerId) => state.pair.left.layers[layerId].frequencyHz),
    ["I", "M", "O"].map((layerId) => PHOTON_DEFAULT_LAYER_FREQUENCIES_HZ[layerId])
  );
  assert.deepEqual(
    ["I", "M", "O"].map((layerId) => state.pair.right.layers[layerId].frequencyHz),
    ["I", "M", "O"].map((layerId) => PHOTON_DEFAULT_LAYER_FREQUENCIES_HZ[layerId])
  );
  ["left", "right"].forEach((braidId) => {
    ["I", "M", "O"].forEach((layerId) => {
      assertNear(
        getPhotonLayerTangentialSpeedRatio(state, braidId, layerId),
        PHOTON_LAYER_SPEED_RATIO_TARGETS[layerId]
      );
    });
  });
  assert.deepEqual(state.measurement.virtualObserver, { x: 0, y: 0, z: 0 });
  assert.equal(state.measurement.sourceHistoryMode, "absolute_history");
  assert.equal(state.pair.speedMode, "direct");
  assert.equal(state.pair.localLorentzFactor, 100);
  assert.equal(state.measurement.signalSpeedCf, 1);
  assert.equal(state.measurement.emissionSpeedCf, 1);
  assert.equal(state.pair.photonSpeedCf, 1);
  assert.deepEqual(state.polarization, { analyzerAngleDeg: 0 });
  assert.equal(state.view.rawPolarizationVisible, true);
  assert.equal(state.pair.pairSeparation, getPhotonSeparationReferenceRadius(state));
  assert.equal(getPhotonSeparationLog10Ratio(state), 0);
  assert.deepEqual(
    ["left", "right"].flatMap((braidId) =>
      ["I", "M", "O"].map((layerId) => getPhotonLayerEnabled(state, braidId, layerId))
    ),
    [true, true, true, true, true, true]
  );
});

test("photon Lorentz-factor speed mode derives signal and photon speeds", () => {
  const state = createDefaultPhotonState();
  state.pair.speedMode = "lorentz_factor";
  state.pair.localLorentzFactor = 2;
  state.measurement.signalSpeedCf = 0.2;
  state.pair.photonSpeedCf = 0.4;
  const normalized = normalizePhotonState(state);
  const expectedSpeed = getPhotonLocalCFromLorentzFactor(2);
  assert.equal(normalized.pair.speedMode, "lorentz_factor");
  assert.equal(normalized.pair.localLorentzFactor, 2);
  assertNear(normalized.measurement.signalSpeedCf, expectedSpeed);
  assertNear(normalized.measurement.emissionSpeedCf, expectedSpeed);
  assertNear(normalized.pair.photonSpeedCf, expectedSpeed);
  assert.deepEqual(resolvePhotonSpeedSettings(normalized), {
    speedMode: "lorentz_factor",
    localLorentzFactor: 2,
    signalSpeedCf: expectedSpeed,
    emissionSpeedCf: expectedSpeed,
    photonSpeedCf: expectedSpeed,
  });
});

test("photon plot duration spans three middle-layer cycles", () => {
  const state = createDefaultPhotonState();
  const runDuration = getPhotonRunDuration(state);
  const bounds = getPhotonMiddleCycleBounds(state);
  const referenceFrequency = state.pair.left.layers.M.frequencyHz;

  assertNear(runDuration, 3 / referenceFrequency);
  assertNear(bounds.start, runDuration / 3);
  assertNear(bounds.end, (runDuration * 2) / 3);
});

test("left braid angles advance counter-clockwise while right braid angles advance clockwise", () => {
  const state = createDefaultPhotonState();
  const leftStart = getPhotonLayerAngleRadians(state, "left", "I", 0);
  const leftLater = getPhotonLayerAngleRadians(state, "left", "I", 1);
  const rightStart = getPhotonLayerAngleRadians(state, "right", "I", 0);
  const rightLater = getPhotonLayerAngleRadians(state, "right", "I", 1);

  assert.ok(leftLater > leftStart);
  assert.ok(rightLater < rightStart);
});

test("Photon causal roots can be routed through the solver app bridge for linear segments", async () => {
  const rootRequest = {
    source: {
      startTime: 0,
      endTime: 10,
      positionAtStart: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
    },
    receiver: {
      startTime: 0,
      endTime: 10,
      positionAtStart: { x: 10, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
    },
    hitTime: 10,
    signalSpeed: 1,
    rootTolerance: 1e-13,
    maxIterations: 128,
    scanSubdivisions: 64,
    maxRoots: 4,
    maxHits: 4,
  };
  const runRequest = createPhotonCausalRootsSolverRunRequest(rootRequest, {
    requestId: "photon_bridge_request",
    runId: "photon_bridge_run",
    datasetId: "photon_bridge_dataset",
  });

  assert.equal(runRequest.appId, "photon");
  assert.equal(runRequest.runKind, "causalRoots");
  assert.equal(runRequest.envelope.timeWindow.units, "seconds");
  assert.equal(runRequest.config.rootRequest.hitTime, 10);

  const roots = await solvePhotonCausalRootsWithSolverBridge(rootRequest, {
    runRequest,
    async runSolverBridge(request) {
      assert.equal(request.requestId, "photon_bridge_request");
      return {
        requestId: request.requestId,
        runId: request.runId,
        datasetId: request.datasetId,
        status: { code: "ok", severity: "ok", message: "causal roots solved" },
        response: {
          runId: request.runId,
          datasetId: request.datasetId,
          roots: [
            {
              rootId: 0,
              statusCode: 0,
              emissionTime: 0,
              hitTime: 10,
              delay: 10,
              distance: 10,
              residual: 0,
              jacobian: 1,
              branchWeight: 1,
              sourcePoint: { x: 0, y: 0, z: 0 },
              receiverPoint: { x: 10, y: 0, z: 0 },
            },
          ],
          status: { code: "ok", severity: "ok", message: "causal roots solved" },
        },
      };
    },
  });

  assert.equal(roots.length, 1);
  assert.equal(roots[0].delay, 10);
  assert.equal(roots[0].residual, 0);
});

test("Photon causal roots can create and dispose a solver bridge client", async () => {
  const rootRequest = {
    source: {
      startTime: 0,
      endTime: 10,
      positionAtStart: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
    },
    receiver: {
      startTime: 0,
      endTime: 10,
      positionAtStart: { x: 3, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
    },
    hitTime: 3,
    signalSpeed: 1,
    rootTolerance: 1e-13,
    maxIterations: 128,
    scanSubdivisions: 64,
    maxRoots: 4,
    maxHits: 4,
  };
  let disposed = false;

  const roots = await solvePhotonCausalRootsWithSolverBridge(rootRequest, {
    requestId: "photon_factory_request",
    runId: "photon_factory_run",
    datasetId: "photon_factory_dataset",
    disposeSolverBridgeClientAfterRun: true,
    createSolverBridgeClient(factoryRequest, context) {
      assert.equal(factoryRequest, rootRequest);
      assert.equal(context.appId, "photon");
      assert.equal(context.requiredMethod, "runSimulation");
      assert.ok(context.requestedCapabilities.includes("causalRoots"));
      return {
        async runSimulation(runRequest) {
          assert.equal(runRequest.requestId, "photon_factory_request");
          return {
            requestId: runRequest.requestId,
            runId: runRequest.runId,
            datasetId: runRequest.datasetId,
            status: { code: "ok", severity: "ok", message: "causal roots solved" },
            response: {
              runId: runRequest.runId,
              datasetId: runRequest.datasetId,
              roots: [
                {
                  rootId: 0,
                  statusCode: 0,
                  emissionTime: 0,
                  hitTime: 3,
                  delay: 3,
                  distance: 3,
                  residual: 0,
                  jacobian: 1,
                  branchWeight: 1,
                  sourcePoint: { x: 0, y: 0, z: 0 },
                  receiverPoint: { x: 3, y: 0, z: 0 },
                },
              ],
              status: { code: "ok", severity: "ok", message: "causal roots solved" },
            },
          };
        },
        async dispose() {
          disposed = true;
        },
      };
    },
  });

  assert.equal(roots.length, 1);
  assert.equal(roots[0].delay, 3);
  assert.equal(disposed, true);
});

test("Photon causal roots can create and dispose a solver bridge worker client", async () => {
  const rootRequest = {
    source: {
      startTime: 0,
      endTime: 10,
      positionAtStart: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
    },
    receiver: {
      startTime: 0,
      endTime: 10,
      positionAtStart: { x: 4, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
    },
    hitTime: 4,
    signalSpeed: 1,
    rootTolerance: 1e-13,
    maxIterations: 128,
    scanSubdivisions: 64,
    maxRoots: 4,
    maxHits: 4,
  };
  const worker = createSolverBridgeLoopbackWorker({
    init(initRequest) {
      assert.equal(initRequest.appId, "photon");
      assert.ok(initRequest.requestedCapabilities.includes("causalRoots"));
      return {
        apiVersion: initRequest.apiVersion,
        status: { code: "ok", severity: "ok", message: "solver initialized" },
      };
    },
    runSimulation(runRequest) {
      assert.equal(runRequest.requestId, "photon_worker_request");
      return {
        requestId: runRequest.requestId,
        runId: runRequest.runId,
        datasetId: runRequest.datasetId,
        status: { code: "ok", severity: "ok", message: "causal roots solved" },
        response: {
          runId: runRequest.runId,
          datasetId: runRequest.datasetId,
          roots: [
            {
              rootId: 0,
              statusCode: 0,
              emissionTime: 0,
              hitTime: 4,
              delay: 4,
              distance: 4,
              residual: 0,
              jacobian: 1,
              branchWeight: 1,
              sourcePoint: { x: 0, y: 0, z: 0 },
              receiverPoint: { x: 4, y: 0, z: 0 },
            },
          ],
          status: { code: "ok", severity: "ok", message: "causal roots solved" },
        },
      };
    },
  });

  const roots = await solvePhotonCausalRootsWithSolverBridge(rootRequest, {
    requestId: "photon_worker_request",
    runId: "photon_worker_run",
    datasetId: "photon_worker_dataset",
    createSolverWorker(factoryRequest, context) {
      assert.equal(factoryRequest, rootRequest);
      assert.equal(context.appId, "photon");
      assert.equal(context.requiredMethod, "runSimulation");
      assert.ok(context.requestedCapabilities.includes("causalRoots"));
      return worker;
    },
  });

  assert.equal(roots.length, 1);
  assert.equal(roots[0].delay, 4);
  assert.deepEqual(
    worker.messages.map((message) => message.method),
    ["init", "runSimulation", "dispose"]
  );
  assert.equal(worker.terminated, true);
});

test("Photon circular-source solver request preserves source orbit geometry", () => {
  const state = createDefaultPhotonState();
  state.measurement.signalSpeedCf = 0.72;
  state.measurement.emissionSpeedCf = 0.72;
  state.pair.photonSpeedCf = 0.72;
  const sourceRef = { braidId: "left", layerId: "O", chargeType: "electrino" };
  const observationTime = 0.75;
  const request = createPhotonCircularSourceCausalRootRequest(state, sourceRef, observationTime);
  const emissionTime = (request.source.startTime + request.source.endTime) / 2;
  const requestPosition = evaluateCircularSourceRequestPosition(request.source, emissionTime);
  const kinematics = getPhotonArchitrinoKinematics(
    state,
    sourceRef.braidId,
    sourceRef.layerId,
    sourceRef.chargeType,
    emissionTime
  );

  assert.ok(request.source.startTime <= emissionTime, "expected request source history before sample");
  assert.equal(request.source.endTime, observationTime);
  assert.equal(request.receiver.endTime, observationTime);
  assert.equal(request.hitTime, observationTime);
  assert.equal(request.signalSpeed, 0.72);
  assert.equal(request.receiver.velocity.x, 0);
  assertNear(requestPosition.x, kinematics.position.x);
  assertNear(requestPosition.y, kinematics.position.y);
  assertNear(requestPosition.z, kinematics.position.z);
  assertNear(request.source.angularVelocity, kinematics.angularVelocity);
});

test("Photon absolute-history segment requests move source and Virtual Observer at photon speed", () => {
  const state = createDefaultPhotonState();
  state.measurement.sourceHistoryMode = "absolute_history";
  state.measurement.signalSpeedCf = 0.85;
  state.measurement.emissionSpeedCf = 0.85;
  state.pair.photonSpeedCf = 0.6;
  state.measurement.virtualObserver.x = 0.25;
  const sourceRef = { braidId: "left", layerId: "O", chargeType: "positrino" };
  const observationTime = 1.5;
  const requests = createPhotonAbsoluteSourceSegmentCausalRootRequests(
    state,
    sourceRef,
    observationTime,
    {
      maxDelay: 0.5,
      absoluteHistorySegments: 2,
    }
  );
  const first = requests[0];
  const kinematics = getPhotonArchitrinoKinematics(
    state,
    sourceRef.braidId,
    sourceRef.layerId,
    sourceRef.chargeType,
    first.source.startTime
  );

  assert.equal(requests.length, 2);
  assert.equal(first.signalSpeed, 0.85);
  assert.equal(first.receiver.velocity.x, 0.6);
  assert.equal(first.source.velocity.x, 0.6);
  assert.equal(first.sourceHistory.kind, "moving-circular-source-linearized");
  assert.equal(first.sourceHistory.approximationPolicy, "linearized-moving-circular-source-segments");
  assert.equal(first.sourceHistory.source.centerVelocity.x, 0.6);
  assert.deepEqual(first.sourceHistory.sourceRef, sourceRef);
  assertNear(first.source.positionAtStart.x, kinematics.position.x + 0.6 * first.source.startTime);
  assertNear(
    first.receiver.positionAtStart.x,
    state.measurement.virtualObserver.x + 0.6 * first.receiver.startTime
  );
});

test("Solver bridge exposes moving-circular absolute-history root methods without WASM", async () => {
  const state = createDefaultPhotonState();
  state.measurement.sourceHistoryMode = "absolute_history";
  state.measurement.signalSpeedCf = 0.9;
  state.measurement.emissionSpeedCf = 0.9;
  state.pair.photonSpeedCf = 0.5;
  const sourceRef = { braidId: "right", layerId: "O", chargeType: "positrino" };
  const request = createPhotonAbsoluteMovingCircularCausalRootRequest(
    state,
    sourceRef,
    0.5,
    { maxDelay: 0.4, scanSubdivisions: 24 }
  );
  const client = createSolverAppBridgeClient();
  await client.init(createPhotonTestSolverInitRequest());

  const response = await client.solveMovingCircularSourceCausalRootsF64(request);
  const sameSourceResponse = await client.solveMovingCircularSameSourceCausalRootsF64({
    source: request.source,
    hitTime: request.hitTime,
    signalSpeed: request.signalSpeed,
    sourceStartTime: request.sourceStartTime,
    sourceEndTime: request.sourceEndTime,
    scanSubdivisions: 24,
    maxRoots: 8,
    sourceRef,
  });
  const observerFieldResponse = await client.computeMovingCircularObserverFieldF64({
    signalSpeed: 1,
    jacobianFloor: 1e-4,
    branches: [
      {
        chargeSign: 1,
        direction: { x: 0, y: 1, z: 0 },
        sourceVelocity: { x: 0, y: 0, z: 0 },
        distance: 2,
        residual: 0,
        delay: 0.25,
        branchWeight: 1,
        sourceNormalSpeed: 0,
        receiverNormalSpeed: 0,
        sourceNormalDenominator: 1,
        receiverNormalNumerator: 1,
        receiverNormalCrossingFactor: 1,
        receiverNormalFactor: 1,
        unsignedReceiverNormalFactor: 1,
        receiverNormalStatusCode: 0,
      },
    ],
  });

  assert.equal(response.schema, "solver-moving-circular-source-causal-roots-f64.v1");
  assert.equal(response.sourceHistoryKind, "moving-circular-source");
  assert.ok(Array.isArray(response.roots));
  assert.ok(response.status.code);
  assert.equal(
    sameSourceResponse.schema,
    "solver-moving-circular-same-source-causal-roots-f64.v1"
  );
  assert.equal(sameSourceResponse.sourceHistoryKind, "moving-circular-same-source");
  assert.ok(Array.isArray(sameSourceResponse.roots));
  assert.ok(sameSourceResponse.status.code);
  assert.equal(
    observerFieldResponse.schema,
    "solver-moving-circular-observer-field-f64.v1"
  );
  assertNear(observerFieldResponse.electric.y, 0.25);
  assertNear(observerFieldResponse.comparisonB.z, 0.25);
  assert.equal(observerFieldResponse.contributions[0].receiverNormalEvidenceStatus, "ok");
  assert.equal(observerFieldResponse.contributions[0].branchWeight, 1);
  await client.dispose();
});

test("Photon absolute-history source roots route through the moving-circular solver bridge", async () => {
  const state = createDefaultPhotonState();
  state.measurement.sourceHistoryMode = "absolute_history";
  state.measurement.signalSpeedCf = 0.9;
  state.measurement.emissionSpeedCf = 0.9;
  state.pair.photonSpeedCf = 0.5;
  const sourceRef = { braidId: "right", layerId: "O", chargeType: "electrino" };
  const client = createSolverAppBridgeClient();
  await client.init(createPhotonTestSolverInitRequest());
  let movingCalls = 0;
  const originalSolve = client.solveMovingCircularSourceCausalRootsF64.bind(client);
  client.solveMovingCircularSourceCausalRootsF64 = async (request) => {
    movingCalls += 1;
    return originalSolve(request);
  };

  const roots = await solvePhotonAbsoluteCausalRootsForSourceWithSolverBridge(
    state,
    sourceRef,
    0.5,
    {
      solverClient: client,
      maxDelay: 0.4,
      scanSubdivisions: 24,
    }
  );

  assert.equal(movingCalls, 1);
  assert.ok(Array.isArray(roots));
  await client.dispose();
});

test("Solver bridge observer field fails closed without complete receiver-normal branch rows", async () => {
  const client = createSolverAppBridgeClient();
  await client.init(createPhotonTestSolverInitRequest());

  const response = await client.computeMovingCircularObserverFieldF64({
    signalSpeed: 1,
    jacobianFloor: 1e-4,
    branches: [
      {
        chargeSign: 1,
        direction: { x: 0, y: 1, z: 0 },
        sourceVelocity: { x: 0, y: 0, z: 0 },
        distance: 2,
        residual: 0,
        delay: 0.25,
        sourceNormalDenominator: 0.5,
      },
    ],
  });

  assert.equal(response.status.code, "receiver_normal_branch_rows_missing");
  assert.equal(response.unstableContributionCount, 1);
  assert.equal(response.contributions[0].receiverNormalEvidenceStatus, "receiver_normal_branch_rows_missing");
  assert.equal(response.contributions[0].branchWeight, 0);
  assert.equal(response.electric.y, 0);
  assert.equal(response.comparisonB.z, 0);
  await client.dispose();
});

test("Photon absolute-history observer field routes through the moving-circular solver bridge", async () => {
  const state = createDefaultPhotonState();
  state.measurement.sourceHistoryMode = "absolute_history";
  state.measurement.signalSpeedCf = 0.9;
  state.measurement.emissionSpeedCf = 0.9;
  state.pair.photonSpeedCf = 0.5;
  const client = createSolverAppBridgeClient();
  await client.init(createPhotonTestSolverInitRequest());
  let observerFieldCalls = 0;
  const originalObserverField = client.computeMovingCircularObserverFieldF64.bind(client);
  client.computeMovingCircularObserverFieldF64 = async (request) => {
    observerFieldCalls += 1;
    return originalObserverField(request);
  };

  const field = await computePhotonDelayedEmissionFieldWithSolverBridge(state, 0.5, {
    solverClient: client,
    maxDelay: 0.4,
    scanSubdivisions: 24,
  });

  assert.equal(observerFieldCalls, 1);
  assert.equal(field.sourceMode, "solver_bridge_absolute_history_receiver_normal_root_branch_sum");
  assert.equal(field.solverFieldSchema, "solver-moving-circular-observer-field-f64.v1");
  assert.ok(Number.isFinite(field.electric.y));
  await client.dispose();
});

test("Photon helical same-source roots route through the moving-circular solver bridge", async () => {
  const state = createDefaultPhotonState();
  const client = createSolverAppBridgeClient();
  await client.init(createPhotonTestSolverInitRequest());
  let sameSourceCalls = 0;
  const originalSolve = client.solveMovingCircularSameSourceCausalRootsF64.bind(client);
  client.solveMovingCircularSameSourceCausalRootsF64 = async (request) => {
    sameSourceCalls += 1;
    return originalSolve(request);
  };

  const diagnostics = await computePhotonSelfHitDiagnosticsWithSolverBridge(state, {
    solverClient: client,
    skipSpanSelfHitDiagnostics: true,
  });

  assert.equal(sameSourceCalls, 12);
  assert.equal(diagnostics.helicalRowCount, 12);
  assert.equal(diagnostics.status, "span-skipped");
  await client.dispose();
});

test("Photon self-hit span requests use absolute photon plus orbital speed ratios", () => {
  const state = createDefaultPhotonState();
  state.pair.photonSpeedCf = 0;
  state.measurement.signalSpeedCf = 1;
  state.measurement.emissionSpeedCf = 1;
  const runRequest = createPhotonCircularSelfHitSpansRunRequest(state, {
    requestId: "photon_self_hit_request",
    runId: "photon_self_hit_run",
    datasetId: "photon_self_hit_dataset",
  });
  const rows = runRequest.config.geometryRequest.circularSelfHitSpans;

  assert.equal(runRequest.appId, "photon");
  assert.equal(runRequest.runKind, "sharedGeometry");
  assert.equal(rows.length, 6);
  assertNear(rows[0].fieldSpeedRatio, 1.2);
  assertNear(rows[1].fieldSpeedRatio, 1);
  assertNear(rows[2].fieldSpeedRatio, 0.8);
  assert.equal(runRequest.envelope.interactionPolicy, "same-source-enabled");
});

test("Photon self-hit diagnostics route same-source rows through the solver bridge", async () => {
  const state = createDefaultPhotonState();
  state.pair.photonSpeedCf = 0;
  const spans = [2.05, 0, 0, 2.05, 0, 0];
  const diagnostics = await computePhotonSelfHitDiagnosticsWithSolverBridge(state, {
    requestId: "photon_self_hit_request",
    runId: "photon_self_hit_run",
    datasetId: "photon_self_hit_dataset",
    async runSolverBridge(runRequest) {
      assert.equal(runRequest.config.geometryRequest.circularSelfHitSpans.length, 6);
      return createPhotonSelfHitRunHandle(runRequest, spans);
    },
  });

  assert.equal(diagnostics.status, "ok");
  assert.equal(diagnostics.rowCount, 6);
  assert.equal(diagnostics.candidateCount, 2);
  assert.equal(diagnostics.rootFoundCount, 2);
  assert.equal(diagnostics.rows[0].role, "trailing");
  assert.equal(diagnostics.rows[0].layerId, "I");
  assert.equal(diagnostics.rows[0].resultKind, "root_solved");
  assertNear(diagnostics.rows[0].span, spans[0]);
});

test("Photon self-hit diagnostics can fall back when only circular-source roots are injected", async () => {
  const state = createDefaultPhotonState();
  const diagnostics = await computePhotonSelfHitDiagnosticsWithSolverBridge(state, {
    solveCircularSourceRootsHitsLedger: async () => ({ roots: [] }),
  });

  assert.equal(diagnostics.status, "unavailable");
  assert.equal(diagnostics.rowCount, 6);
  assert.equal(diagnostics.rootFoundCount, 0);
  assert.ok(diagnostics.candidateCount >= 2);
  assert.equal(diagnostics.helicalRowCount, 12);
  assert.equal(diagnostics.helicalRootFoundCount, 12);
  assert.ok(diagnostics.helicalPhaseFamilyCount > 0);
  assert.ok(diagnostics.helicalStablePhaseFamilyCount > 0);
  assert.ok(diagnostics.helicalBestPhaseFamily.label.includes(" "));
  assert.ok(diagnostics.helicalRows.every((row) =>
    row.sourceHistoryKind === "moving-circular-same-source" &&
    row.phaseAtHit?.rootKind === "same-source" &&
    Number.isFinite(row.phaseAtHit.receiverPhaseDegrees)
  ));
});

test("Photon circular-source roots, hits, and ledger rows can be routed through the solver app bridge", async () => {
  const state = createDefaultPhotonState();
  const sourceRef = { braidId: "left", layerId: "O", chargeType: "positrino" };
  const observationTime = 0.75;
  const response = await solvePhotonCircularSourceRootsHitsLedgerWithSolverBridge(
    state,
    sourceRef,
    observationTime,
    {
      solverClient: {
        async solveCircularSourceRootsHitsLedgerF64(request) {
          assert.equal(request.hitTime, observationTime);
          assert.equal(request.receiver.positionAtStart.x, state.measurement.virtualObserver.x);
          assert.equal(request.source.center.x < 0, true);
          assert.ok(request.scanSubdivisions >= 48);
          return {
            schema: "solver-circular-source-roots-hits-ledger-f64.v1",
            roots: [
              {
                rootId: 0,
                statusCode: 0,
                emissionTime: 0.5,
                hitTime: observationTime,
                delay: 0.25,
                distance: 0.25,
                residual: 0,
                jacobian: 1,
                branchWeight: 1,
                sourcePoint: { x: -1, y: 0, z: 0 },
                receiverPoint: state.measurement.virtualObserver,
              },
            ],
            hits: [
              {
                hitId: 0,
                rootId: 0,
                sourcePathKey: 0,
                receiverPathKey: 0,
                emissionTime: 0.5,
                hitTime: observationTime,
                delay: 0.25,
                distance: 0.25,
                sourcePoint: { x: -1, y: 0, z: 0 },
                receiverPoint: state.measurement.virtualObserver,
                signalSpeed: 1,
                branchWeight: 1,
                jacobian: 1,
              },
            ],
            rootLedgerDetails: [
              {
                rowId: 0,
                rootId: 0,
                entryKind: 1,
                statusCode: 0,
                iterationCount: 8,
                bracketStart: 0.4,
                bracketEnd: 0.6,
                emissionTime: 0.5,
                hitTime: observationTime,
                residual: 0,
                jacobian: 1,
                branchWeight: 1,
              },
            ],
            status: { code: "ok", severity: "ok", message: "circular-source causal roots solved" },
          };
        },
      },
    }
  );

  assert.equal(response.solverEngineId, "architrino-solver-app-bridge");
  assert.equal(response.schema, "solver-circular-source-roots-hits-ledger-f64.v1");
  assert.equal(response.hits.length, 1);
  assert.equal(response.rootLedgerDetails.length, 1);
  assert.equal(response.rootLedgerDetails[0].entryKind, 1);
  const roots = await solvePhotonCircularSourceCausalRootsWithSolverBridge(
    state,
    sourceRef,
    observationTime,
    {
      async solveCircularSourceRootsHitsLedger(request) {
        assert.equal(request.hitTime, observationTime);
        return response;
      },
    }
  );
  assert.equal(roots.length, 1);
  assert.equal(roots[0].hitTime, observationTime);
  assert.equal(roots[0].residual, 0);
});

test("Photon delayed emission field can use absolute-history moving circular solver roots", async () => {
  const state = createDefaultPhotonState();
  state.pair.photonSpeedCf = 0.5;
  state.measurement.signalSpeedCf = 0.9;
  state.measurement.emissionSpeedCf = 0.9;
  const field = await computePhotonDelayedEmissionFieldWithSolverBridge(state, 0.75, {
    maxDelay: 0.25,
  });

  assert.equal(field.solverEngineId, "architrino-solver-app-bridge");
  assert.equal(field.sourceMode, "solver_bridge_absolute_history_receiver_normal_root_branch_sum");
  assert.equal(field.measurement.sourceHistoryMode, "absolute_history");
  assert.equal(field.sourceCount, buildPhotonArchitrinoSourceRefs(state).length);
  assert.ok(field.rootCount > 0);
  assert.equal(field.unresolvedSourceCount, field.noCatchUpSourceCount);
  assert.equal(field.staleHistorySourceCount, 0);
  assert.equal(field.nearMissSourceCount, 0);
  assert.equal(field.rootDiagnostics.rejectedReasonCounts.no_catch_up_root, field.noCatchUpSourceCount);
  assert.ok(field.contributions.every((contribution) =>
    contribution.kinematics.sourceHistoryMode === "absolute_history_moving_circular"
  ));
  assert.ok(field.contributions.every((contribution) =>
    contribution.sourceHistoryKind === "moving-circular-source"
  ));
  assert.ok(field.contributions.every((contribution) =>
    Number.isFinite(contribution.phaseAtHit?.sourcePhaseCycleIndex)
  ));
  assert.ok(Number.isFinite(field.electric.y));
});

test("Photon circular-source bridge can create and dispose a solver bridge client", async () => {
  const state = createDefaultPhotonState();
  const sourceRef = { braidId: "left", layerId: "O", chargeType: "positrino" };
  const observationTime = 0.75;
  let disposed = false;

  const response = await solvePhotonCircularSourceRootsHitsLedgerWithSolverBridge(
    state,
    sourceRef,
    observationTime,
    {
      disposeSolverBridgeClientAfterRun: true,
      createSolverBridgeClient(factoryRequest, context) {
        assert.equal(factoryRequest.hitTime, observationTime);
        assert.equal(context.appId, "photon");
        assert.equal(context.requiredMethod, "solveCircularSourceRootsHitsLedgerF64");
        assert.ok(context.requestedCapabilities.includes("causalRoots"));
        return {
          async solveCircularSourceRootsHitsLedgerF64(request) {
            assert.equal(request.hitTime, observationTime);
            return {
              schema: "solver-circular-source-roots-hits-ledger-f64.v1",
              roots: [
                {
                  rootId: 0,
                  statusCode: 0,
                  emissionTime: 0.5,
                  hitTime: observationTime,
                  delay: 0.25,
                  distance: 0.25,
                  residual: 0,
                  jacobian: 1,
                  branchWeight: 1,
                  sourcePoint: { x: -1, y: 0, z: 0 },
                  receiverPoint: state.measurement.virtualObserver,
                },
              ],
              hits: [],
              rootLedgerDetails: [],
              status: { code: "ok", severity: "ok", message: "circular-source causal roots solved" },
            };
          },
          async dispose() {
            disposed = true;
          },
        };
      },
    }
  );

  assert.equal(response.roots.length, 1);
  assert.equal(response.roots[0].hitTime, observationTime);
  assert.equal(disposed, true);
});

test("Photon delayed emission field can be assembled from central solver circular-source roots", async () => {
  const state = createDefaultPhotonState();
  state.measurement.sourceHistoryMode = "co_moving";
  const bridge = createPhotonCircularSourceBridgeStub();
  const field = await computePhotonDelayedEmissionFieldWithSolverBridge(state, 0.75, {
    solveCircularSourceRootsHitsLedger: bridge.solveCircularSourceRootsHitsLedger,
  });

  assert.equal(field.solverEngineId, "architrino-solver-app-bridge");
  assert.equal(field.sourceMode, "solver_bridge_circular_source_branch_sum");
  assert.equal(field.sourceCount, buildPhotonArchitrinoSourceRefs(state).length);
  assert.equal(field.rootCount, field.sourceCount);
  assert.equal(bridge.calls.length, field.sourceCount);
  assert.ok(field.contributions.every((contribution) =>
    contribution.solverEngineId === "architrino-solver-app-bridge"
  ));
  assert.ok(field.contributions.every((contribution) =>
    contribution.sourceHistoryKind === "co_moving_circular_source"
  ));
  assert.ok(field.contributions.every((contribution) =>
    contribution.phaseAtHit?.receiverKind === "virtual-observer" &&
    Number.isFinite(contribution.phaseAtHit.sourcePhaseDegrees)
  ));
  assert.ok(Number.isFinite(field.electric.y));
  assert.ok(Number.isFinite(field.comparisonB.z));
});

test("Photon formula and plot APIs expose central solver bridge results", async () => {
  const state = createDefaultPhotonState();
  const summaryBridge = createPhotonCircularSourceBridgeStub();
  const summary = await computePhotonFormulaSummaryWithSolverBridge(state, 0.5, {
    solveCircularSourceRootsHitsLedger: summaryBridge.solveCircularSourceRootsHitsLedger,
    polarizationSampleCount: 24,
    analyzerSampleCount: 8,
  });

  assert.equal(summary.solverEngineId, "architrino-solver-app-bridge");
  assert.equal(summary.field.solverEngineId, "architrino-solver-app-bridge");
  assert.equal(summary.field.sourceMode, "solver_bridge_absolute_history_receiver_normal_root_branch_sum");
  assert.equal(summary.polarization.solverEngineId, "architrino-solver-app-bridge");
  assert.ok(Number.isFinite(summary.polarization.amplitudes.y));
  assert.ok(Number.isFinite(summary.averageAnalyzerFraction));
  assert.ok(summary.field.contributions.every((contribution) =>
    contribution.kinematics.sourceHistoryMode === "absolute_history_moving_circular"
  ));

  const observerBridge = createPhotonCircularSourceBridgeStub();
  const observerField = await computePhotonObserverFieldWithSolverBridge(state, 0.5, {
    solveCircularSourceRootsHitsLedger: observerBridge.solveCircularSourceRootsHitsLedger,
  });
  assert.equal(observerField.solverEngineId, "architrino-solver-app-bridge");
  assert.equal(observerField.sourceMode, "solver_bridge_absolute_history_receiver_normal_root_branch_sum");
  assert.ok(Number.isFinite(observerField.electric.magnitude));

  const plotBridge = createPhotonCircularSourceBridgeStub();
  const plot = await buildPhotonPlotSamplesWithSolverBridge(state, 0.5, 4, {
    solveCircularSourceRootsHitsLedger: plotBridge.solveCircularSourceRootsHitsLedger,
  });
  assert.equal(plot.solverEngineId, "architrino-solver-app-bridge");
  assert.equal(plot.sourceMode, "solver_bridge_absolute_history_receiver_normal_root_branch_sum");
  assert.equal(plot.samples.length, 5);
  assert.ok(Number.isFinite(plot.amplitudeScale));
});

test("plot helpers expose sample counts and the small forward now gap", () => {
  assert.equal(getPhotonFieldPlotSampleCount(200), 360);
  assert.equal(getPhotonFieldPlotSampleCount(933), 700);
  assert.equal(getPhotonFieldPlotSampleCount(2000), 900);
  assert.equal(isPhotonPlotSampleInForwardGap(0.1, 0, 0.15), true);
  assert.equal(isPhotonPlotSampleInForwardGap(0.2, 0, 0.15), false);
  assert.equal(isPhotonPlotSampleInForwardGap(0.04, 0.94, 0.15), true);
  assert.equal(isPhotonPlotSampleInForwardGap(0.4, 0.94, 0.15), false);
});

test("photon stage keeps face-on braid spacing fixed while side view separation changes", () => {
  const state = createDefaultPhotonState();
  state.pair.pairSeparation = getPhotonPairSeparationFromLog10Ratio(state, -6);
  const base = computePhotonStageLayout(state, 933, 466);
  state.pair.pairSeparation = getPhotonPairSeparationFromLog10Ratio(
    state,
    PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio.min
  );
  const nearCoLocated = computePhotonStageLayout(state, 933, 466);
  state.pair.pairSeparation = getPhotonPairSeparationFromLog10Ratio(
    state,
    PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio.max
  );
  const separated = computePhotonStageLayout(state, 933, 466);

  assert.equal(base.faceLeftX, separated.faceLeftX);
  assert.equal(base.faceRightX, separated.faceRightX);
  assert.equal(PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio.min, -10);
  assert.equal(PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio.max, 5);
  assert.ok(
    nearCoLocated.sideRightX - nearCoLocated.sideLeftX < base.sideRightX - base.sideLeftX
  );
  assert.ok(nearCoLocated.sideRightX - nearCoLocated.sideLeftX > 0);
  assert.equal(base.translationOriginX, (base.sideLeftX + base.sideRightX) / 2);
  assert.ok(base.translationAxisStartX >= base.faceRightX + base.sideHalfHeight);
  assert.ok(base.translationAxisStartX < base.sideLeftX);
  assert.equal(
    nearCoLocated.translationOriginX,
    (nearCoLocated.sideLeftX + nearCoLocated.sideRightX) / 2
  );
  assert.ok(nearCoLocated.translationAxisStartX >= nearCoLocated.faceRightX + nearCoLocated.sideHalfHeight);
  assert.ok(nearCoLocated.translationAxisStartX < nearCoLocated.sideLeftX);
  assert.equal(separated.translationOriginX, (separated.sideLeftX + separated.sideRightX) / 2);
  assert.ok(separated.translationAxisStartX >= separated.faceRightX + separated.sideHalfHeight);
  assert.ok(separated.translationAxisStartX < separated.sideLeftX);
  assert.ok(
    separated.sideRightX - separated.sideLeftX > base.sideRightX - base.sideLeftX
  );
});

test("photon face-on radius edits move the edited orbit without rescaling the braid", () => {
  const state = createDefaultPhotonState();
  const base = computePhotonStageLayout(state, 933, 466);
  const leadingInnerRadius = state.pair.right.layers.I.radius;
  const leadingInnerPixelRadius = leadingInnerRadius * base.faceRightScale;
  const leftOuterPixelRadius = state.pair.left.layers.O.radius * base.faceLeftScale;
  const targetOuterRadius =
    (state.pair.left.layers.M.radius + state.pair.left.layers.O.radius) / 2;

  setPhotonLayerValue(state, "left", "O", "radius", targetOuterRadius);
  const changed = computePhotonStageLayout(state, 933, 466);

  assert.equal(changed.faceLeftScale, base.faceLeftScale);
  assert.equal(changed.faceRightScale, base.faceRightScale);
  assertNear(leadingInnerRadius * changed.faceRightScale, leadingInnerPixelRadius);
  assert.equal(state.pair.left.layers.O.radius, targetOuterRadius);
  assert.ok(state.pair.left.layers.O.radius * changed.faceLeftScale < leftOuterPixelRadius);
  assert.ok(changed.faceLabelY > changed.centerY);
});

test("photon side-view height follows the largest enabled binary", () => {
  const state = createDefaultPhotonState();
  const base = computePhotonStageLayout(state, 933, 466);
  state.pair.left.layers.O.enabled = false;
  state.pair.right.layers.O.enabled = false;
  const withoutOuter = computePhotonStageLayout(state, 933, 466);

  assert.ok(base.sideHalfHeight > withoutOuter.sideHalfHeight);
  assert.ok(withoutOuter.sideHalfHeight > 0);
});

test("Virtual Observer slider zero helpers mark and snap near zero", () => {
  assert.equal(getPhotonControlZeroPositionPercent(PHOTON_CONTROL_RANGES.virtualObserverX), 50);
  assert.equal(getPhotonControlZeroPositionPercent(PHOTON_CONTROL_RANGES.virtualObserverY), 50);
  assert.equal(getPhotonControlZeroSnapThreshold(PHOTON_CONTROL_RANGES.virtualObserverX), 0.25);
  assert.equal(getPhotonControlZeroSnapThreshold(PHOTON_CONTROL_RANGES.virtualObserverY), 0.1);

  assert.equal(snapPhotonControlValueToZero(0.05, PHOTON_CONTROL_RANGES.virtualObserverX), 0);
  assert.equal(snapPhotonControlValueToZero(0.25, PHOTON_CONTROL_RANGES.virtualObserverX), 0);
  assert.equal(snapPhotonControlValueToZero(-0.25, PHOTON_CONTROL_RANGES.virtualObserverX), 0);
  assert.equal(snapPhotonControlValueToZero(0.3, PHOTON_CONTROL_RANGES.virtualObserverX), 0.3);
  assert.equal(snapPhotonControlValueToZero(-0.1, PHOTON_CONTROL_RANGES.virtualObserverY), 0);
  assert.equal(snapPhotonControlValueToZero(0.15, PHOTON_CONTROL_RANGES.virtualObserverZ), 0.15);
});

test("phase controls snap near 45 degree sticky spots", () => {
  assert.equal(snapPhotonPhaseDegrees(40), 45);
  assert.equal(snapPhotonPhaseDegrees(43), 45);
  assert.equal(snapPhotonPhaseDegrees(47), 45);
  assert.equal(snapPhotonPhaseDegrees(50), 45);
  assert.equal(snapPhotonPhaseDegrees(85), 90);
  assert.equal(snapPhotonPhaseDegrees(88), 90);
  assert.equal(snapPhotonPhaseDegrees(137), 135);
  assert.equal(snapPhotonPhaseDegrees(182), 180);
  assert.equal(snapPhotonPhaseDegrees(39), 39);
  assert.equal(snapPhotonPhaseDegrees(51), 51);
  assert.equal(snapPhotonPhaseDegrees(96), 96);
  assert.equal(
    snapPhotonRangeControlValue(43, PHOTON_CONTROL_RANGES.phaseDeg, {
      snapToPhaseDegrees: true,
    }),
    45
  );
});

test("playback speed slider centers the default multiplier", () => {
  assertNear(
    getPhotonPlaybackSpeedSliderValue(PHOTON_DEFAULT_PLAYBACK_SPEED_MULTIPLIER),
    50,
    1e-12
  );
  assertNear(getPhotonPlaybackSpeedMultiplier(50), PHOTON_DEFAULT_PLAYBACK_SPEED_MULTIPLIER, 1e-12);
  assertNear(getPhotonPlaybackSpeedMultiplier(0), PHOTON_CONTROL_RANGES.speedMultiplier.min, 1e-12);
  assertNear(getPhotonPlaybackSpeedMultiplier(100), PHOTON_CONTROL_RANGES.speedMultiplier.max, 1e-12);

  const state = createDefaultPhotonState();
  assertNear(state.time.speedMultiplier, PHOTON_DEFAULT_PLAYBACK_SPEED_MULTIPLIER);
  assertNear(state.pair.left.layers.I.frequencyHz * state.time.speedMultiplier, 0.8);
  assertNear(state.pair.left.layers.M.frequencyHz * state.time.speedMultiplier, 0.4);
  assertNear(state.pair.left.layers.O.frequencyHz * state.time.speedMultiplier, 0.2);
});

test("separation log ticks cover mantissas 1 through 9 for each decade", () => {
  const ticks = getPhotonSeparationLogTicks();

  assert.equal(ticks.length, 136);
  assert.deepEqual(
    ticks.slice(0, 9).map((tick) => tick.mantissa),
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
  );
  assert.equal(ticks[0].exponent, -10);
  assert.equal(ticks.at(-1).value, 5);
  assert.equal(ticks.at(-1).label, "10⁵");
  assertNear(snapPhotonSeparationLogTick(Math.log10(7.2e-9)), Math.log10(7e-9), 1e-12);
});

test("separation scientific-notation picker maps coefficient and decade to log ticks", () => {
  const logValue = getPhotonSeparationLog10RatioFromParts(7, -9);
  const tick = getPhotonSeparationLogTick(logValue);

  assert.equal(tick.mantissa, 7);
  assert.equal(tick.exponent, -9);
  assertNear(logValue, Math.log10(7e-9), 1e-12);
  assert.equal(getPhotonSeparationLog10RatioFromParts(9, 5), 5);
  assert.equal(getPhotonSeparationLogTick(5).mantissa, 1);
});

test("frequency controls use powers of two", () => {
  assert.equal(getPhotonFrequencyFromExponent(0), 1);
  assert.equal(getPhotonFrequencyFromExponent(1), 2);
  assert.equal(getPhotonFrequencyFromExponent(2), 4);
  assert.equal(getPhotonFrequencyFromExponent(3), 8);
  assert.equal(getPhotonFrequencyExponent(7), 3);

  const state = createDefaultPhotonState();
  setPhotonLayerValue(state, "right", "M", "frequencyHz", 3);
  assert.equal(state.pair.right.layers.M.frequencyHz, 4);
});

test("layer metadata exposes user-facing orbit names", () => {
  assert.deepEqual(
    ["I", "M", "O"].map((layerId) => PHOTON_LAYER_META[layerId].label),
    ["Inner", "Middle", "Outer"]
  );
});

test("layer radius edits are scoped to the addressed braid", () => {
  const state = createDefaultPhotonState();
  const leadingInnerRadius = state.pair.right.layers.I.radius;
  const allowedInnerRadius =
    (state.pair.left.layers.I.radius + state.pair.left.layers.M.radius) / 2;

  setPhotonLayerValue(state, "left", "I", "radius", allowedInnerRadius);

  assert.equal(state.pair.left.layers.I.radius, allowedInnerRadius);
  assert.equal(state.pair.right.layers.I.radius, leadingInnerRadius);
});

test("layer radius edits cannot pass neighboring orbits", () => {
  const state = createDefaultPhotonState();
  const left = state.pair.left.layers;
  const defaultI = left.I.radius;
  const defaultM = left.M.radius;
  const defaultO = left.O.radius;

  assert.equal(defaultO, PHOTON_MAX_OUTER_RADIUS);
  assert.deepEqual(getPhotonLayerRadiusBounds(state, "left", "I"), {
    min: PHOTON_CONTROL_RANGES.radius.min,
    max: defaultM,
  });
  assert.deepEqual(getPhotonLayerRadiusBounds(state, "left", "M"), {
    min: defaultI,
    max: defaultO,
  });
  assert.deepEqual(getPhotonLayerRadiusBounds(state, "left", "O"), {
    min: defaultM,
    max: PHOTON_MAX_OUTER_RADIUS,
  });

  setPhotonLayerValue(state, "left", "I", "radius", defaultM + 1);
  assert.equal(left.I.radius, defaultM);
  assert.equal(left.M.radius, defaultM);
  assert.equal(left.O.radius, defaultO);

  setPhotonLayerValue(state, "left", "O", "radius", defaultO + 1);
  assert.equal(left.O.radius, PHOTON_MAX_OUTER_RADIUS);

  setPhotonLayerValue(state, "left", "O", "radius", defaultM - 1);
  assert.equal(left.O.radius, defaultM);
  assert.equal(left.M.radius, defaultM);

  const right = state.pair.right.layers;
  const rightI = right.I.radius;
  const rightO = right.O.radius;
  setPhotonLayerValue(state, "right", "M", "radius", rightO + 1);
  assert.equal(right.M.radius, rightO);
  setPhotonLayerValue(state, "right", "M", "radius", rightI - 1);
  assert.equal(right.M.radius, rightI);
});

test("state normalization clamps illegal outer and neighboring radii", () => {
  const state = createDefaultPhotonState();
  state.pair.left.layers.O.radius = PHOTON_DEFAULT_LAYER_RADII.O * 3;
  state.pair.left.layers.M.radius = PHOTON_DEFAULT_LAYER_RADII.O * 2;
  state.pair.left.layers.I.radius = PHOTON_DEFAULT_LAYER_RADII.O * 2;
  const normalized = normalizePhotonState(state);
  const layers = normalized.pair.left.layers;

  assert.equal(layers.O.radius, PHOTON_MAX_OUTER_RADIUS);
  assert.equal(layers.M.radius, PHOTON_MAX_OUTER_RADIUS);
  assert.equal(layers.I.radius, PHOTON_MAX_OUTER_RADIUS);
});

test("layer radius edits preserve absolute pair separation", () => {
  const state = createDefaultPhotonState();
  const originalSeparation = state.pair.pairSeparation;
  const allowedInnerRadius =
    (state.pair.left.layers.I.radius + state.pair.left.layers.M.radius) / 2;

  setPhotonLayerValue(state, "left", "I", "radius", allowedInnerRadius);

  assert.equal(state.pair.pairSeparation, originalSeparation);
});

test("named photon presets expose the required candidate configurations", () => {
  assert.deepEqual(
    PHOTON_NAMED_PRESETS.map((preset) => preset.id),
    [
      "balanced_contra_rotating_pair",
      "linear_polarization_candidate",
      "right_circular_candidate",
      "left_circular_candidate",
      "phase_offset_stress_test",
      "layer_radius_stress_test",
    ]
  );

  const balanced = createPhotonPresetState("balanced_contra_rotating_pair");
  assert.equal(balanced.pair.left.layers.I.frequencyHz, 4);
  assert.equal(balanced.pair.left.layers.M.frequencyHz, 2);
  assert.equal(balanced.pair.left.layers.O.frequencyHz, 1);
  assert.equal(balanced.pair.right.layers.O.enabled, true);

  const linear = createPhotonPresetState("linear_polarization_candidate");
  assert.deepEqual(
    ["I", "M", "O"].map((layerId) => getPhotonLayerEnabled(linear, "left", layerId)),
    [false, false, true]
  );

  const right = createPhotonPresetState("right_circular_candidate");
  const left = createPhotonPresetState("left_circular_candidate");
  assert.equal(right.pair.left.layers.O.phaseDeg, 120);
  assert.equal(left.pair.left.layers.O.phaseDeg, 240);

  const radiusStress = createPhotonPresetState("layer_radius_stress_test");
  assert.equal(radiusStress.pair.left.layers.I.radius, 0.02);
  assert.equal(radiusStress.pair.left.layers.M.radius, 0.11);
  assert.equal(radiusStress.pair.left.layers.O.radius, PHOTON_MAX_OUTER_RADIUS);
});

test("configuration search can score and compare settings through the solver path", async () => {
  const state = createDefaultPhotonState();
  const bridge = createPhotonCircularSourceBridgeStub();
  const results = await createPhotonConfigurationSearchResultsWithSolverBridge(state, {
    solveCircularSourceRootsHitsLedger: bridge.solveCircularSourceRootsHitsLedger,
    limit: 2,
    maxCandidates: 2,
    summaryOptions: {
      polarizationSampleCount: 6,
      analyzerSampleCount: 3,
    },
    perturbOptions: {
      polarizationSampleCount: 4,
      analyzerSampleCount: 2,
    },
  });

  assert.equal(results.length, 2);
  assert.ok(bridge.calls.length > 0);
  assert.ok(results.some((result) =>
    result.comparison.absoluteHistory.helicalPhaseFamilyCount > 0 ||
    result.comparison.coMoving.helicalPhaseFamilyCount > 0
  ));
  assert.ok(results.some((result) =>
    result.state.pair.speedMode === "lorentz_factor" &&
    result.diagnostics.speedMode === "lorentz_factor"
  ));
  results.forEach((result) => {
    assert.ok(result.id.startsWith("photon-search-"));
    assert.equal(result.selected, true);
    assert.ok(Number.isFinite(result.score));
    assert.equal(result.state.app, "photon");
    assert.ok(Number.isFinite(result.diagnostics.rootCount));
    assert.equal(result.comparison.status, "ok");
    assert.equal(
      result.comparison.absoluteHistory.sourceMode,
      "solver_bridge_absolute_history_receiver_normal_root_branch_sum"
    );
    assert.ok(Number.isFinite(result.comparison.absoluteHistory.helicalPhaseFamilyCount));
    assert.ok(Number.isFinite(result.comparison.absoluteHistory.helicalStablePhaseFamilyCount));
    assert.ok(Number.isFinite(result.comparison.deltas.stableHelicalFamilyDelta));
    assert.ok(Number.isFinite(result.diagnostics.localLorentzFactor));
    assert.ok(Number.isFinite(result.diagnostics.signalSpeedCf));
    assert.ok(Number.isFinite(result.diagnostics.photonSpeedCf));
  });
});

test("configuration search compares co-moving and absolute-history solver results when available", async () => {
  const state = createDefaultPhotonState();
  const bridge = createPhotonMixedSearchBridgeStub();
  const results = await createPhotonConfigurationSearchResultsWithSolverBridge(state, {
    solveCircularSourceRootsHitsLedger: bridge.solveCircularSourceRootsHitsLedger,
    runSolverBridge: bridge.runSolverBridge,
    limit: 2,
    maxCandidates: 2,
    summaryOptions: {
      polarizationSampleCount: 6,
      minimumPolarizationSampleCount: 4,
      analyzerSampleCount: 3,
      minimumAnalyzerSampleCount: 2,
    },
    perturbOptions: {
      polarizationSampleCount: 4,
      minimumPolarizationSampleCount: 3,
      analyzerSampleCount: 2,
      minimumAnalyzerSampleCount: 1,
    },
    comparisonOptions: {
      polarizationSampleCount: 4,
      minimumPolarizationSampleCount: 3,
      analyzerSampleCount: 2,
      minimumAnalyzerSampleCount: 1,
      absoluteHistorySegments: 2,
      maxDelay: 0.25,
    },
  });

  assert.equal(results.length, 2);
  assert.ok(bridge.circularCalls.length > 0);
  assert.ok(results.some((result) => result.source === "local-c"));
  assert.equal(bridge.runCalls.length, 0);
  assert.ok(!bridge.runCalls.some((runRequest) => runRequest.runKind === "sharedGeometry"));
  results.forEach((result) => {
    assert.equal(result.comparison.status, "ok");
    assert.equal(result.comparison.coMoving.sourceMode, "solver_bridge_circular_source_branch_sum");
    assert.equal(
      result.comparison.absoluteHistory.sourceMode,
      "solver_bridge_absolute_history_receiver_normal_root_branch_sum"
    );
    assert.ok(Number.isFinite(result.comparison.deltas.strengthDelta));
    assert.ok(Number.isFinite(result.comparison.deltas.rootCountDelta));
  });

  const serialized = serializePhotonSearchResults(results);
  const imported = parsePhotonSearchResultsJson(serialized);
  assert.equal(imported[0].comparison.status, "ok");
});

test("bridge-backed photon diagnostics expose the active solver engine", async () => {
  const state = createDefaultPhotonState();
  const bridge = createPhotonCircularSourceBridgeStub();
  const summary = await computePhotonFormulaSummaryWithSolverBridge(state, 0, {
    solveCircularSourceRootsHitsLedger: bridge.solveCircularSourceRootsHitsLedger,
    polarizationSampleCount: 6,
    analyzerSampleCount: 3,
  });
  const rows = new Map(getPhotonDiagnosticRows(state, 0, summary));

  assert.equal(rows.get("Solver engine"), "architrino-solver-app-bridge");
  assert.equal(rows.get("Span self-hit roots"), "0 / 6");
  assert.equal(rows.get("Span self-hit max v/c_sig"), "1.56");
  assert.equal(rows.get("Helical self-hit roots"), "12 / 12");
  assert.equal(rows.get("Helical self-hit max v/c_sig"), "1.56");
  assert.match(rows.get("Helical self-hit phase spread"), / deg$/);
  assert.match(rows.get("Helical phase families"), /^\d+ \/ \d+$/);
  assert.match(rows.get("Best helical family"), / deg \(\d+\)$/);
  assert.equal(rows.get("Missed sources"), "6");
  assert.equal(rows.get("No catch-up sources"), "6");
  assert.equal(rows.get("Stale windows"), "0");
  assert.equal(rows.get("Near misses"), "0");
  assert.equal(rows.get("Root cap hits"), "0");
  assert.equal(rows.get("Delay status"), "catch-up limited");
  assert.match(rows.get("Trailing hit phase spread"), / deg$/);
  assert.match(rows.get("Leading hit phase spread"), / deg$/);
});

test("configuration search results export and import full settings", async () => {
  const state = createDefaultPhotonState();
  state.measurement.virtualObserver.y = 1.25;
  const bridge = createPhotonCircularSourceBridgeStub();
  const results = await createPhotonConfigurationSearchResultsWithSolverBridge(state, {
    solveCircularSourceRootsHitsLedger: bridge.solveCircularSourceRootsHitsLedger,
    limit: 3,
    maxCandidates: 3,
    summaryOptions: {
      polarizationSampleCount: 6,
      analyzerSampleCount: 3,
    },
    perturbOptions: {
      polarizationSampleCount: 4,
      analyzerSampleCount: 2,
    },
  });
  const json = serializePhotonSearchResults(results);
  const imported = parsePhotonSearchResultsJson(json);

  assert.equal(imported.length, results.length);
  assert.equal(imported[0].state.app, "photon");
  assert.deepEqual(imported[0].state.measurement.virtualObserver, results[0].state.measurement.virtualObserver);
  assert.equal(imported[0].name, results[0].name);
  assert.equal(imported[0].selected, true);
});

test("separation reference radius follows the largest enabled radius", () => {
  const state = createDefaultPhotonState();
  ["left", "right"].forEach((braidId) => {
    ["I", "M", "O"].forEach((layerId) => {
      state.pair[braidId].layers[layerId].radius = 0.2;
    });
  });

  assert.equal(getPhotonSeparationReferenceRadius(state), 0.2);
  assert.equal(getPhotonPairSeparationFromLog10Ratio(state, 0), 0.2);
});

test("photon state normalization preserves configured values", () => {
  const state = createDefaultPhotonState();
  state.polarization.analyzerAngleDeg = 45;
  state.pair.right.layers.M.frequencyHz = 7;
  state.pair.right.layers.O.enabled = false;
  state.measurement.sourceHistoryMode = "absolute_history";
  state.pair.photonSpeedCf = 0.83;
  state.measurement.signalSpeedCf = 0.74;
  state.measurement.virtualObserver.x = 5.25;
  state.measurement.virtualObserver.y = -1.5;
  state.view.rawPolarizationVisible = false;
  const normalized = normalizePhotonState(state);

  assert.equal(normalized.polarization.analyzerAngleDeg, 45);
  assert.equal(normalized.view.rawPolarizationVisible, false);
  assert.equal(normalized.pair.right.layers.M.frequencyHz, 8);
  assert.equal(normalized.pair.right.layers.O.enabled, false);
  assert.equal(normalized.pair.photonSpeedCf, 0.83);
  assert.equal(normalized.measurement.sourceHistoryMode, "absolute_history");
  assert.equal(normalized.measurement.signalSpeedCf, 0.74);
  assert.equal(normalized.measurement.emissionSpeedCf, 0.74);
  assert.equal(normalized.measurement.virtualObserver.x, 5.25);
  assert.equal(normalized.measurement.virtualObserver.y, -1.5);
  assert.deepEqual(normalized, normalizePhotonState(normalized));
});

test("formula summary reports a derived solver-bridge polarization fit", async () => {
  const state = createDefaultPhotonState();
  state.polarization.analyzerAngleDeg = 60;
  const bridge = createPhotonCircularSourceBridgeStub();
  const summary = await computePhotonFormulaSummaryWithSolverBridge(state, 0.5, {
    solveCircularSourceRootsHitsLedger: bridge.solveCircularSourceRootsHitsLedger,
    polarizationSampleCount: 6,
    analyzerSampleCount: 3,
  });

  assert.equal(summary.solverEngineId, "architrino-solver-app-bridge");
  assert.ok(["weak", "linear", "right_circular", "left_circular", "elliptical"].includes(
    summary.polarization.classification
  ));
  assert.ok(Number.isFinite(summary.polarization.amplitudes.y));
  assert.ok(Number.isFinite(summary.polarization.amplitudes.z));
  assert.ok(Number.isFinite(summary.polarization.phaseLagDeg));
  assert.ok(Number.isFinite(summary.analyzerTarget));
  assert.ok(Number.isFinite(summary.fitResidual));
  assert.ok(summary.fitResidual >= 0);
  assert.ok(Number.isFinite(summary.analyzerResidual));
});

test("polarization fitter classifies a one-axis signal as linear", () => {
  const fit = fitPhotonPolarizationFromSamples(buildSyntheticPolarizationSamples({ ampY: 1, ampZ: 0 }));

  assert.equal(fit.classification, "linear");
  assertNear(fit.amplitudes.y, 1, 1e-12);
  assertNear(fit.amplitudes.z, 0, 1e-12);
  assertNear(fit.fitResidual, 0, 1e-12);
  assert.equal(fit.phaseLagDefined, false);
});

test("polarization fitter classifies equal quadrature amplitudes as circular", () => {
  const fit = fitPhotonPolarizationFromSamples(
    buildSyntheticPolarizationSamples({ ampY: 1, ampZ: 1, phaseLag: -Math.PI / 2 })
  );

  assert.equal(fit.classification, "right_circular");
  assertNear(fit.amplitudes.y, 1, 1e-12);
  assertNear(fit.amplitudes.z, 1, 1e-12);
  assertNear(fit.phaseLag, -Math.PI / 2, 1e-12);
  assertNear(fit.fitResidual, 0, 1e-12);
  assert.equal(fit.phaseLagDefined, true);
  assertNear(fit.analyzerFractionTarget, 0.5, 1e-12);
});

test("polarization fitter classifies unequal quadrature amplitudes as elliptical", () => {
  const fit = fitPhotonPolarizationFromSamples(
    buildSyntheticPolarizationSamples({ ampY: 1, ampZ: 0.5, phaseLag: -Math.PI / 3 })
  );

  assert.equal(fit.classification, "elliptical");
  assertNear(fit.amplitudes.y, 1, 1e-12);
  assertNear(fit.amplitudes.z, 0.5, 1e-12);
  assertNear(fit.fitResidual, 0, 1e-12);
});

test("derived solver-bridge polarization trace uses the fitted current field", async () => {
  const state = createDefaultPhotonState();
  state.polarization.analyzerAngleDeg = 17;
  const bridge = createPhotonCircularSourceBridgeStub();
  const trace = await buildPhotonDerivedPolarizationTraceWithSolverBridge(state, 0.5, 6, {
    solveCircularSourceRootsHitsLedger: bridge.solveCircularSourceRootsHitsLedger,
    minimumPolarizationSampleCount: 6,
  });

  assert.equal(trace.solverEngineId, "architrino-solver-app-bridge");
  assert.ok(trace.rawSamples.length >= 6);
  assert.ok(["weak", "linear", "right_circular", "left_circular", "elliptical"].includes(
    trace.classification
  ));
  assertNear(trace.current.ey, trace.fittedCurrent.ey, 1e-12);
  assertNear(trace.current.ez, trace.fittedCurrent.ez, 1e-12);
});

test("derived solver-bridge polarization inset trace is centered on the oscillating component", async () => {
  const state = createDefaultPhotonState();
  const bridge = createPhotonCircularSourceBridgeStub();
  const trace = await buildPhotonDerivedPolarizationTraceWithSolverBridge(state, 0, 6, {
    solveCircularSourceRootsHitsLedger: bridge.solveCircularSourceRootsHitsLedger,
    minimumPolarizationSampleCount: 6,
  });
  const eyValues = trace.samples.map((sample) => sample.ey);
  const ezValues = trace.samples.map((sample) => sample.ez);
  const eyMidpoint = (Math.min(...eyValues) + Math.max(...eyValues)) / 2;
  const ezMidpoint = (Math.min(...ezValues) + Math.max(...ezValues)) / 2;

  assert.ok(Number.isFinite(trace.components.y.dc));
  assert.ok(trace.scale > 0);
  assertNear(eyMidpoint, 0, 1e-9);
  assertNear(ezMidpoint, 0, 1e-9);
});

test("derived solver-bridge polarization ellipse fit stays stable while the current point advances", async () => {
  const state = createDefaultPhotonState();
  state.polarization.analyzerAngleDeg = 17;
  const bridge = createPhotonCircularSourceBridgeStub();
  const options = {
    solveCircularSourceRootsHitsLedger: bridge.solveCircularSourceRootsHitsLedger,
    minimumPolarizationSampleCount: 6,
  };
  const first = await buildPhotonDerivedPolarizationTraceWithSolverBridge(state, 0.5, 6, options);
  const second = await buildPhotonDerivedPolarizationTraceWithSolverBridge(state, 1.25, 6, options);

  assertNear(first.scale, second.scale, 1e-12);
  assertNear(first.amplitudes.y, second.amplitudes.y, 1e-12);
  assertNear(first.amplitudes.z, second.amplitudes.z, 1e-12);
  assertNear(first.samples[3].ey, second.samples[3].ey, 1e-12);
  assertNear(first.samples[3].ez, second.samples[3].ez, 1e-12);
  assert.notEqual(first.currentProgress.toFixed(6), second.currentProgress.toFixed(6));
});

test("photon animation keeps braid time continuous while plot time wraps", () => {
  const state = createDefaultPhotonState();
  const runDuration = getPhotonRunDuration(state);
  const modelTime = advancePhotonModelTime(0, runDuration + 0.25, 1);
  const times = getPhotonRuntimeTimes(state, modelTime);

  assert.ok(times.modelTime > runDuration);
  assertNear(times.modelTime, runDuration + 0.25, 1e-12);
  assertNear(times.displayTime, 0.25, 1e-12);
});

test("spacebar playback shortcut ignores editable controls", () => {
  const baseEvent = {
    key: " ",
    code: "Space",
    defaultPrevented: false,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
  };

  assert.equal(shouldHandlePhotonSpaceToggle({ ...baseEvent, target: { tagName: "BODY" } }), true);

  for (const tagName of ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "OPTION"]) {
    assert.equal(
      shouldHandlePhotonSpaceToggle({ ...baseEvent, target: { tagName } }),
      false,
      tagName
    );
  }

  assert.equal(
    shouldHandlePhotonSpaceToggle({
      ...baseEvent,
      target: { tagName: "DIV", isContentEditable: true },
    }),
    false
  );
  assert.equal(
    shouldHandlePhotonSpaceToggle({ ...baseEvent, key: "Enter", code: "Enter" }),
    false
  );
});
