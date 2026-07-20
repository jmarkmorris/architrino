import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildSourceIndexSnapshot,
  validateSourceIndexSnapshot,
} from "../src/archie-service/source-index/snapshot-v1.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inputPath = path.join(
  rootDir,
  "tests/archie-service/fixtures/source-index/source-index-build-input.v1.json"
);
const snapshotPath = path.join(
  rootDir,
  "tests/archie-service/fixtures/source-index/source-index-snapshot.v1.json"
);

test("source-index snapshot v1 rebuilds exactly and ignores input ordering", () => {
  const input = readJson(inputPath);
  const expected = readJson(snapshotPath);
  const built = buildSourceIndexSnapshot({ rootDir, input });
  assert.deepEqual(built, expected);

  const reordered = structuredClone(input);
  reordered.sourceRecords.reverse();
  reordered.graphEdges.reverse();
  reordered.metadataRecords.reverse();
  const reorderedBuild = buildSourceIndexSnapshot({ rootDir, input: reordered });
  assert.equal(reorderedBuild.snapshotSha256, built.snapshotSha256);
});

test("source-index snapshot v1 rejects stale source hashes", () => {
  const snapshot = readJson(snapshotPath);
  snapshot.sourceInputs[0].sourceContentSha256 = "0".repeat(64);
  assert.throws(
    () => validateSourceIndexSnapshot({ rootDir, snapshot }),
    /source input content hash mismatch/
  );
});

test("source-index snapshot v1 rejects priority authority inflation", () => {
  const input = readJson(inputPath);
  const priority = input.sourceRecords.find(
    (record) => record.sourceClass === "priority_material"
  );
  priority.authorityStatus = "primary";
  assert.throws(
    () => buildSourceIndexSnapshot({ rootDir, input }),
    /priority_material requires authorityStatus priority_only or excluded/
  );
});

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}
