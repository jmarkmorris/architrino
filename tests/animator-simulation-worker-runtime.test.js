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
import {
  createAnimatorDefaultSolverWasmLoaderUrl,
  createAnimatorSolverBridgeWorkerOptions,
} from "../src/apps/animator/AnimatorSolverBridgeWorkerRuntime.js";
import { resolveSolverAppBridgeWorker } from "../src/solver/app/SolverAppBridgeClientResolver.mjs";
import { normalizeAnimatorSimulationDataset } from "../src/apps/animator/AnimatorSimulationDatasetRuntime.js";
import { createSolverBridgeLoopbackWorker } from "./solver-worker-loopback.mjs";

const SMALL_RUN = Object.freeze({
  steps: 8,
  stride: 4,
  particles: 2,
  kappa: 0.002,
  rootHaltPolicy: "none",
});

function createMockAnimatorSolverBridgeRunHandle(runRequest, options = {}) {
  const motionRequest = runRequest.config?.motionRequest ?? {};
  const segment = motionRequest.segment ?? {};
  const frameCount = Math.max(1, Math.round(Number(options.frameCount) || 3));
  const startTime = Number.isFinite(Number(motionRequest.startTime))
    ? Number(motionRequest.startTime)
    : Number(segment.startTime) || 0;
  const endTime = Number.isFinite(Number(motionRequest.endTime))
    ? Number(motionRequest.endTime)
    : startTime;
  const segmentStartTime = Number.isFinite(Number(segment.startTime))
    ? Number(segment.startTime)
    : startTime;
  const frameStep = frameCount > 1 ? (endTime - startTime) / (frameCount - 1) : 0;
  const pathKey = Number.isFinite(Number(options.pathKey))
    ? Number(options.pathKey)
    : Number(motionRequest.pathKey) || 1;
  const startPosition = segment.positionAtStart ?? { x: 0, y: 0, z: 0 };
  const velocity = segment.velocity ?? { x: 0, y: 0, z: 0 };
  const frames = Array.from({ length: frameCount }, (_, index) => {
    const time = startTime + frameStep * index;
    const elapsed = time - segmentStartTime;
    return {
      pathKey,
      frameIndex: index,
      time,
      position: {
        x: (Number(startPosition.x) || 0) + (Number(velocity.x) || 0) * elapsed,
        y: (Number(startPosition.y) || 0) + (Number(velocity.y) || 0) * elapsed,
        z: (Number(startPosition.z) || 0) + (Number(velocity.z) || 0) * elapsed,
      },
      velocity: {
        x: Number(velocity.x) || 0,
        y: Number(velocity.y) || 0,
        z: Number(velocity.z) || 0,
      },
      errorBound: Number(segment.errorBound) || 0,
      stateFlags: Number(motionRequest.stateFlags) || 0,
    };
  });
  return {
    requestId: runRequest.requestId,
    runId: runRequest.runId,
    datasetId: runRequest.datasetId,
    acceptedPrecisionPath: options.precisionPath ?? "event_root_focused",
    status: { code: "ok", severity: "ok", message: "simulation run completed" },
    response: {
      runId: runRequest.runId,
      datasetId: runRequest.datasetId,
      summary: {
        precisionPath: options.precisionPath ?? "event_root_focused",
        frameCount: frames.length,
        pathCount: frames.length > 0 ? 1 : 0,
        status: { code: "ok", severity: "ok", message: "motion simulation completed" },
      },
      frames,
      pathHistory: { streamId: `${runRequest.runId}:motion-path-history` },
      diagnostics: [],
      status: { code: "ok", severity: "ok", message: "motion simulation completed" },
    },
  };
}

function createMockAnimatorSolverBridgeRunner(options = {}) {
  return async function runSolverBridge(runRequest) {
    options.assertRunRequest?.(runRequest);
    return createMockAnimatorSolverBridgeRunHandle(runRequest, options);
  };
}

