import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const fallbackPython = resolve(ROOT, "../.venv/bin/python");
const python = process.env.AAA_VENV
  ? resolve(process.env.AAA_VENV, "bin/python")
  : fallbackPython;

const runChecker = (relativePath) => {
  assert.equal(existsSync(python), true, `shared Python environment missing at ${python}`);
  return execFileSync(python, [resolve(ROOT, relativePath)], {
    cwd: ROOT,
    encoding: "utf8",
  });
};

test("BP-011 fold-boundary lattice and balance re-expansion checker passes", () => {
  const output = runChecker("scripts/equation-mapping/check_bp011_fold_boundary_balance.py");
  assert.match(output, /background beta\^\(-3\/2\) coefficient:/);
  assert.match(output, /balance beta\^\(-9\/2\) coefficient:/);
  assert.match(output, /PASS/);
});

test("BP-014 first-fold boundary-layer limiting algebra checker passes", () => {
  const output = runChecker("scripts/equation-mapping/check_bp014_boundary_layer_limit.py");
  assert.match(output, /boundary-layer d_\*:/);
  assert.match(output, /compatible-radius N\^\(5\/3\) coefficient:/);
  assert.match(output, /PASS/);
});
