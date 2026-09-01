import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

import {
  analyzeCompactAssemblySweep,
  sha256Canonical,
} from "../scripts/eom/analyze-compact-configuration-sweep.mjs";

const CAMPAIGN_SCHEMA =
  "prescribed-path-analysis/compact-monte-carlo-campaign.v2";
const CASE_SCHEMA =
  "prescribed-path-analysis/compact-monte-carlo-case.v2";
const TEST_MODEL_REVISION_SHA256 =
  "0153fdc7276d1a064d8794a423bd775b24140e8dd8353e4afe44695a0e973911";
const TEST_ASSEMBLY_ID = `asm-${TEST_MODEL_REVISION_SHA256.slice(0, 32)}`;
const TEST_SOURCE_SLUG = "three-axis-circular-coincident-midpoints";

function score(value, { passed = true } = {}) {
  return {
    outerRadius: 2,
    exposures: [{
      probePolarity: 1,
      L_ext: value,
      eta_ext: value / 10,
      peakSurfaceAcceleration: { accelerationNorm: value / 2 },
    }],
    wakeFlux: {
      signedCycleIntegral: value / 100,
      etaWakeFlux: value / 20,
      rawEmissionReference: { relativeResidual: value / 1000 },
      signedEmissionReference: {
        relativeOrAbsoluteResidual: value / 2000,
      },
    },
    quadrature: {
      gates: {
        exposure: {
          passed,
          threshold: 0.1,
          maximumChange: value / 10,
          identityMatch: null,
        },
      },
    },
    gates: { evaluated: { surfaceQuadrature: passed }, skipped: {} },
    status: { passed, failedGates: passed ? [] : ["surfaceQuadrature"] },
  };
}

function caseRow({
  sourceSlug,
  sampleOrdinal,
  value,
  seed,
  protocolHash,
  implementationIdentity,
  evaluated = true,
  sourceBelowFieldSpeed = true,
}) {
  const retainedScore = evaluated ? score(value) : null;
  const sampledSpec = { sourceSlug, sampleOrdinal, seed };
  const identity = {
    schema: CASE_SCHEMA,
    caseId: `candidate-${sourceSlug}/sample-${sampleOrdinal}`,
    assemblyId: TEST_ASSEMBLY_ID,
    modelRevisionSha256: TEST_MODEL_REVISION_SHA256,
    sourceSlug,
    candidateId: `candidate-${sourceSlug}`,
    sampleOrdinal,
    sampling: { seed, coordinates: {}, disposition: "test" },
    exactRerunInstruction: {
      sampledSpec,
      sampledSpecHash: sha256Canonical(sampledSpec),
      exactSourceHash: sha256Canonical({ sampledSpec }),
      protocolHash,
      implementationIdentity,
      evidenceMode: "compact",
      includeSensitivity: false,
    },
    sourceSpeed: {
      maximumCarrierSpeed: sourceBelowFieldSpeed ? 0.5 : 1.25,
      fieldSpeed: 1,
      belowFieldSpeed: sourceBelowFieldSpeed,
    },
    evaluationStatus: evaluated
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
          reasonCode: "synthetic-failure",
          errorName: "Error",
          message: "synthetic failure",
          details: null,
        },
    score: retainedScore,
    scoreHash: retainedScore === null ? null : sha256Canonical(retainedScore),
    evidenceDisposition: "diagnostic-only",
    pathEvolutionInvoked: false,
    eomSolverInvoked: false,
  };
  return {
    ...identity,
    measuredCost: {
      wallSeconds: value,
      retainedCaseBytes: 100,
      processLifetimeMaximumRssKilobytes: 1_000,
    },
    caseHash: sha256Canonical(identity),
    executionIndex: sampleOrdinal,
  };
}

