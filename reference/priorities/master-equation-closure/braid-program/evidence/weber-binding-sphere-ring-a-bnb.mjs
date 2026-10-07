#!/usr/bin/env node
// Lane A: validated branch-and-bound for rigid inverse-square ring balance (K = R = 1).
// Trust base: IEEE-754 binary64 round-to-nearest for + - * / ; own Taylor sine/cosine with a
// hand-proved absolute error bound (<= 5e-13, widened in code by E = 1e-12); explicit outward
// widening after every block of floating operations. No library trigonometric function is used
// inside any enclosure (Math.sin/Math.cos appear only in the independent point evaluator of KA1).
import { createHash } from 'node:crypto';
import fs from 'node:fs';

const PI2_LO = 6.283185307179586, PI2_HI = 6.283185307179587; // 2pi = 6.28318530717958647...
const PI_LO = 3.141592653589793, PI_HI = 3.1415926535897936;   // pi  = 3.14159265358979323...
const E = 1e-12;      // trig widening (proved error <= 5e-13; slack absorbs rounding of c+-E, s+-E)
const AW = 1e-12;     // arc endpoint widening (float sums of <= 6 numbers below 7: error < 1e-14)
const up = (x) => x + Math.abs(x) * 1e-13 + 1e-300;
const dn = (x) => x - Math.abs(x) * 1e-13 - 1e-300;

export function sincos(x) { // x in [0, 3.2]; returns [sin x, cos x], abs error <= 5e-13 (see document)
  const y = x * 0.125, y2 = y * y;
  let s = y * (1 + y2 * (-1 / 6 + y2 * (1 / 120 + y2 * (-1 / 5040 + y2 * (1 / 362880 + y2 * (-1 / 39916800 + y2 * (1 / 6227020800 + y2 * (-1 / 1307674368000))))))));
  let c = 1 + y2 * (-1 / 2 + y2 * (1 / 24 + y2 * (-1 / 720 + y2 * (1 / 40320 + y2 * (-1 / 3628800 + y2 * (1 / 479001600 + y2 * (-1 / 87178291200 + y2 * (1 / 20922789888000))))))));
  for (let k = 0; k < 3; k++) { const s2 = 2 * s * c, c2 = 1 - 2 * s * s; s = s2; c = c2; }
  return [s, c];
}
// h(psi) = cos(psi/2)/(4 sin^2(psi/2)), strictly decreasing on (0, 2pi).
function hUp(psi) { const [s, c] = sincos(0.5 * psi); const cu = c + E; const sd = cu >= 0 ? s - E : s + E; if (!(s - E > 0)) throw new Error('s too small'); return up(cu / (4 * sd * sd)); }
function hLo(psi) { const [s, c] = sincos(0.5 * psi); const cl = c - E; const sd = cl >= 0 ? s + E : s - E; if (!(s - E > 0)) throw new Error('s too small'); return dn(cl / (4 * sd * sd)); }
// u(psi) = 1/(4 sin(psi/2)), convex, minimum 1/4 at pi.
function uUp(psi) { const [s] = sincos(0.5 * psi); if (!(s - E > 0)) throw new Error('s too small'); return up(1 / (4 * (s - E))); }
function uLo(psi) { const [s] = sincos(0.5 * psi); return dn(1 / (4 * (s + E))); }
// k(psi) = -h'(psi) = (1+cos^2(psi/2))/(8 sin^3(psi/2)) > 0, decreasing on (0,pi], symmetric about pi.
function kUp(psi) { const [s, c] = sincos(0.5 * psi); const cu = Math.abs(c) + E, sd = s - E; if (!(sd > 0)) throw new Error('s too small'); return up((1 + cu * cu) / (8 * sd * sd * sd)); }
function kLo(psi) { const [s, c] = sincos(0.5 * psi); const cl = Math.max(Math.abs(c) - E, 0), sd = s + E; return dn((1 + cl * cl) / (8 * sd * sd * sd)); }

