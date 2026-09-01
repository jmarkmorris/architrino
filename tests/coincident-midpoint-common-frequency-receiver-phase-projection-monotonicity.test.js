import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  evaluateCoincidentMidpointCommonFrequencyReceiverPhaseProjectionMonotonicity,
  summarizeCoincidentMidpointCommonFrequencyReceiverPhaseProjectionMonotonicity,
  validateCoincidentMidpointCommonFrequencyProjectionMonotonicityProtocol,
} from "../src/prescribed-path-analysis/index.mjs";

const protocolUrl = new URL(
  "../src/prescribed-path-analysis/protocols/" +
    "coincident-midpoint-common-frequency-receiver-phase-projection-monotonicity-protocol.v1.json",
  import.meta.url,
);
const protocol = JSON.parse(await readFile(protocolUrl, "utf8"));
const baseProtocol = JSON.parse(await readFile(
  new URL(`../${protocol.sealedInputs.baseProtocol.path}`, import.meta.url),
  "utf8",
));
const completeInventorySummary = JSON.parse(await readFile(
  new URL(
    `../${protocol.sealedInputs.completeInventorySummary.path}`,
    import.meta.url,
  ),
  "utf8",
));
const structuralLedgerSummary = JSON.parse(await readFile(
  new URL(
    `../${protocol.sealedInputs.structuralLedgerSummary.path}`,
    import.meta.url,
  ),
  "utf8",
));

function evaluate(executionLimits) {
  return evaluateCoincidentMidpointCommonFrequencyReceiverPhaseProjectionMonotonicity({
    projectionProtocol: protocol,
    baseProtocol,
    completeInventorySummary,
    structuralLedgerSummary,
    executionLimits,
  });
}

test("projection protocol locks relative phases, radius box, and null score", () => {
  const validated = validateCoincidentMidpointCommonFrequencyProjectionMonotonicityProtocol(protocol);
  assert.equal(validated.sourceConfiguration.scientificIdentity.assemblyId, "asm-2a289a6fe32f64922ab71bae973acc80");
  assert.deepEqual(
    validated.relativePhaseLock.phaseBaseline,
    ["0", "2*pi/3", "4*pi/3"],
  );
  assert.equal(
    validated.relativePhaseLock.varyingCoordinate,
    "common-cycle-position-only",
  );
  assert.equal(validated.relativePhaseLock.relativePhaseOffsetsVary, false);
  assert.deepEqual(validated.certificate.domain.alpha1, [7 / 8, 15 / 16]);
  assert.deepEqual(validated.certificate.domain.alpha3, [17 / 16, 9 / 8]);
  assert.equal(validated.targetOrderedChannelIds.length, 6);
  assert.equal(validated.representativeChannelIds.length, 3);
  assert.equal(validated.completionRule.score, null);
});

test("projection protocol rejects phase, radius, and bound drift", () => {
  const identityDrift = structuredClone(protocol);
  identityDrift.sourceConfiguration.scientificIdentity.modelRevisionSha256 = "0".repeat(64);
  assert.throws(() => validateCoincidentMidpointCommonFrequencyProjectionMonotonicityProtocol(identityDrift), /exact coincident-midpoint common-frequency scientific identity/);
  const driftedPhase = structuredClone(protocol);
  driftedPhase.relativePhaseLock.phaseBaseline[1] = "variable";
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyProjectionMonotonicityProtocol(driftedPhase),
    /relativePhaseLock\.phaseBaseline/,
  );

  const driftedRadius = structuredClone(protocol);
  driftedRadius.certificate.domain.alpha3[1] += 1 / 1024;
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyProjectionMonotonicityProtocol(driftedRadius),
    /certificate\.domain\.alpha3/,
  );

  const driftedBound = structuredClone(protocol);
  driftedBound.certificate.analyticRootGeometryBound.outerTransmitter
    .projectionDerivativeLowerBound = 0;
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyProjectionMonotonicityProtocol(driftedBound),
    /analytic interval bounds drifted/,
  );
});

test("continuous projection certificate closes all six target channels", () => {
  const result = evaluate();
  const summary = summarizeCoincidentMidpointCommonFrequencyReceiverPhaseProjectionMonotonicity(result);

  assert.equal(result.status.code, "evaluated-diagnostic");
  assert.equal(result.status.score, null);
  assert.equal(
    result.continuousConclusion,
    "the-receiver-phase-projection-is-strictly-increasing-on-each-declared-emission-fixed-root-sheet.v1",
  );
  assert.equal(result.targetChannelResults.length, 6);
  assert.equal(result.representativeResults.length, 3);
  assert.ok(result.targetChannelResults.every((row) =>
    row.status === "evaluated-diagnostic" &&
    row.continuousProjectionDerivativeLowerBound > 0));
  assert.equal(
    result.targetChannelResults.filter((row) => row.reuse).length,
    3,
  );
  assert.equal(summary.rawLedger.rowCount, 3);
  assert.equal(summary.status.score, null);
  assert.equal(result.evaluator.pathEvolutionInvoked, false);
  assert.equal(result.evaluator.eomSolverInvoked, false);
  assert.equal(result.evaluator.eomIntervalMachineryInvoked, false);
});

test("projection controls preserve provenance, independent checks, and negatives", () => {
  const result = evaluate();
  assert.ok(Object.values(result.controls).every((row) => row.passed));
  assert.equal(
    result.controls.complete36ChannelInventory.orderedChannelCount,
    36,
  );
  assert.equal(
    result.controls.structuralIndependentResidualAndProvenance.sampledRootCount,
    5204,
  );
  assert.equal(result.controls.independentWitness.witnessCount, 12);
  assert.ok(
    result.controls.independentWitness.maximumNormalizedResidual <= 1e-9,
  );
  assert.equal(
    result.controls.syntheticProjectionClassifier.rows[1]
      .observedDisposition,
    "counterexample-nonpositive-projection-box",
  );
  assert.equal(
    result.controls.resourceExhaustion.status,
    "drawn-not-evaluated",
  );
});

test("projection execution limits cannot exceed their declaration", () => {
  assert.throws(
    () => evaluate({ maximumBoxesPerRepresentative: 20001 }),
    /may not exceed declared ceilings/,
  );
});

test("sealed structural ledger tampering is rejected", () => {
  const tampered = structuredClone(structuralLedgerSummary);
  tampered.rawLedger.hash = "tampered";
  assert.throws(
    () => evaluateCoincidentMidpointCommonFrequencyReceiverPhaseProjectionMonotonicity({
      projectionProtocol: protocol,
      baseProtocol,
      completeInventorySummary,
      structuralLedgerSummary: tampered,
    }),
    /does not match its sealed hashes/,
  );
});
