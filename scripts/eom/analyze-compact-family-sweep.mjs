#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  lstatSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const CAMPAIGN_SCHEMA =
  "prescribed-path-analysis/compact-monte-carlo-campaign.v1";
const CASE_SCHEMA =
  "prescribed-path-analysis/compact-monte-carlo-case.v1";
const ANALYSIS_SCHEMA =
  "prescribed-path-analysis/compact-family-sweep-analysis.v1";
const RECEIPT_SCHEMA =
  "prescribed-path-analysis/compact-family-sweep-coordinator-receipt.v1";
const DEFAULT_INPUT_DIRECTORY =
  ".local-data/braid-analysis/compact-monte-carlo/family-sweep-v1";
const DEFAULT_EXPECTED_PILOT_SHARD_COUNT = 6;
const DEFAULT_EXPECTED_WAVE_SHARD_COUNT = 6;
const DEFAULT_EXPECTED_WAVE_3_MEMBER_COUNT = 20;
const SHARD_FILE_PATTERN =
  /^(pilot|wave-(\d+))-shard-(\d+)\.json$/;
const MEMBER_FILE_PATTERN =
  /^(wave-(\d+))-member-(.+)\.json$/;
const CAMPAIGN_JSON_FILE_PATTERN =
  /^(pilot|wave-(\d+))-(.+)\.json$/;
const SHA256_PATTERN = /^[0-9a-f]{64}$/;
const COMPARATIVE_RANKING_EXCLUSIONS = Object.freeze({
  "B1.4": "deprecated-axial-limit-null-control",
});

const FIXED_METRICS = Object.freeze([
  {
    metricId: "external-exposure",
    direction: "minimize",
    valueSource: "max(score.exposures[].L_ext)",
    value(row) {
      return maximumFinite(row.score?.exposures?.map((item) => item.L_ext));
    },
  },
  {
    metricId: "external-exposure-fraction",
    direction: "minimize",
    valueSource: "max(score.exposures[].eta_ext)",
    value(row) {
      return maximumFinite(row.score?.exposures?.map((item) => item.eta_ext));
    },
  },
  {
    metricId: "peak-surface-acceleration",
    direction: "minimize",
    valueSource:
      "max(score.exposures[].peakSurfaceAcceleration.accelerationNorm)",
    value(row) {
      return maximumFinite(row.score?.exposures?.map(
        (item) => item.peakSurfaceAcceleration?.accelerationNorm,
      ));
    },
  },
  {
    metricId: "wake-flux-fraction",
    direction: "minimize",
    valueSource: "score.wakeFlux.etaWakeFlux",
    value(row) {
      return finiteOrNull(row.score?.wakeFlux?.etaWakeFlux);
    },
  },
  {
    metricId: "absolute-signed-cycle-integral",
    direction: "minimize",
    valueSource: "abs(score.wakeFlux.signedCycleIntegral)",
    value(row) {
      const value = finiteOrNull(row.score?.wakeFlux?.signedCycleIntegral);
      return value === null ? null : Math.abs(value);
    },
  },
  {
    metricId: "raw-emission-relative-residual",
    direction: "minimize",
    valueSource: "score.wakeFlux.rawEmissionReference.relativeResidual",
    value(row) {
      return finiteOrNull(
        row.score?.wakeFlux?.rawEmissionReference?.relativeResidual,
      );
    },
  },
  {
    metricId: "signed-emission-residual",
    direction: "minimize",
    valueSource:
      "score.wakeFlux.signedEmissionReference.relativeOrAbsoluteResidual",
    value(row) {
      return finiteOrNull(
        row.score?.wakeFlux?.signedEmissionReference
          ?.relativeOrAbsoluteResidual,
      );
    },
  },
]);

function fail(message) {
  throw new Error(message);
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value).sort().map(
        (key) => [key, canonicalize(value[key])],
      ),
    );
  }
  return value;
}

export function canonicalJson(value) {
  return JSON.stringify(canonicalize(value));
}

export function sha256Canonical(value) {
  return createHash("sha256").update(canonicalJson(value)).digest("hex");
}

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function finiteOrNull(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function maximumFinite(values) {
  if (!Array.isArray(values)) return null;
  const finiteValues = values.map(finiteOrNull).filter((value) => value !== null);
  return finiteValues.length === 0 ? null : Math.max(...finiteValues);
}

function requiredString(value, label) {
  if (typeof value !== "string" || value.length === 0) {
    fail(`${label} must be a nonempty string.`);
  }
  return value;
}

function requiredSha256(value, label) {
  if (typeof value !== "string" || !SHA256_PATTERN.test(value)) {
    fail(`${label} must be a lowercase hexadecimal SHA-256.`);
  }
  return value;
}

function requiredPositiveInteger(value, label) {
  if (!Number.isSafeInteger(value) || value < 1) {
    fail(`${label} must be a positive safe integer.`);
  }
  return value;
}

function optionalNonnegativeInteger(value, label) {
  if (value === null) return null;
  if (!Number.isSafeInteger(value) || value < 0) {
    fail(`${label} must be a nonnegative safe integer.`);
  }
  return value;
}

function compareText(left, right) {
  return left.localeCompare(right, undefined, { numeric: true });
}

function rowReference(shard, row) {
  return {
    file: shard.file,
    campaignHash: shard.campaign.campaignHash,
    seed: shard.campaign.sampling.seed,
    waveId: shard.waveId,
    fileKind: shard.fileKind,
    shardNumber: shard.shardNumber,
    memberToken: shard.memberToken,
    caseId: row.caseId,
    caseHash: row.caseHash,
    sampledSpecHash: row.exactRerunInstruction.sampledSpecHash,
    familyId: row.familyId,
    memberId: row.memberId,
    candidateId: row.candidateId,
    sampleOrdinal: row.sampleOrdinal,
    evaluationStatus: row.evaluationStatus.code,
  };
}

function rowSortKey(shard, row) {
  return [
    shard.waveSort.toString().padStart(8, "0"),
    shard.fileKind,
    shard.fileKind === "shard"
      ? shard.shardNumber.toString().padStart(8, "0")
      : shard.memberToken,
    row.familyId,
    row.memberId,
    row.sampleOrdinal.toString().padStart(8, "0"),
    row.caseHash,
  ].join("\0");
}

function campaignIdentity(campaign) {
  const {
    campaignHash: _campaignHash,
    wallSeconds: _wallSeconds,
    caseRows: _caseRows,
    ...identity
  } = campaign;
  return identity;
}

function caseIdentity(row) {
  const {
    caseHash: _caseHash,
    measuredCost: _measuredCost,
    executionIndex: _executionIndex,
    ...identity
  } = row;
  return identity;
}

function validateCaseRow(row, label) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    fail(`${label} must be an object.`);
  }
  if (row.schema !== CASE_SCHEMA) fail(`${label}.schema is unsupported.`);
  requiredString(row.caseId, `${label}.caseId`);
  requiredString(row.familyId, `${label}.familyId`);
  requiredString(row.memberId, `${label}.memberId`);
  requiredString(row.candidateId, `${label}.candidateId`);
  if (!Number.isSafeInteger(row.sampleOrdinal) || row.sampleOrdinal < 0) {
    fail(`${label}.sampleOrdinal must be a nonnegative safe integer.`);
  }
  requiredSha256(row.caseHash, `${label}.caseHash`);
  requiredSha256(
    row.exactRerunInstruction?.sampledSpecHash,
    `${label}.exactRerunInstruction.sampledSpecHash`,
  );
  if (row.score === null) {
    if (row.scoreHash !== null) {
      fail(`${label}.scoreHash must be null when score is null.`);
    }
  } else {
    requiredSha256(row.scoreHash, `${label}.scoreHash`);
    if (sha256Canonical(row.score) !== row.scoreHash) {
      fail(`${label}.scoreHash does not match score.`);
    }
  }
  if (typeof row.evaluationStatus?.evaluated !== "boolean") {
    fail(`${label}.evaluationStatus.evaluated must be boolean.`);
  }
  if (sha256Canonical(caseIdentity(row)) !== row.caseHash) {
    fail(`${label}.caseHash does not match the retained case identity.`);
  }
}

