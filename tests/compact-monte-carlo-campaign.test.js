import assert from "node:assert/strict";
import test from "node:test";

import {
  buildCompactMonteCarloCampaign,
  calibrateCompactCoverageAgainstFullResolution,
  COMPACT_MONTE_CARLO_CAMPAIGN_SCHEMA,
  COMPACT_MONTE_CARLO_CASE_SCHEMA,
  FULL_TAXONOMY_SAMPLER_ID,
  sampleFullConstraintPreservingTaxonomy,
  sampleLocalReferenceNeighborhood,
} from "../src/prescribed-path-analysis/CompactMonteCarloCampaign.mjs";
import {
  loadAllCandidateCampaignRegistry,
} from "../src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs";
import {
  validateB1CompleteCycleProbeProtocol,
} from "../src/prescribed-path-analysis/B1CompleteCycleProbeProtocol.mjs";
import {
  sha256Canonical,
} from "../src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs";

function tinyProtocol(rawProtocol) {
  const protocol = structuredClone(rawProtocol);
  protocol.protocolId = `${protocol.protocolId}-compact-test`;
  protocol.completeCycle.primary = {
    timeSamples: 4,
    polarOrder: 2,
    azimuthCount: 6,
  };
  protocol.completeCycle.refined = {
    timeSamples: 6,
    polarOrder: 3,
    azimuthCount: 8,
  };
  protocol.angularReduction.maximumDegree = 1;
  protocol.spectralReduction.maximumHarmonic = 1;
  return validateB1CompleteCycleProbeProtocol(protocol);
}

test("local Monte Carlo sampling is deterministic and preserves member relations", () => {
  const loaded = loadAllCandidateCampaignRegistry();
  assert.equal(loaded.protocol.eventEvaluator.fieldSpeed, 1);
  const a12 = loaded.candidates.find(
    (candidate) => candidate.declaration.memberId === "A1.2",
  );
  const first = sampleLocalReferenceNeighborhood({
    candidate: a12,
    seed: "deterministic-sampler-test",
    sampleOrdinal: 0,
  });
  const second = sampleLocalReferenceNeighborhood({
    candidate: a12,
    seed: "deterministic-sampler-test",
    sampleOrdinal: 0,
  });

  assert.equal(sha256Canonical(first), sha256Canonical(second));
  assert.deepEqual(
    first.spec.braids[0].binaries.map((binary) => binary.radius),
    Array(3).fill(first.spec.braids[0].binaries[0].radius),
  );
  assert.deepEqual(
    first.spec.braids[0].binaries.map((binary) => binary.frequency),
    Array(3).fill(0.25),
  );
  assert.deepEqual(
    first.spec.braids[0].binaries.map((binary) => binary.phase),
    a12.spec.braids[0].binaries.map((binary) => binary.phase),
  );
  assert.equal(first.spec.group.velocity.every((value) => value === 0), true);
});

test("full taxonomy sampler preserves every declared member constraint", () => {
  const loaded = loadAllCandidateCampaignRegistry();
  assert.equal(loaded.candidates.length, 21);
  for (const candidate of loaded.candidates) {
    for (let sampleOrdinal = 0; sampleOrdinal < 4; sampleOrdinal += 1) {
      const sampled = sampleFullConstraintPreservingTaxonomy({
        candidate,
        seed: "full-taxonomy-constraint-audit",
        sampleOrdinal,
      });
      assert.equal(sampled.samplerId, FULL_TAXONOMY_SAMPLER_ID);
      assert.equal(sampled.spec.specId, candidate.spec.specId);
      assert.equal(sampled.spec.group.velocity.some(
        (value) => Math.abs(value) > 0,
      ), true);
      assert.equal(
        sampled.coordinates.frequencies.length,
        sampled.spec.braids.length * 3,
      );
      assert.equal(
        sampled.coordinates.axialFractions.length,
        sampled.spec.braids.length * 3,
      );
    }
  }

  const byMember = (memberId) => loaded.candidates.find(
    (candidate) => candidate.declaration.memberId === memberId,
  );
  const a12 = sampleFullConstraintPreservingTaxonomy({
    candidate: byMember("A1.2"),
    seed: "full-taxonomy-relations",
    sampleOrdinal: 0,
  }).spec;
  assert.equal(
    new Set(a12.braids[0].binaries.map((binary) => binary.radius)).size,
    1,
  );
  const a13 = sampleFullConstraintPreservingTaxonomy({
    candidate: byMember("A1.3"),
    seed: "full-taxonomy-relations",
    sampleOrdinal: 0,
  }).spec;
  assert.deepEqual(
    a13.braids[0].binaries.map((binary) =>
      binary.frequency / a13.braids[0].binaries[2].frequency),
    [4, 2, 1],
  );
  const b12 = sampleFullConstraintPreservingTaxonomy({
    candidate: byMember("B1.2"),
    seed: "full-taxonomy-relations",
    sampleOrdinal: 0,
  }).spec;
  assert.equal(b12.braids[0].binaries.every((binary) =>
    binary.axialHalfSeparation > binary.transverseOrbitRadius), true);
  const c2 = sampleFullConstraintPreservingTaxonomy({
    candidate: byMember("C2"),
    seed: "full-taxonomy-relations",
    sampleOrdinal: 0,
  }).spec;
  assert.equal(
    c2.braids[0].circulationSense,
    -c2.braids[1].circulationSense,
  );
});

