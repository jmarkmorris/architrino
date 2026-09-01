#!/usr/bin/env node

import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { once } from "node:events";
import os from "node:os";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";
import { createGzip, gunzipSync, gzipSync } from "node:zlib";
import {
  isMainThread,
  parentPort,
  Worker,
  workerData,
} from "node:worker_threads";

import {
  defaultAnalyticalCampaignDatabasePath,
} from "../../src/prescribed-path-analysis/database/AnalyticalCampaignDatabase.mjs";
import {
  DEFAULT_ALL_CANDIDATE_CAMPAIGN_REGISTRY_PATH,
  loadAllCandidateCampaignRegistry,
} from "../../src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs";
import {
  evaluateCompleteCycleCandidate,
} from "../../src/prescribed-path-analysis/CompleteCycleAnalyticalCampaign.mjs";
import {
  validateExactPrescribedSourceRecord,
} from "../../src/prescribed-path-analysis/ExactPrescribedSourceWake.mjs";
import {
  createPrescribedBraidExactSourceRecord,
} from "./generate-prescribed-braid-record.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const REPORT_SCHEMA =
  "prescribed-record-analytics/analytical-campaign-pipeline-benchmark.v1";
const HARNESS_VERSION =
  "prescribed-record-analytics/analytical-campaign-pipeline-benchmark.v2";
const DEFAULT_WORK_ROOT =
  "/private/tmp/architrino-analytical-campaign-pipeline-benchmarks";
const REPOSITORY_ROOT = path.resolve(import.meta.dirname, "../..");
const COMPUTE_IMPLEMENTATION_FILES = Object.freeze([
  "scripts/eom/benchmark-analytical-campaign-pipeline.mjs",
  "scripts/eom/generate-prescribed-braid-record.mjs",
  "src/apps/borg/BorgAssemblyRecordCatalog.js",
  "src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs",
  "src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs",
  "src/prescribed-path-analysis/CoincidentAxisThreeBinaryCompleteCycleProbeProtocol.mjs",
  "src/prescribed-path-analysis/CoincidentAxisThreeBinaryStreamingReductions.mjs",
  "src/prescribed-path-analysis/CompleteCycleAnalyticalCampaign.mjs",
  "src/prescribed-path-analysis/ExactPrescribedSourceWake.mjs",
  "src/prescribed-path-analysis/PrescribedOrbitCausalRoots.mjs",
]);

const FIXTURE_LIMITS = Object.freeze({
  small: { rawArtifacts: 64, measures: 4_000 },
  medium: { rawArtifacts: 512, measures: 40_000 },
  "representative-large": { rawArtifacts: 2_048, measures: 160_000 },
  full: { rawArtifacts: Number.POSITIVE_INFINITY, measures: Number.POSITIVE_INFINITY },
});

const VARIANTS = Object.freeze({
  current: {
    description:
      "Current data-plane behavior: prepared statement reconstruction per row, gzip decode/raw-hash/re-encode/byte-compare, indexes maintained during load, WAL, synchronous FULL.",
    prepareMode: "per-row",
    compressionMode: "recompress",
    indexMode: "during-load",
    transactionRows: Number.POSITIVE_INFINITY,
    journalMode: "WAL",
    synchronous: "FULL",
    foreignKeys: "immediate",
    cacheSize: -2_000,
    mmapSize: 0,
    tempStore: "DEFAULT",
    externalArtifacts: false,
    artifactTableMode: "without-rowid",
    pageSize: 4_096,
    singleTransaction: false,
    measureInsertMode: "single-row",
    measureStaging: false,
    extraMetricOrderIndex: false,
  },
  prepared: {
    description: "Current behavior with persistent prepared statements.",
    base: "current",
    prepareMode: "persistent",
  },
  "direct-compressed": {
    description:
      "Current behavior without recompression: verify compressed hash, decompress once, verify raw hash, and retain the exact supplied gzip bytes.",
    base: "current",
    compressionMode: "verify-existing",
  },
  "post-index": {
    description: "Current behavior with nonessential indexes created after the load.",
    base: "current",
    indexMode: "after-load",
  },
  "metric-order-index": {
    description:
      "Current behavior plus a measure_id/scalar_value/result_hash index for ordered metric-distribution queries.",
    base: "current",
    extraMetricOrderIndex: true,
  },
  "bounded-32": {
    description: "Current behavior with commits every 32 data rows.",
    base: "current",
    transactionRows: 32,
  },
  "bounded-512": {
    description: "Current behavior with commits every 512 data rows.",
    base: "current",
    transactionRows: 512,
  },
  "direct-bounded-512": {
    description:
      "Verified supplied gzip bytes with commits every 512 data rows; differs from direct-compressed only in the transaction bound.",
    base: "direct-compressed",
    transactionRows: 512,
  },
  "direct-raw-bounded-512": {
    description:
      "Verified supplied gzip bytes with commits every 512 raw-artifact rows while normalized measures and gates retain their current transaction envelopes.",
    base: "direct-compressed",
    rawTransactionRows: 512,
  },
  "rollback-journal": {
    description: "Current behavior using rollback journal instead of WAL.",
    base: "current",
    journalMode: "DELETE",
  },
  "journal-off": {
    description:
      "Disposable-sandbox test with SQLite rollback journaling disabled; final logical and integrity verification remain mandatory.",
    base: "current",
    journalMode: "OFF",
    durabilityBoundary: "disposable-staging-only",
  },
  "synchronous-normal": {
    description: "Disposable-sandbox test of WAL plus synchronous NORMAL.",
    base: "current",
    synchronous: "NORMAL",
    durabilityBoundary: "sandbox-only",
  },
  "synchronous-off": {
    description:
      "Disposable-sandbox test with SQLite filesystem synchronization disabled during load.",
    base: "current",
    synchronous: "OFF",
    durabilityBoundary: "disposable-staging-only",
  },
  "disposable-fast": {
    description:
      "Interaction test with both rollback journaling and filesystem synchronization disabled during disposable staging.",
    base: "current",
    journalMode: "OFF",
    synchronous: "OFF",
    durabilityBoundary: "disposable-staging-only",
  },
  "direct-bounded-disposable": {
    description:
      "Verified supplied gzip bytes, 512-row commits, and journaling/synchronization disabled in a disposable staging database.",
    base: "direct-bounded-512",
    journalMode: "OFF",
    synchronous: "OFF",
    durabilityBoundary: "disposable-staging-only",
  },
  "direct-raw-bounded-disposable": {
    description:
      "Verified supplied gzip bytes, 512-row raw-artifact commits, and journaling/synchronization disabled in disposable staging; normalized rows retain current transaction envelopes.",
    base: "direct-raw-bounded-512",
    journalMode: "OFF",
    synchronous: "OFF",
    durabilityBoundary: "disposable-staging-only",
  },
  "direct-bounded-journal-off": {
    description:
      "Verified supplied gzip bytes and 512-row commits with only rollback journaling disabled.",
    base: "direct-bounded-512",
    journalMode: "OFF",
    durabilityBoundary: "disposable-staging-only",
  },
  "direct-raw-bounded-journal-off": {
    description:
      "Verified supplied gzip bytes and 512-row raw-artifact commits with only rollback journaling disabled.",
    base: "direct-raw-bounded-512",
    journalMode: "OFF",
    durabilityBoundary: "disposable-staging-only",
  },
  "direct-bounded-synchronous-off": {
    description:
      "Verified supplied gzip bytes and 512-row commits with only filesystem synchronization disabled.",
    base: "direct-bounded-512",
    synchronous: "OFF",
    durabilityBoundary: "disposable-staging-only",
  },
  "direct-raw-bounded-synchronous-off": {
    description:
      "Verified supplied gzip bytes and 512-row raw-artifact commits with only filesystem synchronization disabled.",
    base: "direct-raw-bounded-512",
    synchronous: "OFF",
    durabilityBoundary: "disposable-staging-only",
  },
  "deferred-foreign-keys": {
    description:
      "Foreign-key enforcement disabled during load, followed by mandatory foreign_key_check.",
    base: "current",
    foreignKeys: "deferred-check",
  },
  "larger-cache": {
    description: "Current behavior with a 256 MiB page cache.",
    base: "current",
    cacheSize: -262_144,
  },
  "memory-temp": {
    description: "Current behavior with SQLite temporary storage in memory.",
    base: "current",
    tempStore: "MEMORY",
  },
  "larger-cache-memory-temp": {
    description:
      "Interaction test combining the individually measured larger-cache and memory-temp settings.",
    base: "larger-cache",
    tempStore: "MEMORY",
  },
  "mmap-256mb": {
    description: "Current behavior with a 256 MiB SQLite memory map.",
    base: "current",
    mmapSize: 268_435_456,
  },
  "page-size-8192": {
    description: "Current behavior with an 8 KiB SQLite database page.",
    base: "current",
    pageSize: 8_192,
  },
  "artifact-rowid": {
    description:
      "SQLite-resident payloads stored in a rowid table with a separate skinny UNIQUE artifact-hash index instead of a payload-bearing WITHOUT ROWID primary B-tree.",
    base: "current",
    artifactTableMode: "rowid",
  },
  "direct-artifact-rowid": {
    description:
      "Verified supplied gzip bytes in a rowid payload table with a separate skinny UNIQUE artifact-hash index.",
    base: "direct-compressed",
    artifactTableMode: "rowid",
  },
  "single-transaction": {
    description:
      "Raw packets, multidimensional measures, and validity gates loaded in one transaction.",
    base: "current",
    singleTransaction: true,
  },
  "multi-row-64": {
    description:
      "Multidimensional measures loaded with 64 logical rows per SQL INSERT.",
    base: "current",
    measureInsertMode: "multi-row-64",
  },
  "measure-staging": {
    description:
      "Multidimensional measures loaded into an unindexed staging table and transferred to the indexed target in one ordered SQL statement.",
    base: "current",
    measureStaging: true,
  },
  "sqlite-cli-measure-staging": {
    description:
      "Multidimensional measures encoded as CSV, loaded with SQLite CLI .import into a staging table, then transferred into the strict indexed target.",
    base: "current",
    measureStaging: true,
    measureInsertMode: "sqlite-cli-csv",
  },
  "external-artifacts": {
    description:
      "Verified immutable gzip packets stored externally by compressed hash; SQLite retains artifact identity, metadata, normalized measures, and validity gates.",
    base: "direct-compressed",
    externalArtifacts: true,
  },
  "metadata-only-recomputable": {
    description:
      "Verified raw packets are treated as a disposable derivable cache; SQLite retains identities, raw-artifact inventory metadata, normalized measures, and validity gates but no payload bytes.",
    base: "direct-compressed",
    externalArtifacts: true,
    retainExternalPayloads: false,
    durabilityBoundary: "replay-recipe-contract-required",
  },
  "compressed-hash-only-unsafe": {
    description:
      "Sandbox-only lower bound that verifies compressed bytes but skips decompression and raw-hash verification.",
    base: "direct-compressed",
    compressionMode: "compressed-hash-only",
    durabilityBoundary: "unsafe-lower-bound-only",
  },
});

const RAW_SELECT_SQL = `
  SELECT lower(hex(r.compressed_hash)) AS compressed_hash,
         lower(hex(r.raw_hash)) AS raw_hash,
         lower(hex(r.artifact_hash)) AS artifact_hash,
         r.manifest_hash, r.candidate_id, r.artifact_kind, r.relative_path,
         r.enclosing_radius, r.resolution, r.time_sample,
         r.sensitivity_coordinate, r.stencil, r.raw_bytes, r.stored_bytes,
         r.context_json, a.media_type, a.codec, a.payload, a.created_by
  FROM analytical_raw_artifact AS r
  JOIN artifact AS a USING (artifact_hash)
  WHERE r.compressed_hash = ?
`;

const MEASURE_COLUMNS = Object.freeze([
  "row_hash",
  "result_hash",
  "measure_id",
  "reduction_version",
  "disposition",
  "scalar_value",
  "unit",
  "probe_id",
  "probe_polarity",
  "enclosing_radius",
  "resolution",
  "time_sample",
  "temporal_harmonic",
  "angular_degree",
  "angular_order",
  "transmitter_id",
  "root_ordinal",
  "sensitivity_coordinate",
  "stencil",
  "real_part",
  "imaginary_part",
  "magnitude",
  "normalization",
  "coefficient_floor",
  "numerical_uncertainty",
  "details_json",
]);

const MEASURE_SELECT_SQL = `
  SELECT ${MEASURE_COLUMNS.map((column) =>
    column.endsWith("_hash")
      ? `lower(hex(${column})) AS ${column}`
      : column).join(", ")}
  FROM multidimensional_measure
  ORDER BY row_hash
`;

