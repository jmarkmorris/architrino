// weber-binding-sphere-reference-F5.mjs
// Reference lane, Part 2d (blind): family F5, six members each on an independent great circle
// of the unit sphere at the common rate Omega. By Section 15.3 every member's acceleration must
// be -Omega^2 X_i, so the implicit solve is eliminated: the law's right-hand side is evaluated
// with the candidate accelerations inserted in d'' (closed system, no solve), and the residual is
//   R_closed = max_T max_i || RHS_i(X, V; A = -Omega^2 X) + Omega^2 X_i || / (Omega^2 R).
// Relation to the solved residual used in Section 7: with M the acceleration matrix, the closed
// residual vector equals M times the solved residual vector (A_solved - A_cand = M^{-1}(b - M A_cand)),
// so the two vanish together and differ by the factor M off balance; both are reported.
// Known cases first: (K-a) closed = M * solved on ten random family states; (K-b) the alternating
// hexagon (normals z, polarity +++--- at phases (0, 2pi/3, 4pi/3 | pi/3, pi, 5pi/3)) has R <= 1e-14;
// (K-c) reach: a start with normals tilted by 0.3 rad and phases shifted by 0.3 rad recovers it to <= 1e-10.
import { writeFileSync } from 'node:fs';
import { solveAccelerations, dot, cross, norm, scale, add, sub, unit, makeRng, levenbergMarquardt, sig15 } from './weber-binding-sphere-reference-lib.mjs';
import { assemble as assembleLaw } from '../../binary-research/evidence/weber-frequency-reference-law.mjs';

const R = 1;
const q = [1, 1, 1, -1, -1, -1];
const log = (...a) => console.log(...a);
const jsonNum = (k, v) => (typeof v === 'number' ? sig15(v) : v);
const OmHex = Math.sqrt(5 / 4 - 1 / Math.sqrt(3));

