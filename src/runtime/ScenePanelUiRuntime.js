export function createScenePanelUiRuntime(deps) {
  const {
    textbookTocButton,
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
    if (textbookTocButton) {
      textbookTocButton.addEventListener("click", () => {
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
        const currentLevel = getCurrentLevel();
        if (
          currentLevel?.markdownDownloadOnly === true &&
          typeof markdownRuntime.downloadMarkdownSource === "function" &&
          markdownRuntime.downloadMarkdownSource(currentLevel)
        ) {
          return;
        }
        if (markdownRuntime.printMarkdownPanel()) {
          return;
        }
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
