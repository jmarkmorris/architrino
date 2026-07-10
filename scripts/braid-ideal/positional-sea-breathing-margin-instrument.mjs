// Positional-sea (breathing-shell) margin instrument (Section 48 named route (b)).
//
// The orientational-dipole sea family is closed on both axes (Sections 47-48 by
// title): orientation waves cannot push on the equator — the middle's sea radial
// row is negative in every (gamma, a, alpha_M, lambda) cell. Section 48's framing
// of the surviving sea channel: the sea sites' POSITIONS respond (breathing/phonon
// modes) — a monopole-order density response. An in-phase radially-breathing site
// modulates the source distance, hence the 1/r^2 supply, at the receiver's own
// cadence: PARAMETRIC RADIAL FEED, coupling to the equatorial ring the way
// orientation cannot.
//
// Declared site-motion model (nothing fit; every knob named):
//   - Sites: the 6-direction shell at spacing R_sea (the stack's convention since
//     Section 38; FCC-12 reported as the count-scaled x2 row, the same scaling the
//     exact-delay fixed-point solve used).
//   - Orientational channel RETAINED: each site carries the saturated permanent
//     dipole p0 (geometry-matched to the braid's own axial polarity dipole) with
//     first-order direction relaxation d p_hat/dt = gamma_o (E_hat - p_hat)_perp
//     toward the exactly retarded braid field, settled before measurement — the
//     Sections 43-47 tangential-feed model, unchanged including its nearest-sample
//     emission-time lookup convention.
//   - Positional channel (new): each site's radial displacement s_j along its
//     shell direction obeys first-order relaxation toward a saturable field-set
//     target, d s_j/dt = gamma_b (s_tgt,j(t) - s_j), with
//     s_tgt,j(t) = eps * R_sea * W_j(t),  W_j = the BAND-LIMITED (harmonics
//     1..H of the braid cadence, H=4 declared), cycle-mean-subtracted radial
//     component of the exactly retarded softened braid field at the site,
//     normalized to unit cycle max — the braid's own cadence signal at the
//     site, the declared monopole-order drive. Band-limiting is declared
//     physics: a breathing/phonon mode responds at the braid's cadence
//     harmonics ("shell radius modulating at the braid cadence", the Section 48
//     framing), not at caustic sharpness — the field-speed rail layer sweeps a
//     caustic fan across external points, and an unfiltered response to that
//     spike would require superluminal site slew (probed: it voids the
//     return-leg root solve and is Nt-divergent). A sub-field slew guard
//     (max |ds/dt| reported, flagged against c_f) enforces the validity of
//     the moving-source booking. Mean subtraction is declared: a breathing/phonon
//     mode is an AC response; the drive's DC part is a static spacing shift,
//     which is the spacing sweep's question (already owned by the exact-delay
//     band solve), not this channel's. (A dipole-gradient drive grad(p_hat . E)
//     was probed and rejected as the declared drive: it inherits the
//     orientational trajectory's dt non-convergence through p_hat and is not
//     witness-stable; the field-waveform drive is dt-robust and carries the
//     same harmonic content.) eps is the DECLARED fractional breathing
//     amplitude (the
//     saturation cap, the positional analog of p0); the waveform and phase are
//     computed from the drive through the declared relaxation, not prescribed.
//     eps < 0 is the declared ANTI-PHASE response cell (the above-resonance,
//     inertia-dominated phase of a driven breathing mode); breathMode "fast" is
//     the zero-lag limit, the positional analog of the orientational fast limit.
//     A prescribed-phase scan (phaseScan) bounds the BEST-PHASE middle feed per
//     unit amplitude — the model-independent ceiling for this channel.
//   - EXACT per-pair causal delays from the start (the Row 3 binding lesson; the
//     uniform-loop-delay idealization is not implemented in this instrument at
//     all): every braid source leg is exactly retarded inside the site field
//     solve, and every return leg reads the site's orientation and DISPLACED
//     position at the true emission time t_e solving
//     t_e = t - |x_i(t) - X_j(t_e)|/c_f (iterated). The moving site's
//     source-normal branch factor c_f/D_s is applied on the return leg. The
//     positional channel uses periodic linear interpolation in time (phase
//     matters for a parametric feed).
//   - SETTLED grade: the Euler steps of both first-order channels are held
//     inside gamma*dt <= 0.8 (Nt auto-raised; the Section 47 instrument
//     correction). Grade caveat, measured on this stack: the ORIENTATIONAL
//     radial rows are not dt-converged at the published Nt=16 grade (their radM
//     sign is Nt-robust; the magnitude drifts — the field direction at a sea
//     site swings through near-zero-field moments that finer sampling resolves
//     differently). The claim-bearing positional quantity is therefore the
//     DELTA against an eps=0 baseline measured with the SAME orientation
//     content in the same call, and the claim-bearing orientMode is
//     "frozenMean" (each site's dipole frozen at its settled cycle-mean
//     direction), which removes the orientation wiggle from the delta entirely
//     and is dt-witness-stable. orientMode "relax" (full time-varying settled
//     orientation) is reported alongside as the coupled-channel diagnostic, at
//     documented lower grade.
//
// Decisive first readout (Section 48 next closure goal): the MIDDLE's sea radial
// row. A positive dressed M row at any declared cell re-opens Row 5 design;
// negative in every declared cell is a third scoped negative on the sea program
// at this model's scope. Also reported: eps_req, the declared amplitude at which
// the dressed middle support would reach 1 (linear-in-eps extrapolation from the
// measured slope; linearity is a tested witness).
//
// NOT evidence; estimate grade; names no retained branch; fail-closed.

