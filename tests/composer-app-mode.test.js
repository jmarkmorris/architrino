import test from "node:test";
import assert from "node:assert/strict";

import {
  COMPOSER_APP_MODE,
  COMPOSER_SCENE_PATH,
  STANDALONE_COMPOSER_NAVIGATOR_HREF,
  getComposerAppMode,
  getComposerInitialScenePath,
  isStandaloneComposerAppMode,
  navigateStandaloneComposerHome,
} from "../src/apps/composer/ComposerAppModeRuntime.js";

test("composer app mode resolves from the standalone window flag", () => {
  assert.equal(
    getComposerAppMode({ __ARCHITRINO_APP_MODE__: "composer" }),
    COMPOSER_APP_MODE
  );
  assert.equal(isStandaloneComposerAppMode("composer"), true);
  assert.equal(isStandaloneComposerAppMode("reaction"), false);
});

test("composer standalone initial scene defaults to the composer scene path", () => {
  assert.equal(
    getComposerInitialScenePath({ requestedScenePath: "", rootScenePath: "content/scenes/root.json" }),
    COMPOSER_SCENE_PATH
  );
  assert.equal(
    getComposerInitialScenePath({
      requestedScenePath: "content/scenes/custom-composer.json",
      rootScenePath: "content/scenes/root.json",
    }),
    "content/scenes/custom-composer.json"
  );
});

test("composer standalone home navigation uses the standalone navigator href", () => {
  let assignedHref = "";
  const locationLike = {
    assign(value) {
      assignedHref = value;
    },
  };

  const navigated = navigateStandaloneComposerHome(locationLike);

  assert.equal(navigated, true);
  assert.equal(assignedHref, STANDALONE_COMPOSER_NAVIGATOR_HREF);
});
