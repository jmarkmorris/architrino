import {
  createWakeDisplayGeometry,
} from "./CausalDelayFeedbackWakeRenderer.js";
import {
  STORY_MOTION_SPEED_FRACTIONS,
  createStoryView,
  STORY_STEPS,
} from "./CausalDelayFeedbackStoryMode.js";
import {
  createCausalHistoryLedger,
} from "./CausalDelayFeedbackHistoryMode.js";
import {
  createRootsView,
} from "./CausalDelayFeedbackRootsMode.js";
import {
  CAUSAL_DELAY_FEEDBACK_MODES,
} from "./CausalDelayFeedbackModes.js";
import {
  TRANSPORT_CONTROL_ICON,
  setTransportControlButtonPresentation,
} from "../../runtime/TransportControlIcons.js";

function describeReason(reason) {
  const descriptions = {
    accepted_simple_root: "accepted causal root",
    coincident_same_source_root_unresolved: "same-transceiver coincidence is unresolved",
    tangent_root_unresolved: "tangent root is unresolved",
    transversality_floor_failed: "root slope is below the acceptance threshold",
    nonpositive_delay: "transmission delay is not positive",
    producer_delayed_hit_accepted: "recorded delayed hit",
    representative_replay_row: "representative replay row",
    root_without_accepted_hit: "root has no accepted delayed hit",
    no_delayed_hit: "no delayed hit",
    record_has_no_delayed_hit_rows: "the record does not include delayed-hit rows",
    causal_evaluation_unavailable: "causal-root evaluation is unavailable",
  };
  return descriptions[String(reason)] ?? "unavailable result";
}

function createElement(documentLike, tagName, {
  className,
  text,
  attributes = {},
} = {}) {
  const element = documentLike.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (text != null) {
    element.textContent = String(text);
  }
  Object.entries(attributes).forEach(([name, value]) => {
    if (value != null) {
      element.setAttribute(name, String(value));
    }
  });
  return element;
}

function formatTime(value) {
  return Number.isFinite(Number(value)) ? Number(value).toFixed(3) : "—";
}

function setFormattedMathText(documentLike, element, value) {
  const text = String(value ?? "");
  if (
    !text.includes("C_f") ||
    typeof documentLike?.createTextNode !== "function" ||
    typeof element?.replaceChildren !== "function"
  ) {
    element.textContent = text;
    return;
  }
  const children = text.split(/(C_f)/u).map((part) => {
    if (part !== "C_f") {
      return documentLike.createTextNode(part);
    }
    const symbol = documentLike.createElement("span");
    symbol.className = "causal-inline-math";
    symbol.append(documentLike.createTextNode("C"));
    const subscript = documentLike.createElement("sub");
    subscript.textContent = "f";
    symbol.append(subscript);
    return symbol;
  });
  element.replaceChildren(...children);
}

export function createCausalDelayFeedbackModeController(options) {
  return new CausalDelayFeedbackModeController(options);
}

export class CausalDelayFeedbackModeController {
  constructor({
    document,
    state,
    onModeChange,
    onStateChange,
    onPlayToggle,
    onReplay,
    onHome,
    onTableOfContents,
  } = {}) {
    this.document = document ?? globalThis.document;
    this.state = state;
    this.onModeChange = onModeChange;
    this.onStateChange = onStateChange;
    this.onPlayToggle = onPlayToggle;
    this.onReplay = onReplay;
    this.onHome = onHome;
    this.onTableOfContents = onTableOfContents;
    this.boundClick = (event) => this.handleClick(event);
  }

