import test from "node:test";
import assert from "node:assert/strict";

import {
  getStandaloneAppPathForScene,
  resolveStandaloneAppHrefForScene,
} from "../src/apps/navigator/StandaloneAppLaunchRuntime.js";

test("reaction designer scene resolves to the standalone reaction app path", () => {
  assert.equal(getStandaloneAppPathForScene("reaction_designer"), "./reaction.html");
});

test("composer scene resolves to the standalone composer app path", () => {
  assert.equal(getStandaloneAppPathForScene("composer"), "./composer.html");
});

test("xyzzy scene resolves to the standalone xyzzy app path", () => {
  assert.equal(getStandaloneAppPathForScene("xyzzy"), "./xyzzy.html");
});

test("unknown scene ids do not resolve to a standalone app path", () => {
  assert.equal(getStandaloneAppPathForScene(""), null);
  assert.equal(getStandaloneAppPathForScene("not_a_scene"), null);
});

test("standalone app href resolution uses the current page as the base URL", () => {
  const href = resolveStandaloneAppHrefForScene(
    "reaction_designer",
    "http://127.0.0.1:5173/index.html"
  );

  assert.equal(href, "http://127.0.0.1:5173/reaction.html");
});

test("composer href resolution uses the current page as the base URL", () => {
  const href = resolveStandaloneAppHrefForScene(
    "composer",
    "http://127.0.0.1:5173/index.html"
  );

  assert.equal(href, "http://127.0.0.1:5173/composer.html");
});

test("xyzzy href resolution uses the current page as the base URL", () => {
  const href = resolveStandaloneAppHrefForScene(
    "xyzzy",
    "http://127.0.0.1:5173/index.html"
  );

  assert.equal(href, "http://127.0.0.1:5173/xyzzy.html");
});
