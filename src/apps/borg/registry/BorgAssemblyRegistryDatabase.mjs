import { DatabaseSync } from "node:sqlite";
import { validateLibraryBrowseParams, LIBRARY_FACETS } from "../library/BorgLibraryQuery.mjs";
import { exactModelKey, validateBorgAssemblyRegistry } from "./BorgAssemblyRegistryContract.mjs";

export const BORG_ASSEMBLY_REGISTRY_DATABASE_SCHEMA = "borg-assembly-registry-sqlite.v1";
export const BORG_ASSEMBLY_REGISTRY_SQL = `
  PRAGMA foreign_keys = ON;
  CREATE TABLE IF NOT EXISTS registry_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS registry_entry (
    assembly_id TEXT NOT NULL,
    model_revision_sha256 TEXT NOT NULL,
    braid_id TEXT NOT NULL,
    occurrence_id TEXT,
    record_sha256 TEXT NOT NULL UNIQUE,
    record_url TEXT NOT NULL,
    source_spec TEXT NOT NULL,
    label TEXT NOT NULL,
    search_text TEXT NOT NULL,
    summary_json TEXT NOT NULL,
    PRIMARY KEY (assembly_id, model_revision_sha256)
  ) WITHOUT ROWID;
  CREATE INDEX IF NOT EXISTS registry_entry_braid ON registry_entry(braid_id);
  CREATE INDEX IF NOT EXISTS registry_entry_model_hash ON registry_entry(model_revision_sha256);
  CREATE INDEX IF NOT EXISTS registry_entry_record_hash ON registry_entry(record_sha256);
  CREATE INDEX IF NOT EXISTS registry_entry_source ON registry_entry(source_spec);
  CREATE INDEX IF NOT EXISTS registry_entry_page ON registry_entry(label, assembly_id);
  CREATE VIRTUAL TABLE IF NOT EXISTS registry_search USING fts5(assembly_id UNINDEXED, model_revision_sha256 UNINDEXED, search_text, tokenize='unicode61');
  CREATE TABLE IF NOT EXISTS registry_facet (
    assembly_id TEXT NOT NULL,
    model_revision_sha256 TEXT NOT NULL,
    facet_key TEXT NOT NULL,
    facet_value TEXT NOT NULL,
    PRIMARY KEY (assembly_id, model_revision_sha256, facet_key, facet_value),
    FOREIGN KEY (assembly_id, model_revision_sha256) REFERENCES registry_entry(assembly_id, model_revision_sha256) ON DELETE CASCADE
  ) WITHOUT ROWID;
  CREATE INDEX IF NOT EXISTS registry_facet_lookup ON registry_facet(facet_key, facet_value, assembly_id, model_revision_sha256);
  CREATE TABLE IF NOT EXISTS taxonomy_membership (
    membership_id TEXT PRIMARY KEY,
    taxonomy_revision TEXT NOT NULL,
    node_id TEXT NOT NULL,
    braid_id TEXT NOT NULL,
    lifecycle TEXT NOT NULL
  ) WITHOUT ROWID;
`;

