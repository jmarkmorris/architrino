#!/usr/bin/env node
// run-targets.mjs: case runner for the preregistered binary case table
// (darwin-overnight-preregistration.md Sections 2, 3, 6). It only builds the
// --case JSON preparations, calls the validated instrument's runCase() with
// the frozen settings, writes run records under
// .local-data/master-equation-closure/darwin-overnight/instrument/targets/,
// and extracts the measured quantities. It changes nothing in the integrator.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '../../..');
const INSTR = path.join(REPO, 'reference/priorities/master-equation-closure/binary-research/evidence/darwin-overnight-pair-instrument.mjs');
const CASES = path.join(HERE, 'cases');
// --out-dir <name> selects the record directory under .local-data/.../instrument/ (default targets; round 1 batch 3 reruns use targets-v2 so that earlier records stay untouched)
const OUT_ARG = process.argv.indexOf('--out-dir');
const OUT = path.join(REPO, '.local-data/master-equation-closure/darwin-overnight/instrument', OUT_ARG >= 0 ? process.argv[OUT_ARG + 1] : 'targets');
const { runCase } = await import(INSTR);

// ---- frozen settings (preregistration Section 2)
const FROZEN = { rContact: 1e-3, rEscape: 1e4, speedBound: 0.1, epsBound: 0.05, detTol: 1e-12, condMax: 1e12, tTol: 1e-9 };
const SETTINGS = {
  'dp54-rtol1e-10': { integrator: 'dp54', rtol: 1e-10, atol: 1e-12 },
  'dp54-rtol1e-12': { integrator: 'dp54', rtol: 1e-12, atol: 1e-12 },
  'rk4-h5': { integrator: 'rk4', h: 5 },
  'rk4-h10': { integrator: 'rk4', h: 10 },
  // supplementary only (outside the frozen radial cadence of 1): a true fixed
  // step of 5, since the instrument clips fixed steps to the output cadence
  'rk4-h5-cadence5': { integrator: 'rk4', h: 5, outputDt: 5 },
};

const uc = (r0) => 1 / Math.sqrt(2 * r0 + 0.5);
const Pcirc = (r0, u) => Math.PI * r0 / u; // 2*pi*(r0/2)/u
const mirror = (r0, vx, vy, pol) => ({ positions: [[r0 / 2, 0, 0], [-r0 / 2, 0, 0]], velocities: [[vx, vy, 0], [-vx, -vy, 0]], polarities: pol });
const OPP = [1, -1], SAME = [1, 1];

