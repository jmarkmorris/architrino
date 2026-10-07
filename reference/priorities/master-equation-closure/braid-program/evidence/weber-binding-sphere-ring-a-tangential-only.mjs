#!/usr/bin/env node
// Lane A, after exposure: tangential-only branch-and-bound for the alternating word. Uses the frozen instrument's
// enclosures (makeSystem.enclose, TL, TH) and certificate unchanged; the driver below applies ONLY the tests
// "infeasible", "outside the reduced domain", "some T_i enclosure excludes 0" and "inside the certified box".
// No radial condition and no sign of Omega^2 is used. Same root box, bisection rule and leaf record as the instrument.
import fs from 'node:fs'; import { createHash } from 'node:crypto';
import { makeSystem, certify, SYMM } from './weber-binding-sphere-ring-a-bnb.mjs';
const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i < 0 ? d : process.argv[i + 1]; };
const word = arg('word'), delta = Number(arg('delta')), kr = Number(arg('kr')), out = arg('out'), tag = arg('tag'), maxSeconds = Number(arg('max-seconds', '1e9')), known = arg('known', null);
const PI2_LO = 6.283185307179586, PI2_HI = 6.283185307179587, AW = 1e-12;
const sys = makeSystem(word, delta); const { N, M } = sys; const symm = SYMM[word];
const cert = kr > 0 ? certify(sys, kr) : null; if (kr > 0 && !cert.certified) throw new Error('uniqueness box not certified');
const center = 2 * Math.PI / N, Klo = center - kr, Khi = center + kr;
const counts = { processed: 0, bisected: 0, infeasible: 0, symmetry: 0, tangential: 0, insideK: 0, undecided: 0 }; const byT = {}; let deepest = 0;
const hash = createHash('sha256'); const buf = Buffer.alloc(8 * (2 * M + 3)); const t0 = Date.now(); let lastHb = t0; let status = 'complete';
// --known hexagon : known case for this driver, root box +-2e-9 around the hexagon with the uniqueness box off; must end undecided
const rootLo = known === 'hexagon' ? new Float64Array(M).fill(center - 2e-9) : new Float64Array(M).fill(delta);
const rootHi = known === 'hexagon' ? new Float64Array(M).fill(center + 2e-9) : new Float64Array(M).fill(PI2_HI - (N - 1) * delta);
const useK = kr > 0 && known !== 'hexagon'; const stack = [[rootLo, rootHi, 0]];
const leaf = (lo, hi, d, code, idx) => { buf.writeDoubleLE(d, 0); buf.writeDoubleLE(code, 8); buf.writeDoubleLE(idx, 16); for (let k = 0; k < M; k++) { buf.writeDoubleLE(lo[k], 24 + 16 * k); buf.writeDoubleLE(hi[k], 32 + 16 * k); } hash.update(buf); };
while (stack.length) {
  const [lo, hi, depth] = stack.pop(); counts.processed++; if (depth > deepest) deepest = depth;
  if ((counts.processed & 4095) === 0) { const now = Date.now(); if (now - lastHb >= 5000) { lastHb = now; console.log(`HEARTBEAT ${tag} processed=${counts.processed} pending=${stack.length} deepest=${deepest} wall_s=${((now - t0) / 1000).toFixed(1)}`); } if ((now - t0) / 1000 > maxSeconds) { status = 'partial-deadline'; stack.push([lo, hi, depth]); break; } }
  let sl = 0, sh = 0; for (let k = 0; k < M; k++) { sl += lo[k]; sh += hi[k]; }
  const lastLo = Math.max(delta, PI2_LO - sh - AW), lastHi = PI2_HI - sl + AW;
  if (lastHi < delta) { counts.infeasible++; leaf(lo, hi, depth, 1, 0); continue; }
  let sym = false; for (const [a, b] of symm) { const la = a === M ? lastLo : lo[a], hb = b === M ? lastHi : hi[b]; if (la > hb) { sym = true; break; } }
  if (sym) { counts.symmetry++; leaf(lo, hi, depth, 2, 0); continue; }
  if (!sys.enclose(lo, hi)) { counts.infeasible++; leaf(lo, hi, depth, 1, 0); continue; }
  let ti = -1; for (let i = 0; i < N; i++) if (sys.TL[i] > 0 || sys.TH[i] < 0) { ti = i; break; }
  if (ti >= 0) { counts.tangential++; byT[ti] = (byT[ti] || 0) + 1; leaf(lo, hi, depth, 3, ti); continue; }
  if (useK) { let inside = true; for (let k = 0; k < M; k++) if (lo[k] < Klo || hi[k] > Khi) { inside = false; break; } if (inside) { counts.insideK++; leaf(lo, hi, depth, 6, 0); continue; } }
  let best = -1, bk = 0; for (let k = 0; k < M; k++) { const sc = (hi[k] - lo[k]) / Math.min(1, lo[k]); if (sc > best) { best = sc; bk = k; } }
  if (hi[bk] - lo[bk] < 1e-9 || depth > 400) { counts.undecided++; leaf(lo, hi, depth, 7, 0); continue; }
  const mid = 0.5 * (lo[bk] + hi[bk]); counts.bisected++; const lo2 = Float64Array.from(lo), hi1 = Float64Array.from(hi); hi1[bk] = mid; lo2[bk] = mid; stack.push([lo2, hi, depth + 1]); stack.push([lo, hi1, depth + 1]);
}
const res = { tag, mode: 'tangential-only', word, delta, uniquenessBoxRadius: kr, certificate: cert, known, status, counts, byTangentialMember: byT, deepest, pending: stack.length, leafDigestSha256: hash.digest('hex'), wallSeconds: (Date.now() - t0) / 1000, finishedUtc: new Date().toISOString() };
fs.writeFileSync(`${out}/${tag}.result.json`, JSON.stringify(res, null, 1)); console.log('DONE', JSON.stringify(res));
