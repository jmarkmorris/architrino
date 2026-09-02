import test from "node:test";
import assert from "node:assert/strict";

import {
  burnsideOrbitCount,
  canonicalBalancedOrbitMask,
  enumerateOrbitManifestRows,
} from "../scripts/prescribed-path-analysis/build-regular-polarity-orbit-manifest.mjs";
import {
  canonicalPolarityOrbit,
  enumerateBalancedPolarityClasses,
} from "../src/prescribed-path-analysis/PlanarCoRotatingRingBalance.mjs";

function maskFor(word) {
  return [...word].reduce((mask, value, index) => mask + (value === "+" ? 2 ** index : 0), 0);
}

test("integer orbit canonicalization matches the pre-existing string implementation", () => {
  for (const word of ["++--", "+-+-+-", "+++---+-", "++++----++--"]) {
    const polarities = [...word].map((value) => value === "+" ? 1 : -1);
    const expected = canonicalPolarityOrbit(polarities, { includeReflection: true });
    const actual = canonicalBalancedOrbitMask(maskFor(word), word.length);
    const actualWord = Array.from({ length: word.length }, (_, index) =>
      actual.canonical & 2 ** index ? "+" : "-").join("");
    assert.equal(actualWord, expected.canonicalWord);
    assert.equal(actual.orbitSize, expected.orbit.length);
  }
});

test("manifest enumeration matches the accepted implementation and Burnside counts through N=9", () => {
  for (let n = 2; n <= 9; n += 1) {
    const manifest = enumerateOrbitManifestRows(n);
    const accepted = enumerateBalancedPolarityClasses(n, { includeReflection: true });
    assert.equal(manifest.rows.length, accepted.length);
    assert.equal(manifest.rows.length, burnsideOrbitCount(n));
    assert.deepEqual(manifest.rows.map((row) => row.canonicalWord), accepted.map((row) => row.canonicalWord));
    assert.deepEqual(manifest.rows.map((row) => row.orbitSize), accepted.map((row) => row.orbitSize));
  }
});

test("full BP-012 manifest census has the derived N=7 through N=12 counts", () => {
  const expected = new Map([[7, 85], [8, 257], [9, 765], [10, 2518], [11, 8359], [12, 28968]]);
  for (const [n, count] of expected) assert.equal(enumerateOrbitManifestRows(n).rows.length, count);
});