const ARTIFACT_INSERT_SQL = `
  INSERT INTO artifact(
    artifact_hash, artifact_kind, media_type, codec,
    raw_bytes, stored_bytes, payload, created_by
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

const RAW_INSERT_SQL = `
  INSERT INTO analytical_raw_artifact(
    compressed_hash, raw_hash, artifact_hash, manifest_hash, candidate_id,
    artifact_kind, relative_path, enclosing_radius, resolution, time_sample,
    sensitivity_coordinate, stencil, raw_bytes, stored_bytes, context_json
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const EXTERNAL_ARTIFACT_INSERT_SQL = `
  INSERT INTO external_artifact(
    artifact_hash, compressed_hash, raw_hash, relative_path,
    artifact_kind, media_type, codec, raw_bytes, stored_bytes, created_by
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const MEASURE_INSERT_SQL = `
  INSERT INTO multidimensional_measure(
    ${MEASURE_COLUMNS.join(", ")}
  ) VALUES (${MEASURE_COLUMNS.map(() => "?").join(", ")})
`;

const GATE_COLUMNS = Object.freeze([
  "result_hash",
  "gate_id",
  "gate_instrument_version",
  "measured_value",
  "comparator",
  "threshold_value",
  "independent_pass",
  "evidence_hash",
  "failure_code",
  "evidence_json",
]);

const GATE_SELECT_SQL = `
  SELECT ${GATE_COLUMNS.map((column) =>
    column.endsWith("_hash")
      ? `lower(hex(${column})) AS ${column}`
      : column).join(", ")}
  FROM validity_gate_result
  ORDER BY result_hash, gate_id, gate_instrument_version
`;

const GATE_INSERT_SQL = `
  INSERT INTO validity_gate_result(
    ${GATE_COLUMNS.join(", ")}
  ) VALUES (${GATE_COLUMNS.map(() => "?").join(", ")})
`;

function fail(message) {
  throw new Error(message);
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function hashBytes(hex) {
  return Buffer.from(hex, "hex");
}

function fileSize(filePath) {
  return existsSync(filePath) ? statSync(filePath).size : 0;
}

function parsePositiveInteger(value, label, fallback) {
  if (value == null) return fallback;
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 0) {
    fail(`${label} must be a nonnegative safe integer.`);
  }
  return parsed;
}

function parseArguments(args) {
  const command = args[0] ?? "help";
  const values = new Map();
  const flags = new Set();
  for (let index = 1; index < args.length; index += 1) {
    const key = args[index];
    if (!key.startsWith("--")) fail(`unexpected argument ${key}.`);
    if (key === "--keep-artifacts" ||
        key === "--allow-unreviewed-methodology-performance-fixture") {
      flags.add(key);
      continue;
    }
    const value = args[index + 1];
    if (!value || value.startsWith("--")) fail(`${key} requires a value.`);
    values.set(key, value);
    index += 1;
  }
  const fixture = values.get("--fixture") ?? "small";
  if (!FIXTURE_LIMITS[fixture]) {
    fail(`--fixture must be one of ${Object.keys(FIXTURE_LIMITS).join(", ")}.`);
  }
  const inventoryMode = values.get("--inventory-mode") ??
    (command === "inventory" ? "full" : command === "compute" ? "none" : "summary");
  if (!["none", "summary", "full"].includes(inventoryMode)) {
    fail("--inventory-mode must be none, summary, or full.");
  }
  return {
    command,
    sourceDatabase: path.resolve(
      values.get("--source-database") ?? defaultAnalyticalCampaignDatabasePath(),
    ),
    fixture,
    variants: (values.get("--variants") ?? "current,direct-compressed,prepared,post-index,external-artifacts")
      .split(",")
      .filter(Boolean),
    repetitions: parsePositiveInteger(values.get("--repetitions"), "--repetitions", 3),
    warmups: parsePositiveInteger(values.get("--warmups"), "--warmups", 1),
    workRoot: path.resolve(values.get("--work-root") ?? DEFAULT_WORK_ROOT),
    output: values.has("--output") ? path.resolve(values.get("--output")) : null,
    keepArtifacts: flags.has("--keep-artifacts"),
    allowUnreviewedMethodologyPerformanceFixture: flags.has(
      "--allow-unreviewed-methodology-performance-fixture",
    ),
    workerCounts: (values.get("--workers") ?? "1,2,4")
      .split(",")
      .map((value) => parsePositiveInteger(value, "--workers", null))
      .filter((value) => value > 0),
    candidateLimit: parsePositiveInteger(
      values.get("--candidate-limit"),
      "--candidate-limit",
      4,
    ),
    candidateSelection: values.get("--candidate-selection") ?? "evenly-spaced",
    includeSensitivity: values.get("--include-sensitivity") === "true",
    artifactMode: values.get("--artifact-mode") ?? "files",
    inventoryMode,
    variantName: values.get("--variant") ?? null,
    runLabel: values.get("--label") ?? null,
    includeExport: values.get("--include-export") === "true",
    expectedFixtureHash: values.get("--expected-fixture-hash") ?? null,
    registryPath: path.resolve(
      values.get("--registry") ?? DEFAULT_ALL_CANDIDATE_CAMPAIGN_REGISTRY_PATH,
    ),
  };
}

function resolvedVariant(name, seen = new Set()) {
  const declaration = VARIANTS[name];
  if (!declaration) fail(`unknown benchmark variant ${name}.`);
  if (seen.has(name)) fail(`variant inheritance cycle at ${name}.`);
  if (!declaration.base) return { name, ...declaration };
  seen.add(name);
  return {
    ...resolvedVariant(declaration.base, seen),
    ...declaration,
    name,
  };
}

function openReadOnly(databasePath) {
  return new DatabaseSync(path.resolve(databasePath), { readOnly: true });
}

function stageFromContext(contextBytes, fallback) {
  try {
    return JSON.parse(Buffer.from(contextBytes).toString("utf8")).stage ?? fallback;
  } catch {
    return fallback;
  }
}

function evenlySpaced(rows, count) {
  if (!Number.isFinite(count) || count >= rows.length) return [...rows];
  if (count <= 0) return [];
  const indexes = new Set();
  for (let index = 0; index < count; index += 1) {
    indexes.add(Math.min(
      rows.length - 1,
      Math.floor(((index + 0.5) * rows.length) / count),
    ));
  }
  return [...indexes].sort((left, right) => left - right).map((index) => rows[index]);
}

function stratifiedRawSelection(rows, limit) {
  if (!Number.isFinite(limit) || limit >= rows.length) return [...rows];
  const groups = new Map();
  for (const row of rows) {
    const list = groups.get(row.stage) ?? [];
    list.push(row);
    groups.set(row.stage, list);
  }
  const allocations = [...groups].map(([stage, list]) => {
    const exact = (limit * list.length) / rows.length;
    return {
      stage,
      list,
      count: Math.min(list.length, Math.max(1, Math.floor(exact))),
      remainder: exact - Math.floor(exact),
    };
  });
  let allocated = allocations.reduce((sum, row) => sum + row.count, 0);
  for (const row of [...allocations].sort(
    (left, right) => right.remainder - left.remainder ||
      left.stage.localeCompare(right.stage),
  )) {
    if (allocated >= limit) break;
    if (row.count < row.list.length) {
      row.count += 1;
      allocated += 1;
    }
  }
  while (allocated > limit) {
    const row = [...allocations]
      .filter((entry) => entry.count > 1)
      .sort((left, right) => left.remainder - right.remainder ||
        right.count - left.count)[0];
    if (!row) break;
    row.count -= 1;
    allocated -= 1;
  }
  return allocations
    .flatMap((row) => evenlySpaced(row.list, row.count))
    .sort((left, right) => left.compressedHash.localeCompare(right.compressedHash));
}

function buildFixtureInventory(databasePath, fixtureName) {
  const limits = FIXTURE_LIMITS[fixtureName];
  const database = openReadOnly(databasePath);
  try {
    const rawRows = database.prepare(`
      SELECT lower(hex(compressed_hash)) AS compressed_hash,
             lower(hex(raw_hash)) AS raw_hash,
             lower(hex(artifact_hash)) AS artifact_hash,
             candidate_id, artifact_kind, raw_bytes, stored_bytes, context_json
      FROM analytical_raw_artifact
      ORDER BY compressed_hash
    `).all().map((row) => ({
      compressedHash: row.compressed_hash,
      rawHash: row.raw_hash,
      artifactHash: row.artifact_hash,
      candidateId: row.candidate_id,
      artifactKind: row.artifact_kind,
      rawBytes: Number(row.raw_bytes),
      storedBytes: Number(row.stored_bytes),
      stage: stageFromContext(row.context_json, row.artifact_kind),
    }));
    const selectedRaw = stratifiedRawSelection(rawRows, limits.rawArtifacts);
    const measureCount = Number(database.prepare(
      "SELECT COUNT(*) AS count FROM multidimensional_measure",
    ).get().count);
    const selectedMeasureIndexes = new Set(evenlySpaced(
      Array.from({ length: measureCount }, (_, index) => index),
      limits.measures,
    ));
    const measures = [];
    let measureIndex = 0;
    for (const row of database.prepare(`
      SELECT lower(hex(row_hash)) AS row_hash,
             lower(hex(result_hash)) AS result_hash,
             measure_id, disposition, length(details_json) AS details_bytes
      FROM multidimensional_measure
      ORDER BY row_hash
    `).iterate()) {
      if (selectedMeasureIndexes.has(measureIndex)) {
        measures.push({
          rowHash: row.row_hash,
          resultHash: row.result_hash,
          measureId: row.measure_id,
          disposition: row.disposition,
          detailsBytes: Number(row.details_bytes),
        });
      }
      measureIndex += 1;
    }
    const selectedResultHashes = new Set(
      measures.map((row) => row.resultHash),
    );
    const gates = [];
    for (const row of database.prepare(`
      SELECT lower(hex(result_hash)) AS result_hash,
             gate_id, gate_instrument_version,
             lower(hex(evidence_hash)) AS evidence_hash,
             length(evidence_json) AS evidence_bytes
      FROM validity_gate_result
      ORDER BY result_hash, gate_id, gate_instrument_version
    `).iterate()) {
      if (!selectedResultHashes.has(row.result_hash)) continue;
      gates.push({
        resultHash: row.result_hash,
        gateId: row.gate_id,
        gateInstrumentVersion: row.gate_instrument_version,
        evidenceHash: row.evidence_hash,
        evidenceBytes: Number(row.evidence_bytes),
      });
    }
    const digest = createHash("sha256");
    digest.update(`${REPORT_SCHEMA}\0${fixtureName}\0`);
    for (const row of selectedRaw) {
      digest.update(`raw\0${row.compressedHash}\0${row.rawHash}\0${row.artifactHash}\0`);
    }
    for (const row of measures) {
      digest.update(`measure\0${row.rowHash}\0${row.resultHash}\0`);
    }
    for (const row of gates) {
      digest.update(
        `gate\0${row.resultHash}\0${row.gateId}\0` +
        `${row.gateInstrumentVersion}\0${row.evidenceHash}\0`,
      );
    }
    const byStage = new Map();
    for (const row of selectedRaw) {
      const current = byStage.get(row.stage) ?? {
        stage: row.stage,
        artifactCount: 0,
        rawBytes: 0,
        storedBytes: 0,
      };
      current.artifactCount += 1;
      current.rawBytes += row.rawBytes;
      current.storedBytes += row.storedBytes;
      byStage.set(row.stage, current);
    }
    return {
      fixture: fixtureName,
      fixtureHash: digest.digest("hex"),
      sourceDatabase: path.resolve(databasePath),
      rawArtifactCount: selectedRaw.length,
      rawBytes: selectedRaw.reduce((sum, row) => sum + row.rawBytes, 0),
      storedBytes: selectedRaw.reduce((sum, row) => sum + row.storedBytes, 0),
      compressionRatio: selectedRaw.reduce((sum, row) => sum + row.storedBytes, 0) /
        selectedRaw.reduce((sum, row) => sum + row.rawBytes, 0),
      measureCount: measures.length,
      measureDetailsBytes: measures.reduce((sum, row) => sum + row.detailsBytes, 0),
      validityGateCount: gates.length,
      gateEvidenceBytes: gates.reduce((sum, row) => sum + row.evidenceBytes, 0),
      candidateCount: new Set(selectedRaw.map((row) => row.candidateId)).size,
      byStage: [...byStage.values()].sort(
        (left, right) => right.storedBytes - left.storedBytes,
      ),
      rawArtifacts: selectedRaw,
      measures,
      gates,
    };
  } finally {
    database.close();
  }
}

function beginMeasurement() {
  return {
    wallStarted: performance.now(),
    cpuStarted: process.cpuUsage(),
    peakRssBytes: process.memoryUsage.rss(),
    loadAverageStarted: os.loadavg(),
  };
}

function sampleRss(measurement) {
  measurement.peakRssBytes = Math.max(
    measurement.peakRssBytes,
    process.memoryUsage.rss(),
  );
}

function endMeasurement(measurement) {
  const cpu = process.cpuUsage(measurement.cpuStarted);
  return {
    wallSeconds: (performance.now() - measurement.wallStarted) / 1_000,
    userCpuSeconds: cpu.user / 1_000_000,
    systemCpuSeconds: cpu.system / 1_000_000,
    peakRssBytes: measurement.peakRssBytes,
    loadAverageStarted: measurement.loadAverageStarted,
    loadAverageEnded: os.loadavg(),
  };
}

function createRunStats() {
  return {
    statements: {
      prepare: 0,
      ddl: 0,
      insert: 0,
      select: 0,
      pragma: 0,
      transaction: 0,
      preparationsByClass: {
        insert: 0,
        select: 0,
        pragma: 0,
      },
      preparationWallSeconds: 0,
      preparationWallSecondsByClass: {
        insert: 0,
        select: 0,
        pragma: 0,
      },
      cliImport: 0,
    },
    transactions: 0,
    transactionRows: [],
    phases: {},
    peakWalBytes: 0,
    peakTemporaryBytes: 0,
    filesystemWriteBytes: 0,
    filesystemWriteCount: 0,
  };
}

function addPhase(stats, name, measurement) {
  const ended = endMeasurement(measurement);
  const current = stats.phases[name] ?? {
    wallSeconds: 0,
    userCpuSeconds: 0,
    systemCpuSeconds: 0,
    peakRssBytes: 0,
  };
  current.wallSeconds += ended.wallSeconds;
  current.userCpuSeconds += ended.userCpuSeconds;
  current.systemCpuSeconds += ended.systemCpuSeconds;
  current.peakRssBytes = Math.max(current.peakRssBytes, ended.peakRssBytes);
  stats.phases[name] = current;
  return ended;
}

function addWallTime(stats, name, startedAt) {
  const seconds = (performance.now() - startedAt) / 1_000;
  stats.wallAttribution ??= {};
  stats.wallAttribution[name] = (stats.wallAttribution[name] ?? 0) + seconds;
  return seconds;
}

function executePrepare(database, sql, stats, statementClass) {
  const startedAt = performance.now();
  const statement = database.prepare(sql);
  const seconds = (performance.now() - startedAt) / 1_000;
  stats.statements.prepare += 1;
  stats.statements.preparationsByClass[statementClass] += 1;
  stats.statements.preparationWallSeconds += seconds;
  stats.statements.preparationWallSecondsByClass[statementClass] += seconds;
  return statement;
}

function configureTarget(database, variant, stats) {
  database.exec(`PRAGMA page_size = ${variant.pageSize}`);
  database.exec(`PRAGMA journal_mode = ${variant.journalMode}`);
  database.exec(`PRAGMA synchronous = ${variant.synchronous}`);
  database.exec(`PRAGMA cache_size = ${variant.cacheSize}`);
  database.exec(`PRAGMA mmap_size = ${variant.mmapSize}`);
  database.exec(`PRAGMA temp_store = ${variant.tempStore}`);
  database.exec(
    `PRAGMA foreign_keys = ${variant.foreignKeys === "immediate" ? "ON" : "OFF"}`,
  );
  stats.statements.pragma += 7;
}

function createTargetSchema(database, variant, stats) {
  database.exec(`
    CREATE TABLE artifact (
      artifact_hash BLOB ${
        variant.artifactTableMode === "rowid" ? "NOT NULL UNIQUE" : "PRIMARY KEY"
      } CHECK (length(artifact_hash) = 32),
      artifact_kind TEXT NOT NULL,
      media_type TEXT NOT NULL,
      codec TEXT NOT NULL CHECK (codec IN ('identity', 'gzip')),
      raw_bytes INTEGER NOT NULL CHECK (raw_bytes >= 0),
      stored_bytes INTEGER NOT NULL CHECK (stored_bytes >= 0),
      payload BLOB NOT NULL,
      created_by TEXT NOT NULL
    ) STRICT${variant.artifactTableMode === "rowid" ? "" : ", WITHOUT ROWID"};
    CREATE TABLE external_artifact (
      artifact_hash BLOB PRIMARY KEY CHECK (length(artifact_hash) = 32),
      compressed_hash BLOB NOT NULL UNIQUE CHECK (length(compressed_hash) = 32),
      raw_hash BLOB NOT NULL CHECK (length(raw_hash) = 32),
      relative_path TEXT NOT NULL UNIQUE,
      artifact_kind TEXT NOT NULL,
      media_type TEXT NOT NULL,
      codec TEXT NOT NULL CHECK (codec = 'gzip'),
      raw_bytes INTEGER NOT NULL,
      stored_bytes INTEGER NOT NULL,
      created_by TEXT NOT NULL
    ) STRICT, WITHOUT ROWID;
    CREATE TABLE analytical_raw_artifact (
      compressed_hash BLOB PRIMARY KEY CHECK (length(compressed_hash) = 32),
      raw_hash BLOB NOT NULL CHECK (length(raw_hash) = 32),
      artifact_hash BLOB NOT NULL,
      manifest_hash BLOB NOT NULL,
      candidate_id TEXT NOT NULL,
      artifact_kind TEXT NOT NULL,
      relative_path TEXT NOT NULL,
      enclosing_radius REAL,
      resolution TEXT,
      time_sample INTEGER,
      sensitivity_coordinate TEXT,
      stencil TEXT,
      raw_bytes INTEGER NOT NULL CHECK (raw_bytes > 0),
      stored_bytes INTEGER NOT NULL CHECK (stored_bytes > 0),
      context_json BLOB NOT NULL,
      FOREIGN KEY (artifact_hash) REFERENCES ${
        variant.externalArtifacts ? "external_artifact" : "artifact"
      }(artifact_hash)
    ) STRICT, WITHOUT ROWID;
    CREATE TABLE result_parent (
      result_hash BLOB PRIMARY KEY CHECK (length(result_hash) = 32)
    ) STRICT, WITHOUT ROWID;
    CREATE TABLE multidimensional_measure (
      row_hash BLOB PRIMARY KEY CHECK (length(row_hash) = 32),
      result_hash BLOB NOT NULL REFERENCES result_parent(result_hash),
      measure_id TEXT NOT NULL,
      reduction_version TEXT NOT NULL,
      disposition TEXT NOT NULL CHECK (
        disposition IN ('accepted', 'rejected', 'below-floor', 'diagnostic-only')
      ),
      scalar_value REAL,
      unit TEXT NOT NULL,
      probe_id TEXT,
      probe_polarity REAL,
      enclosing_radius REAL,
      resolution TEXT,
      time_sample INTEGER,
      temporal_harmonic INTEGER,
      angular_degree INTEGER,
      angular_order INTEGER,
      transmitter_id TEXT,
      root_ordinal INTEGER,
      sensitivity_coordinate TEXT,
      stencil TEXT,
      real_part REAL,
      imaginary_part REAL,
      magnitude REAL,
      normalization TEXT,
      coefficient_floor REAL,
      numerical_uncertainty REAL,
      details_json BLOB NOT NULL
    ) STRICT, WITHOUT ROWID;
    CREATE TABLE validity_gate_result (
      result_hash BLOB NOT NULL REFERENCES result_parent(result_hash),
      gate_id TEXT NOT NULL,
      gate_instrument_version TEXT NOT NULL,
      measured_value REAL,
      comparator TEXT NOT NULL,
      threshold_value REAL,
      independent_pass INTEGER NOT NULL CHECK (independent_pass IN (0, 1)),
      evidence_hash BLOB NOT NULL CHECK (length(evidence_hash) = 32),
      failure_code TEXT,
      evidence_json BLOB NOT NULL,
      PRIMARY KEY (result_hash, gate_id, gate_instrument_version)
    ) STRICT, WITHOUT ROWID;
  `);
  if (variant.measureStaging) {
    database.exec(`
      CREATE TABLE multidimensional_measure_stage AS
      SELECT * FROM multidimensional_measure WHERE 0
    `);
  }
  if (variant.indexMode === "during-load") createTargetIndexes(database, variant);
  stats.statements.ddl +=
    (variant.indexMode === "during-load" ? 12 : 6) +
    (variant.measureStaging ? 1 : 0) +
    (variant.indexMode === "during-load" && variant.extraMetricOrderIndex ? 1 : 0);
}

function createTargetIndexes(database, variant) {
  database.exec(`
    CREATE INDEX raw_artifact_candidate
      ON analytical_raw_artifact(candidate_id, artifact_kind);
    CREATE INDEX raw_artifact_event_filter
      ON analytical_raw_artifact(
        candidate_id, enclosing_radius, resolution, time_sample,
        sensitivity_coordinate, stencil
      );
    CREATE INDEX multidimensional_measure_query
      ON multidimensional_measure(
        measure_id, disposition, enclosing_radius, resolution,
        temporal_harmonic, angular_degree, angular_order, probe_polarity
      );
    CREATE INDEX multidimensional_measure_source_root
      ON multidimensional_measure(
        transmitter_id, root_ordinal, measure_id, result_hash
      );
    CREATE INDEX multidimensional_measure_sensitivity
      ON multidimensional_measure(
        sensitivity_coordinate, stencil, measure_id, result_hash
      );
    CREATE INDEX marginal_gate
      ON validity_gate_result(
        gate_id, independent_pass, measured_value, result_hash
      );
  `);
  if (variant.extraMetricOrderIndex) {
    database.exec(`
      CREATE INDEX multidimensional_measure_metric_order
        ON multidimensional_measure(measure_id, scalar_value, result_hash)
    `);
  }
}

function transactionController(database, stats, variant, databasePath) {
  let activeRows = 0;
  let active = false;
  function begin() {
    if (active) return;
    database.exec("BEGIN IMMEDIATE");
    stats.statements.transaction += 1;
    stats.transactions += 1;
    active = true;
    activeRows = 0;
  }
  function commit() {
    if (!active) return;
    database.exec("COMMIT");
    stats.statements.transaction += 1;
    stats.transactionRows.push(activeRows);
    active = false;
    stats.peakWalBytes = Math.max(
      stats.peakWalBytes,
      fileSize(`${databasePath}-wal`),
    );
  }
  function addRows(count) {
    begin();
    activeRows += count;
    if (Number.isFinite(variant.transactionRows) &&
        activeRows >= variant.transactionRows) {
      commit();
    }
  }
  function row() {
    addRows(1);
  }
  return { addRows, begin, commit, row };
}

function preparedTargetStatements(database, variant, stats) {
  if (variant.prepareMode !== "persistent") return null;
  return {
    artifact: executePrepare(database, ARTIFACT_INSERT_SQL, stats, "insert"),
    external: executePrepare(database, EXTERNAL_ARTIFACT_INSERT_SQL, stats, "insert"),
    raw: executePrepare(database, RAW_INSERT_SQL, stats, "insert"),
    measure: executePrepare(database, MEASURE_INSERT_SQL, stats, "insert"),
    gate: executePrepare(database, GATE_INSERT_SQL, stats, "insert"),
    parent: executePrepare(
      database,
      "INSERT OR IGNORE INTO result_parent(result_hash) VALUES (?)",
      stats,
      "insert",
    ),
  };
}

function runTargetInsert(database, persistent, key, sql, parameters, stats) {
  const statement = persistent?.[key] ??
    executePrepare(database, sql, stats, "insert");
  statement.run(...parameters);
  stats.statements.insert += 1;
}

function artifactStorePath(root, compressedHash) {
  return path.join(
    root,
    compressedHash.slice(0, 2),
    `${compressedHash}.json.gz`,
  );
}

function materializeRawRows({
  source,
  target,
  fixture,
  variant,
  persistent,
  transaction,
  stats,
  runDirectory,
  measurement,
  commitAtEnd = true,
}) {
  const sourceStatement = source.prepare(RAW_SELECT_SQL);
  stats.statements.prepare += 1;
  stats.statements.select += 1;
  const externalRoot = path.join(runDirectory, "external-artifacts");
  for (let index = 0; index < fixture.rawArtifacts.length; index += 1) {
    const descriptor = fixture.rawArtifacts[index];
    let operationStarted = performance.now();
    const row = sourceStatement.get(hashBytes(descriptor.compressedHash));
    addWallTime(stats, "raw-source-blob-read", operationStarted);
    if (!row) fail(`fixture raw artifact ${descriptor.compressedHash} is missing.`);
    const payload = Buffer.from(row.payload);
    operationStarted = performance.now();
    if (sha256(payload) !== row.compressed_hash) {
      fail(`compressed hash mismatch for ${row.compressed_hash}.`);
    }
    addWallTime(stats, "sha256-compressed-bytes", operationStarted);
    let rawBytes = null;
    let storedPayload = payload;
    if (variant.compressionMode !== "compressed-hash-only") {
      operationStarted = performance.now();
      rawBytes = gunzipSync(payload);
      addWallTime(stats, "gzip-decompression", operationStarted);
      operationStarted = performance.now();
      if (rawBytes.length !== row.raw_bytes || sha256(rawBytes) !== row.raw_hash) {
        fail(`raw hash/size mismatch for ${row.compressed_hash}.`);
      }
      addWallTime(stats, "sha256-raw-bytes", operationStarted);
    }
    if (variant.compressionMode === "recompress") {
      operationStarted = performance.now();
      storedPayload = gzipSync(rawBytes, { level: 6, mtime: 0 });
      addWallTime(stats, "gzip-recompression", operationStarted);
      if (!storedPayload.equals(payload)) {
        fail(`gzip byte identity mismatch for ${row.compressed_hash}.`);
      }
    }
    transaction.row();
    if (variant.externalArtifacts) {
      const externalPath = variant.retainExternalPayloads === false
        ? null
        : artifactStorePath(externalRoot, row.compressed_hash);
      if (externalPath) {
        operationStarted = performance.now();
        mkdirSync(path.dirname(externalPath), { recursive: true });
        writeFileSync(externalPath, payload, { flag: "wx" });
        addWallTime(stats, "external-artifact-filesystem-write", operationStarted);
        stats.filesystemWriteBytes += payload.length;
        stats.filesystemWriteCount += 1;
      }
      operationStarted = performance.now();
      runTargetInsert(
        target,
        persistent,
        "external",
        EXTERNAL_ARTIFACT_INSERT_SQL,
        [
          hashBytes(row.artifact_hash),
          hashBytes(row.compressed_hash),
          hashBytes(row.raw_hash),
          externalPath
            ? path.relative(runDirectory, externalPath)
            : `recompute/${row.compressed_hash}.json.gz`,
          row.artifact_kind,
          row.media_type,
          row.codec,
          row.raw_bytes,
          row.stored_bytes,
          row.created_by,
        ],
        stats,
      );
      addWallTime(stats, "external-artifact-index-insert", operationStarted);
    } else {
      operationStarted = performance.now();
      runTargetInsert(
        target,
        persistent,
        "artifact",
        ARTIFACT_INSERT_SQL,
        [
          hashBytes(row.artifact_hash),
          row.artifact_kind,
          row.media_type,
          row.codec,
          row.raw_bytes,
          storedPayload.length,
          storedPayload,
          row.created_by,
        ],
        stats,
      );
      addWallTime(stats, "artifact-blob-insert", operationStarted);
    }
    operationStarted = performance.now();
    runTargetInsert(
      target,
      persistent,
      "raw",
      RAW_INSERT_SQL,
      [
        hashBytes(row.compressed_hash),
        hashBytes(row.raw_hash),
        hashBytes(row.artifact_hash),
        row.manifest_hash,
        row.candidate_id,
        row.artifact_kind,
        row.relative_path,
        row.enclosing_radius,
        row.resolution,
        row.time_sample,
        row.sensitivity_coordinate,
        row.stencil,
        row.raw_bytes,
        row.stored_bytes,
        row.context_json,
      ],
      stats,
    );
    addWallTime(stats, "raw-artifact-metadata-insert", operationStarted);
    if ((index + 1) % 16 === 0 || index + 1 === fixture.rawArtifacts.length) {
      sampleRss(measurement);
    }
  }
  if (commitAtEnd) transaction.commit();
}

function measureParameters(row) {
  return MEASURE_COLUMNS.map((column) => {
    const value = row[column];
    return column.endsWith("_hash") ? hashBytes(value) : value;
  });
}

function updateLogicalRowDigest(digest, columns, row) {
  for (const column of columns) {
    digest.update(`${column}\0`);
    let value = row[column];
    if (column.endsWith("_hash") && typeof value === "string") {
      value = hashBytes(value);
    }
    if (value == null) {
      digest.update("null\0");
    } else if (typeof value === "number") {
      const bytes = Buffer.allocUnsafe(8);
      bytes.writeDoubleBE(value);
      digest.update("number\0");
      digest.update(bytes);
    } else if (Buffer.isBuffer(value) || value instanceof Uint8Array) {
      digest.update("bytes\0");
      digest.update(Buffer.from(value));
    } else {
      digest.update("text\0");
      digest.update(String(value));
    }
    digest.update("\0");
  }
}

function cliMeasureParameters(row) {
  return MEASURE_COLUMNS.map((column) => {
    const value = row[column];
    if (value == null) return null;
    if (column.endsWith("_hash")) return value;
    if (column === "details_json") return Buffer.from(value).toString("hex");
    return value;
  });
}

function transferMeasureStage(target, stats, { csvEncoded }) {
  const integerColumns = new Set([
    "time_sample",
    "temporal_harmonic",
    "angular_degree",
    "angular_order",
    "root_ordinal",
  ]);
  const realColumns = new Set([
    "scalar_value",
    "probe_polarity",
    "enclosing_radius",
    "real_part",
    "imaginary_part",
    "magnitude",
    "coefficient_floor",
    "numerical_uncertainty",
  ]);
  const requiredTextColumns = new Set([
    "measure_id",
    "reduction_version",
    "disposition",
    "unit",
  ]);
  const expressions = MEASURE_COLUMNS.map((column) => {
    if (!csvEncoded) return column;
    if (column.endsWith("_hash") || column === "details_json") {
      return `unhex(${column})`;
    }
    if (integerColumns.has(column)) {
      return `CAST(NULLIF(${column}, '') AS INTEGER)`;
    }
    if (realColumns.has(column)) {
      return `CAST(NULLIF(${column}, '') AS REAL)`;
    }
    return requiredTextColumns.has(column) ? column : `NULLIF(${column}, '')`;
  });
  const operationStarted = performance.now();
  executePrepare(
    target,
    `INSERT INTO multidimensional_measure(${MEASURE_COLUMNS.join(", ")})
     SELECT ${expressions.join(", ")}
     FROM multidimensional_measure_stage
     ORDER BY row_hash`,
    stats,
    "insert",
  ).run();
  stats.statements.insert += 1;
  addWallTime(
    stats,
    "multidimensional-measure-staging-transfer-and-index-maintenance",
    operationStarted,
  );
  target.exec("DROP TABLE multidimensional_measure_stage");
  stats.statements.ddl += 1;
}

function sqliteCliImportMeasures({
  databasePath,
  runDirectory,
  rows,
  stats,
}) {
  const csvPath = path.join(runDirectory, "multidimensional-measures.stage.csv");
  let operationStarted = performance.now();
  const lines = [
    `${MEASURE_COLUMNS.map(csvCell).join(",")}\n`,
    ...rows.map((parameters) =>
      `${parameters.map(csvCell).join(",")}\n`),
  ];
  const bytes = Buffer.from(lines.join(""));
  writeFileSync(csvPath, bytes, { flag: "wx" });
  stats.filesystemWriteBytes += bytes.length;
  stats.filesystemWriteCount += 1;
  addWallTime(stats, "sqlite-cli-csv-encoding-and-write", operationStarted);

  const quotedPath = csvPath.replaceAll("\"", "\"\"");
  const commands = [
    ".bail on",
    ".mode csv",
    `.import --skip 1 "${quotedPath}" multidimensional_measure_stage`,
    "",
  ].join("\n");
  operationStarted = performance.now();
  const result = spawnSync("/usr/bin/sqlite3", [databasePath], {
    input: commands,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  addWallTime(stats, "sqlite-cli-csv-stage-import", operationStarted);
  stats.statements.cliImport += 1;
  if (result.status !== 0) {
    fail(
      `SQLite CLI measure import failed (${result.status}): ` +
      `${result.stderr || result.stdout}`,
    );
  }
  return { csvPath, csvBytes: bytes.length, rowCount: rows.length };
}

function materializeMeasureRows({
  source,
  target,
  fixture,
  persistent,
  transaction,
  stats,
  measurement,
  variant,
  commitAtEnd = true,
  databasePath,
  runDirectory,
}) {
  const selected = new Set(fixture.measures.map((row) => row.rowHash));
  const selectedResults = new Set(fixture.measures.map((row) => row.resultHash));
  const parentStatement = persistent?.parent ??
    executePrepare(
      target,
      "INSERT OR IGNORE INTO result_parent(result_hash) VALUES (?)",
      stats,
      "insert",
  );
  for (const resultHash of [...selectedResults].sort()) {
    transaction.row();
    const operationStarted = performance.now();
    parentStatement.run(hashBytes(resultHash));
    addWallTime(stats, "measure-parent-insert", operationStarted);
    stats.statements.insert += 1;
  }
  const sourceStatement = source.prepare(MEASURE_SELECT_SQL);
  stats.statements.prepare += 1;
  stats.statements.select += 1;
  let inserted = 0;
  const sourceScanStarted = performance.now();
  let targetInsertSeconds = 0;
  const cliRows = [];
  const inputDigest = createHash("sha256");
  const measureTargetTable = variant.measureStaging
    ? "multidimensional_measure_stage"
    : "multidimensional_measure";
  const singleInsertSql = MEASURE_INSERT_SQL.replace(
    "INSERT INTO multidimensional_measure",
    `INSERT INTO ${measureTargetTable}`,
  );
  let multiRowParameters = [];
  function flushMultiRowInsert() {
    if (multiRowParameters.length === 0) return;
    const rowCount = multiRowParameters.length;
    const sql = `
      INSERT INTO ${measureTargetTable}(${MEASURE_COLUMNS.join(", ")})
      VALUES ${Array.from(
        { length: rowCount },
        () => `(${MEASURE_COLUMNS.map(() => "?").join(", ")})`,
      ).join(", ")}
    `;
    const operationStarted = performance.now();
    executePrepare(target, sql, stats, "insert").run(
      ...multiRowParameters.flat(),
    );
    stats.statements.insert += 1;
    targetInsertSeconds += addWallTime(
      stats,
      "multidimensional-measure-multi-row-insert",
      operationStarted,
    );
    multiRowParameters = [];
  }
  for (const row of sourceStatement.iterate()) {
    if (!selected.has(row.row_hash)) continue;
    updateLogicalRowDigest(inputDigest, MEASURE_COLUMNS, row);
    if (variant.measureInsertMode !== "sqlite-cli-csv") transaction.row();
    if (variant.measureInsertMode === "sqlite-cli-csv") {
      cliRows.push(cliMeasureParameters(row));
    } else if (variant.measureInsertMode === "multi-row-64") {
      const parameters = measureParameters(row);
      multiRowParameters.push(parameters);
      if (multiRowParameters.length === 64) flushMultiRowInsert();
    } else {
      const parameters = measureParameters(row);
      const operationStarted = performance.now();
      runTargetInsert(
        target,
        variant.measureStaging ? null : persistent,
        "measure",
        singleInsertSql,
        parameters,
        stats,
      );
      targetInsertSeconds += addWallTime(
        stats,
        variant.measureStaging
          ? "multidimensional-measure-staging-row-insert"
          : "multidimensional-measure-row-insert",
        operationStarted,
      );
    }
    inserted += 1;
    if (inserted % 1_024 === 0 || inserted === selected.size) sampleRss(measurement);
  }
  flushMultiRowInsert();
  stats.measureInputDigest = inputDigest.digest("hex");
  if (variant.measureInsertMode === "sqlite-cli-csv") {
    transaction.commit();
    sqliteCliImportMeasures({
      databasePath,
      runDirectory,
      rows: cliRows,
      stats,
    });
    transaction.addRows(cliRows.length);
    transferMeasureStage(target, stats, { csvEncoded: true });
  } else if (variant.measureStaging) {
    transferMeasureStage(target, stats, { csvEncoded: false });
  }
  const sourceScanGrossSeconds = (performance.now() - sourceScanStarted) / 1_000;
  stats.wallAttribution["multidimensional-measure-source-scan-gross"] =
    sourceScanGrossSeconds;
  stats.wallAttribution["multidimensional-measure-source-scan-exclusive-estimate"] =
    Math.max(0, sourceScanGrossSeconds - targetInsertSeconds);
  if (commitAtEnd) transaction.commit();
  if (inserted !== selected.size) {
    fail(`inserted ${inserted} multidimensional rows; expected ${selected.size}.`);
  }
}

function gateParameters(row) {
  return GATE_COLUMNS.map((column) => {
    const value = row[column];
    return column.endsWith("_hash") ? hashBytes(value) : value;
  });
}

function materializeGateRows({
  source,
  target,
  fixture,
  persistent,
  transaction,
  stats,
  measurement,
  commitAtEnd = true,
}) {
  const selected = new Set(fixture.gates.map(
    (row) =>
      `${row.resultHash}\0${row.gateId}\0${row.gateInstrumentVersion}`,
  ));
  const sourceStatement = source.prepare(GATE_SELECT_SQL);
  stats.statements.prepare += 1;
  stats.statements.select += 1;
  const inputDigest = createHash("sha256");
  let inserted = 0;
  for (const row of sourceStatement.iterate()) {
    const key =
      `${row.result_hash}\0${row.gate_id}\0${row.gate_instrument_version}`;
    if (!selected.has(key)) continue;
    updateLogicalRowDigest(inputDigest, GATE_COLUMNS, row);
    transaction.row();
    const operationStarted = performance.now();
    runTargetInsert(
      target,
      persistent,
      "gate",
      GATE_INSERT_SQL,
      gateParameters(row),
      stats,
    );
    addWallTime(stats, "validity-gate-row-insert", operationStarted);
    inserted += 1;
    if (inserted % 64 === 0 || inserted === selected.size) {
      sampleRss(measurement);
    }
  }
  stats.gateInputDigest = inputDigest.digest("hex");
  if (commitAtEnd) transaction.commit();
  if (inserted !== selected.size) {
    fail(`inserted ${inserted} validity-gate rows; expected ${selected.size}.`);
  }
}

function verifyRun({
  database,
  databasePath,
  fixture,
  variant,
  runDirectory,
  stats,
  measurement,
}) {
  let operationStarted = performance.now();
  const integrity = database.prepare("PRAGMA integrity_check").get().integrity_check;
  addWallTime(stats, "sqlite-integrity-check", operationStarted);
  stats.statements.pragma += 1;
  if (integrity !== "ok") fail(`sandbox SQLite integrity check failed: ${integrity}.`);
  operationStarted = performance.now();
  const foreignKeyFailures = database.prepare("PRAGMA foreign_key_check").all();
  addWallTime(stats, "sqlite-foreign-key-check", operationStarted);
  stats.statements.pragma += 1;
  if (foreignKeyFailures.length !== 0) {
    fail(`sandbox foreign-key check reported ${foreignKeyFailures.length} failure(s).`);
  }
  const rawCount = Number(database.prepare(
    "SELECT COUNT(*) AS count FROM analytical_raw_artifact",
  ).get().count);
  const measureCount = Number(database.prepare(
    "SELECT COUNT(*) AS count FROM multidimensional_measure",
  ).get().count);
  const gateCount = Number(database.prepare(
    "SELECT COUNT(*) AS count FROM validity_gate_result",
  ).get().count);
  stats.statements.select += 3;
  if (rawCount !== fixture.rawArtifactCount ||
      measureCount !== fixture.measureCount ||
      gateCount !== fixture.validityGateCount) {
    fail(
      `sandbox row counts ${rawCount}/${measureCount}/${gateCount} ` +
      `differ from fixture.`,
    );
  }
  operationStarted = performance.now();
  const measureDigest = createHash("sha256");
  for (const row of database.prepare(`
    SELECT ${MEASURE_COLUMNS.join(", ")}
    FROM multidimensional_measure
    ORDER BY row_hash
  `).iterate()) {
    updateLogicalRowDigest(measureDigest, MEASURE_COLUMNS, row);
  }
  const measureOutputDigest = measureDigest.digest("hex");
  addWallTime(stats, "verification-measure-logical-digest", operationStarted);
  stats.statements.select += 1;
  stats.statements.prepare += 1;
  if (measureOutputDigest !== stats.measureInputDigest) {
    fail(
      `measure logical digest ${measureOutputDigest} differs from input ` +
      `${stats.measureInputDigest}.`,
    );
  }
  operationStarted = performance.now();
  const gateDigest = createHash("sha256");
  for (const row of database.prepare(GATE_SELECT_SQL).iterate()) {
    updateLogicalRowDigest(gateDigest, GATE_COLUMNS, row);
  }
  const gateOutputDigest = gateDigest.digest("hex");
  addWallTime(stats, "verification-gate-logical-digest", operationStarted);
  stats.statements.select += 1;
  stats.statements.prepare += 1;
  if (gateOutputDigest !== stats.gateInputDigest) {
    fail(
      `gate logical digest ${gateOutputDigest} differs from input ` +
      `${stats.gateInputDigest}.`,
    );
  }
  const rows = database.prepare(`
    SELECT lower(hex(r.compressed_hash)) AS compressed_hash,
           lower(hex(r.raw_hash)) AS raw_hash,
           lower(hex(r.artifact_hash)) AS artifact_hash,
           r.stored_bytes,
           ${variant.externalArtifacts
             ? "e.relative_path, NULL AS payload"
             : "NULL AS relative_path, a.payload"}
    FROM analytical_raw_artifact AS r
    ${variant.externalArtifacts
      ? "JOIN external_artifact AS e USING (artifact_hash)"
      : "JOIN artifact AS a USING (artifact_hash)"}
    ORDER BY r.compressed_hash
  `).iterate();
  stats.statements.select += 1;
  stats.statements.prepare += 1;
  let checked = 0;
  const expectedRaw = new Map(
    fixture.rawArtifacts.map((row) => [row.compressedHash, row]),
  );
  for (const row of rows) {
    if (variant.retainExternalPayloads === false) {
      const expected = expectedRaw.get(row.compressed_hash);
      if (!expected || row.raw_hash !== expected.rawHash ||
          row.artifact_hash !== expected.artifactHash ||
          Number(row.stored_bytes) !== expected.storedBytes) {
        fail(`recomputable artifact inventory mismatch ${row.compressed_hash}.`);
      }
      checked += 1;
      if (checked % 16 === 0 || checked === rawCount) sampleRss(measurement);
      continue;
    }
    operationStarted = performance.now();
    const payload = variant.externalArtifacts
      ? readFileSync(path.join(runDirectory, row.relative_path))
      : Buffer.from(row.payload);
    addWallTime(stats, "verification-payload-read", operationStarted);
    operationStarted = performance.now();
    if (sha256(payload) !== row.compressed_hash) {
      fail(`verification compressed hash mismatch ${row.compressed_hash}.`);
    }
    addWallTime(stats, "verification-compressed-hash", operationStarted);
    operationStarted = performance.now();
    const rawBytes = gunzipSync(payload);
    addWallTime(stats, "verification-gzip-decompression", operationStarted);
    operationStarted = performance.now();
    if (sha256(rawBytes) !== row.raw_hash) {
      fail(`verification raw hash mismatch ${row.raw_hash}.`);
    }
    addWallTime(stats, "verification-raw-hash", operationStarted);
    checked += 1;
    if (checked % 16 === 0 || checked === rawCount) sampleRss(measurement);
  }
  stats.peakWalBytes = Math.max(stats.peakWalBytes, fileSize(`${databasePath}-wal`));
  return {
    integrity,
    foreignKeyFailureCount: 0,
    rawCount,
    measureCount,
    gateCount,
    measureLogicalDigest: measureOutputDigest,
    gateLogicalDigest: gateOutputDigest,
  };
}

function exportRun({
  database,
  fixture,
  variant,
  runDirectory,
  stats,
  measurement,
}) {
  const exportRoot = path.join(runDirectory, "deterministic-export");
  mkdirSync(exportRoot, { recursive: true });
  const inventory = [];
  const rows = database.prepare(`
    SELECT lower(hex(r.compressed_hash)) AS compressed_hash,
           lower(hex(r.raw_hash)) AS raw_hash,
           r.stored_bytes,
           ${variant.externalArtifacts
             ? "e.relative_path, NULL AS payload"
             : "NULL AS relative_path, a.payload"}
    FROM analytical_raw_artifact AS r
    ${variant.externalArtifacts
      ? "JOIN external_artifact AS e USING (artifact_hash)"
      : "JOIN artifact AS a USING (artifact_hash)"}
    ORDER BY r.compressed_hash
  `).iterate();
  stats.statements.prepare += 1;
  stats.statements.select += 1;
  let exported = 0;
  for (const row of rows) {
    const relativePath = path.join(
      "raw-artifacts",
      `${row.compressed_hash}.json.gz`,
    );
    if (variant.retainExternalPayloads === false) {
      inventory.push({
        path: relativePath,
        compressedHash: row.compressed_hash,
        rawHash: row.raw_hash,
        bytes: Number(row.stored_bytes),
        replayRequired: true,
      });
    } else {
      const payload = variant.externalArtifacts
        ? readFileSync(path.join(runDirectory, row.relative_path))
        : Buffer.from(row.payload);
      const outputPath = path.join(exportRoot, relativePath);
      mkdirSync(path.dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, payload);
      stats.filesystemWriteBytes += payload.length;
      stats.filesystemWriteCount += 1;
      inventory.push({
        path: relativePath,
        compressedHash: row.compressed_hash,
        rawHash: row.raw_hash,
        bytes: payload.length,
      });
    }
    exported += 1;
    if (exported % 16 === 0 || exported === fixture.rawArtifactCount) {
      sampleRss(measurement);
    }
  }
  const inventoryBytes = Buffer.from(`${JSON.stringify(inventory)}\n`);
  writeFileSync(path.join(exportRoot, "inventory.json"), inventoryBytes);
  stats.filesystemWriteBytes += inventoryBytes.length;
  stats.filesystemWriteCount += 1;
  return {
    fileCount: variant.retainExternalPayloads === false
      ? 1
      : inventory.length + 1,
    inventoryHash: sha256(inventoryBytes),
    bytes: (variant.retainExternalPayloads === false
      ? 0
      : inventory.reduce((sum, row) => sum + row.bytes, 0)) +
        inventoryBytes.length,
    replayRequiredCount: variant.retainExternalPayloads === false
      ? inventory.length
      : 0,
  };
}

function median(values) {
  const sorted = [...values].sort((left, right) => left - right);
  if (sorted.length === 0) return null;
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
}

function queryLatency(database, sql, parameters, repetitions = 25) {
  const statement = database.prepare(sql);
  for (let index = 0; index < 3; index += 1) statement.all(...parameters);
  const samples = [];
  for (let index = 0; index < repetitions; index += 1) {
    const started = performance.now();
    statement.all(...parameters);
    samples.push((performance.now() - started) * 1_000);
  }
  return {
    repetitions,
    medianMicroseconds: median(samples),
    minimumMicroseconds: Math.min(...samples),
    maximumMicroseconds: Math.max(...samples),
    plan: database.prepare(`EXPLAIN QUERY PLAN ${sql}`).all(...parameters).map(
      (row) => row.detail,
    ),
  };
}

function benchmarkQueries(database, fixture) {
  const candidateId = fixture.rawArtifacts[0]?.candidateId;
  const compressedHash = fixture.rawArtifacts[0]?.compressedHash;
  const metric = fixture.measures[0]?.measureId;
  const gateId = fixture.gates[0]?.gateId;
  return {
    candidateArtifacts: queryLatency(
      database,
      `SELECT compressed_hash FROM analytical_raw_artifact
       WHERE candidate_id = ? ORDER BY artifact_kind, compressed_hash`,
      [candidateId],
    ),
    artifactHash: queryLatency(
      database,
      "SELECT * FROM analytical_raw_artifact WHERE compressed_hash = ?",
      [hashBytes(compressedHash)],
    ),
    gate: queryLatency(
      database,
      `SELECT result_hash, measured_value, independent_pass
       FROM validity_gate_result
       WHERE gate_id = ?
       ORDER BY independent_pass, measured_value, result_hash`,
      [gateId],
    ),
    metric: queryLatency(
      database,
      `SELECT row_hash, scalar_value FROM multidimensional_measure
       WHERE measure_id = ? ORDER BY scalar_value`,
      [metric],
    ),
    root: queryLatency(
      database,
      `SELECT row_hash, scalar_value FROM multidimensional_measure
       WHERE transmitter_id IS NOT NULL AND root_ordinal IS NOT NULL
       ORDER BY transmitter_id, root_ordinal LIMIT 32`,
      [],
    ),
    sensitivity: queryLatency(
      database,
      `SELECT row_hash, scalar_value FROM multidimensional_measure
       WHERE sensitivity_coordinate IS NOT NULL
       ORDER BY sensitivity_coordinate, stencil LIMIT 32`,
      [],
    ),
  };
}

function databaseObjectSizes(database) {
  try {
    return database.prepare(`
      SELECT name, SUM(pgsize) AS bytes, COUNT(*) AS pages
      FROM dbstat GROUP BY name ORDER BY bytes DESC
    `).all().map((row) => ({
      name: row.name,
      bytes: Number(row.bytes),
      pages: Number(row.pages),
    }));
  } catch {
    return [];
  }
}

function runIngestOnce({
  sourceDatabase,
  fixture,
  variant,
  workRoot,
  label,
  keepArtifacts,
  includeExport,
}) {
  mkdirSync(workRoot, { recursive: true });
  const runDirectory = mkdtempSync(path.join(workRoot, `${label}-`));
  const databasePath = path.join(runDirectory, "benchmark.sqlite3");
  const stats = createRunStats();
  const total = beginMeasurement();
  const source = openReadOnly(sourceDatabase);
  const target = new DatabaseSync(databasePath);
  try {
    let phase = beginMeasurement();
    configureTarget(target, variant, stats);
    createTargetSchema(target, variant, stats);
    addPhase(stats, "open-migrate-schema", phase);

    const persistent = preparedTargetStatements(target, variant, stats);
    const sharedTransaction = transactionController(
      target,
      stats,
      variant,
      databasePath,
    );
    if (variant.singleTransaction) sharedTransaction.begin();
    const phaseTransaction = (rowLimit) =>
      variant.singleTransaction
        ? sharedTransaction
        : transactionController(
            target,
            stats,
            { ...variant, transactionRows: rowLimit },
            databasePath,
          );

    phase = beginMeasurement();
    const rawTransaction = phaseTransaction(
      variant.rawTransactionRows ?? variant.transactionRows,
    );
    materializeRawRows({
      source,
      target,
      fixture,
      variant,
      persistent,
      transaction: rawTransaction,
      stats,
      runDirectory,
      measurement: phase,
      commitAtEnd: !variant.singleTransaction,
    });
    addPhase(stats, "raw-artifact-ingestion", phase);

    phase = beginMeasurement();
    const measureTransaction = phaseTransaction(
      variant.measureTransactionRows ?? variant.transactionRows,
    );
    materializeMeasureRows({
      source,
      target,
      fixture,
      persistent,
      transaction: measureTransaction,
      stats,
      measurement: phase,
      variant,
      commitAtEnd: !variant.singleTransaction,
      databasePath,
      runDirectory,
    });
    addPhase(stats, "multidimensional-measure-ingestion", phase);

    phase = beginMeasurement();
    const gateTransaction = phaseTransaction(
      variant.gateTransactionRows ?? variant.transactionRows,
    );
    materializeGateRows({
      source,
      target,
      fixture,
      persistent,
      transaction: gateTransaction,
      stats,
      measurement: phase,
      commitAtEnd: !variant.singleTransaction,
    });
    addPhase(stats, "validity-gate-ingestion", phase);
    if (variant.singleTransaction) sharedTransaction.commit();

    if (variant.indexMode === "after-load") {
      phase = beginMeasurement();
      createTargetIndexes(target, variant);
      stats.statements.ddl += 6 + (variant.extraMetricOrderIndex ? 1 : 0);
      addPhase(stats, "post-load-index-build", phase);
    }

    phase = beginMeasurement();
    const verification = verifyRun({
      database: target,
      databasePath,
      fixture,
      variant,
      runDirectory,
      stats,
      measurement: phase,
    });
    addPhase(stats, "verification", phase);

    let deterministicExport = null;
    if (includeExport) {
      phase = beginMeasurement();
      deterministicExport = exportRun({
        database: target,
        fixture,
        variant,
        runDirectory,
        stats,
        measurement: phase,
      });
      addPhase(stats, "deterministic-export", phase);
    }

    phase = beginMeasurement();
    const queries = benchmarkQueries(target, fixture);
    addPhase(stats, "query-benchmark", phase);
    target.exec("PRAGMA wal_checkpoint(TRUNCATE)");
    stats.statements.pragma += 1;
    const objectSizes = databaseObjectSizes(target);
    const result = {
      variant: variant.name,
      description: variant.description,
      durabilityBoundary: variant.durabilityBoundary ?? "candidate-for-safe-use",
      fixture: fixture.fixture,
      fixtureHash: fixture.fixtureHash,
      warmCache: true,
      process: {
        pid: process.pid,
        isolatedRepetition:
          process.env.ANALYTICAL_BENCHMARK_ISOLATED_REPETITION === "1",
      },
      measurements: endMeasurement(total),
      phases: stats.phases,
      wallAttribution: stats.wallAttribution ?? {},
      statements: stats.statements,
      transactions: {
        count: stats.transactions,
        rowsPerTransaction: stats.transactionRows,
        medianRows: median(stats.transactionRows),
      },
      input: {
        rawArtifactCount: fixture.rawArtifactCount,
        rawBytes: fixture.rawBytes,
        storedBytes: fixture.storedBytes,
        measureCount: fixture.measureCount,
        measureDetailsBytes: fixture.measureDetailsBytes,
        validityGateCount: fixture.validityGateCount,
        gateEvidenceBytes: fixture.gateEvidenceBytes,
      },
      throughput: {
        rawRowsPerSecond: fixture.rawArtifactCount /
          stats.phases["raw-artifact-ingestion"].wallSeconds,
        rawStoredMegabytesPerSecond:
          (fixture.storedBytes / 1_000_000) /
          stats.phases["raw-artifact-ingestion"].wallSeconds,
        measureRowsPerSecond: fixture.measureCount /
          stats.phases["multidimensional-measure-ingestion"].wallSeconds,
        validityGateRowsPerSecond: fixture.validityGateCount /
          stats.phases["validity-gate-ingestion"].wallSeconds,
      },
      output: {
        databaseBytes: fileSize(databasePath),
        walBytes: fileSize(`${databasePath}-wal`),
        sharedMemoryBytes: fileSize(`${databasePath}-shm`),
        peakWalBytes: stats.peakWalBytes,
        peakTemporaryBytes: stats.peakTemporaryBytes,
        externalArtifactBytes:
          variant.externalArtifacts && variant.retainExternalPayloads !== false
            ? fixture.storedBytes
            : 0,
        filesystemWriteBytes: stats.filesystemWriteBytes,
        filesystemWriteCount: stats.filesystemWriteCount,
        objectSizes,
      },
      verification,
      deterministicExport,
      queries,
      correctness: {
        fixtureHashMatched: true,
        compressedHashesVerified: true,
        rawHashesVerified:
          variant.compressionMode !== "compressed-hash-only" ||
          "intentionally-skipped-unsafe-lower-bound",
        finalIntegrity: verification.integrity,
        finalForeignKeyFailures: verification.foreignKeyFailureCount,
      },
      runDirectory: keepArtifacts ? runDirectory : null,
    };
    return result;
  } finally {
    source.close();
    target.close();
    if (!keepArtifacts) rmSync(runDirectory, { recursive: true, force: true });
  }
}

function summarizeRuns(runs) {
  const wall = runs.map((run) => run.measurements.wallSeconds);
  const user = runs.map((run) => run.measurements.userCpuSeconds);
  const system = runs.map((run) => run.measurements.systemCpuSeconds);
  const peak = runs.map((run) => run.measurements.peakRssBytes);
  return {
    repetitions: runs.length,
    wallSeconds: {
      median: median(wall),
      minimum: Math.min(...wall),
      maximum: Math.max(...wall),
      individual: wall,
    },
    userCpuSeconds: {
      median: median(user),
      minimum: Math.min(...user),
      maximum: Math.max(...user),
      individual: user,
    },
    systemCpuSeconds: {
      median: median(system),
      minimum: Math.min(...system),
      maximum: Math.max(...system),
      individual: system,
    },
    peakRssBytes: {
      median: median(peak),
      minimum: Math.min(...peak),
      maximum: Math.max(...peak),
      individual: peak,
    },
    medianPhases: Object.fromEntries(
      Object.keys(runs[0].phases).map((phase) => [
        phase,
        median(runs.map((run) => run.phases[phase]?.wallSeconds ?? 0)),
      ]),
    ),
    medianOutput: {
      databaseBytes: median(runs.map((run) => run.output.databaseBytes)),
      peakWalBytes: median(runs.map((run) => run.output.peakWalBytes)),
      externalArtifactBytes: median(
        runs.map((run) => run.output.externalArtifactBytes),
      ),
    },
  };
}

function emitHeartbeat(values) {
  process.stderr.write(`${JSON.stringify({
    heartbeat: "analytical-campaign-pipeline-benchmark",
    ...values,
  })}\n`);
}

function runIngestOnceIsolated({
  options,
  fixture,
  variantName,
  label,
  keepArtifacts,
  includeExport,
}) {
  const args = [
    SCRIPT_PATH,
    "ingest-once-internal",
    "--source-database",
    options.sourceDatabase,
    "--fixture",
    fixture.fixture,
    "--variant",
    variantName,
    "--label",
    label,
    "--work-root",
    options.workRoot,
    "--expected-fixture-hash",
    fixture.fixtureHash,
    "--include-export",
    includeExport ? "true" : "false",
    "--inventory-mode",
    "none",
  ];
  if (keepArtifacts) args.push("--keep-artifacts");
  const child = spawnSync(process.execPath, args, {
    cwd: REPOSITORY_ROOT,
    env: {
      ...process.env,
      ANALYTICAL_BENCHMARK_ISOLATED_REPETITION: "1",
    },
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  if (child.status !== 0) {
    fail(
      `isolated ingest run ${label} failed (${child.status}): ` +
      `${child.stderr || child.stdout}`,
    );
  }
  const result = JSON.parse(child.stdout);
  if (result.fixtureHash !== fixture.fixtureHash) {
    fail(
      `isolated ingest fixture ${result.fixtureHash} differs from ` +
      `${fixture.fixtureHash}.`,
    );
  }
  return result;
}

function benchmarkIngestMatrix(options, fixture) {
  const experiments = [];
  const totalRuns = options.variants.length * (options.warmups + options.repetitions);
  let completedRuns = 0;
  const matrixStarted = performance.now();
  for (const variantName of options.variants) {
    const variant = resolvedVariant(variantName);
    const warmups = [];
    for (let index = 0; index < options.warmups; index += 1) {
      warmups.push(runIngestOnceIsolated({
        options,
        fixture,
        variantName,
        label: `${variantName}-warmup-${index + 1}`,
        keepArtifacts: false,
        includeExport: false,
      }));
      completedRuns += 1;
      emitHeartbeat({
        phase: "ingest-matrix",
        variant: variantName,
        repetition: `warmup-${index + 1}`,
        completedWork: completedRuns,
        totalWork: totalRuns,
        wallSeconds: (performance.now() - matrixStarted) / 1_000,
        outputPath: options.output,
      });
    }
    const runs = [];
    for (let index = 0; index < options.repetitions; index += 1) {
      runs.push(runIngestOnceIsolated({
        options,
        fixture,
        variantName,
        label: `${variantName}-run-${index + 1}`,
        keepArtifacts: options.keepArtifacts,
        includeExport: fixture.fixture !== "representative-large" &&
          fixture.fixture !== "full",
      }));
      completedRuns += 1;
      emitHeartbeat({
        phase: "ingest-matrix",
        variant: variantName,
        repetition: index + 1,
        completedWork: completedRuns,
        totalWork: totalRuns,
        wallSeconds: (performance.now() - matrixStarted) / 1_000,
        outputPath: options.output,
      });
    }
    experiments.push({
      variant: variantName,
      configuration: variant,
      processIsolation:
        "one fresh Node process per warm-up and measured repetition",
      warmupCount: warmups.length,
      summary: summarizeRuns(runs),
      runs,
    });
  }
  return experiments;
}

function csvCell(value) {
  if (value == null) return "";
  const text = Buffer.isBuffer(value) || value instanceof Uint8Array
    ? Buffer.from(value).toString("hex")
    : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replaceAll("\"", "\"\"")}"` : text;
}

