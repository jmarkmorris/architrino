import { createEomHistoryDataset } from "../shared/EomHistoryDataset.mjs";

// Recorded-EOM replay source for Borg. Ingests an eom_evolution_contract/v0
// record through the shared EOM history-dataset adapter and serves it through
// the same chunked runner interface the live EOM shadow runner satisfies, so
// the Borg rendering/UI surface is unchanged. This is a viewer path: sampling
// the record's own piecewise-cubic segments is declared arithmetic over
// recorded data; nothing here evolves, solves, or extends the record.

export const BORG_EOM_RECORD_REPLAY_RUNNER_VERSION = "borg-eom-record-replay-runner.v0";
export const BORG_EOM_RECORD_REPLAY_RUN_SOURCE = "recorded-eom-dataset-chunks";
export const BORG_PRESCRIBED_DISPLAY_OVERSAMPLE_FACTOR = 4;

const DEFAULT_MEMORY_BUDGET_BYTES = 64 * 1024 * 1024;
const DEFAULT_SAMPLE_INTERVAL = 0.2;

export function createBorgEomRecordReplayRunner(record, options = {}) {
  const historyDataset = record?.schema === "eom-history-dataset.v0"
    ? record
    : createEomHistoryDataset(record);
  const windowStart = historyDataset.window.start;
  const windowEnd = historyDataset.window.end;
  const recordSampleInterval = positiveNumber(
    historyDataset.window.sampleInterval,
    DEFAULT_SAMPLE_INTERVAL,
  );
  const displayOversampleFactor = borgRecordReplayDisplayOversampleFactor(historyDataset);
  const sampleInterval = positiveNumber(
    options.sampleInterval,
    recordSampleInterval / displayOversampleFactor,
  );
  const config = Object.freeze({
    schema: BORG_EOM_RECORD_REPLAY_RUNNER_VERSION,
    runSource: BORG_EOM_RECORD_REPLAY_RUN_SOURCE,
    runId: historyDataset.provenance.runId,
    engineId: historyDataset.provenance.engineId,
    claimGrade: historyDataset.provenance.claimGrade,
    evidenceStatus: historyDataset.provenance.evidenceStatus,
    engineVersion: historyDataset.provenance.engineVersion,
    generatingSpec: historyDataset.provenance.generatingSpec,
    date: historyDataset.provenance.date,
    startTime: windowStart,
    // Recorded coverage is a hard ceiling: replay can be shortened but never
    // extended past what the engine actually evolved.
    recordEndTime: windowEnd,
    recordSampleInterval,
    displayOversampleFactor,
    targetDuration: clampToWindow(options.targetDuration, windowStart, windowEnd),
    chunkDuration: positiveNumber(options.chunkDuration, Math.max(sampleInterval, (windowEnd - windowStart) / 8)),
    sampleInterval,
    memoryBudgetBytes: positiveNumber(options.memoryBudgetBytes, DEFAULT_MEMORY_BUDGET_BYTES),
  });
  // The record may report an evidence status, but the viewer never consumes a
  // producer assertion as an authority upgrade. Rendering remains recorded
  // output at every source claim grade.
  const frameValueAuthority = historyDataset.provenance.engineId === "prescribed-geometry"
    ? "recorded-prescribed-geometry"
    : "recorded-eom-output";
  let nextStartTime = windowStart;
  let targetDuration = config.targetDuration;
  let chunkDuration = config.chunkDuration;
  let chunkIndex = 0;
  let disposed = false;

  return Object.freeze({
    schema: BORG_EOM_RECORD_REPLAY_RUNNER_VERSION,
    config,
    historyDataset,
    get targetDuration() {
      return targetDuration;
    },
    get chunkDuration() {
      return chunkDuration;
    },
    get nextStartTime() {
      return nextStartTime;
    },
    get chunkIndex() {
      return chunkIndex;
    },
    canComputeNextChunk() {
      return !disposed && nextStartTime < targetDuration;
    },
    setRunLimits(nextLimits = {}) {
      const requestedTarget = Number(nextLimits.targetDuration);
      if (Number.isFinite(requestedTarget) || requestedTarget === Number.POSITIVE_INFINITY) {
        targetDuration = clampToWindow(requestedTarget, windowStart, windowEnd);
      }
      const requestedChunk = Number(nextLimits.chunkDuration);
      if (Number.isFinite(requestedChunk) && requestedChunk > 0) {
        chunkDuration = Math.max(config.sampleInterval, requestedChunk);
      }
    },
    async computeNextChunk() {
      if (disposed) {
        throw new Error("Borg EOM record replay runner has been disposed.");
      }
      if (nextStartTime >= targetDuration) {
        return createChunk(config, chunkIndex, nextStartTime, nextStartTime, [], "complete");
      }
      const startTime = nextStartTime;
      const endTime = Math.min(targetDuration, roundTime(startTime + chunkDuration));
      const frames = createRecordedFrames(
        historyDataset,
        startTime,
        endTime,
        config.sampleInterval,
        chunkIndex,
        frameValueAuthority,
      );
      nextStartTime = endTime;
      const chunk = createChunk(config, chunkIndex, startTime, endTime, frames, "ok");
      chunkIndex += 1;
      return chunk;
    },
    async dispose() {
      disposed = true;
    },
  });
}

