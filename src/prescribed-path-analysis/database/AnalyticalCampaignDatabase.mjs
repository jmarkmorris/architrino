import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { DatabaseSync, backup } from "node:sqlite";
import { gzipSync, gunzipSync } from "node:zlib";

import {
  canonicalJson,
  sha256Canonical,
} from "../AnalyticalBraidEvaluator.mjs";
import {
  validateExactPrescribedSourceRecord,
} from "../ExactPrescribedSourceWake.mjs";
import {
  INDEPENDENT_ACCEPTANCE_INSTRUMENT_VERSION,
  verifyIndependentCaseAcceptance,
} from "./IndependentAnalyticalAcceptance.mjs";

export const ANALYTICAL_CAMPAIGN_DATABASE_SCHEMA =
  "prescribed-record-analytics/sqlite.v1";
export const ANALYTICAL_CAMPAIGN_IMPORTER_VERSION =
  "prescribed-record-analytics/sqlite-importer.v1";
export const ANALYTICAL_CAMPAIGN_EXPORTER_VERSION =
  "prescribed-record-analytics/sqlite-exporter.v1";
export const DEFAULT_INGEST_TRANSACTION_BATCH_SIZE = 32;

const B1_MANIFEST_SCHEMA =
  "prescribed-path-analysis/b1-cap-angle-campaign-manifest.v1";
const B1_SUMMARY_SCHEMA =
  "prescribed-path-analysis/b1-cap-angle-campaign-summary.v1";
const ALL_CANDIDATE_MANIFEST_SCHEMA =
  "prescribed-path-analysis/all-candidate-campaign-manifest.v1";
const ALL_CANDIDATE_SUMMARY_SCHEMA =
  "prescribed-path-analysis/all-candidate-campaign-summary.v1";
const ALL_CASES_POLICY = "all-cases-all-gates/fail-closed.v1";
const COMPLETE_CANDIDATE_INVENTORY_POLICY =
  "complete-candidate-inventory/fail-closed.v1";
const COMPLETE_CYCLE_CANDIDATE_INVENTORY_POLICY =
  "complete-cycle-candidate-inventory/fail-closed.v1";
const COMPLETE_CYCLE_RESULT_SCHEMA =
  "prescribed-path-analysis/complete-cycle-candidate-result.v1";
const REPOSITORY_ROOT = path.resolve(import.meta.dirname, "../../..");
const MIGRATION_DIRECTORY = new URL("./migrations/", import.meta.url);

function fail(message) {
  throw new Error(message);
}

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function hashBuffer(hex, label = "hash") {
  if (typeof hex !== "string" || !/^[0-9a-f]{64}$/.test(hex)) {
    throw new TypeError(`${label} must be a lowercase hexadecimal SHA-256.`);
  }
  return Buffer.from(hex, "hex");
}

function hashHex(bytes) {
  return Buffer.from(bytes).toString("hex");
}

function canonicalBytes(value) {
  return Buffer.from(canonicalJson(value));
}

function prettyJsonBytes(value) {
  return Buffer.from(`${JSON.stringify(value, null, 2)}\n`);
}

function withoutField(value, field) {
  const copy = structuredClone(value);
  delete copy[field];
  return copy;
}

function parseJsonBytes(bytes, label) {
  try {
    return JSON.parse(Buffer.from(bytes).toString("utf8"));
  } catch (error) {
    throw new TypeError(`${label} is not valid JSON: ${error.message}`);
  }
}

function finite(value, label) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new TypeError(`${label} must be finite.`);
  }
  return value;
}

function positiveInteger(value, label) {
  if (!Number.isSafeInteger(value) || value < 1) {
    throw new TypeError(`${label} must be a positive safe integer.`);
  }
  return value;
}

function safeRelativePath(value, label) {
  if (typeof value !== "string" || value.length === 0 || path.isAbsolute(value)) {
    throw new TypeError(`${label} must be a nonempty relative path.`);
  }
  const normalized = path.normalize(value);
  if (normalized === ".." || normalized.startsWith(`..${path.sep}`)) {
    throw new RangeError(`${label} must not escape its root.`);
  }
  return normalized;
}

function sameStoredValue(actual, expected) {
  if (Buffer.isBuffer(expected) || expected instanceof Uint8Array) {
    return Buffer.from(actual).equals(Buffer.from(expected));
  }
  return Object.is(actual, expected);
}

function assertStoredRow(actual, expected, label) {
  if (!actual) fail(`${label} was not stored.`);
  for (const [key, value] of Object.entries(expected)) {
    if (!sameStoredValue(actual[key], value)) {
      fail(`${label} conflicts at ${key}.`);
    }
  }
}

function insertOrVerify(database, {
  insertSql,
  insertParameters,
  selectSql,
  selectParameters,
  expected,
  label,
}) {
  const result = database.prepare(insertSql).run(...insertParameters);
  if (result.changes === 0) {
    const actual = database.prepare(selectSql).get(...selectParameters);
    assertStoredRow(actual, expected, label);
  }
  return result.changes;
}

function tableExists(database, tableName) {
  return Boolean(database.prepare(
    "SELECT 1 FROM sqlite_schema WHERE type = 'table' AND name = ?",
  ).get(tableName));
}

function configureDatabase(database, {
  writable,
  experimentalJournalMode = "WAL",
  experimentalSynchronous = "FULL",
}) {
  database.exec("PRAGMA foreign_keys = ON");
  database.exec("PRAGMA busy_timeout = 5000");
  if (writable) {
    const journalMode = String(experimentalJournalMode).toUpperCase();
    const synchronous = String(experimentalSynchronous).toUpperCase();
    if (!["WAL", "DELETE", "OFF"].includes(journalMode)) {
      fail("experimentalJournalMode must be WAL, DELETE, or OFF.");
    }
    if (!["FULL", "NORMAL", "OFF"].includes(synchronous)) {
      fail("experimentalSynchronous must be FULL, NORMAL, or OFF.");
    }
    if (journalMode === "OFF") database.enableDefensive(false);
    const appliedJournalMode = String(
      database.prepare(`PRAGMA journal_mode = ${journalMode}`).get().journal_mode,
    ).toUpperCase();
    if (journalMode === "OFF") database.enableDefensive(true);
    if (appliedJournalMode !== journalMode) {
      fail(
        `SQLite refused journal mode ${journalMode}; applied ${appliedJournalMode}.`,
      );
    }
    database.exec(`PRAGMA synchronous = ${synchronous}`);
  }
}

export function defaultLegacyAnalyticalCampaignDatabasePath(
  repositoryRoot = REPOSITORY_ROOT,
) {
  return path.join(repositoryRoot, ".local-data/braid-analysis/analytical-campaigns.sqlite3");
}

// Compatibility-only name for read-only analysis and explicit legacy tools.
// New local campaign storage uses defaultCompactAnalyticalCampaignDatabasePath.
export const defaultAnalyticalCampaignDatabasePath =
  defaultLegacyAnalyticalCampaignDatabasePath;

export function assertAnalyticalCampaignDatabasePath(databasePath, options = {}) {
  const repositoryRoot = path.resolve(options.repositoryRoot ?? REPOSITORY_ROOT);
  const absolutePath = path.resolve(databasePath);
  const relative = path.relative(repositoryRoot, absolutePath);
  if (relative === "" || relative === ".") {
    fail("the analytical database path must name a file, not the repository root.");
  }
  if (relative.startsWith("..") || path.isAbsolute(relative)) return absolutePath;
  const runtimeRoot = path.join(repositoryRoot, ".local-data/braid-analysis");
  if (absolutePath !== runtimeRoot && !absolutePath.startsWith(`${runtimeRoot}${path.sep}`)) {
    fail("an in-repository analytical database must remain under .local-data/braid-analysis/.");
  }
  const ignored = spawnSync(
    "git",
    ["check-ignore", "--quiet", "--", ".local-data/braid-analysis/"],
    { cwd: repositoryRoot, stdio: "ignore" },
  );
  if (ignored.status !== 0) {
    fail(".local-data/braid-analysis/ is not ignored by Git; refusing database startup.");
  }
  return absolutePath;
}

function migrationFiles() {
  return readdirSync(MIGRATION_DIRECTORY)
    .filter((name) => /^\d{3}-[a-z0-9-]+\.sql$/.test(name))
    .sort()
    .map((name) => ({
      name,
      ordinal: Number(name.slice(0, 3)),
      sql: readFileSync(new URL(name, MIGRATION_DIRECTORY), "utf8"),
    }));
}

