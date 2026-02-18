import * as THREE from "./vendor/three/three.module.js";
import { CSS2DRenderer, CSS2DObject } from "./vendor/three/CSS2DRenderer.js";
import { AppDirector } from "./src/director/AppDirector.js";
import { createLevelRuntime } from "./src/runtime/LevelRuntime.js";
import { createMarkdownRuntime } from "./src/runtime/MarkdownRuntime.js";
import { createNodeFactory } from "./src/runtime/NodeFactoryRuntime.js";
import { createSceneGraphRuntime } from "./src/runtime/SceneGraphRuntime.js";
import { createTransitionEngine } from "./src/runtime/TransitionEngine.js";
import { SceneRepository } from "./src/services/SceneRepository.js";
import { SceneIndexService } from "./src/services/SceneIndexService.js";
import { PeriodicTableService } from "./src/services/PeriodicTableService.js";

const app = document.getElementById("app");
const canvas = document.getElementById("viz");
const navUpButton = document.getElementById("nav-up");
const sceneLabel = document.getElementById("scene-label");
const sceneSearch = document.getElementById("scene-search");
const sceneSearchToggle = document.getElementById("scene-search-toggle");
const sceneSearchPanel = document.getElementById("scene-search-panel");
const sceneSearchInput = document.getElementById("scene-search-input");
const sceneSearchResults = document.getElementById("scene-search-results");
const hoverTooltip = document.getElementById("hover-tooltip");
const detailPanel = document.getElementById("detail-panel");
const detailTitle = document.getElementById("detail-title");
const detailBody = document.getElementById("detail-body");
const detailClose = document.getElementById("detail-close");
const homeButton = document.getElementById("home-button");
const docButton = document.getElementById("doc-button");
const elementLegend = document.getElementById("element-legend");
const elementLegendItems = elementLegend
  ? Array.from(elementLegend.querySelectorAll("[data-scene]"))
  : [];
let elementInfoPinned = false;
const markdownPanel = document.getElementById("markdown-panel");
const markdownTitle = document.getElementById("markdown-title");
const markdownContent = document.getElementById("markdown-content");
const markdownBody = document.getElementById("markdown-body");
const markdownClose = document.getElementById("markdown-close");
const markdownLayoutToggle = document.getElementById("markdown-layout-toggle");
const markdownDocButton = document.getElementById("markdown-doc-button");
const periodicOverlay = document.getElementById("periodic-overlay");
const periodicGrid = document.getElementById("periodic-grid");
const periodicLegend = document.getElementById("periodic-legend");
const composerOverlay = document.getElementById("composer-overlay");
const composerDocsButton = document.getElementById("composer-docs-button");
const composerExitButton = document.getElementById("composer-exit-button");
const composerTabs = composerOverlay
  ? Array.from(composerOverlay.querySelectorAll(".composer-tab"))
  : [];
const composerPanels = composerOverlay
  ? Array.from(composerOverlay.querySelectorAll(".composer-panel"))
  : [];
const composerSceneIdInput = document.getElementById("composer-scene-id");
const composerSceneNameInput = document.getElementById("composer-scene-name");
const composerNodeCountInput = document.getElementById("composer-node-count");
const composerNodeLabelsInput = document.getElementById("composer-node-labels");
const composerPreviewButton = document.getElementById("composer-preview-button");
const composerExportButton = document.getElementById("composer-export-button");
const composerStatus = document.getElementById("composer-status");
const composerJsonPreview = document.getElementById("composer-json-preview");
const composerCanvas = document.getElementById("composer-canvas");
const composerPathModeSelect = document.getElementById("composer-path-mode");
const composerPathResetButton = document.getElementById("composer-path-reset");
const composerFrameEditToggle = document.getElementById("composer-frame-edit-toggle");
const composerFrameResetButton = document.getElementById("composer-frame-reset");
const composerFrameScaleInput = document.getElementById("composer-frame-scale");
const composerFrameScaleLabel = document.getElementById("composer-frame-scale-label");
const composerCameraSpeedInput = document.getElementById("composer-camera-speed");
const composerCameraSpeedLabel = document.getElementById("composer-camera-speed-label");
const composerCameraRadiusInput = document.getElementById("composer-camera-radius");
const composerCameraRadiusLabel = document.getElementById("composer-camera-radius-label");
const composerCameraResetButton = document.getElementById("composer-camera-reset");
const composerCameraPoiSelect = document.getElementById("composer-camera-poi");
const composerCameraWaypointAdd = document.getElementById("composer-camera-waypoint-add");
const composerCameraWaypointClear = document.getElementById("composer-camera-waypoint-clear");
const composerCameraWaypointCount = document.getElementById("composer-camera-waypoint-count");
const composerCameraFlightToggle = document.getElementById("composer-camera-flight-toggle");
const hud = document.getElementById("hud");
const infoDrawer = document.getElementById("info-drawer");
const infoBody = document.getElementById("info-body");
const rootLayoutMarginPx = { x: 160, y: 140 };

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.domElement.style.touchAction = "none";

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0";
labelRenderer.domElement.style.left = "0";
labelRenderer.domElement.style.pointerEvents = "none";
labelRenderer.domElement.style.zIndex = "2";
app.appendChild(labelRenderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color("#0b0e1a");

const camera = new THREE.OrthographicCamera();
camera.position.set(0, 0, 30);
camera.zoom = 1;

const baseViewHeight = 26;
const worldGroup = new THREE.Group();
scene.add(worldGroup);

const levelConfigs = {};
const linkColors = {
  reactant: "#9fb0e1",
  product: "#d5dcff",
  emission: "#f0d39a",
  default: "#c5cee8",
};
const colorTokens = {
  RED: "#ff0000",
  BLUE: "#0000ff",
  PURPLE: "#4b0082",
};
const defaultAutoMarkdownPalette = [
  "#243d8f",
  "#2f6b6f",
  "#5a1f2e",
  "#4b0082",
  "#3a5f9f",
  "#2f4f7a",
  "#7a4a1f",
  "#1c2a4f",
  "#3c6a7a",
  "#3f6a5a",
  "#6a3c3c",
];
const linkStyle = {
  minLength: 0.7,
  tipClearance: 0.12,
  headLengthMin: 0.14,
  headLengthMax: 0.24,
  headWidthFactor: 0.4,
  lineOpacity: 0.6,
  headOpacity: 0.85,
};
const binaryStyle = {
  shellOpacity: 0.5,
  shellOutlineOpacity: 0.28,
  ringOpacity: 0.35,
  ringTubeFactor: 0.04,
  particleRadiusFactor: 0.08,
  positrinoColor: "#ff0000",
  electrinoColor: "#0000ff",
  baseOrbitSpeed: 0.18,
};
const generationTransitions = {
  electron: { nextScene: "content/scenes/standard-model-particles/muon.json", nextLabel: "Muon" },
  muon: { nextScene: "content/scenes/standard-model-particles/tau.json", nextLabel: "Tau" },
  neutrino: {
    nextScene: "content/scenes/standard-model-particles/muon_neutrino.json",
    nextLabel: "Muon Neutrino",
  },
  muon_neutrino: {
    nextScene: "content/scenes/standard-model-particles/tau_neutrino.json",
    nextLabel: "Tau Neutrino",
  },
  up_quark: { nextScene: "content/scenes/standard-model-particles/charm.json", nextLabel: "Charm" },
  charm: { nextScene: "content/scenes/standard-model-particles/top.json", nextLabel: "Top" },
  down_quark: { nextScene: "content/scenes/standard-model-particles/strange.json", nextLabel: "Strange" },
  strange: { nextScene: "content/scenes/standard-model-particles/bottom.json", nextLabel: "Bottom" },
};

function normalizeVelocity(value) {
  if (Array.isArray(value)) {
    return [
      Number(value[0] ?? 0),
      Number(value[1] ?? 0),
      Number(value[2] ?? 0),
    ];
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return [value, 0, 0];
  }
  if (value && typeof value === "object") {
    return [
      Number(value.x ?? 0),
      Number(value.y ?? 0),
      Number(value.z ?? 0),
    ];
  }
  return [0, 0, 0];
}

function sanitizeComposerId(raw) {
  if (!raw) {
    return "composer_scene";
  }
  const cleaned = String(raw)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_-]/g, "");
  return cleaned || "composer_scene";
}

function readNumberInput(input, fallback = 0) {
  if (!input) {
    return fallback;
  }
  const value = Number(input.value);
  return Number.isFinite(value) ? value : fallback;
}

function formatScaleLabel(value) {
  const normalized = Number.isFinite(value) ? value : 1;
  if (normalized >= 1000 || normalized <= 0.001) {
    return `${normalized.toExponential(1)}x`;
  }
  return `${normalized.toFixed(2)}x`;
}

function setComposerFrameDefaults() {
  if (composerFrameScaleInput) composerFrameScaleInput.value = "0";
  composerFrameState.rotation.set(0, 0, 0);
  composerFrameState.scale = 1;
  if (composerFrameScaleLabel) {
    composerFrameScaleLabel.textContent = formatScaleLabel(1);
  }
}

function setComposerCameraDefaults() {
  composerCameraState.position.set(0, 2.6, 6.5);
  composerCameraState.speed = 1;
  if (composerCameraSpeedInput) composerCameraSpeedInput.value = "0";
  if (composerCameraSpeedLabel) {
    composerCameraSpeedLabel.textContent = formatScaleLabel(1);
  }
  updateComposerOrbitFromPosition(composerCameraState.position);
  syncComposerCameraRadiusInput();
}

function updateComposerWaypointCount() {
  if (composerCameraWaypointCount) {
    composerCameraWaypointCount.textContent = `Waypoints: ${composerCameraFlightState.waypoints.length}`;
  }
  if (composerCameraFlightToggle) {
    composerCameraFlightToggle.disabled =
      composerCameraFlightState.waypoints.length < 2;
  }
}

function getComposerOrbitTargetWorld() {
  if (!composerFrameGroup) {
    return new THREE.Vector3(0, 0, 0);
  }
  return composerFrameGroup.localToWorld(new THREE.Vector3(0, 0, 0));
}

function updateComposerOrbitFromPosition(position) {
  const target = getComposerOrbitTargetWorld();
  const offset = position.clone().sub(target);
  const radius = Math.max(composerCameraOrbitState.minDistance, offset.length());
  const theta = Math.atan2(offset.x, offset.z);
  const phi = Math.acos(clamp(offset.y / radius, -1, 1));
  composerCameraOrbitState.radius = radius;
  composerCameraOrbitState.theta = theta;
  composerCameraOrbitState.phi = phi;
}

function syncComposerCameraRadiusInput() {
  if (!composerCameraRadiusInput) {
    return;
  }
  const radius = Math.max(composerCameraOrbitState.minDistance, composerCameraOrbitState.radius);
  const exp = Math.log10(radius);
  composerCameraRadiusInput.value = exp.toFixed(2);
  if (composerCameraRadiusLabel) {
    composerCameraRadiusLabel.textContent = formatScaleLabel(radius);
  }
}

function applyComposerCameraRadiusInput() {
  if (!composerCameraRadiusInput) {
    return;
  }
  const exp = readNumberInput(composerCameraRadiusInput, Math.log10(composerCameraOrbitState.radius || 1));
  composerCameraOrbitState.radius = Math.pow(10, exp);
  if (composerCameraRadiusLabel) {
    composerCameraRadiusLabel.textContent = formatScaleLabel(composerCameraOrbitState.radius);
  }
  updateComposerCamera();
}

function getComposerPoiLocal() {
  if (
    composerCameraFlightState.poiMode === "selected" &&
    composerSelectedPointIndex != null &&
    composerPathState.points[composerSelectedPointIndex]
  ) {
    return composerPathState.points[composerSelectedPointIndex].clone();
  }
  return new THREE.Vector3(0, 0, 0);
}

function addComposerCameraWaypoint() {
  if (!composerFrameGroup || !composerCamera) {
    return;
  }
  const localPos = composerFrameGroup.worldToLocal(
    composerCamera.position.clone()
  );
  const localLookAt = getComposerPoiLocal();
  composerCameraFlightState.waypoints.push({
    position: localPos,
    lookAt: localLookAt,
  });
  updateComposerCameraFlightDisplay();
  updateComposerWaypointCount();
  renderComposerJsonPreview();
}

function clearComposerCameraWaypoints() {
  composerCameraFlightState.waypoints = [];
  updateComposerCameraFlightDisplay();
  updateComposerWaypointCount();
  stopComposerCameraFlightPreview();
  renderComposerJsonPreview();
}

function resetComposerPathPoints() {
  composerPathState.points = [
    new THREE.Vector3(-1.6, 0, 0),
    new THREE.Vector3(-0.5, 0.8, 0.35),
    new THREE.Vector3(0.9, 0.25, -0.5),
    new THREE.Vector3(2.0, 1.05, 0.15),
  ];
  composerPathState.interpolate = composerPathModeSelect?.value || "spline";
  composerPathState.closed = false;
  composerSelectedPointIndex = null;
  rebuildComposerControlPoints();
  updateComposerPathGeometry();
}

function updateComposerPointMaterials(activeIndex = null) {
  composerPointMeshes.forEach((mesh, index) => {
    const isActive =
      index === activeIndex || index === composerSelectedPointIndex;
    mesh.material = isActive ? composerPointMaterialActive : composerPointMaterial;
  });
}

function readComposerFormState() {
  const rawId = composerSceneIdInput?.value ?? "composer_scene";
  const id = sanitizeComposerId(rawId);
  if (composerSceneIdInput && composerSceneIdInput.value !== id) {
    composerSceneIdInput.value = id;
  }
  const rawName = composerSceneNameInput?.value ?? "";
  const name = rawName.trim() || "Composer Scene";
  const countRaw = Number(composerNodeCountInput?.value ?? 6);
  const nodeCount = clamp(Math.round(countRaw || 6), 1, 18);
  if (composerNodeCountInput) {
    composerNodeCountInput.value = String(nodeCount);
  }
  const labelsRaw = composerNodeLabelsInput?.value ?? "";
  const labelList = labelsRaw
    .split(",")
    .map((label) => label.trim())
    .filter(Boolean);
  const labels = Array.from({ length: nodeCount }, (_, index) => {
    return labelList[index] || `Node ${index + 1}`;
  });
  return { id, name, nodeCount, labels };
}

function buildComposerSceneSpec(state) {
  if (!composerPathState.points.length) {
    resetComposerPathPoints();
  }
  const pathPoints = composerPathState.points.map((point) => [
    Number(point.x.toFixed(3)),
    Number(point.y.toFixed(3)),
    Number(point.z.toFixed(3)),
  ]);
  const cameraWaypoints = composerCameraFlightState.waypoints.map((waypoint) => ({
    position: [
      Number(waypoint.position.x.toFixed(3)),
      Number(waypoint.position.y.toFixed(3)),
      Number(waypoint.position.z.toFixed(3)),
    ],
    lookAt: [
      Number(waypoint.lookAt.x.toFixed(3)),
      Number(waypoint.lookAt.y.toFixed(3)),
      Number(waypoint.lookAt.z.toFixed(3)),
    ],
  }));
  return {
    schemaVersion: "0.1.0",
    name: state.id,
    units: { length: "scene", angle: "degrees", time: "seconds" },
    frame: { space: "relative", relativeTo: "parent" },
    path: {
      kind: "points",
      frame: { space: "relative", relativeTo: "parent" },
      payload: {
        points: pathPoints,
        interpolate: composerPathState.interpolate,
        closed: composerPathState.closed,
      },
    },
    cameraPath: cameraWaypoints.length
      ? {
          mode: "waypoints",
          frame: { space: "relative", relativeTo: "parent" },
          smooth: "spline",
          points: cameraWaypoints,
        }
      : undefined,
    annotations: { label: state.name },
    children: [],
  };
}

function buildComposerSceneConfig(state) {
  const nodes = state.labels.map((label, index) => ({
    id: `node_${index + 1}`,
    name: label,
    radius: 1.1,
    color: composerPalette[index % composerPalette.length],
    position: [0, 0, 0],
    wrapLabel: true,
  }));
  return {
    layout: "static",
    nodes,
    links: [],
    sceneName: `${state.name} (Preview)`,
    sceneId: composerPreviewSceneId,
    markdownPath: null,
    markdownSection: null,
    markdownColumns: null,
    markdownAutoOpen: false,
    centerOn: null,
    autoSphereRing: true,
    wrapLabels: true,
    hideScaleLabels: true,
  };
}

function renderComposerJsonPreview() {
  if (!composerJsonPreview) {
    return;
  }
  const state = readComposerFormState();
  const spec = buildComposerSceneSpec(state);
  composerJsonPreview.textContent = JSON.stringify(spec, null, 2);
}

function setComposerStatus(message) {
  if (!composerStatus) {
    return;
  }
  composerStatus.textContent = message;
}

