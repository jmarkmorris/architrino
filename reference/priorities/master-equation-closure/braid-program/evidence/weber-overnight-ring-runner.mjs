#!/usr/bin/env node
// Weber-overnight ring runner: evolves the four-member alternating ring and its
// prescribed perturbations with the subject instrument (imported, unmodified),
// fits early-time rates, detects first events and pairing, and records results.
//
// Order of execution is fixed by AGENTS.md (Claim Grading): the preregistration
// block is written to the results file first, then the known cases are run and
// recorded, and only then are the target cases run. Each phase rewrites the
// results file so that a crash leaves the earlier phases on disk.
//
//   node weber-overnight-ring-runner.mjs            # prereg -> known -> targets
//   node weber-overnight-ring-runner.mjs known      # prereg + known cases only
// The sandbox kills background processes between tool calls, so the runner is
// resumable: it reloads an existing results file, skips recorded cases, and
// stops launching new runs after BUDGET seconds; call it again to continue.
//
// Units: K = c_f = 1, so the ring radius rho equals the dimensionless radius x.
// Law: equation-variants/manuscript.md Section 9, lambda_W = -1/2, mu_W = 1,
// instantaneous support, unit integration weights (architrinos have no mass).

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { runCase, solveAccelerations, makeParams, packState, candidates, REPO_ROOT } from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const INSTRUMENT = path.resolve(HERE, '../../binary-research/evidence/weber-overnight-pair-instrument.mjs');
const RESULTS = path.join(HERE, 'weber-overnight-ring-runs.json');
const DATA_DIR = path.join(REPO_ROOT, '.local-data/master-equation-closure/weber-overnight/ring');
const SCRATCH = path.join(REPO_ROOT, '.tmp/weber-overnight/round2/ring-runs');
fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(SCRATCH, { recursive: true });

const S2 = Math.SQRT2, CW = 2 * S2 - 1; // (2 sqrt 2 - 1)
const XSTAR = CW / 4;
const COEFF = { lambda: -0.5, mu: 1, K: 1, cf: 1 };
const TOL = { prereg: { rtol: 1e-12, atol: 1e-14 }, refine: { rtol: 1e-10, atol: 1e-14 } };
const EVENTS = { rContact: 1e-6, rEscape: 1e3, detMin: 1e-8, pivotMin: 1e-10, condMax: 1e10, speed: { record: true, stop: false }, turning: { record: false } };
const PERIODS = 20;
const MAX_STEPS = Number(process.env.RING_MAX_STEPS ?? 15000); // numerical cap per run; a 'max-steps' termination is a cost stop, not an event (40000 for the runs made before 14:45Z, see anomalies)
const RATE_PERIODS = 3; // the eps = 1e-6 runs serve the early-window fit only
const BUDGET_S = Number(process.env.RING_BUDGET_S ?? 460);
const T_START = Date.now();
const outOfBudget = () => (Date.now() - T_START) / 1000 > BUDGET_S;
const log = (...a) => { const s = a.join(' '); console.log(s); fs.appendFileSync(path.join(SCRATCH, 'runner.log'), s + '\n'); };

// ---------------------------------------------------------------- ring geometry
const RHAT = [[1, 0, 0], [0, 1, 0], [-1, 0, 0], [0, -1, 0]];
const THAT = [[0, 1, 0], [-1, 0, 0], [0, -1, 0], [1, 0, 0]];
const QS = [1, -1, 1, -1];
function ringSpeed(rho) { let v = Math.sqrt(CW / (4 * rho)); if (Math.abs(v - 1) < 8e-16) v = 1; return v; }
function ringMembers(rho) {
  const v = ringSpeed(rho);
  return RHAT.map((r, j) => ({ x: r.map(z => z * rho), v: THAT[j].map(z => z * v), q: QS[j] }));
}
function ringOmega(rho) { return ringSpeed(rho) / rho; }

// local frames at time T (counterclockwise rotation at rate Omega)
function frames(T, Om) {
  const out = [];
  for (let j = 0; j < 4; j++) {
    const th = Om * T + j * Math.PI / 2, c = Math.cos(th), s = Math.sin(th);
    out.push({ r: [c, s, 0], t: [-s, c, 0], ring: [c, s, 0] });
  }
  return out;
}
const d3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

// Symmetry-adapted sector amplitudes of the displacement from the unperturbed
// ring X_ring(T) (ring file, Section 3.1): a_j, b_j, c_j local components;
// Fourier characters k = 0, 2 real and k = 1 complex (A_1 = (1/4) sum a_j (-i)^j).
function sectors(T, x, rho, Om) {
  const F = frames(T, Om), a = [], b = [], c = [];
  for (let j = 0; j < 4; j++) {
    const d = [x[3 * j] - rho * F[j].ring[0], x[3 * j + 1] - rho * F[j].ring[1], x[3 * j + 2]];
    a.push(d3(d, F[j].r)); b.push(d3(d, F[j].t)); c.push(d[2]);
  }
  const k0 = v => (v[0] + v[1] + v[2] + v[3]) / 4;
  const k2 = v => (v[0] - v[1] + v[2] - v[3]) / 4;
  const k1 = v => ({ re: (v[0] - v[2]) / 4, im: (v[3] - v[1]) / 4 });
  const A1 = k1(a), B1 = k1(b), C1 = k1(c);
  // sublattice line (1,-i): A + iB ; translation line (1,i): A - iB
  const subl = { re: A1.re - B1.im, im: A1.im + B1.re };
  const trans = { re: A1.re + B1.im, im: A1.im - B1.re };
  return {
    a, b, c,
    breathing: k0(a), rotation: k0(b), axial: k0(c),
    elliptic: k2(a), shear: k2(b), warp: k2(c),
    sublattice: subl, translation: trans, tilt: C1,
    sublatticeAbs: Math.hypot(subl.re, subl.im), translationAbs: Math.hypot(trans.re, trans.im), tiltAbs: Math.hypot(C1.re, C1.im),
  };
}

// Predictions from the ring derivation, Sections 4-5 (same-lane; compared, not assumed).
function predictions(x) {
  const rho = x, Om2 = CW / (4 * rho ** 3), Om = Math.sqrt(Om2), P = 2 * Math.PI / Om;
  const ma = 1 + (S2 - 1) / x, wbr = Math.sqrt(Om2 / ma);
  const ww = Math.sqrt(S2 / rho ** 3);
  const ms = 1 + S2 / x, D = (1 / (4 * rho ** 3)) * (2 * S2 + (8 - S2) / x), gs = Math.sqrt(D) / ms, phis = Om / ms;
  const mA = 1 - 1 / x, mB = 1 + S2 / x, kA = 0.75, kB = -3 * S2 / 2, Om2u = CW / 4; // units K/rho^3
  const qa = mA * mB, qb = mA * kB + mB * kA + 4 * Om2u, qc = kA * kB;
  const disc = qb * qb - 4 * qa * qc;
  let sRoots;
  if (disc >= 0) sRoots = [(-qb + Math.sqrt(disc)) / (2 * qa), (-qb - Math.sqrt(disc)) / (2 * qa)].map(s => s / rho ** 3);
  else sRoots = null;
  const k2 = { sRoots, growth: [], oscillation: [] };
  if (sRoots) for (const s of sRoots) { if (s > 0) k2.growth.push(Math.sqrt(s)); else k2.oscillation.push(Math.sqrt(-s)); }
  return { x, rho, Omega: Om, period: P, speed: Om * rho, detM: (1 + (S2 - 1) / x) * (1 - 1 / x) * (1 + S2 / x) ** 3,
    breathing: wbr, warp: ww, tilt: Om, translation: Om, rotationPhaseCoupling: wbr,
    sublattice: { growth: gs, phaseRate: phis }, ellipticShear: k2, ma, ms, mA, mB };
}

