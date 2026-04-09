export function createPdgviewControlsUiRuntime(deps) {
  const {
    pdgviewTabs,
    pdgviewClearButton,
    pdgviewDocsButton,
    pdgviewExitButton,
    pdgviewPreviewButton,
    pdgviewViewDesignButton,
    pdgviewViewAuthoredButton,
    pdgviewExportButton,
    pdgviewLibrarySaveButton,
    pdgviewRepoSaveButton,
    pdgviewLibrarySelect,
    pdgviewLibraryLoadButton,
    pdgviewLibraryDeleteButton,
    pdgviewPlayToggleButton,
    pdgviewPlayResetButton,
    pdgviewMarkerPrevButton,
    pdgviewMarkerNextButton,
    pdgviewMarkerJumpSelect,
    pdgviewPlayheadScrubInput,
    pdgviewTimelineTrack,
    pdgviewSceneIdInput,
    pdgviewSceneNameInput,
    pdgviewPathModeSelect,
    pdgviewPathResetButton,
    pdgviewFrameResetButton,
    pdgviewFrameScaleInput,
    pdgviewCameraPoiSelect,
    pdgviewCameraWaypointAdd,
    pdgviewCameraWaypointClear,
    pdgviewCameraFlightToggle,
    pdgviewSceneDurationInput,
    pdgviewSceneLoopInput,
    pdgviewMarkerListInput,
    pdgviewPauseListInput,
    pdgviewWarpListInput,
    pdgviewTransferListInput,
    pdgviewCameraSpeedInput,
    pdgviewCameraRadiusInput,
    pdgviewCameraResetButton,
    pdgviewUiRuntime,
    pdgviewPathState,
    pdgviewCameraFlightState,
    updatePdgviewPathGeometry,
    resetPdgviewPathPoints,
    setPdgviewFrameDefaults,
    updatePdgviewFrame,
    addPdgviewCameraWaypoint,
    clearPdgviewCameraWaypoints,
    stopPdgviewCameraFlightPreview,
    startPdgviewCameraFlightPreview,
    setPdgviewViewportCameraSource,
    applyPdgviewFrameScaleInput,
    applyPdgviewCameraSpeedInput,
    applyPdgviewCameraRadiusInput,
    setPdgviewCameraDefaults,
    updatePdgviewCamera,
    updatePdgviewCameraPoiStatus,
    persistPdgviewPathStateToSelectedAssembly,
    togglePdgviewPlayback,
    restartPdgviewPlayback,
    jumpToPdgviewMarker,
    jumpPdgviewMarkerByOffset,
    scrubPdgviewPlayback,
    renderPdgviewJsonPreview,
    clearPdgviewScene,
    savePdgviewSceneToLibrary,
    loadPdgviewSceneFromLibrary,
    deletePdgviewSceneFromLibrary,
    isTransitionActive,
    exitPdgview,
  } = deps;

  function wireListeners() {
    if (pdgviewTabs.length) {
      pdgviewTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          pdgviewUiRuntime.setPdgviewPanel(tab.dataset.panel);
        });
      });
    }

    if (pdgviewDocsButton) {
      pdgviewDocsButton.addEventListener("click", () => {
        pdgviewUiRuntime.openPdgviewDocs(isTransitionActive());
      });
    }

    if (pdgviewClearButton) {
      pdgviewClearButton.addEventListener("click", () => {
        clearPdgviewScene();
      });
    }

    if (pdgviewExitButton) {
      pdgviewExitButton.addEventListener("click", () => {
        exitPdgview?.();
      });
    }

    if (pdgviewPreviewButton) {
      pdgviewPreviewButton.addEventListener("click", () => {
        pdgviewUiRuntime.openPdgviewPreview(isTransitionActive());
      });
    }

    if (pdgviewViewDesignButton) {
      pdgviewViewDesignButton.addEventListener("click", () => {
        if (pdgviewCameraFlightState.preview) {
          stopPdgviewCameraFlightPreview();
        }
        setPdgviewViewportCameraSource("design");
      });
    }

    if (pdgviewViewAuthoredButton) {
      pdgviewViewAuthoredButton.addEventListener("click", () => {
        if (pdgviewCameraFlightState.preview) {
          stopPdgviewCameraFlightPreview();
        }
        setPdgviewViewportCameraSource("authored");
      });
    }

    if (pdgviewExportButton) {
      pdgviewExportButton.addEventListener("click", () => {
        pdgviewUiRuntime.exportPdgviewScene();
      });
    }

    if (pdgviewRepoSaveButton) {
      pdgviewRepoSaveButton.addEventListener("click", () => {
        pdgviewUiRuntime.savePdgviewSceneToRepoFile();
      });
    }

    if (pdgviewLibrarySaveButton) {
      pdgviewLibrarySaveButton.addEventListener("click", () => {
        savePdgviewSceneToLibrary();
      });
    }

    if (pdgviewLibraryLoadButton) {
      pdgviewLibraryLoadButton.addEventListener("click", () => {
        loadPdgviewSceneFromLibrary(pdgviewLibrarySelect?.value);
      });
    }

    if (pdgviewLibraryDeleteButton) {
      pdgviewLibraryDeleteButton.addEventListener("click", () => {
        deletePdgviewSceneFromLibrary(pdgviewLibrarySelect?.value);
      });
    }

    if (pdgviewLibrarySelect) {
      pdgviewLibrarySelect.addEventListener("dblclick", () => {
        loadPdgviewSceneFromLibrary(pdgviewLibrarySelect.value);
      });
    }

    if (pdgviewPlayToggleButton) {
      pdgviewPlayToggleButton.addEventListener("click", () => {
        togglePdgviewPlayback();
      });
    }

    if (pdgviewPlayResetButton) {
      pdgviewPlayResetButton.addEventListener("click", () => {
        restartPdgviewPlayback();
      });
    }

    if (pdgviewMarkerPrevButton) {
      pdgviewMarkerPrevButton.addEventListener("click", () => {
        jumpPdgviewMarkerByOffset(-1);
      });
    }

    if (pdgviewMarkerNextButton) {
      pdgviewMarkerNextButton.addEventListener("click", () => {
        jumpPdgviewMarkerByOffset(1);
      });
    }

    if (pdgviewMarkerJumpSelect) {
      pdgviewMarkerJumpSelect.addEventListener("change", () => {
        jumpToPdgviewMarker(pdgviewMarkerJumpSelect.value, { playing: false });
      });
    }

    if (pdgviewPlayheadScrubInput) {
      pdgviewPlayheadScrubInput.addEventListener("input", () => {
        const fraction = Number(pdgviewPlayheadScrubInput.value) / 1000;
        scrubPdgviewPlayback(fraction);
      });
    }

    if (pdgviewTimelineTrack) {
      let timelinePointerActive = false;
      const scrubTimelineFromClientX = (clientX) => {
        const rect = pdgviewTimelineTrack.getBoundingClientRect();
        if (!rect.width) {
          return;
        }
        const fraction = (clientX - rect.left) / rect.width;
        scrubPdgviewPlayback(fraction, { playing: false });
      };

      pdgviewTimelineTrack.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) {
          return;
        }
        timelinePointerActive = true;
        pdgviewTimelineTrack.setPointerCapture?.(event.pointerId);
        scrubTimelineFromClientX(event.clientX);
        event.preventDefault();
      });

      pdgviewTimelineTrack.addEventListener("pointermove", (event) => {
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
        pdgviewTimelineTrack.releasePointerCapture?.(event.pointerId);
      };

      pdgviewTimelineTrack.addEventListener("pointerup", stopTimelinePointer);
      pdgviewTimelineTrack.addEventListener("pointercancel", stopTimelinePointer);
    }

    const pdgviewInputs = [
      pdgviewSceneIdInput,
      pdgviewSceneNameInput,
      pdgviewSceneDurationInput,
      pdgviewMarkerListInput,
      pdgviewPauseListInput,
      pdgviewWarpListInput,
      pdgviewTransferListInput,
    ].filter(Boolean);
    if (pdgviewInputs.length) {
      pdgviewInputs.forEach((input) => {
        input.addEventListener("input", () => {
          renderPdgviewJsonPreview();
        });
      });
    }

    const pdgviewToggleInputs = [pdgviewSceneLoopInput].filter(Boolean);
    if (pdgviewToggleInputs.length) {
      pdgviewToggleInputs.forEach((input) => {
        input.addEventListener("change", () => {
          renderPdgviewJsonPreview();
        });
      });
    }

    if (pdgviewPathModeSelect) {
      pdgviewPathModeSelect.addEventListener("change", () => {
        pdgviewPathState.interpolate = pdgviewPathModeSelect.value;
        persistPdgviewPathStateToSelectedAssembly();
        updatePdgviewPathGeometry();
        renderPdgviewJsonPreview();
      });
    }

    if (pdgviewPathResetButton) {
      pdgviewPathResetButton.addEventListener("click", () => {
        resetPdgviewPathPoints();
        renderPdgviewJsonPreview();
      });
    }

    if (pdgviewFrameResetButton) {
      pdgviewFrameResetButton.addEventListener("click", () => {
        setPdgviewFrameDefaults();
        updatePdgviewFrame();
      });
    }

    if (pdgviewCameraPoiSelect) {
      pdgviewCameraPoiSelect.addEventListener("change", () => {
        pdgviewCameraFlightState.poiMode = pdgviewCameraPoiSelect.value;
        updatePdgviewCameraPoiStatus();
      });
    }

    if (pdgviewCameraWaypointAdd) {
      pdgviewCameraWaypointAdd.addEventListener("click", () => {
        addPdgviewCameraWaypoint();
      });
    }

    if (pdgviewCameraWaypointClear) {
      pdgviewCameraWaypointClear.addEventListener("click", () => {
        clearPdgviewCameraWaypoints();
      });
    }

    if (pdgviewCameraFlightToggle) {
      pdgviewCameraFlightToggle.addEventListener("click", () => {
        if (pdgviewCameraFlightState.preview) {
          stopPdgviewCameraFlightPreview();
        } else {
          startPdgviewCameraFlightPreview();
        }
      });
    }

    const pdgviewFrameInputs = [pdgviewFrameScaleInput].filter(Boolean);
    if (pdgviewFrameInputs.length) {
      pdgviewFrameInputs.forEach((input) => {
        input.addEventListener("input", () => {
          applyPdgviewFrameScaleInput();
        });
      });
    }

    const pdgviewCameraInputs = [pdgviewCameraSpeedInput, pdgviewCameraRadiusInput].filter(
      Boolean
    );
    if (pdgviewCameraInputs.length) {
      pdgviewCameraInputs.forEach((input) => {
        input.addEventListener("input", () => {
          if (input === pdgviewCameraSpeedInput) {
            applyPdgviewCameraSpeedInput();
          }
          if (input === pdgviewCameraRadiusInput) {
            applyPdgviewCameraRadiusInput();
          }
        });
      });
    }

    if (pdgviewCameraResetButton) {
      pdgviewCameraResetButton.addEventListener("click", () => {
        setPdgviewCameraDefaults();
        updatePdgviewCamera();
      });
    }
  }

  return {
    wireListeners,
  };
}
