import test from "node:test";
import assert from "node:assert/strict";

import {
  COMPOSER_LIBRARY_STORAGE_KEY,
  COMPOSER_MEDIA_ASSET_DIRECTORIES,
  COMPOSER_SUPPORTED_MEDIA_EXTENSIONS,
  DEFAULT_COMPOSER_ROOT_LAYOUT_MARGIN_PX,
  getComposerDomElements,
} from "../src/apps/composer/ComposerDomRuntime.js";

test("composer dom runtime collects composer shell elements and bindings", () => {
  const elementMap = new Map();
  const overlay = {
    querySelectorAll(selector) {
      if (selector === ".composer-tab") {
        return [{ id: "tab_a" }, { id: "tab_b" }];
      }
      if (selector === ".composer-panel") {
        return [{ id: "panel_a" }];
      }
      return [];
    },
  };
  const canvasParent = { id: "canvas_wrap" };
  const canvas = { id: "composer-canvas", parentElement: canvasParent };
  elementMap.set("composer-overlay", overlay);
  elementMap.set("composer-canvas", canvas);
  elementMap.set("composer-hud-labels-toggle", { id: "labels" });
  elementMap.set("composer-hud-paths-toggle", { id: "paths" });
  elementMap.set("composer-hud-history-toggle", { id: "history" });
  elementMap.set("composer-hud-envelopes-toggle", { id: "envelopes" });
  elementMap.set("composer-hud-observer-toggle", { id: "observer" });
  elementMap.set("composer-title", { id: "title" });

  const dom = getComposerDomElements({
    getElementById(id) {
      return elementMap.get(id) ?? null;
    },
  });

  assert.equal(dom.composerOverlay, overlay);
  assert.equal(dom.composerCanvas, canvas);
  assert.equal(dom.composerCanvasWrap, canvasParent);
  assert.equal(dom.composerTabs.length, 2);
  assert.equal(dom.composerPanels.length, 1);
  assert.equal(dom.composerHudViewportToggleBindings.length, 5);
  assert.equal(dom.composerHudViewportToggleBindings[0]?.key, "showLabels");
  assert.equal(dom.composerHudViewportToggleBindings[4]?.key, "showCameraGuides");
});

test("composer dom runtime exposes composer shell constants", () => {
  assert.equal(COMPOSER_LIBRARY_STORAGE_KEY, "architrino.composer.library.v1");
  assert.equal(COMPOSER_MEDIA_ASSET_DIRECTORIES.image, "content/assets/composer/images/");
  assert.deepEqual(COMPOSER_SUPPORTED_MEDIA_EXTENSIONS.video, ["mp4", "mov"]);
  assert.deepEqual(DEFAULT_COMPOSER_ROOT_LAYOUT_MARGIN_PX, { x: 160, y: 140 });
});
