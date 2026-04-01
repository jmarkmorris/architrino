import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { createReactionSolverRuntime } from "../src/apps/reaction/ReactionSolverRuntime.js";
import { createReactionSolverUiRuntime } from "../src/apps/reaction/ReactionSolverUiRuntime.js";
import { applyReactionSolveLayout } from "../src/apps/reaction/ReactionSolveLayoutRuntime.js";
import {
  buildReactionSolvePlan,
  describeReactionSolvePlan,
} from "../src/apps/reaction/ReactionSolveProposalRuntime.js";
import { applyReactionSolvePlan } from "../src/apps/reaction/ReactionSolveProjectionRuntime.js";
import { buildReactionSolveState } from "../src/apps/reaction/ReactionSolveStateRuntime.js";

test("reaction solver runtime remains a compatibility wrapper over reaction solver ui runtime", () => {
  assert.equal(typeof createReactionSolverRuntime, "function");
  assert.equal(typeof createReactionSolverUiRuntime, "function");
});

test("reaction app exports a reaction-named solve pipeline facade", () => {
  assert.equal(typeof buildReactionSolveState, "function");
  assert.equal(typeof buildReactionSolvePlan, "function");
  assert.equal(typeof describeReactionSolvePlan, "function");
  assert.equal(typeof applyReactionSolveLayout, "function");
  assert.equal(typeof applyReactionSolvePlan, "function");
});

test("reaction solver ui runtime injects the reaction-owned solve pipeline", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionSolverUiRuntime.js", import.meta.url),
    "utf8"
  );

  assert.match(runtimeSource, /buildSolveState:\s*buildReactionSolveState/);
  assert.match(runtimeSource, /buildSolvePlan:\s*buildReactionSolvePlan/);
  assert.match(runtimeSource, /describeSolvePlan:\s*describeReactionSolvePlan/);
  assert.match(runtimeSource, /applySolveLayout:\s*applyReactionSolveLayout/);
  assert.match(runtimeSource, /applySolvePlan:\s*applyReactionSolvePlan/);
});

test("reaction solve-state, layout, and projection modules now own their implementations", () => {
  const solveStateSource = readFileSync(
    new URL("../src/apps/reaction/ReactionSolveStateRuntime.js", import.meta.url),
    "utf8"
  );
  const solveLayoutSource = readFileSync(
    new URL("../src/apps/reaction/ReactionSolveLayoutRuntime.js", import.meta.url),
    "utf8"
  );
  const solveProjectionSource = readFileSync(
    new URL("../src/apps/reaction/ReactionSolveProjectionRuntime.js", import.meta.url),
    "utf8"
  );

  assert.doesNotMatch(solveStateSource, /ComposerReactionSolveStateRuntime/);
  assert.doesNotMatch(solveLayoutSource, /ComposerReactionSolveLayoutRuntime/);
  assert.doesNotMatch(solveProjectionSource, /ComposerReactionSolveProjectionRuntime/);
});
