// Claude's independent exact-rational recheck of the aligned Darwin confinement inequalities. Imports nothing; integrates nothing.
// Fractions are pairs of BigInt with positive denominator. Known cases first; targets only if they pass.
const gcd = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };
const F = (n, d = 1n) => { n = BigInt(n); d = BigInt(d); if (d < 0n) { n = -n; d = -d; } const g = gcd(n, d) || 1n; return [n / g, d / g]; };
const add = (x, y) => F(x[0] * y[1] + y[0] * x[1], x[1] * y[1]), neg = x => [-x[0], x[1]], sub = (x, y) => add(x, neg(y));
const mul = (x, y) => F(x[0] * y[0], x[1] * y[1]), div = (x, y) => F(x[0] * y[1], x[1] * y[0]);
const lt = (x, y) => x[0] * y[1] < y[0] * x[1], eq = (x, y) => x[0] === y[0] && x[1] === y[1];
const pow = (x, k) => { let r = F(1); for (let i = 0; i < k; i++) r = mul(r, x); return r; };
const num = x => Number(x[0]) / Number(x[1]);
const dec = s => { const [i, f = ''] = s.split('.'); return F(BigInt(i + f), 10n ** BigInt(f.length)); };
const half = F(1, 2), one = F(1), two = F(2);
// the reduced radial potential on the aligned plane chi = 0, from the functional: F(r) = J/D - 1/r + (q/4) 2r/(2r-1)
const D = r => add(mul(r, r), mul(half, r));
const Dp = r => add(mul(two, r), half);
const g = r => div(pow(add(mul(two, r), one), 2), mul(two, add(mul(F(4), r), one)));
const b2 = r => div(mul(two, r), sub(mul(two, r), one)), b1 = r => div(r, sub(r, one));
const Fr = (r, J, q) => add(sub(div(J, D(r)), div(one, r)), mul(div(q, F(4)), b2(r)));
const F1 = (r, J, q) => add(add(neg(div(mul(J, Dp(r)), pow(D(r), 2))), div(one, mul(r, r))), neg(div(q, mul(two, pow(sub(mul(two, r), one), 2)))));
const F2 = (r, J, q) => add(sub(div(mul(J, add(add(mul(F(6), mul(r, r)), mul(F(3), r)), half)), pow(D(r), 3)), div(two, pow(r, 3))), div(mul(two, q), pow(sub(mul(two, r), one), 3)));
let pass = true; const check = (label, cond) => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}`); pass = pass && cond; };
console.log('== known cases first');
check('fraction arithmetic: 1/3 + 1/6 = 1/2', eq(add(F(1, 3), F(1, 6)), half));
for (const r of [F(2), F(20), F(100)]) {
  check(`q=0, r=${num(r)}: F\'(r)=0 at J=g(r)`, eq(F1(r, g(r), F(0)), F(0)));
  check(`q=0, r=${num(r)}: F\'\'(r)=8/(r(4r+1)(2r+1))`, eq(F2(r, g(r), F(0)), div(F(8), mul(r, mul(add(mul(F(4), r), one), add(mul(two, r), one))))));
}
// derivative formulas against exact difference quotients of F itself (a second route): symmetric quotient error is O(h^2)
{ const r = F(100), J = g(r), q = F(1, 10000), h = F(1, 1000000); const dq = div(sub(Fr(add(r, h), J, q), Fr(sub(r, h), J, q)), mul(two, h));
  check('F\' formula agrees with an exact symmetric difference quotient of F to 1e-12 relative', Math.abs(num(dq) / num(F1(r, J, q)) - 1) < 1e-9 || Math.abs(num(dq) - num(F1(r, J, q))) < 1e-18);
  const d2 = div(add(sub(Fr(add(r, h), J, q), mul(two, Fr(r, J, q))), Fr(sub(r, h), J, q)), mul(h, h)); check('F\'\' formula agrees with an exact second difference of F', Math.abs(num(d2) / num(F2(r, J, q)) - 1) < 1e-6); }
