import assert from "node:assert/strict";
import test from "node:test";

import {
  ACTIVE_CANDIDATE_DISPOSITION,
  DEPRECATED_CONTROL_DISPOSITION,
  buildEvaluationFunnel,
  filterCompactSweepRows,
  pearsonCorrelation,
  quantile,
  summarizeDistribution,
  summarizeGate,
  thresholdRatio,
} from "../src/apps/compact-sweep-dashboard/CompactSweepDashboardData.js";

function row({
  familyId,
  memberId,
  evaluated = true,
  passed = false,
  nullClass = null,
  gatePassed = true,
  ratio = 0.5,
  candidateDisposition = ACTIVE_CANDIDATE_DISPOSITION,
} = {}) {
  return {
    candidateDisposition,
    familyId,
    memberId,
    evaluation: {
      evaluated,
      nullClass,
    },
    score: {
      passed: evaluated ? passed : null,
    },
    gates: {
      surfaceQuadrature: {
        exposure: {
          passed: evaluated ? gatePassed : null,
          thresholdRatio: evaluated ? ratio : null,
        },
      },
    },
  };
}

test("dashboard filtering applies family and member constraints together", () => {
  const rows = [
    row({ familyId: "A", memberId: "A1" }),
    row({ familyId: "A", memberId: "A2" }),
    row({ familyId: "B", memberId: "B1.1" }),
  ];
  assert.deepEqual(
    filterCompactSweepRows(rows, { familyId: "A" }),
    rows.slice(0, 2),
  );
  assert.deepEqual(
    filterCompactSweepRows(rows, {
      familyId: "A",
      memberId: "A2",
    }),
    [rows[1]],
  );
  assert.deepEqual(
    filterCompactSweepRows(rows, { memberId: "B1.1" }),
    [rows[2]],
  );
  const deprecated = row({
    familyId: "B",
    memberId: "B1.4",
    candidateDisposition: DEPRECATED_CONTROL_DISPOSITION,
  });
  assert.deepEqual(
    filterCompactSweepRows([...rows, deprecated], {
      candidateDisposition: ACTIVE_CANDIDATE_DISPOSITION,
    }),
    rows,
  );
  assert.deepEqual(
    filterCompactSweepRows([...rows, deprecated], {
      candidateDisposition: DEPRECATED_CONTROL_DISPOSITION,
    }),
    [deprecated],
  );
});

test("evaluation funnel keeps null classes separate from compact gate outcomes", () => {
  const funnel = buildEvaluationFunnel([
    row({ familyId: "A", memberId: "A1", passed: false }),
    row({ familyId: "A", memberId: "A1", passed: true }),
    row({
      familyId: "A",
      memberId: "A1",
      evaluated: false,
      nullClass: "event-convergence",
    }),
    row({
      familyId: "A",
      memberId: "A1",
      evaluated: false,
      nullClass: "minimum-separation",
    }),
  ]);
  assert.deepEqual(funnel, {
    drawn: 4,
    evaluated: 2,
    drawnNotEvaluated: 2,
    gateFailed: 1,
    compactPassed: 1,
    eventConvergenceFailures: 1,
    minimumSeparationFailures: 1,
    otherNotEvaluated: 0,
  });
});

test("threshold ratios and gate aggregation use exact evaluated denominators", () => {
  assert.equal(thresholdRatio(0.005, 0.01), 0.5);
  assert.equal(thresholdRatio(0.01, 0), null);
  const summary = summarizeGate([
    row({
      familyId: "A",
      memberId: "A1",
      gatePassed: true,
      ratio: 0.25,
    }),
    row({
      familyId: "A",
      memberId: "A1",
      gatePassed: false,
      ratio: 2,
    }),
    row({
      familyId: "A",
      memberId: "A1",
      evaluated: false,
    }),
  ], "surfaceQuadrature", "exposure");
  assert.deepEqual(summary, {
    denominator: 2,
    passCount: 1,
    failureCount: 1,
    passRate: 0.5,
    medianThresholdRatio: 1.125,
  });
});

test("quantiles and correlations are deterministic and ignore null values", () => {
  assert.equal(quantile([1, 2, 3, 4], 0.25), 1.75);
  assert.deepEqual(summarizeDistribution([null, 1, 2, 3, 4]), {
    count: 4,
    minimum: 1,
    q1: 1.75,
    median: 2.5,
    q3: 3.25,
    maximum: 4,
  });
  assert.equal(
    pearsonCorrelation([[1, 2], [2, 4], [3, 6], [null, null]]),
    1,
  );
  assert.equal(pearsonCorrelation([[1, 1]]), null);
});
