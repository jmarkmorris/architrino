import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  evaluateA11OuterRadiusBandExpansion,
  summarizeA11OuterRadiusBandExpansion,
  validateA11OuterRadiusHistoryPolicyExtensionProtocol,
} from "../src/prescribed-path-analysis/A11OuterRadiusBandExpansionDiagnostic.mjs";

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

const expansionProtocol = await readJson(
  "src/prescribed-path-analysis/protocols/" +
    "a1-1-outer-radius-history-policy-extension-protocol.v1.json",
);
const previousBoundaryProtocol = await readJson(
  expansionProtocol.sealedPreviousBoundary.protocolPath,
);
const previousBoundarySummary = await readJson(
  expansionProtocol.sealedPreviousBoundary.summaryPath,
);
const priorExpansionProtocol = await readJson(
  previousBoundaryProtocol.sealedPriorCombinedBox.protocolPath,
);
const priorExpansionSummary = await readJson(
  previousBoundaryProtocol.sealedPriorCombinedBox.summaryPath,
);
const baseProtocol = await readJson(
  expansionProtocol.sealedBaseline.baseProtocol.path,
);
const baselineRootSheetProtocol = await readJson(
  expansionProtocol.sealedBaseline.rootSheet.protocolPath,
);
const baselineContinuousSummary = await readJson(
  baselineRootSheetProtocol.sealedRegressionReceipt.path,
);
const baselineRootSheetSummary = await readJson(
  expansionProtocol.sealedBaseline.rootSheet.summaryPath,
);
const baselineStructuralProtocol = await readJson(
  expansionProtocol.sealedBaseline.structuralLedger.protocolPath,
);
const baselineStructuralSummary = await readJson(
  expansionProtocol.sealedBaseline.structuralLedger.summaryPath,
);
const baselineProjectionProtocol = await readJson(
  expansionProtocol.sealedBaseline.projectionMonotonicity.protocolPath,
);
const baselineProjectionSummary = await readJson(
  expansionProtocol.sealedBaseline.projectionMonotonicity.summaryPath,
);

function evaluate(executionLimits = null) {
  return evaluateA11OuterRadiusBandExpansion({
    expansionProtocol,
    baseProtocol,
    baselineRootSheetProtocol,
    baselineContinuousSummary,
    baselineRootSheetSummary,
    baselineStructuralProtocol,
    baselineStructuralSummary,
    baselineProjectionProtocol,
    baselineProjectionSummary,
    priorExpansionProtocol,
    priorExpansionSummary,
    previousBoundaryProtocol,
    previousBoundarySummary,
    executionLimits,
  });
}

test("history extension freezes only the old-boundary-to-5/4 slice", () => {
  const validated =
    validateA11OuterRadiusHistoryPolicyExtensionProtocol(expansionProtocol);
  const oldBoundary = 9 / (8 * Math.sin(9 / 8));
  assert.deepEqual(
    validated.radiusExpansion.addedOuterBand,
    [oldBoundary, 5 / 4],
  );
  assert.deepEqual(
    validated.radiusExpansion.combinedBox.alpha1,
    [7 / 8, 15 / 16],
  );
  assert.deepEqual(
    validated.radiusExpansion.combinedBox.alpha3,
    [oldBoundary, 5 / 4],
  );
  assert.equal(validated.radiusExpansion.middleRadiusFieldSpeedPin, 1);
  assert.deepEqual(
    validated.radiusExpansion.relativePhases,
    ["0", "2*pi/3", "4*pi/3"],
  );
  assert.equal(
    validated.historyPolicyExtension.previousRetainedReachChi,
    9 / 4,
  );
  assert.equal(validated.historyPolicyExtension.retainedReachChi, 145 / 64);
  assert.equal(validated.historyPolicyExtension.smallerTestReachChi, 289 / 128);
  assert.equal(validated.foldExclusion.minimumDelayWidth, (9 / 4) / 65536);
  assert.equal(validated.completionRule.score, null);
});

