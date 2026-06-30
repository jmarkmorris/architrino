export const BORG_DATASET_MANIFEST_V1 = Object.freeze({
  schema: "borg-dataset-manifest.v1",
  manifestId: "borg-first-native-backed-fixture-manifest",
  runId: "borg-first-native-backed-fixture",
  modelContractId: "aaa.central-solver/borg-first-native-backed-fixture.v1",
  nativeSolverStatus: "native-backed-now",
  nativeSolverVersion: "local-wasm:architrino_solver_wasm_smoke",
  bridgeSchemaVersion: "solver-app-bridge.v1",
  claimLevel: "developer-test",
  sourceBridgeRun: Object.freeze({
    appId: "causal-delay-feedback",
    runKind: "pairInteraction",
    nativeRunId: "borg-first-native-backed-fixture-native-run",
    nativeDatasetId: "borg-first-native-backed-fixture-native-dataset",
    requestId: "borg-first-native-backed-fixture-request",
    acceptedPrecisionPath: "scaled_f64_strict",
    executionPath: "native_c_abi",
    statusCode: "ok",
    frameCount: 6,
    pathCount: 2,
    pathRowCount: 4,
    chunkCount: 2,
    pathHistoryStreamId: "borg-first-native-backed-fixture:path-history",
    valueAuthority: "authoritative-solver-output",
  }),
  simulationEnvelope: Object.freeze({
    sideLength: 10,
    centralVolume: Object.freeze({
      kind: "cube",
      center: Object.freeze({ x: 5, y: 5, z: 5 }),
      bounds: Object.freeze({
        x: Object.freeze([1, 9]),
        y: Object.freeze([1, 9]),
        z: Object.freeze([1, 9]),
      }),
      coordinateChart: "outer-cube-cartesian",
    }),
    centralVolumeSideLength: 8,
    faceBufferMargin: 1,
    scaleFactor: 1,
    boundaryMode: "statistical-face-boundary",
    duration: 2,
    historyDepth: 2,
    fieldSpeed: 3,
    wakeHorizon: 6,
    wakeFloor: null,
    centralVelocityBound: 3.205,
    centralObservationInterval: 2,
    centralBoundaryTolerance: 1e-3,
    strictCentralBufferStatus: "failed",
  }),
  population: Object.freeze({
    centralArchitrinoCount: 1,
    architrinoCount: 2,
    bufferArchitrinoCount: 1,
    countDerivation: Object.freeze({
      formulaId: "N_calc=ceil(N_C*(1+2*b_face/L_C)^3)",
      exactPreCeiling: 1.953125,
      roundedValue: 2,
    }),
  }),
  initialConditions: Object.freeze({
    initialConditionFamily: "explicit",
    initialConditionSeed: null,
    electrinoCount: 1,
    positrinoCount: 1,
    polarityAssignmentSource: "explicit",
    velocityPolicy: "explicit",
    velocitySeed: null,
    resolvedInitialStateId: "borg-first-native-backed-fixture-native-run:explicit-pair-initial-state",
    customEditStatus: "accepted",
  }),
  currentStateFrames: Object.freeze([
    Object.freeze({
      pathKey: 1001,
      frameIndex: 0,
      time: 0,
      position: Object.freeze({ x: 4.5, y: 5, z: 5 }),
      velocity: Object.freeze({ x: 3.2, y: 0, z: 0 }),
      errorBound: 0,
      stateFlags: 1,
    }),
    Object.freeze({
      pathKey: 1002,
      frameIndex: 0,
      time: 0,
      position: Object.freeze({ x: 5.5, y: 5, z: 5 }),
      velocity: Object.freeze({ x: -3.2, y: 0, z: 0 }),
      errorBound: 0,
      stateFlags: 2,
    }),
    Object.freeze({
      pathKey: 1001,
      frameIndex: 1,
      time: 1,
      position: Object.freeze({ x: 7.705, y: 5, z: 5 }),
      velocity: Object.freeze({ x: 3.205, y: 0, z: 0 }),
      errorBound: 1e-11,
      stateFlags: 1,
    }),
    Object.freeze({
      pathKey: 1002,
      frameIndex: 1,
      time: 1,
      position: Object.freeze({ x: 2.295, y: 5, z: 5 }),
      velocity: Object.freeze({ x: -3.205, y: 0, z: 0 }),
      errorBound: 1e-11,
      stateFlags: 2,
    }),
    Object.freeze({
      pathKey: 1001,
      frameIndex: 2,
      time: 2,
      position: Object.freeze({ x: 10.882950000000001, y: 5, z: 5 }),
      velocity: Object.freeze({ x: 3.17795, y: 0, z: 0 }),
      errorBound: 2e-11,
      stateFlags: 1,
    }),
    Object.freeze({
      pathKey: 1002,
      frameIndex: 2,
      time: 2,
      position: Object.freeze({ x: -0.8829500000000001, y: 5, z: 5 }),
      velocity: Object.freeze({ x: -3.17795, y: 0, z: 0 }),
      errorBound: 2e-11,
      stateFlags: 2,
    }),
  ]),
  pathHistory: Object.freeze({
    pathHistoryStreamIds: Object.freeze(["borg-first-native-backed-fixture:path-history"]),
    pathReplayIndexIds: Object.freeze(["borg-first-native-backed-fixture:path-history:stream_index.v1"]),
    pathHistoryGapRows: Object.freeze([]),
    streamSummary: Object.freeze({
      schema: "solver-path-history-stream-summary.v1",
      rowCount: 4,
      chunkCount: 2,
      pathCount: 2,
      byteLength: 384,
      timeRange: Object.freeze({ start: 0, end: 2 }),
      frameRange: Object.freeze({ start: 0, end: 1 }),
      valueAuthority: "authoritative-solver-output",
    }),
    pathBoundsFaceCrossing: Object.freeze({
      source: "native-path-history-stream-bounds",
      xMin: -0.8829500000200001,
      xMax: 10.882950000020001,
      xMinusCrossed: true,
      xPlusCrossed: true,
      crossingStatus: "path-bounds-cross-outer-x-faces",
    }),
  }),
  faceBoundary: Object.freeze({
    benignNoiseStatus: "fail-closed-missing-contract",
    faceCoverageStatus: "fail-closed",
    faceInfluenceModelAuthority: "missing-model",
    velocitySamplingResearchStatus: "research-open",
  }),
  boundaryToCentralResidual: Object.freeze({
    boundaryToCentralResidualId: "borg-gap:boundary-to-central-residual-not-measured",
    residualLabel: "R_boundary->central",
    residualValue: null,
    tolerance: 1e-3,
    status: "not-measured",
    firstFailureCode: "required_residual_unmeasured",
    strictBufferStatus: "strict-buffer-failed",
    boundaryReplayDecisionStatus: "fail-closed-missing-contract",
  }),
  diagnostics: Object.freeze({
    globalErrorBudgetId: "borg-first-native-backed-fixture:global-error-budget",
    diagnosticStatusVocabulary: Object.freeze([
      "authoritative-solver-output",
      "app-facing-projection",
      "display-only-visualization",
      "missing-error-budget",
      "exceeded-error-budget",
      "fail-closed-value",
    ]),
    valueAuthorityStates: Object.freeze([
      "retained-local-evidence",
      "reduced-model-boundary",
      "boundary-generated-value",
      "authoritative-solver-output",
      "app-facing-projection",
      "display-only-visualization",
      "missing-error-budget",
      "exceeded-error-budget",
      "fail-closed-value",
    ]),
  }),
  deploymentBudget: Object.freeze({
    bundleSizeBytes: null,
    staticAssetTransferBytes: null,
    githubPagesBandwidthEstimate: null,
    browserHeapBudget: null,
    gpuMemoryBudget: null,
    browserStorageBudget: null,
    actionsArtifactBudget: null,
    nativeSolverThroughput: Object.freeze({
      executionPath: "native_c_abi",
      frameCount: 6,
      pathRowCount: 4,
      measuredWallClockMs: null,
    }),
    deploymentBudgetStatus: "missing-budget",
  }),
  renderManifests: Object.freeze([
    Object.freeze({
      renderManifestId: "borg-first-native-backed-fixture:render-4k-uhd-placeholder",
      viewportCssSize: "1920x1080",
      renderPixelSize: "3840x2160",
      devicePixelRatio: 2,
      renderScale: 1,
      targetFrameRate: "not-measured",
      visualQualityMode: "quality-4k-uhd",
      renderStatus: "not-measured",
    }),
  ]),
  validation: Object.freeze({
    fixtureStatus: "passed-native-smoke-with-fail-closed-boundary-gaps",
    nativeBridgeStatus: "passed",
    nativePathBoundsFaceCrossingStatus: "path-bounds-cross-outer-x-faces",
    pathHistoryAuthorityStatus: "native-backed-now",
    wakeHistoryAuthorityStatus: "fail-closed-missing-contract",
    faceBoundaryAuthorityStatus: "fail-closed-missing-contract",
    benignNoiseAuthorityStatus: "fail-closed-missing-contract",
    proofClaimStatus: "not-proof-evidence",
  }),
});

