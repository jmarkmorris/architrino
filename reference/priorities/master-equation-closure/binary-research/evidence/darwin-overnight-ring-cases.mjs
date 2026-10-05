#!/usr/bin/env node
// darwin-overnight-ring-cases.mjs
// Wrapper around the frozen pair instrument darwin-overnight-pair-instrument.mjs
// (not modified here) for the four-member alternating ring under the frozen
// Darwin-inspired law of manuscript.md Section 10 (common brief
// .tmp/darwin-overnight/pi/common-brief.md). Worker: darwin-overnight ring
// instrument (lens henri-poincare). Node v22, no dependencies.
//
// The wrapper only (1) builds N = 4 ring preparations, (2) calls the pair
// instrument's exported runCase() at the frozen settings, and (3) reduces each
// run record to ring observables. No integration arithmetic lives here.
//
// Ring (braid-program/analysis/darwin-overnight-ring.md, Sections 1 and 3):
// member k at angle phi_k = k pi/2 on a circle of radius R in the z = 0 plane,
// polarities (+,-,+,-), velocity v along the local tangent t_k = (-sin, cos, 0).
// Exact balance relation of the full law:  v^2 = 2 (2 sqrt2 - 1) / (8R - 1 - sqrt2),
// Omega = v / R, period 2 pi R / v.  Zero-coupling counterpart (velocity-coupling
// term deleted, inverse-distance term kept, H = I):  v0^2 = (2 sqrt2 - 1) / (4R).
// Invariants at balance (Section 5): E = 2v^2 + (1 - 2 sqrt2)/R - (1 + sqrt2) v^2/(2R),
// P = 0, J_z = 4 R v - (1 + sqrt2) v. These are invariants of the adapted law,
// not physical accounts.
//
// Known cases (run before any target; receipt darwin-overnight-ring-instrument-controls.json):
//   K1 pair-instrument controls rerun, receipt unchanged;
//   K2 zero-coupling ring (coupling: 0) rigid rotation against the closed form,
//      and interaction: 0 straight lines for N = 4;
//   K3 exact ring R = 50 under the full law, one period.
// Targets: T1 R=50, T2 R=100 exact rings; T3..T6 perturbations at R=50
// (breathing, rhombic shear, tilt, centre drift), optionally repeated at R=100.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runCase, invariants, K, CF } from './darwin-overnight-pair-instrument.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '../../../../..');
const OUT_DIR = path.join(REPO, '.local-data/master-equation-closure/darwin-overnight/instrument/ring');
const RECEIPT_PATH = path.join(HERE, 'darwin-overnight-ring-instrument-controls.json');
const PAIR_RECEIPT_PATH = path.join(HERE, 'darwin-overnight-pair-instrument-controls.json');
const SQ2 = Math.SQRT2;

// ----------------------------------------------------------- closed forms
export function ringBalanceSpeed(R) { return Math.sqrt(2 * (2 * SQ2 - 1) / (8 * R - 1 - SQ2)); }
export function ringZeroCouplingSpeed(R) { return Math.sqrt((2 * SQ2 - 1) / (4 * R)); }
export function ringPeriod(R, v) { return 2 * Math.PI * R / v; }
export function ringInvariantsClosedForm(R, v) {
  return { E: 2 * v * v + (1 - 2 * SQ2) / R - (1 + SQ2) * v * v / (2 * R), P: [0, 0, 0], Jz: 4 * R * v - (1 + SQ2) * v };
}

// ----------------------------------------------------------- preparations
// Frozen settings of preregistration Section 2 (events and obstruction parameters).
export const FROZEN = { rContact: 1e-3, rEscape: 1e4, speedBound: 0.1, epsBound: 0.05, detTol: 1e-12, condMax: 1e12, tTol: 1e-9 };
export const SETTINGS = {
  P: { label: 'dp54-rtol1e-10', integrator: 'dp54', rtol: 1e-10, atol: 1e-12 },
  C: { label: 'dp54-rtol1e-12', integrator: 'dp54', rtol: 1e-12, atol: 1e-12 },
  R: { label: 'rk4-h5', integrator: 'rk4', h: 5 },
};

