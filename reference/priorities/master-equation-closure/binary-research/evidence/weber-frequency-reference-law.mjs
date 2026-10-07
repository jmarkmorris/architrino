// weber-frequency-reference-law.mjs
// Independent reference implementation of the instantaneous Weber-inspired law
// (equation-variants manuscript Section 9, frozen coefficients) written from the
// law alone for the weber-binding-sphere reference lane, 2026-10-05.
//
//   A_i = sum_{j != i} (sigma_ij K / d_ij^2) [ 1 + lambda d'^2/c^2 + mu d d''/c^2 ] e_ij
//   d'' = e_ij . (A_i - A_j) + |w_perp|^2 / d,   w = V_i - V_j,  e_ij = (X_i - X_j)/d
//
// Because d'' carries the unknown accelerations, every evaluation assembles the
// full 3N x 3N system M A = b and solves it by Gaussian elimination with partial
// pivoting. Nothing here is imported from any other instrument in the repository.
// Unit integration weights (no mass), no self term, no softening, no ceiling.

export const DEFAULT_LAW = { K: 1, c: 1, lambda: -0.5, mu: 1 };

// ---------- dense linear algebra (own implementation) ----------

export function luSolve(Ain, bin) {
  // Returns { x, det, minPivot } for A x = b with partial pivoting. A, b copied.
  const n = bin.length;
  const A = Ain.map((row) => row.slice());
  const b = bin.slice();
  let det = 1;
  let minPivot = Infinity;
  for (let k = 0; k < n; k++) {
    let p = k;
    let best = Math.abs(A[k][k]);
    for (let i = k + 1; i < n; i++) {
      const v = Math.abs(A[i][k]);
      if (v > best) { best = v; p = i; }
    }
    if (p !== k) {
      [A[k], A[p]] = [A[p], A[k]];
      [b[k], b[p]] = [b[p], b[k]];
      det = -det;
    }
    const piv = A[k][k];
    if (!Number.isFinite(piv) || piv === 0) {
      return { x: null, det: 0, minPivot: 0, singular: true };
    }
    det *= piv;
    if (Math.abs(piv) < minPivot) minPivot = Math.abs(piv);
    for (let i = k + 1; i < n; i++) {
      const f = A[i][k] / piv;
      if (f === 0) continue;
      const Ai = A[i];
      const Ak = A[k];
      for (let j = k; j < n; j++) Ai[j] -= f * Ak[j];
      b[i] -= f * b[k];
    }
  }
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let s = b[i];
    for (let j = i + 1; j < n; j++) s -= A[i][j] * x[j];
    x[i] = s / A[i][i];
  }
  return { x, det, minPivot, singular: false };
}

// ---------- assembly from the law ----------

// state: { X: [[x,y,z],...], V: [[vx,vy,vz],...], q: [+1|-1,...] }
export function assemble(state, law = DEFAULT_LAW) {
  const { X, V, q } = state;
  const N = X.length;
  const n = 3 * N;
  const { K, c, lambda, mu } = law;
  const M = Array.from({ length: n }, (_, i) => {
    const row = new Array(n).fill(0);
    row[i] = 1;
    return row;
  });
  const b = new Array(n).fill(0);
  let minSep = Infinity;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (j === i) continue;
      const dx = X[i][0] - X[j][0], dy = X[i][1] - X[j][1], dz = X[i][2] - X[j][2];
      const d = Math.hypot(dx, dy, dz);
      if (d < minSep) minSep = d;
      const e = [dx / d, dy / d, dz / d];
      const w = [V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]];
      const ddot = e[0] * w[0] + e[1] * w[1] + e[2] * w[2];
      const wperp2 = (w[0] * w[0] + w[1] * w[1] + w[2] * w[2]) - ddot * ddot;
      const sigma = q[i] * q[j];
      // known part of the bracket: 1 + lambda d'^2/c^2 + mu |w_perp|^2 / c^2
      const beta = (sigma * K / (d * d)) * (1 + lambda * ddot * ddot / (c * c) + mu * wperp2 / (c * c));
      // unknown part: (sigma K mu / (c^2 d)) e (e . (A_i - A_j))
      const alpha = sigma * K * mu / (c * c * d);
      for (let a = 0; a < 3; a++) {
        b[3 * i + a] += beta * e[a];
        for (let bb = 0; bb < 3; bb++) {
          const ee = alpha * e[a] * e[bb];
          M[3 * i + a][3 * i + bb] -= ee;
          M[3 * i + a][3 * j + bb] += ee;
        }
      }
    }
  }
  return { M, b, minSep };
}

