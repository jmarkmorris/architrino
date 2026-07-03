import * as THREE from "../../../vendor/three/three.module.js";
import { CSS2DRenderer, CSS2DObject } from "../../../vendor/three/CSS2DRenderer.js";
import { AppDirector } from "../../director/AppDirector.js";
import { createLevelRuntime } from "../../runtime/LevelRuntime.js";
import { createMarkdownRuntime } from "../../runtime/MarkdownRuntime.js";
import { createFileSourceRuntime } from "../../runtime/FileSourceRuntime.js";
import { createNodeFactory } from "../../runtime/NodeFactoryRuntime.js";
import { hasActionableSceneSphereTarget } from "../../runtime/SceneSphereActionRuntime.js";
import {
  clampAnimatorTimelineSpan,
  ANIMATOR_TIMELINE_MIN_DURATION_SECONDS as animatorTimelineMinDurationSeconds,
  getAnimatorSceneTimeWindow,
  getAnimatorTimelineFraction,
  getAnimatorTimelineTimeAtClientX as getAnimatorTimelineTimeAtClientXRuntime,
} from "../../runtime/AnimatorTimelineRuntime.js";
import {
  animatorAssemblyTemplateMenuRows,
  animatorTimelineAddTypeEntries,
  animatorTimelineAddTypeIds,
  generationTransitions,
} from "../../runtime/AnimatorCatalogRuntime.js";
import {
  encodeAnimatorGraphicTargetValue,
  getAnimatorGraphicOverlayLabel,
  getAnimatorMediaDefaultRect,
  getAnimatorMediaOverlayLabel,
  getAnimatorOverlayKind,
} from "../../runtime/AnimatorOverlayRuntime.js";
import {
  buildAnimatorJsonPreviewMenu,
  buildAnimatorLibraryMenu,
  buildAnimatorSceneMenu,
  buildAnimatorTimelineSummaryMenu,
} from "../../runtime/AnimatorSceneMenuRuntime.js";
import { buildAnimatorTimelineMenu } from "../../runtime/AnimatorTimelineMenuRuntime.js";
import {
  openAnimatorAssemblyPropertiesMenu,
  openAnimatorAssemblyTemplateMenu,
  openAnimatorMemberMenu,
  openAnimatorPathPointMenu,
  openAnimatorPersonalitySlotMenu,
  openAnimatorSubassemblyMenu,
} from "../../runtime/AnimatorCanvasMenuRuntime.js";
import { createBuiltInAnimatorAssemblyDraftRuntime } from "../../runtime/AnimatorAssemblyFactoryRuntime.js";
import {
  buildAnimatorAssemblyStructure,
  formatAnimatorAssemblyStructureSummary,
  summarizeAnimatorAssemblyStructure,
} from "../../runtime/AnimatorAssemblyStructureBridgeRuntime.js";
import { splitAnimatorAssemblyGroup as splitAnimatorAssemblyGroupRuntime } from "../../runtime/AnimatorAssemblyStructureMutationRuntime.js";
import { createInteractionRuntime } from "../../runtime/InteractionRuntime.js";
import { createPeriodicOverlayRuntime } from "../../runtime/PeriodicOverlayRuntime.js";
import { createSceneSearchRuntime } from "../../runtime/SceneSearchRuntime.js";
import { createElementNavigationChromeRuntime } from "../../runtime/ElementNavigationChromeRuntime.js";
import { createElementNavigationRuntime } from "../../runtime/ElementNavigationRuntime.js";
import { createSceneSearchUiRuntime } from "../../runtime/SceneSearchUiRuntime.js";
import { createScenePanelUiRuntime } from "../../runtime/ScenePanelUiRuntime.js";
import { createAppShellUiRuntime } from "../../runtime/AppShellUiRuntime.js";
import { createAppSceneChromeRuntime } from "../../runtime/AppSceneChromeRuntime.js";
import { createSceneHudTooltipRuntime } from "../../runtime/SceneHudTooltipRuntime.js";
import { createSceneImageGalleryRuntime } from "../../runtime/SceneImageGalleryRuntime.js?v=2026-06-29-gallery-overlay-hide-scene";
import { createTextbookPageNavigationRuntime } from "../../runtime/TextbookPageNavigationRuntime.js";
import { wireAnimatorCanvasUiListeners } from "../../runtime/AnimatorCanvasUiRuntime.js";
import { normalizeAnimatorSceneDocument } from "../../runtime/Animator2SceneDocumentRuntime.js";
import {
  computeAnimatorViewportAutoscaleCameraState,
  getAnimatorActiveCameraShot,
  getAnimatorActiveCameraPathId,
  getAnimatorViewportAutoscaleTargetIds,
  resolveAnimatorShotInterval,
  resolveAnimatorViewportFramingState,
} from "../../runtime/AnimatorViewportFramingRuntime.js";
import {
  DEFAULT_SCENE_VIEWPORT_FIT_MARGIN,
  computeBoundsSceneFitZoom,
  computeCenteredSceneFitZoom,
} from "../../runtime/SceneViewportFitRuntime.js";
import {
  estimateLabelLineCount,
  resolveLabelTitleWeight,
  resolveSharedLabelTypography,
  resolveWrappedLabelFit,
} from "../../runtime/SceneLabelSizingRuntime.js";
import { resolveSharedSceneSphereRadius } from "../../runtime/SceneSphereSizingRuntime.js";
import {
  resolveCenterContextDescriptor,
  shouldAllowCenterContext,
} from "../../runtime/SceneCenterContextRuntime.js";
import { createSceneGraphRuntime } from "../../runtime/SceneGraphRuntime.js?v=2026-06-28-historical-context-single-ring";
import {
  RING_LAYOUT_DEFAULTS as ringLayoutDefaults,
  getRingGuardBand,
} from "../../runtime/RingLayoutRuntime.js?v=2026-06-28-historical-context-single-ring";
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
import { createTextbookTocNumberingService } from "../../services/TextbookTocNumberingService.js";
import { createTextbookTocNavigationService } from "../../services/TextbookTocNavigationService.js";
import {
  isAtomContextScene,
  isAtomicParticleFocusTarget,
  isHydePeriodicTableScene,
  isPeriodicTableScene,
  isStandardModelScene,
} from "../../services/SceneCapabilitiesService.js";
import { resolveStandaloneAppHrefForScene } from "../navigator/StandaloneAppLaunchRuntime.js";
import {
  ANIMATOR_SCENE_PATH,
  STANDALONE_ANIMATOR_NAVIGATOR_HREF,
  createAnimatorAppRuntime,
  createAnimatorAppStore,
  getAnimatorAppMode,
  getAnimatorInitialScenePath,
  isStandaloneAnimatorAppMode,
  navigateStandaloneAnimatorHome,
} from "../animator/AnimatorAppModeRuntime.js";
import {
  ANIMATOR_MEDIA_ASSET_DIRECTORIES as animatorMediaAssetDirectories,
  ANIMATOR_SUPPORTED_MEDIA_EXTENSIONS as animatorSupportedMediaExtensions,
  DEFAULT_ANIMATOR_ROOT_LAYOUT_MARGIN_PX as defaultRootLayoutMarginPx,
  getAnimatorDomElements,
} from "../animator/AnimatorDomRuntime.js";
import {
  createAnimatorDefaultCoreSpec,
  createAnimatorDefaultPathPoints,
  createDefaultAnimatorAssemblyDraft,
  sanitizeAnimatorEntityId,
  sanitizeAnimatorId,
} from "../animator/AnimatorDraftScaffoldRuntime.js";
import {
  formatAnimatorMemberList,
  formatAnimatorSubassemblyList,
  getAnimatorMemberId,
  getAnimatorMemberPosition,
  getAnimatorMemberState,
  getAnimatorSubassemblyId,
  isAnimatorPersonalityMember,
  normalizeAnimatorMemberList,
  normalizeAnimatorMemberPosition,
  normalizeAnimatorSubassemblyList,
  parseAnimatorMemberEntry,
  pruneAnimatorSubassemblyList,
  roundAnimatorTriplet,
} from "../animator/AnimatorAssemblyListRuntime.js";
import {
  createAnimatorGenIFermionPersonalityMembers,
  createAnimatorPersonalityMembers,
  describeAnimatorTransferProvenance,
  formatAnimatorTransferEndpointLabel,
  formatAnimatorTransferList,
  getAnimatorBuiltInPersonalityStates,
  getAnimatorGraphicDefaultOffset,
  sanitizeAnimatorGraphicTarget,
} from "../animator/AnimatorAuthoringHelpersRuntime.js";
import { createAnimatorAssemblyAuthoringRuntime } from "../animator/AnimatorAssemblyAuthoringRuntime.js";
import { createAnimatorAssemblyInspectorRuntime } from "../animator/AnimatorAssemblyInspectorRuntime.js";
import { createAnimatorAssemblyLabelRuntime } from "../animator/AnimatorAssemblyLabelRuntime.js";
import { createAnimatorAuthoringStateRuntime } from "../animator/AnimatorAuthoringStateRuntime.js";
import { createAnimatorCanvasBootstrapRuntime } from "../animator/AnimatorCanvasBootstrapRuntime.js";
import { createAnimatorCameraPathRuntime } from "../animator/AnimatorCameraPathRuntime.js";
import { createAnimatorDraftStateRuntime } from "../animator/AnimatorDraftStateRuntime.js";
import { createAnimatorPlaybackTimelineRuntime } from "../animator/AnimatorPlaybackTimelineRuntime.js";
import { createAnimatorPointerHitRuntime } from "../animator/AnimatorPointerHitRuntime.js";
import { createAnimatorPointerInteractionRuntime } from "../animator/AnimatorPointerInteractionRuntime.js";
import { createAnimatorRenderAssetsRuntime } from "../animator/AnimatorRenderAssetsRuntime.js";
import { createAnimatorStructureGeometryRuntime } from "../animator/AnimatorStructureGeometryRuntime.js";
import { createAnimatorTimelineOverlayRuntime } from "../animator/AnimatorTimelineOverlayRuntime.js";
import { createAnimatorDocumentWorkspaceRuntime } from "../animator/AnimatorDocumentWorkspaceRuntime.js";
import { createAnimatorViewportDisplayRuntime } from "../animator/AnimatorViewportDisplayRuntime.js";
import { createAnimatorViewportOverlayPillRuntime } from "../animator/AnimatorViewportOverlayPillRuntime.js";
import { createAnimatorViewportRenderRuntime } from "../animator/AnimatorViewportRenderRuntime.js";
import {
  combineAnimatorMotionSourceKinds,
  getAnimatorAssemblyMotionSourceKind,
  getAnimatorHistoryTraceMotionSourceKind,
  getAnimatorPathMotionSourceKind,
  isAnimatorMotionSourceVisible,
  summarizeAnimatorMotionSources,
} from "../animator/AnimatorMotionSourceRuntime.js";
import {
  computeAnimatorPlanarCameraState,
  getAnimatorInitialViewportProjection,
} from "../animator/AnimatorPlanarViewportRuntime.js";
import {
  createAnimatorFieldShellInstance,
  getAnimatorFieldShellEmitterPath,
  getAnimatorFieldShellRenderState,
} from "../animator/AnimatorFieldShellRuntime.js";
import {
  createAnimatorDelayedHitsFromSolverRows,
  createAnimatorDelayedHitTableRows,
  getAnimatorDelayedHitDiagnosticLabel,
  getAnimatorDelayedHitRenderState,
} from "../animator/AnimatorDelayedHitRuntime.js";
import {
  createAnimatorDelayedHitRowsFromStreamDescriptors,
} from "../../solver/app/AnimatorDelayedHitRows.mjs";
import {
  createAnimatorFieldShellCadenceTimes,
  createAnimatorFieldShellEventStreamPackage,
} from "../../solver/app/AnimatorFieldShellEventStream.mjs";
import {
  createAnimatorReceiverPathDescriptorPackage,
} from "../../solver/app/AnimatorReceiverPathDescriptors.mjs";
import {
  createAnimatorFadeableTrailSamples,
  createAnimatorTimedTrailSamples,
  getAnimatorTrailMaterialOpacity,
  normalizeAnimatorTrailControls,
} from "../animator/AnimatorTrailRuntime.js";
import {
  getAnimatorSimulationDataset,
  getAnimatorSimulationFrameMotion,
  getAnimatorSimulationParticleId,
  getAnimatorSimulationTimeForMotion,
  sampleAnimatorSimulationParticleAtTime,
  sampleAnimatorSimulationParticleTrail,
} from "../animator/AnimatorSimulationPlaybackRuntime.js";
import {
  applyAnimatorSimulationAuthoringDraftToDocument,
  buildAnimatorSimulationAuthoringWorkerPayload,
  createAnimatorSimulationAuthoringDraft,
  summarizeAnimatorSimulationAuthoringDataset,
} from "../animator/AnimatorSimulationAuthoringRuntime.js";
import {
  createAnimatorSimulationWorkerClient,
  mergeAnimatorSimulationDatasetIntoDocument,
} from "../animator/AnimatorSimulationWorkerRuntime.js";

const app = document.getElementById("app");
const canvas = document.getElementById("viz");
const navUpButton = document.getElementById("nav-up");
const navForwardButton = document.getElementById("nav-forward");
const sceneLabel = document.getElementById("scene-label");
const sceneHudTools = document.getElementById("scene-hud-tools");
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
const textbookTocButton = document.getElementById("textbook-toc-button");
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
const markdownPdfButton = document.getElementById("markdown-pdf-button");
const textbookPageNav = document.getElementById("textbook-page-nav");
const textbookPagePrevButton = document.getElementById("textbook-page-prev");
const textbookPageNextButton = document.getElementById("textbook-page-next");
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
  animatorOverlay,
  animatorViewDesignButton,
  animatorViewAuthoredButton,
  animatorViewPlanarButton,
  animatorSceneButton,
  animatorRunSimulationButton,
  animatorSimulationPanel,
  animatorSimulationModeSelect,
  animatorSimulationDurationInput,
  animatorSimulationLoopInput,
  animatorSimulationDatasetIdInput,
  animatorSimulationStepsInput,
  animatorSimulationDtInput,
  animatorSimulationStrideInput,
  animatorSimulationFieldSpeedInput,
  animatorSimulationKappaInput,
  animatorSimulationClaimLevelInput,
  animatorSimulationHistoryModeSelect,
  animatorSimulationRootHaltPolicySelect,
  animatorSimulationParticlesInput,
  animatorSimulationRadiusInput,
  animatorSimulationRadialSpeedInput,
  animatorSimulationTangentialSpeedInput,
  animatorSimulationDriftXInput,
  animatorSimulationDriftYInput,
  animatorSimulationApplyButton,
  animatorSimulationRunButton,
  animatorSimulationDiagnostics,
  animatorSimulationCacheStatus,
  animatorClearButton,
  animatorSaveButton,
  animatorDocsButton,
  animatorExitButton,
  animatorTabs,
  animatorPanels,
  animatorSceneIdInput,
  animatorSceneNameInput,
  animatorAssemblyList,
  animatorAssemblyDetail,
  animatorAssemblyAddButton,
  animatorPreviewButton,
  animatorExportButton,
  animatorLibrarySaveButton,
  animatorRepoSaveButton,
  animatorLibrarySelect,
  animatorLibraryLoadButton,
  animatorLibraryDeleteButton,
  animatorLibraryStatus,
  animatorPlayToggleButton,
  animatorPlayResetButton,
  animatorMarkerPrevButton,
  animatorMarkerNextButton,
  animatorMarkerJumpSelect,
  animatorPlayheadScrubInput,
  animatorStatus,
  animatorJsonPreview,
  animatorDelayedHitTable,
  animatorCanvas,
  animatorCanvasWrap,
  animatorViewportOverlays,
  animatorAssemblyMenu,
  animatorHudLabelsToggle,
  animatorHudPathsToggle,
  animatorHudHistoryToggle,
  animatorHudEnvelopesToggle,
  animatorHudShellOpacityInput,
  animatorHudTrailOpacityInput,
  animatorHudTrailLifetimeInput,
  animatorHudCameraGuidesToggle,
  animatorMotionSourcePill,
  animatorHudViewportToggleBindings,
  animatorPathModeSelect,
  animatorPathResetButton,
  animatorFrameResetButton,
  animatorFrameScaleInput,
  animatorFrameScaleLabel,
  animatorCameraSpeedInput,
  animatorCameraSpeedLabel,
  animatorCameraRadiusInput,
  animatorCameraRadiusLabel,
  animatorCameraResetButton,
  animatorCameraPoiSelect,
  animatorCameraWaypointAdd,
  animatorCameraWaypointClear,
  animatorCameraWaypointCount,
  animatorCameraPoiStatus,
  animatorCameraFlightToggle,
  animatorSceneDurationInput,
  animatorSceneLoopInput,
  animatorMarkerListInput,
  animatorPauseListInput,
  animatorWarpListInput,
  animatorTransferListInput,
  animatorMarkerStatus,
  animatorPauseStatus,
  animatorWarpStatus,
  animatorTransferStatus,
  animatorTimelineSummary,
  animatorTimelineActive,
  animatorTimelineTrack,
  animatorTimelineWarps,
  animatorTimelinePauses,
  animatorTimelineMarkers,
  animatorTimelinePlayhead,
} = getAnimatorDomElements(document);
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

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.setClearAlpha(0);
renderer.domElement.style.touchAction = "none";

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0";
labelRenderer.domElement.style.left = "0";
labelRenderer.domElement.style.pointerEvents = "none";
labelRenderer.domElement.style.zIndex = "2";
app.appendChild(labelRenderer.domElement);

const labelTextMeasureCanvas = document.createElement("canvas");
const labelTextMeasureContext = labelTextMeasureCanvas.getContext("2d");

function measureSceneLabelTextWidth({ text, fontSize, fontWeight }) {
  if (!labelTextMeasureContext || !Number.isFinite(fontSize) || fontSize <= 0) {
    return null;
  }
  labelTextMeasureContext.font =
    `${fontWeight ?? 600} ${fontSize}px "Helvetica Neue", Arial, sans-serif`;
  return labelTextMeasureContext.measureText(String(text ?? "")).width;
}

const scene = new THREE.Scene();
scene.background = null;
scene.add(new THREE.HemisphereLight(0xdce7ff, 0x070a12, 1.45));
const sphereKeyLight = new THREE.DirectionalLight(0xffffff, 0.62);
sphereKeyLight.position.set(-4, 6, 9);
scene.add(sphereKeyLight);
const sphereFillLight = new THREE.DirectionalLight(0x9ab6ff, 0.22);
sphereFillLight.position.set(6, -3, 5);
scene.add(sphereFillLight);

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
let animatorCurrentDocument = null;
const {
  panelMap: animatorPanelMap,
  palette: animatorPalette,
  pathState: animatorPathState,
  storeFacade: animatorEditorStoreFacade,
} = createAnimatorAppStore({
  palette: defaultAutoMarkdownPalette,
});
const animatorDraftStateRuntime = createAnimatorDraftStateRuntime({
  storeFacade: animatorEditorStoreFacade,
  normalizeAssemblyDraft: normalizeAnimatorAssemblyDraft,
});
const {
  getAssemblyDraftsState: getAnimatorAssemblyDraftsState,
  getGraphicOverlayDraftsState: getAnimatorGraphicOverlayDraftsState,
  getSelectedPointIndexState: getAnimatorSelectedPointIndexState,
  getSelectedAssemblyIdState: getAnimatorSelectedAssemblyIdState,
  getPendingTransferSourceState: getAnimatorPendingTransferSourceState,
  setAssemblyDraftsState: setAnimatorAssemblyDraftsState,
  appendAssemblyDraftState: appendAnimatorAssemblyDraftState,
  updateAssemblyDraftByIdState: updateAnimatorAssemblyDraftByIdState,
  setGraphicOverlayDraftsState: setAnimatorGraphicOverlayDraftsState,
  upsertGraphicOverlayDraftState: upsertAnimatorGraphicOverlayDraftState,
  removeGraphicOverlayDraftByIdState: removeAnimatorGraphicOverlayDraftByIdState,
  updateGraphicOverlayDraftByIdState: updateAnimatorGraphicOverlayDraftByIdState,
  setSelectedPointIndexState: setAnimatorSelectedPointIndexState,
  setSelectedAssemblyIdState: setAnimatorSelectedAssemblyIdState,
  setTransferListRawStateValue: setAnimatorTransferListRawStateValue,
  updatePathPointAtState: updateAnimatorPathPointAtState,
  mutatePathStateState: mutateAnimatorPathStateState,
  getAssemblyDraftIndexById: getAnimatorAssemblyDraftIndexById,
  getAssemblyDraftById: getAnimatorAssemblyDraftById,
  ensureAssemblyDrafts: ensureAnimatorAssemblyDrafts,
  getSelectedAssembly: getAnimatorSelectedAssembly,
  validateSelectedAssemblyId: validateAnimatorSelectedAssemblyId,
} = animatorDraftStateRuntime;
const animatorAssemblyLabelRuntime = createAnimatorAssemblyLabelRuntime({
  getCurrentDocument: () => animatorCurrentDocument,
  getAssemblyDrafts: getAnimatorAssemblyDraftsState,
  getSelectedAssemblyId: getAnimatorSelectedAssemblyIdState,
  normalizeMemberList: normalizeAnimatorMemberList,
  normalizeSubassemblyList: normalizeAnimatorSubassemblyList,
  getMemberId: getAnimatorMemberId,
});
const {
  getAssemblyLetter: getAnimatorAssemblyLetter,
  getPrimaryPathAssemblyLetter: getAnimatorPrimaryPathAssemblyLetter,
  isBareArchitrinoAssembly: isAnimatorBareArchitrinoAssembly,
  normalizeAssemblySceneRole: normalizeAnimatorAssemblySceneRole,
  getAssemblySceneRoleLabel: getAnimatorAssemblySceneRoleLabel,
  getAssemblySceneRoleGlyph: getAnimatorAssemblySceneRoleGlyph,
  getAssemblySceneRoleColor: getAnimatorAssemblySceneRoleColor,
  getAssemblyViewportLabel: getAnimatorAssemblyViewportLabel,
  getSelectedAssemblyLetter: getAnimatorSelectedAssemblyLetter,
} = animatorAssemblyLabelRuntime;
const animatorViewportDisplayRuntime = createAnimatorViewportDisplayRuntime({
  bindings: animatorHudViewportToggleBindings,
});
const {
  isFlagEnabled: isAnimatorViewportDisplayFlagEnabled,
  setFlag: setAnimatorViewportDisplayFlag,
  toggleFlag: toggleAnimatorViewportDisplayFlag,
  updateToggleState: updateAnimatorHudViewportToggleState,
} = animatorViewportDisplayRuntime;
const initialAnimatorFieldShellOpacityScale = Number(animatorHudShellOpacityInput?.value ?? 1);
let animatorFieldShellOpacityScale = Math.max(
  0,
  Math.min(1, Number.isFinite(initialAnimatorFieldShellOpacityScale) ? initialAnimatorFieldShellOpacityScale : 1)
);
const initialAnimatorTrailOpacityScale = Number(animatorHudTrailOpacityInput?.value ?? 1);
let animatorTrailOpacityScale = clamp(
  Number.isFinite(initialAnimatorTrailOpacityScale) ? initialAnimatorTrailOpacityScale : 1,
  0,
  1
);
const initialAnimatorTrailLifetimeSeconds = Number(animatorHudTrailLifetimeInput?.value ?? 6);
let animatorTrailLifetimeSeconds = clamp(
  Number.isFinite(initialAnimatorTrailLifetimeSeconds) ? initialAnimatorTrailLifetimeSeconds : 6,
  0.25,
  60
);
const animatorArchitrinoFieldShellEmissionIntervalSeconds = 0.25;
const animatorRenderAssetsRuntime = createAnimatorRenderAssetsRuntime({
  THREE,
  documentLike: document,
});
const {
  createAnimatorLozengeTexture,
  createAnimatorPointLabelTexture,
  createAnimatorMemberLabelTexture,
  createAnimatorGraphicOverlayTextTexture,
  createAnimatorGraphicOverlayTextSprite,
  updateAnimatorGraphicOverlayTextSprite,
  updateAnimatorPointLabelSprite,
  createAnimatorPointLabelSprite,
  createAnimatorCameraWaypointLabelTexture,
  updateAnimatorCameraWaypointLabelSprite,
  createAnimatorCameraWaypointLabelSprite,
  createAnimatorMemberLabelSprite,
  createAnimatorAssemblyBadgeTexture,
  createAnimatorAssemblyBadgeSprite,
  createAnimatorChildBadgeSprite,
} = animatorRenderAssetsRuntime;
const animatorStructureGeometryRuntime = createAnimatorStructureGeometryRuntime({
  THREE,
  clampFn: clamp,
  vectorFromTriplet,
  resolveGraphicTargetPosition: (...args) => resolveAnimatorGraphicTargetPosition(...args),
  getGraphicTargetRadius: (...args) => getAnimatorAssemblyGraphicTargetRadius(...args),
  normalizeAssemblyPathPoints: normalizeAnimatorAssemblyPathPoints,
  updateAssemblyDraftByIdState: updateAnimatorAssemblyDraftByIdState,
  getMemberId: getAnimatorMemberId,
  getAssemblyWorldCenters: () => animatorAssemblyWorldCenters,
  getFrameGroup: () => animatorFrameGroup,
  getCamera: () => animatorCamera,
  getViewportAutoscaleTargetIds: getAnimatorViewportAutoscaleTargetIds,
  computeViewportAutoscaleCameraState: computeAnimatorViewportAutoscaleCameraState,
});
const {
  resolveAnimatorGraphicTargetContactPosition,
  getAnimatorProxyMemberOffset,
  clearAnimatorMemberAnchors,
  setAnimatorMemberAnchor,
  getAnimatorOrbitBasis,
  getAnimatorOrbitOffsetAtTime,
  resolveAnimatorTransferEndpointPosition,
  findAnimatorCoreMemberId,
  getAnimatorPersonalitySlotLocalOffset,
  getAnimatorAssemblyWorldCenterById,
  shiftAnimatorPointTriplets,
  rebaseAnimatorAssemblyParentFrame,
  computeAnimatorAssemblyBasePosition,
  sampleAnimatorPointAt,
  sampleAnimatorCurvePoints,
  getAnimatorAutoscaledCameraState,
} = animatorStructureGeometryRuntime;
const animatorCameraPathRuntime = createAnimatorCameraPathRuntime({
  THREE,
  clampFn: clamp,
  formatScaleLabel,
  vectorFromTriplet,
  createDefaultPathPoints: createAnimatorDefaultPathPoints,
  getSelectedAssembly: getAnimatorSelectedAssembly,
  getSelectedAssemblyLetter: getAnimatorSelectedAssemblyLetter,
  getSelectedPointIndexState: getAnimatorSelectedPointIndexState,
  setSelectedPointIndexState: setAnimatorSelectedPointIndexState,
  getPathState: () => animatorPathState,
  mutatePathStateState: mutateAnimatorPathStateState,
  persistPathStateToSelectedAssembly: () => persistAnimatorPathStateToSelectedAssembly(),
  rebuildControlPoints: () => rebuildAnimatorControlPoints(),
  updatePathGeometry: () => updateAnimatorPathGeometry(),
  getCameraFlightState: () => animatorCameraFlightState,
  getCameraWaypointMeshes: () => animatorCameraWaypointMeshes,
  getCamera: () => animatorCamera,
  getCanvas: () => animatorCanvas,
  getBackgroundPathMarkers: () => animatorBackgroundPathMarkers,
  getPointMeshes: () => animatorPointMeshes,
  getPointMaterial: () => animatorPointMaterial,
  getPointMaterialActive: () => animatorPointMaterialActive,
  updatePointLabelSprite: (...args) => updateAnimatorPointLabelSprite(...args),
  updateCameraWaypointLabelSprite: (...args) =>
    updateAnimatorCameraWaypointLabelSprite(...args),
  getCameraOrbitState: () => animatorCameraOrbitState,
  getCameraState: () => animatorCameraState,
  updateCamera: () => updateAnimatorCamera(),
  getFrameGroup: () => animatorFrameGroup,
  getSelectedCameraWaypointIndex: () => animatorSelectedCameraWaypointIndex,
  setSelectedCameraWaypointIndex: (value) => {
    animatorSelectedCameraWaypointIndex = value;
  },
  updateCameraFlightDisplay: () => updateAnimatorCameraFlightDisplay(),
  renderJsonPreview: () => renderAnimatorJsonPreview(),
  getFrameState: () => animatorFrameState,
  dom: {
    frameScaleInput: animatorFrameScaleInput,
    frameScaleLabel: animatorFrameScaleLabel,
    cameraSpeedInput: animatorCameraSpeedInput,
    cameraSpeedLabel: animatorCameraSpeedLabel,
    cameraRadiusInput: animatorCameraRadiusInput,
    cameraRadiusLabel: animatorCameraRadiusLabel,
    cameraPoiStatus: animatorCameraPoiStatus,
    cameraWaypointCount: animatorCameraWaypointCount,
    cameraFlightToggle: animatorCameraFlightToggle,
    pathModeSelect: animatorPathModeSelect,
  },
});
const {
  setAnimatorFrameDefaults,
  setAnimatorCameraDefaults,
  updateAnimatorWaypointCount,
  updateAnimatorCameraWaypointMaterials,
  updateAnimatorCameraPoiStatus,
  getAnimatorOrbitTargetWorld,
  updateAnimatorOrbitFromPosition,
  syncAnimatorCameraRadiusInput,
  applyAnimatorCameraRadiusInput,
  addAnimatorCameraWaypoint,
  clearAnimatorCameraWaypoints,
  resetAnimatorPathPoints,
  addAnimatorPathPoint,
  updateAnimatorPointMaterials,
  updateAnimatorPathMarkerScales,
  sampleAnimatorCameraWaypointState,
  getAnimatorCameraWaypointDisplayPosition,
  startAnimatorCameraFlightPreview,
  stopAnimatorCameraFlightPreview,
} = animatorCameraPathRuntime;
const animatorViewportOverlayPillRuntime = createAnimatorViewportOverlayPillRuntime({
  THREE,
  documentLike: document,
  HTMLInputElementCtor: globalThis.HTMLInputElement,
  clampFn: clamp,
  samplePath: sampleAnimatorPath,
  formatTimeLabel: formatAnimatorTimeLabel,
  getPlaybackTimeForMotionProgress: (...args) =>
    getAnimatorPlaybackTimeForMotionProgress(...args),
  getViewportOverlays: () => animatorViewportOverlays,
  getCanvasWrap: () => animatorCanvasWrap,
  getCamera: () => animatorCamera,
  getFrameGroup: () => animatorFrameGroup,
  getOverlay: () => animatorOverlay,
  getCameraFlightState: () => animatorCameraFlightState,
  getViewportModeState: () => animatorViewportModeState,
  getSelectedPointIndexState: getAnimatorSelectedPointIndexState,
  setSelectedPointIndexState: setAnimatorSelectedPointIndexState,
  getPathState: () => animatorPathState,
  getPointMeshes: () => animatorPointMeshes,
  updatePointMaterials: (...args) => updateAnimatorPointMaterials(...args),
  updateCameraPoiStatus: () => updateAnimatorCameraPoiStatus(),
  updatePathPointAtState: updateAnimatorPathPointAtState,
  updatePathGeometry: () => updateAnimatorPathGeometry(),
  renderJsonPreview: () => renderAnimatorJsonPreview(),
  getCurrentDocument: () => animatorCurrentDocument,
});
const {
  clearAnimatorSelectedPoint,
  hideAnimatorPathPointInfoPill,
  updateAnimatorPathPointInfoPill,
} = animatorViewportOverlayPillRuntime;
const animatorPointerHitRuntime = createAnimatorPointerHitRuntime({
  getCanvas: () => animatorCanvas,
});
const {
  resolveAnimatorIndexedHit,
  getAnimatorPointerNdc,
  resolveAnimatorAssemblyHit,
  resolveAnimatorMemberHandleHit,
  resolveAnimatorSubassemblyHandleHit,
  resolveAnimatorGraphicOverlayHit,
  resolveAnimatorPersonalityHandleHit,
  resolveAnimatorAssemblyIdHit,
  findAnimatorShellSurfaceHit,
  findAnimatorCenterMarkerIntersection,
  shouldPreferAnimatorCenterMarker,
} = animatorPointerHitRuntime;
const animatorAssemblyInspectorRuntime = createAnimatorAssemblyInspectorRuntime({
  documentLike: document,
  getAssemblyListElement: () => animatorAssemblyList,
  getAssemblyDetailElement: () => animatorAssemblyDetail,
  validateSelectedAssemblyId: validateAnimatorSelectedAssemblyId,
  ensureAssemblyDrafts: ensureAnimatorAssemblyDrafts,
  getAssemblyDraftsState: getAnimatorAssemblyDraftsState,
  getSelectedAssemblyIdState: getAnimatorSelectedAssemblyIdState,
  getSelectedAssembly: getAnimatorSelectedAssembly,
  setSelectedAssembly: (...args) => setAnimatorSelectedAssembly(...args),
  renderJsonPreview: () => renderAnimatorJsonPreview(),
  openAssemblyPropertiesMenuAt: (...args) => openAnimatorAssemblyPropertiesMenuAt(...args),
  mutatePathStateState: mutateAnimatorPathStateState,
  setSelectedPointIndexState: setAnimatorSelectedPointIndexState,
  rebuildControlPoints: () => rebuildAnimatorControlPoints(),
  updatePathGeometry: () => updateAnimatorPathGeometry(),
  loadPathStateFromSelectedAssembly: () => loadAnimatorPathStateFromSelectedAssembly(),
  buildAssemblyStructure: buildAnimatorAssemblyStructure,
  summarizeAssemblyStructure: summarizeAnimatorAssemblyStructure,
  formatAssemblyStructureSummary: formatAnimatorAssemblyStructureSummary,
  getAssemblyDraftById: getAnimatorAssemblyDraftById,
  showHoverTooltip,
  hideHoverTooltip,
});
const {
  renderAnimatorAssemblyEditor,
  updateAnimatorAssemblyHoverTooltip,
  clearAnimatorAssemblyHoverTooltipState,
} = animatorAssemblyInspectorRuntime;
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

