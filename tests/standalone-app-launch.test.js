import test from "node:test";
import assert from "node:assert/strict";

import {
  getStandaloneAppPathForScene,
  resolveStandaloneAppHrefForScene,
} from "../src/apps/navigator/StandaloneAppLaunchRuntime.js";

test("reaction designer scene resolves to the standalone reaction app path", () => {
  assert.equal(getStandaloneAppPathForScene("reaction_designer"), "./reaction.html");
});

test("unknown scene ids do not resolve to a standalone app path", () => {
  assert.equal(getStandaloneAppPathForScene("composer"), null);
  assert.equal(getStandaloneAppPathForScene(""), null);
});

test("standalone app href resolution uses the current page as the base URL", () => {
  const href = resolveStandaloneAppHrefForScene(
    "reaction_designer",
    "http://127.0.0.1:5173/index.html"
  );

  assert.equal(href, "http://127.0.0.1:5173/reaction.html");
});
