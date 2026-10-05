// Closed-form / quadrature predictions for the fixed instantaneous Weber-inspired pair law
// (lambda_W = -1/2, mu_W = 1, c_f = 1, K = 1), for preregistration of a separately written Cartesian instrument.
// Source derivation: reference/priorities/master-equation-closure/binary-research/analysis/weber-overnight-investigation.md
// Node v22, no packages. Two internal methods per periodic quantity: (Q) periodic trapezoid quadrature in the
// eccentric-anomaly variable of the closed-form first integral; (R) RK4 on the reduced radial/azimuthal ODE
// derived from the boxed law (not a Cartesian integrator). Agreement of Q and R is internal consistency only.
// Run: node .tmp/weber-overnight/reduction/predictions.mjs

const C = 1, K = 1, k = 2 * K, kap = k / (C * C);
const f12 = x => (Math.abs(x) < 1e-3 || Math.abs(x) >= 1e4) ? x.toExponential(12) : x.toPrecision(13);

// periodic trapezoid of g on [0, 2pi], doubling until converged
function ptrap(g) { let n = 16, prev = NaN, val;
  for (; n <= 1 << 16; n *= 2) { let s = 0; for (let i = 0; i < n; i++) s += g(2 * Math.PI * i / n); val = s * 2 * Math.PI / n; if (Math.abs(val - prev) < 1e-15 * Math.abs(val)) break; prev = val; }
  return val; }

// bound history from invariants (eps < 0, h > 0); kappa = 0 gives the zero-coefficient control
function bound(eps, h, kp) {
  const A = k / (2 * -eps); const e = Math.sqrt(Math.max(0, 1 + 2 * eps * h * h / (k * k)));
  const rp = A * (1 - e), ra = A * (1 + e); const s2 = Math.sqrt(2 * -eps);
  const r = psi => A * (1 - e * Math.cos(psi));
  const Tr = ptrap(psi => Math.sqrt(r(psi) * (r(psi) + kp))) / s2;          // full radial period
  const Phi = 0.5 * h / s2 * ptrap(psi => Math.sqrt(1 + kp / r(psi)) / r(psi)); // apsidal angle (peri -> apo)
  const vmax = h / (2 * rp); // individual speed maximum (centre of velocity at rest), attained at pericentre
  return { A, e, rp, ra, Tr, Phi, prec: 2 * Phi - 2 * Math.PI, vmax };
}

