import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import {
  BORG_APP_SURFACE_DESIGN_V1,
  BORG_DATASET_MANIFEST_V1,
  validateBorgFixtureSnapshot,
} from "../src/apps/borg/BorgFixtureData.js";
import {
  BORG_DYNAMIC_NATIVE_RUN_SOURCE,
  BORG_DYNAMIC_NATIVE_RUNNER_VERSION,
  createBorgDynamicNativeRunner,
  createBorgFrameSetsFromRows,
  mergeBorgFrameRows,
} from "../src/apps/borg/BorgDynamicNativeRunner.js";

const MASTER_EQUATION_SOLVER_MODE = "native-fixed-parameter-master-equation";
const NEXT_MASTER_EQUATION_BURDEN = "build-native-wake-history-and-boundary-residual-fixture";
const ALLOWED_MASTER_EQUATION_PROBE_STATUS_CODES = new Set([
  "ok",
  "native_capability_missing",
  "native_solver_pending",
]);
const ALLOWED_NATIVE_MASTER_EQUATION_STATUSES = new Set([
  "native-fixed-parameter-master-equation",
  "native-fixture-capability-missing",
  "native-fixture-solver-pending",
]);
const ALLOWED_MASTER_EQUATION_FAILURE_CODES = new Set([
  "none",
  "native_master_equation_fixture_missing",
  "native_master_equation_solver_pending",
]);

test("Borg fixture is a native fixed-parameter master-equation run, not tuned visual pair dynamics", () => {
  validateBorgFixtureSnapshot({
    manifest: BORG_DATASET_MANIFEST_V1,
    surfaceDesign: BORG_APP_SURFACE_DESIGN_V1,
  });

  const manifest = BORG_DATASET_MANIFEST_V1;
  const source = manifest.sourceBridgeRun;

  assert.equal(source.executionPath, "native_c_abi");
  assert.equal(source.runKind, "masterEquation");
  assert.equal(source.solverMode, MASTER_EQUATION_SOLVER_MODE);
  assert.equal(source.motionLaw, "architrino-master-equation-v1");
  assert.equal(source.fixedPhysicalParameterSetId, "borg-fixed-physical-parameters.v1");
  assert.equal(source.fixedPhysicalParameterAuthority, "manifest-declared-fixed-parameter-contract");
  assert.equal(source.visualTuningStatus, "not-visual-tuned");
  assert.equal(source.visualBehaviorAuthority, "native-output-only");
  assert.equal(source.pairAccelerationScale, undefined);
  assert.equal(ALLOWED_NATIVE_MASTER_EQUATION_STATUSES.has(source.nativeMasterEquationStatus), true);
  assert.equal(ALLOWED_MASTER_EQUATION_PROBE_STATUS_CODES.has(source.nativeMasterEquationProbeStatusCode), true);
  assert.equal(
    ALLOWED_MASTER_EQUATION_FAILURE_CODES.has(source.nativeMasterEquationProbeFirstFailureCode),
    true,
  );
  assert.equal(source.masterEquationFallbackDecision, "native-master-equation-selected");
  assert.equal(source.canonicalEomEvidence, true);
  assert.equal(source.eomEvidenceStatus, "native_master_equation_fixed_parameter_evidence");
  assert.equal(source.nextSolverBurden, NEXT_MASTER_EQUATION_BURDEN);

  const probe = manifest.nativeMasterEquationProbe;
  assert.equal(probe.runKind, "masterEquation");
  assert.equal(ALLOWED_MASTER_EQUATION_PROBE_STATUS_CODES.has(probe.statusCode), true);
  assert.equal(["native_c_abi", "native_c_abi_missing", "native_c_abi_pending"].includes(probe.executionPath), true);
  assert.equal(ALLOWED_MASTER_EQUATION_FAILURE_CODES.has(probe.firstFailureCode), true);
  assert.equal(probe.requiredNativeExport, "architrino_solver_integrate_master_equation_motion_f64");
  assert.equal(probe.fallbackDecision, "native-master-equation-selected");
  assert.equal(probe.fallbackRunKind, null);
  assert.equal(probe.valueAuthority, "authoritative-solver-output");
});

