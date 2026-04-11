import { navigateStandalonePdgsolveHome } from "./PdgsolveAppModeRuntime.js";
import {
  buildPdgeditPreviewFromPdgsolveAcceptance,
  buildPdgsolveAcceptanceRecord,
  normalizePdgsolveAcceptanceRecord,
} from "./PdgsolveAcceptanceRuntime.js";
import { loadPdgsolveBootstrapSeed } from "./PdgsolveBootstrapRuntime.js";
import { launchPdgeditFromPdgsolveAcceptance } from "./PdgsolvePdgeditPublicationRuntime.js";
import { normalizePdgsolveRequest } from "./PdgsolveRequestRuntime.js";
import { selectPdgsolveResultFamily, solvePdgsolveRequest } from "./PdgsolveSolveRuntime.js";

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function formatSourceKind(sourceKind = "") {
  const normalized = normalizeText(sourceKind);
  if (!normalized) {
    return "request";
  }
  return normalized.replace(/-/g, " ");
}

function setDisabled(element, value) {
  if (element) {
    element.disabled = value === true;
  }
}

function createLine(documentLike, className, textContent) {
  const element = documentLike.createElement("div");
  if (className) {
    element.className = className;
  }
  element.textContent = textContent;
  return element;
}

function createKeyValueRow(documentLike, key, value) {
  const row = documentLike.createElement("div");
  row.className = "pdgsolve-kv-row";
  row.append(
    createLine(documentLike, "pdgsolve-kv-key", key),
    createLine(documentLike, "pdgsolve-kv-value", value)
  );
  return row;
}

function createListRow(documentLike, label, values = []) {
  return createKeyValueRow(
    documentLike,
    label,
    values.length ? values.join(", ") : "none"
  );
}

function formatScoreLine(score = {}) {
  return `exactness ${score.exactness}, primitive ${score.primitiveMismatch}, middle ${score.middleMismatch}, auxiliary ${score.auxiliaryBurden}`;
}

function summarizeLane(laneEntries = []) {
  return (Array.isArray(laneEntries) ? laneEntries : [])
    .map((entry) => `${entry.assemblyId} x${entry.count}`)
    .join(", ");
}

function buildFamilySubtitle(family = {}) {
  return [
    family.kind || "family",
    family.publicationReady ? "publishable" : "review only",
    formatScoreLine(family.score),
  ].join(" | ");
}

async function readJsonFile(file) {
  if (!file || typeof file.text !== "function") {
    throw new Error("Selected file cannot be read as text.");
  }
  return JSON.parse(await file.text());
}