import { fileURLToPath } from "node:url";
import { buildBraid, residuals } from "./spindle-braid-screw-drift-evaluator.mjs";
import { braidAxialDipole, SUPPORT_V1 } from "./sh0-sea-orientation-saturation-margin-estimate.mjs";

export const SCHEMA = "positional_sea_breathing_margin_instrument.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-ideal/fold-crossing-chart-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_breathing_shell_estimate_not_native_solver_not_accepted_evidence",
});

const cf = 1;
export { SUPPORT_V1 };

const unit = (v) => { const n = Math.hypot(v[0], v[1], v[2]) || 1e-300; return [v[0] / n, v[1] / n, v[2] / n]; };
function sitePos(s, t, w) {
  const a = w * t + s.th, ca = Math.cos(s.alpha);
  return [s.sgn * s.R * ca * Math.cos(a), s.sgn * s.R * ca * Math.sin(a), s.sgn * s.R * Math.sin(s.alpha)];
}
function siteVel(s, t, w) {
  const a = w * t + s.th, v = s.sgn * s.R * Math.cos(s.alpha) * w;
  return [-v * Math.sin(a), v * Math.cos(a), 0];
}
function shellDirs() { return [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]; }

// Exactly retarded braid field at a static evaluation point X (each braid source
// leg solved per source). soft = 0 gives the parent instrument's bare c_f/D_s
// branch weight (retained for the orientation settle, the anchor); soft > 0
// gives the wake kernel's softened weight c_f*D_s/(D_s^2 + soft^2), needed for
// the positional drive because the field-speed rail layer sweeps a caustic fan
// across external points (bare 1/D_s spikes make cycle statistics Nt-fragile).
function braidFieldAt(X, braid, t, lookback, soft = 0) {
  const E = [0, 0, 0];
  for (const s of braid.sites) {
    let te = t - lookback;
    for (let it = 0; it < 40; it++) {
      const p = sitePos(s, te, braid.omega);
      const r = Math.hypot(X[0]-p[0], X[1]-p[1], X[2]-p[2]);
      te = t - r / cf;
    }
    const p = sitePos(s, te, braid.omega);
    const dx = [X[0]-p[0], X[1]-p[1], X[2]-p[2]];
    const r = Math.hypot(dx[0], dx[1], dx[2]);
    const rh = [dx[0]/r, dx[1]/r, dx[2]/r];
    const v = siteVel(s, te, braid.omega);
    const Ds = cf - (v[0]*rh[0] + v[1]*rh[1] + v[2]*rh[2]);
    const m = soft > 0 ? (cf * Ds) / (Ds * Ds + soft * soft) : cf / Ds;
    for (let c = 0; c < 3; c++) E[c] += (s.pol * m * dx[c]) / (r * r * r);
  }
  return E;
}
function dipoleField(p, rvec) {
  const r = Math.hypot(rvec[0], rvec[1], rvec[2]);
  const rh = [rvec[0]/r, rvec[1]/r, rvec[2]/r];
  const pr = p[0]*rh[0] + p[1]*rh[1] + p[2]*rh[2];
  return [ (3*pr*rh[0] - p[0]) / (r**3), (3*pr*rh[1] - p[1]) / (r**3), (3*pr*rh[2] - p[2]) / (r**3) ];
}

