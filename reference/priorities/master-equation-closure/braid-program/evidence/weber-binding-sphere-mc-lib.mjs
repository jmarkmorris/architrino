// Multi-curve Fourier collocation library for periodic N-member histories of the
// instantaneous Weber comparison law (K = c_f = 1, lambda_W = -1/2, mu_W = 1).
// Research comparison instrument only: not an EOM solver, not an enclosure.
// The law's accelerations always come from the unmodified validated pair
// instrument (assemble + LU of the full 3N x 3N system); nothing here applies an
// isolated-pair denominator. Specification: preregistration Section 11.4.
import { makeParams, assemble, luFactor, luSolve, SingularSystemError } from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';

export { SingularSystemError };
export const HEX_C = 5 / 4 - 1 / Math.sqrt(3); // Omega^2 rho^3 of the alternating hexagon
export const DET_MIN = 1e-8, SEP_MIN = 1e-6;

export function rng(seed) { let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
export function gauss(r) { let u = 0; while (u === 0) u = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r()); }

export function lawParams(q) { return makeParams({ q, lambda: -0.5, mu: 1, K: 1, cf: 1, condition: 'none' }); }

// Full solve of the 3N x 3N system at one state. Throws SingularSystemError on a
// zero separation or zero pivot.
export function lawAcc(X, V, P) {
  const n = 3 * P.N, y = new Float64Array(2 * n); y.set(X, 0); y.set(V, n);
  const { M, b } = assemble(y, P); const F = luFactor(M, n);
  return { A: luSolve(F, b), det: F.det };
}

// ---------------------------------------------------------------- coefficients
// c[idx(i,s,a)]: member i, basis index s (0 constant, 2m-1 cos m, 2m sin m), axis a.
export const nBasis = M => 2 * M + 1;
export const nFull = (N, M) => N * nBasis(M) * 3;
export const idx = (M, i, s, a) => (i * nBasis(M) + s) * 3 + a;
export function basisAt(M, tau) {
  const nb = nBasis(M), p0 = new Float64Array(nb), p1 = new Float64Array(nb), p2 = new Float64Array(nb);
  p0[0] = 1;
  for (let m = 1; m <= M; m++) {
    const c = Math.cos(m * tau), s = Math.sin(m * tau);
    p0[2 * m - 1] = c; p1[2 * m - 1] = -m * s; p2[2 * m - 1] = -m * m * c;
    p0[2 * m] = s; p1[2 * m] = m * c; p2[2 * m] = -m * m * s;
  }
  return { p0, p1, p2 };
}
// positions and tau-derivatives of all members at one phase
export function evalCurves(c, N, M, bas) {
  const nb = nBasis(M), X = new Float64Array(3 * N), X1 = new Float64Array(3 * N), X2 = new Float64Array(3 * N);
  for (let i = 0; i < N; i++) for (let s = 0; s < nb; s++) {
    const o = (i * nb + s) * 3, f0 = bas.p0[s], f1 = bas.p1[s], f2 = bas.p2[s];
    for (let a = 0; a < 3; a++) { const v = c[o + a]; X[3 * i + a] += f0 * v; X1[3 * i + a] += f1 * v; X2[3 * i + a] += f2 * v; }
  }
  return { X, X1, X2 };
}
// truncated Fourier fit of samples x[k][3N] at equispaced phases (exact DFT projection)
export function fitCoefficients(samples, N, M) {
  const K = samples.length, c = new Float64Array(nFull(N, M));
  if (K < 2 * M + 1) throw new Error('too few samples for the requested harmonics');
  for (let k = 0; k < K; k++) {
    const tau = 2 * Math.PI * k / K, x = samples[k];
    for (let i = 0; i < N; i++) for (let a = 0; a < 3; a++) {
      const v = x[3 * i + a]; c[idx(M, i, 0, a)] += v / K;
      for (let m = 1; m <= M; m++) {
        if (2 * m === K) { c[idx(M, i, 2 * m - 1, a)] += v * Math.cos(m * tau) / K; continue; }
        c[idx(M, i, 2 * m - 1, a)] += 2 * v * Math.cos(m * tau) / K; c[idx(M, i, 2 * m, a)] += 2 * v * Math.sin(m * tau) / K;
      }
    }
  }
  return c;
}
export function padCoefficients(c, N, M0, M1) {
  const out = new Float64Array(nFull(N, M1)), nb = Math.min(nBasis(M0), nBasis(M1));
  for (let i = 0; i < N; i++) for (let s = 0; s < nb; s++) for (let a = 0; a < 3; a++) out[idx(M1, i, s, a)] = c[idx(M0, i, s, a)];
  return out;
}
// time mean of sum_i |X_i|^2 / N (Parseval) and its gradient
export function meanSquareRadius(c, N, M) {
  const nb = nBasis(M), g = new Float64Array(c.length); let s = 0;
  for (let i = 0; i < N; i++) for (let k = 0; k < nb; k++) for (let a = 0; a < 3; a++) {
    const o = (i * nb + k) * 3 + a, w = k === 0 ? 1 : 0.5; s += w * c[o] * c[o] / N; g[o] = 2 * w * c[o] / N;
  }
  return { value: s, grad: g };
}

