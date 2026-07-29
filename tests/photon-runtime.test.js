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
  getPhotonCommonFitWindowBounds,
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
  buildPhotonArchitrinoTransmitterRefs,
  buildPhotonDerivedPolarizationTraceWithPrescribedPathAnalysis,
  buildPhotonPlotSamplesWithPrescribedPathAnalysis,
  computePhotonDelayedEmissionFieldWithPrescribedPathAnalysis,
  computePhotonEnergyWeightedAnalyzerFraction,
  computePhotonFormulaSummaryWithPrescribedPathAnalysis,
  computePhotonObserverFieldWithPrescribedPathAnalysis,
  createPhotonAbsoluteMovingCircularCausalRootRequest,
  createPhotonCircularTransmitterCausalRootRequest,
  createPhotonCircularSelfHitSpansRunRequest,
  createPhotonCausalRootsSolverRunRequest,
  computePhotonSelfHitDiagnosticsWithPrescribedPathAnalysis,
  fitPhotonPolarizationFromSamples,
  getPhotonArchitrinoKinematics,
  solvePhotonAbsoluteCausalRootsForTransmitterWithPrescribedPathAnalysis,
  solvePhotonCircularTransmitterCausalRootsWithPrescribedPathAnalysis,
  solvePhotonCircularTransmitterRootsHitsLedgerWithPrescribedPathAnalysis,
  solvePhotonCausalRootsWithPrescribedPathAnalysis,
} from "../src/apps/photon/PhotonFormulaRuntime.js";
import {
  computePhotonDiagnostics,
  getPhotonDiagnosticRows,
} from "../src/apps/photon/PhotonDiagnosticsRuntime.js";
import {
  createPhotonConfigurationSearchResultsWithPrescribedPathAnalysis,
  parsePhotonSearchResultsJson,
  serializePhotonSearchResults,
} from "../src/apps/photon/PhotonSearchRuntime.js";
import {
  PHOTON_SELF_HIT_PHASE_LOCK_SWEEP_SCHEMA,
  createPhotonSelfHitPhaseLockSweepCases,
  runPhotonSelfHitPhaseLockSweep,
} from "../src/apps/photon/PhotonSelfHitSweepRuntime.js";
import {
  PHOTON_TRANSMITTER_HISTORY_BOUNDARY,
  PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID,
} from "../src/apps/photon/PhotonTransmitterHistoryRuntime.js";
import {
  advancePhotonModelTime,
  getPhotonRuntimeTimes,
  shouldHandlePhotonSpaceToggle,
} from "../src/apps/photon/PhotonRuntime.js";
import {
  computeMovingCircularObserverField,
  solveMovingCircularAbsoluteHistoryRun,
  solveMovingCircularSameTransmitterCausalRoots,
  solveMovingCircularTransmitterCausalRoots,
} from "../src/prescribed-path-analysis/PrescribedPathAnalysis.mjs";
import {
  computePhotonStageLayout,
  getPhotonFieldPlotSampleCount,
  isPhotonPlotSampleInForwardGap,
  resolvePhotonPolarizationCurrentPoint,
} from "../src/apps/photon/PhotonBraidVisualRuntime.js";

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

function evaluateCircularTransmitterRequestPosition(segment, time) {
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

function createPhotonCircularTransmitterBridgeStub() {
  const calls = [];
  const solveCircularTransmitterRootsHitsLedger = async (request) => {
    calls.push(request);
    let emissionTime = Number(request.hitTime) || 0;
    let transmitterPoint = evaluateCircularTransmitterRequestPosition(request.transmitter, emissionTime);
    const receiverPoint = request.receiver.positionAtStart;
    let distance = Math.hypot(
      receiverPoint.x - transmitterPoint.x,
      receiverPoint.y - transmitterPoint.y,
      receiverPoint.z - transmitterPoint.z
    );
    for (let index = 0; index < 6; index += 1) {
      emissionTime = request.hitTime - distance / Math.max(1e-12, request.signalSpeed);
      transmitterPoint = evaluateCircularTransmitterRequestPosition(request.transmitter, emissionTime);
      distance = Math.hypot(
        receiverPoint.x - transmitterPoint.x,
        receiverPoint.y - transmitterPoint.y,
        receiverPoint.z - transmitterPoint.z
      );
    }
    const delay = request.hitTime - emissionTime;
    return {
      schema: "solver-circular-transmitter-roots-hits-ledger-f64.v2",
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
          accelerationWeight: request.signalSpeed,
          transmitterFactor: 1,
          receiverFactor: 1,
          rootPlayback: 1,
          transmitterPoint,
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
          bracketStart: request.transmitter.startTime,
          bracketEnd: request.transmitter.endTime,
          emissionTime,
          hitTime: request.hitTime,
          residual: distance - delay * request.signalSpeed,
          jacobian: 1,
          accelerationWeight: request.signalSpeed,
          transmitterFactor: 1,
          receiverFactor: 1,
          rootPlayback: 1,
        },
      ],
      status: { code: "ok", severity: "ok", message: "circular-transmitter causal roots solved" },
    };
  };
  return { calls, solveCircularTransmitterRootsHitsLedger };
}

function createPhotonLinearRootBridgeStub() {
  const calls = [];
  const runPrescribedPathAnalysis = async (runRequest) => {
    const request = runRequest.config.rootRequest;
    calls.push(request);
    const emissionTime = (request.transmitter.startTime + request.transmitter.endTime) / 2;
    const transmitterPoint = evaluateLinearSegmentPosition(request.transmitter, emissionTime);
    const receiverPoint = evaluateLinearSegmentPosition(request.receiver, request.hitTime);
    const distance = Math.hypot(
      receiverPoint.x - transmitterPoint.x,
      receiverPoint.y - transmitterPoint.y,
      receiverPoint.z - transmitterPoint.z
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
            accelerationWeight: 1,
            transmitterPoint,
            receiverPoint,
          },
        ],
        status: { code: "ok", severity: "ok", message: "causal roots solved" },
      },
    };
  };
  return { calls, runPrescribedPathAnalysis };
}