// Periodic linear interpolation on one stored settled cycle (positional channel).
function cyc(seq, frac) {
  const Nt = seq.length;
  const x = (((frac % 1) + 1) % 1) * Nt;
  const k0 = Math.floor(x) % Nt, k1 = (k0 + 1) % Nt, f = x - Math.floor(x);
  return seq[k0] + f * (seq[k1] - seq[k0]);
}

// Enforce the settled-grade guard on BOTH first-order channels: gamma*dt <= 0.8.
export function settledNt({ Nt = 32, gammaOrientOverOmega = 2, gammaBreathOverOmega = 2 } = {}) {
  const gMax = Math.max(gammaOrientOverOmega, gammaBreathOverOmega);
  const need = Math.ceil((2 * Math.PI * gMax) / 0.8);
  let n = Math.max(Nt, need);
  n = Math.ceil(n / 8) * 8;
  return { NtEff: n, gammaDtMax: (2 * Math.PI * gMax) / n };
}

// Prepare the shared environment at one spacing: settled orientation trajectory
// (stage 1) and the positional drive with its cycle normalization (stage 2).
// Everything downstream of a (geo, Rsea, gamma_o, Nt) declaration is cached here.
export function prepareEnvironment({
  geo = SUPPORT_V1, Rsea = 3.4, Nt = 32, soft = 0.02,
  gammaOrientOverOmega = 2, gammaBreathOverOmega = 2, settleCycles = 3,
} = {}) {
  const braid = buildBraid({ u: 0, cTrans: 1.0, geo });
  const w = braid.omega, period = 2 * Math.PI / w;
  const kap = residuals({ u: 0, cTrans: 1.0, geo }, { soft }).kappaStar;
  const { NtEff, gammaDtMax } = settledNt({ Nt, gammaOrientOverOmega, gammaBreathOverOmega });
  const dt = period / NtEff;
  const gO = gammaOrientOverOmega * w;
  const dirs = shellDirs();
  const X0 = dirs.map((v) => [v[0]*Rsea, v[1]*Rsea, v[2]*Rsea]);
  const settleSteps = settleCycles * NtEff;

  // Stage 1 — orientation settle at the nominal shell position (declared:
  // orientation dynamics computed at nominal radius; displacement is a
  // return-leg/geometry effect at this grade). Store the final settled cycle.
  const phSeq = X0.map((X) => {
    let ph = [0, 0, 1];
    const seq = [];
    for (let k = -settleSteps; k < NtEff; k++) {
      const eh = unit(braidFieldAt(X, braid, k * dt, Rsea + 1));
      ph = unit([ph[0] + gO * dt * (eh[0] - ph[0]), ph[1] + gO * dt * (eh[1] - ph[1]), ph[2] + gO * dt * (eh[2] - ph[2])]);
      if (k >= 0) seq.push(ph);
    }
    return seq;
  });

  // Frozen cycle-mean dipole directions (the claim-bearing orientMode for the
  // positional delta; the settled mean is the slow-limit saturated orientation).
  const phMean = phSeq.map((seq) => {
    const acc = [0, 0, 0];
    for (const p of seq) { acc[0] += p[0]; acc[1] += p[1]; acc[2] += p[2]; }
    return unit(acc);
  });

  // Stage 2 — positional drive over one cycle: the BAND-LIMITED (harmonics
  // 1..H of the cadence), cycle-mean-subtracted radial component of the exactly
  // retarded SOFTENED braid field at the site (AC-only by declaration — the DC
  // part is a static spacing shift, not a breathing response; the band limit is
  // the declared mode physics and removes the rail layer's caustic-spike
  // content, whose unfiltered response would be superluminal and Nt-divergent).
  // Normalization: unit cycle max of the band-limited waveform (smooth, stable).
  const H = 4;
  const FrSeq = X0.map((X, q) => {
    const raw = [];
    for (let k = 0; k < NtEff; k++) {
      const E = braidFieldAt(X, braid, k * dt, Rsea + 1, soft);
      raw.push(E[0]*dirs[q][0] + E[1]*dirs[q][1] + E[2]*dirs[q][2]);
    }
    const mean = raw.reduce((a, b) => a + b, 0) / NtEff;
    const ac = raw.map((v) => v - mean);
    // Fourier projection onto harmonics 1..H
    const seq = Array(NtEff).fill(0);
    for (let hh = 1; hh <= H; hh++) {
      let ca = 0, sa = 0;
      for (let k = 0; k < NtEff; k++) {
        const th = (2 * Math.PI * hh * k) / NtEff;
        ca += ac[k] * Math.cos(th); sa += ac[k] * Math.sin(th);
      }
      ca *= 2 / NtEff; sa *= 2 / NtEff;
      for (let k = 0; k < NtEff; k++) {
        const th = (2 * Math.PI * hh * k) / NtEff;
        seq[k] += ca * Math.cos(th) + sa * Math.sin(th);
      }
    }
    return seq;
  });
  const FrRef = FrSeq.map((seq) => Math.max(1e-12, ...seq.map(Math.abs)));
  // sub-field slew guard per unit eps: max |dW/dt| * R_sea (multiply by eps for a cell)
  const slewPerEps = FrSeq.map((seq, q) => {
    let mx = 0;
    for (let k = 0; k < NtEff; k++) mx = Math.max(mx, Math.abs(seq[(k + 1) % NtEff] - seq[k]) / dt / FrRef[q]);
    return mx * Rsea;
  });

  return { geo, Rsea, Nt: NtEff, NtEff, gammaDtMax, soft, dt, period, braid, w, kap, H,
    p0Geo: braidAxialDipole(geo),
    gammaOrientOverOmega, gammaBreathOverOmega, dirs, X0, settleSteps, phSeq, phMean, FrSeq, FrRef, slewPerEps };
}

