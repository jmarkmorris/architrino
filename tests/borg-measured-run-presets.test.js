import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import {
  BORG_MEASURED_RUN_PRESETS_VERSION,
  BORG_MEASURED_RUN_PRESET_LIMITS,
  createMeasuredRunPresetCalibration,
  formatMeasuredRunPresetLabel,
  resolveMeasuredRunControlPreset,
  updateMeasuredRunPresetCalibration,
} from "../src/apps/borg/BorgMeasuredRunPresets.js";
import {
  BORG_RELEASE_BUDGET_MANIFEST_V1,
  BORG_RELEASE_BUDGET_MANIFEST_VERSION,
  validateBorgReleaseBudgetManifest,
} from "../src/apps/borg/BorgReleaseBudgetManifest.js";

const BASE_PRESETS = Object.freeze([
  Object.freeze({
    id: "live-forever",
    label: "Forever",
    displayLabel: "Forever",
    sourceMode: "live",
    durationMode: "forever",
    targetDuration: Number.POSITIVE_INFINITY,
    chunkDuration: 20,
    minChunkDuration: 2,
  }),
  Object.freeze({
    id: "live-20s",
    label: "20 seconds",
    displayLabel: "20 s",
    sourceMode: "live",
    targetDuration: 20,
    chunkDuration: 20,
    minTargetDuration: 20,
    minChunkDuration: 2,
  }),
]);

const BORG_PRESET_CALIBRATION_SWEEP_V1 = JSON.parse(
  readFileSync(
    new URL(
      "../reference/priorities/borg-app/borg-preset-calibration-sweep.v1.json",
      import.meta.url,
    ),
    "utf8",
  ),
);
const BORG_RELEASE_BUDGET_MANIFEST_JSON_V1 = JSON.parse(
  readFileSync(
    new URL(
      "../reference/priorities/borg-app/borg-release-budget-manifest.v1.json",
      import.meta.url,
    ),
    "utf8",
  ),
);

test("Borg measured run presets start with bootstrap authority until a live chunk is measured", () => {
  const calibration = createMeasuredRunPresetCalibration({ basePresets: BASE_PRESETS });
  const livePreset = resolveMeasuredRunControlPreset(calibration, "live-forever", BASE_PRESETS);

  assert.equal(calibration.schema, BORG_MEASURED_RUN_PRESETS_VERSION);
  assert.equal(calibration.status, "bootstrap-pending-measurement");
  assert.equal(calibration.thresholdAuthority, "bootstrap-defaults-until-live-budget-measured");
  assert.equal(livePreset.effectiveTargetDuration, Number.POSITIVE_INFINITY);
  assert.equal(livePreset.effectiveChunkDuration, 20);
  assert.equal(livePreset.thresholdAuthority, "bootstrap-defaults-until-live-budget-measured");
  assert.equal(formatMeasuredRunPresetLabel(livePreset), "Forever / 20");
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
  const livePreset = resolveMeasuredRunControlPreset(measured, "live-forever", BASE_PRESETS);
  const finitePreset = resolveMeasuredRunControlPreset(measured, "live-20s", BASE_PRESETS);

  assert.equal(measured.status, "measured-live-run-budget");
  assert.equal(measured.thresholdAuthority, "measured-from-live-native-chunks");
  assert.equal(measured.sampleCount, 1);
  assert.ok(measured.thresholds.maxTargetDuration < 3000);
  assert.ok(measured.thresholds.maxChunkDuration < 20);
  assert.equal(livePreset.effectiveTargetDuration, Number.POSITIVE_INFINITY);
  assert.equal(livePreset.effectiveChunkDuration, measured.thresholds.maxChunkDuration);
  assert.equal(livePreset.thresholdAuthority, "measured-from-live-native-chunks");
  assert.equal(finitePreset.effectiveTargetDuration, measured.thresholds.maxTargetDuration);
});

