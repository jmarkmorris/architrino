export function createComposerUiRuntime(deps) {
  const {
    app,
    composerOverlay,
    composerTabs,
    composerPanels,
    composerSceneId,
    composerPreviewSceneId,
    composerPreviewScenePath,
    composerDocsPath,
    levelConfigs,
    levels,
    initComposerCanvas,
    renderComposerJsonPreview,
    stopComposerCameraFlightPreview,
    showMarkdownPanel,
    readComposerFormState,
    buildComposerSceneData,
    jumpToScene,
    setComposerStatus,
  } = deps;

  let composerActivePanel = "tree";

  function setComposerPanel(panelId) {
    if (!composerOverlay) {
      return;
    }
    const targetId = panelId || "tree";
    const hasPanel = composerPanels.some((panel) => panel.dataset.panel === targetId);
    const nextPanel = hasPanel ? targetId : "tree";
    composerActivePanel = nextPanel;
    composerTabs.forEach((tab) => {
      const isActive = tab.dataset.panel === nextPanel;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });
    composerPanels.forEach((panel) => {
      const isActive = panel.dataset.panel === nextPanel;
      panel.classList.toggle("is-active", isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
    });
    if (nextPanel === "path") {
      deps.setComposerNeedsResize(true);
    }
    if (nextPanel === "export") {
      renderComposerJsonPreview();
    }
  }

  function updateComposerOverlay(currentLevel) {
    if (!composerOverlay) {
      return;
    }
    const isComposer =
      currentLevel?.sceneId === composerSceneId ||
      currentLevel?.sceneId === composerPreviewSceneId;
    composerOverlay.classList.toggle("is-open", !!isComposer);
    composerOverlay.setAttribute("aria-hidden", isComposer ? "false" : "true");
    composerOverlay.inert = !isComposer;
    if (app) {
      app.classList.toggle("composer-mode", !!isComposer);
    }
    if (isComposer) {
      initComposerCanvas();
      deps.setComposerNeedsResize(true);
      setComposerPanel(composerActivePanel);
      renderComposerJsonPreview();
    } else {
      stopComposerCameraFlightPreview();
    }
  }

  function openComposerDocs(isTransitionActive) {
    if (isTransitionActive) {
      return;
    }
    showMarkdownPanel({
      name: "Composer Docs",
      markdownPath: composerDocsPath,
      markdownColumns: 2,
    });
  }

  function openComposerPreview(isTransitionActive) {
    if (isTransitionActive) {
      return;
    }
    const state = readComposerFormState();
    const sceneData = buildComposerSceneData(state, {
      sceneId: composerPreviewSceneId,
      sceneTitle: `${state.name} (Preview)`,
    });
    levelConfigs[composerPreviewScenePath] = sceneData;
    levels.delete(composerPreviewScenePath);
    composerActivePanel = "preview";
    setComposerPanel("preview");
    setComposerStatus(`Previewing "${state.name}". Use Back to return.`);
    jumpToScene(composerPreviewScenePath, {
      mode: "jump",
      startScale: 0.6,
      duration: 700,
    });
  }

  function exportComposerScene() {
    const state = readComposerFormState();
    const sceneData = buildComposerSceneData(state);
    const json = JSON.stringify(sceneData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${state.id || "composer_scene"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setComposerStatus(`Exported ${state.id}.json`);
    renderComposerJsonPreview();
  }

  return {
    setComposerPanel,
    updateComposerOverlay,
    openComposerDocs,
    openComposerPreview,
    exportComposerScene,
  };
}
