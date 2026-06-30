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
  sideLength: 10,
  centralVolumeSideLength: 8,
  faceBufferMargin: 1,
  historyDepth: 2,
  fieldSpeed: 3,
  centralObservationInterval: 2,
  centralBoundaryTolerance: 1e-3,
});

const POPULATION = Object.freeze({
  centralArchitrinoCount: 1,
});

export async function buildBorgFirstNativeBackedFixture() {
  const native = await runNativePairFixture();
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
  assertEqual(manifest.sourceBridgeRun.pathRowCount, native.run.response.pathHistory.rowCount, "path row count");
  assert(
    manifest.pathHistory.pathHistoryStreamIds.includes(FIXTURE_IDS.pathHistoryStreamId),
    "path-history stream id is bound into the Borg manifest",
  );
  assertEqual(manifest.pathHistory.pathHistoryGapRows.length, 0, "path-history gap rows");
  assertEqual(manifest.population.centralArchitrinoCount, 1, "central count");
  assertEqual(manifest.population.architrinoCount, 2, "outer computed count");
  assertEqual(manifest.population.bufferArchitrinoCount, 1, "buffer count");
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
    "path-bounds-cross-outer-x-faces",
    "native path face crossing status",
  );
}

async function runNativePairFixture() {
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
    requestedCapabilities: ["motionSimulation", "pathHistory"],
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

  const request = createSolverRunRequest({
    requestId: FIXTURE_IDS.requestId,
    runId: FIXTURE_IDS.nativeRunId,
    datasetId: FIXTURE_IDS.nativeDatasetId,
    appId: "causal-delay-feedback",
    runKind: "pairInteraction",
    claimLevel: "developer-test",
    precisionPath: "auto",
    configVersion: "borg-first-native-backed-fixture.v1",
    configHash: "borg-first-native-backed-fixture",
    model: createNativeModelContract(),
    envelope: createNativeAdmissionEnvelope(),
    errorBudget: createNativeErrorBudget(),
    config: {
      appId: "causal-delay-feedback",
      pairInteractionRequest: createPairInteractionRequest(),
      streamId: FIXTURE_IDS.pathHistoryStreamId,
      rowsPerChunk: 2,
      storagePolicy: {
        target: "caller-buffer",
        durable: false,
        maxBytes: 64 * 1024 * 1024,
      },
      metadata: {
        precisionPath: "scaled_f64_strict",
        units: "solver-si",
        coordinateFrame: "absolute-lab-frame",
        scaleNormalization: "borg-smoke-units",
        interpolationRule: "piecewise-pair-interaction-integration",
        provenance: { fixture: "borg-first-native-backed-fixture" },
      },
    },
    output: {
      outputs: ["summary", "frameBuffer", "pathStream", "diagnostics"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: 64 * 1024 * 1024,
      deterministic: true,
    },
  });

  const run = await client.runSimulation(request);
  assertEqual(run.status.code, "ok", "native run status");
  assertEqual(run.response.summary.executionPath, "native_c_abi", "native run execution path");
  assert(run.response.frames.length > 0, "native run emitted frame rows");
  assert(run.response.pathHistory?.rowCount > 0, "native run emitted path-history rows");
  return { init, request, run };
}

function createBorgDatasetManifest(native) {
  const nativeResponse = native.run.response;
  const pairSummary = nativeResponse.pairInteraction;
  const pathHistory = nativeResponse.pathHistory;
  const stream = nativeResponse.streams.find((entry) => entry.streamId === FIXTURE_IDS.pathHistoryStreamId);
  const wakeHorizon = SIMULATION_ENVELOPE.fieldSpeed * SIMULATION_ENVELOPE.historyDepth;
  const centralVelocityBound = maxFrameSpeed(nativeResponse.frames);
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
      runKind: "pairInteraction",
      nativeRunId: native.run.runId,
      nativeDatasetId: native.run.datasetId,
      requestId: native.run.requestId,
      acceptedPrecisionPath: native.run.acceptedPrecisionPath,
      executionPath: pairSummary.executionPath,
      statusCode: native.run.status.code,
      frameCount: nativeResponse.summary.frameCount,
      pathCount: nativeResponse.summary.pathCount,
      pathRowCount: pathHistory.rowCount,
      chunkCount: pathHistory.chunkCount,
      pathHistoryStreamId: pathHistory.streamId,
      canonicalEomEvidence: pairSummary.canonicalEomEvidence,
      eomEvidenceStatus: pairSummary.eomEvidenceStatus,
      valueAuthority: "authoritative-solver-output",
    },
    simulationEnvelope: {
      sideLength: SIMULATION_ENVELOPE.sideLength,
      centralVolume: {
        kind: "cube",
        center: { x: 5, y: 5, z: 5 },
        bounds: {
          x: [1, 9],
          y: [1, 9],
          z: [1, 9],
        },
        coordinateChart: "outer-cube-cartesian",
      },
      centralVolumeSideLength: SIMULATION_ENVELOPE.centralVolumeSideLength,
      faceBufferMargin: SIMULATION_ENVELOPE.faceBufferMargin,
      scaleFactor: 1,
      boundaryMode: "statistical-face-boundary",
      timeStepPolicy: "fixed",
      duration: 2,
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
      initialConditionFamily: "explicit",
      initialConditionSeed: null,
      electrinoCount: 1,
      positrinoCount: 1,
      polarityAssignmentSource: "explicit",
      velocityPolicy: "explicit",
      velocitySeed: null,
      resolvedInitialStateId: `${FIXTURE_IDS.nativeRunId}:explicit-pair-initial-state`,
      customEditStatus: "accepted",
      integrationWeightAuthority: "legacy-bridge-numeric-weight-only",
    },
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
          message: "Native path bounds cross outer faces, but no native face-crossing event rows are emitted.",
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
        executionPath: pairSummary.executionPath,
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
      fixtureStatus: "passed-native-smoke-with-fail-closed-boundary-gaps",
      nativeBridgeStatus: "passed",
      nativePathBoundsFaceCrossingStatus: pathBounds.crossingStatus,
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
    equationVersion: "motion-root-v1",
    forceLawVersion: "causal-delay-v1",
    constantsHash: "constants:borg-first-native-backed-fixture",
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
    entityCount: 2,
    assemblyCount: 0,
    timeWindow: { start: 0, end: 2, stepHint: 1, units: "solver-time" },
    timeResolutionHint: 1,
    interactionPolicy: "pair-interaction-smoke",
    expectedBranchComplexity: "low",
    outputDetail: "playback",
    memoryBudgetBytes: 64 * 1024 * 1024,
    storageBudgetBytes: 64 * 1024 * 1024,
    latencyTarget: "interactive",
    simplificationPolicy: "none",
  };
}

