export function createPdgviewUiRuntime(deps) {
  const {
    app,
    pdgviewOverlay,
    pdgviewTabs,
    pdgviewPanels,
    pdgviewSceneId,
    pdgviewPreviewSceneId,
    pdgviewPreviewScenePath,
    pdgviewDocsPath,
    levelConfigs,
    levels,
    initPdgviewCanvas,
    renderPdgviewJsonPreview,
    stopPdgviewCameraFlightPreview,
    showMarkdownPanel,
    readPdgviewDraftState,
    buildPdgviewSceneDocument,
    buildPdgviewPreviewSceneData,
    jumpToScene,
    setPdgviewStatus,
  } = deps;

  let pdgviewActivePanel = "tree";

  function setPdgviewPanel(panelId) {
    if (!pdgviewOverlay) {
      return;
    }
    const targetId = panelId || "tree";
    const hasPanel = pdgviewPanels.some((panel) => panel.dataset.panel === targetId);
    const nextPanel = hasPanel ? targetId : "tree";
    pdgviewActivePanel = nextPanel;
    pdgviewTabs.forEach((tab) => {
      const isActive = tab.dataset.panel === nextPanel;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });
    pdgviewPanels.forEach((panel) => {
      const isActive = panel.dataset.panel === nextPanel;
      panel.classList.toggle("is-active", isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
    });
    if (nextPanel === "path") {
      deps.setPdgviewNeedsResize(true);
    }
    if (nextPanel === "export") {
      renderPdgviewJsonPreview();
    }
  }

  function updatePdgviewOverlay(currentLevel) {
    if (!pdgviewOverlay) {
      return;
    }
    const isPdgviewScene =
      currentLevel?.sceneId === pdgviewSceneId ||
      currentLevel?.sceneId === pdgviewPreviewSceneId;
    const isOverlayScene = isPdgviewScene;
    pdgviewOverlay.classList.toggle("is-open", !!isOverlayScene);
    pdgviewOverlay.setAttribute("aria-hidden", isOverlayScene ? "false" : "true");
    pdgviewOverlay.inert = !isOverlayScene;
    if (app) {
      app.classList.toggle("pdgview-mode", !!isOverlayScene);
    }
    if (isPdgviewScene) {
      initPdgviewCanvas();
      deps.setPdgviewNeedsResize(true);
      setPdgviewPanel(pdgviewActivePanel);
      renderPdgviewJsonPreview();
    } else {
      stopPdgviewCameraFlightPreview();
    }
  }

  function openPdgviewDocs(isTransitionActive) {
    if (isTransitionActive) {
      return;
    }
    showMarkdownPanel({
      name: "pdgview docs",
      markdownPath: pdgviewDocsPath,
      markdownColumns: 2,
    });
  }

  function openPdgviewPreview(isTransitionActive) {
    if (isTransitionActive) {
      return;
    }
    const draftState = readPdgviewDraftState();
    const document = buildPdgviewSceneDocument(draftState, {
      sceneId: pdgviewPreviewSceneId,
      sceneName: `${draftState.name} (Preview)`,
    });
    const sceneData = buildPdgviewPreviewSceneData(document, {
      sceneId: pdgviewPreviewSceneId,
      sceneTitle: `${draftState.name} (Preview)`,
    });
    levelConfigs[pdgviewPreviewScenePath] = sceneData;
    levels.delete(pdgviewPreviewScenePath);
    pdgviewActivePanel = "preview";
    setPdgviewPanel("preview");
    setPdgviewStatus(`Previewing "${draftState.name}". Use Back to return.`);
    jumpToScene(pdgviewPreviewScenePath, {
      mode: "jump",
      startScale: 0.6,
      duration: 700,
    });
  }

  function exportPdgviewScene() {
    const draftState = readPdgviewDraftState();
    const sceneDocument = buildPdgviewSceneDocument(draftState);
    const json = JSON.stringify(sceneDocument, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${draftState.id || "pdgview_scene"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setPdgviewStatus(`Exported ${draftState.id}.json`);
    renderPdgviewJsonPreview();
  }

  async function savePdgviewSceneToRepoFile() {
    const draftState = readPdgviewDraftState();
    const sceneDocument = buildPdgviewSceneDocument(draftState);
    const json = JSON.stringify(sceneDocument, null, 2);
    const suggestedName = `${draftState.id || "pdgview_scene"}.json`;
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
        setPdgviewStatus(`Saved ${suggestedName}. Place it under content/scenes/ where you want it in the repo.`);
        renderPdgviewJsonPreview();
        return;
      } catch (error) {
        if (error?.name === "AbortError") {
          setPdgviewStatus("Repo save canceled.");
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
    setPdgviewStatus(`Downloaded ${suggestedName}. Move it into content/scenes/ to add it to the repo.`);
    renderPdgviewJsonPreview();
  }

  return {
    setPdgviewPanel,
    updatePdgviewOverlay,
    openPdgviewDocs,
    openPdgviewPreview,
    exportPdgviewScene,
    savePdgviewSceneToRepoFile,
  };
}
