#!/usr/bin/env node
// weber-binding-sphere-r2-k3-sector.mjs — round 2: the hexagon's rotating-frame linearization reduced by the sixfold
// characters, with the k = 3 sector (a_j = (-1)^j in the local radial/tangential/axial frames) in closed form.
// The linearized rotating-frame system is M xi'' + 2 Omega J xi' + Kc xi = 0 with M the acceleration matrix, J the
// in-plane rotation generator and Kc = Hess(U) - Omega^2 Pi, U = sum sigma K / d (ring analysis, eq. 5.1); the Weber
// terms enter only through M.  Both M - I and Hess(U) are sums over the three pair types of the hexagon (adjacent:
// sigma = -1, d = rho; next-nearest: sigma = +1, d = sqrt3 rho; opposite: sigma = -1 (members k and k+3 have opposite
// parity), d = 2 rho) with rational
// coefficients in the local-frame mode basis, so the sector blocks are found exactly by evaluating each pair type
// separately (own assembly, independent of the instrument, cross-checked against it at the frozen weights).
// Output: exact sector blocks, the k = 3 characteristic polynomial in s = z^2 with x = rho c_f^2/K, its roots on a
// radius grid, and the comparison with the numerically projected Jacobian of the full nonlinear vector field.
import path from 'node:path';
import { COEFF, HEX_Q, HERE, params, utc, log, writeJson, hexagon, hexagonOmega } from './weber-binding-sphere-instrument.mjs';
import { assemble, jacobian, eigenvalues, rotatingDerivative, packState, REPO_ROOT } from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';