  init() {
    this.dom = {
      app: this.document.querySelector("#causal-delay-feedback-app"),
      journey: this.document.querySelector("#causal-delay-feedback-journey"),
      tabs: this.document.querySelector("#causal-delay-feedback-mode-tabs"),
      panel: this.document.querySelector("#causal-delay-feedback-lesson-panel"),
      title: this.document.querySelector("#causal-delay-feedback-lesson-title"),
      body: this.document.querySelector("#causal-delay-feedback-lesson-body"),
      meta: this.document.querySelector("#causal-delay-feedback-lesson-meta"),
      content: this.document.querySelector("#causal-delay-feedback-lesson-content"),
      status: this.document.querySelector("#causal-delay-feedback-lesson-status"),
      back: this.document.querySelector("#nav-up"),
      play: this.document.querySelector("#causal-delay-feedback-guided-play"),
      next: this.document.querySelector("#nav-forward"),
      firstFrame: this.document.querySelector("#causal-delay-feedback-guided-first-frame"),
      lastFrame: this.document.querySelector("#causal-delay-feedback-guided-last-frame"),
      tocToggle: this.document.querySelector("#textbook-toc-button"),
      home: this.document.querySelector("#home-button"),
      summary: this.document.querySelector("#causal-delay-feedback-canvas-summary"),
    };
    if (Object.values(this.dom).some((element) => !element)) {
      throw new Error("Missing Causal Delay Feedback learner-journey elements.");
    }
    this.dom.journey.addEventListener("click", this.boundClick);
    this.dom.tocToggle.addEventListener("click", () => {
      this.onTableOfContents?.();
    });
    this.dom.home.addEventListener("click", () => this.onHome?.());
    this.render();
    return this;
  }

  destroy() {
    this.dom?.journey?.removeEventListener("click", this.boundClick);
  }

  setState(state) {
    this.state = state;
    this.render();
  }

  setMode(mode) {
    if (!CAUSAL_DELAY_FEEDBACK_MODES.some((candidate) => candidate.id === mode)) {
      return false;
    }
    this.state.mode = mode;
    this.onModeChange?.(mode, this.state);
    this.render();
    return true;
  }

  handleClick(event) {
    const lessonButton = event.target.closest("[data-causal-lesson]");
    if (lessonButton) {
      const lessonIndex = Number(lessonButton.dataset.causalLesson);
      if (
        Number.isInteger(lessonIndex) &&
        lessonIndex >= 0 &&
        lessonIndex < STORY_STEPS.length
      ) {
        this.prepareStoryStepChange();
        this.state.storyStep = lessonIndex;
        this.state.mode = "story";
        this.onModeChange?.("story", this.state);
        this.render();
        this.onStateChange?.(this.state);
      }
      return;
    }
    const laboratoryButton = event.target.closest("[data-causal-laboratory]");
    if (laboratoryButton) {
      this.setMode("sandbox");
      return;
    }
    const storySpeedButton = event.target.closest("[data-story-speed]");
    if (storySpeedButton && this.state.mode === "story") {
      const speedFraction = Number(storySpeedButton.dataset.storySpeed);
      if (
        STORY_MOTION_SPEED_FRACTIONS.includes(speedFraction) &&
        speedFraction !== Number(this.state.storyMotionSpeedFraction)
      ) {
        this.state.storyMotionSpeedFraction = speedFraction;
        this.state.playback.playing = false;
        this.state.playback.resumable = false;
        this.state.playback.completed = false;
        this.onStateChange?.(this.state);
        this.renderStory();
        this.updateCanvasSummary();
      }
      return;
    }
    const rootButton = event.target.closest("[data-root-id]");
    if (rootButton) {
      this.state.selectedRootId = rootButton.dataset.rootId;
      this.onStateChange?.(this.state);
      this.render();
      return;
    }
    const actionButton = event.target.closest("[data-guided-action]");
    if (!actionButton) {
      return;
    }
    switch (actionButton.dataset.guidedAction) {
      case "back":
        this.goBack();
        break;
      case "next":
        this.goNext();
        break;
      case "play":
        this.state.playback.playing = !this.state.playback.playing;
        this.onPlayToggle?.(this.state.playback.playing);
        this.render();
        break;
      case "first-frame":
        this.onReplay?.(this.state);
        this.render();
        break;
      default:
        break;
    }
  }

