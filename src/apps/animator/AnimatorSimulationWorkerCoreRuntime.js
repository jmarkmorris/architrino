import { runAssemblyDynamicsDataset } from "../../../scripts/simulations/lib/assembly-dynamics-engine.mjs";
import {
  createAnimatorSimulationFrameBuffer,
  stripAnimatorSimulationDatasetFrames,
  summarizeAnimatorSimulationFrameBuffer,
} from "./AnimatorSimulationFrameBufferRuntime.js";
import {
  ANIMATOR_SIMULATION_WORKER_COMPLETE_TYPE,
  ANIMATOR_SIMULATION_WORKER_REQUEST_TYPE,
  ANIMATOR_SIMULATION_WORKER_STARTED_TYPE,
  createAnimatorSimulationWorkerErrorMessage,
} from "./AnimatorSimulationWorkerProtocolRuntime.js";

export function createAnimatorSimulationWorkerStartedMessage(request = {}) {
  return {
    type: ANIMATOR_SIMULATION_WORKER_STARTED_TYPE,
    requestId: request?.requestId ?? "",
  };
}

export function runAnimatorSimulationWorkerRequest(request = {}, options = {}) {
  if (request?.type !== ANIMATOR_SIMULATION_WORKER_REQUEST_TYPE) {
    throw new Error(`Unsupported simulation worker request type: ${request?.type ?? ""}`);
  }
  const runDataset =
    typeof options.runDataset === "function" ? options.runDataset : runAssemblyDynamicsDataset;
  const dataset = runDataset(request.config ?? {}, request.datasetOptions ?? {});
  const frameBuffer = createAnimatorSimulationFrameBuffer(dataset);
  const datasetSkeleton = stripAnimatorSimulationDatasetFrames(dataset);
  const frameBufferSummary = summarizeAnimatorSimulationFrameBuffer(frameBuffer);
  return {
    type: ANIMATOR_SIMULATION_WORKER_COMPLETE_TYPE,
    requestId: request.requestId ?? "",
    dataset: datasetSkeleton,
    frameBuffer,
    stats: {
      ...frameBufferSummary,
      completed: dataset?.simulation?.halt?.status === "completed",
      haltStatus: dataset?.simulation?.halt?.status ?? "unknown",
      haltCode: dataset?.simulation?.halt?.code ?? null,
    },
  };
}

export function createAnimatorSimulationWorkerFailureMessage(error, request = {}) {
  return createAnimatorSimulationWorkerErrorMessage(error, request?.requestId ?? "");
}
