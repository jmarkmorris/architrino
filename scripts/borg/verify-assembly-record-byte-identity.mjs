#!/usr/bin/env node

import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { BORG_ASSEMBLY_RECORD_CATALOG } from "../../src/apps/borg/BorgAssemblyRecordCatalog.js";
import { validateBorgAssemblyRegistry } from "../../src/apps/borg/registry/BorgAssemblyRegistryContract.mjs";
import { validateAssemblyViewCollectionManifest } from "../../src/apps/shared/AssemblyViewRecordCarriers.mjs";

const ROOT = path.resolve(fileURLToPath(new URL("../../", import.meta.url)));
const DEFAULT_REGISTRY_PATH = "reference/priorities/app-borg/contracts/assembly-registry.v1.json";
const DEFAULT_COLLECTION_PATH = "content/assets/borg/assembly-view-collection.v1.json";
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const identityKey = (row) => `${row.assemblyId}\0${row.modelRevisionSha256}`;

export function verifyAssemblyRecordByteIdentity({
  rootDir = ROOT,
  catalog = BORG_ASSEMBLY_RECORD_CATALOG,
  registryPath = DEFAULT_REGISTRY_PATH,
  collectionPath = DEFAULT_COLLECTION_PATH,
  readBytes = (absolutePath) => fs.readFileSync(absolutePath),
} = {}) {
  rootDir = path.resolve(rootDir);
  const registry = validateBorgAssemblyRegistry(readJson(rootDir, registryPath, readBytes));
  const collection = collectionPath === null
    ? null
    : validateAssemblyViewCollectionManifest(readJson(rootDir, collectionPath, readBytes));
  const registryByIdentity = uniqueByIdentity(registry.entries, "registry");
  const collectionByIdentity = collection ? uniqueByIdentity(collection.records, "collection") : null;
  const failures = [];
  let verifiedBytes = 0;

  if (registry.entries.length !== catalog.entries.length) {
    failures.push(`registry has ${registry.entries.length} entries; source catalog has ${catalog.entries.length}`);
  }
  if (collection && collection.records.length !== catalog.entries.length) {
    failures.push(`collection has ${collection.records.length} entries; source catalog has ${catalog.entries.length}`);
  }

  for (const catalogEntry of catalog.entries) {
    const key = identityKey(catalogEntry);
    const entry = registryByIdentity.get(key);
    if (!entry) {
      failures.push(`${catalogEntry.recordUrl}: exact identity is absent from the registry`);
      continue;
    }
    if (entry.recordUrl !== catalogEntry.recordUrl) {
      failures.push(`${catalogEntry.recordUrl}: registry record URL changed to ${entry.recordUrl}`);
      continue;
    }
    let bytes;
    try {
      bytes = readBytes(resolveContainedFile(rootDir, entry.recordUrl));
    } catch (error) {
      failures.push(`${entry.recordUrl}: ${error.code === "ENOENT" ? "record is missing" : error.message}`);
      continue;
    }
    verifiedBytes += bytes.length;
    const actualSha256 = sha256(bytes);
    if (actualSha256 !== entry.recordSha256) {
      failures.push(`${entry.recordUrl}: SHA-256 ${actualSha256} does not match registry ${entry.recordSha256}`);
    }
    let record;
    try {
      record = JSON.parse(bytes);
    } catch (error) {
      failures.push(`${entry.recordUrl}: invalid JSON (${error.message})`);
      continue;
    }
    if (record.assemblyId !== entry.assemblyId || record.modelRevisionSha256 !== entry.modelRevisionSha256) {
      failures.push(`${entry.recordUrl}: record identity does not match the registry`);
    }
    const collectionEntry = collectionByIdentity?.get(key);
    if (collection && !collectionEntry) {
      failures.push(`${entry.recordUrl}: exact identity is absent from the assembly-view collection`);
    } else if (collectionEntry &&
        (collectionEntry.recordUrl !== entry.recordUrl || collectionEntry.recordSha256 !== entry.recordSha256)) {
      failures.push(`${entry.recordUrl}: assembly-view collection does not match the registry URL and SHA-256`);
    }
  }

  if (failures.length > 0) {
    const sample = failures.slice(0, 10).map((failure) => `- ${failure}`).join("\n");
    const remainder = failures.length > 10 ? `\n- ... ${failures.length - 10} more failure(s)` : "";
    throw new Error(`Borg record byte-identity verification failed with ${failures.length} error(s):\n${sample}${remainder}`);
  }
  return Object.freeze({
    schema: "architrino.borg-record-byte-identity-check.v1",
    status: "passed",
    verifiedRecords: catalog.entries.length,
    verifiedBytes,
    registryPath,
    collectionPath,
  });
}

function uniqueByIdentity(rows, label) {
  const indexed = new Map();
  for (const row of rows) {
    const key = identityKey(row);
    if (indexed.has(key)) throw new TypeError(`${label} repeats exact identity ${row.assemblyId}.`);
    indexed.set(key, row);
  }
  return indexed;
}

function readJson(rootDir, relativePath, readBytes) {
  return JSON.parse(readBytes(resolveContainedFile(rootDir, relativePath)).toString("utf8"));
}

function resolveContainedFile(rootDir, relativePath) {
  if (typeof relativePath !== "string" || !relativePath || path.isAbsolute(relativePath)) {
    throw new TypeError("Borg byte-identity paths must be nonempty repository-relative paths.");
  }
  const resolved = path.resolve(rootDir, relativePath);
  if (!resolved.startsWith(`${rootDir}${path.sep}`)) throw new TypeError(`Borg byte-identity path escapes the repository: ${relativePath}`);
  return resolved;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  if (process.argv.length !== 3 || process.argv[2] !== "--check") {
    throw new Error("Usage: node scripts/borg/verify-assembly-record-byte-identity.mjs --check");
  }
  const result = verifyAssemblyRecordByteIdentity();
  console.log(`Borg record byte identity passed: ${result.verifiedRecords}/${result.verifiedRecords} records, ${result.verifiedBytes} bytes.`);
}
