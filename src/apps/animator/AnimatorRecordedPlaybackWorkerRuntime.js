import {
  hydrateAnimatorSimulationDatasetFromFrameBuffer,
  summarizeAnimatorSimulationFrameBuffer,
} from "./AnimatorSimulationFrameBufferRuntime.js";
import {
  ANIMATOR_RECORDED_PLAYBACK_COMPLETE_TYPE,
  ANIMATOR_RECORDED_PLAYBACK_ERROR_TYPE,
  createAnimatorRecordedPlaybackRequest,
} from "./AnimatorRecordedPlaybackWorkerProtocolRuntime.js";

function defaultWorkerUrl() {
  return new URL("./AnimatorRecordedPlaybackWorker.js", import.meta.url);
}

export function hydrateAnimatorRecordedPlaybackCompleteMessage(message = {}) {
  if (message?.type !== ANIMATOR_RECORDED_PLAYBACK_COMPLETE_TYPE) return null;
  return {
    ...message,
    dataset: hydrateAnimatorSimulationDatasetFromFrameBuffer(
      message.dataset ?? {},
      message.frameBuffer ?? {},
    ),
    frameBufferSummary: summarizeAnimatorSimulationFrameBuffer(message.frameBuffer ?? {}),
  };
}

export function mergeAnimatorRecordedPlaybackIntoDocument(documentData = {}, dataset = {}, options = {}) {
  const scene = documentData?.scene && typeof documentData.scene === "object" ? documentData.scene : {};
  const time = dataset?.simulation?.time ?? {};
  return {
    ...documentData,
    scene: {
      ...scene,
      mode: options.sceneMode ?? (dataset?.simulation?.mode === "planar-2d" ? "planar-2d" : scene.mode),
      time: options.updateSceneTime === false ? scene.time : {
        ...(scene.time ?? {}),
        start: time.start ?? scene.time?.start ?? 0,
        end: time.end ?? scene.time?.end ?? 1,
      },
    },
    metadata: {
      ...(documentData?.metadata ?? {}),
      simulationDataset: dataset,
      recordedEomPlayback: {
        handoffSchema: dataset?.provenance?.handoffSchema ?? "",
        recordSha256: dataset?.provenance?.recordSha256 ?? "",
        engineId: dataset?.provenance?.engineId ?? "",
        engineVersion: dataset?.provenance?.engineVersion ?? "",
        runId: dataset?.provenance?.runId ?? "",
        claimGrade: dataset?.provenance?.claimGrade ?? "",
        evidenceStatus: dataset?.provenance?.evidenceStatus ?? "",
        status: dataset?.simulation?.halt?.status ?? "unknown",
      },
    },
  };
}

export function createAnimatorRecordedPlaybackWorkerClient(options = {}) {
  const WorkerCtor = options.WorkerCtor ?? globalThis.Worker;
  const workerUrl = options.workerUrl ?? defaultWorkerUrl();
  const workerOptions = options.workerOptions ?? { type: "module" };
  let worker = options.worker ?? null;
  const pending = new Map();

  function ensureWorker() {
    if (worker) return worker;
    if (typeof WorkerCtor !== "function") throw new Error("Recorded playback worker is unavailable.");
    worker = new WorkerCtor(workerUrl, workerOptions);
    worker.addEventListener?.("message", handleWorkerMessage);
    worker.addEventListener?.("error", handleWorkerError);
    return worker;
  }

  function handleWorkerMessage(event) {
    const message = event?.data ?? {};
    if (![ANIMATOR_RECORDED_PLAYBACK_COMPLETE_TYPE, ANIMATOR_RECORDED_PLAYBACK_ERROR_TYPE].includes(message.type)) return;
    const entry = pending.get(message.requestId ?? "");
    if (!entry) return;
    pending.delete(message.requestId ?? "");
    if (message.type === ANIMATOR_RECORDED_PLAYBACK_ERROR_TYPE) {
      entry.reject(new Error(String(message.error?.message ?? "Recorded playback failed.")));
      return;
    }
    entry.resolve(hydrateAnimatorRecordedPlaybackCompleteMessage(message));
  }

  function handleWorkerError(event) {
    const error = event?.error instanceof Error
      ? event.error
      : new Error(event?.message ?? "Recorded playback worker failed.");
    pending.forEach((entry) => entry.reject(error));
    pending.clear();
  }

  function load(handoff, loadOptions = {}) {
    const request = createAnimatorRecordedPlaybackRequest(handoff, loadOptions);
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
    pending.forEach((entry) => entry.reject(new Error("Recorded playback worker terminated.")));
    pending.clear();
    worker?.removeEventListener?.("message", handleWorkerMessage);
    worker?.removeEventListener?.("error", handleWorkerError);
    worker?.terminate?.();
    worker = null;
  }

  return { load, terminate, getPendingCount: () => pending.size };
}
