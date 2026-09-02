import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  ACTIVE_CANDIDATE_DISPOSITION,
  DEPRECATED_CONTROL_DISPOSITION,
  BRAID_EVIDENCE_INDEX_SCHEMA,
  buildBraidEvidenceIndex,
  buildEvaluationFunnel,
  caseResidualDetail,
  filterCompactSweepCaseRows,
  filterCompactSweepRows,
  pearsonCorrelation,
  quantile,
  summarizeDistribution,
  summarizeGate,
  thresholdRatio,
} from "../src/apps/braid-search/BraidSearchData.js";

function readJson(relativePath) {
  return JSON.parse(readFileSync(new URL(`../${relativePath}`, import.meta.url)));
}

const FIRST_ASSEMBLY_ID = "asm-0153fdc7276d1a064d8794a423bd775b";
const SECOND_ASSEMBLY_ID = "asm-3e9d646d95041634d7ee5fe7eed862d6";
const FIRST_SOURCE_SLUG = "three-axis-circular-coincident-midpoints";

function row({
  assemblyId,
  sourceSlug,
  evaluated = true,
  passed = false,
  nullClass = null,
  gatePassed = true,
  ratio = 0.5,
  candidateDisposition = ACTIVE_CANDIDATE_DISPOSITION,
} = {}) {
  return {
    candidateDisposition,
    assemblyId,
    sourceSlug,
    evaluation: {
      evaluated,
      nullClass,
    },
    score: {
      passed: evaluated ? passed : null,
    },
    gates: {
      surfaceQuadrature: {
        exposure: {
          passed: evaluated ? gatePassed : null,
          thresholdRatio: evaluated ? ratio : null,
        },
      },
    },
  };
}

test("dashboard filtering applies assembly and configuration constraints together", () => {
  const rows = [
    row({ assemblyId: FIRST_ASSEMBLY_ID, sourceSlug: FIRST_SOURCE_SLUG }),
    row({ assemblyId: FIRST_ASSEMBLY_ID, sourceSlug: "three-axis-circular-phase-compensated-symmetric" }),
    row({ assemblyId: SECOND_ASSEMBLY_ID, sourceSlug: "axial-transverse-three-binary-interior" }),
  ];
  assert.deepEqual(
    filterCompactSweepRows(rows, { assemblyId: FIRST_ASSEMBLY_ID }),
    rows.slice(0, 2),
  );
  assert.deepEqual(
    filterCompactSweepRows(rows, {
      assemblyId: FIRST_ASSEMBLY_ID,
      sourceSlug: "three-axis-circular-phase-compensated-symmetric",
    }),
    [rows[1]],
  );
  assert.deepEqual(
    filterCompactSweepRows(rows, { sourceSlug: "axial-transverse-three-binary-interior" }),
    [rows[2]],
  );
  const deprecated = row({
    assemblyId: SECOND_ASSEMBLY_ID,
    sourceSlug: "all-axial-three-binary-boundary",
    candidateDisposition: DEPRECATED_CONTROL_DISPOSITION,
  });
  assert.deepEqual(
    filterCompactSweepRows([...rows, deprecated], {
      candidateDisposition: ACTIVE_CANDIDATE_DISPOSITION,
    }),
    rows,
  );
  assert.deepEqual(
    filterCompactSweepRows([...rows, deprecated], {
      candidateDisposition: DEPRECATED_CONTROL_DISPOSITION,
    }),
    [deprecated],
  );
});

test("case filtering treats sample expressions as exact ordinals", () => {
  const caseRows = [
    {
      sourceSlug: "three-axis-circular-coincident-midpoints-equal-radius-common-frequency",
      sampleOrdinal: 0,
      caseId: "case-zero",
      campaignHash: "campaign-a",
    },
    {
      sourceSlug: "three-axis-circular-coincident-midpoints-equal-radius-common-frequency",
      sampleOrdinal: 2,
      caseId: "case-two-a",
      campaignHash: "campaign-a",
    },
    {
      sourceSlug: "three-axis-circular-coincident-midpoints-equal-radius-common-frequency",
      sampleOrdinal: 2,
      caseId: "case-two-b",
      campaignHash: "campaign-b",
    },
    {
      sourceSlug: "three-axis-circular-coincident-midpoints-4-2-1-frequency",
      sampleOrdinal: 2,
      caseId: "case-two-other-configuration",
      campaignHash: "campaign-a",
    },
  ];

  assert.deepEqual(
    filterCompactSweepCaseRows(
      caseRows,
      "three-axis-circular-coincident-midpoints-equal-radius-common-frequency sample 2",
    ),
    caseRows.slice(1, 3),
  );
  assert.deepEqual(
    filterCompactSweepCaseRows(
      caseRows,
      "three-axis-circular-coincident-midpoints-equal-radius-common-frequency sample-2",
    ),
    caseRows.slice(1, 3),
  );
  assert.deepEqual(
    filterCompactSweepCaseRows(caseRows, "sample 2"),
    caseRows.slice(1),
  );
  assert.deepEqual(
    filterCompactSweepCaseRows(caseRows, "", {
      sourceSlug: "three-axis-circular-coincident-midpoints-equal-radius-common-frequency",
      sampleOrdinal: "2",
    }),
    caseRows.slice(1, 3),
  );
});

