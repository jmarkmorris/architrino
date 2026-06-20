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
const NOW_SLIDER_MAX = 1000;
const DEFAULT_ASSEMBLY_THRESHOLD = 0.00075;
const MIN_RETAINED_DEPTH_LIMIT = 2;
const FIELD_SPEED_MIN = 0.25;
const FIELD_SPEED_MAX = 2.5;
const DEFAULT_FIELD_SPEED_SCALE = 1;
const ARCHITRINO_KINDS = Object.freeze(["positrino", "electrino"]);
const ARCHITRINO_SPEED_FRACTIONS = Object.freeze([0.1, 0.3, 0.5, 0.7, 0.9, 0.99, 0.999, 0.9999, 0.99999, 0.999999]);
const DEFAULT_ARCHITRINO_SPEED_INDEX = 3;
const CENTRAL_PAIR_INTERACTION_REPLAY_MODE = "pairInteraction";
const VIRTUAL_OBSERVER = Object.freeze({ r: 74, g: 229, b: 255, a: 1 });
const DEFAULT_VIRTUAL_OBSERVER_POINT = Object.freeze({
  kind: "virtualObserver",
  label: "Virtual Observer",
  role: "observer",
  x: 1600,
  y: 540,
});
const SPACE_KEYS = new Set([" ", "Space", "Spacebar"]);
const SPACEBAR_NATIVE_CONTROL_TAGS = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA"]);
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

