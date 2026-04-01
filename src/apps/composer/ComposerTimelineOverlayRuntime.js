import {
  clampComposerTimelineSpan,
  COMPOSER_TIMELINE_MIN_DURATION_SECONDS,
  findComposerTimelineOverlap as findComposerTimelineOverlapRuntime,
  getComposerTimelineAuthoringItems as getComposerTimelineAuthoringItemsRuntime,
  parseComposerTimingLines,
} from "../../runtime/ComposerTimelineRuntime.js";
import {
  decodeComposerGraphicTargetValue as decodeComposerGraphicTargetValueRuntime,
  getComposerGraphicDefaultTarget as getComposerGraphicDefaultTargetRuntime,
  getComposerGraphicOverlayDraftIndexById as getComposerGraphicOverlayDraftIndexByIdRuntime,
  getComposerGraphicOverlayLabel,
  getComposerGraphicTargetEntries as getComposerGraphicTargetEntriesRuntime,
  getComposerGraphicTimelineOverlays as getComposerGraphicTimelineOverlaysRuntime,
  getComposerMediaOverlayLabel,
  getComposerViewportMediaTimelineOverlays as getComposerViewportMediaTimelineOverlaysRuntime,
  getNextComposerGraphicOverlayId as getNextComposerGraphicOverlayIdRuntime,
  normalizeComposerGraphicOverlayDraft as normalizeComposerGraphicOverlayDraftRuntime,
  normalizeComposerGraphicOverlayList as normalizeComposerGraphicOverlayListRuntime,
  normalizeComposerMediaRect as normalizeComposerMediaRectRuntime,
  sanitizeComposerMediaSource as sanitizeComposerMediaSourceRuntime,
} from "../../runtime/ComposerOverlayRuntime.js";

