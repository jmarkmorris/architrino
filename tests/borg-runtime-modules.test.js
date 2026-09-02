import assert from "node:assert/strict";
import test from "node:test";

import * as runtime from "../src/apps/borg/BorgAppRuntime.js";
import {
  createBorgDiagnosticFieldRows,
} from "../src/apps/borg/BorgRuntimePanelRows.js";
import {
  createBorgLiveRunBudgetMeasurement,
  createEmptyBorgLiveRunBudget,
} from "../src/apps/borg/BorgRuntimeRunBudget.js";
import {
  RUN_CONTROL_PRESETS,
  createDefaultEomShadowRunnerOptions,
  getBorgRunControlPreset,
} from "../src/apps/borg/BorgRuntimeRunSession.js";
import * as timeline from "../src/apps/borg/BorgRuntimeTimeline.js";
import {
  createBorgParticleStyles,
} from "../src/apps/borg/BorgRuntimeVisuals.js";

test("Borg composition root preserves its public runtime contracts", () => {
  assert.equal(runtime.calculateBorgOrthographicFrustum, timeline.calculateBorgOrthographicFrustum);
  assert.equal(runtime.formatBorgTimelineTime, timeline.formatBorgTimelineTime);
  assert.equal(runtime.getBorgPlaybackReanchor, timeline.getBorgPlaybackReanchor);
  assert.equal(runtime.createBorgParticleStyles, createBorgParticleStyles);
  assert.equal(runtime.createDefaultEomShadowRunnerOptions, createDefaultEomShadowRunnerOptions);
});

test("Borg run-session owner keeps the three authored run presets and fallback", () => {
  assert.deepEqual(
    RUN_CONTROL_PRESETS.map(({ id }) => id),
    ["live-forever", "live-60s", "live-300s"],
  );
  assert.equal(getBorgRunControlPreset("live-60s").targetDuration, 60);
  assert.equal(getBorgRunControlPreset("unknown").id, "live-forever");
});

test("Borg live-run budget owner separates absent and measured browser authority", () => {
  const empty = createEmptyBorgLiveRunBudget();
  assert.equal(empty.status, "not-measured");
  assert.equal(empty.browserHeapAuthority, "not-exposed-by-browser");

  const measured = createBorgLiveRunBudgetMeasurement({
    before: { timestampMs: 10, usedJSHeapSize: 1_000 },
    after: { timestampMs: 30, usedJSHeapSize: 1_400 },
    chunk: {
      startTime: 0,
      endTime: 2,
      frames: [{}, {}, {}, {}],
      bufferByteLength: 800,
      sampleInterval: 0.5,
      chunkIndex: 3,
    },
    previousFrameRowCount: 8,
    nextFrameRowCount: 12,
    replaceInitialRows: false,
    presetId: "live-60s",
    memoryBudgetBytes: 1_600,
  });
  assert.equal(measured.status, "measured-live-run-budget");
  assert.equal(measured.frameAppendRateRowsPerSecond, 200);
  assert.equal(measured.browserHeapGrowthBytes, 400);
  assert.equal(measured.wasmWorkerMemoryPressure, 0.5);
});

test("Borg diagnostics row owner preserves fail-closed labels without DOM state", () => {
  const rows = createBorgDiagnosticFieldRows({
    diagnostics: null,
    manifest: { validation: { proofClaimStatus: "not-established" } },
    formatPercent: () => "not-measured",
    formatPercentagePoints: () => "not-measured",
  });
  assert.deepEqual(rows[0], ["proof claim", "not-established"]);
  assert.ok(rows.some(([label]) => label === "electrinos outside sphere now"));
  assert.ok(rows.some(([label]) => label === "opposite-polarity close fraction"));
});