export const BORG_APP_SURFACE_DESIGN_V1 = Object.freeze({
  schema: "borg-app-surface-design.v1",
  screenSpecId: "borg-first-screen-from-native-fixture",
  appId: "borg-app",
  claimLevel: "developer-test-screen-spec",
  sourceManifest: Object.freeze({
    schema: "borg-dataset-manifest.v1",
    manifestId: "borg-first-native-backed-fixture-manifest",
    runId: "borg-first-native-backed-fixture",
    modelContractId: "aaa.central-solver/borg-first-native-backed-fixture.v1",
    nativeSolverStatus: "native-backed-now",
    nativeSolverVersion: "local-wasm:architrino_solver_wasm_smoke",
    bridgeSchemaVersion: "solver-app-bridge.v1",
    fixtureStatus: "passed-native-smoke-with-fail-closed-boundary-gaps",
    sourceClaimLevel: "developer-test",
  }),
  nativeSolverBoundary: Object.freeze({
    productionSolver: "native-central-solver",
    newSolverStatus: "forbidden",
    bridgeExecutionPath: "native_c_abi",
    currentStateAuthority: "authoritative-solver-output",
    pathHistoryAuthority: "authoritative-solver-output",
    wakeHistoryAuthority: "fail-closed-missing-contract",
    faceBoundaryAuthority: "fail-closed-missing-contract",
  }),
  firstViewport: Object.freeze({
    screenKind: "simulation-workspace",
    landingPage: false,
    requiredOutputStandard: "4k-uhd",
    renderPixelSize: "3840x2160",
    layoutRegions: Object.freeze([
      "left-simulation-envelope-rail",
      "top-layer-strip",
      "viewport-camera-cluster",
      "right-diagnostics-rail",
      "bottom-timeline",
    ]),
    defaultVisibleLayers: Object.freeze(["simulation-window", "architrino-position", "diagnostics"]),
    defaultHiddenLayers: Object.freeze(["path-history", "velocity-vectors"]),
    defaultDisabledLayers: Object.freeze(["wake-streams", "face-boundary-status", "outbound-face-background"]),
    authorityPromotionRule: "least-authoritative-applicable-status-wins",
  }),
  layerStrip: Object.freeze([
    Object.freeze({ layer: "simulation-window", state: "on-locked", valueAuthority: "app-facing-projection" }),
    Object.freeze({ layer: "architrino-position", state: "on", valueAuthority: "authoritative-solver-output" }),
    Object.freeze({ layer: "path-history", state: "off", valueAuthority: "authoritative-solver-output" }),
    Object.freeze({
      layer: "velocity-vectors",
      state: "off",
      rawValueAuthority: "authoritative-solver-output",
      geometryAuthority: "app-facing-projection",
    }),
    Object.freeze({
      layer: "wake-streams",
      state: "disabled",
      valueAuthority: "fail-closed-value",
      firstFailureCode: "wake_history_gap_unclassified",
    }),
    Object.freeze({
      layer: "face-boundary-status",
      state: "contextual-disabled",
      valueAuthority: "fail-closed-value",
      firstFailureCode: "missing_face_crossing_coverage",
    }),
    Object.freeze({ layer: "diagnostics", state: "on-locked", valueAuthority: "fail-closed-value" }),
    Object.freeze({
      layer: "outbound-face-background",
      state: "disabled",
      valueAuthority: "fail-closed-value",
      firstFailureCode: "face_influence_model_missing",
    }),
  ]),
  authorityMap: Object.freeze({
    nativeCurrentStateFrames: "authoritative-solver-output",
    nativePathHistoryStream: "authoritative-solver-output",
    centralCubeWireframe: "app-facing-projection",
    outerComputedCubeOverlay: "app-facing-projection",
    velocityRayGeometry: "app-facing-projection",
    wakeStreams: "fail-closed-value",
    faceBoundaryStatus: "fail-closed-value",
    outboundFaceBackground: "fail-closed-value",
    centralVolumeAcceleration: "fail-closed-value",
    benignNoiseStatus: "fail-closed-missing-contract",
    deploymentBudgets: "missing-error-budget",
    renderQuality: "not-measured",
  }),
  failClosedFirstFailureCodes: Object.freeze([
    "wake_history_gap_unclassified",
    "missing_face_crossing_coverage",
    "face_influence_model_missing",
    "six_face_boundary_policy_missing",
    "velocity_sampling_protocol_missing",
    "required_residual_unmeasured",
  ]),
  validation: Object.freeze({
    surfaceDesignStatus: "passed-screen-spec-validation",
    sourceFixtureStatus: "passed-native-smoke-with-fail-closed-boundary-gaps",
    nativeBridgeStatus: "passed",
    nativePathBoundsFaceCrossingStatus: "path-bounds-cross-outer-x-faces",
    boundaryReplayDecisionStatus: "fail-closed-missing-contract",
    benignNoiseAuthorityStatus: "fail-closed-missing-contract",
    proofClaimStatus: "not-proof-evidence",
  }),
  nextBuildBurden: "measure-browser-surface-budget-and-4k-render-capture",
});