function campaign({
  seed,
  sourceSlug,
  values,
  evaluated = values.map(() => true),
  resolution = 12,
  implementationToken = "test-implementation",
  samplerId = "test-sampler",
  claimBoundary = { diagnosticOnly: true },
  fieldSpeed = 1,
  sourceBelowFieldSpeed = true,
}) {
  const protocol = {
    eventEvaluator: { fieldSpeed },
    completeCycle: {
      primary: { timeSamples: resolution },
      refined: { timeSamples: resolution * 2 },
    },
  };
  const protocolHash = sha256Canonical(protocol);
  const implementationIdentity = {
    implementationHash: sha256Canonical(implementationToken),
  };
  const rows = values.map((value, index) => caseRow({
    sourceSlug,
    sampleOrdinal: index,
    value,
    seed,
    protocolHash,
    implementationIdentity,
    evaluated: evaluated[index],
    sourceBelowFieldSpeed,
  }));
  const evaluatedCount = rows.filter(
    (row) => row.evaluationStatus.evaluated,
  ).length;
  const identity = {
    schema: CAMPAIGN_SCHEMA,
    campaignId: `campaign-${seed}-${sourceSlug}`,
    claimGrade: "measured",
    claimBoundary,
    sampling: {
      samplerId,
      seed,
      casesPerConfiguration: values.length,
      configurationCount: 1,
    },
    protocol,
    protocolHash,
    implementationIdentity,
    caseCount: rows.length,
    evaluationSummary: {
      drawnCount: rows.length,
      evaluatedCount,
      notEvaluatedCount: rows.length - evaluatedCount,
    },
    cases: rows.map((row) => ({
      caseId: row.caseId,
      caseHash: row.caseHash,
      scoreHash: row.scoreHash,
      executionIndex: row.executionIndex,
    })),
  };
  return {
    ...identity,
    wallSeconds: values.reduce((sum, value) => sum + value, 0),
    caseRows: rows,
    campaignHash: sha256Canonical(identity),
  };
}

function writeShard(directory, file, value) {
  writeFileSync(
    path.join(directory, file),
    `${JSON.stringify(value, null, 2)}\n`,
  );
}

function writeMixedLayoutBoundary(directory, {
  includeWave4 = true,
  includeLaterWave = false,
} = {}) {
  writeShard(
    directory,
    "pilot-shard-01.json",
    campaign({ seed: "pilot", sourceSlug: TEST_SOURCE_SLUG, values: [1] }),
  );
  writeShard(
    directory,
    "pilot-shard-02.json",
    campaign({ seed: "pilot", sourceSlug: "axial-transverse-three-binary-interior", values: [2] }),
  );
  writeShard(
    directory,
    "wave-01-shard-01.json",
    campaign({ seed: "wave-01", sourceSlug: TEST_SOURCE_SLUG, values: [3] }),
  );
  writeShard(
    directory,
    "wave-02-shard-01.json",
    campaign({ seed: "wave-02", sourceSlug: "axial-transverse-three-binary-interior", values: [4] }),
  );
  writeShard(
    directory,
    `wave-03-configuration-${TEST_SOURCE_SLUG}.json`,
    campaign({ seed: "wave-03", sourceSlug: TEST_SOURCE_SLUG, values: [5] }),
  );
  writeShard(
    directory,
    "wave-03-configuration-axial-transverse-three-binary-interior.json",
    campaign({ seed: "wave-03", sourceSlug: "axial-transverse-three-binary-interior", values: [6] }),
  );
  if (includeWave4) {
    writeShard(
      directory,
      "wave-04-shard-01.json",
      campaign({ seed: "wave-04", sourceSlug: TEST_SOURCE_SLUG, values: [7] }),
    );
  }
  if (includeLaterWave) {
    writeFileSync(
      path.join(directory, "wave-05-shard-01.json"),
      "{\"partial-later-wave\":",
    );
    writeFileSync(
      path.join(directory, `wave-05-configuration-${TEST_SOURCE_SLUG}.json`),
      "{\"partial-later-configuration\":",
    );
  }
}

const mixedLayoutOptions = {
  throughWave: 4,
  expectedPilotShardCount: 2,
  expectedWaveShardCount: 1,
  expectedWave3ConfigurationCount: 2,
};

test("analyzer retains null-score rows but excludes them from every ranking", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "compact-analyzer-"));
  writeShard(
    directory,
    "pilot-shard-01.json",
    campaign({
      seed: "pilot",
      sourceSlug: TEST_SOURCE_SLUG,
      values: [1, 2],
      evaluated: [true, false],
    }),
  );

  const result = analyzeCompactAssemblySweep({
    inputDirectory: directory,
    auditSampleSize: 2,
  });

  assert.deepEqual(result.drawCounts, {
    expected: 2,
    actual: 2,
    evaluated: 1,
    notEvaluated: 1,
    nullScoreRows: 1,
  });
  assert.equal(result.structuredFailureTable[0].count, 1);
  assert.equal(
    result.metricLeaders.metrics.every(
      (metric) => metric.topFive.every(
        (row) => row.evaluationStatus === "evaluated",
      ),
    ),
    true,
  );
  assert.equal(
    result.fullAdjudicationQueue.anomalies.some(
      (row) => row.anomalyType === "drawn-not-evaluated",
    ),
    true,
  );
});

