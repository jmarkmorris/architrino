#!/usr/bin/env node
// weber-pair-external-diagnostic.mjs — diagnostic for inquiry P-W-3 (2026-10-09).
// Evaluates, for one opposite-polarity pair inside a recorded N-member history under the frozen
// instantaneous Section 9 law (lambda = -1/2, mu = 1, K = c_f = 1, unit weights, no self term), the pair
// quantities eps and h, the external differential acceleration f_ext, and the integrands of
//   d(eps)/dT = w . f_ext,   d(h)/dT = r x f_ext
// (analysis/weber-review-corrections-2026-10-09.md, Section 6).
// It evolves nothing in target mode: it reads recorded states and solves the law at each one.
// The law solver below is written here and imports no subject or reference instrument. The two existing
// solvers are imported only in known case K3, as comparison objects.
// Usage:  node <this file> known            known cases; must pass before any target run
//         node <this file> target           preregistered target evaluation (see the analysis document)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '../../../../..');
const DATA = path.join(REPO, '.local-data/master-equation-closure/weber-binding-sphere/r5-fate');
const RECEIPT = path.join(HERE, 'weber-pair-external-diagnostic-receipt.json');
const HEX_Q = [1, -1, 1, -1, 1, -1];

// ---------- vectors ----------
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sc = (k, a) => [k * a[0], k * a[1], k * a[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => Math.hypot(a[0], a[1], a[2]);
const at = (flat, i) => [flat[3 * i], flat[3 * i + 1], flat[3 * i + 2]];

// ---------- the frozen law: A_i = sum_j (s/r^2) [1 - rdot^2/2 + r rddot] e,  rddot = e.(A_i - A_j) + |w_perp|^2 / r ----------
function solveLaw(x, v, q) {
  const N = q.length, n = 3 * N;
  const M = Array.from({ length: n }, (_, k) => { const row = new Float64Array(n + 1); row[k] = 1; return row; });
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    if (i === j) continue;
    const d = sub(at(x, i), at(x, j)), r = norm(d), e = sc(1 / r, d), w = sub(at(v, i), at(v, j));
    const rd = dot(e, w), wp2 = dot(w, w) - rd * rd, s = q[i] * q[j];
    const g = s / r, rhs = (s / (r * r)) * (1 - rd * rd / 2 + wp2);
    for (let a = 0; a < 3; a++) {
      M[3 * i + a][n] += rhs * e[a];
      for (let b = 0; b < 3; b++) { M[3 * i + a][3 * i + b] -= g * e[a] * e[b]; M[3 * i + a][3 * j + b] += g * e[a] * e[b]; }
    }
  }
  for (let c = 0; c < n; c++) { // Gaussian elimination with partial pivoting
    let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    if (Math.abs(M[p][c]) < 1e-300) throw new Error('singular acceleration system');
    [M[c], M[p]] = [M[p], M[c]];
    for (let r = c + 1; r < n; r++) { const f = M[r][c] / M[c][c]; if (f !== 0) for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k]; }
  }
  const A = new Float64Array(n);
  for (let r = n - 1; r >= 0; r--) { let s = M[r][n]; for (let k = r + 1; k < n; k++) s -= M[r][k] * A[k]; A[r] = s / M[r][r]; }
  return A;
}

// ---------- pair quantities for an opposite-polarity pair (i, j) ----------
function pairQuantities(x, v, A, q, i, j) {
  const d = sub(at(x, i), at(x, j)), r = norm(d), e = sc(1 / r, d), w = sub(at(v, i), at(v, j));
  const rd = dot(e, w), wp2 = dot(w, w) - rd * rd, hvec = cross(d, w), h = norm(hvec);
  const D = 1 + 2 / r, eps = 0.5 * D * rd * rd + h * h / (2 * r * r) - 2 / r;
  const arel = sub(at(A, i), at(A, j)), rdd = dot(e, arel) + wp2 / r;
  const own = sc(2 * (q[i] * q[j] / (r * r)) * (1 - rd * rd / 2 + r * rdd), e); // A_{i<-j} - A_{j<-i}
  const fext = sub(arel, own);
  let nearest = Infinity;
  for (let k = 0; k < q.length; k++) if (k !== i && k !== j) nearest = Math.min(nearest, norm(sub(at(x, i), at(x, k))), norm(sub(at(x, j), at(x, k))));
  return { r, rd, rdd, h, hvec, eps, D, wp2, fext, fextNorm: norm(fext), epsRate: dot(w, fext), torque: cross(d, fext), nearest };
}

