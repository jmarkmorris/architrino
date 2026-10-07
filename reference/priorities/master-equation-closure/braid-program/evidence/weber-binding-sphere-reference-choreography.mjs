// weber-binding-sphere-reference-choreography.mjs
// Reference lane, Part 2c(c), blind. Independent Fourier collocation for the single-curve
// choreography X_k(T) = X_0(T + k P/6), k = 0..5, under the frozen law, with the polarity
// ordering (+,+,+,-,-,-). The shift by three members (T -> T + P/2) combined with the global
// polarity flip is a symmetry of this ansatz, so the equations of members 3,4,5 follow from
// those of 0,1,2; the equations of members 0, 1 and 2 are enforced separately because the
// shift by one member does not preserve the polarity pattern. Known case first: the alternating
// pattern (-1)^k, for which the shift by one is a symmetry and the planar hexagon is exact.
// Representation: X_0(T) = sum_{m=1..M} a_m cos(m w T) + b_m sin(m w T), w = 2 pi / P (a_0 = 0 is
// the centre gauge); gauges b_{x1} = a_{y1} = a_{z1} = b_{z1} = 0 (time origin and rotations).
// Unknowns: the remaining coefficients and w. Collocation at N_c times closed under the shift P/6.
import { writeFileSync } from 'node:fs';
import { solveAccelerations, norm, scale, add, sub, makeRng, levenbergMarquardt, sig15 } from './weber-binding-sphere-reference-lib.mjs';

const log = (...a) => console.log(...a);
const jsonNum = (k, v) => (typeof v === 'number' ? sig15(v) : v);
const M = Number(process.argv[2] ?? 4);
const Nc = 6 * Math.ceil((4 * M + 2) / 6);

// parameter packing: p = [w, then for m=1..M: ax,ay,az,bx,by,bz with the four gauged entries removed for m=1]
function unpack(p) {
  const w = p[0]; const a = [], b = []; let i = 1;
  for (let m = 1; m <= M; m++) {
    if (m === 1) { a.push([p[i], 0, 0]); b.push([0, p[i + 1], 0]); i += 2; }
    else { a.push([p[i], p[i + 1], p[i + 2]]); b.push([p[i + 3], p[i + 4], p[i + 5]]); i += 6; }
  }
  return { w, a, b };
}
function pack(w, a, b) { const p = [w]; for (let m = 0; m < M; m++) { if (m === 0) p.push(a[0][0], b[0][1]); else p.push(...a[m], ...b[m]); } return p; }
function curve(c, T) {
  const X = [0, 0, 0], V = [0, 0, 0], A = [0, 0, 0];
  for (let m = 1; m <= M; m++) {
    const th = m * c.w * T, cs = Math.cos(th), sn = Math.sin(th);
    for (let k = 0; k < 3; k++) {
      X[k] += c.a[m - 1][k] * cs + c.b[m - 1][k] * sn;
      V[k] += m * c.w * (-c.a[m - 1][k] * sn + c.b[m - 1][k] * cs);
      A[k] += -((m * c.w) ** 2) * (c.a[m - 1][k] * cs + c.b[m - 1][k] * sn);
    }
  }
  return { X, V, A };
}
function configuration(c, T) {
  const P = 2 * Math.PI / c.w; const X = [], V = [], A = [];
  for (let k = 0; k < 6; k++) { const s = curve(c, T + k * P / 6); X.push(s.X); V.push(s.V); A.push(s.A); }
  return { X, V, A };
}
function rhoEff(c) { let s = 0; for (let m = 0; m < M; m++) s += (c.a[m][0] ** 2 + c.a[m][1] ** 2 + c.a[m][2] ** 2 + c.b[m][0] ** 2 + c.b[m][1] ** 2 + c.b[m][2] ** 2) / 2; return Math.sqrt(s); }
// residuals are normalized by the curve's centripetal scale w^2 rho_eff (the preregistered Omega^2 R), so that
// slowing the curve down or inflating it cannot lower the objective without approaching balance.
function residualVector(p, q, members, nc = Nc) {
  const c = unpack(p); const P = 2 * Math.PI / c.w; const res = []; const scaleA = c.w * c.w * rhoEff(c);
  for (let n = 0; n < nc; n++) {
    const T = (n + 0.5) * P / nc;
    const cf = configuration(c, T);
    const sol = solveAccelerations({ X: cf.X, V: cf.V, q });
    if (sol.singular) return new Array(3 * members.length * nc).fill(1e6);
    for (const k of members) for (let i = 0; i < 3; i++) res.push((cf.A[k][i] - sol.A[k][i]) / scaleA);
  }
  return res;
}
function fullPeriodResidual(p, q, nT = 128) {
  const c = unpack(p); const P = 2 * Math.PI / c.w; let worst = 0, scaleA = 0, minSep = Infinity, spd = [Infinity, -Infinity], rad = [Infinity, -Infinity], maxZ = 0;
  for (let n = 0; n < nT; n++) {
    const T = n * P / nT; const cf = configuration(c, T);
    const sol = solveAccelerations({ X: cf.X, V: cf.V, q });
    if (sol.singular) return { singular: true };
    minSep = Math.min(minSep, sol.minSep);
    for (let k = 0; k < 6; k++) { worst = Math.max(worst, norm(sub(cf.A[k], sol.A[k]))); scaleA = Math.max(scaleA, norm(sol.A[k])); const s = norm(cf.V[k]); spd = [Math.min(spd[0], s), Math.max(spd[1], s)]; const r = norm(cf.X[k]); rad = [Math.min(rad[0], r), Math.max(rad[1], r)]; maxZ = Math.max(maxZ, Math.abs(cf.X[k][2])); }
  }
  return { singular: false, maxResidual: worst, maxResidualNormalized: worst / (c.w * c.w * rhoEff(c)), maxResidualOverMaxA: worst / scaleA, minSep, speedRange: spd, radiusRange: rad, maxZ };
}
const cost = (r) => Math.sqrt(r.reduce((s, v) => s + v * v, 0) / r.length);

