// Spindle rail click-booking VECTOR evaluator (spec Section 32; the brake attack).
//
// The native confirmation run (spec Section 30, REJECTED candidate) left two named
// gaps on the same-source channel: (1) the brake magnitude was regulator-limited —
// pointwise booking with the near fold branch inside d_min books the pair as +1 and
// under-books the absorptive component (hardening soft reproduces the caustic
// ejection artifact); (2) the pin confirmed natively is a SPEED attractor only —
// radius was unconfined, and radial under-support was the rejection's first blocker.
//
// This evaluator implements the Section 3.1/3.3 chart-clean booking on prescribed
// worldlines and extends it from the tangential projection to the FULL VECTOR:
//   (A) the click impulse across the field-speed crossing, integrating the exact
//       signed branch orientation m = D_T/D_s over the click window with ALL live
//       same-source branches summed (near + far fold branches, none dropped by a
//       min-delay gate) — reported as (radial, tangential) components with
//       convergence, cut-distance, and regularization-independence witnesses;
//   (B) the SUSTAINED supra-field channel: on worldlines held above the rail with
//       prescribed tangential acceleration betaDot, the persistent same-source
//       root's signed vector force — the between-clicks brake/confinement row the
//       native run had sub-marginal, as a map over (beta, betaDot).
// The radial SIGN in (A)/(B) is the orbit-pin question: inward means the self
// channel contributes radial confinement at the rail; outward means confinement
// must come from elsewhere (sea, geometry change).
//
// Worldlines are prescribed planar rotating channels (fixed radius rho, ramped or
// held tangential speed) — reference instruments, not the native solver.
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.

import { fileURLToPath } from "node:url";

export const SCHEMA = "spindle_rail_click_booking_vector_evaluator.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-archive/braid-ideal/fold-crossing-chart-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_prescribed_worldline_evaluator_not_native_solver_not_accepted_evidence",
});

const cf = 1, KAPPA = 1, SIGMA_SELF = +1;

// Planar rotating channel, fixed radius, tangential speed beta(t):
//   ramp: beta(t) = beta0 + betaDot * t   (constant prescribed tangential acceleration)
// phase integrates dphi/dt = beta(t) * cf / rho. Samples { t, x:[3], v:[3] }.
export function buildRampWorldline({ rho = 1, beta0 = 0.95, betaDot = 0.4, dt = 2e-4, duration = 1.2 } = {}) {
  const out = []; let phi = 0;
  const n = Math.round(duration / dt);
  for (let k = 0; k <= n; k++) {
    const t = k * dt, beta = beta0 + betaDot * t, w = (beta * cf) / rho;
    out.push({ t, x: [rho * Math.cos(phi), rho * Math.sin(phi), 0],
      v: [-beta * cf * Math.sin(phi), beta * cf * Math.cos(phi), 0] });
    phi += w * dt; // forward-Euler phase; dt=2e-4 keeps phase error < 1e-4 per unit time
  }
  return out;
}

function sample(wl, time) {
  if (time <= wl[0].t) return wl[0];
  if (time >= wl[wl.length - 1].t) return wl[wl.length - 1];
  let lo = 0, hi = wl.length - 1;
  while (hi - lo > 1) { const m = (lo + hi) >> 1; if (wl[m].t <= time) lo = m; else hi = m; }
  const a = wl[lo], b = wl[hi], u = (time - a.t) / (b.t - a.t);
  return { t: time, x: a.x.map((z, i) => z + u * (b.x[i] - z)), v: a.v.map((z, i) => z + u * (b.v[i] - z)) };
}
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = (a) => Math.sqrt(dot(a, a));

function residual(wl, T, s) { return norm(sub(sample(wl, T).x, sample(wl, s).x)) - cf * (T - s); }

