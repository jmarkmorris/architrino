#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  mkdirSync,
  readFileSync,
  renameSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { DatabaseSync } from "node:sqlite";

import {
  COMPACT_ANALYTICAL_DATABASE_SCHEMA,
  COMPACT_MONTE_CARLO_CAMPAIGN_SCHEMA,
  COMPACT_MONTE_CARLO_CASE_SCHEMA,
  compactCanonicalJson,
  compactSha256Canonical,
  verifyCompactAnalyticalCampaignDatabase,
} from "../../src/prescribed-path-analysis/database/CompactAnalyticalCampaignDatabase.mjs";
import {
  ACTIVE_CANDIDATE_DISPOSITION,
  COMPACT_SWEEP_DASHBOARD_SCHEMA,
  DEPRECATED_CONTROL_DISPOSITION,
  HIGH_LEVEL_GATE_DEFINITIONS,
  SURFACE_GATE_DEFINITIONS,
  buildEvaluationFunnel,
  median,
  pearsonCorrelation,
  summarizeGate,
  thresholdRatio,
} from "../../src/apps/compact-sweep-dashboard/CompactSweepDashboardData.js";

const REPOSITORY_ROOT = path.resolve(import.meta.dirname, "../..");
const DEFAULT_INPUT_DIRECTORY = path.join(
  REPOSITORY_ROOT,
  ".local-data/braid-analysis/compact-monte-carlo/configuration-sweep-v2",
);
const DEFAULT_DATABASE_PATH = path.join(
  DEFAULT_INPUT_DIRECTORY,
  "compact-campaigns.sqlite3",
);
const DEFAULT_ANALYZER_RECEIPT_PATH = path.join(
  DEFAULT_INPUT_DIRECTORY,
  "active-sweep-analyzer-receipt.v2.json",
);
const DEFAULT_DATABASE_VERIFICATION_PATH = path.join(
  DEFAULT_INPUT_DIRECTORY,
  "active-database-verification.v2.json",
);
const DEFAULT_OUTPUT_PATH = path.join(
  DEFAULT_INPUT_DIRECTORY,
  "compact-sweep-dashboard.v2.json",
);
const ANALYZER_SCHEMA =
  "prescribed-path-analysis/compact-configuration-sweep-analysis.v2";
const SHA256_PATTERN = /^[0-9a-f]{64}$/u;
const DEPRECATED_COMPARATIVE_MEMBERS = Object.freeze(new Set(["all-axial-three-binary-boundary"]));

const DASHBOARD_CLAIM_BOUNDARY = Object.freeze({
  diagnosticOnly: true,
  establishes: [
    "sampling coverage within the retained compact campaign",
    "compact numerical metrics and margins",
    "compact-gate outcomes with a Not advanced disposition",
    "measured per-row computational cost",
    "rows for later adjudication",
  ],
  doesNotEstablish: [
    "stability",
    "retention",
    "binding",
    "energy closure",
    "quantization",
    "particle identity",
    "catalog acceptance",
    "physical realization",
  ],
  independentAcceptancePerformed: false,
  pathEvolutionInvoked: false,
  eomSolverInvoked: false,
  liveCampaignMutationPerformed: false,
});

function fail(message) {
  throw new Error(message);
}

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function canonicalPrettyJson(value) {
  return `${JSON.stringify(JSON.parse(compactCanonicalJson(value)), null, 2)}\n`;
}

function readJsonFile(filePath, label) {
  let bytes;
  try {
    bytes = readFileSync(filePath);
  } catch (error) {
    fail(`${label} could not be read: ${error.message}`);
  }
  let value;
  try {
    value = JSON.parse(bytes.toString("utf8"));
  } catch (error) {
    fail(`${label} is malformed JSON: ${error.message}`);
  }
  return {
    value,
    bytes,
    sha256: sha256Bytes(bytes),
  };
}

function assertSha256(value, label) {
  if (typeof value !== "string" || !SHA256_PATTERN.test(value)) {
    fail(`${label} must be a lowercase hexadecimal SHA-256.`);
  }
  return value;
}

function sortedUnique(values = []) {
  return [...new Set(values)].sort((left, right) =>
    String(left).localeCompare(String(right), undefined, { numeric: true }));
}

function assertSameCanonical(actual, expected, label) {
  if (compactCanonicalJson(actual) !== compactCanonicalJson(expected)) {
    fail(`${label} does not match the live read-only database.`);
  }
}

function fileIdentity(filePath) {
  const stats = statSync(filePath);
  const bytes = readFileSync(filePath);
  return {
    device: stats.dev,
    inode: stats.ino,
    size: stats.size,
    mtimeMs: stats.mtimeMs,
    sha256: sha256Bytes(bytes),
  };
}