export function makeSystem(word, delta) {
  const N = word.length, q = [...word].map((ch) => (ch === '+' ? 1 : -1));
  const M = N - 1; // free gaps g_0..g_{N-2}; g_{N-1} = 2pi - sum
  const idx = (i, j) => i * N + j;
  const aLo = new Float64Array(N * N), aHi = new Float64Array(N * N);
  const hL = new Float64Array(N * N), hH = new Float64Array(N * N), uL = new Float64Array(N * N), uH = new Float64Array(N * N);
  const TL = new Float64Array(N), TH = new Float64Array(N), UL = new Float64Array(N), UH = new Float64Array(N);
  // returns false if the box is infeasible (some arc interval empty under the delta constraints)
  function arcs(lo, hi) {
    for (let i = 0; i < N; i++) {
      let sl = 0, sh = 0;
      for (let j = i + 1; j < N; j++) {
        sl += lo[j - 1]; sh += hi[j - 1];
        let a = sl - AW, b = sh + AW;
        const cap = PI2_HI - (N - (j - i)) * delta + AW; // complementary gaps are each >= delta
        if (b > cap) b = cap;
        if (a > b) return false;
        aLo[idx(i, j)] = a; aHi[idx(i, j)] = b;
      }
    }
    return true;
  }
  function enclose(lo, hi) { // fills TL,TH,UL,UH; returns false if infeasible
    if (!arcs(lo, hi)) return false;
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      const a = aLo[idx(i, j)], b = aHi[idx(i, j)];
      hL[idx(i, j)] = hLo(b); hH[idx(i, j)] = hUp(a);
      const ua = uUp(a), ub = uUp(b);
      uH[idx(i, j)] = ua > ub ? ua : ub;
      uL[idx(i, j)] = (a <= PI_HI && b >= PI_LO) ? 0.25 * (1 - 1e-15) : Math.min(uLo(a), uLo(b));
    }
    for (let i = 0; i < N; i++) {
      let tl = 0, th = 0, ul = 0, uh = 0, tabs = 0, uabs = 0;
      for (let j = 0; j < N; j++) {
        if (j === i) continue;
        const sg = q[i] * q[j];
        let l, h; // interval of h(psi_{i->j}) : for j>i h(A_ij); for j<i -h(A_ji)
        if (j > i) { l = hL[idx(i, j)]; h = hH[idx(i, j)]; } else { l = -hH[idx(j, i)]; h = -hL[idx(j, i)]; }
        // T_i = - sum sigma * h
        if (sg > 0) { tl += -h; th += -l; } else { tl += l; th += h; }
        tabs += Math.max(Math.abs(l), Math.abs(h));
        const k = j > i ? idx(i, j) : idx(j, i);
        if (sg > 0) { ul += uL[k]; uh += uH[k]; } else { ul += -uH[k]; uh += -uL[k]; }
        uabs += uH[k];
      }
      TL[i] = tl - 1e-13 * tabs - 1e-300; TH[i] = th + 1e-13 * tabs + 1e-300;
      UL[i] = ul - 1e-13 * uabs - 1e-300; UH[i] = uh + 1e-13 * uabs + 1e-300;
    }
    return true;
  }
  // U_i - U_k with the shared pair term cancelled exactly
  function udiff(i, k) {
    let l = 0, h = 0, ab = 0;
    for (let j = 0; j < N; j++) {
      if (j === i || j === k) continue;
      const a = i < j ? idx(i, j) : idx(j, i), b = k < j ? idx(k, j) : idx(j, k);
      if (q[i] * q[j] > 0) { l += uL[a]; h += uH[a]; } else { l -= uH[a]; h -= uL[a]; }
      if (q[k] * q[j] > 0) { l -= uH[b]; h -= uL[b]; } else { l += uL[b]; h += uH[b]; }
      ab += uH[a] + uH[b];
    }
    return [l - 1e-13 * ab - 1e-300, h + 1e-13 * ab + 1e-300];
  }
  // exclusion test: returns [code, index]; code 0 = not excluded
  // 1 infeasible, 3 tangential T_i excludes 0, 4 radial difference excludes 0, 5 U_i >= 0 (no Omega^2 > 0)
  function exclude(lo, hi) {
    if (!enclose(lo, hi)) return [1, 0];
    for (let i = 0; i < N; i++) if (TL[i] > 0 || TH[i] < 0) return [3, i];
    for (let i = 0; i < N; i++) if (UL[i] >= 0) return [5, i];
    for (let i = 0; i < N; i++) for (let k = i + 1; k < N; k++) { const [l, h] = udiff(i, k); if (l > 0 || h < 0) return [4, i * N + k]; }
    return [0, 0];
  }
  // interval Jacobian of (T_0..T_{M-1}) with respect to (g_0..g_{M-1}) on a box
  function jacobian(lo, hi) {
    if (!arcs(lo, hi)) throw new Error('infeasible');
    const kL = new Float64Array(N * N), kH = new Float64Array(N * N);
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      const a = aLo[idx(i, j)], b = aHi[idx(i, j)];
      kH[idx(i, j)] = Math.max(kUp(a), kUp(b));
      kL[idx(i, j)] = (a <= PI_HI && b >= PI_LO) ? 0.125 * (1 - 1e-15) : Math.min(kLo(a), kLo(b));
    }
    const JL = [], JH = [];
    for (let i = 0; i < M; i++) {
      const rl = new Float64Array(M), rh = new Float64Array(M);
      for (let k = 0; k < M; k++) {
        let l = 0, h = 0, ab = 0;
        for (let j = 0; j < N; j++) {
          if (j === i) continue;
          const sg = q[i] * q[j];
          if (j > i && i <= k && k < j) { const p = idx(i, j); if (sg > 0) { l += kL[p]; h += kH[p]; } else { l -= kH[p]; h -= kL[p]; } ab += kH[p]; }
          if (j < i && j <= k && k < i) { const p = idx(j, i); if (sg > 0) { l -= kH[p]; h -= kL[p]; } else { l += kL[p]; h += kH[p]; } ab += kH[p]; }
        }
        rl[k] = l - 1e-13 * ab - 1e-300; rh[k] = h + 1e-13 * ab + 1e-300;
      }
      JL.push(rl); JH.push(rh);
    }
    return [JL, JH];
  }
  // independent point evaluator using library trigonometry (KA1 comparison side only)
  function pointTU(g) {
    const th = [0]; for (let k = 0; k < N - 1; k++) th.push(th[k] + g[k]);
    const T = [], U = [];
    for (let i = 0; i < N; i++) {
      let t = 0, u = 0;
      for (let j = 0; j < N; j++) { if (j === i) continue; const half = (th[i] - th[j]) / 2, s = Math.sin(half), c = Math.cos(half); t += q[i] * q[j] * c * Math.sign(s) / (4 * s * s); u += q[i] * q[j] / (4 * Math.abs(s)); }
      T.push(t); U.push(u);
    }
    return { T, U };
  }
  return { N, M, q, enclose, exclude, jacobian, pointTU, TL, TH, UL, UH, udiff };
}

