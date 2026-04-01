import {
  buildComposerPreviewSceneData,
  createComposerSceneDocument,
} from "../../runtime/Composer2SceneDocumentRuntime.js";
import {
  formatComposerPauseList,
  formatComposerWarpList,
} from "../../runtime/ComposerTimelineRuntime.js";
import {
  importReactionFlowToComposerDraft,
  summarizeComposerReactionImport,
} from "./ComposerReactionFlowImportRuntime.js";

export function createComposerDocumentWorkspaceRuntime(options = {}) {
  const createSceneDocument = options.createSceneDocument ?? createComposerSceneDocument;
  const buildPreviewScene = options.buildPreviewSceneData ?? buildComposerPreviewSceneData;
  const importReactionFlowDocument =
    options.importReactionFlowDocument ?? importReactionFlowToComposerDraft;
  const documentLike = options.documentLike ?? globalThis.document ?? null;
  const storage = options.storage ?? globalThis.window?.localStorage ?? null;
  const storageKey = String(options.storageKey ?? "architrino.composer.library.v1");
  const nowIso = options.nowIso ?? (() => new Date().toISOString());
  const pickReactionFlowText =
    options.pickReactionFlowText ??
    (async () => {
      const picker = globalThis.window?.showOpenFilePicker;
      if (typeof picker === "function") {
        const [handle] = await picker({
          multiple: false,
          types: [
            {
              description: "Reaction Flow JSON",
              accept: {
                "application/json": [".json"],
              },
            },
          ],
        });
        if (!handle) {
          return null;
        }
        const file = await handle.getFile();
        return typeof file?.text === "function" ? file.text() : null;
      }
      if (typeof documentLike?.createElement !== "function") {
        return null;
      }
      return new Promise((resolve) => {
        const input = documentLike.createElement("input");
        input.type = "file";
        input.accept = ".json,application/json";
        input.style.display = "none";
        input.addEventListener("change", async () => {
          try {
            const file = input.files?.[0] ?? null;
            resolve(file && typeof file.text === "function" ? await file.text() : null);
          } finally {
            input.remove?.();
          }
        });
        documentLike.body?.appendChild?.(input);
        input.click?.();
      });
    });
  const confirmClear =
    options.confirmClear ??
    ((message) => globalThis.window?.confirm?.(message));
  const {
    sceneIdInput = null,
    sceneNameInput = null,
    sceneDurationInput = null,
    sceneLoopInput = null,
    markerListInput = null,
    pauseListInput = null,
    warpListInput = null,
    transferListInput = null,
    librarySelect = null,
    libraryLoadButton = null,
    libraryDeleteButton = null,
    libraryStatus = null,
    jsonPreview = null,
    frameScaleInput = null,
    frameScaleLabel = null,
    cameraSpeedInput = null,
    cameraSpeedLabel = null,
    cameraPoiSelect = null,
  } = options.dom ?? {};
  const {
    pathState = null,
    frameState = null,
    cameraState = null,
    cameraOrbitState = null,
    cameraFlightState = null,
    playbackState = null,
    palette = [],
  } = options.state ?? {};
  const {
    sanitizeSceneId = (value) => value,
    normalizeAssemblyDraft = (draft) => draft,
    normalizeAssemblyPathPoints = (points) => points ?? [],
    formatTransferList = () => "",
    normalizeGraphicOverlayList = (overlays) => overlays ?? [],
    parseTransfers = () => ({ entries: [], errors: [] }),
    readTimingState = () => ({
      time: { timeBase: "seconds", start: 0, end: 24, playbackRate: 1, loop: false },
      markers: [],
      pauses: [],
      timeWarps: [],
      diagnostics: {},
    }),
    updateTimingDiagnostics = () => {},
    formatTimingStatus = () => "",
    formatScaleLabel = (value) => String(value),
    clampFn = (value) => value,
    vectorFromTriplet = (triplet) => triplet,
    getTransferListRaw = () => transferListInput?.value ?? "",
  } = options.helpers ?? {};
  const {
    ensureAssemblyDrafts = () => {},
    persistPathStateToSelectedAssembly = () => {},
    renderAssemblyEditor = () => {},
    validateSelectedAssemblyId = () => null,
    setSelectedAssembly = () => {},
    rebuildControlPoints = () => {},
    updatePathGeometry = () => {},
    updatePointMaterials = () => {},
    updateFrame = () => {},
    syncCameraRadiusInput = () => {},
    stopCameraFlightPreview = () => {},
    updateCameraFlightDisplay = () => {},
    updateWaypointCount = () => {},
    updateCameraPoiStatus = () => {},
    updateCamera = () => {},
    updateViewportFromDocument = () => {},
    renderTimeline = () => {},
    updateTimelinePlayhead = () => {},
    setStatus = () => {},
  } = options.operations ?? {};
  const {
    getAssemblyDraftsState = () => [],
    setAssemblyDraftsState = () => {},
    updateAssemblyDraftByIdState = () => {},
    getGraphicOverlayDraftsState = () => [],
    setGraphicOverlayDraftsState = () => {},
    getSelectedPointIndexState = () => null,
    setSelectedPointIndexState = () => {},
    getSelectedAssemblyIdState = () => null,
    setTransferListRawStateValue = () => {},
    getSupplementalDraftState = () => ({}),
    setSupplementalDraftState = () => {},
    setCurrentDocument = () => {},
  } = options.accessors ?? {};

  function readComposerFormState() {
    const rawId = sceneIdInput?.value ?? "composer_scene";
    const id = sanitizeSceneId(rawId);
    if (sceneIdInput && sceneIdInput.value !== id) {
      sceneIdInput.value = id;
    }
    const rawName = sceneNameInput?.value ?? "";
    const name = rawName.trim() || "Composer Scene";
    ensureAssemblyDrafts();
    const transferListRaw = getTransferListRaw();
    const transferHasInput = transferListRaw.trim().length > 0;
    const transferParse = parseTransfers(transferListRaw);
    return {
      id,
      name,
      assembliesDraft: getAssemblyDraftsState().map((draft, index) =>
        normalizeAssemblyDraft(draft, index)
      ),
      transfers: transferParse.entries,
      transferListRaw,
      diagnostics: {
        transferHasInput,
        transferErrorLines: transferParse.errors,
      },
    };
  }

  function readComposerDraftState() {
    persistPathStateToSelectedAssembly();
    const state = readComposerFormState();
    const timing = readTimingState();
    const rawSupplementalDraftState = getSupplementalDraftState();
    const supplementalDraftState =
      rawSupplementalDraftState && typeof rawSupplementalDraftState === "object"
        ? rawSupplementalDraftState
        : {};
    const supplementalTransfers = Array.isArray(supplementalDraftState.transfers)
      ? supplementalDraftState.transfers
      : [];
    const formattedSupplementalTransferList = supplementalTransfers.length
      ? formatTransferList(supplementalTransfers)
      : "";
    const shouldReuseSupplementalTransfers =
      supplementalTransfers.length > 0 &&
      typeof state.transferListRaw === "string" &&
      state.transferListRaw.trim() === formattedSupplementalTransferList.trim();
    const primaryAssembly = Array.isArray(state.assembliesDraft) ? state.assembliesDraft[0] ?? null : null;
    const pathPoints = normalizeAssemblyPathPoints(primaryAssembly?.pathPoints);
    const cameraWaypoints = Array.isArray(cameraFlightState?.waypoints)
      ? cameraFlightState.waypoints.map((waypoint) => ({
          position: [
            Number(waypoint.position.x.toFixed(3)),
            Number(waypoint.position.y.toFixed(3)),
            Number(waypoint.position.z.toFixed(3)),
          ],
          lookAt: [
            Number(waypoint.lookAt.x.toFixed(3)),
            Number(waypoint.lookAt.y.toFixed(3)),
            Number(waypoint.lookAt.z.toFixed(3)),
          ],
        }))
      : [];
    return {
      ...state,
      ...timing,
      transfers: shouldReuseSupplementalTransfers ? supplementalTransfers : state.transfers,
      reactions: Array.isArray(supplementalDraftState.reactions)
        ? supplementalDraftState.reactions
        : [],
      overlays: normalizeGraphicOverlayList(
        getGraphicOverlayDraftsState(),
        Number(timing?.time?.end ?? 24) || 24
      ),
      markers:
        Array.isArray(supplementalDraftState.markers) && supplementalDraftState.markers.length
          ? supplementalDraftState.markers
          : timing.markers,
      cameraShots: Array.isArray(supplementalDraftState.cameraShots)
        ? supplementalDraftState.cameraShots
        : [],
      metadata:
        supplementalDraftState.metadata && typeof supplementalDraftState.metadata === "object"
          ? supplementalDraftState.metadata
          : undefined,
      markerListRaw: markerListInput?.value ?? "",
      pauseListRaw: pauseListInput?.value ?? "",
      warpListRaw: warpListInput?.value ?? "",
      transferListRaw: getTransferListRaw(),
      diagnostics: {
        ...(timing.diagnostics ?? {}),
        ...(state.diagnostics ?? {}),
      },
      pathPoints,
      pathInterpolate: primaryAssembly?.pathInterpolate ?? pathState?.interpolate,
      pathClosed: !!primaryAssembly?.pathClosed,
      frameRotation: [
        Number(frameState?.rotation?.x?.toFixed(4) ?? 0),
        Number(frameState?.rotation?.y?.toFixed(4) ?? 0),
        Number(frameState?.rotation?.z?.toFixed(4) ?? 0),
      ],
      frameScale: Number(frameState?.scale?.toFixed(4) ?? 1),
      cameraSpeed: Number(cameraState?.speed?.toFixed(4) ?? 1),
      cameraRadius: Number(cameraOrbitState?.radius?.toFixed(4) ?? 1),
      cameraOrbit: {
        theta: Number(cameraOrbitState?.theta?.toFixed(4) ?? 0),
        phi: Number(cameraOrbitState?.phi?.toFixed(4) ?? (Math.PI / 2).toFixed(4)),
      },
      cameraPoiMode: cameraFlightState?.poiMode,
      selectedPointIndex: Number.isInteger(getSelectedPointIndexState())
        ? getSelectedPointIndexState()
        : null,
      cameraWaypoints,
    };
  }

  function getComposerLibraryEntries() {
    try {
      if (typeof storage?.getItem !== "function") {
        return [];
      }
      const raw = storage?.getItem?.(storageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (_error) {
      return [];
    }
  }

  function writeComposerLibraryEntries(entries) {
    try {
      if (typeof storage?.setItem !== "function") {
        return false;
      }
      storage?.setItem?.(storageKey, JSON.stringify(entries));
      return true;
    } catch (_error) {
      return false;
    }
  }

  function getComposerSortedLibraryEntries() {
    return getComposerLibraryEntries().sort((left, right) => {
      const leftTime = Date.parse(left?.updatedAt ?? "") || 0;
      const rightTime = Date.parse(right?.updatedAt ?? "") || 0;
      return rightTime - leftTime;
    });
  }

  function refreshComposerLibraryUi(selectedId = null) {
    const entries = getComposerSortedLibraryEntries();

    if (librarySelect) {
      librarySelect.innerHTML = "";
      if (!entries.length) {
        const option = documentLike?.createElement?.("option") ?? { value: "", textContent: "" };
        option.value = "";
        option.textContent = "No saved scenes";
        librarySelect.appendChild?.(option);
        librarySelect.value = "";
      } else {
        entries.forEach((entry) => {
          const option = documentLike?.createElement?.("option") ?? { value: "", textContent: "" };
          option.value = entry.id;
          option.textContent = entry.name || entry.id;
          librarySelect.appendChild?.(option);
        });
        const preferredId = selectedId || librarySelect.value || entries[0].id;
        librarySelect.value = entries.some((entry) => entry.id === preferredId)
          ? preferredId
          : entries[0].id;
      }
      librarySelect.disabled = !entries.length;
    }

    if (libraryLoadButton) {
      libraryLoadButton.disabled = !entries.length;
    }
    if (libraryDeleteButton) {
      libraryDeleteButton.disabled = !entries.length;
    }
    if (libraryStatus) {
      libraryStatus.textContent = entries.length
        ? `${entries.length} saved scene${entries.length === 1 ? "" : "s"} in this browser. Export JSON to place one in the repo.`
        : "Library storage is browser-local for now. Save keeps drafts in this browser only.";
    }
  }

  function applyComposerDraftState(draftState = {}) {
    if (sceneIdInput) {
      sceneIdInput.value = sanitizeSceneId(draftState.id || "composer_scene");
    }
    if (sceneNameInput) {
      sceneNameInput.value = (draftState.name || "Composer Scene").trim() || "Composer Scene";
    }
    setAssemblyDraftsState(
      Array.isArray(draftState.assembliesDraft) && draftState.assembliesDraft.length
        ? draftState.assembliesDraft.map((draft, index) => normalizeAssemblyDraft(draft, index))
        : []
    );
    const assemblyDrafts = getAssemblyDraftsState();
    if (
      Array.isArray(draftState.pathPoints) &&
      draftState.pathPoints.length &&
      !assemblyDrafts.some((assembly) => Array.isArray(assembly?.pathPoints) && assembly.pathPoints.length)
    ) {
      updateAssemblyDraftByIdState(assemblyDrafts[0]?.id, (assembly) => ({
        ...assembly,
        pathPoints: normalizeAssemblyPathPoints(draftState.pathPoints),
        pathInterpolate: draftState.pathInterpolate === "polyline" ? "polyline" : "spline",
        pathClosed: !!draftState.pathClosed,
      }));
    }
    validateSelectedAssemblyId();
    renderAssemblyEditor();

    const duration = Math.max(1, Number(draftState?.time?.end ?? draftState?.time?.duration ?? 24) || 24);
    if (sceneDurationInput) {
      sceneDurationInput.value = String(duration);
    }
    if (sceneLoopInput) {
      sceneLoopInput.checked = !!draftState?.time?.loop;
    }
    if (markerListInput) {
      markerListInput.value = "";
    }
    if (pauseListInput) {
      pauseListInput.value =
        typeof draftState.pauseListRaw === "string"
          ? draftState.pauseListRaw
          : formatComposerPauseList(draftState.pauses);
    }
    if (warpListInput) {
      warpListInput.value =
        typeof draftState.warpListRaw === "string"
          ? draftState.warpListRaw
          : formatComposerWarpList(draftState.timeWarps);
    }
    if (transferListInput) {
      transferListInput.value =
        typeof draftState.transferListRaw === "string"
          ? draftState.transferListRaw
          : formatTransferList(draftState.transfers);
    }
    setTransferListRawStateValue(
      typeof draftState.transferListRaw === "string"
        ? draftState.transferListRaw
        : formatTransferList(draftState.transfers)
    );
    setSupplementalDraftState({
      transfers: Array.isArray(draftState.transfers) ? draftState.transfers : [],
      reactions: Array.isArray(draftState.reactions) ? draftState.reactions : [],
      markers: Array.isArray(draftState.markers) ? draftState.markers : [],
      cameraShots: Array.isArray(draftState.cameraShots) ? draftState.cameraShots : [],
      metadata: draftState.metadata && typeof draftState.metadata === "object" ? draftState.metadata : null,
    });
    setGraphicOverlayDraftsState(
      normalizeGraphicOverlayList(draftState.overlays, duration)
    );

    setSelectedAssembly(getSelectedAssemblyIdState(), {
      persistCurrentPath: false,
    });
    setSelectedPointIndexState(
      Number.isInteger(draftState.selectedPointIndex) &&
      draftState.selectedPointIndex >= 0 &&
      draftState.selectedPointIndex < (pathState?.points?.length ?? 0)
        ? draftState.selectedPointIndex
        : null
    );
    rebuildControlPoints();
    updatePathGeometry();
    updatePointMaterials();

    const frameRotation = Array.isArray(draftState.frameRotation) ? draftState.frameRotation : [0, 0, 0];
    frameState?.rotation?.set?.(
      Number(frameRotation[0] ?? 0) || 0,
      Number(frameRotation[1] ?? 0) || 0,
      Number(frameRotation[2] ?? 0) || 0,
      "YXZ"
    );
    if (frameState) {
      frameState.scale = Math.max(0.01, Number(draftState.frameScale ?? 1) || 1);
    }
    if (frameScaleInput && frameState) {
      frameScaleInput.value = Math.log10(frameState.scale).toFixed(2);
    }
    if (frameScaleLabel && frameState) {
      frameScaleLabel.textContent = formatScaleLabel(frameState.scale);
    }
    updateFrame();

    if (cameraState) {
      cameraState.speed = Math.max(0.01, Number(draftState.cameraSpeed ?? 1) || 1);
    }
    if (cameraSpeedInput && cameraState) {
      cameraSpeedInput.value = Math.log10(cameraState.speed).toFixed(2);
    }
    if (cameraSpeedLabel && cameraState) {
      cameraSpeedLabel.textContent = formatScaleLabel(cameraState.speed);
    }
    if (cameraOrbitState) {
      cameraOrbitState.radius = Math.max(
        cameraOrbitState.minDistance,
        Number(draftState.cameraRadius ?? cameraOrbitState.radius ?? 1) || 1
      );
      cameraOrbitState.theta =
        Number(draftState?.cameraOrbit?.theta ?? cameraOrbitState.theta) || 0;
      cameraOrbitState.phi = clampFn(
        Number(draftState?.cameraOrbit?.phi ?? cameraOrbitState.phi) || Math.PI / 2,
        0.05,
        Math.PI - 0.05
      );
    }
    syncCameraRadiusInput();

    if (cameraFlightState) {
      cameraFlightState.poiMode = draftState.cameraPoiMode === "selected" ? "selected" : "origin";
    }
    if (cameraPoiSelect && cameraFlightState) {
      cameraPoiSelect.value = cameraFlightState.poiMode;
    }
    if (cameraFlightState) {
      cameraFlightState.waypoints = Array.isArray(draftState.cameraWaypoints)
        ? draftState.cameraWaypoints.map((waypoint) => ({
            position: vectorFromTriplet(waypoint?.position),
            lookAt: vectorFromTriplet(waypoint?.lookAt),
          }))
        : [];
    }
    stopCameraFlightPreview();
    updateCameraFlightDisplay();
    updateWaypointCount();
    updateCameraPoiStatus();
    updateCamera();
  }

  function buildComposerDocumentData(draftState, runtimeOptions = {}) {
    return createSceneDocument(draftState, runtimeOptions);
  }

  function buildComposerPreviewData(documentData, runtimeOptions = {}) {
    return buildPreviewScene(documentData, {
      palette,
      ...runtimeOptions,
    });
  }

  function saveComposerSceneToLibrary() {
    const draftState = readComposerDraftState();
    const sceneDocument = buildComposerDocumentData(draftState);
    const entries = getComposerLibraryEntries().filter((entry) => entry?.id !== draftState.id);
    entries.push({
      id: draftState.id,
      name: draftState.name,
      updatedAt: nowIso(),
      draftState,
      sceneDocument,
    });
    if (!writeComposerLibraryEntries(entries)) {
      setStatus("Library save failed. Browser storage is unavailable.");
      refreshComposerLibraryUi();
      return;
    }
    refreshComposerLibraryUi(draftState.id);
    setStatus(`Saved ${draftState.name} to the browser library.`);
  }

  function loadComposerSceneFromLibrary(sceneId = librarySelect?.value) {
    const entry = getComposerLibraryEntries().find((candidate) => candidate?.id === sceneId);
    if (!entry?.draftState) {
      setStatus("Select a saved scene to load.");
      refreshComposerLibraryUi();
      return;
    }
    applyComposerDraftState(entry.draftState);
    refreshComposerLibraryUi(entry.id);
    renderComposerJsonPreview();
    setStatus(`Loaded ${entry.name || entry.id} from the browser library.`);
  }

  function clearComposerScene() {
    const confirmed = confirmClear("Clear the current composer scene and reset it to a blank canvas?");
    if (confirmed === false) {
      return;
    }
    const nextId = sanitizeSceneId(sceneIdInput?.value ?? "composer_scene");
    const nextName = String(sceneNameInput?.value ?? "Composer Scene").trim() || "Composer Scene";
    applyComposerDraftState({
      id: nextId,
      name: nextName,
      assembliesDraft: [],
      time: {
        timeBase: "seconds",
        start: 0,
        end: 24,
        playbackRate: 1,
        loop: false,
      },
      pauses: [],
      timeWarps: [],
      transfers: [],
      reactions: [],
      overlays: [],
      cameraWaypoints: [],
      transferListRaw: "",
      pauseListRaw: "",
      warpListRaw: "",
      markerListRaw: "",
      selectedPointIndex: null,
      diagnostics: {},
    });
    renderComposerJsonPreview();
    setStatus(`Cleared ${nextName}.`);
  }

  function deleteComposerSceneFromLibrary(sceneId = librarySelect?.value) {
    if (!sceneId) {
      setStatus("Select a saved scene to delete.");
      refreshComposerLibraryUi();
      return;
    }
    const entries = getComposerLibraryEntries();
    const nextEntries = entries.filter((entry) => entry?.id !== sceneId);
    if (nextEntries.length === entries.length) {
      refreshComposerLibraryUi();
      return;
    }
    if (!writeComposerLibraryEntries(nextEntries)) {
      setStatus("Library delete failed. Browser storage is unavailable.");
      refreshComposerLibraryUi(sceneId);
      return;
    }
    refreshComposerLibraryUi();
    setStatus(`Deleted ${sceneId} from the browser library.`);
  }

  function renderComposerJsonPreview() {
    persistPathStateToSelectedAssembly();
    const draftState = readComposerDraftState();
    const documentData = buildComposerDocumentData(draftState);
    try {
      updateViewportFromDocument(documentData);
    } catch (error) {
      setCurrentDocument(documentData);
      console.error("Composer preview render failed.", error);
      try {
        renderTimeline(documentData);
        updateTimelinePlayhead(playbackState?.playheadSeconds ?? 0, documentData);
      } catch (timelineError) {
        console.error("Composer timeline fallback failed.", timelineError);
      }
    }
    updateTimingDiagnostics(documentData, draftState.diagnostics);
    refreshComposerLibraryUi();
    setStatus(formatTimingStatus(documentData, draftState.diagnostics));
    if (jsonPreview) {
      jsonPreview.textContent = JSON.stringify(documentData, null, 2);
    }
  }

  async function importReactionFlowFromPicker() {
    let rawText = null;
    try {
      rawText = await pickReactionFlowText();
    } catch (error) {
      if (error?.name === "AbortError") {
        setStatus("Reaction import canceled.");
        return null;
      }
      setStatus("Reaction import failed before a file could be read.");
      throw error;
    }
    if (typeof rawText !== "string" || !rawText.trim()) {
      setStatus("Select a reaction-flow JSON file to import.");
      return null;
    }
    return importReactionFlowFromText(rawText);
  }

  function importReactionFlowFromText(rawText = "") {
    let parsedDocument = null;
    try {
      parsedDocument = JSON.parse(rawText);
    } catch (_error) {
      setStatus("Reaction import failed. The selected file is not valid JSON.");
      return null;
    }
    let importPayload = null;
    try {
      importPayload = importReactionFlowDocument(parsedDocument, {
        nowIso,
      });
    } catch (error) {
      setStatus(error?.message || "Reaction import failed.");
      return null;
    }
    if (!importPayload?.draftState) {
      setStatus("Reaction import failed. Composer did not receive a draft scene.");
      return null;
    }
    applyComposerDraftState(importPayload.draftState);
    renderComposerJsonPreview();
    setStatus(summarizeComposerReactionImport(importPayload.importResult));
    return importPayload;
  }

  return {
    readComposerFormState,
    readComposerDraftState,
    getComposerLibraryEntries,
    writeComposerLibraryEntries,
    getComposerSortedLibraryEntries,
    refreshComposerLibraryUi,
    applyComposerDraftState,
    buildComposerDocumentData,
    buildComposerPreviewData,
    saveComposerSceneToLibrary,
    loadComposerSceneFromLibrary,
    clearComposerScene,
    deleteComposerSceneFromLibrary,
    renderComposerJsonPreview,
    importReactionFlowFromPicker,
    importReactionFlowFromText,
  };
}
