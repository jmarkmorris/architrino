import { productionIdentities } from "../equation-mapping/production-source-records.mjs";
const OPTION_B_PRODUCTION_IDENTITIES = productionIdentities(import.meta.url);
import { createHash } from "node:crypto";
import { existsSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Independent fixed-point interval reference; imports no production geometry,
// EOM solver, decimal helper, or history generator.
export const Q = 10n ** 60n;
const S = 10n ** 12n;
const N = 4096n;
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SOURCE_BINDINGS = Object.freeze([
  ["coincident-midpoint-common-frequency", "three-axis-circular-coincident-midpoints-common-frequency.v3.json", OPTION_B_PRODUCTION_IDENTITIES[0]],
  ["coincident-midpoint-equal-radius-common-frequency", "three-axis-circular-coincident-midpoints-equal-radius-common-frequency.v3.json", OPTION_B_PRODUCTION_IDENTITIES[1]],
  ["coincident-midpoint-3-2-1-frequency", "three-axis-circular-coincident-midpoints-3-2-1-frequency.v3.json", OPTION_B_PRODUCTION_IDENTITIES[2]],
  ["phase-compensated-equal-geometry", "three-axis-circular-phase-compensated-symmetric.v3.json", OPTION_B_PRODUCTION_IDENTITIES[3]],
  ["axially-separated-common-frequency", "three-axis-circular-axially-separated-common-frequency.v3.json", OPTION_B_PRODUCTION_IDENTITIES[4]],
  ["axially-separated-equal-radius-common-frequency", "three-axis-circular-axially-separated-equal-radius-common-frequency.v3.json", OPTION_B_PRODUCTION_IDENTITIES[5]],
  ["axially-separated-3-2-1-frequency", "three-axis-circular-axially-separated-3-2-1-frequency.v3.json", OPTION_B_PRODUCTION_IDENTITIES[6]],
  ["axial-transverse-coincident-axis-interior", "axial-transverse-three-binary-interior.v3.json", OPTION_B_PRODUCTION_IDENTITIES[7]],
  ["high-axial-coincident-axis-interior", "high-axial-three-binary-interior.v3.json", OPTION_B_PRODUCTION_IDENTITIES[8]],
  ["planar-common-center-three-binary", "planar-three-binary-common-center-reference.v3.json", OPTION_B_PRODUCTION_IDENTITIES[9]],
  ["coincident-center-two-component-circular-co-rotating", "coincident-center-two-component-circular-co-rotating.v3.json", OPTION_B_PRODUCTION_IDENTITIES[10]],
  ["coincident-center-two-component-circular-counter-rotating", "coincident-center-two-component-circular-counter-rotating.v3.json", OPTION_B_PRODUCTION_IDENTITIES[11]],
  ["coaxial-separated-two-component-circular-co-rotating", "coaxial-separated-two-component-circular-co-rotating.v3.json", OPTION_B_PRODUCTION_IDENTITIES[12]],
  ["coaxial-separated-two-component-circular-counter-rotating", "coaxial-separated-two-component-circular-counter-rotating.v3.json", OPTION_B_PRODUCTION_IDENTITIES[13]],
  ["coaxial-separated-two-planar-braid-co-rotating", "coaxial-separated-two-planar-braid-co-rotating.v3.json", OPTION_B_PRODUCTION_IDENTITIES[14]],
  ["coaxial-separated-two-planar-braid-counter-rotating", "coaxial-separated-two-planar-braid-counter-rotating.v3.json", OPTION_B_PRODUCTION_IDENTITIES[15]],
].map(([id, filename, sha256]) => Object.freeze({ id, path: `reference/priorities/braid-program/configurations/${filename}`, sha256 })));
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const abs = (x) => x < 0n ? -x : x;
const max = (a, b) => a > b ? a : b;

export function decimalToken(s) {
  if (typeof s !== "string") throw new Error("exact source decimal token required");
  const m = s.match(/^([+-]?)(\d+)(?:\.(\d*))?(?:[eE]([+-]?\d+))?$/u);
  if (!m) throw new Error(`invalid decimal ${s}`);
  const p = 60 - (m[3]?.length ?? 0) + Number(m[4] ?? 0);
  if (!Number.isSafeInteger(p) || p < 0 || p > 400) throw new Error("input outside fixed-point domain");
  return (m[1] === "-" ? -1n : 1n) * BigInt(m[2] + (m[3] ?? "")) * 10n ** BigInt(p);
}
export function floorDivide(a, b) {
  if (b <= 0n) throw new Error("positive divisor required");
  let z = a / b;
  if (a < 0n && a % b) z--;
  return z;
}
const ceilDivide = (a, b) => -floorDivide(-a, b);
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const neg = (a) => [-a[1], -a[0]];
const sub = (a, b) => add(a, neg(b));
export function multiply(a, b) {
  const v = [a[0] * b[0], a[0] * b[1], a[1] * b[0], a[1] * b[1]];
  return [floorDivide(v.reduce((x, y) => x < y ? x : y), Q), ceilDivide(v.reduce(max), Q)];
}
const divide = (a, n) => [floorDivide(a[0], n), ceilDivide(a[1], n)];
const twice = (a) => [2n * a[0], 2n * a[1]];
const point = (x) => [x, x];

export function sinCos(arg) {
  let x = arg, k = 0;
  while (max(abs(x[0]), abs(x[1])) > Q / 4n) {
    x = divide(x, 2n);
    if (++k > 64) throw new Error("trigonometric domain exceeded");
  }
  const x2 = multiply(x, x);
  let st = x, ct = point(Q), s = st, c = ct;
  for (let j = 1n; j <= 24n; j++) {
    st = neg(divide(multiply(st, x2), 2n * j * (2n * j + 1n)));
    ct = neg(divide(multiply(ct, x2), 2n * j * (2n * j - 1n)));
    s = add(s, st); c = add(c, ct);
  }
  // For |x|<=1/4, Taylor remainders through degrees 49/48 are
  // < (1/4)^50/50! and (1/4)^49/49!, both strictly < 1e-60.
  s = [s[0] - 1n, s[1] + 1n]; c = [c[0] - 1n, c[1] + 1n];
  for (let j = 0; j < k; j++) {
    const nextS = twice(multiply(s, c)), nextC = sub(multiply(c, c), multiply(s, s));
    s = nextS; c = nextC;
  }
  return { s, c };
}
function isqrt(n) {
  if (n < 0n) throw new Error("negative square root");
  if (n < 2n) return n;
  let x = 1n << BigInt((n.toString(2).length + 1) >> 1);
  for (;;) { const y = (x + n / x) >> 1n; if (y >= x) return x; x = y; }
}
export function rootLo(n, d) {
  if (n < 0n || d <= 0n) throw new Error("invalid root ratio");
  let x = isqrt(n * S * S / d);
  while ((x + 1n) * (x + 1n) * d <= n * S * S) x++;
  while (x * x * d > n * S * S) x--;
  return x;
}
export function rootHi(n, d) {
  const x = rootLo(n, d);
  return x * x * d === n * S * S ? x : x + 1n;
}
const fmt = (x) => `${x < 0n ? "-" : ""}${abs(x) / S}.${(abs(x) % S).toString().padStart(12, "0")}`;
const dot = (a, b) => a.reduce((z, x, i) => z + x * b[i], 0n);

export function deriveReference({ progress = () => {} } = {}) {
  const started = Date.now();
  let lastHeartbeat = started;
  const instrumentPath = fileURLToPath(import.meta.url);
  const instrumentBytes = readFileSync(instrumentPath);
  const bindings = SOURCE_BINDINGS;
  const results = [];
  progress({ status: "started", candidateCount: 16, samplesPerRow: Number(N) + 1 });
  for (const binding of bindings) {
    const target = realpathSync(path.resolve(ROOT, binding.path));
    if (!target.startsWith(`${ROOT}${path.sep}`)) {
      throw new Error(`invalid source binding ${binding.id}`);
    }
    const raw = readFileSync(target);
    if (sha(raw) !== binding.sha256) throw new Error(`source drift ${binding.id}`);
    const spec = JSON.parse(raw.toString(), (_key, value, context) =>
      typeof value === "number" ? context.source : value);
    const byConstituent = new Map(spec.worldlines.map((item) => [item.constituentId, item]));
    const rows = spec.relationships.sourceOrder.map((id) => byConstituent.get(id)).map((w) => {
      const o = w.operator;
      if (o.kind !== "moving-circular.v1" || o.centerVelocity.some((v) => decimalToken(v) !== 0n) ||
          decimalToken(o.angularAcceleration) !== 0n) throw new Error("nonuniform source");
      return { id: w.id, C: o.centerAtEpoch.map(decimalToken), U: o.radiusU.map(decimalToken),
        V: o.radiusV.map(decimalToken), om: decimalToken(o.angularVelocity),
        ph: decimalToken(o.phaseAtEpoch), epoch: decimalToken(o.epochTime) };
    });
    if (![6, 12].includes(rows.length) || new Set(rows.map((r) => r.id)).size !== rows.length ||
        rows.length !== spec.constituents.length || rows.length !== spec.worldlines.length) {
      throw new Error("incomplete member census");
    }
    let qmax = 0n, v2max = 0n, dotsZero = true;
    for (const r of rows) {
      const uv = dot(r.U, r.V), cu = dot(r.C, r.U), cv = dot(r.C, r.V);
      const b = max(dot(r.U, r.U), dot(r.V, r.V)) + abs(uv);
      qmax = max(qmax, dot(r.C, r.C) + b + 2n * (abs(cu) + abs(cv)));
      v2max = max(v2max, r.om * r.om * b);
      dotsZero &&= uv === 0n && cu === 0n && cv === 0n;
    }
    const D = 2n * rootHi(qmax, Q * Q), v = rootHi(v2max, Q ** 4n);
    let min2 = null, witnessPair = null, witnessSample = null;
    const rowStarted = Date.now();
    for (let ti = 0n; ti <= N; ti++) {
      const now = Date.now();
      if (now - started >= 1800000) throw new Error("1800-second reference resource limit");
      if (now - lastHeartbeat >= 15000) {
        progress({ status: "running", candidate: binding.id, sample: Number(ti),
          completedCandidates: results.length, elapsedSeconds: (now - started) / 1000 });
        lastHeartbeat = now;
      }
      const t = 8n * Q * ti / N, cache = new Map();
      const positions = rows.map((r) => {
        const arg = add(point(r.ph), multiply(point(r.om), point(t - r.epoch)));
        const key = arg.join(",");
        if (!cache.has(key)) cache.set(key, sinCos(arg));
        const tr = cache.get(key);
        return r.C.map((x, k) => add(point(x),
          add(multiply(point(r.U[k]), tr.c), multiply(point(r.V[k]), tr.s))));
      });
      for (let i = 0; i < rows.length; i++) for (let j = i + 1; j < rows.length; j++) {
        let squared = 0n;
        for (let k = 0; k < 3; k++) {
          const delta = sub(positions[i][k], positions[j][k]);
          const lower = delta[0] > 0n ? delta[0] : delta[1] < 0n ? -delta[1] : 0n;
          squared += lower * lower;
        }
        if (min2 === null || squared < min2) {
          min2 = squared; witnessPair = [rows[i].id, rows[j].id]; witnessSample = Number(ti);
        }
      }
    }
    const sampleLo = rootLo(min2, Q * Q), penalty = ceilDivide(v * 8n, N);
    const clearance = sampleLo - penalty;
    const passed = qmax < Q * Q && v2max < Q ** 4n && clearance > 0n && D < 2n * S && v < S;
    results.push({ id: binding.id, sourcePath: binding.path, sourceSha256: binding.sha256,
      passed, memberCount: rows.length, orderedPairsPerReception: rows.length ** 2,
      Dupper: fmt(D), vUpper: fmt(v), continuousClearanceLower: fmt(clearance),
      depthMarginLower: fmt(2n * S - D), factorMarginLower: fmt(S - v),
      sampleDistanceLower: fmt(sampleLo), sampleLipschitzPenaltyUpper: fmt(penalty),
      witnessPair, witnessSample, exactOrthogonalDotProducts: dotsZero,
      elapsedSeconds: (Date.now() - rowStarted) / 1000 });
    progress({ status: "candidate-complete", ...results.at(-1) });
    if (!passed) break;
  }
  for (const binding of bindings) {
    if (sha(readFileSync(path.join(ROOT, binding.path))) !== binding.sha256) throw new Error("midrun source drift");
  }
  if (sha(readFileSync(instrumentPath)) !== sha(instrumentBytes)) throw new Error("midrun reference drift");
  const elapsedSeconds = (Date.now() - started) / 1000;
  if (elapsedSeconds >= 1800) throw new Error("1800-second reference resource limit");
  return { schema: "braid-program/subfield-circular-root-reference.v1",
    accepted: results.length === 16 && results.every((row) => row.passed),
    eomInvoked: false, h3ExecutionValidated: false, normalizedFieldSpeed: "1",
    instrumentSha256: sha(instrumentBytes),
    interval: ["0", "8"], receptionInterval: ["4", "8"], retainedHistoryDepth: "2",
    samplesPerRow: Number(N) + 1, arithmetic: "integer outward intervals at 1e-60; exact JSON decimals; dyadic Taylor 49/48 with 1e-60 remainder",
    claim: "Source-bound analytic nonself root uniqueness and absence of positive-delay self roots only; no adapter, root ledger, acceleration, evolution, retention, stability, score, or physical claim.",
    elapsedSeconds, results };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length !== 4 || process.argv[2] !== "--out") throw new Error("Usage: node scripts/eom/derive-subfield-circular-root-reference.mjs --out <new-path>");
    const output = process.argv[3];
    if (existsSync(output)) throw new Error("output already exists; use a new path");
    const report = deriveReference({ progress: (event) => process.stderr.write(`${JSON.stringify(event)}\n`) });
    writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`, { flag: "wx" });
    process.stdout.write(`${JSON.stringify({ accepted: report.accepted, candidates: report.results.length, eomInvoked: false, elapsedSeconds: report.elapsedSeconds })}\n`);
    if (!report.accepted) process.exitCode = 1;
  } catch (error) { process.stderr.write(`${error.message}\n`); process.exitCode = 1; }
}
