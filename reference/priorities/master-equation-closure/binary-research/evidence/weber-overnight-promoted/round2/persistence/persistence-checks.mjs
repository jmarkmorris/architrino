// Spot checks for weber-overnight-persistence.md (Node 22, no dependencies).
// Frozen law: lambda=-1/2, mu=1, K=1, cf=1, opposite polarity; k=2K=2, kappa=2K/cf^2=2.
// Every instrument passes a known case (K*) before its target use (T*).
import fs from 'node:fs';
const k = 2, KAP = 2;
let seed = 20261005;
const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = a => Math.sqrt(dot(a, a));
const out = []; const log = s => { out.push(s); console.log(s); };
let fails = 0;
const check = (id, val, tol, msg) => { const ok = Math.abs(val) <= tol; if (!ok) fails++; log(`${ok ? 'PASS' : 'FAIL'} ${id}: ${msg} = ${val.toExponential(3)} (tol ${tol.toExponential(1)})`); };

// invariants of the relative motion, with radial weight 1+kappa/r (kappa=0 gives the zero-coefficient control)
function inv(rho, w, kap = KAP) {
  const r = norm(rho), e = rho.map(z => z / r), rdot = dot(e, w), hv = cross(rho, w), h = norm(hv);
  const D = 1 + kap / r, eps = 0.5 * D * rdot * rdot + h * h / (2 * r * r) - k / r;
  const L = eps + k * k / (2 * h * h), rh = h * h / k, ecc = (h / k) * Math.sqrt(Math.max(0, 2 * L));
  return { r, rdot, h, hv, eps, Lambda: L, rh, e: ecc, rp: rh / (1 + ecc), ra: ecc < 1 ? rh / (1 - ecc) : Infinity, n: hv.map(z => z / h), D };
}
const Lambda6 = (y, kap = KAP) => inv(y.slice(0, 3), y.slice(3, 6), kap).Lambda;

