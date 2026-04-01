import { createReactionFlowExportRuntime } from "./ReactionFlowExportRuntime.js";
import { navigateStandaloneReactionHome } from "./ReactionAppModeRuntime.js";
import { createReactionSolverUiRuntime } from "./ReactionSolverUiRuntime.js";
import { reactionAssemblyTemplateMenuRows } from "./ReactionTemplateCatalogRuntime.js";

const reactionSolverStorageKey = "architrino.reaction.active";

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

  const solverRuntime = createReactionSolverUiRuntime({
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
    storageKey: reactionSolverStorageKey,
  });
  const exportRuntime = createReactionFlowExportRuntime({
    getSnapshot: solverRuntime.getSnapshot,
    reactionId: "reaction_designer_active",
    title: "Reaction Designer and Solver",
    sourceDocumentIds: [reactionSolverStorageKey],
    semanticTags: ["manual-authoring", "reaction-designer"],
    suggestedSceneId: "reaction_designer_scene",
  });

  function init() {
    if (exitButton instanceof HTMLButtonElement) {
      exitButton.addEventListener("click", () => {
        exitReactionApp();
      });
    }
    solverRuntime.setActive(true, { persist: false, announce: false });
    setStatus(
      "Reaction app ready. Use the left and right + controls to author a manual solve."
    );
  }

  return {
    init,
    setStatus,
    exitReactionApp,
    solverRuntime,
    exportReactionFlowDocument: exportRuntime.exportDocument,
  };
}
