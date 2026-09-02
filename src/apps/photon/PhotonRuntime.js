import {
  clonePhotonState,
  getPhotonRunDuration,
  normalizePhotonState,
  wrapPhotonTime,
} from "./PhotonStateRuntime.js";
import {
  PHOTON_DEFAULT_PRESET_ID,
  PHOTON_NAMED_PRESETS,
  createPhotonPresetState,
  getPhotonPreset,
} from "./PhotonPresetRuntime.js";
import {
  createPhotonConfigurationSearchResultsWithPrescribedPathAnalysis,
  createPhotonDeepComparisonResultsWithPrescribedPathAnalysis,
  parsePhotonSearchResultsJson,
  serializePhotonSearchResults,
} from "./PhotonSearchRuntime.js";
import { createMarkdownRuntime } from "../../runtime/MarkdownRuntime.js";
import { extractMarkdownSection } from "../../services/MarkdownPolicyService.js";
import { createPhotonControlsRuntime } from "./PhotonControlsRuntime.js";
import {
  buildPhotonPlotSamplesWithPrescribedPathAnalysis,
  computePhotonFormulaSummaryWithPrescribedPathAnalysis,
} from "./PhotonFormulaRuntime.js";
import { getPhotonDiagnosticRows, formatPhotonFixed } from "./PhotonDiagnosticsRuntime.js";
import {
  drawPhotonElectricFieldPlot,
  getPhotonFieldPlotSampleCount,
  drawPhotonPolarizationInset,
  drawPhotonBraidStage,
} from "./PhotonBraidVisualRuntime.js";
import { PRESCRIBED_PATH_ANALYSIS_ID } from "../../prescribed-path-analysis/PrescribedPathAnalysis.mjs";
import { createStandaloneAppNavigationRuntime } from "../navigator/StandaloneAppNavigationRuntime.js";

const PHOTON_DOCS = {
  guide: {
    name: "Photon Guide",
    markdownPath: "content/markdown/aaa/archie/photon-guide.md",
    markdownColumns: 1,
  },
  photonClosure: {
    name: "Photon Closure Interface",
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
    name: "Photon Project",
    markdownPath: "reference/priorities/app-photon/priorities.md",
    markdownColumns: 1,
  },
};

const PHOTON_RUNTIME_ANALYSIS_ID = PRESCRIBED_PATH_ANALYSIS_ID;
const PHOTON_RUNTIME_SOLVER_MIN_INTERVAL_MS = 750;
const PHOTON_RUNTIME_SOLVER_ERROR_RETRY_MS = 1500;
const PHOTON_RUNTIME_SOLVER_EDIT_DEBOUNCE_MS = 220;
const PHOTON_RUNTIME_SOLVER_TIME_QUANTUM_SECONDS = 1 / 12;
const PHOTON_RUNTIME_SOLVER_SUMMARY_OPTIONS = Object.freeze({
  polarizationSampleCount: 24,
  minimumPolarizationSampleCount: 24,
  analyzerSampleCount: 24,
  minimumAnalyzerSampleCount: 24,
  skipSelfHitDiagnostics: true,
});
const PHOTON_RUNTIME_SOLVER_SEARCH_OPTIONS = Object.freeze({
  limit: 6,
  maxCandidates: 6,
  comparisonCandidateLimit: 1,
  summaryOptions: {
    polarizationSampleCount: 24,
    minimumPolarizationSampleCount: 24,
    analyzerSampleCount: 16,
    minimumAnalyzerSampleCount: 16,
  },
  perturbOptions: {
    polarizationSampleCount: 16,
    minimumPolarizationSampleCount: 16,
    analyzerSampleCount: 8,
    minimumAnalyzerSampleCount: 8,
  },
  comparisonOptions: {
    polarizationSampleCount: 16,
    minimumPolarizationSampleCount: 16,
    analyzerSampleCount: 8,
    minimumAnalyzerSampleCount: 8,
    maxDelay: 0.25,
  },
});
const PHOTON_RUNTIME_SOLVER_DEEP_SEARCH_OPTIONS = Object.freeze({
  limit: 12,
  maxCandidates: Number.POSITIVE_INFINITY,
  comparisonCandidateLimit: Number.POSITIVE_INFINITY,
});

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
    ["fit energy fraction", formatPhotonFixed(summary.analyzerTarget, 3)],
    ["instantaneous fraction", formatPhotonFixed(summary.field.analyzer.fraction, 3)],
    ["common-period energy fraction", formatPhotonFixed(summary.averageAnalyzerFraction, 3)],
    ["fit-to-field fraction residual", formatPhotonFixed(summary.analyzerResidual, 4)],
    ["transmitter count", String(summary.field.transmitterCount)],
    ["root count", String(summary.field.rootCount)],
    ["mean delay", formatPhotonFixed(summary.field.averageDelay, 3)],
    ["nearest transmitter", formatPhotonFixed(summary.field.nearestTransmitterDistance, 3)],
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

