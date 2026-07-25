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
  runAnimatorSimulationWorkerRequestAsync,
} from "../src/apps/animator/AnimatorSimulationWorkerCoreRuntime.js";
import { normalizeAnimatorSimulationDataset } from "../src/apps/animator/AnimatorSimulationDatasetRuntime.js";
import {
  EOM_EVOLUTION_CONTRACT_ID,
} from "../src/apps/shared/EomHistoryDataset.mjs";

// Inertial worldlines carried as exact cubic segments, so every sampled
// display value is checkable in closed form (position = x0 + v * t).
function createEomRecordFixture(overrides = {}) {
  return {
    contractId: EOM_EVOLUTION_CONTRACT_ID,
    runId: "eom-display-fixture-run",
    requestId: "eom-display-fixture-request",
    claimLevel: "evolved-record",
    evidenceStatus: "canonical",
    absoluteTimeInterval: { start: "0", end: "2" },
    provenance: { engineId: "eom-solver" },
    histories: [
      {
        pathId: "1",
        pathKey: 1,
        charge: "1",
        stateFlags: 1,
        coverageStart: "0",
        coverageEnd: "2",
        interpolation: "exact-inertial-polynomial/v1",
        segments: [
          {
            startTime: "0",
            endTime: "1",
            coefficients: [
              ["1", "2", "0", "0"],
              ["2", "0.5", "0", "0"],
              ["3", "-1", "0", "0"],
            ],
            positionError: "0",
            velocityError: "0",
          },
          {
            startTime: "1",
            endTime: "2",
            coefficients: [
              ["3", "2", "0", "0"],
              ["2.5", "0.5", "0", "0"],
              ["2", "-1", "0", "0"],
            ],
            positionError: "0",
            velocityError: "0",
          },
        ],
      },
      {
        pathId: "2",
        pathKey: 2,
        charge: "-1",
        stateFlags: 2,
        coverageStart: "0",
        coverageEnd: "2",
        interpolation: "exact-inertial-polynomial/v1",
        segments: [
          {
            startTime: "0",
            endTime: "2",
            coefficients: [
              ["0", "0.25", "0", "0"],
              ["0", "0.5", "0", "0"],
              ["0", "0", "0", "0"],
            ],
            positionError: "0",
            velocityError: "0",
          },
        ],
      },
    ],
    ...overrides,
  };
}

test("animator simulation worker samples display frames from a recorded EOM dataset", async () => {
  const request = createAnimatorSimulationWorkerRunRequest(
    {
      eomRecord: createEomRecordFixture(),
      frameCount: 3,
    },
    {
      requestId: "worker_core_test",
      datasetOptions: { id: "worker_core_dataset" },
    }
  );
  const message = await runAnimatorSimulationWorkerRequestAsync(request);

  assert.equal(message.type, "animator.simulation.complete");
  assert.equal(message.requestId, "worker_core_test");
  assert.equal(message.dataset.id, "worker_core_dataset");
  assert.equal(message.dataset.frames.length, 0);
  assert.equal(message.dataset.delayedHits.length, 0);
  assert.equal(message.frameBuffer.frameCount, 3);
  assert.equal(message.frameBuffer.particleCount, 2);
  assert.equal(message.frameBuffer.positions instanceof Float64Array, true);
  assert.equal(message.stats.completed, true);
  assert.equal(message.stats.engineId, "eom-solver");
  assert.equal(message.stats.runId, "eom-display-fixture-run");
  assert.equal(message.stats.claimGrade, "evolved-record");

  const hydrated = normalizeAnimatorSimulationDataset(
    hydrateAnimatorSimulationWorkerCompleteMessage(message).dataset
  );
  assert.equal(hydrated.frames.length, 3);
  assert.equal(hydrated.claimLevel, "evolved-record");
  assert.equal(hydrated.simulation.solver.engineId, "eom-solver");
  assert.equal(hydrated.simulation.solver.runId, "eom-display-fixture-run");
  assert.equal(hydrated.simulation.halt.status, "completed");
  assert.deepEqual(hydrated.frames[0].particles[0].position, [1, 2, 3]);
  assert.deepEqual(hydrated.frames[2].particles[0].position, [5, 3, 1]);
  assert.deepEqual(hydrated.frames[2].particles[1].position, [0.5, 1, 0]);
});

test("animator simulation worker dataset carries record provenance", async () => {
  const request = createAnimatorSimulationWorkerRunRequest(
    { eomRecord: createEomRecordFixture(), frameCount: 2 },
    { requestId: "provenance_test", datasetOptions: { id: "provenance_dataset" } }
  );
  const message = await runAnimatorSimulationWorkerRequestAsync(request);

  assert.equal(message.dataset.provenance.engineId, "eom-solver");
  assert.equal(message.dataset.provenance.contractId, EOM_EVOLUTION_CONTRACT_ID);
  assert.equal(message.dataset.provenance.runId, "eom-display-fixture-run");
  assert.equal(message.dataset.provenance.claimGrade, "evolved-record");
  assert.equal(message.dataset.provenance.evidenceStatus, "canonical");
  assert.equal(message.dataset.claimLevel, "evolved-record");
  assert.equal(message.dataset.particles[0].polarity, 1);
  assert.equal(message.dataset.particles[1].polarity, -1);
  assert.equal(message.dataset.particles[0].chargeType, "eom-worldline");
});

