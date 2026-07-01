#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
  SOLVER_APP_BRIDGE_API_VERSION,
  createSolverAppBridgeClient,
} from "../../src/solver/app/SolverAppBridge.mjs";
import { createSolverRunRequest } from "../../src/solver/app/SolverAppAdapters.mjs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(SCRIPT_DIR, "../..");
const WASM_DIR = path.join(ROOT_DIR, ".tmp", "solver-build", "wasm");
const WASM_LOADER_PATH = path.join(WASM_DIR, "architrino_solver_wasm_smoke.mjs");

const FIXTURE_IDS = Object.freeze({
  manifestId: "borg-first-native-backed-fixture-manifest",
  runId: "borg-first-native-backed-fixture",
  nativeRunId: "borg-first-native-backed-fixture-native-run",
  nativeDatasetId: "borg-first-native-backed-fixture-native-dataset",
  requestId: "borg-first-native-backed-fixture-request",
  pathHistoryStreamId: "borg-first-native-backed-fixture:path-history",
});

const SIMULATION_ENVELOPE = Object.freeze({
  sideLength: 100,
  centralVolumeSideLength: 80,
  faceBufferMargin: 10,
  duration: 300,
  sampleInterval: 0.2,
  historyDepth: 10,
  fieldSpeed: 3,
  centralObservationInterval: 300,
  centralBoundaryTolerance: 1e-3,
});

const POPULATION = Object.freeze({
  centralArchitrinoCount: 8,
});

const LONG_FIXTURE_PROFILE = Object.freeze({
  fixtureProfileId: "borg-first-native-default-motion-fixture.v1",
  playbackFrameSource: "native-keyframes",
  interpolationAuthority: "display-only-between-native-keyframes",
  expectedNativeKeyframeRange: [1501, 1501],
  rowsPerChunk: 16,
});

const DEFAULT_MOTION_SETTINGS = Object.freeze({
  runKind: "motionSimulation",
  solverMode: "native-fixed-parameter-default-motion",
  motionLaw: "fixed_parameter_inertial_motion_v1",
  fixedPhysicalParameterSetId: "borg-fixed-physical-parameters.v1",
  fixedPhysicalParameterAuthority: "manifest-declared-fixed-parameter-contract",
  initialLinePolicy: "seeded-random-interior-cube",
  acceleration: Object.freeze({ x: 0, y: 0, z: 0 }),
  accelerationPolicy: "fixed-zero-acceleration",
  visualTuningStatus: "not-visual-tuned",
  visualBehaviorAuthority: "native-output-only",
  integrationTolerance: 1e-11,
  integrationMethod: 1,
  nativeMasterEquationStatus: "native-fixture-capability-missing",
  masterEquationRunKind: "masterEquation",
  masterEquationVersion: "master-equation-fixed-parameter-v1",
  masterEquationForceLawVersion: "architrino-master-equation-v1",
  masterEquationRequiredNativeExport: "architrino_solver_integrate_master_equation_motion_f64",
  masterEquationFallbackDecision: "default-motion-baseline-selected",
  canonicalEomEvidence: false,
  eomEvidenceStatus: "default_motion_no_master_equation_interaction",
  eomEvidenceReason:
    "Native motionSimulation integrates fixed-parameter inertial paths; many-body master-equation acceleration is not emitted by this fixture.",
  nextSolverBurden: "build-native-master-equation-fixed-parameter-fixture",
});

const INITIAL_STATE_COUNT = 16;
const ELECTRINO_COUNT = 8;
const POSITRINO_COUNT = 8;
const INITIAL_CONDITION_SEED = "borg-sixteen-random-interior-position-seed.v1";
const VELOCITY_SEED = "borg-sixteen-random-small-3d-velocity-seed.v1";
const INTERIOR_RANDOM_LAYOUT = Object.freeze({
  minCoordinate: 13.5,
  maxCoordinate: 86.5,
  minSeparation: 10.5,
});
const RANDOM_VELOCITY = Object.freeze({
  maxComponentMagnitude: 0.042,
  minSpeed: 0.0144,
  velocityBoundScaleFromV1: 1.2,
});

export async function buildBorgFirstNativeBackedFixture() {
  const native = await runNativeDefaultMotionFixture();
  const manifest = createBorgDatasetManifest(native);
  assertBorgFixtureManifest(manifest, native);
  return { manifest, native };
}

