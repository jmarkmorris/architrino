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
    readComposerDraftState,
    buildComposerSceneDocument,
    buildComposerPreviewSceneData,
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
    const isComposerScene =
      currentLevel?.sceneId === composerSceneId ||
      currentLevel?.sceneId === composerPreviewSceneId;
    const isOverlayScene = isComposerScene;
    composerOverlay.classList.toggle("is-open", !!isOverlayScene);
    composerOverlay.setAttribute("aria-hidden", isOverlayScene ? "false" : "true");
    composerOverlay.inert = !isOverlayScene;
    if (app) {
      app.classList.toggle("composer-mode", !!isOverlayScene);
    }
    if (isComposerScene) {
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
    const draftState = readComposerDraftState();
    const document = buildComposerSceneDocument(draftState, {
      sceneId: composerPreviewSceneId,
      sceneName: `${draftState.name} (Preview)`,
    });
    const sceneData = buildComposerPreviewSceneData(document, {
      sceneId: composerPreviewSceneId,
      sceneTitle: `${draftState.name} (Preview)`,
    });
    levelConfigs[composerPreviewScenePath] = sceneData;
    levels.delete(composerPreviewScenePath);
    composerActivePanel = "preview";
    setComposerPanel("preview");
    setComposerStatus(`Previewing "${draftState.name}". Use Back to return.`);
    jumpToScene(composerPreviewScenePath, {
      mode: "jump",
      startScale: 0.6,
      duration: 700,
    });
  }

  function exportComposerScene() {
    const draftState = readComposerDraftState();
    const sceneDocument = buildComposerSceneDocument(draftState);
    const json = JSON.stringify(sceneDocument, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${draftState.id || "composer_scene"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setComposerStatus(`Exported ${draftState.id}.json`);
    renderComposerJsonPreview();
  }

  async function saveComposerSceneToRepoFile() {
    const draftState = readComposerDraftState();
    const sceneDocument = buildComposerSceneDocument(draftState);
    const json = JSON.stringify(sceneDocument, null, 2);
    const suggestedName = `${draftState.id || "composer_scene"}.json`;
    const picker = globalThis.window?.showSaveFilePicker;

    if (typeof picker === "function") {
      try {
        const handle = await picker({
          suggestedName,
          types: [
            {
              description: "JSON Scene",
              accept: {
                "application/json": [".json"],
              },
            },
          ],
        });
        const writable = await handle.createWritable();
        await writable.write(json);
        await writable.close();
        setComposerStatus(`Saved ${suggestedName}. Place it under content/scenes/ where you want it in the repo.`);
        renderComposerJsonPreview();
        return;
      } catch (error) {
        if (error?.name === "AbortError") {
          setComposerStatus("Repo save canceled.");
          return;
        }
      }
    }

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = suggestedName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setComposerStatus(`Downloaded ${suggestedName}. Move it into content/scenes/ to add it to the repo.`);
    renderComposerJsonPreview();
  }

  return {
    setComposerPanel,
    updateComposerOverlay,
    openComposerDocs,
    openComposerPreview,
    exportComposerScene,
    saveComposerSceneToRepoFile,
  };
}
