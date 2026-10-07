// Round-2 additions to the multi-curve collocation instrument (preregistration Section 11.6).
// Imports the round-1 library unmodified (representation, residuals with eNorm 'speed', Jacobian, strata,
// fine-grid evaluation, classification) and adds: a bounded Levenberg-Marquardt with hard box bounds on
// omega and v and a geometric-tail step for degenerate zeros; and the round-2 acceptance rule.
import * as L from './weber-binding-sphere-mc-lib.mjs';
export { L };
export const BOX = { omega: [0.2, 4], v: [0.2, 1.5] };

function cholSolve(Am, bvec, n) {
  const C = Float64Array.from(Am);
  for (let j = 0; j < n; j++) {
    let d = C[j * n + j]; for (let k = 0; k < j; k++) d -= C[j * n + k] ** 2;
    if (!(d > 0) || !Number.isFinite(d)) return null;
    d = Math.sqrt(d); C[j * n + j] = d;
    for (let i = j + 1; i < n; i++) { let s = C[i * n + j]; for (let k = 0; k < j; k++) s -= C[i * n + k] * C[j * n + k]; C[i * n + j] = s / d; }
  }
  const x = Float64Array.from(bvec);
  for (let i = 0; i < n; i++) { let s = x[i]; for (let k = 0; k < i; k++) s -= C[i * n + k] * x[k]; x[i] = s / C[i * n + i]; }
  for (let i = n - 1; i >= 0; i--) { let s = x[i]; for (let k = i + 1; k < n; k++) s -= C[k * n + i] * x[k]; x[i] = s / C[i * n + i]; }
  return x;
}

// Bounded LM. Same normal equations, damping schedule and gauge borders as round 1. Additions:
//  - bounds: omega (and v in stage 2) are clamped to their box after every trial step (projected step);
//  - geometric-tail step: when two consecutive accepted steps are parallel (cosine > 0.95) with length ratio
//    in [0.35, 0.65] -- the signature of Newton's linear rate 1/2 at a zero whose Jacobian is singular along a
//    direction in which the residual grows quadratically -- the remaining tail s/2 + s/4 + ... = s is added in
//    one extra trial and kept if it lowers the cost. It uses no knowledge of the hexagon and removes no solution.
export function lmBounded(prob, p0, opt = {}) {
  const maxIter = opt.maxIter ?? 200, tol = opt.tol ?? 1e-24, lamFloor = opt.lamFloor ?? 1e-18, absFloor = opt.absFloor ?? 1e-20, np = prob.np, nred = prob.nred, accel = opt.accelerate !== false;
  const bounds = []; if (prob.iOmega >= 0) bounds.push([prob.iOmega, ...BOX.omega]); if (prob.iV >= 0) bounds.push([prob.iV, ...BOX.v]);
  const clamp = q => { if (opt.bounded !== false) for (const [i, lo, hi] of bounds) q[i] = Math.min(hi, Math.max(lo, q[i])); return q; };
  let p = clamp(Float64Array.from(p0)), cur = prob.evaluate(p, true), lam = opt.lam0 ?? 1e-3, iter = 0, stall = 0, reason = 'max-iterations', prev = null, jumps = 0;
  if (!cur) return { ok: false, reason: 'singular-or-invalid-start', p, iter: 0 };
  const trace = [cur.cost];
  while (iter < maxIter) {
    if (cur.cost <= tol) { reason = 'residual-tolerance'; break; }
    const J = cur.J, r = cur.r, nr = prob.nrows, Nm = new Float64Array(np * np), g = new Float64Array(np);
    for (let i = 0; i < nr; i++) { const ro = i * np, ri = r[i]; for (let a = 0; a < np; a++) { const ja = J[ro + a]; if (ja === 0) continue; g[a] += ja * ri; for (let b = a; b < np; b++) Nm[a * np + b] += ja * J[ro + b]; } }
    for (let a = 0; a < np; a++) for (let b = 0; b < a; b++) Nm[a * np + b] = Nm[b * np + a];
    let dmax = 0; for (let a = 0; a < np; a++) dmax = Math.max(dmax, Nm[a * np + a]);
    for (const t of L.gaugeTangents(cur.c, prob.N, prob.M)) {
      const tr = L.toReduced(prob.B, t); let nn = 0; for (let k = 0; k < nred; k++) nn += tr[k] * tr[k]; nn = Math.sqrt(nn);
      if (nn < 1e-10) continue;
      for (let a = 0; a < nred; a++) for (let b = 0; b < nred; b++) Nm[a * np + b] += dmax * tr[a] * tr[b] / (nn * nn);
    }
    let accepted = false, step = null;
    for (let tries = 0; tries < 30; tries++) {
      const A = Float64Array.from(Nm);
      for (let a = 0; a < np; a++) A[a * np + a] += lam * Nm[a * np + a] + absFloor * dmax;
      const d = cholSolve(A, g, np);
      if (d) {
        const pt = new Float64Array(np); for (let a = 0; a < np; a++) pt[a] = p[a] - d[a]; clamp(pt);
        const tr = prob.evaluate(pt, false);
        if (tr && tr.cost < cur.cost) {
          const rel = (cur.cost - tr.cost) / cur.cost; step = pt.map((z, a) => z - p[a]);
          p = pt; cur = prob.evaluate(p, true); lam = Math.max(lamFloor, lam / 5); accepted = true; stall = rel < 1e-4 ? stall + 1 : 0; break;
        }
      }
      lam *= 4; if (lam > 1e14) break;
    }
    iter++; trace.push(cur.cost);
    if (!accepted) { reason = 'no-descent'; break; }
    if (accel && prev) {
      let ss = 0, pp = 0, sp = 0; for (let a = 0; a < np; a++) { ss += step[a] * step[a]; pp += prev[a] * prev[a]; sp += step[a] * prev[a]; }
      const ratio = Math.sqrt(ss / pp), cos = sp / Math.sqrt(ss * pp);
      if (ratio > 0.35 && ratio < 0.65 && cos > 0.95) {
        const p2 = clamp(p.map((z, a) => z + step[a])), t2 = prob.evaluate(p2, false);
        if (t2 && t2.cost < cur.cost) { p = p2; cur = prob.evaluate(p, true); jumps++; trace.push(cur.cost); step = null; }
      }
    }
    prev = step;
    if (stall >= (opt.stallIter ?? 25)) { reason = 'stalled'; break; }
  }
  const boxLimited = opt.bounded !== false && bounds.some(([i, lo, hi]) => p[i] <= lo * (1 + 1e-9) || p[i] >= hi * (1 - 1e-9));
  return { ok: true, reason, p, iter, jumps, cost: cur.cost, info: cur.info, c: cur.c, omega: cur.omega, v: cur.v, boxLimited, trace };
}

// Round-2 acceptance rule on top of the round-1 fine-grid evaluation.
export function classifyR2(fine, omega, R = 1) {
  const cls = L.classify(fine, omega), detOneSigned = !fine.singular && fine.detMin * fine.detMax > 0, separationOK = fine.minSep >= 0.2 * R;
  return { ...cls, detOneSigned, separationOK, candidate: cls.sphereCandidate && !cls.hexagon && detOneSigned && separationOK };
}
