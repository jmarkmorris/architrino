import test from "node:test";
import assert from "node:assert/strict";

import { createComposerDocumentWorkspaceRuntime } from "../src/apps/composer/ComposerDocumentWorkspaceRuntime.js";

function createSelectElement() {
  return {
    innerHTML: "",
    value: "",
    disabled: false,
    options: [],
    appendChild(option) {
      this.options.push(option);
    },
  };
}

test("composer document workspace runtime sorts browser library entries and refreshes the library ui", () => {
  const storage = {
    getItem() {
      return JSON.stringify([
        { id: "older", name: "Older", updatedAt: "2026-03-30T00:00:00.000Z" },
        { id: "newer", name: "Newer", updatedAt: "2026-04-01T00:00:00.000Z" },
      ]);
    },
  };
  const librarySelect = createSelectElement();
  const libraryLoadButton = { disabled: true };
  const libraryDeleteButton = { disabled: true };
  const libraryStatus = { textContent: "" };
  const runtime = createComposerDocumentWorkspaceRuntime({
    createSceneDocument(draftState) {
      return { scene: { id: draftState.id, name: draftState.name } };
    },
    documentLike: {
      createElement() {
        return { value: "", textContent: "" };
      },
    },
    storage,
    dom: {
      librarySelect,
      libraryLoadButton,
      libraryDeleteButton,
      libraryStatus,
    },
  });

  const entries = runtime.getComposerSortedLibraryEntries();
  runtime.refreshComposerLibraryUi("newer");

  assert.deepEqual(entries.map((entry) => entry.id), ["newer", "older"]);
  assert.deepEqual(librarySelect.options.map((option) => option.value), ["newer", "older"]);
  assert.equal(librarySelect.value, "newer");
  assert.equal(librarySelect.disabled, false);
  assert.equal(libraryLoadButton.disabled, false);
  assert.equal(libraryDeleteButton.disabled, false);
  assert.match(libraryStatus.textContent, /2 saved scenes/);
});

