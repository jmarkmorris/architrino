import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

test("F6c bounded search keeps one coefficient per row and rejects a near-uniform orbit", () => {
  const stdout = execFileSync(
    process.execPath,
    [
      "scripts/mapping-electromagnetism/f6c-relative-equilibrium-search.mjs",
      "--rows=16",
      "--samples=4",
      "--refinement-rounds=1",
    ],
    {
      cwd: new URL("..", import.meta.url),
      encoding: "utf8",
      maxBuffer: 8 * 1024 * 1024,
    },
  );
  const report = JSON.parse(stdout);

  assert.equal(
    report.claimGrade,
    "measured-report-grade-bounded-prescribed-path-search",
  );
  assert.equal(report.fieldSpeed, 1);
  assert.equal(report.polarityMagnitude, 1);
  assert.equal(
    report.search.fixedConditions.oneCommonFittedPositiveCouplingPerCandidate,
    true,
  );
  assert.equal(
    report.search.acceptedRows + report.search.rejectedRows,
    report.search.searchRows,
  );
  assert.ok(report.bestRows.length > 0);
  assert.deepEqual(
    report.frozenBestRowConfirmation128.rootCountRange,
    [7, 7],
  );
  assert.ok(report.frozenBestRowConfirmation128.objective > 0.5);
  assert.ok(
    report.frozenBestRowConfirmation128.parameters.maximumMemberSpeed < 1,
  );
  assert.ok(report.excludedClaims.includes("retention"));
  assert.ok(report.excludedClaims.includes("particle-identity"));
});