// pert: { radii: [f0,f1,f2,f3] multiplicative radius factors, z: [dz0..dz3], vCommon: [vx,vy,vz] }
export function buildRing(R, v, pert = {}) {
  const radii = pert.radii || [1, 1, 1, 1], z = pert.z || [0, 0, 0, 0], vc = pert.vCommon || [0, 0, 0];
  const positions = [], velocities = [], polarities = [1, -1, 1, -1];
  for (let k = 0; k < 4; k++) {
    const phi = k * Math.PI / 2;
    // exact unit vectors at multiples of pi/2 (avoid cos(pi/2) = 6e-17)
    const c = [1, 0, -1, 0][k], s = [0, 1, 0, -1][k];
    positions.push([R * radii[k] * c, R * radii[k] * s, z[k]]);
    velocities.push([-v * s + vc[0], v * c + vc[1], vc[2]]);
    void phi;
  }
  return { positions, velocities, polarities };
}

export function makeSpec(id, R, v, periods, setting, pert = {}, extra = {}) {
  const T = ringPeriod(R, v);
  const s = SETTINGS[setting];
  const spec = { caseId: `${id}-${s.label}`, ...buildRing(R, v, pert), tMax: periods * T, outputDt: T / 200, ...FROZEN, ...s, ...extra };
  delete spec.label;
  spec.ring = { R, v, period: T, periods, perturbation: pert, setting, settingLabel: s.label };
  return spec;
}

// ----------------------------------------------------------- reduction
function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
function nrm(a) { return Math.hypot(a[0], a[1], a[2]); }
function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
// smallest-eigenvalue eigenvector of a symmetric 3x3 matrix by cyclic Jacobi
function smallestEigvec3(S) {
  const A = S.map((r) => r.slice()); let Vm = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  for (let sweep = 0; sweep < 50; sweep++) {
    let off = 0; for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) off += A[i][j] ** 2;
    if (off < 1e-40) break;
    for (let p = 0; p < 3; p++) for (let q = p + 1; q < 3; q++) {
      if (Math.abs(A[p][q]) < 1e-300) continue;
      const th = (A[q][q] - A[p][p]) / (2 * A[p][q]);
      const t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let k = 0; k < 3; k++) { const akp = A[k][p], akq = A[k][q]; A[k][p] = c * akp - s * akq; A[k][q] = s * akp + c * akq; }
      for (let k = 0; k < 3; k++) { const apk = A[p][k], aqk = A[q][k]; A[p][k] = c * apk - s * aqk; A[q][k] = s * apk + c * aqk; }
      for (let k = 0; k < 3; k++) { const vkp = Vm[k][p], vkq = Vm[k][q]; Vm[k][p] = c * vkp - s * vkq; Vm[k][q] = s * vkp + c * vkq; }
    }
  }
  let im = 0; for (let i = 1; i < 3; i++) if (A[i][i] < A[im][im]) im = i;
  return { value: A[im][im], vector: [Vm[0][im], Vm[1][im], Vm[2][im]] };
}
// Best-fit plane normal of the four members (eigenvector of the smallest
// eigenvalue of the centred scatter matrix) and its angle against z.
function planeTilt(positions) {
  const c = centreOf(positions); const S = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (const p of positions) { const d = sub(p, c); for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) S[i][j] += d[i] * d[j]; }
  const { vector } = smallestEigvec3(S);
  const cosang = Math.min(1, Math.abs(vector[2]) / nrm(vector));
  return Math.acos(cosang);
}
function centreOf(positions) { const c = [0, 0, 0]; for (const p of positions) for (let i = 0; i < 3; i++) c[i] += p[i] / positions.length; return c; }

const ADJ = [[0, 1], [1, 2], [2, 3], [0, 3]], DIAG = [[0, 2], [1, 3]];
const pairKey = (a, b) => `${Math.min(a, b)},${Math.max(a, b)}`;

