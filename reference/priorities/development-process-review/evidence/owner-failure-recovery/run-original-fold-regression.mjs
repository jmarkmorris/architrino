import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, symlinkSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
assert.equal(sha(Buffer.from("abc")), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
console.log("Known SHA-256 control passed before original-input authentication.");
const root = process.cwd();
const venv = path.resolve(process.env.AAA_VENV || path.join(root, "../.venv"));
execFileSync(path.join(venv, "bin/python"), ["--version"]);
const protocolPath = "src/prescribed-path-analysis/protocols/orthogonal-plane-weave-fold-limiting-exclusion-protocol.v1.json";
const certificatePath = "scripts/prescribed-path-analysis/oracle/orthogonal_plane_weave_fold_limit_certificate.py";
const receiptPath = "reference/priorities/braid-program/evidence/2026-08-29-orthogonal-plane-weave-fold-limiting-exclusion.v1.json";
const testPath = "tests/test_orthogonal_plane_weave_fold_limit_certificate.py";
const protocol = JSON.parse(readFileSync(protocolPath));
const directory = mkdtempSync(path.join(tmpdir(), "owner-fold-original-"));
const tree = path.join(directory, "repo");
const copy = (filename, bytes) => {
  const target = path.join(tree, filename);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, bytes);
};
try {
  symlinkSync(venv, path.join(directory, ".venv"));
  for (const filename of [protocolPath, certificatePath, receiptPath, testPath]) copy(filename, readFileSync(filename));
  for (const key of ["ordinaryCertificate", "ordinaryOracle", "masterEquation", "sixWorldlineSubject"]) {
    const filename = protocol.frozenInputs[`${key}Path`];
    const bytes = key === "masterEquation"
      ? execFileSync("git", ["show", `bfbb3ea3e7175e70e6d0707fef9b0a200f9fe845:${filename}`])
      : readFileSync(filename);
    assert.equal(sha(bytes), protocol.frozenInputs[`${key}Sha256`], key);
    copy(filename, bytes);
    console.log(JSON.stringify({ input: key, path: filename, sha256: sha(bytes), sizeBytes: bytes.length }));
  }
  const run = spawnSync(path.join(venv, "bin/python"), [testPath], { cwd: tree, stdio: "inherit", timeout: 180000 });
  if (run.error) throw run.error;
  process.exitCode = run.status ?? 1;
} finally {
  rmSync(directory, { recursive: true, force: true });
}
