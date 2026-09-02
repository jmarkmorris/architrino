import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  evaluateCoincidentMidpointCommonFrequencyOuterRadiusBandExpansion,
  summarizeCoincidentMidpointCommonFrequencyOuterRadiusBandExpansion,
  validateCoincidentMidpointCommonFrequencyOuterRadiusSecondBandExpansionProtocol,
} from "../src/prescribed-path-analysis/CoincidentMidpointCommonFrequencyOuterRadiusBandExpansionDiagnostic.mjs";

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

const expansionProtocol = await readJson(
  "src/prescribed-path-analysis/protocols/" +
    "coincident-midpoint-common-frequency-outer-radius-second-band-expansion-protocol.v1.json",
);
const priorExpansionProtocol = await readJson(
  expansionProtocol.sealedPriorCombinedBox.protocolPath,
);
const priorExpansionSummary = await readJson(
  expansionProtocol.sealedPriorCombinedBox.summaryPath,
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
    executionLimits,
  });
}

test("second expansion freezes only the adjacent 19/16-to-5/4 strip", () => {
  const validated =
    validateCoincidentMidpointCommonFrequencyOuterRadiusSecondBandExpansionProtocol(expansionProtocol);
  assert.equal(validated.sourceConfiguration.scientificIdentity.assemblyId, "asm-2a289a6fe32f64922ab71bae973acc80");
  assert.deepEqual(validated.radiusExpansion.addedOuterBand, [19 / 16, 5 / 4]);
  assert.deepEqual(
    validated.radiusExpansion.combinedBox.alpha1,
    [7 / 8, 15 / 16],
  );
  assert.deepEqual(
    validated.radiusExpansion.combinedBox.alpha3,
    [17 / 16, 5 / 4],
  );
  assert.equal(validated.radiusExpansion.middleRadiusFieldSpeedPin, 1);
  assert.deepEqual(
    validated.radiusExpansion.relativePhases,
    ["0", "2*pi/3", "4*pi/3"],
  );
  assert.equal(validated.radiusExpansion.historyReachChi, 9 / 4);
  assert.equal(validated.foldExclusion.maximumBoxesPerRepresentative, 20000);
  assert.equal(validated.completionRule.score, null);
});

test("second expansion rejects radius, phase, replay, and resource drift", () => {
  const identityDrift = structuredClone(expansionProtocol);
  identityDrift.sourceConfiguration.scientificIdentity.modelRevisionSha256 = "0".repeat(64);
  assert.throws(() => validateCoincidentMidpointCommonFrequencyOuterRadiusSecondBandExpansionProtocol(identityDrift), /exact coincident-midpoint common-frequency scientific identity/);
  const innerDrift = structuredClone(expansionProtocol);
  innerDrift.radiusExpansion.combinedBox.alpha1[0] -= 1 / 64;
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyOuterRadiusSecondBandExpansionProtocol(innerDrift),
    /combinedBox\.alpha1/,
  );

  const phaseDrift = structuredClone(expansionProtocol);
  phaseDrift.radiusExpansion.relativePhases[1] = "pi/2";
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyOuterRadiusSecondBandExpansionProtocol(phaseDrift),
    /relativePhases/,
  );

  const replayDrift = structuredClone(expansionProtocol);
  replayDrift.sealedPriorCombinedBox.resultHash = "0".repeat(64);
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyOuterRadiusSecondBandExpansionProtocol(replayDrift),
    /prior combined-box control identity/,
  );

  const resourceDrift = structuredClone(expansionProtocol);
  resourceDrift.foldExclusion.maximumBoxesPerRepresentative += 1;
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyOuterRadiusSecondBandExpansionProtocol(resourceDrift),
    /may not relax/,
  );
});

test("second strip stops at the exact outer-self history-edge topology boundary", () => {
  const result = evaluate();
  const summary = summarizeCoincidentMidpointCommonFrequencyOuterRadiusBandExpansion(result);
  const expectedEdge = 9 / (8 * Math.sin(9 / 8));
  const boundary = result.stopBoundary.firstUncertifiedBoundary;

  assert.equal(result.status.code, "counterexample-diagnostic");
  assert.equal(result.status.score, null);
  assert.equal(result.stopBoundary.stoppedAtFirstBoundary, true);
  assert.equal(boundary.status, "exact-history-edge-root-topology-boundary");
  assert.equal(boundary.alpha3, expectedEdge);
  assert.equal(boundary.historyReachChi, 9 / 4);
  assert.equal(boundary.channelIds.length, 2);
  assert.equal(boundary.historyEdgeCausalResidualAtBoundary, 0);
  assert.ok(boundary.causalResidualDelayDerivativeAtBoundary < 0);
  assert.ok(boundary.independentWitnesses.every((row) => row.passed));
  assert.equal(result.controls.priorCombinedBoxExactReplay.passed, true);
  assert.equal(result.controls.interBinary.passed, true);
  assert.equal(result.controls.projection.passed, true);
  assert.equal(
    result.controls.completeChannelAccounting.orderedChannelCount,
    36,
  );
  assert.equal(
    result.controls.completeChannelAccounting.unresolvedChannelCount,
    2,
  );
  assert.deepEqual(
    result.adjudicatedPrefix.alpha3,
    [17 / 16, expectedEdge],
  );
  assert.equal(summary.status.score, null);
  assert.equal(
    result.resultHash,
    "55d64d083a315446c6ce4d7c107e2ff953a3ca8a407f887c59d0e75045adc80a",
  );
  assert.equal(
    summary.summaryHash,
    "a8e521ac0743c406ab4ec233957f5e170338808736ce7815ac9250d15857680e",
  );
});

test("reduced second-band resources stop with incomplete verification before boundary adjudication", () => {
  const result = evaluate({
    maximumBoxesPerRepresentative: 1,
    maximumBoxesPerPacket: 12,
  });
  assert.equal(result.status.code, "drawn-not-evaluated");
  assert.equal(result.status.score, null);
  assert.equal(result.controls.interBinary.passed, false);
  assert.ok(result.interBinaryUnresolved.length > 0);
});