export function createComposerTimelineOverlayRuntime(options = {}) {
  const clampFn = options.clampFn ?? ((value) => value);
  const minDurationSeconds =
    Number(options.minDurationSeconds) || COMPOSER_TIMELINE_MIN_DURATION_SECONDS;
  const sanitizeEntityId = options.sanitizeEntityId ?? ((value, fallback = "") => fallback || value || "");
  const sanitizeTarget = options.sanitizeTarget ?? ((target) => target ?? null);
  const getAssemblyDrafts = options.getAssemblyDrafts ?? (() => []);
  const getSelectedAssemblyId = options.getSelectedAssemblyId ?? (() => "");
  const getSelectedPointIndex = options.getSelectedPointIndex ?? (() => null);
  const getGraphicOverlayDrafts = options.getGraphicOverlayDrafts ?? (() => []);
  const getCurrentDocument = options.getCurrentDocument ?? (() => null);
  const getAssemblyLetter = options.getAssemblyLetter ?? ((index) => String(index + 1));
  const normalizeAssemblyPathPoints = options.normalizeAssemblyPathPoints ?? ((points) => points ?? []);
  const normalizeMemberList = options.normalizeMemberList ?? ((members) => members ?? []);
  const normalizeSubassemblyList = options.normalizeSubassemblyList ?? ((subassemblies) => subassemblies ?? []);
  const vectorFromTriplet = options.vectorFromTriplet ?? ((triplet) => triplet ?? null);
  const isBareArchitrinoAssembly = options.isBareArchitrinoAssembly ?? (() => false);
  const readNumberInput = options.readNumberInput ?? ((input, fallback = 0) => {
    const value = Number(input?.value);
    return Number.isFinite(value) ? value : fallback;
  });
  const formatTimeLabel = options.formatTimeLabel ?? ((value) => String(value));
  const setStatus = options.setStatus ?? (() => {});
  const mediaAssetDirectories = options.mediaAssetDirectories ?? {};
  const supportedMediaExtensions = options.supportedMediaExtensions ?? {};
  const {
    sceneDurationInput = null,
    sceneLoopInput = null,
    markerListInput = null,
    pauseListInput = null,
    warpListInput = null,
    transferListInput = null,
    markerStatus = null,
    pauseStatus = null,
    warpStatus = null,
    transferStatus = null,
  } = options.dom ?? {};

  function normalizeComposerTransferEndpoint(rawEndpoint) {
    if (!rawEndpoint) {
      return null;
    }
    if (typeof rawEndpoint === "object") {
      const assemblyId = sanitizeEntityId(rawEndpoint.assemblyId, "");
      const memberId = sanitizeEntityId(rawEndpoint.memberId, "");
      return assemblyId && memberId ? { assemblyId, memberId } : null;
    }
    const match = String(rawEndpoint)
      .trim()
      .match(/^([a-zA-Z0-9_-]+)[.:/]([a-zA-Z0-9_-]+)$/);
    if (!match) {
      return null;
    }
    const assemblyId = sanitizeEntityId(match[1], "");
    const memberId = sanitizeEntityId(match[2], "");
    return assemblyId && memberId ? { assemblyId, memberId } : null;
  }

  function parseComposerTransfers(rawText) {
    return parseComposerTimingLines(rawText, (line, lineNumber) => {
      const [mappingPart, rawTimePart] = line.split("@").map((part) => part.trim());
      const mappingMatch = mappingPart.match(/^(.+?)\s*->\s*(.+)$/);
      if (!mappingMatch) {
        return null;
      }
      const source = normalizeComposerTransferEndpoint(mappingMatch[1]);
      const target = normalizeComposerTransferEndpoint(mappingMatch[2]);
      if (!source || !target) {
        return null;
      }
      let t = null;
      if (rawTimePart) {
        const parsedTime = Number(rawTimePart);
        if (!Number.isFinite(parsedTime)) {
          return null;
        }
        t = Number(parsedTime.toFixed(3));
      }
      return {
        id: `transfer_authored_${lineNumber}`,
        source,
        target,
        t,
      };
    });
  }

  function getComposerTimelineAuthoringItems(documentData = getCurrentDocument()) {
    return getComposerTimelineAuthoringItemsRuntime(documentData, {
      getGraphicLabel: getComposerGraphicOverlayLabel,
      getMediaLabel: getComposerMediaOverlayLabel,
    });
  }

  function findComposerTimelineOverlap(candidate, runtimeOptions = {}) {
    return findComposerTimelineOverlapRuntime(candidate, {
      ...runtimeOptions,
      getGraphicLabel: getComposerGraphicOverlayLabel,
      getMediaLabel: getComposerMediaOverlayLabel,
    });
  }

  function reportComposerTimelineOverlap(conflict) {
    if (!conflict) {
      return;
    }
    setStatus(
      `Timeline items may not overlap. ${conflict.label} already occupies ${formatTimeLabel(conflict.start)}-${formatTimeLabel(conflict.end)}.`
    );
  }

  function getComposerGraphicEnd(marker, sceneDuration = null) {
    const start = Number(marker?.t ?? 0);
    const explicitEnd = Number(marker?.end);
    const end = Number.isFinite(explicitEnd) ? explicitEnd : start;
    if (!Number.isFinite(sceneDuration)) {
      return end;
    }
    return clampFn(end, start, Number(sceneDuration));
  }

  function getComposerGraphicDefaultTarget() {
    const assemblyDrafts = getAssemblyDrafts();
    return getComposerGraphicDefaultTargetRuntime({
      selectedAssemblyId: sanitizeEntityId(getSelectedAssemblyId(), ""),
      fallbackAssemblyId: sanitizeEntityId(assemblyDrafts[0]?.id, ""),
      selectedPointIndex: getSelectedPointIndex(),
    });
  }

  function decodeComposerGraphicTargetValue(rawValue) {
    return decodeComposerGraphicTargetValueRuntime(rawValue, {
      sanitizeTarget: (target) => sanitizeTarget(target),
    });
  }

  function getComposerGraphicTargetEntries() {
    return getComposerGraphicTargetEntriesRuntime({
      assemblyDrafts: getAssemblyDrafts(),
      getAssemblyLetter,
      normalizeAssemblyPathPoints,
    });
  }

  function normalizeComposerMediaRect(rawRect, kind = "image") {
    return normalizeComposerMediaRectRuntime(rawRect, kind, {
      clampFn,
    });
  }

  function sanitizeComposerMediaSource(rawSource, kind = "image") {
    return sanitizeComposerMediaSourceRuntime(rawSource, kind, {
      supportedExtensions: supportedMediaExtensions,
    });
  }

  function normalizeComposerGraphicOverlayDraft(overlay = {}, index = 0, duration = 24) {
    const normalized = normalizeComposerGraphicOverlayDraftRuntime(overlay, index, duration, {
      clampFn,
      clampTimelineSpan: clampComposerTimelineSpan,
      minDurationSeconds,
      getDefaultTarget: () => getComposerGraphicDefaultTarget(),
      sanitizeTarget: (target, fallbackAssemblyId = "") =>
        sanitizeTarget(target, fallbackAssemblyId),
      mediaAssetDirectories,
      supportedMediaExtensions,
    });
    return {
      ...normalized,
      id: sanitizeEntityId(normalized?.id, `overlay_${index + 1}`),
    };
  }

  function normalizeComposerGraphicOverlayList(overlays = [], duration = 24) {
    return normalizeComposerGraphicOverlayListRuntime(overlays, duration, {
      clampFn,
      clampTimelineSpan: clampComposerTimelineSpan,
      minDurationSeconds,
      getDefaultTarget: () => getComposerGraphicDefaultTarget(),
      sanitizeTarget: (target, fallbackAssemblyId = "") =>
        sanitizeTarget(target, fallbackAssemblyId),
      mediaAssetDirectories,
      supportedMediaExtensions,
    }).map((overlay, index) => ({
      ...overlay,
      id: sanitizeEntityId(overlay?.id, `overlay_${index + 1}`),
    }));
  }

  function getComposerGraphicOverlayDraftIndexById(overlayId) {
    return getComposerGraphicOverlayDraftIndexByIdRuntime(getGraphicOverlayDrafts(), overlayId);
  }

  function getComposerGraphicOverlayDraftById(overlayId) {
    const index = getComposerGraphicOverlayDraftIndexById(overlayId);
    const overlayDrafts = getGraphicOverlayDrafts();
    return index >= 0 ? overlayDrafts[index] : null;
  }

  function getNextComposerGraphicOverlayId() {
    return getNextComposerGraphicOverlayIdRuntime(getGraphicOverlayDrafts());
  }

  function getComposerGraphicTimelineOverlays(documentData = getCurrentDocument()) {
    return getComposerGraphicTimelineOverlaysRuntime(documentData);
  }

  function getComposerViewportMediaTimelineOverlays(documentData = getCurrentDocument()) {
    return getComposerViewportMediaTimelineOverlaysRuntime(documentData);
  }

  function isComposerTimeWithinSpan(timeSeconds, startSeconds, endSeconds, epsilon = 0.001) {
    const time = Number(timeSeconds);
    const start = Number(startSeconds);
    const end = Number(endSeconds);
    if (!Number.isFinite(time) || !Number.isFinite(start) || !Number.isFinite(end)) {
      return false;
    }
    return time >= start - epsilon && time <= end + epsilon;
  }

  function resolveComposerGraphicTargetPosition(
    target,
    assemblyCenters = new Map(),
    documentData = getCurrentDocument()
  ) {
    if (!target) {
      return null;
    }
    if (target.type === "assembly") {
      return assemblyCenters.get(target.assemblyId)?.clone?.() ?? null;
    }
    if (target.type === "path_point") {
      const paths = Array.isArray(documentData?.paths) ? documentData.paths : [];
      const path = paths.find((entry) => entry?.metadata?.ownerAssemblyId === target.assemblyId);
      const point = Array.isArray(path?.payload?.points)
        ? path.payload.points[Math.max(0, Number(target.pointIndex ?? 0) || 0)]
        : null;
      return point ? vectorFromTriplet(point) : null;
    }
    return null;
  }

  function getComposerAssemblyGraphicTargetRadius(assembly) {
    if (!assembly) {
      return 0;
    }
    const shellRadii = Array.isArray(assembly?.core?.shells)
      ? assembly.core.shells
          .map((shell) => Number(shell?.radius ?? 0) || 0)
          .filter((radius) => radius > 0)
      : [];
    if (shellRadii.length) {
      return Math.max(...shellRadii);
    }

    if (isBareArchitrinoAssembly(assembly)) {
      return 0.052;
    }

    const members = normalizeMemberList(assembly?.members);
    const baseRadius = 0.17 + Math.min(members.length, 8) * 0.018;
    const subassemblies = normalizeSubassemblyList(assembly?.subassemblies);
    const childRadius = subassemblies.reduce((maxRadius, child) => {
      const childPosition = vectorFromTriplet(child?.position ?? child?.transform?.position ?? [0, 0, 0]);
      const childMembers = Array.isArray(child?.members) ? child.members : [];
      const radius = 0.11 + Math.min(childMembers.length, 6) * 0.016;
      return Math.max(maxRadius, childPosition.length() + radius);
    }, 0);
    return Math.max(baseRadius, childRadius);
  }

  function formatComposerTimingStatus(documentData, diagnostics = {}) {
    const pauseCount = Array.isArray(documentData?.scene?.pauses) ? documentData.scene.pauses.length : 0;
    const warpCount = Array.isArray(documentData?.scene?.timeWarps) ? documentData.scene.timeWarps.length : 0;
    const parts = [
      `${pauseCount} pause${pauseCount === 1 ? "" : "s"}`,
      `${warpCount} warp${warpCount === 1 ? "" : "s"}`,
    ];
    const timingErrors = Array.isArray(diagnostics?.timingErrors) ? diagnostics.timingErrors : [];
    if (!timingErrors.length) {
      return `Timing OK: ${parts.join(" • ")}`;
    }
    const grouped = timingErrors.reduce((accumulator, entry) => {
      const existing = accumulator.get(entry.kind) ?? [];
      existing.push(entry.line);
      accumulator.set(entry.kind, existing);
      return accumulator;
    }, new Map());
    const detail = [...grouped.entries()]
      .map(([kind, lines]) => `${kind} line${lines.length === 1 ? "" : "s"} ${lines.join(", ")}`)
      .join("; ");
    return `Timing OK: ${parts.join(" • ")}. Ignored invalid ${detail}.`;
  }

  function formatComposerInlineTimingStatus(kind, diagnostics = {}, parsedCount = 0) {
    const invalidLines = Array.isArray(diagnostics?.[`${kind}ErrorLines`])
      ? diagnostics[`${kind}ErrorLines`]
      : [];
    const hasInput = !!diagnostics?.[`${kind}HasInput`];
    const label =
      kind === "marker" ? "timeline note" : kind === "pause" ? "pause" : "warp";
    if (!hasInput) {
      if (kind === "marker") {
        return {
          text: "No timeline notes authored.",
          invalid: false,
        };
      }
      return {
        text: `No ${label}s authored.`,
        invalid: false,
      };
    }
    if (invalidLines.length) {
      return {
        text: `Parsed ${parsedCount} ${label}${parsedCount === 1 ? "" : "s"}. Ignored invalid line${
          invalidLines.length === 1 ? "" : "s"
        } ${invalidLines.join(", ")}.`,
        invalid: true,
      };
    }
    return {
      text: `Parsed ${parsedCount} ${label}${parsedCount === 1 ? "" : "s"}.`,
      invalid: false,
    };
  }

  function updateComposerTimingDiagnostics(documentData, diagnostics = {}) {
    const markers = Array.isArray(documentData?.scene?.markers) ? documentData.scene.markers : [];
    const pauses = Array.isArray(documentData?.scene?.pauses) ? documentData.scene.pauses : [];
    const timeWarps = Array.isArray(documentData?.scene?.timeWarps) ? documentData.scene.timeWarps : [];
    const transfers = Array.isArray(documentData?.transfers) ? documentData.transfers : [];

    const markerCount = diagnostics?.markerHasInput ? markers.length : 0;
    const pauseCount = diagnostics?.pauseHasInput ? pauses.length : 0;
    const warpCount = diagnostics?.warpHasInput ? timeWarps.length : 0;

    const markerStatusModel = formatComposerInlineTimingStatus("marker", diagnostics, markerCount);
    const pauseStatusModel = formatComposerInlineTimingStatus("pause", diagnostics, pauseCount);
    const warpStatusModel = formatComposerInlineTimingStatus("warp", diagnostics, warpCount);
    const transferErrors = Array.isArray(diagnostics?.transferErrorLines) ? diagnostics.transferErrorLines : [];
    const transferHasInput = !!diagnostics?.transferHasInput;
    const transferStatusModel = !transferHasInput
      ? { text: "No transfers authored.", invalid: false }
      : transferErrors.length
        ? {
            text: `Parsed ${transfers.length} transfer${transfers.length === 1 ? "" : "s"}. Ignored invalid line${
              transferErrors.length === 1 ? "" : "s"
            } ${transferErrors.join(", ")}.`,
            invalid: true,
          }
        : {
            text: `Parsed ${transfers.length} transfer${transfers.length === 1 ? "" : "s"}.`,
            invalid: false,
          };

    if (markerStatus) {
      markerStatus.textContent = markerStatusModel.text;
      markerStatus.classList.toggle("is-invalid", markerStatusModel.invalid);
    }
    if (pauseStatus) {
      pauseStatus.textContent = pauseStatusModel.text;
      pauseStatus.classList.toggle("is-invalid", pauseStatusModel.invalid);
    }
    if (warpStatus) {
      warpStatus.textContent = warpStatusModel.text;
      warpStatus.classList.toggle("is-invalid", warpStatusModel.invalid);
    }
    if (transferStatus) {
      transferStatus.textContent = transferStatusModel.text;
      transferStatus.classList.toggle("is-invalid", transferStatusModel.invalid);
    }

    if (markerListInput) {
      markerListInput.classList.toggle("is-invalid", markerStatusModel.invalid);
    }
    if (pauseListInput) {
      pauseListInput.classList.toggle("is-invalid", pauseStatusModel.invalid);
    }
    if (warpListInput) {
      warpListInput.classList.toggle("is-invalid", warpStatusModel.invalid);
    }
    if (transferListInput) {
      transferListInput.classList.toggle("is-invalid", transferStatusModel.invalid);
    }

    return {
      markerStatus: markerStatusModel,
      pauseStatus: pauseStatusModel,
      warpStatus: warpStatusModel,
      transferStatus: transferStatusModel,
    };
  }

  function readComposerTimingState() {
    const durationRaw = readNumberInput(sceneDurationInput, 24);
    const duration = Math.max(1, Number(durationRaw.toFixed(3)));
    if (sceneDurationInput) {
      sceneDurationInput.value = String(duration);
    }
    const markers = [];
    const markerHasInput = false;
    const markerParse = {
      errors: [],
    };
    const pauseListRaw = pauseListInput?.value ?? "";
    const pauseHasInput = pauseListRaw.trim().length > 0;
    const pauseParse = parseComposerTimingLines(pauseListRaw, (line, lineNumber) => {
      const parts = line.split(",").map((part) => part.trim());
      if (parts.length !== 2) {
        return null;
      }
      const [rawStart, rawDuration] = parts.map((part) => Number(part));
      if (!Number.isFinite(rawStart) || !Number.isFinite(rawDuration) || rawDuration <= 0) {
        return null;
      }
      const span = clampComposerTimelineSpan(rawStart, rawStart + rawDuration, duration);
      return {
        id: `pause_authored_${lineNumber}`,
        start: span.start,
        duration: span.span,
      };
    });
    const pauses = [...pauseParse.entries].sort((left, right) => left.start - right.start);

    const warpListRaw = warpListInput?.value ?? "";
    const warpHasInput = warpListRaw.trim().length > 0;
    const warpParse = parseComposerTimingLines(warpListRaw, (line, lineNumber) => {
      const parts = line.split(",").map((part) => part.trim());
      if (parts.length !== 3) {
        return null;
      }
      const [rawStart, rawEnd, rawRate] = parts.map((part) => Number(part));
      if (
        !Number.isFinite(rawStart) ||
        !Number.isFinite(rawEnd) ||
        !Number.isFinite(rawRate) ||
        rawRate <= 0
      ) {
        return null;
      }
      const span = clampComposerTimelineSpan(rawStart, rawEnd, duration);
      return {
        id: `warp_authored_${lineNumber}`,
        start: span.start,
        end: span.end,
        rate: Number(rawRate.toFixed(3)),
      };
    });
    const timeWarps = [...warpParse.entries].sort((left, right) => left.start - right.start);

    return {
      time: {
        timeBase: "seconds",
        start: 0,
        end: duration,
        playbackRate: 1,
        loop: !!sceneLoopInput?.checked,
      },
      markers,
      pauses,
      timeWarps,
      diagnostics: {
        markerHasInput,
        pauseHasInput,
        warpHasInput,
        markerErrorLines: markerParse.errors,
        pauseErrorLines: pauseParse.errors,
        warpErrorLines: warpParse.errors,
        timingErrors: [
          ...markerParse.errors.map((line) => ({ kind: "graphic", line })),
          ...pauseParse.errors.map((line) => ({ kind: "pause", line })),
          ...warpParse.errors.map((line) => ({ kind: "warp", line })),
        ],
      },
    };
  }

  return {
    normalizeComposerTransferEndpoint,
    parseComposerTransfers,
    getComposerTimelineAuthoringItems,
    findComposerTimelineOverlap,
    reportComposerTimelineOverlap,
    getComposerGraphicEnd,
    getComposerGraphicDefaultTarget,
    decodeComposerGraphicTargetValue,
    getComposerGraphicTargetEntries,
    normalizeComposerMediaRect,
    sanitizeComposerMediaSource,
    normalizeComposerGraphicOverlayDraft,
    normalizeComposerGraphicOverlayList,
    getComposerGraphicOverlayDraftIndexById,
    getComposerGraphicOverlayDraftById,
    getNextComposerGraphicOverlayId,
    getComposerGraphicTimelineOverlays,
    getComposerViewportMediaTimelineOverlays,
    isComposerTimeWithinSpan,
    resolveComposerGraphicTargetPosition,
    getComposerAssemblyGraphicTargetRadius,
    formatComposerTimingStatus,
    formatComposerInlineTimingStatus,
    updateComposerTimingDiagnostics,
    readComposerTimingState,
  };
}
