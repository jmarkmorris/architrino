import * as THREE from "./vendor/three/three.module.js";
import { CSS2DRenderer, CSS2DObject } from "./vendor/three/CSS2DRenderer.js";
import { AppDirector } from "./src/director/AppDirector.js";
import { createLevelRuntime } from "./src/runtime/LevelRuntime.js";
import { createMarkdownRuntime } from "./src/runtime/MarkdownRuntime.js";
import { createNodeFactory } from "./src/runtime/NodeFactoryRuntime.js";
import {
  clampComposerTimelineSpan,
  COMPOSER_TIMELINE_MIN_DURATION_SECONDS as composerTimelineMinDurationSeconds,
  getComposerSceneTimeWindow,
  getComposerTimelineFraction,
  getComposerTimelineTimeAtClientX as getComposerTimelineTimeAtClientXRuntime,
} from "./src/runtime/ComposerTimelineRuntime.js";
import {
  composerAssemblyTemplateMenuRows,
  composerTimelineAddTypeEntries,
  composerTimelineAddTypeIds,
  generationTransitions,
} from "./src/runtime/ComposerCatalogRuntime.js";
import {
  encodeComposerGraphicTargetValue,
  getComposerGraphicOverlayLabel,
  getComposerMediaDefaultRect,
  getComposerMediaOverlayLabel,
  getComposerOverlayKind,
} from "./src/runtime/ComposerOverlayRuntime.js";
import {
  buildComposerJsonPreviewMenu,
  buildComposerLibraryMenu,
  buildComposerSceneMenu,
  buildComposerTimelineSummaryMenu,
} from "./src/runtime/ComposerSceneMenuRuntime.js";
import { buildComposerTimelineMenu } from "./src/runtime/ComposerTimelineMenuRuntime.js";
import {
  openComposerAssemblyPropertiesMenu,
  openComposerAssemblyTemplateMenu,
  openComposerMemberMenu,
  openComposerPathPointMenu,
  openComposerPersonalitySlotMenu,
  openComposerSubassemblyMenu,
} from "./src/runtime/ComposerCanvasMenuRuntime.js";
import { createBuiltInComposerAssemblyDraftRuntime } from "./src/runtime/ComposerAssemblyFactoryRuntime.js";
import {
  buildComposerAssemblyStructure,
  formatComposerAssemblyStructureSummary,
  summarizeComposerAssemblyStructure,
} from "./src/runtime/ComposerAssemblyStructureBridgeRuntime.js";
import { splitComposerAssemblyGroup as splitComposerAssemblyGroupRuntime } from "./src/runtime/ComposerAssemblyStructureMutationRuntime.js";
import { createInteractionRuntime } from "./src/runtime/InteractionRuntime.js";
import { createPeriodicOverlayRuntime } from "./src/runtime/PeriodicOverlayRuntime.js";
import { createSceneSearchRuntime } from "./src/runtime/SceneSearchRuntime.js";
import { createElementNavigationChromeRuntime } from "./src/runtime/ElementNavigationChromeRuntime.js";
import { createElementNavigationRuntime } from "./src/runtime/ElementNavigationRuntime.js";
import { createSceneSearchUiRuntime } from "./src/runtime/SceneSearchUiRuntime.js";
import { createScenePanelUiRuntime } from "./src/runtime/ScenePanelUiRuntime.js";
import { createAppShellUiRuntime } from "./src/runtime/AppShellUiRuntime.js";
import { createAppSceneChromeRuntime } from "./src/runtime/AppSceneChromeRuntime.js";
import { wireComposerCanvasUiListeners } from "./src/runtime/ComposerCanvasUiRuntime.js";
import { createComposerHeaderTimestampRuntime } from "./src/runtime/ComposerHeaderTimestampRuntime.js";
import {
  computeComposerViewportAutoscaleCameraState,
  getComposerActiveCameraShot,
  getComposerActiveCameraPathId,
  getComposerViewportAutoscaleTargetIds,
  resolveComposerShotInterval,
  resolveComposerViewportFramingState,
} from "./src/runtime/ComposerViewportFramingRuntime.js";
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
import {
  isAtomContextScene,
  isAtomicParticleFocusTarget,
  isHydePeriodicTableScene,
  isStandardModelScene,
} from "./src/services/SceneCapabilitiesService.js";
import { resolveStandaloneAppHrefForScene } from "./src/apps/navigator/StandaloneAppLaunchRuntime.js";
import {
  COMPOSER_SCENE_PATH,
  STANDALONE_COMPOSER_NAVIGATOR_HREF,
  createComposerAppRuntime,
  createComposerAppStore,
  getComposerAppMode,
  getComposerInitialScenePath,
  isStandaloneComposerAppMode,
  navigateStandaloneComposerHome,
} from "./src/apps/composer/ComposerAppModeRuntime.js";
import {
  COMPOSER_MEDIA_ASSET_DIRECTORIES as composerMediaAssetDirectories,
  COMPOSER_SUPPORTED_MEDIA_EXTENSIONS as composerSupportedMediaExtensions,
  DEFAULT_COMPOSER_ROOT_LAYOUT_MARGIN_PX as defaultRootLayoutMarginPx,
  getComposerDomElements,
} from "./src/apps/composer/ComposerDomRuntime.js";
import {
  createComposerDefaultCoreSpec,
  createComposerDefaultPathPoints,
  createDefaultComposerAssemblyDraft,
  sanitizeComposerEntityId,
  sanitizeComposerId,
} from "./src/apps/composer/ComposerDraftScaffoldRuntime.js";
import {
  formatComposerMemberList,
  formatComposerSubassemblyList,
  getComposerMemberId,
  getComposerMemberPosition,
  getComposerMemberState,
  getComposerSubassemblyId,
  isComposerPersonalityMember,
  normalizeComposerMemberList,
  normalizeComposerMemberPosition,
  normalizeComposerSubassemblyList,
  parseComposerMemberEntry,
  pruneComposerSubassemblyList,
  roundComposerTriplet,
} from "./src/apps/composer/ComposerAssemblyListRuntime.js";
import {
  createComposerGenIFermionPersonalityMembers,
  createComposerPersonalityMembers,
  describeComposerTransferProvenance,
  formatComposerTransferEndpointLabel,
  formatComposerTransferList,
  getComposerBuiltInPersonalityStates,
  getComposerGraphicDefaultOffset,
  sanitizeComposerGraphicTarget,
} from "./src/apps/composer/ComposerAuthoringHelpersRuntime.js";
import { createComposerAssemblyAuthoringRuntime } from "./src/apps/composer/ComposerAssemblyAuthoringRuntime.js";
import { createComposerAssemblyInspectorRuntime } from "./src/apps/composer/ComposerAssemblyInspectorRuntime.js";
import { createComposerAssemblyLabelRuntime } from "./src/apps/composer/ComposerAssemblyLabelRuntime.js";
import { createComposerAuthoringStateRuntime } from "./src/apps/composer/ComposerAuthoringStateRuntime.js";
import { createComposerCanvasBootstrapRuntime } from "./src/apps/composer/ComposerCanvasBootstrapRuntime.js";
import { createComposerCameraPathRuntime } from "./src/apps/composer/ComposerCameraPathRuntime.js";
import { createComposerDraftStateRuntime } from "./src/apps/composer/ComposerDraftStateRuntime.js";
import { createComposerPlaybackTimelineRuntime } from "./src/apps/composer/ComposerPlaybackTimelineRuntime.js";
import { createComposerPointerHitRuntime } from "./src/apps/composer/ComposerPointerHitRuntime.js";
import { createComposerPointerInteractionRuntime } from "./src/apps/composer/ComposerPointerInteractionRuntime.js";
import { createComposerRenderAssetsRuntime } from "./src/apps/composer/ComposerRenderAssetsRuntime.js";
import { createComposerStructureGeometryRuntime } from "./src/apps/composer/ComposerStructureGeometryRuntime.js";
import { createComposerTimelineOverlayRuntime } from "./src/apps/composer/ComposerTimelineOverlayRuntime.js";
import { createComposerDocumentWorkspaceRuntime } from "./src/apps/composer/ComposerDocumentWorkspaceRuntime.js";
import { createComposerViewportDisplayRuntime } from "./src/apps/composer/ComposerViewportDisplayRuntime.js";
import { createComposerViewportOverlayPillRuntime } from "./src/apps/composer/ComposerViewportOverlayPillRuntime.js";
import { createComposerViewportRenderRuntime } from "./src/apps/composer/ComposerViewportRenderRuntime.js";

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
  composerOverlay,
  composerTitle,
  composerViewDesignButton,
  composerViewObserverButton,
  composerSceneButton,
  composerClearButton,
  composerSaveButton,
  composerReactionBackButton,
  composerDocsButton,
  composerExitButton,
  composerTabs,
  composerPanels,
  composerSceneIdInput,
  composerSceneNameInput,
  composerAssemblyList,
  composerAssemblyDetail,
  composerAssemblyAddButton,
  composerPreviewButton,
  composerExportButton,
  composerLibrarySaveButton,
  composerRepoSaveButton,
  composerLibrarySelect,
  composerLibraryLoadButton,
  composerLibraryDeleteButton,
  composerLibraryStatus,
  composerPlayToggleButton,
  composerPlayResetButton,
  composerMarkerPrevButton,
  composerMarkerNextButton,
  composerMarkerJumpSelect,
  composerPlayheadScrubInput,
  composerStatus,
  composerJsonPreview,
  composerCanvas,
  composerCanvasWrap,
  composerViewportOverlays,
  composerAssemblyMenu,
  composerHudLabelsToggle,
  composerHudPathsToggle,
  composerHudHistoryToggle,
  composerHudEnvelopesToggle,
  composerHudObserverToggle,
  composerHudViewportToggleBindings,
  composerPathModeSelect,
  composerPathResetButton,
  composerFrameResetButton,
  composerFrameScaleInput,
  composerFrameScaleLabel,
  composerCameraSpeedInput,
  composerCameraSpeedLabel,
  composerCameraRadiusInput,
  composerCameraRadiusLabel,
  composerCameraResetButton,
  composerCameraPoiSelect,
  composerCameraWaypointAdd,
  composerCameraWaypointClear,
  composerCameraWaypointCount,
  composerCameraPoiStatus,
  composerCameraFlightToggle,
  composerSceneDurationInput,
  composerSceneLoopInput,
  composerMarkerListInput,
  composerPauseListInput,
  composerWarpListInput,
  composerTransferListInput,
  composerMarkerStatus,
  composerPauseStatus,
  composerWarpStatus,
  composerTransferStatus,
  composerTimelineSummary,
  composerTimelineActive,
  composerTimelineTrack,
  composerTimelineWarps,
  composerTimelinePauses,
  composerTimelineMarkers,
  composerTimelinePlayhead,
} = getComposerDomElements(document);
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
let composerCurrentDocument = null;
const {
  panelMap: composerPanelMap,
  palette: composerPalette,
  pathState: composerPathState,
  storeFacade: composerEditorStoreFacade,
} = createComposerAppStore({
  palette: defaultAutoMarkdownPalette,
});
const composerDraftStateRuntime = createComposerDraftStateRuntime({
  storeFacade: composerEditorStoreFacade,
  normalizeAssemblyDraft: normalizeComposerAssemblyDraft,
});
const {
  getAssemblyDraftsState: getComposerAssemblyDraftsState,
  getGraphicOverlayDraftsState: getComposerGraphicOverlayDraftsState,
  getSelectedPointIndexState: getComposerSelectedPointIndexState,
  getSelectedAssemblyIdState: getComposerSelectedAssemblyIdState,
  getPendingTransferSourceState: getComposerPendingTransferSourceState,
  setAssemblyDraftsState: setComposerAssemblyDraftsState,
  appendAssemblyDraftState: appendComposerAssemblyDraftState,
  updateAssemblyDraftByIdState: updateComposerAssemblyDraftByIdState,
  setGraphicOverlayDraftsState: setComposerGraphicOverlayDraftsState,
  upsertGraphicOverlayDraftState: upsertComposerGraphicOverlayDraftState,
  removeGraphicOverlayDraftByIdState: removeComposerGraphicOverlayDraftByIdState,
  updateGraphicOverlayDraftByIdState: updateComposerGraphicOverlayDraftByIdState,
  setSelectedPointIndexState: setComposerSelectedPointIndexState,
  setSelectedAssemblyIdState: setComposerSelectedAssemblyIdState,
  setTransferListRawStateValue: setComposerTransferListRawStateValue,
  updatePathPointAtState: updateComposerPathPointAtState,
  mutatePathStateState: mutateComposerPathStateState,
  getAssemblyDraftIndexById: getComposerAssemblyDraftIndexById,
  getAssemblyDraftById: getComposerAssemblyDraftById,
  ensureAssemblyDrafts: ensureComposerAssemblyDrafts,
  getSelectedAssembly: getComposerSelectedAssembly,
  validateSelectedAssemblyId: validateComposerSelectedAssemblyId,
} = composerDraftStateRuntime;
const composerAssemblyLabelRuntime = createComposerAssemblyLabelRuntime({
  getCurrentDocument: () => composerCurrentDocument,
  getAssemblyDrafts: getComposerAssemblyDraftsState,
  getSelectedAssemblyId: getComposerSelectedAssemblyIdState,
  normalizeMemberList: normalizeComposerMemberList,
  normalizeSubassemblyList: normalizeComposerSubassemblyList,
  getMemberId: getComposerMemberId,
});
const {
  getAssemblyLetter: getComposerAssemblyLetter,
  getPrimaryPathAssemblyLetter: getComposerPrimaryPathAssemblyLetter,
  isBareArchitrinoAssembly: isComposerBareArchitrinoAssembly,
  normalizeAssemblySceneRole: normalizeComposerAssemblySceneRole,
  getAssemblySceneRoleLabel: getComposerAssemblySceneRoleLabel,
  getAssemblySceneRoleGlyph: getComposerAssemblySceneRoleGlyph,
  getAssemblySceneRoleColor: getComposerAssemblySceneRoleColor,
  getAssemblyViewportLabel: getComposerAssemblyViewportLabel,
  getSelectedAssemblyLetter: getComposerSelectedAssemblyLetter,
} = composerAssemblyLabelRuntime;
const composerViewportDisplayRuntime = createComposerViewportDisplayRuntime({
  bindings: composerHudViewportToggleBindings,
});
const {
  isFlagEnabled: isComposerViewportDisplayFlagEnabled,
  setFlag: setComposerViewportDisplayFlag,
  toggleFlag: toggleComposerViewportDisplayFlag,
  updateToggleState: updateComposerHudViewportToggleState,
} = composerViewportDisplayRuntime;
const composerRenderAssetsRuntime = createComposerRenderAssetsRuntime({
  THREE,
  documentLike: document,
});
const {
  createComposerLozengeTexture,
  createComposerPointLabelTexture,
  createComposerMemberLabelTexture,
  createComposerGraphicOverlayTextTexture,
  createComposerGraphicOverlayTextSprite,
  updateComposerGraphicOverlayTextSprite,
  updateComposerPointLabelSprite,
  createComposerPointLabelSprite,
  createComposerCameraWaypointLabelTexture,
  updateComposerCameraWaypointLabelSprite,
  createComposerCameraWaypointLabelSprite,
  createComposerMemberLabelSprite,
  createComposerAssemblyBadgeTexture,
  createComposerAssemblyBadgeSprite,
  createComposerChildBadgeSprite,
} = composerRenderAssetsRuntime;
const composerStructureGeometryRuntime = createComposerStructureGeometryRuntime({
  THREE,
  clampFn: clamp,
  vectorFromTriplet,
  resolveGraphicTargetPosition: (...args) => resolveComposerGraphicTargetPosition(...args),
  getGraphicTargetRadius: (...args) => getComposerAssemblyGraphicTargetRadius(...args),
  normalizeAssemblyPathPoints: normalizeComposerAssemblyPathPoints,
  updateAssemblyDraftByIdState: updateComposerAssemblyDraftByIdState,
  getMemberId: getComposerMemberId,
  getAssemblyWorldCenters: () => composerAssemblyWorldCenters,
  getFrameGroup: () => composerFrameGroup,
  getCamera: () => composerCamera,
  getViewportAutoscaleTargetIds: getComposerViewportAutoscaleTargetIds,
  computeViewportAutoscaleCameraState: computeComposerViewportAutoscaleCameraState,
});
const {
  resolveComposerGraphicTargetContactPosition,
  getComposerProxyMemberOffset,
  clearComposerMemberAnchors,
  setComposerMemberAnchor,
  getComposerOrbitBasis,
  getComposerOrbitOffsetAtTime,
  resolveComposerTransferEndpointPosition,
  findComposerCoreMemberId,
  getComposerPersonalitySlotLocalOffset,
  getComposerAssemblyWorldCenterById,
  shiftComposerPointTriplets,
  rebaseComposerAssemblyParentFrame,
  computeComposerAssemblyBasePosition,
  sampleComposerPointAt,
  sampleComposerCurvePoints,
  getComposerAutoscaledCameraState,
} = composerStructureGeometryRuntime;
const composerCameraPathRuntime = createComposerCameraPathRuntime({
  THREE,
  clampFn: clamp,
  formatScaleLabel,
  vectorFromTriplet,
  createDefaultPathPoints: createComposerDefaultPathPoints,
  getSelectedAssembly: getComposerSelectedAssembly,
  getSelectedAssemblyLetter: getComposerSelectedAssemblyLetter,
  getSelectedPointIndexState: getComposerSelectedPointIndexState,
  setSelectedPointIndexState: setComposerSelectedPointIndexState,
  getPathState: () => composerPathState,
  mutatePathStateState: mutateComposerPathStateState,
  persistPathStateToSelectedAssembly: () => persistComposerPathStateToSelectedAssembly(),
  rebuildControlPoints: () => rebuildComposerControlPoints(),
  updatePathGeometry: () => updateComposerPathGeometry(),
  getCameraFlightState: () => composerCameraFlightState,
  getCameraWaypointMeshes: () => composerCameraWaypointMeshes,
  getCamera: () => composerCamera,
  getCanvas: () => composerCanvas,
  getBackgroundPathMarkers: () => composerBackgroundPathMarkers,
  getPointMeshes: () => composerPointMeshes,
  getPointMaterial: () => composerPointMaterial,
  getPointMaterialActive: () => composerPointMaterialActive,
  updatePointLabelSprite: (...args) => updateComposerPointLabelSprite(...args),
  updateCameraWaypointLabelSprite: (...args) =>
    updateComposerCameraWaypointLabelSprite(...args),
  getCameraOrbitState: () => composerCameraOrbitState,
  getCameraState: () => composerCameraState,
  updateCamera: () => updateComposerCamera(),
  getFrameGroup: () => composerFrameGroup,
  getSelectedCameraWaypointIndex: () => composerSelectedCameraWaypointIndex,
  setSelectedCameraWaypointIndex: (value) => {
    composerSelectedCameraWaypointIndex = value;
  },
  updateCameraFlightDisplay: () => updateComposerCameraFlightDisplay(),
  renderJsonPreview: () => renderComposerJsonPreview(),
  getFrameState: () => composerFrameState,
  dom: {
    frameScaleInput: composerFrameScaleInput,
    frameScaleLabel: composerFrameScaleLabel,
    cameraSpeedInput: composerCameraSpeedInput,
    cameraSpeedLabel: composerCameraSpeedLabel,
    cameraRadiusInput: composerCameraRadiusInput,
    cameraRadiusLabel: composerCameraRadiusLabel,
    cameraPoiStatus: composerCameraPoiStatus,
    cameraWaypointCount: composerCameraWaypointCount,
    cameraFlightToggle: composerCameraFlightToggle,
    pathModeSelect: composerPathModeSelect,
  },
});
const {
  setComposerFrameDefaults,
  setComposerCameraDefaults,
  updateComposerWaypointCount,
  updateComposerCameraWaypointMaterials,
  updateComposerCameraPoiStatus,
  getComposerOrbitTargetWorld,
  updateComposerOrbitFromPosition,
  syncComposerCameraRadiusInput,
  applyComposerCameraRadiusInput,
  addComposerCameraWaypoint,
  clearComposerCameraWaypoints,
  resetComposerPathPoints,
  addComposerPathPoint,
  updateComposerPointMaterials,
  updateComposerPathMarkerScales,
  sampleComposerCameraWaypointState,
  getComposerCameraWaypointDisplayPosition,
  startComposerCameraFlightPreview,
  stopComposerCameraFlightPreview,
} = composerCameraPathRuntime;
const composerViewportOverlayPillRuntime = createComposerViewportOverlayPillRuntime({
  THREE,
  documentLike: document,
  HTMLInputElementCtor: globalThis.HTMLInputElement,
  clampFn: clamp,
  samplePath: sampleComposerPath,
  formatTimeLabel: formatComposerTimeLabel,
  getPlaybackTimeForMotionProgress: (...args) =>
    getComposerPlaybackTimeForMotionProgress(...args),
  getViewportOverlays: () => composerViewportOverlays,
  getCanvasWrap: () => composerCanvasWrap,
  getCamera: () => composerCamera,
  getFrameGroup: () => composerFrameGroup,
  getOverlay: () => composerOverlay,
  getCameraFlightState: () => composerCameraFlightState,
  getViewportModeState: () => composerViewportModeState,
  getSelectedPointIndexState: getComposerSelectedPointIndexState,
  setSelectedPointIndexState: setComposerSelectedPointIndexState,
  getPathState: () => composerPathState,
  getPointMeshes: () => composerPointMeshes,
  updatePointMaterials: (...args) => updateComposerPointMaterials(...args),
  updateCameraPoiStatus: () => updateComposerCameraPoiStatus(),
  updatePathPointAtState: updateComposerPathPointAtState,
  updatePathGeometry: () => updateComposerPathGeometry(),
  renderJsonPreview: () => renderComposerJsonPreview(),
  getCurrentDocument: () => composerCurrentDocument,
});
const {
  clearComposerSelectedPoint,
  hideComposerPathPointInfoPill,
  updateComposerPathPointInfoPill,
} = composerViewportOverlayPillRuntime;
const composerPointerHitRuntime = createComposerPointerHitRuntime({
  getCanvas: () => composerCanvas,
});
const {
  resolveComposerIndexedHit,
  getComposerPointerNdc,
  resolveComposerAssemblyHit,
  resolveComposerMemberHandleHit,
  resolveComposerSubassemblyHandleHit,
  resolveComposerGraphicOverlayHit,
  resolveComposerPersonalityHandleHit,
  resolveComposerAssemblyIdHit,
  findComposerShellSurfaceHit,
  findComposerCenterMarkerIntersection,
  shouldPreferComposerCenterMarker,
} = composerPointerHitRuntime;
const composerAssemblyInspectorRuntime = createComposerAssemblyInspectorRuntime({
  documentLike: document,
  getAssemblyListElement: () => composerAssemblyList,
  getAssemblyDetailElement: () => composerAssemblyDetail,
  validateSelectedAssemblyId: validateComposerSelectedAssemblyId,
  ensureAssemblyDrafts: ensureComposerAssemblyDrafts,
  getAssemblyDraftsState: getComposerAssemblyDraftsState,
  getSelectedAssemblyIdState: getComposerSelectedAssemblyIdState,
  getSelectedAssembly: getComposerSelectedAssembly,
  setSelectedAssembly: (...args) => setComposerSelectedAssembly(...args),
  renderJsonPreview: () => renderComposerJsonPreview(),
  openAssemblyPropertiesMenuAt: (...args) => openComposerAssemblyPropertiesMenuAt(...args),
  mutatePathStateState: mutateComposerPathStateState,
  setSelectedPointIndexState: setComposerSelectedPointIndexState,
  rebuildControlPoints: () => rebuildComposerControlPoints(),
  updatePathGeometry: () => updateComposerPathGeometry(),
  loadPathStateFromSelectedAssembly: () => loadComposerPathStateFromSelectedAssembly(),
  buildAssemblyStructure: buildComposerAssemblyStructure,
  summarizeAssemblyStructure: summarizeComposerAssemblyStructure,
  formatAssemblyStructureSummary: formatComposerAssemblyStructureSummary,
  getAssemblyDraftById: getComposerAssemblyDraftById,
  showHoverTooltip,
  hideHoverTooltip,
});
const {
  renderComposerAssemblyEditor,
  updateComposerAssemblyHoverTooltip,
  clearComposerAssemblyHoverTooltipState,
} = composerAssemblyInspectorRuntime;
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
  return "Timeline";
}

