#!/usr/bin/env node

import { pathToFileURL } from "node:url";

import { buildBorgFirstNativeBackedFixture } from "./build-first-native-backed-fixture.mjs";

const SURFACE_DESIGN_SCHEMA = "borg-app-surface-design.v1";
const SCREEN_SPEC_ID = "borg-first-screen-from-native-fixture";
const REQUIRED_RENDER_PIXEL_SIZE = "3840x2160";
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

export async function buildBorgAppSurfaceDesign() {
  const { manifest, native } = await buildBorgFirstNativeBackedFixture();
  const surfaceDesign = createBorgAppSurfaceDesign(manifest);
  assertBorgAppSurfaceDesign(surfaceDesign, manifest);
  return { surfaceDesign, manifest, native };
}

export function createBorgAppSurfaceDesign(manifest) {
  const failClosedRows = collectFailClosedRows(manifest);
  const renderManifest = manifest.renderManifests.find(
    (entry) => entry.renderPixelSize === REQUIRED_RENDER_PIXEL_SIZE,
  );
  const simulationEnvelope = manifest.simulationEnvelope;
  const population = manifest.population;

  return {
    schema: SURFACE_DESIGN_SCHEMA,
    screenSpecId: SCREEN_SPEC_ID,
    appId: "borg-app",
    claimLevel: "developer-test-screen-spec",
    sourceManifest: {
      schema: manifest.schema,
      manifestId: manifest.manifestId,
      runId: manifest.runId,
      modelContractId: manifest.modelContractId,
      nativeSolverStatus: manifest.nativeSolverStatus,
      nativeSolverVersion: manifest.nativeSolverVersion,
      bridgeSchemaVersion: manifest.bridgeSchemaVersion,
      fixtureStatus: manifest.validation.fixtureStatus,
      fixtureProfileId: manifest.sourceBridgeRun.fixtureProfileId,
      nativeKeyframeCount: manifest.currentStateAndFrameSources.nativeKeyframeCount,
      sampleInterval: manifest.simulationEnvelope.sampleInterval,
      playbackFrameSource: manifest.currentStateAndFrameSources.playbackFrameSource,
      initialLinePolicy: manifest.initialConditions.initialLinePolicy,
      runKind: manifest.sourceBridgeRun.runKind,
      solverMode: manifest.sourceBridgeRun.solverMode,
      motionLaw: manifest.sourceBridgeRun.motionLaw,
      fixedPhysicalParameterSetId: manifest.sourceBridgeRun.fixedPhysicalParameterSetId,
      fixedPhysicalParameterAuthority: manifest.sourceBridgeRun.fixedPhysicalParameterAuthority,
      fixedPhysicalParameters: manifest.sourceBridgeRun.fixedPhysicalParameters,
      visualTuningStatus: manifest.sourceBridgeRun.visualTuningStatus,
      visualBehaviorAuthority: manifest.sourceBridgeRun.visualBehaviorAuthority,
      nativeMasterEquationStatus: manifest.sourceBridgeRun.nativeMasterEquationStatus,
      nativeMasterEquationProbe: manifest.nativeMasterEquationProbe,
      canonicalEomEvidence: manifest.sourceBridgeRun.canonicalEomEvidence,
      eomEvidenceStatus: manifest.sourceBridgeRun.eomEvidenceStatus,
      nextSolverBurden: manifest.sourceBridgeRun.nextSolverBurden,
      sourceClaimLevel: manifest.claimLevel,
    },
    nativeSolverBoundary: {
      productionSolver: "central-solver-compatibility-output",
      eomMigrationStatus: "shadow-adapter-available-promotion-gated",
      bridgeExecutionPath: manifest.sourceBridgeRun.executionPath,
      currentStateAuthority: manifest.currentStateAndFrameSources.projectionStatus,
      pathHistoryAuthority: manifest.pathHistory.streamSummary.valueAuthority,
      wakeHistoryAuthority: manifest.validation.wakeHistoryAuthorityStatus,
      faceBoundaryAuthority: manifest.validation.faceBoundaryAuthorityStatus,
    },
    firstViewport: {
      screenKind: "simulation-workspace",
      landingPage: false,
      requiredOutputStandard: "4k-uhd",
      renderPixelSize: renderManifest?.renderPixelSize ?? null,
      layoutRegions: [
        "left-simulation-envelope-rail",
        "top-layer-strip",
        "viewport-camera-cluster",
        "right-diagnostics-rail",
        "bottom-timeline",
      ],
      defaultVisibleLayers: ["simulation-window", "architrino-position", "path-history", "diagnostics"],
      defaultHiddenLayers: ["velocity-vectors"],
      defaultDisabledLayers: ["wake-streams", "face-boundary-status", "outbound-face-background"],
      authorityPromotionRule: "least-authoritative-applicable-status-wins",
    },
    viewport: {
      kind: "3d-simulation-window",
      renderedRegion: "centralVolume",
      centralCube: {
        visible: true,
        renderRule: "faint-edge-wireframe-only",
        sourceField: "simulationEnvelope.centralVolume",
        sideLength: simulationEnvelope.centralVolumeSideLength,
        bounds: simulationEnvelope.centralVolume.bounds,
        center: simulationEnvelope.centralVolume.center,
        valueAuthority: "app-facing-projection",
      },
      outerComputedCube: {
        visibleByDefault: false,
        diagnosticOverlayOnly: true,
        sourceField: "simulationEnvelope.sideLength",
        sideLength: simulationEnvelope.sideLength,
        faceBufferMargin: simulationEnvelope.faceBufferMargin,
        valueAuthority: "app-facing-projection",
      },
      architrinoPositions: {
        visible: true,
        sourceField: "currentStateAndFrameSources.currentStateFrameIds",
        frameBufferIds: manifest.currentStateAndFrameSources.frameBufferIds,
        frameCount: manifest.currentStateAndFrameSources.frameCount,
        valueAuthority: manifest.currentStateAndFrameSources.projectionStatus,
      },
      cameraControls: {
        label: "View",
        controls: ["rotate", "zoom", "pan", "reset-view", "fit-window", "focus-selected"],
        valueAuthority: "display-only-visualization",
        physicalScaleIsolation: "camera-controls-do-not-edit-simulation-envelope",
      },
    },
    layerStrip: createLayerStrip(manifest),
    simulationEnvelopeRail: {
      label: "Simulation envelope",
      editAuthority: "pending-native-acceptance-on-change",
      fields: [
        envelopeField("sideLength", simulationEnvelope.sideLength, "authoritative-solver-output"),
        envelopeField(
          "centralVolumeSideLength",
          simulationEnvelope.centralVolumeSideLength,
          "app-facing-projection",
        ),
        envelopeField("faceBufferMargin", simulationEnvelope.faceBufferMargin, "app-facing-projection", {
          strictCentralBufferStatus: simulationEnvelope.strictCentralBufferStatus,
        }),
        envelopeField("historyDepth", simulationEnvelope.historyDepth, "authoritative-solver-output"),
        envelopeField("fieldSpeed", simulationEnvelope.fieldSpeed, "authoritative-solver-output"),
        envelopeField("wakeHorizon", simulationEnvelope.wakeHorizon, "app-facing-projection", {
          formulaId: "wakeHorizon=c_f*h",
        }),
        envelopeField(
          "centralVelocityBound",
          simulationEnvelope.centralVelocityBound,
          "authoritative-solver-output",
        ),
        envelopeField(
          "centralObservationInterval",
          simulationEnvelope.centralObservationInterval,
          "authoritative-solver-output",
        ),
        envelopeField("centralArchitrinoCount", population.centralArchitrinoCount, "app-facing-projection"),
        envelopeField("architrinoCount", population.architrinoCount, "app-facing-projection", {
          formulaId: population.countDerivation.formulaId,
        }),
        envelopeField("bufferArchitrinoCount", population.bufferArchitrinoCount, "app-facing-projection"),
      ],
    },
    initialConditionPanel: {
      family: manifest.initialConditions.initialConditionFamily,
      seed: manifest.initialConditions.initialConditionSeed,
      electrinoCount: manifest.initialConditions.electrinoCount,
      positrinoCount: manifest.initialConditions.positrinoCount,
      polarityAssignmentSource: manifest.initialConditions.polarityAssignmentSource,
      velocityPolicy: manifest.initialConditions.velocityPolicy,
      velocitySeed: manifest.initialConditions.velocitySeed,
      resolvedInitialStateId: manifest.initialConditions.resolvedInitialStateId,
      customEditStatus: manifest.initialConditions.customEditStatus,
      velocityRaysDefault: "off",
      valueAuthority: "authoritative-solver-output",
    },
    diagnosticsRail: {
      defaultState: "compact-alerts-plus-selected-object",
      globalErrorBudgetId: manifest.diagnostics.globalErrorBudgetId,
      stageErrorBudgetIds: manifest.diagnostics.stageErrorBudgetIds,
      diagnosticStatusVocabulary: manifest.diagnostics.diagnosticStatusVocabulary,
      valueAuthorityStates: manifest.diagnostics.valueAuthorityStates,
      compactAlerts: [
        {
          alertId: "strict-central-buffer-failed",
          status: simulationEnvelope.strictCentralBufferStatus,
          diagnosticStatus: "fail-closed-value",
          firstFailureCode: "central_volume_buffer_target_failed",
          affectedFields: ["centralVolumeAcceleration", "wakeBackgroundDiagnostics"],
        },
        ...manifest.diagnostics.haltDiagnostics,
      ],
      failClosedRows,
      selectedObjectPanels: [
        "architrino-state",
        "path-history-segment",
        "wake-history-row",
        "face-boundary-row",
        "fail-closed-value",
      ],
    },
    bottomTimeline: {
      localScrubber: "linear-loaded-frame-window",
      longRunOverview: "logarithmic-placeholder",
      sourceField: "pathHistory.streamSummary",
      exactReadouts: ["time", "frameIndex", "checkpointId", "playbackSpeed"],
      timeRange: manifest.pathHistory.streamSummary.timeRange,
      frameRange: manifest.pathHistory.streamSummary.frameRange,
      frameCount: manifest.currentStateAndFrameSources.frameCount,
      nativeKeyframeCount: manifest.currentStateAndFrameSources.nativeKeyframeCount,
      sampleInterval: manifest.simulationEnvelope.sampleInterval,
      playbackFrameSource: manifest.currentStateAndFrameSources.playbackFrameSource,
      pathRowCount: manifest.pathHistory.streamSummary.rowCount,
      valueAuthority: manifest.pathHistory.streamSummary.valueAuthority,
    },
    deploymentBudgetPanel: {
      deploymentBudgetStatus: manifest.deploymentBudget.deploymentBudgetStatus,
      bundleSizeBytes: manifest.deploymentBudget.bundleSizeBytes,
      staticAssetTransferBytes: manifest.deploymentBudget.staticAssetTransferBytes,
      githubPagesBandwidthEstimate: manifest.deploymentBudget.githubPagesBandwidthEstimate,
      browserHeapBudget: manifest.deploymentBudget.browserHeapBudget,
      gpuMemoryBudget: manifest.deploymentBudget.gpuMemoryBudget,
      browserStorageBudget: manifest.deploymentBudget.browserStorageBudget,
      actionsArtifactBudget: manifest.deploymentBudget.actionsArtifactBudget,
      nativeSolverThroughput: manifest.deploymentBudget.nativeSolverThroughput,
      valueAuthority: "missing-error-budget",
    },
    renderManifestPanel: {
      renderManifestId: renderManifest?.renderManifestId ?? null,
      viewportCssSize: renderManifest?.viewportCssSize ?? null,
      renderPixelSize: renderManifest?.renderPixelSize ?? null,
      devicePixelRatio: renderManifest?.devicePixelRatio ?? null,
      renderScale: renderManifest?.renderScale ?? null,
      visualQualityMode: renderManifest?.visualQualityMode ?? null,
      renderStatus: renderManifest?.renderStatus ?? null,
      valueAuthority: "display-only-visualization",
    },
    authorityMap: {
      nativeCurrentStateFrames: "authoritative-solver-output",
      nativePathHistoryStream: "authoritative-solver-output",
      centralCubeWireframe: "app-facing-projection",
      outerComputedCubeOverlay: "app-facing-projection",
      velocityRayGeometry: "app-facing-projection",
      wakeStreams: "fail-closed-value",
      faceBoundaryStatus: "fail-closed-value",
      outboundFaceBackground: "fail-closed-value",
      centralVolumeAcceleration: "fail-closed-value",
      benignNoiseStatus: manifest.faceBoundary.benignNoiseStatus,
      deploymentBudgets: "missing-error-budget",
      renderQuality: "not-measured",
    },
    noAuthorityPromotions: true,
    failClosedFirstFailureCodes: failClosedRows.map((row) => row.firstFailureCode),
    validation: {
      surfaceDesignStatus: "passed-screen-spec-validation",
      sourceFixtureStatus: manifest.validation.fixtureStatus,
      nativeBridgeStatus: manifest.validation.nativeBridgeStatus,
      nativePathBoundsFaceCrossingStatus: manifest.validation.nativePathBoundsFaceCrossingStatus,
      boundaryReplayDecisionStatus: manifest.boundaryToCentralResidual.boundaryReplayDecisionStatus,
      benignNoiseAuthorityStatus: manifest.validation.benignNoiseAuthorityStatus,
      proofClaimStatus: manifest.validation.proofClaimStatus,
    },
    nextBuildBurden: manifest.sourceBridgeRun.nextSolverBurden,
  };
}

