import {
  COMPACT_MONTE_CARLO_CAMPAIGN_SCHEMA,
  COMPACT_MONTE_CARLO_CASE_SCHEMA,
  compactSha256Canonical,
} from "../../src/prescribed-path-analysis/database/CompactAnalyticalCampaignDatabase.mjs";

function caseRow({
  campaignProtocolHash,
  implementationIdentity,
  caseId,
  assemblyId,
  modelRevisionSha256,
  sourceSlug,
  sampleOrdinal,
  evaluated,
  passed,
  executionIndex,
}) {
  const sampledSpec = {
    schema: "test/compact-sampled-spec.v1",
    caseId,
    coordinate: sampleOrdinal + 0.25,
  };
  const score = evaluated
    ? {
        outerRadius: 1,
        exposures: { total: sampleOrdinal + 0.5 },
        wakeFlux: { total: -0 },
        gates: {
          evaluated: {
            convergence: passed,
            rootCompleteness: passed,
          },
          skipped: {
            transmitterSensitivity: "not evaluated in compact test fixture",
          },
        },
        status: {
          code: passed
            ? "compact-coverage-gates-passed"
            : "compact-coverage-gate-failed",
          passed,
          disposition: "diagnostic-only",
          failedGates: passed ? [] : ["convergence"],
        },
      }
    : null;
  const evaluationStatus = evaluated
    ? {
        code: "evaluated",
        evaluated: true,
        stage: "complete",
        reasonCode: null,
        errorName: null,
        message: null,
        details: null,
      }
    : {
        code: "drawn-not-evaluated",
        evaluated: false,
        stage: "analytical-evaluation",
        reasonCode: "event-convergence-gate-failed",
        errorName: "Error",
        message: "synthetic compact fixture rejected this draw",
        details: {
          gateId: "event-convergence",
        },
      };
  const identity = {
    schema: COMPACT_MONTE_CARLO_CASE_SCHEMA,
    caseId,
    assemblyId,
    modelRevisionSha256,
    sourceSlug,
    candidateId: `candidate-${sourceSlug}`,
    sampleOrdinal,
    sampling: {
      samplerId: "test/sha256-counter-v1",
      seed: "compact-storage-test-seed",
      coordinates: {
        coordinate: sampleOrdinal + 0.25,
      },
      disposition: "deterministic test fixture",
    },
    exactRerunInstruction: {
      sampledSpec,
      sampledSpecHash: compactSha256Canonical(sampledSpec),
      exactSourceHash: compactSha256Canonical({
        schema: "test/exact-source.v1",
        sampledSpec,
      }),
      protocolHash: campaignProtocolHash,
      implementationIdentity,
      evidenceMode: "compact",
      includeSensitivity: false,
    },
    sourceSpeed: {
      maximumCarrierSpeed: 0.5,
      fieldSpeed: 1,
      belowFieldSpeed: true,
      disposition: "diagnostic fixture value",
    },
    evaluationStatus,
    score,
    scoreHash: score === null ? null : compactSha256Canonical(score),
    verificationReceipt: {
      schema: "test/compact-verification-receipt.v1",
      check: "serialized-row-hash-bound",
      passed: true,
    },
    evidenceDisposition:
      "diagnostic-only; no raw event packets or raw causal-root ledgers",
    pathEvolutionInvoked: false,
    eomSolverInvoked: false,
  };
  return {
    ...identity,
    measuredCost: {
      wallSeconds: sampleOrdinal + 0.125,
      sourceAndProtocolSetupSeconds: 0.01,
      analyticalEvaluationSeconds: sampleOrdinal + 0.1,
      scoreAndIdentitySeconds: 0.015,
      userCpuSeconds: sampleOrdinal + 0.11,
      systemCpuSeconds: 0.01,
      processLifetimeMaximumRssKilobytes: 128_000,
      retainedCaseBytes: 2_048 + sampleOrdinal,
    },
    caseHash: compactSha256Canonical(identity),
    executionIndex,
  };
}

