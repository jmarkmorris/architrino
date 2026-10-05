// Darwin lane, reference side: adjudication of the frozen subject run records against the fixed reference values.
// Reads only: the reference receipt (fixed, not modified), the subject extracts and (for the DR-100/WR-150/DL-100/DH-100
// obstruction states and the DG-100/DT-100 centre averages) the subject full records. Writes one JSON under
// .local-data/master-equation-closure/darwin-overnight/reference/. No edit to any reference number.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = '/sessions/upbeat-blissful-allen/mnt/architrino';
const EVID = path.join(ROOT, 'reference/priorities/master-equation-closure/binary-research/evidence');
const TGT = path.join(ROOT, '.local-data/master-equation-closure/darwin-overnight/instrument/targets');
const OUT = path.join(ROOT, '.local-data/master-equation-closure/darwin-overnight/reference/adjudication-round2.json');
const REF = JSON.parse(fs.readFileSync(path.join(EVID, 'darwin-overnight-independent-reference-controls.json'), 'utf8'));
const TOL = 1e-7, TOL_RK4 = 1e-5, TOL_DRIFT = 1e-8;
const out = { utc: new Date().toISOString(), tolerances: { ref: TOL, settings: TOL, rk4: TOL_RK4, drift: TOL_DRIFT }, knownCaseFirst: null, rows: [], dr100: null, obstructionStates: {}, dgdt: {} };
const rel = (a, b) => Math.abs(a - b) / Math.abs(b);
const inBracket = (x, lo, hi) => { const w = TOL * Math.max(Math.abs(lo), Math.abs(hi)); return x >= lo - w && x <= hi + w; };
const ext = (id, s) => JSON.parse(fs.readFileSync(path.join(TGT, `${id}-${s}.extract.json`), 'utf8'));
const full = (id, s) => JSON.parse(fs.readFileSync(path.join(TGT, `${id}-${s}.json`), 'utf8'));
const P = 'dp54-rtol1e-10', C = 'dp54-rtol1e-12', R = 'rk4-h5';
function row(caseId, quantity, subjP, subjC, subjR, refVal, lo, hi) {
  const dP = rel(subjP, refVal), dC = rel(subjC, refVal);
  const metP = lo !== undefined ? inBracket(subjP, lo, hi) : dP <= TOL;
  const metC = lo !== undefined ? inBracket(subjC, lo, hi) : dC <= TOL;
  const dCP = rel(subjC, subjP), dRP = subjR === undefined ? null : rel(subjR, subjP);
  const r = { caseId, quantity, subjP, subjC, subjR, ref: refVal, lo, hi, relDiffP: dP, relDiffC: dC, metP, metC, CvsP: dCP, CvsPmet: dCP <= TOL, RvsP: dRP, RvsPmet: dRP === null ? null : dRP <= TOL_RK4 };
  out.rows.push(r); return r;
}

