import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { createReactionCanvasDocumentRuntime } from "../src/apps/reaction/ReactionCanvasDocumentRuntime.js";
import { createReactionCanvasUiRuntime } from "../src/apps/reaction/ReactionCanvasUiRuntime.js";
import { solveReactionSnapshot, solveReactionSolverRequest } from "../src/apps/reaction/ReactionSolverContractRuntime.js";
import { buildReactionSnapshotFromSolverResult } from "../src/apps/reaction/ReactionSolverResultAdapterRuntime.js";

test("reaction canvas exposes focused document and ui runtimes", () => {
  assert.equal(typeof createReactionCanvasDocumentRuntime, "function");
  assert.equal(typeof createReactionCanvasUiRuntime, "function");
});

test("reaction app exports the strict solver boundary helpers it still uses", () => {
  assert.equal(typeof solveReactionSnapshot, "function");
  assert.equal(typeof solveReactionSolverRequest, "function");
  assert.equal(typeof buildReactionSnapshotFromSolverResult, "function");
});

test("reaction canvas ui runtime delegates document/solve work to the focused document runtime", () => {
  const uiRuntimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
    "utf8"
  );
  const documentRuntimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasDocumentRuntime.js", import.meta.url),
    "utf8"
  );

  assert.match(uiRuntimeSource, /createReactionCanvasDocumentRuntime as defaultCreateCanvasDocumentRuntime/);
  assert.doesNotMatch(uiRuntimeSource, /buildReactionSnapshotFromSolverResult/);
  assert.match(documentRuntimeSource, /buildReactionSnapshotFromSolverResult/);
  assert.doesNotMatch(documentRuntimeSource, /buildReactionSolveState as defaultBuildSolveState/);
  assert.doesNotMatch(documentRuntimeSource, /describeReactionSolvePlan as defaultDescribeSolvePlan/);
  assert.doesNotMatch(documentRuntimeSource, /applyReactionSolvePlan as defaultApplySolvePlan/);
});