export function reduceRing(rec, ringMeta) {
  const R = ringMeta.R, T = ringMeta.period;
  const pts = [...rec.samples, ...rec.events];
  const range = () => ({ min: Infinity, max: -Infinity, tMin: null, tMax: null });
  const upd = (rg, v, t) => { if (v < rg.min) { rg.min = v; rg.tMin = t; } if (v > rg.max) { rg.max = v; rg.tMax = t; } };
  const radDev = range(), adj = range(), diag = range(), tilt = range(), centreDist = range(), centreSpeed = range();
  const memberRad = [range(), range(), range(), range()];
  let maxAbsdE = 0, maxdP = 0, maxdJ = 0;
  const J0 = nrm(rec.initialInvariants.J), E0 = rec.initialInvariants.E;
  const c0 = centreOf(rec.samples[0].state.positions);
  const devHistory = []; // per sample: [t, max_k |d_k - R| / R]
  for (const s of pts) {
    const pos = s.state.positions; const c = centreOf(pos);
    let dmaxAbs = 0;
    for (let k = 0; k < 4; k++) { const d = nrm(sub(pos[k], c)); upd(memberRad[k], d, s.t); upd(radDev, (d - R) / R, s.t); dmaxAbs = Math.max(dmaxAbs, Math.abs(d - R) / R); }
    if (s.kind === undefined) devHistory.push([s.t, dmaxAbs]);
    const sep = {}; for (const p of s.pairs) sep[pairKey(...p.pair)] = p.r;
    for (const [a, b] of ADJ) upd(adj, sep[pairKey(a, b)], s.t);
    for (const [a, b] of DIAG) upd(diag, sep[pairKey(a, b)], s.t);
    upd(tilt, planeTilt(pos), s.t);
    upd(centreDist, nrm(sub(c, c0)), s.t);
    upd(centreSpeed, s.centreSpeed, s.t);
    maxAbsdE = Math.max(maxAbsdE, Math.abs(s.dE)); maxdP = Math.max(maxdP, nrm(s.dP)); maxdJ = Math.max(maxdJ, nrm(s.dJ));
  }
  const f = rec.final; const cF = centreOf(f.state.positions);
  const centreDisplacement = sub(cF, c0);
  // return error per period against the preparation (samples sit on the cadence grid; period = 200 cadences)
  const returns = [];
  const x0 = rec.samples[0].state.positions;
  for (let n = 1; n * T <= rec.final.t * (1 + 1e-9); n++) {
    const tn = n * T; let best = null;
    for (const s of rec.samples) if (best === null || Math.abs(s.t - tn) < Math.abs(best.t - tn)) best = s;
    if (!best || Math.abs(best.t - tn) > 1e-6 * T) continue;
    let err = 0; for (let k = 0; k < 4; k++) err = Math.max(err, nrm(sub(best.state.positions[k], x0[k])));
    returns.push({ period: n, t: best.t, maxMemberReturnError: err, relativeToR: err / R });
  }
  // Exponential-growth fit of the radius deviation: least-squares slope of
  // ln(dev) against t over the samples with 1e-9 <= dev <= 1e-4 (a measured
  // rate of departure from the prepared configuration, reported with the
  // window and the number of points; no stability interpretation here).
  // Window: dev between max(1e-9, 10 x initial deviation) and 1e-4 (or 1e-2 when
  // the preparation itself deviates by 1e-4 or more, as the perturbed cases do).
  const dev0 = devHistory[0][1];
  const growthFit = (() => {
    const lo = Math.max(1e-9, 10 * dev0), hi = lo >= 1e-4 ? 1e-2 : 1e-4;
    const w = devHistory.filter(([, d]) => d >= lo && d <= hi);
    if (w.length < 5) return { window: [lo, hi], points: w.length, rate: null };
    let st = 0, sy = 0, stt = 0, sty = 0; for (const [t, d] of w) { const y = Math.log(d); st += t; sy += y; stt += t * t; sty += t * y; }
    const n = w.length, slope = (n * sty - st * sy) / (n * stt - st * st);
    const Om = ringMeta.v / R;
    return { window: [lo, hi], points: n, tFrom: w[0][0], tTo: w[n - 1][0], rate: slope, ratePerOmega: slope / Om, eFoldsPerPeriod: slope * T };
  })();
  // first sample at which the radius deviation exceeds each threshold (in periods)
  const firstCrossing = {}; for (const th of [1e-9, 1e-6, 1e-3, 1e-2, 1e-1]) { const h = devHistory.find(([, d]) => d > th); firstCrossing[th.toExponential(0)] = h ? { t: h[0], periods: h[0] / T } : null; }
  const events = rec.events.map((e) => ({ kind: e.kind, t: e.t, pair: e.pair, member: e.member, direction: e.direction, reason: e.reason, r: e.pair ? e.pairs.find((p) => p.pair[0] === e.pair[0] && p.pair[1] === e.pair[1])?.r : undefined, maxSpeed: e.maxSpeed, detH: e.detH, cond2: e.cond2 }));
  const nonTurning = events.filter((e) => e.kind !== 'turning-point' && e.kind !== 'tMax');
  const speedCf = events.some((e) => e.kind === 'speed-crossing-cf');
  const inside = rec.suprema.speed <= 0.1 && rec.suprema.eps <= 0.05;
  const firstExit = events.find((e) => (e.kind === 'speed-bound' || e.kind === 'eps-bound') && /departure/.test(e.direction || ''));
  const coverage = {
    supMemberSpeed: rec.suprema.speed, maxEps: rec.suprema.eps,
    domain: inside ? 'inside' : (firstExit ? `partially inside; first exit ${firstExit.kind} at T=${firstExit.t}` : 'outside at release'),
    speedLabels: speedCf ? { unrestricted: 'whole interval', inclusiveCeiling: 'until first c_f crossing', strictCeiling: 'until first c_f crossing' } : { unrestricted: 'whole interval', inclusiveCeiling: 'whole interval', strictCeiling: 'whole interval' },
    reachedCf: speedCf,
  };
  return {
    caseId: rec.caseId, setting: ringMeta.settingLabel, R, v: ringMeta.v, period: T, periodsRequested: ringMeta.periods, perturbation: ringMeta.perturbation,
    stopReason: f.stopReason, tEnd: f.t, periodsCompleted: f.t / T, steps: rec.integrator.steps, rejected: rec.integrator.rejected, evaluations: rec.integrator.evaluations, wallMs: rec.wallMs,
    radiusDeviationRel: radDev, memberRadius: memberRad, adjacentSeparation: adj, diagonalSeparation: diag,
    adjacentSeparationExpected: R * SQ2, diagonalSeparationExpected: 2 * R,
    tiltRad: tilt, centreDistanceFromStart: centreDist, centreDisplacement, centreDisplacementNorm: nrm(centreDisplacement), meanCentreVelocity: centreDisplacement.map((d) => d / f.t), centreSpeedRange: centreSpeed,
    invariants: { E0, J0: rec.initialInvariants.J, P0: rec.initialInvariants.P, dErelFinal: f.dErel, dPFinal: nrm(f.dP), dJrelFinal: J0 > 0 ? nrm(f.dJ) / J0 : null, dJFinal: nrm(f.dJ), maxAbsdErel: maxAbsdE / Math.max(Math.abs(E0), 1e-300), maxdP, maxdJrel: J0 > 0 ? maxdJ / J0 : null },
    detHmin: rec.suprema.detMin, detHmax: rec.suprema.detMax, condMax: rec.suprema.condMax,
    eventsInOrder: events, eventCounts: events.reduce((m, e) => { m[e.kind] = (m[e.kind] || 0) + 1; return m; }, {}), nonTurningPointEvents: nonTurning,
    survivesRunLength: f.stopReason === 'tMax' && nonTurning.length === 0,
    endState: f.stopReason !== 'tMax' ? { t: f.t, stopReason: f.stopReason, state: f.state } : null,
    returns, coverage, growthFit, firstCrossing, initialRadiusDeviationRel: dev0, radiusDeviationHistory: devHistory,
    radiusDeviationAtPeriod: returns.map((r) => { const h = devHistory.find(([t]) => Math.abs(t - r.t) <= 1e-9 * Math.max(1, r.t)); return { period: r.period, maxAbsDev: h ? h[1] : null }; }),
  };
}