test("Borg measured run presets allow release chunk ceiling when per-chunk budgets pass", () => {
  const calibration = createMeasuredRunPresetCalibration({ basePresets: BASE_PRESETS });
  const measured = updateMeasuredRunPresetCalibration(
    calibration,
    {
      lastChunkWallTimeMs: 66.6,
      computedFrameRows: 1616,
      appendedFrameRows: 1616,
      frameAppendRateRowsPerSecond: 24260,
      browserHeapGrowthBytes: 0,
      wasmWorkerMemoryEstimateBytes: 295800,
      memoryBudgetBytes: 64 * 1024 * 1024,
      chunkDuration: 20,
      sampleInterval: 0.2,
      chunkIndex: 0,
    },
    BASE_PRESETS,
  );

  assert.equal(
    measured.thresholds.maxChunkDuration,
    BORG_MEASURED_RUN_PRESET_LIMITS.maxChunkDuration,
  );
});

test("Borg preset calibration sweep covers release sample matrix and binds code ceilings", () => {
  const sweep = BORG_PRESET_CALIBRATION_SWEEP_V1;
  assert.equal(sweep.schema, "borg-preset-calibration-sweep.v1");
  assert.equal(sweep.status, "release-ceilings-decided");
  assert.equal(sweep.sampleMatrix.viewportCount, 3);
  assert.equal(sweep.sampleMatrix.presetCount, 3);
  assert.equal(sweep.sampleMatrix.sampleCount, 9);
  assert.equal(sweep.samples.length, 9);
  assert.deepEqual(sweep.browserErrors, []);

  const viewportIds = new Set(sweep.samples.map((sample) => sample.viewportId));
  const presetIds = new Set(sweep.samples.map((sample) => sample.presetId));
  assert.deepEqual([...viewportIds].sort(), [
    "desktop-1280x720",
    "mobile-390x844",
    "tablet-900x720",
  ]);
  assert.deepEqual([...presetIds].sort(), [
    "live-fixture-scale",
    "live-large-chunk",
    "live-long",
  ]);

  assert.equal(
    Math.max(...sweep.samples.map((sample) => sample.lastChunkMs)),
    sweep.observedExtrema.maxChunkWallTimeMs,
  );
  assert.equal(
    Math.min(...sweep.samples.map((sample) => sample.appendRowsPerSecond)),
    sweep.observedExtrema.minAppendRowsPerSecond,
  );
  assert.equal(
    Math.max(...sweep.samples.map((sample) => sample.workerMemoryBytes)),
    sweep.observedExtrema.maxChunkWorkerMemoryBytes,
  );

  assert.deepEqual(sweep.releaseBudgetCeilings, BORG_MEASURED_RUN_PRESET_LIMITS);
});

test("Borg release budget manifest binds sweep artifact to runtime ceilings", () => {
  const sweep = BORG_PRESET_CALIBRATION_SWEEP_V1;
  const manifest = BORG_RELEASE_BUDGET_MANIFEST_JSON_V1;
  assert.equal(manifest.schema, BORG_RELEASE_BUDGET_MANIFEST_VERSION);
  assert.equal(manifest.status, "release-ceilings-decided");
  assert.equal(manifest.claimLevel, "developer-test-surface-budget");
  assert.equal(manifest.valueAuthority, "measured-browser-runtime-budget");
  assert.equal(manifest.sourceSweepArtifactId, sweep.artifactId);
  assert.equal(manifest.sourceSweepSchema, sweep.schema);
  assert.deepEqual(
    manifest.sampleMatrix.viewportIds,
    sweep.sampleMatrix.viewports.map((viewport) => viewport.id),
  );
  assert.deepEqual(
    manifest.sampleMatrix.presetIds,
    sweep.sampleMatrix.presets.map((preset) => preset.id),
  );
  assert.equal(manifest.sampleMatrix.sampleCount, sweep.sampleMatrix.sampleCount);
  assert.deepEqual(manifest.observedExtrema, sweep.observedExtrema);
  assert.deepEqual(manifest.releaseBudgetCeilings, sweep.releaseBudgetCeilings);
  assert.deepEqual(manifest.releaseBudgetCeilings, BORG_MEASURED_RUN_PRESET_LIMITS);
  assert.deepEqual(
    BORG_RELEASE_BUDGET_MANIFEST_V1.releaseBudgetCeilings,
    BORG_MEASURED_RUN_PRESET_LIMITS,
  );
  assert.equal(BORG_RELEASE_BUDGET_MANIFEST_V1.manifestId, manifest.manifestId);
  assert.equal(validateBorgReleaseBudgetManifest(BORG_RELEASE_BUDGET_MANIFEST_V1), true);
  assert.equal(manifest.nextBuildBurden, "build-native-wake-history-and-boundary-residual-fixture");
});