export function assertBorgAppSurfaceDesign(surfaceDesign, manifest) {
  const selectedMasterEquation =
    surfaceDesign.sourceManifest.nativeMasterEquationStatus ===
    "native-fixed-parameter-master-equation";
  assertEqual(surfaceDesign.schema, SURFACE_DESIGN_SCHEMA, "surface design schema");
  assertEqual(surfaceDesign.screenSpecId, SCREEN_SPEC_ID, "screen spec id");
  assertEqual(surfaceDesign.sourceManifest.manifestId, manifest.manifestId, "source manifest id");
  assertEqual(surfaceDesign.sourceManifest.nativeSolverStatus, "native-backed-now", "native solver status");
  assertEqual(
    surfaceDesign.sourceManifest.fixtureProfileId,
    manifest.sourceBridgeRun.fixtureProfileId,
    "fixture profile id",
  );
  assertEqual(
    surfaceDesign.sourceManifest.nativeKeyframeCount,
    manifest.currentStateAndFrameSources.nativeKeyframeCount,
    "native keyframe count",
  );
  assertEqual(
    surfaceDesign.sourceManifest.playbackFrameSource,
    "native-keyframes",
    "playback frame source",
  );
  assertEqual(
    surfaceDesign.sourceManifest.initialLinePolicy,
    manifest.initialConditions.initialLinePolicy,
    "initial line policy",
  );
  assertEqual(
    surfaceDesign.sourceManifest.motionLaw,
    manifest.sourceBridgeRun.motionLaw,
    "motion law",
  );
  assertEqual(
    surfaceDesign.sourceManifest.solverMode,
    manifest.sourceBridgeRun.solverMode,
    "solver mode",
  );
  assertEqual(
    surfaceDesign.sourceManifest.fixedPhysicalParameterSetId,
    manifest.sourceBridgeRun.fixedPhysicalParameterSetId,
    "fixed physical parameter set id",
  );
  assertEqual(
    surfaceDesign.sourceManifest.fixedPhysicalParameterAuthority,
    manifest.sourceBridgeRun.fixedPhysicalParameterAuthority,
    "fixed physical parameter authority",
  );
  assertEqual(
    surfaceDesign.sourceManifest.visualTuningStatus,
    "not-visual-tuned",
    "visual tuning status",
  );
  assertEqual(
    surfaceDesign.sourceManifest.visualBehaviorAuthority,
    "native-output-only",
    "visual behavior authority",
  );
  assert(
    ALLOWED_NATIVE_MASTER_EQUATION_STATUSES.has(
      surfaceDesign.sourceManifest.nativeMasterEquationStatus,
    ),
    `native master-equation status ${surfaceDesign.sourceManifest.nativeMasterEquationStatus}`,
  );
  assert(
    ALLOWED_MASTER_EQUATION_PROBE_STATUS_CODES.has(
      surfaceDesign.sourceManifest.nativeMasterEquationProbe.statusCode,
    ),
    `native master-equation probe status ${surfaceDesign.sourceManifest.nativeMasterEquationProbe.statusCode}`,
  );
  assertEqual(
    surfaceDesign.sourceManifest.nativeMasterEquationProbe.fallbackDecision,
    selectedMasterEquation ? "native-master-equation-selected" : "default-motion-baseline-selected",
    "native master-equation probe fallback decision",
  );
  assertEqual(
    surfaceDesign.sourceManifest.nextSolverBurden,
    manifest.sourceBridgeRun.nextSolverBurden,
    "next solver burden",
  );
  assertEqual(surfaceDesign.nextBuildBurden, manifest.sourceBridgeRun.nextSolverBurden, "next build burden");
  assertEqual(
    surfaceDesign.nativeSolverBoundary.productionSolver,
    "central-solver-compatibility-output",
    "production solver boundary",
  );
  assertEqual(
    surfaceDesign.nativeSolverBoundary.eomMigrationStatus,
    "shadow-adapter-available-promotion-gated",
    "EOM migration status",
  );
  assertEqual(surfaceDesign.firstViewport.renderPixelSize, REQUIRED_RENDER_PIXEL_SIZE, "required render size");
  assertLayerState(surfaceDesign, "simulation-window", "on-locked");
  assertLayerState(surfaceDesign, "architrino-position", "on");
  assertLayerState(surfaceDesign, "velocity-vectors", "off");
  assertLayerState(surfaceDesign, "path-history", "on");
  assertLayerState(surfaceDesign, "wake-streams", "disabled");
  assertLayerState(surfaceDesign, "face-boundary-status", "contextual-disabled");
  assertLayerState(surfaceDesign, "outbound-face-background", "disabled");
  assertEqual(
    surfaceDesign.viewport.centralCube.sideLength,
    manifest.simulationEnvelope.centralVolumeSideLength,
    "central cube side length",
  );
  assertEqual(
    surfaceDesign.viewport.outerComputedCube.sideLength,
    manifest.simulationEnvelope.sideLength,
    "outer computed cube side length",
  );
  assertEqual(
    surfaceDesign.viewport.architrinoPositions.frameCount,
    manifest.currentStateAndFrameSources.frameCount,
    "native current-state frame count",
  );
  assertEqual(
    surfaceDesign.bottomTimeline.pathRowCount,
    manifest.pathHistory.streamSummary.rowCount,
    "path-history row count",
  );
  assert(
    surfaceDesign.diagnosticsRail.failClosedRows.some(
      (row) => row.firstFailureCode === "wake_history_gap_unclassified",
    ),
    "wake-history fail-closed row is surfaced",
  );
  assert(
    surfaceDesign.diagnosticsRail.failClosedRows.some(
      (row) => row.firstFailureCode === "face_influence_model_missing",
    ),
    "face influence model fail-closed row is surfaced",
  );
  assert(
    surfaceDesign.diagnosticsRail.failClosedRows.some(
      (row) => row.firstFailureCode === "required_residual_unmeasured",
    ),
    "boundary-to-central residual fail-closed row is surfaced",
  );
  assertEqual(surfaceDesign.authorityMap.centralVolumeAcceleration, "fail-closed-value", "central acceleration authority");
  assertEqual(surfaceDesign.noAuthorityPromotions, true, "authority promotion guard");
  assertEqual(surfaceDesign.validation.surfaceDesignStatus, "passed-screen-spec-validation", "validation status");
}