function assertFileIdentityUnchanged(before, after, label) {
  if (compactCanonicalJson(before) !== compactCanonicalJson(after)) {
    fail(`${label} changed while the read-only dashboard export was running.`);
  }
}

function parseStoredJson(value, label) {
  try {
    return JSON.parse(value);
  } catch (error) {
    fail(`${label} contains malformed retained JSON: ${error.message}`);
  }
}

function validateAnalyzerReceipt(receipt) {
  if (receipt?.schema !== ANALYZER_SCHEMA) {
    fail(`unsupported analyzer receipt schema ${String(receipt?.schema)}.`);
  }
  if (receipt.status !== "terminal-for-declared-boundary" ||
      receipt.terminalBoundary?.terminal !== true ||
      receipt.coordinatorReceipt?.terminalBoundaryDeclared !== true ||
      receipt.coordinatorReceipt?.terminalBoundarySatisfied !== true ||
      receipt.coordinatorReceipt?.terminalBoundaryDefectCount !== 0 ||
      receipt.terminalBoundary?.defects?.length !== 0) {
    fail("analyzer receipt is non-terminal or has terminal-boundary defects.");
  }
  if (receipt.skippedFiles?.length !== 0) {
    fail("analyzer receipt excluded malformed, missing, or changing campaign files.");
  }
  if (receipt.claimBoundary?.diagnosticOnly !== true ||
      receipt.claimBoundary?.independentAcceptancePerformed !== false ||
      receipt.claimBoundary?.pathEvolutionInvoked !== false ||
      receipt.claimBoundary?.eomSolverInvoked !== false ||
      receipt.metricLeaders?.combinedScoreCreated !== false) {
    fail("analyzer receipt does not preserve the compact diagnostic claim boundary.");
  }
  const analysisBody = { ...receipt };
  delete analysisBody.coordinatorReceipt;
  const expectedAnalysisHash = compactSha256Canonical(analysisBody);
  if (receipt.coordinatorReceipt?.analysisHash !== expectedAnalysisHash) {
    fail("analyzer receipt analysisHash does not match its analysis body.");
  }
  return receipt;
}

function validateDatabaseVerification(receipt) {
  if (receipt?.schema !== COMPACT_ANALYTICAL_DATABASE_SCHEMA) {
    fail(
      `unsupported database verification schema ${String(receipt?.schema)}.`,
    );
  }
  if (receipt.integrity !== "ok" ||
      receipt.foreignKeyViolationCount !== 0 ||
      receipt.prohibitedBlobColumnCount !== 0) {
    fail("database verification receipt is not clean.");
  }
  if (!Array.isArray(receipt.campaigns)) {
    fail("database verification receipt lacks campaign identities.");
  }
  return receipt;
}

function readDatabase(databasePath) {
  const database = new DatabaseSync(databasePath, { readOnly: true });
  try {
    database.exec("PRAGMA query_only = ON");
    const queryOnly = database.prepare("PRAGMA query_only").get().query_only;
    if (queryOnly !== 1) fail("SQLite query_only mode was not enabled.");
    const tables = database.prepare(`
      SELECT name FROM sqlite_schema
      WHERE type = 'table' AND name NOT LIKE 'sqlite_%'
      ORDER BY name
    `).all().map((row) => row.name);
    assertSameCanonical(
      tables,
      ["compact_campaign", "compact_case", "compact_schema_migration"],
      "compact database table inventory",
    );
    const campaigns = database.prepare(`
      SELECT
        campaign_hash AS campaignHash,
        schema_id AS schema,
        campaign_id AS campaignId,
        protocol_hash AS protocolHash,
        implementation_hash AS implementationHash,
        claim_grade AS claimGrade,
        diagnostic_only AS diagnosticOnly,
        independent_acceptance_performed AS independentAcceptancePerformed,
        path_evolution_invoked AS pathEvolutionInvoked,
        eom_solver_invoked AS eomSolverInvoked,
        case_count AS caseCount,
        drawn_count AS drawnCount,
        evaluated_count AS evaluatedCount,
        not_evaluated_count AS notEvaluatedCount,
        header_json AS headerJson
      FROM compact_campaign
      ORDER BY campaign_hash
    `).all().map((row) => ({
      ...row,
      header: parseStoredJson(
        row.headerJson,
        `campaign ${row.campaignHash}.header_json`,
      ),
    }));
    const cases = database.prepare(`
      SELECT
        campaign_hash AS campaignHash,
        output_ordinal AS outputOrdinal,
        case_hash AS caseHash,
        schema_id AS schema,
        case_id AS caseId,
        assembly_id AS assemblyId,
        source_slug AS sourceSlug,
        candidate_id AS candidateId,
        sample_ordinal AS sampleOrdinal,
        sampled_spec_hash AS sampledSpecHash,
        exact_source_hash AS exactSourceHash,
        protocol_hash AS protocolHash,
        implementation_hash AS implementationHash,
        score_hash AS scoreHash,
        status_code AS statusCode,
        score_status_code AS scoreStatusCode,
        evaluated,
        passed,
        reason_code AS reasonCode,
        wall_seconds AS wallSeconds,
        user_cpu_seconds AS userCpuSeconds,
        system_cpu_seconds AS systemCpuSeconds,
        retained_case_bytes AS retainedCaseBytes,
        score_json AS scoreJson,
        evaluation_status_json AS evaluationStatusJson,
        row_json AS rowJson
      FROM compact_case
      ORDER BY campaign_hash, output_ordinal
    `).all().map((row) => ({
      ...row,
      score: row.scoreJson === null
        ? null
        : parseStoredJson(row.scoreJson, `${row.caseId}.score_json`),
      evaluationStatus: parseStoredJson(
        row.evaluationStatusJson,
        `${row.caseId}.evaluation_status_json`,
      ),
      retainedRow: parseStoredJson(row.rowJson, `${row.caseId}.row_json`),
    }));
    return { campaigns, cases, tables };
  } finally {
    database.close();
  }
}

