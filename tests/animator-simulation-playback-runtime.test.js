import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { normalizeAnimatorSceneDocument } from "../src/runtime/Animator2SceneDocumentRuntime.js";
import {
  getAnimatorSimulationDataset,
  getAnimatorSimulationFrameMotion,
  getAnimatorSimulationParticleId,
  sampleAnimatorSimulationDatasetAtTime,
  sampleAnimatorSimulationParticleAtTime,
  sampleAnimatorSimulationParticleTrail,
} from "../src/apps/animator/AnimatorSimulationPlaybackRuntime.js";

function readFixtureDocument() {
  const fixtureUrl = new URL(
    "../content/archive/pdg/animator-simulation-fixture.json",
    import.meta.url
  );
  return JSON.parse(readFileSync(fixtureUrl, "utf8")).scene.animator.document;
}

function roundTriplet(triplet) {
  return triplet.map((value) => Number(value.toFixed(6)));
}

test("animator simulation playback samples particles from solver frames", () => {
  const documentData = normalizeAnimatorSceneDocument(readFixtureDocument());
  const dataset = getAnimatorSimulationDataset(documentData);

  assert.ok(dataset);
  assert.equal(dataset.frames.length, 5);

  const assembly = documentData.assemblies.find((entry) => entry.id === "solver_particle_e");
  const motion = getAnimatorSimulationFrameMotion(assembly);
  assert.equal(getAnimatorSimulationParticleId(motion, assembly), "e0");

  const sample = sampleAnimatorSimulationParticleAtTime(dataset, "e0", 1.5);
  assert.deepEqual(roundTriplet(sample.position), [-0.74, 0.535, 0]);
  assert.deepEqual(roundTriplet(sample.velocity), [1.275, -0.085, 0]);
  assert.equal(sample.frame.fromTime, 1);
  assert.equal(sample.frame.toTime, 2);
  assert.equal(sample.frame.alpha, 0.5);
});

test("animator simulation playback returns elapsed trails and frame diagnostics", () => {
  const documentData = normalizeAnimatorSceneDocument(readFixtureDocument());
  const dataset = getAnimatorSimulationDataset(documentData);

  const trail = sampleAnimatorSimulationParticleTrail(dataset, "p0", 2.5);
  assert.deepEqual(
    trail.map((sample) => roundTriplet(sample.position)),
    [
      [2.4, 0.55, 0],
      [1.3, -0.35, 0],
      [0.18, -0.72, 0],
      [-0.535, -0.45, 0],
    ]
  );

  const frameSample = sampleAnimatorSimulationDatasetAtTime(dataset, 2.1);
  assert.equal(frameSample.particles.length, 2);
  assert.equal(frameSample.diagnostics.partnerHits, 1);
  assert.equal(frameSample.diagnostics.minimumSeparation, 1.484);
});
