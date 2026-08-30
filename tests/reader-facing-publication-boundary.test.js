import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const CHECKER = path.join(
  ROOT,
  "scripts/check-reader-facing-publication-boundary.mjs"
);

function run(target) {
  return spawnSync(process.execPath, [CHECKER, target], {
    cwd: ROOT,
    encoding: "utf8",
  });
}

test("reader-facing publication boundary accepts academic evidence prose without raw identifiers", (t) => {
  const fixtureRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), "architrino-publication-boundary-clean-")
  );
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const file = path.join(fixtureRoot, "chapter.md");
  fs.writeFileSync(
    file,
    "# Result\n\nThe validation record uses SHA-256 internally and reports the measured tolerance.\n"
  );

  const result = run(file);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /passed across 1 Markdown files/u);
});

test("reader-facing publication boundary rejects raw content digests", (t) => {
  const fixtureRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), "architrino-publication-boundary-digest-")
  );
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const file = path.join(fixtureRoot, "chapter.md");
  fs.writeFileSync(file, `# Result\n\nRecord: ${"a".repeat(64)}\n`);

  const result = run(file);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /raw-content-digest/u);
  assert.match(result.stderr, /chapter\.md:3/u);
});

test("reader-facing publication boundary permits hashes in URLs and link targets", (t) => {
  const fixtureRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), "architrino-publication-boundary-urls-")
  );
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const file = path.join(fixtureRoot, "chapter.md");
  const digest = "b".repeat(64);
  fs.writeFileSync(file, [
    "# Evidence",
    `[Validation data](../data/${digest}.json)`,
    `[Equation](../equations.html#${digest})`,
    `[release]: https://example.org/data/${digest} "Validation release"`,
    `[Validation data][${digest}]`,
    `[${digest}]: ../data/release.json`,
    `https://example.org/data/${digest}`,
    `<a href="../data/${digest}.json">Validation data</a>`,
    `<a id="${digest}"></a>`,
    `<img src="../images/${digest}.png" alt="Geometry">`,
  ].join("\n"));

  const result = run(file);
  assert.equal(result.status, 0, result.stderr);
});

test("reader-facing publication boundary still rejects hashes in link labels and adjacent prose", (t) => {
  const fixtureRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), "architrino-publication-boundary-visible-")
  );
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const file = path.join(fixtureRoot, "chapter.md");
  const digest = "c".repeat(64);
  fs.writeFileSync(file, [
    "# Evidence",
    `[${digest}](https://example.org/data/${digest})`,
    `Record ${digest}; data: https://example.org/data/${digest}`,
    `[Data](https://example.org/data "${digest}")`,
  ].join("\n"));

  const result = run(file);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /3 violation\(s\)/u);
});

test("reader-facing publication boundary rejects priority and operator scaffolding", (t) => {
  const fixtureRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), "architrino-publication-boundary-process-")
  );
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const file = path.join(fixtureRoot, "chapter.md");
  fs.writeFileSync(
    file,
    "# Chapter\n\n## Document Status\n\n## Outstanding Work\n\n### Deferred by operator decision — no action\n\nClosure goal: publish this chapter.\n"
  );

  const result = run(file);
  assert.equal(result.status, 1);
  for (const rule of [
    "internal-document-status",
    "internal-outstanding-work",
    "internal-operator-deferral",
    "internal-closure-prompt",
  ]) {
    assert.match(result.stderr, new RegExp(rule, "u"));
  }
});
