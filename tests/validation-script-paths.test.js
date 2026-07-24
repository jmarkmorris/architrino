import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const checker = path.join(repoRoot, "scripts/check-validation-script-paths.mjs");

function fixture() {
  const root = fs.mkdtempSync(
    path.join(os.tmpdir(), "validation-script-paths-"),
  );
  const markdownRoot = path.join(
    root,
    "content/markdown/aaa/validation/simulations",
  );
  fs.mkdirSync(markdownRoot, { recursive: true });
  return { root, markdownRoot };
}

function runChecker(root, markdownRoot) {
  return spawnSync(
    process.execPath,
    [checker, `--root=${root}`, `--markdown-root=${markdownRoot}`],
    { encoding: "utf8" },
  );
}

test("passes existing validation-document script references", () => {
  const { root, markdownRoot } = fixture();
  fs.mkdirSync(path.join(root, "scripts/demo"), { recursive: true });
  fs.writeFileSync(path.join(root, "scripts/demo/run.mjs"), "");
  fs.writeFileSync(
    path.join(markdownRoot, "demo.md"),
    "Run `node scripts/demo/run.mjs`.\n",
  );

  const result = runChecker(root, markdownRoot);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /passed: 1 reference/);
});

test("fails an undeclared missing validation-document script reference", () => {
  const { root, markdownRoot } = fixture();
  fs.writeFileSync(
    path.join(markdownRoot, "demo.md"),
    "Run `node scripts/demo/missing.mjs`.\n",
  );

  const result = runChecker(root, markdownRoot);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /undeclared missing script path/);
});

test("allows a nearby explicit not-implemented specification marker", () => {
  const { root, markdownRoot } = fixture();
  fs.writeFileSync(
    path.join(markdownRoot, "demo.md"),
    [
      "**Implementation status:** not implemented.",
      "",
      "Reserved path: `scripts/demo/planned.mjs`.",
      "",
    ].join("\n"),
  );

  const result = runChecker(root, markdownRoot);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /1 explicitly planned missing path/);
});