// ---------- geometry ----------
function normalOf(th, ph) { return [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)]; }
function basisOf(n) { let e = Math.abs(n[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0]; const u = unit(sub(e, scale(n, dot(e, n)))); return { u, up: cross(n, u) }; }
// member spec: { n, u, up, psi, s }
function stateAt(members, Omega, T) {
  const X = [], V = [];
  for (const m of members) {
    const ph = m.s * Omega * T + m.psi; const c = Math.cos(ph), sn = Math.sin(ph);
    X.push(add(scale(m.u, R * c), scale(m.up, R * sn)));
    V.push(scale(add(scale(m.u, -R * sn), scale(m.up, R * c)), m.s * Omega));
  }
  return { X, V };
}
// closed-system right-hand side with candidate accelerations A = -Omega^2 X inserted in d''
function closedResidualVectors(X, V, Omega) {
  const A = X.map((x) => scale(x, -Omega * Omega));
  const res = [];
  for (let i = 0; i < 6; i++) {
    let rhs = [0, 0, 0];
    for (let j = 0; j < 6; j++) {
      if (j === i) continue;
      const dv = sub(X[i], X[j]); const d = norm(dv); const e = scale(dv, 1 / d);
      const w = sub(V[i], V[j]); const ddot = dot(e, w); const wperp2 = dot(w, w) - ddot * ddot;
      const dddot = dot(e, sub(A[i], A[j])) + wperp2 / d;
      const mag = (q[i] * q[j] / (d * d)) * (1 - ddot * ddot / 2 + d * dddot);
      rhs = add(rhs, scale(e, mag));
    }
    res.push(sub(rhs, A[i]));
  }
  return res;
}
function solvedResidualVectors(X, V, Omega) {
  const sol = solveAccelerations({ X, V, q });
  if (sol.singular) return null;
  return sol.A.map((a, i) => add(a, scale(X[i], Omega * Omega)));
}
function evaluate(members, Omega, nT = 96, withSolve = false) {
  const P = 2 * Math.PI / Omega; const sc = Omega * Omega * R;
  let worst = 0, wRad = 0, wTan = 0, wBin = 0, worstSolved = 0, minSep = Infinity;
  for (let k = 0; k < nT; k++) {
    const { X, V } = stateAt(members, Omega, (k * P) / nT);
    const res = closedResidualVectors(X, V, Omega);
    for (let i = 0; i < 6; i++) {
      const r = res[i]; const nr = norm(r) / sc; worst = Math.max(worst, nr);
      const xh = unit(X[i]), vh = unit(V[i]), bh = cross(xh, vh);
      wRad = Math.max(wRad, Math.abs(dot(r, xh)) / sc); wTan = Math.max(wTan, Math.abs(dot(r, vh)) / sc); wBin = Math.max(wBin, Math.abs(dot(r, bh)) / sc);
      for (let j = i + 1; j < 6; j++) minSep = Math.min(minSep, norm(sub(X[i], X[j])));
    }
    if (withSolve) { const rs = solvedResidualVectors(X, V, Omega); if (rs) for (const r of rs) worstSolved = Math.max(worstSolved, norm(r) / sc); else worstSolved = Infinity; }
  }
  return { R: worst, radial: wRad, tangential: wTan, binormal: wBin, minSep, samples: nT, solvedR: withSolve ? worstSolved : undefined };
}

// ---------- parametrization for least squares: p = [Omega, (theta_i, phi_i, psi_i) x 6]; senses fixed per start ----------
function membersFrom(p, senses) {
  const ms = [];
  for (let i = 0; i < 6; i++) { const n = normalOf(p[1 + 3 * i], p[2 + 3 * i]); const { u, up } = basisOf(n); ms.push({ n, u, up, psi: p[3 + 3 * i], s: senses[i] }); }
  return ms;
}
function residualFn(senses, nT) {
  return (p) => {
    const Omega = p[0]; const ms = membersFrom(p, senses); const P = 2 * Math.PI / Omega; const sc = Omega * Omega * R; const out = [];
    for (let k = 0; k < nT; k++) {
      const { X, V } = stateAt(ms, Omega, ((k + 0.5) * P) / nT);
      const res = closedResidualVectors(X, V, Omega);
      for (const r of res) for (let a = 0; a < 3; a++) out.push(Number.isFinite(r[a]) ? r[a] / sc : 1e6);
    }
    return out;
  };
}
function fitFrom(p0, senses, maxIter = 150, nT = 24) {
  const lower = [0.2, ...new Array(18).fill(-Infinity)], upper = [3, ...new Array(18).fill(Infinity)];
  const fit = levenbergMarquardt(residualFn(senses, nT), p0, { maxIter, lower, upper, fdStep: 1e-6 });
  const ms = membersFrom(fit.p, senses);
  const ev = evaluate(ms, fit.p[0], 96, true);
  // characterisation: are all normals parallel (planar ring)? pairwise |n_i . n_j|
  let minAbsDot = 1; for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) minAbsDot = Math.min(minAbsDot, Math.abs(dot(ms[i].n, ms[j].n)));
  return { p: fit.p, senses, Omega: fit.p[0], iterations: fit.iterations, rms: fit.rms, ...ev, minAbsNormalDot: minAbsDot, planarRing: minAbsDot > 1 - 1e-6, OmegaOverHex: fit.p[0] / OmHex };
}

const out = { startedAt: new Date().toISOString(), family: 'F5 six members on independent great circles, common rate Omega in [0.2, 3], polarities +++---', seed: 20261005, knownCases: {}, strata: {} };
const rng = makeRng(20261005);
const randomP = () => { const p = [0.2 + 2.8 * rng.next()]; for (let i = 0; i < 6; i++) { const z = 2 * rng.next() - 1; p.push(Math.acos(z), 2 * Math.PI * rng.next(), 2 * Math.PI * rng.next()); } return p; };
const randomSenses = () => [1, ...Array.from({ length: 5 }, () => (rng.next() < 0.5 ? 1 : -1))];