function createPairInteractionRequest() {
  return {
    startTime: 0,
    endTime: 2,
    step: 1,
    maxFrames: 3,
    pairAccelerationScale: 0.02,
    softening: 0.01,
    integrationTolerance: 1e-11,
    interactionLaw: "display_pair_attraction_v1",
    initialStates: [
      {
        pathKey: 1001,
        initialPosition: { x: 4.5, y: 5, z: 5 },
        initialVelocity: { x: 3.2, y: 0, z: 0 },
        charge: 1,
        mass: 1,
        stateFlags: 1,
      },
      {
        pathKey: 1002,
        initialPosition: { x: 5.5, y: 5, z: 5 },
        initialVelocity: { x: -3.2, y: 0, z: 0 },
        charge: -1,
        mass: 1,
        stateFlags: 2,
      },
    ],
    pathConstraints: [],
  };
}

function deriveOuterArchitrinoCount({ centralArchitrinoCount, centralVolumeSideLength, faceBufferMargin }) {
  return Math.ceil(
    centralArchitrinoCount * (1 + (2 * faceBufferMargin) / centralVolumeSideLength) ** 3,
  );
}

function maxFrameSpeed(frames) {
  return frames.reduce((maxSpeed, frame) => {
    const { x, y, z } = frame.velocity;
    return Math.max(maxSpeed, Math.hypot(x, y, z));
  }, 0);
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
        : "path-bounds-do-not-cover-required-face-crossing-smoke",
  };
}

function createGapRow({ gapRowId, firstFailureCode, affectedConsumers, message }) {
  return {
    gapRowId,
    pathId: null,
    timeStart: 0,
    timeEnd: 2,
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