async function writeCompressedLines(filePath, lineProducer) {
  mkdirSync(path.dirname(filePath), { recursive: true });
  const output = createWriteStream(filePath, { flags: "wx" });
  const gzip = createGzip({ level: 6, mtime: 0 });
  gzip.pipe(output);
  let rawBytes = 0;
  let rows = 0;
  async function write(line) {
    const bytes = Buffer.byteLength(line);
    rawBytes += bytes;
    rows += 1;
    if (!gzip.write(line)) await once(gzip, "drain");
  }
  await lineProducer(write);
  gzip.end();
  await once(output, "close");
  return {
    rows,
    rawBytes,
    storedBytes: fileSize(filePath),
    sha256: sha256(readFileSync(filePath)),
  };
}

function jsonSafeRow(row) {
  return Object.fromEntries(Object.entries(row).map(([key, value]) => [
    key,
    Buffer.isBuffer(value) || value instanceof Uint8Array
      ? { $hex: Buffer.from(value).toString("hex") }
      : value,
  ]));
}

function parseCsvRecord(line) {
  const cells = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (quoted && character === "\"" && line[index + 1] === "\"") {
      cell += "\"";
      index += 1;
    } else if (character === "\"") {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      cells.push(cell);
      cell = "";
    } else {
      cell += character;
    }
  }
  if (quoted) fail("CSV verification found an unterminated quoted field.");
  cells.push(cell);
  return cells;
}

