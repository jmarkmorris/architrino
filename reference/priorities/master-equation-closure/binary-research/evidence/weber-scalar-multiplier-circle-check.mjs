// Check for the scalar-multiplier circle exclusion (analysis/weber-scalar-multiplier-circle-exclusion.md).
// Written 2026-10-09 by the Claude session that wrote the treatment. Imports nothing.
// Rigid mirror circle, opposite polarity, units c_f = K = R_0 = 1. The hit geometry is built from
// positions and velocities directly. The partner root is located from xi = beta cos(xi) and then verified by the
// arrival residual |R - c_f tau| computed from positions; the component formulas of the treatment are not used.
// Run: node reference/priorities/master-equation-closure/binary-research/evidence/weber-scalar-multiplier-circle-check.mjs
const root = (beta) => { let lo = 0, hi = Math.PI / 2; for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; (m - beta * Math.cos(m) > 0) ? hi = m : lo = m; } return (lo + hi) / 2; };
function hit(beta) {
  const xi = root(beta), Om = beta;                 // R_0 = 1 so Omega = beta
  const tau = 2 * xi / Om, S = -tau;
  const X1 = [1, 0], V1 = [0, beta];
  const X2 = [-Math.cos(Om * S), -Math.sin(Om * S)], V2 = [Om * Math.sin(Om * S), -Om * Math.cos(Om * S)];
  const r = [X1[0] - X2[0], X1[1] - X2[1]], R = Math.hypot(...r), n = [r[0] / R, r[1] / R];
  const Dt = 1 - (n[0] * V2[0] + n[1] * V2[1]);
  const pref = -1 / (R * R * Math.abs(Dt));          // sigma K c_f /(R^2 |D_t|), sigma = -1
  const Acan = [pref * n[0], pref * n[1]];
  const e = [r[0] - V2[0] * tau, r[1] - V2[1] * tau], E = Math.hypot(...e), nt = [e[0] / E, e[1] / E];
  const Aext = [pref * nt[0], pref * nt[1]];
  return { xi, resid: Math.abs(R - tau), Dt, canR: Acan[0], canT: Acan[1], extR: Aext[0], extT: Aext[1], E };
}
// census: count roots of xi = beta|cos xi| (partner) and xi = beta|sin xi| (self) on (0, 40] by sign changes
function census(beta) { let p = 0, s = 0; const N = 400000, L = 40; let fp = -1, fs_ = 0;
  for (let k = 1; k <= N; k++) { const x = k * L / N; const a = x - beta * Math.abs(Math.cos(x)), b = x - beta * Math.abs(Math.sin(x));
    if (k > 1) { if (a === 0 || a * fp < 0) p++; if (b * fs_ < 0) s++; } fp = a; fs_ = b; } return { p, s }; }
// 1. known cases first
const k1 = hit(0.01); console.log("known: canonical A_theta/beta at 0.01 =", (k1.canT / 0.01).toPrecision(15), "(Codex: 0.24998333616613028; limit 1/4)");
console.log("known: extrapolated A_theta/beta^3 at 0.01 =", (k1.extT / 1e-6).toPrecision(10), "(Codex: 0.3332366955; limit 1/3)");
const c2 = census(2.5), c5 = census(5); console.log("known: census at beta=2.5 -> partner", c2.p, "self", c2.s, "; at beta=5 -> partner", c5.p, "self", c5.s, "(superfield: more than one root expected at large beta)");
// 2. targets
let minCan = Infinity, minExt = Infinity, maxRes = 0, minDt = Infinity, minE = Infinity, worstCensus = "1/0";
for (let k = 1; k <= 2000; k++) { const b = k / 2000; const h = hit(b); minCan = Math.min(minCan, h.canT / b); minExt = Math.min(minExt, h.extT / b ** 3); maxRes = Math.max(maxRes, h.resid); minDt = Math.min(minDt, h.Dt); minE = Math.min(minE, h.E); }
for (const b of [0.05, 0.3, 0.6, 0.9, 0.999, 1]) { const c = census(b); if (c.p !== 1 || c.s !== 0) worstCensus = `${c.p}/${c.s} at ${b}`; }
console.log("targets beta = k/2000, k=1..2000 (includes beta = 1):");
console.log("  min canonical A_theta/beta   =", minCan.toPrecision(8), " min extrapolated A_theta/beta^3 =", minExt.toPrecision(8));
console.log("  max root residual =", maxRes.toExponential(2), " min D_t =", minDt.toPrecision(6), " min |r - w tau| =", minE.toPrecision(6));
console.log("  census partner/self at beta in {0.05,0.3,0.6,0.9,0.999,1}: all 1/0 ?", worstCensus === "1/0" ? "yes" : worstCensus);
const e1 = hit(1); console.log("  beta = 1: xi =", e1.xi.toPrecision(10), " canonical (A_r, A_theta) =", e1.canR.toPrecision(8), e1.canT.toPrecision(8), " extrapolated (A_r, A_theta) =", e1.extR.toPrecision(8), e1.extT.toPrecision(8));