// ----------------------------------------------------------- running
function ensureOut() { fs.mkdirSync(OUT_DIR, { recursive: true }); }
export function runRing(spec) {
  ensureOut();
  const rec = runCase(spec);
  const red = reduceRing(rec, spec.ring);
  const base = path.join(OUT_DIR, spec.caseId.replace(/[^A-Za-z0-9_.-]/g, '_'));
  fs.writeFileSync(`${base}.json`, JSON.stringify(rec));
  fs.writeFileSync(`${base}.reduced.json`, JSON.stringify(red, null, 1));
  red.runRecord = `${base}.json`; red.reducedRecord = `${base}.reduced.json`;
  return { rec, red };
}
function line(red) {
  const rd = red.radiusDeviationRel, inv = red.invariants;
  return `${red.caseId}: stop=${red.stopReason} t=${red.tEnd.toPrecision(10)} (${red.periodsCompleted.toFixed(3)} periods) steps=${red.steps} radDev=[${rd.min.toExponential(3)},${rd.max.toExponential(3)}] adj=[${red.adjacentSeparation.min.toPrecision(12)},${red.adjacentSeparation.max.toPrecision(12)}] diag=[${red.diagonalSeparation.min.toPrecision(12)},${red.diagonalSeparation.max.toPrecision(12)}] tilt=[${red.tiltRad.min.toExponential(3)},${red.tiltRad.max.toExponential(3)}] centreDisp=${red.centreDisplacementNorm.toExponential(3)} dE/E=${inv.dErelFinal.toExponential(3)} |dP|=${inv.dPFinal.toExponential(3)} dJ/J=${inv.dJrelFinal === null ? 'n/a' : inv.dJrelFinal.toExponential(3)} supV=${red.coverage.supMemberSpeed.toExponential(4)} maxEps=${red.coverage.maxEps.toExponential(4)} detH>=${red.detHmin.toPrecision(10)} condMax=${red.condMax.toPrecision(6)} events=${JSON.stringify(red.eventCounts)} nonTP=${red.nonTurningPointEvents.length} growth/Omega=${red.growthFit.rate === null ? 'n/a' : red.growthFit.ratePerOmega.toFixed(4)} wall=${red.wallMs}ms`;
}

