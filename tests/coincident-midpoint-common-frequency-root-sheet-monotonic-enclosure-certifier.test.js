import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  evaluateCoincidentMidpointCommonFrequencyRootSheetMonotonicEnclosureTreatment,
  summarizeCoincidentMidpointCommonFrequencyRootSheetMonotonicEnclosureTreatment,
  validateCoincidentMidpointCommonFrequencyRootSheetTreatmentProtocol,
} from "../src/prescribed-path-analysis/index.mjs";

const treatmentProtocolUrl = new URL(
  "../src/prescribed-path-analysis/protocols/" +
    "coincident-midpoint-common-frequency-root-sheet-monotonic-enclosure-treatment-protocol.v1.json",
  import.meta.url,
);
const treatmentProtocol = JSON.parse(
  await readFile(treatmentProtocolUrl, "utf8"),
);
const baseProtocol = JSON.parse(await readFile(
  new URL(`../${treatmentProtocol.baseProtocol.path}`, import.meta.url),
  "utf8",
));
const sealedSummary = JSON.parse(await readFile(
  new URL(
    `../${treatmentProtocol.sealedRegressionReceipt.path}`,
    import.meta.url,
  ),
  "utf8",
));

test("coincident-midpoint common-frequency three-axis circular configuration root-sheet protocol locks targets, charts, resources, and null score", () => {
  const validated = validateCoincidentMidpointCommonFrequencyRootSheetTreatmentProtocol(treatmentProtocol);
  assert.equal(validated.sourceConfiguration.scientificIdentity.assemblyId, "asm-2a289a6fe32f64922ab71bae973acc80");
  assert.equal(validated.targetRepresentatives.length, 9);
  assert.equal(
    validated.rootSheet.subFieldSpeedCoordinateCharts.id,
    "coincident-midpoint-common-frequency-sub-field-endpoint-root-sheet-coordinate-charts.v1",
  );
  assert.equal(
    validated.rootSheet.subFieldSpeedCoordinateCharts.emissionFixed
      .causalResidualDerivativeUpperBound,
    "alpha1_max-1=-1/16",
  );
  assert.equal(validated.foldExclusion.maximumBoxesPerRepresentative, 20000);
  assert.equal(validated.foldExclusion.maximumBoxesPerPacket, 180000);
  assert.equal(validated.anchorRootInventory.point.coordinatePhase, Math.PI / 7);
  assert.equal(validated.completionRule.score, null);
});

test("coincident-midpoint common-frequency three-axis circular configuration root-sheet protocol rejects chart and resource drift", () => {
  const identityDrift = structuredClone(treatmentProtocol);
  identityDrift.sourceConfiguration.scientificIdentity.assemblyId = "asm-00000000000000000000000000000000";
  assert.throws(() => validateCoincidentMidpointCommonFrequencyRootSheetTreatmentProtocol(identityDrift), /exact coincident-midpoint common-frequency scientific identity/);
  const driftedChart = structuredClone(treatmentProtocol);
  driftedChart.rootSheet.subFieldSpeedCoordinateCharts.emissionFixed
    .causalResidualDerivativeUpperBound = "unreviewed-bound";
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyRootSheetTreatmentProtocol(driftedChart),
    /variables or theorem identity drifted/,
  );

  const driftedResource = structuredClone(treatmentProtocol);
  driftedResource.foldExclusion.maximumBoxesPerRepresentative += 1;
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyRootSheetTreatmentProtocol(driftedResource),
    /may not relax/,
  );
});

test("root-sheet treatment closes nine representatives at null diagnostic score", () => {
  const result = evaluateCoincidentMidpointCommonFrequencyRootSheetMonotonicEnclosureTreatment({
    treatmentProtocol,
    baseProtocol,
    sealedSummary,
  });
  const summary = summarizeCoincidentMidpointCommonFrequencyRootSheetMonotonicEnclosureTreatment(result);

  assert.equal(result.status.code, "evaluated-diagnostic");
  assert.equal(result.status.score, null);
  assert.equal(result.counts.targetRepresentativeCount, 9);
  assert.equal(result.counts.globallyClosedRepresentativeCount, 9);
  assert.equal(result.counts.unresolvedBoxCount, 0);
  assert.equal(result.controls.sealedSixChannelRegression.passed, true);
  assert.equal(
    result.controls.sealedSixChannelRegression.reEvaluatedClosedChannels,
    false,
  );
  assert.equal(result.controls.endpointAndPhaseSeam.passed, true);
  assert.equal(result.controls.syntheticFold.passed, true);
  assert.equal(result.controls.resourceExhaustion.passed, true);
  assert.equal(result.controls.completeChannelAccounting.passed, true);
  assert.equal(result.channelAccounting.orderedChannelCount, 36);
  assert.deepEqual(result.channelAccounting.counts, {
    sealedSameOrPartnerChannelCount: 12,
    sealedInterBinaryChannelCount: 6,
    rootSheetRepresentativeChannelCount: 9,
    endpointInversionReusedChannelCount: 9,
    unresolvedChannelCount: 0,
  });
  assert.equal(result.evaluator.pathEvolutionInvoked, false);
  assert.equal(result.evaluator.eomSolverInvoked, false);
  assert.equal(result.evaluator.eomIntervalMachineryInvoked, false);

  const exactChartRows = result.representativeResults.filter((row) =>
    row.foldExclusion.method ===
      "exact-sub-field-endpoint-coordinate-chart.v1");
  const intervalRows = result.representativeResults.filter((row) =>
    row.foldExclusion.method ===
      "interval-squared-residual-fold-exclusion.v1");
  assert.equal(exactChartRows.length, 6);
  assert.equal(intervalRows.length, 3);
  assert.ok(result.representativeResults.every((row) =>
    row.anchorRootInventory.observedCertifiedRootCount === 1 &&
    row.anchorRootInventory.maximumIndependentNormalizedResidual <= 1e-9 &&
    row.rootCountInvariance.inferredRootCountAcrossParameterDomain === 1));
  assert.equal(summary.status.score, null);
  assert.equal(summary.unresolvedLedger.count, 0);
});

test("root-sheet treatment fails closed under a reduced execution limit", () => {
  const result = evaluateCoincidentMidpointCommonFrequencyRootSheetMonotonicEnclosureTreatment({
    treatmentProtocol,
    baseProtocol,
    sealedSummary,
    executionLimits: {
      maximumBoxesPerRepresentative: 1,
      maximumBoxesPerPacket: 1,
    },
  });
  assert.equal(result.status.code, "drawn-not-evaluated");
  assert.equal(result.status.score, null);
  assert.ok(result.counts.unresolvedBoxCount > 0);
  assert.throws(
    () => evaluateCoincidentMidpointCommonFrequencyRootSheetMonotonicEnclosureTreatment({
      treatmentProtocol,
      baseProtocol,
      sealedSummary,
      executionLimits: {
        maximumBoxesPerRepresentative: 20001,
      },
    }),
    /may not exceed its declared ceiling/,
  );
});