// ALL same-source causal roots at reception time T (every sign change of the
// residual over the retained window) — no grazing-only restriction, no min-delay
// gate: the near fold branch is booked, not dropped.
export function allSelfRoots(wl, T, { scan = 6000, minDelay = 1e-6 } = {}) {
  const roots = []; const t0 = wl[0].t;
  let prev = T, fPrev = residual(wl, T, prev);
  for (let k = 1; k <= scan; k++) {
    const s = T - ((T - t0) * k) / scan;
    const f = residual(wl, T, s);
    if (fPrev * f < 0) {
      let lo = s, hi = prev, fLo = f;
      for (let b = 0; b < 70; b++) { const m = 0.5 * (lo + hi); const fm = residual(wl, T, m); if (fLo * fm <= 0) hi = m; else { lo = m; fLo = fm; } }
      const r = 0.5 * (lo + hi);
      if (T - r > minDelay) roots.push(r);
    }
    prev = s; fPrev = f;
  }
  return roots;
}

// Chart-clean signed vector force row at reception time T: sum over ALL live
// branches of kappa * sigma * m / r^2 along the connecting ray (exact D_s, D_T;
// no floor, no softening); branches with chord below `cut` (the declared
// coincidence stratum) are excluded and counted.
export function vectorForceRow(wl, T, { cut = 0.005 } = {}) {
  const rec = sample(wl, T);
  const rOutHat = [rec.x[0], rec.x[1], 0]; const rn = norm(rOutHat);
  rOutHat[0] /= rn; rOutHat[1] /= rn;
  const speed = norm(rec.v); const tHat = [rec.v[0] / speed, rec.v[1] / speed, rec.v[2] / speed];
  let F = [0, 0, 0], branches = 0, cutExcluded = 0; const rows = [];
  for (const s of allSelfRoots(wl, T)) {
    const src = sample(wl, s);
    const d = sub(rec.x, src.x); const r = norm(d);
    if (r < cut) { cutExcluded++; continue; }
    const rh = [d[0] / r, d[1] / r, d[2] / r];
    const Ds = cf - dot(src.v, rh), Dt = cf - dot(rec.v, rh);
    const m = Dt / Ds;
    const w = (KAPPA * SIGMA_SELF * m) / (r * r);
    F = [F[0] + w * rh[0], F[1] + w * rh[1], F[2] + w * rh[2]];
    branches++;
    rows.push({ emission: s, delay: T - s, r, Ds, Dt, m });
  }
  return { T, beta: speed / cf, branches, cutExcluded,
    radial: dot(F, rOutHat), tangential: dot(F, tHat), rows };
}

function hingeTime(wl) {
  for (let k = 1; k < wl.length; k++) {
    const p = norm(wl[k - 1].v), q = norm(wl[k].v);
    if (p < cf && q >= cf) { const u = (cf - p) / (q - p); return wl[k - 1].t + u * (wl[k].t - wl[k - 1].t); }
  }
  return null;
}

// (A) Vector click impulse across the crossing: trapezoid of the signed vector
// force over [hinge + window/nstep, hinge + window].
export function vectorClickImpulse({ worldline, window = 0.07, nstep = 400, cut = 0.005 } = {}) {
  const wl = worldline || buildRampWorldline({});
  const Tc = hingeTime(wl);
  if (Tc == null) return { definable: false, reason: "no_field_speed_hinge" };
  let radial = 0, tangential = 0, prev = null, samples = 0; let birth = null;
  for (let k = 0; k <= nstep; k++) {
    const T = Tc + (window * (k === 0 ? 1 / nstep : k / nstep));
    const row = vectorForceRow(wl, T, { cut });
    if (row.branches === 0) { prev = null; continue; }
    if (!birth) birth = row;
    samples++;
    if (prev) {
      const dt = row.T - prev.T;
      radial += 0.5 * (row.radial + prev.radial) * dt;
      tangential += 0.5 * (row.tangential + prev.tangential) * dt;
    }
    prev = row;
  }
  return { definable: samples >= 2, crossingTime: Tc, window, nstep, cut,
    impulseRadial: radial, impulseTangential: tangential,
    radialSign: radial < 0 ? "inward" : radial > 0 ? "outward" : "null",
    tangentialSign: tangential < 0 ? "absorptive" : tangential > 0 ? "ejective" : "null",
    birth: birth ? { T: birth.T, branches: birth.branches, rows: birth.rows } : null };
}