// ---------- own small integrator, used only in known cases ----------
function deriv(y, q) { const N = q.length, x = y.slice(0, 3 * N), v = y.slice(3 * N), A = solveLaw(x, v, q); const o = new Float64Array(6 * N); o.set(v, 0); o.set(A, 3 * N); return o; }
function rk4(y, q, dt, steps) {
  let z = Float64Array.from(y);
  for (let s = 0; s < steps; s++) {
    const k1 = deriv(z, q), k2 = deriv(z.map((u, a) => u + 0.5 * dt * k1[a]), q), k3 = deriv(z.map((u, a) => u + 0.5 * dt * k2[a]), q), k4 = deriv(z.map((u, a) => u + dt * k3[a]), q);
    z = z.map((u, a) => u + dt * (k1[a] + 2 * k2[a] + 2 * k3[a] + k4[a]) / 6);
  }
  return z;
}
function lcg(seed) { let s = seed >>> 0; return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296 * 2 - 1; }; }

async function known() {
  const out = { ran: new Date().toISOString(), cases: [] }; let ok = true;
  const push = (name, pass, detail) => { out.cases.push({ name, pass, ...detail }); ok = ok && pass; console.log(`${pass ? 'PASS' : 'FAIL'} ${name}: ${JSON.stringify(detail)}`); };
  // K1: isolated pair. f_ext must vanish and the solved radial acceleration must equal the closed form.
  { const rnd = lcg(11), q = [1, -1]; let worstF = 0, worstR = 0;
    for (let t = 0; t < 200; t++) { const x = [rnd(), rnd(), rnd(), 1.5 + rnd(), rnd(), rnd()], v = Array.from({ length: 6 }, () => 0.6 * rnd());
      const A = solveLaw(x, v, q), p = pairQuantities(x, v, A, q, 0, 1);
      const closed = (p.h * p.h / p.r ** 3 - 2 / p.r ** 2 + p.rd * p.rd / p.r ** 2) / p.D;
      worstF = Math.max(worstF, p.fextNorm); worstR = Math.max(worstR, Math.abs(p.rdd - closed) / (1 + Math.abs(closed))); }
    push('K1 isolated pair: f_ext = 0 and D rddot = h^2/r^3 - 2/r^2 + rdot^2/r^2 (200 random states)', worstF < 1e-12 && worstR < 1e-12, { maxFext: worstF, maxRelRadial: worstR }); }
  // K2: three members. Rates of eps and h measured along the flow by central differences against the identity.
  { const rnd = lcg(29), q = [1, -1, 1]; let worstE = 0, worstH = 0;
    for (let t = 0; t < 12; t++) { const x = [0, 0, 0, 1.2 + 0.3 * rnd(), 0.2 * rnd(), 0.2 * rnd(), 2.5 + rnd(), 2.5 + rnd(), rnd()], v = Array.from({ length: 9 }, () => 0.35 * rnd());
      const y = Float64Array.from([...x, ...v]), del = 2e-3, n = 40;
      const yp = rk4(y, q, del / n, n), ym = rk4(y, q, -del / n, n);
      const P = (z) => { const xx = z.slice(0, 9), vv = z.slice(9); return pairQuantities(xx, vv, solveLaw(xx, vv, q), q, 0, 1); };
      const p0 = P(y), pp = P(yp), pm = P(ym);
      const dE = (pp.eps - pm.eps) / (2 * del), dH = sc(1 / (2 * del), sub(pp.hvec, pm.hvec));
      worstE = Math.max(worstE, Math.abs(dE - p0.epsRate) / (Math.abs(p0.epsRate) + 1e-3)); worstH = Math.max(worstH, norm(sub(dH, p0.torque)) / (norm(p0.torque) + 1e-3)); }
    push('K2 three members: d(eps)/dT = w.f_ext and d(h)/dT = r x f_ext, central differences along own RK4 flow (12 random states)', worstE < 1e-5 && worstH < 1e-5, { maxRelEpsRate: worstE, maxRelTorque: worstH }); }
  // K3: this solver against the independently authored reference law and the subject instrument, on the recorded
  // initial state of the preregistered run (t = 0, outside the target window).
  { const first = JSON.parse(fs.readFileSync(path.join(DATA, 'survivor-free-R3-i8-rtol1e-12.trajectory.jsonl'), 'utf8').split('\n', 1)[0]);
    const A = solveLaw(first.x, first.v, HEX_Q);
    const ref = await import('../../binary-research/evidence/weber-frequency-reference-law.mjs');
    const subj = await import('../../binary-research/evidence/weber-overnight-pair-instrument.mjs');
    const X = [], V = []; for (let i = 0; i < 6; i++) { X.push(at(first.x, i)); V.push(at(first.v, i)); }
    const Aref = ref.solveAccelerations({ X, V, q: HEX_Q }).A.flat();
    const P = subj.makeParams({ q: HEX_Q, K: 1, lambda: -0.5, mu: 1, cf: 1, condition: 'none' });
    const Asub = subj.solveAccelerations(subj.packState(X.map((xx, i) => ({ x: xx, v: V[i], q: HEX_Q[i] }))), P).A;
    let dRef = 0, dSub = 0, scale = 0; for (let k = 0; k < 18; k++) { dRef = Math.max(dRef, Math.abs(A[k] - Aref[k])); dSub = Math.max(dSub, Math.abs(A[k] - Asub[k])); scale = Math.max(scale, Math.abs(A[k])); }
    push('K3 solver agreement on the recorded t = 0 state: this solver vs reference law vs subject instrument', dRef < 1e-11 * (1 + scale) && dSub < 1e-11 * (1 + scale), { maxAbsDiffReference: dRef, maxAbsDiffSubject: dSub, maxAbsAcceleration: scale }); }
  // K4: isolated pair evolved by the own integrator: eps and h constant, and the quadrature of w.f_ext is zero.
  { const q = [1, -1], y0 = Float64Array.from([0.5, 0, 0, -0.5, 0, 0, 0, 0.55, 0.05, 0, -0.55, -0.05]);
    const p0 = pairQuantities(y0.slice(0, 6), y0.slice(6), solveLaw(y0.slice(0, 6), y0.slice(6), q), q, 0, 1);
    let y = y0, quad = 0, prev = p0.epsRate; for (let s = 0; s < 400; s++) { y = rk4(y, q, 0.0025, 4); const p = pairQuantities(y.slice(0, 6), y.slice(6), solveLaw(y.slice(0, 6), y.slice(6), q), q, 0, 1); quad += 0.5 * (prev + p.epsRate) * 0.01; prev = p.epsRate; }
    const p1 = pairQuantities(y.slice(0, 6), y.slice(6), solveLaw(y.slice(0, 6), y.slice(6), q), q, 0, 1);
    push('K4 isolated pair evolved to T = 4: eps and h unchanged, quadrature of w.f_ext zero', Math.abs(p1.eps - p0.eps) < 1e-9 && Math.abs(p1.h - p0.h) < 1e-9 && Math.abs(quad) < 1e-12 && p0.eps < 0, { eps0: p0.eps, dEps: p1.eps - p0.eps, dH: p1.h - p0.h, quadrature: quad }); }
  out.allPassed = ok;
  const rec = fs.existsSync(RECEIPT) ? JSON.parse(fs.readFileSync(RECEIPT, 'utf8')) : {};
  rec.instrument = 'weber-pair-external-diagnostic.mjs'; rec.law = { lambda: -0.5, mu: 1, K: 1, cf: 1 }; rec.known = out;
  fs.writeFileSync(RECEIPT, JSON.stringify(rec, null, 1) + '\n');
  console.log(ok ? 'known cases: all passed' : 'known cases: FAILED'); process.exit(ok ? 0 : 1);
}