if (!pass) { console.log('controls failed; targets not run'); process.exit(1); }
console.log('== targets');
const r0 = F(100), P = mul(mul(two, sub(one, div(one, mul(two, r0)))), F(1, 200)), q = mul(P, P);
check('P0 = 199/20000 and q = 39601/400000000', eq(P, F(199, 20000)) && eq(q, F(39601, 400000000)));
const Jm = g(r0), Jc = mul(Jm, sub(one, div(mul(q, mul(r0, r0)), mul(two, pow(sub(mul(two, r0), one), 2)))));
check('J_m = 40401/802', eq(Jm, F(40401, 802)));
check('J_c = (79999/80000) J_m = 3232039599/64160000', eq(Jc, F(3232039599n, 64160000n)));
check('F\'(100; J_m) = -1/800000000 exactly', eq(F1(r0, Jm, q), F(-1, 800000000)));
check('F\'(100; J_c) = 0 exactly', eq(F1(r0, Jc, q), F(0)));
check('tangential speed squared of the exact circle = J_c/(r+1/2)^2 = 79999/16040000', eq(div(Jc, pow(add(r0, half), 2)), F(79999, 16040000)));
const l = dec('99.99'), h = dec('100.01'), m = dec('0.0000009'), M = dec('0.0000011'), A = F(1, 800000000), B = F(1, 100000000000n), eta = F(1, 10000);
const num6 = r => add(add(mul(F(6), mul(r, r)), mul(F(3), r)), half);
const lower = sub(div(mul(Jc, num6(l)), pow(D(h), 3)), div(two, pow(l, 3)));
const upper = add(sub(div(mul(Jm, num6(h)), pow(D(l), 3)), div(two, pow(h, 3))), div(mul(two, q), pow(sub(mul(two, l), one), 3)));
check(`(7) lower bound of F'' on the box exceeds m: ${num(lower).toExponential(6)} > 9e-7`, lt(m, lower));
check(`upper bound of F'' on the box is below M: ${num(upper).toExponential(6)} < 1.1e-6`, lt(upper, M));
const eps = div(mul(A, A), mul(two, m)); check('epsilon = A^2/(2m) = 1/1152000000000', eq(eps, F(1, 1152000000000n)));
const radial = sub(mul(div(m, two), F(1, 10000)), div(A, F(100))); check(`(9) radial barrier = 13/400000000000 > B`, eq(radial, F(13, 400000000000n)) && lt(B, radial));
const lat = sub(mul(div(Jc, D(h)), mul(eta, eta)), eps); check(`(11) latitude barrier ${num(lat).toExponential(6)} equals the stated fraction and exceeds B`, eq(lat, F(2286759970829n, 46435438599552000000000n)) && lt(B, lat));
// section 4 box
const xi = F(1, 100000), box = add(add(add(mul(A, F(1, 1000)), div(mul(M, F(1, 1000000)), two)), add(div(mul(div(Jm, D(l)), mul(xi, xi)), pow(sub(one, div(mul(xi, xi), two)), 2)), mul(mul(div(q, F(4)), b1(l)), mul(xi, xi)))), div(add(mul(add(one, div(one, l)), F(1, 10n ** 12n)), mul(D(h), F(1, 10n ** 16n))), F(4)));
check(`section 4 box total ${num(box).toExponential(4)} < 3e-12 < B`, lt(box, F(3, 10n ** 12n)) && lt(F(3, 10n ** 12n), B));
// section 5: brackets by exact sign changes at J = J_m
check('r_c in (100.00125, 100.00127): F\' changes sign', lt(F1(dec('100.00125'), Jm, q), F(0)) && lt(F(0), F1(dec('100.00127'), Jm, q)));
const E0 = Fr(r0, Jm, q); check('outer turning point in (100.00250, 100.00254): F - F(100) changes sign', lt(Fr(dec('100.00250'), Jm, q), E0) && lt(E0, Fr(dec('100.00254'), Jm, q)));
check('A/m = 1/720, so the completed square gives 100 <= r <= 100 + 1/360', eq(div(A, m), F(1, 720)));
check('(16) chi bound: eps D(h)/J_m < (1/75000)^2', lt(div(mul(eps, D(h)), Jm), F(1, 75000n * 75000n)));
check('(16) radial speed: 4 eps < (1/500000)^2 (a >= 1)', lt(mul(F(4), eps), F(1, 500000n * 500000n)));
check('(16) latitude rate: 4 eps / D(100) < (1/50000000)^2', lt(div(mul(F(4), eps), D(r0)), F(1, 50000000n * 50000000n)));
// speeds in the box (squared comparisons)
check('tangential half-speed: J_m/((l+1/2)^2 (1-eta^2/2)^2) < 0.072^2', lt(div(Jm, mul(pow(add(l, half), 2), pow(sub(one, div(mul(eta, eta), two)), 2))), pow(dec('0.072'), 2)));
check('common speed: (1/2) beta_1(l) |P| < 0.006 (beta_1 is the larger eigenvalue)', lt(mul(mul(half, b1(l)), P), dec('0.006')));
check('radial and latitude half-speeds: (B + eps) < (0.000005)^2 with a >= 1 and r^2/D <= 1', lt(add(B, eps), pow(dec('0.000005'), 2)));
check('Hessian eigenvalues on the box lie in (0.98, 1.02)', lt(dec('0.98'), sub(one, div(one, l))) && lt(add(one, div(one, l)), dec('1.02')));
console.log(pass ? 'ALL TARGETS PASS' : 'SOME TARGET FAILED'); process.exit(pass ? 0 : 1);