function initComposerCanvas() {
  if (!composerCanvas || composerRenderer) {
    return;
  }
  composerRenderer = new THREE.WebGLRenderer({
    canvas: composerCanvas,
    antialias: true,
    alpha: true,
  });
  composerRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  composerRenderer.setClearColor(0x000000, 0);

  composerScene = new THREE.Scene();
  composerCamera = new THREE.PerspectiveCamera(45, 1, 0.01, 10000);
  composerCamera.rotation.order = "YXZ";

  composerFrameGroup = new THREE.Group();
  composerScene.add(composerFrameGroup);

  const referenceGroup = new THREE.Group();
  const ringRadii = [0.6, 1, 1.6];
  const shellPalette = [0xa9d8ff, 0x7fb9ff, 0x4f8fe6];
  const thetaAngles = [0, 30, 60, 90, 120, 150];
  const phiAngles = [0, 15, 30, 45, 60, 75];
  const axisNormals = [
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(1, 0, 0),
  ];
  const up = new THREE.Vector3(0, 1, 0);

  const makeOrbitRing = (radius, thetaDeg, phiDeg, color, opacity) => {
    const points = [];
    const segments = 120;
    for (let i = 0; i <= segments; i += 1) {
      const t = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(t) * radius, 0, Math.sin(t) * radius));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
    });
    const line = new THREE.Line(geometry, material);
    const theta = THREE.MathUtils.degToRad(thetaDeg);
    const phi = THREE.MathUtils.degToRad(phiDeg);
    const normal = new THREE.Vector3(
      Math.sin(phi) * Math.sin(theta),
      Math.cos(phi),
      Math.sin(phi) * Math.cos(theta)
    );
    if (normal.lengthSq() > 0) {
      normal.normalize();
      line.quaternion.setFromUnitVectors(up, normal);
    }
    return line;
  };

  ringRadii.forEach((radius, radiusIndex) => {
    const axisNormal = axisNormals[radiusIndex % axisNormals.length]
      .clone()
      .normalize();
    const axisRotation = new THREE.Quaternion().setFromUnitVectors(
      up,
      axisNormal
    );
    const radiusGroup = new THREE.Group();
    radiusGroup.quaternion.copy(axisRotation);
    const thetaOpacity = 0.5 - radiusIndex * 0.08;
    const phiOpacity = 0.32 - radiusIndex * 0.06;
    const shellOpacity = 0.1 - radiusIndex * 0.02;
    const shellColor = shellPalette[radiusIndex % shellPalette.length];
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 32, 20),
      new THREE.MeshBasicMaterial({
        color: shellColor,
        transparent: true,
        opacity: shellOpacity,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
    );
    radiusGroup.add(shell);
    const ringColor = shellColor;
    thetaAngles.forEach((theta) => {
      radiusGroup.add(
        makeOrbitRing(radius, theta, 90, ringColor, thetaOpacity)
      );
    });
    phiAngles.forEach((phi) => {
      radiusGroup.add(makeOrbitRing(radius, 0, phi, ringColor, phiOpacity));
    });
    referenceGroup.add(radiusGroup);
  });

  composerFrameGroup.add(referenceGroup);

  const axisLength = 2.4;
  const axisColor = 0xd6dbe6;
  const axisMaterial = new THREE.LineBasicMaterial({
    color: axisColor,
    transparent: true,
    opacity: 0.75,
  });
  const makeAxisLine = (from, to) => {
    const geometry = new THREE.BufferGeometry().setFromPoints([from, to]);
    return new THREE.Line(geometry, axisMaterial);
  };
  composerFrameGroup.add(
    makeAxisLine(
      new THREE.Vector3(-axisLength, 0, 0),
      new THREE.Vector3(axisLength, 0, 0)
    )
  );
  composerFrameGroup.add(
    makeAxisLine(
      new THREE.Vector3(0, -axisLength, 0),
      new THREE.Vector3(0, axisLength, 0)
    )
  );
  composerFrameGroup.add(
    makeAxisLine(
      new THREE.Vector3(0, 0, -axisLength),
      new THREE.Vector3(0, 0, axisLength)
    )
  );

  composerPathGeometry = new THREE.BufferGeometry();
  composerPathLine = new THREE.Line(
    composerPathGeometry,
    new THREE.LineBasicMaterial({ color: 0x7dd3fc })
  );
  composerFrameGroup.add(composerPathLine);

  composerPointGeometry = new THREE.SphereGeometry(0.08, 16, 16);
  composerPointMaterial = new THREE.MeshBasicMaterial({ color: 0xffc26a });
  composerPointMaterialActive = new THREE.MeshBasicMaterial({ color: 0x7dd3fc });

  composerRaycaster = new THREE.Raycaster();

  setComposerFrameDefaults();
  setComposerCameraDefaults();
  if (composerCameraPoiSelect) {
    composerCameraPoiSelect.value = composerCameraFlightState.poiMode;
  }
  syncComposerCameraRadiusInput();

  if (!composerPathState.points.length) {
    resetComposerPathPoints();
  } else {
    rebuildComposerControlPoints();
    updateComposerPathGeometry();
  }
  updateComposerCameraFlightDisplay();
  updateComposerWaypointCount();

  updateComposerFrame();
  updateComposerCamera();
  resizeComposerCanvas();

  composerCanvas.addEventListener("pointerdown", onComposerPointerDown);
  composerCanvas.addEventListener("pointermove", onComposerPointerMove);
  composerCanvas.addEventListener("pointerup", onComposerPointerUp);
  composerCanvas.addEventListener("pointercancel", onComposerPointerUp);
  composerCanvas.addEventListener("pointerleave", onComposerPointerUp);
  composerCanvas.addEventListener(
    "wheel",
    (event) => {
      onComposerWheel(event);
    },
    { passive: false }
  );
  composerCanvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
}

function resizeComposerCanvas() {
  if (!composerRenderer || !composerCanvas || !composerCamera) {
    return;
  }
  const rect = composerCanvas.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  composerRenderer.setSize(width, height, false);
  composerCamera.aspect = width / height;
  composerCamera.updateProjectionMatrix();
  composerNeedsResize = false;
}

function updateComposerFrame() {
  if (!composerFrameGroup) {
    return;
  }
  composerFrameGroup.rotation.copy(composerFrameState.rotation);
  composerFrameGroup.scale.setScalar(composerFrameState.scale);
}

function applyComposerFrameScaleInput() {
  const scaleExp = readNumberInput(composerFrameScaleInput, 0);
  composerFrameState.scale = Math.pow(10, scaleExp);
  if (composerFrameScaleLabel) {
    composerFrameScaleLabel.textContent = formatScaleLabel(composerFrameState.scale);
  }
  updateComposerFrame();
}

function updateComposerCamera() {
  if (!composerCamera) {
    return;
  }
  if (composerCameraFlightState.preview) {
    return;
  }
  const target = getComposerOrbitTargetWorld();
  const radius = clamp(
    composerCameraOrbitState.radius,
    composerCameraOrbitState.minDistance,
    composerCameraOrbitState.maxDistance
  );
  const phi = clamp(composerCameraOrbitState.phi, 0.05, Math.PI - 0.05);
  const theta = composerCameraOrbitState.theta;
  const sinPhi = Math.sin(phi);
  const offset = new THREE.Vector3(
    radius * sinPhi * Math.sin(theta),
    radius * Math.cos(phi),
    radius * sinPhi * Math.cos(theta)
  );
  composerCamera.position.copy(target).add(offset);
  composerCamera.lookAt(target);
  composerCameraState.position.copy(composerCamera.position);
}

function applyComposerCameraSpeedInput() {
  const speedExp = readNumberInput(composerCameraSpeedInput, 0);
  composerCameraState.speed = Math.pow(10, speedExp);
  if (composerCameraSpeedLabel) {
    composerCameraSpeedLabel.textContent = formatScaleLabel(composerCameraState.speed);
  }
}

function rebuildComposerControlPoints() {
  if (!composerFrameGroup || !composerPointGeometry) {
    return;
  }
  composerPointMeshes.forEach((mesh) => {
    composerFrameGroup.remove(mesh);
  });
  composerPointMeshes = composerPathState.points.map((point, index) => {
    const mesh = new THREE.Mesh(composerPointGeometry, composerPointMaterial);
    mesh.position.copy(point);
    mesh.userData.pointIndex = index;
    composerFrameGroup.add(mesh);
    return mesh;
  });
  updateComposerPointMaterials();
}

function updateComposerPathGeometry() {
  if (!composerPathGeometry) {
    return;
  }
  if (!composerPathState.points.length) {
    composerPathGeometry.setFromPoints([]);
    return;
  }
  let samples = composerPathState.points;
  if (composerPathState.interpolate === "spline" && composerPathState.points.length > 2) {
    const curve = new THREE.CatmullRomCurve3(
      composerPathState.points,
      composerPathState.closed,
      "catmullrom",
      0.5
    );
    samples = curve.getPoints(160);
  } else if (composerPathState.closed) {
    samples = [...composerPathState.points, composerPathState.points[0]];
  }
  composerPathGeometry.setFromPoints(samples);
  composerPathGeometry.computeBoundingSphere();
}

function updateComposerCameraFlightDisplay() {
  if (!composerFrameGroup) {
    return;
  }
  if (!composerCameraFlightGroup) {
    composerCameraFlightGroup = new THREE.Group();
    composerCameraFlightGeometry = new THREE.BufferGeometry();
    composerCameraFlightLine = new THREE.Line(
      composerCameraFlightGeometry,
      new THREE.LineBasicMaterial({ color: 0xb1f1ff })
    );
    composerCameraFlightGroup.add(composerCameraFlightLine);
    composerFrameGroup.add(composerCameraFlightGroup);
    composerCameraWaypointGeometry = new THREE.SphereGeometry(0.07, 12, 12);
    composerCameraWaypointMaterial = new THREE.MeshBasicMaterial({ color: 0x9af0c9 });
  }

  composerCameraWaypointMeshes.forEach((mesh) => {
    composerCameraFlightGroup.remove(mesh);
  });
  composerCameraWaypointMeshes = [];

  const points = composerCameraFlightState.waypoints.map((waypoint) => {
    return waypoint.position.clone();
  });
  composerCameraFlightGeometry.setFromPoints(points.length ? points : []);

  if (points.length && composerCameraWaypointGeometry && composerCameraWaypointMaterial) {
    points.forEach((point) => {
      const marker = new THREE.Mesh(
        composerCameraWaypointGeometry,
        composerCameraWaypointMaterial
      );
      marker.position.copy(point);
      composerCameraFlightGroup.add(marker);
      composerCameraWaypointMeshes.push(marker);
    });
  }
}

function startComposerCameraFlightPreview() {
  if (composerCameraFlightState.preview) {
    return;
  }
  if (composerCameraFlightState.waypoints.length < 2) {
    return;
  }
  composerCameraFlightState.preview = true;
  composerCameraFlightState.startTime = performance.now();
  if (composerCamera) {
    composerCameraFlightState.savedPosition.copy(composerCamera.position);
  }
  if (composerCameraFlightToggle) {
    composerCameraFlightToggle.textContent = "Stop Flight";
    composerCameraFlightToggle.classList.add("is-active");
  }
}

function stopComposerCameraFlightPreview() {
  if (!composerCameraFlightState.preview) {
    return;
  }
  composerCameraFlightState.preview = false;
  if (composerCamera) {
    composerCamera.position.copy(composerCameraFlightState.savedPosition);
    updateComposerOrbitFromPosition(composerCamera.position);
    syncComposerCameraRadiusInput();
    updateComposerCamera();
  }
  if (composerCameraFlightToggle) {
    composerCameraFlightToggle.textContent = "Play Flight";
    composerCameraFlightToggle.classList.remove("is-active");
  }
}

function updateComposerCameraFlightPreview(now) {
  if (!composerCameraFlightState.preview || !composerCamera) {
    return;
  }
  const waypoints = composerCameraFlightState.waypoints;
  if (waypoints.length < 2 || !composerFrameGroup) {
    stopComposerCameraFlightPreview();
    return;
  }

  const localPositions = waypoints.map((waypoint) => waypoint.position);
  const localLookAts = waypoints.map((waypoint) => waypoint.lookAt);
  const curve = new THREE.CatmullRomCurve3(
    localPositions,
    false,
    "catmullrom",
    0.5
  );
  const lookCurve = new THREE.CatmullRomCurve3(
    localLookAts,
    false,
    "catmullrom",
    0.5
  );

  const segmentDuration = 2400;
  const totalDuration = segmentDuration * (localPositions.length - 1);
  const elapsed = (now - composerCameraFlightState.startTime) * composerCameraState.speed;
  const t = ((elapsed % totalDuration) / totalDuration) || 0;

  const localPos = curve.getPointAt(t);
  const localLookAt = lookCurve.getPointAt(t);
  const worldPos = composerFrameGroup.localToWorld(localPos.clone());
  const worldLookAt = composerFrameGroup.localToWorld(localLookAt.clone());
  composerCamera.position.copy(worldPos);
  composerCamera.lookAt(worldLookAt);
}

function renderComposerCanvas() {
  if (!composerRenderer || !composerScene || !composerCamera || !composerOverlay) {
    return;
  }
  if (!composerOverlay.classList.contains("is-open")) {
    return;
  }
  if (composerNeedsResize) {
    resizeComposerCanvas();
  }
  updateComposerCameraFlightPreview(performance.now());
  composerRenderer.render(composerScene, composerCamera);
}

function getComposerPointerNdc(event) {
  const rect = composerCanvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  return { x, y };
}

function onComposerPointerDown(event) {
  if (!composerCanvas || !composerCamera || !composerRaycaster) {
    return;
  }
  if (composerCameraFlightState.preview) {
    stopComposerCameraFlightPreview();
  }
  composerCanvas.setPointerCapture(event.pointerId);
  const { x, y } = getComposerPointerNdc(event);
  composerRaycaster.setFromCamera({ x, y }, composerCamera);
  const hits = composerRaycaster.intersectObjects(composerPointMeshes, false);
  if (hits.length) {
    const hit = hits[0];
    composerDragState.mode = "point";
    composerDragState.pointIndex = hit.object.userData.pointIndex;
    composerSelectedPointIndex = composerDragState.pointIndex;
    composerDragState.startX = event.clientX;
    composerDragState.startY = event.clientY;
    composerDragState.startPoint.copy(composerPathState.points[composerDragState.pointIndex]);
    const worldPoint = hit.object.getWorldPosition(new THREE.Vector3());
    const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(
      composerFrameGroup.quaternion
    );
    composerDragState.plane.setFromNormalAndCoplanarPoint(normal, worldPoint);
    composerDragState.altMode = event.altKey;
    updateComposerPointMaterials(composerDragState.pointIndex);
    return;
  }
  const wantsPan = event.shiftKey || event.button === 2;
  if (composerFrameEditMode && event.button === 0 && !wantsPan) {
    composerDragState.mode = "frame";
    composerDragState.startFrameRot.copy(composerFrameState.rotation);
  } else {
    composerDragState.mode = "camera";
  }
  composerDragState.button = event.button;
  composerDragState.startX = event.clientX;
  composerDragState.startY = event.clientY;
  composerDragState.startOrbitTheta = composerCameraOrbitState.theta;
  composerDragState.startOrbitPhi = composerCameraOrbitState.phi;
}

function onComposerPointerMove(event) {
  if (!composerDragState.mode) {
    return;
  }
  const dx = event.clientX - composerDragState.startX;
  const dy = event.clientY - composerDragState.startY;
  if (composerDragState.mode === "point") {
    const index = composerDragState.pointIndex;
    if (index == null) {
      return;
    }
    if (composerDragState.altMode || event.altKey) {
      const lift = -dy * 0.01 * composerFrameState.scale;
      const localNormal = new THREE.Vector3(0, 0, 1);
      composerPathState.points[index]
        .copy(composerDragState.startPoint)
        .addScaledVector(localNormal, lift);
    } else {
      const { x, y } = getComposerPointerNdc(event);
      composerRaycaster.setFromCamera({ x, y }, composerCamera);
      const intersection = new THREE.Vector3();
      if (composerRaycaster.ray.intersectPlane(composerDragState.plane, intersection)) {
        const localPoint = composerFrameGroup.worldToLocal(intersection.clone());
        composerPathState.points[index].copy(localPoint);
      }
    }
    if (composerPointMeshes[index]) {
      composerPointMeshes[index].position.copy(composerPathState.points[index]);
    }
    updateComposerPathGeometry();
    renderComposerJsonPreview();
    return;
  }

  if (composerDragState.mode === "camera") {
    const speed = composerCameraState.speed * 0.004;
    composerCameraOrbitState.theta =
      composerDragState.startOrbitTheta - dx * speed;
    composerCameraOrbitState.phi = clamp(
      composerDragState.startOrbitPhi - dy * speed,
      0.05,
      Math.PI - 0.05
    );
    updateComposerCamera();
  }

  if (composerDragState.mode === "frame") {
    composerFrameState.rotation.y =
      composerDragState.startFrameRot.y - dx * 0.005;
    composerFrameState.rotation.x =
      composerDragState.startFrameRot.x - dy * 0.005;
    updateComposerFrame();
  }
}

function onComposerPointerUp(event) {
  if (composerDragState.mode === "point" && composerDragState.pointIndex != null) {
    updateComposerPointMaterials();
  }
  composerDragState.mode = null;
  composerDragState.pointIndex = null;
  if (composerCanvas && composerCanvas.hasPointerCapture(event.pointerId)) {
    composerCanvas.releasePointerCapture(event.pointerId);
  }
  composerDragState.altMode = false;
  composerDragState.button = 0;
}