// ---------- preregistered target ----------
const PREREG = { run: 'survivor-free-R3-i8', tolerances: ['1e-12', '1e-10'], pairs: [[1, 2], [0, 3]], tFinal: 796.1543269156391, windowStart: 796.1543269156391 / 2, maxStepOverAngularPeriod: 1 / 8 };

function target() {
  const rec = JSON.parse(fs.readFileSync(RECEIPT, 'utf8'));
  if (!rec.known || !rec.known.allPassed) { console.error('known cases have not passed; refusing to run the target'); process.exit(2); }
  const result = { ran: new Date().toISOString(), prereg: PREREG, evaluations: [] };
  for (const tol of PREREG.tolerances) {
    const file = path.join(DATA, `${PREREG.run}-rtol${tol}.trajectory.jsonl`);
    const states = fs.readFileSync(file, 'utf8').split('\n').filter((l) => l.startsWith('{"type":"state"')).map((l) => JSON.parse(l)).filter((s) => s.t >= PREREG.windowStart);
    for (const [i, j] of PREREG.pairs) {
      const rows = states.map((s) => ({ t: s.t, ...pairQuantities(s.x, s.v, solveLaw(s.x, s.v, HEX_Q), HEX_Q, i, j) }));
      const a = rows[0], z = rows[rows.length - 1];
      let Qe = 0, Ae = 0, Ah = 0, epsMax = -Infinity, epsMin = Infinity, hMin = Infinity, hMax = 0, ratioMin = Infinity, stepMax = 0, rMin = Infinity, rMax = 0, nearestMin = Infinity, fextMax = 0; const stepRatios = [];
      for (let k = 0; k < rows.length; k++) { const p = rows[k];
        epsMax = Math.max(epsMax, p.eps); epsMin = Math.min(epsMin, p.eps); hMin = Math.min(hMin, p.h); hMax = Math.max(hMax, p.h); ratioMin = Math.min(ratioMin, p.nearest / p.r); rMin = Math.min(rMin, p.r); rMax = Math.max(rMax, p.r); nearestMin = Math.min(nearestMin, p.nearest); fextMax = Math.max(fextMax, p.fextNorm);
        if (k + 1 < rows.length) { const n = rows[k + 1], dt = n.t - p.t; Qe += 0.5 * (p.epsRate + n.epsRate) * dt; Ae += 0.5 * (Math.abs(p.epsRate) + Math.abs(n.epsRate)) * dt; Ah += 0.5 * (norm(p.torque) + norm(n.torque)) * dt;
          const sr = dt / (2 * Math.PI * p.r * p.r / p.h); stepRatios.push(sr); stepMax = Math.max(stepMax, sr); } }
      stepRatios.sort((u, w) => u - w);
      const dEps = z.eps - a.eps, dHvec = norm(sub(z.hvec, a.hvec));
      const ev = { rtol: tol, pair: [i, j], window: [a.t, z.t], sampledStates: rows.length,
        start: { eps: a.eps, h: a.h, r: a.r }, end: { eps: z.eps, h: z.h, r: z.r },
        sampledPersistence: { epsMax, epsMin, hMin, hMax, holdsAtEverySample: epsMax < 0 && hMin > 0 },
        signedChange: { dEps, dH: z.h - a.h, normOfVectorChangeOfH: dHvec },
        quadrature: { trapezoidOfEpsRate: Qe, minusStateDifference: Qe - dEps, absIntegralEpsRate: Ae, absIntegralTorque: Ah },
        sufficientBound: { epsMargin: -a.eps, hMargin: a.h, epsBoundHolds: Ae < -a.eps, hBoundHolds: Ah < a.h },
        sampling: { maxStepOverAngularPeriod: stepMax, medianStepOverAngularPeriod: stepRatios[Math.floor(stepRatios.length / 2)], quadratureAdmissibleByPreregisteredRule: stepMax <= PREREG.maxStepOverAngularPeriod },
        separation: { pairSeparationMin: rMin, pairSeparationMax: rMax, nearestOtherMemberMin: nearestMin, minOfNearestOtherOverPairSeparation: ratioMin, maxExternalDifferentialAcceleration: fextMax } };
      result.evaluations.push(ev);
      console.log(JSON.stringify(ev));
    }
  }
  rec.target = result; fs.writeFileSync(RECEIPT, JSON.stringify(rec, null, 1) + '\n');
}

