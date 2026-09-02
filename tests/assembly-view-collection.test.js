import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  validateAssemblyViewCollectionManifest,
  validateAssemblyViewRecordCarriers,
} from "../src/apps/shared/AssemblyViewRecordCarriers.mjs";

const manifestUrl = new URL("../content/assets/borg/assembly-view-collection.v1.json", import.meta.url);

test("canonical external collection binds every exact sealed record in declared source order", async () => {
  const manifest = validateAssemblyViewCollectionManifest(JSON.parse(await readFile(manifestUrl, "utf8")));
  assert.equal(manifest.records.length, 145);
  const seen = new Set();
  for (const row of manifest.records) {
    assert.equal(seen.has(row.sourceId), false);
    seen.add(row.sourceId);
    const bytes = await readFile(new URL(`../${row.recordUrl}`, import.meta.url));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), row.recordSha256);
    const record = JSON.parse(bytes);
    assert.equal(record.assemblyId, row.assemblyId);
    assert.equal(record.modelRevisionSha256, row.modelRevisionSha256);
    assert.equal(record.sourceId, row.sourceId);
    const carriers = validateAssemblyViewRecordCarriers(record, { required: true });
    assert.equal(carriers.frame.fieldSpeed, 1);
  }
});
