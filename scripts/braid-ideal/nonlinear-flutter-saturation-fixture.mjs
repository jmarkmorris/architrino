// Numerical fixture for the Section 90 weakly-nonlinear axis-sector probe.
//
// This module contains only generic normal-form and cubic-integration
// machinery. The physical reduced vector field is supplied by the spindle
// runner, so this fixture cannot touch or substitute for the central solver.

export const NONLINEAR_FLUTTER_FIXTURE = Object.freeze({
  schema: "axis_flutter_weakly_nonlinear_fixture.v0",
  linearGrowth: 0.19885688497216406,
  linearFrequency: 2.41245971901678,
  onsetTolerance: 2e-5,
  derivativeStep: 0.035,
  seedAmplitudeRad: 1e-4,
  integrationDt: 0.01,
  integrationTime: 160,
  divergenceAmplitudeRad: 1,
});

const zeros = (n) => Array(n).fill(0);
const add = (a, b) => a.map((v, i) => v + b[i]);
const scale = (a, s) => a.map((v) => v * s);

export function matVec(A, x) {
  return A.map((row) => row.reduce((s, v, j) => s + v * x[j], 0));
}

const cAdd = (a, b) => [a[0] + b[0], a[1] + b[1]];
const cSub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const cMul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cDiv = (a, b) => {
  const d = b[0] * b[0] + b[1] * b[1];
  return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d];
};
const cAbs = (a) => Math.hypot(a[0], a[1]);
const cConj = (a) => [a[0], -a[1]];

export function complexSolve(Ain, bin) {
  const n = Ain.length;
  const A = Ain.map((row) => row.map((v) => [v[0], v[1]]));
  const b = bin.map((v) => [v[0], v[1]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (cAbs(A[r][c]) > cAbs(A[p][c])) p = r;
    if (cAbs(A[p][c]) < 1e-13) throw new Error(`complexSolve: singular pivot ${c}`);
    if (p !== c) { [A[p], A[c]] = [A[c], A[p]]; [b[p], b[c]] = [b[c], b[p]]; }
    for (let r = c + 1; r < n; r++) {
      const f = cDiv(A[r][c], A[c][c]);
      for (let j = c; j < n; j++) A[r][j] = cSub(A[r][j], cMul(f, A[c][j]));
      b[r] = cSub(b[r], cMul(f, b[c]));
    }
  }
  const x = Array.from({ length: n }, () => [0, 0]);
  for (let r = n - 1; r >= 0; r--) {
    let s = [0, 0];
    for (let j = r + 1; j < n; j++) s = cAdd(s, cMul(A[r][j], x[j]));
    x[r] = cDiv(cSub(b[r], s), A[r][r]);
  }
  return x;
}

export function inverseEigenvector(A, lambda, { transpose = false, iterations = 10 } = {}) {
  const n = A.length;
  const M = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => {
    const a = transpose ? A[j][i] : A[i][j];
    return [a - (i === j ? lambda[0] : 0) + (i === j ? 1e-8 : 0), i === j ? -lambda[1] : 0];
  }));
  let x = Array.from({ length: n }, (_, i) => [Math.cos(0.71 * (i + 1)), Math.sin(0.43 * (i + 1))]);
  for (let k = 0; k < iterations; k++) {
    x = complexSolve(M, x);
    const norm = Math.sqrt(x.reduce((s, z) => s + cAbs(z) ** 2, 0));
    x = x.map((z) => [z[0] / norm, z[1] / norm]);
  }
  return x;
}

export function buildCubicTensors({ nonlinearRemainder, dimension, step }) {
  const memo = new Map();
  const sample = (x) => {
    const key = x.map((v) => v.toFixed(10)).join(",");
    if (!memo.has(key)) memo.set(key, nonlinearRemainder(x));
    return memo.get(key);
  };
  const mixed = (dirs) => {
    const out = zeros(dimension);
    const count = 1 << dirs.length;
    for (let mask = 0; mask < count; mask++) {
      const x = zeros(dimension);
      let sign = 1;
      for (let d = 0; d < dirs.length; d++) {
        const s = (mask & (1 << d)) ? 1 : -1;
        sign *= s;
        for (let i = 0; i < dimension; i++) x[i] += step * s * dirs[d][i];
      }
      const y = sample(x);
      for (let i = 0; i < dimension; i++) out[i] += sign * y[i];
    }
    const den = (2 * step) ** dirs.length;
    return out.map((v) => v / den);
  };
  const unit = Array.from({ length: dimension }, (_, i) => Array.from({ length: dimension }, (_, j) => i === j ? 1 : 0));
  const B = Array.from({ length: dimension }, () => Array.from({ length: dimension }));
  for (let i = 0; i < dimension; i++) for (let j = i; j < dimension; j++) {
    const v = mixed([unit[i], unit[j]]);
    B[i][j] = v; B[j][i] = v;
  }
  const C = Array.from({ length: dimension }, () => Array.from({ length: dimension }, () => Array.from({ length: dimension })));
  const perms = (i, j, k) => new Set([[i,j,k],[i,k,j],[j,i,k],[j,k,i],[k,i,j],[k,j,i]].map((p) => p.join(",")));
  for (let i = 0; i < dimension; i++) for (let j = i; j < dimension; j++) for (let k = j; k < dimension; k++) {
    const v = mixed([unit[i], unit[j], unit[k]]);
    for (const key of perms(i, j, k)) { const [a,b,c] = key.split(",").map(Number); C[a][b][c] = v; }
  }
  return { B, C, sampleCount: memo.size };
}