test("animator simulation worker core returns a transferable frame buffer from the central solver", async () => {
  const request = createAnimatorSimulationWorkerRunRequest(SMALL_RUN, {
    requestId: "worker_core_test",
    datasetOptions: { id: "worker_core_dataset" },
  });
  const message = await runAnimatorSimulationWorkerRequestAsync(request, {
    runSolverBridge: createMockAnimatorSolverBridgeRunner({
      assertRunRequest(runRequest) {
        assert.equal(runRequest.runKind, "motionSimulation");
        assert.equal(runRequest.appId, "animator");
        assert.equal(runRequest.config.motionRequest.pathKey, 1);
      },
    }),
  });

  assert.equal(message.type, "animator.simulation.complete");
  assert.equal(message.requestId, "worker_core_test");
  assert.equal(message.dataset.id, "worker_core_dataset");
  assert.equal(message.dataset.frames.length, 0);
  assert.equal(message.dataset.delayedHits.length, 0);
  assert.equal(message.frameBuffer.frameCount, 3);
  assert.equal(message.frameBuffer.particleCount, 1);
  assert.equal(message.frameBuffer.positions instanceof Float64Array, true);
  assert.equal(message.stats.completed, true);
  assert.equal(message.stats.solverEngineId, "architrino-solver-app-bridge");

  const hydrated = normalizeAnimatorSimulationDataset(
    hydrateAnimatorSimulationWorkerCompleteMessage(message).dataset
  );
  assert.equal(hydrated.frames.length, 3);
  assert.deepEqual(hydrated.frames[0].particles[0].position, [0, 0, 0]);
  assert.equal(hydrated.simulation.solver.engineId, "architrino-solver-app-bridge");
});

test("animator simulation worker core can route an opt-in run through the solver app bridge", async () => {
  const request = createAnimatorSimulationWorkerRunRequest(
    {
      solverEngine: "solver-app-bridge",
      solverBridge: {
        motionRequest: {
          pathKey: 77,
          segment: {
            startTime: 0,
            endTime: 2,
            positionAtStart: { x: 1, y: 2, z: 3 },
            velocity: { x: 2, y: 0.5, z: -1 },
            errorBound: 1e-12,
          },
          startTime: 0,
          endTime: 2,
          step: 1,
          stateFlags: 5,
        },
      },
    },
    {
      requestId: "solver_bridge_worker_test",
      datasetOptions: { id: "solver_bridge_dataset" },
    }
  );

  const message = await runAnimatorSimulationWorkerRequestAsync(request, {
    async runSolverBridge(runRequest) {
      assert.equal(runRequest.runKind, "motionSimulation");
      assert.equal(runRequest.appId, "animator");
      assert.equal(runRequest.config.motionRequest.pathKey, 77);
      assert.equal(runRequest.config.streamId, `${runRequest.runId}:motion-path-history`);
      return {
        requestId: runRequest.requestId,
        runId: runRequest.runId,
        datasetId: runRequest.datasetId,
        acceptedPrecisionPath: "scaled_f64_strict",
        status: { code: "ok", severity: "ok", message: "simulation run completed" },
        response: {
          runId: runRequest.runId,
          datasetId: runRequest.datasetId,
          summary: {
            precisionPath: "scaled_f64_strict",
            frameCount: 3,
            pathCount: 1,
            status: { code: "ok", severity: "ok", message: "motion simulation completed" },
          },
          frames: [
            {
              pathKey: 77,
              frameIndex: 0,
              time: 0,
              position: { x: 1, y: 2, z: 3 },
              velocity: { x: 2, y: 0.5, z: -1 },
              errorBound: 0,
              stateFlags: 5,
            },
            {
              pathKey: 77,
              frameIndex: 1,
              time: 1,
              position: { x: 3, y: 2.5, z: 2 },
              velocity: { x: 2, y: 0.5, z: -1 },
              errorBound: 0,
              stateFlags: 5,
            },
            {
              pathKey: 77,
              frameIndex: 2,
              time: 2,
              position: { x: 5, y: 3, z: 1 },
              velocity: { x: 2, y: 0.5, z: -1 },
              errorBound: 0,
              stateFlags: 5,
            },
          ],
          pathHistory: { streamId: `${runRequest.runId}:motion-path-history` },
          diagnostics: [],
          status: { code: "ok", severity: "ok", message: "motion simulation completed" },
        },
      };
    },
  });

  assert.equal(message.type, "animator.simulation.complete");
  assert.equal(message.requestId, "solver_bridge_worker_test");
  assert.equal(message.frameBuffer.frameCount, 3);
  assert.equal(message.frameBuffer.particleCount, 1);
  assert.equal(message.frameBuffer.positions instanceof Float64Array, true);
  assert.equal(message.stats.solverEngineId, "architrino-solver-app-bridge");
  assert.equal(message.stats.completed, true);

  const hydrated = normalizeAnimatorSimulationDataset(
    hydrateAnimatorSimulationWorkerCompleteMessage(message).dataset
  );
  assert.equal(hydrated.id, "solver_bridge_dataset");
  assert.equal(hydrated.simulation.solver.engineId, "architrino-solver-app-bridge");
  assert.equal(hydrated.simulation.halt.status, "completed");
  assert.deepEqual(hydrated.frames[2].particles[0].position, [5, 3, 1]);
});