function normalizeAnimatorPathPoint(rawPoint) {
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

function normalizeAnimatorAssemblyPathPoints(rawPoints) {
  const source = Array.isArray(rawPoints) ? rawPoints : [];
  return source
    .map((point) => normalizeAnimatorPathPoint(point))
    .filter(Boolean);
}

function normalizeAnimatorAssemblyDraft(draft = {}, index = 0) {
  const fallback = createDefaultAnimatorAssemblyDraft(index);
  const name = String(draft.name ?? draft.label ?? fallback.name).trim() || fallback.name;
  const id = sanitizeAnimatorEntityId(draft.id || name, fallback.id);
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
    sceneRole: normalizeAnimatorAssemblySceneRole(draft.sceneRole ?? fallback.sceneRole),
    parentId: draft.parentId ? sanitizeAnimatorEntityId(draft.parentId, "") : "",
    position,
    members: normalizeAnimatorMemberList(draft.members),
    subassemblies: normalizeAnimatorSubassemblyList(draft.subassemblies),
    pathPoints: normalizeAnimatorAssemblyPathPoints(draft.pathPoints ?? fallback.pathPoints),
    pathInterpolate: draft.pathInterpolate === "polyline" ? "polyline" : fallback.pathInterpolate,
    pathClosed: !!draft.pathClosed,
    historyTraceEnabled: !!draft.historyTraceEnabled,
    envelopeEnabled: !!draft.envelopeEnabled,
    core: draft.core,
  };
}

function normalizeAnimatorTimelineAddType(rawType = "graphic") {
  const requestedAddType = String(rawType ?? "graphic").trim().toLowerCase();
  return animatorTimelineAddTypeIds.has(requestedAddType) ? requestedAddType : "graphic";
}

