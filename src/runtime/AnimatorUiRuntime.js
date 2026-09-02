export function createAnimatorUiRuntime(deps) {
  const {
    app,
    animatorOverlay,
    animatorTabs,
    animatorPanels,
    animatorSceneId,
    animatorPreviewSceneId,
    animatorPreviewScenePath,
    animatorDocsPath,
    levelConfigs,
    levels,
    initAnimatorCanvas,
    renderAnimatorJsonPreview,
    stopAnimatorCameraFlightPreview,
    showMarkdownPanel,
    readAnimatorDraftState,
    buildAnimatorSceneDocument,
    buildAnimatorPreviewSceneData,
    applyAnimatorSceneDocument,
    jumpToScene,
    setAnimatorStatus,
    setTopDynamicControlBarMode,
    createPrescribedSceneHandoff,
    openPrescribedSceneInBorg,
    animatorOpenBorgButton,
  } = deps;

  let animatorActivePanel = "tree";
  let embeddedAnimatorDocumentLevelId = null;

  function setAnimatorPanel(panelId) {
    if (!animatorOverlay) {
      return;
    }
    const targetId = panelId || "tree";
    const hasPanel = animatorPanels.some((panel) => panel.dataset.panel === targetId);
    const nextPanel = hasPanel ? targetId : "tree";
    animatorActivePanel = nextPanel;
    animatorTabs.forEach((tab) => {
      const isActive = tab.dataset.panel === nextPanel;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });
    animatorPanels.forEach((panel) => {
      const isActive = panel.dataset.panel === nextPanel;
      panel.classList.toggle("is-active", isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
    });
    if (nextPanel === "path") {
      deps.setAnimatorNeedsResize(true);
    }
    if (nextPanel === "export") {
      renderAnimatorJsonPreview();
    }
  }

  function updateAnimatorOverlay(currentLevel) {
    if (!animatorOverlay) {
      return;
    }
    const isAnimatorScene =
      currentLevel?.sceneId === animatorSceneId ||
      currentLevel?.sceneId === animatorPreviewSceneId;
    const isOverlayScene = isAnimatorScene;
    animatorOverlay.classList.toggle("is-open", !!isOverlayScene);
    animatorOverlay.setAttribute("aria-hidden", isOverlayScene ? "false" : "true");
    animatorOverlay.inert = !isOverlayScene;
    if (app) {
      app.classList.toggle("animator-mode", !!isOverlayScene);
    }
    setTopDynamicControlBarMode?.(isOverlayScene);
    if (isAnimatorScene) {
      initAnimatorCanvas();
      deps.setAnimatorNeedsResize(true);
      setAnimatorPanel(animatorActivePanel);
      const embeddedAnimatorDocument =
        currentLevel?.id && levelConfigs?.[currentLevel.id]?.animatorDocument
          ? levelConfigs[currentLevel.id].animatorDocument
          : null;
      if (
        embeddedAnimatorDocument &&
        embeddedAnimatorDocumentLevelId !== currentLevel.id &&
        typeof applyAnimatorSceneDocument === "function"
      ) {
        embeddedAnimatorDocumentLevelId = currentLevel.id;
        applyAnimatorSceneDocument(embeddedAnimatorDocument, {
          sourceScenePath: currentLevel.id,
        });
      } else if (!embeddedAnimatorDocument) {
        embeddedAnimatorDocumentLevelId = null;
        renderAnimatorJsonPreview();
      }
    } else {
      embeddedAnimatorDocumentLevelId = null;
      stopAnimatorCameraFlightPreview();
    }
  }

  function openAnimatorDocs(isTransitionActive) {
    if (isTransitionActive) {
      return;
    }
    showMarkdownPanel({
      name: "animator docs",
      markdownPath: animatorDocsPath,
      markdownColumns: 2,
    });
  }

  function openAnimatorPreview(isTransitionActive) {
    if (isTransitionActive) {
      return;
    }
    const draftState = readAnimatorDraftState();
    const document = buildAnimatorSceneDocument(draftState, {
      sceneId: animatorPreviewSceneId,
      sceneName: `${draftState.name} (Preview)`,
    });
    const sceneData = buildAnimatorPreviewSceneData(document, {
      sceneId: animatorPreviewSceneId,
      sceneTitle: `${draftState.name} (Preview)`,
    });
    levelConfigs[animatorPreviewScenePath] = sceneData;
    levels.delete(animatorPreviewScenePath);
    animatorActivePanel = "preview";
    setAnimatorPanel("preview");
    setAnimatorStatus(`Previewing "${draftState.name}". Use Back to return.`);
    jumpToScene(animatorPreviewScenePath, {
      mode: "jump",
      startScale: 0.6,
      duration: 700,
    });
  }

  function exportAnimatorScene() {
    const draftState = readAnimatorDraftState();
    const sceneDocument = buildAnimatorSceneDocument(draftState);
    const json = JSON.stringify(sceneDocument, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${draftState.id || "animator_scene"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setAnimatorStatus(`Exported ${draftState.id}.json`);
    renderAnimatorJsonPreview();
  }

  async function openAnimatorSceneInBorg() {
    if (
      typeof createPrescribedSceneHandoff !== "function" ||
      typeof openPrescribedSceneInBorg !== "function"
    ) {
      setAnimatorStatus("Open in Borg is unavailable in this Animator build.");
      return;
    }
    const draftState = readAnimatorDraftState();
    const sceneDocument = buildAnimatorSceneDocument(draftState);
    if (animatorOpenBorgButton) {
      animatorOpenBorgButton.disabled = true;
      animatorOpenBorgButton.setAttribute("aria-busy", "true");
    }
    try {
      setAnimatorStatus("Validating and sealing the prescribed scene for Borg...");
      const handoff = await createPrescribedSceneHandoff(sceneDocument);
      await openPrescribedSceneInBorg(handoff);
      setAnimatorStatus(
        `Opened sealed prescribed scene in Borg (${handoff.recordSha256.slice(0, 12)}). Authored motion remains display-only.`,
      );
    } catch (error) {
      setAnimatorStatus(`Open in Borg rejected: ${error?.message ?? String(error)}`);
    } finally {
      if (animatorOpenBorgButton) {
        animatorOpenBorgButton.disabled = false;
        animatorOpenBorgButton.removeAttribute("aria-busy");
      }
    }
  }

  async function saveAnimatorSceneToRepoFile() {
    const draftState = readAnimatorDraftState();
    const sceneDocument = buildAnimatorSceneDocument(draftState);
    const json = JSON.stringify(sceneDocument, null, 2);
    const suggestedName = `${draftState.id || "animator_scene"}.json`;
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
        setAnimatorStatus(`Saved ${suggestedName}. Place it under content/scenes/ where you want it in the repo.`);
        renderAnimatorJsonPreview();
        return;
      } catch (error) {
        if (error?.name === "AbortError") {
          setAnimatorStatus("Repo save canceled.");
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
    setAnimatorStatus(`Downloaded ${suggestedName}. Move it into content/scenes/ to add it to the repo.`);
    renderAnimatorJsonPreview();
  }

  return {
    setAnimatorPanel,
    updateAnimatorOverlay,
    openAnimatorDocs,
    openAnimatorPreview,
    exportAnimatorScene,
    openAnimatorSceneInBorg,
    saveAnimatorSceneToRepoFile,
  };
}