// Stage 3 — breathing settle against the periodic drive; returns the settled cycle.
function settleBreathing(env, { eps, breathMode }) {
  const { NtEff, dt, w, Rsea, FrSeq, FrRef, settleSteps } = env;
  const gB = env.gammaBreathOverOmega * w;
  return env.X0.map((_, q) => {
    if (breathMode === "off" || eps === 0) return Array(NtEff).fill(0);
    const tgt = (k) => eps * Rsea * Math.max(-1, Math.min(1, FrSeq[q][((k % NtEff) + NtEff) % NtEff] / FrRef[q]));
    if (breathMode === "fast") return Array.from({ length: NtEff }, (_, k) => tgt(k));
    let s = 0;
    const seq = [];
    for (let k = -settleSteps; k < NtEff; k++) {
      s += gB * dt * (tgt(k) - s);
      if (k >= 0) seq.push(s);
    }
    return seq;
  });
}

// Stage 4 — measurement on the braid receivers at exact per-pair delays: the
// return-leg emission time solves t_e = t - |x_i(t) - X_j(t_e)|/c_f with the
// site DISPLACED at its own emission time; orientation read at t_e
// (nearest-sample, the retained parent convention); displacement and its rate
// interpolated; moving-site source branch factor c_f/D_s applied. Rows are the
// stack's booking: radial support supply as a fraction of the kinematic need
// (kap*inward/(w^2 rho)) and the tangential rows, both PER UNIT p0.
//
// returnModel (Section 49 operator route (a), the quadrupole/near-field cell):
//   "dipole"     — the point-dipole return field, the Sections 38-49 convention.
//   "finitePair" — the saturated dipole realized as its physical antipodal
//     polarity pair: unit-polarity monopoles at X_j +- (d/2) p_hat_j with
//     d = dPair (declared; default the geometry-matched p0, so the pair's
//     dipole moment equals the point model's). Each endpoint gets its OWN
//     exact emission-time solve and its own receiver-normal booking — this is
//     the full multipole resummation of the pair (quadrupole, octupole, ...,
//     plus true near-field), not a truncation. Rows stay per unit p0 via the
//     1/dPair normalization; dPair -> 0 reproduces the dipole rows (tested).
//     At d = p0 ~ 2.2 against shell radii ~3-4 the pair endpoints are NOT a
//     small perturbation — which is exactly the route's question.
function measureRows(env, sSeq, orientMode = "frozenMean", returnModel = "dipole", dPair = null) {
  const { NtEff, dt, w, kap, braid, dirs, X0, Rsea, period } = env;
  const dp = dPair ?? env.p0Geo;
  const acc = { I: 0, M: 0, O: 0 }, accTan = { I: 0, M: 0, O: 0 };
  for (let k = 0; k < NtEff; k++) {
    const t = k * dt;
    for (const i of [0, 2, 4]) {
      const s = braid.sites[i];
      const xj = sitePos(s, t, w), vj = siteVel(s, t, w);
      const rhoCyl = s.R * Math.cos(s.alpha);
      const rx = Math.cos(w * t + s.th), ry = Math.sin(w * t + s.th);
      const tx = -Math.sin(w * t + s.th), ty = Math.cos(w * t + s.th);
      let inward = 0, tangential = 0;
      for (let q = 0; q < dirs.length; q++) {
        // orientation: frozen settled cycle-mean (claim-bearing) or the parent
        // instrument's nearest-sample time-varying convention (diagnostic)
        const phAt = (te) => orientMode === "frozenMean"
          ? env.phMean[q]
          : env.phSeq[q][((Math.round((te / period) * NtEff) % NtEff) + NtEff) % NtEff];
        // source elements: the point dipole, or the pair's two monopole endpoints
        const elements = returnModel === "finitePair" ? [+1, -1] : [0];
        for (const pm of elements) {
          let te = t - Math.hypot(xj[0]-X0[q][0], xj[1]-X0[q][1], xj[2]-X0[q][2]) / cf;
          let Xs = X0[q];
          for (let it = 0; it < 8; it++) {
            const sj = cyc(sSeq[q], te / period);
            const ph0 = phAt(te);
            Xs = [
              (Rsea + sj) * dirs[q][0] + pm * (dp / 2) * ph0[0],
              (Rsea + sj) * dirs[q][1] + pm * (dp / 2) * ph0[1],
              (Rsea + sj) * dirs[q][2] + pm * (dp / 2) * ph0[2],
            ];
            const r = Math.hypot(xj[0]-Xs[0], xj[1]-Xs[1], xj[2]-Xs[2]);
            te = t - r / cf;
          }
          const dxj = [xj[0]-Xs[0], xj[1]-Xs[1], xj[2]-Xs[2]];
          const rj = Math.hypot(dxj[0], dxj[1], dxj[2]);
          const rhj = [dxj[0]/rj, dxj[1]/rj, dxj[2]/rj];
          const sdot = (cyc(sSeq[q], te / period + 0.5 / NtEff) - cyc(sSeq[q], te / period - 0.5 / NtEff)) / dt;
          const vs = [sdot * dirs[q][0], sdot * dirs[q][1], sdot * dirs[q][2]];
          const Ds = cf - (vs[0]*rhj[0] + vs[1]*rhj[1] + vs[2]*rhj[2]);
          const msrc = cf / Ds;
          const Dt = cf - (vj[0]*rhj[0] + vj[1]*rhj[1] + vj[2]*rhj[2]);
          // monopole endpoint field carries 1/dPair so rows stay per unit p0
          const E = pm === 0
            ? dipoleField(phAt(te), dxj)
            : [pm * dxj[0] / (dp * rj ** 3), pm * dxj[1] / (dp * rj ** 3), pm * dxj[2] / (dp * rj ** 3)];
          inward += -(s.pol) * (Dt / cf) * msrc * (E[0]*rx + E[1]*ry);
          tangential += (s.pol) * (Dt / cf) * msrc * (E[0]*tx + E[1]*ty);
        }
      }
      acc[s.name] += (kap * inward) / (w * w * rhoCyl) / NtEff;
      accTan[s.name] += (kap * tangential) / NtEff;
    }
  }
  return { rad: acc, tan: accTan };
}

