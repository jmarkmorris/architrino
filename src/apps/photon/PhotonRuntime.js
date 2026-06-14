import {
  createDefaultPhotonState,
  normalizePhotonState,
  wrapPhotonTime,
} from "./PhotonStateRuntime.js";
import { createMarkdownRuntime } from "../../runtime/MarkdownRuntime.js";
import { extractMarkdownSection } from "../../services/MarkdownPolicyService.js";
import { createPhotonControlsRuntime } from "./PhotonControlsRuntime.js";
import { computePhotonFormulaSummary } from "./PhotonFormulaRuntime.js";
import { getPhotonDiagnosticRows, formatPhotonFixed } from "./PhotonDiagnosticsRuntime.js";
import {
  drawPhotonElectricFieldPlot,
  drawPhotonPolarizationInset,
  drawPhotonSwarmStage,
} from "./PhotonSwarmVisualRuntime.js";

const PHOTON_DOCS = {
  guide: {
    name: "Photon Guide",
    markdownPath: "reference/priorities/photon-app/photon-guide.md",
    markdownColumns: 1,
  },
  photonClosure: {
    name: "Photon Closure",
    markdownPath: "content/markdown/aaa/assemblies/bosons/electroweak-bosons.md",
    markdownSection: "Photon Closure Interface",
    markdownColumns: 1,
  },
  polarizationGateB: {
    name: "Polarization",
    markdownPath:
      "content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md",
    markdownSection: "Helicity and Vector Modes",
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

function renderInlineMathLabel(windowLike, element, math) {
  const katex = windowLike?.katex;
  if (katex && typeof katex.render === "function") {
    katex.render(math, element, {
      displayMode: false,
      throwOnError: false,
    });
    return;
  }
  element.textContent = math;
}

function renderRows(documentLike, container, rows, { windowLike } = {}) {
  container.textContent = "";
  rows.forEach(([label, value, quality, options = {}]) => {
    const row = documentLike.createElement("div");
    row.className = "photon-readout-row";
    const labelElement = documentLike.createElement("span");
    if (options.labelMath) {
      labelElement.classList.add("has-math");
      renderInlineMathLabel(windowLike, labelElement, options.labelMath);
    } else {
      labelElement.textContent = label;
    }
    const valueElement = documentLike.createElement("strong");
    valueElement.textContent = value;
    row.append(labelElement, valueElement);
    if (quality) {
      row.classList.add("has-quality");
      const qualityElement = documentLike.createElement("em");
      const qualityClass = String(quality).toLowerCase().replace(/[^a-z0-9_-]+/g, "-");
      qualityElement.className = `photon-readout-quality is-${qualityClass}`;
      qualityElement.textContent = quality;
      row.append(qualityElement);
    }
    container.append(row);
  });
}

function renderFormulaSummary(documentLike, container, summary, { windowLike } = {}) {
  const values = [
    ["derived mode", summary.polarization.classificationLabel],
    [
      "fit amp E_y",
      formatPhotonFixed(summary.polarization.amplitudes.y, 3),
      undefined,
      { labelMath: "\\mathrm{fit\\ amp}\\ E_y" },
    ],
    [
      "fit amp E_z",
      formatPhotonFixed(summary.polarization.amplitudes.z, 3),
      undefined,
      { labelMath: "\\mathrm{fit\\ amp}\\ E_z" },
    ],
    [
      "fit E_z/E_y",
      formatPhotonFixed(summary.polarization.amplitudes.relative, 3),
      undefined,
      { labelMath: "\\mathrm{fit}\\ E_z/E_y" },
    ],
    [
      "fit lag",
      summary.polarization.phaseLagDefined
        ? `${formatPhotonFixed(summary.polarization.phaseLagDeg, 1)} deg`
        : "n/a",
    ],
    ["fit residual", formatPhotonFixed(summary.fitResidual, 4)],
    ["fit analyzer fraction", formatPhotonFixed(summary.analyzerTarget, 3)],
    ["mu analyzer", formatPhotonFixed(summary.field.analyzer.fraction, 3)],
    ["cycle average", formatPhotonFixed(summary.averageAnalyzerFraction, 3)],
    ["analyzer residual", formatPhotonFixed(summary.analyzerResidual, 4)],
    ["source count", String(summary.field.sourceCount)],
    ["root count", String(summary.field.rootCount)],
    ["mean delay", formatPhotonFixed(summary.field.averageDelay, 3)],
    ["nearest source", formatPhotonFixed(summary.field.nearestSourceDistance, 3)],
    ["", formatPhotonFixed(summary.stokes.s0, 3), undefined, { labelMath: "A_y^2 + A_z^2" }],
    ["", formatPhotonFixed(summary.stokes.s1, 3), undefined, { labelMath: "A_y^2 - A_z^2" }],
    [
      "",
      formatPhotonFixed(summary.stokes.s2, 3),
      undefined,
      { labelMath: "2 A_y A_z \\cos\\delta" },
    ],
    [
      "",
      formatPhotonFixed(summary.stokes.s3, 3),
      undefined,
      { labelMath: "-2 A_y A_z \\sin\\delta" },
    ],
  ];
  renderRows(documentLike, container, values, { windowLike });
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

export function getPhotonRuntimeTimes(state, modelTime) {
  const continuousTime = Number.isFinite(Number(modelTime)) ? Number(modelTime) : 0;
  return {
    modelTime: continuousTime,
    displayTime: wrapPhotonTime(state, continuousTime),
  };
}

export function advancePhotonModelTime(modelTime, deltaSeconds, speedMultiplier) {
  const currentTime = Number.isFinite(Number(modelTime)) ? Number(modelTime) : 0;
  const safeDelta = Math.max(0, Number.isFinite(Number(deltaSeconds)) ? Number(deltaSeconds) : 0);
  const safeSpeed = Number.isFinite(Number(speedMultiplier)) ? Number(speedMultiplier) : 1;
  return currentTime + safeDelta * safeSpeed;
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
  const polarizationCanvas = queryPhotonElement(documentLike, "#photon-polarization-canvas");
  const controlsElement = queryPhotonElement(documentLike, "#photon-controls");
  const diagnosticsElement = queryPhotonElement(documentLike, "#photon-diagnostics");
  const formulasElement = queryPhotonElement(documentLike, "#photon-formulas");
  const homeButton = queryPhotonElement(documentLike, "#photon-home-button");
  const guideDocButton = queryPhotonElement(documentLike, "#photon-guide-doc-button");
  const photonClosureDocButton = queryPhotonElement(
    documentLike,
    "#photon-closure-doc-button"
  );
  const polarizationGateBDocButton = queryPhotonElement(
    documentLike,
    "#photon-polarization-gate-doc-button"
  );
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

  function syncOutputs(displayTime, summary) {
    setTextAll(timeOutputs, `${formatPhotonFixed(displayTime, 1)} s`);
    setTextAll(cycleOutputs, `${formatPhotonFixed(summary.runDuration, 1)} s`);
    renderRows(documentLike, diagnosticsElement, getPhotonDiagnosticRows(state, displayTime, summary), {
      windowLike,
    });
    renderFormulaSummary(documentLike, formulasElement, summary, { windowLike });
  }

  function draw() {
    const times = getPhotonRuntimeTimes(state, modelTime);
    const displayTime = times.displayTime;
    const summary = computePhotonFormulaSummary(state, displayTime);
    drawPhotonSwarmStage(stageCanvas, state, times.modelTime, { windowLike });
    drawPhotonElectricFieldPlot(electricFieldCanvas, state, displayTime, { windowLike });
    drawPhotonPolarizationInset(polarizationCanvas, state, displayTime, { windowLike });
    syncOutputs(displayTime, summary);
  }

  function syncControls() {
    controlsRuntime?.sync(state);
  }

  function setState(nextState) {
    state = normalizePhotonState(nextState);
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
    syncControls();
    draw();
  }

  function togglePause() {
    state.time.paused = !state.time.paused;
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

  function onStateChange({ syncControls: shouldSyncControls = true, drawNow = true } = {}) {
    state = normalizePhotonState(state);
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
      modelTime = advancePhotonModelTime(modelTime, deltaSeconds, state.time.speedMultiplier);
    }
    draw();
    animationFrame = windowLike.requestAnimationFrame(frame);
  }

  function init() {
    controlsRuntime = createPhotonControlsRuntime({
      documentLike,
      container: controlsElement,
      state,
      getState: () => state,
      onStateChange,
      onResetAnimation: resetAnimation,
      onResetParameters: resetParameters,
      onTogglePause: togglePause,
    });
    homeButton.addEventListener("click", () => {
      windowLike.location.assign(homeHref);
    });
    guideDocButton.addEventListener("click", () => {
      markdownRuntime.showMarkdownPanel(PHOTON_DOCS.guide);
    });
    photonClosureDocButton.addEventListener("click", () => {
      markdownRuntime.showMarkdownPanel(PHOTON_DOCS.photonClosure);
    });
    polarizationGateBDocButton.addEventListener("click", () => {
      markdownRuntime.showMarkdownPanel(PHOTON_DOCS.polarizationGateB);
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
