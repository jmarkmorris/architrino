import test from "node:test";
import assert from "node:assert/strict";

import {
  createAnimatorAppRuntime,
  createAnimatorAppStore,
} from "../src/apps/animator/AnimatorAppModeRuntime.js";

test("animator app store provides panel map, palette, editor store, and path state", () => {
  const store = createAnimatorAppStore({
    palette: ["#111111", "#222222"],
  });

  assert.equal(store.panelMap.get("animator_tree"), "tree");
  assert.deepEqual(store.palette, ["#111111", "#222222"]);
  assert.equal(typeof store.editorStore.getAssemblyDrafts, "function");
  assert.equal(store.pathState.interpolate, "spline");
  assert.equal(store.pathState.closed, false);
});

test("animator app runtime wires animator ui and controls through the app layer", () => {
  const animatorOverlay = {
    classList: { toggle() {} },
    setAttribute() {},
    inert: false,
  };
  const app = {
    classList: { toggle() {} },
  };
  const animatorTabs = [];
  const animatorPanels = [];
  let wireCount = 0;

  const runtime = createAnimatorAppRuntime({
    ui: {
      app,
      animatorOverlay,
      animatorTabs,
      animatorPanels,
      animatorSceneId: "animator",
      animatorPreviewSceneId: "animator_preview",
      animatorPreviewScenePath: "__animator_preview__",
      animatorDocsPath: "reference/priorities/app-animator/priorities.md",
      levelConfigs: {},
      levels: new Map(),
      initAnimatorCanvas() {},
      renderAnimatorJsonPreview() {},
      stopAnimatorCameraFlightPreview() {},
      showMarkdownPanel() {},
      readAnimatorDraftState() {
        return { id: "scene", name: "Scene" };
      },
      buildAnimatorSceneDocument() {
        return {};
      },
      buildAnimatorPreviewSceneData() {
        return {};
      },
      jumpToScene() {},
      setAnimatorStatus() {},
      setAnimatorNeedsResize() {},
    },
    controls: {
      animatorTabs,
      animatorPathState: { points: [], interpolate: "spline", closed: false },
      animatorCameraFlightState: { preview: false },
      isTransitionActive: () => false,
      exitAnimator() {},
      updateAnimatorPathGeometry() {},
      resetAnimatorPathPoints() {},
      setAnimatorFrameDefaults() {},
      updateAnimatorFrame() {},
      addAnimatorCameraWaypoint() {},
      clearAnimatorCameraWaypoints() {},
      stopAnimatorCameraFlightPreview() {},
      startAnimatorCameraFlightPreview() {},
      setAnimatorViewportCameraSource() {},
      applyAnimatorFrameScaleInput() {},
      applyAnimatorCameraSpeedInput() {},
      applyAnimatorCameraRadiusInput() {},
      setAnimatorCameraDefaults() {},
      updateAnimatorCamera() {},
      updateAnimatorCameraPoiStatus() {},
      persistAnimatorPathStateToSelectedAssembly() {},
      toggleAnimatorPlayback() {},
      restartAnimatorPlayback() {},
      jumpToAnimatorMarker() {},
      jumpAnimatorMarkerByOffset() {},
      scrubAnimatorPlayback() {},
      renderAnimatorJsonPreview() {},
      clearAnimatorScene() {},
      saveAnimatorSceneToLibrary() {},
      loadAnimatorSceneFromLibrary() {},
      deleteAnimatorSceneFromLibrary() {},
    },
  });

  runtime.animatorControlsUiRuntime.wireListeners = () => {
    wireCount += 1;
  };

  runtime.wireListeners();

  assert.equal(typeof runtime.animatorUiRuntime.setAnimatorPanel, "function");
  assert.equal(wireCount, 1);
});