function createLayerStrip(manifest) {
  return [
    {
      layer: "simulation-window",
      state: "on-locked",
      sourceFields: [
        "simulationEnvelope.centralVolume",
        "simulationEnvelope.centralVolumeSideLength",
        "simulationEnvelope.sideLength",
        "simulationEnvelope.faceBufferMargin",
      ],
      valueAuthority: "app-facing-projection",
    },
    {
      layer: "architrino-position",
      state: "on",
      sourceFields: ["currentStateAndFrameSources.currentStateFrameIds"],
      valueAuthority: manifest.currentStateAndFrameSources.projectionStatus,
    },
    {
      layer: "velocity-vectors",
      state: "off",
      sourceFields: ["currentStateAndFrameSources.currentStateFrameIds"],
      displayTransform: "logarithmic-ray-length-when-enabled",
      rawValueAuthority: "authoritative-solver-output",
      geometryAuthority: "app-facing-projection",
    },
    {
      layer: "path-history",
      state: "on",
      sourceFields: ["pathHistory.pathHistoryStreamIds", "pathHistory.pathReplayIndexIds"],
      displayTransform: "adjacent-native-row-line-segments",
      smoothingPolicy: "none",
      valueAuthority: manifest.pathHistory.streamSummary.valueAuthority,
    },
    {
      layer: "wake-streams",
      state: "disabled",
      sourceFields: ["wakeHistory.resolvedWakeRowIds", "wakeHistory.wakeHistoryGapRows"],
      valueAuthority: "fail-closed-value",
      firstFailureCode: "wake_history_gap_unclassified",
    },
    {
      layer: "face-boundary-status",
      state: "contextual-disabled",
      sourceFields: ["faceBoundary.faceSummaryIds", "faceBoundary.faceBoundaryGapRows"],
      valueAuthority: "fail-closed-value",
      firstFailureCode: "missing_face_crossing_coverage",
    },
    {
      layer: "diagnostics",
      state: "on-locked",
      sourceFields: ["diagnostics.haltDiagnostics", "diagnostics.diagnosticStatusVocabulary"],
      valueAuthority: "fail-closed-value",
    },
    {
      layer: "outbound-face-background",
      state: "disabled",
      sourceFields: ["faceBoundary.faceSummarySetIds", "faceBoundary.faceInfluenceModelIds"],
      valueAuthority: "fail-closed-value",
      firstFailureCode: "face_influence_model_missing",
    },
  ];
}

