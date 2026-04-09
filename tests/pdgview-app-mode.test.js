import test from "node:test";
import assert from "node:assert/strict";

import {
  PDGVIEW_APP_MODE,
  PDGVIEW_SCENE_PATH,
  STANDALONE_PDGVIEW_NAVIGATOR_HREF,
  getPdgviewAppMode,
  getPdgviewInitialScenePath,
  isStandalonePdgviewAppMode,
  navigateStandalonePdgviewHome,
} from "../src/apps/pdgview/PdgviewAppModeRuntime.js";

test("pdgview app mode resolves from the standalone window flag", () => {
  assert.equal(
    getPdgviewAppMode({ __ARCHITRINO_APP_MODE__: "pdgview" }),
    PDGVIEW_APP_MODE
  );
  assert.equal(isStandalonePdgviewAppMode("pdgview"), true);
  assert.equal(isStandalonePdgviewAppMode("reaction"), false);
});

test("pdgview standalone initial scene defaults to the pdgview scene path", () => {
  assert.equal(
    getPdgviewInitialScenePath({ requestedScenePath: "", rootScenePath: "content/scenes/root.json" }),
    PDGVIEW_SCENE_PATH
  );
  assert.equal(
    getPdgviewInitialScenePath({
      requestedScenePath: "content/scenes/custom-pdgview.json",
      rootScenePath: "content/scenes/root.json",
    }),
    "content/scenes/custom-pdgview.json"
  );
});

test("pdgview standalone home navigation uses the standalone navigator href", () => {
  let assignedHref = "";
  const locationLike = {
    assign(value) {
      assignedHref = value;
    },
  };

  const navigated = navigateStandalonePdgviewHome(locationLike);

  assert.equal(navigated, true);
  assert.equal(assignedHref, STANDALONE_PDGVIEW_NAVIGATOR_HREF);
});