// ---------- post hoc decomposition of f_ext (explanatory; not part of the preregistration) ----------
// Splits f_ext on pair (i, j) by source member, and compares the part due to the other bound pair (k, l) with the
// leading far-field form  -2 q_i (1/d) e [ e . (q_k A_k + q_l A_l) ],  d and e taken between the two pair centres.
function decompose() {
  const rec = JSON.parse(fs.readFileSync(RECEIPT, 'utf8'));
  if (!rec.target) { console.error('run the target first'); process.exit(2); }
  const out = { ran: new Date().toISOString(), note: 'post hoc, explanatory; same run, pairs and window as the preregistered target', rows: [] };
  const contrib = (x, v, A, q, i, k) => { const d = sub(at(x, i), at(x, k)), r = norm(d), e = sc(1 / r, d), w = sub(at(v, i), at(v, k)), rd = dot(e, w), wp2 = dot(w, w) - rd * rd, rdd = dot(e, sub(at(A, i), at(A, k))) + wp2 / r, s = q[i] * q[k];
    return { total: sc((s / (r * r)) * (1 - rd * rd / 2 + r * rdd), e), accelPart: sc((s / r) * dot(e, sub(at(A, i), at(A, k))), e) }; };
  for (const tol of PREREG.tolerances) {
    const states = fs.readFileSync(path.join(DATA, `${PREREG.run}-rtol${tol}.trajectory.jsonl`), 'utf8').split('\n').filter((l) => l.startsWith('{"type":"state"')).map((l) => JSON.parse(l)).filter((s) => s.t >= PREREG.windowStart);
    for (const [[i, j], [k, l]] of [[PREREG.pairs[0], PREREG.pairs[1]], [PREREG.pairs[1], PREREG.pairs[0]]]) {
      let sumF = 0, sumOther = 0, sumSingles = 0, sumAccel = 0, sumErr = 0, sumLead = 0, n = 0, worst = null;
      for (const s of states) { const A = solveLaw(s.x, s.v, HEX_Q), p = pairQuantities(s.x, s.v, A, HEX_Q, i, j);
        const from = (m) => { const a = contrib(s.x, s.v, A, HEX_Q, i, m), b = contrib(s.x, s.v, A, HEX_Q, j, m); return { total: sub(a.total, b.total), accel: sub(a.accelPart, b.accelPart) }; };
        const fk = from(k), fl = from(l), others = [0, 1, 2, 3, 4, 5].filter((m) => ![i, j, k, l].includes(m)).map(from);
        const fOther = add(fk.total, fl.total), fOtherAccel = add(fk.accel, fl.accel), fSingles = others.reduce((u, o) => add(u, o.total), [0, 0, 0]);
        const cA = sc(0.5, add(at(s.x, i), at(s.x, j))), cB = sc(0.5, add(at(s.x, k), at(s.x, l))), dv = sub(cA, cB), d = norm(dv), e = sc(1 / d, dv);
        const lead = sc(-2 * HEX_Q[i] / d * dot(e, add(sc(HEX_Q[k], at(A, k)), sc(HEX_Q[l], at(A, l)))), e);
        const F = p.fextNorm; sumF += F * F; sumOther += norm(fOther) ** 2; sumSingles += norm(fSingles) ** 2; sumAccel += norm(fOtherAccel) ** 2; sumLead += norm(lead) ** 2; sumErr += norm(sub(p.fext, lead)) ** 2; n++;
        if (!worst || F > worst.fext) worst = { t: s.t, fext: F, fromOtherPair: norm(fOther), accelerationCouplingPart: norm(fOtherAccel), fromSingles: norm(fSingles), leadingForm: norm(lead), fextMinusLeading: norm(sub(p.fext, lead)), centreDistance: d, pairSeparation: p.r, otherPairRelativeAcceleration: norm(sub(at(A, k), at(A, l))) }; }
      const rms = (u) => Math.sqrt(u / n);
      const row = { rtol: tol, pair: [i, j], otherPair: [k, l], states: n, rms: { fext: rms(sumF), fromOtherPair: rms(sumOther), accelerationCouplingPart: rms(sumAccel), fromSingles: rms(sumSingles), leadingForm: rms(sumLead), fextMinusLeading: rms(sumErr) }, atLargestFext: worst };
      out.rows.push(row); console.log(JSON.stringify(row));
    }
  }
  rec.decomposition = out; fs.writeFileSync(RECEIPT, JSON.stringify(rec, null, 1) + '\n');
}