// ---------------------------------------------------------------- perturbation vectors (ring file, Section 9)
const PERT = {
  breathing: { d: [[1, 0, 0], [0, 1, 0], [-1, 0, 0], [0, -1, 0]], sector: 'breathing', kind: 'oscillation', model: 'offset+osc' },
  warp: { d: [[0, 0, 1], [0, 0, -1], [0, 0, 1], [0, 0, -1]], sector: 'warp', kind: 'oscillation', model: 'osc' },
  tilt: { d: [[0, 0, 1], [0, 0, 0], [0, 0, -1], [0, 0, 0]], sector: 'tiltAbs', kind: 'oscillation', model: 'osc-complex' },
  translation: { d: [[1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0]], sector: 'translationAbs', kind: 'neutral', model: 'phase' },
  boost: { d: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]], dv: [[1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0]], sector: 'translationAbs', kind: 'neutral', model: 'linear' },
  rotationPhase: { d: [[0, 1, 0], [-1, 0, 0], [0, -1, 0], [1, 0, 0]], sector: 'breathing', proj: 'rotation', kind: 'oscillation', model: 'offset+osc' },
  sublattice: { d: [[1, 0, 0], [-1, 0, 0], [1, 0, 0], [-1, 0, 0]], sector: 'sublatticeAbs', kind: 'growth', model: 'k1' },
  elliptic: { d: [[1, 0, 0], [0, -1, 0], [-1, 0, 0], [0, 1, 0]], sector: 'elliptic', kind: 'growth', model: 'k2' },
  shear: { d: [[0, 1, 0], [1, 0, 0], [0, -1, 0], [-1, 0, 0]], sector: 'shear', kind: 'growth', model: 'k2' },
};
const WR_ORDER = [['WR-1', 'breathing'], ['WR-2', 'warp'], ['WR-3', 'tilt'], ['WR-4a', 'translation'], ['WR-4b', 'boost'], ['WR-5', 'rotationPhase'], ['WR-6', 'sublattice'], ['WR-7a', 'elliptic'], ['WR-7b', 'shear']];

function perturbed(rho, name, epsRel) {
  const m = ringMembers(rho), p = PERT[name], eps = epsRel * rho, Om = ringOmega(rho);
  return m.map((mem, j) => ({
    x: mem.x.map((z, a) => z + eps * p.d[j][a]),
    v: mem.v.map((z, a) => z + (p.dv ? eps * Om * p.dv[j][a] : 0)),
    q: mem.q,
  }));
}

// ---------------------------------------------------------------- fitting (variable projection)
// Basis functions analytic in s: C(s,t) = cosh(sqrt(s) t) or cos(sqrt(-s) t);
// S(s,t) = sinh(sqrt(s) t)/sqrt(s) or sin(sqrt(-s) t)/sqrt(-s).
function Cf(s, t) { if (s >= 0) return Math.cosh(Math.sqrt(s) * t); return Math.cos(Math.sqrt(-s) * t); }
function Sf(s, t) { if (s > 0) { const w = Math.sqrt(s); return Math.sinh(w * t) / w; } if (s < 0) { const w = Math.sqrt(-s); return Math.sin(w * t) / w; } return t; }

function lstsq(cols, y) { // columns as arrays; returns {coef, rms}
  const m = cols.length, n = y.length, G = Array.from({ length: m }, () => new Float64Array(m + 1));
  const sc = cols.map(c => Math.sqrt(c.reduce((s, z) => s + z * z, 0)) || 1);
  for (let i = 0; i < m; i++) { for (let j = 0; j < m; j++) { let s = 0; for (let k = 0; k < n; k++) s += cols[i][k] * cols[j][k]; G[i][j] = s / (sc[i] * sc[j]); } let s = 0; for (let k = 0; k < n; k++) s += cols[i][k] * y[k]; G[i][m] = s / sc[i]; }
  for (let k = 0; k < m; k++) {
    let p = k; for (let i = k + 1; i < m; i++) if (Math.abs(G[i][k]) > Math.abs(G[p][k])) p = i;
    [G[k], G[p]] = [G[p], G[k]];
    if (!(Math.abs(G[k][k]) > 1e-300)) return { coef: null, rms: Infinity };
    for (let i = 0; i < m; i++) if (i !== k) { const f = G[i][k] / G[k][k]; if (f) for (let j = k; j <= m; j++) G[i][j] -= f * G[k][j]; }
  }
  const coef = Array.from({ length: m }, (_, i) => G[i][m] / G[i][i] / sc[i]);
  let r2 = 0; for (let k = 0; k < n; k++) { let f = 0; for (let i = 0; i < m; i++) f += coef[i] * cols[i][k]; r2 += (y[k] - f) ** 2; }
  return { coef, rms: Math.sqrt(r2 / n) };
}

// model: list of nonlinear s-parameters; basis = [offset?] [drift?] + C(s_m), S(s_m) for each m
function buildCols(theta, t, opts) {
  const cols = [];
  if (opts.offset) cols.push(t.map(() => 1));
  if (opts.drift) cols.push(t.slice());
  for (const s of theta) { cols.push(t.map(tt => Cf(s, tt))); cols.push(t.map(tt => Sf(s, tt))); }
  return cols;
}
function residual(theta, t, y, opts) { return lstsq(buildCols(theta, t, opts), y).rms; }

function nelderMead(f, x0, scale, iters = 4000, tol = 1e-15) {
  const n = x0.length; let simplex = [x0.slice()];
  for (let i = 0; i < n; i++) { const p = x0.slice(); p[i] += scale[i]; simplex.push(p); }
  let vals = simplex.map(f);
  for (let it = 0; it < iters; it++) {
    const idx = vals.map((v, i) => i).sort((a, b) => vals[a] - vals[b]); simplex = idx.map(i => simplex[i]); vals = idx.map(i => vals[i]);
    if (Math.abs(vals[n] - vals[0]) <= tol * Math.max(1e-300, Math.abs(vals[0])) && it > 50) {
      const spread = Math.max(...simplex.map(p => Math.max(...p.map((z, k) => Math.abs(z - simplex[0][k])))));
      if (spread < 1e-13 * Math.max(1, Math.abs(simplex[0][0]))) break;
    }
    const cen = new Array(n).fill(0); for (let i = 0; i < n; i++) for (let k = 0; k < n; k++) cen[k] += simplex[i][k] / n;
    const xr = cen.map((c, k) => c + (c - simplex[n][k])), fr = f(xr);
    if (fr < vals[0]) { const xe = cen.map((c, k) => c + 2 * (c - simplex[n][k])), fe = f(xe); if (fe < fr) { simplex[n] = xe; vals[n] = fe; } else { simplex[n] = xr; vals[n] = fr; } }
    else if (fr < vals[n - 1]) { simplex[n] = xr; vals[n] = fr; }
    else {
      const xc = cen.map((c, k) => c + 0.5 * (simplex[n][k] - c)), fc = f(xc);
      if (fc < vals[n]) { simplex[n] = xc; vals[n] = fc; }
      else for (let i = 1; i <= n; i++) { simplex[i] = simplex[i].map((z, k) => simplex[0][k] + 0.5 * (z - simplex[0][k])); vals[i] = f(simplex[i]); }
    }
  }
  return { x: simplex[0], f: vals[0] };
}

