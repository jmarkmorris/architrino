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
const CAMERA_MAX_DISTANCE = 17;
const DEFAULT_CAMERA_DISTANCE = 10.5;
const DEFAULT_ROTATION_X = -0.48;
const DEFAULT_ROTATION_Y = 0.72;
const ARCHITRINO_POINT_PIXEL_SIZE = 8;
const ARCHITRINO_PICK_THRESHOLD = 0.22;

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
    edgeColor: "#0000ff",
    polarity: "electrino",
  }),
  1002: Object.freeze({
    label: "1002",
    color: 0xff0000,
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
    activeFrameIndex: frameSets.at(-1)?.frameIndex ?? 0,
    activeLayers: new Set(surfaceDesign.firstViewport.defaultVisibleLayers),
    cameraDistance: DEFAULT_CAMERA_DISTANCE,
    selectedPathKey: null,
    dragging: false,
    pointerId: null,
    pointerStartX: 0,
    pointerStartY: 0,
    pointerLastX: 0,
    pointerLastY: 0,
    pointerTravel: 0,
    playing: false,
    playTimer: null,
  };

  buildScene();
  renderStaticPanels();
  renderLayerStrip();
  configureTimeline();
  resetView();
  bindEvents();
  updateLayerVisibility();
  updateFrame(state.activeFrameIndex);
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
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: style.color,
        transparent: true,
        opacity: 0.58,
      });
      const line = new THREE.Line(geometry, material);
      line.visible = false;
      pathGroup.add(line);
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
        color: style.color,
        transparent: true,
        opacity: 0.72,
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
      ["Path rows", manifest.sourceBridgeRun.pathRowCount],
    ]);

    renderFieldRows(dom.envelopeFields, [
      ["sideLength", manifest.simulationEnvelope.sideLength],
      ["centralVolumeSideLength", manifest.simulationEnvelope.centralVolumeSideLength],
      ["faceBufferMargin", manifest.simulationEnvelope.faceBufferMargin],
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
      ["path bounds", manifest.pathHistory.pathBoundsFaceCrossing.crossingStatus],
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
    surfaceDesign.layerStrip.forEach((layer) => {
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
      if (state.playing) {
        stopPlayback();
      } else {
        startPlayback();
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
    state.activeFrameIndex = frameSet.frameIndex;
    dom.timelineRange.value = String(frameSet.frameIndex);
    dom.timelineOutput.value = `t ${formatNumber(frameSet.time)} | frame ${frameSet.frameIndex}`;
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
    state.cameraDistance = DEFAULT_CAMERA_DISTANCE;
    camera.position.set(0, 0, state.cameraDistance);
    camera.lookAt(0, 0, 0);
    render();
  }

  function fitView() {
    state.cameraDistance = 9.2;
    camera.position.set(0, 0, state.cameraDistance);
    camera.lookAt(0, 0, 0);
    render();
  }

  function focusSelected() {
    const particle = particleObjects.get(state.selectedPathKey);
    if (!particle) {
      fitView();
      return;
    }
    const target = particle.position.clone();
    camera.lookAt(target);
    render();
  }

  function startPlayback() {
    state.playing = true;
    dom.playButton.classList.add("is-active");
    dom.playButton.setAttribute("aria-pressed", "true");
    dom.playButton.title = "Pause";
    state.playTimer = windowLike.setInterval(() => {
      const currentIndex = frameSets.findIndex((entry) => entry.frameIndex === state.activeFrameIndex);
      const next = frameSets[(currentIndex + 1) % frameSets.length];
      updateFrame(next.frameIndex);
    }, 950);
  }

  function stopPlayback() {
    state.playing = false;
    dom.playButton.classList.remove("is-active");
    dom.playButton.setAttribute("aria-pressed", "false");
    dom.playButton.title = "Play";
    if (state.playTimer != null) {
      windowLike.clearInterval(state.playTimer);
      state.playTimer = null;
    }
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
    dom.selectedTag.hidden = false;
    dom.selectedTag.textContent = `${style.polarity} ${state.selectedPathKey} | speed ${formatNumber(speed)} | ${manifest.currentStateFrames.length} frame rows`;
  }

  function resize() {
    const rect = dom.canvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    renderer.setPixelRatio(Math.min(2, windowLike.devicePixelRatio || 1));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
  }

  function render() {
    renderer.render(scene, camera);
  }

  function dispose() {
    stopPlayback();
    state.resizeObserver?.disconnect?.();
    windowLike.removeEventListener("resize", resize);
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
    edgeColor: "#ffffff",
    polarity: "architrino",
  };
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

function setTone(element, status) {
  const tone = STATUS_TONE[status] ?? "display";
  element.dataset.tone = tone;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
