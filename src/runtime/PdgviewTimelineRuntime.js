export const PDGVIEW_TIMELINE_MIN_DURATION_SECONDS = 2;

export function parsePdgviewTimingLines(rawText, parseLine) {
  const source = String(rawText ?? "");
  const entries = [];
  const errors = [];
  source.split(/\r?\n/).forEach((rawLine, index) => {
    const lineNumber = index + 1;
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      return;
    }
    try {
      const parsed = typeof parseLine === "function" ? parseLine(line, lineNumber) : null;
      if (parsed) {
        entries.push(parsed);
      } else {
        errors.push(lineNumber);
      }
    } catch (_error) {
      errors.push(lineNumber);
    }
  });
  return { entries, errors };
}

export function getPdgviewTimelineMinimumSpan(
  duration = Infinity,
  minimumDuration = PDGVIEW_TIMELINE_MIN_DURATION_SECONDS
) {
  const normalizedDuration = Number(duration);
  if (!Number.isFinite(normalizedDuration)) {
    return minimumDuration;
  }
  return Math.max(0, Math.min(minimumDuration, Math.max(0, normalizedDuration)));
}

export function clampPdgviewTimelineSpan(
  rawStart,
  rawEnd,
  duration,
  {
    minimumDuration = PDGVIEW_TIMELINE_MIN_DURATION_SECONDS,
    clampFn,
  } = {}
) {
  const clamp = typeof clampFn === "function" ? clampFn : (value, min, max) => Math.min(max, Math.max(min, value));
  const sceneDuration = Math.max(0, Number(duration) || 0);
  if (sceneDuration <= 0) {
    return { start: 0, end: 0, span: 0 };
  }
  const minSpan = getPdgviewTimelineMinimumSpan(Math.min(sceneDuration, minimumDuration), minimumDuration);
  let start = clamp(Number(rawStart) || 0, 0, sceneDuration);
  let end = Number.isFinite(Number(rawEnd)) ? Number(rawEnd) : start + minSpan;

  if (minSpan > 0 && sceneDuration >= minSpan) {
    start = clamp(start, 0, sceneDuration - minSpan);
  }
  end = clamp(end, start, sceneDuration);
  if (minSpan > 0 && sceneDuration >= minSpan && end - start < minSpan) {
    end = clamp(start + minSpan, start, sceneDuration);
    if (end - start < minSpan) {
      start = clamp(end - minSpan, 0, sceneDuration);
    }
  }

  const roundedStart = Number(start.toFixed(3));
  const roundedEnd = Number(end.toFixed(3));
  return {
    start: roundedStart,
    end: roundedEnd,
    span: Number((roundedEnd - roundedStart).toFixed(3)),
  };
}

export function getPdgviewTimelineAuthoringItems(
  documentData,
  {
    getGraphicLabel,
    getMediaLabel,
  } = {}
) {
  const overlays = Array.isArray(documentData?.overlays) ? documentData.overlays : [];
  const pauses = Array.isArray(documentData?.scene?.pauses) ? documentData.scene.pauses : [];
  const warps = Array.isArray(documentData?.scene?.timeWarps) ? documentData.scene.timeWarps : [];
  return [
    ...overlays.map((overlay) => ({
      id: overlay?.id ?? "",
      kind: overlay?.kind ?? "graphic",
      label:
        overlay?.kind === "graphic"
          ? (typeof getGraphicLabel === "function" ? getGraphicLabel(overlay) : "Graphic")
          : typeof getMediaLabel === "function"
            ? getMediaLabel(overlay)
            : "Media",
      start: Number(overlay?.start ?? 0),
      end: Number(overlay?.end ?? overlay?.start ?? 0),
    })),
    ...pauses.map((pause) => ({
      id: pause?.id ?? "",
      kind: "pause",
      label: "Pause",
      start: Number(pause?.start ?? 0),
      end: Number(pause?.start ?? 0) + Number(pause?.duration ?? 0),
    })),
    ...warps.map((warp) => ({
      id: warp?.id ?? "",
      kind: "warp",
      label: "Warp",
      start: Number(warp?.start ?? 0),
      end: Number(warp?.end ?? warp?.start ?? 0),
    })),
  ];
}

export function findPdgviewTimelineOverlap(
  candidate,
  {
    excludeId = "",
    documentData,
    getGraphicLabel,
    getMediaLabel,
  } = {}
) {
  const candidateStart = Number(candidate?.start);
  const candidateEnd = Number(candidate?.end);
  if (!Number.isFinite(candidateStart) || !Number.isFinite(candidateEnd)) {
    return null;
  }
  const normalizedExcludeId = String(excludeId ?? candidate?.id ?? "");
  const epsilon = 0.0005;
  return (
    getPdgviewTimelineAuthoringItems(documentData, {
      getGraphicLabel,
      getMediaLabel,
    }).find((entry) => {
      if (!entry) {
        return false;
      }
      if (normalizedExcludeId && entry.id === normalizedExcludeId) {
        return false;
      }
      const start = Number(entry.start);
      const end = Number(entry.end);
      if (!Number.isFinite(start) || !Number.isFinite(end)) {
        return false;
      }
      return candidateStart < end - epsilon && candidateEnd > start + epsilon;
    }) ?? null
  );
}

export function formatPdgviewPauseList(pauses = []) {
  return pauses
    .map((pause) => `${Number(pause.start ?? 0)}, ${Number(pause.duration ?? 0)}`)
    .join("\n");
}

export function formatPdgviewWarpList(timeWarps = []) {
  return timeWarps
    .map((warp) => `${Number(warp.start ?? 0)}, ${Number(warp.end ?? 0)}, ${Number(warp.rate ?? 1)}`)
    .join("\n");
}

export function getPdgviewSceneTimeWindow(documentData) {
  const sceneTime = documentData?.scene?.time ?? {};
  const start = Number(sceneTime.start ?? 0);
  const end = Number(sceneTime.end ?? Math.max(24, start + 1));
  return {
    start,
    end: end > start ? end : start + 1,
    loop: !!sceneTime.loop,
    playbackRate: Number(sceneTime.playbackRate ?? 1) || 1,
  };
}

export function getPdgviewTimelineFraction(documentData, timeSeconds, { clampFn } = {}) {
  const clamp = typeof clampFn === "function" ? clampFn : (value, min, max) => Math.min(max, Math.max(min, value));
  const timeWindow = getPdgviewSceneTimeWindow(documentData);
  const duration = Math.max(0.001, timeWindow.end - timeWindow.start);
  return clamp((timeSeconds - timeWindow.start) / duration, 0, 1);
}

export function getPdgviewTimelineTimeAtClientX(
  clientX,
  documentData,
  {
    trackRect,
    clampFn,
    getTimeWindow = getPdgviewSceneTimeWindow,
  } = {}
) {
  if (!trackRect || !documentData) {
    return 0;
  }
  const clamp = typeof clampFn === "function" ? clampFn : (value, min, max) => Math.min(max, Math.max(min, value));
  const fraction = trackRect.width ? clamp((clientX - trackRect.left) / trackRect.width, 0, 1) : 0;
  const timeWindow = typeof getTimeWindow === "function" ? getTimeWindow(documentData) : getPdgviewSceneTimeWindow(documentData);
  return Number((timeWindow.start + fraction * (timeWindow.end - timeWindow.start)).toFixed(3));
}
