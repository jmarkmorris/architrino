import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  evaluateCoincidentMidpointCommonFrequencyOuterRadiusBandExpansion,
  summarizeCoincidentMidpointCommonFrequencyOuterRadiusBandExpansion,
  validateCoincidentMidpointCommonFrequencyOuterRadiusHistoryPolicyExtensionProtocol,
} from "../src/prescribed-path-analysis/CoincidentMidpointCommonFrequencyOuterRadiusBandExpansionDiagnostic.mjs";

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

const expansionProtocol = await readJson(
  "src/prescribed-path-analysis/protocols/" +
    "coincident-midpoint-common-frequency-outer-radius-history-policy-extension-protocol.v1.json",
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
  return evaluateCoincidentMidpointCommonFrequencyOuterRadiusBandExpansion({
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
    validateCoincidentMidpointCommonFrequencyOuterRadiusHistoryPolicyExtensionProtocol(expansionProtocol);
  assert.equal(validated.sourceConfiguration.scientificIdentity.assemblyId, "asm-2a289a6fe32f64922ab71bae973acc80");
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
  const identityDrift = structuredClone(expansionProtocol);
  identityDrift.sourceConfiguration.scientificIdentity.modelRevisionSha256 = "0".repeat(64);
  assert.throws(() => validateCoincidentMidpointCommonFrequencyOuterRadiusHistoryPolicyExtensionProtocol(identityDrift), /exact coincident-midpoint common-frequency scientific identity/);
  const innerDrift = structuredClone(expansionProtocol);
  innerDrift.radiusExpansion.combinedBox.alpha1[0] -= 1 / 64;
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyOuterRadiusHistoryPolicyExtensionProtocol(innerDrift),
    /combinedBox\.alpha1/,
  );

  const reachDrift = structuredClone(expansionProtocol);
  reachDrift.historyPolicyExtension.retainedReachChi += 1 / 128;
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyOuterRadiusHistoryPolicyExtensionProtocol(reachDrift),
    /retained-history declaration/,
  );

  const replayDrift = structuredClone(expansionProtocol);
  replayDrift.sealedPreviousBoundary.resultHash = "0".repeat(64);
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyOuterRadiusHistoryPolicyExtensionProtocol(replayDrift),
    /previous boundary control identity/,
  );

  const toleranceDrift = structuredClone(expansionProtocol);
  toleranceDrift.foldExclusion.squaredResidualExclusionFloor *= 10;
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyOuterRadiusHistoryPolicyExtensionProtocol(toleranceDrift),
    /may not alter precision, tolerances, or resources/,
  );
});

test("extended history adjudicates the remaining outer slice", () => {
  const result = evaluate();
  const summary = summarizeCoincidentMidpointCommonFrequencyOuterRadiusBandExpansion(result);
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
    "89b3f68c47bec47f92e4faf0f8acb41dc7381e76f9893d3892af96662ea5aa11",
  );
  assert.equal(
    summary.summaryHash,
    "71015bcb1a5c83e850b17ea122b196bf2910f1cd9c2457c28b167c665fa55424",
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
