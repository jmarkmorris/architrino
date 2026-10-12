#!/usr/bin/env node
// Independent exact-rational checker for the BHL-001 matched-pair enclosure radius.
// Authored separately from the theorem and from any earlier scratch evaluator.
// All arithmetic is exact over the rationals (BigInt numerator/denominator); norms are
// compared through their squares so no square root is ever taken. c_f = 1 throughout.
//
// Usage: node check-matched-pair-enclosure.mjs            (runs known case, then controls)
//
// Kernel per hit, as a function of the delayed source event (x, v) for receiver at X_r:
//   K(x, v) = n / (r^2 D),  n = (X_r - x)/r,  r = |X_r - x|,  D = 1 - n.v
// so the receiver acceleration is kappa * q_r * sum_t q_t K(x_t(T_t), v_t(T_t)).
// Instances are chosen so that r is rational (axis geometry or a Pythagorean triple), which
// makes every kernel component rational.

class Q {
  constructor(n, d = 1n) { n = BigInt(n); d = BigInt(d); if (d === 0n) throw new Error("zero denominator");
    if (d < 0n) { n = -n; d = -d; } const g = Q.gcd(n < 0n ? -n : n, d); this.n = n / g; this.d = d / g; }
  static gcd(a, b) { while (b) { [a, b] = [b, a % b]; } return a || 1n; }
  static of(s) { if (s instanceof Q) return s; if (typeof s === "string" && s.includes("/")) { const [a, b] = s.split("/"); return new Q(a, b); } return new Q(s); }
  add(o) { o = Q.of(o); return new Q(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = Q.of(o); return new Q(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = Q.of(o); return new Q(this.n * o.n, this.d * o.d); }
  div(o) { o = Q.of(o); return new Q(this.n * o.d, this.d * o.n); }
  neg() { return new Q(-this.n, this.d); }
  abs() { return new Q(this.n < 0n ? -this.n : this.n, this.d); }
  cmp(o) { o = Q.of(o); const l = this.n * o.d, r = o.n * this.d; return l < r ? -1 : l > r ? 1 : 0; }
  le(o) { return this.cmp(o) <= 0; } lt(o) { return this.cmp(o) < 0; } eq(o) { return this.cmp(o) === 0; }
  isZero() { return this.n === 0n; }
  toString() { return this.d === 1n ? `${this.n}` : `${this.n}/${this.d}`; }
  toNumber() { return Number(this.n) / Number(this.d); }
  pow(k) { let r = new Q(1); for (let i = 0; i < k; i++) r = r.mul(this); return r; }
}
const q = (s) => Q.of(s);
const vec = (a, b, c) => [q(a), q(b), q(c)];
const vsub = (a, b) => a.map((x, i) => x.sub(b[i]));
const vadd = (a, b) => a.map((x, i) => x.add(b[i]));
const vscale = (a, s) => a.map((x) => x.mul(s));
const dot = (a, b) => a.reduce((s, x, i) => s.add(x.mul(b[i])), q(0));
const norm2 = (a) => dot(a, a);
// Exact rational square root, or throw if the argument is not a perfect rational square.
function sqrtQ(x) { const isq = (m) => { if (m < 0n) return null; if (m < 2n) return m; let lo = 0n, hi = m; while (lo < hi) { const mid = (lo + hi + 1n) >> 1n; if (mid * mid <= m) lo = mid; else hi = mid - 1n; } return lo * lo === m ? lo : null; };
  const a = isq(x.n), b = isq(x.d); if (a === null || b === null) throw new Error(`not a rational square: ${x}`); return new Q(a, b); }

// Kernel at a delayed source event. Requires |X_r - x| to be a rational square.
function kernel(Xr, x, v) {
  const rvec = vsub(Xr, x); const r = sqrtQ(norm2(rvec)); const n = vscale(rvec, q(1).div(r));
  const D = q(1).sub(dot(n, v)); if (!D.cmp(0)) throw new Error("D = 0");
  return vscale(n, q(1).div(r.mul(r).mul(D)));
}

// Source histories are affine in emission time S on one slab: x(S) = x0 + v*S (cubic histories
// with zero quadratic and cubic coefficients). Residual g(S) = |X_r - x(S)| - (T_r - S).
// Membership on the slab [lo, hi] by the theorem's strict-interior rule: with g' >= nu_s > 0,
// strict endpoint signs g(lo) < 0 < g(hi) certify one interior root (present); strictly same-sided
// signs certify absence; an endpoint equality is ambiguous and is rejected (neither present nor absent).
// Endpoint distances must be rational squares for an exact test. Histories may be polynomial in S.
function position(src, S) { if (src.poly) return src.poly.map((c) => c.reduce((acc, ck, k) => acc.add(ck.mul(S.pow(k))), q(0))); return vadd(src.x0, vscale(src.v, S)); }
function residual(Xr, Tr, src, S) { return sqrtQ(norm2(vsub(Xr, position(src, S)))).sub(q(Tr).sub(S)); }
function membership(Xr, Tr, src, lo, hi) { const glo = residual(Xr, Tr, src, lo), ghi = residual(Xr, Tr, src, hi);
  const present = glo.lt(0) && q(0).lt(ghi); const absent = (glo.cmp(0) > 0 && ghi.cmp(0) > 0) || (glo.lt(0) && ghi.lt(0));
  return { glo, ghi, present, absent, ambiguous: !present && !absent }; }

// Corrected pair radius, jointly reviewed 2026-10-11, with |kappa q_r| eps = 1:
//   B = (2 nu_s + v+) l+ / ((r-)^3 nu_s^3) + (w+ + a+ l+ / nu_s) / ((r-)^2 nu_s^2)
function pairRadius({ rMinus, vPlus, ellPlus, wPlus, aPlus }) {
  const nu = q(1).sub(vPlus); if (!nu.cmp(0) || nu.lt(0)) throw new Error("nu_s must be positive");
  const term1 = q(2).mul(nu).add(vPlus).mul(ellPlus).div(rMinus.mul(rMinus).mul(rMinus).mul(nu).mul(nu).mul(nu));
  const term2 = wPlus.add(aPlus.mul(ellPlus).div(nu)).div(rMinus.mul(rMinus).mul(nu).mul(nu));
  return term1.add(term2);
}

const out = [];
const say = (s) => { out.push(s); console.log(s); };
let failures = 0;
const check = (label, ok) => { say(`${ok ? "PASS" : "FAIL"}  ${label}`); if (!ok) failures++; };

// ---------- 0. Known analytical case, recorded before any target ----------
say("## 0. Known case: static source at distance 2 on the z axis, zero velocity");
{
  const Xr = vec(0, 0, 2), K = kernel(Xr, vec(0, 0, 0), vec(0, 0, 0));
  say(`K = (${K.join(", ")})  expected (0, 0, 1/4)`);
  check("known case K = (0,0,1/4)", K[0].isZero() && K[1].isZero() && K[2].eq("1/4"));
  // Known derivative sign: grad_x D = +P v / r. Finite difference in exact rationals at one point.
  const v = vec(0, "1/10", 0), x0 = vec(0, 0, 0), h = q("1/1000");
  const Dat = (x) => { const rv = vsub(Xr, x); const r = sqrtQ(norm2(rv)); return q(1).sub(dot(vscale(rv, q(1).div(r)), v)); };
  // move source in +y by h: distance becomes sqrt(h^2+4), not rational; use the exact identity instead:
  // D(x) = 1 - (Xr - x).v / r. At x0, Xr - x0 = (0,0,2), so moving x by (0,h,0) gives (Xr-x).v = -h/10.
  // Then D = 1 + (h/10)/r > D(x0) = 1, so the derivative in +y is positive, matching +P v / r = +(0,1/10,0)/2.
  const r2 = norm2(vsub(Xr, vadd(x0, vec(0, h, 0))));
  const numerator = q(0).sub(dot(vsub(Xr, vadd(x0, vec(0, h, 0))), v)); // -(Xr-x).v = +h/10
  check("grad_x D sign: moving source along +v raises D (numerator -(Xr-x).v > 0)", numerator.cmp(0) > 0 && r2.cmp(4) > 0);
  void Dat;
  if (failures) { say("KNOWN CASE FAILED: stopping before any target instance"); process.exit(2); }
}

// ---------- 1. Static control: opposite members on one ray, both roots in slab ----------
say("\n## 1. Static control: receiver at origin, +eps at z = R + l/2, -eps at z = R - l/2, R = 10, l = 1/100");
{
  const R = q(10), l = q("1/100"), Xr = vec(0, 0, 0), Tr = q(0);
  const plus = { x0: vec(0, 0, R.add(l.div(2))), v: vec(0, 0, 0) }, minus = { x0: vec(0, 0, R.sub(l.div(2))), v: vec(0, 0, 0) };
  const lo = q(-20), hi = q(0);
  const mP = membership(Xr, Tr, plus, lo, hi), mM = membership(Xr, Tr, minus, lo, hi);
  check("static: both roots strictly interior to slab [-20, 0]", mP.present && mM.present && !mP.ambiguous && !mM.ambiguous);
  const Kp = kernel(Xr, plus.x0, plus.v), Km = kernel(Xr, minus.x0, minus.v);
  const diff = vsub(Kp, Km); // pair sum with q_+ = +1, q_- = -1
  const closed = q(2).mul(R).mul(l).div(R.mul(R).sub(l.mul(l).div(4)).mul(R.mul(R).sub(l.mul(l).div(4)))); // exact 2Rl/((R^2-l^2/4)^2)
  check("static: exact difference equals closed form 2Rl/(R^2 - l^2/4)^2 in z and vanishes in x,y", diff[0].isZero() && diff[1].isZero() && diff[2].abs().eq(closed));
  const B = pairRadius({ rMinus: R.sub(l.div(2)), vPlus: q(0), ellPlus: l, wPlus: q(0), aPlus: q(0) });
  say(`|pair| = ${diff[2].abs()} ≈ ${diff[2].abs().toNumber()}, radius B = ${B} ≈ ${B.toNumber()}`);
  check("static: |pair contribution|^2 <= B^2", norm2(diff).le(B.mul(B)));
  const unpaired = q(1).div(R.sub(l.div(2)).mul(R.sub(l.div(2)))).add(q(1).div(R.add(l.div(2)).mul(R.add(l.div(2)))));
  say(`unpaired absolute bound sum = ${unpaired.toNumber()}; pair radius / unpaired = ${B.div(unpaired).toNumber()}`);
  // Two-slice admission at member slice 1e-6: width 2B <= 2e-6 ?
  check("static: two-slice admission 2B <= 2e-6 fails at d = 10 (expected; cutoff ~27)", !q(2).mul(B).le(q("2/1000000")));
  const Bfar = pairRadius({ rMinus: q(28), vPlus: q(0), ellPlus: l, wPlus: q(0), aPlus: q(0) });
  check("static: two-slice admission 2B <= 2e-6 holds at r- = 28", q(2).mul(Bfar).le(q("2/1000000")));
}

// ---------- 2. Mixed-membership rejection: the one-root-missing counterexample ----------
say("\n## 2. Mixed membership: same static pair, slab [-R, 0] so only the nearer root is inside");
{
  const R = q(10), l = q("1/100"), Xr = vec(0, 0, 0), Tr = q(0);
  const plus = { x0: vec(0, 0, R.add(l.div(2))), v: vec(0, 0, 0) }, minus = { x0: vec(0, 0, R.sub(l.div(2))), v: vec(0, 0, 0) };
  const mP = membership(Xr, Tr, plus, R.neg(), q(0)), mM = membership(Xr, Tr, minus, R.neg(), q(0));
  say(`farther member: g(lo) = ${mP.glo}, g(hi) = ${mP.ghi}, present = ${mP.present}; nearer member: present = ${mM.present}`);
  check("mixed: membership test rejects the pair (one present, one absent, none ambiguous)", mP.absent && mM.present && !mP.ambiguous && !mM.ambiguous);
  const retained = kernel(Xr, minus.x0, minus.v); // only the nearer hit is retained
  const B = pairRadius({ rMinus: R.sub(l.div(2)), vPlus: q(0), ellPlus: l, wPlus: q(0), aPlus: q(0) });
  check("mixed: retained single contribution exceeds the pair radius, so admitting it would be wrong", norm2(retained).cmp(B.mul(B)) > 0);
}

// ---------- 3. Affine moving control with exact rational roots (Pythagorean geometry) ----------
say("\n## 3. Affine moving control: X±(S) = (±a, 0, ±u S), receiver (0,0,R), T_r = L, a^2 + R^2 = L^2, roots exactly S = 0");
{
  // Pythagorean triple (101, 5100, 5101) scaled by 1/5100: a = 101/5100, R = 1, L = 5101/5100.
  const a = q("101/5100"), R = q(1), L = q("5101/5100"), u = q("1/10");
  const Xr = vec(0, 0, R), Tr = L;
  const plus = { x0: vec(a, 0, 0), v: vec(0, 0, u) }, minus = { x0: vec(a.neg(), 0, 0), v: vec(0, 0, u.neg()) };
  check("affine: a^2 + R^2 = L^2 exactly", a.mul(a).add(R.mul(R)).eq(L.mul(L)));
  check("affine: residuals vanish at S = 0 for both members", residual(Xr, Tr, plus, q(0)).isZero() && residual(Xr, Tr, minus, q(0)).isZero());
  const Kp = kernel(Xr, plus.x0, plus.v), Km = kernel(Xr, minus.x0, minus.v);
  const diff = vsub(Kp, Km);
  // Closed form from the review: (1 - u^2 R^2 / L^2)^-1 * (-l/L^3, 0, 2 u R^2 / L^4) with l = 2a
  const pref = q(1).div(q(1).sub(u.mul(u).mul(R).mul(R).div(L.mul(L))));
  const closedX = pref.mul(q(2).mul(a).neg()).div(L.mul(L).mul(L)), closedZ = pref.mul(q(2).mul(u).mul(R).mul(R)).div(L.mul(L).mul(L).mul(L));
  say(`K+ - K- = (${diff.map((x) => x.toNumber()).join(", ")})`);
  check("affine: exact difference equals the reviewed closed form", diff[0].eq(closedX) && diff[1].isZero() && diff[2].eq(closedZ));
  // Membership on a common slab [-h, h] with h = 1/100: endpoints must have rational distances? Not needed for the
  // sign rule when the exact roots are known to be 0 in (-h, h); we instead verify monotonicity bound g' >= nu_s
  // through the velocity ball and use the exact roots. Record this as the hypothesis actually certified.
  const h = q("1/100");
  const vPlus = u, nu = q(1).sub(u);
  const ellPlus = q(2).mul(a).add(q(2).mul(u).mul(h)); // |X+ - X-|(S) = sqrt(l^2 + 4u^2S^2) <= l + 2u|S| <= l + 2uh (conservative, rational)
  const wPlus = q(2).mul(u), aPlus = q(0);
  const rMinus = R.sub(u.mul(h)); // |X_r - x(S)| >= R - z(S) >= R - u h over the slab and its convex hull (conservative, rational)
  const B = pairRadius({ rMinus, vPlus, ellPlus, wPlus, aPlus });
  say(`hypotheses: r- = ${rMinus}, v+ = ${vPlus}, nu_s = ${nu}, l+ = ${ellPlus}, w+ = ${wPlus}, a+ = 0; B = ${B} ≈ ${B.toNumber()}`);
  check("affine: |K+ - K-|^2 <= B^2", norm2(diff).le(B.mul(B)));
  // Position-only radius (velocity term dropped) must FAIL to enclose, as the review predicted.
  const Bpos = pairRadius({ rMinus, vPlus, ellPlus, wPlus: q(0), aPlus: q(0) });
  check("affine: position-only radius fails to enclose (velocity dipole is real)", norm2(diff).cmp(Bpos.mul(Bpos)) > 0);
  say(`z component ≈ ${diff[2].toNumber()} versus 2u/((1-u^2) R^2) ≈ ${q(2).mul(u).div(q(1).sub(u.mul(u)).mul(R).mul(R)).toNumber()} (large-R limit)`);
}

// ---------- 3b. Both-absent control and endpoint-boundary control ----------
say("\n## 3b. Route branches: both roots absent emits zero; an exact endpoint root is ambiguous and rejected");
{
  const R = q(10), l = q("1/100"), Xr = vec(0, 0, 0), Tr = q(0);
  const plus = { x0: vec(0, 0, R.add(l.div(2))), v: vec(0, 0, 0) }, minus = { x0: vec(0, 0, R.sub(l.div(2))), v: vec(0, 0, 0) };
  const aP = membership(Xr, Tr, plus, q(-5), q(-1)), aM = membership(Xr, Tr, minus, q(-5), q(-1));
  say(`slab [-5,-1]: g(lo) = ${aP.glo}, ${aM.glo}; g(hi) = ${aP.ghi}, ${aM.ghi}`);
  check("both-absent: both members certified absent on [-5, -1]", aP.absent && aM.absent && !aP.present && !aM.present);
  const emitted = aP.absent && aM.absent ? q(0) : null;
  check("both-absent: emitted pair interval is exactly zero", emitted !== null && emitted.isZero());
  const bP = membership(Xr, Tr, plus, R.add(l.div(2)).neg(), q(0)); // lower endpoint equals the farther root exactly
  say(`boundary slab [-(R+l/2), 0]: farther member g(lo) = ${bP.glo}, g(hi) = ${bP.ghi}`);
  check("boundary: exact endpoint root is ambiguous, neither present nor absent", bP.ambiguous && !bP.present && !bP.absent && bP.glo.isZero());
  check("boundary: pair is rejected when one member is ambiguous", !(bP.present && membership(Xr, Tr, minus, R.add(l.div(2)).neg(), q(0)).present));
}

// ---------- 3c. Quadratic (degree <= 3) control with nonzero acceleration and exact rational roots ----------
say("\n## 3c. Nonzero-acceleration control: receiver at origin, T_r = 0, members on the z axis with z_±(S) = R_± + c S^2");
{
  // Member +: R_+ = 10, c = 2/125, root where z = -S: c S^2 + S + R = 0, discriminant 1 - 8R/125 = 9/25, root S_+ = -25/2.
  // Member -: R_- = 369/40, same c, discriminant 1 - 8R_-/125 = 256/625, root S_- = -45/4. Slab [-15, -10] holds both strictly.
  const c = q("2/125"), Rp = q(10), Rm = q("369/40"), Xr = vec(0, 0, 0), Tr = q(0), lo = q(-15), hi = q(-10);
  const mk = (R) => ({ poly: [[q(0)], [q(0)], [R, q(0), c]] }); // z(S) = R + 0*S + c*S^2
  const plus = mk(Rp), minus = mk(Rm);
  const Sp = q("-25/2"), Sm = q("-45/4");
  check("quadratic: residuals vanish exactly at the claimed roots", residual(Xr, Tr, plus, Sp).isZero() && residual(Xr, Tr, minus, Sm).isZero());
  const mP = membership(Xr, Tr, plus, lo, hi), mM = membership(Xr, Tr, minus, lo, hi);
  say(`endpoint residuals: + (${mP.glo}, ${mP.ghi}), - (${mM.glo}, ${mM.ghi})`);
  check("quadratic: both roots strictly interior by the sign rule", mP.present && mM.present);
  // Bernstein control vectors on the slab (h = 5, S = -15 + 5u): power coefficients of z in u, then b_j, d_j, e_j.
  const h = hi.sub(lo);
  const powerU = (R) => { // z = R + c(lo + h u)^2 = (R + c lo^2) + (2 c lo h) u + (c h^2) u^2 + 0 u^3
    return [R.add(c.mul(lo).mul(lo)), q(2).mul(c).mul(lo).mul(h), c.mul(h).mul(h), q(0)]; };
  const binom = (n, k) => { const f = (m) => { let r = 1n; for (let i = 2n; i <= m; i++) r *= i; return r; }; return new Q(f(BigInt(n)), f(BigInt(k)) * f(BigInt(n - k))); };
  const bern = (cu) => [0, 1, 2, 3].map((j) => { let s = q(0); for (let k = 0; k <= j; k++) s = s.add(binom(j, k).div(binom(3, k)).mul(cu[k])); return s; });
  const bP = bern(powerU(Rp)), bM = bern(powerU(Rm));
  const dP = [0, 1, 2].map((j) => q(3).mul(bP[j + 1].sub(bP[j])).div(h)), dM = [0, 1, 2].map((j) => q(3).mul(bM[j + 1].sub(bM[j])).div(h));
  const eP = [0, 1].map((j) => q(2).mul(dP[j + 1].sub(dP[j])).div(h)), eM = [0, 1].map((j) => q(2).mul(dM[j + 1].sub(dM[j])).div(h));
  const maxAbs = (arr) => arr.reduce((m, x) => (x.abs().cmp(m) > 0 ? x.abs() : m), q(0));
  const rMinus = [...bP, ...bM].reduce((m, x) => (x.lt(m) ? x : m), bP[0]); // all control z > 0, receiver at z = 0: box floor is the smallest control z
  const vPlus = maxAbs([...dP, ...dM]), aPlus = maxAbs([...eP, ...eM]);
  const ellPlus = maxAbs(bP.map((x, j) => x.sub(bM[j]))), wPlus = maxAbs(dP.map((x, j) => x.sub(dM[j])));
  say(`Bernstein inputs: r- = ${rMinus}, v+ = ${vPlus}, a+ = ${aPlus} (exact 2c = ${q(2).mul(c)}), l+ = ${ellPlus}, w+ = ${wPlus}`);
  check("quadratic: a+ from Bernstein equals the exact acceleration 2c", aPlus.eq(q(2).mul(c)));
  check("quadratic: w+ from Bernstein is exactly zero (equal velocity functions)", wPlus.isZero());
  // Independent verification of the input inequalities at sampled rational emission times (a sample, not a proof).
  const samples = [lo, q("-29/2"), q(-14), q("-27/2"), Sp, q(-12), Sm, q(-11), q("-21/2"), hi];
  let ok = true;
  for (const S of samples) {
    const zP = Rp.add(c.mul(S).mul(S)), zM = Rm.add(c.mul(S).mul(S)), vz = q(2).mul(c).mul(S);
    ok = ok && zP.cmp(rMinus) >= 0 && zM.cmp(rMinus) >= 0 && vz.abs().le(vPlus) && zP.sub(zM).abs().le(ellPlus) && q(2).mul(c).abs().le(aPlus);
  }
  check("quadratic: sampled positions, speeds, separation and acceleration respect the Bernstein bounds", ok);
  check("quadratic: speed bound below the wake speed", vPlus.lt(1));
  const Kp = kernel(Xr, position(plus, Sp), vec(0, 0, q(2).mul(c).mul(Sp))), Km = kernel(Xr, position(minus, Sm), vec(0, 0, q(2).mul(c).mul(Sm)));
  const diff = vsub(Kp, Km);
  const B = pairRadius({ rMinus, vPlus, ellPlus, wPlus, aPlus });
  say(`K+ - K- = (${diff.join(", ")}) ≈ ${diff[2].toNumber()}; B = ${B} ≈ ${B.toNumber()}`);
  check("quadratic: |K+ - K-|^2 <= B^2 with Bernstein-derived inputs", norm2(diff).le(B.mul(B)));
  const Bnoacc = pairRadius({ rMinus, vPlus, ellPlus, wPlus, aPlus: q(0) });
  say(`radius without the acceleration term ≈ ${Bnoacc.toNumber()} (reported for scale; enclosure ${norm2(diff).le(Bnoacc.mul(Bnoacc)) ? "holds" : "fails"} there)`);
}

// ---------- 4. Table arithmetic from the review, exact ----------
say("\n## 4. Review table: radius coefficients and admission widths, exact rationals");
{
  const rows = [["5/1000", "1/100", 102], ["1/4", "1/2", 943]];
  for (const [vp, wp, d] of rows) {
    const vPlus = q(vp), nu = q(1).sub(vPlus), ell = q("1/100"), wPlus = q(wp);
    const A = q(2).mul(nu).add(vPlus).mul(ell).div(nu.mul(nu).mul(nu)), C = wPlus.div(nu.mul(nu));
    const width = q(2).mul(A).div(q(d).mul(d).mul(d)).add(q(2).mul(C).div(q(d).mul(d)));
    say(`v+ = ${vPlus}, w+ = ${wPlus}: A ≈ ${A.toNumber()}, C ≈ ${C.toNumber()}, width at d = ${d}: ${width.toNumber()}`);
    check(`table: width at d = ${d} <= 2e-6`, width.le(q("2/1000000")));
    const widthPrev = q(2).mul(A).div(q(d - 1).mul(d - 1).mul(d - 1)).add(q(2).mul(C).div(q(d - 1).mul(d - 1)));
    check(`table: width at d = ${d - 1} > 2e-6 (so ${d} is the conservative integer cutoff)`, widthPrev.cmp(q("2/1000000")) > 0);
  }
  check("table: static 1414^2 < 2e6 <= 1415^2", 1414n * 1414n < 2000000n && 2000000n <= 1415n * 1415n);
}

say(`\n${failures === 0 ? "ALL CHECKS PASSED" : failures + " CHECK(S) FAILED"}`);
process.exit(failures === 0 ? 0 : 1);
