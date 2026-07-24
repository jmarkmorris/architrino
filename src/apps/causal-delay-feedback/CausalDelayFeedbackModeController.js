import {
  createWakeDisplayGeometry,
} from "./CausalDelayFeedbackWakeRenderer.js";
import {
  createStoryView,
  createPredictionView,
  STORY_STEPS,
} from "./CausalDelayFeedbackStoryMode.js";
import {
  createCausalHistoryLedger,
} from "./CausalDelayFeedbackHistoryMode.js";
import {
  createRootsView,
  createSelfHitScenarios,
} from "./CausalDelayFeedbackRootsMode.js";
import {
  createBranchLabView,
} from "./CausalDelayFeedbackBranchLabMode.js";

export const CAUSAL_DELAY_FEEDBACK_MODES = Object.freeze([
  { id: "story", label: "Story", renderMethod: "renderStory" },
  { id: "prediction", label: "Prediction", renderMethod: "renderPrediction" },
  { id: "history", label: "Path History", renderMethod: "renderHistory" },
  { id: "roots", label: "Roots", renderMethod: "renderRoots" },
  { id: "self-hit", label: "Self-Hit", renderMethod: "renderSelfHit" },
  { id: "branch-lab", label: "Branch Lab", renderMethod: "renderBranchLab" },
  { id: "sandbox", label: "Sandbox", renderMethod: null },
]);

export function normalizeCausalDelayFeedbackMode(mode, fallback = "story") {
  return CAUSAL_DELAY_FEEDBACK_MODES.some((candidate) => candidate.id === mode)
    ? mode
    : fallback;
}

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