const composerTimelineOverlayRuntime = createComposerTimelineOverlayRuntime({
  clampFn: clamp,
  minDurationSeconds: composerTimelineMinDurationSeconds,
  sanitizeEntityId: sanitizeComposerEntityId,
  sanitizeTarget: sanitizeComposerGraphicTarget,
  getAssemblyDrafts: getComposerAssemblyDraftsState,
  getSelectedAssemblyId: getComposerSelectedAssemblyIdState,
  getSelectedPointIndex: getComposerSelectedPointIndexState,
  getGraphicOverlayDrafts: getComposerGraphicOverlayDraftsState,
  getCurrentDocument: () => composerCurrentDocument,
  getAssemblyLetter: getComposerAssemblyLetter,
  normalizeAssemblyPathPoints: normalizeComposerAssemblyPathPoints,
  normalizeMemberList: normalizeComposerMemberList,
  normalizeSubassemblyList: normalizeComposerSubassemblyList,
  vectorFromTriplet,
  isBareArchitrinoAssembly: isComposerBareArchitrinoAssembly,
  readNumberInput,
  formatTimeLabel: formatComposerTimeLabel,
  setStatus: setComposerStatus,
  mediaAssetDirectories: composerMediaAssetDirectories,
  supportedMediaExtensions: composerSupportedMediaExtensions,
  dom: {
    sceneDurationInput: composerSceneDurationInput,
    sceneLoopInput: composerSceneLoopInput,
    markerListInput: composerMarkerListInput,
    pauseListInput: composerPauseListInput,
    warpListInput: composerWarpListInput,
    transferListInput: composerTransferListInput,
    markerStatus: composerMarkerStatus,
    pauseStatus: composerPauseStatus,
    warpStatus: composerWarpStatus,
    transferStatus: composerTransferStatus,
  },
});

