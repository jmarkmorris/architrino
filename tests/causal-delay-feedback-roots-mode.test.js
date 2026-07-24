import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  NORMALIZED_FIELD_SPEED,
  createCanonicalLearnerState,
  evaluateCausalRoots,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackCausalHistory.js";
import {
  createOrdinaryFoldLesson,
  createRootsView,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackRootsMode.js";
import {
  createMockCausalDelayReplayDataset,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackReplayAdapter.js";

const REPO_ROOT = new URL("../", import.meta.url);

function linePath(pointAt, count = 401) {
  return Array.from({ length: count }, (_unused, index) => {
    const t = index / (count - 1);
    return { t, ...pointAt(t) };
  });
}

test("canonical evaluator recovers independently known one-root emission time with c_f=1", () => {
  const sourcePath = linePath(() => ({ x: 0, y: 0 }));
  const receiverPath = linePath(() => ({ x: 0.25, y: 0 }));
  const evaluation = evaluateCausalRoots({
    sourceId: "source",
    receiverId: "receiver",
    sourcePath,
    receiverPath,
    receiverTime: 1,
    signalSpeed: NORMALIZED_FIELD_SPEED,
    distanceScale: 1,
  });
  assert.equal(evaluation.acceptedRoots.length, 1);
  const [root] = evaluation.acceptedRoots;
  assert.ok(Math.abs(root.emissionTime - 0.75) < 1e-6);
  assert.ok(Math.abs(root.residual) < 1e-8);
  assert.equal(root.signalSpeed, 1);
  assert.equal(root.reason, "accepted_simple_root");
});

test("Roots exposes identical zero-crossing wake-intersection and active-root counts", () => {
  const state = createCanonicalLearnerState(createMockCausalDelayReplayDataset(), {
    receiverTime: 0.62,
  });
  const view = createRootsView(state);
  assert.equal(view.available, true);
  assert.equal(view.zeroCrossingCount, view.wakeIntersectionCount);
  assert.equal(view.wakeIntersectionCount, view.activeRootCount);
  assert.equal(view.notation, "g(Tᵣ;Tₜ)");
});

test("ordinary fold independently gives a two-root interior and no post-fold roots", () => {
  const before = createOrdinaryFoldLesson(-0.01);
  const after = createOrdinaryFoldLesson(0.01);
  assert.equal(before.roots.length, 2);
  assert.equal(before.deltaN, 2);
  assert.equal(after.roots.length, 0);
  assert.equal(after.deltaN, -2);
});

test("ordinary-fold pointwise spike is kept separate from finite accumulated velocity change", () => {
  const wide = createOrdinaryFoldLesson(-1e-2);
  const narrow = createOrdinaryFoldLesson(-1e-4);
  assert.ok(narrow.pointwiseAcceleration > wide.pointwiseAcceleration);
  assert.ok(narrow.accumulatedVelocityChange < wide.accumulatedVelocityChange);
  assert.ok(Number.isFinite(narrow.accumulatedVelocityChange));
  assert.equal(narrow.verdict, "ordinary_fold");
});

test("coincident same-source threshold does not receive the ordinary-fold verdict", () => {
  const path = linePath((t) => ({ x: t, y: 0 }));
  const evaluation = evaluateCausalRoots({
    sourceId: "self",
    receiverId: "self",
    sourcePath: path,
    receiverPath: path,
    receiverTime: 1,
    signalSpeed: 1,
    distanceScale: 1,
    selfHit: true,
    transversalityFloor: 0.01,
  });
  assert.equal(evaluation.acceptedRoots.length, 0);
  assert.ok(evaluation.rejectedRoots.length > 0);
  assert.ok(evaluation.rejectedRoots.every((root) => root.reason !== "ordinary_fold"));
});

test("runtime delegates root finding to the canonical evaluator", async () => {
  const runtime = await readFile(
    new URL("src/apps/causal-delay-feedback/CausalDelayFeedbackRuntime.js", REPO_ROOT),
    "utf8",
  );
  const method = runtime.slice(
    runtime.indexOf("solveLiveWakeEmissionPoint("),
    runtime.indexOf("\n  isSelectionVisible()", runtime.indexOf("solveLiveWakeEmissionPoint(")),
  );
  assert.match(method, /evaluateCausalRoots/u);
  assert.doesNotMatch(method, /residualAt/u);
  assert.doesNotMatch(method, /for \(let refine/u);
});

test("end-user implementation uses subscripted g(Tᵣ;Tₜ) and contains no provisional c() delay-map label", async () => {
  const sources = await Promise.all([
    readFile(new URL("causal-delay-feedback.html", REPO_ROOT), "utf8"),
    readFile(new URL("src/apps/causal-delay-feedback/CausalDelayFeedbackModeController.js", REPO_ROOT), "utf8"),
    readFile(new URL("src/apps/causal-delay-feedback/CausalDelayFeedbackRootsMode.js", REPO_ROOT), "utf8"),
  ]);
  const joined = sources.join("\n");
  assert.match(joined, /g\(Tᵣ;Tₜ\)/u);
  assert.doesNotMatch(joined, /T_[tr]/u);
  assert.doesNotMatch(joined, /(?:delay|root)[^\n"']{0,40}c\(\)/iu);
});
