// Lane B (independent) certified classification of balanced rings on one circle.
// Interval arithmetic with explicit outward rounding in binary64, branch-and-bound exclusion
// in half-gap coordinates, and a Krawczyk uniqueness test. Written for this run; no imports
// from any other ring instrument. K = R = c_f = 1. Weights are unit numerical weights only.
//
// Trust assumptions (named in the document): (A1) IEEE-754 binary64 round-to-nearest for
// + - * / (ECMAScript requirement); (A2) Math.sin and Math.cos have absolute error below
// two units in the last place of the returned value on [0, 3.2]; (A3) Math.PI < pi < up(Math.PI).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const SELF_SHA256 = crypto.createHash('sha256').update(fs.readFileSync(fileURLToPath(import.meta.url))).digest('hex');

const EPS = 2 ** -52, MINV = 5e-324;
const up = (x) => x + Math.abs(x) * EPS + MINV; // >= next float above x
const dn = (x) => x - Math.abs(x) * EPS - MINV; // <= next float below x
const PI_LO = Math.PI, PI_HI = up(Math.PI);
const HP_LO = PI_LO / 2, HP_HI = PI_HI / 2;

// ---- point enclosures of sin, cos on [0, 3.2] -------------------------------------------
const sLo = (x) => Math.max(dn(dn(Math.sin(x))), -1);
const sHi = (x) => Math.min(up(up(Math.sin(x))), 1);
const cLo = (x) => Math.max(dn(dn(Math.cos(x))), -1);
const cHi = (x) => Math.min(up(up(Math.cos(x))), 1);

// sin over [a,b] subset (0,pi)
function sinInt(a, b) {
  if (b <= HP_LO) return [sLo(a), sHi(b)];
  if (a >= HP_HI) return [sLo(b), sHi(a)];
  return [Math.min(sLo(a), sLo(b)), 1];
}
// f(x) = cos x / (4 sin^2 x) at a point, as an interval (requires sin enclosure positive)
function fPoint(x) {
  const cl = cLo(x), ch = cHi(x), sl = sLo(x), sh = sHi(x);
  if (!(sl > 0)) return [-Infinity, Infinity];
  const dl = 4 * dn(sl * sl), dh = 4 * up(sh * sh);
  let lo, hi;
  if (cl >= 0) { lo = dn(cl / dh); hi = up(ch / dl); }
  else if (ch <= 0) { lo = dn(cl / dl); hi = up(ch / dh); }
  else { lo = dn(cl / dl); hi = up(ch / dl); }
  return [lo, hi];
}
// f is strictly decreasing on (0,pi): range over [a,b] is [f(b), f(a)]
const fInt = (a, b) => [fPoint(b)[0], fPoint(a)[1]];
// h(x) = 1/(4 sin x)
function hInt(a, b) {
  const s = sinInt(a, b);
  if (!(s[0] > 0)) return [0, Infinity];
  return [dn(1 / (4 * s[1])), up(1 / (4 * s[0]))];
}
// m(x) = |f'(x)| = (1 + cos^2 x)/(4 sin^3 x): symmetric about pi/2, decreasing on (0,pi/2]
function mPoint(x) {
  const cl = cLo(x), ch = cHi(x), sl = sLo(x), sh = sHi(x);
  if (!(sl > 0)) return [0, Infinity];
  let c2l, c2h;
  if (cl >= 0) { c2l = dn(cl * cl); c2h = up(ch * ch); }
  else if (ch <= 0) { c2l = dn(ch * ch); c2h = up(cl * cl); }
  else { c2l = 0; c2h = up(Math.max(cl * cl, ch * ch)); }
  const s3l = dn(dn(sl * sl) * sl), s3h = up(up(sh * sh) * sh);
  return [dn(dn(1 + c2l) / (4 * s3h)), up(up(1 + c2h) / (4 * s3l))];
}
function dfInt(a, b) { // f'(x) = -m(x)
  const ma = mPoint(a), mb = mPoint(b);
  const hi = Math.max(ma[1], mb[1]);
  let lo;
  if (b <= HP_LO) lo = mb[0];
  else if (a >= HP_HI) lo = ma[0];
  else lo = dn(0.25); // m(pi/2) = 1/4 is the global minimum
  lo = Math.min(lo, ma[0], mb[0]);
  return [-hi, -lo];
}
// ---- generic interval helpers -----------------------------------------------------------
const iadd = (x, y) => [dn(x[0] + y[0]), up(x[1] + y[1])];
const isub = (x, y) => [dn(x[0] - y[1]), up(x[1] - y[0])];
const ineg = (x) => [-x[1], -x[0]];
function imul(x, y) {
  const p1 = x[0] * y[0], p2 = x[0] * y[1], p3 = x[1] * y[0], p4 = x[1] * y[1];
  return [dn(Math.min(p1, p2, p3, p4)), up(Math.max(p1, p2, p3, p4))];
}
const iscale = (k, x) => (k >= 0 ? [dn(k * x[0]), up(k * x[1])] : [dn(k * x[1]), up(k * x[0])]);
const has0 = (x) => x[0] <= 0 && x[1] >= 0;

