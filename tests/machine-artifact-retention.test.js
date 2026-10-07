import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync, spawnSync } from "node:child_process";
import { auditMachineFiles, measureMachineFile, validateMachineArtifactRetention } from "../scripts/validate-machine-artifact-retention.mjs";

const root = path.resolve(import.meta.dirname, "..");
const policyPath = "reference/op/machine-artifact-retention-registry.v1.json";
const manifestPath = "scripts/config/generated-runtime-assets.json";
const registry = JSON.parse(fs.readFileSync(path.join(root, policyPath)));
const families = JSON.parse(fs.readFileSync(path.join(root, manifestPath))).families;
// Strip repository-scoped Git variables so a fixture never acts on the real checkout when this test runs inside a hook.
const GIT_FIXTURE_ENV = Object.fromEntries(Object.entries(process.env).filter(([name]) => !/^GIT_(DIR|WORK_TREE|INDEX_FILE|PREFIX|COMMON_DIR|OBJECT_DIRECTORY|ALTERNATE_OBJECT_DIRECTORIES|NAMESPACE)$/u.test(name)));
const git = (cwd, ...args) => execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"], env: GIT_FIXTURE_ENV });

function repository(t, { limit = 100 } = {}) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "machine-retention-"));
  t.after(() => fs.rmSync(cwd, { recursive: true, force: true }));
  const write = (name, text) => {
    const target = path.join(cwd, name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, text);
  };
  git(cwd, "init", "-q");
  git(cwd, "config", "user.name", "Storage Tests");
  git(cwd, "config", "user.email", "storage@example.invalid");
  git(cwd, "config", "core.hooksPath", "/dev/null");
  const policy = structuredClone(registry);
  policy.collections = [];
  policy.thresholds = { lineCount: limit, byteCount: 100000, evidenceLineCount: limit, evidenceByteCount: 100000 };
  policy.collectionThresholds = { lineCount: limit, byteCount: 100000 };
  policy.branchThresholds = { lineCount: limit, byteCount: 100000 };
  write(policyPath, JSON.stringify(policy));
  write(manifestPath, JSON.stringify({ schema: "architrino/generated-runtime-assets.v1", families }));
  write(".gitignore", "/content/assets/borg/records/\n");
  write("old.csv", "old\n".repeat(limit - 1));
  git(cwd, "add", ".");
  git(cwd, "commit", "-qm", "source baseline");
  return { cwd, write, validate: () => validateMachineArtifactRetention({ rootDir: cwd, baseRef: "HEAD" }) };
}

test("newline accounting includes compact single-line and unterminated payloads", () => {
  assert.deepEqual(measureMachineFile(Buffer.from("{}")), { byteCount: 2, lineCount: 1 });
  assert.deepEqual(measureMachineFile(Buffer.from("{}\n")), { byteCount: 3, lineCount: 1 });
  assert.deepEqual(measureMachineFile(Buffer.alloc(0)), { byteCount: 0, lineCount: 0 });
});

test("a collection of individually sub-threshold records is rejected, including nested files", () => {
  const files = new Map(Array.from({ length: 19 }, (_, n) => [`content/assets/example/${n}/record.json`, { lineCount: 96000, byteCount: 2400000 }]));
  const result = auditMachineFiles(files, { registry, families });
  assert.ok(result.errors.some((error) => error.includes("collection budget exceeded")));
  assert.ok(!result.errors.some((error) => error.includes("large machine file")));
});

test("every runtime family rejects tracked output even when tiny", () => {
  for (const family of families) {
    const name = family.path ?? `${family.directory}/tiny.json`;
    const files = new Map([[name, { lineCount: 1, byteCount: 2 }]]);
    assert.ok(auditMachineFiles(files, { registry, families }).errors.some((error) => error.includes(`must not be tracked: ${name}`)), name);
  }
});