test("evaluation funnel keeps null classes separate from compact gate outcomes", () => {
  const funnel = buildEvaluationFunnel([
    row({ assemblyId: FIRST_ASSEMBLY_ID, sourceSlug: FIRST_SOURCE_SLUG, passed: false }),
    row({ assemblyId: FIRST_ASSEMBLY_ID, sourceSlug: FIRST_SOURCE_SLUG, passed: true }),
    row({
      assemblyId: FIRST_ASSEMBLY_ID,
      sourceSlug: FIRST_SOURCE_SLUG,
      evaluated: false,
      nullClass: "event-convergence",
    }),
    row({
      assemblyId: FIRST_ASSEMBLY_ID,
      sourceSlug: FIRST_SOURCE_SLUG,
      evaluated: false,
      nullClass: "minimum-separation",
    }),
  ]);
  assert.deepEqual(funnel, {
    drawn: 4,
    evaluated: 2,
    drawnNotEvaluated: 2,
    gateFailed: 1,
    compactPassed: 1,
    eventConvergenceFailures: 1,
    minimumSeparationFailures: 1,
    otherNotEvaluated: 0,
  });
});

test("threshold ratios and gate aggregation use exact evaluated denominators", () => {
  assert.equal(thresholdRatio(0.005, 0.01), 0.5);
  assert.equal(thresholdRatio(0.01, 0), null);
  const summary = summarizeGate([
    row({
      assemblyId: FIRST_ASSEMBLY_ID,
      sourceSlug: FIRST_SOURCE_SLUG,
      gatePassed: true,
      ratio: 0.25,
    }),
    row({
      assemblyId: FIRST_ASSEMBLY_ID,
      sourceSlug: FIRST_SOURCE_SLUG,
      gatePassed: false,
      ratio: 2,
    }),
    row({
      assemblyId: FIRST_ASSEMBLY_ID,
      sourceSlug: FIRST_SOURCE_SLUG,
      evaluated: false,
    }),
  ], "surfaceQuadrature", "exposure");
  assert.deepEqual(summary, {
    denominator: 2,
    passCount: 1,
    failureCount: 1,
    passRate: 0.5,
    medianThresholdRatio: 1.125,
  });
});

test("case residual detail keeps the absolute cycle value separate from its tolerance-bearing companion", () => {
  assert.deepEqual(caseResidualDetail({
    metrics: {
      signedCycleResidual: 4.171323488146487e-8,
      signedEmissionResidual: 1.7380514533943696e-9,
    },
    gates: {
      surfaceQuadrature: {
        signedEmissionReference: {
          maximumChange: 5.7160790517820805e-9,
          threshold: 0.01,
          thresholdRatio: 5.71607905178208e-7,
        },
      },
    },
  }), {
    signedCycleResidual: 4.171323488146487e-8,
    signedEmissionResidual: 1.7380514533943696e-9,
    signedEmissionThreshold: 0.01,
    signedEmissionThresholdRatio: 1.7380514533943695e-7,
    signedEmissionGateMaximum: 5.7160790517820805e-9,
    signedEmissionGateThresholdRatio: 5.71607905178208e-7,
  });
});

test("quantiles and correlations are deterministic and ignore null values", () => {
  assert.equal(quantile([1, 2, 3, 4], 0.25), 1.75);
  assert.deepEqual(summarizeDistribution([null, 1, 2, 3, 4]), {
    count: 4,
    minimum: 1,
    q1: 1.75,
    median: 2.5,
    q3: 3.25,
    maximum: 4,
  });
  assert.equal(
    pearsonCorrelation([[1, 2], [2, 4], [3, 6], [null, null]]),
    1,
  );
  assert.equal(pearsonCorrelation([[1, 1]]), null);
});

test("evidence index covers every current Borg identity without a compact export", () => {
  const registry = readJson(
    "reference/priorities/app-borg/assembly-registry.v1.json",
  );
  const projection = readJson(
    "reference/priorities/braid-program/braid-candidate-adjudication-projection.v1.json",
  );
  const campaignRegistry = readJson(
    "src/prescribed-path-analysis/campaigns/all-candidate-analytical-campaign.registry.v2.json",
  );
  const sourceSpecsByPath = new Map(registry.entries.map((entry) => [
    entry.sourceSpec,
    readJson(entry.sourceSpec),
  ]));
  const evidence = buildBraidEvidenceIndex({
    registry,
    projection,
    campaignRegistry,
    sourceSpecsByPath,
  });
  assert.equal(evidence.schema, BRAID_EVIDENCE_INDEX_SCHEMA);
  assert.equal(evidence.records.length, registry.entries.length);
  assert.equal(evidence.summary.identityCount, registry.entries.length);
  assert.equal(evidence.summary.compactTargets, campaignRegistry.candidates.length);
  assert.equal(evidence.summary.compactRows, 0);
  assert.equal(evidence.summary.stale, 0);
  assert.equal(
    new Set(evidence.records.map((record) =>
      `${record.assemblyId}:${record.modelRevisionSha256}`)).size,
    registry.entries.length,
  );
  assert.equal(evidence.records.every((record) =>
    record.evidenceItemCount >= 2 &&
    ["targeted-no-export", "not-in-current-cohort"].includes(
      record.compactCampaign.status,
    )), true);
  const ladderRecord = evidence.records.find((record) =>
    record.label.includes("Equal-radius planar three-binary circular balance"));
  assert.equal(ladderRecord.scientificStatus.context.some((relation) =>
    relation.relationId ===
      "finding-planar-three-binary-balance-ladder-2026-08-29"), true);
});
