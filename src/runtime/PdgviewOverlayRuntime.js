export function getPdgviewGraphicDefaultTarget({
  selectedAssemblyId = "",
  fallbackAssemblyId = "",
  selectedPointIndex = null,
} = {}) {
  const assemblyId = selectedAssemblyId || fallbackAssemblyId;
  if (!assemblyId) {
    return null;
  }
  if (Number.isInteger(selectedPointIndex) && selectedPointIndex >= 0) {
    return {
      type: "path_point",
      assemblyId,
      pointIndex: selectedPointIndex,
    };
  }
  return {
    type: "assembly",
    assemblyId,
  };
}

export function encodePdgviewGraphicTargetValue(target) {
  if (!target?.type) {
    return "";
  }
  if (target.type === "assembly") {
    return `assembly:${target.assemblyId}`;
  }
  if (target.type === "path_point") {
    return `path_point:${target.assemblyId}:${Math.max(0, Number(target.pointIndex ?? 0) || 0)}`;
  }
  return "";
}

export function decodePdgviewGraphicTargetValue(rawValue, { sanitizeTarget } = {}) {
  const value = String(rawValue ?? "").trim();
  if (!value) {
    return null;
  }
  const [type, assemblyId, pointIndex] = value.split(":");
  if (type === "assembly" || type === "path_point") {
    return typeof sanitizeTarget === "function"
      ? sanitizeTarget({ type, assemblyId, pointIndex })
      : { type, assemblyId, pointIndex };
  }
  return null;
}

export function getPdgviewGraphicTargetEntries({
  assemblyDrafts = [],
  getAssemblyLetter,
  normalizeAssemblyPathPoints,
} = {}) {
  const entries = [];
  assemblyDrafts.forEach((assembly, index) => {
    if (!assembly?.id) {
      return;
    }
    const assemblyLetter =
      typeof getAssemblyLetter === "function" ? getAssemblyLetter(index) : String(index + 1);
    entries.push({
      value: encodePdgviewGraphicTargetValue({
        type: "assembly",
        assemblyId: assembly.id,
      }),
      label: `Assembly ${assemblyLetter}`,
    });
    const pathPoints =
      typeof normalizeAssemblyPathPoints === "function"
        ? normalizeAssemblyPathPoints(assembly?.pathPoints)
        : [];
    pathPoints.forEach((_point, pointIndex) => {
      entries.push({
        value: encodePdgviewGraphicTargetValue({
          type: "path_point",
          assemblyId: assembly.id,
          pointIndex,
        }),
        label: `Path ${assemblyLetter} Point ${pointIndex + 1}`,
      });
    });
  });
  return entries;
}

export function getPdgviewGraphicDefaultOffset(size = 0.42) {
  const radius = Math.max(0.18, Number(size) || 0.42);
  return [
    Number((radius * 1.45).toFixed(3)),
    Number((radius * 1.08).toFixed(3)),
    0,
  ];
}

export function getPdgviewOverlayKind(overlay) {
  const kind = String(overlay?.kind ?? "graphic").trim().toLowerCase();
  return kind === "image" || kind === "video" || kind === "audio" ? kind : "graphic";
}

export function getPdgviewMediaDefaultRect(kind = "image") {
  return kind === "video"
    ? { x: 0.62, y: 0.14, width: 0.26, height: 0.146 }
    : { x: 0.6, y: 0.16, width: 0.24, height: 0.24 };
}

export function normalizePdgviewMediaRect(rawRect, kind = "image", { clampFn } = {}) {
  const clamp = typeof clampFn === "function" ? clampFn : (value, min, max) => Math.min(max, Math.max(min, value));
  const fallback = getPdgviewMediaDefaultRect(kind);
  const x = clamp(Number(rawRect?.x ?? fallback.x) || fallback.x, 0, 0.92);
  const y = clamp(Number(rawRect?.y ?? fallback.y) || fallback.y, 0, 0.92);
  const width = clamp(Number(rawRect?.width ?? fallback.width) || fallback.width, 0.08, 0.86);
  const height = clamp(Number(rawRect?.height ?? fallback.height) || fallback.height, 0.08, 0.86);
  return {
    x: Number(Math.min(x, 1 - width).toFixed(4)),
    y: Number(Math.min(y, 1 - height).toFixed(4)),
    width: Number(width.toFixed(4)),
    height: Number(height.toFixed(4)),
  };
}

export function sanitizePdgviewMediaSource(rawSource, kind = "image", { supportedExtensions = {} } = {}) {
  const source = String(rawSource ?? "").trim();
  if (!source) {
    return "";
  }
  const normalized = source.replace(/\\/g, "/");
  const extension = normalized.includes(".")
    ? normalized.slice(normalized.lastIndexOf(".") + 1).toLowerCase()
    : "";
  const supported = supportedExtensions[kind] ?? [];
  return supported.includes(extension) ? normalized : "";
}

export function getPdgviewMediaOverlayLabel(overlay) {
  const source = String(overlay?.source ?? "").trim();
  const label = String(overlay?.label ?? "").trim();
  const base =
    label ||
    (source ? source.split("/").pop() ?? "" : "") ||
    (getPdgviewOverlayKind(overlay) === "video" ? "Video" : "Image");
  return base.length > 24 ? `${base.slice(0, 24).trimEnd()}...` : base;
}

