// Darwin lane, round 3 item 1: DG-100 for 200 periods of DC-100.
// Calls runCase() of the validated instrument (unchanged) with the round 1
// batch 2 DG-100 preparation and the frozen P (or C) setting; writes the record
// to .local-data/master-equation-closure/darwin-overnight/instrument/longrun/.
// Usage: node run-longrun.mjs [P|C]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
const INSTR = path.join(ROOT, 'reference/priorities/master-equation-closure/binary-research/evidence/darwin-overnight-pair-instrument.mjs');
const OUT = path.join(ROOT, '.local-data/master-equation-closure/darwin-overnight/instrument/longrun');
fs.mkdirSync(OUT, { recursive: true });
const { runCase } = await import(INSTR);

const setting = (process.argv[2] || 'P').toUpperCase();
const rtol = setting === 'C' ? 1e-12 : 1e-10;
const label = setting === 'C' ? 'dp54-rtol1e-12' : 'dp54-rtol1e-10';
const u = 0.07062245515464487;            // circular speed of DC-100 (batch 2 case table)
const period = 4448.433075160754;          // DC-100 period (batch 2 case table)
const nPeriods = 200;
const spec = {
  rContact: 1e-3, rEscape: 1e4, speedBound: 0.1, epsBound: 0.05, detTol: 1e-12, condMax: 1e12, tTol: 1e-9,
  caseId: 'DG-100', kind: 'perturbed',
  positions: [[50, 0, 0], [-50, 0, 0]],
  velocities: [[0.005, u, 0.002], [0.005, -u, 0]],
  polarities: [1, -1],
  r0: 100, u, period,
  tMax: nPeriods * period,
  outputDt: period / 200,
  runLength: `${nPeriods} periods of DC-100 (${period})`,
  note: 'DC-100 preparation plus common velocity (0.005,0,0) on both members and (0,0,0.002) on member 1; batch 2 DG-100 spec with tMax = 200 periods',
  integrator: 'dp54', rtol, atol: 1e-12,
};
fs.writeFileSync(path.join(HERE, `DG-100-200p-${label}.spec.json`), JSON.stringify(spec, null, 1));
const utcStart = new Date().toISOString();
const t0 = Date.now();
const r = runCase(spec);
r.setting = label; r.caseSpec = spec; r.wallMsTotal = Date.now() - t0; r.utcStart = utcStart; r.utcEnd = new Date().toISOString();
r.runnerNote = 'run by .tmp/darwin-overnight/instrument-longrun/run-longrun.mjs via runCase() of the validated instrument; no change to the integrator';
const file = path.join(OUT, `DG-100-200p-${label}.json`);
fs.writeFileSync(file, JSON.stringify(r));
console.log(`${spec.caseId} ${label}: steps=${r.integrator.steps} rej=${r.integrator.rejected} evals=${r.integrator.evaluations} stop=${r.final.stopReason} t=${r.final.t} samples=${r.samples.length} events=${r.events.length} dErel=${r.final.dErel.toExponential(3)} |dP|=${Math.hypot(...r.final.dP).toExponential(3)} |dJ|=${Math.hypot(...r.final.dJ).toExponential(3)} supV=${r.suprema.speed} supEps=${r.suprema.eps} wall=${r.wallMsTotal}ms utc=${utcStart}..${r.utcEnd} file=${file}`);