// ---------- reduced-problem quadrature (scratch, independent of the instrument's code path; known case first) ----------
// sigma = -1: a = 1 + 1/r, h = r^2 + r/2, W = ell^2/h - 1/r, Q(r) = (E - W) h = E r^2 + (E/2 + 1) r + (1/2 - ell^2) = |E| (r - rp)(ra - r).
function reducedFromLaunch(r0, vInd) { // tangential mirror launch at r0 with individual speed vInd
  const b = 1 + 1 / (2 * r0), h0 = r0 * r0 + r0 / 2;
  const ell = b * r0 * vInd, E = ell * ell / h0 - 1 / r0;
  const A = E, B = E / 2 + 1, Cc = 0.5 - ell * ell, disc = Math.sqrt(B * B - 4 * A * Cc);
  const roots = [(-B - disc) / (2 * A), (-B + disc) / (2 * A)].sort((x, y) => x - y);
  return { ell, E, rp: roots[0], ra: roots[1] };
}
function glNodes(n) { // Gauss-Legendre on [0,1]
  const x = [], w = [];
  for (let i = 0; i < n; i++) {
    let z = Math.cos(Math.PI * (i + 0.75) / (n + 0.5)), pp;
    for (let it = 0; it < 100; it++) { let p1 = 1, p2 = 0; for (let j = 0; j < n; j++) { const p3 = p2; p2 = p1; p1 = ((2 * j + 1) * z * p2 - j * p3) / (j + 1); } pp = n * (z * p1 - p2) / (z * z - 1); const z1 = z; z = z1 - p1 / pp; if (Math.abs(z - z1) < 1e-16) break; }
    x.push((1 - z) / 2); w.push(1 / ((1 - z * z) * pp * pp));
  }
  return { x, w };
}
function radialPeriodAndAngle(red, n = 200) { // T_r = 2 int_0^{pi/2} sqrt(h a / |E|) dpsi, r = rp + (ra - rp) sin^2 psi; dtheta = 2 ell / h dt
  const { x, w } = glNodes(n); let T = 0, th = 0;
  for (let i = 0; i < n; i++) {
    const psi = x[i] * Math.PI / 2, s = Math.sin(psi), r = red.rp + (red.ra - red.rp) * s * s;
    const h = r * r + r / 2, a = 1 + 1 / r, g = Math.sqrt(h * a / Math.abs(red.E));
    T += w[i] * g; th += w[i] * g * 2 * red.ell / h;
  }
  return { radialPeriod: 2 * T * Math.PI / 2, apsidalAngle: 2 * th * Math.PI / 2 };
}
// known case: DE-100 (fixed reference values of Section 6.2) and WE-150 (Section 6.7)
{
  const de = reducedFromLaunch(100, 0.9 * Math.sqrt(2 / 401)), q = radialPeriodAndAngle(de), q2 = radialPeriodAndAngle(de, 400);
  const we = reducedFromLaunch(150, 0.95 / Math.sqrt(300.5)), qw = radialPeriodAndAngle(we);
  const checks = [
    ['DE-100 pericentre', de.rp, REF.targets.b_eccentric.pericentre],
    ['DE-100 radial period', q.radialPeriod, REF.targets.b_eccentric.radialPeriod.value],
    ['DE-100 radial period n=400', q2.radialPeriod, REF.targets.b_eccentric.radialPeriod.value],
    ['DE-100 apsidal angle', q.apsidalAngle, REF.targets.b_eccentric.apsidalAnglePerRadialPeriod.value],
    ['WE-150 pericentre', we.rp, REF.withheldRound2.WE150.pericentre],
    ['WE-150 radial period', qw.radialPeriod, REF.withheldRound2.WE150.radialPeriod.value],
    ['WE-150 apsidal angle', qw.apsidalAngle, REF.withheldRound2.WE150.apsidalAnglePerRadialPeriod.value],
  ].map(([name, got, want]) => ({ name, got, want, relErr: rel(got, want), pass: rel(got, want) < 1e-12 }));
  out.knownCaseFirst = { instrument: 'scratch planar quadrature (sin^2 substitution, Gauss-Legendre 200/400 nodes) in this script', checks, allPass: checks.every(c => c.pass) };
  console.log(`[known case] scratch quadrature against fixed reference values: ${out.knownCaseFirst.allPass ? 'PASS' : 'FAIL'} (${checks.length} checks, max rel err ${Math.max(...checks.map(c => c.relErr)).toExponential(2)})`);
  if (!out.knownCaseFirst.allPass) { console.log(checks); process.exit(1); }
}