const out = { startedAt: new Date().toISOString(), M, Nc, gauges: 'a_0 = 0, b_x1 = a_y1 = a_z1 = b_z1 = 0', knownCases: {}, target: {} };

// ---------------- known case: alternating polarity, hexagon seed ----------------
{
  const q = [1, -1, 1, -1, 1, -1];
  const rho = 1, Om = Math.sqrt((5 / 4 - 1 / Math.sqrt(3)) / rho ** 3);
  const a = [[rho, 0, 0], ...Array.from({ length: M - 1 }, () => [0, 0, 0])];
  const b = [[0, rho, 0], ...Array.from({ length: M - 1 }, () => [0, 0, 0])];
  const p0 = pack(Om, a, b);
  const r0 = residualVector(p0, q, [0, 1, 2]);
  const r1 = residualVector(pack(1.01 * Om, a, b), q, [0, 1, 2]);
  const fit = levenbergMarquardt((p) => residualVector(p, q, [0, 1, 2]), p0.map((v, i) => (i === 0 ? v * 1.05 : v + 0.05 * (i % 2 ? 1 : -1))), { maxIter: 60 });
  const full = fullPeriodResidual(fit.p, q);
  const pass = Math.max(...r0.map(Math.abs)) <= 1e-13 && Math.max(...r1.map(Math.abs)) >= 1e-3 && full.maxResidualNormalized <= 1e-9;
  out.knownCases.alternatingHexagon = { collocationMaxResidual: Math.max(...r0.map(Math.abs)), at1percentOmega: Math.max(...r1.map(Math.abs)), refitFromPerturbedSeed: { rms: fit.rms, iterations: fit.iterations, omega: fit.p[0], omegaExpected: Om, fullPeriod: full }, pass };
  log(`known case (alternating hexagon, M=${M}, Nc=${Nc}): collocation max residual ${Math.max(...r0.map(Math.abs)).toExponential(2)}; at 1.01 Omega ${Math.max(...r1.map(Math.abs)).toExponential(2)}; refit from a perturbed seed: rms ${fit.rms.toExponential(2)} in ${fit.iterations} it., omega ${fit.p[0].toFixed(8)} (hexagon family: any radius; full-period normalized residual ${full.maxResidualNormalized.toExponential(2)}, radius range ${full.radiusRange.map((v) => v.toFixed(6))}) ${pass ? 'PASS' : 'FAIL'}`);
  if (!pass) { writeFileSync('weber-binding-sphere-reference-choreography.json', JSON.stringify(out, jsonNum, 2)); process.exit(1); }
}