function createViewport(canvasWidth, canvasHeight) {
  const scale = Math.min(canvasWidth / DESIGN_WIDTH, canvasHeight / DESIGN_HEIGHT);
  return {
    scale,
    offsetX: (canvasWidth - DESIGN_WIDTH * scale) * 0.5,
    offsetY: (canvasHeight - DESIGN_HEIGHT * scale) * 0.5,
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
    this.isPlaying = true;
    this.fieldSpeedScale = this.normalizeFieldSpeedScale(options.fieldSpeedScale ?? DEFAULT_FIELD_SPEED_SCALE);
    this.architrinoSpeedIndex = this.normalizeArchitrinoSpeedIndex(
      options.architrinoSpeedIndex ?? DEFAULT_ARCHITRINO_SPEED_INDEX,
    );
    this.architrinoVelocityReference = {};
    this.presetId = getPresetById(
      options.presetId ?? getInitialQueryValue(this.window, "preset") ?? DEFAULT_PRESET_ID,
    ).id;
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
    this.retainedDepthLimit = this.normalizeRetainedDepthLimit(options.retainedDepthLimit);
    this.viewport = createViewport(DESIGN_WIDTH, DESIGN_HEIGHT);
    this.canvasWidth = DESIGN_WIDTH;
    this.canvasHeight = DESIGN_HEIGHT;
    this.pixelRatio = 1;
    this.selectedItem = null;
    this.dragState = null;
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
    this.populateHistoryDepthControls();
    this.updateSpeedControls();
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
      resetButton: queryRequiredElement(this.document, "#causal-delay-feedback-reset"),
      settingsButton: queryRequiredElement(this.document, "#causal-delay-feedback-settings"),
      settingsPanel: queryRequiredElement(this.document, "#causal-delay-feedback-settings-panel"),
      colorSwatches: queryRequiredElement(this.document, "#causal-delay-feedback-color-swatches"),
      nowInput: queryRequiredElement(this.document, "#causal-delay-feedback-now"),
      nowValue: queryRequiredElement(this.document, "#causal-delay-feedback-now-value"),
      cfSpeedInput: queryRequiredElement(this.document, "#causal-delay-feedback-cf-speed"),
      cfSpeedValue: queryRequiredElement(this.document, "#causal-delay-feedback-cf-speed-value"),
      architrinoSpeedInput: queryRequiredElement(this.document, "#causal-delay-feedback-architrino-speed"),
      architrinoSpeedValue: queryRequiredElement(this.document, "#causal-delay-feedback-architrino-speed-value"),
      historyDepthControls: queryRequiredElement(this.document, "#causal-delay-feedback-history-depth"),
      replayStatus: queryRequiredElement(this.document, "#causal-delay-feedback-replay-status"),
      hoverLabel: queryRequiredElement(this.document, "#causal-delay-feedback-hover-label"),
      readout: queryRequiredElement(this.document, "#causal-delay-feedback-readout"),
    };
  }

  populatePresets() {
    this.dom.preset.replaceChildren(
      ...PRESETS.map((preset) => {
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

  populateHistoryDepthControls() {
    const maxDepth = this.getMaxRetainedDepthLimit();
    const minDepth = Math.min(MIN_RETAINED_DEPTH_LIMIT, maxDepth);
    const options = [];
    for (let depth = minDepth; depth <= maxDepth; depth += 1) {
      options.push(depth);
    }
    this.dom.historyDepthControls.replaceChildren(
      ...options.map((depth) => {
        const button = this.document.createElement("button");
        button.type = "button";
        button.className = "causal-depth-button";
        button.textContent = String(depth);
        button.dataset.historyDepth = String(depth);
        button.setAttribute("aria-label", `${depth} retained path points`);
        return button;
      }),
    );
    this.updateHistoryDepthSelection();
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
      this.setPlaying(!this.isPlaying);
    });
    this.dom.resetButton.addEventListener("click", () => {
      this.resetReplayTime();
    });
    this.dom.settingsButton.addEventListener("click", () => {
      this.toggleSettings();
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
    this.dom.historyDepthControls.addEventListener("click", (event) => {
      const button = event.target.closest("[data-history-depth]");
      if (!button) {
        return;
      }
      this.setRetainedDepthLimit(Number(button.dataset.historyDepth));
    });
    this.dom.canvas.addEventListener("pointermove", (event) => {
      this.handleCanvasPointerMove(event);
    });
    this.dom.canvas.addEventListener("pointerdown", (event) => {
      this.handleCanvasPointerDown(event);
    });
    this.dom.canvas.addEventListener("contextmenu", (event) => {
      this.handleCanvasContextMenu(event);
    });
    this.dom.canvas.addEventListener("pointerleave", () => {
      if (!this.dragState) {
        this.dom.hoverLabel.hidden = true;
      }
    });
    this.window.addEventListener("pointerup", () => {
      void this.finishDrag();
    });
    this.window.addEventListener("pointercancel", () => {
      void this.finishDrag();
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
      const dataset =
        typeof adapter.createReplayAsync === "function"
          ? await adapter.createReplayAsync({ presetId, requestOptions })
          : adapter.createReplay({ presetId, requestOptions });
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

  applyReplayDataset(dataset, { loadState = this.replayLoadState } = {}) {
    this.dataset = dataset;
    this.replayLoadState = loadState;
    this.retainedDepthLimit = this.normalizeRetainedDepthLimit(this.retainedDepthLimit);
    this.applyDatasetCanvasColor(dataset);
    this.syncVirtualObserverState();
    this.updateWakeLinkGeometry();
    this.resetArchitrinoVelocityReference();
    this.syncReplayRequestOptionsFromDataset();
    if (this.dom?.preset) {
      this.dom.preset.value = this.presetId;
    }
    if (this.dom?.historyDepthControls) {
      this.populateHistoryDepthControls();
    }
    this.updateSpeedControls();
    this.updateReplayStatus();
  }

  syncReplayRequestOptionsFromDataset() {
    if (!this.dataset) {
      return;
    }
    this.replayRequestOptions = {
      ...this.replayRequestOptions,
      initialConditions: cloneJson(this.dataset.initialConditions ?? {}),
      virtualObserver: cloneJson(this.getVirtualObserver()),
      replayDataset: this.dataset,
      retainedDepthLimit: this.retainedDepthLimit,
      fieldSpeedScale: this.fieldSpeedScale,
      architrinoSpeedFraction: this.getArchitrinoSpeedFraction(),
    };
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
        const boundaryRelaxationMode =
          this.dataset?.pathConstraintBoundaryRelaxationMode ??
          this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationMode;
        const boundaryRelaxationIterationCount = Number(
          this.dataset?.pathConstraintBoundaryRelaxationIterationCount ??
            this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationIterationCount
        );
        const boundaryRelaxationResidualRatio = Number(
          this.dataset?.pathConstraintBoundaryRelaxationResidualRatio ??
            this.dataset?.solverSummary?.pathConstraintBoundaryRelaxationResidualRatio
        );
        const constraintSolverStatus =
          this.dataset?.pathConstraintSolverStatus ??
          this.dataset?.solverSummary?.pathConstraintSolverStatus;
        const constraintSolverClaim =
          this.dataset?.pathConstraintSolverClaim ??
          this.dataset?.solverSummary?.pathConstraintSolverClaim;
        const maxGuidanceAcceleration = Number(
          this.dataset?.maxPathConstraintGuidanceAcceleration ??
            this.dataset?.solverSummary?.maxPathConstraintGuidanceAcceleration
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
        const stepDetail = Number.isFinite(stepCount) ? ` steps=${stepCount}` : "";
        const lawDetail = interactionLaw ? ` law=${interactionLaw}` : "";
        const pathDetail = executionPath ? ` path=${executionPath}` : "";
        const residualDetail = Number.isFinite(maxConstraintResidual)
          ? ` residual=${formatCompactNumber(maxConstraintResidual)}`
          : "";
        const boundaryDetail =
          Number.isFinite(boundarySampleCount) && boundarySampleCount > 0
            ? ` boundary=${boundarySampleCount}${
                Number.isFinite(maxBoundaryResidual) ? ` maxB=${formatCompactNumber(maxBoundaryResidual)}` : ""
              }${
                Number.isFinite(boundaryTolerance) ? ` tolB=${formatCompactNumber(boundaryTolerance)}` : ""
              }`
            : "";
        const boundaryStatusDetail =
          boundaryStatus && boundaryStatus !== "unchecked" ? ` bStatus=${formatCompactLabel(boundaryStatus)}` : "";
        const boundaryModeDetail = boundaryMode ? ` bMode=${formatCompactLabel(boundaryMode)}` : "";
        const boundaryRelaxationDetail = boundaryRelaxationMode
          ? ` relax=${formatCompactLabel(boundaryRelaxationMode)}${
              Number.isFinite(boundaryRelaxationIterationCount)
                ? ` relaxIter=${boundaryRelaxationIterationCount}`
                : ""
            }${
              Number.isFinite(boundaryRelaxationResidualRatio)
                ? ` relaxRatio=${formatCompactNumber(boundaryRelaxationResidualRatio)}`
                : ""
            }`
          : "";
        const guidanceDetail = Number.isFinite(guidanceSampleCount) && guidanceSampleCount > 0
          ? ` guidance=${guidanceSampleCount}${
              guidanceMode ? ` mode=${guidanceMode}` : ""
            }${Number.isFinite(maxGuidanceAcceleration) ? ` maxA=${formatCompactNumber(maxGuidanceAcceleration)}` : ""}`
          : "";
        const constraintSolverDetail = constraintSolverStatus
          ? ` constraint=${constraintSolverStatus}${constraintSolverClaim ? ` claim=${constraintSolverClaim}` : ""}`
          : "";
        const guidanceBoundary = guidanceDetail
          ? guidanceMode === "retained_knot_boundary"
            ? " Retained path constraints used retained-knot boundary guidance; this is not yet the final physical boundary-value path solve."
            : " Retained path constraints used finite-time guidance; this is not yet the final physical boundary-value path solve."
          : "";
        return {
          state: guidanceDetail ? "bridge-guided" : "bridge",
          label: guidanceDetail ? "solver guided replay" : "solver pair replay",
          help:
            `Showing central solver bridge replay from one mutual pair-interaction path run${stepDetail}${lawDetail}${pathDetail}${residualDetail}${boundaryDetail}${boundaryStatusDetail}${boundaryModeDetail}${boundaryRelaxationDetail}${guidanceDetail}${constraintSolverDetail}. ` +
            `This replaces the segmented one-body seed replay for the default canvas path.${guidanceBoundary}`,
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
    this.updateHistoryDepthSelection();
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

  applyDatasetCanvasColor(dataset) {
    const colorId = dataset?.canvasColorId ?? dataset?.preset?.canvasColorId;
    if (!colorId) {
      return;
    }
    this.canvasColorId = getCanvasColorById(colorId).id;
    this.updateCanvasSwatchSelection();
  }

  syncVirtualObserverState() {
    const observer = this.getVirtualObserver() ?? DEFAULT_VIRTUAL_OBSERVER_POINT;
    this.setVirtualObserverPosition(observer);
  }

  updateCanvasSwatchSelection() {
    if (!this.dom?.colorSwatches) {
      return;
    }
    Array.from(this.dom.colorSwatches.children).forEach((button) => {
      button.classList.toggle("is-active", button.dataset.colorId === this.canvasColorId);
    });
  }

  updateHistoryDepthSelection() {
    if (!this.dom?.historyDepthControls) {
      return;
    }
    Array.from(this.dom.historyDepthControls.children).forEach((button) => {
      const isActive = Number(button.dataset.historyDepth) === this.retainedDepthLimit;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  updateSpeedControls() {
    this.updateFieldSpeedControl();
    this.updateArchitrinoSpeedControl();
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
      this.dom.architrinoSpeedValue.textContent = `${this.formatArchitrinoSpeedFraction(this.getArchitrinoSpeedFraction())} c_f`;
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
    const maxDepth = this.getMaxRetainedDepthLimit();
    const minDepth = Math.min(MIN_RETAINED_DEPTH_LIMIT, maxDepth);
    const numericDepth = Number(depthLimit);
    const candidate = Number.isFinite(numericDepth) ? Math.floor(numericDepth) : maxDepth;
    return clamp(candidate, minDepth, maxDepth);
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

  isSelectionVisible() {
    if (!this.selectedItem) {
      return true;
    }
    if (this.selectedItem.type === "history") {
      return this.isVisibleHistoryDepth(this.selectedItem.kind, this.selectedItem.depth);
    }
    if (this.selectedItem.type === "wake") {
      return this.getVisibleWakeLinks().some((link) => link.id === this.selectedItem.linkId);
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
    const help = this.isPlaying ? ICON_HELP.pause : ICON_HELP.play;
    this.dom.playButton.setAttribute("aria-label", help);
    this.dom.playButton.title = help;
    this.dom.playButton.dataset.tooltip = help;
    this.dom.playButton.innerHTML = this.isPlaying
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14"></path><path d="M16 5v14"></path></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l10-7z"></path></svg>';
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
    if (!SPACE_KEYS.has(event.key) && !SPACE_KEYS.has(event.code)) {
      return;
    }
    if (this.shouldIgnoreSpacebarTarget(event.target)) {
      return;
    }
    event.preventDefault();
    this.setPlaying(!this.isPlaying);
  }

  shouldIgnoreSpacebarTarget(target) {
    if (!target) {
      return false;
    }
    if (target.isContentEditable) {
      return true;
    }
    const tagName = String(target.tagName ?? "").toUpperCase();
    return SPACEBAR_NATIVE_CONTROL_TAGS.has(tagName);
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
    this.viewport = createViewport(this.canvasWidth, this.canvasHeight);
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

  render(replayTime = this.getCurrentReplayTime()) {
    const ctx = this.context;
    ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawBackground(ctx);
    this.drawWakes(ctx, replayTime);
    this.drawPathTrail(ctx, "positrino", POSITRINO);
    this.drawPathTrail(ctx, "electrino", ELECTRINO);
    this.drawInitialVelocityHandles(ctx);
    this.drawHistoryPoints(ctx, "positrino", POSITRINO);
    this.drawHistoryPoints(ctx, "electrino", ELECTRINO);
    this.drawVirtualObserver(ctx);
    this.drawSelection(ctx);
    this.drawLiveMarkers(ctx, replayTime);
  }

  drawBackground(ctx) {
    const canvasColor = getCanvasColorById(this.canvasColorId).color;
    ctx.fillStyle = canvasColor;
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    const xAxisStart = this.worldToScreen({ x: 92, y: 908 });
    const xAxisEnd = this.worldToScreen({ x: 1810, y: 908 });
    const yAxisStart = this.worldToScreen({ x: 92, y: 908 });
    const yAxisEnd = this.worldToScreen({ x: 92, y: 182 });
    this.drawLine(ctx, [xAxisStart, xAxisEnd], withAlpha(WHITE, 0.42), 1.2);
    this.drawLine(ctx, [yAxisStart, yAxisEnd], withAlpha(WHITE, 0.32), 1.2);

    this.drawTriangle(ctx, [
      this.worldToScreen({ x: 1810, y: 908 }),
      this.worldToScreen({ x: 1796, y: 900 }),
      this.worldToScreen({ x: 1796, y: 916 }),
    ], withAlpha(WHITE, 0.48));
    this.drawTriangle(ctx, [
      this.worldToScreen({ x: 92, y: 182 }),
      this.worldToScreen({ x: 84, y: 196 }),
      this.worldToScreen({ x: 100, y: 196 }),
    ], withAlpha(WHITE, 0.3));

    this.drawText(ctx, "space", { x: 74, y: 165 }, 14, withAlpha(WHITE, 0.62), "left");
    this.drawText(ctx, "time", { x: 1788, y: 932 }, 14, withAlpha(WHITE, 0.72), "right");
  }

  drawWakes(ctx, replayTime = this.getCurrentReplayTime()) {
    if (this.dataset.wakeArcDisplayMode === FULL_CIRCULAR_ARCS) {
      this.drawFullCircularWakes(ctx, replayTime);
      return;
    }
    this.getVisibleWakeLinks().forEach((link) => {
      this.drawWakeProgression(ctx, link, replayTime);
    });
  }

  drawFullCircularWakes(ctx, replayTime) {
    this.getVisibleWakeLinks().forEach((link) => {
      this.drawFullCircularWakeProgression(ctx, link, replayTime);
    });
  }

  drawFullCircularWakeProgression(ctx, link, replayTime) {
    const timing = this.getWakeTiming(link, replayTime);
    if (!this.shouldDrawWakeSeries(timing)) {
      return;
    }
    const preset = this.dataset.preset;
    const visualWeight = this.getWakeVisualWeight(link);
    const radius = getDistance(timing.source, timing.receiver);
    const bandCount = Math.max(2, preset.wakeBands);
    const alpha = (preset.fullCircleAlpha ?? 0.14) * preset.alphaScale * visualWeight.alphaScale;
    const color = withAlpha(mixColor(link.color, WHITE, 0.2 + visualWeight.desaturation * 0.5), alpha);
    const dotRadius = Math.max(0.9, preset.dotRadius * visualWeight.radiusScale);
    const visibleProgress = clamp(timing.progress, 0, 1);

    for (let index = 0; index < bandCount + 1; index += 1) {
      const progress = (index + 1) / bandCount;
      if (progress <= 0 || progress > visibleProgress) {
        continue;
      }
      this.drawDottedArc(ctx, timing.source, radius * progress, 0, 360, color, dotRadius);
    }
  }

  drawWakeProgression(ctx, link, replayTime) {
    const timing = this.getWakeTiming(link, replayTime);
    if (!this.shouldDrawWakeSeries(timing)) {
      return;
    }
    const preset = this.dataset.preset;
    const radius = getDistance(timing.source, timing.receiver);
    const theta = getAngleDegrees(timing.source, timing.receiver);
    const falloffWeight = Math.pow(link.weight, preset.falloffPower);
    const bandCount = Math.max(2, preset.wakeBands);
    const visualWeight = this.getWakeVisualWeight(link);

    this.drawWakeBuildProgression(ctx, link, {
      source: timing.source,
      radius,
      theta,
      falloffWeight,
      bandCount,
      buildProgress: timing.progress,
      visualWeight,
    });
  }

  drawWakeBuildProgression(ctx, link, { source, radius, theta, falloffWeight, bandCount, buildProgress, visualWeight }) {
    const preset = this.dataset.preset;
    const visibleProgress = clamp(buildProgress, 0.02, 1);

    for (let index = 0; index < bandCount + 1; index += 1) {
      const progress = (index + 1) / bandCount;
      if (progress <= 0 || progress > visibleProgress) {
        continue;
      }
      const bandRadius = radius * progress;
      const wakeSpan = preset.startSpan + (preset.finalSpan - preset.startSpan) * progress;
      const frontDistance = clamp((visibleProgress - progress) * bandCount, 0, 1);
      const frontBias = 1 - frontDistance;
      const alpha =
        ((70 + 138 * frontBias) / 255) *
        (0.48 + 0.52 * falloffWeight) *
        preset.alphaScale *
        visualWeight.alphaScale;
      const dotRadius =
        preset.dotRadius *
        (0.82 + 0.38 * frontBias) *
        (0.72 + 0.3 * falloffWeight) *
        visualWeight.radiusScale;
      const wakeColor = mixColor(link.color, WHITE, visualWeight.desaturation);
      this.drawDottedArc(
        ctx,
        source,
        bandRadius,
        theta - wakeSpan * 0.5,
        theta + wakeSpan * 0.5,
        withAlpha(wakeColor, alpha),
        Math.max(1.05, dotRadius),
      );
    }
  }

  drawPathTrail(ctx, kind, color) {
    const points = this.dataset.paths[kind].map((point) => this.worldToScreen(point));
    this.drawLine(ctx, points, withAlpha(mixColor(color, WHITE, 0.45), 0.32), 14);

    for (let index = 0; index < points.length - 1; index += 1) {
      const progress = index / Math.max(1, points.length - 1);
      this.drawLine(ctx, [points[index], points[index + 1]], withAlpha(color, 0.36 + 0.54 * progress), 3 + 3.4 * progress);
    }
  }

  drawHistoryPoints(ctx, kind, color) {
    this.getVisibleHistory(kind).forEach((point) => {
      const screen = this.worldToScreen(point);
      this.drawCircle(ctx, screen, 8.5, withAlpha({ r: 8, g: 6, b: 18, a: 1 }, 0.82), withAlpha(WHITE, 0.68), 1.2);
      this.drawCircle(ctx, screen, 4.3, color);
      const offset = kind === "positrino" ? { x: 14, y: -13 } : { x: 14, y: 15 };
      this.drawScreenText(ctx, String(point.depth), { x: screen.x + offset.x * this.viewport.scale, y: screen.y + offset.y * this.viewport.scale }, 13, withAlpha(WHITE, 0.82), "center", "bold");
    });
  }

  drawInitialVelocityHandles(ctx) {
    this.drawInitialVelocityHandle(ctx, "positrino", POSITRINO);
    this.drawInitialVelocityHandle(ctx, "electrino", ELECTRINO);
  }

  drawInitialVelocityHandle(ctx, kind, color) {
    const condition = this.getInitialCondition(kind);
    if (!condition) {
      return;
    }
    const point = this.getInitialVelocityAnchorPoint(kind, condition);
    const velocityEnd = this.initialConditionVelocityEnd(condition, point);
    const screen = this.worldToScreen(point);
    const velocityScreen = this.worldToScreen(velocityEnd);
    this.drawLine(ctx, [screen, velocityScreen], withAlpha(mixColor(color, WHITE, 0.42), 0.46), 2);
    this.drawCircle(ctx, velocityScreen, 5.6, withAlpha(color, 0.62), withAlpha(WHITE, 0.58), 1);
  }

  drawVirtualObserver(ctx) {
    const observer = this.getVirtualObserver();
    if (!observer) {
      return;
    }
    const screen = this.worldToScreen(observer);
    const arm = 18 * this.viewport.scale;
    this.drawCircle(ctx, screen, 22, withAlpha(VIRTUAL_OBSERVER, 0.1), withAlpha(VIRTUAL_OBSERVER, 0.58), 1.2);
    this.drawCircle(ctx, screen, 8.4, withAlpha({ r: 8, g: 6, b: 18, a: 1 }, 0.86), withAlpha(WHITE, 0.74), 1);
    this.drawCircle(ctx, screen, 3.6, VIRTUAL_OBSERVER);
    this.drawLine(ctx, [{ x: screen.x - arm, y: screen.y }, { x: screen.x + arm, y: screen.y }], withAlpha(VIRTUAL_OBSERVER, 0.54), 1.2);
    this.drawLine(ctx, [{ x: screen.x, y: screen.y - arm }, { x: screen.x, y: screen.y + arm }], withAlpha(VIRTUAL_OBSERVER, 0.54), 1.2);
    const label = this.getVirtualObserverLabelPlacement(screen);
    this.drawScreenText(ctx, "Virtual Observer", label, 13, withAlpha(WHITE, 0.76), label.align, "bold");
  }

  getVirtualObserverLabelPlacement(screen, text = "Virtual Observer", size = 13) {
    const fontSize = Math.max(9, size * this.viewport.scale);
    const estimatedWidth = text.length * fontSize * 0.68;
    const labelGap = Math.max(12, 30 * this.viewport.scale);
    const rightPadding = Math.max(12, 28 * this.viewport.scale);
    const labelY = screen.y - Math.max(12, 20 * this.viewport.scale);
    if (screen.x + labelGap + estimatedWidth > this.canvasWidth - rightPadding) {
      return {
        x: screen.x - labelGap,
        y: labelY,
        align: "right",
      };
    }
    return {
      x: screen.x + labelGap,
      y: labelY,
      align: "left",
    };
  }

  drawSelection(ctx) {
    if (!this.selectedItem) {
      return;
    }
    if (this.selectedItem.type === "history") {
      const point = this.getVisibleHistory(this.selectedItem.kind).find(
        (candidate) => candidate.depth === this.selectedItem.depth,
      );
      if (!point) {
        return;
      }
      const screen = this.worldToScreen(point);
      this.drawCircle(ctx, screen, 18, withAlpha(WHITE, 0.05), withAlpha(WHITE, 0.86), 1.4);
      return;
    }
    if (this.selectedItem.type === "initial-velocity") {
      const condition = this.getInitialCondition(this.selectedItem.kind);
      if (!condition) {
        return;
      }
      const screen = this.worldToScreen(this.initialConditionVelocityEnd(condition));
      this.drawCircle(ctx, screen, 18, withAlpha(WHITE, 0.05), withAlpha(WHITE, 0.9), 1.4);
      return;
    }
    if (this.selectedItem.type === "virtual-observer") {
      const observer = this.getVirtualObserver();
      if (!observer) {
        return;
      }
      const screen = this.worldToScreen(observer);
      this.drawCircle(ctx, screen, 30, withAlpha(VIRTUAL_OBSERVER, 0.08), withAlpha(WHITE, 0.9), 1.5);
      return;
    }

    const link = this.getVisibleWakeLinks().find((candidate) => candidate.id === this.selectedItem.linkId);
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
      x: 16,
      y: 24,
    });
    this.drawLiveMarker(ctx, "electrino", ELECTRINO, this.getReplayPathPoint("electrino", replayTime), "electrino", {
      x: 16,
      y: -30,
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
      "left",
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

  updateHoverLabel(event) {
    const rect = this.dom.canvas.getBoundingClientRect();
    const screen = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    const hit = this.findNearestHit(screen, { includeWakes: true });
    if (!hit) {
      this.dom.hoverLabel.hidden = true;
      return;
    }
    this.dom.hoverLabel.textContent = this.createHoverLabel(hit);
    this.dom.hoverLabel.style.left = `${event.clientX}px`;
    this.dom.hoverLabel.style.top = `${event.clientY}px`;
    this.dom.hoverLabel.hidden = false;
  }

  createHoverLabel(hit) {
    if (hit?.type !== "wake") {
      return hit?.label ?? "";
    }
    const hoverDetails = (hit.details ?? []).filter((detail) => (
      detail.startsWith("emit=") ||
      detail.startsWith("hit=") ||
      detail.startsWith("travel=") ||
      detail.startsWith("contrib=") ||
      detail.startsWith("state=") ||
      detail.startsWith("reason=") ||
      detail.startsWith("solver=")
    ));
    return [hit.label, ...hoverDetails].join("  ");
  }

  handleCanvasPointerMove(event) {
    if (this.dragState) {
      if (this.dragState.type === "initial-velocity") {
        this.dragSelectedInitialVelocity(event);
      } else if (this.dragState.type === "virtual-observer") {
        this.dragSelectedVirtualObserver(event);
      } else {
        this.dragSelectedHistoryPoint(event);
      }
      return;
    }
    this.updateHoverLabel(event);
  }

  handleCanvasPointerDown(event) {
    const rect = this.dom.canvas.getBoundingClientRect();
    const screen = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    const hit = this.findNearestHit(screen, { includeWakes: true });
    if (!hit) {
      this.selectedItem = null;
      this.updateReadout();
      this.render();
      return;
    }
    this.selectedItem = hit.selection;
    this.updateReadout(hit);
    if (hit.type === "initial-velocity") {
      this.startInitialVelocityDrag(event, hit);
    } else if (hit.type === "virtual-observer") {
      this.startVirtualObserverDrag(event, hit);
    } else if (hit.type === "history") {
      this.startHistoryPointDrag(event, hit);
    }
    this.render();
  }

  async handleCanvasContextMenu(event) {
    const rect = this.dom.canvas.getBoundingClientRect();
    const screen = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    const insertion = this.findNearestPathInsertion(screen);
    if (!insertion) {
      return;
    }
    event.preventDefault();
    const point = this.addReceptionPointAtPath(insertion.kind, insertion);
    if (!point) {
      return;
    }
    this.selectedItem = { type: "history", kind: point.kind, depth: point.depth };
    this.updateReadout(this.createHistoryHit(point, 0));
    this.render();
    return this.submitReceptionPointInsertion();
  }

  async submitReceptionPointInsertion() {
    if (this.usesFallbackReplayOnly() || this.shouldUseRepresentativeReplayOnly(this.presetId)) {
      return this.dataset;
    }
    const selectedItem = this.selectedItem ? { ...this.selectedItem } : null;
    const dataset = await this.loadReplay({
      requestOptions: this.replayRequestOptions,
      preserveDraftOnFailure: true,
    });
    if (this.canRestoreSelectedHistoryItem(selectedItem)) {
      this.selectedItem = selectedItem;
      this.updateReadout();
      this.render();
    }
    return dataset;
  }

  canRestoreSelectedHistoryItem(selectedItem) {
    if (selectedItem?.type !== "history") {
      return false;
    }
    return this.getVisibleHistory(selectedItem.kind).some((point) => point.depth === selectedItem.depth);
  }

  startHistoryPointDrag(event, hit) {
    const rect = this.dom.canvas.getBoundingClientRect();
    const screen = { x: event.clientX - rect.left, y: event.clientY - rect.top };
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
    event.preventDefault();
  }

  startInitialVelocityDrag(event, hit) {
    const rect = this.dom.canvas.getBoundingClientRect();
    const screen = { x: event.clientX - rect.left, y: event.clientY - rect.top };
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

  startVirtualObserverDrag(event, hit) {
    const rect = this.dom.canvas.getBoundingClientRect();
    const screen = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    this.dragState = {
      type: "virtual-observer",
      lastWorld: this.screenToWorld(screen),
      didEdit: false,
    };
    this.setPlaying(false);
    if (typeof this.dom.canvas.setPointerCapture === "function") {
      this.dom.canvas.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
  }

  dragSelectedHistoryPoint(event) {
    const rect = this.dom.canvas.getBoundingClientRect();
    const screen = { x: event.clientX - rect.left, y: event.clientY - rect.top };
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

  dragSelectedVirtualObserver(event) {
    const rect = this.dom.canvas.getBoundingClientRect();
    const screen = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    const world = this.screenToWorld(screen);
    const delta = {
      x: world.x - this.dragState.lastWorld.x,
      y: world.y - this.dragState.lastWorld.y,
    };
    this.dragState.lastWorld = world;
    if (this.applyVirtualObserverDrag(delta)) {
      this.dragState.didEdit = true;
      this.updateReadout();
      this.render();
    }
  }

  finishDrag() {
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
    if (completedDrag.type === "initial-velocity" || completedDrag.type === "virtual-observer") {
      return true;
    }
    return completedDrag.type === "history";
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

  applyVirtualObserverDrag(delta) {
    if (!delta || (delta.x === 0 && delta.y === 0)) {
      return false;
    }
    const observer = this.getVirtualObserver();
    if (!observer) {
      return false;
    }
    this.setVirtualObserverPosition({
      x: observer.x + delta.x,
      y: observer.y + delta.y,
    });
    this.syncReplayRequestOptionsFromDataset();
    this.markDraftPreview("virtual_observer_drag_preview", { staleSolverRows: false });
    return true;
  }

  addReceptionPointAtPath(kind, point) {
    if (!this.dataset?.history?.[kind] || !point) {
      return null;
    }
    const insertedPoint = this.insertHistoryPoint(kind, point);
    if (!insertedPoint) {
      return null;
    }

    this.renumberHistoryPoints(kind);
    const oppositeKind = kind === "positrino" ? "electrino" : "positrino";
    const oppositePoint = this.getReplayPathPoint(oppositeKind, insertedPoint.t);
    if (this.insertHistoryPoint(oppositeKind, oppositePoint)) {
      this.renumberHistoryPoints(oppositeKind);
    }
    this.syncHistoryDepthState();
    this.rebuildWakeLinksFromHistory();
    this.retainedDepthLimit = this.getMaxRetainedDepthLimit();
    this.syncReplayRequestOptionsFromDataset();
    this.markDraftPreview("reception_point_insert_preview", { staleSolverRows: false });
    if (this.dom?.historyDepthControls) {
      this.populateHistoryDepthControls();
    }
    return insertedPoint;
  }

  insertHistoryPoint(kind, point) {
    const rows = this.dataset?.history?.[kind];
    if (!Array.isArray(rows) || !point) {
      return null;
    }
    const historyPoint = {
      kind,
      t: Number(point.t),
      x: Number(point.x),
      y: Number(point.y),
      weight: 1,
      state: "active",
    };
    if (
      !Number.isFinite(historyPoint.t) ||
      !Number.isFinite(historyPoint.x) ||
      !Number.isFinite(historyPoint.y)
    ) {
      return null;
    }
    if (rows.some((row) => Math.abs(row.t - historyPoint.t) <= TIME_EPSILON)) {
      return null;
    }
    rows.push(historyPoint);
    return historyPoint;
  }

  renumberHistoryPoints(kind) {
    const rows = this.dataset?.history?.[kind];
    if (!Array.isArray(rows)) {
      return;
    }
    rows.sort((left, right) => left.t - right.t);
    const count = rows.length;
    rows.forEach((point, index) => {
      point.kind = kind;
      point.depth = index + 1;
      point.weight = count > 1 ? (index + 1) / count : 1;
      point.state = this.getHistoryPointState(index, count);
    });
  }

  getHistoryPointState(index, count) {
    if (index === 0) {
      return "older";
    }
    if (index === count - 1) {
      return "newer";
    }
    return "active";
  }

  syncHistoryDepthState() {
    const maxDepth = Math.max(
      1,
      ...Object.values(this.dataset?.history ?? {})
        .flat()
        .map((point) => Number(point.depth))
        .filter(Number.isFinite),
    );
    if (!this.dataset.initialConditions) {
      this.dataset.initialConditions = {};
    }
    this.dataset.initialConditions.historyDepth = maxDepth;
  }

  rebuildWakeLinksFromHistory() {
    const links = [];
    this.appendHistoryWakeLinks(links, "positrino", "electrino");
    this.appendHistoryWakeLinks(links, "electrino", "positrino");
    this.dataset.wakeLinks = links;
  }

  appendHistoryWakeLinks(links, sourceKind, receiverKind) {
    const sourceRows = this.dataset?.history?.[sourceKind] ?? [];
    const receiverRows = this.dataset?.history?.[receiverKind] ?? [];
    const maxDepth = Math.max(sourceRows.length, receiverRows.length);
    for (let depth = 1; depth < maxDepth; depth += 1) {
      const source = sourceRows.find((point) => point.depth === depth);
      const receiver = receiverRows.find((point) => point.depth === depth + 1);
      if (!source || !receiver || receiver.t <= source.t) {
        continue;
      }
      links.push(this.createHistoryWakeLink(sourceKind, receiverKind, source, receiver));
    }
  }

  createHistoryWakeLink(sourceKind, receiverKind, source, receiver) {
    return {
      id: `${sourceKind}-${source.depth}-to-${receiverKind}-${receiver.depth}`,
      label: `${this.getKindShortLabel(sourceKind)} ${source.depth} -> ${this.getKindShortLabel(receiverKind)} ${receiver.depth}`,
      sourceKind,
      receiverKind,
      sourceDepth: source.depth,
      receiverDepth: receiver.depth,
      source: { x: source.x, y: source.y, t: source.t },
      receiver: { x: receiver.x, y: receiver.y, t: receiver.t },
      emissionTime: source.t,
      hitTime: receiver.t,
      travelTime: receiver.t - source.t,
      color: this.getWakeColorForKind(sourceKind),
      weight: Math.min(source.weight, receiver.weight),
      mode: this.dataset.wakeArcDisplayMode,
    };
  }

  getKindShortLabel(kind) {
    return kind === "positrino" ? "red" : "blue";
  }

  getWakeColorForKind(kind) {
    return kind === "positrino" ? POSITRINO_WAKE : ELECTRINO_WAKE;
  }

  markDraftPreview(reason, { staleSolverRows = true } = {}) {
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
    };
    this.replayLoadState = "draft";
    this.replayLoadError = null;
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
    const centerT = selectedPoint.t;
    const influenceWidth = 0.17;
    this.dataset.paths[kind].forEach((point) => {
      const weight = Math.exp(-Math.pow((point.t - centerT) / influenceWidth, 2));
      point.x += delta.x * weight;
      point.y += delta.y * weight;
    });
    this.dataset.frames.forEach((frame) => {
      const point = frame[kind];
      if (!point || this.dataset.paths[kind].includes(point)) {
        return;
      }
      const sampleT = Number.isFinite(Number(point.t)) ? Number(point.t) : Number(frame.t);
      const weight = Math.exp(-Math.pow((sampleT - centerT) / influenceWidth, 2));
      point.x += delta.x * weight;
      point.y += delta.y * weight;
    });
    this.dataset.history[kind].forEach((point) => {
      const weight = point.depth === depth ? 1 : Math.exp(-Math.pow((point.t - centerT) / influenceWidth, 2));
      point.x += delta.x * weight;
      point.y += delta.y * weight;
    });
    this.syncPathSamplesToHistoryPoint(kind, selectedPoint);
    this.syncInitialConditionToHistoryStart(kind, selectedPoint);
    return true;
  }

  syncPathSamplesToHistoryPoint(kind, historyPoint) {
    const targetT = Number(historyPoint?.t);
    if (!Number.isFinite(targetT)) {
      return;
    }
    const syncPoint = (point, fallbackT = point?.t) => {
      const sampleT = Number(fallbackT);
      if (!point || !Number.isFinite(sampleT) || Math.abs(sampleT - targetT) > TIME_EPSILON) {
        return;
      }
      point.x = Number(historyPoint.x) || 0;
      point.y = Number(historyPoint.y) || 0;
    };
    (this.dataset.paths?.[kind] ?? []).forEach((point) => syncPoint(point));
    (this.dataset.frames ?? []).forEach((frame) => {
      const point = frame?.[kind];
      const sampleT = Number.isFinite(Number(point?.t)) ? Number(point.t) : Number(frame?.t);
      syncPoint(point, sampleT);
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
    if (!Number.isFinite(previousReplayTime) || !Number.isFinite(replayTime)) {
      return null;
    }
    const [start, end] = this.getReplayTimeRange();
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
      return null;
    }

    const candidates = [];
    this.getVisibleWakeLinks().forEach((link) => {
      const timing = this.getWakeTiming(link, replayTime);
      const receiverT = timing?.receiverT;
      if (!Number.isFinite(receiverT)) {
        return;
      }
      const advance = this.getReplayTimeAdvanceToCrossedPoint(previousReplayTime, replayTime, receiverT, start, end);
      if (Number.isFinite(advance)) {
        candidates.push({ replayTime: receiverT, advance });
      }
    });

    candidates.sort((left, right) => left.advance - right.advance);
    return candidates[0]?.replayTime ?? null;
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

  getVirtualObserver() {
    return this.dataset?.virtualObserver ?? this.dataset?.initialConditions?.virtualObserver ?? null;
  }

  setVirtualObserverPosition(point) {
    if (!this.dataset || !point) {
      return null;
    }
    const current = this.getVirtualObserver() ?? {
      ...DEFAULT_VIRTUAL_OBSERVER_POINT,
    };
    const next = {
      ...current,
      kind: "virtualObserver",
      label: current.label ?? "Virtual Observer",
      role: current.role ?? "observer",
      x: Number(point.x) || 0,
      y: Number(point.y) || 0,
    };
    this.dataset.virtualObserver = next;
    if (!this.dataset.initialConditions) {
      this.dataset.initialConditions = {};
    }
    this.dataset.initialConditions.virtualObserver = { ...next };
    return next;
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
    };
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
    if (this.selectedItem?.type === "virtual-observer") {
      const observer = this.getVirtualObserver();
      return observer ? this.createVirtualObserverHit(observer, 0) : null;
    }
    if (this.selectedItem?.type === "history") {
      const point = this.getVisibleHistory(this.selectedItem.kind).find(
        (candidate) => candidate.depth === this.selectedItem.depth,
      );
      return point ? this.createHistoryHit(point, 0) : null;
    }
    if (this.selectedItem?.type === "wake") {
      const link = this.getVisibleWakeLinks().find((candidate) => candidate.id === this.selectedItem.linkId);
      return link ? this.createWakeHit(link, 0) : null;
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

  findNearestPathInsertion(screen) {
    const candidates = [];
    ["positrino", "electrino"].forEach((kind) => {
      const points = this.dataset?.paths?.[kind] ?? [];
      for (let index = 0; index < points.length - 1; index += 1) {
        const left = points[index];
        const right = points[index + 1];
        const start = this.worldToScreen(left);
        const end = this.worldToScreen(right);
        const projection = this.projectScreenPointToSegment(screen, start, end);
        const amount = projection.amount;
        candidates.push({
          kind,
          distance: projection.distance,
          x: left.x + (right.x - left.x) * amount,
          y: left.y + (right.y - left.y) * amount,
          t: left.t + (right.t - left.t) * amount,
        });
      }
    });
    const nearest = candidates.sort((left, right) => left.distance - right.distance)[0];
    return nearest && nearest.distance <= 28 ? nearest : null;
  }

  projectScreenPointToSegment(point, start, end) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const lengthSquared = dx * dx + dy * dy;
    if (lengthSquared === 0) {
      return {
        amount: 0,
        distance: Math.hypot(point.x - start.x, point.y - start.y),
      };
    }
    const amount = clamp(((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSquared, 0, 1);
    return {
      amount,
      distance: Math.hypot(point.x - (start.x + dx * amount), point.y - (start.y + dy * amount)),
    };
  }

  findNearestHit(screen, { includeWakes = false } = {}) {
    const velocityCandidates = [];
    ["positrino", "electrino"].forEach((kind) => {
      const condition = this.getInitialCondition(kind);
      if (!condition) {
        return;
      }
      const candidate = this.worldToScreen(
        this.initialConditionVelocityEnd(condition, this.getInitialVelocityAnchorPoint(kind, condition)),
      );
      const distance = Math.hypot(screen.x - candidate.x, screen.y - candidate.y);
      velocityCandidates.push(this.createInitialVelocityHit(kind, condition, distance));
    });
    const nearestVelocity = velocityCandidates.sort((a, b) => a.distance - b.distance)[0];
    if (nearestVelocity && nearestVelocity.distance <= nearestVelocity.hitRadius) {
      return nearestVelocity;
    }

    const historyCandidates = [];
    ["positrino", "electrino"].forEach((kind) => {
      this.getVisibleHistory(kind).forEach((point) => {
        const candidate = this.worldToScreen(point);
        const distance = Math.hypot(screen.x - candidate.x, screen.y - candidate.y);
        historyCandidates.push(this.createHistoryHit(point, distance));
      });
    });
    const nearestHistory = historyCandidates.sort((a, b) => a.distance - b.distance)[0];
    if (nearestHistory && nearestHistory.distance <= nearestHistory.hitRadius) {
      return nearestHistory;
    }

    const observer = this.getVirtualObserver();
    if (observer) {
      const candidate = this.worldToScreen(observer);
      const distance = Math.hypot(screen.x - candidate.x, screen.y - candidate.y);
      const observerHit = this.createVirtualObserverHit(observer, distance);
      if (observerHit.distance <= observerHit.hitRadius) {
        return observerHit;
      }
    }

    const candidates = [];
    if (includeWakes) {
      this.getVisibleWakeLinks().forEach((link) => {
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

  createVirtualObserverHit(observer, distance) {
    const summary = this.getContributionSummary(this.getCurrentReplayTime());
    return {
      type: "virtual-observer",
      title: "Virtual Observer",
      label: "Virtual Observer",
      details: [
        `x=${Math.round(Number(observer.x) || 0)}`,
        `y=${Math.round(Number(observer.y) || 0)}`,
        ...(summary
          ? [
              `received=${summary.receivedCount}/${summary.activeLinkCount}`,
              `net=${formatCompactNumber(summary.netContribution)}`,
            ]
          : []),
        ...this.createDraftSolverRejectionReadoutDetails(),
      ],
      distance,
      hitRadius: 28,
      selection: { type: "virtual-observer" },
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
    const wakeLinks = this.getVisibleWakeLinks();
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
    const boundaryRelaxationMode =
      this.dataset?.pathConstraintBoundaryRelaxationMode ?? summary.pathConstraintBoundaryRelaxationMode;
    const boundaryRelaxationIterationCount = Number(
      this.dataset?.pathConstraintBoundaryRelaxationIterationCount ??
        summary.pathConstraintBoundaryRelaxationIterationCount,
    );
    const boundaryRelaxationResidualRatio = Number(
      this.dataset?.pathConstraintBoundaryRelaxationResidualRatio ??
        summary.pathConstraintBoundaryRelaxationResidualRatio,
    );
    const constraintSolverStatus = this.dataset?.pathConstraintSolverStatus ?? summary.pathConstraintSolverStatus;
    const constraintSolverClaim = this.dataset?.pathConstraintSolverClaim ?? summary.pathConstraintSolverClaim;
    const maxGuidanceAcceleration = Number(
      this.dataset?.maxPathConstraintGuidanceAcceleration ?? summary.maxPathConstraintGuidanceAcceleration,
    );
    const boundarySampleCount = Number(
      this.dataset?.pathConstraintBoundaryResidualSampleCount ?? summary.pathConstraintBoundaryResidualSampleCount,
    );
    const boundaryStatus =
      this.dataset?.pathConstraintBoundaryResidualStatus ?? summary.pathConstraintBoundaryResidualStatus;
    const boundaryTolerance = Number(
      this.dataset?.pathConstraintBoundaryResidualTolerance ?? summary.pathConstraintBoundaryResidualTolerance,
    );
    const maxBoundaryResidual = Number(
      this.dataset?.maxPathConstraintBoundaryResidual ?? summary.maxPathConstraintBoundaryResidual,
    );
    const maxConstraintResidual = Number(
      this.dataset?.maxPathConstraintResidual ?? summary.maxPathConstraintResidual,
    );
    const details = [];
    if (Number.isFinite(guidanceSampleCount) && guidanceSampleCount > 0) {
      details.push(`guide=${formatCompactLabel(guidanceMode, "guided")}`);
      if (boundaryMode) {
        details.push(`bMode=${formatCompactLabel(boundaryMode)}`);
      }
      if (boundaryRelaxationMode) {
        details.push(`relax=${formatCompactLabel(boundaryRelaxationMode)}`);
        if (Number.isFinite(boundaryRelaxationIterationCount)) {
          details.push(`relaxIter=${boundaryRelaxationIterationCount}`);
        }
        if (Number.isFinite(boundaryRelaxationResidualRatio)) {
          details.push(`relaxRatio=${formatCompactNumber(boundaryRelaxationResidualRatio)}`);
        }
      }
      details.push(`guideRows=${guidanceSampleCount}`);
      if (Number.isFinite(maxGuidanceAcceleration)) {
        details.push(`maxA=${formatCompactNumber(maxGuidanceAcceleration)}`);
      }
    }
    if (constraintSolverStatus) {
      details.push(`constraint=${formatCompactLabel(constraintSolverStatus)}`);
    }
    if (constraintSolverClaim) {
      details.push(`claim=${formatCompactLabel(constraintSolverClaim)}`);
    }
    if (Number.isFinite(boundarySampleCount) && boundarySampleCount > 0) {
      details.push(`boundary=${boundarySampleCount}`);
      if (Number.isFinite(maxBoundaryResidual)) {
        details.push(`maxB=${formatCompactNumber(maxBoundaryResidual)}`);
      }
      if (Number.isFinite(boundaryTolerance)) {
        details.push(`tolB=${formatCompactNumber(boundaryTolerance)}`);
      }
    }
    if (boundaryStatus && boundaryStatus !== "unchecked") {
      details.push(`bStatus=${formatCompactLabel(boundaryStatus)}`);
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
    const thresholdAlphaScale =
      thresholdState === "below_threshold" ? 0.62 : thresholdState === "near_threshold" ? 0.82 : 1;
    const thresholdRadiusScale =
      thresholdState === "below_threshold" ? 0.78 : thresholdState === "near_threshold" ? 0.9 : 1;
    if (status.status === "active") {
      return {
        status: status.status,
        reason: status.reason,
        contributionScale,
        alphaScale: thresholdAlphaScale,
        radiusScale: thresholdRadiusScale,
        desaturation: thresholdState === "below_threshold" ? 0.18 : 0,
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
    const observer = this.getVirtualObserver();
    const distance = endpoints && observer
      ? getDistance(endpoints.receiver, observer)
      : endpoints
        ? getDistance(endpoints.source, endpoints.receiver)
        : Number(link.distance);
    return distance > 0 ? 1 / distance : 0;
  }

  getScreenDistanceToSegment(point, start, end) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const lengthSquared = dx * dx + dy * dy;
    if (lengthSquared === 0) {
      return Math.hypot(point.x - start.x, point.y - start.y);
    }
    const t = clamp(((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSquared, 0, 1);
    return Math.hypot(point.x - (start.x + dx * t), point.y - (start.y + dy * t));
  }
}

export const CAUSAL_DELAY_FEEDBACK_PRESETS = PRESETS;
export const CAUSAL_DELAY_FEEDBACK_CANVAS_COLORS = CANVAS_COLORS;
export const createMockCausalDelayReplay = createMockCausalDelayReplayDataset;
