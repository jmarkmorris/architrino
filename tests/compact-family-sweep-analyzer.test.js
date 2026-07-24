import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

import {
  analyzeCompactFamilySweep,
  sha256Canonical,
} from "../scripts/eom/analyze-compact-family-sweep.mjs";

const CAMPAIGN_SCHEMA =
  "prescribed-path-analysis/compact-monte-carlo-campaign.v1";
const CASE_SCHEMA =
  "prescribed-path-analysis/compact-monte-carlo-case.v1";

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
  memberId,
  sampleOrdinal,
  value,
  seed,
  protocolHash,
  implementationIdentity,
  evaluated = true,
  sourceBelowFieldSpeed = true,
}) {
  const retainedScore = evaluated ? score(value) : null;
  const sampledSpec = { memberId, sampleOrdinal, seed };
  const identity = {
    schema: CASE_SCHEMA,
    caseId: `candidate-${memberId}/sample-${sampleOrdinal}`,
    familyId: memberId[0],
    memberId,
    candidateId: `candidate-${memberId}`,
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
  memberId,
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
    memberId,
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
    campaignId: `campaign-${seed}-${memberId}`,
    claimGrade: "measured",
    claimBoundary,
    sampling: {
      samplerId,
      seed,
      casesPerMember: values.length,
      memberCount: 1,
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
    campaign({ seed: "pilot", memberId: "A1", values: [1] }),
  );
  writeShard(
    directory,
    "pilot-shard-02.json",
    campaign({ seed: "pilot", memberId: "B1.1", values: [2] }),
  );
  writeShard(
    directory,
    "wave-01-shard-01.json",
    campaign({ seed: "wave-01", memberId: "A1", values: [3] }),
  );
  writeShard(
    directory,
    "wave-02-shard-01.json",
    campaign({ seed: "wave-02", memberId: "B1.1", values: [4] }),
  );
  writeShard(
    directory,
    "wave-03-member-A1.json",
    campaign({ seed: "wave-03", memberId: "A1", values: [5] }),
  );
  writeShard(
    directory,
    "wave-03-member-B1-1.json",
    campaign({ seed: "wave-03", memberId: "B1.1", values: [6] }),
  );
  if (includeWave4) {
    writeShard(
      directory,
      "wave-04-shard-01.json",
      campaign({ seed: "wave-04", memberId: "A1", values: [7] }),
    );
  }
  if (includeLaterWave) {
    writeFileSync(
      path.join(directory, "wave-05-shard-01.json"),
      "{\"partial-later-wave\":",
    );
    writeFileSync(
      path.join(directory, "wave-05-member-A1.json"),
      "{\"partial-later-member\":",
    );
  }
}

const mixedLayoutOptions = {
  throughWave: 4,
  expectedPilotShardCount: 2,
  expectedWaveShardCount: 1,
  expectedWave3MemberCount: 2,
};

test("analyzer retains null-score rows but excludes them from every ranking", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "compact-analyzer-"));
  writeShard(
    directory,
    "pilot-shard-01.json",
    campaign({
      seed: "pilot",
      memberId: "A1",
      values: [1, 2],
      evaluated: [true, false],
    }),
  );

  const result = analyzeCompactFamilySweep({
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

test("deprecated B1.4 rows remain retained but cannot enter comparative rankings", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "compact-analyzer-"));
  writeShard(
    directory,
    "pilot-shard-01.json",
    campaign({ seed: "pilot", memberId: "A1", values: [1] }),
  );
  writeShard(
    directory,
    "pilot-shard-02.json",
    campaign({ seed: "pilot", memberId: "B1.4", values: [0.01] }),
  );

  const result = analyzeCompactFamilySweep({
    inputDirectory: directory,
    auditSampleSize: 2,
  });

  assert.equal(result.drawCounts.actual, 2);
  assert.equal(
    result.perMemberCounts.some((row) => row.memberId === "B1.4"),
    true,
  );
  assert.deepEqual(result.metricLeaders.exclusions, [{
    memberId: "B1.4",
    reason: "deprecated-axial-limit-null-control",
  }]);
  assert.equal(
    result.metricLeaders.metrics.every((metric) =>
      metric.rankedEvaluatedRowCount === 1 &&
      metric.topFive.every((row) => row.memberId === "A1")),
    true,
  );
  assert.equal(
    result.fullAdjudicationQueue.nearBoundaryRows.some(
      (row) => row.memberId === "B1.4",
    ),
    false,
  );
});