// One declared cell: the eps=0 baseline and the dressed rows share the settled
// orientation trajectory (same env), so the positional DELTA is differenced at
// fixed orientational content — the claim-bearing quantity.
export function breathingCell(env, { eps = 0.05, breathMode = "relax", orientMode = "frozenMean", returnModel = "dipole", dPair = null } = {}) {
  const sSeq = settleBreathing(env, { eps, breathMode });
  const base = measureRows(env, settleBreathing(env, { eps: 0, breathMode: "off" }), orientMode, returnModel, dPair);
  const dressed = measureRows(env, sSeq, orientMode, returnModel, dPair);
  const sAmp = sSeq.map((seq) => (Math.max(...seq) - Math.min(...seq)) / 2);
  const delta = {};
  for (const L of ["I", "M", "O"]) delta[L] = dressed.rad[L] - base.rad[L];
  const deltaTan = {};
  for (const L of ["I", "M", "O"]) deltaTan[L] = dressed.tan[L] - base.tan[L];
  return {
    Rsea: env.Rsea, eps, breathMode, orientMode, returnModel, NtEff: env.NtEff, gammaDtMax: env.gammaDtMax,
    gammaOrientOverOmega: env.gammaOrientOverOmega, gammaBreathOverOmega: env.gammaBreathOverOmega,
    kappaStar: env.kap,
    baseRadPerP0: base.rad, baseTanPerP0: base.tan,
    dressedRadPerP0: dressed.rad, dressedTanPerP0: dressed.tan,
    positionalDeltaRadPerP0: delta, positionalDeltaTanPerP0: deltaTan,
    breathingAmplitude: sAmp,
    breathVMax: Math.abs(eps) * Math.max(...env.slewPerEps),
    subFieldSlewOk: Math.abs(eps) * Math.max(...env.slewPerEps) < cf,
  };
}

