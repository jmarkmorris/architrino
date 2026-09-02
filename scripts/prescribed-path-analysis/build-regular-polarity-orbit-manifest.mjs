#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const SOURCE_MODULE = "src/prescribed-path-analysis/PlanarCoRotatingRingBalance.mjs";
const REDUCTION = "reference/priorities/braid-program/evidence/2026-09-02-bp012-regular-polarity-orbit-reduction.md";

function requireN(n) {
  if (!Number.isSafeInteger(n) || n < 1 || n > 12) throw new TypeError("n must be an integer in [1,12]");
  return n;
}

function fullMask(memberCount) {
  return 2 ** memberCount - 1;
}

function rotateWordMask(mask, memberCount, offset) {
  if (offset === 0) return mask;
  const low = mask % 2 ** offset;
  return Math.floor(mask / 2 ** offset) + low * 2 ** (memberCount - offset);
}

function reflectWordMask(mask, memberCount) {
  let reflected = mask & 1;
  for (let index = 1; index < memberCount; index += 1) {
    if (mask & 2 ** index) reflected += 2 ** (memberCount - index);
  }
  return reflected;
}

function lexicographicallyEarlier(left, right, memberCount) {
  for (let index = 0; index < memberCount; index += 1) {
    const leftBit = Boolean(left & 2 ** index);
    const rightBit = Boolean(right & 2 ** index);
    if (leftBit !== rightBit) return leftBit;
  }
  return false;
}

export function canonicalBalancedOrbitMask(mask, memberCount) {
  const complement = fullMask(memberCount) - mask;
  const reflected = reflectWordMask(mask, memberCount);
  const reflectedComplement = fullMask(memberCount) - reflected;
  const orbit = new Set();
  let canonical = mask;
  for (const seed of [mask, complement, reflected, reflectedComplement]) {
    for (let offset = 0; offset < memberCount; offset += 1) {
      const transformed = rotateWordMask(seed, memberCount, offset);
      orbit.add(transformed);
      if (lexicographicallyEarlier(transformed, canonical, memberCount)) canonical = transformed;
    }
  }
  return { canonical, orbitSize: orbit.size, orbit };
}

function* balancedMasks(memberCount, plusCount, start = 0, mask = 0) {
  if (plusCount === 0) {
    yield mask;
    return;
  }
  for (let index = start; index <= memberCount - plusCount; index += 1) {
    yield* balancedMasks(memberCount, plusCount - 1, index + 1, mask + 2 ** index);
  }
}

function wordFor(mask, memberCount) {
  return Array.from({ length: memberCount }, (_, index) => mask & 2 ** index ? "+" : "-").join("");
}

function classFor(word, n) {
  const polarities = [...word].map((value) => value === "+" ? 1 : -1);
  const alternating = polarities.every((value, index) => value === polarities[0] * (index % 2 === 0 ? 1 : -1));
  const antipodalNeutral = polarities.every((value, index) => index >= n || polarities[index + n] === -value);
  return alternating ? "alternating" : antipodalNeutral ? "antipodal-neutral" : "remaining-balanced";
}

function gcd(left, right) {
  while (right) [left, right] = [right, left % right];
  return left;
}

function binomial(n, k) {
  let value = 1;
  for (let index = 1; index <= k; index += 1) value = value * (n - k + index) / index;
  return value;
}

export function burnsideOrbitCount(n) {
  requireN(n);
  const m = 2 * n;
  let fixed = 0;
  for (let k = 0; k < m; k += 1) {
    const d = gcd(m, k);
    const r = m / d;
    if (n % r === 0) fixed += binomial(d, n / r);
    if (r % 2 === 0) fixed += 2 ** d;
  }
  const edge = n % 2 === 0 ? binomial(m / 2, n / 2) : 0;
  let vertex = 0;
  for (let a = 0; a <= 2; a += 1) {
    if (a % 2 === n % 2) vertex += binomial(2, a) * binomial((m - 2) / 2, (n - a) / 2);
  }
  fixed += m / 2 * edge + m / 2 * vertex + m / 2 * 2 ** (m / 2);
  return fixed / (4 * m);
}