// ---------- 1. circles ----------
const circleSetting = id => (id === 'DC-400' ? 'rk4-h10' : R);
for (const c of REF.targets.a_circles) {
  const id = `DC-${String(c.r0).padStart(3, '0')}`;
  const e = { P: ext(id, P), C: ext(id, C), R: ext(id, circleSetting(id)) };
  const periods = id === 'DC-400' ? 5 : 20;
  // mean angular rate of member 1 from the final state: (2 pi periods + residual angle)/tEnd
  const rate = x => { const p = x.finalState.positions[0]; const phi = Math.atan2(p[1], p[0]); return (2 * Math.PI * periods + phi) / x.tEnd; };
  row(id, 'mean angular rate of member 1 over the run (vs closed-form omega)', rate(e.P), rate(e.C), rate(e.R), c.angularRate);
  row(id, 'supremum of member speed (vs closed-form v)', e.P.supSpeed, e.C.supSpeed, e.R.supSpeed, c.individualSpeed);
  const sep = x => x.maxRelSepDev, ret = x => x.maxReturnErrorRel / periods;
  out.rows.push({ caseId: id, quantity: 'max |r - r0|/r0 over run; return error per period /r0 (P, C, R); drift |dE/E|, |dP|, |dJ|/|J| (P)', subjP: [sep(e.P), ret(e.P)], subjC: [sep(e.C), ret(e.C)], subjR: [sep(e.R), ret(e.R)], drifts: [e.P.drift.dErel, e.P.drift.dPabs, e.P.drift.dJrel], driftsMet: Math.abs(e.P.drift.dErel) < TOL_DRIFT && e.P.drift.dPabs < TOL_DRIFT && Math.abs(e.P.drift.dJrel) < TOL_DRIFT, perPeriodCriterionMet: [e.P, e.C, e.R].every(x => sep(x) < 1e-6), eventsOtherThanTurningPoints: [e.P, e.C, e.R].map(x => x.events.filter(ev => ev.kind !== 'turning-point').length), turningPointRadiusMaxDev: Math.max(...e.P.events.filter(ev => ev.kind === 'turning-point').map(ev => Math.abs(ev.r - c.r0) / c.r0)), stopReason: [e.P.stopReason, e.C.stopReason, e.R.stopReason], tEnd: [e.P.tEnd, e.C.tEnd, e.R.tEnd], runLengthExpected: periods * c.period });
}

// ---------- 2. eccentric ----------
function eccentric(id, ref) {
  const e = { P: ext(id, P), C: ext(id, C), R: ext(id, R) };
  row(id, 'pericentre (mean of turning-point minima)', e.P.pericentreStats.mean, e.C.pericentreStats.mean, e.R.pericentreStats.mean, ref.pericentre);
  row(id, 'apocentre (mean of turning-point maxima after release)', e.P.apocentreStats.mean, e.C.apocentreStats.mean, e.R.apocentreStats.mean, ref.apocentre);
  row(id, 'radial period (mean spacing of apocentres)', e.P.radialPeriod.mean, e.C.radialPeriod.mean, e.R.radialPeriod.mean, ref.radialPeriod.value, ref.radialPeriod.lo, ref.radialPeriod.hi);
  row(id, 'apsidal advance per radial period', e.P.apsidalAdvance.mean, e.C.apsidalAdvance.mean, e.R.apsidalAdvance.mean, ref.apsidalAdvancePerRadialPeriod.value, ref.apsidalAdvancePerRadialPeriod.lo, ref.apsidalAdvancePerRadialPeriod.hi);
  row(id, 'supremum of member speed (vs pericentre speed)', e.P.supSpeed, e.C.supSpeed, e.R.supSpeed, ref.individualSpeedAtPericentre ?? ref.supIndividualSpeed ?? ref.pericentreIndividualSpeed);
  out.rows.push({ caseId: id, quantity: 'drifts (P) |dE/E|, |dP|, |dJ|/|J|; n pericentres; events other than turning points; stopReason', drifts: [e.P.drift.dErel, e.P.drift.dPabs, e.P.drift.dJrel], driftsMet: Math.abs(e.P.drift.dErel) < TOL_DRIFT && e.P.drift.dPabs < TOL_DRIFT && Math.abs(e.P.drift.dJrel) < TOL_DRIFT, nPeri: [e.P.pericentreStats.n, e.C.pericentreStats.n, e.R.pericentreStats.n], otherEvents: [e.P, e.C, e.R].map(x => x.events.filter(ev => ev.kind !== 'turning-point').length), stopReason: [e.P.stopReason, e.C.stopReason, e.R.stopReason], rMin: [e.P.rMin, e.C.rMin, e.R.rMin], rMax: [e.P.rMax, e.C.rMax, e.R.rMax] });
}
eccentric('DE-100', REF.targets.b_eccentric);
eccentric('WE-150', REF.withheldRound2.WE150);

