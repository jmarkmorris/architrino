// weber-frequency-reference-pair.mjs
// Reference lane, Part 1: binary circle frequency relations under the frozen
// instantaneous Weber-inspired law (K = c_f = 1, lambda = -1/2, mu = 1).
// Known cases K1, K5, K6 are run and reported before any grid value.
// Usage: node weber-frequency-reference-pair.mjs [--out <json path>]
import { writeFileSync } from 'node:fs';
import { DEFAULT_LAW, solveAccelerations, lawResidual, integrate, unflatten, sig15 } from './weber-frequency-reference-law.mjs';

const K = 1, c = 1;
const argv = process.argv.slice(2);
const outIdx = argv.indexOf('--out');
const outPath = outIdx >= 0 ? argv[outIdx + 1] : null;
const log = (...a) => console.log(...a);
const startedAt = new Date().toISOString();

// ---------- closed forms derived in the reference document ----------
// Circle: h^2 = 2 K d, Omega^2 = 2K/d^3 = K/(4 rho^3).
const rhoOfOmega = (Om) => Math.cbrt(K / (4 * Om * Om));
const dOfOmega = (Om) => 2 * rhoOfOmega(Om);
const vOfOmega = (Om) => Om * rhoOfOmega(Om);
const DeltaOfd = (d) => 1 + 2 * K / (c * c * d);
const omegaROfOmega = (Om) => Om / Math.sqrt(DeltaOfd(dOfOmega(Om)));

function circleState(rho, Om, radialScale = 1) {
  // radialScale != 1 perturbs the separation at fixed relative angular momentum
  // h = d v_rel (velocities scaled by 1/radialScale), so the reference circle of
  // the perturbed history is the unperturbed one and the start is a turning point.
  return {
    X: [[rho * radialScale, 0, 0], [-rho * radialScale, 0, 0]],
    V: [[0, Om * rho / radialScale, 0], [0, -Om * rho / radialScale, 0]],
    q: [1, -1],
  };
}

function balanceResidual(state, Om, law = DEFAULT_LAW) {
  const sol = solveAccelerations(state, law);
  let worst = 0;
  for (let i = 0; i < state.X.length; i++) {
    const r = Math.hypot(
      sol.A[i][0] + Om * Om * state.X[i][0],
      sol.A[i][1] + Om * Om * state.X[i][1],
      sol.A[i][2] + Om * Om * state.X[i][2]);
    if (r > worst) worst = r;
  }
  return { worst, det: sol.det, A: sol.A, lawRes: lawResidual(state, sol.A, law) };
}

const record = { startedAt, law: DEFAULT_LAW, knownCases: {}, gridSolve: [], omegaRMeasured: [], table: [] };

// ---------- K1: opposite-polarity circle at rho in {0.25, 1, 3} ----------
log('K1 opposite-polarity circle');
record.knownCases.K1 = [];
let k1pass = true;
for (const rho of [0.25, 1, 3]) {
  const Om = Math.sqrt(K / (4 * rho ** 3));
  const st = circleState(rho, Om);
  const r = balanceResidual(st, Om);
  const detExpected = 1 + 2 / (2 * rho);
  const tol = 1e-13 * Om * Om * rho;
  const pass = r.worst <= tol && Math.abs(r.det - detExpected) <= 1e-13 * detExpected;
  k1pass = k1pass && pass;
  record.knownCases.K1.push({ rho, Omega: Om, residual: r.worst, tolerance: tol, det: r.det, detExpected, lawResidual: r.lawRes, pass });
  log(`  rho=${rho} Omega=${Om} residual=${r.worst.toExponential(3)} tol=${tol.toExponential(3)} det=${r.det} expected=${detExpected} lawRes=${r.lawRes.toExponential(3)} ${pass ? 'PASS' : 'FAIL'}`);
}
log(`K1 ${k1pass ? 'PASS' : 'FAIL'}`);

// ---------- K5: wrong-law sensitivity ----------
log('K5 wrong-law sensitivity');
{
  const rho = 1, Om = Math.sqrt(K / 4);
  const lawMu0 = { ...DEFAULT_LAW, mu: 0 };
  const r1 = balanceResidual(circleState(rho, Om), Om, lawMu0);
  const pass1 = r1.worst <= 1e-13 && Math.abs(r1.det - 1) <= 1e-13;
  // static pair at d = 2, v = 0, frozen law: |A_i| = 1/(d^2 Delta) with Delta = 1 + 2/d = 2 -> 1/8
  const st = { X: [[1, 0, 0], [-1, 0, 0]], V: [[0, 0, 0], [0, 0, 0]], q: [1, -1] };
  const sol = solveAccelerations(st);
  const mag0 = Math.hypot(...sol.A[0]);
  const mag1 = Math.hypot(...sol.A[1]);
  // A_0 should point toward member 1, i.e. -e_01 = (-1,0,0) direction times 1/8
  const expected0 = [-1 / 8, 0, 0];
  const err = Math.hypot(sol.A[0][0] - expected0[0], sol.A[0][1], sol.A[0][2]);
  const pass2 = err <= 1e-13 && Math.abs(mag1 - 1 / 8) <= 1e-13 && Math.abs(sol.det - 2) <= 1e-13;
  record.knownCases.K5 = {
    mu0Circle: { residual: r1.worst, det: r1.det, pass: pass1 },
    staticPair: { A0: sol.A[0], A1: sol.A[1], mag0, mag1, det: sol.det, expectedMag: 0.125, error: err, pass: pass2 },
    pass: pass1 && pass2,
  };
  log(`  mu=0 circle residual=${r1.worst.toExponential(3)} det=${r1.det} ${pass1 ? 'PASS' : 'FAIL'}`);
  log(`  static pair d=2: |A0|=${mag0} |A1|=${mag1} det=${sol.det} err=${err.toExponential(3)} ${pass2 ? 'PASS' : 'FAIL'}`);
  log(`K5 ${pass1 && pass2 ? 'PASS' : 'FAIL'}`);
}

