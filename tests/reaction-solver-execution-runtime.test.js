import test from "node:test";
import assert from "node:assert/strict";

import {
  buildReactionSolverExecutionStatusNote,
  isLegacyReactionSolverExecution,
  shouldAllowLegacyReactionSolverExecution,
} from "../src/apps/reaction/ReactionSolverExecutionRuntime.js";

test("reaction solver execution runtime marks the in-process bridge as legacy fallback", () => {
  assert.equal(isLegacyReactionSolverExecution({ mode: "in-process" }), true);
  assert.equal(
    buildReactionSolverExecutionStatusNote({ mode: "in-process" }),
    "Legacy in-process solver bridge remains active for this solve."
  );
});

test("reaction solver execution runtime stays quiet for external solves", () => {
  assert.equal(isLegacyReactionSolverExecution({ mode: "external" }), false);
  assert.equal(buildReactionSolverExecutionStatusNote({ mode: "external" }), "");
});

test("reaction solver execution runtime allows explicit legacy override", () => {
  assert.equal(shouldAllowLegacyReactionSolverExecution({ allowLegacyInProcessSolver: true }), true);
  assert.equal(shouldAllowLegacyReactionSolverExecution({ allowLegacyInProcessSolver: false }), false);
});