// ----------------------------------------------------------- known cases
const receiptLoad = () => fs.existsSync(RECEIPT_PATH) ? JSON.parse(fs.readFileSync(RECEIPT_PATH, 'utf8')) : { instrument: 'darwin-overnight-ring-cases.mjs (wrapper around darwin-overnight-pair-instrument.mjs, unmodified)', worker: 'darwin-overnight ring instrument (lens henri-poincare)', constants: { K, c_f: CF }, note: 'Known cases first, then one summary row per target run. Invariants are of the adapted law, not physical accounts. Adjacent pairs are opposite polarity, diagonal pairs same polarity.', knownCases: [], targets: [] };
const receiptSave = (r) => fs.writeFileSync(RECEIPT_PATH, JSON.stringify(r, null, 1));

function compareReceipts(a, b) {
  // compare every numeric leaf under controls[].measured and controls[].difference
  const diffs = [];
  const walk = (x, y, p) => {
    if (typeof x === 'number' || typeof y === 'number') { if (x !== y) diffs.push({ path: p, before: x, after: y }); return; }
    if (x && typeof x === 'object' && y && typeof y === 'object') { const keys = new Set([...Object.keys(x), ...Object.keys(y)]); for (const k of keys) if (k !== 'runFile' && k !== 'runFiles') walk(x[k], y[k], `${p}.${k}`); }
    else if (x !== y && !(p.endsWith('runFile') || p.endsWith('runFiles'))) diffs.push({ path: p, before: x, after: y });
  };
  let compared = 0;
  const count = (x) => { if (typeof x === 'number') compared++; else if (x && typeof x === 'object') for (const k of Object.keys(x)) count(x[k]); };
  for (let i = 0; i < a.controls.length; i++) { walk(a.controls[i].measured, b.controls[i]?.measured, `controls[${i}].measured`); walk(a.controls[i].difference, b.controls[i]?.difference, `controls[${i}].difference`); walk(a.controls[i].pass, b.controls[i]?.pass, `controls[${i}].pass`); count(a.controls[i].measured); count(a.controls[i].difference); }
  return { compared, diffs };
}

async function knownK1() {
  // K1: rerun the pair-instrument controls through the instrument's own CLI and compare receipts.
  const before = JSON.parse(fs.readFileSync(PAIR_RECEIPT_PATH, 'utf8'));
  const { execFileSync } = await import('node:child_process');
  const out = execFileSync(process.execPath, [path.join(HERE, 'darwin-overnight-pair-instrument.mjs'), '--controls'], { encoding: 'utf8', cwd: REPO });
  const after = JSON.parse(fs.readFileSync(PAIR_RECEIPT_PATH, 'utf8'));
  const cmp = compareReceipts(before, after);
  const passCount = after.controls.filter((c) => c.pass).length;
  const pass = after.allPass && passCount === 12 && cmp.diffs.length === 0;
  if (cmp.diffs.length > 0) { fs.writeFileSync(PAIR_RECEIPT_PATH, JSON.stringify(before, null, 1)); } // restore if changed: report, never overwrite
  return { id: 'K1-pair-controls-rerun', pass, passCount, total: after.controls.length, allPass: after.allPass, receiptBeforeUtc: before.utcEnd, receiptAfterUtc: after.utcEnd, comparedNumericFields: cmp.compared, differingFields: cmp.diffs, restoredPreviousReceipt: cmp.diffs.length > 0, stdoutTail: out.trim().split('\n').slice(-1)[0] };
}