// Fit y(t) with nParams nonlinear s-values on a grid over [sLo, sHi], then refine.
function fitModel(t, y, nParams, opts, range) {
  const f = th => residual(th, t, y, opts);
  const [lo, hi] = range, G = nParams === 1 ? 400 : 60, grid = [];
  for (let i = 0; i <= G; i++) grid.push(lo + (hi - lo) * i / G);
  let best = null;
  if (nParams === 1) { for (const s of grid) { const r = f([s]); if (!best || r < best.f) best = { x: [s], f: r }; } }
  else { for (let i = 0; i <= G; i++) for (let j = i + 1; j <= G; j++) { const r = f([grid[i], grid[j]]); if (!best || r < best.f) best = { x: [grid[i], grid[j]], f: r }; } }
  const step = (hi - lo) / G;
  let res = nelderMead(f, best.x, best.x.map(() => step * 0.5));
  res = nelderMead(f, res.x, res.x.map(z => 1e-6 * Math.max(1, Math.abs(z))));
  const fit = lstsq(buildCols(res.x, t, opts), y);
  const yrms = Math.sqrt(y.reduce((s, z) => s + z * z, 0) / y.length);
  return { s: res.x, coef: fit.coef, rms: fit.rms, relRms: fit.rms / (yrms || 1), n: t.length, tWindow: [t[0], t[t.length - 1]] };
}
const rateOf = s => (s >= 0 ? { type: 'growth', value: Math.sqrt(s) } : { type: 'oscillation', value: Math.sqrt(-s) });

// phase slope of a complex amplitude (unwrapped), linear regression
function phaseSlope(t, re, im) {
  const ph = []; let acc = 0, prev = Math.atan2(im[0], re[0]);
  for (let k = 0; k < t.length; k++) { const p = Math.atan2(im[k], re[k]); let dp = p - prev; while (dp > Math.PI) dp -= 2 * Math.PI; while (dp < -Math.PI) dp += 2 * Math.PI; acc += dp; prev = p; ph.push(acc); }
  const n = t.length, mt = t.reduce((a, b) => a + b, 0) / n, mp = ph.reduce((a, b) => a + b, 0) / n;
  let sxx = 0, sxy = 0; for (let k = 0; k < n; k++) { sxx += (t[k] - mt) ** 2; sxy += (t[k] - mt) * (ph[k] - mp); }
  return sxy / sxx;
}

// ---------------------------------------------------------------- pairing diagnosis
const MATCHINGS = [[[0, 1], [2, 3]], [[0, 2], [1, 3]], [[0, 3], [1, 2]]];
function sep(x, i, j) { return Math.hypot(x[3 * i] - x[3 * j], x[3 * i + 1] - x[3 * j + 1], x[3 * i + 2] - x[3 * j + 2]); }
function centre(x, i, j) { return [0, 1, 2].map(a => (x[3 * i + a] + x[3 * j + a]) / 2); }
function pairingDiagnosis(samples, q) {
  const n = samples.length, w0 = Math.max(0, n - Math.max(20, Math.floor(0.1 * n)));
  const win = samples.slice(w0);
  const pick = s => { let best = null; MATCHINGS.forEach((m, k) => { const r1 = sep(s.x, ...m[0]), r2 = sep(s.x, ...m[1]); if (!best || r1 + r2 < best.sum) best = { k, r1, r2, sum: r1 + r2 }; }); return best; };
  const picks = win.map(pick), k = picks[picks.length - 1].k, stable = picks.every(p => p.k === k);
  const m = MATCHINGS[k], opp = q[m[0][0]] !== q[m[0][1]] && q[m[1][0]] !== q[m[1][1]];
  const dcc = s => { const c1 = centre(s.x, ...m[0]), c2 = centre(s.x, ...m[1]); return Math.hypot(c1[0] - c2[0], c1[1] - c2[1], c1[2] - c2[2]); };
  const rmax = Math.max(...picks.map(p => Math.max(p.r1, p.r2))), rmin = Math.min(...picks.map(p => Math.min(p.r1, p.r2)));
  const D0 = dcc(win[0]), D1 = dcc(win[win.length - 1]), Dmin = Math.min(...win.map(dcc));
  const bounded = rmax <= 0.25 * Dmin, growing = D1 > D0;
  let label;
  if (stable && opp && bounded && growing) label = 'two-opposite-polarity-binaries-separating';
  else if (stable && opp && bounded) label = 'two-opposite-polarity-binaries-not-separating';
  else label = 'not-paired';
  return { label, matching: m, matchingStable: stable, oppositePolarity: opp, pairSeparationRange: [rmin, rmax], pairCentreDistance: { windowStart: D0, windowEnd: D1, windowMin: Dmin }, window: [win[0].t, win[win.length - 1].t], samplesInWindow: win.length };
}

// ---------------------------------------------------------------- run wrapper
function makeSpec(name, members, rho, tol, extra = {}) {
  const Om = ringOmega(rho), P = 2 * Math.PI / Om;
  return { name, members, coefficients: COEFF, integrator: { method: 'gbs', rtol: tol.rtol, atol: tol.atol, hmax: P / 50, maxSteps: MAX_STEPS }, events: { ...EVENTS, ...(extra.events ?? {}) }, tEnd: extra.tEnd ?? PERIODS * P, candidate: 'weber', condition: 'exact' };
}
function run(stem, spec, rho, writeTraj = true) {
  const Om = ringOmega(rho), samples = [], lines = [];
  const t0 = Date.now();
  const res = runCase(spec, {
    onRecord(rec) {
      if (writeTraj) lines.push(JSON.stringify(rec));
      if (rec.type === 'state') {
        const sec = sectors(rec.t, rec.x, rho, Om);
        const seps = []; for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) seps.push(sep(rec.x, i, j));
        const radii = [0, 1, 2, 3].map(j => Math.hypot(rec.x[3 * j], rec.x[3 * j + 1], rec.x[3 * j + 2]));
        const speeds = [0, 1, 2, 3].map(j => Math.hypot(rec.v[3 * j], rec.v[3 * j + 1], rec.v[3 * j + 2]));
        samples.push({ t: rec.t, x: rec.x, v: rec.v, det: rec.det, cond: rec.cond, H: rec.H, P: rec.P, L: rec.L, sec, seps, radii, speeds });
      }
    },
    heartbeat: ({ t, steps }) => log(`  heartbeat ${stem}: t=${t.toFixed(3)} steps=${steps}`), heartbeatEvery: 20000,
  });
  if (writeTraj) {
    fs.writeFileSync(path.join(DATA_DIR, `${stem}.trajectory.jsonl`), lines.join('\n') + '\n');
    fs.writeFileSync(path.join(DATA_DIR, `${stem}.summary.json`), JSON.stringify(res, null, 1) + '\n');
  }
  log(`  run ${stem}: ${res.termination.reason}${res.termination.event ? ' ' + res.termination.event : ''} at t=${res.tFinal.toPrecision(10)} (${(res.tFinal / (2 * Math.PI / Om)).toFixed(4)} periods), steps=${res.steps}, nfev=${res.nfev}, wall=${((Date.now() - t0) / 1000).toFixed(1)}s, events=${res.events.length}`);
  return { res, samples };
}

