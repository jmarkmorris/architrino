import { createReactionCommitStateRuntime } from "./ReactionCommitStateRuntime.js";
import { createReactionFlowExportRuntime } from "./ReactionFlowExportRuntime.js";
import { createReactionLibraryPickerRuntime } from "./ReactionLibraryPickerRuntime.js";
import { navigateStandaloneReactionHome } from "./ReactionAppModeRuntime.js";
import { createReactionCanvasUiRuntime } from "./ReactionCanvasUiRuntime.js";
import { buildReactionSurfaceValidation } from "./ReactionSurfaceValidationRuntime.js";
import {
  REACTION_BUILTIN_LIBRARY_ENTRIES,
  loadDefaultReactionBuiltInLibraryEntry,
  loadReactionBuiltInLibraryManifest,
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
    libraryPickerRoot = null,
    libraryPickerTrigger = null,
    libraryPickerMenu = null,
    acceptButton = null,
    exportButton = null,
    clearButton = null,
    solveButton = null,
    exitButton = null,
    solveSnapshot = null,
    solveReactionRequest = null,
    initialSolverRequest = null,
    createCommitRuntime = createReactionCommitStateRuntime,
    createCanvasRuntime = createReactionCanvasUiRuntime,
    createFlowExportRuntime = createReactionFlowExportRuntime,
    createLibraryPickerRuntime = createReactionLibraryPickerRuntime,
    builtInLibraryEntries = REACTION_BUILTIN_LIBRARY_ENTRIES,
    loadReactionLibraryManifest = loadReactionBuiltInLibraryManifest,
    loadReactionLibraryEntry = loadReactionBuiltInLibraryEntry,
    loadDefaultReactionLibraryEntry = loadDefaultReactionBuiltInLibraryEntry,
  } = deps;

  let resolvedBuiltInLibraryEntries = Array.isArray(builtInLibraryEntries) ? [...builtInLibraryEntries] : [];
  let resolvedDefaultBuiltInLibraryEntryId =
    normalizeText(resolvedBuiltInLibraryEntries.find((entry) => entry?.isDefault)?.id) ||
    normalizeText(resolvedBuiltInLibraryEntries[0]?.id);

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
    validateSnapshot: buildReactionSurfaceValidation,
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
  const libraryPickerRuntime = createLibraryPickerRuntime({
    root: libraryPickerRoot,
    triggerButton: libraryPickerTrigger,
    menuElement: libraryPickerMenu,
    onSelect: (selectedEntryId) => {
      void loadSelectedBuiltInReactionLibraryEntry(selectedEntryId).catch((error) => {
        const message = normalizeText(error?.message);
        setStatus(message || "Library reaction solve failed.");
      });
    },
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
    const entryTitle = normalizeText(libraryEntry?.displayTitle) || normalizeText(libraryEntry?.title);
    return `${
      entryTitle ? `Library reaction solved: ${entryTitle}.` : "Library reaction solved."
    } Accept it to emit accepted reaction-flow/v1 JSON downstream of review.`;
  }

  function syncBuiltInLibraryControls(selectedEntryId = "") {
    if (!libraryPickerRuntime || typeof libraryPickerRuntime.setEntries !== "function") {
      return;
    }
    const entries = Array.isArray(resolvedBuiltInLibraryEntries) ? resolvedBuiltInLibraryEntries : [];
    const defaultSelectedId =
      normalizeText(selectedEntryId) ||
      normalizeText(libraryPickerRuntime.getSelectedId?.()) ||
      normalizeText(resolvedDefaultBuiltInLibraryEntryId) ||
      normalizeText(entries.find((entry) => entry?.isDefault)?.id) ||
      normalizeText(entries[0]?.id);
    libraryPickerRuntime.setEntries(entries, {
      selectedId: defaultSelectedId,
    });
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
    const snapshotValidation = commitRuntime.getSnapshotValidation(latestSnapshot);
    if (reviewStateElement instanceof HTMLElement) {
      if (!commitState.hasContent) {
        setReviewState("Draft. Build a reaction, then accept it for handoff.");
      } else if (!snapshotValidation.valid) {
        setReviewState("Draft. Connect every required visible connector before acceptance.");
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
      const snapshotValidation = commitRuntime.getSnapshotValidation(latestSnapshot);
      if (!snapshotHasContent(latestSnapshot)) {
        setStatus("Build a reaction before accepting it for handoff.");
      } else if (!snapshotValidation.valid) {
        setStatus(
          snapshotValidation.message ||
            "Connect every required visible connector before accepting this reaction."
        );
      } else {
        setStatus("Build a reaction before accepting it for handoff.");
      }
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
    let reactionFlowDocument = null;
    try {
      reactionFlowDocument = exportReactionFlowDocument();
    } catch (error) {
      const message = normalizeText(error?.message);
      setStatus(message || "Reaction export failed.");
      return false;
    }
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
      normalizeText(libraryPickerRuntime?.getSelectedId?.());
    if (!resolvedEntryId) {
      setStatus("Choose a library reaction first.");
      return null;
    }
    const selectedEntry =
      resolvedBuiltInLibraryEntries.find((entry) => normalizeText(entry?.id) === resolvedEntryId) ?? null;
    if (selectedEntry) {
      setStatus(
        `Solving library reaction: ${
          normalizeText(selectedEntry?.displayTitle) || normalizeText(selectedEntry?.title) || resolvedEntryId
        }.`
      );
    }
    const payload = await loadReactionLibraryEntry(resolvedEntryId, {
      entries: resolvedBuiltInLibraryEntries,
      defaultEntryId: resolvedDefaultBuiltInLibraryEntryId,
      solveReactionRequest,
    });
    return loadBuiltInReactionLibraryCandidate(payload, options);
  }

  async function init() {
    latestSnapshot = canvasRuntime.getSnapshot();
    syncReviewControls();
    if (
      (!Array.isArray(resolvedBuiltInLibraryEntries) || resolvedBuiltInLibraryEntries.length === 0) &&
      typeof loadReactionLibraryManifest === "function"
    ) {
      try {
        const manifest = await loadReactionLibraryManifest();
        resolvedBuiltInLibraryEntries = Array.isArray(manifest?.entries) ? [...manifest.entries] : [];
        resolvedDefaultBuiltInLibraryEntryId =
          normalizeText(manifest?.defaultEntryId) ||
          normalizeText(resolvedBuiltInLibraryEntries.find((entry) => entry?.isDefault)?.id) ||
          normalizeText(resolvedBuiltInLibraryEntries[0]?.id);
      } catch (error) {
        const message = normalizeText(error?.message);
        if (message) {
          setStatus(`Reaction library manifest load failed: ${message}.`);
        }
      }
    }
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
        const libraryPayload = await loadDefaultReactionLibraryEntry({
          entries: resolvedBuiltInLibraryEntries,
          defaultEntryId: resolvedDefaultBuiltInLibraryEntryId,
          solveReactionRequest,
        });
        loadBuiltInReactionLibraryCandidate(libraryPayload, { announce: false });
        syncReviewControls();
        setStatus(buildBuiltInLibraryStatusMessage(libraryPayload?.entry));
        return;
      } catch (error) {
        const message = normalizeText(error?.message);
        if (message) {
          setStatus(`Library reaction auto-solve failed: ${message}. Manual authoring is still available.`);
        }
        return;
      }
    }
    syncReviewControls();
    setStatus("Reaction app ready. Choose a reaction or use the left and right + controls to build one.");
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
