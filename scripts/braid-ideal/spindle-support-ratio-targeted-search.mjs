// Support-ratio-targeted configuration search (queue item 25; spec Section 36).
//
// Sections 30-35 establish that per-layer RADIAL SUPPORT RATIOS at the unified
// fitted kappa*, not closure residuals, are the survivability statistic: the
// native release converts any support deficit into secular dispersal, and the
// clicker can trim only the last ~3% (s_min ~ 0.97). This search re-runs the
// spindle-family configuration hunt with the objective J = sum_a (s_a - 1)^2
// (closure residual reported as the secondary criterion), over the family knobs
// at pinned cadence, with the toy static sea available as a dressing option.
//
// s_a = kappa* x (inward radial wake force on layer a) / (centripetal need of
// layer a), computed on the same single-time rigid evaluation as the closure
// metric, kappa* fitted globally by the unified least-squares bridge.
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.

import { fileURLToPath } from "node:url";
import { buildBraid, wakeAccel, residuals, CHAMPION } from "./spindle-braid-screw-drift-evaluator.mjs";

export const SCHEMA = "spindle_support_ratio_targeted_search.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-ideal/fold-crossing-chart-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_prescribed_worldline_evaluator_not_native_solver_not_accepted_evidence",
});

const d = Math.PI / 180;

export function supportRatios({ geo = CHAMPION, cTrans = 1.0, sea = null, soft = 0.02, lambdaTan = 0 } = {}) {
  const braid = buildBraid({ u: 0, cTrans, geo, sea });
  const w = braid.omega;
  const res = residuals({ u: 0, cTrans, geo, sea }, { soft });
  const kap = res.kappaStar;
  const layers = [];
  for (const i of [0, 2, 4]) {
    const s = braid.sites[i];
    const rhoCyl = s.R * Math.cos(s.alpha);
    // site at t=0: azimuth th; cylindrical radial and tangential unit vectors
    const rx = Math.cos(s.th), ry = Math.sin(s.th);
    const tx = -Math.sin(s.th), ty = Math.cos(s.th);
    const wk = wakeAccel(braid, i, 0, { soft }).a;
    const inward = -(wk[0] * rx + wk[1] * ry); // wake radial force, inward-positive (unit kappa)
    const need = w * w * rhoCyl;               // centripetal need (unit mass)
    const tanRow = kap * (wk[0] * tx + wk[1] * ty); // per-layer tangential DC row at kappa* (want 0)
    layers.push({ layer: s.name, support: (kap * inward) / need, tanRow, rhoCyl, speed: w * rhoCyl });
  }
  return { kappaStar: kap, closure: res.globalRelResidual,
    ratios: Object.fromEntries(layers.map((l) => [l.layer, l.support])),
    tanRows: Object.fromEntries(layers.map((l) => [l.layer, l.tanRow])),
    speeds: Object.fromEntries(layers.map((l) => [l.layer, l.speed])),
    minRatio: Math.min(...layers.map((l) => l.support)),
    maxAbsTan: Math.max(...layers.map((l) => Math.abs(l.tanRow))),
    objective: layers.reduce((s2, l) => s2 + (l.support - 1) ** 2 + lambdaTan * l.tanRow * l.tanRow, 0) };
}

// Coordinate-descent search on J = sum (s_a - 1)^2 over the spindle knobs.
export function searchSupport({ start = CHAMPION, sea = null, rounds = 3, soft = 0.02, stepScale = 1, lambdaTan = 0 } = {}) {
  const steps = { qI: 0.05 * stepScale, qO: 0.08 * stepScale, alphaI: 4 * d * stepScale, alphaM: 3 * d * stepScale, alphaO: 3 * d * stepScale, thetaO: 8 * d * stepScale, thetaI: 8 * d * stepScale };
  let g = { thetaI: 0, ...start };
  let best = supportRatios({ geo: g, sea, soft, lambdaTan });
  const trace = [{ geo: { ...g }, ...best }];
  for (let r = 0; r < rounds; r++) {
    for (const k of Object.keys(steps)) {
      for (const sgn of [+1, -1]) {
        let improved = true;
        while (improved) {
          const trial = { ...g, [k]: g[k] + sgn * steps[k] };
          if (trial.qI < 0.1 || trial.qO < 0.15) break; // geometric floors
          const t = supportRatios({ geo: trial, sea, soft, lambdaTan });
          if (t.objective < best.objective - 1e-6) { g = trial; best = t; } else improved = false;
        }
      }
    }
    trace.push({ geo: { ...g }, ...best });
  }
  return { start, best: { geo: g, deg: { alphaI: g.alphaI / d, alphaM: g.alphaM / d, alphaO: g.alphaO / d, thetaO: g.thetaO / d }, ...best }, trace: trace.map(({ geo, objective, minRatio, closure, ratios }) => ({ geo, objective, minRatio, closure, ratios })) };
}

// ---------------------------------------------------------------------------
// Tangential-closure-targeted search (item 25 follow-on; Section 50 program
// consequence). The sea response family is closed (Sections 47-50 by title):
// the sea supplies ONLY (i) a forward tangential feed on the inner and outer
// layers, magnitude up to ~0.12 at the in-band spacing (natively confirmed
// +0.117 in the Row 4 run; return-model-robust at pair grade, x2 FCC-12), and
// (ii) cap radial support (Section 50 grades: +0.18 native-confirmed
// orientational up to ~0.42 frozen-pair x2; booked conservatively). The braid
// geometry must therefore supply everything else itself. Declared ledger:
//   radial:    target support I = 1, M = 1 (sea gives them nothing or less),
//              O = 1 - seaO (cap credit, seaO = 0.20 declared primary booking);
//   tangential: the middle's rail pump is the escapement's job (excluded, as
//              always); the inner and outer ledgers close iff the layer row is
//              a brake no deeper than the sea feed cap and not a forward pump
//              (nothing absorbs a forward pump on a sub-field layer):
//              pen_L = (max(0, -tau_L - capTan) + max(0, tau_L))^2.
// Objective J = sum_L (supp_L - target_L)^2 + lambda * (pen_I + pen_O).
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.

export const SUPPORT_V1_GEO = Object.freeze({ qI: 0.462, qO: 1.236, alphaI: -10.44 * d, alphaM: -2.67 * d, alphaO: 84 * d, thetaO: 337.04 * d, thetaI: -23.7 * d });
export const SEA_BOOKING_S50 = Object.freeze({ seaO: 0.20, seaOPairGrade: 0.42, capTan: 0.12 });

