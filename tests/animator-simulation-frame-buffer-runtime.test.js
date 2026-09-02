import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { normalizeAnimatorSceneDocument } from "../src/runtime/Animator2SceneDocumentRuntime.js";
import {
  ANIMATOR_SIMULATION_FRAME_BUFFER_KIND,
  createAnimatorSimulationFrameBuffer,
  getAnimatorSimulationFrameBufferTransferList,
  hydrateAnimatorSimulationDatasetFromFrameBuffer,
  stripAnimatorSimulationDatasetFrames,
  summarizeAnimatorSimulationFrameBuffer,
} from "../src/apps/animator/AnimatorSimulationFrameBufferRuntime.js";

function readFixtureDataset() {
  const fixtureUrl = new URL(
    "../content/archive/pdg/animator-simulation-fixture.json",
    import.meta.url
  );
  const documentData = normalizeAnimatorSceneDocument(
    JSON.parse(readFileSync(fixtureUrl, "utf8")).scene.animator.document
  );
  return documentData.metadata.simulationDataset;
}

test("animator simulation frame buffer packs and hydrates solver frames", () => {
  const dataset = readFixtureDataset();
  const frameBuffer = createAnimatorSimulationFrameBuffer(dataset);
  const transferList = getAnimatorSimulationFrameBufferTransferList(frameBuffer);
  const summary = summarizeAnimatorSimulationFrameBuffer(frameBuffer);

  assert.equal(frameBuffer.kind, ANIMATOR_SIMULATION_FRAME_BUFFER_KIND);
  assert.equal(frameBuffer.frameCount, 7);
  assert.equal(frameBuffer.particleCount, 2);
  assert.deepEqual(frameBuffer.particleIds, ["e0", "p0"]);
  assert.equal(frameBuffer.positions instanceof Float64Array, true);
  assert.equal(frameBuffer.velocities.length, 7 * 2 * 3);
  assert.equal(transferList.length, 4);
  assert.equal(summary.byteLength, 1064);

  const hydrated = hydrateAnimatorSimulationDatasetFromFrameBuffer(
    stripAnimatorSimulationDatasetFrames(dataset),
    frameBuffer
  );

  assert.equal(hydrated.frames.length, dataset.frames.length);
  assert.deepEqual(hydrated.frames, dataset.frames);
});
