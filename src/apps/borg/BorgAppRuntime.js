import * as THREE from "../../../vendor/three/three.module.js";
import {
  BORG_APP_SURFACE_DESIGN_V1,
  BORG_DATASET_MANIFEST_V1,
  BORG_FAIL_CLOSED_ROWS,
  validateBorgManifest,
} from "./BorgAppManifest.js";
import {
  createBorgFrameSetsFromRows,
  mergeBorgFrameRows,
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
  createMeasuredRunPresetCalibration,
  resolveMeasuredRunControlPreset,
  updateMeasuredRunPresetCalibration,
} from "./BorgMeasuredRunPresets.js";
import {
  BORG_LIVE_RUN_RETENTION_POLICY_V1,
  createBorgLiveRunRetentionSnapshot,
  applyBorgLiveRunRetention,
} from "./BorgLiveRunRetentionPolicy.js";
import { BORG_RELEASE_BUDGET_MANIFEST_V1 } from "./BorgReleaseBudgetManifest.js";
import { createBorgPathTrails } from "./BorgPathTrails.js";
import { createBorgDiagnosticsPanelController } from "./BorgDiagnosticsPanel.js";
import {
  BORG_DISPLAY_RUN_GRADE,
  createBorgRunGradeControl,
} from "./BorgRunGradeControl.js";
import {
  BORG_MAX_INITIAL_ARCHITRINO_COUNT,
  calculateBorgInertialHistoryDepth,
  createBorgAcceptedInertialSeedHistory,
  createBorgInitialConditionConfig,
  createBorgSeededInitialConditionRows,
  validateBorgInitialConditionConfig,
} from "./BorgInitialConditions.js";

const TARGET_CENTRAL_WORLD_SIDE = 4.96;
const BORG_LIVE_RUN_BUDGET_VERSION = "borg-live-run-budget.v1";
const CAMERA_MIN_DISTANCE = 4.8;
const CAMERA_MAX_DISTANCE = 28;
const DEFAULT_CAMERA_FIT_MARGIN = 1.25;
const FIT_VIEW_MARGIN = 1.14;
const DEFAULT_ROTATION_X = -0.44;
const DEFAULT_ROTATION_Y = 0.66;
const ARCHITRINO_POINT_PIXEL_SIZE = 8;
const ARCHITRINO_PICK_THRESHOLD = 0.22;
const DEFAULT_PLAYBACK_SPEED_PRESET_ID = "normal";
const DEFAULT_RUN_CONTROL_PRESET_ID = "live-forever";
const FINITE_RUN_CONTROL_PRESET_ID = "live-60s";
const DEFAULT_DISTRIBUTION_LABEL = "manifest initial-condition policy";
const PLAYBACK_SPEED_PRESETS = Object.freeze([
  Object.freeze({ id: "detail", label: "Detail", msPerNativeStep: 120 }),
  Object.freeze({ id: "normal", label: "Normal", msPerNativeStep: 1000 / 60 }),
  Object.freeze({ id: "fast", label: "Fast", msPerNativeStep: 1000 / 150 }),
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
  "simulation-window": "Cube",
  "architrino-position": "Points",
  "path-history": "Path",
  "velocity-vectors": "Velocity",
  "wake-streams": "Wake",
  "face-boundary-status": "Face",
  diagnostics: "Diag",
  "outbound-face-background": "Face bg",
});

const LAYER_TITLES = Object.freeze({
  "simulation-window": "Displayed central cube",
  "architrino-position": "Architrino positions from native frame rows",
  "path-history": "Path-history traces from native path rows",
  "velocity-vectors": "Velocity direction overlay",
  "wake-streams": "Wake streams are fail-closed until native rows exist",
  "face-boundary-status": "Face-boundary status is fail-closed until native rows exist",
  diagnostics: "Diagnostics are shown in the right rail",
  "outbound-face-background": "Face background is fail-closed until the influence model exists",
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
  "completed-live-native-run": "good",
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
  "completed-live-native-run": "Forward complete",
});