function firstEvent(res) {
  if (!res.events.length) return null;
  const e = res.events.slice().sort((a, b) => a.t - b.t)[0];
  return { name: e.name, kind: e.kind, t: e.t, pair: e.pair, r: e.r, member: e.member, direction: e.direction, det: e.det, cond: e.cond, stop: e.stop };
}
function sepHistory(samples) {
  const names = ['0-1', '0-2', '0-3', '1-2', '1-3', '2-3'], out = {};
  names.forEach((nm, k) => { let mn = Infinity, tm = 0, mx = 0; for (const s of samples) { if (s.seps[k] < mn) { mn = s.seps[k]; tm = s.t; } if (s.seps[k] > mx) mx = s.seps[k]; } out[nm] = { min: mn, tMin: tm, max: mx, final: samples[samples.length - 1].seps[k] }; });
  return out;
}
const maxAbs = arr => arr.reduce((m, z) => Math.max(m, Math.abs(z)), 0);

// window selection for fits
function windowBy(samples, key, limit, tMax) {
  const out = [];
  for (const s of samples) { const v = Math.abs(typeof key === 'function' ? key(s) : s.sec[key]); if (s.t > tMax || v > limit) break; out.push(s); }
  return out;
}

// ---------------------------------------------------------------- phases
const resultsFresh = {
  title: 'Weber-overnight four-member alternating ring: preregistered instrument runs (machine record)',
  status: 'preregistered; no run made yet',
  dateUTC: new Date().toISOString(),
  worker: 'henri-poincare lens (subject lane), weber-overnight ring instrument runs',
  readableAccount: 'reference/priorities/master-equation-closure/braid-program/analysis/weber-overnight-ring.md, section "Measured perturbations (subject instrument, 2026-10-05)"',
  runner: 'reference/priorities/master-equation-closure/braid-program/evidence/weber-overnight-ring-runner.mjs',
  instrument: { path: path.relative(REPO_ROOT, INSTRUMENT), sha256: crypto.createHash('sha256').update(fs.readFileSync(INSTRUMENT)).digest('hex'), node: process.version, modified: false },
  law: 'equation-variants/manuscript.md Section 9; lambda_W=-1/2, mu_W=1, K=c_f=1; instantaneous support; unit integration weights; no clamp, delay or softening',
  grade: 'measured by the subject instrument (double-precision GBS with event location); not an enclosure. Same-lane caveat: the predictions compared against come from the ring derivation written in this lane; the instrument and the derivation share no code, but the blind independent check is a separate lane.',
  trajectories: '.local-data/master-equation-closure/weber-overnight/ring/<stem>.trajectory.jsonl and <stem>.summary.json',
  preregistration: {
    frozenBefore: 'any run of this runner',
    geometry: 'centre at rest; ring in the xy plane; member j at rho (cos(j pi/2), sin(j pi/2), 0); polarity q_j = (-1)^j, member 0 (index 0, the file\'s member 1) at (rho,0,0) with +; counterclockwise rotation at Omega = sqrt((2 sqrt2 - 1)/(4 rho^3)); member speed Omega rho, set exactly to 1 at x_* when it rounds to 1 within 8e-16',
    integrator: { method: 'gbs', rtol: 1e-12, atol: 1e-14, hmax: 'period/50', refinement: { rtol: 1e-10, atol: 1e-14 } },
    events: { contact: 1e-6, escape: 1e3, obstruction: 'abs(det) < 1e-8 or pivot < 1e-10 or condition > 1e10', speed: 'recorded, not stopping', turning: 'not recorded (ring separations are stationary to round-off on the balanced state and would generate round-off turning points at every step); separation extremes are taken from the recorded states instead', condition: 'exact 1-norm' },
    speedRecordingException: 'WR-0 at x_* has every member exactly at c_f; a round-off crossing would be reported at every step, so speed recording is off for that one case and the member speed range is reported from the states instead',
    cases: {
      'WR-0': { radii: [1.7, 0.8, XSTAR, 0.3], perturbation: 'none', duration: '20 rotation periods', record: 'survival, radius drift, invariant drift, smallest |det M|, member speed and label' },
      'WR-1..WR-7': { radii: [1.7, 0.8], amplitudes: [1e-6, 1e-3], durations: 'eps=1e-6: 3 rotation periods or first stopping event (fit window only); eps=1e-3: first stopping event or 20 periods; every run also stops at 40000 accepted steps, recorded as max-steps (a cost stop, not an event)', note: 'relative to rho; position displacement only (no velocity added), so each run excites a mixture within its sector and the fit uses the full sector model; WR-4b adds a velocity eps*rho*Omega*(1,0,0) to every member instead', vectors: Object.fromEntries(WR_ORDER.map(([id, nm]) => [id, { name: nm, delta: PERT[nm].d, dv: PERT[nm].dv ?? null, sector: PERT[nm].sector, expected: PERT[nm].kind }])), duration: 'first stopping event or 20 periods', fit: 'variable-projection least squares of the sector amplitude on the early window (amplitude below 100 eps rho and t below 3 periods), nonlinear parameters found by grid search then Nelder-Mead; k=1 sublattice uses |S|^2 = P e^{2 gamma t} + Q + R e^{-2 gamma t}; k=2 uses four roots +-sqrt(s_1), +-sqrt(s_2); oscillatory sectors use offset + cos/sin', rateTargetTolerance: 1e-6, events: 'first event (kind, members, time), minimum pair separation history, pairing diagnosis on the final window' },
      'WR-8': { radius: 1.7, perturbation: 'breathing (radial) displacement 1e-2 rho, no velocity change', duration: '20 periods or first event', record: 'reduced breathing energy E_red of ring Section 6 (6.3) drift; turning points of rho against the roots of (6.3); first time any symmetry-breaking sector amplitude exceeds 1e-8 rho' },
    },
    pairingRule: 'on the final window (last 10% of states, at least 20): the matching with the smallest sum of pair separations must be the same at every state, both pairs opposite polarity, max pair separation <= 0.25 of the minimum pair-centre distance, and the pair-centre distance larger at the end of the window than at its start',
    predictions: { 1.7: predictions(1.7), 0.8: predictions(0.8), [XSTAR]: predictions(XSTAR), 0.3: predictions(0.3) },
  },
  knownCases: [],
  'WR-0': [],
  rates: [],
  events1e3: [],
  'WR-8': null,
  anomalies: [],
};
let results = resultsFresh;
if (fs.existsSync(RESULTS)) {
  const prev = JSON.parse(fs.readFileSync(RESULTS, 'utf8'));
  if (prev.instrument?.sha256 === resultsFresh.instrument.sha256 && prev.preregistration) { results = prev; results.resumedUTC = (results.resumedUTC ?? []).concat(new Date().toISOString()); }
}
const save = () => fs.writeFileSync(RESULTS, JSON.stringify(results, null, 2) + '\n');
save();
log(`[${new Date().toISOString()}] preregistration written to ${path.relative(REPO_ROOT, RESULTS)}`);