// Prescribed-phase scan: the model-independent CEILING for the positional
// channel at one spacing. The breathing waveform is the normalized drive
// waveform time-shifted by a global phase phi (relative site phasing and
// waveform shape preserved), at declared amplitude |eps|. Reports the middle's
// positional delta over the phase grid and its maximum — if even the best
// phase cannot feed the middle at plausible amplitude, no response dynamics
// within this site-motion family can.
export function phaseScanM(env, { eps = 0.1, Nphi = 16, orientMode = "frozenMean", returnModel = "dipole", dPair = null } = {}) {
  const { NtEff } = env;
  const base = measureRows(env, settleBreathing(env, { eps: 0, breathMode: "off" }), orientMode, returnModel, dPair);
  const rows = [];
  for (let p = 0; p < Nphi; p++) {
    const shift = (p / Nphi) * NtEff;
    const sSeq = env.X0.map((_, q) => {
      const tgt = (x) => {
        // periodic linear interpolation of the normalized drive at shifted index
        const Nt = NtEff;
        const xx = (((x % Nt) + Nt) % Nt);
        const k0 = Math.floor(xx) % Nt, k1 = (k0 + 1) % Nt, f = xx - Math.floor(xx);
        const w0 = env.FrSeq[q][k0] / env.FrRef[q], w1 = env.FrSeq[q][k1] / env.FrRef[q];
        return eps * env.Rsea * Math.max(-1, Math.min(1, w0 + f * (w1 - w0)));
      };
      return Array.from({ length: NtEff }, (_, k) => tgt(k + shift));
    });
    const dressed = measureRows(env, sSeq, orientMode, returnModel, dPair);
    rows.push({ phiDeg: (p / Nphi) * 360, deltaMPerP0: dressed.rad.M - base.rad.M,
      deltaIPerP0: dressed.rad.I - base.rad.I, deltaOPerP0: dressed.rad.O - base.rad.O });
  }
  let best = rows[0];
  for (const r of rows) if (r.deltaMPerP0 > best.deltaMPerP0) best = r;
  return { Rsea: env.Rsea, eps, Nphi, orientMode, returnModel, NtEff, baseRadPerP0: base.rad, rows, best };
}

// The declared cell map (the verdict object): spacings x breathing rates x
// signed eps (anti-phase cells included) x {relax, fast}. Composite booking per
// cell: the coupled sea's M row = the ORIENTATIONAL settled-relax baseline row
// (the Sections 47-48 quantity, which carries the retained tangential feed and
// the M hole) PLUS the frozen-frame positional delta (the claim-bearing
// breathing quantity). The two grades are combined explicitly and reported
// separately.
export function breathingMarginMap({
  geo = SUPPORT_V1,
  spacings = [3.0, 3.25, 3.4, 4.25],
  gammasBreath = [2, 5, 10],
  gammaOrientOverOmega = 2,
  epsList = [0.1, -0.1],
  Nt = 32,
  includeFast = true,
  orientMode = "frozenMean",
  bareSupport = { I: 0.9596, M: 0.8802, O: 0.9798 }, // support-candidate v1 packet rows
} = {}) {
  const p0 = braidAxialDipole(geo);
  const cells = [];
  for (const a of spacings) {
    for (const gB of gammasBreath) {
      const env = prepareEnvironment({ geo, Rsea: a, Nt, gammaOrientOverOmega, gammaBreathOverOmega: gB });
      const ob = breathingCell(env, { eps: 0, breathMode: "off", orientMode: "relax" });
      const orientBase = ob.baseRadPerP0, orientBaseTan = ob.baseTanPerP0;
      const modes = includeFast && gB === gammasBreath[gammasBreath.length - 1] ? ["relax", "fast"] : ["relax"];
      for (const mode of modes) for (const eps of epsList) {
        const c = breathingCell(env, { eps, breathMode: mode, orientMode });
        const composite = {};
        for (const L of ["I", "M", "O"]) composite[L] = (orientBase[L] + c.positionalDeltaRadPerP0[L]) * p0;
        const support = {};
        for (const L of ["I", "M", "O"]) support[L] = bareSupport[L] + composite[L];
        const minSupport = Math.min(support.I, support.M, support.O);
        cells.push({
          a, gammaBreathOverOmega: gB, breathMode: mode, eps, orientMode, NtEff: c.NtEff,
          radM_orient6: orientBase.M * p0,
          deltaM6: c.positionalDeltaRadPerP0.M * p0,
          radM6: composite.M, radM12: 2 * composite.M,
          dressedSupport6: support, minSupport6: minSupport,
          tanI6: orientBaseTan.I * p0,
          mRowPositive6: composite.M > 0,
          // the decisive flag for THIS channel: the breathing delta itself
          // rescues the middle (positive M row that the orientational baseline
          // alone did not have)
          positionalMRescue6: composite.M > 0 && orientBase.M * p0 <= 0,
          cellCloses6: minSupport >= 0.97,
          sAmpMax: Math.max(...c.breathingAmplitude),
          breathVMax: c.breathVMax, subFieldSlewOk: c.subFieldSlewOk,
        });
      }
    }
  }
  const anyRescue = cells.some((c) => c.positionalMRescue6);
  const anyCloses = cells.some((c) => c.cellCloses6);
  // Positive M rows with NO positional contribution occur out-of-band (a=4.25),
  // where the orientational allocation feeds M while starving I and O — the Row 3
  // native record's rejected allocation (min support collapses there), not a
  // breathing-channel finding.
  return { p0, gammaOrientOverOmega, epsList, orientMode, cells,
    anyPositionalMRescue: anyRescue, anyCellCloses: anyCloses,
    verdictHint: anyCloses ? "closing_cell_exists_row5_design_reopens"
      : anyRescue ? "positional_m_rescue_exists_but_no_closing_cell"
      : "no_positional_m_rescue_in_declared_cells" };
}