test("animator simulation worker does not advance without a recorded EOM dataset", async () => {
  const request = createAnimatorSimulationWorkerRunRequest(
    { steps: 8, dt: 0.01 },
    { requestId: "missing_record_test" }
  );
  await assert.rejects(
    runAnimatorSimulationWorkerRequestAsync(request),
    /requires a recorded eom_evolution_contract\/v0 dataset/
  );
});

test("animator simulation worker does not advance on a foreign contract id", async () => {
  const request = createAnimatorSimulationWorkerRunRequest(
    { eomRecord: createEomRecordFixture({ contractId: "solver-app-bridge/v2" }) },
    { requestId: "foreign_contract_test" }
  );
  await assert.rejects(
    runAnimatorSimulationWorkerRequestAsync(request),
    /requires contractId eom_evolution_contract\/v0/
  );
});

test("animator simulation worker does not advance on a record without a claim grade", async () => {
  const record = createEomRecordFixture();
  delete record.claimLevel;
  const request = createAnimatorSimulationWorkerRunRequest(
    { eomRecord: record },
    { requestId: "missing_claim_grade_test" }
  );
  await assert.rejects(
    runAnimatorSimulationWorkerRequestAsync(request),
    /claim grade/
  );
});

test("animator simulation worker can load the EOM record through an injected loader", async () => {
  const request = createAnimatorSimulationWorkerRunRequest(
    { frameCount: 2 },
    { requestId: "record_loader_test", datasetOptions: { id: "record_loader_dataset" } }
  );
  let loaderCalls = 0;
  const message = await runAnimatorSimulationWorkerRequestAsync(request, {
    async loadEomRecord(workerRequest) {
      loaderCalls += 1;
      assert.equal(workerRequest.requestId, "record_loader_test");
      return createEomRecordFixture();
    },
  });

  assert.equal(loaderCalls, 1);
  assert.equal(message.type, "animator.simulation.complete");
  assert.equal(message.frameBuffer.frameCount, 2);
  assert.equal(message.stats.engineId, "eom-solver");
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
      queueMicrotask(async () => {
        try {
          const response = await runAnimatorSimulationWorkerRequestAsync(request);
          this.listeners.get("message")?.({ data: response });
        } catch (error) {
          this.listeners.get("error")?.({ error, message: error?.message });
        }
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
  const result = await client.run(
    { eomRecord: createEomRecordFixture(), frameCount: 3 },
    { datasetOptions: { id: "client_dataset" } }
  );

  assert.equal(result.dataset.id, "client_dataset");
  assert.equal(result.dataset.frames.length, 3);
  assert.equal(result.frameBufferSummary.frameCount, 3);
  assert.deepEqual(result.dataset.frames[2].particles[0].position.length, 3);
  client.terminate();
});

test("animator simulation worker dataset merges into an animator document", async () => {
  const request = createAnimatorSimulationWorkerRunRequest(
    { eomRecord: createEomRecordFixture(), frameCount: 3 },
    { requestId: "merge_test", datasetOptions: { id: "merge_dataset" } }
  );
  const result = hydrateAnimatorSimulationWorkerCompleteMessage(
    await runAnimatorSimulationWorkerRequestAsync(request)
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
  assert.equal(documentData.scene.time.end, 2);
  assert.equal(documentData.metadata.simulationDataset.id, "merge_dataset");
  assert.equal(documentData.metadata.simulationWorker.lastRun.frameCount, 3);
  assert.equal(documentData.metadata.simulationWorker.lastRun.engineId, "eom-solver");
});

test("animator simulation worker dataset can preserve authored scene timing", async () => {
  const request = createAnimatorSimulationWorkerRunRequest(
    { eomRecord: createEomRecordFixture(), frameCount: 3 },
    { requestId: "merge_preserve_time_test", datasetOptions: { id: "merge_preserve_time_dataset" } }
  );
  const result = hydrateAnimatorSimulationWorkerCompleteMessage(
    await runAnimatorSimulationWorkerRequestAsync(request)
  );
  const documentData = mergeAnimatorSimulationDatasetIntoDocument(
    {
      scene: {
        id: "scene_a",
        name: "Scene A",
        mode: "3d",
        time: { start: 0, end: 6, playbackRate: 1 },
        markers: [
          { id: "start", t: 0, end: 1, label: "fixture start" },
          { id: "hit", t: 3, end: 4, label: "delayed hit sample" },
        ],
      },
      metadata: { source: "animator" },
    },
    result.dataset,
    { updateSceneTime: false }
  );

  assert.equal(documentData.scene.mode, "planar-2d");
  assert.deepEqual(documentData.scene.time, { start: 0, end: 6, playbackRate: 1 });
  assert.equal(documentData.scene.markers.length, 2);
  assert.equal(documentData.scene.markers[1].label, "delayed hit sample");
  assert.equal(documentData.metadata.simulationDataset.id, "merge_preserve_time_dataset");
});
