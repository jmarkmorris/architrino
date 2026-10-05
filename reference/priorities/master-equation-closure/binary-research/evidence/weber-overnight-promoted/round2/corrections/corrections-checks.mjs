// Spot checks for the weber-overnight corrections addendum (2026-10-05).
// Node v22 ESM, no packages. Run: node .tmp/weber-overnight/round2/corrections/corrections-checks.mjs
// Every instrument passes a known case (K*) before its target use (T*). c_f = 1 throughout.
// Law: frozen instantaneous Weber-inspired pair, lambda = -1/2, mu = 1, equal coupling K, unit weights.

const cf = 1, lam = -0.5, mu = 1;
let seed = 20261005;
const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
const rr = (a, b) => a + (b - a) * rnd();
const fmt = (x) => (typeof x === 'number' ? x.toExponential(3) : String(x));
const results = [];
function report(id, text, pass) { results.push({ id, text, pass }); console.log(`${pass ? 'PASS' : 'FAIL'} ${id}: ${text}`); }

// ---------- linear algebra helpers ----------
function solve(Ain, bin) {
  const n = bin.length, A = Ain.map(r => r.slice()), b = bin.slice();
  for (let c = 0; c < n; c++) {
    let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[c], A[p]] = [A[p], A[c]]; [b[c], b[p]] = [b[p], b[c]];
    for (let r = 0; r < n; r++) if (r !== c) { const f = A[r][c] / A[c][c]; for (let k = c; k < n; k++) A[r][k] -= f * A[c][k]; b[r] -= f * b[c]; }
  }
  return b.map((v, i) => v / A[i][i]);
}
const matmul = (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce((s, v, k) => s + v * B[k][j], 0)));
const matadd = (A, B, s = 1) => A.map((row, i) => row.map((v, j) => v + s * B[i][j]));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
const zeros = (n) => Array.from({ length: n }, () => Array(n).fill(0));
const maxabs = (A) => Math.max(...A.flat().map(Math.abs));
const trace = (A) => A.reduce((s, r, i) => s + r[i], 0);
// Faddeev-LeVerrier: coefficients of det(sI - A) = s^n + c1 s^(n-1) + ... + cn
function charpoly(A) {
  const n = A.length; let M = zeros(n); const c = [1];
  for (let k = 1; k <= n; k++) { M = matadd(matmul(A, M), eye(n), c[k - 1]); const ck = -trace(matmul(A, M)) / k; c.push(ck); }
  return c;
}
const polymul = (p, q) => { const r = Array(p.length + q.length - 1).fill(0); p.forEach((a, i) => q.forEach((b, j) => { r[i + j] += a * b; })); return r; };
// polynomial in matrix: coefficients high to low
function polymat(coef, A) { const n = A.length; let R = zeros(n); for (const c of coef) { R = matadd(matmul(A, R), eye(n), c); } return R; }