// ---------- 3. radial / head-on ----------
const evOf = (x, kind, dir) => x.events.find(ev => ev.kind === kind && (dir === undefined || (ev.direction || '').startsWith(dir)));
function radial(id, ref, hasSpeedBoundRef) {
  const e = { P: ext(id, P), C: ext(id, C), R: ext(id, R) };
  const g = (x, k) => evOf(x, k, 'departure');
  if (hasSpeedBoundRef) {
    row(id, 'time of speed-bound departure (member speed 0.1)', g(e.P, 'speed-bound').t, g(e.C, 'speed-bound').t, g(e.R, 'speed-bound').t, ref.timeToSpeedBound.value, ref.timeToSpeedBound.lo, ref.timeToSpeedBound.hi);
    row(id, 'separation at speed-bound departure', g(e.P, 'speed-bound').r, g(e.C, 'speed-bound').r, g(e.R, 'speed-bound').r, ref.speedBoundCrossingRadius);
  }
  row(id, 'time of eps-bound departure (r = 20)', g(e.P, 'eps-bound').t, g(e.C, 'eps-bound').t, g(e.R, 'eps-bound').t, ref.timeTo_r20.value, ref.timeTo_r20.lo, ref.timeTo_r20.hi);
  row(id, 'member speed at r = 20', g(e.P, 'eps-bound').speed, g(e.C, 'eps-bound').speed, g(e.R, 'eps-bound').speed, ref.individualSpeedAt_r20);
  const o = x => evOf(x, 'obstruction');
  row(id, 'time of obstruction (r = 1)', o(e.P).t, o(e.C).t, o(e.R).t, ref.timeToSingular.value, ref.timeToSingular.lo, ref.timeToSingular.hi);
  row(id, 'separation at obstruction', o(e.P).r, o(e.C).r, o(e.R).r, 1);
  row(id, 'member speed at obstruction as reported (event.speed)', o(e.P).speed, o(e.C).speed, o(e.R).speed, ref.individualSpeedAtSingular);
  if (id !== 'DL-100') row(id, 'mirror relative speed at obstruction |rdot|/2 (from the same event)', Math.abs(o(e.P).rdot) / 2, Math.abs(o(e.C).rdot) / 2, Math.abs(o(e.R).rdot) / 2, ref.individualSpeedAtSingular);
  out.rows.push({ caseId: id, quantity: 'sup speed, max eps, drift |dE/E| at final (P), pericentres before r=1, turning points, obstruction reason (P, C, R)', sup: [e.P.supSpeed, e.C.supSpeed, e.R.supSpeed], refSup: ref.supIndividualSpeed, maxEps: [e.P.maxEps, e.C.maxEps, e.R.maxEps], drift: [e.P.drift.dErel, e.P.drift.dPabs, e.P.drift.dJabs], nPeri: [e.P.pericentres.length, e.C.pericentres.length, e.R.pericentres.length], turningPoints: [e.P, e.C, e.R].map(x => x.events.filter(ev => ev.kind === 'turning-point').length), reasons: [o(e.P).reason, o(e.C).reason, o(e.R).reason], cfCrossings: [e.P, e.C, e.R].map(x => x.events.filter(ev => ev.kind === 'speed-crossing-cf').length) });
  // obstruction state inspection from the full record (P and C)
  for (const s of [P, C]) {
    const F = full(id, s); const ev = F.events.find(x => x.kind === 'obstruction'); const st = ev.state; const fin = F.final.state;
    const V1 = st.velocities[0], V2 = st.velocities[1], X1 = st.positions[0], X2 = st.positions[1];
    const sumV = V1.map((v, i) => v + V2[i]), sumX = X1.map((v, i) => v + X2[i]);
    const sp = v => Math.hypot(...v);
    const relHalf = Math.hypot(...V1.map((v, i) => (v - V2[i]) / 2));
    const finSumV = fin.velocities[0].map((v, i) => v + fin.velocities[1][i]);
    const lastSamples = F.samples.slice(-3).map(smp => ({ t: smp.t, r: smp.pairs[0].r, sumVx: smp.state.velocities[0][0] + smp.state.velocities[1][0], speeds: smp.state.velocities.map(sp) }));
    out.obstructionStates[`${id} ${s}`] = { t: ev.t, r: ev.pairs[0].r, rdot: ev.pairs[0].rdot, reportedSpeed: ev.maxSpeed, memberSpeeds: [sp(V1), sp(V2)], halfRelativeSpeed: relHalf, centreVelocity: sumV.map(v => v / 2), centrePosition: sumX.map(v => v / 2), P: ev.P, sumRadialEigenvalue: 1 - 1 / ev.pairs[0].r, creepSteps: ev.creepSteps, failedAt: ev.failedAt, detH_at_failure: ev.detH_at_failure, lastAccepted: { t: F.final.t, r: F.final.pairs[0].r, centreVelocity: finSumV.map(v => v / 2), speeds: fin.velocities.map(sp) }, lastSamples };
  }
}
radial('DR-100', REF.targets.c_restReleaseOpposite, false);
radial('DH-100', REF.targets.f_headOnOpposite, true);
radial('WR-150', REF.withheldRound2.WR150, true);
radial('DL-100', REF.withheldRound2.DL100, true);
// DR-100 speed-bound (reference has it under a different key name?)
{
  const c = REF.targets.c_restReleaseOpposite; const e = { P: ext('DR-100', P), C: ext('DR-100', C), R: ext('DR-100', R) }; const g = x => evOf(x, 'speed-bound', 'departure');
  const tb = c.timeToSpeedBound || c.timeTo_speedBound; if (tb) { row('DR-100', 'time of speed-bound departure (r = 49.5)', g(e.P).t, g(e.C).t, g(e.R).t, tb.value, tb.lo, tb.hi); row('DR-100', 'separation at speed-bound departure', g(e.P).r, g(e.C).r, g(e.R).r, 49.5); } else out.rows.push({ caseId: 'DR-100', note: 'speed-bound key names in receipt: ' + Object.keys(c).join(',') });
}
// DR-100: separation at which the closed-form speed equals the reported speed; v^2 = (r_t - r)/(r_t (r+1)), r_t = 100
{
  const o = ext('DR-100', P).events.find(x => x.kind === 'obstruction'), oc = ext('DR-100', C).events.find(x => x.kind === 'obstruction');
  const rOf = v => 100 * (1 - v * v) / (1 + 100 * v * v);
  const vOf = r => Math.sqrt((100 - r) / (100 * (r + 1)));
  out.dr100 = { reportedSpeedP: o.speed, rWhereClosedFormGivesReportedSpeedP: rOf(o.speed), reportedSpeedC: oc.speed, rWhereClosedFormGivesReportedSpeedC: rOf(oc.speed), closedFormSpeedAtRecordedR_P: vOf(o.r), closedFormSpeedAtRecordedR_C: vOf(oc.r), halfRdotP: Math.abs(o.rdot) / 2, halfRdotC: Math.abs(oc.rdot) / 2, refSpeedAt1: Math.sqrt(99 / 200), dvdr_at1: -(101 / 400) / (2 * Math.sqrt(99 / 200)) };
}

