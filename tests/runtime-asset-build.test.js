import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { buildStaticSite, WEB_KATEX_DIRECTORY } from "../scripts/build-static-site.mjs";
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

test("Pages excludes PowerPoint originals, preserves PDFs, and leaves repository files intact", (t) => {
  const f = fixture(t);
  const originals = ["slides/deck.pptx", "slides/legacy.ppt", "slides/macro.PPTM", "slides/template.potx", "slides/show.ppsx"];
  for (const name of originals) f.write(name, "authoring source");
  f.write("slides/deck.pdf", "published PDF");
  buildStaticSite({ rootDir: f.source, outputDir: f.output,
    trackedPaths: ["index.html", ...originals, "slides/deck.pdf"],
    prepare: () => { for (const name of runtimeAssetPaths(f.source)) f.write(name, "{}"); },
  });
  for (const name of originals) {
    assert.equal(fs.existsSync(path.join(f.output, name)), false);
    assert.equal(fs.readFileSync(path.join(f.source, name), "utf8"), "authoring source");
  }
  assert.equal(fs.readFileSync(path.join(f.output, "slides/deck.pdf"), "utf8"), "published PDF");
});

test("Pages excludes iOS and design sources but preserves all shared KaTeX assets and public artwork", (t) => {
  const f = fixture(t);
  const excluded = [
    "apps/ios/ArchitrinoReader/GeneratedTextbookPackage/reading-copies/dynamics.html",
    "apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/ReaderShell.js",
    "apps/ios/ArchitrinoReader/ArchitrinoReader/Reader.swift",
    "reference/design/banners/working/master.png",
    "reference/design/logo-exports/icon.png",
  ];
  const retained = [
    `${WEB_KATEX_DIRECTORY}katex.min.js`, `${WEB_KATEX_DIRECTORY}katex.min.css`,
    `${WEB_KATEX_DIRECTORY}fonts/KaTeX_Main-Regular.woff2`, `${WEB_KATEX_DIRECTORY}LICENSE.txt`,
    "content/assets/images/brand/banners/public.png", "reference/design-notes.md",
  ];
  for (const name of [...excluded, ...retained]) f.write(name, `original ${name}`);
  f.write("index.html", '<img src="content/assets/images/brand/banners/public.png">');
  buildStaticSite({ rootDir: f.source, outputDir: f.output,
    trackedPaths: ["index.html", ...excluded, ...retained],
    prepare: () => { for (const name of runtimeAssetPaths(f.source)) f.write(name, "{}"); },
  });
  for (const name of excluded) assert.equal(fs.existsSync(path.join(f.output, name)), false, name);
  for (const name of retained) assert.equal(fs.readFileSync(path.join(f.output, name), "utf8"), `original ${name}`);
  for (const name of [...excluded, ...retained]) assert.equal(fs.readFileSync(path.join(f.source, name), "utf8"), `original ${name}`);
});

test("site build rejects oversized payloads before copying any publication files", (t) => {
  const f = fixture(t);
  assert.throws(() => buildStaticSite({ rootDir: f.source, outputDir: f.output,
    trackedPaths: ["index.html", "CNAME"], maxBytes: 10,
    prepare: () => { for (const name of runtimeAssetPaths(f.source)) f.write(name, "{}"); },
  }), /Pages payload exceeds supported size budget/);
  assert.equal(fs.existsSync(f.output), false);
  assert.throws(() => buildStaticSite({ maxBytes: 1_000_000_001 }), /invalid Pages size budget/);
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
  assert.match(workflow, /pull_request:/);
  assert.match(workflow, /github.ref == 'refs\/heads\/main'/);
  assert.match(workflow, /github.event_name != 'pull_request'/);
  assert.match(workflow, /node --test tests\/runtime-asset-fresh-checkout.test.js/);
  assert.match(workflow, /build-static-site\.mjs --out \.tmp\/site/);
  assert.match(workflow, /retention-days: 1/);
  assert.match(workflow, /needs: build/);
  assert.match(read(".github/workflows/content-integrity.yml"), /fetch-depth: 0/);
});
