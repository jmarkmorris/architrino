import {
  closeSync,
  copyFileSync,
  existsSync,
  fsyncSync,
  linkSync,
  mkdirSync,
  mkdtempSync,
  openSync,
  renameSync,
  rmSync,
  unlinkSync,
} from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

import {
  DEFAULT_ALL_CANDIDATE_CAMPAIGN_REGISTRY_PATH,
  buildAllCandidateAnalyticalCampaign,
  writeAllCandidateAnalyticalCampaign,
} from "../AllCandidateAnalyticalCampaign.mjs";
import {
  assertAnalyticalCampaignDatabasePath,
  defaultAnalyticalCampaignDatabasePath,
  exportAnalyticalCampaign,
  importAnalyticalCampaign,
  inspectAnalyticalCampaignDatabase,
  openAnalyticalCampaignDatabase,
  recordAnalyticalDatabaseGeneration,
  verifyAnalyticalCampaignDatabase,
} from "./AnalyticalCampaignDatabase.mjs";

export const ANALYTICAL_CAMPAIGN_REBUILD_VERSION =
  "prescribed-record-analytics/all-candidate-rebuild.v1";

function fail(message) {
  throw new Error(message);
}

function injectFailure(options, point) {
  if (options.failureInjection === point) {
    fail(`injected analytical rebuild failure at ${point}.`);
  }
}

function removeIfPresent(filePath) {
  rmSync(filePath, { force: true });
}

function checkpointClosedDatabase(databasePath) {
  if (!existsSync(databasePath)) return;
  const database = new DatabaseSync(databasePath);
  try {
    database.exec("PRAGMA busy_timeout = 5000");
    database.prepare("PRAGMA wal_checkpoint(TRUNCATE)").all();
  } finally {
    database.close();
  }
  removeIfPresent(`${databasePath}-wal`);
  removeIfPresent(`${databasePath}-shm`);
}

function flushFile(filePath) {
  const descriptor = openSync(filePath, "r");
  try {
    fsyncSync(descriptor);
  } finally {
    closeSync(descriptor);
  }
}

function flushDirectory(directoryPath) {
  const descriptor = openSync(directoryPath, "r");
  try {
    fsyncSync(descriptor);
  } finally {
    closeSync(descriptor);
  }
}

function publishDatabase(stagedDatabasePath, targetDatabasePath, options) {
  checkpointClosedDatabase(stagedDatabasePath);
  flushFile(stagedDatabasePath);
  mkdirSync(path.dirname(targetDatabasePath), { recursive: true });
  checkpointClosedDatabase(targetDatabasePath);
  const rollbackPath = `${targetDatabasePath}.rollback-${process.pid}`;
  removeIfPresent(rollbackPath);
  const targetExisted = existsSync(targetDatabasePath);
  if (targetExisted) {
    try {
      linkSync(targetDatabasePath, rollbackPath);
    } catch {
      copyFileSync(targetDatabasePath, rollbackPath);
      flushFile(rollbackPath);
    }
  }
  try {
    renameSync(stagedDatabasePath, targetDatabasePath);
    flushDirectory(path.dirname(targetDatabasePath));
    injectFailure(options, "after-swap");
    const verification = verifyAnalyticalCampaignDatabase(targetDatabasePath, options);
    removeIfPresent(rollbackPath);
    return verification;
  } catch (error) {
    if (existsSync(rollbackPath)) {
      renameSync(rollbackPath, targetDatabasePath);
      flushDirectory(path.dirname(targetDatabasePath));
    } else if (!targetExisted) {
      removeIfPresent(targetDatabasePath);
      flushDirectory(path.dirname(targetDatabasePath));
    }
    throw error;
  } finally {
    removeIfPresent(rollbackPath);
    removeIfPresent(`${targetDatabasePath}-wal`);
    removeIfPresent(`${targetDatabasePath}-shm`);
  }
}