const RECEIPT = path.join(HERE, 'weber-binding-sphere-r2-k3-sector.json');
const rec = { subject: 'hexagon linearization by sixfold character; k = 3 sector closed form', started: utc() };
const s3 = Math.sqrt(3);
// pair types of the hexagon at unit radius
const TYPE = (i, j) => { const d = Math.min((j - i + 6) % 6, (i - j + 6) % 6); return d === 1 ? 'adj' : d === 2 ? 'nn' : 'opp'; };
// own assembly of M - I = -sum alpha_ij u_ij u_ij^T and of Hess(U) with per-type weights (alpha per type; hess per type)
function ownMminusI(X, wAlpha) {
  const n = 18, D = Array.from({ length: n }, () => new Float64Array(n));
  for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) { const d = [X[i][0] - X[j][0], X[i][1] - X[j][1], X[i][2] - X[j][2]], r = Math.hypot(...d), e = d.map(z => z / r), al = wAlpha[TYPE(i, j)]; for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) { const t = al * e[a] * e[b]; D[3 * i + a][3 * i + b] -= t; D[3 * j + a][3 * j + b] -= t; D[3 * i + a][3 * j + b] += t; D[3 * j + a][3 * i + b] += t; } }
  return D;
}
function ownHess(X, wHess) {
  // Hessian of sum_{i<j} c_type / d_ij: pair block (c/d^3)(3 e e^T - I) on (i,i) and (j,j), negative on (i,j),(j,i)
  const n = 18, H = Array.from({ length: n }, () => new Float64Array(n));
  for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) { const d = [X[i][0] - X[j][0], X[i][1] - X[j][1], X[i][2] - X[j][2]], r = Math.hypot(...d), e = d.map(z => z / r), c = wHess[TYPE(i, j)] / (r * r * r); for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) { const t = c * (3 * e[a] * e[b] - (a === b ? 1 : 0)); H[3 * i + a][3 * i + b] += t; H[3 * j + a][3 * j + b] += t; H[3 * i + a][3 * j + b] -= t; H[3 * j + a][3 * i + b] -= t; } }
  return H;
}
// local-frame sector basis vectors for character k (cos/sin patterns), components r, t, z
function modes(k, pattern) {
  const out = [];
  for (const comp of ['r', 't', 'z']) { const v = new Float64Array(18); for (let j = 0; j < 6; j++) { const th = j * Math.PI / 3, ph = 2 * Math.PI * j * k / 6, amp = pattern === 'cos' ? Math.cos(ph) : Math.sin(ph); const dir = comp === 'r' ? [Math.cos(th), Math.sin(th), 0] : comp === 't' ? [-Math.sin(th), Math.cos(th), 0] : [0, 0, 1]; for (let c = 0; c < 3; c++) v[3 * j + c] = amp * dir[c]; } let nn = 0; for (const z of v) nn += z * z; if (nn > 1e-12) out.push(v.map(z => z / Math.sqrt(nn))); }
  return out;
}
const project = (A, S) => S.map(u => S.map(w => { let acc = 0; for (let i = 0; i < 18; i++) { let r = 0; for (let j = 0; j < 18; j++) r += A[i][j] * w[j]; acc += u[i] * r; } return acc; }));
const ratId = v => { for (let q = 1; q <= 64; q++) { const p = Math.round(v * q); if (Math.abs(v * q - p) < 1e-9) return `${p}/${q}`; } return null; };
const X1 = hexagon(1), S3 = modes(3, 'cos');
// per-type coefficient matrices of the k = 3 sector blocks
rec.k3 = { basis: 'a_j = (-1)^j r_j, b_j = (-1)^j t_j, c_j = (-1)^j z (unit normalised)', MminusI: {}, HessU: {} };
for (const type of ['adj', 'nn', 'opp']) {
  const w = { adj: 0, nn: 0, opp: 0 }; w[type] = 1;
  rec.k3.MminusI[type] = project(ownMminusI(X1, w), S3).map(r => r.map(ratId));
  rec.k3.HessU[type] = project(ownHess(X1, w), S3).map(r => r.map(ratId));
}
log(`k=3 (M - I) coefficient per unit alpha: adj ${JSON.stringify(rec.k3.MminusI.adj)}, nn ${JSON.stringify(rec.k3.MminusI.nn)}, opp ${JSON.stringify(rec.k3.MminusI.opp)}`);
log(`k=3 Hess(U) coefficient per unit c/d^3: adj ${JSON.stringify(rec.k3.HessU.adj)}, nn ${JSON.stringify(rec.k3.HessU.nn)}, opp ${JSON.stringify(rec.k3.HessU.opp)}`);
// the same for every character, for the record
rec.allSectors = {};
for (const [name, list] of [['k0', [[0, 'cos']]], ['k3', [[3, 'cos']]], ['k1cos', [[1, 'cos']]], ['k1sin', [[1, 'sin']]], ['k2cos', [[2, 'cos']]], ['k2sin', [[2, 'sin']]]]) {
  let S = []; for (const [k, p] of list) S = S.concat(modes(k, p));
  const entry = { dim: S.length, MminusI: {}, HessU: {} };
  for (const type of ['adj', 'nn', 'opp']) { const w = { adj: 0, nn: 0, opp: 0 }; w[type] = 1; entry.MminusI[type] = project(ownMminusI(X1, w), S).map(r => r.map(ratId)); entry.HessU[type] = project(ownHess(X1, w), S).map(r => r.map(ratId)); }
  rec.allSectors[name] = entry;
}
// frozen weights: alpha = sigma K mu / d (at x = 1): adj -1, nn 1/sqrt3, opp 1/2; Hess c = sigma K: adj -1, nn +1, opp +1 (d^-3 applied inside)
const ALPHA = { adj: -1, nn: 1 / s3, opp: -1 / 2 }, CH = { adj: -1, nn: 1, opp: -1 };
// cross-check own M against the instrument's at x = 1 and x = 2.5
{ const P = params(HEX_Q); let worst = 0; for (const x of [1, 2.5]) { const X = hexagon(x), y = packState(X.map((xx, i) => ({ x: xx, v: [0, 0, 0], q: HEX_Q[i] }))), { M } = assemble(y, P), own = ownMminusI(X, { adj: -1 / x, nn: 1 / (s3 * x), opp: -1 / (2 * x) }); for (let i = 0; i < 18; i++) for (let j = 0; j < 18; j++) worst = Math.max(worst, Math.abs(M[i * 18 + j] - (i === j ? 1 : 0) - own[i][j])); } rec.ownMvsInstrument = worst; log(`own M - I against the instrument's assembly: ${worst.toExponential(2)}`); }
{ const S0 = modes(0, 'cos'); rec.k0frozen = { MminusI_x1: project(ownMminusI(X1, ALPHA), S0), HessU: project(ownHess(X1, CH), S0) }; log(`k=0 frozen M - I at x=1: ${JSON.stringify(rec.k0frozen.MminusI_x1.map(r => r.map(v => +v.toFixed(10))))}`);
  const S1 = modes(1, 'cos').concat(modes(1, 'sin')); const M1 = project(ownMminusI(X1, ALPHA), S1); rec.k1frozen = { MminusI_x1: M1, eigenvalues: eigenvalues(M1.map(r => Array.from(r))).map(z => z.re).sort((a, b) => a - b) }; log(`k=1 (cos+sin) frozen M - I at x=1 eigenvalues: ${rec.k1frozen.eigenvalues.map(v => v.toFixed(10)).join(', ')}`); const S2 = modes(2, 'cos').concat(modes(2, 'sin')); const M2 = project(ownMminusI(X1, ALPHA), S2); rec.k2frozen = { eigenvalues: eigenvalues(M2.map(r => Array.from(r))).map(z => z.re).sort((a, b) => a - b) }; log(`k=2 (cos+sin) eigenvalues: ${rec.k2frozen.eigenvalues.map(v => v.toFixed(10)).join(', ')}`); }
