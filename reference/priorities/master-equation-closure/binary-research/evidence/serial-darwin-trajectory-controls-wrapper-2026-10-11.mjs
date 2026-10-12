#!/usr/bin/env node
// serial-darwin-trajectory-controls-wrapper-2026-10-11.mjs
// Serial task 6: the three remaining Darwin trajectory controls. This wrapper imports runCase() of the
// unchanged pair instrument darwin-overnight-pair-instrument.mjs (refusing to run unless its SHA-256 is the
// reviewed one), builds the three selected preparations with the original frozen domain and event settings,
// and writes every record to a fresh directory given by --out. It never calls the instrument's controls()
// or CLI, and it refuses to overwrite an existing file. The instantaneous Section 10 functional is the
// selected comparison only; K = c_f = 1 are the instrument's fixed constants; unit integration weights.
//
// Usage: node <this> --out <fresh directory> known
//        node <this> --out <directory holding a passing known.json> all
//
// Known cases (run and recorded before any target; `all` refuses to start without a passing known.json
// written by this same wrapper source):
//   k1  zero-coupling mirror circle (Kepler, relative mu = 2K): member speed sqrt(K/(2 r0)), period
//       2 pi sqrt(r0^3/(2K)); five periods; separation stays 100 and the pair returns to its start.
//   k2  coupled mirror circle: member speed u with u^2 = 2K/(4 r0 + K) (derived in the task report from the
//       mirror-reduced functional, not taken from the instrument), period pi r0/u; five periods; same test.
//   k3  planted wrong preparation (negative): the zero-coupling speed under the full coupled law must NOT
//       pass the circle test (separation excursion above 0.1).
//   k4  planted wrong switch (negative): interaction = 0 removes both terms, so the DG-100 preparation must
//       move on straight lines; the separation after one period must equal |d0 + w t| and exceed 300.
//   k5  replay of a prior control in a fresh path: full-coupling DG-100 for 20 periods at the P setting must
//       reproduce the retained first apocentre 100.047180388 and last pericentre 99.9997596623.
//   k6  the retained DG-100 case file must equal the preparation built here (positions, velocities,
//       polarities, domain and event settings, cadence), and pi r0/u must equal the retained period.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const INSTR = path.join(HERE, 'darwin-overnight-pair-instrument.mjs');
const INSTR_SHA = '868f68e860d453d1c60a57d4367034fe2cb80fdc009d468414d0c9c4e0242296';
const sha = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
if (sha(INSTR) !== INSTR_SHA) { console.error('pair instrument hash differs from the reviewed one; refusing to run'); process.exit(2); }
const SELF_SHA = sha(fileURLToPath(import.meta.url));
const { runCase } = await import(INSTR);

const argv = process.argv.slice(2);
const oi = argv.indexOf('--out');
if (oi < 0 || !argv[oi + 1]) { console.error('usage: --out <dir> known|all'); process.exit(2); }
const OUT = path.resolve(argv[oi + 1]);
const mode = argv.filter((a, i) => i !== oi && i !== oi + 1)[0];
fs.mkdirSync(OUT, { recursive: true });
const writeFresh = (name, text) => { const f = path.join(OUT, name); fs.writeFileSync(f, text, { flag: 'wx' }); return f; };

// ---- original frozen domain and event settings (preregistration Section 2, as in the retained run-targets.mjs)
const FROZEN = { rContact: 1e-3, rEscape: 1e4, speedBound: 0.1, epsBound: 0.05, detTol: 1e-12, condMax: 1e12, tTol: 1e-9 };
const SETTINGS = {
  P: { integrator: 'dp54', rtol: 1e-10, atol: 1e-12 },
  C: { integrator: 'dp54', rtol: 1e-12, atol: 1e-12 },
  R5: { integrator: 'rk4', h: 5 },            // separate fixed-step method inside the same instrument
};
const u = 0.07062245515464487;                 // DC-100 member speed (retained case table)
const period = 4448.433075160754;              // DC-100 period (retained case table)
const base = { positions: [[50, 0, 0], [-50, 0, 0]], polarities: [1, -1], r0: 100, u, period, outputDt: period / 200 };
const CASES = {
  'DC-100-200p': { ...base, caseId: 'DC-100', velocities: [[0, u, 0], [0, -u, 0]], tMax: 200 * period, runLength: '200 periods of DC-100' },
  'DG-100-zero-coupling-200p': { ...base, caseId: 'DG-100-zero-coupling', velocities: [[0.005, u, 0.002], [0.005, -u, 0]], coupling: 0, pairTerm: 1, tMax: 200 * period, runLength: '200 periods of DC-100; velocity coupling zero, inverse-distance term kept' },
  'DC-100-normal-50p': { ...base, caseId: 'DC-100-normal', velocities: [[0, u, 0.005], [0, -u, 0.005]], tMax: 50 * period, runLength: '50 periods of DC-100; common normal velocity (0,0,0.005)' },
};

