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
  createPhotonConfigurationSearchResultsWithSolverBridge,
  parsePhotonSearchResultsJson,
  serializePhotonSearchResults,
} from "./PhotonSearchRuntime.js";
import { createMarkdownRuntime } from "../../runtime/MarkdownRuntime.js";
import { extractMarkdownSection } from "../../services/MarkdownPolicyService.js";
import { createPhotonControlsRuntime } from "./PhotonControlsRuntime.js";
import {
  buildPhotonPlotSamplesWithSolverBridge,
  computePhotonFormulaSummaryWithSolverBridge,
} from "./PhotonFormulaRuntime.js";
import { getPhotonDiagnosticRows, formatPhotonFixed } from "./PhotonDiagnosticsRuntime.js";
import {
  drawPhotonElectricFieldPlot,
  drawPhotonPolarizationInset,
  drawPhotonSwarmStage,
} from "./PhotonSwarmVisualRuntime.js";
import {
  createSolverAppBridgeClient,
} from "../../solver/app/SolverAppBridge.mjs";
import {
  createSolverAppBridgeInitRequest,
} from "../../solver/app/SolverAppBridgeClientResolver.mjs";
import { createPhotonSolverBridgeOptions } from "./PhotonSolverBridgeOptions.js";

const PHOTON_DOCS = {
  guide: {
    name: "Photon Guide",
    markdownPath: "content/markdown/aaa/archie/photon-guide.md",
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
};

const PHOTON_RUNTIME_SOLVER_ENGINE_ID = "architrino-solver-app-bridge";
const PHOTON_RUNTIME_SOLVER_CAPABILITIES = Object.freeze(["causalRoots", "delayedHits"]);
const PHOTON_RUNTIME_SOLVER_MEMORY_BUDGET_BYTES = 64 * 1024 * 1024;
const PHOTON_RUNTIME_SOLVER_MIN_INTERVAL_MS = 750;
const PHOTON_RUNTIME_SOLVER_TIME_QUANTUM_SECONDS = 1 / 12;
const PHOTON_RUNTIME_SOLVER_PLOT_SAMPLE_COUNT = 72;
const PHOTON_RUNTIME_SOLVER_SUMMARY_OPTIONS = Object.freeze({
  polarizationSampleCount: 24,
  analyzerSampleCount: 8,
});
const PHOTON_RUNTIME_SOLVER_SEARCH_OPTIONS = Object.freeze({
  summaryOptions: {
    polarizationSampleCount: 24,
    analyzerSampleCount: 8,
  },
  perturbOptions: {
    polarizationSampleCount: 16,
    analyzerSampleCount: 6,
  },
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

function hasPhotonDirectSolverOption(options) {
  return typeof options?.solveCircularSourceRootsHitsLedger === "function" ||
    typeof options?.runSolverBridge === "function" ||
    typeof options?.solverClient?.solveCircularSourceRootsHitsLedgerF64 === "function" ||
    typeof options?.createSolverBridgeClient === "function" ||
    (options?.worker && typeof options.worker === "object") ||
    typeof options?.workerUrl === "string" ||
    typeof options?.WorkerCtor === "function";
}

function getPhotonRuntimeSolverStatusMessage(error = null) {
  if (error) {
    return `Solver data unavailable: ${error?.message ?? "unknown error"}`;
  }
  return "Loading solver data";
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
  homeHref = "./index.html",
  solverBridgeOptions: solverBridgeOptionOverrides = {},
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
  let animationFrame = 0;
  let solverClientPromise = null;
  let ownedSolverClient = null;
  let solverSnapshot = null;
  let solverSnapshotPromise = null;
  let solverLastRequestAtMs = 0;
  let solverError = null;
  let solverGeneration = 0;
  let runtimeDestroyed = false;
  const solverBridgeOptions = createPhotonSolverBridgeOptions(
    windowLike ?? globalThis,
    solverBridgeOptionOverrides
  );
  const markdownRuntime = createPhotonMarkdownRuntime({
    windowLike,
    markdownPanel,
    markdownTitle,
    markdownBody,
    markdownLayoutToggle,
  });

  async function getPhotonRuntimeSolverClient() {
    if (solverBridgeOptions.solverClient) {
      return solverBridgeOptions.solverClient;
    }
    if (!solverClientPromise) {
      solverClientPromise = (async () => {
        const client = createSolverAppBridgeClient({
          createWasmModule: solverBridgeOptions.createWasmModule,
          locateFile: solverBridgeOptions.locateFile,
        });
        await client.init(
          createSolverAppBridgeInitRequest({
            appId: "photon",
            requestedCapabilities: PHOTON_RUNTIME_SOLVER_CAPABILITIES,
            options: solverBridgeOptions,
            storagePolicy: {
              target: solverBridgeOptions.streamTarget ?? "caller-buffer",
              durable: solverBridgeOptions.streamTarget === "native-file",
              maxBytes:
                solverBridgeOptions.memoryBudgetBytes ??
                PHOTON_RUNTIME_SOLVER_MEMORY_BUDGET_BYTES,
            },
            threadingPolicy: {
              mode: solverBridgeOptions.threadingMode ?? "single-thread",
              deterministic: solverBridgeOptions.deterministic ?? true,
            },
          })
        );
        ownedSolverClient = client;
        return client;
      })();
    }
    return solverClientPromise;
  }

  async function createPhotonRuntimeSolverOptions() {
    if (hasPhotonDirectSolverOption(solverBridgeOptions)) {
      return solverBridgeOptions;
    }
    return {
      ...solverBridgeOptions,
      solverClient: await getPhotonRuntimeSolverClient(),
      streamTarget: solverBridgeOptions.streamTarget ?? "caller-buffer",
      deterministic: solverBridgeOptions.deterministic ?? true,
      threadingMode: solverBridgeOptions.threadingMode ?? "single-thread",
    };
  }

  function getCurrentSolverSnapshot() {
    const stateKey = createPhotonRuntimeSolverStateKey(state);
    return solverSnapshot?.stateKey === stateKey ? solverSnapshot : null;
  }

  function clearSolverSnapshotForStateChange() {
    solverGeneration += 1;
    solverSnapshot = null;
    solverError = null;
  }

  function syncPendingOutputs(displayTime) {
    setTextAll(timeOutputs, `${formatPhotonFixed(displayTime, 1)} s`);
    setTextAll(cycleOutputs, `${formatPhotonFixed(getPhotonRunDuration(state), 1)} s`);
    const statusMessage = getPhotonRuntimeSolverStatusMessage(solverError);
    renderRows(
      documentLike,
      diagnosticsElement,
      [
        ["Solver engine", PHOTON_RUNTIME_SOLVER_ENGINE_ID, "info"],
        ["Solver status", statusMessage, solverError ? "bad" : "info"],
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
    solverError = null;
    solverSnapshotPromise = (async () => {
      const solverOptions = await createPhotonRuntimeSolverOptions();
      const [summary, plot] = await Promise.all([
        computePhotonFormulaSummaryWithSolverBridge(
          stateForSolve,
          solveTime,
          {
            ...solverOptions,
            ...PHOTON_RUNTIME_SOLVER_SUMMARY_OPTIONS,
          }
        ),
        buildPhotonPlotSamplesWithSolverBridge(
          stateForSolve,
          0,
          PHOTON_RUNTIME_SOLVER_PLOT_SAMPLE_COUNT,
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

    solverSnapshotPromise
      .then((snapshot) => {
        solverSnapshotPromise = null;
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
        solverError = null;
        draw();
      })
      .catch((error) => {
        solverSnapshotPromise = null;
        if (runtimeDestroyed) {
          return;
        }
        solverError = error;
        draw();
      });
  }

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
    const snapshot = getCurrentSolverSnapshot();
    scheduleSolverSnapshot(displayTime);
    drawPhotonSwarmStage(stageCanvas, state, times.modelTime, { windowLike });
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
      syncOutputs(displayTime, snapshot.summary);
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

  function runConfigurationSearch() {
    clearSearchPreview();
    setSearchStatus("Searching configurations...");
    const schedule =
      typeof windowLike?.setTimeout === "function"
        ? windowLike.setTimeout.bind(windowLike)
        : setTimeout;
    const stateForSearch = cloneRuntimePhotonState(state);
    return new Promise((resolve) => {
      schedule(() => {
        resolve((async () => {
          try {
            const solverOptions = await createPhotonRuntimeSolverOptions();
            searchResults = await createPhotonConfigurationSearchResultsWithSolverBridge(
              stateForSearch,
              {
                ...solverOptions,
                ...PHOTON_RUNTIME_SOLVER_SEARCH_OPTIONS,
              }
            );
            searchStatus = `${searchResults.length} configurations found.`;
          } catch (error) {
            searchStatus = `Search failed: ${error?.message ?? "unknown error"}`;
          }
          syncControls();
          draw();
        })());
      });
    });
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
    result.name = String(name ?? "").trim() || result.name;
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
      const imported = parsePhotonSearchResultsJson(text).map((result, index) => ({
        ...result,
        id: `imported-${Date.now()}-${index + 1}`,
        selected: true,
        promotedPresetId: "",
      }));
      searchResults = [...imported, ...searchResults];
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
    if (!shouldHandlePhotonSpaceToggle(event)) {
      return;
    }
    event.preventDefault();
    togglePause();
  }

  function onStateChange({ syncControls: shouldSyncControls = true, drawNow = true } = {}) {
    state = normalizePhotonState(state);
    clearSolverSnapshotForStateChange();
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
    runtimeDestroyed = false;
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
      isPreviewingSearchResult: () => Boolean(searchPreviewSnapshot),
      onSearchConfigurations: runConfigurationSearch,
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
    runtimeDestroyed = true;
    if (animationFrame) {
      windowLike.cancelAnimationFrame(animationFrame);
    }
    solverSnapshotPromise = null;
    const clientToDispose = ownedSolverClient;
    ownedSolverClient = null;
    solverClientPromise = null;
    if (clientToDispose && typeof clientToDispose.dispose === "function") {
      void clientToDispose.dispose();
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
    getLoadedPresetId: () => loadedPresetId,
    applyPreset,
    resetPreset,
    getPresetOptions,
    getSearchResults: () => searchResults,
    runConfigurationSearch,
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