export function solveAccelerations(state, law = DEFAULT_LAW) {
  const { M, b, minSep } = assemble(state, law);
  const r = luSolve(M, b);
  if (r.singular) return { A: null, det: 0, minSep, singular: true };
  const N = state.X.length;
  const A = [];
  for (let i = 0; i < N; i++) A.push([r.x[3 * i], r.x[3 * i + 1], r.x[3 * i + 2]]);
  return { A, det: r.det, minPivot: r.minPivot, minSep, singular: false };
}

// Independent check of a trial acceleration directly against the law
// (no matrix): returns max_i || A_i - RHS_i(A) ||, where RHS uses the full
// d'' = e.(A_i - A_j) + |w_perp|^2/d with the trial A inserted.
export function lawResidual(state, A, law = DEFAULT_LAW) {
  const { X, V, q } = state;
  const N = X.length;
  const { K, c, lambda, mu } = law;
  let worst = 0;
  for (let i = 0; i < N; i++) {
    const rhs = [0, 0, 0];
    for (let j = 0; j < N; j++) {
      if (j === i) continue;
      const dx = X[i][0] - X[j][0], dy = X[i][1] - X[j][1], dz = X[i][2] - X[j][2];
      const d = Math.hypot(dx, dy, dz);
      const e = [dx / d, dy / d, dz / d];
      const w = [V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]];
      const ddot = e[0] * w[0] + e[1] * w[1] + e[2] * w[2];
      const wperp2 = (w[0] * w[0] + w[1] * w[1] + w[2] * w[2]) - ddot * ddot;
      const dA = [A[i][0] - A[j][0], A[i][1] - A[j][1], A[i][2] - A[j][2]];
      const dddot = e[0] * dA[0] + e[1] * dA[1] + e[2] * dA[2] + wperp2 / d;
      const sigma = q[i] * q[j];
      const mag = (sigma * K / (d * d)) * (1 + lambda * ddot * ddot / (c * c) + mu * d * dddot / (c * c));
      for (let a = 0; a < 3; a++) rhs[a] += mag * e[a];
    }
    const res = Math.hypot(A[i][0] - rhs[0], A[i][1] - rhs[1], A[i][2] - rhs[2]);
    if (res > worst) worst = res;
  }
  return worst;
}

// ---------- integrator (own classical RK4, fixed step) ----------

export function flatten(state) {
  const N = state.X.length;
  const y = new Array(6 * N);
  for (let i = 0; i < N; i++) {
    for (let a = 0; a < 3; a++) { y[3 * i + a] = state.X[i][a]; y[3 * N + 3 * i + a] = state.V[i][a]; }
  }
  return y;
}

export function unflatten(y, q) {
  const N = q.length;
  const X = [], V = [];
  for (let i = 0; i < N; i++) {
    X.push([y[3 * i], y[3 * i + 1], y[3 * i + 2]]);
    V.push([y[3 * N + 3 * i], y[3 * N + 3 * i + 1], y[3 * N + 3 * i + 2]]);
  }
  return { X, V, q };
}

export function derivative(y, q, law = DEFAULT_LAW) {
  const N = q.length;
  const st = unflatten(y, q);
  const sol = solveAccelerations(st, law);
  if (sol.singular) throw new Error('singular acceleration matrix');
  const dy = new Array(6 * N);
  for (let i = 0; i < N; i++) {
    for (let a = 0; a < 3; a++) { dy[3 * i + a] = st.V[i][a]; dy[3 * N + 3 * i + a] = sol.A[i][a]; }
  }
  return dy;
}

export function rk4Step(y, h, q, law = DEFAULT_LAW) {
  const n = y.length;
  const k1 = derivative(y, q, law);
  const y2 = y.map((v, i) => v + 0.5 * h * k1[i]);
  const k2 = derivative(y2, q, law);
  const y3 = y.map((v, i) => v + 0.5 * h * k2[i]);
  const k3 = derivative(y3, q, law);
  const y4 = y.map((v, i) => v + h * k3[i]);
  const k4 = derivative(y4, q, law);
  const out = new Array(n);
  for (let i = 0; i < n; i++) out[i] = y[i] + (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
  return out;
}

// Integrate from 0 to T with nSteps RK4 steps; callback(t, y) per step if given.
export function integrate(state, T, nSteps, law = DEFAULT_LAW, callback = null) {
  const q = state.q;
  let y = flatten(state);
  const h = T / nSteps;
  if (callback) callback(0, y);
  for (let s = 1; s <= nSteps; s++) {
    y = rk4Step(y, h, q, law);
    if (callback) callback(s * h, y);
  }
  return unflatten(y, q);
}

export function sig15(x) {
  if (typeof x !== 'number') return x;
  if (!Number.isFinite(x)) return x;
  return Number(x.toPrecision(15));
}
