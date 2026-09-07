import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { BORG_ASSEMBLY_RECORD_CATALOG } from "../src/apps/borg/BorgAssemblyRecordCatalog.js";

const REPOSITORY_ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const CHAPTERS = [
  "content/markdown/aaa/noether-braid/2d-braid-assemblies.md",
  "content/markdown/aaa/noether-braid/3d-braid-assemblies.md",
];

function exactIdentityKey(assemblyId, modelRevisionSha256) {
  return `${assemblyId}:${modelRevisionSha256}`;
}

test("worked 2D and 3D chapters publish every exact Borg identity once on a routable pair link", () => {
  const published = [];
  const linkPattern = /\]\(\.\.\/\.\.\/\.\.\/\.\.\/borg\.html\?assemblyId=(asm-[a-f0-9]{32})&modelRevisionSha256=([a-f0-9]{64})\)/g;

  for (const relativePath of CHAPTERS) {
    const source = readFileSync(path.join(REPOSITORY_ROOT, relativePath), "utf8");
    assert.doesNotMatch(source, /borg-library\.html\?assemblyId=/, relativePath);
    const exactIndex = source.split("## Exact Borg Configuration Index")[1];
    assert.ok(exactIndex, `${relativePath} is missing its exact Borg configuration index`);
    for (const match of exactIndex.matchAll(linkPattern)) {
      published.push(exactIdentityKey(match[1], match[2]));
    }
  }

  const catalog = BORG_ASSEMBLY_RECORD_CATALOG.entries.map((entry) =>
    exactIdentityKey(entry.assemblyId, entry.modelRevisionSha256));
  assert.equal(published.length, new Set(published).size, "an exact Borg identity is duplicated across the worked chapter indexes");
  assert.deepEqual(published.toSorted(), catalog.toSorted());
});

test("the generated Borg record directory exposes only current catalog records", () => {
  const recordDirectory = path.join(REPOSITORY_ROOT, "content/assets/borg/records");
  const actual = readdirSync(recordDirectory).filter((name) => name.endsWith(".json")).toSorted();
  const expected = BORG_ASSEMBLY_RECORD_CATALOG.entries.map((entry) => path.basename(entry.recordUrl)).toSorted();
  assert.deepEqual(actual, expected);
});

test("current Borg documentation uses exact identity routes and no retired record query", () => {
  const files = [
    "reference/priorities/app-borg/contracts/requirements-and-design.md",
    "reference/priorities/app-borg/contracts/assembly-viewer-requirements.md",
    "reference/priorities/braid-program/campaigns/instrument-gate.md",
    "src/apps/borg/library/README.md",
  ];
  for (const relativePath of files) {
    const source = readFileSync(path.join(REPOSITORY_ROOT, relativePath), "utf8");
    assert.doesNotMatch(source, /\?eomRecord=/, relativePath);
  }
});
