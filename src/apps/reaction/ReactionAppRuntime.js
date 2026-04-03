import { createReactionCommitStateRuntime } from "./ReactionCommitStateRuntime.js";
import { createReactionFlowExportRuntime } from "./ReactionFlowExportRuntime.js";
import { navigateStandaloneReactionHome } from "./ReactionAppModeRuntime.js";
import { createReactionCanvasUiRuntime } from "./ReactionCanvasUiRuntime.js";
import { reactionAssemblyTemplateMenuRows } from "./ReactionTemplateCatalogRuntime.js";

const reactionCanvasStorageKey = "architrino.reaction.active";

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

export function createReactionAppRuntime(deps) {
  const {
    reviewStateElement = null,
    statusElement = null,
    root = null,
    surface = null,
    reactantsColumn = null,
    productsColumn = null,
    mapHint = null,
    legibilityPanel = null,
    emptyState = null,
    mapSvg = null,
    menu = null,
    acceptButton = null,
    exportButton = null,
    clearButton = null,
    solveButton = null,
    exitButton = null,
    solveSnapshot = null,
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
  const commitRuntime = createReactionCommitStateRuntime({
    getSnapshot: () => latestSnapshot,
  });
  const canvasRuntime = createReactionCanvasUiRuntime({
    root,
    surface,
    reactantsColumn,
    productsColumn,
    mapHint,
    legibilityPanel,
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
  const exportRuntime = createReactionFlowExportRuntime({
    getSnapshot: canvasRuntime.getSnapshot,
    getReview: () => commitRuntime.buildExportReview(),
    reactionId: "reaction_designer_active",
    title: "Reaction Designer",
    sourceDocumentIds: [reactionCanvasStorageKey],
    semanticTags: ["manual-authoring", "reaction-designer"],
    suggestedSceneId: "reaction_designer_scene",
  });

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

  function init() {
    latestSnapshot = canvasRuntime.getSnapshot();
    syncReviewControls();
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
    syncReviewControls();
    setStatus(
      "Reaction app ready. Use the left and right + controls to build a reaction."
    );
  }

  return {
    init,
    setStatus,
    exitReactionApp,
    acceptReactionFlowDocument,
    canvasRuntime,
    exportReactionFlowDocument,
    downloadReactionFlowDocument,
  };
}
