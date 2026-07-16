// Reduced self-consistent chatter integrator (queue item 24; spec Section 33).
//
// The Section 32 valve map is quasi-static (prescribed constant-betaDot histories).
// This instrument closes the loop: ONE planar site with a TRUE retained history,
// integrating its own dynamics under
//   (i)  a modeled partner channel: certified tangential pump a_tan = kappa*c1*beta/r^2
//        (c1 = 2.881) plus a partner radial support fraction s of the local
//        centripetal need, a_rad = -s * beta^2 * cf^2 / r  (s = 0.76 is the native
//        middle-layer support ratio at the fitted coupling; s is a parameter);
//   (ii) the EXACT same-source channel: all causal self-roots on the actual stored
//        worldline, signed m = D_T/D_s booking, kernel kappa*sigma*m/rc^2 along the
//        connecting ray, with the declared coincidence stratum d0 as the ONLY
//        regulator (roots with chord < d0 are excluded — the site's own emission
//        stratum, Section 12 policy).
// Questions it answers at reduced level: does the rail-straddling limit cycle exist
// (the clicker), what are its cadence, click recurrence, and beta excursion, and
// does the net radial budget hold radius (confinement) at partner support s < 1?
//
// Reduced-model caveats: single site (no partner interference in the self rows),
// planar, modeled partner forces, unit mass, schematic kappa. Reference integrator,
// not the native solver. NOT evidence; fail-closed.

import { fileURLToPath } from "node:url";

export const SCHEMA = "spindle_rail_chatter_limit_cycle_integrator.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-archive/braid-ideal/fold-crossing-chart-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_reduced_reference_integrator_not_native_solver_not_accepted_evidence",
});

const cf = 1;

