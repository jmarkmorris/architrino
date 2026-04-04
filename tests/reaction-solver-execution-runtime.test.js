import test from "node:test";
import assert from "node:assert/strict";

import { buildReactionSolverExecutionStatusNote } from "../src/apps/reaction/ReactionSolverExecutionRuntime.js";

test("reaction solver execution runtime stays quiet after the external-only cut-over", () => {
  assert.equal(buildReactionSolverExecutionStatusNote({ mode: "external" }), "");
  assert.equal(buildReactionSolverExecutionStatusNote({ mode: "in-process" }), "");
  assert.equal(buildReactionSolverExecutionStatusNote(null), "");
});