// TANGENTIAL-CLOSURE CANDIDATE V2 (this search's product; spec Section 51 by
// title). Bare rows: support I/M/O = 1.003/0.994/0.502, tau_I ~ 0 (the Rows 1-4
// inner brake ELIMINATED by geometry alone; the middle tilt is the unlocking
// knob), tau_O ~ 0, closure 0.286 (family best). The residual is a single
// number: bare cap support 0.50 needs a cap credit ~0.47-0.50, and the
// claim-grade credit is GEOMETRY-HYPERSENSITIVE (0.04 at this geometry, 0.42
// at v1, >1.5 at high-qO/84-degree caps) — candidate tabling is GATED on the
// self-consistent cap-credit fixed point, not on a constant booking.
export const TANGENTIAL_CLOSURE_V2 = Object.freeze({ qI: 0.481, qO: 1.036, alphaI: -2.4 * d, alphaM: -24.4 * d, alphaO: 64.5 * d, thetaI: -16.7 * d, thetaO: 330.5 * d });

export function tangentialLedger(rows, { seaO = SEA_BOOKING_S50.seaO, capTan = SEA_BOOKING_S50.capTan, lambda = 1, weights = { I: 1, M: 1, O: 1 } } = {}) {
  const target = { I: 1, M: 1, O: 1 - seaO };
  let J = 0;
  for (const L of ["I", "M", "O"]) J += weights[L] * (rows.ratios[L] - target[L]) ** 2;
  const pen = {};
  for (const L of ["I", "O"]) {
    const tau = rows.tanRows[L];
    pen[L] = (Math.max(0, -tau - capTan) + Math.max(0, tau)) ** 2;
    J += lambda * pen[L];
  }
  const totalO = rows.ratios.O + seaO; // cap credit applied
  const ledgerCloses =
    rows.ratios.I >= 0.97 && rows.ratios.M >= 0.97 &&
    totalO >= 0.97 && totalO <= 1.03 && // credited O in the corridor (over-feed drowned O in Row 4)
    pen.I <= 1e-4 && pen.O <= 1e-4;     // declared tolerance: residual tangential <= 0.01
  return { J, pen, target, totalO, ledgerCloses };
}

export function searchTangentialClosure({ start = SUPPORT_V1_GEO, rounds = 3, soft = 0.02, stepScale = 1, seaO = SEA_BOOKING_S50.seaO, capTan = SEA_BOOKING_S50.capTan, lambda = 1, weights = { I: 1, M: 1, O: 1 }, freeze = [] } = {}) {
  const steps = { qI: 0.05 * stepScale, qO: 0.08 * stepScale, alphaI: 4 * d * stepScale, alphaM: 3 * d * stepScale, alphaO: 3 * d * stepScale, thetaO: 8 * d * stepScale, thetaI: 8 * d * stepScale };
  for (const k of freeze) delete steps[k];
  const evalGeo = (geo) => {
    const rows = supportRatios({ geo, soft });
    const led = tangentialLedger(rows, { seaO, capTan, lambda, weights });
    return { rows, led, J: led.J };
  };
  let g = { thetaI: 0, ...start };
  let best = evalGeo(g);
  const trace = [{ geo: { ...g }, J: best.J, ratios: best.rows.ratios, tanRows: best.rows.tanRows }];
  for (let r = 0; r < rounds; r++) {
    for (const k of Object.keys(steps)) {
      for (const sgn of [+1, -1]) {
        let improved = true;
        while (improved) {
          const trial = { ...g, [k]: g[k] + sgn * steps[k] };
          if (trial.qI < 0.1 || trial.qO < 0.15) break;
          const t = evalGeo(trial);
          if (t.J < best.J - 1e-6) { g = trial; best = t; } else improved = false;
        }
      }
    }
    trace.push({ geo: { ...g }, J: best.J, ratios: best.rows.ratios, tanRows: best.rows.tanRows });
  }
  return {
    start, seaBooking: { seaO, capTan, lambda },
    best: {
      geo: g, deg: { alphaI: g.alphaI / d, alphaM: g.alphaM / d, alphaO: g.alphaO / d, thetaI: (g.thetaI ?? 0) / d, thetaO: g.thetaO / d },
      J: best.J, ratios: best.rows.ratios, tanRows: best.rows.tanRows,
      closure: best.rows.closure, kappaStar: best.rows.kappaStar,
      penalties: best.led.pen, targets: best.led.target, ledgerCloses: best.led.ledgerCloses,
    },
    trace,
  };
}

// ---------------------------------------------------------------------------
// Self-consistent cap-credit fixed-point search (Section 51 named follow-on).
// The cap credit is geometry-hypersensitive, so it enters the objective as a
// per-trial function credit(geo, a) rather than a constant booking, and the
// sea spacing a joins the knob set. In-loop credit proxy (declared; verified
// post-hoc on the Section 50 instrument):
//   - sea sites: the 6-direction shell at spacing a;
//   - orientation: the slow-limit proxy p_hat = unit(cycle-averaged bare
//     causally delayed braid field at the site) — the cheap stand-in for the settled
//     relax cycle-mean the claim instrument uses;
//   - return: the frozen finite pair — unit-polarity monopoles at
//     +- p0(geo)/2 along p_hat (static, so exactly causally delayed trivially),
//     booked on the OUTER receivers with the supportRatios convention and
//     scaled x2 (FCC-12), exactly the Section 50 frozen-pair claim row. Note
//     the pair's unit charges make the credit independent of p0 except
//     through the endpoint separation.

export function braidDipole(geo) {
  let pz = 0;
  const layers = [["I", geo.qI, geo.alphaI], ["M", 1, geo.alphaM], ["O", geo.qO, geo.alphaO]];
  for (const [, R, al] of layers) pz += 2 * R * Math.sin(al); // both members: pol*sgn = +1 each
  return Math.abs(pz);
}