test("animator simulation worker core can own a solver bridge client for a run", async () => {
  const request = createAnimatorSimulationWorkerRunRequest(
    {
      solverBridge: {
        enabled: true,
        motionRequest: {
          pathKey: 91,
          segment: {
            startTime: 0,
            endTime: 1,
            positionAtStart: { x: -1, y: 0, z: 2 },
            velocity: { x: 0.25, y: 0.5, z: 0 },
            errorBound: 1e-12,
          },
          startTime: 0,
          endTime: 1,
          step: 1,
          stateFlags: 7,
        },
      },
    },
    {
      requestId: "solver_bridge_client_factory_test",
      datasetOptions: { id: "solver_bridge_client_factory_dataset" },
    }
  );
  const lifecycle = { created: 0, disposed: 0 };

  const message = await runAnimatorSimulationWorkerRequestAsync(request, {
    disposeSolverBridgeClientAfterRun: true,
    async createSolverBridgeClient(factoryRequest, context) {
      lifecycle.created += 1;
      assert.equal(factoryRequest.requestId, "solver_bridge_client_factory_test");
      assert.equal(context.appId, "animator");
      assert.equal(context.requiredMethod, "runSimulation");
      assert.ok(context.requestedCapabilities.includes("motionSimulation"));
      return {
        async runSimulation(runRequest) {
          assert.equal(runRequest.runKind, "motionSimulation");
          assert.equal(runRequest.appId, "animator");
          assert.equal(runRequest.config.motionRequest.pathKey, 91);
          return {
            requestId: runRequest.requestId,
            runId: runRequest.runId,
            datasetId: runRequest.datasetId,
            acceptedPrecisionPath: "scaled_f64_strict",
            status: { code: "ok", severity: "ok", message: "simulation run completed" },
            response: {
              runId: runRequest.runId,
              datasetId: runRequest.datasetId,
              summary: {
                precisionPath: "scaled_f64_strict",
                frameCount: 2,
                pathCount: 1,
                status: { code: "ok", severity: "ok", message: "motion simulation completed" },
              },
              frames: [
                {
                  pathKey: 91,
                  frameIndex: 0,
                  time: 0,
                  position: { x: -1, y: 0, z: 2 },
                  velocity: { x: 0.25, y: 0.5, z: 0 },
                  errorBound: 0,
                  stateFlags: 7,
                },
                {
                  pathKey: 91,
                  frameIndex: 1,
                  time: 1,
                  position: { x: -0.75, y: 0.5, z: 2 },
                  velocity: { x: 0.25, y: 0.5, z: 0 },
                  errorBound: 0,
                  stateFlags: 7,
                },
              ],
              pathHistory: { streamId: `${runRequest.runId}:motion-path-history` },
              diagnostics: [],
              status: { code: "ok", severity: "ok", message: "motion simulation completed" },
            },
          };
        },
        async dispose() {
          lifecycle.disposed += 1;
        },
      };
    },
  });

  assert.equal(lifecycle.created, 1);
  assert.equal(lifecycle.disposed, 1);
  assert.equal(message.type, "animator.simulation.complete");
  assert.equal(message.stats.solverEngineId, "architrino-solver-app-bridge");
  assert.equal(message.frameBuffer.frameCount, 2);
  const hydrated = normalizeAnimatorSimulationDataset(
    hydrateAnimatorSimulationWorkerCompleteMessage(message).dataset
  );
  assert.equal(hydrated.simulation.solver.engineId, "architrino-solver-app-bridge");
  assert.deepEqual(hydrated.frames[1].particles[0].position, [-0.75, 0.5, 2]);
});