// ================= known cases =================
{
  // (K-a) closed residual = M * solved residual on ten random family states, and the solved residual of the full solve
  let worst = 0;
  for (let t = 0; t < 10; t++) {
    const p = randomP(); const s = randomSenses(); const ms = membersFrom(p, s); const Omega = p[0];
    const { X, V } = stateAt(ms, Omega, rng.next() * 2 * Math.PI / Omega);
    const closed = closedResidualVectors(X, V, Omega).flat();
    const solved = solvedResidualVectors(X, V, Omega).flat();
    const { M } = assembleLaw({ X, V, q });
    const Msolved = M.map((row) => row.reduce((acc, m, j) => acc + m * solved[j], 0));
    const diff = Math.max(...closed.map((c, i) => Math.abs(c - Msolved[i]))) / Math.max(...closed.map(Math.abs));
    worst = Math.max(worst, diff);
  }
  out.knownCases.Ka_closedEqualsMtimesSolved = { states: 10, worstRelativeDifference: worst, pass: worst <= 1e-12 };
  log(`K-a: closed residual = M x solved residual on 10 random F5 states, worst relative difference ${worst.toExponential(2)} ${worst <= 1e-12 ? 'PASS' : 'FAIL'}`);
  // (K-b) the alternating hexagon in this family
  const pHex = [OmHex]; const psis = [0, 2 * Math.PI / 3, 4 * Math.PI / 3, Math.PI / 3, Math.PI, 5 * Math.PI / 3];
  for (let i = 0; i < 6; i++) pHex.push(0, 0, psis[i]);
  const sensesHex = [1, 1, 1, 1, 1, 1];
  const evHex = evaluate(membersFrom(pHex, sensesHex), OmHex, 96, true);
  const evHex11 = evaluate(membersFrom(pHex, sensesHex), 1.1 * OmHex, 96, true);
  out.knownCases.Kb_hexagon = { closedR: evHex.R, solvedR: evHex.solvedR, at11Omega: { closedR: evHex11.R, solvedR: evHex11.solvedR }, pass: evHex.R <= 1e-14 && evHex11.R >= 1e-2 };
  log(`K-b: hexagon in F5: closed R=${evHex.R.toExponential(2)}, solved R=${evHex.solvedR.toExponential(2)}; at 1.1 Omega closed ${evHex11.R.toExponential(2)} solved ${evHex11.solvedR.toExponential(2)} ${out.knownCases.Kb_hexagon.pass ? 'PASS' : 'FAIL'}`);
  // (K-c) reach: tilt every normal by 0.3 rad in a random direction and shift every phase by 0.3 rad (random sign), Omega by +10 %
  const rngR = makeRng(20261005 + 1);
  const p0 = [1.1 * OmHex];
  for (let i = 0; i < 6; i++) { const az = 2 * Math.PI * rngR.next(); p0.push(0.3, az, psis[i] + 0.3 * (rngR.next() < 0.5 ? 1 : -1)); }
  const t0 = Date.now();
  const reach = fitFrom(p0, sensesHex, 200, 24);
  const startEv = evaluate(membersFrom(p0, sensesHex), p0[0], 96, false);
  out.knownCases.Kc_reach = { startClosedR: startEv.R, finalClosedR: reach.R, finalSolvedR: reach.solvedR, Omega: reach.Omega, OmegaOverHex: reach.OmegaOverHex, iterations: reach.iterations, minAbsNormalDot: reach.minAbsNormalDot, pass: reach.R <= 1e-10, wallSeconds: (Date.now() - t0) / 1000 };
  log(`K-c: reach from tilted/shifted hexagon: start R=${startEv.R.toExponential(2)} -> closed R=${reach.R.toExponential(2)} (solved ${reach.solvedR.toExponential(2)}), Omega/Omega_hex=${reach.OmegaOverHex.toFixed(8)}, normals parallel to ${(1 - reach.minAbsNormalDot).toExponential(1)}, ${reach.iterations} it., ${out.knownCases.Kc_reach.wallSeconds.toFixed(1)} s ${reach.R <= 1e-10 ? 'PASS' : 'FAIL'}`);
  const allPass = out.knownCases.Ka_closedEqualsMtimesSolved.pass && out.knownCases.Kb_hexagon.pass && out.knownCases.Kc_reach.pass;
  if (!allPass) { writeFileSync('weber-binding-sphere-reference-F5.json', JSON.stringify(out, jsonNum, 2)); log('known case failure; stopping'); process.exit(1); }
}

// ================= F2 sub-family check (Section 7 points) =================
{
  const triad = [{ n: [1, 0, 0], u: [0, 1, 0], up: [0, 0, 1] }, { n: [0, 1, 0], u: [0, 0, 1], up: [1, 0, 0] }, { n: [0, 0, 1], u: [1, 0, 0], up: [0, 1, 0] }];
  const rows = [];
  const check = (senses3, phases, Omega, expectedSolved) => {
    // pair k: + member k (phase phi_k) and - member k+3 (phase phi_k + pi) on the same great circle, same sense
    const ms = [];
    for (let k = 0; k < 3; k++) ms.push({ ...triad[k], psi: phases[k], s: senses3[k] });
    for (let k = 0; k < 3; k++) ms.push({ ...triad[k], psi: phases[k] + Math.PI, s: senses3[k] });
    const ev = evaluate(ms, Omega, 64, true);
    rows.push({ senses: senses3, phases, Omega, closedR: ev.R, solvedR: ev.solvedR, section7: expectedSolved });
    log(`F2 point senses ${senses3.join('')} phases (${phases.map((v) => (v * 180 / Math.PI).toFixed(0)).join(',')}) Omega=${Omega}: solved R=${ev.solvedR.toFixed(6)} (Section 7: ${expectedSolved}), closed R=${ev.R.toFixed(6)}`);
  };
  check([1, 1, 1], [0, 0, 0], 0.7, 5.52882);
  check([1, 1, -1], [0, 5 * Math.PI / 6, Math.PI / 6], 0.7, 11.0571);
  check([1, -1, 1], [0, Math.PI / 6, 2 * Math.PI / 3], 0.7, 6.70618);
  check([1, 1, 1], [0, 0, 0], 1.365218, 2.8537);
  out.F2subfamily = rows;
}