function validateCampaign(campaign, file) {
  if (!campaign || typeof campaign !== "object" || Array.isArray(campaign)) {
    fail(`${file} must contain one campaign object.`);
  }
  if (campaign.schema !== CAMPAIGN_SCHEMA) {
    fail(`${file} has unsupported schema ${String(campaign.schema)}.`);
  }
  requiredSha256(campaign.campaignHash, `${file}.campaignHash`);
  requiredString(campaign.campaignId, `${file}.campaignId`);
  requiredString(campaign.sampling?.seed, `${file}.sampling.seed`);
  requiredPositiveInteger(
    campaign.sampling?.casesPerMember,
    `${file}.sampling.casesPerMember`,
  );
  requiredPositiveInteger(
    campaign.sampling?.memberCount,
    `${file}.sampling.memberCount`,
  );
  requiredSha256(campaign.protocolHash, `${file}.protocolHash`);
  if (sha256Canonical(campaign.protocol) !== campaign.protocolHash) {
    fail(`${file}.protocolHash does not match protocol.`);
  }
  requiredSha256(
    campaign.implementationIdentity?.implementationHash,
    `${file}.implementationIdentity.implementationHash`,
  );
  if (!Array.isArray(campaign.caseRows) || !Array.isArray(campaign.cases)) {
    fail(`${file} must retain caseRows and cases arrays.`);
  }
  if (campaign.caseCount !== campaign.caseRows.length ||
      campaign.caseCount !== campaign.cases.length) {
    fail(`${file} case counts do not agree.`);
  }
  campaign.caseRows.forEach(
    (row, index) => validateCaseRow(row, `${file}.caseRows[${index}]`),
  );
  const memberCounts = new Map();
  for (let index = 0; index < campaign.caseRows.length; index += 1) {
    const row = campaign.caseRows[index];
    const compact = campaign.cases[index];
    if (compact?.caseId !== row.caseId ||
        compact?.caseHash !== row.caseHash ||
        compact?.scoreHash !== row.scoreHash ||
        compact?.executionIndex !== row.executionIndex) {
      fail(`${file}.cases[${index}] does not match its retained case row.`);
    }
    if (row.sampling?.seed !== campaign.sampling.seed) {
      fail(`${file}.caseRows[${index}] seed does not match its campaign.`);
    }
    if (row.exactRerunInstruction.protocolHash !== campaign.protocolHash) {
      fail(
        `${file}.caseRows[${index}] protocol hash does not match its campaign.`,
      );
    }
    if (row.exactRerunInstruction.implementationIdentity
        ?.implementationHash !==
      campaign.implementationIdentity.implementationHash) {
      fail(
        `${file}.caseRows[${index}] implementation hash does not match its ` +
        "campaign.",
      );
    }
    memberCounts.set(
      row.memberId,
      (memberCounts.get(row.memberId) ?? 0) + 1,
    );
  }
  if (memberCounts.size !== campaign.sampling.memberCount ||
      [...memberCounts.values()].some(
        (count) => count !== campaign.sampling.casesPerMember,
      )) {
    fail(`${file} member counts do not match its sampling declaration.`);
  }
  const evaluatedCount = campaign.caseRows.filter(
    (row) => row.evaluationStatus.evaluated === true,
  ).length;
  const summary = campaign.evaluationSummary;
  if (summary?.drawnCount !== campaign.caseRows.length ||
      summary?.evaluatedCount !== evaluatedCount ||
      summary?.notEvaluatedCount !== campaign.caseRows.length - evaluatedCount) {
    fail(`${file}.evaluationSummary does not match its case rows.`);
  }
  if (sha256Canonical(campaignIdentity(campaign)) !== campaign.campaignHash) {
    fail(`${file}.campaignHash does not match the campaign identity.`);
  }
}