// ---- problem definition -----------------------------------------------------------------
// N members p_1..p_N in counterclockwise order, polarity word q, half-gaps alpha_1..alpha_N
// (alpha_i between p_i and p_{i+1}, alpha_N between p_N and p_1), sum = pi.
// S_ij = alpha_i + ... + alpha_{j-1} for i<j. Variables: alpha_1..alpha_{N-1}.
// T_i = -sum_{j>i} s_ij f(S_ij) + sum_{j<i} s_ij f(S_ji);  U_i = sum_{j!=i} s_ij h(S_min,max).
function buildProblem(word) {
  const q = [...word].map((ch) => (ch === '+' ? 1 : -1));
  const N = q.length, n = N - 1;
  const pairIndex = (a, b) => a * (N + 1) + b; // 1<=a<b<=N
  const funcs = []; // each: {name, kind:'f'|'h', terms: Map(pairIndex->coef)}
  const mk = (name, kind) => ({ name, kind, terms: new Map() });
  const addTerm = (F, a, b, c) => { const k = pairIndex(a, b); const v = (F.terms.get(k) || 0) + c; if (v === 0) F.terms.delete(k); else F.terms.set(k, v); };
  const T = [], U = [];
  for (let i = 1; i <= N; i++) {
    const Ti = mk(`T${i}`, 'f'), Ui = mk(`U${i}`, 'h');
    for (let j = 1; j <= N; j++) {
      if (j === i) continue;
      const s = q[i - 1] * q[j - 1];
      if (j > i) addTerm(Ti, i, j, -s); else addTerm(Ti, j, i, s);
      addTerm(Ui, Math.min(i, j), Math.max(i, j), s);
    }
    T.push(Ti); U.push(Ui);
  }
  const D = [];
  for (let i = 1; i < N; i++) {
    const Di = mk(`U${i}-U${i + 1}`, 'h');
    for (const [k, c] of U[i - 1].terms) Di.terms.set(k, c);
    for (const [k, c] of U[i].terms) { const v = (Di.terms.get(k) || 0) - c; if (v === 0) Di.terms.delete(k); else Di.terms.set(k, v); }
    D.push(Di);
  }
  const fin = (F) => ({ name: F.name, kind: F.kind, terms: [...F.terms].map(([k, c]) => ({ a: Math.floor(k / (N + 1)), b: k % (N + 1), c })) });
  return { word, q, N, n, T: T.map(fin), U: U.map(fin), D: D.map(fin) };
}