function cloneRuntimePhotonState(state) {
  return normalizePhotonState(clonePhotonState(normalizePhotonState(state)));
}

function createPhotonRuntimeSolverStateKey(state) {
  const normalized = normalizePhotonState(state);
  return JSON.stringify({
    version: normalized.version,
    pair: normalized.pair,
    measurement: normalized.measurement,
    polarization: normalized.polarization,
    time: {
      cycleReferenceLayer: normalized.time?.cycleReferenceLayer,
      cycleCount: normalized.time?.cycleCount,
    },
  });
}

function quantizePhotonRuntimeSolverTime(timeSeconds) {
  const time = Number.isFinite(Number(timeSeconds)) ? Number(timeSeconds) : 0;
  return Math.round(time / PHOTON_RUNTIME_SOLVER_TIME_QUANTUM_SECONDS) *
    PHOTON_RUNTIME_SOLVER_TIME_QUANTUM_SECONDS;
}

function getPhotonRuntimeNowMs(windowLike) {
  if (typeof windowLike?.performance?.now === "function") {
    return windowLike.performance.now();
  }
  return Date.now();
}

function getPhotonRuntimeSolverStatusMessage(error = null) {
  if (error) {
    return `Prescribed-path analysis unavailable: ${error?.message ?? "unknown error"}`;
  }
  return "Loading prescribed-path analysis";
}

function createPhotonSlug(value, fallback = "configuration") {
  const slug = String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42);
  return slug || fallback;
}

function createPhotonDownload(documentLike, windowLike, filename, text) {
  const BlobCtor = windowLike?.Blob ?? globalThis.Blob;
  const urlApi = windowLike?.URL ?? globalThis.URL;
  if (!BlobCtor || !urlApi?.createObjectURL || !documentLike?.createElement) {
    return false;
  }
  const blob = new BlobCtor([text], { type: "application/json" });
  const url = urlApi.createObjectURL(blob);
  const link = documentLike.createElement("a");
  link.href = url;
  link.download = filename;
  link.hidden = true;
  documentLike.body?.append(link);
  link.click();
  link.remove();
  const revoke = () => urlApi.revokeObjectURL?.(url);
  if (typeof windowLike?.setTimeout === "function") {
    windowLike.setTimeout(revoke, 0);
  } else {
    revoke();
  }
  return true;
}