// ---------------------------------------------------------------- known cases (recorded before any target)
function knownCases() {
  const K = [];
  // K1: balanced ring residual with the instrument's own right-hand side
  for (const rho of [1.7, 0.8, XSTAR, 0.3]) {
    const m = ringMembers(rho), P = makeParams({ q: QS, ...COEFF }), y = packState(m), Om = ringOmega(rho);
    const { A, det } = solveAccelerations(y, P);
    let resid = 0, tang = 0;
    for (let j = 0; j < 4; j++) { for (let a = 0; a < 3; a++) resid = Math.max(resid, Math.abs(A[3 * j + a] + Om * Om * m[j].x[a])); tang = Math.max(tang, Math.abs(d3([A[3 * j], A[3 * j + 1], A[3 * j + 2]], THAT[j]))); }
    const detForm = predictions(rho).detM;
    K.push({ id: `K1-balance-x${rho}`, reference: 'solved accelerations must equal -Omega^2 X with Omega^2 = (2 sqrt2 - 1)K/(4 rho^3) (ring file eq. 4.3); det M against closed form (3.3)', tol: { residual: 1e-13, tangential: 1e-14, detRelative: 1e-13 }, measured: { residual: resid, tangential: tang, det, detClosedForm: detForm, detRelDiff: Math.abs(det - detForm) / Math.abs(detForm) }, pass: resid <= 1e-13 && tang <= 1e-14 && Math.abs(det - detForm) <= 1e-13 * Math.abs(detForm) });
  }
  // K1b: wrong-rate control must fail
  { const rho = 1.7, m = ringMembers(rho); m.forEach(mem => { mem.v = mem.v.map(z => 1.1 * z); }); const P = makeParams({ q: QS, ...COEFF }); const { A } = solveAccelerations(packState(m), P); const Om = ringOmega(rho); let resid = 0; for (let j = 0; j < 4; j++) for (let a = 0; a < 3; a++) resid = Math.max(resid, Math.abs(A[3 * j + a] + Om * Om * m[j].x[a])); K.push({ id: 'K1b-wrong-rate-control', reference: 'with speeds scaled by 1.1 the residual against -Omega^2 X must be of order 1e-1 to 1e-2, not small', measured: { residual: resid }, pass: resid > 1e-3 }); }
  // K2: fitter recovers known exponents
  {
    const t = Array.from({ length: 90 }, (_, k) => 0.05 * k), s1 = 0.37, s2 = -2.1;
    const y = t.map(tt => 0.3 * Cf(s1, tt) + 0.1 * Sf(s1, tt) - 0.2 * Cf(s2, tt) + 0.05 * Sf(s2, tt));
    const fit = fitModel(t, y, 2, {}, [-9, 9]);
    const got = fit.s.slice().sort((a, b) => a - b), err = Math.max(Math.abs(got[0] - s2) / Math.abs(s2), Math.abs(got[1] - s1) / s1);
    K.push({ id: 'K2a-fitter-two-root', reference: 'synthetic a(t) = 0.3 C(0.37,t) + 0.1 S(0.37,t) - 0.2 C(-2.1,t) + 0.05 S(-2.1,t), 90 samples on [0,4.45]', tol: 1e-9, measured: { s: got, relErr: err, relRms: fit.relRms }, pass: err <= 1e-9 });
    const g = 0.3423, y2 = t.map(tt => 0.7 * Math.exp(2 * g * tt) + 0.4 + 0.25 * Math.exp(-2 * g * tt));
    const fit2 = fitModel(t, y2, 1, { offset: true }, [0, 9]);
    const gErr = Math.abs(Math.sqrt(fit2.s[0]) / 2 - g) / g;
    K.push({ id: 'K2b-fitter-k1-modulus', reference: 'synthetic |S|^2 = 0.7 e^{2 g t} + 0.4 + 0.25 e^{-2 g t}, g = 0.3423', tol: 1e-9, measured: { gamma: Math.sqrt(fit2.s[0]) / 2, relErr: gErr }, pass: gErr <= 1e-9 });
    const w = 0.2719, y3 = t.map(tt => 1.5 + 0.8 * Math.cos(w * tt) - 0.3 * Math.sin(w * tt));
    const fit3 = fitModel(t, y3, 1, { offset: true }, [-9, 0]);
    const wErr = Math.abs(Math.sqrt(-fit3.s[0]) - w) / w;
    K.push({ id: 'K2c-fitter-offset-oscillation', reference: 'synthetic 1.5 + 0.8 cos(w t) - 0.3 sin(w t), w = 0.2719', tol: 1e-9, measured: { omega: Math.sqrt(-fit3.s[0]), relErr: wErr }, pass: wErr <= 1e-9 });
  }
  // K3: pairing diagnosis on synthetic configurations
  {
    const mk = (t) => { const D = 1 + t; const x = [D / 2 + 0.05, 0, 0, D / 2 - 0.05, 0, 0, -D / 2 + 0.05 * Math.cos(t), 0.05 * Math.sin(t), 0, -D / 2 - 0.05 * Math.cos(t), -0.05 * Math.sin(t), 0]; return { t, x }; };
    const sA = Array.from({ length: 200 }, (_, k) => mk(0.05 * k));
    const dA = pairingDiagnosis(sA, QS); // pairs (0,1) and (2,3), both opposite polarity, separating
    const sB = Array.from({ length: 200 }, (_, k) => { const T = 0.05 * k, Om = ringOmega(1.7), F = frames(T, Om); return { t: T, x: F.flatMap(f => f.ring.map(z => 1.7 * z)) }; });
    const dB = pairingDiagnosis(sB, QS);
    K.push({ id: 'K3-pairing-diagnosis', reference: 'two opposite-polarity binaries (0,1),(2,3) of separation 0.1 whose centres recede as 1+t must be labelled separating binaries; the exact ring must be not-paired', measured: { synthetic: dA.label, ring: dB.label, matching: dA.matching }, pass: dA.label === 'two-opposite-polarity-binaries-separating' && dB.label === 'not-paired' && dA.matching[0][1] === 1 });
  }
  // K4: sector projections of the perturbation vectors land in their sectors with unit amplitude
  {
    const rho = 1.7, Om = ringOmega(rho), eps = 1e-3, checks = {};
    let pass = true;
    for (const [id, nm] of WR_ORDER) {
      if (nm === 'boost') continue;
      const m = perturbed(rho, nm, eps), x = m.flatMap(mm => mm.x), sec = sectors(0, x, rho, Om);
      const projKey = PERT[nm].proj ?? PERT[nm].sector;
      const amp = sec[projKey] / (eps * rho), expect = nm === 'tilt' ? 0.5 : 1;
      const others = ['breathing', 'rotation', 'axial', 'elliptic', 'shear', 'warp', 'sublatticeAbs', 'translationAbs', 'tiltAbs'].filter(k => k !== projKey).map(k => Math.abs(sec[k]) / (eps * rho));
      const leak = Math.max(...others);
      checks[id] = { name: nm, amplitudeOverEps: amp, expected: expect, leakage: leak };
      if (Math.abs(amp - expect) > 1e-12 || leak > 1e-12) pass = false;
    }
    K.push({ id: 'K4-sector-projection', reference: 'each Section 9 vector projects onto its own sector with amplitude 1 (tilt: 1/2, complex k=1 normalization) and zero elsewhere', tol: 1e-12, measured: checks, pass });
  }
  // K5: reduced breathing energy (6.3) equals the instrument's monitored H on a symmetric breathing state
  {
    const rho = 1.7, rdot = 0.07, phidot = 0.9 * ringOmega(rho);
    const m = RHAT.map((r, j) => ({ x: r.map(z => z * rho), v: r.map((z, a) => rdot * z + rho * phidot * THAT[j][a]), q: QS[j] }));
    const P = makeParams({ q: QS, ...COEFF }), H = candidates.weber(packState(m), P);
    const Ered = eRed(rho, rdot, 4 * rho * rho * phidot);
    K.push({ id: 'K5-reduced-energy-identity', reference: 'E_red of (6.3) with l = 4 rho^2 phidot equals the energy function (6.1) on a symmetric state; (6.1) is the instrument\'s weber candidate', tol: 1e-14, measured: { H, Ered, diff: Math.abs(H - Ered) }, pass: Math.abs(H - Ered) <= 1e-14 * Math.max(1, Math.abs(H)) });
  }
  results.knownCases = K;
  const all = K.every(k => k.pass);
  results.status = all ? 'known cases passed and recorded; targets pending' : 'KNOWN CASE FAILURE; targets not run';
  save();
  for (const k of K) log(`  known ${k.id}: ${k.pass ? 'PASS' : 'FAIL'} ${JSON.stringify(k.measured).slice(0, 160)}`);
  return all;
}
function eRed(rho, rdot, ell) { const ma = 1 + (S2 - 1) / rho; return 2 * ma * rdot * rdot + ell * ell / (8 * rho * rho) - CW / rho; }

