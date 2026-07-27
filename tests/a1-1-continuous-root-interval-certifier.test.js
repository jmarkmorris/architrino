import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  buildA11OrderedChannelInventory,
  evaluateA11ContinuousRootInventory,
  validateA11ContinuousRootInventoryProtocol,
} from "../src/prescribed-path-analysis/index.mjs";

const protocolUrl = new URL(
  "../src/prescribed-path-analysis/protocols/" +
    "a1-1-continuous-ratio-phase-root-inventory-protocol.v1.json",
  import.meta.url,
);
const protocol = JSON.parse(await readFile(protocolUrl, "utf8"));

test("A1.1 interval protocol locks the approved box, chi, and 36-channel map", () => {
  const validated = validateA11ContinuousRootInventoryProtocol(protocol);
  assert.deepEqual(validated.frozenDomain.alpha1, [7 / 8, 15 / 16]);
  assert.deepEqual(validated.frozenDomain.alpha3, [17 / 16, 9 / 8]);
  assert.equal(validated.frozenDomain.historyReachChi, 9 / 4);
  assert.equal(validated.rootPolicy.rules, 9);

  const channels = buildA11OrderedChannelInventory(protocol);
  assert.equal(channels.length, 36);
  assert.equal(
    channels.filter((channel) => channel.kind === "same-transmitter-self").length,
    6,
  );
  assert.equal(
    channels.filter((channel) =>
      channel.kind === "same-binary-opposite-endpoint").length,
    6,
  );
  assert.equal(
    channels.filter((channel) => channel.kind === "inter-binary").length,
    24,
  );
});

test("A1.1 interval protocol rejects drift from the frozen ratio box", () => {
  const drifted = structuredClone(protocol);
  drifted.frozenDomain.alpha3[1] = 1.126;
  assert.throws(
    () => validateA11ContinuousRootInventoryProtocol(drifted),
    /frozenDomain\.alpha3/,
  );
});

test("A1.1 interval protocol rejects endpoint and polarity provenance drift", () => {
  const driftedEndpoint = structuredClone(protocol);
  driftedEndpoint.sourceFamily.binaries[0].worldlineIds[0] = "unreviewed-endpoint";
  assert.throws(
    () => validateA11ContinuousRootInventoryProtocol(driftedEndpoint),
    /worldlineIds/,
  );

  const driftedPolarity = structuredClone(protocol);
  driftedPolarity.sourceFamily.binaries[1].polarityAssignment = 1;
  assert.throws(
    () => validateA11ContinuousRootInventoryProtocol(driftedPolarity),
    /polarity assignment/,
  );
});

test("A1.1 point controls distinguish outer self roots from inner no-root rows", () => {
  const result = evaluateA11ContinuousRootInventory({
    protocol,
    executionLimits: {
      maximumSubdivisionDepth: 1,
      maximumCellsPerChannel: 1,
      maximumCellsPerPacket: 36,
    },
  });
  assert.equal(result.channelCoverage.orderedChannelCount, 36);
  assert.equal(result.controls.positiveControl.passed, true);
  assert.equal(result.controls.negativeControl.passed, true);
  assert.equal(result.controls.independentResidualRecomputation.passed, true);
  assert.equal(result.controls.rootSeparationControl.passed, true);
  assert.equal(result.controls.rootSeparationControl.violations.length, 0);
  assert.equal(result.evaluator.pathEvolutionInvoked, false);
  assert.equal(result.evaluator.eomSolverInvoked, false);
  assert.equal(result.evaluator.eomIntervalMachineryInvoked, false);
});

test("resource exhaustion fails closed with drawn-not-evaluated and null score", () => {
  const result = evaluateA11ContinuousRootInventory({
    protocol,
    executionLimits: {
      maximumSubdivisionDepth: 1,
      maximumCellsPerChannel: 1,
      maximumCellsPerPacket: 1,
    },
  });
  assert.equal(result.status.code, "drawn-not-evaluated");
  assert.equal(result.status.score, null);
  assert.ok(result.counts.unresolvedPartitionCount > 0);
  assert.ok(result.unresolvedPartitions.every((row) =>
    row.disposition.startsWith("unresolved-")));
});
