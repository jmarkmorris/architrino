import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { createBorgLibraryService } from "../scripts/dev/BorgLibraryService.mjs";
import { BORG_ASSEMBLY_RECORD_CATALOG } from "../src/apps/borg/BorgAssemblyRecordCatalog.js";
import { describeLibraryRecord } from "../src/apps/borg/library/BorgLibraryDescriptors.mjs";
import { LIBRARY_FACETS, queryLibraryRows, validateLibraryBrowseParams } from "../src/apps/borg/library/BorgLibraryQuery.mjs";
import { validateLibraryClassifications } from "../src/apps/borg/library/BorgLibraryComposition.mjs";

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

test("seed provider covers all current records and exact preview pins", async () => {
  const service = createBorgLibraryService({ repoRoot });
  const first = await request(service, "/api/borg/library");
  assert.equal(first.status, 200);
  assert.equal(first.body.total, 144);
  assert.equal(first.body.registeredCount, 144);
  assert.deepEqual(first.body.failures, []);
  const row = first.body.results[0];
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
});