// time mean of sum_i |dX_i/dtau|^2 / N (Parseval) and its gradient
export function meanSquareTauSpeed(c, N, M) {
  const g = new Float64Array(c.length); let s = 0;
  for (let i = 0; i < N; i++) for (let m = 1; m <= M; m++) for (const k of [2 * m - 1, 2 * m]) for (let a = 0; a < 3; a++) { const o = idx(M, i, k, a); s += 0.5 * m * m * c[o] * c[o] / N; g[o] = m * m * c[o] / N; }
  return { value: s, grad: g };
}

// ---------------------------------------------------------------- symmetry and gauge operators
// group element acting on curve sets: (g X)_{perm[i]}(tau) = Rm X_i(eps * tau)
export function actionMatrix(N, M, el) {
  const n = nFull(N, M), nb = nBasis(M), G = new Float64Array(n * n);
  for (let i = 0; i < N; i++) for (let s = 0; s < nb; s++) {
    const sg = (el.eps === -1 && s > 0 && s % 2 === 0) ? -1 : 1;
    for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) G[idx(M, el.perm[i], s, a) * n + idx(M, i, s, b)] = sg * el.R[a][b];
  }
  return G;
}
function matMul(A, B, n) { const C = new Float64Array(n * n); for (let i = 0; i < n; i++) for (let k = 0; k < n; k++) { const a = A[i * n + k]; if (a === 0) continue; for (let j = 0; j < n; j++) C[i * n + j] += a * B[k * n + j]; } return C; }
function matDiff(A, B) { let d = 0; for (let k = 0; k < A.length; k++) d = Math.max(d, Math.abs(A[k] - B[k])); return d; }
export function groupClosure(gens, n) {
  const I = new Float64Array(n * n); for (let k = 0; k < n; k++) I[k * n + k] = 1;
  const els = [I]; let grew = true;
  while (grew) {
    grew = false;
    for (const e of els.slice()) for (const g of gens) {
      const p = matMul(g, e, n);
      if (!els.some(x => matDiff(x, p) < 1e-9)) { els.push(p); grew = true; if (els.length > 48) throw new Error('group closure exceeded 48 elements'); }
    }
  }
  return els;
}
// orthonormal basis (columns, n x nred) of the subspace { c : g c = c for all g, sum_i X_i = 0 on every harmonic }
export function stratumBasis(N, M, gens = []) {
  const n = nFull(N, M), nb = nBasis(M);
  let Pm = new Float64Array(n * n);
  const els = groupClosure(gens.map(g => actionMatrix(N, M, g)), n);
  for (const e of els) for (let k = 0; k < n * n; k++) Pm[k] += e[k] / els.length;
  // centroid projection applied to the columns
  const cols = [];
  for (let j = 0; j < n; j++) {
    const col = new Float64Array(n); for (let i = 0; i < n; i++) col[i] = Pm[i * n + j];
    for (let s = 0; s < nb; s++) for (let a = 0; a < 3; a++) { let m = 0; for (let i = 0; i < N; i++) m += col[idx(M, i, s, a)] / N; for (let i = 0; i < N; i++) col[idx(M, i, s, a)] -= m; }
    cols.push(col);
  }
  const basis = [];
  for (const col of cols) {
    const v = Float64Array.from(col);
    for (let pass = 0; pass < 2; pass++) for (const b of basis) { let d = 0; for (let k = 0; k < n; k++) d += b[k] * v[k]; for (let k = 0; k < n; k++) v[k] -= d * b[k]; }
    let nn = 0; for (let k = 0; k < n; k++) nn += v[k] * v[k]; nn = Math.sqrt(nn);
    if (nn > 1e-8) { for (let k = 0; k < n; k++) v[k] /= nn; basis.push(v); }
  }
  return { n, nred: basis.length, cols: basis, groupOrder: els.length };
}
export const toReduced = (B, c) => Float64Array.from(B.cols, b => { let d = 0; for (let k = 0; k < B.n; k++) d += b[k] * c[k]; return d; });
export function toFull(B, q) { const c = new Float64Array(B.n); for (let j = 0; j < B.nred; j++) { const b = B.cols[j], w = q[j]; if (w !== 0) for (let k = 0; k < B.n; k++) c[k] += w * b[k]; } return c; }
// gauge tangents at c: time shift and the three rotations
export function gaugeTangents(c, N, M) {
  const nb = nBasis(M), out = [];
  const t = new Float64Array(c.length);
  for (let i = 0; i < N; i++) for (let m = 1; m <= M; m++) for (let a = 0; a < 3; a++) {
    t[idx(M, i, 2 * m - 1, a)] = m * c[idx(M, i, 2 * m, a)]; t[idx(M, i, 2 * m, a)] = -m * c[idx(M, i, 2 * m - 1, a)];
  }
  out.push(t);
  for (let ax = 0; ax < 3; ax++) {
    const r = new Float64Array(c.length), a1 = (ax + 1) % 3, a2 = (ax + 2) % 3;
    for (let i = 0; i < N; i++) for (let s = 0; s < nb; s++) { const o = (i * nb + s) * 3; r[o + a1] = -c[o + a2]; r[o + a2] = c[o + a1]; }
    out.push(r);
  }
  return out;
}

