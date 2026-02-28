export function createComposerControlsUiRuntime(deps) {
  const {
    composerTabs,
    composerDocsButton,
    composerExitButton,
    composerPreviewButton,
    composerExportButton,
    composerSceneIdInput,
    composerSceneNameInput,
    composerNodeCountInput,
    composerNodeLabelsInput,
    composerPathModeSelect,
    composerPathResetButton,
    composerFrameEditToggle,
    composerFrameResetButton,
    composerFrameScaleInput,
    composerCameraPoiSelect,
    composerCameraWaypointAdd,
    composerCameraWaypointClear,
    composerCameraFlightToggle,
    composerCameraSpeedInput,
    composerCameraRadiusInput,
    composerCameraResetButton,
    composerUiRuntime,
    navUpButton,
    composerPathState,
    composerCameraFlightState,
    getComposerFrameEditMode,
    setComposerFrameEditMode,
    updateComposerPathGeometry,
    resetComposerPathPoints,
    setComposerFrameDefaults,
    updateComposerFrame,
    addComposerCameraWaypoint,
    clearComposerCameraWaypoints,
    stopComposerCameraFlightPreview,
    startComposerCameraFlightPreview,
    applyComposerFrameScaleInput,
    applyComposerCameraSpeedInput,
    applyComposerCameraRadiusInput,
    setComposerCameraDefaults,
    updateComposerCamera,
    renderComposerJsonPreview,
    isTransitionActive,
  } = deps;

  function wireListeners() {
    if (composerTabs.length) {
      composerTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          composerUiRuntime.setComposerPanel(tab.dataset.panel);
        });
      });
    }

    if (composerDocsButton) {
      composerDocsButton.addEventListener("click", () => {
        composerUiRuntime.openComposerDocs(isTransitionActive());
      });
    }

    if (composerExitButton) {
      composerExitButton.addEventListener("click", () => {
        navUpButton?.click();
      });
    }

    if (composerPreviewButton) {
      composerPreviewButton.addEventListener("click", () => {
        composerUiRuntime.openComposerPreview(isTransitionActive());
      });
    }

    if (composerExportButton) {
      composerExportButton.addEventListener("click", () => {
        composerUiRuntime.exportComposerScene();
      });
    }

    const composerInputs = [
      composerSceneIdInput,
      composerSceneNameInput,
      composerNodeCountInput,
      composerNodeLabelsInput,
    ].filter(Boolean);
    if (composerInputs.length) {
      composerInputs.forEach((input) => {
        input.addEventListener("input", () => {
          renderComposerJsonPreview();
        });
      });
    }

    if (composerPathModeSelect) {
      composerPathModeSelect.addEventListener("change", () => {
        composerPathState.interpolate = composerPathModeSelect.value;
        updateComposerPathGeometry();
        renderComposerJsonPreview();
      });
    }

    if (composerPathResetButton) {
      composerPathResetButton.addEventListener("click", () => {
        resetComposerPathPoints();
        renderComposerJsonPreview();
      });
    }

    if (composerFrameEditToggle) {
      composerFrameEditToggle.addEventListener("click", () => {
        const nextMode = !getComposerFrameEditMode();
        setComposerFrameEditMode(nextMode);
        composerFrameEditToggle.classList.toggle("is-active", nextMode);
        composerFrameEditToggle.textContent = nextMode ? "Editing Frame" : "Edit Frame";
      });
    }

    if (composerFrameResetButton) {
      composerFrameResetButton.addEventListener("click", () => {
        setComposerFrameDefaults();
        updateComposerFrame();
      });
    }

    if (composerCameraPoiSelect) {
      composerCameraPoiSelect.addEventListener("change", () => {
        composerCameraFlightState.poiMode = composerCameraPoiSelect.value;
      });
    }

    if (composerCameraWaypointAdd) {
      composerCameraWaypointAdd.addEventListener("click", () => {
        addComposerCameraWaypoint();
      });
    }

    if (composerCameraWaypointClear) {
      composerCameraWaypointClear.addEventListener("click", () => {
        clearComposerCameraWaypoints();
      });
    }

    if (composerCameraFlightToggle) {
      composerCameraFlightToggle.addEventListener("click", () => {
        if (composerCameraFlightState.preview) {
          stopComposerCameraFlightPreview();
        } else {
          startComposerCameraFlightPreview();
        }
      });
    }

    const composerFrameInputs = [composerFrameScaleInput].filter(Boolean);
    if (composerFrameInputs.length) {
      composerFrameInputs.forEach((input) => {
        input.addEventListener("input", () => {
          applyComposerFrameScaleInput();
        });
      });
    }

    const composerCameraInputs = [composerCameraSpeedInput, composerCameraRadiusInput].filter(
      Boolean
    );
    if (composerCameraInputs.length) {
      composerCameraInputs.forEach((input) => {
        input.addEventListener("input", () => {
          if (input === composerCameraSpeedInput) {
            applyComposerCameraSpeedInput();
          }
          if (input === composerCameraRadiusInput) {
            applyComposerCameraRadiusInput();
          }
        });
      });
    }

    if (composerCameraResetButton) {
      composerCameraResetButton.addEventListener("click", () => {
        setComposerCameraDefaults();
        updateComposerCamera();
      });
    }
  }

  return {
    wireListeners,
  };
}
