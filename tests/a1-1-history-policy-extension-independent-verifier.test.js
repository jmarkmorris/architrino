import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  evaluateA11HistoryPolicyExtensionIndependentVerifier,
  evaluateA11OuterRadiusBandExpansion,
  summarizeA11HistoryPolicyExtensionIndependentVerifier,
  validateA11HistoryPolicyExtensionIndependentProtocol,
} from "../src/prescribed-path-analysis/index.mjs";

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

const protocol = await readJson(
  "src/prescribed-path-analysis/protocols/" +
    "a1-1-history-policy-extension-independent-verifier-protocol.v1.json",
);
const baseProtocol = await readJson(protocol.baseProtocol.path);
const originalRootProtocol = await readJson(
  protocol.sealedOriginalVerifier.rootSheet.protocolPath,
);
const originalRootSealedSummary = await readJson(
  originalRootProtocol.sealedRegressionReceipt.path,
);
const originalRootSummary = await readJson(
  protocol.sealedOriginalVerifier.rootSheet.summaryPath,
);
const originalProjectionProtocol = await readJson(
  protocol.sealedOriginalVerifier.projection.protocolPath,
);
const originalStructuralSummary = await readJson(
  originalProjectionProtocol.sealedInputs.structuralLedgerSummary.path,
);
const originalProjectionSummary = await readJson(
  protocol.sealedOriginalVerifier.projection.summaryPath,
);
const subjectProtocol = await readJson(protocol.sealedSubject.protocolPath);
const subjectSummary = await readJson(protocol.sealedSubject.summaryPath);
const baselineStructuralProtocol = await readJson(
  subjectProtocol.sealedBaseline.structuralLedger.protocolPath,
);
const previousBoundaryProtocol = await readJson(
  protocol.sealedPreviousBoundary.protocolPath,
);
const previousBoundarySummary = await readJson(
  protocol.sealedPreviousBoundary.summaryPath,
);
const priorExpansionProtocol = await readJson(
  previousBoundaryProtocol.sealedPriorCombinedBox.protocolPath,
);
const priorExpansionSummary = await readJson(
  previousBoundaryProtocol.sealedPriorCombinedBox.summaryPath,
);
const subjectResult = evaluateA11OuterRadiusBandExpansion({
  expansionProtocol: subjectProtocol,
  baseProtocol,
  baselineRootSheetProtocol: originalRootProtocol,
  baselineContinuousSummary: originalRootSealedSummary,
  baselineRootSheetSummary: originalRootSummary,
  baselineStructuralProtocol,
  baselineStructuralSummary: originalStructuralSummary,
  baselineProjectionProtocol: originalProjectionProtocol,
  baselineProjectionSummary: originalProjectionSummary,
  priorExpansionProtocol,
  priorExpansionSummary,
  previousBoundaryProtocol,
  previousBoundarySummary,
});
const subjectReplay = subjectResult.controls.previousBoundaryExactReplay;
const previousBoundaryReplay = {
  protocolHash: subjectReplay.observedProtocolHash,
  resultHash: subjectReplay.observedResultHash,
  summaryHash: subjectReplay.observedSummaryHash,
  status: subjectReplay.preservedStatus.code,
  boundaryAlpha3: subjectReplay.preservedBoundary.alpha3,
  passed: subjectReplay.passed,
};

function evaluate({
  verifierProtocol = protocol,
  replay = previousBoundaryReplay,
  executionLimits = null,
} = {}) {
  return evaluateA11HistoryPolicyExtensionIndependentVerifier({
    verifierProtocol,
    baseProtocol,
    originalRootProtocol,
    originalRootSealedSummary,
    originalRootSummary,
    originalProjectionProtocol,
    originalStructuralSummary,
    originalProjectionSummary,
    previousBoundaryReplay: replay,
    subjectProtocol,
    subjectSummary,
    executionLimits,
  });
}

