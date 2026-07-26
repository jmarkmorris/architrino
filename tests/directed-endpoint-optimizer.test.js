import assert from "node:assert/strict";
import test from "node:test";

import {
  loadAllCandidateCampaignRegistry,
} from "../src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs";
import {
  computeDirectedEndpointOptimizerResultHash,
  runDirectedEndpointOptimizer,
  runDirectedEndpointOptimizerContinuation,
} from "../src/prescribed-path-analysis/DirectedEndpointOptimizer.mjs";
import {
  createEndpointResidualSearchProtocol,
  runEndpointResidualSearchCampaign,
} from "../src/prescribed-path-analysis/EndpointResidualSearchCampaign.mjs";

function buildOneSeedSearch() {
  const loaded = loadAllCandidateCampaignRegistry();
  const candidate = loaded.candidates.find(
    (row) => row.declaration.memberId === "A1.2",
  );
  const protocol = createEndpointResidualSearchProtocol(loaded.protocol, {
    primaryTimeSamples: 12,
    refinedTimeSamples: 24,
    suffix: "directed-optimizer-seed-test",
  });
  const sourceSearch = runEndpointResidualSearchCampaign({
    candidates: [candidate],
    protocol,
    seed: "directed-optimizer-source-test",
    strata: [
      {
        stratumId: "catalog-reference",
        sampler: "reference",
        count: 1,
      },
    ],
  });
  return { loaded, sourceSearch };
}

test("directed optimizer is bounded, deterministic, root-audited, and held out", () => {
  const { loaded, sourceSearch } = buildOneSeedSearch();
  const options = {
    candidates: loaded.candidates,
    baseProtocol: loaded.protocol,
    sourceSearch,
    seed: "directed-optimizer-test",
    basinCount: 1,
    maximumIterations: 1,
    heldOutPerStratum: 1,
    optimizationPrimaryTimeSamples: 12,
    optimizationRefinedTimeSamples: 24,
    densePrimaryTimeSamples: 12,
    denseRefinedTimeSamples: 24,
  };
  const first = runDirectedEndpointOptimizer(options);
  const second = runDirectedEndpointOptimizer(options);

  assert.equal(first.basins.length, 1);
  assert.equal(first.basins[0].seedSource.sourceSearchCompleteInventory, true);
  assert.equal(
    first.basins[0].seedSource.sourceSearchIndependentRootCheckPassed,
    true,
  );
  assert.ok(first.basins[0].iterations[0].trials.length > 0);
  assert.equal(
    first.basins[0].denseFinalEvaluation
      .refinedIndependentRootResidualAudit.status,
    "passed",
  );
  assert.equal(first.heldOutAudit.usedForOptimization, false);
  assert.ok(
    first.heldOutAudit.cases.every(
      (row) => row.usedForOptimization === false,
    ),
  );
  assert.ok(
    first.heldOutAudit.cases
      .filter((row) => row.evaluation != null)
      .every(
        (row) =>
          row.evaluation.refinedIndependentRootResidualAudit.status ===
          "passed",
      ),
  );
  assert.equal(first.acceptedReturnSymmetryChanged, false);
  assert.equal(first.globalOptimizationClaim, false);
  assert.equal(first.branchExistenceClaim, false);
  assert.equal(first.stabilityClaim, false);
  assert.equal(first.retentionClaim, false);
  assert.equal(first.taxonomyClaim, false);
  assert.equal(first.physicalRealizationClaim, false);
  assert.equal(first.resultHash, second.resultHash);
});

test("directed optimizer rejects unavailable complete-inventory basin count", () => {
  const { loaded, sourceSearch } = buildOneSeedSearch();
  assert.throws(
    () => runDirectedEndpointOptimizer({
      candidates: loaded.candidates,
      baseProtocol: loaded.protocol,
      sourceSearch,
      basinCount: 2,
      maximumIterations: 1,
      heldOutPerStratum: 1,
      optimizationPrimaryTimeSamples: 12,
      optimizationRefinedTimeSamples: 24,
      densePrimaryTimeSamples: 12,
      denseRefinedTimeSamples: 24,
    }),
    /requested 2 basins but only 1 complete-inventory/,
  );
});

test("directed optimizer continuation resumes retained endpoints without new draws", () => {
  const { loaded, sourceSearch } = buildOneSeedSearch();
  const common = {
    candidates: loaded.candidates,
    baseProtocol: loaded.protocol,
    maximumIterations: 1,
    heldOutPerStratum: 1,
    optimizationPrimaryTimeSamples: 12,
    optimizationRefinedTimeSamples: 24,
    densePrimaryTimeSamples: 12,
    denseRefinedTimeSamples: 24,
  };
  const sourceResult = runDirectedEndpointOptimizer({
    ...common,
    sourceSearch,
    seed: "directed-optimizer-continuation-source-test",
    basinCount: 1,
  });
  const continuation = runDirectedEndpointOptimizerContinuation({
    ...common,
    sourceResult,
    seed: "directed-optimizer-continuation-test",
    minimumStepScale: 0.5,
  });

  assert.equal(
    continuation.sourceRun.resultHash,
    sourceResult.resultHash,
  );
  assert.equal(continuation.sourceRun.newRandomDraws, false);
  assert.equal(
    continuation.basins[0].seedSource.sourceKind,
    "retained-directed-optimizer-endpoint",
  );
  assert.equal(
    continuation.basins[0].initialEvaluation.sampledSpecHash,
    sourceResult.basins[0].finalSpecHash,
  );
  assert.ok(
    continuation.basins[0].iterations.every(
      (iteration) =>
        iteration.acceptedPointCertification == null ||
        (
          iteration.acceptedPointCertification.completeInventory === true &&
          iteration.acceptedPointCertification
            .independentRootCheckPassed === true &&
          iteration.acceptedPointCertification
            .refinedIndependentRootResidualAudit.status === "passed"
        ),
    ),
  );
  assert.equal(
    continuation.resultHash,
    computeDirectedEndpointOptimizerResultHash(continuation),
  );
  assert.match(
    continuation.basins[0].disposition,
    /(?:dense-eligible|dense-certification-unknown)$/,
  );
});

test("directed optimizer continuation rejects a modified source artifact", () => {
  const { loaded, sourceSearch } = buildOneSeedSearch();
  const sourceResult = runDirectedEndpointOptimizer({
    candidates: loaded.candidates,
    baseProtocol: loaded.protocol,
    sourceSearch,
    basinCount: 1,
    maximumIterations: 1,
    heldOutPerStratum: 1,
    optimizationPrimaryTimeSamples: 12,
    optimizationRefinedTimeSamples: 24,
    densePrimaryTimeSamples: 12,
    denseRefinedTimeSamples: 24,
  });
  sourceResult.seed = "modified-after-hash";
  assert.throws(
    () => runDirectedEndpointOptimizerContinuation({
      candidates: loaded.candidates,
      baseProtocol: loaded.protocol,
      sourceResult,
      maximumIterations: 1,
      heldOutPerStratum: 1,
      optimizationPrimaryTimeSamples: 12,
      optimizationRefinedTimeSamples: 24,
      densePrimaryTimeSamples: 12,
      denseRefinedTimeSamples: 24,
    }),
    /source result hash failed/,
  );
});
