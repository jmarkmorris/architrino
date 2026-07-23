import { createHash } from "node:crypto";
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

export const COMPACT_ANALYTICAL_DATABASE_SCHEMA =
  "prescribed-path-analysis/compact-control-plane-sqlite.v1";
export const COMPACT_ANALYTICAL_DATABASE_TOOL_VERSION =
  "prescribed-path-analysis/compact-control-plane-sqlite.v1";
export const COMPACT_MONTE_CARLO_CAMPAIGN_SCHEMA =
  "prescribed-path-analysis/compact-monte-carlo-campaign.v1";
export const COMPACT_MONTE_CARLO_CASE_SCHEMA =
  "prescribed-path-analysis/compact-monte-carlo-case.v1";

const REPOSITORY_ROOT = path.resolve(import.meta.dirname, "../../..");
const MIGRATION_DIRECTORY = new URL("./compact-migrations/", import.meta.url);
const LEGACY_TABLES = new Set([
  "artifact",
  "analytical_raw_artifact",
  "observation_event",
  "multidimensional_measure",
]);

function fail(message) {
  throw new Error(message);
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]),
    );
  }
  return value;
}

export function compactCanonicalJson(value) {
  return JSON.stringify(canonicalize(value));
}

export function compactSha256Canonical(value) {
  return createHash("sha256").update(compactCanonicalJson(value)).digest("hex");
}

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function concreteString(value, label) {
  if (typeof value !== "string" || value.length === 0) {
    throw new TypeError(`${label} must be a nonempty string.`);
  }
  return value;
}

function sha256(value, label) {
  if (typeof value !== "string" || !/^[0-9a-f]{64}$/.test(value)) {
    throw new TypeError(`${label} must be a lowercase hexadecimal SHA-256.`);
  }
  return value;
}

function nonnegativeInteger(value, label) {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new TypeError(`${label} must be a nonnegative safe integer.`);
  }
  return value;
}

function optionalFinite(value, label) {
  if (value == null) return null;
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new TypeError(`${label} must be finite when present.`);
  }
  return value;
}

function omitFields(value, fields) {
  const copy = { ...value };
  for (const field of fields) delete copy[field];
  return copy;
}

function booleanInteger(value) {
  return value === true ? 1 : 0;
}

