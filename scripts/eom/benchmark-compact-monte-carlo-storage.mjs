#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { gzipSync, gunzipSync } from "node:zlib";
import {
  compactCanonicalJson,
  importCompactMonteCarloCampaign,
  openCompactAnalyticalCampaignDatabase,
  verifyCompactAnalyticalCampaignDatabase,
} from "../../src/prescribed-path-analysis/database/CompactAnalyticalCampaignDatabase.mjs";

const DEFAULT_INPUT =
  ".local-data/braid-analysis/performance/compact-monte-carlo-exact-configuration-coverage-v4.json";
const DEFAULT_OUTPUT =
  ".local-data/braid-analysis/performance/compact-monte-carlo-storage-v2.json";

function parsePositiveInteger(value, name) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(`${name} must be a non-negative integer`);
  }
  return parsed;
}

function parseArgs(argv) {
  const options = {
    input: DEFAULT_INPUT,
    output: DEFAULT_OUTPUT,
    warmups: 1,
    repetitions: 3,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--input") {
      options.input = argv[++index];
    } else if (argument === "--output") {
      options.output = argv[++index];
    } else if (argument === "--warmups") {
      options.warmups = parsePositiveInteger(argv[++index], "--warmups");
    } else if (argument === "--repetitions") {
      options.repetitions = parsePositiveInteger(
        argv[++index],
        "--repetitions",
      );
    } else if (argument === "--help") {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }

  if (options.repetitions < 1) {
    throw new Error("--repetitions must be at least 1");
  }
  return options;
}