export function capCreditProxy({ geo, a = 3.4, cTrans = 1.0, Nt = 12, soft = 0.02 } = {}) {
  const braid = buildBraid({ u: 0, cTrans, geo });
  const w = braid.omega, period = 2 * Math.PI / w;
  const kap = residuals({ u: 0, cTrans, geo }, { soft }).kappaStar;
  const p0 = braidDipole(geo);
  const dirs = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
  const pos = (s, t) => { const ang = w * t + s.th, ca = Math.cos(s.alpha); return [s.sgn*s.R*ca*Math.cos(ang), s.sgn*s.R*ca*Math.sin(ang), s.sgn*s.R*Math.sin(s.alpha)]; };
  const vel = (s, t) => { const ang = w * t + s.th, v = s.sgn*s.R*Math.cos(s.alpha)*w; return [-v*Math.sin(ang), v*Math.cos(ang), 0]; };
  // slow-limit orientation proxy at each sea site (bare kernel, exact retard per source)
  const phs = dirs.map((dv) => {
    const X = [dv[0]*a, dv[1]*a, dv[2]*a];
    const acc = [0, 0, 0];
    for (let k = 0; k < Nt; k++) {
      const t = (k / Nt) * period;
      for (const s of braid.sites) {
        let te = t - a - 1;
        for (let it = 0; it < 30; it++) { const p = pos(s, te); te = t - Math.hypot(X[0]-p[0], X[1]-p[1], X[2]-p[2]); }
        const p = pos(s, te);
        const dx = [X[0]-p[0], X[1]-p[1], X[2]-p[2]];
        const r = Math.hypot(dx[0], dx[1], dx[2]);
        const rh = [dx[0]/r, dx[1]/r, dx[2]/r];
        const v = vel(s, te);
        const Ds = 1 - (v[0]*rh[0] + v[1]*rh[1] + v[2]*rh[2]);
        for (let c = 0; c < 3; c++) acc[c] += (s.pol / Ds) * dx[c] / (r * r * r);
      }
    }
    const n = Math.hypot(acc[0], acc[1], acc[2]) || 1e-300;
    return [acc[0]/n, acc[1]/n, acc[2]/n];
  });
  // frozen static pair endpoints; credit booked on the outer receiver, x2 FCC-12
  const sO = braid.sites[4];
  const rhoCyl = sO.R * Math.cos(sO.alpha);
  let inward = 0;
  for (let k = 0; k < Nt; k++) {
    const t = (k / Nt) * period;
    const xj = pos(sO, t), vj = vel(sO, t);
    const rx = Math.cos(w * t + sO.th), ry = Math.sin(w * t + sO.th);
    for (let q = 0; q < 6; q++) {
      for (const pm of [+1, -1]) {
        const Xe = [dirs[q][0]*a + pm*(p0/2)*phs[q][0], dirs[q][1]*a + pm*(p0/2)*phs[q][1], dirs[q][2]*a + pm*(p0/2)*phs[q][2]];
        const dx = [xj[0]-Xe[0], xj[1]-Xe[1], xj[2]-Xe[2]];
        const r = Math.hypot(dx[0], dx[1], dx[2]);
        const rh = [dx[0]/r, dx[1]/r, dx[2]/r];
        const Dt = 1 - (vj[0]*rh[0] + vj[1]*rh[1] + vj[2]*rh[2]);
        inward += -(sO.pol) * Dt * pm * (rh[0]*rx + rh[1]*ry) / (r * r) / Nt;
      }
    }
  }
  return { credit: 2 * (kap * inward) / (w * w * rhoCyl), p0, kappaStar: kap };
}

export function searchSelfConsistent({ start = TANGENTIAL_CLOSURE_V2, aStart = 3.4, rounds = 3, soft = 0.02, stepScale = 1, capTan = SEA_BOOKING_S50.capTan, lambda = 100, weights = { I: 4, M: 8, O: 2 }, NtCredit = 12 } = {}) {
  const steps = { qI: 0.05 * stepScale, qO: 0.08 * stepScale, alphaI: 4 * d * stepScale, alphaM: 3 * d * stepScale, alphaO: 3 * d * stepScale, thetaO: 8 * d * stepScale, thetaI: 8 * d * stepScale, a: 0.15 * stepScale };
  const evalCell = (geo, a) => {
    const rows = supportRatios({ geo, soft });
    const { credit } = capCreditProxy({ geo, a, Nt: NtCredit, soft });
    const led = tangentialLedger(rows, { seaO: credit, capTan, lambda, weights });
    return { rows, credit, led, J: led.J };
  };
  let g = { ...start }, a = aStart;
  let best = evalCell(g, a);
  for (let r = 0; r < rounds; r++) {
    for (const k of Object.keys(steps)) {
      for (const sgn of [+1, -1]) {
        let improved = true;
        while (improved) {
          const isA = k === "a";
          const trialG = isA ? g : { ...g, [k]: g[k] + sgn * steps[k] };
          const trialA = isA ? a + sgn * steps.a : a;
          if (trialG.qI < 0.1 || trialG.qO < 0.15 || trialA < 2.2 || trialA > 7) break;
          const t = evalCell(trialG, trialA);
          if (t.J < best.J - 1e-6) { g = trialG; a = trialA; best = t; } else improved = false;
        }
      }
    }
  }
  return {
    start, aStart,
    best: {
      geo: g, a, deg: { alphaI: g.alphaI / d, alphaM: g.alphaM / d, alphaO: g.alphaO / d, thetaI: (g.thetaI ?? 0) / d, thetaO: g.thetaO / d },
      J: best.J, ratios: best.rows.ratios, tanRows: best.rows.tanRows, credit: best.credit,
      totalO: best.rows.ratios.O + best.credit,
      closure: best.rows.closure, kappaStar: best.rows.kappaStar,
      penalties: best.led.pen, ledgerCloses: best.led.ledgerCloses,
    },
  };
}

// SELF-CONSISTENT STATIC-SEA CANDIDATE V3 (spec Section 52 by title): the
// fixed-point search's verified product. Bare rows I/M/O = 1.0035/1.0008/0.677,
// tau_I = -0.003, tau_O = -0.009 (NO sea tangential feed required, so the sea
// can be STATIC: frozen slow-limit orientations, no waves, no M-tax, no lag
// requirement — the Rows 1-4 blockers are all designed out at seed grade).
// Cap credit 0.3172 at a = 2.453, INSTRUMENT-VERIFIED (frozen-pair claim rows,
// dt-stable Nt 32/64 on both stacks; proxy and settled-mean conventions agree
// at this cell). Dressed: 1.0022/0.9985/0.9942 — all layers in the corridor.
// Closure 0.2058 (family record). Per-cell verification is MANDATORY: a sibling
// cell (a=2.631 variant) failed instrument verification (credit 0.183 vs proxy
// 0.279) — the proxy's slow-limit orientation aliases on some cells; only
// verified cells are citable.
export const SELF_CONSISTENT_V3 = Object.freeze({
  geo: Object.freeze({ qI: 0.4935, qO: 1.036, alphaI: -3.65 * d, alphaM: -29.04 * d, alphaO: 67.5 * d, thetaI: -12.2 * d, thetaO: 333.5 * d }),
  aSea: 2.453, creditVerified: 0.3172,
});

// ---------------------------------------------------------------------------
// TRUE-PLACEMENT, AXIS-DECLARED credit (Row 5 rejection correction; the
// capCreditProxy successor). The Row 5 seed gate found the cap credit is
// POLAR-CONCENTRATED (+0.190 of the 6-direction booking rode on the two
// on-axis sites) and the true FCC first shell has NO polar sites — the x2
// count scaling was the artifact. This function books the credit by summing
// ACTUAL declared sites (no count scaling, ever), reports per-layer sea rows
// (I and M taxes included, not assumed negligible), and declares the axis
// coverage (polar fraction of the credit). Shells: FCC first (12 <110> at a)
// and the axial FCC second (6 <100> at a*sqrt(2)); any combination.