// ================= targets =================
function runStratum(name, nStarts, makeStart, maxIter = 150) {
  log(`=== stratum: ${name} (${nStarts} starts) ===`);
  const t0 = Date.now(); const results = [];
  for (let s = 0; s < nStarts; s++) {
    const { p0, senses } = makeStart(s);
    const fit = fitFrom(p0, senses, maxIter, 24);
    results.push({ start: s, ...fit });
    if (s % 25 === 24) log(`  ${s + 1}/${nStarts} done (${((Date.now() - t0) / 1000).toFixed(0)} s), running floor ${Math.min(...results.map((r) => r.R)).toExponential(3)}`);
  }
  results.sort((a, b) => a.R - b.R);
  const below8 = results.filter((r) => r.R <= 1e-8); const hexLike = below8.filter((r) => r.planarRing);
  const summary = { starts: nStarts, floorClosedR: results[0].R, floorSolvedR: results[0].solvedR, floorAt: { Omega: results[0].Omega, OmegaOverHex: results[0].OmegaOverHex, senses: results[0].senses, p: results[0].p, minAbsNormalDot: results[0].minAbsNormalDot, planarRing: results[0].planarRing, minSep: results[0].minSep, radial: results[0].radial, tangential: results[0].tangential, binormal: results[0].binormal }, countBelow1e8: below8.length, countBelow1e8PlanarRing: hexLike.length, countBelow1e4: results.filter((r) => r.R <= 1e-4).length, countBelow1e2: results.filter((r) => r.R <= 1e-2).length, median: results[Math.floor(results.length / 2)].R, bestNonRing: (results.find((r) => !r.planarRing) || {}).R, wallSeconds: (Date.now() - t0) / 1000 };
  log(`  floor closed R=${summary.floorClosedR.toExponential(3)} (solved ${summary.floorSolvedR.toExponential(3)}) at Omega=${summary.floorAt.Omega.toFixed(5)} (${summary.floorAt.OmegaOverHex.toFixed(4)} Omega_hex), senses ${summary.floorAt.senses.join('')}, planar ring: ${summary.floorAt.planarRing}; below 1e-8: ${summary.countBelow1e8} (planar rings ${summary.countBelow1e8PlanarRing}); below 1e-4: ${summary.countBelow1e4}; below 1e-2: ${summary.countBelow1e2}; median ${summary.median.toExponential(2)}; best non-ring ${summary.bestNonRing === undefined ? '-' : summary.bestNonRing.toExponential(3)}; ${summary.wallSeconds.toFixed(0)} s`);
  out.strata[name] = { summary, tenBest: results.slice(0, 10).map((r) => ({ start: r.start, R: r.R, solvedR: r.solvedR, Omega: r.Omega, OmegaOverHex: r.OmegaOverHex, senses: r.senses, planarRing: r.planarRing, minAbsNormalDot: r.minAbsNormalDot, minSep: r.minSep, iterations: r.iterations, p: r.p })), all: results.map((r) => ({ start: r.start, R: r.R, solvedR: r.solvedR, Omega: r.Omega, planarRing: r.planarRing })) };
}

// (A) full family: 200 seeded random starts, random senses
runStratum('A full family (12 normal angles, 6 phases, Omega, random senses)', 200, () => ({ p0: randomP(), senses: randomSenses() }));