test("composer document workspace runtime saves to browser storage and applies library loads", () => {
  const storageData = new Map();
  const storage = {
    getItem(key) {
      return storageData.get(key) ?? null;
    },
    setItem(key, value) {
      storageData.set(key, value);
    },
  };
  const sceneIdInput = { value: "my scene" };
  const sceneNameInput = { value: "My Scene" };
  const transferListInput = { value: "" };
  const librarySelect = createSelectElement();
  const libraryLoadButton = { disabled: true };
  const libraryDeleteButton = { disabled: true };
  const libraryStatus = { textContent: "" };
  const assemblyDraftsState = [{ id: "assembly_1", pathPoints: [], pathInterpolate: "spline", pathClosed: false }];
  const transferListRawState = { value: "" };
  const overlayDraftsState = { value: [] };
  let selectedAssembly = null;
  let statusMessage = "";
  let appliedPathRebuilds = 0;
  const runtime = createComposerDocumentWorkspaceRuntime({
    documentLike: {
      createElement() {
        return { value: "", textContent: "" };
      },
    },
    storage,
    nowIso: () => "2026-04-01T12:00:00.000Z",
    dom: {
      sceneIdInput,
      sceneNameInput,
      sceneDurationInput: { value: "24" },
      sceneLoopInput: { checked: false },
      markerListInput: { value: "" },
      pauseListInput: { value: "" },
      warpListInput: { value: "" },
      transferListInput,
      librarySelect,
      libraryLoadButton,
      libraryDeleteButton,
      libraryStatus,
      frameScaleInput: { value: "" },
      frameScaleLabel: { textContent: "" },
      cameraSpeedInput: { value: "" },
      cameraSpeedLabel: { textContent: "" },
      cameraPoiSelect: { value: "" },
      jsonPreview: { textContent: "" },
    },
    state: {
      pathState: { points: [], interpolate: "spline", closed: false },
      frameState: { rotation: { x: 0, y: 0, z: 0, set() {} }, scale: 1 },
      cameraState: { speed: 1 },
      cameraOrbitState: { minDistance: 0.3, radius: 1, theta: 0, phi: Math.PI / 2 },
      cameraFlightState: { waypoints: [], poiMode: "origin" },
      playbackState: { playheadSeconds: 0 },
      palette: ["#fff"],
    },
    helpers: {
      sanitizeSceneId(value) {
        return String(value).trim().toLowerCase().replace(/\s+/g, "_");
      },
      normalizeAssemblyDraft(draft) {
        return { ...draft };
      },
      normalizeAssemblyPathPoints(points) {
        return Array.isArray(points) ? points : [];
      },
      formatTransferList(transfers = []) {
        return transfers.map((entry) => entry.id).join(",");
      },
      normalizeGraphicOverlayList(overlays = []) {
        return Array.isArray(overlays) ? overlays : [];
      },
      parseTransfers() {
        return { entries: [], errors: [] };
      },
      readTimingState() {
        return {
          time: { timeBase: "seconds", start: 0, end: 24, playbackRate: 1, loop: false },
          markers: [],
          pauses: [],
          timeWarps: [],
          diagnostics: {},
        };
      },
      updateTimingDiagnostics() {},
      formatTimingStatus() {
        return "Timing OK";
      },
      formatScaleLabel(value) {
        return String(value);
      },
      clampFn(value) {
        return value;
      },
      vectorFromTriplet(value) {
        return value;
      },
      getTransferListRaw() {
        return transferListInput.value;
      },
    },
    operations: {
      ensureAssemblyDrafts() {},
      persistPathStateToSelectedAssembly() {},
      renderAssemblyEditor() {},
      validateSelectedAssemblyId() {
        return assemblyDraftsState[0]?.id ?? null;
      },
      setSelectedAssembly(assemblyId) {
        selectedAssembly = assemblyId;
      },
      rebuildControlPoints() {
        appliedPathRebuilds += 1;
      },
      updatePathGeometry() {},
      updatePointMaterials() {},
      updateFrame() {},
      syncCameraRadiusInput() {},
      stopCameraFlightPreview() {},
      updateCameraFlightDisplay() {},
      updateWaypointCount() {},
      updateCameraPoiStatus() {},
      updateCamera() {},
      updateViewportFromDocument() {},
      renderTimeline() {},
      updateTimelinePlayhead() {},
      setStatus(message) {
        statusMessage = message;
      },
    },
    accessors: {
      getAssemblyDraftsState() {
        return assemblyDraftsState;
      },
      setAssemblyDraftsState(nextValue) {
        assemblyDraftsState.splice(0, assemblyDraftsState.length, ...nextValue);
      },
      updateAssemblyDraftByIdState(assemblyId, updater) {
        const index = assemblyDraftsState.findIndex((entry) => entry.id === assemblyId);
        if (index >= 0) {
          assemblyDraftsState[index] = updater(assemblyDraftsState[index]);
        }
      },
      getGraphicOverlayDraftsState() {
        return overlayDraftsState.value;
      },
      setGraphicOverlayDraftsState(nextValue) {
        overlayDraftsState.value = nextValue;
      },
      getSelectedPointIndexState() {
        return null;
      },
      setSelectedPointIndexState() {},
      getSelectedAssemblyIdState() {
        return assemblyDraftsState[0]?.id ?? null;
      },
      setTransferListRawStateValue(nextValue) {
        transferListRawState.value = nextValue;
      },
      setCurrentDocument() {},
    },
  });

  runtime.saveComposerSceneToLibrary();

  const storedEntries = JSON.parse(storageData.get("architrino.composer.library.v1"));
  assert.equal(storedEntries.length, 1);
  assert.equal(storedEntries[0].id, "my_scene");
  assert.equal(storedEntries[0].updatedAt, "2026-04-01T12:00:00.000Z");
  assert.equal(statusMessage, "Saved My Scene to the browser library.");

  runtime.loadComposerSceneFromLibrary("my_scene");

  assert.equal(selectedAssembly, "assembly_1");
  assert.equal(appliedPathRebuilds > 0, true);
  assert.equal(statusMessage, "Loaded My Scene from the browser library.");
  assert.equal(transferListRawState.value, "");
});

