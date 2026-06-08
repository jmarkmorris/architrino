import test from "node:test";
import assert from "node:assert/strict";

import {
  ANIMATOR_LIBRARY_STORAGE_KEY,
  ANIMATOR_MEDIA_ASSET_DIRECTORIES,
  ANIMATOR_SUPPORTED_MEDIA_EXTENSIONS,
  DEFAULT_ANIMATOR_ROOT_LAYOUT_MARGIN_PX,
  getAnimatorDomElements,
} from "../src/apps/animator/AnimatorDomRuntime.js";

test("animator dom runtime collects animator shell elements and bindings", () => {
  const elementMap = new Map();
  const overlay = {
    querySelectorAll(selector) {
      if (selector === ".animator-tab") {
        return [{ id: "tab_a" }, { id: "tab_b" }];
      }
      if (selector === ".animator-panel") {
        return [{ id: "panel_a" }];
      }
      return [];
    },
  };
  const canvasParent = { id: "canvas_wrap" };
  const canvas = { id: "animator-canvas", parentElement: canvasParent };
  elementMap.set("animator-overlay", overlay);
  elementMap.set("animator-canvas", canvas);
  elementMap.set("animator-view-planar-button", { id: "planar" });
  elementMap.set("animator-run-simulation-button", { id: "run_solver" });
  elementMap.set("animator-hud-labels-toggle", { id: "labels" });
  elementMap.set("animator-hud-paths-toggle", { id: "paths" });
  elementMap.set("animator-hud-history-toggle", { id: "history" });
  elementMap.set("animator-hud-envelopes-toggle", { id: "envelopes" });
  elementMap.set("animator-hud-solver-motion-toggle", { id: "solver_motion" });
  elementMap.set("animator-hud-authored-motion-toggle", { id: "authored_motion" });
  elementMap.set("animator-hud-camera-guides-toggle", { id: "camera_guides" });
  elementMap.set("animator-motion-source-pill", { id: "motion_source" });

  const dom = getAnimatorDomElements({
    getElementById(id) {
      return elementMap.get(id) ?? null;
    },
  });

  assert.equal(dom.animatorOverlay, overlay);
  assert.equal(dom.animatorCanvas, canvas);
  assert.equal(dom.animatorCanvasWrap, canvasParent);
  assert.equal(dom.animatorViewPlanarButton?.id, "planar");
  assert.equal(dom.animatorRunSimulationButton?.id, "run_solver");
  assert.equal(dom.animatorTabs.length, 2);
  assert.equal(dom.animatorPanels.length, 1);
  assert.equal(dom.animatorMotionSourcePill?.id, "motion_source");
  assert.equal(dom.animatorHudViewportToggleBindings.length, 7);
  assert.equal(dom.animatorHudViewportToggleBindings[0]?.key, "showLabels");
  assert.equal(dom.animatorHudViewportToggleBindings[4]?.key, "showSolverMotion");
  assert.equal(dom.animatorHudViewportToggleBindings[5]?.key, "showAuthoredMotion");
  assert.equal(dom.animatorHudViewportToggleBindings[6]?.key, "showCameraGuides");
});

test("animator dom runtime exposes animator shell constants", () => {
  assert.equal(ANIMATOR_LIBRARY_STORAGE_KEY, "architrino.animator.library.v1");
  assert.equal(ANIMATOR_MEDIA_ASSET_DIRECTORIES.image, "content/assets/animator/images/");
  assert.deepEqual(ANIMATOR_SUPPORTED_MEDIA_EXTENSIONS.video, ["mp4", "mov"]);
  assert.deepEqual(DEFAULT_ANIMATOR_ROOT_LAYOUT_MARGIN_PX, { x: 160, y: 140 });
});