function onComposerWheel(event) {
  if (!composerCamera) {
    return;
  }
  event.preventDefault();
  const speed = composerCameraState.speed * 0.0015;
  composerCameraOrbitState.theta -= event.deltaX * speed;
  composerCameraOrbitState.phi = clamp(
    composerCameraOrbitState.phi - event.deltaY * speed,
    0.05,
    Math.PI - 0.05
  );
  updateComposerCamera();
}

const motionHandlers = {
  orbit: (node, level, timeSeconds) => {
    const orbit = node.data.orbit;
    if (!orbit) {
      return;
    }
    const centerNode =
      level.nodeByName.get(orbit.center) ?? level.nodeById.get(orbit.center);
    const centerPos = centerNode
      ? centerNode.group.position
      : Array.isArray(orbit.center)
        ? new THREE.Vector3(
            orbit.center[0] ?? 0,
            orbit.center[1] ?? 0,
            orbit.center[2] ?? 0
          )
        : new THREE.Vector3(0, 0, 0);
    const yScale =
      orbit.shape === "ellipsoid" ? orbit.yScale ?? 0.85 : 1;
    const angle = timeSeconds * orbit.speed + (orbit.phase ?? 0);
    const x = centerPos.x + Math.cos(angle) * orbit.radius;
    const y = centerPos.y + Math.sin(angle) * orbit.radius * yScale;
    node.group.position.set(x, y, 0);
  },
  translate: (node, level, timeSeconds) => {
    const translation = node.data.translation;
    if (!translation) {
      return;
    }
    const velocity = translation.velocity ?? [0, 0, 0];
    const base = node.basePosition ?? node.group.position;
    const x = base.x + (velocity[0] ?? 0) * timeSeconds;
    const y = base.y + (velocity[1] ?? 0) * timeSeconds;
    const z = base.z + (velocity[2] ?? 0) * timeSeconds;
    node.group.position.set(x, y, z);
  },
  binaryOrbit: (node, level, timeSeconds) => {
    if (!node.binaryBandData || !node.binaryBandData.length) {
      return;
    }
    node.binaryBandData.forEach((band) => {
      const angle = timeSeconds * band.speed + band.phase;
      const x = Math.cos(angle) * band.radius;
      const y = Math.sin(angle) * band.radius;
      band.positrino.position.set(x, y, 0);
      band.electrino.position.set(-x, -y, 0);
    });
  },
};

const levelRuntime = createLevelRuntime({
  THREE,
  motionHandlers,
  linkColors,
  linkStyle,
  clamp,
  camera,
  binaryStyle,
  getPulsingBandName,
});

const sceneConfigCache = new Map();
const sceneLoadPromises = new Map();
const markdownCache = new Map();
const markdownSectionCache = new Map();
const markdownRenderer =
  typeof window !== "undefined" && window.markdownit
    ? window.markdownit({ html: false, linkify: true, breaks: false })
    : null;
if (markdownRenderer) {
  markdownRenderer.disable("escape");
}
const markdownDirectoryCache = new Map();
const markdownSubdirCache = new Map();
const markdownManifestPath = "content/markdown/markdown_index.json";
let markdownManifestPromise = null;
let composerActivePanel = "tree";
const infoMarkdownPath = "info.md";
const rootScenePath = "content/scenes/architrino_assembly_architecture.json";
const metaScenePath = "content/scenes/meta/meta.json";
const composerSceneId = "composer";
const composerPreviewSceneId = "composer_preview";
const composerPreviewScenePath = "__composer_preview__";
const composerDocsPath =
  "content/markdown/aaa/_meta/ideas/arch-api.md";
const cacheBustToken = Date.now().toString();
let appDirector = null;
const sceneIndexService = new SceneIndexService();
const periodicTableService = new PeriodicTableService();
const markdownReaderScenes = new Map();
const searchBackStack = [];
const metaBackStack = [];
const composerPanelMap = new Map([
  ["composer_tree", "tree"],
  ["composer_path", "path"],
  ["composer_orbit", "orbit"],
  ["composer_interactions", "interactions"],
  ["composer_preview", "preview"],
  ["composer_export", "export"],
]);
const composerPalette = defaultAutoMarkdownPalette;
const composerPathState = {
  points: [],
  interpolate: "spline",
  closed: false,
};
const composerFrameState = {
  rotation: new THREE.Euler(0, 0, 0, "YXZ"),
  scale: 1,
};
let composerFrameEditMode = false;
const composerCameraState = {
  position: new THREE.Vector3(0, 2.6, 6.5),
  speed: 1,
};
const composerCameraOrbitState = {
  target: new THREE.Vector3(),
  minDistance: 0.3,
  maxDistance: 2000,
  radius: 1,
  theta: 0,
  phi: Math.PI / 2,
};
const composerCameraFlightState = {
  waypoints: [],
  poiMode: "origin",
  preview: false,
  startTime: 0,
  savedPosition: new THREE.Vector3(),
  savedTarget: new THREE.Vector3(),
};
let composerSelectedPointIndex = null;
const composerDragState = {
  mode: null,
  button: 0,
  pointIndex: null,
  startX: 0,
  startY: 0,
  startPoint: new THREE.Vector3(),
  startFrameRot: new THREE.Euler(0, 0, 0, "YXZ"),
  startOrbitTheta: 0,
  startOrbitPhi: 0,
  plane: new THREE.Plane(),
  altMode: false,
};
let composerRenderer = null;
let composerScene = null;
let composerCamera = null;
let composerFrameGroup = null;
let composerPathLine = null;
let composerPathGeometry = null;
let composerPointMeshes = [];
let composerPointGeometry = null;
let composerPointMaterial = null;
let composerPointMaterialActive = null;
let composerRaycaster = null;
let composerNeedsResize = false;
let composerCameraFlightGroup = null;
let composerCameraFlightLine = null;
let composerCameraFlightGeometry = null;
let composerCameraWaypointMeshes = [];
let composerCameraWaypointGeometry = null;
let composerCameraWaypointMaterial = null;
let periodicGridBuilt = false;

const levels = new Map();
const navigationStack = [];
let currentLevel = null;

const ringLayoutDefaults = {
  haloScale: 1.18,
  guardBandMin: 0.15,
  guardBandRatio: 0.08,
  startAngle: Math.PI / 2,
};
const standardRingMaxCount = 14;

function maxRingNodeRadius(ringRadius, count) {
  if (!Number.isFinite(ringRadius) || count <= 1) {
    return Infinity;
  }
  const chord = 2 * ringRadius * Math.sin(Math.PI / count);
  const guardBand = Math.max(
    ringLayoutDefaults.guardBandMin,
    chord * ringLayoutDefaults.guardBandRatio
  );
  return (chord - guardBand) / (2 * ringLayoutDefaults.haloScale);
}

function computeRingLayout(nodes) {
  const count = nodes.length;
  if (!count || count > standardRingMaxCount) {
    return null;
  }
  let baseRadius = Math.max(...nodes.map((node) => node.radius ?? 0));
  if (!Number.isFinite(baseRadius) || baseRadius <= 0) {
    baseRadius = 1.6;
  }
  const ringRadius = Math.max(
    6,
    Math.min(count, standardRingMaxCount) * baseRadius * 1.4
  );
  const maxRadius = maxRingNodeRadius(ringRadius, count);
  if (Number.isFinite(maxRadius) && maxRadius > 0) {
    baseRadius = maxRadius;
  }
  const positions = [];
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2 + ringLayoutDefaults.startAngle;
    positions.push([
      Number((Math.cos(angle) * ringRadius).toFixed(2)),
      Number((Math.sin(angle) * ringRadius).toFixed(2)),
    ]);
  }
  return { ringRadius, nodeRadius: baseRadius, positions };
}

const zoomState = {
  active: false,
  startZoom: 1,
  targetZoom: 1,
  startTime: 0,
  duration: 420,
};

const panTween = {
  active: false,
  start: new THREE.Vector3(),
  target: new THREE.Vector3(),
  startTime: 0,
  duration: 420,
};

const transitionState = {
  active: false,
  mode: null,
  fromLevel: null,
  toLevel: null,
  startTime: 0,
  duration: 2250,
  payload: null,
};

const autoWarpThresholds = {
  inPx: 80,
  cooldownMs: 700,
  lastAt: 0,
};

const labelFadeState = {
  active: false,
  level: null,
  startTime: 0,
  duration: 700,
};

const transitionEngine = createTransitionEngine(transitionState, {
  smoothstep,
  applyZoom,
  worldGroup,
  camera,
  zoomState,
  panTween,
  labelFadeState,
  navigationStack,
  setLevelOpacityWithFocus,
  setLevelLinkOpacity,
  setLevelOpacityWithLabel,
  setLevelOpacity,
  setLevelLabelOpacity,
  resetNodeScale,
  updateSceneLabel,
  updateSceneMarkdown,
  getCurrentLevel: () => currentLevel,
  setCurrentLevel: (level) => {
    currentLevel = level;
  },
  now: () => performance.now(),
});

const zoomLimits = { min: 0.35, max: 6 };
const raycaster = new THREE.Raycaster();
const pointerNdc = new THREE.Vector2();
let lastZoomGestureTime = 0;
const detailFieldOrder = [
  { key: "temperature", label: "Typical temperature/energy" },
  { key: "numberDensity", label: "Number density (km^-3)" },
  { key: "classification", label: "Classification" },
];
let activeDetailNodeId = null;
let hoveredDetailNodeId = null;
let hoverTooltipVisible = false;
const periodicCategoryColors = {
  "alkali metal": "#d24d57",
  "alkaline earth metal": "#e67e22",
  "transition metal": "#f39c12",
  "post-transition metal": "#9b59b6",
  metalloid: "#8e44ad",
  "diatomic nonmetal": "#3498db",
  "polyatomic nonmetal": "#2980b9",
  "noble gas": "#1abc9c",
  "lanthanide": "#95a5a6",
  "actinide": "#7f8c8d",
  "unknown": "#556277",
};

function formatSuperscripts(text) {
  return String(text).replace(/\^(-?\d+)/g, "<sup>$1</sup>");
}