const sepOf = (st) => Math.hypot(st.positions[0][0] - st.positions[1][0], st.positions[0][1] - st.positions[1][1], st.positions[0][2] - st.positions[1][2]);
const returnError = (r, spec) => Math.max(...[0, 1].map((i) => Math.hypot(...[0, 1, 2].map((c) => r.final.state.positions[i][c] - spec.positions[i][c]))));
const sepRange = (r) => { let lo = Infinity, hi = -Infinity; for (const s of r.samples) { const v = s.pairs[0].r; if (v < lo) lo = v; if (v > hi) hi = v; } for (const e of r.events) { const v = e.pairs[0].r; if (v < lo) lo = v; if (v > hi) hi = v; } return [lo, hi]; };

function known() {
  const out = { wrapperSha256: SELF_SHA, instrumentSha256: INSTR_SHA, node: process.version, utcStart: new Date().toISOString(), cases: {} };
  const P = SETTINGS.P;
  // k1 zero-coupling circle
  { const v = Math.sqrt(1 / 200), T = 2 * Math.PI * Math.sqrt(1e6 / 2);
    const spec = { ...FROZEN, ...P, ...base, caseId: 'k1', velocities: [[0, v, 0], [0, -v, 0]], coupling: 0, pairTerm: 1, tMax: 5 * T, outputDt: T / 200 };
    const r = runCase(spec); const [lo, hi] = sepRange(r); const ret = returnError(r, spec);
    out.cases.k1 = { description: 'zero-coupling mirror circle, five periods', speed: v, period: T, sepMin: lo, sepMax: hi, returnError: ret, stop: r.final.stopReason, pass: r.final.stopReason === 'tMax' && Math.max(100 - lo, hi - 100) < 1e-5 && ret < 1e-3 }; }
  // k2 coupled circle
  { const uDerived = Math.sqrt(2 / 401), T = Math.PI * 100 / uDerived;
    const spec = { ...FROZEN, ...P, ...base, caseId: 'k2', velocities: [[0, uDerived, 0], [0, -uDerived, 0]], tMax: 5 * T, outputDt: T / 200 };
    const r = runCase(spec); const [lo, hi] = sepRange(r); const ret = returnError(r, spec);
    out.cases.k2 = { description: 'coupled mirror circle with u^2 = 2K/(4 r0 + K), five periods', speedDerived: uDerived, speedRetained: u, speedDifference: uDerived - u, period: T, sepMin: lo, sepMax: hi, returnError: ret, stop: r.final.stopReason, pass: r.final.stopReason === 'tMax' && Math.abs(uDerived - u) < 1e-16 && Math.max(100 - lo, hi - 100) < 1e-5 && ret < 1e-3 }; }
  // k3 negative: wrong preparation
  { const v = Math.sqrt(1 / 200), T = Math.PI * 100 / u;
    const spec = { ...FROZEN, ...P, ...base, caseId: 'k3', velocities: [[0, v, 0], [0, -v, 0]], tMax: 5 * T, outputDt: T / 200 };
    const r = runCase(spec); const [lo, hi] = sepRange(r);
    out.cases.k3 = { description: 'negative: zero-coupling speed under the coupled law is not a circle', sepMin: lo, sepMax: hi, pass: Math.max(100 - lo, hi - 100) > 0.1 }; }
  // k4 negative: wrong switch
  { const spec = { ...FROZEN, ...P, ...CASES['DG-100-zero-coupling-200p'], caseId: 'k4', coupling: undefined, pairTerm: undefined, interaction: 0, tMax: period };
    delete spec.coupling; delete spec.pairTerm;
    const r = runCase(spec); const sep = sepOf(r.final.state); const exact = Math.hypot(100, 2 * u * period, 0.002 * period);
    out.cases.k4 = { description: 'negative: interaction = 0 removes both terms (free motion)', sepFinal: sep, sepFree: exact, difference: sep - exact, echoedCoupling: r.preparation.coupling, echoedPairTerm: r.preparation.pairTerm, pass: Math.abs(sep - exact) < 1e-8 && sep > 300 && r.preparation.coupling === 0 && r.preparation.pairTerm === 0 }; }
  // k5 replay of the retained full-coupling DG-100 20-period control
  { const spec = { ...FROZEN, ...P, ...CASES['DG-100-zero-coupling-200p'], caseId: 'k5-DG-100-full', tMax: 20 * period };
    delete spec.coupling; delete spec.pairTerm;
    const r = runCase(spec); const tp = r.events.filter((e) => e.kind === 'turning-point');
    const firstApo = tp.find((e) => e.direction.startsWith('maximum')); const peri = tp.filter((e) => e.direction.startsWith('minimum'));
    const lastPeri = peri[peri.length - 1];
    out.cases.k5 = { description: 'replay: full-coupling DG-100, 20 periods, P setting, against the retained first apocentre and last pericentre', firstApocentre: firstApo?.pairs[0].r, lastPericentre: lastPeri?.pairs[0].r, pericentres: peri.length, retainedFirstApocentre: 100.047180388, retainedLastPericentre: 99.9997596623, echoedCoupling: r.preparation.coupling, echoedPairTerm: r.preparation.pairTerm,
      pass: !!firstApo && !!lastPeri && Math.abs(firstApo.pairs[0].r - 100.047180388) < 5e-9 && Math.abs(lastPeri.pairs[0].r - 99.9997596623) < 5e-9 && r.preparation.coupling === 1 && r.preparation.pairTerm === 1 }; }
  // k6 retained preparation and period
  { const kept = JSON.parse(fs.readFileSync(path.join(HERE, 'darwin-overnight-promoted/instrument/cases/DG-100.json'), 'utf8'));
    const mine = { ...FROZEN, ...CASES['DG-100-zero-coupling-200p'] };
    const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    const fields = ['positions', 'velocities', 'polarities', 'rContact', 'rEscape', 'speedBound', 'epsBound', 'detTol', 'condMax', 'tTol', 'outputDt', 'u', 'period', 'r0'];
    const diff = fields.filter((f) => !same(kept[f], mine[f]));
    out.cases.k6 = { description: 'retained DG-100 case file equals the preparation built here except horizon and coupling switch; pi r0/u equals the retained period', differingFields: diff, retainedTMax: kept.tMax, twentyPeriods: 20 * period, piR0OverU: Math.PI * 100 / u, retainedSetting: [kept.integrator, kept.rtol, kept.atol],
      pass: diff.length === 0 && kept.tMax === 20 * period && Math.PI * 100 / u === period && kept.rtol === 1e-10 && kept.atol === 1e-12 }; }
  out.result = Object.values(out.cases).every((c) => c.pass) ? 'PASS' : 'FAIL';
  out.utcEnd = new Date().toISOString();
  return out;
}