// ---------- the law: 6x6 assembled as affine residual map ----------
const sub = (a, b) => a.map((v, i) => v - b[i]), dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => Math.sqrt(dot(a, a));
// residual of the law for a trial acceleration stack acc=(A1,A2): F(acc) = acc - [A_{1<-2}(acc), -A_{1<-2}(acc)]
function residual(X1, X2, V1, V2, acc, sig, K, l = lam, m = mu) {
  const rho = sub(X1, X2), r = norm(rho), e = rho.map(v => v / r), w = sub(V1, V2);
  const rdot = dot(e, w);
  const rddot = (dot(w, w) - rdot * rdot) / r + dot(e, sub(acc.slice(0, 3), acc.slice(3)));
  const f = (sig * K / (r * r)) * (1 + l * rdot * rdot / (cf * cf) + m * r * rddot / (cf * cf));
  const A12 = e.map(v => f * v);
  return [...acc.slice(0, 3).map((v, i) => v - A12[i]), ...acc.slice(3).map((v, i) => v + A12[i])];
}
function accel(X1, X2, V1, V2, sig, K, l = lam, m = mu) {
  const F0 = residual(X1, X2, V1, V2, [0, 0, 0, 0, 0, 0], sig, K, l, m);
  const M = []; for (let j = 0; j < 6; j++) { const ej = Array(6).fill(0); ej[j] = 1; const Fj = residual(X1, X2, V1, V2, ej, sig, K, l, m); M.push(Fj.map((v, i) => v - F0[i])); }
  const MT = M[0].map((_, i) => M.map(row => row[i]));
  return solve(MT, F0.map(v => -v));
}
// K1 known case: zero-coefficient law gives A1 = sig K e / r^2 exactly.
{
  let worst = 0;
  for (let t = 0; t < 20; t++) {
    const X1 = [rr(-2, 2), rr(-2, 2), rr(-2, 2)], X2 = [rr(-2, 2), rr(-2, 2), rr(-2, 2)], V1 = [rr(-1, 1), rr(-1, 1), rr(-1, 1)], V2 = [rr(-1, 1), rr(-1, 1), rr(-1, 1)];
    const sig = rnd() < 0.5 ? -1 : 1, K = rr(0.5, 2); const rho = sub(X1, X2), r = norm(rho);
    const a = accel(X1, X2, V1, V2, sig, K, 0, 0); const exp1 = rho.map(v => sig * K * v / (r ** 3));
    worst = Math.max(worst, norm(sub(a.slice(0, 3), exp1)), norm(a.slice(3).map((v, i) => v + exp1[i])));
  }
  report('K1', `6x6 solver on zero-coefficient law reproduces sig K e/r^2: worst ${fmt(worst)}`, worst < 1e-12);
}

