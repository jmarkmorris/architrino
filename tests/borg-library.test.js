import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { createBorgLibraryService } from "../scripts/dev/BorgLibraryService.mjs";
import { BORG_ASSEMBLY_RECORD_CATALOG } from "../src/apps/borg/BorgAssemblyRecordCatalog.js";
import { describeLibraryRecord } from "../src/apps/borg/library/BorgLibraryDescriptors.mjs";
import { LIBRARY_FACETS, queryLibraryRows, validateLibraryBrowseParams } from "../src/apps/borg/library/BorgLibraryQuery.mjs";
import { validateLibraryClassifications } from "../src/apps/borg/library/BorgLibraryComposition.mjs";
import { validateBorgScientificStatusProjection } from "../src/apps/borg/BorgScientificStatus.mjs";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));

async function request(service, path, method = "GET") {
  let status;
  let body;
  const handled = await service(
    { url: path, method },
    { writeHead(value) { status = value; }, end(value) { body = JSON.parse(value); } },
  );
  return { handled, status, body };
}

test("Library query contract exposes independent facts-first facets", () => {
  assert.deepEqual(Object.keys(LIBRARY_FACETS), [
    "count", "braidCount", "breathing", "radii", "circleOccupancy",
    "assemblySpan", "braidDimension", "shape", "speedPolicy",
  ]);
  const rows = [
    { assemblyId: "asm-a", modelRevisionSha256: "a".repeat(64), recordSha256: "1".repeat(64), label: "Planar pair", description: "Two paths", facets: { count: "2", circleOccupancy: "multiple", braidDimension: "2d" } },
    { assemblyId: "asm-b", modelRevisionSha256: "b".repeat(64), recordSha256: "2".repeat(64), label: "Spatial set", description: "Three paths", facets: { count: "3", circleOccupancy: "one", braidDimension: "3d" } },
  ];
  assert.deepEqual(queryLibraryRows(rows, new URLSearchParams("circleOccupancy=multiple")).results.map((row) => row.assemblyId), ["asm-a"]);
  assert.deepEqual(queryLibraryRows(rows, new URLSearchParams("braidDimension=3d")).results.map((row) => row.assemblyId), ["asm-b"]);
  assert.equal(queryLibraryRows(rows, new URLSearchParams(`q=${"b".repeat(8)}`)).total, 1);
});

test("retired query fields and selector values fail closed", () => {
  for (const query of ["eomRecord=x", "selected=x", "sha256=x", "id=x", "orbitSharing=shared", "circleOccupancy=shared"]) {
    assert.throws(() => validateLibraryBrowseParams(new URLSearchParams(query)), /Unsupported/);
  }
  const exact = BORG_ASSEMBLY_RECORD_CATALOG.entries[0];
  const accepted = validateLibraryBrowseParams(new URLSearchParams({
    assemblyId: exact.assemblyId,
    modelRevisionSha256: exact.modelRevisionSha256,
    recordSha256: "a".repeat(64),
  }));
  assert.equal(accepted.get("assemblyId"), exact.assemblyId);
});

test("every Library row carries the exact identity pair and no alias surface", async () => {
  const entry = BORG_ASSEMBLY_RECORD_CATALOG.entries[0];
  const record = JSON.parse(await readFile(new URL(`../${entry.recordUrl}`, import.meta.url)));
  const described = describeLibraryRecord(record, entry, "a".repeat(64));
  assert.equal(described.summary.assemblyId, entry.assemblyId);
  assert.equal(described.summary.modelRevisionSha256, entry.modelRevisionSha256);
  assert.equal(described.summary.id, entry.assemblyId);
  assert.equal("alias" in described.summary, false);
  assert.equal("aliases" in described.summary, false);
  assert.equal("sourceId" in described.summary, false);
});

test("Library classifications bind exact scientific identities", async () => {
  const classifications = validateLibraryClassifications(JSON.parse(await readFile(
    new URL("../reference/priorities/app-borg/library-classifications.v4.json", import.meta.url),
  )));
  assert.equal(classifications.schema, "borg-library-classifications.v4");
  assert.ok(classifications.spindle.length > 0);
  for (const row of classifications.spindle) {
    assert.deepEqual(Object.keys(row).sort(), ["assemblyId", "modelRevisionSha256", "value"].sort());
    assert.equal(row.value, true);
    assert.ok(BORG_ASSEMBLY_RECORD_CATALOG.entries.some((entry) =>
      entry.assemblyId === row.assemblyId && entry.modelRevisionSha256 === row.modelRevisionSha256));
  }
});

