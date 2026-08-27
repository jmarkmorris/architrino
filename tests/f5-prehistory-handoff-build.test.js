import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { minimalBinding, parseArgs, snapshot, SOURCE_OWNERS } from "../scripts/eom/prepare-f5-prehistory-handoff-build.mjs";

const root = process.cwd();
const self = "scripts/eom/prepare-f5-prehistory-handoff-build.mjs";
const digest = createHash("sha256").update(readFileSync(self)).digest("hex");
const args = ["--out", ".local-data/braid-analysis/f5-prehistory-handoff-build-20260827/synthetic-not-created",
  "--python", "/synthetic/venv/python", "--builder-sha256", digest];

test("build arguments preserve explicit fresh lane and runtime", () => {
  const parsed = parseArgs(args);
  assert.equal(parsed.output, path.join(root, args[1]));
  assert.equal(parsed.python, args[3]);
  assert.equal(parsed.sha, digest);
});
test("build rejects missing, repeated, unknown, escaping and unbound inputs", () => {
  for (const input of [args.slice(0, 4), [...args, "--out", args[1]], [...args, "--run", "yes"],
    ["--out", ".tmp/other", ...args.slice(2)], ["--out", args[1]+"/../escape", ...args.slice(2)],
    [...args.slice(0, 3), "python", ...args.slice(4)], [...args.slice(0, 5), "bad"]])
    assert.throws(() => parseArgs(input));
});
test("minimal binding matches producer closed file-record shape", () => {
  const record = minimalBinding(self);
  assert.deepEqual(Object.keys(record).sort(), ["bytes", "path", "sha256"]);
  assert.equal(record.path, path.join(root, self));
  assert.equal(record.sha256, digest);
  assert.equal(record.bytes, readFileSync(self).length);
});
test("source snapshot binds fresh builder, whole EOM owners and frozen references", () => {
  const records = snapshot(digest);
  assert.equal(records.find((r) => r.path === self).sha256, digest);
  for (const [filename, expected] of Object.entries(SOURCE_OWNERS))
    assert.equal(records.find((r) => r.path === filename).sha256, expected);
  assert.ok(records.some((r) => r.path === "scripts/eom/verify-f5-prehistory-handoff.py"));
  assert.equal(new Set(records.map((r) => r.path)).size, records.length);
  assert.throws(() => snapshot("0".repeat(64)), /reviewed source drift/);
});
test("build source uses two compilation workers and no data invocation", () => {
  const source = readFileSync(self, "utf8");
  assert.match(source, /"--parallel", "2"/);
  assert.match(source, /"-DCMAKE_EXPORT_COMPILE_COMMANDS=ON"/);
  assert.match(source, /"-DEOM_ENABLE_SANITIZERS=OFF"/);
  assert.match(source, /actual compiler dependencies/);
  assert.match(source, /await watched\("help-control", executable, \["--help"\]\)/);
  for (const token of ["--inspect", "root-ladder-20260827-v2", "run-f5-enclosed-root", "handoff.json"])
    assert.ok(!source.includes(token));
});
