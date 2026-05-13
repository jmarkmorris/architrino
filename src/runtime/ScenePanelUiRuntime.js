export function createScenePanelUiRuntime(deps) {
  const {
    docButton,
    detailClose,
    markdownClose,
    markdownDocButton,
    markdownPdfButton,
    markdownLayoutToggle,
    markdownRuntime,
    closeDetailPanel,
    getCurrentLevel,
    isTransitionActive,
    toggleTextbookToc,
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

  function wireListeners() {
    if (docButton) {
      docButton.addEventListener("click", () => {
        if (typeof toggleTextbookToc === "function") {
          toggleTextbookToc();
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

    if (markdownPdfButton) {
      markdownPdfButton.addEventListener("click", async () => {
        if (isTransitionActive()) {
          return;
        }
        if (markdownRuntime.printMarkdownPanel()) {
          return;
        }
        const currentLevel = getCurrentLevel();
        if (currentLevel?.markdownPath) {
          await markdownRuntime.showMarkdownPanel(currentLevel);
          window.setTimeout(() => {
            markdownRuntime.printMarkdownPanel();
          }, 0);
        }
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