export function createPhotonRuntime({
  documentLike = globalThis.document,
  windowLike = globalThis.window,
  prescribedPathAnalysisOptions = {},
  configurationSearchFactory =
    createPhotonConfigurationSearchResultsWithPrescribedPathAnalysis,
  deepConfigurationSearchFactory =
    createPhotonDeepComparisonResultsWithPrescribedPathAnalysis,
} = {}) {
  const stageCanvas = queryPhotonElement(documentLike, "#photon-stage-canvas");
  const electricFieldCanvas = queryPhotonElement(documentLike, "#photon-electric-field-canvas");
  const polarizationCanvas = queryPhotonElement(documentLike, "#photon-polarization-canvas");
  const controlsElement = queryPhotonElement(documentLike, "#photon-controls");
  const diagnosticsElement = queryPhotonElement(documentLike, "#photon-diagnostics");
  const formulasElement = queryPhotonElement(documentLike, "#photon-formulas");
  const navigationHost = queryPhotonElement(documentLike, "#scene-hud-tools");
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

  let loadedPresetId = PHOTON_DEFAULT_PRESET_ID;
  let state = createPhotonPresetState(loadedPresetId);
  let sessionPresets = [];
  let searchResults = [];
  let searchStatus = "";
  let searchPreviewSnapshot = null;
  let promotedPresetCounter = 1;
  let modelTime = 0;
  let lastFrame = 0;
  let controlsRuntime = null;
  let navigationRuntime = null;
  let animationFrame = 0;
  let solverSnapshot = null;
  let solverSnapshotPromise = null;
  let solverLastRequestAtMs = 0;
  let solverLastStateChangeAtMs = 0;
  let solverInteractiveUpdatePending = false;
  let solverDebounceTimer = 0;
  let solverError = null;
  let solverGeneration = 0;
  let solverRetryAfterMs = 0;
  let solverPlotCache = null;
  let lastRenderedReadoutKey = "";
  let searchGeneration = 0;
  let searchResultIdCounter = 1;
  let searchInFlightPromise = null;
  let runtimeInitialized = false;
  let runtimeDestroyed = true;
  let runtimeEventListeners = [];
  const markdownRuntime = createPhotonMarkdownRuntime({
    windowLike,
    markdownPanel,
    markdownTitle,
    markdownBody,
    markdownLayoutToggle,
  });

  function getCurrentSolverSnapshot() {
    const stateKey = createPhotonRuntimeSolverStateKey(state);
    if (solverSnapshot?.stateKey === stateKey) {
      return solverSnapshot;
    }
    return solverInteractiveUpdatePending ? solverSnapshot : null;
  }

  function clearSolverDebounceTimer() {
    if (!solverDebounceTimer) {
      return;
    }
    const cancel =
      typeof windowLike?.clearTimeout === "function"
        ? windowLike.clearTimeout.bind(windowLike)
        : clearTimeout;
    cancel(solverDebounceTimer);
    solverDebounceTimer = 0;
  }

  function scheduleSolverDebouncedDraw() {
    if (runtimeDestroyed) {
      return;
    }
    clearSolverDebounceTimer();
    const schedule =
      typeof windowLike?.setTimeout === "function"
        ? windowLike.setTimeout.bind(windowLike)
        : setTimeout;
    solverDebounceTimer = schedule(() => {
      solverDebounceTimer = 0;
      if (!runtimeDestroyed) {
        draw();
      }
    }, PHOTON_RUNTIME_SOLVER_EDIT_DEBOUNCE_MS);
  }

  function clearSolverSnapshotForStateChange({ preserveSnapshot = false } = {}) {
    const nextStateKey = createPhotonRuntimeSolverStateKey(state);
    if (solverSnapshot?.stateKey === nextStateKey) {
      solverInteractiveUpdatePending = false;
      solverError = null;
      solverRetryAfterMs = 0;
      return;
    }
    solverGeneration += 1;
    solverLastStateChangeAtMs = getPhotonRuntimeNowMs(windowLike);
    solverInteractiveUpdatePending = preserveSnapshot;
    if (preserveSnapshot) {
      scheduleSolverDebouncedDraw();
    } else {
      clearSolverDebounceTimer();
      solverSnapshot = null;
    }
    solverError = null;
    solverRetryAfterMs = 0;
  }

  function syncTimeOutputs(displayTime, runDuration = getPhotonRunDuration(state)) {
    setTextAll(timeOutputs, `${formatPhotonFixed(displayTime, 1)} s`);
    setTextAll(cycleOutputs, `${formatPhotonFixed(runDuration, 1)} s`);
  }

  function syncPendingOutputs(displayTime) {
    syncTimeOutputs(displayTime);
    const statusMessage = getPhotonRuntimeSolverStatusMessage(solverError);
    const readoutKey = `pending:${solverGeneration}:${statusMessage}`;
    if (lastRenderedReadoutKey === readoutKey) {
      return;
    }
    lastRenderedReadoutKey = readoutKey;
    renderRows(
      documentLike,
      diagnosticsElement,
      [
        ["Analysis library", PHOTON_RUNTIME_ANALYSIS_ID, "info"],
        ["Analysis status", statusMessage, solverError ? "bad" : "info"],
      ],
      { windowLike }
    );
    renderRows(
      documentLike,
      formulasElement,
      [["Field summary", solverError ? "unavailable" : "loading", solverError ? "bad" : "info"]],
      { windowLike }
    );
  }

  function scheduleSolverSnapshot(displayTime, { force = false } = {}) {
    if (runtimeDestroyed) {
      return;
    }
    if (solverSnapshotPromise) {
      return;
    }
    const stateKey = createPhotonRuntimeSolverStateKey(state);
    const solveTime = quantizePhotonRuntimeSolverTime(displayTime);
    const existingSnapshotMatches =
      solverSnapshot?.stateKey === stateKey &&
      Math.abs((solverSnapshot.solveTime ?? 0) - solveTime) <= 1e-12;
    if (existingSnapshotMatches) {
      return;
    }
    const nowMs = getPhotonRuntimeNowMs(windowLike);
    if (!force && solverError && nowMs < solverRetryAfterMs) {
      return;
    }
    if (
      !force &&
      solverInteractiveUpdatePending &&
      nowMs - solverLastStateChangeAtMs < PHOTON_RUNTIME_SOLVER_EDIT_DEBOUNCE_MS
    ) {
      return;
    }
    const stateChanged = solverSnapshot?.stateKey !== stateKey;
    if (
      !force &&
      !stateChanged &&
      !state.time?.paused &&
      nowMs - solverLastRequestAtMs < PHOTON_RUNTIME_SOLVER_MIN_INTERVAL_MS
    ) {
      return;
    }

    const stateForSolve = cloneRuntimePhotonState(state);
    const generation = solverGeneration;
    solverLastRequestAtMs = nowMs;
    solverInteractiveUpdatePending = false;
    solverError = null;
    solverRetryAfterMs = 0;
    const pendingSnapshotPromise = (async () => {
      const solverOptions = {
        ...prescribedPathAnalysisOptions,
        ...PHOTON_RUNTIME_SOLVER_SUMMARY_OPTIONS,
      };
      const plotSampleCount = getPhotonFieldPlotSampleCount(
        electricFieldCanvas.getBoundingClientRect?.().width ?? 0
      );
      const [summary, plot] = await Promise.all([
        computePhotonFormulaSummaryWithPrescribedPathAnalysis(
          stateForSolve,
          solveTime,
          solverOptions
        ),
        solverPlotCache?.stateKey === stateKey
          ? Promise.resolve(solverPlotCache.plot)
          : buildPhotonPlotSamplesWithPrescribedPathAnalysis(
              stateForSolve,
              solveTime,
              plotSampleCount,
              solverOptions
            ),
      ]);
      return {
        stateKey,
        solveTime,
        summary,
        plot,
      };
    })();
    solverSnapshotPromise = pendingSnapshotPromise;

    pendingSnapshotPromise
      .then((snapshot) => {
        if (solverSnapshotPromise === pendingSnapshotPromise) {
          solverSnapshotPromise = null;
        }
        if (runtimeDestroyed) {
          return;
        }
        if (
          generation !== solverGeneration ||
          createPhotonRuntimeSolverStateKey(state) !== snapshot.stateKey
        ) {
          draw();
          return;
        }
        solverSnapshot = snapshot;
        solverPlotCache = {
          stateKey: snapshot.stateKey,
          plot: snapshot.plot,
        };
        solverInteractiveUpdatePending = false;
        solverError = null;
        solverRetryAfterMs = 0;
        draw();
      })
      .catch((error) => {
        if (solverSnapshotPromise === pendingSnapshotPromise) {
          solverSnapshotPromise = null;
        }
        if (runtimeDestroyed) {
          return;
        }
        if (generation !== solverGeneration) {
          draw();
          return;
        }
        solverInteractiveUpdatePending = false;
        solverError = error;
        solverRetryAfterMs =
          getPhotonRuntimeNowMs(windowLike) + PHOTON_RUNTIME_SOLVER_ERROR_RETRY_MS;
        draw();
      });
  }

  function syncOutputs(displayTime, snapshot) {
    const summary = snapshot.summary;
    syncTimeOutputs(displayTime, summary.runDuration);
    const readoutKey = `${snapshot.stateKey}:${snapshot.solveTime}`;
    if (lastRenderedReadoutKey === readoutKey) {
      return;
    }
    lastRenderedReadoutKey = readoutKey;
    renderRows(documentLike, diagnosticsElement, getPhotonDiagnosticRows(state, displayTime, summary), {
      windowLike,
    });
    renderFormulaSummary(documentLike, formulasElement, summary, { windowLike });
  }

  function draw() {
    const times = getPhotonRuntimeTimes(state, modelTime);
    const displayTime = times.displayTime;
    const snapshot = getCurrentSolverSnapshot();
    scheduleSolverSnapshot(displayTime);
    drawPhotonBraidStage(stageCanvas, state, times.modelTime, { windowLike });
    drawPhotonElectricFieldPlot(electricFieldCanvas, state, displayTime, {
      windowLike,
      plot: snapshot?.plot ?? null,
      pendingMessage: getPhotonRuntimeSolverStatusMessage(solverError),
    });
    drawPhotonPolarizationInset(polarizationCanvas, state, displayTime, {
      windowLike,
      trace: snapshot?.summary?.polarization ?? null,
      pendingMessage: getPhotonRuntimeSolverStatusMessage(solverError),
    });
    if (snapshot?.summary) {
      syncOutputs(displayTime, snapshot);
    } else {
      syncPendingOutputs(displayTime);
    }
  }

  function syncControls() {
    controlsRuntime?.sync(state);
  }

  function getPresetOptions() {
    return [
      ...PHOTON_NAMED_PRESETS,
      ...sessionPresets.map((preset) => ({ id: preset.id, name: preset.name })),
    ];
  }

  function findSessionPreset(presetId) {
    return sessionPresets.find((preset) => preset.id === presetId);
  }

  function createStateForPresetId(presetId) {
    const sessionPreset = findSessionPreset(presetId);
    if (sessionPreset) {
      return cloneRuntimePhotonState(sessionPreset.state);
    }
    return createPhotonPresetState(getPhotonPreset(presetId).id);
  }

  function clearSearchPreview() {
    searchPreviewSnapshot = null;
  }

  function findSearchResult(resultId) {
    return searchResults.find((result) => result.id === resultId);
  }

  function mintSearchResultId(prefix = "result") {
    const id = `${prefix}-${String(searchResultIdCounter).padStart(4, "0")}`;
    searchResultIdCounter += 1;
    return id;
  }

  function assignRuntimeSearchResultIds(results, prefix) {
    return (Array.isArray(results) ? results : []).map((result) => ({
      ...result,
      id: mintSearchResultId(prefix),
    }));
  }

  function setSearchStatus(nextStatus) {
    searchStatus = String(nextStatus ?? "");
    syncControls();
  }

  function setStateFromSearchResult(result, { play = false, preview = false } = {}) {
    if (!result) {
      return;
    }
    if (preview && !searchPreviewSnapshot) {
      searchPreviewSnapshot = {
        state: cloneRuntimePhotonState(state),
        loadedPresetId,
        modelTime,
      };
    }
    if (!preview) {
      clearSearchPreview();
    }
    state = cloneRuntimePhotonState(result.state);
    state.time.paused = !play;
    modelTime = 0;
    clearSolverSnapshotForStateChange();
    syncControls();
    draw();
  }

  function runConfigurationSearch({ deep = false, filters = null } = {}) {
    if (searchInFlightPromise) {
      return searchInFlightPromise;
    }
    clearSearchPreview();
    const schedule =
      typeof windowLike?.setTimeout === "function"
        ? windowLike.setTimeout.bind(windowLike)
        : setTimeout;
    const stateForSearch = cloneRuntimePhotonState(state);
    const generation = ++searchGeneration;
    const searchFactory = deep ? deepConfigurationSearchFactory : configurationSearchFactory;
    searchStatus = deep ? "Preparing deep comparison..." : "Searching configurations...";
    searchInFlightPromise = new Promise((resolve) => schedule(resolve, 0))
      .then(async () => {
        try {
          const found = await searchFactory(
            stateForSearch,
            {
              ...prescribedPathAnalysisOptions,
              ...(deep
                ? PHOTON_RUNTIME_SOLVER_DEEP_SEARCH_OPTIONS
                : PHOTON_RUNTIME_SOLVER_SEARCH_OPTIONS),
              ...(deep
                ? {
                    filters,
                    onProgress: ({ completed, total, retained }) => {
                      if (!runtimeDestroyed && generation === searchGeneration) {
                        searchStatus = `Deep comparison ${completed}/${total}; ${retained} retained.`;
                        syncControls();
                      }
                    },
                    shouldCancel: () => runtimeDestroyed || generation !== searchGeneration,
                  }
                : {}),
              yieldToEventLoop: () => new Promise((resolve) => schedule(resolve, 0)),
            }
          );
          if (runtimeDestroyed || generation !== searchGeneration) {
            return [];
          }
          const runtimeResults = assignRuntimeSearchResultIds(found, "search");
          searchResults = [...runtimeResults, ...searchResults].slice(0, 100);
          searchStatus = deep
            ? `Deep comparison complete: ${runtimeResults.length} configurations retained.`
            : `${runtimeResults.length} configurations found.`;
          return runtimeResults;
        } catch (error) {
          if (generation === searchGeneration) {
            searchStatus = `Search failed: ${error?.message ?? "unknown error"}`;
          }
          return [];
        } finally {
          if (generation === searchGeneration) {
            searchInFlightPromise = null;
          }
          syncControls();
          draw();
        }
      });
    syncControls();
    return searchInFlightPromise;
  }

  function restoreSearchPreview() {
    if (!searchPreviewSnapshot) {
      return;
    }
    state = cloneRuntimePhotonState(searchPreviewSnapshot.state);
    loadedPresetId = searchPreviewSnapshot.loadedPresetId;
    modelTime = searchPreviewSnapshot.modelTime;
    clearSearchPreview();
    clearSolverSnapshotForStateChange();
    syncControls();
    draw();
  }

  function previewSearchResult(resultId) {
    setStateFromSearchResult(findSearchResult(resultId), { preview: true });
    setSearchStatus("Previewing search result.");
  }

  function loadSearchResult(resultId) {
    setStateFromSearchResult(findSearchResult(resultId), { preview: false });
    setSearchStatus("Loaded search result as editable settings.");
  }

  function playSearchResult(resultId) {
    setStateFromSearchResult(findSearchResult(resultId), { play: true });
    setSearchStatus("Loaded and playing search result.");
  }

  function renameSearchResult(resultId, name) {
    const result = findSearchResult(resultId);
    if (!result) {
      return;
    }
    result.name = String(name ?? "").replace(/\s+/g, " ").trim().slice(0, 120) || result.name;
    const promotedPreset = findSessionPreset(result.promotedPresetId);
    if (promotedPreset) {
      promotedPreset.name = result.name;
    }
    syncControls();
  }

  function toggleSearchResultSelected(resultId, selected) {
    const result = findSearchResult(resultId);
    if (!result) {
      return;
    }
    result.selected = !!selected;
    syncControls();
  }

  function deleteSearchResult(resultId) {
    searchResults = searchResults.filter((result) => result.id !== resultId);
    if (searchResults.length === 0) {
      searchStatus = "No search results.";
    }
    syncControls();
  }

  function promoteSearchResult(resultId) {
    const result = findSearchResult(resultId);
    if (!result) {
      return;
    }
    if (result.promotedPresetId && findSessionPreset(result.promotedPresetId)) {
      loadedPresetId = result.promotedPresetId;
      state = createStateForPresetId(loadedPresetId);
      modelTime = 0;
      clearSearchPreview();
      clearSolverSnapshotForStateChange();
      syncControls();
      draw();
      return;
    }
    const id = `search_preset_${promotedPresetCounter}_${createPhotonSlug(result.name)}`;
    promotedPresetCounter += 1;
    sessionPresets.push({
      id,
      name: result.name,
      state: cloneRuntimePhotonState(result.state),
    });
    result.promotedPresetId = id;
    loadedPresetId = id;
    state = createStateForPresetId(id);
    modelTime = 0;
    clearSearchPreview();
    clearSolverSnapshotForStateChange();
    searchStatus = `Promoted ${result.name} to presets.`;
    syncControls();
    draw();
  }

  function exportSearchResults(resultsToExport = searchResults) {
    const safeResults = Array.isArray(resultsToExport) ? resultsToExport : [];
    const json = serializePhotonSearchResults(safeResults);
    if (safeResults.length > 0) {
      createPhotonDownload(
        documentLike,
        windowLike,
        `photon-search-results-${safeResults.length}.json`,
        json
      );
    }
    searchStatus = safeResults.length > 0
      ? `Exported ${safeResults.length} configuration${safeResults.length === 1 ? "" : "s"}.`
      : "No search results to export.";
    syncControls();
    return json;
  }

  function exportSelectedSearchResults() {
    return exportSearchResults(searchResults.filter((result) => result.selected !== false));
  }

  async function importSearchResults(fileOrText) {
    try {
      const text = typeof fileOrText === "string"
        ? fileOrText
        : await fileOrText.text();
      const imported = assignRuntimeSearchResultIds(
        parsePhotonSearchResultsJson(text).map((result) => ({
        ...result,
        selected: result.selected !== false,
        promotedPresetId: "",
        })),
        "imported"
      );
      searchResults = [...imported, ...searchResults].slice(0, 100);
      searchStatus = `Imported ${imported.length} configuration${imported.length === 1 ? "" : "s"}.`;
    } catch (error) {
      searchStatus = `Import failed: ${error?.message ?? "invalid file"}`;
    }
    syncControls();
    draw();
  }

  function setState(nextState) {
    clearSearchPreview();
    state = normalizePhotonState(nextState);
    clearSolverSnapshotForStateChange();
    syncControls();
    draw();
  }

  function resetAnimation() {
    modelTime = 0;
    clearSolverSnapshotForStateChange();
    draw();
  }

  function resetParameters() {
    clearSearchPreview();
    loadedPresetId = PHOTON_DEFAULT_PRESET_ID;
    state = createPhotonPresetState(loadedPresetId);
    modelTime = 0;
    clearSolverSnapshotForStateChange();
    syncControls();
    draw();
  }

  function applyPreset(presetId) {
    clearSearchPreview();
    const hasPreset = getPresetOptions().some((preset) => preset.id === presetId);
    loadedPresetId = hasPreset ? presetId : PHOTON_DEFAULT_PRESET_ID;
    state = createStateForPresetId(loadedPresetId);
    modelTime = 0;
    clearSolverSnapshotForStateChange();
    syncControls();
    draw();
  }

  function resetPreset() {
    clearSearchPreview();
    state = createStateForPresetId(loadedPresetId);
    modelTime = 0;
    clearSolverSnapshotForStateChange();
    syncControls();
    draw();
  }

  function togglePause() {
    state.time.paused = !state.time.paused;
    syncControls();
    draw();
  }

  function handleKeydown(event) {
    if (
      markdownRuntime.isMarkdownPanelOpen() ||
      !shouldHandlePhotonSpaceToggle(event)
    ) {
      return;
    }
    event.preventDefault();
    togglePause();
  }

  function onStateChange({ syncControls: shouldSyncControls = true, drawNow = true } = {}) {
    state = normalizePhotonState(state);
    clearSolverSnapshotForStateChange({ preserveSnapshot: !drawNow });
    if (shouldSyncControls) {
      syncControls();
    }
    if (drawNow) {
      draw();
    }
  }

  function frame(timestamp) {
    if (runtimeDestroyed) {
      return;
    }
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

  function addRuntimeEventListener(target, type, listener) {
    target.addEventListener(type, listener);
    runtimeEventListeners.push({ target, type, listener });
  }

  function init() {
    if (runtimeInitialized) {
      return api;
    }
    runtimeInitialized = true;
    runtimeDestroyed = false;
    lastFrame = 0;
    lastRenderedReadoutKey = "";
    navigationRuntime = createStandaloneAppNavigationRuntime({
      host: navigationHost,
      document: documentLike,
      window: windowLike,
    }).init();
    controlsRuntime = createPhotonControlsRuntime({
      documentLike,
      container: controlsElement,
      state,
      getState: () => state,
      onStateChange,
      onResetAnimation: resetAnimation,
      onResetParameters: resetParameters,
      onTogglePause: togglePause,
      getPresetId: () => loadedPresetId,
      getPresetOptions,
      onPresetChange: applyPreset,
      onResetPreset: resetPreset,
      getSearchResults: () => searchResults,
      getSearchStatus: () => searchStatus,
      isSearchInFlight: () => Boolean(searchInFlightPromise),
      isPreviewingSearchResult: () => Boolean(searchPreviewSnapshot),
      onSearchConfigurations: runConfigurationSearch,
      onDeepCompareConfigurations: (filters) => runConfigurationSearch({ deep: true, filters }),
      onRestoreSearchPreview: restoreSearchPreview,
      onPreviewSearchResult: previewSearchResult,
      onLoadSearchResult: loadSearchResult,
      onPlaySearchResult: playSearchResult,
      onPromoteSearchResult: promoteSearchResult,
      onDeleteSearchResult: deleteSearchResult,
      onRenameSearchResult: renameSearchResult,
      onToggleSearchResultSelected: toggleSearchResultSelected,
      onExportSearchResults: () => exportSearchResults(searchResults),
      onExportSelectedSearchResults: exportSelectedSearchResults,
      onImportSearchResults: importSearchResults,
    });
    addRuntimeEventListener(guideDocButton, "click", () => {
      markdownRuntime.showMarkdownPanel(PHOTON_DOCS.guide);
    });
    addRuntimeEventListener(photonClosureDocButton, "click", () => {
      markdownRuntime.showMarkdownPanel(PHOTON_DOCS.photonClosure);
    });
    addRuntimeEventListener(polarizationGateBDocButton, "click", () => {
      markdownRuntime.showMarkdownPanel(PHOTON_DOCS.polarizationGateB);
    });
    addRuntimeEventListener(projectDocButton, "click", () => {
      markdownRuntime.showMarkdownPanel(PHOTON_DOCS.project);
    });
    addRuntimeEventListener(markdownClose, "click", () => {
      markdownRuntime.hideMarkdownPanel();
    });
    addRuntimeEventListener(markdownLayoutToggle, "click", () => {
      markdownRuntime.toggleMarkdownLayout();
    });
    addRuntimeEventListener(markdownPdfButton, "click", () => {
      markdownRuntime.printMarkdownPanel();
    });
    addRuntimeEventListener(documentLike, "keydown", handleKeydown);
    addRuntimeEventListener(windowLike, "resize", draw);
    draw();
    animationFrame = windowLike.requestAnimationFrame(frame);
    return api;
  }

  function destroy() {
    if (!runtimeInitialized) {
      return;
    }
    runtimeInitialized = false;
    runtimeDestroyed = true;
    solverGeneration += 1;
    searchGeneration += 1;
    if (animationFrame) {
      windowLike.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }
    clearSolverDebounceTimer();
    solverSnapshotPromise = null;
    searchInFlightPromise = null;
    runtimeEventListeners.forEach(({ target, type, listener }) => {
      target.removeEventListener(type, listener);
    });
    runtimeEventListeners = [];
    controlsRuntime?.destroy();
    controlsRuntime = null;
    navigationRuntime?.destroy?.();
    navigationRuntime = null;
    markdownRuntime.hideMarkdownPanel();
  }

  const api = {
    init,
    destroy,
    getState: () => normalizePhotonState(state),
    setState,
    getLoadedPresetId: () => loadedPresetId,
    applyPreset,
    resetPreset,
    getPresetOptions,
    getSearchResults: () => searchResults,
    runConfigurationSearch,
    runDeepComparison: (filters) => runConfigurationSearch({ deep: true, filters }),
    previewSearchResult,
    restoreSearchPreview,
    loadSearchResult,
    playSearchResult,
    promoteSearchResult,
    renameSearchResult,
    toggleSearchResultSelected,
    deleteSearchResult,
    exportSearchResults,
    exportSelectedSearchResults,
    importSearchResults,
    getModelTime: () => modelTime,
    resetAnimation,
    resetParameters,
    draw,
    markdownRuntime,
  };
  return api;
}