export function integrateChatter({
  kappa = 0.315, c1 = 2.881, support = 0.76, d0 = 0.01,
  beta0 = 0.95, r0 = 1, dt = 5e-4, duration = 30, lead = 3,
  historyStride = 1, // store every sample (stride kept for future thinning)
} = {}) {
  // --- seed history: steady circle at (r0, beta0) for `lead` time units ---
  const H = { t: [], x: [], y: [], vx: [], vy: [] };
  const w0 = (beta0 * cf) / r0;
  const nLead = Math.round(lead / dt);
  for (let k = 0; k <= nLead; k++) {
    const t = -lead + k * dt, a = w0 * t;
    H.t.push(t); H.x.push(r0 * Math.cos(a)); H.y.push(r0 * Math.sin(a));
    H.vx.push(-beta0 * cf * Math.sin(a)); H.vy.push(beta0 * cf * Math.cos(a));
  }
  let x = H.x[H.x.length - 1], y = H.y[H.y.length - 1];
  let vx = H.vx[H.vx.length - 1], vy = H.vy[H.vy.length - 1];

  // --- exact self-channel force from the stored history ---
  function selfForce(T, X, Y) {
    // residual over stored samples; bracket sign changes, bisect on index-interpolated record
    const n = H.t.length;
    const g = (idx) => {
      const dx = X - H.x[idx], dy = Y - H.y[idx];
      return Math.hypot(dx, dy) - cf * (T - H.t[idx]);
    };
    let Fx = 0, Fy = 0, roots = 0, minChord = Infinity;
    // strided backward scan (stride 4) with full-resolution bracket confirmation;
    // near-birth root pairs are separated by >= the stratum delay ~ d0/cf = 20 samples
    // at dt = 5e-4, so stride 4 cannot skip a pair.
    const stride = 4;
    let prev = n - 1, gPrev = g(prev);
    const maxLookback = Math.min(n - 1, Math.round(4 / dt)); // 4 time units of memory
    for (let back = 1 + stride; back <= maxLookback; back += stride) {
      const idxC = n - back, giC = g(idxC);
      if (gPrev * giC >= 0) { prev = idxC; gPrev = giC; continue; }
      // refine the bracket at full sample resolution
      let idx = prev - 1, gi = g(idx);
      while (gPrev * gi >= 0 && idx > idxC) { prev = idx; gPrev = gi; idx--; gi = g(idx); }
      {
        // refine linearly between idx and prev (samples are dt apart; linear is enough at dt<=5e-4)
        const u = gi / (gi - gPrev); // fraction from idx toward prev
        const te = H.t[idx] + u * (H.t[prev] - H.t[idx]);
        const sx = H.x[idx] + u * (H.x[prev] - H.x[idx]);
        const sy = H.y[idx] + u * (H.y[prev] - H.y[idx]);
        const svx = H.vx[idx] + u * (H.vx[prev] - H.vx[idx]);
        const svy = H.vy[idx] + u * (H.vy[prev] - H.vy[idx]);
        const dx = X - sx, dy = Y - sy;
        const rc = Math.hypot(dx, dy);
        if (rc >= d0 && rc > 1e-12) {
          const rhx = dx / rc, rhy = dy / rc;
          const Ds = cf - (svx * rhx + svy * rhy);
          const Dt = cf - (vx * rhx + vy * rhy);
          const m = Dt / Ds;
          const wgt = (kappa * m) / (rc * rc); // sigma_self = +1
          Fx += wgt * rhx; Fy += wgt * rhy; roots++;
        }
        if (rc < minChord) minChord = rc;
      }
      prev = idxC; gPrev = giC;
    }
    return { Fx, Fy, roots, minChord };
  }

  // --- integrate (semi-implicit Euler; dt-halving witness reported separately) ---
  const nStep = Math.round(duration / dt);
  const rec = { t: [], beta: [], r: [], roots: [], clicks: 0, crossUp: 0 };
  let prevRoots = 0, prevBeta = beta0;
  const sampleEvery = Math.max(1, Math.round(0.01 / dt));
  for (let k = 0; k < nStep; k++) {
    const T = k * dt;
    const r = Math.hypot(x, y);
    const beta = Math.hypot(vx, vy) / cf;
    const rhx = x / r, rhy = y / r;
    const sp = Math.hypot(vx, vy), thx = vx / sp, thy = vy / sp;
    // modeled partner channel
    const aTan = (kappa * c1 * beta) / (r * r);
    const aRad = (-support * beta * beta * cf * cf) / r;
    // exact self channel
    const sf = selfForce(T, x, y);
    const ax = aTan * thx + aRad * rhx + sf.Fx;
    const ay = aTan * thy + aRad * rhy + sf.Fy;
    vx += ax * dt; vy += ay * dt;
    x += vx * dt; y += vy * dt;
    H.t.push(T + dt); H.x.push(x); H.y.push(y); H.vx.push(vx); H.vy.push(vy);
    if (sf.roots > prevRoots) rec.clicks += sf.roots - prevRoots;
    if (prevBeta < 1 && beta >= 1) rec.crossUp++;
    prevRoots = sf.roots; prevBeta = beta;
    if (k % sampleEvery === 0) {
      rec.t.push(T); rec.beta.push(beta); rec.r.push(Math.hypot(x, y)); rec.roots.push(sf.roots);
    }
  }
  // --- limit-cycle statistics over the last third ---
  const i0 = Math.floor(rec.t.length * (2 / 3));
  const tail = (arr) => arr.slice(i0);
  const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length;
  const betaTail = tail(rec.beta), rTail = tail(rec.r);
  const rotations = ((mean(betaTail) * cf) / mean(rTail)) * (rec.t[rec.t.length - 1] - rec.t[i0]) / (2 * Math.PI);
  return {
    params: { kappa, c1, support, d0, beta0, r0, dt, duration },
    betaMean: mean(betaTail), betaMin: Math.min(...betaTail), betaMax: Math.max(...betaTail),
    rStart: rec.r[0], rMeanTail: mean(rTail), rMin: Math.min(...rec.r), rMax: Math.max(...rec.r),
    rDriftPerRotation: (rTail[rTail.length - 1] - rTail[0]) / Math.max(rotations, 1e-9),
    crossUpTotal: rec.crossUp, clicksTotal: rec.clicks,
    crossUpPerRotationTail: null, // filled by caller-level analysis when needed
    tailRotations: rotations,
    series: { t: rec.t, beta: rec.beta, r: rec.r, roots: rec.roots },
  };
}

export function diagnosticReport() {
  const run = integrateChatter({ duration: 8 });
  const { series, ...summary } = run;
  return { schema: SCHEMA, specPacketRef: SPEC_PACKET_REF, smoke: summary, ...FAIL_CLOSED };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) {
  process.stdout.write(JSON.stringify(diagnosticReport(), null, process.argv.includes("--pretty") ? 2 : 0) + "\n");
}