test("collection allowances are capped, not unlimited exemptions", () => {
  const result = auditMachineFiles(new Map([["content/scenes/elements/oversized.json", { lineCount: 600001, byteCount: 500 }]]), { registry, families });
  assert.ok(result.errors.some((error) => error.includes("collection budget exceeded")));
});

test("index inspection catches a large staged payload hidden by a small working file", (t) => {
  const fixture = repository(t);
  fixture.write("payload.jsonl", "{}\n".repeat(101));
  git(fixture.cwd, "add", "payload.jsonl");
  fixture.write("payload.jsonl", "{}\n");
  const { errors } = fixture.validate();
  assert.ok(errors.some((error) => error.startsWith("index:") && error.includes("large machine file")));
  assert.ok(!errors.some((error) => error.startsWith("working tree:") && error.includes("large machine file")));
});

test("branch additions across separate collections do not borrow credit from deletions", (t) => {
  const fixture = repository(t);
  git(fixture.cwd, "rm", "old.csv");
  fixture.write("one/a.csv", "x\n".repeat(60));
  fixture.write("two/b.tsv", "y\n".repeat(60));
  git(fixture.cwd, "add", "one", "two");
  const { errors } = fixture.validate();
  assert.ok(errors.some((error) => error.includes("branch machine-output budget exceeded")));
  assert.ok(!errors.some((error) => error.includes("collection budget exceeded")));
});

test("untracked nonignored output participates in the branch budget", (t) => {
  const fixture = repository(t);
  fixture.write("new.ndjson", "{}\n".repeat(101));
  assert.ok(fixture.validate().errors.some((error) => error.startsWith("working tree:") && error.includes("branch machine-output budget exceeded")));
});

test("ignored runtime files stay outside the audit unless force-added", (t) => {
  const fixture = repository(t);
  fixture.write("content/assets/borg/records/tiny.json", "{}");
  assert.deepEqual(fixture.validate().errors, []);
  git(fixture.cwd, "add", "-f", "content/assets/borg/records/tiny.json");
  assert.ok(fixture.validate().errors.some((error) => error.includes("must not be tracked")));
});

test("the retired Pages exception cannot permit tracked runtime outputs", (t) => {
  const fixture = repository(t);
  const name = "content/assets/borg/records/retained.json";
  const policy = { ...registry, runtimeTransition: {
    phase: "prove-pages-build", paths: [name], budget: { lineCount: 10, byteCount: 100 },
    exitCondition: "obsolete migration allowance",
  } };
  const files = new Map([[name, { lineCount: 1, byteCount: 2 }]]);
  assert.ok(auditMachineFiles(files, { registry: policy, families }).errors.some((error) => error.includes("must not be tracked")));
  fixture.write(policyPath, JSON.stringify(policy));
  assert.throws(fixture.validate, /runtimeTransition is retired/);
});

test("research file and nested collection thresholds warn without rejecting evidence", () => {
  const owner = "reference/priorities/closure/braid/evidence";
  const files = new Map([
    [`${owner}/one/raw.json`, { lineCount: 60000, byteCount: 600 }],
    [`${owner}/two/raw.json`, { lineCount: 60000, byteCount: 600 }],
  ]);
  const result = auditMachineFiles(files, { registry, families });
  assert.deepEqual(result.errors, []);
  assert.equal(result.warnings.filter((message) => message.includes("large machine file")).length, 2);
  assert.ok(result.warnings.some((message) => message.includes(`collection budget exceeded: ${owner} (2 files, 120000 lines`)));
});

test("research byte thresholds warn even for a compact one-line record", () => {
  const result = auditMachineFiles(new Map([
    ["reference/priorities/closure/evidence/raw.json", { lineCount: 1, byteCount: registry.thresholds.evidenceByteCount }],
  ]), { registry, families });
  assert.deepEqual(result.errors, []);
  assert.equal(result.warnings.length, 1);
});

