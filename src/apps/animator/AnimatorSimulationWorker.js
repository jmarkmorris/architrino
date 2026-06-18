import {
  createAnimatorSimulationWorkerFailureMessage,
  createAnimatorSimulationWorkerStartedMessage,
  runAnimatorSimulationWorkerRequestAsync,
} from "./AnimatorSimulationWorkerCoreRuntime.js";
import { getAnimatorSimulationFrameBufferTransferList } from "./AnimatorSimulationFrameBufferRuntime.js";
import { createAnimatorSolverBridgeWorkerOptions } from "./AnimatorSolverBridgeWorkerRuntime.js";

const workerScope = globalThis.self ?? globalThis;
const solverBridgeOptions = createAnimatorSolverBridgeWorkerOptions(workerScope);

workerScope.addEventListener("message", async (event) => {
  const request = event?.data ?? {};
  try {
    workerScope.postMessage(createAnimatorSimulationWorkerStartedMessage(request));
    const response = await runAnimatorSimulationWorkerRequestAsync(request, solverBridgeOptions);
    workerScope.postMessage(
      response,
      getAnimatorSimulationFrameBufferTransferList(response.frameBuffer)
    );
  } catch (error) {
    workerScope.postMessage(createAnimatorSimulationWorkerFailureMessage(error, request));
  }
});