function circle(id, r0, uTable, nPer) {
  const u = uTable; const P = Pcirc(r0, u);
  return { caseId: id, kind: 'circle', ...mirror(r0, 0, u, OPP), r0, u, period: P, tMax: nPer * P, outputDt: P / 200, runLength: `${nPer} periods of ${P}` };
}
const cases = [];
cases.push(circle('DC-100', 100, 0.07062245515464487, 20));
{ const r0 = 100, u = 0.9 * uc(100), Pr = 3451.6063244356; cases.push({ caseId: 'DE-100', kind: 'eccentric', ...mirror(r0, 0, u, OPP), r0, u, radialPeriodExpected: Pr, tMax: 10 * Pr, outputDt: Pr / 200, runLength: `10 radial periods of ${Pr}`, expected: { pericentre: 67.85299550778794, apocentre: 100, advance: 0.058250070627, radialPeriod: Pr } }); }
cases.push({ caseId: 'DR-100', kind: 'radial', ...mirror(100, 0, 0, OPP), r0: 100, tMax: 3000, outputDt: 1, runLength: 'to first stop event, tMax 3000', expected: { speedBoundT: 649.1260725157, speedBoundR: 49.5, epsBoundT: 759.0853889143, obstructionT: 792.3083820322, obstructionR: 1, obstructionSpeed: 0.70356236397 } });
cases.push({ caseId: 'DH-100', kind: 'radial', ...mirror(100, -0.02, 0, OPP), r0: 100, tMax: 3000, outputDt: 1, runLength: 'to first stop event, tMax 3000', expected: { epsBoundT: 596.0555909292, obstructionT: 629.1840957683, obstructionR: 1 } });
cases.push({ caseId: 'SR-100', kind: 'radial', ...mirror(100, 0, 0, SAME), r0: 100, tMax: 4000, outputDt: 1, rEscape: 200, runLength: 'to r = 200 (rEscape = 200 used as the run-length terminator), tMax 4000', expected: { r200T: 1143.3778308988, asymptoticSpeed: 0.1 } });
cases.push({ caseId: 'SH-100', kind: 'radial', ...mirror(100, -0.05, 0, SAME), r0: 100, tMax: 2.2 * 369.1224013167, outputDt: 1, rEscape: 100, runLength: 'to the turning point and back to r = 100 (rEscape = 100 used as the return detector; r(0) = 100 gives g = 0 at release, which the instrument does not count), tMax 812.07', expected: { turningR: 80.16032064128257, turningT: 369.1224013167 } });
cases.push({ caseId: 'WR-150', kind: 'radial', ...mirror(150, -0.03, 0, OPP), r0: 150, tMax: 5000, outputDt: 1, runLength: 'to first stop event, tMax 5000', expected: null });
{ const r0 = 150, u = 0.95 * uc(150); const PrEst = 7100; cases.push({ caseId: 'WE-150', kind: 'eccentric', ...mirror(r0, 0, u, OPP), r0, u, tMax: 80000, outputDt: 35, runLength: 'tMax 80000 (about 11 zero-coupling-estimated radial periods, so that at least 10 measured radial periods are covered)', expected: null, note: `u = 0.95*u_c(150) = ${u}; radial period estimate ${PrEst} is a zero-coupling guess used only to size tMax and cadence` }); }
cases.push(circle('DC-050', 50, 0.09975093361076327, 20));
cases.push(circle('DC-200', 200, 0.049968779266390755, 20));
cases.push(circle('DC-400', 400, 0.03534429569218016, 5));
cases.push({ caseId: 'DL-100', kind: 'radial', ...mirror(100, 0, 0.005, OPP), r0: 100, tMax: 3000, outputDt: 1, runLength: 'to first stop event, tMax 3000', expected: { classification: 'no pericentre before r = 1; speed-bound, eps-bound at r = 20, obstruction at r = 1' } });
{ const b = circle('DG-100', 100, 0.07062245515464487, 20); b.caseId = 'DG-100'; b.kind = 'perturbed'; b.velocities = [[0.005, b.u, 0.002], [0.005, -b.u, 0]]; b.runLength = `20 periods of DC-100 (${b.period})`; b.note = 'DC-100 preparation plus common velocity (0.005,0,0) on both members and (0,0,0.002) on member 1'; cases.push(b); }
{ const b = circle('DT-100', 100, 0.07062245515464487, 20); b.caseId = 'DT-100'; b.kind = 'perturbed'; b.velocities = [[0, 1.01 * b.u, 0], [0, -b.u, 0]]; b.runLength = `20 periods of DC-100 (${b.period})`; b.note = 'DC-100 preparation with member 1 speed multiplied by 1.01'; cases.push(b); }
cases.push(circle('DC-025', 25, 0.14071950894605836, 20));
const ORDER = cases.map((c) => c.caseId);

function writeCases() {
  fs.mkdirSync(CASES, { recursive: true });
  for (const c of cases) {
    const spec = { ...FROZEN, ...c, ...SETTINGS['dp54-rtol1e-10'] };
    if (c.rEscape !== undefined) spec.rEscape = c.rEscape;
    fs.writeFileSync(path.join(CASES, `${c.caseId}.json`), JSON.stringify(spec, null, 1));
  }
  console.log(`wrote ${cases.length} case files to ${CASES}`);
}

