import {
  DIRECT_MANIPULATION_DRAFT_PREVIEW,
  createMockCausalDelayReplayDataset,
  createTemporaryMockReplayAdapter,
  getAngleDegrees,
  getDistance,
} from "./CausalDelayFeedbackReplayAdapter.js";
import {
  ARCHITRINO_BODY_HALO_RADIUS,
  ARCHITRINO_BODY_OUTLINE_WIDTH,
  ARCHITRINO_BODY_RADIUS,
  CAUSAL_PATH_STROKE_WIDTH,
  DEFAULT_TRANSMISSION_POINT_MARKER_VARIANT,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  ELECTRINO,
  ELECTRINO_WAKE,
  FIXED_CANVAS_COLOR,
  FIXED_WAKE_VISUAL_STYLE,
  POSITRINO,
  POSITRINO_WAKE,
  SPACE_AXIS_TOP_Y,
  TIME_AXIS_BASELINE_Y,
  TIME_AXIS_END_X,
  TIME_AXIS_LABEL_POSITION,
  TIME_AXIS_ORIGIN_X,
  TIMELINE_RAIL_AXIS_SAFE_INSET,
  TRANSMISSION_POINT_MARKER_STYLES,
  TRANSMISSION_POINT_MARKER_VARIANTS,
  WHITE,
  normalizeTransmissionPointMarkerVariant,
} from "./CausalDelayFeedbackDisplayContract.js";
import { EOM_REPLAY_DATASET_SOURCE } from "./CausalDelayFeedbackEomReplayAdapter.js";
import {
  TRANSPORT_CONTROL_ICON,
  setTransportControlButtonPresentation,
} from "../../runtime/TransportControlIcons.js";
import {
  NORMALIZED_FIELD_SPEED,
  createCanonicalLearnerState,
  createDisplayAuthority,
  createReplayAuthority,
  evaluateCausalRoots,
  refreshCanonicalLearnerState,
} from "./CausalDelayFeedbackCausalHistory.js";
import {
  C1_CUBIC_HERMITE_INTERPOLATION,
  getC1TimedPathBezierSegment,
  getTimedPathRange,
  sampleTimedPath,
  sampleTimedPathByArcLength,
  usesC1TimedPathInterpolation,
} from "./CausalDelayFeedbackTimedPath.js";
import {
  createCausalDelayFeedbackModeController,
} from "./CausalDelayFeedbackModeController.js";
import {
  navigateStandaloneAppHome,
  resolveStandaloneSiteHomeHref,
} from "../navigator/StandaloneAppHomeRuntime.js";
import {
  createStandaloneAppSceneSearchRuntime,
  resolveStandaloneGlobalSceneHref,
  TEXTBOOK_TOC_SCENE_PATH,
} from "../navigator/StandaloneAppSceneSearchRuntime.js";
import {
  DEFAULT_CAUSAL_DELAY_FEEDBACK_MODE,
  normalizeCausalDelayFeedbackMode,
} from "./CausalDelayFeedbackModes.js";
import {
  createStoryTimeAxisPath,
  createStoryMotionWakeComparisonFixture,
  createStoryContinuousDelayedFeedbackFrame,
  createStoryScene,
  createStorySampledWakeFronts,
  STORY_SHARED_PATH_PLAYBACK_SECONDS,
  STORY_TWO_THREE_HANDOFF_PATH_PROGRESS,
} from "./CausalDelayFeedbackStoryMode.js";
import {
  INVERSE_SQUARE_BODY_PROGRESS,
  createInverseSquareSpreadingFrame,
} from "./CausalDelayFeedbackInverseSquareMode.js";
import {
  createSuperpositionScene,
} from "./CausalDelayFeedbackSuperpositionMode.js";
import {
  createRootsView,
} from "./CausalDelayFeedbackRootsMode.js";
import {
  createWakeDisplayGeometry,
  drawDottedWakeArc,
  drawWakeDisplayGeometry,
} from "./CausalDelayFeedbackWakeRenderer.js";

const REPLAY_LOOP_SECONDS = 9;
const STORY_STAGE_PLAYBACK_SECONDS = 3.2;
const LABORATORY_ENTRY_VISIBILITY_SCAN_STEPS = 512;
const LABORATORY_ENTRY_VISIBILITY_REFINEMENT_STEPS = 32;
const LABORATORY_ENTRY_ARC_ANGLE_SAMPLES = 8;
const STORY_CHART_GAP = 16;
const STORY_CHART_EDGE_PADDING = 18;
const STORY_CHART_DESIGN_PADDING = 0;
const STORY_DESKTOP_PANEL_TEMPLATE_HEIGHT = 250;
const TIME_EPSILON = 1e-6;
const WHEEL_HIT_CACHE_MILLISECONDS = 160;
const WHEEL_HIT_CACHE_RADIUS = 3;
const INITIAL_VELOCITY_ARROW_SCALE = 0.04;
const INITIAL_VELOCITY_PREVIEW_RESPONSE = 0.42;
const RETAINED_PATH_SPLINE_TANGENT_SCALE = 0.72;
const NOW_SLIDER_MAX = 1000;
const DEFAULT_ASSEMBLY_THRESHOLD = 0.00075;
const MIN_RETAINED_DEPTH_LIMIT = 2;
const RETAINED_DEPTH_LIMIT_OPTIONS = Object.freeze([2, 4, 8, 16, 32, 64]);
const DEFAULT_FIELD_SPEED_SCALE = 1;
const ARCHITRINO_KINDS = Object.freeze(["positrino", "electrino"]);
const VIEWPORT_ZOOM_MIN = 1;
const VIEWPORT_ZOOM_MAX = 3;
const WHEEL_ZOOM_SENSITIVITY = 0.0015;
const WAKE_FRONT_CADENCE_TIME_DIVISIONS = 144;
const FORWARD_WAKE_SPHERE_SEGMENT_COUNT = 96;
const DEFAULT_LIVE_WAKE_FRONT_SPACING = 9;
const LIVE_WAKE_ROOT_SCAN_STEPS = 96;
const DEFAULT_LIVE_WAKE_SIGNAL_SPEED = 3000;
const PATH_LINE_HIT_RADIUS = 18;
const PATH_LINE_DRAG_FALLOFF_TIME = 0.32;
const PATH_LINE_DRAG_ENDPOINT_INSET_FRACTION = 0.04;
const PATH_LINE_DRAG_MINIMUM_X_GAP_FRACTION = 0.02;
const CENTRIPETAL_CATMULL_ROM_ALPHA = 0.5;
const PATH_ENDPOINT_HANDLE_HIT_RADIUS = 18;
const ELECTRINO_LABEL = Object.freeze(mixColor(ELECTRINO, WHITE, 0.58));
const WEAK_CONTRIBUTION_CUE_VISUAL_THRESHOLD_MULTIPLIER = 8;
const WEAK_CONTRIBUTION_CUE_MIN_ALPHA_SCALE = 0.36;
const WEAK_CONTRIBUTION_CUE_MIN_RADIUS_SCALE = 0.56;
const WEAK_CONTRIBUTION_CUE_MAX_DESATURATION = 0.28;
const WAKE_VISUAL_SWITCHES = Object.freeze({
  arcWakesEnabled: "arcWakesEnabled",
  fullCircularWakesEnabled: "fullCircularWakesEnabled",
});
const DEFAULT_WAKE_VISUAL_SETTINGS = Object.freeze({
  arcWakesEnabled: true,
  fullCircularWakesEnabled: false,
});
const SPACE_KEYS = new Set([" ", "Space", "Spacebar"]);
const REPLAY_STEP_KEYS = Object.freeze({
  ArrowLeft: -1,
  ArrowRight: 1,
});
const SPACEBAR_NATIVE_CONTROL_TAGS = new Set(["INPUT", "SELECT", "TEXTAREA"]);
const INACTIVE_WAKE_VISUAL_TIERS = Object.freeze({
  inactive: Object.freeze({
    alphaScale: 0.46,
    radiusScale: 0.78,
    desaturation: 0.32,
  }),
  stale: Object.freeze({
    alphaScale: 0.24,
    radiusScale: 0.62,
    desaturation: 0.7,
  }),
  rejected: Object.freeze({
    alphaScale: 0.18,
    radiusScale: 0.56,
    desaturation: 0.78,
  }),
});