function summarise(r, key, setting, spec, rawName, rawSha, utcStart, utcEnd) {
  const ext = { rMin: Infinity, rMax: -Infinity, maxAbsDErel: 0, maxAbsDP: 0, maxAbsDJ: 0, maxCentreSpeed: 0, tOfRMin: null, tOfRMax: null };
  for (const s of r.samples) {
    const v = s.pairs[0].r; if (v < ext.rMin) { ext.rMin = v; ext.tOfRMin = s.t; } if (v > ext.rMax) { ext.rMax = v; ext.tOfRMax = s.t; }
    ext.maxAbsDErel = Math.max(ext.maxAbsDErel, Math.abs(s.dErel)); ext.maxAbsDP = Math.max(ext.maxAbsDP, Math.hypot(...s.dP)); ext.maxAbsDJ = Math.max(ext.maxAbsDJ, Math.hypot(...s.dJ));
    ext.maxCentreSpeed = Math.max(ext.maxCentreSpeed, s.centreSpeed);
  }
  const kinds = {}; for (const e of r.events) kinds[e.kind] = (kinds[e.kind] || 0) + 1;
  const tp = r.events.filter((e) => e.kind === 'turning-point').map((e) => [e.t, e.pairs[0].r, e.direction.startsWith('minimum') ? 'min' : 'max']);
  const other = r.events.filter((e) => e.kind !== 'turning-point' && e.kind !== 'tMax');
  const every = 20;
  return { key, setting, wrapperSha256: SELF_SHA, instrumentSha256: INSTR_SHA, node: process.version, utcStart, utcEnd, wallMs: r.wallMs,
    spec, preparation: r.preparation, parameters: r.parameters, integrator: r.integrator, constants: r.constants, initialInvariants: r.initialInvariants,
    final: r.final, suprema: r.suprema, attainedHorizon: r.final.t, requestedHorizon: spec.tMax, stopReason: r.final.stopReason,
    sampleCount: r.samples.length, sampleExtrema: ext, eventKinds: kinds, turningPoints: tp, otherEvents: other,
    decimatedSamples: r.samples.filter((_, i) => i % every === 0).map((s) => ({ t: s.t, r: s.pairs[0].r, rdot: s.pairs[0].rdot, dErel: s.dErel, dP: s.dP, dJ: s.dJ, detH: s.detH, cond2: s.cond2, state: s.state })),
    decimation: `every ${every}th sample; extrema above are over all ${r.samples.length} samples`, rawFile: rawName, rawSha256: rawSha };
}

