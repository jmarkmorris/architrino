import {
  DIRECT_MANIPULATION_DRAFT_PREVIEW,
  REPRESENTATIVE_MOCK_SOLVER_REPLAY,
  TEMPORARY_MOCK_ADAPTER,
  createMockCausalDelayReplayDataset,
  createTemporaryMockReplayAdapter,
  getAngleDegrees,
  getDistance,
} from "./CausalDelayFeedbackReplayAdapter.js";
import {
  CANVAS_COLORS,
  DEFAULT_CANVAS_ID,
  DEFAULT_PRESET_ID,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  ELECTRINO,
  ELECTRINO_WAKE,
  POSITRINO,
  POSITRINO_WAKE,
  PRESETS,
  SPACE_AXIS_TOP_Y,
  TIME_AXIS_BASELINE_Y,
  TIME_AXIS_END_X,
  TIME_AXIS_ORIGIN_X,
  WHITE,
  getCanvasColorById,
  getPresetById,
} from "./CausalDelayFeedbackDisplayContract.js";
import { EOM_REPLAY_DATASET_SOURCE } from "./CausalDelayFeedbackEomReplayAdapter.js";
import {
  TRANSPORT_CONTROL_ICON,
  setTransportControlButtonPresentation,
} from "../../runtime/TransportControlIcons.js";
import {
  NORMALIZED_FIELD_SPEED,
  createCanonicalLearnerState,
  evaluateCausalRoots,
  refreshCanonicalLearnerState,
} from "./CausalDelayFeedbackCausalHistory.js";
import { sampleTimedPath } from "./CausalDelayFeedbackTimedPath.js";
import {
  createCausalDelayFeedbackModeController,
} from "./CausalDelayFeedbackModeController.js";
import {
  DEFAULT_CAUSAL_DELAY_FEEDBACK_MODE,
  normalizeCausalDelayFeedbackMode,
} from "./CausalDelayFeedbackModes.js";
import {
  createStoryScene,
} from "./CausalDelayFeedbackStoryMode.js";
import {
  createRootsView,
  createSelfHitScenarios,
} from "./CausalDelayFeedbackRootsMode.js";
import {
  createBranchLabView,
} from "./CausalDelayFeedbackBranchLabMode.js";
import {
  createWakeDisplayGeometry,
  drawDottedWakeArc,
  drawWakeDisplayGeometry,
} from "./CausalDelayFeedbackWakeRenderer.js";

const REPLAY_LOOP_SECONDS = 9;
const STORY_STAGE_PLAYBACK_SECONDS = 3.2;
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
const FIELD_SPEED_CONTROL_MIN = 0.25;
const FIELD_SPEED_CONTROL_MAX = 1.75;
const DEFAULT_FIELD_SPEED_CONTROL_SCALE = 1;
const FIELD_SPEED_MIN = FIELD_SPEED_CONTROL_MIN;
const FIELD_SPEED_MAX = FIELD_SPEED_CONTROL_MAX;
const DEFAULT_FIELD_SPEED_SCALE = DEFAULT_FIELD_SPEED_CONTROL_SCALE;
const ARCHITRINO_KINDS = Object.freeze(["positrino", "electrino"]);
const ARCHITRINO_SPEED_FRACTIONS = Object.freeze([0.1, 0.3, 0.5, 0.7, 0.9, 0.99, 0.999, 0.9999, 0.99999, 0.999999]);
const DEFAULT_ARCHITRINO_SPEED_INDEX = 3;
const VIEWPORT_ZOOM_MIN = 1;
const VIEWPORT_ZOOM_MAX = 3;
const WHEEL_ZOOM_SENSITIVITY = 0.0015;
const WAKE_FRONT_CADENCE_TIME_DIVISIONS = 144;
const DEFAULT_LIVE_WAKE_FRONT_SPACING = 9;
const LIVE_WAKE_ROOT_SCAN_STEPS = 96;
const DEFAULT_LIVE_WAKE_SIGNAL_SPEED = 3000;
const PATH_LINE_HIT_RADIUS = 18;
const PATH_LINE_DRAG_FALLOFF_TIME = 0.32;
const PATH_LINE_FAIRING_CONTROL_STRIDE = 12;
const PATH_LINE_FAIRING_SHOULDER_FRACTION = 0.46;
const PATH_LINE_FAIRING_TANGENT_SCALE = 0.62;
const CENTRIPETAL_CATMULL_ROM_ALPHA = 0.5;
const PATH_ENDPOINT_HANDLE_RADIUS = 5.5;
const PATH_ENDPOINT_HANDLE_HIT_RADIUS = 18;
const ELECTRINO_LABEL = Object.freeze({ r: 126, g: 219, b: 255, a: 1 });
const LIGHT_CANVAS_COLOR_IDS = new Set(["light", "warm"]);
const LEGEND_TEXT_ON_DARK_CANVAS = "rgba(246, 247, 255, 0.9)";
const LEGEND_TEXT_ON_LIGHT_CANVAS = "rgba(14, 9, 24, 0.88)";
const LEGEND_BORDER_ON_DARK_CANVAS = "rgba(224, 207, 255, 0.34)";
const LEGEND_BORDER_ON_LIGHT_CANVAS = "rgba(14, 9, 24, 0.24)";
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

