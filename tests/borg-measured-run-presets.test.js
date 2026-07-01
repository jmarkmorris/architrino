import assert from "node:assert/strict";
import { test } from "node:test";

import {
  BORG_MEASURED_RUN_PRESETS_VERSION,
  createMeasuredRunPresetCalibration,
  formatMeasuredRunPresetLabel,
  resolveMeasuredRunControlPreset,
  updateMeasuredRunPresetCalibration,
} from "../src/apps/borg/BorgMeasuredRunPresets.js";

const BASE_PRESETS = Object.freeze([
  Object.freeze({
    id: "live-long",
    label: "Live 3000 / 20",
    displayLabel: "Live",
    sourceMode: "live",
    targetDuration: 3000,
    chunkDuration: 20,
    minTargetDuration: 20,
    minChunkDuration: 2,
  }),
  Object.freeze({
    id: "fixture",
    label: "Fixture 300 / static",
    sourceMode: "fixture",
    targetDuration: null,
    chunkDuration: null,
  }),
]);

test("Borg measured run presets start with bootstrap authority until a live chunk is measured", () => {
  const calibration = createMeasuredRunPresetCalibration({ basePresets: BASE_PRESETS });
  const livePreset = resolveMeasuredRunControlPreset(calibration, "live-long", BASE_PRESETS);

  assert.equal(calibration.schema, BORG_MEASURED_RUN_PRESETS_VERSION);
  assert.equal(calibration.status, "bootstrap-pending-measurement");
  assert.equal(calibration.thresholdAuthority, "bootstrap-defaults-until-live-budget-measured");
  assert.equal(livePreset.effectiveTargetDuration, 3000);
  assert.equal(livePreset.effectiveChunkDuration, 20);
  assert.equal(livePreset.thresholdAuthority, "bootstrap-defaults-until-live-budget-measured");
  assert.equal(formatMeasuredRunPresetLabel(livePreset), "Live 3000 / 20");
});

test("Borg measured run presets use live wall time, heap, append rate, and worker memory as thresholds", () => {
  const calibration = createMeasuredRunPresetCalibration({ basePresets: BASE_PRESETS });
  const measured = updateMeasuredRunPresetCalibration(
    calibration,
    {
      lastChunkWallTimeMs: 960,
      computedFrameRows: 1600,
      appendedFrameRows: 1600,
      frameAppendRateRowsPerSecond: 1600,
      browserHeapGrowthBytes: 32 * 1024 * 1024,
      wasmWorkerMemoryEstimateBytes: 64 * 1024 * 1024,
      memoryBudgetBytes: 64 * 1024 * 1024,
      chunkDuration: 20,
      sampleInterval: 0.2,
      chunkIndex: 0,
    },
    BASE_PRESETS,
  );
  const livePreset = resolveMeasuredRunControlPreset(measured, "live-long", BASE_PRESETS);

  assert.equal(measured.status, "measured-live-run-budget");
  assert.equal(measured.thresholdAuthority, "measured-from-live-native-chunks");
  assert.equal(measured.sampleCount, 1);
  assert.ok(measured.thresholds.maxTargetDuration < 3000);
  assert.ok(measured.thresholds.maxChunkDuration < 20);
  assert.equal(livePreset.effectiveTargetDuration, measured.thresholds.maxTargetDuration);
  assert.equal(livePreset.effectiveChunkDuration, measured.thresholds.maxChunkDuration);
  assert.equal(livePreset.thresholdAuthority, "measured-from-live-native-chunks");
});