function validateDatabaseRows(databaseRows) {
  const campaignsByHash = new Map(
    databaseRows.campaigns.map((campaign) => [
      campaign.campaignHash,
      campaign,
    ]),
  );
  for (const campaign of databaseRows.campaigns) {
    if (campaign.schema !== COMPACT_MONTE_CARLO_CAMPAIGN_SCHEMA) {
      fail(`campaign ${campaign.campaignHash} has an unsupported schema.`);
    }
    if (campaign.claimGrade !== "measured" ||
        campaign.diagnosticOnly !== 1 ||
        campaign.independentAcceptancePerformed !== 0 ||
        campaign.pathEvolutionInvoked !== 0 ||
        campaign.eomSolverInvoked !== 0) {
      fail(`campaign ${campaign.campaignHash} exceeds the diagnostic boundary.`);
    }
    assertSha256(campaign.campaignHash, "campaignHash");
    assertSha256(campaign.protocolHash, "campaign protocolHash");
    assertSha256(
      campaign.implementationHash,
      "campaign implementationHash",
    );
  }
  const observedCounts = new Map();
  for (const row of databaseRows.cases) {
    const campaign = campaignsByHash.get(row.campaignHash);
    if (!campaign) fail(`${row.caseId} references an unknown campaign.`);
    if (row.schema !== COMPACT_MONTE_CARLO_CASE_SCHEMA ||
        row.retainedRow?.schema !== COMPACT_MONTE_CARLO_CASE_SCHEMA) {
      fail(`${row.caseId} has an unsupported compact case schema.`);
    }
    if (row.protocolHash !== campaign.protocolHash ||
        row.implementationHash !== campaign.implementationHash ||
        row.retainedRow.caseHash !== row.caseHash ||
        row.retainedRow.scoreHash !== row.scoreHash) {
      fail(`${row.caseId} conflicts with its retained campaign identity.`);
    }
    if (row.evaluated === 0 &&
        (row.score !== null || row.scoreHash !== null)) {
      fail(`${row.caseId} is not evaluated but retains a score.`);
    }
    observedCounts.set(
      row.campaignHash,
      (observedCounts.get(row.campaignHash) ?? 0) + 1,
    );
  }
  for (const campaign of databaseRows.campaigns) {
    if ((observedCounts.get(campaign.campaignHash) ?? 0) !==
        campaign.caseCount) {
      fail(`campaign ${campaign.campaignHash} case count is inconsistent.`);
    }
  }
}

