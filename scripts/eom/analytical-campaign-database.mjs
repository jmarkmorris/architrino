#!/usr/bin/env node

import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";
import { readFileSync, writeFileSync } from "node:fs";

import {
  backupAndVerifyAnalyticalCampaignDatabase,
  exportAnalyticalCampaign,
  importAnalyticalCampaign,
  inspectAnalyticalCampaignDatabase,
  openAnalyticalCampaignDatabase,
  verifyAnalyticalCampaignDatabase,
} from "../../src/prescribed-path-analysis/database/AnalyticalCampaignDatabase.mjs";
import {
  rebuildAllCandidateAnalyticalDatabase,
} from "../../src/prescribed-path-analysis/database/AnalyticalCampaignRebuild.mjs";
import {
  defaultCompactAnalyticalCampaignDatabasePath,
  exportCompactMonteCarloCampaign,
  importCompactMonteCarloCampaign,
  inspectCompactAnalyticalCampaignDatabase,
  openCompactAnalyticalCampaignDatabase,
  queryCompactAnalyticalCampaignCases,
  verifyCompactAnalyticalCampaignDatabase,
} from "../../src/prescribed-path-analysis/database/CompactAnalyticalCampaignDatabase.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

function fail(message) {
  throw new Error(message);
}

function parseArguments(args) {
  const command = args[0];
  if (!command) {
    fail(
      "a command is required: migrate, import-campaign, export-campaign, " +
      "verify, inspect, query-cases, or an explicit legacy-* command.",
    );
  }
  const values = new Map();
  for (let index = 1; index < args.length; index += 1) {
    const key = args[index];
    if (!key.startsWith("--")) fail(`unexpected argument ${key}.`);
    if (key === "--check" || key === "--publish" ||
        key === "--experimental-single-pass-raw-verification") {
      if (values.has(key)) fail(`${key} was supplied more than once.`);
      values.set(key, true);
      continue;
    }
    const value = args[index + 1];
    if (!value || value.startsWith("--")) fail(`${key} requires a value.`);
    if (values.has(key)) fail(`${key} was supplied more than once.`);
    values.set(key, value);
    index += 1;
  }
  return {
    command,
    values,
  };
}

function required(values, key) {
  const value = values.get(key);
  if (!value) fail(`${key} is required.`);
  return value;
}

