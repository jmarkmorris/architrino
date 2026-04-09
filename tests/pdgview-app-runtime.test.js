import test from "node:test";
import assert from "node:assert/strict";

import {
  createPdgviewAppRuntime,
  createPdgviewAppStore,
} from "../src/apps/pdgview/PdgviewAppModeRuntime.js";

test("pdgview app store provides panel map, palette, editor store, and path state", () => {
  const store = createPdgviewAppStore({
    palette: ["#111111", "#222222"],
  });

  assert.equal(store.panelMap.get("pdgview_tree"), "tree");
  assert.deepEqual(store.palette, ["#111111", "#222222"]);
  assert.equal(typeof store.editorStore.getAssemblyDrafts, "function");
  assert.equal(store.pathState.interpolate, "spline");
  assert.equal(store.pathState.closed, false);
});

test("pdgview app runtime wires pdgview ui and controls through the app layer", () => {
  const pdgviewOverlay = {
    classList: { toggle() {} },
    setAttribute() {},
    inert: false,
  };
  const app = {
    classList: { toggle() {} },
  };
  const pdgviewTabs = [];
  const pdgviewPanels = [];
  let wireCount = 0;

  const runtime = createPdgviewAppRuntime({
    ui: {
      app,
      pdgviewOverlay,
      pdgviewTabs,
      pdgviewPanels,
      pdgviewSceneId: "pdgview",
      pdgviewPreviewSceneId: "pdgview_preview",
      pdgviewPreviewScenePath: "__pdgview_preview__",
      pdgviewDocsPath: "pdgview.md",
      levelConfigs: {},
      levels: new Map(),
      initPdgviewCanvas() {},
      renderPdgviewJsonPreview() {},
      stopPdgviewCameraFlightPreview() {},
      showMarkdownPanel() {},
      readPdgviewDraftState() {
        return { id: "scene", name: "Scene" };
      },
      buildPdgviewSceneDocument() {
        return {};
      },
      buildPdgviewPreviewSceneData() {
        return {};
      },
      jumpToScene() {},
      setPdgviewStatus() {},
      setPdgviewNeedsResize() {},
    },
    controls: {
      pdgviewTabs,
      pdgviewPathState: { points: [], interpolate: "spline", closed: false },
      pdgviewCameraFlightState: { preview: false },
      isTransitionActive: () => false,
      exitPdgview() {},
      updatePdgviewPathGeometry() {},
      resetPdgviewPathPoints() {},
      setPdgviewFrameDefaults() {},
      updatePdgviewFrame() {},
      addPdgviewCameraWaypoint() {},
      clearPdgviewCameraWaypoints() {},
      stopPdgviewCameraFlightPreview() {},
      startPdgviewCameraFlightPreview() {},
      setPdgviewViewportCameraSource() {},
      applyPdgviewFrameScaleInput() {},
      applyPdgviewCameraSpeedInput() {},
      applyPdgviewCameraRadiusInput() {},
      setPdgviewCameraDefaults() {},
      updatePdgviewCamera() {},
      updatePdgviewCameraPoiStatus() {},
      persistPdgviewPathStateToSelectedAssembly() {},
      togglePdgviewPlayback() {},
      restartPdgviewPlayback() {},
      jumpToPdgviewMarker() {},
      jumpPdgviewMarkerByOffset() {},
      scrubPdgviewPlayback() {},
      renderPdgviewJsonPreview() {},
      clearPdgviewScene() {},
      savePdgviewSceneToLibrary() {},
      loadPdgviewSceneFromLibrary() {},
      deletePdgviewSceneFromLibrary() {},
    },
  });

  runtime.pdgviewControlsUiRuntime.wireListeners = () => {
    wireCount += 1;
  };

  runtime.wireListeners();

  assert.equal(typeof runtime.pdgviewUiRuntime.setPdgviewPanel, "function");
  assert.equal(wireCount, 1);
});