function crossCheckReceipts({
  databaseRows,
  liveVerification,
  verificationReceipt,
  analyzerReceipt,
}) {
  const campaignHashes = databaseRows.campaigns.map(
    (campaign) => campaign.campaignHash,
  );
  const liveCampaignHashes = liveVerification.campaigns.map(
    (campaign) => campaign.campaignHash,
  );
  const verificationCampaignHashes = verificationReceipt.campaigns.map(
    (campaign) => campaign.campaignHash,
  ).sort();
  const analyzerCampaignHashes =
    analyzerReceipt.campaignAndFileManifest.campaignFiles.map(
      (campaign) => campaign.campaignHash,
    ).sort();
  assertSameCanonical(liveCampaignHashes, campaignHashes, "live verification");
  assertSameCanonical(
    verificationCampaignHashes,
    campaignHashes,
    "database verification campaign identities",
  );
  assertSameCanonical(
    analyzerCampaignHashes,
    campaignHashes,
    "analyzer campaign identities",
  );
  assertSameCanonical(
    verificationReceipt.campaigns.map((row) => ({
      campaignHash: row.campaignHash,
      inventoryHash: row.inventoryHash,
    })).sort((left, right) =>
      left.campaignHash.localeCompare(right.campaignHash)),
    liveVerification.campaigns.map((row) => ({
      campaignHash: row.campaignHash,
      inventoryHash: row.inventoryHash,
    })),
    "database verification inventory hashes",
  );
  const expectedCounts = {
    campaignCount: databaseRows.campaigns.length,
    caseCount: databaseRows.cases.length,
    evaluatedCount: databaseRows.cases.filter((row) => row.evaluated === 1)
      .length,
    notEvaluatedCount: databaseRows.cases.filter((row) => row.evaluated === 0)
      .length,
  };
  if (verificationReceipt.campaignCount !== expectedCounts.campaignCount ||
      verificationReceipt.caseCount !== expectedCounts.caseCount ||
      analyzerReceipt.drawCounts?.actual !== expectedCounts.caseCount ||
      analyzerReceipt.drawCounts?.evaluated !== expectedCounts.evaluatedCount ||
      analyzerReceipt.drawCounts?.notEvaluated !==
        expectedCounts.notEvaluatedCount ||
      analyzerReceipt.coordinatorReceipt?.completedCampaignFileCount !==
        expectedCounts.campaignCount) {
    fail("receipt counts do not match the live read-only database.");
  }
  const protocolHashes = sortedUnique(
    databaseRows.campaigns.map((campaign) => campaign.protocolHash),
  );
  const implementationHashes = sortedUnique(
    databaseRows.campaigns.map(
      (campaign) => campaign.implementationHash,
    ),
  );
  assertSameCanonical(
    analyzerReceipt.frozenIdentitySet?.protocolHashes,
    protocolHashes,
    "analyzer protocol identity",
  );
  assertSameCanonical(
    analyzerReceipt.frozenIdentitySet?.implementationHashes,
    implementationHashes,
    "analyzer implementation identity",
  );
  return { expectedCounts, protocolHashes, implementationHashes };
}

function maximumFinite(values = []) {
  const finite = values.filter((value) => Number.isFinite(value));
  return finite.length === 0 ? null : Math.max(...finite);
}

function metricValues(score) {
  if (!score) {
    return Object.fromEntries([
      "externalExposure",
      "externalExposureFraction",
      "peakSurfaceAcceleration",
      "wakeFluxFraction",
      "signedCycleResidual",
      "rawEmissionResidual",
      "signedEmissionResidual",
    ].map((key) => [key, null]));
  }
  const exposures = Array.isArray(score.exposures) ? score.exposures : [];
  const signedCycleIntegral = score.wakeFlux?.signedCycleIntegral;
  return {
    externalExposure: maximumFinite(exposures.map((row) => row.L_ext)),
    externalExposureFraction: maximumFinite(
      exposures.map((row) => row.eta_ext),
    ),
    peakSurfaceAcceleration: maximumFinite(exposures.map(
      (row) => row.peakSurfaceAcceleration?.accelerationNorm,
    )),
    wakeFluxFraction: Number.isFinite(score.wakeFlux?.etaWakeFlux)
      ? score.wakeFlux.etaWakeFlux
      : null,
    signedCycleResidual: Number.isFinite(signedCycleIntegral)
      ? Math.abs(signedCycleIntegral)
      : null,
    rawEmissionResidual:
      Number.isFinite(score.wakeFlux?.rawEmissionReference?.relativeResidual)
        ? score.wakeFlux.rawEmissionReference.relativeResidual
        : null,
    signedEmissionResidual: Number.isFinite(
      score.wakeFlux?.signedEmissionReference?.relativeOrAbsoluteResidual,
    )
      ? score.wakeFlux.signedEmissionReference.relativeOrAbsoluteResidual
      : null,
  };
}

function classifyNullRow(status) {
  const message = String(status?.message ?? "");
  const detailsGate = String(status?.details?.gateId ?? "");
  if (/event-convergence gate/iu.test(message) ||
      detailsGate === "event-convergence") {
    return "event-convergence";
  }
  if (/minimum-separation gate/iu.test(message) ||
      detailsGate === "minimum-separation") {
    return "minimum-separation";
  }
  return "other";
}

function highLevelGates(score) {
  return Object.fromEntries(HIGH_LEVEL_GATE_DEFINITIONS.map((definition) => {
    const passed = score?.gates?.evaluated?.[definition.id];
    return [definition.id, {
      passed: typeof passed === "boolean" ? passed : null,
      skipped: score?.gates?.skipped?.[definition.id] ?? null,
      thresholdRatio: null,
    }];
  }));
}

