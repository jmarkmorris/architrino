import * as THREE from "./vendor/three/three.module.js";
import { CSS2DRenderer, CSS2DObject } from "./vendor/three/CSS2DRenderer.js";
import { AppDirector } from "./src/director/AppDirector.js";
import { createLevelRuntime } from "./src/runtime/LevelRuntime.js";
import { createMarkdownRuntime } from "./src/runtime/MarkdownRuntime.js";
import { createNodeFactory } from "./src/runtime/NodeFactoryRuntime.js";
import { createComposerUiRuntime } from "./src/runtime/ComposerUiRuntime.js";
import { createComposerControlsUiRuntime } from "./src/runtime/ComposerControlsUiRuntime.js";
import { createInteractionRuntime } from "./src/runtime/InteractionRuntime.js";
import { createPeriodicOverlayRuntime } from "./src/runtime/PeriodicOverlayRuntime.js";
import { createSceneSearchRuntime } from "./src/runtime/SceneSearchRuntime.js";
import { createSceneSearchUiRuntime } from "./src/runtime/SceneSearchUiRuntime.js";
import { createScenePanelUiRuntime } from "./src/runtime/ScenePanelUiRuntime.js";
import { createAppShellUiRuntime } from "./src/runtime/AppShellUiRuntime.js";
import { wireComposerCanvasUiListeners } from "./src/runtime/ComposerCanvasUiRuntime.js";
import { createSceneGraphRuntime } from "./src/runtime/SceneGraphRuntime.js";
import { createTransitionEngine } from "./src/runtime/TransitionEngine.js";
import { SceneRepository } from "./src/services/SceneRepository.js";
import { SceneIndexService } from "./src/services/SceneIndexService.js";
import { PeriodicTableService } from "./src/services/PeriodicTableService.js";
import {
  compactMarkdownNodeLabel,
  createMarkdownDocumentTitleResolver,
  extractMarkdownDocumentTitle,
  stripWalkthroughStepPrefix,
  titleFromSlug,
} from "./src/services/MarkdownNamingService.js";
import {
  deriveMarkdownConfig,
  extractMarkdownSection,
  normalizeMarkdownKey,
  normalizeMarkdownPath,
  parseMarkdownHeading,
} from "./src/services/MarkdownPolicyService.js";
import { createMarkdownManifestService } from "./src/services/MarkdownManifestService.js";
import { createMarkdownSceneRegistry } from "./src/services/MarkdownSceneRegistryService.js";
import { createMarkdownNodeBuilder } from "./src/services/MarkdownNodeBuilder.js";
import { createSceneGraphManifestService } from "./src/services/SceneGraphManifestService.js";
import { createSceneStateHashService } from "./src/services/SceneStateHashService.js";
import { createMarkdownSectionTitleResolver } from "./src/services/MarkdownSectionTitleService.js";
import { createSceneBootstrapService } from "./src/services/SceneBootstrapService.js";
import { createSceneSearchCoordinatorService } from "./src/services/SceneSearchCoordinatorService.js";

