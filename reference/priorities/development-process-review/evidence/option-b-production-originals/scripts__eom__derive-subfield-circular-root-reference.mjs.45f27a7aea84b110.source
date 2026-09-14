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
  ["coincident-midpoint-common-frequency", "three-axis-circular-coincident-midpoints-common-frequency.v3.json", "92ddbd4c1e84c6d4e79042e8883331d832b16ab60c47da05c0c892da39a5de4c"],
  ["coincident-midpoint-equal-radius-common-frequency", "three-axis-circular-coincident-midpoints-equal-radius-common-frequency.v3.json", "101322087af98a8ec4cb4220f4edf44e85fbe288ac5c0c39b6c7808a9114726c"],
  ["coincident-midpoint-3-2-1-frequency", "three-axis-circular-coincident-midpoints-3-2-1-frequency.v3.json", "b902c55d8b017343231b9a42d652f02b65e94d0a9be23cb54210e75521e6f421"],
  ["phase-compensated-equal-geometry", "three-axis-circular-phase-compensated-symmetric.v3.json", "d134a93f18dbeca695f19612b0b38f110e8c8792b203b84763860b17e0f04779"],
  ["axially-separated-common-frequency", "three-axis-circular-axially-separated-common-frequency.v3.json", "ca053e0cbd52b36faebb462f0de7d68039496670019c8aa7571c64070b9e7745"],
  ["axially-separated-equal-radius-common-frequency", "three-axis-circular-axially-separated-equal-radius-common-frequency.v3.json", "a133444b64c6783400f5da3400514cc3c64d96ec650996b656f1f532a09fcb58"],
  ["axially-separated-3-2-1-frequency", "three-axis-circular-axially-separated-3-2-1-frequency.v3.json", "857036cad78931d7b8d6cfb83a330ae81176838a352eafff00218f77bae0b780"],
  ["axial-transverse-coincident-axis-interior", "axial-transverse-three-binary-interior.v3.json", "d3f7e77ec8cd4c49e857ab4cb788330e8ac47b452ad01da468fe96e3e49db30c"],
  ["high-axial-coincident-axis-interior", "high-axial-three-binary-interior.v3.json", "2b9455a1be23b2d68c8e3938cf0e4420a473501ec89e0f5d36faa5b68f7f0b17"],
  ["planar-common-center-three-binary", "planar-three-binary-common-center-reference.v3.json", "ac59dcee4d5e6835f31dc11f1d3d04c508b19a323d36db080f3bb9efcbf633b5"],
  ["coincident-center-two-component-circular-co-rotating", "coincident-center-two-component-circular-co-rotating.v3.json", "436971bc0944d57b3fc0e82432175369fd7a2b0ba62aef6c979485ade8215df7"],
  ["coincident-center-two-component-circular-counter-rotating", "coincident-center-two-component-circular-counter-rotating.v3.json", "58089a29820c8c085a8f25a9dc1f77d4d302f832eff5d5436b23a7227735df14"],
  ["coaxial-separated-two-component-circular-co-rotating", "coaxial-separated-two-component-circular-co-rotating.v3.json", "6f5a054684791c8b21b75744b41561e83a491e4d0fa515f1d314dab32c5727e1"],
  ["coaxial-separated-two-component-circular-counter-rotating", "coaxial-separated-two-component-circular-counter-rotating.v3.json", "e1e5b2db5761021bcd51acd8316991ec9bfc9a84e259767976acaf898c81b391"],
  ["coaxial-separated-two-planar-braid-co-rotating", "coaxial-separated-two-planar-braid-co-rotating.v3.json", "8a10bcd5c63f5aedb217a930f92856f1a394a18d206b352c44c826590f6b5295"],
  ["coaxial-separated-two-planar-braid-counter-rotating", "coaxial-separated-two-planar-braid-counter-rotating.v3.json", "3a8eb45f411e0789818ea20a5cb8fb9295801945fcaab1b539f594e2e8e722d8"],
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
