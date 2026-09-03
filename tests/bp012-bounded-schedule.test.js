import test from "node:test";
import assert from "node:assert/strict";

import { buildManifest } from "../scripts/prescribed-path-analysis/build-regular-polarity-orbit-manifest.mjs";
import { runDiagnosticCensus, topologySchedule } from "../scripts/prescribed-path-analysis/run-bp012-bounded-schedule.mjs";

test("fold schedule partitions the bounded domain without gaps", () => {
  for (const n of [7, 12]) {
    const schedule = topologySchedule(n);
    assert.equal(schedule.openTopologyCells[0].lower, 0.05);
    assert.equal(schedule.openTopologyCells.at(-1).upper, 20);
    assert.ok(schedule.foldBoundaries.every((row) => row.probeBelow < row.beta && row.beta < row.probeAbove));
    for (const [index, cell] of schedule.openTopologyCells.entries()) {
      assert.ok(cell.lower < cell.representative && cell.representative < cell.upper);
      if (index > 0) assert.equal(cell.lower, schedule.openTopologyCells[index - 1].upper);
    }
  }
});

test("diagnostic census checks every representative at more than one speed", () => {
  const manifest = buildManifest({ minimumN: 7, maximumN: 7 });
  const result = runDiagnosticCensus(manifest, [0.5, 3.070356625390253]);
  assert.equal(result.rows.length, 2);
  assert.equal(result.census.projectedRepresentatives, 170);
  assert.ok(result.rows.every((row) => row.unchangedFullEvaluatorChecks.every((check) => check.agreed)));
});