const FCC1_DIRS = (() => {
  const out = [];
  for (const [i, j] of [[0, 1], [0, 2], [1, 2]]) for (const si of [1, -1]) for (const sj of [1, -1]) {
    const v = [0, 0, 0]; v[i] = si / Math.SQRT2; v[j] = sj / Math.SQRT2; out.push(v);
  }
  return out;
})();
const FCC2_DIRS = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
export const FCC_SHELLS = Object.freeze({
  first: { dirs: FCC1_DIRS, scale: 1 },
  secondAxial: { dirs: FCC2_DIRS, scale: Math.SQRT2 },
});

export function seaRowsTruePlacement({ geo, a = 3.4, shells = ["first"], cTrans = 1.0, Nt = 16, soft = 0.02 } = {}) {
  const braid = buildBraid({ u: 0, cTrans, geo });
  const w = braid.omega, period = 2 * Math.PI / w;
  const kap = residuals({ u: 0, cTrans, geo }, { soft }).kappaStar;
  const p0 = braidDipole(geo);
  const pos = (s, t) => { const ang = w * t + s.th, ca = Math.cos(s.alpha); return [s.sgn*s.R*ca*Math.cos(ang), s.sgn*s.R*ca*Math.sin(ang), s.sgn*s.R*Math.sin(s.alpha)]; };
  const vel = (s, t) => { const ang = w * t + s.th, v = s.sgn*s.R*Math.cos(s.alpha)*w; return [-v*Math.sin(ang), v*Math.cos(ang), 0]; };
  // assemble actual sites (position = dir * a * scale)
  const sites = [];
  for (const sh of shells) for (const dv of FCC_SHELLS[sh].dirs) {
    const R = a * FCC_SHELLS[sh].scale;
    sites.push({ X: [dv[0]*R, dv[1]*R, dv[2]*R], polar: Math.abs(dv[2]) > Math.cos(30 * Math.PI / 180) });
  }
  // slow-limit orientation per site (bare kernel, exact retard per source)
  for (const site of sites) {
    const acc = [0, 0, 0];
    for (let k = 0; k < Nt; k++) {
      const t = (k / Nt) * period;
      for (const s of braid.sites) {
        let te = t - Math.hypot(...site.X) - 1;
        for (let it = 0; it < 30; it++) { const p = pos(s, te); te = t - Math.hypot(site.X[0]-p[0], site.X[1]-p[1], site.X[2]-p[2]); }
        const p = pos(s, te);
        const dx = [site.X[0]-p[0], site.X[1]-p[1], site.X[2]-p[2]];
        const r = Math.hypot(dx[0], dx[1], dx[2]);
        const rh = [dx[0]/r, dx[1]/r, dx[2]/r];
        const v = vel(s, te);
        const Ds = 1 - (v[0]*rh[0] + v[1]*rh[1] + v[2]*rh[2]);
        for (let c = 0; c < 3; c++) acc[c] += (s.pol / Ds) * dx[c] / (r * r * r);
      }
    }
    const n = Math.hypot(acc[0], acc[1], acc[2]) || 1e-300;
    site.ph = [acc[0]/n, acc[1]/n, acc[2]/n];
  }
  // frozen static pair endpoints; per-layer radial rows + polar-credit split
  const rows = { I: 0, M: 0, O: 0 };
  let polarO = 0;
  for (const [idx, L] of [[0, "I"], [2, "M"], [4, "O"]]) {
    const sR = braid.sites[idx];
    const rhoCyl = sR.R * Math.cos(sR.alpha);
    for (let k = 0; k < Nt; k++) {
      const t = (k / Nt) * period;
      const xj = pos(sR, t), vj = vel(sR, t);
      const rx = Math.cos(w * t + sR.th), ry = Math.sin(w * t + sR.th);
      for (const site of sites) {
        for (const pm of [+1, -1]) {
          const Xe = [site.X[0] + pm*(p0/2)*site.ph[0], site.X[1] + pm*(p0/2)*site.ph[1], site.X[2] + pm*(p0/2)*site.ph[2]];
          const dx = [xj[0]-Xe[0], xj[1]-Xe[1], xj[2]-Xe[2]];
          const r = Math.hypot(dx[0], dx[1], dx[2]);
          const rh = [dx[0]/r, dx[1]/r, dx[2]/r];
          const Dt = 1 - (vj[0]*rh[0] + vj[1]*rh[1] + vj[2]*rh[2]);
          const contrib = -(sR.pol) * Dt * pm * (rh[0]*rx + rh[1]*ry) / (r * r) / Nt * kap / (w * w * rhoCyl);
          rows[L] += contrib;
          if (L === "O" && site.polar) polarO += contrib;
        }
      }
    }
  }
  return { rows, polarFractionO: rows.O !== 0 ? polarO / rows.O : 0, p0, kappaStar: kap, siteCount: sites.length };
}

// Fixed-point search at true placement: targets are corridor-consistent totals
// per layer (bare + actual sea rows), tangential penalties as before.
export function searchTruePlacement({ start = SELF_CONSISTENT_V3.geo, aStart = 2.453, shells = ["first", "secondAxial"], rounds = 3, soft = 0.02, stepScale = 1, capTan = 0.01, lambda = 300, weights = { I: 4, M: 8, O: 2 }, NtSea = 16, aFloor = 2.2 } = {}) {
  const steps = { qI: 0.05 * stepScale, qO: 0.08 * stepScale, alphaI: 4 * d * stepScale, alphaM: 3 * d * stepScale, alphaO: 3 * d * stepScale, thetaO: 8 * d * stepScale, thetaI: 8 * d * stepScale, a: 0.12 * stepScale };
  const evalCell = (geo, a) => {
    const bare = supportRatios({ geo, soft });
    const sea = seaRowsTruePlacement({ geo, a, shells, Nt: NtSea, soft });
    let J = 0;
    const total = {};
    for (const L of ["I", "M", "O"]) { total[L] = bare.ratios[L] + sea.rows[L]; J += weights[L] * (total[L] - 1) ** 2; }
    const pen = {};
    for (const L of ["I", "O"]) {
      const tau = bare.tanRows[L];
      pen[L] = (Math.max(0, -tau - capTan) + Math.max(0, tau)) ** 2;
      J += lambda * pen[L];
    }
    const closes = ["I", "M", "O"].every((L) => total[L] >= 0.97 && total[L] <= 1.03) && pen.I <= 1e-4 && pen.O <= 1e-4;
    return { bare, sea, total, pen, closes, J };
  };
  let g = { ...start }, a = aStart;
  let best = evalCell(g, a);
  for (let r = 0; r < rounds; r++) {
    for (const k of Object.keys(steps)) {
      for (const sgn of [+1, -1]) {
        let improved = true;
        while (improved) {
          const isA = k === "a";
          const tg = isA ? g : { ...g, [k]: g[k] + sgn * steps[k] };
          const ta = isA ? a + sgn * steps.a : a;
          if (tg.qI < 0.1 || tg.qO < 0.15 || ta < aFloor || ta > 7) break;
          const t = evalCell(tg, ta);
          if (t.J < best.J - 1e-6) { g = tg; a = ta; best = t; } else improved = false;
        }
      }
    }
  }
  return { start, aStart, shells,
    best: { geo: g, a, deg: { alphaI: g.alphaI / d, alphaM: g.alphaM / d, alphaO: g.alphaO / d, thetaI: (g.thetaI ?? 0) / d, thetaO: g.thetaO / d },
      J: best.J, bareRatios: best.bare.ratios, tanRows: best.bare.tanRows, seaRows: best.sea.rows,
      polarFractionO: best.sea.polarFractionO, total: best.total, penalties: best.pen,
      closure: best.bare.closure, ledgerCloses: best.closes } };
}