// ---------------------------------------------------------------- targets
function wr0() {
  for (const rho of [1.7, 0.8, XSTAR, 0.3]) {
    if (results['WR-0'].some(w => w.radius === rho)) continue;
    if (outOfBudget()) return false;
    const pred = predictions(rho), out = { radius: rho, label: rho === XSTAR ? 'x_* (equality ring, inclusive label)' : rho < XSTAR ? 'superfield (unrestricted label)' : 'subfield', predicted: { Omega: pred.Omega, period: pred.period, speed: pred.speed, detM: pred.detM } };
    for (const tolName of ['prereg', 'refine']) {
      const ev = rho === XSTAR ? { speed: { record: false, stop: false } } : {};
      const spec = makeSpec(`WR-0 x=${rho} ${tolName}`, ringMembers(rho), rho, TOL[tolName], { events: ev });
      const { res, samples } = run(`WR-0-x${rho.toFixed(5)}-${tolName}`, spec, rho);
      const radDrift = Math.max(...samples.map(s => Math.max(...s.radii.map(r => Math.abs(r - rho) / rho))));
      const sepDrift = Math.max(...samples.map(s => Math.max(Math.abs(s.seps[0] - S2 * rho), Math.abs(s.seps[1] - 2 * rho), Math.abs(s.seps[2] - S2 * rho), Math.abs(s.seps[3] - S2 * rho), Math.abs(s.seps[4] - 2 * rho), Math.abs(s.seps[5] - S2 * rho)) / rho));
      const symBreak = samples.map(s => ({ t: s.t, v: Math.max(Math.abs(s.sec.elliptic), Math.abs(s.sec.shear), s.sec.sublatticeAbs, Math.abs(s.sec.warp), s.sec.tiltAbs) / rho }));
      const first1e8 = symBreak.find(z => z.v > 1e-8), first1e3 = symBreak.find(z => z.v > 1e-3);
      // round-off seeded growth rate: fit ln of the symmetry-breaking amplitude where it is between 1e-12 and 1e-5
      let seededRate = null; { const w = symBreak.filter(z => z.v > 1e-12 && z.v < 1e-5); if (w.length > 10) { const tt = w.map(z => z.t), yy = w.map(z => Math.log(z.v)); const n = tt.length, mt = tt.reduce((a, b) => a + b) / n, my = yy.reduce((a, b) => a + b) / n; let sxx = 0, sxy = 0; for (let k = 0; k < n; k++) { sxx += (tt[k] - mt) ** 2; sxy += (tt[k] - mt) * (yy[k] - my); } seededRate = { rate: sxy / sxx, window: [tt[0], tt[n - 1]], samples: n }; } }
      const speeds = samples.map(s => Math.max(...s.speeds)), speedMin = Math.min(...samples.map(s => Math.min(...s.speeds)));
      out[tolName] = {
        termination: res.termination, tFinal: res.tFinal, periodsSurvived: res.tFinal / pred.period, steps: res.steps, nfev: res.nfev, wallSeconds: res.wallSeconds,
        radiusDriftMaxRel: radDrift, separationDriftMaxRel: sepDrift,
        invariantDrift: { HRelMax: res.diagnostics.maxRelDriftCandidate, sumV: res.diagnostics.maxAbsDeltaSumV, sumXxV: res.diagnostics.maxAbsDeltaSumXxV, centre: res.diagnostics.maxAbsCentreDeviationFromLinear },
        detM: { initial: samples[0].det, minAbs: res.diagnostics.minAbsDet, closedForm: pred.detM }, maxCond: res.diagnostics.maxCond,
        memberSpeed: { initial: samples[0].speeds[0], max: Math.max(...speeds), min: speedMin, predicted: pred.speed }, initialAtSpeedBoundary: res.initialAtSpeedBoundary,
        symmetryBreaking: { firstAbove1em8: first1e8 ?? null, firstAbove1em3: first1e3 ?? null, final: symBreak[symBreak.length - 1], roundOffSeededGrowth: seededRate, predictedFastestGrowth: Math.max(pred.sublattice.growth, ...pred.ellipticShear.growth) },
        firstEvent: firstEvent(res), eventCount: res.events.length, speedCrossings: res.events.filter(e => e.kind === 'speed').length,
        pairing: pairingDiagnosis(samples, QS), separations: sepHistory(samples),
      };
    }
    results['WR-0'].push(out); save();
  }
  return true;
}