function createPhotonMixedSearchBridgeStub() {
  const circularBridge = createPhotonCircularTransmitterBridgeStub();
  const runCalls = [];
  const runPrescribedPathAnalysis = async (runRequest) => {
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
    const emissionTime = (request.transmitter.startTime + request.transmitter.endTime) / 2;
    const transmitterPoint = evaluateLinearSegmentPosition(request.transmitter, emissionTime);
    const receiverPoint = evaluateLinearSegmentPosition(request.receiver, request.hitTime);
    const distance = Math.hypot(
      receiverPoint.x - transmitterPoint.x,
      receiverPoint.y - transmitterPoint.y,
      receiverPoint.z - transmitterPoint.z
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
            accelerationWeight: 1,
            transmitterPoint,
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
    solveCircularTransmitterRootsHitsLedger: circularBridge.solveCircularTransmitterRootsHitsLedger,
    runPrescribedPathAnalysis,
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
  assert.equal(state.measurement.transmitterHistoryMode, "absolute_history");
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
  assert.deepEqual(getPhotonCommonFitWindowBounds(state), {
    start: 0.25,
    end: 1.25,
    duration: 1,
    slowestFrequency: 1,
  });

  state.time.cycleCount = 1;
  assert.deepEqual(getPhotonMiddleCycleBounds(state), { start: 0, end: 0.5 });
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

test("Photon causal roots can be routed through the prescribed-path analysis for linear segments", async () => {
  const rootRequest = {
    transmitter: {
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

  const roots = await solvePhotonCausalRootsWithPrescribedPathAnalysis(rootRequest, {
    runRequest,
    async runPrescribedPathAnalysis(request) {
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
              accelerationWeight: 1,
              transmitterPoint: { x: 0, y: 0, z: 0 },
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

test("Photon circular-transmitter analysis request preserves transmitter orbit geometry", () => {
  const state = createDefaultPhotonState();
  state.measurement.signalSpeedCf = 0.72;
  state.measurement.emissionSpeedCf = 0.72;
  state.pair.photonSpeedCf = 0.72;
  const transmitterRef = { braidId: "left", layerId: "O", chargeType: "electrino" };
  const observationTime = 0.75;
  const request = createPhotonCircularTransmitterCausalRootRequest(state, transmitterRef, observationTime);
  const emissionTime = (request.transmitter.startTime + request.transmitter.endTime) / 2;
  const requestPosition = evaluateCircularTransmitterRequestPosition(request.transmitter, emissionTime);
  const kinematics = getPhotonArchitrinoKinematics(
    state,
    transmitterRef.braidId,
    transmitterRef.layerId,
    transmitterRef.chargeType,
    emissionTime
  );

  assert.ok(request.transmitter.startTime <= emissionTime, "expected request transmitter history before sample");
  assert.equal(request.transmitter.endTime, observationTime);
  assert.equal(request.receiver.endTime, observationTime);
  assert.equal(request.hitTime, observationTime);
  assert.equal(request.signalSpeed, 0.72);
  assert.equal(request.receiver.velocity.x, 0);
  assertNear(requestPosition.x, kinematics.position.x);
  assertNear(requestPosition.y, kinematics.position.y);
  assertNear(requestPosition.z, kinematics.position.z);
  assertNear(request.transmitter.angularVelocity, kinematics.angularVelocity);
});

test("Photon absolute-history transmitter roots route through the moving-circular prescribed-path analysis", async () => {
  const state = createDefaultPhotonState();
  state.measurement.transmitterHistoryMode = "absolute_history";
  state.measurement.signalSpeedCf = 0.9;
  state.measurement.emissionSpeedCf = 0.9;
  state.pair.photonSpeedCf = 0.5;
  const transmitterRef = { braidId: "right", layerId: "O", chargeType: "electrino" };
  let movingCalls = 0;
  const solveMovingCircularTransmitterRoots = async (request) => {
    movingCalls += 1;
    assert.equal(request.transmitterHistoryProvider.providerId, PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID);
    assert.equal(request.analysisBoundary.causalRootOwner, "prescribed_path_analysis");
    return solveMovingCircularTransmitterCausalRoots(request);
  };

  const roots = await solvePhotonAbsoluteCausalRootsForTransmitterWithPrescribedPathAnalysis(
    state,
    transmitterRef,
    0.5,
    {
      solveMovingCircularTransmitterRoots,
      maxDelay: 0.4,
      scanSubdivisions: 24,
    }
  );

  assert.equal(movingCalls, 1);
  assert.ok(Array.isArray(roots));
});

test("prescribed-path observer field does not advance without complete receiver-side root-playback records", async () => {
  const response = computeMovingCircularObserverField({
    signalSpeed: 1,
    minimumDistance: 0.08,
    jacobianFloor: 1e-4,
    branches: [
      {
        chargeSign: 1,
        direction: { x: 0, y: 1, z: 0 },
        transmitterVelocity: { x: 0, y: 0, z: 0 },
        distance: 0.01,
        residual: 0,
        delay: 0.25,
        transmitterFactor: 0.5,
      },
    ],
  });

  assert.equal(response.status.code, "causal_factor_record_missing");
  assert.equal(response.unstableContributionCount, 1);
  assert.equal(response.contributions[0].causalFactorEvidenceStatus, "causal_factor_record_missing");
  assert.equal(response.contributions[0].accelerationWeight, 0);
  assert.equal(response.contributions[0].distance, 0.08);
  assert.equal(response.electric.y, 0);
  assert.equal(response.comparisonB.z, 0);
});

test("Photon absolute-history field routes through the moving-circular prescribed-path run", async () => {
  const state = createDefaultPhotonState();
  state.measurement.transmitterHistoryMode = "absolute_history";
  state.measurement.signalSpeedCf = 0.9;
  state.measurement.emissionSpeedCf = 0.9;
  state.pair.photonSpeedCf = 0.5;
  let absoluteHistoryRunCalls = 0;
  const runAbsoluteHistory = async (request) => {
    absoluteHistoryRunCalls += 1;
    assert.equal(request.transmitterHistoryProviderId, PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID);
    assert.equal(request.analysisBoundary.rootPlaybackOwner, "prescribed_path_analysis");
    assert.equal(request.analysisBoundary.fieldReconstructionOwner, "prescribed_path_analysis");
    assert.equal(request.observerFieldRequest.transmitterHistoryProviderId, PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID);
    assert.equal(request.observerFieldRequest.analysisBoundary.rootPlaybackOwner, "prescribed_path_analysis");
    assert.ok(request.transmitterRootRequests.length > 0);
    assert.ok(request.transmitterRootRequests.every((transmitterRequest) =>
      transmitterRequest.transmitterHistoryProvider?.providerId === PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID &&
      transmitterRequest.analysisBoundary?.causalRootOwner === "prescribed_path_analysis" &&
      Number.isFinite(transmitterRequest.branchChargeSign)
    ));
    return solveMovingCircularAbsoluteHistoryRun(request);
  };

  const field = await computePhotonDelayedEmissionFieldWithPrescribedPathAnalysis(state, 0.5, {
    solveMovingCircularAbsoluteHistoryRun: runAbsoluteHistory,
    maxDelay: 0.4,
    scanSubdivisions: 24,
  });

  assert.equal(absoluteHistoryRunCalls, 1);
  assert.equal(field.transmitterMode, "prescribed_path_absolute_history_transmitter_acceleration_sum");
  assert.equal(field.analysisFieldSchema, "prescribed-path-analysis/moving-circular-observer-field.v2");
  assert.equal(field.transmitterHistoryProviderId, PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID);
  assert.equal(field.rootPlaybackOwner, "prescribed_path_analysis");
  assert.equal(field.fieldReconstructionOwner, "prescribed_path_analysis");
  assert.ok(Number.isFinite(field.electric.y));
});

test("absolute-history contributions stay paired with root identities after delay sorting", async () => {
  const state = createDefaultPhotonState();
  const field = await computePhotonDelayedEmissionFieldWithPrescribedPathAnalysis(state, 0.5, {
    async solveMovingCircularAbsoluteHistoryRun(request) {
      const transmitterRef = request.transmitterRootRequests[0].transmitterRef;
      return {
        transmitterRootResponses: [
          {
            requestIndex: 0,
            transmitterRef,
            roots: [
              {
                emissionTime: 0.1,
                hitTime: 0.5,
                delay: 0.4,
                distance: 0.4,
                residual: 0,
                transmitterPoint: { x: -0.4, y: 0, z: 0 },
                receiverPoint: { x: 0, y: 0, z: 0 },
              },
              {
                emissionTime: 0.3,
                hitTime: 0.5,
                delay: 0.2,
                distance: 0.2,
                residual: 0,
                transmitterPoint: { x: -0.2, y: 0, z: 0 },
                receiverPoint: { x: 0, y: 0, z: 0 },
              },
            ],
            status: { code: "ok", severity: "ok" },
          },
        ],
        observerField: {
          schema: "prescribed-path-analysis/moving-circular-observer-field.v2",
          contributions: [
            {
              transmitterRootRequestIndex: 0,
              transmitterRootIndex: 0,
              electric: { x: 0, y: 11, z: 0 },
              comparisonB: { x: 0, y: 0, z: 11 },
            },
            {
              transmitterRootRequestIndex: 0,
              transmitterRootIndex: 1,
              electric: { x: 0, y: 22, z: 0 },
              comparisonB: { x: 0, y: 0, z: 22 },
            },
          ],
          averageDelay: 0.3,
          delaySolveGapMax: 0,
          maxTransmitterSpeedRatio: 0,
          jacobianAbsMin: 1,
          unstableContributionCount: 0,
          nearestTransmitterDistance: 0.2,
        },
      };
    },
  });

  assert.deepEqual(
    field.contributions.map((row) => [row.transmitterRootIndex, row.electric.y]),
    [[1, 22], [0, 11]]
  );
  assert.equal(field.electric.y, 33);
});

test("Photon helical same-transmitter roots route through the moving-circular prescribed-path analysis", async () => {
  const state = createDefaultPhotonState();
  let sameTransmitterCalls = 0;
  const solveSameTransmitterRoots = async (request) => {
    sameTransmitterCalls += 1;
    return solveMovingCircularSameTransmitterCausalRoots(request);
  };

  const diagnostics = await computePhotonSelfHitDiagnosticsWithPrescribedPathAnalysis(state, {
    solveMovingCircularSameTransmitterRoots: solveSameTransmitterRoots,
    skipSpanSelfHitDiagnostics: true,
  });

  assert.equal(sameTransmitterCalls, 12);
  assert.equal(diagnostics.helicalRecordCount, 12);
  assert.equal(diagnostics.status, "span-skipped");
});

test("Photon self-hit span requests use absolute photon plus orbital speed ratios", () => {
  const state = createDefaultPhotonState();
  state.pair.photonSpeedCf = 0.6;
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
  assertNear(rows[0].fieldSpeedRatio, Math.hypot(0.6, 1.2));
  assertNear(rows[1].fieldSpeedRatio, Math.hypot(0.6, 1));
  assertNear(rows[2].fieldSpeedRatio, Math.hypot(0.6, 0.8));
  assert.equal(rows[0].speedBudgetKind, "orthogonal_local_c_translation_plus_transverse_orbital");
  assert.equal(runRequest.envelope.interactionPolicy, "same-transmitter-enabled");
});

test("Photon self-hit diagnostics route same-transmitter causal hits through the prescribed-path analysis", async () => {
  const state = createDefaultPhotonState();
  state.pair.photonSpeedCf = 0;
  const spans = [2.05, 0, 0, 2.05, 0, 0];
  const diagnostics = await computePhotonSelfHitDiagnosticsWithPrescribedPathAnalysis(state, {
    requestId: "photon_self_hit_request",
    runId: "photon_self_hit_run",
    datasetId: "photon_self_hit_dataset",
    async runPrescribedPathAnalysis(runRequest) {
      assert.equal(runRequest.config.geometryRequest.circularSelfHitSpans.length, 6);
      return createPhotonSelfHitRunHandle(runRequest, spans);
    },
  });

  assert.equal(diagnostics.status, "ok");
  assert.equal(diagnostics.recordCount, 6);
  assert.equal(diagnostics.candidateCount, 2);
  assert.equal(diagnostics.rootFoundCount, 2);
  assert.equal(diagnostics.records[0].role, "trailing");
  assert.equal(diagnostics.records[0].layerId, "I");
  assert.equal(diagnostics.records[0].resultKind, "root_solved");
  assertNear(diagnostics.records[0].span, spans[0]);
});

test("Photon self-hit diagnostics use prescribed span analysis when circular-transmitter roots are injected", async () => {
  const state = createDefaultPhotonState();
  const diagnostics = await computePhotonSelfHitDiagnosticsWithPrescribedPathAnalysis(state, {
    solveCircularTransmitterRootsHitsLedger: async () => ({ roots: [] }),
  });

  assert.equal(diagnostics.status, "ok");
  assert.equal(diagnostics.recordCount, 6);
  assert.equal(diagnostics.rootFoundCount, 6);
  assert.ok(diagnostics.candidateCount >= 2);
  assert.equal(diagnostics.helicalRecordCount, 12);
  assert.equal(diagnostics.helicalRootFoundCount, 12);
  assert.ok(diagnostics.helicalPhaseFamilyCount > 0);
  assert.equal(diagnostics.helicalStablePhaseFamilyCount, 0);
  assert.equal(diagnostics.helicalSpeedRegimeSummary.selfHitRoots, 12);
  assert.equal(diagnostics.helicalSpeedRegimeSummary.subFieldRoots, 0);
  assert.ok(diagnostics.helicalSelfHitFamilyCount > 0);
  assert.equal(diagnostics.helicalStablePhaseLockFamilyCount, 0);
  assert.ok(diagnostics.helicalSingularCandidateFamilyCount > 0);
  assert.equal(diagnostics.helicalBestPhaseFamily.speedFamily, "self_hit");
  assert.equal(diagnostics.helicalBestPhaseFamily.phaseLockClassification, "singular_candidate");
  assert.ok(diagnostics.helicalBestPhaseFamily.label.includes(" "));
  assert.ok(diagnostics.helicalRecords.every((record) =>
    record.transmitterHistoryKind === "moving-circular-same-transmitter" &&
    record.phaseAtHit?.rootKind === "same-transmitter" &&
    Number.isFinite(record.phaseAtHit.receiverPhaseDegrees)
  ));
});

test("Photon helical self-hit phase-lock sweep summarizes sampled cases", async () => {
  const cases = createPhotonSelfHitPhaseLockSweepCases({
    presetIds: ["balanced_contra_rotating_pair"],
    photonSpeedCfValues: [0, 1],
    signalSpeedCfValues: [1],
    observationProgressValues: [0, 0.25],
  });

  assert.equal(cases.length, 4);
  assert.equal(cases[0].presetId, "balanced_contra_rotating_pair");

  const sweep = await runPhotonSelfHitPhaseLockSweep({
    presetIds: ["balanced_contra_rotating_pair"],
    photonSpeedCfValues: [0, 1],
    signalSpeedCfValues: [1],
    observationProgressValues: [0, 0.25],
    helicalSelfHitHistoryCycles: 2,
    helicalSelfHitScanSubdivisions: 64,
    helicalSelfHitMaxRoots: 8,
  });

  assert.equal(sweep.schema, PHOTON_SELF_HIT_PHASE_LOCK_SWEEP_SCHEMA);
  assert.equal(sweep.summary.caseCount, 4);
  assert.equal(sweep.cases.length, 4);
  assert.equal(typeof sweep.summary.stablePhaseLockFound, "boolean");
  assert.ok(sweep.summary.totalPhaseFamilies >= 0);
  assert.ok(sweep.cases.every((caseResult) =>
    caseResult.caseId &&
    Number.isFinite(caseResult.helicalPhaseFamilyCount) &&
    Array.isArray(caseResult.phaseFamilies)
  ));
});

test("Photon circular-transmitter roots, hits, and ledger entries can be routed through the prescribed-path analysis", async () => {
  const state = createDefaultPhotonState();
  const transmitterRef = { braidId: "left", layerId: "O", chargeType: "positrino" };
  const observationTime = 0.75;
  const response = await solvePhotonCircularTransmitterRootsHitsLedgerWithPrescribedPathAnalysis(
    state,
    transmitterRef,
    observationTime,
    {
      async solveCircularTransmitterRootsAndHits(request) {
          assert.equal(request.hitTime, observationTime);
          assert.equal(request.receiver.positionAtStart.x, state.measurement.virtualObserver.x);
          assert.equal(request.transmitter.center.x < 0, true);
          assert.ok(request.scanSubdivisions >= 48);
          return {
            schema: "solver-circular-transmitter-roots-hits-ledger-f64.v2",
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
                accelerationWeight: 1,
                transmitterPoint: { x: -1, y: 0, z: 0 },
                receiverPoint: state.measurement.virtualObserver,
              },
            ],
            hits: [
              {
                hitId: 0,
                rootId: 0,
                transmitterPathKey: 0,
                receiverPathKey: 0,
                emissionTime: 0.5,
                hitTime: observationTime,
                delay: 0.25,
                distance: 0.25,
                transmitterPoint: { x: -1, y: 0, z: 0 },
                receiverPoint: state.measurement.virtualObserver,
                signalSpeed: 1,
                accelerationWeight: 1,
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
                accelerationWeight: 1,
              },
            ],
            status: { code: "ok", severity: "ok", message: "circular-transmitter causal roots solved" },
          };
      },
    }
  );

  assert.equal(response.analysisId, "prescribed-path-analysis");
  assert.equal(response.schema, "solver-circular-transmitter-roots-hits-ledger-f64.v2");
  assert.equal(response.hits.length, 1);
  assert.equal(response.rootLedgerDetails.length, 1);
  assert.equal(response.rootLedgerDetails[0].entryKind, 1);
  const roots = await solvePhotonCircularTransmitterCausalRootsWithPrescribedPathAnalysis(
    state,
    transmitterRef,
    observationTime,
    {
      async solveCircularTransmitterRootsHitsLedger(request) {
        assert.equal(request.hitTime, observationTime);
        return response;
      },
    }
  );
  assert.equal(roots.length, 1);
  assert.equal(roots[0].hitTime, observationTime);
  assert.equal(roots[0].residual, 0);
});

test("Photon delayed emission field can use absolute-history moving-circular analysis roots", async () => {
  const state = createDefaultPhotonState();
  state.pair.photonSpeedCf = 0.5;
  state.measurement.signalSpeedCf = 0.9;
  state.measurement.emissionSpeedCf = 0.9;
  const field = await computePhotonDelayedEmissionFieldWithPrescribedPathAnalysis(state, 0.75, {
    maxDelay: 0.25,
  });

  assert.equal(field.analysisId, "prescribed-path-analysis");
  assert.equal(field.transmitterMode, "prescribed_path_absolute_history_transmitter_acceleration_sum");
  assert.equal(field.analysisFieldSchema, "prescribed-path-analysis/moving-circular-observer-field.v2");
  assert.equal(field.transmitterHistoryProviderId, PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID);
  assert.equal(field.rootPlaybackOwner, "prescribed_path_analysis");
  assert.equal(field.fieldReconstructionOwner, "prescribed_path_analysis");
  assert.equal(field.measurement.transmitterHistoryMode, "absolute_history");
  assert.equal(field.transmitterCount, buildPhotonArchitrinoTransmitterRefs(state).length);
  assert.ok(field.rootCount > 0);
  assert.equal(field.unresolvedTransmitterCount, field.noCatchUpTransmitterCount);
  assert.equal(field.staleHistoryTransmitterCount, 0);
  assert.equal(field.nearMissTransmitterCount, 0);
  assert.equal(field.rootDiagnostics.rejectedReasonCounts.no_catch_up_root, field.noCatchUpTransmitterCount);
  assert.ok(field.contributions.every((contribution) =>
    contribution.kinematics.transmitterHistoryMode === "absolute_history_moving_circular"
  ));
  assert.ok(field.contributions.every((contribution) =>
    contribution.transmitterHistoryKind === "moving-circular-transmitter"
  ));
  assert.ok(field.contributions.every((contribution) =>
    contribution.transmitterHistoryProviderId === PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID &&
    contribution.analysisBoundary.rootPlaybackOwner === "prescribed_path_analysis"
  ));
  assert.ok(field.contributions.every((contribution) =>
    Number.isFinite(contribution.phaseAtHit?.transmitterPhaseCycleIndex)
  ));
  assert.ok(Number.isFinite(field.electric.y));
});

test("Photon delayed emission field can be assembled from prescribed-path analysis circular-transmitter roots", async () => {
  const state = createDefaultPhotonState();
  state.measurement.transmitterHistoryMode = "co_moving";
  const bridge = createPhotonCircularTransmitterBridgeStub();
  const field = await computePhotonDelayedEmissionFieldWithPrescribedPathAnalysis(state, 0.75, {
    solveCircularTransmitterRootsHitsLedger: bridge.solveCircularTransmitterRootsHitsLedger,
  });

  assert.equal(field.analysisId, "prescribed-path-analysis");
  assert.equal(field.transmitterMode, "prescribed_path_circular_transmitter_branch_sum");
  assert.equal(field.transmitterCount, buildPhotonArchitrinoTransmitterRefs(state).length);
  assert.equal(field.rootCount, field.transmitterCount);
  assert.equal(bridge.calls.length, field.transmitterCount);
  assert.ok(field.contributions.every((contribution) =>
    contribution.analysisId === "prescribed-path-analysis"
  ));
  assert.ok(field.contributions.every((contribution) =>
    contribution.transmitterHistoryKind === "co_moving_circular_transmitter"
  ));
  assert.ok(field.contributions.every((contribution) =>
    contribution.phaseAtHit?.receiverKind === "virtual-observer" &&
    Number.isFinite(contribution.phaseAtHit.transmitterPhaseDegrees)
  ));
  assert.ok(Number.isFinite(field.electric.y));
  assert.ok(Number.isFinite(field.comparisonB.z));
});

test("physical co-moving field pipeline pins a nonzero transverse value", async () => {
  const state = createDefaultPhotonState();
  state.measurement.transmitterHistoryMode = "co_moving";
  state.measurement.virtualObserver = { x: 0.4, y: 0.2, z: -0.1 };
  ["left", "right"].forEach((braidId) => {
    ["I", "M", "O"].forEach((layerId) => {
      state.pair[braidId].layers[layerId].enabled = braidId === "left" && layerId === "I";
    });
  });

  const field = await computePhotonObserverFieldWithPrescribedPathAnalysis(state, 0.137);

  assert.equal(field.rootCount, 2);
  assertNear(field.electric.y, 0.5253514178252129, 1e-10);
  assertNear(field.electric.z, -0.10630283496211346, 1e-10);
  assertNear(field.electric.magnitude, 0.5359985120613151, 1e-10);
  assert.ok(field.contributions.every((row) => row.causalFactorEvidenceStatus === "ok"));
});

test("Photon formula and plot APIs expose central prescribed-path analysis results", async () => {
  const state = createDefaultPhotonState();
  const summaryBridge = createPhotonCircularTransmitterBridgeStub();
  const summary = await computePhotonFormulaSummaryWithPrescribedPathAnalysis(state, 0.5, {
    solveCircularTransmitterRootsHitsLedger: summaryBridge.solveCircularTransmitterRootsHitsLedger,
    polarizationSampleCount: 24,
    analyzerSampleCount: 8,
  });

  assert.equal(summary.analysisId, "prescribed-path-analysis");
  assert.equal(summary.field.analysisId, "prescribed-path-analysis");
  assert.equal(summary.field.transmitterMode, "prescribed_path_absolute_history_transmitter_acceleration_sum");
  assert.equal(summary.field.analysisFieldSchema, "prescribed-path-analysis/moving-circular-observer-field.v2");
  assert.equal(summary.field.transmitterHistoryProviderId, PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID);
  assert.equal(summary.polarization.analysisId, "prescribed-path-analysis");
  assert.equal(summary.polarization.transmitterHistoryProviderId, PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID);
  assert.ok(Number.isFinite(summary.polarization.amplitudes.y));
  assert.ok(Number.isFinite(summary.averageAnalyzerFraction));
  assert.ok(summary.field.contributions.every((contribution) =>
    contribution.kinematics.transmitterHistoryMode === "absolute_history_moving_circular"
  ));

  const observerBridge = createPhotonCircularTransmitterBridgeStub();
  const observerField = await computePhotonObserverFieldWithPrescribedPathAnalysis(state, 0.5, {
    solveCircularTransmitterRootsHitsLedger: observerBridge.solveCircularTransmitterRootsHitsLedger,
  });
  assert.equal(observerField.analysisId, "prescribed-path-analysis");
  assert.equal(observerField.transmitterMode, "prescribed_path_absolute_history_transmitter_acceleration_sum");
  assert.equal(observerField.analysisFieldSchema, "prescribed-path-analysis/moving-circular-observer-field.v2");
  assert.ok(Number.isFinite(observerField.electric.magnitude));

  const plotBridge = createPhotonCircularTransmitterBridgeStub();
  const plot = await buildPhotonPlotSamplesWithPrescribedPathAnalysis(state, 0.5, 4, {
    solveCircularTransmitterRootsHitsLedger: plotBridge.solveCircularTransmitterRootsHitsLedger,
  });
  assert.equal(plot.analysisId, "prescribed-path-analysis");
  assert.equal(plot.transmitterMode, "prescribed_path_absolute_history_transmitter_acceleration_sum");
  assert.equal(plot.analysisFieldSchema, "prescribed-path-analysis/moving-circular-observer-field.v2");
  assert.equal(plot.transmitterHistoryProviderId, PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID);
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
    ["Binary 1", "Binary 2", "Binary 3"]
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

test("configuration search can score and compare settings through the prescribed-path analysis", async () => {
  const state = createDefaultPhotonState();
  const bridge = createPhotonCircularTransmitterBridgeStub();
  let yieldCount = 0;
  const results = await createPhotonConfigurationSearchResultsWithPrescribedPathAnalysis(state, {
    solveCircularTransmitterRootsHitsLedger: bridge.solveCircularTransmitterRootsHitsLedger,
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
    yieldToEventLoop: async () => {
      yieldCount += 1;
    },
  });

  assert.equal(results.length, 2);
  assert.ok(bridge.calls.length > 0);
  assert.ok(results.every((result) =>
    result.diagnostics.transmitterHistoryProviderId === PHOTON_TRANSMITTER_HISTORY_PROVIDER_ID &&
    result.diagnostics.fieldReconstructionOwner === "prescribed_path_analysis"
  ));
  assert.equal(yieldCount, 1);
  assert.ok(results.every((result) =>
    result.comparison.absoluteHistory.helicalPhaseFamilyCount === 0 &&
    result.comparison.coMoving.helicalPhaseFamilyCount === 0
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
      result.comparison.absoluteHistory.transmitterMode,
      "prescribed_path_absolute_history_transmitter_acceleration_sum"
    );
    assert.ok(Number.isFinite(result.comparison.absoluteHistory.helicalPhaseFamilyCount));
    assert.ok(Number.isFinite(result.comparison.absoluteHistory.helicalStablePhaseFamilyCount));
    assert.ok(Number.isFinite(result.comparison.deltas.stableHelicalFamilyDelta));
    assert.ok(Number.isFinite(result.diagnostics.localLorentzFactor));
    assert.ok(Number.isFinite(result.diagnostics.signalSpeedCf));
    assert.ok(Number.isFinite(result.diagnostics.photonSpeedCf));
  });
});

test("configuration search compares co-moving and absolute-history analysis results when available", async () => {
  const state = createDefaultPhotonState();
  const bridge = createPhotonMixedSearchBridgeStub();
  const results = await createPhotonConfigurationSearchResultsWithPrescribedPathAnalysis(state, {
    solveCircularTransmitterRootsHitsLedger: bridge.solveCircularTransmitterRootsHitsLedger,
    runPrescribedPathAnalysis: bridge.runPrescribedPathAnalysis,
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
      maxDelay: 0.25,
    },
  });

  assert.equal(results.length, 2);
  assert.ok(bridge.circularCalls.length > 0);
  assert.ok(results.some((result) => result.source === "local-c"));
  assert.equal(bridge.runCalls.length, 0);
  results.forEach((result) => {
    assert.equal(result.comparison.status, "ok");
    assert.equal(result.comparison.coMoving.transmitterMode, "prescribed_path_circular_transmitter_branch_sum");
    assert.equal(
      result.comparison.absoluteHistory.transmitterMode,
      "prescribed_path_absolute_history_transmitter_acceleration_sum"
    );
    assert.ok(Number.isFinite(result.comparison.deltas.strengthDelta));
    assert.ok(Number.isFinite(result.comparison.deltas.rootCountDelta));
  });

  const serialized = serializePhotonSearchResults(results);
  const imported = parsePhotonSearchResultsJson(serialized);
  assert.equal(imported[0].comparison.status, "ok");
});

test("Photon diagnostics expose the active prescribed-path analysis library", async () => {
  const state = createDefaultPhotonState();
  const bridge = createPhotonCircularTransmitterBridgeStub();
  const summary = await computePhotonFormulaSummaryWithPrescribedPathAnalysis(state, 0, {
    solveCircularTransmitterRootsHitsLedger: bridge.solveCircularTransmitterRootsHitsLedger,
    polarizationSampleCount: 6,
    analyzerSampleCount: 3,
  });
  const rows = new Map(getPhotonDiagnosticRows(state, 0, summary));

  assert.equal(rows.get("Analysis library"), "prescribed-path-analysis");
  assert.equal(rows.has("Helicity estimate"), false);
  assert.match(rows.get("Fitted S3 sign"), /^[+-]?\d$/);
  assert.equal(rows.get("Motion history"), "Photon constrained");
  assert.equal(rows.get("Field reconstruction"), "prescribed-path analysis");
  assert.equal(rows.get("Span self-hit roots"), "6 / 6");
  assert.equal(rows.get("Span self-hit max v/c_sig"), "1.56");
  assert.equal(rows.get("Helical self-hit roots"), "12 / 12");
  assert.equal(rows.get("Helical self-hit max v/c_sig"), "1.56");
  assert.equal(rows.get("Helical speed regimes"), "sub 0 / 0, edge 0 / 0, self 12 / 12");
  assert.match(rows.get("Helical self-hit phase spread"), / deg$/);
  assert.match(rows.get("Helical phase families"), /^\d+ \/ \d+$/);
  assert.match(rows.get("Helical phase-lock classes"), /^stable \d+, candidate \d+, singular \d+, self \d+$/);
  assert.match(rows.get("Best helical family"), / deg \(\d+\)$/);
  assert.equal(rows.get("Missed transmitters"), "6");
  assert.equal(rows.get("No catch-up transmitters"), "6");
  assert.equal(rows.get("Stale windows"), "0");
  assert.equal(rows.get("Near misses"), "0");
  assert.equal(rows.get("Root cap hits"), "0");
  assert.equal(rows.get("Delay status"), "catch-up limited");
  assert.match(rows.get("Left 120-deg spacing error"), / deg$/);
  assert.match(rows.get("Right 120-deg spacing error"), / deg$/);
  assert.match(rows.get("Trailing hit phase spread"), / deg$/);
  assert.match(rows.get("Leading hit phase spread"), / deg$/);
});

test("configuration search results export and import full settings", async () => {
  const state = createDefaultPhotonState();
  state.measurement.virtualObserver.y = 1.25;
  const bridge = createPhotonCircularTransmitterBridgeStub();
  const results = await createPhotonConfigurationSearchResultsWithPrescribedPathAnalysis(state, {
    solveCircularTransmitterRootsHitsLedger: bridge.solveCircularTransmitterRootsHitsLedger,
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
  results[0].selected = false;
  results[0].name = "x".repeat(500);
  const json = serializePhotonSearchResults(results);
  const imported = parsePhotonSearchResultsJson(json);

  assert.equal(imported.length, results.length);
  assert.equal(imported[0].state.app, "photon");
  assert.deepEqual(imported[0].state.measurement.virtualObserver, results[0].state.measurement.virtualObserver);
  assert.equal(imported[0].name.length, 120);
  assert.equal(imported[0].selected, false);
  assert.throws(
    () => parsePhotonSearchResultsJson(JSON.stringify(results)),
    /Unsupported Photon search-results file/
  );
  assert.throws(
    () => parsePhotonSearchResultsJson(JSON.stringify({
      app: "photon",
      kind: "photon-configuration-search-results",
      version: 999,
      results,
    })),
    /Unsupported Photon search-results file/
  );
  assert.throws(
    () => parsePhotonSearchResultsJson(JSON.stringify({
      app: "photon",
      kind: "photon-configuration-search-results",
      version: 1,
      results: Array.from({ length: 101 }, () => ({})),
    })),
    /exceeds 100 configurations/
  );
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
  state.measurement.transmitterHistoryMode = "absolute_history";
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
  assert.equal(normalized.measurement.transmitterHistoryMode, "absolute_history");
  assert.equal(normalized.measurement.signalSpeedCf, 0.74);
  assert.equal(normalized.measurement.emissionSpeedCf, 0.74);
  assert.equal(normalized.measurement.virtualObserver.x, 5.25);
  assert.equal(normalized.measurement.virtualObserver.y, -1.5);
  assert.deepEqual(normalized, normalizePhotonState(normalized));
});

test("formula summary reports a derived prescribed-path-analysis polarization fit", async () => {
  const state = createDefaultPhotonState();
  state.polarization.analyzerAngleDeg = 60;
  const bridge = createPhotonCircularTransmitterBridgeStub();
  const summary = await computePhotonFormulaSummaryWithPrescribedPathAnalysis(state, 0.5, {
    solveCircularTransmitterRootsHitsLedger: bridge.solveCircularTransmitterRootsHitsLedger,
    polarizationSampleCount: 6,
    analyzerSampleCount: 3,
  });

  assert.equal(summary.analysisId, "prescribed-path-analysis");
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

test("analyzer common-period fraction uses a ratio of accumulated energies", () => {
  const phases = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];
  const yAnalyzerFields = phases.map((phase) => {
    const ey = Math.cos(phase);
    const ez = 0.5 * Math.sin(phase);
    return {
      electric: { y: ey, z: ez },
      analyzer: { projection: ey },
    };
  });
  const zAnalyzerFields = phases.map((phase) => {
    const ey = Math.cos(phase);
    const ez = 0.5 * Math.sin(phase);
    return {
      electric: { y: ey, z: ez },
      analyzer: { projection: ez },
    };
  });

  assertNear(computePhotonEnergyWeightedAnalyzerFraction(yAnalyzerFields), 0.8, 1e-12);
  assertNear(computePhotonEnergyWeightedAnalyzerFraction(zAnalyzerFields), 0.2, 1e-12);
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

test("derived prescribed-path-analysis polarization trace uses the fitted current field", async () => {
  const state = createDefaultPhotonState();
  state.polarization.analyzerAngleDeg = 17;
  const bridge = createPhotonCircularTransmitterBridgeStub();
  const trace = await buildPhotonDerivedPolarizationTraceWithPrescribedPathAnalysis(state, 0.5, 6, {
    solveCircularTransmitterRootsHitsLedger: bridge.solveCircularTransmitterRootsHitsLedger,
    minimumPolarizationSampleCount: 6,
  });

  assert.equal(trace.analysisId, "prescribed-path-analysis");
  assert.equal(trace.rawSamples.length, 6);
  assert.ok(trace.traceSampleCount >= 72);
  assert.ok(trace.samples.length > trace.rawSamples.length * 10);
  assert.ok(["weak", "linear", "right_circular", "left_circular", "elliptical"].includes(
    trace.classification
  ));
  assertNear(trace.current.ey, trace.fittedCurrent.ey, 1e-12);
  assertNear(trace.current.ez, trace.fittedCurrent.ez, 1e-12);
});

test("derived prescribed-path-analysis polarization inset trace is centered on the oscillating component", async () => {
  const state = createDefaultPhotonState();
  const bridge = createPhotonCircularTransmitterBridgeStub();
  const trace = await buildPhotonDerivedPolarizationTraceWithPrescribedPathAnalysis(state, 0, 6, {
    solveCircularTransmitterRootsHitsLedger: bridge.solveCircularTransmitterRootsHitsLedger,
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

test("derived prescribed-path-analysis polarization ellipse fit stays stable while the current point advances", async () => {
  const state = createDefaultPhotonState();
  state.polarization.analyzerAngleDeg = 17;
  const bridge = createPhotonCircularTransmitterBridgeStub();
  const options = {
    solveCircularTransmitterRootsHitsLedger: bridge.solveCircularTransmitterRootsHitsLedger,
    minimumPolarizationSampleCount: 6,
  };
  const first = await buildPhotonDerivedPolarizationTraceWithPrescribedPathAnalysis(state, 0.5, 6, options);
  const second = await buildPhotonDerivedPolarizationTraceWithPrescribedPathAnalysis(state, 1.25, 6, options);

  assertNear(first.scale, second.scale, 1e-12);
  assertNear(first.amplitudes.y, second.amplitudes.y, 1e-12);
  assertNear(first.amplitudes.z, second.amplitudes.z, 1e-12);
  assertNear(first.samples[3].ey, second.samples[3].ey, 1e-12);
  assertNear(first.samples[3].ez, second.samples[3].ez, 1e-12);
  assert.notEqual(first.currentProgress.toFixed(6), second.currentProgress.toFixed(6));
});

test("polarization inset current vector follows display time between analysis snapshots", async () => {
  const state = createDefaultPhotonState();
  const bridge = createPhotonCircularTransmitterBridgeStub();
  const trace = await buildPhotonDerivedPolarizationTraceWithPrescribedPathAnalysis(state, 0.5, 6, {
    solveCircularTransmitterRootsHitsLedger: bridge.solveCircularTransmitterRootsHitsLedger,
    minimumPolarizationSampleCount: 6,
  });
  const snapshotTime = trace.fitCycleStart + trace.currentProgress * trace.cycleDuration;
  const snapshotCurrent = resolvePhotonPolarizationCurrentPoint(trace, snapshotTime);
  const advancedCurrent = resolvePhotonPolarizationCurrentPoint(
    trace,
    snapshotTime + trace.cycleDuration * 0.25
  );

  assertNear(snapshotCurrent.ey, trace.fittedCurrent.ey, 1e-12);
  assertNear(snapshotCurrent.ez, trace.fittedCurrent.ez, 1e-12);
  assert.ok(
    Math.hypot(
      advancedCurrent.ey - snapshotCurrent.ey,
      advancedCurrent.ez - snapshotCurrent.ez
    ) > trace.scale * 0.25
  );
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
