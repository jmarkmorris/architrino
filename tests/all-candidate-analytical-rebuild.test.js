import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { BORG_BRAID_RECORD_CATALOG } from "../src/apps/borg/BorgBraidRecordCatalog.js";
import {
  DEFAULT_ALL_CANDIDATE_CAMPAIGN_REGISTRY_PATH,
  buildAllCandidateAnalyticalCampaign,
} from "../src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs";
import {
  openAnalyticalCampaignDatabase,
  verifyAnalyticalCampaignDatabase,
} from "../src/prescribed-path-analysis/database/AnalyticalCampaignDatabase.mjs";
import {
  rebuildAllCandidateAnalyticalDatabase,
} from "../src/prescribed-path-analysis/database/AnalyticalCampaignRebuild.mjs";

function temporaryDirectory(label) {
  return mkdtempSync(path.join(os.tmpdir(), `${label}-`));
}

function sha256File(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

test("all-candidate registry exactly covers the live Borg catalog", () => {
  const campaign = buildAllCandidateAnalyticalCampaign();
  assert.equal(campaign.candidates.length, BORG_BRAID_RECORD_CATALOG.entries.length);
  assert.deepEqual(
    campaign.candidates.map((row) => row.declaration.candidateId),
    BORG_BRAID_RECORD_CATALOG.entries.map((row) => row.id),
  );
  assert.equal(
    campaign.acceptedCandidateCount + campaign.rejectedCandidateCount,
    campaign.candidates.length,
  );
  assert.equal(campaign.artifacts.length, campaign.candidates.length * 2);
  for (const row of campaign.summary.cases) {
    assert.match(row.exactSourceArtifactSha256, /^[0-9a-f]{64}$/);
    assert.equal(row.protocolHash, campaign.protocolHash);
  }
  assert.deepEqual(campaign.summary.claimBoundary, {
    pathEvolutionInvoked: false,
    eomSolverInvoked: false,
    excludedClaims: ["stability", "energy", "retention", "physical-realization"],
  });
});

test("registry omission fails before replacing the target database", async () => {
  const directory = temporaryDirectory("aaa-rebuild-registry-omission");
  try {
    const databasePath = path.join(directory, "analytical-campaigns.sqlite3");
    const database = openAnalyticalCampaignDatabase(databasePath);
    database.close();
    const before = sha256File(databasePath);
    const registry = JSON.parse(readFileSync(
      DEFAULT_ALL_CANDIDATE_CAMPAIGN_REGISTRY_PATH,
      "utf8",
    ));
    registry.candidates.pop();
    const registryPath = path.join(directory, "incomplete-registry.json");
    writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
    await assert.rejects(
      rebuildAllCandidateAnalyticalDatabase({
        mode: "publish",
        databasePath,
        registryPath,
      }),
      /candidate count .* differs from catalog count/,
    );
    assert.equal(sha256File(databasePath), before);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("check is nonpublishing, post-swap failure rolls back, and success swaps atomically", async () => {
  const directory = temporaryDirectory("aaa-rebuild-publication");
  try {
    const databasePath = path.join(directory, "analytical-campaigns.sqlite3");
    const database = openAnalyticalCampaignDatabase(databasePath);
    database.close();
    const originalHash = sha256File(databasePath);

    const checked = await rebuildAllCandidateAnalyticalDatabase({
      mode: "check",
      databasePath,
    });
    assert.equal(checked.published, false);
    assert.equal(sha256File(databasePath), originalHash);

    await assert.rejects(
      rebuildAllCandidateAnalyticalDatabase({
        mode: "publish",
        databasePath,
        failureInjection: "after-swap",
      }),
      /injected analytical rebuild failure at after-swap/,
    );
    assert.equal(sha256File(databasePath), originalHash);
    assert.equal(verifyAnalyticalCampaignDatabase(databasePath).acceptedCaseCount, 0);

    const published = await rebuildAllCandidateAnalyticalDatabase({
      mode: "publish",
      databasePath,
    });
    assert.equal(published.published, true);
    assert.equal(published.fingerprint, checked.fingerprint);
    assert.equal(published.candidateCount, BORG_BRAID_RECORD_CATALOG.entries.length);
    assert.equal(
      published.acceptedCandidateCount + published.rejectedCandidateCount,
      published.candidateCount,
    );
    const verification = verifyAnalyticalCampaignDatabase(databasePath);
    assert.equal(verification.integrity, "ok");
    assert.equal(verification.generationCount, 1);
    assert.equal(verification.rejectedCaseCount, published.rejectedCandidateCount);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