// ---- extraction
const sub = (a, b) => a.map((v, i) => v - b[i]);
const nrm = (a) => Math.hypot(...a);
const ang = (d) => Math.atan2(d[1], d[0]);
function extract(c, r) {
  const f = r.final; const J0 = nrm(r.initialInvariants.J); const E0 = r.initialInvariants.E;
  const all = [...r.samples, ...r.events, f];
  const out = {
    caseId: c.caseId, setting: r.setting, stopReason: f.stopReason, tEnd: f.t, steps: r.integrator.steps, rejected: r.integrator.rejected, evaluations: r.integrator.evaluations, wallMs: r.wallMs,
    supSpeed: r.suprema.speed, maxEps: r.suprema.eps, detMin: r.suprema.detMin, condMax: r.suprema.condMax,
    drift: { dErel: f.dE / Math.max(Math.abs(E0), 1e-300), dE: f.dE, dPabs: nrm(f.dP), dJrel: J0 > 0 ? nrm(f.dJ) / J0 : null, dJabs: nrm(f.dJ), J0 },
    maxDriftOverRun: { dErel: Math.max(...all.map((s) => Math.abs(s.dE) / Math.max(Math.abs(E0), 1e-300))), dPabs: Math.max(...all.map((s) => nrm(s.dP))), dJabs: Math.max(...all.map((s) => nrm(s.dJ))) },
    events: r.events.filter((e) => e.kind !== 'tMax').map((e) => ({ kind: e.kind, direction: e.direction, member: e.member, t: e.t, r: e.pairs[0].r, rdot: e.pairs[0].rdot, speed: e.maxSpeed, memberSpeeds: e.memberSpeeds, relSpeedHalf: e.pairs[0].relSpeedHalf, centreSpeed: e.centreSpeed, E: e.E, dE: e.dE, dErel: e.dErel, detH: e.detH, cond2: e.cond2, reason: e.reason })),
    speedLabels: r.suprema.speed < 1 ? 'unrestricted, inclusive ceiling, strict ceiling all supported on the whole interval (no c_f crossing)' : 'c_f crossing recorded; only unrestricted after it',
    coverage: null, finalSeparation: f.pairs[0].r, finalState: f.state,
  };
  const exits = r.events.filter((e) => (e.kind === 'speed-bound' || e.kind === 'eps-bound') && /departure/.test(e.direction));
  if (r.suprema.speed <= 0.1 && r.suprema.eps <= 0.05) out.coverage = 'inside the declared domain for the whole recorded interval';
  else if (exits.length) { const e = exits[0]; out.coverage = `partially inside; first exit ${e.kind} at T=${e.t} (r=${e.pairs[0].r}, speed=${e.maxSpeed})`; }
  else out.coverage = `outside at release (sup speed ${r.suprema.speed}, max eps ${r.suprema.eps})`;
  const rs = all.map((s) => s.pairs[0].r);
  out.rMin = Math.min(...rs); out.rMax = Math.max(...rs);
  if (c.kind === 'circle' || c.kind === 'perturbed') {
    out.maxRelSepDev = Math.max(...rs.map((x) => Math.abs(x - c.r0) / c.r0));
    const X10 = r.samples[0].state.positions[0]; const w = 2 * c.u / c.r0;
    out.returnErrors = [];
    for (let k = 1; k * c.period <= c.tMax + 1e-6; k++) {
      const tk = k * c.period; let best = null;
      for (const s of r.samples) if (best === null || Math.abs(s.t - tk) < Math.abs(best.t - tk)) best = s;
      if (!best || Math.abs(best.t - tk) > 1e-6) { out.returnErrors.push({ k, note: 'no sample within 1e-6 of kP', tSample: best?.t }); continue; }
      const X1 = best.state.positions[0]; const Xex = [c.r0 / 2 * Math.cos(w * best.t), c.r0 / 2 * Math.sin(w * best.t), 0];
      out.returnErrors.push({ k, tSample: best.t, tOffset: best.t - tk, returnError: nrm(sub(X1, X10)), deviationFromExactCircleAtSampleTime: nrm(sub(X1, Xex)) });
    }
    out.maxReturnError = Math.max(...out.returnErrors.map((x) => x.returnError ?? 0));
    out.maxReturnErrorRel = out.maxReturnError / c.r0;
  }
  if (c.kind === 'perturbed') {
    const centre = (s) => s.state.positions[0].map((v, i) => 0.5 * (v + s.state.positions[1][i]));
    const c0 = centre(r.samples[0]), cT = centre(f);
    out.centre = { initial: c0, final: cT, netDisplacement: sub(cT, c0), meanVelocity: sub(cT, c0).map((v) => v / f.t) };
    let wob = 0; const dir = sub(cT, c0); const L = nrm(dir);
    for (const s of r.samples) { const cc = sub(centre(s), c0); const proj = L > 0 ? cc.reduce((a, v, i) => a + v * dir[i] / L, 0) : 0; const perp = Math.sqrt(Math.max(0, nrm(cc) ** 2 - proj ** 2)); wob = Math.max(wob, perp); }
    out.centre.maxDeviationFromStraightLine = wob;
    let tiltMin = Infinity, tiltMax = -Infinity;
    for (const s of r.samples) { const d = sub(s.state.positions[0], s.state.positions[1]); const dd = sub(s.state.velocities[0], s.state.velocities[1]); const n = [d[1] * dd[2] - d[2] * dd[1], d[2] * dd[0] - d[0] * dd[2], d[0] * dd[1] - d[1] * dd[0]]; const tilt = Math.acos(Math.min(1, Math.abs(n[2]) / nrm(n))); tiltMin = Math.min(tiltMin, tilt); tiltMax = Math.max(tiltMax, tilt); }
    out.relativePlaneTiltRad = { min: tiltMin, max: tiltMax };
  }
  if (c.kind === 'eccentric' || c.kind === 'perturbed' || c.kind === 'radial') {
    const tp = r.events.filter((e) => e.kind === 'turning-point');
    const apo = [{ t: 0, r: r.samples[0].pairs[0].r, angle: ang(sub(r.samples[0].state.positions[0], r.samples[0].state.positions[1])) }];
    const peri = [];
    for (const e of tp) { const rec = { t: e.t, r: e.pairs[0].r, angle: ang(sub(e.state.positions[0], e.state.positions[1])) }; if (/minimum/.test(e.direction)) peri.push(rec); else apo.push(rec); }
    out.pericentres = peri; out.apocentres = apo;
    if (c.kind === 'eccentric' && apo.length >= 2) {
      const dts = [], adv = [];
      for (let k = 1; k < apo.length; k++) { dts.push(apo[k].t - apo[k - 1].t); let da = apo[k].angle - apo[k - 1].angle; da = ((da % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI) - Math.PI; adv.push(da); }
      const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length; const spread = (a) => Math.max(...a) - Math.min(...a);
      out.radialPeriod = { mean: mean(dts), spread: spread(dts), n: dts.length, values: dts };
      out.apsidalAdvance = { mean: mean(adv), spread: spread(adv), values: adv };
      out.pericentreStats = { mean: mean(peri.map((p) => p.r)), spread: spread(peri.map((p) => p.r)), n: peri.length };
      out.apocentreStats = { mean: mean(apo.slice(1).map((p) => p.r)), spread: spread(apo.slice(1).map((p) => p.r)), n: apo.length - 1 };
    }
  }
  return out;
}

function runOne(c, settingName, overrides = {}) {
  const spec = { ...FROZEN, ...c, ...SETTINGS[settingName], ...overrides };
  if (c.rEscape !== undefined && overrides.rEscape === undefined) spec.rEscape = c.rEscape;
  const t0 = Date.now();
  const r = runCase(spec); r.setting = settingName; r.caseSpec = spec; r.wallMsTotal = Date.now() - t0; r.utc = new Date().toISOString();
  r.runnerNote = 'run by .tmp/darwin-overnight/instrument/run-targets.mjs via runCase() of the validated instrument; no change to the integrator';
  fs.mkdirSync(OUT, { recursive: true });
  const file = path.join(OUT, `${c.caseId}-${settingName}.json`);
  fs.writeFileSync(file, JSON.stringify(r));
  const x = extract(c, r); x.runRecord = path.relative(REPO, file); x.utc = r.utc;
  fs.writeFileSync(path.join(OUT, `${c.caseId}-${settingName}.extract.json`), JSON.stringify(x, null, 1));
  console.log(`${c.caseId} ${settingName}: stop=${x.stopReason} t=${x.tEnd.toPrecision(12)} steps=${x.steps} supV=${x.supSpeed.toExponential(4)} maxEps=${x.maxEps.toExponential(4)} dE/E=${x.drift.dErel.toExponential(2)} |dP|=${x.drift.dPabs.toExponential(2)} dJ/J=${x.drift.dJrel === null ? 'n/a(J0=0,|dJ|=' + x.drift.dJabs.toExponential(2) + ')' : x.drift.dJrel.toExponential(2)} events=${x.events.length} wall=${r.wallMsTotal}ms` + (x.maxRelSepDev !== undefined ? ` maxRelSepDev=${x.maxRelSepDev.toExponential(3)} maxReturnErr=${x.maxReturnError.toExponential(3)}` : ''));
  return x;
}

const args = process.argv.slice(2);
if (args.includes('--write-cases')) writeCases();
const ri = args.indexOf('--run');
if (ri >= 0) {
  const ids = args[ri + 1] === 'all' ? ORDER : args[ri + 1].split(',');
  const si = args.indexOf('--settings');
  for (const id of ids) {
    const c = cases.find((k) => k.caseId === id); if (!c) { console.log(`unknown case ${id}`); continue; }
    const settings = si >= 0 ? args[si + 1].split(',') : ['dp54-rtol1e-10', 'dp54-rtol1e-12', id === 'DC-400' ? 'rk4-h10' : 'rk4-h5'];
    for (const s of settings) runOne(c, s);
  }
}
