import assert from "node:assert/strict";
import {
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";

import {
  assertCompactAnalyticalCampaignDatabasePath,
  defaultCompactAnalyticalCampaignDatabasePath,
  exportCompactMonteCarloCampaign,
  importCompactMonteCarloCampaign,
  inspectCompactAnalyticalCampaignDatabase,
  queryCompactAnalyticalCampaignCases,
  verifyCompactAnalyticalCampaignDatabase,
} from "../src/prescribed-path-analysis/database/CompactAnalyticalCampaignDatabase.mjs";
import {
  buildTestCompactMonteCarloCampaign,
} from "./support/compact-monte-carlo-fixture.mjs";

test("compact SQLite import, query, and export retain exact null-score cases", () => {
  const directory = mkdtempSync(resolve(tmpdir(), "architrino-compact-db-test-"));
  const databasePath = resolve(directory, "compact.sqlite3");
  const firstExportPath = resolve(directory, "export-1.json");
  const secondExportPath = resolve(directory, "export-2.json");
  // The database contract begins at the serialized campaign boundary. JSON
  // itself normalizes negative zero before the importer receives the row.
  const campaign = JSON.parse(JSON.stringify(
    buildTestCompactMonteCarloCampaign(),
  ));

  try {
    const imported = importCompactMonteCarloCampaign(databasePath, campaign);
    assert.equal(imported.inserted, true);
    assert.equal(imported.transactionCount, 1);
    assert.equal(imported.insertStatementCount, 4);
    assert.equal(imported.notEvaluatedCount, 1);
    assert.equal(imported.journalMode, "DELETE");
    assert.equal(imported.synchronous, "NORMAL");

    const repeated = importCompactMonteCarloCampaign(databasePath, campaign);
    assert.equal(repeated.inserted, false);
    assert.equal(repeated.insertStatementCount, 0);

    const rejected = queryCompactAnalyticalCampaignCases(databasePath, {
      statusCode: "drawn-not-evaluated",
    });
    assert.equal(rejected.length, 1);
    assert.equal(rejected[0].score, null);
    assert.equal(rejected[0].scoreHash, null);
    assert.equal(
      rejected[0].evaluationStatus.reasonCode,
      "event-convergence-gate-failed",
    );
    assert.equal(
      rejected[0].exactRerunInstruction.sampledSpecHash.length,
      64,
    );
    assert.equal(
      rejected[0].exactRerunInstruction.implementationIdentity
        .implementationHash,
      campaign.implementationIdentity.implementationHash,
    );
    assert.deepEqual(rejected[0].verificationReceipt, {
      schema: "test/compact-verification-receipt.v1",
      check: "serialized-row-hash-bound",
      passed: true,
    });
    const failedScores = queryCompactAnalyticalCampaignCases(databasePath, {
      scoreStatusCode: "compact-coverage-gate-failed",
    });
    assert.equal(failedScores.length, 1);
    assert.equal(failedScores[0].score.status.passed, false);
    assert.deepEqual(
      failedScores[0].score.status.failedGates,
      ["convergence"],
    );

    const firstExport = exportCompactMonteCarloCampaign(databasePath, {
      campaignHash: campaign.campaignHash,
      outputPath: firstExportPath,
    });
    const secondExport = exportCompactMonteCarloCampaign(databasePath, {
      campaignHash: campaign.campaignHash,
      outputPath: secondExportPath,
    });
    assert.equal(firstExport.outputSha256, secondExport.outputSha256);
    assert.deepEqual(
      JSON.parse(readFileSync(firstExportPath, "utf8")),
      campaign,
    );
    assert.deepEqual(
      readFileSync(firstExportPath),
      readFileSync(secondExportPath),
    );

    const verification =
      verifyCompactAnalyticalCampaignDatabase(databasePath);
    assert.equal(verification.integrity, "ok");
    assert.equal(verification.foreignKeyViolationCount, 0);
    assert.equal(verification.prohibitedBlobColumnCount, 0);
    assert.equal(verification.campaigns[0].notEvaluatedCount, 1);

    const inspection = inspectCompactAnalyticalCampaignDatabase(databasePath);
    assert.equal(inspection.journalMode, "DELETE");
    assert.equal(inspection.walBytes, 0);
    assert.equal(inspection.sharedMemoryBytes, 0);

    const database = new DatabaseSync(databasePath, { readOnly: true });
    const tables = database.prepare(`
      SELECT name FROM sqlite_schema WHERE type = 'table' ORDER BY name
    `).all().map((row) => row.name);
    assert.equal(tables.includes("artifact"), false);
    assert.equal(tables.includes("analytical_raw_artifact"), false);
    for (const tableName of tables) {
      const columns = database.prepare(`PRAGMA table_info("${tableName}")`).all();
      assert.equal(
        columns.some((column) =>
          String(column.type).toUpperCase().includes("BLOB")),
        false,
      );
    }
    database.close();
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("database CLI uses compact commands and makes legacy rebuild explicit", () => {
  const directory = mkdtempSync(resolve(tmpdir(), "architrino-compact-cli-test-"));
  const databasePath = resolve(directory, "compact.sqlite3");
  const campaignPath = resolve(directory, "campaign.json");
  const exportPath = resolve(directory, "export.json");
  const campaign = JSON.parse(JSON.stringify(
    buildTestCompactMonteCarloCampaign(),
  ));
  writeFileSync(campaignPath, `${JSON.stringify(campaign)}\n`);

  try {
    assert.equal(
      defaultCompactAnalyticalCampaignDatabasePath().endsWith(
        "/.local-data/braid-analysis/compact-campaigns.sqlite3",
      ),
      true,
    );
    assert.throws(
      () => assertCompactAnalyticalCampaignDatabasePath(
        resolve(directory, "analytical-campaigns.sqlite3"),
      ),
      /reserved for the explicit legacy raw-artifact schema/,
    );
    const imported = spawnSync(process.execPath, [
      "scripts/eom/analytical-campaign-database.mjs",
      "import-campaign",
      "--database",
      databasePath,
      "--campaign",
      campaignPath,
    ], {
      cwd: resolve(import.meta.dirname, ".."),
      encoding: "utf8",
    });
    assert.equal(imported.status, 0, imported.stderr);
    const importReport = JSON.parse(imported.stdout);
    assert.equal(importReport.journalMode, "DELETE");
    assert.equal(importReport.notEvaluatedCount, 1);

    const exported = spawnSync(process.execPath, [
      "scripts/eom/analytical-campaign-database.mjs",
      "export-campaign",
      "--database",
      databasePath,
      "--campaign-hash",
      campaign.campaignHash,
      "--output",
      exportPath,
    ], {
      cwd: resolve(import.meta.dirname, ".."),
      encoding: "utf8",
    });
    assert.equal(exported.status, 0, exported.stderr);
    assert.deepEqual(JSON.parse(readFileSync(exportPath)), campaign);

    const legacyWithoutPath = spawnSync(process.execPath, [
      "scripts/eom/analytical-campaign-database.mjs",
      "legacy-rebuild-all",
      "--check",
    ], {
      cwd: resolve(import.meta.dirname, ".."),
      encoding: "utf8",
    });
    assert.notEqual(legacyWithoutPath.status, 0);
    assert.match(
      legacyWithoutPath.stderr,
      /require an explicit --database path/,
    );

    const obsoleteDefault = spawnSync(process.execPath, [
      "scripts/eom/analytical-campaign-database.mjs",
      "rebuild-all",
      "--check",
    ], {
      cwd: resolve(import.meta.dirname, ".."),
      encoding: "utf8",
    });
    assert.notEqual(obsoleteDefault.status, 0);
    assert.match(obsoleteDefault.stderr, /legacy raw-artifact operation/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
