import * as THREE from "../../../vendor/three/three.module.js";
import {
  BORG_APP_SURFACE_DESIGN_V1,
  BORG_DATASET_MANIFEST_V1,
  BORG_FAIL_CLOSED_ROWS,
  getBorgFrameSet,
  validateBorgFixtureSnapshot,
} from "./BorgFixtureData.js";

const WORLD_UNITS_PER_SOLVER_UNIT = 0.62;
const CAMERA_MIN_DISTANCE = 4.8;
const CAMERA_MAX_DISTANCE = 28;
const DEFAULT_CAMERA_FIT_MARGIN = 1.25;
const FIT_VIEW_MARGIN = 1.14;
const DEFAULT_ROTATION_X = -0.44;
const DEFAULT_ROTATION_Y = 0.66;
const ARCHITRINO_POINT_PIXEL_SIZE = 8;
const ARCHITRINO_PICK_THRESHOLD = 0.22;
const PATH_TUBE_RADIUS = 0.026;
const PLAYBACK_MS_PER_NATIVE_STEP = 120;
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
  "fail-closed-missing-contract": "bad",
  failed: "bad",
  passed: "good",
  "not-measured": "warn",
});

const PARTICLE_STYLES = Object.freeze({
  1001: Object.freeze({
    label: "1001",
    color: 0x0000ff,
    pathColor: 0x8fb4ff,
    velocityColor: 0x9fefff,
    edgeColor: "#0000ff",
    polarity: "electrino",
  }),
  1002: Object.freeze({
    label: "1002",
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
    playButton: queryRequiredElement(documentLike, "#borg-play-button"),
    playButtonIcon: queryRequiredElement(documentLike, "#borg-play-button path"),
    resetButton: queryRequiredElement(documentLike, "#borg-reset-view-button"),
    fitButton: queryRequiredElement(documentLike, "#borg-fit-view-button"),
    focusButton: queryRequiredElement(documentLike, "#borg-focus-selected-button"),
  };

  const frameSets = getBorgFrameSet(manifest);
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
    playbackDirection: 1,
    playbackFromSetIndex: 0,
    playbackToSetIndex: 0,
    playbackSegmentStartedAt: null,
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
      const style = getParticleStyle(pathKey);
      const points = manifest.currentStateFrames
        .filter((frame) => frame.pathKey === pathKey)
        .sort((left, right) => left.frameIndex - right.frameIndex)
        .map((frame) => solverPositionToWorld(frame.position));
      if (points.length < 2) {
        return;
      }
      const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
      const geometry = new THREE.TubeGeometry(
        curve,
        Math.max(12, points.length * 16),
        PATH_TUBE_RADIUS,
        8,
        false,
      );
      const material = new THREE.MeshBasicMaterial({
        color: style.pathColor ?? style.velocityColor ?? style.color,
        transparent: true,
        opacity: 0.82,
        depthTest: false,
        depthWrite: false,
      });
      const trail = new THREE.Mesh(geometry, material);
      trail.visible = false;
      trail.renderOrder = 2;
      pathGroup.add(trail);
    });

    getPathKeys().forEach((pathKey) => {
      const style = getParticleStyle(pathKey);
      const material = new THREE.PointsMaterial({
        color: style.color,
        map: architrinoPointTexture,
        size: ARCHITRINO_POINT_PIXEL_SIZE,
        sizeAttenuation: false,
        alphaTest: 0.5,
        transparent: true,
        depthWrite: false,
      });
      const point = new THREE.Points(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3()]),
        material,
      );
      point.userData.pathKey = pathKey;
      point.userData.kind = "architrino";
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
    const worldSide = sideLength * WORLD_UNITS_PER_SOLVER_UNIT;
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
    dom.nativeStatus.textContent = manifest.nativeSolverStatus;
    setTone(dom.nativeStatus, manifest.nativeSolverStatus);
    dom.manifestStatus.textContent = surfaceDesign.claimLevel;
    setTone(dom.manifestStatus, "app-facing-projection");

    renderFieldRows(dom.sourceFields, [
      ["Manifest", manifest.manifestId],
      ["Model contract", manifest.modelContractId],
      ["Bridge path", manifest.sourceBridgeRun.executionPath],
      ["Source claim", manifest.claimLevel],
      ["Frame rows", manifest.sourceBridgeRun.frameCount],
      ["Native keyframes", manifest.currentStateAndFrameSources.nativeKeyframeCount],
      ["Sample interval", manifest.simulationEnvelope.sampleInterval],
      ["Playback source", manifest.currentStateAndFrameSources.playbackFrameSource],
      ["Initial line", manifest.initialConditions.initialLinePolicy],
      ["Pair action scale", manifest.sourceBridgeRun.pairAccelerationScale],
      ["Path rows", manifest.sourceBridgeRun.pathRowCount],
    ]);

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

    renderFieldRows(dom.initialConditionFields, [
      ["family", manifest.initialConditions.initialConditionFamily],
      ["seed", manifest.initialConditions.initialConditionSeed ?? "null"],
      ["electrinoCount", manifest.initialConditions.electrinoCount],
      ["positrinoCount", manifest.initialConditions.positrinoCount],
      ["velocityPolicy", manifest.initialConditions.velocityPolicy],
      ["velocity rays", "off"],
      ["customEditStatus", manifest.initialConditions.customEditStatus],
    ]);

    renderFieldRows(dom.diagnosticsFields, [
      ["R_boundary->central", manifest.boundaryToCentralResidual.status],
      ["tolerance", manifest.boundaryToCentralResidual.tolerance],
      ["decision", manifest.boundaryToCentralResidual.boundaryReplayDecisionStatus],
      ["benignNoiseStatus", manifest.faceBoundary.benignNoiseStatus],
      ["path bounds", manifest.faceBoundary.pathBoundsFaceCrossing.crossingStatus],
      ["proof claim", manifest.validation.proofClaimStatus],
    ]);

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
    renderFieldRows(dom.deploymentFields, [
      ["deploymentBudgetStatus", manifest.deploymentBudget.deploymentBudgetStatus],
      ["bundleSizeBytes", manifest.deploymentBudget.bundleSizeBytes ?? "not-measured"],
      ["staticAssetTransferBytes", manifest.deploymentBudget.staticAssetTransferBytes ?? "not-measured"],
      ["browserHeapBudget", manifest.deploymentBudget.browserHeapBudget ?? "not-measured"],
      ["gpuMemoryBudget", manifest.deploymentBudget.gpuMemoryBudget ?? "not-measured"],
      ["nativeSolverThroughput", "not-measured"],
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
    const frameIndexes = frameSets.map((entry) => entry.frameIndex);
    dom.timelineRange.min = String(Math.min(...frameIndexes));
    dom.timelineRange.max = String(Math.max(...frameIndexes));
    dom.timelineRange.step = "1";
    dom.timelineRange.value = String(state.activeFrameIndex);
  }

  function bindEvents() {
    dom.timelineRange.addEventListener("input", () => {
      stopPlayback();
      updateFrame(Number(dom.timelineRange.value));
    });
    dom.playButton.addEventListener("click", () => {
      togglePlayback();
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
      outputLabel: `t ${formatNumber(frameSet.time)} | frame ${frameSet.frameIndex}`,
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
    state.playing = true;
    setPlayButtonPresentation(true);
    const currentSetIndex = getFrameSetIndex(state.activeFrameIndex);
    const direction = currentSetIndex >= frameSets.length - 1 ? -1 : 1;
    startPlaybackSegment(currentSetIndex, direction);
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

  function startPlaybackSegment(fromSetIndex, direction, startedAt = null) {
    let nextDirection = direction;
    let toSetIndex = fromSetIndex + nextDirection;
    if (toSetIndex < 0 || toSetIndex >= frameSets.length) {
      nextDirection *= -1;
      toSetIndex = fromSetIndex + nextDirection;
    }
    if (toSetIndex < 0 || toSetIndex >= frameSets.length) {
      stopPlayback();
      return;
    }
    state.playbackDirection = nextDirection;
    state.playbackFromSetIndex = fromSetIndex;
    state.playbackToSetIndex = toSetIndex;
    state.playbackSegmentStartedAt = startedAt;
    queuePlaybackFrame();
  }

  function stepPlayback(now) {
    if (!state.playing) {
      return;
    }
    const fromFrameSet = frameSets[state.playbackFromSetIndex];
    const toFrameSet = frameSets[state.playbackToSetIndex];
    if (!fromFrameSet || !toFrameSet) {
      stopPlayback();
      return;
    }
    if (state.playbackSegmentStartedAt == null) {
      state.playbackSegmentStartedAt = now;
    }
    const progress = clamp(
      (now - state.playbackSegmentStartedAt) / PLAYBACK_MS_PER_NATIVE_STEP,
      0,
      1,
    );
    const displayFrameSet = interpolateFrameSet(fromFrameSet, toFrameSet, progress);
    applyFrameSet(displayFrameSet, {
      outputLabel: `t ${formatNumber(displayFrameSet.time)} | frames ${fromFrameSet.frameIndex}->${toFrameSet.frameIndex}`,
      rangeValue: progress < 0.5 ? fromFrameSet.frameIndex : toFrameSet.frameIndex,
    });
    if (progress >= 1) {
      applyFrameSet(toFrameSet, {
        outputLabel: `t ${formatNumber(toFrameSet.time)} | frame ${toFrameSet.frameIndex}`,
        rangeValue: toFrameSet.frameIndex,
      });
      const nextDirection =
        state.playbackToSetIndex === 0 || state.playbackToSetIndex === frameSets.length - 1
          ? state.playbackDirection * -1
          : state.playbackDirection;
      startPlaybackSegment(state.playbackToSetIndex, nextDirection, now);
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
    const style = getParticleStyle(state.selectedPathKey);
    const keyframeCount = manifest.currentStateAndFrameSources.nativeKeyframeCount ?? frameSets.length;
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
    architrinoPointTexture.dispose();
    renderer.dispose();
  }

  function solverPositionToWorld(position) {
    const center = manifest.simulationEnvelope.centralVolume.center;
    return new THREE.Vector3(
      (position.x - center.x) * WORLD_UNITS_PER_SOLVER_UNIT,
      (position.y - center.y) * WORLD_UNITS_PER_SOLVER_UNIT,
      (position.z - center.z) * WORLD_UNITS_PER_SOLVER_UNIT,
    );
  }

  function fitCameraToCentralCube(margin) {
    const worldSide = manifest.simulationEnvelope.centralVolumeSideLength * WORLD_UNITS_PER_SOLVER_UNIT;
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

  function getPathKeys() {
    return [...new Set(manifest.currentStateFrames.map((frame) => frame.pathKey))].sort(
      (left, right) => left - right,
    );
  }
}

function queryRequiredElement(documentLike, selector) {
  const element = documentLike?.querySelector?.(selector);
  if (!element) {
    throw new Error(`Borg app missing required element ${selector}`);
  }
  return element;
}

function getParticleStyle(pathKey) {
  return PARTICLE_STYLES[pathKey] ?? {
    label: String(pathKey),
    color: 0xffffff,
    pathColor: 0xe5f1ff,
    velocityColor: 0xe5f1ff,
    edgeColor: "#ffffff",
    polarity: "architrino",
  };
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