// ---------------------------------------------------------------- residual and Jacobian
// spec: { q, M, Nc, R, stage (1|2), B, norm: 'meanRadius'|'fixOmega', omegaFixed, penaltyWeight }
// parameter vector p = [reduced coefficients (nred), omega (unless fixOmega), v (stage 2)]
export function makeProblem(spec) {
  const P = lawParams(spec.q), N = P.N, M = spec.M, Nc = spec.Nc, R = spec.R ?? 1, stage = spec.stage, B = spec.B;
  if (Nc < 4 * M + 2) throw new Error('N_c must be at least 4M+2');
  const n = nFull(N, M), nb = nBasis(M), nred = B.nred, fixOmega = spec.norm === 'fixOmega';
  if (stage === 2 && fixOmega) throw new Error('stage 2 keeps omega unknown');
  const iOmega = fixOmega ? -1 : nred, iV = stage === 2 ? nred + 1 : -1, np = nred + (fixOmega ? 0 : 1) + (stage === 2 ? 1 : 0);
  const nPair = N * (N - 1) / 2, wPen = spec.penaltyWeight ?? 10, sepPen = 0.2 * R;
  const vBox = spec.speedBox ?? null, wBox = spec.speedBoxWeight ?? 10; // optional declared search box on member speed (penalty rows, zero inside the box)
  const rowsPerTime = 3 * N + (stage === 2 ? 2 * N : 0) + nPair + (vBox ? N : 0);
  const nNorm = (stage === 1 && !fixOmega) ? 1 : 0, nrows = Nc * rowsPerTime + nNorm;
  const bases = Array.from({ length: Nc }, (_, k) => basisAt(M, 2 * Math.PI * k / Nc));
  const hX = 1e-6 * R, eNorm = spec.eNorm ?? 'omega';

  function evaluate(p, wantJ) {
    const qv = p.subarray(0, nred), c = toFull(B, qv), om = fixOmega ? spec.omegaFixed : p[iOmega], v = stage === 2 ? p[iV] : NaN;
    if (!(om > 0) || (stage === 2 && !(v > 0))) return null;
    const r = new Float64Array(nrows), Jc = wantJ ? new Float64Array(nrows * n) : null, Jo = wantJ ? new Float64Array(nrows) : null, Jv = wantJ ? new Float64Array(nrows) : null;
    const info = { maxE: 0, maxS: 0, maxV: 0, minSep: Infinity, detMin: Infinity, detMax: -Infinity, minAbsDet: Infinity, penalised: 0, boxRows: 0, maxSpeed: 0 };
    // motion-residual scale: 'omega' (frozen specification) divides by omega^2 R; 'speed' divides by v^2/R, with v the
    // stage-2 unknown or, in stage 1, the rms speed omega*sqrt(m2)
    const m2 = (eNorm === 'speed' && stage === 1) ? meanSquareTauSpeed(c, N, M) : null;
    const sE = eNorm === 'speed' ? (stage === 2 ? R / (v * v) : R / (om * om * m2.value)) : 1 / (om * om * R);
    try {
      for (let k = 0; k < Nc; k++) {
        const bas = bases[k], { X, X1, X2 } = evalCurves(c, N, M, bas), V = X1.map(z => om * z), row0 = k * rowsPerTime;
        const sol = lawAcc(X, V, P);
        if (!(Math.abs(sol.det) >= DET_MIN)) return null;
        info.detMin = Math.min(info.detMin, sol.det); info.detMax = Math.max(info.detMax, sol.det); info.minAbsDet = Math.min(info.minAbsDet, Math.abs(sol.det));
        for (let j = 0; j < 3 * N; j++) { const e = (om * om * X2[j] - sol.A[j]) * sE; r[row0 + j] = e; info.maxE = Math.max(info.maxE, Math.abs(e)); }
        let AX = null, AV = null;
        if (wantJ) {
          AX = new Float64Array(9 * N * N); AV = new Float64Array(9 * N * N);
          const hV = 1e-6 * Math.max(1e-3, Math.sqrt(V.reduce((s, z) => s + z * z, 0) / N));
          for (let j = 0; j < 3 * N; j++) {
            const xp = Float64Array.from(X), xm = Float64Array.from(X); xp[j] += hX; xm[j] -= hX;
            const ap = lawAcc(xp, V, P).A, am = lawAcc(xm, V, P).A;
            for (let i = 0; i < 3 * N; i++) AX[i * 3 * N + j] = (ap[i] - am[i]) / (2 * hX);
            const vp = Float64Array.from(V), vm = Float64Array.from(V); vp[j] += hV; vm[j] -= hV;
            const bp = lawAcc(X, vp, P).A, bm = lawAcc(X, vm, P).A;
            for (let i = 0; i < 3 * N; i++) AV[i * 3 * N + j] = (bp[i] - bm[i]) / (2 * hV);
          }
          for (let ia = 0; ia < 3 * N; ia++) {
            const ro = (row0 + ia) * n; let dO = 2 * om * X2[ia];
            for (let jb = 0; jb < 3 * N; jb++) {
              const ax = AX[ia * 3 * N + jb], av = AV[ia * 3 * N + jb], j = (jb / 3) | 0, b = jb % 3, same = ia === jb;
              dO -= av * X1[jb];
              for (let s = 0; s < nb; s++) Jc[ro + (j * nb + s) * 3 + b] = ((same ? om * om * bas.p2[s] : 0) - ax * bas.p0[s] - om * av * bas.p1[s]) * sE;
            }
            Jo[row0 + ia] = dO * sE - ((eNorm === 'speed' && stage === 2) ? 0 : 2 * r[row0 + ia] / om);
            if (eNorm === 'speed' && stage === 2) Jv[row0 + ia] = -2 * r[row0 + ia] / v;
            if (m2) for (let kk = 0; kk < n; kk++) Jc[ro + kk] -= r[row0 + ia] * m2.grad[kk] / m2.value;
          }
        }
        if (stage === 2) {
          for (let i = 0; i < N; i++) {
            let x2 = 0, w2 = 0; for (let a = 0; a < 3; a++) { x2 += X[3 * i + a] ** 2; w2 += X1[3 * i + a] ** 2; }
            const rs = row0 + 3 * N + i, rv = row0 + 4 * N + i;
            r[rs] = (x2 - R * R) / (R * R); r[rv] = (om * om * w2 - v * v) / (v * v);
            info.maxS = Math.max(info.maxS, Math.abs(r[rs])); info.maxV = Math.max(info.maxV, Math.abs(r[rv]));
            if (wantJ) {
              for (let s = 0; s < nb; s++) for (let a = 0; a < 3; a++) {
                Jc[rs * n + (i * nb + s) * 3 + a] = 2 * X[3 * i + a] * bas.p0[s] / (R * R);
                Jc[rv * n + (i * nb + s) * 3 + a] = 2 * om * om * X1[3 * i + a] * bas.p1[s] / (v * v);
              }
              Jo[rv] = 2 * om * w2 / (v * v); Jv[rv] = -2 * om * om * w2 / (v * v * v);
            }
          }
        }
        let pr = row0 + 3 * N + (stage === 2 ? 2 * N : 0);
        for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++, pr++) {
          const d = [X[3 * i] - X[3 * j], X[3 * i + 1] - X[3 * j + 1], X[3 * i + 2] - X[3 * j + 2]], dd = Math.hypot(d[0], d[1], d[2]);
          info.minSep = Math.min(info.minSep, dd);
          if (dd < SEP_MIN) return null;
          if (dd < sepPen) {
            info.penalised++; r[pr] = wPen * (sepPen - dd) / R;
            if (wantJ) for (let s = 0; s < nb; s++) for (let a = 0; a < 3; a++) {
              const g = -wPen * d[a] / dd / R * bas.p0[s]; Jc[pr * n + (i * nb + s) * 3 + a] = g; Jc[pr * n + (j * nb + s) * 3 + a] = -g;
            }
          }
        }
        for (let i = 0; i < N; i++) {
          const w1 = Math.hypot(X1[3 * i], X1[3 * i + 1], X1[3 * i + 2]), sp = om * w1; info.maxSpeed = Math.max(info.maxSpeed, sp);
          if (vBox && sp > vBox) {
            const rb = pr + i; info.boxRows++; r[rb] = wBox * (sp - vBox) / vBox;
            if (wantJ) { for (let s = 0; s < nb; s++) for (let a = 0; a < 3; a++) Jc[rb * n + (i * nb + s) * 3 + a] = wBox * om * X1[3 * i + a] / w1 * bas.p1[s] / vBox; Jo[rb] = wBox * w1 / vBox; }
          }
        }
      }
    } catch (err) { if (err instanceof SingularSystemError) return null; throw err; }
    if (nNorm) {
      const ms = meanSquareRadius(c, N, M), rr = nrows - 1; r[rr] = ms.value / (R * R) - 1;
      if (wantJ) for (let k = 0; k < n; k++) Jc[rr * n + k] = ms.grad[k] / (R * R);
    }
    let cost = 0; for (let k = 0; k < nrows; k++) cost += r[k] * r[k];
    let J = null;
    if (wantJ) {
      J = new Float64Array(nrows * np);
      for (let j = 0; j < nred; j++) { const b = B.cols[j]; for (let i = 0; i < nrows; i++) { const ro = i * n; let s = 0; for (let k = 0; k < n; k++) s += Jc[ro + k] * b[k]; J[i * np + j] = s; } }
      if (iOmega >= 0) for (let i = 0; i < nrows; i++) J[i * np + iOmega] = Jo[i];
      if (iV >= 0) for (let i = 0; i < nrows; i++) J[i * np + iV] = Jv[i];
    }
    return { r, J, cost, info, c, omega: om, v };
  }
  return { evaluate, np, nred, nrows, iOmega, iV, N, M, Nc, R, stage, P, B, n };
}

