import { readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { BORG_ASSEMBLY_RECORD_CATALOG } from "../../src/apps/borg/BorgAssemblyRecordCatalog.js";
import { describeLibraryRecord, createLibraryPreview } from "../../src/apps/borg/library/BorgLibraryDescriptors.mjs";
import { queryLibraryRows } from "../../src/apps/borg/library/BorgLibraryQuery.mjs";
import { validateLibraryClassifications } from "../../src/apps/borg/library/BorgLibraryComposition.mjs";
import { validateBorgScientificStatusProjection } from "../../src/apps/borg/BorgScientificStatus.mjs";

const digest = (data) => createHash("sha256").update(data).digest("hex");
const send = (res, status, data) => { res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }); res.end(JSON.stringify(data)); };

// Read-only seed-catalog provider. No new record, geometry, or migration output
// is written. Replace this provider with the indexed registry for full BORG-014.
export function createBorgLibraryService({ repoRoot, catalog = BORG_ASSEMBLY_RECORD_CATALOG.entries, classificationFile = "reference/priorities/app-borg/library-classifications.v4.json", scientificProjectionFile = "reference/priorities/braid-program/braid-candidate-adjudication-projection.v1.json" } = {}) {
  const cache = new Map();
  let pending = Promise.resolve();
  async function load(entry, classification, scientificProjection) {
    const path = resolve(repoRoot, entry.recordUrl);
    const info = await stat(path);
    const stamp = `${info.size}:${info.mtimeMs}:${classification.hash}:${scientificProjection.hash}:${scientificProjection.integrity.sourceSha256}:${scientificProjection.integrity.brokenEvidenceLinks.join(",")}`;
    const cacheKey = `${entry.assemblyId}:${entry.modelRevisionSha256}`;
    if (cache.get(cacheKey)?.stamp === stamp) return cache.get(cacheKey);
    const bytes = await readFile(path);
    const recordSha256 = digest(bytes);
    const described = describeLibraryRecord(JSON.parse(bytes), entry, recordSha256, classification.data, scientificProjection.data, scientificProjection.integrity);
    described.summary.classificationSha256 = classification.hash;
    const result = { stamp, described, preview: null };
    cache.set(cacheKey, result);
    return result;
  }
  async function route(req, res, url) {
    if (req.method !== "GET") return send(res, 405, { error: "Library is read-only." });
    try {
      const classificationBytes = await readFile(resolve(repoRoot, classificationFile));
      const classification = { data: validateLibraryClassifications(JSON.parse(classificationBytes)), hash: digest(classificationBytes) };
      const projectionBytes = await readFile(resolve(repoRoot, scientificProjectionFile));
      const projectionData = validateBorgScientificStatusProjection(JSON.parse(projectionBytes));
      const ownerBytes = await readFile(resolve(repoRoot, projectionData.source));
      const brokenEvidenceLinks = [];
      for (const evidenceUrl of new Set(projectionData.relations.flatMap((relation) => relation.evidenceLinks.map((link) => link.url)))) {
        try { await stat(resolve(repoRoot, evidenceUrl.split("#")[0])); }
        catch { brokenEvidenceLinks.push(evidenceUrl); }
      }
      const scientificProjection = { data: projectionData, hash: digest(projectionBytes), integrity: {
        sourceSha256: digest(ownerBytes), sourceText: ownerBytes.toString("utf8"), brokenEvidenceLinks,
      } };
      if (url.pathname === "/api/borg/library/preview") {
        const assemblyId = url.searchParams.get("assemblyId");
        const modelRevisionSha256 = url.searchParams.get("modelRevisionSha256");
        const recordSha256 = url.searchParams.get("recordSha256");
        const entry = catalog.find((row) => row.assemblyId === assemblyId && row.modelRevisionSha256 === modelRevisionSha256);
        if (!entry) return send(res, 404, { error: "Unknown catalog identity." });
        const loaded = await load(entry, classification, scientificProjection);
        if (!recordSha256 || recordSha256 !== loaded.described.summary.recordSha256) return send(res, 409, { error: "Record changed. Reload the catalog; the saved hash was not retargeted." });
        loaded.preview ??= createLibraryPreview(loaded.described);
        return send(res, 200, { summary: loaded.described.summary, preview: loaded.preview });
      }
      const rows = []; const failures = [];
      for (const entry of catalog) {
        try { rows.push((await load(entry, classification, scientificProjection)).described.summary); }
        catch (error) { failures.push({ assemblyId: entry.assemblyId, error: error.message }); }
      }
      const params = url.searchParams;
      const query = queryLibraryRows(rows, params);
      const canonical = new URLSearchParams(params); canonical.delete("cursor"); canonical.sort();
      const snapshot = digest(JSON.stringify([rows.map((row) => [row.recordSha256, row.descriptorVersion]), classification.hash, scientificProjection.hash, scientificProjection.integrity.sourceSha256, canonical.toString()])).slice(0, 24);
      let offset = 0;
      if (params.has("cursor")) {
        const decoded = JSON.parse(Buffer.from(params.get("cursor"), "base64url").toString());
        if (decoded.snapshot !== snapshot || !Number.isSafeInteger(decoded.offset) || decoded.offset < 0) throw new RangeError("Stale or invalid page cursor. Clear filters or reload the first page.");
        offset = decoded.offset;
      }
      const pageSize = 12;
      const cursor = (next) => Buffer.from(JSON.stringify({ snapshot, offset: next })).toString("base64url");
      send(res, 200, { ...query, exactRecordCount: query.total, total: query.results.length,
        results: query.results.slice(offset, offset + pageSize), resultCount: query.results.length,
        registeredCount: catalog.length, failures, offset, pageSize,
        nextCursor: offset + pageSize < query.results.length ? cursor(offset + pageSize) : null,
        previousCursor: offset > 0 ? cursor(Math.max(0, offset - pageSize)) : null,
        provider: "seed-catalog demonstrator; not the million-entry registry", snapshot });
    } catch (error) { send(res, error instanceof RangeError || error instanceof SyntaxError ? 400 : 500, { error: error.message }); }
  }
  return async function handle(req, res) {
    const url = new URL(req.url, "http://localhost");
    if (!["/api/borg/library", "/api/borg/library/preview"].includes(url.pathname)) return false;
    // A bounded catalog and serialized reads prevent duplicate expensive cold loads.
    pending = pending.catch(() => {}).then(() => route(req, res, url));
    await pending;
    return true;
  };
}
