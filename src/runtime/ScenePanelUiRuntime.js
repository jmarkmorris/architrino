export function createScenePanelUiRuntime(deps) {
  const {
    docButton,
    detailClose,
    markdownClose,
    markdownPanel,
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
    if (markdownDocButton && docLevel.markdownSection == null) {
      markdownDocButton.classList.add("is-hidden");
      markdownDocButton.disabled = true;
    }
  }

  function toggleCurrentLevelDoc() {
    if (isTransitionActive()) {
      return;
    }
    if (markdownPanel?.classList.contains("is-open")) {
      markdownRuntime.hideMarkdownPanel();
      return;
    }
    openCurrentLevelDoc();
  }

  function wireListeners() {
    if (docButton) {
      docButton.addEventListener("click", () => {
        toggleCurrentLevelDoc();
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