if (mode === 'known') {
  const k = known();
  writeFresh('known.json', JSON.stringify(k, null, 1));
  console.log(JSON.stringify({ result: k.result, cases: Object.fromEntries(Object.entries(k.cases).map(([a, c]) => [a, c.pass])) }));
  process.exit(k.result === 'PASS' ? 0 : 1);
} else if (mode === 'all') {
  const kf = path.join(OUT, 'known.json');
  if (!fs.existsSync(kf)) { console.error('no known.json in the output directory; run known first'); process.exit(2); }
  const k = JSON.parse(fs.readFileSync(kf, 'utf8'));
  if (k.result !== 'PASS' || k.wrapperSha256 !== SELF_SHA) { console.error('known.json is not a PASS from this wrapper source; refusing targets'); process.exit(2); }
  const index = [];
  for (const key of Object.keys(CASES)) for (const setting of ['P', 'C', 'R5']) {
    const spec = { ...FROZEN, ...CASES[key], ...SETTINGS[setting] };
    const utcStart = new Date().toISOString();
    let r;
    try { r = runCase(spec); }
    catch (e) { writeFresh(`${key}-${setting}.error.json`, JSON.stringify({ key, setting, spec, error: String(e && e.stack || e) }, null, 1)); index.push({ key, setting, error: String(e) }); console.log(`${key} ${setting}: ERROR ${e}`); continue; }
    const utcEnd = new Date().toISOString();
    const rawName = `${key}-${setting}.raw.json`; const rawText = JSON.stringify(r);
    writeFresh(rawName, rawText);
    const rawSha = crypto.createHash('sha256').update(rawText).digest('hex');
    const s = summarise(r, key, setting, spec, rawName, rawSha, utcStart, utcEnd);
    writeFresh(`${key}-${setting}.summary.json`, JSON.stringify(s, null, 1));
    const line = { key, setting, stop: s.stopReason, t: s.attainedHorizon, steps: r.integrator.steps, rejected: r.integrator.rejected, evaluations: r.integrator.evaluations, rMin: s.sampleExtrema.rMin, rMax: s.sampleExtrema.rMax, dErel: r.final.dErel, events: s.eventKinds, wallMs: r.wallMs, rawBytes: rawText.length };
    index.push(line); console.log(JSON.stringify(line));
  }
  writeFresh('targets-index.json', JSON.stringify(index, null, 1));
  process.exit(index.some((l) => l.error) ? 1 : 0);
} else { console.error('usage: --out <dir> known|all'); process.exit(2); }