// ================= Item 1: spectrum of the circular history, inertial vs wholly rotating frame =================
// K2 known case for charpoly: companion-like test matrix with known polynomial (s-1)(s-2)(s+3) = s^3 - 7s + 6... check: roots 1,2,-3: s^3 -0 s^2 -7 s +6
{
  const A = [[1, 0, 0], [0, 2, 0], [0, 0, -3]]; const c = charpoly(A); const exp = [1, 0, -7, 6];
  const err = Math.max(...c.map((v, i) => Math.abs(v - exp[i])));
  report('K2', `Faddeev-LeVerrier on diag(1,2,-3): coefficient error ${fmt(err)}`, err < 1e-13);
}
// K3 known case: analytic in-plane rotating centre block y'' + 2 Om J y' - Om^2 y = 0, state (y1,y2,y1',y2')
function centreBlock(Om) { // J = [[0,-1],[1,0]]: J y' = (-y2', y1')
  return [[0, 0, 1, 0], [0, 0, 0, 1], [Om * Om, 0, 0, 2 * Om], [0, Om * Om, -2 * Om, 0]];
}
{
  const Om = 0.7, A = centreBlock(Om); const N = matadd(matmul(A, A), eye(4), Om * Om);
  const n1 = maxabs(N), n2 = maxabs(matmul(N, N)); const c = charpoly(A); const exp = polymul([1, 0, Om * Om], [1, 0, Om * Om]);
  const err = Math.max(...c.map((v, i) => Math.abs(v - exp[i])));
  report('K3', `analytic rotating centre block: charpoly = (s^2+Om^2)^2 (err ${fmt(err)}); (A^2+Om^2 I) nonzero (${fmt(n1)}) with square ${fmt(n2)} => two size-2 Jordan blocks at +-i Om`, err < 1e-12 && n1 > 0.1 && n2 < 1e-12);
  const Ai = [[0, 0, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0]]; // inertial in-plane centre: y''=0
  report('K3b', `inertial centre block: A nonzero, A^2 = ${fmt(maxabs(matmul(Ai, Ai)))} => zero eigenvalue, size-2 Jordan blocks`, maxabs(matmul(Ai, Ai)) === 0);
}
// T1 target: full 12-state Cartesian law in the wholly rotating frame about the circular history, finite-difference Jacobian.
function rotatingField(state, Om, K, sig) {
  // state = (x1, x2, x1', x2') in the frame rotating at Om about z. Inertial velocity in rotating basis: v_i = x_i' + Om J x_i.
  const x1 = state.slice(0, 3), x2 = state.slice(3, 6), xd1 = state.slice(6, 9), xd2 = state.slice(9, 12);
  const Jv = (x) => [-Om * x[1], Om * x[0], 0];
  const v1 = xd1.map((v, i) => v + Jv(x1)[i]), v2 = xd2.map((v, i) => v + Jv(x2)[i]);
  const a = accel(x1, x2, v1, v2, sig, K);
  const acc = (xi, xdi, ai) => [ai[0] + 2 * Om * xdi[1] + Om * Om * xi[0], ai[1] - 2 * Om * xdi[0] + Om * Om * xi[1], ai[2]]; // x'' = A - 2 Om J x' + Om^2 P x
  return [...xd1, ...xd2, ...acc(x1, xd1, a.slice(0, 3)), ...acc(x2, xd2, a.slice(3))];
}
function fdJacobian(F, x0, h) {
  const n = x0.length, J = zeros(n);
  for (let j = 0; j < n; j++) {
    const d = (s) => { const xp = x0.slice(), xm = x0.slice(); xp[j] += s; xm[j] -= s; const fp = F(xp), fm = F(xm); return fp.map((v, i) => (v - fm[i]) / (2 * s)); };
    const d1 = d(h), d2 = d(h / 2); // Richardson: (4 d2 - d1)/3
    for (let i = 0; i < n; i++) J[i][j] = (4 * d2[i] - d1[i]) / 3;
  }
  return J;
}
for (const x of [1, 4]) {
  const K = 1, sig = -1, r0 = x * K / (cf * cf), k = 2 * K, kap = k / (cf * cf);
  const Om = Math.sqrt(k / r0 ** 3), wr = Math.sqrt(k / (r0 * r0 * (r0 + kap)));
  const eq = [r0 / 2, 0, 0, -r0 / 2, 0, 0, 0, 0, 0, 0, 0, 0];
  const res = maxabs([rotatingField(eq, Om, K, sig)]);
  const F = (s) => rotatingField(s, Om, K, sig);
  const A = fdJacobian(F, eq, 1e-3);
  const Araw = A; const As = Araw.map(row => row.map(v => v / Om)); const Oms = 1, wrs = wr / Om; // time rescaled by 1/Om
  const c = charpoly(As);
  const exp = polymul(polymul([1, 0, 0, 0, 0], polymul(polymul([1, 0, Oms * Oms], [1, 0, Oms * Oms]), [1, 0, Oms * Oms])), [1, 0, wrs * wrs]);
  const err = Math.max(...c.map((v, i) => Math.abs(v - exp[i])));
  // minimal polynomial: m(s) = s^2 (s^2+Om^2)^2 (s^2+wr^2) annihilates; dropping one factor of s or of (s^2+Om^2) does not.
  const q1 = polymul([1, 0, Oms * Oms], [1, 0, Oms * Oms]), q2 = [1, 0, wrs * wrs];
  const mfull = polymul(polymul([1, 0, 0], q1), q2);
  const mdropS = polymul(polymul([1, 0], q1), q2);
  const mdropOm = polymul(polymul([1, 0, 0], [1, 0, Om * Om]), q2);
  const nFull = maxabs(polymat(mfull, As)), nS = maxabs(polymat(mdropS, As)), nOm = maxabs(polymat(mdropOm, As));
  report(`T1(x=${x})`, `equilibrium residual ${fmt(res)}; charpoly (time rescaled by 1/Om) = s^4 (s^2+1)^3 (s^2+(wr/Om)^2) with coefficient error ${fmt(err)} (Om=${Om.toFixed(6)}, wr=${wr.toFixed(6)}); minimal-polynomial test: m(A)=${fmt(nFull)}, without one s: ${fmt(nS)}, without one (s^2+Om^2): ${fmt(nOm)} => size-2 Jordan blocks at 0 and at +-i Om`,
    res < 1e-12 && err < 1e-6 && nFull < 1e-5 && nS > 1e-2 && nOm > 1e-2);
}

