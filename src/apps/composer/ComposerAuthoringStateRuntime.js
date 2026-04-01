export function createComposerAuthoringStateRuntime(options = {}) {
  const draftStateRuntime = options.draftStateRuntime ?? {};
  const getPathState =
    typeof options.getPathState === "function" ? options.getPathState : () => null;
  const getPlaybackState =
    typeof options.getPlaybackState === "function" ? options.getPlaybackState : () => null;
  const pathModeSelect = options.dom?.pathModeSelect ?? null;
  const transferListInput = options.dom?.transferListInput ?? null;
  const sceneDurationInput = options.dom?.sceneDurationInput ?? null;
  const sceneLoopInput = options.dom?.sceneLoopInput ?? null;
  const parseTransfers =
    typeof options.parseTransfers === "function"
      ? options.parseTransfers
      : () => ({ entries: [] });
  const createDefaultPathPoints =
    typeof options.createDefaultPathPoints === "function"
      ? options.createDefaultPathPoints
      : () => [];
  const normalizeAssemblyPathPoints =
    typeof options.normalizeAssemblyPathPoints === "function"
      ? options.normalizeAssemblyPathPoints
      : () => [];
  const normalizePathPoint =
    typeof options.normalizePathPoint === "function"
      ? options.normalizePathPoint
      : (point) => point;
  const vectorFromTriplet =
    typeof options.vectorFromTriplet === "function"
      ? options.vectorFromTriplet
      : (value) => value;
  const rebuildControlPoints =
    typeof options.operations?.rebuildControlPoints === "function"
      ? options.operations.rebuildControlPoints
      : () => {};
  const updatePathGeometry =
    typeof options.operations?.updatePathGeometry === "function"
      ? options.operations.updatePathGeometry
      : () => {};
  const updateCameraPoiStatus =
    typeof options.operations?.updateCameraPoiStatus === "function"
      ? options.operations.updateCameraPoiStatus
      : () => {};
  const windowLike = options.windowLike ?? globalThis.window;

  function appendAuthoringLine(rawValue, nextLine) {
    const normalizedLine = String(nextLine ?? "").trim();
    if (!normalizedLine) {
      return String(rawValue ?? "");
    }
    const existing = String(rawValue ?? "").trim();
    return existing ? `${existing}\n${normalizedLine}` : normalizedLine;
  }

  function replaceAuthoringLineById(rawValue, authoredId, nextLine = null) {
    const lines = String(rawValue ?? "").split(/\n/);
    const match = String(authoredId ?? "").match(/_(\d+)$/);
    if (!match) {
      return String(rawValue ?? "");
    }
    const lineIndex = Number(match[1]) - 1;
    if (lineIndex < 0 || lineIndex >= lines.length) {
      return String(rawValue ?? "");
    }
    if (nextLine == null || !String(nextLine).trim()) {
      lines.splice(lineIndex, 1);
    } else {
      lines[lineIndex] = String(nextLine).trim();
    }
    return lines.filter((line) => String(line).trim()).join("\n");
  }

  function setSceneDurationValue(value = 24) {
    const duration = Math.max(1, Number(Number(value ?? 24).toFixed(3)) || 24);
    if (sceneDurationInput) {
      sceneDurationInput.value = String(duration);
    }
    return duration;
  }

  function setSceneLoopValue(value = false) {
    const loop = !!value;
    if (sceneLoopInput) {
      sceneLoopInput.checked = loop;
    }
    return loop;
  }

  function getTransferListRaw() {
    return transferListInput?.value ?? draftStateRuntime.getTransferListRawStateValue?.() ?? "";
  }

  function setTransferListRaw(value = "") {
    const nextValue = draftStateRuntime.setTransferListRawStateValue?.(value) ?? String(value ?? "");
    if (transferListInput) {
      transferListInput.value = nextValue;
    }
    return nextValue;
  }

  function appendTransferLine(line) {
    return setTransferListRaw(appendAuthoringLine(getTransferListRaw(), line));
  }

  function getParsedTransferEntries(rawText = getTransferListRaw()) {
    return parseTransfers(rawText).entries;
  }

  function getAssemblyMemberIds(assembly) {
    const members = Array.isArray(assembly?.members) ? assembly.members : [];
    return members
      .map((member) => (typeof member === "string" ? member : member?.id))
      .map((memberId) => String(memberId ?? "").trim())
      .filter(Boolean);
  }

  function promptAssemblyMemberId(assembly, promptLabel, fallbackPrefix = "member") {
    const memberIds = getAssemblyMemberIds(assembly);
    const defaultValue = memberIds[0] ?? `${fallbackPrefix}_1`;
    const hint = memberIds.length
      ? `Available: ${memberIds.join(", ")}`
      : "No members yet. Type a member id.";
    const response = windowLike?.prompt?.(`${promptLabel}\n${hint}`, defaultValue);
    const value = String(response ?? "").trim();
    return value || null;
  }

  function clearPendingTransfer() {
    return draftStateRuntime.clearPendingTransferSourceState?.() ?? null;
  }

  function startTransferFromAssembly(assembly) {
    if (!assembly?.id) {
      return false;
    }
    const memberId = promptAssemblyMemberId(assembly, "Source member for this transfer?");
    if (!memberId) {
      return false;
    }
    draftStateRuntime.setPendingTransferSourceState?.({
      assemblyId: assembly.id,
      memberId,
    });
    return true;
  }

  function completeTransferToAssembly(assembly) {
    const pendingTransferSource = draftStateRuntime.getPendingTransferSourceState?.() ?? null;
    if (!pendingTransferSource?.assemblyId || !assembly?.id) {
      return false;
    }
    const targetMemberId = promptAssemblyMemberId(assembly, "Target member for this transfer?");
    if (!targetMemberId) {
      return false;
    }
    const playbackState = getPlaybackState() ?? {};
    const defaultTime = Number((playbackState.playheadSeconds ?? 0).toFixed(3));
    const rawTime = windowLike?.prompt?.("Transfer time in seconds?", String(defaultTime));
    if (rawTime == null) {
      return false;
    }
    const parsedTime = Number(rawTime);
    if (!Number.isFinite(parsedTime)) {
      return false;
    }
    appendTransferLine(
      `${pendingTransferSource.assemblyId}.${pendingTransferSource.memberId} -> ${assembly.id}.${targetMemberId} @ ${Number(parsedTime.toFixed(3))}`
    );
    clearPendingTransfer();
    return true;
  }

  function persistPathStateToAssembly(assemblyId) {
    if (!draftStateRuntime.getAssemblyDraftById?.(assemblyId)) {
      return;
    }
    const pathState = getPathState();
    draftStateRuntime.updateAssemblyDraftByIdState?.(assemblyId, (assembly) => ({
      ...assembly,
      pathPoints: (pathState?.points ?? []).map((point) => normalizePathPoint(point)),
      pathInterpolate: pathState?.interpolate,
      pathClosed: !!pathState?.closed,
    }));
  }

  function loadPathStateFromSelectedAssembly() {
    let selectedAssembly = draftStateRuntime.getSelectedAssembly?.() ?? null;
    const pathState = getPathState();
    if (!pathState) {
      return;
    }
    if (!selectedAssembly) {
      draftStateRuntime.mutatePathStateState?.((currentPathState) => {
        currentPathState.interpolate = pathModeSelect?.value || "spline";
        currentPathState.closed = false;
        currentPathState.ownerAssemblyId = null;
        currentPathState.points = [];
      });
      draftStateRuntime.setSelectedPointIndexState?.(null);
      if (pathModeSelect) {
        pathModeSelect.value = pathState.interpolate;
      }
      rebuildControlPoints();
      updatePathGeometry();
      return;
    }
    if (
      !Array.isArray(selectedAssembly.pathPoints) ||
      !selectedAssembly.pathPoints.length
    ) {
      const anchor = Array.isArray(selectedAssembly.position) ? selectedAssembly.position : [0, 0, 0];
      draftStateRuntime.updateAssemblyDraftByIdState?.(selectedAssembly.id, (assembly) => ({
        ...assembly,
        pathPoints: createDefaultPathPoints(anchor),
        pathInterpolate: assembly.pathInterpolate === "polyline" ? "polyline" : "spline",
        pathClosed: !!assembly.pathClosed,
      }));
      selectedAssembly =
        draftStateRuntime.getAssemblyDraftById?.(selectedAssembly.id) ?? selectedAssembly;
    }
    draftStateRuntime.mutatePathStateState?.((currentPathState) => {
      currentPathState.interpolate =
        selectedAssembly?.pathInterpolate === "polyline" ? "polyline" : "spline";
      currentPathState.closed = !!selectedAssembly?.pathClosed;
      currentPathState.ownerAssemblyId = selectedAssembly?.id ?? null;
      currentPathState.points = normalizeAssemblyPathPoints(selectedAssembly?.pathPoints).map(
        (point) => vectorFromTriplet(point)
      );
    });
    if (pathModeSelect) {
      pathModeSelect.value = pathState.interpolate;
    }
    const selectedPointIndex = draftStateRuntime.getSelectedPointIndexState?.();
    draftStateRuntime.setSelectedPointIndexState?.(
      Number.isInteger(selectedPointIndex) && selectedPointIndex < pathState.points.length
        ? selectedPointIndex
        : null
    );
    rebuildControlPoints();
    updatePathGeometry();
  }

  function persistPathStateToSelectedAssembly() {
    const pathState = getPathState();
    const targetAssemblyId =
      pathState?.ownerAssemblyId &&
      draftStateRuntime.getAssemblyDraftById?.(pathState.ownerAssemblyId)
        ? pathState.ownerAssemblyId
        : draftStateRuntime.validateSelectedAssemblyId?.();
    if (!targetAssemblyId) {
      return;
    }
    persistPathStateToAssembly(targetAssemblyId);
  }

  function setSelectedAssembly(assemblyId, options = {}) {
    const { persistCurrentPath = true, loadPath = true } = options;
    draftStateRuntime.ensureAssemblyDrafts?.();
    const assemblyDrafts = draftStateRuntime.getAssemblyDraftsState?.() ?? [];
    const nextAssemblyId = draftStateRuntime.validateSelectedAssemblyId?.(assemblyId) ?? null;
    if (!nextAssemblyId) {
      draftStateRuntime.setSelectedAssemblyIdState?.(null);
      draftStateRuntime.mutatePathStateState?.((pathState) => {
        pathState.ownerAssemblyId = null;
        pathState.points = [];
        pathState.closed = false;
      });
      draftStateRuntime.setSelectedPointIndexState?.(null);
      rebuildControlPoints();
      updatePathGeometry();
      return null;
    }
    const pathState = getPathState();
    const currentOwnerId = pathState?.ownerAssemblyId;
    if (
      persistCurrentPath &&
      currentOwnerId &&
      assemblyDrafts.some((assembly) => assembly?.id === currentOwnerId)
    ) {
      persistPathStateToAssembly(currentOwnerId);
    }
    draftStateRuntime.setSelectedAssemblyIdState?.(nextAssemblyId);
    if (loadPath) {
      loadPathStateFromSelectedAssembly();
    }
    return nextAssemblyId;
  }

  return {
    appendAuthoringLine,
    replaceAuthoringLineById,
    setSceneDurationValue,
    setSceneLoopValue,
    getTransferListRaw,
    setTransferListRaw,
    appendTransferLine,
    getParsedTransferEntries,
    clearPendingTransfer,
    startTransferFromAssembly,
    completeTransferToAssembly,
    persistPathStateToAssembly,
    loadPathStateFromSelectedAssembly,
    persistPathStateToSelectedAssembly,
    setSelectedAssembly,
    updateCameraPoiStatus,
  };
}
