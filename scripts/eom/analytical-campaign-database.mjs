#!/usr/bin/env node

import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";
import { writeFileSync } from "node:fs";

import {
  backupAndVerifyAnalyticalCampaignDatabase,
  defaultAnalyticalCampaignDatabasePath,
  exportAnalyticalCampaign,
  importAnalyticalCampaign,
  inspectAnalyticalCampaignDatabase,
  openAnalyticalCampaignDatabase,
  verifyAnalyticalCampaignDatabase,
} from "../../src/prescribed-path-analysis/database/AnalyticalCampaignDatabase.mjs";
import {
  rebuildAllCandidateAnalyticalDatabase,
} from "../../src/prescribed-path-analysis/database/AnalyticalCampaignRebuild.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

function fail(message) {
  throw new Error(message);
}

function parseArguments(args) {
  const command = args[0];
  if (!command) fail("a command is required: migrate, import-campaign, rebuild-all, export-campaign, verify, inspect, or backup.");
  const values = new Map();
  for (let index = 1; index < args.length; index += 1) {
    const key = args[index];
    if (!key.startsWith("--")) fail(`unexpected argument ${key}.`);
    if (key === "--check" || key === "--publish") {
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
    databasePath: path.resolve(
      values.get("--database") ?? defaultAnalyticalCampaignDatabasePath(),
    ),
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

async function runCli() {
  const { command, databasePath, values } = parseArguments(process.argv.slice(2));
  if (command === "migrate") {
    const database = openAnalyticalCampaignDatabase(databasePath);
    const userVersion = Number(database.prepare("PRAGMA user_version").get().user_version);
    const migrations = database.prepare(`
      SELECT migration_id, migration_ordinal, lower(hex(checksum)) AS checksum,
             tool_version
      FROM schema_migration ORDER BY migration_ordinal
    `).all();
    database.close();
    printResult({ databasePath, userVersion, migrations });
    return;
  }
  if (command === "import-campaign") {
    const importStartedAt = performance.now();
    const batchSize = values.has("--batch-size")
      ? Number(values.get("--batch-size"))
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
    }));
    return;
  }
  if (command === "rebuild-all") {
    const check = values.has("--check");
    const publish = values.has("--publish");
    if (check === publish) fail("rebuild-all requires exactly one of --check or --publish.");
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
  if (command === "export-campaign") {
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
  if (command === "verify") {
    const verifyStartedAt = performance.now();
    printResult(verifyAnalyticalCampaignDatabase(databasePath, {
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
  if (command === "inspect") {
    printResult(inspectAnalyticalCampaignDatabase(databasePath));
    return;
  }
  if (command === "backup") {
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