// Evaluate the table of S_ab, f, h, f' over a box. delta = lower bound for every half-gap
// (0 for no feasibility caps). Returns null if the box has no feasible point.
function tables(P, lo, hi, delta, needDeriv) {
  const N = P.N, W = N + 1;
  const Sl = new Float64Array(W * W), Sh = new Float64Array(W * W);
  const Fl = new Float64Array(W * W), Fh = new Float64Array(W * W);
  const Hl = new Float64Array(W * W), Hh = new Float64Array(W * W);
  const Gl = new Float64Array(W * W), Gh = new Float64Array(W * W);
  for (let a = 1; a < N; a++) {
    let l = 0, h = 0;
    for (let b = a + 1; b <= N; b++) {
      l = b === a + 1 ? lo[b - 2] : dn(l + lo[b - 2]);
      h = b === a + 1 ? hi[b - 2] : up(h + hi[b - 2]);
      let ll = l, hh = h;
      const len = b - a;
      if (delta > 0) {
        ll = Math.max(ll, dn(delta * len));
        hh = Math.min(hh, up(PI_HI - dn(delta * (N - len))));
      }
      if (ll > hh) return null;
      if (!(ll > 0) || !(hh < PI_LO)) return { bad: true };
      const k = a * W + b;
      Sl[k] = ll; Sh[k] = hh;
      const f = fInt(ll, hh); Fl[k] = f[0]; Fh[k] = f[1];
      const g = hInt(ll, hh); Hl[k] = g[0]; Hh[k] = g[1];
      if (needDeriv) { const d = dfInt(ll, hh); Gl[k] = d[0]; Gh[k] = d[1]; }
    }
  }
  return { Sl, Sh, Fl, Fh, Hl, Hh, Gl, Gh, W };
}
function evalFunc(F, tb) { // natural interval extension
  let l = 0, h = 0;
  const vl = F.kind === 'f' ? tb.Fl : tb.Hl, vh = F.kind === 'f' ? tb.Fh : tb.Hh;
  for (const t of F.terms) {
    const k = t.a * tb.W + t.b;
    if (t.c > 0) { l = dn(l + t.c * vl[k]); h = up(h + t.c * vh[k]); }
    else { l = dn(l + t.c * vh[k]); h = up(h + t.c * vl[k]); }
  }
  return [l, h];
}
function evalGrad(F, tb, n) { // interval gradient w.r.t. alpha_1..alpha_n
  const out = [];
  for (let m = 1; m <= n; m++) {
    let l = 0, h = 0;
    for (const t of F.terms) {
      if (!(t.a <= m && m < t.b)) continue;
      const k = t.a * tb.W + t.b;
      let dl, dh; // derivative of the kernel: f' for 'f', h' = -f for 'h'
      if (F.kind === 'f') { dl = tb.Gl[k]; dh = tb.Gh[k]; } else { dl = -tb.Fh[k]; dh = -tb.Fl[k]; }
      if (t.c > 0) { l = dn(l + t.c * dl); h = up(h + t.c * dh); }
      else { l = dn(l + t.c * dh); h = up(h + t.c * dl); }
    }
    out.push([l, h]);
  }
  return out;
}
// Enclosures of a list of functions over the feasible part of a box: natural and mean-value.
function enclose(P, funcs, lo, hi, delta, useMV) {
  const tb = tables(P, lo, hi, delta, useMV);
  if (tb === null) return { infeasible: true };
  if (tb.bad) return { bad: true };
  const nat = funcs.map((F) => evalFunc(F, tb));
  let mv = null;
  if (useMV) {
    const c = lo.map((l, i) => 0.5 * (l + hi[i]));
    // centre must be feasible: alpha_N(c) >= delta, and inside the box (it is)
    const tc = tables(P, c, c, 0, false);
    const k = 1 * tb.W + P.N;
    if (tc && !tc.bad && tc.Sh[k] <= dn(PI_LO - delta)) {
      mv = funcs.map((F) => {
        let v = evalFunc(F, tc);
        const g = evalGrad(F, tb, P.n);
        for (let m = 0; m < P.n; m++) v = iadd(v, imul(g[m], [dn(lo[m] - c[m]), up(hi[m] - c[m])]));
        return v;
      });
    }
  }
  return { nat, mv };
}