const SOLVER_FAILURE_BANNERS = Object.freeze({
  "live-native-error":
    "Computing stopped. The solver failed part-way; everything after the last good frame is missing.",
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

  const dom = {
    app: queryRequiredElement(documentLike, "#borg-app"),
    diagnosticsPanel: queryRequiredElement(documentLike, "#borg-diagnostics-panel"),
    diagnosticsToggle: queryRequiredElement(documentLike, "#borg-diagnostics-toggle"),
    solverBanner: documentLike.querySelector?.("#borg-solver-banner") ?? null,
    canvas: queryRequiredElement(documentLike, "#borg-canvas"),
    layerStrip: queryRequiredElement(documentLike, "#borg-layer-strip"),
    envelopeFields: queryRequiredElement(documentLike, "#borg-envelope-fields"),
    initialConditionFields: queryRequiredElement(documentLike, "#borg-initial-condition-fields"),
    initialConditionForm: queryRequiredElement(documentLike, "#borg-initial-condition-form"),
    runGradeToggle: queryRequiredElement(documentLike, "#borg-run-grade-toggle"),
    electrinoCount: queryRequiredElement(documentLike, "#borg-electrino-count"),
    positrinoCount: queryRequiredElement(documentLike, "#borg-positrino-count"),
    coupling: queryRequiredElement(documentLike, "#borg-coupling"),
    velocityMaxComponent: queryRequiredElement(documentLike, "#borg-velocity-max-component"),
    velocityMinSpeed: queryRequiredElement(documentLike, "#borg-velocity-min-speed"),
    initialConditionFeedback: queryRequiredElement(documentLike, "#borg-initial-condition-feedback"),
    nativeStatus: queryRequiredElement(documentLike, "#borg-native-status"),
    manifestStatus: queryRequiredElement(documentLike, "#borg-manifest-status"),
    runGradeWarning: queryRequiredElement(documentLike, "#borg-run-grade-warning"),
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
  };

  const initialEomSeed = options.initialEomSeed ?? null;
  const autoStartEom = options.autoStartEom !== false;
  // The accepted seed's endpoint is visible before the first EOM chunk. Its
  // past rows are solver input only and are never presented as computed output.
  const initialDisplayRows = Object.freeze([...(initialEomSeed?.endpointRows ?? [])]);
  let currentFrames = [...initialDisplayRows];
  let frameSets = createBorgFrameSetsFromRows(currentFrames);
  const worldUnitsPerSolverUnit =
    TARGET_CENTRAL_WORLD_SIDE / Math.max(1, manifest.simulationEnvelope.centralVolumeSideLength);
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
  const cubeGroup = new THREE.Group();
  const outerCubeGroup = new THREE.Group();
  const pathGroup = new THREE.Group();
  const velocityGroup = new THREE.Group();
  const pointGroup = new THREE.Group();
  rootGroup.add(cubeGroup, outerCubeGroup, pathGroup, velocityGroup, pointGroup);
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
    playbackSpeedPresetId: DEFAULT_PLAYBACK_SPEED_PRESET_ID,
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
    dynamicChunksComputed: 0,
    eomDisplayStarted: false,
    eomHistoryDepth: positiveControlNumber(
      options.eomShadowRunner?.historyDepth,
      manifest.simulationEnvelope?.historyDepth ?? 10,
    ),
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
    selectedRunGrade:
      options.eomShadowRunner?.runGrade ?? BORG_DISPLAY_RUN_GRADE,
    activeRunGrade:
      options.eomShadowRunner?.runGrade ?? BORG_DISPLAY_RUN_GRADE,
    eomCausticWarningCount: 0,
    eomFirstCausticWarningTime: null,
    liveRunBudget: createEmptyLiveRunBudget(),
    compactedPathHistory: Object.freeze({}),
    liveRunRetention: createBorgLiveRunRetentionSnapshot({ frameRows: currentFrames }),
    measuredRunPresetCalibration: createMeasuredRunPresetCalibration({
      basePresets: RUN_CONTROL_PRESETS,
    }),
    distributionFrameRows: initialEomSeed?.rows ?? null,
    eomSeedEndpointRows: initialEomSeed?.endpointRows ?? null,
    eomSeedCertificate: initialEomSeed?.certificate ?? null,
    distributionSeedIndex: 0,
    distributionLabel: initialEomSeed
      ? "accepted inertial EOM seed 0"
      : DEFAULT_DISTRIBUTION_LABEL,
    initialConditionConfig: createBorgInitialConditionConfig(
      options.initialConditionConfig ?? manifest.initialConditions,
    ),
    initialConditionEditStatus: initialEomSeed
      ? "accepted-initial-datum-active"
      : "manifest-values-active",
    resizeObserver: null,
  };

  const diagnosticsPanelController = createBorgDiagnosticsPanelController({
    panel: dom.diagnosticsPanel,
    toggleButton: dom.diagnosticsToggle,
    render: renderDiagnosticsPanel,
  });
  const runGradeController = createBorgRunGradeControl({
    button: dom.runGradeToggle,
    initialGrade: state.selectedRunGrade,
    onChange(grade) {
      state.selectedRunGrade = grade;
      markInitialConditionControlsPending();
      renderSourceFields();
    },
  });

  buildScene();
  renderStaticPanels();
  renderLayerStrip();
  configureTimeline();
  configureInitialConditionControls();
  configureEomControls();
  resetView();
  bindEvents();
  updateLayerVisibility();
  updateFrame(state.activeFrameIndex);
  setPlayButtonPresentation(false);
  resize();
  if (autoStartEom) {
    startDynamicNativeRunner();
  }

  return {
    manifest,
    surfaceDesign,
    setFrame: updateFrame,
    resetView,
    diagnosticsPanel: diagnosticsPanelController,
    dispose,
  };

  function buildScene() {
    cubeGroup.add(
      createCubeEdges({
        sideLength: manifest.simulationEnvelope.centralVolumeSideLength,
        color: 0x94d38a,
        opacity: 0.46,
      }),
    );
    outerCubeGroup.add(
      createCubeEdges({
        sideLength: manifest.simulationEnvelope.sideLength,
        color: 0x5eb7b7,
        opacity: 0.2,
      }),
    );
    outerCubeGroup.visible = false;

    rebuildPathTrails();

    rebuildParticleObjects();
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

  function createCubeEdges({ sideLength, color, opacity }) {
    const worldSide = sideLength * worldUnitsPerSolverUnit;
    const geometry = new THREE.BoxGeometry(worldSide, worldSide, worldSide);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
    });
    return new THREE.LineSegments(edges, material);
  }

  function renderStaticPanels() {
    updateSourceStatusPresentation();
    dom.manifestStatus.textContent = "Developer test";
    dom.manifestStatus.dataset.status = surfaceDesign.claimLevel;
    dom.manifestStatus.title = surfaceDesign.claimLevel;
    setTone(dom.manifestStatus, "app-facing-projection");

    renderSourceFields();
    renderEnvelopeFields();
    renderInitialConditionFields();
  }

  function renderDiagnosticsPanel() {
    renderDiagnosticFields();
    renderFailClosedRows();
    renderFieldRows(
      dom.authorityFields,
      [
        ["frameAuthority", state.eomCausticWarningCount > 0
          ? "uncertified-through-encounters"
          : "eom-shadow-output"],
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
    renderFieldRows(dom.sourceFields, [
      ["Run source", state.sourceMode],
      ["Run mode", formatRunDurationLabel(activePreset)],
      ["Run grade", state.activeRunGrade],
      ["Next run grade", state.selectedRunGrade],
      ["Uncertified encounters", state.eomCausticWarningCount],
      ["First uncertified encounter", state.eomFirstCausticWarningTime ?? "none"],
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
      ["Required initial separation", manifest.initialConditions.minimumPairSeparation],
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
      ["Polynomial-history depth", options.eomShadowRunner ? state.eomHistoryDepth : "not-applicable"],
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
      ["Sample interval", manifest.simulationEnvelope.sampleInterval],
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
      ["sideLength", manifest.simulationEnvelope.sideLength],
      ["centralVolumeSideLength", manifest.simulationEnvelope.centralVolumeSideLength],
      ["faceBufferMargin", manifest.simulationEnvelope.faceBufferMargin],
      ["sampleInterval", manifest.simulationEnvelope.sampleInterval],
      ["historyDepth", runtimeHistoryDepth],
      ["fieldSpeed", manifest.simulationEnvelope.fieldSpeed],
      ["coupling", state.eomCoupling],
      ["wakeHorizon", runtimeWakeHorizon],
      ["centralArchitrinoCount", runtimePopulationCount ?? manifest.population.centralArchitrinoCount],
      ["architrinoCount", runtimePopulationCount ?? manifest.population.architrinoCount],
      ["bufferArchitrinoCount", runtimePopulationCount == null ? manifest.population.bufferArchitrinoCount : 0],
    ]);
  }

  function renderInitialConditionFields() {
    const config = state.initialConditionConfig;
    const activeInitialRow = state.eomSeedEndpointRows?.[0] ?? state.distributionFrameRows?.[0];
    const activeFamily = activeInitialRow?.runSource === "minimum-separation-lattice-initial-state"
      ? "minimum-separation-lattice"
      : activeInitialRow
        ? "seeded-random-minimum-separation"
        : manifest.initialConditions.initialConditionFamily;
    renderFieldRows(dom.initialConditionFields, [
      ["family", activeFamily],
      ["seed", state.distributionFrameRows ? state.distributionLabel : manifest.initialConditions.initialConditionSeed ?? "null"],
      ["electrinoCount", config.electrinoCount],
      ["positrinoCount", config.positrinoCount],
      ["coupling κ", state.eomCoupling],
      ["runGrade", state.selectedRunGrade],
      ["velocityPolicy", manifest.initialConditions.velocityPolicy],
      ["maxPerAxisSpeed", config.randomVelocityMaxComponentMagnitude],
      ["minimumTotalSpeed", config.randomVelocityMinSpeed],
      ["minimumPairSeparation", manifest.initialConditions.minimumPairSeparation],
      ["measuredMinimumSeparation", state.eomSeedCertificate?.geometryCertificate?.measuredMinimumSeparation ?? "not-certified"],
      ["velocity rays", "off"],
      ["customEditStatus", state.initialConditionEditStatus],
    ]);
  }

  function renderDiagnosticFields() {
    renderFieldRows(dom.diagnosticsFields, [
      ["proof claim", manifest.validation.proofClaimStatus],
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
    syncInitialConditionInputs();
    setInitialConditionFeedback("Manifest values active", "accepted");
  }

  function syncInitialConditionInputs() {
    const config = state.initialConditionConfig;
    dom.electrinoCount.value = String(config.electrinoCount);
    dom.positrinoCount.value = String(config.positrinoCount);
    dom.coupling.value = String(state.eomCoupling);
    dom.velocityMaxComponent.value = String(config.randomVelocityMaxComponentMagnitude);
    dom.velocityMinSpeed.value = String(config.randomVelocityMinSpeed);
  }

  function readInitialConditionControls() {
    const coupling = Number(dom.coupling.value);
    if (!Number.isFinite(coupling) || coupling <= 0) {
      state.initialConditionEditStatus = "rejected-runtime-edit";
      setInitialConditionFeedback("κ coupling must be a number greater than zero.", "bad");
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
    const enabled = Boolean(options.eomShadowRunner);
    dom.eomControls.hidden = !enabled;
    if (!enabled) {
      return;
    }
    dom.eomDuration.min = String(options.eomShadowRunner?.sampleInterval ?? 0.01);
    dom.eomDuration.step = String(options.eomShadowRunner?.sampleInterval ?? 0.01);
    dom.eomDuration.value = String(state.eomRunDuration);
    updateEomControlPresentation();
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
      `Exact polynomial initial history (C1 inertial) covers T=${Number(eomStartTime) - state.eomHistoryDepth} to ${eomStartTime}. ` +
      "It is certified input, not EOM output. Forward EOM evolution begins at T=0 and is computed in chunks conditioned on that history.";
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
      isForever: isForeverRunPreset(getRunControlPreset(state.runControlPresetId)),
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
  }

  function formatActiveTimelineLabel(time, frameIndex) {
    const label = formatTimelineLabel(time, frameIndex);
    if (!isForeverRunPreset(getRunControlPreset(state.runControlPresetId))) {
      return label;
    }
    const bufferedThrough = frameSets.at(-1)?.frameIndex ?? frameIndex;
    return `${label} | buffer ${bufferedThrough}`;
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
    dom.runDurationButton.addEventListener("click", toggleRunDurationMode);
    dom.eomStopButton.addEventListener("click", stopEomRun);
    dom.eomRestartButton.addEventListener("click", restartEomRun);
    dom.playbackSpeed.addEventListener("change", () => {
      state.playbackSpeedPresetId = playbackSpeedPresetById(dom.playbackSpeed.value).id;
      if (state.playing) {
        state.playbackSegmentStartedAt = getPlaybackNow();
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
    cubeGroup.visible = state.activeLayers.has("simulation-window");
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
    pathTrails.setThroughFrameIndex(frameSet.frameIndex);
    updateSelectedTag();
    render();
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
    fitCameraToCentralCube(state.cameraFitMargin);
    render();
  }

  function goToStartFrame() {
    stopPlayback();
    updateFrame(frameSets[0]?.frameIndex ?? 0);
  }

  function fitView() {
    state.cameraFitMargin = FIT_VIEW_MARGIN;
    fitCameraToCentralCube(state.cameraFitMargin);
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

  function startPlayback() {
    if (state.playing || frameSets.length < 2) {
      return;
    }
    let currentSetIndex = getFrameSetIndex(state.activeFrameIndex);
    if (currentSetIndex >= frameSets.length - 1) {
      currentSetIndex = 0;
      updateFrame(frameSets[0].frameIndex);
    }
    state.playing = true;
    setPlayButtonPresentation(true);
    updateTimelineBounds();
    ensureDynamicFramesAhead();
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
        ensureDynamicFramesAhead();
        queuePlaybackFrame();
        return;
      }
      stopPlayback();
      return;
    }
    maybeQueueDynamicFramesAhead();
    if (state.playbackSegmentStartedAt == null) {
      state.playbackSegmentStartedAt = now;
    }
    const msPerNativeStep = getPlaybackMsPerNativeStep();
    const rawProgress = (now - state.playbackSegmentStartedAt) / msPerNativeStep;
    let progress = clamp(rawProgress, 0, 1);
    if (rawProgress >= 1) {
      const advancedStepCount = Math.floor(rawProgress);
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
          }
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
      const remainder = rawProgress - advancedStepCount;
      state.playbackFromSetIndex = nextFromSetIndex;
      state.playbackToSetIndex = nextFromSetIndex + 1;
      state.playbackSegmentStartedAt = now - remainder * msPerNativeStep;
      fromFrameSet = frameSets[state.playbackFromSetIndex];
      toFrameSet = frameSets[state.playbackToSetIndex];
      progress = clamp(remainder, 0, 1);
    }
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
      fitCameraToCentralCube(state.cameraFitMargin);
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
    runGradeController.dispose();
    disposeDynamicRunner();
    disposePathTrails();
    disposeParticleObjects();
    architrinoPointTexture.dispose();
    renderer.dispose();
  }

  /** Write solver coordinates into an existing {x,y,z} target; no allocation. */
  function writeSolverPositionToWorld(position, target) {
    const center = manifest.simulationEnvelope.centralVolume.center;
    target.x = (position.x - center.x) * worldUnitsPerSolverUnit;
    target.y = (position.y - center.y) * worldUnitsPerSolverUnit;
    target.z = (position.z - center.z) * worldUnitsPerSolverUnit;
    return target;
  }


  function fitCameraToCentralCube(margin) {
    const worldSide = manifest.simulationEnvelope.centralVolumeSideLength * worldUnitsPerSolverUnit;
    const cubeRadius = (Math.sqrt(3) * worldSide) / 2;
    const verticalHalfFov = THREE.MathUtils.degToRad(camera.fov * 0.5);
    const horizontalHalfFov = Math.atan(Math.tan(verticalHalfFov) * Math.max(0.1, camera.aspect));
    const limitingHalfFov = Math.min(verticalHalfFov, horizontalHalfFov);
    state.cameraDistance = clamp(
      (cubeRadius / Math.sin(limitingHalfFov)) * margin,
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
    return playbackSpeedPresetById(state.playbackSpeedPresetId).msPerNativeStep;
  }

  function getPathKeys() {
    return [...new Set(currentFrames.map((frame) => frame.pathKey))].sort(
      (left, right) => left - right,
    );
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
        historyDepth: state.eomHistoryDepth,
        coupling: state.eomCoupling,
        runGrade: state.activeRunGrade,
      },
    );
    const runnerOptions = eomRunnerOptions ?? createDefaultEomRecordReplayOptions(
      options,
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
    const firstChunk = startDynamicNativeRunner();
    if (!firstChunk) {
      startPlayback();
      return;
    }
    firstChunk.then((chunk) => {
      if (chunk && state.dynamicRunner) {
        startPlayback();
      }
    });
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
          state.activeRunGrade = chunk.runGrade;
          state.eomCausticWarningCount = chunk.causticWarningCount;
          state.eomFirstCausticWarningTime = chunk.firstCausticWarningTime;
        }
        state.sourceMode = chunk.source;
        state.dynamicRunnerStatus = state.dynamicRunner.canComputeNextChunk()
          ? chunk.source
          : "completed-live-native-run";
        state.dynamicRunnerMessage = `chunk ${chunk.chunkIndex} ready`;
        currentFrames = replaceCurrentFrames
          ? [...chunk.frames]
          : mergeBorgFrameRows(currentFrames, chunk.frames);
        const appendedFrameRows = Array.isArray(chunk.frames) ? chunk.frames.length : 0;
        applyLiveRunRetentionIfNeeded();
        frameSets = createBorgFrameSetsFromRows(currentFrames);
        if (replaceCurrentFrames || state.liveRunRetention?.compactedThisPass) {
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
          : "live-native-error";
        state.dynamicRunnerMessage = error?.message ?? "live native runner failed";
        if (!hadLiveFrames && options.eomShadowRunner) {
          state.sourceMode = "accepted-eom-seed-history";
          currentFrames = [...getRunInitialDisplayRows()];
          frameSets = createBorgFrameSetsFromRows(currentFrames);
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
          updateEomControlPresentation();
          if (options.eomShadowRunner && state.dynamicRunner?.canComputeNextChunk()) {
            windowLike.setTimeout(
              () => ensureDynamicFramesAhead({ generation }),
              0,
            );
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
    if (remainingFrameSets <= 12) {
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
  }

  function applyLiveRunRetentionIfNeeded() {
    if (!isForeverRunPreset(getRunControlPreset(state.runControlPresetId))) {
      state.compactedPathHistory = Object.freeze({});
      state.liveRunRetention = createBorgLiveRunRetentionSnapshot({ frameRows: currentFrames });
      return;
    }
    const result = applyBorgLiveRunRetention({
      frameRows: currentFrames,
      compactedPathHistory: state.compactedPathHistory,
      policy: BORG_LIVE_RUN_RETENTION_POLICY_V1,
    });
    currentFrames = [...result.frameRows];
    state.compactedPathHistory = result.compactedPathHistory;
    state.liveRunRetention = result.summary;
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
    pathTrails.setThroughFrameIndex(state.activeFrameIndex);
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
    const warned = state.eomCausticWarningCount > 0;
    dom.runGradeWarning.hidden = !warned;
    dom.runGradeWarning.textContent = warned
      ? `Display grade — ${state.eomCausticWarningCount} encounters uncertified`
      : "";
    dom.runGradeWarning.title = dom.runGradeWarning.textContent;
    if (warned) {
      setTone(dom.runGradeWarning, "partial-live-run-budget");
    }
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
    state.activeRunGrade = state.selectedRunGrade;
    state.eomCausticWarningCount = 0;
    state.eomFirstCausticWarningTime = null;
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
    const endpointRows = createBorgSeededInitialConditionRows({
      manifest,
      seedIndex: state.distributionSeedIndex,
      config,
    });
    if (options.eomShadowRunner) {
      const historyDepth = calculateBorgInertialHistoryDepth(endpointRows, {
        fieldSpeed: options.eomShadowRunner.fieldSpeed ?? manifest.simulationEnvelope?.fieldSpeed ?? 1,
        sampleInterval: options.eomShadowRunner.sampleInterval ?? manifest.simulationEnvelope?.sampleInterval ?? 0.01,
        maximumSeparation: Math.sqrt(3) * manifest.simulationEnvelope.sideLength,
      });
      const eomConfig = createBorgEomShadowRunConfig(manifest, {
        ...options.eomShadowRunner,
        pathCount: state.eomPathCount,
        historyDepth,
      });
      try {
        const seed = await createBorgAcceptedInertialSeedHistory(endpointRows, {
          historyStartTime: eomConfig.historyStartTime,
          historyEndTime: eomConfig.startTime,
          sampleInterval: eomConfig.sampleInterval,
          minimumPairSeparation: manifest.initialConditions.minimumPairSeparation,
        });
        state.distributionFrameRows = seed.rows;
        state.eomSeedEndpointRows = seed.endpointRows;
        state.eomSeedCertificate = seed.certificate;
        state.eomHistoryDepth = historyDepth;
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
      `Accepted κ=${state.eomCoupling}; ${config.electrinoCount} electrinos + ${config.positrinoCount} positrinos; ${state.eomPathCount ** 2} ordered EOM pairs`,
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
    state.dynamicChunkPromise = null;
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

function createDefaultEomShadowRunnerOptions(
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
  return {
    ...configured,
    startTime: historyEndTime,
    targetDuration: historyEndTime + runDuration,
    runDuration,
    historyDepth,
    coupling: String(
      runtimeControls.coupling ?? configured.coupling ?? manifest.modelControls?.coupling ?? 1,
    ),
    runGrade: runtimeControls.runGrade ?? configured.runGrade ?? BORG_DISPLAY_RUN_GRADE,
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
