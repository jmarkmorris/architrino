import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  evaluateA11OuterRadiusBandExpansion,
  summarizeA11OuterRadiusBandExpansion,
  validateA11OuterRadiusSecondBandExpansionProtocol,
} from "../src/prescribed-path-analysis/A11OuterRadiusBandExpansionDiagnostic.mjs";

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

const expansionProtocol = await readJson(
  "src/prescribed-path-analysis/protocols/" +
    "a1-1-outer-radius-second-band-expansion-protocol.v1.json",
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
    executionLimits,
  });
}

test("second expansion freezes only the adjacent 19/16-to-5/4 strip", () => {
  const validated =
    validateA11OuterRadiusSecondBandExpansionProtocol(expansionProtocol);
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
  const innerDrift = structuredClone(expansionProtocol);
  innerDrift.radiusExpansion.combinedBox.alpha1[0] -= 1 / 64;
  assert.throws(
    () => validateA11OuterRadiusSecondBandExpansionProtocol(innerDrift),
    /combinedBox\.alpha1/,
  );

  const phaseDrift = structuredClone(expansionProtocol);
  phaseDrift.radiusExpansion.relativePhases[1] = "pi/2";
  assert.throws(
    () => validateA11OuterRadiusSecondBandExpansionProtocol(phaseDrift),
    /relativePhases/,
  );

  const replayDrift = structuredClone(expansionProtocol);
  replayDrift.sealedPriorCombinedBox.resultHash = "0".repeat(64);
  assert.throws(
    () => validateA11OuterRadiusSecondBandExpansionProtocol(replayDrift),
    /prior combined-box control identity/,
  );

  const resourceDrift = structuredClone(expansionProtocol);
  resourceDrift.foldExclusion.maximumBoxesPerRepresentative += 1;
  assert.throws(
    () => validateA11OuterRadiusSecondBandExpansionProtocol(resourceDrift),
    /may not relax/,
  );
});

test("second strip stops at the exact outer-self history-edge topology boundary", () => {
  const result = evaluate();
  const summary = summarizeA11OuterRadiusBandExpansion(result);
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
    "ae2596b32d046c4657de805777732e4695d455e2ad247546f7f5d1fbb9900e95",
  );
  assert.equal(
    summary.summaryHash,
    "284bf4e33f82a996d31ce04547f52fa49f1e4f144e10753a18602232c26be37c",
  );
});

test("reduced second-band resources fail closed before boundary adjudication", () => {
  const result = evaluate({
    maximumBoxesPerRepresentative: 1,
    maximumBoxesPerPacket: 12,
  });
  assert.equal(result.status.code, "drawn-not-evaluated");
  assert.equal(result.status.score, null);
  assert.equal(result.controls.interBinary.passed, false);
  assert.ok(result.interBinaryUnresolved.length > 0);
});