test("history extension rejects geometry, reach, replay, and gate drift", () => {
  const innerDrift = structuredClone(expansionProtocol);
  innerDrift.radiusExpansion.combinedBox.alpha1[0] -= 1 / 64;
  assert.throws(
    () => validateA11OuterRadiusHistoryPolicyExtensionProtocol(innerDrift),
    /combinedBox\.alpha1/,
  );

  const reachDrift = structuredClone(expansionProtocol);
  reachDrift.historyPolicyExtension.retainedReachChi += 1 / 128;
  assert.throws(
    () => validateA11OuterRadiusHistoryPolicyExtensionProtocol(reachDrift),
    /retained-history declaration/,
  );

  const replayDrift = structuredClone(expansionProtocol);
  replayDrift.sealedPreviousBoundary.resultHash = "0".repeat(64);
  assert.throws(
    () => validateA11OuterRadiusHistoryPolicyExtensionProtocol(replayDrift),
    /previous boundary control identity/,
  );

  const toleranceDrift = structuredClone(expansionProtocol);
  toleranceDrift.foldExclusion.squaredResidualExclusionFloor *= 10;
  assert.throws(
    () => validateA11OuterRadiusHistoryPolicyExtensionProtocol(toleranceDrift),
    /may not alter precision, tolerances, or resources/,
  );
});

test("extended history adjudicates the remaining outer slice", () => {
  const result = evaluate();
  const summary = summarizeA11OuterRadiusBandExpansion(result);
  const control = result.controls.historyPolicySufficiency;

  assert.equal(result.status.code, "evaluated-diagnostic");
  assert.equal(result.status.score, null);
  assert.equal(result.stopBoundary.stoppedAfterDeclaredSlice, true);
  assert.equal(
    result.stopBoundary.firstUncertifiedBoundary,
    "alpha3-greater-than-5/4-not-evaluated-under-145/64-history-policy",
  );
  assert.equal(result.controls.previousBoundaryExactReplay.passed, true);
  assert.equal(
    result.controls.previousBoundaryExactReplay.preservedStatus.code,
    "counterexample-diagnostic",
  );
  assert.equal(control.passed, true);
  assert.ok(control.previousReachResidualAtUpperRadius > 0);
  assert.ok(control.smallerTestReachResidualAtUpperRadius > 0);
  assert.ok(control.retainedReachResidualAtUpperRadius < 0);
  assert.ok(control.upperRadiusRoot.delay > 9 / 4);
  assert.ok(control.upperRadiusRoot.delay < 145 / 64);
  assert.ok(control.upperRadiusRoot.delayDerivative < 0);
  assert.ok(control.nextHistoryEdgeBoundaryAlpha3 > 5 / 4);
  assert.ok(control.independentWitnesses.every((row) => row.passed));
  assert.equal(result.controls.sameAndPartner.passed, true);
  assert.equal(result.controls.interBinary.passed, true);
  assert.equal(result.controls.projection.passed, true);
  assert.equal(
    result.controls.completeChannelAccounting.orderedChannelCount,
    36,
  );
  assert.equal(
    result.controls.completeChannelAccounting.unresolvedChannelCount,
    0,
  );
  assert.equal(summary.status.score, null);
  assert.equal(
    result.resultHash,
    "edae3d88d1347656519f7efba4d0f9f530aec4eab7fce78bf687f4c28125145c",
  );
  assert.equal(
    summary.summaryHash,
    "ddf8e622f0556b64c6cf348b6d9ee9cb109f7c28fc19dac508e356c9d540f57e",
  );
});

test("reduced history-extension resources return incomplete verification", () => {
  const result = evaluate({
    maximumBoxesPerRepresentative: 1,
    maximumBoxesPerPacket: 12,
  });
  assert.equal(result.status.code, "drawn-not-evaluated");
  assert.equal(result.status.score, null);
  assert.equal(result.controls.interBinary.passed, false);
  assert.ok(result.interBinaryUnresolved.length > 0);
});
