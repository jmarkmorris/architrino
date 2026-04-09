export const COMPOSER_LIBRARY_STORAGE_KEY = "architrino.composer.library.v1";
export const COMPOSER_MEDIA_ASSET_DIRECTORIES = Object.freeze({
  image: "content/assets/composer/images/",
  video: "content/assets/composer/video/",
  audio: "content/assets/composer/audio/",
});
export const COMPOSER_SUPPORTED_MEDIA_EXTENSIONS = Object.freeze({
  image: Object.freeze(["jpg", "jpeg", "png", "svg"]),
  video: Object.freeze(["mp4", "mov"]),
  audio: Object.freeze(["mp3"]),
});
export const DEFAULT_COMPOSER_ROOT_LAYOUT_MARGIN_PX = Object.freeze({ x: 160, y: 140 });

function getElementById(documentLike = null, id = "") {
  return typeof documentLike?.getElementById === "function" ? documentLike.getElementById(id) : null;
}

export function getComposerDomElements(documentLike = globalThis.document) {
  const composerOverlay = getElementById(documentLike, "composer-overlay");
  const composerCanvas = getElementById(documentLike, "composer-canvas");
  const composerHudLabelsToggle = getElementById(documentLike, "composer-hud-labels-toggle");
  const composerHudPathsToggle = getElementById(documentLike, "composer-hud-paths-toggle");
  const composerHudHistoryToggle = getElementById(documentLike, "composer-hud-history-toggle");
  const composerHudEnvelopesToggle = getElementById(documentLike, "composer-hud-envelopes-toggle");
  const composerHudObserverToggle = getElementById(documentLike, "composer-hud-observer-toggle");

  return {
    composerOverlay,
    composerViewDesignButton: getElementById(documentLike, "composer-view-design-button"),
    composerViewObserverButton: getElementById(documentLike, "composer-view-observer-button"),
    composerSceneButton: getElementById(documentLike, "composer-scene-button"),
    composerClearButton: getElementById(documentLike, "composer-clear-button"),
    composerSaveButton: getElementById(documentLike, "composer-save-button"),
    composerDocsButton: getElementById(documentLike, "composer-docs-button"),
    composerExitButton: getElementById(documentLike, "composer-exit-button"),
    composerTabs:
      composerOverlay && typeof composerOverlay.querySelectorAll === "function"
        ? Array.from(composerOverlay.querySelectorAll(".composer-tab"))
        : [],
    composerPanels:
      composerOverlay && typeof composerOverlay.querySelectorAll === "function"
        ? Array.from(composerOverlay.querySelectorAll(".composer-panel"))
        : [],
    composerSceneIdInput: getElementById(documentLike, "composer-scene-id"),
    composerSceneNameInput: getElementById(documentLike, "composer-scene-name"),
    composerAssemblyList: getElementById(documentLike, "composer-assembly-list"),
    composerAssemblyDetail: getElementById(documentLike, "composer-assembly-detail"),
    composerAssemblyAddButton: getElementById(documentLike, "composer-assembly-add"),
    composerPreviewButton: getElementById(documentLike, "composer-preview-button"),
    composerExportButton: getElementById(documentLike, "composer-export-button"),
    composerLibrarySaveButton: getElementById(documentLike, "composer-library-save"),
    composerRepoSaveButton: getElementById(documentLike, "composer-repo-save-button"),
    composerLibrarySelect: getElementById(documentLike, "composer-library-select"),
    composerLibraryLoadButton: getElementById(documentLike, "composer-library-load"),
    composerLibraryDeleteButton: getElementById(documentLike, "composer-library-delete"),
    composerLibraryStatus: getElementById(documentLike, "composer-library-status"),
    composerPlayToggleButton: getElementById(documentLike, "composer-play-toggle"),
    composerPlayResetButton: getElementById(documentLike, "composer-play-reset"),
    composerMarkerPrevButton: getElementById(documentLike, "composer-marker-prev"),
    composerMarkerNextButton: getElementById(documentLike, "composer-marker-next"),
    composerMarkerJumpSelect: getElementById(documentLike, "composer-marker-jump"),
    composerPlayheadScrubInput: getElementById(documentLike, "composer-playhead-scrub"),
    composerStatus: getElementById(documentLike, "composer-status"),
    composerJsonPreview: getElementById(documentLike, "composer-json-preview"),
    composerCanvas,
    composerCanvasWrap: composerCanvas?.parentElement ?? null,
    composerViewportOverlays: getElementById(documentLike, "composer-viewport-overlays"),
    composerAssemblyMenu: getElementById(documentLike, "composer-assembly-menu"),
    composerHudLabelsToggle,
    composerHudPathsToggle,
    composerHudHistoryToggle,
    composerHudEnvelopesToggle,
    composerHudObserverToggle,
    composerHudViewportToggleBindings: [
      {
        button: composerHudLabelsToggle,
        key: "showLabels",
        label: "Observer Labels",
      },
      {
        button: composerHudPathsToggle,
        key: "showTransportPath",
        label: "Transport Paths",
      },
      {
        button: composerHudHistoryToggle,
        key: "showHistoryTraces",
        label: "History Traces",
      },
      {
        button: composerHudEnvelopesToggle,
        key: "showEnvelopes",
        label: "Envelopes",
      },
      {
        button: composerHudObserverToggle,
        key: "showCameraGuides",
        label: "Observer Guides",
      },
    ],
    composerPathModeSelect: getElementById(documentLike, "composer-path-mode"),
    composerPathResetButton: getElementById(documentLike, "composer-path-reset"),
    composerFrameResetButton: getElementById(documentLike, "composer-frame-reset"),
    composerFrameScaleInput: getElementById(documentLike, "composer-frame-scale"),
    composerFrameScaleLabel: getElementById(documentLike, "composer-frame-scale-label"),
    composerCameraSpeedInput: getElementById(documentLike, "composer-camera-speed"),
    composerCameraSpeedLabel: getElementById(documentLike, "composer-camera-speed-label"),
    composerCameraRadiusInput: getElementById(documentLike, "composer-camera-radius"),
    composerCameraRadiusLabel: getElementById(documentLike, "composer-camera-radius-label"),
    composerCameraResetButton: getElementById(documentLike, "composer-camera-reset"),
    composerCameraPoiSelect: getElementById(documentLike, "composer-camera-poi"),
    composerCameraWaypointAdd: getElementById(documentLike, "composer-camera-waypoint-add"),
    composerCameraWaypointClear: getElementById(documentLike, "composer-camera-waypoint-clear"),
    composerCameraWaypointCount: getElementById(documentLike, "composer-camera-waypoint-count"),
    composerCameraPoiStatus: getElementById(documentLike, "composer-camera-poi-status"),
    composerCameraFlightToggle: getElementById(documentLike, "composer-camera-flight-toggle"),
    composerSceneDurationInput: getElementById(documentLike, "composer-scene-duration"),
    composerSceneLoopInput: getElementById(documentLike, "composer-scene-loop"),
    composerMarkerListInput: getElementById(documentLike, "composer-marker-list"),
    composerPauseListInput: getElementById(documentLike, "composer-pause-list"),
    composerWarpListInput: getElementById(documentLike, "composer-warp-list"),
    composerTransferListInput: getElementById(documentLike, "composer-transfer-list"),
    composerMarkerStatus: getElementById(documentLike, "composer-marker-status"),
    composerPauseStatus: getElementById(documentLike, "composer-pause-status"),
    composerWarpStatus: getElementById(documentLike, "composer-warp-status"),
    composerTransferStatus: getElementById(documentLike, "composer-transfer-status"),
    composerTimelineSummary: getElementById(documentLike, "composer-timeline-summary"),
    composerTimelineActive: getElementById(documentLike, "composer-timeline-active"),
    composerTimelineTrack: getElementById(documentLike, "composer-timeline-track"),
    composerTimelineWarps: getElementById(documentLike, "composer-timeline-warps"),
    composerTimelinePauses: getElementById(documentLike, "composer-timeline-pauses"),
    composerTimelineMarkers: getElementById(documentLike, "composer-timeline-markers"),
    composerTimelinePlayhead: getElementById(documentLike, "composer-timeline-playhead"),
  };
}