// ---------- dense continuation with the integrals carried as state (own RK4; used by K5 and by the prepared rerun) ----------
// Evolves all members from (x0, v0) with fixed step dt and, for each listed pair, carries
//   I1 = int w.f_ext dT,  I2 = int |w.f_ext| dT,  I3 = int |r x f_ext| dT
// through the same Runge-Kutta stages, so the integrals have the integrator's accuracy and need no output sampling.
function evolveWithIntegrals(x0, v0, q, pairs, dt, steps) {
  const N = q.length, m = 6 * N, np = pairs.length;
  const progressStart = Date.now(); let nextProgress = progressStart + 15000;
  const f = (y) => { const x = y.subarray(0, 3 * N), v = y.subarray(3 * N, m), A = solveLaw(x, v, q), o = new Float64Array(m + 3 * np); o.set(v, 0); o.set(A, 3 * N);
    pairs.forEach(([i, j], c) => { const p = pairQuantities(x, v, A, q, i, j); o[m + 3 * c] = p.epsRate; o[m + 3 * c + 1] = Math.abs(p.epsRate); o[m + 3 * c + 2] = norm(p.torque); }); return o; };
  let y = new Float64Array(m + 3 * np); y.set(x0, 0); y.set(v0, 3 * N);
  const track = pairs.map(() => ({ epsMax: -Infinity, epsMin: Infinity, hMin: Infinity, rMin: Infinity, rMax: 0, nearestMin: Infinity }));
  const look = (yy) => { const x = yy.subarray(0, 3 * N), v = yy.subarray(3 * N, m), A = solveLaw(x, v, q); return pairs.map(([i, j]) => pairQuantities(x, v, A, q, i, j)); };
  const first = look(y); let last = first;
  const note = (ps) => ps.forEach((p, c) => { const t = track[c]; t.epsMax = Math.max(t.epsMax, p.eps); t.epsMin = Math.min(t.epsMin, p.eps); t.hMin = Math.min(t.hMin, p.h); t.rMin = Math.min(t.rMin, p.r); t.rMax = Math.max(t.rMax, p.r); t.nearestMin = Math.min(t.nearestMin, p.nearest); });
  note(first);
  for (let s = 0; s < steps; s++) {
    const k1 = f(y), k2 = f(y.map((u, a) => u + 0.5 * dt * k1[a])), k3 = f(y.map((u, a) => u + 0.5 * dt * k2[a])), k4 = f(y.map((u, a) => u + dt * k3[a]));
    y = y.map((u, a) => u + dt * (k1[a] + 2 * k2[a] + 2 * k3[a] + k4[a]) / 6);
    last = look(y); note(last);
    if (Date.now() >= nextProgress) {
      console.error(JSON.stringify({ type: 'progress', step: s + 1, steps, elapsedSimulationTime: (s + 1) * dt, wallSeconds: (Date.now() - progressStart) / 1000 }));
      nextProgress = Date.now() + 15000;
    }
  }
  return { x: Array.from(y.subarray(0, 3 * N)), v: Array.from(y.subarray(3 * N, m)),
    pairs: pairs.map((pr, c) => ({ pair: pr, start: { eps: first[c].eps, h: first[c].h }, end: { eps: last[c].eps, h: last[c].h }, dEps: last[c].eps - first[c].eps, integralEpsRate: y[m + 3 * c], integralMinusStateDifference: y[m + 3 * c] - (last[c].eps - first[c].eps), absIntegralEpsRate: y[m + 3 * c + 1], absIntegralTorque: y[m + 3 * c + 2], everyStep: track[c] })) };
}

