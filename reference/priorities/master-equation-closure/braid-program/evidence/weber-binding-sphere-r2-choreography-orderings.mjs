#!/usr/bin/env node
// weber-binding-sphere-r2-choreography-orderings.mjs — round 2 (PI addition): single-curve choreographies with other
// polarity orderings along the curve.  Six members on one closed curve X_k(T) = X_0(T + k P/6).
//   ordering +-+-+-: the round-1 stratum (shift by one with the polarity flip), one member's equation suffices;
//   ordering +++---: exact symmetry "shift by three with the global flip", X_{k+3}(T) = X_k(T + P/2), q_{k+3} = -q_k,
//                    so the curve must satisfy the equations of members 0, 1 and 2 (nine scalar equations per time);
//   ordering ++--+-: no shift symmetry; all six members' equations on one curve (eighteen per time).
// Representation and gauge as in the round-1 collocation (a_0 = 0, b_x1 = 0, a_y1 = 0, a_z1 = b_z1 = 0), M <= 4.
// Known case: the planar circle with each ordering gives a nonzero, reproducible residual (the circle is not balanced
// for the other orderings), and the alternating ordering reproduces the round-1 zero.  Then: least squares from the
// circle seed (in-plane and with an out-of-plane perturbation) and from random seeds; floors reported.
import path from 'node:path';
import { COEFF, HERE, params, utc, log, writeJson, v3, stateFrom, levenbergMarquardt, rng, hexagonOmega } from './weber-binding-sphere-instrument.mjs';
import { REPO_ROOT, solveAccelerations } from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';