export function borgRecordReplayDisplayOversampleFactor(historyDataset) {
  return historyDataset?.provenance?.engineId === "prescribed-geometry" &&
    historyDataset?.provenance?.claimGrade === "chart-hypothesis" &&
    historyDataset?.provenance?.evidenceStatus === "display-only"
    ? BORG_PRESCRIBED_DISPLAY_OVERSAMPLE_FACTOR
    : 1;
}

function createChunk(config, chunkIndex, startTime, endTime, frames, statusCode) {
  return Object.freeze({
    schema: BORG_EOM_RECORD_REPLAY_RUNNER_VERSION,
    source: BORG_EOM_RECORD_REPLAY_RUN_SOURCE,
    statusCode,
    chunkIndex,
    runId: config.runId,
    engineId: config.engineId,
    claimGrade: config.claimGrade,
    evidenceStatus: config.evidenceStatus,
    startTime,
    endTime,
    sampleInterval: config.sampleInterval,
    frames: Object.freeze(frames),
    promotionEligible: false,
    diagnostics: Object.freeze([]),
    bufferCount: 0,
    bufferByteLength: 0,
  });
}

function createRecordedFrames(
  historyDataset,
  startTime,
  endTime,
  sampleInterval,
  chunkIndex,
  valueAuthority,
) {
  const frames = [];
  const sampleCount = Math.max(1, Math.round((endTime - startTime) / sampleInterval));
  for (let sampleIndex = 0; sampleIndex <= sampleCount; sampleIndex += 1) {
    const time = sampleIndex === sampleCount
      ? endTime
      : roundTime(startTime + sampleIndex * sampleInterval);
    historyDataset.worldlines.forEach((worldline) => {
      const state = historyDataset.evaluateWorldline(worldline.id, time);
      frames.push(Object.freeze({
        pathKey: worldline.pathKey ?? worldline.id,
        sourceWorldlineId: worldline.id,
        sourceOrder: worldline.sourceIndex,
        frameIndex: Math.round((time - historyDataset.window.start) / sampleInterval),
        time,
        position: state.position,
        velocity: state.velocity,
        errorBound: state.errorBound,
        stateFlags: worldline.stateFlags ?? 0,
        dynamicChunkIndex: chunkIndex,
        runSource: BORG_EOM_RECORD_REPLAY_RUN_SOURCE,
        valueAuthority,
      }));
    });
  }
  return frames;
}

function clampToWindow(value, windowStart, windowEnd) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return windowEnd;
  }
  return Math.min(windowEnd, Math.max(windowStart, number));
}

function positiveNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function roundTime(value) {
  return Number(value.toPrecision(15));
}
