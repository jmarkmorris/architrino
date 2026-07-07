export function createScenePanelUiRuntime(deps) {
  const {
    textbookTocButton,
    detailClose,
    markdownClose,
    markdownPanel,
    markdownDocButton,
    markdownPdfButton,
    markdownLayoutToggle,
    markdownRuntime,
    closeDetailPanel,
    getCurrentLevel,
    isTransitionActive,
    toggleTextbookToc,
    documentLike = typeof document !== "undefined" ? document : null,
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
      ? { ...currentLevel, id: "", markdownSection: null }
      : currentLevel;
    if (
      typeof markdownRuntime.isActiveLevelMarkdown === "function" &&
      markdownRuntime.isActiveLevelMarkdown(docLevel)
    ) {
      markdownRuntime.hideMarkdownPanel();
      return;
    }
    markdownRuntime.showMarkdownPanel(docLevel);
  }

  function isInsideNode(node, target) {
    return !!node && typeof node.contains === "function" && node.contains(target);
  }

  function isMarkdownChromeTarget(target) {
    return (
      isInsideNode(markdownPanel, target) ||
      isInsideNode(markdownDocButton, target) ||
      isInsideNode(markdownPdfButton, target) ||
      isInsideNode(markdownLayoutToggle, target)
    );
  }

  function closeMarkdownFromOutsidePointer(event) {
    if (
      !markdownRuntime ||
      typeof markdownRuntime.isMarkdownPanelOpen !== "function" ||
      !markdownRuntime.isMarkdownPanelOpen()
    ) {
      return;
    }
    if (isMarkdownChromeTarget(event?.target)) {
      return;
    }
    markdownRuntime.hideMarkdownPanel();
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

    documentLike?.addEventListener?.("pointerdown", closeMarkdownFromOutsidePointer);
  }

  return {
    wireListeners,
  };
}
