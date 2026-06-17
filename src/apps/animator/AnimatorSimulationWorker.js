import {
  createAnimatorSimulationWorkerFailureMessage,
  createAnimatorSimulationWorkerStartedMessage,
  runAnimatorSimulationWorkerRequestAsync,
} from "./AnimatorSimulationWorkerCoreRuntime.js";
import { getAnimatorSimulationFrameBufferTransferList } from "./AnimatorSimulationFrameBufferRuntime.js";

const workerScope = globalThis.self ?? globalThis;

workerScope.addEventListener("message", async (event) => {
  const request = event?.data ?? {};
  try {
    workerScope.postMessage(createAnimatorSimulationWorkerStartedMessage(request));
    const response = await runAnimatorSimulationWorkerRequestAsync(request);
    workerScope.postMessage(
      response,
      getAnimatorSimulationFrameBufferTransferList(response.frameBuffer)
    );
  } catch (error) {
    workerScope.postMessage(createAnimatorSimulationWorkerFailureMessage(error, request));
  }
});
