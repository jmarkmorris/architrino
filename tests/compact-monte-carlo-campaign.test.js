import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import {
  buildCompactMonteCarloCampaign,
  calibrateCompactCoverageAgainstFullResolution,
  COMPACT_MONTE_CARLO_CAMPAIGN_SCHEMA,
  COMPACT_MONTE_CARLO_CASE_SCHEMA,
  FULL_EXACT_CONFIGURATION_SAMPLER_ID,
  sampleFullConstraintPreservingConfiguration,
  sampleLocalReferenceNeighborhood,
} from "../src/prescribed-path-analysis/CompactMonteCarloCampaign.mjs";
import {
  validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol,
} from "../src/prescribed-path-analysis/CoincidentAxisThreeBinaryCompleteCycleProbeProtocol.mjs";
import {
  sha256Canonical,
} from "../src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs";
import {
  projectCircularRelationshipParameters,
} from "../src/prescribed-geometry/PrescribedCircularRelationshipParameters.mjs";
import {
  deriveAssemblyScientificIdentity,
} from "../src/prescribed-geometry/AssemblyScientificIdentity.mjs";
import {
  createPrescribedBraidExactSourceRecord,
} from "../scripts/eom/generate-prescribed-braid-record.mjs";
import {
  validateCompleteCycleSourceApplicability,
} from "../src/prescribed-path-analysis/CoincidentAxisThreeBinaryStreamingReductions.mjs";

function loadSamplerFixture() {
  const registry = JSON.parse(fs.readFileSync(
    new URL(
      "../src/prescribed-path-analysis/campaigns/all-candidate-analytical-campaign.registry.v2.json",
      import.meta.url,
    ),
    "utf8",
  ));
  const candidates = registry.candidates.map((declaration) => ({
    declaration,
    spec: JSON.parse(fs.readFileSync(declaration.specPath, "utf8")),
  }));
  const protocol = validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol(JSON.parse(
    fs.readFileSync(registry.generatedCampaign.protocolPath, "utf8"),
  ));
  return { candidates, protocol };
}

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
  return validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol(protocol);
}

test("local Monte Carlo sampling is deterministic and preserves configuration relations", () => {
  const loaded = loadSamplerFixture();
  assert.equal(loaded.protocol.eventEvaluator.fieldSpeed, 1);
  const equalRadiusCommonFrequency = loaded.candidates.find(
    (candidate) => candidate.declaration.sourceSlug ===
      "three-axis-circular-coincident-midpoints-equal-radius-common-frequency",
  );
  const first = sampleLocalReferenceNeighborhood({
    candidate: equalRadiusCommonFrequency,
    seed: "deterministic-sampler-test",
    sampleOrdinal: 0,
  });
  const second = sampleLocalReferenceNeighborhood({
    candidate: equalRadiusCommonFrequency,
    seed: "deterministic-sampler-test",
    sampleOrdinal: 0,
  });

  assert.equal(sha256Canonical(first), sha256Canonical(second));
  const firstParameters = projectCircularRelationshipParameters(first.spec);
  const sourceParameters = projectCircularRelationshipParameters(equalRadiusCommonFrequency.spec);
  const firstPairs = firstParameters.components[0].pairs;
  assert.equal(firstPairs.every((pair) =>
    Math.abs(pair.radius - firstPairs[0].radius) <=
      Number.EPSILON * Math.max(1, pair.radius, firstPairs[0].radius)), true);
  assert.deepEqual(
    firstPairs.map((pair) => pair.frequency),
    Array(3).fill(0.25),
  );
  firstPairs.forEach((pair, index) => {
    assert.ok(Math.abs(
      pair.phase - sourceParameters.components[0].pairs[index].phase,
    ) <= Number.EPSILON * 2);
  });
  assert.equal(firstParameters.assemblyPlacement.velocity.every((value) => value === 0), true);
});