function decodeCsvCell(text, expected) {
  if (expected === null || expected === undefined) return null;
  if (typeof expected === "number") return Number(text);
  if (typeof expected === "boolean") return text === "true";
  if (typeof expected === "object") return JSON.parse(text);
  return text;
}

function exactLogicalEqual(left, right) {
  if (typeof left === "number" || typeof right === "number") {
    return typeof left === "number" && typeof right === "number" &&
      Object.is(left, right);
  }
  if (left === null || right === null || typeof left !== "object" ||
      typeof right !== "object") {
    return left === right;
  }
  if (Array.isArray(left) || Array.isArray(right)) {
    return Array.isArray(left) && Array.isArray(right) &&
      left.length === right.length &&
      left.every((value, index) => exactLogicalEqual(value, right[index]));
  }
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  return leftKeys.length === rightKeys.length &&
    leftKeys.every((key, index) =>
      key === rightKeys[index] && exactLogicalEqual(left[key], right[key]));
}

function verifyExternalTableRoundTrip(filePath, format, expectedRows, keys) {
  const text = gunzipSync(readFileSync(filePath)).toString("utf8");
  const lines = text.endsWith("\n")
    ? text.slice(0, -1).split("\n")
    : text.split("\n");
  let decoded;
  if (format === "ndjson") {
    decoded = lines.filter((line) => line.length > 0).map((line) => JSON.parse(line));
  } else {
    if (expectedRows.length === 0) {
      decoded = [];
    } else {
      const header = parseCsvRecord(lines[0]);
      if (JSON.stringify(header) !== JSON.stringify(keys)) {
        fail(`CSV header round trip failed for ${filePath}.`);
      }
      decoded = lines.slice(1).filter((line) => line.length > 0).map(
        (line, rowIndex) => {
          const cells = parseCsvRecord(line);
          if (cells.length !== keys.length) {
            fail(`CSV column count failed for ${filePath} row ${rowIndex}.`);
          }
          return Object.fromEntries(keys.map((key, columnIndex) => [
            key,
            decodeCsvCell(cells[columnIndex], expectedRows[rowIndex][key]),
          ]));
        },
      );
    }
  }
  if (!exactLogicalEqual(decoded, expectedRows)) {
    fail(`${format} exact logical round trip failed for ${filePath}.`);
  }
  return {
    rowCount: decoded.length,
    logicalHash: sha256(Buffer.from(JSON.stringify(decoded))),
    exactLogicalRoundTrip: true,
    numericCellCount: decoded.reduce(
      (sum, row) =>
        sum + Object.values(row).filter((value) => typeof value === "number").length,
      0,
    ),
  };
}