function knownK2(periods = 5) {
  const R = 50, v0 = ringZeroCouplingSpeed(R), T = ringPeriod(R, v0);
  const rows = [];
  for (const setting of ['P', 'R']) {
    const spec = makeSpec('K2-zero-coupling-ring-R50', R, v0, periods, setting, {}, { coupling: 0 });
    const { red } = runRing(spec); console.log('  ' + line(red));
    // The first period is the closed-form comparison window; the deviation
    // history over the whole run is recorded (the zero-coupling alternating
    // square departs exponentially from round-off; see the receipt rows).
    const firstPeriodDev = Math.max(...red.radiusDeviationHistory.filter(([t]) => t <= T * (1 + 1e-9)).map(([, d]) => d));
    rows.push({ setting: red.setting, steps: red.steps, radiusDeviationRelFirstPeriod: firstPeriodDev, radiusDeviationRelWholeRun: red.radiusDeviationRel, returnErrorPeriod1: red.returns[0]?.maxMemberReturnError ?? null, returnErrorsPerPeriod: red.returns.map((r) => r.maxMemberReturnError), radiusDeviationAtPeriod: red.radiusDeviationAtPeriod.map((x) => x.maxAbsDev), growthFit: red.growthFit, firstCrossing: red.firstCrossing, dErel: red.invariants.dErelFinal, dP: red.invariants.dPFinal, dJrel: red.invariants.dJrelFinal, events: red.eventCounts, nonTurningPointEvents: red.nonTurningPointEvents.length, firstNonTurningPointEvent: red.nonTurningPointEvents[0] ? { kind: red.nonTurningPointEvents[0].kind, t: red.nonTurningPointEvents[0].t, member: red.nonTurningPointEvents[0].member, pair: red.nonTurningPointEvents[0].pair } : null, detH: [red.detHmin, red.detHmax], coverage: red.coverage, runRecord: red.runRecord });
  }
  const tol = { P: { radDev: 1e-7, ret: 1e-5 }, R: { radDev: 1e-6, ret: 1e-3 } };
  const pass = rows.every((r) => { const t = tol[r.setting === 'dp54-rtol1e-10' ? 'P' : 'R']; return r.radiusDeviationRelFirstPeriod <= t.radDev && r.returnErrorPeriod1 <= t.ret && Math.abs(r.detH[0] - 1) < 1e-14 && Math.abs(r.detH[1] - 1) < 1e-14; })
    && (rows[0].growthFit.rate === null || rows[1].growthFit.rate === null || Math.abs(rows[0].growthFit.rate / rows[1].growthFit.rate - 1) <= 0.05);
  // interaction: 0 straight lines, N = 4
  const spec0 = makeSpec('K2b-free-four', R, v0, 1, 'P', { vCommon: [0.01, -0.02, 0.003] }, { interaction: 0 });
  spec0.tMax = 1000; spec0.outputDt = 100;
  const { rec } = runRing(spec0);
  let dmax = 0; for (let k = 0; k < 4; k++) for (let c = 0; c < 3; c++) dmax = Math.max(dmax, Math.abs(rec.final.state.positions[k][c] - (spec0.positions[k][c] + spec0.velocities[k][c] * 1000)));
  const passFree = dmax <= 1e-9 && rec.final.stopReason === 'tMax';
  console.log(`  K2b free four members: max|X(T)-X0-VT| = ${dmax.toExponential(3)} (tol 1e-9) ${passFree ? 'PASS' : 'FAIL'}`);
  return { id: 'K2-zero-coupling-ring', description: `coupling: 0 (velocity-coupling term deleted, inverse-distance kept), N=4 ring R=50, v0=sqrt((2 sqrt2-1)/(4R))=${v0}, run ${periods} closed-form periods T=${T}. Pass criterion: rigid rotation over the first period (radius deviation and period-1 return at tolerance level, det H = 1 exactly) and, if the deviation later grows from round-off, the same measured growth rate at both integrators within 5 percent; the whole-run deviation history is recorded. Plus interaction: 0 straight lines for four members over T=1000`, expected: { v0, period: T, radiusDeviationFirstPeriod: 0, returnErrorPeriod1: 0, detH: 1 }, measured: { rows, freeFourMaxDeviation: dmax }, tolerance: { ...tol, growthRateAgreement: 0.05, free: 1e-9 }, pass: pass && passFree };
}