export function assertBorgFixtureManifest(manifest, native) {
  assertEqual(manifest.schema, "borg-dataset-manifest.v1", "manifest schema");
  assertEqual(manifest.manifestId, FIXTURE_IDS.manifestId, "manifest id");
  assertEqual(manifest.runId, FIXTURE_IDS.runId, "manifest run id");
  assertEqual(manifest.nativeSolverStatus, "native-backed-now", "native solver status");
  assertEqual(manifest.claimLevel, "developer-test", "claim level");
  assertEqual(manifest.sourceBridgeRun.executionPath, "native_c_abi", "native execution path");
  assertEqual(manifest.sourceBridgeRun.frameCount, native.run.response.summary.frameCount, "frame count");
  assertEqual(manifest.currentStateFrames.length, native.run.response.summary.frameCount, "current state frame rows");
  assertEqual(manifest.sourceBridgeRun.pathRowCount, native.run.response.pathHistory.rowCount, "path row count");
  assert(
    manifest.pathHistory.pathHistoryStreamIds.includes(FIXTURE_IDS.pathHistoryStreamId),
    "path-history stream id is bound into the Borg manifest",
  );
  assertEqual(manifest.pathHistory.pathHistoryGapRows.length, 0, "path-history gap rows");
  assertEqual(manifest.sourceBridgeRun.fixtureProfileId, LONG_FIXTURE_PROFILE.fixtureProfileId, "fixture profile");
  assertEqual(manifest.simulationEnvelope.duration, SIMULATION_ENVELOPE.duration, "fixture duration");
  assertEqual(manifest.simulationEnvelope.sampleInterval, SIMULATION_ENVELOPE.sampleInterval, "fixture sample interval");
  assert(
    manifest.currentStateAndFrameSources.nativeKeyframeCount >=
      LONG_FIXTURE_PROFILE.expectedNativeKeyframeRange[0] &&
      manifest.currentStateAndFrameSources.nativeKeyframeCount <=
        LONG_FIXTURE_PROFILE.expectedNativeKeyframeRange[1],
    "long fixture emits the expected native keyframe range",
  );
  assertEqual(
    manifest.currentStateAndFrameSources.playbackFrameSource,
    LONG_FIXTURE_PROFILE.playbackFrameSource,
    "playback frame source",
  );
  assertEqual(
    manifest.initialConditions.initialLinePolicy,
    DEFAULT_MOTION_SETTINGS.initialLinePolicy,
    "initial line policy",
  );
  assertEqual(
    manifest.sourceBridgeRun.motionLaw,
    DEFAULT_MOTION_SETTINGS.motionLaw,
    "motion law",
  );
  assertEqual(
    manifest.sourceBridgeRun.solverMode,
    DEFAULT_MOTION_SETTINGS.solverMode,
    "solver mode",
  );
  assertEqual(
    manifest.sourceBridgeRun.fixedPhysicalParameterSetId,
    DEFAULT_MOTION_SETTINGS.fixedPhysicalParameterSetId,
    "fixed physical parameter set id",
  );
  assertEqual(
    manifest.sourceBridgeRun.fixedPhysicalParameterAuthority,
    DEFAULT_MOTION_SETTINGS.fixedPhysicalParameterAuthority,
    "fixed physical parameter authority",
  );
  assertEqual(
    manifest.sourceBridgeRun.visualTuningStatus,
    DEFAULT_MOTION_SETTINGS.visualTuningStatus,
    "visual tuning status",
  );
  assertEqual(
    manifest.sourceBridgeRun.visualBehaviorAuthority,
    DEFAULT_MOTION_SETTINGS.visualBehaviorAuthority,
    "visual behavior authority",
  );
  assertEqual(
    manifest.sourceBridgeRun.nativeMasterEquationStatus,
    DEFAULT_MOTION_SETTINGS.nativeMasterEquationStatus,
    "native master-equation status",
  );
  assertEqual(
    manifest.sourceBridgeRun.nextSolverBurden,
    DEFAULT_MOTION_SETTINGS.nextSolverBurden,
    "next solver burden",
  );
  assertEqual(
    manifest.nativeMasterEquationProbe.statusCode,
    "native_capability_missing",
    "native master-equation probe status",
  );
  assertEqual(
    manifest.nativeMasterEquationProbe.fallbackDecision,
    DEFAULT_MOTION_SETTINGS.masterEquationFallbackDecision,
    "native master-equation fallback decision",
  );
  assertEqual(
    manifest.nativeMasterEquationProbe.requiredNativeExport,
    DEFAULT_MOTION_SETTINGS.masterEquationRequiredNativeExport,
    "native master-equation required export",
  );
  assertEqual(manifest.initialConditions.initialConditionSeed, INITIAL_CONDITION_SEED, "initial-condition seed");
  assertEqual(manifest.initialConditions.velocityPolicy, "seeded-random-small-3d", "velocity policy");
  assertEqual(manifest.initialConditions.velocitySeed, VELOCITY_SEED, "velocity seed");
  assertEqual(
    manifest.initialConditions.randomVelocityMaxComponentMagnitude,
    RANDOM_VELOCITY.maxComponentMagnitude,
    "random velocity max component magnitude",
  );
  assertEqual(
    manifest.initialConditions.randomVelocityMinSpeed,
    RANDOM_VELOCITY.minSpeed,
    "random velocity min speed",
  );
  assertEqual(
    manifest.initialConditions.velocityBoundScaleFromV1,
    RANDOM_VELOCITY.velocityBoundScaleFromV1,
    "random velocity bound scale",
  );
  assertEqual(manifest.currentStateAndFrameSources.interpolatedFrameCount, 0, "interpolated frame count");
  assertEqual(manifest.population.centralArchitrinoCount, 8, "central count");
  assertEqual(manifest.population.architrinoCount, INITIAL_STATE_COUNT, "outer computed count");
  assertEqual(manifest.population.bufferArchitrinoCount, 8, "buffer count");
  assertEqual(manifest.sourceBridgeRun.pathCount, INITIAL_STATE_COUNT, "native path count");
  assertEqual(manifest.initialConditions.electrinoCount, ELECTRINO_COUNT, "electrino count");
  assertEqual(manifest.initialConditions.positrinoCount, POSITRINO_COUNT, "positrino count");
  assertEqual(
    manifest.initialConditions.polaritySignConvention,
    "positrino-positive-electrino-negative",
    "polarity sign convention",
  );
  assertEqual(manifest.initialConditions.positrinoCharge, 1, "positrino charge");
  assertEqual(manifest.initialConditions.electrinoCharge, -1, "electrino charge");
  assertEqual(manifest.boundaryToCentralResidual.status, "not-measured", "boundary residual status");
  assertEqual(
    manifest.boundaryToCentralResidual.boundaryReplayDecisionStatus,
    "fail-closed-missing-contract",
    "boundary replay decision status",
  );
  assertEqual(manifest.faceBoundary.benignNoiseStatus, "fail-closed-missing-contract", "benign noise status");
  assert(
    manifest.faceBoundary.faceBoundaryGapRows.some((row) => row.firstFailureCode === "missing_face_crossing_coverage"),
    "face-boundary gap rows include missing face crossing coverage",
  );
  assert(
    manifest.faceBoundary.faceInfluenceModelGapRows.some((row) => row.firstFailureCode === "face_influence_model_missing"),
    "face influence model gap row is present",
  );
  assert(
    manifest.faceBoundary.sixFaceBoundaryNoisePolicyGapRows.some(
      (row) => row.firstFailureCode === "six_face_boundary_policy_missing",
    ),
    "six-face boundary policy gap row is present",
  );
  assert(
    manifest.faceBoundary.velocitySamplingGapRows.some(
      (row) => row.firstFailureCode === "velocity_sampling_protocol_missing",
    ),
    "velocity sampling gap row is present",
  );
  assertEqual(manifest.renderManifests[0].renderPixelSize, "3840x2160", "4K UHD render pixel size");
  assertEqual(
    manifest.validation.nativePathBoundsFaceCrossingStatus,
    "path-bounds-stay-inside-outer-cube-long-fixture",
    "native path bounds status",
  );
}

async function runNativeDefaultMotionFixture() {
  if (!fs.existsSync(WASM_LOADER_PATH)) {
    throw new Error(
      `Missing native solver WASM loader at ${path.relative(ROOT_DIR, WASM_LOADER_PATH)}. ` +
        "Build the local solver WASM target before running the Borg native fixture.",
    );
  }

  const { default: createWasmModule } = await import(pathToFileURL(WASM_LOADER_PATH).href);
  const client = createSolverAppBridgeClient({
    createWasmModule,
    locateFile: (fileName) => path.join(WASM_DIR, fileName),
  });

  const init = await client.init({
    appId: "causal-delay-feedback",
    apiVersion: SOLVER_APP_BRIDGE_API_VERSION,
    requestedCapabilities: ["masterEquation", "motionSimulation", "pathHistory"],
    storagePolicy: {
      target: "caller-buffer",
      durable: false,
      maxBytes: 64 * 1024 * 1024,
    },
    threadingPolicy: {
      mode: "single-thread",
      deterministic: true,
    },
  });

  assertEqual(init.status.code, "ok", "solver bridge init status");

  const initialStates = createSixteenInitialStates();
  const masterEquationProbeRequest = createNativeMasterEquationProbeRequest(initialStates);
  const masterEquationProbe = await client.runSimulation(masterEquationProbeRequest);
  assertEqual(
    masterEquationProbe.response.status.code,
    "native_capability_missing",
    "native master-equation probe status",
  );

  const requests = initialStates.map((initialState) =>
    createNativeDefaultMotionRunRequest(initialState),
  );
  const runs = [];
  for (const request of requests) {
    const run = await client.runSimulation(request);
    assertEqual(run.status.code, "ok", `native motion run status ${request.runId}`);
    assert(run.response.frames.length > 0, `native motion run emitted frame rows ${request.runId}`);
    assert(run.response.pathHistory?.rowCount > 0, `native motion run emitted path-history rows ${request.runId}`);
    runs.push(run);
  }

  return {
    init,
    masterEquationProbeRequest,
    masterEquationProbe,
    requests,
    runs,
    run: combineNativeDefaultMotionRuns(runs, { masterEquationProbe }),
  };
}