function surfaceGates(score) {
  return Object.fromEntries(SURFACE_GATE_DEFINITIONS.map((definition) => {
    const gate = score?.quadrature?.gates?.[definition.id];
    const value = Number.isFinite(gate?.maximumChange)
      ? gate.maximumChange
      : null;
    const threshold = Number.isFinite(gate?.threshold)
      ? gate.threshold
      : null;
    return [definition.id, {
      identityMatch: typeof gate?.identityMatch === "boolean"
        ? gate.identityMatch
        : null,
      maximumChange: value,
      passed: typeof gate?.passed === "boolean" ? gate.passed : null,
      threshold,
      thresholdRatio: thresholdRatio(value, threshold),
    }];
  }));
}

function normalizeCoordinateValues(values) {
  return Array.isArray(values)
    ? values.map((row) => ({
        id: row?.binaryId ?? row?.gapId ?? null,
        value: Number.isFinite(row?.value) ? row.value : null,
      }))
    : [];
}

function sampledCoordinates(row) {
  const coordinates = row.sampling?.coordinates ?? {};
  return {
    axialFractions: normalizeCoordinateValues(coordinates.axialFractions),
    circulationSenses: Array.isArray(coordinates.circulationSenses)
      ? coordinates.circulationSenses
      : [],
    threeAxisFrameFlattening: Number.isFinite(coordinates.threeAxisFrameFlattening)
      ? coordinates.threeAxisFrameFlattening
      : null,
    coaxialComponentSpacingScale: Number.isFinite(coordinates.coaxialComponentSpacingScale)
      ? coordinates.coaxialComponentSpacingScale
      : null,
    frequencies: normalizeCoordinateValues(coordinates.frequencies),
    coincidentCenterAxialSpacings: Array.isArray(
      coordinates.coincidentCenterAxialSpacings,
    )
      ? coordinates.coincidentCenterAxialSpacings.map((value) =>
          Number.isFinite(value) ? value : null)
      : [],
    geometryScale: Number.isFinite(coordinates.geometryScale)
      ? coordinates.geometryScale
      : null,
    orbitOrder: Array.isArray(coordinates.orbitOrder)
      ? coordinates.orbitOrder
      : [],
    polarityAssignments: normalizeCoordinateValues(
      coordinates.polarityAssignments,
    ),
    radii: normalizeCoordinateValues(coordinates.radii),
    translationSpeed: Number.isFinite(coordinates.translation?.speed)
      ? coordinates.translation.speed
      : null,
  };
}

function shellQuote(value) {
  return `'${String(value).replaceAll("'", "'\\''")}'`;
}

function rerunCommand(row, campaign, wave) {
  const output = `.local-data/braid-analysis/compact-monte-carlo/reruns/` +
    `${row.retainedRow.caseHash}.json`;
  return [
    "node scripts/eom/run-compact-monte-carlo.mjs",
    `--seed ${shellQuote(campaign.header.sampling.seed)}`,
    `--cases-per-configuration ${campaign.header.sampling.casesPerConfiguration}`,
    "--resolution coverage",
    `--sampler ${campaign.header.sampling.samplerId.includes("local")
      ? "local-reference"
      : "full-exact-configuration"}`,
    `--source-slugs ${shellQuote(row.sourceSlug)}`,
    `--output ${shellQuote(output)}`,
    `# inspect sample ordinal ${row.sampleOrdinal}; require sampledSpecHash ` +
      row.sampledSpecHash,
    `# originating retained file: ${wave.file}`,
  ].join(" \\\n  ");
}

