// Round 3: compare the blind reference receipt against the subject spectrum receipt, and spot-check 13.5(i).
// Run from the repository root: node .tmp/darwin-overnight/ring-reference/round3-compare.mjs
import fs from 'node:fs';
const base = 'reference/priorities/master-equation-closure/binary-research/evidence/';
const ref = JSON.parse(fs.readFileSync(base + 'darwin-overnight-ring-reference-controls.json', 'utf8'));
const sub = JSON.parse(fs.readFileSync(base + 'darwin-overnight-ring-spectrum-controls.json', 'utf8'));
const out = [];
const log = (s) => { out.push(s); console.log(s); };
// agreeing significant digits between two numbers
function digits(a, b) {
  const d = Math.abs(a - b); const s = Math.max(Math.abs(a), Math.abs(b));
  if (d === 0) return 16; if (s === 0) return 16;
  return Math.max(0, Math.floor(-Math.log10(d / s)));
}
const S2 = Math.SQRT2;
log('=== Part A: closed forms (both sides state the same formulas; evaluated here at R=50,100) ===');
for (const R of [50, 100, 200]) {
  const eig = {
    'm0 radial breathing': 1 - (2 - S2) / (4 * R), 'm0 tangential rotation': 1 - (1 + S2) / (4 * R), 'm0 axial': 1 - (2 * S2 - 1) / (4 * R),
    'm2 radial shear': 1 - (2 + S2) / (4 * R), 'm2 tangential twist': 1 + (S2 - 1) / (4 * R), 'm2 axial': 1 + (2 * S2 + 1) / (4 * R),
    'm1,3 in-plane lower (x2)': 1 + (3 - Math.sqrt(73)) / (8 * R), 'm1,3 in-plane upper (x2)': 1 + (3 + Math.sqrt(73)) / (8 * R), 'm1,3 axial tilt (x2)': 1 - 1 / (4 * R),
  };
  log(`R=${R}: ` + Object.entries(eig).map(([k, v]) => `${k}=${v.toPrecision(13)}`).join('; '));
}
log('singular radii (both sides): ' + [(2 - S2) / 4, 0.25, (2 * S2 - 1) / 4, (1 + S2) / 4, (Math.sqrt(73) - 3) / 8, (2 + S2) / 4].map(x => x.toFixed(12)).join(', '));
log('threshold (1+sqrt2)/8 = ' + ((1 + S2) / 8).toFixed(12) + '; domain bound = ' + ((200 * (2 * S2 - 1) + 1 + S2) / 8).toFixed(10) + '; weak bound 10 sqrt2 = ' + (10 * S2).toFixed(10));
log('=== Part B: balance, E, Jz, v: reference T3 rows vs subject ringRecertification ===');
for (const srow of sub.ringRecertification) {
  const rrow = ref.targets.T3_balance.rows.find(r => r.R === srow.R);
  if (!rrow) { log(`R=${srow.R}: no reference row (subject-only radius)`); continue; }
  const vRef = Math.sqrt(2 * (2 * S2 - 1) / (8 * srow.R - 1 - S2));
  log(`R=${srow.R}: v digits ${digits(vRef, srow.v)} (ref ${vRef} sub ${srow.v}); Omega digits ${digits(vRef / srow.R, srow.Omega)}; subject residual ${srow.residualInf} vs ref inertial ${rrow.residualInertialInf}; E_ref=${rrow.E} Jz_ref=${rrow.Jz}`);
}
// subject E, Jz closed forms from Section 5: E = 2v^2 + (1-2sqrt2)/R - (1+sqrt2) v^2/(2R); Jz = 4Rv - (1+sqrt2) v
for (const R of [50, 100, 200]) {
  const v = Math.sqrt(2 * (2 * S2 - 1) / (8 * R - 1 - S2));
  const Esub = 2 * v * v + (1 - 2 * S2) / R - (1 + S2) * v * v / (2 * R);
  const Eref = -2 * v * v; const Jsub = 4 * R * v - (1 + S2) * v; const Jref = v * (4 * R - 1 - S2);
  log(`R=${R}: E subject-form ${Esub} vs ref-form ${Eref} digits ${digits(Esub, Eref)}; Jz ${Jsub} vs ${Jref} digits ${digits(Jsub, Jref)}`);
}
log('=== Part C: rotating-frame exponents over Omega, reference linearSpectrum vs subject ringSpectra ===');
for (const R of [50, 100, 200]) {
  const rrow = ref.linearSpectrum.rows.find(r => r.R === R && r.coupling === 1);
  const srow = sub.ringSpectra.find(r => r.R === R);
  const s = rrow.summaryOverOmega; const Om = rrow.Omega;
  log(`R=${R}: Omega ref ${Om} sub ${srow.Omega} digits ${digits(Om, srow.Omega)}`);
  // collect subject exponents by sector/kind
  const sec = (m, kind) => srow.sectors.find(x => x.m === m && x.kind === (kind === 'in-plane' ? 'inPlane' : kind)).exponents;
  const maxIm = (arr) => Math.max(...arr.map(e => Math.abs(e[1])));
  const posRe = (arr) => arr.filter(e => e[0] > 1e-6);
  // breathing: m0 in-plane max imaginary
  const cmp = [];
  cmp.push(['m0 breathing kappa/Omega', s.m0_inPlane_kappaOverOmega, maxIm(sec(0, 'in-plane'))]);
  cmp.push(['m2 twist growth/Omega', s.m2_inPlane_realGrowthOverOmega[0], posRe(sec(2, 'in-plane'))[0][0]]);
  cmp.push(['m2 shear osc/Omega', s.m2_inPlane_oscOverOmega, maxIm(sec(2, 'in-plane'))]);
  cmp.push(['m2 axial/Omega', s.m2_axial_overOmega, maxIm(sec(2, 'axial'))]);
  const g1 = posRe(sec(1, 'in-plane'))[0];
  cmp.push(['m1 growth Re/Omega', s.m1_inPlane_growingExponentOverOmega[0][0], g1[0]]);
  cmp.push(['m1 growth Im/Omega', s.m1_inPlane_growingExponentOverOmega[0][1], g1[1]]);
  const ax1 = sec(1, 'axial').map(e => e[1]).sort((a, b) => b - a);
  const rax = [...s.m1_axial_overOmega].sort((a, b) => b - a);
  cmp.push(['m1 axial tilt (+i Omega)', rax[0], ax1[0]]);
  cmp.push(['m1 axial second (-i omega3)', rax[1], ax1[1]]);
  // translation pair real-part leakage (Jordan split) both sides
  const tr = sec(1, 'in-plane').filter(e => Math.abs(e[0]) < 1e-6);
  cmp.push(['m1 translation pair |Re| max (Jordan split, over Omega)', Math.max(...s.m1_inPlane_translationPair.map(e => Math.abs(e[0]))) / Om, Math.max(...tr.map(e => Math.abs(e[0])))]);
  cmp.push(['m0 tangential zero pair split (over Omega)', s.m0_inPlane_zeroPairSplit / Om, Math.min(...sec(0, 'in-plane').map(e => Math.abs(e[1])))]);
  cmp.push(['m0 axial zero pair split (over Omega)', s.m0_axial_zeroPairSplit / Om, Math.max(...sec(0, 'axial').map(e => Math.hypot(e[0], e[1])))]);
  for (const [name, a, b] of cmp) log(`  ${name}: ref ${a} sub ${b} agreeing digits ${digits(a, b)} absdiff ${Math.abs(a - b).toExponential(2)}`);
  log(`  counts: ref Re>threshold ${rrow.countRePositive}, sub counts ${JSON.stringify(srow.counts)}; sub verdict: ${String(srow.verdict).slice(0, 160)}`);
}
log('=== Part D: zero-coupling ratios ===');
const zc = ref.linearSpectrum.zeroCouplingComparison; log('ref zeroCouplingComparison keys: ' + Object.keys(zc));
const zcf = sub.zeroCouplingClosedFormLimit;
const refZC = ref.linearSpectrum.zeroCouplingComparison.rows.find(r => r.R === 100).summaryOverOmega;
const sqrtA = Math.sqrt((Math.sqrt(625 + 648 * S2) / 7 - 1) / 2), sqrtB = Math.sqrt((8 + 2 * S2) / 7);
log(`closed forms evaluated here: m2 twist ${sqrtA}, m1 Re ${sqrtB}, m2 shear ${Math.sqrt((Math.sqrt(625 + 648 * S2) / 7 + 1) / 2)}, m2 axial ${Math.sqrt((16 + 4 * S2) / 7)}`);
for (const [name, a, b] of [
  ['m2 twist', refZC.m2_inPlane_realGrowthOverOmega[0], zcf.m2_twist_growthRate_over_Omega],
  ['m1 Re', refZC.m1_inPlane_growingExponentOverOmega[0][0], zcf.m1_growthRate_over_Omega],
  ['m1 Im', -refZC.m1_inPlane_growingExponentOverOmega[0][1], 1],
  ['m2 shear', refZC.m2_inPlane_oscOverOmega, zcf.m2_shear_frequency_over_Omega],
  ['m2 axial', refZC.m2_axial_overOmega, zcf.m2_axial_frequency_over_Omega],
  ['breathing', refZC.m0_inPlane_kappaOverOmega, 1],
  ['m2 twist vs closed form here', refZC.m2_inPlane_realGrowthOverOmega[0], sqrtA],
  ['m1 Re vs closed form here', refZC.m1_inPlane_growingExponentOverOmega[0][0], sqrtB],
]) log(`  ${name}: ref ${a} sub ${b} digits ${digits(a, b)}`);
log('=== Part E: instrument fits lambda/Omega vs dominant exponent (ref m2 growth) ===');
const fits = { 'T1 P R=50': 1.4883, 'T1 C R=50': 1.4997, 'T1 R R=50': 1.4970, 'T2 P R=100': 1.4984, 'T2 C R=100': 1.3351, 'T2 R R=100': 1.5056, 'K2 P zero-coupling R=50': 1.4996, 'K2 R zero-coupling R=50': 1.5149, 'T5 tilt R=50 (all)': 1.4366, 'T5-R100 tilt': 1.4448, 'T6 R=50 (transient)': 2.0294, 'T6-R100 (transient)': 1.7512 };
const g50 = ref.linearSpectrum.rows.find(r => r.R === 50 && r.coupling === 1).summaryOverOmega.m2_inPlane_realGrowthOverOmega[0];
const g100 = ref.linearSpectrum.rows.find(r => r.R === 100 && r.coupling === 1).summaryOverOmega.m2_inPlane_realGrowthOverOmega[0];
const g0 = refZC.m2_inPlane_realGrowthOverOmega[0];
for (const [k, v] of Object.entries(fits)) { const g = /zero/.test(k) ? g0 : (/100/.test(k) ? g100 : g50); log(`  ${k}: fit ${v}, dominant ${g.toFixed(6)}, ratio fit/dominant ${(v / g).toFixed(4)}, rel dev ${((v - g) / g * 100).toFixed(2)}%`); }
// decades of growth available in a window 1e-9..1e-4 at rate 1.5 Omega: ln(1e5)/1.5 = 7.68 radians = 1.22 periods
log(`  window 1e-9..1e-4 spans ln(1e5)=${Math.log(1e5).toFixed(3)} e-folds = ${(Math.log(1e5) / g50 / (2 * Math.PI)).toFixed(3)} periods at R=50; samples per period 200`);
log('=== Part F: 13.5(i) spot check against the reference reduced problem (Sections 3, 3.1 of the pair adjudication) ===');
const sigma = -1;
const a = r => 1 - sigma / r, b = r => 1 - sigma / (2 * r), h = r => b(r) * r * r;
const g = r => (2 * r + 1) ** 2 / (2 * (4 * r + 1));
const W = (r, l2) => l2 / h(r) + sigma / r;
for (const rc of [0.3, 1.5, 20, 100]) {
  const l2 = g(rc);
  // critical point check: W'(rc) = 0 by central difference
  const d = 1e-4 * rc;
  const W1 = (W(rc + d, l2) - W(rc - d, l2)) / (2 * d);
  const W2 = (W(rc + d, l2) - 2 * W(rc, l2) + W(rc - d, l2)) / (d * d);
  const W2closed = 8 / (rc * (4 * rc + 1) * (2 * rc + 1));
  // balance via Section 3.1: omega^2 = 8/(rc^2(4rc+1)); l = h omega /2; l^2 = h^2 omega^2/4
  const om2 = 8 / (rc * rc * (4 * rc + 1)); const l2bal = h(rc) ** 2 * om2 / 4;
  // g' > 0 and r_c(l) continuity: dr_c/dl2 = 1/g'(rc)
  const gp = 4 * rc * (2 * rc + 1) / (4 * rc + 1) ** 2;
  const gpFD = (g(rc + d) - g(rc - d)) / (2 * d);
  // theta-dot = 2 l /(b r^2) at circle equals omega
  const thdot = 2 * Math.sqrt(l2) / h(rc);
  // U_eff limits: r->0 coefficient (2 l^2 - 1)
  log(`  r_c=${rc}: a=${a(rc)} (=1+1/r ${1 + 1 / rc}), b=${b(rc)} (=1+1/(2r) ${1 + 1 / (2 * rc)}); l^2=g(r_c)=${l2} vs balance l^2=${l2bal} digits ${digits(l2, l2bal)}; l^2>1/2: ${l2 > 0.5}; W'(r_c)=${W1.toExponential(2)}; W''(r_c) FD ${W2} closed ${W2closed} digits ${digits(W2, W2closed)}; g'(r_c)=${gp} FD ${gpFD} (>0); thetadot=2l/h=${thdot} vs omega ${Math.sqrt(om2)} digits ${digits(thdot, Math.sqrt(om2))}; r->0 coefficient 2l^2-1=${2 * l2 - 1}; U_eff(r_c)=${W(rc, l2)} (<0)`);
}
// uniformity: W'' at r_c(l) for l^2 in a neighbourhood of g(100), via inverting g by bisection
const ginv = (l2) => { let lo = 1e-9, hi = 1e9; for (let i = 0; i < 200; i++) { const mid = (lo + hi) / 2; if (g(mid) < l2) lo = mid; else hi = mid; } return (lo + hi) / 2; };
const l20 = g(100);
const vals = [0.9, 0.95, 1, 1.05, 1.1].map(f => { const rc = ginv(l20 * f); return [f, rc, 8 / (rc * (4 * rc + 1) * (2 * rc + 1))]; });
log('  uniformity near l0^2=g(100): ' + vals.map(([f, rc, w2]) => `f=${f}: r_c=${rc.toFixed(6)} W''=${w2.toExponential(6)}`).join('; '));
// Lyapunov function sign check: Lambda = E - W(r_c(l); l) >= 0 for random states near circle, and monotonicity of W on both sides
let minLam = Infinity, mono = true;
for (let i = 0; i < 2000; i++) {
  const l2 = l20 * (1 + 0.1 * (Math.random() - 0.5)); const rc = ginv(l2); const r = rc * (1 + 0.5 * (Math.random() - 0.5)); const rd = 0.01 * (Math.random() - 0.5);
  const E = 0.25 * a(r) * rd * rd + W(r, l2); minLam = Math.min(minLam, E - W(rc, l2));
  const rr = [0.01 * rc, 0.1 * rc, 0.5 * rc, rc, 2 * rc, 10 * rc, 1000 * rc]; const ws = rr.map(x => W(x, l2));
  for (let k = 0; k < 3; k++) if (!(ws[k] > ws[k + 1])) mono = false; for (let k = 3; k < 6; k++) if (!(ws[k] < ws[k + 1])) mono = false;
}
log(`  Lambda >= 0 over 2000 random states near the circle: min Lambda ${minLam.toExponential(3)}; W strictly decreasing below r_c and increasing above (sampled): ${mono}`);
fs.writeFileSync('.tmp/darwin-overnight/ring-reference/round3-compare-output.txt', out.join('\n') + '\n');
