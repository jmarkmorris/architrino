export function createComposerControlsUiRuntime(deps) {
  const {
    composerTabs,
    composerDocsButton,
    composerExitButton,
    composerPreviewButton,
    composerExportButton,
    composerPlayToggleButton,
    composerPlayResetButton,
    composerMarkerPrevButton,
    composerMarkerNextButton,
    composerMarkerJumpSelect,
    composerPlayheadScrubInput,
    composerTimelineTrack,
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
    composerSceneDurationInput,
    composerSceneLoopInput,
    composerMarkerListInput,
    composerPauseListInput,
    composerWarpListInput,
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
    toggleComposerPlayback,
    restartComposerPlayback,
    jumpToComposerMarker,
    jumpComposerMarkerByOffset,
    scrubComposerPlayback,
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

    if (composerPlayToggleButton) {
      composerPlayToggleButton.addEventListener("click", () => {
        toggleComposerPlayback();
      });
    }

    if (composerPlayResetButton) {
      composerPlayResetButton.addEventListener("click", () => {
        restartComposerPlayback();
      });
    }

    if (composerMarkerPrevButton) {
      composerMarkerPrevButton.addEventListener("click", () => {
        jumpComposerMarkerByOffset(-1);
      });
    }

    if (composerMarkerNextButton) {
      composerMarkerNextButton.addEventListener("click", () => {
        jumpComposerMarkerByOffset(1);
      });
    }

    if (composerMarkerJumpSelect) {
      composerMarkerJumpSelect.addEventListener("change", () => {
        jumpToComposerMarker(composerMarkerJumpSelect.value, { playing: false });
      });
    }

    if (composerPlayheadScrubInput) {
      composerPlayheadScrubInput.addEventListener("input", () => {
        const fraction = Number(composerPlayheadScrubInput.value) / 1000;
        scrubComposerPlayback(fraction);
      });
    }

    if (composerTimelineTrack) {
      let timelinePointerActive = false;
      const scrubTimelineFromClientX = (clientX) => {
        const rect = composerTimelineTrack.getBoundingClientRect();
        if (!rect.width) {
          return;
        }
        const fraction = (clientX - rect.left) / rect.width;
        scrubComposerPlayback(fraction, { playing: false });
      };

      composerTimelineTrack.addEventListener("pointerdown", (event) => {
        timelinePointerActive = true;
        composerTimelineTrack.setPointerCapture?.(event.pointerId);
        scrubTimelineFromClientX(event.clientX);
        event.preventDefault();
      });

      composerTimelineTrack.addEventListener("pointermove", (event) => {
        if (!timelinePointerActive) {
          return;
        }
        scrubTimelineFromClientX(event.clientX);
      });

      const stopTimelinePointer = (event) => {
        if (!timelinePointerActive) {
          return;
        }
        timelinePointerActive = false;
        composerTimelineTrack.releasePointerCapture?.(event.pointerId);
      };

      composerTimelineTrack.addEventListener("pointerup", stopTimelinePointer);
      composerTimelineTrack.addEventListener("pointercancel", stopTimelinePointer);
    }

    const composerInputs = [
      composerSceneIdInput,
      composerSceneNameInput,
      composerNodeCountInput,
      composerNodeLabelsInput,
      composerSceneDurationInput,
      composerMarkerListInput,
      composerPauseListInput,
      composerWarpListInput,
    ].filter(Boolean);
    if (composerInputs.length) {
      composerInputs.forEach((input) => {
        input.addEventListener("input", () => {
          renderComposerJsonPreview();
        });
      });
    }

    const composerToggleInputs = [composerSceneLoopInput].filter(Boolean);
    if (composerToggleInputs.length) {
      composerToggleInputs.forEach((input) => {
        input.addEventListener("change", () => {
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
