#!/usr/bin/env node
// weber-binding-sphere-f3-shooting.mjs — family F3, shooting strata.
// States on the sphere of radius R = 1 with tangential velocities of equal speed v and sum X = sum V = 0, evolved
// under the full law; objective J = max_{T <= Tw} max_i [ | |X_i| - R |/R + | |V_i| - v |/v ].
// Stratum 'c3': cyclic C3 symmetry about z with three opposite-polarity pairs.  Members 0,2,4 (q=+1) are the
//   120-degree rotations of a generator at colatitude theta+, azimuth 0, tangent direction psi+; members 1,3,5
//   (q=-1) are the rotations of a generator at colatitude pi - theta+ (so that the z-sums of positions cancel),
//   azimuth phi-, direction psi- with cos(psi-) = -cos(psi+) (so that the z-sums of velocities cancel), i.e.
//   psi- = pi - psi+ (branch 0) or pi + psi+ (branch 1).  The x,y sums vanish by the C3 symmetry.  Parameters:
//   (theta+, psi+, phi-, v) plus the branch; the C3 subspace is invariant under the law because the solve is unique.
// Stratum 'free': members 0..4 free on the sphere (theta_i, phi_i) with tangent direction psi_i, member 5 fixed by
//   X_5 = -sum X_i, V_5 = -sum V_i; its sphere and speed defects at T = 0 are part of J.  16 parameters.
// Each start: jet filter (Nelder-Mead on the T = 0 jet score, no integration), then Nelder-Mead on J (RK4, 512
// steps per window), then Levenberg-Marquardt on the discretised residual.  Candidates with J <= 1e-6 are
// re-evaluated with GBS over 2 Tw.  Heartbeat every start.
// Usage: node weber-binding-sphere-f3-shooting.mjs --stratum c3|free [--starts N] [--seed S]
import fs from 'node:fs';
import path from 'node:path';
import {
  COEFF, HEX_Q, HERE, DATA_DIR, ensureDirs, params, utc, log, writeJson, v3, stateFrom, getX, getV, minSeparation, shootingObjective, jetConditions,
  levenbergMarquardt, nelderMead, rng, integrate, monodromy, energyLike, sigmaSum, speedLabels,
} from './weber-binding-sphere-instrument.mjs';
import { REPO_ROOT, solveAccelerations } from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';

ensureDirs();
const arg = (name, dflt) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : dflt; };
const STRATUM = arg('--stratum', 'c3'), NSTARTS = Number(arg('--starts', 100)), SEED = Number(arg('--seed', 20261007));
const OUT = path.join(DATA_DIR, 'f3'); fs.mkdirSync(OUT, { recursive: true });
const RECEIPT = path.join(HERE, `weber-binding-sphere-f3-shooting-${STRATUM}.json`);
const R = 1, Q = HEX_Q, P = params(Q, COEFF, 'none');
const OmegaBinary = Math.sqrt(1 / (4 * R * R * R)), TwBase = 2 * Math.PI / OmegaBinary; // 4 pi at R = 1
const rec = { family: `F3 shooting, stratum ${STRATUM}`, law: COEFF, polarities: Q, R, started: utc(), seed: SEED, starts: NSTARTS, window: { TwBase, note: 'Tw = max(2 pi / Omega_binary(R), time of the first zero of X_i.V_i measured on a coarse pre-integration), capped at 3 TwBase' }, settings: { rk4Steps: 512, jetNelderMeadEvals: 400, objectiveNelderMeadEvals: STRATUM === 'c3' ? 400 : 500, windowFractions: [0.125, 0.25, 0.5, 1], lmIter: STRATUM === 'c3' ? 25 : 10, vBox: [0.05, 3], candidateThreshold: 1e-6, preregisteredThreshold: 1e-8 } };