export function contractB(B, u, v) {
  const n = B.length, out = Array.from({ length: n }, () => [0, 0]);
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const uv = cMul(u[i], v[j]);
    for (let a = 0; a < n; a++) out[a] = cAdd(out[a], [B[i][j][a] * uv[0], B[i][j][a] * uv[1]]);
  }
  return out;
}

export function contractC(C, u, v, w) {
  const n = C.length, out = Array.from({ length: n }, () => [0, 0]);
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) {
    const uvw = cMul(cMul(u[i], v[j]), w[k]);
    for (let a = 0; a < n; a++) out[a] = cAdd(out[a], [C[i][j][k][a] * uvw[0], C[i][j][k][a] * uvw[1]]);
  }
  return out;
}

export function hopfLandauCoefficient({ A, omega, B, C }) {
  const q = inverseEigenvector(A, [0, omega]);
  let p = inverseEigenvector(A, [0, -omega], { transpose: true });
  let pq = [0, 0];
  for (let i = 0; i < q.length; i++) pq = cAdd(pq, cMul(cConj(p[i]), q[i]));
  const factor = cDiv([1, 0], cConj(pq));
  p = p.map((z) => cMul(factor, z));
  const qb = q.map(cConj);
  const Bqq = contractB(B, q, q);
  const Bqqb = contractB(B, q, qb);
  const Ac = A.map((row) => row.map((v) => [v, 0]));
  const h11 = complexSolve(Ac, Bqqb);
  const twoIwMinusA = A.map((row, i) => row.map((v, j) => [-(v), i === j ? 2 * omega : 0]));
  const h20 = complexSolve(twoIwMinusA, Bqq);
  const termC = contractC(C, q, q, qb);
  const term20 = contractB(B, qb, h20);
  const term11 = contractB(B, q, h11);
  const gvec = termC.map((z, i) => cSub(cAdd(z, term20[i]), [2 * term11[i][0], 2 * term11[i][1]]));
  let G21 = [0, 0];
  for (let i = 0; i < q.length; i++) G21 = cAdd(G21, cMul(cConj(p[i]), gvec[i]));
  return { q, p, G21, firstLyapunov: G21[0] / (2 * omega), landauComplex: [G21[0] / 2, G21[1] / 2] };
}

export function cubicVectorField(A, B, C, x) {
  const n = x.length, out = matVec(A, x);
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const f = 0.5 * x[i] * x[j];
    for (let a = 0; a < n; a++) out[a] += f * B[i][j][a];
  }
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) {
    const f = x[i] * x[j] * x[k] / 6;
    for (let a = 0; a < n; a++) out[a] += f * C[i][j][k][a];
  }
  return out;
}

export function integrateCubic({ A, B, C, initial, dt, tMax, amplitude, divergenceAmplitude }) {
  let x = initial.slice();
  const amps = [];
  const deriv = (y) => cubicVectorField(A, B, C, y);
  const steps = Math.ceil(tMax / dt);
  for (let n = 0; n <= steps; n++) {
    if (n % 10 === 0) amps.push(amplitude(x));
    const a = amplitude(x);
    if (!Number.isFinite(a) || a > divergenceAmplitude) return { bounded: false, diverged: true, finalAmplitude: a, samples: amps };
    if (n === steps) break;
    const k1 = deriv(x);
    const k2 = deriv(add(x, scale(k1, dt / 2)));
    const k3 = deriv(add(x, scale(k2, dt / 2)));
    const k4 = deriv(add(x, scale(k3, dt)));
    x = x.map((v, i) => v + (dt / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
  }
  const tail = amps.slice(Math.floor(0.8 * amps.length));
  const mean = tail.reduce((s, v) => s + v, 0) / tail.length;
  const spread = Math.max(...tail) - Math.min(...tail);
  return { bounded: Number.isFinite(mean) && spread < 0.15 * Math.max(mean, 1e-12), diverged: false,
    saturatedAmplitude: mean, tailSpread: spread, finalAmplitude: amps.at(-1), samples: amps };
}