test("animator simulation worker core can own a solver bridge worker client for a run", async () => {
  const request = createAnimatorSimulationWorkerRunRequest(
    {
      solverBridge: {
        enabled: true,
        motionRequest: {
          pathKey: 92,
          segment: {
            startTime: 0,
            endTime: 1,
            positionAtStart: { x: 2, y: -1, z: 0 },
            velocity: { x: -0.5, y: 0.25, z: 1 },
            errorBound: 1e-12,
          },
          startTime: 0,
          endTime: 1,
          step: 1,
          stateFlags: 11,
        },
      },
    },
    {
      requestId: "solver_bridge_worker_client_test",
      datasetOptions: { id: "solver_bridge_worker_client_dataset" },
    }
  );
  const worker = createSolverBridgeLoopbackWorker({
    init(initRequest) {
      assert.equal(initRequest.appId, "animator");
      assert.ok(initRequest.requestedCapabilities.includes("motionSimulation"));
      return {
        apiVersion: initRequest.apiVersion,
        status: { code: "ok", severity: "ok", message: "solver initialized" },
      };
    },
    runSimulation(runRequest) {
      assert.equal(runRequest.runKind, "motionSimulation");
      assert.equal(runRequest.appId, "animator");
      assert.equal(runRequest.config.motionRequest.pathKey, 92);
      return {
        requestId: runRequest.requestId,
        runId: runRequest.runId,
        datasetId: runRequest.datasetId,
        acceptedPrecisionPath: "scaled_f64_strict",
        status: { code: "ok", severity: "ok", message: "simulation run completed" },
        response: {
          runId: runRequest.runId,
          datasetId: runRequest.datasetId,
          summary: {
            precisionPath: "scaled_f64_strict",
            frameCount: 2,
            pathCount: 1,
            status: { code: "ok", severity: "ok", message: "motion simulation completed" },
          },
          frames: [
            {
              pathKey: 92,
              frameIndex: 0,
              time: 0,
              position: { x: 2, y: -1, z: 0 },
              velocity: { x: -0.5, y: 0.25, z: 1 },
              errorBound: 0,
              stateFlags: 11,
            },
            {
              pathKey: 92,
              frameIndex: 1,
              time: 1,
              position: { x: 1.5, y: -0.75, z: 1 },
              velocity: { x: -0.5, y: 0.25, z: 1 },
              errorBound: 0,
              stateFlags: 11,
            },
          ],
          pathHistory: { streamId: `${runRequest.runId}:motion-path-history` },
          diagnostics: [],
          status: { code: "ok", severity: "ok", message: "motion simulation completed" },
        },
      };
    },
  });

  const message = await runAnimatorSimulationWorkerRequestAsync(request, {
    createSolverWorker(factoryRequest, context) {
      assert.equal(factoryRequest.requestId, "solver_bridge_worker_client_test");
      assert.equal(context.appId, "animator");
      assert.equal(context.requiredMethod, "runSimulation");
      assert.ok(context.requestedCapabilities.includes("motionSimulation"));
      return worker;
    },
  });

  assert.equal(message.type, "animator.simulation.complete");
  assert.equal(message.stats.solverEngineId, "architrino-solver-app-bridge");
  assert.equal(message.frameBuffer.frameCount, 2);
  const hydrated = normalizeAnimatorSimulationDataset(
    hydrateAnimatorSimulationWorkerCompleteMessage(message).dataset
  );
  assert.equal(hydrated.simulation.solver.engineId, "architrino-solver-app-bridge");
  assert.deepEqual(hydrated.frames[1].particles[0].position, [1.5, -0.75, 1]);
  assert.deepEqual(
    worker.messages.map((workerMessage) => workerMessage.method),
    ["init", "runSimulation", "dispose"]
  );
  assert.equal(worker.terminated, true);
});

