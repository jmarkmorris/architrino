#!/usr/bin/env node

import {
  mkdirSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

import {
  buildCommonAxisBraidPilotCampaign,
  exportAnalyticalCampaign,
  importAnalyticalCampaign,
  recordAnalyticalDatabaseGeneration,
  serializeCommonAxisBraidPilotReport,
  sha256Canonical,
} from "../../src/prescribed-path-analysis/index.mjs";

const REPOSITORY_ROOT = path.resolve(import.meta.dirname, "../..");
const DEFAULT_OUTPUT = path.join(
  REPOSITORY_ROOT,
  ".local-data/braid-analysis/common-axis-braid-pilot",
);
const DEFAULT_DATABASE = path.join(
  REPOSITORY_ROOT,
  ".local-data/braid-analysis/common-axis-braid-pilot.sqlite",
);
const DEFAULT_PROTOCOL = path.join(
  REPOSITORY_ROOT,
  "src/prescribed-path-analysis/protocols/common-axis-braid-pilot-protocol.v2.json",
);
const REBUILD_VERSION =
  "prescribed-record-analytics/common-axis-braid-pilot-rebuild/v2";

function fail(message) {
  throw new Error(message);
}

function parseArguments(argv) {
  const options = {
    outputDirectory: DEFAULT_OUTPUT,
    databasePath: DEFAULT_DATABASE,
    protocolPath: DEFAULT_PROTOCOL,
    includeNeighborhoodSamples: true,
    importDatabase: true,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--references-only") {
      options.includeNeighborhoodSamples = false;
      continue;
    }
    if (argument === "--no-import") {
      options.importDatabase = false;
      continue;
    }
    if (["--output", "--database", "--protocol"].includes(argument)) {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) fail(`${argument} requires a path.`);
      index += 1;
      if (argument === "--output") options.outputDirectory = path.resolve(value);
      if (argument === "--database") options.databasePath = path.resolve(value);
      if (argument === "--protocol") options.protocolPath = path.resolve(value);
      continue;
    }
    fail(`unsupported argument ${argument}.`);
  }
  return options;
}

function progressLine(progress) {
  const count = progress.totalCandidates
    ? ` ${progress.completedCandidates ?? 0}/${progress.totalCandidates}`
    : "";
  const candidate = progress.candidateId ? ` ${progress.candidateId}` : "";
  return `[common-axis-braid]${count}${candidate} ${progress.stage}`;
}

export function runCommonAxisBraidPilot(options = {}) {
  const campaign = buildCommonAxisBraidPilotCampaign({
    outputDirectory: options.outputDirectory ?? DEFAULT_OUTPUT,
    protocolPath: options.protocolPath ?? DEFAULT_PROTOCOL,
    includeNeighborhoodSamples: options.includeNeighborhoodSamples !== false,
    onProgress: options.onProgress,
  });
  const reportPath = path.join(campaign.outputDirectory, "pilot-report.v1.json");
  const database = options.importDatabase === false
    ? null
    : importAnalyticalCampaign(options.databasePath ?? DEFAULT_DATABASE, {
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
      });
  let generation = null;
  let exported = null;
  if (database) {
    const registry = {
      schema: "prescribed-path-analysis/common-axis-braid-pilot-registry.v2",
      registryId: "common-axis-braid-pilot.v2",
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
      options.databasePath ?? DEFAULT_DATABASE,
      {
        registryBytes,
        evidence,
        rebuildInstrumentVersion: REBUILD_VERSION,
      },
    );
    const exportDirectory = path.join(campaign.outputDirectory, "database-export");
    exported = exportAnalyticalCampaign(options.databasePath ?? DEFAULT_DATABASE, {
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
      databasePath: database ? path.resolve(options.databasePath ?? DEFAULT_DATABASE) : null,
      databaseImport: database,
      databaseGeneration: generation,
      deterministicExport: exported,
    },
  };
  mkdirSync(path.dirname(reportPath), { recursive: true });
  writeFileSync(reportPath, serializeCommonAxisBraidPilotReport(finalReport));
  return { campaign, report: finalReport, reportPath };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) {
  const options = parseArguments(process.argv.slice(2));
  const result = runCommonAxisBraidPilot({
    ...options,
    onProgress(progress) {
      process.stderr.write(`${progressLine(progress)}\n`);
    },
  });
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