// The decisive first readout, packaged for one spacing: the middle's
// orientational baseline hole, the declared-dynamics deltas (relax/fast, both
// phases), the best-phase ceiling from the prescribed-phase scan, and eps_req —
// the declared amplitude at which (a) the sea's M row turns positive and
// (b) the dressed middle support reaches 1, by linear extrapolation from the
// best-phase slope (indicative only past the probed amplitude; linearity is a
// tested witness at small eps).
export function middleRowReadout({
  geo = SUPPORT_V1, Rsea = 3.4, gammaOrientOverOmega = 2, gammaBreathOverOmega = 2,
  eps = 0.1, Nt = 32, orientMode = "frozenMean", bareSupportM = 0.8802, Nphi = 16,
} = {}) {
  const p0 = braidAxialDipole(geo);
  const env = prepareEnvironment({ geo, Rsea, Nt, gammaOrientOverOmega, gammaBreathOverOmega });
  const cRelaxPlus = breathingCell(env, { eps, breathMode: "relax", orientMode });
  const cRelaxMinus = breathingCell(env, { eps: -eps, breathMode: "relax", orientMode });
  const cFastPlus = breathingCell(env, { eps, breathMode: "fast", orientMode });
  const cFastMinus = breathingCell(env, { eps: -eps, breathMode: "fast", orientMode });
  const scan = phaseScanM(env, { eps: Math.abs(eps), Nphi, orientMode });
  // the coupled sea's M hole: the ORIENTATIONAL (time-varying, settled relax)
  // M row, the Sections 47-48 quantity (negative; documented dt caveat)
  const cOrient = breathingCell(env, { eps: 0, breathMode: "off", orientMode: "relax" });
  const holeM6 = -(cOrient.baseRadPerP0.M * p0);
  const radM0Frozen = cRelaxPlus.baseRadPerP0.M * p0;
  const bestDelta = scan.best.deltaMPerP0 * p0;
  const slopeBest = bestDelta / Math.abs(eps);
  const epsSubfieldMax = cf / Math.max(...env.slewPerEps); // largest declared amplitude with sub-field slew
  const bestSubfieldDeltaM = slopeBest * epsSubfieldMax;   // the channel's ceiling at valid booking
  const supportDeficit6 = 1 - bareSupportM + holeM6;
  return {
    p0, Rsea, eps, gammaOrientOverOmega, gammaBreathOverOmega, NtEff: env.NtEff, orientMode,
    radM_orientOnly6_relax: -holeM6, radM_orientOnly6_frozenMean: radM0Frozen,
    deltaM: {
      relaxPlus: cRelaxPlus.positionalDeltaRadPerP0.M * p0,
      relaxMinus: cRelaxMinus.positionalDeltaRadPerP0.M * p0,
      fastPlus: cFastPlus.positionalDeltaRadPerP0.M * p0,
      fastMinus: cFastMinus.positionalDeltaRadPerP0.M * p0,
      bestPhase: bestDelta, bestPhiDeg: scan.best.phiDeg,
    },
    slopeBestPerEps: slopeBest,
    epsSubfieldMax, bestSubfieldDeltaM,
    epsReqSeaRowPositive6: slopeBest > 1e-12 ? holeM6 / slopeBest : null,
    epsReqSupportOne6: slopeBest > 1e-12 ? supportDeficit6 / slopeBest : null,
    shortfallFactorSeaRow: slopeBest > 1e-12 && bestSubfieldDeltaM > 0 ? holeM6 / bestSubfieldDeltaM : null,
    mRowPositiveReachableSubfield: bestSubfieldDeltaM > holeM6,
  };
}

