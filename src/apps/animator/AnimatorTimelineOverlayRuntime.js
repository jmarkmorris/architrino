import {
  clampAnimatorTimelineSpan,
  PDGVIEW_TIMELINE_MIN_DURATION_SECONDS,
  findAnimatorTimelineOverlap as findAnimatorTimelineOverlapRuntime,
  getAnimatorTimelineAuthoringItems as getAnimatorTimelineAuthoringItemsRuntime,
  parseAnimatorTimingLines,
} from "../../runtime/AnimatorTimelineRuntime.js";
import {
  decodeAnimatorGraphicTargetValue as decodeAnimatorGraphicTargetValueRuntime,
  getAnimatorGraphicDefaultTarget as getAnimatorGraphicDefaultTargetRuntime,
  getAnimatorGraphicOverlayDraftIndexById as getAnimatorGraphicOverlayDraftIndexByIdRuntime,
  getAnimatorGraphicOverlayLabel,
  getAnimatorGraphicTargetEntries as getAnimatorGraphicTargetEntriesRuntime,
  getAnimatorGraphicTimelineOverlays as getAnimatorGraphicTimelineOverlaysRuntime,
  getAnimatorMediaOverlayLabel,
  getAnimatorViewportMediaTimelineOverlays as getAnimatorViewportMediaTimelineOverlaysRuntime,
  getNextAnimatorGraphicOverlayId as getNextAnimatorGraphicOverlayIdRuntime,
  normalizeAnimatorGraphicOverlayDraft as normalizeAnimatorGraphicOverlayDraftRuntime,
  normalizeAnimatorGraphicOverlayList as normalizeAnimatorGraphicOverlayListRuntime,
  normalizeAnimatorMediaRect as normalizeAnimatorMediaRectRuntime,
  sanitizeAnimatorMediaSource as sanitizeAnimatorMediaSourceRuntime,
} from "../../runtime/AnimatorOverlayRuntime.js";