const {
  parseComposerTransfers,
  getComposerTimelineAuthoringItems,
  findComposerTimelineOverlap,
  reportComposerTimelineOverlap,
  getComposerGraphicEnd,
  getComposerGraphicDefaultTarget,
  decodeComposerGraphicTargetValue,
  getComposerGraphicTargetEntries,
  normalizeComposerMediaRect,
  sanitizeComposerMediaSource,
  normalizeComposerGraphicOverlayDraft,
  normalizeComposerGraphicOverlayList,
  getComposerGraphicOverlayDraftIndexById,
  getComposerGraphicOverlayDraftById,
  getNextComposerGraphicOverlayId,
  getComposerGraphicTimelineOverlays,
  getComposerViewportMediaTimelineOverlays,
  isComposerTimeWithinSpan,
  resolveComposerGraphicTargetPosition,
  getComposerAssemblyGraphicTargetRadius,
  formatComposerTimingStatus,
  updateComposerTimingDiagnostics,
  readComposerTimingState,
} = composerTimelineOverlayRuntime;
const composerAuthoringStateRuntime = createComposerAuthoringStateRuntime({
  draftStateRuntime: composerDraftStateRuntime,
  getPathState: () => composerPathState,
  getPlaybackState: () => composerPlaybackState,
  dom: {
    pathModeSelect: composerPathModeSelect,
    transferListInput: composerTransferListInput,
    sceneDurationInput: composerSceneDurationInput,
    sceneLoopInput: composerSceneLoopInput,
  },
  parseTransfers: parseComposerTransfers,
  createDefaultPathPoints: createComposerDefaultPathPoints,
  normalizeAssemblyPathPoints: normalizeComposerAssemblyPathPoints,
  normalizePathPoint: normalizeComposerPathPoint,
  vectorFromTriplet,
  operations: {
    rebuildControlPoints: rebuildComposerControlPoints,
    updatePathGeometry: updateComposerPathGeometry,
    updateCameraPoiStatus: updateComposerCameraPoiStatus,
  },
  windowLike: window,
});
const {
  appendAuthoringLine: appendComposerAuthoringLine,
  replaceAuthoringLineById: replaceComposerAuthoringLineById,
  setSceneDurationValue: setComposerSceneDurationValue,
  setSceneLoopValue: setComposerSceneLoopValue,
  getTransferListRaw: getComposerTransferListRaw,
  setTransferListRaw: setComposerTransferListRaw,
  appendTransferLine: appendComposerTransferLine,
  getParsedTransferEntries: getComposerParsedTransferEntries,
  clearPendingTransfer: clearComposerPendingTransfer,
  startTransferFromAssembly: startComposerTransferFromAssembly,
  completeTransferToAssembly: completeComposerTransferToAssembly,
  persistPathStateToAssembly: persistComposerPathStateToAssembly,
  loadPathStateFromSelectedAssembly: loadComposerPathStateFromSelectedAssembly,
  persistPathStateToSelectedAssembly: persistComposerPathStateToSelectedAssembly,
  setSelectedAssembly: setComposerSelectedAssembly,
} = composerAuthoringStateRuntime;

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