// reduced ODE (sigma = -1, frozen): rddot = (h^2 - k r + K r rdot^2/c^2)/(r^2 (r + kappa)), thetadot = h/r^2
function rk4Apo(r0, h, kp, dt) {
  const Kc = kp > 0 ? K : 0; // kappa = 0 control: rddot = (h^2 - k r)/r^3
  const F = ([r, v, th]) => [v, (h * h - k * r + Kc * r * v * v / (C * C)) / (r * r * (r + kp)), h / (r * r)];
  let y = [r0, 0, 0], t = 0, passedPeri = false;
  for (let it = 0; it < 1e8; it++) {
    const k1 = F(y), k2 = F(y.map((q, i) => q + dt / 2 * k1[i])), k3 = F(y.map((q, i) => q + dt / 2 * k2[i])), k4 = F(y.map((q, i) => q + dt * k3[i]));
    const yn = y.map((q, i) => q + dt / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
    if (y[1] < 0 && yn[1] >= 0) passedPeri = true;
    if (passedPeri && y[1] > 0 && yn[1] <= 0) { // locate v = 0 by cubic Hermite in t for v (uses vdot at ends)
      const fa = F(y), fb = F(yn); let lo = 0, hi = 1;
      const herm = (s, a, b, da, db) => { const h00 = 2 * s ** 3 - 3 * s ** 2 + 1, h10 = s ** 3 - 2 * s ** 2 + s, h01 = -2 * s ** 3 + 3 * s ** 2, h11 = s ** 3 - s ** 2; return h00 * a + h10 * dt * da + h01 * b + h11 * dt * db; };
      for (let j = 0; j < 80; j++) { const m = (lo + hi) / 2; if (herm(m, y[1], yn[1], fa[1], fb[1]) > 0) lo = m; else hi = m; }
      const s = (lo + hi) / 2; const th = herm(s, y[2], yn[2], fa[2], fb[2]);
      return { Tr: t + s * dt, dtheta: th };
    }
    y = yn; t += dt;
  }
}

console.log('=== Known case first: zero-coefficient control (kappa = 0) reproduces Kepler radial period and apsidal angle pi ===');
{ const eps = -0.34, h = 4 * 0.8 * Math.sqrt(k / 4); const b = bound(eps, h, 0); const T0 = 2 * Math.PI * Math.sqrt(b.A ** 3 / k);
  console.log('Tr quad =', f12(b.Tr), ' 2pi sqrt(A^3/k) =', f12(T0), ' rel err', ((b.Tr - T0) / T0).toExponential(2));
  console.log('Phi quad =', f12(b.Phi), ' pi =', f12(Math.PI), ' rel err', ((b.Phi - Math.PI) / Math.PI).toExponential(2)); }

console.log('\n=== Circular histories (sigma = -1), x = r c^2/K; r is full separation ===');
for (const x of [4, 1]) {
  const r = x * K / (C * C), wrel = Math.sqrt(k / r), Om = Math.sqrt(k / r ** 3), wr = Om / Math.sqrt(1 + kap / r);
  const Phi = Math.PI * Math.sqrt(1 + kap / r);
  const small = bound(-k / (2 * r) * (1 - 1e-10), Math.sqrt(k * r), kap); // nearly circular, quadrature limit check
  console.log(`x=${x}: relative speed ${f12(wrel)}, individual speed ${f12(wrel / 2)}, Omega ${f12(Om)}, orbital period ${f12(2 * Math.PI / Om)}`);
  console.log(`      radial frequency ${f12(wr)}, small-oscillation radial period ${f12(2 * Math.PI / wr)}, apsidal angle (linear) ${f12(Phi)} rad, precession per radial period ${f12(2 * Phi - 2 * Math.PI)} rad`);
  console.log(`      quadrature limit e->0: Tr ${f12(small.Tr)}, Phi ${f12(small.Phi)}  (e = ${small.e.toExponential(2)})`);
}

console.log('\n=== Apocentre release at x = 4, tangential speed 0.8 of circular (sigma = -1) ===');
{ const ra0 = 4, wt = 0.8 * Math.sqrt(k / ra0), h = ra0 * wt, eps = 0.5 * wt * wt - k / ra0;
  console.log(`initial relative tangential speed ${f12(wt)}, individual ${f12(wt / 2)}, h = ${f12(h)}, epsilon = ${f12(eps)} (identical for both laws since rdot = 0)`);
  for (const [lab, kp] of [['Weber frozen', kap], ['zero-coefficient', 0]]) {
    const b = bound(eps, h, kp); const R = rk4Apo(ra0, h, kp, 2e-4);
    console.log(`${lab}: r_p ${f12(b.rp)}, r_a ${f12(b.ra)}, A ${f12(b.A)}, e ${f12(b.e)}`);
    console.log(`   radial period ${f12(b.Tr)} [RK4 reduced: ${f12(R.Tr)}], apsidal angle ${f12(b.Phi)} rad [RK4: ${f12(R.dtheta / 2)}], precession/radial period ${f12(b.prec)} rad`);
    console.log(`   max individual speed (CoV at rest) ${f12(b.vmax)} at pericentre`);
  }
}

console.log('\n=== Radial release from rest at x = 4 ===');
{ const r0 = 4;
  // sigma = -1: shifted Kepler s = r + kappa, G = k s0/r0
  const s0 = r0 + kap, G = k * s0 / r0;
  const tTo = s1 => Math.sqrt(s0 ** 3 / (2 * G)) * (Math.acos(Math.sqrt(s1 / s0)) + Math.sqrt((s1 / s0) * (1 - s1 / s0)));
  const tc = tTo(kap), tcK = Math.PI / 2 * Math.sqrt(r0 ** 3 / (2 * k));
  const eps = -k / r0;
  console.log(`sigma=-1 Weber: contact time ${f12(tc)}, relative speed at contact ${f12(Math.sqrt(2) * C)}, individual ${f12(C / Math.SQRT2)}, rddot at contact ${f12(k * (eps - C * C) / (C * C * kap * kap))} (per-member acceleration half of this)`);
  console.log(`   checkpoint: time to r = 2: ${f12(tTo(2 + kap))}, relative speed there ${f12(Math.sqrt(2 * k * (r0 - 2) / (r0 * (2 + kap))))}`);
  console.log(`sigma=-1 zero-coefficient: contact time ${f12(tcK)} (speed diverges); time to r = 2: ${f12(Math.sqrt(r0 ** 3 / (2 * k)) * (Math.acos(Math.sqrt(0.5)) + 0.5))}, relative speed there ${f12(Math.sqrt(2 * k * (1 / 2 - 1 / r0)))}`);
  // RK4 cross-check of sigma = -1 contact time via t = int dr/|rdot| already in checks.mjs (I1). Here: time to r=2 by reduced RK4.
  { const F = ([r, v]) => [v, (-k * r + K * r * v * v / (C * C)) / (r * r * (r + kap))]; let y = [r0, 0], t = 0, dt = 1e-4;
    while (true) { const k1 = F(y), k2 = F(y.map((q, i) => q + dt / 2 * k1[i])), k3 = F(y.map((q, i) => q + dt / 2 * k2[i])), k4 = F(y.map((q, i) => q + dt * k3[i])); const yn = y.map((q, i) => q + dt / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i])); if (yn[0] <= 2) { t += dt * (y[0] - 2) / (y[0] - yn[0]); break; } y = yn; t += dt; }
    console.log(`   [RK4 reduced check, linear interpolation at dt=1e-4: time to r = 2 = ${f12(t)}]`); }
  // sigma = +1 (outside critical radius r_c = kappa = 2): shifted repulsive Kepler s = r - kappa, |G| = k(1 - eps/c^2), eps = k/r0
  const epsP = k / r0, s0p = r0 - kap, Gp = k * (1 - epsP / (C * C));
  const tP = s => Math.sqrt(s0p / (2 * Gp)) * (Math.sqrt(s * (s - s0p)) + s0p * Math.log((Math.sqrt(s) + Math.sqrt(s - s0p)) / Math.sqrt(s0p)));
  const tK = r => Math.sqrt(r0 / (2 * k)) * (Math.sqrt(r * (r - r0)) + r0 * Math.log((Math.sqrt(r) + Math.sqrt(r - r0)) / Math.sqrt(r0)));
  console.log(`sigma=+1 Weber: no contact, no further turning; epsilon = ${f12(epsP)} < c^2, escapes; asymptotic relative speed ${f12(Math.sqrt(2 * epsP))}, individual ${f12(Math.sqrt(epsP / 2))}`);
  console.log(`   checkpoint: time to r = 8: ${f12(tP(8 - kap))}, relative speed there ${f12(Math.sqrt(2 * (epsP * 8 - k) / (8 - kap)))}`);
  console.log(`sigma=+1 zero-coefficient: time to r = 8: ${f12(tK(8))}, relative speed there ${f12(Math.sqrt(2 * k * (1 / r0 - 1 / 8)))}, asymptotic relative ${f12(Math.sqrt(2 * k / r0))}`);
}

