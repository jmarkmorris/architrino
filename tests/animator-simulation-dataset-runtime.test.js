import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  ANIMATOR_SIMULATION_DATASET_KIND,
  normalizeAnimatorSimulationDataset,
  isAnimatorSimulationDataset,
} from "../src/apps/animator/AnimatorSimulationDatasetRuntime.js";
import {
  buildAnimatorPreviewSceneData,
  normalizeAnimatorSceneDocument,
} from "../src/runtime/Animator2SceneDocumentRuntime.js";

function readFixture() {
  const fixtureUrl = new URL(
    "../content/archive/pdg/animator-simulation-fixture.json",
    import.meta.url
  );
  return JSON.parse(readFileSync(fixtureUrl, "utf8"));
}

test("animator simulation dataset normalizer preserves step-1 contract fields", () => {
  const normalized = normalizeAnimatorSimulationDataset({
    kind: ANIMATOR_SIMULATION_DATASET_KIND,
    id: "raw_fixture",
    simulation: {
      mode: "planar-2d",
      dimensions: 2,
      time: { start: 0, end: 2, dt: 1 },
    },
    particles: [{ id: "e0", q: -1, position: [-1, 0] }],
    frames: [{ t: 0, particles: [{ id: "e0", position: [-1, 0], velocity: [1, 0] }] }],
    fieldShells: [
      {
        transmitter: "e0",
        tEmit: 0,
        t: 1,
        radius: 1,
        fieldSpeed: 1,
        style: { opacity: 0.12 },
        metadata: { sourceFrameIndex: 0 },
      },
    ],
    delayedHits: [
      {
        transmitter: "e0",
        receiver: "p0",
        t: 1,
        tEmit: 0,
        metadata: { rootKind: "partner" },
      },
    ],
  });

  assert.equal(normalized.kind, ANIMATOR_SIMULATION_DATASET_KIND);
  assert.equal(normalized.simulation.mode, "planar-2d");
  assert.equal(normalized.particles[0].polarity, -1);
  assert.deepEqual(normalized.frames[0].particles[0].position, [-1, 0, 0]);
  assert.equal(normalized.fieldShells[0].transmitterId, "e0");
  assert.equal(normalized.fieldShells[0].fieldSpeed, 1);
  assert.equal(normalized.fieldShells[0].style.opacity, 0.12);
  assert.equal(normalized.fieldShells[0].metadata.sourceFrameIndex, 0);
  assert.equal(normalized.delayedHits[0].receiverId, "p0");
  assert.equal(normalized.delayedHits[0].metadata.rootKind, "partner");
  assert.equal(isAnimatorSimulationDataset(normalized), true);
});

test("static animator simulation fixture carries dataset through the animator preview bridge", () => {
  const fixture = readFixture();
  const embeddedDocument = fixture.scene.animator.document;
  const normalizedDocument = normalizeAnimatorSceneDocument(embeddedDocument);
  const dataset = normalizedDocument.metadata.simulationDataset;

  assert.equal(normalizedDocument.scene.mode, "planar-2d");
  assert.equal(dataset.kind, ANIMATOR_SIMULATION_DATASET_KIND);
  assert.equal(dataset.id, "static_two_particle_delay_fixture");
  assert.equal(dataset.simulation.halt.status, "not-run");
  assert.equal(dataset.frames.length, 7);
  assert.equal(dataset.fieldShells.length, 2);
  assert.equal(dataset.delayedHits.length, 1);
  assert.equal(normalizedDocument.assemblies.length, 2);
  assert.deepEqual(
    normalizedDocument.assemblies.map((assembly) => assembly.motion?.[0]?.type),
    ["simulation.frame", "simulation.frame"]
  );
  assert.deepEqual(dataset.frames[0].particles[0].position, [-18, -5.58, 0]);
  assert.deepEqual(dataset.frames[3].particles[0].position, [-3.6, 5.22, 0]);
  assert.deepEqual(dataset.frames[3].particles[1].position, [3.24, -3.6, 0]);
  assert.equal(dataset.frames[3].diagnostics.minimumSeparation, 11.161);
  assert.equal(normalizedDocument.paths.length, 2);
  assert.deepEqual(
    normalizedDocument.paths.map((path) => path.payload?.interpolate),
    ["spline", "spline"]
  );
  assert.equal(normalizedDocument.historyTraces.length, 2);
  assert.deepEqual(
    normalizedDocument.historyTraces.map((historyTrace) => historyTrace.style?.linePattern),
    ["dotted", "dotted"]
  );
  assert.deepEqual(
    normalizedDocument.historyTraces.map((historyTrace) => historyTrace.style?.color),
    ["#ffffff", "#ffffff"]
  );
  assert.equal(normalizedDocument.envelopes.length, 2);

  const previewScene = buildAnimatorPreviewSceneData(embeddedDocument, {
    sceneId: "animator_preview",
  });

  assert.equal(previewScene.scene.animator.document.metadata.simulationDataset.frames.length, 7);
  assert.deepEqual(
    previewScene.objects.map((object) => object.id),
    ["solver_particle_e", "solver_particle_p"]
  );
});