function envelopeField(fieldId, value, valueAuthority, extra = {}) {
  return {
    fieldId,
    value,
    valueAuthority,
    ...extra,
  };
}

function collectFailClosedRows(manifest) {
  return [
    ...manifest.wakeHistory.wakeHistoryGapRows,
    ...manifest.faceBoundary.faceBoundaryGapRows,
    ...manifest.faceBoundary.faceInfluenceModelGapRows,
    ...manifest.faceBoundary.sixFaceBoundaryNoisePolicyGapRows,
    ...manifest.faceBoundary.velocitySamplingGapRows,
    {
      gapRowId: manifest.boundaryToCentralResidual.boundaryToCentralResidualId,
      pathId: null,
      timeStart: null,
      timeEnd: null,
      affectedConsumers: manifest.boundaryToCentralResidual.failClosedAffectedValueIds,
      firstFailureCode: manifest.boundaryToCentralResidual.firstFailureCode,
      diagnosticStatus: "fail-closed-value",
      valueAuthority: "fail-closed-value",
      message: "Required R_boundary->central residual is not measured for this fixture.",
    },
  ];
}

function assertLayerState(surfaceDesign, layer, expectedState) {
  const entry = surfaceDesign.layerStrip.find((candidate) => candidate.layer === layer);
  assert(entry, `missing layer ${layer}`);
  assertEqual(entry.state, expectedState, `${layer} state`);
}