export function buildTestCompactMonteCarloCampaign() {
  const protocol = {
    schema: "test/compact-protocol.v1",
    eventEvaluator: {
      fieldSpeed: 1,
    },
  };
  const protocolHash = compactSha256Canonical(protocol);
  const implementationIdentity = {
    runtime: process.version,
    platform: `${process.platform}/${process.arch}`,
    files: [
      {
        path: "test/compact-fixture.mjs",
        sha256: compactSha256Canonical("compact-fixture-source"),
      },
    ],
    implementationHash: compactSha256Canonical(
      "compact-fixture-implementation",
    ),
  };
  const caseRows = [
    caseRow({
      campaignProtocolHash: protocolHash,
      implementationIdentity,
      caseId: "candidate-coincident-midpoint-common-frequency/sample-0",
      assemblyId: "asm-2a289a6fe32f64922ab71bae973acc80",
      modelRevisionSha256:
        "2a289a6fe32f64922ab71bae973acc80bef8ebc2369329a26822f3f0d7f159d6",
      sourceSlug: "three-axis-circular-coincident-midpoints-common-frequency",
      sampleOrdinal: 0,
      evaluated: true,
      passed: true,
      executionIndex: 1,
    }),
    caseRow({
      campaignProtocolHash: protocolHash,
      implementationIdentity,
      caseId: "candidate-axial-transverse-three-binary-interior/sample-1",
      assemblyId: "asm-3e9d646d95041634d7ee5fe7eed862d6",
      modelRevisionSha256:
        "3e9d646d95041634d7ee5fe7eed862d679c8f9f93518ebca7c98f549d352ec8f",
      sourceSlug: "axial-transverse-three-binary-interior",
      sampleOrdinal: 1,
      evaluated: false,
      passed: null,
      executionIndex: 0,
    }),
    caseRow({
      campaignProtocolHash: protocolHash,
      implementationIdentity,
      caseId: "candidate-coaxial-two-planar-braid-co-rotating/sample-2",
      assemblyId: "asm-ebc963eea7e9104f8f826e86dd4287bc",
      modelRevisionSha256:
        "ebc963eea7e9104f8f826e86dd4287bce8818c853a7c3315deafce7729c10807",
      sourceSlug: "coaxial-separated-two-planar-braid-co-rotating",
      sampleOrdinal: 2,
      evaluated: true,
      passed: false,
      executionIndex: 2,
    }),
  ];
  const identity = {
    schema: COMPACT_MONTE_CARLO_CAMPAIGN_SCHEMA,
    campaignId: "compact-monte-carlo-test-campaign",
    claimGrade: "measured",
    claimBoundary: {
      diagnosticOnly: true,
      independentAcceptancePerformed: false,
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
      excludedClaims: [
        "stability",
        "energy",
        "retention",
        "physical-realization",
        "catalog-acceptance",
      ],
    },
    sampling: {
      samplerId: "test/sha256-counter-v1",
      seed: "compact-storage-test-seed",
      casesPerConfiguration: 1,
      configurationCount: 3,
      executionOrder: "seeded test order",
      domainDisposition: "test fixture",
    },
    protocol,
    protocolHash,
    implementationIdentity,
    caseCount: caseRows.length,
    evaluationSummary: {
      drawnCount: caseRows.length,
      evaluatedCount: 2,
      notEvaluatedCount: 1,
      notEvaluatedByReason: {
        "event-convergence-gate-failed": 1,
      },
    },
    cases: caseRows.map((row) => ({
      caseId: row.caseId,
      caseHash: row.caseHash,
      scoreHash: row.scoreHash,
      executionIndex: row.executionIndex,
    })),
  };
  return {
    ...identity,
    wallSeconds: 3.5,
    caseRows,
    campaignHash: compactSha256Canonical(identity),
  };
}
