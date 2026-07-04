import test from "node:test";
import assert from "node:assert/strict";

import { AppDirector } from "../src/director/AppDirector.js";

function createDirectorDeps(overrides = {}) {
  return {
    initialize: () => {},
    jumpToScene: async () => {},
    resetToRootScene: async () => {},
    startLevelTransitionOut: () => {},
    getTransitionState: () => ({ active: false }),
    getNavigationStack: () => [],
    getSearchBackStack: () => [],
    getGenerationBackStack: () => [],
    ...overrides,
  };
}

test("AppDirector back can navigate to a standalone app return href", async () => {
  const navigated = [];
  const pushedForward = [];
  const jumped = [];
  const director = new AppDirector(
    createDirectorDeps({
      captureHistoryEntry: () => ({
        levelId: "content/scenes/archie/applications.json",
        navigationStack: [],
      }),
      popHistoryBackEntry: () => ({
        href: "http://127.0.0.1:5173/photon.html",
      }),
      pushHistoryForwardEntry: (entry) => pushedForward.push(entry),
      navigateExternalHref: (href) => navigated.push(href),
      jumpToScene: async (...args) => jumped.push(args),
    })
  );

  assert.equal(await director.goBack(), true);
  assert.deepEqual(navigated, ["http://127.0.0.1:5173/photon.html"]);
  assert.deepEqual(pushedForward, [
    {
      levelId: "content/scenes/archie/applications.json",
      navigationStack: [],
    },
  ]);
  assert.deepEqual(jumped, []);
});

test("AppDirector forward can navigate to a standalone app return href", async () => {
  const navigated = [];
  const pushedBack = [];
  const jumped = [];
  const director = new AppDirector(
    createDirectorDeps({
      captureHistoryEntry: () => ({
        levelId: "content/scenes/archie/applications.json",
        navigationStack: [],
      }),
      popHistoryForwardEntry: () => ({
        href: "http://127.0.0.1:5173/equation-mapping.html",
      }),
      pushHistoryBackEntry: (entry) => pushedBack.push(entry),
      navigateExternalHref: (href) => navigated.push(href),
      jumpToScene: async (...args) => jumped.push(args),
    })
  );

  assert.equal(await director.goForward(), true);
  assert.deepEqual(navigated, ["http://127.0.0.1:5173/equation-mapping.html"]);
  assert.deepEqual(pushedBack, [
    {
      levelId: "content/scenes/archie/applications.json",
      navigationStack: [],
    },
  ]);
  assert.deepEqual(jumped, []);
});