// OCTAHEDRAL-CAGE CANDIDATE V4 (spec Section 54 by title): the true-placement
// fixed point's verified product. NO FCC occupancy combination closes (first
// shell: negative credit + middle tax, native + instrument agreement; first
// plus axial second: best totals 0.944/0.959/0.841). The closing cell lies
// OUTSIDE FCC: six axis-covering octahedral neighbors at site radius
// 1.645*sqrt(2) = 2.326 — the solvation-shell reading made literal: the braid
// carves its FCC first shell vacant and keeps an octahedral cage with two
// polar members. Totals 1.0006/0.9961/0.9937, tau_I -0.0035, tau_O -0.0057,
// bare closure 0.2474; sea rows dt-exact (static geometry, Nt 16/32/48
// identical); axis-declared (the polar pair carries 111% of the O credit,
// the four equatorial cage members -11%).
export const OCTAHEDRAL_CAGE_V4 = Object.freeze({
  geo: Object.freeze({ qI: 0.4935, qO: 1.106, alphaI: 2.85 * d, alphaM: -30.16 * d, alphaO: 67.5 * d, thetaI: -4.2 * d, thetaO: 333.5 * d }),
  aLattice: 1.645, siteRadius: 1.645 * Math.SQRT2, shells: ["secondAxial"],
});

// CAGE RECIPROCITY (Section 54 named check; Row 6 gate). The V4 cage members
// are themselves assemblies sitting in the braid's near field; the frozen-
// static declaration is only honest if the net force and torque they carry is
// declared. Per cage site: net force on its two endpoint monopoles from (a)
// the braid members (exact causal delays, softened branch weight — the rail
// layer's caustic fan crosses external points) and (b) the other cage sites'
// static endpoints; torque about the site center; both at kappa*, normalized
// by the braid's outer-layer centripetal need (the corridor force scale).
export function cageReciprocity({ geo = OCTAHEDRAL_CAGE_V4.geo, aLattice = OCTAHEDRAL_CAGE_V4.aLattice, shells = ["secondAxial"], cTrans = 1.0, Nt = 24, soft = 0.02 } = {}) {
  const braid = buildBraid({ u: 0, cTrans, geo });
  const w = braid.omega, period = 2 * Math.PI / w;
  const kap = residuals({ u: 0, cTrans, geo }, { soft }).kappaStar;
  const p0 = braidDipole(geo);
  const pos = (s, t) => { const ang = w * t + s.th, ca = Math.cos(s.alpha); return [s.sgn*s.R*ca*Math.cos(ang), s.sgn*s.R*ca*Math.sin(ang), s.sgn*s.R*Math.sin(s.alpha)]; };
  const vel = (s, t) => { const ang = w * t + s.th, v = s.sgn*s.R*Math.cos(s.alpha)*w; return [-v*Math.sin(ang), v*Math.cos(ang), 0]; };
  // sites with slow-limit orientations (same declaration as seaRowsTruePlacement)
  const sites = [];
  for (const sh of shells) for (const dv of FCC_SHELLS[sh].dirs) {
    const R = aLattice * FCC_SHELLS[sh].scale;
    sites.push({ dir: dv, X: [dv[0]*R, dv[1]*R, dv[2]*R] });
  }
  for (const site of sites) {
    const acc = [0, 0, 0];
    for (let k = 0; k < Nt; k++) {
      const t = (k / Nt) * period;
      for (const s of braid.sites) {
        let te = t - Math.hypot(...site.X) - 1;
        for (let it = 0; it < 30; it++) { const p = pos(s, te); te = t - Math.hypot(site.X[0]-p[0], site.X[1]-p[1], site.X[2]-p[2]); }
        const p = pos(s, te);
        const dx = [site.X[0]-p[0], site.X[1]-p[1], site.X[2]-p[2]];
        const r = Math.hypot(dx[0], dx[1], dx[2]);
        const rh = [dx[0]/r, dx[1]/r, dx[2]/r];
        const v = vel(s, te);
        const Ds = 1 - (v[0]*rh[0] + v[1]*rh[1] + v[2]*rh[2]);
        for (let c = 0; c < 3; c++) acc[c] += (s.pol / Ds) * dx[c] / (r * r * r);
      }
    }
    const n = Math.hypot(acc[0], acc[1], acc[2]) || 1e-300;
    site.ph = [acc[0]/n, acc[1]/n, acc[2]/n];
  }
  const needO = w * w * (geo.qO * Math.cos(geo.alphaO)); // corridor force scale
  const rows = [];
  for (let qi = 0; qi < sites.length; qi++) {
    const site = sites[qi];
    const F = [0, 0, 0], T = [0, 0, 0];
    for (const pm of [+1, -1]) {
      const Xe = [site.X[0] + pm*(p0/2)*site.ph[0], site.X[1] + pm*(p0/2)*site.ph[1], site.X[2] + pm*(p0/2)*site.ph[2]];
      const Fe = [0, 0, 0];
      // braid members: cycle-averaged, exact causal delays, softened branch weight
      for (let k = 0; k < Nt; k++) {
        const t = (k / Nt) * period;
        for (const s of braid.sites) {
          let te = t - Math.hypot(...Xe) - 1;
          for (let it = 0; it < 30; it++) { const p = pos(s, te); te = t - Math.hypot(Xe[0]-p[0], Xe[1]-p[1], Xe[2]-p[2]); }
          const p = pos(s, te);
          const dx = [Xe[0]-p[0], Xe[1]-p[1], Xe[2]-p[2]];
          const r = Math.hypot(dx[0], dx[1], dx[2]);
          const rh = [dx[0]/r, dx[1]/r, dx[2]/r];
          const v = vel(s, te);
          const Ds = 1 - (v[0]*rh[0] + v[1]*rh[1] + v[2]*rh[2]);
          const m = Ds / (Ds * Ds + soft * soft);
          for (let c = 0; c < 3; c++) Fe[c] += (pm * s.pol) * m * rh[c] / (r * r) / Nt;
        }
      }
      // other cage sites' endpoints: static monopoles
      for (let qj = 0; qj < sites.length; qj++) {
        if (qj === qi) continue;
        const o = sites[qj];
        for (const pm2 of [+1, -1]) {
          const Xo = [o.X[0] + pm2*(p0/2)*o.ph[0], o.X[1] + pm2*(p0/2)*o.ph[1], o.X[2] + pm2*(p0/2)*o.ph[2]];
          const dx = [Xe[0]-Xo[0], Xe[1]-Xo[1], Xe[2]-Xo[2]];
          const r = Math.hypot(dx[0], dx[1], dx[2]);
          for (let c = 0; c < 3; c++) Fe[c] += (pm * pm2) * dx[c] / (r * r * r);
        }
      }
      const arm = [Xe[0]-site.X[0], Xe[1]-site.X[1], Xe[2]-site.X[2]];
      T[0] += arm[1]*Fe[2] - arm[2]*Fe[1]; T[1] += arm[2]*Fe[0] - arm[0]*Fe[2]; T[2] += arm[0]*Fe[1] - arm[1]*Fe[0];
      for (let c = 0; c < 3; c++) F[c] += Fe[c];
    }
    const Frad = kap * (F[0]*site.dir[0] + F[1]*site.dir[1] + F[2]*site.dir[2]);
    const Fmag = kap * Math.hypot(F[0], F[1], F[2]);
    rows.push({ dir: site.dir, polar: Math.abs(site.dir[2]) > 0.9,
      FradOverNeedO: Frad / needO, FmagOverNeedO: Fmag / needO,
      torqueOverNeedO: kap * Math.hypot(T[0], T[1], T[2]) / needO });
  }
  return { needO, kappaStar: kap, p0, rows,
    maxAbsFrad: Math.max(...rows.map((r) => Math.abs(r.FradOverNeedO))),
    maxTorque: Math.max(...rows.map((r) => r.torqueOverNeedO)) };
}

