import test from "node:test";
import assert from "node:assert/strict";

import { AppDirector } from "../src/director/AppDirector.js";
import {
  buildMoleculeElementSceneHref,
  navigateMoleculeElementScene,
} from "../src/apps/molecule/MoleculeElementNavigationRuntime.js";
import {
  APPLICATIONS_SCENE_PATH,
  consumeStandaloneAppHomeReturn,
} from "../src/apps/navigator/StandaloneAppHomeRuntime.js";

function createSessionStorageMock() {
  const values = new Map();
  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    removeItem(key) {
      values.delete(key);
    },
  };
}

test("Molecule atom navigation preserves a shared-header Back return to Molecule", async () => {
  const moleculeHref = "http://127.0.0.1:5173/molecule.html?molecule=water#selected";
  const oxygenScenePath = "content/scenes/elements/o.json";
  const assigned = [];
  const windowLike = {
    location: {
      href: moleculeHref,
      assign(href) {
        assigned.push(href);
      },
    },
    sessionStorage: createSessionStorageMock(),
  };

  const elementHref = buildMoleculeElementSceneHref({
    currentHref: moleculeHref,
    scenePath: oxygenScenePath,
  });
  assert.equal(
    elementHref,
    `http://127.0.0.1:5173/index.html#scene=${encodeURIComponent(oxygenScenePath)}`
      + `&parent=${encodeURIComponent(APPLICATIONS_SCENE_PATH)}&focus=molecule`,
  );

  assert.equal(
    navigateMoleculeElementScene({ windowLike, scenePath: oxygenScenePath }),
    true,
  );
  assert.deepEqual(assigned, [elementHref]);

  const returnEntry = consumeStandaloneAppHomeReturn(windowLike);
  assert.deepEqual(returnEntry, { href: moleculeHref });

  const navigated = [];
  const director = new AppDirector({
    getTransitionState: () => ({ active: false }),
    captureHistoryEntry: () => ({
      levelId: oxygenScenePath,
      navigationStack: [],
    }),
    popHistoryBackEntry: () => returnEntry,
    pushHistoryForwardEntry: () => {},
    navigateExternalHref: (href) => navigated.push(href),
  });
  assert.equal(await director.goBack(), true);
  assert.deepEqual(navigated, [moleculeHref]);
});

test("Molecule element navigation fails closed without a scene path", () => {
  const assigned = [];
  const windowLike = {
    location: {
      href: "http://127.0.0.1:5173/molecule.html",
      assign(href) {
        assigned.push(href);
      },
    },
    sessionStorage: createSessionStorageMock(),
  };

  assert.equal(navigateMoleculeElementScene({ windowLike, scenePath: "" }), false);
  assert.deepEqual(assigned, []);
  assert.equal(consumeStandaloneAppHomeReturn(windowLike), null);
});