// ================= Item 2: opposite-polarity dispersal at epsilon = 0 =================
// radial speed on a level: rdot^2 = 2 (eps - Veff)/Delta, sig=-1, h>0
const rdot2 = (r, eps, h, sig, K) => { const k = 2 * K, kap = k / (cf * cf); return 2 * (eps - h * h / (2 * r * r) - sig * k / r) / (1 - sig * kap / r); };
{ // K4 known case: bound level, rdot^2 vanishes at the closed-form turning radii (7.3)
  const K = 1, k = 2, h = 1.5, eps = -0.3, A = k / (2 * Math.abs(eps)), e = Math.sqrt(1 - 2 * Math.abs(eps) * h * h / (k * k));
  const rp = A * (1 - e), ra = A * (1 + e); const v = Math.max(Math.abs(rdot2(rp, eps, h, -1, K)), Math.abs(rdot2(ra, eps, h, -1, K)));
  report('K4', `rdot^2 vanishes at r_p=${rp.toFixed(6)}, r_a=${ra.toFixed(6)} on a bound level: ${fmt(v)}`, v < 1e-12);
}
{ // T2 target: eps = 0, h = 1: rdot^2 decreases to zero; no positive lower bound; T(r) grows like r^{3/2}
  const K = 1, k = 2, kap = 2, h = 1, eps = 0, rp = h * h / (2 * k);
  const rows = [2, 10, 100, 1e3, 1e4, 1e6].map(r => [r, rdot2(r, eps, h, -1, K)]);
  const monotone = rows.every((row, i) => i === 0 || row[1] < rows[i - 1][1]);
  // time from 2 r_p to R by trapezoid in r of 1/rdot (smooth away from r_p)
  const timeTo = (R) => { const n = 200000, a = 2 * rp, hstep = (R - a) / n; let s = 0; for (let i = 0; i <= n; i++) { const r = a + i * hstep, w = (i === 0 || i === n) ? 0.5 : 1; s += w / Math.sqrt(rdot2(r, eps, h, -1, K)); } return s * hstep; };
  const T1 = timeTo(1e3), T2 = timeTo(8e3); const ratio = T2 / T1; // expect ~ 8^{3/2} = 22.6 asymptotically
  report('T2', `eps=0, h=1: rdot^2 at r=${rows.map(x => x[0]).join(',')} = ${rows.map(x => x[1].toExponential(2)).join(', ')} (monotone decreasing: ${monotone}); T(8e3)/T(1e3) = ${ratio.toFixed(3)} against 8^{3/2} = ${(8 ** 1.5).toFixed(3)} => infinite-time dispersal, speed -> 0`,
    monotone && rows[rows.length - 1][1] < 1e-5 && Math.abs(ratio / 8 ** 1.5 - 1) < 0.05);
  // finite-time check: the receding solution does not converge to a finite radius: rdot^2 > 0 on every r > rp
  let minv = Infinity; for (let r = rp * 1.0001; r < 1e6; r *= 1.01) minv = Math.min(minv, rdot2(r, eps, h, -1, K));
  report('T2b', `rdot^2 > 0 at every sampled r > r_p (min ${fmt(minv)}) so rdot keeps its sign after the turning point`, minv > 0);
}

