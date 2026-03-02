export function createScenePanelUiRuntime(deps) {
  const {
    docButton,
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