function knownK3() {
  const R = 50, v = ringBalanceSpeed(R), T = ringPeriod(R, v);
  const spec = makeSpec('K3-exact-ring-R50-1period', R, v, 1, 'P');
  const { red, rec } = runRing(spec); console.log('  ' + line(red));
  const cf = ringInvariantsClosedForm(R, v);
  const inv0 = rec.initialInvariants;
  const radDevMax = Math.max(Math.abs(red.radiusDeviationRel.min), Math.abs(red.radiusDeviationRel.max));
  const pass = radDevMax <= 1e-9 && red.nonTurningPointEvents.length === 0 && red.stopReason === 'tMax' && Math.abs(red.invariants.dErelFinal) <= 1e-8 && red.invariants.dPFinal <= 1e-8 && red.invariants.dJrelFinal <= 1e-8 && Math.abs(inv0.E - cf.E) <= 1e-12 && Math.abs(inv0.J[2] - cf.Jz) <= 1e-12;
  return { id: 'K3-exact-ring-R50-one-period', description: `full frozen law, N=4 alternating ring R=50, v from the balance relation v^2=2(2 sqrt2-1)/(8R-1-sqrt2) = ${v}, one period T=${T}; expected radius deviation <= 1e-9 relative, no event other than turning points, invariant drifts below 1e-8, initial E and J_z equal to the Section 5 closed forms`, expected: { v, period: T, E: cf.E, Jz: cf.Jz, P: 0 }, measured: { steps: red.steps, radiusDeviationRel: red.radiusDeviationRel, returnErrorAfterOnePeriod: red.returns[0]?.maxMemberReturnError ?? null, adjacentSeparation: red.adjacentSeparation, diagonalSeparation: red.diagonalSeparation, initialE: inv0.E, initialJ: inv0.J, initialP: inv0.P, closedFormDiff: { E: inv0.E - cf.E, Jz: inv0.J[2] - cf.Jz }, dErel: red.invariants.dErelFinal, dP: red.invariants.dPFinal, dJrel: red.invariants.dJrelFinal, events: red.eventCounts, nonTurningPointEvents: red.nonTurningPointEvents.length, detH: [red.detHmin, red.detHmax], condMax: red.condMax, coverage: red.coverage, runRecord: red.runRecord }, tolerance: { radiusDeviationRel: 1e-9, drifts: 1e-8, closedForm: 1e-12 }, pass };
}

// ----------------------------------------------------------- targets
const PERT = {
  T1: { R: 50, pert: {} }, T2: { R: 100, pert: {} },
  T3: { R: 50, pert: { radii: [1 + 1e-3, 1 + 1e-3, 1 + 1e-3, 1 + 1e-3] }, note: 'breathing: all radii x(1+1e-3), velocities unchanged' },
  T4: { R: 50, pert: { radii: [1 + 1e-3, 1 - 1e-3, 1 + 1e-3, 1 - 1e-3] }, note: 'rhombic shear: members 0,2 radii x(1+1e-3), members 1,3 x(1-1e-3), velocities unchanged' },
  T5: { R: 50, pert: { z: [1e-3 * 50, 0, -1e-3 * 50, 0] }, note: 'tilt: z = +1e-3 R on member 0, -1e-3 R on member 2, velocities unchanged' },
  T6: { R: 50, pert: 'drift', note: 'centre drift: common velocity (1e-3 v, 0, 0) added to all four members' },
};
for (const [k, R] of [['T3', 100], ['T4', 100], ['T5', 100], ['T6', 100]]) { const b = PERT[k]; PERT[`${k}-R100`] = { R, pert: typeof b.pert === 'string' ? b.pert : (b.pert.z ? { z: [1e-3 * R, 0, -1e-3 * R, 0] } : b.pert), note: b.note + ' (R=100)' }; }

