import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  assertProtocolPacketContract,
  buildSurfaceLadderProtocol,
  classifyPair,
  clopperPearsonOneSidedUpper,
  clopperPearsonTwoSided,
  COVERAGE_PROTOCOL_HASH,
  EXPECTED,
  FROZEN_IMPLEMENTATION_HASH,
  FULL_PROTOCOL_HASH,
  implementationIdentity,
  RECEIPT_SHA256,
  sha256Canonical,
  verifyReceiptAndPacket,
} from "../scripts/eom/run-a1-3-c5-resolution-coverage-calibration.mjs";
import {
  loadAllCandidateCampaignRegistry,
} from "../src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs";
import {
  createCompactCoverageProtocol,
} from "../src/prescribed-path-analysis/CompactMonteCarloCampaign.mjs";

const PACKET =
  "reference/priorities/braid-program/a1-3-c5-resolution-and-coverage-calibration-protocol.md";
const SWEEP =
  ".local-data/braid-analysis/compact-monte-carlo/family-sweep-v1";
const RECEIPT =
  `${SWEEP}/final-sweep-analyzer-receipt.v1.json`;

function retainedRow({ evaluated, passed }) {
  return {
    evaluationStatus: {
      evaluated,
      code: evaluated ? "evaluated" : "drawn-not-evaluated",
    },
    score: evaluated
      ? {
          status: { passed },
          gates: { evaluated: {} },
        }
      : null,
  };
}

test("sealed receipt, analyzer hashes, source manifests, and packet contract reproduce", () => {
  const binding = verifyReceiptAndPacket({
    packetPath: PACKET,
    sweepInput: SWEEP,
    receiptPath: RECEIPT,
  });
  assert.equal(binding.receiptSha256, RECEIPT_SHA256);
  assert.equal(binding.census.length, EXPECTED.draws);
  assert.equal(binding.campaigns.length, EXPECTED.campaignFiles);
  assert.equal(
    binding.census.filter(({ compactRow }) =>
      compactRow.evaluationStatus.evaluated &&
      compactRow.score !== null).length,
    EXPECTED.evaluated,
  );
  assert.equal(
    binding.census.filter(({ compactRow }) =>
      !compactRow.evaluationStatus.evaluated ||
      compactRow.score === null).length,
    EXPECTED.notEvaluated,
  );
});

test("packet lock fails closed when any predeclared ladder row drifts", () => {
  const packet = readFileSync(PACKET, "utf8");
  assert.doesNotThrow(() => assertProtocolPacketContract(packet));
  assert.throws(
    () => assertProtocolPacketContract(
      packet.replace("| R2 | $10^{-15}$ | 256 |", "| R2 | $10^{-14}$ | 512 |"),
    ),
    /packet contract drifted/,
  );
});

test("current producer, full protocol, and coverage protocol match frozen identities", () => {
  const loaded = loadAllCandidateCampaignRegistry();
  assert.equal(sha256Canonical(loaded.protocol), FULL_PROTOCOL_HASH);
  assert.equal(
    sha256Canonical(createCompactCoverageProtocol(loaded.protocol)),
    COVERAGE_PROTOCOL_HASH,
  );
  assert.equal(loaded.protocol.eventEvaluator.fieldSpeed, 1);
  assert.equal(
    implementationIdentity().implementationHash,
    FROZEN_IMPLEMENTATION_HASH,
  );
});

test("surface ladder preserves all three grids, radii, thresholds, and R1/R2 pair", () => {
  const loaded = loadAllCandidateCampaignRegistry();
  const expected = {
    S0: [[12, 8, 16], [24, 12, 24]],
    S1: [[24, 12, 24], [48, 16, 32]],
    S2: [[48, 16, 32], [96, 20, 40]],
  };
  for (const [level, grids] of Object.entries(expected)) {
    const protocol = buildSurfaceLadderProtocol(loaded.protocol, level);
    assert.deepEqual(
      [
        [
          protocol.completeCycle.primary.timeSamples,
          protocol.completeCycle.primary.polarOrder,
          protocol.completeCycle.primary.azimuthCount,
        ],
        [
          protocol.completeCycle.refined.timeSamples,
          protocol.completeCycle.refined.polarOrder,
          protocol.completeCycle.refined.azimuthCount,
        ],
      ],
      grids,
    );
    assert.deepEqual(protocol.enclosingSurfaces.radii, [1, 1.25, 1.5, 2]);
    assert.equal(protocol.eventEvaluator.rootPolicy.tolerance, 1e-14);
    assert.equal(protocol.eventEvaluator.rootPolicy.maxIterations, 192);
    assert.equal(protocol.eventEvaluator.convergence.rootTolerance, 1e-15);
    assert.equal(protocol.eventEvaluator.convergence.maxIterations, 256);
    assert.equal(
      protocol.eventEvaluator.tolerances.convergenceAbsolute,
      1e-9,
    );
    assert.deepEqual(
      protocol.failClosedGates,
      loaded.protocol.failClosedGates,
    );
  }
});

test("seven-way classification keeps every not-evaluated side inconclusive", () => {
  const pass = retainedRow({ evaluated: true, passed: true });
  const reject = retainedRow({ evaluated: true, passed: false });
  const missing = retainedRow({ evaluated: false, passed: false });
  assert.equal(classifyPair(pass, pass), "both-pass");
  assert.equal(classifyPair(reject, reject), "both-reject");
  assert.equal(
    classifyPair(reject, pass),
    "coverage-false-negative",
  );
  assert.equal(
    classifyPair(pass, reject),
    "coverage-false-positive",
  );
  assert.equal(
    classifyPair(missing, pass),
    "inconclusive-compact-not-evaluated",
  );
  assert.equal(
    classifyPair(pass, missing),
    "inconclusive-full-not-evaluated",
  );
  assert.equal(
    classifyPair(missing, missing),
    "inconclusive-neither-evaluated",
  );
});

test("exact binomial bounds use the conditional denominator", () => {
  const upperZeroOf59 = clopperPearsonOneSidedUpper(0, 59);
  const independentlyDerived = 1 - 0.05 ** (1 / 59);
  assert.ok(Math.abs(upperZeroOf59 - independentlyDerived) < 1e-12);
  assert.ok(upperZeroOf59 < 0.05);
  assert.ok(clopperPearsonOneSidedUpper(0, 58) > 0.05);
  const interval = clopperPearsonTwoSided(0, 20);
  const independentUpper = 1 - 0.025 ** (1 / 20);
  assert.equal(interval.lower, 0);
  assert.ok(Math.abs(interval.upper - independentUpper) < 1e-12);
  assert.equal(clopperPearsonOneSidedUpper(0, 0), null);
});