  goBack() {
    if (this.state.mode === "story" && this.state.storyStep > 0) {
      this.prepareStoryStepChange();
      this.state.storyStep -= 1;
    } else if (this.state.mode === "sandbox") {
      this.prepareStoryStepChange();
      this.state.mode = "story";
      this.state.storyStep = STORY_STEPS.length - 1;
      this.onModeChange?.("story", this.state);
    } else {
      return;
    }
    this.render();
    this.onStateChange?.(this.state);
  }

  goNext() {
    if (this.state.mode === "story" && this.state.storyStep < STORY_STEPS.length - 1) {
      this.prepareStoryStepChange();
      this.state.storyStep += 1;
    } else if (this.state.mode === "story") {
      this.setMode("sandbox");
      return;
    } else {
      return;
    }
    this.render();
    this.onStateChange?.(this.state);
  }

  prepareStoryStepChange() {
    if (this.state.playback.playing) {
      this.state.playback.playing = false;
      this.onPlayToggle?.(false);
    }
    this.state.playback.resumable = false;
    this.state.playback.completed = false;
  }

  render() {
    if (!this.dom || !this.state) {
      return;
    }
    const isSandbox = this.state.mode === "sandbox";
    this.dom.app?.classList.toggle("is-guided-mode", !isSandbox);
    this.dom.app?.classList.toggle("is-sandbox-mode", isSandbox);
    this.dom.journey.dataset.mode = this.state.mode;
    this.dom.panel.hidden = isSandbox;
    this.renderTabs();
    if (isSandbox) {
      this.updateControls();
      this.dom.summary.textContent =
        "Laboratory. Both architrino paths and the evaluator-backed positrino and electrino current-emission markers are shown; replay time is preserved for inspection.";
      return;
    }
    this.renderModeContent();
    this.updateControls();
    this.updateCanvasSummary();
  }

  renderLiveState() {
    if (!this.dom || !this.state || this.state.mode === "sandbox") {
      return;
    }
    this.renderModeContent();
    this.updateControls();
    this.updateCanvasSummary();
  }

  renderModeContent() {
    const mode = CAUSAL_DELAY_FEEDBACK_MODES.find(
      (candidate) => candidate.id === this.state.mode,
    );
    const renderMethod = mode?.renderMethod ?? "renderStory";
    this[renderMethod]();
  }

  renderTabs() {
    const list = createElement(this.document, "ol", {
      className: "causal-lesson-toc-list",
    });
    STORY_STEPS.forEach((lesson, lessonIndex) => {
      const item = this.document.createElement("li");
      item.append(createElement(this.document, "button", {
        className: "causal-mode-tab",
        text: `${lessonIndex + 1}. ${lesson.title}`,
        attributes: {
          type: "button",
          "data-causal-lesson": lessonIndex,
          "aria-current":
            this.state.mode === "story" && this.state.storyStep === lessonIndex
              ? "step"
              : null,
        },
      }));
      list.append(item);
    });
    const laboratoryItem = this.document.createElement("li");
    laboratoryItem.append(createElement(this.document, "button", {
      className: "causal-mode-tab",
      text: "Laboratory",
      attributes: {
        type: "button",
        "data-causal-laboratory": "",
        "aria-current": this.state.mode === "sandbox" ? "step" : null,
      },
    }));
    list.append(laboratoryItem);
    this.dom.tabs.replaceChildren(list);
  }