function fileBytes(filePath) {
  try {
    return statSync(filePath).size;
  } catch {
    return 0;
  }
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

function tableExists(database, tableName) {
  return Boolean(database.prepare(
    "SELECT 1 FROM sqlite_schema WHERE type = 'table' AND name = ?",
  ).get(tableName));
}

function assertSame(actual, expected, label) {
  if (compactCanonicalJson(actual) !== compactCanonicalJson(expected)) {
    fail(`${label} conflicts with the existing compact control-plane row.`);
  }
}

export function defaultCompactAnalyticalCampaignDatabasePath(
  repositoryRoot = REPOSITORY_ROOT,
) {
  return path.join(
    repositoryRoot,
    ".local-data/braid-analysis/compact-campaigns.sqlite3",
  );
}

export function assertCompactAnalyticalCampaignDatabasePath(databasePath) {
  const absolutePath = path.resolve(databasePath);
  if (absolutePath === path.parse(absolutePath).root) {
    fail("the compact database path must name a file.");
  }
  if (path.basename(absolutePath) === "analytical-campaigns.sqlite3") {
    fail(
      "analytical-campaigns.sqlite3 is reserved for the explicit legacy " +
      "raw-artifact schema; choose a compact database filename.",
    );
  }
  return absolutePath;
}

export function migrateCompactAnalyticalCampaignDatabase(database) {
  const migrations = migrationFiles();
  for (const migration of migrations) {
    const checksum = sha256Bytes(Buffer.from(migration.sql));
    const existing = tableExists(database, "compact_schema_migration")
      ? database.prepare(`
          SELECT migration_ordinal, checksum_sha256, tool_version
          FROM compact_schema_migration WHERE migration_id = ?
        `).get(migration.name)
      : null;
    if (existing) {
      assertSame(existing, {
        migration_ordinal: migration.ordinal,
        checksum_sha256: checksum,
        tool_version: COMPACT_ANALYTICAL_DATABASE_TOOL_VERSION,
      }, `migration ${migration.name}`);
      continue;
    }
    database.exec("BEGIN IMMEDIATE");
    try {
      database.exec(migration.sql);
      database.prepare(`
        INSERT INTO compact_schema_migration(
          migration_id, migration_ordinal, checksum_sha256, tool_version
        ) VALUES (?, ?, ?, ?)
      `).run(
        migration.name,
        migration.ordinal,
        checksum,
        COMPACT_ANALYTICAL_DATABASE_TOOL_VERSION,
      );
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  return migrations.map((migration) => migration.name);
}

export function openCompactAnalyticalCampaignDatabase(
  databasePath = defaultCompactAnalyticalCampaignDatabasePath(),
  options = {},
) {
  const absolutePath = assertCompactAnalyticalCampaignDatabasePath(databasePath);
  const readOnly = options.readOnly === true;
  if (!readOnly) mkdirSync(path.dirname(absolutePath), { recursive: true });
  const database = new DatabaseSync(absolutePath, { readOnly });
  database.exec("PRAGMA foreign_keys = ON");
  database.exec("PRAGMA busy_timeout = 5000");
  if (!readOnly) {
    const journalMode = String(options.journalMode ?? "DELETE").toUpperCase();
    const synchronous = String(options.synchronous ?? "NORMAL").toUpperCase();
    if (!["DELETE", "WAL"].includes(journalMode)) {
      fail("compact journalMode must be DELETE or WAL.");
    }
    if (!["FULL", "NORMAL"].includes(synchronous)) {
      fail("compact synchronous must be FULL or NORMAL.");
    }
    const applied = String(
      database.prepare(`PRAGMA journal_mode = ${journalMode}`).get().journal_mode,
    ).toUpperCase();
    if (applied !== journalMode) {
      fail(`SQLite refused compact journal mode ${journalMode}; applied ${applied}.`);
    }
    database.exec(`PRAGMA synchronous = ${synchronous}`);
    if (options.migrate !== false) {
      migrateCompactAnalyticalCampaignDatabase(database);
    }
  }
  return database;
}

function validateCompactCase(row, campaign, outputOrdinal) {
  if (row?.schema !== COMPACT_MONTE_CARLO_CASE_SCHEMA) {
    fail(`unsupported compact case schema ${row?.schema}.`);
  }
  const rerun = row.exactRerunInstruction;
  if (!rerun || typeof rerun !== "object") {
    fail(`compact case ${row.caseId ?? outputOrdinal} lacks an exact rerun instruction.`);
  }
  const score = row.score ?? null;
  const scoreHash = row.scoreHash ?? null;
  const status = row.evaluationStatus ??
    (score?.status == null
      ? null
      : {
          code: score.status.code,
          evaluated: true,
          reasonCode: null,
        });
  if (!status || typeof status !== "object") {
    fail(
      `compact case ${row.caseId ?? outputOrdinal} lacks both an ` +
      "evaluationStatus and a scored evaluation status.",
    );
  }
  if (score === null && scoreHash !== null) {
    fail(`compact case ${row.caseId} has a score hash without a score.`);
  }
  if (score !== null && sha256(scoreHash, `${row.caseId}.scoreHash`) !==
      compactSha256Canonical(score)) {
    fail(`compact case ${row.caseId} score hash is invalid.`);
  }
  if (status.code === "drawn-not-evaluated") {
    if (status.evaluated !== false || score !== null || scoreHash !== null ||
        typeof status.reasonCode !== "string" || status.reasonCode.length === 0) {
      fail(
        `compact case ${row.caseId} must retain a null score and structured ` +
        "reason when drawn-not-evaluated.",
      );
    }
  } else if (status.evaluated !== true) {
    fail(`compact case ${row.caseId} has an unsupported evaluation status.`);
  }
  const caseIdentity = omitFields(row, [
    "caseHash",
    "executionIndex",
    "measuredCost",
  ]);
  if (sha256(row.caseHash, `${row.caseId}.caseHash`) !==
      compactSha256Canonical(caseIdentity)) {
    fail(`compact case ${row.caseId} case hash is invalid.`);
  }
  const implementationHash = rerun.implementationIdentity?.implementationHash ??
    campaign.implementationIdentity?.implementationHash;
  const protocolHash = sha256(rerun.protocolHash, `${row.caseId}.protocolHash`);
  if (protocolHash !== campaign.protocolHash) {
    fail(`compact case ${row.caseId} protocol hash differs from its campaign.`);
  }
  return {
    campaignHash: campaign.campaignHash,
    outputOrdinal,
    caseHash: row.caseHash,
    schemaId: row.schema,
    caseId: concreteString(row.caseId, `caseRows[${outputOrdinal}].caseId`),
    familyId: concreteString(row.familyId, `${row.caseId}.familyId`),
    memberId: concreteString(row.memberId, `${row.caseId}.memberId`),
    candidateId: concreteString(row.candidateId, `${row.caseId}.candidateId`),
    sampleOrdinal: nonnegativeInteger(
      row.sampleOrdinal,
      `${row.caseId}.sampleOrdinal`,
    ),
    sampledSpecHash: sha256(
      rerun.sampledSpecHash,
      `${row.caseId}.sampledSpecHash`,
    ),
    exactSourceHash: sha256(
      rerun.exactSourceHash,
      `${row.caseId}.exactSourceHash`,
    ),
    protocolHash,
    implementationHash: sha256(
      implementationHash,
      `${row.caseId}.implementationHash`,
    ),
    scoreHash,
    statusCode: concreteString(status.code, `${row.caseId}.status.code`),
    scoreStatusCode: score?.status?.code ?? null,
    evaluated: status.evaluated === true,
    passed: score?.status?.passed ?? null,
    reasonCode: status.reasonCode ?? null,
    wallSeconds: optionalFinite(
      row.measuredCost?.wallSeconds,
      `${row.caseId}.measuredCost.wallSeconds`,
    ),
    userCpuSeconds: optionalFinite(
      row.measuredCost?.userCpuSeconds,
      `${row.caseId}.measuredCost.userCpuSeconds`,
    ),
    systemCpuSeconds: optionalFinite(
      row.measuredCost?.systemCpuSeconds,
      `${row.caseId}.measuredCost.systemCpuSeconds`,
    ),
    retainedCaseBytes: row.measuredCost?.retainedCaseBytes == null
      ? null
      : nonnegativeInteger(
          row.measuredCost.retainedCaseBytes,
          `${row.caseId}.measuredCost.retainedCaseBytes`,
        ),
    scoreJson: score === null ? null : compactCanonicalJson(score),
    evaluationStatusJson: compactCanonicalJson(status),
    verificationReceiptJson:
      row.verificationReceipt == null && row.verificationReceipts == null
        ? null
        : compactCanonicalJson(
            row.verificationReceipts ?? row.verificationReceipt,
          ),
    rowJson: compactCanonicalJson(row),
    rowJsonSha256: sha256Bytes(Buffer.from(compactCanonicalJson(row))),
  };
}

export function validateCompactMonteCarloCampaign(campaign) {
  if (campaign?.schema !== COMPACT_MONTE_CARLO_CAMPAIGN_SCHEMA) {
    fail(`unsupported compact campaign schema ${campaign?.schema}.`);
  }
  if (!Array.isArray(campaign.caseRows)) {
    fail("compact campaign caseRows must be an array.");
  }
  const campaignIdentity = omitFields(campaign, [
    "campaignHash",
    "caseRows",
    "wallSeconds",
  ]);
  const campaignHash = sha256(campaign.campaignHash, "campaignHash");
  if (compactSha256Canonical(campaignIdentity) !== campaignHash) {
    fail("compact campaign hash is invalid.");
  }
  const protocolHash = sha256(campaign.protocolHash, "protocolHash");
  if (campaign.protocol != null &&
      compactSha256Canonical(campaign.protocol) !== protocolHash) {
    fail("compact campaign protocol hash is invalid.");
  }
  const caseCount = nonnegativeInteger(campaign.caseCount, "caseCount");
  if (caseCount !== campaign.caseRows.length ||
      !Array.isArray(campaign.cases) || campaign.cases.length !== caseCount) {
    fail("compact campaign case inventory is incomplete.");
  }
  const rows = campaign.caseRows.map((row, index) =>
    validateCompactCase(row, campaign, index));
  const caseIds = new Set(rows.map((row) => row.caseId));
  const caseHashes = new Set(rows.map((row) => row.caseHash));
  if (caseIds.size !== rows.length || caseHashes.size !== rows.length) {
    fail("compact campaign case IDs and hashes must be unique.");
  }
  for (const inventoryRow of campaign.cases) {
    const row = rows.find((candidate) => candidate.caseId === inventoryRow.caseId);
    if (!row || row.caseHash !== inventoryRow.caseHash ||
        row.scoreHash !== (inventoryRow.scoreHash ?? null)) {
      fail(`compact campaign inventory conflicts at ${inventoryRow.caseId}.`);
    }
  }
  const evaluatedCount = rows.filter((row) => row.evaluated).length;
  const notEvaluatedCount = rows.length - evaluatedCount;
  if (campaign.evaluationSummary != null) {
    const summary = campaign.evaluationSummary;
    if (summary.drawnCount !== rows.length ||
        summary.evaluatedCount !== evaluatedCount ||
        summary.notEvaluatedCount !== notEvaluatedCount) {
      fail("compact campaign evaluation summary conflicts with its case rows.");
    }
  }
  const header = omitFields(campaign, ["caseRows"]);
  return {
    campaign,
    header,
    headerJson: compactCanonicalJson(header),
    headerJsonSha256: sha256Bytes(Buffer.from(compactCanonicalJson(header))),
    rows,
    inventoryHash: compactSha256Canonical(rows.map((row) => ({
      outputOrdinal: row.outputOrdinal,
      caseId: row.caseId,
      caseHash: row.caseHash,
      scoreHash: row.scoreHash,
      rowJsonSha256: row.rowJsonSha256,
    }))),
    campaignRow: {
      campaignHash,
      schemaId: campaign.schema,
      campaignId: concreteString(campaign.campaignId, "campaignId"),
      protocolHash,
      implementationHash: sha256(
        campaign.implementationIdentity?.implementationHash,
        "implementationIdentity.implementationHash",
      ),
      claimGrade: concreteString(campaign.claimGrade, "claimGrade"),
      diagnosticOnly: campaign.claimBoundary?.diagnosticOnly === true,
      independentAcceptancePerformed:
        campaign.claimBoundary?.independentAcceptancePerformed === true,
      pathEvolutionInvoked:
        campaign.claimBoundary?.pathEvolutionInvoked === true,
      eomSolverInvoked: campaign.claimBoundary?.eomSolverInvoked === true,
      caseCount,
      drawnCount: rows.length,
      evaluatedCount,
      notEvaluatedCount,
    },
  };
}

function storedCampaign(database, campaignHash) {
  const header = database.prepare(`
    SELECT header_json FROM compact_campaign WHERE campaign_hash = ?
  `).get(campaignHash);
  if (!header) fail(`compact campaign ${campaignHash} was not found.`);
  const caseRows = database.prepare(`
    SELECT row_json FROM compact_case
    WHERE campaign_hash = ? ORDER BY output_ordinal
  `).all(campaignHash).map((row) => JSON.parse(row.row_json));
  return { ...JSON.parse(header.header_json), caseRows };
}

export function importCompactMonteCarloCampaign(databasePath, campaign, options = {}) {
  const validated = validateCompactMonteCarloCampaign(campaign);
  const database = openCompactAnalyticalCampaignDatabase(databasePath, options);
  let inserted = false;
  try {
    database.exec("BEGIN IMMEDIATE");
    const existing = database.prepare(`
      SELECT header_json_sha256 FROM compact_campaign WHERE campaign_hash = ?
    `).get(validated.campaignRow.campaignHash);
    if (existing) {
      if (existing.header_json_sha256 !== validated.headerJsonSha256) {
        fail("existing compact campaign header conflicts with the imported campaign.");
      }
      assertSame(
        storedCampaign(database, validated.campaignRow.campaignHash),
        campaign,
        `compact campaign ${validated.campaignRow.campaignHash}`,
      );
    } else {
      const row = validated.campaignRow;
      database.prepare(`
        INSERT INTO compact_campaign(
          campaign_hash, schema_id, campaign_id, protocol_hash,
          implementation_hash, claim_grade, diagnostic_only,
          independent_acceptance_performed, path_evolution_invoked,
          eom_solver_invoked, case_count, drawn_count, evaluated_count,
          not_evaluated_count, header_json_sha256, header_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        row.campaignHash,
        row.schemaId,
        row.campaignId,
        row.protocolHash,
        row.implementationHash,
        row.claimGrade,
        booleanInteger(row.diagnosticOnly),
        booleanInteger(row.independentAcceptancePerformed),
        booleanInteger(row.pathEvolutionInvoked),
        booleanInteger(row.eomSolverInvoked),
        row.caseCount,
        row.drawnCount,
        row.evaluatedCount,
        row.notEvaluatedCount,
        validated.headerJsonSha256,
        validated.headerJson,
      );
      const insertCase = database.prepare(`
        INSERT INTO compact_case(
          campaign_hash, output_ordinal, case_hash, schema_id, case_id,
          family_id, member_id, candidate_id, sample_ordinal,
          sampled_spec_hash, exact_source_hash, protocol_hash,
          implementation_hash, score_hash, status_code, evaluated, passed,
          score_status_code, reason_code, wall_seconds, user_cpu_seconds,
          system_cpu_seconds,
          retained_case_bytes, score_json, evaluation_status_json,
          verification_receipt_json, row_json_sha256, row_json
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?, ?
        )
      `);
      for (const caseRow of validated.rows) {
        insertCase.run(
          caseRow.campaignHash,
          caseRow.outputOrdinal,
          caseRow.caseHash,
          caseRow.schemaId,
          caseRow.caseId,
          caseRow.familyId,
          caseRow.memberId,
          caseRow.candidateId,
          caseRow.sampleOrdinal,
          caseRow.sampledSpecHash,
          caseRow.exactSourceHash,
          caseRow.protocolHash,
          caseRow.implementationHash,
          caseRow.scoreHash,
          caseRow.statusCode,
          booleanInteger(caseRow.evaluated),
          caseRow.passed == null ? null : booleanInteger(caseRow.passed),
          caseRow.scoreStatusCode,
          caseRow.reasonCode,
          caseRow.wallSeconds,
          caseRow.userCpuSeconds,
          caseRow.systemCpuSeconds,
          caseRow.retainedCaseBytes,
          caseRow.scoreJson,
          caseRow.evaluationStatusJson,
          caseRow.verificationReceiptJson,
          caseRow.rowJsonSha256,
          caseRow.rowJson,
        );
      }
      inserted = true;
    }
    database.exec("COMMIT");
  } catch (error) {
    if (database.isTransaction) database.exec("ROLLBACK");
    throw error;
  } finally {
    database.close();
  }
  return {
    schema: COMPACT_ANALYTICAL_DATABASE_SCHEMA,
    databasePath: path.resolve(databasePath),
    campaignHash: validated.campaignRow.campaignHash,
    caseCount: validated.rows.length,
    evaluatedCount: validated.campaignRow.evaluatedCount,
    notEvaluatedCount: validated.campaignRow.notEvaluatedCount,
    inventoryHash: validated.inventoryHash,
    inserted,
    transactionCount: 1,
    insertStatementCount: inserted ? 1 + validated.rows.length : 0,
    journalMode: String(options.journalMode ?? "DELETE").toUpperCase(),
    synchronous: String(options.synchronous ?? "NORMAL").toUpperCase(),
  };
}

function assertCompactSchemaBoundary(database) {
  const tables = database.prepare(`
    SELECT name FROM sqlite_schema
    WHERE type = 'table' AND name NOT LIKE 'sqlite_%'
    ORDER BY name
  `).all().map((row) => row.name);
  for (const tableName of tables) {
    if (LEGACY_TABLES.has(tableName)) {
      fail(`compact control plane contains prohibited legacy table ${tableName}.`);
    }
    const blobColumn = database.prepare(`PRAGMA table_info("${tableName}")`)
      .all()
      .find((column) => String(column.type).toUpperCase().includes("BLOB"));
    if (blobColumn) {
      fail(
        `compact control plane contains prohibited BLOB column ` +
        `${tableName}.${blobColumn.name}.`,
      );
    }
  }
  return tables;
}

export function verifyCompactAnalyticalCampaignDatabase(databasePath, options = {}) {
  const database = openCompactAnalyticalCampaignDatabase(databasePath, {
    ...options,
    readOnly: true,
    migrate: false,
  });
  try {
    const integrity = database.prepare("PRAGMA integrity_check").get()
      .integrity_check;
    if (integrity !== "ok") fail(`compact SQLite integrity check failed: ${integrity}`);
    const foreignKeyViolations = database.prepare("PRAGMA foreign_key_check").all();
    if (foreignKeyViolations.length !== 0) {
      fail("compact SQLite foreign-key check failed.");
    }
    const tables = assertCompactSchemaBoundary(database);
    const hashes = options.campaignHash
      ? [{ campaign_hash: options.campaignHash }]
      : database.prepare(`
          SELECT campaign_hash FROM compact_campaign ORDER BY campaign_hash
        `).all();
    const campaigns = hashes.map(({ campaign_hash: campaignHash }) => {
      const campaign = storedCampaign(database, campaignHash);
      const validated = validateCompactMonteCarloCampaign(campaign);
      return {
        campaignHash,
        campaignId: campaign.campaignId,
        caseCount: validated.rows.length,
        evaluatedCount: validated.rows.filter((row) => row.evaluated).length,
        notEvaluatedCount: validated.rows.filter((row) => !row.evaluated).length,
        inventoryHash: validated.inventoryHash,
      };
    });
    return {
      schema: COMPACT_ANALYTICAL_DATABASE_SCHEMA,
      databasePath: path.resolve(databasePath),
      integrity,
      foreignKeyViolationCount: 0,
      campaignCount: campaigns.length,
      caseCount: campaigns.reduce((sum, row) => sum + row.caseCount, 0),
      tables,
      prohibitedBlobColumnCount: 0,
      journalMode: String(
        database.prepare("PRAGMA journal_mode").get().journal_mode,
      ).toUpperCase(),
      campaigns,
    };
  } finally {
    database.close();
  }
}

export function inspectCompactAnalyticalCampaignDatabase(databasePath) {
  const verification = verifyCompactAnalyticalCampaignDatabase(databasePath);
  return {
    ...verification,
    databaseBytes: fileBytes(databasePath),
    walBytes: fileBytes(`${databasePath}-wal`),
    sharedMemoryBytes: fileBytes(`${databasePath}-shm`),
  };
}

export function queryCompactAnalyticalCampaignCases(databasePath, options = {}) {
  const database = openCompactAnalyticalCampaignDatabase(databasePath, {
    readOnly: true,
    migrate: false,
  });
  try {
    const clauses = [];
    const parameters = [];
    const mappings = [
      ["campaignHash", "campaign_hash"],
      ["caseId", "case_id"],
      ["familyId", "family_id"],
      ["memberId", "member_id"],
      ["statusCode", "status_code"],
      ["scoreStatusCode", "score_status_code"],
      ["reasonCode", "reason_code"],
      ["scoreHash", "score_hash"],
      ["exactSourceHash", "exact_source_hash"],
    ];
    for (const [optionName, columnName] of mappings) {
      if (options[optionName] != null) {
        clauses.push(`${columnName} = ?`);
        parameters.push(options[optionName]);
      }
    }
    const limit = options.limit == null
      ? 100
      : Math.min(10_000, nonnegativeInteger(options.limit, "limit"));
    const where = clauses.length === 0 ? "" : `WHERE ${clauses.join(" AND ")}`;
    return database.prepare(`
      SELECT row_json FROM compact_case
      ${where}
      ORDER BY campaign_hash, output_ordinal
      LIMIT ?
    `).all(...parameters, limit).map((row) => JSON.parse(row.row_json));
  } finally {
    database.close();
  }
}

export function exportCompactMonteCarloCampaign(databasePath, options = {}) {
  const campaignHash = sha256(options.campaignHash, "campaignHash");
  const database = openCompactAnalyticalCampaignDatabase(databasePath, {
    readOnly: true,
    migrate: false,
  });
  let campaign;
  try {
    campaign = storedCampaign(database, campaignHash);
  } finally {
    database.close();
  }
  const validated = validateCompactMonteCarloCampaign(campaign);
  const bytes = Buffer.from(
    `${JSON.stringify(canonicalize(campaign), null, 2)}\n`,
  );
  if (options.outputPath) {
    const outputPath = path.resolve(options.outputPath);
    mkdirSync(path.dirname(outputPath), { recursive: true });
    const temporaryPath = `${outputPath}.${process.pid}.tmp`;
    writeFileSync(temporaryPath, bytes);
    renameSync(temporaryPath, outputPath);
  }
  return {
    schema: COMPACT_ANALYTICAL_DATABASE_SCHEMA,
    databasePath: path.resolve(databasePath),
    campaignHash,
    caseCount: validated.rows.length,
    inventoryHash: validated.inventoryHash,
    outputPath: options.outputPath ? path.resolve(options.outputPath) : null,
    outputBytes: bytes.length,
    outputSha256: sha256Bytes(bytes),
    campaign,
  };
}