// SEED-GRADE RADIAL STABILITY MATRIX (Section 56 program consequence). Rows 5
// and 6 died on the same disease: the corridor is a force BALANCE with no
// restoring gradient — an equilibrium without a basin. This instrument
// converts "corridor found" into "basin or not, with directions": the
// NON-SYMMETRIC Jacobian K_ij = d(net radial force on coordinate i)/d(x_j)
// over the slow configurational coordinates x = (r_I, r_M, r_O, a_cage) —
// layer orbit radii displaced at frozen rotation rate and frozen kappa*
// (the physical perturbation: a layer pushed off its radius while the braid
// keeps spinning), cage radius displaced with orientations FROZEN at their
// seed slow-limit values (held-cage declaration). The system is
// non-conservative, so K is not symmetric and eigenvalues may be complex;
// the readout uses the field-of-values bound: if the symmetric part
// (K+K^T)/2 is negative definite, every eigenvalue has negative real part
// (restoring in all directions — a basin); any positive symmetric-part
// eigenvalue names a candidate escape direction with its eigenvector.
// Estimate grade: quasi-static (no delay-memory modes, no tilt/nutation
// coordinate yet — both named gaps), braid-braid rows single-time (rigid),
// cage rows cycle-averaged.

function jacobiEigSym(Ain) {
  const n = Ain.length; const A = Ain.map((r) => r.slice());
  let V = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
  for (let sweep = 0; sweep < 60; sweep++) {
    let off = 0;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += A[p][q] * A[p][q];
    if (off < 1e-22) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
      if (Math.abs(A[p][q]) < 1e-14) continue;
      const th = 0.5 * Math.atan2(2 * A[p][q], A[q][q] - A[p][p]);
      const c = Math.cos(th), s = Math.sin(th);
      for (let k = 0; k < n; k++) {
        const akp = A[k][p], akq = A[k][q];
        A[k][p] = c * akp - s * akq; A[k][q] = s * akp + c * akq;
      }
      for (let k = 0; k < n; k++) {
        const apk = A[p][k], aqk = A[q][k];
        A[p][k] = c * apk - s * aqk; A[q][k] = s * apk + c * aqk;
        const vkp = V[k][p], vkq = V[k][q];
        V[k][p] = c * vkp - s * vkq; V[k][q] = s * vkp + c * vkq;
      }
    }
  }
  return Array.from({ length: n }, (_, i) => ({ value: A[i][i], vector: V.map((r) => r[i]) }))
    .sort((x, y) => y.value - x.value);
}