function cholSolve(Am, bvec, n) {
  const L = Float64Array.from(Am);
  for (let j = 0; j < n; j++) {
    let d = L[j * n + j]; for (let k = 0; k < j; k++) d -= L[j * n + k] ** 2;
    if (!(d > 0) || !Number.isFinite(d)) return null;
    d = Math.sqrt(d); L[j * n + j] = d;
    for (let i = j + 1; i < n; i++) { let s = L[i * n + j]; for (let k = 0; k < j; k++) s -= L[i * n + k] * L[j * n + k]; L[i * n + j] = s / d; }
  }
  const x = Float64Array.from(bvec);
  for (let i = 0; i < n; i++) { let s = x[i]; for (let k = 0; k < i; k++) s -= L[i * n + k] * x[k]; x[i] = s / L[i * n + i]; }
  for (let i = n - 1; i >= 0; i--) { let s = x[i]; for (let k = i + 1; k < n; k++) s -= L[k * n + i] * x[k]; x[i] = s / L[i * n + i]; }
  return x;
}

// Levenberg-Marquardt on the residual vector. Gauge handling: each step is taken
// orthogonal (through a large rank-one border per tangent) to the current time-shift
// tangent and the three current rotation tangents, expressed in reduced coordinates.
export function levenbergMarquardt(prob, p0, opt = {}) {
  const maxIter = opt.maxIter ?? 200, tol = opt.tol ?? 1e-24, lamFloor = opt.lamFloor ?? 1e-12, np = prob.np, nred = prob.nred;
  let p = Float64Array.from(p0), cur = prob.evaluate(p, true), lam = opt.lam0 ?? 1e-3, iter = 0, stall = 0, reason = 'max-iterations';
  if (!cur) return { ok: false, reason: 'singular-or-invalid-start', p, iter: 0 };
  const hist = [cur.cost];
  while (iter < maxIter) {
    if (cur.cost <= tol) { reason = 'residual-tolerance'; break; }
    const J = cur.J, r = cur.r, nr = prob.nrows, Nm = new Float64Array(np * np), g = new Float64Array(np);
    for (let i = 0; i < nr; i++) { const ro = i * np, ri = r[i]; for (let a = 0; a < np; a++) { const ja = J[ro + a]; if (ja === 0) continue; g[a] += ja * ri; for (let b = a; b < np; b++) Nm[a * np + b] += ja * J[ro + b]; } }
    for (let a = 0; a < np; a++) for (let b = 0; b < a; b++) Nm[a * np + b] = Nm[b * np + a];
    let dmax = 0; for (let a = 0; a < np; a++) dmax = Math.max(dmax, Nm[a * np + a]);
    if (opt.gauge !== false) {
      for (const t of gaugeTangents(cur.c, prob.N, prob.M)) {
        const tr = toReduced(prob.B, t); let nn = 0; for (let k = 0; k < nred; k++) nn += tr[k] * tr[k]; nn = Math.sqrt(nn);
        if (nn < 1e-10) continue;
        for (let a = 0; a < nred; a++) for (let b = 0; b < nred; b++) Nm[a * np + b] += dmax * tr[a] * tr[b] / (nn * nn);
      }
    }
    let accepted = false;
    for (let tries = 0; tries < 30; tries++) {
      const A = Float64Array.from(Nm);
      for (let a = 0; a < np; a++) A[a * np + a] += lam * Nm[a * np + a] + 1e-15 * dmax;
      const d = cholSolve(A, g, np);
      if (d) {
        const pt = new Float64Array(np); for (let a = 0; a < np; a++) pt[a] = p[a] - d[a];
        const tr = prob.evaluate(pt, false);
        if (tr && tr.cost < cur.cost) {
          const rel = (cur.cost - tr.cost) / cur.cost;
          p = pt; cur = prob.evaluate(p, true); lam = Math.max(lamFloor, lam / 5); accepted = true;
          stall = rel < 1e-4 ? stall + 1 : 0; break;
        }
      }
      lam *= 4; if (lam > 1e14) break;
    }
    iter++; hist.push(cur.cost);
    if (!accepted) { reason = 'no-descent'; break; }
    if (stall >= (opt.stallIter ?? 25)) { reason = 'stalled'; break; }
  }
  return { ok: true, reason, p, iter, cost: cur.cost, info: cur.info, c: cur.c, omega: cur.omega, v: cur.v, lam, costHistory: [hist[0], hist[hist.length - 1]] };
}