function assertStagedCompleteness(databasePath, campaign, importResults, options) {
  const verification = verifyAnalyticalCampaignDatabase(databasePath, options);
  const database = openAnalyticalCampaignDatabase(databasePath, {
    ...options,
    readOnly: true,
    migrate: false,
  });
  try {
    const campaignCount = Number(database.prepare(`
      SELECT COUNT(*) AS count FROM campaign_manifest
    `).get().count);
    const candidateCampaign = database.prepare(`
      SELECT manifest_hash FROM campaign_manifest WHERE campaign_id = ?
    `).get(campaign.manifest.campaignId);
    if (!candidateCampaign || campaignCount !== importResults.length) {
      fail("staged database campaign inventory is incomplete.");
    }
    const candidateCounts = database.prepare(`
      SELECT COUNT(*) AS observed_candidate_count,
             SUM(CASE WHEN case_acceptance.accepted = 1 THEN 1 ELSE 0 END)
               AS accepted_candidate_count,
             SUM(CASE WHEN case_acceptance.accepted = 0 THEN 1 ELSE 0 END)
               AS rejected_candidate_count,
             SUM(CASE WHEN source_record.source_hash_verification_state =
               'exact-preimage-verified' THEN 1 ELSE 0 END)
               AS exact_source_count
      FROM campaign_case
      JOIN case_acceptance USING (result_hash)
      JOIN source_record USING (source_hash)
      WHERE campaign_case.manifest_hash = ?
    `).get(candidateCampaign.manifest_hash);
    if (Number(candidateCounts.observed_candidate_count) !== campaign.candidates.length ||
        Number(candidateCounts.accepted_candidate_count) !==
          campaign.acceptedCandidateCount ||
        Number(candidateCounts.rejected_candidate_count) !==
          campaign.rejectedCandidateCount ||
        Number(candidateCounts.exact_source_count) !== campaign.candidates.length) {
      fail("staged database candidate inventory or exact-source coverage is incomplete.");
    }
    return {
      verification,
      campaignCount,
      observedCandidateCount: Number(candidateCounts.observed_candidate_count),
      acceptedCandidateCount: Number(candidateCounts.accepted_candidate_count),
      rejectedCandidateCount: Number(candidateCounts.rejected_candidate_count),
    };
  } finally {
    database.close();
  }
}

function deterministicExportCheck(databasePath, importResults, exportRoot, options) {
  const exports = importResults.map((result) => exportAnalyticalCampaign(
    databasePath,
    {
      ...options,
      manifestHash: result.manifestHash,
      outputDirectory: path.join(exportRoot, result.manifestHash),
    },
  ));
  if (exports.length !== importResults.length ||
      exports.some((row) => row.caseCount < 1 || !row.inventoryHash)) {
    fail("staged database deterministic export inventory is incomplete.");
  }
  return exports;
}

function summarizeRuntimeTimings(runtimeTimings = [], rebuildPhaseTimings = []) {
  const stageTotals = new Map();
  const candidateTotals = [];
  for (const timing of runtimeTimings) {
    if (timing.stage === "candidate-total") {
      candidateTotals.push({
        candidateId: timing.candidateId,
        wallSeconds: timing.wallSeconds,
      });
      continue;
    }
    const current = stageTotals.get(timing.stage) ?? {
      stage: timing.stage,
      candidateCount: 0,
      wallSeconds: 0,
      maximumCandidateWallSeconds: 0,
    };
    current.candidateCount += 1;
    current.wallSeconds += timing.wallSeconds;
    current.maximumCandidateWallSeconds = Math.max(
      current.maximumCandidateWallSeconds,
      timing.wallSeconds,
    );
    stageTotals.set(timing.stage, current);
  }
  return {
    measurement: "serial-candidate-stage-wall-clock.v1",
    measuredRebuildWallSeconds: rebuildPhaseTimings.reduce(
      (sum, row) => sum + row.wallSeconds,
      0,
    ),
    rebuildPhaseTimings: [...rebuildPhaseTimings].sort(
      (left, right) => right.wallSeconds - left.wallSeconds,
    ),
    totalCandidateWallSeconds: candidateTotals.reduce(
      (sum, row) => sum + row.wallSeconds,
      0,
    ),
    candidateTotals: candidateTotals.sort(
      (left, right) => right.wallSeconds - left.wallSeconds,
    ),
    stageTotals: [...stageTotals.values()].sort(
      (left, right) => right.wallSeconds - left.wallSeconds,
    ),
  };
}