// K5: the dense-continuation path on a three-member system, at two step sizes (run with the known cases is not
// required for the target above; it must pass before the prepared rerun is executed).
function knownDense() {
  const q = [1, -1, 1], x0 = [0, 0, 0, 1.1, 0.1, 0, 3.2, 2.6, 0.4], v0 = [0, -0.45, 0.02, 0, 0.45, -0.02, -0.05, 0.02, 0.01];
  const a = evolveWithIntegrals(x0, v0, q, [[0, 1]], 0.002, 1000), b = evolveWithIntegrals(x0, v0, q, [[0, 1]], 0.001, 2000);
  const pa = a.pairs[0], pb = b.pairs[0];
  const pass = Math.abs(pa.integralMinusStateDifference) < 1e-8 && Math.abs(pb.integralMinusStateDifference) < 1e-9 && Math.abs(pa.dEps - pb.dEps) < 1e-8 && Math.abs(pa.dEps) > 1e-6;
  const detail = { dEps_dt0002: pa.dEps, dEps_dt0001: pb.dEps, integralMinusStateDifference_dt0002: pa.integralMinusStateDifference, integralMinusStateDifference_dt0001: pb.integralMinusStateDifference, absIntegralEpsRate: pb.absIntegralEpsRate };
  console.log(`${pass ? 'PASS' : 'FAIL'} K5 dense continuation, three members to T = 2: carried integral of w.f_ext equals the change of eps, at two step sizes: ${JSON.stringify(detail)}`);
  const rec = JSON.parse(fs.readFileSync(RECEIPT, 'utf8')); rec.knownDense = { ran: new Date().toISOString(), pass, ...detail }; fs.writeFileSync(RECEIPT, JSON.stringify(rec, null, 1) + '\n');
  process.exit(pass ? 0 : 1);
}