const app = document.getElementById("app");
const canvas = document.getElementById("viz");
const navUpButton = document.getElementById("nav-up");
const sceneLabel = document.getElementById("scene-label");
const sceneFocusSphere = document.getElementById("scene-focus-sphere");
const sceneSearch = document.getElementById("scene-search");
const sceneSearchToggle = document.getElementById("scene-search-toggle");
const sceneSearchPanel = document.getElementById("scene-search-panel");
const sceneSearchInput = document.getElementById("scene-search-input");
const sceneSearchResults = document.getElementById("scene-search-results");
const hoverTooltip = document.getElementById("hover-tooltip");
const zoomToast = document.getElementById("zoom-toast");
const detailPanel = document.getElementById("detail-panel");
const detailTitle = document.getElementById("detail-title");
const detailBody = document.getElementById("detail-body");
const detailClose = document.getElementById("detail-close");
const homeButton = document.getElementById("home-button");
const docButton = document.getElementById("doc-button");
const elementLegend = document.getElementById("element-legend");
const elementLegendItems = elementLegend
  ? Array.from(elementLegend.querySelectorAll(".legend-pill"))
  : [];
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
const elementNavOverlay = document.getElementById("element-nav-overlay");
const elementNavMini = document.getElementById("element-nav-mini");
const elementNavUpButton = document.getElementById("element-nav-up");
const elementNavDownButton = document.getElementById("element-nav-down");
const elementNavLeftButton = document.getElementById("element-nav-left");
const elementNavRightButton = document.getElementById("element-nav-right");
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
const defaultRootLayoutMarginPx = { x: 160, y: 140 };
const zoomToastDismissedKey = "architrino.zoomToastDismissed";
let zoomToastTimeoutId = null;
const periodicTableDataPath = "content/scenes/chemistry/periodic_table.json";
const elementScenePathPattern = /content\/scenes\/elements\/([a-z0-9]+)\.json$/i;
const elementNavDirectionByKey = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};
const elementNavButtons = {
  up: elementNavUpButton,
  down: elementNavDownButton,
  left: elementNavLeftButton,
  right: elementNavRightButton,
};
const elementNavigationState = {
  ready: false,
  loadingPromise: null,
  navigationInFlight: false,
  elementBySymbol: new Map(),
  symbolByCoordinate: new Map(),
  rowColumnsByY: new Map(),
  columnRowsByX: new Map(),
  scenePathBySymbol: new Map(),
  miniCellBySymbol: new Map(),
  miniHudBuilt: false,
  updateToken: 0,
};

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
const autoMarkdownPalettes = {
  legacy: [
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
  ],
  spectrum19: [
    "#7a1c1c",
    "#8c2a1a",
    "#9f3a18",
    "#b45309",
    "#c26a0a",
    "#d97706",
    "#a88c00",
    "#8f9a0a",
    "#5f8f1a",
    "#2f7a1f",
    "#1f8a3d",
    "#0f766e",
    "#0e7490",
    "#1d4ed8",
    "#1e40af",
    "#3730a3",
    "#5b21b6",
    "#6d28d9",
    "#7e22ce",
  ],
  jewel: [
    "#5a0f1f",
    "#6e0f2a",
    "#7f1233",
    "#9d174d",
    "#831843",
    "#a21caf",
    "#7e22ce",
    "#6d28d9",
    "#4c1d95",
    "#3730a3",
    "#1e40af",
    "#1d4ed8",
    "#0f3a8a",
    "#064e3b",
    "#065f46",
    "#166534",
  ],
};
const defaultAutoMarkdownPaletteName = "legacy";
const defaultSphereColorSchemeName = "jewel";
const defaultAutoMarkdownPalette =
  autoMarkdownPalettes[defaultAutoMarkdownPaletteName] ?? autoMarkdownPalettes.legacy;
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
    layoutMode: "rings",
    nodes,
    links: [],
    sceneName: `${state.name} (Preview)`,
    sceneId: composerPreviewSceneId,
    markdownPath: null,
    markdownSection: null,
    markdownColumns: null,
    markdownAutoOpen: false,
    centerOn: null,
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

  wireComposerCanvasUiListeners({
    composerCanvas,
    onComposerPointerDown,
    onComposerPointerMove,
    onComposerPointerUp,
    onComposerWheel,
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
const markdownTitleCache = new Map();
const markdownFileSizeCache = new Map();
const markdownFileCharacterCountCache = new Map();
const markdownRenderer =
  typeof window !== "undefined" && window.markdownit
    ? window.markdownit({ html: false, linkify: true, breaks: false })
    : null;
if (markdownRenderer) {
  markdownRenderer.disable("escape");
}
const markdownManifestPath = "content/markdown/markdown_index.json";
const sceneGraphManifestPath = "content/graph/scene_graph.json";
const rootScenePath = "content/scenes/architrino_assembly_architecture.json";
const metaScenePath = "content/scenes/meta/meta.json";
const composerSceneId = "composer";
const composerPreviewSceneId = "composer_preview";
const composerPreviewScenePath = "__composer_preview__";
const composerDocsPath =
  "content/markdown/aaa/assemblies/composer.md";
const markdownDocBadgeCharacterThreshold = 128;
const markdownGlowByteThreshold = 2048;
const cacheBustToken = Date.now().toString();
let appDirector = null;
const sceneIndexService = new SceneIndexService();
const periodicTableService = new PeriodicTableService();
const searchBackStack = [];
const metaBackStack = [];
const generationBackStack = [];
const resolveMarkdownDocumentTitle = createMarkdownDocumentTitleResolver({
  fetchImpl: (...args) => fetch(...args),
  appendCacheBust,
  normalizeMarkdownPath,
  cache: markdownTitleCache,
  logger: console,
});
const markdownManifestService = createMarkdownManifestService({
  fetchImpl: (...args) => fetch(...args),
  appendCacheBust,
  manifestPath: markdownManifestPath,
  logger: console,
});
const sceneGraphManifestService = createSceneGraphManifestService({
  fetchImpl: (...args) => fetch(...args),
  appendCacheBust,
  manifestPath: sceneGraphManifestPath,
  logger: console,
});
const resolveMarkdownSectionTitleByKey = createMarkdownSectionTitleResolver({
  fetchImpl: (...args) => fetch(...args),
  appendCacheBust,
  parseMarkdownHeading,
  normalizeMarkdownKey,
  logger: console,
});

const markdownSceneRegistry = createMarkdownSceneRegistry({
  levelConfigs,
  titleFromSlug,
  stripWalkthroughStepPrefix,
  normalizeMarkdownKey,
  resolveMarkdownDocumentTitle,
  resolveMarkdownSectionTitleByKey,
});

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

const levels = new Map();
const navigationStack = [];
let currentLevel = null;
const sceneStateHashService = createSceneStateHashService({
  rootScenePath,
  getNavigationStack: () => navigationStack,
});

const ringLayoutDefaults = {
  haloScale: 1.18,
  guardBandMin: 0.15,
  guardBandRatio: 0.08,
  startAngle: Math.PI / 2,
};
const standardRingMaxCount = 14;

function getRingStartAngle(count) {
  return ringLayoutDefaults.startAngle;
}

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

function getNodeBoundsRadius(node) {
  const baseRadius = Math.max(0, node?.data?.radius ?? 0);
  const hasHalo =
    node?.data?.glowRing ||
    node?.data?.childScene ||
    node?.data?.docDrillDownPreferred === true;
  if (!hasHalo) {
    return baseRadius;
  }
  return Math.max(baseRadius, baseRadius * ringLayoutDefaults.haloScale);
}

function solveRingFit(frameRadius, count) {
  const maxFrameRadius = Math.max(0, frameRadius);
  if (!Number.isFinite(maxFrameRadius) || maxFrameRadius <= 0) {
    return { haloRadius: 0, ringRadius: 0, nodeRadius: 0 };
  }
  if (count <= 1) {
    const haloRadius = maxFrameRadius;
    return {
      haloRadius,
      ringRadius: 0,
      nodeRadius: haloRadius / ringLayoutDefaults.haloScale,
    };
  }

  const sinHalfStep = Math.sin(Math.PI / count);
  if (!Number.isFinite(sinHalfStep) || sinHalfStep <= 0) {
    return { haloRadius: 0, ringRadius: 0, nodeRadius: 0 };
  }

  const requiredRingRadiusForHalo = (haloRadius) => {
    const haloDiameter = haloRadius * 2;
    const guardBand = Math.max(
      ringLayoutDefaults.guardBandMin,
      haloDiameter * ringLayoutDefaults.guardBandRatio
    );
    const requiredChord = haloDiameter + guardBand;
    return requiredChord / (2 * sinHalfStep);
  };

  let low = 0;
  let high = maxFrameRadius;
  for (let i = 0; i < 40; i += 1) {
    const mid = (low + high) * 0.5;
    const requiredRing = requiredRingRadiusForHalo(mid);
    const fitsFrame = requiredRing + mid <= maxFrameRadius;
    if (fitsFrame) {
      low = mid;
    } else {
      high = mid;
    }
  }

  const haloRadius = low;
  const ringRadius = Math.max(0, maxFrameRadius - haloRadius);
  return {
    haloRadius,
    ringRadius,
    nodeRadius: haloRadius / ringLayoutDefaults.haloScale,
  };
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
  if (Number.isFinite(maxRadius) && maxRadius > 0 && maxRadius < baseRadius) {
    baseRadius = maxRadius;
  }
  const positions = [];
  const startAngle = getRingStartAngle(count);
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2 + startAngle;
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
  shouldCenterLevelInFrame: (level) => {
    return isCenteredRingLevel(level);
  },
  centerLevelInFrame: (level) => {
    const center = getLevelFrameCenter(level);
    worldGroup.position.set(-center.x, -center.y, 0);
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

function hasDismissedZoomToast() {
  try {
    return window.localStorage.getItem(zoomToastDismissedKey) === "1";
  } catch (_error) {
    return false;
  }
}

function setZoomToastDismissed() {
  try {
    window.localStorage.setItem(zoomToastDismissedKey, "1");
  } catch (_error) {
    // Ignore storage failures.
  }
}

function hideZoomToast() {
  if (!zoomToast) {
    return;
  }
  zoomToast.classList.remove("is-visible");
  zoomToast.setAttribute("aria-hidden", "true");
  if (zoomToastTimeoutId) {
    window.clearTimeout(zoomToastTimeoutId);
    zoomToastTimeoutId = null;
  }
}

function dismissZoomToastPermanently() {
  setZoomToastDismissed();
  hideZoomToast();
}

function showZoomToastIfNeeded() {
  if (!zoomToast || hasDismissedZoomToast()) {
    return;
  }
  zoomToast.classList.add("is-visible");
  zoomToast.setAttribute("aria-hidden", "false");
  if (zoomToastTimeoutId) {
    window.clearTimeout(zoomToastTimeoutId);
  }
  zoomToastTimeoutId = window.setTimeout(() => {
    hideZoomToast();
  }, 5200);
}

const markdownRuntime = createMarkdownRuntime({
  markdownPanel,
  markdownTitle,
  markdownBody,
  markdownLayoutToggle,
  markdownRenderer,
  markdownCache,
  markdownSectionCache,
  extractMarkdownSection,
});

function updateSceneMarkdown() {
  if (!currentLevel || !currentLevel.markdownPath) {
    markdownRuntime.hideMarkdownPanel();
    return;
  }
  if (currentLevel.markdownAutoOpen === false) {
    markdownRuntime.hideMarkdownPanel();
    return;
  }
  markdownRuntime.showMarkdownPanel(currentLevel);
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
  markdownRuntime.hideMarkdownPanel();
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

async function resolveMarkdownFileSize(path) {
  if (!path) {
    return null;
  }
  const normalizedPath = String(path);
  if (markdownFileSizeCache.has(normalizedPath)) {
    return markdownFileSizeCache.get(normalizedPath);
  }

  const promise = fetch(appendCacheBust(normalizedPath))
    .then(async (response) => {
      if (!response.ok) {
        return null;
      }
      const blob = await response.blob();
      return Number.isFinite(blob.size) ? blob.size : null;
    })
    .catch((error) => {
      console.warn("Failed to resolve markdown byte size", normalizedPath, error);
      return null;
    });

  markdownFileSizeCache.set(normalizedPath, promise);
  return promise;
}

async function resolveMarkdownFileCharacterCount(path) {
  if (!path) {
    return null;
  }
  const normalizedPath = String(path);
  if (markdownFileCharacterCountCache.has(normalizedPath)) {
    return markdownFileCharacterCountCache.get(normalizedPath);
  }

  const promise = fetch(appendCacheBust(normalizedPath))
    .then(async (response) => {
      if (!response.ok) {
        return null;
      }
      const text = await response.text();
      return typeof text === "string" ? text.length : null;
    })
    .catch((error) => {
      console.warn("Failed to resolve markdown character count", normalizedPath, error);
      return null;
    });

  markdownFileCharacterCountCache.set(normalizedPath, promise);
  return promise;
}

const buildAutoMarkdownNodes = createMarkdownNodeBuilder({
  fetchImpl: (...args) => fetch(...args),
  appendCacheBust,
  parseMarkdownHeading,
  extractMarkdownSection,
  listMarkdownFilesInDir: (directory) => markdownManifestService.listFilesInDir(directory),
  listMarkdownDirectoriesInDir: (directory) =>
    markdownManifestService.listDirectoriesInDir(directory),
  normalizeMarkdownPath,
  titleFromSlug,
  stripWalkthroughStepPrefix,
  extractMarkdownDocumentTitle,
  compactMarkdownNodeLabel,
  colorTokens,
  autoMarkdownPalettes,
  defaultAutoMarkdownPaletteName,
  defaultAutoMarkdownPalette,
  computeRingLayout,
  maxRingNodeRadius,
  ringLayoutDefaults,
  ensureMarkdownSectionIndexScene: markdownSceneRegistry.ensureMarkdownSectionIndexScene,
  ensureMarkdownDirectoryScene: markdownSceneRegistry.ensureMarkdownDirectoryScene,
  logger: console,
});

const sceneRepository = new SceneRepository({
  fetchImpl: (...args) => fetch(...args),
  appendCacheBust,
  sceneConfigCache,
  sceneLoadPromises,
  levelConfigs,
  normalizeVelocity,
  colorTokens,
  autoMarkdownPalettes,
  defaultAutoMarkdownPaletteName,
  defaultSphereColorSchemeName,
  homeScenePath: rootScenePath,
  deriveMarkdownConfig,
  buildAutoMarkdownNodes,
  resolveMarkdownFileSize,
  resolveMarkdownFileCharacterCount,
  markdownDocBadgeMinChars: markdownDocBadgeCharacterThreshold,
  markdownGlowMinBytes: markdownGlowByteThreshold,
});
const sceneBootstrapService = createSceneBootstrapService({
  levelConfigs,
  sceneRepository,
  markdownSceneRegistry,
  rootScenePath,
});

async function resetToRootScene() {
  if (transitionState.active) {
    return;
  }
  const config = await sceneBootstrapService.loadSceneConfig(rootScenePath);
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
  generationBackStack.length = 0;
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
  const preservedWorldPosition = worldGroup.position.clone();
  const preservedLevelPosition = currentLevel
    ? currentLevel.group.position.clone()
    : new THREE.Vector3(0, 0, 0);
  const jumpWorldStart = options.preserveWorldPosition
    ? preservedWorldPosition.clone()
    : new THREE.Vector3(0, 0, 0);
  const jumpWorldTarget = options.targetWorldPosition
    ? new THREE.Vector3(
        Number(options.targetWorldPosition.x ?? 0),
        Number(options.targetWorldPosition.y ?? 0),
        Number(options.targetWorldPosition.z ?? 0)
      )
    : jumpWorldStart.clone();
  const config = await sceneBootstrapService.ensureSceneReady(scenePath);
  if (!config) {
    return;
  }
  if (options.mode === "instant") {
    purgeWorldState();
    worldGroup.position.copy(jumpWorldTarget);
    const level = buildLevel(scenePath);
    worldGroup.add(level.group);
    if (options.preserveLevelPosition) {
      level.group.position.copy(preservedLevelPosition);
    } else {
      level.group.position.set(0, 0, 0);
    }
    level.group.scale.setScalar(1);
    setLevelOpacity(level, 1);
    setLevelLabelOpacity(level, 0);
    setLevelLinkOpacity(level, 1);
    currentLevel = level;
    navigationStack.length = 0;
    if (!options.preserveGenerationBackStack) {
      generationBackStack.length = 0;
    }
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
  markdownRuntime.hideMarkdownPanel();
  purgeWorldState();
  worldGroup.position.copy(jumpWorldStart);
  if (currentLevel && !worldGroup.children.includes(currentLevel.group)) {
    worldGroup.add(currentLevel.group);
  }
  worldGroup.add(nextLevel.group);
  if (options.preserveLevelPosition) {
    nextLevel.group.position.copy(preservedLevelPosition);
  } else {
    nextLevel.group.position.set(0, 0, 0);
  }
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
    worldPanStart: jumpWorldStart.clone(),
    worldPanTarget: jumpWorldTarget.clone(),
  };
  transitionState.startTime = performance.now();
  transitionState.duration = options.duration ?? 700;

  navigationStack.length = 0;
  if (!options.preserveGenerationBackStack) {
    generationBackStack.length = 0;
  }
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

function applyZoom(value) {
  camera.zoom = clampZoom(value);
  camera.updateProjectionMatrix();
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

function getFocusSphereMetrics() {
  if (sceneFocusSphere) {
    const rect = sceneFocusSphere.getBoundingClientRect();
    const diameter = Math.min(rect.width, rect.height);
    if (Number.isFinite(diameter) && diameter > 0) {
      return {
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
        radius: diameter / 2,
      };
    }
  }

  const safeWidth = Math.max(2, window.innerWidth - defaultRootLayoutMarginPx.x * 2);
  const safeHeight = Math.max(2, window.innerHeight - defaultRootLayoutMarginPx.y * 2);
  const diameter = Math.min(safeWidth, safeHeight);
  return {
    centerX: window.innerWidth / 2,
    centerY: window.innerHeight / 2,
    radius: diameter / 2,
  };
}

function isPointerWithinInteractiveViewport(clientX, clientY, paddingPx = 0) {
  const { centerX, centerY, radius } = getFocusSphereMetrics();
  const effectiveRadius = Math.max(0, radius - paddingPx);
  const dx = clientX - centerX;
  const dy = clientY - centerY;
  return dx * dx + dy * dy <= effectiveRadius * effectiveRadius;
}

function getSafeViewportWorld() {
  const aspect = window.innerWidth / window.innerHeight;
  const viewWidth = baseViewHeight * aspect;
  const worldPerPixel = viewWidth / Math.max(window.innerWidth, 1);
  const { radius } = getFocusSphereMetrics();
  const safeDiameterPx = Math.max(2, radius * 2);
  const safeWorldDiameter = safeDiameterPx * worldPerPixel;
  const safeWidth = Math.max(2, safeWorldDiameter);
  const safeHeight = Math.max(2, safeWorldDiameter);
  return { safeWidth, safeHeight };
}

function getFocusWorldCenter() {
  const { centerX, centerY } = getFocusSphereMetrics();
  const ndcX = (centerX / Math.max(window.innerWidth, 1)) * 2 - 1;
  const ndcY = -((centerY / Math.max(window.innerHeight, 1)) * 2 - 1);
  const world = new THREE.Vector3(ndcX, ndcY, 0).unproject(camera);
  return new THREE.Vector3(world.x, world.y, 0);
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
  if (!level) {
    return;
  }
  const nodes = level.nodes;
  if (!nodes?.length) {
    return;
  }
  const layoutMode = getEffectiveLayoutMode(level);
  const useRootAutoLayout = level.id === rootScenePath && !layoutMode;
  const useRingsAutoSizing = layoutMode === "rings";
  if (!useRootAutoLayout && !useRingsAutoSizing) {
    return;
  }
  nodes.forEach((node) => {
    if (node.data && typeof node.data.baseRadius !== "number") {
      node.data.baseRadius = node.data.radius ?? 0;
    }
    if (node.data && !Array.isArray(node.data.basePosition)) {
      node.data.basePosition = [node.group.position.x, node.group.position.y, node.group.position.z];
    }
  });

  if (useRootAutoLayout) {
    const baseRadius = Math.max(
      ...nodes.map((node) => node.data?.baseRadius ?? node.data?.radius ?? 0)
    );
    const { safeWidth, safeHeight } = getSafeViewportWorld();
    const safeRadius = Math.max(2, Math.min(safeWidth, safeHeight) / 2);
    const frameRadius = safeRadius;
    const solvedRing = solveRingFit(frameRadius, nodes.length);
    const targetRadius = Math.max(0, solvedRing.nodeRadius);
    const ringRadius = Math.max(0, solvedRing.ringRadius);
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
    const startAngle = getRingStartAngle(nodes.length);
    nodes.forEach((node, index) => {
      const angle = startAngle + angleStep * index;
      const x = Math.cos(angle) * ringRadius;
      const y = Math.sin(angle) * ringRadius;
      node.group.position.set(x, y, node.group.position.z);
      node.basePosition = node.group.position.clone();
    });
    return;
  }

  const hasHaloForLayout = (node) =>
    Boolean(
      node?.data?.glowRing ||
        node?.data?.childScene ||
        node?.data?.docDrillDownPreferred === true
    );
  const baseBoundsRadius = (node) => {
    const baseRadius = Math.max(0, node?.data?.baseRadius ?? node?.data?.radius ?? 0);
    return baseRadius * (hasHaloForLayout(node) ? ringLayoutDefaults.haloScale : 1);
  };

  const { safeWidth, safeHeight } = getSafeViewportWorld();
  const safeRadius = Math.max(1, Math.min(safeWidth, safeHeight) / 2);
  const frameMargin = 0.94;
  const baseCenter = new THREE.Vector3();
  const basePositions = new Map();
  nodes.forEach((node) => {
    const source = Array.isArray(node.data?.basePosition)
      ? node.data.basePosition
      : [node.group.position.x, node.group.position.y, node.group.position.z];
    const basePos = new THREE.Vector3(source[0] ?? 0, source[1] ?? 0, source[2] ?? 0);
    basePositions.set(node, basePos);
    baseCenter.add(basePos);
  });
  baseCenter.multiplyScalar(1 / nodes.length);

  let scaleByFrame = Infinity;
  nodes.forEach((node) => {
    const baseRadius = baseBoundsRadius(node);
    const basePos = basePositions.get(node);
    if (!basePos || baseRadius < 0) {
      return;
    }
    const radialDistance = basePos.distanceTo(baseCenter);
    const denominator = radialDistance + baseRadius;
    if (denominator <= 0) {
      return;
    }
    scaleByFrame = Math.min(scaleByFrame, (safeRadius * frameMargin) / denominator);
  });

  const scaleFactor = Number.isFinite(scaleByFrame)
    ? Math.max(0.1, scaleByFrame)
    : 1;
  nodes.forEach((node) => {
    const basePos = basePositions.get(node);
    if (basePos) {
      const scaledOffset = basePos.clone().sub(baseCenter).multiplyScalar(scaleFactor);
      node.group.position.copy(baseCenter.clone().add(scaledOffset));
      node.basePosition = node.group.position.clone();
    }
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

function getLevelBoundsLocal(level) {
  return getLevelBoundsFromNodes(level);
}

function isCenteredRingLevel(level) {
  if (!level) {
    return false;
  }
  const layoutMode = getEffectiveLayoutMode(level);
  return level.id === rootScenePath || layoutMode === "rings";
}

function getEffectiveLayoutMode(level) {
  if (!level) {
    return "";
  }
  if (typeof level.layoutMode === "string" && level.layoutMode.trim()) {
    return level.layoutMode.toLowerCase();
  }
  return "";
}

function getLevelFrameCenter(level) {
  if (!level) {
    return new THREE.Vector3();
  }
  if (isCenteredRingLevel(level) && Array.isArray(level.nodes) && level.nodes.length > 0) {
    const center = new THREE.Vector3();
    level.nodes.forEach((node) => {
      center.add(node.group.position);
    });
    center.multiplyScalar(1 / level.nodes.length);
    return center;
  }
  return getLevelCenter(level);
}

function computeFitZoomForLevel(level) {
  if (isCenteredRingLevel(level)) {
    const center = getLevelFrameCenter(level);
    const { safeWidth, safeHeight } = getSafeViewportWorld();
    const safeRadius = Math.max(1, Math.min(safeWidth, safeHeight) / 2);
    let extentRadius = 0;
    level.nodes.forEach((node) => {
      if (node.data?.excludeFromBounds) {
        return;
      }
      const nodeBoundsRadius = getNodeBoundsRadius(node);
      const radialDistance = node.group.position.distanceTo(center);
      extentRadius = Math.max(extentRadius, radialDistance + nodeBoundsRadius);
    });
    if (extentRadius <= 0) {
      return camera.zoom;
    }
    return clampZoom(safeRadius / extentRadius);
  }

  const { size } = getLevelBoundsFromNodes(level);
  if (!isFinite(size.x) || !isFinite(size.y) || size.lengthSq() === 0) {
    return camera.zoom;
  }

  const { safeWidth, safeHeight } = getSafeViewportWorld();
  const marginFactor = 0.92;
  const zoomX = (safeWidth * marginFactor) / Math.max(size.x, 0.01);
  const zoomY = (safeHeight * marginFactor) / Math.max(size.y, 0.01);
  return clampZoom(Math.min(zoomX, zoomY));
}

function fitCameraToLevel(level) {
  const { size } = getLevelBoundsFromNodes(level);
  if (!isFinite(size.x) || !isFinite(size.y) || size.lengthSq() === 0) {
    return;
  }

  const center = getLevelFrameCenter(level);
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
    const radius = getNodeBoundsRadius(node);
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

    const labelName =
      typeof node.data.labelTitle === "string" && node.data.labelTitle.trim()
        ? node.data.labelTitle.trim()
        : typeof node.data.shortName === "string" && node.data.shortName.trim()
          ? node.data.shortName.trim()
        : typeof node.data.name === "string"
          ? node.data.name
          : "";
    const tokens = labelName
      .split(/[\s-]+/)
      .map((token) => token.replace(/[^A-Za-z0-9]/g, ""))
      .filter(Boolean);
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
    const subtitleSize = titleSize;
    const datesSize = titleSize;
    const badgeSize = clamp(titleSize * 0.95, 11, 18);
    const typographyKey = [
      titleSize.toFixed(2),
      titleWeight,
      lineHeight.toFixed(2),
      letterSpacing.toFixed(2),
      scaleSize.toFixed(2),
      tagSize.toFixed(2),
      subtitleSize.toFixed(2),
      datesSize.toFixed(2),
      badgeSize.toFixed(2),
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
      labelStyle.setProperty("--label-subtitle-size", `${subtitleSize.toFixed(2)}px`);
      labelStyle.setProperty("--label-dates-size", `${datesSize.toFixed(2)}px`);
      labelStyle.setProperty("--label-badge-size", `${badgeSize.toFixed(2)}px`);
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

function setLevelOpacityWithFocus(
  level,
  focusId,
  focusOpacity,
  otherOpacity,
  shellGuideOpacity = otherOpacity
) {
  levelRuntime.setLevelOpacityWithFocus(
    level,
    focusId,
    focusOpacity,
    otherOpacity,
    shellGuideOpacity
  );
}

function setLevelOpacityWithFocusAndLabel(
  level,
  focusId,
  focusOpacity,
  otherOpacity,
  labelOpacity,
  shellGuideOpacity = otherOpacity
) {
  levelRuntime.setLevelOpacityWithFocusAndLabel(
    level,
    focusId,
    focusOpacity,
    otherOpacity,
    labelOpacity,
    shellGuideOpacity
  );
}

function isAtomicParticleFocusTransition(level, targetNode) {
  if (!level || !targetNode?.data) {
    return false;
  }
  const levelId = typeof level.id === "string" ? level.id.toLowerCase() : "";
  const sceneId = typeof level.sceneId === "string" ? level.sceneId.toLowerCase() : "";
  const isAtomContext =
    levelId.startsWith("content/scenes/elements/") ||
    levelId.endsWith("/nuclear/atom.json") ||
    sceneId === "atom";
  if (!isAtomContext) {
    return false;
  }
  const category =
    typeof targetNode.data.category === "string"
      ? targetNode.data.category.toLowerCase()
      : "";
  const label =
    typeof targetNode.data.label === "string"
      ? targetNode.data.label.toLowerCase()
      : "";
  return (
    category === "proton" ||
    category === "neutron" ||
    category === "electron" ||
    label === "p" ||
    label === "n" ||
    label === "e"
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
  markdownRuntime.hideMarkdownPanel();
  const toLevel = buildLevel(childLevelId);
  if (!worldGroup.children.includes(toLevel.group)) {
    worldGroup.add(toLevel.group);
  }

  const targetWorld = new THREE.Vector3();
  targetNode.group.getWorldPosition(targetWorld);
  const targetPosition = targetWorld.sub(worldGroup.position);
  const toLevelCenter = getLevelFrameCenter(toLevel);
  const warpScale = computeWarpScale(targetNode.data.radius);
  const toStartScale = 0.5;
  const focusNodeId = targetNode.data.id ?? targetNode.data.name;
  const zoomTarget = computeFitZoomForLevel(toLevel);
  const panStart = worldGroup.position.clone();
  const useAtomFocusTransition = isAtomicParticleFocusTransition(currentLevel, targetNode);
  const focusWorldCenter = useAtomFocusTransition
    ? getFocusWorldCenter()
    : new THREE.Vector3();
  const panTarget = new THREE.Vector3(
    focusWorldCenter.x - targetPosition.x,
    focusWorldCenter.y - targetPosition.y,
    0
  );

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
    transitionProfile: useAtomFocusTransition ? "atomFocusFadeThenWarp" : "default",
    fadeOutEnd: 0.3,
    motionStart: 0.3,
    motionCenterEnd: 0.58,
  };
  transitionState.startTime = performance.now();
  transitionState.duration = 2250;

  toLevel.group.position.copy(targetPosition).sub(toLevelCenter);
  toLevel.group.scale.setScalar(toStartScale);
  setLevelOpacity(toLevel, 0);
  setLevelLabelOpacity(toLevel, 0);
  if (useAtomFocusTransition) {
    setLevelOpacityWithFocus(currentLevel, focusNodeId, 1, 1, 1);
    setLevelLinkOpacity(currentLevel, 1);
  } else {
    setLevelOpacityWithFocus(currentLevel, focusNodeId, 1, 0);
    setLevelLinkOpacity(currentLevel, 0);
  }

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

  const config = await sceneBootstrapService.ensureSceneReady(childLevelId);
  if (!config) {
    return;
  }

  beginLevelTransition(targetNode, childLevelId);
}

function startLevelTransitionOut() {
  if (transitionState.active || navigationStack.length === 0) {
    return;
  }

  closeDetailPanel();
  hideHoverTooltip();
  markdownRuntime.hideMarkdownPanel();
  let parentInfo = null;
  let parentLevel = null;
  let parentNode = null;
  while (navigationStack.length > 0) {
    const candidate = navigationStack[navigationStack.length - 1];
    if (!candidate?.levelId || !levelConfigs[candidate.levelId]) {
      navigationStack.pop();
      continue;
    }
    const level = buildLevel(candidate.levelId);
    if (!level) {
      navigationStack.pop();
      continue;
    }
    const focusNode =
      level.nodeById.get(candidate.focusNodeId) ??
      level.nodeByName.get(candidate.focusNodeId);
    if (!focusNode) {
      navigationStack.pop();
      continue;
    }
    parentInfo = candidate;
    parentLevel = level;
    parentNode = focusNode;
    break;
  }
  if (!parentInfo || !parentLevel || !parentNode) {
    updateNavButton();
    return;
  }

  if (!worldGroup.children.includes(parentLevel.group)) {
    worldGroup.add(parentLevel.group);
  }

  const parentCenter = getLevelFrameCenter(parentLevel);
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

const periodicOverlayRuntime = createPeriodicOverlayRuntime({
  periodicOverlay,
  periodicGrid,
  periodicLegend,
  detailPanel,
  detailTitle,
  detailBody,
  elementLegend,
  elementLegendItems,
  navUpButton,
  homeButton,
  sceneSearchToggle,
  periodicCategoryColors,
  periodicTableService,
  sceneGraphManifestService,
  getCurrentLevel: () => currentLevel,
  searchBackStack,
  navigationStack,
  updateNavButton,
  jumpToScene,
  isTransitionActive: () => transitionState.active,
  fetchImpl: (...args) => fetch(...args),
});

function normalizeElementSymbol(value) {
  return String(value ?? "").trim().toLowerCase();
}

function isElementSceneLevel(level = currentLevel) {
  return !!(
    level &&
    typeof level.id === "string" &&
    level.id.startsWith("content/scenes/elements/")
  );
}

function extractElementSymbolFromLevel(level = currentLevel) {
  if (!isElementSceneLevel(level)) {
    return null;
  }
  const sceneId = normalizeElementSymbol(level.sceneId);
  if (sceneId && elementNavigationState.elementBySymbol.has(sceneId)) {
    return sceneId;
  }
  const match = normalizeElementSymbol(level.id).match(elementScenePathPattern);
  if (match?.[1]) {
    return match[1];
  }
  return sceneId || null;
}

async function ensureElementNavigationData() {
  if (elementNavigationState.ready) {
    return true;
  }
  if (elementNavigationState.loadingPromise) {
    return elementNavigationState.loadingPromise;
  }
  elementNavigationState.loadingPromise = (async () => {
    const periodicTable = await periodicTableService.ensure(
      (...args) => fetch(...args),
      periodicTableDataPath
    );
    if (!Array.isArray(periodicTable?.elements)) {
      return false;
    }

    const rowColumnsByY = new Map();
    const columnRowsByX = new Map();
    elementNavigationState.elementBySymbol.clear();
    elementNavigationState.symbolByCoordinate.clear();
    elementNavigationState.scenePathBySymbol.clear();
    elementNavigationState.miniCellBySymbol.clear();
    elementNavigationState.miniHudBuilt = false;

    periodicTable.elements.forEach((element) => {
      const symbol = normalizeElementSymbol(element?.symbol);
      const x = Number(element?.xpos);
      const y = Number(element?.ypos);
      if (!symbol || !Number.isFinite(x) || !Number.isFinite(y)) {
        return;
      }
      elementNavigationState.elementBySymbol.set(symbol, { symbol, x, y });
      elementNavigationState.symbolByCoordinate.set(`${x},${y}`, symbol);
      if (!rowColumnsByY.has(y)) {
        rowColumnsByY.set(y, new Set());
      }
      if (!columnRowsByX.has(x)) {
        columnRowsByX.set(x, new Set());
      }
      rowColumnsByY.get(y).add(x);
      columnRowsByX.get(x).add(y);
    });

    rowColumnsByY.forEach((columns, y) => {
      elementNavigationState.rowColumnsByY.set(
        y,
        [...columns].sort((a, b) => a - b)
      );
    });
    columnRowsByX.forEach((rows, x) => {
      elementNavigationState.columnRowsByX.set(
        x,
        [...rows].sort((a, b) => a - b)
      );
    });

    const scenePathEntries = await Promise.all(
      [...elementNavigationState.elementBySymbol.keys()].map(async (symbol) => {
        let scenePath = null;
        if (
          sceneGraphManifestService &&
          typeof sceneGraphManifestService.resolvePeriodicElementScenePath === "function"
        ) {
          scenePath = await sceneGraphManifestService.resolvePeriodicElementScenePath(symbol);
        }
        if (!scenePath) {
          scenePath = `content/scenes/elements/${symbol}.json`;
        }
        return [symbol, scenePath];
      })
    );
    scenePathEntries.forEach(([symbol, scenePath]) => {
      elementNavigationState.scenePathBySymbol.set(symbol, scenePath);
    });

    elementNavigationState.ready = true;
    return true;
  })()
    .catch((error) => {
      console.warn("[ElementNavigation] Failed to initialize", error);
      elementNavigationState.ready = false;
      return false;
    })
    .finally(() => {
      elementNavigationState.loadingPromise = null;
    });
  return elementNavigationState.loadingPromise;
}

function buildElementNavigationMiniHud() {
  if (
    !elementNavMini ||
    !elementNavigationState.ready ||
    elementNavigationState.miniHudBuilt
  ) {
    return;
  }
  elementNavMini.innerHTML = "";
  elementNavigationState.miniCellBySymbol.clear();
  const fragment = document.createDocumentFragment();
  const orderedElements = [...elementNavigationState.elementBySymbol.values()].sort((a, b) => {
    if (a.y !== b.y) {
      return a.y - b.y;
    }
    if (a.x !== b.x) {
      return a.x - b.x;
    }
    return a.symbol.localeCompare(b.symbol);
  });
  orderedElements.forEach((element) => {
    const cell = document.createElement("div");
    cell.className = "element-nav-mini-cell";
    cell.style.gridColumn = String(element.x);
    cell.style.gridRow = String(element.y);
    cell.dataset.symbol = element.symbol;
    cell.setAttribute("aria-hidden", "true");
    fragment.appendChild(cell);
    elementNavigationState.miniCellBySymbol.set(element.symbol, cell);
  });
  elementNavMini.appendChild(fragment);
  elementNavigationState.miniHudBuilt = true;
}

function clearElementNavigationMiniHighlights() {
  elementNavigationState.miniCellBySymbol.forEach((cell) => {
    cell.classList.remove("is-current");
    cell.classList.remove("is-neighbor");
  });
}

function getWrappedNeighbor(values, currentValue, direction) {
  if (!Array.isArray(values) || values.length <= 1) {
    return null;
  }
  const currentIndex = values.indexOf(currentValue);
  if (currentIndex < 0) {
    return null;
  }
  if (direction === "up" || direction === "left") {
    return currentIndex > 0 ? values[currentIndex - 1] : values[values.length - 1];
  }
  if (direction === "down" || direction === "right") {
    return currentIndex < values.length - 1 ? values[currentIndex + 1] : values[0];
  }
  return null;
}

function resolveElementNeighborSymbol(symbol, direction) {
  const normalizedSymbol = normalizeElementSymbol(symbol);
  const current = elementNavigationState.elementBySymbol.get(normalizedSymbol);
  if (!current) {
    return null;
  }
  if (direction === "left" || direction === "right") {
    const rowColumns = elementNavigationState.rowColumnsByY.get(current.y);
    const targetX = getWrappedNeighbor(rowColumns, current.x, direction);
    if (!Number.isFinite(targetX)) {
      return null;
    }
    return elementNavigationState.symbolByCoordinate.get(`${targetX},${current.y}`) ?? null;
  }
  if (direction === "up" || direction === "down") {
    const columnRows = elementNavigationState.columnRowsByX.get(current.x);
    const targetY = getWrappedNeighbor(columnRows, current.y, direction);
    if (!Number.isFinite(targetY)) {
      return null;
    }
    return elementNavigationState.symbolByCoordinate.get(`${current.x},${targetY}`) ?? null;
  }
  return null;
}

function resolveElementDirectionalTargets(symbol) {
  return {
    up: resolveElementNeighborSymbol(symbol, "up"),
    down: resolveElementNeighborSymbol(symbol, "down"),
    left: resolveElementNeighborSymbol(symbol, "left"),
    right: resolveElementNeighborSymbol(symbol, "right"),
  };
}

function setElementNavButtonTarget(direction, targetSymbol) {
  const button = elementNavButtons[direction];
  if (!button) {
    return;
  }
  const canNavigate =
    !!targetSymbol &&
    !transitionState.active &&
    elementNavigationState.navigationInFlight !== true;
  button.disabled = !canNavigate;
  button.dataset.targetSymbol = targetSymbol ?? "";
}

async function updateElementNavigationUi() {
  if (!elementNavOverlay) {
    return;
  }
  const updateToken = ++elementNavigationState.updateToken;
  const isElementScene = isElementSceneLevel();
  elementNavOverlay.classList.toggle("is-open", isElementScene);
  elementNavOverlay.setAttribute("aria-hidden", isElementScene ? "false" : "true");
  elementNavOverlay.inert = !isElementScene;
  if (!isElementScene) {
    clearElementNavigationMiniHighlights();
    Object.keys(elementNavButtons).forEach((direction) => {
      setElementNavButtonTarget(direction, null);
    });
    return;
  }

  const ready = await ensureElementNavigationData();
  if (updateToken !== elementNavigationState.updateToken) {
    return;
  }
  if (!ready) {
    clearElementNavigationMiniHighlights();
    Object.keys(elementNavButtons).forEach((direction) => {
      setElementNavButtonTarget(direction, null);
    });
    return;
  }

  buildElementNavigationMiniHud();
  clearElementNavigationMiniHighlights();

  const currentSymbol = extractElementSymbolFromLevel();
  if (!currentSymbol) {
    Object.keys(elementNavButtons).forEach((direction) => {
      setElementNavButtonTarget(direction, null);
    });
    return;
  }

  const currentCell = elementNavigationState.miniCellBySymbol.get(currentSymbol);
  if (currentCell) {
    currentCell.classList.add("is-current");
  }

  const directionalTargets = resolveElementDirectionalTargets(currentSymbol);
  Object.entries(directionalTargets).forEach(([direction, targetSymbol]) => {
    setElementNavButtonTarget(direction, targetSymbol);
    const targetCell = targetSymbol
      ? elementNavigationState.miniCellBySymbol.get(targetSymbol)
      : null;
    if (targetCell) {
      targetCell.classList.add("is-neighbor");
    }
  });
}

async function navigateElementByDirection(direction) {
  if (
    !direction ||
    transitionState.active ||
    elementNavigationState.navigationInFlight === true ||
    !isElementSceneLevel()
  ) {
    return false;
  }
  const ready = await ensureElementNavigationData();
  if (!ready) {
    return false;
  }
  const currentSymbol = extractElementSymbolFromLevel();
  if (!currentSymbol) {
    return false;
  }
  const targetSymbol = resolveElementNeighborSymbol(currentSymbol, direction);
  if (!targetSymbol) {
    return false;
  }
  const targetPath = elementNavigationState.scenePathBySymbol.get(targetSymbol);
  if (!targetPath || targetPath === currentLevel?.id) {
    return false;
  }

  elementNavigationState.navigationInFlight = true;
  updateElementNavigationUi();
  try {
    closeDetailPanel();
    hideHoverTooltip();
    await jumpToScene(targetPath, { mode: "jump" });
    return true;
  } finally {
    elementNavigationState.navigationInFlight = false;
    updateElementNavigationUi();
  }
}

function isEditingTextInput(target) {
  if (!(target instanceof Element)) {
    return false;
  }
  if (target.closest("input, textarea, select")) {
    return true;
  }
  if (target.closest("[contenteditable=''], [contenteditable='true']")) {
    return true;
  }
  return target.isContentEditable === true;
}

function wireElementNavigationControls() {
  const onDirectionPress = async (direction) => {
    const handled = await navigateElementByDirection(direction);
    if (handled) {
      updateElementNavigationUi();
    }
  };

  Object.entries(elementNavButtons).forEach(([direction, button]) => {
    if (!button) {
      return;
    }
    button.addEventListener("click", () => {
      onDirectionPress(direction);
    });
  });

  window.addEventListener("keydown", async (event) => {
    const direction = elementNavDirectionByKey[event.key];
    if (!direction) {
      return;
    }
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) {
      return;
    }
    if (isEditingTextInput(event.target)) {
      return;
    }
    if (sceneSearchRuntime?.isSearchOpen()) {
      return;
    }
    const handled = await navigateElementByDirection(direction);
    if (handled) {
      event.preventDefault();
    }
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

const composerUiRuntime = createComposerUiRuntime({
  app,
  composerOverlay,
  composerTabs,
  composerPanels,
  composerSceneId,
  composerPreviewSceneId,
  composerPreviewScenePath,
  composerDocsPath,
  levelConfigs,
  levels,
  initComposerCanvas,
  renderComposerJsonPreview,
  stopComposerCameraFlightPreview,
  showMarkdownPanel: (level) => markdownRuntime.showMarkdownPanel(level),
  readComposerFormState,
  buildComposerSceneConfig,
  buildComposerSceneSpec,
  jumpToScene,
  setComposerStatus,
  setComposerNeedsResize: (value) => {
    composerNeedsResize = value;
  },
});

function updateMarkdownDocButton() {
  if (!markdownDocButton) {
    return;
  }
  const hasDoc = !!currentLevel?.markdownPath;
  markdownDocButton.classList.toggle("is-hidden", !hasDoc);
  markdownDocButton.disabled = !hasDoc;
}

function updateSceneLabel() {
  sceneStateHashService.syncSceneHash(currentLevel?.id ?? null);
  if (!sceneLabel) {
    return;
  }
  sceneLabel.textContent = currentLevel?.name ?? "";
  updateDocButton();
  updateMetaButton();
  updateMarkdownDocButton();
  composerUiRuntime.updateComposerOverlay(currentLevel);
  periodicOverlayRuntime.updatePeriodicOverlay();
  periodicOverlayRuntime.updateElementLegend();
  periodicOverlayRuntime.updateElementInfoPanel();
  updateElementNavigationUi();
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

const sceneSearchRuntime = createSceneSearchRuntime({
  sceneSearch,
  sceneSearchToggle,
  sceneSearchPanel,
  sceneSearchInput,
  sceneSearchResults,
  sceneIndexService,
  getCurrentLevel: () => currentLevel,
  navigationStack,
  searchBackStack,
  jumpToScene,
});
const sceneSearchCoordinator = createSceneSearchCoordinatorService({
  sceneIndexService,
  sceneSearchRuntime,
  fetchImpl: (...args) => fetch(...args),
  sceneGraphManifestPath,
});
const sceneSearchUiRuntime = createSceneSearchUiRuntime({
  sceneSearchToggle,
  sceneSearchInput,
  sceneSearchResults,
  sceneSearchRuntime,
  sceneSearchCoordinator,
});
const scenePanelUiRuntime = createScenePanelUiRuntime({
  docButton,
  detailClose,
  markdownClose,
  markdownDocButton,
  markdownLayoutToggle,
  markdownRuntime,
  closeDetailPanel,
  getCurrentLevel: () => currentLevel,
  isTransitionActive: () => transitionState.active,
});
const composerControlsUiRuntime = createComposerControlsUiRuntime({
  composerTabs,
  composerDocsButton,
  composerExitButton,
  composerPreviewButton,
  composerExportButton,
  composerSceneIdInput,
  composerSceneNameInput,
  composerNodeCountInput,
  composerNodeLabelsInput,
  composerPathModeSelect,
  composerPathResetButton,
  composerFrameEditToggle,
  composerFrameResetButton,
  composerFrameScaleInput,
  composerCameraPoiSelect,
  composerCameraWaypointAdd,
  composerCameraWaypointClear,
  composerCameraFlightToggle,
  composerCameraSpeedInput,
  composerCameraRadiusInput,
  composerCameraResetButton,
  composerUiRuntime,
  navUpButton,
  composerPathState,
  composerCameraFlightState,
  getComposerFrameEditMode: () => composerFrameEditMode,
  setComposerFrameEditMode: (value) => {
    composerFrameEditMode = value;
  },
  updateComposerPathGeometry,
  resetComposerPathPoints,
  setComposerFrameDefaults,
  updateComposerFrame,
  addComposerCameraWaypoint,
  clearComposerCameraWaypoints,
  stopComposerCameraFlightPreview,
  startComposerCameraFlightPreview,
  applyComposerFrameScaleInput,
  applyComposerCameraSpeedInput,
  applyComposerCameraRadiusInput,
  setComposerCameraDefaults,
  updateComposerCamera,
  renderComposerJsonPreview,
  isTransitionActive: () => transitionState.active,
});

function focusOnPointer(clientX, clientY) {
  if (!currentLevel || transitionState.active) {
    return false;
  }
  if (!isPointerWithinInteractiveViewport(clientX, clientY)) {
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
        generationBackStack.push({
          levelId: currentLevel.id,
          navigationStack: navigationStack.map((entry) => ({
            levelId: entry.levelId,
            focusNodeId: entry.focusNodeId,
          })),
        });
        jumpToScene(nextGenInfo.nextScene, {
          mode: "jump",
          preserveWorldPosition: true,
          preserveLevelPosition: true,
          preserveGenerationBackStack: true,
        });
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

  const hasMarkdownPath = !!targetNode.data.markdownPath;
  const canOpenMarkdown = hasMarkdownPath;

  if (currentLevel?.sceneId === composerSceneId) {
    const panelId = composerPanelMap.get(targetNode.data.id ?? "");
    if (panelId) {
      closeDetailPanel();
      hideHoverTooltip();
      composerUiRuntime.setComposerPanel(panelId);
      return true;
    }
  }

  const prefersDocDrillDown =
    targetNode.data.docDrillDownPreferred === true &&
    canOpenMarkdown;

  if (prefersDocDrillDown) {
    closeDetailPanel();
    hideHoverTooltip();
    const hasSectionTarget =
      typeof targetNode.data.markdownSection === "string" &&
      targetNode.data.markdownSection.trim().length > 0;
    const preferredSceneId = hasSectionTarget
      ? markdownSceneRegistry.ensureMarkdownReaderScene(targetNode.data)
      : markdownSceneRegistry.ensureMarkdownDocScene(targetNode.data);
    if (preferredSceneId) {
      targetNode.data.childScene = preferredSceneId;
      startLevelTransitionFromNode(targetNode);
      return true;
    }
  }

  const hasExplicitChildScene =
    !!targetNode.data.children ||
    (typeof targetNode.data.childScene === "string" &&
      !targetNode.data.childScene.startsWith("__markdown_"));

  if (hasExplicitChildScene) {
    closeDetailPanel();
    hideHoverTooltip();
    startLevelTransitionFromNode(targetNode);
  } else if (canOpenMarkdown) {
    closeDetailPanel();
    hideHoverTooltip();
    const readerSceneId = markdownSceneRegistry.ensureMarkdownReaderScene(targetNode.data);
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
  if (!isPointerWithinInteractiveViewport(clientX, clientY)) {
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
  if (!isPointerWithinInteractiveViewport(clientX, clientY)) {
    hideHoverTooltip();
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

const interactionRuntime = createInteractionRuntime({
  canvas,
  camera,
  worldGroup,
  zoomState,
  applyZoom,
  isTransitionActive: () => transitionState.active,
  getCurrentLevel: () => currentLevel,
  rootScenePath,
  resetToRootScene,
  focusOnPointer,
  updateDetailHover,
  updateDecayHover,
  onSuccessfulSphereClick: dismissZoomToastPermanently,
  isPointerWithinInteractiveViewport,
  setLastZoomGestureTime: (value) => {
    lastZoomGestureTime = value;
  },
  now: () => performance.now(),
});

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
  if (currentLevel) {
    layoutRootLevel(currentLevel);
    fitCameraToLevel(currentLevel);
  }
}

async function init() {
  closeDetailPanel();
  const requestedSceneState = sceneStateHashService.getSceneStateFromHash();
  const initialScene = await sceneBootstrapService.resolveInitialScene(
    requestedSceneState.scenePath || rootScenePath
  );
  if (!initialScene) {
    return;
  }
  const initialScenePath = initialScene.scenePath;
  currentLevel = buildLevel(initialScenePath);
  worldGroup.add(currentLevel.group);
  if (currentLevel) {
    layoutRootLevel(currentLevel);
  }
  updateCamera();
  fitCameraToLevel(currentLevel);
  if (
    requestedSceneState.parentLevelId &&
    requestedSceneState.parentFocusNodeId &&
    currentLevel.id !== rootScenePath
  ) {
    const parentConfig = await sceneBootstrapService.ensureSceneReady(
      requestedSceneState.parentLevelId
    );
    if (parentConfig) {
      navigationStack.push({
        levelId: requestedSceneState.parentLevelId,
        focusNodeId: requestedSceneState.parentFocusNodeId,
      });
    }
  }
  updateSceneLabel();
  updateSceneMarkdown();
  showZoomToastIfNeeded();
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
  getGenerationBackStack: () => generationBackStack,
});
const appShellUiRuntime = createAppShellUiRuntime({
  canvas,
  interactionRuntime,
  onResize,
  hideHoverTooltip,
  navUpButton,
  homeButton,
  periodicOverlayRuntime,
  appDirector,
});

appDirector.init();
appShellUiRuntime.wireListeners();
scenePanelUiRuntime.wireListeners();
composerControlsUiRuntime.wireListeners();
sceneSearchUiRuntime.wireListeners();
wireElementNavigationControls();
ensureElementNavigationData();
