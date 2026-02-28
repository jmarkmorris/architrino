export function createScenePanelUiRuntime(deps) {
  const {
    docButton,
    hud,
    detailClose,
    markdownClose,
    markdownDocButton,
    markdownLayoutToggle,
    markdownRuntime,
    closeDetailPanel,
    getCurrentLevel,
    isTransitionActive,
  } = deps;

  function openCurrentLevelDoc() {
    if (isTransitionActive()) {
      return;
    }
    const currentLevel = getCurrentLevel();
    if (!currentLevel?.markdownPath) {
      return;
    }
    const docLevel = currentLevel.markdownSection
      ? { ...currentLevel, markdownSection: null }
      : currentLevel;
    markdownRuntime.showMarkdownPanel(docLevel);
  }

  function wireListeners() {
    if (docButton) {
      docButton.addEventListener("click", () => {
        openCurrentLevelDoc();
      });
    }

    if (hud) {
      hud.addEventListener("click", () => {
        markdownRuntime.toggleInfoDrawer();
      });
      hud.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          markdownRuntime.toggleInfoDrawer();
        } else if (event.key === "Escape" && markdownRuntime.isInfoDrawerOpen()) {
          markdownRuntime.setInfoDrawer(false);
        }
      });
    }

    if (detailClose) {
      detailClose.addEventListener("click", () => {
        closeDetailPanel();
      });
    }

    if (markdownClose) {
      markdownClose.addEventListener("click", () => {
        markdownRuntime.hideMarkdownPanel();
      });
    }

    if (markdownDocButton) {
      markdownDocButton.addEventListener("click", () => {
        openCurrentLevelDoc();
      });
    }

    if (markdownLayoutToggle) {
      markdownLayoutToggle.addEventListener("click", () => {
        markdownRuntime.toggleMarkdownLayout();
      });
    }
  }

  return {
    wireListeners,
  };
}
