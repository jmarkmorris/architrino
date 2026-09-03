#!/usr/bin/env node

import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { validateBorgAssemblyRegistry } from "../../src/apps/borg/registry/BorgAssemblyRegistryContract.mjs";

const DEFAULT_ORIGIN = "https://www.architrino.com";
const REGISTRY_PATH = "reference/priorities/app-borg/assembly-registry.v1.json";
const DEFAULT_CONCURRENCY = 8;
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

export async function auditPublicAssemblyRecordByteIdentity({
  origin = DEFAULT_ORIGIN,
  concurrency = DEFAULT_CONCURRENCY,
  fetchImpl = globalThis.fetch,
} = {}) {
  const normalizedOrigin = normalizeOrigin(origin);
  if (typeof fetchImpl !== "function") throw new TypeError("public Borg audit requires fetch");
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 32) {
    throw new TypeError("public Borg audit concurrency must be an integer from 1 to 32");
  }
  const registryBytes = await fetchBytes(new URL(REGISTRY_PATH, normalizedOrigin), fetchImpl);
  const registry = validateBorgAssemblyRegistry(JSON.parse(registryBytes.toString("utf8")));
  const results = new Array(registry.entries.length);
  let nextIndex = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, registry.entries.length) }, async () => {
    while (nextIndex < registry.entries.length) {
      const index = nextIndex;
      nextIndex += 1;
      const entry = registry.entries[index];
      try {
        const bytes = await fetchBytes(new URL(entry.recordUrl, normalizedOrigin), fetchImpl);
        const actualSha256 = sha256(bytes);
        const record = JSON.parse(bytes.toString("utf8"));
        const identityMatches = record.assemblyId === entry.assemblyId &&
          record.modelRevisionSha256 === entry.modelRevisionSha256;
        results[index] = {
          recordUrl: entry.recordUrl,
          bytes: bytes.length,
          expectedSha256: entry.recordSha256,
          actualSha256,
          hashMatches: actualSha256 === entry.recordSha256,
          identityMatches,
        };
      } catch (error) {
        results[index] = { recordUrl: entry.recordUrl, error: error.message, hashMatches: false, identityMatches: false, bytes: 0 };
      }
    }
  }));

  const failures = results.filter((result) => !result.hashMatches || !result.identityMatches);
  if (failures.length > 0) {
    const sample = failures.slice(0, 10).map((failure) =>
      `${failure.recordUrl}: ${failure.error ?? `hash=${failure.hashMatches}, identity=${failure.identityMatches}`}`
    ).join("\n");
    throw new Error(`Public Borg record byte-identity audit failed for ${failures.length}/${results.length} records:\n${sample}`);
  }
  return Object.freeze({
    schema: "architrino.public-borg-record-byte-identity-audit.v1",
    status: "passed",
    origin: normalizedOrigin.href,
    registryPath: REGISTRY_PATH,
    registryRevision: registry.revision,
    registrySha256: sha256(registryBytes),
    verifiedRecords: results.length,
    verifiedBytes: results.reduce((total, result) => total + result.bytes, 0),
    matchingHashes: results.filter((result) => result.hashMatches).length,
    matchingIdentities: results.filter((result) => result.identityMatches).length,
  });
}

async function fetchBytes(url, fetchImpl) {
  const response = await fetchImpl(url, {
    redirect: "follow",
    headers: { "cache-control": "no-cache", pragma: "no-cache" },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url.href}`);
  return Buffer.from(await response.arrayBuffer());
}

function normalizeOrigin(value) {
  const url = new URL(value);
  if (url.protocol !== "https:") throw new TypeError("public Borg audit origin must use https");
  url.pathname = "/";
  url.search = "";
  url.hash = "";
  return url;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  if (process.argv.length !== 3 || process.argv[2] !== "--check") {
    console.error("Usage: node scripts/borg/audit-public-assembly-record-byte-identity.mjs --check");
    process.exit(2);
  }
  try {
    const result = await auditPublicAssemblyRecordByteIdentity();
    console.log(
      `Public Borg record byte identity passed: ${result.matchingHashes}/${result.verifiedRecords} hashes, ${result.matchingIdentities}/${result.verifiedRecords} identities, ${result.verifiedBytes} bytes, registry ${result.registryRevision}, SHA-256 ${result.registrySha256}.`
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