// (B) three shared normals: members k and k+3 (one of each polarity) share a normal, independent phases (non-antipodal generalisation of F2)
runStratum('B three shared normals (pairs k, k+3), independent phases', 100, () => {
  const p = [0.2 + 2.8 * rng.next()]; const nrm = [];
  for (let k = 0; k < 3; k++) { const z = 2 * rng.next() - 1; nrm.push([Math.acos(z), 2 * Math.PI * rng.next()]); }
  for (let i = 0; i < 6; i++) p.push(nrm[i % 3][0], nrm[i % 3][1], 2 * Math.PI * rng.next());
  const s3 = [1, rng.next() < 0.5 ? 1 : -1, rng.next() < 0.5 ? 1 : -1];
  return { p0: p, senses: [s3[0], s3[1], s3[2], s3[0], s3[1], s3[2]] };
}, 150);
// the shared-normal constraint is enforced by a projected parametrization: re-tie the normals after each LM run
// (the LM above treats the 18 member parameters as free; to keep the stratum exact, a constrained fit is run as well)
{
  log('=== stratum B (constrained): normals tied, 100 starts ===');
  const t0 = Date.now(); const results = [];
  for (let s = 0; s < 100; s++) {
    const nrm = []; for (let k = 0; k < 3; k++) { const z = 2 * rng.next() - 1; nrm.push(Math.acos(z), 2 * Math.PI * rng.next()); }
    const s3 = [1, rng.next() < 0.5 ? 1 : -1, rng.next() < 0.5 ? 1 : -1]; const senses = [s3[0], s3[1], s3[2], s3[0], s3[1], s3[2]];
    const psi = Array.from({ length: 6 }, () => 2 * Math.PI * rng.next());
    // reduced parameters: [Omega, th_a, ph_a, th_b, ph_b, th_c, ph_c, psi_0..psi_5]
    const q0 = [0.2 + 2.8 * rng.next(), ...nrm, ...psi];
    const expand = (r) => { const p = [r[0]]; for (let i = 0; i < 6; i++) p.push(r[1 + 2 * (i % 3)], r[2 + 2 * (i % 3)], r[7 + i]); return p; };
    const f = residualFn(senses, 24);
    const fit = levenbergMarquardt((r) => f(expand(r)), q0, { maxIter: 150, lower: [0.2, ...new Array(12).fill(-Infinity)], upper: [3, ...new Array(12).fill(Infinity)], fdStep: 1e-6 });
    const p = expand(fit.p); const ms = membersFrom(p, senses); const ev = evaluate(ms, p[0], 96, true);
    let minAbsDot = 1; for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) minAbsDot = Math.min(minAbsDot, Math.abs(dot(ms[i].n, ms[j].n)));
    // phase difference within each pair modulo 2pi (pi means antipodal)
    const pairPhase = [0, 1, 2].map((k) => { let d = (p[3 + 3 * (k + 3)] - p[3 + 3 * k]) % (2 * Math.PI); if (d < 0) d += 2 * Math.PI; return d; });
    results.push({ start: s, R: ev.R, solvedR: ev.solvedR, Omega: p[0], OmegaOverHex: p[0] / OmHex, senses, planarRing: minAbsDot > 1 - 1e-6, minAbsNormalDot: minAbsDot, minSep: ev.minSep, pairPhaseDifferences: pairPhase, iterations: fit.iterations, p });
  }
  results.sort((a, b) => a.R - b.R);
  const sm = { starts: 100, floorClosedR: results[0].R, floorSolvedR: results[0].solvedR, floorAt: { Omega: results[0].Omega, OmegaOverHex: results[0].OmegaOverHex, senses: results[0].senses, planarRing: results[0].planarRing, minAbsNormalDot: results[0].minAbsNormalDot, pairPhaseDifferences: results[0].pairPhaseDifferences, minSep: results[0].minSep, p: results[0].p }, countBelow1e8: results.filter((r) => r.R <= 1e-8).length, countBelow1e8PlanarRing: results.filter((r) => r.R <= 1e-8 && r.planarRing).length, countBelow1e4: results.filter((r) => r.R <= 1e-4).length, countBelow1e2: results.filter((r) => r.R <= 1e-2).length, median: results[50].R, bestNonRing: (results.find((r) => !r.planarRing) || {}).R, wallSeconds: (Date.now() - t0) / 1000 };
  log(`  floor closed R=${sm.floorClosedR.toExponential(3)} (solved ${sm.floorSolvedR.toExponential(3)}) at Omega=${sm.floorAt.Omega.toFixed(5)}, senses ${sm.floorAt.senses.join('')}, planar ring ${sm.floorAt.planarRing}, pair phase differences ${sm.floorAt.pairPhaseDifferences.map((v) => (v * 180 / Math.PI).toFixed(1)).join(',')} deg; below 1e-8: ${sm.countBelow1e8} (rings ${sm.countBelow1e8PlanarRing}); below 1e-4: ${sm.countBelow1e4}; below 1e-2: ${sm.countBelow1e2}; median ${sm.median.toExponential(2)}; best non-ring ${sm.bestNonRing === undefined ? '-' : sm.bestNonRing.toExponential(3)}; ${sm.wallSeconds.toFixed(0)} s`);
  out.strata['B constrained three shared normals'] = { summary: sm, tenBest: results.slice(0, 10), all: results.map((r) => ({ start: r.start, R: r.R, solvedR: r.solvedR, Omega: r.Omega, planarRing: r.planarRing })) };
}