test("deprecated all-axial boundary rows remain retained but cannot enter comparative rankings", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "compact-analyzer-"));
  writeShard(
    directory,
    "pilot-shard-01.json",
    campaign({ seed: "pilot", sourceSlug: TEST_SOURCE_SLUG, values: [1] }),
  );
  writeShard(
    directory,
    "pilot-shard-02.json",
    campaign({ seed: "pilot", sourceSlug: "all-axial-three-binary-boundary", values: [0.01] }),
  );

  const result = analyzeCompactAssemblySweep({
    inputDirectory: directory,
    auditSampleSize: 2,
  });

  assert.equal(result.drawCounts.actual, 2);
  assert.equal(
    result.perConfigurationCounts.some((row) => row.sourceSlug === "all-axial-three-binary-boundary"),
    true,
  );
  assert.deepEqual(result.metricLeaders.exclusions, [{
    sourceSlug: "all-axial-three-binary-boundary",
    reason: "deprecated-axial-limit-null-control",
  }]);
  assert.equal(
    result.metricLeaders.metrics.every((metric) =>
      metric.rankedEvaluatedRowCount === 1 &&
      metric.topFive.every((row) => row.sourceSlug === TEST_SOURCE_SLUG)),
    true,
  );
  assert.equal(
    result.fullAdjudicationQueue.nearBoundaryRows.some(
      (row) => row.sourceSlug === "all-axial-three-binary-boundary",
    ),
    false,
  );
});

test("receipt preserves distinct campaign hashes and is deterministic", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "compact-analyzer-"));
  writeShard(
    directory,
    "wave-01-shard-01.json",
    campaign({ seed: "wave-01", sourceSlug: TEST_SOURCE_SLUG, values: [1] }),
  );
  writeShard(
    directory,
    "wave-01-shard-02.json",
    campaign({ seed: "wave-01", sourceSlug: "axial-transverse-three-binary-interior", values: [2] }),
  );
  writeFileSync(path.join(directory, "wave-02-shard-01.json"), "{\"schema\":");

  const first = analyzeCompactAssemblySweep({ inputDirectory: directory });
  const second = analyzeCompactAssemblySweep({ inputDirectory: directory });

  assert.deepEqual(first, second);
  assert.equal(first.status, "nonterminal");
  assert.equal(first.skippedFiles[0].reason, "unreadable-or-partial-json");
  assert.equal(
    first.campaignAndFileManifest.distinctCampaignHashCount,
    2,
  );
  assert.equal(first.coordinatorReceipt.canonicalMergedCampaignCreated, false);
  assert.match(first.coordinatorReceipt.analysisHash, /^[0-9a-f]{64}$/);
  assert.equal(first.drawCounts.expected, first.drawCounts.actual);
});

test("near-boundary rows and cross-resolution disagreements enter adjudication", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "compact-analyzer-"));
  const low = campaign({
    seed: "shared",
    sourceSlug: TEST_SOURCE_SLUG,
    values: [0.95],
    resolution: 12,
  });
  const high = campaign({
    seed: "shared",
    sourceSlug: TEST_SOURCE_SLUG,
    values: [1.05],
    resolution: 24,
  });
  writeShard(directory, "pilot-shard-01.json", low);
  writeShard(directory, "wave-01-shard-01.json", high);

  const result = analyzeCompactAssemblySweep({
    inputDirectory: directory,
    nearBoundaryRelativeTolerance: 0.1,
  });

  assert.equal(result.fullAdjudicationQueue.nearBoundaryRows.length, 2);
  assert.equal(
    result.fullAdjudicationQueue.crossResolutionDisagreements.length,
    1,
  );
  assert.equal(
    result.fullAdjudicationQueue.uniqueCases.every(
      (row) => row.reasons.length > 0,
    ),
    true,
  );
});

test("declared boundary is nonterminal when an expected shard is missing", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "compact-analyzer-"));
  writeShard(
    directory,
    "pilot-shard-01.json",
    campaign({ seed: "pilot", sourceSlug: TEST_SOURCE_SLUG, values: [1] }),
  );

  const result = analyzeCompactAssemblySweep({
    inputDirectory: directory,
    throughWave: 0,
    expectedPilotShardCount: 2,
    expectedWaveShardCount: 1,
  });

  assert.equal(result.status, "nonterminal");
  assert.equal(result.terminalBoundary.terminal, false);
  const inventory = result.terminalBoundary.defects.find(
    (row) => row.code === "boundary-shard-inventory-mismatch",
  );
  assert.deepEqual(inventory.missingShardNumbers, [2]);
});

