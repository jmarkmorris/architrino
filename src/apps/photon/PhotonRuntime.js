import {
  createDefaultPhotonState,
  normalizePhotonState,
  parsePhotonStateJson,
  serializePhotonState,
  wrapPhotonTime,
} from "./PhotonStateRuntime.js";
import { createMarkdownRuntime } from "../../runtime/MarkdownRuntime.js";
import { extractMarkdownSection } from "../../services/MarkdownPolicyService.js";
import { createPhotonControlsRuntime } from "./PhotonControlsRuntime.js";
import { computePhotonFormulaSummary } from "./PhotonFormulaRuntime.js";
import { getPhotonDiagnosticRows, formatPhotonFixed } from "./PhotonDiagnosticsRuntime.js";
import {
  drawPhotonElectricFieldPlot,
  drawPhotonSwarmStage,
} from "./PhotonSwarmVisualRuntime.js";

const PHOTON_DOCS = {
  guide: {
    name: "Photon Guide",
    markdownPath: "reference/priorities/photon-app/photon-guide.md",
    markdownColumns: 1,
  },
  project: {
    name: "Photon App",
    markdownPath: "reference/priorities/photon-app/photon-app.md",
    markdownColumns: 1,
  },
  requirements: {
    name: "Photon App Requirements",
    markdownPath: "reference/priorities/photon-app/photon-app-requirements.md",
    markdownColumns: 1,
  },
};

function queryPhotonElement(documentLike, selector) {
  const element = documentLike.querySelector(selector);
  if (!element) {
    throw new Error(`Missing photon app element: ${selector}`);
  }
  return element;
}

function setText(element, value) {
  if (element) {
    element.textContent = value;
  }
}

function setTextAll(elements, value) {
  elements.forEach((element) => setText(element, value));
}

function renderRows(documentLike, container, rows) {
  container.textContent = "";
  rows.forEach(([label, value]) => {
    const row = documentLike.createElement("div");
    row.className = "photon-readout-row";
    const labelElement = documentLike.createElement("span");
    labelElement.textContent = label;
    const valueElement = documentLike.createElement("strong");
    valueElement.textContent = value;
    row.append(labelElement, valueElement);
    container.append(row);
  });
}

function renderFormulaSummary(documentLike, container, summary) {
  const values = [
    ["Ipass = I0 cos^2(theta)", formatPhotonFixed(summary.malusTarget, 3)],
    ["mu pass", formatPhotonFixed(summary.field.analyzer.passMeasure, 3)],
    ["cycle average", formatPhotonFixed(summary.averagePass, 3)],
    ["residual", formatPhotonFixed(summary.malusResidual, 4)],
    ["source count", String(summary.field.sourceCount)],
    ["root count", String(summary.field.rootCount)],
    ["mean delay", formatPhotonFixed(summary.field.averageDelay, 3)],
    ["nearest source", formatPhotonFixed(summary.field.nearestSourceDistance, 3)],
    ["S0", formatPhotonFixed(summary.stokes.s0, 3)],
    ["S1", formatPhotonFixed(summary.stokes.s1, 3)],
    ["S2", formatPhotonFixed(summary.stokes.s2, 3)],
    ["S3", formatPhotonFixed(summary.stokes.s3, 3)],
  ];
  renderRows(documentLike, container, values);
}

function getPhotonEventTargetTagName(target) {
  return String(target?.tagName ?? "").toUpperCase();
}

export function shouldHandlePhotonSpaceToggle(event = {}) {
  const isSpaceKey = event.code === "Space" || event.key === " " || event.key === "Spacebar";
  if (
    !isSpaceKey ||
    event.defaultPrevented ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey
  ) {
    return false;
  }

  const target = event.target;
  if (target?.isContentEditable) {
    return false;
  }

  return !["INPUT", "TEXTAREA", "SELECT", "BUTTON", "OPTION"].includes(
    getPhotonEventTargetTagName(target)
  );
}

