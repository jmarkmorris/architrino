import assert from "node:assert/strict";
import test from "node:test";

import {
  createEndpointResidualSearchProtocol,
  runEndpointResidualSearchCampaign,
  selectEndpointResidualRefinementCases,
} from "../src/prescribed-path-analysis/EndpointResidualSearchCampaign.mjs";
import {
  loadAllCandidateCampaignRegistry,
} from "../src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs";

test("endpoint-only search is deterministic, complete-inventory gated, and root-audited", () => {
  const loaded = loadAllCandidateCampaignRegistry();
  const candidate = loaded.candidates.find(
    (row) => row.declaration.memberId === "A1.2",
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
  assert.equal(first.cases[0].refined.memberResidual.taxonomyClaim, false);
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
    (row) => row.declaration.memberId === "A1.2",
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