function createBorgDatasetManifest(native) {
  const nativeResponse = native.run.response;
  const defaultMotionSummary = nativeResponse.defaultMotion;
  const pathHistory = nativeResponse.pathHistory;
  const stream = nativeResponse.streams.find((entry) => entry.streamId === FIXTURE_IDS.pathHistoryStreamId);
  const wakeHorizon = SIMULATION_ENVELOPE.fieldSpeed * SIMULATION_ENVELOPE.historyDepth;
  const centralVelocityBound = maxFrameSpeed(nativeResponse.frames);
  const nativeKeyframeCount = countNativeKeyframes(nativeResponse.frames);
  const centralVolumeMin = SIMULATION_ENVELOPE.faceBufferMargin;
  const centralVolumeMax = SIMULATION_ENVELOPE.sideLength - SIMULATION_ENVELOPE.faceBufferMargin;
  const centralVolumeCenter = SIMULATION_ENVELOPE.sideLength / 2;
  const strictBufferLimit = Math.max(
    wakeHorizon,
    centralVelocityBound * SIMULATION_ENVELOPE.centralObservationInterval,
  );
  const strictCentralBufferStatus =
    SIMULATION_ENVELOPE.faceBufferMargin >= strictBufferLimit ? "passed" : "failed";
  const architrinoCount = deriveOuterArchitrinoCount({
    centralArchitrinoCount: POPULATION.centralArchitrinoCount,
    centralVolumeSideLength: SIMULATION_ENVELOPE.centralVolumeSideLength,
    faceBufferMargin: SIMULATION_ENVELOPE.faceBufferMargin,
  });
  const pathBounds = summarizePathBounds(stream, SIMULATION_ENVELOPE.sideLength);
  const firstFailureCode = "required_residual_unmeasured";

  return {
    schema: "borg-dataset-manifest.v1",
    manifestId: FIXTURE_IDS.manifestId,
    runId: FIXTURE_IDS.runId,
    modelContractId: "aaa.central-solver/borg-first-native-backed-fixture.v1",
    nativeSolverStatus: "native-backed-now",
    nativeSolverVersion: "local-wasm:architrino_solver_wasm_smoke",
    bridgeSchemaVersion: SOLVER_APP_BRIDGE_API_VERSION,
    claimLevel: "developer-test",
    firstFailureCode,
    sourceBridgeRun: {
      appId: "causal-delay-feedback",
      runKind: DEFAULT_MOTION_SETTINGS.runKind,
      nativeRunId: native.run.runId,
      nativeDatasetId: native.run.datasetId,
      requestId: native.run.requestId,
      fixtureProfileId: LONG_FIXTURE_PROFILE.fixtureProfileId,
      acceptedPrecisionPath: native.run.acceptedPrecisionPath,
      executionPath: defaultMotionSummary.executionPath,
      statusCode: native.run.status.code,
      frameCount: nativeResponse.summary.frameCount,
      nativeKeyframeCount,
      sampleInterval: SIMULATION_ENVELOPE.sampleInterval,
      playbackFrameSource: LONG_FIXTURE_PROFILE.playbackFrameSource,
      interpolationAuthority: LONG_FIXTURE_PROFILE.interpolationAuthority,
      solverMode: DEFAULT_MOTION_SETTINGS.solverMode,
      motionLaw: DEFAULT_MOTION_SETTINGS.motionLaw,
      fixedPhysicalParameterSetId: DEFAULT_MOTION_SETTINGS.fixedPhysicalParameterSetId,
      fixedPhysicalParameterAuthority: DEFAULT_MOTION_SETTINGS.fixedPhysicalParameterAuthority,
      fixedPhysicalParameters: createFixedPhysicalParameterSummary(),
      accelerationPolicy: DEFAULT_MOTION_SETTINGS.accelerationPolicy,
      acceleration: DEFAULT_MOTION_SETTINGS.acceleration,
      visualTuningStatus: DEFAULT_MOTION_SETTINGS.visualTuningStatus,
      visualBehaviorAuthority: DEFAULT_MOTION_SETTINGS.visualBehaviorAuthority,
      pathCount: nativeResponse.summary.pathCount,
      pathRowCount: pathHistory.rowCount,
      chunkCount: pathHistory.chunkCount,
      pathHistoryStreamId: pathHistory.streamId,
      nativeMasterEquationStatus: DEFAULT_MOTION_SETTINGS.nativeMasterEquationStatus,
      nativeMasterEquationProbeStatusCode: native.masterEquationProbe.response.status.code,
      nativeMasterEquationProbeRunId: native.masterEquationProbe.runId,
      nativeMasterEquationProbeExecutionPath:
        native.masterEquationProbe.response.summary.executionPath,
      nativeMasterEquationProbeFirstFailureCode:
        native.masterEquationProbe.response.summary.firstFailureCode,
      nativeMasterEquationRequiredNativeExport:
        DEFAULT_MOTION_SETTINGS.masterEquationRequiredNativeExport,
      masterEquationFallbackDecision: DEFAULT_MOTION_SETTINGS.masterEquationFallbackDecision,
      canonicalEomEvidence: defaultMotionSummary.canonicalEomEvidence,
      eomEvidenceStatus: defaultMotionSummary.eomEvidenceStatus,
      eomEvidenceReason: defaultMotionSummary.eomEvidenceReason,
      nextSolverBurden: DEFAULT_MOTION_SETTINGS.nextSolverBurden,
      valueAuthority: "authoritative-solver-output",
    },
    nativeMasterEquationProbe: createNativeMasterEquationProbeSummary(native.masterEquationProbe),
    simulationEnvelope: {
      sideLength: SIMULATION_ENVELOPE.sideLength,
      centralVolume: {
        kind: "cube",
        center: {
          x: centralVolumeCenter,
          y: centralVolumeCenter,
          z: centralVolumeCenter,
        },
        bounds: {
          x: [centralVolumeMin, centralVolumeMax],
          y: [centralVolumeMin, centralVolumeMax],
          z: [centralVolumeMin, centralVolumeMax],
        },
        coordinateChart: "outer-cube-cartesian",
      },
      centralVolumeSideLength: SIMULATION_ENVELOPE.centralVolumeSideLength,
      faceBufferMargin: SIMULATION_ENVELOPE.faceBufferMargin,
      scaleFactor: 1,
      boundaryMode: "statistical-face-boundary",
      timeStepPolicy: "fixed",
      duration: SIMULATION_ENVELOPE.duration,
      sampleInterval: SIMULATION_ENVELOPE.sampleInterval,
      historyDepth: SIMULATION_ENVELOPE.historyDepth,
      fieldSpeed: SIMULATION_ENVELOPE.fieldSpeed,
      wakeHorizon,
      wakeFloor: null,
      aggregationBins: [],
      centralVelocityBound,
      centralObservationInterval: SIMULATION_ENVELOPE.centralObservationInterval,
      centralBoundaryTolerance: SIMULATION_ENVELOPE.centralBoundaryTolerance,
      strictCentralBufferStatus,
    },
    population: {
      centralArchitrinoCount: POPULATION.centralArchitrinoCount,
      architrinoCount,
      bufferArchitrinoCount: architrinoCount - POPULATION.centralArchitrinoCount,
      centralNumberDensity:
        POPULATION.centralArchitrinoCount / SIMULATION_ENVELOPE.centralVolumeSideLength ** 3,
      countDerivation: {
        formulaId: "N_calc=ceil(N_C*(1+2*b_face/L_C)^3)",
        centralArchitrinoCount: POPULATION.centralArchitrinoCount,
        centralVolumeSideLength: SIMULATION_ENVELOPE.centralVolumeSideLength,
        faceBufferMargin: SIMULATION_ENVELOPE.faceBufferMargin,
        exactPreCeiling:
          POPULATION.centralArchitrinoCount *
          (1 + (2 * SIMULATION_ENVELOPE.faceBufferMargin) / SIMULATION_ENVELOPE.centralVolumeSideLength) ** 3,
        roundedValue: architrinoCount,
      },
    },
    initialConditions: {
      initialConditionFamily: "seeded-random",
      initialConditionSeed: INITIAL_CONDITION_SEED,
      electrinoCount: ELECTRINO_COUNT,
      positrinoCount: POSITRINO_COUNT,
      polarityAssignmentSource: "seeded-balanced",
      polaritySignConvention: "positrino-positive-electrino-negative",
      positrinoCharge: 1,
      electrinoCharge: -1,
      velocityPolicy: "seeded-random-small-3d",
      initialLinePolicy: DEFAULT_MOTION_SETTINGS.initialLinePolicy,
      velocitySeed: VELOCITY_SEED,
      randomVelocityMaxComponentMagnitude: RANDOM_VELOCITY.maxComponentMagnitude,
      randomVelocityMinSpeed: RANDOM_VELOCITY.minSpeed,
      velocityBoundScaleFromV1: RANDOM_VELOCITY.velocityBoundScaleFromV1,
      resolvedInitialStateId: `${FIXTURE_IDS.nativeRunId}:seeded-random-sixteen-initial-state`,
      customEditStatus: "accepted",
      integrationWeightAuthority: "legacy-bridge-numeric-weight-only",
    },
    currentStateFrames: nativeResponse.frames.map(normalizeCurrentStateFrame),
    currentStateAndFrameSources: {
      currentStateFrameIds: nativeResponse.buffers
        .filter((buffer) => buffer.layout === "frame_buffer.v1")
        .map((buffer) => buffer.bufferId),
      checkpointIds: [],
      frameBufferIds: nativeResponse.buffers
        .filter((buffer) => buffer.layout === "frame_buffer.v1")
        .map((buffer) => buffer.bufferId),
      trajectoryFrameIds: nativeResponse.frames.map(
        (frame) => `${FIXTURE_IDS.nativeRunId}:frame:${frame.pathKey}:${frame.frameIndex}`,
      ),
      frameCount: nativeResponse.frames.length,
      nativeKeyframeCount,
      sampleInterval: SIMULATION_ENVELOPE.sampleInterval,
      playbackFrameSource: LONG_FIXTURE_PROFILE.playbackFrameSource,
      interpolationAuthority: LONG_FIXTURE_PROFILE.interpolationAuthority,
      interpolatedFrameCount: 0,
      projectionStatus: "authoritative-solver-output",
    },
    pathHistory: {
      pathHistoryStreamIds: [pathHistory.streamId],
      activePathWindowId: `${pathHistory.streamId}:active-window`,
      pathSpillManifestIds: [pathHistory.streamId],
      pathReplayIndexIds: [`${pathHistory.streamId}:${stream.indexLayout}`],
      pathHistoryGapRows: [],
      streamSummary: {
        schema: pathHistory.schema,
        rowCount: pathHistory.rowCount,
        chunkCount: pathHistory.chunkCount,
        pathCount: pathHistory.pathCount,
        byteLength: pathHistory.byteLength,
        timeRange: pathHistory.timeRange,
        frameRange: pathHistory.frameRange,
        valueAuthority: "authoritative-solver-output",
      },
    },
    wakeHistory: {
      resolvedWakeRowIds: [],
      backgroundNoiseRowIds: [],
      boundaryGeneratedWakeRowIds: [],
      failureWakeRowIds: ["borg-gap:wake-history-native-row-output-missing"],
      wakeHistoryGapRows: [
        createGapRow({
          gapRowId: "borg-gap:wake-history-native-row-output-missing",
          firstFailureCode: "wake_history_gap_unclassified",
          affectedConsumers: ["wake-streams", "receiver-acceleration", "central-volume-diagnostics"],
          message: "Native retained wake-history rows are not emitted by the current bridge product.",
        }),
      ],
      rowConservationCounts: {
        candidateWakeRowCount: null,
        resolvedWakeRowCount: 0,
        aggregatedWakeRowCount: 0,
        boundaryGeneratedWakeRowCount: 0,
        failureWakeRowCount: 1,
        conservationResidual: null,
        firstFailureCode: "wake_history_gap_unclassified",
      },
      rowConservationStatus: "not-measured",
    },
    faceBoundary: {
      outboundArchitrinoFaceEventStreamIds: [],
      outboundWakeFaceEventStreamIds: [],
      faceSummarySetIds: [],
      faceSummaryIds: [],
      faceReplaySourceIds: [],
      sixFaceBoundaryNoisePolicyIds: [],
      faceCoverageStatus: "fail-closed",
      faceSourceMixtureIds: [],
      faceSourceMixtureStatus: "fail-closed",
      timeMapPolicyIds: [],
      timeMapSourceStatus: "fail-closed-synthetic-input",
      faceInputTraceabilityRowIds: [],
      faceInfluenceModelIds: [],
      faceInfluenceModelAuthority: "missing-model",
      faceInfluenceModelMappingStatus: "fail-closed",
      faceProjectionCacheIds: [],
      faceProjectionCacheStatus: "absent",
      velocityScaleRange: {
        minPositiveSpeed: null,
        maxSpeed: centralVelocityBound,
        zeroBucket: "not-measured",
        units: "solver-si",
        chart: "not-measured",
      },
      velocitySamplingProtocolIds: [],
      velocitySamplingResultIds: [],
      velocitySamplingPolicyIds: [],
      velocitySamplingSelectedPolicyId: null,
      velocitySamplingResearchStatus: "research-open",
      velocitySamplingHoldoutStatus: "not-measured",
      velocitySamplingResidualSummary: null,
      velocitySamplingErrorBudgetIds: [],
      inboundReplayRowIds: [],
      faceReplayValidationResultIds: [],
      benignNoiseStatus: "fail-closed-missing-contract",
      retainedLocalEvidenceStatus: "path-history-native-backed-wake-history-missing",
      boundaryGeneratedEvidenceStatus: "fail-closed-missing-contract",
      pathBoundsFaceCrossing: pathBounds,
      faceBoundaryGapRows: [
        createGapRow({
          gapRowId: "borg-gap:face-crossing-coverage-missing",
          firstFailureCode: "missing_face_crossing_coverage",
          affectedConsumers: ["face-boundary-status", "face-summary-extraction"],
          message:
            "The long native fixture keeps the sixteen initial architrinos inside the outer cube; no native face-crossing event rows are emitted for boundary replay.",
        }),
      ],
      faceInfluenceModelGapRows: [
        createGapRow({
          gapRowId: "borg-gap:face-influence-model-missing",
          firstFailureCode: "face_influence_model_missing",
          affectedConsumers: ["face-replay-source", "six-face-boundary-noise-policy"],
          message: "No path-derived face influence model row is emitted for this native run.",
        }),
      ],
      sixFaceBoundaryNoisePolicyGapRows: [
        createGapRow({
          gapRowId: "borg-gap:six-face-boundary-policy-missing",
          firstFailureCode: "six_face_boundary_policy_missing",
          affectedConsumers: ["boundary-replay-decision", "benign-noise-status"],
          message: "No six-face boundary noise policy row is emitted for this native run.",
        }),
      ],
      velocitySamplingGapRows: [
        createGapRow({
          gapRowId: "borg-gap:velocity-sampling-protocol-missing",
          firstFailureCode: "velocity_sampling_protocol_missing",
          affectedConsumers: ["velocity-scale-sampling", "boundary-replay-decision"],
          message: "No measured velocity sampling protocol/result row is emitted for this native run.",
        }),
      ],
    },
    boundaryToCentralResidual: {
      boundaryToCentralResidualId: "borg-gap:boundary-to-central-residual-not-measured",
      residualLabel: "R_boundary->central",
      residualValue: null,
      tolerance: SIMULATION_ENVELOPE.centralBoundaryTolerance,
      comparisonWindowId: "borg-first-native-backed-fixture:central-volume-window",
      referenceRunId: null,
      boundaryRunId: FIXTURE_IDS.nativeRunId,
      status: "not-measured",
      firstFailureCode: "required_residual_unmeasured",
      boundaryReplayDecisionPolicyId: "borg-boundary-replay-decision-policy.v0",
      strictBufferStatus:
        strictCentralBufferStatus === "passed" ? "strict-buffer-pass" : "strict-buffer-failed",
      boundaryReplayDecisionStatus: "fail-closed-missing-contract",
      tauSelf: 5e-2,
      tauFace: 1e-2,
      tauCentral: SIMULATION_ENVELOPE.centralBoundaryTolerance,
      epsilon0: 1e-12,
      decisionNormId: "not-measured",
      displayOnlyReason: null,
      failClosedAffectedValueIds: [
        "central-volume-acceleration",
        "wake-background-diagnostics",
        "face-boundary-replay",
      ],
    },
    diagnostics: {
      globalErrorBudgetId: "borg-first-native-backed-fixture:global-error-budget",
      stageErrorBudgetIds: [
        "motion-integration",
        "path-history-stream-encoding",
        "display-projection-placeholder",
      ],
      precisionPathId: native.run.acceptedPrecisionPath,
      tolerancePolicyId: "borg-first-native-backed-fixture:tolerance-policy",
      haltDiagnostics: [
        {
          firstFailureCode: "required_residual_unmeasured",
          diagnosticStatus: "fail-closed-value",
          affectedField: "boundaryToCentralResidual",
        },
      ],
      diagnosticStatusVocabulary: [
        "authoritative-solver-output",
        "app-facing-projection",
        "display-only-visualization",
        "missing-error-budget",
        "exceeded-error-budget",
        "fail-closed-value",
      ],
      valueAuthorityStates: [
        "retained-local-evidence",
        "reduced-model-boundary",
        "boundary-generated-value",
        "authoritative-solver-output",
        "app-facing-projection",
        "display-only-visualization",
        "missing-error-budget",
        "exceeded-error-budget",
        "fail-closed-value",
      ],
    },
    deploymentBudget: {
      bundleSizeBytes: null,
      staticAssetTransferBytes: null,
      githubPagesBandwidthEstimate: null,
      browserHeapBudget: null,
      gpuMemoryBudget: null,
      browserStorageBudget: null,
      actionsArtifactBudget: null,
      nativeSolverThroughput: {
        executionPath: defaultMotionSummary.executionPath,
        frameCount: nativeResponse.summary.frameCount,
        pathRowCount: pathHistory.rowCount,
        measuredWallClockMs: null,
      },
      deploymentBudgetStatus: "missing-budget",
    },
    renderManifests: [
      {
        renderManifestId: "borg-first-native-backed-fixture:render-4k-uhd-placeholder",
        viewportCssSize: "1920x1080",
        renderPixelSize: "3840x2160",
        devicePixelRatio: 2,
        renderScale: 1,
        targetFrameRate: "not-measured",
        visualQualityMode: "quality-4k-uhd",
        renderStatus: "not-measured",
      },
    ],
    validation: {
      fixtureStatus: "passed-native-long-fixture-with-fail-closed-boundary-gaps",
      nativeBridgeStatus: "passed",
      nativePathBoundsFaceCrossingStatus: pathBounds.crossingStatus,
      longFixtureStatus: "native-keyframes-long-fixture",
      pathHistoryAuthorityStatus: "native-backed-now",
      wakeHistoryAuthorityStatus: "fail-closed-missing-contract",
      faceBoundaryAuthorityStatus: "fail-closed-missing-contract",
      benignNoiseAuthorityStatus: "fail-closed-missing-contract",
      proofClaimStatus: "not-proof-evidence",
    },
  };
}