// ---- Krawczyk test ----------------------------------------------------------------------
function invert(A) {
  const n = A.length; const M = A.map((r, i) => [...r, ...r.map((_, j) => (i === j ? 1 : 0))]);
  for (let c = 0; c < n; c++) {
    let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    const d = M[c][c]; for (let j = 0; j < 2 * n; j++) M[c][j] /= d;
    for (let r = 0; r < n; r++) if (r !== c) { const f = M[r][c]; if (f !== 0) for (let j = 0; j < 2 * n; j++) M[r][j] -= f * M[c][j]; }
  }
  return M.map((r) => r.slice(n));
}
function krawczyk(P, rows, c, r) {
  const n = P.n, lo = c.map((x) => x - r), hi = c.map((x) => x + r);
  const tc = tables(P, c, c, 0, true), tX = tables(P, lo, hi, 0, true);
  if (!tc || tc.bad || !tX || tX.bad) return { ok: false, reason: 'domain' };
  const Gc = rows.map((F) => evalFunc(F, tc));
  const Jc = rows.map((F) => evalGrad(F, tc, n).map((v) => 0.5 * (v[0] + v[1])));
  const Y = invert(Jc);
  const JX = rows.map((F) => evalGrad(F, tX, n));
  const K = [];
  let contraction = 0, ok = true;
  for (let i = 0; i < n; i++) {
    let v = [c[i], c[i]];
    let yg = [0, 0];
    for (let k = 0; k < n; k++) yg = iadd(yg, iscale(Y[i][k], Gc[k]));
    v = isub(v, yg);
    let rowNorm = 0;
    for (let j = 0; j < n; j++) {
      let e = [i === j ? 1 : 0, i === j ? 1 : 0];
      let s = [0, 0];
      for (let k = 0; k < n; k++) s = iadd(s, iscale(Y[i][k], JX[k][j]));
      e = isub(e, s);
      rowNorm += Math.max(Math.abs(e[0]), Math.abs(e[1]));
      v = iadd(v, imul(e, [dn(lo[j] - c[j]), up(hi[j] - c[j])]));
    }
    contraction = Math.max(contraction, rowNorm);
    K.push(v);
    if (!(v[0] > lo[i] && v[1] < hi[i])) ok = false;
  }
  return { ok, lo, hi, K, contraction, centreResidual: Gc.map((g) => Math.max(Math.abs(g[0]), Math.abs(g[1]))), Jc };
}

