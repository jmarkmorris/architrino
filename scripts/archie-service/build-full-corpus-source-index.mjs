#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  FULL_CORPUS_SNAPSHOT_PATH,
  buildFullCorpusSnapshot,
} from "../../src/archie-service/source-index/full-corpus-v1.mjs";
import {
  canonicalJson,
  validateSourceIndexSnapshot,
} from "../../src/archie-service/source-index/snapshot-v1.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const mode = process.argv.length === 3 ? process.argv[2] : null;
if (!new Set(["--check", "--write"]).has(mode)) {
  fail("Usage: node scripts/archie-service/build-full-corpus-source-index.mjs --check|--write");
}

let built;
try {
  built = buildFullCorpusSnapshot({ rootDir });
  validateIndependentBuildInvariants(built);
} catch (error) {
  fail(`full-corpus source-index build failed: ${error.message}`);
}

const absoluteSnapshotPath = path.join(rootDir, FULL_CORPUS_SNAPSHOT_PATH);
if (mode === "--write") {
  atomicWriteJson(absoluteSnapshotPath, built.snapshot);
}

if (!fs.existsSync(absoluteSnapshotPath)) {
  fail(
    `full-corpus snapshot is missing: run node scripts/archie-service/build-full-corpus-source-index.mjs --write`
  );
}

let stored;
try {
  stored = JSON.parse(fs.readFileSync(absoluteSnapshotPath, "utf8"));
} catch (error) {
  fail(`full-corpus snapshot cannot be read: ${error.message}`);
}

if (canonicalJson(stored) !== canonicalJson(built.snapshot)) {
  fail(
    `full-corpus snapshot drift: run node scripts/archie-service/build-full-corpus-source-index.mjs --write`
  );
}

try {
  validateSourceIndexSnapshot({ rootDir, snapshot: stored });
} catch (error) {
  fail(`full-corpus snapshot validation failed: ${error.message}`);
}

const repeated = buildFullCorpusSnapshot({ rootDir });
if (repeated.snapshot.snapshotSha256 !== built.snapshot.snapshotSha256) {
  fail("identical source state produced a different full-corpus snapshot hash");
}

const action = mode === "--write" ? "write passed" : "check passed";
const counts = built.snapshot.sourceRecordCountByClass;
process.stdout.write(
  `Archie full-corpus source-index ${action}: ${built.snapshot.views.search.records.length} records, ` +
    `${built.snapshot.views.graph.edges.length} edges, ${built.snapshot.views.metadata.records.length} metadata records, ` +
    `${counts.published_corpus} published-corpus records, snapshot ${built.snapshot.snapshotSha256}\n`
);

function validateIndependentBuildInvariants({ input, snapshot }) {
  const markdownIndex = JSON.parse(
    fs.readFileSync(path.join(rootDir, "content/markdown/markdown_index.json"), "utf8")
  );
  if (!Array.isArray(markdownIndex.files) || markdownIndex.files.length < 150) {
    throw new Error("markdown index does not contain the expected full-corpus volume");
  }
  for (const sourcePath of markdownIndex.files) {
    const matches = input.sourceRecords.filter(
      (record) => record.sourcePath === sourcePath && record.sectionAnchor === null
    );
    if (matches.length !== 1) {
      throw new Error(`${sourcePath}: expected exactly one authored document record`);
    }
  }
  if (input.sourceRecords.some((record) => record.sourceClass === "priority_material")) {
    throw new Error("public full-corpus input must not embed priority material");
  }
  const byId = new Map(input.sourceRecords.map((record) => [record.sourceId, record]));
  for (const record of input.sourceRecords) {
    if (!new Set(["generated_reading_copy", "scene_route"]).has(record.sourceClass)) continue;
    const parent = byId.get(record.canonicalParent);
    if (parent?.sourceClass !== "published_corpus") {
      throw new Error(`${record.sourceId}: routing record lacks a published canonical parent`);
    }
  }
  if (!input.sourceRecords.some((record) => record.sourceClass === "generated_reading_copy")) {
    throw new Error("full-corpus input lacks generated reading-copy records");
  }
  if (!input.sourceRecords.some((record) => record.sourceClass === "scene_route")) {
    throw new Error("full-corpus input lacks scene-route records");
  }
  if (!snapshot.repositoryRef.startsWith("local-source-state:")) {
    throw new Error("full-corpus snapshot falsely claims a non-local repository state");
  }
}

function atomicWriteJson(targetPath, value) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  const temporaryPath = `${targetPath}.tmp-${process.pid}`;
  try {
    fs.writeFileSync(temporaryPath, `${JSON.stringify(value, null, 2)}\n`, { flag: "wx" });
    fs.renameSync(temporaryPath, targetPath);
  } finally {
    if (fs.existsSync(temporaryPath)) fs.unlinkSync(temporaryPath);
  }
}

function fail(message) {
  process.stderr.write(`Archie full-corpus source-index failed: ${message}\n`);
  process.exit(1);
}
