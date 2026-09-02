import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const POLICY_PATH = path.join(
  ROOT,
  "reference/priorities/aaa-operations/public-security-policy.v1.json"
);

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
}

function sha256(relativePath) {
  return crypto
    .createHash("sha256")
    .update(fs.readFileSync(path.join(ROOT, relativePath)))
    .digest("hex");
}

test("accepted public-security policy matches the exact npm dependency graph", () => {
  const policy = readJson("reference/priorities/aaa-operations/public-security-policy.v1.json");
  const packageJson = readJson("package.json");
  const packageLock = readJson("package-lock.json");

  assert.equal(policy.status, "accepted");
  assert.deepEqual(packageJson.dependencies, policy.dependencyPolicy.directDependencies);
  assert.equal(packageLock.lockfileVersion, policy.dependencyPolicy.lockfileVersion);
  assert.deepEqual(
    packageLock.packages[""].dependencies,
    policy.dependencyPolicy.directDependencies
  );
  assert.equal(
    packageLock.packages["node_modules/mermaid"].version,
    policy.dependencyPolicy.directDependencies.mermaid
  );
  assert.equal(
    Object.keys(packageLock.packages).filter(Boolean).length,
    policy.dependencyPolicy.lockedProductionEntries
  );
  for (const version of Object.values(policy.dependencyPolicy.directDependencies)) {
    assert.doesNotMatch(version, /^[~^*]|[<>=| ]/u);
  }
});

test("reviewed vendored bytes remain bound to their accepted hashes", () => {
  const policy = readJson("reference/priorities/aaa-operations/public-security-policy.v1.json");
  for (const asset of policy.vendoredAssets) {
    assert.equal(sha256(asset.path), asset.sha256, asset.path);
    assert.ok(asset.license);
    assert.match(asset.disposition, /accepted/u);
  }
});

test("every external GitHub Action is pinned to the accepted full commit SHA", () => {
  const policy = readJson("reference/priorities/aaa-operations/public-security-policy.v1.json");
  const workflowDirectory = path.join(ROOT, ".github/workflows");
  const uses = fs
    .readdirSync(workflowDirectory)
    .filter((name) => /\.ya?ml$/u.test(name))
    .flatMap((name) => {
      const source = fs.readFileSync(path.join(workflowDirectory, name), "utf8");
      return [...source.matchAll(/^\s*(?:-\s*)?uses:\s*([^\s#]+)(?:\s+#.*)?$/gmu)].map(
        (match) => match[1]
      );
    });

  assert.ok(uses.length > 0);
  for (const use of uses) {
    const match = use.match(/^([^@]+)@([0-9a-f]{40})$/u);
    assert.ok(match, `non-immutable action reference: ${use}`);
    assert.equal(policy.githubActionsPolicy.pins[match[1]], match[2]);
  }
  assert.equal(new Set(uses).size, Object.keys(policy.githubActionsPolicy.pins).length);
});

test("weekly dependency review covers npm and GitHub Actions", () => {
  const dependabot = fs.readFileSync(path.join(ROOT, ".github/dependabot.yml"), "utf8");
  assert.match(dependabot, /package-ecosystem:\s*npm/u);
  assert.match(dependabot, /package-ecosystem:\s*github-actions/u);
  assert.equal((dependabot.match(/interval:\s*weekly/gu) ?? []).length, 2);
});

test("every OPS-010 public-domain security boundary has an explicit disposition", () => {
  const controls = readJson(
    "reference/priorities/aaa-operations/public-security-policy.v1.json"
  ).publicControls;
  for (const name of [
    "contentSecurityPolicy",
    "strictTransportSecurity",
    "pagesDomainVerification",
    "dnssec",
    "caa",
    "mailSecurity",
  ]) {
    assert.ok(controls[name], name);
  }
  assert.ok(controls.contentSecurityPolicy.disposition);
  assert.ok(controls.strictTransportSecurity.disposition);
  assert.ok(controls.pagesDomainVerification.disposition);
  assert.ok(controls.dnssec.disposition);
  assert.ok(controls.caa.disposition);
  for (const control of Object.values(controls.mailSecurity)) {
    assert.ok(control.disposition);
  }
});

test("the public runtime does not restore the removed Liberapay executable widget", () => {
  const runtime = fs.readFileSync(path.join(ROOT, "src/runtime/MarkdownRuntime.js"), "utf8");
  assert.doesNotMatch(runtime, /liberapay\.com\/Architrino\/widgets\/button\.js/iu);
  assert.doesNotMatch(runtime, /createElement\(\s*["']script["']\s*\)/u);
  assert.match(
    fs.readFileSync(
      path.join(ROOT, "content/markdown/aaa/archie/support-architrino-research.md"),
      "utf8"
    ),
    /does not load Liberapay code automatically/u
  );
});