// ---- branch and bound -------------------------------------------------------------------
// cfg: {word, delta, lo[], hi[], lastLo, lastHi, symmetric(bool: impose alpha_1<=all, alpha_2<=alpha_N),
//       kraw: {c[], r} | null, minWidth, maxBoxes, useU(bool)}
function branchAndBound(cfg, heartbeatMs = 5000) {
  const P = buildProblem(cfg.word), n = P.n, N = P.N;
  const funcs = [...P.T, ...P.D];
  const nT = P.T.length;
  let K = null;
  if (cfg.kraw) {
    K = krawczyk(P, P.T.slice(0, n), cfg.kraw.c, cfg.kraw.r);
  }
  const stats = { processed: 0, prunedDomain: 0, prunedSymmetry: 0, infeasible: 0, excludedNatural: 0, excludedMeanValue: 0, excludedUsign: 0, coveredByKrawczyk: 0, undecided: 0, maxDepth: 0, exclBy: {} };
  const undecided = [];
  const stack = [{ lo: cfg.lo.slice(), hi: cfg.hi.slice(), d: 0 }];
  let last = Date.now(); const t0 = last;
  while (stack.length) {
    const B = stack.pop();
    stats.processed++;
    if (B.d > stats.maxDepth) stats.maxDepth = B.d;
    const now = Date.now();
    if (now - last >= heartbeatMs) { last = now; console.log(`[heartbeat ${new Date().toISOString()}] case=${cfg.name} processed=${stats.processed} stack=${stack.length} undecided=${stats.undecided} elapsed_s=${((now - t0) / 1000).toFixed(1)}`); }
    if (stats.processed > cfg.maxBoxes) { stats.aborted = true; break; }
    const { lo, hi } = B;
    // last half-gap alpha_N = pi - sum
    let sl = 0, sh = 0;
    for (let i = 0; i < n; i++) { sl = dn(sl + lo[i]); sh = up(sh + hi[i]); }
    const aNlo = dn(PI_LO - sh), aNhi = up(PI_HI - sl);
    if (aNhi < cfg.lastLo || aNlo > cfg.lastHi) { stats.prunedDomain++; continue; }
    if (cfg.symmetric) {
      let pr = false;
      for (let k = 1; k < n; k++) if (lo[0] > hi[k]) pr = true;
      if (lo[0] > aNhi) pr = true;
      if (n >= 2 && lo[1] > aNhi) pr = true;
      if (pr) { stats.prunedSymmetry++; continue; }
    }
    if (K && K.ok) {
      let inside = true, meets = true;
      for (let i = 0; i < n; i++) { if (!(lo[i] >= K.lo[i] && hi[i] <= K.hi[i])) inside = false; if (hi[i] < K.lo[i] || lo[i] > K.hi[i]) meets = false; }
      if (inside) { stats.coveredByKrawczyk++; continue; }
      if (meets) { // carve along a face of the Krawczyk box
        let done = false;
        for (let i = 0; i < n && !done; i++) {
          for (const cut of [K.lo[i], K.hi[i]]) {
            if (lo[i] < cut && cut < hi[i]) {
              const h1 = hi.slice(); h1[i] = cut; const l2 = lo.slice(); l2[i] = cut;
              stack.push({ lo, hi: h1, d: B.d + 1 }, { lo: l2, hi, d: B.d + 1 }); done = true; break;
            }
          }
        }
        if (done) continue;
      }
    }
    const E = enclose(P, funcs, lo, hi, cfg.delta, true);
    if (E.infeasible) { stats.infeasible++; continue; }
    let excluded = null;
    if (!E.bad) {
      for (let i = 0; i < funcs.length && !excluded; i++) {
        if (!cfg.useU && i >= nT) break;
        if (!has0(E.nat[i])) { excluded = funcs[i].name; stats.excludedNatural++; }
        else if (E.mv && !has0(E.mv[i])) { excluded = funcs[i].name; stats.excludedMeanValue++; }
      }
      if (!excluded && cfg.useU) {
        const tb = tables(P, lo, hi, cfg.delta, false);
        for (const Ui of P.U) { if (evalFunc(Ui, tb)[0] > 0) { excluded = Ui.name + '>0'; stats.excludedUsign++; break; } }
      }
    }
    if (excluded) { stats.exclBy[excluded] = (stats.exclBy[excluded] || 0) + 1; continue; }
    // bisect widest
    let w = -1, wi = 0;
    for (let i = 0; i < n; i++) if (hi[i] - lo[i] > w) { w = hi[i] - lo[i]; wi = i; }
    if (w < cfg.minWidth) { stats.undecided++; if (undecided.length < 50) undecided.push({ lo, hi }); continue; }
    const mid = 0.5 * (lo[wi] + hi[wi]);
    const h1 = hi.slice(); h1[wi] = mid; const l2 = lo.slice(); l2[wi] = mid;
    stack.push({ lo, hi: h1, d: B.d + 1 }, { lo: l2, hi, d: B.d + 1 });
  }
  stats.elapsedSeconds = (Date.now() - t0) / 1000;
  return { cfg, krawczyk: K, stats, undecided, complete: !stats.aborted && stats.undecided === 0 };
}

// ---- floating-point residual in the original complex form (independent formula path) ----
function complexResidual(word, theta, Omega2) {
  const q = [...word].map((ch) => (ch === '+' ? 1 : -1)); const N = q.length;
  let worst = 0; const comps = [];
  for (let i = 0; i < N; i++) {
    let ax = 0, ay = 0;
    const xi = Math.cos(theta[i]), yi = Math.sin(theta[i]);
    for (let j = 0; j < N; j++) {
      if (j === i) continue;
      const dx = xi - Math.cos(theta[j]), dy = yi - Math.sin(theta[j]);
      const d = Math.hypot(dx, dy), s = q[i] * q[j];
      ax += s * dx / d ** 3; ay += s * dy / d ** 3;
    }
    const rad = ax * xi + ay * yi, tan = -ax * yi + ay * xi; // radial and tangential acceleration
    comps.push({ rad, tan });
    worst = Math.max(worst, Math.hypot(ax + Omega2 * xi, ay + Omega2 * yi));
  }
  return { worst, comps };
}

