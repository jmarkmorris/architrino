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
    returnFromDocumentLevel,
    toggleTextbookToc,
    documentLike = typeof document !== "undefined" ? document : null,
  } = deps;

  function isDocumentOnlyMarkdownLevel(level = getCurrentLevel()) {
    return Boolean(
      level?.markdownPath &&
        level.markdownAutoOpen !== false &&
        Array.isArray(level.nodes) &&
        level.nodes.length === 0
    );
  }

  function updateMarkdownCloseAction() {
    if (!markdownClose) {
      return;
    }
    const returnsFromDocument = isDocumentOnlyMarkdownLevel();
    markdownClose.setAttribute?.(
      "aria-label",
      returnsFromDocument ? "Close document and return" : "Close document"
    );
    markdownClose.title = returnsFromDocument ? "Close and return" : "Close";
  }

  async function closeMarkdownSurface() {
    if (isTransitionActive()) {
      return false;
    }
    if (
      isDocumentOnlyMarkdownLevel() &&
      typeof returnFromDocumentLevel === "function" &&
      (await returnFromDocumentLevel())
    ) {
      return true;
    }
    markdownRuntime.hideMarkdownPanel();
    return false;
  }

  async function openCurrentLevelDoc() {
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
      await closeMarkdownSurface();
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

  async function closeMarkdownFromOutsidePointer(event) {
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
    await closeMarkdownSurface();
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
      markdownClose.addEventListener("click", async () => {
        await closeMarkdownSurface();
      });
    }

    if (markdownDocButton) {
      markdownDocButton.addEventListener("click", async () => {
        await openCurrentLevelDoc();
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
    updateMarkdownCloseAction,
    wireListeners,
  };
}