// ---------------------------------------------------------------- fine-grid evaluation (aliasing check)
// Independent of the collocation grid: evaluates the motion, sphere and speed
// residuals, pair separations, det M, the invariant H, sum sigma d and the identity
// Gddot = T_kin + H on Nf equispaced phases. v may be omitted (stage 1): the rms speed is used.
export function fineEvaluate(c, omega, q, M, opt = {}) {
  const P = lawParams(q), N = P.N, Nf = opt.Nf ?? 256, R = opt.R ?? 1;
  const out = { Nf, maxAbsResidual: 0, maxLawAcc: 0, maxE: 0, maxS: 0, maxV: 0, minSep: Infinity, detMin: Infinity, detMax: -Infinity, minAbsDet: Infinity, singular: false,
    radiusMin: Infinity, radiusMax: 0, speedMin: Infinity, speedMax: 0, memberSpeed: [], Hmin: Infinity, Hmax: -Infinity, sigDmin: Infinity, sigDmax: -Infinity, identityMax: 0, identityScale: 0 };
  const sp = Array.from({ length: N }, () => ({ min: Infinity, max: 0, sum2: 0, rmin: Infinity, rmax: 0 })), frames = [];
  let v2sum = 0, Hsum = 0, r2sum = 0;
  for (let k = 0; k < Nf; k++) {
    const { X, X1, X2 } = evalCurves(c, N, M, basisAt(M, 2 * Math.PI * k / Nf)), V = X1.map(z => omega * z), Acc = X2.map(z => omega * omega * z);
    let Tk = 0, pot = 0, sigD = 0, gdd = 0;
    for (let i = 0; i < N; i++) {
      const x = Math.hypot(X[3 * i], X[3 * i + 1], X[3 * i + 2]), s = Math.hypot(V[3 * i], V[3 * i + 1], V[3 * i + 2]);
      sp[i].min = Math.min(sp[i].min, s); sp[i].max = Math.max(sp[i].max, s); sp[i].sum2 += s * s; sp[i].rmin = Math.min(sp[i].rmin, x); sp[i].rmax = Math.max(sp[i].rmax, x);
      v2sum += s * s; r2sum += x * x; Tk += 0.5 * s * s;
      for (let a = 0; a < 3; a++) gdd += V[3 * i + a] ** 2 + X[3 * i + a] * Acc[3 * i + a];
    }
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      const d = [0, 1, 2].map(a => X[3 * i + a] - X[3 * j + a]), w = [0, 1, 2].map(a => V[3 * i + a] - V[3 * j + a]), al = [0, 1, 2].map(a => Acc[3 * i + a] - Acc[3 * j + a]);
      const dd = Math.hypot(...d), e = d.map(z => z / dd), dot = e[0] * w[0] + e[1] * w[1] + e[2] * w[2], w2 = w[0] ** 2 + w[1] ** 2 + w[2] ** 2;
      const ddd = e[0] * al[0] + e[1] * al[1] + e[2] * al[2] + (w2 - dot * dot) / dd, sg = P.sigma[i * N + j];
      out.minSep = Math.min(out.minSep, dd); pot += sg / dd * (1 - dot * dot / 2); sigD += sg * dd; gdd -= sg * ddd;
    }
    const H = Tk + pot; Hsum += H; out.Hmin = Math.min(out.Hmin, H); out.Hmax = Math.max(out.Hmax, H); out.sigDmin = Math.min(out.sigDmin, sigD); out.sigDmax = Math.max(out.sigDmax, sigD);
    out.identityMax = Math.max(out.identityMax, Math.abs(gdd - (Tk + H))); out.identityScale = Math.max(out.identityScale, Math.abs(Tk) + Math.abs(H));
    frames.push({ X, V, Acc });
    if (out.minSep < SEP_MIN) { out.singular = true; continue; }
    let sol;
    try { sol = lawAcc(X, V, P); } catch (err) { if (err instanceof SingularSystemError) { out.singular = true; continue; } throw err; }
    out.detMin = Math.min(out.detMin, sol.det); out.detMax = Math.max(out.detMax, sol.det); out.minAbsDet = Math.min(out.minAbsDet, Math.abs(sol.det));
    for (let i = 0; i < N; i++) { const ea = Math.hypot(Acc[3 * i] - sol.A[3 * i], Acc[3 * i + 1] - sol.A[3 * i + 1], Acc[3 * i + 2] - sol.A[3 * i + 2]), e = ea / (omega * omega * R); out.maxE = Math.max(out.maxE, e); out.maxAbsResidual = Math.max(out.maxAbsResidual, ea); out.maxLawAcc = Math.max(out.maxLawAcc, Math.hypot(sol.A[3 * i], sol.A[3 * i + 1], sol.A[3 * i + 2])); }
  }
  if (out.minAbsDet < DET_MIN) out.singular = true;
  const vRms = Math.sqrt(v2sum / (N * Nf)), v = opt.v ?? vRms;
  out.v = v; out.vRms = vRms; out.maxEspeed = out.maxAbsResidual * R / (vRms * vRms); out.maxErel = out.maxAbsResidual / Math.max(out.maxLawAcc, 1e-300); out.meanRadius = Math.sqrt(r2sum / (N * Nf)); out.Hmean = Hsum / Nf; out.Hplus3v2 = out.Hmean + 0.5 * N * v * v;
  for (const f of frames) for (let i = 0; i < N; i++) {
    const x2 = f.X[3 * i] ** 2 + f.X[3 * i + 1] ** 2 + f.X[3 * i + 2] ** 2, s2 = f.V[3 * i] ** 2 + f.V[3 * i + 1] ** 2 + f.V[3 * i + 2] ** 2;
    out.maxS = Math.max(out.maxS, Math.abs(x2 - R * R) / (R * R)); out.maxV = Math.max(out.maxV, Math.abs(s2 - v * v) / (v * v));
  }
  for (const s of sp) { out.radiusMin = Math.min(out.radiusMin, s.rmin); out.radiusMax = Math.max(out.radiusMax, s.rmax); out.speedMin = Math.min(out.speedMin, s.min); out.speedMax = Math.max(out.speedMax, s.max); }
  out.memberSpeed = sp.map(s => [s.min, s.max]); out.memberRadius = sp.map(s => [s.rmin, s.rmax]);
  out.speedLabel = out.speedMax < 1 ? 'strict (v<1)' : out.speedMax <= 1 ? 'inclusive (v<=1)' : 'unrestricted only (v>1 reached)';
  out.sigDVariation = out.sigDmax - out.sigDmin; out.HVariation = out.Hmax - out.Hmin;
  out.identityRel = out.identityMax / Math.max(out.identityScale, 1e-300);
  // pair-distance spread (rigidity) and dominant harmonics
  let rigid = 0; const dmin = new Float64Array(N * N).fill(Infinity), dmax = new Float64Array(N * N);
  for (const f of frames) for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) { const dd = Math.hypot(f.X[3 * i] - f.X[3 * j], f.X[3 * i + 1] - f.X[3 * j + 1], f.X[3 * i + 2] - f.X[3 * j + 2]); dmin[i * N + j] = Math.min(dmin[i * N + j], dd); dmax[i * N + j] = Math.max(dmax[i * N + j], dd); }
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) rigid = Math.max(rigid, dmax[i * N + j] - dmin[i * N + j]);
  out.pairDistanceSpread = rigid;
  out.dominantHarmonic = Array.from({ length: N }, (_, i) => { let best = 0, bm = 0; for (let m = 1; m <= M; m++) { let pw = 0; for (let a = 0; a < 3; a++) pw += c[idx(M, i, 2 * m - 1, a)] ** 2 + c[idx(M, i, 2 * m, a)] ** 2; pw *= m * m; if (pw > best) { best = pw; bm = m; } } return bm; });
  return out;
}