// ---- cases ------------------------------------------------------------------------------
const OUT = '.local-data/master-equation-closure/weber-binding-sphere/ring-b';
function chain(nSteps) { // a_{k+1} = a_k (a_k+1)/sqrt(2 a_k + 1), a_1 = 1, as rigorous upper bounds
  const a = [[1, 1]];
  for (let k = 1; k < nSteps; k++) {
    const p = a[k - 1]; const num = [dn(p[0] * dn(p[0] + 1)), up(p[1] * up(p[1] + 1))];
    const rad = [dn(2 * p[0] + 1), up(2 * p[1] + 1)];
    const sq = [dn(dn(Math.sqrt(rad[0]))), up(up(Math.sqrt(rad[1])))]; // sqrt is correctly rounded in IEEE-754
    a.push([dn(num[0] / sq[1]), up(num[1] / sq[0])]);
  }
  return a;
}
const cases = {
  n6alt: () => { const a = chain(4); const sum = up(1 + 2 * a[1][1] + 2 * a[2][1] + a[3][1]); const dl = dn(PI_LO / sum); const d = 0.4069; if (!(d < dl)) throw new Error('delta');
    const h1 = up(PI_HI / 6), H = [h1, up(a[1][1] * h1), up(a[2][1] * h1), up(a[3][1] * h1), up(a[2][1] * h1)];
    return { name: 'n6alt', word: '+-+-+-', delta: d, lemma: { chain: a, sum, deltaRigorousLowerBound: dl }, lo: [d, d, d, d, d], hi: H, lastLo: d, lastHi: up(a[1][1] * h1), symmetric: true, kraw: { c: Array(5).fill(Math.PI / 6), r: 0.005 }, minWidth: 1e-7, maxBoxes: 2e8, useU: true }; },
  n6altTonly: () => { const c = cases.n6alt(); c.name = 'n6altTonly'; c.useU = false; return c; },
  n4alt: () => { const a = chain(3); const sum = up(1 + 2 * a[1][1] + a[2][1]); const dl = dn(PI_LO / sum); const d = 0.6717; if (!(d < dl)) throw new Error('delta');
    const h1 = up(PI_HI / 4), H = [h1, up(a[1][1] * h1), up(a[2][1] * h1)];
    return { name: 'n4alt', word: '+-+-', delta: d, lemma: { chain: a, sum, deltaRigorousLowerBound: dl }, lo: [d, d, d], hi: H, lastLo: d, lastHi: up(a[1][1] * h1), symmetric: true, kraw: { c: Array(3).fill(Math.PI / 4), r: 0.02 }, minWidth: 1e-7, maxBoxes: 2e8, useU: true }; },
  n4altTonly: () => { const c = cases.n4alt(); c.name = 'n4altTonly'; c.useU = false; return c; },
  n2unlike: () => ({ name: 'n2unlike', word: '+-', delta: 0.01, lo: [0.01], hi: [3.13], lastLo: 0.01, lastHi: 3.14, symmetric: false, kraw: { c: [Math.PI / 2], r: 0.05 }, minWidth: 1e-9, maxBoxes: 1e7, useU: true }),
  n2like: () => ({ name: 'n2like', word: '++', delta: 0.01, lo: [0.01], hi: [3.13], lastLo: 0.01, lastHi: 3.14, symmetric: false, kraw: null, minWidth: 1e-9, maxBoxes: 1e7, useU: true }),
};
function generic(word, delta, maxBoxes) { // validated exclusion on {all half-gaps >= delta}, no symmetry reduction
  const N = word.length; const top = Math.PI - (N - 1) * delta + 1e-9;
  return { name: `generic_${word}_${delta}`, word, delta, lo: Array(N - 1).fill(delta), hi: Array(N - 1).fill(top), lastLo: delta, lastHi: top, symmetric: false, kraw: null, minWidth: 1e-6, maxBoxes, useU: true };
}