function describeSelfHitState(state) {
  const descriptions = {
    absent: "no self-hit",
    unresolved: "unresolved threshold",
    tangent: "tangent root",
    active: "active self-hit",
    "failed-floor": "below the slope threshold",
  };
  return descriptions[String(state)] ?? "unavailable";
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
  } = {}) {
    this.document = document ?? globalThis.document;
    this.state = state;
    this.onModeChange = onModeChange;
    this.onStateChange = onStateChange;
    this.onPlayToggle = onPlayToggle;
    this.onReplay = onReplay;
    this.boundClick = (event) => this.handleClick(event);
    this.boundInput = (event) => this.handleInput(event);
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
      back: this.document.querySelector("#causal-delay-feedback-guided-back"),
      play: this.document.querySelector("#causal-delay-feedback-guided-play"),
      next: this.document.querySelector("#causal-delay-feedback-guided-next"),
      replay: this.document.querySelector("#causal-delay-feedback-guided-replay"),
      sandbox: this.document.querySelector("#causal-delay-feedback-guided-sandbox"),
      summary: this.document.querySelector("#causal-delay-feedback-canvas-summary"),
    };
    if (Object.values(this.dom).some((element) => !element)) {
      throw new Error("Missing Causal Delay Feedback learner-journey elements.");
    }
    this.dom.journey.addEventListener("click", this.boundClick);
    this.dom.journey.addEventListener("input", this.boundInput);
    this.render();
    return this;
  }

  destroy() {
    this.dom?.journey?.removeEventListener("click", this.boundClick);
    this.dom?.journey?.removeEventListener("input", this.boundInput);
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
    const modeButton = event.target.closest("[data-causal-mode]");
    if (modeButton) {
      this.setMode(modeButton.dataset.causalMode);
      return;
    }
    const predictionButton = event.target.closest("[data-prediction-id]");
    if (predictionButton) {
      this.selectPrediction(predictionButton.dataset.predictionId);
      return;
    }
    const rootButton = event.target.closest("[data-root-id]");
    if (rootButton) {
      this.state.selectedRootId = rootButton.dataset.rootId;
      this.onStateChange?.(this.state);
      this.render();
      return;
    }
    const selfHitButton = event.target.closest("[data-self-hit-id]");
    if (selfHitButton) {
      this.state.selectedSelfHitScenarioId = selfHitButton.dataset.selfHitId;
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
      case "replay":
        this.state.storyStep = 0;
        this.state.predictionState = "unanswered";
        this.state.selectedPredictionId = null;
        this.onReplay?.(this.state);
        this.render();
        break;
      case "sandbox":
        this.setMode("sandbox");
        break;
      default:
        break;
    }
  }

  handleInput(event) {
    const control = event.target.closest("[data-branch-filter]");
    if (!control || this.state.mode !== "branch-lab") {
      return;
    }
    const key = control.dataset.branchFilter;
    const next = { ...this.state.branchFilters };
    if (key === "rootKind") {
      next.rootKind = control.value;
    } else if (key === "historyAgeLimit") {
      next.historyAgeLimit = control.value === ""
        ? Number.POSITIVE_INFINITY
        : Math.max(0, Number(control.value));
    } else {
      next[key] = Math.max(0, Number(control.value) || 0);
    }
    this.state.branchFilters = next;
    this.onStateChange?.(this.state);
    this.renderBranchLab();
    const replacement = this.dom.content.querySelector(`[data-branch-filter="${key}"]`);
    replacement?.focus();
  }

  goBack() {
    if (this.state.mode === "story" && this.state.storyStep > 0) {
      this.state.storyStep -= 1;
    } else {
      const index = CAUSAL_DELAY_FEEDBACK_MODES.findIndex((mode) => mode.id === this.state.mode);
      this.setMode(CAUSAL_DELAY_FEEDBACK_MODES[Math.max(0, index - 1)].id);
      return;
    }
    this.onStateChange?.(this.state);
    this.render();
  }

  goNext() {
    if (this.state.mode === "prediction" && this.state.predictionState !== "correct") {
      return;
    }
    if (this.state.mode === "story" && this.state.storyStep < STORY_STEPS.length - 1) {
      this.state.storyStep += 1;
    } else {
      const index = CAUSAL_DELAY_FEEDBACK_MODES.findIndex((mode) => mode.id === this.state.mode);
      this.setMode(CAUSAL_DELAY_FEEDBACK_MODES[Math.min(CAUSAL_DELAY_FEEDBACK_MODES.length - 1, index + 1)].id);
      return;
    }
    this.onStateChange?.(this.state);
    this.render();
  }

  selectPrediction(predictionId) {
    const view = createPredictionView(this.state);
    const choice = view.choices.find((candidate) => candidate.id === predictionId);
    if (!choice) {
      return;
    }
    this.state.selectedPredictionId = choice.id;
    this.state.predictionState = choice.correct ? "correct" : "incorrect";
    if (choice.correct) {
      this.state.emissionTime = choice.emissionTime;
    }
    this.onStateChange?.(this.state);
    this.render();
  }

  render() {
    if (!this.dom || !this.state) {
      return;
    }
    const isSandbox = this.state.mode === "sandbox";
    this.dom.app?.classList.toggle("is-guided-mode", !isSandbox);
    this.dom.app?.classList.toggle("is-sandbox-mode", isSandbox);
    this.dom.panel.hidden = isSandbox;
    this.renderTabs();
    if (isSandbox) {
      this.dom.summary.textContent =
        "Sandbox view. Both transceiver paths, replay time, and the selected wake are preserved.";
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
    const focusedBranchFilter =
      this.state.mode === "branch-lab" &&
      this.document.activeElement?.matches?.("[data-branch-filter]");
    if (!focusedBranchFilter) {
      this.renderModeContent();
    }
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
    this.dom.tabs.replaceChildren(
      ...CAUSAL_DELAY_FEEDBACK_MODES.map((mode) => createElement(this.document, "button", {
        className: "causal-mode-tab",
        text: mode.label,
        attributes: {
          type: "button",
          "data-causal-mode": mode.id,
          "aria-current": this.state.mode === mode.id ? "step" : null,
        },
      })),
    );
  }

  renderStory() {
    const view = createStoryView(this.state);
    this.setLessonCopy({
      title: view.title,
      body: view.body,
      meta: `Story ${view.stepIndex + 1} of ${view.stepCount}`,
      status: view.summary,
    });
    const [primary, reciprocal] = view.interactions;
    this.dom.content.replaceChildren(
      createElement(this.document, "dl", { className: "causal-event-readout" }),
    );
    const readout = this.dom.content.querySelector("dl");
    [
      ["Relationship 1", "positrino transmitter → electrino receiver"],
      ["Positrino transmit time Tₜ", formatTime(primary?.root?.emissionTime)],
      ["Relationship 2", "electrino transmitter → positrino receiver"],
      ["Electrino transmit time Tₜ", formatTime(reciprocal?.root?.emissionTime)],
      ["Shared reception time Tᵣ", formatTime(primary?.root?.receiverTime)],
      [
        "Root status",
        primary?.root && reciprocal?.root
          ? "two reciprocal roots available"
          : "reciprocal root unavailable",
      ],
    ].forEach(([term, description]) => {
      readout.append(
        createElement(this.document, "dt", { text: term }),
        createElement(this.document, "dd", { text: description }),
      );
    });
  }

  renderPrediction() {
    const view = createPredictionView(this.state);
    this.setLessonCopy({
      title: view.title,
      body: view.body,
      meta: "Prediction",
      status: view.explanation,
    });
    const list = createElement(this.document, "div", {
      className: "causal-prediction-choices",
      attributes: { role: "group", "aria-label": "Earlier transmission positions" },
    });
    view.choices.forEach((choice) => {
      const selected = choice.id === this.state.selectedPredictionId;
      const button = createElement(this.document, "button", {
        className: "causal-choice-button",
        text: `${choice.label} · Tₜ=${formatTime(choice.emissionTime)}`,
        attributes: {
          type: "button",
          "data-prediction-id": choice.id,
          "aria-pressed": selected ? "true" : "false",
        },
      });
      if (selected) {
        button.dataset.answer = choice.correct ? "correct" : "incorrect";
      }
      list.append(button);
    });
    this.dom.content.replaceChildren(list);
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
    const scenarios = createSelfHitScenarios();
    this.setLessonCopy({
      title: "Self-Hit",
      body: "The same evaluator compares one transceiver path with its own later reception event. Line-of-sight root geometry decides the result; a total-speed label does not.",
      meta: "Same-transceiver causal roots",
      status: "No self-hit, unresolved, active, and below the threshold remain distinct.",
    });
    const cards = createElement(this.document, "div", { className: "causal-self-hit-grid" });
    scenarios.forEach((scenario) => {
      const card = createElement(this.document, "article", {
        className: "causal-state-card",
        attributes: {
          "data-root-state": scenario.state,
          "data-selected": scenario.id === this.state.selectedSelfHitScenarioId ? "true" : null,
        },
      });
      card.append(
        createElement(this.document, "h3", { text: scenario.label }),
        createElement(this.document, "strong", { text: describeSelfHitState(scenario.state) }),
        createElement(this.document, "p", { text: scenario.explanation }),
        createElement(this.document, "code", {
          text: `${scenario.transversalityField}=${
            Number.isFinite(scenario.transversality)
              ? scenario.transversality.toExponential(3)
              : "unavailable"
          } · transmitter-side ∂g/∂Tₜ`,
        }),
        createElement(this.document, "button", {
          className: "causal-choice-button",
          text: "Show in scene",
          attributes: {
            type: "button",
            "data-self-hit-id": scenario.id,
            "aria-pressed": scenario.id === this.state.selectedSelfHitScenarioId ? "true" : "false",
          },
        }),
      );
      cards.append(card);
    });
    this.dom.content.replaceChildren(cards);
  }

  renderBranchLab() {
    const view = createBranchLabView(this.state);
    this.setLessonCopy({
      title: "Branch Lab",
      body: "Accepted, rejected, unresolved, and unavailable rows remain visible. The vector sum consumes exactly the accepted rows shown here.",
      meta: "Branch-local acceleration rows",
      status: `${view.acceptedRows.length} accepted acceleration rows · ${view.rejectedRows.length} rejected · ${view.filteredRows.length} unavailable or filtered · vector sum (${view.vectorSum.x.toFixed(2)}, ${view.vectorSum.y.toFixed(2)}).`,
    });
    const filters = this.createBranchFilters();
    const table = this.createTable(["Branch", "Tₜ → Tᵣ", "Status", "Acceleration", "Reason"]);
    const body = table.querySelector("tbody");
    view.rows.forEach((row) => {
      const tr = this.document.createElement("tr");
      tr.dataset.branchStatus = row.included
        ? row.accepted ? "accepted" : "rejected"
        : "filtered";
      const branchCell = this.document.createElement("td");
      const swatch = createElement(this.document, "span", {
        className: "causal-branch-swatch",
        attributes: { "aria-hidden": "true" },
      });
      swatch.style.backgroundColor = row.color;
      branchCell.append(swatch, this.document.createTextNode(`Branch ${row.ordinal ?? "—"}`));
      tr.append(branchCell);
      [
        `${formatTime(row.emissionTime)} → ${formatTime(row.receiverTime)}`,
        row.included
          ? row.accepted ? "accepted" : "rejected"
          : `filtered ${row.accepted ? "accepted" : "rejected"}`,
        row.accelerationAvailable
          ? `(${row.acceleration.x.toFixed(2)}, ${row.acceleration.y.toFixed(2)})`
          : "unavailable",
        row.filterReason
          ? `${describeReason(row.reason)} · ${row.filterReason}`
          : describeReason(row.reason),
      ].forEach((text) => tr.append(createElement(this.document, "td", { text })));
      body.append(tr);
    });
    const sum = createElement(this.document, "p", {
      className: "causal-vector-sum",
      text: `Displayed vector sum from ${
        view.acceptedRows.length === 0
          ? "no accepted rows"
          : `accepted ${view.acceptedRows.length === 1 ? "row" : "rows"} ${
              view.acceptedRows.map((row) => row.ordinal ?? "—").join(", ")
            }`
      }: (${view.vectorSum.x.toFixed(2)}, ${view.vectorSum.y.toFixed(2)})`,
    });
    this.dom.content.replaceChildren(filters, table, sum);
  }

  createBranchFilters() {
    const filters = this.state.branchFilters;
    const group = createElement(this.document, "div", {
      className: "causal-branch-filters",
      attributes: { role: "group", "aria-label": "Branch filters" },
    });
    const fields = [
      {
        label: "History age",
        key: "historyAgeLimit",
        type: "number",
        value: Number.isFinite(filters.historyAgeLimit) ? filters.historyAgeLimit : "",
        attributes: { min: 0, step: 0.05, placeholder: "All" },
      },
      {
        label: "Minimum contribution",
        key: "minimumContribution",
        type: "number",
        value: filters.minimumContribution,
        attributes: { min: 0, step: 0.1 },
      },
      {
        label: "Transversality floor",
        key: "transversalityFloor",
        type: "number",
        value: filters.transversalityFloor,
        attributes: { min: 0, step: 0.001 },
      },
    ];
    fields.forEach((field) => {
      const label = createElement(this.document, "label", { text: field.label });
      label.append(createElement(this.document, "input", {
        attributes: {
          type: field.type,
          value: field.value,
          "data-branch-filter": field.key,
          ...field.attributes,
        },
      }));
      group.append(label);
    });
    const kindLabel = createElement(this.document, "label", { text: "Root kind" });
    const select = createElement(this.document, "select", {
      attributes: { "data-branch-filter": "rootKind" },
    });
    [
      ["all", "All"],
      ["pair_hit", "Pair root"],
      ["producer_carried_row", "Producer row"],
    ].forEach(([value, label]) => {
      const option = createElement(this.document, "option", {
        text: label,
        attributes: { value },
      });
      option.selected = value === filters.rootKind;
      select.append(option);
    });
    kindLabel.append(select);
    group.append(kindLabel);
    return group;
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
    this.dom.body.textContent = body;
    this.dom.meta.textContent = meta;
    this.dom.status.textContent = status;
  }

  updateControls() {
    const modeIndex = CAUSAL_DELAY_FEEDBACK_MODES.findIndex((mode) => mode.id === this.state.mode);
    this.dom.back.disabled = this.state.mode === "story" && this.state.storyStep === 0;
    this.dom.next.disabled =
      modeIndex >= CAUSAL_DELAY_FEEDBACK_MODES.length - 1 ||
      (this.state.mode === "prediction" && this.state.predictionState !== "correct");
    this.dom.play.textContent = this.state.playback.playing ? "Pause" : "Play";
    this.dom.play.setAttribute("aria-pressed", this.state.playback.playing ? "true" : "false");
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
    this.dom.summary.textContent = this.state.mode === "story" && root && reciprocalRoot
      ? `Story. Positrino transmitter Tₜ=${formatTime(root.emissionTime)} to electrino receiver, and electrino transmitter Tₜ=${formatTime(reciprocalRoot.emissionTime)} to positrino receiver; both receive at Tᵣ=${formatTime(root.receiverTime)}.`
      : root
      ? `${modeLabel}. Transmitter ${root.sourceId} transmitted at Tₜ=${formatTime(root.emissionTime)}; receiver ${root.receiverId} receives at Tᵣ=${formatTime(root.receiverTime)}. Root ${root.ordinal} is ${root.accepted ? "accepted" : describeReason(root.reason)}.`
      : `${modeLabel}. No causal root is available at the selected receiver event.`;
  }
}
