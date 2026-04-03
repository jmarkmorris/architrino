import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { createReactionCanvasRuntime } from "../src/apps/reaction/ReactionCanvasRuntime.js";
import { createReactionCanvasUiRuntime } from "../src/apps/reaction/ReactionCanvasUiRuntime.js";
import { applyReactionSolveLayout } from "../src/apps/reaction/ReactionSolveLayoutRuntime.js";
import {
  buildReactionSolvePlan,
  describeReactionSolvePlan,
} from "../src/apps/reaction/ReactionSolveProposalRuntime.js";
import { applyReactionSolvePlan } from "../src/apps/reaction/ReactionSolveProjectionRuntime.js";
import { buildReactionSolveState } from "../src/apps/reaction/ReactionSolveStateRuntime.js";
import { solveReactionSnapshot, solveReactionSolverRequest } from "../src/apps/reaction/ReactionSolverContractRuntime.js";

test("reaction canvas runtime exposes the primary reaction canvas ui runtime", () => {
  assert.equal(typeof createReactionCanvasRuntime, "function");
  assert.equal(typeof createReactionCanvasUiRuntime, "function");
});

test("reaction app exports a reaction-named solve pipeline facade", () => {
  assert.equal(typeof buildReactionSolveState, "function");
  assert.equal(typeof buildReactionSolvePlan, "function");
  assert.equal(typeof describeReactionSolvePlan, "function");
  assert.equal(typeof applyReactionSolveLayout, "function");
  assert.equal(typeof applyReactionSolvePlan, "function");
  assert.equal(typeof solveReactionSnapshot, "function");
  assert.equal(typeof solveReactionSolverRequest, "function");
});

test("reaction canvas ui runtime injects the reaction-owned solve contract pipeline", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
    "utf8"
  );

  assert.match(runtimeSource, /buildReactionSolveState as defaultBuildSolveState/);
  assert.match(runtimeSource, /describeReactionSolvePlan as defaultDescribeSolvePlan/);
  assert.match(runtimeSource, /applyReactionSolvePlan as defaultApplySolvePlan/);
  assert.match(runtimeSource, /solveReactionSnapshot as defaultSolveSnapshot/);
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

test("reaction solve proposal module now owns its implementation", () => {
  const solveProposalSource = readFileSync(
    new URL("../src/apps/reaction/ReactionSolveProposalRuntime.js", import.meta.url),
    "utf8"
  );

  assert.doesNotMatch(solveProposalSource, /ComposerReactionSolveProposalRuntime/);
  assert.match(solveProposalSource, /export function buildReactionSolvePlan/);
  assert.match(solveProposalSource, /export function describeReactionSolvePlan/);
});