function usage() {
  return [
    "Usage:",
    "  node scripts/eom/benchmark-compact-monte-carlo-storage.mjs [options]",
    "",
    "Options:",
    `  --input <path>        compact campaign JSON (default: ${DEFAULT_INPUT})`,
    `  --output <path>       benchmark report (default: ${DEFAULT_OUTPUT})`,
    "  --warmups <count>     warm-up repetitions (default: 1)",
    "  --repetitions <count> measured repetitions (default: 3)",
  ].join("\n");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function canonicalCaseInventory(campaign) {
  return campaign.caseRows
    .map((row) => ({
      caseId: row.caseId,
      assemblyId: row.assemblyId,
      modelRevisionSha256: row.modelRevisionSha256,
      sourceSlug: row.sourceSlug,
      candidateId: row.candidateId,
      sampleOrdinal: row.sampleOrdinal,
      sampledSpecHash: row.exactRerunInstruction.sampledSpecHash,
      exactSourceHash: row.exactRerunInstruction.exactSourceHash,
      protocolHash: row.exactRerunInstruction.protocolHash,
      scoreHash: row.scoreHash,
      caseHash: row.caseHash,
      statusCode: row.evaluationStatus?.code ?? row.score?.status?.code,
      passed: row.score?.status?.passed ?? null,
      rowJsonSha256: sha256(compactCanonicalJson(row)),
    }))
    .sort((left, right) => left.caseId.localeCompare(right.caseId));
}

function inventoryHash(inventory) {
  return sha256(JSON.stringify(inventory));
}

function campaignHeader(campaign) {
  const { caseRows: _caseRows, cases: _cases, ...header } = campaign;
  return header;
}

function fileBytes(path) {
  try {
    return statSync(path).size;
  } catch {
    return 0;
  }
}

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function median(values) {
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
}

function summarize(runs) {
  const wall = runs.map((run) => run.wallSeconds);
  const cpu = runs.map((run) => run.cpuSeconds);
  const stored = runs.map((run) => run.storedBytes);
  return {
    repetitions: runs.length,
    wallSeconds: {
      median: median(wall),
      minimum: Math.min(...wall),
      maximum: Math.max(...wall),
      individual: wall,
    },
    cpuSeconds: {
      median: median(cpu),
      minimum: Math.min(...cpu),
      maximum: Math.max(...cpu),
      individual: cpu,
    },
    storedBytes: {
      median: median(stored),
      minimum: Math.min(...stored),
      maximum: Math.max(...stored),
      individual: stored,
    },
    queryMicroseconds: Object.fromEntries(
      Object.keys(runs[0].queryMicroseconds).map((queryName) => [
        queryName,
        median(runs.map((run) => run.queryMicroseconds[queryName])),
      ]),
    ),
  };
}

function queryMedianMicroseconds(runQuery, iterations = 1_000) {
  const values = [];
  for (let iteration = 0; iteration < iterations; iteration += 1) {
    const started = performance.now();
    runQuery(iteration);
    values.push((performance.now() - started) * 1_000);
  }
  return median(values);
}

function writeSqlite({ campaign, inventory, runDirectory }) {
  const databasePath = resolve(runDirectory, "compact.sqlite3");
  const imported = importCompactMonteCarloCampaign(databasePath, campaign);
  const walBytesAtCommit = fileBytes(`${databasePath}-wal`);
  const verification = verifyCompactAnalyticalCampaignDatabase(databasePath);
  const database = openCompactAnalyticalCampaignDatabase(databasePath, {
    readOnly: true,
    migrate: false,
  });
  const storedInventory = database
    .prepare(`
      SELECT case_id AS caseId, assembly_id AS assemblyId,
             model_revision_sha256 AS modelRevisionSha256,
             source_slug AS sourceSlug, candidate_id AS candidateId,
             sample_ordinal AS sampleOrdinal,
             sampled_spec_hash AS sampledSpecHash,
             exact_source_hash AS exactSourceHash, protocol_hash AS protocolHash,
             score_hash AS scoreHash, case_hash AS caseHash,
             status_code AS statusCode, passed, row_json_sha256 AS rowJsonSha256
      FROM compact_case ORDER BY case_id
    `)
    .all()
    .map((row) => ({
      ...row,
      passed: row.passed === null ? null : row.passed === 1,
    }));

  const queries = {
    caseById: database.prepare(
      "SELECT row_json FROM compact_case WHERE case_id = ?",
    ),
    configurationSamples: database.prepare(
      `SELECT case_hash FROM compact_case
       WHERE assembly_id = ? AND model_revision_sha256 = ?
         AND source_slug = ? ORDER BY sample_ordinal`,
    ),
    statusCases: database.prepare(
      `SELECT case_hash FROM compact_case
       WHERE status_code = ?
       ORDER BY assembly_id, model_revision_sha256, source_slug`,
    ),
  };
  const queryMicroseconds = {
    caseById: queryMedianMicroseconds((iteration) =>
      queries.caseById.get(inventory[iteration % inventory.length].caseId),
    ),
    configurationSamples: queryMedianMicroseconds(() =>
      queries.configurationSamples.all(
        inventory[0].assemblyId,
        inventory[0].modelRevisionSha256,
        inventory[0].sourceSlug,
      ),
    ),
    statusCases: queryMedianMicroseconds(() =>
      queries.statusCases.all(inventory[0].statusCode),
    ),
  };

  database.close();

  return {
    storedBytes: fileBytes(databasePath),
    walBytesAtCommit,
    inventory: storedInventory,
    queryMicroseconds,
    verification: {
      integrity: verification.integrity,
      foreignKeyViolationCount: verification.foreignKeyViolationCount,
      prohibitedBlobColumnCount: verification.prohibitedBlobColumnCount,
      journalMode: verification.journalMode,
      transactionCount: imported.transactionCount,
      insertStatementCount: imported.insertStatementCount,
    },
  };
}

function writeGzipNdjson({ campaign, inventory, runDirectory }) {
  const path = resolve(runDirectory, "compact.ndjson.gz");
  const rowsById = new Map(campaign.caseRows.map((row) => [row.caseId, row]));
  const records = [
    JSON.stringify({ type: "campaign", value: campaignHeader(campaign) }),
    ...inventory.map((item) =>
      JSON.stringify({ type: "case", value: rowsById.get(item.caseId) }),
    ),
  ];
  writeFileSync(path, gzipSync(Buffer.from(`${records.join("\n")}\n`), {
    level: 6,
    mtime: 0,
  }));

  const decoded = gunzipSync(readFileSync(path))
    .toString("utf8")
    .trimEnd()
    .split("\n")
    .map((line) => JSON.parse(line));
  const restoredCampaign = decoded[0].value;
  const restoredRows = decoded.slice(1).map((record) => record.value);
  const restoredInventory = canonicalCaseInventory({
    ...restoredCampaign,
    caseRows: restoredRows,
  });
  const rowsByCaseId = new Map(restoredRows.map((row) => [row.caseId, row]));
  const queryMicroseconds = {
    caseById: queryMedianMicroseconds((iteration) =>
      rowsByCaseId.get(inventory[iteration % inventory.length].caseId),
    ),
    configurationSamples: queryMedianMicroseconds(() =>
      restoredRows.filter(
        (row) =>
          row.assemblyId === inventory[0].assemblyId &&
          row.modelRevisionSha256 === inventory[0].modelRevisionSha256 &&
          row.sourceSlug === inventory[0].sourceSlug,
      ),
    ),
    statusCases: queryMedianMicroseconds(() =>
      restoredRows.filter(
        (row) => (row.evaluationStatus?.code ?? row.score?.status?.code) ===
          inventory[0].statusCode,
      ),
    ),
  };
  return {
    storedBytes: fileBytes(path),
    walBytesAtCommit: 0,
    inventory: restoredInventory,
    queryMicroseconds,
    verification: {
      gzipSha256: sha256(readFileSync(path)),
      recordCount: decoded.length,
    },
  };
}

function writeGzipCsv({ campaign, inventory, runDirectory }) {
  const path = resolve(runDirectory, "compact.csv.gz");
  const rowsById = new Map(campaign.caseRows.map((row) => [row.caseId, row]));
  const header = [
    "case_id",
    "assembly_id",
    "model_revision_sha256",
    "source_slug",
    "candidate_id",
    "sample_ordinal",
    "case_hash",
    "score_hash",
    "status_code",
    "row_json_base64",
  ];
  const lines = [
    header.map(csvCell).join(","),
    ...inventory.map((item) =>
      [
        item.caseId,
        item.assemblyId,
        item.modelRevisionSha256,
        item.sourceSlug,
        item.candidateId,
        item.sampleOrdinal,
        item.caseHash,
        item.scoreHash,
        item.statusCode,
        Buffer.from(JSON.stringify(rowsById.get(item.caseId))).toString(
          "base64",
        ),
      ]
        .map(csvCell)
        .join(","),
    ),
  ];
  writeFileSync(path, gzipSync(Buffer.from(`${lines.join("\n")}\n`), {
    level: 6,
    mtime: 0,
  }));

  // The CSV is exact only because every complete typed row is embedded as
  // base64 JSON. This is also the measured portability cost of retaining types
  // and nested structures in a nominally flat format.
  const decodedLines = gunzipSync(readFileSync(path))
    .toString("utf8")
    .trimEnd()
    .split("\n");
  const restoredRows = decodedLines.slice(1).map((line) => {
    const encoded = line.split('","').at(-1).slice(0, -1);
    return JSON.parse(Buffer.from(encoded, "base64").toString("utf8"));
  });
  const restoredInventory = canonicalCaseInventory({
    ...campaignHeader(campaign),
    caseRows: restoredRows,
  });
  const queryMicroseconds = {
    caseById: queryMedianMicroseconds((iteration) =>
      restoredRows.find(
        (row) => row.caseId === inventory[iteration % inventory.length].caseId,
      ),
    ),
    configurationSamples: queryMedianMicroseconds(() =>
      restoredRows.filter(
        (row) =>
          row.assemblyId === inventory[0].assemblyId &&
          row.modelRevisionSha256 === inventory[0].modelRevisionSha256 &&
          row.sourceSlug === inventory[0].sourceSlug,
      ),
    ),
    statusCases: queryMedianMicroseconds(() =>
      restoredRows.filter(
        (row) => (row.evaluationStatus?.code ?? row.score?.status?.code) ===
          inventory[0].statusCode,
      ),
    ),
  };
  return {
    storedBytes: fileBytes(path),
    walBytesAtCommit: 0,
    inventory: restoredInventory,
    queryMicroseconds,
    verification: {
      gzipSha256: sha256(readFileSync(path)),
      rowCount: restoredRows.length,
      exactTypesPreservedByEmbeddedJson: true,
    },
  };
}

function measuredRun({ variant, campaign, inventory, rootDirectory, label }) {
  const runDirectory = resolve(rootDirectory, `${variant.id}-${label}`);
  mkdirSync(runDirectory, { recursive: true });
  const cpuStart = process.cpuUsage();
  const wallStart = performance.now();
  const result = variant.run({ campaign, inventory, runDirectory });
  const wallSeconds = (performance.now() - wallStart) / 1_000;
  const cpu = process.cpuUsage(cpuStart);
  const cpuSeconds = (cpu.user + cpu.system) / 1_000_000;
  const actualInventoryHash = inventoryHash(result.inventory);
  const expectedInventoryHash = inventoryHash(inventory);
  if (actualInventoryHash !== expectedInventoryHash) {
    throw new Error(
      `${variant.id} changed logical inventory: ` +
        `${actualInventoryHash} != ${expectedInventoryHash}`,
    );
  }
  return {
    label,
    wallSeconds,
    cpuSeconds,
    storedBytes: result.storedBytes,
    walBytesAtCommit: result.walBytesAtCommit,
    queryMicroseconds: result.queryMicroseconds,
    verification: result.verification,
    inventoryHash: actualInventoryHash,
  };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }

  const inputPath = resolve(options.input);
  const outputPath = resolve(options.output);
  const inputBytes = readFileSync(inputPath);
  const campaign = JSON.parse(inputBytes);
  if (
    campaign.schema !== "prescribed-path-analysis/compact-monte-carlo-campaign.v2"
  ) {
    throw new Error(`Unsupported compact campaign schema: ${campaign.schema}`);
  }
  if (!Array.isArray(campaign.caseRows) || campaign.caseRows.length < 1) {
    throw new Error("Compact campaign contains no caseRows");
  }
  const inventory = canonicalCaseInventory(campaign);
  const expectedInventoryHash = inventoryHash(inventory);
  const rootDirectory = mkdtempSync(
    resolve(tmpdir(), "architrino-compact-storage-"),
  );
  const variants = [
    { id: "sqlite-control-plane", run: writeSqlite },
    { id: "gzip-ndjson", run: writeGzipNdjson },
    { id: "gzip-csv-with-json", run: writeGzipCsv },
  ];
  const report = {
    schema: "architrino/compact-monte-carlo-storage-benchmark.v2",
    startedAt: new Date().toISOString(),
    sourceBoundary: {
      productionDatabaseRead: false,
      productionDatabaseWritten: false,
      inputPath,
      inputSha256: sha256(inputBytes),
      inputBytes: inputBytes.length,
      campaignHash: campaign.campaignHash,
      caseCount: campaign.caseRows.length,
      logicalInventoryHash: expectedInventoryHash,
      independentAcceptancePerformed: false,
      evidenceDisposition: "diagnostic-only",
    },
    runtimeContext: {
      runtime: process.version,
      platform: process.platform,
      architecture: process.arch,
    },
    warmups: options.warmups,
    repetitions: options.repetitions,
    variants: [],
  };

  try {
    let completed = 0;
    const total = variants.length * (options.warmups + options.repetitions);
    for (const variant of variants) {
      for (let warmup = 1; warmup <= options.warmups; warmup += 1) {
        measuredRun({
          variant,
          campaign,
          inventory,
          rootDirectory,
          label: `warmup-${warmup}`,
        });
        completed += 1;
        process.stderr.write(
          `[heartbeat] phase=compact-storage variant=${variant.id} ` +
            `repetition=warmup-${warmup} completed=${completed}/${total} ` +
            `output=${outputPath}\n`,
        );
      }
      const runs = [];
      for (
        let repetition = 1;
        repetition <= options.repetitions;
        repetition += 1
      ) {
        runs.push(
          measuredRun({
            variant,
            campaign,
            inventory,
            rootDirectory,
            label: `run-${repetition}`,
          }),
        );
        completed += 1;
        process.stderr.write(
          `[heartbeat] phase=compact-storage variant=${variant.id} ` +
            `repetition=${repetition} completed=${completed}/${total} ` +
            `output=${outputPath}\n`,
        );
      }
      report.variants.push({
        id: variant.id,
        summary: summarize(runs),
        runs,
      });
    }
  } finally {
    rmSync(rootDirectory, { recursive: true, force: true });
  }

  report.completedAt = new Date().toISOString();
  report.equivalence = {
    logicalInventoryHash: expectedInventoryHash,
    identicalAcrossVariantsAndRepetitions: report.variants.every((variant) =>
      variant.runs.every(
        (run) => run.inventoryHash === expectedInventoryHash,
      ),
    ),
  };
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  process.stdout.write(
    `${JSON.stringify(
      {
        outputPath,
        logicalInventoryHash: expectedInventoryHash,
        equivalence: report.equivalence,
        variants: report.variants.map((variant) => ({
          id: variant.id,
          wallSeconds: variant.summary.wallSeconds,
          storedBytes: variant.summary.storedBytes,
          queryMicroseconds: variant.summary.queryMicroseconds,
        })),
      },
      null,
      2,
    )}\n`,
  );
}

main();
