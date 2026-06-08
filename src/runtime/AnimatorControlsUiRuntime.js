export function createAnimatorControlsUiRuntime(deps) {
  const {
    animatorTabs,
    animatorClearButton,
    animatorDocsButton,
    animatorExitButton,
    animatorPreviewButton,
    animatorViewDesignButton,
    animatorViewAuthoredButton,
    animatorViewPlanarButton,
    animatorExportButton,
    animatorLibrarySaveButton,
    animatorRepoSaveButton,
    animatorLibrarySelect,
    animatorLibraryLoadButton,
    animatorLibraryDeleteButton,
    animatorPlayToggleButton,
    animatorPlayResetButton,
    animatorMarkerPrevButton,
    animatorMarkerNextButton,
    animatorMarkerJumpSelect,
    animatorPlayheadScrubInput,
    animatorTimelineTrack,
    animatorSceneIdInput,
    animatorSceneNameInput,
    animatorPathModeSelect,
    animatorPathResetButton,
    animatorFrameResetButton,
    animatorFrameScaleInput,
    animatorCameraPoiSelect,
    animatorCameraWaypointAdd,
    animatorCameraWaypointClear,
    animatorCameraFlightToggle,
    animatorSceneDurationInput,
    animatorSceneLoopInput,
    animatorMarkerListInput,
    animatorPauseListInput,
    animatorWarpListInput,
    animatorTransferListInput,
    animatorCameraSpeedInput,
    animatorCameraRadiusInput,
    animatorCameraResetButton,
    animatorUiRuntime,
    animatorPathState,
    animatorCameraFlightState,
    updateAnimatorPathGeometry,
    resetAnimatorPathPoints,
    setAnimatorFrameDefaults,
    updateAnimatorFrame,
    addAnimatorCameraWaypoint,
    clearAnimatorCameraWaypoints,
    stopAnimatorCameraFlightPreview,
    startAnimatorCameraFlightPreview,
    setAnimatorViewportCameraSource,
    setAnimatorViewportProjection,
    applyAnimatorFrameScaleInput,
    applyAnimatorCameraSpeedInput,
    applyAnimatorCameraRadiusInput,
    setAnimatorCameraDefaults,
    updateAnimatorCamera,
    updateAnimatorCameraPoiStatus,
    persistAnimatorPathStateToSelectedAssembly,
    toggleAnimatorPlayback,
    restartAnimatorPlayback,
    jumpToAnimatorMarker,
    jumpAnimatorMarkerByOffset,
    scrubAnimatorPlayback,
    renderAnimatorJsonPreview,
    clearAnimatorScene,
    saveAnimatorSceneToLibrary,
    loadAnimatorSceneFromLibrary,
    deleteAnimatorSceneFromLibrary,
    isTransitionActive,
    exitAnimator,
  } = deps;

  function wireListeners() {
    if (animatorTabs.length) {
      animatorTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          animatorUiRuntime.setAnimatorPanel(tab.dataset.panel);
        });
      });
    }

    if (animatorDocsButton) {
      animatorDocsButton.addEventListener("click", () => {
        animatorUiRuntime.openAnimatorDocs(isTransitionActive());
      });
    }

    if (animatorClearButton) {
      animatorClearButton.addEventListener("click", () => {
        clearAnimatorScene();
      });
    }

    if (animatorExitButton) {
      animatorExitButton.addEventListener("click", () => {
        exitAnimator?.();
      });
    }

    if (animatorPreviewButton) {
      animatorPreviewButton.addEventListener("click", () => {
        animatorUiRuntime.openAnimatorPreview(isTransitionActive());
      });
    }

    if (animatorViewDesignButton) {
      animatorViewDesignButton.addEventListener("click", () => {
        if (animatorCameraFlightState.preview) {
          stopAnimatorCameraFlightPreview();
        }
        setAnimatorViewportCameraSource("design");
      });
    }

    if (animatorViewAuthoredButton) {
      animatorViewAuthoredButton.addEventListener("click", () => {
        if (animatorCameraFlightState.preview) {
          stopAnimatorCameraFlightPreview();
        }
        setAnimatorViewportCameraSource("authored");
      });
    }

    if (animatorViewPlanarButton) {
      animatorViewPlanarButton.addEventListener("click", () => {
        if (animatorCameraFlightState.preview) {
          stopAnimatorCameraFlightPreview();
        }
        setAnimatorViewportProjection?.("planar-2d");
      });
    }

    if (animatorExportButton) {
      animatorExportButton.addEventListener("click", () => {
        animatorUiRuntime.exportAnimatorScene();
      });
    }

    if (animatorRepoSaveButton) {
      animatorRepoSaveButton.addEventListener("click", () => {
        animatorUiRuntime.saveAnimatorSceneToRepoFile();
      });
    }

    if (animatorLibrarySaveButton) {
      animatorLibrarySaveButton.addEventListener("click", () => {
        saveAnimatorSceneToLibrary();
      });
    }

    if (animatorLibraryLoadButton) {
      animatorLibraryLoadButton.addEventListener("click", () => {
        loadAnimatorSceneFromLibrary(animatorLibrarySelect?.value);
      });
    }

    if (animatorLibraryDeleteButton) {
      animatorLibraryDeleteButton.addEventListener("click", () => {
        deleteAnimatorSceneFromLibrary(animatorLibrarySelect?.value);
      });
    }

    if (animatorLibrarySelect) {
      animatorLibrarySelect.addEventListener("dblclick", () => {
        loadAnimatorSceneFromLibrary(animatorLibrarySelect.value);
      });
    }

    if (animatorPlayToggleButton) {
      animatorPlayToggleButton.addEventListener("click", () => {
        toggleAnimatorPlayback();
      });
    }

    if (animatorPlayResetButton) {
      animatorPlayResetButton.addEventListener("click", () => {
        restartAnimatorPlayback();
      });
    }

    if (animatorMarkerPrevButton) {
      animatorMarkerPrevButton.addEventListener("click", () => {
        jumpAnimatorMarkerByOffset(-1);
      });
    }

    if (animatorMarkerNextButton) {
      animatorMarkerNextButton.addEventListener("click", () => {
        jumpAnimatorMarkerByOffset(1);
      });
    }

    if (animatorMarkerJumpSelect) {
      animatorMarkerJumpSelect.addEventListener("change", () => {
        jumpToAnimatorMarker(animatorMarkerJumpSelect.value, { playing: false });
      });
    }

    if (animatorPlayheadScrubInput) {
      animatorPlayheadScrubInput.addEventListener("input", () => {
        const fraction = Number(animatorPlayheadScrubInput.value) / 1000;
        scrubAnimatorPlayback(fraction);
      });
    }

    if (animatorTimelineTrack) {
      let timelinePointerActive = false;
      const scrubTimelineFromClientX = (clientX) => {
        const rect = animatorTimelineTrack.getBoundingClientRect();
        if (!rect.width) {
          return;
        }
        const fraction = (clientX - rect.left) / rect.width;
        scrubAnimatorPlayback(fraction, { playing: false });
      };

      animatorTimelineTrack.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) {
          return;
        }
        timelinePointerActive = true;
        animatorTimelineTrack.setPointerCapture?.(event.pointerId);
        scrubTimelineFromClientX(event.clientX);
        event.preventDefault();
      });

      animatorTimelineTrack.addEventListener("pointermove", (event) => {
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
        animatorTimelineTrack.releasePointerCapture?.(event.pointerId);
      };

      animatorTimelineTrack.addEventListener("pointerup", stopTimelinePointer);
      animatorTimelineTrack.addEventListener("pointercancel", stopTimelinePointer);
    }

    const animatorInputs = [
      animatorSceneIdInput,
      animatorSceneNameInput,
      animatorSceneDurationInput,
      animatorMarkerListInput,
      animatorPauseListInput,
      animatorWarpListInput,
      animatorTransferListInput,
    ].filter(Boolean);
    if (animatorInputs.length) {
      animatorInputs.forEach((input) => {
        input.addEventListener("input", () => {
          renderAnimatorJsonPreview();
        });
      });
    }

    const animatorToggleInputs = [animatorSceneLoopInput].filter(Boolean);
    if (animatorToggleInputs.length) {
      animatorToggleInputs.forEach((input) => {
        input.addEventListener("change", () => {
          renderAnimatorJsonPreview();
        });
      });
    }

    if (animatorPathModeSelect) {
      animatorPathModeSelect.addEventListener("change", () => {
        animatorPathState.interpolate =
          animatorPathModeSelect.value === "linear" ? "linear" : "spline";
        persistAnimatorPathStateToSelectedAssembly();
        updateAnimatorPathGeometry();
        renderAnimatorJsonPreview();
      });
    }

    if (animatorPathResetButton) {
      animatorPathResetButton.addEventListener("click", () => {
        resetAnimatorPathPoints();
        renderAnimatorJsonPreview();
      });
    }

    if (animatorFrameResetButton) {
      animatorFrameResetButton.addEventListener("click", () => {
        setAnimatorFrameDefaults();
        updateAnimatorFrame();
      });
    }

    if (animatorCameraPoiSelect) {
      animatorCameraPoiSelect.addEventListener("change", () => {
        animatorCameraFlightState.poiMode = animatorCameraPoiSelect.value;
        updateAnimatorCameraPoiStatus();
      });
    }

    if (animatorCameraWaypointAdd) {
      animatorCameraWaypointAdd.addEventListener("click", () => {
        addAnimatorCameraWaypoint();
      });
    }

    if (animatorCameraWaypointClear) {
      animatorCameraWaypointClear.addEventListener("click", () => {
        clearAnimatorCameraWaypoints();
      });
    }

    if (animatorCameraFlightToggle) {
      animatorCameraFlightToggle.addEventListener("click", () => {
        if (animatorCameraFlightState.preview) {
          stopAnimatorCameraFlightPreview();
        } else {
          startAnimatorCameraFlightPreview();
        }
      });
    }

    const animatorFrameInputs = [animatorFrameScaleInput].filter(Boolean);
    if (animatorFrameInputs.length) {
      animatorFrameInputs.forEach((input) => {
        input.addEventListener("input", () => {
          applyAnimatorFrameScaleInput();
        });
      });
    }

    const animatorCameraInputs = [animatorCameraSpeedInput, animatorCameraRadiusInput].filter(
      Boolean
    );
    if (animatorCameraInputs.length) {
      animatorCameraInputs.forEach((input) => {
        input.addEventListener("input", () => {
          if (input === animatorCameraSpeedInput) {
            applyAnimatorCameraSpeedInput();
          }
          if (input === animatorCameraRadiusInput) {
            applyAnimatorCameraRadiusInput();
          }
        });
      });
    }

    if (animatorCameraResetButton) {
      animatorCameraResetButton.addEventListener("click", () => {
        setAnimatorCameraDefaults();
        updateAnimatorCamera();
      });
    }
  }

  return {
    wireListeners,
  };
}
