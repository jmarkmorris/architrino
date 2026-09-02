export const BORG_LIVE_RUN_BUDGET_VERSION = "borg-live-run-budget.v1";

export function createEmptyBorgLiveRunBudget() {
  return Object.freeze({
    schema: BORG_LIVE_RUN_BUDGET_VERSION,
    status: "not-measured",
    lastChunkWallTimeMs: null,
    computedFrameRows: null,
    appendedFrameRows: null,
    frameAppendRateRowsPerSecond: null,
    browserHeapGrowthBytes: null,
    browserHeapAuthority: "not-exposed-by-browser",
    wasmWorkerMemoryEstimateBytes: null,
    wasmWorkerMemoryAuthority: "not-measured",
    wasmWorkerMemoryPressure: null,
    memoryBudgetBytes: null,
    chunkDuration: null,
    sampleInterval: null,
    sourcePresetId: null,
    chunkIndex: null,
  });
}

export function readBorgLiveRunBudgetSnapshot(windowLike) {
  return {
    timestampMs: windowLike?.performance?.now?.() ?? Date.now(),
    usedJSHeapSize: finiteNumber(windowLike?.performance?.memory?.usedJSHeapSize),
  };
}

export function createBorgLiveRunBudgetMeasurement({
  before,
  after,
  chunk,
  previousFrameRowCount,
  nextFrameRowCount,
  replaceInitialRows,
  appendedFrameRows,
  presetId,
  memoryBudgetBytes,
}) {
  const wallTimeMs = Math.max(0, finiteNumber(after?.timestampMs - before?.timestampMs) ?? 0);
  const chunkDuration = Math.max(0, finiteNumber(chunk?.endTime - chunk?.startTime) ?? 0);
  const computedFrameRows = Array.isArray(chunk?.frames) ? chunk.frames.length : 0;
  const measuredAppendedFrameRows =
    finiteNumber(appendedFrameRows) ??
    (replaceInitialRows
      ? computedFrameRows
      : Math.max(0, (finiteNumber(nextFrameRowCount) ?? 0) - (finiteNumber(previousFrameRowCount) ?? 0)));
  const frameAppendRateRowsPerSecond =
    wallTimeMs > 0 ? measuredAppendedFrameRows / (wallTimeMs / 1000) : null;
  const heapGrowthBytes =
    before?.usedJSHeapSize != null && after?.usedJSHeapSize != null
      ? Math.max(0, after.usedJSHeapSize - before.usedJSHeapSize)
      : null;
  const rawWorkerMemoryEstimateBytes = finiteNumber(chunk?.bufferByteLength);
  const wasmWorkerMemoryEstimateBytes =
    rawWorkerMemoryEstimateBytes != null && rawWorkerMemoryEstimateBytes > 0
      ? rawWorkerMemoryEstimateBytes
      : null;
  const memoryBudgetPressure =
    wasmWorkerMemoryEstimateBytes != null && memoryBudgetBytes > 0
      ? wasmWorkerMemoryEstimateBytes / memoryBudgetBytes
      : null;
  const status =
    wallTimeMs <= 0
      ? "not-measured"
      : heapGrowthBytes == null
        ? "partial-live-run-budget"
        : "measured-live-run-budget";

  return Object.freeze({
    schema: BORG_LIVE_RUN_BUDGET_VERSION,
    status,
    lastChunkWallTimeMs: wallTimeMs,
    computedFrameRows,
    appendedFrameRows: measuredAppendedFrameRows,
    frameAppendRateRowsPerSecond,
    browserHeapGrowthBytes: heapGrowthBytes,
    browserHeapAuthority:
      heapGrowthBytes == null ? "not-exposed-by-browser" : "performance.memory.usedJSHeapSize",
    wasmWorkerMemoryEstimateBytes,
    wasmWorkerMemoryAuthority:
      wasmWorkerMemoryEstimateBytes > 0
        ? "estimated-from-eom-output-buffers"
        : "not-exposed-by-worker",
    wasmWorkerMemoryPressure: memoryBudgetPressure,
    memoryBudgetBytes: finiteNumber(memoryBudgetBytes),
    chunkDuration,
    sampleInterval: finiteNumber(chunk?.sampleInterval),
    sourcePresetId: presetId ?? null,
    chunkIndex: chunk?.chunkIndex ?? null,
  });
}

function finiteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}
