#!/usr/bin/env node
// Lane A known cases KA1..KA5, recorded before any six-member target run.
import fs from 'node:fs';
import { makeSystem, certify, run, sincos } from './weber-binding-sphere-ring-a-bnb.mjs';
const out = process.argv[2]; const rec = { startedUtc: new Date().toISOString(), node: process.version, cases: {} };
let seed = 20261007; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return (seed + 0.5) / 4294967296; };
// KA0: own sine/cosine against the library (measured; the proof of the 5e-13 bound is in the document)
{ let md = 0; for (let i = 0; i < 2e6; i++) { const x = rnd() * 3.1416; const [s, c] = sincos(x); md = Math.max(md, Math.abs(s - Math.sin(x)), Math.abs(c - Math.cos(x))); }
  const pts = []; for (let i = 0; i < 2000; i++) { const x = rnd() * 3.1416; const [s, c] = sincos(x); pts.push([x, s, c]); }
  fs.writeFileSync(`${out}/ka0-trig-points.json`, JSON.stringify(pts));
  rec.cases.KA0 = { what: 'own Taylor sincos vs Math.sin/Math.cos on 2e6 points in [0,3.1416]', maxAbsDiff: md, tolerance: 5e-13, pass: md < 5e-13, utc: new Date().toISOString() }; }
// KA1: enclosure property on random boxes, all three six-member words and both four-member words
{ const res = {}; let total = 0, fails = 0, jfails = 0, jchecks = 0, minSlack = Infinity;
  for (const word of ['+-+-+-', '++-+--', '+++---', '+-+-', '++--']) {
    const sys = makeSystem(word, 0.01); const { N, M } = sys; const n = N === 6 ? 120000 : 60000; let f = 0;
    for (let it = 0; it < n; it++) {
      const e = []; let se = 0; for (let k = 0; k < N; k++) { const v = -Math.log(rnd()); e.push(v); se += v; }
      const g = e.map((v) => 0.02 + (2 * Math.PI - N * 0.02) * v / se);
      const w = Math.pow(10, -6 + 4.5 * rnd()); const lo = new Float64Array(M), hi = new Float64Array(M);
      for (let k = 0; k < M; k++) { lo[k] = Math.max(0.01, g[k] - w * rnd()); hi[k] = g[k] + w * rnd(); }
      if (!sys.enclose(lo, hi)) { f++; continue; }
      const { T, U } = sys.pointTU(g); let ok = true;
      for (let i = 0; i < N; i++) { if (!(sys.TL[i] <= T[i] && T[i] <= sys.TH[i] && sys.UL[i] <= U[i] && U[i] <= sys.UH[i])) ok = false; minSlack = Math.min(minSlack, T[i] - sys.TL[i], sys.TH[i] - T[i], U[i] - sys.UL[i], sys.UH[i] - U[i]); }
      for (let i = 0; i < N; i++) for (let k = i + 1; k < N; k++) { const [l, h] = sys.udiff(i, k); const d = U[i] - U[k]; if (!(l <= d && d <= h)) ok = false; }
      if (!ok) f++;
      if (it % 100 === 0) { // Jacobian enclosure against central finite differences of the library evaluator
        const [JL, JH] = sys.jacobian(lo, hi); const eps = 1e-6;
        for (let k = 0; k < M; k++) { const gp = g.slice(), gm = g.slice(); gp[k] += eps; gm[k] -= eps; const Tp = sys.pointTU(gp).T, Tm = sys.pointTU(gm).T;
          for (let i = 0; i < M; i++) { const fd = (Tp[i] - Tm[i]) / (2 * eps); const tol = 1e-5 * (1 + Math.abs(fd)) + 1e-3 * Math.abs(fd) * 0 ; jchecks++; if (!(JL[i][k] - tol * (1 + Math.max(...Array.from(JH[i], Math.abs)) ) <= fd && fd <= JH[i][k] + tol * (1 + Math.max(...Array.from(JH[i], Math.abs))))) jfails++; } } }
    }
    res[word] = { boxes: n, failures: f }; total += n; fails += f; }
  rec.cases.KA1 = { what: 'library-trig point values of all T_i, U_i, U_i-U_k inside the interval enclosure of a random box (half-widths 1e-6..3e-2) containing the point; gaps >= 0.02', perWord: res, totalBoxes: total, failures: fails, minSlack, jacobianEntriesChecked: jchecks, jacobianFailures: jfails, pass: fails === 0 && jfails === 0 && minSlack >= 0, utc: new Date().toISOString() }; }
// KA2: hexagon retained; certificate
{ const sys = makeSystem('+-+-+-', 0.01); const g = Math.PI / 3; const lo = new Float64Array(5).fill(g - 1e-9), hi = new Float64Array(5).fill(g + 1e-9);
  const ex = sys.exclude(lo, hi); const om = -(5 / 4 - 1 / Math.sqrt(3));
  const contains0 = Array.from(sys.TL).every((l, i) => l <= 0 && sys.TH[i] >= 0); const containsOm = Array.from(sys.UL).every((l, i) => l <= om && sys.UH[i] >= om);
  const radii = [0.01, 0.02, 0.025, 0.03, 0.035, 0.04, 0.05].map((r) => certify(sys, r));
  const s4 = makeSystem('+-+-', 0.01); const radii4 = [0.02, 0.05, 0.08, 0.09, 0.1].map((r) => certify(s4, r));
  rec.cases.KA2 = { what: 'alternating hexagon box +-1e-9: not excluded, T enclosures contain 0, U enclosures contain -(5/4-1/sqrt3); injectivity certificate ||I-C J(X)||_inf<1 by radius', excludeCode: ex[0], contains0, containsOm, TL: Array.from(sys.TL), TH: Array.from(sys.TH), UL: Array.from(sys.UL), UH: Array.from(sys.UH), omegaSquared: -om, certificates6: radii, certificates4: radii4, pass: ex[0] === 0 && contains0 && containsOm && radii[1].certified && radii4[1].certified, utc: new Date().toISOString() }; }