test("animator solver bridge worker options point to the packaged ES module loader", async () => {
  const defaultLoaderUrl = createAnimatorDefaultSolverWasmLoaderUrl();
  assert.ok(defaultLoaderUrl.endsWith("/.tmp/solver-build/wasm/architrino_solver_wasm_smoke.mjs"));

  const loaderSource =
    "export default async function createModule(options = {}) {" +
    " return { located: options.locateFile('architrino_solver_wasm_smoke.wasm') };" +
    " }";
  const wasmLoaderUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(loaderSource)}`;
  const options = createAnimatorSolverBridgeWorkerOptions(
    {},
    {
      wasmLoaderUrl,
      wasmBaseUrl: "https://architrino.local/solver/",
    }
  );
  const module = await options.createWasmModule({ locateFile: options.locateFile });

  assert.equal(
    module.located,
    "https://architrino.local/solver/architrino_solver_wasm_smoke.wasm"
  );
});

test("solver bridge resolver ignores ambient Worker constructors without a worker URL", async () => {
  class AmbientWorker {
    postMessage() {}
  }

  const workerResolution = await resolveSolverAppBridgeWorker({
    appId: "animator",
    requiredMethod: "runSimulation",
    options: {
      scope: { Worker: AmbientWorker },
    },
  });

  assert.equal(workerResolution, null);
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
          const response = await runAnimatorSimulationWorkerRequestAsync(request, {
            runSolverBridge: createMockAnimatorSolverBridgeRunner(),
          });
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
  const result = await client.run(SMALL_RUN, {
    datasetOptions: { id: "client_dataset" },
  });

  assert.equal(result.dataset.id, "client_dataset");
  assert.equal(result.dataset.frames.length, 3);
  assert.equal(result.frameBufferSummary.frameCount, 3);
  assert.deepEqual(result.dataset.frames[2].particles[0].position.length, 3);
  client.terminate();
});

test("animator simulation worker dataset merges into an animator document", async () => {
  const request = createAnimatorSimulationWorkerRunRequest(SMALL_RUN, {
    requestId: "merge_test",
    datasetOptions: { id: "merge_dataset" },
  });
  const result = hydrateAnimatorSimulationWorkerCompleteMessage(
    await runAnimatorSimulationWorkerRequestAsync(request, {
      runSolverBridge: createMockAnimatorSolverBridgeRunner(),
    })
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

test("animator simulation worker dataset can preserve authored scene timing", async () => {
  const request = createAnimatorSimulationWorkerRunRequest(SMALL_RUN, {
    requestId: "merge_preserve_time_test",
    datasetOptions: { id: "merge_preserve_time_dataset" },
  });
  const result = hydrateAnimatorSimulationWorkerCompleteMessage(
    await runAnimatorSimulationWorkerRequestAsync(request, {
      runSolverBridge: createMockAnimatorSolverBridgeRunner(),
    })
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