const mode = process.argv[2];
const stamp = () => new Date().toISOString();
if (mode === 'kb1') {
  const th = [0, 1, 2, 3, 4, 5].map((k) => k * Math.PI / 3), O2 = 5 / 4 - 1 / Math.sqrt(3);
  const r0 = complexResidual('+-+-+-', th, O2).worst, r1 = complexResidual('+-+-+-', th, 1.1 * O2).worst;
  const sq = [0, 1, 2, 3].map((k) => k * Math.PI / 2), O4 = (2 * Math.SQRT2 - 1) / 4;
  const r4 = complexResidual('+-+-', sq, O4).worst;
  const r2 = complexResidual('+-', [0, Math.PI], 0.25).worst;
  // consistency of the derived components with the complex form at random points
  const P = buildProblem('+-+-+-'); let worstDiff = 0;
  let seed = 12345; const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  for (const word of ['+-+-+-', '++-+--', '+++---', '+-+-', '++--']) {
    const Pw = buildProblem(word);
    for (let t = 0; t < 2000; t++) {
      const cuts = Array.from({ length: Pw.N }, () => 0.15 + rnd()); const tot = cuts.reduce((x, y) => x + y, 0);
      const al = cuts.map((x) => x * Math.PI / tot); const th2 = [0]; for (let i = 0; i < Pw.N - 1; i++) th2.push(th2[i] + 2 * al[i]);
      const cr = complexResidual(word, th2, 0).comps; const a5 = al.slice(0, Pw.N - 1);
      const tb = tables(Pw, a5, a5, 0, false);
      for (let i = 0; i < Pw.N; i++) {
        const Ti = evalFunc(Pw.T[i], tb), Ui = evalFunc(Pw.U[i], tb);
        const scale = 1 + Math.abs(cr[i].tan) + Math.abs(cr[i].rad);
        worstDiff = Math.max(worstDiff, Math.abs(0.5 * (Ti[0] + Ti[1]) - cr[i].tan) / scale, Math.abs(0.5 * (Ui[0] + Ui[1]) - cr[i].rad) / scale);
      }
    }
  }
  const rec = { case: 'KB1', utc: stamp(), instrumentSha256: SELF_SHA256, hexagonResidual: r0, hexagonDetuned10pctResidual: r1, squareResidual: r4, pairResidual: r2, componentVsComplexWorstRelDiff: worstDiff, pass: r0 <= 1e-13 && r1 >= 1e-2 && worstDiff < 1e-10 };
  console.log(JSON.stringify(rec)); fs.writeFileSync(path.join(OUT, 'kb1.json'), JSON.stringify(rec, null, 1));
} else if (mode === 'kb2export') {
  // random boxes and interior points with interval enclosures, for an independent mpmath check
  const count = Number(process.argv[3] || 100000); const tiny = process.argv[4] === 'tiny'; const file = path.join(OUT, tiny ? 'kb2-enclosures-tiny.jsonl' : 'kb2-enclosures.jsonl');
  const fd = fs.openSync(file, 'w'); let seed = 987654321; const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  const words = ['+-+-+-', '+-+-', '++-+--', '+++---', '++--'];
  for (let t = 0; t < count; t++) {
    const word = words[t % words.length]; const P = buildProblem(word), n = P.n;
    const cuts = Array.from({ length: P.N }, () => 0.3 + rnd()); const tot = cuts.reduce((x, y) => x + y, 0);
    const al = cuts.map((x) => x * Math.PI / tot).slice(0, n);
    const w = tiny ? (t % 2 ? 0 : 1e-13) : 10 ** (-1 - 5 * rnd()); const lo = [], hi = [], x = [];
    for (let i = 0; i < n; i++) { const u = rnd(); lo.push(al[i] - u * w); hi.push(al[i] + (1 - u) * w); x.push(lo[i] + rnd() * (hi[i] - lo[i])); if (x[i] < lo[i]) x[i] = lo[i]; if (x[i] > hi[i]) x[i] = hi[i]; }
    const funcs = [...P.T, ...P.U, ...P.D];
    const E = enclose(P, funcs, lo, hi, 0, true); if (E.bad || E.infeasible) { t--; continue; }
    const rec = { word, x, nat: E.nat, mv: E.mv };
    if (t < 20000) { const tb = tables(P, lo, hi, 0, true); rec.jac = P.T.slice(0, n).map((F) => evalGrad(F, tb, n)); rec.jacU = evalGrad(P.U[0], tb, n); }
    fs.writeSync(fd, JSON.stringify(rec) + '\n');
  }
  fs.closeSync(fd); console.log(JSON.stringify({ case: 'KB2-export', utc: stamp(), instrumentSha256: SELF_SHA256, count, tiny, file, PI_LO, PI_HI }));
} else if (mode === 'kb4') {
  // (a) boxes containing the hexagon are not excluded; (b) a box around a known non-solution is excluded
  const P = buildProblem('+-+-+-'); const funcs = [...P.T, ...P.D]; const out = [];
  const excl = (lo, hi, delta) => { const E = enclose(P, funcs, lo, hi, delta, true); if (E.infeasible) return 'infeasible'; for (let i = 0; i < funcs.length; i++) { if (!has0(E.nat[i]) || (E.mv && !has0(E.mv[i]))) return funcs[i].name; } const tb = tables(P, lo, hi, delta, false); for (const Ui of P.U) if (evalFunc(Ui, tb)[0] > 0) return Ui.name + '>0'; return null; };
  const c = Math.PI / 6;
  for (const w of [1e-12, 1e-9, 1e-6, 1e-3, 1e-2, 5e-2, 0.1]) for (const off of [0.5, 0.1, 0.9]) {
    const lo = Array(5).fill(c - off * w), hi = Array(5).fill(c + (1 - off) * w); out.push({ kind: 'hexagon-inside', w, off, excludedBy: excl(lo, hi, 0.4069) });
  }
  const bad = [0.45, 0.5, 0.55, 0.6, 0.5]; out.push({ kind: 'non-solution', point: bad, residual: complexResidual('+-+-+-', (() => { const th = [0]; for (let i = 0; i < 5; i++) th.push(th[i] + 2 * bad[i]); return th; })(), 0.67).worst, excludedBy: excl(bad.map((x) => x - 1e-3), bad.map((x) => x + 1e-3), 0.4069) });
  const pass = out.filter((o) => o.kind === 'hexagon-inside').every((o) => o.excludedBy === null) && out.filter((o) => o.kind === 'non-solution').every((o) => o.excludedBy !== null);
  const rec = { case: 'KB4', utc: stamp(), instrumentSha256: SELF_SHA256, pass, rows: out }; console.log(JSON.stringify(rec)); fs.writeFileSync(path.join(OUT, 'kb4.json'), JSON.stringify(rec, null, 1));
} else if (mode === 'run') {
  const name = process.argv[3]; let cfg;
  if (name === 'generic') cfg = generic(process.argv[4], Number(process.argv[5]), Number(process.argv[6] || 5e7));
  else cfg = cases[name]();
  if (process.argv.includes('--polygon-box')) { cfg.kraw = { c: Array(cfg.word.length - 1).fill(Math.PI / cfg.word.length), r: Number(process.argv[process.argv.indexOf('--polygon-box') + 1]) }; cfg.name += '_polygonbox'; }
  if (process.argv.includes('--tangential-only')) { cfg.useU = false; cfg.name += '_tangentialonly'; }
  if (process.argv.includes('--r')) cfg.kraw.r = Number(process.argv[process.argv.indexOf('--r') + 1]);
  console.log(`[start ${stamp()}] ${JSON.stringify(cfg)}`);
  const res = branchAndBound(cfg); res.utcEnd = stamp(); res.instrumentSha256 = SELF_SHA256; res.node = process.version;
  const file = path.join(OUT, `receipt-${cfg.name}.json`); fs.writeFileSync(file, JSON.stringify(res, null, 1));
  console.log(`[end ${stamp()}] case=${cfg.name} complete=${res.complete} krawczyk=${res.krawczyk ? res.krawczyk.ok : 'n/a'} contraction=${res.krawczyk ? res.krawczyk.contraction : 'n/a'} stats=${JSON.stringify(res.stats)} receipt=${file}`);
} else {
  console.log('modes: kb1 | kb2export [count] | kb4 | run <n6alt|n6altTonly|n4alt|n4altTonly|n2unlike|n2like> [--r radius] | run generic <word> <delta> [maxBoxes]');
}
