import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  BORG_ASSEMBLY_RECORD_CATALOG,
  BORG_ASSEMBLY_RECORD_CATALOG_ID,
  createBorgAssemblyRecordCatalog,
} from "../src/apps/borg/BorgAssemblyRecordCatalog.js";
import { createBorgAssemblyRecordNavigation } from "../src/apps/borg/BorgBootstrap.js";

test("Borg registers every frozen exact configuration once", () => {
  const { entries } = BORG_ASSEMBLY_RECORD_CATALOG;
  assert.equal(BORG_ASSEMBLY_RECORD_CATALOG.id, BORG_ASSEMBLY_RECORD_CATALOG_ID);
  assert.equal(entries.length, 144);
  assert.equal(new Set(entries.map((entry) => entry.assemblyId)).size, entries.length);
  assert.equal(new Set(entries.map((entry) => entry.modelRevisionSha256)).size, entries.length);
  assert.equal(new Set(entries.map((entry) => entry.recordUrl)).size, entries.length);
  assert.equal(entries.filter((entry) => entry.label.startsWith("Equal-radius planar three-binary circular balance —")).length, 100);
  assert.ok(entries.some((entry) => entry.label === "All-axial three-binary boundary control"));
  assert.ok(entries.some((entry) => entry.assemblyId === "asm-242282e6154b97b00ac9d8e5123cde46"));
  assert.equal(entries.some((entry) => entry.assemblyId === "asm-f70757c6a491cf997305c297efa86bf8"), false);

  for (const entry of entries) {
    assert.deepEqual(Object.keys(entry), ["assemblyId", "modelRevisionSha256", "label", "recordUrl"]);
    assert.match(entry.assemblyId, /^asm-[a-f0-9]{32}$/);
    assert.match(entry.modelRevisionSha256, /^[a-f0-9]{64}$/);
    const record = JSON.parse(readFileSync(entry.recordUrl));
    assert.equal(record.assemblyId, entry.assemblyId, entry.label);
    assert.equal(record.modelRevisionSha256, entry.modelRevisionSha256, entry.label);
  }
});

test("catalog rejects inconsistent or duplicate exact identities, duplicate URLs, and extra fields", () => {
  const a = { assemblyId: `asm-${"1".repeat(32)}`, modelRevisionSha256: "1".repeat(64), label: "A", recordUrl: "a.json" };
  const b = { assemblyId: `asm-${"2".repeat(32)}`, modelRevisionSha256: "2".repeat(64), label: "B", recordUrl: "b.json" };
  assert.throws(() => createBorgAssemblyRecordCatalog([a, { ...b, assemblyId: a.assemblyId }]), /identity pair is inconsistent/);
  assert.throws(() => createBorgAssemblyRecordCatalog([a, { ...a, recordUrl: "b.json" }]), /assemblyId .* duplicated/);
  assert.throws(() => createBorgAssemblyRecordCatalog([a, { ...b, recordUrl: a.recordUrl }]), /URL .* duplicated/);
  assert.throws(() => createBorgAssemblyRecordCatalog([{ ...a, alias: "retired" }]), /may contain only/);
});

test("exact Borg navigation uses only the current identity pair", () => {
  const entry = BORG_ASSEMBLY_RECORD_CATALOG.entries[0];
  const assigned = [];
  const replaced = [];
  const navigation = createBorgAssemblyRecordNavigation({
    selectedAssemblyId: entry.assemblyId,
    locationLike: { assign(url) { assigned.push(url); } },
    historyLike: { replaceState(...args) { replaced.push(args); } },
  });
  const expected = `borg.html?assemblyId=${entry.assemblyId}&modelRevisionSha256=${entry.modelRevisionSha256}`;
  assert.equal(navigation.selectedRecordId, entry.assemblyId);
  assert.equal(navigation.buildUrl(entry.assemblyId), expected);
  assert.equal(navigation.navigate(entry.assemblyId), expected);
  assert.deepEqual(assigned, [expected]);
  assert.equal(navigation.persistSelection(entry.assemblyId), true);
  assert.deepEqual(replaced, [[null, "", expected]]);
  assert.throws(() => navigation.buildUrl("retired-label"), /has no entry/);
});