test("full exact-configuration sampler preserves every declared constraint", () => {
  const loaded = loadSamplerFixture();
  assert.equal(loaded.candidates.length, 20);
  for (const candidate of loaded.candidates) {
    for (let sampleOrdinal = 0; sampleOrdinal < 4; sampleOrdinal += 1) {
      const sampled = sampleFullConstraintPreservingConfiguration({
        candidate,
        seed: "full-exact-configuration-constraint-audit",
        sampleOrdinal,
      });
      assert.equal(sampled.samplerId, FULL_EXACT_CONFIGURATION_SAMPLER_ID);
      assert.equal(sampled.spec.specId, candidate.spec.specId);
      const parameters = projectCircularRelationshipParameters(sampled.spec);
      assert.equal(parameters.assemblyPlacement.velocity.some(
        (value) => Math.abs(value) > 0,
      ), true);
      assert.equal(
        sampled.coordinates.frequencies.length,
        parameters.components.length * 3,
      );
      assert.equal(
        sampled.coordinates.axialFractions.length,
        parameters.components.length * 3,
      );
    }
  }

  const bySourceSlug = (sourceSlug) => loaded.candidates.find(
    (candidate) => candidate.declaration.sourceSlug === sourceSlug,
  );
  const equalRadius = projectCircularRelationshipParameters(sampleFullConstraintPreservingConfiguration({
    candidate: bySourceSlug("three-axis-circular-coincident-midpoints-equal-radius-common-frequency"),
    seed: "full-exact-configuration-relations",
    sampleOrdinal: 0,
  }).spec);
  assert.equal(
    new Set(equalRadius.components[0].pairs.map((pair) => pair.radius)).size,
    1,
  );
  const fourTwoOne = projectCircularRelationshipParameters(sampleFullConstraintPreservingConfiguration({
    candidate: bySourceSlug("three-axis-circular-coincident-midpoints-4-2-1-frequency"),
    seed: "full-exact-configuration-relations",
    sampleOrdinal: 0,
  }).spec);
  assert.deepEqual(
    fourTwoOne.components[0].pairs.map((pair) =>
      pair.frequency / fourTwoOne.components[0].pairs[2].frequency),
    [4, 2, 1],
  );
  const highAxial = projectCircularRelationshipParameters(sampleFullConstraintPreservingConfiguration({
    candidate: bySourceSlug("high-axial-three-binary-interior"),
    seed: "full-exact-configuration-relations",
    sampleOrdinal: 0,
  }).spec);
  assert.equal(highAxial.components[0].pairs.every((pair) =>
    pair.axialHalfSeparation > pair.transverseOrbitRadius), true);
  const counterRotating = projectCircularRelationshipParameters(sampleFullConstraintPreservingConfiguration({
    candidate: bySourceSlug("coincident-center-two-component-circular-counter-rotating"),
    seed: "full-exact-configuration-relations",
    sampleOrdinal: 0,
  }).spec);
  assert.equal(
    counterRotating.components[0].circulationSense,
    -counterRotating.components[1].circulationSense,
  );
});

test("exact-configuration cohort applicability fails closed on slug, identity, and preimage drift", () => {
  const loaded = loadSamplerFixture();
  const candidate = loaded.candidates.find((row) =>
    row.declaration.sourceSlug ===
      "three-axis-circular-coincident-midpoints-equal-radius-common-frequency");
  const sampled = sampleFullConstraintPreservingConfiguration({
    candidate,
    seed: "exact-applicability-contract",
    sampleOrdinal: 0,
  });
  const derived = deriveAssemblyScientificIdentity(sampled.spec);
  const source = {
    ...createPrescribedBraidExactSourceRecord(sampled.spec),
    sourceSlug: candidate.declaration.sourceSlug,
    referenceConfigurationIdentity: {
      assemblyId: candidate.declaration.assemblyId,
      modelRevisionSha256: candidate.declaration.modelRevisionSha256,
    },
    scientificIdentityPreimage: derived.canonicalModel,
  };
  assert.doesNotThrow(() =>
    validateCompleteCycleSourceApplicability(source, loaded.protocol));
  assert.throws(
    () => validateCompleteCycleSourceApplicability(
      { ...source, sourceSlug: "unknown-configuration" },
      loaded.protocol,
    ),
    /unlisted exact configuration preimage/,
  );
  assert.throws(
    () => validateCompleteCycleSourceApplicability(
      { ...source, modelRevisionSha256: "0".repeat(64) },
      loaded.protocol,
    ),
    /does not match its scientific preimage/,
  );
  assert.throws(
    () => validateCompleteCycleSourceApplicability(
      {
        ...source,
        referenceConfigurationIdentity: {
          assemblyId: loaded.candidates[0].declaration.assemblyId,
          modelRevisionSha256:
            loaded.candidates[0].declaration.modelRevisionSha256,
        },
      },
      loaded.protocol,
    ),
    /unlisted exact configuration preimage/,
  );
});

test("compact Monte Carlo campaign retains exact rerun rows and no raw packets", () => {
  const loaded = loadSamplerFixture();
  const configuration = loaded.candidates.find(
    (candidate) => candidate.declaration.sourceSlug ===
      "three-axis-circular-coincident-midpoints-equal-radius-common-frequency",
  );
  const campaign = buildCompactMonteCarloCampaign({
    candidates: [configuration],
    protocol: tinyProtocol(loaded.protocol),
    seed: "compact-campaign-test",
    casesPerConfiguration: 1,
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
  const loaded = loadSamplerFixture();
  const configuration = loaded.candidates.find(
    (candidate) => candidate.declaration.sourceSlug ===
      "three-axis-circular-coincident-midpoints-equal-radius-common-frequency",
  );
  const reason = new Error("possible causal fold was not isolated");
  reason.name = "CausalRootEnumerationError";
  reason.code = "causal_root_enumeration_incomplete";
  reason.details = {
    transmitterId: "coincident-midpoint-common-frequency-binary-1-a",
    unresolvedIntervals: [{ reason: "possible-root-or-fold-not-isolated" }],
  };
  const campaign = buildCompactMonteCarloCampaign({
    candidates: [configuration],
    protocol: tinyProtocol(loaded.protocol),
    seed: "compact-campaign-balk-test",
    casesPerConfiguration: 1,
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
  const loaded = loadSamplerFixture();
  const configuration = loaded.candidates.find(
    (candidate) => candidate.declaration.sourceSlug ===
      "three-axis-circular-coincident-midpoints-equal-radius-common-frequency",
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
    candidates: [configuration],
    protocol: loaded.protocol,
    seed: "resolution-calibration-test",
    casesPerConfiguration: 1,
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