export function getPdgviewGraphicOverlayLabel(overlay) {
  const text = String(overlay?.label ?? overlay?.text ?? "Graphic").trim() || "Graphic";
  return text.length > 24 ? `${text.slice(0, 24).trimEnd()}...` : text;
}

export function normalizePdgviewGraphicOverlayDraft(
  overlay = {},
  index = 0,
  duration = 24,
  {
    clampTimelineSpan,
    minDurationSeconds = 0.1,
    getDefaultTarget,
    sanitizeTarget,
    mediaAssetDirectories = {},
    supportedMediaExtensions = {},
    clampFn,
  } = {}
) {
  const clampSpan =
    typeof clampTimelineSpan === "function"
      ? clampTimelineSpan
      : (start, end, maxDuration) => {
          const safeStart = Math.max(0, Number(start) || 0);
          const safeEnd = Math.max(safeStart + minDurationSeconds, Number(end) || safeStart + minDurationSeconds);
          const clampedEnd = Math.min(maxDuration, safeEnd);
          return {
            start: Number(safeStart.toFixed(3)),
            end: Number(clampedEnd.toFixed(3)),
            span: Number((clampedEnd - safeStart).toFixed(3)),
          };
        };
  const kind = getPdgviewOverlayKind(overlay);
  const fallbackTarget = typeof getDefaultTarget === "function" ? getDefaultTarget() : null;
  const span = clampSpan(
    overlay?.start ?? 0,
    overlay?.end ?? minDurationSeconds,
    duration
  );
  if (kind === "image" || kind === "video" || kind === "audio") {
    const source = sanitizePdgviewMediaSource(overlay?.source, kind, {
      supportedExtensions,
    });
    const fallbackDirectory = mediaAssetDirectories[kind] ?? "";
    const rect = normalizePdgviewMediaRect(overlay?.rect, kind, { clampFn });
    const label = getPdgviewMediaOverlayLabel({
      ...overlay,
      kind,
      source: source || fallbackDirectory,
    });
    return {
      id: String(overlay?.id ?? `overlay_${index + 1}`).trim() || `overlay_${index + 1}`,
      kind,
      type: `viewport_${kind}`,
      label,
      text: "",
      start: span.start,
      end: span.end,
      size: Number((overlay?.size ?? 1).toFixed?.(3) ?? 1),
      rect,
      source,
      fit: "contain",
      muted: true,
      offset: [0, 0, 0],
      target: null,
      style: typeof overlay?.style === "object" && overlay.style ? { ...overlay.style } : {},
    };
  }
  const clamp = typeof clampFn === "function" ? clampFn : (value, min, max) => Math.min(max, Math.max(min, value));
  const size = clamp(Number(overlay?.size ?? overlay?.radius ?? 0.42) || 0.42, 0.18, 2.4);
  const target =
    typeof sanitizeTarget === "function"
      ? sanitizeTarget(overlay?.target, fallbackTarget?.assemblyId ?? "")
      : overlay?.target;
  const offsetSource =
    Array.isArray(overlay?.offset) && overlay.offset.length >= 3
      ? overlay.offset
      : getPdgviewGraphicDefaultOffset(size);
  const label =
    String(overlay?.label ?? overlay?.text ?? `Graphic ${index + 1}`).trim() || `Graphic ${index + 1}`;
  return {
    id: String(overlay?.id ?? `overlay_${index + 1}`).trim() || `overlay_${index + 1}`,
    kind: "graphic",
    type: "text_sphere_callout",
    label,
    text: String(overlay?.text ?? label).trim() || label,
    start: span.start,
    end: span.end,
    size: Number(size.toFixed(3)),
    offset: [
      Number((Number(offsetSource[0] ?? 0) || 0).toFixed(3)),
      Number((Number(offsetSource[1] ?? 0) || 0).toFixed(3)),
      Number((Number(offsetSource[2] ?? 0) || 0).toFixed(3)),
    ],
    target,
    style: typeof overlay?.style === "object" && overlay.style ? { ...overlay.style } : {},
  };
}

export function normalizePdgviewGraphicOverlayList(overlays = [], duration = 24, options = {}) {
  return (Array.isArray(overlays) ? overlays : []).map((overlay, index) =>
    normalizePdgviewGraphicOverlayDraft(overlay, index, duration, options)
  );
}

export function getPdgviewGraphicOverlayDraftIndexById(overlayDrafts = [], overlayId) {
  return overlayDrafts.findIndex((overlay) => overlay?.id === overlayId);
}

export function getNextPdgviewGraphicOverlayId(overlayDrafts = []) {
  let suffix = 1;
  let candidate = "overlay_1";
  const existingIds = new Set((overlayDrafts || []).map((overlay) => overlay?.id).filter(Boolean));
  while (existingIds.has(candidate)) {
    suffix += 1;
    candidate = `overlay_${suffix}`;
  }
  return candidate;
}

export function getPdgviewGraphicTimelineOverlays(documentData) {
  return (Array.isArray(documentData?.overlays) ? documentData.overlays : []).filter(
    (overlay) => overlay?.kind === "graphic"
  );
}

export function getPdgviewViewportMediaTimelineOverlays(documentData) {
  return (Array.isArray(documentData?.overlays) ? documentData.overlays : []).filter(
    (overlay) => overlay?.kind === "image" || overlay?.kind === "video"
  );
}
