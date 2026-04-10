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

test("pdgview scene resolves to the standalone pdgview app path", () => {
  assert.equal(getStandaloneAppPathForScene("pdgview"), "./pdgview.html");
});

test("pdgsolve and pdgedit scenes resolve to dedicated standalone app paths", () => {
  assert.equal(getStandaloneAppPathForScene("pdgsolve"), "./pdgsolve.html");
  assert.equal(getStandaloneAppPathForScene("pdgedit"), "./pdgedit.html");
});

test("unknown scene ids do not resolve to a standalone app path", () => {
  assert.equal(getStandaloneAppPathForScene(""), null);
  assert.equal(getStandaloneAppPathForScene("not_a_scene"), null);
});

test("pdgview href resolution uses the current page as the base URL", () => {
  const href = resolveStandaloneAppHrefForScene(
    "pdgview",
    "http://127.0.0.1:5173/index.html"
  );

  assert.equal(href, "http://127.0.0.1:5173/pdgview.html");
});

test("pdgsolve and pdgedit href resolution stays route-only", () => {
  assert.equal(
    resolveStandaloneAppHrefForScene("pdgsolve", "http://127.0.0.1:5173/index.html"),
    "http://127.0.0.1:5173/pdgsolve.html"
  );
  assert.equal(
    resolveStandaloneAppHrefForScene("pdgedit", "http://127.0.0.1:5173/index.html"),
    "http://127.0.0.1:5173/pdgedit.html"
  );
});

test("standalone app entrypoints stay outside root app.js", () => {
  const rootEntrypoint = readRepoFile("app.js").trim();
  const pdgviewEntrypoint = readRepoFile("src/apps/pdgview/main.js");
  const pdgsolveEntrypoint = readRepoFile("src/apps/pdgsolve/main.js");
  const pdgeditEntrypoint = readRepoFile("src/apps/pdgedit/main.js");

  assert.equal(
    rootEntrypoint,
    'import "./src/apps/architrino/ArchitrinoSceneAppRuntime.js";'
  );
  assert.equal(pdgviewEntrypoint.includes("../../../app.js"), false);
  assert.equal(pdgviewEntrypoint.includes("../architrino/ArchitrinoSceneAppRuntime.js"), true);
  assert.equal(pdgsolveEntrypoint.includes("../../../app.js"), false);
  assert.equal(pdgeditEntrypoint.includes("../../../app.js"), false);
});
