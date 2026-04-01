import test from "node:test";
import assert from "node:assert/strict";

import {
  createComposerAppRuntime,
  createComposerAppStore,
} from "../src/apps/composer/ComposerAppModeRuntime.js";

test("composer app store provides panel map, palette, editor store, and path state", () => {
  const store = createComposerAppStore({
    palette: ["#111111", "#222222"],
  });

  assert.equal(store.panelMap.get("composer_tree"), "tree");
  assert.deepEqual(store.palette, ["#111111", "#222222"]);
  assert.equal(typeof store.editorStore.getAssemblyDrafts, "function");
  assert.equal(store.pathState.interpolate, "spline");
  assert.equal(store.pathState.closed, false);
});

test("composer app runtime wires composer ui and controls through the app layer", () => {
  const composerOverlay = {
    classList: { toggle() {} },
    setAttribute() {},
    inert: false,
  };
  const app = {
    classList: { toggle() {} },
  };
  const composerTabs = [];
  const composerPanels = [];
  let wireCount = 0;

  const runtime = createComposerAppRuntime({
    ui: {
      app,
      composerOverlay,
      composerTabs,
      composerPanels,
      composerSceneId: "composer",
      composerPreviewSceneId: "composer_preview",
      composerPreviewScenePath: "__composer_preview__",
      composerDocsPath: "composer.md",
      levelConfigs: {},
      levels: new Map(),
      initComposerCanvas() {},
      renderComposerJsonPreview() {},
      stopComposerCameraFlightPreview() {},
      showMarkdownPanel() {},
      readComposerDraftState() {
        return { id: "scene", name: "Scene" };
      },
      buildComposerSceneDocument() {
        return {};
      },
      buildComposerPreviewSceneData() {
        return {};
      },
      jumpToScene() {},
      setComposerStatus() {},
      setComposerNeedsResize() {},
    },
    controls: {
      composerTabs,
      composerPathState: { points: [], interpolate: "spline", closed: false },
      composerCameraFlightState: { preview: false },
      isTransitionActive: () => false,
      exitComposer() {},
      exitReactionApp() {},
      updateComposerPathGeometry() {},
      resetComposerPathPoints() {},
      setComposerFrameDefaults() {},
      updateComposerFrame() {},
      addComposerCameraWaypoint() {},
      clearComposerCameraWaypoints() {},
      stopComposerCameraFlightPreview() {},
      startComposerCameraFlightPreview() {},
      setComposerViewportCameraSource() {},
      applyComposerFrameScaleInput() {},
      applyComposerCameraSpeedInput() {},
      applyComposerCameraRadiusInput() {},
      setComposerCameraDefaults() {},
      updateComposerCamera() {},
      updateComposerCameraPoiStatus() {},
      persistComposerPathStateToSelectedAssembly() {},
      toggleComposerPlayback() {},
      restartComposerPlayback() {},
      jumpToComposerMarker() {},
      jumpComposerMarkerByOffset() {},
      scrubComposerPlayback() {},
      renderComposerJsonPreview() {},
      clearComposerScene() {},
      saveComposerSceneToLibrary() {},
      loadComposerSceneFromLibrary() {},
      deleteComposerSceneFromLibrary() {},
    },
  });

  runtime.composerControlsUiRuntime.wireListeners = () => {
    wireCount += 1;
  };

  runtime.wireListeners();

  assert.equal(typeof runtime.composerUiRuntime.setComposerPanel, "function");
  assert.equal(wireCount, 1);
});