function readStableCampaign(inputDirectory, descriptor) {
  const { file } = descriptor;
  const absolutePath = path.join(inputDirectory, file);
  try {
    const link = lstatSync(absolutePath);
    if (!link.isFile() || link.isSymbolicLink()) {
      return { skipped: { file, reason: "not-a-regular-file" } };
    }
    const before = statSync(absolutePath);
    const bytes = readFileSync(absolutePath);
    const after = statSync(absolutePath);
    if (before.size !== after.size ||
        before.mtimeMs !== after.mtimeMs ||
        bytes.length !== after.size) {
      return { skipped: { file, reason: "changed-during-read" } };
    }
    let campaign;
    try {
      campaign = JSON.parse(bytes.toString("utf8"));
    } catch {
      return { skipped: { file, reason: "unreadable-or-partial-json" } };
    }
    try {
      validateCampaign(campaign, file);
    } catch (error) {
      return {
        skipped: {
          file,
          reason: "invalid-completed-campaign",
          detail: error.message,
        },
      };
    }
    return {
      shard: {
        ...descriptor,
        waveSort: descriptor.waveNumber,
        fileBytes: bytes.length,
        fileSha256: sha256Bytes(bytes),
        campaign,
      },
    };
  } catch (error) {
    if (error?.code === "ENOENT") {
      return { skipped: { file, reason: "missing-during-read" } };
    }
    return {
      skipped: {
        file,
        reason: "read-error",
        detail: error?.message ?? String(error),
      },
    };
  }
}

function metricDefinitions(rows) {
  const gateIds = new Set();
  for (const { row } of rows) {
    for (const [gateId, gate] of Object.entries(
      row.score?.quadrature?.gates ?? {},
    )) {
      if (finiteOrNull(gate?.maximumChange) !== null) gateIds.add(gateId);
    }
  }
  const quadratureMetrics = [...gateIds].sort(compareText).map((gateId) => ({
    metricId: `quadrature-${gateId}`,
    direction: "minimize",
    valueSource: `score.quadrature.gates.${gateId}.maximumChange`,
    value(row) {
      return finiteOrNull(
        row.score?.quadrature?.gates?.[gateId]?.maximumChange,
      );
    },
  }));
  return [...FIXED_METRICS, ...quadratureMetrics];
}

function isRankable(row) {
  return row.evaluationStatus?.evaluated === true && row.score !== null;
}

function isComparativelyRankable(row) {
  return isRankable(row) &&
    COMPARATIVE_RANKING_EXCLUSIONS[row.memberId] === undefined;
}

function buildMetricLeaders(rows, definitions) {
  return definitions.map((definition) => {
    const ranked = rows.flatMap(({ shard, row }) => {
      if (!isComparativelyRankable(row)) return [];
      const value = definition.value(row);
      return value === null
        ? []
        : [{ value, ...rowReference(shard, row) }];
    }).sort((left, right) =>
      left.value - right.value ||
      compareText(left.caseHash, right.caseHash) ||
      compareText(left.file, right.file));
    return {
      metricId: definition.metricId,
      direction: definition.direction,
      valueSource: definition.valueSource,
      rankedEvaluatedRowCount: ranked.length,
      topFive: ranked.slice(0, 5),
    };
  });
}

function buildNearBoundaryRows(rows, tolerance) {
  const near = [];
  for (const { shard, row } of rows) {
    if (!isComparativelyRankable(row)) continue;
    for (const [gateId, gate] of Object.entries(
      row.score.quadrature?.gates ?? {},
    )) {
      const value = finiteOrNull(gate?.maximumChange);
      const threshold = finiteOrNull(gate?.threshold);
      if (value === null || threshold === null || threshold <= 0) continue;
      const relativeDistance = Math.abs(value - threshold) / threshold;
      if (relativeDistance <= tolerance) {
        near.push({
          gateId,
          value,
          threshold,
          relativeDistance,
          side: value <= threshold ? "passing-side" : "failing-side",
          ...rowReference(shard, row),
        });
      }
    }
  }
  return near.sort((left, right) =>
    left.relativeDistance - right.relativeDistance ||
    compareText(left.gateId, right.gateId) ||
    compareText(left.caseHash, right.caseHash));
}

function resolutionIdentity(campaign) {
  return {
    protocolHash: campaign.protocolHash,
    primary: campaign.protocol?.completeCycle?.primary ?? null,
    refined: campaign.protocol?.completeCycle?.refined ?? null,
  };
}

function comparableMetricValues(row, definitions) {
  return Object.fromEntries(definitions.flatMap((definition) => {
    const value = definition.value(row);
    return value === null ? [] : [[definition.metricId, value]];
  }));
}

