import assert from "node:assert/strict";
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
  RECEIPT_INSTANTIATION_STATUS,
  RECEIPT_UNINSTANTIATED_REASON,
  sha256Canonical,
  TARGET_CONFIGURATIONS,
  validateTargetConfigurationIdentity,
  verifyReceiptAndPacket,
} from "../scripts/eom/run-coincident-midpoint-4-2-1-frequency-and-coaxial-separated-two-planar-braid-co-rotating-resolution-coverage-calibration.mjs";
import {
  loadAllCandidateCampaignRegistry,
} from "../src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs";
import {
  createCompactCoverageProtocol,
} from "../src/prescribed-path-analysis/CompactMonteCarloCampaign.mjs";

const SWEEP =
  ".local-data/braid-analysis/compact-monte-carlo/configuration-sweep-v2";
const RECEIPT =
  `${SWEEP}/final-sweep-analyzer-receipt.v2.json`;

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

test("v2 exact-configuration calibration remains fail-closed until its receipt and packet are instantiated", () => {
  assert.equal(RECEIPT_INSTANTIATION_STATUS, "uninstantiated");
  assert.equal(RECEIPT_SHA256, null);
  assert.match(RECEIPT_UNINSTANTIATED_REASON, /no terminal v2/u);
  assert.throws(
    () => verifyReceiptAndPacket({
      packetPath: null,
      sweepInput: SWEEP,
      receiptPath: RECEIPT,
    }),
    /facts-first v2 calibration is uninstantiated/u,
  );
});

test("the sealed v1 priority packet cannot be rebound as current v2 evidence", () => {
  assert.throws(
    () => assertProtocolPacketContract("sealed v1 packet"),
    /facts-first v2 calibration is uninstantiated/u,
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
  assert.deepEqual(
    [...TARGET_CONFIGURATIONS].sort((left, right) =>
      left.sourceSlug.localeCompare(right.sourceSlug)),
    loaded.candidates
      .filter((candidate) => TARGET_CONFIGURATIONS.some(
        (target) => target.sourceSlug === candidate.declaration.sourceSlug,
      ))
      .map((candidate) => ({
        sourceSlug: candidate.declaration.sourceSlug,
        assemblyId: candidate.declaration.assemblyId,
        modelRevisionSha256: candidate.declaration.modelRevisionSha256,
      }))
      .sort((left, right) => left.sourceSlug.localeCompare(right.sourceSlug)),
  );
});

test("target selection binds factual source slugs to their exact reference identities", () => {
  for (const target of TARGET_CONFIGURATIONS) {
    assert.deepEqual(
      validateTargetConfigurationIdentity({
        sourceSlug: target.sourceSlug,
        referenceConfigurationIdentity: {
          assemblyId: target.assemblyId,
          modelRevisionSha256: target.modelRevisionSha256,
        },
      }),
      target,
    );
    assert.throws(
      () => validateTargetConfigurationIdentity({
        sourceSlug: target.sourceSlug,
        referenceConfigurationIdentity: {
          assemblyId: `asm-${"0".repeat(32)}`,
          modelRevisionSha256: "0".repeat(64),
        },
      }),
      /reference exact identity drifted/u,
    );
  }
  assert.equal(validateTargetConfigurationIdentity({
    sourceSlug: "three-axis-circular-coincident-midpoints",
  }), null);
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
