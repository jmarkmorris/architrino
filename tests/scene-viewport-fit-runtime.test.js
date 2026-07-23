import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_SCENE_VIEWPORT_FIT_MARGIN,
  computeBoundsSceneFitZoom,
  computeCenteredSceneFitZoom,
  isPointWithinSceneInteractionBounds,
  resolveSceneViewportFitMargin,
} from "../src/runtime/SceneViewportFitRuntime.js";
import { createTransitionEngine } from "../src/runtime/TransitionEngine.js";

test("scene viewport fit margin leaves breathing room for centered ring scenes", () => {
  assert.equal(DEFAULT_SCENE_VIEWPORT_FIT_MARGIN, 0.94);
  assert.equal(resolveSceneViewportFitMargin(2), 1);
  assert.equal(resolveSceneViewportFitMargin(-1), DEFAULT_SCENE_VIEWPORT_FIT_MARGIN);

  assert.equal(
    computeCenteredSceneFitZoom({
      safeRadius: 12,
      extentRadius: 12,
    }),
    0.94
  );
});

test("scene viewport bounds fit applies the same margin on the limiting axis", () => {
  assert.ok(
    Math.abs(
      computeBoundsSceneFitZoom({
        safeWidth: 40,
        safeHeight: 20,
        sizeX: 20,
        sizeY: 20,
      }) - 0.94
    ) < 1e-12
  );

  assert.equal(
    computeBoundsSceneFitZoom({
      safeWidth: 40,
      safeHeight: 20,
      sizeX: 0,
      sizeY: 20,
      fallbackZoom: 1.7,
    }),
    1.7
  );
});

test("viewport-fitted scenes accept visible canvas corners outside the focus circle", () => {
  const point = { clientX: 80, clientY: 80 };
  const canvasRect = { left: 0, right: 2560, top: 0, bottom: 1440 };
  const focusMetrics = { centerX: 1280, centerY: 720, radius: 705 };

  assert.equal(
    isPointWithinSceneInteractionBounds({
      ...point,
      fitMode: "viewport",
      canvasRect,
      focusMetrics,
    }),
    true
  );
  assert.equal(
    isPointWithinSceneInteractionBounds({
      ...point,
      fitMode: "focus",
      canvasRect,
      focusMetrics,
    }),
    false
  );
});

test("viewport interaction bounds honor canvas edges and padding", () => {
  const canvasRect = { left: 10, right: 1010, top: 20, bottom: 820 };
  const common = { fitMode: "viewport", canvasRect, paddingPx: 12 };

  assert.equal(
    isPointWithinSceneInteractionBounds({ ...common, clientX: 22, clientY: 32 }),
    true
  );
  assert.equal(
    isPointWithinSceneInteractionBounds({ ...common, clientX: 21.9, clientY: 32 }),
    false
  );
});

test("transition finalization refits the displayed level from current viewport state", () => {
  const transitionState = {
    active: true,
    mode: "jump",
    fromLevel: {
      group: {
        position: { set() {} },
      },
    },
    toLevel: {
      id: "next",
      group: {
        position: {
          x: 8,
          y: -3,
          z: 0,
          set(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
          },
        },
        scale: { setScalar() {} },
      },
    },
    payload: {
      zoomTarget: 3,
    },
  };
  const calls = [];
  const deps = {
    worldGroup: {
      position: {
        add(pos) {
          calls.push(["add-position", pos.x, pos.y, pos.z]);
        },
      },
      remove() {
        calls.push(["remove"]);
      },
    },
    camera: { zoom: 1 },
    setLevelOpacity() {},
    setLevelLabelOpacity() {},
    setLevelLinkOpacity() {},
    setCurrentLevel(level) {
      calls.push(["set-current", level.id]);
    },
    fitLevelInFrame(level) {
      calls.push(["fit", level.id]);
    },
    applyZoom(zoom) {
      calls.push(["apply-zoom", zoom]);
    },
    labelFadeState: {},
    getCurrentLevel() {
      return transitionState.toLevel;
    },
    now() {
      return 10;
    },
    updateSceneLabel() {},
    updateSceneMarkdown() {},
  };

  createTransitionEngine(transitionState, deps).finalize();

  assert.deepEqual(calls, [
    ["remove"],
    ["add-position", 8, -3, 0],
    ["set-current", "next"],
    ["fit", "next"],
  ]);
  assert.equal(transitionState.toLevel.group.position.x, 0);
  assert.equal(transitionState.active, false);
});