function appendPhotonCacheBust(path, token) {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}v=${token}`;
}

function createPhotonMarkdownRenderer(windowLike) {
  const markdownItFactory = windowLike?.markdownit;
  if (typeof markdownItFactory !== "function") {
    return null;
  }
  const markdownRenderer = markdownItFactory({ html: false, linkify: true, breaks: false });
  markdownRenderer.disable("escape");
  return markdownRenderer;
}

function getPhotonMarkdownNameForPath(markdownPath) {
  const knownDoc = Object.values(PHOTON_DOCS).find((doc) => doc.markdownPath === markdownPath);
  if (knownDoc) {
    return knownDoc.name;
  }
  return String(markdownPath ?? "")
    .split("/")
    .at(-1)
    ?.replace(/\.md$/i, "")
    .replace(/[-_]+/g, " ") || "Document";
}

function createPhotonMarkdownRuntime({
  windowLike,
  markdownPanel,
  markdownTitle,
  markdownBody,
  markdownLayoutToggle,
}) {
  const markdownCache = new Map();
  const markdownSectionCache = new Map();
  const cacheBustToken = Date.now().toString();
  let markdownRuntime = null;

  const openMarkdownTarget = async (target) => {
    if (!markdownRuntime || typeof target !== "string") {
      return;
    }
    const isRuntimeMarkdownTarget = target.startsWith("runtime:markdown:");
    await markdownRuntime.showMarkdownPanel(
      isRuntimeMarkdownTarget
        ? { id: target, name: "Document", markdownColumns: 1 }
        : {
            markdownPath: target,
            name: getPhotonMarkdownNameForPath(target),
            markdownColumns: 1,
          }
    );
  };

  markdownRuntime = createMarkdownRuntime({
    markdownPanel,
    markdownTitle,
    markdownBody,
    markdownLayoutToggle,
    markdownRenderer: createPhotonMarkdownRenderer(windowLike),
    markdownCache,
    markdownSectionCache,
    extractMarkdownSection,
    appendCacheBust: (path) => appendPhotonCacheBust(path, cacheBustToken),
    navigateToTarget: openMarkdownTarget,
  });

  markdownPanel.inert = true;
  return markdownRuntime;
}

export function createPhotonRuntime({
  documentLike = globalThis.document,
  windowLike = globalThis.window,
  homeHref = "./index.html",
} = {}) {
  const stageCanvas = queryPhotonElement(documentLike, "#photon-stage-canvas");
  const electricFieldCanvas = queryPhotonElement(documentLike, "#photon-electric-field-canvas");
  const controlsElement = queryPhotonElement(documentLike, "#photon-controls");
  const diagnosticsElement = queryPhotonElement(documentLike, "#photon-diagnostics");
  const formulasElement = queryPhotonElement(documentLike, "#photon-formulas");
  const jsonElement = queryPhotonElement(documentLike, "#photon-state-json");
  const homeButton = queryPhotonElement(documentLike, "#photon-home-button");
  const guideDocButton = queryPhotonElement(documentLike, "#photon-guide-doc-button");
  const projectDocButton = queryPhotonElement(documentLike, "#photon-project-doc-button");
  const requirementsDocButton = queryPhotonElement(documentLike, "#photon-requirements-doc-button");
  const markdownPanel = queryPhotonElement(documentLike, "#photon-markdown-panel");
  const markdownTitle = queryPhotonElement(documentLike, "#photon-markdown-title");
  const markdownBody = queryPhotonElement(documentLike, "#photon-markdown-body");
  const markdownClose = queryPhotonElement(documentLike, "#photon-markdown-close");
  const markdownLayoutToggle = queryPhotonElement(
    documentLike,
    "#photon-markdown-layout-toggle"
  );
  const markdownPdfButton = queryPhotonElement(documentLike, "#photon-markdown-pdf-button");
  const timeOutputs = Array.from(documentLike.querySelectorAll(".photon-time-output"));
  const cycleOutputs = Array.from(documentLike.querySelectorAll(".photon-cycle-output"));

  let state = createDefaultPhotonState();
  let modelTime = 0;
  let lastFrame = 0;
  let controlsRuntime = null;
  let animationFrame = 0;
  const markdownRuntime = createPhotonMarkdownRuntime({
    windowLike,
    markdownPanel,
    markdownTitle,
    markdownBody,
    markdownLayoutToggle,
  });

  function syncOutputs(wrappedTime, summary) {
    setTextAll(timeOutputs, `${formatPhotonFixed(wrappedTime, 2)} s`);
    setTextAll(cycleOutputs, `${formatPhotonFixed(summary.runDuration, 2)} s`);
    renderRows(documentLike, diagnosticsElement, getPhotonDiagnosticRows(state, wrappedTime, summary));
    renderFormulaSummary(documentLike, formulasElement, summary);
  }

  function draw() {
    const wrappedTime = wrapPhotonTime(state, modelTime);
    const summary = computePhotonFormulaSummary(state, wrappedTime);
    drawPhotonSwarmStage(stageCanvas, state, wrappedTime, { windowLike });
    drawPhotonElectricFieldPlot(electricFieldCanvas, state, wrappedTime, { windowLike });
    syncOutputs(wrappedTime, summary);
  }

  function syncControls() {
    controlsRuntime?.sync(state);
  }

  function setState(nextState) {
    state = normalizePhotonState(nextState);
    modelTime = wrapPhotonTime(state, modelTime);
    jsonElement.value = serializePhotonState(state);
    syncControls();
    draw();
  }

  function resetAnimation() {
    modelTime = 0;
    draw();
  }

  function resetParameters() {
    state = createDefaultPhotonState();
    modelTime = 0;
    jsonElement.value = serializePhotonState(state);
    syncControls();
    draw();
  }

  function togglePause() {
    state.time.paused = !state.time.paused;
    jsonElement.value = serializePhotonState(state);
    syncControls();
    draw();
  }

  function handleKeydown(event) {
    if (!shouldHandlePhotonSpaceToggle(event)) {
      return;
    }
    event.preventDefault();
    togglePause();
  }

  function exportState() {
    jsonElement.value = serializePhotonState(state);
  }

  function importState(jsonText) {
    setState(parsePhotonStateJson(jsonText));
  }

  function onStateChange({ syncControls: shouldSyncControls = true, drawNow = true } = {}) {
    state = normalizePhotonState(state);
    modelTime = wrapPhotonTime(state, modelTime);
    jsonElement.value = serializePhotonState(state);
    if (shouldSyncControls) {
      syncControls();
    }
    if (drawNow) {
      draw();
    }
  }

  function frame(timestamp) {
    if (!lastFrame) {
      lastFrame = timestamp;
    }
    const deltaSeconds = Math.min(0.08, Math.max(0, (timestamp - lastFrame) / 1000));
    lastFrame = timestamp;
    if (!state.time.paused) {
      modelTime = wrapPhotonTime(state, modelTime + deltaSeconds * state.time.speedMultiplier);
    }
    draw();
    animationFrame = windowLike.requestAnimationFrame(frame);
  }

  function init() {
    jsonElement.value = serializePhotonState(state);
    controlsRuntime = createPhotonControlsRuntime({
      documentLike,
      container: controlsElement,
      state,
      getState: () => state,
      jsonElement,
      onStateChange,
      onResetAnimation: resetAnimation,
      onResetParameters: resetParameters,
      onTogglePause: togglePause,
      onExportState: exportState,
      onImportState: importState,
    });
    homeButton.addEventListener("click", () => {
      windowLike.location.assign(homeHref);
    });
    guideDocButton.addEventListener("click", () => {
      markdownRuntime.showMarkdownPanel(PHOTON_DOCS.guide);
    });
    projectDocButton.addEventListener("click", () => {
      markdownRuntime.showMarkdownPanel(PHOTON_DOCS.project);
    });
    requirementsDocButton.addEventListener("click", () => {
      markdownRuntime.showMarkdownPanel(PHOTON_DOCS.requirements);
    });
    markdownClose.addEventListener("click", () => {
      markdownRuntime.hideMarkdownPanel();
    });
    markdownLayoutToggle.addEventListener("click", () => {
      markdownRuntime.toggleMarkdownLayout();
    });
    markdownPdfButton.addEventListener("click", () => {
      markdownRuntime.printMarkdownPanel();
    });
    documentLike.addEventListener("keydown", handleKeydown);
    windowLike.addEventListener("resize", draw);
    draw();
    animationFrame = windowLike.requestAnimationFrame(frame);
    return api;
  }

  function destroy() {
    if (animationFrame) {
      windowLike.cancelAnimationFrame(animationFrame);
    }
    documentLike.removeEventListener("keydown", handleKeydown);
    windowLike.removeEventListener("resize", draw);
    markdownRuntime.hideMarkdownPanel();
  }

  const api = {
    init,
    destroy,
    getState: () => normalizePhotonState(state),
    setState,
    getModelTime: () => modelTime,
    resetAnimation,
    resetParameters,
    draw,
    markdownRuntime,
  };
  return api;
}
