#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  ASSEMBLY_VIEW_COLLECTION_SCHEMA,
  validateAssemblyViewCollectionManifest,
} from "../../src/apps/shared/AssemblyViewRecordCarriers.mjs";

const repoRoot = resolve(fileURLToPath(new URL("../../", import.meta.url)));
const registryPath = resolve(repoRoot, "reference/priorities/app-borg/assembly-registry.v1.json");
const outputPath = resolve(repoRoot, "content/assets/borg/assembly-view-collection.v1.json");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

async function build() {
  const registry = JSON.parse(await readFile(registryPath, "utf8"));
  const records = [];
  for (const entry of registry.entries) {
    const bytes = await readFile(resolve(repoRoot, entry.recordUrl));
    const record = JSON.parse(bytes);
    if (sha256(bytes) !== entry.recordSha256 ||
        record.assemblyId !== entry.assemblyId ||
        record.modelRevisionSha256 !== entry.modelRevisionSha256) {
      throw new TypeError(`registry/record identity mismatch for ${entry.sourceIdentity}.`);
    }
    records.push({
      sourceId: record.sourceId ?? record.provenance?.runId,
      assemblyId: entry.assemblyId,
      modelRevisionSha256: entry.modelRevisionSha256,
      recordSha256: entry.recordSha256,
      recordUrl: entry.recordUrl,
    });
  }
  const manifest = {
    schema: ASSEMBLY_VIEW_COLLECTION_SCHEMA,
    collectionId: "borg-prescribed-catalog.2026-09-01.v1",
    title: "Borg sealed prescribed-record collection",
    authorityBoundary: "External record navigation and comparison intake only; loading, replay, grouping, and display create no scientific evidence.",
    records,
  };
  validateAssemblyViewCollectionManifest(manifest);
  return `${JSON.stringify(manifest, null, 2)}\n`;
}

const built = await build();
if (process.argv.includes("--write")) {
  await writeFile(outputPath, built);
  console.log(`wrote ${outputPath}`);
} else if (process.argv.includes("--check")) {
  const current = await readFile(outputPath, "utf8").catch(() => "");
  if (current !== built) {
    console.error(`stale ${outputPath}; run node scripts/borg/build-assembly-view-collection.mjs --write`);
    process.exitCode = 1;
  } else {
    console.log(`assembly-view collection current: ${JSON.parse(built).records.length} sealed records`);
  }
} else {
  console.log(built);
}