function getComposerPersonalityMembers(assembly) {
  return normalizeComposerMemberList(assembly?.members).filter((member) => isComposerPersonalityMember(member));
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

const composerAssemblyAuthoringRuntime = createComposerAssemblyAuthoringRuntime({
  getComposerAssemblyDraftById,
  updateComposerAssemblyDraftByIdState,
  setComposerStatus,
  getComposerPersonalityMembers,
  getComposerProxyMemberOffset,
  splitComposerAssemblyGroupRuntime,
});
const {
  addComposerAssemblyMemberByKind,
  createComposerSubassemblyFromMembers,
  ensureComposerAssemblyMemberRecord,
  getComposerAssemblySubassemblyIndex,
  getComposerAvailablePersonalitySlotCount,
  getComposerMemberSubassemblyId,
  getComposerPersonalitySlotCapacity,
  getNextComposerAssemblyMemberId,
  getNextComposerPersonalitySlotIndex,
  getNextComposerSubassemblyId,
  moveComposerMemberToRoot,
  moveComposerMemberToSubassembly,
  removeComposerAssemblyMember,
  resolveComposerAssemblyMemberLocalOffset,
  setComposerAssemblyMemberPosition,
  setComposerSubassemblyPosition,
  splitComposerAssemblyGroup,
} = composerAssemblyAuthoringRuntime;

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
  const assemblyDrafts = getComposerAssemblyDraftsState();
  const selectedAssemblyId = getComposerSelectedAssemblyIdState() ?? assemblyDrafts[0]?.id ?? null;
  const selectedOwnedPath =
    selectedAssemblyId != null
      ? paths.find((path) => getComposerPathOwnerAssemblyId(path) === selectedAssemblyId) ?? null
      : null;
  const selectedPath =
    selectedOwnedPath ??
    (paths.length === 1 ? paths[0] : null);
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
    line.userData.isSelectedPathBackground = path === selectedPath;
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
  const isObserverViewActive =
    composerCameraFlightState.preview || composerViewportModeState.cameraSource === "authored";
  const showObserverGuidesInViewport = showCameraGuides && !isObserverViewActive;
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
  composerAssemblyMeshes.forEach((mesh) => {
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
  if (composerDocumentCameraPathLine) {
    composerDocumentCameraPathLine.visible = showObserverGuidesInViewport;
  }
  composerDocumentCameraWaypointMeshes.forEach((mesh) => {
    mesh.visible = showObserverGuidesInViewport;
  });
  if (composerDocumentCameraShotMesh) {
    composerDocumentCameraShotMesh.visible = showObserverGuidesInViewport;
  }
  if (composerDocumentCameraTargetMesh) {
    composerDocumentCameraTargetMesh.visible = showObserverGuidesInViewport;
  }
  if (composerDocumentCameraLookLine) {
    composerDocumentCameraLookLine.visible = showObserverGuidesInViewport;
  }
  if (composerCameraFlightGroup) {
    composerCameraFlightGroup.visible = showObserverGuidesInViewport;
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
  openComposerMemberMenu({
    menu: composerAssemblyMenu,
    clientX,
    clientY,
    assemblyId,
    memberId,
    getAssemblyDraftById: getComposerAssemblyDraftById,
    sanitizeEntityId: sanitizeComposerEntityId,
    getMemberSubassemblyId: getComposerMemberSubassemblyId,
    resolveAssemblyMemberLocalOffset: resolveComposerAssemblyMemberLocalOffset,
    normalizeSubassemblyList: normalizeComposerSubassemblyList,
    getSubassemblyId: getComposerSubassemblyId,
    resetMenu: resetComposerAssemblyMenu,
    appendMenuNote: appendComposerMenuNote,
    appendMenuButtonRow: appendComposerMenuButtonRow,
    appendMenuSectionHeader: appendComposerMenuSectionHeader,
    closeMenu: closeComposerAssemblyMenu,
    renderAssemblyEditor: renderComposerAssemblyEditor,
    renderJsonPreview: renderComposerJsonPreview,
    moveMemberToRoot: moveComposerMemberToRoot,
    openMemberMenuAt: openComposerMemberMenuAt,
    createSubassemblyFromMembers: createComposerSubassemblyFromMembers,
    openSubassemblyMenuAt: openComposerSubassemblyMenuAt,
    removeAssemblyMember: removeComposerAssemblyMember,
    openAssemblyPropertiesMenuAt: openComposerAssemblyPropertiesMenuAt,
    moveMemberToSubassembly: moveComposerMemberToSubassembly,
    positionMenu: positionComposerAssemblyMenu,
  });
}

function openComposerPersonalitySlotMenuAt(clientX, clientY, assemblyId, memberId) {
  return openComposerPersonalitySlotMenu({
    menu: composerAssemblyMenu,
    clientX,
    clientY,
    assemblyId,
    memberId,
    getAssemblyDraftById: getComposerAssemblyDraftById,
    normalizeMemberList: normalizeComposerMemberList,
    getMemberId: getComposerMemberId,
    sanitizeEntityId: sanitizeComposerEntityId,
    isPersonalityMember: isComposerPersonalityMember,
    getMemberState: getComposerMemberState,
    resetMenu: resetComposerAssemblyMenu,
    appendMenuNote: appendComposerMenuNote,
    appendMenuButtonRow: appendComposerMenuButtonRow,
    ensureAssemblyMemberRecord: ensureComposerAssemblyMemberRecord,
    closeMenu: closeComposerAssemblyMenu,
    renderJsonPreview: renderComposerJsonPreview,
    positionMenu: positionComposerAssemblyMenu,
  });
}

function openComposerSubassemblyMenuAt(clientX, clientY, assemblyId, subassemblyId) {
  openComposerSubassemblyMenu({
    menu: composerAssemblyMenu,
    clientX,
    clientY,
    assemblyId,
    subassemblyId,
    getAssemblyDraftById: getComposerAssemblyDraftById,
    sanitizeEntityId: sanitizeComposerEntityId,
    normalizeSubassemblyList: normalizeComposerSubassemblyList,
    getSubassemblyId: getComposerSubassemblyId,
    resetMenu: resetComposerAssemblyMenu,
    appendMenuNote: appendComposerMenuNote,
    appendMenuButtonRow: appendComposerMenuButtonRow,
    appendMenuSectionHeader: appendComposerMenuSectionHeader,
    splitGroup: splitComposerAssemblyGroup,
    closeMenu: closeComposerAssemblyMenu,
    renderAssemblyEditor: renderComposerAssemblyEditor,
    renderJsonPreview: renderComposerJsonPreview,
    openAssemblyPropertiesMenuAt: openComposerAssemblyPropertiesMenuAt,
    openMemberMenuAt: openComposerMemberMenuAt,
    positionMenu: positionComposerAssemblyMenu,
  });
}

function openComposerAssemblyTemplateMenuAt(event) {
  openComposerAssemblyTemplateMenu({
    menu: composerAssemblyMenu,
    event,
    localPoint: getComposerCanvasLocalPointFromEvent(event),
    resetMenu: resetComposerAssemblyMenu,
    appendMenuButtonRow: appendComposerMenuButtonRow,
    appendMenuNote: appendComposerMenuNote,
    appendMenuSectionHeader: appendComposerMenuSectionHeader,
    templateMenuRows: composerAssemblyTemplateMenuRows,
    openSceneMenuAt: openComposerSceneMenuAt,
    openLibraryMenuAt: openComposerLibraryMenuAt,
    cameraFlightState: composerCameraFlightState,
    addCameraWaypoint: addComposerCameraWaypoint,
    closeMenu: closeComposerAssemblyMenu,
    updateCameraPoiStatus: updateComposerCameraPoiStatus,
    clearCameraWaypoints: clearComposerCameraWaypoints,
    getSelectedAssemblyLetter: getComposerSelectedAssemblyLetter,
    composerFrameEditModeRef: {
      get: () => composerFrameEditMode,
      set: (value) => {
        composerFrameEditMode = !!value;
      },
    },
    setComposerFrameDefaults,
    updateComposerFrame,
    appendMenuRangeControl: appendComposerMenuRangeControl,
    formatScaleLabel,
    composerFrameState,
    renderJsonPreview: renderComposerJsonPreview,
    setComposerCameraDefaults,
    updateComposerCamera,
    composerCameraState,
    composerCameraOrbitState,
    positionMenu: positionComposerAssemblyMenu,
  });
}

function openComposerAssemblyPropertiesMenuAt(clientX, clientY, assemblyId) {
  openComposerAssemblyPropertiesMenu({
    menu: composerAssemblyMenu,
    clientX,
    clientY,
    assemblyId,
    getAssemblyDraftIndexById: getComposerAssemblyDraftIndexById,
    assemblyDrafts: getComposerAssemblyDraftsState(),
    setSelectedAssembly: setComposerSelectedAssembly,
    resetMenu: resetComposerAssemblyMenu,
    pendingTransferSource: getComposerPendingTransferSourceState(),
    appendMenuNote: appendComposerMenuNote,
    appendMenuSectionHeader: appendComposerMenuSectionHeader,
    appendMenuButtonRow: appendComposerMenuButtonRow,
    getAssemblyDraftById: getComposerAssemblyDraftById,
    renderAssemblyEditor: renderComposerAssemblyEditor,
    renderJsonPreview: renderComposerJsonPreview,
    closeMenu: closeComposerAssemblyMenu,
    clearPendingTransfer: clearComposerPendingTransfer,
    openAssemblyPropertiesMenuAt: openComposerAssemblyPropertiesMenuAt,
    ensureAssemblyDrafts: ensureComposerAssemblyDrafts,
    positionMenu: positionComposerAssemblyMenu,
  });
}

function getNextComposerAssemblyId(baseId) {
  const normalizedBase = sanitizeComposerEntityId(baseId, "assembly");
  let suffix = 1;
  let candidate = normalizedBase;
  const existingIds = new Set(getComposerAssemblyDraftsState().map((assembly) => assembly?.id));
  while (existingIds.has(candidate)) {
    suffix += 1;
    candidate = `${normalizedBase}_${suffix}`;
  }
  return candidate;
}

function createBuiltInComposerAssemblyDraft(templateId, position = [0, 0, 0], options = {}) {
  return createBuiltInComposerAssemblyDraftRuntime(templateId, position, {
    sceneRole: options.sceneRole,
    normalizeSceneRole: normalizeComposerAssemblySceneRole,
    normalizeAssemblyDraft: normalizeComposerAssemblyDraft,
    getDraftCount: () => getComposerAssemblyDraftsState().length,
    getNextAssemblyId: getNextComposerAssemblyId,
    createDefaultPathPoints: createComposerDefaultPathPoints,
    createDefaultCoreSpec: createComposerDefaultCoreSpec,
    createPersonalityMembers: createComposerPersonalityMembers,
    getBuiltInPersonalityStates: getComposerBuiltInPersonalityStates,
    createGenIFermionPersonalityMembers: createComposerGenIFermionPersonalityMembers,
  });
}

function addBuiltInComposerAssembly(templateId, position, options = {}) {
  const nextAssembly = createBuiltInComposerAssemblyDraft(templateId, position, options);
  appendComposerAssemblyDraftState(nextAssembly);
  setComposerSelectedAssembly(nextAssembly.id);
  renderComposerAssemblyEditor();
  renderComposerJsonPreview();
}

function setComposerStatus(message) {
  if (!composerStatus) {
    return;
  }
  composerStatus.textContent = message;
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
  clearComposerMemberAnchors();
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

function getComposerDocumentCameraStateAtTime(documentData, timeSeconds) {
  if (!documentData || !composerFrameGroup) {
    return null;
  }
  const timeWindow = getComposerSceneTimeWindow(documentData);
  const activeShot = getComposerActiveCameraShot(documentData, timeSeconds, timeWindow);
  const activeCameraPathId = getComposerActiveCameraPathId(documentData, timeSeconds, timeWindow);
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
    const interval = resolveComposerShotInterval(activeShot, timeWindow);
    const duration = Math.max(0.000001, interval.end - interval.start);
    normalizedT = clamp((timeSeconds - interval.start) / duration, 0, 1);
  } else if (timeWindow.end > timeWindow.start) {
    normalizedT = clamp((timeSeconds - timeWindow.start) / (timeWindow.end - timeWindow.start), 0, 1);
  }
  const localState = sampleComposerCameraWaypointState(waypoints, normalizedT);
  return {
    position: composerFrameGroup.localToWorld(localState.position.clone()),
    lookAt: composerFrameGroup.localToWorld(localState.lookAt.clone()),
    cameraPathId: activeCameraPathId,
    shotId: activeShot?.id ?? null,
    normalizedT,
  };
}

function getComposerPreviewCameraStateAtTime(timeSeconds) {
  if (!composerFrameGroup) {
    return null;
  }
  const waypoints = composerCameraFlightState.waypoints;
  if (!Array.isArray(waypoints) || waypoints.length < 2) {
    return null;
  }
  const timeWindow = composerCurrentDocument
    ? getComposerSceneTimeWindow(composerCurrentDocument)
    : { start: 0, end: 24 };
  const duration = Math.max(0.000001, timeWindow.end - timeWindow.start);
  const normalizedT = clamp((timeSeconds - timeWindow.start) / duration, 0, 1);
  const localState = sampleComposerCameraWaypointState(waypoints, normalizedT);
  return {
    position: composerFrameGroup.localToWorld(localState.position.clone()),
    lookAt: composerFrameGroup.localToWorld(localState.lookAt.clone()),
    normalizedT,
  };
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

function getComposerMotionProgress(documentData, timeSeconds) {
  const totalMotionDuration = getComposerTotalMotionDuration(documentData);
  if (!(totalMotionDuration > 0)) {
    return 0;
  }
  return clamp(getComposerIntegratedMotionTime(documentData, timeSeconds) / totalMotionDuration, 0, 1);
}

function getComposerPlaybackTimeForMotionTime(documentData, targetMotionTime) {
  const timeWindow = getComposerSceneTimeWindow(documentData);
  const totalMotionDuration = getComposerTotalMotionDuration(documentData);
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
    const motionTime = getComposerIntegratedMotionTime(documentData, mid);
    if (motionTime < normalizedTarget) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return Number(high.toFixed(3));
}

function getComposerPlaybackTimeForMotionProgress(documentData, targetProgress) {
  const timeWindow = getComposerSceneTimeWindow(documentData);
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
    const progress = getComposerMotionProgress(documentData, mid);
    if (progress < normalizedTarget) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return Number(high.toFixed(3));
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
  buildComposerTimelineSummaryMenu({
    menu: composerAssemblyMenu,
    clientX,
    clientY,
    currentDuration: Math.max(1, readNumberInput(composerSceneDurationInput, 24)),
    isLooping: !!composerSceneLoopInput?.checked,
    resetComposerAssemblyMenu,
    appendComposerMenuBlock,
    appendComposerMenuField,
    formatComposerTimeInputValue,
    setComposerSceneDurationValue,
    setComposerSceneLoopValue,
    renderComposerJsonPreview,
    positionComposerAssemblyMenu,
  });
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
  buildComposerSceneMenu({
    menu: composerAssemblyMenu,
    clientX,
    clientY,
    currentId: sanitizeComposerId(composerSceneIdInput?.value ?? "composer_scene"),
    currentName: String(composerSceneNameInput?.value ?? "").trim() || "Composer Scene",
    resetComposerAssemblyMenu,
    appendComposerMenuBlock,
    appendComposerMenuButtonRow,
    appendComposerMenuField,
    appendComposerMenuNote,
    applyComposerSceneIdentityDraft,
    closeComposerAssemblyMenu,
    openComposerLibraryMenuAt,
    composerDocsButton,
    positionComposerAssemblyMenu,
  });
}

function openComposerJsonPreviewMenuAt(clientX, clientY) {
  if (!composerAssemblyMenu) {
    return;
  }
  persistComposerPathStateToSelectedAssembly();
  const draftState = readComposerDraftState();
  const sceneDocument = buildComposerDocumentData(draftState);
  const json = JSON.stringify(sceneDocument, null, 2);
  buildComposerJsonPreviewMenu({
    menu: composerAssemblyMenu,
    clientX,
    clientY,
    draftState,
    json,
    composerJsonPreview,
    resetComposerAssemblyMenu,
    appendComposerMenuButtonRow,
    openComposerLibraryMenuAt,
    closeComposerAssemblyMenu,
    composerExportButton,
    positionComposerAssemblyMenu,
  });
}

function openComposerLibraryMenuAt(clientX, clientY) {
  if (!composerAssemblyMenu) {
    return;
  }
  const entries = getComposerSortedLibraryEntries();
  buildComposerLibraryMenu({
    menu: composerAssemblyMenu,
    clientX,
    clientY,
    entries,
    composerLibrarySelect,
    composerLibraryLoadButton,
    composerLibraryDeleteButton,
    composerLibraryStatus,
    composerRepoSaveButton,
    composerLibrarySaveButton,
    composerExportButton,
    importReactionFlow: importReactionFlowFromPicker,
    resetComposerAssemblyMenu,
    refreshComposerLibraryUi,
    appendComposerMenuBlock,
    appendComposerMenuButtonRow,
    appendComposerMenuNote,
    appendComposerMenuSelectField,
    closeComposerAssemblyMenu,
    openComposerJsonPreviewMenuAt,
    positionComposerAssemblyMenu,
  });
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
    getComposerTimelineTimeAtClientX(clientX, documentData);
  const duration = Math.max(1, readNumberInput(composerSceneDurationInput, 24));
  const editKind = warp ? "warp" : pause ? "pause" : overlay ? overlay.kind : "add";
  const addType = normalizeComposerTimelineAddType(options.addType);
  buildComposerTimelineMenu({
    menu: composerAssemblyMenu,
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
    composerTimelineAddTypeEntries,
    composerTimelineMinDurationSeconds,
    composerPauseListInput,
    composerWarpListInput,
    resetComposerAssemblyMenu,
    positionComposerAssemblyMenu,
    appendComposerMenuBlock,
    appendComposerMenuButtonRow,
    appendComposerMenuField,
    appendComposerMenuNote,
    appendComposerMenuSelectField,
    appendComposerAuthoringLine,
    replaceComposerAuthoringLineById,
    normalizeComposerTimelineAddType,
    getComposerTimelineEditKindTitle,
    formatComposerTimeLabel,
    formatComposerTimeInputValue,
    clampComposerTimelineSpan,
    getComposerGraphicOverlayLabel,
    getComposerMediaOverlayLabel,
    normalizeComposerGraphicOverlayDraft,
    getNextComposerGraphicOverlayId,
    getComposerGraphicDefaultTarget,
    getComposerGraphicOverlayDraftIndexById,
    findComposerTimelineOverlap,
    showComposerStatus: setComposerStatus,
    upsertComposerGraphicOverlayDraft: upsertComposerGraphicOverlayDraftState,
    removeComposerGraphicOverlayDraftById: removeComposerGraphicOverlayDraftByIdState,
    closeComposerAssemblyMenu,
    renderComposerJsonPreview,
    encodeComposerGraphicTargetValue,
    getComposerGraphicTargetEntries,
    decodeComposerGraphicTargetValue,
    composerMediaAssetDirectories,
    sanitizeComposerMediaSource,
    getComposerMediaDefaultRect,
  });
}

function removeComposerPathPoint(pointIndex) {
  if (!Number.isInteger(pointIndex) || pointIndex < 0 || pointIndex >= composerPathState.points.length) {
    return;
  }
  mutateComposerPathStateState((pathState) => {
    pathState.points.splice(pointIndex, 1);
  });
  setComposerSelectedPointIndexState(
    composerPathState.points.length > 0
      ? Math.min(pointIndex, composerPathState.points.length - 1)
      : null
  );
  persistComposerPathStateToSelectedAssembly();
  rebuildComposerControlPoints();
  updateComposerPathGeometry();
}

function openComposerPathPointMenuAt(clientX, clientY, pointIndex) {
  openComposerPathPointMenu({
    menu: composerAssemblyMenu,
    clientX,
    clientY,
    pointIndex,
    getSelectedAssemblyLetter: getComposerSelectedAssemblyLetter,
    setSelectedPointIndex: (value) => {
      setComposerSelectedPointIndexState(value);
    },
    resetMenu: resetComposerAssemblyMenu,
    cameraFlightState: composerCameraFlightState,
    updatePointMaterials: updateComposerPointMaterials,
    updateCameraPoiStatus: updateComposerCameraPoiStatus,
    closeMenu: closeComposerAssemblyMenu,
    THREE,
    pathState: composerPathState,
    vectorFromTriplet,
    addPathPoint: addComposerPathPoint,
    renderJsonPreview: renderComposerJsonPreview,
    resetPathPoints: resetComposerPathPoints,
    removePathPoint: removeComposerPathPoint,
    positionMenu: positionComposerAssemblyMenu,
  });
}

function describeComposerTimelineState(timeSeconds, documentData) {
  const graphics = getComposerGraphicTimelineOverlays(documentData);
  const pauses = Array.isArray(documentData?.scene?.pauses) ? documentData.scene.pauses : [];
  const timeWarps = Array.isArray(documentData?.scene?.timeWarps) ? documentData.scene.timeWarps : [];
  const activeReactionStage = getComposerActiveReactionStage(documentData, timeSeconds);
  const activeWarp = timeWarps.find((warp) => timeSeconds >= warp.start && timeSeconds < warp.end);
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
  if (activeReactionStage?.label) {
    parts.push(activeReactionStage.label);
  }
  return parts.join(" | ") || "Steady";
}

function getComposerActiveReaction(documentData, timeSeconds) {
  const reactions = Array.isArray(documentData?.reactions) ? documentData.reactions : [];
  return (
    reactions.find((reaction) => {
      const start = Number(reaction?.start ?? documentData?.scene?.time?.start ?? 0);
      const end = Number(reaction?.end ?? documentData?.scene?.time?.end ?? start);
      return timeSeconds >= start - 0.001 && timeSeconds <= end + 0.001;
    }) ?? reactions[0] ?? null
  );
}

function getComposerActiveReactionStage(documentData, timeSeconds) {
  const activeReaction = getComposerActiveReaction(documentData, timeSeconds);
  const stages = Array.isArray(activeReaction?.stages) ? activeReaction.stages : [];
  return (
    stages.find((stage) => {
      const start = Number(stage?.start ?? activeReaction?.start ?? 0);
      const end = Number(stage?.end ?? activeReaction?.end ?? start);
      return timeSeconds >= start - 0.001 && timeSeconds <= end + 0.001;
    }) ?? stages[0] ?? null
  );
}

function getComposerReactionParticipantRoleMap(documentData, timeSeconds) {
  const activeReaction = getComposerActiveReaction(documentData, timeSeconds);
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

function getComposerAssemblyStageEmphasis(assemblyId, documentData, timeSeconds, participantRoleMap = null) {
  const activeStage = getComposerActiveReactionStage(documentData, timeSeconds);
  const roleMap = participantRoleMap instanceof Map
    ? participantRoleMap
    : getComposerReactionParticipantRoleMap(documentData, timeSeconds);
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

function setComposerObjectOpacity(object3d, opacityFactor = 1) {
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
        Number.isFinite(Number(material.userData?.composerBaseOpacity))
          ? Number(material.userData.composerBaseOpacity)
          : material.opacity;
      if (!material.userData) {
        material.userData = {};
      }
      material.userData.composerBaseOpacity = baseOpacity;
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

function applyComposerStageVisualState(documentData, timeSeconds) {
  const participantRoleMap = getComposerReactionParticipantRoleMap(documentData, timeSeconds);
  const stage = getComposerActiveReactionStage(documentData, timeSeconds);
  const stageTransferIds = new Set(
    Array.isArray(stage?.transferIds) ? stage.transferIds.filter(Boolean) : []
  );

  composerAssemblyMeshes.forEach((group) => {
    const assemblyId = group?.userData?.assemblyId ?? null;
    const emphasis = getComposerAssemblyStageEmphasis(
      assemblyId,
      documentData,
      timeSeconds,
      participantRoleMap
    );
    group.scale.setScalar(emphasis.scale);
    setComposerObjectOpacity(group, emphasis.opacity);
  });

  const applyAssemblyOpacityToEntries = (entries = []) => {
    entries.forEach((entry) => {
      const assemblyId = entry?.userData?.assemblyId ?? null;
      const emphasis = getComposerAssemblyStageEmphasis(
        assemblyId,
        documentData,
        timeSeconds,
        participantRoleMap
      );
      setComposerObjectOpacity(entry, emphasis.opacity);
    });
  };

  applyAssemblyOpacityToEntries(composerShellMeshes);
  applyAssemblyOpacityToEntries(composerEnvelopeMeshes);
  applyAssemblyOpacityToEntries(composerOrbitTraceLines);
  applyAssemblyOpacityToEntries(composerAxisGuideLines);
  applyAssemblyOpacityToEntries(composerOrbitParticleMeshes);
  applyAssemblyOpacityToEntries(composerMemberLabelSprites);

  composerTransferLines.forEach((line) => {
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

function updateComposerAnimatedViewport(timeSeconds) {
  if (!composerCurrentDocument) {
    return;
  }
  composerCurrentViewportFramingState = resolveComposerViewportFramingState(
    composerCurrentDocument,
    timeSeconds,
    getComposerSceneTimeWindow(composerCurrentDocument)
  );
  const motionTime =
    composerEditorPreviewState.renderMotionTimeOverride != null &&
    Math.abs(timeSeconds - Number(composerEditorPreviewState.renderMotionTimePlayhead ?? NaN)) <= 0.0005
      ? Number(composerEditorPreviewState.renderMotionTimeOverride)
      : getComposerIntegratedMotionTime(composerCurrentDocument, timeSeconds);
  const paths = Array.isArray(composerCurrentDocument.paths) ? composerCurrentDocument.paths : [];
  const pathById = new Map(paths.map((path) => [path.id, path]));
  const assemblies = Array.isArray(composerCurrentDocument.assemblies)
    ? composerCurrentDocument.assemblies
    : [];
  const totalMotionDuration = getComposerTotalMotionDuration(composerCurrentDocument);
  const normalizedSceneT =
    composerEditorPreviewState.renderMotionProgressOverride != null &&
    Math.abs(timeSeconds - Number(composerEditorPreviewState.renderMotionProgressPlayhead ?? NaN)) <= 0.0005
      ? clamp(Number(composerEditorPreviewState.renderMotionProgressOverride), 0, 1)
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
    const isActiveByTime = transfer?.t == null || Math.abs(timeSeconds - Number(transfer.t)) <= 0.6;
    line.material.color.set(0xffd17a);
    line.material.opacity = isActiveByTime ? 0.82 : 0.32;
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
  applyComposerStageVisualState(composerCurrentDocument, timeSeconds);

  if (composerCameraFlightState.preview && composerCamera) {
    const previewCameraState = getComposerAutoscaledCameraState(
      getComposerPreviewCameraStateAtTime(timeSeconds),
      composerCurrentDocument,
      assemblyCenters,
      composerCurrentViewportFramingState
    );
    if (previewCameraState) {
      composerCamera.position.copy(previewCameraState.position);
      composerCamera.lookAt(previewCameraState.lookAt);
    }
  } else if (composerCamera && composerViewportModeState.cameraSource === "authored") {
    const authoredCameraState = getComposerAutoscaledCameraState(
      getComposerDocumentCameraStateAtTime(composerCurrentDocument, timeSeconds),
      composerCurrentDocument,
      assemblyCenters,
      composerCurrentViewportFramingState
    );
    if (authoredCameraState) {
      composerCamera.position.copy(authoredCameraState.position);
      composerCamera.lookAt(authoredCameraState.lookAt);
    }
  }
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
  let centerMarker = null;

  if (!isBareArchitrino) {
    const sceneRole = normalizeComposerAssemblySceneRole(assembly?.sceneRole);
    centerMarker = new THREE.Mesh(
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

    const binaryMemberIds = new Set();
    const binaries = Array.isArray(assembly?.core?.binaries) ? assembly.core.binaries : [];
    binaries.forEach((_binary, binaryIndex) => {
      const positrinoMemberId = findComposerCoreMemberId(assembly?.members, "positrino", binaryIndex);
      const electrinoMemberId = findComposerCoreMemberId(assembly?.members, "electrino", binaryIndex);
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
          getComposerMemberId(personalityMember, personalityIndex) === memberEntry.id
        )
    );
    const genericCoreBaseRadius = Math.max(markerRadius, outerRadius + 0.2);
    genericCoreMembers.forEach((memberEntry, memberIndex) => {
      const memberId = memberEntry.id;
      const localOffset = memberEntry.position
        ? new THREE.Vector3(memberEntry.position[0], memberEntry.position[1], memberEntry.position[2])
        : getComposerProxyMemberOffset(memberIndex, genericCoreMembers.length, genericCoreBaseRadius);
      setComposerMemberAnchor(assembly?.id, memberId, {
        type: "proxy",
        offset: [localOffset.x, localOffset.y, localOffset.z],
      });
      const memberDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 12, 10),
        new THREE.MeshBasicMaterial({
          color: getComposerMemberColor(memberId, memberIndex),
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
      memberDot.userData.isComposerMemberHandle = true;
      const memberHitProxy = createComposerMarkerHitProxy(0.14);
      memberDot.userData.hitProxy = memberHitProxy;
      memberDot.add(memberHitProxy);
      group.add(memberDot);
      composerMemberHandleMeshes.push(memberDot);
    });
  }

  composerViewportGroup?.add(group);
  composerAssemblyMeshes.push(group);
}

function addComposerDocumentCameraVisuals(documentData) {
  if ((composerCameraFlightState?.waypoints?.length ?? 0) > 0) {
    return;
  }
  const cameraPaths = Array.isArray(documentData?.cameraPaths) ? documentData.cameraPaths : [];
  const pathById = new Map(cameraPaths.map((path) => [path.id, path]));
  const activeCameraPathId = getComposerActiveCameraPathId(
    documentData,
    composerPlaybackState.playheadSeconds,
    getComposerSceneTimeWindow(documentData)
  );
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

function updateComposerViewportFromDocument(documentData) {
  const previousDocument = composerCurrentDocument;
  const previousSceneId = composerCurrentDocument?.scene?.id ?? null;
  const previousPlaybackPlaying = composerPlaybackState.playing;
  const shouldPreserveRenderedMotionTime =
    previousDocument &&
    previousSceneId &&
    previousSceneId === (documentData?.scene?.id ?? null);
  const previousMotionTime = shouldPreserveRenderedMotionTime
    ? getComposerIntegratedMotionTime(previousDocument, composerPlaybackState.playheadSeconds)
    : null;
  const previousMotionProgress = shouldPreserveRenderedMotionTime
    ? getComposerMotionProgress(previousDocument, composerPlaybackState.playheadSeconds)
    : null;
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
    clearComposerEditorPreviewState();
  } else if (shouldPreserveRenderedMotionTime && previousMotionTime != null) {
    composerPlaybackState.playheadSeconds = clamp(
      composerPlaybackState.playheadSeconds,
      timeWindow.start,
      timeWindow.end
    );
    composerEditorPreviewState.renderMotionTimeOverride = previousMotionTime;
    composerEditorPreviewState.renderMotionTimePlayhead = composerPlaybackState.playheadSeconds;
    composerEditorPreviewState.renderMotionProgressOverride = previousMotionProgress;
    composerEditorPreviewState.renderMotionProgressPlayhead = composerPlaybackState.playheadSeconds;
  } else {
    composerPlaybackState.playheadSeconds = clamp(
      composerPlaybackState.playheadSeconds,
      timeWindow.start,
      timeWindow.end
    );
    clearComposerEditorPreviewState();
  }
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

function onComposerTimelineClick(event) {
  const timelineBand = event.target.closest?.(".composer-timeline-band") ?? null;
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
const composerScenePath = COMPOSER_SCENE_PATH;
const composerSceneId = "composer";
const reactionSceneId = "reaction_designer";
const composerPreviewSceneId = "composer_preview";
const composerPreviewScenePath = "__composer_preview__";
const composerDocsPath =
  "action-items/observer/composer.md";
const appMode = getComposerAppMode(globalThis.window);
const isStandaloneComposerApp = isStandaloneComposerAppMode(appMode);
const standaloneNavigatorHref = STANDALONE_COMPOSER_NAVIGATOR_HREF;

function isComposerOverlaySceneId(sceneId = "") {
  return sceneId === composerSceneId || sceneId === composerPreviewSceneId;
}

function shouldHideLevelForComposerOverlayScene(sceneId = "") {
  return sceneId === composerSceneId;
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
  savedPosition: new THREE.Vector3(),
  savedTarget: new THREE.Vector3(),
};
let composerSelectedCameraWaypointIndex = null;
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
let composerMemberLabelSprites = [];
let composerGraphicOverlayGroups = [];
let composerGraphicOverlayHandleMeshes = [];
let composerViewportMediaOverlayElements = new Map();
let composerDocumentCameraPathLine = null;
let composerDocumentCameraWaypointMeshes = [];
let composerDocumentCameraShotMesh = null;
let composerDocumentCameraTargetMesh = null;
let composerDocumentCameraLookLine = null;
let composerCurrentViewportFramingState = null;
const composerPlaybackTimelineRuntime = createComposerPlaybackTimelineRuntime({
  THREE,
  documentLike: document,
  clampFn: clamp,
  formatTimeLabel: formatComposerTimeLabel,
  getSceneTimeWindow: getComposerSceneTimeWindow,
  getTimelineFraction: getComposerTimelineFraction,
  getGraphicEnd: getComposerGraphicEnd,
  getGraphicOverlayLabel: getComposerGraphicOverlayLabel,
  getMediaOverlayLabel: getComposerMediaOverlayLabel,
  getGraphicTimelineOverlays: (...args) => getComposerGraphicTimelineOverlays(...args),
  getViewportMediaTimelineOverlays: (...args) => getComposerViewportMediaTimelineOverlays(...args),
  setTransportButtonIcon: (...args) => setComposerTransportButtonIcon(...args),
  updateAnimatedViewport: (...args) => updateComposerAnimatedViewport(...args),
  applyViewportDisplayState: () => applyComposerViewportDisplayState(),
  getCurrentDocument: () => composerCurrentDocument,
  getPlaybackState: () => composerPlaybackState,
  getEditorPreviewState: () => composerEditorPreviewState,
  getViewportModeState: () => composerViewportModeState,
  clearTimelineLayer: (...args) => clearComposerTimelineLayer(...args),
  createTimelineBand: (...args) => createComposerTimelineBand(...args),
  dom: {
    viewDesignButton: composerViewDesignButton,
    viewObserverButton: composerViewObserverButton,
    markerJumpSelect: composerMarkerJumpSelect,
    markerPrevButton: composerMarkerPrevButton,
    markerNextButton: composerMarkerNextButton,
    timelineTrack: composerTimelineTrack,
    timelineWarps: composerTimelineWarps,
    timelinePauses: composerTimelinePauses,
    timelineMarkers: composerTimelineMarkers,
    timelinePlayhead: composerTimelinePlayhead,
    playheadScrubInput: composerPlayheadScrubInput,
    timelineSummary: composerTimelineSummary,
    playToggleButton: composerPlayToggleButton,
  },
});
const {
  renderComposerTimeline,
  updateComposerTimelinePlayhead,
  clearComposerEditorPreviewState,
  updateComposerViewportModeButtons,
  setComposerViewportCameraSource,
  setComposerPlaybackPlayhead,
  startComposerPlayback,
  toggleComposerPlayback,
  restartComposerPlayback,
  jumpToComposerMarker,
  jumpComposerMarkerByOffset,
  scrubComposerPlayback,
  updateComposerPlaybackState,
  syncComposerMarkerNavigation,
  getComposerSortedMarkers,
} = composerPlaybackTimelineRuntime;
const composerViewportRenderRuntime = createComposerViewportRenderRuntime({
  THREE,
  clampFn: clamp,
  readNumberInput,
  formatScaleLabel,
  getEffectiveFrameScale: () => getComposerEffectiveFrameScale(),
  getOrbitTargetWorld: () => getComposerOrbitTargetWorld(),
  updatePathMarkerScales: () => updateComposerPathMarkerScales(),
  updatePathPointInfoPill: () => updateComposerPathPointInfoPill(),
  hidePathPointInfoPill: () => hideComposerPathPointInfoPill(),
  updateTimelinePlayhead: (...args) => updateComposerTimelinePlayhead(...args),
  updateAnimatedViewport: (...args) => updateComposerAnimatedViewport(...args),
  updatePlaybackState: (...args) => updateComposerPlaybackState(...args),
  getRenderer: () => composerRenderer,
  getScene: () => composerScene,
  getCanvas: () => composerCanvas,
  getCamera: () => composerCamera,
  getOverlay: () => composerOverlay,
  getFrameGroup: () => composerFrameGroup,
  getFrameState: () => composerFrameState,
  getCameraState: () => composerCameraState,
  getCameraOrbitState: () => composerCameraOrbitState,
  getCameraFlightState: () => composerCameraFlightState,
  getCurrentDocument: () => composerCurrentDocument,
  getNeedsResize: () => composerNeedsResize,
  setNeedsResize: (value) => {
    composerNeedsResize = value;
  },
  dom: {
    frameScaleInput: composerFrameScaleInput,
    frameScaleLabel: composerFrameScaleLabel,
    cameraSpeedInput: composerCameraSpeedInput,
    cameraSpeedLabel: composerCameraSpeedLabel,
  },
});
const {
  resizeComposerCanvas,
  updateComposerFrame,
  applyComposerFrameScaleInput,
  updateComposerCamera,
  applyComposerCameraSpeedInput,
  renderComposerCanvas,
} = composerViewportRenderRuntime;
const composerPointerInteractionRuntime = createComposerPointerInteractionRuntime({
  THREE,
  clampFn: clamp,
  vectorFromTriplet,
  normalizeAssemblyPathPoints: normalizeComposerAssemblyPathPoints,
  normalizeMemberPosition: normalizeComposerMemberPosition,
  isBareArchitrinoAssembly: isComposerBareArchitrinoAssembly,
  getAssemblySubassemblyIndex: getComposerAssemblySubassemblyIndex,
  setAssemblyMemberPosition: setComposerAssemblyMemberPosition,
  setSubassemblyPosition: setComposerSubassemblyPosition,
  resolveGraphicTargetPosition: (...args) => resolveComposerGraphicTargetPosition(...args),
  getCanvas: () => composerCanvas,
  getCamera: () => composerCamera,
  getRaycaster: () => composerRaycaster,
  getFrameGroup: () => composerFrameGroup,
  getDragState: () => composerDragState,
  getAssemblyWorldCenters: () => composerAssemblyWorldCenters,
  getCurrentDocument: () => composerCurrentDocument,
  getPathState: () => composerPathState,
  getFrameEditMode: () => composerFrameEditMode,
  getFrameState: () => composerFrameState,
  getCameraState: () => composerCameraState,
  getCameraOrbitState: () => composerCameraOrbitState,
  getCameraFlightState: () => composerCameraFlightState,
  getSelectedCameraWaypointIndex: () => composerSelectedCameraWaypointIndex,
  setSelectedCameraWaypointIndex: (value) => {
    composerSelectedCameraWaypointIndex = value;
  },
  getAssemblyDraftsState: getComposerAssemblyDraftsState,
  getAssemblyDraftById: getComposerAssemblyDraftById,
  getAssemblyDraftIndexById: getComposerAssemblyDraftIndexById,
  updateAssemblyDraftByIdState: updateComposerAssemblyDraftByIdState,
  getGraphicOverlayDraftById: getComposerGraphicOverlayDraftById,
  updateGraphicOverlayDraftByIdState: updateComposerGraphicOverlayDraftByIdState,
  getSelectedAssemblyIdState: getComposerSelectedAssemblyIdState,
  getSelectedPointIndexState: getComposerSelectedPointIndexState,
  setSelectedPointIndexState: setComposerSelectedPointIndexState,
  mutatePathStateState: mutateComposerPathStateState,
  updatePathPointAtState: updateComposerPathPointAtState,
  rebuildControlPoints: () => rebuildComposerControlPoints(),
  updatePathGeometry: () => updateComposerPathGeometry(),
  updatePointMaterials: (...args) => updateComposerPointMaterials(...args),
  updateCameraWaypointMaterials: (...args) => updateComposerCameraWaypointMaterials(...args),
  updateCameraFlightDisplay: () => updateComposerCameraFlightDisplay(),
  stopCameraFlightPreview: () => stopComposerCameraFlightPreview(),
  updateCamera: () => updateComposerCamera(),
  updateFrame: () => updateComposerFrame(),
  renderJsonPreview: () => renderComposerJsonPreview(),
  renderAssemblyEditor: () => renderComposerAssemblyEditor(),
  setSelectedAssembly: (...args) => setComposerSelectedAssembly(...args),
  clearSelectedPoint: (...args) => clearComposerSelectedPoint(...args),
  hideHoverTooltip,
  clearAssemblyHoverTooltipState: () => clearComposerAssemblyHoverTooltipState(),
  updateAssemblyHoverTooltip: (...args) => updateComposerAssemblyHoverTooltip(...args),
  closeAssemblyMenu: () => closeComposerAssemblyMenu(),
  openAssemblyPropertiesMenuAt: (...args) => openComposerAssemblyPropertiesMenuAt(...args),
  openPersonalitySlotMenuAt: (...args) => openComposerPersonalitySlotMenuAt(...args),
  openTimelineMenuAt: (...args) => openComposerTimelineMenuAt(...args),
  openPathPointMenuAt: (...args) => openComposerPathPointMenuAt(...args),
  openMemberMenuAt: (...args) => openComposerMemberMenuAt(...args),
  openSubassemblyMenuAt: (...args) => openComposerSubassemblyMenuAt(...args),
  openAssemblyTemplateMenuAt: (...args) => openComposerAssemblyTemplateMenuAt(...args),
  openTimelineSummaryMenuAt: (...args) => openComposerTimelineSummaryMenuAt(...args),
  getTimelineTimeAtClientX: (...args) => getComposerTimelineTimeAtClientX(...args),
  getTimelineTrack: () => composerTimelineTrack,
  resolveIndexedHit: (...args) => resolveComposerIndexedHit(...args),
  getPointerNdc: (...args) => getComposerPointerNdc(...args),
  resolveAssemblyHit: (...args) => resolveComposerAssemblyHit(...args),
  resolveMemberHandleHit: (...args) => resolveComposerMemberHandleHit(...args),
  resolveSubassemblyHandleHit: (...args) => resolveComposerSubassemblyHandleHit(...args),
  resolveGraphicOverlayHit: (...args) => resolveComposerGraphicOverlayHit(...args),
  resolvePersonalityHandleHit: (...args) => resolveComposerPersonalityHandleHit(...args),
  resolveAssemblyIdHit: (...args) => resolveComposerAssemblyIdHit(...args),
  findShellSurfaceHit: (...args) => findComposerShellSurfaceHit(...args),
  shouldPreferCenterMarker: (...args) => shouldPreferComposerCenterMarker(...args),
  getAssemblyMeshes: () => composerAssemblyMeshes,
  getPointMeshes: () => composerPointMeshes,
  getMemberHandleMeshes: () => composerMemberHandleMeshes,
  getPersonalityHandleMeshes: () => composerPersonalityHandleMeshes,
  getSubassemblyHandleMeshes: () => composerSubassemblyHandleMeshes,
  getGraphicOverlayHandleMeshes: () => composerGraphicOverlayHandleMeshes,
  getShellMeshes: () => composerShellMeshes,
  getOrbitParticleMeshes: () => composerOrbitParticleMeshes,
  getCameraWaypointMeshes: () => composerCameraWaypointMeshes,
});
const {
  onComposerPointerDown,
  onComposerContextMenu,
  onComposerTimelineContextMenu,
  onComposerTimelineSummaryContextMenu,
  onComposerPointerMove,
  onComposerPointerUp,
  onComposerWheel,
} = composerPointerInteractionRuntime;
const composerCanvasBootstrapRuntime = createComposerCanvasBootstrapRuntime({
  THREE,
  windowLike: globalThis.window,
  wireCanvasUiListeners: wireComposerCanvasUiListeners,
  dom: {
    composerCanvas,
    sceneButton: composerSceneButton,
    saveButton: composerSaveButton,
    cameraPoiSelect: composerCameraPoiSelect,
    assemblyAddButton: composerAssemblyAddButton,
    hudViewportToggleBindings: composerHudViewportToggleBindings,
    timelineTrack: composerTimelineTrack,
    timelineSummary: composerTimelineSummary,
    assemblyMenu: composerAssemblyMenu,
    overlay: composerOverlay,
    playToggleButton: composerPlayToggleButton,
    playResetButton: composerPlayResetButton,
    sceneIdInput: composerSceneIdInput,
  },
  getRenderer: () => composerRenderer,
  setRenderer: (value) => {
    composerRenderer = value;
  },
  setScene: (value) => {
    composerScene = value;
  },
  setCamera: (value) => {
    composerCamera = value;
  },
  setFrameGroup: (value) => {
    composerFrameGroup = value;
  },
  setViewportGroup: (value) => {
    composerViewportGroup = value;
  },
  setPathGeometry: (value) => {
    composerPathGeometry = value;
  },
  setPathLine: (value) => {
    composerPathLine = value;
  },
  setPointGeometry: (value) => {
    composerPointGeometry = value;
  },
  setPointMaterial: (value) => {
    composerPointMaterial = value;
  },
  setPointMaterialActive: (value) => {
    composerPointMaterialActive = value;
  },
  setRaycaster: (value) => {
    composerRaycaster = value;
  },
  getCameraFlightState: () => composerCameraFlightState,
  getAssemblyDraftsState: getComposerAssemblyDraftsState,
  operations: {
    setFrameDefaults: () => setComposerFrameDefaults(),
    setCameraDefaults: () => setComposerCameraDefaults(),
    setTransportButtonIcon: (...args) => setComposerTransportButtonIcon(...args),
    getMenuAnchorClientPosition: (...args) => getComposerMenuAnchorClientPosition(...args),
    openSceneMenuAt: (...args) => openComposerSceneMenuAt(...args),
    openLibraryMenuAt: (...args) => openComposerLibraryMenuAt(...args),
    updateCameraPoiStatus: () => updateComposerCameraPoiStatus(),
    syncCameraRadiusInput: () => syncComposerCameraRadiusInput(),
    ensureAssemblyDrafts: () => ensureComposerAssemblyDrafts(),
    appendAssemblyDraftState: (...args) => appendComposerAssemblyDraftState(...args),
    createDefaultAssemblyDraft: (...args) => createDefaultComposerAssemblyDraft(...args),
    renderAssemblyEditor: () => renderComposerAssemblyEditor(),
    renderJsonPreview: () => renderComposerJsonPreview(),
    toggleViewportDisplayFlag: (...args) => toggleComposerViewportDisplayFlag(...args),
    applyViewportDisplayState: () => applyComposerViewportDisplayState(),
    onPointerDown: (...args) => onComposerPointerDown(...args),
    onPointerMove: (...args) => onComposerPointerMove(...args),
    onPointerUp: (...args) => onComposerPointerUp(...args),
    onWheel: (...args) => onComposerWheel(...args),
    onContextMenu: (...args) => onComposerContextMenu(...args),
    onTimelineContextMenu: (...args) => onComposerTimelineContextMenu(...args),
    onTimelineClick: (...args) => onComposerTimelineClick(...args),
    onTimelineSummaryContextMenu: (...args) => onComposerTimelineSummaryContextMenu(...args),
    closeAssemblyMenu: () => closeComposerAssemblyMenu(),
    openTimelineSummaryMenuAt: (...args) => openComposerTimelineSummaryMenuAt(...args),
    addBuiltInAssembly: (...args) => addBuiltInComposerAssembly(...args),
    loadPathStateFromSelectedAssembly: () => loadComposerPathStateFromSelectedAssembly(),
    refreshLibraryUi: (...args) => refreshComposerLibraryUi(...args),
    updateCameraFlightDisplay: () => updateComposerCameraFlightDisplay(),
    updateWaypointCount: () => updateComposerWaypointCount(),
    updateFrame: () => updateComposerFrame(),
    updateCamera: () => updateComposerCamera(),
    resizeCanvas: () => resizeComposerCanvas(),
  },
});
const { initComposerCanvas } = composerCanvasBootstrapRuntime;
const composerEditorPreviewState = {
  renderMotionTimeOverride: null,
  renderMotionTimePlayhead: null,
  renderMotionProgressOverride: null,
  renderMotionProgressPlayhead: null,
};
const composerViewportModeState = {
  cameraSource: "design",
};
const composerPlaybackState = {
  playing: false,
  playheadSeconds: 0,
  lastTickMs: 0,
};
let composerSupplementalDraftState = {};

const composerDocumentWorkspaceRuntime = createComposerDocumentWorkspaceRuntime({
  documentLike: document,
  storage: globalThis.window?.localStorage ?? null,
  storageKey: "architrino.composer.library.v1",
  dom: {
    sceneIdInput: composerSceneIdInput,
    sceneNameInput: composerSceneNameInput,
    sceneDurationInput: composerSceneDurationInput,
    sceneLoopInput: composerSceneLoopInput,
    markerListInput: composerMarkerListInput,
    pauseListInput: composerPauseListInput,
    warpListInput: composerWarpListInput,
    transferListInput: composerTransferListInput,
    librarySelect: composerLibrarySelect,
    libraryLoadButton: composerLibraryLoadButton,
    libraryDeleteButton: composerLibraryDeleteButton,
    libraryStatus: composerLibraryStatus,
    jsonPreview: composerJsonPreview,
    frameScaleInput: composerFrameScaleInput,
    frameScaleLabel: composerFrameScaleLabel,
    cameraSpeedInput: composerCameraSpeedInput,
    cameraSpeedLabel: composerCameraSpeedLabel,
    cameraPoiSelect: composerCameraPoiSelect,
  },
  state: {
    pathState: composerPathState,
    frameState: composerFrameState,
    cameraState: composerCameraState,
    cameraOrbitState: composerCameraOrbitState,
    cameraFlightState: composerCameraFlightState,
    playbackState: composerPlaybackState,
    palette: composerPalette,
  },
  helpers: {
    sanitizeSceneId: sanitizeComposerId,
    normalizeAssemblyDraft: normalizeComposerAssemblyDraft,
    normalizeAssemblyPathPoints: normalizeComposerAssemblyPathPoints,
    formatTransferList: formatComposerTransferList,
    normalizeGraphicOverlayList: normalizeComposerGraphicOverlayList,
    parseTransfers: parseComposerTransfers,
    readTimingState: readComposerTimingState,
    updateTimingDiagnostics: updateComposerTimingDiagnostics,
    formatTimingStatus: formatComposerTimingStatus,
    formatScaleLabel,
    clampFn: clamp,
    vectorFromTriplet,
    getTransferListRaw: getComposerTransferListRaw,
  },
  operations: {
    ensureAssemblyDrafts: ensureComposerAssemblyDrafts,
    persistPathStateToSelectedAssembly: persistComposerPathStateToSelectedAssembly,
    renderAssemblyEditor: renderComposerAssemblyEditor,
    validateSelectedAssemblyId: validateComposerSelectedAssemblyId,
    setSelectedAssembly: setComposerSelectedAssembly,
    rebuildControlPoints: rebuildComposerControlPoints,
    updatePathGeometry: updateComposerPathGeometry,
    updatePointMaterials: updateComposerPointMaterials,
    updateFrame: updateComposerFrame,
    syncCameraRadiusInput: syncComposerCameraRadiusInput,
    stopCameraFlightPreview: stopComposerCameraFlightPreview,
    updateCameraFlightDisplay: updateComposerCameraFlightDisplay,
    updateWaypointCount: updateComposerWaypointCount,
    updateCameraPoiStatus: updateComposerCameraPoiStatus,
    updateCamera: updateComposerCamera,
    updateViewportFromDocument: updateComposerViewportFromDocument,
    renderTimeline: renderComposerTimeline,
    updateTimelinePlayhead: updateComposerTimelinePlayhead,
    setStatus: setComposerStatus,
  },
  accessors: {
    getAssemblyDraftsState: getComposerAssemblyDraftsState,
    setAssemblyDraftsState: setComposerAssemblyDraftsState,
    updateAssemblyDraftByIdState: updateComposerAssemblyDraftByIdState,
    getGraphicOverlayDraftsState: getComposerGraphicOverlayDraftsState,
    setGraphicOverlayDraftsState: setComposerGraphicOverlayDraftsState,
    getSelectedPointIndexState: getComposerSelectedPointIndexState,
    setSelectedPointIndexState: setComposerSelectedPointIndexState,
    getSelectedAssemblyIdState: getComposerSelectedAssemblyIdState,
    setTransferListRawStateValue: setComposerTransferListRawStateValue,
    getSupplementalDraftState: () => composerSupplementalDraftState,
    setSupplementalDraftState: (nextValue) => {
      composerSupplementalDraftState =
        nextValue && typeof nextValue === "object" ? { ...nextValue } : {};
    },
    setCurrentDocument: (documentData) => {
      composerCurrentDocument = documentData;
    },
  },
});

const {
  readComposerDraftState,
  getComposerLibraryEntries,
  writeComposerLibraryEntries,
  getComposerSortedLibraryEntries,
  refreshComposerLibraryUi,
  applyComposerDraftState,
  buildComposerDocumentData,
  buildComposerPreviewData,
  saveComposerSceneToLibrary,
  loadComposerSceneFromLibrary,
  clearComposerScene,
  deleteComposerSceneFromLibrary,
  renderComposerJsonPreview,
  importReactionFlowFromPicker,
} = composerDocumentWorkspaceRuntime;

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
    isStandaloneComposerApp &&
    navigateStandaloneComposerHome(globalThis.window?.location, standaloneNavigatorHref)
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
  const forceInstantComposerEntry = isComposerOverlaySceneId(config?.sceneId);
  const shouldHideLevelForComposer = shouldHideLevelForComposerOverlayScene(config?.sceneId);
  if (options.mode === "instant" || forceInstantComposerEntry) {
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
    setLevelOpacity(level, shouldHideLevelForComposer ? 0 : 1);
    setLevelLabelOpacity(level, 0);
    setLevelLinkOpacity(level, shouldHideLevelForComposer ? 0 : 1);
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
  if (isComposerOverlaySceneId(config.sceneId) || standaloneAppHref) {
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

const composerAppRuntime = createComposerAppRuntime({
  ui: {
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
  },
  controls: {
    composerTabs,
    composerClearButton,
    composerDocsButton,
    composerExitButton,
    composerPreviewButton,
    composerViewDesignButton,
    composerViewObserverButton,
    composerReactionBackButton,
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
    composerCameraSpeedInput,
    composerCameraRadiusInput,
    composerCameraResetButton,
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
    setComposerViewportCameraSource,
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
    exitReactionApp: () => {
      jumpToScene(composerScenePath, { mode: "instant" });
    },
    exitComposer: () => {
      if (
        isStandaloneComposerApp &&
        navigateStandaloneComposerHome(globalThis.window?.location, standaloneNavigatorHref)
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
const { composerUiRuntime } = composerAppRuntime;

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
  const requestedInitialScenePath = isStandaloneComposerApp
    ? getComposerInitialScenePath({
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
// The composer header reads generated repo signature metadata. Do not hand-edit header text here.
const composerHeaderTimestampRuntime = createComposerHeaderTimestampRuntime({
  element: composerTitle,
  signatureUrl: "./.tmp/composer-header-signature.json",
});

appDirector.init();
appShellUiRuntime.wireListeners();
scenePanelUiRuntime.wireListeners();
composerAppRuntime.wireListeners();
sceneSearchUiRuntime.wireListeners();
composerHeaderTimestampRuntime.init();
updateComposerViewportModeButtons();
window.addEventListener("keydown", (event) => {
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
  }
});
wireElementNavigationControls();
ensureElementNavigationData();