function runTarget(id, settings, periods) {
  const def = PERT[id]; if (!def) throw new Error(`unknown target ${id}`);
  const R = def.R, v = ringBalanceSpeed(R);
  const pert = def.pert === 'drift' ? { vCommon: [1e-3 * v, 0, 0] } : def.pert;
  const out = [];
  for (const setting of settings) {
    const spec = makeSpec(id, R, v, periods, setting, pert);
    fs.writeFileSync(path.join(REPO, '.tmp/darwin-overnight/ring-instrument', `${spec.caseId}.case.json`), JSON.stringify(spec, null, 1));
    const { red } = runRing(spec); console.log(line(red));
    out.push(red);
  }
  return out;
}
function summaryRow(red, note) {
  return { id: red.caseId, setting: red.setting, note, R: red.R, v: red.v, period: red.period, periodsRequested: red.periodsRequested, periodsCompleted: red.periodsCompleted, stopReason: red.stopReason, tEnd: red.tEnd, steps: red.steps, wallMs: red.wallMs,
    radiusDeviationRel: [red.radiusDeviationRel.min, red.radiusDeviationRel.max], adjacentSeparation: [red.adjacentSeparation.min, red.adjacentSeparation.max], diagonalSeparation: [red.diagonalSeparation.min, red.diagonalSeparation.max], tiltRad: [red.tiltRad.min, red.tiltRad.max], centreDisplacement: red.centreDisplacement, meanCentreVelocity: red.meanCentreVelocity,
    dErel: red.invariants.dErelFinal, dP: red.invariants.dPFinal, dJrel: red.invariants.dJrelFinal, maxAbsdErel: red.invariants.maxAbsdErel,
    detHmin: red.detHmin, condMax: red.condMax, eventCounts: red.eventCounts,
    firstEventsOtherThanTurningPoints: red.nonTurningPointEvents.slice(0, 3).map((e) => ({ kind: e.kind, t: e.t, periods: e.t / red.period, pair: e.pair, member: e.member, r: e.r })), nonTurningPointEventCount: red.nonTurningPointEvents.length, survivesRunLength: red.survivesRunLength,
    endState: red.endState ? { t: red.endState.t, stopReason: red.endState.stopReason, positions: red.endState.state.positions, velocities: red.endState.state.velocities } : null, coverage: red.coverage,
    radiusDeviationAtPeriod: red.radiusDeviationAtPeriod.filter((x) => [1, 2, 3, 4, 5, 10, 15, 20].includes(x.period)), growthFit: red.growthFit, firstCrossing: red.firstCrossing, initialRadiusDeviationRel: red.initialRadiusDeviationRel, returnErrorPeriod1: red.returns[0]?.maxMemberReturnError ?? null, runRecord: red.runRecord, reducedRecord: red.reducedRecord };
}

// ----------------------------------------------------------- CLI
async function main(argv) {
  const args = argv.slice(2);
  const get = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
  const receipt = receiptLoad();
  if (args.includes('--known')) {
    receipt.knownCasesUtcStart = new Date().toISOString();
    const which = get('--which', 'K1,K2,K3').split(',');
    for (const w of which) {
      const t0 = Date.now(); let c;
      if (w === 'K1') c = await knownK1(); else if (w === 'K2') c = knownK2(Number(get('--periods', 5))); else if (w === 'K3') c = knownK3(); else continue;
      c.wallMs = Date.now() - t0; c.utc = new Date().toISOString();
      receipt.knownCases = receipt.knownCases.filter((x) => x.id !== c.id); receipt.knownCases.push(c);
      console.log(`${c.pass ? 'PASS' : 'FAIL'} ${c.id}`);
    }
    receipt.knownCasesAllPass = ['K1-pair-controls-rerun', 'K2-zero-coupling-ring', 'K3-exact-ring-R50-one-period'].every((id) => receipt.knownCases.find((c) => c.id === id)?.pass);
    receiptSave(receipt); console.log(`known cases: ${receipt.knownCases.filter((c) => c.pass).length}/${receipt.knownCases.length} pass; receipt ${RECEIPT_PATH}`);
    return;
  }
  const ti = args.indexOf('--target');
  if (ti >= 0) {
    if (!receipt.knownCasesAllPass) { console.error('known cases have not all passed; run --known first'); process.exit(2); }
    const ids = args[ti + 1].split(','); const settings = get('--settings', 'P').split(','); const periods = Number(get('--periods', 20));
    for (const id of ids) {
      const reds = runTarget(id, settings, periods);
      for (const red of reds) { receipt.targets = receipt.targets.filter((x) => x.id !== red.caseId); receipt.targets.push(summaryRow(red, PERT[id].note || 'exact ring')); }
      receiptSave(receipt);
    }
    receipt.targetsUtcLast = new Date().toISOString(); receiptSave(receipt);
    return;
  }
  console.log('usage: node darwin-overnight-ring-cases.mjs --known [--which K1,K2,K3] [--periods 5] | --target T1,T2,... [--settings P,C,R] [--periods 20]');
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main(process.argv);