test("Library scientific projection is Braid Program owned and exact adjudications bind exact identities", async () => {
  const projection = validateBorgScientificStatusProjection(JSON.parse(await readFile(
    new URL("../reference/priorities/braid-program/braid-candidate-adjudication-projection.v1.json", import.meta.url),
  )));
  assert.equal(projection.source, "reference/priorities/braid-program/braid-candidate-requirement-adjudication.md");
  const exactAdjudications = projection.relations.filter((relation) => relation.kind === "adjudication" && relation.scope === "exact-configuration");
  const currentBindings = exactAdjudications.filter((relation) =>
    BORG_ASSEMBLY_RECORD_CATALOG.entries.some((entry) => entry.assemblyId === relation.match.assemblyId && entry.modelRevisionSha256 === relation.match.modelRevisionSha256));
  const preservedOffCatalog = exactAdjudications.filter((relation) => !currentBindings.includes(relation));
  assert.equal(exactAdjudications.length, 24);
  assert.equal(currentBindings.length, 23);
  assert.deepEqual(preservedOffCatalog.map((relation) => relation.match.assemblyId), ["asm-f70757c6a491cf997305c297efa86bf8"]);
});

test("seed provider covers all current records and exact preview pins", async () => {
  const service = createBorgLibraryService({ repoRoot });
  const first = await request(service, "/api/borg/library");
  assert.equal(first.status, 200);
  assert.equal(first.body.total, 45);
  assert.equal(first.body.exactRecordCount, 144);
  assert.equal(first.body.activeFindingConfigurationCount, 136);
  assert.equal(first.body.registeredCount, 144);
  assert.equal(first.body.resultCount, first.body.total);
  assert.deepEqual(first.body.counts.shape, { circles: 42, spindle: 6, unavailable: 3 });
  assert.deepEqual(first.body.counts.braidDimension, { unavailable: 18, "3d": 21, "2d": 6 });
  assert.deepEqual(first.body.failures, []);
  const row = first.body.results.find((result) => result.kind === "leaf");
  const query = new URLSearchParams({
    assemblyId: row.assemblyId,
    modelRevisionSha256: row.modelRevisionSha256,
    recordSha256: row.recordSha256,
  });
  const preview = await request(service, `/api/borg/library/preview?${query}`);
  assert.equal(preview.status, 200);
  assert.equal(preview.body.summary.assemblyId, row.assemblyId);
  assert.equal(preview.body.preview.recordSha256, row.recordSha256);
  query.set("recordSha256", "0".repeat(64));
  assert.equal((await request(service, `/api/borg/library/preview?${query}`)).status, 409);
  assert.equal((await request(service, "/api/borg/library?selected=retired")).status, 400);
  assert.equal((await request(service, "/api/borg/library", "POST")).status, 405);

  const circular = await request(service, "/api/borg/library?shape=circles");
  assert.equal(circular.body.total, 42);
  assert.equal(circular.body.exactRecordCount, 141);
});

test("seed provider exposes one 100-variant balance card and exact variant drill-down", async () => {
  const service = createBorgLibraryService({ repoRoot });
  const search = new URLSearchParams({ q: "Equal-radius planar three-binary circular balance" });
  const grouped = await request(service, `/api/borg/library?${search}`);
  assert.equal(grouped.status, 200);
  assert.equal(grouped.body.total, 1);
  assert.equal(grouped.body.exactRecordCount, 100);
  assert.equal(grouped.body.activeFindingConfigurationCount, 100);
  assert.equal(grouped.body.resultCount, 1);
  assert.equal(grouped.body.results[0].kind, "variant-group");
  assert.equal(grouped.body.results[0].memberCount, 100);
  assert.equal(grouped.body.results[0].activeFindingConfigurationCount, 100);
  assert.equal(grouped.body.results[0].representative.variantSet.parameters.betaF, "1.82643096465467872500343418810983797075332652816658643466935687397614525307580589427830187");

  const variantSet = grouped.body.results[0].variantSetId;
  const drilled = await request(service, `/api/borg/library?${new URLSearchParams({ variantSet })}`);
  assert.equal(drilled.status, 200);
  assert.equal(drilled.body.total, 100);
  assert.equal(drilled.body.exactRecordCount, 100);
  assert.equal(drilled.body.resultCount, 100);
  assert.ok(drilled.body.results.every((result) => result.kind === "leaf"));

  const exact = await request(service, `/api/borg/library?${new URLSearchParams({ q: "2.974307176117294" })}`);
  assert.equal(exact.body.total, 1);
  assert.equal(exact.body.exactRecordCount, 1);
  assert.equal(exact.body.resultCount, 1);
  assert.equal(exact.body.results[0].kind, "leaf");
});

test("Library presents grouped results as braids and exact configurations as supporting provenance", async () => {
  const [mainSource, pageSource] = await Promise.all([
    readFile(new URL("../src/apps/borg/library/main.js", import.meta.url), "utf8"),
    readFile(new URL("../borg-library.html", import.meta.url), "utf8"),
  ]);
  assert.match(mainSource, /data\.resultCount === 1 \? "braid" : "braids"/);
  assert.match(mainSource, /data\.exactRecordCount.*exact/);
  assert.match(mainSource, /data\.activeFindingConfigurationCount.*indexed active evidence/);
  assert.doesNotMatch(mainSource, /assembly cards/);
  assert.match(pageSource, /<option value="none">Braids<\/option>/);
});