// Witnesses (Section 3.1 contract shape): nstep convergence, cut sweep (sign must
// hold; magnitude is coincidence-stratum-sensitive by derivation), and the chart
// path's independence from (softening, floor, min-delay) — which it never reads.
export function clickImpulseWitnesses({ worldline, window = 0.07, cut = 0.005 } = {}) {
  const wl = worldline || buildRampWorldline({});
  const conv = [100, 200, 400, 800].map((nstep) => {
    const r = vectorClickImpulse({ worldline: wl, window, nstep, cut });
    return { nstep, impulseRadial: r.impulseRadial, impulseTangential: r.impulseTangential };
  });
  const c1 = conv[conv.length - 1], c0 = conv[conv.length - 2];
  const cuts = [0.02, 0.01, 0.005, 0.0025].map((c) => {
    const r = vectorClickImpulse({ worldline: wl, window, nstep: 400, cut: c });
    return { cut: c, impulseRadial: r.impulseRadial, impulseTangential: r.impulseTangential,
      radialSign: r.radialSign, tangentialSign: r.tangentialSign };
  });
  return {
    convergence: { rows: conv,
      relDeltaTangential: Math.abs((c1.impulseTangential - c0.impulseTangential) / c1.impulseTangential),
      relDeltaRadial: Math.abs((c1.impulseRadial - c0.impulseRadial) / c1.impulseRadial) },
    cutSweep: { rows: cuts,
      radialSignStable: new Set(cuts.map((r) => r.radialSign)).size === 1,
      tangentialSignStable: new Set(cuts.map((r) => r.tangentialSign)).size === 1 },
    regularizationNote: "chart_path_reads_no_softening_no_floor_no_min_delay_by_construction",
  };
}

// (B) Sustained supra-field channel map: worldlines held at beta through the sample
// time with prescribed betaDot; the persistent root's signed vector force.
export function sustainedChannelMap({ betas = [1.02, 1.05, 1.083, 1.15], betaDots = [-0.1, -0.02, 0, 0.02, 0.1, 0.4], rho = 1, cut = 0.005 } = {}) {
  const rows = [];
  for (const beta of betas) for (const betaDot of betaDots) {
    // build so the sample point sits at the requested beta; the retained lead must
    // exceed the steady-root delay 2*rho*x1/(beta*cf), x1 = sqrt(6(1-1/beta)) ~ 1.5 at beta=1.15
    const lead = 2.5;
    const beta0 = beta - betaDot * lead;
    const wl = buildRampWorldline({ rho, beta0, betaDot, dt: 2e-4, duration: lead + 0.2 });
    const row = vectorForceRow(wl, lead, { cut });
    rows.push({ beta, betaDot, branches: row.branches, cutExcluded: row.cutExcluded,
      radial: row.radial, tangential: row.tangential,
      m: row.rows.length ? row.rows[row.rows.length - 1].m : null,
      delay: row.rows.length ? row.rows[row.rows.length - 1].delay : null });
  }
  return rows;
}

export function diagnosticReport() {
  return { schema: SCHEMA, specPacketRef: SPEC_PACKET_REF,
    click: vectorClickImpulse({}),
    sustainedSmoke: sustainedChannelMap({ betas: [1.05], betaDots: [0, 0.4] }),
    ...FAIL_CLOSED };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) {
  process.stdout.write(JSON.stringify(diagnosticReport(), null, process.argv.includes("--pretty") ? 2 : 0) + "\n");
}