function buildDashboardRows(databaseRows, analyzerReceipt) {
  const campaignsByHash = new Map(
    databaseRows.campaigns.map((campaign) => [
      campaign.campaignHash,
      campaign,
    ]),
  );
  const wavesByCampaignHash = new Map(
    analyzerReceipt.campaignAndFileManifest.campaignFiles.map((entry) => [
      entry.campaignHash,
      entry,
    ]),
  );
  return databaseRows.cases.map((row) => {
    const campaign = campaignsByHash.get(row.campaignHash);
    const wave = wavesByCampaignHash.get(row.campaignHash);
    if (!wave) fail(`${row.caseId} has no analyzer wave/file identity.`);
    const exactRerunInstruction =
      row.retainedRow.exactRerunInstruction;
    const evaluated = row.evaluated === 1;
    const comparativeRankingEligible =
      !DEPRECATED_COMPARATIVE_MEMBERS.has(row.sourceSlug);
    return {
      campaignFile: wave.file,
      campaignHash: row.campaignHash,
      campaignId: campaign.campaignId,
      candidateDisposition: comparativeRankingEligible
        ? ACTIVE_CANDIDATE_DISPOSITION
        : DEPRECATED_CONTROL_DISPOSITION,
      candidateId: row.candidateId,
      caseHash: row.caseHash,
      caseId: row.caseId,
      evaluation: {
        errorName: row.evaluationStatus.errorName ?? null,
        evaluated,
        message: row.evaluationStatus.message ?? null,
        nullClass: evaluated ? null : classifyNullRow(row.evaluationStatus),
        reasonCode: row.reasonCode,
        stage: row.evaluationStatus.stage ?? null,
        statusCode: row.statusCode,
      },
      exactRerunInstruction,
      exactSourceHash: row.exactSourceHash,
      assemblyId: row.assemblyId,
      modelRevisionSha256: row.modelRevisionSha256,
      gates: {
        highLevel: highLevelGates(row.score),
        surfaceQuadrature: surfaceGates(row.score),
      },
      implementationHash: row.implementationHash,
      comparativeRankingEligible,
      sourceSlug: row.sourceSlug,
      metrics: metricValues(row.score),
      performance: {
        earlyExit: !evaluated,
        retainedCaseBytes: row.retainedCaseBytes,
        systemCpuSeconds: row.systemCpuSeconds,
        totalCpuSeconds:
          Number.isFinite(row.userCpuSeconds) &&
          Number.isFinite(row.systemCpuSeconds)
            ? row.userCpuSeconds + row.systemCpuSeconds
            : null,
        userCpuSeconds: row.userCpuSeconds,
        wallSeconds: row.wallSeconds,
      },
      protocolHash: row.protocolHash,
      rerunCommand: rerunCommand(row, campaign, wave),
      rowKey: `${row.campaignHash}:${row.caseId}`,
      sampleOrdinal: row.sampleOrdinal,
      sampledCoordinates: sampledCoordinates(row.retainedRow),
      sampledSpecHash: row.sampledSpecHash,
      samplingSeed: campaign.header.sampling.seed,
      score: {
        failedGates: row.score?.status?.failedGates ?? [],
        passed: typeof row.score?.status?.passed === "boolean"
          ? row.score.status.passed
          : null,
        scoreHash: row.scoreHash,
        statusCode: row.scoreStatusCode,
        wakeFluxClaimBoundary:
          row.score?.wakeFlux?.claimBoundary ?? null,
      },
      waveId: wave.waveId,
    };
  }).sort((left, right) =>
    left.assemblyId.localeCompare(right.assemblyId) ||
    left.sourceSlug.localeCompare(right.sourceSlug, undefined, { numeric: true }) ||
    left.sampleOrdinal - right.sampleOrdinal ||
    left.campaignHash.localeCompare(right.campaignHash));
}

function summarizeRows(rows) {
  const funnel = buildEvaluationFunnel(rows);
  const activeRows = rows.filter((row) => row.comparativeRankingEligible);
  const activeFunnel = buildEvaluationFunnel(activeRows);
  const deprecatedRows = rows.filter((row) =>
    !row.comparativeRankingEligible);
  const assemblies = sortedUnique(rows.map((row) => row.assemblyId)).map((assemblyId) => {
    const assemblyRows = rows.filter((row) => row.assemblyId === assemblyId);
    return {
      activeDrawCount: assemblyRows.filter((row) =>
        row.comparativeRankingEligible).length,
      activeConfigurationCount: new Set(assemblyRows.filter((row) =>
        row.comparativeRankingEligible).map((row) => row.sourceSlug)).size,
      drawCount: assemblyRows.length,
      evaluatedCount: assemblyRows.filter((row) =>
        row.evaluation.evaluated).length,
      assemblyId,
      configurationCount: new Set(assemblyRows.map((row) => row.sourceSlug)).size,
      medianWallSeconds: median(
        assemblyRows.map((row) => row.performance.wallSeconds),
      ),
    };
  });
  const configurations = sortedUnique(rows.map((row) => row.sourceSlug)).map(
    (sourceSlug) => {
      const configurationRows = rows.filter((row) => row.sourceSlug === sourceSlug);
      return {
        drawCount: configurationRows.length,
        evaluatedCount: configurationRows.filter((row) =>
          row.evaluation.evaluated).length,
        sourceSlug,
        nullScoreCount: configurationRows.filter((row) =>
          !row.evaluation.evaluated).length,
      };
    },
  );
  const etaCorrelation = pearsonCorrelation(rows.map((row) => [
    row.metrics.externalExposureFraction,
    row.metrics.wakeFluxFraction,
  ]));
  const gateTotals = {
    highLevel: Object.fromEntries(HIGH_LEVEL_GATE_DEFINITIONS.map(
      (gate) => [gate.id, summarizeGate(rows, "highLevel", gate.id)],
    )),
    surfaceQuadrature: Object.fromEntries(SURFACE_GATE_DEFINITIONS.map(
      (gate) => [
        gate.id,
        summarizeGate(rows, "surfaceQuadrature", gate.id),
      ],
    )),
  };
  return {
    activeCohort: {
      compactPassed: activeFunnel.compactPassed,
      drawn: activeFunnel.drawn,
      evaluated: activeFunnel.evaluated,
      configurationCount: new Set(activeRows.map((row) => row.sourceSlug)).size,
      nullScoreRows: activeFunnel.drawnNotEvaluated,
    },
    campaignCount: new Set(rows.map((row) => row.campaignHash)).size,
    compactPassed: funnel.compactPassed,
    drawn: funnel.drawn,
    drawnNotEvaluated: funnel.drawnNotEvaluated,
    deprecatedControls: {
      drawn: deprecatedRows.length,
      evaluated: deprecatedRows.filter((row) =>
        row.evaluation.evaluated).length,
      sourceSlugs: sortedUnique(deprecatedRows.map((row) => row.sourceSlug)),
    },
    etaExtEtaWakeFluxPearson: etaCorrelation,
    evaluated: funnel.evaluated,
    eventConvergenceFailures: funnel.eventConvergenceFailures,
    assemblies,
    configurationBalanced: false,
    gateFailed: funnel.gateFailed,
    gateTotals,
    configurations,
    configurationBalanced: configurations.every(
      (configuration) => configuration.drawCount === configurations[0]?.drawCount,
    ),
    minimumSeparationFailures: funnel.minimumSeparationFailures,
    nullScoreRows: funnel.drawnNotEvaluated,
  };
}

