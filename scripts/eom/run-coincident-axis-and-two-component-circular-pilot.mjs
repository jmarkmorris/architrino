#!/usr/bin/env node

import {
  existsSync,
  mkdirSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

import {
  buildCoincidentAxisAndTwoComponentCircularPilotCampaign,
  exportAnalyticalCampaign,
  importAnalyticalCampaign,
  recordAnalyticalDatabaseGeneration,
  serializeCoincidentAxisAndTwoComponentCircularPilotReport,
  sha256Canonical,
} from "../../src/prescribed-path-analysis/index.mjs";

const REPOSITORY_ROOT = path.resolve(import.meta.dirname, "../..");
const DEFAULT_PROTOCOL = path.join(
  REPOSITORY_ROOT,
  "src/prescribed-path-analysis/protocols/coincident-axis-and-two-component-circular-pilot-protocol.v3.json",
);
const REBUILD_VERSION =
  "prescribed-record-analytics/coincident-axis-and-two-component-circular-pilot-rebuild/v3";

function fail(message) {
  throw new Error(message);
}

function parseArguments(argv) {
  const options = {
    help: false,
    noImport: false,
    outputDirectory: null,
    databasePath: null,
    protocolPath: DEFAULT_PROTOCOL,
    includeNeighborhoodSamples: true,
    importDatabase: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--help") {
      options.help = true;
      continue;
    }
    if (argument === "--references-only") {
      options.includeNeighborhoodSamples = false;
      continue;
    }
    if (argument === "--no-import") {
      options.noImport = true;
      continue;
    }
    if (["--output", "--database", "--protocol"].includes(argument)) {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) fail(`${argument} requires a path.`);
      index += 1;
      if (argument === "--output") options.outputDirectory = path.resolve(value);
      if (argument === "--database") {
        options.databasePath = path.resolve(value);
      }
      if (argument === "--protocol") options.protocolPath = path.resolve(value);
      continue;
    }
    fail(`unsupported argument ${argument}.`);
  }
  if (!options.help && !options.outputDirectory) {
    fail("--output is required; parallel campaigns may not use a shared default directory.");
  }
  options.importDatabase = options.databasePath !== null && !options.noImport;
  if (options.importDatabase && !options.databasePath) {
    fail("database import requires an explicit --database path.");
  }
  return options;
}

function printHelp() {
  process.stdout.write([
    "Usage:",
    "  node scripts/eom/run-coincident-axis-and-two-component-circular-pilot.mjs",
    "    --output UNIQUE_DIRECTORY",
    "    [--database UNIQUE_DATABASE]",
    "    [--protocol PATH]",
    "    [--references-only]",
    "    [--no-import]",
    "",
    "The output directory is required and reserved exclusively. Database import",
    "is disabled unless an explicit unique --database path is supplied.",
  ].join("\n") + "\n");
}

function acquireRunDirectoryLease(outputDirectory, databasePath) {
  if (existsSync(outputDirectory)) fail(`${outputDirectory} already exists.`);
  if (databasePath && existsSync(databasePath)) {
    fail(`${databasePath} already exists.`);
  }
  mkdirSync(path.dirname(outputDirectory), { recursive: true });
  mkdirSync(outputDirectory, { recursive: false });
  const leasePath = path.join(outputDirectory, "RUNNING.lock");
  writeFileSync(leasePath, `${JSON.stringify({
    schema:
      "prescribed-path-analysis/coincident-axis-and-two-component-circular-run-lease.v1",
    outputDirectory,
    databasePath,
    pid: process.pid,
    host: process.env.HOSTNAME ?? null,
    startedAt: new Date().toISOString(),
    argv: process.argv.slice(2),
    recovery:
      "inspect the recorded process identity and partial artifacts before removing a stale lease",
  }, null, 2)}\n`, { flag: "wx" });
  return leasePath;
}

function progressLine(progress) {
  const count = progress.totalCandidates
    ? ` ${progress.completedCandidates ?? 0}/${progress.totalCandidates}`
    : "";
  const candidate = progress.candidateId ? ` ${progress.candidateId}` : "";
  return `[coincident-axis-and-two-component-circular]${count}${candidate} ${progress.stage}`;
}