export function radialStabilityMatrix({ geo = OCTAHEDRAL_CAGE_V4.geo, aCage = OCTAHEDRAL_CAGE_V4.aLattice * Math.SQRT2, withCage = true, eps = 0.01, Nt = 16, soft = 0.02, cTrans = 1.0, railPinned = false, kapFixed = null, displace = [0, 0, 0, 0] } = {}) {
  const seed = buildBraid({ u: 0, cTrans, geo });
  const w = seed.omega, period = 2 * Math.PI / w;
  const kap = kapFixed ?? residuals({ u: 0, cTrans, geo }, { soft }).kappaStar;
  const p0 = braidDipole(geo);
  // cage sites (octahedral) with orientations frozen at seed slow-limit values
  const cage = [];
  if (withCage) {
    const pos0 = (s, t) => { const ang = w * t + s.th, ca = Math.cos(s.alpha); return [s.sgn*s.R*ca*Math.cos(ang), s.sgn*s.R*ca*Math.sin(ang), s.sgn*s.R*Math.sin(s.alpha)]; };
    const vel0 = (s, t) => { const ang = w * t + s.th, v = s.sgn*s.R*Math.cos(s.alpha)*w; return [-v*Math.sin(ang), v*Math.cos(ang), 0]; };
    for (const dv of FCC2_DIRS) {
      const X = [dv[0]*aCage, dv[1]*aCage, dv[2]*aCage];
      const acc = [0, 0, 0];
      for (let k = 0; k < Nt; k++) {
        const t = (k / Nt) * period;
        for (const s of seed.sites) {
          let te = t - aCage - 1;
          for (let it = 0; it < 30; it++) { const p = pos0(s, te); te = t - Math.hypot(X[0]-p[0], X[1]-p[1], X[2]-p[2]); }
          const p = pos0(s, te);
          const dx = [X[0]-p[0], X[1]-p[1], X[2]-p[2]];
          const r = Math.hypot(dx[0], dx[1], dx[2]);
          const rh = [dx[0]/r, dx[1]/r, dx[2]/r];
          const v = vel0(s, te);
          const Ds = 1 - (v[0]*rh[0] + v[1]*rh[1] + v[2]*rh[2]);
          for (let c = 0; c < 3; c++) acc[c] += (s.pol / Ds) * dx[c] / (r * r * r);
        }
      }
      const n = Math.hypot(acc[0], acc[1], acc[2]) || 1e-300;
      cage.push({ dir: dv, ph: [acc[0]/n, acc[1]/n, acc[2]/n] });
    }
  }
  // net generalized radial forces at displaced configuration. Frozen kappa*;
  // omega frozen by default, or RAIL-PINNED (railPinned: the field-speed pin
  // holds the middle's transverse speed at c_f, so omega = c_f/(R_M cos aM)
  // responds to the middle's radius — the natively confirmed speed attractor
  // acting as the SIZE feedback during contraction).
  const netForces = (dI, dM, dO, dA, railPinned = false) => {
    const wEff = railPinned ? cTrans / ((1 + dM) * Math.cos(geo.alphaM)) : w;
    const b = { omega: wEff, u: 0, sea: [], sites: seed.sites.map((s) => ({ ...s })) };
    for (const s of b.sites) { if (s.name === "I") s.R = geo.qI + dI; if (s.name === "M") s.R = 1 + dM; if (s.name === "O") s.R = geo.qO + dO; }
    const A = aCage + dA;
    const cageSites = cage.map((c) => ({ ...c, X: [c.dir[0]*A, c.dir[1]*A, c.dir[2]*A] }));
    const F = {};
    for (const [idx, L] of [[0, "I"], [2, "M"], [4, "O"]]) {
      const s = b.sites[idx];
      const rhoCyl = s.R * Math.cos(s.alpha);
      // braid-braid: single-time (rigid co-rotation), t = 0
      const rx = Math.cos(s.th), ry = Math.sin(s.th);
      const wk = wakeAccel(b, idx, 0, { soft }).a;
      let inward = -(wk[0] * rx + wk[1] * ry) * kap;
      // cage-on-layer: cycle-averaged static pair sum
      for (let k = 0; k < Nt && cageSites.length; k++) {
        const t = (k / Nt) * (2 * Math.PI / wEff);
        const ang = wEff * t + s.th, ca = Math.cos(s.alpha);
        const xj = [s.sgn*s.R*ca*Math.cos(ang), s.sgn*s.R*ca*Math.sin(ang), s.sgn*s.R*Math.sin(s.alpha)];
        const vmag = s.sgn * s.R * ca * wEff;
        const vj = [-vmag*Math.sin(ang), vmag*Math.cos(ang), 0];
        const rxk = Math.cos(ang), ryk = Math.sin(ang);
        for (const c of cageSites) for (const pm of [+1, -1]) {
          const Xe = [c.X[0] + pm*(p0/2)*c.ph[0], c.X[1] + pm*(p0/2)*c.ph[1], c.X[2] + pm*(p0/2)*c.ph[2]];
          const dx = [xj[0]-Xe[0], xj[1]-Xe[1], xj[2]-Xe[2]];
          const r = Math.hypot(dx[0], dx[1], dx[2]);
          const rh = [dx[0]/r, dx[1]/r, dx[2]/r];
          const Dt = 1 - (vj[0]*rh[0] + vj[1]*rh[1] + vj[2]*rh[2]);
          inward += -(s.pol) * pm * Dt * (rh[0]*rxk + rh[1]*ryk) / (r * r) / Nt * kap;
        }
      }
      F[L] = inward - wEff * wEff * rhoCyl; // net radial force per unit mass (0 = balance)
    }
    // net radial force on a polar cage member (braid legs cycle-averaged, softened)
    let Fcage = 0;
    if (cageSites.length) {
      const c = cageSites.find((x) => Math.abs(x.dir[2]) > 0.9);
      const pos0 = (s, t) => { const ang = wEff * t + s.th, ca = Math.cos(s.alpha); return [s.sgn*s.R*ca*Math.cos(ang), s.sgn*s.R*ca*Math.sin(ang), s.sgn*s.R*Math.sin(s.alpha)]; };
      const vel0 = (s, t) => { const ang = wEff * t + s.th, v = s.sgn*s.R*Math.cos(s.alpha)*w; return [-v*Math.sin(ang), v*Math.cos(ang), 0]; };
      for (const pm of [+1, -1]) {
        const Xe = [c.X[0] + pm*(p0/2)*c.ph[0], c.X[1] + pm*(p0/2)*c.ph[1], c.X[2] + pm*(p0/2)*c.ph[2]];
        for (let k = 0; k < Nt; k++) {
          const t = (k / Nt) * (2 * Math.PI / wEff);
          for (const s of b.sites) {
            let te = t - Math.hypot(...Xe) - 1;
            for (let it = 0; it < 30; it++) { const p = pos0(s, te); te = t - Math.hypot(Xe[0]-p[0], Xe[1]-p[1], Xe[2]-p[2]); }
            const p = pos0(s, te);
            const dx = [Xe[0]-p[0], Xe[1]-p[1], Xe[2]-p[2]];
            const r = Math.hypot(dx[0], dx[1], dx[2]);
            const rh = [dx[0]/r, dx[1]/r, dx[2]/r];
            const v = vel0(s, te);
            const Ds = 1 - (v[0]*rh[0] + v[1]*rh[1] + v[2]*rh[2]);
            const m = Ds / (Ds * Ds + soft * soft);
            Fcage += kap * (pm * s.pol) * m * (rh[0]*c.dir[0] + rh[1]*c.dir[1] + rh[2]*c.dir[2]) / (r * r) / Nt;
          }
        }
        for (const o of cageSites) {
          if (o === c) continue;
          for (const pm2 of [+1, -1]) {
            const Xo = [o.X[0] + pm2*(p0/2)*o.ph[0], o.X[1] + pm2*(p0/2)*o.ph[1], o.X[2] + pm2*(p0/2)*o.ph[2]];
            const dx = [Xe[0]-Xo[0], Xe[1]-Xo[1], Xe[2]-Xo[2]];
            const r = Math.hypot(dx[0], dx[1], dx[2]);
            Fcage += kap * (pm * pm2) * (dx[0]*c.dir[0] + dx[1]*c.dir[1] + dx[2]*c.dir[2]) / (r * r * r);
          }
        }
      }
    }
    return [F.I, F.M, F.O, Fcage];
  };
  const coords = withCage ? 4 : 3;
  const K = [];
  for (let i = 0; i < coords; i++) K.push(Array(coords).fill(0));
  const D0 = displace;
  for (let j = 0; j < coords; j++) {
    const dp = D0.slice(), dm = D0.slice();
    dp[j] = D0[j] + eps; dm[j] = D0[j] - eps;
    const Fp = netForces(dp[0], dp[1], dp[2], dp[3] ?? 0, railPinned);
    const Fm = netForces(dm[0], dm[1], dm[2], dm[3] ?? 0, railPinned);
    for (let i = 0; i < coords; i++) K[i][j] = (Fp[i] - Fm[i]) / (2 * eps);
  }
  const sym = K.map((row, i) => row.map((v, j) => (v + K[j][i]) / 2));
  const eig = jacobiEigSym(sym);
  const F0 = netForces(D0[0], D0[1], D0[2], D0[3] ?? 0, railPinned);
  return { coords: withCage ? ["rI", "rM", "rO", "aCage"] : ["rI", "rM", "rO"],
    seedNetForces: F0, K, symEigen: eig,
    basin: eig.every((e) => e.value < 0),
    maxEig: eig[0].value, escapeDirection: eig[0].vector };
}

