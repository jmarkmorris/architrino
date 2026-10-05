#!/usr/bin/env node
// Adjudication checks for the weber-overnight subject (independent reference lane, 2026-10-05).
// Separately derived floating-point checks of quantities at stake in the adjudication. They do not
// import or modify the two fixed reference sources (weber-overnight-independent-reference.mjs,
// weber-overnight-independent-reference-withheld.mjs); the closed forms below are re-coded from the
// level formulas of the adjudication document (Sections 2.9, 10.1, 11.2). Floating point: measured,
// not certified. Known cases run and are reported first; a known-case failure aborts before targets.
//
// Units: K = c_f = 1, lambda_W = -1/2, mu_W = 1. sigma = -1: rdot^2 = (C r + 4)/(r + 2);
// sigma = +1: rdot^2 = (C r - 4)/(r - 2). C = 2 * epsilon_subject.
//
// Usage: node weber-overnight-independent-adjudication-checks.mjs

const out = [];
let failures = 0;
function rec(id, name, got, want, tol, note = '') {
  const diff = Math.abs(got - want);
  const pass = diff <= tol;
  if (!pass) failures += 1;
  out.push({ id, name, got, want, diff, tol, pass, note });
  console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${name}: got ${got} want ${want} |diff| ${diff.toExponential(2)} tol ${tol}${note ? '  (' + note + ')' : ''}`);
  return pass;
}

// --- quadrature helpers (fresh code) ---------------------------------------------------------
// Gauss-Legendre 64 on [a,b] after an optional endpoint substitution; composite in n panels.
function gl64() {
  // nodes/weights by Newton on Legendre polynomials
  const n = 64, x = new Array(n), w = new Array(n);
  for (let i = 0; i < n; i++) {
    let z = Math.cos(Math.PI * (i + 0.75) / (n + 0.5)), z1, pp;
    for (let it = 0; it < 100; it++) {
      let p1 = 1, p2 = 0;
      for (let j = 1; j <= n; j++) { const p3 = p2; p2 = p1; p1 = ((2 * j - 1) * z * p2 - (j - 1) * p3) / j; }
      pp = n * (z * p1 - p2) / (z * z - 1); z1 = z; z = z1 - p1 / pp;
      if (Math.abs(z - z1) <= 1e-15) break;
    }
    x[i] = z; w[i] = 2 / ((1 - z * z) * pp * pp);
  }
  return { x, w };
}
const GL = gl64();
function integrate(f, a, b, panels = 64) {
  let s = 0; const h = (b - a) / panels;
  for (let p = 0; p < panels; p++) {
    const lo = a + p * h, mid = lo + h / 2, half = h / 2;
    for (let i = 0; i < 64; i++) s += GL.w[i] * f(mid + half * GL.x[i]) * half;
  }
  return s;
}
// time integral int dr/|rdot| with a sqrt endpoint singularity at the end r_s, removed by s = |r - r_s| = u^2.
// rdotSqOfS receives the exact distance s from the singular end (avoids cancellation in r - r_s).
function timeWithSqrtEnd(rdotSqOfS, distance) {
  const L = Math.sqrt(distance);
  return integrate(u => 2 * u / Math.sqrt(Math.max(rdotSqOfS(u * u), 1e-300)), 0, L, 128);
}

// --- closed forms, re-coded ------------------------------------------------------------------
// sigma = -1, release from rest at r0 (C = -4/r0), time from release to r (adjudication Section 10.1)
function timeFromRestTo(r0, r) {
  const C = -4 / r0, mm = (r0 - 2) / 2, ww = (r0 + 2) / 2;
  const phi = Math.acos((mm - r) / ww);
  return (ww / Math.sqrt(-C)) * (Math.PI - (phi - Math.sin(phi)));
}
// sigma = +1, outside r_c, incoming with C > 2: time from r down to r_c = 2 (Section 2.9, e = 2C - 4 > 0)
function timeToCritical(C, r) {
  const e = 2 * C - 4; const sh2 = C * (r - 2) / e; const u = Math.asinh(Math.sqrt(sh2));
  return (e / Math.pow(C, 1.5)) * (Math.sinh(u) * Math.cosh(u) - u);
}
// Kepler (zero-coefficient) control, sigma = -1, from rest at r0 to r: sqrt(r0^3/4) [acos sqrt(r/r0) + sqrt((r/r0)(1 - r/r0))]
function keplerTime(r0, r) { const q = r / r0; return Math.sqrt(r0 ** 3 / 4) * (Math.acos(Math.sqrt(q)) + Math.sqrt(q * (1 - q))); }

// --- known cases (recorded first) -----------------------------------------------------------
console.log('== known cases ==');
rec('K1', 'timeFromRestTo(4, 0) equals the printed contact time 3pi - 3acos(1/3) + 2sqrt2',
  timeFromRestTo(4, 0), 3 * Math.PI - 3 * Math.acos(1 / 3) + 2 * Math.SQRT2, 1e-13);
rec('K2', 'quadrature of dr/|rdot| from rest at x0=4 to contact equals the same closed form',
  timeWithSqrtEnd(s => s / (6 - s), 4), 3 * Math.PI - 3 * Math.acos(1 / 3) + 2 * Math.SQRT2, 1e-12,
  'sqrt-end substitution at the release point, s = 4 - r');
rec('K3', 'timeToCritical(2.42, 8) equals the fixed-reference value 3.491175960 (Section 5(iv))',
  timeToCritical(2.42, 8), 3.491175959603535, 2e-12, 'enclosure [3.491175959603409, 3.491175959603661]');
rec('K4', 'keplerTime(4, 0) equals 2pi', keplerTime(4, 0), 2 * Math.PI, 1e-14);
rec('K5', 'keplerTime(4, 2) equals pi + 2 (withheld-lane known case N3)', keplerTime(4, 2), Math.PI + 2, 1e-14);
// 4-member determinant identity known case: two members reduce to 1 - 2 alpha (pair determinant)
function pairIndex(i, j) { return i < j ? [i, j] : [j, i]; }
function detMatrix(A) { // Gaussian elimination with partial pivoting
  const n = A.length, M = A.map(r => r.slice()); let d = 1;
  for (let c = 0; c < n; c++) {
    let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    if (M[p][c] === 0) return 0; if (p !== c) { [M[p], M[c]] = [M[c], M[p]]; d = -d; }
    d *= M[c][c];
    for (let r = c + 1; r < n; r++) { const f = M[r][c] / M[c][c]; for (let k = c; k < n; k++) M[r][k] -= f * M[c][k]; }
  }
  return d;
}
function manyMemberDets(X, q, mu = 1) {
  const N = X.length, pairs = [];
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) pairs.push([i, j]);
  const P = pairs.length, us = [], alphas = [];
  for (const [i, j] of pairs) {
    const d = [X[i][0] - X[j][0], X[i][1] - X[j][1], X[i][2] - X[j][2]]; const r = Math.hypot(...d); const e = d.map(v => v / r);
    const u = new Array(3 * N).fill(0); for (let k = 0; k < 3; k++) { u[3 * i + k] = e[k]; u[3 * j + k] = -e[k]; }
    us.push(u); alphas.push(Math.sign(q[i] * q[j]) * mu / r);
  }
  const M = Array.from({ length: 3 * N }, (_, a) => Array.from({ length: 3 * N }, (_, b) => (a === b ? 1 : 0)));
  for (let p = 0; p < P; p++) for (let a = 0; a < 3 * N; a++) for (let b = 0; b < 3 * N; b++) M[a][b] -= alphas[p] * us[p][a] * us[p][b];
  const G = Array.from({ length: P }, (_, p) => Array.from({ length: P }, (_, s) => us[p].reduce((acc, v, k) => acc + v * us[s][k], 0)));
  const IDG = Array.from({ length: P }, (_, p) => Array.from({ length: P }, (_, s) => (p === s ? 1 : 0) - alphas[p] * G[p][s]));
  return { full: detMatrix(M), gram: detMatrix(IDG), G, pairs };
}
{
  const two = manyMemberDets([[1, 0, 0], [-1, 0, 0]], [1, 1]); // sigma = +1, r = 2: determinant 0
  rec('K6a', 'two-member 6x6 determinant at r = 2, like polarity, equals 1 - 2/r = 0', two.full, 0, 1e-15);
  const twoB = manyMemberDets([[2, 0, 0], [-2, 0, 0]], [1, -1]); // sigma = -1, r = 4: 1 + 2/4 = 1.5
  rec('K6b', 'two-member determinant at r = 4, opposite polarity, equals 1.5 (both routes)', twoB.full, 1.5, 1e-15);
  rec('K6c', 'Gram route at r = 4 equals 1.5', twoB.gram, 1.5, 1e-15);
}
if (failures) { console.log(`known cases: ${failures} failure(s); targets not run`); process.exit(1); }
console.log('known cases: all passed; running targets');

// --- targets ----------------------------------------------------------------------------------
console.log('== targets ==');
// T1: WB-8 stop state -> time to reach x = 2 (tail integral along the level), both runs
const WB8 = { C: 2.42, prereg: { t: 3.4911759595677783, r: 2.000000134399456, relSpeed: 2500.00455758115 }, refine: { t: 3.4911759596101826, r: 2.000000020616773, relSpeed: 6383.066189434836 } };
const enc8 = [3.491175959603409, 3.491175959603661];
for (const run of ['prereg', 'refine']) {
  const s = WB8[run]; const tail = timeToCritical(WB8.C, s.r); const Tstar = s.t + tail;
  const inside = Tstar >= enc8[0] && Tstar <= enc8[1];
  out.push({ id: 'T1-' + run, name: 'WB-8 stop time + tail to x=2 against the enclosure', got: Tstar, enclosure: enc8, tail, inside });
  console.log(`${inside ? 'INSIDE' : 'OUTSIDE'} T1-${run}: t_stop ${s.t} + tail ${tail.toExponential(4)} = ${Tstar}; enclosure [${enc8[0]}, ${enc8[1]}]; offset from nearest end ${inside ? 0 : Math.min(Math.abs(Tstar - enc8[0]), Math.abs(Tstar - enc8[1])).toExponential(2)}`);
  // level speed at the stop
  const rdot = Math.sqrt((WB8.C * s.r - 4) / (s.r - 2));
  rec('T2-' + run, 'WB-8 relative speed at the stop from the level formula', rdot, s.relSpeed, 1e-6 * s.relSpeed, 'relative 1e-6');
  // (T*-T)^{-1/3} law with |G+| = k(eps-1) = 2(C/2-1) = C-2
  const Gp = WB8.C - 2; const pred = (2 / 3) * Math.cbrt(4.5 * Gp) / Math.cbrt(tail);
  rec('T12-' + run, 'collinear (4.1) leading-order speed law at the stop', pred, s.relSpeed, 2e-4 * s.relSpeed, 'leading order only; relative 2e-4');
}
// T3: WB-6 and WC-1: event at r = 1e-6, tail to r = 0 along the level
const contactCases = [
  { id: 'WB-6', r0: 2.5, tEvent: 4.759920496914469, rEvent: 9.999999999998858e-7, enc: [4.759921204021379, 4.759921204021448], subjectExtrap: 4.7599212040 },
  { id: 'WC-1', r0: 4, tEvent: 8.560326126386325, rEvent: 9.999999999999896e-7, enc: [8.560326833493185, 8.560326833493303], subjectExtrap: 8.560326833493372 },
];
for (const c of contactCases) {
  const C = -4 / c.r0; const tail = integrate(r => 1 / Math.sqrt((C * r + 4) / (r + 2)), 0, c.rEvent, 4);
  const T = c.tEvent + tail; const inside = T >= c.enc[0] && T <= c.enc[1];
  out.push({ id: 'T3-' + c.id, name: 'contact event time + tail against the enclosure', got: T, tail, enclosure: c.enc, inside });
  console.log(`${inside ? 'INSIDE' : 'OUTSIDE'} T3-${c.id}: t_event ${c.tEvent} + tail ${tail.toExponential(6)} = ${T}; enclosure [${c.enc[0]}, ${c.enc[1]}]; subject extrapolation ${c.subjectExtrap} (offset from T ${(c.subjectExtrap - T).toExponential(2)})`);
  rec('T3b-' + c.id, 'closed-form contact time (fresh code) against the enclosure midpoint', timeFromRestTo(c.r0, 0), (c.enc[0] + c.enc[1]) / 2, 2e-13);
}
// T4: WC-3 zero-coefficient control: event at r = 1e-6, Kepler tail
{
  const tEvent = 6.283185306846325, rEvent = 9.999996483055326e-7;
  const tail = integrate(r => 1 / Math.sqrt(4 * (1 / r - 1 / 4)), 0, rEvent, 4); // integrable 1/sqrt(1/r) ~ sqrt(r)
  const tailClosed = 2 * Math.PI - keplerTime(4, rEvent);
  rec('T4a', 'WC-3 Kepler tail by quadrature equals 2pi - keplerTime(4, r_event)', tail, tailClosed, 1e-15);
  rec('T4b', 'WC-3 event time + Kepler tail equals 2pi', tEvent + tail, 2 * Math.PI, 1e-11, 'subject extrapolation 6.283185307346325 overshoots by ' + (6.283185307346325 - 2 * Math.PI).toExponential(2));
}
// T5: WB-10 (sigma=+1, h = 1.8, C = 2 eps) turning radius, threshold, asymptotic speed, supremum
{
  const h = 1.8, rdot0 = -1.2, r0 = 6; const C = rdot0 * rdot0 * (1 - 2 / r0) + h * h / (r0 * r0) + 4 / r0;
  // the instrument's H is the two-member energy function E = C/4 with the centre at rest (adjudication Section 2.4), so C = 4 H0
  rec('T5a', 'WB-10 level C from the preparation equals 4*H0', C, 4 * 0.42916666666666664, 1e-14);
  const Cth = 2 + h * h / 4; const rt = (4 + Math.sqrt(16 + 4 * C * h * h)) / (2 * C);
  rec('T5b', 'WB-10 turning radius (positive root of C r^2 - 4 r - h^2) against the measured pericentre', rt, 2.966358275503735, 1e-11, `C = ${C} < threshold ${Cth}: turning class`);
  rec('T5c', 'WB-10 measured relative speed at t=30 is below the asymptote sqrt(C)', Math.min(1.3037633849194248, Math.sqrt(C)), 1.3037633849194248, 0, `sqrt(C) = ${Math.sqrt(C)}`);
  console.log(`INFO T5d: WB-10 supremum member speed sqrt(C)/2 = ${Math.sqrt(C) / 2} (approached at infinity); sampled run maximum 0.6518816924597124`);
}
// T6: WB-9 supremum member speed vs sampled maximum
{
  const C = 1.58; const sup = Math.sqrt(C) / 2;
  rec('T6', 'WB-9 supremum member speed sqrt(C)/2 equals the fixed-reference 0.6284902545', sup, 0.6284902544988267, 1e-12, 'sampled run maximum 0.6228609052342965 lies below it');
}
// T7: WB-7 supremum vs sampled maxima
{
  const sup = 0.4091113156; const sampled = [0.4090636516726033, 0.40909084726429046];
  rec('T7', 'WB-7 sampled maxima below the exact supremum (margin)', Math.max(...sampled) < sup ? 1 : 0, 1, 0, `shortfall ${(sup - Math.max(...sampled)).toExponential(2)}`);
}
// T8: N-member determinant identity (4.8): 12x12 determinant equals det(I_P - D G) for a random 4-member state
{
  let seed = 20261005; const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296 - 0.5; };
  let worst = 0;
  for (let trial = 0; trial < 50; trial++) {
    const X = [0, 1, 2, 3].map(() => [4 * rnd(), 4 * rnd(), 4 * rnd()]); const q = [1, -1, 1, -1].map(v => (rnd() > 0 ? v : -v));
    const d = manyMemberDets(X, q); worst = Math.max(worst, Math.abs(d.full - d.gram) / Math.max(1, Math.abs(d.full)));
  }
  rec('T8', 'subject (4.8): det M_N = det(I_P - D G) over 50 random four-member states (worst relative)', worst, 0, 1e-12);
  // alternating square ring of side s: two like pairs on the diagonals (length s*sqrt2); criterion 3 says invertible when s*sqrt2 > 2
  for (const s of [1.2, 1.4142135623730951, 1.6]) {
    const X = [[s / 2, s / 2, 0], [-s / 2, s / 2, 0], [-s / 2, -s / 2, 0], [s / 2, -s / 2, 0]]; const q = [1, -1, 1, -1];
    const d = manyMemberDets(X, q);
    console.log(`INFO T8b: alternating square, side ${s}, diagonal ${(s * Math.SQRT2).toFixed(6)}: det M_12 = ${d.full.toExponential(6)} (Gram ${d.gram.toExponential(6)})`);
  }
}
// T9: supplementary like-polarity probe (subject Section 10): from x=4 with rdot=-1.6, C = 2.28
{
  const C = 1.6 * 1.6 * (1 - 2 / 4) + 4 / 4; rec('T9a', 'probe level C = 2.28', C, 2.28, 1e-15);
  rec('T9b', 'time to r_c from x=4 equals the subject value 1.115419163630', timeToCritical(C, 4), 1.115419163630, 1e-11);
  rec('T9c', 'member speed c_f radius 4/(4-C) equals the subject value 2.325581395349', 4 / (4 - C), 2.325581395349, 1e-11);
  rec('T9d', 'quadrature route for the same time', timeWithSqrtEnd(s => (2 * C - 4 + C * s) / s, 2), 1.115419163630, 1e-11, 'inverse-sqrt end at r_c handled by the u^2 substitution, s = r - 2');
}
// T10: subject Section 10: sigma=-1 from rest at x=4, time to r=2 and the speed there
{
  rec('T10a', 'time from rest at x=4 to r=2 equals the subject value 6.521305376769', timeFromRestTo(4, 2), 6.521305376769, 1e-11);
  rec('T10b', 'relative speed at r=2 on that level equals 1/sqrt2', Math.sqrt((-1 * 2 + 4) / (2 + 2)), Math.SQRT1_2, 1e-15);
}
// T11: collinear (3.1) contact-time closed form against the adjudication closed form
{
  const coll = r0 => Math.sqrt(r0 / 4) * ((r0 + 2) * Math.atan(Math.sqrt(r0 / 2)) + Math.sqrt(2 * r0));
  rec('T11a', 'collinear (3.1) at x0=4 equals timeFromRestTo(4,0)', coll(4), timeFromRestTo(4, 0), 1e-13);
  rec('T11b', 'collinear (3.1) at x0=2.5 equals timeFromRestTo(2.5,0) (WB-6)', coll(2.5), timeFromRestTo(2.5, 0), 1e-13);
}
// T13: predicted-case comparison table: measured values against the fixed enclosures (signed offset outside)
{
  const rows = [
    ['WB-4 radial period (mean, rtol 1e-12)', 29.005825604848408, [29.005825604843427, 29.0058256048441], 2.9e-10],
    ['WB-4 apsidal angle', 4.186307002635596, [4.18630700263561, 4.1863070026358375], 8.1e-12],
    ['WB-4 pericentre (first)', 1.8823529411765227, [1.8823529411764537, 1.882352941176489], 5e-11],
    ['WB-4 max member speed (probe)', 0.6010407640085623, [0.6010407640085592, 0.6010407640085712], 1.2e-13],
    ['WB-11 radial period', 22.410239348476807, [22.410239348468902, 22.410239348469474], 1.9e-11],
    ['WB-11 apsidal angle', 3.1415926535896714, [3.141592653589704, 3.1415926535898837], 2.6e-12],
    ['WB-8 speed-equality radius (probe)', 2.531645569620068, [2.53164556962024, 2.5316455696202693], NaN],
    ['WB-8 speed-equality time', 3.2838138418331257, [3.2838138418328335, 3.283813841833143], 1.7e-11],
    ['WB-9 turning radius', 2.5316455696202698, [2.531645569620249, 2.531645569620258], 2.2e-12],
    ['WB-9 turning time', 5.352958001244807, [5.3529580012447004, 5.352958001244969], 2.7e-14],
    ['WB-9 asymptotic relative speed (from H)', 1.2569805089976465, [1.2569805089976525, 1.2569805089976545], NaN],
    ['WC-2 time to x=8 (probe)', 7.191411155127552, [7.1914111551274384, 7.191411155127629], 1.4e-14],
    ['WB-5 pericentre (first)', 2.042016806722691, [2.0420168067226627, 2.0420168067227156], 3.8e-12],
    ['WB-5 radial period (mean)', 23.804646541153055, [23.804646541155037, 23.804646541155712], 9.7e-11],
    ['WB-5 apsidal angle', 4.239830417084846, [4.239830417084668, 4.239830417084943], 1.9e-11],
    ['WB-5 max member speed (probe)', 0.5397949618355531, [0.5397949618355449, 0.5397949618355595], 2.3e-14],
    ['WB-12 radial period', 17.78387145387988, [17.783871453879566, 17.783871453880128], 1.4e-11],
    ['WB-12 apsidal angle', 3.1415926535897567, [3.141592653589685, 3.1415926535899006], 3.1e-12],
    ['WB-12 pericentre (first)', 2.0420168067227364, [2.0420168067226627, 2.0420168067227156], 3.6e-12],
    ['WB-7 pericentre (first)', 3.9664370546605823, [3.966437054657348, 3.9664370546638104], NaN],
    ['WB-7 apocentre (first)', 4.035763550505911, [4.035763550502613, 4.035763550509076], NaN],
    ['WB-7 radial period (mean)', 43.547128791553206, [43.54712879152169, 43.547128791560276], 6.4e-10],
    ['WB-7 apsidal angle (mean)', 3.847519254156188, [3.8475192541498293, 3.8475192541612255], NaN],
  ];
  console.log('== T13 measured values against the fixed enclosures (offset = signed distance outside the enclosure, 0 if inside; err = subject two-tolerance estimate) ==');
  for (const [name, m, [lo, hi], err] of rows) {
    const off = m < lo ? m - lo : m > hi ? m - hi : 0;
    out.push({ id: 'T13', name, measured: m, enclosure: [lo, hi], offset: off, subjectErrorEstimate: err });
    console.log(`${off === 0 ? 'INSIDE ' : 'OUTSIDE'} ${name}: measured ${m}; enclosure [${lo}, ${hi}]; offset ${off.toExponential(2)}; relative ${(Math.abs(off) / Math.abs(m)).toExponential(2)}; subject error estimate ${err}`);
  }
}
// ============================================================================================
// P-series (appended 2026-10-05 for Section 13 of the adjudication document: persistence theorems and
// long runs). Fresh floating-point code; no import of the fixed reference sources. Known cases K7a-K7c
// run first; a known-case failure aborts the P targets. Notation: k = 2K = 2, kappa = 2, Delta = 1 + 2/r,
// epsilon = C/2, Lambda = epsilon + k^2/(2h^2) = C/2 + 2/h^2, r_h = h^2/2, e = (h/2) sqrt(2 Lambda).
{
  const K7 = [];
  const kk = 2;
  const Cof = (r, rd, h) => rd * rd * (1 + 2 / r) + h * h / (r * r) - 4 / r;          // frozen law first integral
  const CofKep = (r, rd, h) => rd * rd + h * h / (r * r) - 4 / r;                       // zero-coefficient control
  const lamOf = (C, h) => C / 2 + 2 / (h * h);
  const eOf = (C, h) => (h / 2) * Math.sqrt(Math.max(0, 2 * lamOf(C, h)));
  const radiiLambda = (C, h) => { const e = eOf(C, h), rh = h * h / 2; return [rh / (1 + e), rh / (1 - e)]; };
  const radiiQuad = (C, h) => { const d = Math.sqrt(4 + C * h * h); return [(-2 + d) / C, (-2 - d) / C].sort((a, b) => a - b); }; // roots of C r^2 + 4 r - h^2
  let seed = 7; const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  // K7a: Kepler ellipse r in [1,3] (C = -1, h^2 = 3): Lambda-form radii equal a(1 -+ e) = 1, 3 (the control has Delta = 1 and the same radii)
  { const [rp, ra] = radiiLambda(-1, Math.sqrt(3)); rec('K7a', 'Lambda-form turning radii on the Kepler known case r in [1,3]', rp + ra * 1e3, 1 + 3e3, 1e-11); }
  // K7b: WB-5 exact level: C = -119/150, h^2 = 243/50 -> rp = 243/119, ra = 3
  { const [rp, ra] = radiiLambda(-119 / 150, Math.sqrt(243 / 50)); rec('K7b', 'Lambda-form turning radii on WB-5 (243/119, 3)', rp + ra * 1e3, 243 / 119 + 3e3, 1e-11); }
  // K7c: circle x = 4: Lambda = 0, e = 0 (within rounding)
  rec('K7c', 'Lambda vanishes on the x=4 circle (C = -1/2, h^2 = 8)', lamOf(-0.5, Math.sqrt(8)), 0, 1e-15);
  if (failures) { console.log('P-series: known-case failure, targets skipped'); }
  else {
    // P1: identity (2.2) at random states, both laws
    let worst = 0;
    for (let i = 0; i < 5000; i++) {
      const r = 0.2 + 5 * rnd(), rd = 2 * (rnd() - 0.5), h = 0.3 + 3 * rnd();
      const rh = h * h / 2;
      const lhs = lamOf(Cof(r, rd, h), h), rhs = 0.5 * (1 + 2 / r) * rd * rd + (2 / (h * h)) * (rh / r - 1) ** 2;
      const lhsK = CofKep(r, rd, h) / 2 + 2 / (h * h), rhsK = 0.5 * rd * rd + (2 / (h * h)) * (rh / r - 1) ** 2;
      worst = Math.max(worst, Math.abs(lhs - rhs) / Math.max(1, Math.abs(lhs)), Math.abs(lhsK - rhsK) / Math.max(1, Math.abs(lhsK)));
    }
    rec('P1', 'identity (2.2): Lambda = Delta rdot^2/2 + (k^2/2h^2)(r_h/r - 1)^2 at 5000 random states, both weights (max relative residual)', worst, 0, 1e-13);
    // P2: finite-difference Hessian of Lambda at fixed h at the circles x = 4 and x = 1: diag(k^4/h^6, Delta(r_h)); ratio = omega_r^2 = 2/(x^2 (x+2))
    for (const x of [4, 1]) {
      const h = Math.sqrt(2 * x), rh = x, d = 1e-4;
      const F = (r, rd) => lamOf(Cof(r, rd, h), h);
      const Frr = (F(rh + d, 0) - 2 * F(rh, 0) + F(rh - d, 0)) / (d * d);
      const Fvv = (F(rh, d) - 2 * F(rh, 0) + F(rh, -d)) / (d * d);
      const Frv = (F(rh + d, d) - F(rh + d, -d) - F(rh - d, d) + F(rh - d, -d)) / (4 * d * d);
      rec(`P2a-x${x}`, 'Hessian rr entry equals k^4/h^6 = Omega^2 = 2/x^3', Frr, 2 / x ** 3, 1e-6);
      rec(`P2b-x${x}`, 'Hessian rdot-rdot entry equals Delta(r_h) = 1 + 2/x', Fvv, 1 + 2 / x, 1e-7);
      rec(`P2c-x${x}`, 'Hessian cross entry vanishes', Frv, 0, 1e-7);
      rec(`P2d-x${x}`, 'ratio equals omega_r^2 = 2/(x^2 (x+2)) (reference Section 2.7)', Frr / Fvv, 2 / (x * x * (x + 2)), 1e-6);
    }
    // P3: Lambda-form radii equal the quadratic roots at random bound states
    { let w = 0; for (let i = 0; i < 2000; i++) { const r = 0.5 + 4 * rnd(), h = Math.sqrt(2 * r) * (0.8 + 0.4 * rnd()), rd = 0.2 * (rnd() - 0.5); const C = Cof(r, rd, h); if (!(C < 0)) continue; const a = radiiLambda(C, h), b = radiiQuad(C, h); w = Math.max(w, Math.abs(a[0] - b[0]) / b[0], Math.abs(a[1] - b[1]) / b[1]); } rec('P3', 'Theorem 2.1 radii r_h/(1 +- e) equal the roots of C r^2 + 4 r - h^2 at random bound states (max relative difference)', w, 0, 1e-12); }
    // P4: (2.5) and (2.6) sampled along a level: r in [rp, ra], rdot from the level; check |rdot| <= k e/h and the distance bound (2.6)
    { let viol = 0, worstRatio = 0;
      for (let i = 0; i < 200; i++) {
        const r0 = 0.5 + 4 * rnd(), h = Math.sqrt(2 * r0) * (0.9 + 0.2 * rnd()), rd0 = 0.1 * (rnd() - 0.5); const C = Cof(r0, rd0, h); if (!(C < 0)) continue;
        const e = eOf(C, h), rh = h * h / 2, [rp, ra] = radiiLambda(C, h), vb = 2 * e / h, bound = e * (rh / (1 - e) + 4 / h);
        for (let j = 0; j <= 50; j++) { const r = rp + (ra - rp) * j / 50; const rd2 = (C * r * r + 4 * r - h * h) / (r * (r + 2)); const rd = Math.sqrt(Math.max(0, rd2));
          if (rd > vb * (1 + 1e-12) + 1e-15) viol++;
          const dist = Math.hypot(r - rh, Math.hypot(rd, h / r - h / rh)); // distance to the point of C_h with the same direction
          worstRatio = Math.max(worstRatio, dist / bound); if (dist > bound * (1 + 1e-12)) viol++; }
      }
      rec('P4a', '(2.5): |rdot| <= k e/h violations along sampled levels', viol, 0, 0);
      rec('P4b', '(2.6): max of (distance to C_h)/(bound) over sampled levels is below 1', worstRatio < 1 ? 0 : worstRatio, 0, 0, `max ratio ${worstRatio.toFixed(4)}`); }
    // P5: Theorem 3.1 item 5: |f| <= K/(rp (rp + kappa)) [1 + Lambda + h^2/rp^2] along sampled levels, with f from (1.1)
    { let worst = 0;
      for (let i = 0; i < 200; i++) {
        const r0 = 0.5 + 4 * rnd(), h = Math.sqrt(2 * r0) * (0.9 + 0.2 * rnd()), rd0 = 0.1 * (rnd() - 0.5); const C = Cof(r0, rd0, h); if (!(C < 0)) continue;
        const lam = lamOf(C, h), [rp, ra] = radiiLambda(C, h); const bound = (1 / (rp * (rp + 2))) * (1 + lam + h * h / (rp * rp));
        for (let j = 0; j <= 50; j++) { const r = rp + (ra - rp) * j / 50; const rd2 = Math.max(0, (C * r * r + 4 * r - h * h) / (r * (r + 2))); const f = -(1 / (r * (r + 2))) * (1 - rd2 / 2 + h * h / (r * r)); worst = Math.max(worst, Math.abs(f) / bound); }
      }
      rec('P5', 'Theorem 3.1 item 5 acceleration bound: max |f|/bound over sampled levels is below 1', worst < 1 ? 0 : worst, 0, 0, `max ratio ${worst.toFixed(4)}`); }
    // P6: Theorem 2.2 item 3 counter-case: boundary circle x = 1/2 (member speed c_f); perturbation with h = 1 + eta, r = r_h, e = eta/2 keeps the pericentre member speed (1+e)/(1+eta) < c_f
    for (const eta of [1e-3, 1e-2]) { const h = 1 + eta, rh = h * h / 2, e = eta / 2, D = 1 + 2 / rh, rd = 2 * e / (h * Math.sqrt(D)); const C = Cof(rh, rd, h); const eC = eOf(C, h); const v = h / (2 * (rh / (1 + eC))); rec(`P6-${eta}`, 'pericentre member speed of an O(eta) perturbation of the x=1/2 circle with e = eta/2 > 0 equals (1+e)/(1+eta) < c_f', v, (1 + e) / (1 + eta), 1e-12, `speed ${v} < 1`); }
    // P7: contact-step obligation cost: stages from x = 2.5 to 1e-6 with theta = 1/2 is ceil(log2(2.5e6)) = 22 (21 extra beyond the first)
    rec('P7', 'contact-step stages ceil(log2(2.5/1e-6))', Math.ceil(Math.log2(2.5 / 1e-6)), 22, 0);
    // P8: WB-6 staged capture against the re-coded closed forms: time from rest at x0 = 2.5 to r = 1e-6, level speed there, tail to contact
    { const t6 = timeFromRestTo(2.5, 1e-6), tc = timeFromRestTo(2.5, 0), tail = tc - t6; const v6 = Math.sqrt((-1.6 * 1e-6 + 4) / (1e-6 + 2));
      rec('P8a', 'WB-6 rtol 1e-12 contact event time equals the closed form time to r = 1e-6', 4.759920496914469, t6, 5e-14);
      rec('P8b', 'WB-6 staged (rtol 1e-10) contact event time against the closed form (expected ~2e-12 at that tolerance)', 4.759920496916527, t6, 5e-12);
      rec('P8c', 'staged event relative speed equals the level speed at r = 1e-6', 1.4142129259772505, v6, 1e-12);
      rec('P8d', 'tail from r = 1e-6 to contact', tail, 7.0710694e-7, 1e-13, 'the Section 8.5(d) tail printed as 7.071069e-7 is 7.0710694e-7 to eight digits');
      rec('P8e', 'staged event time minus the rtol 1e-12 event time (the persistence document quotes 1.7e-11 against a rounded value)', 4.759920496916527 - 4.759920496914469, 2.06e-12, 1e-14);
      rec('P8f', 'stage-0 stop time (x = 1.25) against the closed form', 3.5683217732069568, timeFromRestTo(2.5, 1.25), 5e-12); }
    // P9: WP-1 supremum of member speed under drift from the recorded initial state (floating re-code of the Section 10.1 formula),
    //     and the 1-degree phase-grid explanation of the subject's lower "exact" value
    { const X1 = [2, 0, 0], X2 = [-2, 0, 0], V1 = [0.055, 0.3535533905932738, 0.01], V2 = [0.05, -0.3535533905932738, 0];
      const Rv = X1.map((x, i) => x - X2[i]), w = V1.map((x, i) => x - V2[i]); const r = Math.hypot(...Rv); const rd = Rv.reduce((s, x, i) => s + x * w[i], 0) / r;
      const hv = [Rv[1] * w[2] - Rv[2] * w[1], Rv[2] * w[0] - Rv[0] * w[2], Rv[0] * w[1] - Rv[1] * w[0]]; const h = Math.hypot(...hv); const hh = hv.map((x) => x / h);
      const C = Cof(r, rd, h); const [rp] = radiiLambda(C, h); const vmax = h / rp; const Vc = V1.map((x, i) => 0.5 * (x + V2[i])); const Vc2 = Vc.reduce((s, x) => s + x * x, 0);
      const Vcn = Vc.reduce((s, x, i) => s + x * hh[i], 0); const pv = Vc.map((x, i) => x - Vcn * hh[i]); const p = Math.hypot(...pv);
      const sup = Math.sqrt(Vc2 + p * vmax + vmax * vmax / 4);
      rec('P9a', 'WP-1 supremum member speed from the recorded state (re-coded Section 10.1 formula) against the certified 0.4091113156', sup, 0.4091113156, 1e-10);
      // the in-plane projection p makes an angle with the x axis; a pericentre tangent exactly along x (theta = pi/2 on a 1-degree grid) gives
      const ang = Math.atan2(pv[1], pv[0]); const supGrid = Math.sqrt(Vc2 + p * vmax * Math.cos(ang) + vmax * vmax / 4);
      rec('P9b', 'the same formula with the tangent exactly along x reproduces the subject\'s scan value 0.40911127413594567', supGrid, 0.40911127413594567, 2e-10, `misalignment angle ${ang.toExponential(3)} rad; shortfall ${(sup - supGrid).toExponential(3)}`);
      rec('P9c', 'subject sampled run maximum 0.4091088856 lies below the supremum (shortfall, positive)', sup - 0.40910888563705433 > 0 ? 0 : 1, 0, 0, `shortfall ${(sup - 0.40910888563705433).toExponential(3)}`); }
  }
}
console.log(`== summary: ${failures} failing numeric check(s) ==`);
try {
  const fs = await import('node:fs'); const path = await import('node:path');
  const dir = path.resolve(new URL('.', import.meta.url).pathname, '../../../../../.local-data/master-equation-closure/weber-overnight/review');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'adjudication-checks.json'), JSON.stringify({ generatedUtc: new Date().toISOString(), node: process.version, failures, results: out }, null, 1));
  console.log('record: ' + path.join(dir, 'adjudication-checks.json'));
} catch (e) { console.log('record not written: ' + e.message); }
process.exit(failures ? 1 : 0);
