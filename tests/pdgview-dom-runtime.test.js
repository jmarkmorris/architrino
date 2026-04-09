import test from "node:test";
import assert from "node:assert/strict";

import {
  PDGVIEW_LIBRARY_STORAGE_KEY,
  PDGVIEW_MEDIA_ASSET_DIRECTORIES,
  PDGVIEW_SUPPORTED_MEDIA_EXTENSIONS,
  DEFAULT_PDGVIEW_ROOT_LAYOUT_MARGIN_PX,
  getPdgviewDomElements,
} from "../src/apps/pdgview/PdgviewDomRuntime.js";

test("pdgview dom runtime collects pdgview shell elements and bindings", () => {
  const elementMap = new Map();
  const overlay = {
    querySelectorAll(selector) {
      if (selector === ".pdgview-tab") {
        return [{ id: "tab_a" }, { id: "tab_b" }];
      }
      if (selector === ".pdgview-panel") {
        return [{ id: "panel_a" }];
      }
      return [];
    },
  };
  const canvasParent = { id: "canvas_wrap" };
  const canvas = { id: "pdgview-canvas", parentElement: canvasParent };
  elementMap.set("pdgview-overlay", overlay);
  elementMap.set("pdgview-canvas", canvas);
  elementMap.set("pdgview-hud-labels-toggle", { id: "labels" });
  elementMap.set("pdgview-hud-paths-toggle", { id: "paths" });
  elementMap.set("pdgview-hud-history-toggle", { id: "history" });
  elementMap.set("pdgview-hud-envelopes-toggle", { id: "envelopes" });
  elementMap.set("pdgview-hud-observer-toggle", { id: "observer" });

  const dom = getPdgviewDomElements({
    getElementById(id) {
      return elementMap.get(id) ?? null;
    },
  });

  assert.equal(dom.pdgviewOverlay, overlay);
  assert.equal(dom.pdgviewCanvas, canvas);
  assert.equal(dom.pdgviewCanvasWrap, canvasParent);
  assert.equal(dom.pdgviewTabs.length, 2);
  assert.equal(dom.pdgviewPanels.length, 1);
  assert.equal(dom.pdgviewHudViewportToggleBindings.length, 5);
  assert.equal(dom.pdgviewHudViewportToggleBindings[0]?.key, "showLabels");
  assert.equal(dom.pdgviewHudViewportToggleBindings[4]?.key, "showCameraGuides");
});

test("pdgview dom runtime exposes pdgview shell constants", () => {
  assert.equal(PDGVIEW_LIBRARY_STORAGE_KEY, "architrino.pdgview.library.v1");
  assert.equal(PDGVIEW_MEDIA_ASSET_DIRECTORIES.image, "content/assets/pdgview/images/");
  assert.deepEqual(PDGVIEW_SUPPORTED_MEDIA_EXTENSIONS.video, ["mp4", "mov"]);
  assert.deepEqual(DEFAULT_PDGVIEW_ROOT_LAYOUT_MARGIN_PX, { x: 160, y: 140 });
});