// ---------- 4. SR-100, SH-100 ----------
{
  const e = { P: ext('SR-100', P), C: ext('SR-100', C), R: ext('SR-100', R) }; const g = x => evOf(x, 'escape'); const ref = REF.targets.d_restReleaseSame;
  row('SR-100', 'time to r = 200 (escape event at rEscape 200)', g(e.P).t, g(e.C).t, g(e.R).t, ref.timeTo_r200.value, ref.timeTo_r200.lo, ref.timeTo_r200.hi);
  row('SR-100', 'member speed at r = 200', g(e.P).speed, g(e.C).speed, g(e.R).speed, ref.individualSpeedAt_r200);
  out.rows.push({ caseId: 'SR-100', quantity: 'sup speed, max eps, drift, events', sup: [e.P.supSpeed, e.C.supSpeed, e.R.supSpeed], maxEps: e.P.maxEps, drift: [e.P.drift.dErel, e.P.drift.dPabs, e.P.drift.dJabs], events: e.P.events.map(x => x.kind) });
}
{
  const e = { P: ext('SH-100', P), C: ext('SH-100', C), R: ext('SH-100', R) }; const g = x => evOf(x, 'turning-point', 'minimum'); const ref = REF.targets.e_headOnSame;
  row('SH-100', 'turning-point separation', g(e.P).r, g(e.C).r, g(e.R).r, ref.minimumSeparation);
  row('SH-100', 'time of turning point', g(e.P).t, g(e.C).t, g(e.R).t, ref.timeToTurningPoint.value, ref.timeToTurningPoint.lo, ref.timeToTurningPoint.hi);
  const esc = x => evOf(x, 'escape');
  row('SH-100', 'return time to r = 100 (vs twice the turning time)', esc(e.P).t, esc(e.C).t, esc(e.R).t, 2 * ref.timeToTurningPoint.value, 2 * ref.timeToTurningPoint.lo, 2 * ref.timeToTurningPoint.hi);
  out.rows.push({ caseId: 'SH-100', quantity: 'sup speed, max eps, drift, events, detMin', sup: [e.P.supSpeed, e.C.supSpeed, e.R.supSpeed], refSup: ref.supIndividualSpeed, maxEps: e.P.maxEps, refMaxEps: ref.maxEpsilon, drift: [e.P.drift.dErel, e.P.drift.dPabs, e.P.drift.dJabs], events: e.P.events.map(x => x.kind), detMin: e.P.detMin });
}

