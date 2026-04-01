import { composerAssemblyTemplateMenuRows } from "../../runtime/ComposerCatalogRuntime.js";
import { createComposerReactionSolverUiRuntime } from "../../runtime/ComposerReactionSolverUiRuntime.js";

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
  } = deps;

  function setStatus(message = "") {
    if (!(statusElement instanceof HTMLElement)) {
      return;
    }
    statusElement.textContent = String(message ?? "").trim();
  }

  const solverRuntime = createComposerReactionSolverUiRuntime({
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
    templateMenuRows: composerAssemblyTemplateMenuRows,
    setStatus,
    closeExternalMenus: () => {},
    storage: globalThis.window?.sessionStorage ?? null,
    storageKey: reactionSolverStorageKey,
  });

  function init() {
    solverRuntime.setActive(true, { persist: false, announce: false });
    setStatus(
      "Reaction app ready. Use the left and right + controls to author a manual solve."
    );
  }

  return {
    init,
    setStatus,
    solverRuntime,
  };
}
