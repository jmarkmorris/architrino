import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { runInNewContext } from "node:vm";
import { spawnSync } from "node:child_process";
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
  assert.match(workflow, /vars.ARCHITRINO_PAGES_DEPLOY_ENABLED == 'true'/);
  assert.match(workflow, /github.event_name == 'push' \|\| github.event_name == 'workflow_dispatch'/);
  assert.match(workflow, /node --test tests\/runtime-asset-fresh-checkout.test.js/);
  assert.match(workflow, /build-static-site\.mjs --out \.tmp\/site/);
  assert.match(workflow, /retention-days: 1/);
  assert.match(workflow, /needs: build/);
  assert.match(read(".github/workflows/content-integrity.yml"), /fetch-depth: 0/);
});

test("Pages opt-in gates the entire deployment job, not builds or validation", () => {
  const workflow = read(".github/workflows/pages.yml");
  const [beforeDeploy, deployment] = workflow.split("\n  deploy:\n");
  assert.ok(deployment);
  assert.doesNotMatch(beforeDeploy, /ARCHITRINO_PAGES_DEPLOY_ENABLED|^    if:|pages: write|id-token: write/m);
  assert.match(beforeDeploy, /^  push:\n    branches: \[main\]\n  pull_request:\n  workflow_dispatch:/m);
  assert.match(beforeDeploy, /node scripts\/check-content-integrity.mjs/);
  assert.match(beforeDeploy, /node --test tests\/runtime-asset-fresh-checkout.test.js/);
  assert.match(deployment, /^    needs: build$/m);
  assert.ok(deployment.indexOf("Require Actions publishing before deployment") < deployment.indexOf("uses: actions/configure-pages@"));
  assert.ok(deployment.indexOf("uses: actions/configure-pages@") < deployment.indexOf("uses: actions/deploy-pages@"));
});

test("Pages deployment expression rejects default/off settings, PRs and non-main refs", () => {
  const deployment = read(".github/workflows/pages.yml").split("\n  deploy:\n")[1];
  const expression = deployment.match(/^    if: (.+)$/m)?.[1];
  assert.equal(expression, "vars.ARCHITRINO_PAGES_DEPLOY_ENABLED == 'true' && github.ref == 'refs/heads/main' && (github.event_name == 'push' || github.event_name == 'workflow_dispatch')");
  // Independently declared expectations; evaluate the actual workflow expression.
  // Its subset uses only string equality and boolean operators. Normalize strings
  // to match GitHub's case-insensitive comparison and unset-variable semantics.
  const cases = [
    [undefined, "refs/heads/main", "push", false],
    [undefined, "refs/heads/main", "workflow_dispatch", false],
    ["", "refs/heads/main", "push", false],
    ["false", "refs/heads/main", "push", false],
    ["false", "refs/heads/main", "workflow_dispatch", false],
    ["1", "refs/heads/main", "push", false],
    ["yes", "refs/heads/main", "push", false],
    ["true", "refs/heads/main", "push", true],
    ["TRUE", "refs/heads/main", "push", true],
    ["true", "refs/heads/main", "workflow_dispatch", true],
    ["true", "refs/heads/codex/jasper", "push", false],
    ["true", "refs/heads/codex/jasper", "workflow_dispatch", false],
    ["true", "refs/pull/1/merge", "pull_request", false],
    ["true", "refs/heads/main", "pull_request", false],
    ["true", "refs/heads/main", "pull_request_target", false],
    ["true", "refs/heads/main", "workflow_run", false],
    ["true", "refs/heads/main", "schedule", false],
    ["true", "refs/tags/main", "push", false],
  ];
  for (const [enabled, ref, event_name, expected] of cases) {
    const actual = runInNewContext(expression, {
      vars: { ARCHITRINO_PAGES_DEPLOY_ENABLED: (enabled ?? "").toLowerCase() },
      github: { ref, event_name },
    }, { timeout: 100 });
    assert.equal(actual, expected, JSON.stringify({ enabled, ref, event_name }));
  }
});

test("Pages publishing-source preflight fails closed on legacy, missing metadata or API failure", () => {
  const deployment = read(".github/workflows/pages.yml").split("\n  deploy:\n")[1];
  const preflight = deployment.split("      - name: Require Actions publishing before deployment\n")[1]?.split("      - uses:")[0];
  assert.ok(preflight);
  assert.match(preflight, /GH_TOKEN: \$\{\{ github.token \}\}/);
  assert.match(preflight, /GH_REPO: \$\{\{ github.repository \}\}/);
  const script = preflight.split("        run: |\n")[1].replace(/^          /gm, "");
  assert.equal(spawnSync("bash", ["-n"], { input: script, encoding: "utf8" }).status, 0);
  for (const [buildType, apiStatus, expectedStatus] of [["workflow", "0", 0], ["legacy", "0", 1], ["", "0", 1], ["null", "0", 1], ["workflow", "1", 1]]) {
    // Execute the actual shell with a read-only stub, never a GitHub request.
    const result = spawnSync("bash", ["-e", "-c", `gh() { printf '%s\\n' "$PAGES_TEST_BUILD_TYPE"; return "$PAGES_TEST_API_STATUS"; }\n${script}`], {
      encoding: "utf8",
      env: { ...process.env, GH_REPO: "test/repo", PAGES_TEST_BUILD_TYPE: buildType, PAGES_TEST_API_STATUS: apiStatus },
    });
    assert.equal(result.status, expectedStatus, JSON.stringify({ buildType, apiStatus, stderr: result.stderr }));
  }
});