function getInitialQueryValue(windowLike, key) {
  try {
    return new URL(windowLike?.location?.href ?? "http://localhost/").searchParams.get(key);
  } catch {
    return null;
  }
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
    this.pathArcLengthCache = new Map();
    this.wheelHitCache = null;
    this.lastFrameTime = 0;
    this.elapsedSeconds = 0;
    this.reducedMotionEnabled = this.normalizeBooleanSetting(
      options.reducedMotionEnabled ?? this.prefersReducedMotion(),
    );
    this.backgroundDepthFieldEnabled = this.normalizeBooleanSetting(options.backgroundDepthFieldEnabled);
    this.isPlaying = !this.reducedMotionEnabled;
    this.fieldSpeedScale = this.normalizeFieldSpeedScale(options.fieldSpeedScale ?? DEFAULT_FIELD_SPEED_SCALE);
    this.architrinoSpeedIndex = this.normalizeArchitrinoSpeedIndex(
      options.architrinoSpeedIndex ?? DEFAULT_ARCHITRINO_SPEED_INDEX,
    );
    this.architrinoVelocityReference = {};
    this.presetId = getPresetById(
      options.presetId ?? getInitialQueryValue(this.window, "preset") ?? DEFAULT_PRESET_ID,
    ).id;
    this.wakeVisualSettings = this.createWakeVisualSettingsForPreset(
      getPresetById(this.presetId),
      options.wakeVisualSettings,
    );
    this.canvasColorId = getCanvasColorById(
      options.canvasColorId ?? getInitialQueryValue(this.window, "canvas") ?? DEFAULT_CANVAS_ID,
    ).id;
    this.fallbackReplayAdapter = options.fallbackReplayAdapter ?? createTemporaryMockReplayAdapter();
    this.replayAdapter = options.replayAdapter ?? this.fallbackReplayAdapter;
    this.replayRequestOptions = options.replayRequestOptions ?? {};
    this.autoLoadReplay = options.autoLoadReplay !== false;
    this.replayLoadSequence = 0;
    this.replayLoadState = "idle";
    this.replayLoadError = null;
    this.dataset = this.createFallbackReplay(this.presetId);
    this.updateWakeLinkGeometry();
    this.resetArchitrinoVelocityReference();
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
    if (this.learnerState.mode !== "sandbox") {
      this.isPlaying = false;
      this.learnerState.playback.playing = false;
    }
    this.elapsedSeconds = this.learnerState.mode === "sandbox"
      ? 0
      : this.learnerState.receiverTime * REPLAY_LOOP_SECONDS;
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

    this.populateCanvasSwatches();
    this.updateSpeedControls();
    this.updateDisplaySettingControls();
    this.updateNowControl();
    this.updateReplayStatus();
    this.bindEvents();
    this.modeController = createCausalDelayFeedbackModeController({
      document: this.document,
      state: this.learnerState,
      onModeChange: (mode) => {
        this.learnerState.mode = mode;
        if (mode !== "sandbox") {
          this.selectedItem = null;
          this.setPlaying(false);
        }
        this.render();
      },
      onStateChange: () => {
        this.render();
      },
      onPlayToggle: (isPlaying) => {
        if (isPlaying && this.learnerState.mode === "story") {
          this.setGuidedReplayCursor(createStoryScene(this.learnerState).startTime);
        }
        this.setPlaying(isPlaying);
      },
      onReplay: () => {
        this.setGuidedReplayCursor(createStoryScene(this.learnerState).startTime);
        this.setPlaying(!this.reducedMotionEnabled);
      },
    }).init();
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
      playButton: queryRequiredElement(this.document, "#causal-delay-feedback-play"),
      resetButton: queryRequiredElement(this.document, "#causal-delay-feedback-reset"),
      settingsButton: queryRequiredElement(this.document, "#causal-delay-feedback-settings"),
      visualSwitches: queryRequiredElement(this.document, "#causal-delay-feedback-visual-switches"),
      settingsPanel: queryRequiredElement(this.document, "#causal-delay-feedback-settings-panel"),
      resetPresetButton: queryRequiredElement(this.document, "#causal-delay-feedback-reset-preset"),
      colorSwatches: queryRequiredElement(this.document, "#causal-delay-feedback-color-swatches"),
      nowInput: queryRequiredElement(this.document, "#causal-delay-feedback-now"),
      nowValue: queryRequiredElement(this.document, "#causal-delay-feedback-now-value"),
      cfSpeedInput: queryRequiredElement(this.document, "#causal-delay-feedback-cf-speed"),
      cfSpeedValue: queryRequiredElement(this.document, "#causal-delay-feedback-cf-speed-value"),
      architrinoSpeedInput: queryRequiredElement(this.document, "#causal-delay-feedback-architrino-speed"),
      architrinoSpeedValue: queryRequiredElement(this.document, "#causal-delay-feedback-architrino-speed-value"),
      replayStatus: queryRequiredElement(this.document, "#causal-delay-feedback-replay-status"),
      readout: queryRequiredElement(this.document, "#causal-delay-feedback-readout"),
    };
  }

  populateCanvasSwatches() {
    this.dom.colorSwatches.replaceChildren(
      ...CANVAS_COLORS.map((entry) => {
        const button = this.document.createElement("button");
        button.type = "button";
        button.className = "causal-swatch";
        button.style.background = entry.color;
        button.dataset.colorId = entry.id;
        button.setAttribute("aria-label", entry.label);
        return button;
      }),
    );
    this.updateCanvasSwatchSelection();
  }

  createWakeVisualSettingsForPreset(preset, overrides = null) {
    const settings = { ...DEFAULT_WAKE_VISUAL_SETTINGS };
    switch (preset?.id) {
      case "full_circular_arcs":
        settings.arcWakesEnabled = false;
        settings.fullCircularWakesEnabled = true;
        break;
      default:
        break;
    }
    Object.entries(overrides ?? {}).forEach(([key, value]) => {
      if (Object.prototype.hasOwnProperty.call(settings, key)) {
        settings[key] = this.normalizeBooleanSetting(value);
      }
    });
    return settings;
  }

  setWakeVisualSettingsFromPreset(presetId) {
    this.wakeVisualSettings = this.createWakeVisualSettingsForPreset(getPresetById(presetId));
    this.updateDisplaySettingControls();
  }

  toggleWakeVisualSwitch(switchId) {
    if (!Object.prototype.hasOwnProperty.call(WAKE_VISUAL_SWITCHES, switchId)) {
      return;
    }
    this.setWakeVisualSwitch(switchId, !this.wakeVisualSettings[switchId]);
  }

  setWakeVisualSwitch(switchId, isEnabled) {
    if (!Object.prototype.hasOwnProperty.call(WAKE_VISUAL_SWITCHES, switchId)) {
      return;
    }
    const nextValue = this.normalizeBooleanSetting(isEnabled);
    if (this.wakeVisualSettings[switchId] === nextValue) {
      this.updateDisplaySettingControls();
      return;
    }
    this.wakeVisualSettings = {
      ...this.wakeVisualSettings,
      [switchId]: nextValue,
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
    this.listen(this.dom.resetPresetButton, "click", () => {
      void this.resetPreset();
    });
    this.listen(this.dom.settingsButton, "click", () => {
      this.toggleSettings();
    });
    this.listen(this.dom.visualSwitches, "click", (event) => {
      const button = event.target.closest("[data-visual-switch]");
      if (!button) {
        return;
      }
      this.toggleWakeVisualSwitch(button.dataset.visualSwitch);
    });
    this.listen(this.dom.colorSwatches, "click", (event) => {
      const button = event.target.closest("[data-color-id]");
      if (!button) {
        return;
      }
      this.setCanvasColor(button.dataset.colorId);
    });
    this.listen(this.dom.nowInput, "input", () => {
      this.setReplayNowSliderValue(this.dom.nowInput.value);
    });
    this.listen(this.dom.cfSpeedInput, "input", () => {
      this.setFieldSpeedControlScale(this.dom.cfSpeedInput.value);
    });
    this.listen(this.dom.architrinoSpeedInput, "input", () => {
      this.setArchitrinoSpeedIndex(this.dom.architrinoSpeedInput.value);
    });
    this.listen(this.dom.architrinoSpeedInput, "change", () => {
      void this.submitArchitrinoSpeedFraction();
    });
    this.listen(this.dom.settingsPanel, "click", (event) => {
      const button = event.target.closest("[data-architrino-speed-step]");
      if (!button) {
        return;
      }
      void this.stepArchitrinoSpeedIndex(Number(button.dataset.architrinoSpeedStep));
    });
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
    this.listen(this.document, "pointerdown", (event) => {
      if (
        this.dom.settingsPanel.hidden ||
        this.dom.settingsPanel.contains(event.target) ||
        this.dom.settingsButton.contains(event.target)
      ) {
        return;
      }
      this.hideSettings();
    });
  }

  listen(target, type, handler, options) {
    target.addEventListener(type, handler, options);
    this.eventListeners.push({ target, type, handler, options });
  }

  setPreset(presetId) {
    this.presetId = getPresetById(presetId).id;
    this.setWakeVisualSettingsFromPreset(this.presetId);
    this.elapsedSeconds = 0;
    this.selectedItem = null;
    this.dragState = null;
    const fallbackDataset = this.createFallbackReplay(this.presetId);
    this.retainedDepthLimit = this.normalizeRetainedDepthLimit(fallbackDataset.initialConditions?.historyDepth);
    this.applyReplayDataset(fallbackDataset, {
      loadState: this.usesFallbackReplayOnly() || this.shouldUseRepresentativeReplayOnly(this.presetId) ? "ready" : "loading",
    });
    this.refreshAfterReplayDatasetChange();
    return this.loadReplay();
  }

  createFallbackReplay(presetId = this.presetId) {
    if (typeof this.fallbackReplayAdapter.createReplay === "function") {
      return this.fallbackReplayAdapter.createReplay({ presetId });
    }
    return createMockCausalDelayReplayDataset(presetId);
  }

  usesFallbackReplayOnly() {
    return this.replayAdapter === this.fallbackReplayAdapter && typeof this.replayAdapter.createReplayAsync !== "function";
  }

  shouldUseRepresentativeReplayOnly(presetId = this.presetId) {
    return getPresetById(presetId).representativeOnly === true;
  }

  async loadReplay({
    presetId = this.presetId,
    requestOptions = this.replayRequestOptions,
  } = {}) {
    const selectedPresetId = getPresetById(presetId).id;
    const sequence = ++this.replayLoadSequence;
    const adapter = this.replayAdapter;
    this.replayLoadState = "loading";
    this.replayLoadError = null;
    this.updateReplayStatus();

    if (this.shouldUseRepresentativeReplayOnly(selectedPresetId)) {
      const dataset = this.createFallbackReplay(selectedPresetId);
      if (sequence !== this.replayLoadSequence) {
        return this.dataset;
      }
      this.presetId = selectedPresetId;
      this.applyReplayDataset(dataset, { loadState: "ready" });
      this.elapsedSeconds = 0;
      this.selectedItem = null;
      this.dragState = null;
      this.refreshAfterReplayDatasetChange();
      return this.dataset;
    }

    try {
      const dataset = await this.createReplayDataset(adapter, selectedPresetId, requestOptions);
      if (sequence !== this.replayLoadSequence) {
        return this.dataset;
      }
      this.presetId = selectedPresetId;
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
      this.presetId = selectedPresetId;
      this.applyReplayDataset(this.createFallbackReplay(selectedPresetId), { loadState: "fallback" });
      this.elapsedSeconds = 0;
      this.selectedItem = null;
      this.dragState = null;
      this.refreshAfterReplayDatasetChange();
      return this.dataset;
    }
  }

  createReplayDataset(adapter, presetId, requestOptions) {
    return typeof adapter.createReplayAsync === "function"
      ? adapter.createReplayAsync({ presetId, requestOptions })
      : adapter.createReplay({ presetId, requestOptions });
  }

  applyReplayDataset(dataset, { loadState = this.replayLoadState } = {}) {
    this.dataset = dataset;
    this.invalidateComputedCaches();
    this.replayLoadState = loadState;
    this.retainedDepthLimit = this.normalizeRetainedDepthLimit(this.retainedDepthLimit);
    this.applyDatasetCanvasColor(dataset);
    this.updateWakeLinkGeometry();
    this.resetArchitrinoVelocityReference();
    this.syncReplayRequestOptionsFromDataset();
    this.refreshLearnerState({
      receiverTime: this.learnerState?.receiverTime ?? this.getCurrentReplayTime(),
    });
    this.updateSpeedControls();
    this.updateReplayStatus();
  }

  invalidateComputedCaches() {
    this.datasetRevision += 1;
    this.visibleWakeSeriesCache = null;
    this.replayTimeRangeCache = null;
    this.replayFrameTimesCache = null;
    this.pathArcLengthCache.clear();
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
      architrinoSpeedFraction: this.getArchitrinoSpeedFraction(),
    };
    this.replayRequestOptions = requestOptions;
  }

  refreshAfterReplayDatasetChange() {
    if (this.learnerState?.mode !== "sandbox" && Number.isFinite(this.learnerState?.receiverTime)) {
      const [start, end] = this.getReplayTimeRange();
      const span = end - start;
      const phase = span > 0 ? clamp((this.learnerState.receiverTime - start) / span, 0, 1) : 0;
      this.elapsedSeconds = phase * REPLAY_LOOP_SECONDS;
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

  setGuidedReplayCursor(replayTime) {
    const [start, end] = this.getReplayTimeRange();
    const span = end - start;
    const nextTime = Number.isFinite(Number(replayTime))
      ? clamp(Number(replayTime), start, end)
      : start;
    const phase = span > TIME_EPSILON ? clamp((nextTime - start) / span, 0, 1) : 0;
    this.elapsedSeconds = phase * REPLAY_LOOP_SECONDS;
    this.updateNowControl(nextTime);
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
  }

  getReplayStatusState() {
    if (this.replayLoadState === "loading") {
      if (this.usesFallbackReplayOnly()) {
        return {
          state: "representative",
          label: "representative replay",
          help: "Showing representative replay data shaped like the solver output.",
        };
      }
      return {
        state: "loading",
        label: "solver bridge loading",
        help: "Loading replay data through the solver bridge.",
      };
    }
    if (this.replayLoadState === "fallback") {
      const errorMessage = this.replayLoadError?.message;
      return {
        state: "fallback",
        label: "representative fallback",
        help: errorMessage
          ? `Showing representative replay data because solver bridge replay is unavailable: ${errorMessage}`
          : "Showing representative replay data because solver bridge replay is unavailable.",
      };
    }
    if (
      this.replayLoadState === "draft" ||
      this.dataset?.datasetSource === DIRECT_MANIPULATION_DRAFT_PREVIEW
    ) {
      return {
        state: "draft",
        label: "draft preview",
        help: "Showing a local teaching preview. The recorded replay remains unchanged.",
      };
    }
    if (this.dataset?.datasetSource === EOM_REPLAY_DATASET_SOURCE) {
      return {
        state: "eom-replay",
        label: "EOM recorded replay",
        help: "Showing recorded EOM paths. This viewer does not recompute the record or infer delayed hits.",
      };
    }
    if (this.dataset?.solverIntegrationPath && this.dataset.solverIntegrationPath !== TEMPORARY_MOCK_ADAPTER) {
      return {
        state: "recorded",
        label: "recorded replay",
        help: "Showing a recorded replay dataset.",
      };
    }
    if (this.dataset?.datasetSource === REPRESENTATIVE_MOCK_SOLVER_REPLAY) {
      return {
        state: "representative",
        label: "representative replay",
        help: "Showing representative replay data shaped like the solver output.",
      };
    }
    return {
      state: "representative",
      label: "replay ready",
      help: "Showing replay data.",
    };
  }

  setCanvasColor(colorId) {
    this.canvasColorId = getCanvasColorById(colorId).id;
    this.updateCanvasSwatchSelection();
    if (this.dom?.settingsPanel) {
      this.hideSettings();
    }
    this.render();
  }

  setFieldSpeedScale(speedScale) {
    const nextScale = this.normalizeFieldSpeedScale(speedScale);
    if (nextScale === this.fieldSpeedScale) {
      this.updateFieldSpeedControl();
      return;
    }
    this.fieldSpeedScale = nextScale;
    this.syncReplayRequestOptionsFromDataset();
    this.updateFieldSpeedControl();
  }

  setFieldSpeedControlScale(controlScale) {
    this.setFieldSpeedScale(this.getFieldSpeedScaleForControlScale(controlScale));
  }

  setArchitrinoSpeedIndex(speedIndex, { submit = false } = {}) {
    const nextIndex = this.normalizeArchitrinoSpeedIndex(speedIndex);
    const didIndexChange = nextIndex !== this.architrinoSpeedIndex;
    this.architrinoSpeedIndex = nextIndex;
    const didEdit = didIndexChange && this.applyArchitrinoSpeedFraction(this.getArchitrinoSpeedFraction());
    this.updateArchitrinoSpeedControl();
    if (didEdit) {
      this.updateWakeLinkGeometry();
      this.syncReplayRequestOptionsFromDataset();
      this.markDraftPreview("architrino_speed_fraction_preview");
      if (this.dom?.readout) {
        this.updateReadout();
      }
      if (this.context) {
        this.render();
      }
    } else {
      this.syncReplayRequestOptionsFromDataset();
    }
    if (submit) {
      return this.submitArchitrinoSpeedFraction();
    }
    return this.dataset;
  }

  stepArchitrinoSpeedIndex(direction) {
    const step = Math.sign(Number(direction) || 0);
    if (step === 0) {
      return this.dataset;
    }
    return this.setArchitrinoSpeedIndex(this.architrinoSpeedIndex + step, { submit: true });
  }

  submitArchitrinoSpeedFraction() {
    return this.dataset;
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
    if (this.dom?.settingsPanel) {
      this.hideSettings();
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

  applyDatasetCanvasColor(dataset) {
    const colorId = dataset?.canvasColorId ?? dataset?.preset?.canvasColorId;
    if (!colorId) {
      return;
    }
    this.canvasColorId = getCanvasColorById(colorId).id;
    this.updateCanvasSwatchSelection();
  }

  updateCanvasSwatchSelection() {
    this.updateCanvasThemeVariables();
    if (!this.dom?.colorSwatches) {
      return;
    }
    Array.from(this.dom.colorSwatches.children).forEach((button) => {
      button.classList.toggle("is-active", button.dataset.colorId === this.canvasColorId);
    });
  }

  updateCanvasThemeVariables() {
    if (!this.dom?.app?.style) {
      return;
    }
    const canvasColor = getCanvasColorById(this.canvasColorId);
    const usesLightCanvas = LIGHT_CANVAS_COLOR_IDS.has(canvasColor.id);
    this.dom.app.style.setProperty("--causal-selected-canvas-color", canvasColor.color);
    this.dom.app.style.setProperty(
      "--causal-legend-text-color",
      usesLightCanvas ? LEGEND_TEXT_ON_LIGHT_CANVAS : LEGEND_TEXT_ON_DARK_CANVAS,
    );
    this.dom.app.style.setProperty(
      "--causal-legend-border-color",
      usesLightCanvas ? LEGEND_BORDER_ON_LIGHT_CANVAS : LEGEND_BORDER_ON_DARK_CANVAS,
    );
    this.dom.app.style.setProperty("--causal-positrino-color", colorToCss(POSITRINO));
    this.dom.app.style.setProperty("--causal-electrino-color", colorToCss(ELECTRINO));
    this.dom.app.style.setProperty("--causal-positrino-wake-color", colorToCss(POSITRINO_WAKE));
    this.dom.app.style.setProperty("--causal-electrino-wake-color", colorToCss(ELECTRINO_WAKE));
  }

  updateSpeedControls() {
    this.updateFieldSpeedControl();
    this.updateArchitrinoSpeedControl();
  }

  updateDisplaySettingControls() {
    if (this.dom?.visualSwitches) {
      Array.from(this.dom.visualSwitches.children).forEach((button) => {
        const switchId = button.dataset.visualSwitch;
        if (!switchId) {
          return;
        }
        const isActive = this.wakeVisualSettings[switchId] === true;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    }
  }

  updateFieldSpeedControl() {
    if (this.dom?.cfSpeedInput) {
      const roundedControlScale = Math.round(this.getFieldSpeedControlScale(this.fieldSpeedScale) * 100) / 100;
      this.dom.cfSpeedInput.value = String(roundedControlScale);
    }
    if (this.dom?.cfSpeedValue) {
      this.dom.cfSpeedValue.textContent = this.formatFieldSpeedScale(this.fieldSpeedScale);
    }
  }

  updateArchitrinoSpeedControl() {
    if (this.dom?.architrinoSpeedInput) {
      this.dom.architrinoSpeedInput.value = String(this.architrinoSpeedIndex);
    }
    if (this.dom?.architrinoSpeedValue) {
      const value = this.formatArchitrinoSpeedFraction(this.getArchitrinoSpeedFraction());
      this.dom.architrinoSpeedValue.textContent = `${value} c_f`;
      this.dom.architrinoSpeedValue.setAttribute("aria-label", `${value} field speed c_f`);
      this.dom.architrinoSpeedValue.innerHTML = `${value} c<sub>f</sub>`;
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

  normalizeFieldSpeedScale(speedScale) {
    const numericScale = Number(speedScale);
    const candidate = Number.isFinite(numericScale) ? numericScale : DEFAULT_FIELD_SPEED_SCALE;
    return clamp(candidate, FIELD_SPEED_MIN, FIELD_SPEED_MAX);
  }

  normalizeFieldSpeedControlScale(controlScale) {
    const numericScale = Number(controlScale);
    const candidate = Number.isFinite(numericScale) ? numericScale : DEFAULT_FIELD_SPEED_CONTROL_SCALE;
    return clamp(candidate, FIELD_SPEED_CONTROL_MIN, FIELD_SPEED_CONTROL_MAX);
  }

  getFieldSpeedScaleForControlScale(controlScale) {
    return this.normalizeFieldSpeedControlScale(controlScale);
  }

  getFieldSpeedControlScale(speedScale = this.fieldSpeedScale) {
    return this.normalizeFieldSpeedScale(speedScale);
  }

  normalizeArchitrinoSpeedIndex(speedIndex) {
    const numericIndex = Number(speedIndex);
    const candidate = Number.isFinite(numericIndex) ? Math.round(numericIndex) : DEFAULT_ARCHITRINO_SPEED_INDEX;
    return clamp(candidate, 0, ARCHITRINO_SPEED_FRACTIONS.length - 1);
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

  getArchitrinoSpeedFraction(index = this.architrinoSpeedIndex) {
    return ARCHITRINO_SPEED_FRACTIONS[this.normalizeArchitrinoSpeedIndex(index)];
  }

  formatFieldSpeedScale(speedScale) {
    const rounded = Math.round(this.getFieldSpeedControlScale(speedScale) * 100) / 100;
    return `${String(rounded).replace(/\.0+$/, "")}x`;
  }

  formatArchitrinoSpeedFraction(fraction) {
    return String(fraction);
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

  solveLiveWakeEmissionPoint(sourceKind, receiver, replayTime, signalSpeed) {
    const now = Number(replayTime);
    const speed = Number(signalSpeed);
    if (!Number.isFinite(now) || !Number.isFinite(speed) || speed <= 0) {
      return null;
    }
    const [pathStart] = this.getReplayTimeRange();
    if (!Number.isFinite(pathStart) || now <= pathStart + TIME_EPSILON) {
      return null;
    }
    const receiverKind = this.getOppositeArchitrinoKind(sourceKind) ?? `${sourceKind}-receiver`;
    const evaluation = evaluateCausalRoots({
      sourceId: sourceKind,
      receiverId: receiverKind,
      sourcePath: this.dataset?.paths?.[sourceKind] ?? [],
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

  setPlaying(isPlaying) {
    const wasPlaying = this.isPlaying;
    this.isPlaying = Boolean(isPlaying);
    if (
      this.isPlaying &&
      !wasPlaying &&
      this.learnerState?.mode === "story"
    ) {
      this.storyStageElapsedSeconds = 0;
      this.storyPlaybackScene = createStoryScene(this.learnerState);
    } else if (!this.isPlaying) {
      this.storyPlaybackScene = null;
    }
    if (this.learnerState) {
      this.learnerState.playback.playing = this.isPlaying;
    }
    this.updatePlayButton();
    this.modeController?.render();
    if (this.isPlaying) {
      this.scheduleAnimationFrame();
    }
  }

  updatePlayButton() {
    if (this.dom?.playButton) {
      const label = this.isPlaying ? "Pause replay" : "Play replay";
      this.dom.playButton.classList?.toggle("is-active", this.isPlaying);
      setTransportControlButtonPresentation(this.dom.playButton, {
        kind: this.isPlaying ? TRANSPORT_CONTROL_ICON.PAUSE : TRANSPORT_CONTROL_ICON.PLAY,
        label,
        pressed: this.isPlaying,
      });
    }
    if (this.dom?.resetButton) {
      setTransportControlButtonPresentation(this.dom.resetButton, {
        kind: TRANSPORT_CONTROL_ICON.RESET,
        label: "Reset replay",
      });
    }
  }

  resetReplayTime() {
    this.elapsedSeconds = 0;
    this.setPlaying(true);
    this.updateNowControl();
    if (this.dom?.readout) {
      this.updateReadout();
    }
    if (this.context) {
      this.render();
    }
  }

  resetPreset() {
    if (this.dom?.settingsPanel && this.dom?.settingsButton) {
      this.hideSettings();
    }
    return this.setPreset(this.presetId);
  }

  setReplayNowSliderValue(value) {
    const numericValue = Number(value);
    const sliderValue = Number.isFinite(numericValue) ? clamp(numericValue, 0, NOW_SLIDER_MAX) : 0;
    const [start, end] = this.getReplayTimeRange();
    const span = end - start;
    const replayTime = span > 0 ? start + span * (sliderValue / NOW_SLIDER_MAX) : start;
    this.setPlaying(false);
    this.setCurrentReplayTime(replayTime);
    this.updateNowControl(replayTime);
    if (this.context) {
      this.render(replayTime);
    }
    if (this.dom?.readout) {
      this.updateReadout();
    }
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
    this.elapsedSeconds = phase >= 1 ? REPLAY_LOOP_SECONDS - TIME_EPSILON : phase * REPLAY_LOOP_SECONDS;
    this.refreshLearnerState({ receiverTime: nextTime });
    this.modeController?.setState(this.learnerState);
  }

  updateNowControl(replayTime = this.getCurrentReplayTime()) {
    if (!this.dom?.nowInput || !this.dom?.nowValue) {
      return;
    }
    const [start, end] = this.getReplayTimeRange();
    const span = end - start;
    const phase = span > 0 ? clamp((replayTime - start) / span, 0, 1) : 0;
    this.dom.nowInput.value = String(Math.round(phase * NOW_SLIDER_MAX));
    this.dom.nowValue.textContent = `replay t=${formatCompactNumber(replayTime)}`;
  }

  toggleSettings() {
    const shouldOpen = this.dom.settingsPanel.hidden;
    this.dom.settingsPanel.hidden = !shouldOpen;
    this.dom.settingsButton.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
  }

  hideSettings() {
    this.dom.settingsPanel.hidden = true;
    this.dom.settingsButton.setAttribute("aria-expanded", "false");
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
        this.storyStageElapsedSeconds =
          (this.storyStageElapsedSeconds ?? 0) + deltaSeconds * this.fieldSpeedScale;
        const progress = clamp(
          this.storyStageElapsedSeconds / STORY_STAGE_PLAYBACK_SECONDS,
          0,
          1,
        );
        const replayTime =
          scene.startTime + (scene.endTime - scene.startTime) * progress;
        const shouldRefreshLearnerPanel =
          time - (this.lastLearnerPanelUpdate ?? 0) >= 120;
        if (shouldRefreshLearnerPanel) {
          this.lastLearnerPanelUpdate = time;
          this.refreshLearnerState({ receiverTime: replayTime });
        }
        this.render(replayTime);
        if (shouldRefreshLearnerPanel) {
          this.modeController?.renderLiveState();
        }
        if (progress >= 1) {
          this.setPlaying(false);
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
    const baseScale = Math.min(this.canvasWidth / DESIGN_WIDTH, this.canvasHeight / DESIGN_HEIGHT);
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
    ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawBackground(ctx);
    if (this.learnerState?.mode !== "sandbox") {
      const sceneId = this.learnerState.mode === "story"
        ? `story:${createStoryScene(this.learnerState).id}`
        : this.learnerState.mode;
      if (this.dom?.canvas) {
        this.dom.canvas.dataset.causalScene = sceneId;
      }
      if (this.learnerState.mode !== "self-hit") {
        this.drawPathTrail(ctx, "positrino", withAlpha(POSITRINO, 0.76));
        this.drawPathTrail(ctx, "electrino", withAlpha(ELECTRINO, 0.76));
      }
      this.drawGuidedModeScene(ctx, replayTime);
      return;
    }
    if (this.dom?.canvas) {
      this.dom.canvas.dataset.causalScene = "sandbox";
    }
    this.drawWakes(ctx, replayTime);
    this.drawPathTrail(ctx, "positrino", POSITRINO);
    this.drawPathTrail(ctx, "electrino", ELECTRINO);
    this.drawForegroundWakeEmissionLines(ctx, replayTime);
    this.drawPathEndpointHandles(ctx);
    this.drawSelection(ctx);
    this.drawSandboxTransmissionGhost(ctx);
    this.drawLiveMarkers(ctx, replayTime);
  }

  drawGuidedModeScene(ctx, replayTime = this.getCurrentReplayTime()) {
    switch (this.learnerState.mode) {
      case "story":
        this.drawStoryScene(ctx, replayTime);
        break;
      case "roots":
        this.drawRootsScene(ctx);
        break;
      case "self-hit":
        this.drawSelfHitScene(ctx);
        break;
      case "branch-lab":
        this.drawBranchLabScene(ctx);
        break;
      case "prediction":
      case "history":
      default:
        this.drawGuidedCausalHistory(ctx, this.learnerState.receiverTime);
        this.drawGuidedLiveMarkers(ctx, this.learnerState.receiverTime);
        break;
    }
  }

  drawStoryScene(ctx, replayTime = this.getCurrentReplayTime()) {
    const scene = createStoryScene(this.learnerState);
    if (scene.interactions.length === 0) {
      this.drawGuidedLiveMarkers(ctx, scene.displayTime);
      return;
    }
    const displayTime = this.learnerState.playback.playing
      ? clamp(replayTime, scene.startTime, scene.endTime)
      : scene.displayTime;
    scene.interactions.forEach((interaction) => {
      const wakeColor = interaction.transmitterId === "positrino"
        ? "rgba(255,150,166,0.88)"
        : "rgba(150,170,255,0.9)";
      const lineColor = interaction.transmitterId === "positrino"
        ? "rgba(255,195,204,0.86)"
        : "rgba(190,205,255,0.88)";
      const geometry = createWakeDisplayGeometry(interaction.root, displayTime);
      drawWakeDisplayGeometry(ctx, geometry, {
        worldToScreen: (point) => this.worldToScreen(point),
        color: wakeColor,
        lineColor,
        dotRadius: Math.max(1.1, 1.45 * this.viewport.scale),
        showWake: scene.showWake,
        showCausalLine: scene.showCausalLine,
      });
      if (scene.showTransmissionGhost) {
        this.drawTransmissionGhost(
          ctx,
          interaction.root.emission,
          interaction.transmitterId,
          { label: `${interaction.transmitterId} transmitted here` },
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
    this.drawGuidedLiveMarkers(ctx, displayTime);
    this.drawSceneHeading(ctx, `STORY ${scene.id.toUpperCase().replaceAll("-", " ")}`);
  }

  drawGuidedLiveMarkers(ctx, replayTime) {
    this.drawLiveMarker(
      ctx,
      "positrino",
      POSITRINO,
      sampleTimedPath(this.learnerState.paths.positrino, replayTime),
      "positrino",
      { x: 0, y: -36 },
    );
    this.drawLiveMarker(
      ctx,
      "electrino",
      ELECTRINO,
      sampleTimedPath(this.learnerState.paths.electrino, replayTime),
      "electrino",
      { x: 0, y: 36 },
    );
  }

  drawGuidedCausalHistory(ctx, replayTime = this.getCurrentReplayTime()) {
    const root = this.learnerState?.roots?.find(
      (candidate) => candidate.id === this.learnerState.selectedRootId,
    );
    if (!root) {
      return;
    }
    const geometry = createWakeDisplayGeometry(root, replayTime);
    const predictionHidden =
      this.learnerState.mode === "prediction" &&
      this.learnerState.predictionState === "unanswered";
    const showCausalLine = !predictionHidden || this.learnerState.predictionState === "correct";
    drawWakeDisplayGeometry(ctx, geometry, {
      worldToScreen: (point) => this.worldToScreen(point),
      color: root.accepted ? "rgba(246,247,255,0.78)" : "rgba(255,218,89,0.72)",
      lineColor: "rgba(127,238,255,0.82)",
      dotRadius: Math.max(1.1, 1.45 * this.viewport.scale),
      showWake: !predictionHidden,
      showCausalLine,
    });
    if (!predictionHidden) {
      this.drawTransmissionGhost(ctx, root.emission, this.learnerState.sourceId);
    }
    this.drawCircle(
      ctx,
      this.worldToScreen(root.reception),
      8,
      withAlpha(ELECTRINO_WAKE, 0.9),
      WHITE,
      1.2,
    );
  }

  drawRootsScene(ctx) {
    const view = createRootsView(this.learnerState);
    view.roots.forEach((root) => {
      const geometry = createWakeDisplayGeometry(root, view.receiverTime);
      drawWakeDisplayGeometry(ctx, geometry, {
        worldToScreen: (point) => this.worldToScreen(point),
        color: root.accepted ? "rgba(246,247,255,0.8)" : "rgba(255,218,89,0.54)",
        lineColor: root.accepted ? "rgba(127,238,255,0.78)" : "rgba(255,218,89,0.5)",
        dotRadius: root.id === this.learnerState.selectedRootId ? 2.2 : 1.35,
        showWake: true,
        showCausalLine: true,
      });
      this.drawTransmissionGhost(ctx, root.emission, root.sourceId, {
        label: `root ${root.ordinal} · Tₜ=${root.emissionTime.toFixed(3)}`,
        emphasized: root.id === this.learnerState.selectedRootId,
      });
    });
    this.drawGuidedLiveMarkers(ctx, view.receiverTime);
    this.drawSceneHeading(ctx, `ROOTS · ${view.activeRootCount} ACTIVE`);
  }

  mapSelfHitPoint(point) {
    return {
      x: 950 + Number(point?.x ?? 0) * 650,
      y: 520 + Number(point?.y ?? 0) * 650,
      t: Number(point?.t ?? 0),
    };
  }

  drawSelfHitScene(ctx) {
    const scenarios = createSelfHitScenarios();
    const scenario = scenarios.find(
      (candidate) => candidate.id === this.learnerState.selectedSelfHitScenarioId,
    ) ?? scenarios.find((candidate) => candidate.id === "super_cf_curved") ?? scenarios[0];
    if (!scenario) {
      return;
    }
    const path = scenario.path.map((point) => this.worldToScreen(this.mapSelfHitPoint(point)));
    this.drawSmoothLine(ctx, path, withAlpha({ r: 179, g: 131, b: 255, a: 1 }, 0.84), 5);
    const root = scenario.roots.find((candidate) => candidate.accepted) ?? scenario.roots[0] ?? null;
    if (root) {
      const emission = this.mapSelfHitPoint(root.emission);
      const reception = this.mapSelfHitPoint(root.reception);
      const radius = getDistance(emission, reception);
      drawDottedWakeArc(ctx, {
        center: emission,
        radius,
        color: root.accepted ? "rgba(246,247,255,0.82)" : "rgba(255,218,89,0.66)",
        dotRadius: 1.8,
        worldToScreen: (point) => this.worldToScreen(point),
      });
      this.drawLine(
        ctx,
        [this.worldToScreen(emission), this.worldToScreen(reception)],
        root.accepted ? withAlpha(ELECTRINO_WAKE, 0.82) : withAlpha({ r: 255, g: 218, b: 89, a: 1 }, 0.72),
        1.6,
      );
      this.drawTransmissionGhost(ctx, emission, "positrino", {
        label: "same transceiver · earlier",
        emphasized: true,
      });
      this.drawLiveMarker(
        ctx,
        "electrino",
        ELECTRINO,
        reception,
        "same transceiver · later",
        { x: 0, y: 36 },
      );
    } else {
      const reception = this.mapSelfHitPoint(
        sampleTimedPath(scenario.path, scenario.receiverTime),
      );
      this.drawLiveMarker(
        ctx,
        "electrino",
        ELECTRINO,
        reception,
        "same transceiver · later",
        { x: 0, y: 36 },
      );
    }
    this.drawSceneHeading(
      ctx,
      `SELF-HIT · ${scenario.label.toUpperCase()} · ${scenario.state.toUpperCase()}`,
    );
  }

  drawBranchLabScene(ctx) {
    const view = createBranchLabView(this.learnerState);
    view.rows.forEach((row) => {
      if (!row.emission || !row.reception) {
        return;
      }
      const lineColor = row.included
        ? row.accepted ? row.color : "rgba(255,218,89,0.62)"
        : "rgba(195,198,216,0.22)";
      const radius = getDistance(row.emission, row.reception);
      drawDottedWakeArc(ctx, {
        center: row.emission,
        radius,
        color: lineColor,
        dotRadius: row.included ? 1.75 : 1.1,
        worldToScreen: (point) => this.worldToScreen(point),
      });
      this.drawLine(
        ctx,
        [this.worldToScreen(row.emission), this.worldToScreen(row.reception)],
        lineColor,
        row.included ? 1.45 : 0.8,
      );
      this.drawCircle(
        ctx,
        this.worldToScreen(row.emission),
        row.included ? 6 : 4,
        lineColor,
        withAlpha(WHITE, row.included ? 0.72 : 0.22),
        1,
      );
    });
    const vectorOrigin = { x: 900, y: 790 };
    const scale = view.vectorMagnitude > TIME_EPSILON
      ? Math.min(150, 150 / view.vectorMagnitude)
      : 0;
    const vectorEnd = {
      x: vectorOrigin.x + view.vectorSum.x * scale,
      y: vectorOrigin.y + view.vectorSum.y * scale,
    };
    this.drawLine(
      ctx,
      [this.worldToScreen(vectorOrigin), this.worldToScreen(vectorEnd)],
      withAlpha({ r: 124, g: 255, b: 179, a: 1 }, 0.94),
      5,
    );
    this.drawCircle(
      ctx,
      this.worldToScreen(vectorEnd),
      7,
      { r: 124, g: 255, b: 179, a: 1 },
      WHITE,
      1,
    );
    this.drawSceneHeading(
      ctx,
      `BRANCH LAB · ${view.acceptedRows.length} INCLUDED · ${view.filteredRows.length} FILTERED`,
    );
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
    const canvasColor = getCanvasColorById(this.canvasColorId).color;
    ctx.fillStyle = canvasColor;
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    if (this.backgroundDepthFieldEnabled) {
      this.drawBackgroundDepthField(ctx);
    }

    const xAxisStart = this.worldToScreen({ x: TIME_AXIS_ORIGIN_X, y: TIME_AXIS_BASELINE_Y });
    const xAxisEnd = this.worldToScreen({ x: TIME_AXIS_END_X, y: TIME_AXIS_BASELINE_Y });
    const yAxisStart = this.worldToScreen({ x: TIME_AXIS_ORIGIN_X, y: TIME_AXIS_BASELINE_Y });
    const yAxisEnd = this.worldToScreen({ x: TIME_AXIS_ORIGIN_X, y: SPACE_AXIS_TOP_Y });
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
    this.drawText(ctx, "time", { x: 1788, y: 932 }, 14, withAlpha(WHITE, 0.72), "right");
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

  getWakeVisualPreset() {
    const basePreset = this.dataset?.preset?.contrastStress
      ? this.dataset.preset
      : getPresetById(DEFAULT_PRESET_ID);
    const dotRadius = (Number(basePreset.dotRadius) || 1.8) * (1.35 / 1.8);
    const alphaScale = (Number(basePreset.alphaScale) || 1) * (0.86 / 1.18);
    return {
      ...basePreset,
      finalSpan: 7,
      startSpan: 7,
      dotRadius,
      alphaScale,
      falloffPower: 1,
    };
  }

  getWakeVisualModeLabel() {
    const settings = this.wakeVisualSettings ?? DEFAULT_WAKE_VISUAL_SETTINGS;
    if (settings.fullCircularWakesEnabled && settings.arcWakesEnabled) {
      return "full circles + emission lines";
    }
    if (settings.fullCircularWakesEnabled) {
      return "full circular";
    }
    if (settings.arcWakesEnabled) {
      return "arc wakes";
    }
    return "wakes hidden";
  }

  drawWakes(ctx, replayTime = this.getCurrentReplayTime()) {
    const drawArcWakes = this.wakeVisualSettings.arcWakesEnabled === true;
    const drawFullCircularWakes = this.wakeVisualSettings.fullCircularWakesEnabled === true;
    if (drawFullCircularWakes) {
      this.drawFullCircularWakes(ctx, replayTime);
    }
    if (!drawArcWakes || drawFullCircularWakes) {
      return;
    }
    const visibleWakeSeries = this.getVisibleWakeSeries(replayTime);
    visibleWakeSeries.forEach((link) => {
      this.drawWakeProgression(ctx, link, replayTime);
    });
  }

  drawForegroundWakeEmissionLines(ctx, replayTime = this.getCurrentReplayTime()) {
    const drawArcWakes = this.wakeVisualSettings.arcWakesEnabled === true;
    const drawFullCircularWakes = this.wakeVisualSettings.fullCircularWakesEnabled === true;
    if (!drawArcWakes || !drawFullCircularWakes) {
      return;
    }
    this.getVisibleWakeSeries(replayTime).forEach((link) => {
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
    const preset = this.getWakeVisualPreset();
    const wakeColor = mixColor(sphere.color, WHITE, 0.18);
    const alpha = (118 / 255) * preset.alphaScale * this.getCausalIsochronSphereVisualWeight(sphere);
    const dotRadius = Math.max(1.05, preset.dotRadius * 0.92);
    this.drawDottedArc(ctx, sphere.origin, sphere.radius, 0, 360, withAlpha(wakeColor, alpha), dotRadius);
  }

  getCausalIsochronSphereVisualWeight(sphere) {
    const age = Number(sphere?.age);
    const [pathStart, pathEnd] = this.getReplayTimeRange();
    const pathDuration = pathEnd - pathStart;
    if (!Number.isFinite(age) || !Number.isFinite(pathDuration) || pathDuration <= TIME_EPSILON) {
      return 1;
    }
    const preset = this.getWakeVisualPreset();
    const ageRatio = clamp(age / pathDuration, 0, 1);
    const distanceFalloff = Math.pow(1 - ageRatio * 0.72, preset.falloffPower);
    return 0.34 + 0.66 * distanceFalloff;
  }

  shouldDrawCausalIsochronSphere(sphere) {
    const radius = Number(sphere?.radius);
    if (!sphere?.origin || !Number.isFinite(radius) || radius <= TIME_EPSILON) {
      return false;
    }
    const center = this.worldToScreen(sphere.origin);
    const screenRadius = radius * this.viewport.scale;
    const margin = Math.max(4, (this.dataset?.preset?.dotRadius ?? 1.8) * this.viewport.scale * 3);
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

  drawWakeProgression(ctx, link, replayTime) {
    const timing = this.getWakeTiming(link, replayTime);
    if (!this.shouldDrawWakeSeries(timing)) {
      return;
    }
    const preset = this.getWakeVisualPreset();
    const radius = getDistance(timing.source, timing.receiver);
    const theta = getAngleDegrees(timing.source, timing.receiver);
    const falloffWeight = Math.pow(link.weight, preset.falloffPower);
    const visualWeight = this.getWakeVisualWeight(link);
    const frontProgresses = this.getWakeFrontProgresses(timing, link);

    this.drawWakeBuildProgression(ctx, link, {
      source: timing.source,
      radius,
      theta,
      falloffWeight,
      frontProgresses,
      visualWeight,
      preset,
    });
  }

  drawWakeEmissionLine(ctx, link, replayTime) {
    const timing = this.getWakeTiming(link, replayTime);
    if (!this.shouldDrawWakeSeries(timing)) {
      return;
    }
    const preset = this.getWakeVisualPreset();
    const visualWeight = this.getWakeVisualWeight(link);
    const falloffWeight = Math.pow(link.weight, preset.falloffPower);
    const wakeColor = mixColor(link.color, WHITE, visualWeight.desaturation);
    const alpha = Math.max(
      0.34,
      0.52 * preset.alphaScale * (0.5 + 0.5 * falloffWeight) * visualWeight.alphaScale,
    );
    const width = Math.max(1.5, preset.dotRadius * 1.18 * visualWeight.radiusScale);
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
    { source, radius, theta, falloffWeight, frontProgresses, visualWeight, preset, fullCircle = false },
  ) {
    const wakePreset = preset ?? this.getWakeVisualPreset();

    for (const progress of frontProgresses) {
      if (progress <= 0) {
        continue;
      }
      const bandRadius = radius * progress;
      const wakeSpan = fullCircle ? 360 : wakePreset.finalSpan;
      const emitterBias = 1 - progress;
      const alpha =
        ((84 + 124 * emitterBias) / 255) *
        (0.48 + 0.52 * falloffWeight) *
        wakePreset.alphaScale *
        visualWeight.alphaScale;
      const dotRadius =
        wakePreset.dotRadius *
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
    const points = this.dataset.paths[kind].map((point) => this.worldToScreen(point));
    this.drawSmoothLine(ctx, points, color, 5);
  }

  drawPathEndpointHandles(ctx) {
    ARCHITRINO_KINDS.forEach((kind) => {
      this.getPathEndpointHandles(kind).forEach((point) => {
        this.drawCircle(
          ctx,
          this.worldToScreen(point),
          PATH_ENDPOINT_HANDLE_RADIUS,
          withAlpha(WHITE, 0.12),
          withAlpha(WHITE, 0.92),
          1.5,
        );
      });
    });
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

  drawSandboxTransmissionGhost(ctx) {
    if (this.selectedItem?.type === "wake") {
      const link = this.getVisibleWakeSeries().find(
        (candidate) => candidate.id === this.selectedItem.linkId,
      );
      const endpoints = link ? this.getWakeEndpoints(link) : null;
      if (link && endpoints?.source) {
        this.drawTransmissionGhost(ctx, endpoints.source, link.sourceKind);
        return;
      }
    }
    const root = this.learnerState?.roots?.find(
      (candidate) => candidate.id === this.learnerState.selectedRootId,
    );
    if (root?.emission) {
      this.drawTransmissionGhost(ctx, root.emission, root.sourceId);
    }
  }

  drawTransmissionGhost(ctx, point, kind, {
    label = "transmitted here",
    emphasized = false,
  } = {}) {
    if (!point) {
      return;
    }
    const baseColor = kind === "electrino" ? ELECTRINO : POSITRINO;
    const screen = this.worldToScreen(point);
    this.drawCircle(
      ctx,
      screen,
      emphasized ? 19 : 16,
      withAlpha(baseColor, emphasized ? 0.16 : 0.1),
      withAlpha(WHITE, emphasized ? 0.64 : 0.42),
      1,
    );
    this.drawCircle(ctx, screen, 7, withAlpha(baseColor, emphasized ? 0.52 : 0.34));
    this.drawScreenText(
      ctx,
      label,
      { x: screen.x, y: screen.y - 27 * this.viewport.scale },
      12,
      withAlpha(WHITE, emphasized ? 0.82 : 0.62),
      "center",
      emphasized ? "bold" : "normal",
    );
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
    this.drawCircle(ctx, screen, 20, withAlpha(color, 0.12));
    this.drawCircle(ctx, screen, 9, color, WHITE, 1.4);
    const labelColor = kind === "electrino" ? ELECTRINO_LABEL : withAlpha(color, 0.9);
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
    this.setArchitrinoVelocityReferenceFromCondition(kind);
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

  applyArchitrinoSpeedFraction(fraction) {
    const speedFraction = Number(fraction);
    if (!Number.isFinite(speedFraction) || speedFraction <= 0) {
      return false;
    }
    let didEdit = false;
    ARCHITRINO_KINDS.forEach((kind) => {
      const condition = this.getInitialCondition(kind);
      if (!condition) {
        return;
      }
      const previousVelocity = {
        vx: Number(condition.vx) || 0,
        vy: Number(condition.vy) || 0,
      };
      const direction = this.getVelocityDirection(kind, condition);
      const referenceMagnitude = this.getArchitrinoVelocityReferenceMagnitude(kind, condition);
      const nextMagnitude = referenceMagnitude * speedFraction;
      const nextVelocity = {
        vx: direction.x * nextMagnitude,
        vy: direction.y * nextMagnitude,
      };
      if (
        Math.abs(previousVelocity.vx - nextVelocity.vx) <= TIME_EPSILON &&
        Math.abs(previousVelocity.vy - nextVelocity.vy) <= TIME_EPSILON
      ) {
        return;
      }
      condition.vx = nextVelocity.vx;
      condition.vy = nextVelocity.vy;
      this.applyInitialVelocityPreview(kind, condition, previousVelocity, nextVelocity);
      didEdit = true;
    });
    return didEdit;
  }

  resetArchitrinoVelocityReference() {
    this.architrinoVelocityReference = {};
    ARCHITRINO_KINDS.forEach((kind) => {
      this.setArchitrinoVelocityReferenceFromCondition(kind);
    });
  }

  setArchitrinoVelocityReferenceFromCondition(kind, fraction = this.getArchitrinoSpeedFraction()) {
    const condition = this.getInitialCondition(kind);
    if (!condition) {
      return;
    }
    const magnitude = Math.hypot(Number(condition.vx) || 0, Number(condition.vy) || 0);
    const speedFraction = Math.max(Number(fraction) || this.getArchitrinoSpeedFraction(), TIME_EPSILON);
    this.architrinoVelocityReference[kind] = magnitude / speedFraction;
  }

  getArchitrinoVelocityReferenceMagnitude(kind, condition) {
    const storedMagnitude = Number(this.architrinoVelocityReference?.[kind]);
    if (Number.isFinite(storedMagnitude) && storedMagnitude > 0) {
      return storedMagnitude;
    }
    this.setArchitrinoVelocityReferenceFromCondition(kind);
    const nextMagnitude = Number(this.architrinoVelocityReference?.[kind]);
    if (Number.isFinite(nextMagnitude) && nextMagnitude > 0) {
      return nextMagnitude;
    }
    return Math.hypot(Number(condition?.vx) || 0, Number(condition?.vy) || 0);
  }

  getVelocityDirection(kind, condition) {
    const vx = Number(condition?.vx) || 0;
    const vy = Number(condition?.vy) || 0;
    const magnitude = Math.hypot(vx, vy);
    if (magnitude > TIME_EPSILON) {
      return { x: vx / magnitude, y: vy / magnitude };
    }
    const points = this.dataset?.paths?.[kind] ?? [];
    const start = points[0];
    const next = points[1];
    const dx = Number(next?.x) - Number(start?.x);
    const dy = Number(next?.y) - Number(start?.y);
    const pathMagnitude = Math.hypot(dx, dy);
    if (pathMagnitude > TIME_EPSILON) {
      return { x: dx / pathMagnitude, y: dy / pathMagnitude };
    }
    return { x: 1, y: 0 };
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
    const pathPointSet = new Set(path);
    let didEdit = false;
    const applyDelta = (point, fallbackT = point?.t) => {
      if (!point || this.isPathEndpointPoint(kind, point, fallbackT)) {
        return;
      }
      const weight = this.getPathLineDragWeight(anchorT, fallbackT);
      if (weight <= 0) {
        return;
      }
      point.x += delta.x * weight;
      point.y += delta.y * weight;
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
      this.fairPathLineDrag(kind, anchorT);
    }
    const startPoint = this.getHistoryStartPoint(kind);
    if (startPoint) {
      this.syncInitialConditionToHistoryStart(kind, startPoint);
    }
    return didEdit;
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
    return amount * amount * (3 - 2 * amount);
  }

  fairPathLineDrag(kind, anchorT) {
    const path = this.dataset?.paths?.[kind];
    if (!Array.isArray(path) || path.length < 4) {
      return false;
    }
    const controls = this.getPathLineFairingControls(kind, path, anchorT);
    if (controls.length < 3) {
      return false;
    }
    path.forEach((point) => {
      const sampleT = Number(point?.t);
      if (!Number.isFinite(sampleT)) {
        return;
      }
      const smoothPoint = this.isPathEndpointTime(kind, sampleT)
        ? this.samplePathPoint(path, sampleT)
        : this.sampleSmoothControlPath(controls, sampleT, PATH_LINE_FAIRING_TANGENT_SCALE);
      point.t = sampleT;
      point.x = smoothPoint.x;
      point.y = smoothPoint.y;
    });
    this.syncPathDependentSamplesFromPath(kind);
    return true;
  }

  getPathLineFairingControls(kind, path, anchorT) {
    const controls = [];
    const addControl = (point, fallbackT = point?.t) => {
      const time = Number(fallbackT);
      const x = Number(point?.x);
      const y = Number(point?.y);
      if (!Number.isFinite(time) || !Number.isFinite(x) || !Number.isFinite(y)) {
        return;
      }
      const existingIndex = controls.findIndex((candidate) => Math.abs(candidate.t - time) <= TIME_EPSILON);
      const control = { t: time, x, y };
      if (existingIndex >= 0) {
        controls[existingIndex] = control;
        return;
      }
      controls.push(control);
    };

    const anchor = Number(anchorT);
    const shoulder = Number.isFinite(anchor)
      ? PATH_LINE_DRAG_FALLOFF_TIME * PATH_LINE_FAIRING_SHOULDER_FRACTION
      : 0;

    addControl(path[0]);
    addControl(path.at(-1));
    path.forEach((point, index) => {
      if (index % PATH_LINE_FAIRING_CONTROL_STRIDE === 0) {
        const time = Number(point?.t);
        if (Number.isFinite(anchor) && Number.isFinite(time) && Math.abs(time - anchor) < shoulder) {
          return;
        }
        addControl(point);
      }
    });
    (this.dataset?.history?.[kind] ?? []).forEach((point) => {
      const time = Number(point?.t);
      const isAnchor = Number.isFinite(anchor) && Number.isFinite(time) && Math.abs(time - anchor) <= TIME_EPSILON;
      if (Number.isFinite(anchor) && Number.isFinite(time) && Math.abs(time - anchor) < shoulder && !isAnchor) {
        return;
      }
      addControl(point);
    });

    if (Number.isFinite(anchor)) {
      addControl(this.samplePathPoint(path, anchor - shoulder), anchor - shoulder);
      addControl(this.samplePathPoint(path, anchor), anchor);
      addControl(this.samplePathPoint(path, anchor + shoulder), anchor + shoulder);
    }

    return controls.sort((left, right) => left.t - right.t);
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
    this.dataset.paths[kind] = sampleTimes.map((sampleT) => {
      const point = this.findPathSampleAtTime(path, sampleT) ?? { t: sampleT };
      const smoothPoint = this.sampleSmoothHistoryPath(history, sampleT);
      point.t = sampleT;
      point.x = smoothPoint.x;
      point.y = smoothPoint.y;
      return point;
    });
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

  getFixedSpeedReplayPathPoint(kind, t) {
    const points = this.dataset.paths[kind] ?? [];
    if (points.length < 2) {
      return this.getReplayPathPoint(kind, t);
    }
    const first = points[0];
    const last = points[points.length - 1];
    const startTime = Number(first.t);
    const endTime = Number(last.t);
    const span = endTime - startTime;
    if (!Number.isFinite(startTime) || !Number.isFinite(endTime) || !Number.isFinite(span) || span <= TIME_EPSILON) {
      return this.getReplayPathPoint(kind, t);
    }
    const sampleTime = clamp(Number(t) || 0, startTime, endTime);
    const { segmentLengths, totalLength } = this.getPathArcLengthTable(kind, points);
    if (!Number.isFinite(totalLength) || totalLength <= TIME_EPSILON) {
      return this.getReplayPathPoint(kind, t);
    }
    const targetLength = totalLength * clamp((sampleTime - startTime) / span, 0, 1);
    if (targetLength <= TIME_EPSILON) {
      return { ...first, t: sampleTime };
    }
    if (targetLength >= totalLength - TIME_EPSILON) {
      return { ...last, t: sampleTime };
    }
    let traveled = 0;
    for (let index = 1; index < points.length; index += 1) {
      const segmentLength = segmentLengths[index - 1];
      if (!Number.isFinite(segmentLength) || segmentLength <= TIME_EPSILON) {
        continue;
      }
      if (traveled + segmentLength < targetLength - TIME_EPSILON) {
        traveled += segmentLength;
        continue;
      }
      const left = points[index - 1];
      const right = points[index];
      const amount = clamp((targetLength - traveled) / segmentLength, 0, 1);
      return {
        t: sampleTime,
        x: left.x + (right.x - left.x) * amount,
        y: left.y + (right.y - left.y) * amount,
      };
    }
    return { ...last, t: sampleTime };
  }

  getPathArcLengthTable(kind, points = this.dataset.paths[kind] ?? []) {
    const cached = this.pathArcLengthCache.get(kind);
    if (cached?.datasetRevision === this.datasetRevision) {
      return cached;
    }
    const segmentLengths = [];
    let totalLength = 0;
    for (let index = 1; index < points.length; index += 1) {
      const segmentLength = getDistance(points[index - 1], points[index]);
      segmentLengths.push(segmentLength);
      if (Number.isFinite(segmentLength) && segmentLength > 0) {
        totalLength += segmentLength;
      }
    }
    const table = { datasetRevision: this.datasetRevision, segmentLengths, totalLength };
    this.pathArcLengthCache.set(kind, table);
    return table;
  }

  getCurrentReplayTime() {
    return this.getReplayTimeForElapsedSeconds(this.elapsedSeconds);
  }

  getReplayTimeForElapsedSeconds(elapsedSeconds) {
    const [start, end] = this.getReplayTimeRange();
    const phase = (elapsedSeconds % REPLAY_LOOP_SECONDS) / REPLAY_LOOP_SECONDS;
    return start + (end - start) * phase;
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
    const threshold = Number(this.dataset.assemblyThreshold ?? this.dataset.preset?.assemblyThreshold);
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

export const CAUSAL_DELAY_FEEDBACK_PRESETS = PRESETS;
export const CAUSAL_DELAY_FEEDBACK_CANVAS_COLORS = CANVAS_COLORS;
export const createMockCausalDelayReplay = createMockCausalDelayReplayDataset;