test("research additions warn at the branch threshold and never offset non-research growth", (t) => {
  const fixture = repository(t);
  fixture.write("reference/priorities/closure/analysis/result.csv", "x\n".repeat(101));
  let result = fixture.validate();
  assert.deepEqual(result.errors, []);
  assert.ok(result.warnings.some((message) => message.includes("branch machine-output review threshold exceeded")));
  assert.equal(result.results["working tree"].growth.nonResearch.lineCount, 0);
  fixture.write("one/a.csv", "y\n".repeat(60));
  fixture.write("two/b.csv", "z\n".repeat(60));
  result = fixture.validate();
  assert.ok(result.errors.some((message) => message.includes("budget exceeded outside priority research records: 120 added lines")));
});

test("large staged research remains visible as a warning after working-file shrinkage", (t) => {
  const fixture = repository(t);
  const name = "reference/priorities/closure/evidence/result.jsonl";
  fixture.write(name, "{}\n".repeat(101));
  git(fixture.cwd, "add", name);
  fixture.write(name, "{}\n");
  const result = fixture.validate();
  assert.deepEqual(result.errors, []);
  assert.ok(result.warnings.some((message) => message.startsWith("index:") && message.includes("large machine file")));
  assert.ok(!result.warnings.some((message) => message.startsWith("working tree:") && message.includes("large machine file")));
});

test("research warnings do not excuse missing registered evidence or forbidden runtime output", () => {
  const name = "reference/priorities/closure/evidence/missing.json";
  const policy = { ...registry, records: [{ path: name }] };
  const runtime = families[0].path ?? `${families[0].directory}/tiny.json`;
  const result = auditMachineFiles(new Map([
    [runtime, { lineCount: 1, byteCount: 2 }],
    ["reference/priorities/closure/evidence/large.json", { lineCount: 100001, byteCount: 2000000 }],
  ]), { registry: policy, families });
  assert.ok(result.errors.some((message) => message.includes(`registered machine file is absent: ${name}`)));
  assert.ok(result.errors.some((message) => message.includes(`must not be tracked: ${runtime}`)));
  assert.ok(result.warnings.length > 0);
});

test("CLI prints research review warnings and exits successfully without modifying evidence", (t) => {
  const fixture = repository(t);
  const name = "reference/priorities/closure/evidence/result.jsonl";
  const bytes = "{}\n".repeat(101);
  fixture.write(name, bytes);
  // Copy the actual CLI so its root is the fixture; resolve the real runtime
  // helper and its imports without copying or rebuilding generated assets.
  const source = "scripts/validate-machine-artifact-retention.mjs";
  fixture.write(source, fs.readFileSync(path.join(root, source), "utf8"));
  fs.symlinkSync(path.join(root, "scripts/prepare-runtime-assets.mjs"), path.join(fixture.cwd, "scripts/prepare-runtime-assets.mjs"));
  const output = spawnSync(process.execPath, [source, "--base", "HEAD"], {
    cwd: fixture.cwd, encoding: "utf8", env: GIT_FIXTURE_ENV, stdio: ["pipe", "pipe", "pipe"],
  });
  assert.equal(output.status, 0, output.stderr);
  assert.match(output.stdout, /blocking checks passed; [1-9]\d* advisory storage findings/);
  assert.match(output.stdout, /does not verify research currency/);
  assert.match(output.stderr, /REVIEW: working tree: unregistered large machine file/);
  assert.equal(fs.readFileSync(path.join(fixture.cwd, name), "utf8"), bytes);
});

test("invalid policy and unavailable comparison base still reject", (t) => {
  const fixture = repository(t);
  assert.throws(() => validateMachineArtifactRetention({ rootDir: fixture.cwd, baseRef: "missing-base" }));
  fixture.write(policyPath, JSON.stringify({ ...registry, schema: "invalid" }));
  assert.throws(fixture.validate, /invalid retention registry schema/);
});