export function migrateAnalyticalCampaignDatabase(database, options = {}) {
  const appliedAt = options.appliedAt ?? new Date().toISOString();
  const migrations = migrationFiles();
  for (const migration of migrations) {
    const checksum = hashBuffer(sha256Bytes(Buffer.from(migration.sql)));
    const alreadyApplied = tableExists(database, "schema_migration")
      ? database.prepare(`
          SELECT migration_ordinal, checksum, tool_version
          FROM schema_migration WHERE migration_id = ?
        `).get(migration.name)
      : null;
    if (alreadyApplied) {
      assertStoredRow(alreadyApplied, {
        migration_ordinal: migration.ordinal,
        checksum,
        tool_version: ANALYTICAL_CAMPAIGN_IMPORTER_VERSION,
      }, `migration ${migration.name}`);
      continue;
    }
    database.exec("BEGIN IMMEDIATE");
    try {
      database.exec(migration.sql);
      database.prepare(`
        INSERT INTO schema_migration(
          migration_id, migration_ordinal, checksum, applied_at, tool_version
        ) VALUES (?, ?, ?, ?, ?)
      `).run(
        migration.name,
        migration.ordinal,
        checksum,
        appliedAt,
        ANALYTICAL_CAMPAIGN_IMPORTER_VERSION,
      );
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  return migrations.map((migration) => migration.name);
}

export function openAnalyticalCampaignDatabase(databasePath, options = {}) {
  const absolutePath = assertAnalyticalCampaignDatabasePath(databasePath, options);
  const readOnly = options.readOnly === true;
  if (!readOnly) mkdirSync(path.dirname(absolutePath), { recursive: true });
  const database = new DatabaseSync(absolutePath, { readOnly });
  configureDatabase(database, {
    writable: !readOnly,
    experimentalJournalMode: options.experimentalJournalMode,
    experimentalSynchronous: options.experimentalSynchronous,
  });
  if (!readOnly && options.migrate !== false) {
    migrateAnalyticalCampaignDatabase(database, options);
  }
  return database;
}

function expectedCampaignCases(manifest) {
  if (manifest.schema === ALL_CANDIDATE_MANIFEST_SCHEMA) {
    if (!Array.isArray(manifest.cases) || manifest.cases.length === 0) {
      fail("all-candidate campaign manifest cases must be nonempty.");
    }
    return manifest.cases.map((row) => ({
      caseId: row.caseId,
      caseType: row.caseType,
    }));
  }
  const anchors = manifest.anchors.map((anchor) => ({
    caseId: anchor.caseId,
    caseType: "anchor",
  }));
  const width = Math.max(3, String(Math.max(0, manifest.sampleCount - 1)).length);
  const samples = Array.from({ length: manifest.sampleCount }, (_, index) => ({
    caseId: `sample-${String(index).padStart(width, "0")}`,
    caseType: "seeded-sample",
  }));
  return [...anchors, ...samples];
}

function validateManifestAndSummary(manifest, summary) {
  const b1Campaign = manifest.schema === B1_MANIFEST_SCHEMA &&
    summary.schema === B1_SUMMARY_SCHEMA;
  const allCandidateCampaign = manifest.schema === ALL_CANDIDATE_MANIFEST_SCHEMA &&
    summary.schema === ALL_CANDIDATE_SUMMARY_SCHEMA;
  if (!b1Campaign && !allCandidateCampaign) {
    fail(`unsupported campaign manifest schema ${manifest.schema}.`);
  }
  if (b1Campaign && (!Array.isArray(manifest.anchors) ||
      !Number.isSafeInteger(manifest.sampleCount) || manifest.sampleCount < 0)) {
    fail("campaign manifest inventory is invalid.");
  }
  const manifestHash = sha256Canonical(manifest);
  if (summary.manifestHash !== manifestHash) {
    fail("campaign summary manifest hash does not match the supplied manifest.");
  }
  const summaryHash = sha256Canonical(withoutField(summary, "summaryHash"));
  if (summary.summaryHash !== summaryHash) {
    fail("campaign summary hash is invalid.");
  }
  if (summary.campaignId !== manifest.campaignId ||
      summary.commonProtocol?.protocolHash !== manifest.commonProtocol?.protocolHash) {
    fail("campaign summary identity does not match the manifest.");
  }
  const expected = expectedCampaignCases(manifest);
  if (!Array.isArray(summary.cases) || summary.cases.length !== expected.length) {
    fail("campaign summary case count does not match the manifest inventory.");
  }
  for (let index = 0; index < expected.length; index += 1) {
    if (summary.cases[index]?.caseId !== expected[index].caseId ||
        summary.cases[index]?.caseType !== expected[index].caseType) {
      fail(`campaign summary case inventory differs at ordinal ${index}.`);
    }
  }
  const anchorCount = b1Campaign ? manifest.anchors.length : 0;
  const seededSampleCount = b1Campaign ? manifest.sampleCount : 0;
  const inferredLegacyB1Policy = {
    id: ALL_CASES_POLICY,
    requiredTotalCaseCount: expected.length,
    requiredAnchorCount: anchorCount,
    requiredSeededSampleCount: seededSampleCount,
    requiredGates: [
      "source-speed",
      "root-completeness",
      "root-transversality",
      "minimum-separation",
      "numerical-convergence",
    ],
    failureDisposition: "reject-campaign-and-write-no-artifacts",
  };
  const required = manifest.acceptancePolicy ?? inferredLegacyB1Policy;
  if (required.requiredTotalCaseCount !== expected.length ||
      required.requiredAnchorCount !== anchorCount ||
      required.requiredSeededSampleCount !== seededSampleCount) {
    fail("campaign acceptance counts do not match the manifest inventory.");
  }
  const basicRequiredGateIds = [
    "source-speed",
    "root-completeness",
    "root-transversality",
    "minimum-separation",
    "numerical-convergence",
  ];
  const completeCycleRequiredGateIds = [
    "surfaceQuadrature",
    "fixedInternalPrimary",
    "fixedInternalRefined",
    "movingReceiverPrimary",
    "movingReceiverRefined",
    "branchContinuity",
    "transmitterSensitivity",
  ];
  const completeCycleCampaign =
    required.id === COMPLETE_CYCLE_CANDIDATE_INVENTORY_POLICY;
  const requiredGateIds = completeCycleCampaign
    ? completeCycleRequiredGateIds
    : basicRequiredGateIds;
  if (canonicalJson(required.requiredGates) !== canonicalJson(requiredGateIds)) {
    fail("campaign acceptance gate inventory is unsupported or incomplete.");
  }
  const policyId = required.id;
  const policyMatchesCampaign = b1Campaign
    ? policyId === ALL_CASES_POLICY &&
      required.failureDisposition ===
        "reject-campaign-and-write-no-artifacts"
    : (policyId === COMPLETE_CANDIDATE_INVENTORY_POLICY ||
        policyId === COMPLETE_CYCLE_CANDIDATE_INVENTORY_POLICY) &&
      manifest.acceptancePolicy.candidateValidityDisposition === (
        completeCycleCampaign
          ? "retain-complete-rejected-cases-as-diagnostic-only"
          : "retain-complete-rejected-cases"
      ) &&
      manifest.acceptancePolicy.failureDisposition ===
        "reject-incomplete-generation-and-publish-no-database";
  const producerPolicyMatches = manifest.acceptancePolicy
    ? summary.acceptance && canonicalJson(summary.acceptance.policy) ===
      canonicalJson(manifest.acceptancePolicy)
    : b1Campaign && !summary.acceptance;
  if (!policyMatchesCampaign || !producerPolicyMatches) {
    fail("campaign producer acceptance policy differs from the manifest contract.");
  }
  return {
    manifestHash,
    summaryHash,
    expected,
    required,
    campaignKind: b1Campaign
      ? "b1-cap-angle"
      : completeCycleCampaign
        ? "all-candidate-complete-cycle"
        : "all-candidate",
    retainCompleteRejectedCases: allCandidateCampaign,
  };
}

function capAnglesFromPacket(packet) {
  const binaries = packet.source?.parameterVector?.braids?.flatMap(
    (braid) => braid.binaries ?? [],
  );
  if (!Array.isArray(binaries) || binaries.length !== 3) return null;
  const angles = binaries.map((binary) => Math.atan2(
    finite(binary.axialHalfSeparation, "axialHalfSeparation"),
    finite(binary.transverseOrbitRadius, "transverseOrbitRadius"),
  ));
  return angles;
}

function closeEnough(left, right) {
  const scale = Math.max(1, Math.abs(left), Math.abs(right));
  return Number.isFinite(left) && Number.isFinite(right) &&
    Math.abs(left - right) <= 64 * Number.EPSILON * scale;
}

function validateSummaryCase(summaryCase, acceptance, campaignKind) {
  const packet = acceptance.packet;
  if (packet.schema === COMPLETE_CYCLE_RESULT_SCHEMA) {
    if (summaryCase.sourceHash !== packet.source.sourceHash ||
        summaryCase.sourceRecordId !== packet.source.recordId ||
        summaryCase.resultHash !== packet.resultHash ||
        summaryCase.protocolHash !== packet.completeCycleProtocolHash ||
        canonicalJson(summaryCase.taxonomy) !== canonicalJson(packet.source.taxonomy) ||
        summaryCase.acceptanceState !==
          (packet.status.accepted ? "accepted" : "rejected") ||
        canonicalJson(summaryCase.gates) !== canonicalJson(packet.gates)) {
      fail(`${summaryCase.caseId} complete-cycle summary differs from its packet.`);
    }
    return;
  }
  if (summaryCase.sourceHash !== packet.source.sourceHash ||
      summaryCase.sourceRecordId !== packet.source.recordId ||
      summaryCase.resultHash !== packet.resultHash ||
      summaryCase.protocolHash !== packet.protocolHash) {
    fail(`${summaryCase.caseId} summary identity differs from its packet.`);
  }
  if (campaignKind === "b1-cap-angle") {
    const angles = capAnglesFromPacket(packet);
    const summaryAngles = summaryCase.coordinates?.capAngles;
    if (!angles || !Array.isArray(summaryAngles) ||
        summaryAngles.length !== angles.length ||
        angles.some((angle, index) => !closeEnough(angle, summaryAngles[index]))) {
      fail(`${summaryCase.caseId} summary coordinates differ from its packet.`);
    }
  } else if (canonicalJson(summaryCase.taxonomy) !==
      canonicalJson(packet.source.taxonomy)) {
    fail(`${summaryCase.caseId} summary taxonomy differs from its packet.`);
  }
  const rootCount = packet.rawLedgers.causalRoots.reduce(
    (sum, event) => sum + event.roots.length,
    0,
  );
  const noRootCount = packet.rawLedgers.causalRoots.reduce(
    (sum, event) => sum + event.noRootTransmitters.length,
    0,
  );
  if (summaryCase.rootCount !== rootCount || summaryCase.noRootCount !== noRootCount ||
      canonicalJson(summaryCase.gates) !==
        canonicalJson(packet.reducedMeasures.validity)) {
    fail(`${summaryCase.caseId} summary projections differ from its packet.`);
  }
}

const REQUIRED_STORABLE_GATE_IDS = Object.freeze([
  "identity-and-boundary",
  "source-speed",
  "root-completeness",
  "projection-consistency",
  "producer-status-consistency",
]);

function completeRejectedCaseIsStorable(acceptance) {
  const gates = new Map(acceptance.gates.map((gate) => [gate.gateId, gate]));
  return REQUIRED_STORABLE_GATE_IDS.every((gateId) => gates.get(gateId)?.passed === true);
}

function exactSourceRecordForCase(summaryCase, summaryPath, packet) {
  if (!summaryCase.exactSourceRecordPath) return null;
  const summaryDirectory = path.dirname(summaryPath);
  const relativePath = safeRelativePath(
    summaryCase.exactSourceRecordPath,
    "exact source record path",
  );
  const absolutePath = path.resolve(summaryDirectory, relativePath);
  if (!absolutePath.startsWith(`${summaryDirectory}${path.sep}`)) {
    fail(`${summaryCase.caseId} exact source path escapes its campaign directory.`);
  }
  const rawBytes = readFileSync(absolutePath);
  if (sha256Bytes(rawBytes) !== summaryCase.exactSourceArtifactSha256) {
    fail(`${summaryCase.caseId} exact source artifact hash is invalid.`);
  }
  const parsed = parseJsonBytes(rawBytes, `${summaryCase.caseId} exact source record`);
  const normalized = validateExactPrescribedSourceRecord(parsed);
  if (sha256Canonical(normalized) !== packet.source.sourceHash ||
      normalized.recordId !== packet.source.recordId) {
    fail(`${summaryCase.caseId} exact source preimage does not match its packet.`);
  }
  return { rawBytes, normalized };
}

function packetPathForCase(summaryCase, options) {
  const filename = path.basename(summaryCase.packetPath);
  if (!filename.endsWith(".result-packet.v1.json") &&
      !filename.endsWith(".complete-cycle-result.v1.json")) {
    fail(`${summaryCase.caseId} packet filename is invalid.`);
  }
  if (options.packetDirectory) {
    return path.join(path.resolve(options.packetDirectory), filename);
  }
  const repositoryRoot = path.resolve(options.repositoryRoot ?? REPOSITORY_ROOT);
  const relative = safeRelativePath(summaryCase.packetPath, "summary packet path");
  const absolute = path.resolve(repositoryRoot, relative);
  if (!absolute.startsWith(`${repositoryRoot}${path.sep}`)) {
    fail(`${summaryCase.caseId} packet path escapes the repository.`);
  }
  return absolute;
}

function campaignAcceptanceEvidence(preflight) {
  const acceptedCaseCount = preflight.cases.filter(
    (row) => row.acceptance.accepted,
  ).length;
  const rejectedCaseCount = preflight.cases.length - acceptedCaseCount;
  const evidenceWithoutHash = {
    schema: "prescribed-record-analytics/independent-campaign-acceptance.v1",
    instrumentVersion: INDEPENDENT_ACCEPTANCE_INSTRUMENT_VERSION,
    manifestHash: preflight.manifestHash,
    summaryHash: preflight.summaryHash,
    requiredCaseCount: preflight.required.requiredTotalCaseCount,
    observedCaseCount: preflight.cases.length,
    acceptedCaseCount,
    rejectedCaseCount,
    acceptancePolicyId: preflight.required.id,
    caseEvidence: preflight.cases.map((row) => ({
      caseOrdinal: row.caseOrdinal,
      caseId: row.summaryCase.caseId,
      resultHash: row.acceptance.resultHash,
      evidenceHash: row.acceptance.evidenceHash,
    })),
  };
  const inventoryComplete = evidenceWithoutHash.requiredCaseCount ===
    evidenceWithoutHash.observedCaseCount;
  const accepted = preflight.retainCompleteRejectedCases
    ? inventoryComplete && preflight.cases.every((row) =>
      row.acceptance.accepted || completeRejectedCaseIsStorable(row.acceptance))
    : inventoryComplete && evidenceWithoutHash.acceptedCaseCount ===
      evidenceWithoutHash.observedCaseCount;
  const complete = { ...evidenceWithoutHash, accepted };
  const evidenceHash = sha256Canonical(complete);
  return { ...complete, evidenceHash };
}

export function preflightAnalyticalCampaignImport(options) {
  const manifestPath = path.resolve(options.manifestPath);
  const summaryPath = path.resolve(options.summaryPath);
  const manifestBytes = readFileSync(manifestPath);
  const summaryBytes = readFileSync(summaryPath);
  const manifest = parseJsonBytes(manifestBytes, "campaign manifest");
  const summary = parseJsonBytes(summaryBytes, "campaign summary");
  const validated = validateManifestAndSummary(manifest, summary);
  const manifestDirectory = path.dirname(manifestPath);
  const rawArtifactDescriptors = manifest.rawArtifacts ?? [];
  const rawArtifacts = [];
  options.onProgress?.({
    stage: "import-preflight-raw-artifacts",
    completedWork: 0,
    totalWork: rawArtifactDescriptors.length,
  });
  for (let rawArtifactIndex = 0; rawArtifactIndex < rawArtifactDescriptors.length;
    rawArtifactIndex += 1) {
    const descriptor = rawArtifactDescriptors[rawArtifactIndex];
    const relativePath = safeRelativePath(descriptor.path, "raw artifact path");
    const absolutePath = path.resolve(manifestDirectory, relativePath);
    if (!absolutePath.startsWith(`${manifestDirectory}${path.sep}`)) {
      fail(`raw artifact ${relativePath} escapes its campaign directory.`);
    }
    const compressedBytes = readFileSync(absolutePath);
    if (compressedBytes.length !== descriptor.storedBytes ||
        sha256Bytes(compressedBytes) !== descriptor.compressedSha256) {
      fail(`raw artifact ${relativePath} compressed identity is invalid.`);
    }
    const rawBytes = gunzipSync(compressedBytes);
    if (rawBytes.length !== descriptor.rawBytes ||
        sha256Bytes(rawBytes) !== descriptor.rawSha256) {
      fail(`raw artifact ${relativePath} uncompressed identity is invalid.`);
    }
    rawArtifacts.push({ descriptor, absolutePath });
    if ((rawArtifactIndex + 1) % 64 === 0 ||
        rawArtifactIndex + 1 === rawArtifactDescriptors.length) {
      options.onProgress?.({
        stage: "import-preflight-raw-artifacts",
        completedWork: rawArtifactIndex + 1,
        totalWork: rawArtifactDescriptors.length,
      });
    }
  }
  const cases = [];
  options.onProgress?.({
    stage: "import-preflight-case",
    completedWork: 0,
    totalWork: summary.cases.length,
  });
  for (let caseOrdinal = 0; caseOrdinal < summary.cases.length; caseOrdinal += 1) {
    const summaryCase = summary.cases[caseOrdinal];
    const absolutePacketPath = packetPathForCase(summaryCase, options);
    const packetBytes = readFileSync(absolutePacketPath);
    const acceptance = verifyIndependentCaseAcceptance(packetBytes, {
      expectedProtocolHash: manifest.commonProtocol.protocolHash,
    });
    if (!acceptance.accepted && (!validated.retainCompleteRejectedCases ||
        !completeRejectedCaseIsStorable(acceptance))) {
      fail(
        `${summaryCase.caseId} failed independent acceptance: ` +
        acceptance.failureCodes.join(", "),
      );
    }
    validateSummaryCase(summaryCase, acceptance, validated.campaignKind);
    const exactSourceRecord = exactSourceRecordForCase(
      summaryCase,
      summaryPath,
      acceptance.packet,
    );
    cases.push({
      caseOrdinal,
      summaryCase,
      packetBytes,
      packetFilename: path.basename(absolutePacketPath),
      acceptance,
      exactSourceRecord,
      configurationHash: validated.campaignKind === "b1-cap-angle"
        ? sha256Canonical(acceptance.packet.source.parameterVector)
        : sha256Canonical({
          coordinateDefinition: "prescribed-braid-parameter-vector/v1",
          familyId: acceptance.packet.source.taxonomy?.familyId ?? null,
          memberId: acceptance.packet.source.taxonomy?.memberId ?? null,
          parameterVector: acceptance.packet.source.parameterVector,
        }),
    });
    options.onProgress?.({
      stage: "import-preflight-case",
      candidateId: summaryCase.caseId,
      completedWork: caseOrdinal + 1,
      totalWork: summary.cases.length,
    });
  }
  const preflight = {
    manifestPath,
    summaryPath,
    manifestBytes,
    summaryBytes,
    manifest,
    summary,
    cases,
    rawArtifacts,
    ...validated,
  };
  const campaignAcceptance = campaignAcceptanceEvidence(preflight);
  if (!campaignAcceptance.accepted) {
    fail("campaign failed independent publication acceptance.");
  }
  if (summary.acceptance && summary.acceptance.accepted !== true) {
    fail("producer summary reports campaign rejection; import does not advance.");
  }
  return { ...preflight, campaignAcceptance };
}

function encodeArtifact(rawBytes, codec) {
  if (codec === "identity") return Buffer.from(rawBytes);
  if (codec === "gzip") return gzipSync(rawBytes, { level: 6 });
  fail(`unsupported artifact codec ${codec}.`);
}

function decodeArtifact(row) {
  const payload = Buffer.from(row.payload);
  if (row.codec === "identity") return payload;
  if (row.codec === "gzip") return gunzipSync(payload);
  fail(`unsupported stored artifact codec ${row.codec}.`);
}

function insertArtifact(database, {
  rawBytes,
  artifactKind,
  mediaType,
  codec,
  createdBy,
}) {
  const artifactHashHex = sha256Bytes(rawBytes);
  const artifactHash = hashBuffer(artifactHashHex);
  const payload = encodeArtifact(rawBytes, codec);
  insertOrVerify(database, {
    insertSql: `
      INSERT INTO artifact(
        artifact_hash, artifact_kind, media_type, codec,
        raw_bytes, stored_bytes, payload, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(artifact_hash) DO NOTHING
    `,
    insertParameters: [
      artifactHash,
      artifactKind,
      mediaType,
      codec,
      rawBytes.length,
      payload.length,
      payload,
      createdBy,
    ],
    selectSql: `
      SELECT artifact_kind, media_type, codec, raw_bytes, stored_bytes, payload,
             created_by
      FROM artifact WHERE artifact_hash = ?
    `,
    selectParameters: [artifactHash],
    expected: {
      artifact_kind: artifactKind,
      media_type: mediaType,
      codec,
      raw_bytes: rawBytes.length,
      stored_bytes: payload.length,
      payload,
      created_by: createdBy,
    },
    label: `artifact ${artifactHashHex}`,
  });
  return { artifactHash, artifactHashHex, payload };
}

function insertVerifiedEncodedArtifact(database, {
  artifactHashHex,
  rawBytesLength,
  payload,
  artifactKind,
  mediaType,
  codec,
  createdBy,
}) {
  if (codec !== "gzip") {
    fail("verified encoded artifact insertion currently requires gzip.");
  }
  const artifactHash = hashBuffer(artifactHashHex);
  insertOrVerify(database, {
    insertSql: `
      INSERT INTO artifact(
        artifact_hash, artifact_kind, media_type, codec,
        raw_bytes, stored_bytes, payload, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(artifact_hash) DO NOTHING
    `,
    insertParameters: [
      artifactHash,
      artifactKind,
      mediaType,
      codec,
      rawBytesLength,
      payload.length,
      payload,
      createdBy,
    ],
    selectSql: `
      SELECT artifact_kind, media_type, codec, raw_bytes, stored_bytes, payload,
             created_by
      FROM artifact WHERE artifact_hash = ?
    `,
    selectParameters: [artifactHash],
    expected: {
      artifact_kind: artifactKind,
      media_type: mediaType,
      codec,
      raw_bytes: rawBytesLength,
      stored_bytes: payload.length,
      payload,
      created_by: createdBy,
    },
    label: `artifact ${artifactHashHex}`,
  });
  return { artifactHash, artifactHashHex, payload };
}

function insertProtocol(database, packet) {
  const protocol = packet.protocol ?? packet.completeCycleProtocol;
  const eventSettings = protocol.eventEvaluator ?? protocol;
  const protocolHashHex = packet.protocolHash ?? packet.completeCycleProtocolHash;
  const protocolHash = hashBuffer(protocolHashHex, "protocol hash");
  const bytes = canonicalBytes(protocol);
  insertOrVerify(database, {
    insertSql: `
      INSERT INTO analysis_protocol(
        protocol_hash, protocol_id, schema_id, canonical_json,
        field_speed, coupling, root_policy_id, primary_root_tolerance,
        refined_root_tolerance, root_transversality_floor,
        minimum_separation_floor, convergence_absolute
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(protocol_hash) DO NOTHING
    `,
    insertParameters: [
      protocolHash,
      protocol.protocolId,
      protocol.schema,
      bytes,
      eventSettings.fieldSpeed,
      eventSettings.coupling,
      eventSettings.rootPolicy.id,
      eventSettings.rootPolicy.tolerance,
      eventSettings.convergence.rootTolerance,
      eventSettings.tolerances.rootTransversalityFloor,
      eventSettings.tolerances.minimumSeparationFloor,
      eventSettings.tolerances.convergenceAbsolute,
    ],
    selectSql: `
      SELECT protocol_id, schema_id, canonical_json, field_speed, coupling,
             root_policy_id, primary_root_tolerance, refined_root_tolerance,
             root_transversality_floor, minimum_separation_floor,
             convergence_absolute
      FROM analysis_protocol WHERE protocol_hash = ?
    `,
    selectParameters: [protocolHash],
    expected: {
      protocol_id: protocol.protocolId,
      schema_id: protocol.schema,
      canonical_json: bytes,
      field_speed: eventSettings.fieldSpeed,
      coupling: eventSettings.coupling,
      root_policy_id: eventSettings.rootPolicy.id,
      primary_root_tolerance: eventSettings.rootPolicy.tolerance,
      refined_root_tolerance: eventSettings.convergence.rootTolerance,
      root_transversality_floor: eventSettings.tolerances.rootTransversalityFloor,
      minimum_separation_floor: eventSettings.tolerances.minimumSeparationFloor,
      convergence_absolute: eventSettings.tolerances.convergenceAbsolute,
    },
    label: `protocol ${protocolHashHex}`,
  });
}

function insertCampaignEnvelope(database, preflight, options = {}) {
  const rawArtifactImportMode =
    options.experimentalRawArtifactImportMode ?? "recompress";
  if (!["recompress", "verified-compressed"].includes(rawArtifactImportMode)) {
    fail(
      "experimentalRawArtifactImportMode must be recompress or verified-compressed.",
    );
  }
  const rawArtifactTransactionBatchSize =
    options.experimentalRawArtifactTransactionBatchSize == null
      ? null
      : positiveInteger(
          options.experimentalRawArtifactTransactionBatchSize,
          "experimentalRawArtifactTransactionBatchSize",
        );
  const packet = preflight.cases[0].acceptance.packet;
  insertProtocol(database, packet);
  const manifestArtifact = insertArtifact(database, {
    rawBytes: preflight.manifestBytes,
    artifactKind: "campaign-manifest",
    mediaType: "application/json",
    codec: "identity",
    createdBy: ANALYTICAL_CAMPAIGN_IMPORTER_VERSION,
  });
  const summaryArtifact = insertArtifact(database, {
    rawBytes: preflight.summaryBytes,
    artifactKind: "campaign-summary",
    mediaType: "application/json",
    codec: "gzip",
    createdBy: ANALYTICAL_CAMPAIGN_IMPORTER_VERSION,
  });
  const manifest = preflight.manifest;
  const required = preflight.required;
  const manifestHash = hashBuffer(preflight.manifestHash);
  const protocolHash = hashBuffer(manifest.commonProtocol.protocolHash);
  const seedToken = manifest.seed?.value == null
    ? null
    : canonicalJson(manifest.seed.value);
  insertOrVerify(database, {
    insertSql: `
      INSERT INTO campaign_manifest(
        manifest_hash, campaign_id, schema_id, campaign_stage,
        manifest_filename, packet_directory, summary_filename,
        seed_algorithm, seed_token, required_total_case_count,
        required_anchor_count, required_seeded_sample_count,
        common_protocol_hash, acceptance_policy_json, artifact_hash
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(manifest_hash) DO NOTHING
    `,
    insertParameters: [
      manifestHash,
      manifest.campaignId,
      manifest.schema,
      manifest.campaignStage ?? null,
      path.basename(preflight.manifestPath),
      safeRelativePath(manifest.outputs.packetDirectory, "packet directory"),
      path.basename(manifest.outputs.summaryFilename),
      manifest.seed?.algorithm ?? null,
      seedToken,
      required.requiredTotalCaseCount,
      required.requiredAnchorCount,
      required.requiredSeededSampleCount,
      protocolHash,
      manifest.acceptancePolicy
        ? canonicalBytes(manifest.acceptancePolicy)
        : null,
      manifestArtifact.artifactHash,
    ],
    selectSql: `
      SELECT campaign_id, schema_id, campaign_stage, manifest_filename,
             packet_directory, summary_filename, seed_algorithm, seed_token,
             required_total_case_count, required_anchor_count,
             required_seeded_sample_count, common_protocol_hash,
             acceptance_policy_json, artifact_hash
      FROM campaign_manifest WHERE manifest_hash = ?
    `,
    selectParameters: [manifestHash],
    expected: {
      campaign_id: manifest.campaignId,
      schema_id: manifest.schema,
      campaign_stage: manifest.campaignStage ?? null,
      manifest_filename: path.basename(preflight.manifestPath),
      packet_directory: path.normalize(manifest.outputs.packetDirectory),
      summary_filename: path.basename(manifest.outputs.summaryFilename),
      seed_algorithm: manifest.seed?.algorithm ?? null,
      seed_token: seedToken,
      required_total_case_count: required.requiredTotalCaseCount,
      required_anchor_count: required.requiredAnchorCount,
      required_seeded_sample_count: required.requiredSeededSampleCount,
      common_protocol_hash: protocolHash,
      acceptance_policy_json: manifest.acceptancePolicy
        ? canonicalBytes(manifest.acceptancePolicy)
        : null,
      artifact_hash: manifestArtifact.artifactHash,
    },
    label: `manifest ${preflight.manifestHash}`,
  });
  const summaryHash = hashBuffer(preflight.summaryHash);
  insertOrVerify(database, {
    insertSql: `
      INSERT INTO campaign_summary(
        summary_hash, manifest_hash, schema_id, producer_status_json,
        producer_acceptance_json, artifact_hash
      ) VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(summary_hash) DO NOTHING
    `,
    insertParameters: [
      summaryHash,
      manifestHash,
      preflight.summary.schema,
      canonicalBytes(preflight.summary.status),
      preflight.summary.acceptance
        ? canonicalBytes(preflight.summary.acceptance)
        : null,
      summaryArtifact.artifactHash,
    ],
    selectSql: `
      SELECT manifest_hash, schema_id, producer_status_json,
             producer_acceptance_json, artifact_hash
      FROM campaign_summary WHERE summary_hash = ?
    `,
    selectParameters: [summaryHash],
    expected: {
      manifest_hash: manifestHash,
      schema_id: preflight.summary.schema,
      producer_status_json: canonicalBytes(preflight.summary.status),
      producer_acceptance_json: preflight.summary.acceptance
        ? canonicalBytes(preflight.summary.acceptance)
        : null,
      artifact_hash: summaryArtifact.artifactHash,
    },
    label: `summary ${preflight.summaryHash}`,
  });
  if (preflight.manifest.methodologyCoverage) {
    const declaration = preflight.manifest.methodologyCoverage;
    const coveragePath = path.resolve(REPOSITORY_ROOT, declaration.path);
    const coverage = parseJsonBytes(readFileSync(coveragePath), "methodology coverage");
    if (sha256Canonical(coverage) !== declaration.coverageHash ||
        coverage.methodology?.sha256 !== declaration.methodologySha256) {
      fail("methodology coverage artifact differs from the campaign binding.");
    }
    database.prepare(`
      INSERT INTO methodology_coverage(
        coverage_hash, coverage_id, methodology_path, methodology_sha256,
        impact_review, reduction_versions_json, canonical_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(coverage_hash) DO NOTHING
    `).run(
      hashBuffer(declaration.coverageHash),
      coverage.coverageId,
      coverage.methodology.path,
      hashBuffer(coverage.methodology.sha256),
      coverage.methodology.impactReview,
      canonicalBytes(coverage.reductionVersions),
      canonicalBytes(coverage),
    );
  }
  options.onProgress?.({
    stage: "import-raw-artifacts",
    completedWork: 0,
    totalWork: preflight.rawArtifacts.length,
  });
  for (let rawArtifactIndex = 0;
    rawArtifactIndex < preflight.rawArtifacts.length;
    rawArtifactIndex += 1) {
    const rawArtifact = preflight.rawArtifacts[rawArtifactIndex];
    const compressedBytes = readFileSync(rawArtifact.absolutePath);
    if (compressedBytes.length !== rawArtifact.descriptor.storedBytes ||
        sha256Bytes(compressedBytes) !== rawArtifact.descriptor.compressedSha256) {
      fail(`raw artifact ${rawArtifact.descriptor.path} changed after preflight.`);
    }
    const stored = rawArtifactImportMode === "verified-compressed"
      ? insertVerifiedEncodedArtifact(database, {
          artifactHashHex: rawArtifact.descriptor.rawSha256,
          rawBytesLength: rawArtifact.descriptor.rawBytes,
          payload: compressedBytes,
          artifactKind: rawArtifact.descriptor.artifactKind,
          mediaType: rawArtifact.descriptor.mediaType,
          codec: "gzip",
          createdBy: ANALYTICAL_CAMPAIGN_IMPORTER_VERSION,
        })
      : insertArtifact(database, {
          rawBytes: gunzipSync(compressedBytes),
          artifactKind: rawArtifact.descriptor.artifactKind,
          mediaType: rawArtifact.descriptor.mediaType,
          codec: "gzip",
          createdBy: ANALYTICAL_CAMPAIGN_IMPORTER_VERSION,
        });
    if (!stored.payload.equals(compressedBytes)) {
      fail(`raw artifact ${rawArtifact.descriptor.path} gzip bytes are not deterministic.`);
    }
    database.prepare(`
      INSERT INTO analytical_raw_artifact(
        compressed_hash, raw_hash, artifact_hash, manifest_hash, candidate_id,
        artifact_kind, relative_path, enclosing_radius, resolution, time_sample,
        sensitivity_coordinate, stencil, raw_bytes, stored_bytes, context_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(compressed_hash) DO NOTHING
    `).run(
      hashBuffer(rawArtifact.descriptor.compressedSha256),
      hashBuffer(rawArtifact.descriptor.rawSha256),
      stored.artifactHash,
      manifestHash,
      rawArtifact.descriptor.candidateId,
      rawArtifact.descriptor.artifactKind,
      rawArtifact.descriptor.path,
      rawArtifact.descriptor.context.radius ?? null,
      rawArtifact.descriptor.context.resolution ??
        rawArtifact.descriptor.context.refinement ?? null,
      rawArtifact.descriptor.context.timeIndex ?? null,
      rawArtifact.descriptor.context.coordinate ?? null,
      rawArtifact.descriptor.context.delta == null
        ? null
        : `delta:${rawArtifact.descriptor.context.delta}`,
      rawArtifact.descriptor.rawBytes,
      rawArtifact.descriptor.storedBytes,
      canonicalBytes(rawArtifact.descriptor.context),
    );
    if ((rawArtifactIndex + 1) % 64 === 0 ||
        rawArtifactIndex + 1 === preflight.rawArtifacts.length) {
      options.onProgress?.({
        stage: "import-raw-artifacts",
        candidateId: rawArtifact.descriptor.candidateId,
        completedWork: rawArtifactIndex + 1,
        totalWork: preflight.rawArtifacts.length,
      });
    }
    if (rawArtifactTransactionBatchSize != null &&
        (rawArtifactIndex + 1) % rawArtifactTransactionBatchSize === 0) {
      database.exec("COMMIT");
      database.exec("BEGIN IMMEDIATE");
      options.onRawArtifactBatchCommitted?.({
        completedWork: rawArtifactIndex + 1,
        totalWork: preflight.rawArtifacts.length,
        transactionBatchSize: rawArtifactTransactionBatchSize,
      });
    }
  }
}

function insertSource(database, packet, exactSourceRecord = null) {
  const source = packet.source;
  const sourceHash = hashBuffer(source.sourceHash, "source hash");
  const bytes = canonicalBytes(source);
  const exactArtifact = exactSourceRecord
    ? insertArtifact(database, {
      rawBytes: exactSourceRecord.rawBytes,
      artifactKind: "exact-source-record",
      mediaType: "application/json",
      codec: "gzip",
      createdBy: ANALYTICAL_CAMPAIGN_IMPORTER_VERSION,
    })
    : null;
  const baseExpected = {
    record_id: source.recordId,
    source_schema: source.sourceSchema ?? null,
    exact_source_record_schema: source.exactSourceRecordSchema ?? null,
    engine_id: source.engineId,
    engine_version: source.engineVersion ?? null,
    family_id: source.taxonomy?.familyId ?? null,
    member_id: source.taxonomy?.memberId ?? null,
    source_envelope_json: bytes,
  };
  database.prepare(`
    INSERT INTO source_record(
      source_hash, record_id, source_schema, exact_source_record_schema,
      engine_id, engine_version, family_id, member_id,
      source_envelope_json, exact_source_artifact_hash,
      source_hash_verification_state
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(source_hash) DO NOTHING
  `).run(
    sourceHash,
    source.recordId,
    source.sourceSchema ?? null,
    source.exactSourceRecordSchema ?? null,
    source.engineId,
    source.engineVersion ?? null,
    source.taxonomy?.familyId ?? null,
    source.taxonomy?.memberId ?? null,
    bytes,
    exactArtifact?.artifactHash ?? null,
    exactArtifact ? "exact-preimage-verified" : "packet-bound",
  );
  let actual = database.prepare(`
    SELECT record_id, source_schema, exact_source_record_schema, engine_id,
           engine_version, family_id, member_id, source_envelope_json,
           exact_source_artifact_hash, source_hash_verification_state
    FROM source_record WHERE source_hash = ?
  `).get(sourceHash);
  assertStoredRow(actual, baseExpected, `source ${source.sourceHash}`);
  if (exactArtifact && actual.exact_source_artifact_hash === null) {
    database.prepare(`
      UPDATE source_record
      SET exact_source_artifact_hash = ?,
          source_hash_verification_state = 'exact-preimage-verified'
      WHERE source_hash = ? AND exact_source_artifact_hash IS NULL
    `).run(exactArtifact.artifactHash, sourceHash);
    actual = database.prepare(`
      SELECT exact_source_artifact_hash, source_hash_verification_state
      FROM source_record WHERE source_hash = ?
    `).get(sourceHash);
  }
  if (exactArtifact) {
    assertStoredRow(actual, {
      exact_source_artifact_hash: exactArtifact.artifactHash,
      source_hash_verification_state: "exact-preimage-verified",
    }, `exact source ${source.sourceHash}`);
  } else if (actual.source_hash_verification_state !== "packet-bound" &&
      actual.source_hash_verification_state !== "exact-preimage-verified") {
    fail(`source ${source.sourceHash} has an invalid verification state.`);
  }
}

function insertConfiguration(database, row) {
  const packet = row.acceptance.packet;
  const coordinates = row.summaryCase.coordinates?.capAngles ?? [];
  const configurationHash = hashBuffer(row.configurationHash);
  const vectorBytes = canonicalBytes(packet.source.parameterVector);
  const coordinateDefinition = row.summaryCase.coordinates?.capAngles
    ? "b1-cap-angles-radians/v1"
    : packet.source.parameterVector?.coordinateDefinition ??
      "prescribed-braid-parameter-vector/v1";
  insertOrVerify(database, {
    insertSql: `
      INSERT INTO configuration(
        configuration_hash, family_id, member_id, parameter_vector_json,
        coordinate_definition, alpha_1, alpha_2, alpha_3
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(configuration_hash) DO NOTHING
    `,
    insertParameters: [
      configurationHash,
      packet.source.taxonomy?.familyId ?? null,
      packet.source.taxonomy?.memberId ?? null,
      vectorBytes,
      coordinateDefinition,
      coordinates[0] ?? null,
      coordinates[1] ?? null,
      coordinates[2] ?? null,
    ],
    selectSql: `
      SELECT family_id, member_id, parameter_vector_json,
             coordinate_definition, alpha_1, alpha_2, alpha_3
      FROM configuration WHERE configuration_hash = ?
    `,
    selectParameters: [configurationHash],
    expected: {
      family_id: packet.source.taxonomy?.familyId ?? null,
      member_id: packet.source.taxonomy?.memberId ?? null,
      parameter_vector_json: vectorBytes,
      coordinate_definition: coordinateDefinition,
      alpha_1: coordinates[0] ?? null,
      alpha_2: coordinates[1] ?? null,
      alpha_3: coordinates[2] ?? null,
    },
    label: `configuration ${row.configurationHash}`,
  });
}

function caseMeasures(packet, summaryCase = null) {
  if (packet.schema === COMPLETE_CYCLE_RESULT_SCHEMA) {
    return (summaryCase?.measures ?? []).map((row) => [
      [
        row.measureId,
        row.enclosingRadius ?? row.radius ?? "none",
        row.probePolarity ?? "none",
      ].join("/"),
      row.scalarValue,
      row.unit,
      1,
      row.reductionVersion,
    ]);
  }
  if (packet.reducedMeasures.events.length !== 1) {
    fail("the V1 campaign importer requires one declared event per case.");
  }
  const event = packet.reducedMeasures.events[0];
  const responseMagnitude = (polarity) => {
    const response = event.probeResponses.find(
      (entry) => entry.probePolarity === polarity,
    );
    if (!response) fail(`event ${event.eventId} lacks polarity ${polarity}.`);
    return Math.hypot(
      response.acceleration.x,
      response.acceleration.y,
      response.acceleration.z,
    );
  };
  return [
    ["signedWake", event.signedWake, "wake-density", event.rootCount],
    ["unsignedWake", event.unsignedWake, "wake-density", event.rootCount],
    ["signedCancellationRatio", event.signedCancellationRatio, "dimensionless", event.rootCount],
    ["positiveProbeAccelerationMagnitude", responseMagnitude(1), "acceleration", event.rootCount],
    ["negativeProbeAccelerationMagnitude", responseMagnitude(-1), "acceleration", event.rootCount],
    ["minimumSeparation", packet.reducedMeasures.minimumSeparation.value, "length", packet.rawLedgers.minimumSeparation.length],
    ["rootTransversalityMargin", packet.reducedMeasures.rootTransversalityMargin, "speed", event.rootCount],
    ["numericalConvergenceMaximumChange", packet.reducedMeasures.numericalConvergence.maximumReportedChange, "mixed-reported-components", packet.rawLedgers.numericalConvergence.length],
  ];
}

function completeCycleMultidimensionalRows(packet, summaryCase) {
  if (packet.schema !== COMPLETE_CYCLE_RESULT_SCHEMA) return [];
  const acceptedDisposition = packet.status.accepted ? "accepted" : "diagnostic-only";
  const rows = (summaryCase.measures ?? []).map((row) => ({
    measureId: row.measureId,
    reductionVersion: row.reductionVersion,
    disposition: acceptedDisposition,
    scalarValue: row.scalarValue,
    unit: row.unit,
    probePolarity: row.probePolarity,
    enclosingRadius: row.radius,
    normalization: row.normalization,
    numericalUncertainty: row.numericalUncertainty,
    details: row,
  }));
  for (const resolution of ["primary", "refined"]) {
    const disposition = resolution === "primary" ? acceptedDisposition : "diagnostic-only";
    for (const surface of packet.diagnosticReductions.surface.surface[resolution]) {
      for (const row of surface.angularPowerRows) {
        rows.push({
          measureId: `angular-power/${row.channel}`,
          reductionVersion: packet.reducer.id,
          disposition,
          scalarValue: row.power,
          unit: "squared-angular-coefficient",
          probeId: row.channel,
          enclosingRadius: surface.radius,
          resolution,
          angularDegree: row.degree,
          details: row,
        });
      }
      for (const row of surface.anisotropyRows) {
        rows.push({
          measureId: `anisotropy/${row.channel}`,
          reductionVersion: packet.reducer.id,
          disposition,
          scalarValue: row.nonMonopolePowerFraction,
          unit: "ratio",
          probeId: row.channel,
          enclosingRadius: surface.radius,
          resolution,
          details: row,
        });
      }
      for (const row of surface.spectralCoefficientRows) {
        rows.push({
          measureId: `spectral-coefficient/${row.channel}`,
          reductionVersion: packet.reducer.id,
          disposition,
          scalarValue: row.magnitude,
          unit: "modal-coefficient",
          probeId: row.channel,
          enclosingRadius: surface.radius,
          resolution,
          temporalHarmonic: row.harmonic,
          angularDegree: row.degree,
          angularOrder: row.order,
          realPart: row.real,
          imaginaryPart: row.imaginary,
          magnitude: row.magnitude,
          normalization: packet.completeCycleProtocol.spectralReduction.normalization,
          details: row,
        });
      }
      for (const row of surface.transmitterTaggedWakeFluxSpectralRows) {
        rows.push({
          measureId: "normal-wake-flux/transmitter-root-complex-coefficient",
          reductionVersion: packet.reducer.id,
          disposition,
          scalarValue: row.magnitude,
          unit: "source-normalized-wake-crossing-coefficient",
          enclosingRadius: surface.radius,
          resolution,
          temporalHarmonic: row.harmonic,
          angularDegree: row.degree,
          angularOrder: row.order,
          transmitterId: row.transmitterId,
          rootOrdinal: row.rootOrdinal,
          realPart: row.real,
          imaginaryPart: row.imaginary,
          magnitude: row.magnitude,
          normalization: "complete-cycle-complex-dft.v1",
          coefficientFloor:
            surface.transmitterTaggedWakeFluxBandCoverage.effectiveCoefficientFloor,
          details: row,
        });
      }
      for (const row of surface.wakeFluxSpectralCancellationRows) {
        rows.push({
          measureId: "normal-wake-flux/frequency-angular-cancellation",
          reductionVersion: packet.reducer.id,
          disposition: row.status === "admissible" ? disposition : "below-floor",
          scalarValue: row.etaWakeFlux,
          unit: "ratio",
          enclosingRadius: surface.radius,
          resolution,
          temporalHarmonic: row.harmonic,
          angularDegree: row.degree,
          angularOrder: row.order,
          realPart: row.netReal,
          imaginaryPart: row.netImaginary,
          magnitude: row.netMagnitude,
          normalization: "net-magnitude-over-raw-magnitude.v1",
          coefficientFloor:
            surface.transmitterTaggedWakeFluxBandCoverage.effectiveCoefficientFloor,
          details: row,
        });
      }
    }
    for (const radial of packet.diagnosticReductions.surface.radialScaling[resolution]) {
      if (radial.status !== "ok") continue;
      rows.push({
        measureId: `radial-scaling/${radial.measureId}`,
        reductionVersion: packet.reducer.id,
        disposition,
        scalarValue: radial.global.exponent,
        unit: "radial-exponent",
        resolution,
        numericalUncertainty: radial.global.logSpaceRmsResidual,
        normalization: "negative-log-slope-over-enclosing-radius.v1",
        details: radial,
      });
    }
  }
  for (const resolution of ["primary", "refined"]) {
    for (const surface of packet.diagnosticReductions.surface.surface[resolution]) {
      const references = [
        ["raw-emission-reference-residual", surface.wakeFlux.rawEmissionReference?.relativeResidual],
        ["signed-emission-reference-residual",
          surface.wakeFlux.signedEmissionReference?.relativeOrAbsoluteResidual],
        ["frequency-resolved-out-of-band-rms-fraction",
          surface.transmitterTaggedWakeFluxBandCoverage.outOfBandRmsFraction],
      ];
      for (const [suffix, value] of references) {
        rows.push({
          measureId: `normal-wake-flux/${suffix}`,
          reductionVersion: packet.reducer.id,
          disposition: resolution === "primary" ? acceptedDisposition : "diagnostic-only",
          scalarValue: value,
          unit: "ratio",
          enclosingRadius: surface.radius,
          resolution,
          details: {
            rawEmissionReference: surface.wakeFlux.rawEmissionReference,
            signedEmissionReference: surface.wakeFlux.signedEmissionReference,
            bandCoverage: surface.transmitterTaggedWakeFluxBandCoverage,
          },
        });
      }
    }
  }
  const sensitivity = packet.diagnosticReductions.transmitterSensitivity;
  if (sensitivity?.coordinateId) {
    for (const [measureId, scalarValue] of Object.entries(
      sensitivity.refinedDerivative ?? {},
    )) {
      rows.push({
        measureId: `transmitter-sensitivity/${measureId}`,
        reductionVersion: packet.reducer.id,
        disposition: sensitivity.accepted ? acceptedDisposition : "diagnostic-only",
        scalarValue,
        unit: "measure-per-radian",
        sensitivityCoordinate: sensitivity.coordinateId,
        stencil: sensitivity.stencil?.refined?.kind,
        numericalUncertainty: sensitivity.derivativeUncertainty?.[measureId] ?? null,
        details: sensitivity,
      });
    }
  }
  const commonAxis = packet.diagnosticReductions.commonAxisBraid;
  if (commonAxis?.schema ===
      "prescribed-path-analysis/common-axis-braid-reduction.v2") {
    for (const resolution of ["primary", "refined"]) {
      const disposition = resolution === "primary"
        ? acceptedDisposition
        : "diagnostic-only";
      for (const [projection, summary] of Object.entries(
        commonAxis.residuals[resolution],
      )) {
        for (const receiver of summary.receivers) {
          for (const [measure, scalarValue] of [
            ["rms", receiver.rms],
            ["maximum-absolute", receiver.maximumAbsolute],
            ["signed-cycle-average", receiver.signedCycleAverage],
          ]) {
            rows.push({
              measureId: `common-axis-braid/residual/${projection}/${measure}`,
              reductionVersion: commonAxis.reducerVersion,
              disposition,
              scalarValue,
              unit: "acceleration",
              resolution,
              transmitterId: receiver.transmitterId,
              details: receiver,
            });
          }
        }
      }
    }
    rows.push({
      measureId: "common-axis-braid/residual-convergence/maximum-change",
      reductionVersion: commonAxis.reducerVersion,
      disposition: commonAxis.residuals.convergence.passed
        ? acceptedDisposition
        : "diagnostic-only",
      scalarValue: commonAxis.residuals.convergence.maximumChange,
      unit: "relative-or-absolute",
      numericalUncertainty: commonAxis.residuals.convergence.maximumChange,
      normalization: commonAxis.residuals.convergence.comparison,
      details: commonAxis.residuals.convergence,
    });
    for (const resolution of ["primary", "refined"]) {
      rows.push({
        measureId: "common-axis-braid/root-transversality-margin",
        reductionVersion: commonAxis.reducerVersion,
        disposition: resolution === "primary" ? acceptedDisposition : "diagnostic-only",
        scalarValue: commonAxis.minimumRootTransversalityMargin[resolution],
        unit: "speed",
        resolution,
        details: commonAxis.minimumRootTransversalityMargin,
      });
      rows.push({
        measureId: "common-axis-braid/axial-angular-momentum/rms-about-mean",
        reductionVersion: commonAxis.reducerVersion,
        disposition: "diagnostic-only",
        scalarValue:
          commonAxis.axialAngularMomentumDiagnostic[resolution].cycle.rmsAboutMean,
        unit: "angular-momentum-per-unit-mu_arch",
        resolution,
        details: commonAxis.axialAngularMomentumDiagnostic[resolution],
      });
    }
  }
  return rows;
}

function insertMultidimensionalMeasures(database, packet, summaryCase) {
  const resultHash = hashBuffer(packet.resultHash);
  for (const row of completeCycleMultidimensionalRows(packet, summaryCase)) {
    const identity = {
      resultHash: packet.resultHash,
      ...row,
    };
    const details = canonicalBytes(row.details ?? {});
    database.prepare(`
      INSERT INTO multidimensional_measure(
        row_hash, result_hash, measure_id, reduction_version, disposition,
        scalar_value, unit, probe_id, probe_polarity, enclosing_radius,
        resolution, time_sample, temporal_harmonic, angular_degree,
        angular_order, transmitter_id, root_ordinal, sensitivity_coordinate,
        stencil, real_part, imaginary_part, magnitude, normalization,
        coefficient_floor, numerical_uncertainty, details_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(row_hash) DO NOTHING
    `).run(
      hashBuffer(sha256Canonical(identity)),
      resultHash,
      row.measureId,
      row.reductionVersion,
      row.disposition,
      row.scalarValue ?? null,
      row.unit,
      row.probeId ?? null,
      row.probePolarity ?? null,
      row.enclosingRadius ?? null,
      row.resolution ?? null,
      row.timeSample ?? null,
      row.temporalHarmonic ?? null,
      row.angularDegree ?? null,
      row.angularOrder ?? null,
      row.transmitterId ?? null,
      row.rootOrdinal ?? null,
      row.sensitivityCoordinate ?? null,
      row.stencil ?? null,
      row.realPart ?? null,
      row.imaginaryPart ?? null,
      row.magnitude ?? null,
      row.normalization ?? null,
      row.coefficientFloor ?? null,
      row.numericalUncertainty ?? null,
      details,
    );
  }
}

function insertCase(database, preflight, row) {
  const packet = row.acceptance.packet;
  insertProtocol(database, packet);
  insertSource(database, packet, row.exactSourceRecord);
  insertConfiguration(database, row);
  const artifact = insertArtifact(database, {
    rawBytes: row.packetBytes,
    artifactKind: "result-packet",
    mediaType: "application/json",
    codec: "gzip",
    createdBy: ANALYTICAL_CAMPAIGN_IMPORTER_VERSION,
  });
  const resultHash = hashBuffer(packet.resultHash);
  const sourceHash = hashBuffer(packet.source.sourceHash);
  const protocolHash = hashBuffer(
    packet.protocolHash ?? packet.completeCycleProtocolHash,
  );
  const evaluatorId = packet.evaluator?.id ?? packet.reducer?.id;
  const evaluatorVersion = packet.evaluator?.version ??
    packet.reducer?.surfaceReducer?.version ?? "v1";
  const producerStatusBytes = canonicalBytes(packet.status);
  insertOrVerify(database, {
    insertSql: `
      INSERT INTO case_result(
        result_hash, source_hash, protocol_hash, evaluator_id,
        evaluator_version, packet_schema, refinement_id, artifact_hash,
        completeness_state, producer_status_code, producer_status_json
      ) VALUES (?, ?, ?, ?, ?, ?, 'primary', ?, 'complete', ?, ?)
      ON CONFLICT(result_hash) DO NOTHING
    `,
    insertParameters: [
      resultHash,
      sourceHash,
      protocolHash,
      evaluatorId,
      evaluatorVersion,
      packet.schema,
      artifact.artifactHash,
      packet.status?.code ?? null,
      producerStatusBytes,
    ],
    selectSql: `
      SELECT source_hash, protocol_hash, evaluator_id, evaluator_version,
             packet_schema, refinement_id, artifact_hash, completeness_state,
             producer_status_code, producer_status_json
      FROM case_result WHERE result_hash = ?
    `,
    selectParameters: [resultHash],
    expected: {
      source_hash: sourceHash,
      protocol_hash: protocolHash,
      evaluator_id: evaluatorId,
      evaluator_version: evaluatorVersion,
      packet_schema: packet.schema,
      refinement_id: "primary",
      artifact_hash: artifact.artifactHash,
      completeness_state: "complete",
      producer_status_code: packet.status?.code ?? null,
      producer_status_json: producerStatusBytes,
    },
    label: `result ${packet.resultHash}`,
  });
  const observationEvents = packet.reducedMeasures?.events ?? [];
  for (let eventOrdinal = 0; eventOrdinal < observationEvents.length;
    eventOrdinal += 1) {
    const event = observationEvents[eventOrdinal];
    insertOrVerify(database, {
      insertSql: `
        INSERT INTO observation_event(
          result_hash, event_ordinal, event_id, probe_id, observation_time,
          root_count, no_root_count, signed_wake, unsigned_wake,
          signed_cancellation_ratio, root_transversality_margin,
          maximum_root_residual
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(result_hash, event_ordinal) DO NOTHING
      `,
      insertParameters: [
        resultHash,
        eventOrdinal,
        event.eventId,
        event.probeId,
        event.observationTime,
        event.rootCount,
        event.noRootCount,
        event.signedWake,
        event.unsignedWake,
        event.signedCancellationRatio,
        event.rootTransversalityMargin,
        event.maximumRootResidual,
      ],
      selectSql: `
        SELECT event_id, probe_id, observation_time, root_count, no_root_count,
               signed_wake, unsigned_wake, signed_cancellation_ratio,
               root_transversality_margin, maximum_root_residual
        FROM observation_event WHERE result_hash = ? AND event_ordinal = ?
      `,
      selectParameters: [resultHash, eventOrdinal],
      expected: {
        event_id: event.eventId,
        probe_id: event.probeId,
        observation_time: event.observationTime,
        root_count: event.rootCount,
        no_root_count: event.noRootCount,
        signed_wake: event.signedWake,
        unsigned_wake: event.unsignedWake,
        signed_cancellation_ratio: event.signedCancellationRatio,
        root_transversality_margin: event.rootTransversalityMargin,
        maximum_root_residual: event.maximumRootResidual,
      },
      label: `event ${event.eventId}`,
    });
  }
  for (const [
    measureId,
    scalarValue,
    unit,
    sourceRowCount,
    reductionVersion = "result-packet.v1",
  ] of caseMeasures(packet, row.summaryCase)) {
    insertOrVerify(database, {
      insertSql: `
        INSERT INTO case_reduced_measure(
          result_hash, measure_id, reduction_version, scalar_value,
          unit, source_row_count
        ) VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(result_hash, measure_id, reduction_version) DO NOTHING
      `,
      insertParameters: [
        resultHash,
        measureId,
        reductionVersion,
        scalarValue,
        unit,
        sourceRowCount,
      ],
      selectSql: `
        SELECT scalar_value, unit, source_row_count
        FROM case_reduced_measure
        WHERE result_hash = ? AND measure_id = ?
          AND reduction_version = ?
      `,
      selectParameters: [resultHash, measureId, reductionVersion],
      expected: {
        scalar_value: scalarValue,
        unit,
        source_row_count: sourceRowCount,
      },
      label: `measure ${packet.resultHash}:${measureId}`,
    });
  }
  insertMultidimensionalMeasures(database, packet, row.summaryCase);
  for (const gate of row.acceptance.gates) {
    const evidenceBytes = canonicalBytes(gate);
    insertOrVerify(database, {
      insertSql: `
        INSERT INTO validity_gate_result(
          result_hash, gate_id, gate_instrument_version, measured_value,
          comparator, threshold_value, independent_pass, evidence_hash,
          failure_code, evidence_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(result_hash, gate_id, gate_instrument_version) DO NOTHING
      `,
      insertParameters: [
        resultHash,
        gate.gateId,
        INDEPENDENT_ACCEPTANCE_INSTRUMENT_VERSION,
        gate.measuredValue,
        gate.comparator,
        gate.thresholdValue,
        gate.passed ? 1 : 0,
        hashBuffer(gate.evidenceHash),
        gate.failureCode,
        evidenceBytes,
      ],
      selectSql: `
        SELECT measured_value, comparator, threshold_value, independent_pass,
               evidence_hash, failure_code, evidence_json
        FROM validity_gate_result
        WHERE result_hash = ? AND gate_id = ?
          AND gate_instrument_version = ?
      `,
      selectParameters: [
        resultHash,
        gate.gateId,
        INDEPENDENT_ACCEPTANCE_INSTRUMENT_VERSION,
      ],
      expected: {
        measured_value: gate.measuredValue,
        comparator: gate.comparator,
        threshold_value: gate.thresholdValue,
        independent_pass: gate.passed ? 1 : 0,
        evidence_hash: hashBuffer(gate.evidenceHash),
        failure_code: gate.failureCode,
        evidence_json: evidenceBytes,
      },
      label: `gate ${packet.resultHash}:${gate.gateId}`,
    });
  }
  const acceptanceBytes = canonicalBytes(row.acceptance.evidence);
  insertOrVerify(database, {
    insertSql: `
      INSERT INTO case_acceptance(
        result_hash, acceptance_instrument_version, accepted,
        evidence_hash, evidence_json
      ) VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(result_hash, acceptance_instrument_version) DO NOTHING
    `,
    insertParameters: [
      resultHash,
      INDEPENDENT_ACCEPTANCE_INSTRUMENT_VERSION,
      row.acceptance.accepted ? 1 : 0,
      hashBuffer(row.acceptance.evidenceHash),
      acceptanceBytes,
    ],
    selectSql: `
      SELECT accepted, evidence_hash, evidence_json FROM case_acceptance
      WHERE result_hash = ? AND acceptance_instrument_version = ?
    `,
    selectParameters: [resultHash, INDEPENDENT_ACCEPTANCE_INSTRUMENT_VERSION],
    expected: {
      accepted: row.acceptance.accepted ? 1 : 0,
      evidence_hash: hashBuffer(row.acceptance.evidenceHash),
      evidence_json: acceptanceBytes,
    },
    label: `case acceptance ${packet.resultHash}`,
  });
  const sampling = row.summaryCase.coordinates?.sampling;
  insertOrVerify(database, {
    insertSql: `
      INSERT INTO campaign_case(
        manifest_hash, case_ordinal, case_id, case_type,
        configuration_hash, source_hash, result_hash, packet_filename,
        summary_case_json, sample_index, strata_json, unit_coordinates_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(manifest_hash, case_ordinal) DO NOTHING
    `,
    insertParameters: [
      hashBuffer(preflight.manifestHash),
      row.caseOrdinal,
      row.summaryCase.caseId,
      row.summaryCase.caseType,
      hashBuffer(row.configurationHash),
      sourceHash,
      resultHash,
      row.packetFilename,
      canonicalBytes(row.summaryCase),
      sampling?.sampleIndex ?? null,
      sampling?.strata ? canonicalBytes(sampling.strata) : null,
      sampling?.unitCoordinates
        ? canonicalBytes(sampling.unitCoordinates)
        : null,
    ],
    selectSql: `
      SELECT case_id, case_type, configuration_hash, source_hash, result_hash,
             packet_filename, summary_case_json, sample_index, strata_json,
             unit_coordinates_json
      FROM campaign_case WHERE manifest_hash = ? AND case_ordinal = ?
    `,
    selectParameters: [hashBuffer(preflight.manifestHash), row.caseOrdinal],
    expected: {
      case_id: row.summaryCase.caseId,
      case_type: row.summaryCase.caseType,
      configuration_hash: hashBuffer(row.configurationHash),
      source_hash: sourceHash,
      result_hash: resultHash,
      packet_filename: row.packetFilename,
      summary_case_json: canonicalBytes(row.summaryCase),
      sample_index: sampling?.sampleIndex ?? null,
      strata_json: sampling?.strata ? canonicalBytes(sampling.strata) : null,
      unit_coordinates_json: sampling?.unitCoordinates
        ? canonicalBytes(sampling.unitCoordinates)
        : null,
    },
    label: `campaign case ${row.summaryCase.caseId}`,
  });
}

function ingestBatchId(preflight) {
  return sha256Canonical({
    manifestHash: preflight.manifestHash,
    importerVersion: ANALYTICAL_CAMPAIGN_IMPORTER_VERSION,
  });
}

function upsertIngestBatch(database, preflight, values) {
  const now = values.now ?? new Date().toISOString();
  database.prepare(`
    INSERT INTO ingest_batch(
      ingest_batch_id, manifest_hash, importer_version, state,
      last_committed_ordinal, source_case_count, committed_case_count,
      error_code, started_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(ingest_batch_id) DO UPDATE SET
      state = excluded.state,
      last_committed_ordinal = excluded.last_committed_ordinal,
      committed_case_count = excluded.committed_case_count,
      error_code = excluded.error_code,
      updated_at = excluded.updated_at
  `).run(
    hashBuffer(ingestBatchId(preflight)),
    hashBuffer(preflight.manifestHash),
    ANALYTICAL_CAMPAIGN_IMPORTER_VERSION,
    values.state,
    values.lastCommittedOrdinal,
    preflight.cases.length,
    values.committedCaseCount,
    values.errorCode ?? null,
    values.startedAt ?? now,
    now,
  );
}

function insertCampaignAcceptance(database, preflight) {
  const evidence = preflight.campaignAcceptance;
  const evidenceBytes = canonicalBytes(evidence);
  insertOrVerify(database, {
    insertSql: `
      INSERT INTO campaign_acceptance(
        manifest_hash, acceptance_instrument_version, accepted,
        required_case_count, observed_case_count, accepted_case_count,
        evidence_hash, evidence_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(manifest_hash, acceptance_instrument_version) DO NOTHING
    `,
    insertParameters: [
      hashBuffer(preflight.manifestHash),
      INDEPENDENT_ACCEPTANCE_INSTRUMENT_VERSION,
      evidence.accepted ? 1 : 0,
      evidence.requiredCaseCount,
      evidence.observedCaseCount,
      evidence.acceptedCaseCount,
      hashBuffer(evidence.evidenceHash),
      evidenceBytes,
    ],
    selectSql: `
      SELECT accepted, required_case_count, observed_case_count,
             accepted_case_count, evidence_hash, evidence_json
      FROM campaign_acceptance
      WHERE manifest_hash = ? AND acceptance_instrument_version = ?
    `,
    selectParameters: [
      hashBuffer(preflight.manifestHash),
      INDEPENDENT_ACCEPTANCE_INSTRUMENT_VERSION,
    ],
    expected: {
      accepted: evidence.accepted ? 1 : 0,
      required_case_count: evidence.requiredCaseCount,
      observed_case_count: evidence.observedCaseCount,
      accepted_case_count: evidence.acceptedCaseCount,
      evidence_hash: hashBuffer(evidence.evidenceHash),
      evidence_json: evidenceBytes,
    },
    label: `campaign acceptance ${preflight.manifestHash}`,
  });
}

export function importAnalyticalCampaign(databasePath, options) {
  const batchSize = positiveInteger(
    options.batchSize ?? DEFAULT_INGEST_TRANSACTION_BATCH_SIZE,
    "batchSize",
  );
  if (batchSize > DEFAULT_INGEST_TRANSACTION_BATCH_SIZE) {
    fail(`batchSize must not exceed ${DEFAULT_INGEST_TRANSACTION_BATCH_SIZE}.`);
  }
  const preflight = preflightAnalyticalCampaignImport(options);
  const database = openAnalyticalCampaignDatabase(databasePath, options);
  const startedAt = new Date().toISOString();
  let lastCommittedOrdinal = -1;
  let committedCaseCount = 0;
  let resumeOffset = 0;
  try {
    database.exec("BEGIN IMMEDIATE");
    try {
      insertCampaignEnvelope(database, preflight, options);
      const existingBatch = database.prepare(`
        SELECT state, last_committed_ordinal, committed_case_count, started_at
        FROM ingest_batch WHERE ingest_batch_id = ?
      `).get(hashBuffer(ingestBatchId(preflight)));
      if (existingBatch && existingBatch.state !== "complete") {
        lastCommittedOrdinal = existingBatch.last_committed_ordinal;
        committedCaseCount = existingBatch.committed_case_count;
        resumeOffset = Math.min(preflight.cases.length, lastCommittedOrdinal + 1);
      }
      upsertIngestBatch(database, preflight, {
        state: "in-progress",
        lastCommittedOrdinal,
        committedCaseCount,
        startedAt: existingBatch?.started_at ?? startedAt,
      });
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
    for (let offset = resumeOffset; offset < preflight.cases.length; offset += batchSize) {
      const rows = preflight.cases.slice(offset, offset + batchSize);
      database.exec("BEGIN IMMEDIATE");
      try {
        for (const row of rows) insertCase(database, preflight, row);
        lastCommittedOrdinal = rows.at(-1).caseOrdinal;
        committedCaseCount = lastCommittedOrdinal + 1;
        upsertIngestBatch(database, preflight, {
          state: "in-progress",
          lastCommittedOrdinal,
          committedCaseCount,
          startedAt,
        });
        database.exec("COMMIT");
      } catch (error) {
        database.exec("ROLLBACK");
        throw error;
      }
      options.onBatchCommitted?.({
        manifestHash: preflight.manifestHash,
        lastCommittedOrdinal,
        committedCaseCount,
        sourceCaseCount: preflight.cases.length,
      });
    }
    database.exec("BEGIN IMMEDIATE");
    try {
      insertCampaignAcceptance(database, preflight);
      upsertIngestBatch(database, preflight, {
        state: "complete",
        lastCommittedOrdinal: preflight.cases.length - 1,
        committedCaseCount: preflight.cases.length,
        startedAt,
      });
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
    const acceptedCount = Number(database.prepare(`
      SELECT COUNT(*) AS count FROM accepted_case WHERE manifest_hash = ?
    `).get(hashBuffer(preflight.manifestHash)).count);
    const storedCaseCount = Number(database.prepare(`
      SELECT COUNT(*) AS count FROM campaign_case WHERE manifest_hash = ?
    `).get(hashBuffer(preflight.manifestHash)).count);
    if (storedCaseCount !== preflight.cases.length ||
        acceptedCount !== preflight.campaignAcceptance.acceptedCaseCount) {
      fail("campaign publication counts differ from the complete imported inventory.");
    }
    return {
      schema: ANALYTICAL_CAMPAIGN_DATABASE_SCHEMA,
      manifestHash: preflight.manifestHash,
      summaryHash: preflight.summaryHash,
      caseCount: preflight.cases.length,
      acceptedCaseCount: acceptedCount,
      rejectedCaseCount: preflight.cases.length - acceptedCount,
      batchSize,
      rawArtifactTransactionBatchSize:
        options.experimentalRawArtifactTransactionBatchSize ?? null,
      campaignEvidenceHash: preflight.campaignAcceptance.evidenceHash,
      resumedFromOrdinal: resumeOffset,
    };
  } catch (error) {
    try {
      database.exec("BEGIN IMMEDIATE");
      upsertIngestBatch(database, preflight, {
        state: "failed",
        lastCommittedOrdinal,
        committedCaseCount,
        errorCode: "ingest-operation-failed",
        startedAt,
      });
      database.exec("COMMIT");
    } catch {
      try {
        database.exec("ROLLBACK");
      } catch {
        // Preserve the original ingestion error.
      }
    }
    throw error;
  } finally {
    database.close();
  }
}

export function recordAnalyticalDatabaseGeneration(databasePath, options) {
  const registryBytes = Buffer.from(options.registryBytes);
  const registry = parseJsonBytes(registryBytes, "analytical campaign registry");
  const registryHash = sha256Canonical(registry);
  if (registryHash !== options.evidence.registryHash ||
      registry.registryId !== options.evidence.registryId) {
    fail("database generation evidence does not match its registry artifact.");
  }
  const countsComplete = options.evidence.requiredCampaignCount ===
      options.evidence.observedCampaignCount &&
    options.evidence.requiredCandidateCount ===
      options.evidence.observedCandidateCount &&
    options.evidence.acceptedCandidateCount +
      options.evidence.rejectedCandidateCount ===
      options.evidence.observedCandidateCount;
  if (!countsComplete) {
    fail("database generation evidence is incomplete.");
  }
  const evidenceHash = sha256Canonical(options.evidence);
  const generationHash = sha256Canonical({
    registryHash,
    rebuildInstrumentVersion: options.rebuildInstrumentVersion,
    evidenceHash,
  });
  const completedAt = options.completedAt ?? new Date().toISOString();
  const database = openAnalyticalCampaignDatabase(databasePath, options);
  try {
    database.exec("BEGIN IMMEDIATE");
    try {
      const registryArtifact = insertArtifact(database, {
        rawBytes: registryBytes,
        artifactKind: "all-candidate-campaign-registry",
        mediaType: "application/json",
        codec: "gzip",
        createdBy: options.rebuildInstrumentVersion,
      });
      const evidenceBytes = canonicalBytes({
        ...options.evidence,
        evidenceHash,
        generationHash,
      });
      insertOrVerify(database, {
        insertSql: `
          INSERT INTO database_generation(
            generation_hash, registry_id, registry_hash,
            registry_artifact_hash, rebuild_instrument_version,
            required_campaign_count, observed_campaign_count,
            required_candidate_count, observed_candidate_count,
            accepted_candidate_count, rejected_candidate_count,
            evidence_hash, evidence_json, completed_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(generation_hash) DO NOTHING
        `,
        insertParameters: [
          hashBuffer(generationHash),
          registry.registryId,
          hashBuffer(registryHash),
          registryArtifact.artifactHash,
          options.rebuildInstrumentVersion,
          options.evidence.requiredCampaignCount,
          options.evidence.observedCampaignCount,
          options.evidence.requiredCandidateCount,
          options.evidence.observedCandidateCount,
          options.evidence.acceptedCandidateCount,
          options.evidence.rejectedCandidateCount,
          hashBuffer(evidenceHash),
          evidenceBytes,
          completedAt,
        ],
        selectSql: `
          SELECT registry_id, registry_hash, registry_artifact_hash,
                 rebuild_instrument_version, required_campaign_count,
                 observed_campaign_count, required_candidate_count,
                 observed_candidate_count, accepted_candidate_count,
                 rejected_candidate_count, evidence_hash, evidence_json
          FROM database_generation WHERE generation_hash = ?
        `,
        selectParameters: [hashBuffer(generationHash)],
        expected: {
          registry_id: registry.registryId,
          registry_hash: hashBuffer(registryHash),
          registry_artifact_hash: registryArtifact.artifactHash,
          rebuild_instrument_version: options.rebuildInstrumentVersion,
          required_campaign_count: options.evidence.requiredCampaignCount,
          observed_campaign_count: options.evidence.observedCampaignCount,
          required_candidate_count: options.evidence.requiredCandidateCount,
          observed_candidate_count: options.evidence.observedCandidateCount,
          accepted_candidate_count: options.evidence.acceptedCandidateCount,
          rejected_candidate_count: options.evidence.rejectedCandidateCount,
          evidence_hash: hashBuffer(evidenceHash),
          evidence_json: evidenceBytes,
        },
        label: `database generation ${generationHash}`,
      });
      for (const campaign of options.evidence.campaigns) {
        const manifestHash = hashBuffer(campaign.manifestHash, "generation campaign manifestHash");
        const cases = database.prepare(`
          SELECT campaign_case.result_hash, campaign_case.case_id,
                 source_record.family_id, source_record.member_id,
                 campaign_case.source_hash, case_result.protocol_hash,
                 case_acceptance.accepted
          FROM campaign_case
          JOIN source_record USING (source_hash)
          JOIN case_result USING (result_hash)
          JOIN case_acceptance USING (result_hash)
          WHERE campaign_case.manifest_hash = ?
            AND case_acceptance.acceptance_instrument_version = ?
          ORDER BY campaign_case.case_ordinal
        `).all(manifestHash, INDEPENDENT_ACCEPTANCE_INSTRUMENT_VERSION);
        if (cases.length !== campaign.caseCount) {
          fail(`database generation campaign ${campaign.manifestHash} case inventory is incomplete.`);
        }
        for (const row of cases) {
          const failedGate = database.prepare(`
            SELECT gate_id FROM validity_gate_result
            WHERE result_hash = ? AND independent_pass = 0
            ORDER BY gate_id LIMIT 1
          `).get(row.result_hash)?.gate_id ?? null;
          database.prepare(`
            INSERT INTO database_generation_case(
              generation_hash, manifest_hash, result_hash, case_id,
              family_id, member_id, source_hash, protocol_hash,
              acceptance_state, failed_gate
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(generation_hash, result_hash) DO NOTHING
          `).run(
            hashBuffer(generationHash),
            manifestHash,
            row.result_hash,
            row.case_id,
            row.family_id,
            row.member_id,
            row.source_hash,
            row.protocol_hash,
            row.accepted === 1 ? "accepted" : "rejected",
            failedGate,
          );
        }
      }
      database.exec("COMMIT");
      return { generationHash, registryHash, evidenceHash };
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  } finally {
    database.close();
  }
}

function readStoredArtifact(database, artifactHash) {
  const row = database.prepare(`
    SELECT artifact_hash, artifact_kind, media_type, codec,
           raw_bytes, stored_bytes, payload
    FROM artifact WHERE artifact_hash = ?
  `).get(artifactHash);
  if (!row) fail(`stored artifact ${hashHex(artifactHash)} is missing.`);
  const rawBytes = decodeArtifact(row);
  if (rawBytes.length !== row.raw_bytes || row.payload.length !== row.stored_bytes ||
      sha256Bytes(rawBytes) !== hashHex(row.artifact_hash)) {
    fail(`stored artifact ${hashHex(artifactHash)} failed byte/hash verification.`);
  }
  return { ...row, rawBytes };
}

function writeExactFile(filePath, bytes) {
  mkdirSync(path.dirname(filePath), { recursive: true });
  if (existsSync(filePath)) {
    const existing = readFileSync(filePath);
    if (!existing.equals(Buffer.from(bytes))) {
      fail(`deterministic export target already differs: ${filePath}`);
    }
    return;
  }
  writeFileSync(filePath, bytes);
  if (!readFileSync(filePath).equals(Buffer.from(bytes))) {
    fail(`deterministic export verification failed: ${filePath}`);
  }
}

function inventoryRow(relativePath, kind, bytes, extra = {}) {
  return {
    path: relativePath.split(path.sep).join("/"),
    kind,
    bytes: bytes.length,
    sha256: sha256Bytes(bytes),
    ...extra,
  };
}

export function exportAnalyticalCampaign(databasePath, options) {
  const manifestHashHex = options.manifestHash;
  const manifestHash = hashBuffer(manifestHashHex, "manifestHash");
  const outputDirectory = path.resolve(options.outputDirectory);
  const database = openAnalyticalCampaignDatabase(databasePath, {
    ...options,
    readOnly: true,
    migrate: false,
  });
  try {
    const campaign = database.prepare(`
      SELECT campaign_manifest.*, campaign_summary.summary_hash,
             campaign_summary.artifact_hash AS summary_artifact_hash,
             campaign_acceptance.evidence_json AS campaign_evidence_json
      FROM campaign_manifest
      JOIN campaign_summary USING (manifest_hash)
      JOIN campaign_acceptance USING (manifest_hash)
      WHERE manifest_hash = ?
        AND campaign_acceptance.acceptance_instrument_version = ?
        AND campaign_acceptance.accepted = 1
    `).get(manifestHash, INDEPENDENT_ACCEPTANCE_INSTRUMENT_VERSION);
    if (!campaign) fail(`accepted campaign ${manifestHashHex} is not stored.`);
    const inventory = [];
    const manifestArtifact = readStoredArtifact(database, campaign.artifact_hash);
    const manifestRelativePath = campaign.manifest_filename;
    writeExactFile(
      path.join(outputDirectory, manifestRelativePath),
      manifestArtifact.rawBytes,
    );
    inventory.push(inventoryRow(
      manifestRelativePath,
      "campaign-manifest",
      manifestArtifact.rawBytes,
      { contentHash: manifestHashHex },
    ));
    const summaryArtifact = readStoredArtifact(
      database,
      campaign.summary_artifact_hash,
    );
    const summaryRelativePath = campaign.summary_filename;
    writeExactFile(
      path.join(outputDirectory, summaryRelativePath),
      summaryArtifact.rawBytes,
    );
    inventory.push(inventoryRow(
      summaryRelativePath,
      "campaign-summary",
      summaryArtifact.rawBytes,
      { contentHash: hashHex(campaign.summary_hash) },
    ));

    const cases = database.prepare(`
      SELECT campaign_case.case_ordinal, campaign_case.case_id,
             campaign_case.packet_filename, campaign_case.result_hash,
             campaign_case.source_hash, case_result.protocol_hash,
             case_result.artifact_hash,
             source_record.source_envelope_json,
             source_record.exact_source_artifact_hash,
             source_record.source_hash_verification_state,
             analysis_protocol.canonical_json AS protocol_json,
             case_acceptance.accepted AS case_accepted,
             case_acceptance.evidence_json AS case_evidence_json
      FROM campaign_case
      JOIN case_result USING (result_hash)
      JOIN source_record USING (source_hash)
      JOIN analysis_protocol USING (protocol_hash)
      JOIN case_acceptance USING (result_hash)
      WHERE campaign_case.manifest_hash = ?
        AND case_acceptance.acceptance_instrument_version = ?
      ORDER BY campaign_case.case_ordinal
    `).all(manifestHash, INDEPENDENT_ACCEPTANCE_INSTRUMENT_VERSION);
    if (cases.length !== campaign.required_total_case_count) {
      fail("accepted campaign export inventory is incomplete.");
    }
    const writtenSources = new Set();
    const writtenProtocols = new Set();
    for (const row of cases) {
      const resultHash = hashHex(row.result_hash);
      const packetArtifact = readStoredArtifact(database, row.artifact_hash);
      const packetRelativePath = path.join(
        campaign.packet_directory,
        row.packet_filename,
      );
      writeExactFile(
        path.join(outputDirectory, packetRelativePath),
        packetArtifact.rawBytes,
      );
      inventory.push(inventoryRow(
        packetRelativePath,
        "result-packet",
        packetArtifact.rawBytes,
        {
          caseOrdinal: row.case_ordinal,
          caseId: row.case_id,
          resultHash,
          accepted: row.case_accepted === 1,
        },
      ));
      const sourceHash = hashHex(row.source_hash);
      if (!writtenSources.has(sourceHash)) {
        const sourceRelativePath = path.join(
          "source-envelopes",
          `${sourceHash}.source-envelope.json`,
        );
        const sourceBytes = prettyJsonBytes(parseJsonBytes(
          row.source_envelope_json,
          `source ${sourceHash}`,
        ));
        writeExactFile(path.join(outputDirectory, sourceRelativePath), sourceBytes);
        inventory.push(inventoryRow(
          sourceRelativePath,
          "source-envelope",
          sourceBytes,
          {
            sourceHash,
            sourceHashVerificationState: row.source_hash_verification_state,
          },
        ));
        if (row.exact_source_artifact_hash) {
          const exactSourceArtifact = readStoredArtifact(
            database,
            row.exact_source_artifact_hash,
          );
          const exactSourceRelativePath = path.join(
            "exact-sources",
            `${sourceHash}.exact-source-record.v1.json`,
          );
          writeExactFile(
            path.join(outputDirectory, exactSourceRelativePath),
            exactSourceArtifact.rawBytes,
          );
          inventory.push(inventoryRow(
            exactSourceRelativePath,
            "exact-source-record",
            exactSourceArtifact.rawBytes,
            { sourceHash, sourceHashVerificationState: "exact-preimage-verified" },
          ));
        }
        writtenSources.add(sourceHash);
      }
      const protocolHash = hashHex(row.protocol_hash);
      if (!writtenProtocols.has(protocolHash)) {
        const protocolRelativePath = path.join(
          "protocols",
          `${protocolHash}.analysis-protocol.v1.json`,
        );
        const protocolBytes = prettyJsonBytes(parseJsonBytes(
          row.protocol_json,
          `protocol ${protocolHash}`,
        ));
        writeExactFile(path.join(outputDirectory, protocolRelativePath), protocolBytes);
        inventory.push(inventoryRow(
          protocolRelativePath,
          "analysis-protocol",
          protocolBytes,
          { protocolHash },
        ));
        writtenProtocols.add(protocolHash);
      }
      const acceptanceRelativePath = path.join(
        "acceptance",
        `${resultHash}.case-acceptance.v1.json`,
      );
      const acceptanceBytes = prettyJsonBytes(parseJsonBytes(
        row.case_evidence_json,
        `case acceptance ${resultHash}`,
      ));
      writeExactFile(
        path.join(outputDirectory, acceptanceRelativePath),
        acceptanceBytes,
      );
      inventory.push(inventoryRow(
        acceptanceRelativePath,
        "independent-case-acceptance",
        acceptanceBytes,
        { resultHash },
      ));
    }
    if (tableExists(database, "analytical_raw_artifact")) {
      const rawArtifactTotal = Number(database.prepare(`
        SELECT COUNT(*) AS count FROM analytical_raw_artifact
        WHERE manifest_hash = ?
      `).get(manifestHash).count);
      const rawArtifacts = database.prepare(`
        SELECT analytical_raw_artifact.*, artifact.payload, artifact.codec
        FROM analytical_raw_artifact
        JOIN artifact USING (artifact_hash)
        WHERE analytical_raw_artifact.manifest_hash = ?
        ORDER BY analytical_raw_artifact.relative_path
      `).iterate(manifestHash);
      let rawArtifactIndex = 0;
      options.onProgress?.({
        stage: "export-raw-artifacts",
        completedWork: 0,
        totalWork: rawArtifactTotal,
      });
      for (const row of rawArtifacts) {
        if (row.codec !== "gzip" ||
            sha256Bytes(row.payload) !== hashHex(row.compressed_hash) ||
            row.payload.length !== row.stored_bytes) {
          fail(`raw analytical artifact ${row.relative_path} failed compressed-byte verification.`);
        }
        const relativePath = safeRelativePath(row.relative_path, "raw artifact export path");
        writeExactFile(path.join(outputDirectory, relativePath), row.payload);
        inventory.push(inventoryRow(relativePath, row.artifact_kind, row.payload, {
          candidateId: row.candidate_id,
          rawSha256: hashHex(row.raw_hash),
          compressedSha256: hashHex(row.compressed_hash),
        }));
        rawArtifactIndex += 1;
        if (rawArtifactIndex % 64 === 0 || rawArtifactIndex === rawArtifactTotal) {
          options.onProgress?.({
            stage: "export-raw-artifacts",
            candidateId: row.candidate_id,
            completedWork: rawArtifactIndex,
            totalWork: rawArtifactTotal,
          });
        }
      }
    }
    const campaignAcceptanceRelativePath = path.join(
      "acceptance",
      `${manifestHashHex}.campaign-acceptance.v1.json`,
    );
    const campaignAcceptanceBytes = prettyJsonBytes(parseJsonBytes(
      campaign.campaign_evidence_json,
      `campaign acceptance ${manifestHashHex}`,
    ));
    writeExactFile(
      path.join(outputDirectory, campaignAcceptanceRelativePath),
      campaignAcceptanceBytes,
    );
    inventory.push(inventoryRow(
      campaignAcceptanceRelativePath,
      "independent-campaign-acceptance",
      campaignAcceptanceBytes,
      { manifestHash: manifestHashHex },
    ));
    inventory.sort((left, right) => left.path.localeCompare(right.path));
    const packetBoundSources = inventory
      .filter((row) => row.kind === "source-envelope" &&
        row.sourceHashVerificationState === "packet-bound")
      .map((row) => row.sourceHash);
    const inventoryWithoutHash = {
      schema: "prescribed-record-analytics/reproducibility-inventory.v1",
      databaseSchema: ANALYTICAL_CAMPAIGN_DATABASE_SCHEMA,
      exporterVersion: ANALYTICAL_CAMPAIGN_EXPORTER_VERSION,
      acceptanceInstrumentVersion: INDEPENDENT_ACCEPTANCE_INSTRUMENT_VERSION,
      manifestHash: manifestHashHex,
      summaryHash: hashHex(campaign.summary_hash),
      sourcePreimageBoundary: packetBoundSources.length === 0
        ? "all-exact-source-preimages-verified"
        : "legacy-source-hashes-are-packet-bound; exact-source-preimages-not-retained",
      packetBoundSourceHashes: packetBoundSources,
      files: inventory,
    };
    const inventoryDocument = {
      ...inventoryWithoutHash,
      inventoryHash: sha256Canonical(inventoryWithoutHash),
    };
    const inventoryBytes = prettyJsonBytes(inventoryDocument);
    writeExactFile(
      path.join(outputDirectory, "reproducibility-inventory.v1.json"),
      inventoryBytes,
    );
    return {
      schema: inventoryDocument.schema,
      manifestHash: manifestHashHex,
      summaryHash: inventoryDocument.summaryHash,
      caseCount: cases.length,
      acceptedCaseCount: cases.filter((row) => row.case_accepted === 1).length,
      rejectedCaseCount: cases.filter((row) => row.case_accepted !== 1).length,
      fileCount: inventory.length + 1,
      inventoryHash: inventoryDocument.inventoryHash,
      outputDirectory,
      packetBoundSourceCount: packetBoundSources.length,
    };
  } finally {
    database.close();
  }
}

function databaseFingerprint(database) {
  const tables = [
    "schema_migration",
    "artifact",
    "source_record",
    "analysis_protocol",
    "campaign_manifest",
    "campaign_summary",
    "configuration",
    "case_result",
    "campaign_case",
    "observation_event",
    "case_reduced_measure",
    "validity_gate_result",
    "case_acceptance",
    "campaign_acceptance",
    "ingest_batch",
    "accepted_case",
  ];
  if (tableExists(database, "database_generation")) {
    tables.push("database_generation");
  }
  for (const table of [
    "methodology_coverage",
    "analytical_raw_artifact",
    "multidimensional_measure",
    "database_generation_case",
  ]) {
    if (tableExists(database, table)) tables.push(table);
  }
  const counts = Object.fromEntries(tables.map((table) => [
    table,
    Number(database.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get().count),
  ]));
  const artifacts = database.prepare(`
    SELECT lower(hex(artifact_hash)) AS artifact_hash, artifact_kind,
           codec, raw_bytes, stored_bytes
    FROM artifact ORDER BY artifact_hash
  `).all();
  const caseEvidence = database.prepare(`
    SELECT lower(hex(result_hash)) AS result_hash,
           lower(hex(evidence_hash)) AS evidence_hash, accepted
    FROM case_acceptance ORDER BY result_hash, acceptance_instrument_version
  `).all();
  const campaignEvidence = database.prepare(`
    SELECT lower(hex(manifest_hash)) AS manifest_hash,
           lower(hex(evidence_hash)) AS evidence_hash, accepted
    FROM campaign_acceptance ORDER BY manifest_hash, acceptance_instrument_version
  `).all();
  const generationEvidence = tableExists(database, "database_generation")
    ? database.prepare(`
        SELECT lower(hex(generation_hash)) AS generation_hash,
               lower(hex(registry_hash)) AS registry_hash,
               lower(hex(evidence_hash)) AS evidence_hash
        FROM database_generation ORDER BY generation_hash
      `).all()
    : [];
  return sha256Canonical({
    counts,
    artifacts,
    caseEvidence,
    campaignEvidence,
    generationEvidence,
  });
}

export function verifyAnalyticalCampaignDatabase(databasePath, options = {}) {
  const database = openAnalyticalCampaignDatabase(databasePath, {
    ...options,
    readOnly: true,
    migrate: false,
  });
  try {
    const integrity = database.prepare("PRAGMA integrity_check").get().integrity_check;
    if (integrity !== "ok") fail(`SQLite integrity check failed: ${integrity}`);
    const foreignKeyFailures = database.prepare("PRAGMA foreign_key_check").all();
    if (foreignKeyFailures.length !== 0) {
      fail(`SQLite foreign-key check failed for ${foreignKeyFailures.length} row(s).`);
    }
    if (!tableExists(database, "schema_migration")) {
      fail("database has no analytical campaign schema migrations.");
    }
    const hasRawArtifactTable = tableExists(
      database,
      "analytical_raw_artifact",
    );
    const singlePassRawArtifactVerification =
      options.experimentalSinglePassRawArtifactVerification === true &&
      hasRawArtifactTable;
    const artifactTotal = Number(database.prepare(
      "SELECT COUNT(*) AS count FROM artifact",
    ).get().count);
    const firstPassArtifactTotal = singlePassRawArtifactVerification
      ? Number(database.prepare(`
          SELECT COUNT(*) AS count
          FROM artifact
          WHERE NOT EXISTS (
            SELECT 1 FROM analytical_raw_artifact
            WHERE analytical_raw_artifact.artifact_hash = artifact.artifact_hash
          )
        `).get().count)
      : artifactTotal;
    const artifacts = database.prepare(`
      SELECT artifact_hash, artifact_kind, codec, raw_bytes, stored_bytes, payload
      FROM artifact
      ${singlePassRawArtifactVerification
        ? `WHERE NOT EXISTS (
            SELECT 1 FROM analytical_raw_artifact
            WHERE analytical_raw_artifact.artifact_hash = artifact.artifact_hash
          )`
        : ""}
      ORDER BY artifact_hash
    `).iterate();
    let artifactIndex = 0;
    options.onProgress?.({
      stage: "verify-artifacts",
      completedWork: 0,
      totalWork: firstPassArtifactTotal,
    });
    for (const row of artifacts) {
      const rawBytes = decodeArtifact(row);
      if (rawBytes.length !== row.raw_bytes || row.payload.length !== row.stored_bytes ||
          sha256Bytes(rawBytes) !== hashHex(row.artifact_hash)) {
        fail(`artifact ${hashHex(row.artifact_hash)} failed verification.`);
      }
      if (row.artifact_kind === "result-packet") {
        const packet = parseJsonBytes(rawBytes, "stored result packet");
        if (sha256Canonical(withoutField(packet, "resultHash")) !== packet.resultHash) {
          fail(`result packet ${packet.resultHash} failed canonical hash verification.`);
        }
      } else if (row.artifact_kind === "campaign-manifest") {
        const manifest = parseJsonBytes(rawBytes, "stored campaign manifest");
        const stored = database.prepare(`
          SELECT 1 FROM campaign_manifest WHERE manifest_hash = ?
        `).get(hashBuffer(sha256Canonical(manifest)));
        if (!stored) fail("stored campaign manifest hash is not indexed.");
      } else if (row.artifact_kind === "campaign-summary") {
        const summary = parseJsonBytes(rawBytes, "stored campaign summary");
        const hash = sha256Canonical(withoutField(summary, "summaryHash"));
        if (hash !== summary.summaryHash) fail("stored campaign summary hash is invalid.");
      }
      artifactIndex += 1;
      if (artifactIndex % 64 === 0 || artifactIndex === firstPassArtifactTotal) {
        options.onProgress?.({
          stage: "verify-artifacts",
          completedWork: artifactIndex,
          totalWork: firstPassArtifactTotal,
        });
      }
    }
    const exactSources = database.prepare(`
      SELECT source_hash, exact_source_artifact_hash
      FROM source_record
      WHERE source_hash_verification_state = 'exact-preimage-verified'
      ORDER BY source_hash
    `).all();
    for (const row of exactSources) {
      if (!row.exact_source_artifact_hash) {
        fail(`exact source ${hashHex(row.source_hash)} has no artifact.`);
      }
      const artifact = readStoredArtifact(database, row.exact_source_artifact_hash);
      const exactSource = validateExactPrescribedSourceRecord(parseJsonBytes(
        artifact.rawBytes,
        `exact source ${hashHex(row.source_hash)}`,
      ));
      if (sha256Canonical(exactSource) !== hashHex(row.source_hash)) {
        fail(`exact source ${hashHex(row.source_hash)} failed canonical verification.`);
      }
    }
    if (hasRawArtifactTable) {
      if (singlePassRawArtifactVerification) {
        const rawArtifactReferenceCount = Number(database.prepare(`
          SELECT COUNT(DISTINCT artifact_hash) AS count
          FROM analytical_raw_artifact
        `).get().count);
        if (firstPassArtifactTotal + rawArtifactReferenceCount !== artifactTotal) {
          fail("single-pass artifact verification coverage is incomplete.");
        }
      }
      const rawArtifactTotal = Number(database.prepare(
        "SELECT COUNT(*) AS count FROM analytical_raw_artifact",
      ).get().count);
      const rawArtifacts = database.prepare(`
        SELECT analytical_raw_artifact.*, artifact.payload, artifact.codec,
               artifact.artifact_hash AS stored_artifact_hash,
               artifact.raw_bytes AS artifact_raw_bytes,
               artifact.stored_bytes AS artifact_stored_bytes
        FROM analytical_raw_artifact JOIN artifact USING (artifact_hash)
        ORDER BY compressed_hash
      `).iterate();
      let rawArtifactIndex = 0;
      options.onProgress?.({
        stage: "verify-raw-artifacts",
        completedWork: 0,
        totalWork: rawArtifactTotal,
      });
      for (const row of rawArtifacts) {
        const rawBytes = gunzipSync(row.payload);
        if (row.codec !== "gzip" || row.payload.length !== row.stored_bytes ||
            rawBytes.length !== row.raw_bytes ||
            row.raw_bytes !== row.artifact_raw_bytes ||
            row.stored_bytes !== row.artifact_stored_bytes ||
            !Buffer.from(row.raw_hash).equals(
              Buffer.from(row.stored_artifact_hash),
            ) ||
            sha256Bytes(row.payload) !== hashHex(row.compressed_hash) ||
            sha256Bytes(rawBytes) !== hashHex(row.raw_hash)) {
          fail(`raw analytical artifact ${row.relative_path} failed hash/size verification.`);
        }
        rawArtifactIndex += 1;
        if (rawArtifactIndex % 64 === 0 || rawArtifactIndex === rawArtifactTotal) {
          options.onProgress?.({
            stage: "verify-raw-artifacts",
            candidateId: row.candidate_id,
            completedWork: rawArtifactIndex,
            totalWork: rawArtifactTotal,
          });
        }
      }
      const incompleteCompleteCycleCases = Number(database.prepare(`
        SELECT COUNT(*) AS count FROM case_result
        WHERE packet_schema = ? AND (
          NOT EXISTS (
            SELECT 1 FROM multidimensional_measure
            WHERE multidimensional_measure.result_hash = case_result.result_hash
          ) OR NOT EXISTS (
            SELECT 1 FROM analytical_raw_artifact
            JOIN campaign_case USING (manifest_hash)
            WHERE campaign_case.result_hash = case_result.result_hash
              AND analytical_raw_artifact.candidate_id = campaign_case.case_id
          )
        )
      `).get(COMPLETE_CYCLE_RESULT_SCHEMA).count);
      if (incompleteCompleteCycleCases !== 0) {
        fail(`${incompleteCompleteCycleCases} complete-cycle case(s) lack normalized measures or raw artifacts.`);
      }
    }
    const rejectedAcceptedRows = Number(database.prepare(`
      SELECT COUNT(*) AS count
      FROM accepted_case
      JOIN case_acceptance USING (result_hash)
      JOIN campaign_acceptance USING (manifest_hash)
      WHERE case_acceptance.accepted != 1 OR campaign_acceptance.accepted != 1
    `).get().count);
    if (rejectedAcceptedRows !== 0) {
      fail("accepted_case exposes an independently rejected row.");
    }
    const generations = tableExists(database, "database_generation")
      ? database.prepare(`
          SELECT * FROM database_generation ORDER BY generation_hash
        `).all()
      : [];
    for (const generation of generations) {
      if (generation.required_campaign_count !== generation.observed_campaign_count ||
          generation.required_candidate_count !== generation.observed_candidate_count ||
          generation.accepted_candidate_count + generation.rejected_candidate_count !==
            generation.observed_candidate_count) {
        fail(`database generation ${hashHex(generation.generation_hash)} is incomplete.`);
      }
      const registryArtifact = readStoredArtifact(
        database,
        generation.registry_artifact_hash,
      );
      const registry = parseJsonBytes(registryArtifact.rawBytes, "stored campaign registry");
      if (sha256Canonical(registry) !== hashHex(generation.registry_hash)) {
        fail(`database generation ${hashHex(generation.generation_hash)} has registry drift.`);
      }
      const evidence = parseJsonBytes(generation.evidence_json, "database generation evidence");
      const evidenceWithoutHashes = structuredClone(evidence);
      delete evidenceWithoutHashes.evidenceHash;
      delete evidenceWithoutHashes.generationHash;
      if (sha256Canonical(evidenceWithoutHashes) !== hashHex(generation.evidence_hash) ||
          evidence.evidenceHash !== hashHex(generation.evidence_hash) ||
          evidence.generationHash !== hashHex(generation.generation_hash)) {
        fail(`database generation ${hashHex(generation.generation_hash)} evidence is invalid.`);
      }
      if (tableExists(database, "database_generation_case")) {
        const generationCaseCount = Number(database.prepare(`
          SELECT COUNT(*) AS count FROM database_generation_case
          WHERE generation_hash = ?
        `).get(generation.generation_hash).count);
        if (generationCaseCount !== generation.observed_candidate_count) {
          fail(`database generation ${hashHex(generation.generation_hash)} candidate cohort is incomplete.`);
        }
      }
    }
    return {
      schema: ANALYTICAL_CAMPAIGN_DATABASE_SCHEMA,
      integrity,
      fingerprint: databaseFingerprint(database),
      artifactCount: artifactTotal,
      acceptedCaseCount: Number(
        database.prepare("SELECT COUNT(*) AS count FROM accepted_case").get().count,
      ),
      rejectedCaseCount: Number(database.prepare(`
        SELECT COUNT(*) AS count FROM case_acceptance WHERE accepted = 0
      `).get().count),
      generationCount: generations.length,
      databaseBytes: statSync(path.resolve(databasePath)).size,
    };
  } finally {
    database.close();
  }
}

function generationCandidateDigest(database, generation) {
  const generationHash = hashHex(generation.generation_hash);
  const candidates = database.prepare(`
    SELECT database_generation_case.*,
           lower(hex(database_generation_case.source_hash)) AS source_hash_hex,
           lower(hex(database_generation_case.protocol_hash)) AS protocol_hash_hex,
           lower(hex(database_generation_case.result_hash)) AS result_hash_hex
    FROM database_generation_case
    WHERE generation_hash = ?
    ORDER BY family_id, member_id, case_id
  `).all(generation.generation_hash).map((row) => {
    const summaryMeasures = database.prepare(`
      SELECT measure_id, reduction_version, disposition, scalar_value, unit,
             probe_polarity, enclosing_radius, normalization,
             numerical_uncertainty
      FROM multidimensional_measure
      WHERE result_hash = ? AND resolution IS NULL
        AND measure_id IN (
          'external-exposure/L_ext',
          'external-exposure/L_raw',
          'external-exposure/eta_ext',
          'normal-wake-flux/signed-cycle-integral',
          'normal-wake-flux/raw-cycle-integral',
          'normal-wake-flux/residual-cycle-integral',
          'normal-wake-flux/eta'
        )
      ORDER BY measure_id, enclosing_radius, probe_polarity
    `).all(row.result_hash);
    return {
      candidateId: row.case_id,
      familyId: row.family_id,
      memberId: row.member_id,
      referenceCase: row.member_id === "B1.1",
      sourceHash: row.source_hash_hex,
      protocolHash: row.protocol_hash_hex,
      resultHash: row.result_hash_hex,
      acceptance: row.acceptance_state,
      failedGate: row.failed_gate,
      summaryMeasures,
    };
  });
  const leaderGroups = new Map();
  for (const candidate of candidates.filter((row) => row.acceptance === "accepted")) {
    for (const measure of candidate.summaryMeasures.filter(
      (row) => row.disposition === "accepted" && Number.isFinite(row.scalar_value),
    )) {
      const key = [
        measure.measure_id,
        measure.unit,
        measure.enclosing_radius ?? "none",
        measure.probe_polarity ?? "none",
        measure.normalization ?? "none",
      ].join("|");
      const current = leaderGroups.get(key);
      const displayed = {
        candidateId: candidate.candidateId,
        familyId: candidate.familyId,
        memberId: candidate.memberId,
        sourceHash: candidate.sourceHash,
        protocolHash: candidate.protocolHash,
        databaseGenerationHash: generationHash,
        acceptanceState: candidate.acceptance,
        failedGate: null,
          measureId: measure.measure_id,
          unit: measure.unit,
          radius: measure.enclosing_radius,
        radiusSequence: null,
        reduction: measure.reduction_version,
          probePolarity: measure.probe_polarity,
          normalization: measure.normalization,
          scalarValue: measure.scalar_value,
        numericalUncertainty: measure.numerical_uncertainty,
        inclusionReason: "accepted-leader-for-separately-named-measure",
      };
      if (!current || measure.scalar_value > current.scalarValue ||
          (measure.scalar_value === current.scalarValue &&
            candidate.candidateId.localeCompare(current.candidateId) < 0)) {
        leaderGroups.set(key, displayed);
      }
    }
  }
  const referenceRows = candidates
    .filter((candidate) => candidate.referenceCase && candidate.acceptance === "accepted")
    .flatMap((candidate) => candidate.summaryMeasures.map((measure) => ({
      candidateId: candidate.candidateId,
      familyId: candidate.familyId,
      memberId: candidate.memberId,
      sourceHash: candidate.sourceHash,
      protocolHash: candidate.protocolHash,
      databaseGenerationHash: generationHash,
      acceptanceState: candidate.acceptance,
      failedGate: null,
      measureId: measure.measure_id,
      unit: measure.unit,
      radius: measure.enclosing_radius,
      radiusSequence: null,
      reduction: measure.reduction_version,
      normalization: measure.normalization,
      numericalUncertainty: measure.numerical_uncertainty,
      probePolarity: measure.probe_polarity,
      scalarValue: measure.scalar_value,
      inclusionReason: "explicit-reference-case-B1.1",
    })));
  const rejectedRows = candidates
    .filter((candidate) => candidate.acceptance === "rejected")
    .map((candidate) => ({
      candidateId: candidate.candidateId,
      familyId: candidate.familyId,
      memberId: candidate.memberId,
      sourceHash: candidate.sourceHash,
      protocolHash: candidate.protocolHash,
      databaseGenerationHash: generationHash,
      acceptanceState: candidate.acceptance,
      failedGate: candidate.failedGate,
      measureId: `acceptance-gate/${candidate.failedGate ?? "unknown"}`,
      unit: "boolean",
      radius: null,
      radiusSequence: null,
      reduction: INDEPENDENT_ACCEPTANCE_INSTRUMENT_VERSION,
      normalization: "not-applicable",
      numericalUncertainty: null,
      probePolarity: null,
      scalarValue: 0,
      inclusionReason: "independently-rejected-case-with-failed-gate",
    }));
  const displayedRows = [
    ...referenceRows,
    ...leaderGroups.values(),
    ...rejectedRows,
  ].sort((left, right) => [
    left.inclusionReason,
    left.measureId,
    left.candidateId,
    left.probePolarity ?? "none",
  ].join("|").localeCompare([
    right.inclusionReason,
    right.measureId,
    right.candidateId,
    right.probePolarity ?? "none",
  ].join("|")));
  const withoutHash = {
    schema: "prescribed-record-analytics/candidate-cohort-digest.v1",
    generationHash,
    claimBoundary:
      "conditional prescribed-path analytical measures only; no stability, energy, retention, or physical-realization ranking",
    candidateInventory: candidates.map(({ summaryMeasures, ...candidate }) => candidate),
    displayedRows,
  };
  return { ...withoutHash, digestHash: sha256Canonical(withoutHash) };
}

export async function backupAndVerifyAnalyticalCampaignDatabase(
  databasePath,
  backupPath,
  options = {},
) {
  const sourcePath = path.resolve(databasePath);
  const targetPath = path.resolve(backupPath);
  if (sourcePath === targetPath) fail("backup path must differ from the source database.");
  const targetRelativeToRepository = path.relative(REPOSITORY_ROOT, targetPath);
  if (targetRelativeToRepository !== "" &&
      !targetRelativeToRepository.startsWith("..") &&
      !path.isAbsolute(targetRelativeToRepository)) {
    fail("verified backups must be stored outside the repository checkout.");
  }
  if (existsSync(targetPath)) fail("backup target already exists; refusing to overwrite it.");
  mkdirSync(path.dirname(targetPath), { recursive: true });
  const source = openAnalyticalCampaignDatabase(sourcePath, options);
  try {
    source.prepare("PRAGMA wal_checkpoint(TRUNCATE)").all();
    await backup(source, targetPath);
  } finally {
    source.close();
  }
  const sourceVerification = verifyAnalyticalCampaignDatabase(sourcePath, options);
  const backupVerification = verifyAnalyticalCampaignDatabase(targetPath, options);
  if (sourceVerification.fingerprint !== backupVerification.fingerprint ||
      sourceVerification.acceptedCaseCount !== backupVerification.acceptedCaseCount ||
      sourceVerification.rejectedCaseCount !== backupVerification.rejectedCaseCount ||
      sourceVerification.generationCount !== backupVerification.generationCount ||
      sourceVerification.artifactCount !== backupVerification.artifactCount) {
    fail("verified backup fingerprint differs from the source database.");
  }
  return {
    schema: "prescribed-record-analytics/verified-backup.v1",
    sourcePath,
    backupPath: targetPath,
    fingerprint: sourceVerification.fingerprint,
    acceptedCaseCount: sourceVerification.acceptedCaseCount,
    rejectedCaseCount: sourceVerification.rejectedCaseCount,
    generationCount: sourceVerification.generationCount,
    artifactCount: sourceVerification.artifactCount,
    sourceDatabaseBytes: sourceVerification.databaseBytes,
    backupDatabaseBytes: backupVerification.databaseBytes,
    integrity: backupVerification.integrity,
  };
}

export function inspectAnalyticalCampaignDatabase(databasePath, options = {}) {
  const verification = verifyAnalyticalCampaignDatabase(databasePath, options);
  const database = openAnalyticalCampaignDatabase(databasePath, {
    ...options,
    readOnly: true,
    migrate: false,
  });
  try {
    const campaigns = database.prepare(`
      SELECT lower(hex(campaign_manifest.manifest_hash)) AS manifest_hash,
             campaign_manifest.campaign_id,
             campaign_manifest.required_total_case_count,
             campaign_acceptance.accepted,
             campaign_acceptance.accepted_case_count,
             (campaign_acceptance.observed_case_count -
               campaign_acceptance.accepted_case_count) AS rejected_case_count
      FROM campaign_manifest
      LEFT JOIN campaign_acceptance USING (manifest_hash)
      ORDER BY campaign_manifest.campaign_id, manifest_hash
    `).all();
    const generationDigests = tableExists(database, "database_generation_case")
      ? database.prepare(`
          SELECT * FROM database_generation ORDER BY generation_hash
        `).all().map((generation) => generationCandidateDigest(database, generation))
      : [];
    return { ...verification, campaigns, generationDigests };
  } finally {
    database.close();
  }
}
