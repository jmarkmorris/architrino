import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../solver-gpu-harness.html", import.meta.url), "utf8");

test("Solver GPU Harness exposes the accepted lightweight Applications action", () => {
  assert.match(
    html,
    /class="harness-home" href="\.\/index\.html#scene=content%2Fscenes%2Farchie%2Fapplications\.json">Applications<\/a>/,
  );
  assert.match(html, /\.harness-home:focus-visible/u);
  assert.doesNotMatch(html, /top-dynamic-control-bar/u);
});