test("Borg native master-equation frame data carries non-linear path evidence", () => {
  const maxDeviation = maxNativeFrameDeviationFromPathLine(BORG_DATASET_MANIFEST_V1.currentStateFrames);
  assert.ok(
    maxDeviation > 1,
    `native fixed-parameter master-equation paths must show solver-owned curvature; max deviation ${maxDeviation}`,
  );
});

test("Borg path-history renderer uses native row segments, not visual smoothing curves", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/borg/BorgAppRuntime.js", import.meta.url),
    "utf8",
  );
  const htmlSource = readFileSync(new URL("../borg.html", import.meta.url), "utf8");

  assert.match(runtimeSource, /new THREE\.LineSegments/);
  assert.match(runtimeSource, /createPathSegmentGeometry/);
  assert.doesNotMatch(runtimeSource, /CatmullRomCurve3/);
  assert.doesNotMatch(runtimeSource, /TubeGeometry/);
  assert.match(runtimeSource, /PLAYBACK_SPEED_PRESETS/);
  assert.doesNotMatch(runtimeSource, /PLAYBACK_MS_PER_NATIVE_STEP/);
  assert.match(runtimeSource, /RUN_CONTROL_PRESETS/);
  assert.match(runtimeSource, /borg-live-run-budget\.v1/);
  assert.match(runtimeSource, /BorgMeasuredRunPresets\.js/);
  assert.match(runtimeSource, /measuredRunPresetCalibration/);
  assert.match(runtimeSource, /updateMeasuredRunPresetCalibration/);
  assert.match(runtimeSource, /effectiveTargetDuration/);
  assert.match(runtimeSource, /readLiveRunBudgetSnapshot/);
  assert.match(runtimeSource, /createSeededDistributionFrameRows/);
  assert.equal(runtimeSource.includes("Live 3000 / 20"), true);
  assert.match(runtimeSource, /switchRunControlPreset/);
  assert.match(runtimeSource, /startNewDistributionRun/);
  assert.match(runtimeSource, /createBorgDynamicNativeRunner/);
  assert.match(runtimeSource, /BorgSolverBridgeWorker\.js/);
  assert.match(runtimeSource, /mergeBorgFrameRows/);
  assert.doesNotMatch(htmlSource, /M9\.8 6\.2a6\.8/);
  assert.match(htmlSource, /id="borg-start-frame-button"/);
  assert.match(htmlSource, /id="borg-new-distribution-button"/);
  assert.match(htmlSource, /id="borg-run-source"/);
  assert.match(htmlSource, /id="borg-playback-speed"/);
});

test("Borg dynamic native runner builds first-class live master-equation chunks", async () => {
  const requests = [];
  const solverClient = {
    async runSimulation(request) {
      requests.push(request);
      return createFakeBorgDynamicRunResponse(request);
    },
    async dispose() {},
  };
  const runner = createBorgDynamicNativeRunner(BORG_DATASET_MANIFEST_V1, {
    solverClient,
    targetDuration: 0.6,
    chunkDuration: 0.4,
    sampleInterval: 0.2,
  });

  assert.equal(runner.schema, BORG_DYNAMIC_NATIVE_RUNNER_VERSION);
  assert.equal(runner.config.runSource, BORG_DYNAMIC_NATIVE_RUN_SOURCE);

  const firstChunk = await runner.computeNextChunk();
  assert.equal(requests[0].appId, "borg");
  assert.equal(requests[0].runKind, "masterEquation");
  assert.equal(requests[0].configVersion, BORG_DYNAMIC_NATIVE_RUNNER_VERSION);
  assert.equal(requests[0].config.appId, "borg");
  assert.equal(requests[0].config.fallbackPolicy, "fail-closed");
  assert.equal(requests[0].config.metadata.valueAuthority, "authoritative");
  assert.equal(requests[0].config.metadata.appBufferAuthority, "authoritative");
  assert.equal(requests[0].config.masterEquationRequest.initialStates.length, 16);
  assert.equal(requests[0].config.masterEquationRequest.startTime, 0);
  assert.equal(requests[0].config.masterEquationRequest.endTime, 0.4);
  assert.equal(firstChunk.source, BORG_DYNAMIC_NATIVE_RUN_SOURCE);
  assert.equal(firstChunk.bufferCount, 1);
  assert.equal(firstChunk.bufferByteLength, firstChunk.frames.length * 64);
  assert.deepEqual(uniqueFrameIndexes(firstChunk.frames), [0, 1, 2]);

  const secondChunk = await runner.computeNextChunk();
  assert.equal(requests[1].appId, "borg");
  assert.equal(requests[1].config.masterEquationRequest.startTime, 0.4);
  assert.equal(requests[1].config.masterEquationRequest.endTime, 0.6);
  const firstPathKey = firstChunk.frames[0].pathKey;
  assert.deepEqual(
    requests[1].config.masterEquationRequest.initialStates[0].initialPosition,
    lastFrameForPath(firstChunk.frames, firstPathKey).position,
  );
  assert.deepEqual(uniqueFrameIndexes(secondChunk.frames), [2, 3]);

  const mergedFrames = mergeBorgFrameRows(firstChunk.frames, secondChunk.frames);
  const frameSets = createBorgFrameSetsFromRows(mergedFrames);
  assert.deepEqual(frameSets.map((frameSet) => frameSet.frameIndex), [0, 1, 2, 3]);
  assert.equal(frameSets.at(-1).frames.length, 16);

  await runner.dispose();
});

