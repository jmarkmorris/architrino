import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { Q, decimalToken, floorDivide, multiply, rootLo, rootHi, sinCos } from "../scripts/eom/derive-subfield-circular-root-reference.mjs";

test("integer decimal parsing and directed division preserve exact fractions", () => {
  assert.equal(decimalToken("0.125"), Q / 8n);
  assert.equal(decimalToken("-1.25e-2"), -Q / 80n);
  assert.throws(() => decimalToken(0.1), /exact source/);
  assert.throws(() => decimalToken("1e-61"), /domain/);
  assert.equal(floorDivide(-1n, 3n), -1n);
  assert.equal(floorDivide(1n, 3n), 0n);
  assert.deepEqual(multiply([-1n, -1n], [1n, 1n]), [-1n, 0n]);
});

test("integer square-root bounds satisfy exact squared inequalities", () => {
  for (let numerator = 0n; numerator <= 99n; numerator++) for (const denominator of [1n, 3n, 19n]) {
    const lo = rootLo(numerator, denominator), hi = rootHi(numerator, denominator);
    assert(lo * lo * denominator <= numerator * 10n ** 24n);
    assert(hi * hi * denominator >= numerator * 10n ** 24n);
    assert(hi - lo <= 1n);
  }
});

test("Taylor remainder allowance follows exact factorial inequalities", () => {
  let factorial = 1n;
  for (let n = 1n; n <= 50n; n++) {
    factorial *= n;
    if (n === 49n || n === 50n) assert(4n ** n * factorial > Q);
  }
  const zero = sinCos([0n, 0n]);
  assert(zero.s[0] <= 0n && zero.s[1] >= 0n);
  assert(zero.c[0] <= Q && zero.c[1] >= Q);
});

test("sine and cosine rational near-zero controls need no library trigonometry", () => {
  const x = Q / 1000n;
  const { s, c } = sinCos([x, x]);
  // Alternating-series exact rational bounds: x-x^3/6 <= sin x <=
  // x-x^3/6+x^5/120; 1-x^2/2 <= cos x <= 1-x^2/2+x^4/24.
  assert(s[0] * 6n * Q ** 2n <= 6n * x * Q ** 2n);
  assert(s[1] * 6n * Q ** 2n >= 6n * x * Q ** 2n - x ** 3n);
  assert(c[0] <= Q);
  assert(c[1] * 2n * Q >= 2n * Q ** 2n - x ** 2n);
  const negative = sinCos([-x, -x]);
  assert.deepEqual(negative.s, [-s[1], -s[0]]);
  assert.deepEqual(negative.c, c);
});

test("reference output cannot overwrite existing evidence", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "subfieldCircular-reference-test-"));
  try {
    const output = path.join(directory, "preserve.json");
    writeFileSync(output, "preserve\n");
    const result = spawnSync(process.execPath, ["scripts/eom/derive-subfield-circular-root-reference.mjs", "--out", output], { encoding: "utf8" });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /output already exists/);
    assert.equal(readFileSync(output, "utf8"), "preserve\n");
  } finally { rmSync(directory, { recursive: true }); }
});
