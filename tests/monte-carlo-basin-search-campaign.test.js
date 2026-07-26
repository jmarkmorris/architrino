import assert from "node:assert/strict";
import {
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  createExternalRawEvidenceStore,
  verifyExternalRawEvidenceReceipts,
} from "../src/prescribed-path-analysis/ExternalRawEvidenceStore.mjs";
import {
  buildCompactSearchCampaign,
  selectMonteCarloBasinHandoffs,
} from "../src/prescribed-path-analysis/MonteCarloBasinSearchCampaign.mjs";
import {
  importCompactMonteCarloCampaign,
  verifyCompactAnalyticalCampaignDatabase,
} from "../src/prescribed-path-analysis/database/CompactAnalyticalCampaignDatabase.mjs";

const HASH_A = "a".repeat(64);
const HASH_B = "b".repeat(64);
const HASH_C = "c".repeat(64);

function coverageRow({ caseId, peak, change }) {
  return {
    caseId,
    caseHash: HASH_A,
    candidateId: "candidate-c1",
    familyId: "C",
    memberId: "C1",
    sampleOrdinal: Number(caseId.at(-1)),
    evaluationStatus: { evaluated: true },
    scoreHash: HASH_B,
    score: {
      pointwiseMemberResidualSearch: {
        status: "eligible-diagnostic-search-score",
        refined: {
          fullCycleMaximumPointwiseMemberResidualNorm: peak,
          fullCycleRmsPointwiseMemberResidualNorm: peak / 2,
        },
        resolutionComparison: {
          maximumRelativeOrAbsoluteChange: change,
        },
      },
    },
  };
}

test("handoff selector retains every row crossing both predeclared thresholds", () => {
  const selected = selectMonteCarloBasinHandoffs([{
    campaignHash: HASH_C,
    campaignId: "coverage",
    caseRows: [
      coverageRow({ caseId: "case-0", peak: 5, change: 0.01 }),
      coverageRow({ caseId: "case-1", peak: 7, change: 0.01 }),
      coverageRow({ caseId: "case-2", peak: 4, change: 0.06 }),
      coverageRow({ caseId: "case-3", peak: 3, change: 0.02 }),
    ],
  }], {
    maximumRefinedFullCyclePeak: 6,
    maximumResolutionChange: 0.05,
  });
  assert.deepEqual(
    selected.selected.map((row) => row.row.caseId),
    ["case-3", "case-0"],
  );
  assert.equal(selected.selectedCount, 2);
  assert.equal(
    selected.dispositionCounts["above-residual-handoff-threshold"],
    1,
  );
  assert.equal(
    selected.dispositionCounts["above-resolution-change-threshold"],
    1,
  );
});

test("external raw evidence receipts verify bytes and reject tampering", () => {
  const directory = mkdtempSync(
    path.join(tmpdir(), "architrino-external-evidence-"),
  );
  try {
    const store = createExternalRawEvidenceStore(directory);
    const receipt = store.write({
      protocolHash: HASH_A,
      resultHash: HASH_B,
      rawLedgers: { causalRoots: [{ eventId: "event-0" }] },
    }, {
      resolution: "primary",
    });
    const verified = verifyExternalRawEvidenceReceipts(directory, [receipt]);
    assert.equal(verified.verified, true);
    assert.equal(verified.receiptCount, 1);
    const artifactPath = path.join(directory, receipt.path);
    const bytes = readFileSync(artifactPath);
    writeFileSync(artifactPath, Buffer.concat([bytes, Buffer.from("tamper")]));
    assert.throws(
      () => verifyExternalRawEvidenceReceipts(directory, [receipt]),
      /compressedSha256 mismatch/,
    );
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("directed search points round-trip through the compact control plane", () => {
  const directory = mkdtempSync(
    path.join(tmpdir(), "architrino-search-campaign-"),
  );
  const databasePath = path.join(directory, "compact.sqlite3");
  try {
    const protocol = {
      schema: "test/search-protocol.v1",
      eventEvaluator: { fieldSpeed: 1 },
    };
    const identity = {
      runtime: process.version,
      platform: `${process.platform}/${process.arch}`,
      files: [],
      implementationHash: HASH_C,
    };
    const campaign = buildCompactSearchCampaign({
      campaignId: "directed-test",
      protocol,
      implementationIdentity: identity,
      seed: "directed-test-seed",
      stage: "directed-optimization",
      points: [{
        caseId: "basin-1/initial",
        row: {
          familyId: "C",
          memberId: "C1",
          candidateId: "candidate-c1",
          sampledSpec: { taxonomy: { familyId: "C", memberId: "C1" } },
          sampledSpecHash: HASH_A,
          exactSourceHash: HASH_B,
          coordinates: { u: 0.25 },
          status: "eligible-complete-inventory",
          completeInventory: true,
          independentRootCheckPassed: true,
          objective: {
            refinedFullCyclePeak: 5,
            refinedFullCycleRms: 2,
            adjudicationThreshold: 1e-9,
          },
          primaryRawEvidenceReceipt: {
            schema: "test/receipt.v1",
            path: "a.json.gz",
          },
          refinedRawEvidenceReceipt: {
            schema: "test/receipt.v1",
            path: "b.json.gz",
          },
          measuredWallSeconds: 0.5,
        },
        lineage: { basinId: "basin-1", pointKind: "initial" },
      }],
    });
    const imported = importCompactMonteCarloCampaign(
      databasePath,
      campaign,
    );
    assert.equal(imported.caseCount, 1);
    const verified = verifyCompactAnalyticalCampaignDatabase(databasePath);
    assert.equal(verified.integrity, "ok");
    assert.equal(verified.caseCount, 1);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