// ================= Item 3: radial speed-domain table (sig=-1, h=0), centre at rest =================
{
  const K = 1, k = 2, kap = 2; const v2 = (r, eps) => (eps * r + k) / (2 * (r + kap)); // individual speed squared
  const lines = [];
  for (const eps of [-0.5, 0, 0.5, 1, 1.5, 2, 3]) {
    const rs = [1e-6, 0.5, 1, 2, 4, 10, 100, 1e4, 1e6].filter(r => eps >= 0 || r < k / Math.abs(eps));
    const vals = rs.map(r => Math.sqrt(Math.max(0, v2(r, eps))));
    const inc = vals.every((v, i) => i === 0 || v >= vals[i - 1] - 1e-15), dec = vals.every((v, i) => i === 0 || v <= vals[i - 1] + 1e-15);
    const cross = eps > 2 ? k / (eps - 2) : null; const vc = cross ? Math.sqrt(v2(cross, eps)) : null;
    lines.push(`eps=${eps}: v(r->0)=${vals[0].toFixed(6)}, v(r=${rs[rs.length-1]})=${vals[vals.length - 1].toFixed(6)}, ${inc ? 'increasing' : dec ? 'decreasing' : 'non-monotone'} in r${cross ? `; v(r_x=${cross}) = ${vc.toFixed(12)}` : ''}${eps === 2 ? `; sup over finite r < 1: v(1e6)=${vals[vals.length - 1].toFixed(8)}` : ''}`);
  }
  console.log(lines.map(l => '   ' + l).join('\n'));
  const ok = Math.abs(Math.sqrt(v2(1e-9, -0.5)) - 1 / Math.SQRT2) < 1e-6 && Math.sqrt(v2(1e6, 2)) < 1 && Math.abs(Math.sqrt(v2(2, 3)) - 1) < 1e-14;
  report('T3', `radial table: v -> c_f/sqrt2 at contact for every eps; eps=2 stays below c_f at every finite r (sup only at infinity); eps=3 crosses at r_x=k/(eps-2)=2`, ok);
}
{ // T3b: 7.5 claim that for h>0 the relative-speed function in u=1/r has no interior maximum (single interior minimum) on (0,u_p]
  const K = 1, k = 2, kap = 2; let bad = 0, cases = 0;
  for (let t = 0; t < 300; t++) {
    const h = rr(0.2, 3), eps = rr(-k * k / (2 * h * h) * 0.999, 4); cases++;
    const rp = eps >= 0 ? (Math.sqrt(k * k + 2 * eps * h * h) - k) / (2 * eps || 1e-300) : (k / (2 * Math.abs(eps))) * (1 - Math.sqrt(1 - 2 * Math.abs(eps) * h * h / (k * k)));
    const rpv = eps === 0 ? h * h / (2 * k) : rp; const up = 1 / rpv;
    const g = (u) => (2 * eps + 2 * k * u + kap * h * h * u ** 3) / (1 + kap * u);
    const n = 2000; let vals = []; for (let i = 1; i <= n; i++) vals.push(g(up * i / n));
    // count sign changes of the discrete derivative
    let changes = 0; for (let i = 2; i < n; i++) { const d1 = vals[i - 1] - vals[i - 2], d2 = vals[i] - vals[i - 1]; if (d1 * d2 < 0) changes++; }
    const endMax = Math.max(vals[0], vals[n - 1]), interiorMax = Math.max(...vals);
    if (changes > 1 || interiorMax > endMax + 1e-12 || Math.abs(vals[n - 1] - h * h * up * up) > 1e-9) bad++;
  }
  report('T3b', `relative speed^2 g(u) on (0,u_p]: at most one interior critical point and the supremum is at the pericentre end in ${cases - bad}/${cases} random (h,eps) cases including eps > c_f^2`, bad === 0);
}
{ // T3c: individual absolute speeds with centre drift: max(|V1|,|V2|)^2 = |Vc|^2 + |w|^2/4 + |Vc.w|
  let worst = 0;
  for (let t = 0; t < 200; t++) {
    const Vc = [rr(-1, 1), rr(-1, 1), rr(-1, 1)], w = [rr(-2, 2), rr(-2, 2), rr(-2, 2)];
    const V1 = Vc.map((v, i) => v + w[i] / 2), V2 = Vc.map((v, i) => v - w[i] / 2);
    const lhs = Math.max(dot(V1, V1), dot(V2, V2)), rhs = dot(Vc, Vc) + dot(w, w) / 4 + Math.abs(dot(Vc, w));
    worst = Math.max(worst, Math.abs(lhs - rhs));
  }
  report('T3c', `max(|V1|,|V2|)^2 = |Vc|^2 + |w|^2/4 + |Vc . w| at 200 random states: worst ${fmt(worst)}`, worst < 1e-14);
}