// Prepared rerun (NOT executed by the author; for Codex under the operator's authorization). Continues the recorded
// rtol 1e-12 history from its first state in the window to the final time with this file's own integrator and
// carries the integrals. Usage: node <this file> rerun [dt]   (default dt 0.002; run again with 0.001 for convergence)
function rerun() {
  const rec = JSON.parse(fs.readFileSync(RECEIPT, 'utf8'));
  if (!rec.known?.allPassed || !rec.knownDense?.pass) { console.error('known cases K1-K5 have not all passed; refusing to run'); process.exit(2); }
  const dt = Number(process.argv[3] ?? 0.002);
  const states = fs.readFileSync(path.join(DATA, `${PREREG.run}-rtol1e-12.trajectory.jsonl`), 'utf8').split('\n').filter((l) => l.startsWith('{"type":"state"')).map((l) => JSON.parse(l));
  const s0 = states.find((s) => s.t >= PREREG.windowStart), sEnd = states[states.length - 1];
  const steps = Math.round((sEnd.t - s0.t) / dt), dtUsed = (sEnd.t - s0.t) / steps, t0 = Date.now();
  const r = evolveWithIntegrals(s0.x, s0.v, HEX_Q, PREREG.pairs, dtUsed, steps);
  let dx = 0, dv = 0; for (let a = 0; a < 18; a++) { dx = Math.max(dx, Math.abs(r.x[a] - sEnd.x[a])); dv = Math.max(dv, Math.abs(r.v[a] - sEnd.v[a])); }
  const out = { ran: new Date().toISOString(), from: s0.t, to: sEnd.t, dt: dtUsed, steps, wallSeconds: (Date.now() - t0) / 1000, maxAbsPositionDifferenceFromRecordedEnd: dx, maxAbsVelocityDifferenceFromRecordedEnd: dv, pairs: r.pairs };
  rec.rerun = rec.rerun ?? {}; rec.rerun[`dt${dt}`] = out; fs.writeFileSync(RECEIPT, JSON.stringify(rec, null, 1) + '\n');
  console.log(JSON.stringify(out));
}

const mode = process.argv[2];
if (mode === 'known') await known(); else if (mode === 'target') target(); else if (mode === 'decompose') decompose(); else if (mode === 'known-dense') knownDense(); else if (mode === 'rerun') rerun();
else { console.error('usage: known | target | decompose | known-dense | rerun [dt]'); process.exit(64); }