function compressedTextScanLatency(filePath, needle, repetitions = 5) {
  const samples = [];
  let matchCount = 0;
  for (let index = 0; index < repetitions; index += 1) {
    const startedAt = performance.now();
    const text = gunzipSync(readFileSync(filePath)).toString("utf8");
    matchCount = needle.length === 0 ? 0 : text.split(needle).length - 1;
    samples.push((performance.now() - startedAt) / 1_000);
  }
  return {
    instrument: "compressed-full-scan-string-match-lower-bound.v1",
    repetitions,
    needle,
    matchCount,
    medianSeconds: median(samples),
    minimumSeconds: Math.min(...samples),
    maximumSeconds: Math.max(...samples),
    individualSeconds: samples,
  };
}

async function benchmarkFormats(options, fixture) {
  mkdirSync(options.workRoot, { recursive: true });
  const runDirectory = mkdtempSync(path.join(options.workRoot, "formats-"));
  const source = openReadOnly(options.sourceDatabase);
  const started = beginMeasurement();
  try {
    const preparationStarted = beginMeasurement();
    const rawLookup = source.prepare(RAW_SELECT_SQL);
    const selectedMeasures = new Set(fixture.measures.map((row) => row.rowHash));
    const externalRoot = path.join(runDirectory, "external-artifacts");
    const rawMetadata = [];
    let externalBytes = 0;
    for (const descriptor of fixture.rawArtifacts) {
      const row = rawLookup.get(hashBytes(descriptor.compressedHash));
      const payload = Buffer.from(row.payload);
      if (sha256(payload) !== row.compressed_hash ||
          sha256(gunzipSync(payload)) !== row.raw_hash) {
        fail(`format fixture raw artifact ${row.compressed_hash} failed.`);
      }
      const externalPath = artifactStorePath(externalRoot, row.compressed_hash);
      mkdirSync(path.dirname(externalPath), { recursive: true });
      writeFileSync(externalPath, payload);
      externalBytes += payload.length;
      const { payload: omitted, ...metadata } = row;
      void omitted;
      rawMetadata.push({
        ...jsonSafeRow(metadata),
        payload_path: path.relative(runDirectory, externalPath),
      });
    }
    const measures = [];
    for (const row of source.prepare(MEASURE_SELECT_SQL).iterate()) {
      if (selectedMeasures.has(row.row_hash)) measures.push(jsonSafeRow(row));
    }
    const selectedResultHashes = new Set(
      fixture.measures.map((row) => row.resultHash),
    );
    const gates = source.prepare(`
      SELECT * FROM validity_gate_result
      ORDER BY result_hash, gate_id, gate_instrument_version
    `).all().filter(
      (row) => selectedResultHashes.has(
        Buffer.from(row.result_hash).toString("hex"),
      ),
    ).map(jsonSafeRow);
    const preparation = endMeasurement(preparationStarted);
    const formatRuns = {};
    for (const format of ["ndjson", "csv"]) {
      const formatStarted = beginMeasurement();
      const rawPath = path.join(runDirectory, `raw-artifacts.${format}.gz`);
      const measurePath = path.join(runDirectory, `multidimensional-measures.${format}.gz`);
      const gatePath = path.join(runDirectory, `validity-gates.${format}.gz`);
      const rawKeys = Object.keys(rawMetadata[0] ?? {});
      const gateKeys = Object.keys(gates[0] ?? {});
      const rawReport = await writeCompressedLines(rawPath, async (write) => {
        if (format === "csv") {
          await write(`${rawKeys.map(csvCell).join(",")}\n`);
          for (const row of rawMetadata) {
            await write(`${rawKeys.map((key) => csvCell(
              typeof row[key] === "object" ? JSON.stringify(row[key]) : row[key],
            )).join(",")}\n`);
          }
        } else {
          for (const row of rawMetadata) await write(`${JSON.stringify(row)}\n`);
        }
      });
      const measureReport = await writeCompressedLines(measurePath, async (write) => {
        if (format === "csv") {
          await write(`${MEASURE_COLUMNS.map(csvCell).join(",")}\n`);
          for (const row of measures) {
            await write(`${MEASURE_COLUMNS.map((key) => csvCell(
              typeof row[key] === "object" ? JSON.stringify(row[key]) : row[key],
            )).join(",")}\n`);
          }
        } else {
          for (const row of measures) await write(`${JSON.stringify(row)}\n`);
        }
      });
      const gateReport = await writeCompressedLines(gatePath, async (write) => {
        if (format === "csv") {
          if (gateKeys.length > 0) {
            await write(`${gateKeys.map(csvCell).join(",")}\n`);
          }
          for (const row of gates) {
            await write(`${gateKeys.map((key) => csvCell(
              typeof row[key] === "object" ? JSON.stringify(row[key]) : row[key],
            )).join(",")}\n`);
          }
        } else {
          for (const row of gates) await write(`${JSON.stringify(row)}\n`);
        }
      });
      const roundTrip = {
        rawMetadata: verifyExternalTableRoundTrip(
          rawPath,
          format,
          rawMetadata,
          rawKeys,
        ),
        measures: verifyExternalTableRoundTrip(
          measurePath,
          format,
          measures,
          MEASURE_COLUMNS,
        ),
        validityGates: verifyExternalTableRoundTrip(
          gatePath,
          format,
          gates,
          gateKeys,
        ),
      };
      const manifestWithoutHash = {
        schema: "prescribed-record-analytics/external-format-benchmark-manifest.v1",
        fixtureHash: fixture.fixtureHash,
        format,
        externalArtifactBytes: externalBytes,
        rawMetadata: rawReport,
        measures: measureReport,
        validityGates: gateReport,
        roundTrip,
      };
      const manifest = {
        ...manifestWithoutHash,
        manifestHash: sha256(Buffer.from(JSON.stringify(manifestWithoutHash))),
      };
      writeFileSync(
        path.join(runDirectory, `${format}-manifest.json`),
        `${JSON.stringify(manifest, null, 2)}\n`,
      );
      const encodingMeasurements = endMeasurement(formatStarted);
      const queryLatency = {
        candidate: compressedTextScanLatency(
          rawPath,
          fixture.rawArtifacts[0]?.candidateId ?? "",
        ),
        artifact: compressedTextScanLatency(
          rawPath,
          fixture.rawArtifacts[0]?.compressedHash ?? "",
        ),
        gate: compressedTextScanLatency(
          gatePath,
          gates[0]?.gate_id ?? "",
        ),
        metric: compressedTextScanLatency(
          measurePath,
          fixture.measures[0]?.measureId ?? "",
        ),
        root: compressedTextScanLatency(measurePath, "root_ordinal"),
        sensitivity: compressedTextScanLatency(
          measurePath,
          "sensitivity_coordinate",
        ),
      };
      formatRuns[format] = {
        measurements: encodingMeasurements,
        rawMetadata: rawReport,
        measures: measureReport,
        validityGates: gateReport,
        roundTrip,
        externalArtifactBytes: externalBytes,
        totalStoredBytes:
          externalBytes + rawReport.storedBytes + measureReport.storedBytes +
          gateReport.storedBytes,
        queryLatency,
        exactness: {
          coverage:
            "sampled raw-artifact metadata, multidimensional measures, and validity gates; remaining campaign control-plane tables are not encoded by this component benchmark",
          exactLogicalRoundTripVerified: Object.values(roundTrip).every(
            (row) => row.exactLogicalRoundTrip,
          ),
          binaryHashesEncodedAsHex: true,
          floatingPointEncoding:
            format === "csv"
              ? "ECMAScript shortest-round-trip decimal"
              : "JSON binary64 round-trip",
          payloadIdentityRetainedExternally: true,
          schemaEnforcement: false,
          referentialIntegrity: "manifest-and-hash verification only",
          atomicity: "requires directory-level staged publication",
        },
      };
    }
    return {
      runDirectory: options.keepArtifacts ? runDirectory : null,
      measurements: endMeasurement(started),
      preparation,
      formats: formatRuns,
    };
  } finally {
    source.close();
    if (!options.keepArtifacts) rmSync(runDirectory, { recursive: true, force: true });
  }
}