async function listMarkdownFilesInDir(directory) {
  if (!directory) {
    return [];
  }
  const normalized = directory.replace(/\/+$/, "").replace(/^\.?\//, "");
  if (markdownDirectoryCache.has(normalized)) {
    return markdownDirectoryCache.get(normalized);
  }
  const manifestFiles = await listMarkdownFilesFromManifest(normalized);
  if (manifestFiles.length) {
    markdownDirectoryCache.set(normalized, manifestFiles);
    return manifestFiles;
  }
  try {
    const response = await fetch(appendCacheBust(`${normalized}/`));
    if (!response.ok) {
      markdownDirectoryCache.set(normalized, []);
      return [];
    }
    const html = await response.text();
    const matches = [];
    const hrefRegex = /href="([^"]+\.md)"/gi;
    let match = null;
    while ((match = hrefRegex.exec(html))) {
      matches.push(match[1]);
    }
    const files = Array.from(
      new Set(
        matches
          .map((href) => decodeURIComponent(href))
          .map((href) => href.split("?")[0])
          .map((href) => href.split("#")[0])
          .map((href) => {
            if (/^https?:\/\//i.test(href)) {
              try {
                return new URL(href).pathname;
              } catch (_error) {
                return href;
              }
            }
            return href;
          })
          .map((href) => href.replace(/^\.?\//, ""))
          .filter((href) => href.toLowerCase().endsWith(".md"))
          .map((href) => href.split("/").pop())
          .filter(Boolean)
          .map((href) => `${normalized}/${href}`)
      )
    );
    markdownDirectoryCache.set(normalized, files);
    return files;
  } catch (error) {
    console.warn("Failed to read markdown directory", directory, error);
    markdownDirectoryCache.set(normalized, []);
    return [];
  }
}

async function listMarkdownDirectoriesInDir(directory) {
  if (!directory) {
    return [];
  }
  const normalized = directory.replace(/\/+$/, "").replace(/^\.?\//, "");
  if (markdownSubdirCache.has(normalized)) {
    return markdownSubdirCache.get(normalized);
  }
  const manifestDirectories = await listMarkdownDirectoriesFromManifest(normalized);
  if (manifestDirectories.length) {
    markdownSubdirCache.set(normalized, manifestDirectories);
    return manifestDirectories;
  }
  try {
    const response = await fetch(appendCacheBust(`${normalized}/`));
    if (!response.ok) {
      markdownSubdirCache.set(normalized, []);
      return [];
    }
    const html = await response.text();
    const matches = [];
    const hrefRegex = /href="([^"]+\/)"/gi;
    let match = null;
    while ((match = hrefRegex.exec(html))) {
      matches.push(match[1]);
    }
    const directories = Array.from(
      new Set(
        matches
          .map((href) => decodeURIComponent(href))
          .map((href) => href.split("?")[0])
          .map((href) => href.split("#")[0])
          .map((href) => {
            if (/^https?:\/\//i.test(href)) {
              try {
                return new URL(href).pathname;
              } catch (_error) {
                return href;
              }
            }
            return href;
          })
          .map((href) => href.replace(/^\.?\//, ""))
          .filter((href) => href && href !== "../" && href !== "./")
          .filter((href) => href.endsWith("/"))
          .map((href) => href.replace(/\/$/, ""))
          .map((href) => href.split("/").pop())
          .filter(Boolean)
          .map((href) => `${normalized}/${href}`)
      )
    );
    markdownSubdirCache.set(normalized, directories);
    return directories;
  } catch (error) {
    console.warn("Failed to read markdown directories", directory, error);
    markdownSubdirCache.set(normalized, []);
    return [];
  }
}

async function loadMarkdownManifest() {
  if (markdownManifestPromise) {
    return markdownManifestPromise;
  }
  markdownManifestPromise = fetch(appendCacheBust(markdownManifestPath))
    .then(async (response) => {
      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      if (!data || !Array.isArray(data.files)) {
        return [];
      }
      return data.files
        .filter((path) => typeof path === "string" && path.toLowerCase().endsWith(".md"))
        .map((path) => path.replace(/^\.?\//, ""));
    })
    .catch((error) => {
      console.warn("Failed to load markdown manifest", error);
      return [];
    });
  return markdownManifestPromise;
}

async function listMarkdownFilesFromManifest(directory) {
  const files = await loadMarkdownManifest();
  if (!files.length) {
    return [];
  }
  const prefix = `${directory}/`;
  return files.filter((path) => {
    if (!path.startsWith(prefix)) {
      return false;
    }
    const remainder = path.slice(prefix.length);
    return remainder.length > 0 && !remainder.includes("/");
  });
}

async function listMarkdownDirectoriesFromManifest(directory) {
  const files = await loadMarkdownManifest();
  if (!files.length) {
    return [];
  }
  const prefix = `${directory}/`;
  const subdirs = new Set();
  files.forEach((path) => {
    if (!path.startsWith(prefix)) {
      return;
    }
    const remainder = path.slice(prefix.length);
    if (!remainder.includes("/")) {
      return;
    }
    const firstSegment = remainder.split("/")[0];
    if (firstSegment) {
      subdirs.add(`${directory}/${firstSegment}`);
    }
  });
  return Array.from(subdirs);
}

function titleFromSlug(slug) {
  return slug
    .split(/[-_]+/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function buildAutoMarkdownNodes(scene, existingNodes) {
  if (!scene?.autoSphereRing || (!scene?.autoMarkdownDirectory && !scene?.autoMarkdownPath)) {
    return [];
  }
  const includeExisting = scene.autoMarkdownIncludeExistingInLayout === true;
  const sectionKey = scene.autoMarkdownSection ?? null;
  let entries = [];
  let useDirectories = false;
  let usedHeadingLevel =
    typeof scene.autoMarkdownHeadingLevel === "number"
      ? scene.autoMarkdownHeadingLevel
      : 3;
  let sectionSubheadings = null;

  if (scene.autoMarkdownPath) {
    const preferredLevels = [usedHeadingLevel];
    if (usedHeadingLevel === 2) {
      preferredLevels.push(3);
    } else if (usedHeadingLevel !== 2) {
      preferredLevels.push(2);
    }
    try {
      const response = await fetch(appendCacheBust(scene.autoMarkdownPath));
      if (response.ok) {
        const text = await response.text();
        let content = text;
        if (sectionKey) {
          const section = extractMarkdownSection(text, sectionKey);
          content = section?.body ?? "";
        }
        const lines = content.split(/\r?\n/);
        for (const level of preferredLevels) {
          const levelEntries = [];
          lines.forEach((line) => {
            const heading = parseMarkdownHeading(line);
            if (heading && heading.level === level) {
              levelEntries.push({ title: heading.title });
            }
          });
          if (levelEntries.length) {
            entries = levelEntries;
            usedHeadingLevel = level;
            break;
          }
        }
        if (!sectionKey && usedHeadingLevel === 2) {
          sectionSubheadings = new Map();
          let currentSection = null;
          text.split(/\r?\n/).forEach((line) => {
            const heading = parseMarkdownHeading(line);
            if (!heading) {
              return;
            }
            if (heading.level === 2) {
              currentSection = heading.title;
              if (!sectionSubheadings.has(currentSection)) {
                sectionSubheadings.set(currentSection, false);
              }
            } else if (heading.level === 3 && currentSection) {
              sectionSubheadings.set(currentSection, true);
            } else if (heading.level <= 2) {
              currentSection = heading.title;
            }
          });
        }
      }
    } catch (error) {
      console.warn("Failed to read markdown file", scene.autoMarkdownPath, error);
    }
  } else {
    useDirectories = scene.autoMarkdownSubdirectories === true;
    entries = useDirectories
      ? (await listMarkdownDirectoriesInDir(scene.autoMarkdownDirectory)).sort()
      : (await listMarkdownFilesInDir(scene.autoMarkdownDirectory)).sort();
  }

  if (Array.isArray(scene.autoMarkdownExcludePaths) && scene.autoMarkdownExcludePaths.length) {
    const exclude = new Set(
      scene.autoMarkdownExcludePaths.map((path) => normalizeMarkdownPath(path))
    );
    entries = entries.filter((entry) => !exclude.has(normalizeMarkdownPath(entry)));
  }

  const defaultIndex = scene.autoMarkdownDefaultIndex === true;
  const indexPaths = Array.isArray(scene.autoMarkdownIndexPaths)
    ? new Set(scene.autoMarkdownIndexPaths.map((path) => normalizeMarkdownPath(path)))
    : null;
  const plainPaths = Array.isArray(scene.autoMarkdownPlainPaths)
    ? new Set(scene.autoMarkdownPlainPaths.map((path) => normalizeMarkdownPath(path)))
    : null;
  const plainSectionPaths = Array.isArray(scene.autoMarkdownPlainSectionPaths)
    ? new Set(scene.autoMarkdownPlainSectionPaths.map((path) => normalizeMarkdownPath(path)))
    : null;
  const defaultSectionDepth =
    typeof scene.autoMarkdownSectionDepth === "number"
      ? scene.autoMarkdownSectionDepth
      : 2;
  const pathOverrides =
    scene.autoMarkdownOverrides && typeof scene.autoMarkdownOverrides === "object"
      ? scene.autoMarkdownOverrides
      : null;

  if (!entries.length && !includeExisting) {
    return [];
  }
  const fileInfos = scene.autoMarkdownPath
    ? entries.map((entry) => ({ title: entry.title }))
    : useDirectories
      ? entries.map((path) => ({ path, isNonEmpty: false }))
      : await Promise.all(
          entries.map(async (path) => {
            try {
              const response = await fetch(appendCacheBust(path));
              if (!response.ok) {
                return { path, isNonEmpty: false };
              }
              const text = await response.text();
              return { path, isNonEmpty: text.trim().length > 0 };
            } catch (error) {
              console.warn("Failed to read markdown file", path, error);
              return { path, isNonEmpty: false };
            }
          })
        );
  const usedIds = new Set(existingNodes.map((node) => node.id));
  let baseRadius =
    typeof scene.autoMarkdownNodeRadius === "number"
      ? scene.autoMarkdownNodeRadius
      : 1.6;
  const existingMaxRadius = includeExisting
    ? existingNodes.reduce(
        (maxRadius, node) => Math.max(maxRadius, node.radius ?? 0),
        0
      )
    : 0;
  const layoutRadius = Math.max(baseRadius, existingMaxRadius);
  const palette =
    Array.isArray(scene.autoMarkdownPalette) && scene.autoMarkdownPalette.length
      ? scene.autoMarkdownPalette
      : defaultAutoMarkdownPalette;
  const baseColor = scene.autoMarkdownColor ?? null;
  const maxRingCount =
    typeof scene.autoMarkdownMaxRingCount === "number"
      ? scene.autoMarkdownMaxRingCount
      : 14;
  const autoEntries = [];
  fileInfos.forEach((info) => {
    const entryName = info.title ?? info.path?.split("/").pop() ?? "";
    const slug = useDirectories
      ? entryName
      : entryName.replace(/\.md$/i, "");
    const id = slug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
    if (!id || usedIds.has(id)) {
      return;
    }
    autoEntries.push({ info, slug, id });
  });
  const layoutCount = includeExisting
    ? existingNodes.length + autoEntries.length
    : autoEntries.length;
  const ringRadius =
    typeof scene.autoMarkdownRingRadius === "number"
      ? scene.autoMarkdownRingRadius
      : Math.max(6, Math.min(layoutCount, maxRingCount) * layoutRadius * 1.4);
  const gridSpacing =
    typeof scene.autoMarkdownGridSpacing === "number"
      ? scene.autoMarkdownGridSpacing
      : layoutRadius * 2.6;
  const useRing = layoutCount <= maxRingCount;
  const columns = useRing ? 1 : Math.ceil(Math.sqrt(layoutCount));
  const rows = useRing ? layoutCount : Math.ceil(layoutCount / columns);
  const startX = useRing ? 0 : -((columns - 1) * gridSpacing) / 2;
  const startY = useRing ? 0 : ((rows - 1) * gridSpacing) / 2;

  if (useRing && layoutCount > 1) {
    const maxRadius = maxRingNodeRadius(ringRadius, layoutCount);
    if (Number.isFinite(maxRadius) && maxRadius > 0 && maxRadius < baseRadius) {
      baseRadius = maxRadius;
    }
  }

  if (includeExisting) {
    existingNodes.forEach((node) => {
      node.radius = baseRadius;
    });
  }

  const positionForIndex = (index) => {
    if (useRing) {
      const orderIndex = layoutCount - 1 - index;
      const angle =
        ringLayoutDefaults.startAngle + (orderIndex / layoutCount) * Math.PI * 2;
      return [Math.cos(angle) * ringRadius, Math.sin(angle) * ringRadius];
    }
    const row = Math.floor(index / columns);
    const col = index % columns;
    return [startX + col * gridSpacing, startY - row * gridSpacing];
  };

  if (includeExisting) {
    existingNodes.forEach((node, index) => {
      const [x, y] = positionForIndex(index);
      node.position = [Number(x.toFixed(2)), Number(y.toFixed(2)), 0];
    });
  }

  const isSectionIndex = !!sectionKey;
  const isTwoLevelRoot = !isSectionIndex && scene.autoMarkdownPath && usedHeadingLevel === 2;

  return autoEntries
    .map((entry, index) => {
      const { info, slug, id } = entry;
      const layoutIndex = includeExisting ? existingNodes.length + index : index;
      const [x, y] = positionForIndex(layoutIndex);
      let color = baseColor ?? palette[index % palette.length] ?? "#3a5a8a";
      if (typeof color === "string" && colorTokens[color]) {
        color = colorTokens[color];
      }
      const nodeName = scene.autoMarkdownPath
        ? info.title ?? titleFromSlug(slug)
        : titleFromSlug(slug);
      const node = {
        id,
        name: nodeName,
        radius: baseRadius,
        position: [Number(x.toFixed(2)), Number(y.toFixed(2)), 0],
        color,
        wrapLabel: scene.wrapLabels ?? true,
      };
      if (scene.autoMarkdownPath) {
        const override = pathOverrides
          ? pathOverrides[normalizeMarkdownPath(scene.autoMarkdownPath)]
          : null;
        const sectionDepth =
          typeof override?.sectionDepth === "number" ? override.sectionDepth : defaultSectionDepth;
        const allowSectionIndex =
          sectionDepth >= 2 &&
          !(plainSectionPaths && plainSectionPaths.has(normalizeMarkdownPath(scene.autoMarkdownPath)));
        const hasSubheadings =
          isTwoLevelRoot && info.title
            ? sectionSubheadings?.get(info.title) === true
            : false;
        if (isTwoLevelRoot && info.title && hasSubheadings && allowSectionIndex) {
          const childScene = ensureMarkdownSectionIndexScene(
            scene.autoMarkdownPath,
            info.title,
            scene
          );
          if (childScene) {
            node.childScene = childScene;
          }
        } else {
          node.markdownPath = scene.autoMarkdownPath;
          node.markdownSection = info.title ?? null;
        }
      } else if (useDirectories) {
        const childScene = ensureMarkdownDirectoryScene(
          info.path,
          scene,
          node.name
        );
        if (childScene) {
          node.childScene = childScene;
        }
      } else if (info.isNonEmpty) {
        const normalizedPath = normalizeMarkdownPath(info.path);
        const override = pathOverrides ? pathOverrides[normalizedPath] : null;
        node.markdownPath = info.path;
        let autoIndex = defaultIndex;
        if (indexPaths && indexPaths.has(normalizedPath)) {
          autoIndex = true;
        }
        if (plainPaths && plainPaths.has(normalizedPath)) {
          autoIndex = false;
        }
        if (override?.mode === "index") {
          autoIndex = true;
        } else if (override?.mode === "doc") {
          autoIndex = false;
        }
        node.markdownAutoIndex = autoIndex;
        if (typeof override?.headingLevel === "number") {
          node.markdownHeadingLevel = override.headingLevel;
        }
        if (override?.columns === 1 || override?.columns === 2) {
          node.markdownColumns = override.columns;
        }
        const sectionDepth =
          typeof override?.sectionDepth === "number" ? override.sectionDepth : defaultSectionDepth;
        const plainSectionList = [];
        if (plainSectionPaths && plainSectionPaths.has(normalizedPath)) {
          plainSectionList.push(info.path);
        }
        if (sectionDepth < 2) {
          plainSectionList.push(info.path);
        }
        if (plainSectionList.length) {
          node.markdownPlainSectionPaths = plainSectionList;
        }
        if (scene.autoMarkdownColumns === 1 || scene.autoMarkdownColumns === 2) {
          node.markdownColumns = scene.autoMarkdownColumns;
        }
      }
      return node;
    })
    .filter(Boolean);
}

function closeDetailPanel() {
  if (!detailPanel) {
    return;
  }
  detailPanel.classList.remove("is-open");
  detailPanel.setAttribute("aria-hidden", "true");
  detailPanel.inert = true;
  activeDetailNodeId = null;
  hoveredDetailNodeId = null;
  if (detailTitle) {
    detailTitle.textContent = "";
  }
  if (detailBody) {
    detailBody.innerHTML = "";
  }
}

function showHoverTooltip(text, x, y) {
  if (!hoverTooltip) {
    return;
  }
  hoverTooltip.textContent = text;
  hoverTooltip.classList.add("is-visible");
  hoverTooltip.setAttribute("aria-hidden", "false");

  const padding = 12;
  const rect = hoverTooltip.getBoundingClientRect();
  let left = x + padding;
  let top = y + padding;
  if (left + rect.width > window.innerWidth - padding) {
    left = x - rect.width - padding;
  }
  if (top + rect.height > window.innerHeight - padding) {
    top = y - rect.height - padding;
  }
  hoverTooltip.style.left = `${left}px`;
  hoverTooltip.style.top = `${top}px`;
  hoverTooltipVisible = true;
}

function hideHoverTooltip() {
  if (!hoverTooltip || !hoverTooltipVisible) {
    return;
  }
  hoverTooltip.classList.remove("is-visible");
  hoverTooltip.setAttribute("aria-hidden", "true");
  hoverTooltipVisible = false;
}

function hideMarkdownPanel() {
  markdownRuntime.hideMarkdownPanel();
}

function normalizeMarkdownKey(text) {
  return String(text)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeMarkdownPath(path) {
  return String(path)
    .replace(/\\/g, "/")
    .replace(/^\.?\//, "")
    .toLowerCase();
}

function deriveMarkdownConfig(markdownPolicy) {
  if (!markdownPolicy) {
    return null;
  }
  const derived = {};
  const source = markdownPolicy.source ?? {};
  const sourcePath = typeof source.path === "string" ? source.path : null;
  const sourceType =
    source.type ??
    (sourcePath && sourcePath.toLowerCase().endsWith(".md") ? "file" : "directory");
  if (sourceType === "file" && sourcePath) {
    derived.autoMarkdownPath = sourcePath;
  } else if (sourceType === "directory" && sourcePath) {
    derived.autoMarkdownDirectory = sourcePath;
    derived.autoMarkdownSubdirectories = source.subdirectories === true;
  }

  const layout = markdownPolicy.layout ?? {};
  if (layout.includeExisting !== undefined) {
    derived.autoMarkdownIncludeExistingInLayout = layout.includeExisting === true;
  }
  if (typeof layout.nodeRadius === "number") {
    derived.autoMarkdownNodeRadius = layout.nodeRadius;
  }
  if (typeof layout.ringRadius === "number") {
    derived.autoMarkdownRingRadius = layout.ringRadius;
  }
  if (typeof layout.maxRingCount === "number") {
    derived.autoMarkdownMaxRingCount = layout.maxRingCount;
  }
  if (typeof layout.gridSpacing === "number") {
    derived.autoMarkdownGridSpacing = layout.gridSpacing;
  }
  if (Array.isArray(layout.palette)) {
    derived.autoMarkdownPalette = layout.palette;
  }
  if (typeof layout.color === "string") {
    derived.autoMarkdownColor = layout.color;
  }

  const render = markdownPolicy.render ?? {};
  if (render.defaultMode === "index") {
    derived.autoMarkdownDefaultIndex = true;
  } else if (render.defaultMode === "doc") {
    derived.autoMarkdownDefaultIndex = false;
  }
  if (typeof render.headingLevel === "number") {
    derived.autoMarkdownHeadingLevel = render.headingLevel;
  }
  if (typeof render.sectionDepth === "number") {
    derived.autoMarkdownSectionDepth = render.sectionDepth;
  }
  if (render.columns === 1 || render.columns === 2) {
    derived.autoMarkdownColumns = render.columns;
  }

  if (Array.isArray(markdownPolicy.exclude)) {
    derived.autoMarkdownExcludePaths = markdownPolicy.exclude;
  }

  const overrides = Array.isArray(markdownPolicy.overrides) ? markdownPolicy.overrides : [];
  const indexPaths = [];
  const plainPaths = [];
  const plainSectionPaths = [];
  const perPath = {};
  overrides.forEach((override) => {
    if (!override || typeof override.path !== "string") {
      return;
    }
    const normalized = normalizeMarkdownPath(override.path);
    const record = perPath[normalized] ?? {};
    if (override.mode === "index") {
      indexPaths.push(override.path);
      record.mode = "index";
    } else if (override.mode === "doc") {
      plainPaths.push(override.path);
      record.mode = "doc";
    }
    if (typeof override.headingLevel === "number") {
      record.headingLevel = override.headingLevel;
    }
    if (typeof override.sectionDepth === "number") {
      record.sectionDepth = override.sectionDepth;
      if (override.sectionDepth < 2) {
        plainSectionPaths.push(override.path);
      }
    }
    if (override.columns === 1 || override.columns === 2) {
      record.columns = override.columns;
    }
    perPath[normalized] = record;
  });
  if (indexPaths.length) {
    derived.autoMarkdownIndexPaths = indexPaths;
  }
  if (plainPaths.length) {
    derived.autoMarkdownPlainPaths = plainPaths;
  }
  if (plainSectionPaths.length) {
    derived.autoMarkdownPlainSectionPaths = plainSectionPaths;
  }
  if (Object.keys(perPath).length) {
    derived.autoMarkdownOverrides = perPath;
  }

  return derived;
}

function parseMarkdownHeading(line) {
  const match = line.match(/^(#{2,3})\s+(.*)$/);
  if (!match) {
    const numbered = line.match(/^\*\*(\d+)\.\s+(.+?)\*\*/);
    if (!numbered) {
      return null;
    }
    return { level: 3, title: numbered[2].trim() };
  }
  const level = match[1].length;
  let title = match[2].trim();
  const boldMatch = title.match(/^\*\*(.+?)\*\*/);
  if (boldMatch) {
    title = boldMatch[1].trim();
  }
  return { level, title };
}

function extractMarkdownSection(markdown, sectionKey) {
  const target = normalizeMarkdownKey(sectionKey);
  if (!target) {
    return null;
  }
  const lines = markdown.split(/\r?\n/);
  let sectionTitle = null;
  let start = -1;
  let end = lines.length;
  let startLevel = null;
  for (let i = 0; i < lines.length; i += 1) {
    const heading = parseMarkdownHeading(lines[i]);
    if (!heading) {
      continue;
    }
    const headingKey = normalizeMarkdownKey(heading.title);
    if (start === -1) {
      if (headingKey === target) {
        sectionTitle = heading.title;
        start = i + 1;
        startLevel = heading.level;
      }
      continue;
    }
    if (heading.level <= (startLevel ?? heading.level)) {
      end = i;
      break;
    }
  }
  if (start === -1) {
    return null;
  }
  const body = lines.slice(start, end).join("\n").trim();
  return { title: sectionTitle, body };
}

const markdownRuntime = createMarkdownRuntime({
  markdownPanel,
  markdownTitle,
  markdownBody,
  markdownLayoutToggle,
  markdownRenderer,
  markdownCache,
  markdownSectionCache,
  infoBody,
  infoMarkdownPath,
  hud,
  infoDrawer,
  extractMarkdownSection,
});

async function showMarkdownPanel(level) {
  return markdownRuntime.showMarkdownPanel(level);
}

async function toggleInfoDrawer() {
  return markdownRuntime.toggleInfoDrawer();
}

async function setInfoDrawer(open) {
  return markdownRuntime.setInfoDrawer(open);
}

function updateSceneMarkdown() {
  if (!currentLevel || !currentLevel.markdownPath) {
    hideMarkdownPanel();
    return;
  }
  if (currentLevel.markdownAutoOpen === false) {
    hideMarkdownPanel();
    return;
  }
  showMarkdownPanel(currentLevel);
}

function getNodeGeneration(node) {
  const count = node?.data?.binaryBands?.length ?? 0;
  if (count >= 3) {
    return "I";
  }
  if (count === 2) {
    return "II";
  }
  if (count === 1) {
    return "III";
  }
  return null;
}

function getPulsingBandName(node) {
  const count = node?.data?.binaryBands?.length ?? 0;
  if (count >= 3) {
    return "outer";
  }
  if (count === 2) {
    return "middle";
  }
  return null;
}

function getNextGenerationInfo(level) {
  if (!level || !level.sceneId) {
    return null;
  }
  const currentGen = getNodeGeneration(level.primaryBinaryNode);
  if (!currentGen || currentGen === "III") {
    return null;
  }
  const mapping = generationTransitions[level.sceneId];
  if (!mapping) {
    return null;
  }
  const nextGen = currentGen === "I" ? "II" : "III";
  return { ...mapping, nextGen };
}

function setDetailPanel(node) {
  if (!detailPanel || !detailTitle || !detailBody) {
    return;
  }
  const details = node?.data?.details;
  if (!details) {
    closeDetailPanel();
    return;
  }
  detailPanel.classList.add("is-open");
  detailPanel.setAttribute("aria-hidden", "false");
  detailPanel.inert = false;
  activeDetailNodeId = node.data.id ?? node.data.name ?? null;
  hoveredDetailNodeId = activeDetailNodeId;
  detailTitle.textContent = node.data.name ?? node.data.id ?? "Details";
  detailBody.innerHTML = "";

  const appendDetailRow = (label, value) => {
    const row = document.createElement("div");
    row.className = "detail-row";
    const keyCell = document.createElement("div");
    keyCell.className = "detail-key";
    keyCell.innerHTML = formatSuperscripts(label);
    const valueCell = document.createElement("div");
    valueCell.className = "detail-value";
    valueCell.innerHTML = formatSuperscripts(value);
    row.appendChild(keyCell);
    row.appendChild(valueCell);
    detailBody.appendChild(row);
  };

  if (currentLevel?.sceneId === "standard_model" && node.data.category) {
    appendDetailRow("Class", node.data.category);
  }

  const usedKeys = new Set();
  detailFieldOrder.forEach((field) => {
    if (details[field.key] === undefined || details[field.key] === null) {
      return;
    }
    usedKeys.add(field.key);
    appendDetailRow(field.label, details[field.key]);
  });

  Object.keys(details)
    .filter((key) => !usedKeys.has(key))
    .forEach((key) => {
      appendDetailRow(key, details[key]);
    });
}

function purgeWorldState() {
  transitionState.active = false;
  transitionState.mode = null;
  transitionState.fromLevel = null;
  transitionState.toLevel = null;
  transitionState.payload = null;
  closeDetailPanel();
  hideHoverTooltip();
  hideMarkdownPanel();
  zoomState.active = false;
  panTween.active = false;
  labelFadeState.active = false;
  worldGroup.clear();
  worldGroup.position.set(0, 0, 0);
  levels.clear();
  if (labelRenderer?.domElement) {
    labelRenderer.domElement.innerHTML = "";
  }
}

function appendCacheBust(path) {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}v=${cacheBustToken}`;
}

const sceneRepository = new SceneRepository({
  fetchImpl: (...args) => fetch(...args),
  appendCacheBust,
  sceneConfigCache,
  sceneLoadPromises,
  levelConfigs,
  normalizeVelocity,
  colorTokens,
  deriveMarkdownConfig,
  buildAutoMarkdownNodes,
});

async function loadSceneConfig(scenePath) {
  return sceneRepository.loadSceneConfig(scenePath);
}

async function resetToRootScene() {
  if (transitionState.active) {
    return;
  }
  const config = await loadSceneConfig(rootScenePath);
  if (!config) {
    return;
  }
  purgeWorldState();
  const rootLevel = buildLevel(rootScenePath);
  worldGroup.add(rootLevel.group);
  rootLevel.group.position.set(0, 0, 0);
  rootLevel.group.scale.setScalar(1);
  layoutRootLevel(rootLevel);
  setLevelOpacity(rootLevel, 1);
  setLevelLabelOpacity(rootLevel, 0);
  setLevelLinkOpacity(rootLevel, 1);
  currentLevel = rootLevel;
  navigationStack.length = 0;
  searchBackStack.length = 0;
  labelFadeState.active = true;
  labelFadeState.level = currentLevel;
  labelFadeState.startTime = performance.now();
  updateCamera();
  fitCameraToLevel(currentLevel);
  updateSceneLabel();
  updateSceneMarkdown();
}

async function jumpToScene(scenePath, options = {}) {
  if (transitionState.active) {
    return;
  }
  const config = levelConfigs[scenePath] ?? (await loadSceneConfig(scenePath));
  if (!config) {
    return;
  }
  await ensureDynamicSceneConfig(scenePath);
  if (options.mode === "instant") {
    purgeWorldState();
    const level = buildLevel(scenePath);
    worldGroup.add(level.group);
    level.group.position.set(0, 0, 0);
    level.group.scale.setScalar(1);
    setLevelOpacity(level, 1);
    setLevelLabelOpacity(level, 0);
    setLevelLinkOpacity(level, 1);
    currentLevel = level;
    navigationStack.length = 0;
    if (Array.isArray(options.restoreNavStack)) {
      options.restoreNavStack.forEach((item) => {
        if (item && item.levelId && item.focusNodeId) {
          navigationStack.push({
            levelId: item.levelId,
            focusNodeId: item.focusNodeId,
          });
        }
      });
    }
    labelFadeState.active = true;
    labelFadeState.level = currentLevel;
    labelFadeState.startTime = performance.now();
    updateCamera();
    fitCameraToLevel(currentLevel);
    updateSceneLabel();
    updateSceneMarkdown();
    return;
  }

  const nextLevel = buildLevel(scenePath);
  hideMarkdownPanel();
  purgeWorldState();
  if (currentLevel && !worldGroup.children.includes(currentLevel.group)) {
    worldGroup.add(currentLevel.group);
  }
  worldGroup.add(nextLevel.group);
  nextLevel.group.position.set(0, 0, 0);
  nextLevel.group.scale.setScalar(options.startScale ?? 1);
  setLevelOpacity(nextLevel, 0);
  setLevelLabelOpacity(nextLevel, 0);
  setLevelLinkOpacity(nextLevel, 0);

  const zoomTarget = computeFitZoomForLevel(nextLevel);
  transitionState.active = true;
  transitionState.mode = "jump";
  transitionState.fromLevel = currentLevel;
  transitionState.toLevel = nextLevel;
  transitionState.payload = {
    zoomStart: camera.zoom,
    zoomTarget,
    startScale: options.startScale ?? 1,
  };
  transitionState.startTime = performance.now();
  transitionState.duration = options.duration ?? 700;

  navigationStack.length = 0;
  if (Array.isArray(options.restoreNavStack)) {
    options.restoreNavStack.forEach((item) => {
      if (item && item.levelId && item.focusNodeId) {
        navigationStack.push({
          levelId: item.levelId,
          focusNodeId: item.focusNodeId,
        });
      }
    });
  }
}

function clampZoom(value) {
  return Math.min(zoomLimits.max, Math.max(zoomLimits.min, value));
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothstep(edge0, edge1, x) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function setTargetZoom(nextZoom, duration = 420) {
  zoomState.active = true;
  zoomState.startZoom = camera.zoom;
  zoomState.targetZoom = clampZoom(nextZoom);
  zoomState.startTime = performance.now();
  zoomState.duration = duration;
}

function setTargetPan(nextPosition, duration = 420) {
  panTween.active = true;
  panTween.start.copy(worldGroup.position);
  panTween.target.copy(nextPosition);
  panTween.startTime = performance.now();
  panTween.duration = duration;
}

function applyZoom(value) {
  camera.zoom = clampZoom(value);
  camera.updateProjectionMatrix();
}

function computeFocusZoom(radius, fraction = 0.32) {
  const targetFraction = clamp(fraction, 0.15, 0.6);
  const safeRadius = Math.max(radius, 0.01);
  const targetZoom = (targetFraction * baseViewHeight) / (2 * safeRadius);
  return clampZoom(targetZoom);
}

function getMarkdownReaderSceneId(markdownPath, markdownSection) {
  if (!markdownSection) {
    return `__markdown_reader__:${markdownPath}`;
  }
  const normalized = normalizeMarkdownKey(markdownSection);
  return `__markdown_reader__:${markdownPath}::${normalized}`;
}

function getMarkdownIndexSceneId(markdownPath, headingLevel) {
  const levelToken = typeof headingLevel === "number" ? `::h${headingLevel}` : "";
  return `__markdown_index__:${markdownPath}${levelToken}`;
}

function getMarkdownDocSceneId(markdownPath) {
  return `__markdown_doc__:${markdownPath}`;
}

function getMarkdownSectionIndexSceneId(markdownPath, markdownSection) {
  const normalized = normalizeMarkdownKey(markdownSection);
  return `__markdown_section_index__:${markdownPath}::${normalized}`;
}

function getMarkdownDirectorySceneId(directory) {
  return `__markdown_directory__:${directory}`;
}

function ensureMarkdownReaderScene(nodeData) {
  const markdownPath = nodeData.markdownPath;
  if (!markdownPath) {
    return null;
  }
  const sceneName = nodeData.name ?? "Notes";
  const markdownSection = nodeData.markdownSection ?? null;
  const headingLevel =
    typeof nodeData.markdownHeadingLevel === "number"
      ? nodeData.markdownHeadingLevel
      : 2;

  if (!markdownSection) {
    if (nodeData.markdownAutoIndex === false) {
      const sceneId = getMarkdownDocSceneId(markdownPath);
      if (levelConfigs[sceneId]) {
        return sceneId;
      }
      levelConfigs[sceneId] = {
        layout: "static",
        nodes: [],
        links: [],
        sceneName,
        sceneId,
        markdownPath,
        markdownSection: null,
        markdownColumns: nodeData.markdownColumns ?? null,
        markdownAutoOpen: true,
        centerOn: null,
      };
      markdownReaderScenes.set(sceneId, true);
      return sceneId;
    }
    const sceneId = getMarkdownIndexSceneId(markdownPath, headingLevel);
    if (levelConfigs[sceneId]) {
      return sceneId;
    }
      levelConfigs[sceneId] = {
        layout: "static",
        nodes: [],
        links: [],
        sceneName,
        sceneId,
        markdownPath,
        markdownSection: null,
        markdownColumns: nodeData.markdownColumns ?? null,
        markdownAutoOpen: false,
        centerOn: null,
        autoSphereRing: true,
        autoMarkdownPath: markdownPath,
        autoMarkdownHeadingLevel: headingLevel,
        autoMarkdownIncludeExistingInLayout: false,
        autoMarkdownPlainSectionPaths: Array.isArray(nodeData.markdownPlainSectionPaths)
          ? nodeData.markdownPlainSectionPaths
          : [],
      };
    markdownReaderScenes.set(sceneId, true);
    return sceneId;
  }

  const sceneId = getMarkdownReaderSceneId(markdownPath, markdownSection);
  if (levelConfigs[sceneId]) {
    return sceneId;
  }
  levelConfigs[sceneId] = {
    layout: "static",
    nodes: [],
    links: [],
    sceneName,
    sceneId,
    markdownPath,
    markdownSection,
    markdownColumns: nodeData.markdownColumns ?? null,
    markdownAutoOpen: true,
    centerOn: null,
  };
  markdownReaderScenes.set(sceneId, true);
  return sceneId;
}

function ensureMarkdownSectionIndexScene(markdownPath, markdownSection, parentScene) {
  if (!markdownPath || !markdownSection) {
    return null;
  }
  const sceneId = getMarkdownSectionIndexSceneId(markdownPath, markdownSection);
  if (levelConfigs[sceneId]) {
    return sceneId;
  }
  levelConfigs[sceneId] = {
    layout: "static",
    nodes: [],
    links: [],
    sceneName: markdownSection,
    sceneId,
    markdownPath,
    markdownSection,
    markdownColumns: parentScene?.autoMarkdownColumns ?? null,
    markdownAutoOpen: false,
    centerOn: null,
    autoSphereRing: true,
    autoMarkdownPath: markdownPath,
    autoMarkdownSection: markdownSection,
    autoMarkdownHeadingLevel: 3,
    autoMarkdownIncludeExistingInLayout: false,
    autoMarkdownNodeRadius: parentScene?.autoMarkdownNodeRadius,
    autoMarkdownRingRadius: parentScene?.autoMarkdownRingRadius,
    autoMarkdownMaxRingCount: parentScene?.autoMarkdownMaxRingCount,
    autoMarkdownGridSpacing: parentScene?.autoMarkdownGridSpacing,
    autoMarkdownColumns: parentScene?.autoMarkdownColumns,
    autoMarkdownPalette: parentScene?.autoMarkdownPalette,
    autoMarkdownColor: parentScene?.autoMarkdownColor,
  };
  return sceneId;
}

function ensureMarkdownDirectoryScene(directory, parentScene, nodeName) {
  if (!directory) {
    return null;
  }
  const sceneId = getMarkdownDirectorySceneId(directory);
  if (levelConfigs[sceneId]) {
    return sceneId;
  }
  levelConfigs[sceneId] = {
    layout: "static",
    nodes: [],
    links: [],
    sceneName: nodeName ?? titleFromSlug(directory.split("/").pop() ?? "Notes"),
    sceneId,
    markdownPath: null,
    markdownSection: null,
    markdownColumns: null,
    markdownAutoOpen: false,
    centerOn: null,
    autoSphereRing: true,
    autoMarkdownDirectory: directory,
    autoMarkdownIncludeExistingInLayout: false,
    autoMarkdownNodeRadius: parentScene?.autoMarkdownNodeRadius,
    autoMarkdownRingRadius: parentScene?.autoMarkdownRingRadius,
    autoMarkdownMaxRingCount: parentScene?.autoMarkdownMaxRingCount,
    autoMarkdownGridSpacing: parentScene?.autoMarkdownGridSpacing,
    autoMarkdownColumns: parentScene?.autoMarkdownColumns,
    autoMarkdownPalette: parentScene?.autoMarkdownPalette,
    autoMarkdownColor: parentScene?.autoMarkdownColor,
  };
  return sceneId;
}

async function ensureDynamicSceneConfig(sceneId) {
  return sceneRepository.ensureDynamicSceneConfig(sceneId);
}

function computeWarpScale(objectRadius) {
  const aspect = window.innerWidth / window.innerHeight;
  const viewHeight = baseViewHeight / camera.zoom;
  const viewWidth = (baseViewHeight * aspect) / camera.zoom;
  const halfDiagonal = 0.5 * Math.hypot(viewWidth, viewHeight);
  const targetRadius = halfDiagonal * 1.05;
  return Math.max(1.2, targetRadius / Math.max(objectRadius, 0.01));
}

function computeWarpScaleForLevel(level, overshoot = 1.25) {
  const { size } = getLevelBoundsFromNodes(level);
  const radius = Math.max(size.x, size.y) * 0.5;
  const base = computeWarpScale(Math.max(radius, 0.01));
  return Math.max(1.4, base * overshoot);
}

function getSafeViewportWorld() {
  const aspect = window.innerWidth / window.innerHeight;
  const viewWidth = baseViewHeight * aspect;
  const worldPerPixel = viewWidth / Math.max(window.innerWidth, 1);
  const safeWidth = Math.max(
    2,
    viewWidth - 2 * (rootLayoutMarginPx.x * worldPerPixel)
  );
  const safeHeight = Math.max(
    2,
    baseViewHeight - 2 * (rootLayoutMarginPx.y * worldPerPixel)
  );
  return { safeWidth, safeHeight };
}

function cloneNodeData(nodeData) {
  if (typeof structuredClone === "function") {
    return structuredClone(nodeData);
  }
  return JSON.parse(JSON.stringify(nodeData));
}

function resetNodeScale(node) {
  if (!node?.group) {
    return;
  }
  const baseScale =
    typeof node.baseScale === "number"
      ? node.baseScale
      : typeof node.data?.baseScale === "number"
        ? node.data.baseScale
        : 1;
  node.group.scale.setScalar(baseScale);
}

function layoutRootLevel(level) {
  if (!level || level.id !== rootScenePath) {
    return;
  }
  const nodes = level.nodes;
  if (!nodes?.length) {
    return;
  }
  nodes.forEach((node) => {
    if (node.data && typeof node.data.baseRadius !== "number") {
      node.data.baseRadius = node.data.radius ?? 0;
    }
  });
  const baseRadius = Math.max(
    ...nodes.map((node) => node.data?.baseRadius ?? node.data?.radius ?? 0)
  );
  const { safeWidth, safeHeight } = getSafeViewportWorld();
  const safeRadius = Math.max(2, Math.min(safeWidth, safeHeight) / 2);
  let targetRadius = baseRadius;
  if (nodes.length > 1) {
    let r = baseRadius;
    for (let i = 0; i < 6; i += 1) {
      const candidateRing = Math.max(2, safeRadius - r);
      const maxRadius = maxRingNodeRadius(candidateRing, nodes.length);
      if (!Number.isFinite(maxRadius) || maxRadius <= 0) {
        break;
      }
      r = Math.min(maxRadius, safeRadius - 2);
    }
    targetRadius = r;
  }
  const ringRadius = Math.max(2, safeRadius - targetRadius);
  const scaleFactor = baseRadius > 0 ? targetRadius / baseRadius : 1;
  if (Number.isFinite(scaleFactor)) {
    nodes.forEach((node) => {
      node.group.scale.setScalar(scaleFactor);
      node.baseScale = scaleFactor;
      if (node.data) {
        node.data.baseScale = scaleFactor;
      }
      if (node.data?.baseRadius) {
        node.data.radius = node.data.baseRadius * scaleFactor;
      }
    });
  }

  const angleStep = (-Math.PI * 2) / nodes.length;
  const startAngle = ringLayoutDefaults.startAngle;
  nodes.forEach((node, index) => {
    const angle = startAngle + angleStep * index;
    const x = Math.cos(angle) * ringRadius;
    const y = Math.sin(angle) * ringRadius;
    node.group.position.set(x, y, node.group.position.z);
    node.basePosition = node.group.position.clone();
  });
}

function getLevelBoundsLocal(level) {
  return getLevelBoundsFromNodes(level);
}

function computeFitZoomForLevel(level) {
  const { size } = getLevelBoundsFromNodes(level);
  if (!isFinite(size.x) || !isFinite(size.y) || size.lengthSq() === 0) {
    return camera.zoom;
  }

  const aspect = window.innerWidth / window.innerHeight;
  const viewHeight = baseViewHeight;
  const viewWidth = baseViewHeight * aspect;
  const marginFactor = 0.8;
  const zoomX = (viewWidth * marginFactor) / Math.max(size.x, 0.01);
  const zoomY = (viewHeight * marginFactor) / Math.max(size.y, 0.01);
  return clampZoom(Math.min(zoomX, zoomY));
}

function fitCameraToLevel(level) {
  const { size } = getLevelBoundsFromNodes(level);
  if (!isFinite(size.x) || !isFinite(size.y) || size.lengthSq() === 0) {
    return;
  }

  const center = getLevelCenter(level);
  const nextZoom = computeFitZoomForLevel(level);

  zoomState.active = false;
  panTween.active = false;
  worldGroup.position.set(-center.x, -center.y, 0);
  applyZoom(nextZoom);
}

function updateCamera() {
  const aspect = window.innerWidth / window.innerHeight;
  const viewHeight = baseViewHeight;
  const viewWidth = viewHeight * aspect;
  camera.left = -viewWidth / 2;
  camera.right = viewWidth / 2;
  camera.top = viewHeight / 2;
  camera.bottom = -viewHeight / 2;
  camera.updateProjectionMatrix();
}

const nodeFactory = createNodeFactory({
  THREE,
  CSS2DObject,
  binaryStyle,
});

function createNode(nodeData) {
  return nodeFactory.createNode(nodeData);
}

const sceneGraphRuntime = createSceneGraphRuntime({
  THREE,
  levels,
  levelConfigs,
  rootScenePath,
  cloneNodeData,
  computeRingLayout,
  createNode,
  layoutRootLevel,
  buildLevelLinks,
  updateLevelMotions,
});

function buildLevel(levelId) {
  return sceneGraphRuntime.buildLevel(levelId);
}

function updateLevelMotions(level, timeSeconds) {
  levelRuntime.updateLevelMotions(level, timeSeconds);
}

function getLevelBoundsFromNodes(level) {
  const min = new THREE.Vector3(Infinity, Infinity, Infinity);
  const max = new THREE.Vector3(-Infinity, -Infinity, -Infinity);
  let hasNode = false;

  level.nodes.forEach((node) => {
    if (node.data?.excludeFromBounds) {
      return;
    }
    const radius = node.data.radius ?? 0;
    if (node.data.orbit) {
      const orbit = node.data.orbit;
      const centerNode =
        level.nodeByName.get(orbit.center) ?? level.nodeById.get(orbit.center);
      const centerPos = centerNode
        ? centerNode.group.position
        : Array.isArray(orbit.center)
          ? new THREE.Vector3(
              orbit.center[0] ?? 0,
              orbit.center[1] ?? 0,
              orbit.center[2] ?? 0
            )
          : node.group.position;
      const orbitRadius = orbit.radius ?? 0;
      const yScale = orbit.shape === "ellipsoid" ? orbit.yScale ?? 0.85 : 1;
      min.x = Math.min(min.x, centerPos.x - orbitRadius - radius);
      max.x = Math.max(max.x, centerPos.x + orbitRadius + radius);
      min.y = Math.min(min.y, centerPos.y - orbitRadius * yScale - radius);
      max.y = Math.max(max.y, centerPos.y + orbitRadius * yScale + radius);
      min.z = Math.min(min.z, centerPos.z - radius);
      max.z = Math.max(max.z, centerPos.z + radius);
    } else {
      const pos = node.group.position;
      min.x = Math.min(min.x, pos.x - radius);
      min.y = Math.min(min.y, pos.y - radius);
      min.z = Math.min(min.z, pos.z - radius);
      max.x = Math.max(max.x, pos.x + radius);
      max.y = Math.max(max.y, pos.y + radius);
      max.z = Math.max(max.z, pos.z + radius);
    }
    hasNode = true;
  });

  if (!hasNode) {
    return { size: new THREE.Vector3(), center: new THREE.Vector3() };
  }

  const size = new THREE.Vector3(
    max.x - min.x,
    max.y - min.y,
    max.z - min.z
  );
  const center = new THREE.Vector3(
    (min.x + max.x) / 2,
    (min.y + max.y) / 2,
    (min.z + max.z) / 2
  );
  return { size, center };
}

function getLevelCenter(level) {
  if (!level) {
    return new THREE.Vector3();
  }
  if (level.centerOn === "origin") {
    return new THREE.Vector3();
  }
  if (level.centerOn) {
    const node =
      level.nodeById.get(level.centerOn) ??
      level.nodeByName.get(level.centerOn);
    if (node) {
      return node.group.position.clone();
    }
  }
  return getLevelBoundsFromNodes(level).center;
}

function buildLevelLinks(level, config) {
  levelRuntime.buildLevelLinks(level, config);
}

function updateLevelLinks(level) {
  levelRuntime.updateLevelLinks(level);
}

function setLevelLinkOpacity(level, opacity) {
  levelRuntime.setLevelLinkOpacity(level, opacity);
}

function updateLevelLabelWrap(level) {
  if (!level) {
    return;
  }
  level.nodes.forEach((node) => {
    if (!node.data.wrapLabel) {
      return;
    }
    const metrics = getNodeScreenMetrics(node);
    const diameter = metrics.radiusPx * 2;
    if (!Number.isFinite(diameter) || diameter <= 0) {
      return;
    }
    const targetWidth = Math.round(diameter * 0.88);
    const minWidth = 42;
    const maxAllowed = Math.round(diameter * 0.95);
    const widthFloor = Math.min(minWidth, maxAllowed);
    const maxWidth = Math.max(widthFloor, Math.min(targetWidth, maxAllowed));
    if (node.labelMaxWidth !== maxWidth) {
      node.labelMaxWidth = maxWidth;
      node.labelObject.element.style.maxWidth = `${maxWidth}px`;
      node.labelObject.element.style.width = `${maxWidth}px`;
    }

    const name = typeof node.data.name === "string" ? node.data.name : "";
    const tokens = name.split(/[\s-]+/).filter(Boolean);
    const longestToken = tokens.reduce((max, token) => {
      return Math.max(max, token.length);
    }, 1);
    const sizeByDiameter = diameter * 0.15;
    const sizeByToken = maxWidth / (longestToken * 0.58);
    const titleSize = clamp(Math.min(sizeByDiameter, sizeByToken + 0.5), 10, 16);

    let titleWeight = 600;
    if (titleSize <= 10.75) {
      titleWeight = 400;
    } else if (titleSize <= 12.5) {
      titleWeight = 500;
    }
    const lineHeight = titleSize <= 11.5 ? 1.22 : titleSize <= 13 ? 1.18 : 1.14;
    const letterSpacing = titleSize <= 11.5 ? 0.01 : 0.02;
    const scaleSize = clamp(titleSize * 0.62, 8, 10);
    const tagSize = clamp(titleSize * 0.58, 8, 9);
    const typographyKey = [
      titleSize.toFixed(2),
      titleWeight,
      lineHeight.toFixed(2),
      letterSpacing.toFixed(2),
      scaleSize.toFixed(2),
      tagSize.toFixed(2),
    ].join("|");

    if (node.labelTypographyKey !== typographyKey) {
      node.labelTypographyKey = typographyKey;
      const labelStyle = node.labelObject.element.style;
      labelStyle.setProperty("--label-title-size", `${titleSize.toFixed(2)}px`);
      labelStyle.setProperty("--label-title-weight", `${titleWeight}`);
      labelStyle.setProperty("--label-title-line-height", lineHeight.toFixed(2));
      labelStyle.setProperty(
        "--label-title-letter-spacing",
        `${letterSpacing.toFixed(2)}em`
      );
      labelStyle.setProperty("--label-scale-size", `${scaleSize.toFixed(2)}px`);
      labelStyle.setProperty("--label-tag-size", `${tagSize.toFixed(2)}px`);
    }
  });
}

function updateGlowRingOrientation(level) {
  levelRuntime.updateGlowRingOrientation(level);
}

function setLevelOpacity(level, opacity) {
  levelRuntime.setLevelOpacity(level, opacity);
}

function setLevelOpacityWithLabel(level, meshOpacity, labelOpacity) {
  levelRuntime.setLevelOpacityWithLabel(level, meshOpacity, labelOpacity);
}

function setLevelLabelOpacity(level, labelOpacity) {
  levelRuntime.setLevelLabelOpacity(level, labelOpacity);
}

function setLevelOpacityWithFocus(level, focusId, focusOpacity, otherOpacity) {
  levelRuntime.setLevelOpacityWithFocus(
    level,
    focusId,
    focusOpacity,
    otherOpacity
  );
}

function setLevelOpacityWithFocusAndLabel(
  level,
  focusId,
  focusOpacity,
  otherOpacity,
  labelOpacity
) {
  levelRuntime.setLevelOpacityWithFocusAndLabel(
    level,
    focusId,
    focusOpacity,
    otherOpacity,
    labelOpacity
  );
}

function updateLevelHalo(level, timeSeconds) {
  levelRuntime.updateLevelHalo(level, timeSeconds);
}

function updateBinaryRingPulse(level, timeSeconds) {
  levelRuntime.updateBinaryRingPulse(level, timeSeconds);
}

function beginLevelTransition(targetNode, childLevelId) {
  if (transitionState.active) {
    return;
  }
  if (!childLevelId) {
    return;
  }

  closeDetailPanel();
  hideHoverTooltip();
  hideMarkdownPanel();
  const toLevel = buildLevel(childLevelId);
  if (!worldGroup.children.includes(toLevel.group)) {
    worldGroup.add(toLevel.group);
  }

  const targetWorld = new THREE.Vector3();
  targetNode.group.getWorldPosition(targetWorld);
  const targetPosition = targetWorld.sub(worldGroup.position);
  const toLevelCenter = getLevelCenter(toLevel);
  const warpScale = computeWarpScale(targetNode.data.radius);
  const toStartScale = 0.5;
  const focusNodeId = targetNode.data.id ?? targetNode.data.name;
  const zoomTarget = computeFitZoomForLevel(toLevel);
  const panStart = worldGroup.position.clone();
  const panTarget = new THREE.Vector3(-targetPosition.x, -targetPosition.y, 0);

  zoomState.active = false;
  panTween.active = false;

  transitionState.active = true;
  transitionState.fromLevel = currentLevel;
  transitionState.toLevel = toLevel;
  transitionState.mode = "warpIn";
  transitionState.payload = {
    focusNodeId,
    zoomStart: camera.zoom,
    zoomTarget,
    warpScale,
    toStartScale,
    panStart,
    panTarget,
  };
  transitionState.startTime = performance.now();
  transitionState.duration = 2250;

  toLevel.group.position.copy(targetPosition).sub(toLevelCenter);
  toLevel.group.scale.setScalar(toStartScale);
  setLevelOpacity(toLevel, 0);
  setLevelLabelOpacity(toLevel, 0);
  setLevelOpacityWithFocus(currentLevel, focusNodeId, 1, 0);
  setLevelLinkOpacity(currentLevel, 0);

  navigationStack.push({
    levelId: currentLevel.id,
    focusNodeId: targetNode.data.id ?? targetNode.data.name,
  });
}

async function startLevelTransitionFromNode(targetNode) {
  const childLevelId = targetNode.data.children || targetNode.data.childScene;
  if (!childLevelId) {
    return;
  }

  if (!levelConfigs[childLevelId]) {
    const config = await loadSceneConfig(childLevelId);
    if (!config) {
      return;
    }
  }
  await ensureDynamicSceneConfig(childLevelId);

  beginLevelTransition(targetNode, childLevelId);
}

function startLevelTransitionOut() {
  if (transitionState.active || navigationStack.length === 0) {
    return;
  }

  closeDetailPanel();
  hideHoverTooltip();
  hideMarkdownPanel();
  const parentInfo = navigationStack[navigationStack.length - 1];
  const parentLevel = buildLevel(parentInfo.levelId);
  const parentNode =
    parentLevel.nodeById.get(parentInfo.focusNodeId) ??
    parentLevel.nodeByName.get(parentInfo.focusNodeId);
  if (!parentNode) {
    return;
  }

  if (!worldGroup.children.includes(parentLevel.group)) {
    worldGroup.add(parentLevel.group);
  }

  const parentCenter = getLevelCenter(parentLevel);
  zoomState.active = false;
  panTween.active = false;

  transitionState.active = true;
  transitionState.fromLevel = currentLevel;
  transitionState.toLevel = parentLevel;
  transitionState.mode = "warpOut";
  transitionState.payload = {
    focusNodeId: parentInfo.focusNodeId,
    zoomStart: camera.zoom,
    zoomTarget: computeFitZoomForLevel(parentLevel),
    toStartScale: computeWarpScaleForLevel(parentLevel),
    panStart: worldGroup.position.clone(),
    fromPivot: null,
  };
  transitionState.startTime = performance.now();
  transitionState.duration = 1500;

  parentLevel.group.position
    .copy(parentCenter)
    .multiplyScalar(-1)
    .sub(worldGroup.position);
  parentLevel.group.scale.setScalar(transitionState.payload.toStartScale);
  setLevelOpacity(parentLevel, 0);
  setLevelLabelOpacity(parentLevel, 0);
  setLevelOpacity(currentLevel, 1);

  const pivotOrigin = new THREE.Vector3(
    -worldGroup.position.x,
    -worldGroup.position.y,
    0
  );
  if (pivotOrigin.lengthSq() > 0.0001) {
    const pivot = new THREE.Group();
    pivot.position.copy(pivotOrigin);
    worldGroup.add(pivot);
    const oldPos = currentLevel.group.position.clone();
    worldGroup.remove(currentLevel.group);
    pivot.add(currentLevel.group);
    currentLevel.group.position.copy(oldPos).sub(pivotOrigin);
    transitionState.payload.fromPivot = pivot;
  }
}

function finalizeTransition() {
  transitionEngine.finalize();
}

function updateTransition(now) {
  transitionEngine.update(now);
}

function getNodeScreenMetrics(node) {
  const worldPos = new THREE.Vector3();
  node.group.getWorldPosition(worldPos);
  const worldEdge = worldPos.clone().add(new THREE.Vector3(node.data.radius, 0, 0));

  const ndcPos = worldPos.clone().project(camera);
  const ndcEdge = worldEdge.clone().project(camera);

  const centerPx = {
    x: (ndcPos.x * 0.5 + 0.5) * canvas.clientWidth,
    y: (-ndcPos.y * 0.5 + 0.5) * canvas.clientHeight,
  };
  const edgePx = {
    x: (ndcEdge.x * 0.5 + 0.5) * canvas.clientWidth,
    y: (-ndcEdge.y * 0.5 + 0.5) * canvas.clientHeight,
  };
  const radiusPx = Math.hypot(edgePx.x - centerPx.x, edgePx.y - centerPx.y);
  return { centerPx, radiusPx };
}

function findClosestNodeToCenter() {
  if (!currentLevel) {
    return null;
  }
  const center = {
    x: canvas.clientWidth / 2,
    y: canvas.clientHeight / 2,
  };
  let best = null;
  currentLevel.nodes.forEach((node) => {
    const metrics = getNodeScreenMetrics(node);
    const dist = Math.hypot(
      metrics.centerPx.x - center.x,
      metrics.centerPx.y - center.y
    );
    if (!best || dist < best.dist) {
      best = { node, dist, ...metrics };
    }
  });
  if (!best) {
    return null;
  }
  best.isInside = best.dist <= best.radiusPx * 0.9;
  return best;
}

function maybeAutoWarp(now) {
  if (transitionState.active) {
    return;
  }
  if (now - autoWarpThresholds.lastAt < autoWarpThresholds.cooldownMs) {
    return;
  }
  if (now - lastZoomGestureTime > 320) {
    return;
  }

  const candidate = findClosestNodeToCenter();
  if (!candidate) {
    return;
  }

  if (candidate.radiusPx >= autoWarpThresholds.inPx && candidate.isInside) {
    const childLevelId =
      candidate.node.data.children || candidate.node.data.childScene;
    if (childLevelId) {
      autoWarpThresholds.lastAt = now;
      startLevelTransitionFromNode(candidate.node);
    }
  }
}

function updateNavButton() {
  if (!navUpButton) {
    return;
  }
  if (transitionState.active) {
    navUpButton.disabled = true;
    updateDocButton();
    return;
  }
  navUpButton.disabled =
    navigationStack.length === 0 && searchBackStack.length === 0;
  updateDocButton();
}

async function ensurePeriodicTable() {
  return periodicTableService.ensure(
    fetch,
    "content/scenes/chemistry/periodic_table.json"
  );
}

function getPeriodicColor(category) {
  if (!category) {
    return periodicCategoryColors.unknown;
  }
  const key = category.toLowerCase();
  return periodicCategoryColors[key] || periodicCategoryColors.unknown;
}

function showPeriodicElementDetail(el) {
  if (!detailPanel || !detailTitle || !detailBody) {
    return;
  }
  detailPanel.classList.add("is-open");
  detailPanel.setAttribute("aria-hidden", "false");
  detailPanel.inert = false;
  detailTitle.textContent = `${el.symbol} — ${el.name}`;
  const fields = [
    ["Atomic #", el.number],
    ["Category", el.category],
    ["Phase", el.phase],
    ["Atomic mass", el.atomic_mass ? `${el.atomic_mass}` : null],
    ["Electron config", el.electron_configuration_semantic],
    ["Electronegativity", el.electronegativity_pauling],
    ["Electron affinity", el.electron_affinity],
    ["Melting point", el.melt],
    ["Boiling point", el.boil],
    ["Density", el.density],
    ["Block", el.block],
    ["Shells", Array.isArray(el.shells) ? el.shells.join(", ") : el.shells],
    ["Summary", el.summary],
  ];
  detailBody.innerHTML = "";
  fields.forEach(([label, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }
    const isSummary = label === "Summary";
    const row = document.createElement("div");
    row.className = "detail-row" + (isSummary ? " summary-row" : "");
    const key = document.createElement("div");
    key.className = "detail-key";
    key.textContent = label;
    const val = document.createElement("div");
    val.className = "detail-value";
    val.textContent = String(value);
    row.appendChild(key);
    row.appendChild(val);
    detailBody.appendChild(row);
  });
}

function buildPeriodicGrid(data) {
  if (!periodicGrid || !periodicLegend || !data?.elements) {
    return;
  }
  periodicGrid.innerHTML = "";
  periodicLegend.innerHTML = "";
  const frag = document.createDocumentFragment();
  const legendSet = new Map();
  data.elements.forEach((el) => {
    const btn = document.createElement("button");
    btn.className = "ptable-cell";
    btn.style.gridColumn = el.xpos;
    btn.style.gridRow = el.ypos;
    const color = getPeriodicColor(el.category);
    btn.style.background = `${color}22`;
    btn.style.borderColor = color;
    btn.dataset.symbol = el.symbol;
    btn.dataset.number = el.number;
    btn.innerHTML = `
      <div class="ptable-number">${el.number}</div>
      <div class="ptable-symbol">${el.symbol}</div>
      <div class="ptable-name">${el.name}</div>
    `;
    btn.addEventListener("click", () => {
      showPeriodicElementDetail(el);
      if (currentLevel) {
        searchBackStack.push({
          levelId: currentLevel.id,
          navigationStack: navigationStack.map((entry) => ({
            levelId: entry.levelId,
            focusNodeId: entry.focusNodeId,
          })),
        });
        updateNavButton();
      }
      const sceneId = el.symbol.toLowerCase();
      const path = `content/scenes/elements/${sceneId}.json`;
      if (periodicOverlay) {
        periodicOverlay.classList.add("is-fading");
      }
      jumpToScene(path, { mode: "jump", startScale: 0.35, duration: 2000 });
    });
    btn.addEventListener("mouseenter", () => showPeriodicElementDetail(el));
    frag.appendChild(btn);
    const legendKey = el.category || "Unknown";
    if (!legendSet.has(legendKey)) {
      legendSet.set(legendKey, color);
    }
  });
  periodicGrid.appendChild(frag);
  const legendFrag = document.createDocumentFragment();
  Array.from(legendSet.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([label, color]) => {
      const item = document.createElement("div");
      item.className = "ptable-legend-item";
      item.innerHTML = `<span class="ptable-legend-swatch" style="background:${color}"></span>${label}`;
      legendFrag.appendChild(item);
    });
  periodicLegend.appendChild(legendFrag);
  periodicGridBuilt = true;
}

async function updatePeriodicOverlay() {
  if (!periodicOverlay) {
    return;
  }
  const isPeriodic = currentLevel?.sceneId === "periodic_table";
  periodicOverlay.classList.toggle("is-open", !!isPeriodic);
  periodicOverlay.setAttribute("aria-hidden", isPeriodic ? "false" : "true");
  periodicOverlay.inert = !isPeriodic;
  if (!isPeriodic) {
    if (periodicOverlay.contains(document.activeElement)) {
      (navUpButton ?? homeButton ?? sceneSearchToggle ?? document.body).focus();
    }
    periodicOverlay.classList.remove("is-fading");
    return;
  }
  const data = await ensurePeriodicTable();
  if (data && !periodicGridBuilt) {
    buildPeriodicGrid(data);
  }
}

function updateElementLegend() {
  if (!elementLegend) {
    return;
  }
  const isElement =
    currentLevel && typeof currentLevel.id === "string"
      ? currentLevel.id.startsWith("content/scenes/elements/")
      : false;
  elementLegend.classList.toggle("is-open", isElement);
  elementLegend.setAttribute("aria-hidden", isElement ? "false" : "true");
  elementLegend.inert = !isElement;
}

function getElementBySymbol(symbol) {
  return periodicTableService.findBySymbol(symbol);
}

async function updateElementInfoPanel() {
  if (!detailPanel || !detailTitle || !detailBody) {
    return;
  }
  const scenePath = currentLevel?.id ?? "";
  const sceneId = currentLevel?.sceneId ?? "";
  const symbolFromPath = scenePath.includes("/elements/")
    ? scenePath.split("/").pop()?.replace(".json", "")
    : null;
  const symbol = (sceneId || symbolFromPath || "").trim();
  const isElement =
    scenePath.includes("/elements/") || /^[a-z]{1,3}$/i.test(symbol);

  if (!isElement) {
    if (elementInfoPinned) {
      detailPanel.classList.remove("is-open");
      detailPanel.setAttribute("aria-hidden", "true");
      detailPanel.inert = true;
      elementInfoPinned = false;
    }
    return;
  }

  const data = await ensurePeriodicTable();
  if (!data?.elements) {
    return;
  }
  const el = getElementBySymbol(symbol);
  if (!el) {
    return;
  }

  detailPanel.classList.add("is-open");
  detailPanel.setAttribute("aria-hidden", "false");
  detailPanel.inert = false;
  elementInfoPinned = true;

  detailTitle.textContent = `${el.name} (${el.symbol})`;
  const protons = el.number ?? 0;
  const neutrons = Math.max(0, Math.round(el.atomic_mass ?? 0) - protons);
  const electrons = protons;
  const orbitals =
    typeof el.electron_configuration_semantic === "string"
      ? el.electron_configuration_semantic.split(/\s+/).filter(Boolean)
      : [];

  const fields = [
    ["Atomic #", el.number],
    ["Category", el.category],
    ["Phase", el.phase],
    ["Atomic mass", el.atomic_mass ? `${el.atomic_mass}` : null],
    ["Electron config", el.electron_configuration_semantic],
    ["Melting point", el.melt],
    ["Boiling point", el.boil],
    ["Density", el.density],
    ["Shells", Array.isArray(el.shells) ? el.shells.join(", ") : el.shells],
    ["Protons", protons],
    ["Neutrons", neutrons],
    ["Electrons", electrons],
  ];

  detailBody.innerHTML = "";
  fields.forEach(([label, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }
    const row = document.createElement("div");
    row.className = "detail-row";
    const key = document.createElement("div");
    key.className = "detail-key";
    key.textContent = label;
    const val = document.createElement("div");
    val.className = "detail-value";
    val.textContent = String(value);
    row.appendChild(key);
    row.appendChild(val);
    detailBody.appendChild(row);
  });

  if (orbitals.length) {
    const row = document.createElement("div");
    row.className = "detail-row detail-row-full";
    const key = document.createElement("div");
    key.className = "detail-key";
    key.textContent = "Orbitals (inner \u2192 outer)";
    const val = document.createElement("div");
    val.className = "detail-value";
    val.style.width = "100%";
    const list = document.createElement("div");
    list.style.display = "flex";
    list.style.flexWrap = "wrap";
    list.style.gap = "6px";
    list.style.marginTop = "8px";
    list.style.justifyContent = "flex-start";
    orbitals.forEach((orb) => {
      const chip = document.createElement("span");
      chip.textContent = orb;
      chip.style.padding = "2px 6px";
      chip.style.borderRadius = "8px";
      chip.style.background = "rgba(255,255,255,0.08)";
      chip.style.border = "1px solid rgba(160, 170, 220, 0.25)";
      list.appendChild(chip);
    });
    val.appendChild(list);
    row.appendChild(key);
    row.appendChild(val);
    detailBody.appendChild(row);
  }
}
function wireElementLegend() {
  if (!elementLegendItems.length) {
    return;
  }
  elementLegendItems.forEach((btn) => {
    const scenePath = btn.getAttribute("data-scene");
    if (!scenePath) {
      return;
    }
    btn.addEventListener("click", () => {
      if (transitionState.active) {
        return;
      }
      if (currentLevel) {
        searchBackStack.push({
          levelId: currentLevel.id,
          navigationStack: navigationStack.map((entry) => ({
            levelId: entry.levelId,
            focusNodeId: entry.focusNodeId,
          })),
        });
        updateNavButton();
      }
      jumpToScene(scenePath, { mode: "jump" });
    });
  });
}


function updateDocButton() {
  if (!docButton) {
    return;
  }
  const hasDoc = !!currentLevel?.markdownPath;
  docButton.classList.toggle("is-hidden", !hasDoc);
  docButton.disabled = transitionState.active || !hasDoc;
}

function updateMetaButton() {
  const button = document.getElementById("meta-button");
  if (!button) {
    return;
  }
  const isMeta = currentLevel?.id === metaScenePath;
  button.classList.toggle("is-active", isMeta);
  button.setAttribute("aria-pressed", String(isMeta));
}

function setComposerPanel(panelId) {
  if (!composerOverlay) {
    return;
  }
  const targetId = panelId || "tree";
  const hasPanel = composerPanels.some(
    (panel) => panel.dataset.panel === targetId
  );
  const nextPanel = hasPanel ? targetId : "tree";
  composerActivePanel = nextPanel;
  composerTabs.forEach((tab) => {
    const isActive = tab.dataset.panel === nextPanel;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });
  composerPanels.forEach((panel) => {
    const isActive = panel.dataset.panel === nextPanel;
    panel.classList.toggle("is-active", isActive);
    panel.setAttribute("aria-hidden", String(!isActive));
  });
  if (nextPanel === "path") {
    composerNeedsResize = true;
  }
  if (nextPanel === "export") {
    renderComposerJsonPreview();
  }
}

function updateComposerOverlay() {
  if (!composerOverlay) {
    return;
  }
  const isComposer =
    currentLevel?.sceneId === composerSceneId ||
    currentLevel?.sceneId === composerPreviewSceneId;
  composerOverlay.classList.toggle("is-open", !!isComposer);
  composerOverlay.setAttribute("aria-hidden", isComposer ? "false" : "true");
  composerOverlay.inert = !isComposer;
  if (app) {
    app.classList.toggle("composer-mode", !!isComposer);
  }
  if (isComposer) {
    initComposerCanvas();
    composerNeedsResize = true;
    setComposerPanel(composerActivePanel);
    renderComposerJsonPreview();
  } else {
    stopComposerCameraFlightPreview();
  }
}

function openComposerDocs() {
  if (transitionState.active) {
    return;
  }
  showMarkdownPanel({
    name: "Arch API",
    markdownPath: composerDocsPath,
    markdownColumns: 2,
  });
}

function openComposerPreview() {
  if (transitionState.active) {
    return;
  }
  const state = readComposerFormState();
  const config = buildComposerSceneConfig(state);
  levelConfigs[composerPreviewScenePath] = config;
  levels.delete(composerPreviewScenePath);
  composerActivePanel = "preview";
  setComposerPanel("preview");
  setComposerStatus(`Previewing "${state.name}". Use Back to return.`);
  jumpToScene(composerPreviewScenePath, { mode: "jump", startScale: 0.6, duration: 700 });
}

function exportComposerScene() {
  const state = readComposerFormState();
  const spec = buildComposerSceneSpec(state);
  const json = JSON.stringify(spec, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${state.id || "composer_scene"}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  setComposerStatus(`Exported ${state.id}.json`);
  renderComposerJsonPreview();
}

function updateMarkdownDocButton() {
  if (!markdownDocButton) {
    return;
  }
  const hasDoc = !!currentLevel?.markdownPath;
  markdownDocButton.classList.toggle("is-hidden", !hasDoc);
  markdownDocButton.disabled = !hasDoc;
}

function updateSceneLabel() {
  if (!sceneLabel) {
    return;
  }
  sceneLabel.textContent = currentLevel?.name ?? "";
  updateDocButton();
  updateMetaButton();
  updateMarkdownDocButton();
  updateComposerOverlay();
  updatePeriodicOverlay();
  updateElementLegend();
  updateElementInfoPanel();
}

function openMetaRing() {
  if (transitionState.active) {
    return;
  }
  if (currentLevel?.id === metaScenePath) {
    const backState = metaBackStack.pop();
    if (backState?.levelId) {
      jumpToScene(backState.levelId, {
        restoreNavStack: backState.navigationStack,
      });
    } else {
      resetToRootScene();
    }
    return;
  }
  if (currentLevel) {
    metaBackStack.push({
      levelId: currentLevel.id,
      navigationStack: navigationStack.map((entry) => ({
        levelId: entry.levelId,
        focusNodeId: entry.focusNodeId,
      })),
    });
  }
  jumpToScene(metaScenePath, { mode: "jump", startScale: 0.7, duration: 760 });
}


async function ensureSceneIndex() {
  await sceneIndexService.ensure(fetch, "content/scenes/scenes_index.json");
}

function setSearchOpen(isOpen) {
  if (!sceneSearchPanel) {
    return;
  }
  if (!isOpen && sceneSearchPanel.contains(document.activeElement)) {
    sceneSearchToggle?.focus();
  }
  sceneSearch?.classList.toggle("is-open", isOpen);
  sceneSearchPanel.classList.toggle("is-open", isOpen);
  sceneSearchPanel.setAttribute("aria-hidden", String(!isOpen));
  sceneSearchPanel.inert = !isOpen;
  if (isOpen && sceneSearchInput) {
    sceneSearchInput.value = "";
    updateSearchResults("");
    sceneSearchInput.focus();
  }
}

function isSearchOpen() {
  return sceneSearchPanel?.classList.contains("is-open");
}

function isSearchEventTarget(target) {
  return (
    sceneSearchPanel?.contains(target) || sceneSearchToggle?.contains(target)
  );
}

function normalizeSearch(text) {
  return text.trim().toLowerCase();
}

function updateSearchResults(query) {
  if (!sceneSearchResults) {
    return;
  }
  const normalized = normalizeSearch(query);
  const matches = sceneIndexService.getScenes().filter((scene) => {
    if (!normalized) {
      return true;
    }
    const name = (scene.name || "").toLowerCase();
    const id = (scene.id || "").toLowerCase();
    return name.includes(normalized) || id.includes(normalized);
  });

  sceneSearchResults.innerHTML = "";
  matches.slice(0, 10).forEach((scene) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "scene-search-item";
    item.textContent = scene.name ?? scene.id ?? scene.path;
    item.addEventListener("click", () => {
      if (currentLevel) {
        searchBackStack.push({
          levelId: currentLevel.id,
          navigationStack: navigationStack.map((entry) => ({
            levelId: entry.levelId,
            focusNodeId: entry.focusNodeId,
          })),
        });
      }
      setSearchOpen(false);
      jumpToScene(scene.path, { mode: "jump" });
    });
    sceneSearchResults.appendChild(item);
  });
}

function focusOnPointer(clientX, clientY) {
  if (!currentLevel || transitionState.active) {
    return false;
  }
  const nextGenInfo = getNextGenerationInfo(currentLevel);
  if (nextGenInfo && currentLevel.ringTargets?.length) {
    const rect = canvas.getBoundingClientRect();
    pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointerNdc, camera);
    const pulsingTargets = currentLevel.ringTargets.filter(
      (target) => target.bandName === getPulsingBandName(target.node)
    );
    if (pulsingTargets.length) {
      const intersections = raycaster.intersectObjects(
        pulsingTargets.map((target) => target.mesh),
        false
      );
      if (intersections.length) {
        closeDetailPanel();
        hideHoverTooltip();
        jumpToScene(nextGenInfo.nextScene, { mode: "jump" });
        return true;
      }
    }
  }
  const rect = canvas.getBoundingClientRect();
  pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointerNdc, camera);
  const intersections = raycaster.intersectObjects(
    currentLevel.nodes.map((node) => node.mesh),
    false
  );
  if (!intersections.length) {
    return false;
  }
  const hit = intersections[0].object;
  const targetNode = currentLevel.nodes.find((node) => node.mesh === hit);
  if (!targetNode) {
    return false;
  }

  if (currentLevel?.sceneId === composerSceneId) {
    const panelId = composerPanelMap.get(targetNode.data.id ?? "");
    if (panelId) {
      closeDetailPanel();
      hideHoverTooltip();
      setComposerPanel(panelId);
      return true;
    }
  }

  if (targetNode.data.children || targetNode.data.childScene) {
    closeDetailPanel();
    hideHoverTooltip();
    startLevelTransitionFromNode(targetNode);
  } else if (targetNode.data.markdownPath) {
    closeDetailPanel();
    hideHoverTooltip();
    const readerSceneId = ensureMarkdownReaderScene(targetNode.data);
    if (readerSceneId) {
      targetNode.data.childScene = readerSceneId;
      startLevelTransitionFromNode(targetNode);
    }
  } else {
    return true;
  }
  return true;
}

function updateDetailHover(clientX, clientY) {
  if (!currentLevel || transitionState.active) {
    return;
  }
  if (!detailPanel) {
    return;
  }
  const rect = canvas.getBoundingClientRect();
  pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointerNdc, camera);
  const intersections = raycaster.intersectObjects(
    currentLevel.nodes.map((node) => node.mesh),
    false
  );
  if (!intersections.length) {
    return;
  }
  const hit = intersections[0].object;
  const targetNode = currentLevel.nodes.find((node) => node.mesh === hit);
  if (!targetNode || !targetNode.data.details) {
    return;
  }
  const nextId = targetNode.data.id ?? targetNode.data.name;
  if (nextId && nextId === hoveredDetailNodeId) {
    return;
  }
  setDetailPanel(targetNode);
}

function updateDecayHover(clientX, clientY) {
  if (!currentLevel || transitionState.active) {
    return;
  }
  const nextGenInfo = getNextGenerationInfo(currentLevel);
  if (!nextGenInfo) {
    hideHoverTooltip();
    return;
  }
  const pulsingBandName = getPulsingBandName(currentLevel.primaryBinaryNode);
  if (!pulsingBandName || !currentLevel.ringTargets?.length) {
    hideHoverTooltip();
    return;
  }
  const rect = canvas.getBoundingClientRect();
  pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointerNdc, camera);
  const pulsingTargets = currentLevel.ringTargets.filter(
    (target) => target.bandName === pulsingBandName
  );
  if (!pulsingTargets.length) {
    hideHoverTooltip();
    return;
  }
  const intersections = raycaster.intersectObjects(
    pulsingTargets.map((target) => target.mesh),
    false
  );
  if (!intersections.length) {
    hideHoverTooltip();
    return;
  }
  const label = `Decay to Gen ${nextGenInfo.nextGen} ${nextGenInfo.nextLabel}`;
  showHoverTooltip(label, clientX, clientY);
}

const activePointers = new Map();
const panState = {
  active: false,
  moved: false,
  startX: 0,
  startY: 0,
  startWorldX: 0,
  startWorldY: 0,
};

let pinchStartDistance = 0;
let pinchStartZoom = 1;

let lastTapTime = 0;
let lastTapX = 0;
let lastTapY = 0;

function getWorldPerPixel() {
  const worldHeight = (camera.top - camera.bottom) / camera.zoom;
  return worldHeight / canvas.clientHeight;
}

function getPinchDistance() {
  const pointers = Array.from(activePointers.values());
  if (pointers.length < 2) {
    return 0;
  }
  const dx = pointers[0].x - pointers[1].x;
  const dy = pointers[0].y - pointers[1].y;
  return Math.hypot(dx, dy);
}

function onPointerDown(event) {
  if (transitionState.active) {
    return;
  }
  canvas.setPointerCapture(event.pointerId);
  activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

  if (activePointers.size === 1) {
    panState.active = true;
    panState.moved = false;
    panState.startX = event.clientX;
    panState.startY = event.clientY;
    panState.startWorldX = worldGroup.position.x;
    panState.startWorldY = worldGroup.position.y;
  }

  if (activePointers.size === 2) {
    panState.active = false;
    zoomState.active = false;
    pinchStartDistance = getPinchDistance();
    pinchStartZoom = camera.zoom;
  }
}

function onPointerMove(event) {
  if (transitionState.active) {
    return;
  }

  if (activePointers.has(event.pointerId)) {
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  }

  if (activePointers.size === 1 && panState.active) {
    const dx = event.clientX - panState.startX;
    const dy = event.clientY - panState.startY;
    const worldPerPixel = getWorldPerPixel();
    worldGroup.position.x = panState.startWorldX + dx * worldPerPixel;
    worldGroup.position.y = panState.startWorldY - dy * worldPerPixel;
    if (Math.hypot(dx, dy) > 6) {
      panState.moved = true;
    }
  }

  if (activePointers.size === 2) {
    const distance = getPinchDistance();
    if (pinchStartDistance > 0) {
      const zoom = pinchStartZoom * (distance / pinchStartDistance);
      applyZoom(zoom);
      lastZoomGestureTime = performance.now();
    }
  }

  if (event.buttons === 0 && activePointers.size === 0 && !panState.active) {
    updateDetailHover(event.clientX, event.clientY);
    updateDecayHover(event.clientX, event.clientY);
  }
}

function onPointerUp(event) {
  if (activePointers.has(event.pointerId)) {
    activePointers.delete(event.pointerId);
  }

  if (activePointers.size < 2) {
    pinchStartDistance = 0;
  }

  if (activePointers.size === 0) {
    panState.active = false;
    if (!panState.moved && !transitionState.active) {
      if (!focusOnPointer(event.clientX, event.clientY)) {
        const now = performance.now();
        const dx = event.clientX - lastTapX;
        const dy = event.clientY - lastTapY;
        const distance = Math.hypot(dx, dy);
        if (now - lastTapTime < 320 && distance < 24) {
          if (currentLevel && currentLevel.id !== rootScenePath) {
            resetToRootScene();
          }
          lastTapTime = 0;
        } else {
          lastTapTime = now;
          lastTapX = event.clientX;
          lastTapY = event.clientY;
        }
      } else {
        lastTapTime = 0;
      }
    }
  }
}

function onWheel(event) {
  if (!event.ctrlKey || transitionState.active) {
    return;
  }
  event.preventDefault();
  zoomState.active = false;

  const zoomFactor = Math.exp(-event.deltaY * 0.0025);
  applyZoom(camera.zoom * zoomFactor);
  lastZoomGestureTime = performance.now();
}

function animate(now = 0) {
  requestAnimationFrame(animate);

  if (zoomState.active && !transitionState.active) {
    const elapsed = performance.now() - zoomState.startTime;
    const t = Math.min(1, elapsed / zoomState.duration);
    const eased = easeInOutCubic(t);
    const nextZoom =
      zoomState.startZoom +
      (zoomState.targetZoom - zoomState.startZoom) * eased;
    applyZoom(nextZoom);
    if (t >= 1) {
      zoomState.active = false;
    }
  }

  if (panTween.active && !transitionState.active) {
    const elapsed = performance.now() - panTween.startTime;
    const t = Math.min(1, elapsed / panTween.duration);
    const eased = easeInOutCubic(t);
    worldGroup.position.lerpVectors(panTween.start, panTween.target, eased);
    if (t >= 1) {
      panTween.active = false;
    }
  }

  updateTransition(now);

  if (labelFadeState.active && labelFadeState.level) {
    const elapsed = now - labelFadeState.startTime;
    const t = Math.min(1, elapsed / labelFadeState.duration);
    const fade = smoothstep(0, 1, t);
    setLevelLabelOpacity(labelFadeState.level, fade);
    if (t >= 1) {
      labelFadeState.active = false;
    }
  }
  maybeAutoWarp(now);
  updateNavButton();

  const timeSeconds = now / 1000;
  if (transitionState.active) {
    updateLevelHalo(transitionState.fromLevel, timeSeconds);
    updateLevelHalo(transitionState.toLevel, timeSeconds);
    updateBinaryRingPulse(transitionState.fromLevel, timeSeconds);
    updateBinaryRingPulse(transitionState.toLevel, timeSeconds);
  } else {
    updateLevelHalo(currentLevel, timeSeconds);
    updateBinaryRingPulse(currentLevel, timeSeconds);
  }

  if (currentLevel) {
    updateLevelMotions(currentLevel, now / 1000);
  }
  if (transitionState.active) {
    updateLevelLinks(transitionState.fromLevel);
    updateLevelLinks(transitionState.toLevel);
    updateLevelLabelWrap(transitionState.fromLevel);
    updateLevelLabelWrap(transitionState.toLevel);
    updateGlowRingOrientation(transitionState.fromLevel);
    updateGlowRingOrientation(transitionState.toLevel);
  } else {
    updateLevelLinks(currentLevel);
    updateLevelLabelWrap(currentLevel);
    updateGlowRingOrientation(currentLevel);
  }

  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  renderComposerCanvas();
}

function onResize() {
  updateCamera();
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  if (composerRenderer) {
    composerNeedsResize = true;
  }
  if (currentLevel?.id === rootScenePath) {
    layoutRootLevel(currentLevel);
    fitCameraToLevel(currentLevel);
  }
}

async function init() {
  closeDetailPanel();
  const universeConfig = await loadSceneConfig(rootScenePath);
  if (!universeConfig) {
    return;
  }
  currentLevel = buildLevel(rootScenePath);
  worldGroup.add(currentLevel.group);
  layoutRootLevel(currentLevel);
  updateCamera();
  fitCameraToLevel(currentLevel);
  updateSceneLabel();
  updateSceneMarkdown();
  animate();
}

if (typeof window !== "undefined") {
  window.openMetaRing = openMetaRing;
}

appDirector = new AppDirector({
  initialize: init,
  jumpToScene,
  resetToRootScene,
  startLevelTransitionOut,
  getTransitionState: () => transitionState,
  getNavigationStack: () => navigationStack,
  getSearchBackStack: () => searchBackStack,
  getMetaBackStack: () => metaBackStack,
});

appDirector.init();

window.addEventListener("resize", onResize);
canvas.addEventListener("pointerdown", onPointerDown);
canvas.addEventListener("pointermove", onPointerMove);
canvas.addEventListener("pointerup", onPointerUp);
canvas.addEventListener("pointercancel", onPointerUp);
canvas.addEventListener("pointerleave", () => {
  hideHoverTooltip();
});
canvas.addEventListener("wheel", onWheel, { passive: false });

if (navUpButton) {
  navUpButton.addEventListener("click", async () => {
    await appDirector?.goBack();
  });
}

if (homeButton) {
  homeButton.addEventListener("click", async () => {
    await appDirector?.resetHome();
  });
}

wireElementLegend();
updateElementInfoPanel();

if (docButton) {
  docButton.addEventListener("click", () => {
    if (transitionState.active) {
      return;
    }
    if (currentLevel?.markdownPath) {
      const docLevel = currentLevel.markdownSection
        ? { ...currentLevel, markdownSection: null }
        : currentLevel;
      showMarkdownPanel(docLevel);
    }
  });
}

if (hud) {
  hud.addEventListener("click", () => {
    toggleInfoDrawer();
  });
  hud.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleInfoDrawer();
    } else if (event.key === "Escape" && markdownRuntime.isInfoDrawerOpen()) {
      setInfoDrawer(false);
    }
  });
}

if (detailClose) {
  detailClose.addEventListener("click", () => {
    closeDetailPanel();
  });
}

if (markdownClose) {
  markdownClose.addEventListener("click", () => {
    hideMarkdownPanel();
  });
}

if (markdownDocButton) {
  markdownDocButton.addEventListener("click", () => {
    if (transitionState.active) {
      return;
    }
    if (currentLevel?.markdownPath) {
      const docLevel = currentLevel.markdownSection
        ? { ...currentLevel, markdownSection: null }
        : currentLevel;
      showMarkdownPanel(docLevel);
    }
  });
}

if (markdownLayoutToggle) {
  markdownLayoutToggle.addEventListener("click", () => {
    markdownRuntime.toggleMarkdownLayout();
  });
}

if (composerTabs.length) {
  composerTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setComposerPanel(tab.dataset.panel);
    });
  });
}

if (composerDocsButton) {
  composerDocsButton.addEventListener("click", () => {
    openComposerDocs();
  });
}

if (composerExitButton) {
  composerExitButton.addEventListener("click", () => {
    navUpButton?.click();
  });
}

if (composerPreviewButton) {
  composerPreviewButton.addEventListener("click", () => {
    openComposerPreview();
  });
}

if (composerExportButton) {
  composerExportButton.addEventListener("click", () => {
    exportComposerScene();
  });
}

const composerInputs = [
  composerSceneIdInput,
  composerSceneNameInput,
  composerNodeCountInput,
  composerNodeLabelsInput,
].filter(Boolean);
if (composerInputs.length) {
  composerInputs.forEach((input) => {
    input.addEventListener("input", () => {
      renderComposerJsonPreview();
    });
  });
}

if (composerPathModeSelect) {
  composerPathModeSelect.addEventListener("change", () => {
    composerPathState.interpolate = composerPathModeSelect.value;
    updateComposerPathGeometry();
    renderComposerJsonPreview();
  });
}

if (composerPathResetButton) {
  composerPathResetButton.addEventListener("click", () => {
    resetComposerPathPoints();
    renderComposerJsonPreview();
  });
}

if (composerFrameEditToggle) {
  composerFrameEditToggle.addEventListener("click", () => {
    composerFrameEditMode = !composerFrameEditMode;
    composerFrameEditToggle.classList.toggle("is-active", composerFrameEditMode);
    composerFrameEditToggle.textContent = composerFrameEditMode
      ? "Editing Frame"
      : "Edit Frame";
  });
}

if (composerFrameResetButton) {
  composerFrameResetButton.addEventListener("click", () => {
    setComposerFrameDefaults();
    updateComposerFrame();
  });
}

if (composerCameraPoiSelect) {
  composerCameraPoiSelect.addEventListener("change", () => {
    composerCameraFlightState.poiMode = composerCameraPoiSelect.value;
  });
}

if (composerCameraWaypointAdd) {
  composerCameraWaypointAdd.addEventListener("click", () => {
    addComposerCameraWaypoint();
  });
}

if (composerCameraWaypointClear) {
  composerCameraWaypointClear.addEventListener("click", () => {
    clearComposerCameraWaypoints();
  });
}

if (composerCameraFlightToggle) {
  composerCameraFlightToggle.addEventListener("click", () => {
    if (composerCameraFlightState.preview) {
      stopComposerCameraFlightPreview();
    } else {
      startComposerCameraFlightPreview();
    }
  });
}

const composerFrameInputs = [
  composerFrameScaleInput,
].filter(Boolean);
if (composerFrameInputs.length) {
  composerFrameInputs.forEach((input) => {
    input.addEventListener("input", () => {
      applyComposerFrameScaleInput();
    });
  });
}

const composerCameraInputs = [
  composerCameraSpeedInput,
  composerCameraRadiusInput,
].filter(Boolean);
if (composerCameraInputs.length) {
  composerCameraInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input === composerCameraSpeedInput) {
        applyComposerCameraSpeedInput();
      }
      if (input === composerCameraRadiusInput) {
        applyComposerCameraRadiusInput();
      }
    });
  });
}

if (composerCameraResetButton) {
  composerCameraResetButton.addEventListener("click", () => {
    setComposerCameraDefaults();
    updateComposerCamera();
  });
}

if (sceneSearchToggle) {
  sceneSearchToggle.addEventListener("click", async () => {
    if (!isSearchOpen()) {
      await ensureSceneIndex();
    }
    setSearchOpen(!isSearchOpen());
  });
}

if (sceneSearchInput) {
  sceneSearchInput.addEventListener("input", (event) => {
    updateSearchResults(event.target.value);
  });
  sceneSearchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setSearchOpen(false);
      return;
    }
    if (event.key === "Enter") {
      const firstItem = sceneSearchResults?.querySelector(
        ".scene-search-item"
      );
      if (firstItem) {
        firstItem.click();
      }
    }
  });
}

document.addEventListener("pointerdown", (event) => {
  if (!isSearchOpen()) {
    return;
  }
  if (isSearchEventTarget(event.target)) {
    return;
  }
  setSearchOpen(false);
});

document.addEventListener("focusin", (event) => {
  if (!isSearchOpen()) {
    return;
  }
  if (isSearchEventTarget(event.target)) {
    return;
  }
  setSearchOpen(false);
});

window.addEventListener("keydown", async (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (!isSearchOpen()) {
      await ensureSceneIndex();
      setSearchOpen(true);
    } else {
      setSearchOpen(false);
    }
  } else if (event.key === "Escape" && isSearchOpen()) {
    setSearchOpen(false);
  }
});
