import * as THREE from "./vendor/three/three.module.js";
import { CSS2DRenderer, CSS2DObject } from "./vendor/three/CSS2DRenderer.js";
import { AppDirector } from "./src/director/AppDirector.js";
import { createLevelRuntime } from "./src/runtime/LevelRuntime.js";
import { createMarkdownRuntime } from "./src/runtime/MarkdownRuntime.js";
import { createNodeFactory } from "./src/runtime/NodeFactoryRuntime.js";
import { createComposerUiRuntime } from "./src/runtime/ComposerUiRuntime.js";
import { createComposerControlsUiRuntime } from "./src/runtime/ComposerControlsUiRuntime.js";
import {
  buildComposerPreviewSceneData,
  createComposerSceneDocument,
} from "./src/runtime/Composer2SceneDocumentRuntime.js";
import {
  buildComposerReactionActionString,
  formatComposerReactionBandLabel,
  formatComposerReactionList,
  formatComposerReactionTransferRefs,
  getComposerReactionActionOptions,
  getComposerReactionStageDrafts,
  normalizeComposerReactionAction,
  parseComposerReactions,
  shortenComposerTimelineBandLabel,
} from "./src/runtime/ComposerReactionRuntime.js";
import {
  clampComposerTimelineSpan,
  COMPOSER_TIMELINE_MIN_DURATION_SECONDS as composerTimelineMinDurationSeconds,
  findComposerTimelineOverlap as findComposerTimelineOverlapRuntime,
  formatComposerPauseList,
  formatComposerWarpList,
  getComposerSceneTimeWindow,
  getComposerTimelineAuthoringItems as getComposerTimelineAuthoringItemsRuntime,
  getComposerTimelineFraction,
  getComposerTimelineTimeAtClientX as getComposerTimelineTimeAtClientXRuntime,
  parseComposerTimingLines,
} from "./src/runtime/ComposerTimelineRuntime.js";
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
import { createSceneBootstrapService } from "./src/services/SceneBootstrapService.js";
import { createSceneSearchCoordinatorService } from "./src/services/SceneSearchCoordinatorService.js";

const app = document.getElementById("app");
const canvas = document.getElementById("viz");
const navUpButton = document.getElementById("nav-up");
const navForwardButton = document.getElementById("nav-forward");
const detailInfoButton = document.getElementById("detail-info-button");
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
const hydePeriodicOverlay = document.getElementById("hyde-periodic-overlay");
const hydePeriodicGrid = document.getElementById("hyde-periodic-grid");
const hydePeriodicLegend = document.getElementById("hyde-periodic-legend");
const hydePeriodicArtwork = document.getElementById("hyde-periodic-artwork");
const elementNavOverlay = document.getElementById("element-nav-overlay");
const elementNavMini = document.getElementById("element-nav-mini");
const elementNavUpButton = document.getElementById("element-nav-up");
const elementNavDownButton = document.getElementById("element-nav-down");
const elementNavLeftButton = document.getElementById("element-nav-left");
const elementNavRightButton = document.getElementById("element-nav-right");
const composerOverlay = document.getElementById("composer-overlay");
const composerSceneButton = document.getElementById("composer-scene-button");
const composerClearButton = document.getElementById("composer-clear-button");
const composerSaveButton = document.getElementById("composer-save-button");
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
const composerAssemblyList = document.getElementById("composer-assembly-list");
const composerAssemblyDetail = document.getElementById("composer-assembly-detail");
const composerAssemblyAddButton = document.getElementById("composer-assembly-add");
const composerPreviewButton = document.getElementById("composer-preview-button");
const composerExportButton = document.getElementById("composer-export-button");
const composerLibrarySaveButton = document.getElementById("composer-library-save");
const composerRepoSaveButton = document.getElementById("composer-repo-save-button");
const composerLibrarySelect = document.getElementById("composer-library-select");
const composerLibraryLoadButton = document.getElementById("composer-library-load");
const composerLibraryDeleteButton = document.getElementById("composer-library-delete");
const composerLibraryStatus = document.getElementById("composer-library-status");
const composerPlayToggleButton = document.getElementById("composer-play-toggle");
const composerPlayResetButton = document.getElementById("composer-play-reset");
const composerMarkerPrevButton = document.getElementById("composer-marker-prev");
const composerMarkerNextButton = document.getElementById("composer-marker-next");
const composerMarkerJumpSelect = document.getElementById("composer-marker-jump");
const composerPlayheadScrubInput = document.getElementById("composer-playhead-scrub");
const composerStatus = document.getElementById("composer-status");
const composerJsonPreview = document.getElementById("composer-json-preview");
const composerCanvas = document.getElementById("composer-canvas");
const composerCanvasWrap = composerCanvas?.parentElement ?? null;
const composerViewportOverlays = document.getElementById("composer-viewport-overlays");
const composerAssemblyMenu = document.getElementById("composer-assembly-menu");
const composerHudLabelsToggle = document.getElementById("composer-hud-labels-toggle");
const composerHudPathsToggle = document.getElementById("composer-hud-paths-toggle");
const composerHudHistoryToggle = document.getElementById("composer-hud-history-toggle");
const composerHudEnvelopesToggle = document.getElementById("composer-hud-envelopes-toggle");
const composerHudObserverToggle = document.getElementById("composer-hud-observer-toggle");
const composerHudViewportToggleBindings = [
  {
    button: composerHudLabelsToggle,
    key: "showLabels",
    label: "Observer Labels",
  },
  {
    button: composerHudPathsToggle,
    key: "showTransportPath",
    label: "Transport Paths",
  },
  {
    button: composerHudHistoryToggle,
    key: "showHistoryTraces",
    label: "History Traces",
  },
  {
    button: composerHudEnvelopesToggle,
    key: "showEnvelopes",
    label: "Envelopes",
  },
  {
    button: composerHudObserverToggle,
    key: "showCameraGuides",
    label: "Observer Guides",
  },
];
const composerSceneRoleOptions = [
  { value: "assembly", label: "Assembly" },
  { value: "reactant", label: "Reactant" },
  { value: "product", label: "Product" },
];
const composerAssemblyTemplateMenuRows = [
  [
    { template: "noether_core", label: "Noether Core" },
    { template: "electron", label: "Electron" },
  ],
  [
    { template: "down_quark", label: "Down Quark" },
    { template: "up_quark", label: "Up Quark" },
  ],
];
const composerTimelineAddTypeEntries = [
  { id: "pause", label: "Pause" },
  { id: "warp", label: "Warp" },
  { id: "image", label: "Image" },
  { id: "video", label: "Video" },
  { id: "audio", label: "Audio" },
  { id: "graphic", label: "Graphic" },
  { id: "camera", label: "Observer" },
  { id: "reaction", label: "Reaction" },
];
const composerTimelineAddTypeIds = new Set(composerTimelineAddTypeEntries.map((entry) => entry.id));
const composerPathModeSelect = document.getElementById("composer-path-mode");
const composerPathResetButton = document.getElementById("composer-path-reset");
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
const composerCameraPoiStatus = document.getElementById("composer-camera-poi-status");
const composerCameraFlightToggle = document.getElementById("composer-camera-flight-toggle");
const composerSceneDurationInput = document.getElementById("composer-scene-duration");
const composerSceneLoopInput = document.getElementById("composer-scene-loop");
const composerMarkerListInput = document.getElementById("composer-marker-list");
const composerPauseListInput = document.getElementById("composer-pause-list");
const composerWarpListInput = document.getElementById("composer-warp-list");
const composerTransferListInput = document.getElementById("composer-transfer-list");
const composerReactionListInput = document.getElementById("composer-reaction-list");
const composerMarkerStatus = document.getElementById("composer-marker-status");
const composerPauseStatus = document.getElementById("composer-pause-status");
const composerWarpStatus = document.getElementById("composer-warp-status");
const composerTransferStatus = document.getElementById("composer-transfer-status");
const composerReactionStatus = document.getElementById("composer-reaction-status");
const composerTimelineSummary = document.getElementById("composer-timeline-summary");
const composerTimelineActive = document.getElementById("composer-timeline-active");
const composerTimelineTrack = document.getElementById("composer-timeline-track");
const composerTimelineWarps = document.getElementById("composer-timeline-warps");
const composerTimelinePauses = document.getElementById("composer-timeline-pauses");
const composerTimelineReactions = document.getElementById("composer-timeline-reactions");
const composerTimelineMarkers = document.getElementById("composer-timeline-markers");
const composerTimelinePlayhead = document.getElementById("composer-timeline-playhead");
const composerLibraryStorageKey = "architrino.composer.library.v1";
const composerMediaAssetDirectories = {
  image: "content/assets/composer/images/",
  video: "content/assets/composer/video/",
  audio: "content/assets/composer/audio/",
};
const composerSupportedMediaExtensions = {
  image: ["jpg", "jpeg", "png", "svg"],
  video: ["mp4", "mov"],
  audio: ["mp3"],
};
const defaultRootLayoutMarginPx = { x: 160, y: 140 };
let zoomToastTimeoutId = null;
let zoomToastDismissedForSession = false;
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

function sanitizeComposerEntityId(raw, fallback = "item_1") {
  if (!raw) {
    return fallback;
  }
  const cleaned = String(raw)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_-]/g, "");
  return cleaned || fallback;
}

function createDefaultComposerAssemblyDraft(index = 0) {
  const ordinal = index + 1;
  const assemblyId = `assembly_${ordinal}`;
  return {
    id: assemblyId,
    name: ordinal === 1 ? "Primary Assembly" : `Assembly ${ordinal}`,
    sceneRole: "assembly",
    parentId: "",
    position: [0, 0, 0],
    subassemblies: [],
    members:
      ordinal === 1
        ? [
            "positrino_1",
            "electrino_1",
            "positrino_2",
            "electrino_2",
            "positrino_3",
            "electrino_3",
          ]
        : [],
    pathPoints:
      ordinal === 1
        ? [
            [-1.6, 0, 0],
            [-0.5, 0.8, 0.35],
            [0.9, 0.25, -0.5],
            [2.0, 1.05, 0.15],
          ]
        : [],
    pathInterpolate: "spline",
    pathClosed: false,
    historyTraceEnabled: false,
    envelopeEnabled: false,
    core: ordinal === 1 ? createComposerDefaultCoreSpec(assemblyId) : undefined,
  };
}

function createComposerDefaultCoreSpec(assemblyId, options = {}) {
  const binaryCount = clamp(Math.round(Number(options?.binaryCount ?? 3) || 3), 1, 3);
  const shellUnit = 0.45;
  const planeNormals = [
    [0, 1, 0],
    [1, 0, 0],
    [0, 0, 1],
  ];
  return {
    coreType: "noether",
    shells: [
      { id: `${assemblyId}_shell_1`, radius: shellUnit, role: "inner", color: "#a9d8ff", opacity: 0.12 },
      { id: `${assemblyId}_shell_2`, radius: shellUnit * 2, role: "middle", color: "#7fb9ff", opacity: 0.1 },
      { id: `${assemblyId}_shell_3`, radius: shellUnit * 3, role: "outer", color: "#5b99ea", opacity: 0.08 },
      { id: `${assemblyId}_shell_4`, radius: shellUnit * 4, role: "decorator", color: "#365f9f", opacity: 0.05 },
    ],
    binaries: [
      { radius: shellUnit, frequencyHz: 0.42, planeNormal: planeNormals[0] },
      { radius: shellUnit * 2, frequencyHz: 0.26, planeNormal: planeNormals[1] },
      { radius: shellUnit * 3, frequencyHz: 0.16, planeNormal: planeNormals[2] },
    ].slice(0, binaryCount).map((binary, index) => ({
      id: `${assemblyId}_binary_${index + 1}`,
      motion: {
        type: "orbit.circular",
        center: assemblyId,
        radius: binary.radius,
        frequencyHz: binary.frequencyHz,
        planeNormal: binary.planeNormal,
      },
    })),
    alignment: {
      regime: "3d",
      planeNormals: planeNormals.slice(0, binaryCount),
    },
  };
}

function normalizeComposerMemberPosition(rawPosition) {
  if (!Array.isArray(rawPosition) || rawPosition.length < 3) {
    return null;
  }
  const x = Number(rawPosition[0]);
  const y = Number(rawPosition[1]);
  const z = Number(rawPosition[2]);
  if (![x, y, z].every(Number.isFinite)) {
    return null;
  }
  return [x, y, z];
}

function normalizeComposerPathPoint(rawPoint) {
  if (rawPoint instanceof THREE.Vector3) {
    return [
      Number(rawPoint.x.toFixed(3)),
      Number(rawPoint.y.toFixed(3)),
      Number(rawPoint.z.toFixed(3)),
    ];
  }
  if (!Array.isArray(rawPoint) || rawPoint.length < 3) {
    return null;
  }
  const x = Number(rawPoint[0]);
  const y = Number(rawPoint[1]);
  const z = Number(rawPoint[2]);
  if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) {
    return null;
  }
  return [
    Number(x.toFixed(3)),
    Number(y.toFixed(3)),
    Number(z.toFixed(3)),
  ];
}

function normalizeComposerAssemblyPathPoints(rawPoints) {
  const source = Array.isArray(rawPoints) ? rawPoints : [];
  return source
    .map((point) => normalizeComposerPathPoint(point))
    .filter(Boolean);
}

function createComposerDefaultPathPoints(anchor = [0, 0, 0]) {
  const [baseX = 0, baseY = 0, baseZ = 0] = Array.isArray(anchor) ? anchor : [0, 0, 0];
  return [
    [baseX - 1.6, baseY, baseZ],
    [baseX - 0.5, baseY + 0.8, baseZ + 0.35],
    [baseX + 0.9, baseY + 0.25, baseZ - 0.5],
    [baseX + 2.0, baseY + 1.05, baseZ + 0.15],
  ];
}

function parseComposerMemberEntry(rawMember, index = 0) {
  if (rawMember && typeof rawMember === "object" && !Array.isArray(rawMember)) {
    const id = sanitizeComposerEntityId(rawMember.id || rawMember.name, `member_${index + 1}`);
    const position = normalizeComposerMemberPosition(rawMember.position);
    const nextMember = {
      id,
    };
    if (position) {
      nextMember.position = position;
    }
    if (rawMember.state != null) {
      nextMember.state = String(rawMember.state).trim().toLowerCase();
    }
    if (rawMember.slotKind != null) {
      nextMember.slotKind = String(rawMember.slotKind).trim().toLowerCase();
    }
    if (rawMember.slotIndex != null && Number.isFinite(Number(rawMember.slotIndex))) {
      nextMember.slotIndex = Math.max(0, Math.round(Number(rawMember.slotIndex)));
    }
    return nextMember;
  }
  const source = String(rawMember ?? "").trim();
  if (!source) {
    return null;
  }
  const match = source.match(/^(.+?)(?:\s*@\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+))?$/);
  if (!match) {
    return null;
  }
  const id = sanitizeComposerEntityId(match[1], `member_${index + 1}`);
  if (!id) {
    return null;
  }
  if (match[2] == null) {
    return { id };
  }
  const position = [Number(match[2]), Number(match[3]), Number(match[4])];
  if (!position.every(Number.isFinite)) {
    return { id };
  }
  return { id, position };
}

function normalizeComposerMemberList(rawMembers) {
  if (Array.isArray(rawMembers)) {
    return rawMembers
      .map((member, index) => parseComposerMemberEntry(member, index))
      .filter(Boolean);
  }
  if (typeof rawMembers === "string") {
    return rawMembers
      .split(/\n/)
      .map((member, index) => parseComposerMemberEntry(member, index))
      .filter(Boolean);
  }
  return [];
}

function getComposerMemberId(member, index = 0) {
  if (member && typeof member === "object" && !Array.isArray(member)) {
    return sanitizeComposerEntityId(member.id, `member_${index + 1}`);
  }
  return sanitizeComposerEntityId(member, `member_${index + 1}`);
}

function getComposerMemberPosition(member) {
  if (member && typeof member === "object" && !Array.isArray(member)) {
    return normalizeComposerMemberPosition(member.position);
  }
  return null;
}

function getComposerMemberState(member) {
  if (member && typeof member === "object" && !Array.isArray(member)) {
    const state = String(member.state ?? "").trim().toLowerCase();
    if (state === "electrino" || state === "positrino" || state === "unset") {
      return state;
    }
  }
  return "";
}

function isComposerPersonalityMember(member) {
  return (
    !!member &&
    typeof member === "object" &&
    !Array.isArray(member) &&
    String(member.slotKind ?? "").trim().toLowerCase() === "personality"
  );
}

function formatComposerMemberList(members = []) {
  return members
    .map((member, index) => {
      const id = getComposerMemberId(member, index);
      const position = getComposerMemberPosition(member);
      return position ? `${id} @ ${position[0]}, ${position[1]}, ${position[2]}` : id;
    })
    .join("\n");
}

function getNextComposerAssemblyMemberId(assembly, kind = "member") {
  const normalizedKind = sanitizeComposerEntityId(kind, "member");
  const existingIds = new Set(
    normalizeComposerMemberList(assembly?.members).map((member, index) => getComposerMemberId(member, index))
  );
  let suffix = 1;
  let candidate = `${normalizedKind}_${suffix}`;
  while (existingIds.has(candidate)) {
    suffix += 1;
    candidate = `${normalizedKind}_${suffix}`;
  }
  return candidate;
}

function getNextComposerPersonalitySlotIndex(assembly) {
  const members = normalizeComposerMemberList(assembly?.members);
  const usedSlots = new Set(
    members
      .filter((member) => isComposerPersonalityMember(member))
      .map((member, index) => Math.max(0, Number(member?.slotIndex ?? index) || 0))
  );
  let slotIndex = 0;
  while (usedSlots.has(slotIndex)) {
    slotIndex += 1;
  }
  return slotIndex;
}

function getComposerPersonalitySlotCapacity(assembly) {
  const binaryCount = Array.isArray(assembly?.core?.binaries)
    ? assembly.core.binaries.filter(Boolean).length
    : 0;
  if (binaryCount <= 1) {
    return 2;
  }
  if (binaryCount === 2) {
    return 4;
  }
  return 6;
}

function getComposerAvailablePersonalitySlotCount(assembly) {
  const capacity = getComposerPersonalitySlotCapacity(assembly);
  const usedCount = getComposerPersonalityMembers(assembly).length;
  return Math.max(0, capacity - usedCount);
}

function addComposerAssemblyMemberByKind(assembly, kind = "member") {
  if (!assembly) {
    return false;
  }
  const nextMembers = normalizeComposerMemberList(assembly.members);
  const normalizedKind = sanitizeComposerEntityId(kind, "member");
  const isChargeKind = normalizedKind === "electrino" || normalizedKind === "positrino";
  const hasCore = Array.isArray(assembly?.core?.shells) && assembly.core.shells.length > 0;
  if (isChargeKind && hasCore) {
    if (getComposerAvailablePersonalitySlotCount(assembly) <= 0) {
      setComposerStatus(
        `Personality layer is full for this core. Capacity is ${getComposerPersonalitySlotCapacity(assembly)} charge slot${
          getComposerPersonalitySlotCapacity(assembly) === 1 ? "" : "s"
        }.`
      );
      return false;
    }
    const slotIndex = getNextComposerPersonalitySlotIndex(assembly);
    nextMembers.push({
      id: `personality_${slotIndex + 1}`,
      slotKind: "personality",
      slotIndex,
      state: normalizedKind,
    });
  } else {
    nextMembers.push({ id: getNextComposerAssemblyMemberId(assembly, normalizedKind) });
  }
  assembly.members = nextMembers;
  return true;
}

function parseComposerSubassemblyEntry(rawEntry, index = 0) {
  if (rawEntry && typeof rawEntry === "object" && !Array.isArray(rawEntry)) {
    const id = sanitizeComposerEntityId(rawEntry.id || rawEntry.name, `subassembly_${index + 1}`);
    const position = normalizeComposerMemberPosition(rawEntry.position) ?? [0, 0, 0];
    const members = Array.isArray(rawEntry.members)
      ? rawEntry.members.map((memberId, memberIndex) => getComposerMemberId(memberId, memberIndex)).filter(Boolean)
      : [];
    return { id, position, members };
  }
  const source = String(rawEntry ?? "").trim();
  if (!source) {
    return null;
  }
  const match = source.match(
    /^(.+?)\s*@\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*:\s*(.+)$/
  );
  if (!match) {
    return null;
  }
  const id = sanitizeComposerEntityId(match[1], `subassembly_${index + 1}`);
  const position = [Number(match[2]), Number(match[3]), Number(match[4])];
  const members = match[5]
    .split(",")
    .map((memberId, memberIndex) => getComposerMemberId(memberId.trim(), memberIndex))
    .filter(Boolean);
  if (!position.every(Number.isFinite) || !members.length) {
    return null;
  }
  return { id, position, members: [...new Set(members)] };
}

function normalizeComposerSubassemblyList(rawSubassemblies) {
  if (Array.isArray(rawSubassemblies)) {
    return rawSubassemblies
      .map((entry, index) => parseComposerSubassemblyEntry(entry, index))
      .filter(Boolean);
  }
  if (typeof rawSubassemblies === "string") {
    return rawSubassemblies
      .split(/\n/)
      .map((entry, index) => parseComposerSubassemblyEntry(entry, index))
      .filter(Boolean);
  }
  return [];
}

function formatComposerSubassemblyList(subassemblies = []) {
  return subassemblies
    .map((entry, index) => {
      const parsed = parseComposerSubassemblyEntry(entry, index);
      if (!parsed) {
        return null;
      }
      return `${parsed.id} @ ${parsed.position[0]}, ${parsed.position[1]}, ${parsed.position[2]}: ${parsed.members.join(", ")}`;
    })
    .filter(Boolean)
    .join("\n");
}

function roundComposerTriplet(values = []) {
  return [
    Number(Number(values[0] ?? 0).toFixed(3)),
    Number(Number(values[1] ?? 0).toFixed(3)),
    Number(Number(values[2] ?? 0).toFixed(3)),
  ];
}

function getComposerSubassemblyId(entry, index = 0) {
  return sanitizeComposerEntityId(entry?.id ?? entry?.name, `subassembly_${index + 1}`);
}

function getNextComposerSubassemblyId(assembly) {
  const existingIds = new Set(
    normalizeComposerSubassemblyList(assembly?.subassemblies).map((entry, index) =>
      getComposerSubassemblyId(entry, index)
    )
  );
  let suffix = 1;
  let candidate = `subassembly_${suffix}`;
  while (existingIds.has(candidate)) {
    suffix += 1;
    candidate = `subassembly_${suffix}`;
  }
  return candidate;
}

function pruneComposerSubassemblyList(subassemblies = []) {
  return normalizeComposerSubassemblyList(subassemblies).filter(
    (entry) => Array.isArray(entry?.members) && entry.members.length
  );
}

function getComposerAssemblySubassemblyIndex(assembly, subassemblyId) {
  const subassemblies = normalizeComposerSubassemblyList(assembly?.subassemblies);
  return subassemblies.findIndex((entry, index) => getComposerSubassemblyId(entry, index) === subassemblyId);
}

function getComposerMemberSubassemblyId(assembly, memberId) {
  const normalizedMemberId = sanitizeComposerEntityId(memberId, "");
  if (!normalizedMemberId) {
    return "";
  }
  const subassemblies = normalizeComposerSubassemblyList(assembly?.subassemblies);
  const match = subassemblies.find((entry) => Array.isArray(entry?.members) && entry.members.includes(normalizedMemberId));
  return match ? getComposerSubassemblyId(match) : "";
}

function ensureComposerAssemblyMemberRecord(assembly, memberId) {
  if (!assembly) {
    return null;
  }
  const normalizedMemberId = sanitizeComposerEntityId(memberId, "");
  if (!normalizedMemberId) {
    return null;
  }
  const members = normalizeComposerMemberList(assembly.members);
  const memberIndex = members.findIndex(
    (entry, index) => getComposerMemberId(entry, index) === normalizedMemberId
  );
  if (memberIndex === -1) {
    return null;
  }
  const member = members[memberIndex];
  members[memberIndex] =
    member && typeof member === "object" && !Array.isArray(member)
      ? { ...member, id: normalizedMemberId }
      : { id: normalizedMemberId };
  assembly.members = members;
  return assembly.members[memberIndex];
}

function resolveComposerAssemblyMemberLocalOffset(assembly, memberId) {
  const normalizedMemberId = sanitizeComposerEntityId(memberId, "");
  if (!normalizedMemberId) {
    return [0, 0, 0];
  }
  const members = normalizeComposerMemberList(assembly?.members);
  const subassemblies = normalizeComposerSubassemblyList(assembly?.subassemblies);
  const memberMap = new Map(
    members.map((entry, index) => [getComposerMemberId(entry, index), entry])
  );
  const memberEntry = memberMap.get(normalizedMemberId);
  if (!memberEntry) {
    return [0, 0, 0];
  }
  const ownerSubassembly = subassemblies.find(
    (entry) => Array.isArray(entry?.members) && entry.members.includes(normalizedMemberId)
  );
  if (ownerSubassembly) {
    const childMembers = members.filter((entry, index) =>
      (ownerSubassembly.members ?? []).includes(getComposerMemberId(entry, index))
    );
    const childIndex = childMembers.findIndex(
      (entry, index) => getComposerMemberId(entry, index) === normalizedMemberId
    );
    const childRadius = 0.11 + Math.min(childMembers.length, 6) * 0.016;
    const childPosition = normalizeComposerMemberPosition(ownerSubassembly.position) ?? [0, 0, 0];
    const localOffset = memberEntry.position
      ? memberEntry.position
      : [
          getComposerProxyMemberOffset(childIndex, childMembers.length, childRadius).x,
          getComposerProxyMemberOffset(childIndex, childMembers.length, childRadius).y,
          getComposerProxyMemberOffset(childIndex, childMembers.length, childRadius).z,
        ];
    return roundComposerTriplet([
      Number(childPosition[0] ?? 0) + Number(localOffset[0] ?? 0),
      Number(childPosition[1] ?? 0) + Number(localOffset[1] ?? 0),
      Number(childPosition[2] ?? 0) + Number(localOffset[2] ?? 0),
    ]);
  }
  const childMemberIds = new Set(subassemblies.flatMap((entry) => entry?.members ?? []));
  const rootMembers = members.filter((entry, index) => !childMemberIds.has(getComposerMemberId(entry, index)));
  const rootIndex = rootMembers.findIndex(
    (entry, index) => getComposerMemberId(entry, index) === normalizedMemberId
  );
  const baseRadius = 0.17 + Math.min(members.length, 8) * 0.018;
  if (memberEntry.position) {
    return roundComposerTriplet(memberEntry.position);
  }
  const fallbackOffset = getComposerProxyMemberOffset(rootIndex, rootMembers.length, baseRadius);
  return roundComposerTriplet([fallbackOffset.x, fallbackOffset.y, fallbackOffset.z]);
}

function setComposerAssemblyMemberPosition(assembly, memberId, position, subassemblyId = "") {
  const normalizedMemberId = sanitizeComposerEntityId(memberId, "");
  if (!normalizedMemberId) {
    return false;
  }
  const memberRecord = ensureComposerAssemblyMemberRecord(assembly, normalizedMemberId);
  if (!memberRecord) {
    return false;
  }
  const nextPosition = roundComposerTriplet(position);
  memberRecord.position = nextPosition;
  if (subassemblyId) {
    const subassemblies = normalizeComposerSubassemblyList(assembly?.subassemblies);
    const subassemblyIndex = subassemblies.findIndex(
      (entry, index) => getComposerSubassemblyId(entry, index) === subassemblyId
    );
    if (subassemblyIndex === -1) {
      return false;
    }
    assembly.subassemblies = subassemblies;
  }
  return true;
}

function setComposerSubassemblyPosition(assembly, subassemblyId, position) {
  const normalizedSubassemblyId = sanitizeComposerEntityId(subassemblyId, "");
  if (!assembly || !normalizedSubassemblyId) {
    return false;
  }
  const subassemblies = normalizeComposerSubassemblyList(assembly?.subassemblies);
  const subassemblyIndex = subassemblies.findIndex(
    (entry, index) => getComposerSubassemblyId(entry, index) === normalizedSubassemblyId
  );
  if (subassemblyIndex === -1) {
    return false;
  }
  subassemblies[subassemblyIndex].position = roundComposerTriplet(position);
  assembly.subassemblies = subassemblies;
  return true;
}

function moveComposerMemberToRoot(assembly, memberId) {
  const normalizedMemberId = sanitizeComposerEntityId(memberId, "");
  if (!normalizedMemberId) {
    return false;
  }
  const localOffset = resolveComposerAssemblyMemberLocalOffset(assembly, normalizedMemberId);
  const subassemblies = normalizeComposerSubassemblyList(assembly?.subassemblies).map((entry) => ({
    ...entry,
    members: (entry.members ?? []).filter((entryMemberId) => entryMemberId !== normalizedMemberId),
  }));
  assembly.subassemblies = pruneComposerSubassemblyList(subassemblies);
  return setComposerAssemblyMemberPosition(assembly, normalizedMemberId, localOffset);
}

function moveComposerMemberToSubassembly(assembly, memberId, targetSubassemblyId) {
  const normalizedMemberId = sanitizeComposerEntityId(memberId, "");
  const normalizedTargetId = sanitizeComposerEntityId(targetSubassemblyId, "");
  if (!normalizedMemberId || !normalizedTargetId) {
    return false;
  }
  const localOffset = resolveComposerAssemblyMemberLocalOffset(assembly, normalizedMemberId);
  const subassemblies = normalizeComposerSubassemblyList(assembly?.subassemblies).map((entry, index) => ({
    ...entry,
    id: getComposerSubassemblyId(entry, index),
    members: (entry.members ?? []).filter((entryMemberId) => entryMemberId !== normalizedMemberId),
  }));
  const subassemblyIndex = subassemblies.findIndex((entry) => entry.id === normalizedTargetId);
  if (subassemblyIndex === -1) {
    return false;
  }
  const childPosition = normalizeComposerMemberPosition(subassemblies[subassemblyIndex].position) ?? [0, 0, 0];
  subassemblies[subassemblyIndex].members = [...new Set([...(subassemblies[subassemblyIndex].members ?? []), normalizedMemberId])];
  assembly.subassemblies = pruneComposerSubassemblyList(subassemblies);
  return setComposerAssemblyMemberPosition(assembly, normalizedMemberId, [
    Number(localOffset[0] ?? 0) - Number(childPosition[0] ?? 0),
    Number(localOffset[1] ?? 0) - Number(childPosition[1] ?? 0),
    Number(localOffset[2] ?? 0) - Number(childPosition[2] ?? 0),
  ]);
}

function createComposerSubassemblyFromMembers(assembly, memberIds = []) {
  const normalizedMemberIds = [...new Set(
    (Array.isArray(memberIds) ? memberIds : [])
      .map((memberId) => sanitizeComposerEntityId(memberId, ""))
      .filter(Boolean)
  )];
  if (!assembly || !normalizedMemberIds.length) {
    return null;
  }
  const memberOffsets = normalizedMemberIds.map((memberId) =>
    resolveComposerAssemblyMemberLocalOffset(assembly, memberId)
  );
  const centroid = memberOffsets.reduce(
    (accumulator, offset) => [
      accumulator[0] + Number(offset[0] ?? 0),
      accumulator[1] + Number(offset[1] ?? 0),
      accumulator[2] + Number(offset[2] ?? 0),
    ],
    [0, 0, 0]
  ).map((value) => value / normalizedMemberIds.length);
  const nextId = getNextComposerSubassemblyId(assembly);
  const subassemblies = normalizeComposerSubassemblyList(assembly?.subassemblies).map((entry) => ({
    ...entry,
    members: (entry.members ?? []).filter((memberId) => !normalizedMemberIds.includes(memberId)),
  }));
  subassemblies.push({
    id: nextId,
    position: roundComposerTriplet(centroid),
    members: normalizedMemberIds,
  });
  assembly.subassemblies = pruneComposerSubassemblyList(subassemblies);
  normalizedMemberIds.forEach((memberId, index) => {
    const offset = memberOffsets[index] ?? [0, 0, 0];
    setComposerAssemblyMemberPosition(assembly, memberId, [
      Number(offset[0] ?? 0) - Number(centroid[0] ?? 0),
      Number(offset[1] ?? 0) - Number(centroid[1] ?? 0),
      Number(offset[2] ?? 0) - Number(centroid[2] ?? 0),
    ], nextId);
  });
  return nextId;
}

function dissolveComposerSubassembly(assembly, subassemblyId) {
  const normalizedSubassemblyId = sanitizeComposerEntityId(subassemblyId, "");
  if (!assembly || !normalizedSubassemblyId) {
    return false;
  }
  const subassemblies = normalizeComposerSubassemblyList(assembly?.subassemblies);
  const subassembly = subassemblies.find(
    (entry, index) => getComposerSubassemblyId(entry, index) === normalizedSubassemblyId
  );
  if (!subassembly) {
    return false;
  }
  const memberIds = Array.isArray(subassembly.members) ? [...subassembly.members] : [];
  memberIds.forEach((memberId) => {
    moveComposerMemberToRoot(assembly, memberId);
  });
  assembly.subassemblies = pruneComposerSubassemblyList(
    normalizeComposerSubassemblyList(assembly?.subassemblies).filter(
      (entry, index) => getComposerSubassemblyId(entry, index) !== normalizedSubassemblyId
    )
  );
  return true;
}

function removeComposerAssemblyMember(assembly, memberId) {
  const normalizedMemberId = sanitizeComposerEntityId(memberId, "");
  if (!assembly || !normalizedMemberId) {
    return false;
  }
  assembly.members = normalizeComposerMemberList(assembly?.members).filter(
    (entry, index) => getComposerMemberId(entry, index) !== normalizedMemberId
  );
  assembly.subassemblies = pruneComposerSubassemblyList(
    normalizeComposerSubassemblyList(assembly?.subassemblies).map((entry) => ({
      ...entry,
      members: (entry.members ?? []).filter((entryMemberId) => entryMemberId !== normalizedMemberId),
    }))
  );
  return true;
}

function normalizeComposerAssemblyDraft(draft = {}, index = 0) {
  const fallback = createDefaultComposerAssemblyDraft(index);
  const name = String(draft.name ?? draft.label ?? fallback.name).trim() || fallback.name;
  const id = sanitizeComposerEntityId(draft.id || name, fallback.id);
  const position = Array.isArray(draft.position)
    ? [
        Number(draft.position[0] ?? 0) || 0,
        Number(draft.position[1] ?? 0) || 0,
        Number(draft.position[2] ?? 0) || 0,
      ]
    : [0, 0, 0];
  return {
    id,
    name,
    role: draft.role || fallback.role || "assembly",
    sceneRole: normalizeComposerAssemblySceneRole(draft.sceneRole ?? fallback.sceneRole),
    parentId: draft.parentId ? sanitizeComposerEntityId(draft.parentId, "") : "",
    position,
    members: normalizeComposerMemberList(draft.members),
    subassemblies: normalizeComposerSubassemblyList(draft.subassemblies),
    pathPoints: normalizeComposerAssemblyPathPoints(draft.pathPoints ?? fallback.pathPoints),
    pathInterpolate: draft.pathInterpolate === "polyline" ? "polyline" : fallback.pathInterpolate,
    pathClosed: !!draft.pathClosed,
    historyTraceEnabled: !!draft.historyTraceEnabled,
    envelopeEnabled: !!draft.envelopeEnabled,
    core: draft.core,
  };
}

function ensureComposerAssemblyDrafts() {
  if (!Array.isArray(composerAssemblyDrafts) || !composerAssemblyDrafts.length) {
    composerAssemblyDrafts = [];
    return;
  }
  composerAssemblyDrafts = composerAssemblyDrafts.map((draft, index) =>
    normalizeComposerAssemblyDraft(draft, index)
  );
}

function normalizeComposerTransferEndpoint(rawEndpoint) {
  if (!rawEndpoint) {
    return null;
  }
  if (typeof rawEndpoint === "object") {
    const assemblyId = sanitizeComposerEntityId(rawEndpoint.assemblyId, "");
    const memberId = sanitizeComposerEntityId(rawEndpoint.memberId, "");
    return assemblyId && memberId ? { assemblyId, memberId } : null;
  }
  const match = String(rawEndpoint)
    .trim()
    .match(/^([a-zA-Z0-9_-]+)[.:/]([a-zA-Z0-9_-]+)$/);
  if (!match) {
    return null;
  }
  const assemblyId = sanitizeComposerEntityId(match[1], "");
  const memberId = sanitizeComposerEntityId(match[2], "");
  return assemblyId && memberId ? { assemblyId, memberId } : null;
}

function parseComposerTransfers(rawText) {
  return parseComposerTimingLines(rawText, (line, lineNumber) => {
    const [mappingPart, rawTimePart] = line.split("@").map((part) => part.trim());
    const mappingMatch = mappingPart.match(/^(.+?)\s*->\s*(.+)$/);
    if (!mappingMatch) {
      return null;
    }
    const source = normalizeComposerTransferEndpoint(mappingMatch[1]);
    const target = normalizeComposerTransferEndpoint(mappingMatch[2]);
    if (!source || !target) {
      return null;
    }
    let t = null;
    if (rawTimePart) {
      const parsedTime = Number(rawTimePart);
      if (!Number.isFinite(parsedTime)) {
        return null;
      }
      t = Number(parsedTime.toFixed(3));
    }
    return {
      id: `transfer_authored_${lineNumber}`,
      source,
      target,
      t,
    };
  });
}

function formatComposerTransferList(transfers = []) {
  return transfers
    .map((transfer) => {
      const source = `${transfer?.source?.assemblyId ?? ""}.${transfer?.source?.memberId ?? ""}`;
      const target = `${transfer?.target?.assemblyId ?? ""}.${transfer?.target?.memberId ?? ""}`;
      const suffix = Number.isFinite(Number(transfer?.t)) ? ` @ ${Number(transfer.t)}` : "";
      return `${source} -> ${target}${suffix}`;
    })
    .join("\n");
}

function normalizeComposerReactionTransferRef(rawRef, transferById) {
  const token = String(rawRef ?? "").trim();
  if (!token) {
    return null;
  }
  const explicitId = sanitizeComposerEntityId(token, "");
  if (explicitId && transferById.has(explicitId)) {
    return explicitId;
  }
  if (/^\d+$/.test(token)) {
    const lineId = `transfer_authored_${Number(token)}`;
    return transferById.has(lineId) ? lineId : null;
  }
  return null;
}

function formatComposerTransferEndpointLabel(endpoint) {
  const assemblyId = String(endpoint?.assemblyId ?? "").trim();
  const memberId = String(endpoint?.memberId ?? "").trim();
  if (!assemblyId || !memberId) {
    return "unknown";
  }
  return `${assemblyId}.${memberId}`;
}

function describeComposerTransferProvenance(transfer, refLabel = "") {
  if (!transfer) {
    return null;
  }
  const prefix = refLabel ? `${refLabel}: ` : "";
  return `${prefix}${formatComposerTransferEndpointLabel(transfer.source)} -> ${formatComposerTransferEndpointLabel(transfer.target)}`;
}

function getComposerTimelineAuthoringItems(documentData = composerCurrentDocument) {
  return getComposerTimelineAuthoringItemsRuntime(documentData, {
    getGraphicLabel: getComposerGraphicOverlayLabel,
    getMediaLabel: getComposerMediaOverlayLabel,
  });
}

function findComposerTimelineOverlap(candidate, options = {}) {
  return findComposerTimelineOverlapRuntime(candidate, {
    ...options,
    getGraphicLabel: getComposerGraphicOverlayLabel,
    getMediaLabel: getComposerMediaOverlayLabel,
  });
}

function reportComposerTimelineOverlap(conflict) {
  if (!conflict) {
    return;
  }
  setComposerStatus(
    `Timeline items may not overlap. ${conflict.label} already occupies ${formatComposerTimeLabel(conflict.start)}-${formatComposerTimeLabel(conflict.end)}.`
  );
}

function getComposerGraphicEnd(marker, sceneDuration = null) {
  const start = Number(marker?.t ?? 0);
  const explicitEnd = Number(marker?.end);
  const end = Number.isFinite(explicitEnd) ? explicitEnd : start;
  if (!Number.isFinite(sceneDuration)) {
    return end;
  }
  return clamp(end, start, Number(sceneDuration));
}

function sanitizeComposerGraphicTarget(rawTarget, fallbackAssemblyId = "") {
  if (!rawTarget || typeof rawTarget !== "object") {
    return fallbackAssemblyId ? { type: "assembly", assemblyId: fallbackAssemblyId } : null;
  }
  const type = String(rawTarget.type ?? "").trim().toLowerCase();
  if (type === "assembly") {
    const assemblyId = sanitizeComposerEntityId(rawTarget.assemblyId, "");
    return assemblyId ? { type: "assembly", assemblyId } : null;
  }
  if (type === "path_point") {
    const assemblyId = sanitizeComposerEntityId(rawTarget.assemblyId, "");
    const pointIndex = Math.max(0, Math.round(Number(rawTarget.pointIndex ?? 0) || 0));
    return assemblyId ? { type: "path_point", assemblyId, pointIndex } : null;
  }
  return fallbackAssemblyId ? { type: "assembly", assemblyId: fallbackAssemblyId } : null;
}

function getComposerGraphicDefaultTarget() {
  const selectedAssemblyId = sanitizeComposerEntityId(composerSelectedAssemblyId, "");
  const fallbackAssemblyId = sanitizeComposerEntityId(composerAssemblyDrafts[0]?.id, "");
  const assemblyId = selectedAssemblyId || fallbackAssemblyId;
  if (!assemblyId) {
    return null;
  }
  if (Number.isInteger(composerSelectedPointIndex) && composerSelectedPointIndex >= 0) {
    return {
      type: "path_point",
      assemblyId,
      pointIndex: composerSelectedPointIndex,
    };
  }
  return {
    type: "assembly",
    assemblyId,
  };
}

function encodeComposerGraphicTargetValue(target) {
  if (!target?.type) {
    return "";
  }
  if (target.type === "assembly") {
    return `assembly:${target.assemblyId}`;
  }
  if (target.type === "path_point") {
    return `path_point:${target.assemblyId}:${Math.max(0, Number(target.pointIndex ?? 0) || 0)}`;
  }
  return "";
}

function decodeComposerGraphicTargetValue(rawValue) {
  const value = String(rawValue ?? "").trim();
  if (!value) {
    return null;
  }
  const [type, assemblyId, pointIndex] = value.split(":");
  if (type === "assembly") {
    return sanitizeComposerGraphicTarget({ type, assemblyId });
  }
  if (type === "path_point") {
    return sanitizeComposerGraphicTarget({ type, assemblyId, pointIndex });
  }
  return null;
}

function getComposerGraphicTargetEntries() {
  const entries = [];
  composerAssemblyDrafts.forEach((assembly, index) => {
    if (!assembly?.id) {
      return;
    }
    const assemblyLetter = getComposerAssemblyLetter(index);
    entries.push({
      value: encodeComposerGraphicTargetValue({
        type: "assembly",
        assemblyId: assembly.id,
      }),
      label: `Assembly ${assemblyLetter}`,
    });
    const pathPoints = normalizeComposerAssemblyPathPoints(assembly?.pathPoints);
    pathPoints.forEach((_point, pointIndex) => {
      entries.push({
        value: encodeComposerGraphicTargetValue({
          type: "path_point",
          assemblyId: assembly.id,
          pointIndex,
        }),
        label: `Path ${assemblyLetter} Point ${pointIndex + 1}`,
      });
    });
  });
  return entries;
}

function getComposerGraphicDefaultOffset(size = 0.42) {
  const radius = Math.max(0.18, Number(size) || 0.42);
  return [
    Number((radius * 1.45).toFixed(3)),
    Number((radius * 1.08).toFixed(3)),
    0,
  ];
}

function createComposerPersonalityMembers(states = []) {
  return Array.from({ length: 6 }, (_, index) => ({
    id: `personality_${index + 1}`,
    slotKind: "personality",
    slotIndex: index,
    state: (() => {
      const state = String(states[index] ?? "unset").trim().toLowerCase();
      return state === "electrino" || state === "positrino" ? state : "unset";
    })(),
  }));
}

function createComposerGenIFermionPersonalityMembers() {
  return createComposerPersonalityMembers();
}

function getComposerBuiltInPersonalityStates(templateId) {
  if (templateId === "electron") {
    return Array.from({ length: 6 }, () => "electrino");
  }
  if (templateId === "up_quark") {
    return [
      "positrino",
      "electrino",
      "positrino",
      "positrino",
      "positrino",
      "positrino",
    ];
  }
  if (templateId === "down_quark") {
    return [
      "positrino",
      "positrino",
      "electrino",
      "electrino",
      "electrino",
      "electrino",
    ];
  }
  return [];
}

function getComposerOverlayKind(overlay) {
  const kind = String(overlay?.kind ?? "graphic").trim().toLowerCase();
  return kind === "image" || kind === "video" || kind === "audio" ? kind : "graphic";
}

function getComposerMediaDefaultRect(kind = "image") {
  return kind === "video"
    ? { x: 0.62, y: 0.14, width: 0.26, height: 0.146 }
    : { x: 0.6, y: 0.16, width: 0.24, height: 0.24 };
}

function normalizeComposerMediaRect(rawRect, kind = "image") {
  const fallback = getComposerMediaDefaultRect(kind);
  const x = clamp(Number(rawRect?.x ?? fallback.x) || fallback.x, 0, 0.92);
  const y = clamp(Number(rawRect?.y ?? fallback.y) || fallback.y, 0, 0.92);
  const width = clamp(Number(rawRect?.width ?? fallback.width) || fallback.width, 0.08, 0.86);
  const height = clamp(Number(rawRect?.height ?? fallback.height) || fallback.height, 0.08, 0.86);
  return {
    x: Number(Math.min(x, 1 - width).toFixed(4)),
    y: Number(Math.min(y, 1 - height).toFixed(4)),
    width: Number(width.toFixed(4)),
    height: Number(height.toFixed(4)),
  };
}

function sanitizeComposerMediaSource(rawSource, kind = "image") {
  const source = String(rawSource ?? "").trim();
  if (!source) {
    return "";
  }
  const normalized = source.replace(/\\/g, "/");
  const extension = normalized.includes(".")
    ? normalized.slice(normalized.lastIndexOf(".") + 1).toLowerCase()
    : "";
  const supported = composerSupportedMediaExtensions[kind] ?? [];
  return supported.includes(extension) ? normalized : "";
}

function getComposerMediaOverlayLabel(overlay) {
  const source = String(overlay?.source ?? "").trim();
  const label = String(overlay?.label ?? "").trim();
  const base = label || (source ? source.split("/").pop() ?? "" : "") || (getComposerOverlayKind(overlay) === "video" ? "Video" : "Image");
  return base.length > 24 ? `${base.slice(0, 24).trimEnd()}...` : base;
}

function getComposerGraphicOverlayLabel(overlay) {
  const text = String(overlay?.label ?? overlay?.text ?? "Graphic").trim() || "Graphic";
  return text.length > 24 ? `${text.slice(0, 24).trimEnd()}...` : text;
}

function normalizeComposerGraphicOverlayDraft(overlay = {}, index = 0, duration = 24) {
  const kind = getComposerOverlayKind(overlay);
  const fallbackTarget = getComposerGraphicDefaultTarget();
  const span = clampComposerTimelineSpan(
    overlay?.start ?? 0,
    overlay?.end ?? composerTimelineMinDurationSeconds,
    duration
  );
  if (kind === "image" || kind === "video" || kind === "audio") {
    const source = sanitizeComposerMediaSource(
      overlay?.source,
      kind
    );
    const fallbackDirectory = composerMediaAssetDirectories[kind] ?? "";
    const rect = normalizeComposerMediaRect(overlay?.rect, kind);
    const label = getComposerMediaOverlayLabel({
      ...overlay,
      kind,
      source: source || fallbackDirectory,
    });
    return {
      id: sanitizeComposerEntityId(overlay?.id, `overlay_${index + 1}`),
      kind,
      type: `viewport_${kind}`,
      label,
      text: "",
      start: span.start,
      end: span.end,
      size: Number((overlay?.size ?? 1).toFixed?.(3) ?? 1),
      rect,
      source,
      fit: "contain",
      muted: true,
      offset: [0, 0, 0],
      target: null,
      style: typeof overlay?.style === "object" && overlay.style ? { ...overlay.style } : {},
    };
  }
  const size = clamp(Number(overlay?.size ?? overlay?.radius ?? 0.42) || 0.42, 0.18, 2.4);
  const target = sanitizeComposerGraphicTarget(overlay?.target, fallbackTarget?.assemblyId ?? "");
  const offsetSource = Array.isArray(overlay?.offset) && overlay.offset.length >= 3
    ? overlay.offset
    : getComposerGraphicDefaultOffset(size);
  const label = String(overlay?.label ?? overlay?.text ?? `Graphic ${index + 1}`).trim() || `Graphic ${index + 1}`;
  return {
    id: sanitizeComposerEntityId(overlay?.id, `overlay_${index + 1}`),
    kind: "graphic",
    type: "text_sphere_callout",
    label,
    text: String(overlay?.text ?? label).trim() || label,
    start: span.start,
    end: span.end,
    size: Number(size.toFixed(3)),
    offset: [
      Number((Number(offsetSource[0] ?? 0) || 0).toFixed(3)),
      Number((Number(offsetSource[1] ?? 0) || 0).toFixed(3)),
      Number((Number(offsetSource[2] ?? 0) || 0).toFixed(3)),
    ],
    target,
    style: typeof overlay?.style === "object" && overlay.style ? { ...overlay.style } : {},
  };
}

function normalizeComposerGraphicOverlayList(overlays = [], duration = 24) {
  return (Array.isArray(overlays) ? overlays : []).map((overlay, index) =>
    normalizeComposerGraphicOverlayDraft(overlay, index, duration)
  );
}

function getComposerGraphicOverlayDraftIndexById(overlayId) {
  return composerGraphicOverlayDrafts.findIndex((overlay) => overlay?.id === overlayId);
}

function getComposerGraphicOverlayDraftById(overlayId) {
  const index = getComposerGraphicOverlayDraftIndexById(overlayId);
  return index >= 0 ? composerGraphicOverlayDrafts[index] : null;
}

function getNextComposerGraphicOverlayId() {
  let suffix = 1;
  let candidate = "overlay_1";
  const existingIds = new Set((composerGraphicOverlayDrafts || []).map((overlay) => overlay?.id).filter(Boolean));
  while (existingIds.has(candidate)) {
    suffix += 1;
    candidate = `overlay_${suffix}`;
  }
  return candidate;
}

function getComposerGraphicTimelineOverlays(documentData = composerCurrentDocument) {
  return (Array.isArray(documentData?.overlays) ? documentData.overlays : []).filter(
    (overlay) => overlay?.kind === "graphic"
  );
}

function getComposerViewportMediaTimelineOverlays(documentData = composerCurrentDocument) {
  return (Array.isArray(documentData?.overlays) ? documentData.overlays : []).filter(
    (overlay) => overlay?.kind === "image" || overlay?.kind === "video"
  );
}

function isComposerTimeWithinSpan(timeSeconds, startSeconds, endSeconds, epsilon = 0.001) {
  const time = Number(timeSeconds);
  const start = Number(startSeconds);
  const end = Number(endSeconds);
  if (!Number.isFinite(time) || !Number.isFinite(start) || !Number.isFinite(end)) {
    return false;
  }
  return time >= start - epsilon && time <= end + epsilon;
}

function resolveComposerGraphicTargetPosition(target, assemblyCenters = new Map(), documentData = composerCurrentDocument) {
  if (!target) {
    return null;
  }
  if (target.type === "assembly") {
    return assemblyCenters.get(target.assemblyId)?.clone?.() ?? null;
  }
  if (target.type === "path_point") {
    const paths = Array.isArray(documentData?.paths) ? documentData.paths : [];
    const path = paths.find((entry) => entry?.metadata?.ownerAssemblyId === target.assemblyId);
    const point = Array.isArray(path?.payload?.points)
      ? path.payload.points[Math.max(0, Number(target.pointIndex ?? 0) || 0)]
      : null;
    return point ? vectorFromTriplet(point) : null;
  }
  return null;
}

function getComposerAssemblyGraphicTargetRadius(assembly) {
  if (!assembly) {
    return 0;
  }
  const shellRadii = Array.isArray(assembly?.core?.shells)
    ? assembly.core.shells
        .map((shell) => Number(shell?.radius ?? 0) || 0)
        .filter((radius) => radius > 0)
    : [];
  if (shellRadii.length) {
    return Math.max(...shellRadii);
  }

  if (isComposerBareArchitrinoAssembly(assembly)) {
    return 0.052;
  }

  const members = normalizeComposerMemberList(assembly?.members);
  const baseRadius = 0.17 + Math.min(members.length, 8) * 0.018;
  const subassemblies = normalizeComposerSubassemblyList(assembly?.subassemblies);
  const childRadius = subassemblies.reduce((maxRadius, child) => {
    const childPosition = vectorFromTriplet(child?.position ?? child?.transform?.position ?? [0, 0, 0]);
    const childMembers = Array.isArray(child?.members) ? child.members : [];
    const radius = 0.11 + Math.min(childMembers.length, 6) * 0.016;
    return Math.max(maxRadius, childPosition.length() + radius);
  }, 0);
  return Math.max(baseRadius, childRadius);
}

function updateComposerHudViewportToggleState() {
  composerHudViewportToggleBindings.forEach(({ button, key, label }) => {
    if (!button) {
      return;
    }
    const isOn = isComposerViewportDisplayFlagEnabled(key);
    button.setAttribute("aria-pressed", isOn ? "true" : "false");
    button.classList.toggle("is-active", isOn);
    button.textContent = label;
  });
}

function isComposerViewportDisplayFlagEnabled(key) {
  return composerViewportDisplayState[key] !== false;
}

function setComposerViewportDisplayFlag(key, value) {
  composerViewportDisplayState[key] = !!value;
}

function toggleComposerViewportDisplayFlag(key) {
  const nextValue = !isComposerViewportDisplayFlagEnabled(key);
  setComposerViewportDisplayFlag(key, nextValue);
  return nextValue;
}

function resolveComposerGraphicTargetContactPosition(
  target,
  overlayCenter,
  assemblyCenters = new Map(),
  documentData = composerCurrentDocument
) {
  const targetPosition = resolveComposerGraphicTargetPosition(target, assemblyCenters, documentData);
  if (!targetPosition) {
    return null;
  }
  if (target?.type !== "assembly") {
    return targetPosition;
  }
  const assemblies = Array.isArray(documentData?.assemblies) ? documentData.assemblies : [];
  const assembly = assemblies.find((entry) => entry?.id === target.assemblyId);
  const radius = getComposerAssemblyGraphicTargetRadius(assembly);
  if (!(radius > 0)) {
    return targetPosition;
  }
  const direction = overlayCenter.clone().sub(targetPosition);
  if (direction.lengthSq() <= 0.000001) {
    return targetPosition.clone().add(new THREE.Vector3(radius, 0, 0));
  }
  return targetPosition.clone().add(direction.normalize().multiplyScalar(radius));
}

function getComposerAssemblyLetter(index = 0) {
  let value = Math.max(0, Number(index) || 0);
  let label = "";
  do {
    label = String.fromCharCode(65 + (value % 26)) + label;
    value = Math.floor(value / 26) - 1;
  } while (value >= 0);
  return label;
}

function getComposerPrimaryPathAssemblyLetter() {
  const documentData = composerCurrentDocument;
  const primaryPathId = documentData?.paths?.[0]?.id ?? null;
  const assemblies = Array.isArray(documentData?.assemblies) ? documentData.assemblies : [];
  if (!primaryPathId || !assemblies.length) {
    return getComposerAssemblyLetter(0);
  }
  const ownerIndex = assemblies.findIndex((assembly) => {
    const motions = Array.isArray(assembly?.motion)
      ? assembly.motion
      : assembly?.motion
        ? [assembly.motion]
        : [];
    return motions.some((motion) => motion?.type === "path.transport" && motion?.pathId === primaryPathId);
  });
  return getComposerAssemblyLetter(ownerIndex >= 0 ? ownerIndex : 0);
}

function getComposerSelectedAssembly() {
  ensureComposerAssemblyDrafts();
  return getComposerAssemblyDraftById(composerSelectedAssemblyId) ?? composerAssemblyDrafts[0] ?? null;
}

function isComposerBareArchitrinoAssembly(assembly) {
  const members = normalizeComposerMemberList(assembly?.members);
  const children = Array.isArray(assembly?.children) ? assembly.children : [];
  const subassemblies = normalizeComposerSubassemblyList(assembly?.subassemblies);
  const hasCore =
    Array.isArray(assembly?.core?.shells) && assembly.core.shells.length > 0;
  const role = String(assembly?.role ?? "").trim().toLowerCase();
  const normalizedMemberId = members.length ? getComposerMemberId(members[0], 0).toLowerCase() : "";
  const isNamedBareCharge =
    role === "electrino" ||
    role === "positrino" ||
    normalizedMemberId.startsWith("electrino") ||
    normalizedMemberId.startsWith("positrino");
  return !hasCore && !children.length && !subassemblies.length && members.length === 1 && isNamedBareCharge;
}

function normalizeComposerAssemblySceneRole(rawRole = "assembly") {
  const normalized = String(rawRole ?? "").trim().toLowerCase();
  return normalized === "reactant" || normalized === "product" ? normalized : "assembly";
}

function getComposerAssemblySceneRoleLabel(rawRole = "assembly") {
  const normalized = normalizeComposerAssemblySceneRole(rawRole);
  if (normalized === "reactant") {
    return "Reactant";
  }
  if (normalized === "product") {
    return "Product";
  }
  return "Assembly";
}

function getComposerAssemblySceneRoleGlyph(rawRole = "assembly") {
  const normalized = normalizeComposerAssemblySceneRole(rawRole);
  if (normalized === "reactant") {
    return "R";
  }
  if (normalized === "product") {
    return "P";
  }
  return "A";
}

function getComposerAssemblySceneRoleColor(rawRole = "assembly") {
  const normalized = normalizeComposerAssemblySceneRole(rawRole);
  if (normalized === "reactant") {
    return linkColors.reactant;
  }
  if (normalized === "product") {
    return linkColors.product;
  }
  return "#ffc26a";
}

function getComposerAssemblyViewportLabel(assembly, index = 0) {
  return `${getComposerAssemblySceneRoleGlyph(assembly?.sceneRole)}${index + 1}`;
}

function normalizeComposerTimelineAddType(rawType = "graphic") {
  const requestedAddType = String(rawType ?? "graphic").trim().toLowerCase();
  return composerTimelineAddTypeIds.has(requestedAddType) ? requestedAddType : "graphic";
}

function getComposerTimelineEditKindTitle(editKind = "add") {
  if (editKind === "add") {
    return "Add";
  }
  if (editKind === "graphic") {
    return "Graphic";
  }
  if (editKind === "image") {
    return "Image";
  }
  if (editKind === "video") {
    return "Video";
  }
  if (editKind === "pause") {
    return "Pause";
  }
  if (editKind === "warp") {
    return "Warp";
  }
  return "Reaction";
}

function ensureComposerAssemblyDraftsForReactionUi() {
  ensureComposerAssemblyDrafts();
  const reactants = [];
  const products = [];
  composerAssemblyDrafts.forEach((assembly, index) => {
    const label = assembly?.name?.trim() || getComposerAssemblyViewportLabel(assembly, index);
    const sceneRole = normalizeComposerAssemblySceneRole(assembly?.sceneRole);
    if (sceneRole === "reactant") {
      reactants.push(label);
    } else if (sceneRole === "product") {
      products.push(label);
    }
  });
  return { reactants, products };
}

function getComposerSelectedAssemblyLetter() {
  ensureComposerAssemblyDrafts();
  const index = composerAssemblyDrafts.findIndex((assembly) => assembly?.id === composerSelectedAssemblyId);
  return getComposerAssemblyLetter(index >= 0 ? index : 0);
}

function getComposerTransferListRaw() {
  return composerTransferListInput?.value ?? composerTransferListRawState ?? "";
}

function setComposerTransferListRaw(value = "") {
  composerTransferListRawState = String(value ?? "");
  if (composerTransferListInput) {
    composerTransferListInput.value = composerTransferListRawState;
  }
}

function getComposerReactionListRaw() {
  return composerReactionListInput?.value ?? composerReactionListRawState ?? "";
}

function setComposerReactionListRaw(value = "") {
  composerReactionListRawState = String(value ?? "");
  if (composerReactionListInput) {
    composerReactionListInput.value = composerReactionListRawState;
  }
}

function persistComposerPathStateToAssembly(assemblyId) {
  const assembly = getComposerAssemblyDraftById(assemblyId);
  if (!assembly) {
    return;
  }
  assembly.pathPoints = composerPathState.points.map((point) => normalizeComposerPathPoint(point));
  assembly.pathInterpolate = composerPathState.interpolate;
  assembly.pathClosed = composerPathState.closed;
}

function validateComposerSelectedAssemblyId(preferredAssemblyId = composerSelectedAssemblyId) {
  ensureComposerAssemblyDrafts();
  if (composerAssemblyDrafts.some((assembly) => assembly?.id === preferredAssemblyId)) {
    composerSelectedAssemblyId = preferredAssemblyId;
    return composerSelectedAssemblyId;
  }
  composerSelectedAssemblyId = composerAssemblyDrafts[0]?.id ?? null;
  return composerSelectedAssemblyId;
}

function setComposerSelectedAssembly(assemblyId, options = {}) {
  const { persistCurrentPath = true, loadPath = true } = options;
  ensureComposerAssemblyDrafts();
  const nextAssemblyId = validateComposerSelectedAssemblyId(assemblyId);
  if (!nextAssemblyId) {
    composerSelectedAssemblyId = null;
    composerPathState.ownerAssemblyId = null;
    composerPathState.points = [];
    composerPathState.closed = false;
    composerSelectedPointIndex = null;
    rebuildComposerControlPoints();
    updateComposerPathGeometry();
    return null;
  }
  const currentOwnerId = composerPathState.ownerAssemblyId;
  if (persistCurrentPath && currentOwnerId && composerAssemblyDrafts.some((assembly) => assembly?.id === currentOwnerId)) {
    persistComposerPathStateToAssembly(currentOwnerId);
  }
  composerSelectedAssemblyId = nextAssemblyId;
  if (loadPath) {
    loadComposerPathStateFromSelectedAssembly();
  }
  return nextAssemblyId;
}

function loadComposerPathStateFromSelectedAssembly() {
  const selectedAssembly = getComposerSelectedAssembly();
  if (!selectedAssembly) {
    composerPathState.interpolate = composerPathModeSelect?.value || "spline";
    composerPathState.closed = false;
    composerPathState.ownerAssemblyId = null;
    composerPathState.points = [];
    composerSelectedPointIndex = null;
    if (composerPathModeSelect) {
      composerPathModeSelect.value = composerPathState.interpolate;
    }
    rebuildComposerControlPoints();
    updateComposerPathGeometry();
    return;
  }
  if (
    selectedAssembly &&
    (!Array.isArray(selectedAssembly.pathPoints) || !selectedAssembly.pathPoints.length)
  ) {
    const anchor = Array.isArray(selectedAssembly.position) ? selectedAssembly.position : [0, 0, 0];
    selectedAssembly.pathPoints = createComposerDefaultPathPoints(anchor);
    selectedAssembly.pathInterpolate = selectedAssembly.pathInterpolate === "polyline" ? "polyline" : "spline";
    selectedAssembly.pathClosed = !!selectedAssembly.pathClosed;
  }
  composerPathState.interpolate = selectedAssembly?.pathInterpolate === "polyline" ? "polyline" : "spline";
  composerPathState.closed = !!selectedAssembly?.pathClosed;
  composerPathState.ownerAssemblyId = selectedAssembly?.id ?? null;
  composerPathState.points = normalizeComposerAssemblyPathPoints(selectedAssembly?.pathPoints).map((point) =>
    vectorFromTriplet(point)
  );
  if (composerPathModeSelect) {
    composerPathModeSelect.value = composerPathState.interpolate;
  }
  composerSelectedPointIndex =
    Number.isInteger(composerSelectedPointIndex) && composerSelectedPointIndex < composerPathState.points.length
      ? composerSelectedPointIndex
      : null;
  rebuildComposerControlPoints();
  updateComposerPathGeometry();
}

function persistComposerPathStateToSelectedAssembly() {
  const targetAssemblyId =
    composerPathState.ownerAssemblyId && getComposerAssemblyDraftById(composerPathState.ownerAssemblyId)
      ? composerPathState.ownerAssemblyId
      : validateComposerSelectedAssemblyId();
  if (!targetAssemblyId) {
    return;
  }
  persistComposerPathStateToAssembly(targetAssemblyId);
}

function appendComposerAuthoringLine(rawValue, nextLine) {
  const normalizedLine = String(nextLine ?? "").trim();
  if (!normalizedLine) {
    return String(rawValue ?? "");
  }
  const existing = String(rawValue ?? "").trim();
  return existing ? `${existing}\n${normalizedLine}` : normalizedLine;
}

function replaceComposerAuthoringLineById(rawValue, authoredId, nextLine = null) {
  const lines = String(rawValue ?? "").split(/\n/);
  const match = String(authoredId ?? "").match(/_(\d+)$/);
  if (!match) {
    return String(rawValue ?? "");
  }
  const lineIndex = Number(match[1]) - 1;
  if (lineIndex < 0 || lineIndex >= lines.length) {
    return String(rawValue ?? "");
  }
  if (nextLine == null || !String(nextLine).trim()) {
    lines.splice(lineIndex, 1);
  } else {
    lines[lineIndex] = String(nextLine).trim();
  }
  return lines.filter((line) => String(line).trim()).join("\n");
}

function setComposerSceneDurationValue(value = 24) {
  const duration = Math.max(1, Number(Number(value ?? 24).toFixed(3)) || 24);
  if (composerSceneDurationInput) {
    composerSceneDurationInput.value = String(duration);
  }
  return duration;
}

function setComposerSceneLoopValue(value = false) {
  const loop = !!value;
  if (composerSceneLoopInput) {
    composerSceneLoopInput.checked = loop;
  }
  return loop;
}

function appendComposerTransferLine(line) {
  setComposerTransferListRaw(appendComposerAuthoringLine(getComposerTransferListRaw(), line));
}

function appendComposerReactionLine(line) {
  setComposerReactionListRaw(appendComposerAuthoringLine(getComposerReactionListRaw(), line));
}

function getComposerAssemblyMemberIds(assembly) {
  const members = Array.isArray(assembly?.members) ? assembly.members : [];
  return members
    .map((member) => (typeof member === "string" ? member : member?.id))
    .map((memberId) => String(memberId ?? "").trim())
    .filter(Boolean);
}

function promptComposerAssemblyMemberId(assembly, promptLabel, fallbackPrefix = "member") {
  const memberIds = getComposerAssemblyMemberIds(assembly);
  const defaultValue = memberIds[0] ?? `${fallbackPrefix}_1`;
  const hint = memberIds.length ? `Available: ${memberIds.join(", ")}` : "No members yet. Type a member id.";
  const response = window.prompt(`${promptLabel}\n${hint}`, defaultValue);
  const value = String(response ?? "").trim();
  return value || null;
}

function clearComposerPendingTransfer() {
  composerPendingTransferSource = null;
}

function startComposerTransferFromAssembly(assembly) {
  if (!assembly?.id) {
    return false;
  }
  const memberId = promptComposerAssemblyMemberId(assembly, "Source member for this transfer?");
  if (!memberId) {
    return false;
  }
  composerPendingTransferSource = {
    assemblyId: assembly.id,
    memberId,
  };
  return true;
}

function completeComposerTransferToAssembly(assembly) {
  if (!composerPendingTransferSource?.assemblyId || !assembly?.id) {
    return false;
  }
  const targetMemberId = promptComposerAssemblyMemberId(assembly, "Target member for this transfer?");
  if (!targetMemberId) {
    return false;
  }
  const defaultTime = Number((composerPlaybackState.playheadSeconds ?? 0).toFixed(3));
  const rawTime = window.prompt("Transfer time in seconds?", String(defaultTime));
  if (rawTime == null) {
    return false;
  }
  const parsedTime = Number(rawTime);
  if (!Number.isFinite(parsedTime)) {
    return false;
  }
  appendComposerTransferLine(
    `${composerPendingTransferSource.assemblyId}.${composerPendingTransferSource.memberId} -> ${assembly.id}.${targetMemberId} @ ${Number(parsedTime.toFixed(3))}`
  );
  clearComposerPendingTransfer();
  return true;
}

function getComposerMemberColor(memberId, index = 0) {
  const normalized = typeof memberId === "object" && memberId !== null && !Array.isArray(memberId)
    ? getComposerMemberId(memberId, index).trim().toLowerCase()
    : String(memberId ?? "").trim().toLowerCase();
  const explicitState = getComposerMemberState(memberId);
  if (explicitState === "unset") {
    return "#f4f7ff";
  }
  if (explicitState === "electrino") {
    return binaryStyle.electrinoColor;
  }
  if (explicitState === "positrino") {
    return binaryStyle.positrinoColor;
  }
  if (normalized.startsWith("electrino")) {
    return binaryStyle.electrinoColor;
  }
  if (normalized.startsWith("positrino")) {
    return binaryStyle.positrinoColor;
  }
  return index % 2 === 0 ? binaryStyle.positrinoColor : binaryStyle.electrinoColor;
}

function getComposerProxyMemberOffset(memberIndex, memberCount, baseRadius) {
  const safeCount = Math.max(1, Number(memberCount) || 1);
  const ringCapacity = Math.min(8, safeCount);
  const ringIndex = Math.floor(memberIndex / ringCapacity);
  const slotIndex = memberIndex % ringCapacity;
  const slotsThisRing = Math.min(ringCapacity, Math.max(1, safeCount - ringIndex * ringCapacity));
  const angle = (slotIndex / slotsThisRing) * Math.PI * 2;
  const orbitRadius = baseRadius + 0.11 + ringIndex * 0.09;
  const zOffset = ringIndex === 0 ? 0 : (ringIndex % 2 === 0 ? 0.05 : -0.05);
  return new THREE.Vector3(
    Math.cos(angle) * orbitRadius,
    Math.sin(angle) * orbitRadius,
    zOffset
  );
}

function setComposerMemberAnchor(assemblyId, memberId, anchor) {
  if (!assemblyId || !memberId) {
    return;
  }
  if (!(composerMemberAnchors instanceof Map)) {
    composerMemberAnchors = new Map();
  }
  if (!composerMemberAnchors.has(assemblyId)) {
    composerMemberAnchors.set(assemblyId, new Map());
  }
  composerMemberAnchors.get(assemblyId).set(memberId, anchor);
}

function getComposerOrbitOffsetAtTime(motion, chargeType, timeSeconds) {
  const radius = Number(motion?.radius ?? 0.65);
  const frequency = Number(motion?.frequencyHz ?? 0.25);
  const phase = Number(motion?.phase ?? 0);
  const direction = motion?.direction === "cw" ? -1 : 1;
  const phaseOffset = chargeType === "electrino" ? Math.PI : 0;
  const angle = phase + phaseOffset + direction * timeSeconds * Math.PI * 2 * frequency;
  const { u, v } = getComposerOrbitBasis(motion);
  return u
    .clone()
    .multiplyScalar(Math.cos(angle) * radius)
    .add(v.clone().multiplyScalar(Math.sin(angle) * radius));
}

function resolveComposerMemberAnchorPosition(anchor, assemblyCenter, timeSeconds) {
  if (!anchor || !assemblyCenter) {
    return null;
  }
  if (anchor.type === "proxy") {
    return assemblyCenter.clone().add(vectorFromTriplet(anchor.offset));
  }
  if (anchor.type === "orbit" && anchor.motion?.type === "orbit.circular") {
    return assemblyCenter.clone().add(
      getComposerOrbitOffsetAtTime(anchor.motion, anchor.chargeType, timeSeconds)
    );
  }
  return assemblyCenter.clone();
}

function resolveComposerTransferEndpointPosition(endpoint, assemblyCenters, timeSeconds) {
  const assemblyId = endpoint?.assemblyId;
  if (!assemblyId || !(assemblyCenters instanceof Map)) {
    return null;
  }
  const assemblyCenter = assemblyCenters.get(assemblyId);
  if (!assemblyCenter) {
    return null;
  }
  const memberId = endpoint?.memberId;
  if (memberId && composerMemberAnchors instanceof Map) {
    const assemblyAnchorMap = composerMemberAnchors.get(assemblyId);
    const anchor = assemblyAnchorMap?.get(memberId) ?? null;
    const memberPosition = resolveComposerMemberAnchorPosition(anchor, assemblyCenter, timeSeconds);
    if (memberPosition) {
      return memberPosition;
    }
  }
  return assemblyCenter.clone();
}

function addComposerMemberLabel(assemblyId, memberId, color, options = {}) {
  if (!composerViewportGroup || !assemblyId || !memberId) {
    return;
  }
  const sprite = createComposerMemberLabelSprite(memberId, color);
  const offset = Array.isArray(options.offset)
    ? new THREE.Vector3(options.offset[0] ?? 0, options.offset[1] ?? 0.08, options.offset[2] ?? 0)
    : new THREE.Vector3(0, 0.08, 0);
  sprite.userData.assemblyId = assemblyId;
  sprite.userData.memberId = memberId;
  sprite.userData.offset = offset;
  composerViewportGroup.add(sprite);
  composerMemberLabelSprites.push(sprite);
}

function findComposerCoreMemberId(members, chargeType, binaryIndex) {
  const targetPrefix = chargeType === "electrino" ? "electrino" : "positrino";
  const targetSuffix = String(binaryIndex + 1);
  const candidates = Array.isArray(members) ? members : [];
  const exactMatch = candidates.find((member, memberIndex) => {
    const normalized = getComposerMemberId(member, memberIndex).trim().toLowerCase();
    return normalized === `${targetPrefix}_${targetSuffix}` || normalized === `${targetPrefix}${targetSuffix}`;
  });
  if (exactMatch) {
    return getComposerMemberId(exactMatch, candidates.indexOf(exactMatch));
  }
  const prefixMatches = candidates
    .map((member, memberIndex) => getComposerMemberId(member, memberIndex))
    .filter((memberId) => memberId.trim().toLowerCase().startsWith(targetPrefix));
  return prefixMatches[binaryIndex] ?? null;
}

function getComposerPersonalityMembers(assembly) {
  return normalizeComposerMemberList(assembly?.members).filter((member) => isComposerPersonalityMember(member));
}

function getComposerPersonalityRingRadius(assembly) {
  const shellRadii = Array.isArray(assembly?.core?.shells)
    ? assembly.core.shells
        .map((shell) => Number(shell?.radius ?? 0) || 0)
        .filter((radius) => radius > 0)
    : [];
  return shellRadii.length ? Math.max(...shellRadii) * 1.02 : 1;
}

function getComposerObserverPlaneBasisInFrame() {
  const frameQuaternion = composerFrameGroup?.quaternion?.clone?.() ?? new THREE.Quaternion();
  const inverseFrameQuaternion = frameQuaternion.invert();
  const right = new THREE.Vector3(1, 0, 0)
    .applyQuaternion(composerCamera?.quaternion ?? new THREE.Quaternion())
    .applyQuaternion(inverseFrameQuaternion)
    .normalize();
  const up = new THREE.Vector3(0, 1, 0)
    .applyQuaternion(composerCamera?.quaternion ?? new THREE.Quaternion())
    .applyQuaternion(inverseFrameQuaternion)
    .normalize();
  if (right.lengthSq() <= 0.00001) {
    right.set(1, 0, 0);
  }
  if (up.lengthSq() <= 0.00001) {
    up.set(0, 1, 0);
  }
  return { right, up };
}

function getComposerPersonalitySlotLocalOffset(assembly, slotIndex) {
  const radius = getComposerPersonalityRingRadius(assembly);
  const angle = Math.max(0, Number(slotIndex) || 0) * (Math.PI / 3);
  const { right, up } = getComposerObserverPlaneBasisInFrame();
  return right
    .clone()
    .multiplyScalar(Math.cos(angle) * radius)
    .add(up.clone().multiplyScalar(Math.sin(angle) * radius));
}

function readNumberInput(input, fallback = 0) {
  if (!input) {
    return fallback;
  }
  const value = Number(input.value);
  return Number.isFinite(value) ? value : fallback;
}

function vectorFromTriplet(source) {
  if (source instanceof THREE.Vector3) {
    return source.clone();
  }
  if (Array.isArray(source)) {
    return new THREE.Vector3(source[0] ?? 0, source[1] ?? 0, source[2] ?? 0);
  }
  return new THREE.Vector3(source?.x ?? 0, source?.y ?? 0, source?.z ?? 0);
}

function createComposerLozengeTexture(text, options = {}) {
  const {
    isActive = false,
    fill = "rgba(20, 24, 40, 0.92)",
    fillActive = "rgba(13, 24, 42, 0.96)",
    stroke = "rgba(255, 194, 106, 0.75)",
    strokeActive = "rgba(125, 211, 252, 0.95)",
    textColor = "rgba(255, 216, 148, 0.98)",
    textColorActive = "rgba(214, 243, 255, 0.98)",
  } = options;
  const canvas = document.createElement("canvas");
  canvas.width = 96;
  canvas.height = 64;
  const context = canvas.getContext("2d");
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = isActive ? fillActive : fill;
    context.strokeStyle = isActive ? strokeActive : stroke;
    context.lineWidth = 4;
    const x = 8;
    const y = 8;
    const width = canvas.width - 16;
    const height = canvas.height - 16;
    const radius = 18;
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    context.fill();
    context.stroke();
    context.fillStyle = isActive ? textColorActive : textColor;
    context.font = "700 28px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2 + 1);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createComposerPointLabelTexture(text, isActive = false) {
  const label = String(text ?? "").trim() || "A";
  const canvas = document.createElement("canvas");
  canvas.width = 96;
  canvas.height = 96;
  const context = canvas.getContext("2d");
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "700 42px sans-serif";
    context.fillStyle = isActive ? "rgba(16, 24, 38, 0.98)" : "rgba(18, 24, 36, 0.96)";
    context.fillText(label, canvas.width / 2, canvas.height / 2 + 1);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createComposerMemberLabelTexture(text, color = "#ffd894") {
  const label = String(text ?? "").trim() || "?";
  const canvas = document.createElement("canvas");
  canvas.width = 220;
  canvas.height = 64;
  const context = canvas.getContext("2d");
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgba(16, 20, 34, 0.88)";
    context.strokeStyle = color;
    context.lineWidth = 3;
    const x = 8;
    const y = 10;
    const width = canvas.width - 16;
    const height = canvas.height - 20;
    const radius = 18;
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    context.fill();
    context.stroke();
    context.fillStyle = "rgba(244, 247, 255, 0.96)";
    context.font = "600 24px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(label, canvas.width / 2, canvas.height / 2 + 1);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function wrapComposerOverlayText(context, text, maxWidth) {
  const words = String(text ?? "").trim().split(/\s+/).filter(Boolean);
  if (!words.length) {
    return [""];
  }
  const lines = [];
  let currentLine = words[0];
  for (let index = 1; index < words.length; index += 1) {
    const candidate = `${currentLine} ${words[index]}`;
    if (context.measureText(candidate).width <= maxWidth) {
      currentLine = candidate;
    } else {
      lines.push(currentLine);
      currentLine = words[index];
    }
  }
  lines.push(currentLine);
  return lines.slice(0, 4);
}

function createComposerGraphicOverlayTextTexture(text, radius = 0.42) {
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgba(244, 248, 255, 0.96)";
    context.font = "600 28px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    const padding = 42;
    const lines = wrapComposerOverlayText(context, text, canvas.width - padding * 2);
    const lineHeight = 34;
    const startY = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, index) => {
      context.fillText(line, canvas.width / 2, startY + index * lineHeight);
    });
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;
  const normalizedRadius = Math.max(0.18, Number(radius) || 0.42);
  return {
    texture,
    scale: [normalizedRadius * 2.55, normalizedRadius * 2.1, 1],
  };
}

function createComposerGraphicOverlayTextSprite(text, radius = 0.42) {
  const { texture, scale } = createComposerGraphicOverlayTextTexture(text, radius);
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(scale[0], scale[1], scale[2]);
  sprite.renderOrder = 19;
  return sprite;
}

function updateComposerGraphicOverlayTextSprite(sprite, text, radius = 0.42) {
  if (!sprite?.material) {
    return;
  }
  const previousMap = sprite.material.map ?? null;
  const { texture, scale } = createComposerGraphicOverlayTextTexture(text, radius);
  sprite.material.map = texture;
  sprite.material.needsUpdate = true;
  sprite.scale.set(scale[0], scale[1], scale[2]);
  previousMap?.dispose?.();
}

function updateComposerPointLabelSprite(sprite, text, isActive = false) {
  if (!sprite) {
    return;
  }
  const previousMap = sprite.material?.map ?? null;
  const nextTexture = createComposerPointLabelTexture(text, isActive);
  sprite.material.map = nextTexture;
  sprite.material.needsUpdate = true;
  previousMap?.dispose?.();
}

function createComposerPointLabelSprite(text) {
  const material = new THREE.SpriteMaterial({
    map: createComposerPointLabelTexture(text, false),
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.16, 0.16, 1);
  sprite.renderOrder = 13;
  return sprite;
}

function createComposerCameraWaypointLabelTexture(text, isActive = false) {
  const canvas = document.createElement("canvas");
  canvas.width = 96;
  canvas.height = 96;
  const context = canvas.getContext("2d");
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const stroke = isActive ? "rgba(10, 16, 24, 0.98)" : "rgba(8, 14, 22, 0.96)";
    const fill = isActive ? "rgba(10, 16, 24, 0.94)" : "rgba(8, 14, 22, 0.9)";
    context.fillStyle = fill;
    context.strokeStyle = stroke;
    context.lineWidth = 5;
    context.lineJoin = "round";
    context.lineCap = "round";

    context.beginPath();
    context.roundRect(24, 34, 34, 24, 8);
    context.fill();

    context.beginPath();
    context.moveTo(58, 40);
    context.lineTo(72, 32);
    context.lineTo(72, 60);
    context.lineTo(58, 52);
    context.closePath();
    context.fill();

    context.beginPath();
    context.arc(35, 30, 6, 0, Math.PI * 2);
    context.arc(48, 30, 6, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.arc(41, 46, 6.5, 0, Math.PI * 2);
    context.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function updateComposerCameraWaypointLabelSprite(sprite, text, isActive = false) {
  if (!sprite) {
    return;
  }
  const previousMap = sprite.material?.map ?? null;
  const nextTexture = createComposerCameraWaypointLabelTexture(text, isActive);
  sprite.material.map = nextTexture;
  sprite.material.needsUpdate = true;
  previousMap?.dispose?.();
}

function createComposerCameraWaypointLabelSprite(text) {
  const material = new THREE.SpriteMaterial({
    map: createComposerCameraWaypointLabelTexture(text, false),
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.18, 0.18, 1);
  sprite.renderOrder = 13;
  return sprite;
}

function createComposerMemberLabelSprite(text, color = "#ffd894") {
  const material = new THREE.SpriteMaterial({
    map: createComposerMemberLabelTexture(text, color),
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.56, 0.16, 1);
  return sprite;
}

function createComposerAssemblyBadgeTexture(title, subtitle = "") {
  const canvas = document.createElement("canvas");
  canvas.width = 176;
  canvas.height = 88;
  const context = canvas.getContext("2d");
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgba(18, 24, 42, 0.94)";
    context.strokeStyle = "rgba(143, 220, 255, 0.7)";
    context.lineWidth = 3;
    const x = 8;
    const y = 8;
    const width = canvas.width - 16;
    const height = canvas.height - 16;
    const radius = 18;
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    context.fill();
    context.stroke();
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "rgba(239, 248, 255, 0.98)";
    context.font = "700 24px sans-serif";
    context.fillText(title, canvas.width / 2, subtitle ? 34 : canvas.height / 2);
    if (subtitle) {
      context.fillStyle = "rgba(183, 230, 255, 0.92)";
      context.font = "600 18px sans-serif";
      context.fillText(subtitle, canvas.width / 2, 59);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createComposerAssemblyBadgeSprite(title, subtitle = "") {
  const material = new THREE.SpriteMaterial({
    map: createComposerAssemblyBadgeTexture(title, subtitle),
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.78, 0.39, 1);
  return sprite;
}

function createComposerChildBadgeSprite(title, subtitle = "") {
  const sprite = createComposerAssemblyBadgeSprite(title, subtitle);
  sprite.scale.set(0.52, 0.26, 1);
  return sprite;
}

function setComposerTransportButtonIcon(button, kind) {
  if (!button) {
    return;
  }
  const icons = {
    play: {
      label: "Play",
      text: "▶",
    },
    pause: {
      label: "Pause",
      text: "||",
    },
    restart: {
      label: "Restart",
      text: "⏮",
    },
  };
  const icon = icons[kind] ?? icons.play;
  button.textContent = icon.text;
  button.setAttribute("aria-label", icon.label);
  button.title = icon.label;
}

function createComposerMarkerHitProxy(radius) {
  const material = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    depthTest: false,
    depthWrite: false,
  });
  material.colorWrite = false;
  return new THREE.Mesh(new THREE.SphereGeometry(radius, 12, 12), material);
}

function disposeComposerMarkerHandle(mesh, labelKey = "pointLabelSprite") {
  if (!mesh) {
    return;
  }
  const labelSprite = mesh.userData?.[labelKey];
  if (labelSprite?.material?.map) {
    labelSprite.material.map.dispose?.();
  }
  labelSprite?.material?.dispose?.();
  const hitProxy = mesh.userData?.hitProxy;
  if (hitProxy) {
    hitProxy.geometry?.dispose?.();
    hitProxy.material?.dispose?.();
  }
}

function resolveComposerIndexedHit(object, key) {
  let current = object;
  while (current) {
    const value = current.userData?.[key];
    if (Number.isInteger(value)) {
      return {
        object: current,
        index: value,
      };
    }
    current = current.parent ?? null;
  }
  return null;
}

function formatScaleLabel(value) {
  const normalized = Number.isFinite(value) ? value : 1;
  if (normalized >= 1000 || normalized <= 0.001) {
    return `${normalized.toExponential(1)}x`;
  }
  return `${normalized.toFixed(2)}x`;
}

const COMPOSER_FRAME_SCALE_BASELINE = 0.4;

function getComposerEffectiveFrameScale(value = composerFrameState.scale) {
  const normalized = Math.max(0.01, Number(value ?? 1) || 1);
  return normalized * COMPOSER_FRAME_SCALE_BASELINE;
}

function formatComposerTimeLabel(value) {
  const normalized = Number.isFinite(value) ? value : 0;
  return `${normalized.toFixed(1)}s`;
}

function formatComposerTimeInputValue(value) {
  const normalized = Number(value);
  return Number.isFinite(normalized) ? normalized.toFixed(1) : "0.0";
}

function getComposerNumericInputPrecision(step = null) {
  if (step == null) {
    return null;
  }
  const stepText = String(step);
  if (!stepText.includes(".")) {
    return 0;
  }
  return Math.max(0, stepText.length - stepText.indexOf(".") - 1);
}

function formatComposerNumericInputValue(value, step = null) {
  const normalized = Number(value);
  if (!Number.isFinite(normalized)) {
    return "";
  }
  const precision = getComposerNumericInputPrecision(step);
  if (precision == null) {
    return String(normalized);
  }
  return normalized.toFixed(precision);
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
    composerCameraWaypointCount.textContent = `Observer points: ${composerCameraFlightState.waypoints.length}`;
  }
  if (composerCameraFlightToggle) {
    composerCameraFlightToggle.disabled =
      composerCameraFlightState.waypoints.length < 2;
  }
}

function updateComposerCameraWaypointMaterials(activeIndex = null) {
  composerCameraWaypointMeshes.forEach((mesh, index) => {
    if (!mesh?.material) {
      return;
    }
    const isActive = index === activeIndex;
    mesh.material.opacity = isActive ? 1 : 0.95;
    mesh.material.color.setHex(isActive ? 0xcfffe8 : 0x7fe7cb);
    const labelSprite = mesh.userData?.labelSprite;
    if (labelSprite) {
      updateComposerCameraWaypointLabelSprite(labelSprite, "🎥", isActive);
    }
  });
}

function updateComposerCameraPoiStatus() {
  if (!composerCameraPoiStatus) {
    return;
  }
  const selectedPoint =
    composerSelectedPointIndex != null ? composerPathState.points[composerSelectedPointIndex] : null;
  if (composerCameraFlightState.poiMode === "selected") {
    if (selectedPoint) {
      composerCameraPoiStatus.textContent = `Selected point: ${composerSelectedPointIndex + 1} (${selectedPoint.x.toFixed(2)}, ${selectedPoint.y.toFixed(2)}, ${selectedPoint.z.toFixed(2)})`;
      composerCameraPoiStatus.classList.remove("is-warning");
    } else {
      composerCameraPoiStatus.textContent = "Selected point: none. Click a path point in the canvas to target it.";
      composerCameraPoiStatus.classList.add("is-warning");
    }
    return;
  }
  if (selectedPoint) {
    composerCameraPoiStatus.textContent = `Observer target: local origin. Selected point ${composerSelectedPointIndex + 1} is available if you switch modes.`;
  } else {
    composerCameraPoiStatus.textContent = "Observer target: local origin.";
  }
  composerCameraPoiStatus.classList.remove("is-warning");
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

function addComposerCameraWaypoint(position = null) {
  if (!composerFrameGroup) {
    return;
  }
  const localPos = Array.isArray(position)
    ? vectorFromTriplet(position)
    : position instanceof THREE.Vector3
      ? position.clone()
      : composerCamera
        ? composerFrameGroup.worldToLocal(composerCamera.position.clone())
        : new THREE.Vector3();
  const localLookAt = getComposerPoiLocal();
  composerCameraFlightState.waypoints.push({
    position: localPos,
    lookAt: localLookAt,
  });
  composerSelectedCameraWaypointIndex = composerCameraFlightState.waypoints.length - 1;
  updateComposerCameraFlightDisplay();
  updateComposerWaypointCount();
  renderComposerJsonPreview();
}

function clearComposerCameraWaypoints() {
  composerCameraFlightState.waypoints = [];
  composerSelectedCameraWaypointIndex = null;
  updateComposerCameraFlightDisplay();
  updateComposerWaypointCount();
  stopComposerCameraFlightPreview();
  renderComposerJsonPreview();
}

function resetComposerPathPoints() {
  const selectedAssembly = getComposerSelectedAssembly();
  if (!selectedAssembly) {
    composerPathState.points = [];
    composerPathState.ownerAssemblyId = null;
    composerSelectedPointIndex = null;
    rebuildComposerControlPoints();
    updateComposerPathGeometry();
    return;
  }
  const anchor = Array.isArray(selectedAssembly?.position) ? selectedAssembly.position : [0, 0, 0];
  composerPathState.points = createComposerDefaultPathPoints(anchor).map((point) => vectorFromTriplet(point));
  composerPathState.interpolate = composerPathModeSelect?.value || "spline";
  composerPathState.closed = false;
  composerSelectedPointIndex = null;
  updateComposerCameraPoiStatus();
  persistComposerPathStateToSelectedAssembly();
  rebuildComposerControlPoints();
  updateComposerPathGeometry();
}

function addComposerPathPoint(position = null, options = {}) {
  const selectedAssembly = getComposerSelectedAssembly();
  if (!selectedAssembly) {
    return;
  }
  const nextPoint = Array.isArray(position)
    ? vectorFromTriplet(position)
    : position instanceof THREE.Vector3
      ? position.clone()
      : new THREE.Vector3();
  if (!composerPathState.points.length) {
    composerPathState.points = [nextPoint];
  } else {
    const insertAfterIndex = Number.isInteger(options.insertAfterIndex) ? options.insertAfterIndex : null;
    if (insertAfterIndex == null || insertAfterIndex < 0 || insertAfterIndex >= composerPathState.points.length) {
      composerPathState.points.push(nextPoint);
    } else {
      composerPathState.points.splice(insertAfterIndex + 1, 0, nextPoint);
    }
  }
  const insertAfterIndex = Number.isInteger(options.insertAfterIndex) ? options.insertAfterIndex : null;
  composerSelectedPointIndex =
    insertAfterIndex == null || insertAfterIndex < 0 || insertAfterIndex >= composerPathState.points.length - 1
      ? composerPathState.points.length - 1
      : insertAfterIndex + 1;
  persistComposerPathStateToSelectedAssembly();
  rebuildComposerControlPoints();
  updateComposerPathGeometry();
}

function updateComposerPointMaterials(activeIndex = null) {
  const pathLabelPrefix = getComposerSelectedAssemblyLetter();
  composerPointMeshes.forEach((mesh, index) => {
    const isActive =
      index === activeIndex || index === composerSelectedPointIndex;
    mesh.material = isActive ? composerPointMaterialActive : composerPointMaterial;
    const labelSprite = mesh.userData.pointLabelSprite;
    if (labelSprite) {
      updateComposerPointLabelSprite(labelSprite, pathLabelPrefix, isActive);
    }
  });
  updateComposerCameraPoiStatus();
}

function renderComposerAssemblyEditor() {
  validateComposerSelectedAssemblyId();
  if (!composerAssemblyList || !composerAssemblyDetail) {
    return;
  }
  ensureComposerAssemblyDrafts();
  composerAssemblyPositionInputs.clear();
  composerAssemblyList.innerHTML = "";
  composerAssemblyDetail.innerHTML = "";

  composerAssemblyDrafts.forEach((assembly, index) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "composer-assembly-chip";
    if (assembly.id === composerSelectedAssemblyId) {
      chip.classList.add("is-active");
    }

    const number = document.createElement("span");
    number.className = "composer-assembly-chip-number";
    number.textContent = String(index + 1);

    const name = document.createElement("span");
    name.className = "composer-assembly-chip-name";
    name.textContent = assembly.name.trim() || assembly.id || `Assembly ${index + 1}`;

    chip.appendChild(number);
    chip.appendChild(name);

    const sceneRole = normalizeComposerAssemblySceneRole(assembly.sceneRole);
    if (sceneRole !== "assembly" || index === 0) {
      const role = document.createElement("span");
      role.className = "composer-assembly-chip-role";
      role.dataset.sceneRole = sceneRole;
      role.textContent = sceneRole === "assembly" ? "Primary" : getComposerAssemblySceneRoleLabel(sceneRole);
      chip.appendChild(role);
    }

    chip.addEventListener("click", () => {
      setComposerSelectedAssembly(assembly.id);
      renderComposerAssemblyEditor();
      renderComposerJsonPreview();
    });
    chip.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      setComposerSelectedAssembly(assembly.id);
      renderComposerAssemblyEditor();
      renderComposerJsonPreview();
      openComposerAssemblyPropertiesMenuAt(event.clientX, event.clientY, assembly.id);
    });
    composerAssemblyList.appendChild(chip);
  });

  if (!composerAssemblyDrafts.length) {
    const detailCard = document.createElement("div");
    detailCard.className = "composer-assembly-advanced";
    const body = document.createElement("div");
    body.className = "composer-assembly-advanced-body";
    const title = document.createElement("div");
    title.className = "composer-assembly-advanced-meta";
    title.textContent = "Blank Scene";
    body.appendChild(title);
    const hint = document.createElement("div");
    hint.className = "composer-field-note";
    hint.textContent = "Use right-click on the canvas to add reactants, products, or assemblies.";
    body.appendChild(hint);
    const panelHint = document.createElement("div");
    panelHint.className = "composer-field-note";
    panelHint.textContent =
      "The scene starts empty. Add reactants, products, or regular assemblies from the canvas instead of relying on a starter object.";
    body.appendChild(panelHint);
    detailCard.appendChild(body);
    composerAssemblyDetail.appendChild(detailCard);
    composerPathState.ownerAssemblyId = null;
    composerPathState.points = [];
    composerSelectedPointIndex = null;
    rebuildComposerControlPoints();
    updateComposerPathGeometry();
    return;
  }

  const selectedIndex = composerAssemblyDrafts.findIndex(
    (assembly) => assembly?.id === composerSelectedAssemblyId
  );
  const selectedAssembly = selectedIndex >= 0 ? composerAssemblyDrafts[selectedIndex] : null;
  if (!selectedAssembly) {
    return;
  }
  loadComposerPathStateFromSelectedAssembly();
  const detailCard = document.createElement("div");
  detailCard.className = "composer-assembly-advanced";

  const body = document.createElement("div");
  body.className = "composer-assembly-advanced-body";

  const meta = document.createElement("div");
  meta.className = "composer-assembly-advanced-meta";
  meta.textContent = `${selectedAssembly.name.trim() || selectedAssembly.id} - ${selectedAssembly.id}`;
  body.appendChild(meta);

  const structureSummary = document.createElement("div");
  structureSummary.className = "composer-assembly-summary";
  const subassemblyCount = Array.isArray(selectedAssembly.subassemblies)
    ? selectedAssembly.subassemblies.length
    : 0;
  structureSummary.textContent = `${getComposerAssemblySceneRoleLabel(selectedAssembly.sceneRole)} • ${selectedAssembly.members.length} member${
    selectedAssembly.members.length === 1 ? "" : "s"
  } • ${subassemblyCount} subassembl${subassemblyCount === 1 ? "y" : "ies"}`;
  body.appendChild(structureSummary);

  const hint = document.createElement("div");
  hint.className = "composer-field-note";
  hint.textContent =
    "Use right-click on the canvas to add reactants, products, or assemblies. Once one exists, drag the center to move it, drag member dots to place members, drag subassembly halos to place groups, and right-click handles for actions.";
  body.appendChild(hint);

  const panelHint = document.createElement("div");
  panelHint.className = "composer-field-note";
  panelHint.textContent =
    "This panel stays scene-level and lightweight. Assembly structure now lives on the canvas and the assembly center-handle menu.";
  body.appendChild(panelHint);

  detailCard.appendChild(body);
  composerAssemblyDetail.appendChild(detailCard);
}

function getComposerAssemblyDraftIndexById(assemblyId) {
  return composerAssemblyDrafts.findIndex((assembly) => assembly?.id === assemblyId);
}

function getComposerAssemblyDraftById(assemblyId) {
  const index = getComposerAssemblyDraftIndexById(assemblyId);
  return index >= 0 ? composerAssemblyDrafts[index] : null;
}

function getComposerAssemblyWorldCenterById(assemblyId) {
  if (!assemblyId) {
    return new THREE.Vector3();
  }
  return composerAssemblyWorldCenters.get(assemblyId)?.clone() ?? new THREE.Vector3();
}

function shiftComposerPointTriplets(points, delta) {
  const offset = delta instanceof THREE.Vector3 ? delta : new THREE.Vector3();
  return normalizeComposerAssemblyPathPoints(points).map((point) => [
    Number(((point[0] ?? 0) + offset.x).toFixed(3)),
    Number(((point[1] ?? 0) + offset.y).toFixed(3)),
    Number(((point[2] ?? 0) + offset.z).toFixed(3)),
  ]);
}

function rebaseComposerAssemblyParentFrame(assembly, nextParentId = "") {
  if (!assembly) {
    return;
  }
  const previousParentCenter = getComposerAssemblyWorldCenterById(assembly.parentId);
  const nextParentCenter = getComposerAssemblyWorldCenterById(nextParentId);
  const delta = previousParentCenter.sub(nextParentCenter);
  assembly.position = [
    Number(((assembly.position?.[0] ?? 0) + delta.x).toFixed(3)),
    Number(((assembly.position?.[1] ?? 0) + delta.y).toFixed(3)),
    Number(((assembly.position?.[2] ?? 0) + delta.z).toFixed(3)),
  ];
  assembly.pathPoints = shiftComposerPointTriplets(assembly.pathPoints, delta);
}

function syncComposerAssemblyPositionInputs(assemblyId, position = [0, 0, 0]) {
  const inputs = composerAssemblyPositionInputs.get(assemblyId);
  if (!Array.isArray(inputs)) {
    return;
  }
  inputs.forEach((input, axisIndex) => {
    if (!input) {
      return;
    }
    input.value = String(Number(position?.[axisIndex] ?? 0));
  });
}

function getComposerCanvasLocalPointFromEvent(event) {
  if (!composerCanvas || !composerCamera || !composerRaycaster || !composerFrameGroup) {
    return new THREE.Vector3();
  }
  const { x, y } = getComposerPointerNdc(event);
  composerRaycaster.setFromCamera({ x, y }, composerCamera);
  const worldOrigin = composerFrameGroup.getWorldPosition(new THREE.Vector3());
  const planeNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(
    composerFrameGroup.quaternion
  );
  const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(planeNormal, worldOrigin);
  const intersection = new THREE.Vector3();
  if (composerRaycaster.ray.intersectPlane(plane, intersection)) {
    return composerFrameGroup.worldToLocal(intersection.clone());
  }
  return new THREE.Vector3();
}

function closeComposerAssemblyMenu() {
  if (!composerAssemblyMenu) {
    return;
  }
  resetComposerAssemblyMenu();
  composerAssemblyMenu.classList.remove("is-open");
  composerAssemblyMenu.setAttribute("aria-hidden", "true");
}

function resetComposerAssemblyMenu(mode = "") {
  if (!composerAssemblyMenu) {
    return;
  }
  composerAssemblyPositionInputs.clear();
  composerAssemblyMenu.innerHTML = "";
  composerAssemblyMenu.classList.remove("is-timeline-menu");
  if (mode === "timeline") {
    composerAssemblyMenu.classList.add("is-timeline-menu");
  }
}

function getComposerPathOwnerAssemblyId(path) {
  return path?.metadata?.ownerAssemblyId ?? path?.ownerAssemblyId ?? null;
}

function clearComposerBackgroundPathLines() {
  composerBackgroundPathLines.forEach((line) => {
    composerFrameGroup?.remove(line);
    line.geometry?.dispose?.();
    line.material?.dispose?.();
  });
  composerBackgroundPathLines = [];
  composerBackgroundPathMarkers.forEach((marker) => {
    const labelSprite = marker.userData?.pointLabelSprite;
    if (labelSprite?.material?.map) {
      labelSprite.material.map.dispose?.();
    }
    labelSprite?.material?.dispose?.();
    composerFrameGroup?.remove(marker);
    marker.geometry?.dispose?.();
    marker.material?.dispose?.();
  });
  composerBackgroundPathMarkers = [];
}

function rebuildComposerPathDisplayFromDocument(documentData) {
  clearComposerBackgroundPathLines();
  if (!composerPathGeometry || !composerFrameGroup) {
    return;
  }
  const paths = Array.isArray(documentData?.paths) ? documentData.paths : [];
  const assemblies = Array.isArray(documentData?.assemblies) ? documentData.assemblies : [];
  const assemblyById = new Map(
    assemblies.map((assembly) => [assembly?.id ?? "", assembly])
  );
  const selectedAssemblyId = composerSelectedAssemblyId ?? composerAssemblyDrafts[0]?.id ?? null;
  const selectedPath =
    paths.find((path) => getComposerPathOwnerAssemblyId(path) === selectedAssemblyId) ??
    paths.find((path) => path?.id === "path_main") ??
    null;
  const selectedSamples = sampleComposerPath(
    selectedPath?.payload?.points ?? [],
    selectedPath?.payload?.interpolate ?? composerPathState.interpolate,
    !!selectedPath?.payload?.closed
  );
  composerPathGeometry.setFromPoints(selectedSamples);
  if (selectedSamples.length) {
    composerPathGeometry.computeBoundingSphere();
  }

  paths.forEach((path) => {
    if (path === selectedPath) {
      return;
    }
    const samples = sampleComposerPath(
      path?.payload?.points ?? [],
      path?.payload?.interpolate ?? "spline",
      !!path?.payload?.closed
    );
    if (!samples.length) {
      return;
    }
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(samples),
      new THREE.LineBasicMaterial({
        color: 0x8bdcff,
        transparent: true,
        opacity: 0.28,
      })
    );
    line.userData.ownerAssemblyId = getComposerPathOwnerAssemblyId(path);
    composerFrameGroup.add(line);
    composerBackgroundPathLines.push(line);

    const labelPrefix = path?.metadata?.labelPrefix ?? "";
    const pathPoints = Array.isArray(path?.payload?.points) ? path.payload.points : [];
    if (pathPoints.length && labelPrefix && composerPointGeometry && composerPointMaterial) {
      const bareOriginMarker = isComposerBareArchitrinoAssembly(
        assemblyById.get(getComposerPathOwnerAssemblyId(path))
      );
      pathPoints.forEach((point, index) => {
        const marker = new THREE.Mesh(composerPointGeometry, composerPointMaterial);
        marker.position.copy(vectorFromTriplet(point));
        if (!(bareOriginMarker && index === 0)) {
          const labelSprite = createComposerPointLabelSprite(labelPrefix);
          labelSprite.position.set(0, 0, 0);
          marker.userData.pointLabelSprite = labelSprite;
          marker.add(labelSprite);
        }
        composerFrameGroup.add(marker);
        composerBackgroundPathMarkers.push(marker);
      });
    }
  });
}

function applyComposerViewportDisplayState() {
  const showTransportPath = isComposerViewportDisplayFlagEnabled("showTransportPath");
  const showCameraGuides = isComposerViewportDisplayFlagEnabled("showCameraGuides");
  const showLabels = isComposerViewportDisplayFlagEnabled("showLabels");
  const showHistoryTraces = isComposerViewportDisplayFlagEnabled("showHistoryTraces");
  const showEnvelopes = isComposerViewportDisplayFlagEnabled("showEnvelopes");
  if (composerPathLine) {
    composerPathLine.visible = showTransportPath;
  }
  composerBackgroundPathLines.forEach((line) => {
    line.visible = showTransportPath;
  });
  composerBackgroundPathMarkers.forEach((marker) => {
    marker.visible = showTransportPath;
    const labelSprite = marker.userData?.pointLabelSprite;
    if (labelSprite) {
      labelSprite.visible = true;
    }
  });
  composerPointMeshes.forEach((mesh) => {
    mesh.visible = showTransportPath;
    const labelSprite = mesh.userData?.pointLabelSprite;
    if (labelSprite) {
      labelSprite.visible = true;
    }
  });
  if (composerDocumentCameraPathLine) {
    composerDocumentCameraPathLine.visible = showCameraGuides;
  }
  composerDocumentCameraWaypointMeshes.forEach((mesh) => {
    mesh.visible = showCameraGuides;
  });
  if (composerDocumentCameraShotMesh) {
    composerDocumentCameraShotMesh.visible = showCameraGuides;
  }
  if (composerDocumentCameraTargetMesh) {
    composerDocumentCameraTargetMesh.visible = showCameraGuides;
  }
  if (composerDocumentCameraLookLine) {
    composerDocumentCameraLookLine.visible = showCameraGuides;
  }
  if (composerCameraFlightGroup) {
    composerCameraFlightGroup.visible = showCameraGuides;
  }
  composerHistoryTraceLines.forEach((line) => {
    line.visible = showHistoryTraces;
  });
  composerEnvelopeMeshes.forEach((mesh) => {
    mesh.visible = showEnvelopes;
  });
  composerCameraWaypointMeshes.forEach((mesh) => {
    const labelSprite = mesh.userData?.labelSprite;
    if (labelSprite) {
      labelSprite.visible = showLabels;
    }
  });
  composerMemberLabelSprites.forEach((sprite) => {
    sprite.visible = showLabels;
  });
  updateComposerHudViewportToggleState();
}

function positionComposerAssemblyMenu(clientX, clientY, width = 220, height = 160) {
  if (!composerAssemblyMenu || !composerCanvasWrap) {
    return;
  }
  const wrapRect = composerCanvasWrap.getBoundingClientRect();
  composerAssemblyMenu.style.width = `${width}px`;
  composerAssemblyMenu.classList.add("is-open");
  composerAssemblyMenu.setAttribute("aria-hidden", "false");
  const measuredWidth = composerAssemblyMenu.offsetWidth || width;
  const measuredHeight = composerAssemblyMenu.offsetHeight || height;
  const left = clamp(
    clientX - wrapRect.left,
    12,
    Math.max(12, wrapRect.width - measuredWidth - 12)
  );
  const top = clamp(
    clientY - wrapRect.top,
    12,
    Math.max(12, wrapRect.height - measuredHeight - 12)
  );
  composerAssemblyMenu.style.left = `${left}px`;
  composerAssemblyMenu.style.top = `${top}px`;
}

function getComposerMenuAnchorClientPosition(element) {
  const rect = element?.getBoundingClientRect?.();
  if (!rect) {
    return { x: 24, y: 24 };
  }
  return {
    x: rect.left + rect.width * 0.5,
    y: rect.bottom + 10,
  };
}

function appendComposerMenuRangeControl(parent, options = {}) {
  if (!parent) {
    return null;
  }
  const {
    label,
    min = 0,
    max = 1,
    step = 0.1,
    value = 0,
    valueLabel = "",
    onInput = null,
  } = options;
  const field = document.createElement("label");
  field.className = "composer-field composer-range-field";
  const fieldLabel = document.createElement("span");
  fieldLabel.textContent = label;
  const row = document.createElement("div");
  row.className = "composer-range-row";
  const input = document.createElement("input");
  input.className = "composer-range";
  input.type = "range";
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(value);
  const output = document.createElement("span");
  output.className = "composer-range-value";
  output.textContent = valueLabel;
  input.addEventListener("input", () => {
    if (typeof onInput !== "function") {
      return;
    }
    const nextLabel = onInput(Number(input.value), input, output);
    if (typeof nextLabel === "string") {
      output.textContent = nextLabel;
    }
  });
  row.append(input, output);
  field.append(fieldLabel, row);
  parent.appendChild(field);
  return { field, input, output };
}

function appendComposerMenuSectionHeader(parent, title, tag = "") {
  if (!parent) {
    return null;
  }
  const header = document.createElement("div");
  header.className = "composer-assembly-menu-section-header";
  const titleNode = document.createElement("div");
  titleNode.className = "composer-assembly-menu-subtitle";
  titleNode.textContent = title;
  header.appendChild(titleNode);
  if (tag) {
    const tagNode = document.createElement("div");
    tagNode.className = "composer-assembly-menu-section-tag";
    tagNode.textContent = tag;
    header.appendChild(tagNode);
  }
  parent.appendChild(header);
  return header;
}

function appendComposerMenuButtonRow(parent, configs = []) {
  if (!parent || !Array.isArray(configs) || !configs.length) {
    return [];
  }
  const row = document.createElement("div");
  row.className = "composer-button-row";
  const buttons = configs.map((config) => {
    if (!config) {
      const spacer = document.createElement("div");
      spacer.className = "composer-assembly-menu-spacer";
      row.appendChild(spacer);
      return null;
    }
    const button = document.createElement("button");
    button.type = "button";
    if (config.className) {
      button.className = config.className;
    }
    if (config.dataset && typeof config.dataset === "object") {
      Object.entries(config.dataset).forEach(([key, value]) => {
        button.dataset[key] = String(value);
      });
    }
    button.textContent = config.text ?? "";
    button.disabled = !!config.disabled;
    if (typeof config.onClick === "function") {
      button.addEventListener("click", config.onClick);
    }
    row.appendChild(button);
    return button;
  });
  parent.appendChild(row);
  return buttons;
}

function appendComposerMenuField(parent, options = {}) {
  if (!parent) {
    return null;
  }
  const {
    label = "",
    type = "text",
    value = "",
    step = null,
    min = null,
    placeholder = "",
    selectOnFocus = false,
  } = options;
  const field = document.createElement("label");
  field.className = "composer-field";
  const labelNode = document.createElement("span");
  labelNode.textContent = label;
  const input = document.createElement("input");
  input.type = type;
  if (step != null) {
    input.step = String(step);
  }
  if (min != null) {
    input.min = String(min);
  }
  if (placeholder) {
    input.placeholder = placeholder;
  }
  if (type === "checkbox") {
    input.checked = !!value;
  } else {
    input.value =
      type === "number"
        ? formatComposerNumericInputValue(value, step)
        : String(value ?? "");
  }
  if (selectOnFocus) {
    input.addEventListener("focus", () => {
      input.select?.();
    });
    input.addEventListener("mouseup", (event) => {
      if (document.activeElement !== input) {
        return;
      }
      event.preventDefault();
    });
  }
  field.append(labelNode, input);
  parent.appendChild(field);
  return input;
}

function appendComposerMenuSelectField(parent, options = {}) {
  if (!parent) {
    return null;
  }
  const {
    label = "",
    value = "",
    entries = [],
    placeholder = "None",
  } = options;
  const field = document.createElement("label");
  field.className = "composer-field";
  const labelNode = document.createElement("span");
  labelNode.textContent = label;
  const select = document.createElement("select");
  if (!entries.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = placeholder;
    select.appendChild(option);
    select.disabled = true;
  } else {
    entries.forEach((entry) => {
      const option = document.createElement("option");
      option.value = String(entry?.value ?? "");
      option.textContent = String(entry?.label ?? entry?.value ?? "");
      select.appendChild(option);
    });
    if (value) {
      select.value = String(value);
    }
  }
  field.append(labelNode, select);
  parent.appendChild(field);
  return select;
}

function appendComposerMenuBlock(parent, title, actionConfig = null) {
  if (!parent) {
    return null;
  }
  const block = document.createElement("div");
  block.className = "composer-assembly-menu-block";
  const header = document.createElement("div");
  header.className = "composer-assembly-menu-block-header";
  const titleNode = document.createElement("div");
  titleNode.className = "composer-assembly-menu-subtitle";
  titleNode.textContent = title;
  header.appendChild(titleNode);
  let actionButton = null;
  if (actionConfig && typeof actionConfig.onClick === "function") {
    actionButton = document.createElement("button");
    actionButton.type = "button";
    actionButton.className = "composer-assembly-menu-inline-action";
    actionButton.textContent = actionConfig.text ?? "Add";
    actionButton.addEventListener("click", actionConfig.onClick);
    header.appendChild(actionButton);
  }
  block.appendChild(header);
  parent.appendChild(block);
  return { block, header, titleNode, actionButton };
}

function appendComposerMenuNote(parent, text) {
  if (!parent || !text) {
    return null;
  }
  const note = document.createElement("div");
  note.className = "composer-field-note";
  note.textContent = text;
  parent.appendChild(note);
  return note;
}

function openComposerMemberMenuAt(clientX, clientY, assemblyId, memberId) {
  if (!composerAssemblyMenu) {
    return;
  }
  const assembly = getComposerAssemblyDraftById(assemblyId);
  const normalizedMemberId = sanitizeComposerEntityId(memberId, "");
  if (!assembly || !normalizedMemberId) {
    return;
  }
  const currentSubassemblyId = getComposerMemberSubassemblyId(assembly, normalizedMemberId);
  const memberOffset = resolveComposerAssemblyMemberLocalOffset(assembly, normalizedMemberId);
  const siblingSubassemblies = normalizeComposerSubassemblyList(assembly?.subassemblies).filter(
    (entry, index) => getComposerSubassemblyId(entry, index) !== currentSubassemblyId
  );

  resetComposerAssemblyMenu();

  const title = document.createElement("div");
  title.className = "composer-assembly-menu-title";
  title.textContent = "Member";
  composerAssemblyMenu.appendChild(title);

  const subtitle = document.createElement("div");
  subtitle.className = "composer-assembly-menu-subtitle";
  subtitle.textContent = `${assembly.id}.${normalizedMemberId}`;
  composerAssemblyMenu.appendChild(subtitle);

  appendComposerMenuNote(
    composerAssemblyMenu,
    currentSubassemblyId
      ? `Grouped in ${currentSubassemblyId}. Drag this dot in the canvas to set the member offset inside that group.`
      : "Ungrouped. Drag this dot in the canvas to set the member offset directly on the assembly."
  );
  appendComposerMenuNote(
    composerAssemblyMenu,
    `Current local offset: ${memberOffset[0]}, ${memberOffset[1]}, ${memberOffset[2]}`
  );

  appendComposerMenuButtonRow(composerAssemblyMenu, [
    currentSubassemblyId
      ? {
          text: "Move To Root",
          onClick: () => {
            const liveAssembly = getComposerAssemblyDraftById(assemblyId);
            if (!liveAssembly || !moveComposerMemberToRoot(liveAssembly, normalizedMemberId)) {
              return;
            }
            closeComposerAssemblyMenu();
            renderComposerAssemblyEditor();
            renderComposerJsonPreview();
            openComposerMemberMenuAt(clientX, clientY, assemblyId, normalizedMemberId);
          },
        }
      : {
          text: "New Subassembly",
          onClick: () => {
            const liveAssembly = getComposerAssemblyDraftById(assemblyId);
            if (!liveAssembly) {
              return;
            }
            const nextSubassemblyId = createComposerSubassemblyFromMembers(liveAssembly, [normalizedMemberId]);
            if (!nextSubassemblyId) {
              return;
            }
            closeComposerAssemblyMenu();
            renderComposerAssemblyEditor();
            renderComposerJsonPreview();
            openComposerSubassemblyMenuAt(clientX, clientY, assemblyId, nextSubassemblyId);
          },
        },
    {
      text: "Remove Member",
      className: "composer-assembly-menu-danger",
      onClick: () => {
        const liveAssembly = getComposerAssemblyDraftById(assemblyId);
        if (!liveAssembly || !removeComposerAssemblyMember(liveAssembly, normalizedMemberId)) {
          return;
        }
        closeComposerAssemblyMenu();
        renderComposerAssemblyEditor();
        renderComposerJsonPreview();
        openComposerAssemblyPropertiesMenuAt(clientX, clientY, assemblyId);
      },
    },
  ]);

  if (siblingSubassemblies.length) {
    appendComposerMenuSectionHeader(composerAssemblyMenu, "Move To Group", `${siblingSubassemblies.length}`);
    siblingSubassemblies.forEach((entry, index) => {
      const targetSubassemblyId = getComposerSubassemblyId(entry, index);
      appendComposerMenuButtonRow(composerAssemblyMenu, [
        {
          text: targetSubassemblyId,
          onClick: () => {
            const liveAssembly = getComposerAssemblyDraftById(assemblyId);
            if (!liveAssembly || !moveComposerMemberToSubassembly(liveAssembly, normalizedMemberId, targetSubassemblyId)) {
              return;
            }
            closeComposerAssemblyMenu();
            renderComposerAssemblyEditor();
            renderComposerJsonPreview();
            openComposerMemberMenuAt(clientX, clientY, assemblyId, normalizedMemberId);
          },
        },
        null,
      ]);
    });
  }

  positionComposerAssemblyMenu(clientX, clientY, 320, 420);
}

function openComposerPersonalitySlotMenuAt(clientX, clientY, assemblyId, memberId) {
  if (!composerAssemblyMenu) {
    return;
  }
  const assembly = getComposerAssemblyDraftById(assemblyId);
  const members = normalizeComposerMemberList(assembly?.members);
  const member = members.find((entry, index) => getComposerMemberId(entry, index) === sanitizeComposerEntityId(memberId, ""));
  if (!assembly || !isComposerPersonalityMember(member)) {
    return;
  }
  const currentState = getComposerMemberState(member) || "unset";
  resetComposerAssemblyMenu();

  const title = document.createElement("div");
  title.className = "composer-assembly-menu-title";
  title.textContent = "Personality Slot";
  composerAssemblyMenu.appendChild(title);

  const subtitle = document.createElement("div");
  subtitle.className = "composer-assembly-menu-subtitle";
  subtitle.textContent = `${assembly.name} · ${getComposerMemberId(member)}`;
  composerAssemblyMenu.appendChild(subtitle);

  appendComposerMenuNote(
    composerAssemblyMenu,
    currentState === "unset"
      ? "Unset slot. Choose electrino or positrino."
      : currentState === "electrino"
        ? "Electrino set. You can flip this slot to positrino."
        : "Positrino set. You can flip this slot to electrino."
  );

  const setPersonalityState = (nextState) => {
    const liveAssembly = getComposerAssemblyDraftById(assemblyId);
    const liveMember = ensureComposerAssemblyMemberRecord(liveAssembly, getComposerMemberId(member));
    if (!liveMember) {
      return;
    }
    liveMember.state = nextState;
    closeComposerAssemblyMenu();
    renderComposerJsonPreview();
  };

  if (currentState === "unset") {
    appendComposerMenuButtonRow(composerAssemblyMenu, [
      {
        text: "Set Electrino",
        onClick: () => setPersonalityState("electrino"),
      },
      {
        text: "Set Positrino",
        onClick: () => setPersonalityState("positrino"),
      },
    ]);
  } else {
    appendComposerMenuButtonRow(composerAssemblyMenu, [
      {
        text: currentState === "electrino" ? "Flip To Positrino" : "Flip To Electrino",
        onClick: () => setPersonalityState(currentState === "electrino" ? "positrino" : "electrino"),
      },
    ]);
  }

  positionComposerAssemblyMenu(clientX, clientY, 236, 166);
}

function openComposerSubassemblyMenuAt(clientX, clientY, assemblyId, subassemblyId) {
  if (!composerAssemblyMenu) {
    return;
  }
  const assembly = getComposerAssemblyDraftById(assemblyId);
  const normalizedSubassemblyId = sanitizeComposerEntityId(subassemblyId, "");
  if (!assembly || !normalizedSubassemblyId) {
    return;
  }
  const subassemblies = normalizeComposerSubassemblyList(assembly?.subassemblies);
  const subassembly = subassemblies.find(
    (entry, index) => getComposerSubassemblyId(entry, index) === normalizedSubassemblyId
  );
  if (!subassembly) {
    return;
  }

  resetComposerAssemblyMenu();

  const title = document.createElement("div");
  title.className = "composer-assembly-menu-title";
  title.textContent = "Subassembly";
  composerAssemblyMenu.appendChild(title);

  const subtitle = document.createElement("div");
  subtitle.className = "composer-assembly-menu-subtitle";
  subtitle.textContent = normalizedSubassemblyId;
  composerAssemblyMenu.appendChild(subtitle);

  appendComposerMenuNote(
    composerAssemblyMenu,
    `Drag this halo in the canvas to place the group. Position: ${Number(subassembly.position?.[0] ?? 0)}, ${Number(
      subassembly.position?.[1] ?? 0
    )}, ${Number(subassembly.position?.[2] ?? 0)}`
  );
  appendComposerMenuNote(
    composerAssemblyMenu,
    `${(subassembly.members ?? []).length} member${(subassembly.members ?? []).length === 1 ? "" : "s"}`
  );

  appendComposerMenuButtonRow(composerAssemblyMenu, [
    {
      text: "Dissolve Group",
      className: "composer-assembly-menu-danger",
      onClick: () => {
        const liveAssembly = getComposerAssemblyDraftById(assemblyId);
        if (!liveAssembly || !dissolveComposerSubassembly(liveAssembly, normalizedSubassemblyId)) {
          return;
        }
        closeComposerAssemblyMenu();
        renderComposerAssemblyEditor();
        renderComposerJsonPreview();
        openComposerAssemblyPropertiesMenuAt(clientX, clientY, assemblyId);
      },
    },
    null,
  ]);

  if (Array.isArray(subassembly.members) && subassembly.members.length) {
    appendComposerMenuSectionHeader(composerAssemblyMenu, "Members", `${subassembly.members.length}`);
    subassembly.members.forEach((entryMemberId) => {
      appendComposerMenuButtonRow(composerAssemblyMenu, [
        {
          text: entryMemberId,
          onClick: () => {
            openComposerMemberMenuAt(clientX, clientY, assemblyId, entryMemberId);
          },
        },
        null,
      ]);
    });
  }

  positionComposerAssemblyMenu(clientX, clientY, 320, 420);
}

function openComposerAssemblyTemplateMenuAt(event) {
  if (!composerAssemblyMenu) {
    return;
  }
  const localPoint = getComposerCanvasLocalPointFromEvent(event);
  composerAssemblyMenu.dataset.position = JSON.stringify([
    Number(localPoint.x.toFixed(3)),
    Number(localPoint.y.toFixed(3)),
    Number(localPoint.z.toFixed(3)),
  ]);
  resetComposerAssemblyMenu();

  const title = document.createElement("div");
  title.className = "composer-assembly-menu-title";
  title.textContent = "Canvas";
  composerAssemblyMenu.appendChild(title);

  appendComposerMenuButtonRow(composerAssemblyMenu, [
    {
      text: "Scene",
      onClick: () => {
        openComposerSceneMenuAt(event.clientX, event.clientY);
      },
    },
    {
      text: "Library",
      onClick: () => {
        openComposerLibraryMenuAt(event.clientX, event.clientY);
      },
    },
  ]);

  const addLabel = document.createElement("div");
  addLabel.className = "composer-assembly-menu-subtitle";
  addLabel.textContent = "Add Assembly";
  composerAssemblyMenu.appendChild(addLabel);
  appendComposerMenuNote(
    composerAssemblyMenu,
    "Add an assembly template here, then change its Scene Role from the assembly menu when you need reactants or products."
  );

  composerAssemblyTemplateMenuRows.forEach((row) => {
    appendComposerMenuButtonRow(
      composerAssemblyMenu,
      row.map((entry) => ({
        text: entry.label,
        dataset: { template: entry.template },
      }))
    );
  });

  appendComposerMenuSectionHeader(composerAssemblyMenu, "Observer");

  appendComposerMenuButtonRow(composerAssemblyMenu, [
    {
      text: "Add Observer Point",
      onClick: () => {
        const position = JSON.parse(composerAssemblyMenu.dataset.position || "[0,0,0]");
        addComposerCameraWaypoint(position);
        closeComposerAssemblyMenu();
      },
    },
    {
      text:
        composerCameraFlightState.poiMode === "selected"
          ? "Target: Selected Point"
          : "Target: Local Origin",
      onClick: () => {
        composerCameraFlightState.poiMode =
          composerCameraFlightState.poiMode === "selected" ? "origin" : "selected";
        updateComposerCameraPoiStatus();
        closeComposerAssemblyMenu();
      },
    },
  ]);

  if ((composerCameraFlightState?.waypoints?.length ?? 0) > 0) {
    appendComposerMenuButtonRow(composerAssemblyMenu, [
      {
        text: "Clear Observer Path",
        onClick: () => {
          clearComposerCameraWaypoints();
          closeComposerAssemblyMenu();
        },
      },
      null,
    ]);
  }

  const selectedAssemblyLetter = getComposerSelectedAssemblyLetter();
  appendComposerMenuSectionHeader(
    composerAssemblyMenu,
    `Path ${selectedAssemblyLetter}`.trim()
  );

  appendComposerMenuSectionHeader(composerAssemblyMenu, "Frame");

  let frameScaleControl = null;
  const [frameEditButton] = appendComposerMenuButtonRow(composerAssemblyMenu, [
    {
      text: composerFrameEditMode ? "Stop Edit" : "Edit",
      onClick: () => {
        composerFrameEditMode = !composerFrameEditMode;
        if (frameEditButton) {
          frameEditButton.textContent = composerFrameEditMode ? "Stop Edit" : "Edit";
        }
      },
    },
    {
      text: "Reset",
      onClick: () => {
        setComposerFrameDefaults();
        updateComposerFrame();
        if (frameScaleControl) {
          frameScaleControl.input.value = "0";
          frameScaleControl.output.textContent = formatScaleLabel(composerFrameState.scale);
        }
        renderComposerJsonPreview();
      },
    },
  ]);

  frameScaleControl = appendComposerMenuRangeControl(composerAssemblyMenu, {
    label: "Scale (10^x)",
    min: -2,
    max: 3,
    step: 0.1,
    value: Math.log10(composerFrameState.scale || 1).toFixed(2),
    valueLabel: formatScaleLabel(composerFrameState.scale),
    onInput: (nextValue) => {
      composerFrameState.scale = Math.pow(10, nextValue);
      updateComposerFrame();
      renderComposerJsonPreview();
      return formatScaleLabel(composerFrameState.scale);
    },
  });

  appendComposerMenuSectionHeader(composerAssemblyMenu, "Viewport");

  let orbitSpeedControl = null;
  let orbitRadiusControl = null;
  appendComposerMenuButtonRow(composerAssemblyMenu, [
    {
      text: "Reset",
      onClick: () => {
        setComposerCameraDefaults();
        updateComposerCamera();
        if (orbitSpeedControl) {
          orbitSpeedControl.input.value = "0";
          orbitSpeedControl.output.textContent = formatScaleLabel(composerCameraState.speed);
        }
        if (orbitRadiusControl) {
          orbitRadiusControl.input.value = Math.log10(composerCameraOrbitState.radius || 1).toFixed(2);
          orbitRadiusControl.output.textContent = formatScaleLabel(composerCameraOrbitState.radius);
        }
        renderComposerJsonPreview();
      },
    },
    null,
  ]);

  orbitSpeedControl = appendComposerMenuRangeControl(composerAssemblyMenu, {
    label: "Speed (10^x)",
    min: -2,
    max: 2,
    step: 0.1,
    value: Math.log10(composerCameraState.speed || 1).toFixed(2),
    valueLabel: formatScaleLabel(composerCameraState.speed),
    onInput: (nextValue) => {
      composerCameraState.speed = Math.pow(10, nextValue);
      renderComposerJsonPreview();
      return formatScaleLabel(composerCameraState.speed);
    },
  });

  orbitRadiusControl = appendComposerMenuRangeControl(composerAssemblyMenu, {
    label: "Radius (10^x)",
    min: -2,
    max: 3,
    step: 0.1,
    value: Math.log10(composerCameraOrbitState.radius || 1).toFixed(2),
    valueLabel: formatScaleLabel(composerCameraOrbitState.radius),
    onInput: (nextValue) => {
      composerCameraOrbitState.radius = Math.pow(10, nextValue);
      updateComposerCamera();
      renderComposerJsonPreview();
      return formatScaleLabel(composerCameraOrbitState.radius);
    },
  });

  positionComposerAssemblyMenu(event.clientX, event.clientY, 336, 640);
}

function openComposerAssemblyPropertiesMenuAt(clientX, clientY, assemblyId) {
  if (!composerAssemblyMenu) {
    return;
  }
  const assemblyIndex = getComposerAssemblyDraftIndexById(assemblyId);
  const assembly = assemblyIndex >= 0 ? composerAssemblyDrafts[assemblyIndex] : null;
  if (!assembly) {
    return;
  }
  setComposerSelectedAssembly(assembly.id);
  resetComposerAssemblyMenu();

  const title = document.createElement("div");
  title.className = "composer-assembly-menu-title";
  title.textContent = `Assembly ${assemblyIndex + 1}`;
  composerAssemblyMenu.appendChild(title);

  const subtitle = document.createElement("div");
  subtitle.className = "composer-assembly-menu-subtitle";
  subtitle.textContent = assembly.name.trim() || assembly.id;
  composerAssemblyMenu.appendChild(subtitle);

  if (composerPendingTransferSource?.assemblyId) {
    const transferDraft = document.createElement("div");
    transferDraft.className = "composer-assembly-menu-subtitle";
    transferDraft.textContent = `Transfer from ${composerPendingTransferSource.assemblyId}.${composerPendingTransferSource.memberId}`;
    composerAssemblyMenu.appendChild(transferDraft);
  }

  const form = document.createElement("div");
  form.className = "composer-form";

  const nameField = document.createElement("label");
  nameField.className = "composer-field";
  const nameLabel = document.createElement("span");
  nameLabel.textContent = "Name";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.value = assembly.name;
  nameInput.addEventListener("input", () => {
    const liveAssembly = getComposerAssemblyDraftById(assembly.id);
    if (!liveAssembly) {
      return;
    }
    liveAssembly.name = nameInput.value;
    subtitle.textContent = liveAssembly.name.trim() || liveAssembly.id;
    renderComposerAssemblyEditor();
    composerAssemblyPositionInputs.set(liveAssembly.id, positionInputs);
    renderComposerJsonPreview();
  });
  nameField.append(nameLabel, nameInput);
  form.appendChild(nameField);

  const sceneRoleField = document.createElement("label");
  sceneRoleField.className = "composer-field";
  const sceneRoleLabel = document.createElement("span");
  sceneRoleLabel.textContent = "Scene Role";
  const sceneRoleSelect = document.createElement("select");
  composerSceneRoleOptions.forEach((entry) => {
    const option = document.createElement("option");
    option.value = entry.value;
    option.textContent = entry.label;
    sceneRoleSelect.appendChild(option);
  });
  sceneRoleSelect.value = normalizeComposerAssemblySceneRole(assembly.sceneRole);
  sceneRoleSelect.addEventListener("change", () => {
    const liveAssembly = getComposerAssemblyDraftById(assembly.id);
    if (!liveAssembly) {
      return;
    }
    liveAssembly.sceneRole = normalizeComposerAssemblySceneRole(sceneRoleSelect.value);
    renderComposerAssemblyEditor();
    composerAssemblyPositionInputs.set(liveAssembly.id, positionInputs);
    renderComposerJsonPreview();
  });
  sceneRoleField.append(sceneRoleLabel, sceneRoleSelect);
  form.appendChild(sceneRoleField);

  const parentField = document.createElement("label");
  parentField.className = "composer-field";
  const parentLabel = document.createElement("span");
  parentLabel.textContent = "Parent";
  const parentSelect = document.createElement("select");
  const rootOption = document.createElement("option");
  rootOption.value = "";
  rootOption.textContent = "Scene Root";
  parentSelect.appendChild(rootOption);
  composerAssemblyDrafts.forEach((candidate) => {
    if (candidate.id === assembly.id) {
      return;
    }
    const option = document.createElement("option");
    option.value = candidate.id;
    option.textContent = candidate.name.trim() || candidate.id;
    parentSelect.appendChild(option);
  });
  parentSelect.value = assembly.parentId || "";
  parentSelect.addEventListener("change", () => {
    const liveAssembly = getComposerAssemblyDraftById(assembly.id);
    if (!liveAssembly) {
      return;
    }
    const nextParentId = parentSelect.value;
    rebaseComposerAssemblyParentFrame(liveAssembly, nextParentId);
    liveAssembly.parentId = nextParentId;
    syncComposerAssemblyPositionInputs(liveAssembly.id, liveAssembly.position);
    if (composerPathState.ownerAssemblyId === liveAssembly.id) {
      composerPathState.points = normalizeComposerAssemblyPathPoints(liveAssembly.pathPoints).map((point) =>
        vectorFromTriplet(point)
      );
      updateComposerPathGeometry();
    }
    renderComposerJsonPreview();
  });
  parentField.append(parentLabel, parentSelect);
  form.appendChild(parentField);

  const positionGrid = document.createElement("div");
  positionGrid.className = "composer-assembly-menu-grid-3";
  const positionInputs = [];
  ["X", "Y", "Z"].forEach((axis, axisIndex) => {
    const axisField = document.createElement("label");
    axisField.className = "composer-field";
    const axisLabel = document.createElement("span");
    axisLabel.textContent = axis;
    const axisInput = document.createElement("input");
    axisInput.type = "number";
    axisInput.step = "0.1";
    axisInput.value = String(Number(assembly.position?.[axisIndex] ?? 0));
    axisInput.addEventListener("input", () => {
      const liveAssembly = getComposerAssemblyDraftById(assembly.id);
      if (!liveAssembly) {
        return;
      }
      const nextPosition = Array.isArray(liveAssembly.position) ? [...liveAssembly.position] : [0, 0, 0];
      nextPosition[axisIndex] = Number(axisInput.value) || 0;
      liveAssembly.position = nextPosition;
      renderComposerJsonPreview();
    });
    positionInputs[axisIndex] = axisInput;
    axisField.append(axisLabel, axisInput);
    positionGrid.appendChild(axisField);
  });
  composerAssemblyPositionInputs.set(assembly.id, positionInputs);
  form.appendChild(positionGrid);

  composerAssemblyMenu.appendChild(form);
  appendComposerMenuNote(
    composerAssemblyMenu,
    "Canvas-first structure: drag the center to move the assembly, drag member dots to place members, drag subassembly halos to place groups, and right-click visible handles for focused actions."
  );

  appendComposerMenuSectionHeader(
    composerAssemblyMenu,
    "Structure",
    `${Array.isArray(assembly.members) ? assembly.members.length : 0}`
  );

  const actions = document.createElement("div");
  actions.className = "composer-button-row";

  const addPositrinoButton = document.createElement("button");
  addPositrinoButton.type = "button";
  addPositrinoButton.textContent = "Add Positrino";
  addPositrinoButton.addEventListener("click", () => {
    const liveAssembly = getComposerAssemblyDraftById(assembly.id);
    if (!liveAssembly || !addComposerAssemblyMemberByKind(liveAssembly, "positrino")) {
      return;
    }
    closeComposerAssemblyMenu();
    renderComposerAssemblyEditor();
    renderComposerJsonPreview();
    openComposerAssemblyPropertiesMenuAt(clientX, clientY, assembly.id);
  });
  actions.appendChild(addPositrinoButton);

  const addElectrinoButton = document.createElement("button");
  addElectrinoButton.type = "button";
  addElectrinoButton.textContent = "Add Electrino";
  addElectrinoButton.addEventListener("click", () => {
    const liveAssembly = getComposerAssemblyDraftById(assembly.id);
    if (!liveAssembly || !addComposerAssemblyMemberByKind(liveAssembly, "electrino")) {
      return;
    }
    closeComposerAssemblyMenu();
    renderComposerAssemblyEditor();
    renderComposerJsonPreview();
    openComposerAssemblyPropertiesMenuAt(clientX, clientY, assembly.id);
  });
  actions.appendChild(addElectrinoButton);

  const addPairButton = document.createElement("button");
  addPairButton.type = "button";
  addPairButton.textContent = "Add Pair";
  addPairButton.addEventListener("click", () => {
    const liveAssembly = getComposerAssemblyDraftById(assembly.id);
    if (!liveAssembly) {
      return;
    }
    const hasCore = Array.isArray(liveAssembly?.core?.shells) && liveAssembly.core.shells.length > 0;
    if (hasCore && getComposerAvailablePersonalitySlotCount(liveAssembly) < 2) {
      setComposerStatus(
        `Not enough personality slots remain for a pair. ${getComposerAvailablePersonalitySlotCount(liveAssembly)} of ${getComposerPersonalitySlotCapacity(liveAssembly)} slot${
          getComposerPersonalitySlotCapacity(liveAssembly) === 1 ? "" : "s"
        } available.`
      );
      return;
    }
    if (!addComposerAssemblyMemberByKind(liveAssembly, "positrino")) {
      return;
    }
    if (!addComposerAssemblyMemberByKind(liveAssembly, "electrino")) {
      return;
    }
    closeComposerAssemblyMenu();
    renderComposerAssemblyEditor();
    renderComposerJsonPreview();
    openComposerAssemblyPropertiesMenuAt(clientX, clientY, assembly.id);
  });
  actions.appendChild(addPairButton);
  composerAssemblyMenu.appendChild(actions);

  const structureActions = document.createElement("div");
  structureActions.className = "composer-button-row";

  const pathButton = document.createElement("button");
  pathButton.type = "button";
  pathButton.textContent = "Edit Path";
  pathButton.addEventListener("click", () => {
    setComposerSelectedAssembly(assembly.id);
    closeComposerAssemblyMenu();
    renderComposerJsonPreview();
  });
  structureActions.appendChild(pathButton);

  const clearMembersButton = document.createElement("button");
  clearMembersButton.type = "button";
  clearMembersButton.textContent = "Clear Members";
  clearMembersButton.addEventListener("click", () => {
    const liveAssembly = getComposerAssemblyDraftById(assembly.id);
    if (!liveAssembly) {
      return;
    }
    liveAssembly.members = [];
    liveAssembly.subassemblies = [];
    closeComposerAssemblyMenu();
    renderComposerAssemblyEditor();
    renderComposerJsonPreview();
    openComposerAssemblyPropertiesMenuAt(clientX, clientY, assembly.id);
  });
  structureActions.appendChild(clearMembersButton);
  composerAssemblyMenu.appendChild(structureActions);

  const subassemblies = normalizeComposerSubassemblyList(assembly.subassemblies);
  const childMemberIds = new Set(subassemblies.flatMap((entry) => entry?.members ?? []));
  const rootMembers = normalizeComposerMemberList(assembly.members).filter(
    (entry, memberIndex) => !childMemberIds.has(getComposerMemberId(entry, memberIndex))
  );

  if (rootMembers.length) {
    appendComposerMenuSectionHeader(composerAssemblyMenu, "Root Members", `${rootMembers.length}`);
    rootMembers.forEach((entry, memberIndex) => {
      const memberId = getComposerMemberId(entry, memberIndex);
      appendComposerMenuButtonRow(composerAssemblyMenu, [
        {
          text: memberId,
          onClick: () => {
            openComposerMemberMenuAt(clientX, clientY, assembly.id, memberId);
          },
        },
        null,
      ]);
    });
  }

  if (subassemblies.length) {
    appendComposerMenuSectionHeader(composerAssemblyMenu, "Subassemblies", `${subassemblies.length}`);
    subassemblies.forEach((entry, subassemblyIndex) => {
      const subassemblyId = getComposerSubassemblyId(entry, subassemblyIndex);
      appendComposerMenuButtonRow(composerAssemblyMenu, [
        {
          text: `${subassemblyId} (${(entry.members ?? []).length})`,
          onClick: () => {
            openComposerSubassemblyMenuAt(clientX, clientY, assembly.id, subassemblyId);
          },
        },
        null,
      ]);
    });
  }

  appendComposerMenuSectionHeader(composerAssemblyMenu, "Transfers");

  const transferButton = document.createElement("button");
  transferButton.type = "button";
  transferButton.textContent =
    composerPendingTransferSource?.assemblyId && composerPendingTransferSource.assemblyId !== assembly.id
      ? "Complete Transfer Here"
      : "Start Transfer From Here";
  transferButton.addEventListener("click", () => {
    const didUpdate =
      composerPendingTransferSource?.assemblyId && composerPendingTransferSource.assemblyId !== assembly.id
        ? completeComposerTransferToAssembly(assembly)
        : startComposerTransferFromAssembly(assembly);
    if (!didUpdate) {
      return;
    }
    closeComposerAssemblyMenu();
    renderComposerJsonPreview();
    openComposerAssemblyPropertiesMenuAt(clientX, clientY, assembly.id);
  });
  composerAssemblyMenu.appendChild(transferButton);

  if (composerPendingTransferSource?.assemblyId) {
    const cancelTransferButton = document.createElement("button");
    cancelTransferButton.type = "button";
    cancelTransferButton.textContent = "Cancel Transfer Draft";
    cancelTransferButton.addEventListener("click", () => {
      clearComposerPendingTransfer();
      closeComposerAssemblyMenu();
      openComposerAssemblyPropertiesMenuAt(clientX, clientY, assembly.id);
    });
    composerAssemblyMenu.appendChild(cancelTransferButton);
  }

  appendComposerMenuSectionHeader(composerAssemblyMenu, "Display");

  const historyButton = document.createElement("button");
  historyButton.type = "button";
  historyButton.textContent = assembly.historyTraceEnabled ? "Hide History" : "Show History";
  historyButton.addEventListener("click", () => {
    const liveAssembly = getComposerAssemblyDraftById(assembly.id);
    if (!liveAssembly) {
      return;
    }
    liveAssembly.historyTraceEnabled = !liveAssembly.historyTraceEnabled;
    closeComposerAssemblyMenu();
    renderComposerJsonPreview();
    openComposerAssemblyPropertiesMenuAt(clientX, clientY, assembly.id);
  });
  composerAssemblyMenu.appendChild(historyButton);

  const envelopeButton = document.createElement("button");
  envelopeButton.type = "button";
  envelopeButton.textContent = assembly.envelopeEnabled ? "Hide Envelope" : "Show Envelope";
  envelopeButton.addEventListener("click", () => {
    const liveAssembly = getComposerAssemblyDraftById(assembly.id);
    if (!liveAssembly) {
      return;
    }
    liveAssembly.envelopeEnabled = !liveAssembly.envelopeEnabled;
    closeComposerAssemblyMenu();
    renderComposerJsonPreview();
    openComposerAssemblyPropertiesMenuAt(clientX, clientY, assembly.id);
  });
  composerAssemblyMenu.appendChild(envelopeButton);

  appendComposerMenuSectionHeader(composerAssemblyMenu, "Danger");

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Remove";
  removeButton.className = "composer-assembly-menu-danger";
  removeButton.disabled = composerAssemblyDrafts.length <= 1;
  removeButton.addEventListener("click", () => {
    composerAssemblyDrafts = composerAssemblyDrafts.filter((candidate) => candidate?.id !== assembly.id);
    ensureComposerAssemblyDrafts();
    setComposerSelectedAssembly(composerAssemblyDrafts[0]?.id ?? null, {
      persistCurrentPath: false,
    });
    closeComposerAssemblyMenu();
    renderComposerAssemblyEditor();
    renderComposerJsonPreview();
  });
  composerAssemblyMenu.appendChild(removeButton);
  positionComposerAssemblyMenu(clientX, clientY, 320, 720);
}

function getNextComposerAssemblyId(baseId) {
  const normalizedBase = sanitizeComposerEntityId(baseId, "assembly");
  let suffix = 1;
  let candidate = normalizedBase;
  const existingIds = new Set(composerAssemblyDrafts.map((assembly) => assembly?.id));
  while (existingIds.has(candidate)) {
    suffix += 1;
    candidate = `${normalizedBase}_${suffix}`;
  }
  return candidate;
}

function createBuiltInComposerAssemblyDraft(templateId, position = [0, 0, 0], options = {}) {
  const normalizedPosition = Array.isArray(position)
    ? [
        Number(position[0] ?? 0) || 0,
        Number(position[1] ?? 0) || 0,
        Number(position[2] ?? 0) || 0,
      ]
    : [0, 0, 0];
  const sceneRole = normalizeComposerAssemblySceneRole(options.sceneRole);
  const buildDraft = (draft) => normalizeComposerAssemblyDraft(draft, composerAssemblyDrafts.length);
  const assemblyFactories = {
    positrino: () => {
      const id = getNextComposerAssemblyId("positrino");
      return buildDraft({
        id,
        name: "Positrino",
        role: "positrino",
        sceneRole,
        position: normalizedPosition,
        members: ["positrino_1"],
        subassemblies: [],
        pathPoints: createComposerDefaultPathPoints(normalizedPosition),
      });
    },
    electrino: () => {
      const id = getNextComposerAssemblyId("electrino");
      return buildDraft({
        id,
        name: "Electrino",
        role: "electrino",
        sceneRole,
        position: normalizedPosition,
        members: ["electrino_1"],
        subassemblies: [],
        pathPoints: createComposerDefaultPathPoints(normalizedPosition),
      });
    },
    electron: () => {
      const id = getNextComposerAssemblyId("electron");
      return buildDraft({
        id,
        name: "Electron",
        role: "electron",
        sceneRole,
        position: normalizedPosition,
        members: [
          "positrino_1",
          "electrino_1",
          "positrino_2",
          "electrino_2",
          "positrino_3",
          "electrino_3",
          ...createComposerPersonalityMembers(getComposerBuiltInPersonalityStates("electron")),
        ],
        subassemblies: [],
        pathPoints: createComposerDefaultPathPoints(normalizedPosition),
        core: createComposerDefaultCoreSpec(id),
      });
    },
    fermion_gen1: () => {
      const id = getNextComposerAssemblyId("fermion");
      return buildDraft({
        id,
        name: "Gen I Fermion",
        role: "fermion_gen1",
        sceneRole,
        position: normalizedPosition,
        members: [
          "positrino_1",
          "electrino_1",
          "positrino_2",
          "electrino_2",
          "positrino_3",
          "electrino_3",
          ...createComposerGenIFermionPersonalityMembers(),
        ],
        subassemblies: [],
        pathPoints: createComposerDefaultPathPoints(normalizedPosition),
        core: createComposerDefaultCoreSpec(id),
      });
    },
    down_quark: () => {
      const id = getNextComposerAssemblyId("down_quark");
      return buildDraft({
        id,
        name: "Down Quark",
        role: "down_quark",
        sceneRole,
        position: normalizedPosition,
        members: [
          "positrino_1",
          "electrino_1",
          "positrino_2",
          "electrino_2",
          "positrino_3",
          "electrino_3",
          ...createComposerPersonalityMembers(getComposerBuiltInPersonalityStates("down_quark")),
        ],
        subassemblies: [],
        pathPoints: createComposerDefaultPathPoints(normalizedPosition),
        core: createComposerDefaultCoreSpec(id),
      });
    },
    up_quark: () => {
      const id = getNextComposerAssemblyId("up_quark");
      return buildDraft({
        id,
        name: "Up Quark",
        role: "up_quark",
        sceneRole,
        position: normalizedPosition,
        members: [
          "positrino_1",
          "electrino_1",
          ...createComposerPersonalityMembers(getComposerBuiltInPersonalityStates("up_quark")),
        ],
        subassemblies: [],
        pathPoints: createComposerDefaultPathPoints(normalizedPosition),
        core: createComposerDefaultCoreSpec(id, { binaryCount: 1 }),
      });
    },
    noether_core: () => {
      const id = getNextComposerAssemblyId("noether_core");
      return buildDraft({
        id,
        name: "Noether Core",
        role: "assembly",
        sceneRole,
        position: normalizedPosition,
        members: [
          "positrino_1",
          "electrino_1",
          "positrino_2",
          "electrino_2",
          "positrino_3",
          "electrino_3",
        ],
        subassemblies: [],
        pathPoints: createComposerDefaultPathPoints(normalizedPosition),
        core: createComposerDefaultCoreSpec(id),
      });
    },
  };
  return (assemblyFactories[templateId] ?? assemblyFactories.noether_core)();
}

function addBuiltInComposerAssembly(templateId, position, options = {}) {
  const nextAssembly = createBuiltInComposerAssemblyDraft(templateId, position, options);
  composerAssemblyDrafts.push(nextAssembly);
  setComposerSelectedAssembly(nextAssembly.id);
  renderComposerAssemblyEditor();
  renderComposerJsonPreview();
}

function readComposerFormState() {
  const rawId = composerSceneIdInput?.value ?? "composer_scene";
  const id = sanitizeComposerId(rawId);
  if (composerSceneIdInput && composerSceneIdInput.value !== id) {
    composerSceneIdInput.value = id;
  }
  const rawName = composerSceneNameInput?.value ?? "";
  const name = rawName.trim() || "Composer Scene";
  ensureComposerAssemblyDrafts();
  const transferListRaw = getComposerTransferListRaw();
  const transferHasInput = transferListRaw.trim().length > 0;
  const transferParse = parseComposerTransfers(transferListRaw);
  return {
    id,
    name,
    assembliesDraft: composerAssemblyDrafts.map((draft, index) =>
      normalizeComposerAssemblyDraft(draft, index)
    ),
    transfers: transferParse.entries,
    transferListRaw,
    diagnostics: {
      transferHasInput,
      transferErrorLines: transferParse.errors,
    },
  };
}

function formatComposerTimingStatus(documentData, diagnostics = {}) {
  const pauseCount = Array.isArray(documentData?.scene?.pauses) ? documentData.scene.pauses.length : 0;
  const warpCount = Array.isArray(documentData?.scene?.timeWarps) ? documentData.scene.timeWarps.length : 0;
  const parts = [
    `${pauseCount} pause${pauseCount === 1 ? "" : "s"}`,
    `${warpCount} warp${warpCount === 1 ? "" : "s"}`,
  ];
  const timingErrors = Array.isArray(diagnostics?.timingErrors) ? diagnostics.timingErrors : [];
  if (!timingErrors.length) {
    return `Timing OK: ${parts.join(" • ")}`;
  }
  const grouped = timingErrors.reduce((accumulator, entry) => {
    const existing = accumulator.get(entry.kind) ?? [];
    existing.push(entry.line);
    accumulator.set(entry.kind, existing);
    return accumulator;
  }, new Map());
  const detail = [...grouped.entries()]
    .map(([kind, lines]) => `${kind} line${lines.length === 1 ? "" : "s"} ${lines.join(", ")}`)
    .join("; ");
  return `Timing OK: ${parts.join(" • ")}. Ignored invalid ${detail}.`;
}

function formatComposerInlineTimingStatus(kind, diagnostics = {}, parsedCount = 0) {
  const invalidLines = Array.isArray(diagnostics?.[`${kind}ErrorLines`])
    ? diagnostics[`${kind}ErrorLines`]
    : [];
  const hasInput = !!diagnostics?.[`${kind}HasInput`];
  const label =
    kind === "marker" ? "timeline note" : kind === "pause" ? "pause" : "warp";
  if (!hasInput) {
    if (kind === "marker") {
      return {
        text: "No timeline notes authored.",
        invalid: false,
      };
    }
    return {
      text: `No ${label}s authored.`,
      invalid: false,
    };
  }
  if (invalidLines.length) {
    return {
      text: `Parsed ${parsedCount} ${label}${parsedCount === 1 ? "" : "s"}. Ignored invalid line${
        invalidLines.length === 1 ? "" : "s"
      } ${invalidLines.join(", ")}.`,
      invalid: true,
    };
  }
  return {
    text: `Parsed ${parsedCount} ${label}${parsedCount === 1 ? "" : "s"}.`,
    invalid: false,
  };
}

function updateComposerTimingDiagnostics(documentData, diagnostics = {}) {
  const graphics = getComposerGraphicTimelineOverlays(documentData);
  const pauses = Array.isArray(documentData?.scene?.pauses) ? documentData.scene.pauses : [];
  const timeWarps = Array.isArray(documentData?.scene?.timeWarps) ? documentData.scene.timeWarps : [];
  const transfers = Array.isArray(documentData?.transfers) ? documentData.transfers : [];
  const reactions = Array.isArray(documentData?.reactions) ? documentData.reactions : [];

  const markerCount = diagnostics?.markerHasInput ? markers.length : 0;
  const pauseCount = diagnostics?.pauseHasInput ? pauses.length : 0;
  const warpCount = diagnostics?.warpHasInput ? timeWarps.length : 0;
  const reactionCount = diagnostics?.reactionHasInput ? reactions.length : 0;

  const markerStatus = formatComposerInlineTimingStatus("marker", diagnostics, markerCount);
  const pauseStatus = formatComposerInlineTimingStatus("pause", diagnostics, pauseCount);
  const warpStatus = formatComposerInlineTimingStatus("warp", diagnostics, warpCount);
  const transferErrors = Array.isArray(diagnostics?.transferErrorLines) ? diagnostics.transferErrorLines : [];
  const transferHasInput = !!diagnostics?.transferHasInput;
  const transferStatus = !transferHasInput
    ? { text: "No transfers authored.", invalid: false }
    : transferErrors.length
      ? {
          text: `Parsed ${transfers.length} transfer${transfers.length === 1 ? "" : "s"}. Ignored invalid line${
            transferErrors.length === 1 ? "" : "s"
          } ${transferErrors.join(", ")}.`,
          invalid: true,
        }
      : {
          text: `Parsed ${transfers.length} transfer${transfers.length === 1 ? "" : "s"}.`,
          invalid: false,
        };
  const reactionErrors = Array.isArray(diagnostics?.reactionErrorLines)
    ? diagnostics.reactionErrorLines
    : [];
  const reactionHasInput = !!diagnostics?.reactionHasInput;
  const reactionStatus = !reactionHasInput
    ? { text: "No reactions staged.", invalid: false }
    : reactionErrors.length
      ? {
          text: `Parsed ${reactionCount} reaction stage${reactionCount === 1 ? "" : "s"}. Ignored invalid line${
            reactionErrors.length === 1 ? "" : "s"
          } ${reactionErrors.join(", ")}.`,
          invalid: true,
        }
      : {
          text: `Parsed ${reactionCount} reaction stage${reactionCount === 1 ? "" : "s"}.`,
          invalid: false,
        };

  if (composerMarkerStatus) {
    composerMarkerStatus.textContent = markerStatus.text;
    composerMarkerStatus.classList.toggle("is-invalid", markerStatus.invalid);
  }
  if (composerPauseStatus) {
    composerPauseStatus.textContent = pauseStatus.text;
    composerPauseStatus.classList.toggle("is-invalid", pauseStatus.invalid);
  }
  if (composerWarpStatus) {
    composerWarpStatus.textContent = warpStatus.text;
    composerWarpStatus.classList.toggle("is-invalid", warpStatus.invalid);
  }
  if (composerTransferStatus) {
    composerTransferStatus.textContent = transferStatus.text;
    composerTransferStatus.classList.toggle("is-invalid", transferStatus.invalid);
  }
  if (composerReactionStatus) {
    composerReactionStatus.textContent = reactionStatus.text;
    composerReactionStatus.classList.toggle("is-invalid", reactionStatus.invalid);
  }

  if (composerMarkerListInput) {
    composerMarkerListInput.classList.toggle("is-invalid", markerStatus.invalid);
  }
  if (composerPauseListInput) {
    composerPauseListInput.classList.toggle("is-invalid", pauseStatus.invalid);
  }
  if (composerWarpListInput) {
    composerWarpListInput.classList.toggle("is-invalid", warpStatus.invalid);
  }
  if (composerTransferListInput) {
    composerTransferListInput.classList.toggle("is-invalid", transferStatus.invalid);
  }
  if (composerReactionListInput) {
    composerReactionListInput.classList.toggle("is-invalid", reactionStatus.invalid);
  }
}

function readComposerTimingState() {
  const durationRaw = readNumberInput(composerSceneDurationInput, 24);
  const duration = Math.max(1, Number(durationRaw.toFixed(3)));
  if (composerSceneDurationInput) {
    composerSceneDurationInput.value = String(duration);
  }
  const markers = [];
  const markerHasInput = false;
  const markerParse = {
    errors: [],
  };
  const pauseListRaw = composerPauseListInput?.value ?? "";
  const pauseHasInput = pauseListRaw.trim().length > 0;
  const pauseParse = parseComposerTimingLines(pauseListRaw, (line, lineNumber) => {
    const parts = line.split(",").map((part) => part.trim());
    if (parts.length !== 2) {
      return null;
    }
    const [rawStart, rawDuration] = parts.map((part) => Number(part));
    if (!Number.isFinite(rawStart) || !Number.isFinite(rawDuration) || rawDuration <= 0) {
      return null;
    }
    const span = clampComposerTimelineSpan(rawStart, rawStart + rawDuration, duration);
    return {
      id: `pause_authored_${lineNumber}`,
      start: span.start,
      duration: span.span,
    };
  });
  const pauses = [...pauseParse.entries].sort((left, right) => left.start - right.start);

  const warpListRaw = composerWarpListInput?.value ?? "";
  const warpHasInput = warpListRaw.trim().length > 0;
  const warpParse = parseComposerTimingLines(warpListRaw, (line, lineNumber) => {
    const parts = line.split(",").map((part) => part.trim());
    if (parts.length !== 3) {
      return null;
    }
    const [rawStart, rawEnd, rawRate] = parts.map((part) => Number(part));
    if (
      !Number.isFinite(rawStart) ||
      !Number.isFinite(rawEnd) ||
      !Number.isFinite(rawRate) ||
      rawRate <= 0
    ) {
      return null;
    }
    const span = clampComposerTimelineSpan(rawStart, rawEnd, duration);
    return {
      id: `warp_authored_${lineNumber}`,
      start: span.start,
      end: span.end,
      rate: Number(rawRate.toFixed(3)),
    };
  });
  const timeWarps = [...warpParse.entries].sort((left, right) => left.start - right.start);

  return {
    time: {
      timeBase: "seconds",
      start: 0,
      end: duration,
      playbackRate: 1,
      loop: !!composerSceneLoopInput?.checked,
    },
    markers,
    pauses,
    timeWarps,
    diagnostics: {
      markerHasInput,
      pauseHasInput,
      warpHasInput,
      markerErrorLines: markerParse.errors,
      pauseErrorLines: pauseParse.errors,
      warpErrorLines: warpParse.errors,
      timingErrors: [
        ...markerParse.errors.map((line) => ({ kind: "graphic", line })),
        ...pauseParse.errors.map((line) => ({ kind: "pause", line })),
        ...warpParse.errors.map((line) => ({ kind: "warp", line })),
      ],
    },
  };
}

function readComposerDraftState() {
  persistComposerPathStateToSelectedAssembly();
  const state = readComposerFormState();
  const timing = readComposerTimingState();
  const reactionListRaw = getComposerReactionListRaw();
  const reactionHasInput = reactionListRaw.trim().length > 0;
  const reactionParse = parseComposerReactions(
    reactionListRaw,
    {
      transfers: state.transfers,
      duration: Number(timing?.time?.end ?? 24) || 24,
      parseTimingLines: parseComposerTimingLines,
      clampTimelineSpan: clampComposerTimelineSpan,
      normalizeTransferRef: normalizeComposerReactionTransferRef,
    }
  );
  const primaryAssembly = Array.isArray(state.assembliesDraft) ? state.assembliesDraft[0] ?? null : null;
  const pathPoints = normalizeComposerAssemblyPathPoints(primaryAssembly?.pathPoints);
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
    ...state,
    ...timing,
    transfers: state.transfers,
    reactions: reactionParse.entries,
    overlays: normalizeComposerGraphicOverlayList(composerGraphicOverlayDrafts, Number(timing?.time?.end ?? 24) || 24),
    markerListRaw: composerMarkerListInput?.value ?? "",
    pauseListRaw: composerPauseListInput?.value ?? "",
    warpListRaw: composerWarpListInput?.value ?? "",
    transferListRaw: getComposerTransferListRaw(),
    reactionListRaw,
    diagnostics: {
      ...(timing.diagnostics ?? {}),
      ...(state.diagnostics ?? {}),
      reactionHasInput,
      reactionErrorLines: reactionParse.errors,
    },
    pathPoints,
    pathInterpolate: primaryAssembly?.pathInterpolate ?? composerPathState.interpolate,
    pathClosed: !!primaryAssembly?.pathClosed,
    frameRotation: [
      Number(composerFrameState.rotation.x.toFixed(4)),
      Number(composerFrameState.rotation.y.toFixed(4)),
      Number(composerFrameState.rotation.z.toFixed(4)),
    ],
    frameScale: Number(composerFrameState.scale.toFixed(4)),
    cameraSpeed: Number(composerCameraState.speed.toFixed(4)),
    cameraRadius: Number(composerCameraOrbitState.radius.toFixed(4)),
    cameraOrbit: {
      theta: Number(composerCameraOrbitState.theta.toFixed(4)),
      phi: Number(composerCameraOrbitState.phi.toFixed(4)),
    },
    cameraPoiMode: composerCameraFlightState.poiMode,
    selectedPointIndex: Number.isInteger(composerSelectedPointIndex)
      ? composerSelectedPointIndex
      : null,
    cameraWaypoints,
  };
}

function formatComposerMarkerList(markers = []) {
  void markers;
  return "";
}

function getComposerLibraryEntries() {
  try {
    const raw = window.localStorage.getItem(composerLibraryStorageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (_error) {
    return [];
  }
}

function writeComposerLibraryEntries(entries) {
  try {
    window.localStorage.setItem(composerLibraryStorageKey, JSON.stringify(entries));
    return true;
  } catch (_error) {
    return false;
  }
}

function getComposerSortedLibraryEntries() {
  return getComposerLibraryEntries().sort((left, right) => {
    const leftTime = Date.parse(left?.updatedAt ?? "") || 0;
    const rightTime = Date.parse(right?.updatedAt ?? "") || 0;
    return rightTime - leftTime;
  });
}

function refreshComposerLibraryUi(selectedId = null) {
  const entries = getComposerSortedLibraryEntries();

  if (composerLibrarySelect) {
    composerLibrarySelect.innerHTML = "";
    if (!entries.length) {
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "No saved scenes";
      composerLibrarySelect.appendChild(option);
      composerLibrarySelect.value = "";
    } else {
      entries.forEach((entry) => {
        const option = document.createElement("option");
        option.value = entry.id;
        option.textContent = entry.name || entry.id;
        composerLibrarySelect.appendChild(option);
      });
      const preferredId = selectedId || composerLibrarySelect.value || entries[0].id;
      composerLibrarySelect.value = entries.some((entry) => entry.id === preferredId)
        ? preferredId
        : entries[0].id;
    }
    composerLibrarySelect.disabled = !entries.length;
  }

  if (composerLibraryLoadButton) {
    composerLibraryLoadButton.disabled = !entries.length;
  }
  if (composerLibraryDeleteButton) {
    composerLibraryDeleteButton.disabled = !entries.length;
  }
  if (composerLibraryStatus) {
    composerLibraryStatus.textContent = entries.length
      ? `${entries.length} saved scene${entries.length === 1 ? "" : "s"} in this browser. Export JSON to place one in the repo.`
      : "Library storage is browser-local for now. Save keeps drafts in this browser only.";
  }
}

function applyComposerDraftState(draftState = {}) {
  if (composerSceneIdInput) {
    composerSceneIdInput.value = sanitizeComposerId(draftState.id || "composer_scene");
  }
  if (composerSceneNameInput) {
    composerSceneNameInput.value = (draftState.name || "Composer Scene").trim() || "Composer Scene";
  }
  composerAssemblyDrafts = Array.isArray(draftState.assembliesDraft) && draftState.assembliesDraft.length
    ? draftState.assembliesDraft.map((draft, index) => normalizeComposerAssemblyDraft(draft, index))
    : [];
  if (
    Array.isArray(draftState.pathPoints) &&
    draftState.pathPoints.length &&
    !composerAssemblyDrafts.some((assembly) => Array.isArray(assembly?.pathPoints) && assembly.pathPoints.length)
  ) {
    composerAssemblyDrafts[0].pathPoints = normalizeComposerAssemblyPathPoints(draftState.pathPoints);
    composerAssemblyDrafts[0].pathInterpolate = draftState.pathInterpolate === "polyline" ? "polyline" : "spline";
    composerAssemblyDrafts[0].pathClosed = !!draftState.pathClosed;
  }
  validateComposerSelectedAssemblyId();
  renderComposerAssemblyEditor();

  const duration = Math.max(1, Number(draftState?.time?.end ?? draftState?.time?.duration ?? 24) || 24);
  if (composerSceneDurationInput) {
    composerSceneDurationInput.value = String(duration);
  }
  if (composerSceneLoopInput) {
    composerSceneLoopInput.checked = !!draftState?.time?.loop;
  }
  if (composerMarkerListInput) {
    composerMarkerListInput.value = "";
  }
  if (composerPauseListInput) {
    composerPauseListInput.value =
      typeof draftState.pauseListRaw === "string"
        ? draftState.pauseListRaw
        : formatComposerPauseList(draftState.pauses);
  }
  if (composerWarpListInput) {
    composerWarpListInput.value =
      typeof draftState.warpListRaw === "string"
        ? draftState.warpListRaw
        : formatComposerWarpList(draftState.timeWarps);
  }
  if (composerTransferListInput) {
    composerTransferListInput.value =
      typeof draftState.transferListRaw === "string"
        ? draftState.transferListRaw
        : formatComposerTransferList(draftState.transfers);
  }
  composerTransferListRawState =
    typeof draftState.transferListRaw === "string"
      ? draftState.transferListRaw
      : formatComposerTransferList(draftState.transfers);
  if (composerReactionListInput) {
    composerReactionListInput.value =
      typeof draftState.reactionListRaw === "string"
        ? draftState.reactionListRaw
        : formatComposerReactionList(draftState.reactions);
  }
  composerReactionListRawState =
    typeof draftState.reactionListRaw === "string"
      ? draftState.reactionListRaw
      : formatComposerReactionList(draftState.reactions);
  composerGraphicOverlayDrafts = normalizeComposerGraphicOverlayList(
    draftState.overlays,
    duration
  );

  setComposerSelectedAssembly(composerSelectedAssemblyId, {
    persistCurrentPath: false,
  });
  composerSelectedPointIndex =
    Number.isInteger(draftState.selectedPointIndex) &&
    draftState.selectedPointIndex >= 0 &&
    draftState.selectedPointIndex < composerPathState.points.length
      ? draftState.selectedPointIndex
      : null;
  rebuildComposerControlPoints();
  updateComposerPathGeometry();
  updateComposerPointMaterials();

  const frameRotation = Array.isArray(draftState.frameRotation) ? draftState.frameRotation : [0, 0, 0];
  composerFrameState.rotation.set(
    Number(frameRotation[0] ?? 0) || 0,
    Number(frameRotation[1] ?? 0) || 0,
    Number(frameRotation[2] ?? 0) || 0,
    "YXZ"
  );
  composerFrameState.scale = Math.max(0.01, Number(draftState.frameScale ?? 1) || 1);
  if (composerFrameScaleInput) {
    composerFrameScaleInput.value = Math.log10(composerFrameState.scale).toFixed(2);
  }
  if (composerFrameScaleLabel) {
    composerFrameScaleLabel.textContent = formatScaleLabel(composerFrameState.scale);
  }
  updateComposerFrame();

  composerCameraState.speed = Math.max(0.01, Number(draftState.cameraSpeed ?? 1) || 1);
  if (composerCameraSpeedInput) {
    composerCameraSpeedInput.value = Math.log10(composerCameraState.speed).toFixed(2);
  }
  if (composerCameraSpeedLabel) {
    composerCameraSpeedLabel.textContent = formatScaleLabel(composerCameraState.speed);
  }
  composerCameraOrbitState.radius = Math.max(
    composerCameraOrbitState.minDistance,
    Number(draftState.cameraRadius ?? composerCameraOrbitState.radius ?? 1) || 1
  );
  composerCameraOrbitState.theta = Number(draftState?.cameraOrbit?.theta ?? composerCameraOrbitState.theta) || 0;
  composerCameraOrbitState.phi = clamp(
    Number(draftState?.cameraOrbit?.phi ?? composerCameraOrbitState.phi) || Math.PI / 2,
    0.05,
    Math.PI - 0.05
  );
  syncComposerCameraRadiusInput();

  composerCameraFlightState.poiMode = draftState.cameraPoiMode === "selected" ? "selected" : "origin";
  if (composerCameraPoiSelect) {
    composerCameraPoiSelect.value = composerCameraFlightState.poiMode;
  }
  composerCameraFlightState.waypoints = Array.isArray(draftState.cameraWaypoints)
    ? draftState.cameraWaypoints.map((waypoint) => ({
        position: vectorFromTriplet(waypoint?.position),
        lookAt: vectorFromTriplet(waypoint?.lookAt),
      }))
    : [];
  stopComposerCameraFlightPreview();
  updateComposerCameraFlightDisplay();
  updateComposerWaypointCount();
  updateComposerCameraPoiStatus();
  updateComposerCamera();
}

function saveComposerSceneToLibrary() {
  const draftState = readComposerDraftState();
  const sceneDocument = buildComposerDocumentData(draftState);
  const entries = getComposerLibraryEntries().filter((entry) => entry?.id !== draftState.id);
  entries.push({
    id: draftState.id,
    name: draftState.name,
    updatedAt: new Date().toISOString(),
    draftState,
    sceneDocument,
  });
  if (!writeComposerLibraryEntries(entries)) {
    setComposerStatus("Library save failed. Browser storage is unavailable.");
    refreshComposerLibraryUi();
    return;
  }
  refreshComposerLibraryUi(draftState.id);
  setComposerStatus(`Saved ${draftState.name} to the browser library.`);
}

function loadComposerSceneFromLibrary(sceneId = composerLibrarySelect?.value) {
  const entry = getComposerLibraryEntries().find((candidate) => candidate?.id === sceneId);
  if (!entry?.draftState) {
    setComposerStatus("Select a saved scene to load.");
    refreshComposerLibraryUi();
    return;
  }
  applyComposerDraftState(entry.draftState);
  refreshComposerLibraryUi(entry.id);
  renderComposerJsonPreview();
  setComposerStatus(`Loaded ${entry.name || entry.id} from the browser library.`);
}

function clearComposerScene() {
  const confirmed = globalThis.window?.confirm?.(
    "Clear the current composer scene and reset it to a blank canvas?"
  );
  if (confirmed === false) {
    return;
  }
  const nextId = sanitizeComposerId(composerSceneIdInput?.value ?? "composer_scene");
  const nextName = String(composerSceneNameInput?.value ?? "Composer Scene").trim() || "Composer Scene";
  applyComposerDraftState({
    id: nextId,
    name: nextName,
    assembliesDraft: [],
    time: {
      timeBase: "seconds",
      start: 0,
      end: 24,
      playbackRate: 1,
      loop: false,
    },
    pauses: [],
    timeWarps: [],
    transfers: [],
    reactions: [],
    overlays: [],
    cameraWaypoints: [],
    transferListRaw: "",
    reactionListRaw: "",
    pauseListRaw: "",
    warpListRaw: "",
    markerListRaw: "",
    selectedPointIndex: null,
    diagnostics: {},
  });
  renderComposerJsonPreview();
  setComposerStatus(`Cleared ${nextName}.`);
}

function deleteComposerSceneFromLibrary(sceneId = composerLibrarySelect?.value) {
  if (!sceneId) {
    setComposerStatus("Select a saved scene to delete.");
    refreshComposerLibraryUi();
    return;
  }
  const entries = getComposerLibraryEntries();
  const nextEntries = entries.filter((entry) => entry?.id !== sceneId);
  if (nextEntries.length === entries.length) {
    refreshComposerLibraryUi();
    return;
  }
  if (!writeComposerLibraryEntries(nextEntries)) {
    setComposerStatus("Library delete failed. Browser storage is unavailable.");
    refreshComposerLibraryUi(sceneId);
    return;
  }
  refreshComposerLibraryUi();
  setComposerStatus(`Deleted ${sceneId} from the browser library.`);
}

function buildComposerDocumentData(draftState, options = {}) {
  return createComposerSceneDocument(draftState, options);
}

function buildComposerPreviewData(documentData, options = {}) {
  return buildComposerPreviewSceneData(documentData, {
    palette: composerPalette,
    ...options,
  });
}

function renderComposerJsonPreview() {
  persistComposerPathStateToSelectedAssembly();
  const draftState = readComposerDraftState();
  const documentData = buildComposerDocumentData(draftState);
  try {
    updateComposerViewportFromDocument(documentData);
  } catch (error) {
    composerCurrentDocument = documentData;
    console.error("Composer preview render failed.", error);
    try {
      renderComposerTimeline(documentData);
      updateComposerTimelinePlayhead(composerPlaybackState.playheadSeconds, documentData);
    } catch (timelineError) {
      console.error("Composer timeline fallback failed.", timelineError);
    }
  }
  updateComposerTimingDiagnostics(documentData, draftState.diagnostics);
  refreshComposerLibraryUi();
  setComposerStatus(formatComposerTimingStatus(documentData, draftState.diagnostics));
  if (composerJsonPreview) {
    composerJsonPreview.textContent = JSON.stringify(documentData, null, 2);
  }
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

  composerViewportGroup = new THREE.Group();
  composerFrameGroup.add(composerViewportGroup);

  composerPathGeometry = new THREE.BufferGeometry();
  composerPathLine = new THREE.Line(
    composerPathGeometry,
    new THREE.LineBasicMaterial({
      color: 0x8bdcff,
      transparent: true,
      opacity: 0.9,
    })
  );
  composerFrameGroup.add(composerPathLine);

  composerPointGeometry = new THREE.SphereGeometry(0.085, 20, 20);
  composerPointMaterial = new THREE.MeshBasicMaterial({
    color: 0xffc26a,
    transparent: true,
    opacity: 0.98,
    depthTest: false,
    depthWrite: false,
  });
  composerPointMaterialActive = new THREE.MeshBasicMaterial({
    color: 0x7dd3fc,
    transparent: true,
    opacity: 1,
    depthTest: false,
    depthWrite: false,
  });

  composerRaycaster = new THREE.Raycaster();

  setComposerFrameDefaults();
  setComposerCameraDefaults();
  setComposerTransportButtonIcon(composerPlayToggleButton, "play");
  setComposerTransportButtonIcon(composerPlayResetButton, "restart");
  if (composerSceneButton && !composerSceneButton.dataset.bound) {
    composerSceneButton.addEventListener("click", (event) => {
      event.preventDefault();
      const anchor = getComposerMenuAnchorClientPosition(composerSceneButton);
      openComposerSceneMenuAt(anchor.x, anchor.y);
    });
    composerSceneButton.dataset.bound = "true";
  }
  if (composerSaveButton && !composerSaveButton.dataset.bound) {
    composerSaveButton.addEventListener("click", (event) => {
      event.preventDefault();
      const anchor = getComposerMenuAnchorClientPosition(composerSaveButton);
      openComposerLibraryMenuAt(anchor.x, anchor.y);
    });
    composerSaveButton.dataset.bound = "true";
  }
  if (composerCameraPoiSelect) {
    composerCameraPoiSelect.value = composerCameraFlightState.poiMode;
  }
  updateComposerCameraPoiStatus();
  syncComposerCameraRadiusInput();
  if (composerAssemblyAddButton && !composerAssemblyAddButton.dataset.bound) {
    composerAssemblyAddButton.addEventListener("click", () => {
      ensureComposerAssemblyDrafts();
      composerAssemblyDrafts.push(
        createDefaultComposerAssemblyDraft(composerAssemblyDrafts.length)
      );
      renderComposerAssemblyEditor();
      renderComposerJsonPreview();
    });
    composerAssemblyAddButton.dataset.bound = "true";
  }
  composerHudViewportToggleBindings.forEach(({ button, key }) => {
    if (!button || button.dataset.bound) {
      return;
    }
    button.addEventListener("click", () => {
      if (button.disabled) {
        return;
      }
      toggleComposerViewportDisplayFlag(key);
      applyComposerViewportDisplayState();
      renderComposerJsonPreview();
    });
    button.dataset.bound = "true";
  });
  renderComposerAssemblyEditor();

  wireComposerCanvasUiListeners({
    composerCanvas,
    onComposerPointerDown,
    onComposerPointerMove,
    onComposerPointerUp,
    onComposerWheel,
    onComposerContextMenu,
  });

  if (composerTimelineTrack && !composerTimelineTrack.dataset.contextWired) {
    composerTimelineTrack.dataset.contextWired = "true";
    composerTimelineTrack.addEventListener("contextmenu", onComposerTimelineContextMenu);
  }

  if (composerTimelineSummary && !composerTimelineSummary.dataset.contextWired) {
    composerTimelineSummary.dataset.contextWired = "true";
    composerTimelineSummary.addEventListener("contextmenu", onComposerTimelineSummaryContextMenu);
  }
  if (composerTimelineSummary && !composerTimelineSummary.dataset.clickWired) {
    composerTimelineSummary.dataset.clickWired = "true";
    composerTimelineSummary.addEventListener("click", (event) => {
      event.preventDefault();
      closeComposerAssemblyMenu();
      const anchor =
        event.clientX || event.clientY
          ? { x: event.clientX, y: event.clientY }
          : getComposerMenuAnchorClientPosition(composerTimelineSummary);
      openComposerTimelineSummaryMenuAt(anchor.x, anchor.y);
    });
  }

  if (composerAssemblyMenu && !composerAssemblyMenu.dataset.wired) {
    composerAssemblyMenu.dataset.wired = "true";
    composerAssemblyMenu.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-template]");
      if (!button) {
        return;
      }
      const position = JSON.parse(composerAssemblyMenu.dataset.position || "[0,0,0]");
      addBuiltInComposerAssembly(button.dataset.template, position);
      closeComposerAssemblyMenu();
    });
  }

  if (composerOverlay && !composerOverlay.dataset.assemblyMenuWired) {
    composerOverlay.dataset.assemblyMenuWired = "true";
    composerOverlay.addEventListener("pointerdown", (event) => {
      if (!composerAssemblyMenu?.classList.contains("is-open")) {
        return;
      }
      if (composerAssemblyMenu.contains(event.target)) {
        return;
      }
      if (event.target === composerCanvas && event.button === 2) {
        return;
      }
      closeComposerAssemblyMenu();
    }, { passive: true });
  }

  loadComposerPathStateFromSelectedAssembly();
  refreshComposerLibraryUi(composerSceneIdInput?.value ?? null);
  renderComposerJsonPreview();
  updateComposerCameraFlightDisplay();
  updateComposerWaypointCount();

  updateComposerFrame();
  updateComposerCamera();
  resizeComposerCanvas();
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
  composerFrameGroup.scale.setScalar(getComposerEffectiveFrameScale());
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
  const selectedAssembly = getComposerSelectedAssembly();
  const bareOriginMarker = isComposerBareArchitrinoAssembly(selectedAssembly);
  composerPointMeshes.forEach((mesh) => {
    disposeComposerMarkerHandle(mesh);
    composerFrameGroup.remove(mesh);
  });
  composerPointMeshes = composerPathState.points.map((point, index) => {
    const mesh = new THREE.Mesh(composerPointGeometry, composerPointMaterial);
    mesh.position.copy(point);
    mesh.renderOrder = 12;
    mesh.userData.pointIndex = index;
    if (!(bareOriginMarker && index === 0)) {
      const labelSprite = createComposerPointLabelSprite(getComposerSelectedAssemblyLetter());
      labelSprite.position.set(0, 0, 0);
      mesh.userData.pointLabelSprite = labelSprite;
      mesh.add(labelSprite);
    }
    const hitProxy = createComposerMarkerHitProxy(0.19);
    mesh.userData.hitProxy = hitProxy;
    mesh.add(hitProxy);
    composerFrameGroup.add(mesh);
    return mesh;
  });
  updateComposerPointMaterials();
  applyComposerViewportDisplayState();
}

function sampleComposerPath(points, interpolate = "spline", closed = false) {
  const source = Array.isArray(points)
    ? points.map((point) =>
        point instanceof THREE.Vector3 ? point.clone() : new THREE.Vector3(point[0], point[1], point[2])
      )
    : [];
  if (!source.length) {
    return [];
  }
  if (interpolate === "spline" && source.length > 2) {
    const curve = new THREE.CatmullRomCurve3(source, closed, "catmullrom", 0.5);
    return curve.getPoints(160);
  }
  if (closed) {
    return [...source, source[0].clone()];
  }
  return source;
}

function updateComposerPathGeometry(points = composerPathState.points) {
  if (!composerPathGeometry) {
    return [];
  }
  const samples = sampleComposerPath(
    points,
    composerPathState.interpolate,
    composerPathState.closed
  );
  composerPathGeometry.setFromPoints(samples);
  if (samples.length) {
    composerPathGeometry.computeBoundingSphere();
  }
  return samples;
}

function clearComposerViewportVisuals() {
  composerAssemblyMeshes.forEach((mesh) => {
    composerViewportGroup?.remove(mesh);
    mesh.traverse?.((child) => {
      if (child === mesh) {
        return;
      }
      child.geometry?.dispose?.();
      child.material?.dispose?.();
      child.material?.map?.dispose?.();
    });
    mesh.geometry?.dispose?.();
    mesh.material?.dispose?.();
    mesh.material?.map?.dispose?.();
  });
  composerAssemblyMeshes = [];
  composerMemberHandleMeshes = [];
  composerSubassemblyHandleMeshes = [];
  composerShellMeshes.forEach((mesh) => {
    composerViewportGroup?.remove(mesh);
    mesh.traverse?.((child) => {
      if (child === mesh) {
        return;
      }
      child.geometry?.dispose?.();
      child.material?.dispose?.();
    });
    mesh.geometry?.dispose?.();
    mesh.material?.dispose?.();
  });
  composerShellMeshes = [];
  composerEnvelopeMeshes.forEach((mesh) => {
    composerViewportGroup?.remove(mesh);
    mesh.traverse?.((child) => {
      if (child === mesh) {
        return;
      }
      child.geometry?.dispose?.();
      child.material?.dispose?.();
    });
    mesh.geometry?.dispose?.();
    mesh.material?.dispose?.();
  });
  composerEnvelopeMeshes = [];
  composerOrbitTraceLines.forEach((line) => {
    composerViewportGroup?.remove(line);
    line.geometry?.dispose?.();
    line.material?.dispose?.();
  });
  composerOrbitTraceLines = [];
  composerHistoryTraceLines.forEach((line) => {
    composerViewportGroup?.remove(line);
    line.geometry?.dispose?.();
    line.material?.dispose?.();
  });
  composerHistoryTraceLines = [];
  composerTransferLines.forEach((line) => {
    composerViewportGroup?.remove(line);
    line.geometry?.dispose?.();
    line.material?.dispose?.();
  });
  composerTransferLines = [];
  composerAxisGuideLines.forEach((line) => {
    composerViewportGroup?.remove(line);
    line.geometry?.dispose?.();
    line.material?.dispose?.();
  });
  composerAxisGuideLines = [];
  composerOrbitParticleMeshes.forEach((mesh) => {
    composerViewportGroup?.remove(mesh);
    mesh.geometry?.dispose?.();
    mesh.material?.dispose?.();
  });
  composerOrbitParticleMeshes = [];
  composerMemberLabelSprites.forEach((sprite) => {
    composerViewportGroup?.remove(sprite);
    sprite.material?.map?.dispose?.();
    sprite.material?.dispose?.();
  });
  composerMemberLabelSprites = [];
  composerGraphicOverlayGroups.forEach((group) => {
    composerViewportGroup?.remove(group);
    group.traverse?.((child) => {
      if (child === group) {
        return;
      }
      child.geometry?.dispose?.();
      child.material?.map?.dispose?.();
      child.material?.dispose?.();
    });
  });
  composerGraphicOverlayGroups = [];
  composerGraphicOverlayHandleMeshes = [];
  composerPersonalityHandleMeshes = [];
  clearComposerViewportMediaOverlays();
  composerMemberAnchors = new Map();
  if (composerDocumentCameraPathLine) {
    composerViewportGroup?.remove(composerDocumentCameraPathLine);
    composerDocumentCameraPathLine.geometry?.dispose?.();
    composerDocumentCameraPathLine.material?.dispose?.();
    composerDocumentCameraPathLine = null;
  }
  composerDocumentCameraWaypointMeshes.forEach((mesh) => {
    composerViewportGroup?.remove(mesh);
    mesh.geometry?.dispose?.();
    mesh.material?.dispose?.();
  });
  composerDocumentCameraWaypointMeshes = [];
  if (composerDocumentCameraShotMesh) {
    composerViewportGroup?.remove(composerDocumentCameraShotMesh);
    composerDocumentCameraShotMesh.geometry?.dispose?.();
    composerDocumentCameraShotMesh.material?.dispose?.();
    composerDocumentCameraShotMesh = null;
  }
  if (composerDocumentCameraTargetMesh) {
    composerViewportGroup?.remove(composerDocumentCameraTargetMesh);
    composerDocumentCameraTargetMesh.geometry?.dispose?.();
    composerDocumentCameraTargetMesh.material?.dispose?.();
    composerDocumentCameraTargetMesh = null;
  }
  if (composerDocumentCameraLookLine) {
    composerViewportGroup?.remove(composerDocumentCameraLookLine);
    composerDocumentCameraLookLine.geometry?.dispose?.();
    composerDocumentCameraLookLine.material?.dispose?.();
    composerDocumentCameraLookLine = null;
  }
}

function computeComposerAssemblyBasePosition(assembly, index, count, pathById) {
  const transformPosition = assembly?.transform?.position;
  const hasParent = !!assembly?.parentId;
  const hasExplicitTransformPosition =
    Array.isArray(transformPosition) &&
    transformPosition.length >= 3 &&
    (transformPosition.some((value) => Number(value ?? 0) !== 0) || hasParent);
  if (hasExplicitTransformPosition) {
    return new THREE.Vector3(transformPosition[0], transformPosition[1], transformPosition[2]);
  }
  const motions = Array.isArray(assembly?.motion)
    ? assembly.motion
    : assembly?.motion
      ? [assembly.motion]
      : [];
  const transportMotion = motions.find((motion) => motion?.type === "path.transport");
  if (transportMotion?.pathId && pathById.has(transportMotion.pathId)) {
    const path = pathById.get(transportMotion.pathId);
    if (Array.isArray(path?.payload?.points) && path.payload.points.length) {
      const [x = 0, y = 0, z = 0] = path.payload.points[0];
      return new THREE.Vector3(x, y, z);
    }
  }
  if (count <= 1) {
    return new THREE.Vector3(0, 0, 0);
  }
  const angle = (index / count) * Math.PI * 2;
  const radius = 1.6 + count * 0.08;
  return new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
}

function sampleComposerPointAt(points, normalizedT, options = {}) {
  if (!Array.isArray(points) || !points.length) {
    return new THREE.Vector3();
  }
  if (points.length === 1) {
    const [x = 0, y = 0, z = 0] = points[0];
    return new THREE.Vector3(x, y, z);
  }
  const interpolate = options.interpolate ?? "spline";
  const closed = !!options.closed;
  if (interpolate === "spline" && points.length > 2) {
    const vectors = points.map(([x = 0, y = 0, z = 0]) => new THREE.Vector3(x, y, z));
    const curve = new THREE.CatmullRomCurve3(vectors, closed, "catmullrom", 0.5);
    return curve.getPoint(clamp(normalizedT, 0, 1));
  }
  const source = closed ? [...points, points[0]] : points;
  const clamped = clamp(normalizedT, 0, 1);
  const scaled = clamped * (source.length - 1);
  const baseIndex = Math.floor(scaled);
  const nextIndex = Math.min(source.length - 1, baseIndex + 1);
  const localT = scaled - baseIndex;
  const from = source[baseIndex];
  const to = source[nextIndex];
  return new THREE.Vector3(
    THREE.MathUtils.lerp(from[0] ?? 0, to[0] ?? 0, localT),
    THREE.MathUtils.lerp(from[1] ?? 0, to[1] ?? 0, localT),
    THREE.MathUtils.lerp(from[2] ?? 0, to[2] ?? 0, localT)
  );
}

function sampleComposerCurvePoints(points, segments = 80) {
  const source = Array.isArray(points) ? points : [];
  if (!source.length) {
    return [];
  }
  if (source.length === 1) {
    const [x = 0, y = 0, z = 0] = source[0];
    return [new THREE.Vector3(x, y, z)];
  }
  const vectors = source.map(([x = 0, y = 0, z = 0]) => new THREE.Vector3(x, y, z));
  const curve = new THREE.CatmullRomCurve3(vectors, false, "catmullrom", 0.5);
  return curve.getPoints(Math.max(2, segments));
}

function sampleComposerCameraWaypointState(waypoints, normalizedT) {
  const source = Array.isArray(waypoints) ? waypoints : [];
  if (!source.length) {
    return {
      position: new THREE.Vector3(),
      lookAt: new THREE.Vector3(),
    };
  }
  if (source.length === 1) {
    return {
      position: vectorFromTriplet(source[0]?.position),
      lookAt: vectorFromTriplet(source[0]?.lookAt),
    };
  }
  const positions = source.map((waypoint) => vectorFromTriplet(waypoint?.position));
  const lookAts = source.map((waypoint) => vectorFromTriplet(waypoint?.lookAt));
  const curve = new THREE.CatmullRomCurve3(positions, false, "catmullrom", 0.5);
  const lookCurve = new THREE.CatmullRomCurve3(lookAts, false, "catmullrom", 0.5);
  const t = clamp(normalizedT, 0, 1);
  return {
    position: curve.getPointAt(t),
    lookAt: lookCurve.getPointAt(t),
  };
}

function getComposerCameraWaypointDisplayPosition(waypoint) {
  const position = vectorFromTriplet(waypoint?.position);
  const lookAt = vectorFromTriplet(waypoint?.lookAt);
  const towardTarget = lookAt.clone().sub(position);
  const distance = towardTarget.length();
  if (distance <= 0.001) {
    return position;
  }
  const shiftDistance = Math.min(0.6, distance * 0.18);
  return position.clone().add(towardTarget.normalize().multiplyScalar(shiftDistance));
}

function getComposerOrbitBasis(motion) {
  const normal = Array.isArray(motion?.planeNormal)
    ? new THREE.Vector3(
        motion.planeNormal[0] ?? 0,
        motion.planeNormal[1] ?? 1,
        motion.planeNormal[2] ?? 0
      )
    : new THREE.Vector3(0, 1, 0);
  if (normal.lengthSq() === 0) {
    normal.set(0, 1, 0);
  }
  normal.normalize();
  const reference =
    Math.abs(normal.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  const u = new THREE.Vector3().crossVectors(reference, normal).normalize();
  const v = new THREE.Vector3().crossVectors(normal, u).normalize();
  return { normal, u, v };
}

function getComposerPlaybackRateAtTime(documentData, timeSeconds) {
  const timeWarps = Array.isArray(documentData?.scene?.timeWarps) ? documentData.scene.timeWarps : [];
  const activeWarp = timeWarps.find((warp) => timeSeconds >= warp.start && timeSeconds < warp.end);
  return Number(activeWarp?.rate ?? 1) || 1;
}

function getComposerMotionRateAtTime(documentData, timeSeconds) {
  const pauses = Array.isArray(documentData?.scene?.pauses) ? documentData.scene.pauses : [];
  const activePause = pauses.find((pause) => {
    const start = Number(pause?.start ?? 0);
    const duration = Math.max(0, Number(pause?.duration ?? 0) || 0);
    return timeSeconds >= start && timeSeconds < start + duration;
  });
  if (activePause) {
    return 0;
  }
  return getComposerPlaybackRateAtTime(documentData, timeSeconds);
}

function getComposerIntegratedMotionTime(documentData, timeSeconds) {
  const timeWindow = getComposerSceneTimeWindow(documentData);
  const targetTime = clamp(Number(timeSeconds) || 0, timeWindow.start, timeWindow.end);
  if (targetTime <= timeWindow.start) {
    return 0;
  }
  const pauses = Array.isArray(documentData?.scene?.pauses) ? documentData.scene.pauses : [];
  const warps = Array.isArray(documentData?.scene?.timeWarps) ? documentData.scene.timeWarps : [];
  const boundaries = new Set([timeWindow.start, targetTime]);
  pauses.forEach((pause) => {
    const start = clamp(Number(pause?.start ?? 0), timeWindow.start, targetTime);
    const end = clamp(start + Math.max(0, Number(pause?.duration ?? 0) || 0), timeWindow.start, targetTime);
    boundaries.add(start);
    boundaries.add(end);
  });
  warps.forEach((warp) => {
    boundaries.add(clamp(Number(warp?.start ?? 0), timeWindow.start, targetTime));
    boundaries.add(clamp(Number(warp?.end ?? 0), timeWindow.start, targetTime));
  });
  const sortedBoundaries = [...boundaries].sort((left, right) => left - right);
  let total = 0;
  for (let index = 0; index < sortedBoundaries.length - 1; index += 1) {
    const start = sortedBoundaries[index];
    const end = sortedBoundaries[index + 1];
    if (!(end > start)) {
      continue;
    }
    const sampleTime = start + (end - start) * 0.5;
    total += (end - start) * getComposerMotionRateAtTime(documentData, sampleTime);
  }
  return total;
}

function getComposerTotalMotionDuration(documentData) {
  const timeWindow = getComposerSceneTimeWindow(documentData);
  return Math.max(0.0001, getComposerIntegratedMotionTime(documentData, timeWindow.end));
}

function clearComposerTimelineLayer(layer) {
  if (!layer) {
    return;
  }
  while (layer.firstChild) {
    layer.removeChild(layer.firstChild);
  }
}

function createComposerTimelineBand(fractionStart, fractionEnd, className, title, label = "") {
  const band = document.createElement("div");
  band.className = `composer-timeline-band ${className}`;
  const widthFraction = Math.max(0.002, fractionEnd - fractionStart);
  band.style.left = `${fractionStart * 100}%`;
  band.style.width = `${widthFraction * 100}%`;
  if (title) {
    band.title = title;
  }
  if (label) {
    const bandLabel = document.createElement("span");
    bandLabel.className = "composer-timeline-band-label";
    bandLabel.textContent = label;
    band.appendChild(bandLabel);
  }
  return band;
}

function createComposerTimelineMarker(fraction, label, title) {
  const marker = document.createElement("div");
  marker.className = "composer-timeline-marker";
  const shouldShowLabel = String(label ?? "").trim().toLowerCase() !== "start";
  if (fraction <= 0.02) {
    marker.classList.add("is-edge-start");
  } else if (fraction >= 0.98) {
    marker.classList.add("is-edge-end");
  }
  marker.style.left = `${fraction * 100}%`;
  if (title) {
    marker.title = title;
  }
  if (shouldShowLabel) {
    const markerLabel = document.createElement("span");
    markerLabel.className = "composer-timeline-marker-label";
    markerLabel.textContent = label;
    marker.appendChild(markerLabel);
  }
  return marker;
}

function openComposerTimelineSummaryMenuAt(clientX, clientY) {
  if (!composerAssemblyMenu) {
    return;
  }
  const currentDuration = Math.max(1, readNumberInput(composerSceneDurationInput, 24));
  const isLooping = !!composerSceneLoopInput?.checked;
  resetComposerAssemblyMenu("timeline");

  const title = document.createElement("div");
  title.className = "composer-assembly-menu-title";
  title.textContent = "Scene Timing";
  composerAssemblyMenu.appendChild(title);
  const commitTimingDraft = () => {
    const duration = Number(durationInput?.value);
    if (!Number.isFinite(duration) || duration <= 0) {
      durationInput.value = formatComposerTimeInputValue(currentDuration);
      return;
    }
    setComposerSceneDurationValue(duration);
    setComposerSceneLoopValue(!!loopInput?.checked);
    renderComposerJsonPreview();
  };
  const timingBlock = appendComposerMenuBlock(composerAssemblyMenu, "Timing");
  const form = document.createElement("div");
  form.className = "composer-form";
  const durationInput = appendComposerMenuField(form, {
    label: "Total Duration (s)",
    type: "number",
    value: formatComposerTimeInputValue(currentDuration),
    step: 0.1,
    min: 1,
    selectOnFocus: true,
  });
  const loopInput = appendComposerMenuField(form, {
    label: "Loop",
    type: "checkbox",
    value: isLooping,
  });
  loopInput?.closest?.(".composer-field")?.classList?.add("is-toggle-field");
  durationInput?.addEventListener("change", commitTimingDraft);
  durationInput?.addEventListener("blur", commitTimingDraft);
  durationInput?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }
    event.preventDefault();
    commitTimingDraft();
  });
  loopInput?.addEventListener("change", commitTimingDraft);
  timingBlock?.block?.appendChild(form);

  positionComposerAssemblyMenu(clientX, clientY, 224, 176);
}

function applyComposerSceneIdentityDraft(sceneIdValue, sceneNameValue, options = {}) {
  const nextId = sanitizeComposerId(sceneIdValue ?? composerSceneIdInput?.value ?? "composer_scene")
    || "composer_scene";
  const nextName = String(sceneNameValue ?? composerSceneNameInput?.value ?? "").trim()
    || "Composer Scene";
  if (composerSceneIdInput) {
    composerSceneIdInput.value = nextId;
  }
  if (composerSceneNameInput) {
    composerSceneNameInput.value = nextName;
  }
  if (options.renderPreview !== false) {
    renderComposerJsonPreview();
  }
  return {
    id: nextId,
    name: nextName,
  };
}

function openComposerSceneMenuAt(clientX, clientY) {
  if (!composerAssemblyMenu) {
    return;
  }
  resetComposerAssemblyMenu();

  const currentId = sanitizeComposerId(composerSceneIdInput?.value ?? "composer_scene");
  const currentName = String(composerSceneNameInput?.value ?? "").trim() || "Composer Scene";

  const title = document.createElement("div");
  title.className = "composer-assembly-menu-title";
  title.textContent = "Scene";
  composerAssemblyMenu.appendChild(title);

  const subtitle = document.createElement("div");
  subtitle.className = "composer-assembly-menu-subtitle";
  subtitle.textContent = currentName;
  composerAssemblyMenu.appendChild(subtitle);

  const sceneBlock = appendComposerMenuBlock(composerAssemblyMenu, "Identity", {
    text: "Apply",
    onClick: () => {
      applyComposerSceneIdentityDraft(sceneIdInput?.value, sceneNameInput?.value);
      closeComposerAssemblyMenu();
    },
  });
  const sceneForm = document.createElement("div");
  sceneForm.className = "composer-form";
  const sceneIdInput = appendComposerMenuField(sceneForm, {
    label: "Scene ID",
    value: currentId,
  });
  const sceneNameInput = appendComposerMenuField(sceneForm, {
    label: "Scene Name",
    value: currentName,
  });
  sceneBlock?.block?.appendChild(sceneForm);
  appendComposerMenuNote(
    sceneBlock?.block,
    "Assembly editing stays on the canvas. Timeline duration and loop live in the top-right time readout."
  );

  appendComposerMenuButtonRow(composerAssemblyMenu, [
    {
      text: "Library",
      onClick: () => {
        applyComposerSceneIdentityDraft(sceneIdInput?.value, sceneNameInput?.value);
        openComposerLibraryMenuAt(clientX, clientY);
      },
    },
    {
      text: "Composer Docs",
      onClick: () => {
        closeComposerAssemblyMenu();
        composerDocsButton?.click();
      },
    },
  ]);

  positionComposerAssemblyMenu(clientX, clientY, 312, 252);
  sceneNameInput?.focus?.();
  sceneNameInput?.select?.();
}

function openComposerJsonPreviewMenuAt(clientX, clientY) {
  if (!composerAssemblyMenu) {
    return;
  }
  persistComposerPathStateToSelectedAssembly();
  const draftState = readComposerDraftState();
  const sceneDocument = buildComposerDocumentData(draftState);
  const json = JSON.stringify(sceneDocument, null, 2);
  if (composerJsonPreview) {
    composerJsonPreview.textContent = json;
  }
  resetComposerAssemblyMenu();

  const title = document.createElement("div");
  title.className = "composer-assembly-menu-title";
  title.textContent = "JSON Preview";
  composerAssemblyMenu.appendChild(title);

  const subtitle = document.createElement("div");
  subtitle.className = "composer-assembly-menu-subtitle";
  subtitle.textContent = `${draftState.name || "Composer Scene"} • ${draftState.id || "composer_scene"}`;
  composerAssemblyMenu.appendChild(subtitle);

  appendComposerMenuButtonRow(composerAssemblyMenu, [
    {
      text: "Back",
      onClick: () => {
        openComposerLibraryMenuAt(clientX, clientY);
      },
    },
    {
      text: "Export JSON",
      onClick: () => {
        closeComposerAssemblyMenu();
        composerExportButton?.click();
      },
    },
  ]);

  const preview = document.createElement("pre");
  preview.className = "composer-json-preview composer-assembly-menu-json-preview";
  preview.textContent = json;
  composerAssemblyMenu.appendChild(preview);

  positionComposerAssemblyMenu(clientX, clientY, 520, 520);
}

function openComposerLibraryMenuAt(clientX, clientY) {
  if (!composerAssemblyMenu) {
    return;
  }
  resetComposerAssemblyMenu();
  refreshComposerLibraryUi();
  const entries = getComposerSortedLibraryEntries();

  const title = document.createElement("div");
  title.className = "composer-assembly-menu-title";
  title.textContent = "Library";
  composerAssemblyMenu.appendChild(title);

  const subtitle = document.createElement("div");
  subtitle.className = "composer-assembly-menu-subtitle";
  subtitle.textContent = entries.length
    ? `${entries.length} browser draft${entries.length === 1 ? "" : "s"}`
    : "No browser drafts yet";
  composerAssemblyMenu.appendChild(subtitle);

  const saveBlock = appendComposerMenuBlock(composerAssemblyMenu, "Save");
  appendComposerMenuButtonRow(saveBlock?.block, [
    {
      text: "Save Repo",
      onClick: () => {
        closeComposerAssemblyMenu();
        composerRepoSaveButton?.click();
      },
    },
    {
      text: "Save Library",
      onClick: () => {
        closeComposerAssemblyMenu();
        composerLibrarySaveButton?.click();
      },
    },
  ]);
  appendComposerMenuButtonRow(saveBlock?.block, [
    {
      text: "Export JSON",
      onClick: () => {
        closeComposerAssemblyMenu();
        composerExportButton?.click();
      },
    },
    {
      text: "JSON Preview",
      onClick: () => {
        openComposerJsonPreviewMenuAt(clientX, clientY);
      },
    },
  ]);

  const libraryBlock = appendComposerMenuBlock(composerAssemblyMenu, "Browser Library");
  if (entries.length) {
    const libraryForm = document.createElement("div");
    libraryForm.className = "composer-form";
    const selectedEntryId = composerLibrarySelect?.value || entries[0]?.id || "";
    const librarySelectInput = appendComposerMenuSelectField(libraryForm, {
      label: "Saved Scenes",
      value: selectedEntryId,
      entries: entries.map((entry) => ({
        value: entry.id,
        label: entry.name || entry.id,
      })),
    });
    libraryBlock?.block?.appendChild(libraryForm);
    appendComposerMenuButtonRow(libraryBlock?.block, [
      {
        text: "Load",
        onClick: () => {
          const selectedId = librarySelectInput?.value ?? "";
          if (!selectedId) {
            return;
          }
          if (composerLibrarySelect) {
            composerLibrarySelect.value = selectedId;
          }
          closeComposerAssemblyMenu();
          composerLibraryLoadButton?.click();
        },
      },
      {
        text: "Delete",
        className: "composer-assembly-menu-danger",
        onClick: () => {
          const selectedId = librarySelectInput?.value ?? "";
          if (!selectedId) {
            return;
          }
          if (composerLibrarySelect) {
            composerLibrarySelect.value = selectedId;
          }
          closeComposerAssemblyMenu();
          composerLibraryDeleteButton?.click();
        },
      },
    ]);
  } else {
    appendComposerMenuNote(
      libraryBlock?.block,
      "Save Library keeps a draft in this browser. Save Repo or Export JSON creates a file you can place in the repo."
    );
  }
  appendComposerMenuNote(
    libraryBlock?.block,
    composerLibraryStatus?.textContent ||
      "Library storage is browser-local for now. Save keeps drafts in this browser only."
  );

  positionComposerAssemblyMenu(clientX, clientY, 320, entries.length ? 332 : 244);
}

function getComposerTimelineTimeAtClientX(clientX, documentData = composerCurrentDocument) {
  if (!composerTimelineTrack || !documentData) {
    return 0;
  }
  return getComposerTimelineTimeAtClientXRuntime(clientX, documentData, {
    trackRect: composerTimelineTrack.getBoundingClientRect(),
    clampFn: clamp,
    getTimeWindow: getComposerSceneTimeWindow,
  });
}

function openComposerTimelineMenuAt(clientX, clientY, options = {}) {
  if (!composerAssemblyMenu) {
    return;
  }
  const documentData = composerCurrentDocument;
  const overlays = Array.isArray(documentData?.overlays) ? documentData.overlays : [];
  const graphics = getComposerGraphicTimelineOverlays(documentData);
  const pauses = Array.isArray(documentData?.scene?.pauses) ? documentData.scene.pauses : [];
  const timeWarps = Array.isArray(documentData?.scene?.timeWarps) ? documentData.scene.timeWarps : [];
  const reactionId = options.reactionId ?? null;
  const overlayId = options.overlayId ?? options.graphicId ?? options.markerId ?? null;
  const pauseId = options.pauseId ?? null;
  const warpId = options.warpId ?? null;
  const reactions = Array.isArray(documentData?.reactions) ? documentData.reactions : [];
  const overlay = overlayId ? overlays.find((entry) => entry?.id === overlayId) ?? null : null;
  const graphic = overlay?.kind === "graphic" ? overlay : null;
  const imageOverlay = overlay?.kind === "image" ? overlay : null;
  const videoOverlay = overlay?.kind === "video" ? overlay : null;
  const pause = pauseId ? pauses.find((entry) => entry?.id === pauseId) ?? null : null;
  const warp = warpId ? timeWarps.find((entry) => entry?.id === warpId) ?? null : null;
  const reaction = reactionId ? reactions.find((entry) => entry?.id === reactionId) ?? null : null;
  const timeSeconds =
    options.timeSeconds ??
    overlay?.start ??
    pause?.start ??
    warp?.start ??
    reaction?.start ??
    getComposerTimelineTimeAtClientX(clientX, documentData);
  const duration = Math.max(1, readNumberInput(composerSceneDurationInput, 24));
  const editKind = reaction
    ? "reaction"
    : warp
      ? "warp"
      : pause
        ? "pause"
        : overlay
          ? overlay.kind
          : "add";
  const addType = normalizeComposerTimelineAddType(options.addType);
  resetComposerAssemblyMenu("timeline");

  const title = document.createElement("div");
  title.className = "composer-assembly-menu-title";
  title.textContent = getComposerTimelineEditKindTitle(editKind);
  composerAssemblyMenu.appendChild(title);

  const subtitle = document.createElement("div");
  subtitle.className = "composer-assembly-menu-subtitle";
  subtitle.textContent =
    editKind === "reaction"
      ? `${reaction.label ?? reaction.id ?? "Reaction"} @ ${formatComposerTimeLabel(reaction.start)}-${formatComposerTimeLabel(reaction.end)}`
      : editKind === "warp"
        ? `Warp ${Number(warp.rate ?? 1).toFixed(2)}x @ ${formatComposerTimeLabel(warp.start)}-${formatComposerTimeLabel(warp.end)}`
      : editKind === "pause"
          ? `Pause ${formatComposerTimeLabel(pause.duration)} @ ${formatComposerTimeLabel(pause.start)}`
          : editKind === "graphic" && graphic
            ? `${getComposerGraphicOverlayLabel(graphic)} @ ${formatComposerTimeLabel(graphic.start)}-${formatComposerTimeLabel(graphic.end)}`
            : editKind === "image" && imageOverlay
              ? `${getComposerMediaOverlayLabel(imageOverlay)} @ ${formatComposerTimeLabel(imageOverlay.start)}-${formatComposerTimeLabel(imageOverlay.end)}`
              : editKind === "video" && videoOverlay
                ? `${getComposerMediaOverlayLabel(videoOverlay)} @ ${formatComposerTimeLabel(videoOverlay.start)}-${formatComposerTimeLabel(videoOverlay.end)}`
            : `At ${formatComposerTimeLabel(timeSeconds)}`;
  composerAssemblyMenu.appendChild(subtitle);

  const validationNote = document.createElement("div");
  validationNote.className = "composer-field-note is-error";
  validationNote.hidden = true;
  composerAssemblyMenu.appendChild(validationNote);

  const showTimelineMenuError = (message) => {
    if (!message) {
      validationNote.hidden = true;
      validationNote.textContent = "";
      return;
    }
    validationNote.hidden = false;
    validationNote.textContent = message;
    setComposerStatus(message);
  };

  const showTimelineOverlapError = (conflict) => {
    if (!conflict) {
      return;
    }
    showTimelineMenuError(
      `Timeline items may not overlap. ${conflict.label} already occupies ${formatComposerTimeLabel(conflict.start)}-${formatComposerTimeLabel(conflict.end)}.`
    );
  };

  const timelineMenuWidth = 256;
  const appendGraphicBlock = () => {
    const initialGraphicSpan = clampComposerTimelineSpan(
      graphic?.start ?? timeSeconds,
      graphic?.end ?? Number(timeSeconds) + composerTimelineMinDurationSeconds,
      duration
    );
    const initialGraphicDraft = normalizeComposerGraphicOverlayDraft(
      graphic ?? {
        id: getNextComposerGraphicOverlayId(),
        start: initialGraphicSpan.start,
        end: initialGraphicSpan.end,
        text: "Text",
        size: 0.42,
        target: getComposerGraphicDefaultTarget(),
      },
      Math.max(0, getComposerGraphicOverlayDraftIndexById(graphic?.id)),
      duration
    );
    const graphicBlock = appendComposerMenuBlock(composerAssemblyMenu, "Graphic", {
      text: graphic ? "Save" : "Add",
      onClick: () => {
        const graphicStart = Number(graphicStartInput?.value);
        const graphicEnd = Number(graphicEndInput?.value);
        const text = String(graphicTextInput?.value ?? "").trim();
        const size = Number(graphicSizeInput?.value);
        const target = decodeComposerGraphicTargetValue(graphicTargetInput?.value);
        if (!Number.isFinite(graphicStart) || !Number.isFinite(graphicEnd) || !text || !target || !Number.isFinite(size)) {
          return;
        }
        const span = clampComposerTimelineSpan(graphicStart, graphicEnd, duration);
        const overlap = findComposerTimelineOverlap(
          {
            id: graphic?.id ?? initialGraphicDraft.id,
            kind: "graphic",
            start: span.start,
            end: span.end,
          },
          {
            excludeId: graphic?.id ?? initialGraphicDraft.id,
            documentData,
          }
        );
        if (overlap) {
          showTimelineOverlapError(overlap);
          return;
        }
        const nextOverlay = normalizeComposerGraphicOverlayDraft(
          {
            ...(graphic ?? initialGraphicDraft),
            id: graphic?.id ?? initialGraphicDraft.id,
            start: span.start,
            end: span.end,
            text,
            label: text,
            size,
            target,
            offset: graphic?.offset ?? initialGraphicDraft.offset,
          },
          Math.max(0, getComposerGraphicOverlayDraftIndexById(graphic?.id)),
          duration
        );
        const existingIndex = getComposerGraphicOverlayDraftIndexById(nextOverlay.id);
        if (existingIndex >= 0) {
          composerGraphicOverlayDrafts[existingIndex] = nextOverlay;
        } else {
          composerGraphicOverlayDrafts.push(nextOverlay);
        }
        closeComposerAssemblyMenu();
        renderComposerJsonPreview();
      },
    });
    const graphicForm = document.createElement("div");
    graphicForm.className = "composer-form composer-assembly-menu-grid-2";
    const graphicStartInput = appendComposerMenuField(graphicForm, {
      label: "Start (s)",
      type: "number",
      value: formatComposerTimeInputValue(initialGraphicSpan.start),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const graphicEndInput = appendComposerMenuField(graphicForm, {
      label: "End (s)",
      type: "number",
      value: formatComposerTimeInputValue(initialGraphicSpan.end),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const graphicTargetInput = appendComposerMenuSelectField(graphicForm, {
      label: "Target",
      value: encodeComposerGraphicTargetValue(initialGraphicDraft.target),
      entries: getComposerGraphicTargetEntries(),
      placeholder: "Select target",
    });
    graphicTargetInput?.closest?.(".composer-field")?.classList?.add("composer-assembly-menu-grid-span-2");
    const graphicTextInput = appendComposerMenuField(graphicForm, {
      label: "Text",
      value: initialGraphicDraft.text,
      placeholder: "Graphic text",
    });
    graphicTextInput?.closest?.(".composer-field")?.classList?.add("composer-assembly-menu-grid-span-2");
    const graphicSizeInput = appendComposerMenuField(graphicForm, {
      label: "Size",
      type: "number",
      value: initialGraphicDraft.size,
      step: 0.05,
      min: 0.18,
    });
    graphicBlock?.block?.appendChild(graphicForm);
    appendComposerMenuNote(
      graphicBlock?.block,
      "Drag the text to place it. Edit size here when needed."
    );

    if (graphic?.id) {
      appendComposerMenuButtonRow(graphicBlock?.block, [
        {
          text: "Remove Graphic",
          className: "composer-assembly-menu-danger",
          onClick: () => {
            const overlayIndex = getComposerGraphicOverlayDraftIndexById(graphic.id);
            if (overlayIndex >= 0) {
              composerGraphicOverlayDrafts.splice(overlayIndex, 1);
            }
            closeComposerAssemblyMenu();
            renderComposerJsonPreview();
          },
        },
      ]);
    }
  };

  const appendMediaBlock = (kind) => {
    const currentOverlay = kind === "image" ? imageOverlay : videoOverlay;
    const initialSpan = clampComposerTimelineSpan(
      currentOverlay?.start ?? timeSeconds,
      currentOverlay?.end ?? Number(timeSeconds) + composerTimelineMinDurationSeconds,
      duration
    );
    const initialDraft = normalizeComposerGraphicOverlayDraft(
      currentOverlay ?? {
        id: getNextComposerGraphicOverlayId(),
        kind,
        start: initialSpan.start,
        end: initialSpan.end,
        source: "",
        rect: getComposerMediaDefaultRect(kind),
      },
      Math.max(0, getComposerGraphicOverlayDraftIndexById(currentOverlay?.id)),
      duration
    );
    const mediaBlock = appendComposerMenuBlock(
      composerAssemblyMenu,
      kind === "image" ? "Image" : "Video",
      {
        text: currentOverlay ? "Save" : "Add",
        onClick: () => {
          const start = Number(mediaStartInput?.value);
          const end = Number(mediaEndInput?.value);
          const source = sanitizeComposerMediaSource(mediaSourceInput?.value, kind);
          if (!Number.isFinite(start) || !Number.isFinite(end) || !source) {
            return;
          }
          const span = clampComposerTimelineSpan(start, end, duration);
          const overlap = findComposerTimelineOverlap(
            {
              id: currentOverlay?.id ?? initialDraft.id,
              kind,
              start: span.start,
              end: span.end,
            },
            {
              excludeId: currentOverlay?.id ?? initialDraft.id,
              documentData,
            }
          );
          if (overlap) {
            showTimelineOverlapError(overlap);
            return;
          }
          const nextOverlay = normalizeComposerGraphicOverlayDraft(
            {
              ...(currentOverlay ?? initialDraft),
              id: currentOverlay?.id ?? initialDraft.id,
              kind,
              start: span.start,
              end: span.end,
              source,
              label: source.split("/").pop() ?? (kind === "image" ? "Image" : "Video"),
              rect: currentOverlay?.rect ?? initialDraft.rect,
            },
            Math.max(0, getComposerGraphicOverlayDraftIndexById(currentOverlay?.id)),
            duration
          );
          const existingIndex = getComposerGraphicOverlayDraftIndexById(nextOverlay.id);
          if (existingIndex >= 0) {
            composerGraphicOverlayDrafts[existingIndex] = nextOverlay;
          } else {
            composerGraphicOverlayDrafts.push(nextOverlay);
          }
          closeComposerAssemblyMenu();
          renderComposerJsonPreview();
        },
      }
    );
    const mediaForm = document.createElement("div");
    mediaForm.className = "composer-form composer-assembly-menu-grid-2";
    const mediaStartInput = appendComposerMenuField(mediaForm, {
      label: "Start (s)",
      type: "number",
      value: formatComposerTimeInputValue(initialSpan.start),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const mediaEndInput = appendComposerMenuField(mediaForm, {
      label: "End (s)",
      type: "number",
      value: formatComposerTimeInputValue(initialSpan.end),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const mediaSourceInput = appendComposerMenuField(mediaForm, {
      label: "Asset Path",
      value: initialDraft.source,
      placeholder: composerMediaAssetDirectories[kind],
    });
    mediaSourceInput?.closest?.(".composer-field")?.classList?.add("composer-assembly-menu-grid-span-2");
    mediaBlock?.block?.appendChild(mediaForm);
    appendComposerMenuNote(
      mediaBlock?.block,
      `Use ${composerMediaAssetDirectories[kind]}. Drag the rectangle to place it, and drag the corner to resize it.`
    );
    if (currentOverlay?.id) {
      appendComposerMenuButtonRow(mediaBlock?.block, [
        {
          text: `Remove ${kind === "image" ? "Image" : "Video"}`,
          className: "composer-assembly-menu-danger",
          onClick: () => {
            const overlayIndex = getComposerGraphicOverlayDraftIndexById(currentOverlay.id);
            if (overlayIndex >= 0) {
              composerGraphicOverlayDrafts.splice(overlayIndex, 1);
            }
            closeComposerAssemblyMenu();
            renderComposerJsonPreview();
          },
        },
      ]);
    }
  };

  const appendPauseBlock = () => {
    const initialPauseSpan = clampComposerTimelineSpan(
      pause?.start ?? timeSeconds,
      Number(pause?.start ?? timeSeconds) + Number(pause?.duration ?? composerTimelineMinDurationSeconds),
      duration
    );
    const pauseBlock = appendComposerMenuBlock(composerAssemblyMenu, "Pause", {
      text: pause ? "Save" : "Add",
      onClick: () => {
        const start = Number(pauseStartInput?.value);
        const pauseDuration = Number(pauseDurationInput?.value);
        if (!Number.isFinite(start) || !Number.isFinite(pauseDuration) || pauseDuration <= 0) {
          return;
        }
        const span = clampComposerTimelineSpan(start, start + pauseDuration, duration);
        const pauseIdForSave = pause?.id ?? "";
        const overlap = findComposerTimelineOverlap(
          {
            id: pauseIdForSave,
            kind: "pause",
            start: span.start,
            end: span.end,
          },
          {
            excludeId: pauseIdForSave,
            documentData,
          }
        );
        if (overlap) {
          showTimelineOverlapError(overlap);
          return;
        }
        const nextLine = `${span.start}, ${span.span}`;
        const current = composerPauseListInput?.value ?? "";
        if (composerPauseListInput) {
          composerPauseListInput.value = pause?.id
            ? replaceComposerAuthoringLineById(current, pause.id, nextLine)
            : appendComposerAuthoringLine(current, nextLine);
        }
        closeComposerAssemblyMenu();
        renderComposerJsonPreview();
      },
    });
    const pauseForm = document.createElement("div");
    pauseForm.className = "composer-form composer-assembly-menu-grid-2";
    const pauseStartInput = appendComposerMenuField(pauseForm, {
      label: "Start (s)",
      type: "number",
      value: formatComposerTimeInputValue(initialPauseSpan.start),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const pauseDurationInput = appendComposerMenuField(pauseForm, {
      label: "Duration (s)",
      type: "number",
      value: formatComposerTimeInputValue(initialPauseSpan.span),
      step: 0.1,
      min: composerTimelineMinDurationSeconds,
      selectOnFocus: true,
    });
    pauseBlock?.block?.appendChild(pauseForm);

    if (pause?.id) {
      appendComposerMenuButtonRow(pauseBlock?.block, [
        {
          text: "Remove Pause",
          className: "composer-assembly-menu-danger",
          onClick: () => {
            if (composerPauseListInput) {
              composerPauseListInput.value = replaceComposerAuthoringLineById(
                composerPauseListInput.value,
                pause.id,
                null
              );
            }
            closeComposerAssemblyMenu();
            renderComposerJsonPreview();
          },
        },
      ]);
    }
  };

  const appendWarpBlock = () => {
    const initialWarpSpan = clampComposerTimelineSpan(
      warp?.start ?? timeSeconds,
      warp?.end ?? Number(timeSeconds) + composerTimelineMinDurationSeconds,
      duration
    );
    const warpBlock = appendComposerMenuBlock(composerAssemblyMenu, "Warp", {
      text: warp ? "Save" : "Add",
      onClick: () => {
        const start = Number(warpStartInput?.value);
        const end = Number(warpEndInput?.value);
        const rate = Number(warpRateInput?.value);
        if (!Number.isFinite(start) || !Number.isFinite(end) || !Number.isFinite(rate) || rate <= 0) {
          return;
        }
        const span = clampComposerTimelineSpan(start, end, duration);
        const warpIdForSave = warp?.id ?? "";
        const overlap = findComposerTimelineOverlap(
          {
            id: warpIdForSave,
            kind: "warp",
            start: span.start,
            end: span.end,
          },
          {
            excludeId: warpIdForSave,
            documentData,
          }
        );
        if (overlap) {
          showTimelineOverlapError(overlap);
          return;
        }
        const nextLine = `${span.start}, ${span.end}, ${Number(rate.toFixed(3))}`;
        const current = composerWarpListInput?.value ?? "";
        if (composerWarpListInput) {
          composerWarpListInput.value = warp?.id
            ? replaceComposerAuthoringLineById(current, warp.id, nextLine)
            : appendComposerAuthoringLine(current, nextLine);
        }
        closeComposerAssemblyMenu();
        renderComposerJsonPreview();
      },
    });
    const warpForm = document.createElement("div");
    warpForm.className = "composer-form composer-assembly-menu-grid-2";
    const warpStartInput = appendComposerMenuField(warpForm, {
      label: "Start (s)",
      type: "number",
      value: formatComposerTimeInputValue(initialWarpSpan.start),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const warpEndInput = appendComposerMenuField(warpForm, {
      label: "End (s)",
      type: "number",
      value: formatComposerTimeInputValue(initialWarpSpan.end),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const warpRateInput = appendComposerMenuField(warpForm, {
      label: "Rate",
      type: "number",
      value: Number((warp?.rate ?? 0.5).toFixed(3)),
      step: 0.1,
      min: 0.001,
    });
    warpRateInput?.closest?.(".composer-field")?.classList?.add("composer-assembly-menu-grid-span-2");
    warpBlock?.block?.appendChild(warpForm);

    if (warp?.id) {
      appendComposerMenuButtonRow(warpBlock?.block, [
        {
          text: "Remove Warp",
          className: "composer-assembly-menu-danger",
          onClick: () => {
            if (composerWarpListInput) {
              composerWarpListInput.value = replaceComposerAuthoringLineById(
                composerWarpListInput.value,
                warp.id,
                null
              );
            }
            closeComposerAssemblyMenu();
            renderComposerJsonPreview();
          },
        },
      ]);
    }
  };

  const appendReactionBlock = () => {
    const initialReactionSpan = clampComposerTimelineSpan(
      reaction?.start ?? timeSeconds,
      reaction?.end ?? Number(timeSeconds) + composerTimelineMinDurationSeconds,
      duration
    );
    const reactionAssemblies = ensureComposerAssemblyDraftsForReactionUi();
    const reactionStageDrafts = getComposerReactionStageDrafts(reaction);
    const reactionBlock = appendComposerMenuBlock(composerAssemblyMenu, "Reaction", {
      text: reaction ? "Save" : "Add",
      onClick: () => {
        const label = String(reactionLabelInput?.value ?? "").trim();
        const start = Number(reactionStartInput?.value);
        const end = Number(reactionEndInput?.value);
        const actions = buildComposerReactionActionString(reactionStageDrafts);
        if (!label || !Number.isFinite(start) || !Number.isFinite(end)) {
          showTimelineMenuError("Reaction needs a label and a valid span.");
          return;
        }
        if (!actions) {
          showTimelineMenuError("Add at least one valid reaction stage before saving.");
          return;
        }
        const span = clampComposerTimelineSpan(start, end, duration);
        const reactionIdForSave = reaction?.id ?? "";
        const overlap = findComposerTimelineOverlap(
          {
            id: reactionIdForSave,
            kind: "reaction",
            start: span.start,
            end: span.end,
          },
          {
            excludeId: reactionIdForSave,
            documentData,
          }
        );
        if (overlap) {
          showTimelineOverlapError(overlap);
          return;
        }
        const nextLine = `${label} @ ${span.start}-${span.end}${actions ? ` | ${actions}` : ""}`;
        setComposerReactionListRaw(
          reaction?.id
            ? replaceComposerAuthoringLineById(getComposerReactionListRaw(), reaction.id, nextLine)
            : appendComposerAuthoringLine(getComposerReactionListRaw(), nextLine)
        );
        closeComposerAssemblyMenu();
        renderComposerJsonPreview();
      },
    });
    const reactionForm = document.createElement("div");
    reactionForm.className = "composer-form composer-assembly-menu-grid-2";
    const reactionLabelInput = appendComposerMenuField(reactionForm, {
      label: "Label",
      value: reaction?.label ?? "reaction",
    });
    const reactionStartInput = appendComposerMenuField(reactionForm, {
      label: "Start (s)",
      type: "number",
      value: formatComposerTimeInputValue(initialReactionSpan.start),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    const reactionEndInput = appendComposerMenuField(reactionForm, {
      label: "End (s)",
      type: "number",
      value: formatComposerTimeInputValue(initialReactionSpan.end),
      step: 0.1,
      min: 0,
      selectOnFocus: true,
    });
    reactionBlock?.block?.appendChild(reactionForm);
    if (reactionAssemblies.reactants.length || reactionAssemblies.products.length) {
      appendComposerMenuNote(
        reactionBlock?.block,
        `Canvas participants: ${reactionAssemblies.reactants.length ? `Reactants ${reactionAssemblies.reactants.join(", ")}` : "No reactants"} · ${
          reactionAssemblies.products.length ? `Products ${reactionAssemblies.products.join(", ")}` : "No products"
        }`
      );
    } else {
      appendComposerMenuNote(
        reactionBlock?.block,
        "No canvas participants are tagged yet. Add reactants and products on the canvas to prepare for visual reaction mapping."
      );
    }
    appendComposerMenuNote(
      reactionBlock?.block,
      "Stage timing is divided evenly across the reaction span for now. Visual source-to-destination mapping still needs to replace typed transfer authoring."
    );
    const stageList = document.createElement("div");
    stageList.className = "composer-reaction-stage-list";
    const reactionActionOptions = getComposerReactionActionOptions();

    const renderReactionStageRows = () => {
      stageList.innerHTML = "";
      reactionStageDrafts.forEach((stageDraft, index) => {
        const stageRow = document.createElement("div");
        stageRow.className = "composer-reaction-stage-row";
        const stageHeader = document.createElement("div");
        stageHeader.className = "composer-reaction-stage-header";
        stageHeader.textContent = `Stage ${index + 1}`;
        stageRow.appendChild(stageHeader);
        const stageForm = document.createElement("div");
        stageForm.className = "composer-form composer-assembly-menu-grid-2";
        const actionInput = appendComposerMenuSelectField(stageForm, {
          label: "Action",
          value: stageDraft.action,
          entries: reactionActionOptions,
        });
        stageRow.appendChild(stageForm);
        appendComposerMenuButtonRow(stageRow, [
          {
            text: "Remove",
            className: "composer-assembly-menu-danger",
            disabled: reactionStageDrafts.length <= 1,
            onClick: () => {
              if (reactionStageDrafts.length <= 1) {
                return;
              }
              reactionStageDrafts.splice(index, 1);
              renderReactionStageRows();
            },
          },
          null,
        ]);
        actionInput?.addEventListener("change", () => {
          stageDraft.action = actionInput.value;
        });
        stageList.appendChild(stageRow);
      });
    };

    const stageActionsBlock = appendComposerMenuBlock(reactionBlock?.block, "Stages", {
      text: "Add Stage",
      onClick: () => {
        reactionStageDrafts.push({
          action: "mapping",
          transferRefs: "",
        });
        renderReactionStageRows();
      },
    });
    stageActionsBlock?.block?.appendChild(stageList);
    renderReactionStageRows();

    if (reaction?.id) {
      appendComposerMenuButtonRow(reactionBlock?.block, [
        {
          text: "Remove Reaction",
          className: "composer-assembly-menu-danger",
          onClick: () => {
            setComposerReactionListRaw(
              replaceComposerAuthoringLineById(getComposerReactionListRaw(), reaction.id, null)
            );
            closeComposerAssemblyMenu();
            renderComposerJsonPreview();
          },
        },
      ]);
    }
  };

  const appendPlaceholderBlock = (blockTitle, notes = []) => {
    const block = appendComposerMenuBlock(composerAssemblyMenu, blockTitle, null);
    notes.forEach((entry) => appendComposerMenuNote(block?.block, entry));
  };

  if (editKind === "add") {
    const orbGrid = document.createElement("div");
    orbGrid.className = "composer-assembly-menu-orb-grid";
    composerTimelineAddTypeEntries.forEach((item) => {
      const orb = document.createElement("button");
      orb.type = "button";
      orb.className = "composer-assembly-menu-orb";
      orb.dataset.timelineType = item.id;
      if (item.id === addType) {
        orb.classList.add("is-active");
      }
      orb.textContent = item.label;
      orb.addEventListener("click", () => {
        openComposerTimelineMenuAt(clientX, clientY, {
          timeSeconds,
          addType: item.id,
        });
      });
      orbGrid.appendChild(orb);
    });
    composerAssemblyMenu.appendChild(orbGrid);

    if (addType === "graphic") {
      appendGraphicBlock();
    } else if (addType === "image") {
      appendMediaBlock("image");
    } else if (addType === "video") {
      appendMediaBlock("video");
    } else if (addType === "pause") {
      appendPauseBlock();
    } else if (addType === "warp") {
      appendWarpBlock();
    } else if (addType === "reaction") {
      appendReactionBlock();
    } else if (addType === "audio") {
      appendPlaceholderBlock("Audio", [
        "Planned for narration, accent sounds, and level automation on the shared scene timeline.",
      ]);
    } else if (addType === "camera") {
      appendPlaceholderBlock("Observer", [
        "Observer intervals need to coordinate the design viewport, observer framing, and the authored observer path.",
        "The first pass for that shared viewport design is being captured in viewports.md.",
      ]);
    }
  } else if (editKind === "graphic") {
    appendGraphicBlock();
  } else if (editKind === "image") {
    appendMediaBlock("image");
  } else if (editKind === "video") {
    appendMediaBlock("video");
  } else if (editKind === "pause") {
    appendPauseBlock();
  } else if (editKind === "warp") {
    appendWarpBlock();
  } else {
    appendReactionBlock();
  }

  positionComposerAssemblyMenu(
    clientX,
    clientY,
    timelineMenuWidth,
    editKind === "reaction" || (editKind === "add" && addType === "reaction")
      ? 432
      : (
          editKind === "graphic" ||
          editKind === "image" ||
          editKind === "video" ||
          (editKind === "add" && (addType === "graphic" || addType === "image" || addType === "video"))
        )
        ? 392
      : editKind === "add"
        ? 332
        : 268
  );
}

function removeComposerPathPoint(pointIndex) {
  if (!Number.isInteger(pointIndex) || pointIndex < 0 || pointIndex >= composerPathState.points.length) {
    return;
  }
  composerPathState.points.splice(pointIndex, 1);
  composerSelectedPointIndex =
    composerPathState.points.length > 0
      ? Math.min(pointIndex, composerPathState.points.length - 1)
      : null;
  persistComposerPathStateToSelectedAssembly();
  rebuildComposerControlPoints();
  updateComposerPathGeometry();
}

function openComposerPathPointMenuAt(clientX, clientY, pointIndex) {
  if (!composerAssemblyMenu || !Number.isInteger(pointIndex)) {
    return;
  }
  const assemblyLetter = getComposerSelectedAssemblyLetter();
  composerSelectedPointIndex = pointIndex;
  resetComposerAssemblyMenu();

  const title = document.createElement("div");
  title.className = "composer-assembly-menu-title";
  title.textContent = `Path ${assemblyLetter}`;
  composerAssemblyMenu.appendChild(title);

  const subtitle = document.createElement("div");
  subtitle.className = "composer-assembly-menu-subtitle";
  subtitle.textContent = `Point ${pointIndex + 1}`;
  composerAssemblyMenu.appendChild(subtitle);

  const poiButton = document.createElement("button");
  poiButton.type = "button";
  poiButton.textContent = "Use This Point As Observer Target";
  poiButton.addEventListener("click", () => {
    composerSelectedPointIndex = pointIndex;
    composerCameraFlightState.poiMode = "selected";
    updateComposerPointMaterials(pointIndex);
    updateComposerCameraPoiStatus();
    closeComposerAssemblyMenu();
  });
  composerAssemblyMenu.appendChild(poiButton);

  const addPointButton = document.createElement("button");
  addPointButton.type = "button";
  addPointButton.textContent = `Add ${assemblyLetter} Point After`;
  addPointButton.addEventListener("click", () => {
    const currentPoint = composerPathState.points[pointIndex] ?? null;
    const nextPoint =
      currentPoint instanceof THREE.Vector3
        ? currentPoint.clone().add(new THREE.Vector3(0.45, 0, 0))
        : Array.isArray(currentPoint)
          ? vectorFromTriplet(currentPoint).add(new THREE.Vector3(0.45, 0, 0))
          : new THREE.Vector3(0.45, 0, 0);
    addComposerPathPoint(nextPoint, { insertAfterIndex: pointIndex });
    renderComposerJsonPreview();
    closeComposerAssemblyMenu();
  });
  composerAssemblyMenu.appendChild(addPointButton);

  const resetButton = document.createElement("button");
  resetButton.type = "button";
  resetButton.textContent = `Reset ${assemblyLetter} Path`;
  resetButton.addEventListener("click", () => {
    resetComposerPathPoints();
    renderComposerJsonPreview();
    closeComposerAssemblyMenu();
  });
  composerAssemblyMenu.appendChild(resetButton);

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = `Remove ${assemblyLetter} Point`;
  removeButton.className = "composer-assembly-menu-danger";
  removeButton.disabled = composerPathState.points.length <= 1;
  removeButton.addEventListener("click", () => {
    removeComposerPathPoint(pointIndex);
    renderComposerJsonPreview();
    closeComposerAssemblyMenu();
  });
  composerAssemblyMenu.appendChild(removeButton);

  positionComposerAssemblyMenu(clientX, clientY, 236, 210);
}

function describeComposerTimelineState(timeSeconds, documentData) {
  const graphics = getComposerGraphicTimelineOverlays(documentData);
  const pauses = Array.isArray(documentData?.scene?.pauses) ? documentData.scene.pauses : [];
  const timeWarps = Array.isArray(documentData?.scene?.timeWarps) ? documentData.scene.timeWarps : [];
  const reactions = Array.isArray(documentData?.reactions) ? documentData.reactions : [];
  const activeWarp = timeWarps.find((warp) => timeSeconds >= warp.start && timeSeconds < warp.end);
  const activeReaction = reactions.find(
    (reaction) => timeSeconds >= reaction.start && timeSeconds <= reaction.end
  );
  const activeReactionStage = Array.isArray(activeReaction?.stages)
    ? activeReaction.stages.find((stage) => timeSeconds >= stage.start && timeSeconds <= stage.end)
    : null;
  const activeGraphic = [...graphics]
    .sort((left, right) => left.start - right.start)
    .filter((graphic) => isComposerTimeWithinSpan(timeSeconds, graphic.start, graphic.end))
    .pop();
  const activePause = pauses.find(
    (pause) =>
      timeSeconds >= Number(pause?.start ?? 0) &&
      timeSeconds < Number(pause?.start ?? 0) + Number(pause?.duration ?? 0)
  );
  const parts = [];
  if (activeGraphic?.label) {
    parts.push(activeGraphic.label);
  }
  if (activePause) {
    parts.push(`Pause ${formatComposerTimeLabel(activePause.duration)}`);
  }
  if (activeWarp) {
    parts.push(`Warp ${Number(activeWarp.rate ?? 1).toFixed(2)}x`);
  }
  if (activeReaction?.label) {
    parts.push(`Reaction: ${activeReaction.label}`);
  }
  if (activeReactionStage?.action) {
    parts.push(`Stage: ${activeReactionStage.action}`);
  }
  return parts.join(" | ") || "Steady";
}

function getComposerActiveReaction(documentData, timeSeconds) {
  const reactions = Array.isArray(documentData?.reactions) ? documentData.reactions : [];
  return (
    reactions.find((reaction) => timeSeconds >= reaction.start && timeSeconds <= reaction.end) ?? null
  );
}

function getComposerActiveReactionStage(documentData, timeSeconds) {
  const activeReaction = getComposerActiveReaction(documentData, timeSeconds);
  if (!Array.isArray(activeReaction?.stages)) {
    return null;
  }
  return (
    activeReaction.stages.find((stage) => timeSeconds >= stage.start && timeSeconds <= stage.end) ??
    activeReaction.stages[0] ??
    null
  );
}

function getComposerActiveReactionTransferIds(documentData, timeSeconds) {
  const activeReactionStage = getComposerActiveReactionStage(documentData, timeSeconds);
  if (Array.isArray(activeReactionStage?.transferIds) && activeReactionStage.transferIds.length) {
    return new Set(activeReactionStage.transferIds);
  }
  const activeReaction = getComposerActiveReaction(documentData, timeSeconds);
  return new Set(Array.isArray(activeReaction?.transferIds) ? activeReaction.transferIds : []);
}

function getComposerReactionParticipantSummary(reaction) {
  const participants = Array.isArray(reaction?.participants) ? reaction.participants : [];
  if (!participants.length) {
    return "";
  }
  let reactants = 0;
  let products = 0;
  participants.forEach((participant) => {
    const role = normalizeComposerAssemblySceneRole(participant?.role);
    if (role === "reactant") {
      reactants += 1;
    } else if (role === "product") {
      products += 1;
    }
  });
  const parts = [];
  if (reactants) {
    parts.push(`R${reactants}`);
  }
  if (products) {
    parts.push(`P${products}`);
  }
  return parts.join("/");
}

function getComposerSortedMarkers(documentData) {
  const markers = Array.isArray(documentData?.scene?.markers) ? documentData.scene.markers : [];
  return [...markers].sort((left, right) => left.t - right.t);
}

function syncComposerMarkerNavigation(documentData, timeSeconds) {
  const markers = getComposerSortedMarkers(documentData);
  if (composerMarkerJumpSelect) {
    const existingSignature = composerMarkerJumpSelect.dataset.signature ?? "";
    const nextSignature = markers
      .map((marker) => `${marker.id}:${marker.t}:${getComposerGraphicEnd(marker)}:${marker.label ?? ""}`)
      .join("|");
    if (existingSignature !== nextSignature) {
      composerMarkerJumpSelect.innerHTML = "";
      if (!markers.length) {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "No Markers";
        composerMarkerJumpSelect.appendChild(option);
      } else {
        markers.forEach((marker) => {
          const option = document.createElement("option");
          option.value = marker.id;
          const end = getComposerGraphicEnd(marker);
          option.textContent = `${marker.label ?? marker.id ?? "Marker"} (${
            end > marker.t + 0.001
              ? `${formatComposerTimeLabel(marker.t)}-${formatComposerTimeLabel(end)}`
              : formatComposerTimeLabel(marker.t)
          })`;
          composerMarkerJumpSelect.appendChild(option);
        });
      }
      composerMarkerJumpSelect.dataset.signature = nextSignature;
    }

    if (markers.length) {
      const activeMarker = [...markers]
        .filter((marker) => marker.t <= timeSeconds + 0.001)
        .pop() ?? markers[0];
      if (composerMarkerJumpSelect.value !== activeMarker.id) {
        composerMarkerJumpSelect.value = activeMarker.id;
      }
      composerMarkerJumpSelect.disabled = false;
    } else {
      composerMarkerJumpSelect.value = "";
      composerMarkerJumpSelect.disabled = true;
    }
  }

  if (composerMarkerPrevButton) {
    composerMarkerPrevButton.disabled = !markers.some((marker) => marker.t < timeSeconds - 0.001);
  }
  if (composerMarkerNextButton) {
    composerMarkerNextButton.disabled = !markers.some((marker) => marker.t > timeSeconds + 0.001);
  }
}

function renderComposerTimeline(documentData) {
  clearComposerTimelineLayer(composerTimelineWarps);
  clearComposerTimelineLayer(composerTimelinePauses);
  clearComposerTimelineLayer(composerTimelineReactions);
  clearComposerTimelineLayer(composerTimelineMarkers);
  if (!documentData || !composerTimelineTrack) {
    return;
  }

  const markers = Array.isArray(documentData?.scene?.markers) ? documentData.scene.markers : [];
  const pauses = Array.isArray(documentData?.scene?.pauses) ? documentData.scene.pauses : [];
  const timeWarps = Array.isArray(documentData?.scene?.timeWarps) ? documentData.scene.timeWarps : [];
  const reactions = Array.isArray(documentData?.reactions) ? documentData.reactions : [];
  const graphics = getComposerGraphicTimelineOverlays(documentData);
  const mediaOverlays = getComposerViewportMediaTimelineOverlays(documentData);

  timeWarps.forEach((warp) => {
    const start = getComposerTimelineFraction(documentData, warp.start);
    const end = getComposerTimelineFraction(documentData, warp.end);
    const band = createComposerTimelineBand(
      start,
      end,
      "is-warp",
      `Warp ${Number(warp.rate ?? 1).toFixed(2)}x: ${formatComposerTimeLabel(warp.start)} to ${formatComposerTimeLabel(warp.end)}`,
      "WARP"
    );
    band.dataset.warpId = warp.id ?? "";
    composerTimelineWarps?.appendChild(band);
  });

  pauses.forEach((pause) => {
    const start = getComposerTimelineFraction(documentData, pause.start);
    const end = getComposerTimelineFraction(
      documentData,
      Number(pause.start ?? 0) + Number(pause.duration ?? 0)
    );
    const band = createComposerTimelineBand(
      start,
      end,
      "is-pause",
      `Pause ${formatComposerTimeLabel(pause.duration)} at ${formatComposerTimeLabel(pause.start)}`,
      "PAUSE"
    );
    band.dataset.pauseId = pause.id ?? "";
    composerTimelinePauses?.appendChild(band);
  });

  reactions.forEach((reaction) => {
    const start = getComposerTimelineFraction(documentData, reaction.start);
    const end = getComposerTimelineFraction(documentData, reaction.end);
    const widthFraction = Math.max(0.002, end - start);
    const participantSummary = getComposerReactionParticipantSummary(reaction);
    const showStageLabels = Array.isArray(reaction?.stages) && reaction.stages.length && widthFraction >= 0.12;
    const actions = Array.isArray(reaction?.stages)
      ? reaction.stages
          .map((stage) => {
            if (!stage?.action) {
              return null;
            }
            const stageRefs = formatComposerReactionTransferRefs(stage?.transferIds);
            const reactionRefs = formatComposerReactionTransferRefs(reaction?.transferIds);
            return stageRefs && stageRefs !== reactionRefs
              ? `${stage.action}(${stageRefs})`
              : stage.action;
          })
          .filter(Boolean)
      : [];
    const band = createComposerTimelineBand(
      start,
      end,
      "is-reaction",
      `${reaction.label ?? reaction.id ?? "Reaction"}: ${formatComposerTimeLabel(
        reaction.start
      )} to ${formatComposerTimeLabel(reaction.end)}${participantSummary ? ` | ${participantSummary}` : ""}${
        actions.length ? ` | ${actions.join(" -> ")}` : ""
      }`,
      showStageLabels ? "" : formatComposerReactionBandLabel(reaction, participantSummary, widthFraction)
    );
    if (Array.isArray(reaction?.stages) && reaction.stages.length) {
      reaction.stages.forEach((stage) => {
        const stageStart = getComposerTimelineFraction(documentData, stage.start);
        const stageEnd = getComposerTimelineFraction(documentData, stage.end);
        const stageWidthFraction = Math.max(0, stageEnd - stageStart);
        const stageBand = document.createElement("span");
        stageBand.className = "composer-timeline-reaction-stage";
        stageBand.style.left = `${Math.max(0, ((stageStart - start) / Math.max(end - start, 0.0001)) * 100)}%`;
        stageBand.style.width = `${Math.max(0, ((stageEnd - stageStart) / Math.max(end - start, 0.0001)) * 100)}%`;
        stageBand.title = `${stage.action ?? "stage"}: ${formatComposerTimeLabel(stage.start)} to ${formatComposerTimeLabel(stage.end)}`;
        if (stage?.action && showStageLabels && stageWidthFraction >= 0.04) {
          const stageLabel = document.createElement("span");
          stageLabel.className = "composer-timeline-reaction-stage-label";
          stageLabel.textContent = shortenComposerTimelineBandLabel(String(stage.action).replace(/_/g, " "), 10);
          stageBand.appendChild(stageLabel);
        }
        band.appendChild(stageBand);
      });
    }
    band.dataset.reactionId = reaction.id ?? "";
    composerTimelineReactions?.appendChild(band);
  });

  graphics.forEach((graphic) => {
    const start = getComposerTimelineFraction(documentData, graphic.start);
    const end = getComposerTimelineFraction(documentData, graphic.end);
    const label = getComposerGraphicOverlayLabel(graphic);
    const band = createComposerTimelineBand(
      start,
      end,
      "is-graphic",
      `${label}: ${formatComposerTimeLabel(graphic.start)} to ${formatComposerTimeLabel(graphic.end)}`,
      label
    );
    band.dataset.overlayId = graphic.id ?? "";
    composerTimelineMarkers?.appendChild(band);
  });

  mediaOverlays.forEach((overlay) => {
    const start = getComposerTimelineFraction(documentData, overlay.start);
    const end = getComposerTimelineFraction(documentData, overlay.end);
    const label = getComposerMediaOverlayLabel(overlay);
    const band = createComposerTimelineBand(
      start,
      end,
      overlay.kind === "video" ? "is-video" : "is-image",
      `${label}: ${formatComposerTimeLabel(overlay.start)} to ${formatComposerTimeLabel(overlay.end)}`,
      label
    );
    band.dataset.overlayId = overlay.id ?? "";
    band.dataset.overlayKind = overlay.kind ?? "";
    composerTimelineMarkers?.appendChild(band);
  });
}

function updateComposerTimelinePlayhead(timeSeconds, documentData) {
  if (!documentData) {
    return;
  }
  const fraction = getComposerTimelineFraction(documentData, timeSeconds);
  if (composerTimelinePlayhead) {
    composerTimelinePlayhead.style.left = `${fraction * 100}%`;
  }
  if (composerPlayheadScrubInput) {
    composerPlayheadScrubInput.value = String(Math.round(fraction * 1000));
  }
  const timeWindow = getComposerSceneTimeWindow(documentData);
  if (composerTimelineSummary) {
    composerTimelineSummary.textContent = `${formatComposerTimeLabel(timeSeconds)} / ${formatComposerTimeLabel(
      timeWindow.end
    )}`;
  }
  if (composerPlayToggleButton) {
    setComposerTransportButtonIcon(
      composerPlayToggleButton,
      composerPlaybackState.playing ? "pause" : "play"
    );
    composerPlayToggleButton.classList.toggle("is-active", composerPlaybackState.playing);
  }
}

function setComposerPlaybackPlayhead(timeSeconds, options = {}) {
  const documentData = options.documentData ?? composerCurrentDocument;
  if (!documentData) {
    return;
  }
  const timeWindow = getComposerSceneTimeWindow(documentData);
  composerPlaybackState.playheadSeconds = clamp(timeSeconds, timeWindow.start, timeWindow.end);
  composerPlaybackState.pauseRemaining = 0;
  composerPlaybackState.lastTickMs = performance.now();
  if (options.playing !== undefined) {
    composerPlaybackState.playing = !!options.playing;
  }
  updateComposerAnimatedViewport(composerPlaybackState.playheadSeconds);
  updateComposerTimelinePlayhead(composerPlaybackState.playheadSeconds, documentData);
}

function startComposerPlayback(timeSeconds, options = {}) {
  const documentData = options.documentData ?? composerCurrentDocument;
  if (!documentData) {
    return;
  }
  const timeWindow = getComposerSceneTimeWindow(documentData);
  const clampedTime = clamp(timeSeconds, timeWindow.start, timeWindow.end);
  composerPlaybackState.playheadSeconds =
    clampedTime >= timeWindow.end - 0.001
      ? timeWindow.start
      : Math.min(clampedTime, timeWindow.end - 0.0001);
  composerPlaybackState.pauseRemaining = 0;
  composerPlaybackState.playing = true;
  composerPlaybackState.lastTickMs = 0;
  updateComposerAnimatedViewport(composerPlaybackState.playheadSeconds);
  updateComposerTimelinePlayhead(composerPlaybackState.playheadSeconds, documentData);
}

function toggleComposerPlayback() {
  if (!composerCurrentDocument) {
    return;
  }
  const timeWindow = getComposerSceneTimeWindow(composerCurrentDocument);
  if (composerPlaybackState.playing) {
    setComposerPlaybackPlayhead(composerPlaybackState.playheadSeconds, {
      documentData: composerCurrentDocument,
      playing: false,
    });
    return;
  }
  startComposerPlayback(
    composerPlaybackState.playheadSeconds >= timeWindow.end - 0.001
      ? timeWindow.start
      : composerPlaybackState.playheadSeconds,
    { documentData: composerCurrentDocument }
  );
}

function restartComposerPlayback() {
  if (!composerCurrentDocument) {
    return;
  }
  const timeWindow = getComposerSceneTimeWindow(composerCurrentDocument);
  setComposerPlaybackPlayhead(timeWindow.start, {
    documentData: composerCurrentDocument,
    playing: false,
  });
}

function jumpToComposerMarker(markerId, options = {}) {
  if (!composerCurrentDocument || !markerId) {
    return;
  }
  const marker = getComposerSortedMarkers(composerCurrentDocument).find((entry) => entry.id === markerId);
  if (!marker) {
    return;
  }
  setComposerPlaybackPlayhead(marker.t, {
    documentData: composerCurrentDocument,
    playing: options.playing,
  });
}

function jumpComposerMarkerByOffset(direction) {
  if (!composerCurrentDocument) {
    return;
  }
  const markers = getComposerSortedMarkers(composerCurrentDocument);
  if (!markers.length) {
    return;
  }
  const epsilon = 0.001;
  let target = null;
  if (direction < 0) {
    target = [...markers].reverse().find((marker) => marker.t < composerPlaybackState.playheadSeconds - epsilon);
  } else {
    target = markers.find((marker) => marker.t > composerPlaybackState.playheadSeconds + epsilon);
  }
  if (!target) {
    target = direction < 0 ? markers[0] : markers[markers.length - 1];
  }
  jumpToComposerMarker(target.id, { playing: false });
}

function scrubComposerPlayback(fraction, options = {}) {
  if (!composerCurrentDocument) {
    return;
  }
  const timeWindow = getComposerSceneTimeWindow(composerCurrentDocument);
  const nextTime = THREE.MathUtils.lerp(timeWindow.start, timeWindow.end, clamp(fraction, 0, 1));
  setComposerPlaybackPlayhead(nextTime, {
    documentData: composerCurrentDocument,
    playing: options.playing,
  });
}

function updateComposerPlaybackState(now) {
  if (!composerCurrentDocument || !composerPlaybackState.playing) {
    composerPlaybackState.lastTickMs = now;
    return composerPlaybackState.playheadSeconds;
  }
  if (!composerPlaybackState.lastTickMs) {
    composerPlaybackState.lastTickMs = now;
    return composerPlaybackState.playheadSeconds;
  }
  const deltaSeconds = Math.max(0, (now - composerPlaybackState.lastTickMs) / 1000);
  composerPlaybackState.lastTickMs = now;

  const timeWindow = getComposerSceneTimeWindow(composerCurrentDocument);
  if (composerPlaybackState.playheadSeconds < timeWindow.start) {
    composerPlaybackState.playheadSeconds = timeWindow.start;
  }

  const sceneRate = timeWindow.playbackRate;
  const step = deltaSeconds * sceneRate;
  composerPlaybackState.playheadSeconds += step;
  if (composerPlaybackState.playheadSeconds > timeWindow.end) {
    if (timeWindow.loop) {
      composerPlaybackState.playheadSeconds = timeWindow.start;
      composerPlaybackState.pauseRemaining = 0;
    } else {
      composerPlaybackState.playheadSeconds = timeWindow.end;
      composerPlaybackState.playing = false;
    }
  }
  return composerPlaybackState.playheadSeconds;
}

function updateComposerAnimatedViewport(timeSeconds) {
  if (!composerCurrentDocument) {
    return;
  }
  const motionTime = getComposerIntegratedMotionTime(composerCurrentDocument, timeSeconds);
  const paths = Array.isArray(composerCurrentDocument.paths) ? composerCurrentDocument.paths : [];
  const pathById = new Map(paths.map((path) => [path.id, path]));
  const assemblies = Array.isArray(composerCurrentDocument.assemblies)
    ? composerCurrentDocument.assemblies
    : [];
  const totalMotionDuration = getComposerTotalMotionDuration(composerCurrentDocument);
  const normalizedSceneT = totalMotionDuration > 0
    ? clamp(motionTime / totalMotionDuration, 0, 1)
    : 0;
  const assemblyCenters = new Map();
  const assemblyById = new Map(assemblies.map((assembly) => [assembly.id, assembly]));

  const resolveAssemblyCenter = (assembly, index, stack = new Set()) => {
    if (!assembly?.id) {
      return new THREE.Vector3();
    }
    if (assemblyCenters.has(assembly.id)) {
      return assemblyCenters.get(assembly.id).clone();
    }
    if (stack.has(assembly.id)) {
      return computeComposerAssemblyBasePosition(assembly, index, assemblies.length, pathById);
    }
    stack.add(assembly.id);
    const motions = Array.isArray(assembly.motion)
      ? assembly.motion
      : assembly.motion
        ? [assembly.motion]
        : [];
    const transportMotion = motions.find((motion) => motion?.type === "path.transport");
    let center = computeComposerAssemblyBasePosition(assembly, index, assemblies.length, pathById);
    if (transportMotion?.pathId && pathById.has(transportMotion.pathId)) {
      const path = pathById.get(transportMotion.pathId);
      const points = Array.isArray(path?.payload?.points) ? path.payload.points : [];
      if (points.length) {
        const motionT = clamp(
          normalizedSceneT * (Number(transportMotion.speed ?? 1) || 1) + Number(transportMotion.phase ?? 0),
          0,
          1
        );
        center = sampleComposerPointAt(points, motionT, {
          interpolate: path?.payload?.interpolate ?? "spline",
          closed: !!path?.payload?.closed,
        });
      }
    }
    const parentId = assembly?.parentId;
    if (parentId && assemblyById.has(parentId)) {
      const parentAssembly = assemblyById.get(parentId);
      const parentIndex = assemblies.findIndex((candidate) => candidate?.id === parentId);
      if (parentAssembly && parentIndex !== -1) {
        center.add(resolveAssemblyCenter(parentAssembly, parentIndex, stack));
      }
    }
    assemblyCenters.set(assembly.id, center.clone());
    stack.delete(assembly.id);
    return center.clone();
  };

  assemblies.forEach((assembly, index) => {
    const center = resolveAssemblyCenter(assembly, index);
    const mesh = composerAssemblyMeshes[index];
    if (mesh) {
      mesh.position.copy(center);
    }
  });
  composerAssemblyWorldCenters = new Map(
    [...assemblyCenters.entries()].map(([assemblyId, center]) => [assemblyId, center.clone()])
  );

  composerShellMeshes.forEach((mesh) => {
    const assemblyId = mesh.userData.assemblyId;
    const center = assemblyCenters.get(assemblyId);
    if (center) {
      mesh.position.copy(center);
    }
  });

  composerEnvelopeMeshes.forEach((mesh) => {
    const assemblyId = mesh.userData.assemblyId;
    const center = assemblyCenters.get(assemblyId);
    if (center) {
      mesh.position.copy(center);
    }
  });

  composerOrbitTraceLines.forEach((line) => {
    const assemblyId = line.userData.assemblyId;
    const center = assemblyCenters.get(assemblyId);
    if (center) {
      line.position.copy(center);
    }
  });

  composerAxisGuideLines.forEach((line) => {
    const assemblyId = line.userData.assemblyId;
    const center = assemblyCenters.get(assemblyId);
    if (center) {
      line.position.copy(center);
    }
  });

  composerHistoryTraceLines.forEach((line) => {
    const historyTrace = line.userData.historyTrace;
    const path = historyTrace?.pathId ? pathById.get(historyTrace.pathId) : null;
    const assemblyId = historyTrace?.assemblyId ?? null;
    const assemblyCenter = assemblyId ? assemblyCenters.get(assemblyId) : null;
    const points = Array.isArray(path?.payload?.points) ? path.payload.points : [];
    if (!assemblyCenter || !points.length) {
      line.visible = false;
      return;
    }
    const sampledPoints = sampleComposerPath(
      points,
      path?.payload?.interpolate ?? "spline",
      !!path?.payload?.closed
    );
    if (!sampledPoints.length) {
      line.visible = false;
      return;
    }
    const currentSample = sampleComposerPointAt(points, normalizedSceneT, {
      interpolate: path?.payload?.interpolate ?? "spline",
      closed: !!path?.payload?.closed,
    });
    const anchorOffset = assemblyCenter.clone().sub(currentSample);
    const maxIndex = clamp(
      Math.round(normalizedSceneT * (sampledPoints.length - 1)),
      1,
      sampledPoints.length - 1
    );
    const visiblePoints = sampledPoints
      .slice(0, maxIndex + 1)
      .map((point) => point.clone().add(anchorOffset));
    if (visiblePoints.length < 2) {
      line.visible = false;
      return;
    }
    line.visible = true;
    line.geometry.setFromPoints(visiblePoints);
  });

  composerOrbitParticleMeshes.forEach((mesh) => {
    const assemblyId = mesh.userData.assemblyId;
    const center = assemblyCenters.get(assemblyId);
    const motion = mesh.userData.motion;
    if (!center || motion?.type !== "orbit.circular") {
      return;
    }
    const offset = getComposerOrbitOffsetAtTime(motion, mesh.userData.chargeType, motionTime);
    mesh.position.copy(center).add(offset);
  });

  composerMemberLabelSprites.forEach((sprite) => {
    const assemblyId = sprite.userData.assemblyId;
    const memberId = sprite.userData.memberId;
    const anchorPosition = resolveComposerTransferEndpointPosition(
      { assemblyId, memberId },
      assemblyCenters,
      motionTime
    );
    if (!anchorPosition) {
      sprite.visible = false;
      return;
    }
    sprite.visible = true;
    const offset = vectorFromTriplet(sprite.userData.offset);
    sprite.position.copy(anchorPosition).add(offset);
  });

  const activeReactionTransferIds = getComposerActiveReactionTransferIds(
    composerCurrentDocument,
    timeSeconds
  );
  const activeReactionStage = getComposerActiveReactionStage(composerCurrentDocument, timeSeconds);
  const hasReactionFocus = activeReactionTransferIds.size > 0;
  composerTransferLines.forEach((line) => {
    const transfer = line.userData.transfer;
    const sourcePoint = resolveComposerTransferEndpointPosition(
      transfer?.source,
      assemblyCenters,
      motionTime
    );
    const targetPoint = resolveComposerTransferEndpointPosition(
      transfer?.target,
      assemblyCenters,
      motionTime
    );
    if (!sourcePoint || !targetPoint) {
      line.visible = false;
      return;
    }
    line.visible = true;
    line.geometry.setFromPoints([sourcePoint, targetPoint]);
    line.computeLineDistances();
    const isActiveReactionTransfer = transfer?.id && activeReactionTransferIds.has(transfer.id);
    const isActiveByTime = transfer?.t == null || Math.abs(timeSeconds - Number(transfer.t)) <= 0.6;
    if (activeReactionStage?.action === "reassemble") {
      line.material.color.set(0x8ef0c2);
    } else if (activeReactionStage?.action === "detach") {
      line.material.color.set(0xffc978);
    } else if (activeReactionStage?.action === "attach") {
      line.material.color.set(0x85d9ff);
    } else if (activeReactionStage?.action === "transform") {
      line.material.color.set(0xd0a7ff);
    } else if (activeReactionStage?.action === "spawn") {
      line.material.color.set(0x9ceef7);
    } else if (activeReactionStage?.action === "despawn") {
      line.material.color.set(0xc2c8d8);
    } else {
      line.material.color.set(0xffd17a);
    }
    line.material.opacity = hasReactionFocus
      ? isActiveReactionTransfer
        ? 0.88
        : 0.16
      : isActiveByTime
        ? 0.82
        : 0.32;
  });

  composerPersonalityHandleMeshes.forEach((mesh) => {
    const assemblyId = mesh?.userData?.assemblyId ?? null;
    const memberId = mesh?.userData?.memberId ?? null;
    const assembly = assemblyId ? assemblyById.get(assemblyId) : null;
    const member = Array.isArray(assembly?.members)
      ? assembly.members.find((entry, index) => getComposerMemberId(entry, index) === memberId)
      : null;
    if (!assembly || !member) {
      mesh.visible = false;
      return;
    }
    const slotIndex = Math.max(0, Number(member?.slotIndex ?? 0) || 0);
    const localOffset = getComposerPersonalitySlotLocalOffset(assembly, slotIndex);
    mesh.position.copy(localOffset);
    if (mesh.material?.color) {
      mesh.material.color.set(getComposerMemberColor(member, slotIndex));
    }
    setComposerMemberAnchor(assemblyId, memberId, {
      type: "proxy",
      offset: [localOffset.x, localOffset.y, localOffset.z],
    });
    mesh.visible = true;
  });

  try {
    updateComposerGraphicOverlayVisuals(timeSeconds, composerCurrentDocument, assemblyCenters);
  } catch (error) {
    console.error("Composer graphic overlay update failed.", error);
  }
  updateComposerViewportMediaOverlays(timeSeconds, composerCurrentDocument);
  updateComposerDocumentCameraPreview(timeSeconds, composerCurrentDocument);
}

function addComposerOrbitTrace(center, motion, color) {
  const radius = Number(motion?.radius ?? 0);
  if (!radius || radius <= 0) {
    return;
  }
  const { u, v } = getComposerOrbitBasis(motion);
  const points = [];
  const segments = 96;
  for (let i = 0; i <= segments; i += 1) {
    const t = (i / segments) * Math.PI * 2;
    points.push(
      u
        .clone()
        .multiplyScalar(Math.cos(t) * radius)
        .add(v.clone().multiplyScalar(Math.sin(t) * radius))
    );
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.55,
  });
  const line = new THREE.Line(geometry, material);
  line.position.copy(center);
  composerViewportGroup?.add(line);
  composerOrbitTraceLines.push(line);
}

function addComposerAxisGuide(center, axisGuide) {
  if (!axisGuide?.visible) {
    return;
  }
  const axis = Array.isArray(axisGuide.axis)
    ? new THREE.Vector3(axisGuide.axis[0] ?? 0, axisGuide.axis[1] ?? 1, axisGuide.axis[2] ?? 0)
    : new THREE.Vector3(0, 1, 0);
  if (axis.lengthSq() === 0) {
    axis.set(0, 1, 0);
  }
  axis.normalize();
  const length = Number(axisGuide.length ?? 1.2);
  const half = axis.clone().multiplyScalar(length * 0.5);
  const geometry = new THREE.BufferGeometry().setFromPoints([
    half.clone().multiplyScalar(-1),
    half.clone(),
  ]);
  const material = new THREE.LineBasicMaterial({
    color: axisGuide.style?.stroke ?? 0xcbd5e1,
    transparent: true,
    opacity: axisGuide.style?.strokeOpacity ?? 0.75,
  });
  const line = new THREE.Line(geometry, material);
  line.position.copy(center);
  line.userData.axisGuide = axisGuide;
  composerViewportGroup?.add(line);
  composerAxisGuideLines.push(line);
}

function addComposerShell(center, shell) {
  const radius = Number(shell?.radius ?? 0);
  if (!radius || radius <= 0) {
    return;
  }
  const shellGeometry = new THREE.SphereGeometry(radius, 32, 20);
  const mesh = new THREE.Mesh(
    shellGeometry,
    new THREE.MeshBasicMaterial({
      color: shell?.color ?? "#7fb9ff",
      transparent: true,
      opacity: shell?.opacity ?? 0.08,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
  );
  const wireframe = new THREE.LineSegments(
    new THREE.WireframeGeometry(shellGeometry),
    new THREE.LineBasicMaterial({
      color: shell?.color ?? "#7fb9ff",
      transparent: true,
      opacity: Math.min(0.4, Math.max(0.14, Number(shell?.opacity ?? 0.08) * 2.2)),
    })
  );
  wireframe.userData.isComposerShellGuide = true;
  mesh.add(wireframe);
  mesh.position.copy(center);
  mesh.userData.assemblyId = shell?.assemblyId ?? null;
  composerViewportGroup?.add(mesh);
  composerShellMeshes.push(mesh);
}

function addComposerEnvelope(center, envelope) {
  const radius = Number(
    envelope?.geometry?.radius ??
      envelope?.radius ??
      0
  );
  if (!radius || radius <= 0) {
    return;
  }
  const geometry = new THREE.SphereGeometry(radius, 28, 18);
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
      color: envelope?.style?.color ?? "#9fd4ff",
      transparent: true,
      opacity: envelope?.style?.opacity ?? 0.06,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
  );
  const wireframe = new THREE.LineSegments(
    new THREE.WireframeGeometry(geometry),
    new THREE.LineBasicMaterial({
      color: envelope?.style?.color ?? "#9fd4ff",
      transparent: true,
      opacity: Math.min(0.3, Math.max(0.1, Number(envelope?.style?.opacity ?? 0.06) * 2.8)),
    })
  );
  mesh.add(wireframe);
  mesh.position.copy(center);
  mesh.userData.assemblyId = envelope?.assemblyId ?? null;
  composerViewportGroup?.add(mesh);
  composerEnvelopeMeshes.push(mesh);
}

function addComposerHistoryTrace(historyTrace) {
  if (!composerViewportGroup) {
    return;
  }
  const line = new THREE.Line(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({
      color: historyTrace?.style?.color ?? 0x8bdcff,
      transparent: true,
      opacity: historyTrace?.style?.opacity ?? 0.42,
    })
  );
  line.userData.historyTrace = historyTrace;
  composerViewportGroup.add(line);
  composerHistoryTraceLines.push(line);
}

function addComposerOrbitParticle(center, motion, chargeType, memberId = null) {
  if (motion?.type !== "orbit.circular") {
    return;
  }
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.06, 16, 12),
    new THREE.MeshBasicMaterial({
      color: chargeType === "electrino" ? binaryStyle.electrinoColor : binaryStyle.positrinoColor,
      transparent: true,
      opacity: 0.95,
    })
  );
  mesh.position.copy(center);
  mesh.userData.motion = motion;
  mesh.userData.chargeType = chargeType;
  mesh.userData.phaseOffset = chargeType === "electrino" ? Math.PI : 0;
  mesh.userData.memberId = memberId;
  composerViewportGroup?.add(mesh);
  composerOrbitParticleMeshes.push(mesh);
}

function addComposerTransferLine(transfer) {
  if (!composerViewportGroup) {
    return;
  }
  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(),
    new THREE.Vector3(),
  ]);
  const material = new THREE.LineDashedMaterial({
    color: 0xffd17a,
    transparent: true,
    opacity: 0.55,
    dashSize: 0.12,
    gapSize: 0.08,
  });
  const line = new THREE.Line(geometry, material);
  line.computeLineDistances();
  line.userData.transfer = transfer;
  composerViewportGroup.add(line);
  composerTransferLines.push(line);
}

function addComposerGraphicOverlayVisual(overlay) {
  if (!composerViewportGroup || !overlay?.id) {
    return;
  }
  const group = new THREE.Group();
  group.userData.overlayId = overlay.id;
  group.userData.isComposerGraphicOverlay = true;

  const haloRadius = Math.max(0.18, Number(overlay.size ?? 0.42) || 0.42);
  const calloutLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]),
    new THREE.LineBasicMaterial({
      color: 0xc2ebff,
      transparent: true,
      opacity: 0.78,
      depthTest: false,
      depthWrite: false,
    })
  );
  calloutLine.renderOrder = 15;
  calloutLine.userData.overlayId = overlay.id;
  group.add(calloutLine);

  const textSprite = createComposerGraphicOverlayTextSprite(overlay.text, haloRadius);
  textSprite.userData.overlayId = overlay.id;
  textSprite.userData.isComposerGraphicHandle = true;
  textSprite.userData.draggable = true;
  const textHitProxy = createComposerMarkerHitProxy(Math.max(0.24, haloRadius * 0.84));
  textSprite.userData.hitProxy = textHitProxy;
  textSprite.add(textHitProxy);
  group.add(textSprite);
  composerGraphicOverlayHandleMeshes.push(textSprite);

  group.userData.calloutLine = calloutLine;
  group.userData.textSprite = textSprite;
  group.userData.radius = haloRadius;
  group.userData.textSignature = "";

  composerViewportGroup.add(group);
  composerGraphicOverlayGroups.push(group);
}

function updateComposerGraphicOverlayVisuals(timeSeconds, documentData, assemblyCenters = new Map()) {
  const overlayById = new Map(getComposerGraphicTimelineOverlays(documentData).map((overlay) => [overlay.id, overlay]));
  composerGraphicOverlayGroups.forEach((group) => {
    const overlayId = group?.userData?.overlayId;
    const overlay = overlayId ? overlayById.get(overlayId) : null;
    if (!overlay) {
      group.visible = false;
      return;
    }
    const isActive = isComposerTimeWithinSpan(timeSeconds, overlay.start, overlay.end);
    group.visible = isActive;
    if (!isActive) {
      return;
    }
    const targetPosition =
      resolveComposerGraphicTargetPosition(overlay.target, assemblyCenters, documentData) ??
      new THREE.Vector3();
    const offset = vectorFromTriplet(overlay.offset ?? [0, 0, 0]);
    const sphereCenter = targetPosition.clone().add(offset);
    const anchorPosition =
      resolveComposerGraphicTargetContactPosition(overlay.target, sphereCenter, assemblyCenters, documentData) ??
      targetPosition;
    group.position.copy(sphereCenter);
    group.userData.anchorPosition = anchorPosition.clone();
    group.userData.radius = Math.max(0.18, Number(overlay.size ?? 0.42) || 0.42);

    const calloutLine = group.userData.calloutLine ?? null;
    const radius = group.userData.radius;
    const textSprite = group.userData.textSprite ?? null;
    const nextSignature = `${overlay.text}|${radius.toFixed(3)}`;
    if (textSprite && group.userData.textSignature !== nextSignature) {
      updateComposerGraphicOverlayTextSprite(textSprite, overlay.text, radius);
      group.userData.textSignature = nextSignature;
    }
    if (calloutLine) {
      const direction = anchorPosition.clone().sub(sphereCenter);
      const endPoint = direction.lengthSq() > 0.0001
        ? direction.normalize().multiplyScalar(radius * 0.64)
        : new THREE.Vector3(-radius * 0.64, 0, 0);
      calloutLine.geometry.setFromPoints([anchorPosition.clone().sub(sphereCenter), endPoint]);
    }
  });
}

function setComposerViewportMediaOverlayFrame(element, rect) {
  if (!element || !rect) {
    return;
  }
  element.style.left = `${rect.x * 100}%`;
  element.style.top = `${rect.y * 100}%`;
  element.style.width = `${rect.width * 100}%`;
  element.style.height = `${rect.height * 100}%`;
}

function clearComposerViewportMediaOverlays() {
  composerViewportMediaOverlayElements.forEach((element) => {
    element?.remove?.();
  });
  composerViewportMediaOverlayElements.clear();
}

function createComposerViewportMediaOverlayElement(overlay) {
  if (!composerViewportOverlays || !overlay?.id || !(overlay.kind === "image" || overlay.kind === "video")) {
    return null;
  }
  const wrapper = document.createElement("div");
  wrapper.className = "composer-media-overlay";
  wrapper.dataset.overlayId = overlay.id;
  wrapper.dataset.overlayKind = overlay.kind;

  const mediaElement = document.createElement(overlay.kind === "video" ? "video" : "img");
  mediaElement.className = "composer-media-overlay-media";
  if (overlay.kind === "video") {
    mediaElement.muted = overlay.muted !== false;
    mediaElement.loop = false;
    mediaElement.playsInline = true;
    mediaElement.preload = "metadata";
    mediaElement.controls = false;
  } else {
    mediaElement.alt = overlay.label ?? "Image overlay";
    mediaElement.decoding = "async";
    mediaElement.draggable = false;
  }
  if (overlay.source) {
    if (overlay.kind === "video") {
      mediaElement.src = overlay.source;
    } else {
      mediaElement.src = overlay.source;
    }
  }
  wrapper.appendChild(mediaElement);

  const handle = document.createElement("div");
  handle.className = "composer-media-overlay-handle";
  wrapper.appendChild(handle);

  const endInteraction = (event) => {
    const state = wrapper.__composerDragState;
    if (!state || (event && state.pointerId !== event.pointerId)) {
      return;
    }
    wrapper.__composerDragState = null;
    wrapper.classList.remove("is-active");
    if (wrapper.hasPointerCapture?.(state.pointerId)) {
      wrapper.releasePointerCapture(state.pointerId);
    }
    renderComposerJsonPreview();
  };

  const startInteraction = (mode, event) => {
    if (event.button !== 0) {
      return;
    }
    const draftOverlay = getComposerGraphicOverlayDraftById(overlay.id);
    if (!draftOverlay) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    closeComposerAssemblyMenu();
    wrapper.classList.add("is-active");
    wrapper.__composerDragState = {
      mode,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startRect: { ...(draftOverlay.rect ?? getComposerMediaDefaultRect(draftOverlay.kind)) },
      aspect:
        Number(draftOverlay?.rect?.width ?? 0) > 0 && Number(draftOverlay?.rect?.height ?? 0) > 0
          ? Number(draftOverlay.rect.width) / Number(draftOverlay.rect.height)
          : overlay.kind === "video"
            ? 16 / 9
            : 1,
    };
    wrapper.setPointerCapture?.(event.pointerId);
  };

  wrapper.addEventListener("pointerdown", (event) => {
    if (event.target === handle) {
      return;
    }
    startInteraction("move", event);
  });
  handle.addEventListener("pointerdown", (event) => {
    startInteraction("resize", event);
  });
  wrapper.addEventListener("pointermove", (event) => {
    const state = wrapper.__composerDragState;
    if (!state || state.pointerId !== event.pointerId || !composerCanvasWrap) {
      return;
    }
    const draftOverlay = getComposerGraphicOverlayDraftById(overlay.id);
    if (!draftOverlay) {
      return;
    }
    event.preventDefault();
    const wrapRect = composerCanvasWrap.getBoundingClientRect();
    const dx = wrapRect.width ? (event.clientX - state.startX) / wrapRect.width : 0;
    const dy = wrapRect.height ? (event.clientY - state.startY) / wrapRect.height : 0;
    if (state.mode === "move") {
      draftOverlay.rect = normalizeComposerMediaRect({
        x: state.startRect.x + dx,
        y: state.startRect.y + dy,
        width: state.startRect.width,
        height: state.startRect.height,
      }, draftOverlay.kind);
    } else {
      const nextWidth = clamp(state.startRect.width + dx, 0.08, 0.86);
      const aspect = Math.max(0.2, state.aspect || 1);
      let nextHeight = nextWidth / aspect;
      if (state.startRect.y + nextHeight > 0.96) {
        nextHeight = 0.96 - state.startRect.y;
      }
      draftOverlay.rect = normalizeComposerMediaRect({
        x: state.startRect.x,
        y: state.startRect.y,
        width: nextWidth,
        height: nextHeight,
      }, draftOverlay.kind);
    }
    setComposerViewportMediaOverlayFrame(wrapper, draftOverlay.rect);
  });
  wrapper.addEventListener("pointerup", endInteraction);
  wrapper.addEventListener("pointercancel", endInteraction);
  wrapper.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    event.stopPropagation();
    openComposerTimelineMenuAt(event.clientX, event.clientY, {
      overlayId: overlay.id,
    });
  });

  composerViewportOverlays.appendChild(wrapper);
  composerViewportMediaOverlayElements.set(overlay.id, wrapper);
  setComposerViewportMediaOverlayFrame(wrapper, overlay.rect ?? getComposerMediaDefaultRect(overlay.kind));
  return wrapper;
}

function syncComposerViewportMediaOverlays(documentData) {
  clearComposerViewportMediaOverlays();
  const overlays = getComposerViewportMediaTimelineOverlays(documentData);
  overlays.forEach((overlay) => {
    createComposerViewportMediaOverlayElement(overlay);
  });
}

function updateComposerViewportMediaOverlays(timeSeconds, documentData) {
  const overlays = getComposerViewportMediaTimelineOverlays(documentData);
  const overlayById = new Map(overlays.map((overlay) => [overlay.id, overlay]));
  composerViewportMediaOverlayElements.forEach((element, overlayId) => {
    const overlay = overlayById.get(overlayId);
    const mediaElement = element?.querySelector?.(".composer-media-overlay-media");
    if (!overlay || !mediaElement) {
      element?.classList.remove("is-visible");
      return;
    }
    setComposerViewportMediaOverlayFrame(element, overlay.rect ?? getComposerMediaDefaultRect(overlay.kind));
    const isActive = isComposerTimeWithinSpan(timeSeconds, overlay.start, overlay.end);
    element.classList.toggle("is-visible", isActive);
    if (!isActive) {
      if (overlay.kind === "video") {
        mediaElement.pause?.();
      }
      return;
    }
    if (overlay.kind === "video") {
      const localTime = Math.max(0, timeSeconds - overlay.start);
      if (!composerPlaybackState.playing || Math.abs((mediaElement.currentTime ?? 0) - localTime) > 0.25) {
        try {
          mediaElement.currentTime = localTime;
        } catch (_error) {
          // Ignore sync failures while metadata is still loading.
        }
      }
      if (composerPlaybackState.playing) {
        mediaElement.play?.().catch?.(() => {});
      } else {
        mediaElement.pause?.();
      }
    }
  });
}

function addComposerAssemblyProxy(center, assembly, index) {
  const group = new THREE.Group();
  group.position.copy(center);
  group.userData.assemblyId = assembly?.id ?? null;
  group.userData.assemblyIndex = index;
  group.userData.draggable = true;
  const isBareArchitrino = isComposerBareArchitrinoAssembly(assembly);

  if (!isBareArchitrino) {
    const sceneRole = normalizeComposerAssemblySceneRole(assembly?.sceneRole);
    const centerMarker = new THREE.Mesh(
      new THREE.SphereGeometry(0.085, 20, 20),
      new THREE.MeshBasicMaterial({
        color: getComposerAssemblySceneRoleColor(sceneRole),
        transparent: true,
        opacity: 0.98,
        depthTest: false,
        depthWrite: false,
      })
    );
    centerMarker.renderOrder = 12;
    centerMarker.userData.assemblyId = assembly?.id ?? null;
    centerMarker.userData.assemblyIndex = index;
    centerMarker.userData.sceneRole = sceneRole;
    centerMarker.userData.draggable = true;
    centerMarker.userData.isAssemblyCenterMarker = true;
    const centerLabel = createComposerPointLabelSprite(getComposerAssemblyViewportLabel(assembly, index));
    centerLabel.position.set(0, 0, 0);
    centerMarker.userData.pointLabelSprite = centerLabel;
    const centerHitProxy = createComposerMarkerHitProxy(0.22);
    centerMarker.userData.hitProxy = centerHitProxy;
    centerMarker.add(centerHitProxy);
    centerMarker.add(centerLabel);
    group.add(centerMarker);
  }

  const rawMembers = Array.isArray(assembly?.members) ? assembly.members : [];
  const members = rawMembers.map((member, memberIndex) => ({
    id: getComposerMemberId(member, memberIndex),
    position: getComposerMemberPosition(member),
  }));
  const memberCount = members.length;
  const hasCore = Array.isArray(assembly?.core?.shells) && assembly.core.shells.length > 0;
  const baseColor = composerPalette[index % Math.max(1, composerPalette.length)] ?? "#6ea8fe";
  let proxyBadgeOffset = new THREE.Vector3(0.52, 0.52, 0);

  if (!hasCore) {
    const baseRadius = 0.17 + Math.min(memberCount, 8) * 0.018;

    const children = Array.isArray(assembly?.children) ? assembly.children : [];
    const childMemberIds = new Set(children.flatMap((child) => child?.members ?? []));
    const rootMembers = members.filter((memberEntry) => !childMemberIds.has(memberEntry.id));
    const visibleRootMembers = Math.min(rootMembers.length, 8);
    rootMembers.forEach((memberEntry, memberIndex) => {
      const memberId = memberEntry.id;
      const authoredPosition = memberEntry.position;
      const memberOffset = authoredPosition
        ? new THREE.Vector3(authoredPosition[0], authoredPosition[1], authoredPosition[2])
        : isBareArchitrino
          ? new THREE.Vector3(0, 0, 0)
          : getComposerProxyMemberOffset(memberIndex, rootMembers.length, baseRadius);
      setComposerMemberAnchor(assembly?.id, memberId, {
        type: "proxy",
        offset: [memberOffset.x, memberOffset.y, memberOffset.z],
      });
      if (memberIndex >= visibleRootMembers) {
        return;
      }
      const memberDot = new THREE.Mesh(
        new THREE.SphereGeometry(isBareArchitrino ? 0.052 : 0.03, 12, 10),
        new THREE.MeshBasicMaterial({
          color: getComposerMemberColor(memberId, memberIndex),
          transparent: true,
          opacity: 0.95,
          depthTest: !isBareArchitrino,
          depthWrite: !isBareArchitrino,
        })
      );
      memberDot.position.copy(memberOffset);
      if (isBareArchitrino) {
        memberDot.renderOrder = 13;
      }
      memberDot.userData.assemblyId = assembly?.id ?? null;
      memberDot.userData.memberId = memberId;
      memberDot.userData.subassemblyId = "";
      memberDot.userData.draggable = true;
      memberDot.userData.isComposerMemberHandle = true;
      const memberHitProxy = createComposerMarkerHitProxy(isBareArchitrino ? 0.18 : 0.12);
      memberDot.userData.hitProxy = memberHitProxy;
      memberDot.add(memberHitProxy);
      group.add(memberDot);
      composerMemberHandleMeshes.push(memberDot);
    });

    children.forEach((child, childIndex) => {
      const childMembers = members.filter((memberEntry) => (child?.members ?? []).includes(memberEntry.id));
      if (!childMembers.length) {
        return;
      }
      const childPosition = vectorFromTriplet(child?.transform?.position ?? [0, 0, 0]);
      const childRadius = 0.11 + Math.min(childMembers.length, 6) * 0.016;
      const childColor = childIndex % 2 === 0 ? "#89c6ff" : "#8fe8cf";
      const childMesh = new THREE.Mesh(
        new THREE.SphereGeometry(childRadius, 16, 12),
        new THREE.MeshBasicMaterial({
          color: childColor,
          transparent: true,
          opacity: 0.62,
        })
      );
      childMesh.position.copy(childPosition);
      childMesh.userData.assemblyId = assembly?.id ?? null;
      childMesh.userData.subassemblyId = getComposerSubassemblyId(child, childIndex);
      childMesh.userData.draggable = true;
      childMesh.userData.isComposerSubassemblyHandle = true;
      const childHitProxy = createComposerMarkerHitProxy(childRadius + 0.1);
      childMesh.userData.hitProxy = childHitProxy;
      childMesh.add(childHitProxy);
      group.add(childMesh);
      composerSubassemblyHandleMeshes.push(childMesh);
      const childOutline = new THREE.LineSegments(
        new THREE.WireframeGeometry(new THREE.SphereGeometry(childRadius, 12, 9)),
        new THREE.LineBasicMaterial({
          color: 0xe8f6ff,
          transparent: true,
          opacity: 0.28,
        })
      );
      childOutline.position.copy(childPosition);
      group.add(childOutline);

      const visibleChildMembers = Math.min(childMembers.length, 6);
      childMembers.forEach((memberEntry, memberIndex) => {
        const memberId = memberEntry.id;
        const localMemberOffset = memberEntry.position
          ? new THREE.Vector3(memberEntry.position[0], memberEntry.position[1], memberEntry.position[2])
          : getComposerProxyMemberOffset(memberIndex, childMembers.length, childRadius);
        const memberOffset = childPosition.clone().add(localMemberOffset);
        setComposerMemberAnchor(assembly?.id, memberId, {
          type: "proxy",
          offset: [memberOffset.x, memberOffset.y, memberOffset.z],
        });
        if (memberIndex >= visibleChildMembers) {
          return;
        }
        const memberDot = new THREE.Mesh(
          new THREE.SphereGeometry(0.038, 12, 10),
          new THREE.MeshBasicMaterial({
            color: getComposerMemberColor(memberId, memberIndex + childIndex),
            transparent: true,
            opacity: 0.95,
          })
        );
        memberDot.position.copy(memberOffset);
        memberDot.userData.assemblyId = assembly?.id ?? null;
        memberDot.userData.memberId = memberId;
        memberDot.userData.subassemblyId = getComposerSubassemblyId(child, childIndex);
        memberDot.userData.draggable = true;
        memberDot.userData.isComposerMemberHandle = true;
        const childMemberHitProxy = createComposerMarkerHitProxy(0.13);
        memberDot.userData.hitProxy = childMemberHitProxy;
        memberDot.add(childMemberHitProxy);
        group.add(memberDot);
        composerMemberHandleMeshes.push(memberDot);
      });
    });
    proxyBadgeOffset = isBareArchitrino
      ? new THREE.Vector3()
      : new THREE.Vector3(baseRadius + 0.16, baseRadius + 0.12, 0);
  } else {
    const shellRadii = Array.isArray(assembly?.core?.shells)
      ? assembly.core.shells
          .map((shell) => Number(shell?.radius ?? 0) || 0)
          .filter((radius) => radius > 0)
      : [];
    const outerRadius = shellRadii.length ? Math.max(...shellRadii) : 1;
    const markerRadius = outerRadius + 0.06;
    const diagonal = markerRadius * Math.SQRT1_2;
    proxyBadgeOffset = new THREE.Vector3(diagonal, diagonal, 0);

    const personalityMembers = getComposerPersonalityMembers(assembly);
    personalityMembers.forEach((member, memberIndex) => {
      const memberId = getComposerMemberId(member, memberIndex);
      const slotIndex = Math.max(0, Number(member?.slotIndex ?? memberIndex) || 0);
      const localOffset = getComposerPersonalitySlotLocalOffset(assembly, slotIndex);
      setComposerMemberAnchor(assembly?.id, memberId, {
        type: "proxy",
        offset: [localOffset.x, localOffset.y, localOffset.z],
      });
      const memberDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 14, 12),
        new THREE.MeshBasicMaterial({
          color: getComposerMemberColor(member, memberIndex),
          transparent: true,
          opacity: 0.98,
          depthTest: false,
          depthWrite: false,
        })
      );
      memberDot.position.copy(localOffset);
      memberDot.renderOrder = 16;
      memberDot.userData.assemblyId = assembly?.id ?? null;
      memberDot.userData.memberId = memberId;
      memberDot.userData.draggable = false;
      memberDot.userData.isComposerPersonalityHandle = true;
      const memberHitProxy = createComposerMarkerHitProxy(0.16);
      memberDot.userData.hitProxy = memberHitProxy;
      memberDot.add(memberHitProxy);
      group.add(memberDot);
      composerPersonalityHandleMeshes.push(memberDot);
    });
  }

  composerViewportGroup?.add(group);
  composerAssemblyMeshes.push(group);
}

function resolveComposerShotInterval(shot, timeWindow) {
  const timing = shot?.timing ?? {};
  const start = Number(timing.start ?? timeWindow.start);
  const fadeIn = Math.max(0, Number(timing.fadeIn ?? 0));
  const hold = Math.max(0, Number(timing.hold ?? 0));
  const fadeOut = Math.max(0, Number(timing.fadeOut ?? 0));
  const end = start + fadeIn + hold + fadeOut;
  return {
    start,
    end: Math.max(start, end),
  };
}

function getComposerActiveCameraShot(documentData, timeSeconds) {
  const shots = Array.isArray(documentData?.cameraShots) ? documentData.cameraShots : [];
  const timeWindow = getComposerSceneTimeWindow(documentData);
  return shots.find((shot) => {
    const interval = resolveComposerShotInterval(shot, timeWindow);
    return timeSeconds >= interval.start && timeSeconds <= interval.end;
  }) ?? null;
}

function addComposerDocumentCameraVisuals(documentData) {
  if ((composerCameraFlightState?.waypoints?.length ?? 0) > 0) {
    return;
  }
  const cameraPaths = Array.isArray(documentData?.cameraPaths) ? documentData.cameraPaths : [];
  const pathById = new Map(cameraPaths.map((path) => [path.id, path]));
  const activeCameraPathId =
    documentData?.scene?.view?.activeCameraPath ??
    documentData?.cameraShots?.[0]?.cameraPath ??
    cameraPaths[0]?.id ??
    null;
  const cameraPath = activeCameraPathId ? pathById.get(activeCameraPathId) : null;
  const waypoints = Array.isArray(cameraPath?.waypoints) ? cameraPath.waypoints : [];
  if (!waypoints.length || !composerViewportGroup) {
    return;
  }

  const pathPoints = sampleComposerCurvePoints(
    waypoints.map((waypoint) => {
      const visiblePosition = getComposerCameraWaypointDisplayPosition(waypoint);
      return [visiblePosition.x, visiblePosition.y, visiblePosition.z];
    }),
    Math.max(20, waypoints.length * 18)
  );
  if (pathPoints.length) {
    const geometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
    const material = new THREE.LineDashedMaterial({
      color: 0x84d8ff,
      transparent: true,
      opacity: 0.75,
      dashSize: 0.18,
      gapSize: 0.12,
      depthTest: false,
      depthWrite: false,
    });
    composerDocumentCameraPathLine = new THREE.Line(geometry, material);
    composerDocumentCameraPathLine.renderOrder = 9;
    composerDocumentCameraPathLine.computeLineDistances();
    composerViewportGroup.add(composerDocumentCameraPathLine);
  }

  waypoints.forEach((waypoint, index) => {
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(index === 0 ? 0.028 : 0.022, 12, 10),
      new THREE.MeshBasicMaterial({
        color: index === 0 ? 0x9af0c9 : 0xb9e7ff,
        transparent: true,
        opacity: 0.9,
        depthTest: false,
        depthWrite: false,
      })
    );
    marker.position.copy(getComposerCameraWaypointDisplayPosition(waypoint));
    marker.renderOrder = 9;
    composerViewportGroup.add(marker);
    composerDocumentCameraWaypointMeshes.push(marker);
  });
}

function updateComposerDocumentCameraPreview(timeSeconds, documentData) {
  void timeSeconds;
  void documentData;
}

function updateComposerViewportFromDocument(documentData) {
  const previousSceneId = composerCurrentDocument?.scene?.id ?? null;
  const previousPlaybackPlaying = composerPlaybackState.playing;
  composerCurrentDocument = documentData;
  if (!composerViewportGroup || !composerPathGeometry) {
    return;
  }

  rebuildComposerPathDisplayFromDocument(documentData);
  clearComposerViewportVisuals();

  const paths = Array.isArray(documentData?.paths) ? documentData.paths : [];
  const pathById = new Map(paths.map((path) => [path.id, path]));
  const assemblies = Array.isArray(documentData?.assemblies) ? documentData.assemblies : [];
  assemblies.forEach((assembly, index) => {
    const center = computeComposerAssemblyBasePosition(assembly, index, assemblies.length, pathById);
    addComposerAssemblyProxy(center, assembly, index);

    const hasCore = Array.isArray(assembly?.core?.shells) && assembly.core.shells.length > 0;
    if (!hasCore) {
      return;
    }

    const shells = Array.isArray(assembly?.core?.shells) ? assembly.core.shells : [];
    shells.forEach((shell) => {
      addComposerShell(center, {
        ...shell,
        assemblyId: assembly.id,
      });
      const shellMesh = composerShellMeshes[composerShellMeshes.length - 1] ?? null;
      if (shellMesh) {
        shellMesh.userData.assemblyId = assembly.id;
      }
    });

    const binaries = Array.isArray(assembly?.core?.binaries) ? assembly.core.binaries : [];
    binaries.forEach((binary, binaryIndex) => {
      if (binary?.motion?.type === "orbit.circular") {
        const positrinoMemberId = findComposerCoreMemberId(assembly?.members, "positrino", binaryIndex);
        const electrinoMemberId = findComposerCoreMemberId(assembly?.members, "electrino", binaryIndex);
        if (positrinoMemberId) {
          setComposerMemberAnchor(assembly.id, positrinoMemberId, {
            type: "orbit",
            motion: binary.motion,
            chargeType: "positrino",
          });
        }
        if (electrinoMemberId) {
          setComposerMemberAnchor(assembly.id, electrinoMemberId, {
            type: "orbit",
            motion: binary.motion,
            chargeType: "electrino",
          });
        }
        addComposerOrbitParticle(center, binary.motion, "positrino", positrinoMemberId);
        addComposerOrbitParticle(center, binary.motion, "electrino", electrinoMemberId);
        const particleCount = composerOrbitParticleMeshes.length;
        if (composerOrbitParticleMeshes[particleCount - 1]) {
          composerOrbitParticleMeshes[particleCount - 1].userData.assemblyId = assembly.id;
        }
        if (composerOrbitParticleMeshes[particleCount - 2]) {
          composerOrbitParticleMeshes[particleCount - 2].userData.assemblyId = assembly.id;
        }
      }
    });
  });
  const historyTraces = Array.isArray(documentData?.historyTraces) ? documentData.historyTraces : [];
  historyTraces.forEach((historyTrace) => {
    addComposerHistoryTrace(historyTrace);
  });
  const envelopes = Array.isArray(documentData?.envelopes) ? documentData.envelopes : [];
  envelopes.forEach((envelope) => {
    const assemblyIndex = assemblies.findIndex((assembly) => assembly?.id === envelope?.assemblyId);
    const center =
      assemblyIndex >= 0
        ? computeComposerAssemblyBasePosition(assemblies[assemblyIndex], assemblyIndex, assemblies.length, pathById)
        : new THREE.Vector3();
    addComposerEnvelope(center, envelope);
  });
  const transfers = Array.isArray(documentData?.transfers) ? documentData.transfers : [];
  transfers.forEach((transfer) => {
    addComposerTransferLine(transfer);
  });
  const graphicOverlays = getComposerGraphicTimelineOverlays(documentData);
  graphicOverlays.forEach((overlay) => {
    try {
      addComposerGraphicOverlayVisual(overlay);
    } catch (error) {
      console.error("Composer graphic overlay setup failed.", overlay?.id, error);
    }
  });
  syncComposerViewportMediaOverlays(documentData);
  addComposerDocumentCameraVisuals(documentData);
  applyComposerViewportDisplayState();

  const timeWindow = getComposerSceneTimeWindow(documentData);
  if (composerPlaybackState.playheadSeconds < timeWindow.start || previousSceneId !== documentData?.scene?.id) {
    composerPlaybackState.playheadSeconds = timeWindow.start;
  } else {
    composerPlaybackState.playheadSeconds = clamp(
      composerPlaybackState.playheadSeconds,
      timeWindow.start,
      timeWindow.end
    );
  }
  composerPlaybackState.pauseRemaining = 0;
  composerPlaybackState.playing = previousPlaybackPlaying;
  composerPlaybackState.lastTickMs = 0;
  renderComposerTimeline(documentData);
  updateComposerAnimatedViewport(composerPlaybackState.playheadSeconds);
  updateComposerTimelinePlayhead(composerPlaybackState.playheadSeconds, documentData);
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
      new THREE.LineBasicMaterial({
        color: 0x7fe7cb,
        transparent: true,
        opacity: 0.95,
        depthTest: false,
        depthWrite: false,
      })
    );
    composerCameraFlightLine.renderOrder = 10;
    composerCameraFlightGroup.add(composerCameraFlightLine);
    composerFrameGroup.add(composerCameraFlightGroup);
    composerCameraWaypointGeometry = new THREE.SphereGeometry(0.085, 18, 18);
    composerCameraWaypointMaterial = new THREE.MeshBasicMaterial({
      color: 0x7fe7cb,
      transparent: true,
      opacity: 0.95,
      depthTest: false,
      depthWrite: false,
    });
  }

  composerCameraWaypointMeshes.forEach((mesh) => {
    disposeComposerMarkerHandle(mesh, "labelSprite");
    composerCameraFlightGroup.remove(mesh);
  });
  composerCameraWaypointMeshes = [];

  const displayPoints = composerCameraFlightState.waypoints.map((waypoint) =>
    getComposerCameraWaypointDisplayPosition(waypoint)
  );
  const curvePoints =
    displayPoints.length >= 2
      ? sampleComposerCurvePoints(
          displayPoints.map((point) => [point.x, point.y, point.z]),
          Math.max(20, displayPoints.length * 18)
        )
      : displayPoints;
  composerCameraFlightGeometry.setFromPoints(curvePoints.length ? curvePoints : []);

  if (displayPoints.length && composerCameraWaypointGeometry && composerCameraWaypointMaterial) {
    displayPoints.forEach((point) => {
      const marker = new THREE.Mesh(
        composerCameraWaypointGeometry,
        composerCameraWaypointMaterial.clone()
      );
      marker.position.copy(point);
      marker.renderOrder = 12;
      marker.userData.cameraWaypointIndex = composerCameraWaypointMeshes.length;
      const labelSprite = createComposerCameraWaypointLabelSprite(`🎥${composerCameraWaypointMeshes.length + 1}`);
      labelSprite.position.set(0, 0, 0);
      marker.userData.labelSprite = labelSprite;
      const hitProxy = createComposerMarkerHitProxy(0.19);
      marker.userData.hitProxy = hitProxy;
      marker.add(hitProxy);
      marker.add(labelSprite);
      composerCameraFlightGroup.add(marker);
      composerCameraWaypointMeshes.push(marker);
    });
  }
  updateComposerCameraWaypointMaterials(composerSelectedCameraWaypointIndex);
  applyComposerViewportDisplayState();
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
    composerCameraFlightToggle.textContent = "Stop Observer Path";
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
    composerCameraFlightToggle.textContent = "Preview Observer Path";
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
  const now = performance.now();
  updateComposerCameraFlightPreview(now);
  const playheadSeconds = updateComposerPlaybackState(now);
  updateComposerAnimatedViewport(playheadSeconds);
  updateComposerTimelinePlayhead(playheadSeconds, composerCurrentDocument);
  composerRenderer.render(composerScene, composerCamera);
}

function getComposerPointerNdc(event) {
  const rect = composerCanvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  return { x, y };
}

function resolveComposerAssemblyHit(object) {
  let current = object;
  while (current) {
    const assemblyIndex = current.userData?.assemblyIndex;
    const assemblyId = current.userData?.assemblyId;
    if (Number.isInteger(assemblyIndex) && assemblyId) {
      return {
        assemblyIndex,
        assemblyId,
        draggable: current.userData?.draggable !== false,
        object: current,
      };
    }
    current = current.parent ?? null;
  }
  return null;
}

function resolveComposerMemberHandleHit(object) {
  let current = object;
  while (current) {
    const assemblyId = current.userData?.assemblyId;
    const memberId = current.userData?.memberId;
    if (assemblyId && memberId) {
      return {
        assemblyId,
        memberId,
        subassemblyId: current.userData?.subassemblyId ?? "",
        draggable: current.userData?.draggable !== false,
        object: current,
      };
    }
    current = current.parent ?? null;
  }
  return null;
}

function resolveComposerSubassemblyHandleHit(object) {
  let current = object;
  while (current) {
    const assemblyId = current.userData?.assemblyId;
    const subassemblyId = current.userData?.subassemblyId;
    if (assemblyId && subassemblyId) {
      return {
        assemblyId,
        subassemblyId,
        draggable: current.userData?.draggable !== false,
        object: current,
      };
    }
    current = current.parent ?? null;
  }
  return null;
}

function resolveComposerGraphicOverlayHit(object) {
  let current = object;
  while (current) {
    const overlayId = current.userData?.overlayId;
    if (overlayId && current.userData?.isComposerGraphicHandle) {
      return {
        overlayId,
        draggable: current.userData?.draggable !== false,
        object: current,
      };
    }
    current = current.parent ?? null;
  }
  return null;
}

function resolveComposerPersonalityHandleHit(object) {
  let current = object;
  while (current) {
    const assemblyId = current.userData?.assemblyId;
    const memberId = current.userData?.memberId;
    if (assemblyId && memberId && current.userData?.isComposerPersonalityHandle) {
      return {
        assemblyId,
        memberId,
        draggable: false,
        object: current,
      };
    }
    current = current.parent ?? null;
  }
  return null;
}

function findComposerCenterMarkerIntersection(hits = []) {
  for (const hit of Array.isArray(hits) ? hits : []) {
    const assemblyHit = resolveComposerAssemblyHit(hit?.object);
    if (assemblyHit?.object?.userData?.isAssemblyCenterMarker) {
      return {
        ...assemblyHit,
        distance: Number(hit.distance ?? 0),
      };
    }
  }
  return null;
}

function shouldPreferComposerCenterMarker(pointHits = [], assemblyHits = []) {
  const centerHit = findComposerCenterMarkerIntersection(assemblyHits);
  if (!centerHit) {
    return null;
  }
  const nearestPointDistance = Number(pointHits?.[0]?.distance ?? Number.POSITIVE_INFINITY);
  return centerHit.distance <= nearestPointDistance + 0.12 ? centerHit : null;
}

function startComposerAssemblyDrag(assemblyId, assemblyIndex, worldPoint, event) {
  const assembly = composerAssemblyDrafts[assemblyIndex];
  if (!assembly) {
    return false;
  }
  setComposerSelectedAssembly(assemblyId);
  composerDragState.mode = "assembly";
  composerDragState.assemblyIndex = assemblyIndex;
  composerDragState.assemblyId = assemblyId;
  composerDragState.startX = event.clientX;
  composerDragState.startY = event.clientY;
  const startPosition = Array.isArray(assembly.position) ? assembly.position : [0, 0, 0];
  composerDragState.startAssemblyPosition.set(
    Number(startPosition[0] ?? 0) || 0,
    Number(startPosition[1] ?? 0) || 0,
    Number(startPosition[2] ?? 0) || 0
  );
  composerDragState.startAssemblyPathPoints = normalizeComposerAssemblyPathPoints(assembly.pathPoints);
  const parentWorldCenter = assembly.parentId
    ? composerAssemblyWorldCenters.get(assembly.parentId) ?? new THREE.Vector3()
    : new THREE.Vector3();
  const assemblyWorldCenter =
    composerAssemblyWorldCenters.get(assemblyId) ??
    worldPoint?.clone?.() ??
    new THREE.Vector3();
  composerDragState.startAssemblyParentCenter.copy(
    composerFrameGroup.worldToLocal(parentWorldCenter.clone())
  );
  composerDragState.startAssemblyCenter.copy(
    composerFrameGroup.worldToLocal(assemblyWorldCenter.clone())
  );
  const planeNormal = composerCamera.getWorldDirection(new THREE.Vector3()).normalize();
  composerDragState.plane.setFromNormalAndCoplanarPoint(planeNormal, assemblyWorldCenter);
  composerDragState.startAssemblyGrabOffset.set(0, 0, 0);
  if (composerRaycaster && composerCamera && composerCanvas) {
    const { x, y } = getComposerPointerNdc(event);
    composerRaycaster.setFromCamera({ x, y }, composerCamera);
    const intersection = new THREE.Vector3();
    if (composerRaycaster.ray.intersectPlane(composerDragState.plane, intersection)) {
      const localIntersection = composerFrameGroup.worldToLocal(intersection.clone());
      composerDragState.startAssemblyGrabOffset.copy(
        localIntersection.sub(composerDragState.startAssemblyCenter)
      );
    }
  }
  return true;
}

function onComposerPointerDown(event) {
  if (!composerCanvas || !composerCamera || !composerRaycaster) {
    return;
  }
  if (event.button === 2) {
    return;
  }
  closeComposerAssemblyMenu();
  if (composerCameraFlightState.preview) {
    stopComposerCameraFlightPreview();
  }
  composerCanvas.setPointerCapture(event.pointerId);
  const { x, y } = getComposerPointerNdc(event);
  composerRaycaster.setFromCamera({ x, y }, composerCamera);
  const cameraWaypointHits = composerRaycaster.intersectObjects(composerCameraWaypointMeshes, true);
  if (cameraWaypointHits.length) {
    const hitMesh = resolveComposerIndexedHit(
      cameraWaypointHits[0].object,
      "cameraWaypointIndex"
    );
    const waypointIndex = hitMesh?.index;
    if (Number.isInteger(waypointIndex) && composerCameraFlightState.waypoints[waypointIndex]) {
      composerDragState.mode = "camera_waypoint";
      composerDragState.cameraWaypointIndex = waypointIndex;
      composerSelectedCameraWaypointIndex = waypointIndex;
      composerDragState.startX = event.clientX;
      composerDragState.startY = event.clientY;
      composerDragState.startCameraWaypoint.copy(
        composerCameraFlightState.waypoints[waypointIndex].position
      );
      const worldPoint = hitMesh.object.getWorldPosition(new THREE.Vector3());
      const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(
        composerFrameGroup.quaternion
      );
      composerDragState.plane.setFromNormalAndCoplanarPoint(normal, worldPoint);
      updateComposerCameraWaypointMaterials(waypointIndex);
      return;
    }
  }
  const personalityHits = composerRaycaster.intersectObjects(composerPersonalityHandleMeshes, true);
  if (event.button === 0 && personalityHits.length) {
    const personalityHit = resolveComposerPersonalityHandleHit(personalityHits[0].object);
    if (personalityHit?.assemblyId) {
      setComposerSelectedAssembly(personalityHit.assemblyId);
      renderComposerAssemblyEditor();
      renderComposerJsonPreview();
      return;
    }
  }
  const graphicHits = composerRaycaster.intersectObjects(composerGraphicOverlayHandleMeshes, true);
  if (event.button === 0 && graphicHits.length) {
    const graphicHit = resolveComposerGraphicOverlayHit(graphicHits[0].object);
    const overlay = graphicHit?.overlayId ? getComposerGraphicOverlayDraftById(graphicHit.overlayId) : null;
    if (graphicHit?.draggable && overlay) {
      composerDragState.mode = "graphic";
      composerDragState.overlayId = overlay.id;
      composerDragState.startX = event.clientX;
      composerDragState.startY = event.clientY;
      const anchorPosition =
        resolveComposerGraphicTargetPosition(overlay.target, composerAssemblyWorldCenters, composerCurrentDocument) ??
        new THREE.Vector3();
      composerDragState.startGraphicAnchor.copy(anchorPosition);
      composerDragState.startGraphicOffset.copy(vectorFromTriplet(overlay.offset));
      composerDragState.startGraphicCenter.copy(anchorPosition.clone().add(vectorFromTriplet(overlay.offset)));
      const planeNormal = composerCamera.getWorldDirection(new THREE.Vector3()).normalize();
      const worldCenter = composerFrameGroup.localToWorld(composerDragState.startGraphicCenter.clone());
      composerDragState.plane.setFromNormalAndCoplanarPoint(planeNormal, worldCenter);
      return;
    }
  }
  const assemblyHits = composerRaycaster.intersectObjects(composerAssemblyMeshes, true);
  const hits = composerRaycaster.intersectObjects(composerPointMeshes, true);
  const preferredCenterHit = shouldPreferComposerCenterMarker(hits, assemblyHits);
  if (event.button === 0 && preferredCenterHit?.draggable) {
    if (
      startComposerAssemblyDrag(
        preferredCenterHit.assemblyId,
        preferredCenterHit.assemblyIndex,
        preferredCenterHit.object.getWorldPosition(new THREE.Vector3()),
        event
      )
    ) {
      return;
    }
  }
  if (hits.length) {
    const hit = resolveComposerIndexedHit(hits[0].object, "pointIndex");
    if (!hit) {
      return;
    }
    composerDragState.mode = "point";
    composerDragState.pointIndex = hit.index;
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
  const memberHits = composerRaycaster.intersectObjects(composerMemberHandleMeshes, true);
  if (event.button === 0 && memberHits.length) {
    const memberHit = resolveComposerMemberHandleHit(memberHits[0].object);
    if (memberHit?.draggable) {
      const liveAssembly = getComposerAssemblyDraftById(memberHit.assemblyId);
      if (!liveAssembly) {
        return;
      }
      if (isComposerBareArchitrinoAssembly(liveAssembly)) {
        const assemblyIndex = getComposerAssemblyDraftIndexById(memberHit.assemblyId);
        if (
          assemblyIndex >= 0 &&
          startComposerAssemblyDrag(
            memberHit.assemblyId,
            assemblyIndex,
            memberHit.object.getWorldPosition(new THREE.Vector3()),
            event
          )
        ) {
          return;
        }
      }
      setComposerSelectedAssembly(memberHit.assemblyId);
      renderComposerAssemblyEditor();
      composerDragState.mode = "member";
      composerDragState.assemblyId = memberHit.assemblyId;
      composerDragState.memberId = memberHit.memberId;
      composerDragState.subassemblyId = memberHit.subassemblyId ?? "";
      composerDragState.startX = event.clientX;
      composerDragState.startY = event.clientY;
      const assemblyWorldCenter =
        composerAssemblyWorldCenters.get(memberHit.assemblyId) ??
        new THREE.Vector3();
      composerDragState.startMemberAssemblyCenter.copy(
        composerFrameGroup.worldToLocal(assemblyWorldCenter.clone())
      );
      const subassemblyIndex = getComposerAssemblySubassemblyIndex(liveAssembly, composerDragState.subassemblyId);
      const subassemblyPosition =
        subassemblyIndex >= 0
          ? normalizeComposerMemberPosition(liveAssembly.subassemblies?.[subassemblyIndex]?.position) ?? [0, 0, 0]
          : [0, 0, 0];
      composerDragState.startMemberSubassemblyPosition.set(
        Number(subassemblyPosition[0] ?? 0),
        Number(subassemblyPosition[1] ?? 0),
        Number(subassemblyPosition[2] ?? 0)
      );
      const worldPoint = memberHit.object.getWorldPosition(new THREE.Vector3());
      const planeNormal = composerCamera.getWorldDirection(new THREE.Vector3()).normalize();
      composerDragState.plane.setFromNormalAndCoplanarPoint(planeNormal, worldPoint);
      return;
    }
  }
  const subassemblyHits = composerRaycaster.intersectObjects(composerSubassemblyHandleMeshes, true);
  if (event.button === 0 && subassemblyHits.length) {
    const subassemblyHit = resolveComposerSubassemblyHandleHit(subassemblyHits[0].object);
    if (subassemblyHit?.draggable) {
      const liveAssembly = getComposerAssemblyDraftById(subassemblyHit.assemblyId);
      if (!liveAssembly) {
        return;
      }
      setComposerSelectedAssembly(subassemblyHit.assemblyId);
      renderComposerAssemblyEditor();
      composerDragState.mode = "subassembly";
      composerDragState.assemblyId = subassemblyHit.assemblyId;
      composerDragState.subassemblyId = subassemblyHit.subassemblyId;
      composerDragState.startX = event.clientX;
      composerDragState.startY = event.clientY;
      const assemblyWorldCenter =
        composerAssemblyWorldCenters.get(subassemblyHit.assemblyId) ??
        new THREE.Vector3();
      composerDragState.startSubassemblyAssemblyCenter.copy(
        composerFrameGroup.worldToLocal(assemblyWorldCenter.clone())
      );
      const subassemblyIndex = getComposerAssemblySubassemblyIndex(liveAssembly, subassemblyHit.subassemblyId);
      const startPosition =
        subassemblyIndex >= 0
          ? normalizeComposerMemberPosition(liveAssembly.subassemblies?.[subassemblyIndex]?.position) ?? [0, 0, 0]
          : [0, 0, 0];
      composerDragState.startSubassemblyPosition.set(
        Number(startPosition[0] ?? 0),
        Number(startPosition[1] ?? 0),
        Number(startPosition[2] ?? 0)
      );
      const worldPoint = subassemblyHit.object.getWorldPosition(new THREE.Vector3());
      const planeNormal = composerCamera.getWorldDirection(new THREE.Vector3()).normalize();
      composerDragState.plane.setFromNormalAndCoplanarPoint(planeNormal, worldPoint);
      return;
    }
  }
  if (event.button === 0 && assemblyHits.length) {
    const assemblyHit = resolveComposerAssemblyHit(assemblyHits[0].object);
    if (assemblyHit?.draggable) {
      if (
        startComposerAssemblyDrag(
          assemblyHit.assemblyId,
          assemblyHit.assemblyIndex,
          assemblyHit.object.getWorldPosition(new THREE.Vector3()),
          event
        )
      ) {
        return;
      }
    }
  }
  const wantsPan = event.shiftKey;
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

function onComposerContextMenu(event) {
  if (!composerCanvas || !composerCamera || !composerRaycaster) {
    return;
  }
  const { x, y } = getComposerPointerNdc(event);
  composerRaycaster.setFromCamera({ x, y }, composerCamera);
  const personalityHits = composerRaycaster.intersectObjects(composerPersonalityHandleMeshes, true);
  if (personalityHits.length) {
    const personalityHit = resolveComposerPersonalityHandleHit(personalityHits[0].object);
    if (personalityHit?.assemblyId && personalityHit?.memberId) {
      event.preventDefault();
      setComposerSelectedAssembly(personalityHit.assemblyId);
      renderComposerAssemblyEditor();
      renderComposerJsonPreview();
      openComposerPersonalitySlotMenuAt(
        event.clientX,
        event.clientY,
        personalityHit.assemblyId,
        personalityHit.memberId
      );
      return;
    }
  }
  const graphicHits = composerRaycaster.intersectObjects(composerGraphicOverlayHandleMeshes, true);
  if (graphicHits.length) {
    const graphicHit = resolveComposerGraphicOverlayHit(graphicHits[0].object);
    if (graphicHit?.overlayId) {
      event.preventDefault();
      openComposerTimelineMenuAt(event.clientX, event.clientY, {
        graphicId: graphicHit.overlayId,
      });
      return;
    }
  }
  const assemblyHits = composerRaycaster.intersectObjects(composerAssemblyMeshes, true);
  const pointHits = composerRaycaster.intersectObjects(composerPointMeshes, true);
  const preferredCenterHit = shouldPreferComposerCenterMarker(pointHits, assemblyHits);
  if (preferredCenterHit?.assemblyId) {
    setComposerSelectedAssembly(preferredCenterHit.assemblyId);
    renderComposerAssemblyEditor();
    renderComposerJsonPreview();
    openComposerAssemblyPropertiesMenuAt(event.clientX, event.clientY, preferredCenterHit.assemblyId);
    return;
  }
  if (pointHits.length) {
    const pointIndex = resolveComposerIndexedHit(pointHits[0].object, "pointIndex")?.index;
    if (Number.isInteger(pointIndex)) {
      event.preventDefault();
      openComposerPathPointMenuAt(event.clientX, event.clientY, pointIndex);
      return;
    }
  }
  const memberHits = composerRaycaster.intersectObjects(composerMemberHandleMeshes, true);
  if (memberHits.length) {
    const memberHit = resolveComposerMemberHandleHit(memberHits[0].object);
    if (memberHit?.assemblyId && memberHit?.memberId) {
      const liveAssembly = getComposerAssemblyDraftById(memberHit.assemblyId);
      setComposerSelectedAssembly(memberHit.assemblyId);
      renderComposerAssemblyEditor();
      renderComposerJsonPreview();
      if (isComposerBareArchitrinoAssembly(liveAssembly)) {
        openComposerAssemblyPropertiesMenuAt(event.clientX, event.clientY, memberHit.assemblyId);
      } else {
        openComposerMemberMenuAt(event.clientX, event.clientY, memberHit.assemblyId, memberHit.memberId);
      }
      return;
    }
  }
  const subassemblyHits = composerRaycaster.intersectObjects(composerSubassemblyHandleMeshes, true);
  if (subassemblyHits.length) {
    const subassemblyHit = resolveComposerSubassemblyHandleHit(subassemblyHits[0].object);
    if (subassemblyHit?.assemblyId && subassemblyHit?.subassemblyId) {
      setComposerSelectedAssembly(subassemblyHit.assemblyId);
      renderComposerAssemblyEditor();
      renderComposerJsonPreview();
      openComposerSubassemblyMenuAt(
        event.clientX,
        event.clientY,
        subassemblyHit.assemblyId,
        subassemblyHit.subassemblyId
      );
      return;
    }
  }
  if (assemblyHits.length) {
    const assemblyHit = resolveComposerAssemblyHit(assemblyHits[0].object);
    if (assemblyHit?.assemblyId) {
      setComposerSelectedAssembly(assemblyHit.assemblyId);
      renderComposerAssemblyEditor();
      renderComposerJsonPreview();
      openComposerAssemblyPropertiesMenuAt(event.clientX, event.clientY, assemblyHit.assemblyId);
      return;
    }
  }
  openComposerAssemblyTemplateMenuAt(event);
}

function onComposerTimelineContextMenu(event) {
  if (!composerTimelineTrack) {
    return;
  }
  event.preventDefault();
  closeComposerAssemblyMenu();
  const timelineBand = event.target.closest?.(".composer-timeline-band") ?? null;
  const isReactionBand = !!timelineBand?.classList?.contains("is-reaction");
  const isWarpBand = !!timelineBand?.classList?.contains("is-warp");
  const isPauseBand = !!timelineBand?.classList?.contains("is-pause");
  const isOverlayBand =
    !!timelineBand?.classList?.contains("is-graphic") ||
    !!timelineBand?.classList?.contains("is-image") ||
    !!timelineBand?.classList?.contains("is-video");
  openComposerTimelineMenuAt(event.clientX, event.clientY, {
    timeSeconds: getComposerTimelineTimeAtClientX(event.clientX, composerCurrentDocument),
    overlayId: isOverlayBand ? timelineBand?.dataset?.overlayId ?? null : null,
    pauseId: isPauseBand ? timelineBand?.dataset?.pauseId ?? null : null,
    warpId: isWarpBand ? timelineBand?.dataset?.warpId ?? null : null,
    reactionId: isReactionBand ? timelineBand?.dataset?.reactionId ?? null : null,
  });
}

function onComposerTimelineSummaryContextMenu(event) {
  event.preventDefault();
  closeComposerAssemblyMenu();
  openComposerTimelineSummaryMenuAt(event.clientX, event.clientY);
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
      const lift = -dy * 0.01 * getComposerEffectiveFrameScale();
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

  if (composerDragState.mode === "assembly") {
    const assemblyIndex = composerDragState.assemblyIndex;
    if (assemblyIndex == null || !composerAssemblyDrafts[assemblyIndex]) {
      return;
    }
    const { x, y } = getComposerPointerNdc(event);
    composerRaycaster.setFromCamera({ x, y }, composerCamera);
    const intersection = new THREE.Vector3();
    if (composerRaycaster.ray.intersectPlane(composerDragState.plane, intersection)) {
      const liveAssembly = composerAssemblyDrafts[assemblyIndex];
      const localIntersection = composerFrameGroup
        .worldToLocal(intersection.clone())
        .sub(composerDragState.startAssemblyGrabOffset);
      if (Array.isArray(composerDragState.startAssemblyPathPoints) && composerDragState.startAssemblyPathPoints.length) {
        const delta = localIntersection.sub(composerDragState.startAssemblyCenter);
        liveAssembly.pathPoints = composerDragState.startAssemblyPathPoints.map((point) => ([
          Number((point[0] + delta.x).toFixed(3)),
          Number((point[1] + delta.y).toFixed(3)),
          Number((point[2] + delta.z).toFixed(3)),
        ]));
        if (liveAssembly.id === composerSelectedAssemblyId) {
          composerPathState.points = liveAssembly.pathPoints.map((point) => vectorFromTriplet(point));
          rebuildComposerControlPoints();
          updateComposerPathGeometry();
        }
      } else {
        const localPosition = localIntersection.sub(composerDragState.startAssemblyParentCenter);
        liveAssembly.position = [
          Number(localPosition.x.toFixed(3)),
          Number(localPosition.y.toFixed(3)),
          Number(localPosition.z.toFixed(3)),
        ];
      }
      syncComposerAssemblyPositionInputs(liveAssembly.id, liveAssembly.position);
      renderComposerJsonPreview();
    }
    return;
  }

  if (composerDragState.mode === "member") {
    const liveAssembly = getComposerAssemblyDraftById(composerDragState.assemblyId);
    if (!liveAssembly || !composerDragState.memberId) {
      return;
    }
    const { x, y } = getComposerPointerNdc(event);
    composerRaycaster.setFromCamera({ x, y }, composerCamera);
    const intersection = new THREE.Vector3();
    if (composerRaycaster.ray.intersectPlane(composerDragState.plane, intersection)) {
      const localPoint = composerFrameGroup.worldToLocal(intersection.clone());
      const relativeToAssembly = localPoint.sub(composerDragState.startMemberAssemblyCenter);
      const nextLocalPosition = composerDragState.subassemblyId
        ? relativeToAssembly.sub(composerDragState.startMemberSubassemblyPosition)
        : relativeToAssembly;
      if (
        setComposerAssemblyMemberPosition(
          liveAssembly,
          composerDragState.memberId,
          [nextLocalPosition.x, nextLocalPosition.y, nextLocalPosition.z],
          composerDragState.subassemblyId
        )
      ) {
        renderComposerJsonPreview();
      }
    }
    return;
  }

  if (composerDragState.mode === "graphic") {
    const overlay = getComposerGraphicOverlayDraftById(composerDragState.overlayId);
    if (!overlay) {
      return;
    }
    const { x, y } = getComposerPointerNdc(event);
    composerRaycaster.setFromCamera({ x, y }, composerCamera);
    const intersection = new THREE.Vector3();
    if (composerRaycaster.ray.intersectPlane(composerDragState.plane, intersection)) {
      const localPoint = composerFrameGroup.worldToLocal(intersection.clone());
      const nextOffset = localPoint.sub(composerDragState.startGraphicAnchor);
      overlay.offset = [
        Number(nextOffset.x.toFixed(3)),
        Number(nextOffset.y.toFixed(3)),
        Number(nextOffset.z.toFixed(3)),
      ];
      renderComposerJsonPreview();
    }
    return;
  }

  if (composerDragState.mode === "subassembly") {
    const liveAssembly = getComposerAssemblyDraftById(composerDragState.assemblyId);
    if (!liveAssembly || !composerDragState.subassemblyId) {
      return;
    }
    const { x, y } = getComposerPointerNdc(event);
    composerRaycaster.setFromCamera({ x, y }, composerCamera);
    const intersection = new THREE.Vector3();
    if (composerRaycaster.ray.intersectPlane(composerDragState.plane, intersection)) {
      const localPoint = composerFrameGroup.worldToLocal(intersection.clone());
      const nextPosition = localPoint.sub(composerDragState.startSubassemblyAssemblyCenter);
      if (
        setComposerSubassemblyPosition(liveAssembly, composerDragState.subassemblyId, [
          nextPosition.x,
          nextPosition.y,
          nextPosition.z,
        ])
      ) {
        renderComposerJsonPreview();
      }
    }
    return;
  }

  if (composerDragState.mode === "camera_waypoint") {
    const waypointIndex = composerDragState.cameraWaypointIndex;
    if (waypointIndex == null || !composerCameraFlightState.waypoints[waypointIndex]) {
      return;
    }
    const { x, y } = getComposerPointerNdc(event);
    composerRaycaster.setFromCamera({ x, y }, composerCamera);
    const intersection = new THREE.Vector3();
    if (composerRaycaster.ray.intersectPlane(composerDragState.plane, intersection)) {
      const localPoint = composerFrameGroup.worldToLocal(intersection.clone());
      composerCameraFlightState.waypoints[waypointIndex].position.copy(localPoint);
      updateComposerCameraFlightDisplay();
      renderComposerJsonPreview();
    }
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
  if (composerDragState.mode === "camera_waypoint") {
    updateComposerCameraWaypointMaterials(composerSelectedCameraWaypointIndex);
  }
  composerDragState.mode = null;
  composerDragState.pointIndex = null;
  composerDragState.cameraWaypointIndex = null;
  composerDragState.assemblyIndex = null;
  composerDragState.assemblyId = null;
  composerDragState.memberId = null;
  composerDragState.overlayId = null;
  composerDragState.subassemblyId = null;
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
const archieScenePath = "content/scenes/archie/archie.json";
const textbookTocScenePath = "content/scenes/archie/textbook_toc.json";
const composerSceneId = "composer";
const composerPreviewSceneId = "composer_preview";
const composerPreviewScenePath = "__composer_preview__";
const composerDocsPath =
  "content/_meta/ideas/composer.md";
const markdownDocBadgeCharacterThreshold = 512;
const markdownOpenCharacterThreshold = 512;
const markdownGlowByteThreshold = 2048;
const cacheBustToken = Date.now().toString();
let appDirector = null;
const sceneIndexService = new SceneIndexService();
const periodicTableService = new PeriodicTableService();
const searchBackStack = [];
const archieBackStack = [];
const generationBackStack = [];
const browserBackStack = [];
const browserForwardStack = [];
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

const sceneIndexManifestPath = "content/scenes/scenes_index.json";
const authoredMarkdownColumnsByPath = new Map();
let authoredMarkdownColumnsLoadPromise = null;

function normalizeColumnsPath(path) {
  return normalizeMarkdownPath(path);
}

function resolveAuthoredMarkdownPath(entry) {
  if (entry?.source?.type === "markdown" && typeof entry?.source?.path === "string") {
    return entry.source.path;
  }
  return null;
}

function resolveAuthoredMarkdownColumns(entry) {
  if (entry?.view?.columns === 1 || entry?.view?.columns === 2 || entry?.view?.columns === 3) {
    return entry.view.columns;
  }
  return null;
}

function recordAuthoredMarkdownColumns(entry) {
  const markdownPath = resolveAuthoredMarkdownPath(entry);
  const markdownColumns = resolveAuthoredMarkdownColumns(entry);
  if ((markdownColumns === 1 || markdownColumns === 2 || markdownColumns === 3) && markdownPath) {
    authoredMarkdownColumnsByPath.set(normalizeColumnsPath(markdownPath), markdownColumns);
  }
}

async function resolveMarkdownColumnsForPath(markdownPath) {
  const normalizedTargetPath = normalizeColumnsPath(markdownPath);
  if (!normalizedTargetPath) {
    return null;
  }
  if (authoredMarkdownColumnsByPath.has(normalizedTargetPath)) {
    return authoredMarkdownColumnsByPath.get(normalizedTargetPath);
  }
  if (!authoredMarkdownColumnsLoadPromise) {
    authoredMarkdownColumnsLoadPromise = (async () => {
      try {
        const indexResponse = await fetch(appendCacheBust(sceneIndexManifestPath));
        if (!indexResponse.ok) {
          return;
        }
        const indexData = await indexResponse.json();
        const sceneEntries = Array.isArray(indexData?.scenes) ? indexData.scenes : [];
        for (const entry of sceneEntries) {
          const scenePath =
            typeof entry?.path === "string" && entry.path.trim().length
              ? entry.path.trim()
              : null;
          if (!scenePath) {
            continue;
          }
          try {
            const sceneResponse = await fetch(appendCacheBust(scenePath));
            if (!sceneResponse.ok) {
              continue;
            }
            const sceneData = await sceneResponse.json();
            recordAuthoredMarkdownColumns(sceneData?.scene);
            const objects = Array.isArray(sceneData?.objects) ? sceneData.objects : [];
            for (const obj of objects) {
              recordAuthoredMarkdownColumns(obj);
            }
          } catch (_error) {
            // Skip malformed or unavailable scene files while building the optional restore map.
          }
        }
      } catch (_error) {
        // Best-effort lookup only; fall back to default restoration rules on failure.
      }
    })();
  }
  await authoredMarkdownColumnsLoadPromise;
  return authoredMarkdownColumnsByPath.has(normalizedTargetPath)
    ? authoredMarkdownColumnsByPath.get(normalizedTargetPath)
    : null;
}

const markdownSceneRegistry = createMarkdownSceneRegistry({
  levelConfigs,
  titleFromSlug,
  resolveMarkdownDocumentTitle,
  resolveMarkdownColumnsForPath,
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
  ownerAssemblyId: null,
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
let composerAssemblyDrafts = [];
let composerGraphicOverlayDrafts = [];
let composerSelectedPointIndex = null;
let composerSelectedCameraWaypointIndex = null;
let composerSelectedAssemblyId = null;
let composerTransferListRawState = "";
let composerReactionListRawState = "";
let composerPendingTransferSource = null;
const composerAssemblyPositionInputs = new Map();
const composerDragState = {
  mode: null,
  button: 0,
  pointIndex: null,
  cameraWaypointIndex: null,
  assemblyIndex: null,
  assemblyId: null,
  memberId: null,
  subassemblyId: null,
  overlayId: null,
  startX: 0,
  startY: 0,
  startPoint: new THREE.Vector3(),
  startCameraWaypoint: new THREE.Vector3(),
  startAssemblyPosition: new THREE.Vector3(),
  startAssemblyParentCenter: new THREE.Vector3(),
  startAssemblyCenter: new THREE.Vector3(),
  startAssemblyGrabOffset: new THREE.Vector3(),
  startMemberAssemblyCenter: new THREE.Vector3(),
  startMemberSubassemblyPosition: new THREE.Vector3(),
  startSubassemblyAssemblyCenter: new THREE.Vector3(),
  startSubassemblyPosition: new THREE.Vector3(),
  startGraphicAnchor: new THREE.Vector3(),
  startGraphicOffset: new THREE.Vector3(),
  startGraphicCenter: new THREE.Vector3(),
  startAssemblyPathPoints: [],
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
let composerViewportGroup = null;
let composerPathLine = null;
let composerPathGeometry = null;
let composerBackgroundPathLines = [];
let composerBackgroundPathMarkers = [];
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
let composerAssemblyMeshes = [];
let composerMemberHandleMeshes = [];
let composerPersonalityHandleMeshes = [];
let composerSubassemblyHandleMeshes = [];
let composerAssemblyWorldCenters = new Map();
let composerShellMeshes = [];
let composerEnvelopeMeshes = [];
let composerOrbitTraceLines = [];
let composerHistoryTraceLines = [];
let composerTransferLines = [];
let composerAxisGuideLines = [];
let composerOrbitParticleMeshes = [];
let composerMemberAnchors = new Map();
let composerMemberLabelSprites = [];
let composerGraphicOverlayGroups = [];
let composerGraphicOverlayHandleMeshes = [];
let composerViewportMediaOverlayElements = new Map();
let composerDocumentCameraPathLine = null;
let composerDocumentCameraWaypointMeshes = [];
let composerDocumentCameraShotMesh = null;
let composerDocumentCameraTargetMesh = null;
let composerDocumentCameraLookLine = null;
let composerCurrentDocument = null;
const composerViewportDisplayState = {
  showTransportPath: true,
  showCameraGuides: true,
  showLabels: true,
  showHistoryTraces: true,
  showEnvelopes: true,
};
const composerPlaybackState = {
  playing: false,
  playheadSeconds: 0,
  pauseRemaining: 0,
  lastTickMs: 0,
};

const levels = new Map();
const navigationStack = [];
let currentLevel = null;
let textbookTocReturnState = null;
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
  detailPanel.classList.remove("is-element-info");
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
  return zoomToastDismissedForSession;
}

function setZoomToastDismissed() {
  zoomToastDismissedForSession = true;
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
  }, 12000);
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
  appendCacheBust,
  navigateToTarget: async (target) => {
    if (!target || !appDirector) {
      return;
    }
    await appDirector.navigateTo(target);
  },
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
  detailPanel.classList.remove("is-element-info");
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

if (hydePeriodicArtwork) {
  hydePeriodicArtwork.src = appendCacheBust("content/assets/hyde_periodic_table.svg");
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
  normalizeMarkdownKey,
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
  buildAutoMarkdownNodes,
  resolveMarkdownFileSize,
  resolveMarkdownFileCharacterCount,
  markdownDocBadgeMinChars: markdownDocBadgeCharacterThreshold,
  markdownOpenMinChars: markdownOpenCharacterThreshold,
  markdownGlowMinBytes: markdownGlowByteThreshold,
});
const sceneBootstrapService = createSceneBootstrapService({
  levelConfigs,
  sceneRepository,
  markdownSceneRegistry,
  rootScenePath,
});

function cloneNavigationStackEntries(entries) {
  if (!Array.isArray(entries)) {
    return [];
  }
  return entries
    .filter((entry) => entry && entry.levelId && entry.focusNodeId)
    .map((entry) => ({
      levelId: entry.levelId,
      focusNodeId: entry.focusNodeId,
    }));
}

function captureCurrentHistoryEntry() {
  if (!currentLevel?.id) {
    return null;
  }
  return {
    levelId: currentLevel.id,
    navigationStack: cloneNavigationStackEntries(navigationStack),
  };
}

function areNavigationStacksEqual(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i += 1) {
    const left = a[i];
    const right = b[i];
    if (!left || !right) {
      return false;
    }
    if (left.levelId !== right.levelId || left.focusNodeId !== right.focusNodeId) {
      return false;
    }
  }
  return true;
}

function pushBrowserHistoryEntry(stack, entry) {
  if (!Array.isArray(stack) || !entry?.levelId) {
    return;
  }
  const normalizedEntry = {
    levelId: entry.levelId,
    navigationStack: cloneNavigationStackEntries(entry.navigationStack),
  };
  const lastEntry = stack[stack.length - 1];
  if (
    lastEntry &&
    lastEntry.levelId === normalizedEntry.levelId &&
    areNavigationStacksEqual(lastEntry.navigationStack, normalizedEntry.navigationStack)
  ) {
    return;
  }
  stack.push(normalizedEntry);
}

function recordBrowserBackHistory(options = {}) {
  if (options.historyTraversal) {
    return;
  }
  const entry = captureCurrentHistoryEntry();
  if (!entry) {
    return;
  }
  pushBrowserHistoryEntry(browserBackStack, entry);
  browserForwardStack.length = 0;
}

async function resetToRootScene(options = {}) {
  if (transitionState.active) {
    return;
  }
  recordBrowserBackHistory(options);
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
  if (!options.historyTraversal) {
    browserForwardStack.length = 0;
  }
  labelFadeState.active = true;
  labelFadeState.level = currentLevel;
  labelFadeState.startTime = performance.now();
  updateCamera();
  fitCameraToLevel(currentLevel);
  updateSceneLabel();
  updateSceneMarkdown();
  showZoomToastIfNeeded();
}

async function jumpToScene(scenePath, options = {}) {
  if (transitionState.active) {
    return;
  }
  if (scenePath !== currentLevel?.id) {
    recordBrowserBackHistory(options);
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

  const preserveFixedEndpointRadius =
    useRingsAutoSizing &&
    nodes.length === 1 &&
    (level.sceneId === "electrino" || level.sceneId === "positrino");
  if (preserveFixedEndpointRadius) {
    nodes.forEach((node) => {
      node.group.scale.setScalar(1);
      node.baseScale = 1;
      if (node.data) {
        node.data.baseScale = 1;
        if (typeof node.data.baseRadius === "number") {
          node.data.radius = node.data.baseRadius;
        }
      }
      node.group.position.set(0, 0, node.group.position.z);
      node.basePosition = node.group.position.clone();
    });
    return;
  }

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
  if (typeof level.layoutType === "string" && level.layoutType.trim()) {
    return level.layoutType.toLowerCase();
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
  const marginFactor = 1.0;
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
  const centerBoundsCache = new Map();

  const pointBounds = (x = 0, y = 0, z = 0) => ({
    minX: x,
    maxX: x,
    minY: y,
    maxY: y,
    minZ: z,
    maxZ: z,
  });

  const getOrbitCenterNode = (orbitCenter) =>
    level.nodeByName.get(orbitCenter) ?? level.nodeById.get(orbitCenter) ?? null;

  const getNodeCenterBounds = (node, visiting = new Set()) => {
    if (!node) {
      return pointBounds(0, 0, 0);
    }
    if (centerBoundsCache.has(node)) {
      return centerBoundsCache.get(node);
    }

    if (visiting.has(node)) {
      const pos = node.group?.position ?? new THREE.Vector3();
      return pointBounds(pos.x, pos.y, pos.z);
    }
    visiting.add(node);

    let bounds;
    if (node.data.orbit) {
      const orbit = node.data.orbit;
      const orbitRadiusX = Math.abs(Number(orbit.radius) || 0);
      const rawYScale = orbit.shape === "ellipsoid" ? orbit.yScale ?? 0.85 : 1;
      const yScale = Number.isFinite(rawYScale) ? Math.abs(rawYScale) : 1;
      const orbitRadiusY = orbitRadiusX * yScale;
      const centerNode = getOrbitCenterNode(orbit.center);

      let centerBounds;
      if (centerNode) {
        centerBounds = getNodeCenterBounds(centerNode, visiting);
      } else if (Array.isArray(orbit.center)) {
        centerBounds = pointBounds(
          orbit.center[0] ?? 0,
          orbit.center[1] ?? 0,
          orbit.center[2] ?? 0
        );
      } else {
        const pos = node.group?.position ?? new THREE.Vector3();
        centerBounds = pointBounds(pos.x, pos.y, pos.z);
      }

      bounds = {
        minX: centerBounds.minX - orbitRadiusX,
        maxX: centerBounds.maxX + orbitRadiusX,
        minY: centerBounds.minY - orbitRadiusY,
        maxY: centerBounds.maxY + orbitRadiusY,
        minZ: centerBounds.minZ,
        maxZ: centerBounds.maxZ,
      };
    } else {
      const pos = node.group?.position ?? new THREE.Vector3();
      bounds = pointBounds(pos.x, pos.y, pos.z);
    }

    visiting.delete(node);
    centerBoundsCache.set(node, bounds);
    return bounds;
  };

  level.nodes.forEach((node) => {
    if (node.data?.excludeFromBounds) {
      return;
    }
    const radius = getNodeBoundsRadius(node);
    const centerBounds = getNodeCenterBounds(node);
    min.x = Math.min(min.x, centerBounds.minX - radius);
    max.x = Math.max(max.x, centerBounds.maxX + radius);
    min.y = Math.min(min.y, centerBounds.minY - radius);
    max.y = Math.max(max.y, centerBounds.maxY + radius);
    min.z = Math.min(min.z, centerBounds.minZ - radius);
    max.z = Math.max(max.z, centerBounds.maxZ + radius);
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

function beginLevelTransition(targetNode, childLevelId, options = {}) {
  if (transitionState.active) {
    return;
  }
  if (!childLevelId) {
    return;
  }
  recordBrowserBackHistory(options);

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
  const childLevelId = targetNode.data.childScene;
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
    const childLevelId = candidate.node.data.childScene;
    if (childLevelId) {
      autoWarpThresholds.lastAt = now;
      startLevelTransitionFromNode(candidate.node);
    }
  }
}

function updateNavButton() {
  if (transitionState.active) {
    if (navUpButton) {
      navUpButton.disabled = true;
    }
    if (navForwardButton) {
      navForwardButton.disabled = true;
    }
    if (detailInfoButton) {
      detailInfoButton.disabled = true;
    }
    updateDocButton();
    return;
  }
  if (navUpButton) {
    navUpButton.disabled = browserBackStack.length === 0;
  }
  if (navForwardButton) {
    navForwardButton.disabled = browserForwardStack.length === 0;
  }
  if (sceneLabel) {
    const canReopenInfo = isElementSceneLevel();
    sceneLabel.classList.toggle("is-info-trigger", canReopenInfo);
    if (canReopenInfo) {
      sceneLabel.setAttribute("role", "button");
      sceneLabel.setAttribute("tabindex", "0");
      sceneLabel.setAttribute("aria-label", "Reopen element info panel");
    } else {
      sceneLabel.removeAttribute("role");
      sceneLabel.removeAttribute("tabindex");
      sceneLabel.removeAttribute("aria-label");
    }
  }
  if (detailInfoButton) {
    detailInfoButton.disabled = !isElementSceneLevel();
  }
  updateDocButton();
}

const periodicOverlayRuntime = createPeriodicOverlayRuntime({
  periodicOverlay,
  periodicGrid,
  periodicLegend,
  hydePeriodicOverlay,
  hydePeriodicGrid,
  hydePeriodicLegend,
  periodicSceneId: "periodic_table",
  hydePeriodicSceneId: "hyde_periodic_table",
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
  showHoverTooltip,
  hideHoverTooltip,
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
    elementNavigationState.rowColumnsByY.clear();
    elementNavigationState.columnRowsByX.clear();
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
    cell.classList.remove("is-neighbor-up");
    cell.classList.remove("is-neighbor-down");
    cell.classList.remove("is-neighbor-left");
    cell.classList.remove("is-neighbor-right");
    cell.replaceChildren();
  });
}

function addElementNavigationMiniDirectionIndicator(cell, direction) {
  if (!(cell instanceof HTMLElement) || !direction) {
    return;
  }
  const directionClass = `is-neighbor-${direction}`;
  cell.classList.add("is-neighbor", directionClass);
  if (cell.querySelector(`.element-nav-mini-indicator.dir-${direction}`)) {
    return;
  }
  const indicator = document.createElement("span");
  indicator.className = `element-nav-mini-indicator dir-${direction}`;
  indicator.setAttribute("aria-hidden", "true");
  cell.appendChild(indicator);
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
      addElementNavigationMiniDirectionIndicator(targetCell, direction);
    }
  });
}

function resolveNearestMiniCellSymbolFromPoint(clientX, clientY) {
  if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) {
    return null;
  }
  let nearestSymbol = null;
  let nearestDistanceSq = Number.POSITIVE_INFINITY;
  elementNavigationState.miniCellBySymbol.forEach((cell, symbol) => {
    if (!(cell instanceof HTMLElement)) {
      return;
    }
    const rect = cell.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) {
      return;
    }
    const centerX = rect.left + rect.width * 0.5;
    const centerY = rect.top + rect.height * 0.5;
    const dx = centerX - clientX;
    const dy = centerY - clientY;
    const distanceSq = dx * dx + dy * dy;
    if (distanceSq < nearestDistanceSq) {
      nearestDistanceSq = distanceSq;
      nearestSymbol = symbol;
    }
  });
  return nearestSymbol;
}

async function navigateToElementSymbol(targetSymbol) {
  if (
    !targetSymbol ||
    transitionState.active ||
    elementNavigationState.navigationInFlight === true ||
    !isElementSceneLevel()
  ) {
    return false;
  }
  elementNavigationState.navigationInFlight = true;
  updateElementNavigationUi();
  try {
    const ready = await ensureElementNavigationData();
    if (!ready || transitionState.active || !isElementSceneLevel()) {
      return false;
    }
    const normalizedSymbol = normalizeElementSymbol(targetSymbol);
    const targetPath = elementNavigationState.scenePathBySymbol.get(normalizedSymbol);
    if (!targetPath || targetPath === currentLevel?.id) {
      return false;
    }
    closeDetailPanel();
    hideHoverTooltip();
    await jumpToScene(targetPath, { mode: "jump" });
    return true;
  } finally {
    elementNavigationState.navigationInFlight = false;
    updateElementNavigationUi();
  }
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
  if (!ready || transitionState.active || !isElementSceneLevel()) {
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
  return await navigateToElementSymbol(targetSymbol);
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

  if (elementNavMini) {
    elementNavMini.addEventListener("click", async (event) => {
      if (!isElementSceneLevel() || transitionState.active) {
        return;
      }
      const targetSymbol = resolveNearestMiniCellSymbolFromPoint(
        event.clientX,
        event.clientY
      );
      if (!targetSymbol) {
        return;
      }
      await navigateToElementSymbol(targetSymbol);
    });
  }

  window.addEventListener("keydown", async (event) => {
    if (
      event.code === "Space" &&
      composerOverlay?.classList.contains("is-open") &&
      !event.defaultPrevented &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !isEditingTextInput(event.target)
    ) {
      toggleComposerPlayback();
      event.preventDefault();
      return;
    }

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
  const isTextbookToc = currentLevel?.id === textbookTocScenePath;
  docButton.classList.remove("is-hidden");
  docButton.classList.toggle("is-active", isTextbookToc);
  docButton.setAttribute(
    "aria-label",
    isTextbookToc ? "Return from textbook TOC" : "Open textbook TOC"
  );
  docButton.setAttribute("aria-pressed", String(isTextbookToc));
  docButton.disabled = transitionState.active || !currentLevel;
}

function updateArchieButton() {
  const button = document.getElementById("archie-button");
  if (!button) {
    return;
  }
  const isArchie = currentLevel?.id === archieScenePath;
  button.classList.toggle("is-active", isArchie);
  button.setAttribute("aria-pressed", String(isArchie));
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
  readComposerDraftState,
  buildComposerSceneDocument: buildComposerDocumentData,
  buildComposerPreviewSceneData: buildComposerPreviewData,
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
  const hasSection = typeof currentLevel?.markdownSection === "string"
    ? currentLevel.markdownSection.trim().length > 0
    : !!currentLevel?.markdownSection;
  const showDocButton = hasDoc && hasSection;
  markdownDocButton.classList.toggle("is-hidden", !showDocButton);
  markdownDocButton.disabled = !showDocButton;
}

function updateMarkdownLayoutToggleButton() {
  if (!markdownLayoutToggle) {
    return;
  }
  const hasDoc = !!currentLevel?.markdownPath;
  markdownLayoutToggle.classList.toggle("is-hidden", !hasDoc);
  markdownLayoutToggle.disabled = !hasDoc;
}

function updateSceneLabel() {
  sceneStateHashService.syncSceneHash(currentLevel?.id ?? null);
  if (!sceneLabel) {
    return;
  }
  sceneLabel.textContent = currentLevel?.name ?? "";
  updateDocButton();
  updateArchieButton();
  updateMarkdownLayoutToggleButton();
  updateMarkdownDocButton();
  composerUiRuntime.updateComposerOverlay(currentLevel);
  periodicOverlayRuntime.updatePeriodicOverlay();
  periodicOverlayRuntime.updateElementLegend();
  periodicOverlayRuntime.updateElementInfoPanel();
  updateElementNavigationUi();
}

function openArchieRing() {
  if (transitionState.active) {
    return;
  }
  if (currentLevel?.id === archieScenePath) {
    const backState = archieBackStack.pop();
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
    archieBackStack.push({
      levelId: currentLevel.id,
      navigationStack: navigationStack.map((entry) => ({
        levelId: entry.levelId,
        focusNodeId: entry.focusNodeId,
      })),
    });
  }
  jumpToScene(archieScenePath, { mode: "jump", startScale: 0.7, duration: 760 });
}

function toggleTextbookToc() {
  if (transitionState.active || !currentLevel) {
    return;
  }
  if (currentLevel.id === textbookTocScenePath) {
    const backState = textbookTocReturnState;
    textbookTocReturnState = null;
    if (backState?.levelId) {
      jumpToScene(backState.levelId, {
        restoreNavStack: backState.navigationStack,
      });
    }
    return;
  }
  textbookTocReturnState = {
    levelId: currentLevel.id,
    navigationStack: navigationStack.map((entry) => ({
      levelId: entry.levelId,
      focusNodeId: entry.focusNodeId,
    })),
  };
  jumpToScene(textbookTocScenePath, { mode: "jump", startScale: 0.7, duration: 760 });
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
  toggleTextbookToc,
});
const composerControlsUiRuntime = createComposerControlsUiRuntime({
  composerTabs,
  composerClearButton,
  composerDocsButton,
  composerExitButton,
  composerPreviewButton,
  composerExportButton,
  composerLibrarySaveButton,
  composerRepoSaveButton,
  composerLibrarySelect,
  composerLibraryLoadButton,
  composerLibraryDeleteButton,
  composerPlayToggleButton,
  composerPlayResetButton,
  composerMarkerPrevButton,
  composerMarkerNextButton,
  composerMarkerJumpSelect,
  composerPlayheadScrubInput,
  composerTimelineTrack,
  composerSceneIdInput,
  composerSceneNameInput,
  composerPathModeSelect,
  composerPathResetButton,
  composerFrameResetButton,
  composerFrameScaleInput,
  composerCameraPoiSelect,
  composerCameraWaypointAdd,
  composerCameraWaypointClear,
  composerCameraFlightToggle,
  composerSceneDurationInput,
  composerSceneLoopInput,
  composerMarkerListInput,
  composerPauseListInput,
  composerWarpListInput,
  composerTransferListInput,
  composerReactionListInput,
  composerCameraSpeedInput,
  composerCameraRadiusInput,
  composerCameraResetButton,
  composerUiRuntime,
  navUpButton,
  composerPathState,
  composerCameraFlightState,
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
  updateComposerCameraPoiStatus,
  persistComposerPathStateToSelectedAssembly,
  toggleComposerPlayback,
  restartComposerPlayback,
  jumpToComposerMarker,
  jumpComposerMarkerByOffset,
  scrubComposerPlayback,
  renderComposerJsonPreview,
  clearComposerScene,
  saveComposerSceneToLibrary,
  loadComposerSceneFromLibrary,
  deleteComposerSceneFromLibrary,
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

  const hasMarkdownTarget =
    typeof targetNode?.data?.markdownPath === "string" &&
    targetNode.data.markdownPath.trim().length > 0;
  const canOpenMarkdown =
    hasMarkdownTarget && targetNode.data.markdownOpenEligible === true;

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
    typeof targetNode.data.childScene === "string" &&
    !markdownSceneRegistry.isRuntimeMarkdownTarget(targetNode.data.childScene);

  if (hasExplicitChildScene) {
    closeDetailPanel();
    hideHoverTooltip();
    startLevelTransitionFromNode(targetNode);
  } else if (canOpenMarkdown) {
    closeDetailPanel();
    hideHoverTooltip();
    const hasSectionTarget =
      typeof targetNode.data.markdownSection === "string" &&
      targetNode.data.markdownSection.trim().length > 0;
    const readerSceneId = hasSectionTarget
      ? markdownSceneRegistry.ensureMarkdownReaderScene(targetNode.data)
      : markdownSceneRegistry.ensureMarkdownDocScene(targetNode.data);
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
  window.openArchieRing = openArchieRing;
}

appDirector = new AppDirector({
  initialize: init,
  jumpToScene,
  resetToRootScene,
  startLevelTransitionOut,
  captureHistoryEntry: captureCurrentHistoryEntry,
  popHistoryBackEntry: () => browserBackStack.pop() ?? null,
  popHistoryForwardEntry: () => browserForwardStack.pop() ?? null,
  pushHistoryBackEntry: (entry) => {
    pushBrowserHistoryEntry(browserBackStack, entry);
  },
  pushHistoryForwardEntry: (entry) => {
    pushBrowserHistoryEntry(browserForwardStack, entry);
  },
  getTransitionState: () => transitionState,
  getNavigationStack: () => navigationStack,
  getSearchBackStack: () => searchBackStack,
  getArchieBackStack: () => archieBackStack,
  getGenerationBackStack: () => generationBackStack,
});
const appShellUiRuntime = createAppShellUiRuntime({
  canvas,
  interactionRuntime,
  onResize,
  hideHoverTooltip,
  sceneLabel,
  navUpButton,
  navForwardButton,
  detailInfoButton,
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