test("Borg dynamic native runner applies measured target and chunk limits", async () => {
  const requests = [];
  const solverClient = {
    async runSimulation(request) {
      requests.push(request);
      return createFakeBorgDynamicRunResponse(request);
    },
    async dispose() {},
  };
  const runner = createBorgDynamicNativeRunner(BORG_DATASET_MANIFEST_V1, {
    solverClient,
    targetDuration: 1,
    chunkDuration: 0.4,
    sampleInterval: 0.2,
  });

  runner.setRunLimits({ targetDuration: 0.5, chunkDuration: 0.2 });
  assert.equal(runner.targetDuration, 0.5);
  assert.equal(runner.chunkDuration, 0.2);

  await runner.computeNextChunk();
  await runner.computeNextChunk();
  await runner.computeNextChunk();

  assert.deepEqual(
    requests.map((request) => request.config.masterEquationRequest.endTime),
    [0.2, 0.4, 0.5],
  );
  assert.equal(runner.canComputeNextChunk(), false);

  await runner.dispose();
});

test("Borg surface advertises wake-history and boundary residuals as the next build burden", () => {
  const surfaceDesign = BORG_APP_SURFACE_DESIGN_V1;
  assert.equal(surfaceDesign.sourceManifest.solverMode, MASTER_EQUATION_SOLVER_MODE);
  assert.equal(surfaceDesign.sourceManifest.visualTuningStatus, "not-visual-tuned");
  assert.equal(surfaceDesign.sourceManifest.visualBehaviorAuthority, "native-output-only");
  assert.equal(
    ALLOWED_NATIVE_MASTER_EQUATION_STATUSES.has(surfaceDesign.sourceManifest.nativeMasterEquationStatus),
    true,
  );
  assert.equal(
    ALLOWED_MASTER_EQUATION_PROBE_STATUS_CODES.has(
      surfaceDesign.sourceManifest.nativeMasterEquationProbe.statusCode,
    ),
    true,
  );
  assert.equal(
    surfaceDesign.sourceManifest.nativeMasterEquationProbe.fallbackDecision,
    "native-master-equation-selected",
  );
  assert.equal(surfaceDesign.sourceManifest.nextSolverBurden, NEXT_MASTER_EQUATION_BURDEN);
  assert.equal(surfaceDesign.nextBuildBurden, NEXT_MASTER_EQUATION_BURDEN);
  assert.equal(surfaceDesign.authorityMap.centralVolumeAcceleration, "fail-closed-value");

  const pathHistoryLayer = surfaceDesign.layerStrip.find((layer) => layer.layer === "path-history");
  assert.equal(pathHistoryLayer.displayTransform, "adjacent-native-row-line-segments");
  assert.equal(pathHistoryLayer.smoothingPolicy, "none");
});