function invert(A) { const n = A.length; const a = A.map((r, i) => [...r, ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))]);
  for (let c = 0; c < n; c++) { let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(a[r][c]) > Math.abs(a[p][c])) p = r; [a[c], a[p]] = [a[p], a[c]]; const d = a[c][c]; for (let k = 0; k < 2 * n; k++) a[c][k] /= d; for (let r = 0; r < n; r++) if (r !== c) { const f = a[r][c]; for (let k = 0; k < 2 * n; k++) a[r][k] -= f * a[c][k]; } }
  return a.map((r) => r.slice(n)); }

// Injectivity certificate: ||I - C J(X)||_inf < 1 on the box X = center +- r in the free gaps.
export function certify(sys, r) {
  const { N, M } = sys; const c = 2 * Math.PI / N;
  const lo = new Float64Array(M).fill(c - r), hi = new Float64Array(M).fill(c + r);
  const [JL, JH] = sys.jacobian(lo, hi);
  const Jm = JL.map((row, i) => Array.from(row, (v, k) => 0.5 * (v + JH[i][k])));
  const C = invert(Jm);
  let norm = 0;
  for (let i = 0; i < M; i++) { let rowsum = 0;
    for (let k = 0; k < M; k++) { let l = i === k ? 1 : 0, h = l, ab = Math.abs(l);
      for (let m = 0; m < M; m++) { const cc = C[i][m]; const p1 = cc * JL[m][k], p2 = cc * JH[m][k]; l -= Math.max(p1, p2); h -= Math.min(p1, p2); ab += Math.max(Math.abs(p1), Math.abs(p2)); }
      l -= 1e-12 * ab + 1e-300; h += 1e-12 * ab + 1e-300; rowsum += Math.max(Math.abs(l), Math.abs(h)); }
    rowsum = rowsum * (1 + 1e-12); if (rowsum > norm) norm = rowsum; }
  return { r, lo: c - r, hi: c + r, norm, certified: norm < 1 };
}

