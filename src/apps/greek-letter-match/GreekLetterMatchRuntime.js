import {
  navigateStandaloneAppHome,
  resolveStandaloneAppHomeHref,
} from "../navigator/StandaloneAppHomeRuntime.js";

export const GREEK_LETTERS = Object.freeze([
  Object.freeze({ name: "alpha", upper: "Α", lower: "α", audioFile: "alpha.wav" }),
  Object.freeze({ name: "beta", upper: "Β", lower: "β", audioFile: "beta.wav" }),
  Object.freeze({ name: "gamma", upper: "Γ", lower: "γ", audioFile: "gamma.wav" }),
  Object.freeze({ name: "delta", upper: "Δ", lower: "δ", audioFile: "delta.wav" }),
  Object.freeze({ name: "epsilon", upper: "Ε", lower: "ε", audioFile: "epsilon.wav" }),
  Object.freeze({ name: "zeta", upper: "Ζ", lower: "ζ", audioFile: "zeta.wav" }),
  Object.freeze({ name: "eta", upper: "Η", lower: "η", audioFile: "eta.wav" }),
  Object.freeze({ name: "theta", upper: "Θ", lower: "θ", audioFile: "theta.wav" }),
  Object.freeze({ name: "iota", upper: "Ι", lower: "ι", audioFile: "iota.wav" }),
  Object.freeze({ name: "kappa", upper: "Κ", lower: "κ", audioFile: "kappa.wav" }),
  Object.freeze({ name: "lambda", upper: "Λ", lower: "λ", audioFile: "lambda.wav" }),
  Object.freeze({ name: "mu", upper: "Μ", lower: "μ", audioFile: "mu.wav" }),
  Object.freeze({ name: "nu", upper: "Ν", lower: "ν", audioFile: "nu.wav" }),
  Object.freeze({ name: "xi", upper: "Ξ", lower: "ξ", audioFile: "xi.wav" }),
  Object.freeze({ name: "omicron", upper: "Ο", lower: "ο", audioFile: "omicron.wav" }),
  Object.freeze({ name: "pi", upper: "Π", lower: "π", audioFile: "pi.wav" }),
  Object.freeze({ name: "rho", upper: "Ρ", lower: "ρ", audioFile: "rho.wav" }),
  Object.freeze({ name: "sigma", upper: "Σ", lower: "σ", audioFile: "sigma.wav" }),
  Object.freeze({ name: "tau", upper: "Τ", lower: "τ", audioFile: "tau.wav" }),
  Object.freeze({ name: "upsilon", upper: "Υ", lower: "υ", audioFile: "upsilon.wav" }),
  Object.freeze({ name: "phi", upper: "Φ", lower: "φ", audioFile: "phi.wav" }),
  Object.freeze({ name: "chi", upper: "Χ", lower: "χ", audioFile: "chi.wav" }),
  Object.freeze({ name: "psi", upper: "Ψ", lower: "ψ", audioFile: "psi.wav" }),
  Object.freeze({ name: "omega", upper: "Ω", lower: "ω", audioFile: "omega.wav" }),
]);

export function getGreekPronunciationUrl(letter, moduleUrl = import.meta.url) {
  if (!letter?.audioFile) {
    return null;
  }
  return new URL(`./audio/${letter.audioFile}`, moduleUrl).href;
}

// This is the navigator's default structured-sphere progression (the jewel palette).
export const SPHERE_COLOR_PROGRESSION = Object.freeze([
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
]);

export const FEEDBACK_INTERVALS = Object.freeze({
  standard: 1000,
  study: 2000,
  extended: 3000,
});

function normalizeRandomValue(randomValue) {
  const number = Number(randomValue);
  if (!Number.isFinite(number)) {
    return 0;
  }
  return Math.min(0.999999999999, Math.max(0, number));
}