function createNativeModelContract() {
  return {
    modelId: "aaa.central-solver",
    equationVersion: "default-motion-integration-v1",
    forceLawVersion: DEFAULT_MOTION_SETTINGS.motionLaw,
    constantsHash: "constants:borg-first-native-backed-fixture",
    causalSpeedPolicy: "fixed-field-speed",
    branchPolicy: "no-branch-solve-for-default-motion-fixture",
    unitConvention: "solver-si",
    compatiblePrecisionPaths: ["scaled_f64_strict", "event_root_focused", "extended_precision"],
  };
}

function createNativeMasterEquationModelContract() {
  return {
    modelId: "aaa.central-solver",
    equationVersion: DEFAULT_MOTION_SETTINGS.masterEquationVersion,
    forceLawVersion: DEFAULT_MOTION_SETTINGS.masterEquationForceLawVersion,
    constantsHash: "constants:borg-fixed-physical-parameters",
    causalSpeedPolicy: "fixed-field-speed",
    branchPolicy: "all-positive-roots",
    unitConvention: "solver-si",
    compatiblePrecisionPaths: ["scaled_f64_strict", "event_root_focused", "extended_precision"],
  };
}

function createNativeErrorBudget() {
  return {
    globalTolerance: 1e-12,
    rootIsolationTolerance: 1e-12,
    delayedHitTolerance: 1e-12,
    integrationTolerance: 1e-11,
    streamEncodingTolerance: 1e-12,
    readbackTolerance: 1e-12,
    projectionTolerance: 1e-9,
    displayTolerance: 1e-6,
  };
}

