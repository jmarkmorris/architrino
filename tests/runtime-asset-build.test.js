import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { buildStaticSite } from "../scripts/build-static-site.mjs";
import { runtimeAssetPaths, readRuntimeAssetFamilies } from "../scripts/prepare-runtime-assets.mjs";
import { buildEquationMappingCorpus } from "../scripts/build-equation-mapping-corpus.mjs";

const root = path.resolve(import.meta.dirname, "..");
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");

function fixture(t) {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "runtime-site-"));
  t.after(() => fs.rmSync(temp, { recursive: true, force: true }));
  const source = path.join(temp, "source");
  const write = (name, value) => {
    fs.mkdirSync(path.dirname(path.join(source, name)), { recursive: true });
    fs.writeFileSync(path.join(source, name), value);
  };
  write("scripts/config/generated-runtime-assets.json", read("scripts/config/generated-runtime-assets.json"));
  write("index.html", "<h1>source</h1>");
  write("CNAME", "www.architrino.com\n");
  write(".local-data/private.json", "private");
  write(".git/config", "private");
  return { source, output: path.join(temp, "site"), write };
}

test("runtime manifest enumerates all Borg records and both derived indexes", () => {
  const paths = runtimeAssetPaths();
  assert.equal(paths.length, 46);
  assert.equal(new Set(paths).size, paths.length);
  assert.ok(paths.every((name) => !name.includes("..")));
  assert.equal(readRuntimeAssetFamilies().length, 3);
});

test("static build includes generated assets but never local ignored extras or git metadata", (t) => {
  const f = fixture(t);
  const result = buildStaticSite({ rootDir: f.source, outputDir: f.output,
    trackedPaths: ["index.html", "CNAME", ".git/config"],
    prepare: () => {
      for (const name of runtimeAssetPaths(f.source)) f.write(name, "{}");
      f.write("content/assets/borg/records/unlisted-private.json", "private");
    },
  });
  assert.equal(result.runtimeAssetCount, 46);
  for (const name of runtimeAssetPaths(f.source)) assert.equal(fs.readFileSync(path.join(f.output, name), "utf8"), "{}");
  assert.ok(fs.existsSync(path.join(f.output, ".nojekyll")));
  for (const name of [".git", ".local-data", "content/assets/borg/records/unlisted-private.json"]) assert.equal(fs.existsSync(path.join(f.output, name)), false);
});

test("site build refuses destructive or nonempty output targets", (t) => {
  const f = fixture(t);
  assert.throws(() => buildStaticSite({ rootDir: f.source, outputDir: f.source }), /must not contain/);
  fs.mkdirSync(f.output);
  fs.writeFileSync(path.join(f.output, "existing.txt"), "preserve");
  assert.throws(() => buildStaticSite({ rootDir: f.source, outputDir: f.output }), /empty directory/);
  assert.equal(fs.readFileSync(path.join(f.output, "existing.txt"), "utf8"), "preserve");
});

test("artifact-only equation build rejects missing source links without editing the source", (t) => {
  const f = fixture(t);
  const name = "content/markdown/aaa/example.md";
  const source = "# Example\n\n$$\nx=1\n$$\n";
  f.write(name, source);
  const result = buildEquationMappingCorpus({ rootDir: f.source, mode: "build" });
  assert.ok(result.errors.length > 0);
  assert.equal(fs.readFileSync(path.join(f.source, name), "utf8"), source);
  assert.equal(fs.existsSync(path.join(f.source, "content/generated/equation-mapping/corpus-equations.json")), false);
});

test("local, CI, service, and Pages entrypoints explicitly prepare runtime outputs", () => {
  assert.match(read("scripts/dev/start-local-dev.mjs"), /prepareRuntimeAssets\(\{ rootDir: REPO_ROOT \}\)/);
  assert.match(read("scripts/check-content-integrity.mjs"), /prepare-runtime-assets\.mjs/);
  assert.match(read("scripts/pr-validation-receipt.mjs"), /prepare-runtime-assets\.mjs/);
  assert.match(read("scripts/archie-service/run-full-corpus-mcp-server.mjs"), /familyId: "full-corpus-index"/);
  const workflow = read(".github/workflows/pages.yml");
  assert.match(workflow, /github.ref == 'refs\/heads\/main'/);
  assert.match(workflow, /build-static-site\.mjs --out \.tmp\/site/);
  assert.match(workflow, /retention-days: 1/);
  assert.match(workflow, /needs: build/);
  assert.match(read(".github/workflows/content-integrity.yml"), /fetch-depth: 0/);
});
