export const BORG_LIVE_PLAYBACK_CONTROLLER_VERSION =
  "borg-live-playback-controller.v1";

export const BORG_MAX_REALTIME_PLAYBACK_RATE = 1;
export const BORG_PLAYBACK_PRODUCTION_SAFETY_FACTOR = 0.8;
export const BORG_PLAYBACK_LOW_LEAD_SECONDS = 1;
export const BORG_PLAYBACK_HIGH_LEAD_SECONDS = 2;
export const BORG_MAX_VISUAL_CATCH_UP_FRAME_SETS = 2;

export function updateBorgMeasuredProductionRate({
  previousRate = null,
  chunkDuration,
  chunkWallTimeMs,
} = {}) {
  const duration = positiveNumber(chunkDuration, null);
  const wallTime = positiveNumber(chunkWallTimeMs, null);
  if (duration == null || wallTime == null) {
    return finitePositive(previousRate, null);
  }
  const measuredRate = duration / (wallTime / 1000);
  const prior = finitePositive(previousRate, null);
  if (prior == null) {
    return measuredRate;
  }
  // Slow down promptly when production deteriorates. Recover gradually so a
  // single cheap chunk cannot drain the lead accumulated for a slower track.
  const measuredWeight = measuredRate < prior ? 0.65 : 0.15;
  return prior * (1 - measuredWeight) + measuredRate * measuredWeight;
}

export function getBorgAdaptivePlaybackRate({
  requestedRate,
  measuredProductionRate = null,
} = {}) {
  const requested = Math.min(
    BORG_MAX_REALTIME_PLAYBACK_RATE,
    positiveNumber(requestedRate, BORG_MAX_REALTIME_PLAYBACK_RATE),
  );
  const production = finitePositive(measuredProductionRate, null);
  return production == null
    ? requested
    : Math.min(
        requested,
        BORG_MAX_REALTIME_PLAYBACK_RATE,
        production * BORG_PLAYBACK_PRODUCTION_SAFETY_FACTOR,
      );
}

export function getBorgPlaybackLeadWindow({
  playbackRate,
  sampleInterval,
  chunkDuration,
} = {}) {
  const interval = positiveNumber(sampleInterval, 0.01);
  const chunk = positiveNumber(chunkDuration, interval);
  const rate = Math.min(
    BORG_MAX_REALTIME_PLAYBACK_RATE,
    positiveNumber(playbackRate, BORG_MAX_REALTIME_PLAYBACK_RATE),
  );
  const lowSolverLead = Math.max(chunk, rate * BORG_PLAYBACK_LOW_LEAD_SECONDS);
  const highSolverLead = Math.max(
    chunk * 2,
    rate * BORG_PLAYBACK_HIGH_LEAD_SECONDS,
  );
  return Object.freeze({
    lowFrameSetCount: Math.max(1, Math.ceil(lowSolverLead / interval)),
    highFrameSetCount: Math.max(2, Math.ceil(highSolverLead / interval)),
  });
}

export function getBorgPlaybackRefillDecision({
  remainingFrameSetCount,
  wasRefilling,
  lowFrameSetCount,
  highFrameSetCount,
} = {}) {
  const remaining = Math.max(0, Math.floor(Number(remainingFrameSetCount) || 0));
  const low = Math.max(1, Math.floor(Number(lowFrameSetCount) || 1));
  const high = Math.max(low + 1, Math.floor(Number(highFrameSetCount) || low + 1));
  const refilling = remaining <= low
    ? true
    : remaining >= high
      ? false
      : Boolean(wasRefilling);
  return Object.freeze({
    refilling,
    shouldRequestChunk: refilling && remaining < high,
  });
}

export function getBorgPlaybackMsPerFrameSet({ playbackRate, sampleInterval } = {}) {
  const rate = Math.min(
    BORG_MAX_REALTIME_PLAYBACK_RATE,
    positiveNumber(playbackRate, BORG_MAX_REALTIME_PLAYBACK_RATE),
  );
  const interval = positiveNumber(sampleInterval, 0.01);
  return (interval / rate) * 1000;
}

export function formatBorgRealtimeRate(rate) {
  const value = positiveNumber(rate, BORG_MAX_REALTIME_PLAYBACK_RATE);
  if (value >= 0.1) {
    return value.toFixed(2);
  }
  if (value >= 0.01) {
    return value.toFixed(3);
  }
  return value.toExponential(1);
}

function positiveNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function finitePositive(value, fallback) {
  return positiveNumber(value, fallback);
}
