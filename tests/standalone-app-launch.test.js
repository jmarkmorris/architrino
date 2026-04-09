import test from "node:test";
import assert from "node:assert/strict";

import {
  getStandaloneAppPathForScene,
  resolveStandaloneAppHrefForScene,
} from "../src/apps/navigator/StandaloneAppLaunchRuntime.js";

test("pdgview scene resolves to the standalone pdgview app path", () => {
  assert.equal(getStandaloneAppPathForScene("pdgview"), "./pdgview.html");
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