// ABSOLUTE-SCALE (RAIL-PINNED) EQUILIBRIUM (Section 57 operator route (a)).
// The frozen-omega frame left the size mode unbalanced; physically, during
// contraction the middle stays ON the rail (the natively confirmed speed
// attractor), so omega = c_f/(R_M cos aM) responds to R_M. Under that pin,
// wake forces scale 1/lambda^2 while needs scale 1/lambda: support ~ 1/lambda,
// contraction RAISES support, and the size mode is self-restoring at a finite
// equilibrium — the speed pin is also the size pin. This solver finds the
// bare braid's rail-pinned radial equilibrium (3-D Newton on (r_I, r_M, r_O)
// at frozen kappa*, omega live), reports the contraction factor lambda, the
// rail-pinned stability spectrum at the fixed point, the tangential rows
// there, and the scale ordering against the declared d0 = R_MCB floor
// (both scales are proportional to kappa; the ratio is a pure number modulo
// the open MCB constant).
export function railPinnedEquilibrium({ geo = OCTAHEDRAL_CAGE_V4.geo, eps = 0.01, Nt = 16, soft = 0.02, iters = 16 } = {}) {
  // kappa FROZEN once at the seed fit: the kappa refit is a gauge that exactly
  // absorbs the dilation gain (the fitted-kappa sum rule); the physical solve
  // holds kappa and lets the rail pin do the size work.
  const kap0 = residuals({ u: 0, cTrans: 1.0, geo }, { soft }).kappaStar;
  let x = [0, 0, 0];
  let last = null;
  for (let it = 0; it < iters; it++) {
    const r = radialStabilityMatrix({ geo, withCage: false, eps, Nt, soft, railPinned: true, kapFixed: kap0, displace: [...x, 0] });
    const F = r.seedNetForces.slice(0, 3), K = r.K;
    last = r;
    if (Math.max(...F.map(Math.abs)) < 5e-5) break;
    const det3 = (A) => A[0][0]*(A[1][1]*A[2][2]-A[1][2]*A[2][1]) - A[0][1]*(A[1][0]*A[2][2]-A[1][2]*A[2][0]) + A[0][2]*(A[1][0]*A[2][1]-A[1][1]*A[2][0]);
    const D = det3(K);
    const col = (j, b) => K.map((row, i) => row.map((v, jj) => (jj === j ? b[i] : v)));
    const dlt = [0, 1, 2].map((j) => det3(col(j, F.map((v) => -v))) / D);
    const damp = Math.min(1, 0.1 / Math.max(...dlt.map(Math.abs)));
    for (let j = 0; j < 3; j++) x[j] += dlt[j] * damp;
  }
  const lambda = 1 + x[1]; // R_M contraction factor (absolute size, seed units)
  const shape = { qI: (geo.qI + x[0]) / lambda, qO: (geo.qO + x[2]) / lambda };
  const rows = supportRatios({ geo: { ...geo, ...shape } });
  return {
    displacement: x, lambda, shapeEq: shape,
    residualF: last.seedNetForces.slice(0, 3),
    railPinnedSpectrum: last.symEigen.map((e) => e.value),
    basin: last.basin, kappaFrozen: kap0,
    refitRows: { support: rows.ratios, tan: rows.tanRows, closure: rows.closure, kappaStar: rows.kappaStar },
    scaleNote: "R_eq and d0=R_MCB are both proportional to kappa (epsilon=1, c_f=1); R_eq/d0 is a pure number modulo the open MCB constant",
  };
}

// SELF-EQUILIBRATED BARE BRAID V5 (spec Section 58 by title): the joint fixed
// point of the rail-pinned radial equilibrium and the tangential ledger,
// found by alternating angle-descent (tau_I, tau_O -> 0) with radial Newton
// re-equilibration (frozen kappa, omega live on the rail). NO environment.
// At the fixed point: radial residual ~1e-6 with a fully restoring basin
// (-0.63/-2.00/-6.27); tau_I = 0.0006, tau_O = 0.0004 (the middle's +0.227
// rail pump is the escapement's, as always); size self-selected at
// R_M(eq) = lambda/kappa_frozen ~ 3.49 in units kappa*epsilon^2/c_f^2 — the
// braid's absolute size is a DERIVED constant of the family, sitting well
// above the d0 = R_MCB floor. Geometry (shape at equilibrium):
export const SELF_EQUILIBRATED_V5 = Object.freeze({
  geo: Object.freeze({ qI: 0.55, qO: 0.75, alphaI: -27.15 * d, alphaM: 16.24 * d, alphaO: 64.5 * d, thetaI: -16.2 * d, thetaO: 339.5 * d }),
  ReqOverKappa: 3.494,
});

export function diagnosticReport() {
  return { schema: SCHEMA, specPacketRef: SPEC_PACKET_REF,
    championBaseline: supportRatios({}),
    v1Baseline: supportRatios({ geo: SUPPORT_V1_GEO }),
    v2Baseline: supportRatios({ geo: TANGENTIAL_CLOSURE_V2 }),
    v3Baseline: supportRatios({ geo: SELF_CONSISTENT_V3.geo }),
    ...FAIL_CLOSED };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) {
  process.stdout.write(JSON.stringify(diagnosticReport(), null, process.argv.includes("--pretty") ? 2 : 0) + "\n");
}