// identification against the hexagon family: rigid, equal radii, Omega_eff^2 r^3 = HEX_C
export function classify(fine, omega, tolE = 1e-8) {
  const r = fine.meanRadius, OmEff = fine.vRms / r, hexC = OmEff * OmEff * r ** 3;
  // periodic orbit: the frozen criterion (motion residual over omega^2 R) and, as a guard against the two degenerate
  // omega -> infinity limits of that normalization, the same residual over v_rms^2/R
  const periodic = !fine.singular && fine.maxE <= tolE && fine.maxEspeed <= tolE;
  const rigid = fine.pairDistanceSpread <= 1e-6 * r, radial = (fine.radiusMax - fine.radiusMin) <= 1e-6 * r;
  const hexagon = periodic && rigid && radial && Math.abs(hexC - HEX_C) <= 1e-6;
  const hexagonNear = !hexagon && periodic && fine.pairDistanceSpread <= 1e-3 * r && Math.abs(hexC - HEX_C) <= 1e-3;
  const sphere = periodic && fine.maxS <= tolE && fine.maxV <= tolE;
  let label = 'non-convergence';
  if (hexagonNear) label = `hexagon neighbourhood (iteration not finished: pair-distance spread ${fine.pairDistanceSpread.toExponential(1)}, residual still decreasing), r=${r.toPrecision(8)}`; else
  if (periodic && rigid && !hexagon) label = 'rigid periodic configuration, not the hexagon (pair distances constant)'; else
  if (hexagon) label = `hexagon family member, r=${r.toPrecision(10)}, lap period ${(2 * Math.PI / OmEff).toPrecision(10)} (law 2pi/sqrt(${HEX_C.toFixed(6)}/r^3)=${(2 * Math.PI / Math.sqrt(HEX_C / r ** 3)).toPrecision(10)}), ${Math.round(OmEff / omega)} lap(s) per collocation period`;
  else if (periodic) label = sphere ? 'EQUAL-SPEED SPHERE CANDIDATE (not hexagon)' : 'other periodic orbit (bounded, not an equal-speed sphere)';
  return { label, periodic, hexagon, hexagonNear, sphereCandidate: sphere && !hexagonNear, hexConstant: hexC, rigid, effectiveRate: OmEff };
}

