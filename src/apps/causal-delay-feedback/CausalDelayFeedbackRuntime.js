import {
  CANVAS_COLORS,
  DEFAULT_CANVAS_ID,
  DEFAULT_PRESET_ID,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  DIRECT_MANIPULATION_DRAFT_PREVIEW,
  ELECTRINO,
  FULL_CIRCULAR_ARCS,
  POSITRINO,
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
  showPaths: "Show path history",
  hidePaths: "Hide path history",
});
const REPLAY_LOOP_SECONDS = 9;
const TIME_EPSILON = 1e-6;
const INITIAL_VELOCITY_ARROW_SCALE = 0.07;
const INITIAL_VELOCITY_PREVIEW_RESPONSE = 0.42;
const SPACE_KEYS = new Set([" ", "Space", "Spacebar"]);
const SPACEBAR_NATIVE_CONTROL_TAGS = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA"]);

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
    this.showPaths = true;
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
    this.viewport = createViewport(DESIGN_WIDTH, DESIGN_HEIGHT);
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
      pathsButton: queryRequiredElement(this.document, "#causal-delay-feedback-paths"),
      resetButton: queryRequiredElement(this.document, "#causal-delay-feedback-reset"),
      settingsButton: queryRequiredElement(this.document, "#causal-delay-feedback-settings"),
      settingsPanel: queryRequiredElement(this.document, "#causal-delay-feedback-settings-panel"),
      colorSwatches: queryRequiredElement(this.document, "#causal-delay-feedback-color-swatches"),
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
        if (entry.id === this.canvasColorId) {
          button.classList.add("is-active");
        }
        return button;
      }),
    );
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
    this.dom.pathsButton.addEventListener("click", () => {
      this.showPaths = !this.showPaths;
      this.updatePathsButton();
      this.render();
    });
    this.dom.resetButton.addEventListener("click", () => {
      this.elapsedSeconds = 0;
      this.setPlaying(true);
      this.render();
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
    this.dom.canvas.addEventListener("pointermove", (event) => {
      this.handleCanvasPointerMove(event);
    });
    this.dom.canvas.addEventListener("pointerdown", (event) => {
      this.handleCanvasPointerDown(event);
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
    this.applyReplayDataset(this.createFallbackReplay(this.presetId), {
      loadState: this.usesFallbackReplayOnly() ? "ready" : "loading",
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

  async loadReplay({ presetId = this.presetId, requestOptions = this.replayRequestOptions } = {}) {
    const sequence = ++this.replayLoadSequence;
    const adapter = this.replayAdapter;
    this.replayLoadState = "loading";
    this.replayLoadError = null;
    this.updateReplayStatus();

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
    this.syncReplayRequestOptionsFromDataset();
    if (this.dom?.preset) {
      this.dom.preset.value = this.presetId;
    }
    this.updateReplayStatus();
  }

  syncReplayRequestOptionsFromDataset() {
    if (!this.dataset) {
      return;
    }
    this.replayRequestOptions = {
      ...this.replayRequestOptions,
      initialConditions: cloneJson(this.dataset.initialConditions ?? {}),
      replayDataset: this.dataset,
    };
  }

  refreshAfterReplayDatasetChange() {
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

  setCanvasColor(colorId) {
    this.canvasColorId = getCanvasColorById(colorId).id;
    Array.from(this.dom.colorSwatches.children).forEach((button) => {
      button.classList.toggle("is-active", button.dataset.colorId === this.canvasColorId);
    });
    this.render();
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

  updatePathsButton() {
    this.dom.pathsButton.classList.toggle("is-active", this.showPaths);
    const help = this.showPaths ? ICON_HELP.hidePaths : ICON_HELP.showPaths;
    this.dom.pathsButton.setAttribute("aria-label", help);
    this.dom.pathsButton.title = help;
    this.dom.pathsButton.dataset.tooltip = help;
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
      this.elapsedSeconds += deltaSeconds;
      this.render();
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

  render() {
    const ctx = this.context;
    ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawBackground(ctx);
    this.drawWakes(ctx);
    if (this.showPaths) {
      this.drawPathTrail(ctx, "positrino", POSITRINO);
      this.drawPathTrail(ctx, "electrino", ELECTRINO);
    }
    this.drawInitialConditionHandles(ctx);
    this.drawHistoryPoints(ctx, "positrino", POSITRINO);
    this.drawHistoryPoints(ctx, "electrino", ELECTRINO);
    this.drawSelection(ctx);
    this.drawLiveMarkers(ctx);
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

  drawWakes(ctx) {
    const replayTime = this.getCurrentReplayTime();
    if (this.dataset.wakeArcDisplayMode === FULL_CIRCULAR_ARCS) {
      this.drawFullCircularWakes(ctx, replayTime);
      return;
    }
    this.dataset.wakeLinks.forEach((link) => {
      this.drawWakeProgression(ctx, link, replayTime);
    });
  }

  drawFullCircularWakes(ctx, replayTime) {
    this.dataset.wakeLinks.forEach((link) => {
      this.drawFullCircularWakeProgression(ctx, link, replayTime);
    });
  }

  drawFullCircularWakeProgression(ctx, link, replayTime) {
    const timing = this.getWakeTiming(link, replayTime);
    if (!timing?.active) {
      return;
    }
    const preset = this.dataset.preset;
    const radius = getDistance(timing.source, timing.receiver);
    const bandCount = Math.max(2, preset.wakeBands);
    const alpha = (preset.fullCircleAlpha ?? 0.14) * preset.alphaScale;
    const color = withAlpha(mixColor(link.color, WHITE, 0.2), alpha);
    const dotRadius = Math.max(0.9, preset.dotRadius);
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
    if (!timing?.active) {
      return;
    }
    const preset = this.dataset.preset;
    const radius = getDistance(timing.source, timing.receiver);
    const theta = getAngleDegrees(timing.source, timing.receiver);
    const falloffWeight = Math.pow(link.weight, preset.falloffPower);
    const bandCount = Math.max(2, preset.wakeBands);

    this.drawWakeBuildProgression(ctx, link, {
      source: timing.source,
      radius,
      theta,
      falloffWeight,
      bandCount,
      buildProgress: timing.progress,
    });
  }

  drawWakeBuildProgression(ctx, link, { source, radius, theta, falloffWeight, bandCount, buildProgress }) {
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
      const alpha = ((70 + 138 * frontBias) / 255) * (0.48 + 0.52 * falloffWeight) * preset.alphaScale;
      const dotRadius = preset.dotRadius * (0.82 + 0.38 * frontBias) * (0.72 + 0.3 * falloffWeight);
      this.drawDottedArc(
        ctx,
        source,
        bandRadius,
        theta - wakeSpan * 0.5,
        theta + wakeSpan * 0.5,
        withAlpha(link.color, alpha),
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
    this.dataset.history[kind].forEach((point) => {
      const screen = this.worldToScreen(point);
      this.drawCircle(ctx, screen, 8.5, withAlpha({ r: 8, g: 6, b: 18, a: 1 }, 0.82), withAlpha(WHITE, 0.68), 1.2);
      this.drawCircle(ctx, screen, 4.3, color);
      const offset = kind === "positrino" ? { x: 14, y: -13 } : { x: 14, y: 15 };
      this.drawScreenText(ctx, String(point.depth), { x: screen.x + offset.x * this.viewport.scale, y: screen.y + offset.y * this.viewport.scale }, 13, withAlpha(WHITE, 0.82), "center", "bold");
    });
  }

  drawInitialConditionHandles(ctx) {
    this.drawInitialConditionHandle(ctx, "positrino", POSITRINO);
    this.drawInitialConditionHandle(ctx, "electrino", ELECTRINO);
  }

  drawInitialConditionHandle(ctx, kind, color) {
    const condition = this.getInitialCondition(kind);
    if (!condition) {
      return;
    }
    const point = this.initialConditionPoint(condition);
    const velocityEnd = this.initialConditionVelocityEnd(condition);
    const screen = this.worldToScreen(point);
    const velocityScreen = this.worldToScreen(velocityEnd);
    this.drawLine(ctx, [screen, velocityScreen], withAlpha(mixColor(color, WHITE, 0.42), 0.46), 2);
    this.drawCircle(ctx, velocityScreen, 5.6, withAlpha(color, 0.62), withAlpha(WHITE, 0.58), 1);
    this.drawCircle(ctx, screen, 16, withAlpha(color, 0.13), withAlpha(WHITE, 0.62), 1.2);
    this.drawCircle(ctx, screen, 6.4, color, WHITE, 1.2);
  }

  drawSelection(ctx) {
    if (!this.selectedItem) {
      return;
    }
    if (this.selectedItem.type === "history") {
      const point = this.dataset.history[this.selectedItem.kind]?.find(
        (candidate) => candidate.depth === this.selectedItem.depth,
      );
      if (!point) {
        return;
      }
      const screen = this.worldToScreen(point);
      this.drawCircle(ctx, screen, 18, withAlpha(WHITE, 0.05), withAlpha(WHITE, 0.86), 1.4);
      return;
    }
    if (this.selectedItem.type === "initial-condition") {
      const condition = this.getInitialCondition(this.selectedItem.kind);
      if (!condition) {
        return;
      }
      const screen = this.worldToScreen(this.initialConditionPoint(condition));
      this.drawCircle(ctx, screen, 24, withAlpha(WHITE, 0.05), withAlpha(WHITE, 0.9), 1.5);
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

    const link = this.dataset.wakeLinks.find((candidate) => candidate.id === this.selectedItem.linkId);
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

  drawLiveMarkers(ctx) {
    const t = this.getCurrentReplayTime();
    this.drawLiveMarker(ctx, "positrino", POSITRINO, this.getReplayPathPoint("positrino", t), "positrino", { x: 16, y: 24 });
    this.drawLiveMarker(ctx, "electrino", ELECTRINO, this.getReplayPathPoint("electrino", t), "electrino", { x: 16, y: -30 });
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
    const hit = this.findNearestHit(screen);
    if (!hit) {
      this.dom.hoverLabel.hidden = true;
      return;
    }
    this.dom.hoverLabel.textContent = hit.label;
    this.dom.hoverLabel.style.left = `${event.clientX}px`;
    this.dom.hoverLabel.style.top = `${event.clientY}px`;
    this.dom.hoverLabel.hidden = false;
  }

  handleCanvasPointerMove(event) {
    if (this.dragState) {
      if (this.dragState.type === "initial-velocity") {
        this.dragSelectedInitialVelocity(event);
      } else if (this.dragState.type === "initial-condition") {
        this.dragSelectedInitialCondition(event);
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
    } else if (hit.type === "initial-condition") {
      this.startInitialConditionDrag(event, hit);
    } else if (hit.type === "history") {
      this.startHistoryPointDrag(event, hit);
    }
    this.render();
  }

  startHistoryPointDrag(event, hit) {
    const rect = this.dom.canvas.getBoundingClientRect();
    const screen = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    this.dragState = {
      type: "history",
      kind: hit.selection.kind,
      depth: hit.selection.depth,
      lastWorld: this.screenToWorld(screen),
    };
    this.setPlaying(false);
    if (typeof this.dom.canvas.setPointerCapture === "function") {
      this.dom.canvas.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
  }

  startInitialConditionDrag(event, hit) {
    const rect = this.dom.canvas.getBoundingClientRect();
    const screen = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    this.dragState = {
      type: "initial-condition",
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
      this.updateReadout();
      this.render();
    }
  }

  dragSelectedInitialCondition(event) {
    const rect = this.dom.canvas.getBoundingClientRect();
    const screen = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    const world = this.screenToWorld(screen);
    const delta = {
      x: world.x - this.dragState.lastWorld.x,
      y: world.y - this.dragState.lastWorld.y,
    };
    this.dragState.lastWorld = world;
    if (this.applyInitialConditionDrag(this.dragState.kind, delta)) {
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

  finishDrag() {
    const completedDrag = this.dragState;
    this.dragState = null;
    if (
      (completedDrag?.type === "initial-condition" || completedDrag?.type === "initial-velocity") &&
      completedDrag.didEdit
    ) {
      return this.rerunAfterInitialConditionDrag();
    }
    return this.dataset;
  }

  rerunAfterInitialConditionDrag() {
    if (this.usesFallbackReplayOnly()) {
      return this.dataset;
    }
    return this.loadReplay({ requestOptions: this.replayRequestOptions });
  }

  applyRetainedPointDrag(kind, depth, delta) {
    const didEdit = this.deformPathAroundHistoryPoint(kind, depth, delta);
    if (!didEdit) {
      return false;
    }
    this.updateWakeLinkGeometry();
    this.markDraftPreview("retained_point_drag_preview");
    return true;
  }

  applyInitialConditionDrag(kind, delta) {
    const didEdit = this.translateReplayPath(kind, delta);
    if (!didEdit) {
      return false;
    }
    this.updateWakeLinkGeometry();
    this.syncReplayRequestOptionsFromDataset();
    this.markDraftPreview("initial_condition_drag_preview");
    return true;
  }

  applyInitialVelocityDrag(kind, velocityEnd) {
    const condition = this.getInitialCondition(kind);
    if (!condition || !velocityEnd) {
      return false;
    }
    const previousVelocity = {
      vx: Number(condition.vx) || 0,
      vy: Number(condition.vy) || 0,
    };
    const nextVelocity = this.velocityFromInitialConditionHandle(condition, velocityEnd);
    if (previousVelocity.vx === nextVelocity.vx && previousVelocity.vy === nextVelocity.vy) {
      return false;
    }

    condition.vx = nextVelocity.vx;
    condition.vy = nextVelocity.vy;
    this.applyInitialVelocityPreview(kind, condition, previousVelocity, nextVelocity);
    this.updateWakeLinkGeometry();
    this.syncReplayRequestOptionsFromDataset();
    this.markDraftPreview("initial_velocity_drag_preview");
    return true;
  }

  markDraftPreview(reason) {
    if (!this.dataset) {
      return;
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

  translateReplayPath(kind, delta) {
    if (!delta || (delta.x === 0 && delta.y === 0)) {
      return false;
    }
    const points = this.dataset.paths[kind];
    const condition = this.getInitialCondition(kind);
    if (!Array.isArray(points) || !condition) {
      return false;
    }
    points.forEach((point) => {
      point.x += delta.x;
      point.y += delta.y;
    });
    this.dataset.frames.forEach((frame) => {
      const point = frame[kind];
      if (!point || points.includes(point)) {
        return;
      }
      point.x += delta.x;
      point.y += delta.y;
    });
    this.dataset.history[kind].forEach((point) => {
      point.x += delta.x;
      point.y += delta.y;
    });
    condition.x += delta.x;
    condition.y += delta.y;
    return true;
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
    return true;
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
    const [start, end] = this.getReplayTimeRange();
    const phase = (this.elapsedSeconds % REPLAY_LOOP_SECONDS) / REPLAY_LOOP_SECONDS;
    return start + (end - start) * phase;
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

  initialConditionPoint(condition) {
    return { x: Number(condition.x) || 0, y: Number(condition.y) || 0 };
  }

  initialConditionVelocityEnd(condition) {
    const point = this.initialConditionPoint(condition);
    const vx = Number(condition.vx) || 0;
    const vy = Number(condition.vy) || 0;
    return {
      x: point.x + vx * INITIAL_VELOCITY_ARROW_SCALE,
      y: point.y + vy * INITIAL_VELOCITY_ARROW_SCALE,
    };
  }

  velocityFromInitialConditionHandle(condition, velocityEnd) {
    const point = this.initialConditionPoint(condition);
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
    const sourceT = Number.isFinite(Number(source.t)) ? Number(source.t) : Number(link.emissionTime);
    const receiverT = Number.isFinite(Number(receiver.t)) ? Number(receiver.t) : Number(link.hitTime);
    const duration = receiverT - sourceT;
    if (!Number.isFinite(duration) || duration <= 0) {
      return null;
    }
    const rawProgress = (replayTime - sourceT) / duration;
    return {
      source,
      receiver,
      sourceT,
      receiverT,
      progress: clamp(rawProgress, 0, 1),
      active: rawProgress >= -TIME_EPSILON && rawProgress <= 1 + TIME_EPSILON,
    };
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

  updateWakeLinkGeometry() {
    this.dataset.wakeLinks.forEach((link) => {
      const source = this.dataset.history[link.sourceKind]?.find((point) => point.depth === link.sourceDepth);
      const receiver = this.dataset.history[link.receiverKind]?.find((point) => point.depth === link.receiverDepth);
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
    if (!this.selectedItem) {
      this.dom.readout.hidden = true;
      this.dom.readout.replaceChildren();
      return;
    }

    const selectedHit = hit ?? this.getSelectedHit();
    if (!selectedHit) {
      this.dom.readout.hidden = true;
      return;
    }

    this.dom.readout.replaceChildren(
      this.createReadoutStrong(selectedHit.title),
      ...selectedHit.details.map((detail) => this.createReadoutSpan(detail)),
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
    if (this.selectedItem?.type === "initial-condition") {
      const condition = this.getInitialCondition(this.selectedItem.kind);
      return condition ? this.createInitialConditionHit(this.selectedItem.kind, condition, 0) : null;
    }
    if (this.selectedItem?.type === "history") {
      const point = this.dataset.history[this.selectedItem.kind]?.find(
        (candidate) => candidate.depth === this.selectedItem.depth,
      );
      return point ? this.createHistoryHit(point, 0) : null;
    }
    if (this.selectedItem?.type === "wake") {
      const link = this.dataset.wakeLinks.find((candidate) => candidate.id === this.selectedItem.linkId);
      return link ? this.createWakeHit(link, 0) : null;
    }
    return null;
  }

  findNearestHit(screen, { includeWakes = false } = {}) {
    const velocityCandidates = [];
    ["positrino", "electrino"].forEach((kind) => {
      const condition = this.getInitialCondition(kind);
      if (!condition) {
        return;
      }
      const candidate = this.worldToScreen(this.initialConditionVelocityEnd(condition));
      const distance = Math.hypot(screen.x - candidate.x, screen.y - candidate.y);
      velocityCandidates.push(this.createInitialVelocityHit(kind, condition, distance));
    });
    const nearestVelocity = velocityCandidates.sort((a, b) => a.distance - b.distance)[0];
    if (nearestVelocity && nearestVelocity.distance <= nearestVelocity.hitRadius) {
      return nearestVelocity;
    }

    const initialCandidates = [];
    ["positrino", "electrino"].forEach((kind) => {
      const condition = this.getInitialCondition(kind);
      if (!condition) {
        return;
      }
      const candidate = this.worldToScreen(this.initialConditionPoint(condition));
      const distance = Math.hypot(screen.x - candidate.x, screen.y - candidate.y);
      initialCandidates.push(this.createInitialConditionHit(kind, condition, distance));
    });
    const nearestInitial = initialCandidates.sort((a, b) => a.distance - b.distance)[0];
    if (nearestInitial && nearestInitial.distance <= nearestInitial.hitRadius) {
      return nearestInitial;
    }

    const historyCandidates = [];
    ["positrino", "electrino"].forEach((kind) => {
      this.dataset.history[kind].forEach((point) => {
        const candidate = this.worldToScreen(point);
        const distance = Math.hypot(screen.x - candidate.x, screen.y - candidate.y);
        historyCandidates.push(this.createHistoryHit(point, distance));
      });
    });
    const nearestHistory = historyCandidates.sort((a, b) => a.distance - b.distance)[0];
    if (nearestHistory && nearestHistory.distance <= nearestHistory.hitRadius) {
      return nearestHistory;
    }
    const candidates = [];
    if (includeWakes) {
      this.dataset.wakeLinks.forEach((link) => {
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
    return {
      type: "history",
      title: `${point.kind} ${point.depth}`,
      label: `${point.kind} ${point.depth}`,
      details: [`t=${point.t.toFixed(2)}`, `weight=${point.weight.toFixed(2)}`, point.state],
      distance,
      hitRadius: 22,
      selection: { type: "history", kind: point.kind, depth: point.depth },
    };
  }

  createInitialConditionHit(kind, condition, distance) {
    return {
      type: "initial-condition",
      title: `${kind} initial`,
      label: `${kind} initial`,
      details: [
        `x=${Math.round(Number(condition.x) || 0)}`,
        `y=${Math.round(Number(condition.y) || 0)}`,
        `vx=${(Number(condition.vx) || 0).toFixed(1)}`,
        `vy=${(Number(condition.vy) || 0).toFixed(1)}`,
      ],
      distance,
      hitRadius: 24,
      selection: { type: "initial-condition", kind },
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
    const falloff = this.getWakeFalloff(link);
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
        this.dataset.wakeArcDisplayMode === FULL_CIRCULAR_ARCS ? "full circular" : "partial arc",
      ],
      distance,
      hitRadius: 20,
      selection: { type: "wake", linkId: link.id },
    };
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