const clampV = u => Math.min(3, Math.max(0.05, Math.abs(u)));
function sph(th, ph) { return [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)]; }
function tangent(th, ph, psi) { const et = [Math.cos(th) * Math.cos(ph), Math.cos(th) * Math.sin(ph), -Math.sin(th)], ep = [-Math.sin(ph), Math.cos(ph), 0]; return v3.add(v3.scale(et, Math.cos(psi)), v3.scale(ep, Math.sin(psi))); }
function rotz(a, x) { const c = Math.cos(a), s = Math.sin(a); return [c * x[0] - s * x[1], s * x[0] + c * x[1], x[2]]; }

// parameters -> {y, v}
function stateC3(p, branch) {
  const [thp, psip, phm, vraw] = p, v = clampV(vraw), psim = branch === 0 ? Math.PI - psip : Math.PI + psip, thm = Math.PI - thp;
  const Xp = v3.scale(sph(thp, 0), R), Vp = v3.scale(tangent(thp, 0, psip), v), Xm = v3.scale(sph(thm, phm), R), Vm = v3.scale(tangent(thm, phm, psim), v);
  const xs = [], vs = [];
  for (let k = 0; k < 3; k++) { const a = 2 * Math.PI * k / 3; xs.push(rotz(a, Xp), rotz(a, Xm)); vs.push(rotz(a, Vp), rotz(a, Vm)); }
  return { y: stateFrom(xs, vs), v };
}
function stateFree(p) {
  const v = clampV(p[15]), xs = [], vs = [];
  for (let i = 0; i < 5; i++) { const th = p[3 * i], ph = p[3 * i + 1], psi = p[3 * i + 2]; xs.push(v3.scale(sph(th, ph), R)); vs.push(v3.scale(tangent(th, ph, psi), v)); }
  let sx = [0, 0, 0], sv = [0, 0, 0]; for (let i = 0; i < 5; i++) { sx = v3.add(sx, xs[i]); sv = v3.add(sv, vs[i]); }
  xs.push(v3.scale(sx, -1)); vs.push(v3.scale(sv, -1));
  return { y: stateFrom(xs, vs), v };
}
const build = STRATUM === 'c3' ? (p, b) => stateC3(p, b) : p => stateFree(p);
const NP = STRATUM === 'c3' ? 4 : 16;

function randomStart(rand) {
  if (STRATUM === 'c3') return { p: [Math.acos(2 * rand() - 1), 2 * Math.PI * rand(), 2 * Math.PI * rand(), 0.2 + 1.3 * rand()], branch: rand() < 0.5 ? 0 : 1 };
  const p = []; for (let i = 0; i < 5; i++) p.push(Math.acos(2 * rand() - 1), 2 * Math.PI * rand(), 2 * Math.PI * rand()); p.push(0.2 + 1.3 * rand()); return { p, branch: 0 };
}
function windowFor(y, v) {
  // first zero of X_i . V_i on a coarse RK4 pre-integration, as a second period estimate
  let tz = null; const N = 6; let prev = null;
  const r = integrate(y, 3 * TwBase, P, { method: 'rk4', h: 3 * TwBase / 600, minSep: 1e-6, onSample: (t, yy) => { if (tz !== null) return; const d = []; for (let i = 0; i < N; i++) d.push(v3.dot(getX(yy, i), getV(yy, N, i))); if (prev && t > 0) for (let i = 0; i < N; i++) if (Math.sign(prev[i]) !== Math.sign(d[i]) && Math.abs(prev[i]) > 1e-9) { tz = t; break; } prev = d; } });
  const Tw = Math.min(3 * TwBase, Math.max(TwBase, tz ?? 0));
  return { Tw, firstZeroXV: tz, preReason: r.reason };
}
function objective(p, branch, Tw, frac = 1) { const st = build(p, branch); return shootingObjective(st.y, { v: st.v, R, Tw: frac * Tw, P, nSteps: Math.max(64, Math.round(512 * frac)), method: 'rk4' }); }

