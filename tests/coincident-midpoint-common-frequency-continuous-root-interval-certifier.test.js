import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  buildCoincidentMidpointCommonFrequencyOrderedChannelInventory,
  evaluateCoincidentMidpointCommonFrequencyContinuousRootInventory,
  validateCoincidentMidpointCommonFrequencyContinuousRootInventoryProtocol,
} from "../src/prescribed-path-analysis/index.mjs";

const protocolUrl = new URL(
  "../src/prescribed-path-analysis/protocols/" +
    "coincident-midpoint-common-frequency-continuous-ratio-phase-root-inventory-protocol.v1.json",
  import.meta.url,
);
const protocol = JSON.parse(await readFile(protocolUrl, "utf8"));

test("coincident-midpoint common-frequency configuration interval protocol locks the approved box, chi, and 36-channel map", () => {
  const validated = validateCoincidentMidpointCommonFrequencyContinuousRootInventoryProtocol(protocol);
  assert.equal(validated.sourceConfiguration.scientificIdentity.assemblyId, "asm-2a289a6fe32f64922ab71bae973acc80");
  assert.deepEqual(validated.frozenDomain.alpha1, [7 / 8, 15 / 16]);
  assert.deepEqual(validated.frozenDomain.alpha3, [17 / 16, 9 / 8]);
  assert.equal(validated.frozenDomain.historyReachChi, 9 / 4);
  assert.equal(validated.rootPolicy.rules, 9);

  const channels = buildCoincidentMidpointCommonFrequencyOrderedChannelInventory(protocol);
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

test("coincident-midpoint common-frequency configuration interval protocol rejects drift from the frozen ratio box", () => {
  const identityDrift = structuredClone(protocol);
  identityDrift.sourceConfiguration.scientificIdentity.modelRevisionSha256 = "0".repeat(64);
  assert.throws(() => validateCoincidentMidpointCommonFrequencyContinuousRootInventoryProtocol(identityDrift), /must bind the exact coincident-midpoint common-frequency configuration/);
  const drifted = structuredClone(protocol);
  drifted.frozenDomain.alpha3[1] = 1.126;
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyContinuousRootInventoryProtocol(drifted),
    /frozenDomain\.alpha3/,
  );
});

test("coincident-midpoint common-frequency configuration interval protocol rejects endpoint and polarity provenance drift", () => {
  const driftedEndpoint = structuredClone(protocol);
  driftedEndpoint.sourceConfiguration.binaries[0].worldlineIds[0] = "unreviewed-endpoint";
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyContinuousRootInventoryProtocol(driftedEndpoint),
    /worldlineIds/,
  );

  const driftedPolarity = structuredClone(protocol);
  driftedPolarity.sourceConfiguration.binaries[1].polarityAssignment = 1;
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyContinuousRootInventoryProtocol(driftedPolarity),
    /polarity assignment/,
  );
});

test("coincident-midpoint common-frequency configuration point controls distinguish outer self roots from inner no-root rows", () => {
  const result = evaluateCoincidentMidpointCommonFrequencyContinuousRootInventory({
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
  assert.equal(result.controls.analyticReductionControl.passed, true);
  assert.equal(
    result.controls.analyticReductionControl.grade,
    "same-change-diagnostic-conformance-only",
  );
  assert.equal(result.controls.independentResidualRecomputation.passed, true);
  assert.equal(result.controls.rootSeparationControl.passed, true);
  assert.equal(result.controls.rootSeparationControl.violations.length, 0);
  assert.equal(result.evaluator.pathEvolutionInvoked, false);
  assert.equal(result.evaluator.eomSolverInvoked, false);
  assert.equal(result.evaluator.eomIntervalMachineryInvoked, false);
});

test("resource exhaustion fails closed with drawn-not-evaluated and null score", () => {
  const result = evaluateCoincidentMidpointCommonFrequencyContinuousRootInventory({
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

test("exact circular reduction closes six inter-binary channels without raising caps", () => {
  const result = evaluateCoincidentMidpointCommonFrequencyContinuousRootInventory({ protocol });
  const closedInterBinaryChannelIds = result.channelResults
    .filter((row) =>
      row.channel.kind === "inter-binary" &&
      row.status === "evaluated-diagnostic")
    .map((row) => row.channel.channelId);

  assert.deepEqual(closedInterBinaryChannelIds, [
    "coincident-midpoint-common-frequency-binary-1-endpoint-1<-coincident-midpoint-common-frequency-binary-2-endpoint-1",
    "coincident-midpoint-common-frequency-binary-1-endpoint-2<-coincident-midpoint-common-frequency-binary-2-endpoint-2",
    "coincident-midpoint-common-frequency-binary-2-endpoint-1<-coincident-midpoint-common-frequency-binary-3-endpoint-1",
    "coincident-midpoint-common-frequency-binary-2-endpoint-2<-coincident-midpoint-common-frequency-binary-3-endpoint-2",
    "coincident-midpoint-common-frequency-binary-3-endpoint-1<-coincident-midpoint-common-frequency-binary-1-endpoint-1",
    "coincident-midpoint-common-frequency-binary-3-endpoint-2<-coincident-midpoint-common-frequency-binary-1-endpoint-2",
  ]);
  assert.equal(result.channelCoverage.orderedChannelCount, 36);
  assert.equal(result.channelCoverage.interBinarySymmetryClassCount, 12);
  assert.equal(result.channelCoverage.interBinarySymmetryReusedChannelCount, 12);
  assert.equal(result.counts.possibleFoldCells, 0);
  assert.equal(result.status.code, "drawn-not-evaluated");
  assert.equal(result.status.score, null);
  assert.equal(result.controls.analyticReductionControl.passed, true);
  assert.equal(result.controls.independentResidualRecomputation.passed, true);
});
