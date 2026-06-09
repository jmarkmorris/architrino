import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { normalizeAnimatorSceneDocument } from "../src/runtime/Animator2SceneDocumentRuntime.js";
import {
  getAnimatorAssemblyMotionSourceKind,
  getAnimatorPathMotionSourceKind,
  isAnimatorMotionSourceVisible,
  summarizeAnimatorMotionSources,
} from "../src/apps/animator/AnimatorMotionSourceRuntime.js";

function readFixtureDocument() {
  const fixtureUrl = new URL(
    "../content/archive/pdg/animator-simulation-fixture.json",
    import.meta.url
  );
  return JSON.parse(readFileSync(fixtureUrl, "utf8")).scene.animator.document;
}

test("animator motion source summary labels solver-derived fixture motion", () => {
  const documentData = normalizeAnimatorSceneDocument(readFixtureDocument());
  const summary = summarizeAnimatorMotionSources(documentData);

  assert.equal(summary.sourceKind, "solver-derived");
  assert.equal(summary.label, "Motion: Solver-derived");
  assert.equal(summary.hasSimulationDataset, true);
  assert.equal(summary.hasAuthoredMotion, false);
  assert.match(summary.detail, /Claim: fixture-only/);
  assert.match(summary.detail, /Engine: static-fixture/);
});

test("animator motion source helpers drive source visibility controls", () => {
  assert.equal(
    getAnimatorAssemblyMotionSourceKind({
      metadata: { motionSource: "solver-derived" },
      motion: [{ type: "simulation.frame", particleId: "e0" }],
    }),
    "solver-derived"
  );
  assert.equal(
    getAnimatorAssemblyMotionSourceKind({
      motion: [{ type: "path.transport", pathId: "path_a" }],
    }),
    "authored"
  );
  assert.equal(
    getAnimatorPathMotionSourceKind({
      kind: "simulation.sampled_path",
      payload: { points: [[0, 0, 0], [1, 0, 0]] },
    }),
    "solver-derived"
  );
  assert.equal(
    isAnimatorMotionSourceVisible("solver-derived", {
      showSolverMotion: false,
      showAuthoredMotion: true,
    }),
    false
  );
  assert.equal(
    isAnimatorMotionSourceVisible("authored", {
      showSolverMotion: true,
      showAuthoredMotion: false,
    }),
    false
  );
  assert.equal(
    isAnimatorMotionSourceVisible("mixed", {
      showSolverMotion: false,
      showAuthoredMotion: true,
    }),
    true
  );
});

test("animator motion source summary separates authored and mixed motion", () => {
  const authored = summarizeAnimatorMotionSources({
    assemblies: [
      {
        id: "authored_particle",
        motion: [{ type: "path.transport", pathId: "path_authored_particle" }],
      },
    ],
  });
  assert.equal(authored.sourceKind, "authored");
  assert.equal(authored.label, "Motion: Authored");

  const mixed = summarizeAnimatorMotionSources({
    metadata: { simulationDataset: { claimLevel: "fixture-only" } },
    assemblies: [
      {
        id: "solver_particle",
        motion: [{ type: "simulation.frame", particleId: "e0" }],
      },
      {
        id: "authored_particle",
        motion: [{ type: "path.transport", pathId: "path_authored_particle" }],
      },
    ],
  });
  assert.equal(mixed.sourceKind, "mixed");
  assert.equal(mixed.label, "Motion: Mixed");
  assert.equal(mixed.hasSolverMotion, true);
  assert.equal(mixed.hasAuthoredMotion, true);
});