function fitRun(nm, rho, samples, pred) {
  const p = PERT[nm], Om = ringOmega(rho), P = 2 * Math.PI / Om, eps = 1e-6 * rho;
  const out = { sector: p.sector, model: p.model };
  if (p.model === 'k1') {
    for (const lim of [10, 100]) {
      const w = windowBy(samples, 'sublatticeAbs', lim * eps, 20 * P);
      const t = w.map(s => s.t), y = w.map(s => s.sec.sublatticeAbs ** 2 / eps ** 2);
      const fit = fitModel(t, y, 1, { offset: true }, [0, (6 * Om) ** 2]);
      const gamma = Math.sqrt(Math.max(0, fit.s[0])) / 2;
      const late = w.slice(Math.floor(w.length / 2));
      const phi = phaseSlope(late.map(s => s.t), late.map(s => s.sec.sublattice.re), late.map(s => s.sec.sublattice.im));
      out[`window${lim}eps`] = { tWindow: fit.tWindow, samples: fit.n, relRms: fit.relRms, growth: gamma, predictedGrowth: pred.sublattice.growth, relDiff: (gamma - pred.sublattice.growth) / pred.sublattice.growth, phaseRate: phi, predictedPhaseRateAbs: pred.sublattice.phaseRate, phaseRelDiff: (Math.abs(phi) - pred.sublattice.phaseRate) / pred.sublattice.phaseRate };
    }
  } else if (p.model === 'k2') {
    for (const lim of [10, 100]) {
      const w = windowBy(samples, s => Math.hypot(s.sec.elliptic, s.sec.shear), lim * eps, 20 * P);
      const t = w.map(s => s.t), y = w.map(s => s.sec[p.sector] / eps);
      const fit = fitModel(t, y, 2, {}, [-((6 * Om) ** 2), (6 * Om) ** 2]);
      const rates = fit.s.map(rateOf);
      const g = rates.filter(r => r.type === 'growth').map(r => r.value).sort((a, b) => b - a), o = rates.filter(r => r.type === 'oscillation').map(r => r.value);
      const pg = pred.ellipticShear.growth.slice().sort((a, b) => b - a), po = pred.ellipticShear.oscillation;
      out[`window${lim}eps`] = { tWindow: fit.tWindow, samples: fit.n, relRms: fit.relRms, sFitted: fit.s, sPredicted: pred.ellipticShear.sRoots, growth: g, predictedGrowth: pg, growthRelDiff: g.map((v, k) => pg[k] != null ? (v - pg[k]) / pg[k] : null), oscillation: o, predictedOscillation: po, oscillationRelDiff: o.map((v, k) => po[k] != null ? (v - po[k]) / po[k] : null) };
    }
  } else if (p.model === 'offset+osc' || p.model === 'osc') {
    const key = p.sector, predW = pred[nm === 'rotationPhase' ? 'rotationPhaseCoupling' : nm];
    const w = windowBy(samples, s => Math.max(Math.abs(s.sec.elliptic), Math.abs(s.sec.shear), s.sec.sublatticeAbs), 1e-3 * eps, 3 * P);
    const t = w.map(s => s.t), y = w.map(s => s.sec[key] / eps);
    const fit = fitModel(t, y, 1, { offset: true, drift: nm === 'rotationPhase' }, [-((6 * Om) ** 2), 0]);
    const om = Math.sqrt(-fit.s[0]);
    out.fit = { tWindow: fit.tWindow, samples: fit.n, relRms: fit.relRms, oscillation: om, predicted: predW, relDiff: (om - predW) / predW, coef: fit.coef, note: 'window ends when round-off-seeded unstable sectors reach 1e-3 of the applied amplitude or at 3 periods' };
    if (nm === 'rotationPhase') { const y2 = w.map(s => s.sec.rotation / eps); const fit2 = fitModel(t, y2, 1, { offset: true, drift: true }, [-((6 * Om) ** 2), 0]); out.rotationComponent = { oscillation: Math.sqrt(-fit2.s[0]), drift: fit2.coef[1], offset: fit2.coef[0], relRms: fit2.relRms }; }
  } else if (p.model === 'osc-complex') {
    const w = windowBy(samples, s => Math.max(Math.abs(s.sec.elliptic), Math.abs(s.sec.shear), s.sec.sublatticeAbs), 1e-3 * eps, 3 * P);
    const t = w.map(s => s.t), y = w.map(s => s.sec.tilt.re / eps);
    const fit = fitModel(t, y, 1, { offset: true }, [-((6 * Om) ** 2), 0]);
    const om = Math.sqrt(-fit.s[0]);
    out.fit = { tWindow: fit.tWindow, samples: fit.n, relRms: fit.relRms, oscillation: om, predicted: pred.tilt, relDiff: (om - pred.tilt) / pred.tilt, tiltAbsRange: [Math.min(...w.map(s => s.sec.tiltAbs / eps)), Math.max(...w.map(s => s.sec.tiltAbs / eps))] };
  } else if (p.model === 'phase') {
    const w = windowBy(samples, s => Math.max(Math.abs(s.sec.elliptic), Math.abs(s.sec.shear), s.sec.sublatticeAbs), 1e-3 * eps, 3 * P);
    const t = w.map(s => s.t), phi = phaseSlope(t, w.map(s => s.sec.translation.re), w.map(s => s.sec.translation.im));
    const absR = w.map(s => s.sec.translationAbs / eps);
    const cen = w.map(s => { const c = [0, 1, 2].map(a => (s.x[a] + s.x[3 + a] + s.x[6 + a] + s.x[9 + a]) / 4); return Math.hypot(c[0] - eps, c[1], c[2]) / eps; });
    out.fit = { tWindow: [t[0], t[t.length - 1]], samples: t.length, phaseRate: phi, predicted: pred.translation, relDiff: (phi - pred.translation) / pred.translation, modulusRange: [Math.min(...absR), Math.max(...absR)], centreDeviationMaxRel: Math.max(...cen) };
  } else if (p.model === 'linear') {
    const w = windowBy(samples, s => Math.max(Math.abs(s.sec.elliptic), Math.abs(s.sec.shear), s.sec.sublatticeAbs), 1e-3 * eps, 3 * P);
    const t = w.map(s => s.t), y = w.map(s => s.sec.translationAbs);
    const n = t.length, mt = t.reduce((a, b) => a + b) / n, my = y.reduce((a, b) => a + b) / n; let sxx = 0, sxy = 0; for (let k = 0; k < n; k++) { sxx += (t[k] - mt) ** 2; sxy += (t[k] - mt) * (y[k] - my); }
    const slope = sxy / sxx, expected = eps * Om;
    const resid = Math.max(...y.map((v, k) => Math.abs(v - slope * t[k])));
    out.fit = { tWindow: [t[0], t[n - 1]], samples: n, modulusSlope: slope, expectedSlope: expected, relDiff: (slope - expected) / expected, maxDeviationFromLinearOverEps: resid / eps, phaseRate: phaseSlope(t.slice(5), w.slice(5).map(s => s.sec.translation.re), w.slice(5).map(s => s.sec.translation.im)), predictedPhaseRate: pred.translation };
  }
  return out;
}

function targets1e6() {
  for (const rho of [1.7, 0.8]) for (const [id, nm] of WR_ORDER) {
    if (results.rates.some(w => w.id === id && w.radius === rho)) continue;
    if (outOfBudget()) return false;
    const pred = predictions(rho), entry = { id, name: nm, radius: rho, amplitude: 1e-6 };
    for (const tolName of ['prereg', 'refine']) {
      const spec = makeSpec(`${id} ${nm} x=${rho} eps=1e-6 ${tolName}`, perturbed(rho, nm, 1e-6), rho, TOL[tolName], { tEnd: RATE_PERIODS * pred.period });
      const { res, samples } = run(`${id}-${nm}-x${rho}-eps1e-6-${tolName}`, spec, rho, tolName === 'prereg');
      entry[tolName] = { termination: res.termination, tFinal: res.tFinal, periods: res.tFinal / pred.period, HRelDrift: res.diagnostics.maxRelDriftCandidate, minAbsDet: res.diagnostics.minAbsDet, firstEvent: firstEvent(res), fit: fitRun(nm, rho, samples, pred) };
    }
    results.rates.push(entry); save();
    log(`  rates ${id} ${nm} x=${rho}: ${JSON.stringify(entry.prereg.fit).slice(0, 400)}`);
  }
  return true;
}

function targets1e3() {
  for (const rho of [1.7, 0.8]) for (const [id, nm] of WR_ORDER) {
    const existing = results.events1e3.find(w => w.id === id && w.radius === rho);
    if (existing && existing.refinementComparison) continue;
    if (outOfBudget()) return false;
    const pred = predictions(rho), entry = existing ?? { id, name: nm, radius: rho, amplitude: 1e-3 };
    if (!existing) results.events1e3.push(entry);
    for (const tolName of ['prereg', 'refine']) {
      if (entry[tolName]) continue;
      const spec = makeSpec(`${id} ${nm} x=${rho} eps=1e-3 ${tolName}`, perturbed(rho, nm, 1e-3), rho, TOL[tolName]);
      const { res, samples } = run(`${id}-${nm}-x${rho}-eps1e-3-${tolName}`, spec, rho, tolName === 'prereg');
      const speedsMax = Math.max(...samples.map(s => Math.max(...s.speeds)));
      const fin = samples[samples.length - 1];
      entry[tolName] = {
        termination: res.termination, tFinal: res.tFinal, periods: res.tFinal / pred.period, steps: res.steps, nfev: res.nfev,
        firstEvent: firstEvent(res), stopEvent: res.termination.event ?? null, eventCount: res.events.length, speedCrossings: res.events.filter(e => e.kind === 'speed').map(e => ({ t: e.t, member: e.member, direction: e.direction })).slice(0, 8),
        invariantDrift: { HRelMax: res.diagnostics.maxRelDriftCandidate, sumV: res.diagnostics.maxAbsDeltaSumV, sumXxV: res.diagnostics.maxAbsDeltaSumXxV },
        detM: { minAbs: res.diagnostics.minAbsDet, atEnd: fin.det, maxCond: res.diagnostics.maxCond }, maxMemberSpeed: speedsMax,
        separations: sepHistory(samples), finalSeparations: fin.seps, finalSpeeds: fin.speeds, pairing: pairingDiagnosis(samples, QS),
        symmetryBreakingFinal: { elliptic: fin.sec.elliptic / rho, shear: fin.sec.shear / rho, sublattice: fin.sec.sublatticeAbs / rho, warp: fin.sec.warp / rho, tilt: fin.sec.tiltAbs / rho },
      };
      save();
    }
    const a = entry.prereg, b = entry.refine;
    entry.refinementComparison = { tFinalDiff: Math.abs(a.tFinal - b.tFinal), sameTermination: a.termination.reason === b.termination.reason && (a.termination.event ?? null) === (b.termination.event ?? null), firstEventTimeDiff: a.firstEvent && b.firstEvent ? Math.abs(a.firstEvent.t - b.firstEvent.t) : null, samePairingLabel: a.pairing.label === b.pairing.label };
    save();
    log(`  events ${id} ${nm} x=${rho}: first=${JSON.stringify(a.firstEvent)} stop=${a.stopEvent} pairing=${a.pairing.label}`);
  }
  return true;
}