async function benchmarkFormatMatrix(options, fixture) {
  const totalRuns = options.warmups + options.repetitions;
  const startedAt = performance.now();
  for (let index = 0; index < options.warmups; index += 1) {
    await benchmarkFormats({ ...options, keepArtifacts: false }, fixture);
    emitHeartbeat({
      phase: "format-matrix",
      repetition: `warmup-${index + 1}`,
      completedWork: index + 1,
      totalWork: totalRuns,
      wallSeconds: (performance.now() - startedAt) / 1_000,
      outputPath: options.output,
    });
  }
  const runs = [];
  for (let index = 0; index < options.repetitions; index += 1) {
    runs.push(await benchmarkFormats(options, fixture));
    emitHeartbeat({
      phase: "format-matrix",
      repetition: index + 1,
      completedWork: options.warmups + index + 1,
      totalWork: totalRuns,
      wallSeconds: (performance.now() - startedAt) / 1_000,
      outputPath: options.output,
    });
  }
  return {
    warmupCount: options.warmups,
    repetitions: options.repetitions,
    runs,
    summary: Object.fromEntries(["ndjson", "csv"].map((format) => [
      format,
      {
        wallSeconds: {
          median: median(runs.map((run) =>
            run.preparation.wallSeconds +
            run.formats[format].measurements.wallSeconds)),
          minimum: Math.min(...runs.map((run) =>
            run.preparation.wallSeconds +
            run.formats[format].measurements.wallSeconds)),
          maximum: Math.max(...runs.map((run) =>
            run.preparation.wallSeconds +
            run.formats[format].measurements.wallSeconds)),
          individual: runs.map((run) =>
            run.preparation.wallSeconds +
            run.formats[format].measurements.wallSeconds),
          commonExternalStoreAndFixturePreparation: {
            median: median(runs.map((run) => run.preparation.wallSeconds)),
            individual: runs.map((run) => run.preparation.wallSeconds),
          },
          formatEncodingOnly: {
            median: median(runs.map(
              (run) => run.formats[format].measurements.wallSeconds,
            )),
            individual: runs.map(
              (run) => run.formats[format].measurements.wallSeconds,
            ),
          },
        },
        totalStoredBytes: median(runs.map(
          (run) => run.formats[format].totalStoredBytes,
        )),
        externalArtifactBytes: median(runs.map(
          (run) => run.formats[format].externalArtifactBytes,
        )),
        metadataStoredBytes: median(runs.map((run) =>
          run.formats[format].rawMetadata.storedBytes +
          run.formats[format].measures.storedBytes +
          run.formats[format].validityGates.storedBytes)),
        queryLatency: Object.fromEntries(
          [
            "candidate",
            "artifact",
            "gate",
            "metric",
            "root",
            "sensitivity",
          ].map((query) => {
            const samples = runs.flatMap(
              (run) =>
                run.formats[format].queryLatency[query].individualSeconds,
            );
            return [query, {
              instrument:
                runs[0].formats[format].queryLatency[query].instrument,
              medianSeconds: median(samples),
              minimumSeconds: Math.min(...samples),
              maximumSeconds: Math.max(...samples),
              individualSeconds: samples,
              warmCacheOnly: true,
            }];
          }),
        ),
        roundTrip: runs[0].formats[format].roundTrip,
        exactness: runs[0].formats[format].exactness,
      },
    ])),
  };
}

function workerRawArtifactWriter(
  outputDirectory,
  candidateId,
  artifactMode,
  onArtifact,
) {
  if (artifactMode !== "files" && artifactMode !== "memory") {
    fail("--artifact-mode must be files or memory.");
  }
  const rawDirectory = path.join(outputDirectory, "raw-artifacts");
  if (artifactMode === "files") mkdirSync(rawDirectory, { recursive: true });
  return (value, context = {}) => {
    const rawBytes = Buffer.from(`${JSON.stringify(value, null, 2)}\n`);
    const rawHash = sha256(rawBytes);
    const compressedBytes = gzipSync(rawBytes, { level: 6, mtime: 0 });
    const compressedHash = sha256(compressedBytes);
    const relativePath = `raw-artifacts/${compressedHash}.json.gz`;
    const absolutePath = path.join(outputDirectory, relativePath);
    if (artifactMode === "files" && !existsSync(absolutePath)) {
      writeFileSync(absolutePath, compressedBytes);
    }
    const descriptor = {
      artifactKind: context.artifactKind ?? "raw-analytical-result-packet",
      mediaType: "application/json",
      codec: "gzip",
      path: relativePath,
      rawSha256: rawHash,
      compressedSha256: compressedHash,
      rawBytes: rawBytes.length,
      storedBytes: compressedBytes.length,
      candidateId,
      context,
    };
    onArtifact(descriptor);
    return descriptor;
  };
}

function expectedRawArtifactCount(protocol, includeSensitivity) {
  const surfaceArtifactCount =
    protocol.enclosingSurfaces.radii.length *
    (
      protocol.completeCycle.primary.timeSamples +
      protocol.completeCycle.refined.timeSamples
    );
  const baseArtifactCount = surfaceArtifactCount + 2 + 2 + 1;
  const sensitivityArtifactCount = includeSensitivity
    ? 4 * (1 + surfaceArtifactCount + 1)
    : 0;
  return baseArtifactCount + sensitivityArtifactCount;
}

function computeImplementationInventory() {
  const files = COMPUTE_IMPLEMENTATION_FILES.map((relativePath) => {
    const bytes = readFileSync(path.join(REPOSITORY_ROOT, relativePath));
    return {
      path: relativePath,
      sha256: sha256(bytes),
      bytes: bytes.length,
    };
  });
  const digest = createHash("sha256");
  for (const row of files) {
    digest.update(`${row.path}\0${row.sha256}\0${row.bytes}\0`);
  }
  return { implementationHash: digest.digest("hex"), files };
}

function candidateWorkerRun(data) {
  const results = [];
  const workerStarted = beginMeasurement();
  const totalRawArtifacts = expectedRawArtifactCount(
    data.protocol,
    data.includeSensitivity,
  );
  for (const candidate of data.candidates) {
    const candidateIndex = candidate.index;
    const candidateId = candidate.declaration.candidateId;
    const candidateDirectory = path.join(data.outputDirectory, candidateId);
    mkdirSync(candidateDirectory, { recursive: true });
    const candidateStarted = beginMeasurement();
    const sourceHash = sha256(Buffer.from(candidate.specBytes));
    const exactSource = validateExactPrescribedSourceRecord(
      createPrescribedBraidExactSourceRecord(candidate.spec, {
        sourceHash,
        generatingSpec: candidate.declaration.specPath,
      }),
    );
    const rawArtifacts = [];
    const stageTimings = [];
    let currentStage = null;
    let stageStartedAt = performance.now();
    const onRawPacket = workerRawArtifactWriter(
      candidateDirectory,
      candidateId,
      data.artifactMode,
      (descriptor) => {
        rawArtifacts.push(descriptor);
        if (rawArtifacts.length === 1 || rawArtifacts.length % 12 === 0) {
          parentPort?.postMessage({
            type: "heartbeat",
            workerIndex: data.workerIndex,
            candidateId,
            phase: descriptor.context.stage,
            completedWork: rawArtifacts.length,
            totalWork: totalRawArtifacts,
            outputPath: data.outputDirectory,
          });
        }
      },
    );
    const packet = evaluateCompleteCycleCandidate({
      candidateId,
      sourceRecord: exactSource,
      sourceSpec: candidate.spec,
      completeCycleProtocol: data.protocol,
      includeSensitivity: data.includeSensitivity,
      sourceOptions: {
        sourceHash,
        generatingSpec: candidate.declaration.specPath,
      },
      onRawPacket,
      onProgress(progress) {
        const now = performance.now();
        if (currentStage !== null && progress.stage !== currentStage) {
          stageTimings.push({
            stage: currentStage,
            wallSeconds: (now - stageStartedAt) / 1_000,
          });
          stageStartedAt = now;
        }
        currentStage = progress.stage;
      },
    });
    if (currentStage !== null) {
      stageTimings.push({
        stage: currentStage,
        wallSeconds: (performance.now() - stageStartedAt) / 1_000,
      });
    }
    const packetBytes = Buffer.from(`${JSON.stringify(packet, null, 2)}\n`);
    writeFileSync(
      path.join(candidateDirectory, "candidate-result.json"),
      packetBytes,
    );
    const inventoryDigest = createHash("sha256");
    for (const row of [...rawArtifacts].sort(
      (left, right) => left.compressedSha256.localeCompare(right.compressedSha256),
    )) {
      inventoryDigest.update(
        `${row.compressedSha256}\0${row.rawSha256}\0${row.storedBytes}\0`,
      );
    }
    results.push({
      candidateIndex,
      candidateId,
      sourceHash,
      protocolHash: packet.completeCycleProtocolHash,
      resultHash: packet.resultHash,
      status: packet.status.code,
      accepted: packet.status.accepted,
      rawArtifactCount: rawArtifacts.length,
      rawBytes: rawArtifacts.reduce((sum, row) => sum + row.rawBytes, 0),
      storedBytes: rawArtifacts.reduce((sum, row) => sum + row.storedBytes, 0),
      rawInventoryHash: inventoryDigest.digest("hex"),
      rawArtifacts,
      packetSha256: sha256(packetBytes),
      stageTimings,
      measurements: endMeasurement(candidateStarted),
    });
  }
  return {
    workerIndex: data.workerIndex,
    artifactMode: data.artifactMode,
    candidateCount: results.length,
    results,
    measurements: endMeasurement(workerStarted),
  };
}