test("receipt preserves distinct campaign hashes and is deterministic", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "compact-analyzer-"));
  writeShard(
    directory,
    "wave-01-shard-01.json",
    campaign({ seed: "wave-01", memberId: "A1", values: [1] }),
  );
  writeShard(
    directory,
    "wave-01-shard-02.json",
    campaign({ seed: "wave-01", memberId: "B1.1", values: [2] }),
  );
  writeFileSync(path.join(directory, "wave-02-shard-01.json"), "{\"schema\":");

  const first = analyzeCompactFamilySweep({ inputDirectory: directory });
  const second = analyzeCompactFamilySweep({ inputDirectory: directory });

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
    memberId: "A1",
    values: [0.95],
    resolution: 12,
  });
  const high = campaign({
    seed: "shared",
    memberId: "A1",
    values: [1.05],
    resolution: 24,
  });
  writeShard(directory, "pilot-shard-01.json", low);
  writeShard(directory, "wave-01-shard-01.json", high);

  const result = analyzeCompactFamilySweep({
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
    campaign({ seed: "pilot", memberId: "A1", values: [1] }),
  );

  const result = analyzeCompactFamilySweep({
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
    campaign({ seed: "pilot", memberId: "A1", values: [1] }),
    campaign({
      seed: "pilot",
      memberId: "A2",
      values: [2],
      implementationToken: "different-implementation",
    }),
    campaign({
      seed: "pilot",
      memberId: "A3",
      values: [3],
      resolution: 24,
    }),
    campaign({
      seed: "pilot",
      memberId: "B1.1",
      values: [4],
      samplerId: "different-sampler",
    }),
    campaign({
      seed: "pilot",
      memberId: "C1",
      values: [5],
      claimBoundary: { diagnosticOnly: true, variant: true },
    }),
    campaign({
      seed: "pilot",
      memberId: "C2",
      values: [6],
      fieldSpeed: 2,
    }),
  ];
  campaigns.forEach((value, index) => writeShard(
    directory,
    `pilot-shard-${String(index + 1).padStart(2, "0")}.json`,
    value,
  ));

  const result = analyzeCompactFamilySweep({
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

test("mixed Wave 3 member and Wave 4 shard layouts form a terminal receipt", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "compact-analyzer-"));
  writeMixedLayoutBoundary(directory, { includeLaterWave: true });

  const result = analyzeCompactFamilySweep({
    inputDirectory: directory,
    ...mixedLayoutOptions,
  });

  assert.equal(result.status, "terminal-for-declared-boundary");
  assert.equal(result.terminalBoundary.terminal, true);
  assert.equal(result.terminalBoundary.validInBoundaryCampaignFileCount, 7);
  assert.deepEqual(
    result.terminalBoundary.laterThanBoundaryFiles.map((row) => row.file),
    ["wave-05-member-A1.json", "wave-05-shard-01.json"],
  );
  assert.equal(result.skippedFiles.length, 0);
  assert.equal(result.campaignAndFileManifest.campaignFiles.length, 7);
  const wave3 = result.waves.find((wave) => wave.waveNumber === 3);
  assert.deepEqual(
    wave3.campaignFiles.map((row) => row.fileKind),
    ["member", "member"],
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
    "../scripts/eom/analyze-compact-family-sweep.mjs",
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
    "--expected-wave-3-members",
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
      memberId: "A1",
      values: [1],
      sourceBelowFieldSpeed: false,
    }),
  );

  const result = analyzeCompactFamilySweep({
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
