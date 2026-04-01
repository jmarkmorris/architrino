import test from "node:test";
import assert from "node:assert/strict";

import { createReactionSolverRuntime } from "../src/apps/reaction/ReactionSolverRuntime.js";
import { createReactionSolverUiRuntime } from "../src/apps/reaction/ReactionSolverUiRuntime.js";

test("reaction solver runtime remains a compatibility wrapper over reaction solver ui runtime", () => {
  assert.equal(typeof createReactionSolverRuntime, "function");
  assert.equal(typeof createReactionSolverUiRuntime, "function");
});
