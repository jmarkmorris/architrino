import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  evaluateA11OuterRadiusBandExpansion,
  summarizeA11OuterRadiusBandExpansion,
  validateA11OuterRadiusExpansionProtocol,
} from "../src/prescribed-path-analysis/A11OuterRadiusBandExpansionDiagnostic.mjs";

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

const expansionProtocol = await readJson(
  "src/prescribed-path-analysis/protocols/" +
    "a1-1-outer-radius-band-expansion-protocol.v1.json",
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
    executionLimits,
  });
}

test("outer-radius expansion protocol freezes one adjacent band and all old gates", () => {
  const validated = validateA11OuterRadiusExpansionProtocol(expansionProtocol);
  assert.deepEqual(
    validated.radiusExpansion.addedOuterBand,
    [9 / 8, 19 / 16],
  );
  assert.deepEqual(
    validated.radiusExpansion.combinedBox.alpha1,
    [7 / 8, 15 / 16],
  );
  assert.equal(validated.radiusExpansion.middleRadiusFieldSpeedPin, 1);
  assert.deepEqual(
    validated.radiusExpansion.relativePhases,
    ["0", "2*pi/3", "4*pi/3"],
  );
  assert.equal(validated.foldExclusion.maximumBoxesPerRepresentative, 20000);
  assert.equal(validated.completionRule.score, null);
  assert.equal(validated.completionRule.stopAfterThisBand, true);
});

test("outer-radius expansion rejects inner-band, phase, and resource drift", () => {
  const innerDrift = structuredClone(expansionProtocol);
  innerDrift.radiusExpansion.combinedBox.alpha1[0] -= 1 / 64;
  assert.throws(
    () => validateA11OuterRadiusExpansionProtocol(innerDrift),
    /combinedBox\.alpha1/,
  );

  const phaseDrift = structuredClone(expansionProtocol);
  phaseDrift.radiusExpansion.relativePhases[1] = "pi/2";
  assert.throws(
    () => validateA11OuterRadiusExpansionProtocol(phaseDrift),
    /relativePhases/,
  );

  const resourceDrift = structuredClone(expansionProtocol);
  resourceDrift.foldExclusion.maximumBoxesPerRepresentative += 1;
  assert.throws(
    () => validateA11OuterRadiusExpansionProtocol(resourceDrift),
    /may not relax/,
  );
});

test("one outer band preserves the complete 36-channel topology and projection", () => {
  const result = evaluate();
  const summary = summarizeA11OuterRadiusBandExpansion(result);
  assert.equal(result.status.code, "evaluated-diagnostic");
  assert.equal(result.status.score, null);
  assert.equal(result.controls.baselineExactReplay.passed, true);
  assert.equal(result.controls.sameAndPartner.passed, true);
  assert.equal(result.controls.interBinary.passed, true);
  assert.equal(result.controls.projection.passed, true);
  assert.equal(result.controls.completeChannelAccounting.orderedChannelCount, 36);
  assert.equal(result.controls.completeChannelAccounting.unresolvedChannelCount, 0);
  assert.equal(result.interBinaryRepresentativeResults.length, 12);
  assert.ok(result.interBinaryRepresentativeResults.every((row) =>
    row.continuousRootCount === 1));
  assert.ok(result.projectionTargetRows.every((row) =>
    row.projectionDerivativeEnclosure[0] > 0));
  assert.equal(
    result.stopBoundary.firstUncertifiedBoundary,
    "alpha3-greater-than-19/16-not-evaluated",
  );
  assert.equal(
    summary.summaryHash,
    "a8c789f826ff286ef01f02f0a9aacc6faa72991e5e8535a436bc0531027eb23a",
  );
});

test("reduced expansion resources return incomplete verification with null score", () => {
  const result = evaluate({
    maximumBoxesPerRepresentative: 1,
    maximumBoxesPerPacket: 12,
  });
  assert.equal(result.status.code, "drawn-not-evaluated");
  assert.equal(result.status.score, null);
  assert.equal(result.controls.interBinary.passed, false);
  assert.ok(result.interBinaryUnresolved.length > 0);
});