export function createPdgsolveAppRuntime({
  documentLike = globalThis.document,
  windowLike = globalThis.window,
  bootstrapLoader = loadPdgsolveBootstrapSeed,
  requestSolver = solvePdgsolveRequest,
  acceptanceBuilder = buildPdgsolveAcceptanceRecord,
  acceptancePreviewBuilder = buildPdgeditPreviewFromPdgsolveAcceptance,
  publicationLauncher = launchPdgeditFromPdgsolveAcceptance,
  appElement,
  requestSelectElement,
  requestFileInputElement,
  acceptanceFileInputElement,
  loadRequestButtonElement,
  reopenAcceptanceButtonElement,
  homeButtonElement,
  solveButtonElement,
  acceptButtonElement,
  launchPdgeditButtonElement,
  requestSummaryElement,
  diagnosticsElement,
  familyListElement,
  acceptedSummaryElement,
  publicationPreviewElement,
  pdgfeedManifestUrl = "",
  requestUrl = "",
  acceptanceUrl = "",
  requestId = "",
  homeHref = "./index.html",
} = {}) {
  if (
    !documentLike ||
    !appElement ||
    !requestSelectElement ||
    !requestSummaryElement ||
    !diagnosticsElement ||
    !familyListElement ||
    !acceptedSummaryElement ||
    !publicationPreviewElement
  ) {
    throw new Error("pdgsolve app runtime requires the standalone app DOM.");
  }

  const state = {
    requestEntries: [],
    selectedRequestEntryId: "",
    result: null,
    selectedFamilyId: "",
    acceptance: null,
    pdgeditPreview: null,
    publication: null,
    errorMessage: "",
  };

  function getSelectedRequestEntry() {
    return state.requestEntries.find((entry) => entry.id === state.selectedRequestEntryId) ?? null;
  }

  function createRequestOption(entry) {
    const option = documentLike.createElement("option");
    option.value = entry.id;
    option.textContent = `${entry.title} (${formatSourceKind(entry.sourceKind)})`;
    return option;
  }

  function updateToolbarState() {
    const selectedEntry = getSelectedRequestEntry();
    const selectedFamily = selectPdgsolveResultFamily(state.result, state.selectedFamilyId);
    setDisabled(requestSelectElement, !state.requestEntries.length);
    setDisabled(solveButtonElement, !selectedEntry);
    setDisabled(
      acceptButtonElement,
      !selectedFamily || !selectedFamily.publicationReady || !selectedFamily?.canonicalCandidate?.solveGraph
    );
    setDisabled(launchPdgeditButtonElement, !state.acceptance);
  }

  function renderRequestPicker() {
    requestSelectElement.replaceChildren(
      ...state.requestEntries.map((entry) => createRequestOption(entry))
    );
    requestSelectElement.value = state.selectedRequestEntryId;
  }

  function renderRequestSummary() {
    const selectedEntry = getSelectedRequestEntry();
    requestSummaryElement.replaceChildren();
    if (!selectedEntry) {
      requestSummaryElement.append(createLine(documentLike, "pdgsolve-empty", "No request loaded."));
      return;
    }
    const request = selectedEntry.request;
    requestSummaryElement.append(
      createKeyValueRow(documentLike, "Title", selectedEntry.title),
      createKeyValueRow(documentLike, "Request ID", request.requestId),
      createKeyValueRow(documentLike, "Source", `${formatSourceKind(request.source.kind)} | ${request.source.sourceDocumentId}`),
      createListRow(
        documentLike,
        "Reactants",
        request.reactants.map((entry) => `${entry.title || entry.assemblyId} (${entry.assemblyId})`)
      ),
      createListRow(
        documentLike,
        "Products",
        request.products.map((entry) => `${entry.title || entry.assemblyId} (${entry.assemblyId})`)
      ),
      createKeyValueRow(
        documentLike,
        "Boundary augmentations",
        request.policy.allowedBoundaryAugmentations.join(", ")
      ),
      createKeyValueRow(
        documentLike,
        "Exact closure required",
        request.policy.exactClosureRequired ? "yes" : "no"
      )
    );
  }

  function renderDiagnostics() {
    diagnosticsElement.replaceChildren();
    if (state.errorMessage) {
      diagnosticsElement.append(createLine(documentLike, "pdgsolve-diagnostic pdgsolve-diagnostic-error", state.errorMessage));
      return;
    }
    if (!state.result) {
      diagnosticsElement.append(
        createLine(documentLike, "pdgsolve-empty", "Run the solver to populate diagnostics and candidate families.")
      );
      return;
    }
    const lines = [
      `Search status: ${state.result.searchStatus}`,
      `Best family: ${state.result.bestFamilyId}`,
    ];
    const families = Array.isArray(state.result.optionFamilies) ? state.result.optionFamilies : [];
    if (families.length) {
      lines.push(`Option families: ${families.length}`);
    }
    diagnosticsElement.append(...lines.map((line) => createLine(documentLike, "pdgsolve-meta-line", line)));
    const diagnostics = Array.isArray(state.result.diagnostics) ? state.result.diagnostics : [];
    if (!diagnostics.length) {
      diagnosticsElement.append(createLine(documentLike, "pdgsolve-empty", "No blocking diagnostics."));
      return;
    }
    diagnosticsElement.append(
      ...diagnostics.map((diagnostic) =>
        createLine(
          documentLike,
          `pdgsolve-diagnostic${diagnostic.blocking ? " is-blocking" : ""}`,
          `${diagnostic.id}: ${diagnostic.message}`
        )
      )
    );
  }

  function renderFamilies() {
    familyListElement.replaceChildren();
    const families = Array.isArray(state.result?.optionFamilies) ? state.result.optionFamilies : [];
    if (!families.length) {
      familyListElement.append(
        createLine(documentLike, "pdgsolve-empty", "No candidate families yet.")
      );
      return;
    }
    familyListElement.append(
      ...families.map((family) => {
        const button = documentLike.createElement("button");
        button.type = "button";
        button.className = "pdgsolve-family-card";
        button.dataset.familyId = family.familyId;
        button.classList.toggle("is-selected", family.familyId === state.selectedFamilyId);
        button.append(
          createLine(documentLike, "pdgsolve-family-title", family.familyId),
          createLine(documentLike, "pdgsolve-family-subtitle", buildFamilySubtitle(family)),
          createLine(
            documentLike,
            "pdgsolve-family-lanes",
            `reactant assemblies: ${summarizeLane(family.laneInventories?.lane1)}`
          ),
          createLine(
            documentLike,
            "pdgsolve-family-lanes",
            `intermediate assemblies: ${summarizeLane(family.laneInventories?.lane3)}`
          ),
          createLine(
            documentLike,
            "pdgsolve-family-lanes",
            `product assemblies: ${summarizeLane(family.laneInventories?.lane5)}`
          )
        );
        return button;
      })
    );
  }

  function renderAcceptedSummary() {
    acceptedSummaryElement.replaceChildren();
    if (!state.acceptance) {
      acceptedSummaryElement.append(
        createLine(documentLike, "pdgsolve-empty", "No accepted family is locked yet.")
      );
      return;
    }
    acceptedSummaryElement.append(
      createKeyValueRow(documentLike, "Digest", state.acceptance.resultDigest),
      createKeyValueRow(documentLike, "Problem", state.acceptance.problemId),
      createKeyValueRow(documentLike, "Family", state.acceptance.familyId),
      createKeyValueRow(
        documentLike,
        "Normalization additions",
        state.acceptance.lockedNormalizationSummary.addedSupportOccurrences.join(", ") || "none"
      ),
      createKeyValueRow(
        documentLike,
        "Locked reactant assemblies",
        summarizeLane(state.acceptance.lockedLaneInventories?.lane1)
      ),
      createKeyValueRow(
        documentLike,
        "Locked product assemblies",
        summarizeLane(state.acceptance.lockedLaneInventories?.lane5)
      )
    );
    if (state.publication) {
      acceptedSummaryElement.append(
        createKeyValueRow(documentLike, "Publication", state.publication.publicationState),
        createKeyValueRow(documentLike, "Publication mode", state.publication.publicationMode),
        createKeyValueRow(documentLike, "Published document", state.publication.documentTitle)
      );
    }
  }

  function renderPublicationPreview() {
    publicationPreviewElement.replaceChildren();
    if (!state.pdgeditPreview) {
      publicationPreviewElement.append(
        createLine(documentLike, "pdgsolve-empty", "Accept a publication-ready family to derive the pdgedit preview.")
      );
      return;
    }
    publicationPreviewElement.append(
      createKeyValueRow(documentLike, "Schema", state.pdgeditPreview.schema),
      createKeyValueRow(
        documentLike,
        "Assemblies",
        String((state.pdgeditPreview.assemblies ?? []).length)
      ),
      createKeyValueRow(
        documentLike,
        "Operators",
        String((state.pdgeditPreview.operators ?? []).length)
      ),
      createKeyValueRow(
        documentLike,
        "Links",
        String((state.pdgeditPreview.links ?? []).length)
      )
    );
    const previewPre = documentLike.createElement("pre");
    previewPre.className = "pdgsolve-json-preview";
    previewPre.textContent = JSON.stringify(state.pdgeditPreview, null, 2);
    publicationPreviewElement.append(previewPre);
  }

  function render() {
    renderRequestPicker();
    renderRequestSummary();
    renderDiagnostics();
    renderFamilies();
    renderAcceptedSummary();
    renderPublicationPreview();
    updateToolbarState();
  }

  function setSelectedRequestEntryId(entryId = "") {
    state.selectedRequestEntryId = normalizeText(entryId);
    state.result = null;
    state.selectedFamilyId = "";
    state.acceptance = null;
    state.pdgeditPreview = null;
    state.publication = null;
    state.errorMessage = "";
    render();
  }

  function appendRequestEntry(request, metadata = {}) {
    const normalizedRequest = normalizePdgsolveRequest(request);
    const entryId =
      normalizeText(metadata.entryId) ||
      `loaded:${normalizedRequest.requestId || state.requestEntries.length + 1}`;
    const entry = {
      id: entryId,
      title:
        normalizeText(metadata.title) ||
        normalizedRequest.source.title ||
        normalizedRequest.requestId ||
        "Loaded request",
      subtitle: normalizeText(metadata.subtitle),
      sourceKind: normalizeText(metadata.sourceKind) || normalizedRequest.source.kind || "developer",
      request: normalizedRequest,
    };
    state.requestEntries = [
      entry,
      ...state.requestEntries.filter((candidate) => candidate.id !== entry.id),
    ];
    setSelectedRequestEntryId(entry.id);
  }

  function runSolve() {
    const selectedEntry = getSelectedRequestEntry();
    if (!selectedEntry) {
      return;
    }
    try {
      state.result = requestSolver(selectedEntry.request);
      state.selectedFamilyId =
        normalizeText(state.result?.review?.selectedFamilyId) ||
        normalizeText(state.result?.bestFamilyId);
      state.acceptance = null;
      state.pdgeditPreview = null;
      state.publication = null;
      state.errorMessage = "";
    } catch (error) {
      state.errorMessage = error instanceof Error ? error.message : String(error);
      state.result = null;
      state.selectedFamilyId = "";
      state.acceptance = null;
      state.pdgeditPreview = null;
      state.publication = null;
    }
    render();
  }

  function acceptSelectedFamily() {
    const selectedEntry = getSelectedRequestEntry();
    if (!selectedEntry || !state.result) {
      return;
    }
    try {
      const acceptance = acceptanceBuilder({
        request: selectedEntry.request,
        result: state.result,
        familyId: state.selectedFamilyId,
      });
      state.acceptance = acceptance;
      state.pdgeditPreview = acceptancePreviewBuilder(acceptance);
      state.publication = null;
      state.errorMessage = "";
      state.result = {
        ...state.result,
        acceptedFamilyId: acceptance.familyId,
        review: {
          ...(state.result.review ?? {}),
          acceptedFamilyId: acceptance.familyId,
          acceptedRecord: acceptance,
        },
      };
    } catch (error) {
      state.errorMessage = error instanceof Error ? error.message : String(error);
    }
    render();
  }

  function launchAcceptedPdgeditDocument() {
    if (!state.acceptance) {
      return;
    }
    try {
      state.publication = publicationLauncher({
        acceptance: state.acceptance,
        windowLike,
        storage: windowLike?.sessionStorage,
      });
      state.errorMessage = "";
    } catch (error) {
      state.errorMessage = error instanceof Error ? error.message : String(error);
    }
    render();
  }

  async function loadRequestFromFile(file) {
    const raw = await readJsonFile(file);
    appendRequestEntry(raw, {
      entryId: `file:${normalizeText(file?.name) || "request"}`,
      title: normalizeText(raw?.source?.title) || normalizeText(file?.name),
      subtitle: normalizeText(file?.name),
      sourceKind: normalizeText(raw?.source?.kind) || "developer",
    });
    runSolve();
  }

  async function reopenAcceptanceFromFile(file) {
    const raw = await readJsonFile(file);
    const acceptance = normalizePdgsolveAcceptanceRecord(raw);
    state.acceptance = acceptance;
    state.pdgeditPreview = acceptancePreviewBuilder(acceptance);
    state.publication = null;
    state.errorMessage = "";
    render();
  }

  requestSelectElement.addEventListener("change", (event) => {
    setSelectedRequestEntryId(event.currentTarget?.value);
  });

  familyListElement.addEventListener("click", (event) => {
    const familyButton = event.target?.closest?.("[data-family-id]");
    const familyId = normalizeText(familyButton?.dataset?.familyId);
    if (!familyId) {
      return;
    }
    state.selectedFamilyId = familyId;
    render();
  });

  homeButtonElement?.addEventListener("click", () => {
    navigateStandalonePdgsolveHome(windowLike?.location, homeHref);
  });

  solveButtonElement?.addEventListener("click", () => {
    runSolve();
  });

  acceptButtonElement?.addEventListener("click", () => {
    acceptSelectedFamily();
  });

  launchPdgeditButtonElement?.addEventListener("click", () => {
    launchAcceptedPdgeditDocument();
  });

  loadRequestButtonElement?.addEventListener("click", () => {
    requestFileInputElement?.click();
  });

  reopenAcceptanceButtonElement?.addEventListener("click", () => {
    acceptanceFileInputElement?.click();
  });

  requestFileInputElement?.addEventListener("change", async (event) => {
    const file = event.currentTarget?.files?.[0];
    if (!file) {
      return;
    }
    try {
      await loadRequestFromFile(file);
    } catch (error) {
      state.errorMessage = error instanceof Error ? error.message : String(error);
      render();
    } finally {
      event.currentTarget.value = "";
    }
  });

  acceptanceFileInputElement?.addEventListener("change", async (event) => {
    const file = event.currentTarget?.files?.[0];
    if (!file) {
      return;
    }
    try {
      await reopenAcceptanceFromFile(file);
    } catch (error) {
      state.errorMessage = error instanceof Error ? error.message : String(error);
      render();
    } finally {
      event.currentTarget.value = "";
    }
  });

  return {
    async init() {
      const seed = await bootstrapLoader({
        pdgfeedManifestUrl,
        requestUrl,
        acceptanceUrl,
        requestId,
      });
      state.requestEntries = Array.isArray(seed?.requestEntries) ? seed.requestEntries : [];
      state.selectedRequestEntryId = seed?.selectedRequestEntry?.id ?? state.requestEntries[0]?.id ?? "";
      state.result = null;
      state.selectedFamilyId = "";
      state.acceptance = seed?.reopenedAcceptance ?? null;
      state.pdgeditPreview = state.acceptance ? acceptancePreviewBuilder(state.acceptance) : null;
      state.publication = null;
      state.errorMessage = "";
      render();
      if (!state.acceptance && getSelectedRequestEntry()) {
        runSolve();
      }
      return this;
    },
    readCurrentRequest() {
      return getSelectedRequestEntry()?.request ?? null;
    },
    readCurrentResult() {
      return state.result;
    },
    readAcceptedRecord() {
      return state.acceptance;
    },
    readCurrentPdgeditPreview() {
      return state.pdgeditPreview;
    },
    readCurrentPublication() {
      return state.publication;
    },
    loadDirectRequest(rawRequest = {}, metadata = {}) {
      appendRequestEntry(rawRequest, metadata);
      runSolve();
      return this.readCurrentResult();
    },
    reopenAcceptedRecord(rawAcceptance = {}) {
      state.acceptance = normalizePdgsolveAcceptanceRecord(rawAcceptance);
      state.pdgeditPreview = acceptancePreviewBuilder(state.acceptance);
      state.publication = null;
      state.errorMessage = "";
      render();
      return state.acceptance;
    },
  };
}