  renderStory() {
    const view = createStoryView(this.state);
    this.state.storyStep = view.stepIndex;
    this.setLessonCopy({
      title: view.title,
      body: view.body,
      meta: `Lesson ${view.stepIndex + 1} of ${view.stepCount}`,
      status: "",
    });
    if (view.id === "motion") {
      const selector = createElement(this.document, "div", {
        className: "causal-story-speed-selector",
        attributes: {
          role: "group",
          "aria-label": "Highlight a declared transmitter speed",
        },
      });
      selector.append(createElement(this.document, "span", {
        className: "causal-story-speed-label",
        text: "Compare transmitter speeds",
      }));
      STORY_MOTION_SPEED_FRACTIONS.forEach((speedFraction) => {
        const button = createElement(this.document, "button", {
          className: "causal-story-speed-button",
          attributes: {
            type: "button",
            "data-story-speed": speedFraction,
            "aria-pressed":
              Number(this.state.storyMotionSpeedFraction) === speedFraction
                ? "true"
                : "false",
          },
        });
        setFormattedMathText(this.document, button, `${speedFraction.toFixed(1)} C_f`);
        selector.append(button);
      });
      this.dom.content.replaceChildren(selector);
      return;
    }
    if (view.id !== "meaning") {
      this.dom.content.replaceChildren();
      return;
    }
    this.dom.content.replaceChildren(createElement(this.document, "dl", {
      className: "causal-event-readout",
    }));
    const readout = this.dom.content.querySelector("dl");
    view.relationshipDescriptions.forEach(({ label, description }) => {
      readout.append(
        createElement(this.document, "dt", { text: label }),
        createElement(this.document, "dd", { text: description }),
      );
    });
  }

  renderHistory() {
    const rows = createCausalHistoryLedger(this.state);
    const selectedRow = rows.find((row) => row.selected) ?? null;
    this.setLessonCopy({
      title: "Path History",
      body: "Each row refers to the transmitter path used by the scene. Selecting a root row selects the matching wake intersection and branch.",
      meta: "Retained transmission history",
      status: `${rows.length} retained rows; ${
        selectedRow ? `row ${selectedRow.depth} is selected` : "no root row is selected"
      }.`,
    });
    const table = this.createTable(["History row", "Tₜ", "State", "Reason"]);
    const body = table.querySelector("tbody");
    rows.forEach((row) => {
      const tr = this.document.createElement("tr");
      if (row.selected) {
        tr.dataset.selected = "true";
      }
      const selectCell = this.document.createElement("td");
      const button = createElement(this.document, "button", {
        className: "causal-ledger-button",
        text: `Row ${row.depth}`,
        attributes: {
          type: "button",
          "data-root-id": row.rootId,
          disabled: row.rootId ? null : "",
        },
      });
      selectCell.append(button);
      [
        selectCell,
        createElement(this.document, "td", { text: formatTime(row.emissionTime) }),
        createElement(this.document, "td", { text: row.state }),
        createElement(this.document, "td", { text: describeReason(row.reason) }),
      ].forEach((cell) => tr.append(cell));
      body.append(tr);
    });
    this.dom.content.replaceChildren(table);
  }

  renderRoots() {
    const view = createRootsView(this.state);
    this.setLessonCopy({
      title: "Roots",
      body: "At one reception time Tᵣ, every zero of g(Tᵣ;Tₜ) is linked to the same wake intersection, history row, and root identity.",
      meta: `${view.notation}=0`,
      status: view.available
        ? `${view.activeRootCount} active causal ${view.activeRootCount === 1 ? "root" : "roots"}.`
        : `Unavailable: ${describeReason(view.unavailableReason)}.`,
    });
    const grid = createElement(this.document, "div", { className: "causal-roots-grid" });
    grid.append(
      this.createDelayMapSvg(view),
      this.createMetricCard("Active roots", view.activeRootCount),
      this.createMetricCard("Reception time Tᵣ", formatTime(view.receiverTime)),
      this.createMetricCard("Selected Tₜ", formatTime(this.state.emissionTime)),
      this.createMetricCard(
        "transversality",
        Number.isFinite(view.selectedRoot?.transversality)
          ? view.selectedRoot.transversality.toFixed(4)
          : "unavailable",
      ),
      this.createMetricCard("Ordinary-fold ΔN", view.fold.deltaN > 0 ? "+2" : String(view.fold.deltaN)),
      this.createMetricCard("Pointwise acceleration", view.fold.pointwiseAcceleration.toFixed(2)),
      this.createMetricCard("Finite accumulated ΔV", view.fold.accumulatedVelocityChange.toFixed(3)),
    );
    const note = createElement(this.document, "p", {
      className: "causal-fold-note",
      text: "The ordinary fold has a pointwise acceleration spike while its accumulated velocity change stays finite. Coincident same-transceiver birth remains unresolved. Transversality is the slope of the delay-map curve at a root; a near-zero slope marks a tangent case that this view does not accept as a simple acceleration row.",
    });
    this.dom.content.replaceChildren(grid, note);
  }

