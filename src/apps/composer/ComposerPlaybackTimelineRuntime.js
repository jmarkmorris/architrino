export function createComposerPlaybackTimelineRuntime(options = {}) {
  const THREE = options.THREE ?? globalThis.THREE;
  const documentLike = options.documentLike ?? globalThis.document;
  const clampFn =
    typeof options.clampFn === "function"
      ? options.clampFn
      : (value, min, max) => Math.min(max, Math.max(min, value));
  const formatTimeLabel =
    typeof options.formatTimeLabel === "function" ? options.formatTimeLabel : (value) => `${value}`;
  const getSceneTimeWindow =
    typeof options.getSceneTimeWindow === "function"
      ? options.getSceneTimeWindow
      : () => ({ start: 0, end: 0, loop: false, playbackRate: 1 });
  const getTimelineFraction =
    typeof options.getTimelineFraction === "function" ? options.getTimelineFraction : () => 0;
  const getGraphicEnd =
    typeof options.getGraphicEnd === "function"
      ? options.getGraphicEnd
      : (item) => Number(item?.end ?? item?.t ?? 0);
  const getGraphicOverlayLabel =
    typeof options.getGraphicOverlayLabel === "function"
      ? options.getGraphicOverlayLabel
      : () => "Graphic";
  const getMediaOverlayLabel =
    typeof options.getMediaOverlayLabel === "function" ? options.getMediaOverlayLabel : () => "Media";
  const getGraphicTimelineOverlays =
    typeof options.getGraphicTimelineOverlays === "function"
      ? options.getGraphicTimelineOverlays
      : () => [];
  const getViewportMediaTimelineOverlays =
    typeof options.getViewportMediaTimelineOverlays === "function"
      ? options.getViewportMediaTimelineOverlays
      : () => [];
  const setTransportButtonIcon =
    typeof options.setTransportButtonIcon === "function"
      ? options.setTransportButtonIcon
      : () => {};
  const updateAnimatedViewport =
    typeof options.updateAnimatedViewport === "function" ? options.updateAnimatedViewport : () => {};
  const applyViewportDisplayState =
    typeof options.applyViewportDisplayState === "function"
      ? options.applyViewportDisplayState
      : () => {};
  const getCurrentDocument =
    typeof options.getCurrentDocument === "function" ? options.getCurrentDocument : () => null;
  const getPlaybackState =
    typeof options.getPlaybackState === "function"
      ? options.getPlaybackState
      : () => ({ playing: false, playheadSeconds: 0, lastTickMs: 0 });
  const getEditorPreviewState =
    typeof options.getEditorPreviewState === "function"
      ? options.getEditorPreviewState
      : () => ({
          renderMotionTimeOverride: null,
          renderMotionTimePlayhead: null,
          renderMotionProgressOverride: null,
          renderMotionProgressPlayhead: null,
        });
  const getViewportModeState =
    typeof options.getViewportModeState === "function"
      ? options.getViewportModeState
      : () => ({ cameraSource: "design" });
  const dom = options.dom ?? {};

  function clearComposerEditorPreviewState() {
    const state = getEditorPreviewState();
    state.renderMotionTimeOverride = null;
    state.renderMotionTimePlayhead = null;
    state.renderMotionProgressOverride = null;
    state.renderMotionProgressPlayhead = null;
  }

  function updateComposerViewportModeButtons() {
    const isObserver = getViewportModeState().cameraSource === "authored";
    if (dom.viewDesignButton) {
      dom.viewDesignButton.classList.toggle("is-active", !isObserver);
      dom.viewDesignButton.setAttribute("aria-pressed", isObserver ? "false" : "true");
    }
    if (dom.viewObserverButton) {
      dom.viewObserverButton.classList.toggle("is-active", isObserver);
      dom.viewObserverButton.setAttribute("aria-pressed", isObserver ? "true" : "false");
    }
  }

  function setComposerViewportCameraSource(source = "design") {
    getViewportModeState().cameraSource = source === "authored" ? "authored" : "design";
    updateComposerViewportModeButtons();
    applyViewportDisplayState();
  }

  function getComposerSortedMarkers(documentData) {
    const markers = Array.isArray(documentData?.scene?.markers) ? documentData.scene.markers : [];
    return [...markers].sort((left, right) => left.t - right.t);
  }

  function syncComposerMarkerNavigation(documentData, timeSeconds) {
    const markers = getComposerSortedMarkers(documentData);
    if (dom.markerJumpSelect) {
      const existingSignature = dom.markerJumpSelect.dataset.signature ?? "";
      const nextSignature = markers
        .map((marker) => `${marker.id}:${marker.t}:${getGraphicEnd(marker)}:${marker.label ?? ""}`)
        .join("|");
      if (existingSignature !== nextSignature) {
        dom.markerJumpSelect.innerHTML = "";
        if (!markers.length) {
          const option = documentLike.createElement("option");
          option.value = "";
          option.textContent = "No Markers";
          dom.markerJumpSelect.appendChild(option);
        } else {
          markers.forEach((marker) => {
            const option = documentLike.createElement("option");
            option.value = marker.id;
            const end = getGraphicEnd(marker);
            option.textContent = `${marker.label ?? marker.id ?? "Marker"} (${
              end > marker.t + 0.001
                ? `${formatTimeLabel(marker.t)}-${formatTimeLabel(marker.end)}`
                : formatTimeLabel(marker.t)
            })`;
            dom.markerJumpSelect.appendChild(option);
          });
        }
        dom.markerJumpSelect.dataset.signature = nextSignature;
      }

      if (markers.length) {
        const activeMarker = [...markers].filter((marker) => marker.t <= timeSeconds + 0.001).pop() ?? markers[0];
        if (dom.markerJumpSelect.value !== activeMarker.id) {
          dom.markerJumpSelect.value = activeMarker.id;
        }
        dom.markerJumpSelect.disabled = false;
      } else {
        dom.markerJumpSelect.value = "";
        dom.markerJumpSelect.disabled = true;
      }
    }

    if (dom.markerPrevButton) {
      dom.markerPrevButton.disabled = !markers.some((marker) => marker.t < timeSeconds - 0.001);
    }
    if (dom.markerNextButton) {
      dom.markerNextButton.disabled = !markers.some((marker) => marker.t > timeSeconds + 0.001);
    }
  }

  function renderComposerTimeline(documentData) {
    options.clearTimelineLayer?.(dom.timelineWarps);
    options.clearTimelineLayer?.(dom.timelinePauses);
    options.clearTimelineLayer?.(dom.timelineMarkers);
    if (!documentData || !dom.timelineTrack) {
      return;
    }

    const markers = Array.isArray(documentData?.scene?.markers) ? documentData.scene.markers : [];
    const pauses = Array.isArray(documentData?.scene?.pauses) ? documentData.scene.pauses : [];
    const timeWarps = Array.isArray(documentData?.scene?.timeWarps) ? documentData.scene.timeWarps : [];
    const graphics = getGraphicTimelineOverlays(documentData);
    const mediaOverlays = getViewportMediaTimelineOverlays(documentData);

    timeWarps.forEach((warp) => {
      const band = options.createTimelineBand?.(
        getTimelineFraction(documentData, warp.start),
        getTimelineFraction(documentData, warp.end),
        "is-warp",
        `Warp ${Number(warp.rate ?? 1).toFixed(2)}x: ${formatTimeLabel(warp.start)} to ${formatTimeLabel(warp.end)}`,
        "WARP"
      );
      if (!band) {
        return;
      }
      band.dataset.warpId = warp.id ?? "";
      dom.timelineWarps?.appendChild(band);
    });

    pauses.forEach((pause) => {
      const band = options.createTimelineBand?.(
        getTimelineFraction(documentData, pause.start),
        getTimelineFraction(documentData, Number(pause.start ?? 0) + Number(pause.duration ?? 0)),
        "is-pause",
        `Pause ${formatTimeLabel(pause.duration)} at ${formatTimeLabel(pause.start)}`,
        "PAUSE"
      );
      if (!band) {
        return;
      }
      band.dataset.pauseId = pause.id ?? "";
      dom.timelinePauses?.appendChild(band);
    });

    graphics.forEach((graphic) => {
      const label = getGraphicOverlayLabel(graphic);
      const band = options.createTimelineBand?.(
        getTimelineFraction(documentData, graphic.start),
        getTimelineFraction(documentData, graphic.end),
        "is-graphic",
        `${label}: ${formatTimeLabel(graphic.start)} to ${formatTimeLabel(graphic.end)}`,
        label
      );
      if (!band) {
        return;
      }
      band.dataset.overlayId = graphic.id ?? "";
      dom.timelineMarkers?.appendChild(band);
    });

    mediaOverlays.forEach((overlay) => {
      const label = getMediaOverlayLabel(overlay);
      const band = options.createTimelineBand?.(
        getTimelineFraction(documentData, overlay.start),
        getTimelineFraction(documentData, overlay.end),
        overlay.kind === "video" ? "is-video" : "is-image",
        `${label}: ${formatTimeLabel(overlay.start)} to ${formatTimeLabel(overlay.end)}`,
        label
      );
      if (!band) {
        return;
      }
      band.dataset.overlayId = overlay.id ?? "";
      band.dataset.overlayKind = overlay.kind ?? "";
      dom.timelineMarkers?.appendChild(band);
    });

    markers.forEach((marker) => {
      const label = marker.label ?? marker.id ?? "MARK";
      const band = options.createTimelineBand?.(
        getTimelineFraction(documentData, marker.t),
        Math.max(getTimelineFraction(documentData, marker.t) + 0.002, getTimelineFraction(documentData, Number(marker.end ?? marker.t))),
        "is-marker",
        `${label}: ${
          Number(marker.end ?? marker.t) > Number(marker.t ?? 0) + 0.001
            ? `${formatTimeLabel(marker.t)} to ${formatTimeLabel(marker.end)}`
            : formatTimeLabel(marker.t)
        }`,
        label
      );
      if (!band) {
        return;
      }
      band.dataset.markerId = marker.id ?? "";
      dom.timelineMarkers?.appendChild(band);
    });
  }

  function updateComposerTimelinePlayhead(timeSeconds, documentData) {
    if (!documentData) {
      return;
    }
    const fraction = getTimelineFraction(documentData, timeSeconds);
    if (dom.timelinePlayhead) {
      dom.timelinePlayhead.style.left = `${fraction * 100}%`;
    }
    if (dom.playheadScrubInput) {
      dom.playheadScrubInput.value = String(Math.round(fraction * 1000));
    }
    const timeWindow = getSceneTimeWindow(documentData);
    if (dom.timelineSummary) {
      dom.timelineSummary.textContent = `${formatTimeLabel(timeSeconds)} / ${formatTimeLabel(timeWindow.end)}`;
    }
    if (dom.playToggleButton) {
      setTransportButtonIcon(dom.playToggleButton, getPlaybackState().playing ? "pause" : "play");
      dom.playToggleButton.classList.toggle("is-active", getPlaybackState().playing);
    }
  }

  function setComposerPlaybackPlayhead(timeSeconds, runtimeOptions = {}) {
    const documentData = runtimeOptions.documentData ?? getCurrentDocument();
    if (!documentData) {
      return;
    }
    const playbackState = getPlaybackState();
    const timeWindow = getSceneTimeWindow(documentData);
    playbackState.playheadSeconds = clampFn(timeSeconds, timeWindow.start, timeWindow.end);
    clearComposerEditorPreviewState();
    playbackState.lastTickMs = performance.now();
    if (runtimeOptions.playing !== undefined) {
      playbackState.playing = !!runtimeOptions.playing;
    }
    updateAnimatedViewport(playbackState.playheadSeconds);
    updateComposerTimelinePlayhead(playbackState.playheadSeconds, documentData);
  }

  function startComposerPlayback(timeSeconds, runtimeOptions = {}) {
    const documentData = runtimeOptions.documentData ?? getCurrentDocument();
    if (!documentData) {
      return;
    }
    const playbackState = getPlaybackState();
    const timeWindow = getSceneTimeWindow(documentData);
    const clampedTime = clampFn(timeSeconds, timeWindow.start, timeWindow.end);
    playbackState.playheadSeconds =
      clampedTime >= timeWindow.end - 0.001 ? timeWindow.start : Math.min(clampedTime, timeWindow.end - 0.0001);
    clearComposerEditorPreviewState();
    playbackState.playing = true;
    playbackState.lastTickMs = 0;
    updateAnimatedViewport(playbackState.playheadSeconds);
    updateComposerTimelinePlayhead(playbackState.playheadSeconds, documentData);
  }

  function toggleComposerPlayback() {
    const documentData = getCurrentDocument();
    if (!documentData) {
      return;
    }
    const playbackState = getPlaybackState();
    const timeWindow = getSceneTimeWindow(documentData);
    if (playbackState.playing) {
      setComposerPlaybackPlayhead(playbackState.playheadSeconds, { documentData, playing: false });
      return;
    }
    startComposerPlayback(
      playbackState.playheadSeconds >= timeWindow.end - 0.001 ? timeWindow.start : playbackState.playheadSeconds,
      { documentData }
    );
  }

  function restartComposerPlayback() {
    const documentData = getCurrentDocument();
    if (!documentData) {
      return;
    }
    const timeWindow = getSceneTimeWindow(documentData);
    setComposerPlaybackPlayhead(timeWindow.start, { documentData, playing: false });
  }

  function jumpToComposerMarker(markerId, runtimeOptions = {}) {
    const documentData = getCurrentDocument();
    if (!documentData || !markerId) {
      return;
    }
    const marker = getComposerSortedMarkers(documentData).find((entry) => entry.id === markerId);
    if (!marker) {
      return;
    }
    setComposerPlaybackPlayhead(marker.t, { documentData, playing: runtimeOptions.playing });
  }

  function jumpComposerMarkerByOffset(direction) {
    const documentData = getCurrentDocument();
    if (!documentData) {
      return;
    }
    const playbackState = getPlaybackState();
    const markers = getComposerSortedMarkers(documentData);
    if (!markers.length) {
      return;
    }
    const epsilon = 0.001;
    let target = null;
    if (direction < 0) {
      target = [...markers].reverse().find((marker) => marker.t < playbackState.playheadSeconds - epsilon);
    } else {
      target = markers.find((marker) => marker.t > playbackState.playheadSeconds + epsilon);
    }
    if (!target) {
      target = direction < 0 ? markers[0] : markers[markers.length - 1];
    }
    jumpToComposerMarker(target.id, { playing: false });
  }

  function scrubComposerPlayback(fraction, runtimeOptions = {}) {
    const documentData = getCurrentDocument();
    if (!documentData) {
      return;
    }
    const timeWindow = getSceneTimeWindow(documentData);
    const nextTime = THREE.MathUtils.lerp(timeWindow.start, timeWindow.end, clampFn(fraction, 0, 1));
    setComposerPlaybackPlayhead(nextTime, { documentData, playing: runtimeOptions.playing });
  }

  function updateComposerPlaybackState(now) {
    const documentData = getCurrentDocument();
    const playbackState = getPlaybackState();
    if (!documentData || !playbackState.playing) {
      playbackState.lastTickMs = now;
      return playbackState.playheadSeconds;
    }
    clearComposerEditorPreviewState();
    if (!playbackState.lastTickMs) {
      playbackState.lastTickMs = now;
      return playbackState.playheadSeconds;
    }
    const deltaSeconds = Math.max(0, (now - playbackState.lastTickMs) / 1000);
    playbackState.lastTickMs = now;
    const timeWindow = getSceneTimeWindow(documentData);
    if (playbackState.playheadSeconds < timeWindow.start) {
      playbackState.playheadSeconds = timeWindow.start;
    }
    playbackState.playheadSeconds += deltaSeconds * timeWindow.playbackRate;
    if (playbackState.playheadSeconds > timeWindow.end) {
      if (timeWindow.loop) {
        playbackState.playheadSeconds = timeWindow.start;
      } else {
        playbackState.playheadSeconds = timeWindow.end;
        playbackState.playing = false;
      }
    }
    return playbackState.playheadSeconds;
  }

  return {
    renderComposerTimeline,
    updateComposerTimelinePlayhead,
    clearComposerEditorPreviewState,
    updateComposerViewportModeButtons,
    setComposerViewportCameraSource,
    setComposerPlaybackPlayhead,
    startComposerPlayback,
    toggleComposerPlayback,
    restartComposerPlayback,
    jumpToComposerMarker,
    jumpComposerMarkerByOffset,
    scrubComposerPlayback,
    updateComposerPlaybackState,
    syncComposerMarkerNavigation,
    getComposerSortedMarkers,
  };
}