export function createAnimatorTimelineOverlayRuntime(options = {}) {
  const clampFn = options.clampFn ?? ((value) => value);
  const minDurationSeconds =
    Number(options.minDurationSeconds) || PDGVIEW_TIMELINE_MIN_DURATION_SECONDS;
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

  function normalizeAnimatorTransferEndpoint(rawEndpoint) {
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

  function parseAnimatorTransfers(rawText) {
    return parseAnimatorTimingLines(rawText, (line, lineNumber) => {
      const [mappingPart, rawTimePart] = line.split("@").map((part) => part.trim());
      const mappingMatch = mappingPart.match(/^(.+?)\s*->\s*(.+)$/);
      if (!mappingMatch) {
        return null;
      }
      const source = normalizeAnimatorTransferEndpoint(mappingMatch[1]);
      const target = normalizeAnimatorTransferEndpoint(mappingMatch[2]);
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

  function getAnimatorTimelineAuthoringItems(documentData = getCurrentDocument()) {
    return getAnimatorTimelineAuthoringItemsRuntime(documentData, {
      getGraphicLabel: getAnimatorGraphicOverlayLabel,
      getMediaLabel: getAnimatorMediaOverlayLabel,
    });
  }

  function findAnimatorTimelineOverlap(candidate, runtimeOptions = {}) {
    return findAnimatorTimelineOverlapRuntime(candidate, {
      ...runtimeOptions,
      getGraphicLabel: getAnimatorGraphicOverlayLabel,
      getMediaLabel: getAnimatorMediaOverlayLabel,
    });
  }

  function reportAnimatorTimelineOverlap(conflict) {
    if (!conflict) {
      return;
    }
    setStatus(
      `Timeline items may not overlap. ${conflict.label} already occupies ${formatTimeLabel(conflict.start)}-${formatTimeLabel(conflict.end)}.`
    );
  }

  function getAnimatorGraphicEnd(marker, sceneDuration = null) {
    const start = Number(marker?.t ?? 0);
    const explicitEnd = Number(marker?.end);
    const end = Number.isFinite(explicitEnd) ? explicitEnd : start;
    if (!Number.isFinite(sceneDuration)) {
      return end;
    }
    return clampFn(end, start, Number(sceneDuration));
  }

  function getAnimatorGraphicDefaultTarget() {
    const assemblyDrafts = getAssemblyDrafts();
    return getAnimatorGraphicDefaultTargetRuntime({
      selectedAssemblyId: sanitizeEntityId(getSelectedAssemblyId(), ""),
      fallbackAssemblyId: sanitizeEntityId(assemblyDrafts[0]?.id, ""),
      selectedPointIndex: getSelectedPointIndex(),
    });
  }

  function decodeAnimatorGraphicTargetValue(rawValue) {
    return decodeAnimatorGraphicTargetValueRuntime(rawValue, {
      sanitizeTarget: (target) => sanitizeTarget(target),
    });
  }

  function getAnimatorGraphicTargetEntries() {
    return getAnimatorGraphicTargetEntriesRuntime({
      assemblyDrafts: getAssemblyDrafts(),
      getAssemblyLetter,
      normalizeAssemblyPathPoints,
    });
  }

  function normalizeAnimatorMediaRect(rawRect, kind = "image") {
    return normalizeAnimatorMediaRectRuntime(rawRect, kind, {
      clampFn,
    });
  }

  function sanitizeAnimatorMediaSource(rawSource, kind = "image") {
    return sanitizeAnimatorMediaSourceRuntime(rawSource, kind, {
      supportedExtensions: supportedMediaExtensions,
    });
  }

  function normalizeAnimatorGraphicOverlayDraft(overlay = {}, index = 0, duration = 24) {
    const normalized = normalizeAnimatorGraphicOverlayDraftRuntime(overlay, index, duration, {
      clampFn,
      clampTimelineSpan: clampAnimatorTimelineSpan,
      minDurationSeconds,
      getDefaultTarget: () => getAnimatorGraphicDefaultTarget(),
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

  function normalizeAnimatorGraphicOverlayList(overlays = [], duration = 24) {
    return normalizeAnimatorGraphicOverlayListRuntime(overlays, duration, {
      clampFn,
      clampTimelineSpan: clampAnimatorTimelineSpan,
      minDurationSeconds,
      getDefaultTarget: () => getAnimatorGraphicDefaultTarget(),
      sanitizeTarget: (target, fallbackAssemblyId = "") =>
        sanitizeTarget(target, fallbackAssemblyId),
      mediaAssetDirectories,
      supportedMediaExtensions,
    }).map((overlay, index) => ({
      ...overlay,
      id: sanitizeEntityId(overlay?.id, `overlay_${index + 1}`),
    }));
  }

  function getAnimatorGraphicOverlayDraftIndexById(overlayId) {
    return getAnimatorGraphicOverlayDraftIndexByIdRuntime(getGraphicOverlayDrafts(), overlayId);
  }

  function getAnimatorGraphicOverlayDraftById(overlayId) {
    const index = getAnimatorGraphicOverlayDraftIndexById(overlayId);
    const overlayDrafts = getGraphicOverlayDrafts();
    return index >= 0 ? overlayDrafts[index] : null;
  }

  function getNextAnimatorGraphicOverlayId() {
    return getNextAnimatorGraphicOverlayIdRuntime(getGraphicOverlayDrafts());
  }

  function getAnimatorGraphicTimelineOverlays(documentData = getCurrentDocument()) {
    return getAnimatorGraphicTimelineOverlaysRuntime(documentData);
  }

  function getAnimatorViewportMediaTimelineOverlays(documentData = getCurrentDocument()) {
    return getAnimatorViewportMediaTimelineOverlaysRuntime(documentData);
  }

  function isAnimatorTimeWithinSpan(timeSeconds, startSeconds, endSeconds, epsilon = 0.001) {
    const time = Number(timeSeconds);
    const start = Number(startSeconds);
    const end = Number(endSeconds);
    if (!Number.isFinite(time) || !Number.isFinite(start) || !Number.isFinite(end)) {
      return false;
    }
    return time >= start - epsilon && time <= end + epsilon;
  }

  function resolveAnimatorGraphicTargetPosition(
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

  function getAnimatorAssemblyGraphicTargetRadius(assembly) {
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

  function formatAnimatorTimingStatus(documentData, diagnostics = {}) {
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

  function formatAnimatorInlineTimingStatus(kind, diagnostics = {}, parsedCount = 0) {
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

  function updateAnimatorTimingDiagnostics(documentData, diagnostics = {}) {
    const markers = Array.isArray(documentData?.scene?.markers) ? documentData.scene.markers : [];
    const pauses = Array.isArray(documentData?.scene?.pauses) ? documentData.scene.pauses : [];
    const timeWarps = Array.isArray(documentData?.scene?.timeWarps) ? documentData.scene.timeWarps : [];
    const transfers = Array.isArray(documentData?.transfers) ? documentData.transfers : [];

    const markerCount = diagnostics?.markerHasInput ? markers.length : 0;
    const pauseCount = diagnostics?.pauseHasInput ? pauses.length : 0;
    const warpCount = diagnostics?.warpHasInput ? timeWarps.length : 0;

    const markerStatusModel = formatAnimatorInlineTimingStatus("marker", diagnostics, markerCount);
    const pauseStatusModel = formatAnimatorInlineTimingStatus("pause", diagnostics, pauseCount);
    const warpStatusModel = formatAnimatorInlineTimingStatus("warp", diagnostics, warpCount);
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

  function readAnimatorTimingState() {
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
    const pauseParse = parseAnimatorTimingLines(pauseListRaw, (line, lineNumber) => {
      const parts = line.split(",").map((part) => part.trim());
      if (parts.length !== 2) {
        return null;
      }
      const [rawStart, rawDuration] = parts.map((part) => Number(part));
      if (!Number.isFinite(rawStart) || !Number.isFinite(rawDuration) || rawDuration <= 0) {
        return null;
      }
      const span = clampAnimatorTimelineSpan(rawStart, rawStart + rawDuration, duration);
      return {
        id: `pause_authored_${lineNumber}`,
        start: span.start,
        duration: span.span,
      };
    });
    const pauses = [...pauseParse.entries].sort((left, right) => left.start - right.start);

    const warpListRaw = warpListInput?.value ?? "";
    const warpHasInput = warpListRaw.trim().length > 0;
    const warpParse = parseAnimatorTimingLines(warpListRaw, (line, lineNumber) => {
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
      const span = clampAnimatorTimelineSpan(rawStart, rawEnd, duration);
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
    normalizeAnimatorTransferEndpoint,
    parseAnimatorTransfers,
    getAnimatorTimelineAuthoringItems,
    findAnimatorTimelineOverlap,
    reportAnimatorTimelineOverlap,
    getAnimatorGraphicEnd,
    getAnimatorGraphicDefaultTarget,
    decodeAnimatorGraphicTargetValue,
    getAnimatorGraphicTargetEntries,
    normalizeAnimatorMediaRect,
    sanitizeAnimatorMediaSource,
    normalizeAnimatorGraphicOverlayDraft,
    normalizeAnimatorGraphicOverlayList,
    getAnimatorGraphicOverlayDraftIndexById,
    getAnimatorGraphicOverlayDraftById,
    getNextAnimatorGraphicOverlayId,
    getAnimatorGraphicTimelineOverlays,
    getAnimatorViewportMediaTimelineOverlays,
    isAnimatorTimeWithinSpan,
    resolveAnimatorGraphicTargetPosition,
    getAnimatorAssemblyGraphicTargetRadius,
    formatAnimatorTimingStatus,
    formatAnimatorInlineTimingStatus,
    updateAnimatorTimingDiagnostics,
    readAnimatorTimingState,
  };
}