// ================= Item 4: like-polarity branch list by RK4 on the reduced equation (5.2) =================
function reducedFate(r0, rd0, h, sig, K, Tmax = 2000) {
  const k = 2 * K, kap = k / (cf * cf);
  const f = (r, rd) => (h * h + sig * k * r - sig * K * r * rd * rd / (cf * cf)) / (r * r * (r - sig * kap));
  let r = r0, rd = rd0, T = 0, turns = 0, lastSign = Math.sign(rd0), rmin = r0, rmax = r0;
  const eps0 = 0.5 * (1 - sig * kap / r) * rd * rd + h * h / (2 * r * r) + sig * k / r;
  while (T < Tmax) {
    const dist = sig > 0 ? Math.min(r, Math.abs(r - kap)) : r; const dt = Math.min(1e-3, 0.05 * dist / (Math.abs(rd) + 1));
    const k1r = rd, k1v = f(r, rd);
    const k2r = rd + 0.5 * dt * k1v, k2v = f(r + 0.5 * dt * k1r, rd + 0.5 * dt * k1v);
    const k3r = rd + 0.5 * dt * k2v, k3v = f(r + 0.5 * dt * k2r, rd + 0.5 * dt * k2v);
    const k4r = rd + dt * k3v, k4v = f(r + dt * k3r, rd + dt * k3v);
    r += dt * (k1r + 2 * k2r + 2 * k3r + k4r) / 6; rd += dt * (k1v + 2 * k2v + 2 * k3v + k4v) / 6; T += dt;
    rmin = Math.min(rmin, r); rmax = Math.max(rmax, r);
    const s = Math.sign(rd); if (s !== 0 && lastSign !== 0 && s !== lastSign) turns++; if (s !== 0) lastSign = s;
    if (r < 1e-4) return { fate: 'contact', T, r, rd, turns, rmin, rmax, eps0 };
    if (sig > 0 && Math.abs(r - kap) < 1e-4) return { fate: 'critical radius', T, r, rd, turns, rmin, rmax, eps0 };
    if (r > 400) return { fate: 'dispersal', T, r, rd, turns, rmin, rmax, eps0 };
  }
  return { fate: 'still bounded at Tmax', T, r, rd, turns, rmin, rmax, eps0 };
}
{ // K5 known case: opposite-polarity bound history returns to its turning points (7.3)
  const K = 1, k = 2, h = 1.5, eps = -0.3, A = k / (2 * Math.abs(eps)), e = Math.sqrt(1 - 2 * Math.abs(eps) * h * h / (k * k)), rp = A * (1 - e), ra = A * (1 + e);
  const rd0 = Math.sqrt(rdot2(A, eps, h, -1, K)); const out = reducedFate(A, rd0, h, -1, K, 60);
  const err = Math.max(Math.abs(out.rmin - rp), Math.abs(out.rmax - ra));
  report('K5', `RK4 on (5.2): bound opposite-polarity history stays in [r_p, r_a] = [${rp.toFixed(6)}, ${ra.toFixed(6)}]: observed [${out.rmin.toFixed(6)}, ${out.rmax.toFixed(6)}], err ${fmt(err)}, fate '${out.fate}'`, err < 1e-4 && out.fate === 'still bounded at Tmax');
}
{ // T4 target: like polarity (sig=+1), K=1, kappa=2, h=1: Veff(kappa) = h^2/(2 kappa^2) + c_f^2 = 1.125
  const K = 1, k = 2, kap = 2, h = 1, Vk = h * h / (2 * kap * kap) + cf * cf;
  const speedAt = (r, eps) => Math.sqrt(Math.max(0, rdot2(r, eps, h, 1, K)));
  const cases = [
    ['exterior, eps<Veff(k), approaching', 6, -speedAt(6, 0.8), 'dispersal', 1],
    ['exterior, eps<Veff(k), receding', 6, speedAt(6, 0.8), 'dispersal', 0],
    ['exterior, eps>Veff(k), approaching', 6, -speedAt(6, 1.5), 'critical radius', 0],
    ['exterior, eps>Veff(k), receding (omitted branch)', 2.5, speedAt(2.5, 1.5), 'dispersal', 0],
    ['exterior, eps=Veff(k), approaching', 6, -speedAt(6, Vk), 'critical radius', 0],
    ['exterior, eps=Veff(k), receding', 2.5, speedAt(2.5, Vk), 'dispersal', 0],
    ['interior, eps<Veff(k), approaching', 1.5, -speedAt(1.5, 0.8), 'contact', 0],
    ['interior, eps<Veff(k), receding', 1.5, speedAt(1.5, 0.8), 'critical radius', 0],
    ['interior, eps=Veff(k), approaching', 1.5, -speedAt(1.5, Vk), 'contact', 0],
    ['interior, eps=Veff(k), receding', 1.5, speedAt(1.5, Vk), 'critical radius', 0],
    ['interior, eps>Veff(k), approaching', 1.0, -speedAt(1.0, 1.5), 'contact', 0],
    ['interior, eps>Veff(k), receding', 1.0, speedAt(1.0, 1.5), 'contact', 1],
  ];
  let allok = true;
  for (const [label, r0, rd0, expFate, expTurns] of cases) {
    const out = reducedFate(r0, rd0, h, 1, K, 3000);
    const extra = out.fate === 'dispersal' ? ` rdot^2=${(out.rd * out.rd).toFixed(4)} vs 2eps=${(2 * out.eps0).toFixed(4)}` : out.fate === 'critical radius' ? ` |rdot|=${Math.abs(out.rd).toFixed(3)} (threshold-level finite value sqrt(2c_f^2+2h^2/kappa^2)=${Math.sqrt(2 + 2 * h * h / (kap * kap)).toFixed(3)})` : ` |rdot|=${Math.abs(out.rd).toFixed(3)}`;
    const ok = out.fate === expFate && out.turns === expTurns; allok = allok && ok;
    console.log(`   ${ok ? 'ok ' : 'BAD'} ${label}: eps=${out.eps0.toFixed(4)}, fate=${out.fate}, turns=${out.turns}, T=${out.T.toFixed(3)}${extra}`);
  }
  report('T4', `like-polarity branch list (12 direction/level/region cases) matches the corrected Theorem 8.1 list`, allok);
  // analytic allowed-region check: on eps > Veff(kappa) the exterior has rdot^2 > 0 everywhere (no turning point), so a receding exterior history disperses
  let minv = Infinity; for (let r = kap * 1.0001; r < 1e4; r *= 1.01) minv = Math.min(minv, rdot2(r, 1.5, h, 1, K));
  report('T4b', `exterior rdot^2 > 0 at every sampled r > kappa on eps=1.5 > Veff(kappa)=${Vk}: min ${fmt(minv)} => no exterior turning point on that level`, minv > 0);
}

