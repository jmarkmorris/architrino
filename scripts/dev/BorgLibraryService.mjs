import { readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { describeLibraryRecord, createLibraryPreview } from "../../src/apps/borg/library/BorgLibraryDescriptors.mjs";
import { queryLibraryRows, LIBRARY_FACETS } from "../../src/apps/borg/library/BorgLibraryQuery.mjs";
import { validateLibraryClassifications } from "../../src/apps/borg/library/BorgLibraryComposition.mjs";
import { validateBorgScientificStatusProjection } from "../../src/apps/borg/BorgScientificStatus.mjs";
import { validateBorgPlatonicRelationshipAssignments } from "../../src/apps/borg/BorgPlatonicRelationships.mjs";
import { createBorgAssemblyRegistryDatabase } from "../../src/apps/borg/registry/BorgAssemblyRegistryDatabase.mjs";
import { exactModelKey, validateBorgAssemblyRegistry } from "../../src/apps/borg/registry/BorgAssemblyRegistryContract.mjs";

const digest = (data) => createHash("sha256").update(data).digest("hex");
const send = (res, status, data) => { res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }); res.end(JSON.stringify(data)); };

// Indexed, read-only BORG-014 provider. The committed registry is the migration
// authority; content-addressed source and record objects remain in their owning
// files and are loaded only on snapshot construction or exact preview demand.
export function createBorgLibraryService({ repoRoot, registryFile = "reference/priorities/app-borg/contracts/assembly-registry.v1.json", classificationFile = "reference/priorities/app-borg/contracts/library-classifications.v4.json", scientificProjectionFile = "reference/priorities/braid-program/contracts/braid-candidate-adjudication-projection.v1.json", platonicAssignmentsFile = "reference/priorities/braid-program/configurations/borg-platonic-relationship-assignments.v1.json" } = {}) {
  let snapshot = null;
  let pending = Promise.resolve();

  async function loadSnapshot() {
    const [registryBytes, classificationBytes, projectionBytes, platonicBytes] = await Promise.all([
      readFile(resolve(repoRoot, registryFile)), readFile(resolve(repoRoot, classificationFile)), readFile(resolve(repoRoot, scientificProjectionFile)), readFile(resolve(repoRoot, platonicAssignmentsFile)),
    ]);
    const registry = validateBorgAssemblyRegistry(JSON.parse(registryBytes));
    const classifications = validateLibraryClassifications(JSON.parse(classificationBytes));
    const projection = validateBorgScientificStatusProjection(JSON.parse(projectionBytes));
    const platonicAssignments = validateBorgPlatonicRelationshipAssignments(JSON.parse(platonicBytes));
    const ownerBytes = await readFile(resolve(repoRoot, projection.source));
    const platonicOwnerBytes = await readFile(resolve(repoRoot, platonicAssignments.source));
    const brokenEvidenceLinks = [];
    for (const evidenceUrl of new Set(projection.relations.flatMap((relation) => relation.evidenceLinks.map((link) => link.url)))) {
      try { await stat(resolve(repoRoot, evidenceUrl.split("#")[0])); }
      catch { brokenEvidenceLinks.push(evidenceUrl); }
    }
    const signature = digest(Buffer.concat([registryBytes, classificationBytes, projectionBytes, ownerBytes, platonicBytes, platonicOwnerBytes, Buffer.from(brokenEvidenceLinks.join("\0"))]));
    if (snapshot?.signature === signature) return snapshot;
    const scientificIntegrity = { sourceSha256: digest(ownerBytes), sourceText: ownerBytes.toString("utf8"), brokenEvidenceLinks };
    const describedByKey = new Map(); const failures = [];
    for (const entry of registry.entries) {
      try {
        const bytes = await readFile(resolve(repoRoot, entry.recordUrl));
        const recordSha256 = digest(bytes);
        if (recordSha256 !== entry.recordSha256) throw new TypeError("Sealed record bytes no longer match the registry migration pin.");
        const described = describeLibraryRecord(JSON.parse(bytes), entry, recordSha256, classifications, projection, scientificIntegrity, platonicAssignments, { sourceSha256: digest(platonicOwnerBytes) });
        described.summary.classificationSha256 = digest(classificationBytes);
        described.summary.braidId = entry.braidId;
        described.summary.occurrence = entry.occurrence;
        described.summary.taxonomyMemberships = entry.taxonomyMemberships;
        described.summary.visualCoverage = entry.visualCoverage;
        describedByKey.set(exactModelKey(entry), { described, preview: null });
      } catch (error) { failures.push({ assemblyId: entry.assemblyId, error: error.message }); }
    }
    if (failures.length) throw new TypeError(`Registry snapshot has ${failures.length} unavailable exact records: ${failures.map((row) => `${row.assemblyId}: ${row.error}`).join("; ")}`);
    snapshot?.database.close();
    const database = createBorgAssemblyRegistryDatabase({ registry, summaries: [...describedByKey.values()].map((row) => row.described.summary) });
    snapshot = { signature, registry, database, describedByKey, failures };
    return snapshot;
  }

  async function route(req, res, url) {
    if (req.method !== "GET") return send(res, 405, { error: "Library is read-only." });
    try {
      const current = await loadSnapshot();
      if (url.pathname === "/api/borg/library/preview") {
        const assemblyId = url.searchParams.get("assemblyId");
        const modelRevisionSha256 = url.searchParams.get("modelRevisionSha256");
        const recordSha256 = url.searchParams.get("recordSha256");
        const summary = current.database.getExact(assemblyId, modelRevisionSha256);
        if (!summary) return send(res, 404, { error: "Unknown registry identity." });
        if (!recordSha256 || recordSha256 !== summary.recordSha256) return send(res, 409, { error: "Record changed. Reload the registry; the saved hash was not retargeted." });
        const loaded = current.describedByKey.get(`${assemblyId}:${modelRevisionSha256}`);
        loaded.preview ??= createLibraryPreview(loaded.described);
        return send(res, 200, { summary, preview: loaded.preview });
      }
      const params = url.searchParams;
      const matchingRows = current.database.select(params);
      const query = queryLibraryRows(matchingRows, params);
      const counts = {};
      for (const key of Object.keys(LIBRARY_FACETS)) {
        const without = new URLSearchParams(params); without.delete(key); without.delete("cursor");
        counts[key] = queryLibraryRows(current.database.select(without), without).counts[key];
      }
      query.counts = counts;
      const canonical = new URLSearchParams(params); canonical.delete("cursor"); canonical.sort();
      const pageSnapshot = digest(`${current.signature}\0${canonical}`).slice(0, 24);
      let offset = 0;
      if (params.has("cursor")) {
        const decoded = JSON.parse(Buffer.from(params.get("cursor"), "base64url").toString());
        if (decoded.snapshot !== pageSnapshot || !Number.isSafeInteger(decoded.offset) || decoded.offset < 0) throw new RangeError("Stale or invalid page cursor. Clear filters or reload the first page.");
        offset = decoded.offset;
      }
      const pageSize = 12;
      const cursor = (next) => Buffer.from(JSON.stringify({ snapshot: pageSnapshot, offset: next })).toString("base64url");
      send(res, 200, { ...query, exactRecordCount: query.total, total: query.results.length,
        results: query.results.slice(offset, offset + pageSize), resultCount: query.results.length,
        registeredCount: current.database.count, failures: current.failures, offset, pageSize,
        nextCursor: offset + pageSize < query.results.length ? cursor(offset + pageSize) : null,
        previousCursor: offset > 0 ? cursor(Math.max(0, offset - pageSize)) : null,
        provider: "indexed borg-assembly-registry.v1; content-addressed source and sealed-record objects", snapshot: pageSnapshot });
    } catch (error) { send(res, error instanceof RangeError || error instanceof SyntaxError ? 400 : 500, { error: error.message }); }
  }
  return async function handle(req, res) {
    const url = new URL(req.url, "http://localhost");
    if (!["/api/borg/library", "/api/borg/library/preview"].includes(url.pathname)) return false;
    pending = pending.catch(() => {}).then(() => route(req, res, url));
    await pending;
    return true;
  };
}
