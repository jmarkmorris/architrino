import * as THREE from "../../../vendor/three/three.module.js";
import {
  BORG_APP_SURFACE_DESIGN_V1,
  BORG_DATASET_MANIFEST_V1,
  BORG_FAIL_CLOSED_ROWS,
  validateBorgFixtureSnapshot,
} from "./BorgFixtureData.js";
import {
  BORG_DYNAMIC_NATIVE_RUN_SOURCE,
  createBorgDynamicNativeRunner,
  createBorgFrameSetsFromRows,
  mergeBorgFrameRows,
} from "./BorgDynamicNativeRunner.js";
import {
  BORG_EOM_SHADOW_RUN_SOURCE,
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
const FINITE_RUN_CONTROL_PRESET_ID = "live-20s";
const DEFAULT_DISTRIBUTION_LABEL = "manifest initial distribution";
const DISTRIBUTION_POSITION_INSET_RATIO = 0.08;
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
    label: "20 seconds",
    displayLabel: "20 s",
    sourceMode: "live",
    targetDuration: 20,
    chunkDuration: 20,
    minTargetDuration: 20,
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
  "computed-central-solver-compatibility-chunks": "warn",
  "central-solver-compatibility-output": "warn",
  "computed-eom-shadow-chunks": "warn",
  "eom-shadow-running": "warn",
  "eom-shadow-output": "warn",
  "canonical-eom-output": "good",
  "live-native-running": "good",
  "precomputed-fixture": "warn",
  "fixture-fallback": "warn",
  "live-native-error": "bad",
  "completed-live-native-run": "good",
  "measured-live-run-budget": "good",
  "partial-live-run-budget": "warn",
  "fail-closed-missing-contract": "bad",
  failed: "bad",
  passed: "good",
  "not-measured": "warn",
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
  validateBorgFixtureSnapshot({ manifest, surfaceDesign });

  const dom = {
    app: queryRequiredElement(documentLike, "#borg-app"),
    canvas: queryRequiredElement(documentLike, "#borg-canvas"),
    layerStrip: queryRequiredElement(documentLike, "#borg-layer-strip"),
    envelopeFields: queryRequiredElement(documentLike, "#borg-envelope-fields"),
    initialConditionFields: queryRequiredElement(documentLike, "#borg-initial-condition-fields"),
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

  const fixtureFrames = [...manifest.currentStateFrames];
  let currentFrames = [...fixtureFrames];
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
  const particleObjects = new Map();
  const velocityLines = new Map();
  const architrinoPointTexture = createArchitrinoPointTexture(documentLike);
  const particleStyles = createParticleStyles(currentFrames);

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
    sourceMode: "precomputed-fixture",
    dynamicRunnerStatus: "precomputed-fixture",
    dynamicRunnerMessage: "static native fixture loaded",
    dynamicRunnerKind: "compatibility-fixture",
    dynamicRunner: null,
    dynamicChunkPromise: null,
    dynamicChunksComputed: 0,
    dynamicTargetDuration: null,
    dynamicChunkDuration: null,
    dynamicRunGeneration: 0,
    liveRunBudget: createEmptyLiveRunBudget(),
    compactedPathHistory: Object.freeze({}),
    liveRunRetention: createBorgLiveRunRetentionSnapshot({ frameRows: currentFrames }),
    measuredRunPresetCalibration: createMeasuredRunPresetCalibration({
      basePresets: RUN_CONTROL_PRESETS,
    }),
    distributionFrameRows: null,
    distributionSeedIndex: 0,
    distributionLabel: DEFAULT_DISTRIBUTION_LABEL,
    resizeObserver: null,
  };

  buildScene();
  renderStaticPanels();
  renderLayerStrip();
  configureTimeline();
  resetView();
  bindEvents();
  updateLayerVisibility();
  updateFrame(state.activeFrameIndex);
  setPlayButtonPresentation(false);
  resize();
  startDynamicNativeRunner();

  return {
    manifest,
    surfaceDesign,
    setFrame: updateFrame,
    resetView,
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

    getPathKeys().forEach((pathKey) => {
      const style = getParticleStyle(pathKey, particleStyles);
      const points = currentFrames
        .filter((frame) => frame.pathKey === pathKey)
        .sort((left, right) => left.frameIndex - right.frameIndex)
        .map((frame) => solverPositionToWorld(frame.position));
      if (points.length < 2) {
        return;
      }
      const geometry = createPathSegmentGeometry(points);
      const material = new THREE.LineBasicMaterial({
        color: style.pathColor ?? style.velocityColor ?? style.color,
        transparent: true,
        opacity: 0.9,
        depthTest: false,
        depthWrite: false,
      });
      const trail = new THREE.LineSegments(geometry, material);
      trail.visible = false;
      trail.renderOrder = PATH_RENDER_ORDER;
      pathGroup.add(trail);
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
      const velocityLine = new THREE.Line(velocityGeometry, velocityMaterial);
      velocityLine.visible = false;
      velocityGroup.add(velocityLine);
      velocityLines.set(pathKey, velocityLine);
    });
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
    dom.manifestStatus.textContent = surfaceDesign.claimLevel;
    setTone(dom.manifestStatus, "app-facing-projection");

    renderSourceFields();
    renderEnvelopeFields();
    renderInitialConditionFields();
    renderDiagnosticFields();
    renderFailClosedRows();
    renderFieldRows(
      dom.authorityFields,
      Object.entries(surfaceDesign.authorityMap).map(([key, value]) => [key, value]),
    );
    renderFieldRows(dom.renderFields, [
      ["renderPixelSize", surfaceDesign.firstViewport.renderPixelSize],
      ["visualQualityMode", manifest.renderManifests[0]?.visualQualityMode ?? "not-measured"],
      ["renderStatus", manifest.renderManifests[0]?.renderStatus ?? "not-measured"],
      ["viewportCssSize", manifest.renderManifests[0]?.viewportCssSize ?? "not-measured"],
    ]);
    renderDeploymentFields();
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
      ["Run duration", formatRunDurationLabel(activePreset)],
      ["Preset basis", activePreset?.thresholdAuthority ?? "not-measured"],
      ["Preset target", formatRunTargetDuration(activePreset)],
      ["Preset chunk", activePreset?.effectiveChunkDuration ?? "static"],
      ["Distribution", state.distributionLabel],
      ["Run budget", state.liveRunBudget.status],
      ["Live status", state.dynamicRunnerStatus],
      ["Runner kind", state.dynamicRunnerKind],
      ["Live target", state.dynamicTargetDuration ?? "not-started"],
      ["Live chunk", state.dynamicChunkDuration ?? "not-started"],
      ["Live chunks", state.dynamicChunksComputed],
      ["Retention", state.liveRunRetention.status],
      ["Retained frames", state.liveRunRetention.retainedFrameRows],
      ["Retained keyframes", state.liveRunRetention.retainedFrameSetCount],
      ["Compacted path points", state.liveRunRetention.compactedPathPointCount],
      ["Live message", state.dynamicRunnerMessage],
      ["Manifest", manifest.manifestId],
      ["Model contract", manifest.modelContractId],
      ["Bridge path", manifest.sourceBridgeRun.executionPath],
      ["Source claim", manifest.claimLevel],
      ["Frame rows", currentFrames.length],
      ["Native keyframes", frameSets.length],
      ["Sample interval", manifest.simulationEnvelope.sampleInterval],
      ["Playback source", state.sourceMode],
      ["Initial layout", manifest.initialConditions.initialLinePolicy],
      ["Solver mode", manifest.sourceBridgeRun.solverMode],
      ["Motion law", manifest.sourceBridgeRun.motionLaw],
      ["Parameter set", manifest.sourceBridgeRun.fixedPhysicalParameterSetId],
      ["Parameter authority", manifest.sourceBridgeRun.fixedPhysicalParameterAuthority],
      ["Visual tuning", manifest.sourceBridgeRun.visualTuningStatus],
      ["Visual authority", manifest.sourceBridgeRun.visualBehaviorAuthority],
      ["Master equation", manifest.sourceBridgeRun.nativeMasterEquationStatus],
      ["ME probe", manifest.nativeMasterEquationProbe?.statusCode],
      ["ME fallback", manifest.nativeMasterEquationProbe?.fallbackDecision],
      ["Path rows", manifest.sourceBridgeRun.pathRowCount],
    ]);
  }

  function renderEnvelopeFields() {
    renderFieldRows(dom.envelopeFields, [
      ["sideLength", manifest.simulationEnvelope.sideLength],
      ["centralVolumeSideLength", manifest.simulationEnvelope.centralVolumeSideLength],
      ["faceBufferMargin", manifest.simulationEnvelope.faceBufferMargin],
      ["duration", manifest.simulationEnvelope.duration],
      ["sampleInterval", manifest.simulationEnvelope.sampleInterval],
      ["historyDepth", manifest.simulationEnvelope.historyDepth],
      ["fieldSpeed", manifest.simulationEnvelope.fieldSpeed],
      ["wakeHorizon", manifest.simulationEnvelope.wakeHorizon],
      ["centralVelocityBound", manifest.simulationEnvelope.centralVelocityBound],
      ["centralObservationInterval", manifest.simulationEnvelope.centralObservationInterval],
      ["centralArchitrinoCount", manifest.population.centralArchitrinoCount],
      ["architrinoCount", manifest.population.architrinoCount],
      ["bufferArchitrinoCount", manifest.population.bufferArchitrinoCount],
      ["strictCentralBufferStatus", manifest.simulationEnvelope.strictCentralBufferStatus],
    ]);
  }

  function renderInitialConditionFields() {
    renderFieldRows(dom.initialConditionFields, [
      ["family", manifest.initialConditions.initialConditionFamily],
      ["seed", manifest.initialConditions.initialConditionSeed ?? "null"],
      ["electrinoCount", manifest.initialConditions.electrinoCount],
      ["positrinoCount", manifest.initialConditions.positrinoCount],
      ["velocityPolicy", manifest.initialConditions.velocityPolicy],
      ["velocity rays", "off"],
      ["customEditStatus", manifest.initialConditions.customEditStatus],
    ]);
  }

  function renderDiagnosticFields() {
    renderFieldRows(dom.diagnosticsFields, [
      ["R_boundary->central", manifest.boundaryToCentralResidual.status],
      ["tolerance", manifest.boundaryToCentralResidual.tolerance],
      ["decision", manifest.boundaryToCentralResidual.boundaryReplayDecisionStatus],
      ["benignNoiseStatus", manifest.faceBoundary.benignNoiseStatus],
      ["path bounds", manifest.faceBoundary.pathBoundsFaceCrossing.crossingStatus],
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

  function syncRunDurationButton() {
    const preset = getRunControlPreset(state.runControlPresetId);
    const label = formatRunDurationLabel(preset);
    dom.runDurationButton.textContent = label;
    dom.runDurationButton.dataset.runDuration = preset.id;
    dom.runDurationButton.setAttribute("aria-label", `Run duration: ${label}`);
    dom.runDurationButton.title = "Toggle run duration";
  }

  function updateTimelineBounds() {
    const frameIndexes = frameSets.map((entry) => entry.frameIndex);
    dom.timelineRange.min = String(Math.min(...frameIndexes));
    dom.timelineRange.max = String(Math.max(...frameIndexes));
    dom.timelineRange.step = "1";
    dom.timelineRange.value = String(
      clamp(state.activeFrameIndex, Number(dom.timelineRange.min), Number(dom.timelineRange.max)),
    );
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
    dom.runDurationButton.addEventListener("click", toggleRunDurationMode);
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
    pathGroup.children.forEach((trail) => {
      trail.visible = pathGroup.visible;
    });
    velocityGroup.visible = state.activeLayers.has("velocity-vectors");
    velocityLines.forEach((line) => {
      line.visible = velocityGroup.visible;
    });
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
      outputLabel: formatTimelineLabel(frameSet.time, frameSet.frameIndex),
      rangeValue: frameSet.frameIndex,
    });
  }

  function applyFrameSet(frameSet, { outputLabel, rangeValue }) {
    state.activeFrameIndex = frameSet.frameIndex;
    dom.timelineRange.value = String(rangeValue);
    dom.timelineOutput.value = outputLabel;
    frameSet.frames.forEach((frame) => {
      const particle = particleObjects.get(frame.pathKey);
      if (!particle) {
        return;
      }
      particle.position.copy(solverPositionToWorld(frame.position));
      particle.userData.frame = frame;
      updateVelocityLine(frame);
    });
    updateSelectedTag();
    render();
  }

  function updateVelocityLine(frame) {
    const line = velocityLines.get(frame.pathKey);
    if (!line) {
      return;
    }
    const start = solverPositionToWorld(frame.position);
    const velocity = new THREE.Vector3(frame.velocity.x, frame.velocity.y, frame.velocity.z);
    const speed = velocity.length();
    const direction = speed > 0 ? velocity.normalize() : new THREE.Vector3(1, 0, 0);
    const end = start
      .clone()
      .add(direction.multiplyScalar(Math.log10(1 + speed) * 0.88));
    line.geometry.setFromPoints([start, end]);
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
    startDynamicNativeRunnerIfNeeded();
    let currentSetIndex = getFrameSetIndex(state.activeFrameIndex);
    if (currentSetIndex >= frameSets.length - 1) {
      currentSetIndex = 0;
      updateFrame(frameSets[0].frameIndex);
    }
    state.playing = true;
    setPlayButtonPresentation(true);
    ensureDynamicFramesAhead();
    startPlaybackSegment(currentSetIndex);
  }

  function stopPlayback() {
    state.playing = false;
    setPlayButtonPresentation(false);
    cancelQueuedPlaybackFrame();
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
          ensureDynamicFramesAhead();
          queuePlaybackFrame();
          return;
        }
        applyFrameSet(frameSets.at(-1), {
          outputLabel: formatTimelineLabel(frameSets.at(-1).time, frameSets.at(-1).frameIndex),
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
      outputLabel: formatTimelineLabel(displayFrameSet.time, currentFrameIndex),
      rangeValue: currentFrameIndex,
    });
    if (progress >= 1) {
      applyFrameSet(toFrameSet, {
        outputLabel: formatTimelineLabel(toFrameSet.time, toFrameSet.frameIndex),
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
    disposeDynamicRunner();
    disposePathTrails();
    architrinoPointTexture.dispose();
    renderer.dispose();
  }

  function solverPositionToWorld(position) {
    const center = manifest.simulationEnvelope.centralVolume.center;
    return new THREE.Vector3(
      (position.x - center.x) * worldUnitsPerSolverUnit,
      (position.y - center.y) * worldUnitsPerSolverUnit,
      (position.z - center.z) * worldUnitsPerSolverUnit,
    );
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
    return state.distributionFrameRows ?? fixtureFrames;
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
    state.dynamicRunner.setRunLimits?.({
      targetDuration: preset?.effectiveTargetDuration,
      chunkDuration: preset?.effectiveChunkDuration,
    });
    state.dynamicTargetDuration = state.dynamicRunner.targetDuration ?? state.dynamicRunner.config.targetDuration;
    state.dynamicChunkDuration = state.dynamicRunner.chunkDuration ?? state.dynamicRunner.config.chunkDuration;
  }

  function startDynamicNativeRunner() {
    const preset = getRunControlPreset(state.runControlPresetId);
    if (preset.sourceMode === "fixture") {
      restoreFixtureRun();
      return;
    }
    const eomRunnerOptions = createDefaultEomShadowRunnerOptions(
      options,
      preset,
      getRunInitialFrameRows(),
      manifest,
    );
    const runnerOptions = eomRunnerOptions ?? createDefaultDynamicRunnerOptions(
      windowLike,
      options,
      preset,
      getRunInitialFrameRows(),
    );
    if (!runnerOptions) {
      restoreFixtureRun();
      state.dynamicRunnerStatus = "fixture-fallback";
      state.dynamicRunnerMessage = "live native runner unavailable";
      updateSourceStatusPresentation();
      renderSourceFields();
      renderDeploymentFields();
      return;
    }
    const generation = state.dynamicRunGeneration;
    try {
      state.dynamicRunner = eomRunnerOptions
        ? createBorgEomShadowRunner(manifest, runnerOptions)
        : createBorgDynamicNativeRunner(manifest, runnerOptions);
    } catch (error) {
      restoreFixtureRun();
      state.dynamicRunnerStatus = eomRunnerOptions ? "live-native-error" : "fixture-fallback";
      state.dynamicRunnerMessage = error?.message ?? "live runner failed";
      state.dynamicRunnerKind = eomRunnerOptions ? "eom-shadow-failed" : "compatibility-failed";
      updateSourceStatusPresentation();
      renderSourceFields();
      renderDeploymentFields();
      return;
    }
    state.dynamicRunnerKind = eomRunnerOptions ? "eom-shadow" : "central-solver-compatibility";
    applyMeasuredPresetLimitsToDynamicRunner();
    state.dynamicRunnerStatus = eomRunnerOptions ? "eom-shadow-running" : "live-native-running";
    state.dynamicRunnerMessage = eomRunnerOptions
      ? "computing certified EOM shadow chunks"
      : "computing central-solver compatibility chunks";
    updateSourceStatusPresentation();
    renderSourceFields();
    renderDeploymentFields();
    ensureDynamicFramesAhead({ replaceFixture: true, generation });
  }

  function ensureDynamicFramesAhead({
    replaceFixture = false,
    generation = state.dynamicRunGeneration,
  } = {}) {
    if (!state.dynamicRunner || state.dynamicChunkPromise || !state.dynamicRunner.canComputeNextChunk()) {
      return state.dynamicChunkPromise;
    }
    state.dynamicRunnerStatus = "live-native-running";
    state.dynamicRunnerMessage = "computing native chunk";
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
        state.sourceMode = chunk.source;
        state.dynamicRunnerStatus = state.dynamicRunner.canComputeNextChunk()
          ? chunk.source
          : "completed-live-native-run";
        state.dynamicRunnerMessage = `chunk ${chunk.chunkIndex} ready`;
        currentFrames = replaceFixture
          ? [...chunk.frames]
          : mergeBorgFrameRows(currentFrames, chunk.frames);
        const appendedFrameRows = Array.isArray(chunk.frames) ? chunk.frames.length : 0;
        applyLiveRunRetentionIfNeeded();
        frameSets = createBorgFrameSetsFromRows(currentFrames);
        state.liveRunBudget = createLiveRunBudgetMeasurement({
          before: budgetBefore,
          after: readLiveRunBudgetSnapshot(windowLike),
          chunk,
          previousFrameRowCount,
          nextFrameRowCount: currentFrames.length,
          replaceFixture,
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
        rebuildPathTrails();
        updateTimelineBounds();
        if (replaceFixture) {
          updateFrame(frameSets[0]?.frameIndex ?? 0);
        } else {
          updateFrame(clamp(state.activeFrameIndex, frameSets[0]?.frameIndex ?? 0, frameSets.at(-1)?.frameIndex ?? 0));
        }
        updateSourceStatusPresentation();
        renderSourceFields();
        renderDeploymentFields();
        return chunk;
      })
      .catch((error) => {
        if (generation !== state.dynamicRunGeneration) {
          return null;
        }
        const hadLiveFrames =
          state.sourceMode === BORG_DYNAMIC_NATIVE_RUN_SOURCE ||
          state.sourceMode === BORG_EOM_SHADOW_RUN_SOURCE;
        state.dynamicRunnerStatus = hadLiveFrames ? "live-native-error" : "fixture-fallback";
        state.dynamicRunnerMessage = error?.message ?? "live native runner failed";
        if (!hadLiveFrames) {
          state.sourceMode = "precomputed-fixture";
          state.distributionFrameRows = null;
          state.distributionLabel = DEFAULT_DISTRIBUTION_LABEL;
          currentFrames = [...fixtureFrames];
          frameSets = createBorgFrameSetsFromRows(currentFrames);
          resetLiveRunRetentionState();
          rebuildPathTrails();
          updateTimelineBounds();
          updateFrame(frameSets[0]?.frameIndex ?? 0);
        }
        updateSourceStatusPresentation();
        renderSourceFields();
        renderDeploymentFields();
        return null;
      })
      .finally(() => {
        if (generation === state.dynamicRunGeneration) {
          state.dynamicChunkPromise = null;
        }
      });
    return state.dynamicChunkPromise;
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

  function rebuildPathTrails() {
    disposePathTrails();
    renderCompactedPathTrails();
    getPathKeys().forEach((pathKey) => {
      const style = getParticleStyle(pathKey, particleStyles);
      const points = currentFrames
        .filter((frame) => frame.pathKey === pathKey)
        .sort((left, right) => left.frameIndex - right.frameIndex)
        .map((frame) => solverPositionToWorld(frame.position));
      if (points.length < 2) {
        return;
      }
      const geometry = createPathSegmentGeometry(points);
      const material = new THREE.LineBasicMaterial({
        color: style.pathColor ?? style.velocityColor ?? style.color,
        transparent: true,
        opacity: 0.9,
        depthTest: false,
        depthWrite: false,
      });
      const trail = new THREE.LineSegments(geometry, material);
      trail.visible = pathGroup.visible;
      trail.renderOrder = PATH_RENDER_ORDER;
      pathGroup.add(trail);
    });
  }

  function renderCompactedPathTrails() {
    Object.entries(state.compactedPathHistory).forEach(([pathKey, points]) => {
      if (!Array.isArray(points) || points.length < 2) {
        return;
      }
      const style = getParticleStyle(Number(pathKey), particleStyles);
      const geometry = createPathSegmentGeometry(
        points.map((point) => solverPositionToWorld(point.position)),
      );
      const material = new THREE.LineBasicMaterial({
        color: style.pathColor ?? style.velocityColor ?? style.color,
        transparent: true,
        opacity: 0.42,
        depthTest: false,
        depthWrite: false,
      });
      const trail = new THREE.LineSegments(geometry, material);
      trail.visible = pathGroup.visible;
      trail.renderOrder = PATH_RENDER_ORDER - 1;
      pathGroup.add(trail);
    });
  }

  function disposePathTrails() {
    while (pathGroup.children.length > 0) {
      const child = pathGroup.children[0];
      pathGroup.remove(child);
      child.geometry?.dispose?.();
      child.material?.dispose?.();
    }
  }

  function updateSourceStatusPresentation() {
    dom.nativeStatus.textContent = state.dynamicRunnerStatus;
    setTone(dom.nativeStatus, state.dynamicRunnerStatus);
  }

  function switchRunControlPreset(presetId) {
    const preset = getRunControlPreset(presetId);
    stopPlayback();
    state.runControlPresetId = preset.id;
    syncRunDurationButton();
    disposeDynamicRunner();
    if (preset.sourceMode === "fixture") {
      restoreFixtureRun();
      return;
    }
    resetDynamicRunState();
    startDynamicNativeRunner();
  }

  function toggleRunDurationMode() {
    const nextPresetId = state.runControlPresetId === DEFAULT_RUN_CONTROL_PRESET_ID
      ? FINITE_RUN_CONTROL_PRESET_ID
      : DEFAULT_RUN_CONTROL_PRESET_ID;
    switchRunControlPreset(nextPresetId);
  }

  function startDynamicNativeRunnerIfNeeded() {
    const preset = getRunControlPreset(state.runControlPresetId);
    if (preset.sourceMode === "fixture" || state.dynamicRunner) {
      return;
    }
    startDynamicNativeRunner();
  }

  function restoreFixtureRun() {
    disposeDynamicRunner();
    state.distributionFrameRows = null;
    state.distributionLabel = DEFAULT_DISTRIBUTION_LABEL;
    currentFrames = [...fixtureFrames];
    frameSets = createBorgFrameSetsFromRows(currentFrames);
    resetLiveRunRetentionState();
    rebuildPathTrails();
    state.sourceMode = "precomputed-fixture";
    state.dynamicRunnerStatus = "precomputed-fixture";
    state.dynamicRunnerMessage = "static native fixture loaded";
    state.dynamicRunnerKind = "compatibility-fixture";
    state.dynamicChunksComputed = 0;
    state.dynamicTargetDuration = null;
    state.dynamicChunkDuration = null;
    state.liveRunBudget = createEmptyLiveRunBudget();
    updateTimelineBounds();
    updateFrame(frameSets[0]?.frameIndex ?? 0);
    syncRunDurationButton();
    updateSourceStatusPresentation();
    renderSourceFields();
    renderDeploymentFields();
  }

  function resetDynamicRunState() {
    currentFrames = [...getRunInitialFrameRows()];
    frameSets = createBorgFrameSetsFromRows(currentFrames);
    resetLiveRunRetentionState();
    rebuildPathTrails();
    state.sourceMode = state.distributionFrameRows
      ? "seeded-random-live-initial-state"
      : "precomputed-fixture";
    state.dynamicRunnerStatus = "live-native-running";
    state.dynamicRunnerMessage = "computing native chunks";
    state.dynamicRunnerKind = options.eomShadowRunner ? "eom-shadow" : "central-solver-compatibility";
    state.dynamicChunksComputed = 0;
    state.dynamicTargetDuration = null;
    state.dynamicChunkDuration = null;
    state.liveRunBudget = createEmptyLiveRunBudget();
    updateTimelineBounds();
    updateFrame(frameSets[0]?.frameIndex ?? 0);
    updateSourceStatusPresentation();
    renderSourceFields();
    renderDeploymentFields();
  }

  function startNewDistributionRun() {
    stopPlayback();
    state.distributionSeedIndex += 1;
    state.distributionFrameRows = createSeededDistributionFrameRows(
      manifest,
      fixtureFrames,
      state.distributionSeedIndex,
    );
    state.distributionLabel = `seeded distribution ${state.distributionSeedIndex}`;
    state.runControlPresetId = getRunControlPreset(state.runControlPresetId).id;
    syncRunDurationButton();
    disposeDynamicRunner();
    resetDynamicRunState();
    startDynamicNativeRunner();
  }

  function disposeDynamicRunner() {
    state.dynamicRunGeneration += 1;
    state.dynamicChunkPromise = null;
    const runner = state.dynamicRunner;
    state.dynamicRunner = null;
    runner?.dispose?.();
  }
}

function createPathSegmentGeometry(points) {
  const segmentPoints = [];
  for (let index = 1; index < points.length; index += 1) {
    segmentPoints.push(points[index - 1], points[index]);
  }
  return new THREE.BufferGeometry().setFromPoints(segmentPoints);
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

function createDefaultDynamicRunnerOptions(
  windowLike,
  options = {},
  preset = runControlPresetById(),
  initialFrameRows = null,
) {
  if (options.enableDynamicNativeRunner === false || options.dynamicNativeRunner === false) {
    return null;
  }
  const configured =
    options.dynamicNativeRunner && typeof options.dynamicNativeRunner === "object"
      ? options.dynamicNativeRunner
      : {};
  const hasExplicitNativeClient =
    configured.solverClient ||
    configured.createSolverBridgeClient ||
    configured.solverWorker ||
    configured.createSolverWorker ||
    configured.createWasmModule;
  const hasWorker = typeof (configured.WorkerCtor ?? windowLike?.Worker) === "function";
  if (!hasExplicitNativeClient && !hasWorker) {
    return null;
  }
  const workerOptions = hasWorker || configured.workerUrl || configured.WorkerCtor
    ? {
        workerUrl: configured.workerUrl ?? new URL("./BorgSolverBridgeWorker.js", import.meta.url).href,
        workerOptions: {
          type: "module",
          ...(configured.workerOptions ?? {}),
        },
        disposeSolverWorkerAfterRun: false,
        terminateSolverWorkerOnDispose: true,
      }
    : {};
  return {
    ...configured,
    targetDuration: configured.targetDuration ?? preset.effectiveTargetDuration ?? preset.targetDuration,
    chunkDuration: configured.chunkDuration ?? preset.effectiveChunkDuration ?? preset.chunkDuration,
    initialFrameRows: configured.initialFrameRows ?? initialFrameRows ?? undefined,
    scope: windowLike,
    ...workerOptions,
    requestTimeoutMs: configured.requestTimeoutMs ?? 120000,
  };
}

function createDefaultEomShadowRunnerOptions(
  options = {},
  preset = runControlPresetById(),
  initialFrameRows = null,
  manifest = BORG_DATASET_MANIFEST_V1,
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
  const historyEndTime = finiteBudgetNumber(
    configured.startTime ?? options.eomHistoryEndTime ??
      Math.max(...(manifest.currentStateFrames ?? []).map((row) => Number(row.time))),
  );
  const requestedTarget = configured.targetDuration ?? preset.effectiveTargetDuration ?? preset.targetDuration;
  const targetDuration = Number.isFinite(Number(requestedTarget))
    ? Number(requestedTarget)
    : historyEndTime + (finiteBudgetNumber(configured.chunkDuration) ?? 20);
  return {
    ...configured,
    startTime: historyEndTime,
    targetDuration: Math.max(
      historyEndTime + (finiteBudgetNumber(configured.sampleInterval) ?? 0.2),
      targetDuration,
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
  replaceFixture,
  appendedFrameRows,
  presetId,
  memoryBudgetBytes,
}) {
  const wallTimeMs = Math.max(0, finiteBudgetNumber(after?.timestampMs - before?.timestampMs) ?? 0);
  const chunkDuration = Math.max(0, finiteBudgetNumber(chunk?.endTime - chunk?.startTime) ?? 0);
  const computedFrameRows = Array.isArray(chunk?.frames) ? chunk.frames.length : 0;
  const measuredAppendedFrameRows =
    finiteBudgetNumber(appendedFrameRows) ??
    (replaceFixture
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

function createSeededDistributionFrameRows(manifest, baseFrames, seedIndex) {
  const rng = createSeededRandom(
    `${manifest.initialConditions?.initialConditionSeed ?? "borg"}:${manifest.initialConditions?.velocitySeed ?? "velocity"}:${seedIndex}`,
  );
  const bounds = manifest.simulationEnvelope?.centralVolume?.bounds ?? {};
  const pathFrames = selectInitialPathFrames(baseFrames);
  const velocityMax = positiveFiniteNumber(
    manifest.initialConditions?.randomVelocityMaxComponentMagnitude,
    0.035,
  );
  const velocityMin = positiveFiniteNumber(
    manifest.initialConditions?.randomVelocityMinSpeed,
    velocityMax * 0.35,
  );

  return Object.freeze(
    pathFrames.map((frame) =>
      Object.freeze({
        ...frame,
        frameIndex: 0,
        time: 0,
        position: createRandomCentralPosition(bounds, rng),
        velocity: createRandomVelocity(rng, velocityMax, velocityMin),
        errorBound: 0,
        runSource: "seeded-random-live-initial-state",
        valueAuthority: "app-generated-native-run-initial-condition",
      }),
    ),
  );
}

function selectInitialPathFrames(frames) {
  const byPathKey = new Map();
  frames.forEach((frame) => {
    const existing = byPathKey.get(frame.pathKey);
    if (!existing || Number(frame.time) < Number(existing.time)) {
      byPathKey.set(frame.pathKey, frame);
    }
  });
  return [...byPathKey.values()].sort((left, right) => left.pathKey - right.pathKey);
}

function createRandomCentralPosition(bounds, rng) {
  return {
    x: randomAxisValue(bounds.x, rng),
    y: randomAxisValue(bounds.y, rng),
    z: randomAxisValue(bounds.z, rng),
  };
}

function randomAxisValue(axisBounds, rng) {
  const [min, max] = Array.isArray(axisBounds) ? axisBounds : [0, 1];
  const low = finiteBudgetNumber(min) ?? 0;
  const high = finiteBudgetNumber(max) ?? low + 1;
  const span = Math.max(1, high - low);
  const inset = Math.min(span * DISTRIBUTION_POSITION_INSET_RATIO, span * 0.4);
  return low + inset + rng() * Math.max(0, span - inset * 2);
}

function createRandomVelocity(rng, maxComponentMagnitude, minSpeed) {
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const velocity = {
      x: randomSignedMagnitude(rng, maxComponentMagnitude),
      y: randomSignedMagnitude(rng, maxComponentMagnitude),
      z: randomSignedMagnitude(rng, maxComponentMagnitude),
    };
    if (vectorLength(velocity) >= minSpeed) {
      return velocity;
    }
  }
  return {
    x: minSpeed,
    y: randomSignedMagnitude(rng, maxComponentMagnitude * 0.25),
    z: randomSignedMagnitude(rng, maxComponentMagnitude * 0.25),
  };
}

function randomSignedMagnitude(rng, magnitude) {
  return (rng() * 2 - 1) * magnitude;
}

function createSeededRandom(seedText) {
  let state = hashSeedText(seedText);
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeedText(seedText) {
  let hash = 2166136261;
  String(seedText).split("").forEach((character) => {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  });
  return hash >>> 0;
}

function finiteBudgetNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function positiveFiniteNumber(value, fallback) {
  const number = finiteBudgetNumber(value);
  return number != null && number > 0 ? number : fallback;
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