function printSummary(surfaceDesign) {
  const summary = {
    schema: surfaceDesign.schema,
    screenSpecId: surfaceDesign.screenSpecId,
    sourceManifestId: surfaceDesign.sourceManifest.manifestId,
    nativeSolverStatus: surfaceDesign.sourceManifest.nativeSolverStatus,
    visibleLayers: surfaceDesign.firstViewport.defaultVisibleLayers,
    hiddenLayers: surfaceDesign.firstViewport.defaultHiddenLayers,
    disabledLayers: surfaceDesign.firstViewport.defaultDisabledLayers,
    frameCount: surfaceDesign.viewport.architrinoPositions.frameCount,
    nativeKeyframeCount: surfaceDesign.sourceManifest.nativeKeyframeCount,
    sampleInterval: surfaceDesign.sourceManifest.sampleInterval,
    playbackFrameSource: surfaceDesign.sourceManifest.playbackFrameSource,
    initialLinePolicy: surfaceDesign.sourceManifest.initialLinePolicy,
    runKind: surfaceDesign.sourceManifest.runKind,
    solverMode: surfaceDesign.sourceManifest.solverMode,
    motionLaw: surfaceDesign.sourceManifest.motionLaw,
    fixedPhysicalParameterSetId: surfaceDesign.sourceManifest.fixedPhysicalParameterSetId,
    fixedPhysicalParameterAuthority: surfaceDesign.sourceManifest.fixedPhysicalParameterAuthority,
    visualTuningStatus: surfaceDesign.sourceManifest.visualTuningStatus,
    visualBehaviorAuthority: surfaceDesign.sourceManifest.visualBehaviorAuthority,
    nativeMasterEquationStatus: surfaceDesign.sourceManifest.nativeMasterEquationStatus,
    nativeMasterEquationProbeStatus: surfaceDesign.sourceManifest.nativeMasterEquationProbe.statusCode,
    masterEquationFallbackDecision: surfaceDesign.sourceManifest.nativeMasterEquationProbe.fallbackDecision,
    pathRowCount: surfaceDesign.bottomTimeline.pathRowCount,
    renderPixelSize: surfaceDesign.firstViewport.renderPixelSize,
    firstFailureCodes: surfaceDesign.failClosedFirstFailureCodes,
    surfaceDesignStatus: surfaceDesign.validation.surfaceDesignStatus,
    nextBuildBurden: surfaceDesign.nextBuildBurden,
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
  const { surfaceDesign } = await buildBorgAppSurfaceDesign();
  if (args.has("--json")) {
    console.log(JSON.stringify(surfaceDesign, null, 2));
    return;
  }
  printSummary(surfaceDesign);
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