function getAnimatorTimelineEditKindTitle(editKind = "add") {
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

const animatorTimelineOverlayRuntime = createAnimatorTimelineOverlayRuntime({
  clampFn: clamp,
  minDurationSeconds: animatorTimelineMinDurationSeconds,
  sanitizeEntityId: sanitizeAnimatorEntityId,
  sanitizeTarget: sanitizeAnimatorGraphicTarget,
  getAssemblyDrafts: getAnimatorAssemblyDraftsState,
  getSelectedAssemblyId: getAnimatorSelectedAssemblyIdState,
  getSelectedPointIndex: getAnimatorSelectedPointIndexState,
  getGraphicOverlayDrafts: getAnimatorGraphicOverlayDraftsState,
  getCurrentDocument: () => animatorCurrentDocument,
  getAssemblyLetter: getAnimatorAssemblyLetter,
  normalizeAssemblyPathPoints: normalizeAnimatorAssemblyPathPoints,
  normalizeMemberList: normalizeAnimatorMemberList,
  normalizeSubassemblyList: normalizeAnimatorSubassemblyList,
  vectorFromTriplet,
  isBareArchitrinoAssembly: isAnimatorBareArchitrinoAssembly,
  readNumberInput,
  formatTimeLabel: formatAnimatorTimeLabel,
  setStatus: setAnimatorStatus,
  mediaAssetDirectories: animatorMediaAssetDirectories,
  supportedMediaExtensions: animatorSupportedMediaExtensions,
  dom: {
    sceneDurationInput: animatorSceneDurationInput,
    sceneLoopInput: animatorSceneLoopInput,
    markerListInput: animatorMarkerListInput,
    pauseListInput: animatorPauseListInput,
    warpListInput: animatorWarpListInput,
    transferListInput: animatorTransferListInput,
    markerStatus: animatorMarkerStatus,
    pauseStatus: animatorPauseStatus,
    warpStatus: animatorWarpStatus,
    transferStatus: animatorTransferStatus,
  },
});

const {
  parseAnimatorTransfers,
  getAnimatorTimelineAuthoringItems,
  findAnimatorTimelineOverlap,
  reportAnimatorTimelineOverlap,
  getAnimatorGraphicEnd,
  getAnimatorGraphicDefaultTarget,
  decodeAnimatorGraphicTargetValue,
  getAnimatorGraphicTargetEntries,
  normalizeAnimatorMediaRect,
  sanitizeAnimatorMediaSource,
  normalizeAnimatorGraphicOverlayDraft,
  normalizeAnimatorGraphicOverlayList,
  getAnimatorGraphicOverlayDraftIndexById,
  getAnimatorGraphicOverlayDraftById,
  getNextAnimatorGraphicOverlayId,
  getAnimatorGraphicTimelineOverlays,
  getAnimatorViewportMediaTimelineOverlays,
  isAnimatorTimeWithinSpan,
  resolveAnimatorGraphicTargetPosition,
  getAnimatorAssemblyGraphicTargetRadius,
  formatAnimatorTimingStatus,
  updateAnimatorTimingDiagnostics,
  readAnimatorTimingState,
} = animatorTimelineOverlayRuntime;
const animatorAuthoringStateRuntime = createAnimatorAuthoringStateRuntime({
  draftStateRuntime: animatorDraftStateRuntime,
  getPathState: () => animatorPathState,
  getPlaybackState: () => animatorPlaybackState,
  dom: {
    pathModeSelect: animatorPathModeSelect,
    transferListInput: animatorTransferListInput,
    sceneDurationInput: animatorSceneDurationInput,
    sceneLoopInput: animatorSceneLoopInput,
  },
  parseTransfers: parseAnimatorTransfers,
  createDefaultPathPoints: createAnimatorDefaultPathPoints,
  normalizeAssemblyPathPoints: normalizeAnimatorAssemblyPathPoints,
  normalizePathPoint: normalizeAnimatorPathPoint,
  vectorFromTriplet,
  operations: {
    rebuildControlPoints: rebuildAnimatorControlPoints,
    updatePathGeometry: updateAnimatorPathGeometry,
    updateCameraPoiStatus: updateAnimatorCameraPoiStatus,
  },
  windowLike: window,
});
const {
  appendAuthoringLine: appendAnimatorAuthoringLine,
  replaceAuthoringLineById: replaceAnimatorAuthoringLineById,
  setSceneDurationValue: setAnimatorSceneDurationValue,
  setSceneLoopValue: setAnimatorSceneLoopValue,
  getTransferListRaw: getAnimatorTransferListRaw,
  setTransferListRaw: setAnimatorTransferListRaw,
  appendTransferLine: appendAnimatorTransferLine,
  getParsedTransferEntries: getAnimatorParsedTransferEntries,
  clearPendingTransfer: clearAnimatorPendingTransfer,
  startTransferFromAssembly: startAnimatorTransferFromAssembly,
  completeTransferToAssembly: completeAnimatorTransferToAssembly,
  persistPathStateToAssembly: persistAnimatorPathStateToAssembly,
  loadPathStateFromSelectedAssembly: loadAnimatorPathStateFromSelectedAssembly,
  persistPathStateToSelectedAssembly: persistAnimatorPathStateToSelectedAssembly,
  setSelectedAssembly: setAnimatorSelectedAssembly,
} = animatorAuthoringStateRuntime;

function getAnimatorMemberColor(memberId, index = 0) {
  const normalized = typeof memberId === "object" && memberId !== null && !Array.isArray(memberId)
    ? getAnimatorMemberId(memberId, index).trim().toLowerCase()
    : String(memberId ?? "").trim().toLowerCase();
  const explicitState = getAnimatorMemberState(memberId);
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

function addAnimatorMemberLabel(assemblyId, memberId, color, options = {}) {
  if (!animatorViewportGroup || !assemblyId || !memberId) {
    return;
  }
  const sprite = createAnimatorMemberLabelSprite(memberId, color);
  const offset = Array.isArray(options.offset)
    ? new THREE.Vector3(options.offset[0] ?? 0, options.offset[1] ?? 0.08, options.offset[2] ?? 0)
    : new THREE.Vector3(0, 0.08, 0);
  sprite.userData.assemblyId = assemblyId;
  sprite.userData.memberId = memberId;
  sprite.userData.offset = offset;
  sprite.userData.motionSourceKind = getAnimatorAssemblyMotionSourceKind(
    getAnimatorDocumentAssemblyById(assemblyId)
  );
  animatorViewportGroup.add(sprite);
  animatorMemberLabelSprites.push(sprite);
}

function getAnimatorPersonalityMembers(assembly) {
  return normalizeAnimatorMemberList(assembly?.members).filter((member) => isAnimatorPersonalityMember(member));
}

function readNumberInput(input, fallback = 0) {
  if (!input) {
    return fallback;
  }
  const value = Number(input.value);
  return Number.isFinite(value) ? value : fallback;
}

function normalizePositiveNumber(value, fallback) {
  const normalized = Number(value);
  return Number.isFinite(normalized) && normalized > 0 ? normalized : fallback;
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

function setAnimatorTransportButtonIcon(button, kind) {
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

function createAnimatorMarkerHitProxy(radius) {
  const material = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    depthTest: false,
    depthWrite: false,
  });
  material.colorWrite = false;
  return new THREE.Mesh(new THREE.SphereGeometry(radius, 12, 12), material);
}

function disposeAnimatorMarkerHandle(mesh, labelKey = "pointLabelSprite") {
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

const ANIMATOR_FRAME_SCALE_BASELINE = 0.4;

function getAnimatorEffectiveFrameScale(value = animatorFrameState.scale) {
  const normalized = Math.max(0.01, Number(value ?? 1) || 1);
  return normalized * ANIMATOR_FRAME_SCALE_BASELINE;
}

function formatAnimatorTimeLabel(value) {
  const normalized = Number.isFinite(value) ? value : 0;
  return `${normalized.toFixed(1)}s`;
}

function formatAnimatorTimeInputValue(value) {
  const normalized = Number(value);
  return Number.isFinite(normalized) ? normalized.toFixed(1) : "0.0";
}

function getAnimatorNumericInputPrecision(step = null) {
  if (step == null) {
    return null;
  }
  const stepText = String(step);
  if (!stepText.includes(".")) {
    return 0;
  }
  return Math.max(0, stepText.length - stepText.indexOf(".") - 1);
}

function formatAnimatorNumericInputValue(value, step = null) {
  const normalized = Number(value);
  if (!Number.isFinite(normalized)) {
    return "";
  }
  const precision = getAnimatorNumericInputPrecision(step);
  if (precision == null) {
    return String(normalized);
  }
  return normalized.toFixed(precision);
}

const animatorAssemblyAuthoringRuntime = createAnimatorAssemblyAuthoringRuntime({
  getAnimatorAssemblyDraftById,
  updateAnimatorAssemblyDraftByIdState,
  setAnimatorStatus,
  getAnimatorPersonalityMembers,
  getAnimatorProxyMemberOffset,
  splitAnimatorAssemblyGroupRuntime,
});
const {
  addAnimatorAssemblyMemberByKind,
  createAnimatorSubassemblyFromMembers,
  ensureAnimatorAssemblyMemberRecord,
  getAnimatorAssemblySubassemblyIndex,
  getAnimatorAvailablePersonalitySlotCount,
  getAnimatorMemberSubassemblyId,
  getAnimatorPersonalitySlotCapacity,
  getNextAnimatorAssemblyMemberId,
  getNextAnimatorPersonalitySlotIndex,
  getNextAnimatorSubassemblyId,
  moveAnimatorMemberToRoot,
  moveAnimatorMemberToSubassembly,
  removeAnimatorAssemblyMember,
  resolveAnimatorAssemblyMemberLocalOffset,
  setAnimatorAssemblyMemberPosition,
  setAnimatorSubassemblyPosition,
  splitAnimatorAssemblyGroup,
} = animatorAssemblyAuthoringRuntime;

function getAnimatorCanvasLocalPointFromEvent(event) {
  if (!animatorCanvas || !animatorCamera || !animatorRaycaster || !animatorFrameGroup) {
    return new THREE.Vector3();
  }
  const { x, y } = getAnimatorPointerNdc(event);
  animatorRaycaster.setFromCamera({ x, y }, animatorCamera);
  const worldOrigin = animatorFrameGroup.getWorldPosition(new THREE.Vector3());
  const planeNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(
    animatorFrameGroup.quaternion
  );
  const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(planeNormal, worldOrigin);
  const intersection = new THREE.Vector3();
  if (animatorRaycaster.ray.intersectPlane(plane, intersection)) {
    return animatorFrameGroup.worldToLocal(intersection.clone());
  }
  return new THREE.Vector3();
}

function closeAnimatorAssemblyMenu() {
  if (!animatorAssemblyMenu) {
    return;
  }
  resetAnimatorAssemblyMenu();
  animatorAssemblyMenu.classList.remove("is-open");
  animatorAssemblyMenu.setAttribute("aria-hidden", "true");
}

function resetAnimatorAssemblyMenu(mode = "") {
  if (!animatorAssemblyMenu) {
    return;
  }
  animatorAssemblyMenu.innerHTML = "";
  animatorAssemblyMenu.classList.remove("is-timeline-menu");
  if (mode === "timeline") {
    animatorAssemblyMenu.classList.add("is-timeline-menu");
  }
}

function getAnimatorPathOwnerAssemblyId(path) {
  return path?.metadata?.ownerAssemblyId ?? path?.ownerAssemblyId ?? null;
}

function getAnimatorDocumentAssemblyById(assemblyId, documentData = animatorCurrentDocument) {
  if (!assemblyId) {
    return null;
  }
  const assemblies = Array.isArray(documentData?.assemblies) ? documentData.assemblies : [];
  return assemblies.find((assembly) => assembly?.id === assemblyId) ?? null;
}

function getAnimatorDocumentPathSourceKind(path, documentData = animatorCurrentDocument) {
  if (!path) {
    return "static";
  }
  const ownerAssembly = getAnimatorDocumentAssemblyById(
    getAnimatorPathOwnerAssemblyId(path),
    documentData
  );
  const pathSourceKind = getAnimatorPathMotionSourceKind(path);
  const assemblySourceKind = getAnimatorAssemblyMotionSourceKind(ownerAssembly);
  if (pathSourceKind !== "static") {
    return pathSourceKind;
  }
  return combineAnimatorMotionSourceKinds([pathSourceKind, assemblySourceKind]);
}

function getAnimatorSelectedDocumentPath(documentData = animatorCurrentDocument) {
  const paths = Array.isArray(documentData?.paths) ? documentData.paths : [];
  const assemblyDrafts = getAnimatorAssemblyDraftsState();
  const selectedAssemblyId = getAnimatorSelectedAssemblyIdState() ?? assemblyDrafts[0]?.id ?? null;
  const selectedOwnedPath =
    selectedAssemblyId != null
      ? paths.find((path) => getAnimatorPathOwnerAssemblyId(path) === selectedAssemblyId) ?? null
      : null;
  return selectedOwnedPath ?? (paths.length === 1 ? paths[0] : null);
}

function getAnimatorSelectedPathSourceKind(documentData = animatorCurrentDocument) {
  const selectedPath = getAnimatorSelectedDocumentPath(documentData);
  return selectedPath ? getAnimatorDocumentPathSourceKind(selectedPath, documentData) : "authored";
}

function getAnimatorTransferSourceKind(transfer, assemblyById = new Map()) {
  const sourceKind = getAnimatorAssemblyMotionSourceKind(
    assemblyById.get(transfer?.source?.assemblyId)
  );
  const targetKind = getAnimatorAssemblyMotionSourceKind(
    assemblyById.get(transfer?.target?.assemblyId)
  );
  return combineAnimatorMotionSourceKinds([sourceKind, targetKind]);
}

function getAnimatorEnvelopeSourceKind(envelope, assemblyById = new Map()) {
  const explicitSource = envelope?.metadata?.motionSource;
  if (explicitSource) {
    return combineAnimatorMotionSourceKinds([explicitSource]);
  }
  if (envelope?.metadata?.simulationFieldShellId) {
    return "solver-derived";
  }
  return getAnimatorAssemblyMotionSourceKind(assemblyById.get(envelope?.assemblyId));
}

function isAnimatorMotionSourceKindVisible(sourceKind) {
  return isAnimatorMotionSourceVisible(sourceKind, animatorViewportDisplayRuntime.state);
}

function isAnimatorThreeObjectMotionSourceVisible(object) {
  return isAnimatorMotionSourceKindVisible(object?.userData?.motionSourceKind ?? "static");
}

function isAnimatorPlanarViewportActive() {
  return animatorViewportModeState.projection === "planar-2d";
}

function applyAnimatorPlanarViewportCamera(documentData = animatorCurrentDocument) {
  if (!animatorCamera || !documentData) {
    return;
  }
  const state = computeAnimatorPlanarCameraState(documentData, {
    aspect: Number(animatorCamera.aspect ?? 1) || 1,
    verticalFovDegrees: Number(animatorCamera.fov ?? 45) || 45,
    minDistance: 6,
  });
  const position = vectorFromTriplet(state.position);
  const lookAt = vectorFromTriplet(state.lookAt);
  const up = vectorFromTriplet(state.up);
  animatorCamera.position.copy(position);
  animatorCamera.up.copy(up);
  animatorCamera.lookAt(lookAt);
  animatorCameraState.position.copy(position);
}

function clearAnimatorBackgroundPathLines() {
  animatorBackgroundPathLines.forEach((line) => {
    animatorFrameGroup?.remove(line);
    line.geometry?.dispose?.();
    line.material?.dispose?.();
  });
  animatorBackgroundPathLines = [];
  animatorBackgroundPathMarkers.forEach((marker) => {
    const labelSprite = marker.userData?.pointLabelSprite;
    if (labelSprite?.material?.map) {
      labelSprite.material.map.dispose?.();
    }
    labelSprite?.material?.dispose?.();
    animatorFrameGroup?.remove(marker);
    marker.geometry?.dispose?.();
    marker.material?.dispose?.();
  });
  animatorBackgroundPathMarkers = [];
}

function rebuildAnimatorPathDisplayFromDocument(documentData) {
  clearAnimatorBackgroundPathLines();
  if (!animatorPathGeometry || !animatorFrameGroup) {
    return;
  }
  const paths = Array.isArray(documentData?.paths) ? documentData.paths : [];
  const assemblies = Array.isArray(documentData?.assemblies) ? documentData.assemblies : [];
  const assemblyById = new Map(
    assemblies.map((assembly) => [assembly?.id ?? "", assembly])
  );
  const selectedPath = getAnimatorSelectedDocumentPath(documentData);
  const selectedPathSourceKind = getAnimatorSelectedPathSourceKind(documentData);
  if (animatorPathLine) {
    animatorPathLine.userData.motionSourceKind = selectedPathSourceKind;
  }
  const selectedSamples = sampleAnimatorPath(
    selectedPath?.payload?.points ?? [],
    selectedPath?.payload?.interpolate ?? animatorPathState.interpolate,
    !!selectedPath?.payload?.closed
  );
  animatorPathGeometry.setFromPoints(selectedSamples);
  if (selectedSamples.length) {
    animatorPathGeometry.computeBoundingSphere();
  }

  paths.forEach((path) => {
    const samples = sampleAnimatorPath(
      path?.payload?.points ?? [],
      path?.payload?.interpolate ?? "spline",
      !!path?.payload?.closed
    );
    if (!samples.length) {
      return;
    }
    const sourceKind = getAnimatorDocumentPathSourceKind(path, documentData);
    const style = path?.style && typeof path.style === "object" ? path.style : {};
    const opacity = Number(style.opacity);
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(samples),
      new THREE.LineBasicMaterial({
        color: style.color ?? 0x8bdcff,
        transparent: true,
        opacity: Number.isFinite(opacity) ? opacity : 0.28,
      })
    );
    line.userData.ownerAssemblyId = getAnimatorPathOwnerAssemblyId(path);
    line.userData.motionSourceKind = sourceKind;
    line.userData.isSelectedPathBackground = path === selectedPath;
    animatorFrameGroup.add(line);
    animatorBackgroundPathLines.push(line);
    const labelPrefix = path?.metadata?.labelPrefix ?? "";
    const pathPoints = Array.isArray(path?.payload?.points) ? path.payload.points : [];
    if (pathPoints.length && labelPrefix && animatorPointGeometry && animatorPointMaterial) {
      const bareOriginMarker = isAnimatorBareArchitrinoAssembly(
        assemblyById.get(getAnimatorPathOwnerAssemblyId(path))
      );
      pathPoints.forEach((point, index) => {
        const marker = new THREE.Mesh(animatorPointGeometry, animatorPointMaterial);
        marker.position.copy(vectorFromTriplet(point));
        marker.userData.motionSourceKind = sourceKind;
        if (!(bareOriginMarker && index === 0)) {
          const labelSprite = createAnimatorPointLabelSprite(labelPrefix);
          labelSprite.position.set(0, 0, 0);
          marker.userData.pointLabelSprite = labelSprite;
          marker.add(labelSprite);
        }
        animatorFrameGroup.add(marker);
        animatorBackgroundPathMarkers.push(marker);
      });
    }
  });
}

function applyAnimatorViewportDisplayState() {
  const showTransportPath = isAnimatorViewportDisplayFlagEnabled("showTransportPath");
  const showCameraGuides = isAnimatorViewportDisplayFlagEnabled("showCameraGuides");
  const showLabels = isAnimatorViewportDisplayFlagEnabled("showLabels");
  const showHistoryTraces = isAnimatorViewportDisplayFlagEnabled("showHistoryTraces");
  const showDelayedHits = isAnimatorViewportDisplayFlagEnabled("showDelayedHits");
  const showEnvelopes = isAnimatorViewportDisplayFlagEnabled("showEnvelopes");
  const isObserverViewActive =
    animatorCameraFlightState.preview || animatorViewportModeState.cameraSource === "authored";
  const showObserverGuidesInViewport =
    showCameraGuides && !isObserverViewActive && !isAnimatorPlanarViewportActive();
  if (animatorPathLine) {
    animatorPathLine.visible =
      showTransportPath && isAnimatorThreeObjectMotionSourceVisible(animatorPathLine);
  }
  animatorBackgroundPathLines.forEach((line) => {
    line.visible = showTransportPath && isAnimatorThreeObjectMotionSourceVisible(line);
  });
  animatorBackgroundPathMarkers.forEach((marker) => {
    marker.visible = showTransportPath && isAnimatorThreeObjectMotionSourceVisible(marker);
    const labelSprite = marker.userData?.pointLabelSprite;
    if (labelSprite) {
      labelSprite.visible = true;
    }
  });
  animatorPointMeshes.forEach((mesh) => {
    mesh.visible = showTransportPath && isAnimatorThreeObjectMotionSourceVisible(mesh);
    const labelSprite = mesh.userData?.pointLabelSprite;
    if (labelSprite) {
      labelSprite.visible = true;
    }
  });
  animatorAssemblyMeshes.forEach((mesh) => {
    mesh.visible = isAnimatorThreeObjectMotionSourceVisible(mesh);
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
  animatorShellMeshes.forEach((mesh) => {
    mesh.visible = isAnimatorThreeObjectMotionSourceVisible(mesh);
  });
  animatorOrbitTraceLines.forEach((line) => {
    line.visible = isAnimatorThreeObjectMotionSourceVisible(line);
  });
  animatorAxisGuideLines.forEach((line) => {
    line.visible = isAnimatorThreeObjectMotionSourceVisible(line);
  });
  animatorOrbitParticleMeshes.forEach((mesh) => {
    mesh.visible = isAnimatorThreeObjectMotionSourceVisible(mesh);
  });
  if (animatorDocumentCameraPathLine) {
    animatorDocumentCameraPathLine.visible = showObserverGuidesInViewport;
  }
  animatorDocumentCameraWaypointMeshes.forEach((mesh) => {
    mesh.visible = showObserverGuidesInViewport;
  });
  if (animatorDocumentCameraShotMesh) {
    animatorDocumentCameraShotMesh.visible = showObserverGuidesInViewport;
  }
  if (animatorDocumentCameraTargetMesh) {
    animatorDocumentCameraTargetMesh.visible = showObserverGuidesInViewport;
  }
  if (animatorDocumentCameraLookLine) {
    animatorDocumentCameraLookLine.visible = showObserverGuidesInViewport;
  }
  if (animatorCameraFlightGroup) {
    animatorCameraFlightGroup.visible = showObserverGuidesInViewport;
  }
  animatorHistoryTraceLines.forEach((line) => {
    refreshAnimatorHistoryTraceMaterial(line);
    line.visible = showHistoryTraces && isAnimatorThreeObjectMotionSourceVisible(line);
  });
  animatorEnvelopeMeshes.forEach((mesh) => {
    mesh.visible = showEnvelopes && isAnimatorThreeObjectMotionSourceVisible(mesh);
  });
  animatorFieldShellMeshes.forEach((mesh) => {
    mesh.visible =
      showEnvelopes &&
      mesh?.userData?.visibleByMotionState !== false &&
      isAnimatorThreeObjectMotionSourceVisible(mesh);
  });
  if (animatorPathHistoryLineSegments) {
    animatorPathHistoryLineSegments.visible =
      showDelayedHits &&
      animatorPathHistoryLineSegments?.userData?.visibleByMotionState !== false &&
      isAnimatorThreeObjectMotionSourceVisible(animatorPathHistoryLineSegments);
  }
  animatorDelayedHitGroups.forEach((group) => {
    group.visible =
      showDelayedHits &&
      group?.userData?.visibleByMotionState !== false &&
      isAnimatorThreeObjectMotionSourceVisible(group);
  });
  if (animatorDelayedHitTable && !showDelayedHits) {
    animatorDelayedHitTable.hidden = true;
  }
  animatorCameraWaypointMeshes.forEach((mesh) => {
    const labelSprite = mesh.userData?.labelSprite;
    if (labelSprite) {
      labelSprite.visible = showLabels;
    }
  });
  animatorMemberLabelSprites.forEach((sprite) => {
    sprite.visible = showLabels && isAnimatorThreeObjectMotionSourceVisible(sprite);
  });
  animatorTransferLines.forEach((line) => {
    line.visible =
      line?.userData?.visibleByMotionState !== false &&
      isAnimatorThreeObjectMotionSourceVisible(line);
  });
  updateAnimatorHudViewportToggleState();
}

function positionAnimatorAssemblyMenu(clientX, clientY, width = 220, height = 160) {
  if (!animatorAssemblyMenu || !animatorCanvasWrap) {
    return;
  }
  const wrapRect = animatorCanvasWrap.getBoundingClientRect();
  animatorAssemblyMenu.style.width = `${width}px`;
  animatorAssemblyMenu.classList.add("is-open");
  animatorAssemblyMenu.setAttribute("aria-hidden", "false");
  const measuredWidth = animatorAssemblyMenu.offsetWidth || width;
  const measuredHeight = animatorAssemblyMenu.offsetHeight || height;
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
  animatorAssemblyMenu.style.left = `${left}px`;
  animatorAssemblyMenu.style.top = `${top}px`;
}

function getAnimatorMenuAnchorClientPosition(element) {
  const rect = element?.getBoundingClientRect?.();
  if (!rect) {
    return { x: 24, y: 24 };
  }
  return {
    x: rect.left + rect.width * 0.5,
    y: rect.bottom + 10,
  };
}

function appendAnimatorMenuRangeControl(parent, options = {}) {
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
  field.className = "animator-field animator-range-field";
  const fieldLabel = document.createElement("span");
  fieldLabel.textContent = label;
  const row = document.createElement("div");
  row.className = "animator-range-row";
  const input = document.createElement("input");
  input.className = "animator-range";
  input.type = "range";
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(value);
  const output = document.createElement("span");
  output.className = "animator-range-value";
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

function appendAnimatorMenuSectionHeader(parent, title, tag = "") {
  if (!parent) {
    return null;
  }
  const header = document.createElement("div");
  header.className = "animator-assembly-menu-section-header";
  const titleNode = document.createElement("div");
  titleNode.className = "animator-assembly-menu-subtitle";
  titleNode.textContent = title;
  header.appendChild(titleNode);
  if (tag) {
    const tagNode = document.createElement("div");
    tagNode.className = "animator-assembly-menu-section-tag";
    tagNode.textContent = tag;
    header.appendChild(tagNode);
  }
  parent.appendChild(header);
  return header;
}

function appendAnimatorMenuButtonRow(parent, configs = []) {
  if (!parent || !Array.isArray(configs) || !configs.length) {
    return [];
  }
  const row = document.createElement("div");
  row.className = "animator-button-row";
  const buttons = configs.map((config) => {
    if (!config) {
      const spacer = document.createElement("div");
      spacer.className = "animator-assembly-menu-spacer";
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

function appendAnimatorMenuField(parent, options = {}) {
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
  field.className = "animator-field";
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
        ? formatAnimatorNumericInputValue(value, step)
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

function appendAnimatorMenuSelectField(parent, options = {}) {
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
  field.className = "animator-field";
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

function appendAnimatorMenuBlock(parent, title, actionConfig = null) {
  if (!parent) {
    return null;
  }
  const block = document.createElement("div");
  block.className = "animator-assembly-menu-block";
  const header = document.createElement("div");
  header.className = "animator-assembly-menu-block-header";
  const titleNode = document.createElement("div");
  titleNode.className = "animator-assembly-menu-subtitle";
  titleNode.textContent = title;
  header.appendChild(titleNode);
  let actionButton = null;
  if (actionConfig && typeof actionConfig.onClick === "function") {
    actionButton = document.createElement("button");
    actionButton.type = "button";
    actionButton.className = "animator-assembly-menu-inline-action";
    actionButton.textContent = actionConfig.text ?? "Add";
    actionButton.addEventListener("click", actionConfig.onClick);
    header.appendChild(actionButton);
  }
  block.appendChild(header);
  parent.appendChild(block);
  return { block, header, titleNode, actionButton };
}

function appendAnimatorMenuNote(parent, text) {
  if (!parent || !text) {
    return null;
  }
  const note = document.createElement("div");
  note.className = "animator-field-note";
  note.textContent = text;
  parent.appendChild(note);
  return note;
}

function openAnimatorMemberMenuAt(clientX, clientY, assemblyId, memberId) {
  openAnimatorMemberMenu({
    menu: animatorAssemblyMenu,
    clientX,
    clientY,
    assemblyId,
    memberId,
    getAssemblyDraftById: getAnimatorAssemblyDraftById,
    sanitizeEntityId: sanitizeAnimatorEntityId,
    getMemberSubassemblyId: getAnimatorMemberSubassemblyId,
    resolveAssemblyMemberLocalOffset: resolveAnimatorAssemblyMemberLocalOffset,
    normalizeSubassemblyList: normalizeAnimatorSubassemblyList,
    getSubassemblyId: getAnimatorSubassemblyId,
    resetMenu: resetAnimatorAssemblyMenu,
    appendMenuNote: appendAnimatorMenuNote,
    appendMenuButtonRow: appendAnimatorMenuButtonRow,
    appendMenuSectionHeader: appendAnimatorMenuSectionHeader,
    closeMenu: closeAnimatorAssemblyMenu,
    renderAssemblyEditor: renderAnimatorAssemblyEditor,
    renderJsonPreview: renderAnimatorJsonPreview,
    moveMemberToRoot: moveAnimatorMemberToRoot,
    openMemberMenuAt: openAnimatorMemberMenuAt,
    createSubassemblyFromMembers: createAnimatorSubassemblyFromMembers,
    openSubassemblyMenuAt: openAnimatorSubassemblyMenuAt,
    removeAssemblyMember: removeAnimatorAssemblyMember,
    openAssemblyPropertiesMenuAt: openAnimatorAssemblyPropertiesMenuAt,
    moveMemberToSubassembly: moveAnimatorMemberToSubassembly,
    positionMenu: positionAnimatorAssemblyMenu,
  });
}

function openAnimatorPersonalitySlotMenuAt(clientX, clientY, assemblyId, memberId) {
  return openAnimatorPersonalitySlotMenu({
    menu: animatorAssemblyMenu,
    clientX,
    clientY,
    assemblyId,
    memberId,
    getAssemblyDraftById: getAnimatorAssemblyDraftById,
    normalizeMemberList: normalizeAnimatorMemberList,
    getMemberId: getAnimatorMemberId,
    sanitizeEntityId: sanitizeAnimatorEntityId,
    isPersonalityMember: isAnimatorPersonalityMember,
    getMemberState: getAnimatorMemberState,
    resetMenu: resetAnimatorAssemblyMenu,
    appendMenuNote: appendAnimatorMenuNote,
    appendMenuButtonRow: appendAnimatorMenuButtonRow,
    ensureAssemblyMemberRecord: ensureAnimatorAssemblyMemberRecord,
    closeMenu: closeAnimatorAssemblyMenu,
    renderJsonPreview: renderAnimatorJsonPreview,
    positionMenu: positionAnimatorAssemblyMenu,
  });
}

function openAnimatorSubassemblyMenuAt(clientX, clientY, assemblyId, subassemblyId) {
  openAnimatorSubassemblyMenu({
    menu: animatorAssemblyMenu,
    clientX,
    clientY,
    assemblyId,
    subassemblyId,
    getAssemblyDraftById: getAnimatorAssemblyDraftById,
    sanitizeEntityId: sanitizeAnimatorEntityId,
    normalizeSubassemblyList: normalizeAnimatorSubassemblyList,
    getSubassemblyId: getAnimatorSubassemblyId,
    resetMenu: resetAnimatorAssemblyMenu,
    appendMenuNote: appendAnimatorMenuNote,
    appendMenuButtonRow: appendAnimatorMenuButtonRow,
    appendMenuSectionHeader: appendAnimatorMenuSectionHeader,
    splitGroup: splitAnimatorAssemblyGroup,
    closeMenu: closeAnimatorAssemblyMenu,
    renderAssemblyEditor: renderAnimatorAssemblyEditor,
    renderJsonPreview: renderAnimatorJsonPreview,
    openAssemblyPropertiesMenuAt: openAnimatorAssemblyPropertiesMenuAt,
    openMemberMenuAt: openAnimatorMemberMenuAt,
    positionMenu: positionAnimatorAssemblyMenu,
  });
}

function openAnimatorAssemblyTemplateMenuAt(event) {
  openAnimatorAssemblyTemplateMenu({
    menu: animatorAssemblyMenu,
    event,
    localPoint: getAnimatorCanvasLocalPointFromEvent(event),
    resetMenu: resetAnimatorAssemblyMenu,
    appendMenuButtonRow: appendAnimatorMenuButtonRow,
    appendMenuNote: appendAnimatorMenuNote,
    appendMenuSectionHeader: appendAnimatorMenuSectionHeader,
    templateMenuRows: animatorAssemblyTemplateMenuRows,
    openSceneMenuAt: openAnimatorSceneMenuAt,
    openLibraryMenuAt: openAnimatorLibraryMenuAt,
    cameraFlightState: animatorCameraFlightState,
    addCameraWaypoint: addAnimatorCameraWaypoint,
    closeMenu: closeAnimatorAssemblyMenu,
    updateCameraPoiStatus: updateAnimatorCameraPoiStatus,
    clearCameraWaypoints: clearAnimatorCameraWaypoints,
    getSelectedAssemblyLetter: getAnimatorSelectedAssemblyLetter,
    animatorFrameEditModeRef: {
      get: () => animatorFrameEditMode,
      set: (value) => {
        animatorFrameEditMode = !!value;
      },
    },
    setAnimatorFrameDefaults,
    updateAnimatorFrame,
    appendMenuRangeControl: appendAnimatorMenuRangeControl,
    formatScaleLabel,
    animatorFrameState,
    renderJsonPreview: renderAnimatorJsonPreview,
    setAnimatorCameraDefaults,
    updateAnimatorCamera,
    animatorCameraState,
    animatorCameraOrbitState,
    positionMenu: positionAnimatorAssemblyMenu,
  });
}

function openAnimatorAssemblyPropertiesMenuAt(clientX, clientY, assemblyId) {
  openAnimatorAssemblyPropertiesMenu({
    menu: animatorAssemblyMenu,
    clientX,
    clientY,
    assemblyId,
    getAssemblyDraftIndexById: getAnimatorAssemblyDraftIndexById,
    assemblyDrafts: getAnimatorAssemblyDraftsState(),
    setSelectedAssembly: setAnimatorSelectedAssembly,
    resetMenu: resetAnimatorAssemblyMenu,
    pendingTransferSource: getAnimatorPendingTransferSourceState(),
    appendMenuNote: appendAnimatorMenuNote,
    appendMenuSectionHeader: appendAnimatorMenuSectionHeader,
    appendMenuButtonRow: appendAnimatorMenuButtonRow,
    getAssemblyDraftById: getAnimatorAssemblyDraftById,
    renderAssemblyEditor: renderAnimatorAssemblyEditor,
    renderJsonPreview: renderAnimatorJsonPreview,
    closeMenu: closeAnimatorAssemblyMenu,
    clearPendingTransfer: clearAnimatorPendingTransfer,
    openAssemblyPropertiesMenuAt: openAnimatorAssemblyPropertiesMenuAt,
    ensureAssemblyDrafts: ensureAnimatorAssemblyDrafts,
    positionMenu: positionAnimatorAssemblyMenu,
  });
}

function getNextAnimatorAssemblyId(baseId) {
  const normalizedBase = sanitizeAnimatorEntityId(baseId, "assembly");
  let suffix = 1;
  let candidate = normalizedBase;
  const existingIds = new Set(getAnimatorAssemblyDraftsState().map((assembly) => assembly?.id));
  while (existingIds.has(candidate)) {
    suffix += 1;
    candidate = `${normalizedBase}_${suffix}`;
  }
  return candidate;
}

function createBuiltInAnimatorAssemblyDraft(templateId, position = [0, 0, 0], options = {}) {
  return createBuiltInAnimatorAssemblyDraftRuntime(templateId, position, {
    sceneRole: options.sceneRole,
    normalizeSceneRole: normalizeAnimatorAssemblySceneRole,
    normalizeAssemblyDraft: normalizeAnimatorAssemblyDraft,
    getDraftCount: () => getAnimatorAssemblyDraftsState().length,
    getNextAssemblyId: getNextAnimatorAssemblyId,
    createDefaultPathPoints: createAnimatorDefaultPathPoints,
    createDefaultCoreSpec: createAnimatorDefaultCoreSpec,
    createPersonalityMembers: createAnimatorPersonalityMembers,
    getBuiltInPersonalityStates: getAnimatorBuiltInPersonalityStates,
    createGenIFermionPersonalityMembers: createAnimatorGenIFermionPersonalityMembers,
  });
}

function addBuiltInAnimatorAssembly(templateId, position, options = {}) {
  const nextAssembly = createBuiltInAnimatorAssemblyDraft(templateId, position, options);
  appendAnimatorAssemblyDraftState(nextAssembly);
  setAnimatorSelectedAssembly(nextAssembly.id);
  renderAnimatorAssemblyEditor();
  renderAnimatorJsonPreview();
}

function setAnimatorStatus(message) {
  if (!animatorStatus) {
    return;
  }
  animatorStatus.textContent = message;
}

function updateAnimatorMotionSourcePill(documentData = animatorCurrentDocument) {
  if (!animatorMotionSourcePill) {
    return;
  }
  const summary = summarizeAnimatorMotionSources(documentData);
  animatorMotionSourcePill.textContent = summary.label;
  animatorMotionSourcePill.dataset.sourceKind = summary.sourceKind;
  animatorMotionSourcePill.title = summary.detail;
}

function rebuildAnimatorControlPoints() {
  if (!animatorFrameGroup || !animatorPointGeometry) {
    return;
  }
  const selectedAssembly = getAnimatorSelectedAssembly();
  const bareOriginMarker = isAnimatorBareArchitrinoAssembly(selectedAssembly);
  const sourceKind = getAnimatorSelectedPathSourceKind();
  animatorPointMeshes.forEach((mesh) => {
    disposeAnimatorMarkerHandle(mesh);
    animatorFrameGroup.remove(mesh);
  });
  animatorPointMeshes = animatorPathState.points.map((point, index) => {
    const mesh = new THREE.Mesh(animatorPointGeometry, animatorPointMaterial);
    mesh.position.copy(point);
    mesh.renderOrder = 12;
    mesh.userData.pointIndex = index;
    mesh.userData.motionSourceKind = sourceKind;
    if (!(bareOriginMarker && index === 0)) {
      const labelSprite = createAnimatorPointLabelSprite(getAnimatorSelectedAssemblyLetter());
      labelSprite.position.set(0, 0, 0);
      mesh.userData.pointLabelSprite = labelSprite;
      mesh.add(labelSprite);
    }
    const hitProxy = createAnimatorMarkerHitProxy(0.19);
    mesh.userData.hitProxy = hitProxy;
    mesh.add(hitProxy);
    animatorFrameGroup.add(mesh);
    return mesh;
  });
  updateAnimatorPointMaterials();
  applyAnimatorViewportDisplayState();
}

function sampleAnimatorPath(points, interpolate = "spline", closed = false) {
  const source = Array.isArray(points)
    ? points.map((point) =>
        point instanceof THREE.Vector3 ? point.clone() : new THREE.Vector3(point[0], point[1], point[2])
      )
    : [];
  if (!source.length) {
    return [];
  }
  if (interpolate !== "linear" && source.length > 2) {
    const curve = new THREE.CatmullRomCurve3(source, closed, "catmullrom", 0.5);
    return curve.getPoints(160);
  }
  if (closed) {
    return [...source, source[0].clone()];
  }
  return source;
}

function getAnimatorSimulationDatasetTimeWindow(dataset) {
  const explicitStart = Number(dataset?.simulation?.time?.start);
  const explicitEnd = Number(dataset?.simulation?.time?.end);
  if (Number.isFinite(explicitStart) && Number.isFinite(explicitEnd) && explicitEnd > explicitStart) {
    return { start: explicitStart, end: explicitEnd };
  }
  const frameTimes = Array.isArray(dataset?.frames)
    ? dataset.frames
        .map((frame) => Number(frame?.t))
        .filter((time) => Number.isFinite(time))
        .sort((left, right) => left - right)
    : [];
  if (frameTimes.length >= 2) {
    return { start: frameTimes[0], end: frameTimes[frameTimes.length - 1] };
  }
  return { start: 0, end: 1 };
}

function getAnimatorSimulationDatasetProgress(dataset, timeSeconds) {
  const timeWindow = getAnimatorSimulationDatasetTimeWindow(dataset);
  const duration = Math.max(0.000001, timeWindow.end - timeWindow.start);
  return clamp((Number(timeSeconds) - timeWindow.start) / duration, 0, 1);
}

function getAnimatorChargeSignFromText(value) {
  const text = String(value ?? "").trim().toLowerCase();
  if (!text) {
    return 0;
  }
  if (/\belectrino\b|\bnegative\b|^e\d+/.test(text)) {
    return -1;
  }
  if (/\bpositrino\b|\bpositive\b|^p\d+/.test(text)) {
    return 1;
  }
  return 0;
}

function getAnimatorMemberChargeSign(member, index = 0) {
  return (
    getAnimatorChargeSignFromText(getAnimatorMemberState(member)) ||
    getAnimatorChargeSignFromText(getAnimatorMemberId(member, index))
  );
}

function getAnimatorAssemblyChargeSign(assembly) {
  if (!assembly) {
    return 0;
  }
  const explicitSign = Number(
    assembly?.metadata?.chargeSign ??
      assembly?.metadata?.polarity ??
      assembly?.chargeSign ??
      assembly?.polarity
  );
  if (Number.isFinite(explicitSign) && explicitSign !== 0) {
    return Math.sign(explicitSign);
  }
  const idSign =
    getAnimatorChargeSignFromText(assembly?.metadata?.simulationParticleId) ||
    getAnimatorChargeSignFromText(assembly?.id) ||
    getAnimatorChargeSignFromText(assembly?.label) ||
    getAnimatorChargeSignFromText(assembly?.name);
  if (idSign !== 0) {
    return idSign;
  }
  const memberSigns = (Array.isArray(assembly?.members) ? assembly.members : [])
    .map((member, index) => getAnimatorMemberChargeSign(member, index))
    .filter((sign) => sign !== 0);
  if (!memberSigns.length) {
    return 0;
  }
  const signSum = memberSigns.reduce((sum, sign) => sum + sign, 0);
  return signSum === 0 ? memberSigns[0] : Math.sign(signSum);
}

function getAnimatorPathChargeSign(path, documentData = animatorCurrentDocument) {
  const ownerAssembly = getAnimatorDocumentAssemblyById(
    getAnimatorPathOwnerAssemblyId(path),
    documentData
  );
  return (
    getAnimatorAssemblyChargeSign(ownerAssembly) ||
    getAnimatorChargeSignFromText(path?.metadata?.simulationParticleId) ||
    getAnimatorChargeSignFromText(path?.id)
  );
}

function getAnimatorFieldShellEmissionPath(fieldShell, simulationDataset, documentData = animatorCurrentDocument) {
  const paths = Array.isArray(documentData?.paths) ? documentData.paths : [];
  return getAnimatorFieldShellEmitterPath(fieldShell, simulationDataset, paths, {
    isEligiblePath: (path) => getAnimatorDocumentPathSourceKind(path, documentData) === "solver-derived",
    getPathOwnerAssemblyId: getAnimatorPathOwnerAssemblyId,
    getPathParticleId: (path) => path?.metadata?.simulationParticleId ?? "",
    getPathSign: (path) => getAnimatorPathChargeSign(path, documentData),
  });
}

function resolveAnimatorFieldShellBaseCenter(fieldShell, simulationDataset, documentData = animatorCurrentDocument) {
  const emissionPath = getAnimatorFieldShellEmissionPath(fieldShell, simulationDataset, documentData);
  const points = Array.isArray(emissionPath?.payload?.points) ? emissionPath.payload.points : [];
  if (points.length) {
    return sampleAnimatorPointAt(points, getAnimatorSimulationDatasetProgress(simulationDataset, fieldShell?.emissionTime), {
      interpolate: emissionPath?.payload?.interpolate ?? "spline",
      closed: !!emissionPath?.payload?.closed,
    });
  }
  return null;
}

function resolveAnimatorFieldShellEmissionCenter(
  fieldShell,
  shellState,
  simulationDataset,
  documentData = animatorCurrentDocument
) {
  if (fieldShell?.metadata?.fixedEmissionPosition) {
    return vectorFromTriplet(shellState?.center);
  }
  const baseCenter = resolveAnimatorFieldShellBaseCenter(fieldShell, simulationDataset, documentData);
  if (baseCenter) {
    return baseCenter;
  }
  return vectorFromTriplet(shellState?.center);
}

function isAnimatorContinuousFieldShell(fieldShell) {
  const metadata = fieldShell?.metadata && typeof fieldShell.metadata === "object"
    ? fieldShell.metadata
    : {};
  return !!(
    fieldShell?.continuousExpansion ??
    metadata.continuousExpansion ??
    metadata.motionSource === "solver-derived"
  );
}

function getAnimatorFieldShellSurfaceOpacity(fieldShell, shellState) {
  const opacity = Number(shellState?.opacity ?? 0) || 0;
  return isAnimatorContinuousFieldShell(fieldShell) ? opacity * 0.06 : opacity;
}

function getAnimatorFieldShellWireOpacity(fieldShell, shellState) {
  const opacity = Number(shellState?.opacity ?? 0) || 0;
  if (!isAnimatorContinuousFieldShell(fieldShell)) {
    return Math.min(0.42, opacity * 2.8);
  }
  return Math.min(0.85, opacity * 7.5);
}

function getAnimatorFieldShellSpeed(simulationDataset = {}) {
  const speed = Number(
    simulationDataset?.simulation?.fieldSpeed ??
      simulationDataset?.simulation?.cf ??
      simulationDataset?.simulation?.solver?.cf
  );
  return Number.isFinite(speed) && speed > 0 ? speed : 1;
}

function getAnimatorMotionSamplingState(documentData = animatorCurrentDocument, playbackTime = 0) {
  const motionTime = getAnimatorIntegratedMotionTime(documentData, playbackTime);
  const totalMotionDuration = getAnimatorTotalMotionDuration(documentData);
  return {
    motionTime,
    normalizedSceneT: totalMotionDuration > 0 ? clamp(motionTime / totalMotionDuration, 0, 1) : 0,
  };
}

function getAnimatorArchitrinoPathHistoryStreamId(simulationDataset = {}) {
  return (
    String(simulationDataset?.simulation?.solver?.pathHistoryStreamId ?? "").trim() ||
    `${String(simulationDataset?.id ?? "animator").trim() || "animator"}:architrino-path-history`
  );
}

function getAnimatorArchitrinoFieldShellEventStreamId(simulationDataset = {}) {
  const datasetId = String(simulationDataset?.id ?? "animator").trim() || "animator";
  return `${datasetId}:architrino-field-shell-events`;
}

function resolveAnimatorAssemblyCenterAtMotionTime(
  assembly,
  index,
  context,
  stack = new Set()
) {
  if (!assembly?.id) {
    return new THREE.Vector3();
  }
  if (context.centers.has(assembly.id)) {
    return context.centers.get(assembly.id).clone();
  }
  if (stack.has(assembly.id)) {
    return computeAnimatorAssemblyBasePosition(
      assembly,
      index,
      context.assemblies.length,
      context.pathById
    );
  }
  stack.add(assembly.id);
  const motions = Array.isArray(assembly.motion)
    ? assembly.motion
    : assembly.motion
      ? [assembly.motion]
      : [];
  const simulationFrameMotion = getAnimatorSimulationFrameMotion(assembly);
  const transportMotion = motions.find((motion) => motion?.type === "path.transport");
  let center = computeAnimatorAssemblyBasePosition(
    assembly,
    index,
    context.assemblies.length,
    context.pathById
  );
  const simulationParticleId = getAnimatorSimulationParticleId(simulationFrameMotion, assembly);
  if (context.simulationDataset && simulationFrameMotion && simulationParticleId) {
    const simulationTime = getAnimatorSimulationTimeForMotion(
      context.motionTime,
      simulationFrameMotion
    );
    const solverPath = getAnimatorSolverPathForAssembly(
      context.paths,
      assembly.id,
      simulationParticleId
    );
    const solverPathPoints = Array.isArray(solverPath?.payload?.points)
      ? solverPath.payload.points
      : [];
    if (solverPathPoints.length) {
      center = sampleAnimatorPointAt(
        solverPathPoints,
        getAnimatorSimulationDatasetProgress(context.simulationDataset, simulationTime),
        {
          interpolate: solverPath?.payload?.interpolate ?? "spline",
          closed: !!solverPath?.payload?.closed,
        }
      );
    } else {
      const simulationSample = sampleAnimatorSimulationParticleAtTime(
        context.simulationDataset,
        simulationParticleId,
        simulationTime
      );
      if (simulationSample?.position) {
        center = vectorFromTriplet(simulationSample.position);
      }
    }
  } else if (transportMotion?.pathId && context.pathById.has(transportMotion.pathId)) {
    const path = context.pathById.get(transportMotion.pathId);
    const points = Array.isArray(path?.payload?.points) ? path.payload.points : [];
    if (points.length) {
      const motionT = clamp(
        context.normalizedSceneT * (Number(transportMotion.speed ?? 1) || 1) +
          Number(transportMotion.phase ?? 0),
        0,
        1
      );
      center = sampleAnimatorPointAt(points, motionT, {
        interpolate: path?.payload?.interpolate ?? "spline",
        closed: !!path?.payload?.closed,
      });
    }
  }
  const parentId = assembly?.parentId;
  if (parentId && context.assemblyById.has(parentId)) {
    const parentAssembly = context.assemblyById.get(parentId);
    const parentIndex = context.assemblies.findIndex((candidate) => candidate?.id === parentId);
    if (parentAssembly && parentIndex !== -1) {
      center.add(resolveAnimatorAssemblyCenterAtMotionTime(parentAssembly, parentIndex, context, stack));
    }
  }
  context.centers.set(assembly.id, center.clone());
  stack.delete(assembly.id);
  return center;
}

function createAnimatorArchitrinoFieldShellEventPackage(
  documentData = animatorCurrentDocument,
  simulationDataset = null
) {
  if (!simulationDataset) {
    return null;
  }
  const timeWindow = getAnimatorSceneTimeWindow(documentData);
  const cadenceTimes = createAnimatorFieldShellCadenceTimes({
    timeWindow,
    intervalSeconds: animatorArchitrinoFieldShellEmissionIntervalSeconds,
  });
  const fieldSpeed = getAnimatorFieldShellSpeed(simulationDataset);

  return createAnimatorFieldShellEventStreamPackage({
    streamId: getAnimatorArchitrinoFieldShellEventStreamId(simulationDataset),
    datasetId: String(simulationDataset?.id ?? "animator").trim() || "animator",
    timeWindow,
    cadence: {
      intervalSeconds: animatorArchitrinoFieldShellEmissionIntervalSeconds,
    },
    fieldSpeed,
    lifetimeSeconds: 1.6,
    emitterSourceHistory: {
      documentData,
      simulationDataset,
      sampleTimes: cadenceTimes,
      fieldSpeed,
      sampleIntervalSeconds: animatorArchitrinoFieldShellEmissionIntervalSeconds,
    },
    metadata: {
      precisionPath: simulationDataset?.simulation?.solver?.acceptedPrecisionPath ??
        simulationDataset?.simulation?.solver?.precisionPath ??
        "event_root_focused",
      claimLevel: simulationDataset?.claimLevel ?? "interactive-preview",
      provenance: {
        source: "animator-architrino-field-shell-event-package",
        datasetId: String(simulationDataset?.id ?? "animator").trim() || "animator",
        pathHistoryStreamId: getAnimatorArchitrinoPathHistoryStreamId(simulationDataset),
      },
    },
  });
}

function createAnimatorArchitrinoPathHistoryDelayedHits(
  documentData = animatorCurrentDocument,
  simulationDataset = null,
  fieldShellEventPackage = null
) {
  const fieldShells = Array.isArray(fieldShellEventPackage?.fieldShells)
    ? fieldShellEventPackage.fieldShells
    : [];
  if (!simulationDataset || !fieldShells.length) {
    return [];
  }
  const sampleTimes = Array.isArray(fieldShellEventPackage?.cadence?.times)
    ? fieldShellEventPackage.cadence.times
    : createAnimatorFieldShellCadenceTimes({
        timeWindow: getAnimatorSceneTimeWindow(documentData),
        intervalSeconds: animatorArchitrinoFieldShellEmissionIntervalSeconds,
      });
  const receiverPathDescriptorPackage = createAnimatorReceiverPathDescriptorPackage({
    streamId: getAnimatorArchitrinoPathHistoryStreamId(simulationDataset),
    datasetId: String(simulationDataset?.id ?? "animator").trim() || "animator",
    documentData,
    simulationDataset,
    sampleTimes,
    fieldSpeed: getAnimatorFieldShellSpeed(simulationDataset),
    sampleIntervalSeconds: animatorArchitrinoFieldShellEmissionIntervalSeconds,
  });
  const rowResponse = createAnimatorDelayedHitRowsFromStreamDescriptors(
    {
      schema: "animator-delayed-hit-stream-descriptors.v1",
      streamId: getAnimatorArchitrinoPathHistoryStreamId(simulationDataset),
      fieldSpeed: getAnimatorFieldShellSpeed(simulationDataset),
      emissionEvents: Array.isArray(fieldShellEventPackage?.emissionEvents)
        ? fieldShellEventPackage.emissionEvents
        : fieldShells.map((shell) => ({
            emitterId: shell.emitterId,
            emissionTime: shell.emissionTime,
            emissionPoint: shell.emissionPosition,
            fieldSpeed: shell.fieldSpeed,
            metadata: shell.metadata ?? {},
          })),
      receiverPathDescriptors: receiverPathDescriptorPackage.receiverPathDescriptors,
    },
    {
      allowSelfHits: false,
      fieldSpeed: getAnimatorFieldShellSpeed(simulationDataset),
      tolerance: 0.006,
      metadata: {
        status: "path-history",
        fieldShellEventStreamId: fieldShellEventPackage?.streamId ?? "",
        fieldShellEventRowLayout: fieldShellEventPackage?.rowLayout ?? "",
        receiverPathDescriptorPackageSchema: receiverPathDescriptorPackage.schema,
        receiverPathDescriptorCount: receiverPathDescriptorPackage.descriptorCount,
        receiverSegmentCount: receiverPathDescriptorPackage.segmentCount,
      },
    }
  );
  return createAnimatorDelayedHitsFromSolverRows(rowResponse, {
    status: "path-history",
  });
}

function createAnimatorArchitrinoFieldShellInstances(
  fieldShell,
  simulationDataset,
  documentData = animatorCurrentDocument
) {
  const emissionPath = getAnimatorFieldShellEmissionPath(fieldShell, simulationDataset, documentData);
  const ownerAssemblyId = getAnimatorPathOwnerAssemblyId(emissionPath);
  const ownerAssembly = getAnimatorDocumentAssemblyById(ownerAssemblyId, documentData);
  const baseCenter = resolveAnimatorFieldShellBaseCenter(fieldShell, simulationDataset, documentData);
  const binaries = Array.isArray(ownerAssembly?.core?.binaries) ? ownerAssembly.core.binaries : [];
  if (!ownerAssembly || !baseCenter || !binaries.length) {
    return [fieldShell];
  }
  const emissionTime = Number(fieldShell?.emissionTime ?? 0) || 0;
  const instances = [];
  binaries.forEach((binary, binaryIndex) => {
    if (binary?.motion?.type !== "orbit.circular") {
      return;
    }
    [
      { chargeType: "positrino", sign: 1 },
      { chargeType: "electrino", sign: -1 },
    ].forEach(({ chargeType, sign }) => {
      const memberId = findAnimatorCoreMemberId(ownerAssembly.members, chargeType, binaryIndex);
      if (!memberId) {
        return;
      }
      const emissionCenter = baseCenter
        .clone()
        .add(getAnimatorOrbitOffsetAtTime(binary.motion, chargeType, emissionTime));
      instances.push(
        createAnimatorFieldShellInstance(fieldShell, {
          id: `${ownerAssembly.id}_${memberId}`,
          emitterId: memberId,
          sign,
          emissionPosition: [emissionCenter.x, emissionCenter.y, emissionCenter.z],
          metadata: {
            ownerAssemblyId: ownerAssembly.id,
            memberId,
            chargeType,
            binaryId: binary?.id ?? "",
            emitterScope: "core-architrino",
          },
        })
      );
    });
  });
  return instances.length ? instances : [fieldShell];
}

function getAnimatorSolverPathForAssembly(paths = [], assemblyId = null, particleId = "") {
  const normalizedParticleId = String(particleId ?? "").trim();
  return (
    paths.find((path) => {
      if (getAnimatorDocumentPathSourceKind(path) !== "solver-derived") {
        return false;
      }
      if (assemblyId && getAnimatorPathOwnerAssemblyId(path) === assemblyId) {
        return true;
      }
      return (
        normalizedParticleId &&
        String(path?.metadata?.simulationParticleId ?? "").trim() === normalizedParticleId
      );
    }) ?? null
  );
}

function getAnimatorVisiblePathSamples(path, normalizedT) {
  const points = Array.isArray(path?.payload?.points) ? path.payload.points : [];
  if (!points.length) {
    return [];
  }
  const sampledPoints = sampleAnimatorPath(
    points,
    path?.payload?.interpolate ?? "spline",
    !!path?.payload?.closed
  );
  if (sampledPoints.length < 2) {
    return sampledPoints;
  }
  const maxIndex = clamp(
    Math.round(clamp(normalizedT, 0, 1) * (sampledPoints.length - 1)),
    1,
    sampledPoints.length - 1
  );
  return sampledPoints.slice(0, maxIndex + 1);
}

function getAnimatorTrailControlState() {
  return normalizeAnimatorTrailControls({
    opacityScale: animatorTrailOpacityScale,
    lifetimeSeconds: animatorTrailLifetimeSeconds,
    diagnosticEmphasis: isAnimatorViewportDisplayFlagEnabled("showTrailDiagnostics"),
  });
}

function getAnimatorTimedPathTrailSamples(path, simulationDataset) {
  const points = Array.isArray(path?.payload?.points) ? path.payload.points : [];
  if (!points.length) {
    return [];
  }
  const sampledPoints = sampleAnimatorPath(
    points,
    path?.payload?.interpolate ?? "spline",
    !!path?.payload?.closed
  );
  return createAnimatorTimedTrailSamples(
    sampledPoints,
    getAnimatorSimulationDatasetTimeWindow(simulationDataset)
  );
}

function refreshAnimatorHistoryTraceMaterial(line, historyTrace = line?.userData?.historyTrace) {
  if (!line?.material) {
    return;
  }
  const style = historyTrace?.style && typeof historyTrace.style === "object" ? historyTrace.style : {};
  const controls = getAnimatorTrailControlState();
  line.material.opacity = getAnimatorTrailMaterialOpacity(historyTrace, controls);
  line.material.linewidth =
    normalizePositiveNumber(style.lineWidth ?? style.width, 1) *
    (controls.diagnosticEmphasis && historyTrace?.kind === "solver-derived" ? 1.35 : 1);
  line.material.needsUpdate = true;
}

function setAnimatorHistoryTraceLineSamples(line, trailSamples = []) {
  if (!line || !Array.isArray(trailSamples) || trailSamples.length < 2) {
    return false;
  }
  const historyTrace = line.userData?.historyTrace ?? {};
  const style = historyTrace?.style && typeof historyTrace.style === "object" ? historyTrace.style : {};
  const baseColor = new THREE.Color(style.color ?? 0x8bdcff);
  const positions = new Float32Array(trailSamples.length * 3);
  const colors = new Float32Array(trailSamples.length * 3);
  trailSamples.forEach((sample, index) => {
    const point = vectorFromTriplet(sample.position);
    const offset = index * 3;
    const fade = clamp(Number(sample.fade ?? 1) || 0, 0, 1);
    positions[offset] = point.x;
    positions[offset + 1] = point.y;
    positions[offset + 2] = point.z;
    colors[offset] = baseColor.r * fade;
    colors[offset + 1] = baseColor.g * fade;
    colors[offset + 2] = baseColor.b * fade;
  });
  line.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  line.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  line.geometry.setDrawRange(0, trailSamples.length);
  line.geometry.computeBoundingSphere();
  if (line.material) {
    line.material.vertexColors = true;
  }
  refreshAnimatorHistoryTraceMaterial(line, historyTrace);
  if (line.userData.usesLineDistances) {
    line.computeLineDistances();
  }
  return true;
}

function updateAnimatorPathGeometry(points = animatorPathState.points) {
  if (!animatorPathGeometry) {
    return [];
  }
  const samples = sampleAnimatorPath(
    points,
    animatorPathState.interpolate,
    animatorPathState.closed
  );
  animatorPathGeometry.setFromPoints(samples);
  if (samples.length) {
    animatorPathGeometry.computeBoundingSphere();
  }
  return samples;
}

function clearAnimatorViewportVisuals() {
  animatorAssemblyMeshes.forEach((mesh) => {
    animatorViewportGroup?.remove(mesh);
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
  animatorAssemblyMeshes = [];
  animatorMemberHandleMeshes = [];
  animatorSubassemblyHandleMeshes = [];
  animatorShellMeshes.forEach((mesh) => {
    animatorViewportGroup?.remove(mesh);
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
  animatorShellMeshes = [];
  animatorEnvelopeMeshes.forEach((mesh) => {
    animatorViewportGroup?.remove(mesh);
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
  animatorEnvelopeMeshes = [];
  animatorFieldShellMeshes.forEach((group) => {
    animatorViewportGroup?.remove(group);
    group.traverse?.((child) => {
      if (child === group) {
        return;
      }
      child.geometry?.dispose?.();
      child.material?.dispose?.();
    });
  });
  animatorFieldShellMeshes = [];
  animatorOrbitTraceLines.forEach((line) => {
    animatorViewportGroup?.remove(line);
    line.geometry?.dispose?.();
    line.material?.dispose?.();
  });
  animatorOrbitTraceLines = [];
  animatorHistoryTraceLines.forEach((line) => {
    animatorViewportGroup?.remove(line);
    line.geometry?.dispose?.();
    line.material?.dispose?.();
  });
  animatorHistoryTraceLines = [];
  if (animatorPathHistoryLineSegments) {
    animatorViewportGroup?.remove(animatorPathHistoryLineSegments);
    animatorPathHistoryLineSegments.geometry?.dispose?.();
    animatorPathHistoryLineSegments.material?.dispose?.();
    animatorPathHistoryLineSegments = null;
  }
  animatorPathHistoryDelayedHits = [];
  animatorDelayedHitGroups.forEach((group) => {
    animatorViewportGroup?.remove(group);
    group.traverse?.((child) => {
      if (child === group) {
        return;
      }
      child.geometry?.dispose?.();
      child.material?.map?.dispose?.();
      child.material?.dispose?.();
    });
  });
  animatorDelayedHitGroups = [];
  animatorTransferLines.forEach((line) => {
    animatorViewportGroup?.remove(line);
    line.geometry?.dispose?.();
    line.material?.dispose?.();
  });
  animatorTransferLines = [];
  animatorAxisGuideLines.forEach((line) => {
    animatorViewportGroup?.remove(line);
    line.geometry?.dispose?.();
    line.material?.dispose?.();
  });
  animatorAxisGuideLines = [];
  animatorOrbitParticleMeshes.forEach((mesh) => {
    animatorViewportGroup?.remove(mesh);
    mesh.geometry?.dispose?.();
    mesh.material?.dispose?.();
  });
  animatorOrbitParticleMeshes = [];
  animatorMemberLabelSprites.forEach((sprite) => {
    animatorViewportGroup?.remove(sprite);
    sprite.material?.map?.dispose?.();
    sprite.material?.dispose?.();
  });
  animatorMemberLabelSprites = [];
  animatorGraphicOverlayGroups.forEach((group) => {
    animatorViewportGroup?.remove(group);
    group.traverse?.((child) => {
      if (child === group) {
        return;
      }
      child.geometry?.dispose?.();
      child.material?.map?.dispose?.();
      child.material?.dispose?.();
    });
  });
  animatorGraphicOverlayGroups = [];
  animatorGraphicOverlayHandleMeshes = [];
  animatorPersonalityHandleMeshes = [];
  clearAnimatorViewportMediaOverlays();
  clearAnimatorMemberAnchors();
  if (animatorDocumentCameraPathLine) {
    animatorViewportGroup?.remove(animatorDocumentCameraPathLine);
    animatorDocumentCameraPathLine.geometry?.dispose?.();
    animatorDocumentCameraPathLine.material?.dispose?.();
    animatorDocumentCameraPathLine = null;
  }
  animatorDocumentCameraWaypointMeshes.forEach((mesh) => {
    animatorViewportGroup?.remove(mesh);
    mesh.geometry?.dispose?.();
    mesh.material?.dispose?.();
  });
  animatorDocumentCameraWaypointMeshes = [];
  if (animatorDocumentCameraShotMesh) {
    animatorViewportGroup?.remove(animatorDocumentCameraShotMesh);
    animatorDocumentCameraShotMesh.geometry?.dispose?.();
    animatorDocumentCameraShotMesh.material?.dispose?.();
    animatorDocumentCameraShotMesh = null;
  }
  if (animatorDocumentCameraTargetMesh) {
    animatorViewportGroup?.remove(animatorDocumentCameraTargetMesh);
    animatorDocumentCameraTargetMesh.geometry?.dispose?.();
    animatorDocumentCameraTargetMesh.material?.dispose?.();
    animatorDocumentCameraTargetMesh = null;
  }
  if (animatorDocumentCameraLookLine) {
    animatorViewportGroup?.remove(animatorDocumentCameraLookLine);
    animatorDocumentCameraLookLine.geometry?.dispose?.();
    animatorDocumentCameraLookLine.material?.dispose?.();
    animatorDocumentCameraLookLine = null;
  }
}

function getAnimatorDocumentCameraStateAtTime(documentData, timeSeconds) {
  if (!documentData || !animatorFrameGroup) {
    return null;
  }
  const timeWindow = getAnimatorSceneTimeWindow(documentData);
  const activeShot = getAnimatorActiveCameraShot(documentData, timeSeconds, timeWindow);
  const activeCameraPathId = getAnimatorActiveCameraPathId(documentData, timeSeconds, timeWindow);
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
    const interval = resolveAnimatorShotInterval(activeShot, timeWindow);
    const duration = Math.max(0.000001, interval.end - interval.start);
    normalizedT = clamp((timeSeconds - interval.start) / duration, 0, 1);
  } else if (timeWindow.end > timeWindow.start) {
    normalizedT = clamp((timeSeconds - timeWindow.start) / (timeWindow.end - timeWindow.start), 0, 1);
  }
  const localState = sampleAnimatorCameraWaypointState(waypoints, normalizedT);
  return {
    position: animatorFrameGroup.localToWorld(localState.position.clone()),
    lookAt: animatorFrameGroup.localToWorld(localState.lookAt.clone()),
    cameraPathId: activeCameraPathId,
    shotId: activeShot?.id ?? null,
    normalizedT,
  };
}

function getAnimatorPreviewCameraStateAtTime(timeSeconds) {
  if (!animatorFrameGroup) {
    return null;
  }
  const waypoints = animatorCameraFlightState.waypoints;
  if (!Array.isArray(waypoints) || waypoints.length < 2) {
    return null;
  }
  const timeWindow = animatorCurrentDocument
    ? getAnimatorSceneTimeWindow(animatorCurrentDocument)
    : { start: 0, end: 24 };
  const duration = Math.max(0.000001, timeWindow.end - timeWindow.start);
  const normalizedT = clamp((timeSeconds - timeWindow.start) / duration, 0, 1);
  const localState = sampleAnimatorCameraWaypointState(waypoints, normalizedT);
  return {
    position: animatorFrameGroup.localToWorld(localState.position.clone()),
    lookAt: animatorFrameGroup.localToWorld(localState.lookAt.clone()),
    normalizedT,
  };
}

function getAnimatorPlaybackRateAtTime(documentData, timeSeconds) {
  const timeWarps = Array.isArray(documentData?.scene?.timeWarps) ? documentData.scene.timeWarps : [];
  const activeWarp = timeWarps.find((warp) => timeSeconds >= warp.start && timeSeconds < warp.end);
  return Number(activeWarp?.rate ?? 1) || 1;
}

function getAnimatorMotionRateAtTime(documentData, timeSeconds) {
  const pauses = Array.isArray(documentData?.scene?.pauses) ? documentData.scene.pauses : [];
  const activePause = pauses.find((pause) => {
    const start = Number(pause?.start ?? 0);
    const duration = Math.max(0, Number(pause?.duration ?? 0) || 0);
    return timeSeconds >= start && timeSeconds < start + duration;
  });
  if (activePause) {
    return 0;
  }
  return getAnimatorPlaybackRateAtTime(documentData, timeSeconds);
}

function getAnimatorIntegratedMotionTime(documentData, timeSeconds) {
  const timeWindow = getAnimatorSceneTimeWindow(documentData);
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
    total += (end - start) * getAnimatorMotionRateAtTime(documentData, sampleTime);
  }
  return total;
}

function getAnimatorTotalMotionDuration(documentData) {
  const timeWindow = getAnimatorSceneTimeWindow(documentData);
  return Math.max(0.0001, getAnimatorIntegratedMotionTime(documentData, timeWindow.end));
}

function getAnimatorMotionProgress(documentData, timeSeconds) {
  const totalMotionDuration = getAnimatorTotalMotionDuration(documentData);
  if (!(totalMotionDuration > 0)) {
    return 0;
  }
  return clamp(getAnimatorIntegratedMotionTime(documentData, timeSeconds) / totalMotionDuration, 0, 1);
}

function getAnimatorPlaybackTimeForMotionTime(documentData, targetMotionTime) {
  const timeWindow = getAnimatorSceneTimeWindow(documentData);
  const totalMotionDuration = getAnimatorTotalMotionDuration(documentData);
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
    const motionTime = getAnimatorIntegratedMotionTime(documentData, mid);
    if (motionTime < normalizedTarget) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return Number(high.toFixed(3));
}

function getAnimatorPlaybackTimeForMotionProgress(documentData, targetProgress) {
  const timeWindow = getAnimatorSceneTimeWindow(documentData);
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
    const progress = getAnimatorMotionProgress(documentData, mid);
    if (progress < normalizedTarget) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return Number(high.toFixed(3));
}

function clearAnimatorTimelineLayer(layer) {
  if (!layer) {
    return;
  }
  while (layer.firstChild) {
    layer.removeChild(layer.firstChild);
  }
}

function createAnimatorTimelineBand(fractionStart, fractionEnd, className, title, label = "") {
  const band = document.createElement("div");
  band.className = `animator-timeline-band ${className}`;
  const widthFraction = Math.max(0.002, fractionEnd - fractionStart);
  band.style.left = `${fractionStart * 100}%`;
  band.style.width = `${widthFraction * 100}%`;
  if (title) {
    band.title = title;
  }
  if (label) {
    const bandLabel = document.createElement("span");
    bandLabel.className = "animator-timeline-band-label";
    bandLabel.textContent = label;
    band.appendChild(bandLabel);
  }
  return band;
}

function createAnimatorTimelineMarker(fraction, label, title) {
  const marker = document.createElement("div");
  marker.className = "animator-timeline-marker";
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
    markerLabel.className = "animator-timeline-marker-label";
    markerLabel.textContent = label;
    marker.appendChild(markerLabel);
  }
  return marker;
}

function openAnimatorTimelineSummaryMenuAt(clientX, clientY) {
  if (!animatorAssemblyMenu) {
    return;
  }
  buildAnimatorTimelineSummaryMenu({
    menu: animatorAssemblyMenu,
    clientX,
    clientY,
    currentDuration: Math.max(1, readNumberInput(animatorSceneDurationInput, 24)),
    isLooping: !!animatorSceneLoopInput?.checked,
    resetAnimatorAssemblyMenu,
    appendAnimatorMenuBlock,
    appendAnimatorMenuField,
    formatAnimatorTimeInputValue,
    setAnimatorSceneDurationValue,
    setAnimatorSceneLoopValue,
    renderAnimatorJsonPreview,
    positionAnimatorAssemblyMenu,
  });
}

function applyAnimatorSceneIdentityDraft(sceneIdValue, sceneNameValue, options = {}) {
  const nextId = sanitizeAnimatorId(sceneIdValue ?? animatorSceneIdInput?.value ?? "animator_scene")
    || "animator_scene";
  const nextName = String(sceneNameValue ?? animatorSceneNameInput?.value ?? "").trim()
    || "animator scene";
  if (animatorSceneIdInput) {
    animatorSceneIdInput.value = nextId;
  }
  if (animatorSceneNameInput) {
    animatorSceneNameInput.value = nextName;
  }
  if (options.renderPreview !== false) {
    renderAnimatorJsonPreview();
  }
  return {
    id: nextId,
    name: nextName,
  };
}

function openAnimatorSceneMenuAt(clientX, clientY) {
  if (!animatorAssemblyMenu) {
    return;
  }
  buildAnimatorSceneMenu({
    menu: animatorAssemblyMenu,
    clientX,
    clientY,
    currentId: sanitizeAnimatorId(animatorSceneIdInput?.value ?? "animator_scene"),
    currentName: String(animatorSceneNameInput?.value ?? "").trim() || "animator scene",
    resetAnimatorAssemblyMenu,
    appendAnimatorMenuBlock,
    appendAnimatorMenuButtonRow,
    appendAnimatorMenuField,
    appendAnimatorMenuNote,
    applyAnimatorSceneIdentityDraft,
    closeAnimatorAssemblyMenu,
    openAnimatorLibraryMenuAt,
    animatorDocsButton,
    positionAnimatorAssemblyMenu,
  });
}

function openAnimatorJsonPreviewMenuAt(clientX, clientY) {
  if (!animatorAssemblyMenu) {
    return;
  }
  persistAnimatorPathStateToSelectedAssembly();
  const draftState = readAnimatorDraftState();
  const sceneDocument = buildAnimatorDocumentData(draftState);
  const json = JSON.stringify(sceneDocument, null, 2);
  buildAnimatorJsonPreviewMenu({
    menu: animatorAssemblyMenu,
    clientX,
    clientY,
    draftState,
    json,
    animatorJsonPreview,
    resetAnimatorAssemblyMenu,
    appendAnimatorMenuButtonRow,
    openAnimatorLibraryMenuAt,
    closeAnimatorAssemblyMenu,
    animatorExportButton,
    positionAnimatorAssemblyMenu,
  });
}

function openAnimatorLibraryMenuAt(clientX, clientY) {
  if (!animatorAssemblyMenu) {
    return;
  }
  const entries = getAnimatorSortedLibraryEntries();
  buildAnimatorLibraryMenu({
    menu: animatorAssemblyMenu,
    clientX,
    clientY,
    entries,
    animatorLibrarySelect,
    animatorLibraryLoadButton,
    animatorLibraryDeleteButton,
    animatorLibraryStatus,
    animatorRepoSaveButton,
    animatorLibrarySaveButton,
    animatorExportButton,
    resetAnimatorAssemblyMenu,
    refreshAnimatorLibraryUi,
    appendAnimatorMenuBlock,
    appendAnimatorMenuButtonRow,
    appendAnimatorMenuNote,
    appendAnimatorMenuSelectField,
    closeAnimatorAssemblyMenu,
    openAnimatorJsonPreviewMenuAt,
    positionAnimatorAssemblyMenu,
  });
}

function getAnimatorTimelineTimeAtClientX(clientX, documentData = animatorCurrentDocument) {
  if (!animatorTimelineTrack || !documentData) {
    return 0;
  }
  return getAnimatorTimelineTimeAtClientXRuntime(clientX, documentData, {
    trackRect: animatorTimelineTrack.getBoundingClientRect(),
    clampFn: clamp,
    getTimeWindow: getAnimatorSceneTimeWindow,
  });
}

function openAnimatorTimelineMenuAt(clientX, clientY, options = {}) {
  if (!animatorAssemblyMenu) {
    return;
  }
  const documentData = animatorCurrentDocument;
  const overlays = Array.isArray(documentData?.overlays) ? documentData.overlays : [];
  const graphics = getAnimatorGraphicTimelineOverlays(documentData);
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
    getAnimatorTimelineTimeAtClientX(clientX, documentData);
  const duration = Math.max(1, readNumberInput(animatorSceneDurationInput, 24));
  const editKind = warp ? "warp" : pause ? "pause" : overlay ? overlay.kind : "add";
  const addType = normalizeAnimatorTimelineAddType(options.addType);
  buildAnimatorTimelineMenu({
    menu: animatorAssemblyMenu,
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
    animatorTimelineAddTypeEntries,
    animatorTimelineMinDurationSeconds,
    animatorPauseListInput,
    animatorWarpListInput,
    resetAnimatorAssemblyMenu,
    positionAnimatorAssemblyMenu,
    appendAnimatorMenuBlock,
    appendAnimatorMenuButtonRow,
    appendAnimatorMenuField,
    appendAnimatorMenuNote,
    appendAnimatorMenuSelectField,
    appendAnimatorAuthoringLine,
    replaceAnimatorAuthoringLineById,
    normalizeAnimatorTimelineAddType,
    getAnimatorTimelineEditKindTitle,
    formatAnimatorTimeLabel,
    formatAnimatorTimeInputValue,
    clampAnimatorTimelineSpan,
    getAnimatorGraphicOverlayLabel,
    getAnimatorMediaOverlayLabel,
    normalizeAnimatorGraphicOverlayDraft,
    getNextAnimatorGraphicOverlayId,
    getAnimatorGraphicDefaultTarget,
    getAnimatorGraphicOverlayDraftIndexById,
    findAnimatorTimelineOverlap,
    showAnimatorStatus: setAnimatorStatus,
    upsertAnimatorGraphicOverlayDraft: upsertAnimatorGraphicOverlayDraftState,
    removeAnimatorGraphicOverlayDraftById: removeAnimatorGraphicOverlayDraftByIdState,
    closeAnimatorAssemblyMenu,
    renderAnimatorJsonPreview,
    encodeAnimatorGraphicTargetValue,
    getAnimatorGraphicTargetEntries,
    decodeAnimatorGraphicTargetValue,
    animatorMediaAssetDirectories,
    sanitizeAnimatorMediaSource,
    getAnimatorMediaDefaultRect,
  });
}

function removeAnimatorPathPoint(pointIndex) {
  if (!Number.isInteger(pointIndex) || pointIndex < 0 || pointIndex >= animatorPathState.points.length) {
    return;
  }
  mutateAnimatorPathStateState((pathState) => {
    pathState.points.splice(pointIndex, 1);
  });
  setAnimatorSelectedPointIndexState(
    animatorPathState.points.length > 0
      ? Math.min(pointIndex, animatorPathState.points.length - 1)
      : null
  );
  persistAnimatorPathStateToSelectedAssembly();
  rebuildAnimatorControlPoints();
  updateAnimatorPathGeometry();
}

function openAnimatorPathPointMenuAt(clientX, clientY, pointIndex) {
  openAnimatorPathPointMenu({
    menu: animatorAssemblyMenu,
    clientX,
    clientY,
    pointIndex,
    getSelectedAssemblyLetter: getAnimatorSelectedAssemblyLetter,
    setSelectedPointIndex: (value) => {
      setAnimatorSelectedPointIndexState(value);
    },
    resetMenu: resetAnimatorAssemblyMenu,
    cameraFlightState: animatorCameraFlightState,
    updatePointMaterials: updateAnimatorPointMaterials,
    updateCameraPoiStatus: updateAnimatorCameraPoiStatus,
    closeMenu: closeAnimatorAssemblyMenu,
    THREE,
    pathState: animatorPathState,
    vectorFromTriplet,
    addPathPoint: addAnimatorPathPoint,
    renderJsonPreview: renderAnimatorJsonPreview,
    resetPathPoints: resetAnimatorPathPoints,
    removePathPoint: removeAnimatorPathPoint,
    positionMenu: positionAnimatorAssemblyMenu,
  });
}

function describeAnimatorTimelineState(timeSeconds, documentData) {
  const graphics = getAnimatorGraphicTimelineOverlays(documentData);
  const pauses = Array.isArray(documentData?.scene?.pauses) ? documentData.scene.pauses : [];
  const timeWarps = Array.isArray(documentData?.scene?.timeWarps) ? documentData.scene.timeWarps : [];
  const activeReactionStage = getAnimatorActiveReactionStage(documentData, timeSeconds);
  const activeWarp = timeWarps.find((warp) => timeSeconds >= warp.start && timeSeconds < warp.end);
  const activeGraphic = [...graphics]
    .sort((left, right) => left.start - right.start)
    .filter((graphic) => isAnimatorTimeWithinSpan(timeSeconds, graphic.start, graphic.end))
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
    parts.push(`Pause ${formatAnimatorTimeLabel(activePause.duration)}`);
  }
  if (activeWarp) {
    parts.push(`Warp ${Number(activeWarp.rate ?? 1).toFixed(2)}x`);
  }
  if (activeReactionStage?.label) {
    parts.push(activeReactionStage.label);
  }
  return parts.join(" | ") || "Steady";
}

function getAnimatorActiveReaction(documentData, timeSeconds) {
  const reactions = Array.isArray(documentData?.reactions) ? documentData.reactions : [];
  return (
    reactions.find((reaction) => {
      const start = Number(reaction?.start ?? documentData?.scene?.time?.start ?? 0);
      const end = Number(reaction?.end ?? documentData?.scene?.time?.end ?? start);
      return timeSeconds >= start - 0.001 && timeSeconds <= end + 0.001;
    }) ?? reactions[0] ?? null
  );
}

function getAnimatorActiveReactionStage(documentData, timeSeconds) {
  const activeReaction = getAnimatorActiveReaction(documentData, timeSeconds);
  const stages = Array.isArray(activeReaction?.stages) ? activeReaction.stages : [];
  return (
    stages.find((stage) => {
      const start = Number(stage?.start ?? activeReaction?.start ?? 0);
      const end = Number(stage?.end ?? activeReaction?.end ?? start);
      return timeSeconds >= start - 0.001 && timeSeconds <= end + 0.001;
    }) ?? stages[0] ?? null
  );
}

function getAnimatorReactionParticipantRoleMap(documentData, timeSeconds) {
  const activeReaction = getAnimatorActiveReaction(documentData, timeSeconds);
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

function getAnimatorAssemblyStageEmphasis(assemblyId, documentData, timeSeconds, participantRoleMap = null) {
  const activeStage = getAnimatorActiveReactionStage(documentData, timeSeconds);
  const roleMap = participantRoleMap instanceof Map
    ? participantRoleMap
    : getAnimatorReactionParticipantRoleMap(documentData, timeSeconds);
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

function setAnimatorObjectOpacity(object3d, opacityFactor = 1) {
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
        Number.isFinite(Number(material.userData?.animatorBaseOpacity))
          ? Number(material.userData.animatorBaseOpacity)
          : material.opacity;
      if (!material.userData) {
        material.userData = {};
      }
      material.userData.animatorBaseOpacity = baseOpacity;
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

function applyAnimatorStageVisualState(documentData, timeSeconds) {
  const participantRoleMap = getAnimatorReactionParticipantRoleMap(documentData, timeSeconds);
  const stage = getAnimatorActiveReactionStage(documentData, timeSeconds);
  const stageTransferIds = new Set(
    Array.isArray(stage?.transferIds) ? stage.transferIds.filter(Boolean) : []
  );

  animatorAssemblyMeshes.forEach((group) => {
    const assemblyId = group?.userData?.assemblyId ?? null;
    const emphasis = getAnimatorAssemblyStageEmphasis(
      assemblyId,
      documentData,
      timeSeconds,
      participantRoleMap
    );
    group.scale.setScalar(emphasis.scale);
    setAnimatorObjectOpacity(group, emphasis.opacity);
  });

  const applyAssemblyOpacityToEntries = (entries = []) => {
    entries.forEach((entry) => {
      const assemblyId = entry?.userData?.assemblyId ?? null;
      const emphasis = getAnimatorAssemblyStageEmphasis(
        assemblyId,
        documentData,
        timeSeconds,
        participantRoleMap
      );
      setAnimatorObjectOpacity(entry, emphasis.opacity);
    });
  };

  applyAssemblyOpacityToEntries(animatorShellMeshes);
  applyAssemblyOpacityToEntries(animatorEnvelopeMeshes);
  applyAssemblyOpacityToEntries(animatorOrbitTraceLines);
  applyAssemblyOpacityToEntries(animatorAxisGuideLines);
  applyAssemblyOpacityToEntries(animatorOrbitParticleMeshes);
  applyAssemblyOpacityToEntries(animatorMemberLabelSprites);

  animatorTransferLines.forEach((line) => {
    const transfer = line?.userData?.transfer ?? null;
    const transferId = String(transfer?.id ?? "").trim();
    const stageAction = String(stage?.action ?? "").trim().toLowerCase();
    const isHighlighted = transferId && stageTransferIds.has(transferId);
    const showMotionSource = isAnimatorThreeObjectMotionSourceVisible(line);
    const showMotionState = line?.userData?.visibleByMotionState !== false;
    if (stageAction === "setup" || !showMotionSource || !showMotionState) {
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

function updateAnimatorAnimatedViewport(timeSeconds) {
  if (!animatorCurrentDocument) {
    return;
  }
  animatorCurrentViewportFramingState = resolveAnimatorViewportFramingState(
    animatorCurrentDocument,
    timeSeconds,
    getAnimatorSceneTimeWindow(animatorCurrentDocument)
  );
  const motionTime =
    animatorEditorPreviewState.renderMotionTimeOverride != null &&
    Math.abs(timeSeconds - Number(animatorEditorPreviewState.renderMotionTimePlayhead ?? NaN)) <= 0.0005
      ? Number(animatorEditorPreviewState.renderMotionTimeOverride)
      : getAnimatorIntegratedMotionTime(animatorCurrentDocument, timeSeconds);
  const paths = Array.isArray(animatorCurrentDocument.paths) ? animatorCurrentDocument.paths : [];
  const pathById = new Map(paths.map((path) => [path.id, path]));
  const assemblies = Array.isArray(animatorCurrentDocument.assemblies)
    ? animatorCurrentDocument.assemblies
    : [];
  const simulationDataset = getAnimatorSimulationDataset(animatorCurrentDocument);
  const totalMotionDuration = getAnimatorTotalMotionDuration(animatorCurrentDocument);
  const normalizedSceneT =
    animatorEditorPreviewState.renderMotionProgressOverride != null &&
    Math.abs(timeSeconds - Number(animatorEditorPreviewState.renderMotionProgressPlayhead ?? NaN)) <= 0.0005
      ? clamp(Number(animatorEditorPreviewState.renderMotionProgressOverride), 0, 1)
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
      return computeAnimatorAssemblyBasePosition(assembly, index, assemblies.length, pathById);
    }
    stack.add(assembly.id);
    const motions = Array.isArray(assembly.motion)
      ? assembly.motion
      : assembly.motion
        ? [assembly.motion]
        : [];
    const simulationFrameMotion = getAnimatorSimulationFrameMotion(assembly);
    const transportMotion = motions.find((motion) => motion?.type === "path.transport");
    let center = computeAnimatorAssemblyBasePosition(assembly, index, assemblies.length, pathById);
    const simulationParticleId = getAnimatorSimulationParticleId(simulationFrameMotion, assembly);
    if (simulationDataset && simulationFrameMotion && simulationParticleId) {
      const simulationTime = getAnimatorSimulationTimeForMotion(motionTime, simulationFrameMotion);
      const solverPath = getAnimatorSolverPathForAssembly(
        paths,
        assembly.id,
        simulationParticleId
      );
      const solverPathPoints = Array.isArray(solverPath?.payload?.points)
        ? solverPath.payload.points
        : [];
      if (solverPathPoints.length) {
        center = sampleAnimatorPointAt(
          solverPathPoints,
          getAnimatorSimulationDatasetProgress(simulationDataset, simulationTime),
          {
            interpolate: solverPath?.payload?.interpolate ?? "spline",
            closed: !!solverPath?.payload?.closed,
          }
        );
      } else {
        const simulationSample = sampleAnimatorSimulationParticleAtTime(
          simulationDataset,
          simulationParticleId,
          simulationTime
        );
        if (simulationSample?.position) {
          center = vectorFromTriplet(simulationSample.position);
        }
      }
    } else if (transportMotion?.pathId && pathById.has(transportMotion.pathId)) {
      const path = pathById.get(transportMotion.pathId);
      const points = Array.isArray(path?.payload?.points) ? path.payload.points : [];
      if (points.length) {
        const motionT = clamp(
          normalizedSceneT * (Number(transportMotion.speed ?? 1) || 1) + Number(transportMotion.phase ?? 0),
          0,
          1
        );
        center = sampleAnimatorPointAt(points, motionT, {
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
    const mesh = animatorAssemblyMeshes[index];
    if (mesh) {
      mesh.position.copy(center);
      mesh.visible = isAnimatorThreeObjectMotionSourceVisible(mesh);
    }
  });
  animatorAssemblyWorldCenters = new Map(
    [...assemblyCenters.entries()].map(([assemblyId, center]) => [assemblyId, center.clone()])
  );

  animatorShellMeshes.forEach((mesh) => {
    const assemblyId = mesh.userData.assemblyId;
    const center = assemblyCenters.get(assemblyId);
    if (center) {
      mesh.position.copy(center);
    }
    mesh.visible = isAnimatorThreeObjectMotionSourceVisible(mesh);
  });

  animatorEnvelopeMeshes.forEach((mesh) => {
    const assemblyId = mesh.userData.assemblyId;
    const center = assemblyCenters.get(assemblyId);
    if (center) {
      mesh.position.copy(center);
    }
    mesh.visible =
      isAnimatorViewportDisplayFlagEnabled("showEnvelopes") &&
      isAnimatorThreeObjectMotionSourceVisible(mesh);
  });

  animatorFieldShellMeshes.forEach((group) => {
    const fieldShell = group.userData.fieldShell;
    const shellState = getAnimatorFieldShellRenderState(fieldShell, motionTime, simulationDataset, {
      opacityScale: animatorFieldShellOpacityScale,
    });
    group.position.copy(
      resolveAnimatorFieldShellEmissionCenter(
        fieldShell,
        shellState,
        simulationDataset,
        animatorCurrentDocument
      )
    );
    group.scale.setScalar(Math.max(0.001, shellState.radius));
    group.userData.visibleByMotionState = shellState.visible;
    const surfaceMaterial = group.userData.surfaceMaterial;
    if (surfaceMaterial) {
      surfaceMaterial.color.set(shellState.color);
      surfaceMaterial.opacity = getAnimatorFieldShellSurfaceOpacity(fieldShell, shellState);
    }
    const wireMaterial = group.userData.wireMaterial;
    if (wireMaterial) {
      wireMaterial.color.set(shellState.color);
      wireMaterial.opacity = getAnimatorFieldShellWireOpacity(fieldShell, shellState);
    }
    group.visible =
      isAnimatorViewportDisplayFlagEnabled("showEnvelopes") &&
      shellState.visible &&
      isAnimatorThreeObjectMotionSourceVisible(group);
  });

  animatorOrbitTraceLines.forEach((line) => {
    const assemblyId = line.userData.assemblyId;
    const center = assemblyCenters.get(assemblyId);
    if (center) {
      line.position.copy(center);
    }
    line.visible = isAnimatorThreeObjectMotionSourceVisible(line);
  });

  animatorAxisGuideLines.forEach((line) => {
    const assemblyId = line.userData.assemblyId;
    const center = assemblyCenters.get(assemblyId);
    if (center) {
      line.position.copy(center);
    }
    line.visible = isAnimatorThreeObjectMotionSourceVisible(line);
  });

  animatorHistoryTraceLines.forEach((line) => {
    const showHistoryTraces = isAnimatorViewportDisplayFlagEnabled("showHistoryTraces");
    const showMotionSource = isAnimatorThreeObjectMotionSourceVisible(line);
    const historyTrace = line.userData.historyTrace;
    const path = historyTrace?.pathId ? pathById.get(historyTrace.pathId) : null;
    const assemblyId = historyTrace?.assemblyId ?? null;
    const assembly = assemblyId ? assemblyById.get(assemblyId) : null;
    const simulationParticleId = getAnimatorSimulationParticleId(historyTrace, assembly);
    const usesSimulationFrames =
      simulationDataset &&
      simulationParticleId &&
      (historyTrace?.source?.type === "simulation.frames" ||
        historyTrace?.kind === "solver-derived" ||
        !path);
    if (usesSimulationFrames) {
      const traceSimulationTime = getAnimatorSimulationTimeForMotion(
        motionTime,
        historyTrace?.source ?? historyTrace
      );
      if (path && getAnimatorDocumentPathSourceKind(path) === "solver-derived") {
        const trailSamples = createAnimatorFadeableTrailSamples(
          getAnimatorTimedPathTrailSamples(path, simulationDataset),
          traceSimulationTime,
          getAnimatorTrailControlState()
        );
        if (!setAnimatorHistoryTraceLineSamples(line, trailSamples)) {
          line.visible = false;
          return;
        }
        line.visible = showHistoryTraces && showMotionSource;
        return;
      }
      const trailSamples = createAnimatorFadeableTrailSamples(
        sampleAnimatorSimulationParticleTrail(
          simulationDataset,
          simulationParticleId,
          traceSimulationTime
        ),
        traceSimulationTime,
        getAnimatorTrailControlState()
      );
      if (!setAnimatorHistoryTraceLineSamples(line, trailSamples)) {
        line.visible = false;
        return;
      }
      line.visible = showHistoryTraces && showMotionSource;
      return;
    }
    const assemblyCenter = assemblyId ? assemblyCenters.get(assemblyId) : null;
    const points = Array.isArray(path?.payload?.points) ? path.payload.points : [];
    if (!assemblyCenter || !points.length) {
      line.visible = false;
      return;
    }
    const sampledPoints = sampleAnimatorPath(
      points,
      path?.payload?.interpolate ?? "spline",
      !!path?.payload?.closed
    );
    if (!sampledPoints.length) {
      line.visible = false;
      return;
    }
    const currentSample = sampleAnimatorPointAt(points, normalizedSceneT, {
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
    line.geometry.setFromPoints(visiblePoints);
    if (line.userData.usesLineDistances) {
      line.computeLineDistances();
    }
    line.visible = showHistoryTraces && showMotionSource;
  });

  animatorOrbitParticleMeshes.forEach((mesh) => {
    const assemblyId = mesh.userData.assemblyId;
    const center = assemblyCenters.get(assemblyId);
    const motion = mesh.userData.motion;
    if (!center || motion?.type !== "orbit.circular") {
      mesh.visible = false;
      return;
    }
    const offset = getAnimatorOrbitOffsetAtTime(motion, mesh.userData.chargeType, motionTime);
    mesh.position.copy(center).add(offset);
    mesh.visible = isAnimatorThreeObjectMotionSourceVisible(mesh);
  });

  animatorMemberLabelSprites.forEach((sprite) => {
    const showLabels = isAnimatorViewportDisplayFlagEnabled("showLabels");
    const assemblyId = sprite.userData.assemblyId;
    const memberId = sprite.userData.memberId;
    const anchorPosition = resolveAnimatorTransferEndpointPosition(
      { assemblyId, memberId },
      assemblyCenters,
      motionTime
    );
    if (!anchorPosition) {
      sprite.visible = false;
      return;
    }
    sprite.visible = showLabels && isAnimatorThreeObjectMotionSourceVisible(sprite);
    const offset = vectorFromTriplet(sprite.userData.offset);
    sprite.position.copy(anchorPosition).add(offset);
  });

  animatorDelayedHitGroups.forEach((group) => {
    updateAnimatorDelayedHitVisualState(group, motionTime);
  });
  updateAnimatorPathHistoryLineSegments(motionTime);
  renderAnimatorDelayedHitTable(animatorCurrentDocument, motionTime);

  animatorTransferLines.forEach((line) => {
    const transfer = line.userData.transfer;
    const sourcePoint = resolveAnimatorTransferEndpointPosition(
      transfer?.source,
      assemblyCenters,
      motionTime
    );
    const targetPoint = resolveAnimatorTransferEndpointPosition(
      transfer?.target,
      assemblyCenters,
      motionTime
    );
    if (!sourcePoint || !targetPoint) {
      line.userData.visibleByMotionState = false;
      line.visible = false;
      return;
    }
    line.geometry.setFromPoints([sourcePoint, targetPoint]);
    line.computeLineDistances();
    const isActiveByTime = transfer?.t == null || Math.abs(timeSeconds - Number(transfer.t)) <= 0.6;
    line.userData.visibleByMotionState = isActiveByTime;
    line.visible = isActiveByTime && isAnimatorThreeObjectMotionSourceVisible(line);
    line.material.color.set(0xffd17a);
    line.material.opacity = isActiveByTime ? 0.82 : 0.32;
  });

  animatorPersonalityHandleMeshes.forEach((mesh) => {
    const assemblyId = mesh?.userData?.assemblyId ?? null;
    const memberId = mesh?.userData?.memberId ?? null;
    const assembly = assemblyId ? assemblyById.get(assemblyId) : null;
    const member = Array.isArray(assembly?.members)
      ? assembly.members.find((entry, index) => getAnimatorMemberId(entry, index) === memberId)
      : null;
    if (!assembly || !member) {
      mesh.visible = false;
      return;
    }
    const slotIndex = Math.max(0, Number(member?.slotIndex ?? 0) || 0);
    const localOffset = getAnimatorPersonalitySlotLocalOffset(assembly, slotIndex);
    mesh.position.copy(localOffset);
    if (mesh.material?.color) {
      mesh.material.color.set(getAnimatorMemberColor(member, slotIndex));
    }
    setAnimatorMemberAnchor(assemblyId, memberId, {
      type: "proxy",
      offset: [localOffset.x, localOffset.y, localOffset.z],
    });
    mesh.visible = isAnimatorThreeObjectMotionSourceVisible(mesh);
  });

  try {
    updateAnimatorGraphicOverlayVisuals(timeSeconds, animatorCurrentDocument, assemblyCenters);
  } catch (error) {
    console.error("animator graphic overlay update failed.", error);
  }
  updateAnimatorViewportMediaOverlays(timeSeconds, animatorCurrentDocument);
  applyAnimatorStageVisualState(animatorCurrentDocument, timeSeconds);

  if (isAnimatorPlanarViewportActive()) {
    applyAnimatorPlanarViewportCamera(animatorCurrentDocument);
  } else if (animatorCameraFlightState.preview && animatorCamera) {
    const previewCameraState = getAnimatorAutoscaledCameraState(
      getAnimatorPreviewCameraStateAtTime(timeSeconds),
      animatorCurrentDocument,
      assemblyCenters,
      animatorCurrentViewportFramingState
    );
    if (previewCameraState) {
      animatorCamera.position.copy(previewCameraState.position);
      animatorCamera.lookAt(previewCameraState.lookAt);
    }
  } else if (animatorCamera && animatorViewportModeState.cameraSource === "authored") {
    const authoredCameraState = getAnimatorAutoscaledCameraState(
      getAnimatorDocumentCameraStateAtTime(animatorCurrentDocument, timeSeconds),
      animatorCurrentDocument,
      assemblyCenters,
      animatorCurrentViewportFramingState
    );
    if (authoredCameraState) {
      animatorCamera.position.copy(authoredCameraState.position);
      animatorCamera.lookAt(authoredCameraState.lookAt);
    }
  }
}

function addAnimatorOrbitTrace(center, motion, color) {
  const radius = Number(motion?.radius ?? 0);
  if (!radius || radius <= 0) {
    return;
  }
  const { u, v } = getAnimatorOrbitBasis(motion);
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
  animatorViewportGroup?.add(line);
  animatorOrbitTraceLines.push(line);
}

function addAnimatorAxisGuide(center, axisGuide) {
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
  animatorViewportGroup?.add(line);
  animatorAxisGuideLines.push(line);
}

function addAnimatorShell(center, shell) {
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
  wireframe.userData.isAnimatorShellGuide = true;
  mesh.add(wireframe);
  mesh.position.copy(center);
  mesh.userData.assemblyId = shell?.assemblyId ?? null;
  mesh.userData.motionSourceKind = getAnimatorAssemblyMotionSourceKind(
    getAnimatorDocumentAssemblyById(shell?.assemblyId)
  );
  animatorViewportGroup?.add(mesh);
  animatorShellMeshes.push(mesh);
}

function addAnimatorEnvelope(center, envelope) {
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
  mesh.userData.motionSourceKind = getAnimatorEnvelopeSourceKind(
    envelope,
    new Map(
      (Array.isArray(animatorCurrentDocument?.assemblies) ? animatorCurrentDocument.assemblies : [])
        .map((assembly) => [assembly?.id, assembly])
    )
  );
  animatorViewportGroup?.add(mesh);
  animatorEnvelopeMeshes.push(mesh);
}

function addAnimatorFieldShell(fieldShell, simulationDataset) {
  if (!fieldShell || typeof fieldShell !== "object") {
    return;
  }
  const shellState = getAnimatorFieldShellRenderState(fieldShell, fieldShell.emissionTime, simulationDataset, {
    opacityScale: animatorFieldShellOpacityScale,
  });
  const shellCenter = resolveAnimatorFieldShellEmissionCenter(
    fieldShell,
    shellState,
    simulationDataset,
    animatorCurrentDocument
  );
  const geometry = new THREE.SphereGeometry(1, 32, 20);
  const material = new THREE.MeshBasicMaterial({
    color: shellState.color,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  const wireframe = new THREE.LineSegments(
    new THREE.WireframeGeometry(geometry),
    new THREE.LineBasicMaterial({
      color: shellState.color,
      transparent: true,
      opacity: 0,
      depthTest: false,
      depthWrite: false,
    })
  );
  const group = new THREE.Group();
  group.add(mesh);
  group.add(wireframe);
  group.position.copy(shellCenter);
  group.scale.setScalar(Math.max(0.001, shellState.radius));
  group.visible = false;
  group.userData.fieldShell = fieldShell;
  group.userData.motionSourceKind = "solver-derived";
  group.userData.visibleByMotionState = false;
  group.userData.surfaceMaterial = material;
  group.userData.wireMaterial = wireframe.material;
  animatorViewportGroup?.add(group);
  animatorFieldShellMeshes.push(group);
}

function addAnimatorHistoryTrace(historyTrace) {
  if (!animatorViewportGroup) {
    return;
  }
  const style = historyTrace?.style ?? {};
  const linePattern = `${style.linePattern ?? style.pattern ?? "solid"}`.toLowerCase();
  const isDotted = linePattern === "dotted";
  const isDashed = isDotted || linePattern === "dashed";
  const material = isDashed
    ? new THREE.LineDashedMaterial({
        color: style.color ?? 0x8bdcff,
        vertexColors: true,
        transparent: true,
        opacity: getAnimatorTrailMaterialOpacity(historyTrace, getAnimatorTrailControlState()),
        linewidth: normalizePositiveNumber(style.lineWidth ?? style.width, 1),
        dashSize: normalizePositiveNumber(style.dashSize, isDotted ? 0.025 : 0.14),
        gapSize: normalizePositiveNumber(style.gapSize, isDotted ? 0.085 : 0.08),
      })
    : new THREE.LineBasicMaterial({
        color: style.color ?? 0x8bdcff,
        vertexColors: true,
        transparent: true,
        opacity: getAnimatorTrailMaterialOpacity(historyTrace, getAnimatorTrailControlState()),
        linewidth: normalizePositiveNumber(style.lineWidth ?? style.width, 1),
      });
  const line = new THREE.Line(new THREE.BufferGeometry(), material);
  line.userData.historyTrace = historyTrace;
  line.userData.usesLineDistances = isDashed;
  line.userData.motionSourceKind = getAnimatorHistoryTraceMotionSourceKind(historyTrace);
  animatorViewportGroup.add(line);
  animatorHistoryTraceLines.push(line);
}

function renderAnimatorDelayedHitTable(documentData, timeSeconds) {
  if (!animatorDelayedHitTable) {
    return;
  }
  if (!isAnimatorViewportDisplayFlagEnabled("showDelayedHits")) {
    animatorDelayedHitTable.hidden = true;
    animatorDelayedHitTable.replaceChildren();
    return;
  }
  const simulationDataset = getAnimatorSimulationDataset(documentData);
  const rows = createAnimatorDelayedHitTableRows(simulationDataset, timeSeconds);
  if (!rows.length) {
    animatorDelayedHitTable.hidden = true;
    animatorDelayedHitTable.replaceChildren();
    return;
  }
  const rawHits = Array.isArray(simulationDataset?.delayedHits)
    ? simulationDataset.delayedHits
    : [];
  const prioritizedRows = rows
    .map((row, index) => {
      const rawHit = rawHits[index] ?? {};
      const hitTime = Number(rawHit.hitTime ?? rawHit.t ?? row.hitTime ?? 0) || 0;
      return {
        row,
        rank: row.active ? 0 : row.visible ? 1 : 2,
        distance: Math.abs((Number(timeSeconds) || 0) - hitTime),
      };
    })
    .sort((a, b) => a.rank - b.rank || a.distance - b.distance)
    .slice(0, 6)
    .map((entry) => entry.row);

  const title = document.createElement("div");
  title.className = "animator-delayed-hit-table-title";
  title.textContent = `Delayed hits (${rows.length})`;

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["State", "Path", "Branch", "J", "Emit", "Hit"].forEach((label) => {
    const th = document.createElement("th");
    th.textContent = label;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  prioritizedRows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.classList.toggle("is-active", row.active);
    [
      row.stateLabel,
      `${row.emitterId} > ${row.receiverId}`,
      row.branchId || row.id,
      row.jacobianLabel,
      row.emissionTimeLabel,
      row.hitTimeLabel,
    ].forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  animatorDelayedHitTable.replaceChildren(title, table);
  animatorDelayedHitTable.hidden = false;
}

function addAnimatorPathHistoryLineSegments(delayedHits = []) {
  if (!animatorViewportGroup || !Array.isArray(delayedHits) || !delayedHits.length) {
    return;
  }
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.42,
    depthTest: false,
    depthWrite: false,
  });
  const lineSegments = new THREE.LineSegments(geometry, material);
  lineSegments.renderOrder = 18;
  lineSegments.userData.motionSourceKind = "solver-derived";
  lineSegments.userData.visibleByMotionState = false;
  lineSegments.userData.isAnimatorPathHistoryLineSegments = true;
  animatorPathHistoryDelayedHits = delayedHits;
  animatorPathHistoryLineSegments = lineSegments;
  animatorViewportGroup.add(lineSegments);
}

function updateAnimatorPathHistoryLineSegments(timeSeconds) {
  if (!animatorPathHistoryLineSegments) {
    return;
  }
  const points = [];
  animatorPathHistoryDelayedHits.forEach((hit) => {
    const renderState = getAnimatorDelayedHitRenderState(hit, timeSeconds, {
      fadeOutSeconds: 4.2,
      activeWindowSeconds: 0.35,
      baseOpacity: 0.5,
      strengthOpacityScale: 0.18,
    });
    if (!renderState.visible) {
      return;
    }
    if (renderState.travelProgress <= 0.001) {
      return;
    }
    points.push(
      vectorFromTriplet(renderState.sourcePosition),
      vectorFromTriplet(renderState.connectorEndPosition)
    );
  });
  animatorPathHistoryLineSegments.geometry.setFromPoints(points);
  const isVisible =
    points.length > 0 &&
    isAnimatorViewportDisplayFlagEnabled("showDelayedHits") &&
    isAnimatorThreeObjectMotionSourceVisible(animatorPathHistoryLineSegments);
  animatorPathHistoryLineSegments.userData.visibleByMotionState = points.length > 0;
  animatorPathHistoryLineSegments.visible = isVisible;
}

function addAnimatorDelayedHitVisual(delayedHit) {
  if (!animatorViewportGroup || !delayedHit || typeof delayedHit !== "object") {
    return;
  }
  const renderState = getAnimatorDelayedHitRenderState(
    delayedHit,
    delayedHit.emissionTime ?? 0
  );
  const connectorGeometry = new THREE.BufferGeometry().setFromPoints([
    vectorFromTriplet(renderState.sourcePosition),
    vectorFromTriplet(renderState.connectorEndPosition),
  ]);
  const connectorMaterial = new THREE.LineDashedMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
    dashSize: 0.11,
    gapSize: 0.07,
    depthTest: false,
    depthWrite: false,
  });
  const connector = new THREE.Line(connectorGeometry, connectorMaterial);
  connector.computeLineDistances();
  connector.renderOrder = 20;

  const sourceMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
    depthTest: false,
    depthWrite: false,
  });
  const receiverMaterial = new THREE.MeshBasicMaterial({
    color: 0xffd17a,
    transparent: true,
    opacity: 0,
    depthTest: false,
    depthWrite: false,
  });
  const sourceMarker = new THREE.Mesh(new THREE.SphereGeometry(0.075, 18, 12), sourceMaterial);
  const receiverMarker = new THREE.Mesh(new THREE.SphereGeometry(0.095, 18, 12), receiverMaterial);
  sourceMarker.renderOrder = 21;
  receiverMarker.renderOrder = 21;

  const label = createAnimatorMemberLabelSprite(
    getAnimatorDelayedHitDiagnosticLabel(delayedHit),
    "#d9fff1"
  );
  label.renderOrder = 22;
  label.material.opacity = 0;

  const group = new THREE.Group();
  group.add(connector);
  group.add(sourceMarker);
  group.add(receiverMarker);
  group.add(label);
  group.visible = false;
  group.userData.delayedHit = delayedHit;
  group.userData.motionSourceKind = "solver-derived";
  group.userData.visibleByMotionState = false;
  group.userData.connector = connector;
  group.userData.sourceMarker = sourceMarker;
  group.userData.receiverMarker = receiverMarker;
  group.userData.label = label;
  animatorViewportGroup.add(group);
  animatorDelayedHitGroups.push(group);
}

function updateAnimatorDelayedHitVisualState(group, timeSeconds) {
  const delayedHit = group?.userData?.delayedHit;
  if (!delayedHit) {
    return;
  }
  const renderState = getAnimatorDelayedHitRenderState(delayedHit, timeSeconds);
  const sourcePoint = vectorFromTriplet(renderState.sourcePosition);
  const receiverPoint = vectorFromTriplet(renderState.receiverPosition);
  const connectorEndPoint = vectorFromTriplet(renderState.connectorEndPosition);
  const connector = group.userData.connector;
  if (connector) {
    connector.geometry.setFromPoints([sourcePoint, connectorEndPoint]);
    connector.computeLineDistances();
    connector.material.opacity = renderState.connectorOpacity;
    connector.material.color.set(renderState.active ? 0xffffff : 0xdff7ff);
  }
  const sourceMarker = group.userData.sourceMarker;
  if (sourceMarker) {
    sourceMarker.position.copy(sourcePoint);
    sourceMarker.scale.setScalar(renderState.markerScale);
    sourceMarker.material.opacity = renderState.sourceOpacity;
  }
  const receiverMarker = group.userData.receiverMarker;
  if (receiverMarker) {
    receiverMarker.position.copy(receiverPoint);
    receiverMarker.scale.setScalar(renderState.markerScale);
    receiverMarker.material.opacity = renderState.receiverOpacity;
  }
  const label = group.userData.label;
  if (label) {
    const midpoint = sourcePoint.clone().lerp(receiverPoint, 0.5);
    label.position.copy(midpoint).add(new THREE.Vector3(0, 0.24, 0));
    label.scale.set(0.48 * renderState.markerScale, 0.14 * renderState.markerScale, 1);
    label.material.opacity = renderState.active
      ? Math.min(1, renderState.opacity + 0.24)
      : renderState.opacity * 0.72;
  }
  group.userData.visibleByMotionState = renderState.visible;
  group.visible =
    isAnimatorViewportDisplayFlagEnabled("showDelayedHits") &&
    renderState.visible &&
    isAnimatorThreeObjectMotionSourceVisible(group);
}

function addAnimatorOrbitParticle(center, motion, chargeType, memberId = null) {
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
  mesh.userData.motionSourceKind = getAnimatorAssemblyMotionSourceKind(
    getAnimatorDocumentAssemblyById(motion?.assemblyId)
  );
  animatorViewportGroup?.add(mesh);
  animatorOrbitParticleMeshes.push(mesh);
}

function addAnimatorTransferLine(transfer) {
  if (!animatorViewportGroup) {
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
  line.userData.motionSourceKind = getAnimatorTransferSourceKind(
    transfer,
    new Map(
      (Array.isArray(animatorCurrentDocument?.assemblies) ? animatorCurrentDocument.assemblies : [])
        .map((assembly) => [assembly?.id, assembly])
    )
  );
  animatorViewportGroup.add(line);
  animatorTransferLines.push(line);
}

function addAnimatorGraphicOverlayVisual(overlay) {
  if (!animatorViewportGroup || !overlay?.id) {
    return;
  }
  const group = new THREE.Group();
  group.userData.overlayId = overlay.id;
  group.userData.isAnimatorGraphicOverlay = true;

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

  const textSprite = createAnimatorGraphicOverlayTextSprite(overlay.text, haloRadius);
  textSprite.userData.overlayId = overlay.id;
  textSprite.userData.isAnimatorGraphicHandle = true;
  textSprite.userData.draggable = true;
  const textHitProxy = createAnimatorMarkerHitProxy(Math.max(0.24, haloRadius * 0.84));
  textSprite.userData.hitProxy = textHitProxy;
  textSprite.add(textHitProxy);
  group.add(textSprite);
  animatorGraphicOverlayHandleMeshes.push(textSprite);

  group.userData.calloutLine = calloutLine;
  group.userData.textSprite = textSprite;
  group.userData.radius = haloRadius;
  group.userData.textSignature = "";

  animatorViewportGroup.add(group);
  animatorGraphicOverlayGroups.push(group);
}

function updateAnimatorGraphicOverlayVisuals(timeSeconds, documentData, assemblyCenters = new Map()) {
  const overlayById = new Map(getAnimatorGraphicTimelineOverlays(documentData).map((overlay) => [overlay.id, overlay]));
  animatorGraphicOverlayGroups.forEach((group) => {
    const overlayId = group?.userData?.overlayId;
    const overlay = overlayId ? overlayById.get(overlayId) : null;
    if (!overlay) {
      group.visible = false;
      return;
    }
    const isActive = isAnimatorTimeWithinSpan(timeSeconds, overlay.start, overlay.end);
    group.visible = isActive;
    if (!isActive) {
      return;
    }
    const targetPosition =
      resolveAnimatorGraphicTargetPosition(overlay.target, assemblyCenters, documentData) ??
      new THREE.Vector3();
    const offset = vectorFromTriplet(overlay.offset ?? [0, 0, 0]);
    const sphereCenter = targetPosition.clone().add(offset);
    const anchorPosition =
      resolveAnimatorGraphicTargetContactPosition(overlay.target, sphereCenter, assemblyCenters, documentData) ??
      targetPosition;
    group.position.copy(sphereCenter);
    group.userData.anchorPosition = anchorPosition.clone();
    group.userData.radius = Math.max(0.18, Number(overlay.size ?? 0.42) || 0.42);

    const calloutLine = group.userData.calloutLine ?? null;
    const radius = group.userData.radius;
    const textSprite = group.userData.textSprite ?? null;
    const nextSignature = `${overlay.text}|${radius.toFixed(3)}`;
    if (textSprite && group.userData.textSignature !== nextSignature) {
      updateAnimatorGraphicOverlayTextSprite(textSprite, overlay.text, radius);
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

function setAnimatorViewportMediaOverlayFrame(element, rect) {
  if (!element || !rect) {
    return;
  }
  element.style.left = `${rect.x * 100}%`;
  element.style.top = `${rect.y * 100}%`;
  element.style.width = `${rect.width * 100}%`;
  element.style.height = `${rect.height * 100}%`;
}

function clearAnimatorViewportMediaOverlays() {
  animatorViewportMediaOverlayElements.forEach((element) => {
    element?.remove?.();
  });
  animatorViewportMediaOverlayElements.clear();
}

function createAnimatorViewportMediaOverlayElement(overlay) {
  if (!animatorViewportOverlays || !overlay?.id || !(overlay.kind === "image" || overlay.kind === "video")) {
    return null;
  }
  const wrapper = document.createElement("div");
  wrapper.className = "animator-media-overlay";
  wrapper.dataset.overlayId = overlay.id;
  wrapper.dataset.overlayKind = overlay.kind;

  const mediaElement = document.createElement(overlay.kind === "video" ? "video" : "img");
  mediaElement.className = "animator-media-overlay-media";
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
  handle.className = "animator-media-overlay-handle";
  wrapper.appendChild(handle);

  const endInteraction = (event) => {
    const state = wrapper.__animatorDragState;
    if (!state || (event && state.pointerId !== event.pointerId)) {
      return;
    }
    wrapper.__animatorDragState = null;
    wrapper.classList.remove("is-active");
    if (wrapper.hasPointerCapture?.(state.pointerId)) {
      wrapper.releasePointerCapture(state.pointerId);
    }
    renderAnimatorJsonPreview();
  };

  const startInteraction = (mode, event) => {
    if (event.button !== 0) {
      return;
    }
    const draftOverlay = getAnimatorGraphicOverlayDraftById(overlay.id);
    if (!draftOverlay) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    closeAnimatorAssemblyMenu();
    wrapper.classList.add("is-active");
    wrapper.__animatorDragState = {
      mode,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startRect: { ...(draftOverlay.rect ?? getAnimatorMediaDefaultRect(draftOverlay.kind)) },
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
    const state = wrapper.__animatorDragState;
    if (!state || state.pointerId !== event.pointerId || !animatorCanvasWrap) {
      return;
    }
    const draftOverlay = getAnimatorGraphicOverlayDraftById(overlay.id);
    if (!draftOverlay) {
      return;
    }
    event.preventDefault();
    const wrapRect = animatorCanvasWrap.getBoundingClientRect();
    const dx = wrapRect.width ? (event.clientX - state.startX) / wrapRect.width : 0;
    const dy = wrapRect.height ? (event.clientY - state.startY) / wrapRect.height : 0;
    if (state.mode === "move") {
      draftOverlay.rect = normalizeAnimatorMediaRect({
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
      draftOverlay.rect = normalizeAnimatorMediaRect({
        x: state.startRect.x,
        y: state.startRect.y,
        width: nextWidth,
        height: nextHeight,
      }, draftOverlay.kind);
    }
    setAnimatorViewportMediaOverlayFrame(wrapper, draftOverlay.rect);
  });
  wrapper.addEventListener("pointerup", endInteraction);
  wrapper.addEventListener("pointercancel", endInteraction);
  wrapper.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    event.stopPropagation();
    openAnimatorTimelineMenuAt(event.clientX, event.clientY, {
      overlayId: overlay.id,
    });
  });

  animatorViewportOverlays.appendChild(wrapper);
  animatorViewportMediaOverlayElements.set(overlay.id, wrapper);
  setAnimatorViewportMediaOverlayFrame(wrapper, overlay.rect ?? getAnimatorMediaDefaultRect(overlay.kind));
  return wrapper;
}

function syncAnimatorViewportMediaOverlays(documentData) {
  clearAnimatorViewportMediaOverlays();
  const overlays = getAnimatorViewportMediaTimelineOverlays(documentData);
  overlays.forEach((overlay) => {
    createAnimatorViewportMediaOverlayElement(overlay);
  });
}

function updateAnimatorViewportMediaOverlays(timeSeconds, documentData) {
  const overlays = getAnimatorViewportMediaTimelineOverlays(documentData);
  const overlayById = new Map(overlays.map((overlay) => [overlay.id, overlay]));
  animatorViewportMediaOverlayElements.forEach((element, overlayId) => {
    const overlay = overlayById.get(overlayId);
    const mediaElement = element?.querySelector?.(".animator-media-overlay-media");
    if (!overlay || !mediaElement) {
      element?.classList.remove("is-visible");
      return;
    }
    setAnimatorViewportMediaOverlayFrame(element, overlay.rect ?? getAnimatorMediaDefaultRect(overlay.kind));
    const isActive = isAnimatorTimeWithinSpan(timeSeconds, overlay.start, overlay.end);
    element.classList.toggle("is-visible", isActive);
    if (!isActive) {
      if (overlay.kind === "video") {
        mediaElement.pause?.();
      }
      return;
    }
    if (overlay.kind === "video") {
      const localTime = Math.max(0, timeSeconds - overlay.start);
      if (!animatorPlaybackState.playing || Math.abs((mediaElement.currentTime ?? 0) - localTime) > 0.25) {
        try {
          mediaElement.currentTime = localTime;
        } catch (_error) {
          // Ignore sync failures while metadata is still loading.
        }
      }
      if (animatorPlaybackState.playing) {
        mediaElement.play?.().catch?.(() => {});
      } else {
        mediaElement.pause?.();
      }
    }
  });
}

function addAnimatorAssemblyProxy(center, assembly, index) {
  const group = new THREE.Group();
  group.position.copy(center);
  group.userData.assemblyId = assembly?.id ?? null;
  group.userData.assemblyIndex = index;
  group.userData.motionSourceKind = getAnimatorAssemblyMotionSourceKind(assembly);
  group.userData.draggable = true;
  const isBareArchitrino = isAnimatorBareArchitrinoAssembly(assembly);
  let centerMarker = null;

  if (!isBareArchitrino) {
    const sceneRole = normalizeAnimatorAssemblySceneRole(assembly?.sceneRole);
    centerMarker = new THREE.Mesh(
      new THREE.SphereGeometry(0.085, 20, 20),
      new THREE.MeshBasicMaterial({
        color: getAnimatorAssemblySceneRoleColor(sceneRole),
        transparent: true,
        opacity: 0.98,
        depthTest: false,
        depthWrite: false,
      })
    );
    centerMarker.renderOrder = 12;
    centerMarker.userData.assemblyId = assembly?.id ?? null;
    centerMarker.userData.assemblyIndex = index;
    centerMarker.userData.motionSourceKind = group.userData.motionSourceKind;
    centerMarker.userData.sceneRole = sceneRole;
    centerMarker.userData.draggable = true;
    centerMarker.userData.isAssemblyCenterMarker = true;
    const centerLabel = createAnimatorPointLabelSprite(getAnimatorAssemblyViewportLabel(assembly, index));
    centerLabel.position.set(0, 0, 0);
    centerMarker.userData.pointLabelSprite = centerLabel;
    const centerHitProxy = createAnimatorMarkerHitProxy(0.22);
    centerMarker.userData.hitProxy = centerHitProxy;
    centerMarker.add(centerHitProxy);
    centerMarker.add(centerLabel);
    group.add(centerMarker);
  }

  const rawMembers = Array.isArray(assembly?.members) ? assembly.members : [];
  const members = rawMembers.map((member, memberIndex) => ({
    id: getAnimatorMemberId(member, memberIndex),
    position: getAnimatorMemberPosition(member),
  }));
  const memberCount = members.length;
  const hasCore = Array.isArray(assembly?.core?.shells) && assembly.core.shells.length > 0;
  const baseColor = animatorPalette[index % Math.max(1, animatorPalette.length)] ?? "#6ea8fe";
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
          : getAnimatorProxyMemberOffset(memberIndex, rootMembers.length, baseRadius);
      setAnimatorMemberAnchor(assembly?.id, memberId, {
        type: "proxy",
        offset: [memberOffset.x, memberOffset.y, memberOffset.z],
      });
      if (memberIndex >= visibleRootMembers) {
        return;
      }
      const memberDot = new THREE.Mesh(
        new THREE.SphereGeometry(isBareArchitrino ? 0.052 : 0.03, 12, 10),
        new THREE.MeshBasicMaterial({
          color: getAnimatorMemberColor(memberId, memberIndex),
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
      memberDot.userData.motionSourceKind = group.userData.motionSourceKind;
      memberDot.userData.subassemblyId = "";
      memberDot.userData.draggable = true;
      memberDot.userData.isAnimatorMemberHandle = true;
      const memberHitProxy = createAnimatorMarkerHitProxy(isBareArchitrino ? 0.18 : 0.12);
      memberDot.userData.hitProxy = memberHitProxy;
      memberDot.add(memberHitProxy);
      group.add(memberDot);
      animatorMemberHandleMeshes.push(memberDot);
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
      childMesh.userData.subassemblyId = getAnimatorSubassemblyId(child, childIndex);
      childMesh.userData.motionSourceKind = group.userData.motionSourceKind;
      childMesh.userData.draggable = true;
      childMesh.userData.isAnimatorSubassemblyHandle = true;
      const childHitProxy = createAnimatorMarkerHitProxy(childRadius + 0.1);
      childMesh.userData.hitProxy = childHitProxy;
      childMesh.add(childHitProxy);
      group.add(childMesh);
      animatorSubassemblyHandleMeshes.push(childMesh);
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
          : getAnimatorProxyMemberOffset(memberIndex, childMembers.length, childRadius);
        const memberOffset = childPosition.clone().add(localMemberOffset);
        setAnimatorMemberAnchor(assembly?.id, memberId, {
          type: "proxy",
          offset: [memberOffset.x, memberOffset.y, memberOffset.z],
        });
        if (memberIndex >= visibleChildMembers) {
          return;
        }
        const memberDot = new THREE.Mesh(
          new THREE.SphereGeometry(0.038, 12, 10),
          new THREE.MeshBasicMaterial({
            color: getAnimatorMemberColor(memberId, memberIndex + childIndex),
            transparent: true,
            opacity: 0.95,
          })
        );
        memberDot.position.copy(memberOffset);
        memberDot.userData.assemblyId = assembly?.id ?? null;
        memberDot.userData.memberId = memberId;
        memberDot.userData.motionSourceKind = group.userData.motionSourceKind;
        memberDot.userData.subassemblyId = getAnimatorSubassemblyId(child, childIndex);
        memberDot.userData.draggable = true;
        memberDot.userData.isAnimatorMemberHandle = true;
        const childMemberHitProxy = createAnimatorMarkerHitProxy(0.13);
        memberDot.userData.hitProxy = childMemberHitProxy;
        memberDot.add(childMemberHitProxy);
        group.add(memberDot);
        animatorMemberHandleMeshes.push(memberDot);
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

    const personalityMembers = getAnimatorPersonalityMembers(assembly);
    personalityMembers.forEach((member, memberIndex) => {
      const memberId = getAnimatorMemberId(member, memberIndex);
      const slotIndex = Math.max(0, Number(member?.slotIndex ?? memberIndex) || 0);
      const localOffset = getAnimatorPersonalitySlotLocalOffset(assembly, slotIndex);
      setAnimatorMemberAnchor(assembly?.id, memberId, {
        type: "proxy",
        offset: [localOffset.x, localOffset.y, localOffset.z],
      });
      const memberDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 14, 12),
        new THREE.MeshBasicMaterial({
          color: getAnimatorMemberColor(member, memberIndex),
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
      memberDot.userData.motionSourceKind = group.userData.motionSourceKind;
      memberDot.userData.draggable = false;
      memberDot.userData.isAnimatorPersonalityHandle = true;
      const memberHitProxy = createAnimatorMarkerHitProxy(0.16);
      memberDot.userData.hitProxy = memberHitProxy;
      memberDot.add(memberHitProxy);
      group.add(memberDot);
      animatorPersonalityHandleMeshes.push(memberDot);
    });

    const binaryMemberIds = new Set();
    const binaries = Array.isArray(assembly?.core?.binaries) ? assembly.core.binaries : [];
    binaries.forEach((_binary, binaryIndex) => {
      const positrinoMemberId = findAnimatorCoreMemberId(assembly?.members, "positrino", binaryIndex);
      const electrinoMemberId = findAnimatorCoreMemberId(assembly?.members, "electrino", binaryIndex);
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
          getAnimatorMemberId(personalityMember, personalityIndex) === memberEntry.id
        )
    );
    const genericCoreBaseRadius = Math.max(markerRadius, outerRadius + 0.2);
    genericCoreMembers.forEach((memberEntry, memberIndex) => {
      const memberId = memberEntry.id;
      const localOffset = memberEntry.position
        ? new THREE.Vector3(memberEntry.position[0], memberEntry.position[1], memberEntry.position[2])
        : getAnimatorProxyMemberOffset(memberIndex, genericCoreMembers.length, genericCoreBaseRadius);
      setAnimatorMemberAnchor(assembly?.id, memberId, {
        type: "proxy",
        offset: [localOffset.x, localOffset.y, localOffset.z],
      });
      const memberDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 12, 10),
        new THREE.MeshBasicMaterial({
          color: getAnimatorMemberColor(memberId, memberIndex),
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
      memberDot.userData.motionSourceKind = group.userData.motionSourceKind;
      memberDot.userData.draggable = true;
      memberDot.userData.isAnimatorMemberHandle = true;
      const memberHitProxy = createAnimatorMarkerHitProxy(0.14);
      memberDot.userData.hitProxy = memberHitProxy;
      memberDot.add(memberHitProxy);
      group.add(memberDot);
      animatorMemberHandleMeshes.push(memberDot);
    });
  }

  animatorViewportGroup?.add(group);
  animatorAssemblyMeshes.push(group);
}

function addAnimatorDocumentCameraVisuals(documentData) {
  if ((animatorCameraFlightState?.waypoints?.length ?? 0) > 0) {
    return;
  }
  const cameraPaths = Array.isArray(documentData?.cameraPaths) ? documentData.cameraPaths : [];
  const pathById = new Map(cameraPaths.map((path) => [path.id, path]));
  const activeCameraPathId = getAnimatorActiveCameraPathId(
    documentData,
    animatorPlaybackState.playheadSeconds,
    getAnimatorSceneTimeWindow(documentData)
  );
  const cameraPath = activeCameraPathId ? pathById.get(activeCameraPathId) : null;
  const waypoints = Array.isArray(cameraPath?.waypoints) ? cameraPath.waypoints : [];
  if (!waypoints.length || !animatorViewportGroup) {
    return;
  }

  const pathPoints = sampleAnimatorCurvePoints(
    waypoints.map((waypoint) => {
      const visiblePosition = getAnimatorCameraWaypointDisplayPosition(waypoint);
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
    animatorDocumentCameraPathLine = new THREE.Line(geometry, material);
    animatorDocumentCameraPathLine.renderOrder = 9;
    animatorDocumentCameraPathLine.computeLineDistances();
    animatorViewportGroup.add(animatorDocumentCameraPathLine);
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
    marker.position.copy(getAnimatorCameraWaypointDisplayPosition(waypoint));
    marker.renderOrder = 9;
    animatorViewportGroup.add(marker);
    animatorDocumentCameraWaypointMeshes.push(marker);
  });
}

function updateAnimatorViewportFromDocument(documentData) {
  const previousDocument = animatorCurrentDocument;
  const previousSceneId = animatorCurrentDocument?.scene?.id ?? null;
  const previousPlaybackPlaying = animatorPlaybackState.playing;
  const shouldPreserveRenderedMotionTime =
    previousDocument &&
    previousSceneId &&
    previousSceneId === (documentData?.scene?.id ?? null);
  const previousMotionTime = shouldPreserveRenderedMotionTime
    ? getAnimatorIntegratedMotionTime(previousDocument, animatorPlaybackState.playheadSeconds)
    : null;
  const previousMotionProgress = shouldPreserveRenderedMotionTime
    ? getAnimatorMotionProgress(previousDocument, animatorPlaybackState.playheadSeconds)
    : null;
  animatorCurrentDocument = documentData;
  if (previousSceneId !== (documentData?.scene?.id ?? null)) {
    animatorViewportModeState.projection = getAnimatorInitialViewportProjection(documentData);
    if (animatorViewportModeState.projection === "planar-2d") {
      animatorViewportModeState.cameraSource = "design";
    }
    updateAnimatorViewportModeButtons();
  }
  updateAnimatorMotionSourcePill(documentData);
  renderAnimatorSimulationAuthoringPanel(documentData);
  if (!animatorViewportGroup || !animatorPathGeometry) {
    return;
  }

  rebuildAnimatorPathDisplayFromDocument(documentData);
  clearAnimatorViewportVisuals();

  const paths = Array.isArray(documentData?.paths) ? documentData.paths : [];
  const pathById = new Map(paths.map((path) => [path.id, path]));
  const assemblies = Array.isArray(documentData?.assemblies) ? documentData.assemblies : [];
  assemblies.forEach((assembly, index) => {
    const center = computeAnimatorAssemblyBasePosition(assembly, index, assemblies.length, pathById);
    addAnimatorAssemblyProxy(center, assembly, index);

    const hasCore = Array.isArray(assembly?.core?.shells) && assembly.core.shells.length > 0;
    if (!hasCore) {
      return;
    }

    const shells = Array.isArray(assembly?.core?.shells) ? assembly.core.shells : [];
    shells.forEach((shell) => {
      addAnimatorShell(center, {
        ...shell,
        assemblyId: assembly.id,
      });
      const shellMesh = animatorShellMeshes[animatorShellMeshes.length - 1] ?? null;
      if (shellMesh) {
        shellMesh.userData.assemblyId = assembly.id;
      }
    });

    const binaries = Array.isArray(assembly?.core?.binaries) ? assembly.core.binaries : [];
    binaries.forEach((binary, binaryIndex) => {
      if (binary?.motion?.type === "orbit.circular") {
        const positrinoMemberId = findAnimatorCoreMemberId(assembly?.members, "positrino", binaryIndex);
        const electrinoMemberId = findAnimatorCoreMemberId(assembly?.members, "electrino", binaryIndex);
        if (positrinoMemberId) {
          setAnimatorMemberAnchor(assembly.id, positrinoMemberId, {
            type: "orbit",
            motion: binary.motion,
            chargeType: "positrino",
          });
        }
        if (electrinoMemberId) {
          setAnimatorMemberAnchor(assembly.id, electrinoMemberId, {
            type: "orbit",
            motion: binary.motion,
            chargeType: "electrino",
          });
        }
        addAnimatorOrbitParticle(center, binary.motion, "positrino", positrinoMemberId);
        addAnimatorOrbitParticle(center, binary.motion, "electrino", electrinoMemberId);
        const particleCount = animatorOrbitParticleMeshes.length;
        if (animatorOrbitParticleMeshes[particleCount - 1]) {
          animatorOrbitParticleMeshes[particleCount - 1].userData.assemblyId = assembly.id;
          animatorOrbitParticleMeshes[particleCount - 1].userData.motionSourceKind =
            getAnimatorAssemblyMotionSourceKind(assembly);
        }
        if (animatorOrbitParticleMeshes[particleCount - 2]) {
          animatorOrbitParticleMeshes[particleCount - 2].userData.assemblyId = assembly.id;
          animatorOrbitParticleMeshes[particleCount - 2].userData.motionSourceKind =
            getAnimatorAssemblyMotionSourceKind(assembly);
        }
      }
    });
  });
  const historyTraces = Array.isArray(documentData?.historyTraces) ? documentData.historyTraces : [];
  historyTraces.forEach((historyTrace) => {
    addAnimatorHistoryTrace(historyTrace);
  });
  const simulationDataset = getAnimatorSimulationDataset(documentData);
  const architrinoFieldShellEventPackage = createAnimatorArchitrinoFieldShellEventPackage(
    documentData,
    simulationDataset
  );
  const architrinoFieldShells = Array.isArray(architrinoFieldShellEventPackage?.fieldShells)
    ? architrinoFieldShellEventPackage.fieldShells
    : [];
  const explicitSimulationFieldShells = Array.isArray(simulationDataset?.fieldShells)
    ? simulationDataset.fieldShells
    : [];
  const simulationFieldShells = architrinoFieldShells.length
    ? architrinoFieldShells
    : explicitSimulationFieldShells;
  const simulationFieldShellIds = new Set(
    simulationFieldShells.map((shell) => String(shell?.id ?? "")).filter(Boolean)
  );
  const envelopes = Array.isArray(documentData?.envelopes) ? documentData.envelopes : [];
  envelopes.forEach((envelope) => {
    const simulationFieldShellId = String(envelope?.metadata?.simulationFieldShellId ?? "");
    if (
      simulationFieldShellId &&
      (simulationFieldShellIds.has(simulationFieldShellId) || simulationFieldShells.length > 0)
    ) {
      return;
    }
    const assemblyIndex = assemblies.findIndex((assembly) => assembly?.id === envelope?.assemblyId);
    const center =
      assemblyIndex >= 0
        ? computeAnimatorAssemblyBasePosition(assemblies[assemblyIndex], assemblyIndex, assemblies.length, pathById)
        : new THREE.Vector3();
    addAnimatorEnvelope(center, envelope);
  });
  if (architrinoFieldShells.length) {
    architrinoFieldShells.forEach((fieldShell) => {
      addAnimatorFieldShell(fieldShell, simulationDataset);
    });
  } else {
    explicitSimulationFieldShells.forEach((fieldShell) => {
      createAnimatorArchitrinoFieldShellInstances(
        fieldShell,
        simulationDataset,
        documentData
      ).forEach((fieldShellInstance) => {
        addAnimatorFieldShell(fieldShellInstance, simulationDataset);
      });
    });
  }
  const pathHistoryDelayedHits = createAnimatorArchitrinoPathHistoryDelayedHits(
    documentData,
    simulationDataset,
    architrinoFieldShellEventPackage
  );
  addAnimatorPathHistoryLineSegments(pathHistoryDelayedHits);
  const delayedHits = Array.isArray(simulationDataset?.delayedHits)
    ? simulationDataset.delayedHits
    : [];
  delayedHits.forEach((delayedHit) => {
    addAnimatorDelayedHitVisual(delayedHit);
  });
  const transfers = Array.isArray(documentData?.transfers) ? documentData.transfers : [];
  transfers.forEach((transfer) => {
    addAnimatorTransferLine(transfer);
  });
  const graphicOverlays = getAnimatorGraphicTimelineOverlays(documentData);
  graphicOverlays.forEach((overlay) => {
    try {
      addAnimatorGraphicOverlayVisual(overlay);
    } catch (error) {
      console.error("animator graphic overlay setup failed.", overlay?.id, error);
    }
  });
  syncAnimatorViewportMediaOverlays(documentData);
  addAnimatorDocumentCameraVisuals(documentData);
  renderAnimatorDelayedHitTable(documentData, animatorPlaybackState.playheadSeconds ?? 0);
  applyAnimatorViewportDisplayState();

  const timeWindow = getAnimatorSceneTimeWindow(documentData);
  if (animatorPlaybackState.playheadSeconds < timeWindow.start || previousSceneId !== documentData?.scene?.id) {
    animatorPlaybackState.playheadSeconds = timeWindow.start;
    clearAnimatorEditorPreviewState();
  } else if (shouldPreserveRenderedMotionTime && previousMotionTime != null) {
    animatorPlaybackState.playheadSeconds = clamp(
      animatorPlaybackState.playheadSeconds,
      timeWindow.start,
      timeWindow.end
    );
    animatorEditorPreviewState.renderMotionTimeOverride = previousMotionTime;
    animatorEditorPreviewState.renderMotionTimePlayhead = animatorPlaybackState.playheadSeconds;
    animatorEditorPreviewState.renderMotionProgressOverride = previousMotionProgress;
    animatorEditorPreviewState.renderMotionProgressPlayhead = animatorPlaybackState.playheadSeconds;
  } else {
    animatorPlaybackState.playheadSeconds = clamp(
      animatorPlaybackState.playheadSeconds,
      timeWindow.start,
      timeWindow.end
    );
    clearAnimatorEditorPreviewState();
  }
  animatorPlaybackState.playing = previousPlaybackPlaying;
  animatorPlaybackState.lastTickMs = 0;
  renderAnimatorTimeline(documentData);
  updateAnimatorAnimatedViewport(animatorPlaybackState.playheadSeconds);
  updateAnimatorTimelinePlayhead(animatorPlaybackState.playheadSeconds, documentData);
}

function updateAnimatorCameraFlightDisplay() {
  if (!animatorFrameGroup) {
    return;
  }
  if (!animatorCameraFlightGroup) {
    animatorCameraFlightGroup = new THREE.Group();
    animatorCameraFlightGeometry = new THREE.BufferGeometry();
    animatorCameraFlightLine = new THREE.Line(
      animatorCameraFlightGeometry,
      new THREE.LineBasicMaterial({
        color: 0x7fe7cb,
        transparent: true,
        opacity: 0.95,
        depthTest: false,
        depthWrite: false,
      })
    );
    animatorCameraFlightLine.renderOrder = 10;
    animatorCameraFlightGroup.add(animatorCameraFlightLine);
    animatorFrameGroup.add(animatorCameraFlightGroup);
    animatorCameraWaypointGeometry = new THREE.SphereGeometry(0.085, 18, 18);
    animatorCameraWaypointMaterial = new THREE.MeshBasicMaterial({
      color: 0x7fe7cb,
      transparent: true,
      opacity: 0.95,
      depthTest: false,
      depthWrite: false,
    });
  }

  animatorCameraWaypointMeshes.forEach((mesh) => {
    disposeAnimatorMarkerHandle(mesh, "labelSprite");
    animatorCameraFlightGroup.remove(mesh);
  });
  animatorCameraWaypointMeshes = [];

  const displayPoints = animatorCameraFlightState.waypoints.map((waypoint) =>
    getAnimatorCameraWaypointDisplayPosition(waypoint)
  );
  const curvePoints =
    displayPoints.length >= 2
      ? sampleAnimatorCurvePoints(
          displayPoints.map((point) => [point.x, point.y, point.z]),
          Math.max(20, displayPoints.length * 18)
        )
      : displayPoints;
  animatorCameraFlightGeometry.setFromPoints(curvePoints.length ? curvePoints : []);

  if (displayPoints.length && animatorCameraWaypointGeometry && animatorCameraWaypointMaterial) {
    displayPoints.forEach((point) => {
      const marker = new THREE.Mesh(
        animatorCameraWaypointGeometry,
        animatorCameraWaypointMaterial.clone()
      );
      marker.position.copy(point);
      marker.renderOrder = 12;
      marker.userData.cameraWaypointIndex = animatorCameraWaypointMeshes.length;
      const labelSprite = createAnimatorCameraWaypointLabelSprite(`🎥${animatorCameraWaypointMeshes.length + 1}`);
      labelSprite.position.set(0, 0, 0);
      marker.userData.labelSprite = labelSprite;
      const hitProxy = createAnimatorMarkerHitProxy(0.19);
      marker.userData.hitProxy = hitProxy;
      marker.add(hitProxy);
      marker.add(labelSprite);
      animatorCameraFlightGroup.add(marker);
      animatorCameraWaypointMeshes.push(marker);
    });
  }
  updateAnimatorCameraWaypointMaterials(animatorSelectedCameraWaypointIndex);
  applyAnimatorViewportDisplayState();
}

function onAnimatorTimelineClick(event) {
  const timelineBand = event.target.closest?.(".animator-timeline-band") ?? null;
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
const textbookTocScenePath = "content/scenes/archie/textbook_toc.json";
const animatorScenePath = ANIMATOR_SCENE_PATH;
const animatorSceneId = "animator";
const animatorPreviewSceneId = "animator_preview";
const animatorPreviewScenePath = "__animator_preview__";
const animatorDocsPath =
  "reference/priorities/app-animator/priorities.md";
const appMode = getAnimatorAppMode(globalThis.window);
const isStandaloneAnimatorApp = isStandaloneAnimatorAppMode(appMode);
const standaloneNavigatorHref = STANDALONE_ANIMATOR_NAVIGATOR_HREF;

function isAnimatorOverlaySceneId(sceneId = "") {
  return sceneId === animatorSceneId || sceneId === animatorPreviewSceneId;
}

function shouldHideLevelForAnimatorOverlayScene(sceneId = "") {
  return sceneId === animatorSceneId;
}
const markdownDocBadgeCharacterThreshold = 512;
const markdownOpenCharacterThreshold = 512;
const markdownGlowByteThreshold = 2048;
const cacheBustToken = Date.now().toString();
let appDirector = null;
const sceneIndexService = new SceneIndexService();
const periodicTableService = new PeriodicTableService();
const searchBackStack = [];
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

const animatorFrameState = {
  rotation: new THREE.Euler(0, 0, 0, "YXZ"),
  scale: 1,
};
let animatorFrameEditMode = false;
const animatorCameraState = {
  position: new THREE.Vector3(0, 2.6, 6.5),
  speed: 1,
};
const animatorCameraOrbitState = {
  target: new THREE.Vector3(),
  minDistance: 0.3,
  maxDistance: 2000,
  radius: 1,
  theta: 0,
  phi: Math.PI / 2,
};
const animatorCameraFlightState = {
  waypoints: [],
  poiMode: "origin",
  preview: false,
  savedPosition: new THREE.Vector3(),
  savedTarget: new THREE.Vector3(),
};
let animatorSelectedCameraWaypointIndex = null;
const animatorDragState = {
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
let animatorRenderer = null;
let animatorScene = null;
let animatorCamera = null;
let animatorFrameGroup = null;
let animatorViewportGroup = null;
let animatorPathLine = null;
let animatorPathGeometry = null;
let animatorBackgroundPathLines = [];
let animatorBackgroundPathMarkers = [];
let animatorPointMeshes = [];
let animatorPointGeometry = null;
let animatorPointMaterial = null;
let animatorPointMaterialActive = null;
let animatorRaycaster = null;
let animatorNeedsResize = false;
let animatorCameraFlightGroup = null;
let animatorCameraFlightLine = null;
let animatorCameraFlightGeometry = null;
let animatorCameraWaypointMeshes = [];
let animatorCameraWaypointGeometry = null;
let animatorCameraWaypointMaterial = null;
let animatorAssemblyMeshes = [];
let animatorMemberHandleMeshes = [];
let animatorPersonalityHandleMeshes = [];
let animatorSubassemblyHandleMeshes = [];
let animatorAssemblyWorldCenters = new Map();
let animatorShellMeshes = [];
let animatorEnvelopeMeshes = [];
let animatorFieldShellMeshes = [];
let animatorOrbitTraceLines = [];
let animatorHistoryTraceLines = [];
let animatorPathHistoryLineSegments = null;
let animatorPathHistoryDelayedHits = [];
let animatorDelayedHitGroups = [];
let animatorTransferLines = [];
let animatorAxisGuideLines = [];
let animatorOrbitParticleMeshes = [];
let animatorMemberLabelSprites = [];
let animatorGraphicOverlayGroups = [];
let animatorGraphicOverlayHandleMeshes = [];
let animatorViewportMediaOverlayElements = new Map();
let animatorDocumentCameraPathLine = null;
let animatorDocumentCameraWaypointMeshes = [];
let animatorDocumentCameraShotMesh = null;
let animatorDocumentCameraTargetMesh = null;
let animatorDocumentCameraLookLine = null;
let animatorCurrentViewportFramingState = null;
const animatorPlaybackTimelineRuntime = createAnimatorPlaybackTimelineRuntime({
  THREE,
  documentLike: document,
  clampFn: clamp,
  formatTimeLabel: formatAnimatorTimeLabel,
  getSceneTimeWindow: getAnimatorSceneTimeWindow,
  getTimelineFraction: getAnimatorTimelineFraction,
  getGraphicEnd: getAnimatorGraphicEnd,
  getGraphicOverlayLabel: getAnimatorGraphicOverlayLabel,
  getMediaOverlayLabel: getAnimatorMediaOverlayLabel,
  getGraphicTimelineOverlays: (...args) => getAnimatorGraphicTimelineOverlays(...args),
  getViewportMediaTimelineOverlays: (...args) => getAnimatorViewportMediaTimelineOverlays(...args),
  setTransportButtonIcon: (...args) => setAnimatorTransportButtonIcon(...args),
  updateAnimatedViewport: (...args) => updateAnimatorAnimatedViewport(...args),
  applyViewportDisplayState: () => applyAnimatorViewportDisplayState(),
  getCurrentDocument: () => animatorCurrentDocument,
  getPlaybackState: () => animatorPlaybackState,
  getEditorPreviewState: () => animatorEditorPreviewState,
  getViewportModeState: () => animatorViewportModeState,
  clearTimelineLayer: (...args) => clearAnimatorTimelineLayer(...args),
  createTimelineBand: (...args) => createAnimatorTimelineBand(...args),
  dom: {
    viewDesignButton: animatorViewDesignButton,
    viewAuthoredButton: animatorViewAuthoredButton,
    viewPlanarButton: animatorViewPlanarButton,
    markerJumpSelect: animatorMarkerJumpSelect,
    markerPrevButton: animatorMarkerPrevButton,
    markerNextButton: animatorMarkerNextButton,
    timelineTrack: animatorTimelineTrack,
    timelineWarps: animatorTimelineWarps,
    timelinePauses: animatorTimelinePauses,
    timelineMarkers: animatorTimelineMarkers,
    timelinePlayhead: animatorTimelinePlayhead,
    playheadScrubInput: animatorPlayheadScrubInput,
    timelineSummary: animatorTimelineSummary,
    playToggleButton: animatorPlayToggleButton,
  },
});
const {
  renderAnimatorTimeline,
  updateAnimatorTimelinePlayhead,
  clearAnimatorEditorPreviewState,
  updateAnimatorViewportModeButtons,
  setAnimatorViewportCameraSource,
  setAnimatorViewportProjection,
  setAnimatorPlaybackPlayhead,
  startAnimatorPlayback,
  toggleAnimatorPlayback,
  restartAnimatorPlayback,
  jumpToAnimatorMarker,
  jumpAnimatorMarkerByOffset,
  scrubAnimatorPlayback,
  updateAnimatorPlaybackState,
  syncAnimatorMarkerNavigation,
  getAnimatorSortedMarkers,
} = animatorPlaybackTimelineRuntime;
const animatorViewportRenderRuntime = createAnimatorViewportRenderRuntime({
  THREE,
  clampFn: clamp,
  readNumberInput,
  formatScaleLabel,
  getEffectiveFrameScale: () => getAnimatorEffectiveFrameScale(),
  getOrbitTargetWorld: () => getAnimatorOrbitTargetWorld(),
  updatePathMarkerScales: () => updateAnimatorPathMarkerScales(),
  updatePathPointInfoPill: () => updateAnimatorPathPointInfoPill(),
  hidePathPointInfoPill: () => hideAnimatorPathPointInfoPill(),
  updateTimelinePlayhead: (...args) => updateAnimatorTimelinePlayhead(...args),
  updateAnimatedViewport: (...args) => updateAnimatorAnimatedViewport(...args),
  updatePlaybackState: (...args) => updateAnimatorPlaybackState(...args),
  getRenderer: () => animatorRenderer,
  getScene: () => animatorScene,
  getCanvas: () => animatorCanvas,
  getCamera: () => animatorCamera,
  getOverlay: () => animatorOverlay,
  getFrameGroup: () => animatorFrameGroup,
  getFrameState: () => animatorFrameState,
  getCameraState: () => animatorCameraState,
  getCameraOrbitState: () => animatorCameraOrbitState,
  getCameraFlightState: () => animatorCameraFlightState,
  getCurrentDocument: () => animatorCurrentDocument,
  getNeedsResize: () => animatorNeedsResize,
  setNeedsResize: (value) => {
    animatorNeedsResize = value;
  },
  dom: {
    frameScaleInput: animatorFrameScaleInput,
    frameScaleLabel: animatorFrameScaleLabel,
    cameraSpeedInput: animatorCameraSpeedInput,
    cameraSpeedLabel: animatorCameraSpeedLabel,
  },
});
const {
  resizeAnimatorCanvas,
  updateAnimatorFrame,
  applyAnimatorFrameScaleInput,
  updateAnimatorCamera,
  applyAnimatorCameraSpeedInput,
  renderAnimatorCanvas,
} = animatorViewportRenderRuntime;
const animatorPointerInteractionRuntime = createAnimatorPointerInteractionRuntime({
  THREE,
  clampFn: clamp,
  vectorFromTriplet,
  normalizeAssemblyPathPoints: normalizeAnimatorAssemblyPathPoints,
  normalizeMemberPosition: normalizeAnimatorMemberPosition,
  isBareArchitrinoAssembly: isAnimatorBareArchitrinoAssembly,
  getAssemblySubassemblyIndex: getAnimatorAssemblySubassemblyIndex,
  setAssemblyMemberPosition: setAnimatorAssemblyMemberPosition,
  setSubassemblyPosition: setAnimatorSubassemblyPosition,
  resolveGraphicTargetPosition: (...args) => resolveAnimatorGraphicTargetPosition(...args),
  getCanvas: () => animatorCanvas,
  getCamera: () => animatorCamera,
  getRaycaster: () => animatorRaycaster,
  getFrameGroup: () => animatorFrameGroup,
  getDragState: () => animatorDragState,
  getAssemblyWorldCenters: () => animatorAssemblyWorldCenters,
  getCurrentDocument: () => animatorCurrentDocument,
  getPathState: () => animatorPathState,
  getFrameEditMode: () => animatorFrameEditMode,
  getFrameState: () => animatorFrameState,
  getCameraState: () => animatorCameraState,
  getCameraOrbitState: () => animatorCameraOrbitState,
  getCameraFlightState: () => animatorCameraFlightState,
  getSelectedCameraWaypointIndex: () => animatorSelectedCameraWaypointIndex,
  setSelectedCameraWaypointIndex: (value) => {
    animatorSelectedCameraWaypointIndex = value;
  },
  getAssemblyDraftsState: getAnimatorAssemblyDraftsState,
  getAssemblyDraftById: getAnimatorAssemblyDraftById,
  getAssemblyDraftIndexById: getAnimatorAssemblyDraftIndexById,
  updateAssemblyDraftByIdState: updateAnimatorAssemblyDraftByIdState,
  getGraphicOverlayDraftById: getAnimatorGraphicOverlayDraftById,
  updateGraphicOverlayDraftByIdState: updateAnimatorGraphicOverlayDraftByIdState,
  getSelectedAssemblyIdState: getAnimatorSelectedAssemblyIdState,
  getSelectedPointIndexState: getAnimatorSelectedPointIndexState,
  setSelectedPointIndexState: setAnimatorSelectedPointIndexState,
  mutatePathStateState: mutateAnimatorPathStateState,
  updatePathPointAtState: updateAnimatorPathPointAtState,
  rebuildControlPoints: () => rebuildAnimatorControlPoints(),
  updatePathGeometry: () => updateAnimatorPathGeometry(),
  updatePointMaterials: (...args) => updateAnimatorPointMaterials(...args),
  updateCameraWaypointMaterials: (...args) => updateAnimatorCameraWaypointMaterials(...args),
  updateCameraFlightDisplay: () => updateAnimatorCameraFlightDisplay(),
  stopCameraFlightPreview: () => stopAnimatorCameraFlightPreview(),
  updateCamera: () => updateAnimatorCamera(),
  updateFrame: () => updateAnimatorFrame(),
  renderJsonPreview: () => renderAnimatorJsonPreview(),
  renderAssemblyEditor: () => renderAnimatorAssemblyEditor(),
  setSelectedAssembly: (...args) => setAnimatorSelectedAssembly(...args),
  clearSelectedPoint: (...args) => clearAnimatorSelectedPoint(...args),
  hideHoverTooltip,
  clearAssemblyHoverTooltipState: () => clearAnimatorAssemblyHoverTooltipState(),
  updateAssemblyHoverTooltip: (...args) => updateAnimatorAssemblyHoverTooltip(...args),
  closeAssemblyMenu: () => closeAnimatorAssemblyMenu(),
  openAssemblyPropertiesMenuAt: (...args) => openAnimatorAssemblyPropertiesMenuAt(...args),
  openPersonalitySlotMenuAt: (...args) => openAnimatorPersonalitySlotMenuAt(...args),
  openTimelineMenuAt: (...args) => openAnimatorTimelineMenuAt(...args),
  openPathPointMenuAt: (...args) => openAnimatorPathPointMenuAt(...args),
  openMemberMenuAt: (...args) => openAnimatorMemberMenuAt(...args),
  openSubassemblyMenuAt: (...args) => openAnimatorSubassemblyMenuAt(...args),
  openAssemblyTemplateMenuAt: (...args) => openAnimatorAssemblyTemplateMenuAt(...args),
  openTimelineSummaryMenuAt: (...args) => openAnimatorTimelineSummaryMenuAt(...args),
  getTimelineTimeAtClientX: (...args) => getAnimatorTimelineTimeAtClientX(...args),
  getTimelineTrack: () => animatorTimelineTrack,
  resolveIndexedHit: (...args) => resolveAnimatorIndexedHit(...args),
  getPointerNdc: (...args) => getAnimatorPointerNdc(...args),
  resolveAssemblyHit: (...args) => resolveAnimatorAssemblyHit(...args),
  resolveMemberHandleHit: (...args) => resolveAnimatorMemberHandleHit(...args),
  resolveSubassemblyHandleHit: (...args) => resolveAnimatorSubassemblyHandleHit(...args),
  resolveGraphicOverlayHit: (...args) => resolveAnimatorGraphicOverlayHit(...args),
  resolvePersonalityHandleHit: (...args) => resolveAnimatorPersonalityHandleHit(...args),
  resolveAssemblyIdHit: (...args) => resolveAnimatorAssemblyIdHit(...args),
  findShellSurfaceHit: (...args) => findAnimatorShellSurfaceHit(...args),
  shouldPreferCenterMarker: (...args) => shouldPreferAnimatorCenterMarker(...args),
  getAssemblyMeshes: () => animatorAssemblyMeshes,
  getPointMeshes: () => animatorPointMeshes,
  getMemberHandleMeshes: () => animatorMemberHandleMeshes,
  getPersonalityHandleMeshes: () => animatorPersonalityHandleMeshes,
  getSubassemblyHandleMeshes: () => animatorSubassemblyHandleMeshes,
  getGraphicOverlayHandleMeshes: () => animatorGraphicOverlayHandleMeshes,
  getShellMeshes: () => animatorShellMeshes,
  getOrbitParticleMeshes: () => animatorOrbitParticleMeshes,
  getCameraWaypointMeshes: () => animatorCameraWaypointMeshes,
});
const {
  onAnimatorPointerDown,
  onAnimatorContextMenu,
  onAnimatorTimelineContextMenu,
  onAnimatorTimelineSummaryContextMenu,
  onAnimatorPointerMove,
  onAnimatorPointerUp,
  onAnimatorWheel,
} = animatorPointerInteractionRuntime;
const animatorCanvasBootstrapRuntime = createAnimatorCanvasBootstrapRuntime({
  THREE,
  windowLike: globalThis.window,
  wireCanvasUiListeners: wireAnimatorCanvasUiListeners,
  dom: {
    animatorCanvas,
    sceneButton: animatorSceneButton,
    saveButton: animatorSaveButton,
    cameraPoiSelect: animatorCameraPoiSelect,
    assemblyAddButton: animatorAssemblyAddButton,
    hudViewportToggleBindings: animatorHudViewportToggleBindings,
    timelineTrack: animatorTimelineTrack,
    timelineSummary: animatorTimelineSummary,
    assemblyMenu: animatorAssemblyMenu,
    overlay: animatorOverlay,
    playToggleButton: animatorPlayToggleButton,
    playResetButton: animatorPlayResetButton,
    sceneIdInput: animatorSceneIdInput,
  },
  getRenderer: () => animatorRenderer,
  setRenderer: (value) => {
    animatorRenderer = value;
  },
  setScene: (value) => {
    animatorScene = value;
  },
  setCamera: (value) => {
    animatorCamera = value;
  },
  setFrameGroup: (value) => {
    animatorFrameGroup = value;
  },
  setViewportGroup: (value) => {
    animatorViewportGroup = value;
  },
  setPathGeometry: (value) => {
    animatorPathGeometry = value;
  },
  setPathLine: (value) => {
    animatorPathLine = value;
  },
  setPointGeometry: (value) => {
    animatorPointGeometry = value;
  },
  setPointMaterial: (value) => {
    animatorPointMaterial = value;
  },
  setPointMaterialActive: (value) => {
    animatorPointMaterialActive = value;
  },
  setRaycaster: (value) => {
    animatorRaycaster = value;
  },
  getCameraFlightState: () => animatorCameraFlightState,
  getAssemblyDraftsState: getAnimatorAssemblyDraftsState,
  operations: {
    setFrameDefaults: () => setAnimatorFrameDefaults(),
    setCameraDefaults: () => setAnimatorCameraDefaults(),
    setTransportButtonIcon: (...args) => setAnimatorTransportButtonIcon(...args),
    getMenuAnchorClientPosition: (...args) => getAnimatorMenuAnchorClientPosition(...args),
    openSceneMenuAt: (...args) => openAnimatorSceneMenuAt(...args),
    openLibraryMenuAt: (...args) => openAnimatorLibraryMenuAt(...args),
    updateCameraPoiStatus: () => updateAnimatorCameraPoiStatus(),
    syncCameraRadiusInput: () => syncAnimatorCameraRadiusInput(),
    ensureAssemblyDrafts: () => ensureAnimatorAssemblyDrafts(),
    appendAssemblyDraftState: (...args) => appendAnimatorAssemblyDraftState(...args),
    createDefaultAssemblyDraft: (...args) => createDefaultAnimatorAssemblyDraft(...args),
    renderAssemblyEditor: () => renderAnimatorAssemblyEditor(),
    renderJsonPreview: () => renderAnimatorJsonPreview(),
    toggleViewportDisplayFlag: (...args) => toggleAnimatorViewportDisplayFlag(...args),
    applyViewportDisplayState: () => applyAnimatorViewportDisplayState(),
    onPointerDown: (...args) => onAnimatorPointerDown(...args),
    onPointerMove: (...args) => onAnimatorPointerMove(...args),
    onPointerUp: (...args) => onAnimatorPointerUp(...args),
    onWheel: (...args) => onAnimatorWheel(...args),
    onContextMenu: (...args) => onAnimatorContextMenu(...args),
    onTimelineContextMenu: (...args) => onAnimatorTimelineContextMenu(...args),
    onTimelineClick: (...args) => onAnimatorTimelineClick(...args),
    onTimelineSummaryContextMenu: (...args) => onAnimatorTimelineSummaryContextMenu(...args),
    closeAssemblyMenu: () => closeAnimatorAssemblyMenu(),
    openTimelineSummaryMenuAt: (...args) => openAnimatorTimelineSummaryMenuAt(...args),
    addBuiltInAssembly: (...args) => addBuiltInAnimatorAssembly(...args),
    loadPathStateFromSelectedAssembly: () => loadAnimatorPathStateFromSelectedAssembly(),
    refreshLibraryUi: (...args) => refreshAnimatorLibraryUi(...args),
    updateCameraFlightDisplay: () => updateAnimatorCameraFlightDisplay(),
    updateWaypointCount: () => updateAnimatorWaypointCount(),
    updateFrame: () => updateAnimatorFrame(),
    updateCamera: () => updateAnimatorCamera(),
    resizeCanvas: () => resizeAnimatorCanvas(),
  },
});
const { initAnimatorCanvas } = animatorCanvasBootstrapRuntime;
const animatorEditorPreviewState = {
  renderMotionTimeOverride: null,
  renderMotionTimePlayhead: null,
  renderMotionProgressOverride: null,
  renderMotionProgressPlayhead: null,
};
const animatorViewportModeState = {
  cameraSource: "design",
  projection: "3d",
};
const animatorPlaybackState = {
  playing: false,
  playheadSeconds: 0,
  lastTickMs: 0,
};
let animatorSupplementalDraftState = {};
const defaultAnimatorWorkerSimulationConfig = Object.freeze({
  steps: 120,
  dt: 0.01,
  stride: 6,
  particles: 2,
  radius: 1,
  radialSpeed: 0,
  tangentialSpeed: 0.08,
  kappa: 0.002,
  shellK: 0,
  rootHaltPolicy: "partner",
});
const animatorSimulationWorkerClient = createAnimatorSimulationWorkerClient({
  workerUrl: new URL("../animator/AnimatorSimulationWorker.js", import.meta.url),
});
let animatorSimulationWorkerRunActive = false;
const animatorRunSimulationButtonLabel = animatorRunSimulationButton?.textContent ?? "Run Solver";
const animatorSimulationRunButtonLabel = animatorSimulationRunButton?.textContent ?? "Run Solver";

function setAnimatorSimulationWorkerRunActive(isActive) {
  animatorSimulationWorkerRunActive = Boolean(isActive);
  [
    [animatorRunSimulationButton, animatorRunSimulationButtonLabel],
    [animatorSimulationRunButton, animatorSimulationRunButtonLabel],
  ].forEach(([button, label]) => {
    if (!button) {
      return;
    }
    button.disabled = animatorSimulationWorkerRunActive;
    button.setAttribute("aria-busy", animatorSimulationWorkerRunActive ? "true" : "false");
    button.textContent = animatorSimulationWorkerRunActive ? "Running..." : label;
  });
}

const animatorDocumentWorkspaceRuntime = createAnimatorDocumentWorkspaceRuntime({
  documentLike: document,
  storage: globalThis.window?.localStorage ?? null,
  storageKey: "architrino.animator.library.v1",
  dom: {
    sceneIdInput: animatorSceneIdInput,
    sceneNameInput: animatorSceneNameInput,
    sceneDurationInput: animatorSceneDurationInput,
    sceneLoopInput: animatorSceneLoopInput,
    markerListInput: animatorMarkerListInput,
    pauseListInput: animatorPauseListInput,
    warpListInput: animatorWarpListInput,
    transferListInput: animatorTransferListInput,
    librarySelect: animatorLibrarySelect,
    libraryLoadButton: animatorLibraryLoadButton,
    libraryDeleteButton: animatorLibraryDeleteButton,
    libraryStatus: animatorLibraryStatus,
    jsonPreview: animatorJsonPreview,
    frameScaleInput: animatorFrameScaleInput,
    frameScaleLabel: animatorFrameScaleLabel,
    cameraSpeedInput: animatorCameraSpeedInput,
    cameraSpeedLabel: animatorCameraSpeedLabel,
    cameraPoiSelect: animatorCameraPoiSelect,
  },
  state: {
    pathState: animatorPathState,
    frameState: animatorFrameState,
    cameraState: animatorCameraState,
    cameraOrbitState: animatorCameraOrbitState,
    cameraFlightState: animatorCameraFlightState,
    playbackState: animatorPlaybackState,
    palette: animatorPalette,
  },
  helpers: {
    sanitizeSceneId: sanitizeAnimatorId,
    normalizeAssemblyDraft: normalizeAnimatorAssemblyDraft,
    normalizeAssemblyPathPoints: normalizeAnimatorAssemblyPathPoints,
    formatTransferList: formatAnimatorTransferList,
    normalizeGraphicOverlayList: normalizeAnimatorGraphicOverlayList,
    parseTransfers: parseAnimatorTransfers,
    readTimingState: readAnimatorTimingState,
    updateTimingDiagnostics: updateAnimatorTimingDiagnostics,
    formatTimingStatus: formatAnimatorTimingStatus,
    formatScaleLabel,
    clampFn: clamp,
    vectorFromTriplet,
    getTransferListRaw: getAnimatorTransferListRaw,
  },
  operations: {
    ensureAssemblyDrafts: ensureAnimatorAssemblyDrafts,
    persistPathStateToSelectedAssembly: persistAnimatorPathStateToSelectedAssembly,
    renderAssemblyEditor: renderAnimatorAssemblyEditor,
    validateSelectedAssemblyId: validateAnimatorSelectedAssemblyId,
    setSelectedAssembly: setAnimatorSelectedAssembly,
    rebuildControlPoints: rebuildAnimatorControlPoints,
    updatePathGeometry: updateAnimatorPathGeometry,
    updatePointMaterials: updateAnimatorPointMaterials,
    updateFrame: updateAnimatorFrame,
    syncCameraRadiusInput: syncAnimatorCameraRadiusInput,
    stopCameraFlightPreview: stopAnimatorCameraFlightPreview,
    updateCameraFlightDisplay: updateAnimatorCameraFlightDisplay,
    updateWaypointCount: updateAnimatorWaypointCount,
    updateCameraPoiStatus: updateAnimatorCameraPoiStatus,
    updateCamera: updateAnimatorCamera,
    updateViewportFromDocument: updateAnimatorViewportFromDocument,
    renderTimeline: renderAnimatorTimeline,
    updateTimelinePlayhead: updateAnimatorTimelinePlayhead,
    setStatus: setAnimatorStatus,
  },
  accessors: {
    getAssemblyDraftsState: getAnimatorAssemblyDraftsState,
    setAssemblyDraftsState: setAnimatorAssemblyDraftsState,
    updateAssemblyDraftByIdState: updateAnimatorAssemblyDraftByIdState,
    getGraphicOverlayDraftsState: getAnimatorGraphicOverlayDraftsState,
    setGraphicOverlayDraftsState: setAnimatorGraphicOverlayDraftsState,
    getSelectedPointIndexState: getAnimatorSelectedPointIndexState,
    setSelectedPointIndexState: setAnimatorSelectedPointIndexState,
    getSelectedAssemblyIdState: getAnimatorSelectedAssemblyIdState,
    setTransferListRawStateValue: setAnimatorTransferListRawStateValue,
    getSupplementalDraftState: () => animatorSupplementalDraftState,
    setSupplementalDraftState: (nextValue) => {
      animatorSupplementalDraftState =
        nextValue && typeof nextValue === "object" ? { ...nextValue } : {};
    },
    setCurrentDocument: (documentData) => {
      animatorCurrentDocument = documentData;
      updateAnimatorMotionSourcePill(documentData);
      renderAnimatorSimulationAuthoringPanel(documentData);
    },
  },
});

const {
  readAnimatorDraftState,
  getAnimatorLibraryEntries,
  writeAnimatorLibraryEntries,
  getAnimatorSortedLibraryEntries,
  refreshAnimatorLibraryUi,
  applyAnimatorDraftState,
  buildAnimatorDocumentData,
  buildAnimatorPreviewData,
  saveAnimatorSceneToLibrary,
  loadAnimatorSceneFromLibrary,
  clearAnimatorScene,
  deleteAnimatorSceneFromLibrary,
  renderAnimatorJsonPreview,
} = animatorDocumentWorkspaceRuntime;

function setAnimatorSimulationInputValue(input, value) {
  if (!input) {
    return;
  }
  input.value = String(value ?? "");
}

function setAnimatorSimulationSelectValue(select, value) {
  if (!select) {
    return;
  }
  const nextValue = String(value ?? "");
  const hasOption = Array.from(select.options ?? []).some((option) => option.value === nextValue);
  select.value = hasOption ? nextValue : select.options?.[0]?.value ?? "";
}

function readAnimatorSimulationAuthoringDraftFromDom() {
  return {
    duration: animatorSimulationDurationInput?.value,
    loop: animatorSimulationLoopInput?.checked === true,
    steps: animatorSimulationStepsInput?.value,
    dt: animatorSimulationDtInput?.value,
    stride: animatorSimulationStrideInput?.value,
    particles: animatorSimulationParticlesInput?.value,
    radius: animatorSimulationRadiusInput?.value,
    radialSpeed: animatorSimulationRadialSpeedInput?.value,
    tangentialSpeed: animatorSimulationTangentialSpeedInput?.value,
    driftX: animatorSimulationDriftXInput?.value,
    driftY: animatorSimulationDriftYInput?.value,
    cf: animatorSimulationFieldSpeedInput?.value,
    kappa: animatorSimulationKappaInput?.value,
    historyMode: animatorSimulationHistoryModeSelect?.value,
    rootHaltPolicy: animatorSimulationRootHaltPolicySelect?.value,
    claimLevel: animatorSimulationClaimLevelInput?.value,
    datasetId: animatorSimulationDatasetIdInput?.value,
  };
}

function renderAnimatorSimulationDiagnosticsRows(rows = []) {
  if (!animatorSimulationDiagnostics) {
    return;
  }
  animatorSimulationDiagnostics.replaceChildren();
  rows.forEach(([label, value]) => {
    const row = document.createElement("div");
    row.className = "animator-simulation-diagnostic-row";
    const labelElement = document.createElement("div");
    labelElement.className = "animator-simulation-diagnostic-label";
    labelElement.textContent = label;
    const valueElement = document.createElement("div");
    valueElement.className = "animator-simulation-diagnostic-value";
    valueElement.textContent = value;
    row.append(labelElement, valueElement);
    animatorSimulationDiagnostics.appendChild(row);
  });
}

function renderAnimatorSimulationAuthoringPanel(documentData = animatorCurrentDocument) {
  if (!animatorSimulationPanel || !documentData) {
    return;
  }
  const draft = createAnimatorSimulationAuthoringDraft(documentData);
  setAnimatorSimulationSelectValue(animatorSimulationModeSelect, "planar-2d");
  setAnimatorSimulationInputValue(animatorSimulationDurationInput, draft.duration);
  if (animatorSimulationLoopInput) {
    animatorSimulationLoopInput.checked = draft.loop;
  }
  setAnimatorSimulationInputValue(animatorSimulationDatasetIdInput, draft.datasetId);
  setAnimatorSimulationInputValue(animatorSimulationStepsInput, draft.steps);
  setAnimatorSimulationInputValue(animatorSimulationDtInput, draft.dt);
  setAnimatorSimulationInputValue(animatorSimulationStrideInput, draft.stride);
  setAnimatorSimulationInputValue(animatorSimulationFieldSpeedInput, draft.cf);
  setAnimatorSimulationInputValue(animatorSimulationKappaInput, draft.kappa);
  setAnimatorSimulationInputValue(animatorSimulationClaimLevelInput, draft.claimLevel);
  setAnimatorSimulationSelectValue(animatorSimulationHistoryModeSelect, draft.historyMode);
  setAnimatorSimulationSelectValue(animatorSimulationRootHaltPolicySelect, draft.rootHaltPolicy);
  setAnimatorSimulationInputValue(animatorSimulationParticlesInput, draft.particles);
  setAnimatorSimulationInputValue(animatorSimulationRadiusInput, draft.radius);
  setAnimatorSimulationInputValue(animatorSimulationRadialSpeedInput, draft.radialSpeed);
  setAnimatorSimulationInputValue(animatorSimulationTangentialSpeedInput, draft.tangentialSpeed);
  setAnimatorSimulationInputValue(animatorSimulationDriftXInput, draft.driftX);
  setAnimatorSimulationInputValue(animatorSimulationDriftYInput, draft.driftY);

  if (animatorSceneDurationInput) {
    animatorSceneDurationInput.value = String(draft.duration);
  }
  if (animatorSceneLoopInput) {
    animatorSceneLoopInput.checked = draft.loop;
  }

  const summary = summarizeAnimatorSimulationAuthoringDataset(documentData);
  const datasetRow = summary.rows.find(([label]) => label === "Dataset");
  const haltRow = summary.rows.find(([label]) => label === "Halt" || label === "Last Run");
  if (animatorSimulationCacheStatus) {
    animatorSimulationCacheStatus.textContent = summary.hasDataset
      ? `Dataset: ${datasetRow?.[1] ?? "loaded"} (${haltRow?.[1] ?? "unknown"})`
      : `Dataset: ${haltRow?.[1] ?? "not run"}`;
  }
  renderAnimatorSimulationDiagnosticsRows(summary.rows);
}

function applyAnimatorSimulationAuthoringDraftFromDom(options = {}) {
  const baseDocument =
    options.baseDocument ??
    animatorCurrentDocument ??
    buildAnimatorDocumentData(readAnimatorDraftState());
  if (!baseDocument) {
    return null;
  }
  const nextDocument = normalizeAnimatorSceneDocument(
    applyAnimatorSimulationAuthoringDraftToDocument(
      baseDocument,
      readAnimatorSimulationAuthoringDraftFromDom()
    )
  );
  updateAnimatorViewportFromDocument(nextDocument);
  if (animatorJsonPreview) {
    animatorJsonPreview.textContent = JSON.stringify(nextDocument, null, 2);
  }
  if (options.status !== false) {
    setAnimatorStatus("Simulation settings applied.");
  }
  return nextDocument;
}

function getAnimatorWorkerSimulationConfig(documentData = animatorCurrentDocument, inputConfig = null) {
  if (inputConfig && typeof inputConfig === "object") {
    return { ...inputConfig };
  }
  const metadataConfig =
    documentData?.metadata?.simulationWorker?.config ??
    documentData?.metadata?.simulationRun?.config;
  if (metadataConfig && typeof metadataConfig === "object") {
    return { ...metadataConfig };
  }
  const timeWindow = getAnimatorSceneTimeWindow(documentData);
  const sceneDuration = Math.max(0, Number(timeWindow.end ?? 0) - Number(timeWindow.start ?? 0));
  const dt = Number(defaultAnimatorWorkerSimulationConfig.dt) || 0.01;
  const durationSteps = sceneDuration > 0 ? Math.ceil(sceneDuration / dt) : 0;
  return {
    ...defaultAnimatorWorkerSimulationConfig,
    steps: Math.max(defaultAnimatorWorkerSimulationConfig.steps, durationSteps),
  };
}

function getAnimatorWorkerDatasetOptions(documentData = animatorCurrentDocument, options = {}) {
  const sceneId = String(documentData?.scene?.id ?? "animator_scene").trim() || "animator_scene";
  const metadataOptions =
    documentData?.metadata?.simulationWorker?.datasetOptions ??
    documentData?.metadata?.simulationRun?.datasetOptions;
  return {
    id: `${sceneId}_worker_dataset`,
    claimLevel: "solver-derived-diagnostic",
    ...(metadataOptions && typeof metadataOptions === "object" ? metadataOptions : {}),
    ...(options.datasetOptions && typeof options.datasetOptions === "object"
      ? options.datasetOptions
      : {}),
  };
}

async function runAnimatorSimulationWorkerFromCurrentDocument(inputConfig = null, options = {}) {
  const baseDocument =
    options.baseDocument ??
    animatorCurrentDocument ??
    buildAnimatorDocumentData(readAnimatorDraftState());
  const config = getAnimatorWorkerSimulationConfig(baseDocument, inputConfig);
  const datasetOptions = getAnimatorWorkerDatasetOptions(baseDocument, options);
  setAnimatorStatus("Running solver in worker...");
  const result = await animatorSimulationWorkerClient.run(config, { datasetOptions });
  const nextDocument = normalizeAnimatorSceneDocument(
    mergeAnimatorSimulationDatasetIntoDocument(baseDocument, result.dataset, {
      updateSceneTime: options.updateSceneTime === true,
    })
  );
  updateAnimatorViewportFromDocument(nextDocument);
  if (animatorJsonPreview) {
    animatorJsonPreview.textContent = JSON.stringify(nextDocument, null, 2);
  }
  const frameCount = Array.isArray(result.dataset?.frames) ? result.dataset.frames.length : 0;
  const status = result.dataset?.simulation?.halt?.status ?? "unknown";
  const byteLength = result.frameBufferSummary?.byteLength ?? 0;
  setAnimatorStatus(
    `Worker simulation ${status}; ${frameCount} frame(s), ${byteLength} typed-buffer byte(s).`
  );
  return {
    ...result,
    document: nextDocument,
  };
}

async function runAnimatorSimulationWorkerFromAuthoringPanel() {
  const baseDocument = applyAnimatorSimulationAuthoringDraftFromDom({ status: false });
  const payload = buildAnimatorSimulationAuthoringWorkerPayload(
    readAnimatorSimulationAuthoringDraftFromDom(),
    baseDocument
  );
  return runAnimatorSimulationWorkerFromCurrentDocument(payload.config, {
    baseDocument,
    datasetOptions: payload.datasetOptions,
  });
}

if (typeof window !== "undefined") {
  window.runAnimatorSimulationWorker = runAnimatorSimulationWorkerFromCurrentDocument;
}

function bindAnimatorSimulationRunButton(button) {
  if (!button || button.dataset.bound) {
    return;
  }
  button.addEventListener("click", async () => {
    if (animatorSimulationWorkerRunActive) {
      return;
    }
    setAnimatorSimulationWorkerRunActive(true);
    try {
      await runAnimatorSimulationWorkerFromAuthoringPanel();
    } catch (error) {
      console.error("animator worker simulation failed.", error);
      setAnimatorStatus(`Worker simulation failed: ${error?.message ?? error}`);
    } finally {
      setAnimatorSimulationWorkerRunActive(false);
    }
  });
  button.dataset.bound = "true";
}

bindAnimatorSimulationRunButton(animatorRunSimulationButton);
bindAnimatorSimulationRunButton(animatorSimulationRunButton);

if (animatorSimulationApplyButton && !animatorSimulationApplyButton.dataset.bound) {
  animatorSimulationApplyButton.addEventListener("click", () => {
    applyAnimatorSimulationAuthoringDraftFromDom();
  });
  animatorSimulationApplyButton.dataset.bound = "true";
}

if (animatorHudShellOpacityInput && !animatorHudShellOpacityInput.dataset.bound) {
  animatorHudShellOpacityInput.addEventListener("input", () => {
    animatorFieldShellOpacityScale = clamp(Number(animatorHudShellOpacityInput.value) || 0, 0, 1);
    updateAnimatorAnimatedViewport(animatorPlaybackState.playheadSeconds);
    applyAnimatorViewportDisplayState();
  });
  animatorHudShellOpacityInput.dataset.bound = "true";
}

if (animatorHudTrailOpacityInput && !animatorHudTrailOpacityInput.dataset.bound) {
  animatorHudTrailOpacityInput.addEventListener("input", () => {
    animatorTrailOpacityScale = clamp(Number(animatorHudTrailOpacityInput.value) || 0, 0, 1);
    updateAnimatorAnimatedViewport(animatorPlaybackState.playheadSeconds);
    applyAnimatorViewportDisplayState();
  });
  animatorHudTrailOpacityInput.dataset.bound = "true";
}

if (animatorHudTrailLifetimeInput && !animatorHudTrailLifetimeInput.dataset.bound) {
  animatorHudTrailLifetimeInput.addEventListener("input", () => {
    animatorTrailLifetimeSeconds = clamp(
      Number(animatorHudTrailLifetimeInput.value) || 0.25,
      0.25,
      60
    );
    updateAnimatorAnimatedViewport(animatorPlaybackState.playheadSeconds);
    applyAnimatorViewportDisplayState();
  });
  animatorHudTrailLifetimeInput.dataset.bound = "true";
}

const levels = new Map();
const navigationStack = [];
let currentLevel = null;
let sceneImageGalleryRuntime = null;
let hiddenImageGalleryLevel = null;

function levelHasImageGalleryItems(level) {
  return !!(
    level?.imageGallery &&
    Array.isArray(level.nodes) &&
    level.nodes.some((node) => typeof node?.data?.galleryImage === "string" && node.data.galleryImage.trim())
  );
}

function setImageGalleryLevelVisible(level, visible) {
  if (!level?.group) {
    return;
  }
  level.group.visible = visible;
  level.nodes?.forEach((node) => {
    if (node.labelObject?.element) {
      node.labelObject.element.style.visibility = visible ? "" : "hidden";
    }
    if (node.chapterLabelObject?.element) {
      node.chapterLabelObject.element.style.visibility = visible ? "" : "hidden";
    }
  });
  if (level.centerContextSphere?.labelObject?.element) {
    level.centerContextSphere.labelObject.element.style.visibility = visible ? "" : "hidden";
  }
}

function hideImageGalleryTransitionLevel(level) {
  if (levelHasImageGalleryItems(level)) {
    setImageGalleryLevelVisible(level, false);
  }
}

function syncSceneImageGalleryLevel(level = currentLevel) {
  if (hiddenImageGalleryLevel && hiddenImageGalleryLevel !== level) {
    setImageGalleryLevelVisible(hiddenImageGalleryLevel, true);
    hiddenImageGalleryLevel = null;
  }
  sceneImageGalleryRuntime?.syncLevel(level);
  if (levelHasImageGalleryItems(level)) {
    setImageGalleryLevelVisible(level, false);
    hiddenImageGalleryLevel = level;
  } else if (level?.group) {
    setImageGalleryLevelVisible(level, true);
  }
}

function hideSceneImageGallery(options = {}) {
  const restoreHiddenLevel = options.restoreHiddenLevel !== false;
  if (hiddenImageGalleryLevel) {
    if (restoreHiddenLevel) {
      setImageGalleryLevelVisible(hiddenImageGalleryLevel, true);
    }
    hiddenImageGalleryLevel = null;
  }
  sceneImageGalleryRuntime?.syncLevel(null);
}
let textbookTocReturnState = null;
const sceneStateHashService = createSceneStateHashService({
  rootScenePath,
  getNavigationStack: () => navigationStack,
});
let pendingSceneHashHistoryMode = "replace";

const standardRingMaxCount = 14;

function getRingStartAngle(count) {
  return ringLayoutDefaults.startAngle;
}

function maxRingNodeRadius(ringRadius, count) {
  if (!Number.isFinite(ringRadius) || count <= 1) {
    return Infinity;
  }
  const chord = 2 * ringRadius * Math.sin(Math.PI / count);
  const guardBand = getRingGuardBand(chord);
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

function computeRingFit(frameRadius, count) {
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
    const guardBand = getRingGuardBand(haloDiameter);
    const requiredChord = haloDiameter + guardBand;
    const requiredAdjacentRadius = requiredChord / (2 * sinHalfStep);
    return Math.max(requiredAdjacentRadius, requiredChord);
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
    syncSceneImageGalleryLevel(level);
  },
  shouldCenterLevelInFrame: (level) => {
    return isCenteredRingLevel(level);
  },
  centerLevelInFrame: (level) => {
    const center = getLevelFrameCenter(level);
    worldGroup.position.set(-center.x, -center.y, 0);
  },
  fitLevelInFrame: (level) => {
    layoutLevelForViewport(level);
    fitCameraToLevel(level);
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
let hoveredSphereNodeId = null;
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

function getSphereHoverNodeId(node) {
  return node?.data?.id ?? node?.data?.name ?? null;
}

function setSphereHoverNode(node) {
  const nextId = getSphereHoverNodeId(node);
  if (nextId === hoveredSphereNodeId) {
    return;
  }
  hoveredSphereNodeId = nextId;
  setLevelHoverFocus(currentLevel, nextId);
}

function clearSphereHover() {
  setSphereHoverNode(null);
}

function getPointerSphereNode(clientX, clientY) {
  if (!currentLevel) {
    return null;
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
    return null;
  }
  const hit = intersections[0].object;
  return currentLevel.nodes.find((node) => node.mesh === hit) ?? null;
}

function closeDetailPanel() {
  clearSphereHover();
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
  hoverTooltip.classList.toggle("is-hud-tooltip", options.variant === "hud");
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
  hoverTooltip.classList.remove("is-hud-tooltip");
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

function isPeriodicTableLevel(level = currentLevel) {
  return isPeriodicTableScene(level) || isHydePeriodicLevel(level);
}

function showZoomToastIfNeeded() {
  if (!zoomToast || hasDismissedZoomToast()) {
    return;
  }
  if (isPeriodicTableLevel()) {
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
  markdownContent,
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
const fileSourceRuntime = createFileSourceRuntime({
  appendCacheBust,
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
  hydePeriodicArtwork.src = appendCacheBust("content/assets/images/nuclear/hyde-periodic-table-rsvg-friendly.svg");
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

const textbookTocNumberingService = createTextbookTocNumberingService({
  fetchImpl: (...args) => fetch(...args),
  appendCacheBust,
  normalizeMarkdownPath,
  normalizeMarkdownKey,
  logger: console,
});
const textbookTocNavigationService = createTextbookTocNavigationService({
  fetchImpl: (...args) => fetch(...args),
  appendCacheBust,
  normalizeMarkdownPath,
  normalizeMarkdownKey,
  logger: console,
});
const textbookPageNavigationRuntime = createTextbookPageNavigationRuntime({
  container: textbookPageNav,
  previousButton: textbookPagePrevButton,
  nextButton: textbookPageNextButton,
  navigationService: textbookTocNavigationService,
  getCurrentLevel: () => currentLevel,
  isTransitionActive: () => transitionState.active,
  navigateToPage: async (entry) => {
    if (!entry?.targetPath || transitionState.active) {
      return false;
    }
    await jumpToScene(entry.targetPath, { mode: "jump", startScale: 0.7, duration: 760 });
    return true;
  },
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
  resolveTextbookChapterLabel: textbookTocNumberingService.resolveNodeChapterLabel,
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

function areHistoryEntriesEqual(a, b) {
  return (
    a?.levelId === b?.levelId &&
    areNavigationStacksEqual(a?.navigationStack ?? [], b?.navigationStack ?? [])
  );
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

function requestSceneHashHistoryPush() {
  pendingSceneHashHistoryMode = "push";
}

function takeSceneHashHistoryMode() {
  const mode = pendingSceneHashHistoryMode;
  pendingSceneHashHistoryMode = "replace";
  return mode;
}

function recordBrowserBackHistory(options = {}) {
  if (options.historyTraversal) {
    return false;
  }
  const entry = captureCurrentHistoryEntry();
  if (!entry) {
    return false;
  }
  pushBrowserHistoryEntry(browserBackStack, entry);
  browserForwardStack.length = 0;
  requestSceneHashHistoryPush();
  return true;
}

function createHistoryEntryFromSceneState(sceneState) {
  const levelId = sceneState?.scenePath || rootScenePath;
  const navigationStack = cloneNavigationStackEntries(sceneState?.navigationStack);
  if (
    navigationStack.length === 0 &&
    sceneState?.parentLevelId &&
    sceneState?.parentFocusNodeId
  ) {
    navigationStack.push({
      levelId: sceneState.parentLevelId,
      focusNodeId: sceneState.parentFocusNodeId,
    });
  }
  return {
    levelId,
    navigationStack,
  };
}

function syncHistoryStacksForBrowserTraversal(targetEntry, direction) {
  const currentEntry = captureCurrentHistoryEntry();
  if (!targetEntry?.levelId || areHistoryEntriesEqual(currentEntry, targetEntry)) {
    return;
  }
  if (direction === "back") {
    pushBrowserHistoryEntry(browserForwardStack, currentEntry);
    while (browserBackStack.length > 0) {
      const poppedEntry = browserBackStack.pop();
      if (areHistoryEntriesEqual(poppedEntry, targetEntry)) {
        return;
      }
      pushBrowserHistoryEntry(browserForwardStack, poppedEntry);
    }
    return;
  }
  if (direction === "forward") {
    pushBrowserHistoryEntry(browserBackStack, currentEntry);
    while (browserForwardStack.length > 0) {
      const poppedEntry = browserForwardStack.pop();
      if (areHistoryEntriesEqual(poppedEntry, targetEntry)) {
        return;
      }
      pushBrowserHistoryEntry(browserBackStack, poppedEntry);
    }
    return;
  }
  browserBackStack.length = 0;
  browserForwardStack.length = 0;
}

async function resetToRootScene(options = {}) {
  if (transitionState.active) {
    return;
  }
  if (
    isStandaloneAnimatorApp &&
    navigateStandaloneAnimatorHome(globalThis.window?.location, standaloneNavigatorHref)
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
  syncSceneImageGalleryLevel(currentLevel);
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
  const directStandaloneAppHref = resolveStandaloneAppHrefForScene(
    scenePath,
    globalThis.window?.location?.href
  );
  if (directStandaloneAppHref) {
    globalThis.window?.location?.assign(directStandaloneAppHref);
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
  hideSceneImageGallery({ restoreHiddenLevel: false });
  const forceInstantAnimatorEntry = isAnimatorOverlaySceneId(config?.sceneId);
  const shouldHideLevelForAnimator = shouldHideLevelForAnimatorOverlayScene(config?.sceneId);
  if (options.mode === "instant" || forceInstantAnimatorEntry) {
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
    setLevelOpacity(level, shouldHideLevelForAnimator ? 0 : 1);
    setLevelLabelOpacity(level, 0);
    setLevelLinkOpacity(level, shouldHideLevelForAnimator ? 0 : 1);
    currentLevel = level;
    syncSceneImageGalleryLevel(currentLevel);
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
  hideImageGalleryTransitionLevel(nextLevel);
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

function getSafeViewportWorld(fitMode = "focus") {
  const aspect = window.innerWidth / window.innerHeight;
  const viewWidth = baseViewHeight * aspect;
  const worldPerPixel = viewWidth / Math.max(window.innerWidth, 1);
  if (fitMode === "viewport") {
    const safeWidthPx = Math.max(2, window.innerWidth - defaultRootLayoutMarginPx.x * 2);
    const safeHeightPx = Math.max(2, window.innerHeight - defaultRootLayoutMarginPx.y * 2);
    return {
      safeWidth: Math.max(2, safeWidthPx * worldPerPixel),
      safeHeight: Math.max(2, safeHeightPx * worldPerPixel),
    };
  }
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
    syncLevelCenterContext(level);
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
    syncLevelCenterContext(level);
    return;
  }

  if (useRootAutoLayout) {
    const baseRadius = Math.max(
      ...nodes.map((node) => node.data?.baseRadius ?? node.data?.radius ?? 0)
    );
    const { safeWidth, safeHeight } = getSafeViewportWorld();
    const safeRadius = Math.max(2, Math.min(safeWidth, safeHeight) / 2);
    const frameRadius = safeRadius;
    const ringFit = computeRingFit(frameRadius, nodes.length);
    const targetRadius = Math.max(0, ringFit.nodeRadius);
    const ringRadius = Math.max(0, ringFit.ringRadius);
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
    syncLevelCenterContext(level);
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
  const frameMargin = DEFAULT_SCENE_VIEWPORT_FIT_MARGIN;
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
  syncLevelCenterContext(level);
}

function hasOccupiedCenterNode(level, center) {
  if (!level?.nodes?.length) {
    return false;
  }
  return level.nodes.some((node) => {
    const distance = node.group.position.distanceTo(center);
    const radius = Math.max(0.05, getNodeBoundsRadius(node) * 0.3);
    return distance <= radius;
  });
}

function shouldShowCenterContext(level, center) {
  if (!level?.nodes?.length) {
    return false;
  }
  if (!isCenteredRingLevel(level)) {
    return false;
  }
  if (!shouldAllowCenterContext(level)) {
    return false;
  }
  if (level.ringLayout?.centerMode === "node") {
    return false;
  }
  return !hasOccupiedCenterNode(level, center);
}

function resolveCenterContextRadius(level, center) {
  const targetRadius = resolveSharedSceneSphereRadius(level.nodes);
  if (!Number.isFinite(targetRadius) || targetRadius <= 0) {
    return 0;
  }
  const nearestClearance = level.nodes.reduce((nearest, node) => {
    const distance = node.group.position.distanceTo(center);
    return Math.min(nearest, distance - getNodeBoundsRadius(node));
  }, Infinity);
  if (!Number.isFinite(nearestClearance)) {
    return targetRadius;
  }
  const centerBoundsRadius = targetRadius * ringLayoutDefaults.haloScale;
  const guardBand =
    centerBoundsRadius * 2 * Math.max(0, ringLayoutDefaults.guardBandRatio ?? 0.08);
  const clearanceSlack = Math.max(targetRadius * 0.02, guardBand * 0.25);
  return nearestClearance + clearanceSlack >= centerBoundsRadius + guardBand
    ? targetRadius
    : 0;
}

function removeCenterContext(level) {
  if (!level?.centerContextSphere) {
    return;
  }
  level.group.remove(level.centerContextSphere.group);
  nodeFactory.disposeCenterContextSphere(level.centerContextSphere);
  level.centerContextSphere = null;
}

function syncLevelCenterContext(level) {
  if (!level) {
    return;
  }
  const center = getLevelFrameCenter(level);
  if (!shouldShowCenterContext(level, center)) {
    removeCenterContext(level);
    return;
  }
  const radius = resolveCenterContextRadius(level, center);
  const descriptor = resolveCenterContextDescriptor(level);
  if (!descriptor || radius <= 0) {
    removeCenterContext(level);
    return;
  }
  const contextData = {
    ...descriptor,
    radius,
  };
  if (!level.centerContextSphere) {
    level.centerContextSphere = nodeFactory.createCenterContextSphere(contextData);
    level.group.add(level.centerContextSphere.group);
  } else {
    nodeFactory.updateCenterContextSphere(level.centerContextSphere, contextData);
  }
  level.centerContextSphere.group.position.copy(center);
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
    return clampZoom(
      computeCenteredSceneFitZoom({
        safeRadius,
        extentRadius,
        margin: DEFAULT_SCENE_VIEWPORT_FIT_MARGIN,
        fallbackZoom: camera.zoom,
      })
    );
  }

  const { size } = getLevelBoundsFromNodes(level);
  if (!isFinite(size.x) || !isFinite(size.y) || size.lengthSq() === 0) {
    return camera.zoom;
  }

  const { safeWidth, safeHeight } = getSafeViewportWorld(
    level.viewportFit === "viewport" ? "viewport" : "focus"
  );
  return clampZoom(
    computeBoundsSceneFitZoom({
      safeWidth,
      safeHeight,
      sizeX: size.x,
      sizeY: size.y,
      margin: DEFAULT_SCENE_VIEWPORT_FIT_MARGIN,
      fallbackZoom: camera.zoom,
    })
  );
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

function layoutLevelForViewport(level) {
  layoutRootLevel(level);
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
  isActionableSphereNode: (nodeData) =>
    hasActionableSceneSphereTarget(nodeData, { panelMap: animatorPanelMap }),
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
  const labelFits = [];
  level.nodes.forEach((node) => {
    if (!node.data.wrapLabel) {
      return;
    }
    const metrics = getNodeScreenMetrics(node);
    const diameter = metrics.radiusPx * 2;
    if (!Number.isFinite(diameter) || diameter <= 0) {
      return;
    }
    const targetWidth = Math.round(diameter * 0.8);
    const minWidth = 42;
    const maxAllowed = Math.round(diameter * 0.84);
    const widthFloor = Math.min(minWidth, maxAllowed);
    const maxWidth = Math.max(widthFloor, Math.min(targetWidth, maxAllowed));
    if (node.labelMaxWidth !== maxWidth) {
      node.labelMaxWidth = maxWidth;
      node.labelObject.element.style.maxWidth = `${maxWidth}px`;
      node.labelObject.element.style.width = `${maxWidth}px`;
    }
    if (node.chapterLabelObject?.element) {
      const chapterSize = clamp(diameter * 0.055, 8.5, 12.5);
      node.chapterLabelObject.element.style.setProperty(
        "--label-chapter-size",
        `${chapterSize.toFixed(2)}px`
      );
    }

    labelFits.push({
      node,
      ...resolveWrappedLabelFit({
        nodeData: node.data,
        diameter,
        maxWidth,
        clamp,
        measureTextWidth: measureSceneLabelTextWidth,
      }),
    });
  });

  if (!labelFits.length) {
    updateCenterContextLabelWrap(level);
    return;
  }

  const typography = resolveSharedLabelTypography(labelFits, {
    clamp,
    measureTextWidth: measureSceneLabelTextWidth,
  });
  if (!typography) {
    return;
  }

  labelFits.forEach(({ node }) => {
    if (node.labelTypographyKey !== typography.key) {
      node.labelTypographyKey = typography.key;
      const labelStyle = node.labelObject.element.style;
      labelStyle.setProperty("--label-title-size", `${typography.titleSize.toFixed(2)}px`);
      labelStyle.setProperty("--label-title-weight", `${typography.titleWeight}`);
      labelStyle.setProperty("--label-title-line-height", typography.lineHeight.toFixed(2));
      labelStyle.setProperty(
        "--label-title-letter-spacing",
        `${typography.letterSpacing.toFixed(2)}em`
      );
      labelStyle.setProperty("--label-tag-size", `${typography.tagSize.toFixed(2)}px`);
      labelStyle.setProperty("--label-subtitle-size", `${typography.subtitleSize.toFixed(2)}px`);
      labelStyle.setProperty("--label-dates-size", `${typography.datesSize.toFixed(2)}px`);
      labelStyle.setProperty("--label-badge-size", `${typography.badgeSize.toFixed(2)}px`);
    }
  });
  updateCenterContextLabelWrap(level);
}

function updateCenterContextLabelWrap(level) {
  const centerContextSphere = level?.centerContextSphere;
  if (!centerContextSphere?.labelObject?.element) {
    return;
  }
  const metrics = getNodeScreenMetrics(centerContextSphere);
  const diameter = metrics.radiusPx * 2;
  if (!Number.isFinite(diameter) || diameter <= 0) {
    return;
  }
  const maxWidth = Math.max(48, Math.round(diameter * 0.78));
  if (centerContextSphere.labelMaxWidth !== maxWidth) {
    centerContextSphere.labelMaxWidth = maxWidth;
    centerContextSphere.labelObject.element.style.maxWidth = `${maxWidth}px`;
    centerContextSphere.labelObject.element.style.width = `${maxWidth}px`;
  }

  const title = centerContextSphere.data?.title ?? "";
  let titleSize = clamp(diameter * 0.13, 10.5, 18);
  let titleLineCount = 1;
  for (let index = 0; index < 6; index += 1) {
    titleLineCount = Math.max(
      1,
      estimateLabelLineCount(title, titleSize, maxWidth, {
        fontWeight: resolveLabelTitleWeight(titleSize, titleLineCount),
        measureTextWidth: measureSceneLabelTextWidth,
      })
    );
    const lineHeight = titleSize <= 12.5 ? 1.15 : 1.12;
    const metaLineCount = centerContextSphere.data?.chapterLabel ? 1 : 0;
    const countLineCount = centerContextSphere.data?.countLabel ? 1 : 0;
    const totalHeight =
      titleLineCount * titleSize * lineHeight +
      metaLineCount * titleSize * 0.76 +
      countLineCount * titleSize * 0.68 +
      (metaLineCount + countLineCount) * 2;
    const budget = diameter * 0.64;
    if (totalHeight <= budget) {
      break;
    }
    titleSize = clamp(titleSize * (budget / totalHeight), 8.5, titleSize);
  }
  const titleWeight = resolveLabelTitleWeight(titleSize, titleLineCount);
  const lineHeight = titleSize <= 12.5 ? 1.15 : 1.12;
  const style = centerContextSphere.labelObject.element.style;
  style.setProperty("--label-title-size", `${titleSize.toFixed(2)}px`);
  style.setProperty("--label-title-weight", `${titleWeight}`);
  style.setProperty("--label-title-line-height", lineHeight.toFixed(2));
  style.setProperty("--label-title-letter-spacing", "0em");
  style.setProperty("--label-center-meta-size", `${clamp(titleSize * 0.72, 8, 12.5).toFixed(2)}px`);
  style.setProperty("--label-center-count-size", `${clamp(titleSize * 0.64, 7.5, 11.5).toFixed(2)}px`);
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

function setLevelHoverFocus(level, focusId) {
  levelRuntime.setLevelHoverFocus(level, focusId);
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
  hideSceneImageGallery({ restoreHiddenLevel: false });
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
  hideImageGalleryTransitionLevel(toLevel);
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
  if (isAnimatorOverlaySceneId(config.sceneId) || standaloneAppHref) {
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
  hideSceneImageGallery({ restoreHiddenLevel: false });
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
  hideImageGalleryTransitionLevel(parentLevel);
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
  textbookPageNavigationRuntime.setTransitionActive(transitionState.active);
  if (transitionState.active) {
    if (navUpButton) {
      navUpButton.disabled = true;
    }
    if (navForwardButton) {
      navForwardButton.disabled = true;
    }
    appSceneChromeRuntime.updateTextbookTocButton(currentLevel, {
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
  appSceneChromeRuntime.updateTextbookTocButton(currentLevel, {
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

const animatorAppRuntime = createAnimatorAppRuntime({
  ui: {
    app,
    animatorOverlay,
    animatorTabs,
    animatorPanels,
    animatorSceneId,
    animatorPreviewSceneId,
    animatorPreviewScenePath,
    animatorDocsPath,
    levelConfigs,
    levels,
    initAnimatorCanvas,
    renderAnimatorJsonPreview,
    stopAnimatorCameraFlightPreview,
    showMarkdownPanel: (level) => markdownRuntime.showMarkdownPanel(level),
    readAnimatorDraftState,
    buildAnimatorSceneDocument: buildAnimatorDocumentData,
    buildAnimatorPreviewSceneData: buildAnimatorPreviewData,
    applyAnimatorSceneDocument: (documentData, options = {}) => {
      const normalizedDocument = normalizeAnimatorSceneDocument(documentData);
      updateAnimatorViewportFromDocument(normalizedDocument);
      if (animatorJsonPreview) {
        animatorJsonPreview.textContent = JSON.stringify(normalizedDocument, null, 2);
      }
      const sceneName =
        normalizedDocument?.scene?.name ?? normalizedDocument?.scene?.id ?? "simulation fixture";
      const sourceScenePath = options?.sourceScenePath ? ` from ${options.sourceScenePath}` : "";
      setAnimatorStatus(`Loaded ${sceneName}${sourceScenePath}.`);
    },
    jumpToScene,
    setAnimatorStatus,
    setAnimatorNeedsResize: (value) => {
      animatorNeedsResize = value;
    },
  },
  controls: {
    animatorTabs,
    animatorClearButton,
    animatorDocsButton,
    animatorExitButton,
    animatorPreviewButton,
    animatorViewDesignButton,
    animatorViewAuthoredButton,
    animatorViewPlanarButton,
    animatorExportButton,
    animatorLibrarySaveButton,
    animatorRepoSaveButton,
    animatorLibrarySelect,
    animatorLibraryLoadButton,
    animatorLibraryDeleteButton,
    animatorPlayToggleButton,
    animatorPlayResetButton,
    animatorMarkerPrevButton,
    animatorMarkerNextButton,
    animatorMarkerJumpSelect,
    animatorPlayheadScrubInput,
    animatorTimelineTrack,
    animatorSceneIdInput,
    animatorSceneNameInput,
    animatorPathModeSelect,
    animatorPathResetButton,
    animatorFrameResetButton,
    animatorFrameScaleInput,
    animatorCameraPoiSelect,
    animatorCameraWaypointAdd,
    animatorCameraWaypointClear,
    animatorCameraFlightToggle,
    animatorSceneDurationInput,
    animatorSceneLoopInput,
    animatorMarkerListInput,
    animatorPauseListInput,
    animatorWarpListInput,
    animatorTransferListInput,
    animatorCameraSpeedInput,
    animatorCameraRadiusInput,
    animatorCameraResetButton,
    animatorPathState,
    animatorCameraFlightState,
    updateAnimatorPathGeometry,
    resetAnimatorPathPoints,
    setAnimatorFrameDefaults,
    updateAnimatorFrame,
    addAnimatorCameraWaypoint,
    clearAnimatorCameraWaypoints,
    stopAnimatorCameraFlightPreview,
    startAnimatorCameraFlightPreview,
    setAnimatorViewportCameraSource,
    setAnimatorViewportProjection,
    applyAnimatorFrameScaleInput,
    applyAnimatorCameraSpeedInput,
    applyAnimatorCameraRadiusInput,
    setAnimatorCameraDefaults,
    updateAnimatorCamera,
    updateAnimatorCameraPoiStatus,
    persistAnimatorPathStateToSelectedAssembly,
    toggleAnimatorPlayback,
    restartAnimatorPlayback,
    jumpToAnimatorMarker,
    jumpAnimatorMarkerByOffset,
    scrubAnimatorPlayback,
    renderAnimatorJsonPreview,
    clearAnimatorScene,
    saveAnimatorSceneToLibrary,
    loadAnimatorSceneFromLibrary,
    deleteAnimatorSceneFromLibrary,
    isTransitionActive: () => transitionState.active,
    exitAnimator: () => {
      if (
        isStandaloneAnimatorApp &&
        navigateStandaloneAnimatorHome(globalThis.window?.location, standaloneNavigatorHref)
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
const { animatorUiRuntime } = animatorAppRuntime;

const appSceneChromeRuntime = createAppSceneChromeRuntime({
  sceneLabel,
  textbookTocButton,
  markdownDocButton,
  markdownPdfButton,
  markdownLayoutToggle,
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
  sceneStateHashService.syncSceneHash(currentLevel?.id ?? null, {
    historyMode: takeSceneHashHistoryMode(),
  });
  appSceneChromeRuntime.updateSceneLabel(currentLevel);
  textbookPageNavigationRuntime.syncCurrentLevel(currentLevel);
  appSceneChromeRuntime.updateTextbookTocButton(currentLevel, {
    textbookTocScenePath,
    transitionActive: transitionState.active,
  });
  appSceneChromeRuntime.updateMarkdownLayoutToggleButton(currentLevel);
  appSceneChromeRuntime.updateMarkdownDocButton(currentLevel);
  appSceneChromeRuntime.updateMarkdownPdfButton(currentLevel);
  animatorUiRuntime.updateAnimatorOverlay(currentLevel);
  periodicOverlayRuntime.updatePeriodicOverlay();
  periodicOverlayRuntime.updateElementLegend();
  periodicOverlayRuntime.updateElementInfoPanel();
  updateElementNavigationUi();
}

function cancelActiveTransitionForBrowserHistoryTraversal() {
  if (!transitionState.active) {
    return;
  }
  transitionState.active = false;
  transitionState.mode = null;
  transitionState.fromLevel = null;
  transitionState.toLevel = null;
  transitionState.payload = null;
  zoomState.active = false;
  panTween.active = false;
  pendingSceneHashHistoryMode = "replace";
}

async function restoreSceneFromBrowserHistory(event) {
  const sceneState =
    sceneStateHashService.getSceneStateFromHistoryState(event.state) ??
    sceneStateHashService.getSceneStateFromHash();
  const targetEntry = createHistoryEntryFromSceneState(sceneState);
  if (!targetEntry?.levelId) {
    return;
  }
  const targetHistoryIndex = sceneState?.historyIndex;
  const currentHistoryIndex = sceneStateHashService.getCurrentHistoryIndex();
  const direction =
    Number.isSafeInteger(targetHistoryIndex) && targetHistoryIndex < currentHistoryIndex
      ? "back"
      : Number.isSafeInteger(targetHistoryIndex) && targetHistoryIndex > currentHistoryIndex
        ? "forward"
        : "unknown";

  cancelActiveTransitionForBrowserHistoryTraversal();
  syncHistoryStacksForBrowserTraversal(targetEntry, direction);
  sceneStateHashService.setCurrentHistoryIndex(targetHistoryIndex);
  pendingSceneHashHistoryMode = "replace";

  if (targetEntry.levelId === rootScenePath) {
    await resetToRootScene({ historyTraversal: true });
    return;
  }
  await jumpToScene(targetEntry.levelId, {
    mode: "jump",
    restoreNavStack: targetEntry.navigationStack,
    historyTraversal: true,
  });
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
  textbookTocButton,
  detailClose,
  markdownClose,
  markdownDocButton,
  markdownPdfButton,
  markdownLayoutToggle,
  markdownRuntime,
  closeDetailPanel,
  getCurrentLevel: () => currentLevel,
  isTransitionActive: () => transitionState.active,
  toggleTextbookToc,
});
sceneImageGalleryRuntime = createSceneImageGalleryRuntime({
  document: globalThis.document,
  window: globalThis.window,
  appendCacheBust,
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
        clearSphereHover();
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
  clearSphereHover();

  const galleryNodeId = targetNode.data.id ?? targetNode.data.name;
  if (sceneImageGalleryRuntime?.openFromNode(currentLevel, galleryNodeId)) {
    closeDetailPanel();
    hideHoverTooltip();
    markdownRuntime.hideMarkdownPanel();
    return true;
  }

  const hasMarkdownTarget =
    typeof targetNode?.data?.markdownPath === "string" &&
    targetNode.data.markdownPath.trim().length > 0;
  const hasFileTarget =
    typeof targetNode?.data?.filePath === "string" &&
    targetNode.data.filePath.trim().length > 0;
  const canOpenMarkdown =
    hasMarkdownTarget && targetNode.data.markdownOpenEligible === true;

  if (currentLevel?.sceneId === animatorSceneId) {
    const panelId = animatorPanelMap.get(targetNode.data.id ?? "");
    if (panelId) {
      closeDetailPanel();
      hideHoverTooltip();
      animatorUiRuntime.setAnimatorPanel(panelId);
      return true;
    }
  }

  if (hasMarkdownTarget && targetNode.data.markdownDownloadOnly === true) {
    closeDetailPanel();
    hideHoverTooltip();
    markdownRuntime.downloadMarkdownSource(targetNode.data);
    return true;
  }

  if (hasFileTarget && targetNode.data.fileOpenEligible === true) {
    closeDetailPanel();
    hideHoverTooltip();
    fileSourceRuntime.openFileSource(targetNode.data);
    return true;
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
    clearSphereHover();
    return;
  }
  if (!isPointerWithinInteractiveViewport(clientX, clientY)) {
    clearSphereHover();
    return;
  }
  const targetNode = getPointerSphereNode(clientX, clientY);
  if (!targetNode) {
    clearSphereHover();
    return;
  }
  setSphereHoverNode(targetNode);
  if (!targetNode.data?.details) {
    return;
  }
  if (!detailPanel) {
    return;
  }
  const nextId = getSphereHoverNodeId(targetNode);
  if (nextId && nextId === hoveredDetailNodeId) {
    return;
  }
  setDetailPanel(targetNode);
}

function updateGenerationTransitionHover(clientX, clientY) {
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
  const label = `Transition to Gen ${nextGenInfo.nextGen} ${nextGenInfo.nextLabel}`;
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
  updateGenerationTransitionHover,
  clearHoverState: clearSphereHover,
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
  renderAnimatorCanvas();
}

function onResize() {
  updateCamera();
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  if (animatorRenderer) {
    animatorNeedsResize = true;
  }
  if (currentLevel) {
    layoutRootLevel(currentLevel);
    fitCameraToLevel(currentLevel);
  }
}

async function init() {
  closeDetailPanel();
  const requestedSceneState = sceneStateHashService.getSceneStateFromHash();
  const requestedInitialScenePath = isStandaloneAnimatorApp
    ? getAnimatorInitialScenePath({
        requestedScenePath: requestedSceneState.scenePath,
        rootScenePath,
      })
    : requestedSceneState.scenePath || rootScenePath;
  const directStandaloneInitialHref = resolveStandaloneAppHrefForScene(
    requestedInitialScenePath,
    globalThis.window?.location?.href
  );
  if (directStandaloneInitialHref && typeof globalThis.window?.location?.href === "string") {
    const currentUrl = new URL(globalThis.window.location.href);
    const targetUrl = new URL(directStandaloneInitialHref);
    if (currentUrl.pathname !== targetUrl.pathname) {
      targetUrl.hash = currentUrl.hash;
      globalThis.window.location.assign(targetUrl.href);
      return;
    }
  }
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
  syncSceneImageGalleryLevel(currentLevel);
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
  syncSceneImageGalleryLevel(currentLevel);
  showZoomToastIfNeeded();
  animate();
}

if (typeof window !== "undefined") {
  window.addEventListener("popstate", (event) => {
    restoreSceneFromBrowserHistory(event).catch((error) => {
      console.warn("[ArchitrinoSceneAppRuntime] Failed to restore browser history state", error);
    });
  });
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
  homeButton,
  periodicOverlayRuntime,
  appDirector,
});
const sceneHudTooltipRuntime = createSceneHudTooltipRuntime({
  sceneHudTools,
  showHoverTooltip,
  hideHoverTooltip,
});

appDirector.init();
appShellUiRuntime.wireListeners();
sceneHudTooltipRuntime.wireListeners();
scenePanelUiRuntime.wireListeners();
sceneImageGalleryRuntime?.wireListeners();
textbookPageNavigationRuntime.wireListeners();
animatorAppRuntime.wireListeners();
sceneSearchUiRuntime.wireListeners();
updateAnimatorViewportModeButtons();
window.addEventListener("keydown", (event) => {
  if (
    event.code === "Space" &&
    animatorOverlay?.classList.contains("is-open") &&
    !event.defaultPrevented &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.altKey &&
    !isEditingTextInput(event.target)
  ) {
    toggleAnimatorPlayback();
    event.preventDefault();
  }
});
wireElementNavigationControls();
ensureElementNavigationData();
