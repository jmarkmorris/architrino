import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  buildCompactSweepDashboardExport,
  writeCompactSweepDashboardExport,
} from "../scripts/eom/export-compact-sweep-dashboard.mjs";
import {
  compactSha256Canonical,
  importCompactMonteCarloCampaign,
  verifyCompactAnalyticalCampaignDatabase,
} from "../src/prescribed-path-analysis/database/CompactAnalyticalCampaignDatabase.mjs";
import {
  buildTestCompactMonteCarloCampaign,
} from "./support/compact-monte-carlo-fixture.mjs";

function sha256File(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function writeJson(filePath, value) {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function buildAnalyzerReceipt(campaign) {
  const manifest = {
    schema:
      "prescribed-path-analysis/compact-family-sweep-coordinator-receipt.v1",
    campaignFiles: [{
      file: "wave-01-shard-01.json",
      fileKind: "shard",
      waveId: "wave-01",
      shardNumber: 1,
      memberToken: null,
      fileBytes: 1,
      fileSha256: compactSha256Canonical("fixture-file"),
      campaignId: campaign.campaignId,
      campaignHash: campaign.campaignHash,
      protocolHash: campaign.protocolHash,
      implementationHash:
        campaign.implementationIdentity.implementationHash,
      campaignHashVerified: true,
      fileHashAlgorithm: "sha256-bytes",
    }],
  };
  const body = {
    schema: "prescribed-path-analysis/compact-family-sweep-analysis.v1",
    claimGrade: "measured",
    claimBoundary: {
      diagnosticOnly: true,
      independentAcceptancePerformed: false,
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
      liveCampaignMutationPerformed: false,
      doesNotEstablish: [
        "stability",
        "retention",
        "energy closure",
        "physical realization",
      ],
    },
    status: "terminal-for-declared-boundary",
    terminalBoundary: {
      declared: true,
      throughWave: 1,
      defects: [],
      terminal: true,
    },
    skippedFiles: [],
    frozenIdentitySet: {
      protocolHashes: [campaign.protocolHash],
      implementationHashes: [
        campaign.implementationIdentity.implementationHash,
      ],
    },
    drawCounts: {
      expected: 3,
      actual: 3,
      evaluated: 2,
      notEvaluated: 1,
      nullScoreRows: 1,
    },
    metricLeaders: {
      combinedScoreCreated: false,
      directionsAreMetricSpecific: true,
      metrics: [],
    },
    campaignAndFileManifest: manifest,
  };
  return {
    ...body,
    coordinatorReceipt: {
      schema:
        "prescribed-path-analysis/compact-family-sweep-coordinator-receipt.v1",
      status: body.status,
      analysisHash: compactSha256Canonical(body),
      manifestHash: compactSha256Canonical(manifest),
      completedCampaignFileCount: 1,
      skippedCampaignFileCount: 0,
      terminalBoundaryDeclared: true,
      terminalBoundarySatisfied: true,
      terminalBoundaryDefectCount: 0,
    },
  };
}

function fixture() {
  const directory = mkdtempSync(
    path.join(os.tmpdir(), "architrino-compact-dashboard-"),
  );
  const localDataDirectory = path.join(directory, ".local-data", "sweep");
  const databasePath = path.join(localDataDirectory, "compact.sqlite3");
  const analyzerReceiptPath = path.join(
    localDataDirectory,
    "analyzer.json",
  );
  const databaseVerificationPath = path.join(
    localDataDirectory,
    "database-verification.json",
  );
  const campaign = buildTestCompactMonteCarloCampaign();
  importCompactMonteCarloCampaign(databasePath, campaign);
  writeJson(
    databaseVerificationPath,
    verifyCompactAnalyticalCampaignDatabase(databasePath),
  );
  writeJson(analyzerReceiptPath, buildAnalyzerReceipt(campaign));
  return {
    analyzerReceiptPath,
    campaign,
    databasePath,
    databaseVerificationPath,
    directory,
    localDataDirectory,
  };
}

function exportOptions(testFixture) {
  return {
    databasePath: testFixture.databasePath,
    analyzerReceiptPath: testFixture.analyzerReceiptPath,
    databaseVerificationPath: testFixture.databaseVerificationPath,
  };
}

test("read-only exporter is byte deterministic and leaves SQLite unchanged", () => {
  const testFixture = fixture();
  try {
    const before = {
      hash: sha256File(testFixture.databasePath),
      size: statSync(testFixture.databasePath).size,
      mtimeMs: statSync(testFixture.databasePath).mtimeMs,
    };
    const first = buildCompactSweepDashboardExport(
      exportOptions(testFixture),
    );
    const second = buildCompactSweepDashboardExport(
      exportOptions(testFixture),
    );
    assert.deepEqual(first.bytes, second.bytes);
    assert.equal(first.outputSha256, second.outputSha256);
    assert.equal(
      first.data.identity.dataHash,
      second.data.identity.dataHash,
    );
    assert.equal(first.data.summary.drawn, 3);
    assert.equal(first.data.rows[0].exactRerunInstruction != null, true);
    assert.equal(
      first.data.identity.combinedCandidateScoreCreated,
      false,
    );
    assert.deepEqual({
      hash: sha256File(testFixture.databasePath),
      size: statSync(testFixture.databasePath).size,
      mtimeMs: statSync(testFixture.databasePath).mtimeMs,
    }, before);
    assert.equal(existsSync(`${testFixture.databasePath}-wal`), false);
    assert.equal(existsSync(`${testFixture.databasePath}-shm`), false);
  } finally {
    rmSync(testFixture.directory, { recursive: true, force: true });
  }
});

test("writer confines generated dashboard data to .local-data", () => {
  const testFixture = fixture();
  try {
    const outputPath = path.join(
      testFixture.directory,
      ".local-data",
      "dashboard",
      "data.json",
    );
    const report = writeCompactSweepDashboardExport({
      ...exportOptions(testFixture),
      outputPath,
      repositoryRoot: testFixture.directory,
    });
    assert.equal(report.databaseReadOnly, true);
    assert.equal(report.databaseUnchanged, true);
    assert.equal(report.rowCount, 3);
    assert.equal(sha256File(outputPath), report.outputSha256);
    assert.throws(
      () => writeCompactSweepDashboardExport({
        ...exportOptions(testFixture),
        outputPath: path.join(testFixture.directory, "outside.json"),
        repositoryRoot: testFixture.directory,
      }),
      /must remain under \.local-data/u,
    );
  } finally {
    rmSync(testFixture.directory, { recursive: true, force: true });
  }
});

test("exporter does not advance on malformed, non-terminal, mismatched, and unsupported receipts", () => {
  const testFixture = fixture();
  try {
    const validAnalyzer = JSON.parse(
      readFileSync(testFixture.analyzerReceiptPath, "utf8"),
    );
    const validVerification = JSON.parse(
      readFileSync(testFixture.databaseVerificationPath, "utf8"),
    );

    writeFileSync(testFixture.analyzerReceiptPath, "{malformed");
    assert.throws(
      () => buildCompactSweepDashboardExport(exportOptions(testFixture)),
      /malformed JSON/u,
    );

    writeJson(testFixture.analyzerReceiptPath, {
      ...validAnalyzer,
      status: "nonterminal",
    });
    assert.throws(
      () => buildCompactSweepDashboardExport(exportOptions(testFixture)),
      /non-terminal/u,
    );

    writeJson(testFixture.analyzerReceiptPath, validAnalyzer);
    writeJson(testFixture.databaseVerificationPath, {
      ...validVerification,
      campaigns: validVerification.campaigns.map((campaign, index) => ({
        ...campaign,
        campaignHash: index === 0 ? "0".repeat(64) : campaign.campaignHash,
      })),
    });
    assert.throws(
      () => buildCompactSweepDashboardExport(exportOptions(testFixture)),
      /campaign identities/u,
    );

    writeJson(testFixture.databaseVerificationPath, validVerification);
    writeJson(testFixture.analyzerReceiptPath, {
      ...validAnalyzer,
      schema: "unsupported/analyzer.v9",
    });
    assert.throws(
      () => buildCompactSweepDashboardExport(exportOptions(testFixture)),
      /unsupported analyzer receipt schema/u,
    );
  } finally {
    rmSync(testFixture.directory, { recursive: true, force: true });
  }
});

test("sealed 660-row active sweep retains the dashboard regression facts", (t) => {
  const databasePath = path.resolve(
    ".local-data/braid-analysis/compact-monte-carlo/family-sweep-v1/compact-campaigns.sqlite3",
  );
  if (!existsSync(databasePath)) {
    t.skip("sealed local compact sweep is not present");
    return;
  }
  const { data } = buildCompactSweepDashboardExport();
  assert.equal(data.summary.campaignCount, 44);
  assert.equal(data.summary.drawn, 660);
  assert.equal(data.summary.evaluated, 641);
  assert.equal(data.summary.nullScoreRows, 19);
  assert.deepEqual(data.summary.activeCohort, {
    compactPassed: 0,
    drawn: 660,
    evaluated: 641,
    memberCount: 20,
    nullScoreRows: 19,
  });
  assert.deepEqual(data.summary.deprecatedControls, {
    drawn: 0,
    evaluated: 0,
    memberIds: [],
  });
  assert.deepEqual(
    Object.fromEntries(data.summary.families.map((family) => [
      family.familyId,
      family.drawCount,
    ])),
    { A: 363, B: 99, C: 198 },
  );
  assert.equal(
    data.summary.members.every((member) => member.drawCount === 33),
    true,
  );
  assert.equal(
    data.summary.members.find((member) =>
      member.memberId === "A1.3").nullScoreCount,
    9,
  );
  assert.equal(
    data.summary.gateTotals.highLevel.surfaceQuadrature.passCount,
    0,
  );
  assert.equal(
    data.summary.gateTotals.surfaceQuadrature
      .frequencyResolvedWakeFlux.passCount,
    0,
  );
  assert.equal(
    data.summary.gateTotals.surfaceQuadrature
      .signedEmissionReference.passCount,
    641,
  );
  assert.equal(
    data.summary.gateTotals.surfaceQuadrature.radialExponent.passCount,
    2,
  );
  assert.equal(
    data.rows.some((row) => row.memberId === "B1.4"),
    false,
  );
  assert.equal(
    data.rows.every((row) =>
      row.candidateDisposition === "active-candidate"),
    true,
  );
  assert.ok(data.summary.etaExtEtaWakeFluxPearson > 0.9);
  const familyMedians = Object.fromEntries(data.summary.families.map(
    (family) => [family.familyId, family.medianWallSeconds],
  ));
  assert.ok(familyMedians.C / familyMedians.A > 1.7);
  assert.ok(familyMedians.C / familyMedians.B > 1.8);
});