export function enumerateOrbitManifestRows(n) {
  requireN(n);
  const memberCount = 2 * n;
  const rows = [];
  const seen = new Set();
  for (const mask of balancedMasks(memberCount, n)) {
    if (seen.has(mask)) continue;
    const orbit = canonicalBalancedOrbitMask(mask, memberCount);
    for (const member of orbit.orbit) seen.add(member);
    const canonicalWord = wordFor(orbit.canonical, memberCount);
    rows.push({
      classId: `n${n}-${canonicalWord.replaceAll("+", "p").replaceAll("-", "m")}`,
      canonicalWord,
      orbitSize: orbit.orbitSize,
      subclass: classFor(canonicalWord, n),
    });
  }
  rows.sort((left, right) => left.canonicalWord.localeCompare(right.canonicalWord));
  const burnsideCount = burnsideOrbitCount(n);
  const balancedWordCount = binomial(memberCount, n);
  const orbitPopulation = rows.reduce((sum, row) => sum + row.orbitSize, 0);
  if (rows.length !== burnsideCount) throw new Error(`N=${n} manifest/Burnside mismatch`);
  if (orbitPopulation !== balancedWordCount) throw new Error(`N=${n} orbit population mismatch`);
  return { n, memberCount, burnsideCount, balancedWordCount, orbitPopulation, rows };
}

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

export function buildManifest({ minimumN = 7, maximumN = 12 } = {}) {
  const inventories = [];
  for (let n = minimumN; n <= maximumN; n += 1) inventories.push(enumerateOrbitManifestRows(n));
  return {
    schema: "braid-program/regular-polarity-orbit-manifest.v1",
    scope: {
      inventory: `${minimumN}<=N<=${maximumN}`,
      members: "2N",
      balance: "exactly N plus and N minus",
      quotient: "cyclic rotation, global polarity conjugation, and checked reflection-with-circulation action",
      fieldSpeed: "1",
      speedDomain: ["0.05", "20"],
      claimBoundary: "finite polarity-orbit manifest only; no root, residual, balance, evolution, stability, binding or physical claim",
    },
    sourceBindings: [SOURCE_MODULE, REDUCTION].map((path) => ({ path, sha256: sha256(path), bytes: readFileSync(path).length })),
    inventorySummary: inventories.map(({ rows, ...summary }) => ({ ...summary, orbitCount: rows.length })),
    totals: {
      orbitCount: inventories.reduce((sum, row) => sum + row.rows.length, 0),
      balancedWordCount: inventories.reduce((sum, row) => sum + row.balancedWordCount, 0),
    },
    inventories: inventories.map(({ rows, ...summary }) => ({ ...summary, representatives: rows })),
    falsifier: "a balanced word outside exactly one orbit, a noncanonical representative, a manifest/Burnside mismatch, an orbit-population/binomial mismatch, or a failed source binding",
  };
}

function main() {
  const outIndex = process.argv.indexOf("--out");
  if (outIndex < 0 || !process.argv[outIndex + 1]) throw new Error("usage: --out PATH");
  const output = resolve(process.argv[outIndex + 1]);
  const manifest = buildManifest();
  const bytes = `${JSON.stringify(manifest, null, 2)}\n`;
  writeFileSync(output, bytes, { flag: "wx" });
  console.log(JSON.stringify({
    output,
    bytes: Buffer.byteLength(bytes),
    sha256: createHash("sha256").update(bytes).digest("hex"),
    orbitCount: manifest.totals.orbitCount,
    balancedWordCount: manifest.totals.balancedWordCount,
    inventorySummary: manifest.inventorySummary,
  }, null, 2));
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