// KA3: known non-solution boxes are excluded
{ const r = {}; let pass = true; for (const word of ['+++---', '++-+--']) { const sys = makeSystem(word, 0.01); const g = Math.PI / 3; const ex = sys.exclude(new Float64Array(5).fill(g - 1e-3), new Float64Array(5).fill(g + 1e-3)); r[word] = ex; if (ex[0] === 0) pass = false; }
  const sys = makeSystem('+-+-+-', 0.01); const lo = Float64Array.from([0.5, 1.2, 1.0, 1.3, 0.9].map((x) => x - 1e-3)), hi = Float64Array.from([0.5, 1.2, 1.0, 1.3, 0.9].map((x) => x + 1e-3)); const ex = sys.exclude(lo, hi); r['+-+-+- gaps (0.5,1.2,1.0,1.3,0.9,rest)'] = ex; if (ex[0] === 0) pass = false;
  rec.cases.KA3 = { what: 'regular hexagon with words +++--- and ++-+-- (box +-1e-3) and one irregular alternating box must be excluded; [code,index]', result: r, pass, utc: new Date().toISOString() }; }
// KA5: sensitivity; no box containing the hexagon is excluded
{ const sys = makeSystem('+-+-+-', 0.01); const g = Math.PI / 3; let bad = 0, n = 0;
  for (let it = 0; it < 20000; it++) { const w = Math.pow(10, -9 + 8.7 * rnd()); const lo = new Float64Array(5), hi = new Float64Array(5); for (let k = 0; k < 5; k++) { lo[k] = Math.max(0.01, g - w * rnd()); hi[k] = g + w * rnd(); } n++; if (sys.exclude(lo, hi)[0] !== 0) bad++; }
  const lo0 = new Array(5).fill(g - 2e-9), hi0 = new Array(5).fill(g + 2e-9);
  const rr = run({ word: '+-+-+-', delta: 0.01, kr: 0, out, tag: 'ka5-hexagon-root', lo0, hi0 });
  const s4 = makeSystem('+-+-', 0.01); let bad4 = 0; for (let it = 0; it < 20000; it++) { const w = Math.pow(10, -9 + 8.7 * rnd()); const lo = new Float64Array(3), hi = new Float64Array(3); for (let k = 0; k < 3; k++) { lo[k] = Math.max(0.01, Math.PI / 2 - w * rnd()); hi[k] = Math.PI / 2 + w * rnd(); } if (s4.exclude(lo, hi)[0] !== 0) bad4++; }
  rec.cases.KA5 = { what: '20000 random boxes containing the hexagon (half-widths 1e-9..0.5) must not be excluded; a branch-and-bound from a root box +-2e-9 around the hexagon without the uniqueness box must end with undecided boxes; same for the square', boxes: n, excluded: bad, squareExcluded: bad4, rootRunUndecided: rr.counts.undecided, rootRunCounts: rr.counts, pass: bad === 0 && bad4 === 0 && rr.counts.undecided > 0, utc: new Date().toISOString() }; }
// KA4: four-member analogue classified by the same code
{ const s4 = makeSystem('+-+-', 0.01); const cert = certify(s4, 0.05); const delta4 = Number(process.argv[3] || 0.01);
  const a = cert.certified ? run({ word: '+-+-', delta: delta4, kr: 0.05, out, tag: 'ka4-alt-square' }) : null; const b = run({ word: '++--', delta: delta4, kr: 0, out, tag: 'ka4-pp-mm' });
  const noK = run({ word: '+-+-', delta: 0.3, kr: 0, out, tag: 'ka4-alt-square-noK-detects', lo0: [1.4, 1.4, 1.4], hi0: [1.8, 1.8, 1.8] });
  rec.cases.KA4 = { what: 'four-member ring, gaps >= delta4: word +-+- everything excluded except the certified box around the square; word ++-- everything excluded; without the uniqueness box the square region is retained as undecided', delta4, certificate: cert, omegaSquaredSquare: (2 * Math.SQRT2 - 1) / 4, alt: a && { counts: a.counts, status: a.status, digest: a.leafDigestSha256, wall: a.wallSeconds }, ppmm: { counts: b.counts, status: b.status, digest: b.leafDigestSha256, wall: b.wallSeconds }, noKUndecided: noK.counts.undecided,
    pass: !!a && a.status === 'complete' && a.counts.undecided === 0 && a.counts.insideK > 0 && b.status === 'complete' && b.counts.undecided === 0 && noK.counts.undecided > 0, utc: new Date().toISOString() }; }
rec.finishedUtc = new Date().toISOString(); rec.allPass = Object.values(rec.cases).every((c) => c.pass);
fs.writeFileSync(`${out}/known-cases.json`, JSON.stringify(rec, null, 1));
for (const [k, v] of Object.entries(rec.cases)) console.log(k, v.pass ? 'PASS' : 'FAIL', v.utc);
console.log('allPass', rec.allPass);