// ---------------------------------------------------------------- seeds
export const Q6 = [1, -1, 1, -1, 1, -1];
export function hexagonCoefficients(M, R = 1, laps = 1) {
  const c = new Float64Array(nFull(6, M));
  for (let k = 0; k < 6; k++) { const ph = k * Math.PI / 3; c[idx(M, k, 2 * laps - 1, 0)] = R * Math.cos(ph); c[idx(M, k, 2 * laps, 0)] = -R * Math.sin(ph); c[idx(M, k, 2 * laps - 1, 1)] = R * Math.sin(ph); c[idx(M, k, 2 * laps, 1)] = R * Math.cos(ph); }
  return c;
}
export const hexagonOmega = R => Math.sqrt(HEX_C / R ** 3);
export function randomRotation(r) { // uniform via quaternion
  const q = [gauss(r), gauss(r), gauss(r), gauss(r)], n = Math.hypot(...q), [w, x, y, z] = q.map(u => u / n);
  return [[1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w)], [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w)], [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)]];
}
export const rotZ = t => [[Math.cos(t), -Math.sin(t), 0], [Math.sin(t), Math.cos(t), 0], [0, 0, 1]];
export const rotX = t => [[1, 0, 0], [0, Math.cos(t), -Math.sin(t)], [0, Math.sin(t), Math.cos(t)]];
export const applyR = (Rm, x) => [0, 1, 2].map(a => Rm[a][0] * x[0] + Rm[a][1] * x[1] + Rm[a][2] * x[2]);
// circle of harmonic w on the sphere of radius R: circle radius a, axis from rotation Rm, phase, sense
export function circleSamples(K, R, a, w, Rm, phase, sense, zsign = 1) {
  const z = zsign * Math.sqrt(Math.max(0, R * R - a * a));
  return Array.from({ length: K }, (_, k) => { const t = sense * w * 2 * Math.PI * k / K + phase; return applyR(Rm, [a * Math.cos(t), a * Math.sin(t), z]); });
}
// project per-member samples to the sphere, fit to M harmonics
export function samplesToCoefficients(perMember, M, R, project = true) {
  const N = perMember.length, K = perMember[0].length, rows = [];
  for (let k = 0; k < K; k++) { const x = new Float64Array(3 * N); for (let i = 0; i < N; i++) { const p = perMember[i][k], nn = project ? R / Math.hypot(...p) : 1; for (let a = 0; a < 3; a++) x[3 * i + a] = p[a] * nn; } rows.push(x); }
  return fitCoefficients(rows, N, M);
}
export function perturb(c, r, rel) { const d = Float64Array.from(c, () => gauss(r)); let nc = 0, nd = 0; for (let k = 0; k < c.length; k++) { nc += c[k] * c[k]; nd += d[k] * d[k]; } const s = rel * Math.sqrt(nc / nd); return c.map((z, k) => z + s * d[k]); }
