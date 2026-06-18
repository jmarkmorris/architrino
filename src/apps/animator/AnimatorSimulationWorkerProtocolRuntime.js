export const ANIMATOR_SIMULATION_WORKER_REQUEST_TYPE = "animator.simulation.run";
export const ANIMATOR_SIMULATION_WORKER_STARTED_TYPE = "animator.simulation.started";
export const ANIMATOR_SIMULATION_WORKER_COMPLETE_TYPE = "animator.simulation.complete";
export const ANIMATOR_SIMULATION_WORKER_ERROR_TYPE = "animator.simulation.error";
export const ANIMATOR_SOLVER_BRIDGE_ENGINE_ID = "architrino-solver-app-bridge";

let nextAnimatorSimulationWorkerRequestId = 1;

function nextRequestId() {
  const value = nextAnimatorSimulationWorkerRequestId;
  nextAnimatorSimulationWorkerRequestId += 1;
  return `animator_simulation_${value}`;
}

export function createAnimatorSimulationWorkerRunRequest(config = {}, options = {}) {
  return {
    type: ANIMATOR_SIMULATION_WORKER_REQUEST_TYPE,
    requestId: options.requestId ?? nextRequestId(),
    config: config && typeof config === "object" ? { ...config } : {},
    datasetOptions:
      options.datasetOptions && typeof options.datasetOptions === "object"
        ? { ...options.datasetOptions }
        : {},
  };
}

export function isAnimatorSimulationWorkerCompleteMessage(message = {}) {
  return message?.type === ANIMATOR_SIMULATION_WORKER_COMPLETE_TYPE;
}

export function isAnimatorSimulationWorkerErrorMessage(message = {}) {
  return message?.type === ANIMATOR_SIMULATION_WORKER_ERROR_TYPE;
}

export function createAnimatorSimulationWorkerErrorMessage(error, requestId = "") {
  return {
    type: ANIMATOR_SIMULATION_WORKER_ERROR_TYPE,
    requestId,
    error: {
      name: error?.name ?? "Error",
      message: error?.message ?? String(error ?? "Simulation worker failed."),
      stack: error?.stack ?? "",
    },
  };
}
