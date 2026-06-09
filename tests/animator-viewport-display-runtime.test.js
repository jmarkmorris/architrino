import test from "node:test";
import assert from "node:assert/strict";

import { createAnimatorViewportDisplayRuntime } from "../src/apps/animator/AnimatorViewportDisplayRuntime.js";

test("animator viewport display defaults transport paths off", () => {
  const runtime = createAnimatorViewportDisplayRuntime();

  assert.equal(runtime.isFlagEnabled("showTransportPath"), false);
  assert.equal(runtime.isFlagEnabled("showLabels"), true);
  assert.equal(runtime.isFlagEnabled("showEnvelopes"), false);
});

test("animator viewport display toggles can turn transport paths back on", () => {
  const runtime = createAnimatorViewportDisplayRuntime();

  runtime.toggleFlag("showTransportPath");

  assert.equal(runtime.isFlagEnabled("showTransportPath"), true);
});