export const BORG_FAIL_CLOSED_ROWS = Object.freeze([
  Object.freeze({
    firstFailureCode: "wake_history_gap_unclassified",
    affectedConsumers: Object.freeze(["wake-streams", "receiver-acceleration", "central-volume-diagnostics"]),
    valueAuthority: "fail-closed-value",
  }),
  Object.freeze({
    firstFailureCode: "missing_face_crossing_coverage",
    affectedConsumers: Object.freeze(["face-boundary-status", "face-summary-extraction"]),
    valueAuthority: "fail-closed-value",
  }),
  Object.freeze({
    firstFailureCode: "face_influence_model_missing",
    affectedConsumers: Object.freeze(["face-replay-source", "six-face-boundary-noise-policy"]),
    valueAuthority: "fail-closed-value",
  }),
  Object.freeze({
    firstFailureCode: "six_face_boundary_policy_missing",
    affectedConsumers: Object.freeze(["boundary-replay-decision", "benign-noise-status"]),
    valueAuthority: "fail-closed-value",
  }),
  Object.freeze({
    firstFailureCode: "velocity_sampling_protocol_missing",
    affectedConsumers: Object.freeze(["velocity-scale-sampling", "boundary-replay-decision"]),
    valueAuthority: "fail-closed-value",
  }),
  Object.freeze({
    firstFailureCode: "required_residual_unmeasured",
    affectedConsumers: Object.freeze([
      "central-volume-acceleration",
      "wake-background-diagnostics",
      "face-boundary-replay",
    ]),
    valueAuthority: "fail-closed-value",
  }),
]);