console.log('\n=== Supplementary: like polarity launched inward at x = 4 with rdot = -1.6 (individual speed 0.8) ===');
{ const r0 = 4, v0 = -1.6; const eps = 0.5 * (1 - kap / r0) * v0 * v0 + k / r0; const G = k * (eps / (C * C) - 1); const s0 = r0 - kap;
  // attractive shifted Kepler with eps > 0: t = int_0^{s0} ds / sqrt(2 eps + 2G/s); substitute s = s0 sin^2(phi)
  const g = ph => { const s = s0 * Math.sin(ph) ** 2; return 2 * s0 * Math.sin(ph) * Math.cos(ph) / Math.sqrt(2 * eps + 2 * G / s); };
  // integrand ~ sqrt(s) near 0 -> smooth in phi; Simpson
  let n = 20000, H = (Math.PI / 2) / n, S = 0; for (let i = 0; i <= n; i++) { const ph = i * H; const val = i === 0 ? 0 : g(ph); S += (i === 0 || i === n ? 1 : i % 2 ? 4 : 2) * val; } S *= H / 3;
  const rx = k / (2 * C * C - eps);
  console.log(`epsilon = ${f12(eps)} > c^2: reaches critical radius r_c = ${kap} in finite time ${f12(S)} with rdot -> -infinity; individual speed equals c at r_x = ${f12(rx)}`);
}
