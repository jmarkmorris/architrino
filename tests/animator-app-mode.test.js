import test from "node:test";
import assert from "node:assert/strict";

import {
  ANIMATOR_APP_MODE,
  ANIMATOR_SCENE_PATH,
  STANDALONE_ANIMATOR_NAVIGATOR_HREF,
  getAnimatorAppMode,
  getAnimatorInitialScenePath,
  isStandaloneAnimatorAppMode,
  navigateStandaloneAnimatorHome,
} from "../src/apps/animator/AnimatorAppModeRuntime.js";

test("animator app mode resolves from the standalone window flag", () => {
  assert.equal(
    getAnimatorAppMode({ __ARCHITRINO_APP_MODE__: "animator" }),
    ANIMATOR_APP_MODE
  );
  assert.equal(isStandaloneAnimatorAppMode("animator"), true);
  assert.equal(isStandaloneAnimatorAppMode("reaction"), false);
});

test("animator standalone initial scene defaults to the simulation fixture scene path", () => {
  assert.equal(
    getAnimatorInitialScenePath({ requestedScenePath: "", rootScenePath: "content/scenes/root.json" }),
    ANIMATOR_SCENE_PATH
  );
  assert.equal(
    getAnimatorInitialScenePath({
      requestedScenePath: "content/scenes/custom-animator.json",
      rootScenePath: "content/scenes/root.json",
    }),
    "content/scenes/custom-animator.json"
  );
});

test("animator standalone home navigation uses the standalone navigator href", () => {
  let assignedHref = "";
  const locationLike = {
    assign(value) {
      assignedHref = value;
    },
  };

  const navigated = navigateStandaloneAnimatorHome(locationLike);

  assert.equal(navigated, true);
  assert.equal(assignedHref, STANDALONE_ANIMATOR_NAVIGATOR_HREF);
  assert.equal(
    assignedHref,
    "./index.html#scene=content%2Fscenes%2Farchie%2Fapplications.json"
  );
});
