#!/usr/bin/env node
// Round-2 harmonic ladder (PI addition, 23:34Z): stage 2 with the amended residual solved at M = 3, 5, 7 (9),
// N_c = 4M+4, each rung seeded from the previous one. Reports the fine-grid combined residual
// max(E by v_rms^2/R, S, V) at each rung and the class of the state at each rung.
// Usage: node ...-r2-ladder.mjs --mode known
//        node ...-r2-ladder.mjs --mode pool --tags a,b --top 10 [--part i/n] [--Ms 3,5,7] --tag name
//        node ...-r2-ladder.mjs --mode fresh --stratum free --first 2000 --starts 5 [--Ms 3,5,7] --tag name
// Heartbeat: one line per rung.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { L, lmBounded, classifyR2, BOX } from './weber-binding-sphere-mc-r2-lib.mjs';
const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.resolve(HERE, '../../../../..'), DIR = path.join(ROOT, '.local-data/master-equation-closure/weber-binding-sphere/mc');
const args = process.argv.slice(2), arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; }, R = 1, utc = () => new Date().toISOString(), t0 = Date.now(), wall = () => ((Date.now() - t0) / 1000).toFixed(1);
const mode = arg('--mode', 'known'), Ms = arg('--Ms', '3,5,7').split(',').map(Number), tag = arg('--tag', mode), maxIter = Number(arg('--max-iter', '150'));
const vSub = arg("--v-box", null); if (vSub) { const [lo, hi] = vSub.split(",").map(Number); BOX.v[0] = lo; BOX.v[1] = hi; } // optional declared speed sub-box or pinned speed (lo = hi); round-2 extra
const clampTo = (x, [lo, hi]) => Math.min(hi, Math.max(lo, x));
function solve(MM, BB, c, om, v, iters) {
  const prob = L.makeProblem({ q: L.Q6, M: MM, Nc: 4 * MM + 4, R, stage: 2, B: BB, eNorm: 'speed' }), p = new Float64Array(prob.np);
  p.set(L.toReduced(BB, c)); p[prob.iOmega] = clampTo(om, BOX.omega); p[prob.iV] = clampTo(v, BOX.v);
  const s = lmBounded(prob, p, { maxIter: iters });
  if (!s.ok) return { ok: false, M: MM, reason: s.reason };
  const fine = L.fineEvaluate(s.c, s.omega, L.Q6, MM, { v: s.v, R }), cls = classifyR2(fine, s.omega, R);
  return { ok: true, M: MM, Nc: 4 * MM + 4, iter: s.iter, reason: s.reason, omega: s.omega, v: s.v, boxLimited: s.boxLimited, combined: Math.max(fine.maxEspeed, fine.maxS, fine.maxV), maxE: fine.maxE, maxEspeed: fine.maxEspeed, maxS: fine.maxS, maxV: fine.maxV, minSep: fine.minSep, det: [fine.detMin, fine.detMax], detOneSigned: cls.detOneSigned, separationOK: cls.separationOK, speed: [fine.speedMin, fine.speedMax], Hplus3v2: fine.Hplus3v2, sigDVariation: fine.sigDVariation, pairDistanceSpread: fine.pairDistanceSpread, rigid: fine.pairDistanceSpread <= 1e-6, exactHexagon: cls.hexagon, hexagon: cls.hexagon || cls.hexagonNear, candidate: cls.candidate, dominantHarmonic: fine.dominantHarmonic.join(''), c: s.c };
}
function trend(rungs) {
  const ok = rungs.filter(x => x.ok); if (ok.length < 2) return 'incomplete';
  if (ok.some(x => x.exactHexagon)) return `hexagon at M=${ok.find(x => x.exactHexagon).M}`;
  const r = ok.map(x => x.combined), ratios = r.slice(1).map((z, k) => z / r[k]), flags = [];
  if (ok.some(x => x.boxLimited)) flags.push(`box-limited at M=${ok.filter(x => x.boxLimited).map(x => x.M).join(',')}`);
  if (ok.some(x => !x.detOneSigned)) flags.push(`determinant changes sign at M=${ok.filter(x => !x.detOneSigned).map(x => x.M).join(',')}`);
  if (ok.some(x => x.rigid)) flags.push(`rigid at M=${ok.filter(x => x.rigid).map(x => x.M).join(',')}`);
  const base = ratios.every(q => q < 0.3) ? 'falls geometrically' : ratios.every(q => q < 0.9) ? 'falls slowly' : ratios.some(q => q > 1.1) ? 'rises' : 'stalls';
  return [base, ...flags].join('; ');
}
function ladder(label, c3, om, v, stratumGens, out) {
  let c = c3, Mprev = 3, omega = om, vv = v; const rungs = [];
  for (const MM of Ms) {
    const BB = L.stratumBasis(6, MM, stratumGens), res = solve(MM, BB, MM === Mprev ? c : L.padCoefficients(c, 6, Mprev, MM), omega, vv, maxIter);
    if (res.ok) { c = Float64Array.from(res.c); omega = res.omega; vv = res.v; Mprev = MM; }
    const { c: _c, ...rest } = res; rungs.push(rest);
    console.log(`HB ${utc()} ${label} M=${MM} combined=${res.ok ? res.combined.toExponential(2) : 'invalid'} it=${res.iter} ${res.exactHexagon ? 'hex' : ''}${res.boxLimited ? ' box' : ''}${res.ok && !res.detOneSigned ? ' detsign' : ''}${res.rigid ? ' rigid' : ''} omega=${res.omega?.toFixed(4)} v=${res.v?.toFixed(4)} wall=${wall()}`);
    if (!res.ok) break;
  }
  const rec = { label, rungs, trend: trend(rungs) }; out.push(rec); fs.appendFileSync(path.join(DIR, `r2-ladder-${tag}.jsonl`), JSON.stringify(rec) + '\n'); return rec;
}
const out = []; fs.writeFileSync(path.join(DIR, `r2-ladder-${tag}.jsonl`), '');
if (mode === 'known') {
  const Om = L.hexagonOmega(R), known = { utc: utc(), command: 'node reference/priorities/master-equation-closure/braid-program/evidence/weber-binding-sphere-mc-r2-ladder.mjs --mode known --Ms ' + Ms.join(','), hexagon: [], rosette: [] };
  for (const MM of Ms) { const z = solve(MM, L.stratumBasis(6, MM), L.hexagonCoefficients(MM, R), Om, Om * R, 0); known.hexagon.push({ M: MM, Nc: 4 * MM + 4, combined: z.combined, maxE: z.maxE }); console.log(`KNOWN hexagon M=${MM} combined=${z.combined.toExponential(2)}`); }
  const r = L.rng(20261006), c0 = L.toFull(L.stratumBasis(6, 3), L.toReduced(L.stratumBasis(6, 3), L.perturb(L.hexagonCoefficients(3, R), r, 0.2)));
  const lad = ladder('reach-hexagon-20pct', c0, Om * 1.1, Om * 0.9, [], out); known.hexagonLadderFromPerturbedStart = lad.rungs.map(x => ({ M: x.M, combined: x.combined, exactHexagon: x.exactHexagon, iter: x.iter }));
  // rosette: stage-1 fine-grid residual against M (N=2), each solve seeded from the converged M=40 coefficient set truncated to M
  const kf = path.join(ROOT, '.tmp/weber-binding-sphere/mc/kc3-phi2-coefficients.json');
  if (fs.existsSync(kf)) { const k = JSON.parse(fs.readFileSync(kf, 'utf8')), cFull = Float64Array.from(k.c), Rk = Math.sqrt(L.meanSquareRadius(cFull, 2, k.M).value);
    for (const MM of [6, 10, 14, 18, 24]) { const B2 = L.stratumBasis(2, MM), prob = L.makeProblem({ q: [1, -1], M: MM, Nc: 4 * MM + 2, R: Rk, stage: 1, B: B2, norm: 'meanRadius', eNorm: 'speed' }), p = new Float64Array(prob.np); p.set(L.toReduced(B2, L.padCoefficients(cFull, 2, k.M, MM))); p[prob.iOmega] = k.omega;
      const s = lmBounded(prob, p, { maxIter: 100, bounded: false, tol: 1e-28 }), fine = L.fineEvaluate(s.c, s.omega, [1, -1], MM, { Nf: 1024, R: Rk });
      known.rosette.push({ M: MM, Nc: 4 * MM + 2, fineMaxEspeed: fine.maxEspeed, fineMaxE: fine.maxE, periodError: 2 * Math.PI / s.omega - 5.311758491618341, iter: s.iter }); console.log(`KNOWN rosette M=${MM} fineEspeed=${fine.maxEspeed.toExponential(2)} periodError=${(2 * Math.PI / s.omega - 5.311758491618341).toExponential(2)}`); } }
  const series = known.rosette.filter(x => x.M >= 10), rr = series.map(x => x.fineMaxEspeed); // the M=6 rung is recorded but excluded: there the solve leaves the rosette for the exactly representable circular orbit (a class change)
  known.rosetteClassChangeAtLowM = known.rosette.filter(x => x.M < 10).map(x => ({ M: x.M, fineMaxEspeed: x.fineMaxEspeed, periodError: x.periodError }));
  known.rosetteDecayPerHarmonic = rr.length > 1 ? Math.pow(rr[rr.length - 1] / rr[0], 1 / (series[rr.length - 1].M - series[0].M)) : null;
  known.pass = known.hexagon.every(x => x.combined <= 1e-13) && lad.rungs.every(x => x.exactHexagon && x.combined <= 1e-10) && rr.length > 2 && rr.slice(1).every((z, i) => z < 0.1 * rr[i]);
  fs.writeFileSync(path.join(HERE, 'weber-binding-sphere-mc-r2-ladder-known.json'), JSON.stringify(known, null, 1)); console.log('KNOWN pass', known.pass, 'rosette decay per harmonic', known.rosetteDecayPerHarmonic);
  process.exit(known.pass ? 0 : 1);
}
const perm = f => Array.from({ length: 6 }, (_, k) => ((f(k) % 6) + 6) % 6), GENS = { c2: [{ perm: perm(k => k + 3), R: L.rotZ(Math.PI), eps: 1 }] };
if (mode === 'pool') {
  const tags = arg('--tags').split(','), top = Number(arg('--top', '10')), [pi, pn] = arg('--part', '0/1').split('/').map(Number), allowBox = args.includes('--allow-box-limited'), cand = [];
  for (const tg of tags) for (const line of fs.readFileSync(path.join(DIR, `r2-search-${tg}.jsonl`), 'utf8').trim().split('\n').filter(Boolean)) { const row = JSON.parse(line); for (const key of ['direct2', 'stage1then2']) { const x = row.results[key]; if (x && x.ok && !x.hexagon && (allowBox ? x.boxLimited : !x.boxLimited) && Number.isFinite(x.score)) cand.push({ tg, start: row.start, type: row.type, route: key, x }); } }
  cand.sort((a, b) => a.x.score - b.x.score); const seen = new Set(), pick = []; for (const c of cand) { if (seen.has(c.start)) continue; seen.add(c.start); pick.push(c); if (pick.length >= top) break; }
  console.log(`START ${utc()} ladder pool tags=${tags} pool=${cand.length} picked=${pick.length} part=${pi}/${pn} Ms=${Ms} allowBoxLimited=${allowBox}`);
  pick.forEach((c, i) => { if (i % pn !== pi) return; const rec = ladder(`${c.tg}:${c.start}:${c.route}:${c.type}`, Float64Array.from(c.x.c), c.x.omega, c.x.v, GENS[arg('--stratum', 'free')] ?? [], out); rec.rank = i; rec.M3searchScore = c.x.score; rec.M3boxLimited = c.x.boxLimited; });
} else if (mode === 'fresh') {
  const S = await import('./weber-binding-sphere-mc-r2-search.mjs'), first = Number(arg('--first', '2000')), n = Number(arg('--starts', '5'));
  console.log(`START ${utc()} ladder fresh starts=${first}..${first + n - 1} Ms=${Ms}`);
  for (let k = first; k < first + n; k++) { const st = S.makeStart(k); ladder(`fresh:${k}:${st.type}`, st.c, st.om, st.v, [], out); }
}
fs.writeFileSync(path.join(HERE, `weber-binding-sphere-mc-r2-ladder-${tag}.json`), JSON.stringify({ utc: utc(), mode, Ms, args, ladders: out }, null, 1));
console.log(`DONE ${utc()} ladders=${out.length} wall=${wall()}`);
