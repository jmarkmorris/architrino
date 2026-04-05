import { createReactionCommitStateRuntime } from "./ReactionCommitStateRuntime.js";
import { createReactionFlowExportRuntime } from "./ReactionFlowExportRuntime.js";
import { navigateStandaloneReactionHome } from "./ReactionAppModeRuntime.js";
import { createReactionCanvasUiRuntime } from "./ReactionCanvasUiRuntime.js";
import {
  REACTION_BUILTIN_LIBRARY_ENTRIES,
  loadDefaultReactionBuiltInLibraryEntry,
  loadReactionBuiltInLibraryEntry,
} from "./ReactionBuiltInLibraryRuntime.js";
import { buildReactionReviewCandidateFromSolverRequest } from "./ReactionReviewImportRuntime.js";
import { reactionAssemblyTemplateMenuRows } from "./ReactionTemplateCatalogRuntime.js";

const reactionCanvasStorageKey = "architrino.reaction.active";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function formatAcceptedAt(acceptedAt = "") {
  const acceptedDate = new Date(acceptedAt);
  if (!acceptedAt || Number.isNaN(acceptedDate.getTime())) {
    return "";
  }
  return acceptedDate.toLocaleString();
}

function sanitizeDownloadFileBaseName(value = "") {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "") || "reaction_designer_active";
}

function snapshotHasContent(snapshot = {}) {
  return (
    (Array.isArray(snapshot?.participants) ? snapshot.participants.length : 0) > 0 ||
    (Array.isArray(snapshot?.mappings) ? snapshot.mappings.length : 0) > 0
  );
}