function queryRequiredElement(documentLike, selector) {
  const element = documentLike.querySelector(selector);
  if (!element) {
    throw new Error(`Missing causal delay feedback element: ${selector}`);
  }
  return element;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function colorToCss(color, alpha = color.a ?? 1) {
  if (typeof color === "string") {
    return color;
  }
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${clamp(alpha, 0, 1)})`;
}

function withAlpha(color, alpha) {
  return { ...color, a: clamp(alpha, 0, 1) };
}

function mixColor(a, b, t) {
  const amount = clamp(t, 0, 1);
  return {
    r: Math.round(a.r + (b.r - a.r) * amount),
    g: Math.round(a.g + (b.g - a.g) * amount),
    b: Math.round(a.b + (b.b - a.b) * amount),
    a: a.a + ((b.a ?? 1) - (a.a ?? 1)) * amount,
  };
}

function formatCompactNumber(value) {
  if (!Number.isFinite(value)) {
    return "--";
  }
  if (value === 0) {
    return "0";
  }
  const magnitude = Math.abs(value);
  if (magnitude < 0.001 || magnitude >= 1000) {
    return value.toExponential(1);
  }
  return value.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
}

function formatCompactLabel(value, fallback = "") {
  const text = String(value ?? "").trim();
  if (!text) {
    return fallback;
  }
  return text.replace(/\s+/g, "_").slice(0, 72);
}

function createViewport(canvasWidth, canvasHeight, zoom = 1) {
  const baseScale = Math.min(canvasWidth / DESIGN_WIDTH, canvasHeight / DESIGN_HEIGHT);
  const viewportZoom = clamp(Number(zoom) || 1, VIEWPORT_ZOOM_MIN, VIEWPORT_ZOOM_MAX);
  const scale = baseScale * viewportZoom;
  return {
    scale,
    offsetX: (canvasWidth - DESIGN_WIDTH * scale) * 0.5,
    offsetY: (canvasHeight - DESIGN_HEIGHT * scale) * 0.5,
    baseScale,
    zoom: viewportZoom,
  };
}

function cloneJson(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

export function createCausalDelayFeedbackRuntime(options = {}) {
  return new CausalDelayFeedbackRuntime(options);
}

class CausalDelayFeedbackRuntime {
  constructor(options = {}) {
    this.document = options.document ?? globalThis.document;
    this.window = options.window ?? globalThis.window;
    this.animationFrame = null;
    this.destroyed = false;
    this.eventListeners = [];
    this.datasetRevision = 0;
    this.visibleWakeSeriesCache = null;
    this.replayTimeRangeCache = null;
    this.replayFrameTimesCache = null;
    this.laboratoryInitialReplayStateCache = null;
    this.pathArcLengthCache = new Map();
    this.storyTimeAxisPathCache = new Map();
    this.wheelHitCache = null;
    this.lastFrameTime = 0;
    this.elapsedSeconds = 0;
    this.reducedMotionEnabled = this.normalizeBooleanSetting(
      options.reducedMotionEnabled ?? this.prefersReducedMotion(),
    );
    this.backgroundDepthFieldEnabled = this.normalizeBooleanSetting(options.backgroundDepthFieldEnabled);
    this.isPlaying = !this.reducedMotionEnabled;
    this.fieldSpeedScale = DEFAULT_FIELD_SPEED_SCALE;
    this.wakeVisualSettings = this.createWakeVisualSettings(options.wakeVisualSettings);
    this.transmissionPointMarkerVariant = normalizeTransmissionPointMarkerVariant(
      options.transmissionPointMarkerVariant ??
        DEFAULT_TRANSMISSION_POINT_MARKER_VARIANT,
    );
    this.fallbackReplayAdapter = options.fallbackReplayAdapter ?? createTemporaryMockReplayAdapter();
    this.replayAdapter = options.replayAdapter ?? this.fallbackReplayAdapter;
    this.replayRequestOptions = options.replayRequestOptions ?? {};
    this.autoLoadReplay = options.autoLoadReplay !== false;
    this.replayLoadSequence = 0;
    this.replayLoadState = "idle";
    this.replayLoadError = null;
    this.dataset = this.createFallbackReplay();
    this.updateWakeLinkGeometry();
    this.learnerState = createCanonicalLearnerState(this.dataset, {
      receiverTime: 0.62,
      mode: normalizeCausalDelayFeedbackMode(
        options.initialMode,
        DEFAULT_CAUSAL_DELAY_FEEDBACK_MODE,
      ),
      signalSpeed: NORMALIZED_FIELD_SPEED,
      distanceScale: 1 / this.getLiveWakeSignalSpeed(),
      loadState: this.replayLoadState,
    });
    this.lastStoryMotionSpeedFraction =
      Number(this.learnerState.storyMotionSpeedFraction);
    this.lastStoryStep = Number(this.learnerState.storyStep);
    if (this.learnerState.mode !== "sandbox") {
      this.isPlaying = false;
      this.learnerState.playback.playing = false;
    }
    this.elapsedSeconds = this.learnerState.mode === "sandbox"
      ? 0
      : this.learnerState.receiverTime * this.getReplayLoopSeconds();
    this.retainedDepthLimit = this.normalizeRetainedDepthLimit(options.retainedDepthLimit);
    this.viewportZoom = VIEWPORT_ZOOM_MIN;
    this.viewport = createViewport(DESIGN_WIDTH, DESIGN_HEIGHT, this.viewportZoom);
    this.canvasWidth = DESIGN_WIDTH;
    this.canvasHeight = DESIGN_HEIGHT;
    this.pixelRatio = 1;
    this.selectedItem = null;
    this.dragState = null;
    this.backgroundPointers = new Map();
    this.pinchState = null;
    this.syncReplayRequestOptionsFromDataset();
  }

  init() {
    this.dom = this.getDom();
    this.context = this.dom.canvas.getContext("2d");
    if (!this.context) {
      throw new Error("Canvas 2D context is unavailable.");
    }

    this.updateDisplaySettingControls();
    this.updateNowControl();
    this.updateReplayStatus();
    this.bindEvents();
    this.modeController = createCausalDelayFeedbackModeController({
      document: this.document,
      state: this.learnerState,
      onModeChange: (mode) => {
        this.handleLearnerModeChange(mode);
      },
      onStateChange: () => {
        this.handleLearnerStateChange();
      },
      onPlayToggle: (isPlaying) => {
        this.setPlaying(isPlaying);
      },
      onReplay: () => {
        this.resetStoryScenarioPlayback();
      },
      onHome: () => {
        navigateStandaloneAppHome(
          this.window?.location,
          resolveStandaloneSiteHomeHref(this.window?.location?.href),
          {
            windowLike: this.window,
            returnHref: this.window?.location?.href,
          },
        );
      },
      onTableOfContents: () => {
        navigateStandaloneAppHome(
          this.window?.location,
          resolveStandaloneGlobalSceneHref(
            TEXTBOOK_TOC_SCENE_PATH,
            this.window?.location?.href,
          ),
          {
            windowLike: this.window,
            returnHref: this.window?.location?.href,
          },
        );
      },
    }).init();
    this.sceneSearchRuntime = createStandaloneAppSceneSearchRuntime({
      document: this.document,
      window: this.window,
      onOpenChange: (isOpen) => {
        this.modeController.dom.journey.classList.toggle(
          "is-global-search-open",
          isOpen,
        );
      },
    }).init();
    if (this.learnerState.mode === "story") {
      this.resetStoryScenarioPlayback();
    } else if (this.learnerState.mode === "sandbox") {
      this.resetLaboratoryScenarioPlayback();
    }
    this.resize();
    this.render(this.getCurrentReplayTime());
    this.start();
    if (this.autoLoadReplay) {
      void this.loadReplay();
    }
  }

  getDom() {
    return {
      app: queryRequiredElement(this.document, "#causal-delay-feedback-app"),
      canvas: queryRequiredElement(this.document, "#causal-delay-feedback-canvas"),
      toolbar: queryRequiredElement(this.document, "#causal-delay-feedback-toolbar"),
      bottomRail: queryRequiredElement(this.document, "#causal-delay-feedback-bottom-rail"),
      playButton: queryRequiredElement(this.document, "#causal-delay-feedback-guided-play"),
      resetButton: queryRequiredElement(this.document, "#causal-delay-feedback-guided-first-frame"),
      lastFrameButton: queryRequiredElement(
        this.document,
        "#causal-delay-feedback-guided-last-frame",
      ),
      visualSwitches: queryRequiredElement(this.document, "#causal-delay-feedback-visual-switches"),
      nowInput: queryRequiredElement(this.document, "#causal-delay-feedback-now"),
      nowValue: this.document.querySelector("#causal-delay-feedback-now-value"),
      replayStatus: queryRequiredElement(this.document, "#causal-delay-feedback-replay-status"),
      readout: queryRequiredElement(this.document, "#causal-delay-feedback-readout"),
    };
  }

  createWakeVisualSettings(overrides = null) {
    const fullCircularWakesEnabled = this.normalizeBooleanSetting(
      overrides?.fullCircularWakesEnabled,
    );
    return fullCircularWakesEnabled
      ? {
          arcWakesEnabled: false,
          fullCircularWakesEnabled: true,
        }
      : { ...DEFAULT_WAKE_VISUAL_SETTINGS };
  }

  toggleWakeVisualSwitch(switchId) {
    if (!Object.prototype.hasOwnProperty.call(WAKE_VISUAL_SWITCHES, switchId)) {
      return;
    }
    this.setWakeVisualSwitch(switchId, true);
  }

  setWakeVisualSwitch(switchId, isEnabled) {
    if (!Object.prototype.hasOwnProperty.call(WAKE_VISUAL_SWITCHES, switchId)) {
      return;
    }
    const nextValue = this.normalizeBooleanSetting(isEnabled);
    if (!nextValue || this.wakeVisualSettings[switchId] === true) {
      this.updateDisplaySettingControls();
      return;
    }
    const otherSwitchId = switchId === "arcWakesEnabled"
      ? "fullCircularWakesEnabled"
      : "arcWakesEnabled";
    this.wakeVisualSettings = {
      [switchId]: true,
      [otherSwitchId]: false,
    };
    this.updateDisplaySettingControls();
    if (this.context) {
      this.render();
    }
    if (this.dom?.readout) {
      this.updateReadout();
    }
  }

  bindEvents() {
    this.boundResize = () => this.resize();
    this.listen(this.window, "resize", this.boundResize);
    this.boundKeyDown = (event) => this.handleKeyDown(event);
    this.listen(this.document, "keydown", this.boundKeyDown);

    this.listen(this.dom.playButton, "click", () => {
      this.setPlaying(!this.isPlaying);
    });
    this.listen(this.dom.resetButton, "click", () => {
      this.resetReplayTime();
    });
    if (this.dom.lastFrameButton) {
      this.listen(this.dom.lastFrameButton, "click", () => {
        this.jumpToLastFrame();
      });
    }
    this.listen(this.dom.visualSwitches, "click", (event) => {
      const button = event.target.closest("[data-visual-switch]");
      if (!button) {
        return;
      }
      this.toggleWakeVisualSwitch(button.dataset.visualSwitch);
    });
    const updateReplayFromNowInput = () => {
      this.setReplayNowSliderValue(this.dom.nowInput.value);
    };
    this.listen(this.dom.nowInput, "input", updateReplayFromNowInput);
    this.listen(this.dom.nowInput, "change", updateReplayFromNowInput);
    this.listen(this.dom.canvas, "pointermove", (event) => {
      this.handleCanvasPointerMove(event);
    });
    this.listen(this.dom.canvas, "pointerdown", (event) => {
      this.handleCanvasPointerDown(event);
    });
    this.listen(
      this.dom.canvas,
      "wheel",
      (event) => {
        this.handleCanvasWheel(event);
      },
      { passive: false },
    );
    this.listen(this.window, "pointerup", (event) => {
      void this.finishDrag(event);
    });
    this.listen(this.window, "pointercancel", (event) => {
      void this.finishDrag(event);
    });
  }

  listen(target, type, handler, options) {
    target.addEventListener(type, handler, options);
    this.eventListeners.push({ target, type, handler, options });
  }

  createFallbackReplay() {
    if (typeof this.fallbackReplayAdapter.createReplay === "function") {
      return this.fallbackReplayAdapter.createReplay();
    }
    return createMockCausalDelayReplayDataset();
  }

  usesFallbackReplayOnly() {
    return this.replayAdapter === this.fallbackReplayAdapter && typeof this.replayAdapter.createReplayAsync !== "function";
  }

  async loadReplay({
    requestOptions = this.replayRequestOptions,
  } = {}) {
    const sequence = ++this.replayLoadSequence;
    const adapter = this.replayAdapter;
    this.replayLoadState = "loading";
    this.replayLoadError = null;
    this.updateReplayStatus();

    try {
      const dataset = await this.createReplayDataset(adapter, requestOptions);
      if (sequence !== this.replayLoadSequence) {
        return this.dataset;
      }
      this.applyReplayDataset(dataset, { loadState: "ready" });
      this.elapsedSeconds = 0;
      this.selectedItem = null;
      this.dragState = null;
      this.refreshAfterReplayDatasetChange();
      return this.dataset;
    } catch (error) {
      if (sequence !== this.replayLoadSequence) {
        return this.dataset;
      }
      this.replayLoadError = error;
      this.applyReplayDataset(this.createFallbackReplay(), { loadState: "fallback" });
      this.elapsedSeconds = 0;
      this.selectedItem = null;
      this.dragState = null;
      this.refreshAfterReplayDatasetChange();
      return this.dataset;
    }
  }

  createReplayDataset(adapter, requestOptions) {
    return typeof adapter.createReplayAsync === "function"
      ? adapter.createReplayAsync({ requestOptions })
      : adapter.createReplay({ requestOptions });
  }

  applyReplayDataset(dataset, { loadState = this.replayLoadState } = {}) {
    this.dataset = dataset;
    this.invalidateComputedCaches();
    this.replayLoadState = loadState;
    this.retainedDepthLimit = this.normalizeRetainedDepthLimit(this.retainedDepthLimit);
    this.updateWakeLinkGeometry();
    this.syncReplayRequestOptionsFromDataset();
    this.refreshLearnerState({
      receiverTime: this.learnerState?.receiverTime ?? this.getCurrentReplayTime(),
    });
    this.updateReplayStatus();
  }

  invalidateComputedCaches() {
    this.datasetRevision += 1;
    this.visibleWakeSeriesCache = null;
    this.replayTimeRangeCache = null;
    this.replayFrameTimesCache = null;
    this.laboratoryInitialReplayStateCache = null;
    this.pathArcLengthCache.clear();
    this.storyTimeAxisPathCache.clear();
    this.wheelHitCache = null;
  }

  syncReplayRequestOptionsFromDataset() {
    if (!this.dataset) {
      return;
    }
    const requestOptions = {
      ...this.replayRequestOptions,
      initialConditions: cloneJson(this.dataset.initialConditions ?? {}),
      replayDataset: this.dataset,
      retainedDepthLimit: this.retainedDepthLimit,
      fieldSpeedScale: this.fieldSpeedScale,
    };
    this.replayRequestOptions = requestOptions;
  }

  refreshAfterReplayDatasetChange() {
    if (this.learnerState?.mode !== "sandbox" && Number.isFinite(this.learnerState?.receiverTime)) {
      const [start, end] = this.getReplayTimeRange();
      const span = end - start;
      const phase = span > 0 ? clamp((this.learnerState.receiverTime - start) / span, 0, 1) : 0;
      this.elapsedSeconds = phase * this.getReplayLoopSeconds();
    }
    this.updateNowControl();
    this.updateReplayStatus();
    if (this.dom?.readout) {
      this.updateReadout();
    }
    this.modeController?.setState(this.learnerState);
    if (this.context) {
      this.render();
    }
  }

  refreshLearnerState({ receiverTime = this.getCurrentReplayTime() } = {}) {
    if (!this.learnerState) {
      return null;
    }
    refreshCanonicalLearnerState(this.learnerState, {
      dataset: this.dataset,
      receiverTime,
      signalSpeed: NORMALIZED_FIELD_SPEED,
      distanceScale: 1 / this.getLiveWakeSignalSpeed(),
      loadState: this.replayLoadState,
      loadError: this.replayLoadError,
    });
    this.learnerState.playback.playing = this.isPlaying;
    this.learnerState.playback.reducedMotion = this.reducedMotionEnabled;
    this.learnerState.playback.rate = this.fieldSpeedScale;
    return this.learnerState;
  }

  setLearnerMode(mode) {
    return this.modeController?.setMode(mode) ?? false;
  }

  handleLearnerModeChange(mode) {
    this.learnerState.mode = mode;
    this.selectedItem = null;
    this.updateReplayStatus();
    if (mode === "story") {
      this.lastStoryStep = Number(this.learnerState.storyStep);
      this.resetStoryScenarioPlayback();
      return;
    }
    this.setPlaying(false);
    if (mode === "sandbox") {
      this.resetLaboratoryScenarioPlayback();
      return;
    }
    this.render();
  }

  setGuidedReplayCursor(replayTime) {
    const [start, end] = this.getReplayTimeRange();
    const span = end - start;
    const nextTime = Number.isFinite(Number(replayTime))
      ? clamp(Number(replayTime), start, end)
      : start;
    const phase = span > TIME_EPSILON ? clamp((nextTime - start) / span, 0, 1) : 0;
    this.elapsedSeconds = phase * this.getReplayLoopSeconds();
    this.updateNowControl(nextTime);
    return nextTime;
  }

  updateReplayStatus() {
    if (!this.dom?.replayStatus) {
      return;
    }
    const replayStatus = this.getReplayStatusState();
    this.dom.replayStatus.textContent = replayStatus.label;
    this.dom.replayStatus.dataset.state = replayStatus.state;
    this.dom.replayStatus.title = replayStatus.help;
    this.dom.replayStatus.setAttribute("aria-label", replayStatus.help);
    // Keep provenance and its accessible explanation available to the runtime,
    // but do not expose the compact status ribbon in Laboratory.
    this.dom.replayStatus.hidden = this.learnerState?.mode === "sandbox";
  }

  getReplayStatusState() {
    const loadState =
      this.replayLoadState === "loading" && this.usesFallbackReplayOnly()
        ? "ready"
        : this.replayLoadState;
    const authority = createReplayAuthority(
      this.dataset,
      loadState,
      this.replayLoadError,
    );
    return {
      state: authority.statusState,
      label: authority.compactLabel,
      help: authority.help,
    };
  }

  setRetainedDepthLimit(depthLimit) {
    const nextLimit = this.normalizeRetainedDepthLimit(depthLimit);
    if (nextLimit === this.retainedDepthLimit) {
      return;
    }
    this.retainedDepthLimit = nextLimit;
    this.syncReplayRequestOptionsFromDataset();
    if (!this.isSelectionVisible()) {
      this.selectedItem = null;
    }
    if (this.dom?.readout) {
      this.updateReadout();
    }
    if (this.context) {
      this.render();
    }
  }

  setReducedMotionEnabled(isEnabled) {
    const nextValue = this.normalizeBooleanSetting(isEnabled);
    if (nextValue === this.reducedMotionEnabled) {
      this.updateDisplaySettingControls();
      return;
    }
    this.reducedMotionEnabled = nextValue;
    if (this.reducedMotionEnabled) {
      this.setPlaying(false);
    } else {
      this.updatePlayButton();
    }
    this.updateDisplaySettingControls();
  }

  setBackgroundDepthFieldEnabled(isEnabled) {
    const nextValue = this.normalizeBooleanSetting(isEnabled);
    if (nextValue === this.backgroundDepthFieldEnabled) {
      this.updateDisplaySettingControls();
      return;
    }
    this.backgroundDepthFieldEnabled = nextValue;
    this.updateDisplaySettingControls();
    if (this.context) {
      this.render();
    }
  }

  updateDisplaySettingControls() {
    if (this.dom?.visualSwitches) {
      const selectedSwitchId = this.wakeVisualSettings.fullCircularWakesEnabled
        ? "fullCircularWakesEnabled"
        : "arcWakesEnabled";
      this.dom.visualSwitches.dataset.selectionMode = "exclusive";
      this.dom.visualSwitches.dataset.selectedWakeMode =
        selectedSwitchId === "fullCircularWakesEnabled" ? "full" : "arcs";
      Array.from(this.dom.visualSwitches.children).forEach((button) => {
        const switchId = button.dataset.visualSwitch;
        if (!switchId) {
          return;
        }
        const isActive = this.wakeVisualSettings[switchId] === true;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
      if (this.dom?.canvas) {
        this.dom.canvas.dataset.laboratoryWakeDisplaySelection =
          this.dom.visualSwitches.dataset.selectedWakeMode;
        this.dom.canvas.dataset.laboratoryWakeDisplaySelectionCount = "1";
      }
    }
  }

  getMaxRetainedDepthLimit() {
    const historyDepth = Number(this.dataset?.initialConditions?.historyDepth);
    if (Number.isFinite(historyDepth) && historyDepth > 0) {
      return Math.max(1, Math.floor(historyDepth));
    }
    const depths = Object.values(this.dataset?.history ?? {})
      .flat()
      .map((point) => Number(point.depth))
      .filter(Number.isFinite);
    return depths.length > 0 ? Math.max(...depths) : MIN_RETAINED_DEPTH_LIMIT;
  }

  normalizeRetainedDepthLimit(depthLimit) {
    const numericDepth = Number(depthLimit);
    const candidate = Number.isFinite(numericDepth)
      ? Math.floor(numericDepth)
      : this.getMaxRetainedDepthLimit();
    return this.snapRetainedDepthLimit(candidate);
  }

  snapRetainedDepthLimit(depthLimit) {
    const numericDepth = Number(depthLimit);
    const candidate = Number.isFinite(numericDepth) ? numericDepth : RETAINED_DEPTH_LIMIT_OPTIONS[2];
    return RETAINED_DEPTH_LIMIT_OPTIONS.find((depth) => depth >= candidate) ?? RETAINED_DEPTH_LIMIT_OPTIONS.at(-1);
  }

  normalizeBooleanSetting(value) {
    return value === true || value === "true" || value === "1" || value === 1;
  }

  prefersReducedMotion() {
    if (typeof this.window?.matchMedia !== "function") {
      return false;
    }
    try {
      return Boolean(this.window.matchMedia("(prefers-reduced-motion: reduce)")?.matches);
    } catch {
      return false;
    }
  }

  getVisibleHistory(kind) {
    return (this.dataset?.history?.[kind] ?? []).filter((point) => this.isVisibleHistoryPoint(kind, point));
  }

  getVisibleWakeLinks() {
    return (this.dataset?.wakeLinks ?? []).filter(
      (link) => Number(link.sourceDepth) <= this.retainedDepthLimit && Number(link.receiverDepth) <= this.retainedDepthLimit,
    );
  }

  getVisibleWakeSeries(replayTime = this.getCurrentReplayTime()) {
    if (this.dataset?.causalEvaluation?.enabled === false) {
      return [];
    }
    const time = Number(replayTime);
    if (
      this.visibleWakeSeriesCache?.datasetRevision === this.datasetRevision &&
      Math.abs(this.visibleWakeSeriesCache.replayTime - time) <= TIME_EPSILON
    ) {
      return this.visibleWakeSeriesCache.series;
    }
    const series = ARCHITRINO_KINDS
      .map((sourceKind) => this.createLiveWakeSeries(sourceKind, replayTime))
      .filter(Boolean);
    this.visibleWakeSeriesCache = {
      datasetRevision: this.datasetRevision,
      replayTime: time,
      series,
    };
    return series;
  }

  createLiveWakeSeries(sourceKind, replayTime = this.getCurrentReplayTime()) {
    const receiverKind = this.getOppositeArchitrinoKind(sourceKind);
    if (!receiverKind) {
      return null;
    }
    const receiver = this.getTraversalPathPoint(receiverKind, replayTime);
    const signalSpeed = this.getLiveWakeSignalSpeed();
    const emission = this.solveLiveWakeEmissionPoint(sourceKind, receiver, replayTime, signalSpeed);
    if (!emission) {
      return null;
    }
    const source = emission.source;
    const distance = getDistance(source, receiver);
    return {
      id: `live-${sourceKind}-to-${receiverKind}`,
      label: `${sourceKind} wake -> ${receiverKind} now`,
      sourceKind,
      receiverKind,
      source,
      receiver,
      color: this.getWakeColorForKind(sourceKind),
      weight: 1,
      signalSpeed,
      distance,
      emissionTime: source.t,
      hitTime: receiver.t,
      travelTime: receiver.t - source.t,
      liveWakeSeries: true,
      rootResidual: emission.residual,
    };
  }

  getOppositeArchitrinoKind(kind) {
    if (kind === "positrino") {
      return "electrino";
    }
    if (kind === "electrino") {
      return "positrino";
    }
    return null;
  }

  getLiveWakeSignalSpeed() {
    const summarySignalSpeed = Number(this.dataset?.solverSummary?.signalSpeed);
    const datasetSignalSpeed = Number(this.dataset?.signalSpeed);
    const baseSignalSpeed =
      Number.isFinite(datasetSignalSpeed) && datasetSignalSpeed > 0
        ? datasetSignalSpeed
        : Number.isFinite(summarySignalSpeed) && summarySignalSpeed > 0
          ? summarySignalSpeed
          : DEFAULT_LIVE_WAKE_SIGNAL_SPEED;
    return baseSignalSpeed;
  }

  solveLiveWakeEmissionPoint(
    sourceKind,
    receiver,
    replayTime,
    signalSpeed,
    sourcePath = this.dataset?.paths?.[sourceKind] ?? [],
  ) {
    const now = Number(replayTime);
    const speed = Number(signalSpeed);
    if (!Number.isFinite(now) || !Number.isFinite(speed) || speed <= 0) {
      return null;
    }
    const [pathStart] = getTimedPathRange(sourcePath);
    if (!Number.isFinite(pathStart) || now <= pathStart + TIME_EPSILON) {
      return null;
    }
    const receiverKind = this.getOppositeArchitrinoKind(sourceKind) ?? `${sourceKind}-receiver`;
    const evaluation = evaluateCausalRoots({
      sourceId: sourceKind,
      receiverId: receiverKind,
      sourcePath,
      receiverPath: [
        { ...receiver, t: pathStart },
        { ...receiver, t: now },
      ],
      receiverTime: now,
      signalSpeed: NORMALIZED_FIELD_SPEED,
      distanceScale: 1 / speed,
      scanSteps: LIVE_WAKE_ROOT_SCAN_STEPS,
    });
    const root = evaluation.acceptedRoots.at(-1);
    return root ? { source: root.emission, residual: root.residual, root } : null;
  }

  isSelectionVisible() {
    if (!this.selectedItem) {
      return true;
    }
    if (this.selectedItem.type === "history") {
      return this.isVisibleHistoryDepth(this.selectedItem.kind, this.selectedItem.depth);
    }
    if (this.selectedItem.type === "wake") {
      return this.getVisibleWakeSeries().some((link) => link.id === this.selectedItem.linkId);
    }
    return true;
  }

  isVisibleHistoryPoint(kind, point) {
    return this.isVisibleHistoryDepth(kind, point?.depth);
  }

  isVisibleHistoryDepth(kind, depth) {
    const numericDepth = Number(depth);
    if (!Number.isFinite(numericDepth)) {
      return false;
    }
    return numericDepth <= this.retainedDepthLimit || numericDepth === 1 || numericDepth === this.getMaxHistoryDepth(kind);
  }

  getMaxHistoryDepth(kind) {
    const depths = (this.dataset?.history?.[kind] ?? [])
      .map((point) => Number(point.depth))
      .filter(Number.isFinite);
    return depths.length > 0 ? Math.max(...depths) : 0;
  }

  setPlaying(isPlaying, {
    holdScene = null,
    holdReplayTime = null,
    restartStory = false,
    completed = false,
  } = {}) {
    const wantsPlayback = Boolean(isPlaying);
    const wasPlaying = this.isPlaying;
    const storyMode = this.learnerState?.mode === "story";
    const laboratoryMode = this.learnerState?.mode === "sandbox";
    let storyRenderTime = null;

    if (
      wantsPlayback &&
      storyMode &&
      !restartStory &&
      this.learnerState.playback.completed
    ) {
      this.isPlaying = false;
      this.learnerState.playback.playing = false;
      this.updatePlayButton();
      this.modeController?.render();
      return false;
    }

    if (wantsPlayback && laboratoryMode) {
      const [, endTime] = this.getReplayTimeRange();
      if (this.getCurrentReplayTime() >= endTime - TIME_EPSILON) {
        this.setCurrentReplayTime(this.getLaboratoryInitialReplayTime());
        this.updateNowControl(this.getLaboratoryInitialReplayTime());
      }
    }

    this.isPlaying = wantsPlayback;
    if (this.isPlaying && storyMode) {
      const currentScene = createStoryScene(this.learnerState);
      const resumableFrame =
        !restartStory &&
        !wasPlaying &&
        this.learnerState.playback.resumable &&
        this.storyHeldFrame?.scene?.id === currentScene.id
          ? this.storyHeldFrame
          : null;
      if (resumableFrame) {
        this.storyPlaybackScene = resumableFrame.scene;
        this.storyStageElapsedSeconds = this.getStoryStageElapsedSeconds(
          resumableFrame.scene,
          resumableFrame.replayTime,
        );
        storyRenderTime = resumableFrame.replayTime;
      } else if (!wasPlaying || restartStory) {
        this.storyStageElapsedSeconds = 0;
        this.storyPlaybackScene = currentScene;
        storyRenderTime = currentScene.playbackStartTime;
      }
      this.storyHeldFrame = null;
      this.learnerState.playback.resumable = false;
      this.learnerState.playback.completed = false;
    } else if (!this.isPlaying && storyMode) {
      const explicitHold =
        holdScene && Number.isFinite(holdReplayTime)
          ? { scene: holdScene, replayTime: holdReplayTime }
          : null;
      const currentFrame =
        wasPlaying && this.storyPlaybackScene
          ? this.getStoryPlaybackFrame(this.storyPlaybackScene)
          : null;
      this.storyHeldFrame = explicitHold ?? currentFrame ?? this.storyHeldFrame ?? null;
      this.storyPlaybackScene = null;
      this.learnerState.playback.completed = Boolean(completed);
      this.learnerState.playback.resumable =
        Boolean(this.storyHeldFrame) && !this.learnerState.playback.completed;
    } else if (!storyMode) {
      this.storyHeldFrame = null;
      this.storyPlaybackScene = null;
      this.learnerState.playback.resumable = false;
      this.learnerState.playback.completed = false;
    }
    if (this.learnerState) {
      this.learnerState.playback.playing = this.isPlaying;
    }
    this.updatePlayButton();
    this.modeController?.render();
    if (this.isPlaying) {
      if (
        storyMode &&
        this.context &&
        Number.isFinite(storyRenderTime)
      ) {
        this.render(storyRenderTime);
      }
      this.scheduleAnimationFrame();
    }
    return true;
  }

  resetStoryScenarioPlayback() {
    if (this.learnerState.storyStep === 1) {
      const [startTime, endTime] = this.getReplayTimeRange();
      this.refreshLearnerState({
        receiverTime:
          startTime +
          (endTime - startTime) * STORY_TWO_THREE_HANDOFF_PATH_PROGRESS,
      });
    }
    let scene = createStoryScene(this.learnerState);
    if (
      this.learnerState.storyStep === 0 &&
      Math.abs(this.learnerState.receiverTime - scene.playbackStartTime) >
        TIME_EPSILON
    ) {
      this.refreshLearnerState({ receiverTime: scene.playbackStartTime });
      this.modeController?.setState?.(this.learnerState);
      scene = createStoryScene(this.learnerState);
    }
    this.isPlaying = false;
    this.storyStageElapsedSeconds = 0;
    this.storyHeldFrame = null;
    this.storyPlaybackScene = null;
    this.learnerState.playback.playing = false;
    this.learnerState.playback.resumable = false;
    this.learnerState.playback.completed = false;
    this.setGuidedReplayCursor(scene.playbackStartTime);
    this.updatePlayButton();
    this.modeController?.render();
    if (this.context) {
      this.render(scene.playbackStartTime);
    }
    return scene;
  }

  handleLearnerStateChange() {
    const storyStep = Number(this.learnerState?.storyStep);
    const didStoryStepChange =
      this.learnerState?.mode === "story" &&
      Number.isInteger(storyStep) &&
      storyStep !== this.lastStoryStep;
    this.lastStoryStep = storyStep;
    const storyMotionSpeedFraction =
      Number(this.learnerState?.storyMotionSpeedFraction);
    const didStoryMotionSpeedChange =
      this.learnerState?.mode === "story" &&
      this.learnerState?.storyStep === 3 &&
      Number.isFinite(storyMotionSpeedFraction) &&
      storyMotionSpeedFraction !== this.lastStoryMotionSpeedFraction;
    this.lastStoryMotionSpeedFraction = storyMotionSpeedFraction;
    if (didStoryStepChange || didStoryMotionSpeedChange) {
      this.resetStoryScenarioPlayback();
      return;
    }
    this.updatePlayButton();
    this.render();
  }

  getStoryPlaybackFrame(scene = this.storyPlaybackScene) {
    if (!scene) {
      return null;
    }
    const duration = Math.max(
      TIME_EPSILON,
      Number(scene.playbackDurationSeconds) || STORY_STAGE_PLAYBACK_SECONDS,
    );
    const progress = clamp(
      (Number(this.storyStageElapsedSeconds) || 0) / duration,
      0,
      1,
    );
    const stopProgress = clamp(scene.autoPauseProgress ?? 1, 0, 1);
    const displayProgress = Math.min(progress, stopProgress);
    return {
      scene,
      replayTime:
        scene.playbackStartTime +
        (scene.playbackEndTime - scene.playbackStartTime) * displayProgress,
    };
  }

  getStoryStageElapsedSeconds(scene, replayTime) {
    const replaySpan = scene.playbackEndTime - scene.playbackStartTime;
    const progress = replaySpan > TIME_EPSILON
      ? clamp((replayTime - scene.playbackStartTime) / replaySpan, 0, 1)
      : 0;
    return progress *
      (Number(scene.playbackDurationSeconds) || STORY_STAGE_PLAYBACK_SECONDS);
  }

  updatePlayButton() {
    if (this.dom?.playButton) {
      const storyPlayback = this.learnerState?.mode === "story";
      const resumable = storyPlayback && this.learnerState.playback.resumable;
      const completed = storyPlayback && this.learnerState.playback.completed;
      const label = this.isPlaying
        ? "Pause replay"
        : resumable
          ? "Resume replay"
          : completed
            ? "Lesson complete; use First frame to return to the start"
            : "Play replay";
      this.dom.playButton.disabled = completed;
      this.dom.playButton.classList?.toggle("is-active", this.isPlaying);
      setTransportControlButtonPresentation(this.dom.playButton, {
        kind: this.isPlaying ? TRANSPORT_CONTROL_ICON.PAUSE : TRANSPORT_CONTROL_ICON.PLAY,
        label,
        pressed: this.isPlaying,
      });
      this.dom.playButton.setAttribute("aria-keyshortcuts", "Space");
    }
    if (this.dom?.resetButton) {
      setTransportControlButtonPresentation(this.dom.resetButton, {
        kind: TRANSPORT_CONTROL_ICON.FIRST_FRAME,
        label: "First frame",
      });
    }
    if (this.dom?.lastFrameButton) {
      setTransportControlButtonPresentation(this.dom.lastFrameButton, {
        kind: TRANSPORT_CONTROL_ICON.LAST_FRAME,
        label: "Last frame",
      });
    }
  }

  resetReplayTime() {
    this.elapsedSeconds = 0;
    if (this.learnerState?.mode === "story") {
      this.resetStoryScenarioPlayback();
      return;
    }
    const startTime = this.learnerState?.mode === "sandbox"
      ? this.getLaboratoryInitialReplayTime()
      : this.getReplayTimeRange()[0];
    this.setPlaying(false);
    this.setCurrentReplayTime(startTime);
    this.updateNowControl(startTime);
    if (this.dom?.readout) {
      this.updateReadout();
    }
    if (this.context) {
      this.render(startTime);
    }
  }

  getLaboratoryInitialReplayTime() {
    return this.getLaboratoryInitialReplayState().time;
  }

  getLaboratoryInitialReplayState() {
    if (
      this.laboratoryInitialReplayStateCache?.datasetRevision ===
      this.datasetRevision
    ) {
      return this.laboratoryInitialReplayStateCache;
    }
    const [startTime, endTime] = this.getReplayTimeRange();
    const directedFirstVisibilityTimes = Object.fromEntries(
      ARCHITRINO_KINDS.map((sourceKind) => [
        sourceKind,
        this.findFirstVisibleLaboratoryWakeTime(
          sourceKind,
          startTime,
          endTime,
        ),
      ]),
    );
    const firstVisibilityTimes = Object.values(directedFirstVisibilityTimes);
    const hasReciprocalVisibility = firstVisibilityTimes.every(Number.isFinite);
    const time = hasReciprocalVisibility
      ? Math.max(...firstVisibilityTimes)
      : endTime;
    this.laboratoryInitialReplayStateCache = {
      datasetRevision: this.datasetRevision,
      time,
      hasReciprocalVisibility,
      directedFirstVisibilityTimes,
    };
    return this.laboratoryInitialReplayStateCache;
  }

  findFirstVisibleLaboratoryWakeTime(sourceKind, startTime, endTime) {
    const start = Number(startTime);
    const end = Number(endTime);
    if (
      !ARCHITRINO_KINDS.includes(sourceKind) ||
      !Number.isFinite(start) ||
      !Number.isFinite(end) ||
      end <= start
    ) {
      return Number.NaN;
    }
    const isVisible = (replayTime) => {
      const link = this.createLiveWakeSeries(sourceKind, replayTime);
      return Boolean(
        link &&
        this.hasVisibleLaboratoryWakeArcGeometry(link, replayTime),
      );
    };
    if (isVisible(start)) {
      return start;
    }
    let previousTime = start;
    for (
      let step = 1;
      step <= LABORATORY_ENTRY_VISIBILITY_SCAN_STEPS;
      step += 1
    ) {
      const candidateTime =
        start +
        (end - start) *
          (step / LABORATORY_ENTRY_VISIBILITY_SCAN_STEPS);
      if (!isVisible(candidateTime)) {
        previousTime = candidateTime;
        continue;
      }
      let lower = previousTime;
      let upper = candidateTime;
      for (
        let refinement = 0;
        refinement < LABORATORY_ENTRY_VISIBILITY_REFINEMENT_STEPS;
        refinement += 1
      ) {
        const middle = (lower + upper) * 0.5;
        if (isVisible(middle)) {
          upper = middle;
        } else {
          lower = middle;
        }
      }
      return upper;
    }
    return Number.NaN;
  }

  hasVisibleLaboratoryWakeArcGeometry(link, replayTime) {
    const timing = this.getWakeTiming(link, replayTime);
    if (!this.shouldDrawWakeSeries(timing)) {
      return false;
    }
    const radius = getDistance(timing.source, timing.receiver);
    if (!Number.isFinite(radius) || radius <= TIME_EPSILON) {
      return false;
    }
    const frontProgresses = this.getWakeFrontProgresses(timing, link);
    if (frontProgresses.length === 0) {
      return false;
    }
    const theta = getAngleDegrees(timing.source, timing.receiver);
    const wakeSpan = this.getWakeVisualStyle().finalSpan;
    const margin = Math.max(1, FIXED_WAKE_VISUAL_STYLE.dotRadius);
    return frontProgresses.some((progress) => {
      const bandRadius = radius * progress;
      for (
        let sample = 0;
        sample <= LABORATORY_ENTRY_ARC_ANGLE_SAMPLES;
        sample += 1
      ) {
        const angle =
          theta -
          wakeSpan * 0.5 +
          wakeSpan *
            (sample / LABORATORY_ENTRY_ARC_ANGLE_SAMPLES);
        const radians = angle * Math.PI / 180;
        const point = {
          x: timing.source.x + Math.cos(radians) * bandRadius,
          y: timing.source.y + Math.sin(radians) * bandRadius,
        };
        if (
          point.x >= -margin &&
          point.x <= DESIGN_WIDTH + margin &&
          point.y >= -margin &&
          point.y <= DESIGN_HEIGHT + margin
        ) {
          return true;
        }
      }
      return false;
    });
  }

  resetLaboratoryScenarioPlayback() {
    const replayTime = this.getLaboratoryInitialReplayTime();
    this.isPlaying = false;
    this.learnerState.playback.playing = false;
    this.learnerState.playback.resumable = false;
    this.learnerState.playback.completed = false;
    this.setCurrentReplayTime(replayTime);
    this.updateNowControl(replayTime);
    this.updatePlayButton();
    if (this.dom?.readout) {
      this.updateReadout();
    }
    if (this.context) {
      this.render(replayTime);
    }
    return replayTime;
  }

  jumpToLastFrame() {
    if (this.learnerState?.mode === "story") {
      const scene = createStoryScene(this.learnerState);
      this.storyStageElapsedSeconds =
        Number(scene.playbackDurationSeconds) || STORY_STAGE_PLAYBACK_SECONDS;
      this.setPlaying(false, {
        holdScene: scene,
        holdReplayTime: scene.playbackEndTime,
        completed: true,
      });
      this.setGuidedReplayCursor(scene.playbackEndTime);
      if (this.context) {
        this.render(scene.playbackEndTime);
      }
      return scene.playbackEndTime;
    }
    const [, endTime] = this.getReplayTimeRange();
    this.setPlaying(false);
    this.setCurrentReplayTime(endTime);
    this.updateNowControl(endTime);
    if (this.dom?.readout) {
      this.updateReadout();
    }
    if (this.context) {
      this.render(endTime);
    }
    return endTime;
  }

  setReplayNowSliderValue(value) {
    const numericValue = Number(value);
    const sliderValue = Number.isFinite(numericValue) ? clamp(numericValue, 0, NOW_SLIDER_MAX) : 0;
    const [start, end] = this.getReplayTimeRange();
    const span = end - start;
    const replayTime = span > 0 ? start + span * (sliderValue / NOW_SLIDER_MAX) : start;
    let nextReplayTime = replayTime;
    if (this.learnerState?.mode === "story") {
      const scene = createStoryScene(this.learnerState);
      const storyReplayTime = clamp(
        replayTime,
        scene.playbackStartTime,
        scene.playbackEndTime,
      );
      nextReplayTime = storyReplayTime;
      this.storyStageElapsedSeconds = this.getStoryStageElapsedSeconds(
        scene,
        storyReplayTime,
      );
      this.setPlaying(false, {
        holdScene: scene,
        holdReplayTime: storyReplayTime,
        completed: storyReplayTime >= scene.playbackEndTime - TIME_EPSILON,
      });
    } else {
      this.setPlaying(false);
    }
    this.setCurrentReplayTime(nextReplayTime);
    this.updateNowControl(nextReplayTime);
    if (this.context) {
      this.render(nextReplayTime);
    }
    if (this.dom?.readout) {
      this.updateReadout();
    }
    return nextReplayTime;
  }

  setCurrentReplayTime(replayTime) {
    const [start, end] = this.getReplayTimeRange();
    const span = end - start;
    if (!Number.isFinite(span) || span <= 0) {
      this.elapsedSeconds = 0;
      return;
    }
    const numericReplayTime = Number(replayTime);
    const nextTime = Number.isFinite(numericReplayTime) ? clamp(numericReplayTime, start, end) : start;
    const phase = clamp((nextTime - start) / span, 0, 1);
    const loopSeconds = this.getReplayLoopSeconds();
    this.elapsedSeconds = phase >= 1
      ? loopSeconds - TIME_EPSILON
      : phase * loopSeconds;
    this.refreshLearnerState({ receiverTime: nextTime });
    this.modeController?.setState(this.learnerState);
  }

  updateNowControl(replayTime = this.getCurrentReplayTime()) {
    if (!this.dom?.nowInput) {
      return;
    }
    const [start, end] = this.getReplayTimeRange();
    const span = end - start;
    const phase = span > 0 ? clamp((replayTime - start) / span, 0, 1) : 0;
    this.dom.nowInput.value = String(Math.round(phase * NOW_SLIDER_MAX));
    const replayTimeLabel = `Replay time ${formatCompactNumber(replayTime)}`;
    this.dom.nowInput.setAttribute("aria-valuetext", replayTimeLabel);
    if (this.dom.nowValue) {
      this.dom.nowValue.textContent = replayTimeLabel;
    }
  }

  handleKeyDown(event) {
    if (SPACE_KEYS.has(event.key) || SPACE_KEYS.has(event.code)) {
      if (this.shouldIgnoreKeyboardShortcutTarget(event.target)) {
        return;
      }
      event.preventDefault();
      this.setPlaying(!this.isPlaying);
      return;
    }

    const stepDirection = REPLAY_STEP_KEYS[event.key] ?? REPLAY_STEP_KEYS[event.code] ?? 0;
    if (stepDirection === 0) {
      return;
    }
    if (this.shouldIgnoreKeyboardShortcutTarget(event.target)) {
      return;
    }
    if (this.stepReplayFrame(stepDirection)) {
      event.preventDefault();
    }
  }

  shouldIgnoreKeyboardShortcutTarget(target) {
    if (!target) {
      return false;
    }
    if (target.isContentEditable) {
      return true;
    }
    const tagName = String(target.tagName ?? "").toUpperCase();
    return SPACEBAR_NATIVE_CONTROL_TAGS.has(tagName);
  }

  stepReplayFrame(direction) {
    const step = Math.sign(Number(direction) || 0);
    if (step === 0) {
      return false;
    }
    const times = this.getReplayFrameStepTimes();
    if (times.length === 0) {
      return false;
    }
    const currentTime = this.getCurrentReplayTime();
    const nextTime =
      step > 0
        ? times.find((time) => time > currentTime + TIME_EPSILON) ?? times[0]
        : [...times].reverse().find((time) => time < currentTime - TIME_EPSILON) ?? times.at(-1);
    this.setPlaying(false);
    this.setCurrentReplayTime(nextTime);
    this.updateNowControl(nextTime);
    if (this.context) {
      this.render(nextTime);
    }
    if (this.dom?.readout) {
      this.updateReadout();
    }
    return true;
  }

  getReplayFrameStepTimes() {
    if (this.replayFrameTimesCache) {
      return this.replayFrameTimesCache;
    }
    const frameTimes = (this.dataset?.frames ?? [])
      .map((frame) => Number(frame.t))
      .filter(Number.isFinite);
    if (frameTimes.length === 0) {
      this.replayFrameTimesCache = [];
      return this.replayFrameTimesCache;
    }
    frameTimes.sort((left, right) => left - right);
    this.replayFrameTimesCache = frameTimes.filter(
      (time, index, rows) => index === 0 || Math.abs(time - rows[index - 1]) > TIME_EPSILON,
    );
    return this.replayFrameTimesCache;
  }

  resize() {
    const rect = this.dom.canvas.getBoundingClientRect();
    this.pixelRatio = Math.max(1, Math.min(2, this.window.devicePixelRatio || 1));
    const width = Math.max(1, Math.round(rect.width * this.pixelRatio));
    const height = Math.max(1, Math.round(rect.height * this.pixelRatio));
    if (this.dom.canvas.width !== width || this.dom.canvas.height !== height) {
      this.dom.canvas.width = width;
      this.dom.canvas.height = height;
    }
    this.canvasWidth = rect.width;
    this.canvasHeight = rect.height;
    this.viewport = createViewport(this.canvasWidth, this.canvasHeight, this.viewportZoom);
    this.render();
  }

  start() {
    this.destroyed = false;
    this.lastFrameTime = this.window.performance.now();
    this.scheduleAnimationFrame();
  }

  scheduleAnimationFrame() {
    if (
      this.destroyed ||
      this.animationFrame !== null ||
      typeof this.window?.requestAnimationFrame !== "function"
    ) {
      return;
    }
    this.animationFrame = this.window.requestAnimationFrame((time) => this.tick(time));
  }

  tick(time) {
    this.animationFrame = null;
    if (this.destroyed) {
      return;
    }
    const deltaSeconds = Math.min(0.06, Math.max(0, (time - this.lastFrameTime) / 1000));
    this.lastFrameTime = time;
    if (this.isPlaying) {
      if (this.learnerState?.mode === "story") {
        const scene = this.storyPlaybackScene ?? createStoryScene(this.learnerState);
        const playbackDurationSeconds =
          scene.playbackDurationSeconds ?? STORY_STAGE_PLAYBACK_SECONDS;
        this.storyStageElapsedSeconds = Math.min(
          playbackDurationSeconds,
          (this.storyStageElapsedSeconds ?? 0) +
            deltaSeconds * this.fieldSpeedScale,
        );
        const progress = clamp(
          this.storyStageElapsedSeconds /
            playbackDurationSeconds,
          0,
          1,
        );
        const stopProgress = clamp(scene.autoPauseProgress ?? 1, 0, 1);
        const displayProgress = Math.min(progress, stopProgress);
        const replayTime =
          scene.playbackStartTime +
          (scene.playbackEndTime - scene.playbackStartTime) * displayProgress;
        this.render(replayTime);
        if (progress >= stopProgress) {
          this.setPlaying(false, {
            holdScene: scene,
            holdReplayTime: replayTime,
            completed: true,
          });
        }
        this.scheduleAnimationFrame();
        return;
      }
      this.elapsedSeconds += deltaSeconds * this.fieldSpeedScale;
      const replayTime = this.getCurrentReplayTime();
      const shouldRefreshLearnerPanel =
        this.learnerState?.mode !== "sandbox" &&
        time - (this.lastLearnerPanelUpdate ?? 0) >= 120;
      if (shouldRefreshLearnerPanel) {
        this.lastLearnerPanelUpdate = time;
        this.refreshLearnerState({ receiverTime: replayTime });
      }
      this.updateNowControl(replayTime);
      this.render(replayTime);
      if (shouldRefreshLearnerPanel) {
        this.modeController?.renderLiveState();
      }
      if (this.dom?.readout) {
        this.updateReadout();
      }
      if (
        this.learnerState?.mode === "sandbox" &&
        this.elapsedSeconds >= this.getReplayLoopSeconds() - TIME_EPSILON
      ) {
        this.elapsedSeconds = this.getReplayLoopSeconds();
        this.setPlaying(false);
      }
    }
    if (this.isPlaying) {
      this.scheduleAnimationFrame();
    }
  }

  destroy() {
    this.destroyed = true;
    this.replayLoadSequence += 1;
    if (this.animationFrame !== null) {
      this.window.cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    this.eventListeners.forEach(({ target, type, handler, options }) => {
      target.removeEventListener(type, handler, options);
    });
    this.eventListeners = [];
    this.dragState = null;
    this.clearBackgroundPointers();
    this.modeController?.destroy();
  }

  worldToScreen(point) {
    return {
      x: this.viewport.offsetX + point.x * this.viewport.scale,
      y: this.viewport.offsetY + point.y * this.viewport.scale,
    };
  }

  getStoryChartDesignBounds() {
    const points = [
      { x: TIME_AXIS_ORIGIN_X, y: SPACE_AXIS_TOP_Y },
      { x: TIME_AXIS_END_X, y: TIME_AXIS_BASELINE_Y },
      { x: 74, y: 165 },
      { x: 1788, y: 932 },
      ...(this.learnerState?.paths?.positrino ?? []),
      ...(this.learnerState?.paths?.electrino ?? []),
    ];
    const finitePoints = points.filter(
      (point) => Number.isFinite(Number(point?.x)) && Number.isFinite(Number(point?.y)),
    );
    if (finitePoints.length === 0) {
      return {
        minX: 0,
        maxX: DESIGN_WIDTH,
        minY: 0,
        maxY: DESIGN_HEIGHT,
      };
    }
    return {
      minX: Math.min(...finitePoints.map((point) => Number(point.x))) - STORY_CHART_DESIGN_PADDING,
      maxX: Math.max(...finitePoints.map((point) => Number(point.x))) + STORY_CHART_DESIGN_PADDING,
      minY: Math.min(...finitePoints.map((point) => Number(point.y))) - STORY_CHART_DESIGN_PADDING,
      maxY: Math.max(...finitePoints.map((point) => Number(point.y))) + STORY_CHART_DESIGN_PADDING,
    };
  }

  createStoryChartViewport() {
    const panel = this.modeController?.dom?.panel;
    const tabs = this.modeController?.dom?.tabs;
    const canvas = this.dom?.canvas;
    const bottomRail = this.dom?.bottomRail;
    if (
      typeof panel?.getBoundingClientRect !== "function" ||
      typeof canvas?.getBoundingClientRect !== "function"
    ) {
      return createViewport(this.canvasWidth, this.canvasHeight, VIEWPORT_ZOOM_MIN);
    }
    const panelRect = panel.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const railRect = typeof bottomRail?.getBoundingClientRect === "function"
      ? bottomRail.getBoundingClientRect()
      : null;
    const tabsRect = typeof tabs?.getBoundingClientRect === "function"
      ? tabs.getBoundingClientRect()
      : null;
    const isNarrow = this.canvasWidth <= 820;
    const panelSafeBottom = Number(panelRect.top) +
      STORY_DESKTOP_PANEL_TEMPLATE_HEIGHT;
    const chartLeft = STORY_CHART_EDGE_PADDING;
    const chartRight = this.canvasWidth - STORY_CHART_EDGE_PADDING;
    const chartTop = isNarrow
      ? Math.max(
        STORY_CHART_EDGE_PADDING,
        Number(tabsRect?.bottom ?? canvasRect.top) - canvasRect.top + STORY_CHART_GAP,
      )
      : Math.max(
        STORY_CHART_EDGE_PADDING,
        panelSafeBottom - canvasRect.top + STORY_CHART_GAP,
      );
    const railSafeTop = railRect
      ? Number(railRect.top) - canvasRect.top - STORY_CHART_GAP
      : this.canvasHeight - STORY_CHART_EDGE_PADDING;
    const chartBottom = isNarrow
      ? Math.min(
        this.canvasHeight - STORY_CHART_EDGE_PADDING,
        Number(panelRect.top) - canvasRect.top - STORY_CHART_GAP,
        railSafeTop,
      )
      : Math.min(
        this.canvasHeight - STORY_CHART_EDGE_PADDING,
        railSafeTop,
      );
    const availableWidth = Math.max(1, chartRight - chartLeft);
    const availableHeight = Math.max(1, chartBottom - chartTop);
    const bounds = this.getStoryChartDesignBounds();
    const designWidth = Math.max(1, bounds.maxX - bounds.minX);
    const designHeight = Math.max(1, bounds.maxY - bounds.minY);
    const baseScale = Math.min(this.canvasWidth / DESIGN_WIDTH, this.canvasHeight / DESIGN_HEIGHT);
    const scale = Math.max(
      0.01,
      Math.min(baseScale, availableWidth / designWidth, availableHeight / designHeight),
    );
    return {
      scale,
      offsetX:
        chartLeft +
        (availableWidth - designWidth * scale) * 0.5 -
        bounds.minX * scale,
      offsetY:
        chartTop +
        (availableHeight - designHeight * scale) * 0.5 -
        bounds.minY * scale,
      baseScale,
      zoom: VIEWPORT_ZOOM_MIN,
      chartBounds: {
        left: chartLeft,
        right: chartRight,
        top: chartTop,
        bottom: chartBottom,
      },
      designBounds: bounds,
    };
  }

  createLaboratoryViewport() {
    // Laboratory shares the Story chart frame. The lesson list and toolbar
    // are overlays; the chart still needs the same safe vertical window as
    // the standard lessons so its visible axes and curves do not shift.
    const canvas = this.dom?.canvas;
    const tabs = this.modeController?.dom?.tabs;
    const bottomRail = this.dom?.bottomRail;
    const canvasRect = typeof canvas?.getBoundingClientRect === "function"
      ? canvas.getBoundingClientRect()
      : null;
    const tabsRect = typeof tabs?.getBoundingClientRect === "function"
      ? tabs.getBoundingClientRect()
      : null;
    const railRect = typeof bottomRail?.getBoundingClientRect === "function"
      ? bottomRail.getBoundingClientRect()
      : null;
    const isNarrow = this.canvasWidth <= 820;
    const chartLeft = STORY_CHART_EDGE_PADDING;
    const chartRight = this.canvasWidth - STORY_CHART_EDGE_PADDING;
    const chartTop = isNarrow
      ? Math.max(
        STORY_CHART_EDGE_PADDING,
        Number(tabsRect?.bottom ?? canvasRect?.top ?? 0) - Number(canvasRect?.top ?? 0) + STORY_CHART_GAP,
      )
      : Math.max(
        STORY_CHART_EDGE_PADDING,
        (this.canvasWidth >= 1380 ? 12 : 70) + STORY_DESKTOP_PANEL_TEMPLATE_HEIGHT + STORY_CHART_GAP,
      );
    const chartBottom = Math.min(
      this.canvasHeight - STORY_CHART_EDGE_PADDING,
      Number(railRect?.top ?? this.canvasHeight) - Number(canvasRect?.top ?? 0) - STORY_CHART_GAP,
    );
    const availableWidth = Math.max(1, chartRight - chartLeft);
    const availableHeight = Math.max(1, chartBottom - chartTop);
    const bounds = this.getStoryChartDesignBounds();
    const designWidth = Math.max(1, bounds.maxX - bounds.minX);
    const designHeight = Math.max(1, bounds.maxY - bounds.minY);
    const baseScale = Math.min(this.canvasWidth / DESIGN_WIDTH, this.canvasHeight / DESIGN_HEIGHT);
    const scale = Math.max(
      0.01,
      Math.min(baseScale, availableWidth / designWidth, availableHeight / designHeight),
    );
    return {
      scale,
      offsetX: chartLeft + (availableWidth - designWidth * scale) * 0.5 - bounds.minX * scale,
      offsetY: chartTop + (availableHeight - designHeight * scale) * 0.5 - bounds.minY * scale,
      baseScale,
      zoom: VIEWPORT_ZOOM_MIN,
      chartBounds: {
        left: chartLeft,
        right: chartRight,
        top: chartTop,
        bottom: chartBottom,
      },
      designBounds: bounds,
    };
  }

  createPanelAvoidingGuidedChartViewport() {
    const panel = this.modeController?.dom?.panel;
    const tabs = this.modeController?.dom?.tabs;
    const canvas = this.dom?.canvas;
    if (
      typeof panel?.getBoundingClientRect !== "function" ||
      typeof canvas?.getBoundingClientRect !== "function"
    ) {
      return createViewport(this.canvasWidth, this.canvasHeight, VIEWPORT_ZOOM_MIN);
    }
    const panelRect = panel.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const tabsRect = typeof tabs?.getBoundingClientRect === "function"
      ? tabs.getBoundingClientRect()
      : null;
    const isNarrow = this.canvasWidth <= 820;
    const chartLeft = isNarrow
      ? STORY_CHART_EDGE_PADDING
      : Math.max(
        STORY_CHART_EDGE_PADDING,
        Number(panelRect.right) - canvasRect.left + STORY_CHART_GAP,
      );
    const chartRight = this.canvasWidth - STORY_CHART_EDGE_PADDING;
    const chartTop = Math.max(
      STORY_CHART_EDGE_PADDING,
      Number(tabsRect?.bottom ?? canvasRect.top) - canvasRect.top + STORY_CHART_GAP,
    );
    const chartBottom = isNarrow
      ? Math.min(
        this.canvasHeight - STORY_CHART_EDGE_PADDING,
        Number(panelRect.top) - canvasRect.top - STORY_CHART_GAP,
      )
      : this.canvasHeight - STORY_CHART_EDGE_PADDING;
    const availableWidth = Math.max(1, chartRight - chartLeft);
    const availableHeight = Math.max(1, chartBottom - chartTop);
    const designWidth = DESIGN_WIDTH;
    const designHeight = DESIGN_HEIGHT;
    const baseScale = Math.min(this.canvasWidth / DESIGN_WIDTH, this.canvasHeight / DESIGN_HEIGHT);
    const scale = Math.max(
      0.01,
      Math.min(baseScale, availableWidth / designWidth, availableHeight / designHeight),
    );
    return {
      scale,
      offsetX: chartLeft + (availableWidth - designWidth * scale) * 0.5,
      offsetY: chartTop + (availableHeight - designHeight * scale) * 0.5,
      baseScale,
      zoom: VIEWPORT_ZOOM_MIN,
      chartBounds: {
        left: chartLeft,
        right: chartRight,
        top: chartTop,
        bottom: chartBottom,
      },
      designBounds: {
        minX: 0,
        maxX: DESIGN_WIDTH,
        minY: 0,
        maxY: DESIGN_HEIGHT,
      },
    };
  }

  updateViewportForRender() {
    if (this.learnerState?.mode === "story") {
      this.viewport = this.createStoryChartViewport();
      this.guidedViewportApplied = true;
      return;
    }
    if (this.learnerState?.mode && this.learnerState.mode !== "sandbox") {
      this.viewport = this.createPanelAvoidingGuidedChartViewport();
      this.guidedViewportApplied = true;
      return;
    }
    if (this.learnerState?.mode === "sandbox") {
      if (
        this.guidedViewportApplied ||
        Math.abs(this.viewportZoom - VIEWPORT_ZOOM_MIN) <= 1e-5
      ) {
        this.viewport = this.createLaboratoryViewport();
      }
      this.guidedViewportApplied = false;
    }
  }

  alignBottomRailToTimeAxis() {
    if (!this.dom?.bottomRail?.style || !this.viewport) {
      return null;
    }
    const axisOrigin = this.worldToScreen({
      x: TIME_AXIS_ORIGIN_X,
      y: TIME_AXIS_BASELINE_Y,
    });
    const axisArrowhead = this.worldToScreen({
      x: TIME_AXIS_END_X,
      y: TIME_AXIS_BASELINE_Y,
    });
    const left = clamp(axisOrigin.x, 0, this.canvasWidth);
    const rightEdge = clamp(
      axisArrowhead.x - TIMELINE_RAIL_AXIS_SAFE_INSET,
      left + 1,
      this.canvasWidth,
    );
    this.dom.bottomRail.style.left = `${left.toFixed(2)}px`;
    this.dom.bottomRail.style.right =
      `${Math.max(0, this.canvasWidth - rightEdge).toFixed(2)}px`;
    this.dom.bottomRail.dataset.axisAlignedBounds =
      `${left.toFixed(2)},${rightEdge.toFixed(2)}`;
    return { left, right: rightEdge };
  }

  screenToWorld(point) {
    return {
      x: (point.x - this.viewport.offsetX) / this.viewport.scale,
      y: (point.y - this.viewport.offsetY) / this.viewport.scale,
    };
  }

  zoomViewportAtScreenPoint(screen, deltaY) {
    if (!Number.isFinite(Number(deltaY)) || Number(deltaY) === 0) {
      return false;
    }
    const currentZoom = clamp(
      Number(this.viewportZoom ?? this.viewport?.zoom ?? VIEWPORT_ZOOM_MIN) || VIEWPORT_ZOOM_MIN,
      VIEWPORT_ZOOM_MIN,
      VIEWPORT_ZOOM_MAX,
    );
    const nextZoom = clamp(
      currentZoom * Math.exp(-Number(deltaY) * WHEEL_ZOOM_SENSITIVITY),
      VIEWPORT_ZOOM_MIN,
      VIEWPORT_ZOOM_MAX,
    );
    return this.setViewportZoomAtScreenPoint(screen, nextZoom, currentZoom);
  }

  setViewportZoomAtScreenPoint(screen, nextZoom, currentZoom = this.viewportZoom) {
    return this.setViewportZoomWithAnchorWorld(screen, this.screenToWorld(screen), nextZoom, currentZoom);
  }

  setViewportZoomWithAnchorWorld(screen, anchorWorld, nextZoom, currentZoom = this.viewportZoom) {
    const normalizedCurrentZoom = clamp(
      Number(currentZoom ?? this.viewport?.zoom ?? VIEWPORT_ZOOM_MIN) || VIEWPORT_ZOOM_MIN,
      VIEWPORT_ZOOM_MIN,
      VIEWPORT_ZOOM_MAX,
    );
    const normalizedNextZoom = clamp(
      Number(nextZoom) || VIEWPORT_ZOOM_MIN,
      VIEWPORT_ZOOM_MIN,
      VIEWPORT_ZOOM_MAX,
    );
    if (Math.abs(normalizedNextZoom - normalizedCurrentZoom) <= 1e-5) {
      return false;
    }
    const baseScale =
      Number(this.viewport?.baseScale) ||
      Math.min(this.canvasWidth / DESIGN_WIDTH, this.canvasHeight / DESIGN_HEIGHT);
    this.viewportZoom = normalizedNextZoom;
    if (Math.abs(normalizedNextZoom - VIEWPORT_ZOOM_MIN) <= 1e-5) {
      this.viewport = createViewport(this.canvasWidth, this.canvasHeight, this.viewportZoom);
      return true;
    }
    const scale = baseScale * normalizedNextZoom;
    this.viewport = {
      scale,
      offsetX: screen.x - anchorWorld.x * scale,
      offsetY: screen.y - anchorWorld.y * scale,
      baseScale,
      zoom: normalizedNextZoom,
    };
    return true;
  }

  pointerKey(event) {
    return event?.pointerId ?? "mouse";
  }

  canvasScreenPointFromEvent(event) {
    const rect = this.dom.canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  getPinchPoints() {
    return [...this.backgroundPointers.entries()].slice(0, 2);
  }

  getPinchGeometry() {
    const points = this.getPinchPoints();
    if (points.length < 2) {
      return null;
    }
    const first = points[0][1];
    const second = points[1][1];
    return {
      distance: Math.hypot(second.x - first.x, second.y - first.y),
      center: {
        x: (first.x + second.x) * 0.5,
        y: (first.y + second.y) * 0.5,
      },
    };
  }

  createPinchState() {
    const geometry = this.getPinchGeometry();
    if (!geometry || geometry.distance <= 0) {
      return null;
    }
    return {
      startDistance: geometry.distance,
      startZoom: this.viewportZoom ?? VIEWPORT_ZOOM_MIN,
      anchorWorld: this.screenToWorld(geometry.center),
    };
  }

  clearBackgroundPointers() {
    this.backgroundPointers.clear();
    this.pinchState = null;
  }

  releaseCanvasPointer(event) {
    const key = this.pointerKey(event);
    if (!this.backgroundPointers.has(key)) {
      return;
    }
    this.backgroundPointers.delete(key);
    this.pinchState = this.backgroundPointers.size >= 2 ? this.createPinchState() : null;
  }

  render(replayTime = this.getCurrentReplayTime()) {
    const ctx = this.context;
    this.updateViewportForRender();
    this.alignBottomRailToTimeAxis();
    ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawBackground(ctx);
    if (this.dom?.canvas) {
      this.dom.canvas.dataset.transmissionPointMarkerVariant =
        this.transmissionPointMarkerVariant;
    }
    if (this.learnerState?.mode !== "sandbox") {
      const storyScene = this.learnerState.mode === "story"
        ? createStoryScene(this.learnerState)
        : null;
      const sceneId = storyScene
        ? `story:${storyScene.id}`
        : this.learnerState.mode;
      if (this.dom?.canvas) {
        this.setCanvasDisplayAuthority(
          storyScene?.displayAuthority ?? this.dataset?.displayAuthority,
        );
        this.dom.canvas.dataset.causalScene = sceneId;
        if (this.learnerState.mode === "story") {
          const playbackDurationSeconds =
            Number(storyScene.playbackDurationSeconds);
          const replayAdvancePerSecond =
            (Number(storyScene.playbackEndTime) -
              Number(storyScene.playbackStartTime)) /
            playbackDurationSeconds;
          this.dom.canvas.dataset.storyChartScale = this.viewport.scale.toFixed(6);
          this.dom.canvas.dataset.storyWakeDisplayRateScale =
            Number(storyScene.wakeDisplayRateScale).toFixed(3);
          this.dom.canvas.dataset.storyPlaybackDurationSeconds =
            Number.isFinite(playbackDurationSeconds) &&
            playbackDurationSeconds > 0
              ? playbackDurationSeconds.toFixed(6)
              : "NaN";
          this.dom.canvas.dataset.storyReplayAdvancePerSecond =
            Number.isFinite(replayAdvancePerSecond)
              ? replayAdvancePerSecond.toFixed(9)
              : "NaN";
          this.dom.canvas.dataset.storyChartBounds = [
            this.viewport.chartBounds?.left,
            this.viewport.chartBounds?.top,
            this.viewport.chartBounds?.right,
            this.viewport.chartBounds?.bottom,
          ].map((value) => Number(value).toFixed(2)).join(",");
        } else {
          delete this.dom.canvas.dataset.storyChartScale;
          delete this.dom.canvas.dataset.storyChartBounds;
          delete this.dom.canvas.dataset.storyReplayTime;
          delete this.dom.canvas.dataset.storyElectrinoScreen;
          delete this.dom.canvas.dataset.storyPositrinoScreen;
        }
        this.dom.canvas.dataset.guidedChartScale = this.viewport.scale.toFixed(6);
        this.dom.canvas.dataset.guidedChartBounds = [
          this.viewport.chartBounds?.left,
          this.viewport.chartBounds?.top,
          this.viewport.chartBounds?.right,
          this.viewport.chartBounds?.bottom,
        ].map((value) => Number(value).toFixed(2)).join(",");
      }
      const shouldClipGuidedChart =
        this.learnerState.mode !== "story" &&
        this.viewport.chartBounds &&
        typeof ctx.rect === "function" &&
        typeof ctx.clip === "function";
      if (shouldClipGuidedChart) {
        const bounds = this.viewport.chartBounds;
        ctx.save();
        ctx.beginPath();
        ctx.rect(
          bounds.left,
          bounds.top,
          bounds.right - bounds.left,
          bounds.bottom - bounds.top,
        );
        ctx.clip();
      }
      if (
        storyScene?.showMotionWakeComparison !== true &&
        storyScene?.showSuperposition !== true
      ) {
        this.drawPathTrail(ctx, "positrino", withAlpha(POSITRINO, 0.76));
        this.drawPathTrail(ctx, "electrino", withAlpha(ELECTRINO, 0.76));
      }
      this.drawGuidedModeScene(ctx, replayTime);
      if (shouldClipGuidedChart) {
        ctx.restore();
      }
      return;
    }
    if (this.dom?.canvas) {
      this.setCanvasDisplayAuthority(this.dataset?.displayAuthority);
      this.dom.canvas.dataset.causalScene = "sandbox";
      delete this.dom.canvas.dataset.guidedChartScale;
      delete this.dom.canvas.dataset.guidedChartBounds;
    }
    const visibleWakeSeries = this.getVisibleWakeSeries(replayTime);
    this.drawWakes(ctx, replayTime, visibleWakeSeries);
    this.drawPathTrail(ctx, "positrino", POSITRINO);
    this.drawPathTrail(ctx, "electrino", ELECTRINO);
    this.drawForegroundWakeEmissionLines(ctx, replayTime, visibleWakeSeries);
    this.drawSelection(ctx);
    this.drawSandboxTransmissionGhost(ctx, visibleWakeSeries);
    this.drawLiveMarkers(ctx, replayTime);
  }

  setCanvasDisplayAuthority(authority = this.dataset?.displayAuthority) {
    if (!this.dom?.canvas) {
      return;
    }
    const displayAuthority = authority ?? createDisplayAuthority(
      "unavailable_provider",
      { label: "Display authority unavailable" },
    );
    this.dom.canvas.dataset.displayAuthorityKind =
      String(displayAuthority.kind ?? "unavailable_provider");
    this.dom.canvas.dataset.displayEvidenceStatus =
      String(displayAuthority.evidenceStatus ?? "display-only");
    this.dom.canvas.dataset.displayPhysicsAcceptance =
      String(displayAuthority.physicsAcceptance === true);
    this.dom.canvas.dataset.displayParityEstablishesPhysicsAcceptance =
      String(
        displayAuthority.displayParityEstablishesPhysicsAcceptance === true,
      );
  }

  drawGuidedModeScene(ctx, replayTime = this.getCurrentReplayTime()) {
    switch (this.learnerState.mode) {
      case "story":
        this.drawStoryScene(ctx, replayTime);
        break;
      case "roots":
        this.drawRootsScene(ctx);
        break;
      case "history":
      default:
        this.drawGuidedCausalHistory(ctx, replayTime);
        this.drawGuidedLiveMarkers(
          ctx,
          replayTime,
          {},
          { useTraversalPaths: true },
        );
        break;
    }
  }

  drawStoryScene(ctx, replayTime = this.getCurrentReplayTime()) {
    const currentScene = createStoryScene(this.learnerState);
    const heldFrame =
      !this.learnerState.playback.playing &&
      this.storyHeldFrame?.scene?.id === currentScene.id
        ? this.storyHeldFrame
        : null;
    const scene = this.learnerState.playback.playing && this.storyPlaybackScene
      ? this.storyPlaybackScene
      : heldFrame?.scene ?? currentScene;
    const displayTime = this.learnerState.playback.playing
      ? clamp(replayTime, scene.playbackStartTime, scene.playbackEndTime)
      : heldFrame?.replayTime ?? scene.displayTime;
    if (this.dom?.canvas) {
      this.dom.canvas.dataset.storyReplayTime = displayTime.toFixed(6);
      this.dom.canvas.dataset.storyBodyTime = displayTime.toFixed(6);
    }
    if (scene.id === "forward-buildup") {
      this.drawStoryForwardWakeBuildup(ctx, scene, displayTime);
      return;
    }
    if (scene.id === "inverse-square-spreading") {
      this.drawStoryInverseSquareSpreading(ctx, scene, displayTime);
      return;
    }
    if (scene.id === "superposition") {
      this.drawStorySuperposition(ctx, scene, displayTime);
      return;
    }
    if (scene.id === "continuous-delayed-feedback") {
      this.drawStoryContinuousDelayedFeedback(ctx, scene, displayTime);
      return;
    }
    const usesSharedPairedPathFrame =
      scene.id === "meet" || scene.id === "forward-buildup";
    if (scene.showMotionWakeComparison) {
      this.drawStoryMotionWakeComparison(ctx, scene, displayTime);
      return;
    }
    if (scene.showSynthesisMotion) {
      this.drawStorySynthesisScene(ctx, scene, displayTime);
      return;
    }
    const bodyDisplayTime = Number.isFinite(scene.fixedBodyTime)
      ? scene.fixedBodyTime
      : displayTime;
    const stagedWakeGrowthProgress = scene.showStagedWakeGrowth
      ? clamp(
          (displayTime - scene.playbackStartTime) /
            Math.max(TIME_EPSILON, scene.playbackEndTime - scene.playbackStartTime),
          0,
          1,
        )
      : 1;
    if (this.dom?.canvas) {
      const getBodyPoint = (kind) => usesSharedPairedPathFrame
        ? sampleTimedPath(this.learnerState.paths[kind], bodyDisplayTime)
        : this.getStoryPathPoint(kind, bodyDisplayTime);
      const electrino = getBodyPoint("electrino");
      const positrino = getBodyPoint("positrino");
      const electrinoScreen = this.worldToScreen(electrino);
      const positrinoScreen = this.worldToScreen(positrino);
      this.dom.canvas.dataset.storyReplayTime = displayTime.toFixed(6);
      this.dom.canvas.dataset.storyBodyTime = bodyDisplayTime.toFixed(6);
      this.dom.canvas.dataset.storyWakeGrowthProgress =
        stagedWakeGrowthProgress.toFixed(6);
      this.dom.canvas.dataset.storyElectrinoScreen =
        `${electrinoScreen.x.toFixed(2)},${electrinoScreen.y.toFixed(2)}`;
      this.dom.canvas.dataset.storyPositrinoScreen =
        `${positrinoScreen.x.toFixed(2)},${positrinoScreen.y.toFixed(2)}`;
    }
    const sampledWakeFronts =
      (this.learnerState.playback.playing || heldFrame) &&
      scene.showSampledWakeHistory
        ? createStorySampledWakeFronts(this.learnerState, scene, displayTime)
        : [];
    const storyWakeFronts = sampledWakeFronts.filter(
      (front) => scene.id !== "emission" ||
        front.emissionTime < displayTime - TIME_EPSILON,
    );
    const storyLiveWakeSeries = scene.id === "emission"
      ? this.getStoryVisibleWakeSeries(displayTime)
      : scene.showStagedWakeGrowth
        ? this.getStoryVisibleWakeSeries(bodyDisplayTime)
        : [];
    const storyLiveWakeArcCount = storyLiveWakeSeries.reduce((count, link) => {
      const timing = this.getWakeTiming(
        link,
        scene.showStagedWakeGrowth ? link.hitTime : displayTime,
      );
      return count + this.getWakeFrontProgressesThroughProgress(
        timing,
        link,
        scene.showStagedWakeGrowth ? stagedWakeGrowthProgress : 1,
      ).length;
    }, 0);
    const rootWakeLayerCount = scene.showWake
      ? scene.interactions.filter(
        (interaction) => displayTime > Number(interaction.root?.emissionTime),
      ).length
      : 0;
    if (this.dom?.canvas) {
      const visibleWakeFrontCount =
        storyWakeFronts.filter((front) => front.radius > 0).length;
      this.dom.canvas.dataset.storyWakeFrontCount = String(visibleWakeFrontCount);
      this.dom.canvas.dataset.storyCausalReceptionCount = String(
        storyWakeFronts.filter(
          (front) => Math.abs(front.eventProgress - 1) <= 0.035,
        ).length,
      );
      const containmentMargins = storyWakeFronts.map((front) => {
        const center = scene.id === "emission"
          ? this.getStoryPathPoint(front.transmitterId, front.emissionTime)
          : front.center;
        const currentTransmitter = usesSharedPairedPathFrame
          ? sampleTimedPath(
              this.learnerState.paths[front.transmitterId],
              displayTime,
            )
          : this.getStoryPathPoint(front.transmitterId, displayTime);
        return front.radius - getDistance(center, currentTransmitter);
      });
      this.dom.canvas.dataset.storyWakeContainmentMargin =
        (containmentMargins.length > 0 ? Math.min(...containmentMargins) : 0).toFixed(6);
      this.dom.canvas.dataset.storyWakeCircleCount = String(
        usesSharedPairedPathFrame
          ? visibleWakeFrontCount
          : scene.showSynthesisWakeCircles && stagedWakeGrowthProgress > 0
            ? storyLiveWakeSeries.length
            : 0,
      );
      this.dom.canvas.dataset.storyWakeSourceCount = String(
        new Set(
          (
            usesSharedPairedPathFrame
              ? storyWakeFronts.filter((front) => front.radius > 0)
              : storyLiveWakeSeries
          ).map((front) => front.transmitterId ?? front.sourceKind),
        ).size,
      );
      this.dom.canvas.dataset.storyWakeGuideArcCount = String(
        usesSharedPairedPathFrame
          ? 0
          : scene.id === "emission" || scene.showStagedWakeGrowth
            ? storyLiveWakeArcCount
            : rootWakeLayerCount,
      );
      this.dom.canvas.dataset.storyEmissionOriginMarkerCount = String(
        storyWakeFronts.length +
          (scene.id === "emission" || scene.showStagedWakeGrowth
            ? storyLiveWakeSeries.length
            : 0),
      );
      const markerLeadTimes = [
        ...storyWakeFronts.map((front) => front.emissionTime - displayTime),
        ...storyLiveWakeSeries.map((link) => link.emissionTime - displayTime),
      ];
      this.dom.canvas.dataset.storyEmissionMarkerMaxLeadTime =
        (markerLeadTimes.length > 0 ? Math.max(...markerLeadTimes) : 0).toFixed(9);
      this.dom.canvas.dataset.storyLiveWakeSeriesCount =
        String(storyLiveWakeSeries.length);
      const liveEndpointErrors = storyLiveWakeSeries.map((link) => {
        const currentReceiver = this.getStoryPathPoint(
          link.receiverKind,
          bodyDisplayTime,
        );
        return getDistance(link.receiver, currentReceiver);
      });
      this.dom.canvas.dataset.storyLiveWakeMaxEndpointError =
        (liveEndpointErrors.length > 0 ? Math.max(...liveEndpointErrors) : 0).toFixed(9);
    }
    storyLiveWakeSeries.forEach((link) => {
      if (scene.showSynthesisWakeCircles && stagedWakeGrowthProgress > 0) {
        this.drawSolidWakeCircle(
          ctx,
          link.source,
          link.distance * stagedWakeGrowthProgress,
          withAlpha(mixColor(link.color, WHITE, 0.22), 0.68),
        );
      }
      this.drawWakeProgression(
        ctx,
        link,
        scene.showStagedWakeGrowth ? link.hitTime : displayTime,
        scene.showStagedWakeGrowth
          ? { maximumProgress: stagedWakeGrowthProgress }
          : undefined,
      );
      if (scene.id === "emission" || scene.showStagedWakeGrowth) {
        this.drawStoryEmissionOriginMarker(
          ctx,
          link.source,
          1,
          link.sourceKind,
        );
      }
    });
    if (usesSharedPairedPathFrame) {
      this.drawPairedFullWakeHistory(ctx, storyWakeFronts, bodyDisplayTime, {
        drawBodies: false,
      });
    } else {
      storyWakeFronts.forEach((front) => {
        const displayCenter = scene.id === "emission"
          ? this.getStoryPathPoint(front.transmitterId, front.emissionTime)
          : front.center;
        this.drawStoryEmissionOriginMarker(
          ctx,
          displayCenter,
          1,
          front.transmitterId,
        );
      });
    }
    scene.interactions.forEach((interaction) => {
      const geometry = createWakeDisplayGeometry(interaction.root, displayTime);
      if (scene.showWake && geometry?.radius > 0) {
        const theta = getAngleDegrees(geometry.origin, geometry.reception);
        const causalAge = Math.max(
          0,
          Math.min(
            1,
            (displayTime - Number(interaction.root.emissionTime)) /
              Math.max(
                Number.EPSILON,
                Number(interaction.root.receiverTime) -
                  Number(interaction.root.emissionTime),
              ),
          ),
        );
        const span = 3 + 27 * causalAge;
        this.drawDottedArc(
          ctx,
          geometry.origin,
          geometry.radius,
          theta - span * 0.5,
          theta + span * 0.5,
          interaction.transmitterId === "positrino"
            ? "rgba(255,225,231,0.88)"
            : "rgba(224,231,255,0.9)",
          Math.max(2.2, 2.7 * this.viewport.scale),
        );
      }
      if (scene.showTransmissionGhost) {
        this.drawTransmissionGhost(
          ctx,
          interaction.root.emission,
          interaction.transmitterId,
          {
            showLabel: false,
            labelOffset: interaction.transmitterId === "positrino"
              ? { x: 0, y: 34 }
              : { x: 0, y: -34 },
          },
        );
      }
      if (scene.showReceptionMarker) {
        const receiverColor = interaction.receiverId === "electrino"
          ? ELECTRINO_WAKE
          : POSITRINO_WAKE;
        this.drawCircle(
          ctx,
          this.worldToScreen(interaction.root.reception),
          13,
          withAlpha(receiverColor, 0.14),
          withAlpha(WHITE, 0.86),
          1.4,
        );
      }
    });
    const labelOffsets = {
      positrino: { x: 50, y: -64 },
      electrino: { x: 50, y: 36 },
    };
    if (usesSharedPairedPathFrame) {
      this.drawGuidedLiveMarkers(ctx, bodyDisplayTime, labelOffsets);
    } else {
      this.drawStoryLiveMarkers(ctx, bodyDisplayTime, labelOffsets);
    }
    if (scene.id === "forward-buildup" && this.dom?.canvas) {
      this.dom.canvas.dataset.forwardWakeBuildupStartTime =
        Number(scene.playbackStartTime).toFixed(6);
      this.dom.canvas.dataset.forwardWakeBuildupInheritedHistory = "false";
      this.dom.canvas.dataset.forwardWakeBuildupEvidenceBoundary =
        "Shared paired-path teaching projection from emission zero; sampled fronts show continuous transmission and do not establish a self-interaction or solver-accepted trajectory.";
    }
  }

  drawStoryMotionWakeComparison(ctx, scene, displayTime) {
    const fixture = createStoryMotionWakeComparisonFixture(
      this.learnerState,
      displayTime,
    );
    const selectedAlpha = 0.92;
    const unselectedAlpha = 0.64;
    this.setCanvasDisplayAuthority(fixture.displayAuthority);
    fixture.comparisons.forEach((comparison) => {
      const alpha = comparison.selected ? selectedAlpha : unselectedAlpha;
      this.drawLine(
        ctx,
        comparison.sourcePath.map((point) => this.worldToScreen(point)),
        withAlpha(POSITRINO, alpha * 0.72),
        CAUSAL_PATH_STROKE_WIDTH,
      );
      comparison.fronts.forEach((front) => {
        this.drawSolidWakeCircle(
          ctx,
          front.center,
          front.radius,
          withAlpha(mixColor(POSITRINO, WHITE, 0.22), alpha * 0.72),
        );
        this.drawStoryEmissionOriginMarker(
          ctx,
          front.center,
          1,
          "positrino",
        );
      });
      const bodyScreen = this.worldToScreen(comparison.currentSource);
      this.drawCircle(
        ctx,
        bodyScreen,
        ARCHITRINO_BODY_HALO_RADIUS,
        withAlpha(POSITRINO, alpha * 0.14),
      );
      this.drawCircle(
        ctx,
        bodyScreen,
        ARCHITRINO_BODY_RADIUS,
        withAlpha(POSITRINO, alpha),
        withAlpha(WHITE, alpha),
        ARCHITRINO_BODY_OUTLINE_WIDTH,
      );
      this.drawStoryEmissionOriginMarker(
        ctx,
        comparison.currentSource,
        alpha,
      );
      this.drawStorySpeedLabel(
        ctx,
        comparison.speedFraction,
        {
          x: comparison.currentSource.x,
          y: comparison.currentSource.y - 178,
        },
        alpha,
      );
      if (
        this.canvasWidth > 820 &&
        comparison.selected &&
        comparison.fronts.length > 0
      ) {
        const wakeExtents = this.getStoryMotionWakeExtents(comparison.fronts);
        const labelAnchors = this.drawStoryCompressionLabels(
          ctx,
          wakeExtents,
          comparison.currentSource.y + 180,
          comparison.currentSource,
        );
        if (this.dom?.canvas) {
          this.dom.canvas.dataset.storyMotionExpandedLabelScreen =
            `${labelAnchors.expanded.x.toFixed(2)},${labelAnchors.expanded.y.toFixed(2)}`;
          this.dom.canvas.dataset.storyMotionCompressedLabelScreen =
            `${labelAnchors.compressed.x.toFixed(2)},${labelAnchors.compressed.y.toFixed(2)}`;
          this.dom.canvas.dataset.storyMotionExpandedLabelAlign = labelAnchors.expandedAlign;
          this.dom.canvas.dataset.storyMotionCompressedLabelAlign = labelAnchors.compressedAlign;
          this.dom.canvas.dataset.storyMotionVisibleWakeExtents =
            `${wakeExtents.rearX.toFixed(2)},${wakeExtents.frontX.toFixed(2)}`;
          this.dom.canvas.dataset.storyMotionLabelAlignmentAdjusted =
            String(labelAnchors.alignmentAdjusted);
        }
      }
    });
    if (this.dom?.canvas) {
      this.dom.canvas.dataset.storyMotionFixture = fixture.fixtureKind;
      this.dom.canvas.dataset.storyMotionSelectedSpeed =
        fixture.selectedSpeedFraction.toFixed(1);
      this.dom.canvas.dataset.storyMotionSpeeds =
        fixture.comparisons.map((comparison) =>
          comparison.speedFraction.toFixed(1)).join(",");
      this.dom.canvas.dataset.storyMotionFrontReach =
        fixture.comparisons.map((comparison) =>
          comparison.frontReach.toFixed(3)).join(",");
      this.dom.canvas.dataset.storyMotionRearReach =
        fixture.comparisons.map((comparison) =>
          comparison.rearReach.toFixed(3)).join(",");
      this.dom.canvas.dataset.storyMotionMaximumResidual =
        fixture.maximumResidual.toExponential(3);
      this.dom.canvas.dataset.storyEmissionOriginMarkerCount = String(
        fixture.comparisons.reduce(
          (count, comparison) => count + comparison.fronts.length,
          0,
        ) + fixture.comparisons.length,
      );
      this.dom.canvas.dataset.storyWakeCircleCount = String(
        fixture.comparisons.reduce(
          (count, comparison) =>
            count + comparison.fronts.filter((front) => front.radius > 0).length,
          0,
        ),
      );
      this.dom.canvas.dataset.storyWakeGuideArcCount = "0";
      this.dom.canvas.dataset.storyWakeContainmentMargin = Math.min(
        ...fixture.comparisons.flatMap((comparison) =>
          comparison.fronts.map((front) =>
            front.radius - getDistance(front.center, comparison.currentSource))),
      ).toFixed(6);
      this.dom.canvas.dataset.storyReplayTime = displayTime.toFixed(6);
      this.dom.canvas.dataset.storyBodyTime = displayTime.toFixed(6);
      this.dom.canvas.dataset.storyWakeGrowthProgress =
        (displayTime / Math.max(TIME_EPSILON, scene.playbackEndTime)).toFixed(6);
    }
  }

  getStoryMotionWakeExtents(fronts) {
    const visibleRings = (fronts ?? []).filter((front) =>
      Number.isFinite(Number(front?.center?.x)) &&
      Number.isFinite(Number(front?.center?.y)) &&
      Number.isFinite(Number(front?.radius)) &&
      Number(front.radius) >= 0,
    );
    if (visibleRings.length === 0) {
      return null;
    }
    return visibleRings.reduce(
      (extents, front) => {
        const centerX = Number(front.center.x);
        const radius = Number(front.radius);
        return {
          rearX: Math.min(extents.rearX, centerX - radius),
          frontX: Math.max(extents.frontX, centerX + radius),
          y: Number(front.center.y),
          visibleRingCount: extents.visibleRingCount + 1,
        };
      },
      {
        rearX: Number.POSITIVE_INFINITY,
        frontX: Number.NEGATIVE_INFINITY,
        y: Number(visibleRings[0].center.y),
        visibleRingCount: 0,
      },
    );
  }

  drawStoryCompressionLabels(
    ctx,
    wakeExtents,
    baselineY,
    _initialCenterPoint = null,
  ) {
    if (!wakeExtents) {
      return {
        expanded: null,
        compressed: null,
        expandedAlign: "left",
        compressedAlign: "right",
        alignmentAdjusted: false,
      };
    }
    const fontSize = Math.max(9, 12 * this.viewport.scale);
    const expandedText = "Expanded";
    const compressedText = "Compressed";
    const measure = (text) => {
      if (typeof ctx?.measureText !== "function") {
        return text.length * fontSize * 0.56;
      }
      ctx.save?.();
      ctx.font = `${fontSize}px "Helvetica Neue", Arial, sans-serif`;
      const width = Number(ctx.measureText(text)?.width);
      ctx.restore?.();
      return Number.isFinite(width) ? width : text.length * fontSize * 0.56;
    };
    const expandedWidth = measure(expandedText);
    const compressedWidth = measure(compressedText);
    const twoSpaceGap = Math.max(fontSize * 0.56, measure(" ") * 2);
    const expandedAnchor = this.worldToScreen({
      x: wakeExtents.rearX,
      y: baselineY,
    });
    const compressedAnchor = this.worldToScreen({
      x: wakeExtents.frontX,
      y: baselineY,
    });
    const actualExpandedX = expandedAnchor.x;
    const actualCompressedX = compressedAnchor.x;
    const actualGap =
      compressedAnchor.x -
      compressedWidth -
      (expandedAnchor.x + expandedWidth);
    if (actualGap < twoSpaceGap) {
      const outwardAdjustment = (twoSpaceGap - actualGap) * 0.5;
      expandedAnchor.x -= outwardAdjustment;
      compressedAnchor.x += outwardAdjustment;
    }
    this.drawScreenText(
      ctx,
      expandedText,
      expandedAnchor,
      12,
      withAlpha(WHITE, 0.72),
      "left",
    );
    this.drawScreenText(
      ctx,
      compressedText,
      compressedAnchor,
      12,
      withAlpha(WHITE, 0.72),
      "right",
    );
    return {
      expanded: expandedAnchor,
      compressed: compressedAnchor,
      expandedAlign: "left",
      compressedAlign: "right",
      alignmentAdjusted:
        actualExpandedX !== expandedAnchor.x ||
        actualCompressedX !== compressedAnchor.x,
      wakeExtents,
    };
  }

  drawStorySynthesisScene(ctx, scene, displayTime) {
    const playbackSpan = Math.max(
      TIME_EPSILON,
      scene.playbackEndTime - scene.playbackStartTime,
    );
    const progress = clamp(
      (displayTime - scene.playbackStartTime) / playbackSpan,
      0,
      1,
    );
    const links = this.getStoryVisibleWakeSeries(displayTime);
    let guideArcCount = 0;
    links.forEach((link) => {
      if (scene.showSynthesisWakeCircles && progress > TIME_EPSILON) {
        this.drawSolidWakeCircle(
          ctx,
          link.source,
          link.distance,
          withAlpha(
            mixColor(link.color, WHITE, 0.22),
            0.68 * Math.min(1, progress * 4),
          ),
        );
      }
      const timing = this.getWakeTiming(link, displayTime);
      guideArcCount += this.getWakeFrontProgressesThroughProgress(
        timing,
        link,
        1,
      ).length;
      this.drawWakeProgression(
        ctx,
        link,
        displayTime,
      );
      this.drawStoryEmissionOriginMarker(
        ctx,
        link.source,
        1,
        link.sourceKind,
      );
    });
    const positrino = this.getStoryPathPoint("positrino", displayTime);
    const electrino = this.getStoryPathPoint("electrino", displayTime);
    this.drawStoryLiveMarkers(
      ctx,
      displayTime,
      {
        positrino: { x: 50, y: -64 },
        electrino: { x: 50, y: 36 },
      },
    );
    if (this.dom?.canvas) {
      const endpointErrors = links.map(
        (link) =>
          Math.abs(
            getDistance(link.source, link.receiver) -
              link.distance,
          ),
      );
      this.dom.canvas.dataset.storySynthesisDisplayMapping =
        "continuous_reception_time_from_story_2_handoff";
      this.dom.canvas.dataset.storyReplayTime = displayTime.toFixed(6);
      this.dom.canvas.dataset.storyBodyTime = displayTime.toFixed(6);
      this.dom.canvas.dataset.storySynthesisProgress =
        progress.toFixed(6);
      this.dom.canvas.dataset.storySynthesisEvidenceBoundary =
        "Story 3 begins at the exact Story 2 handoff time, then advances the same paths and evaluator-backed reciprocal wake roots by shared display time. Display agreement does not establish physics acceptance.";
      this.dom.canvas.dataset.storyWakeCircleCount = String(
        progress > TIME_EPSILON ? links.length : 0,
      );
      this.dom.canvas.dataset.storyWakeGuideArcCount = String(guideArcCount);
      this.dom.canvas.dataset.storyEmissionOriginMarkerCount =
        String(links.length);
      this.dom.canvas.dataset.storyLiveWakeSeriesCount = String(links.length);
      this.dom.canvas.dataset.storySynthesisEndpointError =
        (endpointErrors.length > 0 ? Math.max(...endpointErrors) : 0).toFixed(9);
      if (electrino && positrino) {
        const electrinoScreen = this.worldToScreen(electrino);
        const positrinoScreen = this.worldToScreen(positrino);
        this.dom.canvas.dataset.storyElectrinoScreen =
          `${electrinoScreen.x.toFixed(2)},${electrinoScreen.y.toFixed(2)}`;
        this.dom.canvas.dataset.storyPositrinoScreen =
          `${positrinoScreen.x.toFixed(2)},${positrinoScreen.y.toFixed(2)}`;
      }
    }
  }

  drawStorySpeedLabel(ctx, speedFraction, worldPoint, alpha = 1) {
    const screen = this.worldToScreen(worldPoint);
    this.drawScreenText(
      ctx,
      `${Number(speedFraction).toFixed(1)} C`,
      screen,
      16,
      withAlpha(WHITE, alpha),
      "center",
      "bold",
    );
    this.drawScreenText(
      ctx,
      "f",
      {
        x: screen.x + 22 * this.viewport.scale,
        y: screen.y + 6 * this.viewport.scale,
      },
      10,
      withAlpha(WHITE, alpha),
      "left",
      "bold",
    );
  }

  drawStoryEmissionOriginMarker(ctx, center, opacity = 1, kind) {
    this.drawTransmissionPointMarker(
      ctx,
      center,
      undefined,
      opacity,
      this.getTransmissionHistoryMarkerColor(kind),
    );
  }

  drawSolidWakeCircle(ctx, center, radius, color) {
    if (!center || !(Number(radius) > 0)) {
      return;
    }
    const screen = this.worldToScreen(center);
    ctx.save();
    ctx.strokeStyle = colorToCss(color);
    ctx.lineWidth = Math.max(0.9, 1.25 * this.viewport.scale);
    ctx.beginPath();
    ctx.arc(screen.x, screen.y, radius * this.viewport.scale, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  drawGuidedLiveMarkers(
    ctx,
    replayTime,
    labelOffsets = {},
    { useTraversalPaths = false } = {},
  ) {
    const getPoint = (kind) => useTraversalPaths
      ? this.getTraversalPathPoint(kind, replayTime)
      : sampleTimedPath(this.learnerState.paths[kind], replayTime);
    this.drawLiveMarker(
      ctx,
      "Positrino",
      POSITRINO,
      getPoint("positrino"),
      "positrino",
      labelOffsets.positrino ?? { x: 0, y: -36 },
    );
    this.drawLiveMarker(
      ctx,
      "Electrino",
      ELECTRINO,
      getPoint("electrino"),
      "electrino",
      labelOffsets.electrino ?? { x: 0, y: 36 },
    );
  }

  drawStoryLiveMarkers(ctx, replayTime, labelOffsets = {}) {
    this.drawLiveMarker(
      ctx,
      "Positrino",
      POSITRINO,
      this.getStoryPathPoint("positrino", replayTime),
      "Positrino",
      labelOffsets.positrino ?? { x: 0, y: -44 },
    );
    this.drawLiveMarker(
      ctx,
      "Electrino",
      ELECTRINO,
      this.getStoryPathPoint("electrino", replayTime),
      "Electrino",
      labelOffsets.electrino ?? { x: 0, y: 44 },
    );
  }

  drawGuidedCausalHistory(ctx, replayTime = this.getCurrentReplayTime()) {
    const links = this.getVisibleWakeSeries(replayTime);
    links.forEach((link) => {
      this.drawSolidWakeCircle(
        ctx,
        link.source,
        link.distance,
        withAlpha(link.color, 0.68),
      );
    });
    links.forEach((link) => {
      this.drawTransmissionGhost(ctx, link.source, link.sourceKind, {
        showLabel: false,
      });
      const receiverColor = link.receiverKind === "electrino"
        ? ELECTRINO_WAKE
        : POSITRINO_WAKE;
      this.drawCircle(
        ctx,
        this.worldToScreen(link.receiver),
        8,
        withAlpha(receiverColor, 0.9),
        WHITE,
        1.2,
      );
    });
    if (this.dom?.canvas) {
      this.dom.canvas.dataset.historyEmissionMarkerCount = String(links.length);
      this.dom.canvas.dataset.historyWakeCircleCount = String(links.length);
      this.dom.canvas.dataset.historyWakeGuideArcCount = "0";
    }
  }

  drawFadingSolidWakeArc(ctx, center, radius, midpointDegrees, color) {
    if (!center || !(Number(radius) > 0)) {
      return;
    }
    const screen = this.worldToScreen(center);
    const segmentCount = 14;
    const spanDegrees = 22;
    const startDegrees = midpointDegrees - spanDegrees * 0.5;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineWidth = Math.max(1.4, 2.1 * this.viewport.scale);
    for (let index = 0; index < segmentCount; index += 1) {
      const startAmount = index / segmentCount;
      const endAmount = (index + 1.02) / segmentCount;
      ctx.strokeStyle = colorToCss(
        withAlpha(mixColor(color, WHITE, 0.36), 0.18 + 0.58 * endAmount),
      );
      ctx.beginPath();
      ctx.arc(
        screen.x,
        screen.y,
        radius * this.viewport.scale,
        ((startDegrees + spanDegrees * startAmount) * Math.PI) / 180,
        ((startDegrees + spanDegrees * endAmount) * Math.PI) / 180,
      );
      ctx.stroke();
    }
    ctx.restore();
  }

  drawRootsScene(ctx) {
    const view = createRootsView(this.learnerState);
    view.roots.forEach((root) => {
      const geometry = createWakeDisplayGeometry(root, view.receiverTime);
      const sourceColor = root.sourceId === "electrino" ? ELECTRINO : POSITRINO;
      drawWakeDisplayGeometry(ctx, geometry, {
        worldToScreen: (point) => this.worldToScreen(point),
        color: root.accepted
          ? withAlpha(sourceColor, 0.72)
          : withAlpha(sourceColor, 0.34),
        lineColor: root.accepted
          ? withAlpha(sourceColor, 0.82)
          : withAlpha(sourceColor, 0.42),
        dotRadius: root.id === this.learnerState.selectedRootId ? 2.2 : 1.35,
        showWake: true,
        showCausalLine: true,
      });
      this.drawTransmissionGhost(ctx, root.emission, root.sourceId, {
        label: `root ${root.ordinal} · Tₜ=${root.emissionTime.toFixed(3)}`,
        emphasized: root.id === this.learnerState.selectedRootId,
        labelOffset: root.sourceId === "positrino"
          ? { x: 0, y: -34 }
          : { x: 0, y: 34 },
      });
    });
    this.drawGuidedLiveMarkers(ctx, view.receiverTime);
    this.drawSceneHeading(ctx, `ROOTS · ${view.activeRootCount} ACTIVE`);
  }

  drawStoryForwardWakeBuildup(
    ctx,
    scene,
    replayTime = this.getCurrentReplayTime(),
  ) {
    const frame = this.createStoryForwardWakeBuildupFrame(scene, replayTime);
    this.drawForwardWakeBuildupHistory(ctx, frame);
    this.drawLiveMarker(
      ctx,
      "Positrino",
      POSITRINO,
      frame.bodies.positrino,
      "positrino",
      { x: 50, y: -64 },
    );
    this.drawLiveMarker(
      ctx,
      "Electrino",
      ELECTRINO,
      frame.bodies.electrino,
      "electrino",
      { x: 50, y: 36 },
    );
    if (this.dom?.canvas) {
      this.dom.canvas.dataset.forwardWakeBuildupFixture =
        "paired_story_template_equal_body_arc_length_and_wake_speed";
      this.dom.canvas.dataset.forwardWakeBuildupWakeCount =
        String(frame.fronts.length);
      this.dom.canvas.dataset.forwardWakeBuildupTime =
        frame.displayTime.toFixed(6);
      this.dom.canvas.dataset.forwardWakeBuildupContainmentMargin =
        frame.minimumContainmentMargin.toFixed(6);
      this.dom.canvas.dataset.forwardWakeBuildupMinimumSpeedRatio =
        frame.minimumSpeedRatio.toFixed(9);
      this.dom.canvas.dataset.forwardWakeBuildupMaximumSpeedRatio =
        frame.maximumSpeedRatio.toFixed(9);
      this.dom.canvas.dataset.forwardWakeBuildupMaximumLeadingError =
        frame.maximumLeadingCoincidenceError.toFixed(9);
      this.dom.canvas.dataset.forwardWakeBuildupFrontClip =
        "body-anchored-full-sphere-projection";
      this.dom.canvas.dataset.forwardWakeBuildupInheritedHistory = "false";
      this.dom.canvas.dataset.forwardWakeBuildupDiffersFromMeet =
        "equal-body-and-wake-speed";
      this.dom.canvas.dataset.forwardWakeBuildupEvidenceBoundary =
        "Declared paired-path display fixture from emission zero; each sampled wake front is a closed two-sided projection centered on its emission point, with the white current-emission dot as its unique displayed-time-leading point. This display projection does not establish an EOM-solved trajectory, self-interaction, causal-route change, or stability result.";
    }
  }

  drawStoryInverseSquareSpreading(
    ctx,
    scene,
    replayTime = this.getCurrentReplayTime(),
  ) {
    const frame = createInverseSquareSpreadingFrame(
      this.learnerState,
      scene,
      replayTime,
    );
    this.inverseSquareSpreadingFrame = frame;
    this.setCanvasDisplayAuthority(frame.displayAuthority);
    frame.wakes.forEach((wake) => {
      const sourceColor = wake.sourceKind === "positrino"
        ? POSITRINO_WAKE
        : ELECTRINO_WAKE;
      const alpha = 0.24 + 0.48 * (1 - wake.ageProgress);
      this.drawSolidWakeCircle(
        ctx,
        wake.center,
        wake.radius,
        withAlpha(mixColor(sourceColor, WHITE, 0.18), alpha),
      );
    });
    this.drawLiveMarker(
      ctx,
      "Positrino",
      POSITRINO,
      frame.bodies.positrino.point,
      "positrino",
      { x: 50, y: -64 },
    );
    this.drawLiveMarker(
      ctx,
      "Electrino",
      ELECTRINO,
      frame.bodies.electrino.point,
      "electrino",
      { x: 50, y: 36 },
    );
    if (this.dom?.canvas) {
      const positrinoScreen = this.worldToScreen(frame.bodies.positrino.point);
      const electrinoScreen = this.worldToScreen(frame.bodies.electrino.point);
      this.dom.canvas.dataset.inverseSquareFixture =
        "shared-paired-path-fixed-halfway-constant-rate-circular-wakes";
      this.dom.canvas.dataset.inverseSquareBodyProgress =
        INVERSE_SQUARE_BODY_PROGRESS.toFixed(6);
      this.dom.canvas.dataset.inverseSquareEmissionRate =
        frame.emissionRate.toFixed(6);
      this.dom.canvas.dataset.inverseSquareEmissionInterval =
        frame.emissionInterval.toFixed(6);
      this.dom.canvas.dataset.inverseSquareWakeCount =
        String(frame.wakes.length);
      this.dom.canvas.dataset.inverseSquareWakeShape = "full-circular";
      this.dom.canvas.dataset.inverseSquareWakeCenters = "fixed-body-points";
      this.dom.canvas.dataset.inverseSquareEmissionCadence =
        "equal-interval-normalized-lesson-progress";
      this.dom.canvas.dataset.inverseSquareAreaRule =
        "same-emitted-amount-over-4pi-r-squared";
      this.dom.canvas.dataset.inverseSquareContributionScaling =
        "inverse-radius-squared";
      this.dom.canvas.dataset.inverseSquareComparisonOrnamentCount = "0";
      this.dom.canvas.dataset.inverseSquareFormulaLabelCount = "0";
      this.dom.canvas.dataset.inverseSquareDotStarGraphic = "false";
      this.dom.canvas.dataset.inverseSquareFieldAmplitudeClaim = "false";
      this.dom.canvas.dataset.inverseSquarePhysicalLawClaim = "false";
      this.dom.canvas.dataset.storyBodyTime =
        INVERSE_SQUARE_BODY_PROGRESS.toFixed(6);
      this.dom.canvas.dataset.storyElectrinoScreen =
        `${electrinoScreen.x.toFixed(2)},${electrinoScreen.y.toFixed(2)}`;
      this.dom.canvas.dataset.storyPositrinoScreen =
        `${positrinoScreen.x.toFixed(2)},${positrinoScreen.y.toFixed(2)}`;
      this.dom.canvas.dataset.inverseSquareEvidenceBoundary =
        "Declared geometric-dilution teaching fixture with fixed halfway bodies and equal-interval wake emission. It does not establish a field amplitude, physical interaction law, measured magnitude, binding, stability, or solved trajectory.";
    }
  }

  drawStorySuperposition(ctx, scene, displayTime) {
    const span = Math.max(
      TIME_EPSILON,
      Number(scene.playbackEndTime) - Number(scene.playbackStartTime),
    );
    const phase = clamp(
      (Number(displayTime) - Number(scene.playbackStartTime)) / span,
      0,
      1,
    );
    const fixture = createSuperpositionScene(this.learnerState, { phase });
    this.superpositionScene = fixture;
    this.setCanvasDisplayAuthority(fixture.displayAuthority);
    fixture.paths.forEach((path) => {
      const color = path.kind === "positrino"
        ? withAlpha(POSITRINO, 0.76)
        : withAlpha(ELECTRINO, path.role === "middle-source" ? 0.64 : 0.76);
      this.drawSmoothLine(
        ctx,
        path.points.map((point) => this.worldToScreen(point)),
        color,
        CAUSAL_PATH_STROKE_WIDTH,
      );
    });
    fixture.selectedArcs.forEach((arc) => {
      this.drawStoryContinuousDelayedFeedbackArc(
        ctx,
        {
          start: arc.emissionOrigin,
          current: arc.receptionPoint,
          end: arc.receptionPoint,
          sourceKind: "electrino",
          progress: 1,
          startTime: 0,
          endTime: 1,
        },
        true,
      );
      const contribution = fixture.contributions.find(
        (candidate) => candidate.arcId === arc.id,
      );
      this.drawStorySuperpositionComponentArrow(
        ctx,
        contribution?.arrow,
      );
    });
    if (fixture.netAccelerationArrow) {
      this.drawStorySuperpositionNetArrow(
        ctx,
        fixture.netAccelerationArrow.origin,
        fixture.netAccelerationArrow.vector,
      );
    }
    fixture.bodies.forEach((body) => {
      const color = body.kind === "electrino" ? ELECTRINO : POSITRINO;
      const screen = this.worldToScreen(body.point);
      this.drawCircle(ctx, screen, 22, withAlpha(color, 0.14));
      this.drawCircle(ctx, screen, 10, color);
      const labelOffset = Math.max(18, 34 * this.viewport.scale);
      const labelColor = body.kind === "electrino"
        ? ELECTRINO_LABEL
        : withAlpha(color, 0.9);
      this.drawScreenText(
        ctx,
        body.label,
        {
          x: screen.x,
          y: screen.y +
            (body.id === "positrino" ? -labelOffset : labelOffset),
        },
        14,
        labelColor,
        "center",
        "bold",
      );
    });
    if (this.dom?.canvas) {
      this.dom.canvas.dataset.superpositionFixture =
        "three-shared-path-selected-electrino-contributions";
      this.dom.canvas.dataset.superpositionBodyCount =
        String(fixture.bodies.length);
      this.dom.canvas.dataset.superpositionBodyLabels =
        fixture.bodies.map((body) => body.label).join("|");
      this.dom.canvas.dataset.superpositionBodyPathTimes =
        fixture.bodies.map((body) => body.pathTime.toFixed(2)).join(",");
      this.dom.canvas.dataset.superpositionLabelStyle =
        "lesson-one-lowercase-polarity-colors";
      this.dom.canvas.dataset.superpositionSelectedArcCount =
        String(fixture.selectedArcs.length);
      this.dom.canvas.dataset.superpositionComponentArrowCount =
        String(fixture.componentArrows.length);
      this.dom.canvas.dataset.superpositionHasNetAcceleration =
        String(Boolean(fixture.netAccelerationArrow));
      this.dom.canvas.dataset.superpositionWakeStyle =
        fixture.selectedArcs[0]?.wakeFront?.style ?? "unavailable";
      this.dom.canvas.dataset.superpositionArcVisual =
        "curved_fading_causal_arcs";
      this.dom.canvas.dataset.superpositionArrowheadStyle =
        "clean-triangle";
      this.dom.canvas.dataset.superpositionArrowShaftEnd =
        "triangle-base-no-terminal-marker";
      this.dom.canvas.dataset.superpositionWhiteArrowStrokeWidth =
        "3.2";
      this.dom.canvas.dataset.superpositionAllAdvanceTogether =
        String(
          fixture.bodies.every(
            (body) =>
              Math.abs(
                body.pathTime - body.startFraction - phase * 0.5,
              ) <= 1e-9,
          ),
        );
      this.dom.canvas.dataset.superpositionOmittedReciprocalSet =
        String(fixture.omittedReciprocalSet === true);
      this.dom.canvas.dataset.superpositionNetDirection =
        fixture.netVector.y > 0 &&
          Math.abs(fixture.netVector.y) >= Math.abs(fixture.netVector.x)
          ? "approximately-downward"
          : "not-downward";
      this.dom.canvas.dataset.superpositionEvidenceBoundary =
        "Display-only selected-contribution teaching fixture; no physical-law, measured-magnitude, binding, stability, or solved-trajectory claim.";
    }
  }

  drawStorySuperpositionComponentArrow(ctx, arrow) {
    if (!arrow) {
      return;
    }
    const start = this.worldToScreen(arrow.origin);
    const target = this.worldToScreen(arrow.target);
    const dx = target.x - start.x;
    const dy = target.y - start.y;
    const length = Math.hypot(dx, dy) || 1;
    const ux = dx / length;
    const uy = dy / length;
    const tip = {
      x: start.x + dx * arrow.lengthFraction,
      y: start.y + dy * arrow.lengthFraction,
    };
    const headLength = 11;
    const base = {
      x: tip.x - ux * headLength,
      y: tip.y - uy * headLength,
    };
    const halfWidth = 5.5;
    const color = withAlpha(WHITE, 0.96);
    const lineWidth = arrow.width / Math.max(this.viewport.scale, 0.01);
    this.drawLine(ctx, [start, base], color, lineWidth);
    this.drawTriangle(ctx, [
      tip,
      { x: base.x - uy * halfWidth, y: base.y + ux * halfWidth },
      { x: base.x + uy * halfWidth, y: base.y - ux * halfWidth },
    ], color);
  }

  drawStorySuperpositionNetArrow(ctx, origin, vector) {
    const magnitude = Math.hypot(vector.x, vector.y) || 1;
    const start = this.worldToScreen(origin);
    const scale = Math.max(34, 110 * this.viewport.scale);
    const end = {
      x: start.x + (vector.x / magnitude) * scale,
      y: start.y + (vector.y / magnitude) * scale,
    };
    const ux = (end.x - start.x) / scale;
    const uy = (end.y - start.y) / scale;
    const headLength = 11;
    const base = {
      x: end.x - ux * headLength,
      y: end.y - uy * headLength,
    };
    const halfWidth = 5.5;
    const color = withAlpha(WHITE, 0.98);
    const lineWidth = 3.2 / Math.max(this.viewport.scale, 0.01);
    this.drawLine(ctx, [start, base], color, lineWidth);
    this.drawTriangle(ctx, [
      end,
      { x: base.x - uy * halfWidth, y: base.y + ux * halfWidth },
      { x: base.x + uy * halfWidth, y: base.y - ux * halfWidth },
    ], color);
    if (this.canvasWidth > 820) {
      this.drawScreenText(
        ctx,
        "net acceleration",
        { x: end.x, y: end.y + 24 * this.viewport.scale },
        12,
        color,
        "center",
        "bold",
      );
    }
  }

  drawStoryContinuousDelayedFeedback(ctx, scene, displayTime) {
    const frame = createStoryContinuousDelayedFeedbackFrame(
      this.learnerState,
      scene,
      displayTime,
    );
    this.setCanvasDisplayAuthority(frame.displayAuthority);
    frame.frozenArcs.forEach((arc) => {
      this.drawStoryContinuousDelayedFeedbackArc(ctx, arc, false);
    });
    frame.activeArcs.forEach((arc) => {
      this.drawStoryContinuousDelayedFeedbackArc(ctx, arc, true);
    });
    this.drawGuidedLiveMarkers(ctx, frame.bodyProgress, {
      positrino: { x: 50, y: -64 },
      electrino: { x: 50, y: 36 },
    });
    if (this.dom?.canvas) {
      this.dom.canvas.dataset.continuousDelayedFeedbackFixture =
        "shared-paired-path-frozen-history-active-pair";
      this.dom.canvas.dataset.continuousDelayedFeedbackRoundCount =
        String(frame.roundCount);
      this.dom.canvas.dataset.continuousDelayedFeedbackCompletedRoundCount =
        String(frame.completedRoundCount);
      this.dom.canvas.dataset.continuousDelayedFeedbackFrozenArcCount =
        String(frame.frozenArcs.length);
      this.dom.canvas.dataset.continuousDelayedFeedbackActiveArcCount =
        String(frame.activeArcs.length);
      this.dom.canvas.dataset.continuousDelayedFeedbackActiveProgress =
        frame.activeProgress.toFixed(6);
      this.dom.canvas.dataset.continuousDelayedFeedbackStartAtLeftEnds =
        String(frame.displayProgress <= Number.EPSILON);
      this.dom.canvas.dataset.continuousDelayedFeedbackArcVisual =
        "curved_fading_causal_arcs";
      this.dom.canvas.dataset.continuousDelayedFeedbackArcCadence =
        "lesson-two-wake-front-cadence";
      this.dom.canvas.dataset.continuousDelayedFeedbackArcSpacing =
        this.getWakeFrontSpacing().toFixed(6);
      this.dom.canvas.dataset.continuousDelayedFeedbackEndpointMarkerCount =
        "0";
      this.dom.canvas.dataset.continuousDelayedFeedbackSourceOrigin =
        "timed_path_emission_point";
      this.dom.canvas.dataset.continuousDelayedFeedbackEvidenceBoundary =
        "Display-only sampled trace on the shared paired paths; frozen arcs are retained screen history and the active pair is a teaching animation. This display does not establish solved physics, a dynamical law, binding, stability, or numerical validation.";
    }
  }

  createStoryContinuousDelayedFeedbackFrame(
    scene,
    replayTime = this.getCurrentReplayTime(),
  ) {
    return createStoryContinuousDelayedFeedbackFrame(
      this.learnerState,
      scene,
      replayTime,
    );
  }

  drawStoryContinuousDelayedFeedbackArc(ctx, arc, active) {
    const target = active ? arc.current : arc.end;
    const radius = getDistance(arc.start, target);
    if (!(radius > TIME_EPSILON)) {
      return;
    }
    const baseColor = arc.sourceKind === "positrino" ? POSITRINO_WAKE : ELECTRINO_WAKE;
    const wakeStyle = this.getWakeVisualStyle();
    const lessonTwoTiming = {
      source: arc.start,
      receiver: target,
      sourceT: arc.startTime,
      receiverT: arc.endTime,
      progress: 1,
      active: true,
      startedForLoop: true,
      completedForLoop: false,
      liveWakeSeries: true,
    };
    const lessonTwoLink = {
      distance: radius,
      liveWakeSeries: true,
    };
    const frontProgresses = this.getWakeFrontProgresses(
      lessonTwoTiming,
      lessonTwoLink,
    );
    // Reuse the app's established curved fading wake-front grammar. Each
    // retained causal event is a stack of short circular-front segments
    // growing from the actual transmitter point toward the current/received
    // point. No straight connector or endpoint ornament is added.
    this.drawWakeBuildProgression(
      ctx,
      { color: baseColor },
      {
        source: arc.start,
        radius,
        theta: getAngleDegrees(arc.start, target),
        falloffWeight: 1,
        frontProgresses,
        visualWeight: {
          alphaScale: active ? 1.15 : 0.58,
          radiusScale: active ? 1.08 : 0.9,
          desaturation: active ? 0.08 : 0.28,
        },
        wakeStyle: {
          ...wakeStyle,
          finalSpan: active ? 9 : 7,
        },
      },
    );
  }

  createStoryForwardWakeBuildupFrame(scene, replayTime) {
    const startTime = Number(scene?.playbackStartTime);
    const endTime = Number(scene?.playbackEndTime);
    const displayTime = clamp(replayTime, startTime, endTime);
    const duration = Math.max(TIME_EPSILON, endTime - startTime);
    const emissionTimeStep = duration * 0.025;
    const fronts = [];
    let minimumContainmentMargin = Number.POSITIVE_INFINITY;
    let minimumSpeedRatio = Number.POSITIVE_INFINITY;
    let maximumSpeedRatio = 0;
    const bodies = {};

    ARCHITRINO_KINDS.forEach((kind) => {
      const arcLength = this.getPathArcLengthTable(kind).totalLength;
      const bodySpeed = arcLength / duration;
      const wakeExpansionSpeed = bodySpeed;
      const body = this.getFixedSpeedReplayPathPoint(kind, displayTime);
      bodies[kind] = body;
      const speedRatio = wakeExpansionSpeed / Math.max(bodySpeed, TIME_EPSILON);
      minimumSpeedRatio = Math.min(minimumSpeedRatio, speedRatio);
      maximumSpeedRatio = Math.max(maximumSpeedRatio, speedRatio);
      const finalIndex = Math.floor(
        (displayTime - startTime) / emissionTimeStep - TIME_EPSILON,
      );
      for (let index = 0; index <= finalIndex; index += 1) {
        const emissionTime = startTime + index * emissionTimeStep;
        if (emissionTime >= displayTime - TIME_EPSILON) {
          continue;
        }
        const center = this.getFixedSpeedReplayPathPoint(kind, emissionTime);
        const fieldRadius = wakeExpansionSpeed * (displayTime - emissionTime);
        const radius = getDistance(center, body);
        const leadingDirection = radius > TIME_EPSILON
          ? {
              x: (body.x - center.x) / radius,
              y: (body.y - center.y) / radius,
            }
          : { x: 1, y: 0 };
        fronts.push({
          transmitterId: kind,
          center,
          radius,
          fieldRadius,
          currentBody: body,
          leadingPoint: body,
          leadingDirection,
          emissionTime,
          bodySpeed,
          wakeExpansionSpeed,
          declaredFieldSpeed: true,
          trailingHalfPlaneOnly: true,
          bodyAnchoredFullSphereProjection: true,
        });
        minimumContainmentMargin = Math.min(
          minimumContainmentMargin,
          radius - getDistance(center, body),
        );
      }
    });

    const leadingErrors = fronts.map((front) =>
      getDistance(front.leadingPoint, front.currentBody));
    return {
      startTime,
      endTime,
      displayTime,
      duration,
      emissionTimeStep,
      bodies,
      fronts,
      minimumContainmentMargin: Number.isFinite(minimumContainmentMargin)
        ? minimumContainmentMargin
        : 0,
      minimumSpeedRatio: Number.isFinite(minimumSpeedRatio)
        ? minimumSpeedRatio
        : 1,
      maximumSpeedRatio,
      maximumLeadingCoincidenceError: leadingErrors.length > 0
        ? Math.max(...leadingErrors)
        : 0,
    };
  }

  getForwardWakeBuildupSphereGeometry(front) {
    const center = this.worldToScreen(front?.center);
    const leadingPoint = this.worldToScreen(front?.currentBody);
    if (!center || !leadingPoint) {
      return null;
    }
    const delta = {
      x: leadingPoint.x - center.x,
      y: leadingPoint.y - center.y,
    };
    const radius = Math.hypot(delta.x, delta.y);
    if (!(radius > TIME_EPSILON)) {
      return null;
    }
    const leadingDirection = {
      x: delta.x / radius,
      y: delta.y / radius,
    };
    const perpendicularDirection = {
      x: -leadingDirection.y,
      y: leadingDirection.x,
    };
    const points = Array.from(
      { length: FORWARD_WAKE_SPHERE_SEGMENT_COUNT + 1 },
      (_unused, index) => {
        const angle =
          (index / FORWARD_WAKE_SPHERE_SEGMENT_COUNT) * Math.PI * 2;
        return {
          x:
            center.x +
            radius *
              (leadingDirection.x * Math.cos(angle) +
                perpendicularDirection.x * Math.sin(angle)),
          y:
            center.y +
            radius *
              (leadingDirection.y * Math.cos(angle) +
                perpendicularDirection.y * Math.sin(angle)),
        };
      },
    );
    const maximumDisplayedTimeLead = Math.max(
      ...points.map(
        (point) =>
          (point.x - leadingPoint.x) * leadingDirection.x +
          (point.y - leadingPoint.y) * leadingDirection.y,
      ),
    );
    const upperPointCount = points.filter(
      (point) => point.y < center.y - TIME_EPSILON,
    ).length;
    const lowerPointCount = points.filter(
      (point) => point.y > center.y + TIME_EPSILON,
    ).length;
    return {
      center,
      leadingPoint,
      radius,
      points,
      maximumDisplayedTimeLead,
      upperPointCount,
      lowerPointCount,
      leadingProjectionError: getDistance(points[0], leadingPoint),
      minimumScreenRadius: Math.min(
        ...points.map((point) => Math.hypot(
          point.x - center.x,
          point.y - center.y,
        )),
      ),
      maximumScreenRadius: Math.max(
        ...points.map((point) => Math.hypot(
          point.x - center.x,
          point.y - center.y,
        )),
      ),
    };
  }

  drawForwardWakeBuildupSphere(ctx, front, color) {
    const geometry = this.getForwardWakeBuildupSphereGeometry(front);
    if (!geometry) {
      return;
    }
    ctx.save();
    ctx.strokeStyle = colorToCss(color);
    ctx.lineWidth = Math.max(0.9, 1.25 * this.viewport.scale);
    ctx.beginPath();
    ctx.moveTo(geometry.points[0].x, geometry.points[0].y);
    geometry.points.slice(1).forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  drawForwardWakeBuildupHistory(ctx, frame) {
    ARCHITRINO_KINDS.forEach((kind) => {
      frame.fronts
        .filter((front) => front.transmitterId === kind)
        .forEach((front) => {
          const baseColor = kind === "positrino" ? POSITRINO : ELECTRINO;
          this.drawForwardWakeBuildupSphere(
            ctx,
            front,
            withAlpha(mixColor(baseColor, WHITE, 0.22), 0.68),
          );
        });
      frame.fronts
        .filter((front) => front.transmitterId === kind)
        .forEach((front) => {
          this.drawStoryEmissionOriginMarker(ctx, front.center, 1, kind);
        });
    });
  }

  drawPairedFullWakeHistory(ctx, fronts, bodyDisplayTime, {
    drawBodies = true,
    useTraversalPaths = false,
  } = {}) {
    (fronts ?? []).forEach((front) => {
      const baseColor = front.transmitterId === "positrino"
        ? POSITRINO
        : ELECTRINO;
      this.drawSolidWakeCircle(
        ctx,
        front.center,
        front.radius,
        withAlpha(mixColor(baseColor, WHITE, 0.22), 0.68),
      );
      this.drawStoryEmissionOriginMarker(
        ctx,
        front.center,
        1,
        front.transmitterId,
      );
    });
    if (drawBodies) {
      this.drawGuidedLiveMarkers(
        ctx,
        bodyDisplayTime,
        {
          positrino: { x: 50, y: -64 },
          electrino: { x: 50, y: 36 },
        },
        { useTraversalPaths },
      );
    }
  }

  drawSceneHeading(ctx, text) {
    this.drawScreenText(
      ctx,
      text,
      { x: this.canvasWidth * 0.5, y: 68 * this.viewport.scale },
      17,
      withAlpha(WHITE, 0.82),
      "center",
      "bold",
    );
  }

  drawBackground(ctx) {
    ctx.fillStyle = FIXED_CANVAS_COLOR;
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    if (this.backgroundDepthFieldEnabled) {
      this.drawBackgroundDepthField(ctx);
    }

    const xAxisStart = this.worldToScreen({ x: TIME_AXIS_ORIGIN_X, y: TIME_AXIS_BASELINE_Y });
    const xAxisLineEndX = TIME_AXIS_END_X - 14;
    const yAxisLineEndY = SPACE_AXIS_TOP_Y + 14;
    const xAxisEnd = this.worldToScreen({ x: xAxisLineEndX, y: TIME_AXIS_BASELINE_Y });
    const yAxisStart = this.worldToScreen({ x: TIME_AXIS_ORIGIN_X, y: TIME_AXIS_BASELINE_Y });
    const yAxisEnd = this.worldToScreen({ x: TIME_AXIS_ORIGIN_X, y: yAxisLineEndY });
    this.drawLine(ctx, [xAxisStart, xAxisEnd], withAlpha(WHITE, 0.42), 1.2);
    this.drawLine(ctx, [yAxisStart, yAxisEnd], withAlpha(WHITE, 0.32), 1.2);

    this.drawTriangle(ctx, [
      this.worldToScreen({ x: TIME_AXIS_END_X, y: TIME_AXIS_BASELINE_Y }),
      this.worldToScreen({ x: TIME_AXIS_END_X - 14, y: TIME_AXIS_BASELINE_Y - 8 }),
      this.worldToScreen({ x: TIME_AXIS_END_X - 14, y: TIME_AXIS_BASELINE_Y + 8 }),
    ], withAlpha(WHITE, 0.48));
    this.drawTriangle(ctx, [
      this.worldToScreen({ x: TIME_AXIS_ORIGIN_X, y: SPACE_AXIS_TOP_Y }),
      this.worldToScreen({ x: TIME_AXIS_ORIGIN_X - 8, y: SPACE_AXIS_TOP_Y + 14 }),
      this.worldToScreen({ x: TIME_AXIS_ORIGIN_X + 8, y: SPACE_AXIS_TOP_Y + 14 }),
    ], withAlpha(WHITE, 0.3));

    this.drawText(ctx, "space", { x: 74, y: 165 }, 14, withAlpha(WHITE, 0.62), "left");
    this.drawText(
      ctx,
      "time",
      TIME_AXIS_LABEL_POSITION,
      14,
      withAlpha(WHITE, 0.72),
      "right",
    );
  }

  drawBackgroundDepthField(ctx) {
    const fieldColor = withAlpha({ r: 198, g: 166, b: 255, a: 1 }, 0.07);
    const anchorRows = [
      { y: 256, bend: 28 },
      { y: 352, bend: -20 },
      { y: 448, bend: 22 },
      { y: 548, bend: -24 },
      { y: 648, bend: 20 },
      { y: 748, bend: -22 },
      { y: 842, bend: 18 },
    ];
    anchorRows.forEach((row, rowIndex) => {
      const points = [];
      for (let index = 0; index <= 18; index += 1) {
        const t = index / 18;
        const x = 140 + t * 1640;
        const phase = t * Math.PI * 2 + rowIndex * 0.62;
        points.push(this.worldToScreen({
          x,
          y: row.y + Math.sin(phase) * row.bend,
        }));
      }
      this.drawLine(ctx, points, fieldColor, 0.8);
    });
  }

  getWakeVisualStyle() {
    const dotRadius = FIXED_WAKE_VISUAL_STYLE.dotRadius * (1.35 / 1.8);
    const alphaScale = FIXED_WAKE_VISUAL_STYLE.alphaScale * (0.86 / 1.18);
    return {
      ...FIXED_WAKE_VISUAL_STYLE,
      finalSpan: 7,
      startSpan: 7,
      dotRadius,
      alphaScale,
      falloffPower: 1,
    };
  }

  getWakeVisualModeLabel() {
    const settings = this.wakeVisualSettings ?? DEFAULT_WAKE_VISUAL_SETTINGS;
    if (settings.fullCircularWakesEnabled) {
      return "full circular";
    }
    return "arc wakes";
  }

  drawWakes(
    ctx,
    replayTime = this.getCurrentReplayTime(),
    visibleWakeSeries = this.getVisibleWakeSeries(replayTime),
  ) {
    const drawArcWakes = this.wakeVisualSettings.arcWakesEnabled === true;
    const drawFullCircularWakes = this.wakeVisualSettings.fullCircularWakesEnabled === true;
    if (drawFullCircularWakes) {
      this.drawFullCircularWakes(ctx, replayTime);
      return;
    }
    if (!drawArcWakes) {
      return;
    }
    visibleWakeSeries.forEach((link) => {
      this.drawWakeProgression(ctx, link, replayTime);
    });
  }

  drawForegroundWakeEmissionLines(
    ctx,
    replayTime = this.getCurrentReplayTime(),
    visibleWakeSeries = this.getVisibleWakeSeries(replayTime),
  ) {
    const drawFullCircularWakes = this.wakeVisualSettings.fullCircularWakesEnabled === true;
    if (!drawFullCircularWakes) {
      return;
    }
    visibleWakeSeries.forEach((link) => {
      this.drawWakeEmissionLine(ctx, link, replayTime);
    });
  }

  drawFullCircularWakes(ctx, replayTime) {
    this.getVisibleCausalIsochronSpheres(replayTime).forEach((sphere) => {
      this.drawCausalIsochronSphere(ctx, sphere);
    });
  }

  drawCausalIsochronSphere(ctx, sphere) {
    if (!this.shouldDrawCausalIsochronSphere(sphere)) {
      return;
    }
    const wakeStyle = this.getWakeVisualStyle();
    const wakeColor = mixColor(sphere.color, WHITE, 0.18);
    const alpha = (118 / 255) * wakeStyle.alphaScale * this.getCausalIsochronSphereVisualWeight(sphere);
    this.drawSolidWakeCircle(
      ctx,
      sphere.origin,
      sphere.radius,
      withAlpha(wakeColor, alpha),
    );
  }

  getCausalIsochronSphereVisualWeight(sphere) {
    const age = Number(sphere?.age);
    const [pathStart, pathEnd] = this.getReplayTimeRange();
    const pathDuration = pathEnd - pathStart;
    if (!Number.isFinite(age) || !Number.isFinite(pathDuration) || pathDuration <= TIME_EPSILON) {
      return 1;
    }
    const wakeStyle = this.getWakeVisualStyle();
    const ageRatio = clamp(age / pathDuration, 0, 1);
    const distanceFalloff = Math.pow(1 - ageRatio * 0.72, wakeStyle.falloffPower);
    return 0.34 + 0.66 * distanceFalloff;
  }

  shouldDrawCausalIsochronSphere(sphere) {
    const radius = Number(sphere?.radius);
    if (!sphere?.origin || !Number.isFinite(radius) || radius <= TIME_EPSILON) {
      return false;
    }
    const center = this.worldToScreen(sphere.origin);
    const screenRadius = radius * this.viewport.scale;
    const margin = Math.max(4, FIXED_WAKE_VISUAL_STYLE.dotRadius * this.viewport.scale * 3);
    const minDx = center.x < 0 ? -center.x : center.x > this.canvasWidth ? center.x - this.canvasWidth : 0;
    const minDy = center.y < 0 ? -center.y : center.y > this.canvasHeight ? center.y - this.canvasHeight : 0;
    const minDistance = Math.hypot(minDx, minDy);
    const maxDistance = Math.max(
      Math.hypot(center.x, center.y),
      Math.hypot(center.x - this.canvasWidth, center.y),
      Math.hypot(center.x, center.y - this.canvasHeight),
      Math.hypot(center.x - this.canvasWidth, center.y - this.canvasHeight),
    );
    return screenRadius + margin >= minDistance && screenRadius <= maxDistance + margin;
  }

  drawWakeProgression(ctx, link, replayTime, { maximumProgress = 1 } = {}) {
    const timing = this.getWakeTiming(link, replayTime);
    if (!this.shouldDrawWakeSeries(timing)) {
      return;
    }
    const wakeStyle = this.getWakeVisualStyle();
    const radius = getDistance(timing.source, timing.receiver);
    const theta = getAngleDegrees(timing.source, timing.receiver);
    const falloffWeight = Math.pow(link.weight, wakeStyle.falloffPower);
    const visualWeight = this.getWakeVisualWeight(link);
    const frontProgresses = this.getWakeFrontProgressesThroughProgress(
      timing,
      link,
      maximumProgress,
    );

    this.drawWakeBuildProgression(ctx, link, {
      source: timing.source,
      radius,
      theta,
      falloffWeight,
      frontProgresses,
      visualWeight,
      wakeStyle,
    });
  }

  drawWakeEmissionLine(ctx, link, replayTime) {
    const timing = this.getWakeTiming(link, replayTime);
    if (!this.shouldDrawWakeSeries(timing)) {
      return;
    }
    const wakeStyle = this.getWakeVisualStyle();
    const visualWeight = this.getWakeVisualWeight(link);
    const falloffWeight = Math.pow(link.weight, wakeStyle.falloffPower);
    const wakeColor = mixColor(link.color, WHITE, visualWeight.desaturation);
    const alpha = Math.max(
      0.34,
      0.52 * wakeStyle.alphaScale * (0.5 + 0.5 * falloffWeight) * visualWeight.alphaScale,
    );
    const width = Math.max(1.5, wakeStyle.dotRadius * 1.18 * visualWeight.radiusScale);
    this.drawLine(
      ctx,
      [this.worldToScreen(timing.receiver), this.worldToScreen(timing.source)],
      withAlpha(wakeColor, alpha),
      Math.max(1, width),
    );
  }

  drawWakeBuildProgression(
    ctx,
    link,
    { source, radius, theta, falloffWeight, frontProgresses, visualWeight, wakeStyle, fullCircle = false },
  ) {
    const resolvedWakeStyle = wakeStyle ?? this.getWakeVisualStyle();

    for (const progress of frontProgresses) {
      if (progress <= 0) {
        continue;
      }
      const bandRadius = radius * progress;
      const wakeSpan = fullCircle ? 360 : resolvedWakeStyle.finalSpan;
      const emitterBias = 1 - progress;
      const alpha =
        ((84 + 124 * emitterBias) / 255) *
        (0.48 + 0.52 * falloffWeight) *
        resolvedWakeStyle.alphaScale *
        visualWeight.alphaScale;
      const dotRadius =
        resolvedWakeStyle.dotRadius *
        (0.82 + 0.34 * emitterBias) *
        (0.72 + 0.3 * falloffWeight) *
        visualWeight.radiusScale;
      const wakeColor = mixColor(link.color, WHITE, visualWeight.desaturation);
      const startDeg = fullCircle ? 0 : theta - wakeSpan * 0.5;
      const endDeg = fullCircle ? 360 : theta + wakeSpan * 0.5;
      this.drawDottedArc(
        ctx,
        source,
        bandRadius,
        startDeg,
        endDeg,
        withAlpha(wakeColor, alpha),
        Math.max(1.05, dotRadius),
      );
    }
  }

  drawPathTrail(ctx, kind, color) {
    const path = this.dataset.paths[kind];
    if (usesC1TimedPathInterpolation(path)) {
      this.drawC1TimedPath(ctx, path, color, CAUSAL_PATH_STROKE_WIDTH);
      return;
    }
    const points = path.map((point) => this.worldToScreen(point));
    this.drawSmoothLine(ctx, points, color, CAUSAL_PATH_STROKE_WIDTH);
  }

  drawC1TimedPath(ctx, path, color, width) {
    if (!Array.isArray(path) || path.length < 2) {
      return;
    }
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = colorToCss(color);
    ctx.lineWidth = Math.max(1, width * this.viewport.scale);
    ctx.beginPath();
    const start = this.worldToScreen(path[0]);
    ctx.moveTo(start.x, start.y);
    for (let index = 0; index < path.length - 1; index += 1) {
      const segment = getC1TimedPathBezierSegment(path, index);
      if (!segment) {
        continue;
      }
      const controlStart = this.worldToScreen(segment.controlStart);
      const controlEnd = this.worldToScreen(segment.controlEnd);
      const end = this.worldToScreen(segment.end);
      ctx.bezierCurveTo(
        controlStart.x,
        controlStart.y,
        controlEnd.x,
        controlEnd.y,
        end.x,
        end.y,
      );
    }
    ctx.stroke();
    ctx.restore();
  }

  drawSelection(ctx) {
    if (!this.selectedItem) {
      return;
    }
    const link = this.getVisibleWakeSeries().find((candidate) => candidate.id === this.selectedItem.linkId);
    if (!link) {
      return;
    }
    const endpoints = this.getWakeEndpoints(link);
    if (!endpoints) {
      return;
    }
    this.drawCircle(ctx, this.worldToScreen(endpoints.source), 13, withAlpha(link.color, 0.08), withAlpha(WHITE, 0.58), 1);
    this.drawCircle(ctx, this.worldToScreen(endpoints.receiver), 15, withAlpha(WHITE, 0.04), withAlpha(WHITE, 0.78), 1.1);
  }

  drawSandboxTransmissionGhost(
    ctx,
    visibleWakeSeries = this.getVisibleWakeSeries(),
  ) {
    visibleWakeSeries.forEach((link) => {
      this.drawTransmissionGhost(ctx, link.source, link.sourceKind, {
        showLabel: false,
      });
    });
  }

  drawTransmissionGhost(ctx, point, kind, {
    label = "",
    emphasized = false,
    labelOffset = { x: 0, y: -27 },
    showLabel = Boolean(label),
  } = {}) {
    if (!point) {
      return;
    }
    const screen = this.worldToScreen(point);
    this.drawTransmissionPointMarker(
      ctx,
      point,
      undefined,
      1,
      this.getTransmissionHistoryMarkerColor(kind),
    );
    if (showLabel) {
      this.drawScreenText(
        ctx,
        label,
        {
          x: screen.x + labelOffset.x * this.viewport.scale,
          y: screen.y + labelOffset.y * this.viewport.scale,
        },
        12,
        withAlpha(WHITE, emphasized ? 0.82 : 0.62),
        "center",
        emphasized ? "bold" : "normal",
      );
    }
  }

  drawTransmissionPointMarker(
    ctx,
    point,
    variant = this.transmissionPointMarkerVariant,
    opacity = 1,
    color = WHITE,
  ) {
    if (!point) {
      return;
    }
    const normalizedVariant = normalizeTransmissionPointMarkerVariant(variant);
    const style = TRANSMISSION_POINT_MARKER_STYLES[normalizedVariant];
    const markerOpacity = clamp(Number(opacity) || 0, 0, 1);
    const screen = this.worldToScreen(point);
    if (normalizedVariant === TRANSMISSION_POINT_MARKER_VARIANTS.OPEN_RING_BASELINE) {
      this.drawCircle(
        ctx,
        screen,
        Math.max(style.minimumRadius, style.radius * this.viewport.scale),
        withAlpha(WHITE, style.fillAlpha * markerOpacity),
        withAlpha(WHITE, style.outlineAlpha * markerOpacity),
        style.outlineWidth,
      );
      return;
    }
    this.drawCircle(
      ctx,
      screen,
      style.radius,
      withAlpha(color, style.fillAlpha * markerOpacity),
    );
  }

  getTransmissionHistoryMarkerColor(kind) {
    if (kind === "positrino") {
      return POSITRINO_WAKE;
    }
    if (kind === "electrino") {
      return ELECTRINO_WAKE;
    }
    return WHITE;
  }

  drawLiveMarkers(ctx, replayTime = this.getCurrentReplayTime()) {
    this.drawLiveMarker(ctx, "positrino", POSITRINO, this.getTraversalPathPoint("positrino", replayTime), "positrino", {
      x: 0,
      y: -36,
    });
    this.drawLiveMarker(ctx, "electrino", ELECTRINO, this.getTraversalPathPoint("electrino", replayTime), "electrino", {
      x: 0,
      y: 36,
    });
  }

  drawLiveMarker(ctx, kind, color, point, label, labelOffset) {
    if (!point) {
      return;
    }
    const screen = this.worldToScreen(point);
    this.drawCircle(
      ctx,
      screen,
      ARCHITRINO_BODY_HALO_RADIUS,
      withAlpha(color, 0.12),
    );
    this.drawCircle(
      ctx,
      screen,
      ARCHITRINO_BODY_RADIUS,
      color,
      WHITE,
      ARCHITRINO_BODY_OUTLINE_WIDTH,
    );
    const normalizedKind = String(kind).toLowerCase();
    if (normalizedKind === "positrino" || normalizedKind === "electrino") {
      this.drawStoryEmissionOriginMarker(ctx, point);
    }
    const labelColor = normalizedKind === "electrino"
      ? ELECTRINO_LABEL
      : withAlpha(color, 0.9);
    this.drawScreenText(
      ctx,
      label,
      {
        x: screen.x + labelOffset.x * this.viewport.scale,
        y: screen.y + labelOffset.y * this.viewport.scale,
      },
      14,
      labelColor,
      "center",
      "bold",
    );
  }

  drawDottedArc(ctx, center, radius, startDeg, endDeg, color, dotRadius) {
    drawDottedWakeArc(ctx, {
      center,
      radius,
      startDegrees: startDeg,
      endDegrees: endDeg,
      color,
      dotRadius,
      worldToScreen: (point) => this.worldToScreen(point),
    });
  }

  drawLine(ctx, points, color, width) {
    if (points.length < 2) {
      return;
    }
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = colorToCss(color);
    ctx.lineWidth = Math.max(1, width * this.viewport.scale);
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let index = 1; index < points.length; index += 1) {
      ctx.lineTo(points[index].x, points[index].y);
    }
    ctx.stroke();
    ctx.restore();
  }

  drawSmoothLine(ctx, points, color, width) {
    const splinePoints = this.getDrawableSplinePoints(points);
    if (splinePoints.length < 2) {
      return;
    }
    if (splinePoints.length === 2 || typeof ctx.bezierCurveTo !== "function") {
      this.drawLine(ctx, splinePoints, color, width);
      return;
    }
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = colorToCss(color);
    ctx.lineWidth = Math.max(1, width * this.viewport.scale);
    ctx.beginPath();
    ctx.moveTo(splinePoints[0].x, splinePoints[0].y);
    for (let index = 0; index < splinePoints.length - 1; index += 1) {
      const segment = this.getCentripetalCatmullRomBezierSegment(splinePoints, index);
      if (!segment) {
        continue;
      }
      ctx.bezierCurveTo(
        segment.controlStart.x,
        segment.controlStart.y,
        segment.controlEnd.x,
        segment.controlEnd.y,
        segment.end.x,
        segment.end.y,
      );
    }
    ctx.stroke();
    ctx.restore();
  }

  getDrawableSplinePoints(points) {
    if (!Array.isArray(points)) {
      return [];
    }
    const drawablePoints = [];
    points.forEach((point) => {
      const x = Number(point?.x);
      const y = Number(point?.y);
      if (!Number.isFinite(x) || !Number.isFinite(y)) {
        return;
      }
      const nextPoint = { x, y };
      const previous = drawablePoints.at(-1);
      if (previous && getDistance(previous, nextPoint) <= TIME_EPSILON) {
        return;
      }
      drawablePoints.push(nextPoint);
    });
    return drawablePoints;
  }

  getCentripetalCatmullRomBezierSegment(points, index) {
    const p0 = this.getCatmullRomSupportPoint(points, index - 1);
    const p1 = points[index];
    const p2 = points[index + 1];
    const p3 = this.getCatmullRomSupportPoint(points, index + 2);
    if (!p0 || !p1 || !p2 || !p3) {
      return null;
    }

    const t0 = 0;
    const t1 = t0 + this.getCentripetalCatmullRomParameterDistance(p0, p1);
    const t2 = t1 + this.getCentripetalCatmullRomParameterDistance(p1, p2);
    const t3 = t2 + this.getCentripetalCatmullRomParameterDistance(p2, p3);
    const segmentSpan = t2 - t1;
    if (!Number.isFinite(segmentSpan) || segmentSpan <= TIME_EPSILON) {
      return null;
    }

    const tangentStart = this.getCentripetalCatmullRomTangent(p0, p1, p2, t0, t1, t2, segmentSpan);
    const tangentEnd = this.getCentripetalCatmullRomTangent(p1, p2, p3, t1, t2, t3, segmentSpan);
    return {
      controlStart: {
        x: p1.x + tangentStart.x / 3,
        y: p1.y + tangentStart.y / 3,
      },
      controlEnd: {
        x: p2.x - tangentEnd.x / 3,
        y: p2.y - tangentEnd.y / 3,
      },
      end: p2,
    };
  }

  getCatmullRomSupportPoint(points, index) {
    if (index >= 0 && index < points.length) {
      return points[index];
    }
    if (index < 0 && points.length >= 2) {
      const first = points[0];
      const second = points[1];
      return {
        x: first.x + (first.x - second.x),
        y: first.y + (first.y - second.y),
      };
    }
    if (index >= points.length && points.length >= 2) {
      const last = points.at(-1);
      const previous = points[points.length - 2];
      return {
        x: last.x + (last.x - previous.x),
        y: last.y + (last.y - previous.y),
      };
    }
    return null;
  }

  getCentripetalCatmullRomParameterDistance(left, right) {
    return Math.pow(Math.max(getDistance(left, right), TIME_EPSILON), CENTRIPETAL_CATMULL_ROM_ALPHA);
  }

  getCentripetalCatmullRomTangent(left, center, right, leftT, centerT, rightT, segmentSpan) {
    const leftSpan = centerT - leftT;
    const rightSpan = rightT - centerT;
    const fullSpan = rightT - leftT;
    if (
      leftSpan <= TIME_EPSILON ||
      rightSpan <= TIME_EPSILON ||
      fullSpan <= TIME_EPSILON ||
      segmentSpan <= TIME_EPSILON
    ) {
      return { x: 0, y: 0 };
    }
    return {
      x:
        segmentSpan *
        (
          (center.x - left.x) / leftSpan -
          (right.x - left.x) / fullSpan +
          (right.x - center.x) / rightSpan
        ),
      y:
        segmentSpan *
        (
          (center.y - left.y) / leftSpan -
          (right.y - left.y) / fullSpan +
          (right.y - center.y) / rightSpan
        ),
    };
  }

  drawCircle(ctx, point, radius, fill, outline = null, outlineWidth = 1) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(point.x, point.y, Math.max(1, radius * this.viewport.scale), 0, Math.PI * 2);
    ctx.fillStyle = colorToCss(fill);
    ctx.fill();
    if (outline) {
      ctx.lineWidth = Math.max(1, outlineWidth * this.viewport.scale);
      ctx.strokeStyle = colorToCss(outline);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawTriangle(ctx, points, color) {
    ctx.save();
    ctx.fillStyle = colorToCss(color);
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawText(ctx, text, worldPoint, size, color, align = "left", weight = "normal") {
    const screen = this.worldToScreen(worldPoint);
    this.drawScreenText(ctx, text, screen, size, color, align, weight);
  }

  drawScreenText(ctx, text, screenPoint, size, color, align = "left", weight = "normal") {
    ctx.save();
    ctx.fillStyle = colorToCss(color);
    ctx.font = `${weight === "bold" ? "700 " : ""}${Math.max(9, size * this.viewport.scale)}px "Helvetica Neue", Arial, sans-serif`;
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.fillText(text, screenPoint.x, screenPoint.y);
    ctx.restore();
  }

  handleCanvasPointerMove(event) {
    if (this.dragState) {
      if (this.dragState.type === "history") {
        this.dragSelectedHistoryPoint(event);
      }
      if (this.dragState.type === "path-line") {
        this.dragSelectedPathLine(event);
      }
      return;
    }
    if (this.backgroundPointers.has(this.pointerKey(event))) {
      this.handleBackgroundPointerMove(event);
    }
  }

  handleCanvasPointerDown(event) {
    const screen = this.canvasScreenPointFromEvent(event);
    const hit = this.findNearestHit(screen, { includeWakes: true, includePaths: true });
    if (!hit) {
      this.selectedItem = null;
      this.updateReadout();
      this.render();
      this.startBackgroundPointer(event, screen);
      return;
    }
    this.clearBackgroundPointers();
    this.selectedItem = hit.selection;
    this.updateReadout(hit);
    if (hit.type === "history") {
      this.startHistoryPointDrag(event, hit);
    }
    if (hit.type === "path-line") {
      this.startPathLineDrag(event, hit);
    }
    this.render();
  }

  cancelPendingReplayForDirectManipulation() {
    if (this.replayLoadState !== "loading") {
      return false;
    }
    this.replayLoadSequence += 1;
    this.replayLoadState = this.dataset?.datasetSource === DIRECT_MANIPULATION_DRAFT_PREVIEW
      ? "draft"
      : "ready";
    this.updateReplayStatus();
    return true;
  }

  handleCanvasWheel(event) {
    if (this.dragState) {
      return;
    }
    const rect = this.dom.canvas.getBoundingClientRect();
    const screen = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    const eventTime = Number(event.timeStamp);
    const cached = this.wheelHitCache;
    const canReuseHit = cached &&
      cached.datasetRevision === this.datasetRevision &&
      Number.isFinite(eventTime) &&
      eventTime >= cached.eventTime &&
      eventTime - cached.eventTime <= WHEEL_HIT_CACHE_MILLISECONDS &&
      Math.hypot(screen.x - cached.x, screen.y - cached.y) <= WHEEL_HIT_CACHE_RADIUS;
    const hit = canReuseHit
      ? cached.hit
      : this.findNearestHit(screen, { includeWakes: true });
    this.wheelHitCache = {
      datasetRevision: this.datasetRevision,
      eventTime: Number.isFinite(eventTime) ? eventTime : 0,
      x: screen.x,
      y: screen.y,
      hit,
    };
    if (hit) {
      return;
    }
    if (!this.zoomViewportAtScreenPoint(screen, event.deltaY)) {
      return;
    }
    event.preventDefault?.();
    if (this.context) {
      this.render();
    }
  }

  startBackgroundPointer(event, screen) {
    if (this.dragState) {
      return;
    }
    this.backgroundPointers.set(this.pointerKey(event), screen);
    this.pinchState = this.backgroundPointers.size >= 2 ? this.createPinchState() : null;
    if (typeof this.dom.canvas.setPointerCapture === "function" && event.pointerId != null) {
      this.dom.canvas.setPointerCapture(event.pointerId);
    }
    if (event.pointerType === "touch") {
      event.preventDefault?.();
    }
  }

  handleBackgroundPointerMove(event) {
    const key = this.pointerKey(event);
    if (!this.backgroundPointers.has(key)) {
      return false;
    }
    this.backgroundPointers.set(key, this.canvasScreenPointFromEvent(event));
    if (this.backgroundPointers.size < 2) {
      return false;
    }
    const pinchState = this.pinchState ?? this.createPinchState();
    if (!pinchState) {
      return false;
    }
    this.pinchState = pinchState;
    const geometry = this.getPinchGeometry();
    if (!geometry || geometry.distance <= 0 || pinchState.startDistance <= 0) {
      return false;
    }
    const nextZoom = pinchState.startZoom * (geometry.distance / pinchState.startDistance);
    const didZoom = this.setViewportZoomWithAnchorWorld(
      geometry.center,
      pinchState.anchorWorld,
      nextZoom,
      this.viewportZoom,
    );
    event.preventDefault?.();
    if (didZoom && this.context) {
      this.render();
    }
    return didZoom;
  }

  startHistoryPointDrag(event, hit) {
    this.clearBackgroundPointers();
    const screen = this.canvasScreenPointFromEvent(event);
    this.dragState = {
      type: "history",
      kind: hit.selection.kind,
      depth: hit.selection.depth,
      lastWorld: this.screenToWorld(screen),
      didEdit: false,
    };
    this.setPlaying(false);
    if (typeof this.dom.canvas.setPointerCapture === "function") {
      this.dom.canvas.setPointerCapture(event.pointerId);
    }
    event.preventDefault?.();
  }

  dragSelectedHistoryPoint(event) {
    const screen = this.canvasScreenPointFromEvent(event);
    const world = this.screenToWorld(screen);
    const delta = {
      x: world.x - this.dragState.lastWorld.x,
      y: world.y - this.dragState.lastWorld.y,
    };
    this.dragState.lastWorld = world;
    if (this.applyRetainedPointDrag(this.dragState.kind, this.dragState.depth, delta)) {
      this.dragState.didEdit = true;
      this.updateReadout();
      this.render();
    }
  }

  startPathLineDrag(event, hit) {
    this.clearBackgroundPointers();
    const screen = this.canvasScreenPointFromEvent(event);
    this.dragState = {
      type: "path-line",
      kind: hit.selection.kind,
      anchorT: hit.selection.anchorT,
      lastWorld: this.screenToWorld(screen),
      didEdit: false,
    };
    this.setPlaying(false);
    if (typeof this.dom.canvas.setPointerCapture === "function") {
      this.dom.canvas.setPointerCapture(event.pointerId);
    }
    event.preventDefault?.();
  }

  dragSelectedPathLine(event) {
    const screen = this.canvasScreenPointFromEvent(event);
    const world = this.screenToWorld(screen);
    const delta = {
      x: world.x - this.dragState.lastWorld.x,
      y: world.y - this.dragState.lastWorld.y,
    };
    this.dragState.lastWorld = world;
    if (this.applyPathLineDrag(this.dragState.kind, this.dragState.anchorT, delta)) {
      this.dragState.didEdit = true;
      this.updateReadout();
      this.render();
    }
  }

  finishDrag(event = null) {
    this.releaseCanvasPointer(event);
    this.dragState = null;
    return this.dataset;
  }

  applyRetainedPointDrag(kind, depth, delta) {
    const didEdit = this.deformPathAroundHistoryPoint(kind, depth, delta);
    if (!didEdit) {
      return false;
    }
    this.cancelPendingReplayForDirectManipulation();
    this.updateWakeLinkGeometry();
    this.syncReplayRequestOptionsFromDataset();
    this.markDraftPreview("retained_point_drag_preview");
    return true;
  }

  applyPathLineDrag(kind, anchorT, delta) {
    const didEdit = this.deformPathAroundPathTime(kind, anchorT, delta);
    if (!didEdit) {
      return false;
    }
    this.cancelPendingReplayForDirectManipulation();
    this.updateWakeLinkGeometry();
    this.syncReplayRequestOptionsFromDataset();
    this.markDraftPreview("path_line_drag_preview", {
      pathLineKind: kind,
      pathLineAnchorT: Number(anchorT),
    });
    return true;
  }

  applyInitialVelocityDrag(kind, velocityEnd) {
    const condition = this.getInitialCondition(kind);
    if (!condition || !velocityEnd) {
      return false;
    }
    const startPoint = this.getHistoryStartPoint(kind);
    if (startPoint) {
      this.syncInitialConditionToHistoryStart(kind, startPoint);
    }
    const velocityAnchor = this.getInitialVelocityAnchorPoint(kind, condition);
    const previousVelocity = {
      vx: Number(condition.vx) || 0,
      vy: Number(condition.vy) || 0,
    };
    const nextVelocity = this.velocityFromInitialConditionHandle(condition, velocityEnd, velocityAnchor);
    if (previousVelocity.vx === nextVelocity.vx && previousVelocity.vy === nextVelocity.vy) {
      return false;
    }

    condition.vx = nextVelocity.vx;
    condition.vy = nextVelocity.vy;
    this.cancelPendingReplayForDirectManipulation();
    this.applyInitialVelocityPreview(kind, { ...condition, ...velocityAnchor }, previousVelocity, nextVelocity);
    this.updateWakeLinkGeometry();
    this.syncReplayRequestOptionsFromDataset();
    this.markDraftPreview("initial_velocity_drag_preview");
    return true;
  }

  getWakeColorForKind(kind) {
    return kind === "positrino" ? POSITRINO_WAKE : ELECTRINO_WAKE;
  }

  markDraftPreview(reason, { staleSolverRows = true, ...draftMetadata } = {}) {
    if (!this.dataset) {
      return;
    }
    if (staleSolverRows) {
      this.markSolverWakeLinksStale(reason);
    }
    this.dataset.datasetSource = DIRECT_MANIPULATION_DRAFT_PREVIEW;
    this.dataset.displayAuthority = createDisplayAuthority(
      "local_drag_teaching_preview",
      {
        label: "Local drag teaching preview",
        replayRecomputed: false,
        recordedReplayChanged: false,
      },
    );
    this.dataset.draftPreview = {
      reason,
      authoritative: false,
      ...draftMetadata,
    };
    this.replayLoadState = "draft";
    this.replayLoadError = null;
    this.invalidateComputedCaches();
    this.syncReplayRequestOptionsFromDataset();
    this.updateReplayStatus();
  }

  markSolverWakeLinksStale(reason) {
    (this.dataset?.wakeLinks ?? []).forEach((link) => {
      if (!this.hasWakeSolverMetadata(link)) {
        return;
      }
      link.status = "stale";
      link.reason = reason;
      link.staleSolverRunId = link.solverRunId ?? link.staleSolverRunId;
      link.staleReplaySource = this.dataset.runId ?? this.dataset.datasetId ?? null;
    });
  }

  applyInitialVelocityPreview(kind, condition, previousVelocity, nextVelocity) {
    const points = this.dataset.paths[kind];
    if (!Array.isArray(points)) {
      return;
    }
    const deltaVelocity = {
      vx: nextVelocity.vx - previousVelocity.vx,
      vy: nextVelocity.vy - previousVelocity.vy,
    };
    points.forEach((point) => {
      this.applyVelocityPreviewToPoint(point, condition, deltaVelocity);
    });
    this.dataset.frames.forEach((frame) => {
      const point = frame[kind];
      if (!point || points.includes(point)) {
        return;
      }
      this.applyVelocityPreviewToPoint(point, condition, deltaVelocity, frame.t);
    });
    this.dataset.history[kind].forEach((point) => {
      this.applyVelocityPreviewToPoint(point, condition, deltaVelocity);
    });
  }

  applyVelocityPreviewToPoint(point, condition, deltaVelocity, fallbackT = point.t) {
    const sampleT = Number(fallbackT);
    const startT = Number(condition.t) || 0;
    if (!Number.isFinite(sampleT)) {
      return;
    }
    const dt = Math.max(0, sampleT - startT);
    if (dt === 0) {
      return;
    }
    const runDuration = Math.max(0.01, Number(this.dataset.initialConditions?.runDuration) || 1);
    const normalizedTime = clamp(dt / runDuration, 0, 1);
    const easing = 0.35 + 0.65 * Math.pow(normalizedTime, 1.15);
    const response = dt * easing * INITIAL_VELOCITY_PREVIEW_RESPONSE;
    point.x += deltaVelocity.vx * response;
    point.y += deltaVelocity.vy * response;
  }

  deformPathAroundHistoryPoint(kind, depth, delta) {
    if (!delta || (delta.x === 0 && delta.y === 0)) {
      return false;
    }
    const selectedPoint = this.dataset.history[kind]?.find((point) => point.depth === depth);
    if (!selectedPoint) {
      return false;
    }
    selectedPoint.x += delta.x;
    selectedPoint.y += delta.y;
    this.rebuildSmoothPathFromHistory(kind);
    this.syncInitialConditionToHistoryStart(kind, selectedPoint);
    return true;
  }

  deformPathAroundPathTime(kind, anchorT, delta) {
    if (!delta || (delta.x === 0 && delta.y === 0)) {
      return false;
    }
    const path = this.dataset?.paths?.[kind];
    if (!Array.isArray(path) || path.length === 0) {
      return false;
    }
    const effectiveAnchorT = this.getEndpointSafePathLineDragAnchorT(path, anchorT);
    const constrainedDelta = {
      x: this.constrainPathLineDragDeltaX(path, effectiveAnchorT, Number(delta.x) || 0),
      y: Number(delta.y) || 0,
    };
    if (
      Math.abs(constrainedDelta.x) <= TIME_EPSILON &&
      Math.abs(constrainedDelta.y) <= TIME_EPSILON
    ) {
      return false;
    }
    const pathPointSet = new Set(path);
    let didEdit = false;
    const applyDelta = (point, fallbackT = point?.t) => {
      if (!point || this.isPathEndpointPoint(kind, point, fallbackT)) {
        return;
      }
      const weight = this.getEndpointTaperedPathLineDragWeight(
        path,
        effectiveAnchorT,
        fallbackT,
      );
      if (weight <= 0) {
        return;
      }
      point.x += constrainedDelta.x * weight;
      point.y += constrainedDelta.y * weight;
      didEdit = true;
    };

    path.forEach((point) => {
      applyDelta(point, point.t);
    });
    (this.dataset?.frames ?? []).forEach((frame) => {
      const point = frame?.[kind];
      if (!point || pathPointSet.has(point)) {
        return;
      }
      applyDelta(point, Number.isFinite(Number(point.t)) ? point.t : frame.t);
    });
    (this.dataset?.history?.[kind] ?? []).forEach((point) => {
      applyDelta(point, point.t);
    });
    if (didEdit) {
      path.interpolationMode = C1_CUBIC_HERMITE_INTERPOLATION;
      this.syncPathDependentSamplesFromPath(kind);
    }
    const startPoint = this.getHistoryStartPoint(kind);
    if (startPoint) {
      this.syncInitialConditionToHistoryStart(kind, startPoint);
    }
    return didEdit;
  }

  getEndpointSafePathLineDragAnchorT(path, anchorT) {
    const startT = Number(path?.[0]?.t);
    const endT = Number(path?.at(-1)?.t);
    const requestedT = Number(anchorT);
    if (
      !Number.isFinite(startT) ||
      !Number.isFinite(endT) ||
      !Number.isFinite(requestedT) ||
      endT <= startT
    ) {
      return requestedT;
    }
    const pathSpan = endT - startT;
    const inset = Math.min(
      PATH_LINE_DRAG_FALLOFF_TIME * 0.125,
      pathSpan * PATH_LINE_DRAG_ENDPOINT_INSET_FRACTION,
    );
    return clamp(requestedT, startT + inset, endT - inset);
  }

  getEndpointTaperedPathLineDragWeight(path, anchorT, sampleT) {
    const anchor = Number(anchorT);
    const sample = Number(sampleT);
    const startT = Number(path?.[0]?.t);
    const endT = Number(path?.at(-1)?.t);
    let weight = this.getPathLineDragWeight(anchor, sample);
    if (
      weight <= 0 ||
      !Number.isFinite(startT) ||
      !Number.isFinite(endT)
    ) {
      return Math.max(0, weight);
    }
    if (
      sample < anchor &&
      anchor - startT < PATH_LINE_DRAG_FALLOFF_TIME
    ) {
      const amount = clamp((sample - startT) / Math.max(TIME_EPSILON, anchor - startT), 0, 1);
      weight *= amount * amount * amount * (amount * (amount * 6 - 15) + 10);
    }
    if (
      sample > anchor &&
      endT - anchor < PATH_LINE_DRAG_FALLOFF_TIME
    ) {
      const amount = clamp((endT - sample) / Math.max(TIME_EPSILON, endT - anchor), 0, 1);
      weight *= amount * amount * amount * (amount * (amount * 6 - 15) + 10);
    }
    return Math.max(0, weight);
  }

  constrainPathLineDragDeltaX(path, anchorT, requestedDeltaX) {
    const requested = Number(requestedDeltaX);
    if (!Number.isFinite(requested) || requested === 0 || path.length < 2) {
      return Number.isFinite(requested) ? requested : 0;
    }
    const startX = Number(path[0]?.x);
    const endX = Number(path.at(-1)?.x);
    const xSpan = endX - startX;
    if (!Number.isFinite(xSpan) || xSpan <= 0) {
      return 0;
    }
    const minimumGap = Math.max(
      TIME_EPSILON * 10,
      (xSpan / (path.length - 1)) * PATH_LINE_DRAG_MINIMUM_X_GAP_FRACTION,
    );
    const weights = path.map((point) =>
      this.getEndpointTaperedPathLineDragWeight(path, anchorT, point.t));
    let lowerBound = Number.NEGATIVE_INFINITY;
    let upperBound = Number.POSITIVE_INFINITY;
    for (let index = 0; index < path.length - 1; index += 1) {
      const gap = Number(path[index + 1]?.x) - Number(path[index]?.x);
      const weightDelta = weights[index + 1] - weights[index];
      if (!Number.isFinite(gap) || !Number.isFinite(weightDelta)) {
        continue;
      }
      const requiredChange = minimumGap - gap;
      if (weightDelta > TIME_EPSILON) {
        lowerBound = Math.max(lowerBound, requiredChange / weightDelta);
      } else if (weightDelta < -TIME_EPSILON) {
        upperBound = Math.min(upperBound, requiredChange / weightDelta);
      }
    }
    if (lowerBound > upperBound) {
      return 0;
    }
    return clamp(requested, lowerBound, upperBound);
  }

  getPathEndpointHandles(kind) {
    const history = this.getSortedFiniteHistory(kind);
    if (history.length === 0) {
      return [];
    }
    const start = history.find((point) => Number(point.depth) === 1) ?? history[0];
    const endDepth = this.getMaxHistoryDepth(kind);
    const end = history.find((point) => Number(point.depth) === endDepth) ?? history.at(-1);
    return start === end ? [start] : [start, end];
  }

  isPathEndpointPoint(kind, point, fallbackT = point?.t) {
    const depth = Number(point?.depth);
    if (depth === 1 || depth === this.getMaxHistoryDepth(kind)) {
      return true;
    }
    return this.isPathEndpointTime(kind, fallbackT);
  }

  isPathEndpointTime(kind, sampleT) {
    const path = this.dataset?.paths?.[kind] ?? [];
    if (path.length === 0) {
      return false;
    }
    const time = Number(sampleT);
    if (!Number.isFinite(time)) {
      return false;
    }
    const startT = Number(path[0]?.t);
    const endT = Number(path.at(-1)?.t);
    return (
      (Number.isFinite(startT) && Math.abs(time - startT) <= TIME_EPSILON) ||
      (Number.isFinite(endT) && Math.abs(time - endT) <= TIME_EPSILON)
    );
  }

  getPathLineDragWeight(anchorT, sampleT) {
    const anchor = Number(anchorT);
    const sample = Number(sampleT);
    if (!Number.isFinite(anchor) || !Number.isFinite(sample)) {
      return 0;
    }
    const normalizedDistance = Math.abs(sample - anchor) / PATH_LINE_DRAG_FALLOFF_TIME;
    if (normalizedDistance >= 1) {
      return 0;
    }
    const amount = 1 - normalizedDistance;
    return amount * amount * amount * (amount * (amount * 6 - 15) + 10);
  }

  syncPathDependentSamplesFromPath(kind) {
    const path = this.dataset?.paths?.[kind];
    if (!Array.isArray(path) || path.length === 0) {
      return;
    }
    const pathPointSet = new Set(path);
    const syncPoint = (point, fallbackT = point?.t) => {
      if (!point || pathPointSet.has(point)) {
        return;
      }
      const sampleT = Number(fallbackT);
      if (!Number.isFinite(sampleT)) {
        return;
      }
      const pathPoint = this.samplePathPoint(path, sampleT);
      point.t = sampleT;
      point.x = pathPoint.x;
      point.y = pathPoint.y;
    };

    (this.dataset?.frames ?? []).forEach((frame) => {
      syncPoint(frame?.[kind], Number.isFinite(Number(frame?.[kind]?.t)) ? frame[kind].t : frame?.t);
    });
    (this.dataset?.history?.[kind] ?? []).forEach((point) => {
      syncPoint(point, point.t);
    });
  }

  rebuildSmoothPathFromHistory(kind) {
    const path = this.dataset?.paths?.[kind];
    const history = this.getSortedFiniteHistory(kind);
    if (!Array.isArray(path) || history.length < 2) {
      return false;
    }
    const sampleTimes = this.getSmoothPathSampleTimes(path, history);
    const rebuiltPath = sampleTimes.map((sampleT) => {
      const point = this.findPathSampleAtTime(path, sampleT) ?? { t: sampleT };
      const smoothPoint = this.sampleSmoothHistoryPath(history, sampleT);
      point.t = sampleT;
      point.x = smoothPoint.x;
      point.y = smoothPoint.y;
      return point;
    });
    rebuiltPath.interpolationMode = C1_CUBIC_HERMITE_INTERPOLATION;
    this.dataset.paths[kind] = rebuiltPath;
    this.updateFrameSamplesFromSmoothHistoryPath(kind, history);
    return true;
  }

  getSortedFiniteHistory(kind) {
    return (this.dataset?.history?.[kind] ?? [])
      .filter((point) => (
        Number.isFinite(Number(point.t)) &&
        Number.isFinite(Number(point.x)) &&
        Number.isFinite(Number(point.y))
      ))
      .slice()
      .sort((left, right) => left.t - right.t);
  }

  getSmoothPathSampleTimes(path, history) {
    const times = [
      ...path.map((point) => Number(point.t)),
      ...history.map((point) => Number(point.t)),
    ]
      .filter(Number.isFinite)
      .sort((left, right) => left - right);
    const uniqueTimes = [];
    times.forEach((time) => {
      if (uniqueTimes.length === 0 || Math.abs(time - uniqueTimes.at(-1)) > TIME_EPSILON) {
        uniqueTimes.push(time);
      }
    });
    return uniqueTimes;
  }

  findPathSampleAtTime(path, sampleT) {
    return path.find((point) => Math.abs((Number(point.t) || 0) - sampleT) <= TIME_EPSILON) ?? null;
  }

  sampleSmoothHistoryPath(history, sampleT) {
    return this.sampleSmoothControlPath(history, sampleT, RETAINED_PATH_SPLINE_TANGENT_SCALE);
  }

  sampleSmoothControlPath(controlPoints, sampleT, tangentScale) {
    const t = Number(sampleT);
    const exactPoint = controlPoints.find((point) => Math.abs(point.t - t) <= TIME_EPSILON);
    if (exactPoint) {
      return { t, x: exactPoint.x, y: exactPoint.y };
    }
    const first = controlPoints[0];
    const last = controlPoints.at(-1);
    if (t <= first.t) {
      return { t, x: first.x, y: first.y };
    }
    if (t >= last.t) {
      return { t, x: last.x, y: last.y };
    }

    const rightIndex = controlPoints.findIndex((point) => point.t >= t);
    const leftIndex = Math.max(0, rightIndex - 1);
    const left = controlPoints[leftIndex];
    const right = controlPoints[rightIndex];
    const span = right.t - left.t;
    if (!Number.isFinite(span) || span <= TIME_EPSILON) {
      return { t, x: left.x, y: left.y };
    }
    const amount = clamp((t - left.t) / span, 0, 1);
    const leftTangent = this.getSmoothControlPathTangent(controlPoints, leftIndex, tangentScale);
    const rightTangent = this.getSmoothControlPathTangent(controlPoints, rightIndex, tangentScale);
    const amount2 = amount * amount;
    const amount3 = amount2 * amount;
    const h00 = 2 * amount3 - 3 * amount2 + 1;
    const h10 = amount3 - 2 * amount2 + amount;
    const h01 = -2 * amount3 + 3 * amount2;
    const h11 = amount3 - amount2;
    return {
      t,
      x: h00 * left.x + h10 * span * leftTangent.x + h01 * right.x + h11 * span * rightTangent.x,
      y: h00 * left.y + h10 * span * leftTangent.y + h01 * right.y + h11 * span * rightTangent.y,
    };
  }

  getSmoothControlPathTangent(controlPoints, index, tangentScale = RETAINED_PATH_SPLINE_TANGENT_SCALE) {
    const previous = controlPoints[Math.max(0, index - 1)];
    const next = controlPoints[Math.min(controlPoints.length - 1, index + 1)];
    const span = next.t - previous.t;
    if (!Number.isFinite(span) || span <= TIME_EPSILON) {
      return { x: 0, y: 0 };
    }
    const scale = Number.isFinite(Number(tangentScale)) ? Number(tangentScale) : RETAINED_PATH_SPLINE_TANGENT_SCALE;
    return {
      x: ((next.x - previous.x) / span) * scale,
      y: ((next.y - previous.y) / span) * scale,
    };
  }

  updateFrameSamplesFromSmoothHistoryPath(kind, history) {
    (this.dataset?.frames ?? []).forEach((frame) => {
      const point = frame?.[kind];
      const sampleT = Number.isFinite(Number(point?.t)) ? Number(point.t) : Number(frame?.t);
      if (!point || !Number.isFinite(sampleT)) {
        return;
      }
      const smoothPoint = this.sampleSmoothHistoryPath(history, sampleT);
      point.t = sampleT;
      point.x = smoothPoint.x;
      point.y = smoothPoint.y;
    });
  }

  samplePathPoint(path, sampleT) {
    if (!Array.isArray(path) || path.length === 0) {
      return { t: Number(sampleT) || 0, x: 0, y: 0 };
    }
    const t = Number(sampleT);
    if (!Number.isFinite(t)) {
      const first = path[0];
      return { t: Number(first?.t) || 0, x: Number(first?.x) || 0, y: Number(first?.y) || 0 };
    }
    if (path.length === 1 || t <= Number(path[0]?.t)) {
      return { t, x: Number(path[0]?.x) || 0, y: Number(path[0]?.y) || 0 };
    }
    const last = path.at(-1);
    if (t >= Number(last?.t)) {
      return { t, x: Number(last?.x) || 0, y: Number(last?.y) || 0 };
    }
    if (usesC1TimedPathInterpolation(path)) {
      return sampleTimedPath(path, t);
    }
    let rightIndex = path.findIndex((point) => Number(point?.t) >= t);
    if (rightIndex <= 0) {
      rightIndex = 1;
    }
    const left = path[rightIndex - 1];
    const right = path[rightIndex] ?? last;
    const span = Number(right?.t) - Number(left?.t);
    const amount = span === 0 ? 0 : clamp((t - Number(left?.t)) / span, 0, 1);
    return {
      t,
      x: Number(left?.x) + (Number(right?.x) - Number(left?.x)) * amount,
      y: Number(left?.y) + (Number(right?.y) - Number(left?.y)) * amount,
    };
  }

  syncInitialConditionToHistoryStart(kind, point) {
    const condition = this.getInitialCondition(kind);
    if (!condition || !point) {
      return;
    }
    const isStartDepth = Number(point.depth) === 1;
    const isConditionTime = Math.abs((Number(point.t) || 0) - (Number(condition.t) || 0)) <= TIME_EPSILON;
    if (!isStartDepth && !isConditionTime) {
      return;
    }
    condition.t = Number(point.t) || 0;
    condition.x = Number(point.x) || 0;
    condition.y = Number(point.y) || 0;
  }

  getReplayPathPoint(kind, t) {
    const points = this.dataset.paths[kind] ?? [];
    if (points.length === 0) {
      return { x: 0, y: 0, t: 0 };
    }
    if (points.length === 1) {
      return points[0];
    }
    const sampleT = clamp(Number(t) || 0, points[0].t, points[points.length - 1].t);
    const historyPoint = this.findHistoryPointAtTime(kind, sampleT);
    if (historyPoint) {
      return { ...historyPoint };
    }
    if (usesC1TimedPathInterpolation(points)) {
      return sampleTimedPath(points, sampleT);
    }
    let rightIndex = points.findIndex((point) => point.t >= sampleT);
    if (rightIndex <= 0) {
      rightIndex = 1;
    }
    const left = points[rightIndex - 1];
    const right = points[rightIndex] ?? points[points.length - 1];
    const span = right.t - left.t;
    const amount = span === 0 ? 0 : clamp((sampleT - left.t) / span, 0, 1);
    return {
      t: sampleT,
      x: left.x + (right.x - left.x) * amount,
      y: left.y + (right.y - left.y) * amount,
    };
  }

  getTraversalPathPoint(kind, t) {
    if (
      this.dataset?.datasetSource === EOM_REPLAY_DATASET_SOURCE ||
      this.dataset?.eomProvenance
    ) {
      return this.getReplayPathPoint(kind, t);
    }
    return this.getFixedSpeedReplayPathPoint(kind, t);
  }

  getStoryTimeAxisPath(kind) {
    const cached = this.storyTimeAxisPathCache.get(kind);
    if (cached?.datasetRevision === this.datasetRevision) {
      return cached.path;
    }
    const path = createStoryTimeAxisPath(this.dataset.paths[kind] ?? []);
    this.storyTimeAxisPathCache.set(kind, {
      datasetRevision: this.datasetRevision,
      path,
    });
    return path;
  }

  getStoryPathPoint(kind, t) {
    return sampleTimedPath(this.getStoryTimeAxisPath(kind), t)
      ?? this.getTraversalPathPoint(kind, t);
  }

  getStoryVisibleWakeSeries(replayTime) {
    return ARCHITRINO_KINDS
      .map((sourceKind) => {
        const receiverKind = this.getOppositeArchitrinoKind(sourceKind);
        const receiver = this.getStoryPathPoint(receiverKind, replayTime);
        const signalSpeed = this.getLiveWakeSignalSpeed();
        const emission = this.solveLiveWakeEmissionPoint(
          sourceKind,
          receiver,
          replayTime,
          signalSpeed,
          this.getStoryTimeAxisPath(sourceKind),
        );
        if (!emission) {
          return null;
        }
        const source = emission.source;
        return {
          id: `story-live-${sourceKind}-to-${receiverKind}`,
          label: `${sourceKind} wake -> ${receiverKind} now`,
          sourceKind,
          receiverKind,
          source,
          receiver,
          color: this.getWakeColorForKind(sourceKind),
          weight: 1,
          signalSpeed,
          distance: getDistance(source, receiver),
          emissionTime: source.t,
          hitTime: receiver.t,
          travelTime: receiver.t - source.t,
          liveWakeSeries: true,
          rootResidual: emission.residual,
        };
      })
      .filter(Boolean);
  }

  getFixedSpeedReplayPathPoint(kind, t) {
    const points = this.dataset.paths[kind] ?? [];
    return sampleTimedPathByArcLength(points, t) ?? this.getReplayPathPoint(kind, t);
  }

  getPathArcLengthTable(kind, points = this.dataset.paths[kind] ?? []) {
    const cached = this.pathArcLengthCache.get(kind);
    if (cached?.datasetRevision === this.datasetRevision) {
      return cached;
    }
    const segmentLengths = [];
    const cumulativeLengths = [0];
    let totalLength = 0;
    for (let index = 1; index < points.length; index += 1) {
      const segmentLength = getDistance(points[index - 1], points[index]);
      segmentLengths.push(segmentLength);
      if (Number.isFinite(segmentLength) && segmentLength > 0) {
        totalLength += segmentLength;
      }
      cumulativeLengths.push(totalLength);
    }
    const table = {
      datasetRevision: this.datasetRevision,
      segmentLengths,
      cumulativeLengths,
      totalLength,
    };
    this.pathArcLengthCache.set(kind, table);
    return table;
  }

  getCurrentReplayTime() {
    return this.getReplayTimeForElapsedSeconds(this.elapsedSeconds);
  }

  getReplayTimeForElapsedSeconds(elapsedSeconds) {
    const [start, end] = this.getReplayTimeRange();
    const loopSeconds = this.getReplayLoopSeconds();
    const phase = this.learnerState?.mode === "sandbox"
      ? clamp(elapsedSeconds / loopSeconds, 0, 1)
      : (elapsedSeconds % loopSeconds) / loopSeconds;
    return start + (end - start) * phase;
  }

  getReplayLoopSeconds() {
    return ["history", "self-hit"].includes(this.learnerState?.mode)
      ? STORY_SHARED_PATH_PLAYBACK_SECONDS
      : REPLAY_LOOP_SECONDS;
  }

  getReplayTimeRange() {
    if (this.replayTimeRangeCache) {
      return this.replayTimeRangeCache;
    }
    const points = [
      ...(this.dataset.paths.positrino ?? []),
      ...(this.dataset.paths.electrino ?? []),
    ].filter((point) => Number.isFinite(Number(point.t)));
    if (points.length === 0) {
      this.replayTimeRangeCache = [0, 1];
      return this.replayTimeRangeCache;
    }
    const times = points.map((point) => point.t);
    this.replayTimeRangeCache = [Math.min(...times), Math.max(...times)];
    return this.replayTimeRangeCache;
  }

  findHistoryPointAtTime(kind, t) {
    return this.dataset.history[kind]?.find((point) => Math.abs(point.t - t) <= TIME_EPSILON) ?? null;
  }

  getInitialCondition(kind) {
    return this.dataset.initialConditions?.[kind] ?? null;
  }

  getHistoryStartPoint(kind) {
    return this.dataset.history?.[kind]?.find((point) => Number(point.depth) === 1) ?? null;
  }

  initialConditionPoint(condition) {
    return { x: Number(condition?.x) || 0, y: Number(condition?.y) || 0 };
  }

  getInitialVelocityAnchorPoint(kind, condition = this.getInitialCondition(kind)) {
    const historyStart = this.getHistoryStartPoint(kind);
    if (historyStart) {
      return {
        t: Number.isFinite(Number(historyStart.t)) ? Number(historyStart.t) : Number(condition?.t) || 0,
        x: Number(historyStart.x) || 0,
        y: Number(historyStart.y) || 0,
      };
    }
    return {
      t: Number(condition?.t) || 0,
      ...this.initialConditionPoint(condition),
    };
  }

  initialConditionVelocityEnd(condition, anchorPoint = this.initialConditionPoint(condition)) {
    const point = anchorPoint;
    const vx = Number(condition.vx) || 0;
    const vy = Number(condition.vy) || 0;
    return {
      x: point.x + vx * INITIAL_VELOCITY_ARROW_SCALE,
      y: point.y + vy * INITIAL_VELOCITY_ARROW_SCALE,
    };
  }

  velocityFromInitialConditionHandle(condition, velocityEnd, anchorPoint = this.initialConditionPoint(condition)) {
    const point = anchorPoint;
    return {
      vx: (Number(velocityEnd.x) - point.x) / INITIAL_VELOCITY_ARROW_SCALE,
      vy: (Number(velocityEnd.y) - point.y) / INITIAL_VELOCITY_ARROW_SCALE,
    };
  }

  getWakeTiming(link, replayTime = this.getCurrentReplayTime()) {
    const endpoints = this.getWakeEndpoints(link);
    if (!endpoints) {
      return null;
    }
    const { source, receiver } = endpoints;
    // Pin the visible schedule to retained endpoint times. Solver hit times stay diagnostic-only.
    const sourceT = this.getDesignatedWakeEndpointTime(source, link.emissionTime);
    const receiverT = this.getDesignatedWakeEndpointTime(receiver, link.hitTime);
    const duration = receiverT - sourceT;
    if (!Number.isFinite(duration) || duration <= 0) {
      return null;
    }
    const rawProgress = (replayTime - sourceT) / duration;
    const startedForLoop = replayTime >= sourceT - TIME_EPSILON;
    const completedForLoop = replayTime > receiverT;
    return {
      source,
      receiver,
      sourceT,
      receiverT,
      progress: clamp(rawProgress, 0, 1),
      active: startedForLoop && !completedForLoop,
      startedForLoop,
      completedForLoop,
      liveWakeSeries: Boolean(link.liveWakeSeries),
    };
  }

  getWakeFrontProgresses(timing, link = null) {
    if (!timing) {
      return [];
    }
    if (link?.liveWakeSeries || timing.liveWakeSeries) {
      return this.getLiveWakeFrontProgresses(timing, link);
    }
    const duration = timing.receiverT - timing.sourceT;
    if (!Number.isFinite(duration) || duration <= 0) {
      return [];
    }
    const [start, end] = this.getReplayTimeRange();
    const replaySpan = Number.isFinite(end - start) && end > start ? end - start : 1;
    const frontTimeStep = replaySpan / WAKE_FRONT_CADENCE_TIME_DIVISIONS;
    const elapsed = clamp(timing.progress, 0, 1) * duration;
    const frontCount = Math.floor((elapsed + TIME_EPSILON) / frontTimeStep);
    const progresses = [];
    for (let index = 1; index <= frontCount; index += 1) {
      const progress = (index * frontTimeStep) / duration;
      if (progress > 1 + TIME_EPSILON) {
        break;
      }
      progresses.push(clamp(progress, 0, 1));
    }
    if (timing.progress >= 1 - TIME_EPSILON && (progresses.at(-1) ?? 0) < 1) {
      progresses.push(1);
    }
    return progresses;
  }

  getWakeFrontProgressesThroughProgress(timing, link = null, maximumProgress = 1) {
    const progressLimit = clamp(Number(maximumProgress) || 0, 0, 1);
    const progresses = this.getWakeFrontProgresses(timing, link);
    if (progressLimit >= 1 - TIME_EPSILON) {
      return progresses;
    }
    const visibleProgresses = progresses.filter(
      (progress) => progress <= progressLimit + TIME_EPSILON,
    );
    if (
      progressLimit > TIME_EPSILON &&
      progressLimit - (visibleProgresses.at(-1) ?? 0) > TIME_EPSILON
    ) {
      visibleProgresses.push(progressLimit);
    }
    return visibleProgresses;
  }

  getLiveWakeFrontProgresses(timing, link = null) {
    const endpointDistance =
      timing?.source && timing?.receiver ? getDistance(timing.source, timing.receiver) : Number.NaN;
    const linkDistance = Number(link?.distance);
    const distance =
      Number.isFinite(endpointDistance) && endpointDistance > 0
        ? endpointDistance
        : Number.isFinite(linkDistance) && linkDistance > 0
          ? linkDistance
          : Number.NaN;
    if (!Number.isFinite(distance) || distance <= 0) {
      return [];
    }
    const spacing = this.getWakeFrontSpacing();
    const frontCount = Math.max(1, Math.ceil(distance / spacing));
    return Array.from({ length: frontCount }, (_unused, index) => {
      const frontDistance = Math.min(distance, (index + 1) * spacing);
      return clamp(frontDistance / distance, 0, 1);
    });
  }

  getWakeFrontSpacing() {
    return DEFAULT_LIVE_WAKE_FRONT_SPACING;
  }

  getVisibleCausalIsochronSpheres(replayTime = this.getCurrentReplayTime()) {
    return ARCHITRINO_KINDS.flatMap((kind) => this.getCausalIsochronSpheres(kind, replayTime));
  }

  getCausalIsochronSpheres(kind, replayTime = this.getCurrentReplayTime()) {
    const now = Number(replayTime);
    const signalSpeed = this.getLiveWakeSignalSpeed();
    const [pathStart, pathEnd] = this.getReplayTimeRange();
    const pathDuration = pathEnd - pathStart;
    if (
      !ARCHITRINO_KINDS.includes(kind) ||
      !Number.isFinite(now) ||
      !Number.isFinite(signalSpeed) ||
      signalSpeed <= 0 ||
      !Number.isFinite(pathDuration) ||
      pathDuration <= TIME_EPSILON ||
      now <= pathStart + TIME_EPSILON
    ) {
      return [];
    }
    const emissionEnd = Math.min(now, pathEnd);
    const emissionStep = this.getWakeFrontSpacing() / signalSpeed;
    const emissionCount = Math.floor((emissionEnd - pathStart) / emissionStep);
    const spheres = [];
    for (let index = 0; index <= emissionCount; index += 1) {
      const emissionTime = pathStart + index * emissionStep;
      const age = now - emissionTime;
      if (age <= TIME_EPSILON) {
        continue;
      }
      spheres.push({
        id: `${kind}-isochron-${index}`,
        kind,
        origin: this.getTraversalPathPoint(kind, emissionTime),
        emissionTime,
        replayTime: now,
        age,
        radius: signalSpeed * age,
        signalSpeed,
        color: this.getWakeColorForKind(kind),
      });
    }
    return spheres;
  }

  shouldDrawWakeSeries(timing) {
    return Boolean(timing?.startedForLoop) && !timing.completedForLoop;
  }

  getDesignatedWakeEndpointTime(endpoint, fallbackTime) {
    const endpointTime = Number(endpoint?.t);
    if (Number.isFinite(endpointTime)) {
      return endpointTime;
    }
    const fallback = Number(fallbackTime);
    return Number.isFinite(fallback) ? fallback : Number.NaN;
  }

  getWakeEndpoints(link) {
    const source = this.dataset.history[link.sourceKind]?.find((point) => point.depth === link.sourceDepth);
    const receiver = this.dataset.history[link.receiverKind]?.find((point) => point.depth === link.receiverDepth);
    if (source && receiver) {
      return { source, receiver };
    }
    if (link.source && link.receiver) {
      return {
        source: {
          ...link.source,
          t: Number.isFinite(Number(link.source.t)) ? Number(link.source.t) : Number(link.emissionTime),
        },
        receiver: {
          ...link.receiver,
          t: Number.isFinite(Number(link.receiver.t)) ? Number(link.receiver.t) : Number(link.hitTime),
        },
      };
    }
    return null;
  }

  getWakeFrontCenterPoint(link, replayTime = this.getCurrentReplayTime()) {
    const timing = this.getWakeTiming(link, replayTime);
    if (!timing) {
      return null;
    }
    return {
      x: timing.source.x + (timing.receiver.x - timing.source.x) * timing.progress,
      y: timing.source.y + (timing.receiver.y - timing.source.y) * timing.progress,
      t: replayTime,
    };
  }

  getWakeArrivalSynchronization(link) {
    const timing = this.getWakeTiming(link);
    if (!timing) {
      return null;
    }
    const arrivalTiming = this.getWakeTiming(link, timing.receiverT);
    const wakeFront = this.getWakeFrontCenterPoint(link, timing.receiverT);
    const receivingArchitrino = this.getReplayPathPoint(link.receiverKind, timing.receiverT);
    const receivingTime = Number(receivingArchitrino.t);
    const timeError = Math.abs((Number.isFinite(receivingTime) ? receivingTime : timing.receiverT) - timing.receiverT);
    const distanceError = wakeFront ? getDistance(wakeFront, receivingArchitrino) : Number.POSITIVE_INFINITY;

    return {
      arrivalTime: timing.receiverT,
      progress: arrivalTiming?.progress ?? null,
      wakeFront,
      receivingArchitrino,
      receiver: timing.receiver,
      timeError,
      distanceError,
      isSynchronized:
        Boolean(arrivalTiming?.active) &&
        Math.abs((arrivalTiming?.progress ?? 0) - 1) <= TIME_EPSILON &&
        timeError <= TIME_EPSILON &&
        distanceError <= TIME_EPSILON,
    };
  }

  updateWakeLinkGeometry() {
    const links = this.dataset?.wakeLinks ?? [];
    links.forEach((link) => {
      const source = this.dataset.history?.[link.sourceKind]?.find((point) => point.depth === link.sourceDepth);
      const receiver = this.dataset.history?.[link.receiverKind]?.find((point) => point.depth === link.receiverDepth);
      if (!source || !receiver) {
        return;
      }
      link.source = { x: source.x, y: source.y, t: source.t };
      link.receiver = { x: receiver.x, y: receiver.y, t: receiver.t };
      link.emissionTime = source.t;
      link.hitTime = receiver.t;
      link.travelTime = receiver.t - source.t;
      link.weight = Math.min(source.weight, receiver.weight);
    });
  }

  updateReadout(hit = null) {
    const readoutHit = hit ?? this.getSelectedHit();
    if (!readoutHit) {
      this.dom.readout.hidden = true;
      this.dom.readout.replaceChildren();
      return;
    }

    this.dom.readout.replaceChildren(
      this.createReadoutStrong(readoutHit.title),
      ...readoutHit.details.map((detail) => this.createReadoutSpan(detail)),
    );
    this.dom.readout.hidden = false;
  }

  createReadoutStrong(text) {
    const element = this.document.createElement("strong");
    element.textContent = text;
    return element;
  }

  createReadoutSpan(text) {
    const element = this.document.createElement("span");
    element.textContent = text;
    return element;
  }

  getSelectedHit() {
    if (this.selectedItem?.type === "initial-velocity") {
      const condition = this.getInitialCondition(this.selectedItem.kind);
      return condition ? this.createInitialVelocityHit(this.selectedItem.kind, condition, 0) : null;
    }
    if (this.selectedItem?.type === "history") {
      const point = this.getVisibleHistory(this.selectedItem.kind).find(
        (candidate) => candidate.depth === this.selectedItem.depth,
      );
      return point ? this.createHistoryHit(point, 0) : null;
    }
    if (this.selectedItem?.type === "wake") {
      const link = this.getVisibleWakeSeries().find((candidate) => candidate.id === this.selectedItem.linkId);
      return link ? this.createWakeHit(link, 0) : null;
    }
    if (this.selectedItem?.type === "path-line") {
      return this.createPathLineHit(this.selectedItem.kind, this.selectedItem.anchorT, 0);
    }
    return null;
  }

  createContributionSummaryHit(replayTime = this.getCurrentReplayTime()) {
    const summary = this.getContributionSummary(replayTime);
    if (!summary) {
      return null;
    }
    return {
      type: "contribution-summary",
      title: "feedback sum",
      label: "feedback sum",
      details: [
        `now=${summary.replayTime.toFixed(2)}`,
        `received=${summary.receivedCount}/${summary.activeLinkCount}`,
        `in_flight=${summary.inFlightCount}`,
        `pending=${summary.pendingCount}`,
        `red=${formatCompactNumber(summary.positiveContribution)}`,
        `blue=${formatCompactNumber(summary.negativeContribution)}`,
        `net=${formatCompactNumber(summary.netContribution)}`,
        ...(summary.strongestContributionLabel
          ? [
              `strongest=${formatCompactLabel(summary.strongestContributionLabel)}:${formatCompactNumber(
                summary.strongestContribution,
              )}`,
            ]
          : []),
        `threshold=${formatCompactNumber(summary.threshold)}`,
        ...this.createDraftSolverRejectionReadoutDetails(),
        ...(summary.inactiveCount > 0 ? [`inactive=${summary.inactiveCount}`] : []),
        ...(summary.staleCount > 0 ? [`stale=${summary.staleCount}`] : []),
        ...(summary.rejectedCount > 0 ? [`rejected=${summary.rejectedCount}`] : []),
        ...this.createContributionSummaryDiagnosticDetails(summary),
      ],
      distance: 0,
      hitRadius: 0,
      selection: null,
    };
  }

  findNearestHit(screen, { includeWakes = false, includePaths = false } = {}) {
    const candidates = [];
    if (includePaths) {
      ARCHITRINO_KINDS.forEach((kind) => {
        const endpointHit = this.findNearestPathEndpointHit(kind, screen);
        if (endpointHit) {
          candidates.push(endpointHit);
        }
        const hit = this.findNearestPathLineHit(kind, screen);
        if (hit) {
          candidates.push(hit);
        }
      });
    }
    if (includeWakes) {
      this.getVisibleWakeSeries().forEach((link) => {
        const endpoints = this.getWakeEndpoints(link);
        if (!endpoints) {
          return;
        }
        const distance = this.getScreenDistanceToSegment(
          screen,
          this.worldToScreen(endpoints.source),
          this.worldToScreen(endpoints.receiver),
        );
        candidates.push(this.createWakeHit(link, distance));
      });
    }
    const nearest = candidates.sort((a, b) => (a.sortDistance ?? a.distance) - (b.sortDistance ?? b.distance))[0];
    return nearest && nearest.distance <= nearest.hitRadius ? nearest : null;
  }

  findNearestPathEndpointHit(kind, screen) {
    let nearest = null;
    this.getPathEndpointHandles(kind).forEach((point) => {
      const distance = getDistance(screen, this.worldToScreen(point));
      if (nearest && distance >= nearest.distance) {
        return;
      }
      nearest = this.createHistoryHit(point, distance);
      nearest.hitRadius = PATH_ENDPOINT_HANDLE_HIT_RADIUS;
      nearest.sortDistance =
        distance <= PATH_ENDPOINT_HANDLE_HIT_RADIUS
          ? distance - PATH_ENDPOINT_HANDLE_HIT_RADIUS - PATH_LINE_HIT_RADIUS
          : distance;
    });
    return nearest;
  }

  findNearestPathLineHit(kind, screen) {
    const path = this.dataset?.paths?.[kind] ?? [];
    if (path.length < 2) {
      return null;
    }
    let nearest = null;
    for (let index = 1; index < path.length; index += 1) {
      const left = path[index - 1];
      const right = path[index];
      const projection = this.getScreenSegmentProjection(
        screen,
        this.worldToScreen(left),
        this.worldToScreen(right),
      );
      if (!projection || (nearest && projection.distance >= nearest.distance)) {
        continue;
      }
      const leftT = Number(left.t);
      const rightT = Number(right.t);
      const anchorT =
        Number.isFinite(leftT) && Number.isFinite(rightT)
          ? leftT + (rightT - leftT) * projection.amount
          : Number.isFinite(leftT)
            ? leftT
            : Number.isFinite(rightT)
              ? rightT
              : 0;
      nearest = {
        distance: projection.distance,
        anchorT,
      };
    }
    return nearest ? this.createPathLineHit(kind, nearest.anchorT, nearest.distance) : null;
  }

  createPathLineHit(kind, anchorT, distance) {
    const point = this.getReplayPathPoint(kind, anchorT);
    return {
      type: "path-line",
      title: `${kind} path`,
      label: `${kind} path`,
      details: [
        `t=${point.t.toFixed(2)}`,
        `x=${Math.round(Number(point.x) || 0)}`,
        `y=${Math.round(Number(point.y) || 0)}`,
        "drag=path",
        ...this.createDraftSolverRejectionReadoutDetails(),
      ],
      distance,
      hitRadius: PATH_LINE_HIT_RADIUS,
      selection: { type: "path-line", kind, anchorT: point.t },
    };
  }

  createHistoryHit(point, distance) {
    const details = [
      `t=${point.t.toFixed(2)}`,
      `x=${Math.round(Number(point.x) || 0)}`,
      `y=${Math.round(Number(point.y) || 0)}`,
      `weight=${point.weight.toFixed(2)}`,
      point.state,
    ];
    if (Number(point.depth) === 1) {
      const condition = this.getInitialCondition(point.kind);
      if (condition) {
        details.push(
          `vx=${(Number(condition.vx) || 0).toFixed(1)}`,
          `vy=${(Number(condition.vy) || 0).toFixed(1)}`,
        );
      }
    }
    details.push(...this.createDraftSolverRejectionReadoutDetails());
    return {
      type: "history",
      title: `${point.kind} ${point.depth}`,
      label: `${point.kind} ${point.depth}`,
      details,
      distance,
      hitRadius: 22,
      selection: { type: "history", kind: point.kind, depth: point.depth },
    };
  }

  createInitialVelocityHit(kind, condition, distance) {
    const speed = Math.hypot(Number(condition.vx) || 0, Number(condition.vy) || 0);
    return {
      type: "initial-velocity",
      title: `${kind} velocity`,
      label: `${kind} velocity`,
      details: [
        `speed=${Math.round(speed)}`,
        `vx=${(Number(condition.vx) || 0).toFixed(1)}`,
        `vy=${(Number(condition.vy) || 0).toFixed(1)}`,
        ...this.createDraftSolverRejectionReadoutDetails(),
      ],
      distance,
      hitRadius: 20,
      selection: { type: "initial-velocity", kind },
    };
  }

  createWakeHit(link, distance) {
    const timing = this.getWakeTiming(link);
    const endpoints = timing ?? this.getWakeEndpoints(link);
    const travelDistance = endpoints ? getDistance(endpoints.source, endpoints.receiver) : 0;
    const timingState = this.getWakeTimingState(timing);
    const falloff = this.getWakeContributionFalloff(link);
    const contribution = this.getWakeContributionMagnitude(link);
    const thresholdState = this.getWakeThresholdState(link);
    const wakeState = this.getWakeStatus(link);
    const solverDetails = this.createWakeSolverReadoutDetails(link);
    return {
      type: "wake",
      title: link.label,
      label: link.label,
      details: [
        `distance=${Math.round(travelDistance)}`,
        `emit=${timing ? timing.sourceT.toFixed(2) : "--"}`,
        `hit=${timing ? timing.receiverT.toFixed(2) : "--"}`,
        `travel=${timing ? (timing.receiverT - timing.sourceT).toFixed(2) : "--"}`,
        timingState,
        `1/r=${falloff.toFixed(4)}`,
        `weight=${link.weight.toFixed(2)}`,
        `contrib=${formatCompactNumber(contribution)}`,
        `threshold=${thresholdState}`,
        ...(wakeState.status === "active" ? [] : [`state=${wakeState.status}`, `reason=${wakeState.reason}`]),
        ...solverDetails,
        this.getWakeVisualModeLabel(),
      ],
      distance,
      hitRadius: 20,
      selection: { type: "wake", linkId: link.id },
    };
  }

  createDraftSolverRejectionReadoutDetails() {
    if (this.dataset?.datasetSource !== DIRECT_MANIPULATION_DRAFT_PREVIEW) {
      return [];
    }
    return [
      "preview=local_teaching_only",
      "recorded_replay=unchanged",
    ];
  }

  getWakeContributionMagnitude(link) {
    const weight = Number.isFinite(Number(link.weight)) ? Number(link.weight) : 0;
    return weight * this.getWakeContributionFalloff(link);
  }

  getContributionSummary(replayTime = this.getCurrentReplayTime()) {
    const wakeLinks = this.getVisibleWakeSeries(replayTime);
    const summary = {
      replayTime,
      threshold: this.getAssemblyThreshold(),
      linkCount: wakeLinks.length,
      activeLinkCount: 0,
      pendingCount: 0,
      inFlightCount: 0,
      receivedCount: 0,
      inactiveCount: 0,
      staleCount: 0,
      rejectedCount: 0,
      invalidReasonCounts: {},
      positiveContribution: 0,
      negativeContribution: 0,
      netContribution: 0,
      strongestContribution: 0,
      strongestContributionMagnitude: 0,
      strongestContributionLabel: null,
    };
    if (wakeLinks.length === 0) {
      summary.emptyReason = this.getEmptyWakeLinkReason();
      return summary;
    }

    wakeLinks.forEach((link) => {
      const wakeStatus = this.getWakeStatus(link);
      if (wakeStatus.status !== "active") {
        if (wakeStatus.status === "inactive") {
          summary.inactiveCount += 1;
        } else if (wakeStatus.status === "stale") {
          summary.staleCount += 1;
        } else {
          summary.rejectedCount += 1;
        }
        this.recordContributionSummaryDiagnosticReason(summary, wakeStatus);
        return;
      }
      const timing = this.getWakeTiming(link, replayTime);
      if (!timing) {
        summary.rejectedCount += 1;
        this.recordContributionSummaryDiagnosticReason(summary, {
          status: "rejected",
          reason: "missing_wake_timing",
        });
        return;
      }
      summary.activeLinkCount += 1;
      if (replayTime < timing.sourceT - TIME_EPSILON) {
        summary.pendingCount += 1;
        return;
      }
      if (replayTime < timing.receiverT - TIME_EPSILON) {
        summary.inFlightCount += 1;
        return;
      }
      summary.receivedCount += 1;
      const signedContribution = this.getWakeSignedContribution(link);
      if (signedContribution >= 0) {
        summary.positiveContribution += signedContribution;
      } else {
        summary.negativeContribution += signedContribution;
      }
      summary.netContribution += signedContribution;
      const magnitude = Math.abs(signedContribution);
      if (magnitude > summary.strongestContributionMagnitude) {
        summary.strongestContribution = signedContribution;
        summary.strongestContributionMagnitude = magnitude;
        summary.strongestContributionLabel = link.label;
      }
    });

    return summary;
  }

  getEmptyWakeLinkReason() {
    const totalWakeLinks = Number(this.dataset?.wakeLinks?.length);
    return Number.isFinite(totalWakeLinks) && totalWakeLinks > 0 ? "no_visible_wake_links" : "no_wake_links";
  }

  recordContributionSummaryDiagnosticReason(summary, wakeStatus) {
    const status = formatCompactLabel(wakeStatus?.status, "invalid");
    const reason = formatCompactLabel(wakeStatus?.reason, "unresolved");
    const key = `${status}:${reason}`;
    summary.invalidReasonCounts[key] = (summary.invalidReasonCounts[key] ?? 0) + 1;
  }

  createContributionSummaryDiagnosticDetails(summary) {
    const solverDetails = this.createContributionSummarySolverDetails();
    const entries = Object.entries(summary.invalidReasonCounts ?? {})
      .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
      .slice(0, 3);
    return [
      ...solverDetails,
      ...(summary.emptyReason ? [`why=${summary.emptyReason}`] : []),
      ...(entries.length > 0 ? [`why=${entries.map(([key, count]) => `${key}x${count}`).join(",")}`] : []),
    ];
  }

  createContributionSummarySolverDetails() {
    // Recorded EOM replay datasets carry no solver-run constraint telemetry;
    // diagnostics show only record-carried provenance elsewhere.
    return [];
  }

  getWakeSignedContribution(link) {
    const sign = link.sourceKind === "electrino" ? -1 : 1;
    return sign * this.getWakeContributionMagnitude(link);
  }

  getAssemblyThreshold() {
    const threshold = Number(this.dataset.assemblyThreshold);
    return Number.isFinite(threshold) && threshold > 0 ? threshold : DEFAULT_ASSEMBLY_THRESHOLD;
  }

  getWakeThresholdState(link) {
    const magnitude = this.getWakeContributionMagnitude(link);
    const threshold = this.getAssemblyThreshold();
    if (magnitude >= threshold) {
      return "above_threshold";
    }
    if (magnitude >= threshold * 0.5) {
      return "near_threshold";
    }
    return "below_threshold";
  }

  getWakeStatus(link) {
    if (link.status === "rejected" || link.status === "inactive" || link.status === "stale") {
      return {
        status: link.status,
        reason:
          typeof link.reason === "string" && link.reason.length > 0
            ? link.reason
            : this.getWakeRootStatusCode(link) ?? "solver_status",
      };
    }
    if (!this.hasWakeSolverMetadata(link)) {
      return { status: "active", reason: "representative_replay" };
    }
    const rootCount = Number.isFinite(Number(link.rootCount)) ? Number(link.rootCount) : 0;
    const hitCount = Number.isFinite(Number(link.solverHitCount)) ? Number(link.solverHitCount) : 0;
    if (hitCount > 0) {
      return { status: "active", reason: "delayed_hit_solved" };
    }
    if (rootCount > 0) {
      return { status: "inactive", reason: this.getWakeRootStatusCode(link) ?? "root_without_hit" };
    }
    return { status: "rejected", reason: this.getWakeRootStatusCode(link) ?? "no_delayed_hit" };
  }

  getWakeVisualWeight(link) {
    const status = this.getWakeStatus(link);
    const thresholdState = this.getWakeThresholdState(link);
    const contribution = this.getWakeContributionMagnitude(link);
    const threshold = this.getAssemblyThreshold();
    const contributionScale = clamp(contribution / threshold, 0, 1);
    const visualThreshold = threshold * WEAK_CONTRIBUTION_CUE_VISUAL_THRESHOLD_MULTIPLIER;
    const weakCueScale = clamp(contribution / visualThreshold, 0, 1);
    const thresholdAlphaScale =
      WEAK_CONTRIBUTION_CUE_MIN_ALPHA_SCALE + (1 - WEAK_CONTRIBUTION_CUE_MIN_ALPHA_SCALE) * weakCueScale;
    const thresholdRadiusScale =
      WEAK_CONTRIBUTION_CUE_MIN_RADIUS_SCALE + (1 - WEAK_CONTRIBUTION_CUE_MIN_RADIUS_SCALE) * weakCueScale;
    const thresholdDesaturation = WEAK_CONTRIBUTION_CUE_MAX_DESATURATION * (1 - weakCueScale);
    if (status.status === "active") {
      return {
        status: status.status,
        reason: status.reason,
        contributionScale,
        alphaScale: thresholdAlphaScale,
        radiusScale: thresholdRadiusScale,
        desaturation: thresholdDesaturation,
      };
    }
    const inactiveVisualTier = INACTIVE_WAKE_VISUAL_TIERS[status.status] ?? INACTIVE_WAKE_VISUAL_TIERS.rejected;
    return {
      status: status.status,
      reason: status.reason,
      contributionScale,
      ...inactiveVisualTier,
    };
  }

  createWakeSolverReadoutDetails(link) {
    if (!this.hasWakeSolverMetadata(link)) {
      return [];
    }
    const details = [
      `solver=${this.getWakeSolverStatusLabel(link)}`,
      `roots=${Number.isFinite(Number(link.rootCount)) ? Number(link.rootCount) : 0}`,
      `hits=${Number.isFinite(Number(link.solverHitCount)) ? Number(link.solverHitCount) : 0}`,
    ];
    if (Number.isFinite(Number(link.solverHitTime))) {
      details.push(`solverHit=${Number(link.solverHitTime).toFixed(2)}`);
    }
    if (Number.isFinite(Number(link.solverResidual))) {
      details.push(`resid=${formatCompactNumber(Number(link.solverResidual))}`);
    }
    if (Number.isFinite(Number(link.solverRootStatusCode)) && Number(link.solverRootStatusCode) !== 0) {
      details.push(`rootCode=${Number(link.solverRootStatusCode)}`);
    }
    if (Number.isFinite(Number(link.solverHitStatusCode)) && Number(link.solverHitStatusCode) !== 0) {
      details.push(`hitCode=${Number(link.solverHitStatusCode)}`);
    }
    details.push(...this.createWakeRootLedgerReadoutDetails(link));
    details.push(...this.createWakeRootStatusReadoutDetails(link));
    return details;
  }

  createWakeRootLedgerReadoutDetails(link) {
    const rows = Array.isArray(link?.rootLedgerDetails) ? link.rootLedgerDetails : [];
    if (rows.length === 0) {
      return [];
    }
    const details = [`ledgerRows=${rows.length}`];
    const firstRow = rows.find((row) => row && typeof row === "object") ?? {};
    if (Number.isFinite(Number(firstRow.residual))) {
      details.push(`ledgerResid=${formatCompactNumber(Number(firstRow.residual))}`);
    }
    if (Number.isFinite(Number(firstRow.bracketStart)) && Number.isFinite(Number(firstRow.bracketEnd))) {
      details.push(`ledgerBracket=${Number(firstRow.bracketStart).toFixed(2)}-${Number(firstRow.bracketEnd).toFixed(2)}`);
    }
    if (Number.isFinite(Number(firstRow.iterationCount))) {
      details.push(`ledgerIter=${Number(firstRow.iterationCount)}`);
    }
    if (Number.isFinite(Number(firstRow.statusCode)) && Number(firstRow.statusCode) !== 0) {
      details.push(`ledgerCode=${Number(firstRow.statusCode)}`);
    }
    return details;
  }

  createWakeRootStatusReadoutDetails(link) {
    const rootStatus = this.getWakeRootStatus(link);
    if (!rootStatus) {
      return [];
    }
    const details = [];
    if (rootStatus.code && !["ok", "active"].includes(rootStatus.code)) {
      details.push(`rootStatus=${rootStatus.code}`);
    }
    if (rootStatus.severity && !["ok", "info"].includes(rootStatus.severity)) {
      details.push(`rootSeverity=${rootStatus.severity}`);
    }
    if (rootStatus.message) {
      details.push(`rootMsg=${rootStatus.message}`);
    }
    return details;
  }

  getWakeRootStatus(link) {
    const rootStatus = link?.rootStatus;
    if (rootStatus == null) {
      return null;
    }
    if (typeof rootStatus === "string") {
      return {
        code: formatCompactLabel(rootStatus),
        severity: "",
        message: "",
      };
    }
    if (typeof rootStatus === "object") {
      return {
        code: formatCompactLabel(rootStatus.code ?? rootStatus.status),
        severity: formatCompactLabel(rootStatus.severity),
        message: formatCompactLabel(rootStatus.message),
      };
    }
    return null;
  }

  getWakeRootStatusCode(link) {
    const rootStatus = this.getWakeRootStatus(link);
    if (!rootStatus?.code || ["ok", "active"].includes(rootStatus.code)) {
      return null;
    }
    return rootStatus.code;
  }

  hasWakeSolverMetadata(link) {
    return Boolean(
      link.solverRunId ||
        Number.isFinite(Number(link.rootCount)) ||
        Number.isFinite(Number(link.solverHitCount)) ||
        Number.isFinite(Number(link.solverHitTime)) ||
        Number.isFinite(Number(link.solverResidual)) ||
        (Array.isArray(link.rootLedgerDetails) && link.rootLedgerDetails.length > 0),
    );
  }

  getWakeSolverStatusLabel(link) {
    if (this.getWakeStatus(link).status === "stale") {
      return "stale";
    }
    const rootCount = Number.isFinite(Number(link.rootCount)) ? Number(link.rootCount) : 0;
    const hitCount = Number.isFinite(Number(link.solverHitCount)) ? Number(link.solverHitCount) : 0;
    if (hitCount > 0) {
      return "solved";
    }
    if (rootCount > 0 && hitCount === 0) {
      return "root-only";
    }
    if (rootCount === 0 && hitCount === 0) {
      return "unresolved";
    }
    return "check";
  }

  getWakeTimingState(timing) {
    if (!timing) {
      return "unresolved";
    }
    if (timing.liveWakeSeries && timing.progress >= 1 - TIME_EPSILON) {
      return "received";
    }
    if (timing.active) {
      return `active=${timing.progress.toFixed(2)}`;
    }
    if (this.getCurrentReplayTime() < timing.sourceT) {
      return "pending";
    }
    return "received";
  }

  getWakeContributionFalloff(link) {
    const endpoints = this.getWakeEndpoints(link);
    const distance = endpoints
      ? getDistance(endpoints.source, endpoints.receiver)
      : Number(link.distance);
    return distance > 0 ? 1 / distance : 0;
  }

  getScreenDistanceToSegment(point, start, end) {
    return this.getScreenSegmentProjection(point, start, end)?.distance ?? Number.POSITIVE_INFINITY;
  }

  getScreenSegmentProjection(point, start, end) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const lengthSquared = dx * dx + dy * dy;
    if (lengthSquared === 0) {
      return {
        amount: 0,
        x: start.x,
        y: start.y,
        distance: Math.hypot(point.x - start.x, point.y - start.y),
      };
    }
    const t = clamp(((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSquared, 0, 1);
    const x = start.x + dx * t;
    const y = start.y + dy * t;
    return {
      amount: t,
      x,
      y,
      distance: Math.hypot(point.x - x, point.y - y),
    };
  }
}

export const createMockCausalDelayReplay = createMockCausalDelayReplayDataset;