function maxNativeFrameDeviationFromPathLine(frames) {
  const byPathKey = new Map();
  frames.forEach((frame) => {
    const pathFrames = byPathKey.get(frame.pathKey) ?? [];
    pathFrames.push(frame);
    byPathKey.set(frame.pathKey, pathFrames);
  });

  let maxDeviation = 0;
  byPathKey.forEach((pathFrames) => {
    pathFrames.sort((left, right) => left.time - right.time);
    const first = pathFrames[0];
    const last = pathFrames.at(-1);
    const duration = last.time - first.time;
    if (duration <= 0) {
      return;
    }
    const displacement = subtractVectors(last.position, first.position);
    pathFrames.forEach((frame) => {
      const progress = (frame.time - first.time) / duration;
      const expected = {
        x: first.position.x + displacement.x * progress,
        y: first.position.y + displacement.y * progress,
        z: first.position.z + displacement.z * progress,
      };
      maxDeviation = Math.max(maxDeviation, vectorDistance(frame.position, expected));
    });
  });
  return maxDeviation;
}

function createFakeBorgDynamicRunResponse(request) {
  const masterRequest = request.config.masterEquationRequest;
  const times = createSampleTimes(
    masterRequest.startTime,
    masterRequest.endTime,
    masterRequest.step,
  );
  const frames = [];
  times.forEach((time, frameIndex) => {
    masterRequest.initialStates.forEach((state) => {
      const elapsed = time - masterRequest.startTime;
      frames.push({
        pathKey: state.pathKey,
        frameIndex,
        time,
        position: {
          x: state.initialPosition.x + state.initialVelocity.x * elapsed,
          y: state.initialPosition.y + state.initialVelocity.y * elapsed,
          z: state.initialPosition.z + state.initialVelocity.z * elapsed,
        },
        velocity: { ...state.initialVelocity },
        errorBound: 0,
        stateFlags: state.stateFlags,
      });
    });
  });
  return {
    requestId: request.requestId,
    runId: request.runId,
    datasetId: request.datasetId,
    acceptedPrecisionPath: "scaled_f64_strict",
    status: { code: "ok", severity: "ok" },
    response: {
      runId: request.runId,
      datasetId: request.datasetId,
      status: { code: "ok", severity: "ok" },
      summary: {
        frameCount: frames.length,
        pathRowCount: Math.max(0, times.length - 1) * masterRequest.initialStates.length,
        executionPath: "native_c_abi",
        nativeMasterEquationStatus: "native-fixed-parameter-master-equation",
        firstFailureCode: "none",
      },
      frames,
      buffers: [
        {
          bufferId: `${request.datasetId}:frames`,
          layout: "borg-frame-row.v1",
          rowCount: frames.length,
          rowSizeBytes: 64,
          byteLength: frames.length * 64,
          buffer: new ArrayBuffer(frames.length * 64),
        },
      ],
      pathHistory: {
        streamId: request.config.streamId,
        rowCount: Math.max(0, times.length - 1) * masterRequest.initialStates.length,
      },
      diagnostics: [],
      streams: [],
      masterEquation: {
        runKind: "masterEquation",
        executionPath: "native_c_abi",
        nativeMasterEquationStatus: "native-fixed-parameter-master-equation",
        firstFailureCode: "none",
      },
    },
  };
}

function createSampleTimes(startTime, endTime, step) {
  const times = [];
  for (let time = startTime; time <= endTime + step * 0.5; time += step) {
    times.push(Number(Math.min(time, endTime).toFixed(12)));
  }
  if (times.at(-1) !== endTime) {
    times.push(endTime);
  }
  return times;
}

function uniqueFrameIndexes(frames) {
  return [...new Set(frames.map((frame) => frame.frameIndex))];
}

function lastFrameForPath(frames, pathKey) {
  return frames
    .filter((frame) => frame.pathKey === pathKey)
    .sort((left, right) => left.time - right.time)
    .at(-1);
}

function subtractVectors(left, right) {
  return {
    x: left.x - right.x,
    y: left.y - right.y,
    z: left.z - right.z,
  };
}

function vectorDistance(left, right) {
  return Math.hypot(left.x - right.x, left.y - right.y, left.z - right.z);
}
