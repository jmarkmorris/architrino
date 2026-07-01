export const BORG_MEASURED_RUN_PRESETS_VERSION = "borg-measured-run-presets.v1";

export const BORG_MEASURED_RUN_PRESET_LIMITS = Object.freeze({
  maxChunkWallTimeMs: 240,
  minFrameAppendRateRowsPerSecond: 2000,
  maxChunkWorkerMemoryBytes: 16 * 1024 * 1024,
  maxRunWorkerMemoryBytes: 64 * 1024 * 1024,
  maxChunkHeapGrowthBytes: 8 * 1024 * 1024,
  maxRunHeapGrowthBytes: 64 * 1024 * 1024,
  maxRunFrameRows: 240000,
  minTargetDuration: 20,
  maxTargetDuration: 6000,
  minChunkDuration: 2,
  maxChunkDuration: 80,
});

export function createMeasuredRunPresetCalibration({
  basePresets = [],
  limits = BORG_MEASURED_RUN_PRESET_LIMITS,
} = {}) {
  const normalizedLimits = normalizeLimits(limits);
  const thresholds = createBootstrapThresholds(basePresets, normalizedLimits);
  return Object.freeze({
    schema: BORG_MEASURED_RUN_PRESETS_VERSION,
    status: "bootstrap-pending-measurement",
    thresholdAuthority: "bootstrap-defaults-until-live-budget-measured",
    sampleCount: 0,
    limits: normalizedLimits,
    thresholds,
    lastSample: null,
    presets: Object.freeze(
      basePresets.map((preset) => applyThresholdsToPreset(preset, thresholds, {
        thresholdAuthority: "bootstrap-defaults-until-live-budget-measured",
      })),
    ),
  });
}

export function updateMeasuredRunPresetCalibration(calibration, measurement, basePresets = []) {
  const previous = calibration ?? createMeasuredRunPresetCalibration({ basePresets });
  const sample = createMeasuredRunPresetSample(measurement);
  if (!sample) {
    return previous;
  }
  const thresholds = createMeasuredRunThresholds(sample, previous.limits);
  const sampleCount = previous.sampleCount + 1;
  return Object.freeze({
    schema: BORG_MEASURED_RUN_PRESETS_VERSION,
    status: "measured-live-run-budget",
    thresholdAuthority: "measured-from-live-native-chunks",
    sampleCount,
    limits: previous.limits,
    thresholds,
    lastSample: sample,
    presets: Object.freeze(
      basePresets.map((preset) => applyThresholdsToPreset(preset, thresholds, {
        thresholdAuthority: "measured-from-live-native-chunks",
      })),
    ),
  });
}

export function resolveMeasuredRunControlPreset(calibration, presetId, basePresets = []) {
  const presets = calibration?.presets?.length ? calibration.presets : basePresets;
  return (
    presets.find((preset) => preset.id === presetId) ??
    presets.find((preset) => preset.id === "live-long") ??
    presets[0] ??
    null
  );
}

export function formatMeasuredRunPresetLabel(preset) {
  if (!preset || preset.sourceMode === "fixture") {
    return preset?.label ?? "Fixture";
  }
  const target = formatDuration(preset.effectiveTargetDuration ?? preset.targetDuration);
  const chunk = formatDuration(preset.effectiveChunkDuration ?? preset.chunkDuration);
  return `${preset.displayLabel ?? preset.label} ${target} / ${chunk}`;
}

function createMeasuredRunPresetSample(measurement) {
  const chunkDuration = positiveNumber(measurement?.chunkDuration, null);
  const computedFrameRows = positiveNumber(measurement?.computedFrameRows, null);
  const wallTimeMs = positiveNumber(measurement?.lastChunkWallTimeMs, null);
  const frameAppendRateRowsPerSecond = positiveNumber(
    measurement?.frameAppendRateRowsPerSecond,
    null,
  );
  if (chunkDuration == null || computedFrameRows == null || wallTimeMs == null) {
    return null;
  }
  return Object.freeze({
    chunkDuration,
    computedFrameRows,
    appendedFrameRows: positiveNumber(measurement?.appendedFrameRows, computedFrameRows),
    wallTimeMs,
    frameAppendRateRowsPerSecond,
    browserHeapGrowthBytes: nonnegativeNumber(measurement?.browserHeapGrowthBytes, null),
    wasmWorkerMemoryEstimateBytes: nonnegativeNumber(
      measurement?.wasmWorkerMemoryEstimateBytes,
      null,
    ),
    memoryBudgetBytes: positiveNumber(measurement?.memoryBudgetBytes, null),
    chunkIndex: nonnegativeNumber(measurement?.chunkIndex, null),
  });
}