// (C) all normals in one plane: theta_i = pi/2 for every member (normals in the xy-plane), 100 starts
{
  log('=== stratum C (constrained): all normals in one plane, 100 starts ===');
  const t0 = Date.now(); const results = [];
  for (let s = 0; s < 100; s++) {
    const senses = randomSenses();
    const q0 = [0.2 + 2.8 * rng.next()]; for (let i = 0; i < 6; i++) q0.push(2 * Math.PI * rng.next(), 2 * Math.PI * rng.next()); // [Omega, (phi_i, psi_i) x 6]
    const expand = (r) => { const p = [r[0]]; for (let i = 0; i < 6; i++) p.push(Math.PI / 2, r[1 + 2 * i], r[2 + 2 * i]); return p; };
    const f = residualFn(senses, 24);
    const fit = levenbergMarquardt((r) => f(expand(r)), q0, { maxIter: 150, lower: [0.2, ...new Array(12).fill(-Infinity)], upper: [3, ...new Array(12).fill(Infinity)], fdStep: 1e-6 });
    const p = expand(fit.p); const ms = membersFrom(p, senses); const ev = evaluate(ms, p[0], 96, true);
    let minAbsDot = 1; for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) minAbsDot = Math.min(minAbsDot, Math.abs(dot(ms[i].n, ms[j].n)));
    results.push({ start: s, R: ev.R, solvedR: ev.solvedR, Omega: p[0], OmegaOverHex: p[0] / OmHex, senses, planarRing: minAbsDot > 1 - 1e-6, minAbsNormalDot: minAbsDot, minSep: ev.minSep, iterations: fit.iterations, p });
  }
  results.sort((a, b) => a.R - b.R);
  const sm = { starts: 100, floorClosedR: results[0].R, floorSolvedR: results[0].solvedR, floorAt: { Omega: results[0].Omega, OmegaOverHex: results[0].OmegaOverHex, senses: results[0].senses, planarRing: results[0].planarRing, minAbsNormalDot: results[0].minAbsNormalDot, minSep: results[0].minSep, p: results[0].p }, countBelow1e8: results.filter((r) => r.R <= 1e-8).length, countBelow1e8PlanarRing: results.filter((r) => r.R <= 1e-8 && r.planarRing).length, countBelow1e4: results.filter((r) => r.R <= 1e-4).length, countBelow1e2: results.filter((r) => r.R <= 1e-2).length, median: results[50].R, bestNonRing: (results.find((r) => !r.planarRing) || {}).R, wallSeconds: (Date.now() - t0) / 1000 };
  log(`  floor closed R=${sm.floorClosedR.toExponential(3)} (solved ${sm.floorSolvedR.toExponential(3)}) at Omega=${sm.floorAt.Omega.toFixed(5)}, senses ${sm.floorAt.senses.join('')}, planar ring ${sm.floorAt.planarRing}; below 1e-8: ${sm.countBelow1e8} (rings ${sm.countBelow1e8PlanarRing}); below 1e-4: ${sm.countBelow1e4}; below 1e-2: ${sm.countBelow1e2}; median ${sm.median.toExponential(2)}; best non-ring ${sm.bestNonRing === undefined ? '-' : sm.bestNonRing.toExponential(3)}; ${sm.wallSeconds.toFixed(0)} s`);
  out.strata['C all normals in one plane'] = { summary: sm, tenBest: results.slice(0, 10), all: results.map((r) => ({ start: r.start, R: r.R, solvedR: r.solvedR, Omega: r.Omega, planarRing: r.planarRing })) };
}

out.finishedAt = new Date().toISOString();
writeFileSync('weber-binding-sphere-reference-F5.json', JSON.stringify(out, jsonNum, 2));
log('wrote weber-binding-sphere-reference-F5.json');
