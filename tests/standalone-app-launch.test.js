import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  getStandaloneAppPathForScene,
  resolveStandaloneAppHrefForScene,
} from "../src/apps/navigator/StandaloneAppLaunchRuntime.js";

function readRepoFile(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

test("animator scene no longer resolves to a standalone app path from the main webapp", () => {
  assert.equal(getStandaloneAppPathForScene("animator"), null);
});

test("pdgedit scene no longer resolves to a standalone app path from the main webapp", () => {
  assert.equal(getStandaloneAppPathForScene("pdgedit"), null);
});

test("Ideal Braid scene resolves to the standalone app path", () => {
  assert.equal(getStandaloneAppPathForScene("archie__ideal_braid"), "ideal-braid.html");
  assert.equal(
    resolveStandaloneAppHrefForScene(
      "archie__ideal_braid",
      "http://127.0.0.1:5174/index.html#scene=content/scenes/archie/ideal_braid.json"
    ),
    "http://127.0.0.1:5174/ideal-braid.html"
  );
});

test("Molecule scene ids and paths resolve to the standalone app path", () => {
  assert.equal(getStandaloneAppPathForScene("molecule"), "molecule.html");
  assert.equal(
    getStandaloneAppPathForScene("content/scenes/archie/molecule.json"),
    "molecule.html"
  );
  assert.equal(
    getStandaloneAppPathForScene("content/scenes/chemistry/molecule.json"),
    "molecule.html"
  );
  assert.equal(
    resolveStandaloneAppHrefForScene(
      "content/scenes/chemistry/molecule.json",
      "http://127.0.0.1:5173/index.html#scene=content%2Fscenes%2Fchemistry%2Fmolecule.json"
    ),
    "http://127.0.0.1:5173/molecule.html"
  );
});

test("unknown scene ids do not resolve to a standalone app path", () => {
  assert.equal(getStandaloneAppPathForScene(""), null);
  assert.equal(getStandaloneAppPathForScene("animator"), null);
  assert.equal(getStandaloneAppPathForScene("pdgedit"), null);
  assert.equal(getStandaloneAppPathForScene("pdgsolve"), null);
  assert.equal(getStandaloneAppPathForScene("not_a_scene"), null);
});

test("archived PDG scenes no longer resolve to standalone launch hrefs from the main webapp", () => {
  assert.equal(
    resolveStandaloneAppHrefForScene("animator", "http://127.0.0.1:5173/index.html"),
    null
  );
  assert.equal(
    resolveStandaloneAppHrefForScene("pdgedit", "http://127.0.0.1:5173/index.html"),
    null
  );
});

test("standalone app entrypoints stay outside root app.js", () => {
  const rootEntrypoint = readRepoFile("app.js").trim();
  const animatorEntrypoint = readRepoFile("src/apps/animator/main.js");
  const pdgeditEntrypoint = readRepoFile("src/apps/pdgedit/main.js");

  assert.equal(
    rootEntrypoint,
    'import "./src/apps/architrino/ArchitrinoSceneAppRuntime.js";'
  );
  assert.equal(animatorEntrypoint.includes("../../../app.js"), false);
  assert.equal(animatorEntrypoint.includes("../architrino/ArchitrinoSceneAppRuntime.js"), true);
  assert.equal(pdgeditEntrypoint.includes("../../../app.js"), false);
});