function wr8() {
  if (results['WR-8']) return true;
  if (outOfBudget()) return false;
  const rho = 1.7, pred = predictions(rho), Om = ringOmega(rho), out = { radius: rho, amplitude: 1e-2 };
  for (const tolName of ['prereg', 'refine']) {
    const spec = makeSpec(`WR-8 breathing x=1.7 eps=1e-2 ${tolName}`, perturbed(rho, 'breathing', 1e-2), rho, TOL[tolName]);
    const { res, samples } = run(`WR-8-breathing-x1.7-eps1e-2-${tolName}`, spec, rho, tolName === 'prereg');
    const ered = samples.map(s => {
      const r = s.radii.reduce((a, b) => a + b) / 4;
      let rd = 0, ell = 0; for (let j = 0; j < 4; j++) { const X = [s.x[3 * j], s.x[3 * j + 1], s.x[3 * j + 2]], V = [s.v[3 * j], s.v[3 * j + 1], s.v[3 * j + 2]]; rd += d3(X, V) / s.radii[j] / 4; ell += X[0] * V[1] - X[1] * V[0]; }
      return { t: s.t, rho: r, rdot: rd, ell, E: eRed(r, rd, ell), H: s.H, radiusSpread: Math.max(...s.radii) - Math.min(...s.radii) };
    });
    const E0 = ered[0].E, ell0 = ered[0].ell;
    // turning points predicted by (6.3): roots of (ell^2/8) u^2 - CW u - E0 = 0, u = 1/rho
    const A = ell0 * ell0 / 8, B = -CW, C = -E0, disc = B * B - 4 * A * C;
    const u = [(-B + Math.sqrt(disc)) / (2 * A), (-B - Math.sqrt(disc)) / (2 * A)], turning = u.map(z => 1 / z).sort((a, b) => a - b);
    const symBreak = samples.map(s => ({ t: s.t, v: Math.max(Math.abs(s.sec.elliptic), Math.abs(s.sec.shear), s.sec.sublatticeAbs, Math.abs(s.sec.warp), s.sec.tiltAbs) / rho }));
    const first1e8 = symBreak.find(z => z.v > 1e-8), first1e3 = symBreak.find(z => z.v > 1e-3);
    // measure E_red drift and rho extremes only while symmetric (before 1e-8)
    const tSym = first1e8 ? first1e8.t : Infinity, symSamples = ered.filter(e => e.t < tSym);
    const EdriftSym = Math.max(...symSamples.map(e => Math.abs(e.E - E0))) / Math.abs(E0), EdriftAll = Math.max(...ered.map(e => Math.abs(e.E - E0))) / Math.abs(E0);
    const ellDriftSym = Math.max(...symSamples.map(e => Math.abs(e.ell - ell0))) / Math.abs(ell0);
    const rhoMin = Math.min(...symSamples.map(e => e.rho)), rhoMax = Math.max(...symSamples.map(e => e.rho));
    // breathing frequency from the symmetric window: fit rho(t) with offset + oscillation (finite amplitude, so a small shift from (5.2) is expected)
    const t = symSamples.map(e => e.t), y = symSamples.map(e => e.rho - rho);
    const fit = fitModel(t.slice(0, Math.min(t.length, 400)), y.slice(0, Math.min(t.length, 400)), 1, { offset: true }, [-((6 * Om) ** 2), 0]);
    out[tolName] = {
      termination: res.termination, tFinal: res.tFinal, periods: res.tFinal / pred.period, firstEvent: firstEvent(res),
      E_red: { initial: E0, maxRelDriftWhileSymmetric: EdriftSym, maxRelDriftWholeRun: EdriftAll, HRelDriftInstrument: res.diagnostics.maxRelDriftCandidate, E_red_minus_H_max: Math.max(...ered.map(e => Math.abs(e.E - e.H))) },
      ell: { initial: ell0, maxRelDriftWhileSymmetric: ellDriftSym },
      turningPoints: { predictedFrom63: turning, measuredRhoRange: [rhoMin, rhoMax], relDiff: [(rhoMin - turning[0]) / turning[0], (rhoMax - turning[1]) / turning[1]] },
      breathingFrequency: { fitted: Math.sqrt(-fit.s[0]), linearPrediction: pred.breathing, relDiff: (Math.sqrt(-fit.s[0]) - pred.breathing) / pred.breathing, relRms: fit.relRms, window: fit.tWindow },
      symmetrySector: { firstAbove1em8: first1e8 ?? null, firstAbove1em3: first1e3 ?? null, radiusSpreadMaxWhileSymmetric: Math.max(...symSamples.map(e => e.radiusSpread)), final: symBreak[symBreak.length - 1] },
      pairing: pairingDiagnosis(samples, QS), separations: sepHistory(samples),
    };
  }
  results['WR-8'] = out; save();
  log(`  WR-8: ${JSON.stringify(out.prereg.E_red)} turning ${JSON.stringify(out.prereg.turningPoints)} sym ${JSON.stringify(out.prereg.symmetrySector)}`);
  return true;
}

// ---------------------------------------------------------------- main
const mode = process.argv[2] ?? 'all';
const ok = knownCases();
if (!ok) { log('known-case failure: stopping before targets'); process.exit(1); }
if (mode === 'known') process.exit(0);
const T0 = Date.now();
let complete = true;
for (const [nm, fn] of [['WR-0', wr0], ['rates (eps=1e-6)', targets1e6], ['events (eps=1e-3)', targets1e3], ['WR-8', wr8]]) {
  log(`[${new Date().toISOString()}] phase ${nm}`);
  const done = fn();
  if (!done) { complete = false; results.status = `paused for budget during ${nm} at ${new Date().toISOString()}; rerun to resume`; save(); log(results.status); break; }
  results.status = `running: completed ${nm} at ${new Date().toISOString()}`; save();
}
if (complete) {
  results.status = 'complete: preregistration, known cases, WR-0, rates, events, WR-8 all recorded';
  results.wallSecondsThisInvocation = (Date.now() - T0) / 1000;
  results.completedUTC = new Date().toISOString();
  save();
  log(`[${new Date().toISOString()}] done`);
}
