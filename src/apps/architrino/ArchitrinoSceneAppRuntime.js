import * as THREE from "../../../vendor/three/three.module.js";
import { CSS2DRenderer, CSS2DObject } from "../../../vendor/three/CSS2DRenderer.js";
import { AppDirector } from "../../director/AppDirector.js";
import { createLevelRuntime } from "../../runtime/LevelRuntime.js";
import { createMarkdownRuntime } from "../../runtime/MarkdownRuntime.js";
import { createNodeFactory } from "../../runtime/NodeFactoryRuntime.js";
import {
  clampPdgviewTimelineSpan,
  PDGVIEW_TIMELINE_MIN_DURATION_SECONDS as pdgviewTimelineMinDurationSeconds,
  getPdgviewSceneTimeWindow,
  getPdgviewTimelineFraction,
  getPdgviewTimelineTimeAtClientX as getPdgviewTimelineTimeAtClientXRuntime,
} from "../../runtime/PdgviewTimelineRuntime.js";
import {
  pdgviewAssemblyTemplateMenuRows,
  pdgviewTimelineAddTypeEntries,
  pdgviewTimelineAddTypeIds,
  generationTransitions,
} from "../../runtime/PdgviewCatalogRuntime.js";
import {
  encodePdgviewGraphicTargetValue,
  getPdgviewGraphicOverlayLabel,
  getPdgviewMediaDefaultRect,
  getPdgviewMediaOverlayLabel,
  getPdgviewOverlayKind,
} from "../../runtime/PdgviewOverlayRuntime.js";
import {
  buildPdgviewJsonPreviewMenu,
  buildPdgviewLibraryMenu,
  buildPdgviewSceneMenu,
  buildPdgviewTimelineSummaryMenu,
} from "../../runtime/PdgviewSceneMenuRuntime.js";
import { buildPdgviewTimelineMenu } from "../../runtime/PdgviewTimelineMenuRuntime.js";
import {
  openPdgviewAssemblyPropertiesMenu,
  openPdgviewAssemblyTemplateMenu,
  openPdgviewMemberMenu,
  openPdgviewPathPointMenu,
  openPdgviewPersonalitySlotMenu,
  openPdgviewSubassemblyMenu,
} from "../../runtime/PdgviewCanvasMenuRuntime.js";
import { createBuiltInPdgviewAssemblyDraftRuntime } from "../../runtime/PdgviewAssemblyFactoryRuntime.js";
import {
  buildPdgviewAssemblyStructure,
  formatPdgviewAssemblyStructureSummary,
  summarizePdgviewAssemblyStructure,
} from "../../runtime/PdgviewAssemblyStructureBridgeRuntime.js";
import { splitPdgviewAssemblyGroup as splitPdgviewAssemblyGroupRuntime } from "../../runtime/PdgviewAssemblyStructureMutationRuntime.js";
import { createInteractionRuntime } from "../../runtime/InteractionRuntime.js";
import { createPeriodicOverlayRuntime } from "../../runtime/PeriodicOverlayRuntime.js";
import { createSceneSearchRuntime } from "../../runtime/SceneSearchRuntime.js";
import { createElementNavigationChromeRuntime } from "../../runtime/ElementNavigationChromeRuntime.js";
import { createElementNavigationRuntime } from "../../runtime/ElementNavigationRuntime.js";
import { createSceneSearchUiRuntime } from "../../runtime/SceneSearchUiRuntime.js";
import { createScenePanelUiRuntime } from "../../runtime/ScenePanelUiRuntime.js";
import { createAppShellUiRuntime } from "../../runtime/AppShellUiRuntime.js";
import { createAppSceneChromeRuntime } from "../../runtime/AppSceneChromeRuntime.js";
import { wirePdgviewCanvasUiListeners } from "../../runtime/PdgviewCanvasUiRuntime.js";
import {
  computePdgviewViewportAutoscaleCameraState,
  getPdgviewActiveCameraShot,
  getPdgviewActiveCameraPathId,
  getPdgviewViewportAutoscaleTargetIds,
  resolvePdgviewShotInterval,
  resolvePdgviewViewportFramingState,
} from "../../runtime/PdgviewViewportFramingRuntime.js";
import { createSceneGraphRuntime } from "../../runtime/SceneGraphRuntime.js";
import { createTransitionEngine } from "../../runtime/TransitionEngine.js";
import { SceneRepository } from "../../services/SceneRepository.js";
import { SceneIndexService } from "../../services/SceneIndexService.js";
import { PeriodicTableService } from "../../services/PeriodicTableService.js";
import {
  compactMarkdownNodeLabel,
  createMarkdownDocumentTitleResolver,
  extractMarkdownDocumentTitle,
  stripWalkthroughStepPrefix,
  titleFromSlug,
} from "../../services/MarkdownNamingService.js";
import {
  extractMarkdownSection,
  normalizeMarkdownKey,
  normalizeMarkdownPath,
  parseMarkdownHeading,
} from "../../services/MarkdownPolicyService.js";
import { createMarkdownManifestService } from "../../services/MarkdownManifestService.js";
import { createMarkdownSceneRegistry } from "../../services/MarkdownSceneRegistryService.js";
import { createMarkdownNodeBuilder } from "../../services/MarkdownNodeBuilder.js";
import { createSceneGraphManifestService } from "../../services/SceneGraphManifestService.js";
import { createSceneStateHashService } from "../../services/SceneStateHashService.js";
import { createSceneBootstrapService } from "../../services/SceneBootstrapService.js";
import { createSceneSearchCoordinatorService } from "../../services/SceneSearchCoordinatorService.js";
import {
  isAtomContextScene,
  isAtomicParticleFocusTarget,
  isHydePeriodicTableScene,
  isStandardModelScene,
} from "../../services/SceneCapabilitiesService.js";
import { resolveStandaloneAppHrefForScene } from "../navigator/StandaloneAppLaunchRuntime.js";
import {
  PDGVIEW_SCENE_PATH,
  STANDALONE_PDGVIEW_NAVIGATOR_HREF,
  createPdgviewAppRuntime,
  createPdgviewAppStore,
  getPdgviewAppMode,
  getPdgviewInitialScenePath,
  isStandalonePdgviewAppMode,
  navigateStandalonePdgviewHome,
} from "../pdgview/PdgviewAppModeRuntime.js";
import {
  PDGVIEW_MEDIA_ASSET_DIRECTORIES as pdgviewMediaAssetDirectories,
  PDGVIEW_SUPPORTED_MEDIA_EXTENSIONS as pdgviewSupportedMediaExtensions,
  DEFAULT_PDGVIEW_ROOT_LAYOUT_MARGIN_PX as defaultRootLayoutMarginPx,
  getPdgviewDomElements,
} from "../pdgview/PdgviewDomRuntime.js";
import {
  createPdgviewDefaultCoreSpec,
  createPdgviewDefaultPathPoints,
  createDefaultPdgviewAssemblyDraft,
  sanitizePdgviewEntityId,
  sanitizePdgviewId,
} from "../pdgview/PdgviewDraftScaffoldRuntime.js";
import {
  formatPdgviewMemberList,
  formatPdgviewSubassemblyList,
  getPdgviewMemberId,
  getPdgviewMemberPosition,
  getPdgviewMemberState,
  getPdgviewSubassemblyId,
  isPdgviewPersonalityMember,
  normalizePdgviewMemberList,
  normalizePdgviewMemberPosition,
  normalizePdgviewSubassemblyList,
  parsePdgviewMemberEntry,
  prunePdgviewSubassemblyList,
  roundPdgviewTriplet,
} from "../pdgview/PdgviewAssemblyListRuntime.js";
import {
  createPdgviewGenIFermionPersonalityMembers,
  createPdgviewPersonalityMembers,
  describePdgviewTransferProvenance,
  formatPdgviewTransferEndpointLabel,
  formatPdgviewTransferList,
  getPdgviewBuiltInPersonalityStates,
  getPdgviewGraphicDefaultOffset,
  sanitizePdgviewGraphicTarget,
} from "../pdgview/PdgviewAuthoringHelpersRuntime.js";
import { createPdgviewAssemblyAuthoringRuntime } from "../pdgview/PdgviewAssemblyAuthoringRuntime.js";
import { createPdgviewAssemblyInspectorRuntime } from "../pdgview/PdgviewAssemblyInspectorRuntime.js";
import { createPdgviewAssemblyLabelRuntime } from "../pdgview/PdgviewAssemblyLabelRuntime.js";
import { createPdgviewAuthoringStateRuntime } from "../pdgview/PdgviewAuthoringStateRuntime.js";
import { createPdgviewCanvasBootstrapRuntime } from "../pdgview/PdgviewCanvasBootstrapRuntime.js";
import { createPdgviewCameraPathRuntime } from "../pdgview/PdgviewCameraPathRuntime.js";
import { createPdgviewDraftStateRuntime } from "../pdgview/PdgviewDraftStateRuntime.js";
import { createPdgviewPlaybackTimelineRuntime } from "../pdgview/PdgviewPlaybackTimelineRuntime.js";
import { createPdgviewPointerHitRuntime } from "../pdgview/PdgviewPointerHitRuntime.js";
import { createPdgviewPointerInteractionRuntime } from "../pdgview/PdgviewPointerInteractionRuntime.js";
import { createPdgviewRenderAssetsRuntime } from "../pdgview/PdgviewRenderAssetsRuntime.js";
import { createPdgviewStructureGeometryRuntime } from "../pdgview/PdgviewStructureGeometryRuntime.js";
import { createPdgviewTimelineOverlayRuntime } from "../pdgview/PdgviewTimelineOverlayRuntime.js";
import { createPdgviewDocumentWorkspaceRuntime } from "../pdgview/PdgviewDocumentWorkspaceRuntime.js";
import { createPdgviewViewportDisplayRuntime } from "../pdgview/PdgviewViewportDisplayRuntime.js";
import { createPdgviewViewportOverlayPillRuntime } from "../pdgview/PdgviewViewportOverlayPillRuntime.js";
import { createPdgviewViewportRenderRuntime } from "../pdgview/PdgviewViewportRenderRuntime.js";

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
const archieButton = document.getElementById("archie-button");
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
const {
  pdgviewOverlay,
  pdgviewViewDesignButton,
  pdgviewViewAuthoredButton,
  pdgviewSceneButton,
  pdgviewClearButton,
  pdgviewSaveButton,
  pdgviewDocsButton,
  pdgviewExitButton,
  pdgviewTabs,
  pdgviewPanels,
  pdgviewSceneIdInput,
  pdgviewSceneNameInput,
  pdgviewAssemblyList,
  pdgviewAssemblyDetail,
  pdgviewAssemblyAddButton,
  pdgviewPreviewButton,
  pdgviewExportButton,
  pdgviewLibrarySaveButton,
  pdgviewRepoSaveButton,
  pdgviewLibrarySelect,
  pdgviewLibraryLoadButton,
  pdgviewLibraryDeleteButton,
  pdgviewLibraryStatus,
  pdgviewPlayToggleButton,
  pdgviewPlayResetButton,
  pdgviewMarkerPrevButton,
  pdgviewMarkerNextButton,
  pdgviewMarkerJumpSelect,
  pdgviewPlayheadScrubInput,
  pdgviewStatus,
  pdgviewJsonPreview,
  pdgviewCanvas,
  pdgviewCanvasWrap,
  pdgviewViewportOverlays,
  pdgviewAssemblyMenu,
  pdgviewHudLabelsToggle,
  pdgviewHudPathsToggle,
  pdgviewHudHistoryToggle,
  pdgviewHudEnvelopesToggle,
  pdgviewHudCameraGuidesToggle,
  pdgviewHudViewportToggleBindings,
  pdgviewPathModeSelect,
  pdgviewPathResetButton,
  pdgviewFrameResetButton,
  pdgviewFrameScaleInput,
  pdgviewFrameScaleLabel,
  pdgviewCameraSpeedInput,
  pdgviewCameraSpeedLabel,
  pdgviewCameraRadiusInput,
  pdgviewCameraRadiusLabel,
  pdgviewCameraResetButton,
  pdgviewCameraPoiSelect,
  pdgviewCameraWaypointAdd,
  pdgviewCameraWaypointClear,
  pdgviewCameraWaypointCount,
  pdgviewCameraPoiStatus,
  pdgviewCameraFlightToggle,
  pdgviewSceneDurationInput,
  pdgviewSceneLoopInput,
  pdgviewMarkerListInput,
  pdgviewPauseListInput,
  pdgviewWarpListInput,
  pdgviewTransferListInput,
  pdgviewMarkerStatus,
  pdgviewPauseStatus,
  pdgviewWarpStatus,
  pdgviewTransferStatus,
  pdgviewTimelineSummary,
  pdgviewTimelineActive,
  pdgviewTimelineTrack,
  pdgviewTimelineWarps,
  pdgviewTimelinePauses,
  pdgviewTimelineMarkers,
  pdgviewTimelinePlayhead,
} = getPdgviewDomElements(document);
let zoomToastTimeoutId = null;
let zoomToastDismissedForSession = false;
const periodicTableDataPath = "content/scenes/chemistry/periodic_table.json";
const elementScenePathPattern = /content\/scenes\/elements\/([a-z0-9]+)\.json$/i;
const elementNavButtons = {
  up: elementNavUpButton,
  down: elementNavDownButton,
  left: elementNavLeftButton,
  right: elementNavRightButton,
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
let pdgviewCurrentDocument = null;
const {
  panelMap: pdgviewPanelMap,
  palette: pdgviewPalette,
  pathState: pdgviewPathState,
  storeFacade: pdgviewEditorStoreFacade,
} = createPdgviewAppStore({
  palette: defaultAutoMarkdownPalette,
});
const pdgviewDraftStateRuntime = createPdgviewDraftStateRuntime({
  storeFacade: pdgviewEditorStoreFacade,
  normalizeAssemblyDraft: normalizePdgviewAssemblyDraft,
});
const {
  getAssemblyDraftsState: getPdgviewAssemblyDraftsState,
  getGraphicOverlayDraftsState: getPdgviewGraphicOverlayDraftsState,
  getSelectedPointIndexState: getPdgviewSelectedPointIndexState,
  getSelectedAssemblyIdState: getPdgviewSelectedAssemblyIdState,
  getPendingTransferSourceState: getPdgviewPendingTransferSourceState,
  setAssemblyDraftsState: setPdgviewAssemblyDraftsState,
  appendAssemblyDraftState: appendPdgviewAssemblyDraftState,
  updateAssemblyDraftByIdState: updatePdgviewAssemblyDraftByIdState,
  setGraphicOverlayDraftsState: setPdgviewGraphicOverlayDraftsState,
  upsertGraphicOverlayDraftState: upsertPdgviewGraphicOverlayDraftState,
  removeGraphicOverlayDraftByIdState: removePdgviewGraphicOverlayDraftByIdState,
  updateGraphicOverlayDraftByIdState: updatePdgviewGraphicOverlayDraftByIdState,
  setSelectedPointIndexState: setPdgviewSelectedPointIndexState,
  setSelectedAssemblyIdState: setPdgviewSelectedAssemblyIdState,
  setTransferListRawStateValue: setPdgviewTransferListRawStateValue,
  updatePathPointAtState: updatePdgviewPathPointAtState,
  mutatePathStateState: mutatePdgviewPathStateState,
  getAssemblyDraftIndexById: getPdgviewAssemblyDraftIndexById,
  getAssemblyDraftById: getPdgviewAssemblyDraftById,
  ensureAssemblyDrafts: ensurePdgviewAssemblyDrafts,
  getSelectedAssembly: getPdgviewSelectedAssembly,
  validateSelectedAssemblyId: validatePdgviewSelectedAssemblyId,
} = pdgviewDraftStateRuntime;
const pdgviewAssemblyLabelRuntime = createPdgviewAssemblyLabelRuntime({
  getCurrentDocument: () => pdgviewCurrentDocument,
  getAssemblyDrafts: getPdgviewAssemblyDraftsState,
  getSelectedAssemblyId: getPdgviewSelectedAssemblyIdState,
  normalizeMemberList: normalizePdgviewMemberList,
  normalizeSubassemblyList: normalizePdgviewSubassemblyList,
  getMemberId: getPdgviewMemberId,
});
const {
  getAssemblyLetter: getPdgviewAssemblyLetter,
  getPrimaryPathAssemblyLetter: getPdgviewPrimaryPathAssemblyLetter,
  isBareArchitrinoAssembly: isPdgviewBareArchitrinoAssembly,
  normalizeAssemblySceneRole: normalizePdgviewAssemblySceneRole,
  getAssemblySceneRoleLabel: getPdgviewAssemblySceneRoleLabel,
  getAssemblySceneRoleGlyph: getPdgviewAssemblySceneRoleGlyph,
  getAssemblySceneRoleColor: getPdgviewAssemblySceneRoleColor,
  getAssemblyViewportLabel: getPdgviewAssemblyViewportLabel,
  getSelectedAssemblyLetter: getPdgviewSelectedAssemblyLetter,
} = pdgviewAssemblyLabelRuntime;
const pdgviewViewportDisplayRuntime = createPdgviewViewportDisplayRuntime({
  bindings: pdgviewHudViewportToggleBindings,
});
const {
  isFlagEnabled: isPdgviewViewportDisplayFlagEnabled,
  setFlag: setPdgviewViewportDisplayFlag,
  toggleFlag: togglePdgviewViewportDisplayFlag,
  updateToggleState: updatePdgviewHudViewportToggleState,
} = pdgviewViewportDisplayRuntime;
const pdgviewRenderAssetsRuntime = createPdgviewRenderAssetsRuntime({
  THREE,
  documentLike: document,
});
const {
  createPdgviewLozengeTexture,
  createPdgviewPointLabelTexture,
  createPdgviewMemberLabelTexture,
  createPdgviewGraphicOverlayTextTexture,
  createPdgviewGraphicOverlayTextSprite,
  updatePdgviewGraphicOverlayTextSprite,
  updatePdgviewPointLabelSprite,
  createPdgviewPointLabelSprite,
  createPdgviewCameraWaypointLabelTexture,
  updatePdgviewCameraWaypointLabelSprite,
  createPdgviewCameraWaypointLabelSprite,
  createPdgviewMemberLabelSprite,
  createPdgviewAssemblyBadgeTexture,
  createPdgviewAssemblyBadgeSprite,
  createPdgviewChildBadgeSprite,
} = pdgviewRenderAssetsRuntime;
const pdgviewStructureGeometryRuntime = createPdgviewStructureGeometryRuntime({
  THREE,
  clampFn: clamp,
  vectorFromTriplet,
  resolveGraphicTargetPosition: (...args) => resolvePdgviewGraphicTargetPosition(...args),
  getGraphicTargetRadius: (...args) => getPdgviewAssemblyGraphicTargetRadius(...args),
  normalizeAssemblyPathPoints: normalizePdgviewAssemblyPathPoints,
  updateAssemblyDraftByIdState: updatePdgviewAssemblyDraftByIdState,
  getMemberId: getPdgviewMemberId,
  getAssemblyWorldCenters: () => pdgviewAssemblyWorldCenters,
  getFrameGroup: () => pdgviewFrameGroup,
  getCamera: () => pdgviewCamera,
  getViewportAutoscaleTargetIds: getPdgviewViewportAutoscaleTargetIds,
  computeViewportAutoscaleCameraState: computePdgviewViewportAutoscaleCameraState,
});
const {
  resolvePdgviewGraphicTargetContactPosition,
  getPdgviewProxyMemberOffset,
  clearPdgviewMemberAnchors,
  setPdgviewMemberAnchor,
  getPdgviewOrbitBasis,
  getPdgviewOrbitOffsetAtTime,
  resolvePdgviewTransferEndpointPosition,
  findPdgviewCoreMemberId,
  getPdgviewPersonalitySlotLocalOffset,
  getPdgviewAssemblyWorldCenterById,
  shiftPdgviewPointTriplets,
  rebasePdgviewAssemblyParentFrame,
  computePdgviewAssemblyBasePosition,
  samplePdgviewPointAt,
  samplePdgviewCurvePoints,
  getPdgviewAutoscaledCameraState,
} = pdgviewStructureGeometryRuntime;
const pdgviewCameraPathRuntime = createPdgviewCameraPathRuntime({
  THREE,
  clampFn: clamp,
  formatScaleLabel,
  vectorFromTriplet,
  createDefaultPathPoints: createPdgviewDefaultPathPoints,
  getSelectedAssembly: getPdgviewSelectedAssembly,
  getSelectedAssemblyLetter: getPdgviewSelectedAssemblyLetter,
  getSelectedPointIndexState: getPdgviewSelectedPointIndexState,
  setSelectedPointIndexState: setPdgviewSelectedPointIndexState,
  getPathState: () => pdgviewPathState,
  mutatePathStateState: mutatePdgviewPathStateState,
  persistPathStateToSelectedAssembly: () => persistPdgviewPathStateToSelectedAssembly(),
  rebuildControlPoints: () => rebuildPdgviewControlPoints(),
  updatePathGeometry: () => updatePdgviewPathGeometry(),
  getCameraFlightState: () => pdgviewCameraFlightState,
  getCameraWaypointMeshes: () => pdgviewCameraWaypointMeshes,
  getCamera: () => pdgviewCamera,
  getCanvas: () => pdgviewCanvas,
  getBackgroundPathMarkers: () => pdgviewBackgroundPathMarkers,
  getPointMeshes: () => pdgviewPointMeshes,
  getPointMaterial: () => pdgviewPointMaterial,
  getPointMaterialActive: () => pdgviewPointMaterialActive,
  updatePointLabelSprite: (...args) => updatePdgviewPointLabelSprite(...args),
  updateCameraWaypointLabelSprite: (...args) =>
    updatePdgviewCameraWaypointLabelSprite(...args),
  getCameraOrbitState: () => pdgviewCameraOrbitState,
  getCameraState: () => pdgviewCameraState,
  updateCamera: () => updatePdgviewCamera(),
  getFrameGroup: () => pdgviewFrameGroup,
  getSelectedCameraWaypointIndex: () => pdgviewSelectedCameraWaypointIndex,
  setSelectedCameraWaypointIndex: (value) => {
    pdgviewSelectedCameraWaypointIndex = value;
  },
  updateCameraFlightDisplay: () => updatePdgviewCameraFlightDisplay(),
  renderJsonPreview: () => renderPdgviewJsonPreview(),
  getFrameState: () => pdgviewFrameState,
  dom: {
    frameScaleInput: pdgviewFrameScaleInput,
    frameScaleLabel: pdgviewFrameScaleLabel,
    cameraSpeedInput: pdgviewCameraSpeedInput,
    cameraSpeedLabel: pdgviewCameraSpeedLabel,
    cameraRadiusInput: pdgviewCameraRadiusInput,
    cameraRadiusLabel: pdgviewCameraRadiusLabel,
    cameraPoiStatus: pdgviewCameraPoiStatus,
    cameraWaypointCount: pdgviewCameraWaypointCount,
    cameraFlightToggle: pdgviewCameraFlightToggle,
    pathModeSelect: pdgviewPathModeSelect,
  },
});
const {
  setPdgviewFrameDefaults,
  setPdgviewCameraDefaults,
  updatePdgviewWaypointCount,
  updatePdgviewCameraWaypointMaterials,
  updatePdgviewCameraPoiStatus,
  getPdgviewOrbitTargetWorld,
  updatePdgviewOrbitFromPosition,
  syncPdgviewCameraRadiusInput,
  applyPdgviewCameraRadiusInput,
  addPdgviewCameraWaypoint,
  clearPdgviewCameraWaypoints,
  resetPdgviewPathPoints,
  addPdgviewPathPoint,
  updatePdgviewPointMaterials,
  updatePdgviewPathMarkerScales,
  samplePdgviewCameraWaypointState,
  getPdgviewCameraWaypointDisplayPosition,
  startPdgviewCameraFlightPreview,
  stopPdgviewCameraFlightPreview,
} = pdgviewCameraPathRuntime;
const pdgviewViewportOverlayPillRuntime = createPdgviewViewportOverlayPillRuntime({
  THREE,
  documentLike: document,
  HTMLInputElementCtor: globalThis.HTMLInputElement,
  clampFn: clamp,
  samplePath: samplePdgviewPath,
  formatTimeLabel: formatPdgviewTimeLabel,
  getPlaybackTimeForMotionProgress: (...args) =>
    getPdgviewPlaybackTimeForMotionProgress(...args),
  getViewportOverlays: () => pdgviewViewportOverlays,
  getCanvasWrap: () => pdgviewCanvasWrap,
  getCamera: () => pdgviewCamera,
  getFrameGroup: () => pdgviewFrameGroup,
  getOverlay: () => pdgviewOverlay,
  getCameraFlightState: () => pdgviewCameraFlightState,
  getViewportModeState: () => pdgviewViewportModeState,
  getSelectedPointIndexState: getPdgviewSelectedPointIndexState,
  setSelectedPointIndexState: setPdgviewSelectedPointIndexState,
  getPathState: () => pdgviewPathState,
  getPointMeshes: () => pdgviewPointMeshes,
  updatePointMaterials: (...args) => updatePdgviewPointMaterials(...args),
  updateCameraPoiStatus: () => updatePdgviewCameraPoiStatus(),
  updatePathPointAtState: updatePdgviewPathPointAtState,
  updatePathGeometry: () => updatePdgviewPathGeometry(),
  renderJsonPreview: () => renderPdgviewJsonPreview(),
  getCurrentDocument: () => pdgviewCurrentDocument,
});
const {
  clearPdgviewSelectedPoint,
  hidePdgviewPathPointInfoPill,
  updatePdgviewPathPointInfoPill,
} = pdgviewViewportOverlayPillRuntime;
const pdgviewPointerHitRuntime = createPdgviewPointerHitRuntime({
  getCanvas: () => pdgviewCanvas,
});
const {
  resolvePdgviewIndexedHit,
  getPdgviewPointerNdc,
  resolvePdgviewAssemblyHit,
  resolvePdgviewMemberHandleHit,
  resolvePdgviewSubassemblyHandleHit,
  resolvePdgviewGraphicOverlayHit,
  resolvePdgviewPersonalityHandleHit,
  resolvePdgviewAssemblyIdHit,
  findPdgviewShellSurfaceHit,
  findPdgviewCenterMarkerIntersection,
  shouldPreferPdgviewCenterMarker,
} = pdgviewPointerHitRuntime;
const pdgviewAssemblyInspectorRuntime = createPdgviewAssemblyInspectorRuntime({
  documentLike: document,
  getAssemblyListElement: () => pdgviewAssemblyList,
  getAssemblyDetailElement: () => pdgviewAssemblyDetail,
  validateSelectedAssemblyId: validatePdgviewSelectedAssemblyId,
  ensureAssemblyDrafts: ensurePdgviewAssemblyDrafts,
  getAssemblyDraftsState: getPdgviewAssemblyDraftsState,
  getSelectedAssemblyIdState: getPdgviewSelectedAssemblyIdState,
  getSelectedAssembly: getPdgviewSelectedAssembly,
  setSelectedAssembly: (...args) => setPdgviewSelectedAssembly(...args),
  renderJsonPreview: () => renderPdgviewJsonPreview(),
  openAssemblyPropertiesMenuAt: (...args) => openPdgviewAssemblyPropertiesMenuAt(...args),
  mutatePathStateState: mutatePdgviewPathStateState,
  setSelectedPointIndexState: setPdgviewSelectedPointIndexState,
  rebuildControlPoints: () => rebuildPdgviewControlPoints(),
  updatePathGeometry: () => updatePdgviewPathGeometry(),
  loadPathStateFromSelectedAssembly: () => loadPdgviewPathStateFromSelectedAssembly(),
  buildAssemblyStructure: buildPdgviewAssemblyStructure,
  summarizeAssemblyStructure: summarizePdgviewAssemblyStructure,
  formatAssemblyStructureSummary: formatPdgviewAssemblyStructureSummary,
  getAssemblyDraftById: getPdgviewAssemblyDraftById,
  showHoverTooltip,
  hideHoverTooltip,
});
const {
  renderPdgviewAssemblyEditor,
  updatePdgviewAssemblyHoverTooltip,
  clearPdgviewAssemblyHoverTooltipState,
} = pdgviewAssemblyInspectorRuntime;
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

function normalizePdgviewPathPoint(rawPoint) {
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

function normalizePdgviewAssemblyPathPoints(rawPoints) {
  const source = Array.isArray(rawPoints) ? rawPoints : [];
  return source
    .map((point) => normalizePdgviewPathPoint(point))
    .filter(Boolean);
}

function normalizePdgviewAssemblyDraft(draft = {}, index = 0) {
  const fallback = createDefaultPdgviewAssemblyDraft(index);
  const name = String(draft.name ?? draft.label ?? fallback.name).trim() || fallback.name;
  const id = sanitizePdgviewEntityId(draft.id || name, fallback.id);
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
    sceneRole: normalizePdgviewAssemblySceneRole(draft.sceneRole ?? fallback.sceneRole),
    parentId: draft.parentId ? sanitizePdgviewEntityId(draft.parentId, "") : "",
    position,
    members: normalizePdgviewMemberList(draft.members),
    subassemblies: normalizePdgviewSubassemblyList(draft.subassemblies),
    pathPoints: normalizePdgviewAssemblyPathPoints(draft.pathPoints ?? fallback.pathPoints),
    pathInterpolate: draft.pathInterpolate === "polyline" ? "polyline" : fallback.pathInterpolate,
    pathClosed: !!draft.pathClosed,
    historyTraceEnabled: !!draft.historyTraceEnabled,
    envelopeEnabled: !!draft.envelopeEnabled,
    core: draft.core,
  };
}

function normalizePdgviewTimelineAddType(rawType = "graphic") {
  const requestedAddType = String(rawType ?? "graphic").trim().toLowerCase();
  return pdgviewTimelineAddTypeIds.has(requestedAddType) ? requestedAddType : "graphic";
}

function getPdgviewTimelineEditKindTitle(editKind = "add") {
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
  return "Timeline";
}

const pdgviewTimelineOverlayRuntime = createPdgviewTimelineOverlayRuntime({
  clampFn: clamp,
  minDurationSeconds: pdgviewTimelineMinDurationSeconds,
  sanitizeEntityId: sanitizePdgviewEntityId,
  sanitizeTarget: sanitizePdgviewGraphicTarget,
  getAssemblyDrafts: getPdgviewAssemblyDraftsState,
  getSelectedAssemblyId: getPdgviewSelectedAssemblyIdState,
  getSelectedPointIndex: getPdgviewSelectedPointIndexState,
  getGraphicOverlayDrafts: getPdgviewGraphicOverlayDraftsState,
  getCurrentDocument: () => pdgviewCurrentDocument,
  getAssemblyLetter: getPdgviewAssemblyLetter,
  normalizeAssemblyPathPoints: normalizePdgviewAssemblyPathPoints,
  normalizeMemberList: normalizePdgviewMemberList,
  normalizeSubassemblyList: normalizePdgviewSubassemblyList,
  vectorFromTriplet,
  isBareArchitrinoAssembly: isPdgviewBareArchitrinoAssembly,
  readNumberInput,
  formatTimeLabel: formatPdgviewTimeLabel,
  setStatus: setPdgviewStatus,
  mediaAssetDirectories: pdgviewMediaAssetDirectories,
  supportedMediaExtensions: pdgviewSupportedMediaExtensions,
  dom: {
    sceneDurationInput: pdgviewSceneDurationInput,
    sceneLoopInput: pdgviewSceneLoopInput,
    markerListInput: pdgviewMarkerListInput,
    pauseListInput: pdgviewPauseListInput,
    warpListInput: pdgviewWarpListInput,
    transferListInput: pdgviewTransferListInput,
    markerStatus: pdgviewMarkerStatus,
    pauseStatus: pdgviewPauseStatus,
    warpStatus: pdgviewWarpStatus,
    transferStatus: pdgviewTransferStatus,
  },
});

const {
  parsePdgviewTransfers,
  getPdgviewTimelineAuthoringItems,
  findPdgviewTimelineOverlap,
  reportPdgviewTimelineOverlap,
  getPdgviewGraphicEnd,
  getPdgviewGraphicDefaultTarget,
  decodePdgviewGraphicTargetValue,
  getPdgviewGraphicTargetEntries,
  normalizePdgviewMediaRect,
  sanitizePdgviewMediaSource,
  normalizePdgviewGraphicOverlayDraft,
  normalizePdgviewGraphicOverlayList,
  getPdgviewGraphicOverlayDraftIndexById,
  getPdgviewGraphicOverlayDraftById,
  getNextPdgviewGraphicOverlayId,
  getPdgviewGraphicTimelineOverlays,
  getPdgviewViewportMediaTimelineOverlays,
  isPdgviewTimeWithinSpan,
  resolvePdgviewGraphicTargetPosition,
  getPdgviewAssemblyGraphicTargetRadius,
  formatPdgviewTimingStatus,
  updatePdgviewTimingDiagnostics,
  readPdgviewTimingState,
} = pdgviewTimelineOverlayRuntime;
const pdgviewAuthoringStateRuntime = createPdgviewAuthoringStateRuntime({
  draftStateRuntime: pdgviewDraftStateRuntime,
  getPathState: () => pdgviewPathState,
  getPlaybackState: () => pdgviewPlaybackState,
  dom: {
    pathModeSelect: pdgviewPathModeSelect,
    transferListInput: pdgviewTransferListInput,
    sceneDurationInput: pdgviewSceneDurationInput,
    sceneLoopInput: pdgviewSceneLoopInput,
  },
  parseTransfers: parsePdgviewTransfers,
  createDefaultPathPoints: createPdgviewDefaultPathPoints,
  normalizeAssemblyPathPoints: normalizePdgviewAssemblyPathPoints,
  normalizePathPoint: normalizePdgviewPathPoint,
  vectorFromTriplet,
  operations: {
    rebuildControlPoints: rebuildPdgviewControlPoints,
    updatePathGeometry: updatePdgviewPathGeometry,
    updateCameraPoiStatus: updatePdgviewCameraPoiStatus,
  },
  windowLike: window,
});
const {
  appendAuthoringLine: appendPdgviewAuthoringLine,
  replaceAuthoringLineById: replacePdgviewAuthoringLineById,
  setSceneDurationValue: setPdgviewSceneDurationValue,
  setSceneLoopValue: setPdgviewSceneLoopValue,
  getTransferListRaw: getPdgviewTransferListRaw,
  setTransferListRaw: setPdgviewTransferListRaw,
  appendTransferLine: appendPdgviewTransferLine,
  getParsedTransferEntries: getPdgviewParsedTransferEntries,
  clearPendingTransfer: clearPdgviewPendingTransfer,
  startTransferFromAssembly: startPdgviewTransferFromAssembly,
  completeTransferToAssembly: completePdgviewTransferToAssembly,
  persistPathStateToAssembly: persistPdgviewPathStateToAssembly,
  loadPathStateFromSelectedAssembly: loadPdgviewPathStateFromSelectedAssembly,
  persistPathStateToSelectedAssembly: persistPdgviewPathStateToSelectedAssembly,
  setSelectedAssembly: setPdgviewSelectedAssembly,
} = pdgviewAuthoringStateRuntime;

function getPdgviewMemberColor(memberId, index = 0) {
  const normalized = typeof memberId === "object" && memberId !== null && !Array.isArray(memberId)
    ? getPdgviewMemberId(memberId, index).trim().toLowerCase()
    : String(memberId ?? "").trim().toLowerCase();
  const explicitState = getPdgviewMemberState(memberId);
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

function addPdgviewMemberLabel(assemblyId, memberId, color, options = {}) {
  if (!pdgviewViewportGroup || !assemblyId || !memberId) {
    return;
  }
  const sprite = createPdgviewMemberLabelSprite(memberId, color);
  const offset = Array.isArray(options.offset)
    ? new THREE.Vector3(options.offset[0] ?? 0, options.offset[1] ?? 0.08, options.offset[2] ?? 0)
    : new THREE.Vector3(0, 0.08, 0);
  sprite.userData.assemblyId = assemblyId;
  sprite.userData.memberId = memberId;
  sprite.userData.offset = offset;
  pdgviewViewportGroup.add(sprite);
  pdgviewMemberLabelSprites.push(sprite);
}

function getPdgviewPersonalityMembers(assembly) {
  return normalizePdgviewMemberList(assembly?.members).filter((member) => isPdgviewPersonalityMember(member));
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

function setPdgviewTransportButtonIcon(button, kind) {
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

function createPdgviewMarkerHitProxy(radius) {
  const material = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    depthTest: false,
    depthWrite: false,
  });
  material.colorWrite = false;
  return new THREE.Mesh(new THREE.SphereGeometry(radius, 12, 12), material);
}

function disposePdgviewMarkerHandle(mesh, labelKey = "pointLabelSprite") {
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

function formatScaleLabel(value) {
  const normalized = Number.isFinite(value) ? value : 1;
  if (normalized >= 1000 || normalized <= 0.001) {
    return `${normalized.toExponential(1)}x`;
  }
  return `${normalized.toFixed(2)}x`;
}

const PDGVIEW_FRAME_SCALE_BASELINE = 0.4;

function getPdgviewEffectiveFrameScale(value = pdgviewFrameState.scale) {
  const normalized = Math.max(0.01, Number(value ?? 1) || 1);
  return normalized * PDGVIEW_FRAME_SCALE_BASELINE;
}

function formatPdgviewTimeLabel(value) {
  const normalized = Number.isFinite(value) ? value : 0;
  return `${normalized.toFixed(1)}s`;
}

function formatPdgviewTimeInputValue(value) {
  const normalized = Number(value);
  return Number.isFinite(normalized) ? normalized.toFixed(1) : "0.0";
}

function getPdgviewNumericInputPrecision(step = null) {
  if (step == null) {
    return null;
  }
  const stepText = String(step);
  if (!stepText.includes(".")) {
    return 0;
  }
  return Math.max(0, stepText.length - stepText.indexOf(".") - 1);
}

function formatPdgviewNumericInputValue(value, step = null) {
  const normalized = Number(value);
  if (!Number.isFinite(normalized)) {
    return "";
  }
  const precision = getPdgviewNumericInputPrecision(step);
  if (precision == null) {
    return String(normalized);
  }
  return normalized.toFixed(precision);
}

const pdgviewAssemblyAuthoringRuntime = createPdgviewAssemblyAuthoringRuntime({
  getPdgviewAssemblyDraftById,
  updatePdgviewAssemblyDraftByIdState,
  setPdgviewStatus,
  getPdgviewPersonalityMembers,
  getPdgviewProxyMemberOffset,
  splitPdgviewAssemblyGroupRuntime,
});
const {
  addPdgviewAssemblyMemberByKind,
  createPdgviewSubassemblyFromMembers,
  ensurePdgviewAssemblyMemberRecord,
  getPdgviewAssemblySubassemblyIndex,
  getPdgviewAvailablePersonalitySlotCount,
  getPdgviewMemberSubassemblyId,
  getPdgviewPersonalitySlotCapacity,
  getNextPdgviewAssemblyMemberId,
  getNextPdgviewPersonalitySlotIndex,
  getNextPdgviewSubassemblyId,
  movePdgviewMemberToRoot,
  movePdgviewMemberToSubassembly,
  removePdgviewAssemblyMember,
  resolvePdgviewAssemblyMemberLocalOffset,
  setPdgviewAssemblyMemberPosition,
  setPdgviewSubassemblyPosition,
  splitPdgviewAssemblyGroup,
} = pdgviewAssemblyAuthoringRuntime;

function getPdgviewCanvasLocalPointFromEvent(event) {
  if (!pdgviewCanvas || !pdgviewCamera || !pdgviewRaycaster || !pdgviewFrameGroup) {
    return new THREE.Vector3();
  }
  const { x, y } = getPdgviewPointerNdc(event);
  pdgviewRaycaster.setFromCamera({ x, y }, pdgviewCamera);
  const worldOrigin = pdgviewFrameGroup.getWorldPosition(new THREE.Vector3());
  const planeNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(
    pdgviewFrameGroup.quaternion
  );
  const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(planeNormal, worldOrigin);
  const intersection = new THREE.Vector3();
  if (pdgviewRaycaster.ray.intersectPlane(plane, intersection)) {
    return pdgviewFrameGroup.worldToLocal(intersection.clone());
  }
  return new THREE.Vector3();
}

function closePdgviewAssemblyMenu() {
  if (!pdgviewAssemblyMenu) {
    return;
  }
  resetPdgviewAssemblyMenu();
  pdgviewAssemblyMenu.classList.remove("is-open");
  pdgviewAssemblyMenu.setAttribute("aria-hidden", "true");
}

function resetPdgviewAssemblyMenu(mode = "") {
  if (!pdgviewAssemblyMenu) {
    return;
  }
  pdgviewAssemblyMenu.innerHTML = "";
  pdgviewAssemblyMenu.classList.remove("is-timeline-menu");
  if (mode === "timeline") {
    pdgviewAssemblyMenu.classList.add("is-timeline-menu");
  }
}

function getPdgviewPathOwnerAssemblyId(path) {
  return path?.metadata?.ownerAssemblyId ?? path?.ownerAssemblyId ?? null;
}

function clearPdgviewBackgroundPathLines() {
  pdgviewBackgroundPathLines.forEach((line) => {
    pdgviewFrameGroup?.remove(line);
    line.geometry?.dispose?.();
    line.material?.dispose?.();
  });
  pdgviewBackgroundPathLines = [];
  pdgviewBackgroundPathMarkers.forEach((marker) => {
    const labelSprite = marker.userData?.pointLabelSprite;
    if (labelSprite?.material?.map) {
      labelSprite.material.map.dispose?.();
    }
    labelSprite?.material?.dispose?.();
    pdgviewFrameGroup?.remove(marker);
    marker.geometry?.dispose?.();
    marker.material?.dispose?.();
  });
  pdgviewBackgroundPathMarkers = [];
}

function rebuildPdgviewPathDisplayFromDocument(documentData) {
  clearPdgviewBackgroundPathLines();
  if (!pdgviewPathGeometry || !pdgviewFrameGroup) {
    return;
  }
  const paths = Array.isArray(documentData?.paths) ? documentData.paths : [];
  const assemblies = Array.isArray(documentData?.assemblies) ? documentData.assemblies : [];
  const assemblyById = new Map(
    assemblies.map((assembly) => [assembly?.id ?? "", assembly])
  );
  const assemblyDrafts = getPdgviewAssemblyDraftsState();
  const selectedAssemblyId = getPdgviewSelectedAssemblyIdState() ?? assemblyDrafts[0]?.id ?? null;
  const selectedOwnedPath =
    selectedAssemblyId != null
      ? paths.find((path) => getPdgviewPathOwnerAssemblyId(path) === selectedAssemblyId) ?? null
      : null;
  const selectedPath =
    selectedOwnedPath ??
    (paths.length === 1 ? paths[0] : null);
  const selectedSamples = samplePdgviewPath(
    selectedPath?.payload?.points ?? [],
    selectedPath?.payload?.interpolate ?? pdgviewPathState.interpolate,
    !!selectedPath?.payload?.closed
  );
  pdgviewPathGeometry.setFromPoints(selectedSamples);
  if (selectedSamples.length) {
    pdgviewPathGeometry.computeBoundingSphere();
  }

  paths.forEach((path) => {
    const samples = samplePdgviewPath(
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
    line.userData.ownerAssemblyId = getPdgviewPathOwnerAssemblyId(path);
    line.userData.isSelectedPathBackground = path === selectedPath;
    pdgviewFrameGroup.add(line);
    pdgviewBackgroundPathLines.push(line);
    const labelPrefix = path?.metadata?.labelPrefix ?? "";
    const pathPoints = Array.isArray(path?.payload?.points) ? path.payload.points : [];
    if (pathPoints.length && labelPrefix && pdgviewPointGeometry && pdgviewPointMaterial) {
      const bareOriginMarker = isPdgviewBareArchitrinoAssembly(
        assemblyById.get(getPdgviewPathOwnerAssemblyId(path))
      );
      pathPoints.forEach((point, index) => {
        const marker = new THREE.Mesh(pdgviewPointGeometry, pdgviewPointMaterial);
        marker.position.copy(vectorFromTriplet(point));
        if (!(bareOriginMarker && index === 0)) {
          const labelSprite = createPdgviewPointLabelSprite(labelPrefix);
          labelSprite.position.set(0, 0, 0);
          marker.userData.pointLabelSprite = labelSprite;
          marker.add(labelSprite);
        }
        pdgviewFrameGroup.add(marker);
        pdgviewBackgroundPathMarkers.push(marker);
      });
    }
  });
}

function applyPdgviewViewportDisplayState() {
  const showTransportPath = isPdgviewViewportDisplayFlagEnabled("showTransportPath");
  const showCameraGuides = isPdgviewViewportDisplayFlagEnabled("showCameraGuides");
  const showLabels = isPdgviewViewportDisplayFlagEnabled("showLabels");
  const showHistoryTraces = isPdgviewViewportDisplayFlagEnabled("showHistoryTraces");
  const showEnvelopes = isPdgviewViewportDisplayFlagEnabled("showEnvelopes");
  const isObserverViewActive =
    pdgviewCameraFlightState.preview || pdgviewViewportModeState.cameraSource === "authored";
  const showObserverGuidesInViewport = showCameraGuides && !isObserverViewActive;
  if (pdgviewPathLine) {
    pdgviewPathLine.visible = showTransportPath;
  }
  pdgviewBackgroundPathLines.forEach((line) => {
    line.visible = showTransportPath;
  });
  pdgviewBackgroundPathMarkers.forEach((marker) => {
    marker.visible = showTransportPath;
    const labelSprite = marker.userData?.pointLabelSprite;
    if (labelSprite) {
      labelSprite.visible = true;
    }
  });
  pdgviewPointMeshes.forEach((mesh) => {
    mesh.visible = showTransportPath;
    const labelSprite = mesh.userData?.pointLabelSprite;
    if (labelSprite) {
      labelSprite.visible = true;
    }
  });
  pdgviewAssemblyMeshes.forEach((mesh) => {
    mesh.visible = true;
    mesh.traverse?.((child) => {
      const labelSprite = child.userData?.pointLabelSprite;
      if (labelSprite) {
        labelSprite.visible = showLabels;
      }
      const structureBadgeSprite = child.userData?.structureBadgeSprite;
      if (structureBadgeSprite) {
        structureBadgeSprite.visible = showLabels;
      }
    });
  });
  if (pdgviewDocumentCameraPathLine) {
    pdgviewDocumentCameraPathLine.visible = showObserverGuidesInViewport;
  }
  pdgviewDocumentCameraWaypointMeshes.forEach((mesh) => {
    mesh.visible = showObserverGuidesInViewport;
  });
  if (pdgviewDocumentCameraShotMesh) {
    pdgviewDocumentCameraShotMesh.visible = showObserverGuidesInViewport;
  }
  if (pdgviewDocumentCameraTargetMesh) {
    pdgviewDocumentCameraTargetMesh.visible = showObserverGuidesInViewport;
  }
  if (pdgviewDocumentCameraLookLine) {
    pdgviewDocumentCameraLookLine.visible = showObserverGuidesInViewport;
  }
  if (pdgviewCameraFlightGroup) {
    pdgviewCameraFlightGroup.visible = showObserverGuidesInViewport;
  }
  pdgviewHistoryTraceLines.forEach((line) => {
    line.visible = showHistoryTraces;
  });
  pdgviewEnvelopeMeshes.forEach((mesh) => {
    mesh.visible = showEnvelopes;
  });
  pdgviewCameraWaypointMeshes.forEach((mesh) => {
    const labelSprite = mesh.userData?.labelSprite;
    if (labelSprite) {
      labelSprite.visible = showLabels;
    }
  });
  pdgviewMemberLabelSprites.forEach((sprite) => {
    sprite.visible = showLabels;
  });
  updatePdgviewHudViewportToggleState();
}

function positionPdgviewAssemblyMenu(clientX, clientY, width = 220, height = 160) {
  if (!pdgviewAssemblyMenu || !pdgviewCanvasWrap) {
    return;
  }
  const wrapRect = pdgviewCanvasWrap.getBoundingClientRect();
  pdgviewAssemblyMenu.style.width = `${width}px`;
  pdgviewAssemblyMenu.classList.add("is-open");
  pdgviewAssemblyMenu.setAttribute("aria-hidden", "false");
  const measuredWidth = pdgviewAssemblyMenu.offsetWidth || width;
  const measuredHeight = pdgviewAssemblyMenu.offsetHeight || height;
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
  pdgviewAssemblyMenu.style.left = `${left}px`;
  pdgviewAssemblyMenu.style.top = `${top}px`;
}

function getPdgviewMenuAnchorClientPosition(element) {
  const rect = element?.getBoundingClientRect?.();
  if (!rect) {
    return { x: 24, y: 24 };
  }
  return {
    x: rect.left + rect.width * 0.5,
    y: rect.bottom + 10,
  };
}

function appendPdgviewMenuRangeControl(parent, options = {}) {
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
  field.className = "pdgview-field pdgview-range-field";
  const fieldLabel = document.createElement("span");
  fieldLabel.textContent = label;
  const row = document.createElement("div");
  row.className = "pdgview-range-row";
  const input = document.createElement("input");
  input.className = "pdgview-range";
  input.type = "range";
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(value);
  const output = document.createElement("span");
  output.className = "pdgview-range-value";
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

function appendPdgviewMenuSectionHeader(parent, title, tag = "") {
  if (!parent) {
    return null;
  }
  const header = document.createElement("div");
  header.className = "pdgview-assembly-menu-section-header";
  const titleNode = document.createElement("div");
  titleNode.className = "pdgview-assembly-menu-subtitle";
  titleNode.textContent = title;
  header.appendChild(titleNode);
  if (tag) {
    const tagNode = document.createElement("div");
    tagNode.className = "pdgview-assembly-menu-section-tag";
    tagNode.textContent = tag;
    header.appendChild(tagNode);
  }
  parent.appendChild(header);
  return header;
}

function appendPdgviewMenuButtonRow(parent, configs = []) {
  if (!parent || !Array.isArray(configs) || !configs.length) {
    return [];
  }
  const row = document.createElement("div");
  row.className = "pdgview-button-row";
  const buttons = configs.map((config) => {
    if (!config) {
      const spacer = document.createElement("div");
      spacer.className = "pdgview-assembly-menu-spacer";
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

function appendPdgviewMenuField(parent, options = {}) {
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
  field.className = "pdgview-field";
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
        ? formatPdgviewNumericInputValue(value, step)
        : String(value ?? "");
  }
  if (selectOnFocus && type !== "number") {
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

function appendPdgviewMenuSelectField(parent, options = {}) {
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
  field.className = "pdgview-field";
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

function appendPdgviewMenuBlock(parent, title, actionConfig = null) {
  if (!parent) {
    return null;
  }
  const block = document.createElement("div");
  block.className = "pdgview-assembly-menu-block";
  const header = document.createElement("div");
  header.className = "pdgview-assembly-menu-block-header";
  const titleNode = document.createElement("div");
  titleNode.className = "pdgview-assembly-menu-subtitle";
  titleNode.textContent = title;
  header.appendChild(titleNode);
  let actionButton = null;
  if (actionConfig && typeof actionConfig.onClick === "function") {
    actionButton = document.createElement("button");
    actionButton.type = "button";
    actionButton.className = "pdgview-assembly-menu-inline-action";
    actionButton.textContent = actionConfig.text ?? "Add";
    actionButton.addEventListener("click", actionConfig.onClick);
    header.appendChild(actionButton);
  }
  block.appendChild(header);
  parent.appendChild(block);
  return { block, header, titleNode, actionButton };
}

function appendPdgviewMenuNote(parent, text) {
  if (!parent || !text) {
    return null;
  }
  const note = document.createElement("div");
  note.className = "pdgview-field-note";
  note.textContent = text;
  parent.appendChild(note);
  return note;
}

function openPdgviewMemberMenuAt(clientX, clientY, assemblyId, memberId) {
  openPdgviewMemberMenu({
    menu: pdgviewAssemblyMenu,
    clientX,
    clientY,
    assemblyId,
    memberId,
    getAssemblyDraftById: getPdgviewAssemblyDraftById,
    sanitizeEntityId: sanitizePdgviewEntityId,
    getMemberSubassemblyId: getPdgviewMemberSubassemblyId,
    resolveAssemblyMemberLocalOffset: resolvePdgviewAssemblyMemberLocalOffset,
    normalizeSubassemblyList: normalizePdgviewSubassemblyList,
    getSubassemblyId: getPdgviewSubassemblyId,
    resetMenu: resetPdgviewAssemblyMenu,
    appendMenuNote: appendPdgviewMenuNote,
    appendMenuButtonRow: appendPdgviewMenuButtonRow,
    appendMenuSectionHeader: appendPdgviewMenuSectionHeader,
    closeMenu: closePdgviewAssemblyMenu,
    renderAssemblyEditor: renderPdgviewAssemblyEditor,
    renderJsonPreview: renderPdgviewJsonPreview,
    moveMemberToRoot: movePdgviewMemberToRoot,
    openMemberMenuAt: openPdgviewMemberMenuAt,
    createSubassemblyFromMembers: createPdgviewSubassemblyFromMembers,
    openSubassemblyMenuAt: openPdgviewSubassemblyMenuAt,
    removeAssemblyMember: removePdgviewAssemblyMember,
    openAssemblyPropertiesMenuAt: openPdgviewAssemblyPropertiesMenuAt,
    moveMemberToSubassembly: movePdgviewMemberToSubassembly,
    positionMenu: positionPdgviewAssemblyMenu,
  });
}

function openPdgviewPersonalitySlotMenuAt(clientX, clientY, assemblyId, memberId) {
  return openPdgviewPersonalitySlotMenu({
    menu: pdgviewAssemblyMenu,
    clientX,
    clientY,
    assemblyId,
    memberId,
    getAssemblyDraftById: getPdgviewAssemblyDraftById,
    normalizeMemberList: normalizePdgviewMemberList,
    getMemberId: getPdgviewMemberId,
    sanitizeEntityId: sanitizePdgviewEntityId,
    isPersonalityMember: isPdgviewPersonalityMember,
    getMemberState: getPdgviewMemberState,
    resetMenu: resetPdgviewAssemblyMenu,
    appendMenuNote: appendPdgviewMenuNote,
    appendMenuButtonRow: appendPdgviewMenuButtonRow,
    ensureAssemblyMemberRecord: ensurePdgviewAssemblyMemberRecord,
    closeMenu: closePdgviewAssemblyMenu,
    renderJsonPreview: renderPdgviewJsonPreview,
    positionMenu: positionPdgviewAssemblyMenu,
  });
}

function openPdgviewSubassemblyMenuAt(clientX, clientY, assemblyId, subassemblyId) {
  openPdgviewSubassemblyMenu({
    menu: pdgviewAssemblyMenu,
    clientX,
    clientY,
    assemblyId,
    subassemblyId,
    getAssemblyDraftById: getPdgviewAssemblyDraftById,
    sanitizeEntityId: sanitizePdgviewEntityId,
    normalizeSubassemblyList: normalizePdgviewSubassemblyList,
    getSubassemblyId: getPdgviewSubassemblyId,
    resetMenu: resetPdgviewAssemblyMenu,
    appendMenuNote: appendPdgviewMenuNote,
    appendMenuButtonRow: appendPdgviewMenuButtonRow,
    appendMenuSectionHeader: appendPdgviewMenuSectionHeader,
    splitGroup: splitPdgviewAssemblyGroup,
    closeMenu: closePdgviewAssemblyMenu,
    renderAssemblyEditor: renderPdgviewAssemblyEditor,
    renderJsonPreview: renderPdgviewJsonPreview,
    openAssemblyPropertiesMenuAt: openPdgviewAssemblyPropertiesMenuAt,
    openMemberMenuAt: openPdgviewMemberMenuAt,
    positionMenu: positionPdgviewAssemblyMenu,
  });
}

function openPdgviewAssemblyTemplateMenuAt(event) {
  openPdgviewAssemblyTemplateMenu({
    menu: pdgviewAssemblyMenu,
    event,
    localPoint: getPdgviewCanvasLocalPointFromEvent(event),
    resetMenu: resetPdgviewAssemblyMenu,
    appendMenuButtonRow: appendPdgviewMenuButtonRow,
    appendMenuNote: appendPdgviewMenuNote,
    appendMenuSectionHeader: appendPdgviewMenuSectionHeader,
    templateMenuRows: pdgviewAssemblyTemplateMenuRows,
    openSceneMenuAt: openPdgviewSceneMenuAt,
    openLibraryMenuAt: openPdgviewLibraryMenuAt,
    cameraFlightState: pdgviewCameraFlightState,
    addCameraWaypoint: addPdgviewCameraWaypoint,
    closeMenu: closePdgviewAssemblyMenu,
    updateCameraPoiStatus: updatePdgviewCameraPoiStatus,
    clearCameraWaypoints: clearPdgviewCameraWaypoints,
    getSelectedAssemblyLetter: getPdgviewSelectedAssemblyLetter,
    pdgviewFrameEditModeRef: {
      get: () => pdgviewFrameEditMode,
      set: (value) => {
        pdgviewFrameEditMode = !!value;
      },
    },
    setPdgviewFrameDefaults,
    updatePdgviewFrame,
    appendMenuRangeControl: appendPdgviewMenuRangeControl,
    formatScaleLabel,
    pdgviewFrameState,
    renderJsonPreview: renderPdgviewJsonPreview,
    setPdgviewCameraDefaults,
    updatePdgviewCamera,
    pdgviewCameraState,
    pdgviewCameraOrbitState,
    positionMenu: positionPdgviewAssemblyMenu,
  });
}

function openPdgviewAssemblyPropertiesMenuAt(clientX, clientY, assemblyId) {
  openPdgviewAssemblyPropertiesMenu({
    menu: pdgviewAssemblyMenu,
    clientX,
    clientY,
    assemblyId,
    getAssemblyDraftIndexById: getPdgviewAssemblyDraftIndexById,
    assemblyDrafts: getPdgviewAssemblyDraftsState(),
    setSelectedAssembly: setPdgviewSelectedAssembly,
    resetMenu: resetPdgviewAssemblyMenu,
    pendingTransferSource: getPdgviewPendingTransferSourceState(),
    appendMenuNote: appendPdgviewMenuNote,
    appendMenuSectionHeader: appendPdgviewMenuSectionHeader,
    appendMenuButtonRow: appendPdgviewMenuButtonRow,
    getAssemblyDraftById: getPdgviewAssemblyDraftById,
    renderAssemblyEditor: renderPdgviewAssemblyEditor,
    renderJsonPreview: renderPdgviewJsonPreview,
    closeMenu: closePdgviewAssemblyMenu,
    clearPendingTransfer: clearPdgviewPendingTransfer,
    openAssemblyPropertiesMenuAt: openPdgviewAssemblyPropertiesMenuAt,
    ensureAssemblyDrafts: ensurePdgviewAssemblyDrafts,
    positionMenu: positionPdgviewAssemblyMenu,
  });
}

function getNextPdgviewAssemblyId(baseId) {
  const normalizedBase = sanitizePdgviewEntityId(baseId, "assembly");
  let suffix = 1;
  let candidate = normalizedBase;
  const existingIds = new Set(getPdgviewAssemblyDraftsState().map((assembly) => assembly?.id));
  while (existingIds.has(candidate)) {
    suffix += 1;
    candidate = `${normalizedBase}_${suffix}`;
  }
  return candidate;
}

function createBuiltInPdgviewAssemblyDraft(templateId, position = [0, 0, 0], options = {}) {
  return createBuiltInPdgviewAssemblyDraftRuntime(templateId, position, {
    sceneRole: options.sceneRole,
    normalizeSceneRole: normalizePdgviewAssemblySceneRole,
    normalizeAssemblyDraft: normalizePdgviewAssemblyDraft,
    getDraftCount: () => getPdgviewAssemblyDraftsState().length,
    getNextAssemblyId: getNextPdgviewAssemblyId,
    createDefaultPathPoints: createPdgviewDefaultPathPoints,
    createDefaultCoreSpec: createPdgviewDefaultCoreSpec,
    createPersonalityMembers: createPdgviewPersonalityMembers,
    getBuiltInPersonalityStates: getPdgviewBuiltInPersonalityStates,
    createGenIFermionPersonalityMembers: createPdgviewGenIFermionPersonalityMembers,
  });
}

function addBuiltInPdgviewAssembly(templateId, position, options = {}) {
  const nextAssembly = createBuiltInPdgviewAssemblyDraft(templateId, position, options);
  appendPdgviewAssemblyDraftState(nextAssembly);
  setPdgviewSelectedAssembly(nextAssembly.id);
  renderPdgviewAssemblyEditor();
  renderPdgviewJsonPreview();
}

function setPdgviewStatus(message) {
  if (!pdgviewStatus) {
    return;
  }
  pdgviewStatus.textContent = message;
}

function rebuildPdgviewControlPoints() {
  if (!pdgviewFrameGroup || !pdgviewPointGeometry) {
    return;
  }
  const selectedAssembly = getPdgviewSelectedAssembly();
  const bareOriginMarker = isPdgviewBareArchitrinoAssembly(selectedAssembly);
  pdgviewPointMeshes.forEach((mesh) => {
    disposePdgviewMarkerHandle(mesh);
    pdgviewFrameGroup.remove(mesh);
  });
  pdgviewPointMeshes = pdgviewPathState.points.map((point, index) => {
    const mesh = new THREE.Mesh(pdgviewPointGeometry, pdgviewPointMaterial);
    mesh.position.copy(point);
    mesh.renderOrder = 12;
    mesh.userData.pointIndex = index;
    if (!(bareOriginMarker && index === 0)) {
      const labelSprite = createPdgviewPointLabelSprite(getPdgviewSelectedAssemblyLetter());
      labelSprite.position.set(0, 0, 0);
      mesh.userData.pointLabelSprite = labelSprite;
      mesh.add(labelSprite);
    }
    const hitProxy = createPdgviewMarkerHitProxy(0.19);
    mesh.userData.hitProxy = hitProxy;
    mesh.add(hitProxy);
    pdgviewFrameGroup.add(mesh);
    return mesh;
  });
  updatePdgviewPointMaterials();
  applyPdgviewViewportDisplayState();
}

function samplePdgviewPath(points, interpolate = "spline", closed = false) {
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

function updatePdgviewPathGeometry(points = pdgviewPathState.points) {
  if (!pdgviewPathGeometry) {
    return [];
  }
  const samples = samplePdgviewPath(
    points,
    pdgviewPathState.interpolate,
    pdgviewPathState.closed
  );
  pdgviewPathGeometry.setFromPoints(samples);
  if (samples.length) {
    pdgviewPathGeometry.computeBoundingSphere();
  }
  return samples;
}

function clearPdgviewViewportVisuals() {
  pdgviewAssemblyMeshes.forEach((mesh) => {
    pdgviewViewportGroup?.remove(mesh);
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
  pdgviewAssemblyMeshes = [];
  pdgviewMemberHandleMeshes = [];
  pdgviewSubassemblyHandleMeshes = [];
  pdgviewShellMeshes.forEach((mesh) => {
    pdgviewViewportGroup?.remove(mesh);
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
  pdgviewShellMeshes = [];
  pdgviewEnvelopeMeshes.forEach((mesh) => {
    pdgviewViewportGroup?.remove(mesh);
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
  pdgviewEnvelopeMeshes = [];
  pdgviewOrbitTraceLines.forEach((line) => {
    pdgviewViewportGroup?.remove(line);
    line.geometry?.dispose?.();
    line.material?.dispose?.();
  });
  pdgviewOrbitTraceLines = [];
  pdgviewHistoryTraceLines.forEach((line) => {
    pdgviewViewportGroup?.remove(line);
    line.geometry?.dispose?.();
    line.material?.dispose?.();
  });
  pdgviewHistoryTraceLines = [];
  pdgviewTransferLines.forEach((line) => {
    pdgviewViewportGroup?.remove(line);
    line.geometry?.dispose?.();
    line.material?.dispose?.();
  });
  pdgviewTransferLines = [];
  pdgviewAxisGuideLines.forEach((line) => {
    pdgviewViewportGroup?.remove(line);
    line.geometry?.dispose?.();
    line.material?.dispose?.();
  });
  pdgviewAxisGuideLines = [];
  pdgviewOrbitParticleMeshes.forEach((mesh) => {
    pdgviewViewportGroup?.remove(mesh);
    mesh.geometry?.dispose?.();
    mesh.material?.dispose?.();
  });
  pdgviewOrbitParticleMeshes = [];
  pdgviewMemberLabelSprites.forEach((sprite) => {
    pdgviewViewportGroup?.remove(sprite);
    sprite.material?.map?.dispose?.();
    sprite.material?.dispose?.();
  });
  pdgviewMemberLabelSprites = [];
  pdgviewGraphicOverlayGroups.forEach((group) => {
    pdgviewViewportGroup?.remove(group);
    group.traverse?.((child) => {
      if (child === group) {
        return;
      }
      child.geometry?.dispose?.();
      child.material?.map?.dispose?.();
      child.material?.dispose?.();
    });
  });
  pdgviewGraphicOverlayGroups = [];
  pdgviewGraphicOverlayHandleMeshes = [];
  pdgviewPersonalityHandleMeshes = [];
  clearPdgviewViewportMediaOverlays();
  clearPdgviewMemberAnchors();
  if (pdgviewDocumentCameraPathLine) {
    pdgviewViewportGroup?.remove(pdgviewDocumentCameraPathLine);
    pdgviewDocumentCameraPathLine.geometry?.dispose?.();
    pdgviewDocumentCameraPathLine.material?.dispose?.();
    pdgviewDocumentCameraPathLine = null;
  }
  pdgviewDocumentCameraWaypointMeshes.forEach((mesh) => {
    pdgviewViewportGroup?.remove(mesh);
    mesh.geometry?.dispose?.();
    mesh.material?.dispose?.();
  });
  pdgviewDocumentCameraWaypointMeshes = [];
  if (pdgviewDocumentCameraShotMesh) {
    pdgviewViewportGroup?.remove(pdgviewDocumentCameraShotMesh);
    pdgviewDocumentCameraShotMesh.geometry?.dispose?.();
    pdgviewDocumentCameraShotMesh.material?.dispose?.();
    pdgviewDocumentCameraShotMesh = null;
  }
  if (pdgviewDocumentCameraTargetMesh) {
    pdgviewViewportGroup?.remove(pdgviewDocumentCameraTargetMesh);
    pdgviewDocumentCameraTargetMesh.geometry?.dispose?.();
    pdgviewDocumentCameraTargetMesh.material?.dispose?.();
    pdgviewDocumentCameraTargetMesh = null;
  }
  if (pdgviewDocumentCameraLookLine) {
    pdgviewViewportGroup?.remove(pdgviewDocumentCameraLookLine);
    pdgviewDocumentCameraLookLine.geometry?.dispose?.();
    pdgviewDocumentCameraLookLine.material?.dispose?.();
    pdgviewDocumentCameraLookLine = null;
  }
}

function getPdgviewDocumentCameraStateAtTime(documentData, timeSeconds) {
  if (!documentData || !pdgviewFrameGroup) {
    return null;
  }
  const timeWindow = getPdgviewSceneTimeWindow(documentData);
  const activeShot = getPdgviewActiveCameraShot(documentData, timeSeconds, timeWindow);
  const activeCameraPathId = getPdgviewActiveCameraPathId(documentData, timeSeconds, timeWindow);
  if (!activeCameraPathId) {
    return null;
  }
  const cameraPaths = Array.isArray(documentData?.cameraPaths) ? documentData.cameraPaths : [];
  const cameraPath = cameraPaths.find((entry) => entry?.id === activeCameraPathId) ?? null;
  const waypoints = Array.isArray(cameraPath?.waypoints) ? cameraPath.waypoints : [];
  if (waypoints.length < 2) {
    return null;
  }
  let normalizedT = 0;
  if (activeShot) {
    const interval = resolvePdgviewShotInterval(activeShot, timeWindow);
    const duration = Math.max(0.000001, interval.end - interval.start);
    normalizedT = clamp((timeSeconds - interval.start) / duration, 0, 1);
  } else if (timeWindow.end > timeWindow.start) {
    normalizedT = clamp((timeSeconds - timeWindow.start) / (timeWindow.end - timeWindow.start), 0, 1);
  }
  const localState = samplePdgviewCameraWaypointState(waypoints, normalizedT);
  return {
    position: pdgviewFrameGroup.localToWorld(localState.position.clone()),
    lookAt: pdgviewFrameGroup.localToWorld(localState.lookAt.clone()),
    cameraPathId: activeCameraPathId,
    shotId: activeShot?.id ?? null,
    normalizedT,
  };
}

function getPdgviewPreviewCameraStateAtTime(timeSeconds) {
  if (!pdgviewFrameGroup) {
    return null;
  }
  const waypoints = pdgviewCameraFlightState.waypoints;
  if (!Array.isArray(waypoints) || waypoints.length < 2) {
    return null;
  }
  const timeWindow = pdgviewCurrentDocument
    ? getPdgviewSceneTimeWindow(pdgviewCurrentDocument)
    : { start: 0, end: 24 };
  const duration = Math.max(0.000001, timeWindow.end - timeWindow.start);
  const normalizedT = clamp((timeSeconds - timeWindow.start) / duration, 0, 1);
  const localState = samplePdgviewCameraWaypointState(waypoints, normalizedT);
  return {
    position: pdgviewFrameGroup.localToWorld(localState.position.clone()),
    lookAt: pdgviewFrameGroup.localToWorld(localState.lookAt.clone()),
    normalizedT,
  };
}

function getPdgviewPlaybackRateAtTime(documentData, timeSeconds) {
  const timeWarps = Array.isArray(documentData?.scene?.timeWarps) ? documentData.scene.timeWarps : [];
  const activeWarp = timeWarps.find((warp) => timeSeconds >= warp.start && timeSeconds < warp.end);
  return Number(activeWarp?.rate ?? 1) || 1;
}

function getPdgviewMotionRateAtTime(documentData, timeSeconds) {
  const pauses = Array.isArray(documentData?.scene?.pauses) ? documentData.scene.pauses : [];
  const activePause = pauses.find((pause) => {
    const start = Number(pause?.start ?? 0);
    const duration = Math.max(0, Number(pause?.duration ?? 0) || 0);
    return timeSeconds >= start && timeSeconds < start + duration;
  });
  if (activePause) {
    return 0;
  }
  return getPdgviewPlaybackRateAtTime(documentData, timeSeconds);
}

function getPdgviewIntegratedMotionTime(documentData, timeSeconds) {
  const timeWindow = getPdgviewSceneTimeWindow(documentData);
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
    total += (end - start) * getPdgviewMotionRateAtTime(documentData, sampleTime);
  }
  return total;
}

function getPdgviewTotalMotionDuration(documentData) {
  const timeWindow = getPdgviewSceneTimeWindow(documentData);
  return Math.max(0.0001, getPdgviewIntegratedMotionTime(documentData, timeWindow.end));
}

function getPdgviewMotionProgress(documentData, timeSeconds) {
  const totalMotionDuration = getPdgviewTotalMotionDuration(documentData);
  if (!(totalMotionDuration > 0)) {
    return 0;
  }
  return clamp(getPdgviewIntegratedMotionTime(documentData, timeSeconds) / totalMotionDuration, 0, 1);
}

function getPdgviewPlaybackTimeForMotionTime(documentData, targetMotionTime) {
  const timeWindow = getPdgviewSceneTimeWindow(documentData);
  const totalMotionDuration = getPdgviewTotalMotionDuration(documentData);
  const normalizedTarget = clamp(Number(targetMotionTime) || 0, 0, totalMotionDuration);
  if (normalizedTarget <= 0) {
    return timeWindow.start;
  }
  if (normalizedTarget >= totalMotionDuration) {
    return timeWindow.end;
  }
  let low = timeWindow.start;
  let high = timeWindow.end;
  for (let iteration = 0; iteration < 36; iteration += 1) {
    const mid = (low + high) * 0.5;
    const motionTime = getPdgviewIntegratedMotionTime(documentData, mid);
    if (motionTime < normalizedTarget) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return Number(high.toFixed(3));
}

function getPdgviewPlaybackTimeForMotionProgress(documentData, targetProgress) {
  const timeWindow = getPdgviewSceneTimeWindow(documentData);
  const normalizedTarget = clamp(Number(targetProgress) || 0, 0, 1);
  if (normalizedTarget <= 0) {
    return timeWindow.start;
  }
  if (normalizedTarget >= 1) {
    return timeWindow.end;
  }
  let low = timeWindow.start;
  let high = timeWindow.end;
  for (let iteration = 0; iteration < 36; iteration += 1) {
    const mid = (low + high) * 0.5;
    const progress = getPdgviewMotionProgress(documentData, mid);
    if (progress < normalizedTarget) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return Number(high.toFixed(3));
}

function clearPdgviewTimelineLayer(layer) {
  if (!layer) {
    return;
  }
  while (layer.firstChild) {
    layer.removeChild(layer.firstChild);
  }
}

function createPdgviewTimelineBand(fractionStart, fractionEnd, className, title, label = "") {
  const band = document.createElement("div");
  band.className = `pdgview-timeline-band ${className}`;
  const widthFraction = Math.max(0.002, fractionEnd - fractionStart);
  band.style.left = `${fractionStart * 100}%`;
  band.style.width = `${widthFraction * 100}%`;
  if (title) {
    band.title = title;
  }
  if (label) {
    const bandLabel = document.createElement("span");
    bandLabel.className = "pdgview-timeline-band-label";
    bandLabel.textContent = label;
    band.appendChild(bandLabel);
  }
  return band;
}

function createPdgviewTimelineMarker(fraction, label, title) {
  const marker = document.createElement("div");
  marker.className = "pdgview-timeline-marker";
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
    markerLabel.className = "pdgview-timeline-marker-label";
    markerLabel.textContent = label;
    marker.appendChild(markerLabel);
  }
  return marker;
}

function openPdgviewTimelineSummaryMenuAt(clientX, clientY) {
  if (!pdgviewAssemblyMenu) {
    return;
  }
  buildPdgviewTimelineSummaryMenu({
    menu: pdgviewAssemblyMenu,
    clientX,
    clientY,
    currentDuration: Math.max(1, readNumberInput(pdgviewSceneDurationInput, 24)),
    isLooping: !!pdgviewSceneLoopInput?.checked,
    resetPdgviewAssemblyMenu,
    appendPdgviewMenuBlock,
    appendPdgviewMenuField,
    formatPdgviewTimeInputValue,
    setPdgviewSceneDurationValue,
    setPdgviewSceneLoopValue,
    renderPdgviewJsonPreview,
    positionPdgviewAssemblyMenu,
  });
}

function applyPdgviewSceneIdentityDraft(sceneIdValue, sceneNameValue, options = {}) {
  const nextId = sanitizePdgviewId(sceneIdValue ?? pdgviewSceneIdInput?.value ?? "pdgview_scene")
    || "pdgview_scene";
  const nextName = String(sceneNameValue ?? pdgviewSceneNameInput?.value ?? "").trim()
    || "pdgview scene";
  if (pdgviewSceneIdInput) {
    pdgviewSceneIdInput.value = nextId;
  }
  if (pdgviewSceneNameInput) {
    pdgviewSceneNameInput.value = nextName;
  }
  if (options.renderPreview !== false) {
    renderPdgviewJsonPreview();
  }
  return {
    id: nextId,
    name: nextName,
  };
}

function openPdgviewSceneMenuAt(clientX, clientY) {
  if (!pdgviewAssemblyMenu) {
    return;
  }
  buildPdgviewSceneMenu({
    menu: pdgviewAssemblyMenu,
    clientX,
    clientY,
    currentId: sanitizePdgviewId(pdgviewSceneIdInput?.value ?? "pdgview_scene"),
    currentName: String(pdgviewSceneNameInput?.value ?? "").trim() || "pdgview scene",
    resetPdgviewAssemblyMenu,
    appendPdgviewMenuBlock,
    appendPdgviewMenuButtonRow,
    appendPdgviewMenuField,
    appendPdgviewMenuNote,
    applyPdgviewSceneIdentityDraft,
    closePdgviewAssemblyMenu,
    openPdgviewLibraryMenuAt,
    pdgviewDocsButton,
    positionPdgviewAssemblyMenu,
  });
}

function openPdgviewJsonPreviewMenuAt(clientX, clientY) {
  if (!pdgviewAssemblyMenu) {
    return;
  }
  persistPdgviewPathStateToSelectedAssembly();
  const draftState = readPdgviewDraftState();
  const sceneDocument = buildPdgviewDocumentData(draftState);
  const json = JSON.stringify(sceneDocument, null, 2);
  buildPdgviewJsonPreviewMenu({
    menu: pdgviewAssemblyMenu,
    clientX,
    clientY,
    draftState,
    json,
    pdgviewJsonPreview,
    resetPdgviewAssemblyMenu,
    appendPdgviewMenuButtonRow,
    openPdgviewLibraryMenuAt,
    closePdgviewAssemblyMenu,
    pdgviewExportButton,
    positionPdgviewAssemblyMenu,
  });
}

function openPdgviewLibraryMenuAt(clientX, clientY) {
  if (!pdgviewAssemblyMenu) {
    return;
  }
  const entries = getPdgviewSortedLibraryEntries();
  buildPdgviewLibraryMenu({
    menu: pdgviewAssemblyMenu,
    clientX,
    clientY,
    entries,
    pdgviewLibrarySelect,
    pdgviewLibraryLoadButton,
    pdgviewLibraryDeleteButton,
    pdgviewLibraryStatus,
    pdgviewRepoSaveButton,
    pdgviewLibrarySaveButton,
    pdgviewExportButton,
    resetPdgviewAssemblyMenu,
    refreshPdgviewLibraryUi,
    appendPdgviewMenuBlock,
    appendPdgviewMenuButtonRow,
    appendPdgviewMenuNote,
    appendPdgviewMenuSelectField,
    closePdgviewAssemblyMenu,
    openPdgviewJsonPreviewMenuAt,
    positionPdgviewAssemblyMenu,
  });
}

function getPdgviewTimelineTimeAtClientX(clientX, documentData = pdgviewCurrentDocument) {
  if (!pdgviewTimelineTrack || !documentData) {
    return 0;
  }
  return getPdgviewTimelineTimeAtClientXRuntime(clientX, documentData, {
    trackRect: pdgviewTimelineTrack.getBoundingClientRect(),
    clampFn: clamp,
    getTimeWindow: getPdgviewSceneTimeWindow,
  });
}

function openPdgviewTimelineMenuAt(clientX, clientY, options = {}) {
  if (!pdgviewAssemblyMenu) {
    return;
  }
  const documentData = pdgviewCurrentDocument;
  const overlays = Array.isArray(documentData?.overlays) ? documentData.overlays : [];
  const graphics = getPdgviewGraphicTimelineOverlays(documentData);
  const pauses = Array.isArray(documentData?.scene?.pauses) ? documentData.scene.pauses : [];
  const timeWarps = Array.isArray(documentData?.scene?.timeWarps) ? documentData.scene.timeWarps : [];
  const overlayId = options.overlayId ?? options.graphicId ?? options.markerId ?? null;
  const pauseId = options.pauseId ?? null;
  const warpId = options.warpId ?? null;
  const overlay = overlayId ? overlays.find((entry) => entry?.id === overlayId) ?? null : null;
  const graphic = overlay?.kind === "graphic" ? overlay : null;
  const imageOverlay = overlay?.kind === "image" ? overlay : null;
  const videoOverlay = overlay?.kind === "video" ? overlay : null;
  const pause = pauseId ? pauses.find((entry) => entry?.id === pauseId) ?? null : null;
  const warp = warpId ? timeWarps.find((entry) => entry?.id === warpId) ?? null : null;
  const timeSeconds =
    options.timeSeconds ??
    overlay?.start ??
    pause?.start ??
    warp?.start ??
    getPdgviewTimelineTimeAtClientX(clientX, documentData);
  const duration = Math.max(1, readNumberInput(pdgviewSceneDurationInput, 24));
  const editKind = warp ? "warp" : pause ? "pause" : overlay ? overlay.kind : "add";
  const addType = normalizePdgviewTimelineAddType(options.addType);
  buildPdgviewTimelineMenu({
    menu: pdgviewAssemblyMenu,
    clientX,
    clientY,
    documentData,
    graphic,
    imageOverlay,
    videoOverlay,
    pause,
    warp,
    timeSeconds,
    duration,
    editKind,
    addType,
    timelineMenuWidth: 256,
    pdgviewTimelineAddTypeEntries,
    pdgviewTimelineMinDurationSeconds,
    pdgviewPauseListInput,
    pdgviewWarpListInput,
    resetPdgviewAssemblyMenu,
    positionPdgviewAssemblyMenu,
    appendPdgviewMenuBlock,
    appendPdgviewMenuButtonRow,
    appendPdgviewMenuField,
    appendPdgviewMenuNote,
    appendPdgviewMenuSelectField,
    appendPdgviewAuthoringLine,
    replacePdgviewAuthoringLineById,
    normalizePdgviewTimelineAddType,
    getPdgviewTimelineEditKindTitle,
    formatPdgviewTimeLabel,
    formatPdgviewTimeInputValue,
    clampPdgviewTimelineSpan,
    getPdgviewGraphicOverlayLabel,
    getPdgviewMediaOverlayLabel,
    normalizePdgviewGraphicOverlayDraft,
    getNextPdgviewGraphicOverlayId,
    getPdgviewGraphicDefaultTarget,
    getPdgviewGraphicOverlayDraftIndexById,
    findPdgviewTimelineOverlap,
    showPdgviewStatus: setPdgviewStatus,
    upsertPdgviewGraphicOverlayDraft: upsertPdgviewGraphicOverlayDraftState,
    removePdgviewGraphicOverlayDraftById: removePdgviewGraphicOverlayDraftByIdState,
    closePdgviewAssemblyMenu,
    renderPdgviewJsonPreview,
    encodePdgviewGraphicTargetValue,
    getPdgviewGraphicTargetEntries,
    decodePdgviewGraphicTargetValue,
    pdgviewMediaAssetDirectories,
    sanitizePdgviewMediaSource,
    getPdgviewMediaDefaultRect,
  });
}

function removePdgviewPathPoint(pointIndex) {
  if (!Number.isInteger(pointIndex) || pointIndex < 0 || pointIndex >= pdgviewPathState.points.length) {
    return;
  }
  mutatePdgviewPathStateState((pathState) => {
    pathState.points.splice(pointIndex, 1);
  });
  setPdgviewSelectedPointIndexState(
    pdgviewPathState.points.length > 0
      ? Math.min(pointIndex, pdgviewPathState.points.length - 1)
      : null
  );
  persistPdgviewPathStateToSelectedAssembly();
  rebuildPdgviewControlPoints();
  updatePdgviewPathGeometry();
}

function openPdgviewPathPointMenuAt(clientX, clientY, pointIndex) {
  openPdgviewPathPointMenu({
    menu: pdgviewAssemblyMenu,
    clientX,
    clientY,
    pointIndex,
    getSelectedAssemblyLetter: getPdgviewSelectedAssemblyLetter,
    setSelectedPointIndex: (value) => {
      setPdgviewSelectedPointIndexState(value);
    },
    resetMenu: resetPdgviewAssemblyMenu,
    cameraFlightState: pdgviewCameraFlightState,
    updatePointMaterials: updatePdgviewPointMaterials,
    updateCameraPoiStatus: updatePdgviewCameraPoiStatus,
    closeMenu: closePdgviewAssemblyMenu,
    THREE,
    pathState: pdgviewPathState,
    vectorFromTriplet,
    addPathPoint: addPdgviewPathPoint,
    renderJsonPreview: renderPdgviewJsonPreview,
    resetPathPoints: resetPdgviewPathPoints,
    removePathPoint: removePdgviewPathPoint,
    positionMenu: positionPdgviewAssemblyMenu,
  });
}

function describePdgviewTimelineState(timeSeconds, documentData) {
  const graphics = getPdgviewGraphicTimelineOverlays(documentData);
  const pauses = Array.isArray(documentData?.scene?.pauses) ? documentData.scene.pauses : [];
  const timeWarps = Array.isArray(documentData?.scene?.timeWarps) ? documentData.scene.timeWarps : [];
  const activeReactionStage = getPdgviewActiveReactionStage(documentData, timeSeconds);
  const activeWarp = timeWarps.find((warp) => timeSeconds >= warp.start && timeSeconds < warp.end);
  const activeGraphic = [...graphics]
    .sort((left, right) => left.start - right.start)
    .filter((graphic) => isPdgviewTimeWithinSpan(timeSeconds, graphic.start, graphic.end))
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
    parts.push(`Pause ${formatPdgviewTimeLabel(activePause.duration)}`);
  }
  if (activeWarp) {
    parts.push(`Warp ${Number(activeWarp.rate ?? 1).toFixed(2)}x`);
  }
  if (activeReactionStage?.label) {
    parts.push(activeReactionStage.label);
  }
  return parts.join(" | ") || "Steady";
}

function getPdgviewActiveReaction(documentData, timeSeconds) {
  const reactions = Array.isArray(documentData?.reactions) ? documentData.reactions : [];
  return (
    reactions.find((reaction) => {
      const start = Number(reaction?.start ?? documentData?.scene?.time?.start ?? 0);
      const end = Number(reaction?.end ?? documentData?.scene?.time?.end ?? start);
      return timeSeconds >= start - 0.001 && timeSeconds <= end + 0.001;
    }) ?? reactions[0] ?? null
  );
}

function getPdgviewActiveReactionStage(documentData, timeSeconds) {
  const activeReaction = getPdgviewActiveReaction(documentData, timeSeconds);
  const stages = Array.isArray(activeReaction?.stages) ? activeReaction.stages : [];
  return (
    stages.find((stage) => {
      const start = Number(stage?.start ?? activeReaction?.start ?? 0);
      const end = Number(stage?.end ?? activeReaction?.end ?? start);
      return timeSeconds >= start - 0.001 && timeSeconds <= end + 0.001;
    }) ?? stages[0] ?? null
  );
}

function getPdgviewReactionParticipantRoleMap(documentData, timeSeconds) {
  const activeReaction = getPdgviewActiveReaction(documentData, timeSeconds);
  const participantMap = new Map();
  const participants = Array.isArray(activeReaction?.participants) ? activeReaction.participants : [];
  participants.forEach((participant) => {
    const assemblyId = String(participant?.assembly ?? "").trim();
    const role = String(participant?.role ?? "").trim().toLowerCase();
    if (assemblyId && role) {
      participantMap.set(assemblyId, role);
    }
  });
  return participantMap;
}

function getPdgviewAssemblyStageEmphasis(assemblyId, documentData, timeSeconds, participantRoleMap = null) {
  const activeStage = getPdgviewActiveReactionStage(documentData, timeSeconds);
  const roleMap = participantRoleMap instanceof Map
    ? participantRoleMap
    : getPdgviewReactionParticipantRoleMap(documentData, timeSeconds);
  const role = roleMap.get(assemblyId) ?? "neutral";
  const action = String(activeStage?.action ?? "").trim().toLowerCase();
  if (!action) {
    return { opacity: 1, scale: 1 };
  }
  if (action === "setup") {
    if (role === "reactant") {
      return { opacity: 1, scale: 1.03 };
    }
    if (role === "product") {
      return { opacity: 0.18, scale: 0.92 };
    }
    return { opacity: 0.35, scale: 0.95 };
  }
  if (action === "mapping") {
    if (role === "reactant") {
      return { opacity: 1, scale: 1.02 };
    }
    if (role === "product") {
      return { opacity: 0.82, scale: 1 };
    }
    return { opacity: 0.6, scale: 0.97 };
  }
  if (action === "associate") {
    if (role === "product") {
      return { opacity: 1, scale: 1.04 };
    }
    if (role === "reactant") {
      return { opacity: 0.24, scale: 0.9 };
    }
    return { opacity: 0.42, scale: 0.95 };
  }
  return { opacity: 1, scale: 1 };
}

function setPdgviewObjectOpacity(object3d, opacityFactor = 1) {
  if (!object3d) {
    return;
  }
  const factor = clamp(Number(opacityFactor) || 0, 0, 1);
  const applyOpacity = (candidate) => {
    const materials = Array.isArray(candidate?.material)
      ? candidate.material
      : candidate?.material
        ? [candidate.material]
        : [];
    materials.forEach((material) => {
      if (!material) {
        return;
      }
      if (typeof material.opacity !== "number") {
        return;
      }
      const baseOpacity =
        Number.isFinite(Number(material.userData?.pdgviewBaseOpacity))
          ? Number(material.userData.pdgviewBaseOpacity)
          : material.opacity;
      if (!material.userData) {
        material.userData = {};
      }
      material.userData.pdgviewBaseOpacity = baseOpacity;
      material.transparent = true;
      material.opacity = clamp(baseOpacity * factor, 0, 1);
    });
  };
  if (typeof object3d.traverse === "function") {
    object3d.traverse((child) => {
      applyOpacity(child);
    });
  } else {
    applyOpacity(object3d);
  }
}

function applyPdgviewStageVisualState(documentData, timeSeconds) {
  const participantRoleMap = getPdgviewReactionParticipantRoleMap(documentData, timeSeconds);
  const stage = getPdgviewActiveReactionStage(documentData, timeSeconds);
  const stageTransferIds = new Set(
    Array.isArray(stage?.transferIds) ? stage.transferIds.filter(Boolean) : []
  );

  pdgviewAssemblyMeshes.forEach((group) => {
    const assemblyId = group?.userData?.assemblyId ?? null;
    const emphasis = getPdgviewAssemblyStageEmphasis(
      assemblyId,
      documentData,
      timeSeconds,
      participantRoleMap
    );
    group.scale.setScalar(emphasis.scale);
    setPdgviewObjectOpacity(group, emphasis.opacity);
  });

  const applyAssemblyOpacityToEntries = (entries = []) => {
    entries.forEach((entry) => {
      const assemblyId = entry?.userData?.assemblyId ?? null;
      const emphasis = getPdgviewAssemblyStageEmphasis(
        assemblyId,
        documentData,
        timeSeconds,
        participantRoleMap
      );
      setPdgviewObjectOpacity(entry, emphasis.opacity);
    });
  };

  applyAssemblyOpacityToEntries(pdgviewShellMeshes);
  applyAssemblyOpacityToEntries(pdgviewEnvelopeMeshes);
  applyAssemblyOpacityToEntries(pdgviewOrbitTraceLines);
  applyAssemblyOpacityToEntries(pdgviewAxisGuideLines);
  applyAssemblyOpacityToEntries(pdgviewOrbitParticleMeshes);
  applyAssemblyOpacityToEntries(pdgviewMemberLabelSprites);

  pdgviewTransferLines.forEach((line) => {
    const transfer = line?.userData?.transfer ?? null;
    const transferId = String(transfer?.id ?? "").trim();
    const stageAction = String(stage?.action ?? "").trim().toLowerCase();
    const isHighlighted = transferId && stageTransferIds.has(transferId);
    if (stageAction === "setup") {
      line.visible = false;
      return;
    }
    line.visible = true;
    line.material.color.set(isHighlighted ? 0xffd17a : 0x948167);
    if (stageAction === "mapping") {
      line.material.opacity = isHighlighted ? 0.9 : 0.08;
      return;
    }
    if (stageAction === "associate") {
      line.material.opacity = isHighlighted ? 0.42 : 0.12;
      return;
    }
    line.material.opacity = isHighlighted ? 0.82 : 0.32;
  });
}

function updatePdgviewAnimatedViewport(timeSeconds) {
  if (!pdgviewCurrentDocument) {
    return;
  }
  pdgviewCurrentViewportFramingState = resolvePdgviewViewportFramingState(
    pdgviewCurrentDocument,
    timeSeconds,
    getPdgviewSceneTimeWindow(pdgviewCurrentDocument)
  );
  const motionTime =
    pdgviewEditorPreviewState.renderMotionTimeOverride != null &&
    Math.abs(timeSeconds - Number(pdgviewEditorPreviewState.renderMotionTimePlayhead ?? NaN)) <= 0.0005
      ? Number(pdgviewEditorPreviewState.renderMotionTimeOverride)
      : getPdgviewIntegratedMotionTime(pdgviewCurrentDocument, timeSeconds);
  const paths = Array.isArray(pdgviewCurrentDocument.paths) ? pdgviewCurrentDocument.paths : [];
  const pathById = new Map(paths.map((path) => [path.id, path]));
  const assemblies = Array.isArray(pdgviewCurrentDocument.assemblies)
    ? pdgviewCurrentDocument.assemblies
    : [];
  const totalMotionDuration = getPdgviewTotalMotionDuration(pdgviewCurrentDocument);
  const normalizedSceneT =
    pdgviewEditorPreviewState.renderMotionProgressOverride != null &&
    Math.abs(timeSeconds - Number(pdgviewEditorPreviewState.renderMotionProgressPlayhead ?? NaN)) <= 0.0005
      ? clamp(Number(pdgviewEditorPreviewState.renderMotionProgressOverride), 0, 1)
      : totalMotionDuration > 0
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
      return computePdgviewAssemblyBasePosition(assembly, index, assemblies.length, pathById);
    }
    stack.add(assembly.id);
    const motions = Array.isArray(assembly.motion)
      ? assembly.motion
      : assembly.motion
        ? [assembly.motion]
        : [];
    const transportMotion = motions.find((motion) => motion?.type === "path.transport");
    let center = computePdgviewAssemblyBasePosition(assembly, index, assemblies.length, pathById);
    if (transportMotion?.pathId && pathById.has(transportMotion.pathId)) {
      const path = pathById.get(transportMotion.pathId);
      const points = Array.isArray(path?.payload?.points) ? path.payload.points : [];
      if (points.length) {
        const motionT = clamp(
          normalizedSceneT * (Number(transportMotion.speed ?? 1) || 1) + Number(transportMotion.phase ?? 0),
          0,
          1
        );
        center = samplePdgviewPointAt(points, motionT, {
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
    const mesh = pdgviewAssemblyMeshes[index];
    if (mesh) {
      mesh.position.copy(center);
    }
  });
  pdgviewAssemblyWorldCenters = new Map(
    [...assemblyCenters.entries()].map(([assemblyId, center]) => [assemblyId, center.clone()])
  );

  pdgviewShellMeshes.forEach((mesh) => {
    const assemblyId = mesh.userData.assemblyId;
    const center = assemblyCenters.get(assemblyId);
    if (center) {
      mesh.position.copy(center);
    }
  });

  pdgviewEnvelopeMeshes.forEach((mesh) => {
    const assemblyId = mesh.userData.assemblyId;
    const center = assemblyCenters.get(assemblyId);
    if (center) {
      mesh.position.copy(center);
    }
  });

  pdgviewOrbitTraceLines.forEach((line) => {
    const assemblyId = line.userData.assemblyId;
    const center = assemblyCenters.get(assemblyId);
    if (center) {
      line.position.copy(center);
    }
  });

  pdgviewAxisGuideLines.forEach((line) => {
    const assemblyId = line.userData.assemblyId;
    const center = assemblyCenters.get(assemblyId);
    if (center) {
      line.position.copy(center);
    }
  });

  pdgviewHistoryTraceLines.forEach((line) => {
    const historyTrace = line.userData.historyTrace;
    const path = historyTrace?.pathId ? pathById.get(historyTrace.pathId) : null;
    const assemblyId = historyTrace?.assemblyId ?? null;
    const assemblyCenter = assemblyId ? assemblyCenters.get(assemblyId) : null;
    const points = Array.isArray(path?.payload?.points) ? path.payload.points : [];
    if (!assemblyCenter || !points.length) {
      line.visible = false;
      return;
    }
    const sampledPoints = samplePdgviewPath(
      points,
      path?.payload?.interpolate ?? "spline",
      !!path?.payload?.closed
    );
    if (!sampledPoints.length) {
      line.visible = false;
      return;
    }
    const currentSample = samplePdgviewPointAt(points, normalizedSceneT, {
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

  pdgviewOrbitParticleMeshes.forEach((mesh) => {
    const assemblyId = mesh.userData.assemblyId;
    const center = assemblyCenters.get(assemblyId);
    const motion = mesh.userData.motion;
    if (!center || motion?.type !== "orbit.circular") {
      return;
    }
    const offset = getPdgviewOrbitOffsetAtTime(motion, mesh.userData.chargeType, motionTime);
    mesh.position.copy(center).add(offset);
  });

  pdgviewMemberLabelSprites.forEach((sprite) => {
    const assemblyId = sprite.userData.assemblyId;
    const memberId = sprite.userData.memberId;
    const anchorPosition = resolvePdgviewTransferEndpointPosition(
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

  pdgviewTransferLines.forEach((line) => {
    const transfer = line.userData.transfer;
    const sourcePoint = resolvePdgviewTransferEndpointPosition(
      transfer?.source,
      assemblyCenters,
      motionTime
    );
    const targetPoint = resolvePdgviewTransferEndpointPosition(
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
    const isActiveByTime = transfer?.t == null || Math.abs(timeSeconds - Number(transfer.t)) <= 0.6;
    line.material.color.set(0xffd17a);
    line.material.opacity = isActiveByTime ? 0.82 : 0.32;
  });

  pdgviewPersonalityHandleMeshes.forEach((mesh) => {
    const assemblyId = mesh?.userData?.assemblyId ?? null;
    const memberId = mesh?.userData?.memberId ?? null;
    const assembly = assemblyId ? assemblyById.get(assemblyId) : null;
    const member = Array.isArray(assembly?.members)
      ? assembly.members.find((entry, index) => getPdgviewMemberId(entry, index) === memberId)
      : null;
    if (!assembly || !member) {
      mesh.visible = false;
      return;
    }
    const slotIndex = Math.max(0, Number(member?.slotIndex ?? 0) || 0);
    const localOffset = getPdgviewPersonalitySlotLocalOffset(assembly, slotIndex);
    mesh.position.copy(localOffset);
    if (mesh.material?.color) {
      mesh.material.color.set(getPdgviewMemberColor(member, slotIndex));
    }
    setPdgviewMemberAnchor(assemblyId, memberId, {
      type: "proxy",
      offset: [localOffset.x, localOffset.y, localOffset.z],
    });
    mesh.visible = true;
  });

  try {
    updatePdgviewGraphicOverlayVisuals(timeSeconds, pdgviewCurrentDocument, assemblyCenters);
  } catch (error) {
    console.error("pdgview graphic overlay update failed.", error);
  }
  updatePdgviewViewportMediaOverlays(timeSeconds, pdgviewCurrentDocument);
  applyPdgviewStageVisualState(pdgviewCurrentDocument, timeSeconds);

  if (pdgviewCameraFlightState.preview && pdgviewCamera) {
    const previewCameraState = getPdgviewAutoscaledCameraState(
      getPdgviewPreviewCameraStateAtTime(timeSeconds),
      pdgviewCurrentDocument,
      assemblyCenters,
      pdgviewCurrentViewportFramingState
    );
    if (previewCameraState) {
      pdgviewCamera.position.copy(previewCameraState.position);
      pdgviewCamera.lookAt(previewCameraState.lookAt);
    }
  } else if (pdgviewCamera && pdgviewViewportModeState.cameraSource === "authored") {
    const authoredCameraState = getPdgviewAutoscaledCameraState(
      getPdgviewDocumentCameraStateAtTime(pdgviewCurrentDocument, timeSeconds),
      pdgviewCurrentDocument,
      assemblyCenters,
      pdgviewCurrentViewportFramingState
    );
    if (authoredCameraState) {
      pdgviewCamera.position.copy(authoredCameraState.position);
      pdgviewCamera.lookAt(authoredCameraState.lookAt);
    }
  }
}

function addPdgviewOrbitTrace(center, motion, color) {
  const radius = Number(motion?.radius ?? 0);
  if (!radius || radius <= 0) {
    return;
  }
  const { u, v } = getPdgviewOrbitBasis(motion);
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
  pdgviewViewportGroup?.add(line);
  pdgviewOrbitTraceLines.push(line);
}

function addPdgviewAxisGuide(center, axisGuide) {
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
  pdgviewViewportGroup?.add(line);
  pdgviewAxisGuideLines.push(line);
}

function addPdgviewShell(center, shell) {
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
  wireframe.userData.isPdgviewShellGuide = true;
  mesh.add(wireframe);
  mesh.position.copy(center);
  mesh.userData.assemblyId = shell?.assemblyId ?? null;
  pdgviewViewportGroup?.add(mesh);
  pdgviewShellMeshes.push(mesh);
}

function addPdgviewEnvelope(center, envelope) {
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
  pdgviewViewportGroup?.add(mesh);
  pdgviewEnvelopeMeshes.push(mesh);
}

function addPdgviewHistoryTrace(historyTrace) {
  if (!pdgviewViewportGroup) {
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
  pdgviewViewportGroup.add(line);
  pdgviewHistoryTraceLines.push(line);
}

function addPdgviewOrbitParticle(center, motion, chargeType, memberId = null) {
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
  pdgviewViewportGroup?.add(mesh);
  pdgviewOrbitParticleMeshes.push(mesh);
}

function addPdgviewTransferLine(transfer) {
  if (!pdgviewViewportGroup) {
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
  pdgviewViewportGroup.add(line);
  pdgviewTransferLines.push(line);
}

function addPdgviewGraphicOverlayVisual(overlay) {
  if (!pdgviewViewportGroup || !overlay?.id) {
    return;
  }
  const group = new THREE.Group();
  group.userData.overlayId = overlay.id;
  group.userData.isPdgviewGraphicOverlay = true;

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

  const textSprite = createPdgviewGraphicOverlayTextSprite(overlay.text, haloRadius);
  textSprite.userData.overlayId = overlay.id;
  textSprite.userData.isPdgviewGraphicHandle = true;
  textSprite.userData.draggable = true;
  const textHitProxy = createPdgviewMarkerHitProxy(Math.max(0.24, haloRadius * 0.84));
  textSprite.userData.hitProxy = textHitProxy;
  textSprite.add(textHitProxy);
  group.add(textSprite);
  pdgviewGraphicOverlayHandleMeshes.push(textSprite);

  group.userData.calloutLine = calloutLine;
  group.userData.textSprite = textSprite;
  group.userData.radius = haloRadius;
  group.userData.textSignature = "";

  pdgviewViewportGroup.add(group);
  pdgviewGraphicOverlayGroups.push(group);
}

function updatePdgviewGraphicOverlayVisuals(timeSeconds, documentData, assemblyCenters = new Map()) {
  const overlayById = new Map(getPdgviewGraphicTimelineOverlays(documentData).map((overlay) => [overlay.id, overlay]));
  pdgviewGraphicOverlayGroups.forEach((group) => {
    const overlayId = group?.userData?.overlayId;
    const overlay = overlayId ? overlayById.get(overlayId) : null;
    if (!overlay) {
      group.visible = false;
      return;
    }
    const isActive = isPdgviewTimeWithinSpan(timeSeconds, overlay.start, overlay.end);
    group.visible = isActive;
    if (!isActive) {
      return;
    }
    const targetPosition =
      resolvePdgviewGraphicTargetPosition(overlay.target, assemblyCenters, documentData) ??
      new THREE.Vector3();
    const offset = vectorFromTriplet(overlay.offset ?? [0, 0, 0]);
    const sphereCenter = targetPosition.clone().add(offset);
    const anchorPosition =
      resolvePdgviewGraphicTargetContactPosition(overlay.target, sphereCenter, assemblyCenters, documentData) ??
      targetPosition;
    group.position.copy(sphereCenter);
    group.userData.anchorPosition = anchorPosition.clone();
    group.userData.radius = Math.max(0.18, Number(overlay.size ?? 0.42) || 0.42);

    const calloutLine = group.userData.calloutLine ?? null;
    const radius = group.userData.radius;
    const textSprite = group.userData.textSprite ?? null;
    const nextSignature = `${overlay.text}|${radius.toFixed(3)}`;
    if (textSprite && group.userData.textSignature !== nextSignature) {
      updatePdgviewGraphicOverlayTextSprite(textSprite, overlay.text, radius);
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

function setPdgviewViewportMediaOverlayFrame(element, rect) {
  if (!element || !rect) {
    return;
  }
  element.style.left = `${rect.x * 100}%`;
  element.style.top = `${rect.y * 100}%`;
  element.style.width = `${rect.width * 100}%`;
  element.style.height = `${rect.height * 100}%`;
}

function clearPdgviewViewportMediaOverlays() {
  pdgviewViewportMediaOverlayElements.forEach((element) => {
    element?.remove?.();
  });
  pdgviewViewportMediaOverlayElements.clear();
}

function createPdgviewViewportMediaOverlayElement(overlay) {
  if (!pdgviewViewportOverlays || !overlay?.id || !(overlay.kind === "image" || overlay.kind === "video")) {
    return null;
  }
  const wrapper = document.createElement("div");
  wrapper.className = "pdgview-media-overlay";
  wrapper.dataset.overlayId = overlay.id;
  wrapper.dataset.overlayKind = overlay.kind;

  const mediaElement = document.createElement(overlay.kind === "video" ? "video" : "img");
  mediaElement.className = "pdgview-media-overlay-media";
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
  handle.className = "pdgview-media-overlay-handle";
  wrapper.appendChild(handle);

  const endInteraction = (event) => {
    const state = wrapper.__pdgviewDragState;
    if (!state || (event && state.pointerId !== event.pointerId)) {
      return;
    }
    wrapper.__pdgviewDragState = null;
    wrapper.classList.remove("is-active");
    if (wrapper.hasPointerCapture?.(state.pointerId)) {
      wrapper.releasePointerCapture(state.pointerId);
    }
    renderPdgviewJsonPreview();
  };

  const startInteraction = (mode, event) => {
    if (event.button !== 0) {
      return;
    }
    const draftOverlay = getPdgviewGraphicOverlayDraftById(overlay.id);
    if (!draftOverlay) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    closePdgviewAssemblyMenu();
    wrapper.classList.add("is-active");
    wrapper.__pdgviewDragState = {
      mode,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startRect: { ...(draftOverlay.rect ?? getPdgviewMediaDefaultRect(draftOverlay.kind)) },
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
    const state = wrapper.__pdgviewDragState;
    if (!state || state.pointerId !== event.pointerId || !pdgviewCanvasWrap) {
      return;
    }
    const draftOverlay = getPdgviewGraphicOverlayDraftById(overlay.id);
    if (!draftOverlay) {
      return;
    }
    event.preventDefault();
    const wrapRect = pdgviewCanvasWrap.getBoundingClientRect();
    const dx = wrapRect.width ? (event.clientX - state.startX) / wrapRect.width : 0;
    const dy = wrapRect.height ? (event.clientY - state.startY) / wrapRect.height : 0;
    if (state.mode === "move") {
      draftOverlay.rect = normalizePdgviewMediaRect({
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
      draftOverlay.rect = normalizePdgviewMediaRect({
        x: state.startRect.x,
        y: state.startRect.y,
        width: nextWidth,
        height: nextHeight,
      }, draftOverlay.kind);
    }
    setPdgviewViewportMediaOverlayFrame(wrapper, draftOverlay.rect);
  });
  wrapper.addEventListener("pointerup", endInteraction);
  wrapper.addEventListener("pointercancel", endInteraction);
  wrapper.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    event.stopPropagation();
    openPdgviewTimelineMenuAt(event.clientX, event.clientY, {
      overlayId: overlay.id,
    });
  });

  pdgviewViewportOverlays.appendChild(wrapper);
  pdgviewViewportMediaOverlayElements.set(overlay.id, wrapper);
  setPdgviewViewportMediaOverlayFrame(wrapper, overlay.rect ?? getPdgviewMediaDefaultRect(overlay.kind));
  return wrapper;
}

function syncPdgviewViewportMediaOverlays(documentData) {
  clearPdgviewViewportMediaOverlays();
  const overlays = getPdgviewViewportMediaTimelineOverlays(documentData);
  overlays.forEach((overlay) => {
    createPdgviewViewportMediaOverlayElement(overlay);
  });
}

function updatePdgviewViewportMediaOverlays(timeSeconds, documentData) {
  const overlays = getPdgviewViewportMediaTimelineOverlays(documentData);
  const overlayById = new Map(overlays.map((overlay) => [overlay.id, overlay]));
  pdgviewViewportMediaOverlayElements.forEach((element, overlayId) => {
    const overlay = overlayById.get(overlayId);
    const mediaElement = element?.querySelector?.(".pdgview-media-overlay-media");
    if (!overlay || !mediaElement) {
      element?.classList.remove("is-visible");
      return;
    }
    setPdgviewViewportMediaOverlayFrame(element, overlay.rect ?? getPdgviewMediaDefaultRect(overlay.kind));
    const isActive = isPdgviewTimeWithinSpan(timeSeconds, overlay.start, overlay.end);
    element.classList.toggle("is-visible", isActive);
    if (!isActive) {
      if (overlay.kind === "video") {
        mediaElement.pause?.();
      }
      return;
    }
    if (overlay.kind === "video") {
      const localTime = Math.max(0, timeSeconds - overlay.start);
      if (!pdgviewPlaybackState.playing || Math.abs((mediaElement.currentTime ?? 0) - localTime) > 0.25) {
        try {
          mediaElement.currentTime = localTime;
        } catch (_error) {
          // Ignore sync failures while metadata is still loading.
        }
      }
      if (pdgviewPlaybackState.playing) {
        mediaElement.play?.().catch?.(() => {});
      } else {
        mediaElement.pause?.();
      }
    }
  });
}

function addPdgviewAssemblyProxy(center, assembly, index) {
  const group = new THREE.Group();
  group.position.copy(center);
  group.userData.assemblyId = assembly?.id ?? null;
  group.userData.assemblyIndex = index;
  group.userData.draggable = true;
  const isBareArchitrino = isPdgviewBareArchitrinoAssembly(assembly);
  let centerMarker = null;

  if (!isBareArchitrino) {
    const sceneRole = normalizePdgviewAssemblySceneRole(assembly?.sceneRole);
    centerMarker = new THREE.Mesh(
      new THREE.SphereGeometry(0.085, 20, 20),
      new THREE.MeshBasicMaterial({
        color: getPdgviewAssemblySceneRoleColor(sceneRole),
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
    const centerLabel = createPdgviewPointLabelSprite(getPdgviewAssemblyViewportLabel(assembly, index));
    centerLabel.position.set(0, 0, 0);
    centerMarker.userData.pointLabelSprite = centerLabel;
    const centerHitProxy = createPdgviewMarkerHitProxy(0.22);
    centerMarker.userData.hitProxy = centerHitProxy;
    centerMarker.add(centerHitProxy);
    centerMarker.add(centerLabel);
    group.add(centerMarker);
  }

  const rawMembers = Array.isArray(assembly?.members) ? assembly.members : [];
  const members = rawMembers.map((member, memberIndex) => ({
    id: getPdgviewMemberId(member, memberIndex),
    position: getPdgviewMemberPosition(member),
  }));
  const memberCount = members.length;
  const hasCore = Array.isArray(assembly?.core?.shells) && assembly.core.shells.length > 0;
  const baseColor = pdgviewPalette[index % Math.max(1, pdgviewPalette.length)] ?? "#6ea8fe";
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
          : getPdgviewProxyMemberOffset(memberIndex, rootMembers.length, baseRadius);
      setPdgviewMemberAnchor(assembly?.id, memberId, {
        type: "proxy",
        offset: [memberOffset.x, memberOffset.y, memberOffset.z],
      });
      if (memberIndex >= visibleRootMembers) {
        return;
      }
      const memberDot = new THREE.Mesh(
        new THREE.SphereGeometry(isBareArchitrino ? 0.052 : 0.03, 12, 10),
        new THREE.MeshBasicMaterial({
          color: getPdgviewMemberColor(memberId, memberIndex),
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
      memberDot.userData.isPdgviewMemberHandle = true;
      const memberHitProxy = createPdgviewMarkerHitProxy(isBareArchitrino ? 0.18 : 0.12);
      memberDot.userData.hitProxy = memberHitProxy;
      memberDot.add(memberHitProxy);
      group.add(memberDot);
      pdgviewMemberHandleMeshes.push(memberDot);
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
      childMesh.userData.subassemblyId = getPdgviewSubassemblyId(child, childIndex);
      childMesh.userData.draggable = true;
      childMesh.userData.isPdgviewSubassemblyHandle = true;
      const childHitProxy = createPdgviewMarkerHitProxy(childRadius + 0.1);
      childMesh.userData.hitProxy = childHitProxy;
      childMesh.add(childHitProxy);
      group.add(childMesh);
      pdgviewSubassemblyHandleMeshes.push(childMesh);
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
          : getPdgviewProxyMemberOffset(memberIndex, childMembers.length, childRadius);
        const memberOffset = childPosition.clone().add(localMemberOffset);
        setPdgviewMemberAnchor(assembly?.id, memberId, {
          type: "proxy",
          offset: [memberOffset.x, memberOffset.y, memberOffset.z],
        });
        if (memberIndex >= visibleChildMembers) {
          return;
        }
        const memberDot = new THREE.Mesh(
          new THREE.SphereGeometry(0.038, 12, 10),
          new THREE.MeshBasicMaterial({
            color: getPdgviewMemberColor(memberId, memberIndex + childIndex),
            transparent: true,
            opacity: 0.95,
          })
        );
        memberDot.position.copy(memberOffset);
        memberDot.userData.assemblyId = assembly?.id ?? null;
        memberDot.userData.memberId = memberId;
        memberDot.userData.subassemblyId = getPdgviewSubassemblyId(child, childIndex);
        memberDot.userData.draggable = true;
        memberDot.userData.isPdgviewMemberHandle = true;
        const childMemberHitProxy = createPdgviewMarkerHitProxy(0.13);
        memberDot.userData.hitProxy = childMemberHitProxy;
        memberDot.add(childMemberHitProxy);
        group.add(memberDot);
        pdgviewMemberHandleMeshes.push(memberDot);
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

    const personalityMembers = getPdgviewPersonalityMembers(assembly);
    personalityMembers.forEach((member, memberIndex) => {
      const memberId = getPdgviewMemberId(member, memberIndex);
      const slotIndex = Math.max(0, Number(member?.slotIndex ?? memberIndex) || 0);
      const localOffset = getPdgviewPersonalitySlotLocalOffset(assembly, slotIndex);
      setPdgviewMemberAnchor(assembly?.id, memberId, {
        type: "proxy",
        offset: [localOffset.x, localOffset.y, localOffset.z],
      });
      const memberDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 14, 12),
        new THREE.MeshBasicMaterial({
          color: getPdgviewMemberColor(member, memberIndex),
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
      memberDot.userData.isPdgviewPersonalityHandle = true;
      const memberHitProxy = createPdgviewMarkerHitProxy(0.16);
      memberDot.userData.hitProxy = memberHitProxy;
      memberDot.add(memberHitProxy);
      group.add(memberDot);
      pdgviewPersonalityHandleMeshes.push(memberDot);
    });

    const binaryMemberIds = new Set();
    const binaries = Array.isArray(assembly?.core?.binaries) ? assembly.core.binaries : [];
    binaries.forEach((_binary, binaryIndex) => {
      const positrinoMemberId = findPdgviewCoreMemberId(assembly?.members, "positrino", binaryIndex);
      const electrinoMemberId = findPdgviewCoreMemberId(assembly?.members, "electrino", binaryIndex);
      if (positrinoMemberId) {
        binaryMemberIds.add(positrinoMemberId);
      }
      if (electrinoMemberId) {
        binaryMemberIds.add(electrinoMemberId);
      }
    });

    const genericCoreMembers = members.filter(
      (memberEntry) =>
        !binaryMemberIds.has(memberEntry.id) &&
        !personalityMembers.some((personalityMember, personalityIndex) =>
          getPdgviewMemberId(personalityMember, personalityIndex) === memberEntry.id
        )
    );
    const genericCoreBaseRadius = Math.max(markerRadius, outerRadius + 0.2);
    genericCoreMembers.forEach((memberEntry, memberIndex) => {
      const memberId = memberEntry.id;
      const localOffset = memberEntry.position
        ? new THREE.Vector3(memberEntry.position[0], memberEntry.position[1], memberEntry.position[2])
        : getPdgviewProxyMemberOffset(memberIndex, genericCoreMembers.length, genericCoreBaseRadius);
      setPdgviewMemberAnchor(assembly?.id, memberId, {
        type: "proxy",
        offset: [localOffset.x, localOffset.y, localOffset.z],
      });
      const memberDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 12, 10),
        new THREE.MeshBasicMaterial({
          color: getPdgviewMemberColor(memberId, memberIndex),
          transparent: true,
          opacity: 0.95,
          depthTest: false,
          depthWrite: false,
        })
      );
      memberDot.position.copy(localOffset);
      memberDot.renderOrder = 15;
      memberDot.userData.assemblyId = assembly?.id ?? null;
      memberDot.userData.memberId = memberId;
      memberDot.userData.draggable = true;
      memberDot.userData.isPdgviewMemberHandle = true;
      const memberHitProxy = createPdgviewMarkerHitProxy(0.14);
      memberDot.userData.hitProxy = memberHitProxy;
      memberDot.add(memberHitProxy);
      group.add(memberDot);
      pdgviewMemberHandleMeshes.push(memberDot);
    });
  }

  pdgviewViewportGroup?.add(group);
  pdgviewAssemblyMeshes.push(group);
}

function addPdgviewDocumentCameraVisuals(documentData) {
  if ((pdgviewCameraFlightState?.waypoints?.length ?? 0) > 0) {
    return;
  }
  const cameraPaths = Array.isArray(documentData?.cameraPaths) ? documentData.cameraPaths : [];
  const pathById = new Map(cameraPaths.map((path) => [path.id, path]));
  const activeCameraPathId = getPdgviewActiveCameraPathId(
    documentData,
    pdgviewPlaybackState.playheadSeconds,
    getPdgviewSceneTimeWindow(documentData)
  );
  const cameraPath = activeCameraPathId ? pathById.get(activeCameraPathId) : null;
  const waypoints = Array.isArray(cameraPath?.waypoints) ? cameraPath.waypoints : [];
  if (!waypoints.length || !pdgviewViewportGroup) {
    return;
  }

  const pathPoints = samplePdgviewCurvePoints(
    waypoints.map((waypoint) => {
      const visiblePosition = getPdgviewCameraWaypointDisplayPosition(waypoint);
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
    pdgviewDocumentCameraPathLine = new THREE.Line(geometry, material);
    pdgviewDocumentCameraPathLine.renderOrder = 9;
    pdgviewDocumentCameraPathLine.computeLineDistances();
    pdgviewViewportGroup.add(pdgviewDocumentCameraPathLine);
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
    marker.position.copy(getPdgviewCameraWaypointDisplayPosition(waypoint));
    marker.renderOrder = 9;
    pdgviewViewportGroup.add(marker);
    pdgviewDocumentCameraWaypointMeshes.push(marker);
  });
}

function updatePdgviewViewportFromDocument(documentData) {
  const previousDocument = pdgviewCurrentDocument;
  const previousSceneId = pdgviewCurrentDocument?.scene?.id ?? null;
  const previousPlaybackPlaying = pdgviewPlaybackState.playing;
  const shouldPreserveRenderedMotionTime =
    previousDocument &&
    previousSceneId &&
    previousSceneId === (documentData?.scene?.id ?? null);
  const previousMotionTime = shouldPreserveRenderedMotionTime
    ? getPdgviewIntegratedMotionTime(previousDocument, pdgviewPlaybackState.playheadSeconds)
    : null;
  const previousMotionProgress = shouldPreserveRenderedMotionTime
    ? getPdgviewMotionProgress(previousDocument, pdgviewPlaybackState.playheadSeconds)
    : null;
  pdgviewCurrentDocument = documentData;
  if (!pdgviewViewportGroup || !pdgviewPathGeometry) {
    return;
  }

  rebuildPdgviewPathDisplayFromDocument(documentData);
  clearPdgviewViewportVisuals();

  const paths = Array.isArray(documentData?.paths) ? documentData.paths : [];
  const pathById = new Map(paths.map((path) => [path.id, path]));
  const assemblies = Array.isArray(documentData?.assemblies) ? documentData.assemblies : [];
  assemblies.forEach((assembly, index) => {
    const center = computePdgviewAssemblyBasePosition(assembly, index, assemblies.length, pathById);
    addPdgviewAssemblyProxy(center, assembly, index);

    const hasCore = Array.isArray(assembly?.core?.shells) && assembly.core.shells.length > 0;
    if (!hasCore) {
      return;
    }

    const shells = Array.isArray(assembly?.core?.shells) ? assembly.core.shells : [];
    shells.forEach((shell) => {
      addPdgviewShell(center, {
        ...shell,
        assemblyId: assembly.id,
      });
      const shellMesh = pdgviewShellMeshes[pdgviewShellMeshes.length - 1] ?? null;
      if (shellMesh) {
        shellMesh.userData.assemblyId = assembly.id;
      }
    });

    const binaries = Array.isArray(assembly?.core?.binaries) ? assembly.core.binaries : [];
    binaries.forEach((binary, binaryIndex) => {
      if (binary?.motion?.type === "orbit.circular") {
        const positrinoMemberId = findPdgviewCoreMemberId(assembly?.members, "positrino", binaryIndex);
        const electrinoMemberId = findPdgviewCoreMemberId(assembly?.members, "electrino", binaryIndex);
        if (positrinoMemberId) {
          setPdgviewMemberAnchor(assembly.id, positrinoMemberId, {
            type: "orbit",
            motion: binary.motion,
            chargeType: "positrino",
          });
        }
        if (electrinoMemberId) {
          setPdgviewMemberAnchor(assembly.id, electrinoMemberId, {
            type: "orbit",
            motion: binary.motion,
            chargeType: "electrino",
          });
        }
        addPdgviewOrbitParticle(center, binary.motion, "positrino", positrinoMemberId);
        addPdgviewOrbitParticle(center, binary.motion, "electrino", electrinoMemberId);
        const particleCount = pdgviewOrbitParticleMeshes.length;
        if (pdgviewOrbitParticleMeshes[particleCount - 1]) {
          pdgviewOrbitParticleMeshes[particleCount - 1].userData.assemblyId = assembly.id;
        }
        if (pdgviewOrbitParticleMeshes[particleCount - 2]) {
          pdgviewOrbitParticleMeshes[particleCount - 2].userData.assemblyId = assembly.id;
        }
      }
    });
  });
  const historyTraces = Array.isArray(documentData?.historyTraces) ? documentData.historyTraces : [];
  historyTraces.forEach((historyTrace) => {
    addPdgviewHistoryTrace(historyTrace);
  });
  const envelopes = Array.isArray(documentData?.envelopes) ? documentData.envelopes : [];
  envelopes.forEach((envelope) => {
    const assemblyIndex = assemblies.findIndex((assembly) => assembly?.id === envelope?.assemblyId);
    const center =
      assemblyIndex >= 0
        ? computePdgviewAssemblyBasePosition(assemblies[assemblyIndex], assemblyIndex, assemblies.length, pathById)
        : new THREE.Vector3();
    addPdgviewEnvelope(center, envelope);
  });
  const transfers = Array.isArray(documentData?.transfers) ? documentData.transfers : [];
  transfers.forEach((transfer) => {
    addPdgviewTransferLine(transfer);
  });
  const graphicOverlays = getPdgviewGraphicTimelineOverlays(documentData);
  graphicOverlays.forEach((overlay) => {
    try {
      addPdgviewGraphicOverlayVisual(overlay);
    } catch (error) {
      console.error("pdgview graphic overlay setup failed.", overlay?.id, error);
    }
  });
  syncPdgviewViewportMediaOverlays(documentData);
  addPdgviewDocumentCameraVisuals(documentData);
  applyPdgviewViewportDisplayState();

  const timeWindow = getPdgviewSceneTimeWindow(documentData);
  if (pdgviewPlaybackState.playheadSeconds < timeWindow.start || previousSceneId !== documentData?.scene?.id) {
    pdgviewPlaybackState.playheadSeconds = timeWindow.start;
    clearPdgviewEditorPreviewState();
  } else if (shouldPreserveRenderedMotionTime && previousMotionTime != null) {
    pdgviewPlaybackState.playheadSeconds = clamp(
      pdgviewPlaybackState.playheadSeconds,
      timeWindow.start,
      timeWindow.end
    );
    pdgviewEditorPreviewState.renderMotionTimeOverride = previousMotionTime;
    pdgviewEditorPreviewState.renderMotionTimePlayhead = pdgviewPlaybackState.playheadSeconds;
    pdgviewEditorPreviewState.renderMotionProgressOverride = previousMotionProgress;
    pdgviewEditorPreviewState.renderMotionProgressPlayhead = pdgviewPlaybackState.playheadSeconds;
  } else {
    pdgviewPlaybackState.playheadSeconds = clamp(
      pdgviewPlaybackState.playheadSeconds,
      timeWindow.start,
      timeWindow.end
    );
    clearPdgviewEditorPreviewState();
  }
  pdgviewPlaybackState.playing = previousPlaybackPlaying;
  pdgviewPlaybackState.lastTickMs = 0;
  renderPdgviewTimeline(documentData);
  updatePdgviewAnimatedViewport(pdgviewPlaybackState.playheadSeconds);
  updatePdgviewTimelinePlayhead(pdgviewPlaybackState.playheadSeconds, documentData);
}

function updatePdgviewCameraFlightDisplay() {
  if (!pdgviewFrameGroup) {
    return;
  }
  if (!pdgviewCameraFlightGroup) {
    pdgviewCameraFlightGroup = new THREE.Group();
    pdgviewCameraFlightGeometry = new THREE.BufferGeometry();
    pdgviewCameraFlightLine = new THREE.Line(
      pdgviewCameraFlightGeometry,
      new THREE.LineBasicMaterial({
        color: 0x7fe7cb,
        transparent: true,
        opacity: 0.95,
        depthTest: false,
        depthWrite: false,
      })
    );
    pdgviewCameraFlightLine.renderOrder = 10;
    pdgviewCameraFlightGroup.add(pdgviewCameraFlightLine);
    pdgviewFrameGroup.add(pdgviewCameraFlightGroup);
    pdgviewCameraWaypointGeometry = new THREE.SphereGeometry(0.085, 18, 18);
    pdgviewCameraWaypointMaterial = new THREE.MeshBasicMaterial({
      color: 0x7fe7cb,
      transparent: true,
      opacity: 0.95,
      depthTest: false,
      depthWrite: false,
    });
  }

  pdgviewCameraWaypointMeshes.forEach((mesh) => {
    disposePdgviewMarkerHandle(mesh, "labelSprite");
    pdgviewCameraFlightGroup.remove(mesh);
  });
  pdgviewCameraWaypointMeshes = [];

  const displayPoints = pdgviewCameraFlightState.waypoints.map((waypoint) =>
    getPdgviewCameraWaypointDisplayPosition(waypoint)
  );
  const curvePoints =
    displayPoints.length >= 2
      ? samplePdgviewCurvePoints(
          displayPoints.map((point) => [point.x, point.y, point.z]),
          Math.max(20, displayPoints.length * 18)
        )
      : displayPoints;
  pdgviewCameraFlightGeometry.setFromPoints(curvePoints.length ? curvePoints : []);

  if (displayPoints.length && pdgviewCameraWaypointGeometry && pdgviewCameraWaypointMaterial) {
    displayPoints.forEach((point) => {
      const marker = new THREE.Mesh(
        pdgviewCameraWaypointGeometry,
        pdgviewCameraWaypointMaterial.clone()
      );
      marker.position.copy(point);
      marker.renderOrder = 12;
      marker.userData.cameraWaypointIndex = pdgviewCameraWaypointMeshes.length;
      const labelSprite = createPdgviewCameraWaypointLabelSprite(`🎥${pdgviewCameraWaypointMeshes.length + 1}`);
      labelSprite.position.set(0, 0, 0);
      marker.userData.labelSprite = labelSprite;
      const hitProxy = createPdgviewMarkerHitProxy(0.19);
      marker.userData.hitProxy = hitProxy;
      marker.add(hitProxy);
      marker.add(labelSprite);
      pdgviewCameraFlightGroup.add(marker);
      pdgviewCameraWaypointMeshes.push(marker);
    });
  }
  updatePdgviewCameraWaypointMaterials(pdgviewSelectedCameraWaypointIndex);
  applyPdgviewViewportDisplayState();
}

function onPdgviewTimelineClick(event) {
  const timelineBand = event.target.closest?.(".pdgview-timeline-band") ?? null;
  if (!timelineBand) {
    return;
  }
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
const pdgviewScenePath = PDGVIEW_SCENE_PATH;
const pdgviewSceneId = "pdgview";
const pdgviewPreviewSceneId = "pdgview_preview";
const pdgviewPreviewScenePath = "__pdgview_preview__";
const pdgviewDocsPath =
  "reference/priorities/pdg/pdgview.md";
const appMode = getPdgviewAppMode(globalThis.window);
const isStandalonePdgviewApp = isStandalonePdgviewAppMode(appMode);
const standaloneNavigatorHref = STANDALONE_PDGVIEW_NAVIGATOR_HREF;

function isPdgviewOverlaySceneId(sceneId = "") {
  return sceneId === pdgviewSceneId || sceneId === pdgviewPreviewSceneId;
}

function shouldHideLevelForPdgviewOverlayScene(sceneId = "") {
  return sceneId === pdgviewSceneId;
}
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

const pdgviewFrameState = {
  rotation: new THREE.Euler(0, 0, 0, "YXZ"),
  scale: 1,
};
let pdgviewFrameEditMode = false;
const pdgviewCameraState = {
  position: new THREE.Vector3(0, 2.6, 6.5),
  speed: 1,
};
const pdgviewCameraOrbitState = {
  target: new THREE.Vector3(),
  minDistance: 0.3,
  maxDistance: 2000,
  radius: 1,
  theta: 0,
  phi: Math.PI / 2,
};
const pdgviewCameraFlightState = {
  waypoints: [],
  poiMode: "origin",
  preview: false,
  savedPosition: new THREE.Vector3(),
  savedTarget: new THREE.Vector3(),
};
let pdgviewSelectedCameraWaypointIndex = null;
const pdgviewDragState = {
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
};
let pdgviewRenderer = null;
let pdgviewScene = null;
let pdgviewCamera = null;
let pdgviewFrameGroup = null;
let pdgviewViewportGroup = null;
let pdgviewPathLine = null;
let pdgviewPathGeometry = null;
let pdgviewBackgroundPathLines = [];
let pdgviewBackgroundPathMarkers = [];
let pdgviewPointMeshes = [];
let pdgviewPointGeometry = null;
let pdgviewPointMaterial = null;
let pdgviewPointMaterialActive = null;
let pdgviewRaycaster = null;
let pdgviewNeedsResize = false;
let pdgviewCameraFlightGroup = null;
let pdgviewCameraFlightLine = null;
let pdgviewCameraFlightGeometry = null;
let pdgviewCameraWaypointMeshes = [];
let pdgviewCameraWaypointGeometry = null;
let pdgviewCameraWaypointMaterial = null;
let pdgviewAssemblyMeshes = [];
let pdgviewMemberHandleMeshes = [];
let pdgviewPersonalityHandleMeshes = [];
let pdgviewSubassemblyHandleMeshes = [];
let pdgviewAssemblyWorldCenters = new Map();
let pdgviewShellMeshes = [];
let pdgviewEnvelopeMeshes = [];
let pdgviewOrbitTraceLines = [];
let pdgviewHistoryTraceLines = [];
let pdgviewTransferLines = [];
let pdgviewAxisGuideLines = [];
let pdgviewOrbitParticleMeshes = [];
let pdgviewMemberLabelSprites = [];
let pdgviewGraphicOverlayGroups = [];
let pdgviewGraphicOverlayHandleMeshes = [];
let pdgviewViewportMediaOverlayElements = new Map();
let pdgviewDocumentCameraPathLine = null;
let pdgviewDocumentCameraWaypointMeshes = [];
let pdgviewDocumentCameraShotMesh = null;
let pdgviewDocumentCameraTargetMesh = null;
let pdgviewDocumentCameraLookLine = null;
let pdgviewCurrentViewportFramingState = null;
const pdgviewPlaybackTimelineRuntime = createPdgviewPlaybackTimelineRuntime({
  THREE,
  documentLike: document,
  clampFn: clamp,
  formatTimeLabel: formatPdgviewTimeLabel,
  getSceneTimeWindow: getPdgviewSceneTimeWindow,
  getTimelineFraction: getPdgviewTimelineFraction,
  getGraphicEnd: getPdgviewGraphicEnd,
  getGraphicOverlayLabel: getPdgviewGraphicOverlayLabel,
  getMediaOverlayLabel: getPdgviewMediaOverlayLabel,
  getGraphicTimelineOverlays: (...args) => getPdgviewGraphicTimelineOverlays(...args),
  getViewportMediaTimelineOverlays: (...args) => getPdgviewViewportMediaTimelineOverlays(...args),
  setTransportButtonIcon: (...args) => setPdgviewTransportButtonIcon(...args),
  updateAnimatedViewport: (...args) => updatePdgviewAnimatedViewport(...args),
  applyViewportDisplayState: () => applyPdgviewViewportDisplayState(),
  getCurrentDocument: () => pdgviewCurrentDocument,
  getPlaybackState: () => pdgviewPlaybackState,
  getEditorPreviewState: () => pdgviewEditorPreviewState,
  getViewportModeState: () => pdgviewViewportModeState,
  clearTimelineLayer: (...args) => clearPdgviewTimelineLayer(...args),
  createTimelineBand: (...args) => createPdgviewTimelineBand(...args),
  dom: {
    viewDesignButton: pdgviewViewDesignButton,
    viewAuthoredButton: pdgviewViewAuthoredButton,
    markerJumpSelect: pdgviewMarkerJumpSelect,
    markerPrevButton: pdgviewMarkerPrevButton,
    markerNextButton: pdgviewMarkerNextButton,
    timelineTrack: pdgviewTimelineTrack,
    timelineWarps: pdgviewTimelineWarps,
    timelinePauses: pdgviewTimelinePauses,
    timelineMarkers: pdgviewTimelineMarkers,
    timelinePlayhead: pdgviewTimelinePlayhead,
    playheadScrubInput: pdgviewPlayheadScrubInput,
    timelineSummary: pdgviewTimelineSummary,
    playToggleButton: pdgviewPlayToggleButton,
  },
});
const {
  renderPdgviewTimeline,
  updatePdgviewTimelinePlayhead,
  clearPdgviewEditorPreviewState,
  updatePdgviewViewportModeButtons,
  setPdgviewViewportCameraSource,
  setPdgviewPlaybackPlayhead,
  startPdgviewPlayback,
  togglePdgviewPlayback,
  restartPdgviewPlayback,
  jumpToPdgviewMarker,
  jumpPdgviewMarkerByOffset,
  scrubPdgviewPlayback,
  updatePdgviewPlaybackState,
  syncPdgviewMarkerNavigation,
  getPdgviewSortedMarkers,
} = pdgviewPlaybackTimelineRuntime;
const pdgviewViewportRenderRuntime = createPdgviewViewportRenderRuntime({
  THREE,
  clampFn: clamp,
  readNumberInput,
  formatScaleLabel,
  getEffectiveFrameScale: () => getPdgviewEffectiveFrameScale(),
  getOrbitTargetWorld: () => getPdgviewOrbitTargetWorld(),
  updatePathMarkerScales: () => updatePdgviewPathMarkerScales(),
  updatePathPointInfoPill: () => updatePdgviewPathPointInfoPill(),
  hidePathPointInfoPill: () => hidePdgviewPathPointInfoPill(),
  updateTimelinePlayhead: (...args) => updatePdgviewTimelinePlayhead(...args),
  updateAnimatedViewport: (...args) => updatePdgviewAnimatedViewport(...args),
  updatePlaybackState: (...args) => updatePdgviewPlaybackState(...args),
  getRenderer: () => pdgviewRenderer,
  getScene: () => pdgviewScene,
  getCanvas: () => pdgviewCanvas,
  getCamera: () => pdgviewCamera,
  getOverlay: () => pdgviewOverlay,
  getFrameGroup: () => pdgviewFrameGroup,
  getFrameState: () => pdgviewFrameState,
  getCameraState: () => pdgviewCameraState,
  getCameraOrbitState: () => pdgviewCameraOrbitState,
  getCameraFlightState: () => pdgviewCameraFlightState,
  getCurrentDocument: () => pdgviewCurrentDocument,
  getNeedsResize: () => pdgviewNeedsResize,
  setNeedsResize: (value) => {
    pdgviewNeedsResize = value;
  },
  dom: {
    frameScaleInput: pdgviewFrameScaleInput,
    frameScaleLabel: pdgviewFrameScaleLabel,
    cameraSpeedInput: pdgviewCameraSpeedInput,
    cameraSpeedLabel: pdgviewCameraSpeedLabel,
  },
});
const {
  resizePdgviewCanvas,
  updatePdgviewFrame,
  applyPdgviewFrameScaleInput,
  updatePdgviewCamera,
  applyPdgviewCameraSpeedInput,
  renderPdgviewCanvas,
} = pdgviewViewportRenderRuntime;
const pdgviewPointerInteractionRuntime = createPdgviewPointerInteractionRuntime({
  THREE,
  clampFn: clamp,
  vectorFromTriplet,
  normalizeAssemblyPathPoints: normalizePdgviewAssemblyPathPoints,
  normalizeMemberPosition: normalizePdgviewMemberPosition,
  isBareArchitrinoAssembly: isPdgviewBareArchitrinoAssembly,
  getAssemblySubassemblyIndex: getPdgviewAssemblySubassemblyIndex,
  setAssemblyMemberPosition: setPdgviewAssemblyMemberPosition,
  setSubassemblyPosition: setPdgviewSubassemblyPosition,
  resolveGraphicTargetPosition: (...args) => resolvePdgviewGraphicTargetPosition(...args),
  getCanvas: () => pdgviewCanvas,
  getCamera: () => pdgviewCamera,
  getRaycaster: () => pdgviewRaycaster,
  getFrameGroup: () => pdgviewFrameGroup,
  getDragState: () => pdgviewDragState,
  getAssemblyWorldCenters: () => pdgviewAssemblyWorldCenters,
  getCurrentDocument: () => pdgviewCurrentDocument,
  getPathState: () => pdgviewPathState,
  getFrameEditMode: () => pdgviewFrameEditMode,
  getFrameState: () => pdgviewFrameState,
  getCameraState: () => pdgviewCameraState,
  getCameraOrbitState: () => pdgviewCameraOrbitState,
  getCameraFlightState: () => pdgviewCameraFlightState,
  getSelectedCameraWaypointIndex: () => pdgviewSelectedCameraWaypointIndex,
  setSelectedCameraWaypointIndex: (value) => {
    pdgviewSelectedCameraWaypointIndex = value;
  },
  getAssemblyDraftsState: getPdgviewAssemblyDraftsState,
  getAssemblyDraftById: getPdgviewAssemblyDraftById,
  getAssemblyDraftIndexById: getPdgviewAssemblyDraftIndexById,
  updateAssemblyDraftByIdState: updatePdgviewAssemblyDraftByIdState,
  getGraphicOverlayDraftById: getPdgviewGraphicOverlayDraftById,
  updateGraphicOverlayDraftByIdState: updatePdgviewGraphicOverlayDraftByIdState,
  getSelectedAssemblyIdState: getPdgviewSelectedAssemblyIdState,
  getSelectedPointIndexState: getPdgviewSelectedPointIndexState,
  setSelectedPointIndexState: setPdgviewSelectedPointIndexState,
  mutatePathStateState: mutatePdgviewPathStateState,
  updatePathPointAtState: updatePdgviewPathPointAtState,
  rebuildControlPoints: () => rebuildPdgviewControlPoints(),
  updatePathGeometry: () => updatePdgviewPathGeometry(),
  updatePointMaterials: (...args) => updatePdgviewPointMaterials(...args),
  updateCameraWaypointMaterials: (...args) => updatePdgviewCameraWaypointMaterials(...args),
  updateCameraFlightDisplay: () => updatePdgviewCameraFlightDisplay(),
  stopCameraFlightPreview: () => stopPdgviewCameraFlightPreview(),
  updateCamera: () => updatePdgviewCamera(),
  updateFrame: () => updatePdgviewFrame(),
  renderJsonPreview: () => renderPdgviewJsonPreview(),
  renderAssemblyEditor: () => renderPdgviewAssemblyEditor(),
  setSelectedAssembly: (...args) => setPdgviewSelectedAssembly(...args),
  clearSelectedPoint: (...args) => clearPdgviewSelectedPoint(...args),
  hideHoverTooltip,
  clearAssemblyHoverTooltipState: () => clearPdgviewAssemblyHoverTooltipState(),
  updateAssemblyHoverTooltip: (...args) => updatePdgviewAssemblyHoverTooltip(...args),
  closeAssemblyMenu: () => closePdgviewAssemblyMenu(),
  openAssemblyPropertiesMenuAt: (...args) => openPdgviewAssemblyPropertiesMenuAt(...args),
  openPersonalitySlotMenuAt: (...args) => openPdgviewPersonalitySlotMenuAt(...args),
  openTimelineMenuAt: (...args) => openPdgviewTimelineMenuAt(...args),
  openPathPointMenuAt: (...args) => openPdgviewPathPointMenuAt(...args),
  openMemberMenuAt: (...args) => openPdgviewMemberMenuAt(...args),
  openSubassemblyMenuAt: (...args) => openPdgviewSubassemblyMenuAt(...args),
  openAssemblyTemplateMenuAt: (...args) => openPdgviewAssemblyTemplateMenuAt(...args),
  openTimelineSummaryMenuAt: (...args) => openPdgviewTimelineSummaryMenuAt(...args),
  getTimelineTimeAtClientX: (...args) => getPdgviewTimelineTimeAtClientX(...args),
  getTimelineTrack: () => pdgviewTimelineTrack,
  resolveIndexedHit: (...args) => resolvePdgviewIndexedHit(...args),
  getPointerNdc: (...args) => getPdgviewPointerNdc(...args),
  resolveAssemblyHit: (...args) => resolvePdgviewAssemblyHit(...args),
  resolveMemberHandleHit: (...args) => resolvePdgviewMemberHandleHit(...args),
  resolveSubassemblyHandleHit: (...args) => resolvePdgviewSubassemblyHandleHit(...args),
  resolveGraphicOverlayHit: (...args) => resolvePdgviewGraphicOverlayHit(...args),
  resolvePersonalityHandleHit: (...args) => resolvePdgviewPersonalityHandleHit(...args),
  resolveAssemblyIdHit: (...args) => resolvePdgviewAssemblyIdHit(...args),
  findShellSurfaceHit: (...args) => findPdgviewShellSurfaceHit(...args),
  shouldPreferCenterMarker: (...args) => shouldPreferPdgviewCenterMarker(...args),
  getAssemblyMeshes: () => pdgviewAssemblyMeshes,
  getPointMeshes: () => pdgviewPointMeshes,
  getMemberHandleMeshes: () => pdgviewMemberHandleMeshes,
  getPersonalityHandleMeshes: () => pdgviewPersonalityHandleMeshes,
  getSubassemblyHandleMeshes: () => pdgviewSubassemblyHandleMeshes,
  getGraphicOverlayHandleMeshes: () => pdgviewGraphicOverlayHandleMeshes,
  getShellMeshes: () => pdgviewShellMeshes,
  getOrbitParticleMeshes: () => pdgviewOrbitParticleMeshes,
  getCameraWaypointMeshes: () => pdgviewCameraWaypointMeshes,
});
const {
  onPdgviewPointerDown,
  onPdgviewContextMenu,
  onPdgviewTimelineContextMenu,
  onPdgviewTimelineSummaryContextMenu,
  onPdgviewPointerMove,
  onPdgviewPointerUp,
  onPdgviewWheel,
} = pdgviewPointerInteractionRuntime;
const pdgviewCanvasBootstrapRuntime = createPdgviewCanvasBootstrapRuntime({
  THREE,
  windowLike: globalThis.window,
  wireCanvasUiListeners: wirePdgviewCanvasUiListeners,
  dom: {
    pdgviewCanvas,
    sceneButton: pdgviewSceneButton,
    saveButton: pdgviewSaveButton,
    cameraPoiSelect: pdgviewCameraPoiSelect,
    assemblyAddButton: pdgviewAssemblyAddButton,
    hudViewportToggleBindings: pdgviewHudViewportToggleBindings,
    timelineTrack: pdgviewTimelineTrack,
    timelineSummary: pdgviewTimelineSummary,
    assemblyMenu: pdgviewAssemblyMenu,
    overlay: pdgviewOverlay,
    playToggleButton: pdgviewPlayToggleButton,
    playResetButton: pdgviewPlayResetButton,
    sceneIdInput: pdgviewSceneIdInput,
  },
  getRenderer: () => pdgviewRenderer,
  setRenderer: (value) => {
    pdgviewRenderer = value;
  },
  setScene: (value) => {
    pdgviewScene = value;
  },
  setCamera: (value) => {
    pdgviewCamera = value;
  },
  setFrameGroup: (value) => {
    pdgviewFrameGroup = value;
  },
  setViewportGroup: (value) => {
    pdgviewViewportGroup = value;
  },
  setPathGeometry: (value) => {
    pdgviewPathGeometry = value;
  },
  setPathLine: (value) => {
    pdgviewPathLine = value;
  },
  setPointGeometry: (value) => {
    pdgviewPointGeometry = value;
  },
  setPointMaterial: (value) => {
    pdgviewPointMaterial = value;
  },
  setPointMaterialActive: (value) => {
    pdgviewPointMaterialActive = value;
  },
  setRaycaster: (value) => {
    pdgviewRaycaster = value;
  },
  getCameraFlightState: () => pdgviewCameraFlightState,
  getAssemblyDraftsState: getPdgviewAssemblyDraftsState,
  operations: {
    setFrameDefaults: () => setPdgviewFrameDefaults(),
    setCameraDefaults: () => setPdgviewCameraDefaults(),
    setTransportButtonIcon: (...args) => setPdgviewTransportButtonIcon(...args),
    getMenuAnchorClientPosition: (...args) => getPdgviewMenuAnchorClientPosition(...args),
    openSceneMenuAt: (...args) => openPdgviewSceneMenuAt(...args),
    openLibraryMenuAt: (...args) => openPdgviewLibraryMenuAt(...args),
    updateCameraPoiStatus: () => updatePdgviewCameraPoiStatus(),
    syncCameraRadiusInput: () => syncPdgviewCameraRadiusInput(),
    ensureAssemblyDrafts: () => ensurePdgviewAssemblyDrafts(),
    appendAssemblyDraftState: (...args) => appendPdgviewAssemblyDraftState(...args),
    createDefaultAssemblyDraft: (...args) => createDefaultPdgviewAssemblyDraft(...args),
    renderAssemblyEditor: () => renderPdgviewAssemblyEditor(),
    renderJsonPreview: () => renderPdgviewJsonPreview(),
    toggleViewportDisplayFlag: (...args) => togglePdgviewViewportDisplayFlag(...args),
    applyViewportDisplayState: () => applyPdgviewViewportDisplayState(),
    onPointerDown: (...args) => onPdgviewPointerDown(...args),
    onPointerMove: (...args) => onPdgviewPointerMove(...args),
    onPointerUp: (...args) => onPdgviewPointerUp(...args),
    onWheel: (...args) => onPdgviewWheel(...args),
    onContextMenu: (...args) => onPdgviewContextMenu(...args),
    onTimelineContextMenu: (...args) => onPdgviewTimelineContextMenu(...args),
    onTimelineClick: (...args) => onPdgviewTimelineClick(...args),
    onTimelineSummaryContextMenu: (...args) => onPdgviewTimelineSummaryContextMenu(...args),
    closeAssemblyMenu: () => closePdgviewAssemblyMenu(),
    openTimelineSummaryMenuAt: (...args) => openPdgviewTimelineSummaryMenuAt(...args),
    addBuiltInAssembly: (...args) => addBuiltInPdgviewAssembly(...args),
    loadPathStateFromSelectedAssembly: () => loadPdgviewPathStateFromSelectedAssembly(),
    refreshLibraryUi: (...args) => refreshPdgviewLibraryUi(...args),
    updateCameraFlightDisplay: () => updatePdgviewCameraFlightDisplay(),
    updateWaypointCount: () => updatePdgviewWaypointCount(),
    updateFrame: () => updatePdgviewFrame(),
    updateCamera: () => updatePdgviewCamera(),
    resizeCanvas: () => resizePdgviewCanvas(),
  },
});
const { initPdgviewCanvas } = pdgviewCanvasBootstrapRuntime;
const pdgviewEditorPreviewState = {
  renderMotionTimeOverride: null,
  renderMotionTimePlayhead: null,
  renderMotionProgressOverride: null,
  renderMotionProgressPlayhead: null,
};
const pdgviewViewportModeState = {
  cameraSource: "design",
};
const pdgviewPlaybackState = {
  playing: false,
  playheadSeconds: 0,
  lastTickMs: 0,
};
let pdgviewSupplementalDraftState = {};

const pdgviewDocumentWorkspaceRuntime = createPdgviewDocumentWorkspaceRuntime({
  documentLike: document,
  storage: globalThis.window?.localStorage ?? null,
  storageKey: "architrino.pdgview.library.v1",
  dom: {
    sceneIdInput: pdgviewSceneIdInput,
    sceneNameInput: pdgviewSceneNameInput,
    sceneDurationInput: pdgviewSceneDurationInput,
    sceneLoopInput: pdgviewSceneLoopInput,
    markerListInput: pdgviewMarkerListInput,
    pauseListInput: pdgviewPauseListInput,
    warpListInput: pdgviewWarpListInput,
    transferListInput: pdgviewTransferListInput,
    librarySelect: pdgviewLibrarySelect,
    libraryLoadButton: pdgviewLibraryLoadButton,
    libraryDeleteButton: pdgviewLibraryDeleteButton,
    libraryStatus: pdgviewLibraryStatus,
    jsonPreview: pdgviewJsonPreview,
    frameScaleInput: pdgviewFrameScaleInput,
    frameScaleLabel: pdgviewFrameScaleLabel,
    cameraSpeedInput: pdgviewCameraSpeedInput,
    cameraSpeedLabel: pdgviewCameraSpeedLabel,
    cameraPoiSelect: pdgviewCameraPoiSelect,
  },
  state: {
    pathState: pdgviewPathState,
    frameState: pdgviewFrameState,
    cameraState: pdgviewCameraState,
    cameraOrbitState: pdgviewCameraOrbitState,
    cameraFlightState: pdgviewCameraFlightState,
    playbackState: pdgviewPlaybackState,
    palette: pdgviewPalette,
  },
  helpers: {
    sanitizeSceneId: sanitizePdgviewId,
    normalizeAssemblyDraft: normalizePdgviewAssemblyDraft,
    normalizeAssemblyPathPoints: normalizePdgviewAssemblyPathPoints,
    formatTransferList: formatPdgviewTransferList,
    normalizeGraphicOverlayList: normalizePdgviewGraphicOverlayList,
    parseTransfers: parsePdgviewTransfers,
    readTimingState: readPdgviewTimingState,
    updateTimingDiagnostics: updatePdgviewTimingDiagnostics,
    formatTimingStatus: formatPdgviewTimingStatus,
    formatScaleLabel,
    clampFn: clamp,
    vectorFromTriplet,
    getTransferListRaw: getPdgviewTransferListRaw,
  },
  operations: {
    ensureAssemblyDrafts: ensurePdgviewAssemblyDrafts,
    persistPathStateToSelectedAssembly: persistPdgviewPathStateToSelectedAssembly,
    renderAssemblyEditor: renderPdgviewAssemblyEditor,
    validateSelectedAssemblyId: validatePdgviewSelectedAssemblyId,
    setSelectedAssembly: setPdgviewSelectedAssembly,
    rebuildControlPoints: rebuildPdgviewControlPoints,
    updatePathGeometry: updatePdgviewPathGeometry,
    updatePointMaterials: updatePdgviewPointMaterials,
    updateFrame: updatePdgviewFrame,
    syncCameraRadiusInput: syncPdgviewCameraRadiusInput,
    stopCameraFlightPreview: stopPdgviewCameraFlightPreview,
    updateCameraFlightDisplay: updatePdgviewCameraFlightDisplay,
    updateWaypointCount: updatePdgviewWaypointCount,
    updateCameraPoiStatus: updatePdgviewCameraPoiStatus,
    updateCamera: updatePdgviewCamera,
    updateViewportFromDocument: updatePdgviewViewportFromDocument,
    renderTimeline: renderPdgviewTimeline,
    updateTimelinePlayhead: updatePdgviewTimelinePlayhead,
    setStatus: setPdgviewStatus,
  },
  accessors: {
    getAssemblyDraftsState: getPdgviewAssemblyDraftsState,
    setAssemblyDraftsState: setPdgviewAssemblyDraftsState,
    updateAssemblyDraftByIdState: updatePdgviewAssemblyDraftByIdState,
    getGraphicOverlayDraftsState: getPdgviewGraphicOverlayDraftsState,
    setGraphicOverlayDraftsState: setPdgviewGraphicOverlayDraftsState,
    getSelectedPointIndexState: getPdgviewSelectedPointIndexState,
    setSelectedPointIndexState: setPdgviewSelectedPointIndexState,
    getSelectedAssemblyIdState: getPdgviewSelectedAssemblyIdState,
    setTransferListRawStateValue: setPdgviewTransferListRawStateValue,
    getSupplementalDraftState: () => pdgviewSupplementalDraftState,
    setSupplementalDraftState: (nextValue) => {
      pdgviewSupplementalDraftState =
        nextValue && typeof nextValue === "object" ? { ...nextValue } : {};
    },
    setCurrentDocument: (documentData) => {
      pdgviewCurrentDocument = documentData;
    },
  },
});

const {
  readPdgviewDraftState,
  getPdgviewLibraryEntries,
  writePdgviewLibraryEntries,
  getPdgviewSortedLibraryEntries,
  refreshPdgviewLibraryUi,
  applyPdgviewDraftState,
  buildPdgviewDocumentData,
  buildPdgviewPreviewData,
  savePdgviewSceneToLibrary,
  loadPdgviewSceneFromLibrary,
  clearPdgviewScene,
  deletePdgviewSceneFromLibrary,
  renderPdgviewJsonPreview,
} = pdgviewDocumentWorkspaceRuntime;

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

function showHoverTooltip(content, x, y, options = {}) {
  if (!hoverTooltip) {
    return;
  }
  hoverTooltip.classList.toggle("is-element-preview", options.variant === "element-preview");
  hoverTooltip.replaceChildren();
  if (content instanceof Node) {
    hoverTooltip.appendChild(content);
  } else {
    hoverTooltip.textContent = String(content ?? "");
  }
  hoverTooltip.classList.add("is-visible");
  hoverTooltip.setAttribute("aria-hidden", "false");

  const padding = 12;
  const rect = hoverTooltip.getBoundingClientRect();
  const offsetX = Number.isFinite(options.offsetX) ? options.offsetX : 0;
  const offsetY = Number.isFinite(options.offsetY) ? options.offsetY : 0;
  let left = x + padding + offsetX;
  let top = y + padding + offsetY;
  if (left + rect.width > window.innerWidth - padding) {
    left = x - rect.width - padding - offsetX;
  }
  if (top + rect.height > window.innerHeight - padding) {
    top = y - rect.height - padding - offsetY;
  }
  const maxTop = window.innerHeight - rect.height - padding;
  const minTop = Number.isFinite(options.minTop)
    ? Math.min(options.minTop, maxTop)
    : padding;
  left = Math.max(padding, Math.min(left, window.innerWidth - rect.width - padding));
  top = Math.max(minTop, Math.min(top, maxTop));
  hoverTooltip.style.left = `${left}px`;
  hoverTooltip.style.top = `${top}px`;
  hoverTooltipVisible = true;
}

function hideHoverTooltip() {
  if (!hoverTooltip || !hoverTooltipVisible) {
    return;
  }
  hoverTooltip.classList.remove("is-visible");
  hoverTooltip.classList.remove("is-element-preview");
  hoverTooltip.setAttribute("aria-hidden", "true");
  hoverTooltip.replaceChildren();
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

function isHydePeriodicLevel(level = currentLevel) {
  return isHydePeriodicTableScene(level);
}

function showZoomToastIfNeeded() {
  if (!zoomToast || hasDismissedZoomToast()) {
    return;
  }
  if (isHydePeriodicLevel()) {
    hideZoomToast();
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

  if (isStandardModelScene(currentLevel) && node.data.category) {
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
  if (
    isStandalonePdgviewApp &&
    navigateStandalonePdgviewHome(globalThis.window?.location, standaloneNavigatorHref)
  ) {
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
  const standaloneAppHref = resolveStandaloneAppHrefForScene(
    config?.sceneId,
    globalThis.window?.location?.href
  );
  if (standaloneAppHref) {
    globalThis.window?.location?.assign(standaloneAppHref);
    return;
  }
  if (scenePath !== currentLevel?.id) {
    recordBrowserBackHistory(options);
  }
  const forceInstantPdgviewEntry = isPdgviewOverlaySceneId(config?.sceneId);
  const shouldHideLevelForPdgview = shouldHideLevelForPdgviewOverlayScene(config?.sceneId);
  if (options.mode === "instant" || forceInstantPdgviewEntry) {
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
    setLevelOpacity(level, shouldHideLevelForPdgview ? 0 : 1);
    setLevelLabelOpacity(level, 0);
    setLevelLinkOpacity(level, shouldHideLevelForPdgview ? 0 : 1);
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
  if (!isAtomContextScene(level)) {
    return false;
  }
  return isAtomicParticleFocusTarget(targetNode);
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

  const standaloneAppHref = resolveStandaloneAppHrefForScene(
    config.sceneId,
    globalThis.window?.location?.href
  );
  if (isPdgviewOverlaySceneId(config.sceneId) || standaloneAppHref) {
    closeDetailPanel();
    hideHoverTooltip();
    markdownRuntime.hideMarkdownPanel();
    await jumpToScene(childLevelId, { mode: "instant" });
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
    appSceneChromeRuntime.updateDetailInfoButton(false, {
      transitionActive: transitionState.active,
    });
    appSceneChromeRuntime.updateDocButton(currentLevel, {
      textbookTocScenePath,
      transitionActive: transitionState.active,
    });
    return;
  }
  if (navUpButton) {
    navUpButton.disabled = browserBackStack.length === 0;
  }
  if (navForwardButton) {
    navForwardButton.disabled = browserForwardStack.length === 0;
  }
  const canReopenInfo = isElementSceneLevel();
  appSceneChromeRuntime.updateSceneInfoTrigger(canReopenInfo);
  appSceneChromeRuntime.updateDetailInfoButton(canReopenInfo, {
    transitionActive: transitionState.active,
  });
  appSceneChromeRuntime.updateDocButton(currentLevel, {
    textbookTocScenePath,
    transitionActive: transitionState.active,
  });
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

function isElementSceneLevel(level = currentLevel) {
  return elementNavigationRuntime.isElementSceneLevel(level);
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

async function ensureElementNavigationData() {
  return await elementNavigationRuntime.ensureData();
}

async function updateElementNavigationUi() {
  return await elementNavigationRuntime.updateUi();
}

function wireElementNavigationControls() {
  elementNavigationRuntime.wireControls();
}

const pdgviewAppRuntime = createPdgviewAppRuntime({
  ui: {
    app,
    pdgviewOverlay,
    pdgviewTabs,
    pdgviewPanels,
    pdgviewSceneId,
    pdgviewPreviewSceneId,
    pdgviewPreviewScenePath,
    pdgviewDocsPath,
    levelConfigs,
    levels,
    initPdgviewCanvas,
    renderPdgviewJsonPreview,
    stopPdgviewCameraFlightPreview,
    showMarkdownPanel: (level) => markdownRuntime.showMarkdownPanel(level),
    readPdgviewDraftState,
    buildPdgviewSceneDocument: buildPdgviewDocumentData,
    buildPdgviewPreviewSceneData: buildPdgviewPreviewData,
    jumpToScene,
    setPdgviewStatus,
    setPdgviewNeedsResize: (value) => {
      pdgviewNeedsResize = value;
    },
  },
  controls: {
    pdgviewTabs,
    pdgviewClearButton,
    pdgviewDocsButton,
    pdgviewExitButton,
    pdgviewPreviewButton,
    pdgviewViewDesignButton,
    pdgviewViewAuthoredButton,
    pdgviewExportButton,
    pdgviewLibrarySaveButton,
    pdgviewRepoSaveButton,
    pdgviewLibrarySelect,
    pdgviewLibraryLoadButton,
    pdgviewLibraryDeleteButton,
    pdgviewPlayToggleButton,
    pdgviewPlayResetButton,
    pdgviewMarkerPrevButton,
    pdgviewMarkerNextButton,
    pdgviewMarkerJumpSelect,
    pdgviewPlayheadScrubInput,
    pdgviewTimelineTrack,
    pdgviewSceneIdInput,
    pdgviewSceneNameInput,
    pdgviewPathModeSelect,
    pdgviewPathResetButton,
    pdgviewFrameResetButton,
    pdgviewFrameScaleInput,
    pdgviewCameraPoiSelect,
    pdgviewCameraWaypointAdd,
    pdgviewCameraWaypointClear,
    pdgviewCameraFlightToggle,
    pdgviewSceneDurationInput,
    pdgviewSceneLoopInput,
    pdgviewMarkerListInput,
    pdgviewPauseListInput,
    pdgviewWarpListInput,
    pdgviewTransferListInput,
    pdgviewCameraSpeedInput,
    pdgviewCameraRadiusInput,
    pdgviewCameraResetButton,
    pdgviewPathState,
    pdgviewCameraFlightState,
    updatePdgviewPathGeometry,
    resetPdgviewPathPoints,
    setPdgviewFrameDefaults,
    updatePdgviewFrame,
    addPdgviewCameraWaypoint,
    clearPdgviewCameraWaypoints,
    stopPdgviewCameraFlightPreview,
    startPdgviewCameraFlightPreview,
    setPdgviewViewportCameraSource,
    applyPdgviewFrameScaleInput,
    applyPdgviewCameraSpeedInput,
    applyPdgviewCameraRadiusInput,
    setPdgviewCameraDefaults,
    updatePdgviewCamera,
    updatePdgviewCameraPoiStatus,
    persistPdgviewPathStateToSelectedAssembly,
    togglePdgviewPlayback,
    restartPdgviewPlayback,
    jumpToPdgviewMarker,
    jumpPdgviewMarkerByOffset,
    scrubPdgviewPlayback,
    renderPdgviewJsonPreview,
    clearPdgviewScene,
    savePdgviewSceneToLibrary,
    loadPdgviewSceneFromLibrary,
    deletePdgviewSceneFromLibrary,
    isTransitionActive: () => transitionState.active,
    exitPdgview: () => {
      if (
        isStandalonePdgviewApp &&
        navigateStandalonePdgviewHome(globalThis.window?.location, standaloneNavigatorHref)
      ) {
        return;
      }
      if (browserBackStack.length > 0) {
        navUpButton?.click();
        return;
      }
      resetToRootScene();
    },
  },
});
const { pdgviewUiRuntime } = pdgviewAppRuntime;

const appSceneChromeRuntime = createAppSceneChromeRuntime({
  sceneLabel,
  docButton,
  archieButton,
  markdownDocButton,
  markdownLayoutToggle,
  detailInfoButton,
});
const elementNavigationChromeRuntime = createElementNavigationChromeRuntime({
  elementNavOverlay,
  elementNavMini,
  elementNavButtons,
});
const elementNavigationRuntime = createElementNavigationRuntime({
  buttons: elementNavButtons,
  mini: elementNavMini,
  chromeRuntime: elementNavigationChromeRuntime,
  periodicTableDataPath,
  elementScenePathPattern,
  periodicTableService,
  sceneGraphManifestService,
  getCurrentLevel: () => currentLevel,
  isTransitionActive: () => transitionState.active,
  closeDetailPanel,
  hideHoverTooltip,
  jumpToScene,
  fetchImpl: (...args) => fetch(...args),
  isSearchOpen: () => sceneSearchRuntime?.isSearchOpen() === true,
  isEditingTextInput,
});

function updateSceneLabel() {
  sceneStateHashService.syncSceneHash(currentLevel?.id ?? null);
  appSceneChromeRuntime.updateSceneLabel(currentLevel);
  appSceneChromeRuntime.updateDocButton(currentLevel, {
    textbookTocScenePath,
    transitionActive: transitionState.active,
  });
  appSceneChromeRuntime.updateArchieButton(currentLevel, {
    archieScenePath,
  });
  appSceneChromeRuntime.updateMarkdownLayoutToggleButton(currentLevel);
  appSceneChromeRuntime.updateMarkdownDocButton(currentLevel);
  pdgviewUiRuntime.updatePdgviewOverlay(currentLevel);
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

  if (currentLevel?.sceneId === pdgviewSceneId) {
    const panelId = pdgviewPanelMap.get(targetNode.data.id ?? "");
    if (panelId) {
      closeDetailPanel();
      hideHoverTooltip();
      pdgviewUiRuntime.setPdgviewPanel(panelId);
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
  renderPdgviewCanvas();
}

function onResize() {
  updateCamera();
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  if (pdgviewRenderer) {
    pdgviewNeedsResize = true;
  }
  if (currentLevel) {
    layoutRootLevel(currentLevel);
    fitCameraToLevel(currentLevel);
  }
}

async function init() {
  closeDetailPanel();
  const requestedSceneState = sceneStateHashService.getSceneStateFromHash();
  const requestedInitialScenePath = isStandalonePdgviewApp
    ? getPdgviewInitialScenePath({
        requestedScenePath: requestedSceneState.scenePath,
        rootScenePath,
      })
    : requestedSceneState.scenePath || rootScenePath;
  const initialScene = await sceneBootstrapService.resolveInitialScene(
    requestedInitialScenePath
  );
  if (!initialScene) {
    return;
  }
  const standaloneInitialHref = resolveStandaloneAppHrefForScene(
    initialScene.config?.sceneId,
    globalThis.window?.location?.href
  );
  if (standaloneInitialHref && typeof globalThis.window?.location?.href === "string") {
    const currentUrl = new URL(globalThis.window.location.href);
    const targetUrl = new URL(standaloneInitialHref);
    if (currentUrl.pathname !== targetUrl.pathname) {
      targetUrl.hash = currentUrl.hash;
      globalThis.window.location.assign(targetUrl.href);
      return;
    }
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
pdgviewAppRuntime.wireListeners();
sceneSearchUiRuntime.wireListeners();
updatePdgviewViewportModeButtons();
window.addEventListener("keydown", (event) => {
  if (
    event.code === "Space" &&
    pdgviewOverlay?.classList.contains("is-open") &&
    !event.defaultPrevented &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.altKey &&
    !isEditingTextInput(event.target)
  ) {
    togglePdgviewPlayback();
    event.preventDefault();
  }
});
wireElementNavigationControls();
ensureElementNavigationData();
