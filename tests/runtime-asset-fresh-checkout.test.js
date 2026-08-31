import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { buildStaticSite } from "../scripts/build-static-site.mjs";
import { runtimeAssetPaths, isGeneratedRuntimeAsset, readRuntimeAssetFamilies } from "../scripts/prepare-runtime-assets.mjs";

const root = path.resolve(import.meta.dirname, "..");
const hash = (name) => createHash("sha256").update(fs.readFileSync(name)).digest("hex");

// Explicit, on-demand integration check: exports the source without ignored
// runtime outputs and removes its entire owned temporary tree on completion.
test("source-only checkout reconstructs all runtime outputs and a complete Pages payload", { timeout: 180000 }, (t) => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "architrino-source-only-"));
  t.after(() => fs.rmSync(temporary, { recursive: true, force: true }));
  const sourceRoot = path.join(temporary, "source");
  const families = readRuntimeAssetFamilies();
  const paths = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard", "-z"], { cwd: root, encoding: "utf8" })
    .split("\0").filter(Boolean).filter((name) => !isGeneratedRuntimeAsset(name, families));
  for (const name of paths) {
    const target = path.join(sourceRoot, name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(root, name), target, fs.constants.COPYFILE_FICLONE);
  }
  for (const name of runtimeAssetPaths()) assert.equal(fs.existsSync(path.join(sourceRoot, name)), false);
  const sourceHashes = new Map(paths.map((name) => [name, hash(path.join(sourceRoot, name))]));
  console.log("[fresh-runtime] source-only export ready; generating ignored assets");
  execFileSync(process.execPath, ["scripts/prepare-runtime-assets.mjs", "--write"], { cwd: sourceRoot, stdio: "inherit" });
  execFileSync(process.execPath, ["scripts/prepare-runtime-assets.mjs", "--check"], { cwd: sourceRoot, stdio: "inherit" });
  for (const [name, expected] of sourceHashes) assert.equal(hash(path.join(sourceRoot, name)), expected, `source changed: ${name}`);
  const stamps = new Map(runtimeAssetPaths().map((name) => [name, fs.statSync(path.join(sourceRoot, name)).mtimeMs]));
  console.log("[fresh-runtime] sources unchanged; building isolated deployment payload");
  const result = buildStaticSite({ rootDir: sourceRoot, outputDir: path.join(temporary, "site"), trackedPaths: paths });
  assert.equal(result.runtimeAssetCount, runtimeAssetPaths().length);
  for (const [name, stamp] of stamps) {
    assert.equal(fs.statSync(path.join(sourceRoot, name)).mtimeMs, stamp, `unchanged output rewritten: ${name}`);
    assert.equal(hash(path.join(sourceRoot, name)), hash(path.join(result.outputDir, name)));
  }
  assert.ok(fs.existsSync(path.join(result.outputDir, "borg.html")));
  assert.ok(fs.existsSync(path.join(result.outputDir, "equation-mapping.html")));
  assert.equal(fs.existsSync(path.join(result.outputDir, ".git")), false);
  assert.equal(fs.existsSync(path.join(result.outputDir, ".local-data")), false);
  console.log(`[fresh-runtime] verified ${result.runtimeAssetCount} outputs and ${result.fileCount} deployment files; scratch copies will be removed`);
});