// ================= Item 5: collinear invariant constant C on each chart =================
{
  const K = 1, k = 2, kap = 2;
  const Cof = (r, rd, sig) => Math.abs(1 - sig * kap / r) * (1 - rd * rd / (2 * cf * cf));
  const epsof = (r, rd, sig) => 0.5 * (1 - sig * kap / r) * rd * rd + sig * k / r;
  // K6 known case: opposite polarity (Delta>0): C = 1 - eps
  let w1 = 0; for (let t = 0; t < 100; t++) { const r = rr(0.1, 10), rd = rr(-3, 3); w1 = Math.max(w1, Math.abs(Cof(r, rd, -1) - (1 - epsof(r, rd, -1)))); }
  report('K6', `opposite polarity (Delta>0): C = 1 - eps/c_f^2 at 100 random states, worst ${fmt(w1)}`, w1 < 1e-13);
  // T5: like polarity inside (Delta<0): C = -(1 - eps); outside: C = 1 - eps
  let w2 = 0, w3 = 0; for (let t = 0; t < 100; t++) { const ri = rr(0.05, 1.95), ro = rr(2.05, 20), rd = rr(-3, 3); w2 = Math.max(w2, Math.abs(Cof(ri, rd, 1) + (1 - epsof(ri, rd, 1)))); w3 = Math.max(w3, Math.abs(Cof(ro, rd, 1) - (1 - epsof(ro, rd, 1)))); }
  report('T5', `like polarity: inside r<kappa, C = -(1 - eps/c_f^2) (worst ${fmt(w2)}); outside, C = +(1 - eps/c_f^2) (worst ${fmt(w3)}) => C = sign(Delta)(1 - eps/c_f^2)`, w2 < 1e-13 && w3 < 1e-13);
  // T5b: along an integrated inside like-polarity history, C is constant and equals -(1-eps)
  const r0 = 1.5, eps = 0.8, rd0 = -Math.sqrt(rdot2(r0, eps, 0, 1, K)); let r = r0, rd = rd0, Cmin = Infinity, Cmax = -Infinity;
  const f = (r, rd) => (k * r - K * r * rd * rd) / (r * r * (r - kap));
  for (let i = 0; i < 200000 && r > 0.01; i++) { const dt = 1e-5; const k1r = rd, k1v = f(r, rd); const k2r = rd + 0.5 * dt * k1v, k2v = f(r + 0.5 * dt * k1r, rd + 0.5 * dt * k1v); const k3r = rd + 0.5 * dt * k2v, k3v = f(r + 0.5 * dt * k2r, rd + 0.5 * dt * k2v); const k4r = rd + dt * k3v, k4v = f(r + dt * k3r, rd + dt * k3v); r += dt * (k1r + 2 * k2r + 2 * k3r + k4r) / 6; rd += dt * (k1v + 2 * k2v + 2 * k3v + k4v) / 6; const C = Cof(r, rd, 1); Cmin = Math.min(Cmin, C); Cmax = Math.max(Cmax, C); }
  report('T5b', `inside like-polarity history from r=1.5, eps=0.8: C in [${Cmin.toFixed(12)}, ${Cmax.toFixed(12)}], expected -(1-eps) = ${(-(1 - eps)).toFixed(12)}`, Math.abs(Cmin + (1 - eps)) < 1e-8 && Math.abs(Cmax + (1 - eps)) < 1e-8);
  // T5c: the identity Delta (1 - rdot^2/(2 c_f^2)) = 1 - eps/c_f^2 holds with the signed Delta on both charts
  let w4 = 0; for (let t = 0; t < 200; t++) { const sig = rnd() < 0.5 ? -1 : 1, r = rr(0.05, 10), rd = rr(-3, 3); if (Math.abs(r - 2) < 1e-3) continue; w4 = Math.max(w4, Math.abs((1 - sig * kap / r) * (1 - rd * rd / 2) - (1 - epsof(r, rd, sig)))); }
  report('T5c', `signed identity Delta (1 - rdot^2/2c_f^2) = 1 - eps/c_f^2 on both charts and both polarities: worst ${fmt(w4)}`, w4 < 1e-13);
}

const fails = results.filter(r => !r.pass).length;
console.log(`\n${results.length - fails}/${results.length} checks passed${fails ? `; FAILURES: ${results.filter(r => !r.pass).map(r => r.id).join(', ')}` : ''}`);