// ---------- 5. DG-100, DT-100: common-block statement and mirror-reduced relative orbit ----------
function Minv(r, e) { // (I + M)^{-1}, sigma = -1: alpha I + (beta - alpha) e e^T
  const al = 1 / (1 - 1 / (2 * r)), be = 1 / (1 - 1 / r); const m = [[al, 0, 0], [0, al, 0], [0, 0, al]];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) m[i][j] += (be - al) * e[i] * e[j]; return m;
}
const mv = (m, v) => m.map(rw => rw[0] * v[0] + rw[1] * v[1] + rw[2] * v[2]);
function dgdt(id, uRel) {
  const F = full(id, P), ex = ext(id, P), exC = ext(id, C), exR = ext(id, R);
  const P0 = F.initialInvariants.P; const S = F.samples;
  // exact statement: dR/dT = (1/2)(I+M(r(T)))^{-1} P; time average over the samples (trapezoid), P constant
  let acc = [0, 0, 0], Tlen = S[S.length - 1].t - S[0].t;
  const f = smp => { const X1 = smp.state.positions[0], X2 = smp.state.positions[1]; const d = X1.map((v, i) => v - X2[i]); const r = Math.hypot(...d); const e = d.map(v => v / r); return mv(Minv(r, e), P0).map(v => v / 2); };
  let prev = f(S[0]);
  for (let i = 1; i < S.length; i++) { const cur = f(S[i]); const dt = S[i].t - S[i - 1].t; for (let k = 0; k < 3; k++) acc[k] += 0.5 * (prev[k] + cur[k]) * dt; prev = cur; }
  const predMean = acc.map(v => v / Tlen);
  // leading-order (circle at r0 = 100, plane normal z): <(I+M)^{-1}> = diag((al+be)/2, (al+be)/2, al)
  const al = 1 / 0.995, be = 1 / 0.99; const lead = [(al + be) / 2 * P0[0] / 2, (al + be) / 2 * P0[1] / 2, al * P0[2] / 2];
  const meas = ex.centre.meanVelocity;
  // mirror-reduced relative orbit from |u|/2 (U back-reaction ignored): apocentre, radial period
  const red = reducedFromLaunch(100, uRel / 2), q = radialPeriodAndAngle(red);
  const minima = ex.pericentres.map(p => p.t), spacing = minima.length > 1 ? (minima[minima.length - 1] - minima[0]) / (minima.length - 1) : null;
  const U0 = [(F.preparation.velocities[0][0] + F.preparation.velocities[1][0]) / 2, (F.preparation.velocities[0][1] + F.preparation.velocities[1][1]) / 2, (F.preparation.velocities[0][2] + F.preparation.velocities[1][2]) / 2];
  const U2 = U0[0] ** 2 + U0[1] ** 2 + U0[2] ** 2;
  out.dgdt[id] = { P0, U0, U0squared: U2, secondOrderScale_r0_U2: 100 * U2, measuredMeanCentreVelocity: meas, predictedMeanFromSamples: predMean, relDiffSamples: predMean.map((v, i) => Math.abs(meas[i]) > 1e-6 ? rel(meas[i], v) : Math.abs(meas[i] - v)), predictedLeadingOrder: lead, relDiffLeading: lead.map((v, i) => Math.abs(meas[i]) > 1e-6 ? rel(meas[i], v) : Math.abs(meas[i] - v)), maxDeviationFromStraightLine: ex.centre.maxDeviationFromStraightLine, mirrorReduced: { ell: red.ell, E: red.E, pericentre: red.rp, apocentre: red.ra, radialPeriod: q.radialPeriod, apsidalAdvance: q.apsidalAngle - 2 * Math.PI }, measured: { rMin: [ex.rMin, exC.rMin, exR.rMin], rMax: [ex.rMax, exC.rMax, exR.rMax], minimaSpacing: spacing, nMinima: minima.length, drift: [ex.drift.dErel, ex.drift.dPabs, ex.drift.dJrel], CvsP: rel(exC.rMax, ex.rMax), RvsP: rel(exR.rMax, ex.rMax), tiltRad: ex.relativePlaneTiltRad, stopReason: [ex.stopReason, exC.stopReason, exR.stopReason], otherEvents: ex.events.filter(x => x.kind !== 'turning-point').length }, relDiff: { apocentre: rel(ex.rMax, red.ra), radialPeriod: spacing ? rel(spacing, q.radialPeriod) : null, pericentreDipBelowReduced: red.rp - ex.rMin } };
}
{
  const F = full('DG-100', P); const v = F.preparation.velocities; const u = Math.hypot(...v[0].map((x, i) => x - v[1][i])); dgdt('DG-100', u);
  const G = full('DT-100', P); const w = G.preparation.velocities; const u2 = Math.hypot(...w[0].map((x, i) => x - w[1][i])); dgdt('DT-100', u2);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
// ---------- print ----------
for (const r of out.rows) {
  if (r.ref !== undefined) console.log(`${r.caseId} | ${r.quantity} | P ${r.subjP} | C ${r.subjC} | R ${r.subjR} | ref ${r.ref}${r.lo !== undefined ? ` [${r.lo}, ${r.hi}]` : ''} | relP ${r.relDiffP.toExponential(2)} ${r.metP ? 'met' : 'NOT MET'} | relC ${r.relDiffC.toExponential(2)} ${r.metC ? 'met' : 'NOT MET'} | C-P ${r.CvsP.toExponential(2)} ${r.CvsPmet ? 'met' : 'NOT MET'} | R-P ${r.RvsP === null ? '-' : r.RvsP.toExponential(2) + (r.RvsPmet ? ' met' : ' NOT MET')}`);
  else console.log(`${r.caseId} | ${JSON.stringify(r)}`);
}
console.log('\n[DR-100]', JSON.stringify(out.dr100, null, 1));
console.log('\n[obstruction states]', JSON.stringify(out.obstructionStates, null, 1));
console.log('\n[DG/DT]', JSON.stringify(out.dgdt, null, 1));
console.log('\nwrote', OUT);