export function createBorgAssemblyRegistryDatabase({ path = ":memory:", registry, summaries = [] } = {}) {
  const manifest = validateBorgAssemblyRegistry(registry);
  const database = new DatabaseSync(path);
  database.exec(BORG_ASSEMBLY_REGISTRY_SQL);
  const summaryByKey = new Map(summaries.map((row) => [exactModelKey(row), row]));
  database.exec("BEGIN IMMEDIATE");
  try {
    database.prepare("DELETE FROM registry_facet").run();
    database.prepare("DELETE FROM registry_search").run();
    database.prepare("DELETE FROM registry_entry").run();
    database.prepare("DELETE FROM taxonomy_membership").run();
    const insertEntry = database.prepare(`INSERT INTO registry_entry
      (assembly_id, model_revision_sha256, braid_id, occurrence_id, record_sha256, record_url, source_spec, label, search_text, summary_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    const insertFacet = database.prepare("INSERT INTO registry_facet VALUES (?, ?, ?, ?)");
    const insertSearch = database.prepare("INSERT INTO registry_search VALUES (?, ?, ?)");
    for (const entry of manifest.entries) {
      const summary = summaryByKey.get(exactModelKey(entry)) ?? registryEntrySummary(entry);
      const searchText = [entry.assemblyId, entry.braidId, entry.modelRevisionSha256, entry.recordSha256, entry.sourceSpec, entry.sourceIdentity, entry.label].join(" ").toLowerCase();
      insertEntry.run(entry.assemblyId, entry.modelRevisionSha256, entry.braidId, entry.occurrence?.occurrenceId ?? null,
        entry.recordSha256, entry.recordUrl, entry.sourceSpec, entry.label, searchText, JSON.stringify({ ...summary, braidId: entry.braidId, occurrence: entry.occurrence, taxonomyMemberships: entry.taxonomyMemberships, visualCoverage: entry.visualCoverage }));
      insertSearch.run(entry.assemblyId, entry.modelRevisionSha256, searchText);
      for (const [key, value] of Object.entries(summary.facets ?? {})) for (const item of [].concat(value ?? "unavailable")) insertFacet.run(entry.assemblyId, entry.modelRevisionSha256, key, item);
    }
    const insertMembership = database.prepare("INSERT INTO taxonomy_membership VALUES (?, ?, ?, ?, ?)");
    for (const row of manifest.taxonomy.memberships) insertMembership.run(row.membershipId, manifest.taxonomy.revision, row.nodeId, row.braidId, row.lifecycle);
    database.prepare("INSERT OR REPLACE INTO registry_meta VALUES (?, ?)").run("schema", BORG_ASSEMBLY_REGISTRY_DATABASE_SCHEMA);
    database.prepare("INSERT OR REPLACE INTO registry_meta VALUES (?, ?)").run("revision", manifest.revision);
    database.exec("COMMIT");
  } catch (error) { database.exec("ROLLBACK"); database.close(); throw error; }
  return new BorgAssemblyRegistryDatabase(database, manifest);
}

class BorgAssemblyRegistryDatabase {
  constructor(database, manifest) { this.database = database; this.manifest = manifest; }
  close() { this.database.close(); }
  get count() { return Number(this.database.prepare("SELECT count(*) AS n FROM registry_entry").get().n); }
  getExact(assemblyId, modelRevisionSha256) {
    const row = this.database.prepare("SELECT summary_json FROM registry_entry WHERE assembly_id = ? AND model_revision_sha256 = ?").get(assemblyId, modelRevisionSha256);
    return row ? JSON.parse(row.summary_json) : null;
  }
  findExactByRecord(recordSha256) {
    const row = this.database.prepare("SELECT summary_json FROM registry_entry WHERE record_sha256 = ?").get(recordSha256);
    return row ? JSON.parse(row.summary_json) : null;
  }
  select(params, omitFacet = null) {
    validateLibraryBrowseParams(params);
    const clauses = []; const values = [];
    const query = (params.get("q") ?? "").trim().toLowerCase();
    if (query) {
      if (/^[a-f0-9]{8,64}$/.test(query)) {
        const matches = this.database.prepare(`SELECT count(*) AS n FROM registry_entry WHERE model_revision_sha256 LIKE ? OR record_sha256 LIKE ?`).get(`${query}%`, `${query}%`);
        if (Number(matches.n) > 1) throw new RangeError("Ambiguous hash prefix. Supply a longer model or record hash.");
        clauses.push("(model_revision_sha256 LIKE ? OR record_sha256 LIKE ?)"); values.push(`${query}%`, `${query}%`);
      } else {
        clauses.push("EXISTS (SELECT 1 FROM registry_search s WHERE s.assembly_id = registry_entry.assembly_id AND s.model_revision_sha256 = registry_entry.model_revision_sha256 AND s.search_text MATCH ?)");
        values.push(`\"${query.replaceAll('"', '""')}\"`);
      }
    }
    for (const key of Object.keys(LIBRARY_FACETS)) {
      if (key === omitFacet) continue;
      const selected = params.getAll(key).filter(Boolean);
      if (!selected.length) continue;
      clauses.push(`EXISTS (SELECT 1 FROM registry_facet f WHERE f.assembly_id = registry_entry.assembly_id AND f.model_revision_sha256 = registry_entry.model_revision_sha256 AND f.facet_key = ? AND f.facet_value IN (${selected.map(() => "?").join(",")}))`);
      values.push(key, ...selected);
    }
    const variantSet = params.get("variantSet");
    const sql = `SELECT summary_json FROM registry_entry${clauses.length ? ` WHERE ${clauses.join(" AND ")}` : ""} ORDER BY label, assembly_id`;
    let rows = this.database.prepare(sql).all(...values).map((row) => JSON.parse(row.summary_json));
    if (variantSet) rows = rows.filter((row) => row.variantSet?.id === variantSet);
    return rows;
  }
  lookupHashPrefix(prefix) {
    if (!/^[a-f0-9]{8,64}$/.test(prefix)) throw new RangeError("Hash prefixes require 8 to 64 lowercase hexadecimal characters.");
    const rows = this.database.prepare("SELECT summary_json FROM registry_entry WHERE model_revision_sha256 LIKE ? OR record_sha256 LIKE ? LIMIT 2").all(`${prefix}%`, `${prefix}%`);
    if (rows.length !== 1) return { status: rows.length ? "ambiguous" : "missing", row: null };
    return { status: "exact", row: JSON.parse(rows[0].summary_json) };
  }
}

function registryEntrySummary(entry) {
  return { id: entry.assemblyId, assemblyId: entry.assemblyId, modelRevisionSha256: entry.modelRevisionSha256,
    recordSha256: entry.recordSha256, recordUrl: entry.recordUrl, source: entry.sourceSpec, label: entry.label,
    description: entry.description ?? "Registered assembly model.", facets: entry.facets ?? {}, reasons: entry.facetReasons ?? {} };
}
