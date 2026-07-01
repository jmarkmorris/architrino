import {
  CANVAS_COLORS,
  DEFAULT_CANVAS_ID,
  DEFAULT_PRESET_ID,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  DIRECT_MANIPULATION_DRAFT_PREVIEW,
  ELECTRINO,
  ELECTRINO_WAKE,
  FULL_CIRCULAR_ARCS,
  SPACE_AXIS_TOP_Y,
  TIME_AXIS_BASELINE_Y,
  TIME_AXIS_END_X,
  TIME_AXIS_ORIGIN_X,
  POSITRINO,
  POSITRINO_WAKE,
  PRESETS,
  REPRESENTATIVE_MOCK_SOLVER_REPLAY,
  TEMPORARY_MOCK_ADAPTER,
  WHITE,
  createMockCausalDelayReplayDataset,
  createTemporaryMockReplayAdapter,
  getAngleDegrees,
  getCanvasColorById,
  getDistance,
  getPresetById,
} from "./CausalDelayFeedbackReplayAdapter.js";

const ICON_HELP = Object.freeze({
  play: "Play replay",
  pause: "Pause replay",
});
const REPLAY_LOOP_SECONDS = 9;
const TIME_EPSILON = 1e-6;
const INITIAL_VELOCITY_ARROW_SCALE = 0.04;
const INITIAL_VELOCITY_PREVIEW_RESPONSE = 0.42;
const RETAINED_PATH_SPLINE_TANGENT_SCALE = 0.72;
const NOW_SLIDER_MAX = 1000;
const DEFAULT_ASSEMBLY_THRESHOLD = 0.00075;
const MIN_RETAINED_DEPTH_LIMIT = 2;
const RETAINED_DEPTH_LIMIT_OPTIONS = Object.freeze([2, 4, 8, 16, 32, 64]);
const FIELD_SPEED_MIN = 0.25;
const FIELD_SPEED_MAX = 2.5;
const DEFAULT_FIELD_SPEED_SCALE = 1;
const ARCHITRINO_KINDS = Object.freeze(["positrino", "electrino"]);
const ARCHITRINO_SPEED_FRACTIONS = Object.freeze([0.1, 0.3, 0.5, 0.7, 0.9, 0.99, 0.999, 0.9999, 0.99999, 0.999999]);
const DEFAULT_ARCHITRINO_SPEED_INDEX = 3;
const VIEWPORT_ZOOM_MIN = 1;
const VIEWPORT_ZOOM_MAX = 3;
const WHEEL_ZOOM_SENSITIVITY = 0.0015;
const WAKE_FRONT_CADENCE_TIME_DIVISIONS = 144;
const DEFAULT_LIVE_WAKE_FRONT_SPACING = 18;
const WIDE_LIVE_WAKE_FRONT_SPACING = 30;
const LIVE_WAKE_ROOT_SCAN_STEPS = 96;
const LIVE_WAKE_ROOT_REFINE_STEPS = 32;
const DEFAULT_LIVE_WAKE_SIGNAL_SPEED = 3000;
const PATH_LINE_HIT_RADIUS = 18;
const PATH_LINE_DRAG_FALLOFF_TIME = 0.32;
const CENTRAL_PAIR_INTERACTION_REPLAY_MODE = "pairInteraction";
const BOUNDARY_SEEDED_CONSTRAINT_PATH_STATUS = "boundary_seeded_constraint_path";
const DISCRETE_BOUNDARY_VALUE_CONVERGED_STATUS = "discrete_boundary_value_converged";
const PHYSICAL_BOUNDARY_SOLVER_PENDING_STATUS = "physical_boundary_solver_pending";
const DEFAULT_PATH_CONSTRAINT_BOUNDARY_RELAXATION_ITERATION_COUNT = 64;
const DEFAULT_PATH_CONSTRAINT_BOUNDARY_RELAXATION_TOLERANCE = 10;
const ADAPTIVE_PATH_CONSTRAINT_BOUNDARY_RELAXATION_ITERATION_COUNT = 256;
const ADAPTIVE_PATH_CONSTRAINT_BOUNDARY_RELAXATION_TOLERANCE = 1;
const WEAK_CONTRIBUTION_CUE_OFF = "off";
const WEAK_CONTRIBUTION_CUE_THRESHOLD_ONLY = "threshold_only";
const SELECTABLE_SCENE_PRESET_IDS = new Set(["accepted_tight_bright", "contrast_stress"]);
const WAKE_VISUAL_SWITCHES = Object.freeze({
  arcWakesEnabled: "arcWakesEnabled",
  fullCircularWakesEnabled: "fullCircularWakesEnabled",
  strongFalloffEnabled: "strongFalloffEnabled",
  wideArcsEnabled: "wideArcsEnabled",
  thinFrontsEnabled: "thinFrontsEnabled",
  brightFrontsEnabled: "brightFrontsEnabled",
  wideWakeFrontGapEnabled: "wideWakeFrontGapEnabled",
});
const DEFAULT_WAKE_VISUAL_SETTINGS = Object.freeze({
  arcWakesEnabled: true,
  fullCircularWakesEnabled: false,
  strongFalloffEnabled: false,
  wideArcsEnabled: false,
  thinFrontsEnabled: false,
  brightFrontsEnabled: false,
  wideWakeFrontGapEnabled: false,
});
const PATH_CONSTRAINT_DRAFT_REASONS = new Set([
  "retained_point_drag_preview",
  "path_line_drag_preview",
]);
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
    this.lastFrameTime = 0;
    this.elapsedSeconds = 0;
    this.reducedMotionEnabled = this.normalizeBooleanSetting(
      options.reducedMotionEnabled ?? this.prefersReducedMotion(),
    );
    this.backgroundDepthFieldEnabled = this.normalizeBooleanSetting(options.backgroundDepthFieldEnabled);
    this.weakContributionCueMode = this.normalizeWeakContributionCueMode(options.weakContributionCueMode);
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
    this.explicitBoundaryRelaxationIterationCount = Object.prototype.hasOwnProperty.call(
      this.replayRequestOptions,
      "pathConstraintBoundaryRelaxationIterationCount",
    );
    this.explicitBoundaryRelaxationTolerance = Object.prototype.hasOwnProperty.call(
      this.replayRequestOptions,
      "pathConstraintBoundaryRelaxationTolerance",
    );
    this.explicitBoundaryRelaxationStepTolerance = Object.prototype.hasOwnProperty.call(
      this.replayRequestOptions,
      "pathConstraintBoundaryRelaxationStepTolerance",
    );
    this.autoLoadReplay = options.autoLoadReplay !== false;
    this.replayLoadSequence = 0;
    this.replayLoadState = "idle";
    this.replayLoadError = null;
    this.dataset = this.createFallbackReplay(this.presetId);
    this.updateWakeLinkGeometry();
    this.resetArchitrinoVelocityReference();
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

    this.populatePresets();
    this.populateCanvasSwatches();
    this.updateSpeedControls();
    this.updateDisplaySettingControls();
    this.updateNowControl();
    this.updateReplayStatus();
    this.bindEvents();
    this.resize();
    this.render(0);
    this.start();
    if (this.autoLoadReplay) {
      void this.loadReplay();
    }
  }

  getDom() {
    return {
      app: queryRequiredElement(this.document, "#causal-delay-feedback-app"),
      canvas: queryRequiredElement(this.document, "#causal-delay-feedback-canvas"),
      preset: queryRequiredElement(this.document, "#causal-delay-feedback-preset"),
      playButton: queryRequiredElement(this.document, "#causal-delay-feedback-play"),
      pauseButton: queryRequiredElement(this.document, "#causal-delay-feedback-pause"),
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
      weakContributionCueInput: queryRequiredElement(this.document, "#causal-delay-feedback-weak-cue"),
      replayStatus: queryRequiredElement(this.document, "#causal-delay-feedback-replay-status"),
      readout: queryRequiredElement(this.document, "#causal-delay-feedback-readout"),
    };
  }

  populatePresets() {
    const selectablePresets = PRESETS.filter((preset) => (
      SELECTABLE_SCENE_PRESET_IDS.has(preset.id) || preset.id === this.presetId
    ));
    this.dom.preset.replaceChildren(
      ...selectablePresets.map((preset) => {
        const option = this.document.createElement("option");
        option.value = preset.id;
        option.textContent = preset.label;
        option.selected = preset.id === this.presetId;
        return option;
      }),
    );
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
      case "strong_falloff":
        settings.strongFalloffEnabled = true;
        break;
      case "slightly_wider":
        settings.wideArcsEnabled = true;
        break;
      case "thin_fronts":
        settings.thinFrontsEnabled = true;
        break;
      case "bright_fronts":
        settings.brightFrontsEnabled = true;
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
    this.window.addEventListener("resize", this.boundResize);
    this.boundKeyDown = (event) => this.handleKeyDown(event);
    this.document.addEventListener("keydown", this.boundKeyDown);

    this.dom.preset.addEventListener("change", () => {
      void this.setPreset(this.dom.preset.value);
    });
    this.dom.playButton.addEventListener("click", () => {
      this.setPlaying(true);
    });
    this.dom.pauseButton.addEventListener("click", () => {
      this.setPlaying(false);
    });
    this.dom.resetButton.addEventListener("click", () => {
      this.resetReplayTime();
    });
    this.dom.resetPresetButton.addEventListener("click", () => {
      void this.resetPreset();
    });
    this.dom.settingsButton.addEventListener("click", () => {
      this.toggleSettings();
    });
    this.dom.visualSwitches.addEventListener("click", (event) => {
      const button = event.target.closest("[data-visual-switch]");
      if (!button) {
        return;
      }
      this.toggleWakeVisualSwitch(button.dataset.visualSwitch);
    });
    this.dom.colorSwatches.addEventListener("click", (event) => {
      const button = event.target.closest("[data-color-id]");
      if (!button) {
        return;
      }
      this.setCanvasColor(button.dataset.colorId);
    });
    this.dom.nowInput.addEventListener("input", () => {
      this.setReplayNowSliderValue(this.dom.nowInput.value);
    });
    this.dom.cfSpeedInput.addEventListener("input", () => {
      this.setFieldSpeedScale(this.dom.cfSpeedInput.value);
    });
    this.dom.architrinoSpeedInput.addEventListener("input", () => {
      this.setArchitrinoSpeedIndex(this.dom.architrinoSpeedInput.value);
    });
    this.dom.architrinoSpeedInput.addEventListener("change", () => {
      void this.submitArchitrinoSpeedFraction();
    });
    this.dom.settingsPanel.addEventListener("click", (event) => {
      const button = event.target.closest("[data-architrino-speed-step]");
      if (!button) {
        return;
      }
      void this.stepArchitrinoSpeedIndex(Number(button.dataset.architrinoSpeedStep));
    });
    this.dom.weakContributionCueInput.addEventListener("change", () => {
      this.setWeakContributionCueMode(this.dom.weakContributionCueInput.value);
    });
    this.dom.canvas.addEventListener("pointermove", (event) => {
      this.handleCanvasPointerMove(event);
    });
    this.dom.canvas.addEventListener("pointerdown", (event) => {
      this.handleCanvasPointerDown(event);
    });
    this.dom.canvas.addEventListener(
      "wheel",
      (event) => {
        this.handleCanvasWheel(event);
      },
      { passive: false },
    );
    this.window.addEventListener("pointerup", (event) => {
      void this.finishDrag(event);
    });
    this.window.addEventListener("pointercancel", (event) => {
      void this.finishDrag(event);
    });
    this.document.addEventListener("pointerdown", (event) => {
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
    preserveDraftOnFailure = false,
  } = {}) {
    const sequence = ++this.replayLoadSequence;
    const adapter = this.replayAdapter;
    this.replayLoadState = "loading";
    this.replayLoadError = null;
    this.updateReplayStatus();

    if (this.shouldUseRepresentativeReplayOnly(presetId)) {
      const dataset = this.createFallbackReplay(presetId);
      if (sequence !== this.replayLoadSequence) {
        return this.dataset;
      }
      this.applyReplayDataset(dataset, { loadState: "ready" });
      this.elapsedSeconds = 0;
      this.selectedItem = null;
      this.dragState = null;
      this.refreshAfterReplayDatasetChange();
      return this.dataset;
    }

    try {
      let dataset = await this.createReplayDataset(adapter, presetId, requestOptions);
      if (sequence !== this.replayLoadSequence) {
        return this.dataset;
      }
      const firstDataset = dataset;
      const adaptiveRequestOptions = this.createAdaptivePathConstraintBoundaryRequestOptions(firstDataset, requestOptions);
      if (adaptiveRequestOptions) {
        try {
          const retryDataset = await this.createReplayDataset(adapter, presetId, adaptiveRequestOptions);
          if (this.isAdaptivePathConstraintBoundaryRetryBetter(firstDataset, retryDataset)) {
            dataset = retryDataset;
            this.annotateAdaptivePathConstraintBoundaryRetry(dataset, firstDataset, requestOptions, adaptiveRequestOptions);
          } else {
            this.annotateRejectedAdaptivePathConstraintBoundaryRetry(
              dataset,
              retryDataset,
              requestOptions,
              adaptiveRequestOptions,
            );
          }
        } catch {
          // Keep the first solver dataset if the stronger retry fails.
        }
        if (sequence !== this.replayLoadSequence) {
          return this.dataset;
        }
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
      if (preserveDraftOnFailure && this.dataset?.datasetSource === DIRECT_MANIPULATION_DRAFT_PREVIEW) {
        this.markDraftSolverRejection(error);
        this.refreshAfterReplayDatasetChange();
        return this.dataset;
      }
      this.applyReplayDataset(this.createFallbackReplay(presetId), { loadState: "fallback" });
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
    this.replayLoadState = loadState;
    this.retainedDepthLimit = this.normalizeRetainedDepthLimit(this.retainedDepthLimit);
    this.applyDatasetCanvasColor(dataset);
    this.updateWakeLinkGeometry();
    this.resetArchitrinoVelocityReference();
    this.syncReplayRequestOptionsFromDataset();
    if (this.dom?.preset) {
      this.dom.preset.value = this.presetId;
    }
    this.updateSpeedControls();
    this.updateReplayStatus();
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
    this.applyPathConstraintBoundaryDefaults(requestOptions);
    this.replayRequestOptions = requestOptions;
  }

  applyPathConstraintBoundaryDefaults(requestOptions) {
    const usesPathConstraints = this.usesPathConstraintDraft(this.dataset?.draftPreview);
    if (!this.explicitBoundaryRelaxationIterationCount) {
      if (usesPathConstraints) {
        requestOptions.pathConstraintBoundaryRelaxationIterationCount =
          DEFAULT_PATH_CONSTRAINT_BOUNDARY_RELAXATION_ITERATION_COUNT;
      } else {
        delete requestOptions.pathConstraintBoundaryRelaxationIterationCount;
      }
    }
    if (!this.explicitBoundaryRelaxationTolerance) {
      if (usesPathConstraints) {
        requestOptions.pathConstraintBoundaryRelaxationTolerance =
          DEFAULT_PATH_CONSTRAINT_BOUNDARY_RELAXATION_TOLERANCE;
      } else {
        delete requestOptions.pathConstraintBoundaryRelaxationTolerance;
      }
    }
  }

  usesPathConstraintDraft(draftPreview) {
    return PATH_CONSTRAINT_DRAFT_REASONS.has(String(draftPreview?.reason ?? ""));
  }

  createAdaptivePathConstraintBoundaryRequestOptions(dataset, requestOptions) {
    if (!this.usesPathConstraintDraft(requestOptions?.replayDataset?.draftPreview)) {
      return null;
    }
    if (this.hasExplicitBoundaryRelaxationSettings(requestOptions)) {
      return null;
    }
    const requestedIterationCount = Number(requestOptions?.pathConstraintBoundaryRelaxationIterationCount);
    if (
      Number.isFinite(requestedIterationCount) &&
      requestedIterationCount >= ADAPTIVE_PATH_CONSTRAINT_BOUNDARY_RELAXATION_ITERATION_COUNT
    ) {
      return null;
    }
    if (!this.needsAdaptivePathConstraintBoundaryRetry(dataset)) {
      return null;
    }
    return {
      ...requestOptions,
      pathConstraintBoundaryRelaxationIterationCount:
        ADAPTIVE_PATH_CONSTRAINT_BOUNDARY_RELAXATION_ITERATION_COUNT,
      pathConstraintBoundaryRelaxationTolerance:
        ADAPTIVE_PATH_CONSTRAINT_BOUNDARY_RELAXATION_TOLERANCE,
    };
  }

  hasExplicitBoundaryRelaxationSettings(requestOptions = this.replayRequestOptions) {
    const hasIterationOverride =
      Object.prototype.hasOwnProperty.call(requestOptions ?? {}, "pathConstraintBoundaryRelaxationIterationCount") &&
      requestOptions?.pathConstraintBoundaryRelaxationIterationCount !==
        DEFAULT_PATH_CONSTRAINT_BOUNDARY_RELAXATION_ITERATION_COUNT;
    const hasToleranceOverride =
      Object.prototype.hasOwnProperty.call(requestOptions ?? {}, "pathConstraintBoundaryRelaxationTolerance") &&
      requestOptions?.pathConstraintBoundaryRelaxationTolerance !==
        DEFAULT_PATH_CONSTRAINT_BOUNDARY_RELAXATION_TOLERANCE;
    const hasStepToleranceOverride =
      Object.prototype.hasOwnProperty.call(requestOptions ?? {}, "pathConstraintBoundaryRelaxationStepTolerance");
    return (
      this.explicitBoundaryRelaxationIterationCount ||
      this.explicitBoundaryRelaxationTolerance ||
      this.explicitBoundaryRelaxationStepTolerance ||
      hasIterationOverride ||
      hasToleranceOverride ||
      hasStepToleranceOverride
    );
  }

  needsAdaptivePathConstraintBoundaryRetry(dataset) {
    const solverStatus = this.getDatasetPathConstraintSolverStatus(dataset);
    if (solverStatus !== DISCRETE_BOUNDARY_VALUE_CONVERGED_STATUS) {
      return true;
    }
    const residualAfter = this.getDatasetBoundaryRelaxationResidualAfter(dataset);
    return (
      !Number.isFinite(residualAfter) ||
      residualAfter > ADAPTIVE_PATH_CONSTRAINT_BOUNDARY_RELAXATION_TOLERANCE
    );
  }

  isAdaptivePathConstraintBoundaryRetryBetter(firstDataset, retryDataset) {
    if (!retryDataset || typeof retryDataset !== "object") {
      return false;
    }
    const firstRank = this.getDatasetPathConstraintBoundaryRank(firstDataset);
    const retryRank = this.getDatasetPathConstraintBoundaryRank(retryDataset);
    if (retryRank > firstRank) {
      return true;
    }
    if (retryRank < firstRank) {
      return false;
    }

    const firstResidualAfter = this.getDatasetBoundaryRelaxationResidualAfter(firstDataset);
    const retryResidualAfter = this.getDatasetBoundaryRelaxationResidualAfter(retryDataset);
    if (Number.isFinite(retryResidualAfter) && !Number.isFinite(firstResidualAfter)) {
      return true;
    }
    if (!Number.isFinite(retryResidualAfter) && Number.isFinite(firstResidualAfter)) {
      return false;
    }
    if (Number.isFinite(firstResidualAfter) && Number.isFinite(retryResidualAfter)) {
      if (retryResidualAfter < firstResidualAfter) {
        return true;
      }
      if (retryResidualAfter > firstResidualAfter) {
        return false;
      }
    }

    const firstResidualRatio = this.getDatasetBoundaryRelaxationResidualRatio(firstDataset);
    const retryResidualRatio = this.getDatasetBoundaryRelaxationResidualRatio(retryDataset);
    if (Number.isFinite(retryResidualRatio) && !Number.isFinite(firstResidualRatio)) {
      return true;
    }
    if (!Number.isFinite(retryResidualRatio) && Number.isFinite(firstResidualRatio)) {
      return false;
    }
    return Number.isFinite(firstResidualRatio) && Number.isFinite(retryResidualRatio)
      ? retryResidualRatio < firstResidualRatio
      : false;
  }

  getDatasetPathConstraintBoundaryRank(dataset) {
    const solverStatus = this.getDatasetPathConstraintSolverStatus(dataset);
    if (solverStatus === DISCRETE_BOUNDARY_VALUE_CONVERGED_STATUS) {
      return 2;
    }
    return solverStatus ? 1 : 0;
  }

  getDatasetPathConstraintSolverStatus(dataset) {
    return dataset?.pathConstraintSolverStatus ?? dataset?.solverSummary?.pathConstraintSolverStatus;
  }

  getDatasetBoundaryRelaxationResidualAfter(dataset) {
    return Number(
      dataset?.maxPathConstraintBoundaryRelaxationResidualAfter ??
        dataset?.solverSummary?.maxPathConstraintBoundaryRelaxationResidualAfter,
    );
  }

  getDatasetBoundaryRelaxationResidualRatio(dataset) {
    return Number(
      dataset?.pathConstraintBoundaryRelaxationResidualRatio ??
        dataset?.solverSummary?.pathConstraintBoundaryRelaxationResidualRatio,
    );
  }

  annotateAdaptivePathConstraintBoundaryRetry(dataset, firstDataset, firstRequestOptions, retryRequestOptions) {
    if (!dataset || typeof dataset !== "object") {
      return;
    }
    const metadata = {
      pathConstraintBoundaryRelaxationAdaptiveRetry: true,
      pathConstraintBoundaryRelaxationRetryCount: 1,
      pathConstraintBoundaryRelaxationInitialIterationCount: Number(
        firstRequestOptions?.pathConstraintBoundaryRelaxationIterationCount,
      ),
      pathConstraintBoundaryRelaxationInitialTolerance: Number(
        firstRequestOptions?.pathConstraintBoundaryRelaxationTolerance,
      ),
      maxPathConstraintBoundaryRelaxationResidualAfterInitialAttempt: Number(
        firstDataset?.maxPathConstraintBoundaryRelaxationResidualAfter ??
          firstDataset?.solverSummary?.maxPathConstraintBoundaryRelaxationResidualAfter,
      ),
      pathConstraintBoundaryRelaxationResidualRatioInitialAttempt: Number(
        firstDataset?.pathConstraintBoundaryRelaxationResidualRatio ??
          firstDataset?.solverSummary?.pathConstraintBoundaryRelaxationResidualRatio,
      ),
      pathConstraintBoundaryRelaxationRetryIterationCount: Number(
        retryRequestOptions?.pathConstraintBoundaryRelaxationIterationCount,
      ),
      pathConstraintBoundaryRelaxationRetryTolerance: Number(
        retryRequestOptions?.pathConstraintBoundaryRelaxationTolerance,
      ),
    };
    Object.assign(dataset, metadata);
    if (dataset.solverSummary && typeof dataset.solverSummary === "object") {
      Object.assign(dataset.solverSummary, metadata);
    }
  }

  annotateRejectedAdaptivePathConstraintBoundaryRetry(
    dataset,
    rejectedDataset,
    firstRequestOptions,
    retryRequestOptions,
  ) {
    if (!dataset || typeof dataset !== "object") {
      return;
    }
    const metadata = {
      pathConstraintBoundaryRelaxationAdaptiveRetryRejected: true,
      pathConstraintBoundaryRelaxationRetryCount: 1,
      pathConstraintBoundaryRelaxationInitialIterationCount: Number(
        firstRequestOptions?.pathConstraintBoundaryRelaxationIterationCount,
      ),
      pathConstraintBoundaryRelaxationInitialTolerance: Number(
        firstRequestOptions?.pathConstraintBoundaryRelaxationTolerance,
      ),
      maxPathConstraintBoundaryRelaxationResidualAfterInitialAttempt:
        this.getDatasetBoundaryRelaxationResidualAfter(dataset),
      pathConstraintBoundaryRelaxationResidualRatioInitialAttempt:
        this.getDatasetBoundaryRelaxationResidualRatio(dataset),
      pathConstraintBoundaryRelaxationRejectedRetryIterationCount: Number(
        retryRequestOptions?.pathConstraintBoundaryRelaxationIterationCount,
      ),
      pathConstraintBoundaryRelaxationRejectedRetryTolerance: Number(
        retryRequestOptions?.pathConstraintBoundaryRelaxationTolerance,
      ),
      maxPathConstraintBoundaryRelaxationResidualAfterRejectedRetry:
        this.getDatasetBoundaryRelaxationResidualAfter(rejectedDataset),
      pathConstraintBoundaryRelaxationResidualRatioRejectedRetry:
        this.getDatasetBoundaryRelaxationResidualRatio(rejectedDataset),
      pathConstraintSolverStatusRejectedRetry: this.getDatasetPathConstraintSolverStatus(rejectedDataset),
    };
    Object.assign(dataset, metadata);
    if (dataset.solverSummary && typeof dataset.solverSummary === "object") {
      Object.assign(dataset.solverSummary, metadata);
    }
  }

  refreshAfterReplayDatasetChange() {
    this.updateNowControl();
    this.updateReplayStatus();
    if (this.dom?.readout) {
      this.updateReadout();
    }
    if (this.context) {
      this.render();
    }
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
    if (this.replayLoadState === "draft-rejected") {
      const errorMessage = this.getDraftSolverRejectionMessage();
      return {
        state: "draft-rejected",
        label: "solver rejected edit",
        help: errorMessage
          ? `Showing the edited draft because the solver bridge could not recompute it: ${errorMessage}`
          : "Showing the edited draft because the solver bridge could not recompute it.",
      };
    }
    if (
      this.replayLoadState === "draft" ||
      this.dataset?.datasetSource === DIRECT_MANIPULATION_DRAFT_PREVIEW
    ) {
      return {
        state: "draft",
        label: "draft preview",
        help: "Showing an edited canvas preview that has not been recomputed by the solver.",
      };
    }
    if (this.dataset?.solverIntegrationPath && this.dataset.solverIntegrationPath !== TEMPORARY_MOCK_ADAPTER) {
      if (this.dataset?.solverReplayMode === CENTRAL_PAIR_INTERACTION_REPLAY_MODE) {
        const stepCount = Number(this.dataset?.pairInteractionStepCount ?? this.dataset?.solverSummary?.pairInteractionStepCount);
        const interactionLaw = this.dataset?.interactionLaw ?? this.dataset?.solverSummary?.interactionLaw;
        const executionPath = this.dataset?.executionPath ?? this.dataset?.solverSummary?.executionPath;
        const maxConstraintResidual = Number(
          this.dataset?.maxPathConstraintResidual ?? this.dataset?.solverSummary?.maxPathConstraintResidual
        );
        const guidanceSampleCount = Number(
          this.dataset?.pathConstraintGuidanceSampleCount ??
            this.dataset?.solverSummary?.pathConstraintGuidanceSampleCount
        );
        const guidanceMode =
          this.dataset?.pathConstraintGuidanceMode ??
          this.dataset?.solverSummary?.pathConstraintGuidanceMode;
        const boundaryMode =
          this.dataset?.pathConstraintBoundaryMode ??
          this.dataset?.solverSummary?.pathConstraintBoundaryMode;
        const boundarySeedMode =
          this.dataset?.pathConstraintBoundarySeedMode ??
          this.dataset?.solverSummary?.pathConstraintBoundarySeedMode;
        const boundarySeedSampleCount = Number(
          this.dataset?.pathConstraintBoundarySeedSampleCount ??
            this.dataset?.solverSummary?.pathConstraintBoundarySeedSampleCount
        );
        const boundaryRelaxationMode =
          this.dataset?.pathConstraintBoundaryRelaxationMode ??
          this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationMode;
        const boundaryRelaxationIterationCount = Number(
          this.dataset?.pathConstraintBoundaryRelaxationIterationCount ??
            this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationIterationCount
        );
        const boundaryRelaxationAppliedIterationCount = Number(
          this.dataset?.pathConstraintBoundaryRelaxationAppliedIterationCount ??
            this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationAppliedIterationCount
        );
        const boundaryRelaxationStopReason =
          this.dataset?.pathConstraintBoundaryRelaxationStopReason ??
          this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationStopReason;
        const boundaryRelaxationTolerance = Number(
          this.dataset?.pathConstraintBoundaryRelaxationTolerance ??
            this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationTolerance
        );
        const boundaryRelaxationStepTolerance = Number(
          this.dataset?.pathConstraintBoundaryRelaxationStepTolerance ??
            this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationStepTolerance
        );
        const boundaryRelaxationStatus =
          this.dataset?.pathConstraintBoundaryRelaxationStatus ??
          this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationStatus;
        const boundaryRelaxationResidualEvidenceStatus =
          this.dataset?.pathConstraintBoundaryRelaxationResidualEvidenceStatus ??
          this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationResidualEvidenceStatus;
        const boundaryRelaxationResidualMode =
          this.dataset?.pathConstraintBoundaryRelaxationResidualMode ??
          this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationResidualMode;
        const boundaryRelaxationResidualRatio = Number(
          this.dataset?.pathConstraintBoundaryRelaxationResidualRatio ??
            this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationResidualRatio
        );
        const boundaryRelaxationRmsResidualRatio = Number(
          this.dataset?.rmsPathConstraintBoundaryRelaxationResidualRatio ??
            this.dataset?.solverSummary?.rmsPathConstraintBoundaryRelaxationResidualRatio
        );
        const boundaryRelaxationResidualSettlingRate = Number(
          this.dataset?.pathConstraintBoundaryRelaxationResidualSettlingRate ??
            this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationResidualSettlingRate
        );
        const boundaryRelaxationRmsResidualSettlingRate = Number(
          this.dataset?.rmsPathConstraintBoundaryRelaxationResidualSettlingRate ??
            this.dataset?.solverSummary?.rmsPathConstraintBoundaryRelaxationResidualSettlingRate
        );
        const boundaryRelaxationRmsResidualAfter = Number(
          this.dataset?.rmsPathConstraintBoundaryRelaxationResidualAfter ??
            this.dataset?.solverSummary?.rmsPathConstraintBoundaryRelaxationResidualAfter
        );
        const boundaryRelaxationMaxStep = Number(
          this.dataset?.pathConstraintBoundaryRelaxationMaxStep ??
            this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationMaxStep
        );
        const boundaryRelaxationFinalStepFactor = Number(
          this.dataset?.pathConstraintBoundaryRelaxationFinalStepFactor ??
            this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationFinalStepFactor
        );
        const boundaryRelaxationSelectedCandidateKind =
          this.dataset?.pathConstraintBoundaryRelaxationSelectedCandidateKind ??
          this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationSelectedCandidateKind;
        const boundaryRelaxationCenterOfMassSelectedCount = Number(
          this.dataset?.pathConstraintBoundaryRelaxationCenterOfMassSelectedCount ??
            this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationCenterOfMassSelectedCount
        );
        const boundaryRelaxationCandidateVariantCount = Number(
          this.dataset?.pathConstraintBoundaryRelaxationCandidateVariantCount ??
            this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationCandidateVariantCount
        );
        const boundaryRelaxationLineSearchTrialCount = Number(
          this.dataset?.pathConstraintBoundaryRelaxationLineSearchTrialCount ??
            this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationLineSearchTrialCount
        );
        const boundaryRelaxationCandidateKindMask = Number(
          this.dataset?.pathConstraintBoundaryRelaxationCandidateKindMask ??
            this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationCandidateKindMask
        );
        const boundaryRelaxationAdaptiveRetry = Boolean(
          this.dataset?.pathConstraintBoundaryRelaxationAdaptiveRetry ??
            this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationAdaptiveRetry
        );
        const boundaryRelaxationAdaptiveRetryRejected = Boolean(
          this.dataset?.pathConstraintBoundaryRelaxationAdaptiveRetryRejected ??
            this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationAdaptiveRetryRejected
        );
        const boundaryRelaxationInitialIterationCount = Number(
          this.dataset?.pathConstraintBoundaryRelaxationInitialIterationCount ??
            this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationInitialIterationCount
        );
        const boundaryRelaxationInitialTolerance = Number(
          this.dataset?.pathConstraintBoundaryRelaxationInitialTolerance ??
            this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationInitialTolerance
        );
        const boundaryRelaxationInitialResidualAfter = Number(
          this.dataset?.maxPathConstraintBoundaryRelaxationResidualAfterInitialAttempt ??
            this.dataset?.solverSummary?.maxPathConstraintBoundaryRelaxationResidualAfterInitialAttempt
        );
        const boundaryRelaxationRejectedRetryIterationCount = Number(
          this.dataset?.pathConstraintBoundaryRelaxationRejectedRetryIterationCount ??
            this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationRejectedRetryIterationCount
        );
        const boundaryRelaxationRejectedRetryTolerance = Number(
          this.dataset?.pathConstraintBoundaryRelaxationRejectedRetryTolerance ??
            this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationRejectedRetryTolerance
        );
        const boundaryRelaxationRejectedRetryResidualAfter = Number(
          this.dataset?.maxPathConstraintBoundaryRelaxationResidualAfterRejectedRetry ??
            this.dataset?.solverSummary?.maxPathConstraintBoundaryRelaxationResidualAfterRejectedRetry
        );
        const constraintSolverStatus =
          this.dataset?.pathConstraintSolverStatus ??
          this.dataset?.solverSummary?.pathConstraintSolverStatus;
        const constraintSolverClaim =
          this.dataset?.pathConstraintSolverClaim ??
          this.dataset?.solverSummary?.pathConstraintSolverClaim;
        const physicalBoundarySolverStatus =
          this.dataset?.pathConstraintPhysicalBoundarySolverStatus ??
          this.dataset?.solverSummary?.pathConstraintPhysicalBoundarySolverStatus;
        const physicalBoundarySolverClaim =
          this.dataset?.pathConstraintPhysicalBoundarySolverClaim ??
          this.dataset?.solverSummary?.pathConstraintPhysicalBoundarySolverClaim;
        const physicalBoundarySolverBlockingReason =
          this.dataset?.pathConstraintPhysicalBoundarySolverBlockingReason ??
          this.dataset?.solverSummary?.pathConstraintPhysicalBoundarySolverBlockingReason;
        const maxGuidanceAcceleration = Number(
          this.dataset?.maxPathConstraintGuidanceAcceleration ??
            this.dataset?.solverSummary?.maxPathConstraintGuidanceAcceleration
        );
        const guidanceAccelerationStatus =
          this.dataset?.pathConstraintGuidanceAccelerationStatus ??
          this.dataset?.solverSummary?.pathConstraintGuidanceAccelerationStatus;
        const guidanceAccelerationTolerance = Number(
          this.dataset?.pathConstraintGuidanceAccelerationTolerance ??
            this.dataset?.solverSummary?.pathConstraintGuidanceAccelerationTolerance
        );
        const boundarySampleCount = Number(
          this.dataset?.pathConstraintBoundaryResidualSampleCount ??
            this.dataset?.solverSummary?.pathConstraintBoundaryResidualSampleCount
        );
        const boundaryStatus =
          this.dataset?.pathConstraintBoundaryResidualStatus ??
          this.dataset?.solverSummary?.pathConstraintBoundaryResidualStatus;
        const boundaryTolerance = Number(
          this.dataset?.pathConstraintBoundaryResidualTolerance ??
            this.dataset?.solverSummary?.pathConstraintBoundaryResidualTolerance
        );
        const maxBoundaryResidual = Number(
          this.dataset?.maxPathConstraintBoundaryResidual ??
            this.dataset?.solverSummary?.maxPathConstraintBoundaryResidual
        );
        const positionResidualSampleCount = Number(
          this.dataset?.pathConstraintPositionResidualSampleCount ??
            this.dataset?.solverSummary?.pathConstraintPositionResidualSampleCount
        );
        const positionResidualStatus =
          this.dataset?.pathConstraintPositionResidualStatus ??
          this.dataset?.solverSummary?.pathConstraintPositionResidualStatus;
        const positionResidualTolerance = Number(
          this.dataset?.pathConstraintPositionResidualTolerance ??
            this.dataset?.solverSummary?.pathConstraintPositionResidualTolerance
        );
        const maxPositionResidual = Number(
          this.dataset?.maxPathConstraintPositionResidual ??
            this.dataset?.solverSummary?.maxPathConstraintPositionResidual
        );
        const initialVelocityResidualSampleCount = Number(
          this.dataset?.pathConstraintInitialVelocityResidualSampleCount ??
            this.dataset?.solverSummary?.pathConstraintInitialVelocityResidualSampleCount
        );
        const initialVelocityResidualStatus =
          this.dataset?.pathConstraintInitialVelocityResidualStatus ??
          this.dataset?.solverSummary?.pathConstraintInitialVelocityResidualStatus;
        const initialVelocityResidualTolerance = Number(
          this.dataset?.pathConstraintInitialVelocityResidualTolerance ??
            this.dataset?.solverSummary?.pathConstraintInitialVelocityResidualTolerance
        );
        const maxInitialVelocityResidual = Number(
          this.dataset?.maxPathConstraintInitialVelocityResidual ??
            this.dataset?.solverSummary?.maxPathConstraintInitialVelocityResidual
        );
        const frameRefinementSampleCount = Number(
          this.dataset?.pathConstraintFrameRefinementSampleCount ??
            this.dataset?.solverSummary?.pathConstraintFrameRefinementSampleCount
        );
        const stepDetail = Number.isFinite(stepCount) ? ` steps=${stepCount}` : "";
        const frameRefinementDetail =
          Number.isFinite(frameRefinementSampleCount) && frameRefinementSampleCount > 0
            ? ` refined=${frameRefinementSampleCount}`
            : "";
        const lawDetail = interactionLaw ? ` law=${interactionLaw}` : "";
        const pathDetail = executionPath ? ` path=${executionPath}` : "";
        const residualDetail = Number.isFinite(maxConstraintResidual)
          ? ` residual=${formatCompactNumber(maxConstraintResidual)}`
          : "";
        const isDiscreteBoundaryConverged =
          constraintSolverStatus === DISCRETE_BOUNDARY_VALUE_CONVERGED_STATUS;
        const isBoundarySeededConstraint =
          constraintSolverStatus === BOUNDARY_SEEDED_CONSTRAINT_PATH_STATUS;
        const effectiveBoundaryStatus =
          boundaryStatus || (isDiscreteBoundaryConverged ? "unchecked" : "");
        const effectivePositionResidualStatus =
          positionResidualStatus || (isDiscreteBoundaryConverged ? "unchecked" : "");
        const boundaryDetail =
          Number.isFinite(boundarySampleCount) && boundarySampleCount > 0
            ? ` boundary=${boundarySampleCount}${
                Number.isFinite(maxBoundaryResidual) ? ` maxB=${formatCompactNumber(maxBoundaryResidual)}` : ""
              }${
                Number.isFinite(boundaryTolerance) ? ` tolB=${formatCompactNumber(boundaryTolerance)}` : ""
              }`
            : "";
        const positionResidualDetail =
          Number.isFinite(positionResidualSampleCount) && positionResidualSampleCount > 0
            ? ` posRows=${positionResidualSampleCount}${
                Number.isFinite(maxPositionResidual) ? ` posErr=${formatCompactNumber(maxPositionResidual)}` : ""
              }${
                Number.isFinite(positionResidualTolerance)
                  ? ` posTol=${formatCompactNumber(positionResidualTolerance)}`
                  : ""
              }`
            : "";
        const positionResidualStatusDetail =
          effectivePositionResidualStatus &&
            (effectivePositionResidualStatus !== "unchecked" || isDiscreteBoundaryConverged)
            ? ` posStatus=${formatCompactLabel(effectivePositionResidualStatus)}`
            : "";
        const initialVelocityResidualDetail =
          Number.isFinite(initialVelocityResidualSampleCount) &&
          initialVelocityResidualSampleCount > 0
            ? ` initVelRows=${initialVelocityResidualSampleCount}${
                Number.isFinite(maxInitialVelocityResidual)
                  ? ` initVelErr=${formatCompactNumber(maxInitialVelocityResidual)}`
                  : ""
              }${
                Number.isFinite(initialVelocityResidualTolerance)
                  ? ` initVelTol=${formatCompactNumber(initialVelocityResidualTolerance)}`
                  : ""
              }${
                initialVelocityResidualStatus && initialVelocityResidualStatus !== "unchecked"
                  ? ` initVelStatus=${formatCompactLabel(initialVelocityResidualStatus)}`
                  : ""
              }`
            : "";
        const boundaryStatusDetail =
          effectiveBoundaryStatus && (effectiveBoundaryStatus !== "unchecked" || isDiscreteBoundaryConverged)
            ? ` bStatus=${formatCompactLabel(effectiveBoundaryStatus)}`
            : "";
        const boundaryModeDetail = boundaryMode ? ` bMode=${formatCompactLabel(boundaryMode)}` : "";
        const boundarySeedDetail =
          boundarySeedMode || (Number.isFinite(boundarySeedSampleCount) && boundarySeedSampleCount > 0)
            ? ` seed=${boundarySeedMode ? formatCompactLabel(boundarySeedMode) : "boundary"}${
                Number.isFinite(boundarySeedSampleCount) && boundarySeedSampleCount > 0
                  ? ` seedRows=${boundarySeedSampleCount}`
                  : ""
              }`
            : "";
        const boundaryRelaxationDetail = boundaryRelaxationMode
            ? ` relax=${formatCompactLabel(boundaryRelaxationMode)}${
              Number.isFinite(boundaryRelaxationIterationCount)
                ? ` relaxIter=${boundaryRelaxationIterationCount}`
                : ""
            }${
              Number.isFinite(boundaryRelaxationAppliedIterationCount)
                ? ` relaxApplied=${boundaryRelaxationAppliedIterationCount}`
                : ""
            }${
              boundaryRelaxationStopReason
                ? ` relaxStop=${formatCompactLabel(boundaryRelaxationStopReason)}`
                : ""
            }${
              Number.isFinite(boundaryRelaxationTolerance)
                ? ` relaxTol=${formatCompactNumber(boundaryRelaxationTolerance)}`
                : ""
            }${
              Number.isFinite(boundaryRelaxationStepTolerance)
                ? ` relaxStepTol=${formatCompactNumber(boundaryRelaxationStepTolerance)}`
                : ""
            }${
              Number.isFinite(boundaryRelaxationResidualRatio)
                ? ` relaxRatio=${formatCompactNumber(boundaryRelaxationResidualRatio)}`
                : ""
            }${
              Number.isFinite(boundaryRelaxationRmsResidualRatio)
                ? ` relaxRmsRatio=${formatCompactNumber(boundaryRelaxationRmsResidualRatio)}`
                : ""
            }${
              Number.isFinite(boundaryRelaxationResidualSettlingRate)
                ? ` relaxRate=${formatCompactNumber(boundaryRelaxationResidualSettlingRate)}`
                : ""
            }${
              Number.isFinite(boundaryRelaxationRmsResidualSettlingRate)
                ? ` relaxRmsRate=${formatCompactNumber(boundaryRelaxationRmsResidualSettlingRate)}`
                : ""
            }${
              Number.isFinite(boundaryRelaxationRmsResidualAfter)
                ? ` relaxRms=${formatCompactNumber(boundaryRelaxationRmsResidualAfter)}`
                : ""
            }${
              Number.isFinite(boundaryRelaxationMaxStep)
                ? ` relaxStep=${formatCompactNumber(boundaryRelaxationMaxStep)}`
                : ""
            }${
              Number.isFinite(boundaryRelaxationFinalStepFactor)
                ? ` relaxFactor=${formatCompactNumber(boundaryRelaxationFinalStepFactor)}`
                : ""
            }${
              boundaryRelaxationSelectedCandidateKind
                ? ` relaxKind=${formatCompactLabel(boundaryRelaxationSelectedCandidateKind)}`
                : ""
            }${
              boundaryRelaxationResidualEvidenceStatus
                ? ` relaxEvidence=${formatCompactLabel(boundaryRelaxationResidualEvidenceStatus)}`
                : ""
            }${
              boundaryRelaxationResidualMode
                ? ` relaxLaw=${formatCompactLabel(boundaryRelaxationResidualMode)}`
                : ""
            }${
              Number.isFinite(boundaryRelaxationCenterOfMassSelectedCount)
                ? ` relaxCom=${boundaryRelaxationCenterOfMassSelectedCount}`
                : ""
            }${
              Number.isFinite(boundaryRelaxationCandidateVariantCount)
                ? ` cand=${boundaryRelaxationCandidateVariantCount}`
                : ""
            }${
              Number.isFinite(boundaryRelaxationLineSearchTrialCount)
                ? ` trials=${boundaryRelaxationLineSearchTrialCount}`
                : ""
            }${
              Number.isFinite(boundaryRelaxationCandidateKindMask)
                ? ` mask=0x${boundaryRelaxationCandidateKindMask.toString(16)}`
                : ""
            }${boundaryRelaxationStatus ? ` relaxStatus=${formatCompactLabel(boundaryRelaxationStatus)}` : ""
            }`
          : "";
        const boundaryAdaptiveDetail = boundaryRelaxationAdaptiveRetry
          ? ` adaptiveRetry=${Number.isFinite(boundaryRelaxationInitialIterationCount) ? boundaryRelaxationInitialIterationCount : "?"}->${Number.isFinite(boundaryRelaxationIterationCount) ? boundaryRelaxationIterationCount : "?"}${
              Number.isFinite(boundaryRelaxationInitialTolerance)
                ? ` firstTol=${formatCompactNumber(boundaryRelaxationInitialTolerance)}`
                : ""
            }${
              Number.isFinite(boundaryRelaxationInitialResidualAfter)
                ? ` firstResidual=${formatCompactNumber(boundaryRelaxationInitialResidualAfter)}`
                : ""
            }`
          : boundaryRelaxationAdaptiveRetryRejected
            ? ` adaptiveRetryRejected=${Number.isFinite(boundaryRelaxationInitialIterationCount) ? boundaryRelaxationInitialIterationCount : "?"}->${Number.isFinite(boundaryRelaxationRejectedRetryIterationCount) ? boundaryRelaxationRejectedRetryIterationCount : "?"}${
                Number.isFinite(boundaryRelaxationRejectedRetryTolerance)
                  ? ` retryTol=${formatCompactNumber(boundaryRelaxationRejectedRetryTolerance)}`
                  : ""
              }${
                Number.isFinite(boundaryRelaxationRejectedRetryResidualAfter)
                  ? ` retryResidual=${formatCompactNumber(boundaryRelaxationRejectedRetryResidualAfter)}`
                  : ""
              }`
          : "";
        const guidanceDetail = Number.isFinite(guidanceSampleCount) && guidanceSampleCount > 0
          ? ` guidance=${guidanceSampleCount}${
              guidanceMode ? ` mode=${guidanceMode}` : ""
            }${Number.isFinite(maxGuidanceAcceleration) ? ` maxA=${formatCompactNumber(maxGuidanceAcceleration)}` : ""}${
              Number.isFinite(guidanceAccelerationTolerance)
                ? ` tolA=${formatCompactNumber(guidanceAccelerationTolerance)}`
                : ""
            }${
              guidanceAccelerationStatus && guidanceAccelerationStatus !== "unchecked"
                ? ` aStatus=${formatCompactLabel(guidanceAccelerationStatus)}`
                : ""
            }`
          : "";
        const constraintSolverDetail = constraintSolverStatus
          ? ` constraint=${constraintSolverStatus}${constraintSolverClaim ? ` claim=${constraintSolverClaim}` : ""}`
          : "";
        const physicalBoundarySolverDetail = physicalBoundarySolverStatus
          ? ` physical=${formatCompactLabel(physicalBoundarySolverStatus)}${
              physicalBoundarySolverClaim ? ` physicalClaim=${formatCompactLabel(physicalBoundarySolverClaim)}` : ""
            }${
              physicalBoundarySolverBlockingReason
                ? ` physicalWhy=${formatCompactLabel(physicalBoundarySolverBlockingReason)}`
                : ""
            }`
          : "";
        const constraintBoundary = isDiscreteBoundaryConverged
          ? ` Retained path constraints converged against the discrete finite-difference pair equation under the requested relaxation tolerance.${
              effectiveBoundaryStatus === "unchecked"
                ? " Retained-knot boundary residual acceptance remains unchecked."
                : ""
            }${
              effectivePositionResidualStatus === "unchecked"
                ? " Retained-position preservation evidence remains unchecked."
                : ""
            } This remains the finite-difference retained-knot boundary relaxation, not the full physical pair-interaction/path-constraint boundary-value solver.`
          : guidanceDetail
            ? guidanceMode === "retained_knot_boundary"
              ? " Retained path constraints used retained-knot boundary guidance; this is not yet the final physical boundary-value path solve."
              : " Retained path constraints used finite-time guidance; this is not yet the final physical boundary-value path solve."
            : isBoundarySeededConstraint
              ? " Retained path constraints were reseeded from the retained-knot boundary before finite-difference relaxation; this is not yet the final physical boundary-value path solve."
            : "";
        const physicalBoundarySolverHelp =
          physicalBoundarySolverStatus === PHYSICAL_BOUNDARY_SOLVER_PENDING_STATUS
            ? " The full physical pair-interaction/path-constraint boundary-value solver is still pending behind this replay."
            : "";
        return {
          state: isDiscreteBoundaryConverged
            ? "bridge-boundary"
            : isBoundarySeededConstraint
              ? "bridge-boundary-seed"
            : guidanceDetail
              ? "bridge-guided"
              : "bridge",
          label: isDiscreteBoundaryConverged
            ? "solver boundary replay"
            : isBoundarySeededConstraint
              ? "solver boundary-seed replay"
            : guidanceDetail
              ? "solver guided replay"
              : "solver pair replay",
          help:
            `Showing central solver bridge replay from one mutual pair-interaction path run${stepDetail}${frameRefinementDetail}${lawDetail}${pathDetail}${residualDetail}${positionResidualDetail}${positionResidualStatusDetail}${initialVelocityResidualDetail}${boundaryDetail}${boundaryStatusDetail}${boundaryModeDetail}${boundarySeedDetail}${boundaryRelaxationDetail}${boundaryAdaptiveDetail}${guidanceDetail}${constraintSolverDetail}${physicalBoundarySolverDetail}. ` +
            `This replaces the segmented one-body seed replay for the default canvas path.${constraintBoundary}${physicalBoundarySolverHelp}`,
        };
      }
      const accelerationPolicy = this.getBridgeMotionAccelerationPolicy();
      if (accelerationPolicy === "pair_segmented_attraction_seed") {
        const scale = Number(this.dataset?.pairAccelerationScale ?? this.dataset?.solverSummary?.pairAccelerationScale);
        const segmentCount = Number(this.dataset?.pairSegmentCount ?? this.dataset?.solverSummary?.pairSegmentCount);
        const scaleDetail = Number.isFinite(scale) ? ` scale=${formatCompactNumber(scale)}` : "";
        const segmentDetail = Number.isFinite(segmentCount) ? ` segments=${segmentCount}` : "";
        return {
          state: "bridge-seed",
          label: "solver seed replay",
          help:
            `Showing central solver bridge replay using pair_segmented_attraction_seed path acceleration${scaleDetail}${segmentDetail}. ` +
            "This is a segmented pair-interaction approximation, not the final full pair-interaction path solver.",
        };
      }
      if (accelerationPolicy === "pair_initial_attraction_seed") {
        const scale = Number(this.dataset?.pairAccelerationScale ?? this.dataset?.solverSummary?.pairAccelerationScale);
        const scaleDetail = Number.isFinite(scale) ? ` scale=${formatCompactNumber(scale)}.` : ".";
        return {
          state: "bridge-seed",
          label: "solver seed replay",
          help:
            `Showing central solver bridge replay using pair_initial_attraction_seed path acceleration${scaleDetail} ` +
            "This is not the final full pair-interaction path solver.",
        };
      }
      return {
        state: "bridge",
        label: "solver bridge replay",
        help: "Showing replay data returned by the solver bridge.",
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

  getBridgeMotionAccelerationPolicy() {
    const policy = this.dataset?.motionAccelerationPolicy ?? this.dataset?.solverSummary?.motionAccelerationPolicy;
    return typeof policy === "string" ? policy.trim() : "";
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
    return this.rerunAfterDirectManipulationDrag();
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

  setWeakContributionCueMode(mode) {
    const nextMode = this.normalizeWeakContributionCueMode(mode);
    if (nextMode === this.weakContributionCueMode) {
      this.updateDisplaySettingControls();
      return;
    }
    this.weakContributionCueMode = nextMode;
    this.updateDisplaySettingControls();
    if (this.context) {
      this.render();
    }
    if (this.dom?.readout) {
      this.updateReadout();
    }
    if (this.dom?.settingsPanel) {
      this.hideSettings();
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
    if (!this.dom?.colorSwatches) {
      return;
    }
    Array.from(this.dom.colorSwatches.children).forEach((button) => {
      button.classList.toggle("is-active", button.dataset.colorId === this.canvasColorId);
    });
  }

  updateSpeedControls() {
    this.updateFieldSpeedControl();
    this.updateArchitrinoSpeedControl();
  }

  updateDisplaySettingControls() {
    if (this.dom?.weakContributionCueInput) {
      this.dom.weakContributionCueInput.value = this.weakContributionCueMode;
    }
    if (this.dom?.visualSwitches) {
      Array.from(this.dom.visualSwitches.children).forEach((button) => {
        const switchId = button.dataset.visualSwitch;
        const isActive = this.wakeVisualSettings[switchId] === true;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    }
  }

  updateFieldSpeedControl() {
    if (this.dom?.cfSpeedInput) {
      this.dom.cfSpeedInput.value = String(this.fieldSpeedScale);
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
      this.dom.architrinoSpeedValue.setAttribute("aria-label", `${value} c f`);
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

  normalizeArchitrinoSpeedIndex(speedIndex) {
    const numericIndex = Number(speedIndex);
    const candidate = Number.isFinite(numericIndex) ? Math.round(numericIndex) : DEFAULT_ARCHITRINO_SPEED_INDEX;
    return clamp(candidate, 0, ARCHITRINO_SPEED_FRACTIONS.length - 1);
  }

  normalizeBooleanSetting(value) {
    return value === true || value === "true" || value === "1" || value === 1;
  }

  normalizeWeakContributionCueMode(mode) {
    return mode === WEAK_CONTRIBUTION_CUE_OFF
      ? WEAK_CONTRIBUTION_CUE_OFF
      : WEAK_CONTRIBUTION_CUE_THRESHOLD_ONLY;
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
    const rounded = Math.round(this.normalizeFieldSpeedScale(speedScale) * 100) / 100;
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
    return ARCHITRINO_KINDS
      .map((sourceKind) => this.createLiveWakeSeries(sourceKind, replayTime))
      .filter(Boolean);
  }

  createLiveWakeSeries(sourceKind, replayTime = this.getCurrentReplayTime()) {
    const receiverKind = this.getOppositeArchitrinoKind(sourceKind);
    if (!receiverKind) {
      return null;
    }
    const receiver = this.getReplayPathPoint(receiverKind, replayTime);
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
    return baseSignalSpeed * this.normalizeFieldSpeedScale(this.fieldSpeedScale);
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
    const residualAt = (candidateTime) => {
      const source = this.getReplayPathPoint(sourceKind, candidateTime);
      return getDistance(source, receiver) - speed * Math.max(0, now - candidateTime);
    };
    let highT = now;
    let highResidual = residualAt(highT);
    if (!Number.isFinite(highResidual)) {
      return null;
    }
    if (Math.abs(highResidual) <= TIME_EPSILON) {
      const source = this.getReplayPathPoint(sourceKind, highT);
      return { source, residual: highResidual };
    }

    const scanSpan = now - pathStart;
    let previousT = highT;
    let previousResidual = highResidual;
    for (let step = 1; step <= LIVE_WAKE_ROOT_SCAN_STEPS; step += 1) {
      const candidateT = now - scanSpan * (step / LIVE_WAKE_ROOT_SCAN_STEPS);
      const candidateResidual = residualAt(candidateT);
      if (!Number.isFinite(candidateResidual)) {
        continue;
      }
      if (candidateResidual <= 0 && previousResidual >= 0) {
        let lowT = candidateT;
        highT = previousT;
        for (let refine = 0; refine < LIVE_WAKE_ROOT_REFINE_STEPS; refine += 1) {
          const midT = (lowT + highT) * 0.5;
          const midResidual = residualAt(midT);
          if (!Number.isFinite(midResidual)) {
            break;
          }
          if (midResidual <= 0) {
            lowT = midT;
          } else {
            highT = midT;
          }
        }
        const emissionT = (lowT + highT) * 0.5;
        const source = this.getReplayPathPoint(sourceKind, emissionT);
        return { source, residual: residualAt(emissionT) };
      }
      previousT = candidateT;
      previousResidual = candidateResidual;
    }
    return null;
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
    this.isPlaying = Boolean(isPlaying);
    this.updatePlayButton();
  }

  updatePlayButton() {
    if (this.dom?.playButton) {
      this.dom.playButton.setAttribute("aria-label", ICON_HELP.play);
      this.dom.playButton.setAttribute("aria-pressed", this.isPlaying ? "true" : "false");
      this.dom.playButton.title = ICON_HELP.play;
      this.dom.playButton.dataset.tooltip = ICON_HELP.play;
      this.dom.playButton.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l10-7z"></path></svg>';
    }
    if (this.dom?.pauseButton) {
      this.dom.pauseButton.setAttribute("aria-label", ICON_HELP.pause);
      this.dom.pauseButton.setAttribute("aria-pressed", this.isPlaying ? "false" : "true");
      this.dom.pauseButton.title = ICON_HELP.pause;
      this.dom.pauseButton.dataset.tooltip = ICON_HELP.pause;
      this.dom.pauseButton.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14"></path><path d="M16 5v14"></path></svg>';
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
  }

  updateNowControl(replayTime = this.getCurrentReplayTime()) {
    if (!this.dom?.nowInput || !this.dom?.nowValue) {
      return;
    }
    const [start, end] = this.getReplayTimeRange();
    const span = end - start;
    const phase = span > 0 ? clamp((replayTime - start) / span, 0, 1) : 0;
    this.dom.nowInput.value = String(Math.round(phase * NOW_SLIDER_MAX));
    this.dom.nowValue.textContent = `t=${formatCompactNumber(replayTime)}`;
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
    const frameTimes = (this.dataset?.frames ?? [])
      .map((frame) => Number(frame.t))
      .filter(Number.isFinite);
    if (frameTimes.length === 0) {
      return [];
    }
    frameTimes.sort((left, right) => left - right);
    return frameTimes.filter((time, index, rows) => index === 0 || Math.abs(time - rows[index - 1]) > TIME_EPSILON);
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
    this.lastFrameTime = this.window.performance.now();
    this.animationFrame = this.window.requestAnimationFrame((time) => this.tick(time));
  }

  tick(time) {
    const deltaSeconds = Math.min(0.06, Math.max(0, (time - this.lastFrameTime) / 1000));
    this.lastFrameTime = time;
    if (this.isPlaying) {
      const previousReplayTime = this.getCurrentReplayTime();
      this.elapsedSeconds += deltaSeconds * this.fieldSpeedScale;
      const replayTime = this.getCurrentReplayTime();
      this.updateNowControl(replayTime);
      this.render(this.getFrameReceptionReplayTime(previousReplayTime, replayTime) ?? replayTime);
      if (this.dom?.readout) {
        this.updateReadout();
      }
    }
    this.animationFrame = this.window.requestAnimationFrame((nextTime) => this.tick(nextTime));
  }

  destroy() {
    if (this.animationFrame !== null) {
      this.window.cancelAnimationFrame(this.animationFrame);
    }
    this.window.removeEventListener("resize", this.boundResize);
    this.document.removeEventListener("keydown", this.boundKeyDown);
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
    this.drawWakes(ctx, replayTime);
    this.drawPathTrail(ctx, "positrino", POSITRINO);
    this.drawPathTrail(ctx, "electrino", ELECTRINO);
    this.drawSelection(ctx);
    this.drawLiveMarkers(ctx, replayTime);
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
    const settings = this.wakeVisualSettings ?? DEFAULT_WAKE_VISUAL_SETTINGS;
    let dotRadius = Number(basePreset.dotRadius) || 1.8;
    let alphaScale = Number(basePreset.alphaScale) || 1;
    if (settings.thinFrontsEnabled) {
      dotRadius *= 1.35 / 1.8;
      alphaScale *= 0.86 / 1.18;
    }
    if (settings.brightFrontsEnabled) {
      dotRadius *= 2.05 / 1.8;
      alphaScale *= 1.32 / 1.18;
    }
    if (settings.strongFalloffEnabled) {
      alphaScale *= 0.92 / 1.18;
    }
    return {
      ...basePreset,
      finalSpan: settings.wideArcsEnabled ? 20 : 14,
      startSpan: settings.wideArcsEnabled ? 3.5 : 2.5,
      dotRadius,
      alphaScale,
      falloffPower: settings.strongFalloffEnabled ? 1.7 : 1,
    };
  }

  drawWakes(ctx, replayTime = this.getCurrentReplayTime()) {
    const drawArcWakes = this.wakeVisualSettings.arcWakesEnabled === true;
    const drawFullCircularWakes = this.wakeVisualSettings.fullCircularWakesEnabled === true;
    if (drawFullCircularWakes) {
      this.drawFullCircularWakes(ctx, replayTime);
    }
    if (!drawArcWakes) {
      return;
    }
    const visibleWakeSeries = this.getVisibleWakeSeries(replayTime);
    if (drawFullCircularWakes) {
      visibleWakeSeries.forEach((link) => {
        this.drawWakeEmissionLine(ctx, link, replayTime);
      });
      return;
    }
    visibleWakeSeries.forEach((link) => {
      this.drawWakeProgression(ctx, link, replayTime);
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
    const alpha = 0.34 * preset.alphaScale * (0.5 + 0.5 * falloffWeight) * visualWeight.alphaScale;
    const width = preset.dotRadius * 0.9 * visualWeight.radiusScale;
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
      const wakeSpan = fullCircle
        ? 360
        : wakePreset.startSpan + (wakePreset.finalSpan - wakePreset.startSpan) * progress;
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
    this.drawLine(ctx, points, color, 5);
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

  drawLiveMarkers(ctx, replayTime = this.getCurrentReplayTime()) {
    this.drawLiveMarker(ctx, "positrino", POSITRINO, this.getReplayPathPoint("positrino", replayTime), "positrino", {
      x: 0,
      y: -36,
    });
    this.drawLiveMarker(ctx, "electrino", ELECTRINO, this.getReplayPathPoint("electrino", replayTime), "electrino", {
      x: 0,
      y: 36,
    });
  }

  drawLiveMarker(ctx, kind, color, point, label, labelOffset) {
    const screen = this.worldToScreen(point);
    this.drawCircle(ctx, screen, 20, withAlpha(color, 0.12));
    this.drawCircle(ctx, screen, 9, color, WHITE, 1.4);
    this.drawScreenText(
      ctx,
      label,
      {
        x: screen.x + labelOffset.x * this.viewport.scale,
        y: screen.y + labelOffset.y * this.viewport.scale,
      },
      14,
      withAlpha(color, 0.9),
      "center",
      "bold",
    );
  }

  drawDottedArc(ctx, center, radius, startDeg, endDeg, color, dotRadius) {
    const span = Math.abs(endDeg - startDeg);
    const count = Math.max(16, Math.min(220, Math.round((span / 360) * radius * 1.2)));
    for (let index = 0; index <= count; index += 1) {
      const t = index / Math.max(1, count);
      const angle = ((startDeg + (endDeg - startDeg) * t) * Math.PI) / 180;
      const point = {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
      };
      this.drawCircle(ctx, this.worldToScreen(point), dotRadius, color);
    }
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
      if (this.dragState.type === "initial-velocity") {
        this.dragSelectedInitialVelocity(event);
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
    if (hit.type === "initial-velocity") {
      this.startInitialVelocityDrag(event, hit);
    }
    if (hit.type === "path-line") {
      this.startPathLineDrag(event, hit);
    }
    this.render();
  }

  handleCanvasWheel(event) {
    if (this.dragState) {
      return;
    }
    const rect = this.dom.canvas.getBoundingClientRect();
    const screen = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    const hit = this.findNearestHit(screen, { includeWakes: true });
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

  startInitialVelocityDrag(event, hit) {
    this.clearBackgroundPointers();
    const screen = this.canvasScreenPointFromEvent(event);
    this.dragState = {
      type: "initial-velocity",
      kind: hit.selection.kind,
      lastWorld: this.screenToWorld(screen),
      didEdit: false,
    };
    this.setPlaying(false);
    if (typeof this.dom.canvas.setPointerCapture === "function") {
      this.dom.canvas.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
  }

  dragSelectedInitialVelocity(event) {
    const rect = this.dom.canvas.getBoundingClientRect();
    const screen = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    const world = this.screenToWorld(screen);
    this.dragState.lastWorld = world;
    if (this.applyInitialVelocityDrag(this.dragState.kind, world)) {
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
    const completedDrag = this.dragState;
    this.dragState = null;
    if (this.shouldRerunAfterCompletedDrag(completedDrag)) {
      return this.rerunAfterDirectManipulationDrag();
    }
    return this.dataset;
  }

  shouldRerunAfterCompletedDrag(completedDrag) {
    if (!completedDrag?.didEdit) {
      return false;
    }
    if (completedDrag.type === "initial-velocity") {
      return true;
    }
    return completedDrag.type === "history" || completedDrag.type === "path-line";
  }

  rerunAfterDirectManipulationDrag() {
    if (this.usesFallbackReplayOnly()) {
      return this.dataset;
    }
    return this.loadReplay({
      requestOptions: this.replayRequestOptions,
      preserveDraftOnFailure: true,
    });
  }

  applyRetainedPointDrag(kind, depth, delta) {
    const didEdit = this.deformPathAroundHistoryPoint(kind, depth, delta);
    if (!didEdit) {
      return false;
    }
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
    this.syncReplayRequestOptionsFromDataset();
    this.updateReplayStatus();
  }

  markDraftSolverRejection(error) {
    if (!this.dataset) {
      return;
    }
    const message = this.formatSolverRejectionMessage(error);
    this.dataset.datasetSource = DIRECT_MANIPULATION_DRAFT_PREVIEW;
    this.dataset.draftPreview = {
      ...(this.dataset.draftPreview ?? {}),
      authoritative: false,
      solverRejected: true,
      solverRejection: {
        message,
        code: formatCompactLabel(error?.code ?? error?.name, "solver_error"),
      },
    };
    this.replayLoadState = "draft-rejected";
    this.syncReplayRequestOptionsFromDataset();
    this.updateReplayStatus();
  }

  getDraftSolverRejectionMessage() {
    return this.dataset?.draftPreview?.solverRejection?.message ?? this.formatSolverRejectionMessage(this.replayLoadError);
  }

  formatSolverRejectionMessage(error) {
    const message = String(error?.message ?? error ?? "").trim();
    return message.length > 0 ? message : "solver bridge rejected the edited setup";
  }

  markSolverWakeLinksStale(reason) {
    this.getVisibleWakeLinks().forEach((link) => {
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
      if (!point) {
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
    const startPoint = this.getHistoryStartPoint(kind);
    if (startPoint) {
      this.syncInitialConditionToHistoryStart(kind, startPoint);
    }
    return didEdit;
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
    const t = Number(sampleT);
    const exactPoint = history.find((point) => Math.abs(point.t - t) <= TIME_EPSILON);
    if (exactPoint) {
      return { t, x: exactPoint.x, y: exactPoint.y };
    }
    const first = history[0];
    const last = history.at(-1);
    if (t <= first.t) {
      return { t, x: first.x, y: first.y };
    }
    if (t >= last.t) {
      return { t, x: last.x, y: last.y };
    }

    const rightIndex = history.findIndex((point) => point.t >= t);
    const leftIndex = Math.max(0, rightIndex - 1);
    const left = history[leftIndex];
    const right = history[rightIndex];
    const span = right.t - left.t;
    if (!Number.isFinite(span) || span <= TIME_EPSILON) {
      return { t, x: left.x, y: left.y };
    }
    const amount = clamp((t - left.t) / span, 0, 1);
    const leftTangent = this.getSmoothHistoryPathTangent(history, leftIndex);
    const rightTangent = this.getSmoothHistoryPathTangent(history, rightIndex);
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

  getSmoothHistoryPathTangent(history, index) {
    const previous = history[Math.max(0, index - 1)];
    const next = history[Math.min(history.length - 1, index + 1)];
    const span = next.t - previous.t;
    if (!Number.isFinite(span) || span <= TIME_EPSILON) {
      return { x: 0, y: 0 };
    }
    return {
      x: ((next.x - previous.x) / span) * RETAINED_PATH_SPLINE_TANGENT_SCALE,
      y: ((next.y - previous.y) / span) * RETAINED_PATH_SPLINE_TANGENT_SCALE,
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

  getCurrentReplayTime() {
    return this.getReplayTimeForElapsedSeconds(this.elapsedSeconds);
  }

  getReplayTimeForElapsedSeconds(elapsedSeconds) {
    const [start, end] = this.getReplayTimeRange();
    const phase = (elapsedSeconds % REPLAY_LOOP_SECONDS) / REPLAY_LOOP_SECONDS;
    return start + (end - start) * phase;
  }

  getFrameReceptionReplayTime(previousReplayTime, replayTime) {
    void previousReplayTime;
    void replayTime;
    return null;
  }

  getReplayTimeAdvanceToCrossedPoint(previousReplayTime, replayTime, crossedReplayTime, start, end) {
    if (previousReplayTime <= replayTime) {
      if (crossedReplayTime > previousReplayTime + TIME_EPSILON && crossedReplayTime <= replayTime + TIME_EPSILON) {
        return crossedReplayTime - previousReplayTime;
      }
      return Number.NaN;
    }

    if (crossedReplayTime > previousReplayTime + TIME_EPSILON && crossedReplayTime <= end + TIME_EPSILON) {
      return crossedReplayTime - previousReplayTime;
    }
    if (crossedReplayTime >= start - TIME_EPSILON && crossedReplayTime <= replayTime + TIME_EPSILON) {
      return end - previousReplayTime + crossedReplayTime - start;
    }
    return Number.NaN;
  }

  getReplayTimeRange() {
    const points = [
      ...(this.dataset.paths.positrino ?? []),
      ...(this.dataset.paths.electrino ?? []),
    ].filter((point) => Number.isFinite(Number(point.t)));
    if (points.length === 0) {
      return [0, 1];
    }
    const times = points.map((point) => point.t);
    return [Math.min(...times), Math.max(...times)];
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
    return this.wakeVisualSettings?.wideWakeFrontGapEnabled === true
      ? WIDE_LIVE_WAKE_FRONT_SPACING
      : DEFAULT_LIVE_WAKE_FRONT_SPACING;
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
        origin: this.getReplayPathPoint(kind, emissionTime),
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
    const nearest = candidates.sort((a, b) => a.distance - b.distance)[0];
    return nearest && nearest.distance <= nearest.hitRadius ? nearest : null;
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
        this.dataset.wakeArcDisplayMode === FULL_CIRCULAR_ARCS ? "full circular" : "partial arc",
      ],
      distance,
      hitRadius: 20,
      selection: { type: "wake", linkId: link.id },
    };
  }

  createDraftSolverRejectionReadoutDetails() {
    if (this.replayLoadState !== "draft-rejected" && !this.dataset?.draftPreview?.solverRejected) {
      return [];
    }
    const rejection = this.dataset?.draftPreview?.solverRejection;
    return [
      "edit=not_solved",
      `reason=${formatCompactLabel(rejection?.message ?? this.replayLoadError?.message, "solver_rejected_edit")}`,
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
    if (this.dataset?.solverReplayMode !== CENTRAL_PAIR_INTERACTION_REPLAY_MODE) {
      return [];
    }
    const summary = this.dataset?.solverSummary ?? {};
    const guidanceSampleCount = Number(
      this.dataset?.pathConstraintGuidanceSampleCount ?? summary.pathConstraintGuidanceSampleCount,
    );
    const guidanceMode = this.dataset?.pathConstraintGuidanceMode ?? summary.pathConstraintGuidanceMode;
    const boundaryMode = this.dataset?.pathConstraintBoundaryMode ?? summary.pathConstraintBoundaryMode;
    const boundarySeedMode = this.dataset?.pathConstraintBoundarySeedMode ?? summary.pathConstraintBoundarySeedMode;
    const boundarySeedSampleCount = Number(
      this.dataset?.pathConstraintBoundarySeedSampleCount ?? summary.pathConstraintBoundarySeedSampleCount,
    );
    const frameRefinementSampleCount = Number(
      this.dataset?.pathConstraintFrameRefinementSampleCount ??
        summary.pathConstraintFrameRefinementSampleCount,
    );
    const boundaryRelaxationMode =
      this.dataset?.pathConstraintBoundaryRelaxationMode ?? summary.pathConstraintBoundaryRelaxationMode;
    const boundaryRelaxationIterationCount = Number(
      this.dataset?.pathConstraintBoundaryRelaxationIterationCount ??
        summary.pathConstraintBoundaryRelaxationIterationCount,
    );
    const boundaryRelaxationAppliedIterationCount = Number(
      this.dataset?.pathConstraintBoundaryRelaxationAppliedIterationCount ??
        summary.pathConstraintBoundaryRelaxationAppliedIterationCount,
    );
    const boundaryRelaxationStopReason =
      this.dataset?.pathConstraintBoundaryRelaxationStopReason ??
      summary.pathConstraintBoundaryRelaxationStopReason;
    const boundaryRelaxationTolerance = Number(
      this.dataset?.pathConstraintBoundaryRelaxationTolerance ??
        summary.pathConstraintBoundaryRelaxationTolerance,
    );
    const boundaryRelaxationStepTolerance = Number(
      this.dataset?.pathConstraintBoundaryRelaxationStepTolerance ??
        summary.pathConstraintBoundaryRelaxationStepTolerance,
    );
    const boundaryRelaxationStatus =
      this.dataset?.pathConstraintBoundaryRelaxationStatus ?? summary.pathConstraintBoundaryRelaxationStatus;
    const boundaryRelaxationResidualEvidenceStatus =
      this.dataset?.pathConstraintBoundaryRelaxationResidualEvidenceStatus ??
      summary.pathConstraintBoundaryRelaxationResidualEvidenceStatus;
    const boundaryRelaxationResidualMode =
      this.dataset?.pathConstraintBoundaryRelaxationResidualMode ??
      summary.pathConstraintBoundaryRelaxationResidualMode;
    const boundaryRelaxationResidualRatio = Number(
      this.dataset?.pathConstraintBoundaryRelaxationResidualRatio ??
        summary.pathConstraintBoundaryRelaxationResidualRatio,
    );
    const boundaryRelaxationRmsResidualRatio = Number(
      this.dataset?.rmsPathConstraintBoundaryRelaxationResidualRatio ??
        summary.rmsPathConstraintBoundaryRelaxationResidualRatio,
    );
    const boundaryRelaxationResidualSettlingRate = Number(
      this.dataset?.pathConstraintBoundaryRelaxationResidualSettlingRate ??
        summary.pathConstraintBoundaryRelaxationResidualSettlingRate,
    );
    const boundaryRelaxationRmsResidualSettlingRate = Number(
      this.dataset?.rmsPathConstraintBoundaryRelaxationResidualSettlingRate ??
        summary.rmsPathConstraintBoundaryRelaxationResidualSettlingRate,
    );
    const boundaryRelaxationRmsResidualAfter = Number(
      this.dataset?.rmsPathConstraintBoundaryRelaxationResidualAfter ??
        summary.rmsPathConstraintBoundaryRelaxationResidualAfter,
    );
    const boundaryRelaxationMaxStep = Number(
      this.dataset?.pathConstraintBoundaryRelaxationMaxStep ??
        summary.pathConstraintBoundaryRelaxationMaxStep,
    );
    const boundaryRelaxationFinalStepFactor = Number(
      this.dataset?.pathConstraintBoundaryRelaxationFinalStepFactor ??
        summary.pathConstraintBoundaryRelaxationFinalStepFactor,
    );
    const boundaryRelaxationSelectedCandidateKind =
      this.dataset?.pathConstraintBoundaryRelaxationSelectedCandidateKind ??
      summary.pathConstraintBoundaryRelaxationSelectedCandidateKind;
    const boundaryRelaxationCenterOfMassSelectedCount = Number(
      this.dataset?.pathConstraintBoundaryRelaxationCenterOfMassSelectedCount ??
        summary.pathConstraintBoundaryRelaxationCenterOfMassSelectedCount,
    );
    const boundaryRelaxationCandidateVariantCount = Number(
      this.dataset?.pathConstraintBoundaryRelaxationCandidateVariantCount ??
        summary.pathConstraintBoundaryRelaxationCandidateVariantCount,
    );
    const boundaryRelaxationLineSearchTrialCount = Number(
      this.dataset?.pathConstraintBoundaryRelaxationLineSearchTrialCount ??
        summary.pathConstraintBoundaryRelaxationLineSearchTrialCount,
    );
    const boundaryRelaxationCandidateKindMask = Number(
      this.dataset?.pathConstraintBoundaryRelaxationCandidateKindMask ??
        summary.pathConstraintBoundaryRelaxationCandidateKindMask,
    );
    const boundaryRelaxationAdaptiveRetry = Boolean(
      this.dataset?.pathConstraintBoundaryRelaxationAdaptiveRetry ??
        summary.pathConstraintBoundaryRelaxationAdaptiveRetry,
    );
    const boundaryRelaxationAdaptiveRetryRejected = Boolean(
      this.dataset?.pathConstraintBoundaryRelaxationAdaptiveRetryRejected ??
        summary.pathConstraintBoundaryRelaxationAdaptiveRetryRejected,
    );
    const boundaryRelaxationInitialIterationCount = Number(
      this.dataset?.pathConstraintBoundaryRelaxationInitialIterationCount ??
        summary.pathConstraintBoundaryRelaxationInitialIterationCount,
    );
    const boundaryRelaxationInitialTolerance = Number(
      this.dataset?.pathConstraintBoundaryRelaxationInitialTolerance ??
        summary.pathConstraintBoundaryRelaxationInitialTolerance,
    );
    const boundaryRelaxationInitialResidualAfter = Number(
      this.dataset?.maxPathConstraintBoundaryRelaxationResidualAfterInitialAttempt ??
        summary.maxPathConstraintBoundaryRelaxationResidualAfterInitialAttempt,
    );
    const boundaryRelaxationRejectedRetryIterationCount = Number(
      this.dataset?.pathConstraintBoundaryRelaxationRejectedRetryIterationCount ??
        summary.pathConstraintBoundaryRelaxationRejectedRetryIterationCount,
    );
    const boundaryRelaxationRejectedRetryTolerance = Number(
      this.dataset?.pathConstraintBoundaryRelaxationRejectedRetryTolerance ??
        summary.pathConstraintBoundaryRelaxationRejectedRetryTolerance,
    );
    const boundaryRelaxationRejectedRetryResidualAfter = Number(
      this.dataset?.maxPathConstraintBoundaryRelaxationResidualAfterRejectedRetry ??
        summary.maxPathConstraintBoundaryRelaxationResidualAfterRejectedRetry,
    );
    const boundaryRelaxationRejectedRetryResidualRatio = Number(
      this.dataset?.pathConstraintBoundaryRelaxationResidualRatioRejectedRetry ??
        summary.pathConstraintBoundaryRelaxationResidualRatioRejectedRetry,
    );
    const constraintSolverStatus = this.dataset?.pathConstraintSolverStatus ?? summary.pathConstraintSolverStatus;
    const constraintSolverClaim = this.dataset?.pathConstraintSolverClaim ?? summary.pathConstraintSolverClaim;
    const physicalBoundarySolverStatus =
      this.dataset?.pathConstraintPhysicalBoundarySolverStatus ??
      summary.pathConstraintPhysicalBoundarySolverStatus;
    const physicalBoundarySolverClaim =
      this.dataset?.pathConstraintPhysicalBoundarySolverClaim ??
      summary.pathConstraintPhysicalBoundarySolverClaim;
    const physicalBoundarySolverBlockingReason =
      this.dataset?.pathConstraintPhysicalBoundarySolverBlockingReason ??
      summary.pathConstraintPhysicalBoundarySolverBlockingReason;
    const isDiscreteBoundaryConverged = constraintSolverStatus === DISCRETE_BOUNDARY_VALUE_CONVERGED_STATUS;
    const maxGuidanceAcceleration = Number(
      this.dataset?.maxPathConstraintGuidanceAcceleration ?? summary.maxPathConstraintGuidanceAcceleration,
    );
    const guidanceAccelerationStatus =
      this.dataset?.pathConstraintGuidanceAccelerationStatus ??
      summary.pathConstraintGuidanceAccelerationStatus;
    const guidanceAccelerationTolerance = Number(
      this.dataset?.pathConstraintGuidanceAccelerationTolerance ??
        summary.pathConstraintGuidanceAccelerationTolerance,
    );
    const boundarySampleCount = Number(
      this.dataset?.pathConstraintBoundaryResidualSampleCount ?? summary.pathConstraintBoundaryResidualSampleCount,
    );
    const boundaryResidualMode =
      this.dataset?.pathConstraintBoundaryResidualMode ??
      summary.pathConstraintBoundaryResidualMode;
    const boundaryStatus =
      this.dataset?.pathConstraintBoundaryResidualStatus ?? summary.pathConstraintBoundaryResidualStatus;
    const effectiveBoundaryStatus =
      boundaryStatus || (isDiscreteBoundaryConverged ? "unchecked" : "");
    const boundaryTolerance = Number(
      this.dataset?.pathConstraintBoundaryResidualTolerance ?? summary.pathConstraintBoundaryResidualTolerance,
    );
    const maxBoundaryResidual = Number(
      this.dataset?.maxPathConstraintBoundaryResidual ?? summary.maxPathConstraintBoundaryResidual,
    );
    const signalSpeed = Number(this.dataset?.signalSpeed ?? summary.signalSpeed);
    const maxConstraintResidual = Number(
      this.dataset?.maxPathConstraintResidual ?? summary.maxPathConstraintResidual,
    );
    const positionResidualSampleCount = Number(
      this.dataset?.pathConstraintPositionResidualSampleCount ??
        summary.pathConstraintPositionResidualSampleCount,
    );
    const positionResidualStatus =
      this.dataset?.pathConstraintPositionResidualStatus ??
      summary.pathConstraintPositionResidualStatus;
    const positionResidualTolerance = Number(
      this.dataset?.pathConstraintPositionResidualTolerance ??
        summary.pathConstraintPositionResidualTolerance,
    );
    const maxPositionResidual = Number(
      this.dataset?.maxPathConstraintPositionResidual ?? summary.maxPathConstraintPositionResidual,
    );
    const initialVelocityResidualSampleCount = Number(
      this.dataset?.pathConstraintInitialVelocityResidualSampleCount ??
        summary.pathConstraintInitialVelocityResidualSampleCount,
    );
    const initialVelocityResidualStatus =
      this.dataset?.pathConstraintInitialVelocityResidualStatus ??
      summary.pathConstraintInitialVelocityResidualStatus;
    const initialVelocityResidualTolerance = Number(
      this.dataset?.pathConstraintInitialVelocityResidualTolerance ??
        summary.pathConstraintInitialVelocityResidualTolerance,
    );
    const maxInitialVelocityResidual = Number(
      this.dataset?.maxPathConstraintInitialVelocityResidual ??
        summary.maxPathConstraintInitialVelocityResidual,
    );
    const details = [];
    if (Number.isFinite(frameRefinementSampleCount) && frameRefinementSampleCount > 0) {
      details.push(`refined=${frameRefinementSampleCount}`);
    }
    if (Number.isFinite(guidanceSampleCount) && guidanceSampleCount > 0) {
      details.push(`guide=${formatCompactLabel(guidanceMode, "guided")}`);
    }
    if (boundaryMode) {
      details.push(`bMode=${formatCompactLabel(boundaryMode)}`);
    }
    if (boundarySeedMode) {
      details.push(`seed=${formatCompactLabel(boundarySeedMode)}`);
    }
    if (Number.isFinite(boundarySeedSampleCount) && boundarySeedSampleCount > 0) {
      details.push(`seedRows=${boundarySeedSampleCount}`);
    }
    if (boundaryRelaxationMode) {
      details.push(`relax=${formatCompactLabel(boundaryRelaxationMode)}`);
      if (Number.isFinite(boundaryRelaxationIterationCount)) {
        details.push(`relaxIter=${boundaryRelaxationIterationCount}`);
      }
      if (Number.isFinite(boundaryRelaxationAppliedIterationCount)) {
        details.push(`relaxApplied=${boundaryRelaxationAppliedIterationCount}`);
      }
      if (boundaryRelaxationStopReason) {
        details.push(`relaxStop=${formatCompactLabel(boundaryRelaxationStopReason)}`);
      }
      if (Number.isFinite(boundaryRelaxationTolerance)) {
        details.push(`relaxTol=${formatCompactNumber(boundaryRelaxationTolerance)}`);
      }
      if (Number.isFinite(boundaryRelaxationStepTolerance)) {
        details.push(`relaxStepTol=${formatCompactNumber(boundaryRelaxationStepTolerance)}`);
      }
      if (Number.isFinite(boundaryRelaxationResidualRatio)) {
        details.push(`relaxRatio=${formatCompactNumber(boundaryRelaxationResidualRatio)}`);
      }
      if (Number.isFinite(boundaryRelaxationRmsResidualRatio)) {
        details.push(`relaxRmsRatio=${formatCompactNumber(boundaryRelaxationRmsResidualRatio)}`);
      }
      if (Number.isFinite(boundaryRelaxationResidualSettlingRate)) {
        details.push(`relaxRate=${formatCompactNumber(boundaryRelaxationResidualSettlingRate)}`);
      }
      if (Number.isFinite(boundaryRelaxationRmsResidualSettlingRate)) {
        details.push(`relaxRmsRate=${formatCompactNumber(boundaryRelaxationRmsResidualSettlingRate)}`);
      }
      if (Number.isFinite(boundaryRelaxationRmsResidualAfter)) {
        details.push(`relaxRms=${formatCompactNumber(boundaryRelaxationRmsResidualAfter)}`);
      }
      if (Number.isFinite(boundaryRelaxationMaxStep)) {
        details.push(`relaxStep=${formatCompactNumber(boundaryRelaxationMaxStep)}`);
      }
      if (Number.isFinite(boundaryRelaxationFinalStepFactor)) {
        details.push(`relaxFactor=${formatCompactNumber(boundaryRelaxationFinalStepFactor)}`);
      }
      if (boundaryRelaxationSelectedCandidateKind) {
        details.push(`relaxKind=${formatCompactLabel(boundaryRelaxationSelectedCandidateKind)}`);
      }
      if (Number.isFinite(boundaryRelaxationCenterOfMassSelectedCount)) {
        details.push(`relaxCom=${boundaryRelaxationCenterOfMassSelectedCount}`);
      }
      if (Number.isFinite(boundaryRelaxationCandidateVariantCount)) {
        details.push(`cand=${boundaryRelaxationCandidateVariantCount}`);
      }
      if (Number.isFinite(boundaryRelaxationLineSearchTrialCount)) {
        details.push(`trials=${boundaryRelaxationLineSearchTrialCount}`);
      }
      if (Number.isFinite(boundaryRelaxationCandidateKindMask)) {
        details.push(`mask=0x${boundaryRelaxationCandidateKindMask.toString(16)}`);
      }
      if (boundaryRelaxationStatus) {
        details.push(`relaxStatus=${formatCompactLabel(boundaryRelaxationStatus)}`);
      }
      if (boundaryRelaxationResidualEvidenceStatus) {
        details.push(`relaxEvidence=${formatCompactLabel(boundaryRelaxationResidualEvidenceStatus)}`);
      }
      if (boundaryRelaxationResidualMode) {
        details.push(`relaxLaw=${formatCompactLabel(boundaryRelaxationResidualMode)}`);
      }
      if (boundaryRelaxationAdaptiveRetry) {
        if (Number.isFinite(boundaryRelaxationInitialIterationCount)) {
          details.push(`relaxRetry=${boundaryRelaxationInitialIterationCount}->${boundaryRelaxationIterationCount}`);
        } else {
          details.push("relaxRetry=adaptive");
        }
        if (Number.isFinite(boundaryRelaxationInitialTolerance)) {
          details.push(`firstTol=${formatCompactNumber(boundaryRelaxationInitialTolerance)}`);
        }
        if (Number.isFinite(boundaryRelaxationInitialResidualAfter)) {
          details.push(`firstResidual=${formatCompactNumber(boundaryRelaxationInitialResidualAfter)}`);
        }
      } else if (boundaryRelaxationAdaptiveRetryRejected) {
        if (Number.isFinite(boundaryRelaxationInitialIterationCount)) {
          details.push(
            `relaxRetryRejected=${boundaryRelaxationInitialIterationCount}->${Number.isFinite(boundaryRelaxationRejectedRetryIterationCount) ? boundaryRelaxationRejectedRetryIterationCount : "?"}`,
          );
        } else {
          details.push("relaxRetryRejected=adaptive");
        }
        if (Number.isFinite(boundaryRelaxationRejectedRetryTolerance)) {
          details.push(`retryTol=${formatCompactNumber(boundaryRelaxationRejectedRetryTolerance)}`);
        }
        if (Number.isFinite(boundaryRelaxationRejectedRetryResidualAfter)) {
          details.push(`retryResidual=${formatCompactNumber(boundaryRelaxationRejectedRetryResidualAfter)}`);
        }
        if (Number.isFinite(boundaryRelaxationRejectedRetryResidualRatio)) {
          details.push(`retryRatio=${formatCompactNumber(boundaryRelaxationRejectedRetryResidualRatio)}`);
        }
      }
    }
    if (Number.isFinite(guidanceSampleCount) && guidanceSampleCount > 0) {
      details.push(`guideRows=${guidanceSampleCount}`);
      if (Number.isFinite(maxGuidanceAcceleration)) {
        details.push(`maxA=${formatCompactNumber(maxGuidanceAcceleration)}`);
      }
      if (Number.isFinite(guidanceAccelerationTolerance)) {
        details.push(`tolA=${formatCompactNumber(guidanceAccelerationTolerance)}`);
      }
      if (guidanceAccelerationStatus && guidanceAccelerationStatus !== "unchecked") {
        details.push(`aStatus=${formatCompactLabel(guidanceAccelerationStatus)}`);
      }
    }
    if (constraintSolverStatus) {
      details.push(`constraint=${formatCompactLabel(constraintSolverStatus)}`);
    }
    if (constraintSolverClaim) {
      details.push(`claim=${formatCompactLabel(constraintSolverClaim)}`);
    }
    if (physicalBoundarySolverStatus) {
      details.push(`physical=${formatCompactLabel(physicalBoundarySolverStatus)}`);
    }
    if (physicalBoundarySolverClaim) {
      details.push(`physicalClaim=${formatCompactLabel(physicalBoundarySolverClaim)}`);
    }
    if (physicalBoundarySolverBlockingReason) {
      details.push(`physicalWhy=${formatCompactLabel(physicalBoundarySolverBlockingReason)}`);
    }
    if (Number.isFinite(signalSpeed)) {
      details.push(`signal=${formatCompactNumber(signalSpeed)}`);
    }
    if (Number.isFinite(boundarySampleCount) && boundarySampleCount > 0) {
      details.push(`boundary=${boundarySampleCount}`);
      if (boundaryResidualMode) {
        details.push(`bLaw=${formatCompactLabel(boundaryResidualMode)}`);
      }
      if (Number.isFinite(maxBoundaryResidual)) {
        details.push(`maxB=${formatCompactNumber(maxBoundaryResidual)}`);
      }
      if (Number.isFinite(boundaryTolerance)) {
        details.push(`tolB=${formatCompactNumber(boundaryTolerance)}`);
      }
    }
    if (effectiveBoundaryStatus && (effectiveBoundaryStatus !== "unchecked" || isDiscreteBoundaryConverged)) {
      details.push(`bStatus=${formatCompactLabel(effectiveBoundaryStatus)}`);
    }
    if (Number.isFinite(positionResidualSampleCount) && positionResidualSampleCount > 0) {
      details.push(`posRows=${positionResidualSampleCount}`);
      if (Number.isFinite(maxPositionResidual)) {
        details.push(`posErr=${formatCompactNumber(maxPositionResidual)}`);
      }
      if (Number.isFinite(positionResidualTolerance)) {
        details.push(`posTol=${formatCompactNumber(positionResidualTolerance)}`);
      }
      if (positionResidualStatus && positionResidualStatus !== "unchecked") {
        details.push(`posStatus=${formatCompactLabel(positionResidualStatus)}`);
      }
    }
    if (
      Number.isFinite(initialVelocityResidualSampleCount) &&
      initialVelocityResidualSampleCount > 0
    ) {
      details.push(`initVelRows=${initialVelocityResidualSampleCount}`);
      if (Number.isFinite(maxInitialVelocityResidual)) {
        details.push(`initVelErr=${formatCompactNumber(maxInitialVelocityResidual)}`);
      }
      if (Number.isFinite(initialVelocityResidualTolerance)) {
        details.push(`initVelTol=${formatCompactNumber(initialVelocityResidualTolerance)}`);
      }
      if (initialVelocityResidualStatus && initialVelocityResidualStatus !== "unchecked") {
        details.push(`initVelStatus=${formatCompactLabel(initialVelocityResidualStatus)}`);
      }
    }
    if (Number.isFinite(maxConstraintResidual)) {
      details.push(`solverResid=${formatCompactNumber(maxConstraintResidual)}`);
    }
    return details;
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
    const contributionScale = clamp(this.getWakeContributionMagnitude(link) / this.getAssemblyThreshold(), 0, 1);
    const usesWeakThresholdCue = this.weakContributionCueMode === WEAK_CONTRIBUTION_CUE_THRESHOLD_ONLY;
    const thresholdAlphaScale =
      !usesWeakThresholdCue
        ? 1
        : thresholdState === "below_threshold"
          ? 0.62
          : thresholdState === "near_threshold"
            ? 0.82
            : 1;
    const thresholdRadiusScale =
      !usesWeakThresholdCue
        ? 1
        : thresholdState === "below_threshold"
          ? 0.78
          : thresholdState === "near_threshold"
            ? 0.9
            : 1;
    if (status.status === "active") {
      return {
        status: status.status,
        reason: status.reason,
        contributionScale,
        alphaScale: thresholdAlphaScale,
        radiusScale: thresholdRadiusScale,
        desaturation: usesWeakThresholdCue && thresholdState === "below_threshold" ? 0.18 : 0,
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

  getWakeFalloff(link) {
    const endpoints = this.getWakeEndpoints(link);
    const distance = endpoints
      ? getDistance(endpoints.source, endpoints.receiver)
      : Number(link.distance);
    return distance > 0 ? 1 / distance : 0;
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
