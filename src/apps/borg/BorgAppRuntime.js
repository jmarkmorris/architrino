import * as THREE from "../../../vendor/three/three.module.js";
import {
  BORG_APP_SURFACE_DESIGN_V1,
  BORG_DATASET_MANIFEST_V1,
  BORG_FAIL_CLOSED_ROWS,
  validateBorgManifest,
} from "./BorgAppManifest.js";
import {
  appendBorgFrameRowsInPlace,
  appendBorgFrameSetsInPlace,
  createBorgFrameSetsFromRows,
} from "./BorgFrameRows.js";
import {
  BORG_EOM_RECORD_REPLAY_RUN_SOURCE,
  createBorgEomRecordReplayRunner,
} from "./BorgEomRecordReplayRunner.js";
import {
  BORG_EOM_SHADOW_RUN_SOURCE,
  createBorgEomShadowRunConfig,
  createBorgEomShadowRunner,
} from "./BorgEomShadowRunner.js";
import {
  BORG_CERTIFIED_BUDGET_PRESETS,
  BORG_DEFAULT_CERTIFIED_BUDGET_ID,
  getBorgCertifiedBudgetPreset,
} from "./BorgCertifiedBudgets.js";
import {
  createMeasuredRunPresetCalibration,
  resolveMeasuredRunControlPreset,
  updateMeasuredRunPresetCalibration,
} from "./BorgMeasuredRunPresets.js";
import {
  BORG_LIVE_RUN_RETENTION_POLICY_V1,
  createBorgLiveRunRetentionAppendSnapshot,
  createBorgLiveRunRetentionSnapshot,
  applyBorgLiveRunRetention,
} from "./BorgLiveRunRetentionPolicy.js";
import { BORG_RELEASE_BUDGET_MANIFEST_V1 } from "./BorgReleaseBudgetManifest.js";
import { createBorgPathTrails } from "./BorgPathTrails.js";
import { createBorgAssemblyViewControls } from "./BorgAssemblyViewControls.js";
import { createBorgAssemblyViewScene } from "./BorgAssemblyViewScene.js";
import {
  createBorgAssemblyViewSession,
  resolveBorgAssemblyViewStrobeTime,
} from "./BorgAssemblyViewSession.js";
import {
  BORG_MAX_VISUAL_CATCH_UP_FRAME_SETS,
  BORG_PLAYBACK_PREFILL_MAX_WALL_MS,
  formatBorgRealtimeRate,
  getBorgAdaptivePlaybackRate,
  getBorgInFlightProtectedPlaybackRate,
  getBorgPlaybackLeadWindow,
  getBorgPlaybackMsPerFrameSet,
  getBorgPlaybackPrefillTargetFrameSetCount,
  getBorgPlaybackRefillDecision,
  updateBorgMeasuredProductionRate,
} from "./BorgLivePlaybackController.js";
import { createBorgDiagnosticsPanelController } from "./BorgDiagnosticsPanel.js";
import {
  calculateBorgPolarityDiagnostics,
  createBorgEscapeLedger,
} from "./BorgPolarityDiagnostics.js";
import {
  borgEnvelopeRadius,
  createBorgPlacementPolicy,
} from "./BorgInteractiveDefaults.js";
import {
  BORG_MAX_INITIAL_ARCHITRINO_COUNT,
  calculateBorgInertialHistoryDepth,
  createBorgAcceptedInertialSeedHistory,
  createBorgInitialConditionConfig,
  createBorgSeededInitialConditionRows,
  validateBorgInitialConditionConfig,
} from "./BorgInitialConditions.js";

const TARGET_ENVELOPE_WORLD_DIAMETER = 6.2;
const BORG_LIVE_RUN_BUDGET_VERSION = "borg-live-run-budget.v1";
const CAMERA_MIN_DISTANCE = 4.8;
const CAMERA_MAX_DISTANCE = 28;
const DEFAULT_CAMERA_FIT_MARGIN = 1.43;
const HIGHLIGHTED_PATH_HISTORY_DURATION = 20;
const FIT_VIEW_MARGIN = 1.02;
const DEFAULT_ROTATION_X = -0.44;
const DEFAULT_ROTATION_Y = 0.66;
const ARCHITRINO_POINT_PIXEL_SIZE = 8;
const ARCHITRINO_PICK_THRESHOLD = 0.22;
const BOUNDARY_SHELL_LATITUDE_COUNT = 25;
const BOUNDARY_SHELL_LONGITUDE_COUNT = 48;
const ENVELOPE_GUIDE_COLOR = 0xcbd0c8;
const ENVELOPE_GUIDE_OPACITY = 0.88;
const DEFAULT_PLAYBACK_SPEED_PRESET_ID = "normal";
const DEFAULT_RUN_CONTROL_PRESET_ID = "live-forever";
const FINITE_RUN_CONTROL_PRESET_ID = "live-60s";
const DEFAULT_DISTRIBUTION_LABEL = "manifest initial-condition policy";
const PLAYBACK_SPEED_PRESETS = Object.freeze([
  Object.freeze({ id: "detail", label: "Detail", maximumRealtimeRate: 1 / 12 }),
  Object.freeze({ id: "normal", label: "Normal", maximumRealtimeRate: 0.6 }),
  Object.freeze({ id: "fast", label: "Realtime", maximumRealtimeRate: 1 }),
]);
const RUN_CONTROL_PRESETS = Object.freeze([
  Object.freeze({
    id: DEFAULT_RUN_CONTROL_PRESET_ID,
    label: "Forever",
    displayLabel: "Forever",
    sourceMode: "live",
    durationMode: "forever",
    targetDuration: Number.POSITIVE_INFINITY,
    chunkDuration: 20,
    minChunkDuration: 4,
  }),
  Object.freeze({
    id: FINITE_RUN_CONTROL_PRESET_ID,
    label: "60 seconds",
    displayLabel: "60 s",
    sourceMode: "live",
    targetDuration: 60,
    chunkDuration: 20,
    minTargetDuration: 60,
    minChunkDuration: 4,
  }),
]);
const PATH_RENDER_ORDER = 2;
const ARCHITRINO_RENDER_ORDER = 6;
const PLAY_ICON_PATH = "M8 5v14l11-7z";
const PAUSE_ICON_PATH = "M8 5h3v14H8zM13 5h3v14h-3z";
const HIDDEN_LAYER_BUTTONS = new Set(["simulation-window", "architrino-position"]);

const LAYER_LABELS = Object.freeze({
  "simulation-window": "Sphere",
  "architrino-position": "Points",
  "path-history": "Path",
  "velocity-vectors": "Velocity",
  "wake-streams": "Wake",
  "boundary-shell-status": "Shell",
  diagnostics: "Diag",
});

const LAYER_TITLES = Object.freeze({
  "simulation-window": "Spherical simulation envelope",
  "architrino-position": "Architrino positions from native frame rows",
  "path-history": "Path-history traces from native path rows",
  "velocity-vectors": "Velocity direction overlay",
  "wake-streams": "Wake streams are fail-closed until native rows exist",
  "boundary-shell-status": "Boundary-shell status is fail-closed until EOM rows exist",
  diagnostics: "Diagnostics are shown in the right rail",
});

const STATUS_TONE = Object.freeze({
  "authoritative-solver-output": "good",
  "app-facing-projection": "projection",
  "display-only-visualization": "display",
  "missing-error-budget": "warn",
  "exceeded-error-budget": "bad",
  "fail-closed-value": "bad",
  "native-backed-now": "good",
  "recorded-eom-dataset-chunks": "warn",
  "recorded-eom-output": "warn",
  "eom-record-replay-running": "warn",
  "computed-eom-shadow-chunks": "warn",
  "eom-shadow-running": "warn",
  "eom-shadow-output": "warn",
  "canonical-eom-output": "good",
  "live-native-running": "warn",
  "eom-idle": "warn",
  "live-native-error": "bad",
  "record-replay-error": "bad",
  "completed-live-native-run": "good",
  "completed-recorded-replay": "warn",
  "measured-live-run-budget": "good",
  "partial-live-run-budget": "warn",
  "fail-closed-missing-contract": "bad",
  failed: "bad",
  passed: "good",
  "not-measured": "warn",
});

const STATUS_LABEL = Object.freeze({
  "recorded-eom-dataset-chunks": "EOM replay",
  "eom-record-replay-running": "EOM replay",
  "live-native-running": "Live compute",
  "computed-eom-shadow-chunks": "Forward EOM",
  "eom-shadow-running": "Forward EOM",
  "eom-shadow-stopped": "Forward EOM idle",
  "eom-idle": "Idle",
  "live-native-error": "Solver stopped",
  "record-replay-error": "Replay stopped",
  "completed-live-native-run": "Forward complete",
  "completed-recorded-replay": "Replay complete",
});

const SOLVER_FAILURE_BANNERS = Object.freeze({
  "live-native-error":
    "Computing stopped. The solver failed part-way; everything after the last good frame is missing.",
  "record-replay-error":
    "Replay stopped. Borg did not repair or extend the sealed record.",
});

const PARTICLE_POLARITY_STYLES = Object.freeze({
  electrino: Object.freeze({
    color: 0x0000ff,
    pathColor: 0x8fb4ff,
    velocityColor: 0x9fefff,
    edgeColor: "#0000ff",
    polarity: "electrino",
  }),
  positrino: Object.freeze({
    color: 0xff0000,
    pathColor: 0xff8f86,
    velocityColor: 0xff9b92,
    edgeColor: "#ff0000",
    polarity: "positrino",
  }),
});

