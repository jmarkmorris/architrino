import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { gunzipSync, gzipSync } from "node:zlib";

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]),
    );
  }
  return value;
}

function canonicalBytes(value) {
  return Buffer.from(`${JSON.stringify(canonicalize(value), null, 2)}\n`);
}

export function createExternalRawEvidenceStore(rootDirectory) {
  const absoluteRoot = path.resolve(rootDirectory);
  mkdirSync(absoluteRoot, { recursive: true });
  return {
    rootDirectory: absoluteRoot,
    write(value, context = {}) {
      const rawBytes = canonicalBytes(value);
      const rawSha256 = sha256Bytes(rawBytes);
      const compressedBytes = gzipSync(rawBytes, { level: 6, mtime: 0 });
      const compressedSha256 = sha256Bytes(compressedBytes);
      const relativePath = `${compressedSha256}.json.gz`;
      const absolutePath = path.join(absoluteRoot, relativePath);
      if (existsSync(absolutePath)) {
        const existing = readFileSync(absolutePath);
        if (!existing.equals(compressedBytes)) {
          throw new Error(
            `external raw evidence collision at ${absolutePath}.`,
          );
        }
      } else {
        const temporaryPath = `${absolutePath}.${process.pid}.tmp`;
        writeFileSync(temporaryPath, compressedBytes, { flag: "wx" });
        renameSync(temporaryPath, absolutePath);
      }
      return {
        schema: "prescribed-path-analysis/external-raw-evidence-receipt.v1",
        path: relativePath,
        rawSha256,
        compressedSha256,
        rawBytes: rawBytes.length,
        storedBytes: compressedBytes.length,
        resultHash: value?.resultHash ?? null,
        protocolHash: value?.protocolHash ?? null,
        context,
      };
    },
  };
}

export function verifyExternalRawEvidenceReceipts(
  rootDirectory,
  receipts,
) {
  const absoluteRoot = path.resolve(rootDirectory);
  const rows = receipts.map((receipt, index) => {
    const absolutePath = path.resolve(absoluteRoot, receipt.path);
    if (!absolutePath.startsWith(`${absoluteRoot}${path.sep}`)) {
      throw new Error(`external raw evidence receipt ${index} leaves its root.`);
    }
    const compressedBytes = readFileSync(absolutePath);
    const compressedSha256 = sha256Bytes(compressedBytes);
    const storedBytes = compressedBytes.length;
    if (receipt.compressedSha256 !== compressedSha256) {
      throw new Error(
        `external raw evidence receipt ${index} compressedSha256 mismatch.`,
      );
    }
    if (receipt.storedBytes !== storedBytes) {
      throw new Error(
        `external raw evidence receipt ${index} storedBytes mismatch.`,
      );
    }
    const rawBytes = gunzipSync(compressedBytes);
    const actual = {
      compressedSha256,
      rawSha256: sha256Bytes(rawBytes),
      storedBytes,
      rawBytes: rawBytes.length,
    };
    for (const [field, value] of Object.entries(actual)) {
      if (receipt[field] !== value) {
        throw new Error(
          `external raw evidence receipt ${index} ${field} mismatch.`,
        );
      }
    }
    const packet = JSON.parse(rawBytes.toString("utf8"));
    if (receipt.resultHash !== (packet.resultHash ?? null) ||
        receipt.protocolHash !== (packet.protocolHash ?? null)) {
      throw new Error(
        `external raw evidence receipt ${index} packet identity mismatch.`,
      );
    }
    return {
      path: receipt.path,
      ...actual,
      resultHash: receipt.resultHash,
      protocolHash: receipt.protocolHash,
    };
  });
  return {
    schema: "prescribed-path-analysis/external-raw-evidence-verification.v1",
    rootDirectory: absoluteRoot,
    receiptCount: rows.length,
    verified: true,
    rows,
  };
}