// ---------- K6: zero-coefficient Kepler ellipse a = 3, e = 0.5 ----------
log('K6 integrator: zero-coefficient Kepler ellipse a=3, e=0.5');
{
  const lawZero = { K: 1, c: 1, lambda: 0, mu: 0 };
  const a = 3, ecc = 0.5;
  const GM = 2 * K; // relative motion: rho'' = -2K rho/d^3
  const P = 2 * Math.PI * Math.sqrt(a ** 3 / GM);
  const dp = a * (1 - ecc);
  const vp = Math.sqrt(GM * (1 + ecc) / (a * (1 - ecc)));
  // centre of velocity at rest: members at +-rho/2
  const st = { X: [[dp / 2, 0, 0], [-dp / 2, 0, 0]], V: [[0, vp / 2, 0], [0, -vp / 2, 0]], q: [1, -1] };
  const nSteps = 40000;
  const n = Math.sqrt(GM / a ** 3);
  function kepler(t) {
    const Mn = n * t;
    let E = Mn;
    for (let k = 0; k < 60; k++) {
      const f = E - ecc * Math.sin(E) - Mn;
      const fp = 1 - ecc * Math.cos(E);
      const dE = f / fp;
      E -= dE;
      if (Math.abs(dE) < 1e-16) break;
    }
    return [a * (Math.cos(E) - ecc), a * Math.sqrt(1 - ecc * ecc) * Math.sin(E), 0];
  }
  let worst = 0;
  const samples = [];
  const checkEvery = nSteps / 16;
  integrate(st, P, nSteps, lawZero, (t, y) => {
    const s = Math.round(t / (P / nSteps));
    if (s % checkEvery !== 0) return;
    const u = unflatten(y, st.q);
    const rel = [u.X[0][0] - u.X[1][0], u.X[0][1] - u.X[1][1], u.X[0][2] - u.X[1][2]];
    const kp = kepler(t);
    const err = Math.hypot(rel[0] - kp[0], rel[1] - kp[1], rel[2] - kp[2]);
    if (err > worst) worst = err;
    samples.push({ t, err });
  });
  const pass = worst <= 1e-9;
  record.knownCases.K6 = { a, e: ecc, period: P, nSteps, worstPositionError: worst, samples: samples.map((s) => ({ t: s.t, err: s.err })), pass };
  log(`  period=${P} steps=${nSteps} worst relative-position error=${worst.toExponential(3)} ${pass ? 'PASS' : 'FAIL'}`);
}

const allKnown = k1pass && record.knownCases.K5.pass && record.knownCases.K6.pass;
log(`known cases K1,K5,K6: ${allKnown ? 'ALL PASS' : 'FAILURE PRESENT'}`);
if (!allKnown) {
  log('stopping before target use');
  if (outPath) writeFileSync(outPath, JSON.stringify(record, null, 2));
  process.exit(1);
}

// ---------- grid ----------
const fGrid = [0.01, 0.05, 0.1, 0.2, 1 / (2 * Math.PI), 0.5, 2 / Math.PI, 1, 2, 10];
const points = fGrid.map((f) => ({ label: `f=${f}`, f, Omega: 2 * Math.PI * f, kind: 'cyclic' }));
for (let nn = 1; nn <= 8; nn++) points.push({ label: `Omega_${nn}=${nn}`, f: nn / (2 * Math.PI), Omega: nn, kind: 'integer-ladder' });

// (a) 6x6 solve on the circular state at every grid point
log('(a) 6x6 solved accelerations equal -Omega^2 X_i on the circle');
for (const p of points) {
  const rho = rhoOfOmega(p.Omega);
  const st = circleState(rho, p.Omega);
  const r = balanceResidual(st, p.Omega);
  const norm = p.Omega * p.Omega * rho;
  const row = { label: p.label, Omega: p.Omega, rho, residual: r.worst, relativeResidual: r.worst / norm, det: r.det, detClosedForm: DeltaOfd(2 * rho), lawResidual: r.lawRes };
  record.gridSolve.push(row);
  log(`  ${p.label.padEnd(16)} rho=${rho.toPrecision(10)} rel.residual=${(r.worst / norm).toExponential(3)} det=${r.det.toPrecision(15)} closed=${DeltaOfd(2 * rho).toPrecision(15)}`);
}