function createMeasuredRunThresholds(sample, limits) {
  const rowsPerSolverTime = sample.computedFrameRows / sample.chunkDuration;
  const wallScale = limits.maxChunkWallTimeMs / sample.wallTimeMs;
  const appendScale = sample.frameAppendRateRowsPerSecond
    ? sample.frameAppendRateRowsPerSecond / limits.minFrameAppendRateRowsPerSecond
    : Number.POSITIVE_INFINITY;
  const workerChunkScale = sample.wasmWorkerMemoryEstimateBytes
    ? limits.maxChunkWorkerMemoryBytes / sample.wasmWorkerMemoryEstimateBytes
    : Number.POSITIVE_INFINITY;
  const heapChunkScale = sample.browserHeapGrowthBytes
    ? limits.maxChunkHeapGrowthBytes / sample.browserHeapGrowthBytes
    : Number.POSITIVE_INFINITY;
  const chunkScale = minFinitePositive([
    wallScale,
    appendScale,
    workerChunkScale,
    heapChunkScale,
  ], 1);

  const workerBytesPerSolverTime = sample.wasmWorkerMemoryEstimateBytes
    ? sample.wasmWorkerMemoryEstimateBytes / sample.chunkDuration
    : 0;
  const heapBytesPerSolverTime = sample.browserHeapGrowthBytes
    ? sample.browserHeapGrowthBytes / sample.chunkDuration
    : 0;
  const maxTargetByRows = limits.maxRunFrameRows / rowsPerSolverTime;
  const maxTargetByWorker = workerBytesPerSolverTime > 0
    ? limits.maxRunWorkerMemoryBytes / workerBytesPerSolverTime
    : limits.maxTargetDuration;
  const maxTargetByHeap = heapBytesPerSolverTime > 0
    ? limits.maxRunHeapGrowthBytes / heapBytesPerSolverTime
    : limits.maxTargetDuration;

  return Object.freeze({
    measuredAtChunkIndex: sample.chunkIndex,
    maxTargetDuration: clampDuration(
      Math.min(maxTargetByRows, maxTargetByWorker, maxTargetByHeap, limits.maxTargetDuration),
      limits.minTargetDuration,
      limits.maxTargetDuration,
    ),
    maxChunkDuration: clampDuration(
      sample.chunkDuration * chunkScale,
      limits.minChunkDuration,
      limits.maxChunkDuration,
    ),
    rowsPerSolverTime,
    wallTimeMsPerSolverTime: sample.wallTimeMs / sample.chunkDuration,
    workerBytesPerSolverTime,
    heapBytesPerSolverTime,
  });
}

function createBootstrapThresholds(basePresets, limits) {
  const livePresets = basePresets.filter((preset) => preset.sourceMode !== "fixture");
  return Object.freeze({
    measuredAtChunkIndex: null,
    maxTargetDuration: Math.min(
      limits.maxTargetDuration,
      Math.max(...livePresets.map((preset) => preset.targetDuration ?? 0), limits.minTargetDuration),
    ),
    maxChunkDuration: Math.min(
      limits.maxChunkDuration,
      Math.max(...livePresets.map((preset) => preset.chunkDuration ?? 0), limits.minChunkDuration),
    ),
    rowsPerSolverTime: null,
    wallTimeMsPerSolverTime: null,
    workerBytesPerSolverTime: null,
    heapBytesPerSolverTime: null,
  });
}

function applyThresholdsToPreset(preset, thresholds, { thresholdAuthority }) {
  if (preset.sourceMode === "fixture") {
    return Object.freeze({
      ...preset,
      effectiveTargetDuration: null,
      effectiveChunkDuration: null,
      thresholdAuthority: "static-fixture",
    });
  }
  const minTargetDuration = positiveNumber(preset.minTargetDuration, 20);
  const minChunkDuration = positiveNumber(preset.minChunkDuration, 2);
  const targetLimit = Math.max(minTargetDuration, thresholds.maxTargetDuration);
  const chunkLimit = Math.max(minChunkDuration, thresholds.maxChunkDuration);
  const effectiveTargetDuration = clampDuration(
    preset.targetDuration,
    minTargetDuration,
    targetLimit,
  );
  const effectiveChunkDuration = clampDuration(
    preset.chunkDuration,
    minChunkDuration,
    chunkLimit,
  );
  return Object.freeze({
    ...preset,
    effectiveTargetDuration,
    effectiveChunkDuration,
    thresholdAuthority,
    measuredTargetDurationLimit: thresholds.maxTargetDuration,
    measuredChunkDurationLimit: thresholds.maxChunkDuration,
  });
}

function normalizeLimits(limits) {
  return Object.freeze({
    ...BORG_MEASURED_RUN_PRESET_LIMITS,
    ...(limits ?? {}),
  });
}

function formatDuration(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return "static";
  }
  return Number(number.toFixed(number >= 100 ? 0 : 1)).toString();
}

function clampDuration(value, min, max) {
  const number = positiveNumber(value, min);
  return Math.min(Math.max(number, min), max);
}

function minFinitePositive(values, fallback) {
  const finite = values.filter((value) => Number.isFinite(value) && value > 0);
  return finite.length > 0 ? Math.min(...finite) : fallback;
}

function positiveNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function nonnegativeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}
