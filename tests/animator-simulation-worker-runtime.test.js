import test from "node:test";
import assert from "node:assert/strict";

import {
  createAnimatorSimulationWorkerClient,
  hydrateAnimatorSimulationWorkerCompleteMessage,
  mergeAnimatorSimulationDatasetIntoDocument,
} from "../src/apps/animator/AnimatorSimulationWorkerRuntime.js";
import {
  createAnimatorSimulationWorkerRunRequest,
} from "../src/apps/animator/AnimatorSimulationWorkerProtocolRuntime.js";
import {
  runAnimatorSimulationWorkerRequest,
} from "../src/apps/animator/AnimatorSimulationWorkerCoreRuntime.js";
import { normalizeAnimatorSimulationDataset } from "../src/apps/animator/AnimatorSimulationDatasetRuntime.js";

const SMALL_RUN = Object.freeze({
  steps: 8,
  stride: 4,
  particles: 2,
  kappa: 0.002,
  rootHaltPolicy: "none",
});

test("animator simulation worker core returns a transferable frame buffer", () => {
  const request = createAnimatorSimulationWorkerRunRequest(SMALL_RUN, {
    requestId: "worker_core_test",
    datasetOptions: { id: "worker_core_dataset" },
  });
  const message = runAnimatorSimulationWorkerRequest(request);

  assert.equal(message.type, "animator.simulation.complete");
  assert.equal(message.requestId, "worker_core_test");
  assert.equal(message.dataset.id, "worker_core_dataset");
  assert.equal(message.dataset.frames.length, 0);
  assert.equal(message.frameBuffer.frameCount, 3);
  assert.equal(message.frameBuffer.positions instanceof Float64Array, true);
  assert.equal(message.stats.completed, true);

  const hydrated = normalizeAnimatorSimulationDataset(
    hydrateAnimatorSimulationWorkerCompleteMessage(message).dataset
  );
  assert.equal(hydrated.frames.length, 3);
  assert.deepEqual(hydrated.frames[0].particles[0].position, [1, 0, 0]);
  assert.equal(hydrated.diagnostics.aggregateHitStats.total_partner_hits, 16);
});

test("animator simulation worker client hydrates worker messages", async () => {
  class FakeWorker {
    constructor() {
      this.listeners = new Map();
    }

    addEventListener(type, listener) {
      this.listeners.set(type, listener);
    }

    removeEventListener(type) {
      this.listeners.delete(type);
    }

    postMessage(request) {
      queueMicrotask(() => {
        const response = runAnimatorSimulationWorkerRequest(request);
        this.listeners.get("message")?.({ data: response });
      });
    }

    terminate() {
      this.terminated = true;
    }
  }

  const client = createAnimatorSimulationWorkerClient({
    WorkerCtor: FakeWorker,
    workerUrl: "fake-worker.js",
  });
  const result = await client.run(SMALL_RUN, {
    datasetOptions: { id: "client_dataset" },
  });

  assert.equal(result.dataset.id, "client_dataset");
  assert.equal(result.dataset.frames.length, 3);
  assert.equal(result.frameBufferSummary.frameCount, 3);
  assert.deepEqual(result.dataset.frames[2].particles[1].position.length, 3);
  client.terminate();
});

test("animator simulation worker dataset merges into an animator document", () => {
  const request = createAnimatorSimulationWorkerRunRequest(SMALL_RUN, {
    requestId: "merge_test",
    datasetOptions: { id: "merge_dataset" },
  });
  const result = hydrateAnimatorSimulationWorkerCompleteMessage(
    runAnimatorSimulationWorkerRequest(request)
  );
  const documentData = mergeAnimatorSimulationDatasetIntoDocument(
    {
      scene: {
        id: "scene_a",
        name: "Scene A",
        mode: "3d",
        time: { start: 0, end: 24 },
      },
      metadata: { source: "animator" },
    },
    result.dataset
  );

  assert.equal(documentData.scene.mode, "planar-2d");
  assert.equal(documentData.scene.time.end, 0.08);
  assert.equal(documentData.metadata.simulationDataset.id, "merge_dataset");
  assert.equal(documentData.metadata.simulationWorker.lastRun.frameCount, 3);
});