test("independent verifier freezes only the new history-extension slice", async () => {
  const validated =
    validateA11HistoryPolicyExtensionIndependentProtocol(protocol);
  assert.deepEqual(
    validated.rootSheet.domain.alpha3,
    [9 / (8 * Math.sin(9 / 8)), 5 / 4],
  );
  assert.deepEqual(validated.rootSheet.domain.alpha1, [7 / 8, 15 / 16]);
  assert.deepEqual(validated.rootSheet.domain.alpha2, [1, 1]);
  assert.deepEqual(
    validated.rootSheet.domain.dimensionlessDelayInterior,
    [1 / 32, 145 / 64],
  );
  assert.deepEqual(
    validated.relativePhaseLock.phaseBaseline,
    ["0", "2*pi/3", "4*pi/3"],
  );
  assert.equal(validated.targetRepresentatives.length, 12);
  assert.equal(validated.endpointInversionReuse.length, 12);
  assert.equal(validated.completionRule.score, null);
  const source = await readFile(
    "src/prescribed-path-analysis/" +
      "A11HistoryPolicyExtensionIndependentVerifier.mjs",
    "utf8",
  );
  assert.doesNotMatch(source, /A11OuterRadiusBandExpansionDiagnostic/u);
});

test("independent verifier rejects geometry, reach, and gate drift", () => {
  const radiusDrift = structuredClone(protocol);
  radiusDrift.rootSheet.domain.alpha3[1] += 1 / 1024;
  assert.throws(
    () => validateA11HistoryPolicyExtensionIndependentProtocol(radiusDrift),
    /rootSheet\.domain\.alpha3/u,
  );

  const historyDrift = structuredClone(protocol);
  historyDrift.rootSheet.domain.dimensionlessDelayInterior[1] += 1 / 64;
  assert.throws(
    () => validateA11HistoryPolicyExtensionIndependentProtocol(historyDrift),
    /dimensionlessDelayInterior/u,
  );

  const toleranceDrift = structuredClone(protocol);
  toleranceDrift.foldExclusion.squaredResidualExclusionFloor *= 10;
  assert.throws(
    () => validateA11HistoryPolicyExtensionIndependentProtocol(toleranceDrift),
    /may not alter frozen resources or floors/u,
  );
});

test("independent verifier closes topology and projection on the new slice", () => {
  const result = evaluate();
  const summary =
    summarizeA11HistoryPolicyExtensionIndependentVerifier(result);
  assert.equal(result.status.code, "independent-acceptance-passed");
  assert.equal(result.status.score, null);
  assert.equal(result.status.acceptedDiagnosticMathematics, true);
  assert.equal(result.verifier.importsOuterRadiusProducer, false);
  assert.equal(result.verifier.consumesProducerGateBooleans, false);
  assert.equal(result.controls.originalVerifierReplay.passed, true);
  assert.equal(result.controls.previousBoundaryReplay.passed, true);
  assert.equal(
    result.controls.previousBoundaryReplay.status,
    "counterexample-diagnostic",
  );
  assert.equal(result.controls.sealedSubject.passed, true);
  assert.equal(
    result.controls.sealedSubject.producerStatusConsumedAsAcceptanceEvidence,
    false,
  );
  assert.equal(result.topology.passed, true);
  assert.equal(result.topology.representativeResults.length, 12);
  assert.equal(result.topology.inversionRows.length, 12);
  assert.equal(result.topology.unresolved.length, 0);
  assert.ok(result.topology.representativeResults.every((row) =>
    row.rootCountInvariance.inferredRootCountAcrossParameterDomain === 1));
  assert.equal(result.projection.passed, true);
  assert.equal(result.projection.targetRows.length, 6);
  assert.ok(result.projection.targetRows.every((row) =>
    row.projectionDerivativeEnclosure[0] > 0));
  assert.equal(result.projection.controls.pointWitnesses.passed, true);
  assert.equal(summary.status.score, null);
  assert.equal(summary.claimBoundary.candidateSelection, false);
});

test("independent verifier stops advancement on reduced resources or replay drift", () => {
  const reduced = evaluate({
    executionLimits: {
      maximumBoxesPerRepresentative: 1,
      maximumBoxesPerPacket: 12,
    },
  });
  assert.equal(reduced.status.code, "drawn-not-evaluated");
  assert.equal(reduced.status.score, null);
  assert.equal(reduced.status.acceptedDiagnosticMathematics, false);
  assert.equal(reduced.topology.passed, false);
  assert.ok(reduced.topology.unresolved.length > 0);

  const replayDrift = {
    ...previousBoundaryReplay,
    resultHash: "0".repeat(64),
  };
  const replayFailed = evaluate({ replay: replayDrift });
  assert.equal(replayFailed.status.code, "drawn-not-evaluated");
  assert.equal(replayFailed.controls.previousBoundaryReplay.passed, false);
  assert.equal(replayFailed.status.score, null);
});