export function mountBorgApp(options = {}) {
  const documentLike = options.documentLike ?? globalThis.document;
  const windowLike = options.windowLike ?? globalThis.window;
  const manifest = options.manifest ?? BORG_DATASET_MANIFEST_V1;
  const surfaceDesign = options.surfaceDesign ?? BORG_APP_SURFACE_DESIGN_V1;
  validateBorgManifest({ manifest, surfaceDesign });
  const replayRecords = options.eomRecordReplay?.records ??
    (options.eomRecordReplay?.record ? [options.eomRecordReplay.record] : null);
  const assemblyViewSession = options.assemblyViewSession ??
    (replayRecords ? createBorgAssemblyViewSession(replayRecords) : null);
  let activeReplayEntry = assemblyViewSession?.selected ?? null;
  const replayActive = assemblyViewSession != null;

  const dom = {
    app: queryRequiredElement(documentLike, "#borg-app"),
    diagnosticsPanel: queryRequiredElement(documentLike, "#borg-diagnostics-panel"),
    diagnosticsToggle: queryRequiredElement(documentLike, "#borg-diagnostics-toggle"),
    solverBanner: documentLike.querySelector?.("#borg-solver-banner") ?? null,
    canvas: queryRequiredElement(documentLike, "#borg-canvas"),
    layerStrip: queryRequiredElement(documentLike, "#borg-layer-strip"),
    envelopeSection: queryRequiredElement(documentLike, "#borg-envelope-section"),
    envelopeFields: queryRequiredElement(documentLike, "#borg-envelope-fields"),
    initialConditionFields: queryRequiredElement(documentLike, "#borg-initial-condition-fields"),
    initialConditionForm: queryRequiredElement(documentLike, "#borg-initial-condition-form"),
    electrinoCount: queryRequiredElement(documentLike, "#borg-electrino-count"),
    positrinoCount: queryRequiredElement(documentLike, "#borg-positrino-count"),
    coupling: queryRequiredElement(documentLike, "#borg-coupling"),
    certifiedBudget: queryRequiredElement(documentLike, "#borg-certified-budget"),
    stepHeight: queryRequiredElement(documentLike, "#borg-step-height"),
    minimumStep: queryRequiredElement(documentLike, "#borg-minimum-step"),
    velocityMaxComponent: queryRequiredElement(documentLike, "#borg-velocity-max-component"),
    velocityMinSpeed: queryRequiredElement(documentLike, "#borg-velocity-min-speed"),
    initialConditionFeedback: queryRequiredElement(documentLike, "#borg-initial-condition-feedback"),
    nativeStatus: queryRequiredElement(documentLike, "#borg-native-status"),
    manifestStatus: queryRequiredElement(documentLike, "#borg-manifest-status"),
    sourceFields: queryRequiredElement(documentLike, "#borg-source-fields"),
    diagnosticsFields: queryRequiredElement(documentLike, "#borg-diagnostics-fields"),
    failClosedList: queryRequiredElement(documentLike, "#borg-fail-closed-list"),
    authorityFields: queryRequiredElement(documentLike, "#borg-authority-fields"),
    renderFields: queryRequiredElement(documentLike, "#borg-render-fields"),
    deploymentFields: queryRequiredElement(documentLike, "#borg-deployment-fields"),
    selectedTag: queryRequiredElement(documentLike, "#borg-selected-tag"),
    timelineRange: queryRequiredElement(documentLike, "#borg-time-range"),
    timelineOutput: queryRequiredElement(documentLike, "#borg-time-output"),
    eomControls: queryRequiredElement(documentLike, "#borg-eom-controls"),
    eomDuration: queryRequiredElement(documentLike, "#borg-eom-duration"),
    eomHistoryStatus: queryRequiredElement(documentLike, "#borg-eom-history-status"),
    eomStopButton: queryRequiredElement(documentLike, "#borg-eom-stop-button"),
    eomRestartButton: queryRequiredElement(documentLike, "#borg-eom-restart-button"),
    eomProgress: queryRequiredElement(documentLike, "#borg-eom-progress"),
    eomProgressLabel: queryRequiredElement(documentLike, "#borg-eom-progress-label"),
    runDurationButton: queryRequiredElement(documentLike, "#borg-run-duration-button"),
    playbackSpeed: queryRequiredElement(documentLike, "#borg-playback-speed"),
    playButton: queryRequiredElement(documentLike, "#borg-play-button"),
    playButtonIcon: queryRequiredElement(documentLike, "#borg-play-button path"),
    startButton: queryRequiredElement(documentLike, "#borg-start-frame-button"),
    newDistributionButton: queryRequiredElement(documentLike, "#borg-new-distribution-button"),
    resetButton: queryRequiredElement(documentLike, "#borg-reset-view-button"),
    fitButton: queryRequiredElement(documentLike, "#borg-fit-view-button"),
    focusButton: queryRequiredElement(documentLike, "#borg-focus-selected-button"),
    modeBoundary: queryRequiredElement(documentLike, "#borg-mode-boundary"),
    modeLabel: queryRequiredElement(documentLike, "#borg-mode-label"),
    modeDetail: queryRequiredElement(documentLike, "#borg-mode-detail"),
    replayControls: queryRequiredElement(documentLike, "#borg-assembly-view-controls"),
    replayAuthorityNotice: queryRequiredElement(documentLike, "#borg-replay-authority-notice"),
    replayProvenance: queryRequiredElement(documentLike, "#borg-replay-provenance"),
    replayRecordSelect: queryRequiredElement(documentLike, "#borg-replay-record-select"),
    replayDisplayMode: queryRequiredElement(documentLike, "#borg-replay-display-mode"),
    replayCameraMode: queryRequiredElement(documentLike, "#borg-replay-camera-mode"),
    replayStrobeFrequency: queryRequiredElement(documentLike, "#borg-replay-strobe-frequency"),
    replayStrobeButton: queryRequiredElement(documentLike, "#borg-replay-strobe-button"),
    replayLoopPeriod: queryRequiredElement(documentLike, "#borg-replay-loop-period"),
    replayExport: queryRequiredElement(documentLike, "#borg-replay-export"),
    replayFilterField: queryRequiredElement(documentLike, "#borg-replay-filter-field"),
    replayFilterValue: queryRequiredElement(documentLike, "#borg-replay-filter-value"),
    replayGrouping: queryRequiredElement(documentLike, "#borg-replay-grouping"),
    replayComparison: queryRequiredElement(documentLike, "#borg-replay-comparison"),
    replayFeedback: queryRequiredElement(documentLike, "#borg-replay-feedback"),
    replayOverlayFields: queryRequiredElement(documentLike, "#borg-replay-overlay-fields"),
  };

  const initialEomSeed = options.initialEomSeed ?? null;
  const initialDistributionSeedIndex = Number.isSafeInteger(options.initialDistributionSeedIndex) &&
      options.initialDistributionSeedIndex >= 0
    ? options.initialDistributionSeedIndex
    : 0;
  const autoStartEom = options.autoStartEom !== false;
  // The accepted seed's endpoint is visible before the first EOM chunk. Its
  // past rows are solver input only and are never presented as computed output.
  const initialDisplayRows = Object.freeze([...(initialEomSeed?.endpointRows ?? [])]);
  let currentFrames = [...initialDisplayRows];
  let frameSets = createBorgFrameSetsFromRows(currentFrames);
  const worldUnitsPerSolverUnit =
    TARGET_ENVELOPE_WORLD_DIAMETER / (2 * manifest.simulationEnvelope.outerRadius);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.05, 100);
  const renderer = new THREE.WebGLRenderer({
    canvas: dom.canvas,
    antialias: true,
    alpha: false,
    preserveDrawingBuffer: true,
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x12130f, 1);

  const rootGroup = new THREE.Group();
  const boundaryShellGroup = new THREE.Group();
  const assemblyContentGroup = new THREE.Group();
  const pathGroup = new THREE.Group();
  const velocityGroup = new THREE.Group();
  const pointGroup = new THREE.Group();
  assemblyContentGroup.add(pathGroup, velocityGroup, pointGroup);
  rootGroup.add(boundaryShellGroup, assemblyContentGroup);
  scene.add(rootGroup);

  scene.add(new THREE.HemisphereLight(0xf1f7ea, 0x2f352b, 1.45));
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
  keyLight.position.set(4, 6, 6);
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0xb5e6c1, 0.56);
  fillLight.position.set(-6, 2, 4);
  scene.add(fillLight);

  const raycaster = new THREE.Raycaster();
  raycaster.params.Points.threshold = ARCHITRINO_PICK_THRESHOLD;
  const pointerNdc = new THREE.Vector2();
  // Scratch vectors reused every frame. These conversions run once per
  // architrino per frame; allocating here is what makes the garbage collector
  // a visible part of the frame budget.
  const velocityStart = new THREE.Vector3();
  const velocityDirection = new THREE.Vector3();
  const particleObjects = new Map();
  const velocityLines = new Map();
  const architrinoPointTexture = createArchitrinoPointTexture(documentLike);
  const particleStyles = createParticleStyles(currentFrames);
  const pathTrails = createBorgPathTrails({
    group: pathGroup,
    renderOrder: PATH_RENDER_ORDER,
    getStyle: (pathKey) => getParticleStyle(pathKey, particleStyles),
    toWorld: writeSolverPositionToWorld,
  });
  const polarityEscapeLedger = createBorgEscapeLedger();

  const state = {
    activeFrameIndex: frameSets[0]?.frameIndex ?? 0,
    activeLayers: new Set([
      ...surfaceDesign.firstViewport.defaultVisibleLayers,
      ...surfaceDesign.layerStrip
        .filter((layer) => layer.state === "on-locked")
        .map((layer) => layer.layer),
    ]),
    cameraDistance: CAMERA_MIN_DISTANCE,
    cameraFitMargin: DEFAULT_CAMERA_FIT_MARGIN,
    selectedPathKey: null,
    dragging: false,
    pointerId: null,
    pointerStartX: 0,
    pointerStartY: 0,
    pointerLastX: 0,
    pointerLastY: 0,
    pointerTravel: 0,
    playing: false,
    playFrameRequestId: null,
    playFrameRequestKind: null,
    playbackFromSetIndex: 0,
    playbackToSetIndex: 0,
    playbackSegmentStartedAt: null,
    playbackSegmentProgress: 0,
    playbackSpeedPresetId: DEFAULT_PLAYBACK_SPEED_PRESET_ID,
    playbackMeasuredProductionRate: null,
    playbackAdaptiveRate: PLAYBACK_SPEED_PRESETS.find(
      (preset) => preset.id === DEFAULT_PLAYBACK_SPEED_PRESET_ID,
    ).maximumRealtimeRate,
    playbackBufferRefilling: true,
    playbackPrefillPromise: null,
    runControlPresetId: options.initialRunControlPresetId ?? DEFAULT_RUN_CONTROL_PRESET_ID,
    sourceMode: initialEomSeed ? "accepted-eom-seed-history" : "eom-idle",
    dynamicRunnerStatus: initialEomSeed
      ? autoStartEom ? "eom-shadow-running" : "eom-shadow-stopped"
      : "eom-idle",
    dynamicRunnerMessage: initialEomSeed
      ? autoStartEom
        ? "exact polynomial initial history ready; forward EOM evolution pending"
        : "exact polynomial initial history ready; forward EOM evolution not started"
      : "no initial history loaded; start a run to compute EOM evolution",
    dynamicRunnerKind: initialEomSeed
      ? autoStartEom ? "eom-shadow" : "eom-seed-idle"
      : "eom-idle",
    dynamicRunner: null,
    dynamicChunkPromise: null,
    dynamicChunkStartedAt: null,
    dynamicChunksComputed: 0,
    eomDisplayStarted: false,
    eomSeedHistoryDepth: positiveControlNumber(
      options.eomShadowRunner?.historyDepth,
      manifest.simulationEnvelope?.historyDepth ?? 10,
    ),
    eomCoreScale: positiveControlNumber(
      getBorgCertifiedBudgetPreset(
        options.eomShadowRunner?.certifiedBudgetId ??
          BORG_DEFAULT_CERTIFIED_BUDGET_ID,
      ).allocations.finiteWidth.coreScale,
      0.2,
    ),
    eomRetainedHistoryStart: initialEomSeed?.certificate?.historyStartTime ?? null,
    eomRetainedHistoryEnd: initialEomSeed?.certificate?.historyEndTime ?? null,
    eomRetainedHistoryPolicy: initialEomSeed
      ? "causal-seed-history-only"
      : "not-started",
    eomEvolutionClaimLevel: initialEomSeed
      ? "eom-evolution-conditioned-on-accepted-initial-history"
      : "not-applicable",
    dynamicTargetDuration: null,
    dynamicChunkDuration: null,
    dynamicRunGeneration: 0,
    eomPathCount: boundedInteger(
      options.eomShadowRunner?.pathCount,
      manifest.population?.architrinoCount ?? 1,
      1,
      manifest.population?.maximumArchitrinoCount ?? BORG_MAX_INITIAL_ARCHITRINO_COUNT,
    ),
    eomRunDuration: positiveControlNumber(
      options.eomShadowRunner?.runDuration ??
        Number(options.eomShadowRunner?.targetDuration) - Number(options.eomShadowRunner?.startTime),
      60,
    ),
    eomCoupling: positiveControlNumber(
      options.eomShadowRunner?.coupling,
      manifest.modelControls?.coupling ?? 1,
    ),
    eomCertifiedBudgetId: getBorgCertifiedBudgetPreset(
      options.eomShadowRunner?.certifiedBudgetId ??
        BORG_DEFAULT_CERTIFIED_BUDGET_ID,
    ).id,
    eomStepHeight: positiveControlNumber(
      options.eomShadowRunner?.maximumStep ?? options.eomShadowRunner?.initialStep,
      0.025,
    ),
    eomMinimumStep: positiveControlNumber(
      options.eomShadowRunner?.minimumStep,
      0.0001,
    ),
    polarityDiagnostics: null,
    polarityDiagnosticFrameIndex: null,
    liveRunBudget: createEmptyLiveRunBudget(),
    compactedPathHistory: Object.freeze({}),
    liveRunRetention: createBorgLiveRunRetentionSnapshot({ frameRows: currentFrames }),
    measuredRunPresetCalibration: createMeasuredRunPresetCalibration({
      basePresets: RUN_CONTROL_PRESETS,
    }),
    distributionFrameRows: initialEomSeed?.rows ?? null,
    eomSeedEndpointRows: initialEomSeed?.endpointRows ?? null,
    eomSeedCertificate: initialEomSeed?.certificate ?? null,
    distributionSeedIndex: initialDistributionSeedIndex,
    distributionLabel: initialEomSeed
      ? `accepted inertial EOM seed ${initialDistributionSeedIndex}`
      : DEFAULT_DISTRIBUTION_LABEL,
    initialConditionConfig: createBorgInitialConditionConfig(
      options.initialConditionConfig ?? manifest.initialConditions,
    ),
    initialConditionEditStatus: initialEomSeed
      ? "accepted-initial-datum-active"
      : "manifest-values-active",
    resizeObserver: null,
    replayDisplayMode: activeReplayEntry?.dataset.provenance.claimGrade === "chart-hypothesis"
      ? "chart-pose"
      : "animated",
    replayStrobeEnabled: false,
    replayStrobeFrequency: null,
    replayLoopEnabled: false,
    replayLoopPeriod: null,
    pathTrailDuration: activeReplayEntry?.dataset.window.delayHorizon ??
      HIGHLIGHTED_PATH_HISTORY_DURATION,
  };

  const assemblyViewScene = createBorgAssemblyViewScene({
    group: assemblyContentGroup,
    toWorld: writeSolverPositionToWorld,
    render,
  });
  if (activeReplayEntry) {
    assemblyViewScene.setRecord(activeReplayEntry);
  }
  let assemblyViewControls = null;

  const diagnosticsPanelController = createBorgDiagnosticsPanelController({
    panel: dom.diagnosticsPanel,
    toggleButton: dom.diagnosticsToggle,
    render: renderDiagnosticsPanel,
  });

  resetPolarityDiagnosticsHistory();
  buildScene();
  renderStaticPanels();
  renderLayerStrip();
  configureTimeline();
  configureInitialConditionControls();
  configureEomControls();
  configureAssemblyViewControls();
  resetView();
  bindEvents();
  updateLayerVisibility();
  updateFrame(state.activeFrameIndex);
  setPlayButtonPresentation(false);
  resize();
  if (autoStartEom) {
    if (replayActive) {
      startRunAndPlayback();
    } else {
      startDynamicNativeRunner();
    }
  }

  return {
    manifest,
    surfaceDesign,
    setFrame: updateFrame,
    resetView,
    diagnosticsPanel: diagnosticsPanelController,
    assemblyViewSession,
    dispose,
  };

  function buildScene() {
    rebuildBoundaryShell();

    rebuildPathTrails();

    rebuildParticleObjects();
  }

  function rebuildBoundaryShell() {
    boundaryShellGroup.children.slice().forEach((object) => {
      boundaryShellGroup.remove(object);
      object.geometry?.dispose?.();
      object.material?.dispose?.();
    });
    boundaryShellGroup.add(
      createBoundaryShellPoints({
        radius: borgEnvelopeRadius(manifest),
        color: ENVELOPE_GUIDE_COLOR,
        opacity: ENVELOPE_GUIDE_OPACITY,
      }),
    );
  }

  function rebuildParticleObjects() {
    disposeParticleObjects();
    particleStyles.clear();
    createParticleStyles(currentFrames).forEach((style, pathKey) => {
      particleStyles.set(pathKey, style);
    });

    getPathKeys().forEach((pathKey) => {
      const style = getParticleStyle(pathKey, particleStyles);
      const material = new THREE.PointsMaterial({
        color: style.color,
        map: architrinoPointTexture,
        size: ARCHITRINO_POINT_PIXEL_SIZE,
        sizeAttenuation: false,
        alphaTest: 0.5,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });
      const point = new THREE.Points(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3()]),
        material,
      );
      point.userData.pathKey = pathKey;
      point.userData.kind = "architrino";
      point.renderOrder = ARCHITRINO_RENDER_ORDER;
      pointGroup.add(point);
      particleObjects.set(pathKey, point);

      const velocityMaterial = new THREE.LineBasicMaterial({
        color: style.velocityColor ?? style.color,
        transparent: true,
        opacity: 0.96,
      });
      const velocityGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(),
        new THREE.Vector3(1, 0, 0),
      ]);
      velocityGeometry.getAttribute("position").setUsage(THREE.DynamicDrawUsage);
      const velocityLine = new THREE.Line(velocityGeometry, velocityMaterial);
      // Endpoints are rewritten in place every frame; a cached bounding sphere
      // would cull the line once the architrino leaves its initial bounds.
      velocityLine.frustumCulled = false;
      velocityLine.visible = false;
      velocityGroup.add(velocityLine);
      velocityLines.set(pathKey, velocityLine);
    });
  }

  function disposeParticleObjects() {
    state.selectedPathKey = null;
    particleObjects.forEach((point) => {
      pointGroup.remove(point);
      point.geometry.dispose();
      point.material.dispose();
    });
    velocityLines.forEach((line) => {
      velocityGroup.remove(line);
      line.geometry.dispose();
      line.material.dispose();
    });
    particleObjects.clear();
    velocityLines.clear();
  }

  function createBoundaryShellPoints({ radius, color, opacity }) {
    const worldRadius = radius * worldUnitsPerSolverUnit;
    const points = [];
    for (let latIndex = 0; latIndex < BOUNDARY_SHELL_LATITUDE_COUNT; latIndex += 1) {
      const theta = (latIndex / (BOUNDARY_SHELL_LATITUDE_COUNT - 1)) * Math.PI;
      const y = Math.cos(theta) * worldRadius;
      const ringRadius = Math.sin(theta) * worldRadius;
      for (let lonIndex = 0; lonIndex < BOUNDARY_SHELL_LONGITUDE_COUNT; lonIndex += 1) {
        const phi = (lonIndex / BOUNDARY_SHELL_LONGITUDE_COUNT) * Math.PI * 2;
        points.push(new THREE.Vector3(
          Math.cos(phi) * ringRadius,
          y,
          Math.sin(phi) * ringRadius,
        ));
      }
    }
    const material = new THREE.PointsMaterial({
      color,
      size: 0.022,
      transparent: true,
      opacity,
      depthWrite: false,
    });
    return new THREE.Points(
      new THREE.BufferGeometry().setFromPoints(points),
      material,
    );
  }

  function renderStaticPanels() {
    updateSourceStatusPresentation();
    dom.manifestStatus.textContent = replayActive
      ? activeReplayEntry.dataset.provenance.claimGrade === "chart-hypothesis"
        ? "Chart hypothesis"
        : "Evolved record"
      : "Developer test";
    dom.manifestStatus.dataset.status = replayActive
      ? activeReplayEntry.dataset.provenance.claimGrade
      : surfaceDesign.claimLevel;
    dom.manifestStatus.title = replayActive
      ? "Record claim grade; replay does not independently verify it."
      : surfaceDesign.claimLevel;
    setTone(dom.manifestStatus, replayActive ? "recorded-eom-output" : "app-facing-projection");

    renderSourceFields();
    renderEnvelopeFields();
    renderInitialConditionFields();
  }

  function renderDiagnosticsPanel() {
    if (!replayActive) {
      updatePolarityDiagnostics();
    }
    renderDiagnosticFields();
    renderFailClosedRows();
    renderFieldRows(
      dom.authorityFields,
      [
        ["frameAuthority", replayActive ? "recorded-eom-output" : "eom-shadow-output"],
        ["replayAuthority", replayActive
          ? "viewing creates no evidence and performs no independent verification"
          : "not-applicable"],
        ...Object.entries(surfaceDesign.authorityMap).map(([key, value]) => [key, value]),
      ],
    );
    renderFieldRows(dom.renderFields, [
      ["renderPixelSize", surfaceDesign.firstViewport.renderPixelSize],
      ["visualQualityMode", manifest.renderManifests[0]?.visualQualityMode ?? "not-measured"],
      ["renderStatus", manifest.renderManifests[0]?.renderStatus ?? "not-measured"],
      ["viewportCssSize", manifest.renderManifests[0]?.viewportCssSize ?? "not-measured"],
    ]);
    renderDeploymentFields();
  }

  function refreshDiagnosticsPanel() {
    diagnosticsPanelController.renderIfOpen();
  }

  function resetPolarityDiagnosticsHistory() {
    polarityEscapeLedger.reset();
    if (!replayActive) {
      appendPolarityEscapeRows(currentFrames);
    }
    state.polarityDiagnostics = null;
    state.polarityDiagnosticFrameIndex = null;
  }

  function appendPolarityEscapeRows(frameRows) {
    if (replayActive) {
      return;
    }
    polarityEscapeLedger.appendFrameRows(frameRows, {
      center: manifest.simulationEnvelope.center,
      radius: borgEnvelopeRadius(manifest),
    });
  }

  function updatePolarityDiagnostics() {
    const rawFrameSet = frameSets.find(
      (frameSet) => frameSet.frameIndex === state.activeFrameIndex,
    ) ?? frameSets.at(-1);
    if (!rawFrameSet) {
      state.polarityDiagnostics = null;
      state.polarityDiagnosticFrameIndex = null;
      return;
    }
    if (state.polarityDiagnosticFrameIndex === rawFrameSet.frameIndex) {
      return;
    }
    const sphereRadius = borgEnvelopeRadius(manifest);
    state.polarityDiagnostics = calculateBorgPolarityDiagnostics({
      frames: rawFrameSet.frames,
      center: manifest.simulationEnvelope.center,
      radius: sphereRadius,
      coreScale: state.eomCoreScale,
      escapeLedger: polarityEscapeLedger,
      frameIndex: rawFrameSet.frameIndex,
      time: rawFrameSet.time,
    });
    state.polarityDiagnosticFrameIndex = rawFrameSet.frameIndex;
  }

  function renderDeploymentFields() {
    const budget = state.liveRunBudget;
    const calibration = state.measuredRunPresetCalibration;
    const releaseBudget = BORG_RELEASE_BUDGET_MANIFEST_V1;
    const releaseCeilings = releaseBudget.releaseBudgetCeilings;
    renderFieldRows(dom.deploymentFields, [
      ["deploymentBudgetStatus", manifest.deploymentBudget.deploymentBudgetStatus],
      ["bundleSizeBytes", manifest.deploymentBudget.bundleSizeBytes ?? "not-measured"],
      ["staticAssetTransferBytes", manifest.deploymentBudget.staticAssetTransferBytes ?? "not-measured"],
      ["browserHeapBudget", manifest.deploymentBudget.browserHeapBudget ?? "not-measured"],
      ["gpuMemoryBudget", manifest.deploymentBudget.gpuMemoryBudget ?? "not-measured"],
      ["nativeSolverThroughput", "not-measured"],
      ["liveRunBudget", budget.schema],
      ["liveBudgetStatus", budget.status],
      ["lastChunkMs", budget.lastChunkWallTimeMs ?? "not-measured"],
      ["chunkFrameRows", budget.computedFrameRows ?? "not-measured"],
      ["appendRowsPerSec", budget.frameAppendRateRowsPerSecond ?? "not-measured"],
      ["heapGrowthBytes", budget.browserHeapGrowthBytes ?? budget.browserHeapAuthority],
      ["workerMemoryBytes", budget.wasmWorkerMemoryEstimateBytes ?? budget.wasmWorkerMemoryAuthority],
      ["workerBudgetPressure", budget.wasmWorkerMemoryPressure ?? "not-measured"],
      ["liveRunRetention", BORG_LIVE_RUN_RETENTION_POLICY_V1.schema],
      ["retentionStatus", state.liveRunRetention.status],
      ["retentionFrameLimit", state.liveRunRetention.retainedFrameSetLimit],
      ["measuredRunPresets", calibration.schema],
      ["presetThresholdStatus", calibration.status],
      ["presetThresholdAuthority", calibration.thresholdAuthority],
      ["presetSamples", calibration.sampleCount],
      ["targetDurationLimit", calibration.thresholds.maxTargetDuration],
      ["chunkDurationLimit", calibration.thresholds.maxChunkDuration],
      ["releaseBudgetManifest", releaseBudget.manifestId],
      ["releaseBudgetStatus", releaseBudget.status],
      ["releaseBudgetAuthority", releaseBudget.valueAuthority],
      ["releaseBudgetSamples", releaseBudget.sampleMatrix.sampleCount],
      ["releaseMaxChunkMs", releaseCeilings.maxChunkWallTimeMs],
      ["releaseMinAppendRowsSec", releaseCeilings.minFrameAppendRateRowsPerSecond],
      ["releaseWorkerChunkBytes", releaseCeilings.maxChunkWorkerMemoryBytes],
      ["releaseRunHeapBytes", releaseCeilings.maxRunHeapGrowthBytes],
      ["releaseMaxTarget", releaseCeilings.maxTargetDuration],
      ["releaseMaxChunk", releaseCeilings.maxChunkDuration],
    ]);
  }

  function renderSourceFields() {
    const activePreset = getRunControlPreset(state.runControlPresetId);
    const placement = createBorgPlacementPolicy(
      manifest,
      state.initialConditionConfig.electrinoCount +
        state.initialConditionConfig.positrinoCount,
    );
    renderFieldRows(dom.sourceFields, [
      ["Run source", state.sourceMode],
      ["Run mode", formatRunDurationLabel(activePreset)],
      ["Playback rate", `${formatBorgRealtimeRate(state.playbackAdaptiveRate)}× realtime`],
      ["Measured production rate", state.playbackMeasuredProductionRate == null
        ? "not-measured"
        : `${formatBorgRealtimeRate(state.playbackMeasuredProductionRate)}× realtime`],
      ["Finite duration", state.eomRunDuration],
      ["Preset basis", activePreset?.thresholdAuthority ?? "not-measured"],
      ["Preset target", formatRunTargetDuration(activePreset)],
      ["Preset chunk", activePreset?.effectiveChunkDuration ?? "static"],
      ["Distribution", state.distributionLabel],
      ["Active electrinos", state.initialConditionConfig.electrinoCount],
      ["Active positrinos", state.initialConditionConfig.positrinoCount],
      ["EOM coupling κ", state.eomCoupling],
      ["Per-axis speed maximum", state.initialConditionConfig.randomVelocityMaxComponentMagnitude],
      ["Total-speed minimum", state.initialConditionConfig.randomVelocityMinSpeed],
      ["Required initial separation", placement.minimumPairSeparation],
      ["Measured initial separation", state.eomSeedCertificate?.geometryCertificate?.measuredMinimumSeparation ?? "not-certified"],
      ["Run budget", state.liveRunBudget.status],
      ["Forward EOM status", state.dynamicRunnerStatus],
      ["Runner kind", state.dynamicRunnerKind],
      ["EOM architrinos", options.eomShadowRunner ? state.eomPathCount : "not-applicable"],
      ["EOM ordered pairs", options.eomShadowRunner ? state.eomPathCount ** 2 : "not-applicable"],
      ["EOM requested duration", options.eomShadowRunner ? state.eomRunDuration : "not-applicable"],
      ["Forward EOM target", state.dynamicTargetDuration ?? "not-started"],
      ["Forward EOM chunk duration", state.dynamicChunkDuration ?? "not-started"],
      ["Forward EOM chunks", state.dynamicChunksComputed],
      ["Causal seed-history depth", options.eomShadowRunner ? state.eomSeedHistoryDepth : "not-applicable"],
      ["EOM retained-history policy", state.eomRetainedHistoryPolicy],
      ["EOM retained-history start", state.eomRetainedHistoryStart ?? "not-started"],
      ["EOM retained-history end", state.eomRetainedHistoryEnd ?? "not-started"],
      ["Core scale εc", options.eomShadowRunner ? state.eomCoreScale : "not-applicable"],
      ["Far-field enclosure", "certified policy"],
      ["Forward-evolution claim", options.eomShadowRunner ? state.eomEvolutionClaimLevel : "not-applicable"],
      ["Initial-history certificate", state.eomSeedCertificate?.schema ?? "not-applicable"],
      ["Initial-history acceptance", state.eomSeedCertificate?.acceptanceScope ?? "not-applicable"],
      ["Initial history is EOM evidence", state.eomSeedCertificate?.canonicalEomEvidence ?? "not-applicable"],
      ["Initial-history SHA-256", state.eomSeedCertificate?.contentSha256 ?? "not-applicable"],
      ["Retention", state.liveRunRetention.status],
      ["Retained frames", state.liveRunRetention.retainedFrameRows],
      ["Retained keyframes", state.liveRunRetention.retainedFrameSetCount],
      ["Compacted path points", state.liveRunRetention.compactedPathPointCount],
      ["Forward EOM message", state.dynamicRunnerMessage],
      ["Manifest", manifest.manifestId],
      ["Source claim", manifest.claimLevel],
      ["Frame rows", currentFrames.length],
      ["Native keyframes", frameSets.length],
      ["Sample interval", activeSampleInterval()],
      ["Playback source", state.sourceMode],
      ["Initial layout", manifest.initialConditions.initialLinePolicy],
    ]);
  }

  function renderEnvelopeFields() {
    const runtimePopulationCount = state.distributionFrameRows
      ? new Set(state.distributionFrameRows.map((row) => row.pathKey)).size
      : null;
    const runtimeHistoryDepth = positiveControlNumber(
      state.dynamicRunner?.config?.historyDepth ?? options.eomShadowRunner?.historyDepth,
      manifest.simulationEnvelope.historyDepth,
    );
    const runtimeWakeHorizon = manifest.simulationEnvelope.fieldSpeed * runtimeHistoryDepth;
    renderFieldRows(dom.envelopeFields, [
      ["outerRadius", borgEnvelopeRadius(manifest)],
      ["sampleInterval", activeSampleInterval()],
      ["seedHistoryDepth", runtimeHistoryDepth],
      ["fieldSpeed", manifest.simulationEnvelope.fieldSpeed],
      ["coupling", state.eomCoupling],
      ["seedWakeHorizon", runtimeWakeHorizon],
      ["architrinoCount", runtimePopulationCount ?? manifest.population.architrinoCount],
    ]);
  }

  function renderInitialConditionFields() {
    const config = state.initialConditionConfig;
    const certifiedBudget = getBorgCertifiedBudgetPreset(
      state.eomCertifiedBudgetId,
    );
    const placement = createBorgPlacementPolicy(
      manifest,
      config.electrinoCount + config.positrinoCount,
    );
    const activeInitialRow = state.eomSeedEndpointRows?.[0] ?? state.distributionFrameRows?.[0];
    const activeFamily = activeInitialRow
      ? "seeded-random-minimum-separation"
      : manifest.initialConditions.initialConditionFamily;
    renderFieldRows(dom.initialConditionFields, [
      ["family", activeFamily],
      ["seed", state.distributionFrameRows ? state.distributionLabel : manifest.initialConditions.initialConditionSeed ?? "null"],
      ["electrinoCount", config.electrinoCount],
      ["positrinoCount", config.positrinoCount],
      ["coupling κ", state.eomCoupling],
      ["certifiedBudget", certifiedBudget.label],
      ["budgetAllocationHash", certifiedBudget.allocationHash],
      ["stepHeight", state.eomStepHeight],
      ["adaptiveMinimumStep", state.eomMinimumStep],
      ["velocityPolicy", manifest.initialConditions.velocityPolicy],
      ["maxPerAxisSpeed", config.randomVelocityMaxComponentMagnitude],
      ["minimumTotalSpeed", config.randomVelocityMinSpeed],
      ["minimumPairSeparation", placement.minimumPairSeparation],
      ["measuredMinimumSeparation", state.eomSeedCertificate?.geometryCertificate?.measuredMinimumSeparation ?? "not-certified"],
      ["velocity rays", "off"],
      ["customEditStatus", state.initialConditionEditStatus],
    ]);
  }

  function renderDiagnosticFields() {
    const diagnostics = state.polarityDiagnostics;
    renderFieldRows(dom.diagnosticsFields, [
      ["proof claim", manifest.validation.proofClaimStatus],
      ["diagnostic authority", diagnostics?.authority ?? "not-measured"],
      ["raw EOM keyframe", diagnostics?.frameIndex ?? "not-measured"],
      ["diagnostic time", diagnostics?.time ?? "not-measured"],
      ["sphere radius", diagnostics?.sphereRadius ?? "not-measured"],
      ["electrinos outside sphere now", diagnostics?.outsideNow.electrino ?? "not-measured"],
      ["positrinos outside sphere now", diagnostics?.outsideNow.positrino ?? "not-measured"],
      ["electrinos escaped by time", diagnostics?.escapedThroughTime.electrino ?? "not-measured"],
      ["positrinos escaped by time", diagnostics?.escapedThroughTime.positrino ?? "not-measured"],
      ["close-pair threshold εc", diagnostics?.closePairThreshold ?? "not-measured"],
      ["close metric", diagnostics
        ? "fraction of unordered pairs inside core scale εc"
        : "not-measured"],
      ["electrino close-pair fraction", formatDiagnosticPercent(
        diagnostics?.pairs.electrino.closeFraction,
      )],
      ["positrino close-pair fraction", formatDiagnosticPercent(
        diagnostics?.pairs.positrino.closeFraction,
      )],
      ["all same-polarity close fraction", formatDiagnosticPercent(
        diagnostics?.pairs.same.closeFraction,
      )],
      ["opposite-polarity close fraction", formatDiagnosticPercent(
        diagnostics?.pairs.opposite.closeFraction,
      )],
      ["same / opposite close ratio", diagnostics?.sameToOppositeCloseRatio ?? "not-measured"],
      ["same - opposite close fraction", formatDiagnosticPercentagePoints(
        diagnostics?.sameMinusOppositeCloseFraction,
      )],
      ["same-polarity mean separation", diagnostics?.pairs.same.meanSeparation ?? "not-measured"],
      ["opposite-polarity mean separation", diagnostics?.pairs.opposite.meanSeparation ?? "not-measured"],
    ]);
  }

  function renderFieldRows(container, rows) {
    container.textContent = "";
    rows.forEach(([label, value]) => {
      const row = documentLike.createElement("div");
      row.className = "borg-field-row";
      const labelElement = documentLike.createElement("span");
      labelElement.className = "borg-field-label";
      labelElement.textContent = label;
      const valueElement = documentLike.createElement("span");
      valueElement.className = "borg-field-value";
      valueElement.textContent = formatValue(value);
      row.append(labelElement, valueElement);
      container.append(row);
    });
  }

  function renderFailClosedRows() {
    dom.failClosedList.textContent = "";
    BORG_FAIL_CLOSED_ROWS.forEach((row) => {
      const item = documentLike.createElement("li");
      item.className = "borg-failure-row";
      const code = documentLike.createElement("span");
      code.className = "borg-failure-code";
      code.textContent = row.firstFailureCode;
      const authority = documentLike.createElement("span");
      authority.className = "borg-status-chip";
      authority.textContent = row.valueAuthority;
      setTone(authority, row.valueAuthority);
      item.append(code, authority);
      dom.failClosedList.append(item);
    });
  }

  function renderLayerStrip() {
    dom.layerStrip.textContent = "";
    surfaceDesign.layerStrip.filter((layer) => !HIDDEN_LAYER_BUTTONS.has(layer.layer)).forEach((layer) => {
      const button = documentLike.createElement("button");
      button.className = "borg-layer-button";
      button.type = "button";
      button.dataset.layer = layer.layer;
      button.textContent = LAYER_LABELS[layer.layer] ?? layer.layer;
      button.title = `${LAYER_TITLES[layer.layer] ?? layer.layer}: ${layer.state}`;
      button.setAttribute("aria-label", `${layer.layer} layer`);
      button.disabled = layer.state === "disabled" || layer.state === "contextual-disabled";
      if (layer.state === "on-locked") {
        button.dataset.locked = "true";
      }
      button.addEventListener("click", () => toggleLayer(layer.layer));
      dom.layerStrip.append(button);
    });
    syncLayerButtons();
  }

  function configureTimeline() {
    updateTimelineBounds();
    syncRunDurationButton();
    dom.playbackSpeed.textContent = "";
    PLAYBACK_SPEED_PRESETS.forEach((preset) => {
      const option = documentLike.createElement("option");
      option.value = preset.id;
      option.textContent = preset.label;
      dom.playbackSpeed.append(option);
    });
    dom.playbackSpeed.value = state.playbackSpeedPresetId;
  }

  function configureInitialConditionControls() {
    const maximumPopulation = options.eomShadowRunner
      ? manifest.population?.maximumArchitrinoCount ?? BORG_MAX_INITIAL_ARCHITRINO_COUNT
      : BORG_MAX_INITIAL_ARCHITRINO_COUNT;
    dom.electrinoCount.max = String(maximumPopulation);
    dom.positrinoCount.max = String(maximumPopulation);
    dom.certifiedBudget.textContent = "";
    BORG_CERTIFIED_BUDGET_PRESETS.forEach((preset) => {
      const option = documentLike.createElement("option");
      option.value = preset.id;
      option.textContent = preset.label;
      dom.certifiedBudget.append(option);
    });
    dom.stepHeight.disabled = true;
    dom.minimumStep.disabled = true;
    syncInitialConditionInputs();
    setInitialConditionFeedback("Manifest values active", "accepted");
  }

  function syncInitialConditionInputs() {
    const config = state.initialConditionConfig;
    dom.electrinoCount.value = String(config.electrinoCount);
    dom.positrinoCount.value = String(config.positrinoCount);
    dom.coupling.value = String(state.eomCoupling);
    dom.certifiedBudget.value = state.eomCertifiedBudgetId;
    dom.stepHeight.value = String(state.eomStepHeight);
    dom.minimumStep.value = String(state.eomMinimumStep);
    dom.velocityMaxComponent.value = String(config.randomVelocityMaxComponentMagnitude);
    dom.velocityMinSpeed.value = String(config.randomVelocityMinSpeed);
  }

  function readInitialConditionControls() {
    const certifiedBudget = getBorgCertifiedBudgetPreset(
      dom.certifiedBudget.value,
    );
    const coupling = Number(dom.coupling.value);
    if (!Number.isFinite(coupling) || coupling <= 0) {
      state.initialConditionEditStatus = "rejected-runtime-edit";
      setInitialConditionFeedback("κ coupling must be a number greater than zero.", "bad");
      renderInitialConditionFields();
      return null;
    }
    const stepHeight = Number(
      certifiedBudget.allocations.controller.maximumStep,
    );
    const minimumStep = Number(
      certifiedBudget.allocations.controller.minimumStep,
    );
    const chunkDuration = positiveControlNumber(
      options.eomShadowRunner?.chunkDuration,
      options.eomShadowRunner?.sampleInterval ?? 0.01,
    );
    if (!Number.isFinite(minimumStep) || minimumStep <= 0) {
      state.initialConditionEditStatus = "rejected-runtime-edit";
      setInitialConditionFeedback("Adaptive minimum must be a number greater than zero.", "bad");
      renderInitialConditionFields();
      return null;
    }
    if (!Number.isFinite(stepHeight) || stepHeight < minimumStep || stepHeight > chunkDuration) {
      state.initialConditionEditStatus = "rejected-runtime-edit";
      setInitialConditionFeedback(
        `Step height must be at least the adaptive minimum and no greater than the ${chunkDuration} chunk length.`,
        "bad",
      );
      renderInitialConditionFields();
      return null;
    }
    const validation = validateBorgInitialConditionConfig(
      {
        electrinoCount: dom.electrinoCount.value,
        positrinoCount: dom.positrinoCount.value,
        randomVelocityMaxComponentMagnitude: dom.velocityMaxComponent.value,
        randomVelocityMinSpeed: dom.velocityMinSpeed.value,
      },
      {
        maximumTotalCount: options.eomShadowRunner
          ? manifest.population?.maximumArchitrinoCount ?? BORG_MAX_INITIAL_ARCHITRINO_COUNT
          : BORG_MAX_INITIAL_ARCHITRINO_COUNT,
      },
    );
    if (!validation.ok) {
      state.initialConditionEditStatus = "rejected-runtime-edit";
      setInitialConditionFeedback(validation.errors[0], "bad");
      renderInitialConditionFields();
      return null;
    }
    state.initialConditionConfig = validation.config;
    state.eomCoupling = coupling;
    state.eomCertifiedBudgetId = certifiedBudget.id;
    state.eomCoreScale = Number(
      certifiedBudget.allocations.finiteWidth.coreScale,
    );
    state.eomStepHeight = stepHeight;
    state.eomMinimumStep = minimumStep;
    state.eomPathCount = validation.config.electrinoCount + validation.config.positrinoCount;
    state.initialConditionEditStatus = "accepted-runtime-edit";
    syncInitialConditionInputs();
    return validation.config;
  }

  function setInitialConditionFeedback(message, tone) {
    dom.initialConditionFeedback.value = message;
    dom.initialConditionFeedback.textContent = message;
    dom.initialConditionFeedback.dataset.tone = tone;
  }

  function markInitialConditionControlsPending() {
    state.initialConditionEditStatus = "pending-runtime-edit";
    setInitialConditionFeedback("Pending changes; apply to start a new run", "pending");
    renderInitialConditionFields();
  }

  function configureEomControls() {
    const enabled = Boolean(options.eomShadowRunner) && !replayActive;
    dom.eomControls.hidden = !enabled;
    if (!enabled) {
      return;
    }
    dom.eomDuration.min = String(options.eomShadowRunner?.sampleInterval ?? 0.01);
    dom.eomDuration.step = String(options.eomShadowRunner?.sampleInterval ?? 0.01);
    dom.eomDuration.value = String(state.eomRunDuration);
    updateEomControlPresentation();
  }

  function configureAssemblyViewControls() {
    dom.envelopeSection.hidden = replayActive;
    if (!replayActive) {
      dom.replayControls.hidden = true;
      dom.modeBoundary.dataset.mode = "simulation-workspace";
      dom.modeLabel.textContent = "Simulation workspace";
      dom.modeDetail.textContent =
        "Initial conditions and EOM solver runs remain separate from record-only replay.";
      return;
    }
    dom.newDistributionButton.disabled = true;
    dom.newDistributionButton.title =
      "Disabled in assembly-view replay; replay cannot mutate workspace initial conditions.";
    dom.runDurationButton.disabled = true;
    dom.initialConditionForm.querySelectorAll?.("input, select, button").forEach((control) => {
      control.disabled = true;
    });
    assemblyViewControls = createBorgAssemblyViewControls({
      documentLike,
      session: assemblyViewSession,
      dom: {
        controls: dom.replayControls,
        modeBoundary: dom.modeBoundary,
        modeLabel: dom.modeLabel,
        modeDetail: dom.modeDetail,
        authorityNotice: dom.replayAuthorityNotice,
        provenance: dom.replayProvenance,
        recordSelect: dom.replayRecordSelect,
        displayMode: dom.replayDisplayMode,
        cameraMode: dom.replayCameraMode,
        strobeFrequency: dom.replayStrobeFrequency,
        strobeButton: dom.replayStrobeButton,
        loopButton: dom.replayLoopPeriod,
        exportButton: dom.replayExport,
        filterField: dom.replayFilterField,
        filterValue: dom.replayFilterValue,
        grouping: dom.replayGrouping,
        comparison: dom.replayComparison,
        feedback: dom.replayFeedback,
        overlayFields: dom.replayOverlayFields,
      },
      onRecordChange: switchReplayRecord,
      onDisplayModeChange: setReplayDisplayMode,
      onCameraModeChange: (mode) => assemblyViewScene.setCameraMode(mode),
      onStrobeChange(enabled, frequency) {
        state.replayStrobeEnabled = enabled;
        state.replayStrobeFrequency = enabled ? frequency : null;
        updateFrame(state.activeFrameIndex);
      },
      onLoopChange(enabled, period) {
        state.replayLoopEnabled = enabled;
        state.replayLoopPeriod = enabled ? period : null;
      },
      onExport: exportReplayImage,
    });
  }

  function setReplayDisplayMode(mode) {
    if (!replayActive) {
      return;
    }
    if (activeReplayEntry.dataset.provenance.claimGrade === "chart-hypothesis" && mode === "animated") {
      throw new TypeError("Chart-hypothesis records open as static chart poses; animated evolution is unavailable.");
    }
    state.replayDisplayMode = mode;
    assemblyViewScene.setDisplayMode(mode);
    if (mode !== "animated") {
      stopPlayback();
      updateFrame(frameSets[0]?.frameIndex ?? state.activeFrameIndex);
    }
    updateTimelineBounds();
  }

  function switchReplayRecord(entry) {
    stopPlayback();
    disposeDynamicRunner();
    activeReplayEntry = entry;
    state.replayDisplayMode = entry.dataset.provenance.claimGrade === "chart-hypothesis"
      ? "chart-pose"
      : "animated";
    state.replayStrobeEnabled = false;
    state.replayStrobeFrequency = null;
    state.replayLoopEnabled = false;
    state.replayLoopPeriod = null;
    state.pathTrailDuration = entry.dataset.window.delayHorizon;
    assemblyViewScene.setRecord(entry);
    assemblyViewScene.setDisplayMode(state.replayDisplayMode);
    resetDynamicRunState();
    renderStaticPanels();
    startDynamicNativeRunner();
  }

  function exportReplayImage() {
    if (!replayActive) {
      return;
    }
    render();
    const dataUrl = renderer.domElement?.toDataURL?.("image/png");
    if (!dataUrl) {
      assemblyViewControls?.setFeedback(
        "Static image export is unavailable because this renderer cannot provide a PNG snapshot.",
        "bad",
      );
      return;
    }
    const link = documentLike.createElement("a");
    link.href = dataUrl;
    link.download = `${activeReplayEntry.sourceId}-assembly-view.png`;
    link.click();
    assemblyViewControls?.setFeedback(
      `Exported ${activeReplayEntry.sourceId} at recorded time ${activeFrameTime()}.`,
    );
  }

  function updateEomControlPresentation() {
    if (!options.eomShadowRunner) {
      return;
    }
    const chunkDuration = positiveControlNumber(
      options.eomShadowRunner.chunkDuration,
      options.eomShadowRunner.sampleInterval ?? 0.01,
    );
    const forever = isForeverRunPreset(getRunControlPreset(state.runControlPresetId));
    const liveChunksComputed = state.dynamicChunksComputed;
    const requestedSteps = Math.max(1, Math.ceil(state.eomRunDuration / chunkDuration));
    const completedSteps = forever
      ? liveChunksComputed
      : Math.min(requestedSteps, liveChunksComputed);
    const displayStatus = ({
      "eom-shadow-running": "running",
      "computed-eom-shadow-chunks": "running",
      "completed-live-native-run": "complete",
      "eom-shadow-stopped": "stopped",
      "live-native-error": "failed",
    })[state.dynamicRunnerStatus] ?? state.dynamicRunnerStatus;
    dom.eomDuration.disabled = forever;
    dom.eomProgress.hidden = forever;
    if (forever) {
      dom.eomProgress.max = "1";
      dom.eomProgress.value = "0";
    } else {
      dom.eomProgress.max = String(requestedSteps);
      dom.eomProgress.value = String(completedSteps);
    }
    const failureDetail = displayStatus === "failed"
      ? ` | ${state.dynamicRunnerMessage}`
      : "";
    const progressLabel = forever
      ? `${completedSteps} forward EOM chunks | ${displayStatus} | Forever`
      : `${completedSteps} / ${requestedSteps} forward EOM chunks | ${displayStatus}`;
    dom.eomProgressLabel.value = `${progressLabel}${failureDetail}`;
    const eomStartTime = options.eomShadowRunner?.startTime ?? 0;
    dom.eomHistoryStatus.value =
      `Exact polynomial causal seed history (C1 inertial) covers T=${Number(eomStartTime) - state.eomSeedHistoryDepth} to ${eomStartTime}. ` +
      "It is certified input, not EOM output. Computed motion after T=0 is appended as the separately evolving retained history.";
    dom.eomHistoryStatus.textContent = dom.eomHistoryStatus.value;
    dom.eomStopButton.disabled = !state.dynamicRunner && !state.dynamicChunkPromise;
  }

  function readEomControlValues() {
    state.eomRunDuration = positiveControlNumber(
      dom.eomDuration.value,
      state.eomRunDuration,
    );
    dom.eomDuration.value = String(state.eomRunDuration);
  }

  function syncRunDurationButton() {
    if (replayActive) {
      dom.runDurationButton.textContent = "Recorded coverage";
      dom.runDurationButton.dataset.runDuration = "recorded-coverage";
      dom.runDurationButton.setAttribute("aria-label", "Run mode: recorded coverage");
      dom.runDurationButton.title =
        "Assembly-view replay is clamped to the sealed record's coverage.";
      dom.runDurationButton.disabled = true;
      return;
    }
    const preset = getRunControlPreset(state.runControlPresetId);
    const label = formatRunDurationLabel(preset);
    dom.runDurationButton.textContent = label;
    dom.runDurationButton.dataset.runDuration = preset.id;
    dom.runDurationButton.setAttribute("aria-label", `Run mode: ${label}`);
    dom.runDurationButton.title = "Toggle run mode between Forever and 60 seconds";
  }

  function updateTimelineBounds() {
    const frameIndexes = frameSets.map((entry) => entry.frameIndex);
    const presentation = getBorgTimelineRangePresentation({
      frameIndexes,
      activeFrameIndex: state.activeFrameIndex,
      isForever: !replayActive && isForeverRunPreset(getRunControlPreset(state.runControlPresetId)),
      isPlaying: state.playing,
    });
    dom.timelineRange.min = String(presentation.min);
    dom.timelineRange.max = String(presentation.max);
    dom.timelineRange.step = "1";
    dom.timelineRange.value = String(presentation.value);
    dom.timelineRange.disabled = presentation.disabled;
    dom.timelineRange.dataset.mode = presentation.mode;
    dom.timelineRange.title = presentation.title;
    dom.playButton.disabled = frameSets.length < 2;
    if (replayActive && state.replayDisplayMode !== "animated") {
      dom.playButton.disabled = true;
    }
  }

  function formatActiveTimelineLabel(time, frameIndex) {
    const label = formatTimelineLabel(time, frameIndex);
    const rate = `${formatBorgRealtimeRate(state.playbackAdaptiveRate)}× realtime`;
    if (replayActive || !isForeverRunPreset(getRunControlPreset(state.runControlPresetId))) {
      return `${label} | ${rate}`;
    }
    const bufferedThrough = frameSets.at(-1)?.frameIndex ?? frameIndex;
    const leadFrameSets = Math.max(0, bufferedThrough - frameIndex);
    return `${label} | ${rate} | lead ${leadFrameSets}`;
  }

  function bindEvents() {
    dom.timelineRange.addEventListener("input", () => {
      stopPlayback();
      updateFrame(Number(dom.timelineRange.value));
    });
    dom.playButton.addEventListener("click", () => {
      togglePlayback();
    });
    dom.startButton.addEventListener("click", goToStartFrame);
    dom.newDistributionButton.addEventListener("click", startNewDistributionRun);
    dom.initialConditionForm.addEventListener("submit", (event) => {
      event.preventDefault();
      startNewDistributionRun();
    });
    dom.initialConditionForm.addEventListener("input", markInitialConditionControlsPending);
    dom.certifiedBudget.addEventListener("change", () => {
      const preset = getBorgCertifiedBudgetPreset(dom.certifiedBudget.value);
      dom.stepHeight.value = preset.allocations.controller.maximumStep;
      dom.minimumStep.value = preset.allocations.controller.minimumStep;
    });
    dom.runDurationButton.addEventListener("click", toggleRunDurationMode);
    dom.eomStopButton.addEventListener("click", stopEomRun);
    dom.eomRestartButton.addEventListener("click", restartEomRun);
    dom.playbackSpeed.addEventListener("change", () => {
      state.playbackSpeedPresetId = playbackSpeedPresetById(dom.playbackSpeed.value).id;
      updateAdaptivePlaybackRate();
      if (state.playing) {
        state.playbackSegmentStartedAt = getPlaybackNow();
        maybeQueueDynamicFramesAhead();
      }
    });
    dom.resetButton.addEventListener("click", resetView);
    dom.fitButton.addEventListener("click", fitView);
    dom.focusButton.addEventListener("click", focusSelected);
    dom.canvas.addEventListener("pointerdown", handlePointerDown);
    dom.canvas.addEventListener("pointermove", handlePointerMove);
    dom.canvas.addEventListener("pointerup", handlePointerUp);
    dom.canvas.addEventListener("pointercancel", handlePointerCancel);
    dom.canvas.addEventListener("wheel", handleWheel, { passive: false });
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(dom.canvas);
    state.resizeObserver = resizeObserver;
    windowLike.addEventListener("resize", resize);
    windowLike.addEventListener("keydown", handleKeyDown);
  }

  function toggleLayer(layerId) {
    const layer = surfaceDesign.layerStrip.find((entry) => entry.layer === layerId);
    if (!layer || layer.state === "disabled" || layer.state === "contextual-disabled") {
      return;
    }
    if (layer.state === "on-locked") {
      state.activeLayers.add(layerId);
      return;
    }
    if (state.activeLayers.has(layerId)) {
      if (layerId !== "architrino-position") {
        state.activeLayers.delete(layerId);
      }
    } else {
      state.activeLayers.add(layerId);
    }
    updateLayerVisibility();
    syncLayerButtons();
    render();
  }

  function updateLayerVisibility() {
    boundaryShellGroup.visible = state.activeLayers.has("simulation-window");
    pointGroup.visible = state.activeLayers.has("architrino-position");
    pathGroup.visible = state.activeLayers.has("path-history");
    pathTrails.setVisible(pathGroup.visible);
    velocityGroup.visible = state.activeLayers.has("velocity-vectors");
    velocityLines.forEach((line) => {
      line.visible = velocityGroup.visible;
    });
    if (velocityGroup.visible) {
      refreshVelocityLines();
    }
  }

  function syncLayerButtons() {
    dom.layerStrip.querySelectorAll(".borg-layer-button").forEach((button) => {
      const layerId = button.dataset.layer;
      const isActive = state.activeLayers.has(layerId);
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function updateFrame(frameIndex) {
    const frameSet = frameSets.find((entry) => entry.frameIndex === frameIndex) ?? frameSets.at(-1);
    if (!frameSet) {
      return;
    }
    applyFrameSet(frameSet, {
      outputLabel: formatActiveTimelineLabel(frameSet.time, frameSet.frameIndex),
      rangeValue: frameSet.frameIndex,
    });
  }

  function applyFrameSet(frameSet, { outputLabel, rangeValue }) {
    const requestedFrameIndex = frameSet.frameIndex;
    frameSet = replayDisplayFrameSet(frameSet);
    if (frameSet.frameIndex !== requestedFrameIndex || frameSet.time !== frameSets.find(
      (candidate) => candidate.frameIndex === requestedFrameIndex,
    )?.time) {
      outputLabel = formatActiveTimelineLabel(frameSet.time, frameSet.frameIndex);
      rangeValue = frameSet.frameIndex;
    }
    const previousDiagnosticFrameIndex = state.activeFrameIndex;
    state.activeFrameIndex = frameSet.frameIndex;
    if (dom.timelineRange.dataset.mode !== "live-follow") {
      dom.timelineRange.value = String(rangeValue);
    }
    dom.timelineOutput.value = outputLabel;
    dom.timelineRange.setAttribute("aria-valuetext", outputLabel);
    particleObjects.forEach((particle) => {
      particle.visible = false;
    });
    velocityLines.forEach((line) => {
      line.visible = false;
    });
    const showVelocity = state.activeLayers.has("velocity-vectors");
    const showPoints = state.activeLayers.has("architrino-position");
    frameSet.frames.forEach((frame) => {
      const particle = particleObjects.get(frame.pathKey);
      if (!particle) {
        return;
      }
      particle.visible = showPoints;
      writeSolverPositionToWorld(frame.position, particle.position);
      particle.userData.frame = frame;
      if (showVelocity) {
        updateVelocityLine(frame);
      }
    });
    // The trail is history: it ends at the architrino and never runs ahead of
    // it. Rows are computed ahead of playback, so this bound is what keeps the
    // future off screen.
    pathTrails.setVisibleWindow({
      throughFrameIndex: frameSet.frameIndex,
      throughTime: frameSet.time,
      duration: state.pathTrailDuration,
    });
    assemblyViewScene.updateTime(frameSet.time);
    if (
      diagnosticsPanelController.isOpen() &&
      previousDiagnosticFrameIndex !== state.activeFrameIndex
    ) {
      refreshDiagnosticsPanel();
    }
    updateSelectedTag();
    render();
  }

  function replayDisplayFrameSet(frameSet) {
    if (!replayActive || !state.replayStrobeEnabled) {
      return frameSet;
    }
    const strobeTime = resolveBorgAssemblyViewStrobeTime(
      activeReplayEntry,
      frameSet.time,
      state.replayStrobeFrequency,
    );
    const sourceFrameSet = [...frameSets].reverse().find(
      (candidate) => candidate.time <= strobeTime,
    ) ?? frameSets[0];
    const frames = activeReplayEntry.dataset.worldlines.map((worldline) => {
      const evaluated = activeReplayEntry.dataset.evaluateWorldline(worldline.id, strobeTime);
      return Object.freeze({
        pathKey: worldline.pathKey ?? worldline.id,
        sourceWorldlineId: worldline.id,
        sourceOrder: worldline.sourceIndex,
        frameIndex: sourceFrameSet?.frameIndex ?? 0,
        time: strobeTime,
        position: evaluated.position,
        velocity: evaluated.velocity,
        errorBound: evaluated.errorBound,
        stateFlags: worldline.stateFlags,
        runSource: BORG_EOM_RECORD_REPLAY_RUN_SOURCE,
        valueAuthority: "display-only-declared-interpolation",
      });
    });
    return Object.freeze({
      frameIndex: sourceFrameSet?.frameIndex ?? 0,
      time: strobeTime,
      frames: Object.freeze(frames),
    });
  }

  function refreshVelocityLines() {
    particleObjects.forEach((particle) => {
      const frame = particle.userData.frame;
      if (frame) {
        updateVelocityLine(frame);
      }
    });
  }

  function updateVelocityLine(frame) {
    const line = velocityLines.get(frame.pathKey);
    if (!line) {
      return;
    }
    writeSolverPositionToWorld(frame.position, velocityStart);
    velocityDirection.set(frame.velocity.x, frame.velocity.y, frame.velocity.z);
    const speed = velocityDirection.length();
    if (speed > 0) {
      velocityDirection.normalize();
    } else {
      velocityDirection.set(1, 0, 0);
    }
    const length = Math.log10(1 + speed) * 0.88;
    const positions = line.geometry.getAttribute("position");
    positions.setXYZ(0, velocityStart.x, velocityStart.y, velocityStart.z);
    positions.setXYZ(
      1,
      velocityStart.x + velocityDirection.x * length,
      velocityStart.y + velocityDirection.y * length,
      velocityStart.z + velocityDirection.z * length,
    );
    positions.needsUpdate = true;
    line.visible = state.activeLayers.has("velocity-vectors");
  }

  function resetView() {
    rootGroup.rotation.set(DEFAULT_ROTATION_X, DEFAULT_ROTATION_Y, 0);
    state.cameraFitMargin = DEFAULT_CAMERA_FIT_MARGIN;
    fitCameraToEnvelope(state.cameraFitMargin);
    render();
  }

  function goToStartFrame() {
    stopPlayback();
    updateFrame(frameSets[0]?.frameIndex ?? 0);
  }

  function fitView() {
    state.cameraFitMargin = FIT_VIEW_MARGIN;
    fitCameraToEnvelope(state.cameraFitMargin);
    render();
  }

  function focusSelected() {
    const particle = particleObjects.get(state.selectedPathKey);
    if (!particle) {
      fitView();
      return;
    }
    state.cameraFitMargin = null;
    const target = particle.position.clone();
    camera.lookAt(target);
    render();
  }

  function startPlayback({ prefillComplete = false } = {}) {
    if (state.playing) {
      return;
    }
    if (replayActive && state.replayDisplayMode !== "animated") {
      return;
    }
    if (
      !prefillComplete &&
      options.eomShadowRunner &&
      state.dynamicRunner &&
      Math.max(0, frameSets.length - 1) < getPlaybackPrefillTargetFrameSetCount()
    ) {
      const generation = state.dynamicRunGeneration;
      const pendingChunk = state.dynamicChunkPromise ?? ensureDynamicFramesAhead({ generation });
      if (pendingChunk) {
        beginPlaybackPrefill(pendingChunk, generation);
        return;
      }
    }
    if (frameSets.length < 2) {
      return;
    }
    let currentSetIndex = getFrameSetIndex(state.activeFrameIndex);
    if (currentSetIndex >= frameSets.length - 1) {
      currentSetIndex = 0;
      updateFrame(frameSets[0].frameIndex);
    }
    state.playing = true;
    state.playbackBufferRefilling = true;
    setPlayButtonPresentation(true);
    updateTimelineBounds();
    maybeQueueDynamicFramesAhead();
    startPlaybackSegment(currentSetIndex);
  }

  function stopPlayback() {
    state.playing = false;
    setPlayButtonPresentation(false);
    cancelQueuedPlaybackFrame();
    updateTimelineBounds();
  }

  function togglePlayback() {
    if (state.playing) {
      stopPlayback();
    } else {
      startPlayback();
    }
  }

  function setPlayButtonPresentation(isPlaying) {
    dom.playButton.classList.toggle("is-active", isPlaying);
    dom.playButton.setAttribute("aria-pressed", isPlaying ? "true" : "false");
    dom.playButton.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
    dom.playButton.title = isPlaying ? "Pause" : "Play";
    dom.playButtonIcon.setAttribute("d", isPlaying ? PAUSE_ICON_PATH : PLAY_ICON_PATH);
  }

  function handleKeyDown(event) {
    if (event.defaultPrevented || event.repeat || event.metaKey || event.ctrlKey || event.altKey) {
      return;
    }
    if (event.code !== "Space" && event.key !== " ") {
      return;
    }
    if (isEditableTarget(event.target)) {
      return;
    }
    event.preventDefault();
    togglePlayback();
  }

  function startPlaybackSegment(fromSetIndex, startedAt = null) {
    const toSetIndex = fromSetIndex + 1;
    if (toSetIndex >= frameSets.length) {
      if (canExtendDynamicRun()) {
        // Waiting for a chunk is not animation time. Reset the segment clock
        // so the newly received frames begin at the established playback pace
        // instead of being skipped to catch up with wall time spent computing.
        state.playbackSegmentStartedAt = null;
        state.playbackSegmentProgress = 0;
        ensureDynamicFramesAhead();
        queuePlaybackFrame();
        return;
      }
      stopPlayback();
      return;
    }
    state.playbackFromSetIndex = fromSetIndex;
    state.playbackToSetIndex = toSetIndex;
    state.playbackSegmentStartedAt = startedAt;
    state.playbackSegmentProgress = 0;
    queuePlaybackFrame();
  }

  function stepPlayback(now) {
    if (!state.playing) {
      return;
    }
    let fromFrameSet = frameSets[state.playbackFromSetIndex];
    let toFrameSet = frameSets[state.playbackToSetIndex];
    if (!fromFrameSet || !toFrameSet) {
      if (canExtendDynamicRun()) {
        state.playbackSegmentStartedAt = null;
        state.playbackSegmentProgress = 0;
        ensureDynamicFramesAhead();
        queuePlaybackFrame();
        return;
      }
      stopPlayback();
      return;
    }
    if (
      replayActive &&
      state.replayLoopEnabled &&
      Number.isFinite(state.replayLoopPeriod) &&
      fromFrameSet.time >= activeReplayEntry.dataset.window.start + state.replayLoopPeriod
    ) {
      updateFrame(frameSets[0]?.frameIndex ?? 0);
      startPlaybackSegment(0, now);
      return;
    }
    maybeQueueDynamicFramesAhead();
    updateAdaptivePlaybackRate(now);
    if (state.playbackSegmentStartedAt == null) {
      state.playbackSegmentStartedAt = now;
    }
    const msPerNativeStep = getPlaybackMsPerNativeStep();
    const rawProgress = state.playbackSegmentProgress +
      (now - state.playbackSegmentStartedAt) / msPerNativeStep;
    let progress = clamp(rawProgress, 0, 1);
    if (rawProgress >= 1) {
      const advancedStepCount = getBorgBufferedPlaybackAdvance({
        rawProgress,
        fromSetIndex: state.playbackFromSetIndex,
        frameSetCount: frameSets.length,
      });
      const nextFromSetIndex = state.playbackFromSetIndex + advancedStepCount;
      if (nextFromSetIndex >= frameSets.length - 1) {
        if (canExtendDynamicRun()) {
          const newestSetIndex = frameSets.length - 1;
          if (newestSetIndex > state.playbackFromSetIndex) {
            const newestFrameSet = frameSets[newestSetIndex];
            applyFrameSet(newestFrameSet, {
              outputLabel: formatActiveTimelineLabel(
                newestFrameSet.time,
                newestFrameSet.frameIndex,
              ),
              rangeValue: newestFrameSet.frameIndex,
            });
            state.playbackFromSetIndex = newestSetIndex;
            state.playbackToSetIndex = newestSetIndex + 1;
            state.playbackSegmentStartedAt = null;
            state.playbackSegmentProgress = 0;
          }
          state.playbackSegmentStartedAt = null;
          state.playbackSegmentProgress = 0;
          ensureDynamicFramesAhead();
          queuePlaybackFrame();
          return;
        }
        applyFrameSet(frameSets.at(-1), {
          outputLabel: formatActiveTimelineLabel(frameSets.at(-1).time, frameSets.at(-1).frameIndex),
          rangeValue: frameSets.at(-1).frameIndex,
        });
        stopPlayback();
        return;
      }
      // Browser work can delay animation frames. Drop delay debt beyond one
      // interpolation interval so a completed chunk never makes the visible
      // track jump forward to catch up with wall time.
      const remainder = clamp(rawProgress - advancedStepCount, 0, 1);
      state.playbackFromSetIndex = nextFromSetIndex;
      state.playbackToSetIndex = nextFromSetIndex + 1;
      state.playbackSegmentStartedAt = now;
      state.playbackSegmentProgress = remainder;
      fromFrameSet = frameSets[state.playbackFromSetIndex];
      toFrameSet = frameSets[state.playbackToSetIndex];
      progress = clamp(remainder, 0, 1);
    }
    state.playbackSegmentStartedAt = now;
    state.playbackSegmentProgress = progress;
    const displayFrameSet = interpolateFrameSet(fromFrameSet, toFrameSet, progress);
    const currentFrameIndex = progress < 0.5 ? fromFrameSet.frameIndex : toFrameSet.frameIndex;
    applyFrameSet(displayFrameSet, {
      outputLabel: formatActiveTimelineLabel(displayFrameSet.time, currentFrameIndex),
      rangeValue: currentFrameIndex,
    });
    if (progress >= 1) {
      applyFrameSet(toFrameSet, {
        outputLabel: formatActiveTimelineLabel(toFrameSet.time, toFrameSet.frameIndex),
        rangeValue: toFrameSet.frameIndex,
      });
      if (state.playbackToSetIndex >= frameSets.length - 1) {
        if (canExtendDynamicRun()) {
          ensureDynamicFramesAhead();
          queuePlaybackFrame();
          return;
        }
        stopPlayback();
        return;
      }
      startPlaybackSegment(state.playbackToSetIndex, now);
      return;
    }
    queuePlaybackFrame();
  }

  function queuePlaybackFrame() {
    cancelQueuedPlaybackFrame();
    if (typeof windowLike.requestAnimationFrame === "function") {
      state.playFrameRequestKind = "animation-frame";
      state.playFrameRequestId = windowLike.requestAnimationFrame(stepPlayback);
      return;
    }
    state.playFrameRequestKind = "timeout";
    state.playFrameRequestId = windowLike.setTimeout(() => stepPlayback(getPlaybackNow()), 16);
  }

  function cancelQueuedPlaybackFrame() {
    if (state.playFrameRequestId == null) {
      return;
    }
    if (
      state.playFrameRequestKind === "animation-frame" &&
      typeof windowLike.cancelAnimationFrame === "function"
    ) {
      windowLike.cancelAnimationFrame(state.playFrameRequestId);
    } else {
      windowLike.clearTimeout(state.playFrameRequestId);
    }
    state.playFrameRequestId = null;
    state.playFrameRequestKind = null;
  }

  function handlePointerDown(event) {
    state.dragging = true;
    state.pointerId = event.pointerId;
    state.pointerStartX = event.clientX;
    state.pointerStartY = event.clientY;
    state.pointerLastX = event.clientX;
    state.pointerLastY = event.clientY;
    state.pointerTravel = 0;
    dom.canvas.setPointerCapture?.(event.pointerId);
    dom.canvas.focus();
  }

  function handlePointerMove(event) {
    if (!state.dragging || event.pointerId !== state.pointerId) {
      return;
    }
    const deltaX = event.clientX - state.pointerLastX;
    const deltaY = event.clientY - state.pointerLastY;
    state.pointerLastX = event.clientX;
    state.pointerLastY = event.clientY;
    state.pointerTravel += Math.abs(deltaX) + Math.abs(deltaY);
    rootGroup.rotation.y += deltaX * 0.007;
    rootGroup.rotation.x = clamp(rootGroup.rotation.x + deltaY * 0.005, -1.25, 1.1);
    render();
  }

  function handlePointerUp(event) {
    if (event.pointerId !== state.pointerId) {
      return;
    }
    dom.canvas.releasePointerCapture?.(event.pointerId);
    const travel = state.pointerTravel;
    state.dragging = false;
    state.pointerId = null;
    if (travel < 8) {
      selectParticleFromPointer(event);
    }
  }

  function handlePointerCancel(event) {
    if (event.pointerId === state.pointerId) {
      state.dragging = false;
      state.pointerId = null;
    }
  }

  function handleWheel(event) {
    event.preventDefault();
    const direction = event.deltaY > 0 ? 1 : -1;
    state.cameraFitMargin = null;
    state.cameraDistance = clamp(
      state.cameraDistance * (direction > 0 ? 1.08 : 0.92),
      CAMERA_MIN_DISTANCE,
      CAMERA_MAX_DISTANCE,
    );
    camera.position.set(0, 0, state.cameraDistance);
    camera.lookAt(0, 0, 0);
    render();
  }

  function selectParticleFromPointer(event) {
    const rect = dom.canvas.getBoundingClientRect();
    pointerNdc.x = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
    pointerNdc.y = -(((event.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1);
    raycaster.setFromCamera(pointerNdc, camera);
    const hits = raycaster.intersectObjects([...particleObjects.values()], false);
    if (hits.length === 0) {
      state.selectedPathKey = null;
    } else {
      state.selectedPathKey = hits[0].object.userData.pathKey;
    }
    updateSelectedTag();
    render();
  }

  function updateSelectedTag() {
    if (state.selectedPathKey == null) {
      dom.selectedTag.hidden = true;
      return;
    }
    const particle = particleObjects.get(state.selectedPathKey);
    const frame = particle?.userData.frame;
    if (!particle || !frame) {
      dom.selectedTag.hidden = true;
      return;
    }
    const speed = vectorLength(frame.velocity);
    const style = getParticleStyle(state.selectedPathKey, particleStyles);
    const keyframeCount = frameSets.length;
    dom.selectedTag.hidden = false;
    dom.selectedTag.textContent = `${style.polarity} ${state.selectedPathKey} | speed ${formatNumber(speed)} | ${keyframeCount} native keyframes`;
  }

  function resize() {
    const rect = dom.canvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    renderer.setPixelRatio(Math.min(2, windowLike.devicePixelRatio || 1));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (state.cameraFitMargin != null) {
      fitCameraToEnvelope(state.cameraFitMargin);
    }
    render();
  }

  function render() {
    renderer.render(scene, camera);
  }

  function dispose() {
    stopPlayback();
    state.resizeObserver?.disconnect?.();
    windowLike.removeEventListener("resize", resize);
    windowLike.removeEventListener("keydown", handleKeyDown);
    diagnosticsPanelController.dispose();
    assemblyViewControls?.dispose?.();
    assemblyViewScene.dispose();
    disposeDynamicRunner();
    boundaryShellGroup.children.slice().forEach((object) => {
      object.geometry?.dispose?.();
      object.material?.dispose?.();
    });
    disposePathTrails();
    disposeParticleObjects();
    architrinoPointTexture.dispose();
    renderer.dispose();
  }

  /** Write solver coordinates into an existing {x,y,z} target; no allocation. */
  function writeSolverPositionToWorld(position, target) {
    const center = manifest.simulationEnvelope.center;
    target.x = (position.x - center.x) * worldUnitsPerSolverUnit;
    target.y = (position.y - center.y) * worldUnitsPerSolverUnit;
    target.z = (position.z - center.z) * worldUnitsPerSolverUnit;
    return target;
  }

  function activeFrameTime() {
    return frameSets.find((frameSet) => frameSet.frameIndex === state.activeFrameIndex)?.time ??
      activeReplayEntry?.dataset.window.start ??
      0;
  }

  function activeSampleInterval() {
    return activeReplayEntry?.dataset.window.sampleInterval ??
      options.eomShadowRunner?.sampleInterval ??
      manifest.simulationEnvelope.sampleInterval;
  }

  function fitCameraToEnvelope(margin) {
    const envelopeWorldRadius =
      borgEnvelopeRadius(manifest) *
      worldUnitsPerSolverUnit;
    const verticalHalfFov = THREE.MathUtils.degToRad(camera.fov * 0.5);
    const horizontalHalfFov = Math.atan(Math.tan(verticalHalfFov) * Math.max(0.1, camera.aspect));
    const limitingHalfFov = Math.min(verticalHalfFov, horizontalHalfFov);
    state.cameraDistance = clamp(
      (envelopeWorldRadius / Math.sin(limitingHalfFov)) * margin,
      CAMERA_MIN_DISTANCE,
      CAMERA_MAX_DISTANCE,
    );
    camera.position.set(0, 0, state.cameraDistance);
    camera.lookAt(0, 0, 0);
  }

  function getFrameSetIndex(frameIndex) {
    const index = frameSets.findIndex((entry) => entry.frameIndex === frameIndex);
    return index >= 0 ? index : 0;
  }

  function getPlaybackNow() {
    return windowLike.performance?.now?.() ?? Date.now();
  }

  function getPlaybackMsPerNativeStep() {
    return getBorgPlaybackMsPerFrameSet({
      playbackRate: state.playbackAdaptiveRate,
      sampleInterval: activeSampleInterval(),
    });
  }

  function updateAdaptivePlaybackRate(now = getPlaybackNow()) {
    const adaptiveRate = getBorgAdaptivePlaybackRate({
      requestedRate: playbackSpeedPresetById(
        state.playbackSpeedPresetId,
      ).maximumRealtimeRate,
      measuredProductionRate: state.playbackMeasuredProductionRate,
    });
    const remainingFrameSetCount = Math.max(
      0,
      frameSets.length - 1 - state.playbackFromSetIndex -
        state.playbackSegmentProgress,
    );
    state.playbackAdaptiveRate = getBorgInFlightProtectedPlaybackRate({
      adaptiveRate,
      remainingFrameSetCount,
      sampleInterval: activeSampleInterval(),
      chunkInFlight: Boolean(state.dynamicChunkPromise),
      chunkElapsedMs: state.dynamicChunkStartedAt == null
        ? 0
        : Math.max(0, now - state.dynamicChunkStartedAt),
      previousChunkWallTimeMs: state.liveRunBudget.lastChunkWallTimeMs,
    });
  }

  function getPathKeys() {
    return [...new Set(currentFrames.map((frame) => frame.pathKey))].sort((left, right) => {
      const numericDifference = Number(left) - Number(right);
      return Number.isFinite(numericDifference)
        ? numericDifference
        : String(left).localeCompare(String(right), "en", { numeric: true });
    });
  }

  function getRunInitialFrameRows() {
    const rows = state.distributionFrameRows ?? initialDisplayRows;
    return options.eomShadowRunner
      ? selectFrameRowsByPathCount(rows, state.eomPathCount)
      : rows;
  }

  function getRunInitialDisplayRows() {
    if (options.eomShadowRunner && state.eomSeedEndpointRows) {
      return selectFrameRowsByPathCount(state.eomSeedEndpointRows, state.eomPathCount);
    }
    return getRunInitialFrameRows();
  }

  function getRunControlPreset(presetId) {
    return resolveMeasuredRunControlPreset(
      state.measuredRunPresetCalibration,
      presetId,
      RUN_CONTROL_PRESETS,
    );
  }

  function applyMeasuredPresetLimitsToDynamicRunner() {
    if (!state.dynamicRunner) {
      state.dynamicTargetDuration = null;
      state.dynamicChunkDuration = null;
      return;
    }
    const preset = getRunControlPreset(state.runControlPresetId);
    const eomTargetDuration = options.eomShadowRunner && isForeverRunPreset(preset)
      ? Number.POSITIVE_INFINITY
      : undefined;
    state.dynamicRunner.setRunLimits?.({
      targetDuration: options.eomShadowRunner
        ? eomTargetDuration
        : preset?.effectiveTargetDuration,
      chunkDuration: preset?.effectiveChunkDuration,
    });
    state.dynamicTargetDuration = state.dynamicRunner.targetDuration ?? state.dynamicRunner.config.targetDuration;
    state.dynamicChunkDuration = state.dynamicRunner.chunkDuration ?? state.dynamicRunner.config.chunkDuration;
  }

  function startDynamicNativeRunner() {
    const preset = getRunControlPreset(state.runControlPresetId);
    const eomRunnerOptions = createDefaultEomShadowRunnerOptions(
      options,
      preset,
      getRunInitialFrameRows(),
      manifest,
      {
        pathCount: state.eomPathCount,
        runDuration: state.eomRunDuration,
        historyDepth: state.eomSeedHistoryDepth,
        coreScale: state.eomCoreScale,
        certifiedBudgetId: state.eomCertifiedBudgetId,
        coupling: state.eomCoupling,
        stepHeight: state.eomStepHeight,
        minimumStep: state.eomMinimumStep,
        simulationOuterRadius: borgEnvelopeRadius(manifest),
      },
    );
    const replayOptions = replayActive
      ? {
          ...options,
          eomRecordReplay: {
            ...options.eomRecordReplay,
            record: activeReplayEntry.rawRecord,
          },
        }
      : options;
    const runnerOptions = eomRunnerOptions ?? createDefaultEomRecordReplayOptions(
      replayOptions,
      preset,
    );
    if (!runnerOptions) {
      state.dynamicRunnerStatus = "live-native-error";
      state.dynamicRunnerMessage = "no EOM data source available";
      state.dynamicRunnerKind = "eom-idle";
      updateSourceStatusPresentation();
      renderSourceFields();
      refreshDiagnosticsPanel();
      return null;
    }
    const generation = state.dynamicRunGeneration;
    try {
      state.dynamicRunner = eomRunnerOptions
        ? createBorgEomShadowRunner(manifest, runnerOptions)
        : createBorgEomRecordReplayRunner(runnerOptions.record, runnerOptions);
    } catch (error) {
      if (eomRunnerOptions) {
        currentFrames = [...getRunInitialDisplayRows()];
        frameSets = createBorgFrameSetsFromRows(currentFrames);
        resetPolarityDiagnosticsHistory();
        state.sourceMode = "accepted-eom-seed-history";
      }
      state.dynamicRunnerStatus = "live-native-error";
      state.dynamicRunnerMessage = error?.message ?? "live runner failed";
      state.dynamicRunnerKind = eomRunnerOptions ? "eom-shadow-failed" : "eom-record-replay-failed";
      updateSourceStatusPresentation();
      renderSourceFields();
      refreshDiagnosticsPanel();
      return null;
    }
    state.dynamicRunnerKind = eomRunnerOptions ? "eom-shadow" : "eom-record-replay";
    applyMeasuredPresetLimitsToDynamicRunner();
    state.dynamicRunnerStatus = eomRunnerOptions ? "eom-shadow-running" : "eom-record-replay-running";
    state.dynamicRunnerMessage = eomRunnerOptions
      ? "computing forward EOM evolution from the exact polynomial initial history"
      : "replaying recorded EOM dataset";
    updateEomControlPresentation();
    updateSourceStatusPresentation();
    renderSourceFields();
    refreshDiagnosticsPanel();
    return ensureDynamicFramesAhead({ replaceInitialRows: true, generation });
  }

  function startRunAndPlayback() {
    const generation = state.dynamicRunGeneration;
    const firstChunk = startDynamicNativeRunner();
    if (!firstChunk) {
      startPlayback();
      return;
    }
    beginPlaybackPrefill(firstChunk, generation);
  }

  function getPlaybackPrefillTargetFrameSetCount() {
    return getBorgPlaybackPrefillTargetFrameSetCount({
      playbackRate: playbackSpeedPresetById(
        state.playbackSpeedPresetId,
      ).maximumRealtimeRate,
      sampleInterval: activeSampleInterval(),
      maximumRetainedFrameSetCount:
        BORG_LIVE_RUN_RETENTION_POLICY_V1.retainedFrameSetLimit,
    });
  }

  function beginPlaybackPrefill(firstChunk, generation) {
    if (state.playbackPrefillPromise) {
      return state.playbackPrefillPromise;
    }
    state.playbackPrefillPromise = prefillPlaybackBuffer(firstChunk, generation)
      .finally(() => {
        if (generation === state.dynamicRunGeneration) {
          state.playbackPrefillPromise = null;
        }
      });
    return state.playbackPrefillPromise;
  }

  async function prefillPlaybackBuffer(firstChunk, generation) {
    const targetFrameSetCount = getPlaybackPrefillTargetFrameSetCount();
    const setTimer = windowLike.setTimeout?.bind(windowLike) ?? setTimeout;
    const clearTimer = windowLike.clearTimeout?.bind(windowLike) ?? clearTimeout;
    let deadlineTimer = null;
    const deadline = new Promise((resolve) => {
      deadlineTimer = setTimer(
        () => resolve({ deadlineReached: true }),
        BORG_PLAYBACK_PREFILL_MAX_WALL_MS,
      );
    });
    let pendingChunk = firstChunk;
    state.dynamicRunnerMessage = "prefilling smooth playback";
    updateSourceStatusPresentation();
    renderSourceFields();
    while (
      pendingChunk &&
      generation === state.dynamicRunGeneration &&
      state.dynamicRunner
    ) {
      const outcome = await Promise.race([
        pendingChunk.then((chunk) => ({ chunk })),
        deadline,
      ]);
      if (outcome.deadlineReached) {
        break;
      }
      if (!outcome.chunk || !state.dynamicRunner) {
        clearTimer(deadlineTimer);
        return;
      }
      const bufferedFrameSetCount = Math.max(0, frameSets.length - 1);
      if (
        bufferedFrameSetCount >= targetFrameSetCount ||
        !state.dynamicRunner.canComputeNextChunk()
      ) {
        break;
      }
      pendingChunk = ensureDynamicFramesAhead({ generation });
    }
    clearTimer(deadlineTimer);
    if (generation === state.dynamicRunGeneration && state.dynamicRunner) {
      if (replayActive && state.replayDisplayMode !== "animated") {
        updateFrame(frameSets[0]?.frameIndex ?? 0);
      } else {
        startPlayback({ prefillComplete: true });
      }
    }
  }

  function ensureDynamicFramesAhead({
    replaceInitialRows = false,
    generation = state.dynamicRunGeneration,
  } = {}) {
    if (!state.dynamicRunner || state.dynamicChunkPromise || !state.dynamicRunner.canComputeNextChunk()) {
      return state.dynamicChunkPromise;
    }
    state.dynamicRunnerStatus = options.eomShadowRunner
      ? "eom-shadow-running"
      : "eom-record-replay-running";
    state.dynamicRunnerMessage = options.eomShadowRunner
      ? "computing forward EOM chunk"
      : "reading recorded EOM chunk";
    updateSourceStatusPresentation();
    renderSourceFields();
    const budgetBefore = readLiveRunBudgetSnapshot(windowLike);
    const previousFrameRowCount = currentFrames.length;
    state.dynamicChunkStartedAt = getPlaybackNow();
    state.dynamicChunkPromise = state.dynamicRunner
      .computeNextChunk()
      .then((chunk) => {
        if (generation !== state.dynamicRunGeneration) {
          return null;
        }
        state.dynamicChunksComputed += 1;
        const replaceDisplayedSeed = Boolean(
          options.eomShadowRunner && !state.eomDisplayStarted,
        );
        const replaceCurrentFrames = replaceInitialRows || replaceDisplayedSeed;
        if (options.eomShadowRunner) {
          state.eomDisplayStarted = true;
          state.dynamicRunnerKind = "eom-shadow";
          state.eomEvolutionClaimLevel = chunk.evolutionClaimLevel;
          state.eomCoreScale = chunk.coreScale;
          state.eomRetainedHistoryStart = chunk.retainedHistoryStart;
          state.eomRetainedHistoryEnd = chunk.retainedHistoryEnd;
          state.eomRetainedHistoryPolicy = chunk.retainedHistoryPolicy;
        }
        state.sourceMode = chunk.source;
        state.dynamicRunnerStatus = chunk.terminalHalt
          ? "halted-live-native-run"
          : state.dynamicRunner.canComputeNextChunk()
            ? chunk.source
            : options.eomShadowRunner
              ? "completed-live-native-run"
              : "completed-recorded-replay";
        state.dynamicRunnerMessage = chunk.terminalHalt
          ? `certified prefix through T=${chunk.endTime}; failed candidate rejected (${chunk.terminalHalt.code})`
          : `chunk ${chunk.chunkIndex} ready`;
        if (replaceCurrentFrames) {
          currentFrames = [...chunk.frames];
          frameSets = createBorgFrameSetsFromRows(currentFrames);
        } else {
          appendBorgFrameRowsInPlace(currentFrames, chunk.frames);
          appendBorgFrameSetsInPlace(frameSets, chunk.frames);
        }
        if (replaceCurrentFrames) {
          polarityEscapeLedger.reset();
        }
        appendPolarityEscapeRows(chunk.frames);
        state.polarityDiagnosticFrameIndex = null;
        const appendedFrameRows = Array.isArray(chunk.frames) ? chunk.frames.length : 0;
        const compactedFrameSets = applyLiveRunRetentionIfNeeded();
        if (compactedFrameSets) {
          frameSets = createBorgFrameSetsFromRows(currentFrames);
        }
        if (replaceCurrentFrames || compactedFrameSets) {
          reanchorPlaybackAfterFrameSetRebuild();
        }
        state.liveRunBudget = createLiveRunBudgetMeasurement({
          before: budgetBefore,
          after: readLiveRunBudgetSnapshot(windowLike),
          chunk,
          previousFrameRowCount,
          nextFrameRowCount: currentFrames.length,
          replaceInitialRows: replaceCurrentFrames,
          appendedFrameRows,
          presetId: state.runControlPresetId,
          memoryBudgetBytes: state.dynamicRunner?.config?.memoryBudgetBytes ?? null,
        });
        state.playbackMeasuredProductionRate = updateBorgMeasuredProductionRate({
          previousRate: state.playbackMeasuredProductionRate,
          chunkDuration: state.liveRunBudget.chunkDuration,
          chunkWallTimeMs: state.liveRunBudget.lastChunkWallTimeMs,
        });
        updateAdaptivePlaybackRate();
        state.measuredRunPresetCalibration = updateMeasuredRunPresetCalibration(
          state.measuredRunPresetCalibration,
          state.liveRunBudget,
          RUN_CONTROL_PRESETS,
        );
        applyMeasuredPresetLimitsToDynamicRunner();
        syncRunDurationButton();
        if (replaceCurrentFrames || state.liveRunRetention?.compactedThisPass) {
          // History changed underneath the trails: the seed endpoint rows were
          // swapped for live rows, or a retention pass moved older rows into
          // compacted history. Otherwise the chunk is pure new history, so
          // append it.
          rebuildPathTrails();
        } else {
          appendPathTrailRows(chunk.frames);
        }
        updateTimelineBounds();
        if (replaceCurrentFrames) {
          updateFrame(frameSets[0]?.frameIndex ?? 0);
        } else {
          updateFrame(clamp(state.activeFrameIndex, frameSets[0]?.frameIndex ?? 0, frameSets.at(-1)?.frameIndex ?? 0));
        }
        updateSourceStatusPresentation();
        renderSourceFields();
        refreshDiagnosticsPanel();
        updateEomControlPresentation();
        return chunk;
      })
      .catch((error) => {
        if (generation !== state.dynamicRunGeneration) {
          return null;
        }
        const hadLiveFrames =
          state.sourceMode === BORG_EOM_RECORD_REPLAY_RUN_SOURCE ||
          state.sourceMode === BORG_EOM_SHADOW_RUN_SOURCE;
        const failedRunner = state.dynamicRunner;
        state.dynamicRunner = null;
        failedRunner?.dispose?.();
        state.dynamicRunnerStatus = options.eomShadowRunner
          ? "live-native-error"
          : "record-replay-error";
        state.dynamicRunnerMessage = error?.message ?? (
          options.eomShadowRunner ? "live native runner failed" : "record replay failed"
        );
        if (!hadLiveFrames && options.eomShadowRunner) {
          state.sourceMode = "accepted-eom-seed-history";
          currentFrames = [...getRunInitialDisplayRows()];
          frameSets = createBorgFrameSetsFromRows(currentFrames);
          resetPolarityDiagnosticsHistory();
          resetLiveRunRetentionState();
          rebuildParticleObjects();
          rebuildPathTrails({ recreateMaterials: true });
          setInitialConditionFeedback(
            "Forward EOM evolution failed; exact polynomial initial history retained and no rejected trajectory was published",
            "bad",
          );
          updateTimelineBounds();
          updateFrame(frameSets[0]?.frameIndex ?? 0);
        } else if (!hadLiveFrames) {
          state.sourceMode = "eom-idle";
          setInitialConditionFeedback("Recorded EOM replay failed; nothing was published", "bad");
          renderEnvelopeFields();
          renderInitialConditionFields();
          updateTimelineBounds();
          updateFrame(frameSets[0]?.frameIndex ?? 0);
        }
        updateSourceStatusPresentation();
        renderSourceFields();
        refreshDiagnosticsPanel();
        updateEomControlPresentation();
        return null;
      })
      .finally(() => {
        if (generation === state.dynamicRunGeneration) {
          state.dynamicChunkPromise = null;
          state.dynamicChunkStartedAt = null;
          updateEomControlPresentation();
          if (state.playing && state.dynamicRunner?.canComputeNextChunk()) {
            maybeQueueDynamicFramesAhead();
          }
        }
      });
    return state.dynamicChunkPromise;
  }

  function stopEomRun() {
    if (!options.eomShadowRunner) {
      return;
    }
    stopPlayback();
    disposeDynamicRunner();
    state.dynamicRunnerStatus = "eom-shadow-stopped";
    state.dynamicRunnerMessage = "stopped by operator; no further history published";
    updateSourceStatusPresentation();
    renderSourceFields();
    updateEomControlPresentation();
  }

  function restartEomRun() {
    if (!options.eomShadowRunner) {
      return;
    }
    readEomControlValues();
    stopPlayback();
    disposeDynamicRunner();
    resetDynamicRunState();
    startRunAndPlayback();
  }

  function canExtendDynamicRun() {
    return Boolean(
      state.dynamicRunner &&
        (state.dynamicChunkPromise || state.dynamicRunner.canComputeNextChunk()),
    );
  }

  function maybeQueueDynamicFramesAhead() {
    if (!state.dynamicRunner || state.dynamicChunkPromise || !state.dynamicRunner.canComputeNextChunk()) {
      return;
    }
    const remainingFrameSets = frameSets.length - 1 - state.playbackToSetIndex;
    const leadWindow = getBorgPlaybackLeadWindow({
      playbackRate: state.playbackAdaptiveRate,
      sampleInterval: state.dynamicRunner.config.sampleInterval,
      chunkDuration: state.dynamicRunner.chunkDuration,
    });
    const decision = getBorgPlaybackRefillDecision({
      remainingFrameSetCount: remainingFrameSets,
      wasRefilling: state.playbackBufferRefilling,
      ...leadWindow,
    });
    state.playbackBufferRefilling = decision.refilling;
    if (decision.shouldRequestChunk) {
      ensureDynamicFramesAhead();
    }
  }

  function reanchorPlaybackAfterFrameSetRebuild() {
    if (!state.playing) {
      return;
    }
    const anchor = getBorgPlaybackReanchor(frameSets, state.activeFrameIndex);
    state.playbackFromSetIndex = anchor.fromSetIndex;
    state.playbackToSetIndex = anchor.toSetIndex;
    state.playbackSegmentStartedAt = null;
    state.playbackSegmentProgress = 0;
  }

  function applyLiveRunRetentionIfNeeded() {
    if (!isForeverRunPreset(getRunControlPreset(state.runControlPresetId))) {
      state.compactedPathHistory = Object.freeze({});
      state.liveRunRetention = createBorgLiveRunRetentionAppendSnapshot({
        previousSnapshot: state.liveRunRetention,
        retainedFrameRowCount: currentFrames.length,
        retainedFrameSetCount: frameSets.length,
      });
      return false;
    }
    if (
      frameSets.length <=
      BORG_LIVE_RUN_RETENTION_POLICY_V1.compactionTriggerFrameSetLimit
    ) {
      state.liveRunRetention = createBorgLiveRunRetentionAppendSnapshot({
        previousSnapshot: state.liveRunRetention,
        retainedFrameRowCount: currentFrames.length,
        retainedFrameSetCount: frameSets.length,
      });
      return false;
    }
    const result = applyBorgLiveRunRetention({
      frameRows: currentFrames,
      compactedPathHistory: state.compactedPathHistory,
      policy: BORG_LIVE_RUN_RETENTION_POLICY_V1,
    });
    currentFrames = [...result.frameRows];
    state.compactedPathHistory = result.compactedPathHistory;
    state.liveRunRetention = result.summary;
    return true;
  }

  function resetLiveRunRetentionState() {
    state.compactedPathHistory = Object.freeze({});
    state.liveRunRetention = createBorgLiveRunRetentionSnapshot({ frameRows: currentFrames });
  }

  /**
   * Discard every trail and rewrite it from the current rows. Only for the
   * cases where history genuinely changed underneath us: a run reset, a new
   * distribution, or a retention pass that moved rows into compacted history.
   * Ordinary chunk arrivals append instead.
   */
  function rebuildPathTrails({ recreateMaterials = false } = {}) {
    if (recreateMaterials) {
      pathTrails.dispose();
    }
    pathTrails.reset({
      frameRows: currentFrames,
      compactedPathHistory: state.compactedPathHistory,
    });
    const activeFrameSet = frameSets.find(
      (frameSet) => frameSet.frameIndex === state.activeFrameIndex,
    );
    pathTrails.setVisibleWindow({
      throughFrameIndex: state.activeFrameIndex,
      throughTime: activeFrameSet?.time ?? Number.POSITIVE_INFINITY,
      duration: state.pathTrailDuration,
    });
  }

  function appendPathTrailRows(frameRows) {
    pathTrails.setCompactedPathHistory(state.compactedPathHistory);
    pathTrails.appendFrameRows(frameRows);
  }

  function disposePathTrails() {
    pathTrails.dispose();
  }

  function updateSourceStatusPresentation() {
    dom.nativeStatus.textContent = STATUS_LABEL[state.dynamicRunnerStatus] ?? state.dynamicRunnerStatus;
    dom.nativeStatus.dataset.status = state.dynamicRunnerStatus;
    dom.nativeStatus.title = state.dynamicRunnerMessage
      ? `${state.dynamicRunnerStatus}: ${state.dynamicRunnerMessage}`
      : state.dynamicRunnerStatus;
    setTone(dom.nativeStatus, state.dynamicRunnerStatus);
    updateSolverBanner();
  }

  /**
   * Say plainly when nothing is being computed. A silent fallback to a
   * recording is indistinguishable from a live run that is merely slow, which
   * is the failure this banner exists to prevent.
   */
  function updateSolverBanner() {
    const banner = dom.solverBanner;
    if (!banner) {
      return;
    }
    const message = SOLVER_FAILURE_BANNERS[state.dynamicRunnerStatus];
    if (!message) {
      banner.hidden = true;
      banner.textContent = "";
      banner.removeAttribute("title");
      return;
    }
    const detail = state.dynamicRunnerMessage?.trim();
    banner.textContent = detail ? `${message} — ${detail}` : message;
    banner.title = banner.textContent;
    banner.hidden = false;
  }

  function switchRunControlPreset(presetId) {
    const preset = getRunControlPreset(presetId);
    stopPlayback();
    state.runControlPresetId = preset.id;
    syncRunDurationButton();
    disposeDynamicRunner();
    state.dynamicRunnerStatus = options.eomShadowRunner
      ? "eom-shadow-stopped"
      : "eom-idle";
    state.dynamicRunnerMessage = `${formatRunDurationLabel(preset)} selected; press Start / restart to run`;
    updateSourceStatusPresentation();
    renderSourceFields();
    updateEomControlPresentation();
  }

  function toggleRunDurationMode() {
    const nextPresetId = state.runControlPresetId === DEFAULT_RUN_CONTROL_PRESET_ID
      ? FINITE_RUN_CONTROL_PRESET_ID
      : DEFAULT_RUN_CONTROL_PRESET_ID;
    switchRunControlPreset(nextPresetId);
  }

  function resetDynamicRunState() {
    currentFrames = [...getRunInitialDisplayRows()];
    frameSets = createBorgFrameSetsFromRows(currentFrames);
    resetLiveRunRetentionState();
    rebuildParticleObjects();
    rebuildPathTrails({ recreateMaterials: true });
    state.sourceMode = options.eomShadowRunner && state.distributionFrameRows
      ? "accepted-eom-seed-history"
      : state.distributionFrameRows
        ? "seeded-random-live-initial-state"
      : "eom-idle";
    state.dynamicRunnerStatus = options.eomShadowRunner
      ? "eom-shadow-running"
      : "live-native-running";
    state.dynamicRunnerMessage = options.eomShadowRunner
      ? "exact polynomial initial history ready; forward EOM evolution pending"
      : "computing native chunks";
    state.dynamicRunnerKind = options.eomShadowRunner
      ? "eom-shadow"
      : options.eomRecordReplay
        ? "eom-record-replay"
        : "eom-idle";
    state.dynamicChunksComputed = 0;
    state.playbackMeasuredProductionRate = null;
    updateAdaptivePlaybackRate();
    state.playbackBufferRefilling = true;
    resetPolarityDiagnosticsHistory();
    rebuildBoundaryShell();
    state.eomRetainedHistoryStart = state.eomSeedCertificate?.historyStartTime ?? null;
    state.eomRetainedHistoryEnd = state.eomSeedCertificate?.historyEndTime ?? null;
    state.eomRetainedHistoryPolicy = state.eomSeedCertificate
      ? "causal-seed-history-only"
      : "not-started";
    state.eomDisplayStarted = false;
    state.dynamicTargetDuration = null;
    state.dynamicChunkDuration = null;
    state.liveRunBudget = createEmptyLiveRunBudget();
    renderEnvelopeFields();
    renderInitialConditionFields();
    updateTimelineBounds();
    updateFrame(frameSets[0]?.frameIndex ?? 0);
    updateSourceStatusPresentation();
    renderSourceFields();
    refreshDiagnosticsPanel();
    updateEomControlPresentation();
  }

  async function startNewDistributionRun() {
    readEomControlValues();
    const config = readInitialConditionControls();
    if (!config) {
      return;
    }
    stopPlayback();
    state.distributionSeedIndex += 1;
    const placement = createBorgPlacementPolicy(
      manifest,
      config.electrinoCount + config.positrinoCount,
    );
    const endpointRows = createBorgSeededInitialConditionRows({
      manifest,
      seedIndex: state.distributionSeedIndex,
      config,
      seedingRadius: placement.seedingRadius,
      minimumPairSeparation: placement.minimumPairSeparation,
    });
    if (options.eomShadowRunner) {
      const causalHistoryDepth = calculateBorgInertialHistoryDepth(endpointRows, {
        fieldSpeed: options.eomShadowRunner.fieldSpeed ?? manifest.simulationEnvelope?.fieldSpeed ?? 1,
        sampleInterval: options.eomShadowRunner.sampleInterval ?? manifest.simulationEnvelope?.sampleInterval ?? 0.01,
        maximumSeparation: 2 * placement.seedingRadius,
      });
      const seedHistoryDepth = causalHistoryDepth;
      const eomConfig = createBorgEomShadowRunConfig(manifest, {
        ...options.eomShadowRunner,
        pathCount: state.eomPathCount,
        historyDepth: seedHistoryDepth,
        coreScale: state.eomCoreScale,
        simulationOuterRadius: placement.seedingRadius,
      });
      try {
        const seed = await createBorgAcceptedInertialSeedHistory(endpointRows, {
          historyStartTime: eomConfig.historyStartTime,
          historyEndTime: eomConfig.startTime,
          sampleInterval: eomConfig.sampleInterval,
          minimumPairSeparation: placement.minimumPairSeparation,
        });
        state.distributionFrameRows = seed.rows;
        state.eomSeedEndpointRows = seed.endpointRows;
        state.eomSeedCertificate = seed.certificate;
        state.eomSeedHistoryDepth = seedHistoryDepth;
      } catch (error) {
        setInitialConditionFeedback(
          `Initial datum rejected: ${error?.message ?? error}`,
          "bad",
        );
        return;
      }
    } else {
      state.distributionFrameRows = endpointRows;
      state.eomSeedEndpointRows = null;
      state.eomSeedCertificate = null;
    }
    state.distributionLabel = `seeded distribution ${state.distributionSeedIndex}`;
    setInitialConditionFeedback(
      `Accepted ${getBorgCertifiedBudgetPreset(state.eomCertifiedBudgetId).label}; κ=${state.eomCoupling}; step ${state.eomStepHeight} to ${state.eomMinimumStep}; ${config.electrinoCount} electrinos + ${config.positrinoCount} positrinos; ${state.eomPathCount ** 2} ordered EOM pairs`,
      "accepted",
    );
    state.runControlPresetId = getRunControlPreset(state.runControlPresetId).id;
    syncRunDurationButton();
    disposeDynamicRunner();
    resetDynamicRunState();
    startRunAndPlayback();
  }

  function disposeDynamicRunner() {
    state.dynamicRunGeneration += 1;
    state.playbackPrefillPromise = null;
    state.dynamicChunkPromise = null;
    state.dynamicChunkStartedAt = null;
    const runner = state.dynamicRunner;
    state.dynamicRunner = null;
    runner?.dispose?.();
    updateEomControlPresentation();
  }
}

function queryRequiredElement(documentLike, selector) {
  const element = documentLike?.querySelector?.(selector);
  if (!element) {
    throw new Error(`Borg app missing required element ${selector}`);
  }
  return element;
}

function createParticleStyles(frames) {
  const styles = new Map();
  frames.forEach((frame) => {
    if (styles.has(frame.pathKey)) {
      return;
    }
    const baseStyle =
      frame.stateFlags === 1 ? PARTICLE_POLARITY_STYLES.positrino : PARTICLE_POLARITY_STYLES.electrino;
    styles.set(frame.pathKey, {
      ...baseStyle,
      label: String(frame.pathKey),
    });
  });
  return styles;
}

function getParticleStyle(pathKey, particleStyles) {
  return particleStyles?.get(pathKey) ?? {
    label: String(pathKey),
    color: 0xffffff,
    pathColor: 0xe5f1ff,
    velocityColor: 0xe5f1ff,
    edgeColor: "#ffffff",
    polarity: "architrino",
  };
}

function playbackSpeedPresetById(presetId) {
  return (
    PLAYBACK_SPEED_PRESETS.find((preset) => preset.id === presetId) ??
    PLAYBACK_SPEED_PRESETS.find((preset) => preset.id === DEFAULT_PLAYBACK_SPEED_PRESET_ID) ??
    PLAYBACK_SPEED_PRESETS[0]
  );
}

function formatRunDurationLabel(preset) {
  if (isForeverRunPreset(preset)) {
    return "Forever";
  }
  const target = preset?.effectiveTargetDuration ?? preset?.targetDuration;
  if (Number.isFinite(Number(target))) {
    return `${Number(target)} s`;
  }
  return preset?.displayLabel ?? preset?.label ?? "Run";
}

function formatRunTargetDuration(preset) {
  if (
    isForeverRunPreset(preset)
  ) {
    return "forever";
  }
  return preset?.effectiveTargetDuration ?? preset?.targetDuration ?? "static";
}

function isForeverRunPreset(preset) {
  return (
    preset?.durationMode === "forever" ||
    preset?.targetDuration === Number.POSITIVE_INFINITY ||
    preset?.effectiveTargetDuration === Number.POSITIVE_INFINITY
  );
}

function runControlPresetById(presetId) {
  return (
    RUN_CONTROL_PRESETS.find((preset) => preset.id === presetId) ??
    RUN_CONTROL_PRESETS.find((preset) => preset.id === DEFAULT_RUN_CONTROL_PRESET_ID) ??
    RUN_CONTROL_PRESETS[0]
  );
}

function createDefaultEomRecordReplayOptions(
  options = {},
  preset = runControlPresetById(),
) {
  if (options.eomRecordReplay === false || options.enableEomRecordReplay === false) {
    return null;
  }
  const configured =
    options.eomRecordReplay && typeof options.eomRecordReplay === "object"
      ? options.eomRecordReplay
      : null;
  if (!configured?.record) {
    return null;
  }
  return {
    ...configured,
    targetDuration: configured.targetDuration ?? preset.effectiveTargetDuration ?? preset.targetDuration,
    chunkDuration: configured.chunkDuration ?? preset.effectiveChunkDuration ?? preset.chunkDuration,
  };
}

export function createDefaultEomShadowRunnerOptions(
  options = {},
  preset = runControlPresetById(),
  initialFrameRows = null,
  manifest = BORG_DATASET_MANIFEST_V1,
  runtimeControls = {},
) {
  if (options.eomShadowRunner === false || options.enableEomShadowRunner === false) {
    return null;
  }
  const configured =
    options.eomShadowRunner && typeof options.eomShadowRunner === "object"
      ? options.eomShadowRunner
      : null;
  if (!configured?.eomClient) {
    return null;
  }
  // Forward EOM evolution starts at T=0 unless the caller declares another
  // history cut.
  const historyEndTime = finiteBudgetNumber(
    configured.startTime ?? options.eomHistoryEndTime ?? 0,
  );
  const requestedTarget = configured.targetDuration ?? preset.effectiveTargetDuration ?? preset.targetDuration;
  const historyDepth = positiveControlNumber(
    runtimeControls.historyDepth ?? configured.historyDepth,
    manifest.simulationEnvelope?.historyDepth ?? 10,
  );
  const targetDuration = Number.isFinite(Number(requestedTarget))
    ? Number(requestedTarget)
    : historyEndTime + (finiteBudgetNumber(configured.chunkDuration) ?? 20);
  const runDuration = positiveControlNumber(
    runtimeControls.runDuration ?? configured.runDuration,
    targetDuration - historyEndTime,
  );
  const certifiedBudget = getBorgCertifiedBudgetPreset(
    runtimeControls.certifiedBudgetId ??
      configured.certifiedBudgetId ??
      BORG_DEFAULT_CERTIFIED_BUDGET_ID,
  );
  return {
    ...configured,
    certifiedBudgetId: certifiedBudget.id,
    startTime: historyEndTime,
    targetDuration: historyEndTime + runDuration,
    runDuration,
    historyDepth,
    coreScale: Number(certifiedBudget.allocations.finiteWidth.coreScale),
    farFieldEnclosureFraction:
      certifiedBudget.allocations.ordinary.farFieldEnclosureFraction,
    coupling: String(
      runtimeControls.coupling ?? configured.coupling ?? manifest.modelControls?.coupling ?? 1,
    ),
    initialStep: certifiedBudget.allocations.controller.initialStep,
    minimumStep: certifiedBudget.allocations.controller.minimumStep,
    maximumStep: certifiedBudget.allocations.controller.maximumStep,
    useAdaptiveStepGrowth: certifiedBudget.allocations.controller.adaptiveGrowth,
    simulationOuterRadius: positiveControlNumber(
      runtimeControls.simulationOuterRadius ?? configured.simulationOuterRadius,
      manifest.simulationEnvelope?.outerRadius ?? 1,
    ),
    pathCount: boundedInteger(
      runtimeControls.pathCount,
      configured.pathCount ?? manifest.population?.architrinoCount ?? 1,
      1,
      manifest.population?.maximumArchitrinoCount ?? BORG_MAX_INITIAL_ARCHITRINO_COUNT,
    ),
    chunkDuration: configured.chunkDuration ?? preset.effectiveChunkDuration ?? preset.chunkDuration,
    initialFrameRows: configured.initialFrameRows ?? initialFrameRows ?? undefined,
  };
}

function createEmptyLiveRunBudget() {
  return Object.freeze({
    schema: BORG_LIVE_RUN_BUDGET_VERSION,
    status: "not-measured",
    lastChunkWallTimeMs: null,
    computedFrameRows: null,
    appendedFrameRows: null,
    frameAppendRateRowsPerSecond: null,
    browserHeapGrowthBytes: null,
    browserHeapAuthority: "not-exposed-by-browser",
    wasmWorkerMemoryEstimateBytes: null,
    wasmWorkerMemoryAuthority: "not-measured",
    wasmWorkerMemoryPressure: null,
    memoryBudgetBytes: null,
    chunkDuration: null,
    sampleInterval: null,
    sourcePresetId: null,
    chunkIndex: null,
  });
}

function readLiveRunBudgetSnapshot(windowLike) {
  return {
    timestampMs: windowLike?.performance?.now?.() ?? Date.now(),
    usedJSHeapSize: finiteBudgetNumber(windowLike?.performance?.memory?.usedJSHeapSize),
  };
}

function createLiveRunBudgetMeasurement({
  before,
  after,
  chunk,
  previousFrameRowCount,
  nextFrameRowCount,
  replaceInitialRows,
  appendedFrameRows,
  presetId,
  memoryBudgetBytes,
}) {
  const wallTimeMs = Math.max(0, finiteBudgetNumber(after?.timestampMs - before?.timestampMs) ?? 0);
  const chunkDuration = Math.max(0, finiteBudgetNumber(chunk?.endTime - chunk?.startTime) ?? 0);
  const computedFrameRows = Array.isArray(chunk?.frames) ? chunk.frames.length : 0;
  const measuredAppendedFrameRows =
    finiteBudgetNumber(appendedFrameRows) ??
    (replaceInitialRows
      ? computedFrameRows
      : Math.max(0, (finiteBudgetNumber(nextFrameRowCount) ?? 0) - (finiteBudgetNumber(previousFrameRowCount) ?? 0)));
  const frameAppendRateRowsPerSecond =
    wallTimeMs > 0 ? measuredAppendedFrameRows / (wallTimeMs / 1000) : null;
  const heapGrowthBytes =
    before?.usedJSHeapSize != null && after?.usedJSHeapSize != null
      ? Math.max(0, after.usedJSHeapSize - before.usedJSHeapSize)
      : null;
  const rawWorkerMemoryEstimateBytes = finiteBudgetNumber(chunk?.bufferByteLength);
  const wasmWorkerMemoryEstimateBytes =
    rawWorkerMemoryEstimateBytes != null && rawWorkerMemoryEstimateBytes > 0
      ? rawWorkerMemoryEstimateBytes
      : null;
  const memoryBudgetPressure =
    wasmWorkerMemoryEstimateBytes != null && memoryBudgetBytes > 0
      ? wasmWorkerMemoryEstimateBytes / memoryBudgetBytes
      : null;
  const status =
    wallTimeMs <= 0
      ? "not-measured"
      : heapGrowthBytes == null
        ? "partial-live-run-budget"
        : "measured-live-run-budget";

  return Object.freeze({
    schema: BORG_LIVE_RUN_BUDGET_VERSION,
    status,
    lastChunkWallTimeMs: wallTimeMs,
    computedFrameRows,
    appendedFrameRows: measuredAppendedFrameRows,
    frameAppendRateRowsPerSecond,
    browserHeapGrowthBytes: heapGrowthBytes,
    browserHeapAuthority:
      heapGrowthBytes == null ? "not-exposed-by-browser" : "performance.memory.usedJSHeapSize",
    wasmWorkerMemoryEstimateBytes,
    wasmWorkerMemoryAuthority:
      wasmWorkerMemoryEstimateBytes > 0
        ? "estimated-from-native-output-buffers"
        : "not-exposed-by-worker",
    wasmWorkerMemoryPressure: memoryBudgetPressure,
    memoryBudgetBytes: finiteBudgetNumber(memoryBudgetBytes),
    chunkDuration,
    sampleInterval: finiteBudgetNumber(chunk?.sampleInterval),
    sourcePresetId: presetId ?? null,
    chunkIndex: chunk?.chunkIndex ?? null,
  });
}

function selectFrameRowsByPathCount(frameRows, pathCount) {
  const selectedPathKeys = [...new Set(frameRows.map((row) => Number(row.pathKey)))]
    .filter(Number.isFinite)
    .sort((left, right) => left - right)
    .slice(0, pathCount);
  const selected = new Set(selectedPathKeys);
  return frameRows.filter((row) => selected.has(Number(row.pathKey)));
}

function boundedInteger(value, fallback, minimum, maximum) {
  const number = Number(value);
  return Number.isInteger(number)
    ? Math.min(maximum, Math.max(minimum, number))
    : fallback;
}

function positiveControlNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function finiteBudgetNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function interpolateFrameSet(fromFrameSet, toFrameSet, progress) {
  const toFramesByPathKey = new Map(toFrameSet.frames.map((frame) => [frame.pathKey, frame]));
  return {
    frameIndex: progress < 0.5 ? fromFrameSet.frameIndex : toFrameSet.frameIndex,
    time: lerp(fromFrameSet.time, toFrameSet.time, progress),
    frames: fromFrameSet.frames.map((fromFrame) => {
      const toFrame = toFramesByPathKey.get(fromFrame.pathKey) ?? fromFrame;
      return {
        pathKey: fromFrame.pathKey,
        frameIndex: progress < 0.5 ? fromFrame.frameIndex : toFrame.frameIndex,
        time: lerp(fromFrame.time ?? fromFrameSet.time, toFrame.time ?? toFrameSet.time, progress),
        position: interpolateVector(fromFrame.position, toFrame.position, progress),
        velocity: interpolateVector(fromFrame.velocity, toFrame.velocity, progress),
        errorBound: Math.max(fromFrame.errorBound ?? 0, toFrame.errorBound ?? 0),
        stateFlags: fromFrame.stateFlags ?? toFrame.stateFlags ?? 0,
      };
    }),
  };
}

function interpolateVector(fromVector, toVector, progress) {
  return {
    x: lerp(fromVector?.x ?? 0, toVector?.x ?? 0, progress),
    y: lerp(fromVector?.y ?? 0, toVector?.y ?? 0, progress),
    z: lerp(fromVector?.z ?? 0, toVector?.z ?? 0, progress),
  };
}

function lerp(fromValue, toValue, progress) {
  return fromValue + (toValue - fromValue) * progress;
}

function createArchitrinoPointTexture(documentLike) {
  const canvas = documentLike.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#ffffff";
  context.beginPath();
  context.arc(16, 16, 14, 0, Math.PI * 2);
  context.fill();
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function formatValue(value) {
  if (typeof value === "number") {
    return formatNumber(value);
  }
  if (value == null) {
    return "null";
  }
  return String(value);
}

function formatDiagnosticPercent(value) {
  return Number.isFinite(value)
    ? `${(Number(value) * 100).toFixed(2)}%`
    : "not-measured";
}

function formatDiagnosticPercentagePoints(value) {
  return Number.isFinite(value)
    ? `${(Number(value) * 100).toFixed(2)} percentage points`
    : "not-measured";
}

function formatTimelineLabel(time, frameIndex) {
  return `solver t ${formatTimelineTime(time)} | keyframe ${frameIndex}`;
}

function formatTimelineTime(value) {
  if (!Number.isFinite(value)) {
    return String(value);
  }
  const rounded = Math.abs(value) < 0.05 ? 0 : value;
  return rounded.toFixed(1);
}

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return String(value);
  }
  if (Math.abs(value) >= 1000 || (Math.abs(value) > 0 && Math.abs(value) < 0.001)) {
    return value.toExponential(3);
  }
  return Number(value.toFixed(6)).toString();
}

function vectorLength(vector) {
  return Math.hypot(vector?.x ?? 0, vector?.y ?? 0, vector?.z ?? 0);
}

function isEditableTarget(target) {
  const tagName = target?.tagName;
  if (target?.isContentEditable || tagName === "TEXTAREA" || tagName === "SELECT") {
    return true;
  }
  if (tagName !== "INPUT") {
    return false;
  }
  return ["email", "number", "password", "search", "tel", "text", "url"].includes(target.type);
}

function setTone(element, status) {
  const tone = STATUS_TONE[status] ?? "display";
  element.dataset.tone = tone;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function getBorgTimelineRangePresentation({
  frameIndexes,
  activeFrameIndex,
  isForever,
  isPlaying,
}) {
  if (!Array.isArray(frameIndexes) || frameIndexes.length === 0) {
    return Object.freeze({
      min: 0,
      max: 0,
      value: 0,
      disabled: true,
      mode: "empty",
      title: "No recorded frame is available.",
    });
  }
  if (isForever && isPlaying) {
    return Object.freeze({
      min: 0,
      max: 100,
      value: 50,
      disabled: true,
      mode: "live-follow",
      title: "Following live playback. Pause to scrub buffered frames.",
    });
  }
  const min = Math.min(...frameIndexes);
  const max = Math.max(...frameIndexes);
  return Object.freeze({
    min,
    max,
    value: clamp(activeFrameIndex, min, max),
    disabled: false,
    mode: isForever ? "live-buffer" : "finite-run",
    title: isForever
      ? "Buffered-frame scrubber; a Forever run has no finite completion percentage."
      : "Run progress and frame scrubber.",
  });
}

export function getBorgPlaybackReanchor(frameSets, activeFrameIndex) {
  if (!Array.isArray(frameSets) || frameSets.length === 0) {
    return Object.freeze({
      fromSetIndex: 0,
      toSetIndex: 0,
      fromFrameIndex: null,
      toFrameIndex: null,
    });
  }
  let activeSetIndex = frameSets.findIndex(
    (frameSet) => Number(frameSet?.frameIndex) === Number(activeFrameIndex),
  );
  if (activeSetIndex < 0) {
    activeSetIndex = frameSets.findIndex(
      (frameSet) => Number(frameSet?.frameIndex) > Number(activeFrameIndex),
    );
  }
  if (activeSetIndex < 0) {
    activeSetIndex = frameSets.length - 1;
  }
  const fromSetIndex = frameSets.length < 2
    ? 0
    : Math.min(activeSetIndex, frameSets.length - 2);
  const toSetIndex = Math.min(fromSetIndex + 1, frameSets.length - 1);
  return Object.freeze({
    fromSetIndex,
    toSetIndex,
    fromFrameIndex: frameSets[fromSetIndex]?.frameIndex ?? null,
    toFrameIndex: frameSets[toSetIndex]?.frameIndex ?? null,
  });
}

export function getBorgBufferedPlaybackAdvance({
  rawProgress,
  fromSetIndex,
  frameSetCount,
}) {
  const requestedAdvance = Math.max(0, Math.floor(Number(rawProgress) || 0));
  const availableAdvance = Math.max(
    0,
    Number(frameSetCount) - 1 - Number(fromSetIndex),
  );
  return Math.min(
    requestedAdvance,
    availableAdvance,
    BORG_MAX_VISUAL_CATCH_UP_FRAME_SETS,
  );
}