function loadUnreviewedMethodologyPerformanceFixture(registryPath) {
  const registryBytes = readFileSync(registryPath);
  const registry = JSON.parse(registryBytes.toString("utf8"));
  if (!Array.isArray(registry.candidates) ||
      typeof registry.generatedCampaign?.protocolPath !== "string" ||
      typeof registry.generatedCampaign?.methodologyCoveragePath !== "string") {
    fail("unreviewed methodology performance registry is incomplete.");
  }
  const coveragePath = path.resolve(
    REPOSITORY_ROOT,
    registry.generatedCampaign.methodologyCoveragePath,
  );
  const coverageBytes = readFileSync(coveragePath);
  const coverage = JSON.parse(coverageBytes.toString("utf8"));
  const methodologyPath = path.resolve(
    REPOSITORY_ROOT,
    coverage.methodology?.path ?? "",
  );
  const methodologyBytes = readFileSync(methodologyPath);
  const protocolPath = path.resolve(
    REPOSITORY_ROOT,
    registry.generatedCampaign.protocolPath,
  );
  const protocolBytes = readFileSync(protocolPath);
  const protocol = JSON.parse(protocolBytes.toString("utf8"));
  const candidates = registry.candidates.map((declaration) => {
    const specPath = path.resolve(REPOSITORY_ROOT, declaration.specPath);
    const specBytes = readFileSync(specPath);
    return {
      declaration,
      spec: JSON.parse(specBytes.toString("utf8")),
      specBytes,
    };
  });
  return {
    registryBytes,
    registryHash: sha256(registryBytes),
    coverageBytes,
    coverageFileSha256: sha256(coverageBytes),
    methodologySha256: sha256(methodologyBytes),
    protocolBytes,
    protocol,
    candidates,
    methodologyCoverageStatus:
      "unreviewed-methodology-performance-fixture-only",
  };
}

function loadCandidateComputeFixture(
  registryPath,
  candidateLimit,
  allowUnreviewedMethodologyPerformanceFixture,
  candidateSelection,
) {
  let loaded;
  try {
    loaded = loadAllCandidateCampaignRegistry(registryPath);
    loaded.methodologyCoverageStatus = "reviewed-production-contract";
  } catch (error) {
    if (!allowUnreviewedMethodologyPerformanceFixture ||
        !String(error?.message).includes("requires an explicit analytical coverage impact review")) {
      throw error;
    }
    loaded = loadUnreviewedMethodologyPerformanceFixture(registryPath);
  }
  const candidates = loaded.candidates.map((candidate, index) => ({
    index,
    candidateId: candidate.declaration.candidateId,
    declaration: candidate.declaration,
    spec: candidate.spec,
    specBytes: Buffer.from(candidate.specBytes),
  }));
  if (!["evenly-spaced", "first"].includes(candidateSelection)) {
    fail("--candidate-selection must be evenly-spaced or first.");
  }
  const selectedCandidates = candidateSelection === "first"
    ? candidates.slice(0, Math.min(candidateLimit, candidates.length))
    : evenlySpaced(candidates, Math.min(candidateLimit, candidates.length));
  const digest = createHash("sha256");
  digest.update(loaded.registryBytes);
  digest.update(loaded.coverageBytes);
  digest.update(loaded.protocolBytes);
  for (const candidate of selectedCandidates) {
    digest.update(candidate.candidateId);
    digest.update(candidate.specBytes);
  }
  return {
    fixtureHash: digest.digest("hex"),
    registryHash: loaded.registryHash,
    coverageFileSha256:
      loaded.coverageFileSha256 ?? sha256(loaded.coverageBytes),
    methodologySha256: loaded.methodologySha256,
    methodologyCoverageStatus: loaded.methodologyCoverageStatus,
    candidateSelection,
    protocolFileSha256: sha256(loaded.protocolBytes),
    selectedCandidates,
    selection: selectedCandidates.map(({ index, candidateId, specBytes }) => ({
      index,
      candidateId,
      specFileSha256: sha256(specBytes),
    })),
    protocol: loaded.protocol,
  };
}

function partitionCandidates(selection, workerCount) {
  const partitions = Array.from(
    { length: Math.min(workerCount, selection.length) },
    () => [],
  );
  selection.forEach((candidate, index) => {
    partitions[index % partitions.length].push(candidate);
  });
  return partitions;
}

function candidateOutputDigest(workerResults) {
  const rows = workerResults
    .flatMap((worker) => worker.results)
    .sort((left, right) => left.candidateId.localeCompare(right.candidateId));
  const digest = createHash("sha256");
  for (const row of rows) {
    digest.update(
      `${row.candidateId}\0${row.sourceHash}\0${row.protocolHash}\0` +
      `${row.resultHash}\0${row.rawInventoryHash}\0${row.packetSha256}\0`,
    );
  }
  return {
    outputHash: digest.digest("hex"),
    candidates: rows.map(({ rawArtifacts: omitted, ...row }) => {
      void omitted;
      return row;
    }),
  };
}

function deterministicMergeWorkerOutputs(runDirectory, workerResults, artifactMode) {
  if (artifactMode === "memory") {
    return {
      mode: "not-applicable-memory-artifact-mode",
      wallSeconds: 0,
      rawSourceBytesRead: 0,
      mergedBytesWritten: 0,
      uniqueRawArtifactCount: 0,
      candidatePacketCount: 0,
      mergeInventoryHash: null,
    };
  }
  const startedAt = performance.now();
  const mergedDirectory = path.join(runDirectory, "deterministic-merge");
  const mergedRawDirectory = path.join(mergedDirectory, "raw-artifacts");
  const mergedPacketDirectory = path.join(mergedDirectory, "packets");
  mkdirSync(mergedRawDirectory, { recursive: true });
  mkdirSync(mergedPacketDirectory, { recursive: true });
  const inventoryDigest = createHash("sha256");
  let rawSourceBytesRead = 0;
  let mergedBytesWritten = 0;
  let uniqueRawArtifactCount = 0;
  let candidatePacketCount = 0;
  const rows = workerResults.flatMap((worker) =>
    worker.results.map((result) => ({
      workerIndex: worker.workerIndex,
      result,
    })),
  ).sort(
    (left, right) => left.result.candidateIndex - right.result.candidateIndex,
  );
  for (const { workerIndex, result } of rows) {
    const candidateDirectory = path.join(
      runDirectory,
      `worker-${workerIndex}`,
      result.candidateId,
    );
    const packetBytes = readFileSync(
      path.join(candidateDirectory, "candidate-result.json"),
    );
    if (sha256(packetBytes) !== result.packetSha256) {
      fail(`candidate packet ${result.candidateId} changed before merge.`);
    }
    const packetPath = path.join(
      mergedPacketDirectory,
      `${String(result.candidateIndex).padStart(4, "0")}-${result.candidateId}.json`,
    );
    writeFileSync(packetPath, packetBytes, { flag: "wx" });
    mergedBytesWritten += packetBytes.length;
    candidatePacketCount += 1;
    inventoryDigest.update(
      `packet\0${result.candidateIndex}\0${result.candidateId}\0` +
      `${result.packetSha256}\0${packetBytes.length}\0`,
    );
    for (const descriptor of [...result.rawArtifacts].sort(
      (left, right) =>
        left.compressedSha256.localeCompare(right.compressedSha256),
    )) {
      const sourcePath = path.join(candidateDirectory, descriptor.path);
      const bytes = readFileSync(sourcePath);
      rawSourceBytesRead += bytes.length;
      if (bytes.length !== descriptor.storedBytes ||
          sha256(bytes) !== descriptor.compressedSha256) {
        fail(`raw artifact ${descriptor.compressedSha256} changed before merge.`);
      }
      const destinationPath = path.join(
        mergedRawDirectory,
        `${descriptor.compressedSha256}.json.gz`,
      );
      if (existsSync(destinationPath)) {
        if (!readFileSync(destinationPath).equals(bytes)) {
          fail(`raw artifact collision ${descriptor.compressedSha256}.`);
        }
      } else {
        writeFileSync(destinationPath, bytes, { flag: "wx" });
        mergedBytesWritten += bytes.length;
        uniqueRawArtifactCount += 1;
      }
      inventoryDigest.update(
        `raw\0${descriptor.compressedSha256}\0${descriptor.rawSha256}\0` +
        `${descriptor.storedBytes}\0`,
      );
    }
  }
  return {
    mode: "registry-ordered-byte-verified-copy",
    wallSeconds: (performance.now() - startedAt) / 1_000,
    rawSourceBytesRead,
    mergedBytesWritten,
    uniqueRawArtifactCount,
    candidatePacketCount,
    mergeInventoryHash: inventoryDigest.digest("hex"),
  };
}

async function candidateComputeOnce(options, fixture, workerCount, label) {
  const implementationBefore = computeImplementationInventory();
  if (implementationBefore.implementationHash !== fixture.implementationHash) {
    fail(
      `candidate implementation changed from ${fixture.implementationHash} to ` +
      `${implementationBefore.implementationHash} before ${label}.`,
    );
  }
  mkdirSync(options.workRoot, { recursive: true });
  const runDirectory = mkdtempSync(path.join(options.workRoot, `${label}-`));
  const partitions = partitionCandidates(
    fixture.selectedCandidates,
    workerCount,
  );
  const measurement = beginMeasurement();
  const rssSamples = [process.memoryUsage.rss()];
  const rssTimer = setInterval(() => rssSamples.push(process.memoryUsage.rss()), 50);
  const workers = partitions.map((candidates, workerIndex) =>
    new Promise((resolve, reject) => {
      const worker = new Worker(SCRIPT_PATH, {
        workerData: {
          kind: "candidate-compute",
          workerIndex,
          candidates,
          protocol: fixture.protocol,
          outputDirectory: path.join(runDirectory, `worker-${workerIndex}`),
          includeSensitivity: options.includeSensitivity,
          artifactMode: options.artifactMode,
        },
      });
      worker.on("message", (message) => {
        if (message.type === "heartbeat") {
          emitHeartbeat({
            phase: "candidate-compute",
            workers: partitions.length,
            ...message,
            wallSeconds: (performance.now() - measurement.wallStarted) / 1_000,
          });
        } else if (message.type === "result") {
          resolve(message.result);
        } else if (message.type === "error") {
          reject(new Error(message.error));
        }
      });
      worker.on("error", reject);
      worker.on("exit", (code) => {
        if (code !== 0) reject(new Error(`candidate worker exited with code ${code}.`));
      });
    }));
  try {
    const workerResults = await Promise.all(workers);
    sampleRss(measurement);
    measurement.peakRssBytes = Math.max(
      measurement.peakRssBytes,
      ...rssSamples,
    );
    const output = candidateOutputDigest(workerResults);
    const deterministicMerge = deterministicMergeWorkerOutputs(
      runDirectory,
      workerResults,
      options.artifactMode,
    );
    const implementationAfter = computeImplementationInventory();
    if (implementationAfter.implementationHash !== fixture.implementationHash) {
      fail(
        `candidate implementation changed from ${fixture.implementationHash} to ` +
        `${implementationAfter.implementationHash} during ${label}.`,
      );
    }
    const measured = endMeasurement(measurement);
    return {
      workerCount: partitions.length,
      requestedWorkerCount: workerCount,
      includeSensitivity: options.includeSensitivity,
      artifactMode: options.artifactMode,
      measurements: measured,
      cpuCoreEquivalent:
        (measured.userCpuSeconds + measured.systemCpuSeconds) / measured.wallSeconds,
      outputHash: output.outputHash,
      candidates: output.candidates,
      deterministicMerge,
      workerResults: workerResults.map((worker) => ({
        ...worker,
        results: worker.results.map(({ rawArtifacts: omitted, ...result }) => {
          void omitted;
          return result;
        }),
      })),
      runDirectory: options.keepArtifacts ? runDirectory : null,
    };
  } finally {
    clearInterval(rssTimer);
    if (!options.keepArtifacts) rmSync(runDirectory, { recursive: true, force: true });
  }
}

