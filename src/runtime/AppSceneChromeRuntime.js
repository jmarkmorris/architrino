export function createAppSceneChromeRuntime({
  sceneLabel,
  docButton,
  archieButton,
  markdownDocButton,
  markdownPdfButton,
  markdownLayoutToggle,
  detailInfoButton,
}) {
  function updateDocButton(currentLevel, options = {}) {
    if (!docButton) {
      return;
    }
    const isTextbookToc = currentLevel?.id === options.textbookTocScenePath;
    docButton.classList.remove("is-hidden");
    docButton.classList.toggle("is-active", isTextbookToc);
    docButton.setAttribute(
      "aria-label",
      isTextbookToc ? "Return from textbook TOC" : "Open textbook TOC"
    );
    docButton.setAttribute("aria-pressed", String(isTextbookToc));
    docButton.disabled = !!options.transitionActive || !currentLevel;
  }

  function updateArchieButton(currentLevel, options = {}) {
    if (!archieButton) {
      return;
    }
    const isArchie = currentLevel?.id === options.archieScenePath;
    archieButton.classList.toggle("is-active", isArchie);
    archieButton.setAttribute("aria-pressed", String(isArchie));
  }

  function updateMarkdownDocButton(currentLevel) {
    if (!markdownDocButton) {
      return;
    }
    const hasDoc = !!currentLevel?.markdownPath;
    const hasSection =
      typeof currentLevel?.markdownSection === "string"
        ? currentLevel.markdownSection.trim().length > 0
        : !!currentLevel?.markdownSection;
    const showDocButton = hasDoc && hasSection;
    markdownDocButton.classList.toggle("is-hidden", !showDocButton);
    markdownDocButton.disabled = !showDocButton;
  }

  function updateMarkdownLayoutToggleButton(currentLevel) {
    if (!markdownLayoutToggle) {
      return;
    }
    const hasDoc = !!currentLevel?.markdownPath;
    markdownLayoutToggle.classList.toggle("is-hidden", !hasDoc);
    markdownLayoutToggle.disabled = !hasDoc;
  }

  function updateMarkdownPdfButton(currentLevel) {
    if (!markdownPdfButton) {
      return;
    }
    const hasDoc = !!currentLevel?.markdownPath;
    markdownPdfButton.classList.toggle("is-hidden", !hasDoc);
    markdownPdfButton.disabled = !hasDoc;
  }

  function updateSceneInfoTrigger(canReopenInfo) {
    if (!sceneLabel) {
      return;
    }
    sceneLabel.classList.toggle("is-info-trigger", !!canReopenInfo);
    if (canReopenInfo) {
      sceneLabel.setAttribute("role", "button");
      sceneLabel.setAttribute("tabindex", "0");
      sceneLabel.setAttribute("aria-label", "Reopen element info panel");
      return;
    }
    sceneLabel.removeAttribute("role");
    sceneLabel.removeAttribute("tabindex");
    sceneLabel.removeAttribute("aria-label");
  }

  function updateDetailInfoButton(canOpenInfo, options = {}) {
    if (!detailInfoButton) {
      return;
    }
    detailInfoButton.disabled = !!options.transitionActive || !canOpenInfo;
  }

  function updateSceneLabel(currentLevel) {
    if (!sceneLabel) {
      return;
    }
    sceneLabel.textContent = currentLevel?.name ?? "";
  }

  return {
    updateDocButton,
    updateArchieButton,
    updateMarkdownDocButton,
    updateMarkdownLayoutToggleButton,
    updateMarkdownPdfButton,
    updateSceneInfoTrigger,
    updateDetailInfoButton,
    updateSceneLabel,
  };
}