function printResult(result) {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

function compactDatabasePath(values) {
  return path.resolve(
    values.get("--database") ??
      defaultCompactAnalyticalCampaignDatabasePath(),
  );
}

function legacyDatabasePath(values) {
  const databasePath = values.get("--database");
  if (!databasePath) {
    fail(
      "legacy raw-artifact commands require an explicit --database path; " +
      "the deleted BLOB-backed database is no longer a default.",
    );
  }
  const absolutePath = path.resolve(databasePath);
  if (absolutePath === defaultCompactAnalyticalCampaignDatabasePath() ||
      path.basename(absolutePath) === "compact-campaigns.sqlite3") {
    fail(
      "legacy raw-artifact commands may not target the compact control-plane " +
      "database path.",
    );
  }
  return absolutePath;
}

async function runCli() {
  const { command, values } = parseArguments(process.argv.slice(2));
  if (command === "migrate") {
    const databasePath = compactDatabasePath(values);
    const database = openCompactAnalyticalCampaignDatabase(databasePath);
    const userVersion = Number(database.prepare("PRAGMA user_version").get().user_version);
    const migrations = database.prepare(`
      SELECT migration_id, migration_ordinal, checksum_sha256 AS checksum,
             tool_version
      FROM compact_schema_migration ORDER BY migration_ordinal
    `).all();
    database.close();
    printResult({ databasePath, userVersion, migrations });
    return;
  }
  if (command === "import-campaign") {
    const databasePath = compactDatabasePath(values);
    const campaignPath = path.resolve(required(values, "--campaign"));
    const campaign = JSON.parse(readFileSync(campaignPath, "utf8"));
    const result = importCompactMonteCarloCampaign(
      databasePath,
      campaign,
      {
        ...(values.has("--journal-mode")
          ? { journalMode: values.get("--journal-mode") }
          : {}),
        ...(values.has("--synchronous")
          ? { synchronous: values.get("--synchronous") }
          : {}),
      },
    );
    printResult({ ...result, campaignPath });
    return;
  }
  if (command === "export-campaign") {
    const databasePath = compactDatabasePath(values);
    const { campaign: _campaign, ...result } =
      exportCompactMonteCarloCampaign(databasePath, {
        campaignHash: required(values, "--campaign-hash"),
        outputPath: required(values, "--output"),
      });
    printResult(result);
    return;
  }
  if (command === "verify") {
    const databasePath = compactDatabasePath(values);
    printResult(verifyCompactAnalyticalCampaignDatabase(databasePath, {
      ...(values.has("--campaign-hash")
        ? { campaignHash: values.get("--campaign-hash") }
        : {}),
    }));
    return;
  }
  if (command === "inspect") {
    printResult(inspectCompactAnalyticalCampaignDatabase(
      compactDatabasePath(values),
    ));
    return;
  }
  if (command === "query-cases") {
    const numericLimit = values.has("--limit")
      ? Number(values.get("--limit"))
      : undefined;
    printResult({
      databasePath: compactDatabasePath(values),
      cases: queryCompactAnalyticalCampaignCases(
        compactDatabasePath(values),
        {
          ...(values.has("--campaign-hash")
            ? { campaignHash: values.get("--campaign-hash") }
            : {}),
          ...(values.has("--case-id")
            ? { caseId: values.get("--case-id") }
            : {}),
          ...(values.has("--family-id")
            ? { familyId: values.get("--family-id") }
            : {}),
          ...(values.has("--member-id")
            ? { memberId: values.get("--member-id") }
            : {}),
          ...(values.has("--status-code")
            ? { statusCode: values.get("--status-code") }
            : {}),
          ...(values.has("--score-status-code")
            ? { scoreStatusCode: values.get("--score-status-code") }
            : {}),
          ...(values.has("--reason-code")
            ? { reasonCode: values.get("--reason-code") }
            : {}),
          ...(values.has("--score-hash")
            ? { scoreHash: values.get("--score-hash") }
            : {}),
          ...(values.has("--exact-source-hash")
            ? { exactSourceHash: values.get("--exact-source-hash") }
            : {}),
          ...(numericLimit == null ? {} : { limit: numericLimit }),
        },
      ),
    });
    return;
  }
  if (command === "rebuild-all") {
    fail(
      "rebuild-all is a legacy raw-artifact operation. Use " +
      "legacy-rebuild-all with an explicit --database path; it is not the " +
      "default local storage workflow.",
    );
  }
  if (command === "legacy-migrate") {
    const databasePath = legacyDatabasePath(values);
    const database = openAnalyticalCampaignDatabase(databasePath);
    const userVersion = Number(database.prepare("PRAGMA user_version").get().user_version);
    const migrations = database.prepare(`
      SELECT migration_id, migration_ordinal, lower(hex(checksum)) AS checksum,
             tool_version
      FROM schema_migration ORDER BY migration_ordinal
    `).all();
    database.close();
    printResult({ legacy: true, databasePath, userVersion, migrations });
    return;
  }
  if (command === "legacy-import-campaign") {
    const databasePath = legacyDatabasePath(values);
    const importStartedAt = performance.now();
    const batchSize = values.has("--batch-size")
      ? Number(values.get("--batch-size"))
      : undefined;
    const rawArtifactTransactionBatchSize =
      values.has("--experimental-raw-artifact-transaction-batch-size")
        ? Number(values.get("--experimental-raw-artifact-transaction-batch-size"))
        : undefined;
    printResult(importAnalyticalCampaign(databasePath, {
      manifestPath: required(values, "--manifest"),
      summaryPath: required(values, "--summary"),
      ...(values.has("--packet-directory")
        ? { packetDirectory: values.get("--packet-directory") }
        : {}),
      ...(values.has("--experimental-raw-artifact-import-mode")
        ? {
            experimentalRawArtifactImportMode:
              values.get("--experimental-raw-artifact-import-mode"),
          }
        : {}),
      ...(rawArtifactTransactionBatchSize == null
        ? {}
        : { experimentalRawArtifactTransactionBatchSize:
            rawArtifactTransactionBatchSize }),
      ...(values.has("--experimental-journal-mode")
        ? { experimentalJournalMode:
            values.get("--experimental-journal-mode") }
        : {}),
      ...(values.has("--experimental-synchronous")
        ? { experimentalSynchronous:
            values.get("--experimental-synchronous") }
        : {}),
      ...(batchSize == null ? {} : { batchSize }),
      onProgress(progress) {
        process.stderr.write(`${JSON.stringify({
          heartbeat: "analytical-campaign-import",
          ...progress,
          wallSeconds: (performance.now() - importStartedAt) / 1_000,
        })}\n`);
      },
      onBatchCommitted(progress) {
        process.stderr.write(`${JSON.stringify({
          heartbeat: "analytical-campaign-ingest",
          ...progress,
          wallSeconds: (performance.now() - importStartedAt) / 1_000,
        })}\n`);
      },
      onRawArtifactBatchCommitted(progress) {
        process.stderr.write(`${JSON.stringify({
          heartbeat: "analytical-campaign-raw-artifact-commit",
          ...progress,
          wallSeconds: (performance.now() - importStartedAt) / 1_000,
        })}\n`);
      },
    }));
    return;
  }
  if (command === "legacy-rebuild-all") {
    const databasePath = legacyDatabasePath(values);
    const check = values.has("--check");
    const publish = values.has("--publish");
    if (check === publish) {
      fail("legacy-rebuild-all requires exactly one of --check or --publish.");
    }
    const report = await rebuildAllCandidateAnalyticalDatabase({
      databasePath,
      mode: publish ? "publish" : "check",
      ...(values.has("--registry")
        ? { registryPath: values.get("--registry") }
        : {}),
      onProgress(progress) {
        process.stderr.write(`${JSON.stringify({
          heartbeat: "analytical-campaign-rebuild",
          ...progress,
        })}\n`);
      },
    });
    if (values.has("--profile-output")) {
      const profilePath = path.resolve(values.get("--profile-output"));
      writeFileSync(profilePath, `${JSON.stringify(report, null, 2)}\n`);
    }
    printResult(report);
    return;
  }
  if (command === "legacy-export-campaign") {
    const databasePath = legacyDatabasePath(values);
    const exportStartedAt = performance.now();
    printResult(exportAnalyticalCampaign(databasePath, {
      manifestHash: required(values, "--manifest-hash"),
      outputDirectory: required(values, "--output-directory"),
      onProgress(progress) {
        process.stderr.write(`${JSON.stringify({
          heartbeat: "analytical-campaign-export",
          ...progress,
          wallSeconds: (performance.now() - exportStartedAt) / 1_000,
        })}\n`);
      },
    }));
    return;
  }
  if (command === "legacy-verify") {
    const databasePath = legacyDatabasePath(values);
    const verifyStartedAt = performance.now();
    printResult(verifyAnalyticalCampaignDatabase(databasePath, {
      experimentalSinglePassRawArtifactVerification:
        values.has("--experimental-single-pass-raw-verification"),
      onProgress(progress) {
        process.stderr.write(`${JSON.stringify({
          heartbeat: "analytical-campaign-verify",
          ...progress,
          wallSeconds: (performance.now() - verifyStartedAt) / 1_000,
        })}\n`);
      },
    }));
    return;
  }
  if (command === "legacy-inspect") {
    const databasePath = legacyDatabasePath(values);
    printResult(inspectAnalyticalCampaignDatabase(databasePath));
    return;
  }
  if (command === "legacy-backup") {
    const databasePath = legacyDatabasePath(values);
    printResult(await backupAndVerifyAnalyticalCampaignDatabase(
      databasePath,
      required(values, "--output"),
    ));
    return;
  }
  fail(`unknown analytical campaign database command ${command}.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  await runCli();
}