function createNativeAdmissionEnvelope() {
  return {
    entityCount: INITIAL_STATE_COUNT,
    assemblyCount: 0,
    timeWindow: {
      start: 0,
      end: SIMULATION_ENVELOPE.duration,
      stepHint: SIMULATION_ENVELOPE.sampleInterval,
      units: "solver-time",
    },
    timeResolutionHint: SIMULATION_ENVELOPE.sampleInterval,
    interactionPolicy: "fixed-parameter-default-motion",
    expectedBranchComplexity: "none",
    outputDetail: "playback",
    memoryBudgetBytes: 64 * 1024 * 1024,
    storageBudgetBytes: 64 * 1024 * 1024,
    latencyTarget: "interactive",
    simplificationPolicy: "none",
  };
}

function createNativeMasterEquationAdmissionEnvelope() {
  return {
    ...createNativeAdmissionEnvelope(),
    interactionPolicy: "all-to-all",
    expectedBranchComplexity: "moderate",
  };
}

function createNativeMasterEquationProbeRequest(initialStates) {
  return createSolverRunRequest({
    requestId: `${FIXTURE_IDS.requestId}:master-equation-probe`,
    runId: `${FIXTURE_IDS.nativeRunId}:master-equation-probe`,
    datasetId: `${FIXTURE_IDS.nativeDatasetId}:master-equation-probe`,
    appId: "causal-delay-feedback",
    runKind: DEFAULT_MOTION_SETTINGS.masterEquationRunKind,
    claimLevel: "developer-test",
    precisionPath: "auto",
    configVersion: "borg-native-master-equation-fixture-probe.v1",
    configHash: "borg-native-master-equation-fixture-probe",
    model: createNativeMasterEquationModelContract(),
    envelope: createNativeMasterEquationAdmissionEnvelope(),
    errorBudget: createNativeErrorBudget(),
    config: {
      appId: "causal-delay-feedback",
      fallbackPolicy: "fail-closed-or-default-motion-baseline",
      masterEquationRequest: {
        startTime: 0,
        endTime: SIMULATION_ENVELOPE.duration,
        step: SIMULATION_ENVELOPE.sampleInterval,
        maxFrames: Math.floor(SIMULATION_ENVELOPE.duration / SIMULATION_ENVELOPE.sampleInterval) + 1,
        fixedPhysicalParameterSetId: DEFAULT_MOTION_SETTINGS.fixedPhysicalParameterSetId,
        masterEquationVersion: DEFAULT_MOTION_SETTINGS.masterEquationVersion,
        forceLawVersion: DEFAULT_MOTION_SETTINGS.masterEquationForceLawVersion,
        fieldSpeed: SIMULATION_ENVELOPE.fieldSpeed,
        historyDepth: SIMULATION_ENVELOPE.historyDepth,
        integrationTolerance: DEFAULT_MOTION_SETTINGS.integrationTolerance,
        initialStates: initialStates.map((state) => ({
          pathKey: state.pathKey,
          initialPosition: state.initialPosition,
          initialVelocity: state.initialVelocity,
          charge: state.charge,
          stateFlags: state.stateFlags,
        })),
      },
      streamId: `${FIXTURE_IDS.pathHistoryStreamId}:master-equation-probe`,
      rowsPerChunk: LONG_FIXTURE_PROFILE.rowsPerChunk,
      storagePolicy: {
        target: "caller-buffer",
        durable: false,
        maxBytes: 64 * 1024 * 1024,
      },
      metadata: {
        precisionPath: "scaled_f64_strict",
        units: "solver-si",
        coordinateFrame: "absolute-lab-frame",
        scaleNormalization: "borg-master-equation-fixture-units",
        interpolationRule: "native-master-equation-integration",
        provenance: {
          fixture: "borg-first-native-backed-fixture",
          fixtureProfileId: LONG_FIXTURE_PROFILE.fixtureProfileId,
          fixedPhysicalParameterSetId: DEFAULT_MOTION_SETTINGS.fixedPhysicalParameterSetId,
        },
      },
    },
    output: {
      outputs: ["summary", "diagnostics"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: 64 * 1024 * 1024,
      deterministic: true,
    },
  });
}

function createNativeDefaultMotionRunRequest(initialState) {
  return createSolverRunRequest({
    requestId: `${FIXTURE_IDS.requestId}:${initialState.pathKey}`,
    runId: `${FIXTURE_IDS.nativeRunId}:${initialState.pathKey}`,
    datasetId: `${FIXTURE_IDS.nativeDatasetId}:${initialState.pathKey}`,
    appId: "causal-delay-feedback",
    runKind: DEFAULT_MOTION_SETTINGS.runKind,
    claimLevel: "developer-test",
    precisionPath: "auto",
    configVersion: "borg-first-native-default-motion-fixture.v1",
    configHash: "borg-first-native-default-motion-fixture",
    model: createNativeModelContract(),
    envelope: createNativeAdmissionEnvelope(),
    errorBudget: createNativeErrorBudget(),
    config: {
      appId: "causal-delay-feedback",
      motionIntegrationRequest: {
        pathKey: initialState.pathKey,
        startTime: 0,
        endTime: SIMULATION_ENVELOPE.duration,
        step: SIMULATION_ENVELOPE.sampleInterval,
        maxFrames: Math.floor(SIMULATION_ENVELOPE.duration / SIMULATION_ENVELOPE.sampleInterval) + 1,
        initialPosition: initialState.initialPosition,
        initialVelocity: initialState.initialVelocity,
        acceleration: DEFAULT_MOTION_SETTINGS.acceleration,
        integrationTolerance: DEFAULT_MOTION_SETTINGS.integrationTolerance,
        integrationMethod: DEFAULT_MOTION_SETTINGS.integrationMethod,
        stateFlags: initialState.stateFlags,
      },
      streamId: `${FIXTURE_IDS.pathHistoryStreamId}:${initialState.pathKey}`,
      rowsPerChunk: LONG_FIXTURE_PROFILE.rowsPerChunk,
      storagePolicy: {
        target: "caller-buffer",
        durable: false,
        maxBytes: 64 * 1024 * 1024,
      },
      metadata: {
        precisionPath: "scaled_f64_strict",
        units: "solver-si",
        coordinateFrame: "absolute-lab-frame",
        scaleNormalization: "borg-default-motion-fixture-units",
        interpolationRule: "constant-acceleration-motion-integration",
        provenance: {
          fixture: "borg-first-native-backed-fixture",
          fixtureProfileId: LONG_FIXTURE_PROFILE.fixtureProfileId,
          fixedPhysicalParameterSetId: DEFAULT_MOTION_SETTINGS.fixedPhysicalParameterSetId,
        },
      },
    },
    output: {
      outputs: ["summary", "frameBuffer", "pathStream", "diagnostics"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: 64 * 1024 * 1024,
      deterministic: true,
    },
  });
}

function combineNativeDefaultMotionRuns(runs, { masterEquationProbe } = {}) {
  const frames = runs
    .flatMap((run) => run.response.frames)
    .sort((left, right) => left.frameIndex - right.frameIndex || left.pathKey - right.pathKey);
  const streams = runs.flatMap((run) => run.response.streams ?? []);
  const pathHistories = runs.map((run) => run.response.pathHistory).filter(Boolean);
  const availableRanges = streams.flatMap((stream) => stream.availableRanges ?? []);
  const frameRanges = pathHistories.map((summary) => summary.frameRange).filter(Boolean);
  const timeRanges = pathHistories.map((summary) => summary.timeRange).filter(Boolean);
  const byteLength = sumNumbers(pathHistories.map((summary) => summary.byteLength));
  const rowCount = sumNumbers(pathHistories.map((summary) => summary.rowCount));
  const chunkCount = sumNumbers(pathHistories.map((summary) => summary.chunkCount));
  const firstRun = runs[0];
  const firstStream = streams[0] ?? {};
  const precisionPath = firstRun?.acceptedPrecisionPath ?? firstRun?.response?.summary?.precisionPath ?? "auto";
  const combinedStream = {
    ...firstStream,
    streamId: FIXTURE_IDS.pathHistoryStreamId,
    availableRanges,
    storagePolicy: {
      target: "caller-buffer",
      durable: false,
      maxBytes: byteLength,
    },
    metadata: {
      ...(firstStream.metadata ?? {}),
      interpolationRule: "constant-acceleration-motion-integration",
      provenance: {
        runKind: DEFAULT_MOTION_SETTINGS.runKind,
        source: "combined-native-default-motion-integration",
        fixedPhysicalParameterSetId: DEFAULT_MOTION_SETTINGS.fixedPhysicalParameterSetId,
      },
      dynamicReplay: {
        schema: "solver-path-history-dynamic-replay-set.v1",
        replayKind: "constant-acceleration-motion-integration-set",
        pathCount: INITIAL_STATE_COUNT,
        fixedPhysicalParameterSetId: DEFAULT_MOTION_SETTINGS.fixedPhysicalParameterSetId,
      },
    },
  };
  const status = {
    code: "ok",
    severity: "ok",
    message: "combined native default motion fixture completed",
    runId: FIXTURE_IDS.nativeRunId,
    requestId: FIXTURE_IDS.requestId,
    recoverable: true,
  };
  return {
    requestId: FIXTURE_IDS.requestId,
    runId: FIXTURE_IDS.nativeRunId,
    datasetId: FIXTURE_IDS.nativeDatasetId,
    acceptedPrecisionPath: precisionPath,
    status,
    response: {
      runId: FIXTURE_IDS.nativeRunId,
      datasetId: FIXTURE_IDS.nativeDatasetId,
      summary: {
        runId: FIXTURE_IDS.nativeRunId,
        claimLevel: "developer-test",
        precisionPath,
        status,
        frameCount: frames.length,
        pathCount: INITIAL_STATE_COUNT,
        pathRowCount: rowCount,
        chunkCount,
      },
      buffers: runs.flatMap((run) => run.response.buffers ?? []),
      streams: [combinedStream],
      diagnostics: runs.flatMap((run) => run.response.diagnostics ?? []),
      frames,
      pathHistory: {
        schema: "solver-path-history-stream-summary.v1",
        runId: FIXTURE_IDS.nativeRunId,
        datasetId: FIXTURE_IDS.nativeDatasetId,
        streamId: FIXTURE_IDS.pathHistoryStreamId,
        rowCount,
        chunkCount,
        pathCount: INITIAL_STATE_COUNT,
        byteLength,
        rowSizeBytes: pathHistories[0]?.rowSizeBytes ?? null,
        pathIndexRowCount: sumNumbers(pathHistories.map((summary) => summary.pathIndexRowCount)),
        pathIndexedChunkCount: sumNumbers(pathHistories.map((summary) => summary.pathIndexedChunkCount)),
        timeRange: mergeRange(timeRanges),
        frameRange: mergeRange(frameRanges),
        storagePolicy: combinedStream.storagePolicy,
        metadata: combinedStream.metadata,
      },
      defaultMotion: {
        executionPath: "native_c_abi",
        runKind: DEFAULT_MOTION_SETTINGS.runKind,
        solverMode: DEFAULT_MOTION_SETTINGS.solverMode,
        motionLaw: DEFAULT_MOTION_SETTINGS.motionLaw,
        fixedPhysicalParameterSetId: DEFAULT_MOTION_SETTINGS.fixedPhysicalParameterSetId,
        fixedPhysicalParameterAuthority: DEFAULT_MOTION_SETTINGS.fixedPhysicalParameterAuthority,
        fixedPhysicalParameters: createFixedPhysicalParameterSummary(),
        accelerationPolicy: DEFAULT_MOTION_SETTINGS.accelerationPolicy,
        acceleration: DEFAULT_MOTION_SETTINGS.acceleration,
        visualTuningStatus: DEFAULT_MOTION_SETTINGS.visualTuningStatus,
        visualBehaviorAuthority: DEFAULT_MOTION_SETTINGS.visualBehaviorAuthority,
        nativeMasterEquationStatus: DEFAULT_MOTION_SETTINGS.nativeMasterEquationStatus,
        nativeMasterEquationProbeStatusCode: masterEquationProbe?.response?.status?.code ?? null,
        nativeMasterEquationProbeFirstFailureCode:
          masterEquationProbe?.response?.summary?.firstFailureCode ?? null,
        nativeMasterEquationRequiredNativeExport:
          DEFAULT_MOTION_SETTINGS.masterEquationRequiredNativeExport,
        masterEquationFallbackDecision: DEFAULT_MOTION_SETTINGS.masterEquationFallbackDecision,
        canonicalEomEvidence: DEFAULT_MOTION_SETTINGS.canonicalEomEvidence,
        eomEvidenceStatus: DEFAULT_MOTION_SETTINGS.eomEvidenceStatus,
        eomEvidenceReason: DEFAULT_MOTION_SETTINGS.eomEvidenceReason,
        nextSolverBurden: DEFAULT_MOTION_SETTINGS.nextSolverBurden,
      },
      status,
    },
  };
}

function createNativeMasterEquationProbeSummary(masterEquationProbe) {
  const response = masterEquationProbe.response;
  const summary = response.summary;
  return {
    schema: "borg-native-master-equation-probe.v1",
    runKind: DEFAULT_MOTION_SETTINGS.masterEquationRunKind,
    runId: masterEquationProbe.runId,
    requestId: masterEquationProbe.requestId,
    statusCode: response.status.code,
    severity: response.status.severity,
    executionPath: summary.executionPath,
    nativeMasterEquationStatus: summary.nativeMasterEquationStatus,
    fixedPhysicalParameterSetId: summary.fixedPhysicalParameterSetId,
    fixedPhysicalParameterAuthority: summary.fixedPhysicalParameterAuthority,
    masterEquationVersion: DEFAULT_MOTION_SETTINGS.masterEquationVersion,
    forceLawVersion: DEFAULT_MOTION_SETTINGS.masterEquationForceLawVersion,
    canonicalEomEvidence: summary.canonicalEomEvidence,
    eomEvidenceStatus: summary.eomEvidenceStatus,
    eomEvidenceReason: summary.eomEvidenceReason,
    firstFailureCode: summary.firstFailureCode,
    requiredNativeExport:
      response.masterEquation?.requiredNativeExport ??
      DEFAULT_MOTION_SETTINGS.masterEquationRequiredNativeExport,
    fallbackDecision: DEFAULT_MOTION_SETTINGS.masterEquationFallbackDecision,
    fallbackRunKind: DEFAULT_MOTION_SETTINGS.runKind,
    valueAuthority: "fail-closed-value",
  };
}

function createFixedPhysicalParameterSummary() {
  return {
    parameterSetId: DEFAULT_MOTION_SETTINGS.fixedPhysicalParameterSetId,
    duration: SIMULATION_ENVELOPE.duration,
    sampleInterval: SIMULATION_ENVELOPE.sampleInterval,
    fieldSpeed: SIMULATION_ENVELOPE.fieldSpeed,
    historyDepth: SIMULATION_ENVELOPE.historyDepth,
    acceleration: DEFAULT_MOTION_SETTINGS.acceleration,
    integrationTolerance: DEFAULT_MOTION_SETTINGS.integrationTolerance,
    integrationMethod: DEFAULT_MOTION_SETTINGS.integrationMethod,
    positrinoCharge: 1,
    electrinoCharge: -1,
    visualTuningStatus: DEFAULT_MOTION_SETTINGS.visualTuningStatus,
  };
}

function createSixteenInitialStates() {
  const positions = createRandomInteriorPositions();
  const velocityRandom = createSeededRandom(VELOCITY_SEED);
  return positions.map((initialPosition, index) => {
    const isPositrino = index % 2 === 0;
    return {
      pathKey: 1001 + index,
      initialPosition,
      initialVelocity: createSmallRandomVelocity(velocityRandom),
      charge: isPositrino ? 1 : -1,
      mass: 1,
      stateFlags: isPositrino ? 1 : 2,
    };
  });
}

function createRandomInteriorPositions() {
  const random = createSeededRandom(INITIAL_CONDITION_SEED);
  const positions = [];
  const minSeparationSquared = INTERIOR_RANDOM_LAYOUT.minSeparation ** 2;
  let attempts = 0;
  while (positions.length < INITIAL_STATE_COUNT && attempts < 10000) {
    attempts += 1;
    const candidate = {
      x: randomInRange(random, INTERIOR_RANDOM_LAYOUT.minCoordinate, INTERIOR_RANDOM_LAYOUT.maxCoordinate),
      y: randomInRange(random, INTERIOR_RANDOM_LAYOUT.minCoordinate, INTERIOR_RANDOM_LAYOUT.maxCoordinate),
      z: randomInRange(random, INTERIOR_RANDOM_LAYOUT.minCoordinate, INTERIOR_RANDOM_LAYOUT.maxCoordinate),
    };
    if (
      positions.every(
        (position) => squaredDistance(position, candidate) >= minSeparationSquared,
      )
    ) {
      positions.push(candidate);
    }
  }
  if (positions.length !== INITIAL_STATE_COUNT) {
    throw new Error("Unable to place Borg random interior initial states with the requested separation.");
  }
  return positions;
}

function createSmallRandomVelocity(random) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const velocity = {
      x: randomInRange(random, -RANDOM_VELOCITY.maxComponentMagnitude, RANDOM_VELOCITY.maxComponentMagnitude),
      y: randomInRange(random, -RANDOM_VELOCITY.maxComponentMagnitude, RANDOM_VELOCITY.maxComponentMagnitude),
      z: randomInRange(random, -RANDOM_VELOCITY.maxComponentMagnitude, RANDOM_VELOCITY.maxComponentMagnitude),
    };
    if (Math.hypot(velocity.x, velocity.y, velocity.z) >= RANDOM_VELOCITY.minSpeed) {
      return velocity;
    }
  }
  return {
    x: RANDOM_VELOCITY.minSpeed,
    y: 0,
    z: 0,
  };
}

