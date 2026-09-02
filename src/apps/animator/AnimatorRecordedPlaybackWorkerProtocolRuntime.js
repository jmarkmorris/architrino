export const ANIMATOR_RECORDED_PLAYBACK_REQUEST_TYPE = "animator.recorded-playback.request";
export const ANIMATOR_RECORDED_PLAYBACK_STARTED_TYPE = "animator.recorded-playback.started";
export const ANIMATOR_RECORDED_PLAYBACK_COMPLETE_TYPE = "animator.recorded-playback.complete";
export const ANIMATOR_RECORDED_PLAYBACK_ERROR_TYPE = "animator.recorded-playback.error";

let nextRequestSequence = 1;

export function createAnimatorRecordedPlaybackRequest(handoff, options = {}) {
  const requestId = options.requestId ?? `animator_recorded_playback_${nextRequestSequence++}`;
  return {
    type: ANIMATOR_RECORDED_PLAYBACK_REQUEST_TYPE,
    requestId,
    handoff,
    playbackOptions: options.playbackOptions && typeof options.playbackOptions === "object"
      ? { ...options.playbackOptions }
      : {},
    datasetOptions: options.datasetOptions && typeof options.datasetOptions === "object"
      ? { ...options.datasetOptions }
      : {},
  };
}

export function createAnimatorRecordedPlaybackErrorMessage(error, requestId = "") {
  return {
    type: ANIMATOR_RECORDED_PLAYBACK_ERROR_TYPE,
    requestId,
    error: {
      name: error?.name ?? "Error",
      message: error?.message ?? String(error ?? "Recorded playback failed."),
      stack: error?.stack ?? "",
    },
  };
}