// ---------------- target: polarity ordering (+,+,+,-,-,-) ----------------
{
  const q = [1, 1, 1, -1, -1, -1];
  const members = [0, 1, 2];
  const results = [];
  const run = (name, p0, wFixed = null) => {
    const r0 = residualVector(p0, q, members);
    const lo = wFixed ?? 0.1, hi = wFixed ?? 5;
    const fit = levenbergMarquardt((p) => residualVector(p, q, members), p0, { maxIter: 300, lower: [lo, ...new Array(p0.length - 1).fill(-Infinity)], upper: [hi, ...new Array(p0.length - 1).fill(Infinity)] });
    const full = fullPeriodResidual(fit.p, q);
    const row = { seed: name, initialRms: cost(r0), rms: fit.rms, maxCollocation: Math.max(...fit.residual.map(Math.abs)), iterations: fit.iterations, converged: fit.converged, omega: fit.p[0], coefficients: unpack(fit.p), fullPeriod: full };
    results.push(row);
    log(`${name}: rms ${cost(r0).toExponential(2)} -> ${fit.rms.toExponential(3)} (max ${row.maxCollocation.toExponential(3)}) in ${fit.iterations} it.; omega=${fit.p[0].toFixed(5)}; full period: normalized max ${full.singular ? 'singular' : full.maxResidualNormalized.toExponential(3)} (raw ${full.singular ? '-' : full.maxResidual.toExponential(3)}, /max|A| ${full.singular ? '-' : full.maxResidualOverMaxA.toExponential(3)}), minSep ${full.singular ? '-' : full.minSep.toFixed(4)}, radius ${full.singular ? '-' : full.radiusRange.map((v) => v.toFixed(3))}, speed ${full.singular ? '-' : full.speedRange.map((v) => v.toFixed(3))}, max|z| ${full.singular ? '-' : full.maxZ.toExponential(2)}`);
  };
  // seed 1: the circle (six members equally spaced on a circle of radius 1 with ordering +++---), rate of the hexagon
  const Om = Math.sqrt(5 / 4 - 1 / Math.sqrt(3));
  run('circle rho=1, omega=hexagon rate', pack(Om, [[1, 0, 0], ...Array.from({ length: M - 1 }, () => [0, 0, 0])], [[0, 1, 0], ...Array.from({ length: M - 1 }, () => [0, 0, 0])]));
  run('circle rho=1, omega=0.5', pack(0.5, [[1, 0, 0], ...Array.from({ length: M - 1 }, () => [0, 0, 0])], [[0, 1, 0], ...Array.from({ length: M - 1 }, () => [0, 0, 0])]));
  // seeds 2-6: five seeded random curves (seed 20261005), coefficients decaying as 1/m^2, radius about 1
  const rng = makeRng(20261005);
  for (let s = 1; s <= 5; s++) {
    const a = [], b = [];
    for (let m = 1; m <= M; m++) { a.push([rng.gauss(), rng.gauss(), rng.gauss()].map((v) => 0.6 * v / (m * m))); b.push([rng.gauss(), rng.gauss(), rng.gauss()].map((v) => 0.6 * v / (m * m))); }
    a[0][0] = 0.8 + 0.4 * rng.next(); b[0][1] = 0.8 + 0.4 * rng.next();
    run(`random curve ${s}`, pack(0.3 + 0.9 * rng.next(), a, b));
  }
  // fixed-rate runs (omega held at the hexagon rate at rho = 1 and at 0.5), circle seed and two random seeds, so that the floor is not read at the omega box edge
  const Om1 = Math.sqrt(5 / 4 - 1 / Math.sqrt(3));
  for (const wf of [Om1, 0.5]) {
    run(`circle rho=1, omega fixed ${wf.toFixed(4)}`, pack(wf, [[1, 0, 0], ...Array.from({ length: M - 1 }, () => [0, 0, 0])], [[0, 1, 0], ...Array.from({ length: M - 1 }, () => [0, 0, 0])]), wf);
    const rng2 = makeRng(20261005 + 7);
    for (let s = 1; s <= 2; s++) { const a = [], b = []; for (let m = 1; m <= M; m++) { a.push([rng2.gauss(), rng2.gauss(), rng2.gauss()].map((v) => 0.6 * v / (m * m))); b.push([rng2.gauss(), rng2.gauss(), rng2.gauss()].map((v) => 0.6 * v / (m * m))); } a[0][0] = 0.8 + 0.4 * rng2.next(); b[0][1] = 0.8 + 0.4 * rng2.next(); run(`random curve ${s} (seed+7), omega fixed ${wf.toFixed(4)}`, pack(wf, a, b), wf); }
  }
  results.sort((p, q2) => p.rms - q2.rms);
  out.target = { polarities: q, enforcedMembers: members, seeds: results.length, floorRms: results[0].rms, floorMaxCollocation: results[0].maxCollocation, floorSeed: results[0].seed, floorFullPeriod: results[0].fullPeriod, results };
  log(`target floor: rms ${results[0].rms.toExponential(3)} (max collocation ${results[0].maxCollocation.toExponential(3)}) from seed "${results[0].seed}"`);
}
out.finishedAt = new Date().toISOString();
writeFileSync('weber-binding-sphere-reference-choreography.json', JSON.stringify(out, jsonNum, 2));
log('wrote weber-binding-sphere-reference-choreography.json');
