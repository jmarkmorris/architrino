import { createReactionFlowExportRuntime } from "./ReactionFlowExportRuntime.js";
import { navigateStandaloneReactionHome } from "./ReactionAppModeRuntime.js";
import { createReactionCanvasUiRuntime } from "./ReactionCanvasUiRuntime.js";
import { reactionAssemblyTemplateMenuRows } from "./ReactionTemplateCatalogRuntime.js";

const reactionCanvasStorageKey = "architrino.reaction.active";

export function createReactionAppRuntime(deps) {
  const {
    statusElement = null,
    root = null,
    surface = null,
    reactantsColumn = null,
    productsColumn = null,
    mapHint = null,
    emptyState = null,
    mapSvg = null,
    menu = null,
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

  const canvasRuntime = createReactionCanvasUiRuntime({
    root,
    surface,
    reactantsColumn,
    productsColumn,
    mapHint,
    emptyState,
    mapSvg,
    menu,
    clearButton,
    solveButton,
    templateMenuRows: reactionAssemblyTemplateMenuRows,
    setStatus,
    closeExternalMenus: () => {},
    storage: globalThis.window?.sessionStorage ?? null,
    storageKey: reactionCanvasStorageKey,
    solveSnapshot:
      typeof solveSnapshot === "function" ? solveSnapshot : undefined,
  });
  const exportRuntime = createReactionFlowExportRuntime({
    getSnapshot: canvasRuntime.getSnapshot,
    reactionId: "reaction_designer_active",
    title: "Reaction Designer",
    sourceDocumentIds: [reactionCanvasStorageKey],
    semanticTags: ["manual-authoring", "reaction-designer"],
    suggestedSceneId: "reaction_designer_scene",
  });

  function init() {
    if (exitButton instanceof HTMLButtonElement) {
      exitButton.addEventListener("click", () => {
        exitReactionApp();
      });
    }
    canvasRuntime.setActive(true, { persist: false, announce: false });
    setStatus(
      "Reaction app ready. Use the left and right + controls to build a reaction."
    );
  }

  return {
    init,
    setStatus,
    exitReactionApp,
    canvasRuntime,
    exportReactionFlowDocument: exportRuntime.exportDocument,
  };
}
