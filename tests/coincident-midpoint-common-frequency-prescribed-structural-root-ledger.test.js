import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  evaluateCoincidentMidpointCommonFrequencyPrescribedStructuralRootLedger,
  summarizeCoincidentMidpointCommonFrequencyPrescribedStructuralRootLedger,
  validateCoincidentMidpointCommonFrequencyStructuralRootLedgerProtocol,
} from "../src/prescribed-path-analysis/index.mjs";

const protocolUrl = new URL(
  "../src/prescribed-path-analysis/protocols/" +
    "coincident-midpoint-common-frequency-prescribed-structural-root-ledger-protocol.v1.json",
  import.meta.url,
);
const protocol = JSON.parse(await readFile(protocolUrl, "utf8"));
const baseProtocol = JSON.parse(await readFile(
  new URL(`../${protocol.sealedInputs.baseProtocol.path}`, import.meta.url),
  "utf8",
));
const continuousSummary = JSON.parse(await readFile(
  new URL(
    `../${protocol.sealedInputs.continuousInventorySummary.path}`,
    import.meta.url,
  ),
  "utf8",
));
const rootSheetSummary = JSON.parse(await readFile(
  new URL(
    `../${protocol.sealedInputs.rootSheetSummary.path}`,
    import.meta.url,
  ),
  "utf8",
));

test("coincident-midpoint common-frequency three-axis circular configuration structural ledger locks its grid, rows, resources, and null score", () => {
  const validated = validateCoincidentMidpointCommonFrequencyStructuralRootLedgerProtocol(protocol);
  assert.equal(validated.sourceConfiguration.scientificIdentity.modelRevisionSha256, "2a289a6fe32f64922ab71bae973acc80bef8ebc2369329a26822f3f0d7f159d6");
  assert.deepEqual(validated.sampling.alpha1, [7 / 8, 29 / 32, 15 / 16]);
  assert.deepEqual(validated.sampling.alpha3, [17 / 16, 35 / 32, 9 / 8]);
  assert.equal(validated.sampling.phaseNodeCount, 24);
  assert.equal(validated.declaredRows.length, 8);
  assert.equal(validated.resources.maximumSampledRootRows, 5400);
  assert.equal(validated.resources.maximumBisectionEvaluations, 800000);
  assert.equal(validated.completionRule.score, null);
});

test("coincident-midpoint common-frequency three-axis circular configuration structural ledger rejects row, resource, and boundary drift", () => {
  const identityDrift = structuredClone(protocol);
  identityDrift.sourceConfiguration.scientificIdentity.assemblyId = "asm-00000000000000000000000000000000";
  assert.throws(() => validateCoincidentMidpointCommonFrequencyStructuralRootLedgerProtocol(identityDrift), /exact coincident-midpoint common-frequency scientific identity/);
  const driftedRow = structuredClone(protocol);
  driftedRow.declaredRows[0] = "unreviewed-row";
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyStructuralRootLedgerProtocol(driftedRow),
    /declaredRows/,
  );

  const driftedResource = structuredClone(protocol);
  driftedResource.resources.maximumSampledRootRows += 1;
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyStructuralRootLedgerProtocol(driftedResource),
    /resource declaration drifted/,
  );

  const driftedBoundary = structuredClone(protocol);
  driftedBoundary.claimBoundary.eomIntervalMachineryInvoked = true;
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyStructuralRootLedgerProtocol(driftedBoundary),
    /prescribed-only and null-score/,
  );
});

test("bounded structural ledger covers 36 channels and passes declared controls", () => {
  const result = evaluateCoincidentMidpointCommonFrequencyPrescribedStructuralRootLedger({
    ledgerProtocol: protocol,
    baseProtocol,
    continuousSummary,
    rootSheetSummary,
  });
  const summary = summarizeCoincidentMidpointCommonFrequencyPrescribedStructuralRootLedger(result);

  assert.equal(result.status.code, "evaluated-diagnostic");
  assert.equal(result.status.score, null);
  assert.equal(result.channelSummaries.length, 36);
  assert.equal(result.resources.sampledRootRows, 5204);
  assert.ok(
    result.resources.bisectionEvaluations <=
      result.resources.declared.maximumBisectionEvaluations,
  );
  assert.equal(
    result.channelSummaries.filter((row) =>
      row.channelKind === "inter-binary").length,
    24,
  );
  assert.equal(
    result.channelSummaries.filter((row) =>
      row.declaredSheetChart === "emission-fixed").length,
    6,
  );
  assert.ok(Object.values(result.controls).every((control) => control.passed));
  assert.ok(
    result.controls.independentResidualAndDerivative
      .maximumIndependentNormalizedResidual <= 1e-9,
  );
  assert.equal(result.evaluator.pathEvolutionInvoked, false);
  assert.equal(result.evaluator.eomSolverInvoked, false);
  assert.equal(result.evaluator.eomIntervalMachineryInvoked, false);
  assert.equal(summary.status.score, null);
  assert.equal(summary.rawLedger.rowCount, 5204);
});

test("projection observation stays sampled and does not infer reception root count", () => {
  const result = evaluateCoincidentMidpointCommonFrequencyPrescribedStructuralRootLedger({
    ledgerProtocol: protocol,
    baseProtocol,
    continuousSummary,
    rootSheetSummary,
  });
  const emissionRows = result.channelSummaries.filter((row) =>
    row.declaredSheetChart === "emission-fixed");

  assert.equal(emissionRows.length, 6);
  assert.equal(
    result.observations.receiverPhaseProjectionFoldBracketCount,
    0,
  );
  assert.ok(emissionRows.every((row) =>
    row.receptionPhaseRootCountStatus ===
      "not-inferred-from-emission-chart; inspect-projection-fold-brackets"));
  assert.ok(emissionRows.every((row) =>
    row.sampledReceiverPhaseProjectionDerivativeRange[0] > 0));
});

test("sealed input tampering is rejected before evaluation", () => {
  const tamperedSummary = structuredClone(rootSheetSummary);
  tamperedSummary.channelAccounting.orderedChannelCount = 35;
  assert.throws(
    () => evaluateCoincidentMidpointCommonFrequencyPrescribedStructuralRootLedger({
      ledgerProtocol: protocol,
      baseProtocol,
      continuousSummary,
      rootSheetSummary: tamperedSummary,
    }),
    /does not match its sealed hashes/,
  );
});