// ---------------------------------------------------------------------------
// Second pass, step 2a: EVENT-LOCAL fine study (spec Section 34).
//
// The first-pass dt failure localizes entirely inside the click window, and the
// prescribed-window chart impulse over-books because the real event is
// SELF-LIMITING: the site absorbs only enough momentum to knock itself back off
// the rail (escapement reflection). This routine integrates ONLY the event
// neighborhood at fine dt with the full pointwise self-force (short lookback —
// click-root delays are below ~0.2), converging the event in dt, and measures
// the event map: absorbed tangential momentum, inward radial kick, effective
// restitution, and their dependence on the entry radial velocity vr0 (the
// epicyclic lever: does a breathing entry re-angle the ray toward radial?).
// ---------------------------------------------------------------------------
export function clickEventStudy({
  kappa = 0.315, c1 = 2.881, support = 0.76, d0 = 0.01,
  betaIn = 0.97, vr0 = 0, r0 = 1, dtFine = 2e-5, lead = 0.6, tMax = 0.6,
} = {}) {
  const H = { t: [], x: [], y: [], vx: [], vy: [] };
  const w0 = (betaIn * cf) / r0;
  const nLead = Math.round(lead / dtFine);
  for (let k = 0; k <= nLead; k++) {
    const t = -lead + k * dtFine, a = w0 * t;
    H.t.push(t); H.x.push(r0 * Math.cos(a)); H.y.push(r0 * Math.sin(a));
    H.vx.push(-betaIn * cf * Math.sin(a)); H.vy.push(betaIn * cf * Math.cos(a));
  }
  let x = r0, y = 0, vx = vr0, vy = betaIn * cf; // radial entry velocity added at t=0
  function selfForce(T, X, Y, VX, VY) {
    const n = H.t.length;
    const g = (i) => Math.hypot(X - H.x[i], Y - H.y[i]) - cf * (T - H.t[i]);
    let Fx = 0, Fy = 0, roots = 0, minChord = Infinity;
    const maxBack = Math.min(n - 1, Math.round(0.45 / dtFine));
    let prev = n - 1, gP = g(prev);
    for (let back = 5; back <= maxBack; back += 4) {
      const i = n - back, gi = g(i);
      if (gP * gi < 0) {
        let j = prev - 1, gj = g(j);
        while (gP * gj >= 0 && j > i) { prev = j; gP = gj; j--; gj = g(j); }
        const u = gj / (gj - gP);
        const te = H.t[j] + u * (H.t[prev] - H.t[j]);
        const sx = H.x[j] + u * (H.x[prev] - H.x[j]), sy = H.y[j] + u * (H.y[prev] - H.y[j]);
        const svx = H.vx[j] + u * (H.vx[prev] - H.vx[j]), svy = H.vy[j] + u * (H.vy[prev] - H.vy[j]);
        const dx = X - sx, dy = Y - sy, rc = Math.hypot(dx, dy);
        if (rc >= d0 && rc > 1e-12) {
          const rhx = dx / rc, rhy = dy / rc;
          const Ds = cf - (svx * rhx + svy * rhy), Dt = cf - (VX * rhx + VY * rhy);
          const wgt = (kappa * (Dt / Ds)) / (rc * rc);
          Fx += wgt * rhx; Fy += wgt * rhy; roots++;
        }
        if (rc < minChord) minChord = rc;
      }
      prev = n - back; gP = g(prev);
    }
    return { Fx, Fy, roots, minChord };
  }
  const nStep = Math.round(tMax / dtFine);
  let clicked = false, betaPeak = 0, rootsSeen = 0;
  let pTanAbsorbed = 0, pRadKick = 0; // self-channel impulse components only
  for (let k = 0; k < nStep; k++) {
    const T = k * dtFine;
    const r = Math.hypot(x, y), beta = Math.hypot(vx, vy) / cf;
    betaPeak = Math.max(betaPeak, beta);
    const rhx = x / r, rhy = y / r;
    const sp = Math.hypot(vx, vy), thx = vx / sp, thy = vy / sp;
    const aTan = (kappa * c1 * beta) / (r * r);
    const aRad = (-support * beta * beta * cf * cf) / r;
    const sf = selfForce(T, x, y, vx, vy);
    if (sf.roots > 0) { clicked = true; rootsSeen = Math.max(rootsSeen, sf.roots); }
    pTanAbsorbed += (sf.Fx * thx + sf.Fy * thy) * dtFine;
    pRadKick += (sf.Fx * rhx + sf.Fy * rhy) * dtFine;
    const ax = aTan * thx + aRad * rhx + sf.Fx;
    const ay = aTan * thy + aRad * rhy + sf.Fy;
    vx += ax * dtFine; vy += ay * dtFine;
    x += vx * dtFine; y += vy * dtFine;
    H.t.push(T + dtFine); H.x.push(x); H.y.push(y); H.vx.push(vx); H.vy.push(vy);
    // stop once the event has completed: clicked, now sub-rail, and self-channel quiet
    if (clicked && beta < 0.985 && sf.roots === 0 && T > 0.05) break;
  }
  const betaOut = Math.hypot(vx, vy) / cf;
  return {
    params: { kappa, c1, support, d0, betaIn, vr0, dtFine },
    clicked, rootsSeen, betaPeak, betaOut,
    overshoot: betaPeak - 1, reboundDepth: 1 - betaOut,
    pTanAbsorbed, pRadKick,
    radialPerTangential: pRadKick / (pTanAbsorbed || 1e-12),
    rOut: Math.hypot(x, y), vrOut: (x * vx + y * vy) / Math.hypot(x, y),
  };
}