// ---- K1: zero-coefficient control (kappa=0): bounds from the excess identity equal the Kepler closed forms
{
  let worst = 0;
  for (let n = 0; n < 200; n++) {
    const rho = [1 + 4 * rnd(), 0, 0], w = [0.3 * (rnd() - 0.5), 0.4 + 0.6 * rnd(), 0.2 * (rnd() - 0.5)];
    const I = inv(rho, w, 0); if (I.eps >= 0) { n--; continue; }
    const eps0 = 0.5 * dot(w, w) - k / I.r, A = k / (2 * -eps0), ecK = Math.sqrt(1 + 2 * eps0 * I.h * I.h / (k * k));
    worst = Math.max(worst, Math.abs(I.rp - A * (1 - ecK)) / A, Math.abs(I.ra - A * (1 + ecK)) / A, Math.abs(I.e - ecK));
  }
  check('K1', worst, 1e-12, 'control: excess-identity turning radii vs Kepler A(1-e), A(1+e), 200 random bound states');
}
// ---- K2: exact identity Lambda = (1/2) Delta rdot^2 + (k^2/2h^2)(r_h/r - 1)^2 at random states (both kappa values)
{
  let worst = 0;
  for (let n = 0; n < 2000; n++) {
    const rho = [0.2 + 5 * rnd(), 2 * (rnd() - 0.5), 2 * (rnd() - 0.5)], w = [rnd() - 0.5, rnd() - 0.5, rnd() - 0.5];
    for (const kap of [0, KAP]) { const I = inv(rho, w, kap); const rhs = 0.5 * I.D * I.rdot * I.rdot + (k * k / (2 * I.h * I.h)) * (I.rh / I.r - 1) ** 2; worst = Math.max(worst, Math.abs(I.Lambda - rhs) / Math.max(1, Math.abs(I.Lambda))); }
  }
  check('K2', worst, 1e-12, 'excess identity (2.3) at 2000 random states x 2 weights');
}
// ---- K3: known Hessian: for kappa=0 the (r, rdot) Hessian of eps at fixed h is diag(k^4/h^6, 1) and omega_r = Omega
function hessRRdot(h, kap) {
  const rh = h * h / k, f = (r, rd) => 0.5 * (1 + kap / r) * rd * rd + h * h / (2 * r * r) - k / r, d = 1e-4 * rh;
  const H = [[0, 0], [0, 0]];
  H[0][0] = (f(rh + d, 0) - 2 * f(rh, 0) + f(rh - d, 0)) / (d * d);
  H[1][1] = (f(rh, d) - 2 * f(rh, 0) + f(rh, -d)) / (d * d);
  H[0][1] = H[1][0] = (f(rh + d, d) - f(rh + d, -d) - f(rh - d, d) + f(rh - d, -d)) / (4 * d * d);
  return H;
}
{
  let worst = 0;
  for (let n = 0; n < 50; n++) { const h = 1 + 3 * rnd(); const H = hessRRdot(h, 0); worst = Math.max(worst, Math.abs(H[0][0] - k ** 4 / h ** 6) / (k ** 4 / h ** 6), Math.abs(H[1][1] - 1), Math.abs(H[0][1])); }
  check('K3', worst, 1e-6, 'control (r,rdot) Hessian at the circle vs diag(k^4/h^6, 1), 50 random h');
}
// ---- T1: frozen law: (r, rdot) Hessian of eps at fixed h equals diag(k^4/h^6, 1+kappa/r_h), positive definite, omega_r^2 = Omega^2/(1+2/x)
{
  let worst = 0, worstW = 0, minEig = Infinity;
  for (let n = 0; n < 50; n++) {
    const h = 0.8 + 4 * rnd(), rh = h * h / k, H = hessRRdot(h, KAP), a = k ** 4 / h ** 6, b = 1 + KAP / rh;
    worst = Math.max(worst, Math.abs(H[0][0] - a) / a, Math.abs(H[1][1] - b) / b, Math.abs(H[0][1]));
    const tr = H[0][0] + H[1][1], det = H[0][0] * H[1][1] - H[0][1] * H[1][0]; minEig = Math.min(minEig, (tr - Math.sqrt(tr * tr - 4 * det)) / 2);
    const Om2 = k / rh ** 3, wr2 = H[0][0] / H[1][1]; worstW = Math.max(worstW, Math.abs(wr2 - Om2 / (1 + 2 / rh)) / wr2);
  }
  check('T1a', worst, 1e-6, 'frozen (r,rdot) Hessian vs diag(k^4/h^6, 1+kappa/r_h), 50 random h');
  check('T1b', minEig > 0 ? 0 : 1, 0, `frozen Hessian positive definite (smallest eigenvalue ${minEig.toExponential(3)} > 0)`);
  check('T1c', worstW, 1e-6, 'ratio of Hessian entries reproduces omega_r^2 = Omega^2/(1+2/x), eq. (7.1)');
}
// ---- T2: 6D Hessian of Lambda at random circle points: positive semidefinite, rank 2, null space tangent to the circle family
function hess6(y0, kap) {
  const n = 6, H = Array.from({ length: n }, () => new Array(n).fill(0)), d = 1e-4;
  const f = y => Lambda6(y, kap);
  for (let i = 0; i < n; i++) for (let j = i; j < n; j++) {
    const yy = (si, sj) => { const y = y0.slice(); y[i] += si * d; y[j] += sj * d; return y; };
    const v = i === j ? (f(yy(1, 0)) - 2 * f(y0) + f(yy(-1, 0))) / (d * d) : (f(yy(1, 1)) - f(yy(1, -1)) - f(yy(-1, 1)) + f(yy(-1, -1))) / (4 * d * d);
    H[i][j] = H[j][i] = v;
  }
  return H;
}
function symEig(A) { // Jacobi
  const n = A.length, a = A.map(r => r.slice()); let V = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
  for (let sweep = 0; sweep < 100; sweep++) {
    let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += a[i][j] ** 2; if (off < 1e-30) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
      if (Math.abs(a[p][q]) < 1e-300) continue;
      const th = (a[q][q] - a[p][p]) / (2 * a[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let r = 0; r < n; r++) { const arp = a[r][p], arq = a[r][q]; a[r][p] = c * arp - s * arq; a[r][q] = s * arp + c * arq; }
      for (let r = 0; r < n; r++) { const apr = a[p][r], aqr = a[q][r]; a[p][r] = c * apr - s * aqr; a[q][r] = s * apr + c * aqr; }
      for (let r = 0; r < n; r++) { const vrp = V[r][p], vrq = V[r][q]; V[r][p] = c * vrp - s * vrq; V[r][q] = s * vrp + c * vrq; }
    }
  }
  return { values: a.map((r, i) => r[i]), vectors: V };
}
function randomCircle(kap) {
  // random orthonormal frame (e1, e2), radius r0, circle state rho = r0 e1, w = sqrt(k/r0) e2 (same relation for both kappa values)
  const e1 = [rnd() - 0.5, rnd() - 0.5, rnd() - 0.5]; const n1 = norm(e1); e1.forEach((z, i) => e1[i] = z / n1);
  let e2 = [rnd() - 0.5, rnd() - 0.5, rnd() - 0.5]; const p = dot(e2, e1); e2 = e2.map((z, i) => z - p * e1[i]); const n2 = norm(e2); e2 = e2.map(z => z / n2);
  const r0 = 0.5 + 4 * rnd(), s = Math.sqrt(k / r0);
  return { y: [...e1.map(z => r0 * z), ...e2.map(z => s * z)], e1, e2, r0, s };
}
{
  // K4 known case: control circle (kappa=0): rank 2, PSD
  let minNeg = 0, maxNull = 0, minPos = Infinity, tangentResid = 0;
  for (let n = 0; n < 20; n++) {
    const C = randomCircle(0), H = hess6(C.y, 0), E = symEig(H), ev = E.values.slice().sort((a, b) => a - b);
    minNeg = Math.min(minNeg, ev[0]); maxNull = Math.max(maxNull, Math.abs(ev[3])); minPos = Math.min(minPos, ev[4]);
  }
  check('K4a', minNeg < -1e-6 ? 1 : 0, 0, `control 6D Hessian of Lambda has no negative eigenvalue (most negative ${minNeg.toExponential(2)})`);
  check('K4b', maxNull, 1e-6, 'control: four smallest |eigenvalues| (family directions)');
  check('K4c', minPos > 1e-3 ? 0 : 1, 0, `control: two positive eigenvalues, smallest ${minPos.toExponential(3)}`);
}
{
  let minNeg = 0, maxNull = 0, minPos = Infinity, tangentResid = 0, maxPos = 0;
  for (let n = 0; n < 40; n++) {
    const C = randomCircle(KAP), H = hess6(C.y, KAP), E = symEig(H), ev = E.values.slice().sort((a, b) => a - b);
    minNeg = Math.min(minNeg, ev[0]); maxNull = Math.max(maxNull, Math.abs(ev[3])); minPos = Math.min(minPos, ev[4]); maxPos = Math.max(maxPos, ev[5]);
    // tangent directions to the circle family at C: phase rotation, radius change, two tilts; H t must vanish
    const { e1, e2, r0, s } = C, e3 = cross(e1, e2);
    const tangents = [
      [...e2.map(z => r0 * z), ...e1.map(z => -s * z)],                       // phase
      [...e1, ...e2.map(z => -0.5 * s / r0 * z)],                             // radius (w ~ r^-1/2)
      [...e3.map(z => r0 * z), ...[0, 0, 0]],                                 // tilt about e2 (rho toward e3)
      [...[0, 0, 0], ...e3.map(z => s * z)],                                  // tilt about e1 (w toward e3)
    ];
    for (const t of tangents) { const Ht = H.map(row => dot3(row, t)); tangentResid = Math.max(tangentResid, Math.sqrt(dot3(Ht, Ht)) / Math.sqrt(dot3(t, t))); }
  }
  function dot3(a, b) { let z = 0; for (let i = 0; i < a.length; i++) z += a[i] * b[i]; return z; }
  // finite-difference floor: second differences with step 1e-4 r0 carry errors of order 1e-6 relative to the curvature scale (largest eigenvalue)
  check('T2a', Math.max(0, -minNeg) / maxPos, 1e-5, `frozen 6D Hessian of Lambda: most negative eigenvalue relative to the largest (${minNeg.toExponential(2)} / ${maxPos.toExponential(2)}), finite-difference floor`);
  check('T2b', maxNull / maxPos, 1e-5, 'frozen: four smallest |eigenvalues| relative to the largest (rank 2 up to the finite-difference floor)');
  check('T2c', minPos > 1e-3 ? 0 : 1, 0, `frozen: two positive eigenvalues, smallest ${minPos.toExponential(3)}`);
  check('T2d', tangentResid / maxPos, 1e-5, 'frozen: Hessian annihilates the four tangent directions of the circle family (relative to the largest eigenvalue)');
}
// ---- T3: Lambda >= 0 at 20000 random states; Lambda small only near a circle
{
  let minL = Infinity, bad = 0;
  for (let n = 0; n < 20000; n++) {
    const rho = [0.2 + 6 * rnd(), 3 * (rnd() - 0.5), 3 * (rnd() - 0.5)], w = [1.5 * (rnd() - 0.5), 1.5 * (rnd() - 0.5), 1.5 * (rnd() - 0.5)];
    const I = inv(rho, w); minL = Math.min(minL, I.Lambda);
    if (I.Lambda < 1e-4 && !(Math.abs(I.rdot) < 0.02 && Math.abs(I.rh / I.r - 1) < 0.02)) bad++;
  }
  check('T3a', minL < 0 ? 1 : 0, 0, `Lambda nonnegative at 20000 random states (minimum ${minL.toExponential(3)})`);
  check('T3b', bad, 0, 'states with Lambda < 1e-4 are all near a circle (|rdot|<0.02, |r_h/r-1|<0.02)');
}
// ---- Predictions for WP-1..3 and the drift supremum (A.4), plus radial period and apsidal angle by quadrature (7.4)-(7.5)
function periodApsidal(h, eps, kap) {
  const A = k / (2 * -eps), ecc = Math.sqrt(1 - 2 * -eps * h * h / (k * k)), N = 4096; let Tr = 0, Ph = 0;
  for (let i = 0; i < N; i++) { const psi = 2 * Math.PI * i / N, r = A * (1 - ecc * Math.cos(psi)); Tr += Math.sqrt(r * (r + kap)); Ph += Math.sqrt(1 + kap / r) / r; }
  const dpsi = 2 * Math.PI / N; return { Tr: Tr * dpsi / Math.sqrt(2 * -eps), Phi: h * Ph * dpsi / (2 * Math.sqrt(2 * -eps)), A, ecc };
}
{ // K5 known case for the quadrature: control values printed in the subject (WB-11): Tr = 22.41023934847, Phi = pi
  const q = periodApsidal(2.262741699797, -0.34, 0); check('K5', Math.max(Math.abs(q.Tr - 22.41023934847) / 22.41, Math.abs(q.Phi - Math.PI)), 1e-10, 'control quadrature vs WB-11 printed values');
  const q2 = periodApsidal(2.262741699797, -0.34, KAP); check('K5b', Math.max(Math.abs(q2.Tr - 29.00582560484) / 29, Math.abs(q2.Phi - 4.186307002636)), 1e-10, 'frozen quadrature vs WB-4 printed values (same-lane consistency, not independent)');
}
function supSpeedDrift(I, Vc) {
  // exact supremum over the orbit torus of max(|V1|,|V2|) with V_{1,2} = Vc +- w/2, by (A.4): |Vc|^2 + |w|^2/4 + |Vc.w|
  const e1 = [1, 0, 0].map((z, i) => z - I.n[i] * I.n[0]); let n1 = norm(e1); let a1 = n1 > 1e-6 ? e1.map(z => z / n1) : [0, 1, 0]; const a2 = cross(I.n, a1);
  let best = 0, bestState = null; const NR = 400, NT = 720;
  for (let i = 0; i <= NR; i++) {
    const r = I.rp + (I.ra - I.rp) * i / NR, V = I.h * I.h / (2 * r * r) - k / r, rd2 = Math.max(0, 2 * (I.eps - V) / (1 + KAP / r));
    for (const sgn of [1, -1]) for (let j = 0; j < NT; j++) {
      const th = 2 * Math.PI * j / NT, er = a1.map((z, q) => z * Math.cos(th) + a2[q] * Math.sin(th)), et = a1.map((z, q) => -z * Math.sin(th) + a2[q] * Math.cos(th));
      const w = er.map((z, q) => sgn * Math.sqrt(rd2) * z + (I.h / r) * et[q]); const v2 = dot(Vc, Vc) + dot(w, w) / 4 + Math.abs(dot(Vc, w));
      if (v2 > best) { best = v2; bestState = { r, rdot: sgn * Math.sqrt(rd2), theta: th }; }
    }
  }
  return { sup: Math.sqrt(best), at: bestState, centreRest: I.h / (2 * I.rp) };
}
const cases = {
  'WP-1': { rho: [4, 0, 0], w: [0.005, 0.7071067811865476, 0.01], Vc: [0.0525, 0, 0.005], T0: 35.54306350527, n: 200 },
  'WP-2': { rho: [3, 0, 0], w: [0, 2 * 0.3674234614174767, 0], Vc: [0, 0, 0], T0: 23.8046465412, n: 200 },
  'WP-3': { rho: [1, 0, 0], w: [Math.SQRT2 * 1e-3, Math.SQRT2, Math.SQRT2 * 1e-3], Vc: [0, 0, 0], T0: 4.442882938158, n: 200 },
};
const predictions = {};
for (const [id, c] of Object.entries(cases)) {
  const I = inv(c.rho, c.w), q = periodApsidal(I.h, I.eps, KAP), S = supSpeedDrift(I, c.Vc);
  predictions[id] = { h: I.h, hVector: I.hv, epsilon: I.eps, Lambda: I.Lambda, e: I.e, rh: I.rh, rp: I.rp, ra: I.ra, normal: I.n, radialPeriod: q.Tr, apsidalAngle: q.Phi, precessionPerRadialPeriod: 2 * q.Phi - 2 * Math.PI, supSpeedCentreRest: S.centreRest, supSpeedVoidFrame: S.sup, supAt: S.at, tEnd: c.T0 * c.n, radialPeriodsInRun: c.T0 * c.n / q.Tr, rdotMax: Math.sqrt(2 * I.Lambda / (1 + KAP / I.ra)) };
  log(`${id}: ${JSON.stringify(predictions[id])}`);
}
log(`checks failed: ${fails}`);
fs.writeFileSync(new URL('./persistence-checks.out.txt', import.meta.url), out.join('\n') + '\n');
fs.writeFileSync(new URL('./predictions.json', import.meta.url), JSON.stringify({ date: new Date().toISOString(), checksFailed: fails, predictions }, null, 2) + '\n');