function randomInRange(random, min, max) {
  return min + random() * (max - min);
}

function squaredDistance(left, right) {
  return (
    (left.x - right.x) ** 2 +
    (left.y - right.y) ** 2 +
    (left.z - right.z) ** 2
  );
}

function createSeededRandom(seed) {
  let state = hashSeed(seed);
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(seed) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function deriveOuterArchitrinoCount({ centralArchitrinoCount, centralVolumeSideLength, faceBufferMargin }) {
  return Math.ceil(
    centralArchitrinoCount * (1 + (2 * faceBufferMargin) / centralVolumeSideLength) ** 3,
  );
}

function sumNumbers(values) {
  return values.reduce((sum, value) => sum + (Number.isFinite(Number(value)) ? Number(value) : 0), 0);
}

function mergeRange(ranges) {
  const starts = ranges.map((range) => range?.start).filter(Number.isFinite);
  const ends = ranges.map((range) => range?.end).filter(Number.isFinite);
  return {
    start: starts.length > 0 ? Math.min(...starts) : 0,
    end: ends.length > 0 ? Math.max(...ends) : 0,
  };
}

function maxFrameSpeed(frames) {
  return frames.reduce((maxSpeed, frame) => {
    const { x, y, z } = frame.velocity;
    return Math.max(maxSpeed, Math.hypot(x, y, z));
  }, 0);
}

function countNativeKeyframes(frames) {
  return new Set(frames.map((frame) => frame.frameIndex)).size;
}

function normalizeCurrentStateFrame(frame) {
  return {
    pathKey: frame.pathKey,
    frameIndex: frame.frameIndex,
    time: frame.time,
    position: {
      x: frame.position.x,
      y: frame.position.y,
      z: frame.position.z,
    },
    velocity: {
      x: frame.velocity.x,
      y: frame.velocity.y,
      z: frame.velocity.z,
    },
    errorBound: frame.errorBound,
    stateFlags: frame.stateFlags,
  };
}

function summarizePathBounds(stream, sideLength) {
  const ranges = stream?.availableRanges ?? [];
  const xMin = Math.min(...ranges.map((range) => range.bounds?.min?.x).filter(Number.isFinite));
  const xMax = Math.max(...ranges.map((range) => range.bounds?.max?.x).filter(Number.isFinite));
  const xMinusCrossed = xMin < 0;
  const xPlusCrossed = xMax > sideLength;
  return {
    source: "native-path-history-stream-bounds",
    xMin,
    xMax,
    xMinusCrossed,
    xPlusCrossed,
    crossingStatus:
      xMinusCrossed && xPlusCrossed
        ? "path-bounds-cross-outer-x-faces"
        : "path-bounds-stay-inside-outer-cube-long-fixture",
  };
}

function createGapRow({ gapRowId, firstFailureCode, affectedConsumers, message }) {
  return {
    gapRowId,
    pathId: null,
    timeStart: 0,
    timeEnd: SIMULATION_ENVELOPE.duration,
    affectedConsumers,
    firstFailureCode,
    diagnosticStatus: "fail-closed-value",
    valueAuthority: "fail-closed-value",
    message,
  };
}

function printSummary(manifest) {
  const summary = {
    schema: manifest.schema,
    manifestId: manifest.manifestId,
    nativeSolverStatus: manifest.nativeSolverStatus,
    executionPath: manifest.sourceBridgeRun.executionPath,
    frameCount: manifest.sourceBridgeRun.frameCount,
    pathRowCount: manifest.sourceBridgeRun.pathRowCount,
    architrinoCount: manifest.population.architrinoCount,
    strictCentralBufferStatus: manifest.simulationEnvelope.strictCentralBufferStatus,
    duration: manifest.simulationEnvelope.duration,
    sampleInterval: manifest.simulationEnvelope.sampleInterval,
    nativeKeyframeCount: manifest.currentStateAndFrameSources.nativeKeyframeCount,
    playbackFrameSource: manifest.currentStateAndFrameSources.playbackFrameSource,
    nativeMasterEquationProbeStatus: manifest.nativeMasterEquationProbe.statusCode,
    nativeMasterEquationProbeFailure: manifest.nativeMasterEquationProbe.firstFailureCode,
    masterEquationFallbackDecision: manifest.nativeMasterEquationProbe.fallbackDecision,
    boundaryReplayDecisionStatus: manifest.boundaryToCentralResidual.boundaryReplayDecisionStatus,
    benignNoiseStatus: manifest.faceBoundary.benignNoiseStatus,
    fixtureStatus: manifest.validation.fixtureStatus,
  };
  console.log(JSON.stringify(summary, null, 2));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const { manifest } = await buildBorgFirstNativeBackedFixture();
  if (args.has("--json")) {
    console.log(JSON.stringify(manifest, null, 2));
    return;
  }
  printSummary(manifest);
}

if (isDirectCliInvocation()) {
  main().catch((error) => {
    console.error(error?.stack || error?.message || String(error));
    process.exitCode = 1;
  });
}

function isDirectCliInvocation() {
  return typeof process.argv[1] === "string" && import.meta.url === pathToFileURL(process.argv[1]).href;
}
