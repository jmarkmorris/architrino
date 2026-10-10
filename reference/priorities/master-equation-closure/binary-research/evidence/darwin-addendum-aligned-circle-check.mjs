// Claude's own check of the aligned drifting circle algebra for the Darwin-inspired pair (sigma=-1, K=c_f=1).
// Imports nothing. Known case first (q=0), then targets. Float arithmetic; not a certificate.
const D = r => r * r + r / 2;
const g = r => (2 * r + 1) ** 2 / (2 * (4 * r + 1));
const b1 = r => r / (r - 1), b2 = r => 2 * r / (2 * r - 1);
const Vam = (r, chi, j2, q) => j2 / (D(r) * Math.cos(chi) ** 2) - 1 / r + (q / 4) * (b2(r) + (b1(r) - b2(r)) * Math.sin(chi) ** 2);
// balance: dV/dr = 0 at chi=0  =>  j2 = (1/r^2 + q*b2'/4) * D^2/D'
const db2 = r => -2 / (2 * r - 1) ** 2, ddb2 = r => 8 / (2 * r - 1) ** 3;
const j2bal = (r, q) => (1 / r ** 2 + q * db2(r) / 4) * D(r) ** 2 / (2 * r + 0.5);
const fpp = r => (2 * (2 * r + 0.5) ** 2 - 2 * D(r)) / D(r) ** 3; // (1/D)''
const krAnalytic = (r, q) => j2bal(r, q) * fpp(r) - 2 / r ** 3 + (q / 4) * ddb2(r);
// independent route: Richardson-extrapolated central differences of Vam itself
function d1(f, x, h) { const c = k => (f(x + k) - f(x - k)) / (2 * k); return (4 * c(h / 2) - c(h)) / 3; }
function d2(f, x, h) { const c = k => (f(x + k) - 2 * f(x) + f(x - k)) / (k * k); return (4 * c(h / 2) - c(h)) / 3; }
function report(label, r, q) {
  const j2 = j2bal(r, q);
  const res = d1(x => Vam(x, 0, j2, q), r, r * 1e-3);
  const krFD = d2(x => Vam(x, 0, j2, q), r, r * 2e-3);
  const kchi = d2(c => Vam(r, c, j2, q), 0, 1e-3);
  const kchiA = 2 * j2 / D(r) + q * (b1(r) - b2(r)) / 2;
  console.log(`${label}: r=${r} q=${q} j2=${j2} g=${g(r)} residual=${res.toExponential(3)} kr(analytic)=${krAnalytic(r, q)} kr(FD)=${krFD} kchi(analytic)=${kchiA} kchi(FD)=${kchi}`);
  return { j2, kr: krAnalytic(r, q), krFD };
}
console.log('== known case first: q = 0 must give j2 = g(r) and kr = 8/(r(4r+1)(2r+1))');
let ok = true;
for (const r of [2, 20, 100]) {
  const o = report('control', r, 0); const exact = 8 / (r * (4 * r + 1) * (2 * r + 1));
  const pass = Math.abs(o.j2 - g(r)) < 1e-12 * g(r) && Math.abs(o.kr - exact) < 1e-12 * exact && Math.abs(o.krFD - exact) < 1e-6 * exact;
  console.log(`   exact kr=${exact}  ${pass ? 'PASS' : 'FAIL'}`); ok = ok && pass;
}
if (!ok) { console.log('control failed; targets not run'); process.exit(1); }
console.log('== targets');
report('D-01 r=100 |P|=0.1', 100, 0.01);
report('D-01 r=20  |P|=0.1', 20, 0.01);
report('DG momentum r=100', 100, 0.0001019701);
console.log('frozen text formula U_rr + q*b2\'\'/4 (no change of j): r=100 ->', 8 / (100 * 401 * 201) + 0.0025 * ddb2(100), ' r=20 ->', 8 / (20 * 81 * 41) + 0.0025 * ddb2(20));
console.log('== D-03: r=100, q=9 required j2 =', j2bal(100, 9), ' qmax(100) =', 2 * 199 ** 2 / 100 ** 2);
for (const r of [1.5, 2, 20, 100]) { const qm = 2 * (2 * r - 1) ** 2 / r ** 2; console.log(`   r=${r}: kr(qmax)=${krAnalytic(r, qm)}  closed form 2/(r^3(2r-1))=${2 / (r ** 3 * (2 * r - 1))}  j2(qmax)=${j2bal(r, qm).toExponential(2)}`); }
console.log('== D-02: DC-100 plus common normal velocity U=(0,0,0.005): |P| = 2(1-1/(2r))|U|');
{ const r = 100, P = 2 * (1 - 1 / (2 * r)) * 0.005, q = P * P; const resid = d1(x => Vam(x, 0, g(r), q), r, 0.1); console.log(`   q=${q} radial derivative at unchanged j2=g: ${resid.toExponential(6)}  q*b2'/4=${(q * db2(r) / 4).toExponential(6)}  implied radius shift=${(-resid / krAnalytic(r, q)).toExponential(4)}`); }
console.log('== D-04: DL-100: l = b r u with r=100, u=0.005:', (1 + 1 / 200) * 100 * 0.005, ' l^2 =', ((1 + 1 / 200) * 100 * 0.005) ** 2);