export function runCoincidentAxisAndTwoComponentCircularPilot(options = {}) {
  if (!options.outputDirectory) fail("outputDirectory is required.");
  const campaign = buildCoincidentAxisAndTwoComponentCircularPilotCampaign({
    outputDirectory: options.outputDirectory,
    protocolPath: options.protocolPath ?? DEFAULT_PROTOCOL,
    includeNeighborhoodSamples: options.includeNeighborhoodSamples !== false,
    onProgress: options.onProgress,
  });
  const reportPath = path.join(campaign.outputDirectory, "pilot-report.v1.json");
  const database = options.importDatabase === true
    ? importAnalyticalCampaign(options.databasePath, {
        manifestPath: campaign.manifestPath,
        summaryPath: campaign.summaryPath,
        packetDirectory: campaign.packetDirectory,
        repositoryRoot: REPOSITORY_ROOT,
        onProgress(progress) {
          options.onProgress?.({
            ...progress,
            stage: `database-${progress.stage}`,
          });
        },
        onBatchCommitted(progress) {
          options.onProgress?.({
            ...progress,
            stage: "database-import-batch-committed",
          });
        },
      })
    : null;
  let generation = null;
  let exported = null;
  if (database) {
    const registry = {
      schema: "prescribed-path-analysis/coincident-axis-and-two-component-circular-pilot-registry.v3",
      registryId: "coincident-axis-and-two-component-circular-pilot.v3",
      campaignId: campaign.manifest.campaignId,
      manifestHash: campaign.manifestHash,
      caseIds: campaign.summary.cases.map((row) => row.caseId),
    };
    const registryBytes = Buffer.from(`${JSON.stringify(registry, null, 2)}\n`);
    const evidence = {
      schema: "prescribed-record-analytics/database-generation-evidence.v1",
      registryId: registry.registryId,
      registryHash: sha256Canonical(registry),
      requiredCampaignCount: 1,
      observedCampaignCount: 1,
      requiredCandidateCount: database.caseCount,
      observedCandidateCount: database.caseCount,
      acceptedCandidateCount: database.acceptedCaseCount,
      rejectedCandidateCount: database.rejectedCaseCount,
      campaigns: [{
        campaignId: campaign.manifest.campaignId,
        manifestHash: campaign.manifestHash,
        caseCount: database.caseCount,
      }],
    };
    generation = recordAnalyticalDatabaseGeneration(
      options.databasePath,
      {
        registryBytes,
        evidence,
        rebuildInstrumentVersion: REBUILD_VERSION,
      },
    );
    const exportDirectory = path.join(campaign.outputDirectory, "database-export");
    exported = exportAnalyticalCampaign(options.databasePath, {
      manifestHash: campaign.manifestHash,
      outputDirectory: exportDirectory,
    });
  }
  const finalReport = {
    ...campaign.report,
    artifacts: {
      manifestPath: campaign.manifestPath,
      manifestHash: campaign.manifestHash,
      summaryPath: campaign.summaryPath,
      databasePath: database ? path.resolve(options.databasePath) : null,
      databaseImport: database,
      databaseGeneration: generation,
      deterministicExport: exported,
    },
  };
  mkdirSync(path.dirname(reportPath), { recursive: true });
  writeFileSync(reportPath, serializeCoincidentAxisAndTwoComponentCircularPilotReport(finalReport));
  return { campaign, report: finalReport, reportPath };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    printHelp();
    process.exit(0);
  }
  const leasePath = acquireRunDirectoryLease(
    options.outputDirectory,
    options.importDatabase ? options.databasePath : null,
  );
  const result = runCoincidentAxisAndTwoComponentCircularPilot({
    ...options,
    onProgress(progress) {
      process.stderr.write(`${progressLine(progress)}\n`);
    },
  });
  unlinkSync(leasePath);
  process.stdout.write(`${JSON.stringify({
    reportPath: result.reportPath,
    manifestHash: result.campaign.manifestHash,
    candidateCount: result.report.candidateCount,
    acceptedCount: result.report.acceptedCount,
    rejectedCount: result.report.rejectedCount,
    databaseGenerationHash:
      result.report.artifacts.databaseGeneration?.generationHash ?? null,
  }, null, 2)}\n`);
}
