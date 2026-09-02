import {
  createAnimatorRecordedPlaybackFailureMessage,
  createAnimatorRecordedPlaybackStartedMessage,
  runAnimatorRecordedPlaybackRequestAsync,
} from "./AnimatorRecordedPlaybackWorkerCoreRuntime.js";

const workerScope = globalThis;

workerScope.addEventListener("message", async (event) => {
  const request = event?.data ?? {};
  try {
    workerScope.postMessage(createAnimatorRecordedPlaybackStartedMessage(request));
    const response = await runAnimatorRecordedPlaybackRequestAsync(request);
    workerScope.postMessage(response, [
      response.frameBuffer.times.buffer,
      response.frameBuffer.positions.buffer,
      response.frameBuffer.velocities.buffer,
    ]);
  } catch (error) {
    workerScope.postMessage(createAnimatorRecordedPlaybackFailureMessage(error, request));
  }
});