  renderSelfHit() {
    this.setLessonCopy({
      title: "Forward Wake Buildup",
      body: "At field speed, an architrino's past wakes accumulate at its moving front, creating a growing forward wake buildup.",
      meta: "Declared field-speed display fixture",
      status: "",
    });
    this.dom.content.replaceChildren();
  }

  createDelayMapSvg(view) {
    const wrapper = createElement(this.document, "figure", { className: "causal-delay-map" });
    const svg = this.document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 420 190");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", `${view.activeRootCount} active roots of g(Tᵣ;Tₜ)`);
    const samples = view.samples.filter((sample) => Number.isFinite(sample.value));
    if (samples.length > 1) {
      const minT = samples[0].emissionTime;
      const maxT = samples.at(-1).emissionTime;
      const maxAbs = Math.max(...samples.map((sample) => Math.abs(sample.value)), 1e-6);
      const points = samples.map((sample) => {
        const x = 24 + ((sample.emissionTime - minT) / Math.max(1e-9, maxT - minT)) * 372;
        const y = 92 - (sample.value / maxAbs) * 68;
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      }).join(" ");
      const axis = this.document.createElementNS("http://www.w3.org/2000/svg", "line");
      axis.setAttribute("x1", "20");
      axis.setAttribute("x2", "400");
      axis.setAttribute("y1", "92");
      axis.setAttribute("y2", "92");
      axis.setAttribute("class", "causal-delay-map-axis");
      const polyline = this.document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      polyline.setAttribute("points", points);
      polyline.setAttribute("class", "causal-delay-map-line");
      svg.append(axis, polyline);
      view.activeRoots.forEach((root) => {
        const marker = this.document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const x = 24 + ((root.emissionTime - minT) / Math.max(1e-9, maxT - minT)) * 372;
        marker.setAttribute("cx", String(x));
        marker.setAttribute("cy", "92");
        marker.setAttribute("r", "5");
        marker.setAttribute("class", "causal-delay-map-root");
        svg.append(marker);
      });
    }
    wrapper.append(
      svg,
      createElement(this.document, "figcaption", { text: "Delay map g(Tᵣ;Tₜ); marked zeros are active causal roots." }),
    );
    return wrapper;
  }

  createMetricCard(label, value) {
    const card = createElement(this.document, "div", { className: "causal-metric-card" });
    card.append(
      createElement(this.document, "span", { text: label }),
      createElement(this.document, "strong", { text: value }),
    );
    return card;
  }

  createTable(headings) {
    const table = createElement(this.document, "table", { className: "causal-ledger-table" });
    const head = this.document.createElement("thead");
    const headRow = this.document.createElement("tr");
    headings.forEach((heading) => headRow.append(createElement(this.document, "th", {
      text: heading,
      attributes: { scope: "col" },
    })));
    head.append(headRow);
    table.append(head, this.document.createElement("tbody"));
    return table;
  }

  setLessonCopy({ title, body, meta, status }) {
    this.dom.title.textContent = title;
    setFormattedMathText(this.document, this.dom.body, body);
    this.dom.meta.textContent = meta;
    this.dom.status.textContent = status ?? "";
    this.dom.status.hidden = !String(status ?? "").trim();
  }

  updateControls() {
    const storyPlayback = this.state.mode === "story";
    const isPlaying = this.state.playback.playing;
    const isResumable = storyPlayback && this.state.playback.resumable;
    const isCompleted = storyPlayback && this.state.playback.completed;
    this.dom.back.disabled = this.state.mode === "story" && this.state.storyStep === 0;
    this.dom.next.disabled = this.state.mode === "sandbox";
    this.dom.play.disabled = isCompleted;
    const playLabel = storyPlayback
      ? isPlaying
        ? "Pause lesson"
        : isResumable
          ? "Resume lesson"
          : isCompleted
            ? "Lesson complete; use First frame to return to the start"
            : "Play lesson"
      : isPlaying
        ? "Pause replay"
        : "Play replay";
    setTransportControlButtonPresentation(this.dom.play, {
      kind: isPlaying
        ? TRANSPORT_CONTROL_ICON.PAUSE
        : TRANSPORT_CONTROL_ICON.PLAY,
      label: playLabel,
      pressed: isPlaying,
    });
    this.dom.play.setAttribute("aria-keyshortcuts", "Space");
    setTransportControlButtonPresentation(this.dom.firstFrame, {
      kind: TRANSPORT_CONTROL_ICON.FIRST_FRAME,
      label: "First frame",
    });
    setTransportControlButtonPresentation(this.dom.lastFrame, {
      kind: TRANSPORT_CONTROL_ICON.LAST_FRAME,
      label: "Last frame",
    });
  }

  updateCanvasSummary() {
    const root = this.state.roots.find((candidate) => candidate.id === this.state.selectedRootId);
    const reciprocalRoot = this.state.reciprocalRoots?.find(
      (candidate) => candidate.id === this.state.selectedReciprocalRootId,
    );
    const wake = root ? createWakeDisplayGeometry(root, this.state.receiverTime) : null;
    this.state.wakeGeometry = wake ? [wake] : [];
    const modeLabel = CAUSAL_DELAY_FEEDBACK_MODES.find(
      (mode) => mode.id === this.state.mode,
    )?.label ?? "View";
    const storyView = this.state.mode === "story"
      ? createStoryView(this.state)
      : null;
    this.dom.summary.textContent = this.state.mode === "story"
      ? storyView?.id === "motion"
        ? `Lesson Four. Three evaluator-backed constant-speed display fixtures compare transmitter speeds ${STORY_MOTION_SPEED_FRACTIONS.join(", ")} times C_f; ${Number(this.state.storyMotionSpeedFraction).toFixed(1)} is highlighted.`
        : storyView?.id === "forward-buildup"
          ? "Lesson Five. Both architrinos begin at emission zero on the shared paired paths while their first wake fronts build forward from the emitters."
          : "Lesson. Electrino transmitter to Positrino receiver; Positrino transmitter to Electrino receiver."
      : this.state.mode === "history" && root && reciprocalRoot
        ? `Path History. Positrino and Electrino history-emission markers show the evaluator-backed earlier points for both reciprocal relationships at Tₜ=${formatTime(root.emissionTime)} and Tₜ=${formatTime(reciprocalRoot.emissionTime)}.`
      : this.state.mode === "sandbox" && root && reciprocalRoot
        ? `Laboratory. Positrino and electrino current-emission markers and wake geometry follow the shared replay state at Tₜ=${formatTime(root.emissionTime)} and Tₜ=${formatTime(reciprocalRoot.emissionTime)}.`
      : root
      ? `${modeLabel}. Transmitter ${root.sourceId} transmitted at Tₜ=${formatTime(root.emissionTime)}; receiver ${root.receiverId} receives at Tᵣ=${formatTime(root.receiverTime)}. Root ${root.ordinal} is ${root.accepted ? "accepted" : describeReason(root.reason)}.`
      : `${modeLabel}. No causal root is available at the selected receiver event.`;
  }
}