export function buildCompactSweepDashboardExport({
  databasePath = DEFAULT_DATABASE_PATH,
  analyzerReceiptPath = DEFAULT_ANALYZER_RECEIPT_PATH,
  databaseVerificationPath = DEFAULT_DATABASE_VERIFICATION_PATH,
} = {}) {
  const resolvedDatabasePath = path.resolve(databasePath);
  const databaseIdentityBefore = fileIdentity(resolvedDatabasePath);
  const analyzerFile = readJsonFile(
    path.resolve(analyzerReceiptPath),
    "analyzer receipt",
  );
  const databaseVerificationFile = readJsonFile(
    path.resolve(databaseVerificationPath),
    "database verification receipt",
  );
  const analyzerReceipt = validateAnalyzerReceipt(analyzerFile.value);
  const verificationReceipt = validateDatabaseVerification(
    databaseVerificationFile.value,
  );
  const liveVerification =
    verifyCompactAnalyticalCampaignDatabase(resolvedDatabasePath);
  const databaseRows = readDatabase(resolvedDatabasePath);
  validateDatabaseRows(databaseRows);
  const identities = crossCheckReceipts({
    databaseRows,
    liveVerification,
    verificationReceipt,
    analyzerReceipt,
  });
  const databaseIdentityAfter = fileIdentity(resolvedDatabasePath);
  assertFileIdentityUnchanged(
    databaseIdentityBefore,
    databaseIdentityAfter,
    "compact SQLite database",
  );
  const rows = buildDashboardRows(databaseRows, analyzerReceipt);
  const campaigns = databaseRows.campaigns.map((campaign) => {
    const manifest = analyzerReceipt.campaignAndFileManifest.campaignFiles
      .find((entry) => entry.campaignHash === campaign.campaignHash);
    return {
      campaignFile: manifest.file,
      campaignHash: campaign.campaignHash,
      campaignId: campaign.campaignId,
      casesPerConfiguration: campaign.header.sampling.casesPerConfiguration,
      implementationHash: campaign.implementationHash,
      protocolHash: campaign.protocolHash,
      seed: campaign.header.sampling.seed,
      waveId: manifest.waveId,
    };
  });
  const body = {
    campaigns,
    claimBoundary: DASHBOARD_CLAIM_BOUNDARY,
    gateDefinitions: {
      highLevel: HIGH_LEVEL_GATE_DEFINITIONS,
      surfaceQuadrature: SURFACE_GATE_DEFINITIONS,
      thresholdRatio:
        "observed maximum change divided by the positive threshold; <= 1 is within the numerical threshold, while identityMatch can still fail the gate",
    },
    identity: {
      analyzerAnalysisHash:
        analyzerReceipt.coordinatorReceipt.analysisHash,
      analyzerManifestHash:
        analyzerReceipt.coordinatorReceipt.manifestHash,
      analyzerReceiptFileSha256: analyzerFile.sha256,
      combinedCandidateScoreCreated: false,
      databaseSha256: databaseIdentityBefore.sha256,
      databaseVerificationFileSha256:
        databaseVerificationFile.sha256,
      implementationHashes: identities.implementationHashes,
      protocolHashes: identities.protocolHashes,
      receiptStatus: analyzerReceipt.status,
      terminalThroughWave: analyzerReceipt.terminalBoundary.throughWave,
    },
    rows,
    schema: COMPACT_SWEEP_DASHBOARD_SCHEMA,
    status: "terminal-read-only-export",
    summary: summarizeRows(rows),
  };
  const dataHash = compactSha256Canonical(body);
  const data = {
    ...body,
    identity: {
      ...body.identity,
      dataHash,
    },
  };
  const bytes = Buffer.from(canonicalPrettyJson(data));
  return {
    bytes,
    data,
    outputSha256: sha256Bytes(bytes),
    databaseIdentityBefore,
    databaseIdentityAfter,
  };
}