export function getBorgFrameSet(manifest = BORG_DATASET_MANIFEST_V1) {
  const frameSet = new Map();
  manifest.currentStateFrames.forEach((frame) => {
    const frameIndex = Number(frame.frameIndex) || 0;
    const frames = frameSet.get(frameIndex) ?? [];
    frames.push(frame);
    frameSet.set(frameIndex, frames);
  });
  return [...frameSet.entries()]
    .sort(([left], [right]) => left - right)
    .map(([frameIndex, frames]) =>
      Object.freeze({
        frameIndex,
        time: frames[0]?.time ?? frameIndex,
        frames: Object.freeze(frames.slice().sort((left, right) => left.pathKey - right.pathKey)),
      }),
    );
}

export function validateBorgFixtureSnapshot({
  manifest = BORG_DATASET_MANIFEST_V1,
  surfaceDesign = BORG_APP_SURFACE_DESIGN_V1,
} = {}) {
  const failures = [];
  if (manifest.schema !== "borg-dataset-manifest.v1") {
    failures.push("manifest schema mismatch");
  }
  if (surfaceDesign.schema !== "borg-app-surface-design.v1") {
    failures.push("surface design schema mismatch");
  }
  if (surfaceDesign.sourceManifest.manifestId !== manifest.manifestId) {
    failures.push("surface source manifest id mismatch");
  }
  if (manifest.nativeSolverStatus !== "native-backed-now") {
    failures.push("native solver status is not native-backed-now");
  }
  if (manifest.sourceBridgeRun.executionPath !== "native_c_abi") {
    failures.push("native execution path is not native_c_abi");
  }
  if (manifest.currentStateFrames.length !== manifest.sourceBridgeRun.frameCount) {
    failures.push("current-state frame count mismatch");
  }
  if (!surfaceDesign.firstViewport.defaultVisibleLayers.includes("simulation-window")) {
    failures.push("simulation-window layer is not default visible");
  }
  if (!surfaceDesign.firstViewport.defaultVisibleLayers.includes("architrino-position")) {
    failures.push("architrino-position layer is not default visible");
  }
  if (!surfaceDesign.firstViewport.defaultDisabledLayers.includes("wake-streams")) {
    failures.push("wake-streams layer is not disabled");
  }
  if (surfaceDesign.authorityMap.centralVolumeAcceleration !== "fail-closed-value") {
    failures.push("central-volume acceleration is not fail-closed");
  }
  if (surfaceDesign.firstViewport.renderPixelSize !== "3840x2160") {
    failures.push("4K UHD render manifest is missing");
  }
  if (failures.length > 0) {
    throw new Error(`Invalid Borg fixture snapshot: ${failures.join("; ")}`);
  }
  return true;
}
