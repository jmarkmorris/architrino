export const ANIMATOR_LIBRARY_STORAGE_KEY = "architrino.animator.library.v1";
export const ANIMATOR_MEDIA_ASSET_DIRECTORIES = Object.freeze({
  image: "content/assets/animator/images/",
  video: "content/assets/animator/video/",
  audio: "content/assets/animator/audio/",
});
export const ANIMATOR_SUPPORTED_MEDIA_EXTENSIONS = Object.freeze({
  image: Object.freeze(["jpg", "jpeg", "png", "svg"]),
  video: Object.freeze(["mp4", "mov"]),
  audio: Object.freeze(["mp3"]),
});
export const DEFAULT_ANIMATOR_ROOT_LAYOUT_MARGIN_PX = Object.freeze({ x: 160, y: 140 });

function getElementById(documentLike = null, id = "") {
  return typeof documentLike?.getElementById === "function" ? documentLike.getElementById(id) : null;
}

export function getAnimatorDomElements(documentLike = globalThis.document) {
  const animatorOverlay = getElementById(documentLike, "animator-overlay");
  const animatorCanvas = getElementById(documentLike, "animator-canvas");
  const animatorHudLabelsToggle = getElementById(documentLike, "animator-hud-labels-toggle");
  const animatorHudPathsToggle = getElementById(documentLike, "animator-hud-paths-toggle");
  const animatorHudHistoryToggle = getElementById(documentLike, "animator-hud-history-toggle");
  const animatorHudEnvelopesToggle = getElementById(documentLike, "animator-hud-envelopes-toggle");
  const animatorHudCameraGuidesToggle = getElementById(
    documentLike,
    "animator-hud-camera-guides-toggle"
  );
  const animatorMotionSourcePill = getElementById(documentLike, "animator-motion-source-pill");

  return {
    animatorOverlay,
    animatorViewDesignButton: getElementById(documentLike, "animator-view-design-button"),
    animatorViewAuthoredButton: getElementById(documentLike, "animator-view-authored-button"),
    animatorSceneButton: getElementById(documentLike, "animator-scene-button"),
    animatorClearButton: getElementById(documentLike, "animator-clear-button"),
    animatorSaveButton: getElementById(documentLike, "animator-save-button"),
    animatorDocsButton: getElementById(documentLike, "animator-docs-button"),
    animatorExitButton: getElementById(documentLike, "animator-exit-button"),
    animatorTabs:
      animatorOverlay && typeof animatorOverlay.querySelectorAll === "function"
        ? Array.from(animatorOverlay.querySelectorAll(".animator-tab"))
        : [],
    animatorPanels:
      animatorOverlay && typeof animatorOverlay.querySelectorAll === "function"
        ? Array.from(animatorOverlay.querySelectorAll(".animator-panel"))
        : [],
    animatorSceneIdInput: getElementById(documentLike, "animator-scene-id"),
    animatorSceneNameInput: getElementById(documentLike, "animator-scene-name"),
    animatorAssemblyList: getElementById(documentLike, "animator-assembly-list"),
    animatorAssemblyDetail: getElementById(documentLike, "animator-assembly-detail"),
    animatorAssemblyAddButton: getElementById(documentLike, "animator-assembly-add"),
    animatorPreviewButton: getElementById(documentLike, "animator-preview-button"),
    animatorExportButton: getElementById(documentLike, "animator-export-button"),
    animatorLibrarySaveButton: getElementById(documentLike, "animator-library-save"),
    animatorRepoSaveButton: getElementById(documentLike, "animator-repo-save-button"),
    animatorLibrarySelect: getElementById(documentLike, "animator-library-select"),
    animatorLibraryLoadButton: getElementById(documentLike, "animator-library-load"),
    animatorLibraryDeleteButton: getElementById(documentLike, "animator-library-delete"),
    animatorLibraryStatus: getElementById(documentLike, "animator-library-status"),
    animatorPlayToggleButton: getElementById(documentLike, "animator-play-toggle"),
    animatorPlayResetButton: getElementById(documentLike, "animator-play-reset"),
    animatorMarkerPrevButton: getElementById(documentLike, "animator-marker-prev"),
    animatorMarkerNextButton: getElementById(documentLike, "animator-marker-next"),
    animatorMarkerJumpSelect: getElementById(documentLike, "animator-marker-jump"),
    animatorPlayheadScrubInput: getElementById(documentLike, "animator-playhead-scrub"),
    animatorStatus: getElementById(documentLike, "animator-status"),
    animatorJsonPreview: getElementById(documentLike, "animator-json-preview"),
    animatorCanvas,
    animatorCanvasWrap: animatorCanvas?.parentElement ?? null,
    animatorViewportOverlays: getElementById(documentLike, "animator-viewport-overlays"),
    animatorAssemblyMenu: getElementById(documentLike, "animator-assembly-menu"),
    animatorHudLabelsToggle,
    animatorHudPathsToggle,
    animatorHudHistoryToggle,
    animatorHudEnvelopesToggle,
    animatorHudCameraGuidesToggle,
    animatorMotionSourcePill,
    animatorHudViewportToggleBindings: [
      {
        button: animatorHudLabelsToggle,
        key: "showLabels",
        label: "Observer Labels",
      },
      {
        button: animatorHudPathsToggle,
        key: "showTransportPath",
        label: "Transport Paths",
      },
      {
        button: animatorHudHistoryToggle,
        key: "showHistoryTraces",
        label: "History Traces",
      },
      {
        button: animatorHudEnvelopesToggle,
        key: "showEnvelopes",
        label: "Envelopes",
      },
      {
        button: animatorHudCameraGuidesToggle,
        key: "showCameraGuides",
        label: "Observer Guides",
      },
    ],
    animatorPathModeSelect: getElementById(documentLike, "animator-path-mode"),
    animatorPathResetButton: getElementById(documentLike, "animator-path-reset"),
    animatorFrameResetButton: getElementById(documentLike, "animator-frame-reset"),
    animatorFrameScaleInput: getElementById(documentLike, "animator-frame-scale"),
    animatorFrameScaleLabel: getElementById(documentLike, "animator-frame-scale-label"),
    animatorCameraSpeedInput: getElementById(documentLike, "animator-camera-speed"),
    animatorCameraSpeedLabel: getElementById(documentLike, "animator-camera-speed-label"),
    animatorCameraRadiusInput: getElementById(documentLike, "animator-camera-radius"),
    animatorCameraRadiusLabel: getElementById(documentLike, "animator-camera-radius-label"),
    animatorCameraResetButton: getElementById(documentLike, "animator-camera-reset"),
    animatorCameraPoiSelect: getElementById(documentLike, "animator-camera-poi"),
    animatorCameraWaypointAdd: getElementById(documentLike, "animator-camera-waypoint-add"),
    animatorCameraWaypointClear: getElementById(documentLike, "animator-camera-waypoint-clear"),
    animatorCameraWaypointCount: getElementById(documentLike, "animator-camera-waypoint-count"),
    animatorCameraPoiStatus: getElementById(documentLike, "animator-camera-poi-status"),
    animatorCameraFlightToggle: getElementById(documentLike, "animator-camera-flight-toggle"),
    animatorSceneDurationInput: getElementById(documentLike, "animator-scene-duration"),
    animatorSceneLoopInput: getElementById(documentLike, "animator-scene-loop"),
    animatorMarkerListInput: getElementById(documentLike, "animator-marker-list"),
    animatorPauseListInput: getElementById(documentLike, "animator-pause-list"),
    animatorWarpListInput: getElementById(documentLike, "animator-warp-list"),
    animatorTransferListInput: getElementById(documentLike, "animator-transfer-list"),
    animatorMarkerStatus: getElementById(documentLike, "animator-marker-status"),
    animatorPauseStatus: getElementById(documentLike, "animator-pause-status"),
    animatorWarpStatus: getElementById(documentLike, "animator-warp-status"),
    animatorTransferStatus: getElementById(documentLike, "animator-transfer-status"),
    animatorTimelineSummary: getElementById(documentLike, "animator-timeline-summary"),
    animatorTimelineActive: getElementById(documentLike, "animator-timeline-active"),
    animatorTimelineTrack: getElementById(documentLike, "animator-timeline-track"),
    animatorTimelineWarps: getElementById(documentLike, "animator-timeline-warps"),
    animatorTimelinePauses: getElementById(documentLike, "animator-timeline-pauses"),
    animatorTimelineMarkers: getElementById(documentLike, "animator-timeline-markers"),
    animatorTimelinePlayhead: getElementById(documentLike, "animator-timeline-playhead"),
  };
}