export async function rebuildAllCandidateAnalyticalDatabase(options = {}) {
  const mode = options.mode ?? "check";
  if (mode !== "check" && mode !== "publish") {
    throw new TypeError("analytical rebuild mode must be check or publish.");
  }
  const registryPath = path.resolve(
    options.registryPath ?? DEFAULT_ALL_CANDIDATE_CAMPAIGN_REGISTRY_PATH,
  );
  const targetDatabasePath = assertAnalyticalCampaignDatabasePath(
    path.resolve(options.databasePath ?? defaultAnalyticalCampaignDatabasePath()),
    options,
  );
  const runtimeDirectory = path.dirname(targetDatabasePath);
  mkdirSync(runtimeDirectory, { recursive: true });
  const lockPath = `${targetDatabasePath}.rebuild.lock`;
  let lockDescriptor;
  try {
    lockDescriptor = openSync(lockPath, "wx");
  } catch {
    fail(`analytical rebuild lock already exists: ${lockPath}`);
  }
  const stagingDirectory = mkdtempSync(path.join(runtimeDirectory, ".rebuild-"));
  const stagedDatabasePath = path.join(stagingDirectory, "analytical-campaigns.sqlite3");
  const generatedCampaignDirectory = path.join(stagingDirectory, "generated-campaign");
  const exportDirectory = path.join(stagingDirectory, "exports");
  let published = false;
  try {
    const rebuildPhaseTimings = [];
    let phaseStartedAt = Date.now();
    function completePhase(stage) {
      const now = Date.now();
      rebuildPhaseTimings.push({
        stage,
        wallSeconds: (now - phaseStartedAt) / 1000,
      });
      phaseStartedAt = now;
    }
    const campaign = buildAllCandidateAnalyticalCampaign(registryPath, {
      outputDirectory: generatedCampaignDirectory,
      evaluationMode: options.evaluationMode,
      includeSensitivity: options.includeSensitivity !== false,
      onProgress: options.onProgress,
    });
    completePhase("campaign-computation");
    const generatedPaths = writeAllCandidateAnalyticalCampaign(
      campaign,
      generatedCampaignDirectory,
    );
    completePhase("campaign-manifest-write");
    options.onProgress?.({
      stage: "catalog-campaign-generated",
      candidateCount: campaign.candidates.length,
    });
    injectFailure(options, "after-catalog-generation");

    const importResults = [];
    importResults.push(importAnalyticalCampaign(stagedDatabasePath, {
      ...options,
      manifestPath: generatedPaths.manifestPath,
      summaryPath: generatedPaths.summaryPath,
      packetDirectory: generatedPaths.packetDirectory,
    }));
    injectFailure(options, "after-catalog-import");
    for (const checkedCampaign of campaign.checkedCampaigns) {
      importResults.push(importAnalyticalCampaign(stagedDatabasePath, {
        ...options,
        manifestPath: checkedCampaign.manifestPath,
        summaryPath: checkedCampaign.summaryPath,
      }));
      options.onProgress?.({
        stage: "checked-campaign-imported",
        campaignId: checkedCampaign.campaignId,
      });
    }
    completePhase("database-import");

    const initialCompleteness = assertStagedCompleteness(
      stagedDatabasePath,
      campaign,
      importResults,
      options,
    );
    completePhase("staged-completeness-verification");
    const exports = deterministicExportCheck(
      stagedDatabasePath,
      importResults,
      exportDirectory,
      options,
    );
    completePhase("deterministic-export");
    const generationEvidence = {
      schema: "prescribed-record-analytics/database-generation-evidence.v1",
      registryId: campaign.registry.registryId,
      registryHash: campaign.registryHash,
      catalogId: campaign.registry.catalogId,
      catalogHash: campaign.catalogHash,
      requiredCampaignCount: 1 + campaign.checkedCampaigns.length,
      observedCampaignCount: initialCompleteness.campaignCount,
      requiredCandidateCount: campaign.candidates.length,
      observedCandidateCount: initialCompleteness.observedCandidateCount,
      acceptedCandidateCount: initialCompleteness.acceptedCandidateCount,
      rejectedCandidateCount: initialCompleteness.rejectedCandidateCount,
      campaigns: importResults.map((result) => ({
        manifestHash: result.manifestHash,
        summaryHash: result.summaryHash,
        caseCount: result.caseCount,
        acceptedCaseCount: result.acceptedCaseCount,
        rejectedCaseCount: result.rejectedCaseCount,
      })),
      exports: exports.map((row) => ({
        manifestHash: row.manifestHash,
        inventoryHash: row.inventoryHash,
        fileCount: row.fileCount,
      })),
      claimBoundary: {
        pathEvolutionInvoked: false,
        eomSolverInvoked: false,
        excludedClaims: ["stability", "energy", "retention", "physical-realization"],
      },
    };
    const generation = recordAnalyticalDatabaseGeneration(stagedDatabasePath, {
      ...options,
      registryBytes: campaign.registryBytes,
      rebuildInstrumentVersion: ANALYTICAL_CAMPAIGN_REBUILD_VERSION,
      evidence: generationEvidence,
    });
    completePhase("generation-record");
    const stagedVerification = verifyAnalyticalCampaignDatabase(
      stagedDatabasePath,
      options,
    );
    completePhase("staged-integrity-verification");
    if (stagedVerification.generationCount !== 1) {
      fail("staged database generation record is missing.");
    }
    injectFailure(options, "before-swap");

    let finalVerification = stagedVerification;
    if (mode === "publish") {
      finalVerification = publishDatabase(
        stagedDatabasePath,
        targetDatabasePath,
        options,
      );
      published = true;
      completePhase("atomic-publish-and-verification");
    }
    const report = {
      schema: "prescribed-record-analytics/all-candidate-rebuild-report.v1",
      rebuildInstrumentVersion: ANALYTICAL_CAMPAIGN_REBUILD_VERSION,
      mode,
      published,
      databasePath: mode === "publish" ? targetDatabasePath : null,
      registryId: campaign.registry.registryId,
      registryHash: campaign.registryHash,
      generationHash: generation.generationHash,
      fingerprint: finalVerification.fingerprint,
      campaignCount: initialCompleteness.campaignCount,
      candidateCount: initialCompleteness.observedCandidateCount,
      acceptedCandidateCount: initialCompleteness.acceptedCandidateCount,
      rejectedCandidateCount: initialCompleteness.rejectedCandidateCount,
      acceptedCaseCount: finalVerification.acceptedCaseCount,
      rejectedCaseCount: finalVerification.rejectedCaseCount,
      artifactCount: finalVerification.artifactCount,
      integrity: finalVerification.integrity,
      runtimeProfile: summarizeRuntimeTimings(
        campaign.runtimeTimings,
        rebuildPhaseTimings,
      ),
      slowestMeasuredStages: [...(campaign.runtimeTimings ?? [])]
        .sort((left, right) => right.wallSeconds - left.wallSeconds)
        .slice(0, 10),
    };
    options.onProgress?.({ stage: "rebuild-complete", ...report });
    return report;
  } finally {
    if (lockDescriptor !== undefined) closeSync(lockDescriptor);
    try {
      unlinkSync(lockPath);
    } catch {
      // A missing lock is already a clean state.
    }
    if (!options.keepStaging) {
      rmSync(stagingDirectory, { recursive: true, force: true });
    }
  }
}

export function inspectPublishedAnalyticalGeneration(databasePath, options = {}) {
  return inspectAnalyticalCampaignDatabase(databasePath, options);
}