export function createReactionAppRuntime(deps) {
  const {
    reviewStateElement = null,
    statusElement = null,
    root = null,
    surface = null,
    reactantsColumn = null,
    productsColumn = null,
    mapHint = null,
    emptyState = null,
    mapSvg = null,
    menu = null,
    librarySelect = null,
    libraryQuickList = null,
    libraryLoadButton = null,
    acceptButton = null,
    exportButton = null,
    clearButton = null,
    solveButton = null,
    exitButton = null,
    solveSnapshot = null,
    initialSolverRequest = null,
    createCommitRuntime = createReactionCommitStateRuntime,
    createCanvasRuntime = createReactionCanvasUiRuntime,
    createFlowExportRuntime = createReactionFlowExportRuntime,
    builtInLibraryEntries = REACTION_BUILTIN_LIBRARY_ENTRIES,
    loadReactionLibraryEntry = loadReactionBuiltInLibraryEntry,
    loadDefaultReactionLibraryEntry = loadDefaultReactionBuiltInLibraryEntry,
  } = deps;

  function setStatus(message = "") {
    if (!(statusElement instanceof HTMLElement)) {
      return;
    }
    statusElement.textContent = String(message ?? "").trim();
  }

  function exitReactionApp() {
    return navigateStandaloneReactionHome(globalThis.window?.location);
  }

  function setReviewState(message = "") {
    if (!(reviewStateElement instanceof HTMLElement)) {
      return;
    }
    reviewStateElement.textContent = String(message ?? "").trim();
  }

  let latestSnapshot = { participants: [], mappings: [] };
  let reviewImportCandidate = null;
  let currentDocumentOptions = null;
  const commitRuntime = createCommitRuntime({
    getSnapshot: () => latestSnapshot,
  });
  const canvasRuntime = createCanvasRuntime({
    root,
    surface,
    reactantsColumn,
    productsColumn,
    mapHint,
    emptyState,
    mapSvg,
    menu,
    acceptButton,
    exportButton,
    clearButton,
    solveButton,
    templateMenuRows: reactionAssemblyTemplateMenuRows,
    setStatus,
    onSnapshotChange: (snapshot) => {
      latestSnapshot = snapshot;
      if (!snapshotHasContent(snapshot)) {
        reviewImportCandidate = null;
        currentDocumentOptions = null;
      }
      const invalidatedAcceptedState = commitRuntime.observeSnapshot(snapshot);
      syncReviewControls();
      if (invalidatedAcceptedState) {
        setStatus("Reaction changed after acceptance. Accept again to commit the latest handoff.");
      }
    },
    closeExternalMenus: () => {},
    storage: globalThis.window?.sessionStorage ?? null,
    storageKey: reactionCanvasStorageKey,
    solveSnapshot:
      typeof solveSnapshot === "function" ? solveSnapshot : undefined,
  });
  const exportRuntime = createFlowExportRuntime({
    getSnapshot: canvasRuntime.getSnapshot,
    getReview: () => commitRuntime.buildExportReview(),
    getDocumentOptions: () => currentDocumentOptions ?? {},
    reactionId: "reaction_designer_active",
    title: "Reaction Designer",
    sourceDocumentIds: [reactionCanvasStorageKey],
    semanticTags: ["manual-authoring", "reaction-designer"],
    suggestedSceneId: "reaction_designer_scene",
  });

  function buildReviewImportStatusMessage(reviewInput = {}) {
    const reviewTitle = normalizeText(reviewInput?.origin?.title);
    const sourceKind = normalizeText(reviewInput?.origin?.sourceKind);
    const sourceLabel = sourceKind === "pdg-ingest" ? "PDG" : "solver-request";
    return `${
      reviewTitle ? `${sourceLabel} review candidate loaded: ${reviewTitle}.` : `${sourceLabel} review candidate loaded.`
    } Accept it to emit accepted reaction-flow/v1 JSON downstream of review.`;
  }

  function buildBuiltInLibraryStatusMessage(libraryEntry = {}) {
    const entryTitle = normalizeText(libraryEntry?.title);
    return `${
      entryTitle ? `Built-in reaction loaded: ${entryTitle}.` : "Built-in reaction loaded."
    } Accept it to emit accepted reaction-flow/v1 JSON downstream of review.`;
  }

  function syncBuiltInLibraryControls(selectedEntryId = "") {
    if (!(librarySelect instanceof HTMLSelectElement)) {
      if (!(libraryQuickList instanceof HTMLElement)) {
        return;
      }
    }
    const entries = Array.isArray(builtInLibraryEntries) ? builtInLibraryEntries : [];
    if (librarySelect instanceof HTMLSelectElement) {
      librarySelect.innerHTML = "";
      entries.forEach((entry) => {
        const option = globalThis.document?.createElement?.("option") ?? null;
        if (!option) {
          return;
        }
        option.value = normalizeText(entry?.id);
        option.textContent = normalizeText(entry?.title) || option.value;
        librarySelect.appendChild(option);
      });
    }
    const defaultSelectedId =
      normalizeText(selectedEntryId) ||
      normalizeText(librarySelect instanceof HTMLSelectElement ? librarySelect.value : "") ||
      normalizeText(entries.find((entry) => entry?.isDefault)?.id) ||
      normalizeText(entries[0]?.id);
    if (defaultSelectedId && librarySelect instanceof HTMLSelectElement) {
      librarySelect.value = defaultSelectedId;
    }
    if (librarySelect instanceof HTMLSelectElement) {
      librarySelect.disabled = entries.length === 0;
    }
    if (libraryQuickList instanceof HTMLElement) {
      libraryQuickList.innerHTML = "";
      entries.forEach((entry) => {
        const button = globalThis.document?.createElement?.("button") ?? null;
        if (!(button instanceof HTMLButtonElement)) {
          return;
        }
        button.type = "button";
        button.className = "reaction-app-library-chip";
        const entryId = normalizeText(entry?.id);
        if (entryId && entryId === defaultSelectedId) {
          button.classList.add("is-active");
        }
        button.textContent = normalizeText(entry?.title) || entryId;
        button.addEventListener("click", async () => {
          if (librarySelect instanceof HTMLSelectElement && entryId) {
            librarySelect.value = entryId;
          }
          syncBuiltInLibraryControls(entryId);
          try {
            await loadSelectedBuiltInReactionLibraryEntry(entryId);
          } catch (_error) {
            setStatus("Built-in reaction load failed.");
          }
        });
        libraryQuickList.appendChild(button);
      });
    }
    if (libraryLoadButton instanceof HTMLButtonElement) {
      libraryLoadButton.disabled = entries.length === 0;
      libraryLoadButton.setAttribute("aria-disabled", entries.length === 0 ? "true" : "false");
    }
  }

  function applyLoadedSnapshot(snapshot = {}, documentOptions = null, options = {}) {
    latestSnapshot = canvasRuntime.replaceSnapshot(snapshot, {
      announce: false,
    });
    currentDocumentOptions =
      documentOptions && Object.keys(documentOptions).length > 0 ? documentOptions : null;
    commitRuntime.reset();
    syncReviewControls();
    if (options?.announce !== false) {
      setStatus(normalizeText(options?.statusMessage));
    }
    return latestSnapshot;
  }

  function loadSolverRequestReviewCandidate(request = {}, options = {}) {
    const candidate = buildReactionReviewCandidateFromSolverRequest(request);
    reviewImportCandidate = candidate;
    applyLoadedSnapshot(candidate.snapshot, candidate.exportOverrides, {
      announce: false,
    });
    if (options?.announce !== false) {
      setStatus(buildReviewImportStatusMessage(candidate.reviewInput));
    }
    return candidate;
  }

  function loadBuiltInReactionLibraryCandidate(payload = {}, options = {}) {
    reviewImportCandidate = null;
    const appliedSnapshot = applyLoadedSnapshot(payload?.snapshot, payload?.exportOverrides, {
      announce: false,
    });
    syncBuiltInLibraryControls(payload?.entry?.id);
    if (options?.announce !== false) {
      setStatus(buildBuiltInLibraryStatusMessage(payload?.entry));
    }
    return {
      ...payload,
      snapshot: appliedSnapshot,
    };
  }

  function syncReviewControls() {
    const commitState = commitRuntime.getCommitState(latestSnapshot);
    if (reviewStateElement instanceof HTMLElement) {
      if (!commitState.hasContent) {
        setReviewState("Draft. Build a reaction, then accept it for handoff.");
      } else if (commitState.status === "accepted") {
        const acceptedAtLabel = formatAcceptedAt(commitState.acceptedAt);
        setReviewState(
          acceptedAtLabel
            ? `Accepted for handoff at ${acceptedAtLabel}. Export now emits accepted reaction-flow/v1 JSON.`
            : "Accepted for handoff. Export now emits accepted reaction-flow/v1 JSON."
        );
      } else if (commitState.needsReaccept) {
        setReviewState("Draft. The canvas changed after acceptance; accept again to commit the latest handoff.");
      } else {
        setReviewState("Draft. Accept this reaction to mark it downstream-ready.");
      }
    }
    if (acceptButton instanceof HTMLButtonElement) {
      acceptButton.disabled = !commitState.canAccept || commitState.status === "accepted";
      acceptButton.setAttribute(
        "aria-disabled",
        !commitState.canAccept || commitState.status === "accepted" ? "true" : "false"
      );
      acceptButton.textContent =
        commitState.status === "accepted" ? "Accepted" : commitState.needsReaccept ? "Accept Latest" : "Accept";
    }
    if (exportButton instanceof HTMLButtonElement) {
      exportButton.disabled = !commitState.canExport;
      exportButton.setAttribute("aria-disabled", commitState.canExport ? "false" : "true");
    }
  }

  function acceptReactionFlowDocument() {
    const commitState = commitRuntime.acceptCurrentSnapshot(latestSnapshot);
    syncReviewControls();
    if (!commitState) {
      setStatus("Build a reaction before accepting it for handoff.");
      return false;
    }
    setStatus("Reaction accepted for handoff. Export now emits accepted reaction-flow/v1 JSON.");
    return true;
  }

  function exportReactionFlowDocument() {
    return exportRuntime.exportDocument();
  }

  function downloadReactionFlowDocument() {
    const commitState = commitRuntime.getCommitState(latestSnapshot);
    if (!commitState.canExport) {
      setStatus("Accept the reaction before exporting handoff JSON.");
      return false;
    }
    const reactionFlowDocument = exportReactionFlowDocument();
    if (
      typeof Blob !== "function" ||
      !globalThis.URL ||
      typeof globalThis.URL.createObjectURL !== "function" ||
      !(globalThis.document?.body instanceof HTMLElement)
    ) {
      setStatus("Reaction export is unavailable in this browser context.");
      return false;
    }
    const fileBaseName = sanitizeDownloadFileBaseName(reactionFlowDocument?.reactionId);
    const downloadLink = globalThis.document.createElement("a");
    const jsonBlob = new Blob([JSON.stringify(reactionFlowDocument, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const objectUrl = globalThis.URL.createObjectURL(jsonBlob);
    downloadLink.href = objectUrl;
    downloadLink.download = `${fileBaseName}.reaction-flow.v1.json`;
    globalThis.document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    globalThis.URL.revokeObjectURL(objectUrl);
    setStatus(`Exported accepted reaction-flow/v1 JSON as ${downloadLink.download}.`);
    return true;
  }

  async function loadSelectedBuiltInReactionLibraryEntry(entryId = "", options = {}) {
    const resolvedEntryId =
      normalizeText(entryId) ||
      (librarySelect instanceof HTMLSelectElement ? normalizeText(librarySelect.value) : "");
    if (!resolvedEntryId) {
      setStatus("Choose a built-in reaction before loading.");
      return null;
    }
    const payload = await loadReactionLibraryEntry(resolvedEntryId);
    return loadBuiltInReactionLibraryCandidate(payload, options);
  }

  async function init() {
    latestSnapshot = canvasRuntime.getSnapshot();
    syncReviewControls();
    syncBuiltInLibraryControls();
    if (acceptButton instanceof HTMLButtonElement) {
      acceptButton.addEventListener("click", () => {
        acceptReactionFlowDocument();
      });
    }
    if (exportButton instanceof HTMLButtonElement) {
      exportButton.addEventListener("click", () => {
        downloadReactionFlowDocument();
      });
    }
    if (libraryLoadButton instanceof HTMLButtonElement) {
      libraryLoadButton.addEventListener("click", async () => {
        try {
          await loadSelectedBuiltInReactionLibraryEntry();
        } catch (_error) {
          setStatus("Built-in reaction load failed.");
        }
      });
    }
    if (exitButton instanceof HTMLButtonElement) {
      exitButton.addEventListener("click", () => {
        exitReactionApp();
      });
    }
    canvasRuntime.setActive(true, { persist: false, announce: false });
    if (initialSolverRequest) {
      loadSolverRequestReviewCandidate(initialSolverRequest, { announce: false });
      syncReviewControls();
      setStatus(buildReviewImportStatusMessage(reviewImportCandidate?.reviewInput));
      return;
    }
    if (!snapshotHasContent(latestSnapshot)) {
      try {
        const libraryPayload = await loadDefaultReactionLibraryEntry();
        loadBuiltInReactionLibraryCandidate(libraryPayload, { announce: false });
        syncReviewControls();
        setStatus(buildBuiltInLibraryStatusMessage(libraryPayload?.entry));
        return;
      } catch (error) {
        const message = normalizeText(error?.message);
        if (message) {
          setStatus(`Built-in reaction auto-load failed: ${message}. Manual authoring is still available.`);
        }
        // Keep manual authoring available even if the built-in library fixture is unavailable.
        return;
      }
    }
    syncReviewControls();
    setStatus("Reaction app ready. Use the left and right + controls to build a reaction.");
  }

    return {
      init,
      setStatus,
      exitReactionApp,
      acceptReactionFlowDocument,
    canvasRuntime,
      exportReactionFlowDocument,
      downloadReactionFlowDocument,
      loadBuiltInReactionLibraryCandidate,
      loadSelectedBuiltInReactionLibraryEntry,
      loadSolverRequestReviewCandidate,
    };
}