function buildCrossResolutionDisagreements(rows, definitions) {
  const groups = new Map();
  for (const item of rows) {
    const key = item.row.exactRerunInstruction.sampledSpecHash;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  const disagreements = [];
  for (const [sampledSpecHash, group] of groups) {
    const resolutions = new Set(group.map(
      ({ shard }) => sha256Canonical(resolutionIdentity(shard.campaign)),
    ));
    if (resolutions.size < 2) continue;
    const entries = group.map(({ shard, row }) => ({
      resolution: resolutionIdentity(shard.campaign),
      evaluated: isRankable(row),
      coveragePassed: row.score?.status?.passed ?? null,
      metrics: isRankable(row)
        ? comparableMetricValues(row, definitions)
        : {},
      ...rowReference(shard, row),
    })).sort((left, right) =>
      compareText(left.resolution.protocolHash, right.resolution.protocolHash) ||
      compareText(left.caseHash, right.caseHash));
    const signatures = new Set(entries.map((entry) => canonicalJson({
      evaluated: entry.evaluated,
      coveragePassed: entry.coveragePassed,
      metrics: entry.metrics,
    })));
    if (signatures.size > 1) {
      disagreements.push({ sampledSpecHash, entries });
    }
  }
  return disagreements.sort(
    (left, right) => compareText(left.sampledSpecHash, right.sampledSpecHash),
  );
}

function buildAnomalies(rows) {
  const anomalies = [];
  const sampledSpecOccurrences = new Map();
  for (const { shard, row } of rows) {
    const reference = rowReference(shard, row);
    const sampledSpecHash = reference.sampledSpecHash;
    if (!sampledSpecOccurrences.has(sampledSpecHash)) {
      sampledSpecOccurrences.set(sampledSpecHash, []);
    }
    sampledSpecOccurrences.get(sampledSpecHash).push(reference);
    if (row.evaluationStatus.evaluated !== true) {
      anomalies.push({
        anomalyType: "drawn-not-evaluated",
        reasonCode: row.evaluationStatus.reasonCode ?? "unspecified",
        ...reference,
      });
    } else if (row.score === null) {
      anomalies.push({
        anomalyType: "evaluated-flag-with-null-score",
        reasonCode: "null-score-is-never-rankable",
        ...reference,
      });
    }
    if (row.sourceSpeed?.belowFieldSpeed !== true) {
      anomalies.push({
        anomalyType: "carrier-speed-at-or-above-field-speed-diagnostic",
        reasonCode: "maximum-carrier-speed-is-at-or-above-field-speed",
        rootPolicy:
          "all-retained-roots/event-specific-isolation-certified.v2",
        reviewDisposition:
          "diagnostic review only; not an exclusion or failed bound under " +
          "the event-specific root-isolation policy",
        ...reference,
      });
    }
  }
  for (const [sampledSpecHash, occurrences] of sampledSpecOccurrences) {
    const uniqueCaseHashes = new Set(occurrences.map((row) => row.caseHash));
    if (occurrences.length > 1 && uniqueCaseHashes.size === 1) {
      anomalies.push({
        anomalyType: "duplicate-retained-case",
        reasonCode: "same-sampled-spec-and-case-hash-occurs-more-than-once",
        sampledSpecHash,
        occurrences,
      });
    }
  }
  return anomalies.sort((left, right) =>
    compareText(left.anomalyType, right.anomalyType) ||
    compareText(left.caseHash ?? left.sampledSpecHash, right.caseHash ??
      right.sampledSpecHash));
}

function buildFailureTable(rows) {
  const groups = new Map();
  for (const { shard, row } of rows) {
    if (row.evaluationStatus.evaluated === true && row.score !== null) continue;
    const status = row.evaluationStatus;
    const groupIdentity = {
      statusCode: status.code,
      stage: status.stage ?? null,
      reasonCode: status.reasonCode ?? "unspecified",
      errorName: status.errorName ?? null,
      message: status.message ?? null,
      detailsHash: status.details === null || status.details === undefined
        ? null
        : sha256Canonical(status.details),
    };
    const key = canonicalJson(groupIdentity);
    if (!groups.has(key)) groups.set(key, { ...groupIdentity, cases: [] });
    groups.get(key).cases.push(rowReference(shard, row));
  }
  return [...groups.values()].map((group) => ({
    ...group,
    count: group.cases.length,
    cases: group.cases.sort((left, right) =>
      compareText(left.caseHash, right.caseHash)),
  })).sort((left, right) =>
    compareText(left.reasonCode, right.reasonCode) ||
    compareText(left.message ?? "", right.message ?? ""));
}

function buildAuditSample(rows, sampleSize) {
  return rows.map(({ shard, row }) => ({
    auditKey: sha256Bytes(
      Buffer.from(`${shard.campaign.campaignHash}\0${row.caseHash}`),
    ),
    ...rowReference(shard, row),
  })).sort((left, right) =>
    compareText(left.auditKey, right.auditKey) ||
    compareText(left.caseHash, right.caseHash)).slice(0, sampleSize);
}

function appendQueueReason(queue, reference, reason) {
  const key = `${reference.campaignHash}\0${reference.caseHash}`;
  if (!queue.has(key)) {
    queue.set(key, {
      campaignHash: reference.campaignHash,
      caseHash: reference.caseHash,
      file: reference.file,
      caseId: reference.caseId,
      memberId: reference.memberId,
      sampleOrdinal: reference.sampleOrdinal,
      reasons: [],
    });
  }
  const reasons = queue.get(key).reasons;
  if (!reasons.includes(reason)) reasons.push(reason);
}

function buildUniqueAdjudicationQueue({
  metricLeaders,
  nearBoundaryRows,
  crossResolutionDisagreements,
  anomalies,
  auditSample,
}) {
  const queue = new Map();
  for (const metric of metricLeaders) {
    for (const reference of metric.topFive) {
      appendQueueReason(queue, reference, `leader:${metric.metricId}`);
    }
  }
  for (const reference of nearBoundaryRows) {
    appendQueueReason(queue, reference, `near-boundary:${reference.gateId}`);
  }
  for (const disagreement of crossResolutionDisagreements) {
    for (const reference of disagreement.entries) {
      appendQueueReason(queue, reference, "cross-resolution-disagreement");
    }
  }
  for (const anomaly of anomalies) {
    if (anomaly.caseHash) {
      appendQueueReason(queue, anomaly, `anomaly:${anomaly.anomalyType}`);
    } else {
      for (const reference of anomaly.occurrences ?? []) {
        appendQueueReason(queue, reference, `anomaly:${anomaly.anomalyType}`);
      }
    }
  }
  for (const reference of auditSample) {
    appendQueueReason(queue, reference, "deterministic-audit-sample");
  }
  return [...queue.values()].map((row) => ({
    ...row,
    reasons: row.reasons.sort(compareText),
  })).sort((left, right) =>
    compareText(left.memberId, right.memberId) ||
    left.sampleOrdinal - right.sampleOrdinal ||
    compareText(left.caseHash, right.caseHash));
}

function groupCounts(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return Object.fromEntries([...counts].sort(([left], [right]) =>
    compareText(left, right)));
}

function buildMemberCounts(shards) {
  const counts = new Map();
  for (const shard of shards) {
    const perMember = shard.campaign.sampling.casesPerMember;
    const members = new Set(shard.campaign.caseRows.map((row) => row.memberId));
    for (const memberId of members) {
      if (!counts.has(memberId)) {
        counts.set(memberId, {
          memberId,
          expectedDrawCount: 0,
          actualDrawCount: 0,
          evaluatedCount: 0,
          notEvaluatedCount: 0,
          nullScoreCount: 0,
        });
      }
      counts.get(memberId).expectedDrawCount += perMember;
    }
    for (const row of shard.campaign.caseRows) {
      const count = counts.get(row.memberId);
      count.actualDrawCount += 1;
      if (isRankable(row)) count.evaluatedCount += 1;
      else count.notEvaluatedCount += 1;
      if (row.score === null) count.nullScoreCount += 1;
    }
  }
  return [...counts.values()].sort(
    (left, right) => compareText(left.memberId, right.memberId),
  );
}

function buildWaveSummary(shards) {
  const waves = new Map();
  for (const shard of shards) {
    if (!waves.has(shard.waveId)) {
      waves.set(shard.waveId, {
        waveId: shard.waveId,
        waveNumber: shard.waveNumber,
        seeds: new Set(),
        campaignFiles: [],
      });
    }
    const wave = waves.get(shard.waveId);
    wave.seeds.add(shard.campaign.sampling.seed);
    wave.campaignFiles.push({
      fileKind: shard.fileKind,
      shardNumber: shard.shardNumber,
      memberToken: shard.memberToken,
      file: shard.file,
      campaignHash: shard.campaign.campaignHash,
      seed: shard.campaign.sampling.seed,
      casesPerMember: shard.campaign.sampling.casesPerMember,
      expectedDrawCount:
        shard.campaign.sampling.memberCount *
        shard.campaign.sampling.casesPerMember,
      actualDrawCount: shard.campaign.caseRows.length,
    });
  }
  return [...waves.values()].map((wave) => ({
    ...wave,
    seeds: [...wave.seeds].sort(compareText),
    campaignFiles: wave.campaignFiles.sort((left, right) =>
      compareText(left.file, right.file)),
  })).sort((left, right) =>
    left.waveNumber - right.waveNumber);
}

function buildFrozenIdentitySet(shards) {
  const members = new Map();
  const fieldSpeeds = new Map();
  for (const shard of shards) {
    const fieldSpeed =
      shard.campaign.protocol?.eventEvaluator?.fieldSpeed;
    fieldSpeeds.set(canonicalJson(fieldSpeed), fieldSpeed);
    for (const row of shard.campaign.caseRows) {
      const key = `${row.familyId}\0${row.memberId}\0${row.candidateId}`;
      members.set(key, {
        familyId: row.familyId,
        memberId: row.memberId,
        candidateId: row.candidateId,
      });
    }
  }
  const unique = (values) => [...new Set(values)].sort(compareText);
  return {
    members: [...members.values()].sort((left, right) =>
      compareText(left.familyId, right.familyId) ||
      compareText(left.memberId, right.memberId) ||
      compareText(left.candidateId, right.candidateId)),
    samplerIds: unique(shards.map((shard) =>
      shard.campaign.sampling.samplerId)),
    protocolHashes: unique(shards.map((shard) =>
      shard.campaign.protocolHash)),
    implementationHashes: unique(shards.map((shard) =>
      shard.campaign.implementationIdentity.implementationHash)),
    fieldSpeeds: [...fieldSpeeds.entries()]
      .sort(([left], [right]) => compareText(left, right))
      .map(([, value]) => value),
    claimBoundaryHashes: unique(shards.map((shard) =>
      sha256Canonical(shard.campaign.claimBoundary))),
  };
}

function classifyCampaignFile(file) {
  const shard = file.match(SHARD_FILE_PATTERN);
  if (shard) {
    return {
      file,
      waveId: shard[1],
      waveNumber: shard[1] === "pilot" ? 0 : Number(shard[2]),
      fileKind: "shard",
      shardNumber: Number(shard[3]),
      memberToken: null,
    };
  }
  const member = file.match(MEMBER_FILE_PATTERN);
  if (member) {
    return {
      file,
      waveId: member[1],
      waveNumber: Number(member[2]),
      fileKind: "member",
      shardNumber: null,
      memberToken: member[3],
    };
  }
  const campaign = file.match(CAMPAIGN_JSON_FILE_PATTERN);
  if (!campaign) return null;
  return {
    file,
    waveId: campaign[1],
    waveNumber: campaign[1] === "pilot" ? 0 : Number(campaign[2]),
    fileKind: "unrecognized",
    shardNumber: null,
    memberToken: null,
  };
}

function buildTerminalBoundary({
  throughWave,
  expectedPilotShardCount,
  expectedWaveShardCount,
  expectedWave3MemberCount,
  discoveredCampaignFiles,
  validShards,
  skippedFiles,
  unexpectedInBoundaryFiles,
  laterThanBoundaryFiles,
  frozenIdentitySet,
}) {
  const defects = [];
  if (throughWave === null) {
    defects.push({
      code: "terminal-boundary-not-declared",
      detail: "declare --through-wave N before treating the receipt as final",
    });
  } else {
    const requiredWaves = Array.from(
      { length: throughWave + 1 },
      (_, waveNumber) => {
        const fileKind = waveNumber === 3 ? "member" : "shard";
        return {
          waveId: waveNumber === 0
            ? "pilot"
            : `wave-${String(waveNumber).padStart(2, "0")}`,
          waveNumber,
          fileKind,
          expectedFileCount: waveNumber === 0
            ? expectedPilotShardCount
            : waveNumber === 3
              ? expectedWave3MemberCount
              : expectedWaveShardCount,
        };
      },
    );
    const referenceMembers = [...new Set(validShards
      .filter((shard) => shard.waveNumber === 0)
      .flatMap((shard) => shard.campaign.caseRows.map((row) => row.memberId)))]
      .sort(compareText);
    for (const required of requiredWaves) {
      const allDiscovered = discoveredCampaignFiles.filter(
        (row) => row.waveNumber === required.waveNumber,
      );
      const discovered = allDiscovered.filter(
        (row) => row.fileKind === required.fileKind,
      );
      const wrongLayoutFiles = allDiscovered
        .filter((row) => row.fileKind !== required.fileKind)
        .map((row) => row.file)
        .sort(compareText);
      if (wrongLayoutFiles.length > 0) {
        defects.push({
          code: "boundary-wave-layout-mismatch",
          waveId: required.waveId,
          requiredFileKind: required.fileKind,
          files: wrongLayoutFiles,
        });
      }
      if (required.fileKind === "member") {
        const validMemberFiles = validShards.filter(
          (shard) => shard.waveNumber === required.waveNumber &&
            shard.fileKind === "member",
        );
        const fileMembers = validMemberFiles.map((shard) => {
          const members = [...new Set(
            shard.campaign.caseRows.map((row) => row.memberId),
          )].sort(compareText);
          return {
            file: shard.file,
            memberToken: shard.memberToken,
            members,
          };
        });
        const invalidMemberFiles = fileMembers.filter(
          (row) => row.members.length !== 1 ||
            row.memberToken !== row.members[0]?.replaceAll(".", "-"),
        );
        const observedMembers = fileMembers.flatMap((row) =>
          row.members.length === 1 ? row.members : []);
        const memberCounts = new Map();
        for (const memberId of observedMembers) {
          memberCounts.set(memberId, (memberCounts.get(memberId) ?? 0) + 1);
        }
        const duplicateMembers = [...memberCounts.entries()]
          .filter(([, count]) => count > 1)
          .map(([memberId, count]) => ({ memberId, count }))
          .sort((left, right) => compareText(left.memberId, right.memberId));
        const observedMemberSet = [...memberCounts.keys()].sort(compareText);
        const missingMembers = referenceMembers.filter(
          (memberId) => !memberCounts.has(memberId),
        );
        const extraMembers = observedMemberSet.filter(
          (memberId) => !referenceMembers.includes(memberId),
        );
        if (discovered.length !== required.expectedFileCount ||
            invalidMemberFiles.length > 0 ||
            duplicateMembers.length > 0 ||
            referenceMembers.length !== required.expectedFileCount ||
            missingMembers.length > 0 ||
            extraMembers.length > 0) {
          defects.push({
            code: "boundary-member-inventory-mismatch",
            waveId: required.waveId,
            expectedMemberFileCount: required.expectedFileCount,
            discoveredMemberFileCount: discovered.length,
            referenceMemberCount: referenceMembers.length,
            invalidMemberFiles,
            duplicateMembers,
            missingMembers,
            extraMembers,
          });
        }
      } else {
      const byShardNumber = new Map();
      for (const row of discovered) {
        if (!byShardNumber.has(row.shardNumber)) {
          byShardNumber.set(row.shardNumber, []);
        }
        byShardNumber.get(row.shardNumber).push(row.file);
      }
      const expectedNumbers = Array.from(
        { length: required.expectedFileCount },
        (_, index) => index + 1,
      );
      const missingShardNumbers = expectedNumbers.filter(
        (number) => !byShardNumber.has(number),
      );
      const duplicateShardNumbers = [...byShardNumber.entries()]
        .filter(([, files]) => files.length > 1)
        .map(([shardNumber, files]) => ({
          shardNumber,
          files: [...files].sort(compareText),
        }))
        .sort((left, right) => left.shardNumber - right.shardNumber);
      const extraShardNumbers = [...byShardNumber.keys()]
        .filter((number) =>
          number < 1 || number > required.expectedFileCount)
        .sort((left, right) => left - right);
      if (missingShardNumbers.length > 0 ||
          duplicateShardNumbers.length > 0 ||
          extraShardNumbers.length > 0) {
        defects.push({
          code: "boundary-shard-inventory-mismatch",
          waveId: required.waveId,
          expectedShardCount: required.expectedFileCount,
          discoveredShardFileCount: discovered.length,
          missingShardNumbers,
          duplicateShardNumbers,
          extraShardNumbers,
        });
      }
      }
      const seeds = [...new Set(validShards
        .filter((shard) =>
          shard.waveNumber === required.waveNumber &&
          shard.fileKind === required.fileKind)
        .map((shard) => shard.campaign.sampling.seed))]
        .sort(compareText);
      if (seeds.length !== 1) {
        defects.push({
          code: "wave-seed-count-mismatch",
          waveId: required.waveId,
          requiredSeedCount: 1,
          seeds,
        });
      }
    }
  }
  if (skippedFiles.length > 0) {
    defects.push({
      code: "invalid-or-incomplete-in-boundary-campaign-files",
      files: skippedFiles.map((row) => row.file),
    });
  }
  if (unexpectedInBoundaryFiles.length > 0) {
    defects.push({
      code: "unexpected-in-boundary-campaign-files",
      files: unexpectedInBoundaryFiles.map((row) => row.file),
    });
  }

  const identityChecks = [
    ["implementation-hash", frozenIdentitySet.implementationHashes],
    ["protocol-hash", frozenIdentitySet.protocolHashes],
    ["sampler-id", frozenIdentitySet.samplerIds],
    ["claim-boundary-hash", frozenIdentitySet.claimBoundaryHashes],
    ["field-speed", frozenIdentitySet.fieldSpeeds],
  ];
  for (const [identity, values] of identityChecks) {
    if (values.length !== 1) {
      defects.push({
        code: "mixed-frozen-identity",
        identity,
        values,
      });
    }
  }
  if (frozenIdentitySet.fieldSpeeds.length !== 1 ||
      frozenIdentitySet.fieldSpeeds[0] !== 1) {
    defects.push({
      code: "field-speed-requirement-not-satisfied",
      requiredFieldSpeed: 1,
      observedFieldSpeeds: frozenIdentitySet.fieldSpeeds,
    });
  }
  const campaignHashCounts = new Map();
  for (const shard of validShards) {
    const hash = shard.campaign.campaignHash;
    campaignHashCounts.set(hash, (campaignHashCounts.get(hash) ?? 0) + 1);
  }
  const duplicateCampaignHashes = [...campaignHashCounts.entries()]
    .filter(([, count]) => count > 1)
    .map(([campaignHash, count]) => ({ campaignHash, count }))
    .sort((left, right) =>
      compareText(left.campaignHash, right.campaignHash));
  if (duplicateCampaignHashes.length > 0) {
    defects.push({
      code: "duplicate-shard-campaign-hashes",
      duplicateCampaignHashes,
    });
  }

  const expectedTotalShardCount = throughWave === null
    ? null
    : Array.from({ length: throughWave + 1 }, (_, waveNumber) =>
      waveNumber === 0
        ? expectedPilotShardCount
        : waveNumber === 3
          ? expectedWave3MemberCount
          : expectedWaveShardCount)
      .reduce((sum, count) => sum + count, 0);
  return {
    declared: throughWave !== null,
    throughWave,
    expectedPilotShardCount,
    expectedWaveShardCount,
    expectedWave3MemberCount,
    expectedTotalCampaignFileCount: expectedTotalShardCount,
    discoveredInBoundaryCampaignFileCount: discoveredCampaignFiles.length,
    validInBoundaryCampaignFileCount: validShards.length,
    laterThanBoundaryFiles,
    unexpectedInBoundaryFiles,
    defects,
    terminal: defects.length === 0,
  };
}

export function analyzeCompactFamilySweep({
  inputDirectory = DEFAULT_INPUT_DIRECTORY,
  auditSampleSize = 12,
  nearBoundaryRelativeTolerance = 0.1,
  throughWave = null,
  expectedPilotShardCount = DEFAULT_EXPECTED_PILOT_SHARD_COUNT,
  expectedWaveShardCount = DEFAULT_EXPECTED_WAVE_SHARD_COUNT,
  expectedWave3MemberCount = DEFAULT_EXPECTED_WAVE_3_MEMBER_COUNT,
} = {}) {
  const resolvedInput = path.resolve(inputDirectory);
  requiredPositiveInteger(auditSampleSize, "auditSampleSize");
  optionalNonnegativeInteger(throughWave, "throughWave");
  requiredPositiveInteger(
    expectedPilotShardCount,
    "expectedPilotShardCount",
  );
  requiredPositiveInteger(expectedWaveShardCount, "expectedWaveShardCount");
  requiredPositiveInteger(
    expectedWave3MemberCount,
    "expectedWave3MemberCount",
  );
  if (typeof nearBoundaryRelativeTolerance !== "number" ||
      !Number.isFinite(nearBoundaryRelativeTolerance) ||
      nearBoundaryRelativeTolerance < 0) {
    fail("nearBoundaryRelativeTolerance must be a nonnegative number.");
  }
  const jsonFiles = readdirSync(resolvedInput)
    .filter((file) => file.endsWith(".json"))
    .sort(compareText);
  const campaignJsonFiles = jsonFiles
    .map(classifyCampaignFile)
    .filter((row) => row !== null);
  const inBoundary = (row) =>
    throughWave === null || row.waveNumber <= throughWave;
  const selectedCampaignFiles = campaignJsonFiles
    .filter(inBoundary)
    .filter((row) => row.fileKind !== "unrecognized");
  const laterThanBoundaryFiles = throughWave === null
    ? []
    : campaignJsonFiles.filter((row) => row.waveNumber > throughWave)
      .map((row) => ({
        file: row.file,
        waveNumber: row.waveNumber,
        exclusionReason: "later-than-declared-terminal-boundary",
      }));
  const unexpectedInBoundaryFiles = campaignJsonFiles
    .filter(inBoundary)
    .filter((row) => row.fileKind === "unrecognized")
    .map((row) => ({
      file: row.file,
      waveNumber: row.waveNumber,
      reason: "campaign-json-does-not-match-a-supported-boundary-layout",
    }));
  const readResults = selectedCampaignFiles.map(
    (descriptor) => readStableCampaign(resolvedInput, descriptor),
  );
  const skippedFiles = readResults.flatMap(
    (result) => result.skipped ? [result.skipped] : [],
  ).sort((left, right) => compareText(left.file, right.file));
  const shards = readResults.flatMap(
    (result) => result.shard ? [result.shard] : [],
  ).sort((left, right) =>
    left.waveSort - right.waveSort ||
    compareText(left.file, right.file));
  if (shards.length === 0) {
    fail("no complete, valid compact Monte Carlo JSON campaigns were found.");
  }
  const frozenIdentitySet = buildFrozenIdentitySet(shards);
  const terminalBoundary = buildTerminalBoundary({
    throughWave,
    expectedPilotShardCount,
    expectedWaveShardCount,
    expectedWave3MemberCount,
    discoveredCampaignFiles: selectedCampaignFiles,
    validShards: shards,
    skippedFiles,
    unexpectedInBoundaryFiles,
    laterThanBoundaryFiles,
    frozenIdentitySet,
  });

  const rows = shards.flatMap((shard) =>
    shard.campaign.caseRows.map((row) => ({ shard, row })))
    .sort((left, right) =>
      compareText(
        rowSortKey(left.shard, left.row),
        rowSortKey(right.shard, right.row),
      ));
  const definitions = metricDefinitions(rows);
  const metricLeaders = buildMetricLeaders(rows, definitions);
  const nearBoundaryRows = buildNearBoundaryRows(
    rows,
    nearBoundaryRelativeTolerance,
  );
  const crossResolutionDisagreements =
    buildCrossResolutionDisagreements(rows, definitions);
  const anomalies = buildAnomalies(rows);
  const auditSample = buildAuditSample(rows, auditSampleSize);
  const uniqueCases = buildUniqueAdjudicationQueue({
    metricLeaders,
    nearBoundaryRows,
    crossResolutionDisagreements,
    anomalies,
    auditSample,
  });
  const expectedDrawCount = shards.reduce((sum, shard) =>
    sum +
      shard.campaign.sampling.memberCount *
      shard.campaign.sampling.casesPerMember, 0);
  const manifest = {
    schema: RECEIPT_SCHEMA,
    mergeDisposition:
      "manifest of distinct campaign files; no canonical merged campaign",
    canonicalMergedCampaignCreated: false,
    distinctCampaignHashCount:
      new Set(shards.map((shard) => shard.campaign.campaignHash)).size,
    campaignFiles: shards.map((shard) => ({
      file: shard.file,
      fileKind: shard.fileKind,
      waveId: shard.waveId,
      shardNumber: shard.shardNumber,
      memberToken: shard.memberToken,
      fileBytes: shard.fileBytes,
      fileSha256: shard.fileSha256,
      campaignId: shard.campaign.campaignId,
      campaignHash: shard.campaign.campaignHash,
      protocolHash: shard.campaign.protocolHash,
      implementationHash:
        shard.campaign.implementationIdentity.implementationHash,
      campaignHashVerified: true,
      fileHashAlgorithm: "sha256-bytes",
    })),
  };
  const analysisBody = {
    schema: ANALYSIS_SCHEMA,
    claimGrade: "measured",
    claimBoundary: {
      diagnosticOnly: true,
      establishes: [
        "retained compact campaign-file inventory",
        "deterministic descriptive ranking",
        "full-adjudication queue selection",
      ],
      doesNotEstablish: [
        "stability",
        "retention",
        "energy closure",
        "quantization",
        "particle identity",
        "physical realization",
        "canonical merged campaign identity",
      ],
      independentAcceptancePerformed: false,
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
      liveCampaignMutationPerformed: false,
    },
    inputPolicy: {
      shardFilenamePattern: SHARD_FILE_PATTERN.source,
      memberFilenamePattern: MEMBER_FILE_PATTERN.source,
      campaignJsonFilenamePattern: CAMPAIGN_JSON_FILE_PATTERN.source,
      completedJsonOnly: true,
      stableReadRequired: true,
      campaignHashRequiredAndVerified: true,
      malformedMissingOrChangingFilesExcluded: true,
      laterThanDeclaredBoundaryExcluded: throughWave !== null,
    },
    status: terminalBoundary.terminal
      ? "terminal-for-declared-boundary"
      : "nonterminal",
    terminalBoundary,
    skippedFiles,
    frozenIdentitySet,
    seeds: [...new Set(shards.map(
      (shard) => shard.campaign.sampling.seed,
    ))].sort(compareText),
    waves: buildWaveSummary(shards),
    drawCounts: {
      expected: expectedDrawCount,
      actual: rows.length,
      evaluated: rows.filter(({ row }) => isRankable(row)).length,
      notEvaluated: rows.filter(({ row }) => !isRankable(row)).length,
      nullScoreRows: rows.filter(({ row }) => row.score === null).length,
    },
    perMemberCounts: buildMemberCounts(shards),
    structuredFailureTable: buildFailureTable(rows),
    metricLeaders: {
      combinedScoreCreated: false,
      directionsAreMetricSpecific: true,
      exclusions: Object.entries(COMPARATIVE_RANKING_EXCLUSIONS).map(
        ([memberId, reason]) => ({ memberId, reason }),
      ),
      metrics: metricLeaders,
    },
    storageAndWallTime: {
      campaignFileCount: shards.length,
      aggregateShardWallSeconds: shards.reduce(
        (sum, shard) => sum + shard.campaign.wallSeconds,
        0,
      ),
      maximumSingleShardWallSeconds: Math.max(
        ...shards.map((shard) => shard.campaign.wallSeconds),
      ),
      wallTimeDisposition:
        "aggregate and maximum retained campaign-file timings; not " +
        "coordinator elapsed time",
      jsonFileBytes: shards.reduce(
        (sum, shard) => sum + shard.fileBytes,
        0,
      ),
      retainedCaseBytes: rows.reduce(
        (sum, { row }) => sum +
          (finiteOrNull(row.measuredCost?.retainedCaseBytes) ?? 0),
        0,
      ),
      maximumProcessLifetimeRssKilobytes: Math.max(
        ...rows.map(({ row }) =>
          finiteOrNull(
            row.measuredCost?.processLifetimeMaximumRssKilobytes,
          ) ?? 0),
      ),
      storageDisposition:
        "retained JSON bytes and per-row serialized byte counters only",
    },
    fullAdjudicationQueue: {
      criteria: {
        metricLeaders:
          "top five evaluated active-candidate rows per metric; deprecated controls excluded",
        nearBoundary:
          `quadrature maximumChange within relative distance ` +
          `${nearBoundaryRelativeTolerance} of its positive threshold`,
        crossResolution:
          "same sampledSpecHash with differing retained outcomes or metrics",
        anomalies:
          "not-evaluated, null-score inconsistency, diagnostic carrier-speed, " +
          "or duplicate cases",
        deterministicAuditSample:
          `${Math.min(auditSampleSize, rows.length)} smallest ` +
          "sha256(campaignHash NUL caseHash) keys",
      },
      metricLeaders,
      nearBoundaryRows,
      crossResolutionDisagreements,
      anomalies,
      deterministicAuditSample: auditSample,
      uniqueCases,
    },
    campaignAndFileManifest: manifest,
  };
  const analysisHash = sha256Canonical(analysisBody);
  return {
    ...analysisBody,
    coordinatorReceipt: {
      schema: RECEIPT_SCHEMA,
      status: analysisBody.status,
      analysisHash,
      manifestHash: sha256Canonical(manifest),
      distinctCampaignIdentitiesPreserved: true,
      canonicalMergedCampaignCreated: false,
      completedCampaignFileCount: shards.length,
      skippedCampaignFileCount: skippedFiles.length,
      terminalBoundaryDeclared: terminalBoundary.declared,
      terminalBoundarySatisfied: terminalBoundary.terminal,
      terminalBoundaryDefectCount: terminalBoundary.defects.length,
      expectedDrawCount,
      actualDrawCount: rows.length,
      exactRerunBoundary:
        "receipt identifies retained inputs; full adjudication must rerun selected cases",
    },
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
    if (value === undefined || value.startsWith("--")) {
      fail(`${key} requires a value.`);
    }
    values.set(key, value);
    index += 1;
  }
  const auditSampleSize = Number(values.get("--audit-sample-size") ?? "12");
  const nearBoundaryRelativeTolerance = Number(
    values.get("--near-boundary-relative-tolerance") ?? "0.1",
  );
  const throughWave = values.has("--through-wave")
    ? Number(values.get("--through-wave"))
    : null;
  const expectedPilotShardCount = Number(
    values.get("--expected-pilot-shards") ??
      String(DEFAULT_EXPECTED_PILOT_SHARD_COUNT),
  );
  const expectedWaveShardCount = Number(
    values.get("--expected-wave-shards") ??
      String(DEFAULT_EXPECTED_WAVE_SHARD_COUNT),
  );
  const expectedWave3MemberCount = Number(
    values.get("--expected-wave-3-members") ??
      String(DEFAULT_EXPECTED_WAVE_3_MEMBER_COUNT),
  );
  return {
    help: flags.has("--help"),
    inputDirectory: values.get("--input") ?? DEFAULT_INPUT_DIRECTORY,
    auditSampleSize,
    nearBoundaryRelativeTolerance,
    throughWave,
    expectedPilotShardCount,
    expectedWaveShardCount,
    expectedWave3MemberCount,
  };
}

function help() {
  console.log([
    "Usage:",
    "  node scripts/eom/analyze-compact-family-sweep.mjs [options]",
    "",
    "Options:",
    `  --input PATH                              default: ${DEFAULT_INPUT_DIRECTORY}`,
    "  --through-wave N                         declare terminal wave boundary",
    "  --expected-pilot-shards N                default: 6",
    "  --expected-wave-shards N                 default: 6",
    "  --expected-wave-3-members N               default: 20",
    "  --audit-sample-size N                    default: 12",
    "  --near-boundary-relative-tolerance X     default: 0.1",
    "  --help",
    "",
    "Reads completed in-boundary compact campaign JSON and writes one",
    "deterministic receipt to stdout. Wave 3 uses per-member files; the other",
    "declared waves use shards. Later waves are excluded and reported. It does",
    "not launch evaluations, import SQLite, or write campaign files. Distinct",
    "campaign hashes remain distinct.",
  ].join("\n"));
}

function main() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    help();
    return;
  }
  const result = analyzeCompactFamilySweep(options);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (options.throughWave !== null &&
      result.coordinatorReceipt.terminalBoundarySatisfied !== true) {
    process.exitCode = 2;
  }
}

const invokedPath = process.argv[1] === undefined
  ? null
  : pathToFileURL(path.resolve(process.argv[1])).href;
if (invokedPath === import.meta.url) main();
