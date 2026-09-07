import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import {
  BORG_MEASURED_RUN_PRESETS_VERSION,
  createMeasuredRunPresetCalibration,
  formatMeasuredRunPresetLabel,
  resolveMeasuredRunControlPreset,
  updateMeasuredRunPresetCalibration,
} from "../src/apps/borg/BorgMeasuredRunPresets.js";
const TEST_EOM_LIMITS = Object.freeze({
  maxChunkWallTimeMs: 120,
  minFrameAppendRateRowsPerSecond: 1000,
  maxChunkWorkerMemoryBytes: 100 * 1024 * 1024,
  maxRunWorkerMemoryBytes: 200 * 1024 * 1024,
  maxChunkHeapGrowthBytes: 100 * 1024 * 1024,
  maxRunHeapGrowthBytes: 200 * 1024 * 1024,
  maxRunFrameRows: 100000,
  minTargetDuration: 20,
  maxTargetDuration: 1000,
  minChunkDuration: 2,
  maxChunkDuration: 40,
});

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
      "../reference/priorities/app-borg/evidence/borg-preset-calibration-sweep.v1.json",
      import.meta.url,
    ),
    "utf8",
  ),
);
const BORG_RELEASE_BUDGET_MANIFEST_JSON_V1 = JSON.parse(
  readFileSync(
    new URL(
      "../reference/priorities/app-borg/contracts/borg-release-budget-manifest.v1.json",
      import.meta.url,
    ),
    "utf8",
  ),
);
const BORG_APP_RUNTIME_SOURCE = readFileSync(
  new URL("../src/apps/borg/BorgAppRuntime.js", import.meta.url),
  "utf8",
);
const BORG_MEASURED_RUN_PRESETS_SOURCE = readFileSync(
  new URL("../src/apps/borg/BorgMeasuredRunPresets.js", import.meta.url),
  "utf8",
);

test("Borg presets remain authored defaults without a current EOM release budget", () => {
  const calibration = createMeasuredRunPresetCalibration({ basePresets: BASE_PRESETS });
  const livePreset = resolveMeasuredRunControlPreset(calibration, "live-forever", BASE_PRESETS);

  assert.equal(calibration.schema, BORG_MEASURED_RUN_PRESETS_VERSION);
  assert.equal(calibration.status, "current-eom-release-budget-unavailable");
  assert.equal(
    calibration.thresholdAuthority,
    "base-presets-no-current-eom-release-budget",
  );
  assert.equal(calibration.limits, null);
  assert.equal(livePreset.effectiveTargetDuration, Number.POSITIVE_INFINITY);
  assert.equal(livePreset.effectiveChunkDuration, 20);
  assert.equal(
    livePreset.thresholdAuthority,
    "base-presets-no-current-eom-release-budget",
  );
  assert.equal(formatMeasuredRunPresetLabel(livePreset), "Forever / 20");
});

test("live EOM observations do not invent release ceilings when none are authorized", () => {
  const calibration = createMeasuredRunPresetCalibration({
    basePresets: BASE_PRESETS,
  });
  const measured = updateMeasuredRunPresetCalibration(
    calibration,
    {
      lastChunkWallTimeMs: 25,
      computedFrameRows: 100,
      frameAppendRateRowsPerSecond: 4000,
      chunkDuration: 20,
      chunkIndex: 0,
    },
    BASE_PRESETS,
  );
  const livePreset = resolveMeasuredRunControlPreset(
    measured,
    "live-forever",
    BASE_PRESETS,
  );

  assert.equal(
    measured.status,
    "measured-eom-observation-no-release-ceilings",
  );
  assert.equal(measured.sampleCount, 1);
  assert.equal(measured.thresholds.maxTargetDuration, null);
  assert.equal(measured.thresholds.maxChunkDuration, null);
  assert.equal(livePreset.effectiveTargetDuration, Number.POSITIVE_INFINITY);
  assert.equal(livePreset.effectiveChunkDuration, 20);
});

test("Borg measured run presets use live wall time, heap, append rate, and worker memory as thresholds", () => {
  const calibration = createMeasuredRunPresetCalibration({
    basePresets: BASE_PRESETS,
    limits: TEST_EOM_LIMITS,
  });
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
  assert.equal(measured.thresholdAuthority, "measured-from-live-eom-chunks");
  assert.equal(measured.sampleCount, 1);
  assert.ok(measured.thresholds.maxTargetDuration < TEST_EOM_LIMITS.maxTargetDuration);
  assert.ok(measured.thresholds.maxChunkDuration < 20);
  assert.equal(livePreset.effectiveTargetDuration, Number.POSITIVE_INFINITY);
  assert.equal(livePreset.effectiveChunkDuration, measured.thresholds.maxChunkDuration);
  assert.equal(livePreset.thresholdAuthority, "measured-from-live-eom-chunks");
  assert.equal(finitePreset.effectiveTargetDuration, 20);
});

test("Borg measured run presets allow release chunk ceiling when per-chunk budgets pass", () => {
  const calibration = createMeasuredRunPresetCalibration({
    basePresets: BASE_PRESETS,
    limits: TEST_EOM_LIMITS,
  });
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
    TEST_EOM_LIMITS.maxChunkDuration,
  );
});

test("Borg historical preset sweep remains internally complete without binding current code", () => {
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

  assert.equal(
    createMeasuredRunPresetCalibration({ basePresets: BASE_PRESETS }).limits,
    null,
  );
});

test("Borg preserves the historical sweep as reference-only evidence", () => {
  const sweep = BORG_PRESET_CALIBRATION_SWEEP_V1;
  const manifest = BORG_RELEASE_BUDGET_MANIFEST_JSON_V1;
  assert.equal(manifest.schema, "borg-release-budget-manifest.v1");
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
  assert.equal(
    manifest.nextBuildBurden,
    "migrate-borg-through-certified-eom-shadow-run",
  );
  for (const source of [
    BORG_APP_RUNTIME_SOURCE,
    BORG_MEASURED_RUN_PRESETS_SOURCE,
  ]) {
    assert.doesNotMatch(source, /BorgReleaseBudgetDisposition/);
    assert.doesNotMatch(source, /borg-release-budget-manifest/);
    assert.doesNotMatch(source, /legacyBudgetAppliesToEom/);
    assert.doesNotMatch(source, /releaseBudgetDisposition/);
  }
});