function summarizeCandidateRuns(runs, serialMedian) {
  const wall = runs.map((run) => run.measurements.wallSeconds);
  const cpu = runs.map(
    (run) => run.measurements.userCpuSeconds + run.measurements.systemCpuSeconds,
  );
  const cores = runs.map((run) => run.cpuCoreEquivalent);
  const peak = runs.map((run) => run.measurements.peakRssBytes);
  const mergeWall = runs.map((run) => run.deterministicMerge.wallSeconds);
  const mergedBytes = runs.map(
    (run) => run.deterministicMerge.mergedBytesWritten,
  );
  const wallMedian = median(wall);
  return {
    repetitions: runs.length,
    wallSeconds: {
      median: wallMedian,
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
    cpuCoreEquivalent: {
      median: median(cores),
      minimum: Math.min(...cores),
      maximum: Math.max(...cores),
      individual: cores,
    },
    peakRssBytes: {
      median: median(peak),
      minimum: Math.min(...peak),
      maximum: Math.max(...peak),
      individual: peak,
    },
    deterministicMerge: {
      wallSeconds: {
        median: median(mergeWall),
        minimum: Math.min(...mergeWall),
        maximum: Math.max(...mergeWall),
        individual: mergeWall,
      },
      mergedBytesWritten: {
        median: median(mergedBytes),
        individual: mergedBytes,
      },
      mode: runs[0].deterministicMerge.mode,
    },
    speedupVsSerialMedian: serialMedian == null ? 1 : serialMedian / wallMedian,
    efficiency: serialMedian == null
      ? 1
      : (serialMedian / wallMedian) / runs[0].workerCount,
  };
}

async function benchmarkCandidateWorkers(options) {
  const fixture = loadCandidateComputeFixture(
    options.registryPath,
    options.candidateLimit,
    options.allowUnreviewedMethodologyPerformanceFixture,
    options.candidateSelection,
  );
  const implementation = computeImplementationInventory();
  fixture.implementationHash = implementation.implementationHash;
  fixture.implementationFiles = implementation.files;
  const totalRuns =
    options.workerCounts.length * (options.warmups + options.repetitions);
  const matrixStarted = performance.now();
  let completed = 0;
  const experiments = [];
  let referenceOutputHash = null;
  let referenceMergeInventoryHash = null;
  let serialMedian = null;
  for (const workerCount of options.workerCounts) {
    for (let index = 0; index < options.warmups; index += 1) {
      await candidateComputeOnce(
        { ...options, keepArtifacts: false },
        fixture,
        workerCount,
        `compute-${workerCount}-warmup-${index + 1}`,
      );
      completed += 1;
      emitHeartbeat({
        phase: "candidate-worker-matrix",
        workers: workerCount,
        repetition: `warmup-${index + 1}`,
        completedWork: completed,
        totalWork: totalRuns,
        wallSeconds: (performance.now() - matrixStarted) / 1_000,
        outputPath: options.output,
      });
    }
    const runs = [];
    for (let index = 0; index < options.repetitions; index += 1) {
      const run = await candidateComputeOnce(
        options,
        fixture,
        workerCount,
        `compute-${workerCount}-run-${index + 1}`,
      );
      if (referenceOutputHash === null) referenceOutputHash = run.outputHash;
      if (run.outputHash !== referenceOutputHash) {
        fail(
          `candidate-worker output ${run.outputHash} differs from ` +
          `serial reference ${referenceOutputHash}.`,
        );
      }
      if (run.deterministicMerge.mergeInventoryHash !== null) {
        if (referenceMergeInventoryHash === null) {
          referenceMergeInventoryHash =
            run.deterministicMerge.mergeInventoryHash;
        } else if (
          run.deterministicMerge.mergeInventoryHash !==
          referenceMergeInventoryHash
        ) {
          fail(
            `candidate-worker merged artifact inventory ` +
            `${run.deterministicMerge.mergeInventoryHash} differs from ` +
            `reference ${referenceMergeInventoryHash}.`,
          );
        }
      }
      runs.push(run);
      completed += 1;
      emitHeartbeat({
        phase: "candidate-worker-matrix",
        workers: workerCount,
        repetition: index + 1,
        completedWork: completed,
        totalWork: totalRuns,
        wallSeconds: (performance.now() - matrixStarted) / 1_000,
        outputPath: options.output,
      });
    }
    const summary = summarizeCandidateRuns(runs, serialMedian);
    if (workerCount === 1) serialMedian = summary.wallSeconds.median;
    else {
      summary.speedupVsSerialMedian = serialMedian / summary.wallSeconds.median;
      summary.efficiency =
        summary.speedupVsSerialMedian /
        Math.min(workerCount, fixture.selectedCandidates.length);
    }
    experiments.push({
      workerCount,
      warmupCount: options.warmups,
      summary,
      runs,
    });
  }
  return {
    fixture: {
      fixtureHash: fixture.fixtureHash,
      registryHash: fixture.registryHash,
      coverageFileSha256: fixture.coverageFileSha256,
      methodologySha256: fixture.methodologySha256,
      methodologyCoverageStatus: fixture.methodologyCoverageStatus,
      candidateSelection: fixture.candidateSelection,
      protocolFileSha256: fixture.protocolFileSha256,
      implementationHash: fixture.implementationHash,
      implementationFiles: fixture.implementationFiles,
      selection: fixture.selection,
    },
    includeSensitivity: options.includeSensitivity,
    artifactMode: options.artifactMode,
    equivalenceBoundary: options.includeSensitivity
      ? "full configured candidate packets compared across worker counts"
      : "source-sensitivity intentionally omitted for a lower-cost scalability fixture; outputs are compared only within this fixture",
    outputHash: referenceOutputHash,
    mergeInventoryHash: referenceMergeInventoryHash,
    experiments,
  };
}

function profiledProductionQuery(database, sql, parameters) {
  return queryLatency(database, sql, parameters);
}

function productionQueryProfile(database) {
  const raw = database.prepare(`
    SELECT manifest_hash, candidate_id, compressed_hash
    FROM analytical_raw_artifact ORDER BY compressed_hash LIMIT 1
  `).get();
  const gate = database.prepare(`
    SELECT result_hash, gate_id, gate_instrument_version
    FROM validity_gate_result
    ORDER BY result_hash, gate_id, gate_instrument_version LIMIT 1
  `).get();
  const metric = database.prepare(`
    SELECT measure_id, COUNT(*) AS matching_row_count
    FROM multidimensional_measure
    GROUP BY measure_id
    ORDER BY matching_row_count DESC, measure_id
    LIMIT 1
  `).get();
  return {
    candidate: profiledProductionQuery(
      database,
      `SELECT compressed_hash FROM analytical_raw_artifact
       WHERE manifest_hash = ? AND candidate_id = ?
       ORDER BY artifact_kind, compressed_hash`,
      [raw.manifest_hash, raw.candidate_id],
    ),
    artifact: profiledProductionQuery(
      database,
      "SELECT * FROM analytical_raw_artifact WHERE compressed_hash = ?",
      [raw.compressed_hash],
    ),
    gate: profiledProductionQuery(
      database,
      `SELECT * FROM validity_gate_result
       WHERE result_hash = ? AND gate_id = ? AND gate_instrument_version = ?`,
      [gate.result_hash, gate.gate_id, gate.gate_instrument_version],
    ),
    metric: {
      measureId: metric.measure_id,
      matchingRowCount: Number(metric.matching_row_count),
      ...profiledProductionQuery(
        database,
        `SELECT row_hash, scalar_value FROM multidimensional_measure
         WHERE measure_id = ? ORDER BY scalar_value`,
        [metric.measure_id],
      ),
    },
    root: profiledProductionQuery(
      database,
      `SELECT row_hash, scalar_value FROM multidimensional_measure
       WHERE transmitter_id IS NOT NULL AND root_ordinal IS NOT NULL
       ORDER BY transmitter_id, root_ordinal LIMIT 32`,
      [],
    ),
    sensitivity: profiledProductionQuery(
      database,
      `SELECT row_hash, scalar_value FROM multidimensional_measure
       WHERE sensitivity_coordinate IS NOT NULL
       ORDER BY sensitivity_coordinate, stencil LIMIT 32`,
      [],
    ),
  };
}

function productionInventory(databasePath, options = {}) {
  const includeColumnLogicalBytes = options.includeColumnLogicalBytes !== false;
  const includeQueryProfile = options.includeQueryProfile !== false;
  const database = openReadOnly(databasePath);
  try {
    const objects = databaseObjectSizes(database);
    const tables = database.prepare(`
      SELECT name FROM sqlite_schema
      WHERE type = 'table' AND name NOT LIKE 'sqlite_%'
      ORDER BY name
    `).all().map((row) => {
      const columns = database.prepare(`PRAGMA table_info("${row.name}")`).all();
      const columnExpressions = columns.map((column, index) => {
        const identifier = `"${String(column.name).replaceAll("\"", "\"\"")}"`;
        const type = String(column.type).toUpperCase();
        const logicalExpression = type.includes("INT") || type.includes("REAL") ||
            type.includes("NUM") || type.includes("FLOA") ||
            type.includes("DOUB")
          ? `CASE WHEN ${identifier} IS NULL THEN 0 ELSE 8 END`
          : `COALESCE(length(${identifier}), 0)`;
        return {
          name: column.name,
          logicalAlias: `logical_${index}`,
          nullAlias: `null_${index}`,
          logicalExpression,
          identifier,
        };
      });
      const count = Number(database.prepare(
        `SELECT COUNT(*) AS count FROM "${row.name}"`,
      ).get().count);
      const columnStats = !includeColumnLogicalBytes || columnExpressions.length === 0
        ? {}
        : database.prepare(`
          SELECT ${columnExpressions.flatMap((column) => [
            `COALESCE(SUM(${column.logicalExpression}), 0) AS "${column.logicalAlias}"`,
            `COALESCE(SUM(CASE WHEN ${column.identifier} IS NULL THEN 1 ELSE 0 END), 0) AS "${column.nullAlias}"`,
          ]).join(", ")}
          FROM "${row.name}"
        `).get();
      const columnLogicalBytes = includeColumnLogicalBytes
        ? columnExpressions.map((column) => ({
            column: column.name,
            logicalBytes: Number(columnStats[column.logicalAlias] ?? 0),
            nullCount: Number(columnStats[column.nullAlias] ?? 0),
          }))
        : null;
      const logicalBytes = columnLogicalBytes?.reduce(
        (sum, column) => sum + column.logicalBytes,
        0,
      ) ?? null;
      return {
        table: row.name,
        rowCount: count,
        logicalBytes,
        storedBytes: objects.find((entry) => entry.name === row.name)?.bytes ?? null,
        columns: columnLogicalBytes,
      };
    });
    const indexes = objects.filter((entry) =>
      !tables.some((table) => table.table === entry.name) &&
      entry.name !== "sqlite_schema");
    const raw = database.prepare(`
      SELECT COUNT(*) AS artifact_count, SUM(raw_bytes) AS raw_bytes,
             SUM(stored_bytes) AS stored_bytes
      FROM analytical_raw_artifact
    `).get();
    const statementModel = {
      grade: "derived-from-live-control-flow-and-row-counts",
      currentLoader: {
        rawArtifactInsertStatements: Number(raw.artifact_count) * 2,
        rawArtifactStatementPreparations: Number(raw.artifact_count) * 2,
        multidimensionalMeasureInsertStatements: Number(database.prepare(
          "SELECT COUNT(*) AS count FROM multidimensional_measure",
        ).get().count),
        multidimensionalMeasureStatementPreparations: Number(database.prepare(
          "SELECT COUNT(*) AS count FROM multidimensional_measure",
        ).get().count),
        rawArtifactTransactionCount: 1,
        candidateBatchTransactionCount: Math.ceil(
          Number(database.prepare(
            "SELECT COUNT(*) AS count FROM campaign_case",
          ).get().count) / 32,
        ),
        importStrategy:
          "one INSERT per row inside explicit transactions; no multi-row SQL and no SQLite bulk-load API",
        insertAttemptsByTable: {
          schema_migration: 3,
          artifact: Number(database.prepare(
            "SELECT COUNT(*) AS count FROM artifact",
          ).get().count),
          source_record: Number(database.prepare(
            "SELECT COUNT(*) AS count FROM campaign_case",
          ).get().count),
          analysis_protocol: 1 + Number(database.prepare(
            "SELECT COUNT(*) AS count FROM campaign_case",
          ).get().count),
          campaign_manifest: 1,
          campaign_summary: 1,
          methodology_coverage: 1,
          analytical_raw_artifact: Number(raw.artifact_count),
          configuration: Number(database.prepare(
            "SELECT COUNT(*) AS count FROM configuration",
          ).get().count),
          case_result: Number(database.prepare(
            "SELECT COUNT(*) AS count FROM case_result",
          ).get().count),
          observation_event: Number(database.prepare(
            "SELECT COUNT(*) AS count FROM observation_event",
          ).get().count),
          case_reduced_measure: Number(database.prepare(
            "SELECT COUNT(*) AS count FROM case_reduced_measure",
          ).get().count),
          multidimensional_measure: Number(database.prepare(
            "SELECT COUNT(*) AS count FROM multidimensional_measure",
          ).get().count),
          validity_gate_result: Number(database.prepare(
            "SELECT COUNT(*) AS count FROM validity_gate_result",
          ).get().count),
          case_acceptance: Number(database.prepare(
            "SELECT COUNT(*) AS count FROM case_acceptance",
          ).get().count),
          campaign_case: Number(database.prepare(
            "SELECT COUNT(*) AS count FROM campaign_case",
          ).get().count),
          ingest_batch: 3,
          campaign_acceptance: 1,
          database_generation: 1,
          database_generation_case: Number(database.prepare(
            "SELECT COUNT(*) AS count FROM database_generation_case",
          ).get().count),
        },
      },
    };
    return {
      databasePath: path.resolve(databasePath),
      databaseBytes: fileSize(databasePath),
      walBytes: fileSize(`${databasePath}-wal`),
      pageSize: Number(database.prepare("PRAGMA page_size").get().page_size),
      pageCount: Number(database.prepare("PRAGMA page_count").get().page_count),
      tables,
      indexes,
      rawArtifacts: {
        artifactCount: Number(raw.artifact_count),
        rawBytes: Number(raw.raw_bytes),
        storedBytes: Number(raw.stored_bytes),
        compressionRatio: Number(raw.stored_bytes) / Number(raw.raw_bytes),
      },
      statementModel,
      queryProfile: includeQueryProfile
        ? productionQueryProfile(database)
        : null,
    };
  } finally {
    database.close();
  }
}

function writeReport(report, outputPath) {
  const bytes = `${JSON.stringify(report, null, 2)}\n`;
  if (outputPath) {
    mkdirSync(path.dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, bytes);
    process.stdout.write(`${JSON.stringify({
      schema: report.schema,
      command: report.command,
      outputPath,
      fixture: report.fixture
        ? {
            fixture: report.fixture.fixture,
            fixtureHash: report.fixture.fixtureHash,
            rawArtifactCount: report.fixture.rawArtifactCount,
            measureCount: report.fixture.measureCount,
            validityGateCount: report.fixture.validityGateCount,
          }
        : null,
      experimentCount: report.experiments?.length ?? 0,
      computeExperimentCount: report.compute?.experiments?.length ?? 0,
      formats: report.formats ? Object.keys(report.formats.summary) : [],
      completedAt: report.completedAt,
    }, null, 2)}\n`);
    return;
  }
  process.stdout.write(bytes);
}

function help() {
  return {
    usage: [
      "node scripts/eom/benchmark-analytical-campaign-pipeline.mjs inventory [--fixture small|medium|representative-large|full] [--inventory-mode full] [--output report.json]",
      "node scripts/eom/benchmark-analytical-campaign-pipeline.mjs ingest --fixture small --variants current,direct-compressed,prepared,post-index [--warmups 1] [--repetitions 3] [--output report.json]",
      "node scripts/eom/benchmark-analytical-campaign-pipeline.mjs formats --fixture medium [--output report.json]",
      "node scripts/eom/benchmark-analytical-campaign-pipeline.mjs compute --candidate-limit 4 --candidate-selection evenly-spaced|first --workers 1,2,4 --include-sensitivity false [--warmups 1] [--repetitions 3] [--allow-unreviewed-methodology-performance-fixture] [--output report.json]",
      "node scripts/eom/benchmark-analytical-campaign-pipeline.mjs all --fixture small [--output report.json]",
    ],
    safety:
      "The source database is opened read-only. All writes go to unique directories under --work-root, which defaults to /private/tmp.",
    inventoryModes: {
      full: "Row counts, SQLite object bytes, one-scan per-column logical-byte/null inventory, and indexed query latency/plans.",
      summary: "Row counts and SQLite object bytes without scanning payload columns.",
      none: "Skip production inventory; compute uses this by default to avoid cache pollution.",
    },
    fixtures: FIXTURE_LIMITS,
    variants: Object.fromEntries(Object.keys(VARIANTS).map((name) => [
      name,
      resolvedVariant(name),
    ])),
  };
}

export {
  FIXTURE_LIMITS,
  VARIANTS,
  buildFixtureInventory,
  productionInventory,
  resolvedVariant,
  stratifiedRawSelection,
};

async function runCli() {
  const options = parseArguments(process.argv.slice(2));
  if (options.command === "help" || options.command === "--help") {
    writeReport(help(), options.output);
    return;
  }
  if (!existsSync(options.sourceDatabase)) {
    fail(`source database does not exist: ${options.sourceDatabase}`);
  }
  if (options.command === "ingest-once-internal") {
    if (!options.variantName || !options.runLabel) {
      fail("ingest-once-internal requires --variant and --label.");
    }
    const fixture = buildFixtureInventory(options.sourceDatabase, options.fixture);
    if (options.expectedFixtureHash &&
        fixture.fixtureHash !== options.expectedFixtureHash) {
      fail(
        `internal fixture ${fixture.fixtureHash} differs from expected ` +
        `${options.expectedFixtureHash}.`,
      );
    }
    writeReport(runIngestOnce({
      sourceDatabase: options.sourceDatabase,
      fixture,
      variant: resolvedVariant(options.variantName),
      workRoot: options.workRoot,
      label: options.runLabel,
      keepArtifacts: options.keepArtifacts,
      includeExport: options.includeExport,
    }), null);
    return;
  }
  const startedAt = new Date().toISOString();
  const fixture = options.command === "compute"
    ? null
    : buildFixtureInventory(options.sourceDatabase, options.fixture);
  const report = {
    schema: REPORT_SCHEMA,
    harnessVersion: HARNESS_VERSION,
    startedAt,
    command: options.command,
    sourceReadOnly: true,
    runtimeContext: {
      platform: process.platform,
      release: os.release(),
      architecture: process.arch,
      cpuModel: os.cpus()[0]?.model ?? null,
      logicalCpuCount: os.cpus().length,
      totalMemoryBytes: os.totalmem(),
      node: process.version,
      sqlite: process.versions.sqlite,
      zlib: process.versions.zlib,
    },
    productionInventory: options.inventoryMode === "none"
      ? null
      : productionInventory(options.sourceDatabase, {
          includeColumnLogicalBytes: options.inventoryMode === "full",
          includeQueryProfile: options.inventoryMode === "full",
        }),
    fixture: fixture
      ? {
        ...fixture,
        rawArtifacts: fixture.rawArtifacts.map(
        ({ compressedHash, rawHash, artifactHash, ...row }) => ({
          ...row,
          compressedHash,
          rawHash,
          artifactHash,
        }),
      ),
        measures: fixture.measures,
      }
      : null,
    experiments: null,
    formats: null,
    compute: null,
  };
  if (options.command === "ingest" || options.command === "all") {
    report.experiments = benchmarkIngestMatrix(options, fixture);
  }
  if (options.command === "formats" || options.command === "all") {
    report.formats = await benchmarkFormatMatrix(options, fixture);
  }
  if (options.command === "compute") {
    report.compute = await benchmarkCandidateWorkers(options);
  }
  if (!["inventory", "ingest", "formats", "compute", "all"].includes(
    options.command,
  )) {
    fail(`unknown command ${options.command}.`);
  }
  report.completedAt = new Date().toISOString();
  writeReport(report, options.output);
}

if (!isMainThread && workerData?.kind === "candidate-compute") {
  try {
    parentPort.postMessage({
      type: "result",
      result: candidateWorkerRun(workerData),
    });
  } catch (error) {
    parentPort.postMessage({
      type: "error",
      error: error?.stack ?? String(error),
    });
  }
} else if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  await runCli();
}