test("composer document workspace runtime renders json preview and falls back to timeline rendering", () => {
  let statusMessage = "";
  let fallbackTimelineRendered = false;
  let playheadSynced = false;
  let currentDocument = null;
  const runtime = createComposerDocumentWorkspaceRuntime({
    createSceneDocument(draftState) {
      return { scene: { id: draftState.id, name: draftState.name } };
    },
    dom: {
      sceneIdInput: { value: "scene_a" },
      sceneNameInput: { value: "Scene A" },
      sceneDurationInput: { value: "24" },
      sceneLoopInput: { checked: false },
      markerListInput: { value: "" },
      pauseListInput: { value: "" },
      warpListInput: { value: "" },
      transferListInput: { value: "" },
      jsonPreview: { textContent: "" },
    },
    state: {
      pathState: { points: [], interpolate: "spline", closed: false },
      frameState: { rotation: { x: 0, y: 0, z: 0, set() {} }, scale: 1 },
      cameraState: { speed: 1 },
      cameraOrbitState: { minDistance: 0.3, radius: 1, theta: 0, phi: Math.PI / 2 },
      cameraFlightState: { waypoints: [], poiMode: "origin" },
      playbackState: { playheadSeconds: 7.5 },
    },
    helpers: {
      sanitizeSceneId(value) {
        return value;
      },
      normalizeAssemblyDraft(draft) {
        return { ...draft };
      },
      normalizeAssemblyPathPoints(points) {
        return Array.isArray(points) ? points : [];
      },
      formatTransferList() {
        return "";
      },
      normalizeGraphicOverlayList(overlays = []) {
        return overlays;
      },
      parseTransfers() {
        return { entries: [], errors: [] };
      },
      readTimingState() {
        return {
          time: { timeBase: "seconds", start: 0, end: 24, playbackRate: 1, loop: false },
          markers: [],
          pauses: [],
          timeWarps: [],
          diagnostics: {},
        };
      },
      updateTimingDiagnostics() {},
      formatTimingStatus() {
        return "Timing OK";
      },
      formatScaleLabel(value) {
        return String(value);
      },
      clampFn(value) {
        return value;
      },
      vectorFromTriplet(value) {
        return value;
      },
      getTransferListRaw() {
        return "";
      },
    },
    operations: {
      ensureAssemblyDrafts() {},
      persistPathStateToSelectedAssembly() {},
      renderAssemblyEditor() {},
      validateSelectedAssemblyId() {
        return null;
      },
      setSelectedAssembly() {},
      rebuildControlPoints() {},
      updatePathGeometry() {},
      updatePointMaterials() {},
      updateFrame() {},
      syncCameraRadiusInput() {},
      stopCameraFlightPreview() {},
      updateCameraFlightDisplay() {},
      updateWaypointCount() {},
      updateCameraPoiStatus() {},
      updateCamera() {},
      updateViewportFromDocument() {
        throw new Error("render failed");
      },
      renderTimeline() {
        fallbackTimelineRendered = true;
      },
      updateTimelinePlayhead() {
        playheadSynced = true;
      },
      setStatus(message) {
        statusMessage = message;
      },
    },
    accessors: {
      getAssemblyDraftsState() {
        return [];
      },
      setAssemblyDraftsState() {},
      updateAssemblyDraftByIdState() {},
      getGraphicOverlayDraftsState() {
        return [];
      },
      setGraphicOverlayDraftsState() {},
      getSelectedPointIndexState() {
        return null;
      },
      setSelectedPointIndexState() {},
      getSelectedAssemblyIdState() {
        return null;
      },
      setTransferListRawStateValue() {},
      setCurrentDocument(documentData) {
        currentDocument = documentData;
      },
    },
  });

  const originalConsoleError = console.error;
  console.error = () => {};
  try {
    runtime.renderComposerJsonPreview();
  } finally {
    console.error = originalConsoleError;
  }

  assert.equal(fallbackTimelineRendered, true);
  assert.equal(playheadSynced, true);
  assert.equal(statusMessage, "Timing OK");
  assert.equal(currentDocument?.scene?.id, "scene_a");
});