// k = 3 blocks in closed form: m = 1 + c/x on the diagonal, stiffness kappa (units K/rho^3) minus Omega^2 Pi
const Mk3 = project(ownMminusI(X1, ALPHA), S3), Hk3 = project(ownHess(X1, CH), S3);
const Om2 = 5 / 4 - 1 / s3; // Omega^2 in units K/rho^3
const Kk3 = Hk3.map((r, i) => r.map((v, j) => v - (i === j && i < 2 ? Om2 : 0)));
rec.k3.frozen = { MminusI_x1: Mk3, Kc_unitsK_rho3: Kk3, Omega2_unitsK_rho3: Om2 };
log(`k=3 frozen blocks: M - I at x=1 = ${JSON.stringify(Mk3.map(r => r.map(v => +v.toFixed(12))))}; Kc = ${JSON.stringify(Kk3.map(r => r.map(v => +v.toFixed(12))))}`);
// closed-form constants in Q(sqrt3): identify each entry as p + q sqrt3
const idQ3 = v => { for (let qd = 1; qd <= 48; qd++) for (let qb = -96; qb <= 96; qb++) { const a = v - qb / qd * s3; const pa = Math.round(a * qd); if (Math.abs(a * qd - pa) < 1e-10) return { p: `${pa}/${qd}`, q: `${qb}/${qd}`, value: pa / qd + qb / qd * s3 }; } return null; };
rec.k3.closedForm = { m_a: idQ3(Mk3[0][0]), m_b: idQ3(Mk3[1][1]), m_c: idQ3(Mk3[2][2]), m_ab: Mk3[0][1], k_a: idQ3(Kk3[0][0]), k_b: idQ3(Kk3[1][1]), k_c: idQ3(Kk3[2][2]), k_ab: Kk3[0][1], Omega2: idQ3(Om2) };
log(`closed forms: ${JSON.stringify(rec.k3.closedForm)}`);
// characteristic polynomial of the in-plane k = 3 block, s = z^2 in units K/rho^3:
//   (m_a s + k_a)(m_b s + k_b) + 4 Omega^2 s, with m = 1 + c/x.  Roots and the full-sector eigenvalues on a radius grid.
const ca = Mk3[0][0], cb = Mk3[1][1], ka = Kk3[0][0], kb = Kk3[1][1], kc = Kk3[2][2];
function k3roots(x) {
  const ma = 1 + ca / x, mb = 1 + cb / x, A = ma * mb, B = ma * kb + mb * ka + 4 * Om2, C = ka * kb, disc = B * B - 4 * A * C;
  const unit = Math.pow(x, -3); // K/rho^3 with K = 1
  const s = disc >= 0 ? [(-B + Math.sqrt(disc)) / (2 * A), (-B - Math.sqrt(disc)) / (2 * A)] : null;
  const z = s ? s.map(v => v >= 0 ? { re: Math.sqrt(v * unit), im: 0 } : { re: 0, im: Math.sqrt(-v * unit) }) : [{ re: Math.sqrt(-B / (2 * A)), note: 'complex s' }];
  return { x, ma, mb, A, B, C, disc, s, growthRate: s ? Math.max(...s.map(v => v > 0 ? Math.sqrt(v * unit) : 0)) : NaN, axialFrequency: Math.sqrt(kc * unit), Omega: Math.sqrt(Om2 * unit), z };
}
rec.k3.rootCheck = [];
const P = params(HEX_Q);
for (const x of [0.1, 0.3, 0.5, 5 / 4 - 1 / s3, 1, 1.5, 1.7, 1.75, 2, 3, 5, 10]) {
  const r = k3roots(x);
  // numerical: projected Jacobian of the full rotating-frame vector field on the k = 3 sector (36-state)
  const Om = hexagonOmega(x), X = hexagon(x), y = packState(X.map((xx, i) => ({ x: xx, v: [0, 0, 0], q: HEX_Q[i] })));
  const F = yy => rotatingDerivative(yy, P, [0, 0, Om]), { J } = jacobian(F, y, { step: 1e-4 });
  const S = []; for (const blk of [0, 18]) for (const m of modes(3, 'cos')) { const v = new Float64Array(36); for (let i = 0; i < 18; i++) v[blk + i] = m[i]; S.push(v); }
  const Jr = S.map(u => S.map(w => { let acc = 0; for (let i = 0; i < 36; i++) { let rr = 0; for (let j = 0; j < 36; j++) rr += J[i][j] * w[j]; acc += u[i] * rr; } return acc; }));
  const eig = eigenvalues(Jr), maxRe = Math.max(...eig.map(z => z.re)), axial = eig.filter(z => Math.abs(z.re) < 1e-6 && z.im > 0).map(z => z.im), axialNum = axial.length ? Math.max(...axial) : NaN;
  const all = eig.map(z => ({ re: z.re, im: z.im }));
  rec.k3.rootCheck.push({ x, closedForm: { growthRate: r.growthRate, growthOverOmega: r.growthRate / r.Omega, s: r.s, A: r.A, B: r.B, C: r.C, axialFrequency: r.axialFrequency }, numerical: { maxRealPart: maxRe, axialFrequency: axialNum, eigenvalues: all }, relDiff: Math.abs(maxRe - r.growthRate) / r.growthRate, axialRelDiff: Math.abs(axialNum - r.axialFrequency) / r.axialFrequency });
  log(`x=${x.toFixed(5)}: closed-form growth ${r.growthRate.toFixed(8)} (s roots ${r.s?.map(v => v.toFixed(6)).join(', ')}; A ${r.A.toFixed(4)} B ${r.B.toFixed(4)} C ${r.C.toFixed(4)}), numerical max Re ${maxRe.toFixed(8)}, rel diff ${(Math.abs(maxRe - r.growthRate) / r.growthRate).toExponential(2)}; axial ${r.axialFrequency.toFixed(8)} vs ${axialNum.toFixed(8)}`);
}
rec.k3.proof = { statement: 'k_a k_b < 0 with m_a, m_b > 0 for every x > 0 implies the quadratic A s^2 + B s + C has A > 0, C < 0, hence one real positive root s and a real growth rate sqrt(s) at every x > 0; the sector does not contain the breathing kernel, so x = sqrt3 is excluded only because the full solve is singular there', ka, kb, kakb: ka * kb, ca, cb, positiveConstants: ca > 0 && cb > 0 };
rec.finished = utc();
writeJson(RECEIPT, rec);
log(`receipt ${path.relative(REPO_ROOT, RECEIPT)}`);