// (b) omega_r measured from a radially perturbed circle, amplitude 1e-4
log('(b) omega_r from a radially perturbed circle (relative amplitude 1e-4)');
const measurePoints = [{ label: 'f=0.1', Omega: 2 * Math.PI * 0.1 }, { label: 'f=1/(2pi)', Omega: 1 }, { label: 'f=2/pi', Omega: 4 }, { label: 'f=1', Omega: 2 * Math.PI }];
for (const p of measurePoints) {
  const rho = rhoOfOmega(p.Omega);
  const st = circleState(rho, p.Omega, 1 + 1e-4);
  const wr = omegaROfOmega(p.Omega);
  const Tr = 2 * Math.PI / wr;
  const nPeriods = 6;
  const T = nPeriods * Tr;
  const stepsPerOrbit = 4000;
  const nSteps = Math.ceil(T / (2 * Math.PI / p.Omega) * stepsPerOrbit);
  const ts = [], ds = [];
  integrate(st, T, nSteps, DEFAULT_LAW, (t, y) => {
    const u = unflatten(y, st.q);
    ts.push(t);
    ds.push(Math.hypot(u.X[0][0] - u.X[1][0], u.X[0][1] - u.X[1][1], u.X[0][2] - u.X[1][2]));
  });
  // locate maxima of d by parabolic interpolation (start is at a maximum)
  const maxima = [];
  for (let i = 1; i < ds.length - 1; i++) {
    if (ds[i] >= ds[i - 1] && ds[i] > ds[i + 1]) {
      const y0 = ds[i - 1], y1 = ds[i], y2 = ds[i + 1];
      const denom = (y0 - 2 * y1 + y2);
      const off = denom !== 0 ? 0.5 * (y0 - y2) / denom : 0;
      maxima.push(ts[i] + off * (ts[1] - ts[0]));
    }
  }
  let measured = NaN;
  if (maxima.length >= 2) {
    // The start (d scaled by 1+1e-4 at unchanged velocity) is a turning point of
    // the separation; interior maxima are spaced by one radial period, so the
    // period is the mean spacing between successive interior maxima.
    const first = maxima[0];
    const last = maxima[maxima.length - 1];
    measured = 2 * Math.PI * (maxima.length - 1) / (last - first);
  }
  const rel = Math.abs(measured - wr) / wr;
  record.omegaRMeasured.push({ label: p.label, Omega: p.Omega, rho, omegaRPredicted: wr, omegaRMeasured: measured, relativeDifference: rel, maximaCount: maxima.length, nSteps, T });
  log(`  ${p.label.padEnd(12)} predicted=${wr.toPrecision(12)} measured=${measured.toPrecision(12)} rel.diff=${rel.toExponential(3)} (${maxima.length} maxima, ${nSteps} steps)`);
}

// (c) frozen table
log('(c) frozen table');
for (const p of points) {
  const Om = p.Omega;
  const rho = rhoOfOmega(Om), d = dOfOmega(Om), v = vOfOmega(Om);
  const Delta = DeltaOfd(d);
  const wr = Om / Math.sqrt(Delta);
  const Phi = Math.PI * Om / wr;
  const dvarpi = 2 * Phi - 2 * Math.PI;
  let speed;
  if (Math.abs(v - c) <= 1e-14) speed = 'equality (v = c_f): inclusive only';
  else if (v < c) speed = 'strict (v < c_f)';
  else speed = 'unrestricted only (v > c_f)';
  const row = {
    label: p.label, kind: p.kind, f: sig15(p.f), Omega: sig15(Om), rho: sig15(rho), d: sig15(d), v: sig15(v),
    x: sig15(d * c * c / K), omega_r: sig15(wr), Phi_lin: sig15(Phi), delta_varpi: sig15(dvarpi), Delta: sig15(Delta),
    Omega_over_omega_r: sig15(Math.sqrt(Delta)), speedLabel: speed,
  };
  record.table.push(row);
  log(`  ${p.label.padEnd(16)} rho=${row.rho} d=${row.d} v=${row.v} omega_r=${row.omega_r} Phi=${row.Phi_lin} dvarpi=${row.delta_varpi} Delta=${row.Delta} ${speed}`);
}

record.equalitySpeed = { Omega: 4 * c ** 3 / K, f: 2 * c ** 3 / (Math.PI * K), rho: K / (4 * c * c), d: K / (2 * c * c), x: 0.5 };
record.finishedAt = new Date().toISOString();
if (outPath) {
  writeFileSync(outPath, JSON.stringify(record, (k, v) => (typeof v === 'number' ? sig15(v) : v), 2));
  log(`wrote ${outPath}`);
}
