// Reconstruct an explicitly bound historical input tree without changing the
// current checkout or executing any captured program. This is evidence I/O.
import { createHash } from "node:crypto";
import { lstatSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const SOURCE_REPLAY_SCHEMA = "architrino.source-replay.v1";
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

function relativePath(value) {
  if (typeof value !== "string" || !value || path.isAbsolute(value) ||
      value.includes("\\") || value.split("/").some((part) => !part || part === "." || part === "..")) {
    throw new Error("source replay paths must be normalized repository-relative paths");
  }
  return value;
}

export function materializeSourceReplay({ rootDir, manifest, outputDir }) {
  const root = realpathSync(rootDir);
  if (manifest?.schema !== SOURCE_REPLAY_SCHEMA || !Array.isArray(manifest.files) ||
      manifest.files.length === 0 || manifest.files.length > 100) {
    throw new Error("invalid bounded source replay manifest");
  }
  const destinations = new Set();
  let totalBytes = 0;
  // Verify every original byte before creating the destination tree.
  const captured = manifest.files.map((row) => {
    const destination = relativePath(row.path);
    const source = path.join(root, relativePath(row.source));
    if (destinations.has(destination)) throw new Error(`duplicate replay path: ${destination}`);
    destinations.add(destination);
    if (!/^[a-f0-9]{64}$/u.test(row.sha256) || !lstatSync(source).isFile() ||
        !realpathSync(source).startsWith(root + path.sep)) {
      throw new Error(`invalid regular replay source: ${row.source}`);
    }
    const bytes = readFileSync(source);
    if (sha256(bytes) !== row.sha256) throw new Error(`source replay hash mismatch: ${row.source}`);
    totalBytes += bytes.length;
    if (totalBytes > 50 * 1024 * 1024) throw new Error("source replay exceeds 50 MiB bound");
    return { destination, bytes, sha256: row.sha256 };
  });
  const output = path.resolve(outputDir);
  if (realpathSync(path.dirname(output)) !== path.dirname(output)) {
    throw new Error("source replay parent must not be symlinked");
  }
  mkdirSync(output); // Exclusive: never overwrite an existing checkout or replay.
  for (const row of captured) {
    const destination = path.join(output, row.destination);
    mkdirSync(path.dirname(destination), { recursive: true });
    writeFileSync(destination, row.bytes, { flag: "wx" });
  }
  return { rootDir: output, fileCount: captured.length, totalBytes,
    claimBoundary: "exact source-byte reconstruction only; no execution or scientific acceptance" };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.length !== 4 || args[0] !== "--manifest" || args[2] !== "--out") {
    throw new Error("Usage: materialize-source-replay.mjs --manifest <json> --out <new-directory>");
  }
  console.log(JSON.stringify(materializeSourceReplay({ rootDir: process.cwd(),
    manifest: JSON.parse(readFileSync(args[1], "utf8")), outputDir: args[3] })));
}