const RECEIPT = path.join(HERE, 'weber-binding-sphere-r2-choreography-orderings.json');
const ORDERINGS = { 'alternating +-+-+-': [1, -1, 1, -1, 1, -1], 'blocked +++---': [1, 1, 1, -1, -1, -1], 'mixed ++--+-': [1, 1, -1, -1, 1, -1] };
const rec = { subject: 'single-curve choreographies with other polarity orderings', law: COEFF, started: utc(), orderings: ORDERINGS, harmonics: 4, gauge: 'a_0 = 0, b_x1 = 0, a_y1 = 0, a_z1 = b_z1 = 0, a_x1 = rho = 1 (scale); w in [0.3, 3] Omega_hex' };
const t0 = Date.now();
function makeLayout(M, pins) { const keys = []; for (let c = 0; c < 3; c++) { for (let m = 0; m <= M; m++) keys.push(`a:${c}:${m}`); for (let m = 1; m <= M; m++) keys.push(`b:${c}:${m}`); } return { M, keys, free: keys.filter(k => !(k in pins)), pins }; }
const W0 = 0.820152260748194; // hexagonOmega(1)
function unpack(layout, p) { const { M } = layout, a = [[], [], []], b = [[], [], []]; let i = 0; for (const k of layout.keys) { const [t, c, m] = k.split(':'); const val = k in layout.pins ? layout.pins[k] : p[i++]; (t === 'a' ? a : b)[Number(c)][Number(m)] = val; } return { a, b, w: Math.min(3 * W0, Math.max(0.3 * W0, Math.abs(p[i]))) }; }
function evalCurve({ a, b, w }, M, T) { const x = [0, 0, 0], v = [0, 0, 0], acc = [0, 0, 0]; for (let c = 0; c < 3; c++) for (let m = 0; m <= M; m++) { const cs = Math.cos(m * w * T), sn = Math.sin(m * w * T), am = a[c][m] ?? 0, bm = m ? (b[c][m] ?? 0) : 0; x[c] += am * cs + bm * sn; v[c] += m * w * (-am * sn + bm * cs); acc[c] += -(m * w) * (m * w) * (am * cs + bm * sn); } return { x, v, acc }; }
function configuration(coef, M, T) { const Per = 2 * Math.PI / coef.w, xs = [], vs = [], as = []; for (let k = 0; k < 6; k++) { const e = evalCurve(coef, M, T + k * Per / 6); xs.push(e.x); vs.push(e.v); as.push(e.acc); } return { xs, vs, as, Per }; }
// collocation residual: equations of the listed members at Nc times, normalised by w^2 R
function collocation(layout, p, Nc, R, q, membersToEnforce) {
  const coef = unpack(layout, p), M = layout.M, Per = 2 * Math.PI / coef.w, P = params(q, COEFF, 'none'), out = [];
  for (let j = 0; j < Nc; j++) { const T = j * Per / Nc, cfg = configuration(coef, M, T), y = stateFrom(cfg.xs, cfg.vs); let A; try { A = solveAccelerations(y, P).A; } catch { return new Array(3 * membersToEnforce.length * Nc).fill(1e3); } for (const i of membersToEnforce) for (let c = 0; c < 3; c++) out.push((cfg.as[i][c] - A[3 * i + c]) / (coef.w * coef.w * R)); }
  return out;
}
function deviations(layout, p, R, n = 256) { const coef = unpack(layout, p), M = layout.M, Per = 2 * Math.PI / coef.w; let dR = 0, zMax = 0; const speeds = []; for (let j = 0; j < n; j++) { const e = evalCurve(coef, M, j * Per / n); speeds.push(v3.norm(e.v)); dR = Math.max(dR, Math.abs(v3.norm(e.x) - R) / R); zMax = Math.max(zMax, Math.abs(e.x[2])); } const vm = speeds.reduce((s, z) => s + z, 0) / n; return { sphereDeviation: dR, speedDeviation: Math.max(...speeds.map(s => Math.abs(s - vm) / vm)), vMean: vm, zMax, w: coef.w }; }
// scale gauge: a_x1 = rho pins the curve's size (the first run without it let the solver shrink the curve to rho ~ 1e-4 with
// w/Omega ~ 1e6 and v ~ 60 c_f, where the normalised residual decreases along the scaling direction without ever vanishing);
// the rate is clamped to [0.3, 3] Omega_hex.
const PINS = { 'a:0:0': 0, 'a:1:0': 0, 'a:2:0': 0, 'b:0:1': 0, 'a:1:1': 0, 'a:2:1': 0, 'b:2:1': 0, 'a:0:1': 1 };
function circleParams(layout, rho, w) { const p = []; for (const k of layout.free) { const [t, c, m] = k.split(':'); p.push((t === 'a' && c === '0' && m === '1') || (t === 'b' && c === '1' && m === '1') ? rho : 0); } p.push(w); return p; }
const enforced = { 'alternating +-+-+-': [0], 'blocked +++---': [0, 1, 2], 'mixed ++--+-': [0, 1, 2, 3, 4, 5] };
const M = 4, Nc = 6 * Math.ceil((4 * M + 2) / 6), rho = 1, rand = rng(41);
rec.results = {};
for (const [name, q] of Object.entries(ORDERINGS)) {
  const layout = makeLayout(M, PINS), en = enforced[name], out = { enforcedMembers: en };
  // known case: the circle at the hexagon rate, residual recorded (zero only for the alternating ordering); reproducibility by a second evaluation
  const pc = circleParams(layout, rho, hexagonOmega(rho)), r1 = collocation(layout, pc, Nc, rho, q, en), r2 = collocation(layout, pc, Nc, rho, q, en);
  out.circleResidual = Math.max(...r1.map(Math.abs)); out.circleReproducible = r1.every((z, i) => z === r2[i]);
  // best circle rate for this ordering (1-D least squares over w), as the seed
  let bestW = null; for (let f = 0.3; f <= 3; f += 0.01) { const pw = pc.slice(); pw[pw.length - 1] = f * hexagonOmega(rho); const rr = Math.max(...collocation(layout, pw, Nc, rho, q, en).map(Math.abs)); if (!bestW || rr < bestW.r) bestW = { w: pw[pw.length - 1], r: rr }; }
  out.circleBestRate = bestW;
  log(`${name}: circle residual at the hexagon rate ${out.circleResidual.toExponential(3)} (reproducible ${out.circleReproducible}); best circle rate w/Omega_hex ${(bestW.w / hexagonOmega(rho)).toFixed(3)} residual ${bestW.r.toExponential(3)}`);
  // least squares from the circle seed (planar), from the circle with an out-of-plane perturbation, and from random seeds
  const runs = [];
  const solve = (label, p0) => { const lm = levenbergMarquardt(p => collocation(layout, p, Nc, rho, q, en), p0, { maxIter: 200, fdStep: 1e-7 }); const d = deviations(layout, lm.p, rho); const row = { label, residual: lm.rmax, iter: lm.iter, reason: lm.reason, ...d, wOverOmegaHex: d.w / hexagonOmega(rho) }; runs.push(row); log(`  ${name} | ${label}: residual ${lm.rmax.toExponential(3)} (${lm.iter} it, ${lm.reason}), sphere dev ${d.sphereDeviation.toExponential(2)}, speed dev ${d.speedDeviation.toExponential(2)}, zMax ${d.zMax.toExponential(2)}, w/Omega ${row.wOverOmegaHex.toFixed(4)}; wall ${((Date.now() - t0) / 1000).toFixed(0)}s`); return row; };
  { const p0 = pc.slice(); p0[p0.length - 1] = bestW.w; solve('circle seed (planar)', p0); }
  for (const eps of [0.05, 0.2]) { const p0 = pc.slice(); p0[p0.length - 1] = bestW.w; layout.free.forEach((k, i) => { if (k.startsWith('a:2:') || k.startsWith('b:2:')) p0[i] += eps * rho * (2 * rand() - 1); }); solve(`circle seed + out-of-plane ${eps}`, p0); }
  for (let s = 0; s < 6; s++) { const p0 = pc.map((z, i) => i < layout.free.length ? z + 0.3 * rho * (2 * rand() - 1) : bestW.w * (0.7 + 0.6 * rand())); solve(`random seed ${s}`, p0); }
  out.runs = runs; out.floor = Math.min(...runs.map(r => r.residual));
  rec.results[name] = out;
  writeJson(RECEIPT, { ...rec, status: 'running', updated: utc() });
}
rec.finished = utc(); rec.wallSeconds = (Date.now() - t0) / 1000;
writeJson(RECEIPT, rec);
log(`receipt ${path.relative(REPO_ROOT, RECEIPT)}; floors ${Object.entries(rec.results).map(([n, r]) => `${n}: ${r.floor.toExponential(3)}`).join('; ')}`);