export const SYMM = { '+-+-+-': [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 5]], '++-+--': [[0, 4]], '+++---': [[0, 1], [0, 3], [0, 4]], '+-+-': [[0, 1], [0, 2], [0, 3], [1, 3]], '++--': [[0, 2], [1, 3]] };

export function run(opts) {
  const { word, delta, kr, out, tag, maxSeconds = 1e9, useSymm = true, lo0 = null, hi0 = null, dump = null } = opts;
  // optional full leaf list: fixed records of (2M+3) little-endian doubles: depth, code, index, then lo_k, hi_k pairs
  const dfd = dump ? fs.openSync(dump, 'w') : -1; const dbuf = dump ? Buffer.alloc(8 * (2 * (word.length - 1) + 3) * 4096) : null; let dpos = 0;
  const sys = makeSystem(word, delta); const { N, M } = sys;
  const symm = useSymm ? (SYMM[word] || []) : [];
  const center = 2 * Math.PI / N; const Klo = center - kr, Khi = center + kr; const hasK = kr > 0;
  const t0 = Date.now(); let lastHb = t0, lastCk = t0;
  const counts = { processed: 0, bisected: 0, infeasible: 0, symmetry: 0, tangential: 0, radialDiff: 0, radialSign: 0, insideK: 0, undecided: 0 };
  const byDepth = {}; const byCond = {}; let deepest = 0; const hash = createHash('sha256'); const buf = Buffer.alloc(8 * (2 * M + 3));
  const rootLo = lo0 ? Float64Array.from(lo0) : new Float64Array(M).fill(delta); const rootHi = hi0 ? Float64Array.from(hi0) : new Float64Array(M).fill(PI2_HI - (N - 1) * delta);
  const stack = [[rootLo, rootHi, 0]]; const undecided = [];
  function leaf(lo, hi, depth, code, index) { buf.writeDoubleLE(depth, 0); buf.writeDoubleLE(code, 8); buf.writeDoubleLE(index, 16); for (let k = 0; k < M; k++) { buf.writeDoubleLE(lo[k], 24 + 16 * k); buf.writeDoubleLE(hi[k], 32 + 16 * k); } hash.update(buf); if (dfd >= 0) { buf.copy(dbuf, dpos); dpos += buf.length; if (dpos >= dbuf.length) { fs.writeSync(dfd, dbuf, 0, dpos); dpos = 0; } }
    const d = byDepth[depth] || (byDepth[depth] = [0, 0, 0, 0, 0, 0, 0, 0]); d[code]++; if (code === 3 || code === 4 || code === 5) { const key = `${code}:${index}`; byCond[key] = (byCond[key] || 0) + 1; } }
  let status = 'complete';
  while (stack.length) {
    const [lo, hi, depth] = stack.pop(); counts.processed++; if (depth > deepest) deepest = depth;
    if ((counts.processed & 4095) === 0) { const now = Date.now();
      if (now - lastHb >= 5000) { lastHb = now; console.log(`HEARTBEAT ${tag} processed=${counts.processed} pending=${stack.length} deepest=${deepest} wall_s=${((now - t0) / 1000).toFixed(1)} utc=${new Date().toISOString()}`); }
      if (now - lastCk >= 30000) { lastCk = now; fs.writeFileSync(`${out}/${tag}.checkpoint.json`, JSON.stringify({ tag, word, delta, kr, counts, deepest, pending: stack.map(([l, h, d]) => [Array.from(l), Array.from(h), d]), utc: new Date().toISOString() })); }
      if ((now - t0) / 1000 > maxSeconds) { status = 'partial-deadline'; stack.push([lo, hi, depth]); break; } }
    // derived last gap and symmetry (fundamental-domain) discard
    let sl = 0, sh = 0; for (let k = 0; k < M; k++) { sl += lo[k]; sh += hi[k]; }
    const lastLo = Math.max(delta, PI2_LO - sh - AW), lastHi = PI2_HI - sl + AW;
    if (lastHi < delta) { counts.infeasible++; leaf(lo, hi, depth, 1, 0); continue; }
    let sym = false; for (const [a, b] of symm) { const la = a === M ? lastLo : lo[a], hb = b === M ? lastHi : hi[b]; if (la > hb) { sym = true; break; } }
    if (sym) { counts.symmetry++; leaf(lo, hi, depth, 2, 0); continue; }
    const [code, index] = sys.exclude(lo, hi);
    if (code === 1) { counts.infeasible++; leaf(lo, hi, depth, 1, 0); continue; }
    if (code === 3) { counts.tangential++; leaf(lo, hi, depth, 3, index); continue; }
    if (code === 4) { counts.radialDiff++; leaf(lo, hi, depth, 4, index); continue; }
    if (code === 5) { counts.radialSign++; leaf(lo, hi, depth, 5, index); continue; }
    if (hasK) { let inside = true; for (let k = 0; k < M; k++) if (lo[k] < Klo || hi[k] > Khi) { inside = false; break; } if (inside) { counts.insideK++; leaf(lo, hi, depth, 6, 0); continue; } }
    // bisect on the largest relative width
    let best = -1, bk = 0; for (let k = 0; k < M; k++) { const sc = (hi[k] - lo[k]) / Math.min(1, lo[k]); if (sc > best) { best = sc; bk = k; } }
    if (hi[bk] - lo[bk] < 1e-9 || depth > 400) { counts.undecided++; undecided.push([Array.from(lo), Array.from(hi)]); leaf(lo, hi, depth, 7, 0); continue; }
    const mid = 0.5 * (lo[bk] + hi[bk]); counts.bisected++;
    const lo2 = Float64Array.from(lo), hi1 = Float64Array.from(hi); hi1[bk] = mid; lo2[bk] = mid;
    stack.push([lo2, hi, depth + 1]); stack.push([lo, hi1, depth + 1]);
  }
  if (dfd >= 0) { if (dpos) fs.writeSync(dfd, dbuf, 0, dpos); fs.closeSync(dfd); }
  const wall = (Date.now() - t0) / 1000;
  const result = { leafListFile: dump, tag, word, N, delta, krawczykRadius: kr, useSymm, symmetryConstraints: symm, root: [Array.from(rootLo), Array.from(rootHi)], status, counts, deepest, leafCodes: '1 infeasible,2 symmetry,3 tangential,4 radialDiff,5 radialSign,6 insideUniquenessBox,7 undecided', byDepth, byCondition: byCond, undecided: undecided.slice(0, 50), pending: stack.length, leafDigestSha256: hash.digest('hex'), wallSeconds: wall, finishedUtc: new Date().toISOString(), node: process.version };
  fs.writeFileSync(`${out}/${tag}.result.json`, JSON.stringify(result, null, 1));
  console.log(`DONE ${tag} status=${status} processed=${counts.processed} undecided=${counts.undecided} pending=${stack.length} wall_s=${wall.toFixed(1)} counts=${JSON.stringify(counts)}`);
  return result;
}

function arg(name, def) { const i = process.argv.indexOf(`--${name}`); return i < 0 ? def : process.argv[i + 1]; }
if (import.meta.url === `file://${process.argv[1]}`) {
  const mode = arg('mode', 'run');
  if (mode === 'run') {
    run({ word: arg('word'), delta: Number(arg('delta')), kr: Number(arg('kr', '0')), out: arg('out'), tag: arg('tag'), maxSeconds: Number(arg('max-seconds', '1e9')), useSymm: arg('symm', '1') === '1', dump: arg('dump', null) });
  } else if (mode === 'certify') {
    const sys = makeSystem(arg('word'), 0.01); console.log(JSON.stringify(certify(sys, Number(arg('kr')))));
  }
}