export function writeCompactSweepDashboardExport({
  outputPath = DEFAULT_OUTPUT_PATH,
  repositoryRoot = REPOSITORY_ROOT,
  ...options
} = {}) {
  const resolvedOutputPath = path.resolve(outputPath);
  const localDataRoot = path.resolve(repositoryRoot, ".local-data");
  if (resolvedOutputPath !== localDataRoot &&
      !resolvedOutputPath.startsWith(`${localDataRoot}${path.sep}`)) {
    fail("dashboard export output must remain under .local-data.");
  }
  const result = buildCompactSweepDashboardExport(options);
  mkdirSync(path.dirname(resolvedOutputPath), { recursive: true });
  const temporaryPath = `${resolvedOutputPath}.${process.pid}.tmp`;
  writeFileSync(temporaryPath, result.bytes);
  renameSync(temporaryPath, resolvedOutputPath);
  return {
    schema: COMPACT_SWEEP_DASHBOARD_SCHEMA,
    outputPath: resolvedOutputPath,
    outputBytes: result.bytes.length,
    outputSha256: result.outputSha256,
    dataHash: result.data.identity.dataHash,
    campaignCount: result.data.summary.campaignCount,
    rowCount: result.data.summary.drawn,
    evaluatedCount: result.data.summary.evaluated,
    databaseReadOnly: true,
    databaseUnchanged:
      compactCanonicalJson(result.databaseIdentityBefore) ===
      compactCanonicalJson(result.databaseIdentityAfter),
  };
}

function parseArguments(argv) {
  const values = new Map();
  const flags = new Set();
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    if (key === "--help") {
      flags.add(key);
      continue;
    }
    if (!key.startsWith("--")) fail(`unexpected argument ${key}.`);
    const value = argv[index + 1];
    if (value == null || value.startsWith("--")) {
      fail(`${key} requires a value.`);
    }
    values.set(key, value);
    index += 1;
  }
  return {
    help: flags.has("--help"),
    databasePath: values.get("--database") ?? DEFAULT_DATABASE_PATH,
    analyzerReceiptPath:
      values.get("--analyzer-receipt") ??
      DEFAULT_ANALYZER_RECEIPT_PATH,
    databaseVerificationPath:
      values.get("--database-verification") ??
      DEFAULT_DATABASE_VERIFICATION_PATH,
    outputPath: values.get("--output") ?? DEFAULT_OUTPUT_PATH,
  };
}

function help() {
  process.stdout.write([
    "Usage:",
    "  node scripts/eom/export-compact-sweep-dashboard.mjs [options]",
    "",
    "Options:",
    `  --database PATH              default: ${path.relative(
      REPOSITORY_ROOT,
      DEFAULT_DATABASE_PATH,
    )}`,
    `  --analyzer-receipt PATH      default: ${path.relative(
      REPOSITORY_ROOT,
      DEFAULT_ANALYZER_RECEIPT_PATH,
    )}`,
    `  --database-verification PATH default: ${path.relative(
      REPOSITORY_ROOT,
      DEFAULT_DATABASE_VERIFICATION_PATH,
    )}`,
    `  --output PATH                default: ${path.relative(
      REPOSITORY_ROOT,
      DEFAULT_OUTPUT_PATH,
    )}`,
    "  --help",
    "",
    "Opens the compact SQLite database read-only, does not advance on non-terminal",
    "or identity-mismatched receipts, and writes deterministic dashboard JSON",
    "under .local-data. It does not run evaluations or modify campaign inputs.",
    "",
  ].join("\n"));
}

function main() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    help();
    return;
  }
  const report = writeCompactSweepDashboardExport(options);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

const invokedPath = process.argv[1] === undefined
  ? null
  : pathToFileURL(path.resolve(process.argv[1])).href;
if (invokedPath === import.meta.url) main();
