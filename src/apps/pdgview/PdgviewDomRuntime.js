export const PDGVIEW_LIBRARY_STORAGE_KEY = "architrino.pdgview.library.v1";
export const PDGVIEW_MEDIA_ASSET_DIRECTORIES = Object.freeze({
  image: "content/assets/pdgview/images/",
  video: "content/assets/pdgview/video/",
  audio: "content/assets/pdgview/audio/",
});
export const PDGVIEW_SUPPORTED_MEDIA_EXTENSIONS = Object.freeze({
  image: Object.freeze(["jpg", "jpeg", "png", "svg"]),
  video: Object.freeze(["mp4", "mov"]),
  audio: Object.freeze(["mp3"]),
});
export const DEFAULT_PDGVIEW_ROOT_LAYOUT_MARGIN_PX = Object.freeze({ x: 160, y: 140 });

function getElementById(documentLike = null, id = "") {
  return typeof documentLike?.getElementById === "function" ? documentLike.getElementById(id) : null;
}

export function getPdgviewDomElements(documentLike = globalThis.document) {
  const pdgviewOverlay = getElementById(documentLike, "pdgview-overlay");
  const pdgviewCanvas = getElementById(documentLike, "pdgview-canvas");
  const pdgviewHudLabelsToggle = getElementById(documentLike, "pdgview-hud-labels-toggle");
  const pdgviewHudPathsToggle = getElementById(documentLike, "pdgview-hud-paths-toggle");
  const pdgviewHudHistoryToggle = getElementById(documentLike, "pdgview-hud-history-toggle");
  const pdgviewHudEnvelopesToggle = getElementById(documentLike, "pdgview-hud-envelopes-toggle");
  const pdgviewHudCameraGuidesToggle = getElementById(
    documentLike,
    "pdgview-hud-camera-guides-toggle"
  );

  return {
    pdgviewOverlay,
    pdgviewViewDesignButton: getElementById(documentLike, "pdgview-view-design-button"),
    pdgviewViewAuthoredButton: getElementById(documentLike, "pdgview-view-authored-button"),
    pdgviewSceneButton: getElementById(documentLike, "pdgview-scene-button"),
    pdgviewClearButton: getElementById(documentLike, "pdgview-clear-button"),
    pdgviewSaveButton: getElementById(documentLike, "pdgview-save-button"),
    pdgviewDocsButton: getElementById(documentLike, "pdgview-docs-button"),
    pdgviewExitButton: getElementById(documentLike, "pdgview-exit-button"),
    pdgviewTabs:
      pdgviewOverlay && typeof pdgviewOverlay.querySelectorAll === "function"
        ? Array.from(pdgviewOverlay.querySelectorAll(".pdgview-tab"))
        : [],
    pdgviewPanels:
      pdgviewOverlay && typeof pdgviewOverlay.querySelectorAll === "function"
        ? Array.from(pdgviewOverlay.querySelectorAll(".pdgview-panel"))
        : [],
    pdgviewSceneIdInput: getElementById(documentLike, "pdgview-scene-id"),
    pdgviewSceneNameInput: getElementById(documentLike, "pdgview-scene-name"),
    pdgviewAssemblyList: getElementById(documentLike, "pdgview-assembly-list"),
    pdgviewAssemblyDetail: getElementById(documentLike, "pdgview-assembly-detail"),
    pdgviewAssemblyAddButton: getElementById(documentLike, "pdgview-assembly-add"),
    pdgviewPreviewButton: getElementById(documentLike, "pdgview-preview-button"),
    pdgviewExportButton: getElementById(documentLike, "pdgview-export-button"),
    pdgviewLibrarySaveButton: getElementById(documentLike, "pdgview-library-save"),
    pdgviewRepoSaveButton: getElementById(documentLike, "pdgview-repo-save-button"),
    pdgviewLibrarySelect: getElementById(documentLike, "pdgview-library-select"),
    pdgviewLibraryLoadButton: getElementById(documentLike, "pdgview-library-load"),
    pdgviewLibraryDeleteButton: getElementById(documentLike, "pdgview-library-delete"),
    pdgviewLibraryStatus: getElementById(documentLike, "pdgview-library-status"),
    pdgviewPlayToggleButton: getElementById(documentLike, "pdgview-play-toggle"),
    pdgviewPlayResetButton: getElementById(documentLike, "pdgview-play-reset"),
    pdgviewMarkerPrevButton: getElementById(documentLike, "pdgview-marker-prev"),
    pdgviewMarkerNextButton: getElementById(documentLike, "pdgview-marker-next"),
    pdgviewMarkerJumpSelect: getElementById(documentLike, "pdgview-marker-jump"),
    pdgviewPlayheadScrubInput: getElementById(documentLike, "pdgview-playhead-scrub"),
    pdgviewStatus: getElementById(documentLike, "pdgview-status"),
    pdgviewJsonPreview: getElementById(documentLike, "pdgview-json-preview"),
    pdgviewCanvas,
    pdgviewCanvasWrap: pdgviewCanvas?.parentElement ?? null,
    pdgviewViewportOverlays: getElementById(documentLike, "pdgview-viewport-overlays"),
    pdgviewAssemblyMenu: getElementById(documentLike, "pdgview-assembly-menu"),
    pdgviewHudLabelsToggle,
    pdgviewHudPathsToggle,
    pdgviewHudHistoryToggle,
    pdgviewHudEnvelopesToggle,
    pdgviewHudCameraGuidesToggle,
    pdgviewHudViewportToggleBindings: [
      {
        button: pdgviewHudLabelsToggle,
        key: "showLabels",
        label: "Observer Labels",
      },
      {
        button: pdgviewHudPathsToggle,
        key: "showTransportPath",
        label: "Transport Paths",
      },
      {
        button: pdgviewHudHistoryToggle,
        key: "showHistoryTraces",
        label: "History Traces",
      },
      {
        button: pdgviewHudEnvelopesToggle,
        key: "showEnvelopes",
        label: "Envelopes",
      },
      {
        button: pdgviewHudCameraGuidesToggle,
        key: "showCameraGuides",
        label: "Observer Guides",
      },
    ],
    pdgviewPathModeSelect: getElementById(documentLike, "pdgview-path-mode"),
    pdgviewPathResetButton: getElementById(documentLike, "pdgview-path-reset"),
    pdgviewFrameResetButton: getElementById(documentLike, "pdgview-frame-reset"),
    pdgviewFrameScaleInput: getElementById(documentLike, "pdgview-frame-scale"),
    pdgviewFrameScaleLabel: getElementById(documentLike, "pdgview-frame-scale-label"),
    pdgviewCameraSpeedInput: getElementById(documentLike, "pdgview-camera-speed"),
    pdgviewCameraSpeedLabel: getElementById(documentLike, "pdgview-camera-speed-label"),
    pdgviewCameraRadiusInput: getElementById(documentLike, "pdgview-camera-radius"),
    pdgviewCameraRadiusLabel: getElementById(documentLike, "pdgview-camera-radius-label"),
    pdgviewCameraResetButton: getElementById(documentLike, "pdgview-camera-reset"),
    pdgviewCameraPoiSelect: getElementById(documentLike, "pdgview-camera-poi"),
    pdgviewCameraWaypointAdd: getElementById(documentLike, "pdgview-camera-waypoint-add"),
    pdgviewCameraWaypointClear: getElementById(documentLike, "pdgview-camera-waypoint-clear"),
    pdgviewCameraWaypointCount: getElementById(documentLike, "pdgview-camera-waypoint-count"),
    pdgviewCameraPoiStatus: getElementById(documentLike, "pdgview-camera-poi-status"),
    pdgviewCameraFlightToggle: getElementById(documentLike, "pdgview-camera-flight-toggle"),
    pdgviewSceneDurationInput: getElementById(documentLike, "pdgview-scene-duration"),
    pdgviewSceneLoopInput: getElementById(documentLike, "pdgview-scene-loop"),
    pdgviewMarkerListInput: getElementById(documentLike, "pdgview-marker-list"),
    pdgviewPauseListInput: getElementById(documentLike, "pdgview-pause-list"),
    pdgviewWarpListInput: getElementById(documentLike, "pdgview-warp-list"),
    pdgviewTransferListInput: getElementById(documentLike, "pdgview-transfer-list"),
    pdgviewMarkerStatus: getElementById(documentLike, "pdgview-marker-status"),
    pdgviewPauseStatus: getElementById(documentLike, "pdgview-pause-status"),
    pdgviewWarpStatus: getElementById(documentLike, "pdgview-warp-status"),
    pdgviewTransferStatus: getElementById(documentLike, "pdgview-transfer-status"),
    pdgviewTimelineSummary: getElementById(documentLike, "pdgview-timeline-summary"),
    pdgviewTimelineActive: getElementById(documentLike, "pdgview-timeline-active"),
    pdgviewTimelineTrack: getElementById(documentLike, "pdgview-timeline-track"),
    pdgviewTimelineWarps: getElementById(documentLike, "pdgview-timeline-warps"),
    pdgviewTimelinePauses: getElementById(documentLike, "pdgview-timeline-pauses"),
    pdgviewTimelineMarkers: getElementById(documentLike, "pdgview-timeline-markers"),
    pdgviewTimelinePlayhead: getElementById(documentLike, "pdgview-timeline-playhead"),
  };
}
