import assert from "node:assert/strict";
import test from "node:test";

import {
  createEndpointResidualSearchProtocol,
  runEndpointResidualSearchCampaign,
  selectEndpointResidualRefinementCases,
  summarizeEndpointResidualRefinements,
} from "../src/prescribed-path-analysis/EndpointResidualSearchCampaign.mjs";
import {
  loadAllCandidateCampaignRegistry,
} from "../src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs";

for (const { name, metrics } of [
  {
    name: "equal peaks rank lower RMS first",
    metrics: [
      { caseId: "z-lower-rms", peak: 2, rms: 1 },
      { caseId: "a-higher-rms", peak: 2, rms: 1.5 },
    ],
  },
  {
    name: "peak remains primary when RMS favors the other case",
    metrics: [
      { caseId: "z-lower-peak", peak: 2, rms: 1.5 },
      { caseId: "a-higher-peak", peak: 3, rms: 1 },
    ],
  },
  {
    name: "exact metric ties use caseId for deterministic ordering",
    metrics: [
      { caseId: "a-case", peak: 2, rms: 1 },
      { caseId: "z-case", peak: 2, rms: 1 },
    ],
  },
]) {
  test(`endpoint residual ranking: ${name} in both input orders`, () => {
    // Synthetic ranking fixtures; the declared order is the expected result.
    const expectedIds = metrics.map(({ caseId }) => caseId);
    const rows = metrics.map(({ caseId, peak, rms }) => ({
      caseId,
      status: "eligible-complete-inventory",
      refined: {
        memberResidual: {
          falsifiedAsExactIsolatedPrescribedHistory: true,
          searchGuidance: {
            fullCycleMaximumPointwiseMemberResidualNorm: peak,
            fullCycleRmsPointwiseMemberResidualNorm: rms,
          },
        },
        summedAcceleration: { outcome: "falsified-by-this-screen" },
        independentRootResidualAudit: { maximumAbsoluteResidual: 0 },
      },
    }));
    for (const ordered of [rows, [...rows].reverse()]) {
      const cases = [
        { caseId: "unknown", status: "unknown-evaluation-failed" },
        ...ordered,
      ];
      const before = structuredClone(cases);
      const selected = selectEndpointResidualRefinementCases(
        { cases },
        { leadingCount: 2, cancellationCount: 0 },
      );
      assert.deepEqual(selected.map(({ row }) => row.caseId), expectedIds);
      const leader = selectEndpointResidualRefinementCases(
        { cases },
        { leadingCount: 1, cancellationCount: 0 },
      );
      assert.equal(leader[0].row.caseId, expectedIds[0]);
      const summary = summarizeEndpointResidualRefinements(cases);
      assert.deepEqual(summary.leadingCases.map(({ caseId }) => caseId), expectedIds);
      assert.equal(summary.eligibleCount, 2);
      assert.equal(summary.unknownCount, 1);
      assert.deepEqual(cases, before);
    }
  });
}

test("endpoint-only search is deterministic, complete-inventory gated, and root-audited", () => {
  const loaded = loadAllCandidateCampaignRegistry();
  const candidate = loaded.candidates.find(
    (row) => row.declaration.sourceSlug ===
      "three-axis-circular-coincident-midpoints-equal-radius-common-frequency",
  );
  const protocol = createEndpointResidualSearchProtocol(loaded.protocol, {
    primaryTimeSamples: 12,
    refinedTimeSamples: 24,
    suffix: "endpoint-search-test",
  });
  const options = {
    candidates: [candidate],
    protocol,
    seed: "endpoint-search-test-seed",
    strata: [
      {
        stratumId: "catalog-reference",
        sampler: "reference",
        count: 1,
      },
    ],
  };

  const first = runEndpointResidualSearchCampaign(options);
  const second = runEndpointResidualSearchCampaign(options);

  assert.equal(first.cases.length, 1);
  assert.equal(first.cases[0].status, "eligible-complete-inventory");
  assert.equal(first.cases[0].completeInventory, true);
  assert.equal(first.cases[0].independentRootCheckPassed, true);
  assert.equal(
    first.cases[0].refined.independentRootResidualAudit.status,
    "passed",
  );
  assert.equal(
    first.cases[0].refined.memberResidual.branchExistenceClaim,
    false,
  );
  assert.equal(
    first.cases[0].refined.memberResidual.returnSymmetryClaim,
    false,
  );
  assert.equal(first.cases[0].refined.memberResidual.configurationExistenceClaim, false);
  assert.match(first.cases[0].evidenceDisposition, /no path evolution/);
  assert.equal(first.pathEvolutionInvoked, false);
  assert.equal(first.eomSolverInvoked, false);
  assert.deepEqual(
    first.cases.map((row) => ({
      sampledSpecHash: row.sampledSpecHash,
      primaryHash: row.primary.resultHash,
      refinedHash: row.refined.resultHash,
    })),
    second.cases.map((row) => ({
      sampledSpecHash: row.sampledSpecHash,
      primaryHash: row.primary.resultHash,
      refinedHash: row.refined.resultHash,
    })),
  );
  assert.equal(first.campaignHash, second.campaignHash);
  assert.equal(selectEndpointResidualRefinementCases(first).length, 1);
});

test("endpoint-only search records sampling failures as unknown", () => {
  const loaded = loadAllCandidateCampaignRegistry();
  const candidate = structuredClone(loaded.candidates.find(
    (row) => row.declaration.sourceSlug ===
      "three-axis-circular-coincident-midpoints-equal-radius-common-frequency",
  ));
  candidate.spec = {};
  const protocol = createEndpointResidualSearchProtocol(loaded.protocol, {
    primaryTimeSamples: 12,
    refinedTimeSamples: 24,
    suffix: "endpoint-search-failure-test",
  });
  const campaign = runEndpointResidualSearchCampaign({
    candidates: [candidate],
    protocol,
    seed: "endpoint-search-failure-test-seed",
    strata: [
      {
        stratumId: "unsupported-sampler",
        sampler: "reference",
        count: 1,
      },
    ],
  });

  assert.equal(campaign.summary.eligibleCompleteInventoryCount, 0);
  assert.equal(campaign.summary.unknownCount, 1);
  assert.equal(campaign.cases[0].status, "unknown-sampling-failed");
});
