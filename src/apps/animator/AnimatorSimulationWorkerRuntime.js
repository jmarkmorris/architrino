import {
  hydrateAnimatorSimulationDatasetFromFrameBuffer,
  summarizeAnimatorSimulationFrameBuffer,
} from "./AnimatorSimulationFrameBufferRuntime.js";
import {
  ANIMATOR_SIMULATION_WORKER_COMPLETE_TYPE,
  ANIMATOR_SIMULATION_WORKER_ERROR_TYPE,
  createAnimatorSimulationWorkerRunRequest,
} from "./AnimatorSimulationWorkerProtocolRuntime.js";

function defaultWorkerUrl() {
  return new URL("./AnimatorSimulationWorker.js", import.meta.url);
}

function normalizeStatusText(value = "") {
  return String(value ?? "").trim();
}

export function hydrateAnimatorSimulationWorkerCompleteMessage(message = {}) {
  if (message?.type !== ANIMATOR_SIMULATION_WORKER_COMPLETE_TYPE) {
    return null;
  }
  const dataset = hydrateAnimatorSimulationDatasetFromFrameBuffer(
    message.dataset ?? {},
    message.frameBuffer ?? {}
  );
  return {
    ...message,
    dataset,
    frameBufferSummary: summarizeAnimatorSimulationFrameBuffer(message.frameBuffer ?? {}),
  };
}

export function mergeAnimatorSimulationDatasetIntoDocument(documentData = {}, dataset = {}, options = {}) {
  const scene = documentData?.scene && typeof documentData.scene === "object"
    ? documentData.scene
    : {};
  const time = dataset?.simulation?.time ?? {};
  const shouldUpdateSceneTime = options.updateSceneTime !== false;
  const nextScene = {
    ...scene,
    mode:
      options.sceneMode ??
      (dataset?.simulation?.mode === "planar-2d" ? "planar-2d" : scene.mode),
    time: shouldUpdateSceneTime
      ? {
          ...(scene.time ?? {}),
          start: time.start ?? scene.time?.start ?? 0,
          end: time.end ?? scene.time?.end ?? 1,
        }
      : scene.time,
  };
  return {
    ...documentData,
    scene: nextScene,
    metadata: {
      ...(documentData?.metadata ?? {}),
      simulationDataset: dataset,
      simulationWorker: {
        ...(documentData?.metadata?.simulationWorker ?? {}),
        lastRun: {
          engineId: dataset?.simulation?.solver?.engineId ?? "",
          datasetId: dataset?.id ?? "",
          frameCount: Array.isArray(dataset?.frames) ? dataset.frames.length : 0,
          status: dataset?.simulation?.halt?.status ?? "unknown",
        },
      },
    },
  };
}

export function createAnimatorSimulationWorkerClient(options = {}) {
  const WorkerCtor = options.WorkerCtor ?? globalThis.Worker;
  const workerUrl = options.workerUrl ?? defaultWorkerUrl();
  const workerOptions = options.workerOptions ?? { type: "module" };
  let worker = options.worker ?? null;
  const pending = new Map();

  function ensureWorker() {
    if (worker) {
      return worker;
    }
    if (typeof WorkerCtor !== "function") {
      throw new Error("Simulation worker is unavailable in this environment.");
    }
    worker = new WorkerCtor(workerUrl, workerOptions);
    worker.addEventListener?.("message", handleWorkerMessage);
    worker.addEventListener?.("error", handleWorkerError);
    return worker;
  }

  function handleWorkerMessage(event) {
    const message = event?.data ?? {};
    if (message?.type !== ANIMATOR_SIMULATION_WORKER_COMPLETE_TYPE &&
        message?.type !== ANIMATOR_SIMULATION_WORKER_ERROR_TYPE) {
      return;
    }
    const requestId = message.requestId ?? "";
    const entry = pending.get(requestId);
    if (!entry) {
      return;
    }
    pending.delete(requestId);
    if (message.type === ANIMATOR_SIMULATION_WORKER_ERROR_TYPE) {
      const errorMessage = normalizeStatusText(message.error?.message) || "Simulation worker failed.";
      entry.reject(new Error(errorMessage));
      return;
    }
    entry.resolve(hydrateAnimatorSimulationWorkerCompleteMessage(message));
  }

  function handleWorkerError(event) {
    const error = event?.error instanceof Error
      ? event.error
      : new Error(event?.message ?? "Simulation worker failed.");
    pending.forEach((entry) => entry.reject(error));
    pending.clear();
  }

  function run(config = {}, runOptions = {}) {
    const request = createAnimatorSimulationWorkerRunRequest(config, runOptions);
    return new Promise((resolve, reject) => {
      pending.set(request.requestId, { resolve, reject });
      try {
        ensureWorker().postMessage(request);
      } catch (error) {
        pending.delete(request.requestId);
        reject(error);
      }
    });
  }

  function terminate() {
    pending.forEach((entry) => {
      entry.reject(new Error("Simulation worker terminated before completing the run."));
    });
    pending.clear();
    worker?.removeEventListener?.("message", handleWorkerMessage);
    worker?.removeEventListener?.("error", handleWorkerError);
    worker?.terminate?.();
    worker = null;
  }

  return {
    run,
    terminate,
    getPendingCount: () => pending.size,
  };
}
