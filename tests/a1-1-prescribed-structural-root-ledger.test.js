import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  evaluateA11PrescribedStructuralRootLedger,
  summarizeA11PrescribedStructuralRootLedger,
  validateA11StructuralRootLedgerProtocol,
} from "../src/prescribed-path-analysis/index.mjs";

const protocolUrl = new URL(
  "../src/prescribed-path-analysis/protocols/" +
    "a1-1-prescribed-structural-root-ledger-protocol.v1.json",
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

test("A1.1 structural ledger locks its grid, rows, resources, and null score", () => {
  const validated = validateA11StructuralRootLedgerProtocol(protocol);
  assert.deepEqual(validated.sampling.alpha1, [7 / 8, 29 / 32, 15 / 16]);
  assert.deepEqual(validated.sampling.alpha3, [17 / 16, 35 / 32, 9 / 8]);
  assert.equal(validated.sampling.phaseNodeCount, 24);
  assert.equal(validated.declaredRows.length, 8);
  assert.equal(validated.resources.maximumSampledRootRows, 5400);
  assert.equal(validated.resources.maximumBisectionEvaluations, 800000);
  assert.equal(validated.completionRule.score, null);
});

test("A1.1 structural ledger rejects row, resource, and boundary drift", () => {
  const driftedRow = structuredClone(protocol);
  driftedRow.declaredRows[0] = "unreviewed-row";
  assert.throws(
    () => validateA11StructuralRootLedgerProtocol(driftedRow),
    /declaredRows/,
  );

  const driftedResource = structuredClone(protocol);
  driftedResource.resources.maximumSampledRootRows += 1;
  assert.throws(
    () => validateA11StructuralRootLedgerProtocol(driftedResource),
    /resource declaration drifted/,
  );

  const driftedBoundary = structuredClone(protocol);
  driftedBoundary.claimBoundary.eomIntervalMachineryInvoked = true;
  assert.throws(
    () => validateA11StructuralRootLedgerProtocol(driftedBoundary),
    /prescribed-only and null-score/,
  );
});

test("bounded structural ledger covers 36 channels and passes declared controls", () => {
  const result = evaluateA11PrescribedStructuralRootLedger({
    ledgerProtocol: protocol,
    baseProtocol,
    continuousSummary,
    rootSheetSummary,
  });
  const summary = summarizeA11PrescribedStructuralRootLedger(result);

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
  const result = evaluateA11PrescribedStructuralRootLedger({
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
    () => evaluateA11PrescribedStructuralRootLedger({
      ledgerProtocol: protocol,
      baseProtocol,
      continuousSummary,
      rootSheetSummary: tamperedSummary,
    }),
    /does not match its sealed hashes/,
  );
});
