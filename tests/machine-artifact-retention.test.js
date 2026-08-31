import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { auditMachineFiles, measureMachineFile, validateMachineArtifactRetention } from "../scripts/validate-machine-artifact-retention.mjs";

const root = path.resolve(import.meta.dirname, "..");
const policyPath = "reference/op/machine-artifact-retention-registry.v1.json";
const manifestPath = "scripts/config/generated-runtime-assets.json";
const registry = JSON.parse(fs.readFileSync(path.join(root, policyPath)));
const families = JSON.parse(fs.readFileSync(path.join(root, manifestPath))).families;
const git = (cwd, ...args) => execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });

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

test("generated runtime paths cannot be force-added even when tiny", () => {
  const files = new Map([["content/assets/borg/records/tiny.json", { lineCount: 1, byteCount: 2 }]]);
  assert.ok(auditMachineFiles(files, { registry, families }).errors.some((error) => error.includes("must not be tracked")));
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