test("compact Monte Carlo campaign retains exact rerun rows and no raw packets", () => {
  const loaded = loadAllCandidateCampaignRegistry();
  const a12 = loaded.candidates.find(
    (candidate) => candidate.declaration.memberId === "A1.2",
  );
  const campaign = buildCompactMonteCarloCampaign({
    candidates: [a12],
    protocol: tinyProtocol(loaded.protocol),
    seed: "compact-campaign-test",
    casesPerMember: 1,
    implementationIdentity: {
      implementationHash: "test-implementation",
    },
  });

  assert.equal(campaign.schema, COMPACT_MONTE_CARLO_CAMPAIGN_SCHEMA);
  assert.equal(campaign.caseCount, 1);
  assert.equal(campaign.caseRows[0].schema, COMPACT_MONTE_CARLO_CASE_SCHEMA);
  assert.equal(campaign.caseRows[0].exactRerunInstruction.evidenceMode, "compact");
  assert.equal(campaign.caseRows[0].sourceSpeed.fieldSpeed, 1);
  assert.equal(campaign.caseRows[0].sourceSpeed.belowFieldSpeed, true);
  assert.equal(campaign.caseRows[0].evaluationStatus.code, "evaluated");
  assert.equal(
    campaign.caseRows[0].score.gates.skipped.transmitterSensitivity,
    "not evaluated in the compact coverage lane",
  );
  assert.equal(
    Object.hasOwn(
      campaign.caseRows[0].score.gates.evaluated,
      "transmitterSensitivity",
    ),
    false,
  );
  assert.equal(campaign.caseRows[0].pathEvolutionInvoked, false);
  assert.equal(campaign.caseRows[0].eomSolverInvoked, false);
  assert.equal(
    campaign.caseRows[0].measuredCost.analyticalEvaluationSeconds > 0,
    true,
  );
  assert.equal(campaign.caseRows[0].measuredCost.retainedCaseBytes > 0, true);
  assert.match(campaign.caseRows[0].evidenceDisposition, /diagnostic-only/);
  assert.equal(
    JSON.stringify(campaign).includes("\"rawLedgers\""),
    false,
  );
  assert.equal(
    campaign.cases[0].caseHash,
    campaign.caseRows[0].caseHash,
  );
});

test("compact campaign retains a drawn point when analytical evaluation balks", () => {
  const loaded = loadAllCandidateCampaignRegistry();
  const a12 = loaded.candidates.find(
    (candidate) => candidate.declaration.memberId === "A1.2",
  );
  const reason = new Error("possible causal fold was not isolated");
  reason.name = "CausalRootEnumerationError";
  reason.code = "causal_root_enumeration_incomplete";
  reason.details = {
    transmitterId: "A1.2-binary-1-a",
    unresolvedIntervals: [{ reason: "possible-root-or-fold-not-isolated" }],
  };
  const campaign = buildCompactMonteCarloCampaign({
    candidates: [a12],
    protocol: tinyProtocol(loaded.protocol),
    seed: "compact-campaign-balk-test",
    casesPerMember: 1,
    evaluateCandidate() {
      throw reason;
    },
  });

  assert.equal(campaign.caseCount, 1);
  assert.deepEqual(campaign.evaluationSummary, {
    drawnCount: 1,
    evaluatedCount: 0,
    notEvaluatedCount: 1,
    notEvaluatedByReason: {
      causal_root_enumeration_incomplete: 1,
    },
  });
  const [row] = campaign.caseRows;
  assert.equal(row.evaluationStatus.code, "drawn-not-evaluated");
  assert.equal(row.evaluationStatus.evaluated, false);
  assert.equal(
    row.evaluationStatus.reasonCode,
    "causal_root_enumeration_incomplete",
  );
  assert.equal(row.score, null);
  assert.equal(row.scoreHash, null);
  assert.match(row.exactRerunInstruction.sampledSpecHash, /^[0-9a-f]{64}$/);
  assert.equal(
    row.evaluationStatus.details.unresolvedIntervals[0].reason,
    "possible-root-or-fold-not-isolated",
  );
  assert.equal(campaign.cases[0].scoreHash, null);
});

test("resolution calibration identifies coverage false negatives on identical draws", () => {
  const loaded = loadAllCandidateCampaignRegistry();
  const a12 = loaded.candidates.find(
    (candidate) => candidate.declaration.memberId === "A1.2",
  );
  function calibrationPacket({ completeCycleProtocol }) {
    const coverage =
      completeCycleProtocol.completeCycle.primary.timeSamples === 12;
    return {
      diagnosticReductions: {
        surface: {
          surface: {
            primary: [{
              radius: 2,
              exposures: [],
              wakeFlux: {},
            }],
          },
        },
      },
      convergenceComparisons: {
        surface: {
          quadrature: {
            passed: !coverage,
            maximumChange: coverage ? 2 : 0,
            gates: {},
          },
        },
      },
      gates: {
        quadratureConvergence: !coverage,
        transmitterSensitivity: false,
      },
    };
  }
  const calibration = calibrateCompactCoverageAgainstFullResolution({
    candidates: [a12],
    protocol: loaded.protocol,
    seed: "resolution-calibration-test",
    casesPerMember: 1,
    evaluateCandidate: calibrationPacket,
  });

  assert.equal(calibration.summary.drawnCaseCount, 1);
  assert.equal(calibration.summary.conclusiveComparisonCount, 1);
  assert.equal(calibration.summary.falseNegativeCount, 1);
  assert.equal(calibration.summary.observedFalseNegativeRate, 1);
  assert.equal(
    calibration.comparisons[0].classification,
    "coverage-false-negative",
  );
  assert.equal(
    calibration.comparisons[0].sampledSpecHash,
    calibration.fullResolutionCampaign.caseRows[0]
      .exactRerunInstruction.sampledSpecHash,
  );
});