// Near-field readout (Section 49 operator route (a), the last response-family
// cell): per spacing, the per-layer rows with the point-dipole return versus
// the finite-pair return at d = p0 — frozen orientation (claim grade: static
// endpoints, exact per-element delays, no arm motion) and settled-relax
// orientation (diagnostic grade: the endpoints swing with p_hat; the arm-slew
// figure (d/2)*max|dp_hat/dt| is reported as the honesty flag, since a swinging
// arm of a real assembly would be a super-field source at these rates and the
// booking is only kernel-grade there). Also the finite-pair breathing ceiling
// (phase scan) at the in-band spacing.
export function nearFieldReadout({
  geo = SUPPORT_V1, spacings = [3.0, 3.25, 3.4, 4.25], Nt = 32,
  gammaOrientOverOmega = 2, eps = 0.1, Nphi = 8,
} = {}) {
  const p0 = braidAxialDipole(geo);
  const out = { p0, dPair: p0, spacingRows: [], FAIL: FAIL_CLOSED };
  for (const a of spacings) {
    const env = prepareEnvironment({ geo, Rsea: a, Nt, gammaOrientOverOmega });
    // arm-slew honesty figure for the relax-orientation pair rows
    let armSlew = 0;
    for (let q = 0; q < env.phSeq.length; q++) for (let k = 0; k < env.NtEff; k++) {
      const a1 = env.phSeq[q][k], a2 = env.phSeq[q][(k + 1) % env.NtEff];
      armSlew = Math.max(armSlew, Math.hypot(a2[0]-a1[0], a2[1]-a1[1], a2[2]-a1[2]) / env.dt);
    }
    const zero = settleBreathing(env, { eps: 0, breathMode: "off" });
    const dipFrozen = measureRows(env, zero, "frozenMean", "dipole");
    const pairFrozen = measureRows(env, zero, "frozenMean", "finitePair");
    const dipRelax = measureRows(env, zero, "relax", "dipole");
    const pairRelax = measureRows(env, zero, "relax", "finitePair");
    const scanPair = phaseScanM(env, { eps, Nphi, orientMode: "frozenMean", returnModel: "finitePair" });
    const row = { a, NtEff: env.NtEff, armSlewHalfD: (p0 / 2) * armSlew };
    for (const L of ["I", "M", "O"]) {
      row[`rad${L}_dipole_frozen`] = dipFrozen.rad[L] * p0;
      row[`rad${L}_pair_frozen`] = pairFrozen.rad[L] * p0;
      row[`rad${L}_dipole_relax`] = dipRelax.rad[L] * p0;
      row[`rad${L}_pair_relax`] = pairRelax.rad[L] * p0;
    }
    row.tanI_pair_relax = pairRelax.tan.I * p0;
    row.nearFieldDeltaM_frozen = (pairFrozen.rad.M - dipFrozen.rad.M) * p0;
    row.nearFieldDeltaM_relax = (pairRelax.rad.M - dipRelax.rad.M) * p0;
    row.breathingCeilingM_pair = scanPair.best.deltaMPerP0 * p0;
    out.spacingRows.push(row);
  }
  return out;
}

export function diagnosticReport() {
  const p0 = braidAxialDipole();
  const readout = middleRowReadout({});
  const map = breathingMarginMap({});
  return { schema: SCHEMA, specPacketRef: SPEC_PACKET_REF,
    p0Available: p0, middleRowReadout: readout, map, ...FAIL_CLOSED };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) {
  process.stdout.write(JSON.stringify(diagnosticReport(), null, process.argv.includes("--pretty") ? 2 : 0) + "\n");
}