export function createRoundOrder(random = Math.random) {
  const order = GREEK_LETTERS.map((_, index) => index);
  for (let index = order.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(normalizeRandomValue(random()) * (index + 1));
    [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
  }
  return order;
}

export function createGreekMatchSession(random = Math.random) {
  return {
    roundNumber: 1,
    promptOrder: createRoundOrder(random),
    promptIndex: 0,
    attempts: 0,
    correct: 0,
    completedRoundScores: [],
    locked: false,
    lastResult: null,
    roundComplete: false,
  };
}

export function getCurrentLetterIndex(session) {
  return session?.promptOrder?.[session?.promptIndex] ?? 0;
}

export function getRoundPercent(session) {
  const attempts = Number(session?.attempts) || 0;
  if (attempts <= 0) {
    return null;
  }
  return Math.round(((Number(session?.correct) || 0) / attempts) * 100);
}

export function answerGreekMatch(session, selectedIndex) {
  if (!session || session.locked || session.roundComplete) {
    return session;
  }
  const normalizedSelectedIndex = Number(selectedIndex);
  const targetIndex = getCurrentLetterIndex(session);
  const isCorrect = normalizedSelectedIndex === targetIndex;
  const attempts = session.attempts + 1;
  const correct = session.correct + (isCorrect ? 1 : 0);
  const roundComplete = attempts === GREEK_LETTERS.length;

  return {
    ...session,
    attempts,
    correct,
    locked: true,
    lastResult: {
      selectedIndex: normalizedSelectedIndex,
      targetIndex,
      isCorrect,
    },
    roundComplete,
  };
}

export function advanceGreekMatch(session) {
  if (!session?.locked) {
    return session;
  }
  if (session.roundComplete) {
    return {
      ...session,
      locked: false,
      lastResult: null,
    };
  }
  return {
    ...session,
    promptIndex: session.promptIndex + 1,
    locked: false,
    lastResult: null,
  };
}

export function startNextGreekMatchRound(session, random = Math.random) {
  if (!session || session.attempts <= 0) {
    return session;
  }
  return {
    roundNumber: session.roundNumber + 1,
    promptOrder: createRoundOrder(random),
    promptIndex: 0,
    attempts: 0,
    correct: 0,
    completedRoundScores: [...session.completedRoundScores, getRoundPercent(session)],
    locked: false,
    lastResult: null,
    roundComplete: false,
  };
}

export function getSphereColor(index) {
  const normalizedIndex = Math.max(0, Math.floor(Number(index) || 0));
  return SPHERE_COLOR_PROGRESSION[normalizedIndex % SPHERE_COLOR_PROGRESSION.length];
}

export function getGreekMatchArrowCoordinates(letterIndex, towardCenter = false) {
  const normalizedIndex = Math.max(0, Math.floor(Number(letterIndex) || 0));
  const angle =
    (Math.PI * 2 * normalizedIndex) / GREEK_LETTERS.length - Math.PI / 2;
  // The marker tip extends 2.5 viewBox units past the line endpoint. These
  // radii place that visible tip at the destination circle boundary.
  const innerRadius = 15;
  const outerRadius = 35.5;
  const startRadius = towardCenter ? outerRadius : innerRadius;
  const endRadius = towardCenter ? innerRadius : outerRadius;
  return {
    x1: 50 + Math.cos(angle) * startRadius,
    y1: 50 + Math.sin(angle) * startRadius,
    x2: 50 + Math.cos(angle) * endRadius,
    y2: 50 + Math.sin(angle) * endRadius,
  };
}

export function getOpticallyCenteredGlyphPosition(bounds) {
  const x = Number(bounds?.x);
  const y = Number(bounds?.y);
  const width = Number(bounds?.width);
  const height = Number(bounds?.height);
  if (![x, y, width, height].every(Number.isFinite) || width <= 0 || height <= 0) {
    return { x: 50, y: 50 };
  }
  return {
    x: 100 - (x + width / 2),
    y: 100 - (y + height / 2),
  };
}

const LOWERCASE_DESCENDER_OPTICAL_SHIFT_EM = -0.19;
const LOWERCASE_DESCENDER_GLYPHS = new Set(["γ", "φ", "χ", "ψ"]);

export function getGreekGlyphOpticalYOffset(glyph, fontSize) {
  const normalizedFontSize = Number(fontSize);
  if (
    !LOWERCASE_DESCENDER_GLYPHS.has(String(glyph ?? "")) ||
    !Number.isFinite(normalizedFontSize) ||
    normalizedFontSize <= 0
  ) {
    return 0;
  }
  return normalizedFontSize * LOWERCASE_DESCENDER_OPTICAL_SHIFT_EM;
}

function createElement(documentLike, tagName, className = "", textContent = "") {
  const element = documentLike.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (textContent) {
    element.textContent = textContent;
  }
  return element;
}

function createSvgElement(documentLike, tagName) {
  return documentLike.createElementNS("http://www.w3.org/2000/svg", tagName);
}

function createOpticallyCenteredGlyph(documentLike, className) {
  const svg = createSvgElement(documentLike, "svg");
  svg.setAttribute("class", `greek-match-optical-glyph ${className}`);
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  const text = createSvgElement(documentLike, "text");
  text.setAttribute("x", "50");
  text.setAttribute("y", "50");
  svg.append(text);
  return { svg, text };
}

function centerSvgGlyph(textElement) {
  textElement.setAttribute("x", "50");
  textElement.setAttribute("y", "50");
  if (typeof textElement.getBBox !== "function") {
    return;
  }
  try {
    const position = getOpticallyCenteredGlyphPosition(textElement.getBBox());
    const computedFontSize = Number.parseFloat(
      textElement.ownerDocument?.defaultView?.getComputedStyle?.(textElement)?.fontSize
    );
    const opticalYOffset = getGreekGlyphOpticalYOffset(
      textElement.textContent,
      computedFontSize
    );
    textElement.setAttribute("x", String(position.x));
    textElement.setAttribute("y", String(position.y + opticalYOffset));
  } catch {
    // Keep the safe centered fallback when a renderer cannot measure SVG text.
  }
}

function createSegmentedControl(documentLike, config) {
  const fieldset = createElement(documentLike, "fieldset", "greek-match-control-group");
  const legend = createElement(documentLike, "legend", "", config.label);
  const segments = createElement(documentLike, "div", "greek-match-segments");
  segments.style.setProperty("--segment-count", String(config.options.length));

  for (const option of config.options) {
    const segment = createElement(documentLike, "label", "greek-match-segment");
    const input = createElement(documentLike, "input");
    input.type = "radio";
    input.name = config.name;
    input.value = option.value;
    input.checked = option.value === config.value;
    const label = createElement(documentLike, "span", "", option.label);
    input.addEventListener("change", () => {
      if (input.checked) {
        config.onChange(option.value);
      }
    });
    segment.append(input, label);
    segments.append(segment);
  }

  fieldset.append(legend, segments);
  return fieldset;
}

function createSparkles(documentLike, board) {
  const colors = ["#ffe073", "#ffffff", "#ff9bd6"];
  for (let index = 0; index < 12; index += 1) {
    const angle = (Math.PI * 2 * index) / 12 - Math.PI / 2;
    const radius = index % 2 === 0 ? 36 : 42;
    const spark = createElement(documentLike, "span", "greek-match-spark", index % 3 === 0 ? "✶" : "✦");
    spark.style.left = `${50 + Math.cos(angle) * radius}%`;
    spark.style.top = `${50 + Math.sin(angle) * radius}%`;
    spark.style.setProperty("--spark-color", colors[index % colors.length]);
    spark.style.setProperty("--spark-delay", `${(index % 4) * 55}ms`);
    spark.setAttribute("aria-hidden", "true");
    board.append(spark);
  }
}

export class GreekLetterMatchRuntime {
  constructor(options = {}) {
    this.document = options.document ?? globalThis.document;
    this.window = options.window ?? globalThis.window;
    this.root =
      options.root ?? this.document?.getElementById?.("greek-letter-match-app") ?? null;
    this.random = typeof options.random === "function" ? options.random : Math.random;
    this.setTimeout = options.setTimeout ?? this.window?.setTimeout?.bind(this.window) ?? globalThis.setTimeout;
    this.clearTimeout = options.clearTimeout ?? this.window?.clearTimeout?.bind(this.window) ?? globalThis.clearTimeout;
    this.audioFactory =
      typeof options.audioFactory === "function"
        ? options.audioFactory
        : () =>
            typeof this.window?.Audio === "function"
              ? new this.window.Audio()
              : null;
    this.symbolCase = "lower";
    this.centerRepresentation = "name";
    this.feedbackInterval = "standard";
    this.gameMode = "game";
    this.teachingLetterIndex = null;
    this.session = createGreekMatchSession(this.random);
    this.feedbackTimer = null;
    this.pronunciationAudio = null;
    this.pronunciationRequestId = 0;
    this.resizeObserver = null;
    this.choiceButtons = [];
    this.choiceLabels = [];
    this.choiceGlyphs = [];
  }

  init() {
    if (!this.document || !this.root) {
      throw new Error("It's Greek to Me! requires a document and app root.");
    }
    this.buildInterface();
    this.render();
    this.observeStageSize();
    return this;
  }

  buildInterface() {
    this.root.replaceChildren();
    this.shell = createElement(this.document, "div", "greek-match-shell");
    this.header = this.buildHeader();
    this.workspace = createElement(this.document, "main", "greek-match-workspace");
    this.inputPanel = this.buildInputPanel();
    this.stage = this.buildStage();
    this.resultsPanel = this.buildResultsPanel();
    this.workspace.append(this.inputPanel, this.stage, this.resultsPanel);
    this.shell.append(this.header, this.workspace);
    this.root.append(this.shell);
  }

  buildHeader() {
    const header = createElement(this.document, "header", "greek-match-header");
    const heading = createElement(this.document, "div", "greek-match-heading");
    const mark = createElement(this.document, "div", "greek-match-mark");
    mark.setAttribute("aria-hidden", "true");
    mark.append(
      createElement(this.document, "span", "", "α"),
      createElement(this.document, "span", "", "Ω")
    );
    const headingText = createElement(this.document, "div");
    headingText.append(
      createElement(this.document, "h1", "", "It's Greek to Me!"),
      createElement(
        this.document,
        "p",
        "",
        "Alpha to Omega · Learn all 24 letters by position, symbol, name, and pronunciation."
      )
    );
    heading.append(mark, headingText);

    const homeButton = createElement(this.document, "button", "greek-match-home", "Applications");
    homeButton.type = "button";
    homeButton.addEventListener("click", () => {
      navigateStandaloneAppHome(
        this.window?.location,
        resolveStandaloneAppHomeHref(this.window?.location?.href),
        { windowLike: this.window }
      );
    });
    header.append(heading, homeButton);
    return header;
  }

  buildInputPanel() {
    const panel = createElement(
      this.document,
      "aside",
      "greek-match-panel greek-match-input-panel"
    );
    const panelHeader = createElement(this.document, "div", "greek-match-panel-header");
    panelHeader.append(
      createElement(this.document, "h2", "", "Game setup"),
      createElement(this.document, "p", "", "Change the view at any time. Your session keeps going.")
    );
    const controls = createElement(this.document, "div", "greek-match-controls");

    controls.append(
      createSegmentedControl(this.document, {
        label: "Mode",
        name: "greek-game-mode",
        value: this.gameMode,
        options: [
          { value: "game", label: "Game" },
          { value: "teach", label: "Teach me" },
        ],
        onChange: (value) => this.setGameMode(value),
      }),
      createSegmentedControl(this.document, {
        label: "Symbol case",
        name: "greek-symbol-case",
        value: this.symbolCase,
        options: [
          { value: "lower", label: "Lowercase" },
          { value: "upper", label: "Uppercase" },
        ],
        onChange: (value) => {
          this.symbolCase = value;
          this.render();
        },
      }),
      createSegmentedControl(this.document, {
        label: "Center shows",
        name: "greek-center-representation",
        value: this.centerRepresentation,
        options: [
          { value: "name", label: "Name" },
          { value: "symbol", label: "Symbol" },
        ],
        onChange: (value) => {
          this.centerRepresentation = value;
          this.render();
        },
      }),
      createSegmentedControl(this.document, {
        label: "Feedback pause",
        name: "greek-feedback-interval",
        value: this.feedbackInterval,
        options: [
          { value: "standard", label: "1 s" },
          { value: "study", label: "2 s" },
          { value: "extended", label: "3 s" },
        ],
        onChange: (value) => {
          this.feedbackInterval = value;
        },
      }),
    );
    this.setupSummary = createElement(this.document, "p", "greek-match-setup-summary");
    this.nextRoundButton = createElement(
      this.document,
      "button",
      "greek-match-next-round",
      "Next round"
    );
    this.nextRoundButton.type = "button";
    this.nextRoundButton.addEventListener("click", () => this.nextRound());
    const resetButton = createElement(this.document, "button", "greek-match-reset", "Reset session");
    resetButton.type = "button";
    resetButton.addEventListener("click", () => this.resetSession());
    controls.append(
      this.setupSummary,
      this.nextRoundButton,
      resetButton
    );
    panel.append(panelHeader, controls);
    return panel;
  }

  buildStage() {
    const stage = createElement(this.document, "section", "greek-match-stage");
    stage.setAttribute("aria-label", "Greek letter matching board");
    this.board = createElement(this.document, "div", "greek-match-board");

    this.answerArrow = createSvgElement(this.document, "svg");
    this.answerArrow.setAttribute("class", "greek-match-answer-arrow");
    this.answerArrow.setAttribute("viewBox", "0 0 100 100");
    this.answerArrow.setAttribute("aria-hidden", "true");
    const arrowDefinitions = createSvgElement(this.document, "defs");
    const arrowMarker = createSvgElement(this.document, "marker");
    arrowMarker.setAttribute("id", "greek-match-answer-arrowhead");
    arrowMarker.setAttribute("markerWidth", "8");
    arrowMarker.setAttribute("markerHeight", "8");
    arrowMarker.setAttribute("refX", "6");
    arrowMarker.setAttribute("refY", "4");
    arrowMarker.setAttribute("orient", "auto");
    const arrowHead = createSvgElement(this.document, "path");
    arrowHead.setAttribute("d", "M 0 0 L 8 4 L 0 8 z");
    arrowMarker.append(arrowHead);
    arrowDefinitions.append(arrowMarker);
    this.answerArrowGlowLine = createSvgElement(this.document, "line");
    this.answerArrowGlowLine.setAttribute("class", "greek-match-answer-arrow-glow");
    this.answerArrowLine = createSvgElement(this.document, "line");
    this.answerArrowLine.setAttribute("class", "greek-match-answer-arrow-line");
    this.answerArrowLine.setAttribute("marker-end", "url(#greek-match-answer-arrowhead)");
    this.answerArrow.append(
      arrowDefinitions,
      this.answerArrowGlowLine,
      this.answerArrowLine
    );
    this.board.append(this.answerArrow);

    for (let index = 0; index < GREEK_LETTERS.length; index += 1) {
      const angle = (Math.PI * 2 * index) / GREEK_LETTERS.length - Math.PI / 2;
      const button = createElement(this.document, "button", "greek-match-choice");
      button.type = "button";
      button.dataset.letterIndex = String(index);
      button.style.left = `${50 + Math.cos(angle) * 43.6}%`;
      button.style.top = `${50 + Math.sin(angle) * 43.6}%`;
      button.style.setProperty("--node-color", getSphereColor(index));
      button.addEventListener("click", () => this.chooseLetter(index));
      const label = createElement(this.document, "span", "greek-match-choice-label");
      label.setAttribute("aria-hidden", "true");
      const glyph = createOpticallyCenteredGlyph(
        this.document,
        "greek-match-choice-symbol"
      );
      button.append(label, glyph.svg);
      this.choiceButtons.push(button);
      this.choiceLabels.push(label);
      this.choiceGlyphs.push(glyph.text);
      this.board.append(button);
    }

    this.center = createElement(this.document, "div", "greek-match-center");
    this.centerKicker = createElement(this.document, "div", "greek-match-center-kicker", "Match");
    this.centerValue = createElement(this.document, "div", "greek-match-center-value");
    this.centerStatus = createElement(this.document, "div", "greek-match-center-status");
    this.centerStatus.setAttribute("role", "status");
    this.centerStatus.setAttribute("aria-live", "polite");
    this.pronunciationButton = createElement(
      this.document,
      "button",
      "greek-match-pronunciation",
      "Hear pronunciation"
    );
    this.pronunciationButton.type = "button";
    this.pronunciationButton.addEventListener("click", () => {
      const letterIndex = this.getActivePronunciationIndex();
      if (letterIndex != null) {
        this.playPronunciation(letterIndex);
      }
    });
    this.pronunciationFeedback = createElement(
      this.document,
      "div",
      "greek-match-pronunciation-feedback"
    );
    this.pronunciationFeedback.setAttribute("role", "status");
    this.pronunciationFeedback.setAttribute("aria-live", "polite");
    this.center.append(
      this.centerKicker,
      this.centerValue,
      this.centerStatus,
      this.pronunciationButton,
      this.pronunciationFeedback
    );

    this.perfectLabel = createElement(
      this.document,
      "div",
      "greek-match-perfect-label",
      "Perfect round — keep going!"
    );
    this.perfectLabel.setAttribute("aria-hidden", "true");
    this.board.append(this.center, this.perfectLabel);
    createSparkles(this.document, this.board);
    stage.append(this.board);
    return stage;
  }

  buildResultsPanel() {
    const panel = createElement(
      this.document,
      "aside",
      "greek-match-panel greek-match-results-panel"
    );
    const panelHeader = createElement(this.document, "div", "greek-match-panel-header");
    panelHeader.append(
      createElement(this.document, "h2", "", "This session"),
      createElement(
        this.document,
        "p",
        "",
        "Answer up to 24 letters, then choose Next round to record your score."
      )
    );

    const scoreCard = createElement(this.document, "div", "greek-match-score-card");
    this.roundLabel = createElement(this.document, "div", "greek-match-round-label");
    this.score = createElement(this.document, "div", "greek-match-score");
    this.score.setAttribute("aria-live", "polite");
    this.progress = createElement(this.document, "div", "greek-match-progress");
    this.progressText = createElement(this.document, "div", "greek-match-progress-text");
    this.progressTrack = createElement(this.document, "div", "greek-match-progress-track");
    this.progressTrack.setAttribute("role", "progressbar");
    this.progressTrack.setAttribute("aria-label", "Letters answered this round");
    this.progressTrack.setAttribute("aria-valuemin", "0");
    this.progressTrack.setAttribute("aria-valuemax", String(GREEK_LETTERS.length));
    this.progressFill = createElement(this.document, "div", "greek-match-progress-fill");
    this.progressTrack.append(this.progressFill);
    this.progress.append(this.progressText, this.progressTrack);
    scoreCard.append(this.roundLabel, this.score, this.progress);

    const chartSection = createElement(this.document, "div", "greek-match-chart-section");
    chartSection.append(createElement(this.document, "h3", "greek-match-chart-heading", "Completed rounds"));
    this.chartViewport = createElement(this.document, "div", "greek-match-chart-viewport");
    this.chartViewport.setAttribute("role", "img");
    this.chartSeries = createElement(this.document, "div", "greek-match-chart-series");
    this.chartViewport.append(this.chartSeries);
    chartSection.append(
      this.chartViewport,
      createElement(
        this.document,
        "p",
        "greek-match-session-note",
        "Scores stay only in this page session and clear when you leave or reset."
      )
    );
    const audioCredit = createElement(
      this.document,
      "p",
      "greek-match-audio-credit",
      "Pronunciation audio: AI-generated with OpenAI's built-in Marin voice · "
    );
    const audioDetailsLink = createElement(
      this.document,
      "a",
      "",
      "provenance, history & license status"
    );
    audioDetailsLink.href = new URL("./audio/SOURCE.md", import.meta.url).href;
    audioCredit.append(audioDetailsLink);
    chartSection.append(audioCredit);
    panel.append(panelHeader, scoreCard, chartSection);
    return panel;
  }

  observeStageSize() {
    const update = () => this.updateBoardSize();
    if (typeof this.window?.ResizeObserver === "function") {
      this.resizeObserver = new this.window.ResizeObserver(update);
      this.resizeObserver.observe(this.stage);
    } else {
      this.window?.addEventListener?.("resize", update);
      this.fallbackResizeHandler = update;
    }
    update();
  }

  updateBoardSize() {
    const bounds = this.stage?.getBoundingClientRect?.();
    if (!bounds) {
      return;
    }
    const guard = bounds.width <= 620 ? 8 : 16;
    const size = Math.max(280, Math.floor(Math.min(bounds.width, bounds.height) - guard * 2));
    this.board?.style?.setProperty("--ring-size", `${size}px`);
  }

  getRingRepresentation() {
    return this.centerRepresentation === "name" ? this.symbolCase : "name";
  }

  getDisplayValue(letter, representation) {
    return representation === "name" ? letter.name : letter[representation];
  }

  getActivePronunciationIndex() {
    if (this.gameMode === "teach") {
      return this.teachingLetterIndex;
    }
    return getCurrentLetterIndex(this.session);
  }

  setPronunciationFeedback(message, state = "") {
    if (!this.pronunciationFeedback) {
      return;
    }
    this.pronunciationFeedback.textContent = message;
    this.pronunciationFeedback.dataset.state = state;
  }

  stopPronunciation() {
    this.pronunciationRequestId += 1;
    if (!this.pronunciationAudio) {
      return;
    }
    this.pronunciationAudio.pause?.();
    try {
      this.pronunciationAudio.currentTime = 0;
    } catch {
      // Some browser audio implementations reject seeking before metadata loads.
    }
  }

  playPronunciation(letterIndex) {
    const normalizedIndex = Number(letterIndex);
    const letter = GREEK_LETTERS[normalizedIndex];
    if (!letter) {
      return false;
    }

    if (!this.pronunciationAudio) {
      try {
        this.pronunciationAudio = this.audioFactory();
      } catch {
        this.pronunciationAudio = null;
      }
    }
    const audio = this.pronunciationAudio;
    if (!audio || typeof audio.play !== "function") {
      this.setPronunciationFeedback("Pronunciation audio is unavailable.", "error");
      return false;
    }

    this.stopPronunciation();
    const requestId = ++this.pronunciationRequestId;
    audio.preload = "auto";
    audio.src = getGreekPronunciationUrl(letter, import.meta.url);
    audio.onended = () => {
      if (requestId === this.pronunciationRequestId) {
        this.setPronunciationFeedback("");
      }
    };
    audio.onerror = () => {
      if (requestId === this.pronunciationRequestId) {
        this.setPronunciationFeedback(
          `Could not play ${letter.name}. Try the speaker again.`,
          "error"
        );
      }
    };
    this.setPronunciationFeedback(`Playing ${letter.name}.`, "playing");

    try {
      const playResult = audio.play();
      if (playResult && typeof playResult.catch === "function") {
        playResult.catch(() => {
          if (requestId === this.pronunciationRequestId) {
            this.setPronunciationFeedback(
              `Could not play ${letter.name}. Try the speaker again.`,
              "error"
            );
          }
        });
      }
      return true;
    } catch {
      if (requestId === this.pronunciationRequestId) {
        this.setPronunciationFeedback(
          `Could not play ${letter.name}. Try the speaker again.`,
          "error"
        );
      }
      return false;
    }
  }

  chooseLetter(index) {
    if (this.gameMode === "teach") {
      this.teachingLetterIndex = index;
      this.render();
      this.playPronunciation(index);
      return;
    }
    if (this.session.locked || this.session.roundComplete) {
      return;
    }
    this.session = answerGreekMatch(this.session, index);
    this.render();
    const waitMilliseconds = FEEDBACK_INTERVALS[this.feedbackInterval];
    this.feedbackTimer = this.setTimeout(() => {
      this.feedbackTimer = null;
      this.session = advanceGreekMatch(this.session);
      this.setPronunciationFeedback("");
      this.render();
    }, waitMilliseconds);
  }

  nextRound() {
    if (this.gameMode === "teach" || this.session.attempts <= 0) {
      return;
    }
    if (this.feedbackTimer != null) {
      this.clearTimeout(this.feedbackTimer);
      this.feedbackTimer = null;
    }
    this.stopPronunciation();
    this.setPronunciationFeedback("");
    this.session = startNextGreekMatchRound(this.session, this.random);
    this.render();
  }

  setGameMode(mode) {
    if ((mode !== "game" && mode !== "teach") || mode === this.gameMode) {
      return;
    }
    if (this.feedbackTimer != null) {
      this.clearTimeout(this.feedbackTimer);
      this.feedbackTimer = null;
    }
    if (this.session.locked) {
      this.session = advanceGreekMatch(this.session);
    }
    this.stopPronunciation();
    this.setPronunciationFeedback("");
    this.gameMode = mode;
    this.teachingLetterIndex = null;
    this.render();
  }

  resetSession() {
    if (this.feedbackTimer != null) {
      this.clearTimeout(this.feedbackTimer);
      this.feedbackTimer = null;
    }
    this.stopPronunciation();
    this.setPronunciationFeedback("");
    this.session = createGreekMatchSession(this.random);
    this.teachingLetterIndex = null;
    this.render();
  }

  render() {
    const targetIndex = getCurrentLetterIndex(this.session);
    const targetLetter = GREEK_LETTERS[targetIndex];
    const ringRepresentation = this.getRingRepresentation();
    const centerRepresentation =
      this.centerRepresentation === "name" ? "name" : this.symbolCase;
    const lastResult = this.session.lastResult;
    const isTeaching = this.gameMode === "teach";
    const teachingLetter =
      this.teachingLetterIndex == null
        ? null
        : GREEK_LETTERS[this.teachingLetterIndex];

    for (let index = 0; index < this.choiceButtons.length; index += 1) {
      const button = this.choiceButtons[index];
      const label = this.choiceLabels[index];
      const glyph = this.choiceGlyphs[index];
      const letter = GREEK_LETTERS[index];
      const displayValue = this.getDisplayValue(letter, ringRepresentation);
      label.textContent = displayValue;
      glyph.textContent = ringRepresentation === "name" ? "" : displayValue;
      button.dataset.representation = ringRepresentation === "name" ? "name" : "symbol";
      if (ringRepresentation !== "name") {
        centerSvgGlyph(glyph);
      }
      button.disabled = !isTeaching && (this.session.locked || this.session.roundComplete);
      button.setAttribute(
        "aria-label",
        isTeaching
          ? `Teach ${letter.name}: ${this.getDisplayValue(letter, ringRepresentation)}`
          : `Choice ${index + 1}: ${this.getDisplayValue(letter, ringRepresentation)}`
      );
      button.classList.toggle(
        "is-selected-correct",
        Boolean(lastResult?.isCorrect && lastResult.selectedIndex === index)
      );
      button.classList.toggle(
        "is-selected-wrong",
        Boolean(lastResult && !lastResult.isCorrect && lastResult.selectedIndex === index)
      );
      button.classList.toggle(
        "is-answer",
        Boolean(!isTeaching && lastResult && !lastResult.isCorrect && lastResult.targetIndex === index)
      );
      button.classList.toggle(
        "is-teaching-selected",
        Boolean(isTeaching && this.teachingLetterIndex === index)
      );
    }

    if (isTeaching) {
      this.center.dataset.feedback = "teaching";
      this.centerKicker.textContent = "Teach me";
      if (teachingLetter) {
        const teachingName = createElement(
          this.document,
          "span",
          "greek-match-teach-name",
          teachingLetter.name
        );
        const teachingSymbols = createElement(
          this.document,
          "span",
          "greek-match-teach-symbols"
        );
        const lowerTeachingGlyph = createOpticallyCenteredGlyph(
          this.document,
          "greek-match-teach-glyph"
        );
        const upperTeachingGlyph = createOpticallyCenteredGlyph(
          this.document,
          "greek-match-teach-glyph"
        );
        lowerTeachingGlyph.text.textContent = teachingLetter.lower;
        upperTeachingGlyph.text.textContent = teachingLetter.upper;
        teachingSymbols.append(lowerTeachingGlyph.svg, upperTeachingGlyph.svg);
        this.centerValue.replaceChildren(teachingName, teachingSymbols);
        this.centerValue.dataset.representation = "teaching";
        this.centerStatus.textContent = "lowercase · uppercase";
        this.center.setAttribute(
          "aria-label",
          `${teachingLetter.name}: lowercase ${teachingLetter.lower}, uppercase ${teachingLetter.upper}`
        );
        centerSvgGlyph(lowerTeachingGlyph.text);
        centerSvgGlyph(upperTeachingGlyph.text);
      } else {
        this.centerValue.textContent = "Choose";
        this.centerValue.dataset.representation = "name";
        this.centerStatus.textContent = "any ring item";
        this.center.removeAttribute("aria-label");
      }
    } else {
      this.center.removeAttribute("aria-label");
      if (centerRepresentation === "name") {
        this.centerValue.textContent = this.getDisplayValue(targetLetter, centerRepresentation);
        this.centerValue.dataset.representation = "name";
      } else {
        const centerGlyph = createOpticallyCenteredGlyph(
          this.document,
          "greek-match-center-symbol"
        );
        centerGlyph.text.textContent = this.getDisplayValue(
          targetLetter,
          centerRepresentation
        );
        this.centerValue.replaceChildren(centerGlyph.svg);
        this.centerValue.dataset.representation = "symbol";
        centerSvgGlyph(centerGlyph.text);
      }
      this.center.dataset.feedback = lastResult
        ? lastResult.isCorrect
          ? "correct"
          : "wrong"
        : this.session.roundComplete
          ? "complete"
          : "waiting";
      this.centerKicker.textContent = lastResult
        ? lastResult.isCorrect
          ? "Correct"
          : "Incorrect"
        : this.session.roundComplete
          ? "Round complete"
          : "Match";
      this.centerStatus.textContent = lastResult
        ? lastResult.isCorrect
          ? `That is ${targetLetter.name}.`
          : `This is ${targetLetter.name}.`
        : this.session.roundComplete
          ? "Choose Next round"
          : ringRepresentation === "name"
            ? "Choose its name"
            : "Choose its symbol";
    }

    const activePronunciationIndex = this.getActivePronunciationIndex();
    const activePronunciationLetter =
      activePronunciationIndex == null
        ? null
        : GREEK_LETTERS[activePronunciationIndex];
    this.pronunciationButton.hidden = !activePronunciationLetter;
    this.pronunciationButton.disabled = !activePronunciationLetter;
    if (activePronunciationLetter) {
      this.pronunciationButton.textContent = `🔊 Hear ${activePronunciationLetter.name}`;
      this.pronunciationButton.setAttribute(
        "aria-label",
        `Hear ${activePronunciationLetter.name} pronounced`
      );
    } else {
      this.pronunciationButton.textContent = "🔊 Hear pronunciation";
      this.pronunciationButton.setAttribute(
        "aria-label",
        "Choose a Greek letter to hear its pronunciation"
      );
    }

    const showWrongAnswerArrow = Boolean(!isTeaching && lastResult && !lastResult.isCorrect);
    const showTeachingArrow = Boolean(isTeaching && teachingLetter);
    const showAnswerArrow = showWrongAnswerArrow || showTeachingArrow;
    this.answerArrow.classList.toggle("is-visible", showAnswerArrow);
    if (showAnswerArrow) {
      const arrowCoordinates = getGreekMatchArrowCoordinates(
        showTeachingArrow ? this.teachingLetterIndex : lastResult.targetIndex,
        showTeachingArrow
      );
      for (const [attribute, value] of Object.entries(arrowCoordinates)) {
        this.answerArrowGlowLine.setAttribute(attribute, String(value));
        this.answerArrowLine.setAttribute(attribute, String(value));
      }
    }

    const currentPercent = getRoundPercent(this.session);
    this.roundLabel.textContent = isTeaching
      ? `Round ${this.session.roundNumber} · game paused`
      : `Round ${this.session.roundNumber} · % correct`;
    this.score.replaceChildren(
      this.document.createTextNode(currentPercent == null ? "—" : String(currentPercent)),
      createElement(this.document, "span", "", "%")
    );
    this.progressText.textContent = `${this.session.attempts} / ${GREEK_LETTERS.length}`;
    this.progressTrack.setAttribute("aria-valuenow", String(this.session.attempts));
    this.progressFill.style.setProperty(
      "--round-progress",
      `${(this.session.attempts / GREEK_LETTERS.length) * 100}%`
    );
    this.nextRoundButton.disabled = isTeaching || this.session.attempts <= 0;
    this.setupSummary.textContent = isTeaching
      ? "Choose any ring item to see its forms and hear its pronunciation. Teaching does not change your score."
      : this.centerRepresentation === "name"
        ? `Names are in the center. Choose the ${this.symbolCase}case symbol at its fixed alphabet position. Use Hear when you want the pronunciation.`
        : `${this.symbolCase === "lower" ? "Lowercase" : "Uppercase"} symbols are in the center. Choose the English name. Use Hear when you want the pronunciation.`;

    const isPerfect =
      this.session.roundComplete &&
      getRoundPercent(this.session) === 100 &&
      Boolean(lastResult?.isCorrect);
    this.board.classList.toggle("is-perfect", !isTeaching && isPerfect);
    this.renderChart();
  }

  renderChart() {
    const scores = this.session.completedRoundScores;
    this.chartSeries.replaceChildren();
    this.chartSeries.style.setProperty("--chart-width", `${Math.max(190, scores.length * 31 + 20)}px`);
    this.chartViewport.setAttribute(
      "aria-label",
      scores.length
        ? `Completed round scores: ${scores.map((score, index) => `round ${index + 1}, ${score} percent`).join("; ")}`
        : "No completed round scores yet."
    );

    if (scores.length === 0) {
      this.chartSeries.append(
        createElement(
          this.document,
          "div",
          "greek-match-chart-empty",
          "Choose Next round to start your session graph."
        )
      );
      return;
    }

    scores.forEach((score, index) => {
      const column = createElement(this.document, "div", "greek-match-bar-column");
      const bar = createElement(
        this.document,
        "div",
        `greek-match-bar${score === 100 ? " is-perfect" : ""}`
      );
      bar.style.setProperty("--score", String(score));
      bar.dataset.score = `${score}%`;
      bar.dataset.round = `R${index + 1}`;
      bar.title = `Round ${index + 1}: ${score}% correct`;
      column.append(bar);
      this.chartSeries.append(column);
    });
    this.chartViewport.scrollLeft = this.chartViewport.scrollWidth;
  }

  destroy() {
    if (this.feedbackTimer != null) {
      this.clearTimeout(this.feedbackTimer);
      this.feedbackTimer = null;
    }
    this.stopPronunciation();
    if (this.pronunciationAudio) {
      this.pronunciationAudio.removeAttribute?.("src");
      this.pronunciationAudio.load?.();
      this.pronunciationAudio = null;
    }
    this.resizeObserver?.disconnect?.();
    if (this.fallbackResizeHandler) {
      this.window?.removeEventListener?.("resize", this.fallbackResizeHandler);
    }
    this.root?.replaceChildren?.();
  }
}

export function mountGreekLetterMatch(options = {}) {
  return new GreekLetterMatchRuntime(options).init();
}