test("every frozen identity dimension is terminal-critical", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "compact-analyzer-"));
  const campaigns = [
    campaign({ seed: "pilot", sourceSlug: TEST_SOURCE_SLUG, values: [1] }),
    campaign({
      seed: "pilot",
      sourceSlug: "three-axis-circular-phase-compensated-symmetric",
      values: [2],
      implementationToken: "different-implementation",
    }),
    campaign({
      seed: "pilot",
      sourceSlug: "three-axis-circular-axially-separated",
      values: [3],
      resolution: 24,
    }),
    campaign({
      seed: "pilot",
      sourceSlug: "axial-transverse-three-binary-interior",
      values: [4],
      samplerId: "different-sampler",
    }),
    campaign({
      seed: "pilot",
      sourceSlug: "coincident-center-two-component-circular-co-rotating",
      values: [5],
      claimBoundary: { diagnosticOnly: true, variant: true },
    }),
    campaign({
      seed: "pilot",
      sourceSlug: "coincident-center-two-component-circular-counter-rotating",
      values: [6],
      fieldSpeed: 2,
    }),
  ];
  campaigns.forEach((value, index) => writeShard(
    directory,
    `pilot-shard-${String(index + 1).padStart(2, "0")}.json`,
    value,
  ));

  const result = analyzeCompactAssemblySweep({
    inputDirectory: directory,
    throughWave: 0,
  });
  const mixed = result.terminalBoundary.defects
    .filter((row) => row.code === "mixed-frozen-identity")
    .map((row) => row.identity)
    .sort();

  assert.equal(result.status, "nonterminal");
  assert.deepEqual(mixed, [
    "claim-boundary-hash",
    "field-speed",
    "implementation-hash",
    "protocol-hash",
    "sampler-id",
  ]);
  assert.equal(
    result.terminalBoundary.defects.some(
      (row) => row.code === "field-speed-requirement-not-satisfied",
    ),
    true,
  );
});

test("mixed Wave 3 configuration and Wave 4 shard layouts form a terminal receipt", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "compact-analyzer-"));
  writeMixedLayoutBoundary(directory, { includeLaterWave: true });

  const result = analyzeCompactAssemblySweep({
    inputDirectory: directory,
    ...mixedLayoutOptions,
  });

  assert.equal(result.status, "terminal-for-declared-boundary");
  assert.equal(result.terminalBoundary.terminal, true);
  assert.equal(result.terminalBoundary.validInBoundaryCampaignFileCount, 7);
  assert.deepEqual(
    result.terminalBoundary.laterThanBoundaryFiles.map((row) => row.file),
    [`wave-05-configuration-${TEST_SOURCE_SLUG}.json`, "wave-05-shard-01.json"],
  );
  assert.equal(result.skippedFiles.length, 0);
  assert.equal(result.campaignAndFileManifest.campaignFiles.length, 7);
  const wave3 = result.waves.find((wave) => wave.waveNumber === 3);
  assert.deepEqual(
    wave3.campaignFiles.map((row) => row.fileKind),
    ["configuration", "configuration"],
  );
  const wave4 = result.waves.find((wave) => wave.waveNumber === 4);
  assert.deepEqual(
    wave4.campaignFiles.map((row) => row.fileKind),
    ["shard"],
  );
});

test("Wave 4 incompleteness drives nonzero CLI status", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "compact-analyzer-"));
  writeMixedLayoutBoundary(directory, { includeWave4: false });
  const script = path.resolve(
    import.meta.dirname,
    "../scripts/eom/analyze-compact-configuration-sweep.mjs",
  );
  const run = spawnSync(process.execPath, [
    script,
    "--input",
    directory,
    "--through-wave",
    "4",
    "--expected-pilot-shards",
    "2",
    "--expected-wave-shards",
    "1",
    "--expected-wave-3-configurations",
    "2",
  ], { encoding: "utf8" });

  assert.equal(run.status, 2);
  const receipt = JSON.parse(run.stdout);
  assert.equal(receipt.status, "nonterminal");
  assert.equal(
    receipt.terminalBoundary.defects.some(
      (row) => row.waveId === "wave-04" &&
        row.code === "boundary-shard-inventory-mismatch",
    ),
    true,
  );
});

test("carrier speed at field speed remains a diagnostic, not an exclusion", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "compact-analyzer-"));
  writeShard(
    directory,
    "pilot-shard-01.json",
    campaign({
      seed: "pilot",
      sourceSlug: TEST_SOURCE_SLUG,
      values: [1],
      sourceBelowFieldSpeed: false,
    }),
  );

  const result = analyzeCompactAssemblySweep({
    inputDirectory: directory,
    throughWave: 0,
    expectedPilotShardCount: 1,
    expectedWaveShardCount: 1,
  });
  const diagnostic = result.fullAdjudicationQueue.anomalies.find(
    (row) =>
      row.anomalyType ===
        "carrier-speed-at-or-above-field-speed-diagnostic",
  );

  assert.equal(result.status, "terminal-for-declared-boundary");
  assert.equal(
    diagnostic.rootPolicy,
    "all-retained-roots/event-specific-isolation-certified.v2",
  );
  assert.match(diagnostic.reviewDisposition, /not an exclusion or failed bound/);
});
