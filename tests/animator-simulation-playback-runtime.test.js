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
  assert.equal(dataset.frames.length, 7);

  const assembly = documentData.assemblies.find((entry) => entry.id === "solver_particle_e");
  const motion = getAnimatorSimulationFrameMotion(assembly);
  assert.equal(getAnimatorSimulationParticleId(motion, assembly), "e0");

  const sample = sampleAnimatorSimulationParticleAtTime(dataset, "e0", 1.5);
  assert.deepEqual(roundTriplet(sample.position), [-13.5, 0.36, 0]);
  assert.deepEqual(roundTriplet(sample.velocity), [4.95, 3.78, 0]);
  assert.equal(sample.frame.fromTime, 1);
  assert.equal(sample.frame.toTime, 2);
  assert.equal(sample.frame.alpha, 0.5);
});

test("animator simulation playback returns elapsed trails and frame diagnostics", () => {
  const documentData = normalizeAnimatorSceneDocument(readFixtureDocument());
  const dataset = getAnimatorSimulationDataset(documentData);

  const trail = sampleAnimatorSimulationParticleTrail(dataset, "p0", 3.5);
  assert.deepEqual(
    trail.map((sample) => roundTriplet(sample.position)),
    [
      [18, 5.58, 0],
      [14.76, 2.52, 0],
      [9, -0.9, 0],
      [3.24, -3.6, 0],
      [-0.63, -4.68, 0],
    ]
  );

  const frameSample = sampleAnimatorSimulationDatasetAtTime(dataset, 3.1);
  assert.equal(frameSample.particles.length, 2);
  assert.equal(frameSample.diagnostics.minimumSeparation, 11.161);
  assert.equal(frameSample.diagnostics.shellRadius, 6.341);
});
