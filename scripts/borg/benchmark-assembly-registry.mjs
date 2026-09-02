#!/usr/bin/env node
import { DatabaseSync } from "node:sqlite";
import { mkdir, rm, stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";
import { BORG_ASSEMBLY_REGISTRY_DATABASE_SCHEMA, BORG_ASSEMBLY_REGISTRY_SQL } from "../../src/apps/borg/registry/BorgAssemblyRegistryDatabase.mjs";

const repoRoot = resolve(fileURLToPath(new URL("../../", import.meta.url)));
const readArg = (name, fallback) => { const index = process.argv.indexOf(name); return index < 0 ? fallback : process.argv[index + 1]; };
const count = Number(readArg("--count", "1000000"));
const databasePath = resolve(readArg("--database", "/tmp/borg-assembly-registry-million.sqlite3"));
const reportPath = resolve(readArg("--report", `${repoRoot}/reference/priorities/app-borg/evidence/assembly-registry-million-entry-benchmark.2026-09-01.json`));
if (!Number.isSafeInteger(count) || count < 1) throw new RangeError("--count must be a positive safe integer.");

await rm(databasePath, { force: true });
const database = new DatabaseSync(databasePath);
database.exec("PRAGMA journal_mode = OFF; PRAGMA synchronous = OFF; PRAGMA temp_store = MEMORY;");
database.exec(BORG_ASSEMBLY_REGISTRY_SQL);
const insertEntry = database.prepare("INSERT INTO registry_entry VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
const insertSearch = database.prepare("INSERT INTO registry_search VALUES (?, ?, ?)");
const insertFacet = database.prepare("INSERT INTO registry_facet VALUES (?, ?, ?, ?)");
const started = performance.now();
database.exec("BEGIN IMMEDIATE");
for (let index = 0; index < count; index++) {
  const token = index.toString(16).padStart(8, "0");
  const modelHash = `${token}${"a".repeat(56)}`;
  const recordHash = `${token}${"b".repeat(56)}`;
  const assemblyId = `asm-${modelHash.slice(0, 32)}`;
  const braidToken = (index % 100_000).toString(16).padStart(8, "0");
  const braidId = `brd-${braidToken}${"c".repeat(24)}`;
  const label = `Synthetic assembly ${String(index).padStart(7, "0")}`;
  const source = `synthetic/source/${token}.v1.json`;
  const searchText = `${assemblyId} ${braidId} ${modelHash} ${recordHash} ${source} ${label}`.toLowerCase();
  const summary = JSON.stringify({ assemblyId, modelRevisionSha256: modelHash, recordSha256: recordHash, braidId, label,
    facets: { assemblySpan: index % 3 === 0 ? "2d" : "3d", braidCount: String(index % 3 + 1), breathing: index % 2 ? "yes" : "no", speedPolicy: "unavailable" } });
  insertEntry.run(assemblyId, modelHash, braidId, null, recordHash, `objects/${recordHash}.json`, source, label, searchText, summary);
  insertSearch.run(assemblyId, modelHash, searchText);
  insertFacet.run(assemblyId, modelHash, "assemblySpan", index % 3 === 0 ? "2d" : "3d");
  insertFacet.run(assemblyId, modelHash, "braidCount", String(index % 3 + 1));
  insertFacet.run(assemblyId, modelHash, "breathing", index % 2 ? "yes" : "no");
  insertFacet.run(assemblyId, modelHash, "speedPolicy", "unavailable");
}
database.exec("COMMIT");
database.prepare("INSERT INTO registry_search(registry_search) VALUES('optimize')").run();
database.exec("PRAGMA optimize");
const importMs = performance.now() - started;

function measure(name, fn, repetitions = 25) {
  const samples = [];
  for (let index = 0; index < repetitions; index++) { const start = performance.now(); fn(index); samples.push(performance.now() - start); }
  samples.sort((a, b) => a - b);
  return { name, repetitions, minMs: samples[0], medianMs: samples[Math.floor(samples.length / 2)], p95Ms: samples[Math.floor(samples.length * .95)], maxMs: samples.at(-1) };
}
const targetIndex = count - 1;
const targetToken = targetIndex.toString(16).padStart(8, "0");
const targetModel = `${targetToken}${"a".repeat(56)}`;
const targetRecord = `${targetToken}${"b".repeat(56)}`;
const targetAssembly = `asm-${targetModel.slice(0, 32)}`;
const operations = [
  measure("exact-id-lookup", () => database.prepare("SELECT record_sha256 FROM registry_entry WHERE assembly_id = ? AND model_revision_sha256 = ?").get(targetAssembly, targetModel)),
  measure("full-model-hash-lookup", () => database.prepare("SELECT assembly_id FROM registry_entry WHERE model_revision_sha256 = ?").get(targetModel)),
  measure("unique-prefix-hash-lookup", () => database.prepare("SELECT assembly_id FROM registry_entry WHERE model_revision_sha256 LIKE ? LIMIT 2").all(`${targetToken}%`)),
  measure("facet-filter-count", () => database.prepare("SELECT count(*) AS n FROM registry_facet WHERE facet_key = ? AND facet_value = ?").get("assemblySpan", "2d")),
  measure("text-search", () => database.prepare("SELECT assembly_id FROM registry_search WHERE search_text MATCH ? LIMIT 12").all(`\"synthetic assembly ${String(targetIndex).padStart(7, "0")}\"`)),
  measure("cursor-page", () => database.prepare("SELECT assembly_id, label FROM registry_entry WHERE label > ? ORDER BY label, assembly_id LIMIT 12").all("Synthetic assembly 0500000")),
  measure("record-hash-lookup", () => database.prepare("SELECT assembly_id FROM registry_entry WHERE record_sha256 = ?").get(targetRecord)),
];
const verification = {
  integrityCheck: database.prepare("PRAGMA integrity_check").get().integrity_check,
  exactRows: Number(database.prepare("SELECT count(*) AS n FROM registry_entry").get().n),
  facetRows: Number(database.prepare("SELECT count(*) AS n FROM registry_facet").get().n),
  exactTargetFound: Boolean(database.prepare("SELECT 1 AS ok FROM registry_entry WHERE assembly_id = ? AND model_revision_sha256 = ? AND record_sha256 = ?").get(targetAssembly, targetModel, targetRecord)?.ok),
};
database.close();
const file = await stat(databasePath);
const report = {
  schema: "borg-assembly-registry-million-entry-benchmark.v1",
  instrument: "scripts/borg/benchmark-assembly-registry.mjs",
  registrySchema: BORG_ASSEMBLY_REGISTRY_DATABASE_SCHEMA,
  engineeringCorpus: { kind: "deterministic-synthetic", entries: count, scientificEvidence: false },
  environment: { node: process.version, sqlite: process.versions.sqlite, platform: process.platform, architecture: process.arch },
  import: { wallMs: importMs, entriesPerSecond: count / (importMs / 1000), databaseBytes: file.size },
  operations,
  verification,
  claimBoundary: "Engineering scalability measurement only; synthetic rows establish no assembly geometry, dynamics, retention, stability, binding, or scientific acceptance.",
};
await mkdir(dirname(reportPath), { recursive: true });
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report));
