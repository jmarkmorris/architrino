import assert from "node:assert/strict";
import test from "node:test";

import { createSceneStateHashService } from "../src/services/SceneStateHashService.js";

function createFakeBrowserRefs() {
  const locationRef = {
    pathname: "/index.html",
    search: "",
    hash: "",
  };
  const calls = [];
  const applyUrl = (url) => {
    const hashStart = String(url).indexOf("#");
    locationRef.hash = hashStart >= 0 ? String(url).slice(hashStart) : "";
  };
  const historyRef = {
    state: null,
    replaceState(state, _title, url) {
      this.state = state;
      calls.push({ method: "replaceState", state, url });
      applyUrl(url);
    },
    pushState(state, _title, url) {
      this.state = state;
      calls.push({ method: "pushState", state, url });
      applyUrl(url);
    },
  };
  return { locationRef, historyRef, calls };
}

test("scene hash sync replaces passive updates and records scene state", () => {
  const { locationRef, historyRef, calls } = createFakeBrowserRefs();
  const service = createSceneStateHashService({
    rootScenePath: "content/scenes/home.json",
    locationRef,
    historyRef,
    getNavigationStack: () => [
      {
        levelId: "content/scenes/home.json",
        focusNodeId: "foundations",
      },
    ],
  });

  service.syncSceneHash("content/scenes/foundations/foundations.json");

  assert.equal(calls.length, 1);
  assert.equal(calls[0].method, "replaceState");
  assert.equal(
    calls[0].url,
    "/index.html#scene=content%2Fscenes%2Ffoundations%2Ffoundations.json&parent=content%2Fscenes%2Fhome.json&focus=foundations"
  );
  assert.deepEqual(service.getSceneStateFromHistoryState(historyRef.state), {
    scenePath: "content/scenes/foundations/foundations.json",
    parentLevelId: "content/scenes/home.json",
    parentFocusNodeId: "foundations",
    navigationStack: [
      {
        levelId: "content/scenes/home.json",
        focusNodeId: "foundations",
      },
    ],
    historyIndex: 0,
  });
});

test("scene hash sync pushes intentional scene navigation entries", () => {
  const { locationRef, historyRef, calls } = createFakeBrowserRefs();
  const service = createSceneStateHashService({
    rootScenePath: "content/scenes/home.json",
    locationRef,
    historyRef,
    getNavigationStack: () => [
      {
        levelId: "content/scenes/home.json",
        focusNodeId: "foundations",
      },
    ],
  });

  service.syncSceneHash("content/scenes/home.json");
  service.syncSceneHash("content/scenes/foundations/foundations.json", {
    historyMode: "push",
  });

  assert.equal(calls.length, 2);
  assert.equal(calls[0].method, "replaceState");
  assert.equal(calls[1].method, "pushState");
  assert.equal(service.getCurrentHistoryIndex(), 1);
  assert.deepEqual(service.getSceneStateFromHistoryState(historyRef.state), {
    scenePath: "content/scenes/foundations/foundations.json",
    parentLevelId: "content/scenes/home.json",
    parentFocusNodeId: "foundations",
    navigationStack: [
      {
        levelId: "content/scenes/home.json",
        focusNodeId: "foundations",
      },
    ],
    historyIndex: 1,
  });
});
