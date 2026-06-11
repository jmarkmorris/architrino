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
  elementMap.set("animator-simulation-panel", { id: "simulation_panel" });
  elementMap.set("animator-simulation-duration", { id: "simulation_duration" });
  elementMap.set("animator-simulation-field-speed", { id: "simulation_field_speed" });
  elementMap.set("animator-simulation-run", { id: "simulation_run" });
  elementMap.set("animator-simulation-diagnostics", { id: "simulation_diagnostics" });
  elementMap.set("animator-hud-labels-toggle", { id: "labels" });
  elementMap.set("animator-hud-paths-toggle", { id: "paths" });
  elementMap.set("animator-hud-history-toggle", { id: "history" });
  elementMap.set("animator-hud-delayed-hits-toggle", { id: "delayed_hits" });
  elementMap.set("animator-hud-envelopes-toggle", { id: "envelopes" });
  elementMap.set("animator-hud-shell-opacity", { id: "shell_opacity" });
  elementMap.set("animator-hud-trail-opacity", { id: "trail_opacity" });
  elementMap.set("animator-hud-trail-lifetime", { id: "trail_lifetime" });
  elementMap.set("animator-hud-trail-diagnostics-toggle", { id: "trail_diagnostics" });
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
  assert.equal(dom.animatorSimulationPanel?.id, "simulation_panel");
  assert.equal(dom.animatorSimulationDurationInput?.id, "simulation_duration");
  assert.equal(dom.animatorSimulationFieldSpeedInput?.id, "simulation_field_speed");
  assert.equal(dom.animatorSimulationRunButton?.id, "simulation_run");
  assert.equal(dom.animatorSimulationDiagnostics?.id, "simulation_diagnostics");
  assert.equal(dom.animatorTabs.length, 2);
  assert.equal(dom.animatorPanels.length, 1);
  assert.equal(dom.animatorMotionSourcePill?.id, "motion_source");
  assert.equal(dom.animatorHudShellOpacityInput?.id, "shell_opacity");
  assert.equal(dom.animatorHudTrailOpacityInput?.id, "trail_opacity");
  assert.equal(dom.animatorHudTrailLifetimeInput?.id, "trail_lifetime");
  assert.equal(dom.animatorHudDelayedHitsToggle?.id, "delayed_hits");
  assert.equal(dom.animatorHudViewportToggleBindings.length, 9);
  assert.equal(dom.animatorHudViewportToggleBindings[0]?.key, "showLabels");
  assert.equal(dom.animatorHudViewportToggleBindings[2]?.key, "showHistoryTraces");
  assert.equal(dom.animatorHudViewportToggleBindings[3]?.key, "showDelayedHits");
  assert.equal(dom.animatorHudViewportToggleBindings[5]?.key, "showTrailDiagnostics");
  assert.equal(dom.animatorHudViewportToggleBindings[6]?.key, "showSolverMotion");
  assert.equal(dom.animatorHudViewportToggleBindings[7]?.key, "showAuthoredMotion");
  assert.equal(dom.animatorHudViewportToggleBindings[8]?.key, "showCameraGuides");
});

test("animator dom runtime exposes animator shell constants", () => {
  assert.equal(ANIMATOR_LIBRARY_STORAGE_KEY, "architrino.animator.library.v1");
  assert.equal(ANIMATOR_MEDIA_ASSET_DIRECTORIES.image, "content/assets/animator/images/");
  assert.deepEqual(ANIMATOR_SUPPORTED_MEDIA_EXTENSIONS.video, ["mp4", "mov"]);
  assert.deepEqual(DEFAULT_ANIMATOR_ROOT_LAYOUT_MARGIN_PX, { x: 160, y: 140 });
});