const rand = rng(SEED), starts = [], t0 = Date.now();
let best = null;
for (let s = 0; s < NSTARTS; s++) {
  const ts = Date.now(), st0 = randomStart(rand);
  // sanity: separations at T = 0
  const s0 = build(st0.p, st0.branch); if (minSeparation(s0.y, 6) < 0.05) { s--; continue; }
  // jet filter: minimise the T = 0 jet score without integrating
  const jet0 = jetConditions(s0.y, P, s0.v, R);
  const jetF = p => { const b = build(p, st0.branch); if (minSeparation(b.y, 6) < 0.02) return 1e3; try { return jetConditions(b.y, P, b.v, R).jetScore; } catch { return 1e3; } };
  const nmJet = nelderMead(jetF, st0.p, { maxEval: rec.settings.jetNelderMeadEvals, scale: 0.2 });
  const s1 = build(nmJet.p, st0.branch), jet1 = jetConditions(s1.y, P, s1.v, R);
  const win = windowFor(s1.y, s1.v), Tw = win.Tw;
  // objective minimisation
  const J0 = objective(st0.p, st0.branch, Tw).J, J1 = objective(nmJet.p, st0.branch, Tw).J;
  // window homotopy: minimise J over growing windows so that the optimiser is not dominated by the dispersal at late times
  let pCur = nmJet.p; const homotopy = [];
  for (const frac of rec.settings.windowFractions) { const nmF = nelderMead(p => objective(p, st0.branch, Tw, frac).J, pCur, { maxEval: rec.settings.objectiveNelderMeadEvals, scale: frac === rec.settings.windowFractions[0] ? 0.2 : 0.05 }); pCur = nmF.p; homotopy.push({ frac, J: nmF.f }); }
  const nmJ = { p: pCur };
  const lm = levenbergMarquardt(p => objective(p, st0.branch, Tw).resid, nmJ.p, { maxIter: rec.settings.lmIter, fdStep: 1e-6 });
  const oLM = objective(lm.p, st0.branch, Tw), oNM = objective(nmJ.p, st0.branch, Tw);
  const final = oLM.J <= oNM.J ? { p: lm.p, J: oLM.J, o: oLM, stage: 'lm' } : { p: nmJ.p, J: oNM.J, o: oNM, stage: 'nm' };
  const sF = build(final.p, st0.branch), jetF2 = jetConditions(sF.y, P, sF.v, R);
  const row = { start: s, branch: st0.branch, Tw, firstZeroXV: win.firstZeroXV, jetScoreInitial: jet0.jetScore, jetScoreAfterJetFilter: jet1.jetScore, JInitial: J0, JAfterJetFilter: J1, JAfterNelderMead: oNM.J, homotopy, JAfterLM: oLM.J, J: final.J, stage: final.stage, worstT: final.o.worstT, minSep: final.o.minSep, failed: final.o.failed, reason: final.o.reason, jetScoreFinal: jetF2.jetScore, v: sF.v, p: final.p, wallSeconds: (Date.now() - ts) / 1000 };
  starts.push(row);
  if (!best || row.J < best.J) best = row;
  log(`heartbeat ${STRATUM} start ${s + 1}/${NSTARTS}: J ${J0.toExponential(2)} -> jet ${J1.toExponential(2)} -> NM ${oNM.J.toExponential(2)} -> LM ${oLM.J.toExponential(2)} (${final.o.reason}, minSep ${final.o.minSep.toExponential(2)}, Tw ${Tw.toFixed(2)}, v ${sF.v.toFixed(3)}); best so far ${best.J.toExponential(3)}; wall ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  if ((s + 1) % 5 === 0 || s === NSTARTS - 1) writeJson(RECEIPT, { ...rec, status: 'running', updated: utc(), startsDone: starts.length, best, starts });
}
starts.sort((a, b) => a.J - b.J);
rec.summary = { starts: starts.length, floorJ: starts[0].J, median: starts[Math.floor(starts.length / 2)].J, histogram: { below1e_8: starts.filter(x => x.J <= 1e-8).length, below1e_6: starts.filter(x => x.J <= 1e-6).length, below1e_4: starts.filter(x => x.J <= 1e-4).length, below1e_3: starts.filter(x => x.J <= 1e-3).length, below1e_2: starts.filter(x => x.J <= 1e-2).length, below1e_1: starts.filter(x => x.J <= 1e-1).length, failedWindows: starts.filter(x => x.failed).length }, jetFloor: Math.min(...starts.map(x => x.jetScoreFinal)), bestFive: starts.slice(0, 5), wallSeconds: (Date.now() - t0) / 1000 };
log(`${STRATUM}: floor J = ${starts[0].J.toExponential(4)} (start ${starts[0].start}), histogram ${JSON.stringify(rec.summary.histogram)}`);

// ---------------------------------------------------------------- candidate pipeline (only if a start reaches the candidate threshold)
rec.candidates = [];
for (const row of starts.filter(x => x.J <= rec.settings.candidateThreshold).slice(0, 3)) {
  const st = build(row.p, row.branch), Tw = row.Tw;
  const gbs = shootingObjective(st.y, { v: st.v, R, Tw: 2 * Tw, P, nSteps: 128, method: 'gbs', rtol: 1e-12, atol: 1e-14 });
  // period estimate: closest return to the initial state after T > Tw/4
  let bestRet = null; integrate(st.y, 2 * Tw, P, { method: 'gbs', rtol: 1e-12, atol: 1e-14, hmax: Tw / 200, onSample: (t, yy) => { if (t < Tw / 4) return; let d = 0; for (let k = 0; k < 36; k++) d = Math.max(d, Math.abs(yy[k] - st.y[k])); if (!bestRet || d < bestRet.d) bestRet = { t, d }; } });
  const cand = { start: row.start, J_rk4: row.J, J_gbs_2Tw: gbs.J, returnDistance: bestRet, filters: { HPlus3v2: energyLike(st.y, P) + 3 * st.v * st.v, sigmaSum0: sigmaSum(st.y, P) } };
  if (bestRet && bestRet.d < 1e-3) { try { const mon = monodromy(st.y, bestRet.t, P, { step: 1e-5 }); cand.monodromy = { period: bestRet.t, maxModulus: mon.maxModulus, multipliers: mon.multipliers.slice(0, 12), jacobianErrorEstimate: mon.jacobianErrorEstimate }; } catch (e) { cand.monodromy = { error: e.message }; } }
  // independent perturbed evolutions at two tolerances
  cand.perturbed = [];
  for (const eps of [1e-6, 1e-3]) for (const rtol of [1e-12, 1e-10]) { const yp = Float64Array.from(st.y); const r2 = rng(5 + Math.round(eps * 1e6)); for (let k = 0; k < 18; k++) yp[k] += eps * (2 * r2() - 1); const ev = integrate(yp, 5 * Tw, P, { method: 'gbs', rtol, atol: rtol * 1e-2, hmax: Tw / 100 }); cand.perturbed.push({ eps, rtol, reason: ev.reason, t: ev.t, minSep: ev.minSep, minAbsDet: ev.minAbsDet, maxSpeed: ev.maxSpeed }); }
  rec.candidates.push(cand);
  log(`candidate from start ${row.start}: J_rk4 ${row.J.toExponential(3)}, J_gbs(2Tw) ${gbs.J.toExponential(3)}, return distance ${bestRet ? bestRet.d.toExponential(3) : '—'}`);
}
rec.finished = utc();
writeJson(RECEIPT, { ...rec, starts });
log(`F3 ${STRATUM} receipt written: ${path.relative(REPO_ROOT, RECEIPT)} (wall ${rec.summary.wallSeconds.toFixed(0)}s)`);
