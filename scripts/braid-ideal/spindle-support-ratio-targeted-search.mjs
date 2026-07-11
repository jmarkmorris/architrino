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

// TILT-STIFFNESS BLOCK (Section 58 named gap; the Row 6 native killer). The
// coordinates are per-layer plane inclinations eta_L about a transverse axis
// (x): each layer keeps its circular motion, rigidly rotated by R_x(eta_L).
// The generalized force is the cycle-averaged x-torque on the layer at kappa*
// (zero at eta=0 by reflection symmetry — tilt equilibrium is automatic; a
// layer in exact circular motion about its tilted normal needs zero net
// torque, so the wake torque IS the generalized force). K_tilt[i][j] =
// d<T_x on layer i>/d eta_j. VALIDATION ROW built in: the global mode
// (1,1,1) is a symmetry of the bare braid (isotropy) and must be null.
// DECLARED CAVEAT: layers carry spin angular momentum, so the true linear
// dynamics is gyroscopic (lambda^2 M + lambda G + K); a restoring K is the
// seed-grade gate (necessary), the full verdict is the native run's.
export function tiltStiffness({ geo = SELF_EQUILIBRATED_V5.geo, cTrans = 1.0, Nt = 8, soft = 0.02, eta = 0.03 } = {}) {
  const seed = buildBraid({ u: 0, cTrans, geo });
  const w = seed.omega, period = 2 * Math.PI / w;
  const kap = residuals({ u: 0, cTrans, geo }, { soft }).kappaStar;
  const cf = 1;
  const rotX = (v, c, s) => [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2]];
  const mk = (etas) => seed.sites.map((s) => {
    const L = s.name === "I" ? 0 : s.name === "M" ? 1 : 2;
    const c = Math.cos(etas[L]), sn = Math.sin(etas[L]);
    return {
      pol: s.pol, L,
      pos: (t) => { const a = w * t + s.th, ca = Math.cos(s.alpha); return rotX([s.sgn*s.R*ca*Math.cos(a), s.sgn*s.R*ca*Math.sin(a), s.sgn*s.R*Math.sin(s.alpha)], c, sn); },
      vel: (t) => { const a = w * t + s.th, v = s.sgn*s.R*Math.cos(s.alpha)*w; return rotX([-v*Math.sin(a), v*Math.cos(a), 0], c, sn); },
    };
  });
  const torques = (etas) => {
    const sites = mk(etas);
    const T = [0, 0, 0];
    for (let k = 0; k < Nt; k++) {
      const t = (k / Nt) * period;
      for (let i = 0; i < sites.length; i++) {
        const rec = sites[i];
        const Xi = rec.pos(t), vi = rec.vel(t);
        const F = [0, 0, 0];
        for (let j = 0; j < sites.length; j++) {
          if (j === i) continue;
          const src = sites[j];
          // causal root scan (bounded lookback, bisection refine)
          const g = (te) => { const p = src.pos(te); return Math.hypot(Xi[0]-p[0], Xi[1]-p[1], Xi[2]-p[2]) - cf * (t - te); };
          const dmax = 4, N = 2400;
          let g0 = g(t - dmax);
          for (let kk = 1; kk <= N; kk++) {
            const te = t - dmax + dmax * (kk / N);
            if (te >= t - 1e-9) break;
            const g1 = g(te);
            if ((g0 < 0) !== (g1 < 0)) {
              let lo = t - dmax + dmax * ((kk - 1) / N), hi = te; const gl = g(lo);
              for (let b = 0; b < 50; b++) { const mid = (lo + hi) / 2; if ((gl < 0) === (g(mid) < 0)) lo = mid; else hi = mid; }
              const te0 = (lo + hi) / 2;
              const p = src.pos(te0);
              const dx = [Xi[0]-p[0], Xi[1]-p[1], Xi[2]-p[2]];
              const r = Math.hypot(dx[0], dx[1], dx[2]);
              if (r > 1e-9) {
                const rh = [dx[0]/r, dx[1]/r, dx[2]/r];
                const vs = src.vel(te0);
                const Ds = cf - (vs[0]*rh[0] + vs[1]*rh[1] + vs[2]*rh[2]);
                const Dt = cf - (vi[0]*rh[0] + vi[1]*rh[1] + vi[2]*rh[2]);
                const mfac = (Dt * Ds) / (Ds * Ds + soft * soft);
                const wgt = (rec.pol * src.pol) * mfac / (r * r);
                F[0] += wgt * rh[0]; F[1] += wgt * rh[1]; F[2] += wgt * rh[2];
              }
            }
            g0 = g1;
          }
        }
        // x-torque about the origin on this member, kappa-scaled, cycle-averaged
        T[rec.L] += kap * (Xi[1] * F[2] - Xi[2] * F[1]) / Nt;
      }
    }
    return T;
  };
  const K = [[0,0,0],[0,0,0],[0,0,0]];
  for (let j = 0; j < 3; j++) {
    const ep = [0, 0, 0], em = [0, 0, 0];
    ep[j] = eta; em[j] = -eta;
    const Tp = torques(ep), Tm = torques(em);
    for (let i = 0; i < 3; i++) K[i][j] = (Tp[i] - Tm[i]) / (2 * eta);
  }
  const sym = K.map((row, i) => row.map((v, j) => (v + K[j][i]) / 2));
  const eig = jacobiEigSym(sym);
  // global-mode null witness: K acting on (1,1,1)
  const g1 = [0, 1, 2].map((i) => K[i][0] + K[i][1] + K[i][2]);
  const globalResidual = Math.hypot(...g1);
  const scale = Math.max(...K.flat().map(Math.abs));
  // exact quotient by the global null (right eigenvector (1,1,1), eigenvalue 0):
  // express K's action on u1=(1,-1,0), u2=(0,1,-1) modulo (1,1,1) and take the
  // 2x2 spectrum — the true relative-tilt eigenvalues (possibly complex: whirl).
  const applyK = (u) => [0, 1, 2].map((i) => K[i][0]*u[0] + K[i][1]*u[1] + K[i][2]*u[2]);
  const inBasis = (v) => {
    const c = (v[0] + v[1] + v[2]) / 3;
    const a = v[0] - c;          // coefficient of u1 = (1,-1,0): v0 = a + c
    const b = c - v[2];          // coefficient of u2 = (0,1,-1): v2 = -b + c
    return [a, b];
  };
  const q1 = inBasis(applyK([1, -1, 0])), q2 = inBasis(applyK([0, 1, -1]));
  const Q = [[q1[0], q2[0]], [q1[1], q2[1]]];
  const tr = Q[0][0] + Q[1][1], det = Q[0][0]*Q[1][1] - Q[0][1]*Q[1][0];
  const disc = tr * tr - 4 * det;
  const relativeEigen = disc >= 0
    ? [{ re: (tr + Math.sqrt(disc)) / 2, im: 0 }, { re: (tr - Math.sqrt(disc)) / 2, im: 0 }]
    : [{ re: tr / 2, im: Math.sqrt(-disc) / 2 }, { re: tr / 2, im: -Math.sqrt(-disc) / 2 }];
  return { K, symEigen: eig, globalModeResidual: globalResidual, relScale: scale,
    globalNullOk: globalResidual < 0.05 * Math.max(scale, 1e-9),
    quotient: Q, relativeEigen,
    restoringRelative: relativeEigen.every((e) => e.re < 0) };
}

// GYROSCOPIC-CIRCULATORY AXIS ANALYSIS (Section 59 declared caveat, executed;
// braid-angular-momentum-spin queue item 12 deliverable 4). The layers carry
// spin angular momentum, so the true linearized axis dynamics is the quadratic
// pencil lambda^2 M + lambda G + K over BOTH transverse tilt directions per
// layer, coords q = (eta^x_I, eta^x_M, eta^x_O, eta^y_I, eta^y_M, eta^y_O):
//   M = diag(m_L) x I_2   with m_L = rho_L^2 + 2 z_L^2 (cycle-averaged layer
//       tilt inertia at unit site weight — the same per-unit-mass kinematic
//       convention as the support/need rows),
//   G = [[0, +J_d], [-J_d, 0]] with J_L = 2 rho_L^2 omega (the layer spin
//       angular momenta: m eta''_x + J eta'_y = T_x, m eta''_y - J eta'_x = T_y),
//   K = the measured 6x6 tilt Jacobian (both torque components under both tilt
//       axes, same cycle-averaged kappa*-scaled exact-causal-root torque
//       evaluator as tiltStiffness). The x-x block reproduces the Section 59
//       block; the cross blocks are the CIRCULATORY part (causal-delay
//       asymmetry — the field in flight carries angular momentum), and the
//       cycle average makes the response z-rotation covariant, witnessed by
//       the block identities E ~ A, D ~ -B.
// BASELINE-TORQUE TRANSPORT (the honest linearization): the layers carry
// nonzero baseline z-torques tau_L (the middle's rail pump; tau_I, tau_O ~ 0
// at V5), so the spin transport d/dt(J n_hat) contributes J-dot n_hat = tau_L
// n_hat terms: the equations are
//   m eta''_x + J eta'_y + tau eta_y = T_x(q),
//   m eta''_y - J eta'_x - tau eta_x = T_y(q),
// i.e. the pencil is P(lambda) = lambda^2 M + lambda G + Gamma - K with
// Gamma = [[0, +tau_d], [-tau_d, 0]]. VALIDATION ROWS built into the physics:
// (i) the x-x block row sums vanish (the Section 59 global null); (ii) the
// cross-block row sums equal the measured baseline z-torques EXACTLY (the
// global tilt reorients the pump torque — the rail pump entering the axis
// sector), so K_eff = K - Gamma annihilates both global tilts and lambda = 0
// is an exact double root of P.
// Eigenvalues: det P(lambda) = 0, degree 12, solved by Durand-Kerner on the
// determinant evaluation (leading coefficient det M).
// QUOTIENT DISCIPLINE: the global-tilt double zero root is deflated by
// identification before any stability readout. Verdict rows: whirl modes
// (complex pairs), flutter = any deflated root with Re(lambda) > 0.
// pumpAbsorbed: the escapement-absorbs-the-pump counterfactual (tau_M set to
// zero in Gamma) — the Section 60 route-(b) question, "is the axis sector
// independently fatal even with the pump absorbed."
// Seed grade: cycle-averaged rigid-layer reduction; no delay-memory
// (tilt-rate-dependent) wake damping block — G is the kinematic spin
// transport only; single-time rigid booking on the braid legs.
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.
export function gyroscopicTiltAnalysis({ geo = SELF_EQUILIBRATED_V5.geo, cTrans = 1.0, Nt = 8, soft = 0.02, eta = 0.03, pumpAbsorbed = false } = {}) {
  const seed = buildBraid({ u: 0, cTrans, geo });
  const w = seed.omega, period = 2 * Math.PI / w;
  const kap = residuals({ u: 0, cTrans, geo }, { soft }).kappaStar;
  const cf = 1;
  // layer kinematic constants (unit site weight, cycle-averaged)
  const layerConst = [];
  for (const i of [0, 2, 4]) {
    const s = seed.sites[i];
    const rho = s.R * Math.cos(s.alpha), z = s.R * Math.sin(s.alpha);
    layerConst.push({ name: s.name, m: rho * rho + 2 * z * z, J: 2 * rho * rho * w });
  }
  const rotX = (v, c, s) => [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2]];
  const rotY = (v, c, s) => [c * v[0] + s * v[2], v[1], -s * v[0] + c * v[2]];
  const mk = (ex, ey) => seed.sites.map((s) => {
    const L = s.name === "I" ? 0 : s.name === "M" ? 1 : 2;
    const cx = Math.cos(ex[L]), sx = Math.sin(ex[L]);
    const cy = Math.cos(ey[L]), sy = Math.sin(ey[L]);
    return {
      pol: s.pol, L,
      pos: (t) => { const a = w * t + s.th, ca = Math.cos(s.alpha); return rotY(rotX([s.sgn*s.R*ca*Math.cos(a), s.sgn*s.R*ca*Math.sin(a), s.sgn*s.R*Math.sin(s.alpha)], cx, sx), cy, sy); },
      vel: (t) => { const a = w * t + s.th, v = s.sgn*s.R*Math.cos(s.alpha)*w; return rotY(rotX([-v*Math.sin(a), v*Math.cos(a), 0], cx, sx), cy, sy); },
    };
  });
  // cycle-averaged kappa*-scaled x- and y-torques per layer on exact causal
  // roots (same evaluator body as tiltStiffness, both components read out)
  const torquesXY = (ex, ey) => {
    const sites = mk(ex, ey);
    const Tx = [0, 0, 0], Ty = [0, 0, 0], Tz = [0, 0, 0];
    for (let k = 0; k < Nt; k++) {
      const t = (k / Nt) * period;
      for (let i = 0; i < sites.length; i++) {
        const rec = sites[i];
        const Xi = rec.pos(t), vi = rec.vel(t);
        const F = [0, 0, 0];
        for (let j = 0; j < sites.length; j++) {
          if (j === i) continue;
          const src = sites[j];
          const g = (te) => { const p = src.pos(te); return Math.hypot(Xi[0]-p[0], Xi[1]-p[1], Xi[2]-p[2]) - cf * (t - te); };
          const dmax = 4, N = 2400;
          let g0 = g(t - dmax);
          for (let kk = 1; kk <= N; kk++) {
            const te = t - dmax + dmax * (kk / N);
            if (te >= t - 1e-9) break;
            const g1 = g(te);
            if ((g0 < 0) !== (g1 < 0)) {
              let lo = t - dmax + dmax * ((kk - 1) / N), hi = te; const gl = g(lo);
              for (let b = 0; b < 50; b++) { const mid = (lo + hi) / 2; if ((gl < 0) === (g(mid) < 0)) lo = mid; else hi = mid; }
              const te0 = (lo + hi) / 2;
              const p = src.pos(te0);
              const dx = [Xi[0]-p[0], Xi[1]-p[1], Xi[2]-p[2]];
              const r = Math.hypot(dx[0], dx[1], dx[2]);
              if (r > 1e-9) {
                const rh = [dx[0]/r, dx[1]/r, dx[2]/r];
                const vs = src.vel(te0);
                const Ds = cf - (vs[0]*rh[0] + vs[1]*rh[1] + vs[2]*rh[2]);
                const Dt = cf - (vi[0]*rh[0] + vi[1]*rh[1] + vi[2]*rh[2]);
                const mfac = (Dt * Ds) / (Ds * Ds + soft * soft);
                const wgt = (rec.pol * src.pol) * mfac / (r * r);
                F[0] += wgt * rh[0]; F[1] += wgt * rh[1]; F[2] += wgt * rh[2];
              }
            }
            g0 = g1;
          }
        }
        Tx[rec.L] += kap * (Xi[1] * F[2] - Xi[2] * F[1]) / Nt;
        Ty[rec.L] += kap * (Xi[2] * F[0] - Xi[0] * F[2]) / Nt;
        Tz[rec.L] += kap * (Xi[0] * F[1] - Xi[1] * F[0]) / Nt;
      }
    }
    return { Tx, Ty, Tz };
  };
  // baseline layer torques at eta = 0: transverse rows vanish (tilt
  // equilibrium); the z rows are the layer spin torques (the rail pump on M)
  const base = torquesXY([0, 0, 0], [0, 0, 0]);
  const tau0 = base.Tz.slice();
  // full 6x6 tilt Jacobian by central differences (blocks A = dTx/dex,
  // B = dTx/dey, D = dTy/dex, E = dTy/dey)
  const A = [[0,0,0],[0,0,0],[0,0,0]], B = [[0,0,0],[0,0,0],[0,0,0]];
  const D = [[0,0,0],[0,0,0],[0,0,0]], E = [[0,0,0],[0,0,0],[0,0,0]];
  for (let j = 0; j < 3; j++) {
    const ep = [0,0,0], em = [0,0,0];
    ep[j] = eta; em[j] = -eta;
    const px = torquesXY(ep, [0,0,0]), mx = torquesXY(em, [0,0,0]);
    const py = torquesXY([0,0,0], ep), my = torquesXY([0,0,0], em);
    for (let i = 0; i < 3; i++) {
      A[i][j] = (px.Tx[i] - mx.Tx[i]) / (2 * eta);
      D[i][j] = (px.Ty[i] - mx.Ty[i]) / (2 * eta);
      B[i][j] = (py.Tx[i] - my.Tx[i]) / (2 * eta);
      E[i][j] = (py.Ty[i] - my.Ty[i]) / (2 * eta);
    }
  }
  const scale = Math.max(...A.flat().map(Math.abs), ...B.flat().map(Math.abs));
  // z-rotation covariance witnesses on the cycle-averaged response
  const covarianceEA = Math.max(...A.map((r, i) => r.map((v, j) => Math.abs(E[i][j] - v))).flat());
  const covarianceDB = Math.max(...B.map((r, i) => r.map((v, j) => Math.abs(D[i][j] + v))).flat());
  // global-tilt null witnesses: the x-x block row sums vanish (isotropy); the
  // cross-block row sums equal the baseline layer z-torques (spin transport)
  const rowSum = (Mx) => Math.max(...[0,1,2].map((i) => Math.abs(Mx[i][0] + Mx[i][1] + Mx[i][2])));
  const globalNullA = rowSum(A);
  const crossRowSums = [0,1,2].map((i) => B[i][0] + B[i][1] + B[i][2]);
  const pumpWitness = Math.max(...[0,1,2].map((i) => Math.abs(crossRowSums[i] - tau0[i])));
  // assemble the pencil P(lambda) = lambda^2 M6 + lambda G6 + Gamma - K6
  const m = layerConst.map((l) => l.m), J = layerConst.map((l) => l.J);
  const tau = pumpAbsorbed ? [tau0[0], 0, tau0[2]] : tau0;
  const K6 = [
    [A[0][0],A[0][1],A[0][2], B[0][0],B[0][1],B[0][2]],
    [A[1][0],A[1][1],A[1][2], B[1][0],B[1][1],B[1][2]],
    [A[2][0],A[2][1],A[2][2], B[2][0],B[2][1],B[2][2]],
    [D[0][0],D[0][1],D[0][2], E[0][0],E[0][1],E[0][2]],
    [D[1][0],D[1][1],D[1][2], E[1][0],E[1][1],E[1][2]],
    [D[2][0],D[2][1],D[2][2], E[2][0],E[2][1],E[2][2]],
  ];
  const M6 = Array.from({ length: 6 }, (_, i) => Array.from({ length: 6 }, (_, j) => (i === j ? m[i % 3] : 0)));
  const G6 = Array.from({ length: 6 }, () => Array(6).fill(0));
  for (let l = 0; l < 3; l++) { G6[l][3 + l] = +J[l]; G6[3 + l][l] = -J[l]; }
  const Gam6 = Array.from({ length: 6 }, () => Array(6).fill(0));
  for (let l = 0; l < 3; l++) { Gam6[l][3 + l] = +tau[l]; Gam6[3 + l][l] = -tau[l]; }
  // complex helpers
  const cAdd = (a, b) => [a[0]+b[0], a[1]+b[1]];
  const cSub = (a, b) => [a[0]-b[0], a[1]-b[1]];
  const cMul = (a, b) => [a[0]*b[0]-a[1]*b[1], a[0]*b[1]+a[1]*b[0]];
  const cDiv = (a, b) => { const d2 = b[0]*b[0]+b[1]*b[1]; return [(a[0]*b[0]+a[1]*b[1])/d2, (a[1]*b[0]-a[0]*b[1])/d2]; };
  const cAbs = (a) => Math.hypot(a[0], a[1]);
  const detC = (Min) => { // 6x6 complex determinant, partial-pivot Gaussian elimination
    const n = Min.length;
    const Mx = Min.map((r) => r.map((v) => [v[0], v[1]]));
    let det = [1, 0];
    for (let c = 0; c < n; c++) {
      let p = c;
      for (let r = c + 1; r < n; r++) if (cAbs(Mx[r][c]) > cAbs(Mx[p][c])) p = r;
      if (cAbs(Mx[p][c]) < 1e-300) return [0, 0];
      if (p !== c) { const t = Mx[p]; Mx[p] = Mx[c]; Mx[c] = t; det = cMul(det, [-1, 0]); }
      det = cMul(det, Mx[c][c]);
      for (let r = c + 1; r < n; r++) {
        const f = cDiv(Mx[r][c], Mx[c][c]);
        for (let cc = c; cc < n; cc++) Mx[r][cc] = cSub(Mx[r][cc], cMul(f, Mx[c][cc]));
      }
    }
    return det;
  };
  const pencil = (lam) => {
    const l2 = cMul(lam, lam);
    const P = [];
    for (let i = 0; i < 6; i++) {
      P.push([]);
      for (let j = 0; j < 6; j++) {
        P[i].push(cAdd(cAdd(cMul(l2, [M6[i][j], 0]), cMul(lam, [G6[i][j], 0])), [Gam6[i][j] - K6[i][j], 0]));
      }
    }
    return detC(P);
  };
  // Durand-Kerner on the degree-12 determinant polynomial
  const leading = m[0]*m[0]*m[1]*m[1]*m[2]*m[2]; // det(M6)
  const deg2 = 12;
  let roots = Array.from({ length: deg2 }, (_, i) => {
    const ang = (2 * Math.PI * i) / deg2 + 0.4;
    const rad = 1.5 * Math.max(Math.sqrt(scale / Math.min(...m)), Math.max(...J) / Math.min(...m));
    return [rad * Math.cos(ang), rad * Math.sin(ang)];
  });
  let dkResidual = Infinity;
  for (let it = 0; it < 400; it++) {
    let moved = 0;
    for (let i = 0; i < deg2; i++) {
      let denom = [leading, 0];
      for (let j = 0; j < deg2; j++) if (j !== i) denom = cMul(denom, cSub(roots[i], roots[j]));
      const delta = cDiv(pencil(roots[i]), denom);
      roots[i] = cSub(roots[i], delta);
      moved = Math.max(moved, cAbs(delta));
    }
    dkResidual = moved;
    if (moved < 1e-13) break;
  }
  const rootRows = roots.map((r) => ({ re: r[0], im: r[1], pencilResidual: cAbs(pencil(r)) }))
    .sort((x, y) => y.re - x.re);
  // quotient discipline: deflate the global-tilt double zero root before any
  // stability readout. In the physical cell the pair is exact (|lambda| at
  // numerical zero); in the pumpAbsorbed counterfactual Gamma_M is removed
  // while K keeps the measured pump content, so the pair is perturbed off
  // zero and is identified as the two smallest-|lambda| roots (reported).
  const byMag = [...rootRows].sort((x, y) => Math.hypot(x.re, x.im) - Math.hypot(y.re, y.im));
  const globalPair = byMag.slice(0, 2);
  const deflated = rootRows.filter((r) => !globalPair.includes(r));
  const growing = deflated.filter((r) => r.re > 1e-6);
  const maxGrowth = deflated.length ? deflated[0] : null;
  // mode shape of the max-growth root: null vector of P(lambda) by Gaussian
  // elimination with the free variable pinned (rank-5 at a simple root);
  // reported as per-layer complex tilt amplitudes zeta_L = eta^x_L + i eta^y_L
  let flutterModeShape = null;
  if (maxGrowth && maxGrowth.re > 1e-6) {
    const lam = [maxGrowth.re, maxGrowth.im];
    const l2 = cMul(lam, lam);
    const P = [];
    for (let i = 0; i < 6; i++) {
      P.push([]);
      for (let j = 0; j < 6; j++) P[i].push(cAdd(cAdd(cMul(l2, [M6[i][j], 0]), cMul(lam, [G6[i][j], 0])), [Gam6[i][j] - K6[i][j], 0]));
    }
    // eliminate to row echelon with partial pivoting, then back-substitute x6 = 1
    const n = 6, piv = [0, 1, 2, 3, 4, 5];
    for (let c = 0; c < n - 1; c++) {
      let p = c;
      for (let r = c + 1; r < n; r++) if (cAbs(P[r][c]) > cAbs(P[p][c])) p = r;
      if (p !== c) { const t = P[p]; P[p] = P[c]; P[c] = t; }
      for (let r = c + 1; r < n; r++) {
        if (cAbs(P[c][c]) < 1e-300) continue;
        const f = cDiv(P[r][c], P[c][c]);
        for (let cc = c; cc < n; cc++) P[r][cc] = cSub(P[r][cc], cMul(f, P[c][cc]));
      }
    }
    const x = Array.from({ length: n }, () => [0, 0]);
    x[n - 1] = [1, 0];
    for (let r = n - 2; r >= 0; r--) {
      let s = [0, 0];
      for (let c = r + 1; c < n; c++) s = cAdd(s, cMul(P[r][c], x[c]));
      x[r] = cAbs(P[r][r]) < 1e-300 ? [0, 0] : cDiv([-s[0], -s[1]], P[r][r]);
    }
    // zeta_L = eta^x_L + i eta^y_L, normalized to the largest amplitude
    const zeta = [0, 1, 2].map((l) => cAdd(x[l], cMul([0, 1], x[3 + l])));
    const nrm = Math.max(...zeta.map(cAbs)) || 1;
    flutterModeShape = ["I", "M", "O"].map((nm, l) => ({
      layer: nm, amplitude: cAbs(zeta[l]) / nrm,
      phaseDeg: (Math.atan2(zeta[l][1], zeta[l][0]) * 180) / Math.PI,
    }));
  }
  return {
    layers: layerConst, omega: w, kappaStar: kap, pumpAbsorbed,
    blocks: { A, B, D, E }, K6, M: m, Jspin: J, tau0, tauUsed: tau,
    baselineTransverse: Math.max(...base.Tx.map(Math.abs), ...base.Ty.map(Math.abs)),
    covarianceWitness: { EminusA: covarianceEA, DplusB: covarianceDB, scale },
    globalNull: { A: globalNullA, crossRowSums, pumpWitness,
      ok: globalNullA < 0.05 * Math.max(scale, 1e-9) && pumpWitness < 0.05 * Math.max(scale, 1e-9) },
    dkResidual,
    eigenvalues: rootRows,
    globalPairDeflated: globalPair.map((r) => ({ re: r.re, im: r.im })),
    quotientEigenvalues: deflated,
    whirl: deflated.filter((r) => Math.abs(r.im) > 1e-6).length,
    flutter: growing.length > 0,
    flutterModes: growing,
    maxGrowthRate: maxGrowth ? maxGrowth.re : null,
    maxGrowthWhirlFrequency: maxGrowth ? Math.abs(maxGrowth.im) : null,
    flutterModeShape,
  };
}

// DELAY-MEMORY TILT-RATE BLOCK AND THE COMPLETED AXIS PENCIL (Section 61
// declared caveat, executed; route (b) of its next closure goal). The
// gyroscopic analysis above carries only the KINEMATIC spin transport in
// lambda*G; the causal wake also responds to tilt RATES — the field in
// flight arrives from where the layer was — and that response is measurable
// on the same evaluator. Measurement: per readout sample t_k, build the
// worldline family whose layer tilt is zero AT t_k with a constant tilt rate
// etaDot (angles eta(s) = etaDot*(s - t_k)), evaluate the cycle-averaged
// kappa*-scaled torques on exact causal roots, and difference centrally in
// etaDot: D[i][j] = dT_i/d(etaDot_j), both torque components under both tilt
// axes (6x6; z-rotation covariance witnessed). D contains the delayed-K
// content (roots see the past tilt) plus the intrinsic velocity response;
// it is the honest linear damping/circulatory-velocity block of the axis
// sector. The completed pencil is
//   P(lambda) = lambda^2 M + lambda (G + D) + Gamma - K,
// with the exact global-tilt double zero root unchanged (P(0) = Gamma - K).
// extraDamping adds an isotropic diagonal damping d*I on the velocity block
// (the requirement-mapping knob: what damping magnitude turns the spectrum
// restoring); rateBlockScale scales the measured D block (0 reproduces the
// Section 61 kinematic-transport-only pencil).
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.
export function gyroscopicTiltAnalysisFull({ geo = SELF_EQUILIBRATED_V5.geo, cTrans = 1.0, Nt = 8, soft = 0.02, eta = 0.03, etaDot = 0.02, extraDamping = 0, extraDampingLayers = null, velocityBlockAdd = null, rateBlockScale = 1, pumpAbsorbed = false } = {}) {
  const seed = buildBraid({ u: 0, cTrans, geo });
  const w = seed.omega, period = 2 * Math.PI / w;
  const kap = residuals({ u: 0, cTrans, geo }, { soft }).kappaStar;
  const cf = 1;
  const layerConst = [];
  for (const i of [0, 2, 4]) {
    const s = seed.sites[i];
    const rho = s.R * Math.cos(s.alpha), z = s.R * Math.sin(s.alpha);
    layerConst.push({ name: s.name, m: rho * rho + 2 * z * z, J: 2 * rho * rho * w });
  }
  const rotX = (v, c, s) => [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2]];
  const rotY = (v, c, s) => [c * v[0] + s * v[2], v[1], -s * v[0] + c * v[2]];
  const crossX = (v) => [0, -v[2], v[1]];   // x-hat cross v
  const crossY = (v) => [v[2], 0, -v[0]];   // y-hat cross v
  // worldline family: tilt angles ax(s) = ex + exDot*(s - tRef) about x, then
  // ay(s) about y; exact velocity including the rotation-rate terms
  const mk = (ex, ey, exDot, eyDot, tRef) => seed.sites.map((s) => {
    const L = s.name === "I" ? 0 : s.name === "M" ? 1 : 2;
    const p0 = (t) => { const a = w * t + s.th, ca = Math.cos(s.alpha); return [s.sgn*s.R*ca*Math.cos(a), s.sgn*s.R*ca*Math.sin(a), s.sgn*s.R*Math.sin(s.alpha)]; };
    const v0 = (t) => { const a = w * t + s.th, v = s.sgn*s.R*Math.cos(s.alpha)*w; return [-v*Math.sin(a), v*Math.cos(a), 0]; };
    return {
      pol: s.pol, L,
      pos: (t) => {
        const ax = ex[L] + exDot[L] * (t - tRef), ay = ey[L] + eyDot[L] * (t - tRef);
        return rotY(rotX(p0(t), Math.cos(ax), Math.sin(ax)), Math.cos(ay), Math.sin(ay));
      },
      vel: (t) => {
        const ax = ex[L] + exDot[L] * (t - tRef), ay = ey[L] + eyDot[L] * (t - tRef);
        const cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay);
        const pX = rotX(p0(t), cx, sx);
        // d/dt [Ry Rx p0] = eyDot yhat x (Ry Rx p0) + Ry (exDot xhat x (Rx p0)) + Ry Rx v0
        const term1 = crossY(rotY(pX, cy, sy)).map((v) => eyDot[L] * v);
        const term2 = rotY(crossX(pX).map((v) => exDot[L] * v), cy, sy);
        const term3 = rotY(rotX(v0(t), cx, sx), cy, sy);
        return [term1[0]+term2[0]+term3[0], term1[1]+term2[1]+term3[1], term1[2]+term2[2]+term3[2]];
      },
    };
  });
  // cycle-averaged torques; for rate response each readout sample uses its
  // own worldline with tRef = t_k (zero tilt, finite rate at readout)
  const torques = (ex, ey, exDot, eyDot, perSampleRef) => {
    const Tx = [0, 0, 0], Ty = [0, 0, 0], Tz = [0, 0, 0];
    for (let k = 0; k < Nt; k++) {
      const t = (k / Nt) * period;
      const sites = mk(ex, ey, exDot, eyDot, perSampleRef ? t : 0);
      for (let i = 0; i < sites.length; i++) {
        const rec = sites[i];
        const Xi = rec.pos(t), vi = rec.vel(t);
        const F = [0, 0, 0];
        for (let j = 0; j < sites.length; j++) {
          if (j === i) continue;
          const src = sites[j];
          const g = (te) => { const p = src.pos(te); return Math.hypot(Xi[0]-p[0], Xi[1]-p[1], Xi[2]-p[2]) - cf * (t - te); };
          const dmax = 4, N = 2400;
          let g0 = g(t - dmax);
          for (let kk = 1; kk <= N; kk++) {
            const te = t - dmax + dmax * (kk / N);
            if (te >= t - 1e-9) break;
            const g1 = g(te);
            if ((g0 < 0) !== (g1 < 0)) {
              let lo = t - dmax + dmax * ((kk - 1) / N), hi = te; const gl = g(lo);
              for (let b = 0; b < 50; b++) { const mid = (lo + hi) / 2; if ((gl < 0) === (g(mid) < 0)) lo = mid; else hi = mid; }
              const te0 = (lo + hi) / 2;
              const p = src.pos(te0);
              const dx = [Xi[0]-p[0], Xi[1]-p[1], Xi[2]-p[2]];
              const r = Math.hypot(dx[0], dx[1], dx[2]);
              if (r > 1e-9) {
                const rh = [dx[0]/r, dx[1]/r, dx[2]/r];
                const vs = src.vel(te0);
                const Ds = cf - (vs[0]*rh[0] + vs[1]*rh[1] + vs[2]*rh[2]);
                const Dt = cf - (vi[0]*rh[0] + vi[1]*rh[1] + vi[2]*rh[2]);
                const mfac = (Dt * Ds) / (Ds * Ds + soft * soft);
                const wgt = (rec.pol * src.pol) * mfac / (r * r);
                F[0] += wgt * rh[0]; F[1] += wgt * rh[1]; F[2] += wgt * rh[2];
              }
            }
            g0 = g1;
          }
        }
        Tx[rec.L] += kap * (Xi[1] * F[2] - Xi[2] * F[1]) / Nt;
        Ty[rec.L] += kap * (Xi[2] * F[0] - Xi[0] * F[2]) / Nt;
        Tz[rec.L] += kap * (Xi[0] * F[1] - Xi[1] * F[0]) / Nt;
      }
    }
    return { Tx, Ty, Tz };
  };
  const Z = [0, 0, 0];
  const base = torques(Z, Z, Z, Z, false);
  const tau0 = base.Tz.slice();
  // static stiffness blocks (as in gyroscopicTiltAnalysis)
  const A = [[0,0,0],[0,0,0],[0,0,0]], B = [[0,0,0],[0,0,0],[0,0,0]];
  const Dx = [[0,0,0],[0,0,0],[0,0,0]], E = [[0,0,0],[0,0,0],[0,0,0]];
  for (let j = 0; j < 3; j++) {
    const ep = [0,0,0], em = [0,0,0];
    ep[j] = eta; em[j] = -eta;
    const px = torques(ep, Z, Z, Z, false), mx = torques(em, Z, Z, Z, false);
    const py = torques(Z, ep, Z, Z, false), my = torques(Z, em, Z, Z, false);
    for (let i = 0; i < 3; i++) {
      A[i][j] = (px.Tx[i] - mx.Tx[i]) / (2 * eta);
      Dx[i][j] = (px.Ty[i] - mx.Ty[i]) / (2 * eta);
      B[i][j] = (py.Tx[i] - my.Tx[i]) / (2 * eta);
      E[i][j] = (py.Ty[i] - my.Ty[i]) / (2 * eta);
    }
  }
  // delay-memory tilt-rate blocks: P = dTx/dexDot, Q = dTx/deyDot,
  // Rl = dTy/dexDot, S = dTy/deyDot (per-sample tRef: zero tilt at readout)
  const P = [[0,0,0],[0,0,0],[0,0,0]], Q = [[0,0,0],[0,0,0],[0,0,0]];
  const Rl = [[0,0,0],[0,0,0],[0,0,0]], S = [[0,0,0],[0,0,0],[0,0,0]];
  for (let j = 0; j < 3; j++) {
    const rp = [0,0,0], rm = [0,0,0];
    rp[j] = etaDot; rm[j] = -etaDot;
    const px = torques(Z, Z, rp, Z, true), mx = torques(Z, Z, rm, Z, true);
    const py = torques(Z, Z, Z, rp, true), my = torques(Z, Z, Z, rm, true);
    for (let i = 0; i < 3; i++) {
      P[i][j] = (px.Tx[i] - mx.Tx[i]) / (2 * etaDot);
      Rl[i][j] = (px.Ty[i] - mx.Ty[i]) / (2 * etaDot);
      Q[i][j] = (py.Tx[i] - my.Tx[i]) / (2 * etaDot);
      S[i][j] = (py.Ty[i] - my.Ty[i]) / (2 * etaDot);
    }
  }
  const scale = Math.max(...A.flat().map(Math.abs), ...B.flat().map(Math.abs));
  const covK = Math.max(...A.map((r, i) => r.map((v, j) => Math.abs(E[i][j] - v))).flat(),
    ...B.map((r, i) => r.map((v, j) => Math.abs(Dx[i][j] + v))).flat());
  const covD = Math.max(...P.map((r, i) => r.map((v, j) => Math.abs(S[i][j] - v))).flat(),
    ...Q.map((r, i) => r.map((v, j) => Math.abs(Rl[i][j] + v))).flat());
  const rowSum = (Mx) => Math.max(...[0,1,2].map((i) => Math.abs(Mx[i][0] + Mx[i][1] + Mx[i][2])));
  const crossRowSums = [0,1,2].map((i) => B[i][0] + B[i][1] + B[i][2]);
  const pumpWitness = Math.max(...[0,1,2].map((i) => Math.abs(crossRowSums[i] - tau0[i])));
  // assemble
  const m = layerConst.map((l) => l.m), J = layerConst.map((l) => l.J);
  const tau = pumpAbsorbed ? [tau0[0], 0, tau0[2]] : tau0;
  const K6 = [
    ...[0,1,2].map((i) => [...A[i], ...B[i]]),
    ...[0,1,2].map((i) => [...Dx[i], ...E[i]]),
  ];
  // torque velocity-response enters the equations of motion with a MINUS on
  // the pencil's velocity coefficient: m*qdd + (G)*qd + Gamma*q = K*q + D6*qd
  //  => P(lambda) = lambda^2 M + lambda (G - D6_torque) + Gamma - K, where
  // D6_torque[i][j] = dT_i/d(qdot_j) scaled by rateBlockScale, minus any
  // added isotropic absorber d*I (extraDamping >= 0 damps).
  const D6t = [
    ...[0,1,2].map((i) => [...P[i], ...Q[i]]),
    ...[0,1,2].map((i) => [...Rl[i], ...S[i]]),
  ];
  const M6 = Array.from({ length: 6 }, (_, i) => Array.from({ length: 6 }, (_, j) => (i === j ? m[i % 3] : 0)));
  const G6 = Array.from({ length: 6 }, () => Array(6).fill(0));
  for (let l = 0; l < 3; l++) { G6[l][3 + l] = +J[l]; G6[3 + l][l] = -J[l]; }
  const Gam6 = Array.from({ length: 6 }, () => Array(6).fill(0));
  for (let l = 0; l < 3; l++) { Gam6[l][3 + l] = +tau[l]; Gam6[3 + l][l] = -tau[l]; }
  const dampLayers = extraDampingLayers ?? [extraDamping, extraDamping, extraDamping];
  const Cvel = Array.from({ length: 6 }, (_, i) => Array.from({ length: 6 }, (_, j) =>
    G6[i][j] - rateBlockScale * D6t[i][j] + (i === j ? dampLayers[i % 3] : 0)
    + (velocityBlockAdd ? velocityBlockAdd[i][j] : 0)));
  // complex helpers + Durand-Kerner (as in gyroscopicTiltAnalysis)
  const cAdd = (a, b) => [a[0]+b[0], a[1]+b[1]];
  const cSub = (a, b) => [a[0]-b[0], a[1]-b[1]];
  const cMul = (a, b) => [a[0]*b[0]-a[1]*b[1], a[0]*b[1]+a[1]*b[0]];
  const cDiv = (a, b) => { const d2 = b[0]*b[0]+b[1]*b[1]; return [(a[0]*b[0]+a[1]*b[1])/d2, (a[1]*b[0]-a[0]*b[1])/d2]; };
  const cAbs = (a) => Math.hypot(a[0], a[1]);
  const detC = (Min) => {
    const n = Min.length;
    const Mx = Min.map((r) => r.map((v) => [v[0], v[1]]));
    let det = [1, 0];
    for (let c = 0; c < n; c++) {
      let p = c;
      for (let r = c + 1; r < n; r++) if (cAbs(Mx[r][c]) > cAbs(Mx[p][c])) p = r;
      if (cAbs(Mx[p][c]) < 1e-300) return [0, 0];
      if (p !== c) { const t = Mx[p]; Mx[p] = Mx[c]; Mx[c] = t; det = cMul(det, [-1, 0]); }
      det = cMul(det, Mx[c][c]);
      for (let r = c + 1; r < n; r++) {
        const f = cDiv(Mx[r][c], Mx[c][c]);
        for (let cc = c; cc < n; cc++) Mx[r][cc] = cSub(Mx[r][cc], cMul(f, Mx[c][cc]));
      }
    }
    return det;
  };
  const pencil = (lam) => {
    const l2 = cMul(lam, lam);
    const Pm = [];
    for (let i = 0; i < 6; i++) {
      Pm.push([]);
      for (let j = 0; j < 6; j++) {
        Pm[i].push(cAdd(cAdd(cMul(l2, [M6[i][j], 0]), cMul(lam, [Cvel[i][j], 0])), [Gam6[i][j] - K6[i][j], 0]));
      }
    }
    return detC(Pm);
  };
  const leading = m[0]*m[0]*m[1]*m[1]*m[2]*m[2];
  const deg2 = 12;
  let roots = Array.from({ length: deg2 }, (_, i) => {
    const ang = (2 * Math.PI * i) / deg2 + 0.4;
    const rad = 1.5 * Math.max(Math.sqrt(scale / Math.min(...m)), Math.max(...J) / Math.min(...m));
    return [rad * Math.cos(ang), rad * Math.sin(ang)];
  });
  let dkResidual = Infinity;
  for (let it = 0; it < 400; it++) {
    let moved = 0;
    for (let i = 0; i < deg2; i++) {
      let denom = [leading, 0];
      for (let j = 0; j < deg2; j++) if (j !== i) denom = cMul(denom, cSub(roots[i], roots[j]));
      const delta = cDiv(pencil(roots[i]), denom);
      roots[i] = cSub(roots[i], delta);
      moved = Math.max(moved, cAbs(delta));
    }
    dkResidual = moved;
    if (moved < 1e-13) break;
  }
  const rootRows = roots.map((r) => ({ re: r[0], im: r[1], pencilResidual: cAbs(pencil(r)) }))
    .sort((x, y) => y.re - x.re);
  const byMag = [...rootRows].sort((x, y) => Math.hypot(x.re, x.im) - Math.hypot(y.re, y.im));
  const globalPair = byMag.slice(0, 2);
  const deflated = rootRows.filter((r) => !globalPair.includes(r));
  const growing = deflated.filter((r) => r.re > 1e-6);
  const maxGrowth = deflated.length ? deflated[0] : null;
  return {
    layers: layerConst, omega: w, kappaStar: kap, tau0, pumpAbsorbed,
    blocks: { A, B, P, Q },
    rateBlock: D6t, rateBlockScale, extraDamping,
    covarianceWitness: { staticBlocks: covK, rateBlocks: covD, scale },
    globalNull: { A: rowSum(A), pumpWitness,
      ok: rowSum(A) < 0.05 * Math.max(scale, 1e-9) && pumpWitness < 0.05 * Math.max(scale, 1e-9) },
    rateRowSums: { P: [0,1,2].map((i) => P[i][0]+P[i][1]+P[i][2]), Q: [0,1,2].map((i) => Q[i][0]+Q[i][1]+Q[i][2]) },
    dkResidual,
    eigenvalues: rootRows,
    globalPairDeflated: globalPair.map((r) => ({ re: r.re, im: r.im })),
    quotientEigenvalues: deflated,
    flutter: growing.length > 0,
    flutterModes: growing,
    maxGrowthRate: maxGrowth ? maxGrowth.re : null,
    maxGrowthWhirlFrequency: maxGrowth ? Math.abs(maxGrowth.im) : null,
  };
}

// COUPLED BREATHING-FLUTTER PENCIL (Section 68 route (a); the non-rigid axis /
// internal-deformation instrument; build spec
// nonrigid-axis-internal-deformation-instrument-spec.md). Every prior axis
// pencil (Sections 61/63/68) holds the layer RADII frozen (rigid layers), and
// every radial-stability instrument (Sections 57/58) holds the TILTS frozen.
// This is the first pencil that carries BOTH: the internal radial-deformation
// (breathing) coordinate s_L = dR_L AND the tilt coordinates eta_L, coupled.
// Coordinates q = (s_I,s_M,s_O, eta^x_I,eta^x_M,eta^x_O, eta^y_I,eta^y_M,eta^y_O).
//   P(lambda) = lambda^2 M9 + lambda G9 + Gamma9 - K9,
//   K9 = [[ K_rad , C_rt ],[ C_tr , K_tilt ]],  G9 = blockdiag(0, G_tilt),
//   Gamma9 = blockdiag(0, Gamma_tilt),  M9 = diag(mRad*I3, M_tilt).
// The DIAGONAL blocks are taken from the canonical functions (radialStabilityMatrix
// bare/rail-pinned = Section 57 K_rad; gyroscopicTiltAnalysis = Section 61 K_tilt,
// G_tilt, Gamma_tilt), so coupling="none" reproduces both baselines to the digit.
// The CROSS-blocks C_rt = d F^rad / d eta and C_tr = d T / d s are measured by a
// unified full-causal-root cycle-averaged evaluator (same torquesXY body as
// Section 61, plus the in-plane radial projection of Section 57). About the
// axisymmetric cycle-averaged fixed point a SELECTION RULE applies: a scalar
// radial force cannot carry a linear term in the transverse-vector tilt, and a
// transverse-vector torque cannot carry a linear term in the scalar breath, so
// both cross-blocks are expected at the covariance-null level and the linear
// pencil DECOUPLES. The operative breathing-flutter coupling is therefore
// parametric (d K_tilt / d s, reported when parametric:true) -- the finite-
// amplitude channel by which the Row 7 expansion accelerates the flutter
// (Section 61). Central solver untouched; consumes buildBraid/wakeAccel/residuals
// read-only. NOT evidence; names no retained branch; authorizes no acceptance.
export function internalDeformationPencil({
  geo = SELF_EQUILIBRATED_V5.geo, cTrans = 1.0, Nt = 8, soft = 0.02,
  eps = 0.01, eta = 0.03, railPinned = true, kapFixed = null,
  coupling = "all", pumpAbsorbed = false, mRad = 2, parametric = false,
  u = 0, driftAngle = 0, baseTilt = 0,
} = {}) {
  const seed = buildBraid({ u: 0, cTrans, geo });
  const w = seed.omega;
  const cf = 1;
  const kap = kapFixed ?? residuals({ u: 0, cTrans, geo }, { soft }).kappaStar;
  // diagonal sectors from the canonical functions (exact Section 57 / Section 61)
  const tilt = gyroscopicTiltAnalysis({ geo, cTrans, Nt, soft, eta, pumpAbsorbed });
  const rad = radialStabilityMatrix({ geo, withCage: false, eps, Nt, soft, cTrans, railPinned, kapFixed: kap, displace: [0, 0, 0] });
  const Krad = rad.K.map((r) => r.slice(0, 3)).slice(0, 3);
  const K6 = tilt.K6, mT = tilt.M, J = tilt.Jspin;
  const tau = pumpAbsorbed ? [tilt.tau0[0], 0, tilt.tau0[2]] : tilt.tau0;
  // unified full-causal-root cycle-averaged evaluator: per-layer transverse
  // torques (Tx,Ty as gyroscopicTiltAnalysis) and in-plane radial generalized
  // force (net-inward as radialStabilityMatrix), at joint radius + tilt.
  const rotX = (v, c, s) => [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2]];
  const rotY = (v, c, s) => [c * v[0] + s * v[2], v[1], -s * v[0] + c * v[2]];
  const li = (nm) => (nm === "I" ? 0 : nm === "M" ? 1 : 2);
  // Broken-symmetry knobs (§71 next probe; defaults 0 reproduce the axisymmetric
  // rest pencil EXACTLY): drift vector u*d_hat (d_hat at driftAngle theta to the
  // spin axis; oblique drift azimuthally modulates the branch weights) plus a
  // GLOBAL base-tilt baseTilt that anchors the spin axis off the geometric z-axis
  // (the anchored-oblique complex, coplanar with the drift). Both break the
  // axisymmetry/reflection that nulls C_rt, C_tr at rest.
  const dvec = [u * Math.sin(driftAngle), 0, u * Math.cos(driftAngle)];
  const gbc = Math.cos(baseTilt), gbs = Math.sin(baseTilt);
  const gtilt = (v) => rotX(v, gbc, gbs); // global anchor tilt about x (coplanar with the oblique drift)
  const uFT = (dRad, ex, ey) => {
    const wEff = railPinned ? cTrans / ((1 + dRad[1]) * Math.cos(geo.alphaM)) : w;
    const period = 2 * Math.PI / wEff;
    const sites = seed.sites.map((s) => {
      const L = li(s.name), R = s.R + dRad[L];
      const cx = Math.cos(ex[L]), sx = Math.sin(ex[L]), cy = Math.cos(ey[L]), sy = Math.sin(ey[L]);
      return {
        pol: s.pol, L, alpha: s.alpha, R,
        pos: (t) => { const a = wEff * t + s.th, ca = Math.cos(s.alpha); const p = gtilt(rotY(rotX([s.sgn*R*ca*Math.cos(a), s.sgn*R*ca*Math.sin(a), s.sgn*R*Math.sin(s.alpha)], cx, sx), cy, sy)); return [p[0]+dvec[0]*t, p[1]+dvec[1]*t, p[2]+dvec[2]*t]; },
        vel: (t) => { const a = wEff * t + s.th, v = s.sgn*R*Math.cos(s.alpha)*wEff; const vv = gtilt(rotY(rotX([-v*Math.sin(a), v*Math.cos(a), 0], cx, sx), cy, sy)); return [vv[0]+dvec[0], vv[1]+dvec[1], vv[2]+dvec[2]]; },
        radHat: (t) => { const a = wEff * t + s.th; return gtilt([Math.cos(a), Math.sin(a), 0]); },
      };
    });
    const Tx = [0, 0, 0], Ty = [0, 0, 0], Frad = [0, 0, 0];
    for (let k = 0; k < Nt; k++) {
      const t = (k / Nt) * period;
      for (let i = 0; i < sites.length; i++) {
        const rec = sites[i], Xi = rec.pos(t), vi = rec.vel(t);
        const F = [0, 0, 0];
        for (let j = 0; j < sites.length; j++) {
          if (j === i) continue;
          const src = sites[j];
          const g = (te) => { const p = src.pos(te); return Math.hypot(Xi[0]-p[0], Xi[1]-p[1], Xi[2]-p[2]) - cf * (t - te); };
          const dmax = 4, N = 2400; let g0 = g(t - dmax);
          for (let kk = 1; kk <= N; kk++) {
            const te = t - dmax + dmax * (kk / N); if (te >= t - 1e-9) break;
            const g1 = g(te);
            if ((g0 < 0) !== (g1 < 0)) {
              let lo = t - dmax + dmax * ((kk - 1) / N), hi = te; const gl = g(lo);
              for (let b = 0; b < 50; b++) { const mid = (lo + hi) / 2; if ((gl < 0) === (g(mid) < 0)) lo = mid; else hi = mid; }
              const te0 = (lo + hi) / 2, p = src.pos(te0), dx = [Xi[0]-p[0], Xi[1]-p[1], Xi[2]-p[2]], r = Math.hypot(dx[0], dx[1], dx[2]);
              if (r > 1e-9) {
                const rh = [dx[0]/r, dx[1]/r, dx[2]/r], vs = src.vel(te0);
                const Ds = cf - (vs[0]*rh[0] + vs[1]*rh[1] + vs[2]*rh[2]);
                const Dt = cf - (vi[0]*rh[0] + vi[1]*rh[1] + vi[2]*rh[2]);
                const mfac = (Dt * Ds) / (Ds * Ds + soft * soft), wgt = (rec.pol * src.pol) * mfac / (r * r);
                F[0] += wgt * rh[0]; F[1] += wgt * rh[1]; F[2] += wgt * rh[2];
              }
            }
            g0 = g1;
          }
        }
        Tx[rec.L] += kap * (Xi[1] * F[2] - Xi[2] * F[1]) / Nt;
        Ty[rec.L] += kap * (Xi[2] * F[0] - Xi[0] * F[2]) / Nt;
        const rh0 = rec.radHat(t), rho = rec.R * Math.cos(rec.alpha);
        // net-inward radial generalized force (Section 57 convention): inward
        // wake radial minus the centripetal need omega^2 rho (0 = balance).
        Frad[rec.L] += (-kap * (F[0]*rh0[0] + F[1]*rh0[1] + F[2]*rh0[2]) - wEff*wEff*rho) / Nt;
      }
    }
    return { Tx, Ty, Frad: Frad.map((f) => f / 2) }; // two antipodal sites per layer
  };
  // cross-blocks by central difference (measured; expected at the null level)
  const Crt = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]; // 3x6  d F^rad_i / d eta_j
  const Ctr = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]; // 6x3  d T_i / d s_j
  if (coupling === "all" || coupling === "ctr") {
    for (let j = 0; j < 3; j++) {
      const dp = [0,0,0], dm = [0,0,0]; dp[j] = eps; dm[j] = -eps;
      const up = uFT(dp, [0,0,0], [0,0,0]), dn = uFT(dm, [0,0,0], [0,0,0]);
      for (let i = 0; i < 3; i++) { Ctr[i][j] = (up.Tx[i] - dn.Tx[i]) / (2*eps); Ctr[3+i][j] = (up.Ty[i] - dn.Ty[i]) / (2*eps); }
    }
  }
  if (coupling === "all" || coupling === "crt") {
    for (let jc = 0; jc < 6; jc++) {
      const ax = jc < 3 ? "x" : "y", l = jc % 3;
      const exP = [0,0,0], eyP = [0,0,0], exM = [0,0,0], eyM = [0,0,0];
      if (ax === "x") { exP[l] = eta; exM[l] = -eta; } else { eyP[l] = eta; eyM[l] = -eta; }
      const up = uFT([0,0,0], exP, eyP), dn = uFT([0,0,0], exM, eyM);
      for (let i = 0; i < 3; i++) Crt[i][jc] = (up.Frad[i] - dn.Frad[i]) / (2*eta);
    }
  }
  const scale = Math.max(...K6.flat().map(Math.abs), ...Krad.flat().map(Math.abs), 1e-9);
  const crtNorm = Math.max(...Crt.flat().map(Math.abs));
  const ctrNorm = Math.max(...Ctr.flat().map(Math.abs));
  // assemble the 9x9 blocks
  const M9 = Array.from({ length: 9 }, (_, i) => Array.from({ length: 9 }, (_, j) => (i === j ? (i < 3 ? mRad : mT[(i - 3) % 3]) : 0)));
  const G9 = Array.from({ length: 9 }, () => Array(9).fill(0));
  for (let l = 0; l < 3; l++) { G9[3 + l][6 + l] = +J[l]; G9[6 + l][3 + l] = -J[l]; }
  const Gam9 = Array.from({ length: 9 }, () => Array(9).fill(0));
  for (let l = 0; l < 3; l++) { Gam9[3 + l][6 + l] = +tau[l]; Gam9[6 + l][3 + l] = -tau[l]; }
  const K9 = Array.from({ length: 9 }, () => Array(9).fill(0));
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) K9[i][j] = Krad[i][j];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 6; j++) K9[i][3 + j] = Crt[i][j];
  for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) K9[3 + i][j] = Ctr[i][j];
  for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) K9[3 + i][3 + j] = K6[i][j];
  // complex helpers + degree-18 Durand-Kerner (as gyroscopicTiltAnalysis)
  const cAdd = (a, b) => [a[0]+b[0], a[1]+b[1]];
  const cSub = (a, b) => [a[0]-b[0], a[1]-b[1]];
  const cMul = (a, b) => [a[0]*b[0]-a[1]*b[1], a[0]*b[1]+a[1]*b[0]];
  const cDiv = (a, b) => { const d2 = b[0]*b[0]+b[1]*b[1]; return [(a[0]*b[0]+a[1]*b[1])/d2, (a[1]*b[0]-a[0]*b[1])/d2]; };
  const cAbs = (a) => Math.hypot(a[0], a[1]);
  const detC = (Min) => {
    const n = Min.length, Mx = Min.map((r) => r.map((v) => [v[0], v[1]])); let det = [1, 0];
    for (let c = 0; c < n; c++) {
      let p = c; for (let r = c + 1; r < n; r++) if (cAbs(Mx[r][c]) > cAbs(Mx[p][c])) p = r;
      if (cAbs(Mx[p][c]) < 1e-300) return [0, 0];
      if (p !== c) { const t = Mx[p]; Mx[p] = Mx[c]; Mx[c] = t; det = cMul(det, [-1, 0]); }
      det = cMul(det, Mx[c][c]);
      for (let r = c + 1; r < n; r++) { const f = cDiv(Mx[r][c], Mx[c][c]); for (let cc = c; cc < n; cc++) Mx[r][cc] = cSub(Mx[r][cc], cMul(f, Mx[c][cc])); }
    }
    return det;
  };
  const pencil = (lam) => {
    const l2 = cMul(lam, lam), P = [];
    for (let i = 0; i < 9; i++) { P.push([]); for (let j = 0; j < 9; j++) P[i].push(cAdd(cAdd(cMul(l2, [M9[i][j], 0]), cMul(lam, [G9[i][j], 0])), [Gam9[i][j] - K9[i][j], 0])); }
    return detC(P);
  };
  let leading = 1; for (let i = 0; i < 9; i++) leading *= M9[i][i];
  const deg = 18, rad0 = 1.5 * Math.max(Math.sqrt(scale / Math.min(mRad, ...mT)), Math.max(...J) / Math.min(mRad, ...mT), 1);
  let roots = Array.from({ length: deg }, (_, i) => { const ang = (2 * Math.PI * i) / deg + 0.4; return [rad0 * Math.cos(ang), rad0 * Math.sin(ang)]; });
  let dkResidual = Infinity;
  for (let it = 0; it < 600; it++) {
    let moved = 0;
    for (let i = 0; i < deg; i++) {
      let denom = [leading, 0];
      for (let j = 0; j < deg; j++) if (j !== i) denom = cMul(denom, cSub(roots[i], roots[j]));
      const delta = cDiv(pencil(roots[i]), denom);
      roots[i] = cSub(roots[i], delta); moved = Math.max(moved, cAbs(delta));
    }
    dkResidual = moved; if (moved < 1e-13) break;
  }
  const rootRows = roots.map((r) => ({ re: r[0], im: r[1], pencilResidual: cAbs(pencil(r)) })).sort((x, y) => y.re - x.re);
  // deflate the global-tilt double zero (Section 61 discipline: two smallest |lambda|)
  const byMag = [...rootRows].sort((x, y) => Math.hypot(x.re, x.im) - Math.hypot(y.re, y.im));
  const globalPair = byMag.slice(0, 2);
  const deflated = rootRows.filter((r) => !globalPair.includes(r));
  const growing = deflated.filter((r) => r.re > 1e-6);
  const maxGrowth = deflated.length ? deflated[0] : null;
  // parametric coupling (the operative channel): d(flutter growth)/d(uniform
  // breath) under the rail pin -- built from the unified evaluator's tilt block
  // at +/- a uniform radial breath, central-differenced (opt-in; heavier).
  let parametricCoupling = null;
  if (parametric) {
    const flutterAtBreath = (ds) => {
      const dR = [ds, ds, ds];
      const Ab = [[0,0,0],[0,0,0],[0,0,0]], Bb = [[0,0,0],[0,0,0],[0,0,0]], Db = [[0,0,0],[0,0,0],[0,0,0]], Eb = [[0,0,0],[0,0,0],[0,0,0]];
      for (let j = 0; j < 3; j++) {
        const ep = [0,0,0], em = [0,0,0]; ep[j] = eta; em[j] = -eta;
        const px = uFT(dR, ep, [0,0,0]), mx = uFT(dR, em, [0,0,0]), py = uFT(dR, [0,0,0], ep), my = uFT(dR, [0,0,0], em);
        for (let i = 0; i < 3; i++) { Ab[i][j] = (px.Tx[i]-mx.Tx[i])/(2*eta); Db[i][j] = (px.Ty[i]-mx.Ty[i])/(2*eta); Bb[i][j] = (py.Tx[i]-my.Tx[i])/(2*eta); Eb[i][j] = (py.Ty[i]-my.Ty[i])/(2*eta); }
      }
      const base = uFT(dR, [0,0,0], [0,0,0]); const tau0b = [base.Tx, base.Ty]; // transverse ~0
      const wEff = railPinned ? cTrans / ((1 + ds) * Math.cos(geo.alphaM)) : w;
      const layerC = [];
      for (const i of [0,2,4]) { const s = seed.sites[i]; const rho = (s.R+ds)*Math.cos(s.alpha), z = (s.R+ds)*Math.sin(s.alpha); layerC.push({ m: rho*rho+2*z*z, J: 2*rho*rho*wEff }); }
      const mb = layerC.map((l) => l.m), Jb = layerC.map((l) => l.J);
      // tau_z at breath: reuse the measured pump scaled by (rho^2 wEff) proxy is avoided; use z-torque baseline
      const K6b = [
        [Ab[0][0],Ab[0][1],Ab[0][2],Bb[0][0],Bb[0][1],Bb[0][2]],
        [Ab[1][0],Ab[1][1],Ab[1][2],Bb[1][0],Bb[1][1],Bb[1][2]],
        [Ab[2][0],Ab[2][1],Ab[2][2],Bb[2][0],Bb[2][1],Bb[2][2]],
        [Db[0][0],Db[0][1],Db[0][2],Eb[0][0],Eb[0][1],Eb[0][2]],
        [Db[1][0],Db[1][1],Db[1][2],Eb[1][0],Eb[1][1],Eb[1][2]],
        [Db[2][0],Db[2][1],Db[2][2],Eb[2][0],Eb[2][1],Eb[2][2]],
      ];
      // reuse the pump (z-torque) baseline from the unperturbed tilt sector
      const M6b = Array.from({ length: 6 }, (_, i) => Array.from({ length: 6 }, (_, j) => (i === j ? mb[i % 3] : 0)));
      const G6b = Array.from({ length: 6 }, () => Array(6).fill(0)); for (let l = 0; l < 3; l++) { G6b[l][3+l] = +Jb[l]; G6b[3+l][l] = -Jb[l]; }
      const Gam6b = Array.from({ length: 6 }, () => Array(6).fill(0)); for (let l = 0; l < 3; l++) { Gam6b[l][3+l] = +tau[l]; Gam6b[3+l][l] = -tau[l]; }
      const pen6 = (lam) => { const l2 = cMul(lam, lam), P = []; for (let i = 0; i < 6; i++) { P.push([]); for (let j = 0; j < 6; j++) P[i].push(cAdd(cAdd(cMul(l2, [M6b[i][j],0]), cMul(lam, [G6b[i][j],0])), [Gam6b[i][j]-K6b[i][j],0])); } return detC(P); };
      let lead6 = mb[0]*mb[0]*mb[1]*mb[1]*mb[2]*mb[2]; const d6 = 12;
      let rr = Array.from({ length: d6 }, (_, i) => { const ang = (2*Math.PI*i)/d6 + 0.4, rd = 1.5*Math.max(Math.sqrt(scale/Math.min(...mb)), Math.max(...Jb)/Math.min(...mb)); return [rd*Math.cos(ang), rd*Math.sin(ang)]; });
      for (let it = 0; it < 400; it++) { let mv = 0; for (let i = 0; i < d6; i++) { let den = [lead6,0]; for (let j = 0; j < d6; j++) if (j !== i) den = cMul(den, cSub(rr[i], rr[j])); const dl = cDiv(pen6(rr[i]), den); rr[i] = cSub(rr[i], dl); mv = Math.max(mv, cAbs(dl)); } if (mv < 1e-13) break; }
      const rw = rr.map((r) => ({ re: r[0], im: r[1] })).sort((x, y) => y.re - x.re);
      const bm = [...rw].sort((x, y) => Math.hypot(x.re, x.im) - Math.hypot(y.re, y.im));
      const gp = bm.slice(0, 2); const df = rw.filter((r) => !gp.includes(r));
      return df.length ? df[0].re : null;
    };
    const ds = 0.02, gp = flutterAtBreath(ds), gm = flutterAtBreath(-ds), g0 = tilt.maxGrowthRate;
    // analytic spin-transport coefficient dJ_L/ds_L (the J-dot n-hat parametric term)
    const dJds = seed.sites.filter((s, i) => [0,2,4].includes(i)).map((s) => {
      const rho = s.R * Math.cos(s.alpha);
      const dwds = railPinned && s.name === "M" ? -w : 0; // omega responds only to R_M under the rail pin
      return 4 * rho * Math.cos(s.alpha) * w + 2 * rho * rho * dwds;
    });
    parametricCoupling = { dFlutter_dSize: (gp - gm) / (2 * ds), flutterAtPlusBreath: gp, flutterAtMinusBreath: gm, flutterAtRest: g0, dJds };
  }
  return {
    omega: w, kappaStar: kap, coupling, pumpAbsorbed, railPinned,
    scale, crossBlocks: { Crt, Ctr, crtNorm, ctrNorm, crtNormRel: crtNorm / scale, ctrNormRel: ctrNorm / scale },
    Krad, radialEigen: rad.symEigen, radialBasin: rad.basin,
    dkResidual, eigenvalues: rootRows,
    globalPairDeflated: globalPair.map((r) => ({ re: r.re, im: r.im })),
    quotientEigenvalues: deflated,
    flutter: growing.length > 0, flutterModes: growing,
    maxGrowthRate: maxGrowth ? maxGrowth.re : null,
    maxGrowthWhirlFrequency: maxGrowth ? Math.abs(maxGrowth.im) : null,
    flutterUncoupled: tilt.maxGrowthRate,
    flutterShift: maxGrowth ? maxGrowth.re - tilt.maxGrowthRate : null,
    flip: maxGrowth ? maxGrowth.re < 0 : null,
    parametricCoupling,
  };
}

// BREATHING-ESCAPEMENT REDUCED INTEGRATOR (Section 68 route (a), Deliverable 2;
// the parametric / Mathieu gate). REFERENCE/REDUCED code -- explicitly NOT the
// native solver and not a production solver, the sibling of the Section 12
// field-speed-pin 1-D integrator. It integrates the low-dimensional normal form
// the linear pencil (internalDeformationPencil) cannot reach, to decide whether
// a BOUNDED breathing limit cycle can net-stabilize the flutter while absorbing
// the rail-pump deficit. Coordinates: s (size = R_M - 1), sd (size rate),
// delta (beta_M - 1, the rail detachment), aFlut (flutter log-amplitude).
// Declared coefficients from the measured stack:
//   pump = +0.2274 (Section 60 DECLARED.row8.pumpDeclared),
//   brakeFracMax = 0.667 (Section 66 native self-hit brake ceiling),
//   gamma0 = 0.18277, dGammaDs = -0.48 (internalDeformationPencil parametric),
//   kSize (Section 57 size-mode stiffness), the RAIL-PIN SIGN INVERSION
//   (Section 60: below the rail the size pin is restoring, above beta_M=1 it
//   inverts into an outward spiral). speedPinRatio rho>1 emulates an ENVIRONMENT
//   that lifts the brake above the pump (Sections 11/12 two-sided attractor);
//   pumpScaleExp lets the pump weaken with radius. The gate reads: bounded cycle
//   vs runaway; mean size <s> and mean flutter rate <gamma>; net flutter growth;
//   pump absorbed fraction. NOT evidence; names no retained branch; authorizes
//   no acceptance. Fail-closed.
export function breathingEscapementReduced({
  pump = 0.2274, brakeFracMax = 0.667, gamma0 = 0.18277, dGammaDs = -0.48,
  kSize = 0.25, mRad = 2, gPin = 1.0, kInv = null, speedPinRatio = null,
  pumpScaleExp = 0, sizeDamp = 0, dt = 0.005, T = 80,
  s0 = 0, sd0 = 0, delta0 = 0.001, aFlut0 = 0, dispersalS = 3,
} = {}) {
  const kUp = kInv ?? kSize;
  const deriv = (y) => {
    const [s, sd, delta, aFlut] = y;
    const pumpEff = pump / Math.pow(1 + Math.max(s, -0.9), pumpScaleExp);
    const brakeFrac = delta > 0 ? (speedPinRatio != null ? speedPinRatio : brakeFracMax) : 0;
    const ddelta = pumpEff * (1 - brakeFrac); // net tangential drive on beta_M
    // radial: below rail (delta<=0) restoring -kSize*s; above rail the pin
    // inverts (+kUp*s) and the super-field speed pushes outward (+gPin*delta)
    const Fs = delta > 0 ? (kUp * s + gPin * delta) : (-kSize * s);
    const sdd = (Fs - sizeDamp * sd) / mRad;
    const daFlut = gamma0 + dGammaDs * s; // d(log flutter amplitude)/dt
    return [sd, sdd, ddelta, daFlut];
  };
  let y = [s0, sd0, delta0, aFlut0];
  const n = Math.round(T / dt);
  let sMax = -Infinity, sMin = Infinity, dispersalTime = null;
  let sSum = 0, gammaSum = 0, brakeSum = 0, brakeCount = 0, cnt = 0;
  const half = Math.floor(n / 2); // late-window averages (skip transient)
  const deltaTrack = [];
  for (let k = 0; k < n; k++) {
    const k1 = deriv(y);
    const k2 = deriv(y.map((v, i) => v + 0.5 * dt * k1[i]));
    const k3 = deriv(y.map((v, i) => v + 0.5 * dt * k2[i]));
    const k4 = deriv(y.map((v, i) => v + dt * k3[i]));
    y = y.map((v, i) => v + (dt / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
    const [s, , delta] = y;
    sMax = Math.max(sMax, s); sMin = Math.min(sMin, s);
    if (dispersalTime == null && Math.abs(s) > dispersalS) dispersalTime = (k + 1) * dt;
    if (k >= half) { sSum += s; gammaSum += gamma0 + dGammaDs * s; cnt++; if (delta > 0) { brakeSum += (speedPinRatio != null ? speedPinRatio : brakeFracMax); brakeCount++; } }
    if (k % Math.max(1, Math.floor(n / 200)) === 0) deltaTrack.push({ t: (k + 1) * dt, s, delta });
    if (!isFinite(s) || Math.abs(s) > 1e6) { dispersalTime = dispersalTime ?? (k + 1) * dt; break; }
  }
  const meanS = cnt ? sSum / cnt : null;
  const meanGamma = cnt ? gammaSum / cnt : null;
  const absorbedFraction = brakeCount ? brakeSum / brakeCount : 0;
  const bounded = dispersalTime == null && isFinite(sMax) && Math.abs(sMax) < dispersalS && Math.abs(sMin) < dispersalS;
  const netFlutterGrowth = y[3] - aFlut0; // >0 grew, <0 net-damped
  return {
    pump, brakeFracMax, speedPinRatio, gamma0, dGammaDs, kSize, gPin, pumpScaleExp,
    bounded, dispersalTime, sMax, sMin, meanS, meanGamma,
    // the flutter is net-damped only if the mean size holds beyond gamma0/|dGammaDs|
    meanSizeNeededForDamp: gamma0 / Math.abs(dGammaDs),
    // a real flutter damping requires a BOUNDED trajectory whose mean size holds
    // the parametric coupling past gamma0/|dGammaDs|; unbounded "damping" is the
    // dispersal artifact (s -> infinity), not an absorber.
    fluttrNetDamped: bounded && meanGamma != null && meanGamma < 0,
    netFlutterGrowth, finalDelta: y[2], finalS: y[0], absorbedFraction,
    deltaTrack: deltaTrack.slice(-6),
  };
}

// OFF-DIAGONAL CLICK RESPONSE, PHASE-RESOLVED PUMP MODULATION (Section 64
// route (a): the last bare-braid axis-absorber route). A click on the middle
// exerts torque on the middle only, so click-mediated damping of ANOTHER
// layer's tilt rate requires a phase-correlated chain: layer-L tilt rate ->
// delayed-wake modulation of the middle's tangential (pump) force, resolved
// in the middle's rotation phase phi -> modulated click depth -> click torque
// -(z_M I cos phi) correlated with the modulation. The claim-bearing
// measurement is the phase-resolved response f_L(phi) = dF_tan^M(phi)/d
// etaDot_L on exact causal roots; its cos-phi Fourier component f_c is what
// survives the phase average. The chain estimate (declared: accumulation
// time x click rate ~ 1, phase-uniform clicking, Section 64 sensitivity S in
// V5 units) sizes the off-diagonal velocity-block coupling
//   D_offdiag(M <- L) ~ z_M * |S_V5| * |f_c| / 2,
// which is then inserted into the completed pencil AT BOTH SIGNS and the max
// growth re-read: the route stays open only if the estimated magnitude can
// close (or materially reduce) the axis-sector growth.
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.
export function clickOffDiagonalEstimate({ geo = SELF_EQUILIBRATED_V5.geo, cTrans = 1.0, Nphi = 16, soft = 0.02, etaDot = 0.02, sV5 = 2.506, clickSensitivityNote = "Section 64 |S| in V5 units", } = {}) {
  const seed = buildBraid({ u: 0, cTrans, geo });
  const w = seed.omega, period = 2 * Math.PI / w;
  const kap = residuals({ u: 0, cTrans, geo }, { soft }).kappaStar;
  const cf = 1;
  const rotX = (v, c, s) => [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2]];
  const crossXv = (v) => [0, -v[2], v[1]];
  // worldlines: layer L tilts about x at rate rd, zero tilt at tRef
  const mk = (L, rd, tRef) => seed.sites.map((s) => {
    const SL = s.name === "I" ? 0 : s.name === "M" ? 1 : 2;
    const r = SL === L ? rd : 0;
    const p0 = (t) => { const a = w * t + s.th, ca = Math.cos(s.alpha); return [s.sgn*s.R*ca*Math.cos(a), s.sgn*s.R*ca*Math.sin(a), s.sgn*s.R*Math.sin(s.alpha)]; };
    const v0 = (t) => { const a = w * t + s.th, v = s.sgn*s.R*Math.cos(s.alpha)*w; return [-v*Math.sin(a), v*Math.cos(a), 0]; };
    return {
      pol: s.pol, L: SL,
      pos: (t) => { const ax = r * (t - tRef); return rotX(p0(t), Math.cos(ax), Math.sin(ax)); },
      vel: (t) => {
        const ax = r * (t - tRef);
        const pX = rotX(p0(t), Math.cos(ax), Math.sin(ax));
        const t1 = crossXv(pX).map((v) => r * v);
        const t2 = rotX(v0(t), Math.cos(ax), Math.sin(ax));
        return [t1[0]+t2[0], t1[1]+t2[1], t1[2]+t2[2]];
      },
    };
  });
  // tangential force on the middle site (index 2) at phase sample t, kappa-scaled
  const tanForceM = (sites, t) => {
    const rec = sites[2];
    const Xi = rec.pos(t), vi = rec.vel(t);
    const F = [0, 0, 0];
    for (let j = 0; j < sites.length; j++) {
      if (j === 2) continue;
      const src = sites[j];
      const g = (te) => { const p = src.pos(te); return Math.hypot(Xi[0]-p[0], Xi[1]-p[1], Xi[2]-p[2]) - cf * (t - te); };
      const dmax = 4, N = 2400;
      let g0 = g(t - dmax);
      for (let kk = 1; kk <= N; kk++) {
        const te = t - dmax + dmax * (kk / N);
        if (te >= t - 1e-9) break;
        const g1 = g(te);
        if ((g0 < 0) !== (g1 < 0)) {
          let lo = t - dmax + dmax * ((kk - 1) / N), hi = te; const gl = g(lo);
          for (let b = 0; b < 50; b++) { const mid = (lo + hi) / 2; if ((gl < 0) === (g(mid) < 0)) lo = mid; else hi = mid; }
          const te0 = (lo + hi) / 2;
          const p = src.pos(te0);
          const dx = [Xi[0]-p[0], Xi[1]-p[1], Xi[2]-p[2]];
          const r = Math.hypot(dx[0], dx[1], dx[2]);
          if (r > 1e-9) {
            const rh = [dx[0]/r, dx[1]/r, dx[2]/r];
            const vs = src.vel(te0);
            const Ds = cf - (vs[0]*rh[0] + vs[1]*rh[1] + vs[2]*rh[2]);
            const Dt = cf - (vi[0]*rh[0] + vi[1]*rh[1] + vi[2]*rh[2]);
            const mfac = (Dt * Ds) / (Ds * Ds + soft * soft);
            const wgt = (rec.pol * src.pol) * mfac / (r * r);
            F[0] += wgt * rh[0]; F[1] += wgt * rh[1]; F[2] += wgt * rh[2];
          }
        }
        g0 = g1;
      }
    }
    // tangential unit vector of the middle site at t
    const sp = Math.hypot(vi[0], vi[1], vi[2]);
    return kap * (F[0]*vi[0] + F[1]*vi[1] + F[2]*vi[2]) / sp;
  };
  const zM = Math.abs(seed.sites[2].R * Math.sin(seed.sites[2].alpha));
  const perLayer = [0, 1, 2].map((L) => {
    let c = 0, s = 0, dc = 0;
    for (let k = 0; k < Nphi; k++) {
      const t = (k / Nphi) * period;
      const phi = w * t + seed.sites[2].th;
      const fp = tanForceM(mk(L, +etaDot, t), t);
      const fm = tanForceM(mk(L, -etaDot, t), t);
      const df = (fp - fm) / (2 * etaDot);
      c += (df * Math.cos(phi) * 2) / Nphi;
      s += (df * Math.sin(phi) * 2) / Nphi;
      dc += df / Nphi;
    }
    const fc = Math.hypot(c, s); // phase-locked first-harmonic magnitude
    return { layer: ["I", "M", "O"][L], cosComponent: c, sinComponent: s, dcComponent: dc,
      firstHarmonic: fc, dOffdiagEstimate: (zM * Math.abs(sV5) * fc) / 2 };
  });
  return { omega: w, kappaStar: kap, zM, sV5, clickSensitivityNote,
    declaredChain: "accumulation_time_x_click_rate ~ 1, phase-uniform clicking, first-harmonic projection",
    perLayer };
}

// SEA TILT-DAMPING FEASIBILITY ESTIMATE (Section 66 next closure goal; the
// only open axis-absorber route). Model: six octahedral orientational-dipole
// sea members at radius Rsea (two polar, four equatorial — the braid-selected
// coverage), each a rigid dipole of moment p0 = braidDipole(geo) relaxing at
// rate gamma toward the direction of the braid's causally delayed field at
// its site. Loop chain per member, per (source layer L', receiver layer L),
// assembled in the FREQUENCY domain so every pair carries its own causal
// phase (the exact-per-pair-delay discipline; no uniform-loop-delay
// idealization):
//   layer-L' tilt at frequency omega (unit angle) ->
//     per-braid-site delayed modulation of the field DIRECTION at member s
//     (moving-source exact causal roots, per-sample phases e^{-i omega tau})
//   -> orientational response (I - b b^T) with relaxation gamma/(gamma+i omega)
//   -> per-site delayed reaction torque on layer L (static endpoints, exact
//      delays, receiver-normal factor, per-sample phases).
// The complex chain C_{L,L'}(omega) decomposes as T = Re(C) eta + (Im(C)/omega)
// etaDot: the velocity block is dSea[L][L'] = Im(C)/omega (damping iff
// diagonal negative), insertable into the completed pencil via
// velocityBlockAdd = -dSea on both transverse coordinates.
// Estimate grade, declared: cycle-averaged rigid worldlines; linear
// (small-angle) orientational response; slow-limit baseline alignment;
// single-frequency evaluation (no self-consistent mode iteration).
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.
export function seaTiltDampingEstimate({ geo = SELF_EQUILIBRATED_V5.geo, cTrans = 1.0, Rsea = 3.4, gamma = 1.0, omegaList = [0.06, 0.28, 0.46, 1.16, 2.41], Nt = 8, soft = 0.02, eta = 0.03, baseTilt = 0 } = {}) {
  const seed = buildBraid({ u: 0, cTrans, geo });
  const w = seed.omega, period = 2 * Math.PI / w;
  const kap = residuals({ u: 0, cTrans, geo }, { soft }).kappaStar;
  const cf = 1;
  const p0 = braidDipole(geo);
  const rotXv = (v, c, s) => [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2]];
  // §73: a GLOBAL baseTilt anchors the whole braid off the geometric z-axis, so
  // the (fixed, bulk) sea sees a TILTED braid -- the anchored-oblique complex,
  // unlike §67's axisymmetric measurement. Default 0 reproduces §67 exactly.
  const gbc = Math.cos(baseTilt), gbs = Math.sin(baseTilt);
  const members = FCC2_DIRS.map((d) => ({ dir: d, X: [d[0] * Rsea, d[1] * Rsea, d[2] * Rsea] }));
  // braid site worldlines with layer L tilted by etaX about x, then the global anchor tilt
  const posOf = (s, t, L, etaX) => {
    const SL = s.name === "I" ? 0 : s.name === "M" ? 1 : 2;
    const a = w * t + s.th, ca = Math.cos(s.alpha);
    let p = [s.sgn*s.R*ca*Math.cos(a), s.sgn*s.R*ca*Math.sin(a), s.sgn*s.R*Math.sin(s.alpha)];
    if (SL === L && etaX !== 0) p = rotXv(p, Math.cos(etaX), Math.sin(etaX));
    return baseTilt !== 0 ? rotXv(p, gbc, gbs) : p;
  };
  const velOf = (s, t, L, etaX) => {
    const SL = s.name === "I" ? 0 : s.name === "M" ? 1 : 2;
    const a = w * t + s.th, v = s.sgn*s.R*Math.cos(s.alpha)*w;
    let p = [-v*Math.sin(a), v*Math.cos(a), 0];
    if (SL === L && etaX !== 0) p = rotXv(p, Math.cos(etaX), Math.sin(etaX));
    return baseTilt !== 0 ? rotXv(p, gbc, gbs) : p;
  };
  // LINK A: per-member field rows. For each member: baseline field b (real)
  // and, per source layer, the per-sample sensitivity entries {dvec, tau}.
  const linkA = members.map((mem) => {
    const X = mem.X;
    const fieldEntries = (L, etaX) => {
      // returns per-sample summed contribution vector and mean delay per site
      const rows = [];
      for (let k = 0; k < Nt; k++) {
        const t = (k / Nt) * period;
        for (const s of seed.sites) {
          let te = t - Rsea - 1;
          for (let it = 0; it < 40; it++) { const p = posOf(s, te, L, etaX); te = t - Math.hypot(X[0]-p[0], X[1]-p[1], X[2]-p[2]); }
          const p = posOf(s, te, L, etaX);
          const dx = [X[0]-p[0], X[1]-p[1], X[2]-p[2]];
          const r = Math.hypot(dx[0], dx[1], dx[2]);
          const rh = [dx[0]/r, dx[1]/r, dx[2]/r];
          const v = velOf(s, te, L, etaX);
          const Ds = cf - (v[0]*rh[0] + v[1]*rh[1] + v[2]*rh[2]);
          const c = s.pol / (Ds * (r * r));
          rows.push({ vec: [c*rh[0], c*rh[1], c*rh[2]], tau: t - te });
        }
      }
      return rows;
    };
    const base = fieldEntries(0, 0);
    const b = [0, 1, 2].map((c) => base.reduce((a2, e) => a2 + e.vec[c], 0) / Nt);
    const bn = Math.hypot(b[0], b[1], b[2]);
    const bHat = [b[0]/bn, b[1]/bn, b[2]/bn];
    const sens = [0, 1, 2].map((L) => {
      const ep = fieldEntries(L, +eta), em = fieldEntries(L, -eta);
      return ep.map((e, i) => ({
        dvec: [0, 1, 2].map((c) => (e.vec[c] - em[i].vec[c]) / (2 * eta)),
        tau: (e.tau + em[i].tau) / 2,
      }));
    });
    return { ...mem, b, bn, bHat, sens };
  });
  // LINK B: per-member torque rows. Dipole endpoints along bHat; rotate about
  // two tangent axes e1, e2 and read the per-sample x-torque on each layer,
  // with the static-endpoint return delay per entry.
  const linkB = linkA.map((mem) => {
    const bHat = mem.bHat;
    let e1 = Math.abs(bHat[2]) < 0.9 ? [-bHat[1], bHat[0], 0] : [1, 0, 0];
    let n1 = Math.hypot(...e1); e1 = e1.map((v) => v / n1);
    // orthogonalize e1 against bHat, then e2 = bHat x e1
    const d1 = e1[0]*bHat[0] + e1[1]*bHat[1] + e1[2]*bHat[2];
    e1 = e1.map((v, c) => v - d1 * bHat[c]);
    n1 = Math.hypot(...e1); e1 = e1.map((v) => v / n1);
    const e2 = [bHat[1]*e1[2]-bHat[2]*e1[1], bHat[2]*e1[0]-bHat[0]*e1[2], bHat[0]*e1[1]-bHat[1]*e1[0]];
    const torqueEntries = (pHat) => {
      const rows = []; // {L, dT, tau} per sample x site x endpoint
      for (let k = 0; k < Nt; k++) {
        const t = (k / Nt) * period;
        for (const s of seed.sites) {
          const L = s.name === "I" ? 0 : s.name === "M" ? 1 : 2;
          const Xj = posOf(s, t, 0, 0), vj = velOf(s, t, 0, 0);
          for (const pm of [+1, -1]) {
            const Xe = [mem.X[0] + pm*(p0/2)*pHat[0], mem.X[1] + pm*(p0/2)*pHat[1], mem.X[2] + pm*(p0/2)*pHat[2]];
            const dx = [Xj[0]-Xe[0], Xj[1]-Xe[1], Xj[2]-Xe[2]];
            const r = Math.hypot(dx[0], dx[1], dx[2]);
            const rh = [dx[0]/r, dx[1]/r, dx[2]/r];
            const Dt = cf - (vj[0]*rh[0] + vj[1]*rh[1] + vj[2]*rh[2]);
            const f = kap * s.pol * pm * Dt / (r * r);
            const F = [f*rh[0], f*rh[1], f*rh[2]];
            rows.push({ L, dT: (Xj[1]*F[2] - Xj[2]*F[1]) / Nt, tau: r / cf });
          }
        }
      }
      return rows;
    };
    const rot = (pHat, ax, h) => {
      // rotate pHat by angle h about axis ax (Rodrigues, small angles fine)
      const c = Math.cos(h), s2 = Math.sin(h);
      const cx = [ax[1]*pHat[2]-ax[2]*pHat[1], ax[2]*pHat[0]-ax[0]*pHat[2], ax[0]*pHat[1]-ax[1]*pHat[0]];
      const d = ax[0]*pHat[0] + ax[1]*pHat[1] + ax[2]*pHat[2];
      return [0,1,2].map((i) => pHat[i]*c + cx[i]*s2 + ax[i]*d*(1-c));
    };
    const h = 0.03;
    const grad = [e2, e1].map((ax, gi) => {
      // rotation about e2 tips pHat toward e1 and vice versa; label by tip direction
      const rp = torqueEntries(rot(mem.bHat, ax, +h));
      const rm = torqueEntries(rot(mem.bHat, ax, -h));
      return rp.map((e, i) => ({ L: e.L, dT: (e.dT - rm[i].dT) / (2 * h), tau: (e.tau + rm[i].tau) / 2 }));
    });
    return { e1, e2, gradTipE1: grad[0], gradTipE2: grad[1] };
  });
  // assemble the complex chain per omega
  const cMul2 = (a, b) => [a[0]*b[0]-a[1]*b[1], a[0]*b[1]+a[1]*b[0]];
  const results = omegaList.map((om) => {
    const relax = (() => { const d2 = gamma*gamma + om*om; return [gamma*gamma/d2, -gamma*om/d2]; })(); // gamma/(gamma+i om)
    const dSea = [[0,0,0],[0,0,0],[0,0,0]], kSea = [[0,0,0],[0,0,0],[0,0,0]];
    for (let mi = 0; mi < linkA.length; mi++) {
      const A = linkA[mi], B = linkB[mi];
      for (let Lp = 0; Lp < 3; Lp++) {
        // complex field-direction modulation, projected on e1/e2 (tangent plane)
        let a1 = [0, 0], a2 = [0, 0];
        for (const e of A.sens[Lp]) {
          const ph = [Math.cos(om * e.tau), -Math.sin(om * e.tau)];
          const proj1 = (e.dvec[0]*B.e1[0] + e.dvec[1]*B.e1[1] + e.dvec[2]*B.e1[2]) / A.bn / Nt;
          const proj2 = (e.dvec[0]*B.e2[0] + e.dvec[1]*B.e2[1] + e.dvec[2]*B.e2[2]) / A.bn / Nt;
          a1 = [a1[0] + proj1*ph[0], a1[1] + proj1*ph[1]];
          a2 = [a2[0] + proj2*ph[0], a2[1] + proj2*ph[1]];
        }
        const r1 = cMul2(relax, a1), r2 = cMul2(relax, a2);
        for (let L = 0; L < 3; L++) {
          let C = [0, 0];
          for (const e of B.gradTipE1) if (e.L === L) {
            const ph = [Math.cos(om * e.tau), -Math.sin(om * e.tau)];
            C = [C[0] + e.dT * cMul2(ph, r1)[0], C[1] + e.dT * cMul2(ph, r1)[1]];
          }
          for (const e of B.gradTipE2) if (e.L === L) {
            const ph = [Math.cos(om * e.tau), -Math.sin(om * e.tau)];
            C = [C[0] + e.dT * cMul2(ph, r2)[0], C[1] + e.dT * cMul2(ph, r2)[1]];
          }
          dSea[L][Lp] += C[1] / om; // Im(C)/omega: velocity block
          kSea[L][Lp] += C[0];      // Re(C): stiffness shift (report only)
        }
      }
    }
    return { omega: om, dSea, kSea,
      diag: [dSea[0][0], dSea[1][1], dSea[2][2]],
      dampingDiagonal: dSea[0][0] < 0 && dSea[2][2] < 0 };
  });
  return { Rsea, gamma, omega: w, kappaStar: kap, p0, results };
}

// ===========================================================================
// DRIFTING FAMILY: THE MOVING FIXED POINT V5(u) AND THE DRIFT AXIS PENCIL
// (Section 67 next closure goal; spec Section 68). Sections 24-29 established
// that the spindle family closes BETTER moving than at rest, with a finite
// preferred speed basin u* ~ 0.5-0.65 and a closure anisotropy that prefers
// axis-parallel motion (the orientation torque). Sections 61-66 closed every
// RESTING-frame axis absorber. The surviving hypothesis (Section 67): the
// orientation torque is the moving family's axis restoring channel — it exists
// ONLY at drift and is absent from every resting pencil. These instruments
// rebuild the self-equilibrated fixed point and the gyroscopic-circulatory
// axis pencil ON the screw-drifting family (helical worldlines, drift along the
// spin/z axis at u, pinned cadence c = sqrt(1-u^2) = 1/gamma, frozen kappa).
//
// Screw discipline: at the ALIGNED fixed point (spin axis || drift || z) the
// motion is a pure screw and single-time rigid evaluation is exact (the
// evaluator's screwRigidity witness). Tilt perturbations break the screw
// (translation axis != instantaneous rotation axis), so tilt torques are
// cycle-sampled (the residualsPerp discipline), exactly as the resting pencil
// already cycle-averages. NOT evidence; fail-closed; prescribed-worldline seed
// grade until a native run says otherwise.
// ---------------------------------------------------------------------------

// Drift support ratios at the pinned cadence c = sqrt(1-u^2). Mirrors
// supportRatios exactly (single-time T=0, screw-rigid) but threads u into the
// braid so the wake sees the fore-aft-anisotropic drift geometry; at u=0 it
// reproduces supportRatios to the digit.
export function driftSupportRatios({ geo = SELF_EQUILIBRATED_V5.geo, u = 0, soft = 0.02 } = {}) {
  const c = Math.sqrt(Math.max(1e-9, 1 - u * u));
  const braid = buildBraid({ u, cTrans: c, geo });
  const w = braid.omega;
  const res = residuals({ u, cTrans: c, geo }, { soft });
  const kap = res.kappaStar;
  const layers = [];
  for (const i of [0, 2, 4]) {
    const s = braid.sites[i];
    const rhoCyl = s.R * Math.cos(s.alpha);
    const rx = Math.cos(s.th), ry = Math.sin(s.th);
    const tx = -Math.sin(s.th), ty = Math.cos(s.th);
    const wk = wakeAccel(braid, i, 0, { soft }).a;
    const inward = -(wk[0] * rx + wk[1] * ry);
    const need = w * w * rhoCyl;
    const tanRow = kap * (wk[0] * tx + wk[1] * ty);
    layers.push({ layer: s.name, support: (kap * inward) / need, tanRow, rhoCyl, speed: w * rhoCyl });
  }
  return { u, cadence: c, omega: w, kappaStar: kap, closure: res.globalRelResidual,
    ratios: Object.fromEntries(layers.map((l) => [l.layer, l.support])),
    tanRows: Object.fromEntries(layers.map((l) => [l.layer, l.tanRow])),
    minRatio: Math.min(...layers.map((l) => l.support)),
    maxAbsTan: Math.max(...layers.map((l) => Math.abs(l.tanRow))),
    objective: layers.reduce((s2, l) => s2 + (l.support - 1) ** 2, 0) };
}

// Net rail-pinned radial force per layer on the drifting braid at displaced
// radii (dI, dM, dO), frozen kappa. The middle rides the gamma-scaled rail:
// its transverse speed is pinned at c = sqrt(1-u^2) (so total speed = c_f), and
// omega = c/(R_M cos alphaM) responds to R_M — the speed pin is the size pin,
// now at drift. Single-time (screw-rigid at the aligned config).
function driftNetForces(geo, disp, u, kap, soft) {
  const [dI, dM, dO] = disp;
  const c = Math.sqrt(Math.max(1e-9, 1 - u * u));
  const seed = buildBraid({ u, cTrans: c, geo });
  const wEff = c / ((1 + dM) * Math.cos(geo.alphaM));
  const b = { omega: wEff, u, sea: [], sites: seed.sites.map((s) => ({ ...s })) };
  for (const s of b.sites) { if (s.name === "I") s.R = geo.qI + dI; if (s.name === "M") s.R = 1 + dM; if (s.name === "O") s.R = geo.qO + dO; }
  const F = [];
  for (const idx of [0, 2, 4]) {
    const s = b.sites[idx];
    const rhoCyl = s.R * Math.cos(s.alpha);
    const rx = Math.cos(s.th), ry = Math.sin(s.th);
    const wk = wakeAccel(b, idx, 0, { soft }).a;
    const inward = -(wk[0] * rx + wk[1] * ry) * kap;
    F.push(inward - wEff * wEff * rhoCyl);
  }
  return F;
}

// The moving rail-pinned radial equilibrium at drift u: 3-D Newton on
// (r_I, r_M, r_O) at frozen kappa with the gamma-scaled rail pin. Returns the
// contraction factor lambda = R_M/R_M(seed), the shape at equilibrium, the
// rail-pinned radial spectrum (basin?), and the derived absolute size
// R_M(eq)/kappa. At u=0 it reproduces railPinnedEquilibrium's fixed point.
export function driftRailPinnedEquilibrium({ geo = SELF_EQUILIBRATED_V5.geo, u = 0, eps = 0.01, soft = 0.02, iters = 20 } = {}) {
  const c = Math.sqrt(Math.max(1e-9, 1 - u * u));
  const kap0 = residuals({ u, cTrans: c, geo }, { soft }).kappaStar;
  let x = [0, 0, 0], lastF = null, lastK = null;
  for (let it = 0; it < iters; it++) {
    const F = driftNetForces(geo, x, u, kap0, soft);
    lastF = F;
    if (Math.max(...F.map(Math.abs)) < 5e-5) break;
    const K = [[0,0,0],[0,0,0],[0,0,0]];
    for (let j = 0; j < 3; j++) {
      const dp = x.slice(), dm = x.slice();
      dp[j] += eps; dm[j] -= eps;
      const Fp = driftNetForces(geo, dp, u, kap0, soft), Fm = driftNetForces(geo, dm, u, kap0, soft);
      for (let i = 0; i < 3; i++) K[i][j] = (Fp[i] - Fm[i]) / (2 * eps);
    }
    lastK = K;
    const det3 = (A) => A[0][0]*(A[1][1]*A[2][2]-A[1][2]*A[2][1]) - A[0][1]*(A[1][0]*A[2][2]-A[1][2]*A[2][0]) + A[0][2]*(A[1][0]*A[2][1]-A[1][1]*A[2][0]);
    const D = det3(K);
    if (Math.abs(D) < 1e-14) break;
    const col = (jj, b) => K.map((row, i) => row.map((v, kk) => (kk === jj ? b[i] : v)));
    const dlt = [0,1,2].map((j) => det3(col(j, F.map((v) => -v))) / D);
    const damp = Math.min(1, 0.1 / Math.max(...dlt.map(Math.abs), 1e-9));
    for (let j = 0; j < 3; j++) x[j] += dlt[j] * damp;
  }
  // rail-pinned spectrum at the fixed point (symmetric part of the radial K)
  const Kf = [[0,0,0],[0,0,0],[0,0,0]];
  for (let j = 0; j < 3; j++) {
    const dp = x.slice(), dm = x.slice();
    dp[j] += eps; dm[j] -= eps;
    const Fp = driftNetForces(geo, dp, u, kap0, soft), Fm = driftNetForces(geo, dm, u, kap0, soft);
    for (let i = 0; i < 3; i++) Kf[i][j] = (Fp[i] - Fm[i]) / (2 * eps);
  }
  const sym = Kf.map((row, i) => row.map((v, j) => (v + Kf[j][i]) / 2));
  const eig = jacobiEigSym(sym);
  const lambda = 1 + x[1];
  const shape = { qI: (geo.qI + x[0]) / lambda, qO: (geo.qO + x[2]) / lambda };
  return { u, cadence: c, displacement: x, lambda, shapeEq: shape,
    residualF: lastF, railPinnedSpectrum: eig.map((e) => e.value),
    basin: eig.every((e) => e.value < 0), kappaFrozen: kap0,
    ReqOverKappa: lambda / kap0 };
}

// The moving self-equilibrated fixed point V5(u): alternate the drift
// rail-pinned radial equilibrium with tangential angle-descent (drive tau_I,
// tau_O -> 0 by coordinate descent on the misalignment angles alphaI, alphaO,
// thetaO, thetaI; alphaM held 0, rail clean) until both the radial residual and
// the tangential rows are small. Witnessed against the u=0 V5 export. The
// per-u geometry is the drifting champion at seed grade (Sections 24-26 report
// the closure-optimal angles run with u; here the objective is the ledger, not
// closure, consistent with the arc's survival statistic).
export function driftFixedPoint({ u = 0.2, geoStart = SELF_EQUILIBRATED_V5.geo, passes = 3, soft = 0.02 } = {}) {
  let geo = { ...geoStart };
  const c = Math.sqrt(Math.max(1e-9, 1 - u * u));
  const tanObj = (g) => { const r = driftSupportRatios({ geo: g, u, soft }); return r.tanRows.I * r.tanRows.I + r.tanRows.O * r.tanRows.O; };
  const steps = { alphaI: 3 * d, alphaO: 3 * d, thetaO: 6 * d, thetaI: 6 * d };
  let eq = null;
  for (let pass = 0; pass < passes; pass++) {
    // radial re-equilibration: apply the contraction to the radii/shape
    eq = driftRailPinnedEquilibrium({ geo, u, soft });
    geo = { ...geo, qI: eq.shapeEq.qI, qO: eq.shapeEq.qO };
    // tangential angle-descent
    let obj = tanObj(geo);
    for (const k of Object.keys(steps)) {
      for (const sgn of [+1, -1]) {
        let improved = true;
        while (improved) {
          const trial = { ...geo, [k]: (geo[k] ?? 0) + sgn * steps[k] };
          const t = tanObj(trial);
          if (t < obj - 1e-7) { geo = trial; obj = t; } else improved = false;
        }
      }
    }
  }
  const rows = driftSupportRatios({ geo, u, soft });
  return { u, cadence: c, geo,
    deg: { alphaI: (geo.alphaI ?? 0) / d, alphaO: (geo.alphaO ?? 0) / d, thetaO: (geo.thetaO ?? 0) / d, thetaI: (geo.thetaI ?? 0) / d },
    lambda: eq.lambda, ReqOverKappa: eq.ReqOverKappa, kappaFrozen: eq.kappaFrozen,
    residualF: eq.residualF, railPinnedSpectrum: eq.railPinnedSpectrum, basin: eq.basin,
    support: rows.ratios, tanRows: rows.tanRows, closure: rows.closure,
    minRatio: rows.minRatio, maxAbsTan: rows.maxAbsTan };
}

// THE DRIFTING GYROSCOPIC-CIRCULATORY AXIS PENCIL (spec Section 68). Rebuilds
// the completed axis pencil P(lambda) = lambda^2 M + lambda (G - D) + Gamma - K
// on the SCREW-DRIFTING family: helical worldlines (drift u along the lab z-axis
// = the aligned spin axis), pinned cadence c = sqrt(1-u^2), tilt perturbations
// applied to the internal circular motion with the drift held along fixed lab z
// (so a tilt is a misalignment of the spin axis RELATIVE to the drift — exactly
// the Sections 28-29 orientation-torque coordinate). The Sections 28-29 closure
// anisotropy enters through the MEASURED K(u), not by hand.
//
// THE DRIFT NULL STRUCTURE (stated and validated before any spectrum claim).
// At u=0 empty-space isotropy makes BOTH global tilts (global-x, global-y) exact
// nulls of K_eff = K - Gamma: the pencil carries a double zero root (deflated).
// At drift, tilting the spin axis away from the drift direction costs closure in
// EVERY transverse direction equally (residual axisymmetry about the drift axis),
// so the global-tilt subspace acquires an ISOTROPIC restoring stiffness k(u) > 0
// — the orientation torque. The double null is BROKEN: the former zero pair lifts
// into a global nutation/precession pair set by k(u) and the gyroscopic J. The
// only exact symmetry left is rigid rotation about the drift axis, which acts
// trivially on the (drift-fixed) tilt coordinates — so in these coordinates there
// is NO residual exact tilt null; the quotient discipline becomes: count the
// roots at numerical zero (2 at u=0, 0 once k(u) lifts them), deflate exactly
// those, and read the verdict from the rest. k(u) and its isotropy are reported
// as the claim-bearing validation rows.
//
// clickPump: the Section 66 native rate-sign-following click pump on the middle
// (+0.3-class, anti-damping) added to the middle diagonal of the tilt-rate block
// (the "with native click pump" verdict cell). NOT evidence; fail-closed;
// prescribed-worldline seed grade.
export function driftAxisPencil({ geo = SELF_EQUILIBRATED_V5.geo, u = 0, Nt = 8, soft = 0.02, eta = 0.03, etaDot = 0.02, clickPump = 0, extraDampingLayers = null, rateBlockScale = 1, pumpAbsorbed = false } = {}) {
  const cf = 1;
  const c = Math.sqrt(Math.max(1e-9, 1 - u * u));
  const seed = buildBraid({ u, cTrans: c, geo });
  const w = seed.omega, period = 2 * Math.PI / w;
  const kap = residuals({ u, cTrans: c, geo }, { soft }).kappaStar;
  const stretch = 1 / Math.max(0.2, 1 - Math.abs(u));
  const dmax = Math.min(7, 4 * stretch), Nscan = Math.min(4200, Math.ceil(2400 * stretch));
  const layerConst = [];
  for (const i of [0, 2, 4]) {
    const s = seed.sites[i];
    const rho = s.R * Math.cos(s.alpha), z = s.R * Math.sin(s.alpha);
    layerConst.push({ name: s.name, m: rho * rho + 2 * z * z, J: 2 * rho * rho * w });
  }
  const rotX = (v, cc, s) => [v[0], cc * v[1] - s * v[2], s * v[1] + cc * v[2]];
  const rotY = (v, cc, s) => [cc * v[0] + s * v[2], v[1], -s * v[0] + cc * v[2]];
  const crossX = (v) => [0, -v[2], v[1]];
  const crossY = (v) => [v[2], 0, -v[0]];
  // worldline family: internal circular motion p0/v0 (cadence w), tilted about
  // x then y (static tilt + optional constant rate about the readout time tRef),
  // THEN drifted along fixed lab z at speed u (drift is NOT rotated by the tilt).
  const mk = (ex, ey, exDot, eyDot, tRef) => seed.sites.map((s) => {
    const L = s.name === "I" ? 0 : s.name === "M" ? 1 : 2;
    const p0 = (t) => { const a = w * t + s.th, ca = Math.cos(s.alpha); return [s.sgn*s.R*ca*Math.cos(a), s.sgn*s.R*ca*Math.sin(a), s.sgn*s.R*Math.sin(s.alpha)]; };
    const v0 = (t) => { const a = w * t + s.th, v = s.sgn*s.R*Math.cos(s.alpha)*w; return [-v*Math.sin(a), v*Math.cos(a), 0]; };
    return {
      pol: s.pol, L,
      pos: (t) => {
        const ax = ex[L] + exDot[L] * (t - tRef), ay = ey[L] + eyDot[L] * (t - tRef);
        const tl = rotY(rotX(p0(t), Math.cos(ax), Math.sin(ax)), Math.cos(ay), Math.sin(ay));
        return [tl[0], tl[1], tl[2] + u * t];
      },
      vel: (t) => {
        const ax = ex[L] + exDot[L] * (t - tRef), ay = ey[L] + eyDot[L] * (t - tRef);
        const cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay);
        const pX = rotX(p0(t), cx, sx);
        const term1 = crossY(rotY(pX, cy, sy)).map((v) => eyDot[L] * v);
        const term2 = rotY(crossX(pX).map((v) => exDot[L] * v), cy, sy);
        const term3 = rotY(rotX(v0(t), cx, sx), cy, sy);
        return [term1[0]+term2[0]+term3[0], term1[1]+term2[1]+term3[1], term1[2]+term2[2]+term3[2] + u];
      },
    };
  });
  const torques = (ex, ey, exDot, eyDot, perSampleRef) => {
    const Tx = [0, 0, 0], Ty = [0, 0, 0], Tz = [0, 0, 0];
    for (let k = 0; k < Nt; k++) {
      const t = (k / Nt) * period;
      const sites = mk(ex, ey, exDot, eyDot, perSampleRef ? t : 0);
      for (let i = 0; i < sites.length; i++) {
        const rec = sites[i];
        const Xi = rec.pos(t), vi = rec.vel(t);
        const F = [0, 0, 0];
        for (let j = 0; j < sites.length; j++) {
          if (j === i) continue;
          const src = sites[j];
          const g = (te) => { const p = src.pos(te); return Math.hypot(Xi[0]-p[0], Xi[1]-p[1], Xi[2]-p[2]) - cf * (t - te); };
          let g0 = g(t - dmax);
          for (let kk = 1; kk <= Nscan; kk++) {
            const te = t - dmax + dmax * (kk / Nscan);
            if (te >= t - 1e-9) break;
            const g1 = g(te);
            if ((g0 < 0) !== (g1 < 0)) {
              let lo = t - dmax + dmax * ((kk - 1) / Nscan), hi = te; const gl = g(lo);
              for (let b = 0; b < 50; b++) { const mid = (lo + hi) / 2; if ((gl < 0) === (g(mid) < 0)) lo = mid; else hi = mid; }
              const te0 = (lo + hi) / 2;
              const p = src.pos(te0);
              const dx = [Xi[0]-p[0], Xi[1]-p[1], Xi[2]-p[2]];
              const r = Math.hypot(dx[0], dx[1], dx[2]);
              if (r > 1e-9) {
                const rh = [dx[0]/r, dx[1]/r, dx[2]/r];
                const vs = src.vel(te0);
                const Ds = cf - (vs[0]*rh[0] + vs[1]*rh[1] + vs[2]*rh[2]);
                const Dt = cf - (vi[0]*rh[0] + vi[1]*rh[1] + vi[2]*rh[2]);
                const mfac = (Dt * Ds) / (Ds * Ds + soft * soft);
                const wgt = (rec.pol * src.pol) * mfac / (r * r);
                F[0] += wgt * rh[0]; F[1] += wgt * rh[1]; F[2] += wgt * rh[2];
              }
            }
            g0 = g1;
          }
        }
        Tx[rec.L] += kap * (Xi[1] * F[2] - Xi[2] * F[1]) / Nt;
        Ty[rec.L] += kap * (Xi[2] * F[0] - Xi[0] * F[2]) / Nt;
        Tz[rec.L] += kap * (Xi[0] * F[1] - Xi[1] * F[0]) / Nt;
      }
    }
    return { Tx, Ty, Tz };
  };
  const Z = [0, 0, 0];
  const base = torques(Z, Z, Z, Z, false);
  const tau0 = base.Tz.slice();
  const baselineTransverse = Math.max(...base.Tx.map(Math.abs), ...base.Ty.map(Math.abs));
  // static stiffness blocks
  const A = [[0,0,0],[0,0,0],[0,0,0]], B = [[0,0,0],[0,0,0],[0,0,0]];
  const Dx = [[0,0,0],[0,0,0],[0,0,0]], E = [[0,0,0],[0,0,0],[0,0,0]];
  for (let j = 0; j < 3; j++) {
    const ep = [0,0,0], em = [0,0,0]; ep[j] = eta; em[j] = -eta;
    const px = torques(ep, Z, Z, Z, false), mx = torques(em, Z, Z, Z, false);
    const py = torques(Z, ep, Z, Z, false), my = torques(Z, em, Z, Z, false);
    for (let i = 0; i < 3; i++) {
      A[i][j] = (px.Tx[i] - mx.Tx[i]) / (2 * eta);
      Dx[i][j] = (px.Ty[i] - mx.Ty[i]) / (2 * eta);
      B[i][j] = (py.Tx[i] - my.Tx[i]) / (2 * eta);
      E[i][j] = (py.Ty[i] - my.Ty[i]) / (2 * eta);
    }
  }
  // delay-memory tilt-rate blocks (per-sample tRef: zero tilt at readout)
  const P = [[0,0,0],[0,0,0],[0,0,0]], Q = [[0,0,0],[0,0,0],[0,0,0]];
  const Rl = [[0,0,0],[0,0,0],[0,0,0]], S = [[0,0,0],[0,0,0],[0,0,0]];
  for (let j = 0; j < 3; j++) {
    const rp = [0,0,0], rm = [0,0,0]; rp[j] = etaDot; rm[j] = -etaDot;
    const px = torques(Z, Z, rp, Z, true), mx = torques(Z, Z, rm, Z, true);
    const py = torques(Z, Z, Z, rp, true), my = torques(Z, Z, Z, rm, true);
    for (let i = 0; i < 3; i++) {
      P[i][j] = (px.Tx[i] - mx.Tx[i]) / (2 * etaDot);
      Rl[i][j] = (px.Ty[i] - mx.Ty[i]) / (2 * etaDot);
      Q[i][j] = (py.Tx[i] - my.Tx[i]) / (2 * etaDot);
      S[i][j] = (py.Ty[i] - my.Ty[i]) / (2 * etaDot);
    }
  }
  const scale = Math.max(...A.flat().map(Math.abs), ...B.flat().map(Math.abs), 1e-9);
  const covK = Math.max(...A.map((r, i) => r.map((v, j) => Math.abs(E[i][j] - v))).flat(),
    ...B.map((r, i) => r.map((v, j) => Math.abs(Dx[i][j] + v))).flat());
  const covD = Math.max(...P.map((r, i) => r.map((v, j) => Math.abs(S[i][j] - v))).flat(),
    ...Q.map((r, i) => r.map((v, j) => Math.abs(Rl[i][j] + v))).flat());
  const crossRowSums = [0,1,2].map((i) => B[i][0] + B[i][1] + B[i][2]);
  const pumpWitness = Math.max(...[0,1,2].map((i) => Math.abs(crossRowSums[i] - tau0[i])));
  // orientation-torque (global-tilt) stiffness: the broken null. kGlobalX =
  // mean restoring x-torque per unit global-x tilt = -(1/3) sum_ij A[i][j];
  // isotropy witness compares it to the global-y stiffness from E.
  const kGlobalX = -[0,1,2].reduce((sA, i) => sA + A[i][0] + A[i][1] + A[i][2], 0) / 3;
  const kGlobalY = -[0,1,2].reduce((sA, i) => sA + E[i][0] + E[i][1] + E[i][2], 0) / 3;
  const kGlobalCross = -[0,1,2].reduce((sA, i) => sA + B[i][0] + B[i][1] + B[i][2], 0) / 3;
  // assemble the pencil
  const m = layerConst.map((l) => l.m), J = layerConst.map((l) => l.J);
  const tau = pumpAbsorbed ? [tau0[0], 0, tau0[2]] : tau0;
  const K6 = [
    ...[0,1,2].map((i) => [...A[i], ...B[i]]),
    ...[0,1,2].map((i) => [...Dx[i], ...E[i]]),
  ];
  const D6t = [
    ...[0,1,2].map((i) => [...P[i], ...Q[i]]),
    ...[0,1,2].map((i) => [...Rl[i], ...S[i]]),
  ];
  // native click pump (Section 66): +clickPump anti-damping on the middle
  // tilt-rate diagonal (both transverse components).
  D6t[1][1] += clickPump; D6t[4][4] += clickPump;
  const M6 = Array.from({ length: 6 }, (_, i) => Array.from({ length: 6 }, (_, j) => (i === j ? m[i % 3] : 0)));
  const G6 = Array.from({ length: 6 }, () => Array(6).fill(0));
  for (let l = 0; l < 3; l++) { G6[l][3 + l] = +J[l]; G6[3 + l][l] = -J[l]; }
  const Gam6 = Array.from({ length: 6 }, () => Array(6).fill(0));
  for (let l = 0; l < 3; l++) { Gam6[l][3 + l] = +tau[l]; Gam6[3 + l][l] = -tau[l]; }
  const dampLayers = extraDampingLayers ?? [0, 0, 0];
  const Cvel = Array.from({ length: 6 }, (_, i) => Array.from({ length: 6 }, (_, j) =>
    G6[i][j] - rateBlockScale * D6t[i][j] + (i === j ? dampLayers[i % 3] : 0)));
  // complex determinant + Durand-Kerner
  const cAdd = (a, b) => [a[0]+b[0], a[1]+b[1]];
  const cSub = (a, b) => [a[0]-b[0], a[1]-b[1]];
  const cMul = (a, b) => [a[0]*b[0]-a[1]*b[1], a[0]*b[1]+a[1]*b[0]];
  const cDiv = (a, b) => { const d2 = b[0]*b[0]+b[1]*b[1]; return [(a[0]*b[0]+a[1]*b[1])/d2, (a[1]*b[0]-a[0]*b[1])/d2]; };
  const cAbs = (a) => Math.hypot(a[0], a[1]);
  const detC = (Min) => {
    const n = Min.length; const Mx = Min.map((r) => r.map((v) => [v[0], v[1]]));
    let det = [1, 0];
    for (let cc = 0; cc < n; cc++) {
      let p = cc;
      for (let r = cc + 1; r < n; r++) if (cAbs(Mx[r][cc]) > cAbs(Mx[p][cc])) p = r;
      if (cAbs(Mx[p][cc]) < 1e-300) return [0, 0];
      if (p !== cc) { const t = Mx[p]; Mx[p] = Mx[cc]; Mx[cc] = t; det = cMul(det, [-1, 0]); }
      det = cMul(det, Mx[cc][cc]);
      for (let r = cc + 1; r < n; r++) { const f = cDiv(Mx[r][cc], Mx[cc][cc]); for (let c2 = cc; c2 < n; c2++) Mx[r][c2] = cSub(Mx[r][c2], cMul(f, Mx[cc][c2])); }
    }
    return det;
  };
  const pencil = (lam) => {
    const l2 = cMul(lam, lam); const Pm = [];
    for (let i = 0; i < 6; i++) { Pm.push([]); for (let j = 0; j < 6; j++) Pm[i].push(cAdd(cAdd(cMul(l2, [M6[i][j], 0]), cMul(lam, [Cvel[i][j], 0])), [Gam6[i][j] - K6[i][j], 0])); }
    return detC(Pm);
  };
  const leading = m[0]*m[0]*m[1]*m[1]*m[2]*m[2];
  const deg = 12;
  let roots = Array.from({ length: deg }, (_, i) => { const ang = (2 * Math.PI * i) / deg + 0.4; const rad = 1.5 * Math.max(Math.sqrt(scale / Math.min(...m)), Math.max(...J) / Math.min(...m)); return [rad * Math.cos(ang), rad * Math.sin(ang)]; });
  let dkResidual = Infinity;
  for (let it = 0; it < 500; it++) {
    let moved = 0;
    for (let i = 0; i < deg; i++) {
      let denom = [leading, 0];
      for (let j = 0; j < deg; j++) if (j !== i) denom = cMul(denom, cSub(roots[i], roots[j]));
      const delta = cDiv(pencil(roots[i]), denom);
      roots[i] = cSub(roots[i], delta); moved = Math.max(moved, cAbs(delta));
    }
    dkResidual = moved; if (moved < 1e-13) break;
  }
  const rootRows = roots.map((r) => ({ re: r[0], im: r[1], mag: Math.hypot(r[0], r[1]) })).sort((x, y) => y.re - x.re);
  // adaptive null deflation: count roots at numerical zero (2 at u=0, fewer once
  // the orientation torque lifts them), deflate exactly those.
  const nullTol = 5e-3;
  const nullRoots = rootRows.filter((r) => r.mag < nullTol);
  const nullCount = nullRoots.length;
  const deflated = rootRows.filter((r) => r.mag >= nullTol);
  const growing = deflated.filter((r) => r.re > 1e-6);
  const maxGrowth = deflated.length ? deflated[0] : null;
  return {
    u, cadence: c, omega: w, kappaStar: kap, clickPump, pumpAbsorbed,
    layers: layerConst, blocks: { A, B, P, Q, E }, tau0, tauUsed: tau,
    baselineTransverse,
    covarianceWitness: { staticBlocks: covK, rateBlocks: covD, scale },
    orientationTorque: { kGlobalX, kGlobalY, kGlobalCross,
      isotropy: Math.abs(kGlobalX - kGlobalY), restoring: kGlobalX > 0 && kGlobalY > 0 },
    globalNull: { pumpWitness, ok: pumpWitness < 0.05 * Math.max(scale, 1e-9) },
    scanParams: { stretch, dmax, Nscan },
    dkResidual,
    eigenvalues: rootRows,
    nullCount, nullRoots: nullRoots.map((r) => ({ re: r.re, im: r.im })),
    quotientEigenvalues: deflated,
    whirl: deflated.filter((r) => Math.abs(r.im) > 1e-6).length,
    flutter: growing.length > 0,
    flutterModes: growing,
    maxGrowthRate: maxGrowth ? maxGrowth.re : null,
    maxGrowthWhirlFrequency: maxGrowth ? Math.abs(maxGrowth.im) : null,
  };
}

// The drift verdict ladder (spec Section 68): the completed axis pencil across a
// u grid, with and without the native click pump, reporting the orientation
// torque k(u), the max growth rate, the whirl frequency, and the threshold u (if
// any) where the axis sector turns restoring.
export function driftVerdictLadder({ geo = SELF_EQUILIBRATED_V5.geo, uGrid = [0, 0.1, 0.2, 0.35, 0.5, 0.6], Nt = 8, soft = 0.02, clickPump = 0 } = {}) {
  const rows = uGrid.map((u) => {
    const r = driftAxisPencil({ geo, u, Nt, soft, clickPump });
    return { u, kGlobalX: r.orientationTorque.kGlobalX, kGlobalY: r.orientationTorque.kGlobalY,
      isotropy: r.orientationTorque.isotropy, nullCount: r.nullCount,
      maxGrowthRate: r.maxGrowthRate, whirlFreq: r.maxGrowthWhirlFrequency,
      flutter: r.flutter, pumpWitness: r.globalNull.pumpWitness };
  });
  let threshold = null;
  for (let i = 1; i < rows.length; i++) {
    const a = rows[i - 1], b = rows[i];
    if (a.maxGrowthRate > 0 && b.maxGrowthRate <= 0) {
      threshold = a.u + (b.u - a.u) * a.maxGrowthRate / (a.maxGrowthRate - b.maxGrowthRate);
      break;
    }
  }
  return { clickPump, rows, thresholdU: threshold,
    stabilizes: rows.some((r) => r.maxGrowthRate !== null && r.maxGrowthRate <= 0) };
}

// ============================================================================
// COUPLED BRAID+SEA COMPLEX FIXED-POINT INSTRUMENT (Section 70 reframe;
// build spec: coupled-braid-sea-complex-fixed-point-instrument-spec.md).
// The Section 70 Tangential-Sea No-Go bars a LOCAL equatorial-rail sea brake.
// The reframe: the "+0.076 deficit" is a local quantity manufactured by freezing
// beta_M, the deformation coordinate, and the sea. The open question is whether
// the middle rail-pump angular momentum TRANSPORTS off the equator (via the §69
// internal-deformation coordinate) into the off-equatorial/axis sector where the
// sea CAN drain it (Row-4 +0.117 inner; §68 k(u) axis) -- a GLOBAL angular-
// momentum balance, not a local brake. This instrument books that global flow.
// REFERENCE/SEED grade; central solver untouched; consumes internalDeformationPencil
// (transport), seaTiltDampingEstimate (drain), driftFixedPoint (radial/axis) read-only.
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.
// ============================================================================

// Gate 1 (declared) + Gate 2 (measured native) + Gate 3 (measured §69) +
// Gate 4 (measured §67): the four-gate cycle-averaged angular-momentum-flow book.
export function angularMomentumFlowLedger({
  geo = SELF_EQUILIBRATED_V5.geo, pump = 0.2274, brakeFracMax = 0.667,
  Nt = 8, soft = 0.02, Rsea = 3.4, gamma = 1.0, coupling = "all",
  u = 0, driftAngle = 0, baseTilt = 0, parametric = true,
} = {}) {
  // Gate 1 -- rail-pump injection at the middle equator (§60 declared).
  const pumpInject = pump;
  // Gate 2 -- LOCAL self-hit brake on the rail (§66 native ceiling, ALLOWED: it
  // is the braid's own same-source channel, not a sea force). Caps at 2/3.
  const selfHitBrake = brakeFracMax * pump;
  const railResidual = pumpInject - selfHitBrake; // the 1/3-pump deficit on the rail
  // Gate 3 -- transport off the equator through the §69 internal-deformation
  // cross-blocks. DC/linear channel = the stiffness cross-blocks C_rt, C_tr
  // (move a STEADY rail deficit into the tilt/axis sector). Parametric channel =
  // the spin-transport G_rt (dJds) + the -0.48 size->flutter modulation (acts on
  // the breathing RATE, oscillatory; carried to the reduced escapement below).
  const pen = coupling === "none"
    ? { crossBlocks: { crtNorm: 0, ctrNorm: 0, crtNormRel: 0, ctrNormRel: 0 }, parametricCoupling: { dFlutter_dSize: 0, dJds: [0, 0, 0] }, scale: 1 }
    : internalDeformationPencil({ geo, coupling: "all", parametric, Nt, soft, u, driftAngle, baseTilt });
  // The DC transport authority is the DIMENSIONLESS coupling fraction of a rail/
  // breathing perturbation that the stiffness cross-blocks move into the tilt/
  // axis sector. C_tr = dT/ds (breathing -> tilt torque) is the transport-off-
  // equator channel; C_rt = dF_rad/deta the reciprocal. §71: both ≈0 at the
  // axisymmetric rest fixed point; broken symmetry (drift/anchored axis) opens them.
  const transportDC = Math.max(pen.crossBlocks.crtNormRel, pen.crossBlocks.ctrNormRel); // fraction moved off-equator
  const transportDCFracOfDeficit = transportDC;
  const transportParam = pen.parametricCoupling ? pen.parametricCoupling.dFlutter_dSize : 0; // -0.48 class, RATE/oscillatory
  const spinTransportGrt = pen.parametricCoupling ? pen.parametricCoupling.dJds : [0, 0, 0];
  // Gate 4 -- off-equatorial sea drain (§67; the ONE channel the No-Go leaves
  // open). Read the sea tilt-damping estimate and take the best damping-band
  // cell's INNER diagonal (the No-Go-permitted off-equatorial channel) as the
  // drain rate. §67 Result 2: the sea starves the inner tilt sector (<=0.02).
  let seaInnerDrain = 0, seaMiddleDiag = 0, seaBandOmega = null, seaCirculatory = null;
  if (coupling !== "none") {
    const est = seaTiltDampingEstimate({ geo, Rsea, gamma, Nt, soft });
    const band = est.results.filter((r) => r.dampingDiagonal);
    const cell = band.length ? band.reduce((a, b) => (Math.abs(b.diag[1]) > Math.abs(a.diag[1]) ? b : a)) : est.results[0];
    seaInnerDrain = Math.abs(cell.diag[0]); // inner tilt-sector damping RATE (off-equatorial)
    seaMiddleDiag = Math.abs(cell.diag[1]);
    seaBandOmega = cell.omega;
    // circulatory dominance witness (§67 Result 3): off-diagonals dwarf diagonals
    const offMax = Math.max(Math.abs(cell.dSea[0][1]), Math.abs(cell.dSea[1][0]), Math.abs(cell.dSea[1][2]), Math.abs(cell.dSea[2][1]));
    seaCirculatory = offMax / (seaMiddleDiag + 1e-9);
  }
  // The ESCAPE residual: the DC deficit that leaves neither via the transport
  // gate nor (gated behind it) the sea drain. The transport gate is the
  // bottleneck -- nothing reaches the off-equatorial drain if transportDC=0.
  const drainReached = Math.min(railResidual * transportDCFracOfDeficit, seaInnerDrain); // what actually drains
  const escapeResidual = railResidual - drainReached;
  const closes = escapeResidual <= 1e-4 && transportDC > 0;
  return {
    gates: {
      pumpInject: +pumpInject.toFixed(4),
      selfHitBrake: +selfHitBrake.toFixed(4),
      transportOffEquatorDC: +transportDC.toFixed(5),
      seaDrainOffEquatorInner: +seaInnerDrain.toFixed(5),
      escapeResidual: +escapeResidual.toFixed(4),
    },
    railResidual: +railResidual.toFixed(4),
    brokenSymmetry: { u, driftAngle, baseTilt },
    crtNormRel: +pen.crossBlocks.crtNormRel.toFixed(4), ctrNormRel: +pen.crossBlocks.ctrNormRel.toFixed(4),
    transportDCFracOfDeficit: +transportDCFracOfDeficit.toFixed(4),
    transportParam: +Number(transportParam).toFixed(4),
    spinTransportGrt: spinTransportGrt.map((x) => +x.toFixed(3)),
    seaBandOmega, seaMiddleDiag: +seaMiddleDiag.toFixed(4), seaCirculatoryRatio: seaCirculatory ? +seaCirculatory.toFixed(2) : null,
    // the decisive readout
    globalDrainCloses: closes,
    escapeFractionOfPump: +(escapeResidual / pump).toFixed(4),
    bottleneck: transportDC <= 1e-4 ? "transport_off_equator_axisymmetry_forbidden"
      : (seaInnerDrain < railResidual ? "sea_drain_inner_starved" : "closes"),
    ...FAIL_CLOSED,
  };
}

// Deliverable 2 -- the reduced complex-escapement integrator (REFERENCE/REDUCED,
// explicitly NOT native; sibling of breathingEscapementReduced and the §12 pin
// integrator). Extends breathingEscapementReduced with an OFF-EQUATORIAL angular-
// momentum reservoir Joff: the size mode is driven by the pump through the rail
// pin; the deformation transport moves pump excess into Joff (DC via transportDC,
// parametric via |sd|*|transportParam|); the sea DRAINS Joff at drainRate (the
// §67 inner authority) -- NOT a local rail brake. Reads whether routing through
// the off-equatorial reservoir bounds the size mode (global closure) or the size
// still runs away (escape). drainRate and transportDC default to MEASURED values.
export function complexEscapementReduced({
  pump = 0.2274, brakeFracMax = 0.667, gamma0 = 0.18277, dGammaDs = -0.4769,
  kSize = 0.25, mRad = 2, gPin = 1.0, dt = 0.005, T = 80,
  transportDC = 0.0, transportParam = 0.4769, drainRate = 0.014,
  s0 = 0, sd0 = 0, delta0 = 0.001, aFlut0 = 0, Joff0 = 0, dispersalS = 3,
} = {}) {
  const deriv = (y) => {
    const [s, sd, delta, aFlut, Joff] = y;
    // rail residual after the local self-hit brake, minus what transport removes
    const brakeFrac = delta > 0 ? brakeFracMax : 0;
    const railInjection = pump * (1 - brakeFrac); // rate beta_M climbs (residual after the local self-hit)
    // transport OUT of the rail sector: DC = coupling fraction of the injection
    // moved off-equator (dimensionless transportDC), plus a parametric piece
    // active only while breathing (~|sd|). The deformation coupling operates
    // regardless of the rail sign, so it can keep beta_M from ever climbing.
    const transportOut = transportDC * railInjection + transportParam * Math.abs(sd) * railInjection;
    const ddelta = railInjection - transportOut; // net tangential drive on beta_M
    const dJoff = transportOut - drainRate * Joff; // reservoir fills from transport, drains to sea
    const Fs = delta > 0 ? (kSize * s + gPin * delta) : (-kSize * s);
    const sdd = (Fs) / mRad;
    const daFlut = gamma0 + dGammaDs * s;
    return [sd, sdd, ddelta, daFlut, dJoff];
  };
  let y = [s0, sd0, delta0, aFlut0, Joff0];
  const n = Math.round(T / dt);
  let sMax = -Infinity, sMin = Infinity, dispersalTime = null, JoffMax = 0;
  for (let k = 0; k < n; k++) {
    const k1 = deriv(y);
    const k2 = deriv(y.map((v, i) => v + 0.5 * dt * k1[i]));
    const k3 = deriv(y.map((v, i) => v + 0.5 * dt * k2[i]));
    const k4 = deriv(y.map((v, i) => v + dt * k3[i]));
    y = y.map((v, i) => v + (dt / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
    const [s, , , , Joff] = y;
    sMax = Math.max(sMax, s); sMin = Math.min(sMin, s); JoffMax = Math.max(JoffMax, Math.abs(Joff));
    if (dispersalTime == null && Math.abs(s) > dispersalS) dispersalTime = (k + 1) * dt;
    if (!isFinite(s) || Math.abs(s) > 1e6) { dispersalTime = dispersalTime ?? (k + 1) * dt; break; }
  }
  const bounded = dispersalTime == null && isFinite(sMax) && Math.abs(sMax) < dispersalS && Math.abs(sMin) < dispersalS;
  return {
    pump, brakeFracMax, transportDC, transportParam, drainRate,
    bounded, dispersalTime, sMax: +sMax.toFixed(4), sMin: +sMin.toFixed(4),
    JoffMax: +JoffMax.toFixed(4), finalDelta: +y[2].toFixed(4), finalS: +y[0].toFixed(4),
    // the deficit the drain must exceed to bound the size mode (1/3 pump)
    drainNeededToBound: +((1 - brakeFracMax) * pump).toFixed(4),
    globalCloses: bounded, ...FAIL_CLOSED,
  };
}

// The orchestrator: composes the joint radial/axis fixed point (§68 driftFixedPoint,
// reused) + the four-gate ledger + the reduced complex escapement, and emits the
// Deliverable-1 global-drain verdict. driftU selects the moving fixed point (§68
// found a genuine one at u=0.2). Central solver untouched; all sub-evaluators reused.
// §72 probe: the drift / broken-symmetry cross-block scan. Measures C_rt, C_tr at
// (u, driftAngle, baseTilt) -- oblique drift + the axis anchored off the geometric
// axis -- to decide whether breaking axisymmetry OPENS the transport-off-equator
// gate that is exactly zero at the axisymmetric rest fixed point (§71). Reports
// crtNormRel/ctrNormRel per config and whether the opened transport reaches the
// 1/3-pump deficit fraction (0.333). parametric:false (only the cross-blocks are
// needed, and the diagonal blocks are not re-measured at the tilted base, so the
// SPECTRUM is not claimed here -- only the cross-block gate). Fail-closed.
export function brokenSymmetryTransportGate({
  configs = [
    { u: 0, driftAngle: 0, baseTilt: 0 },        // regression: axisymmetric rest
    { u: 0.2, driftAngle: 90, baseTilt: 0 },      // oblique drift only
    { u: 0.2, driftAngle: 0, baseTilt: 20 },      // anchored off-axis only
    { u: 0.2, driftAngle: 90, baseTilt: 20 },     // both
    { u: 0.35, driftAngle: 90, baseTilt: 30 },    // stronger
    { u: 0.5, driftAngle: 90, baseTilt: 30 },
  ], geo = SELF_EQUILIBRATED_V5.geo, Nt = 8, soft = 0.02, deficitFrac = 0.333,
} = {}) {
  const d = Math.PI / 180;
  const rows = configs.map((c) => {
    const p = internalDeformationPencil({ geo, coupling: "all", parametric: false, Nt, soft, u: c.u, driftAngle: c.driftAngle * d, baseTilt: c.baseTilt * d });
    const crtRel = p.crossBlocks.crtNormRel, ctrRel = p.crossBlocks.ctrNormRel;
    const transportFrac = Math.max(crtRel, ctrRel);
    return { ...c, crtNorm: +p.crossBlocks.crtNorm.toFixed(4), ctrNorm: +p.crossBlocks.ctrNorm.toFixed(4),
      crtNormRel: +crtRel.toFixed(4), ctrNormRel: +ctrRel.toFixed(4),
      transportFrac: +transportFrac.toFixed(4), reachesDeficit: transportFrac >= deficitFrac };
  });
  const rest = rows[0];
  const gateOpens = rows.some((r) => (r.u > 0 || r.baseTilt > 0) && r.transportFrac > 1e-3);
  const reachesDeficit = rows.some((r) => r.reachesDeficit);
  return {
    rows, deficitFrac,
    restGateClosed: rest.transportFrac < 1e-4,           // §71 regression: rest is null
    gateOpensUnderBrokenSymmetry: gateOpens,             // the decisive answer
    transportReachesDeficitFraction: reachesDeficit,     // does it clear the 1/3 deficit
    verdict: gateOpens
      ? (reachesDeficit ? "broken_symmetry_opens_transport_gate_past_deficit_bottleneck_moves_to_sea_drain"
                        : "broken_symmetry_opens_transport_gate_but_below_deficit")
      : "transport_gate_stays_closed_reframe_falsified",
    ...FAIL_CLOSED,
  };
}

// §73: the global drain-shortfall probe (the last gate). At each anchored-oblique
// config it composes the OPENED transport (§72, C_tr) with the sea's off-equatorial
// DISSIPATIVE drain measured at the TILTED braid (seaTiltDampingEstimate baseTilt --
// the sea sees a tilted braid, unlike §67's axisymmetric measurement, so the inner-
// starvation could lift). Reports whether the drain reaches the transported deficit,
// and whether the §68 anchoring stiffness makes the anchored angle self-consistent.
// Fail-closed; seed grade.
export function globalDrainShortfall({
  configs = [
    { u: 0.2, driftAngle: 90, baseTilt: 15 },
    { u: 0.2, driftAngle: 90, baseTilt: 20 },
    { u: 0.35, driftAngle: 90, baseTilt: 30 },
    { u: 0.5, driftAngle: 90, baseTilt: 45 },
  ], geo = SELF_EQUILIBRATED_V5.geo, pump = 0.2274, brakeFracMax = 0.667,
  Nt = 8, soft = 0.02, Rsea = 3.4, gamma = 1.0,
} = {}) {
  const d = Math.PI / 180;
  const railResidual = pump * (1 - brakeFracMax);
  const rows = configs.map((c) => {
    // OPENED transport (§72): the breathing->tilt coupling fraction C_tr
    const pen = internalDeformationPencil({ geo, coupling: "all", parametric: false, Nt, soft, u: c.u, driftAngle: c.driftAngle * d, baseTilt: c.baseTilt * d });
    const transportFrac = Math.max(pen.crossBlocks.crtNormRel, pen.crossBlocks.ctrNormRel);
    const transported = railResidual * transportFrac;
    // DISSIPATIVE drain at the TILTED braid: best damping-band inner diagonal
    const est = seaTiltDampingEstimate({ geo, Rsea, gamma, Nt, soft, baseTilt: c.baseTilt * d });
    const band = est.results.filter((r) => r.dampingDiagonal);
    const cells = band.length ? band : est.results;
    const cell = cells.reduce((a, b) => (Math.abs(b.diag[0]) > Math.abs(a.diag[0]) ? b : a));
    const drain = Math.abs(cell.diag[0]);            // off-equatorial (inner) dissipative rate
    const midDrain = Math.abs(cell.diag[1]);         // equatorial (barred for the rail) drain
    const drained = Math.min(transported, drain);
    const escape = railResidual - drained;
    // §68 anchoring stiffness for the self-consistent-angle context (Piece 2)
    const kAnchor = driftAxisPencil({ geo, u: c.u, Nt, soft }).orientationTorque.kGlobalX;
    return { ...c, transportFrac: +transportFrac.toFixed(3), transported: +transported.toFixed(4),
      drain: +drain.toFixed(4), midDrain: +midDrain.toFixed(3), drainOmega: cell.omega,
      escape: +escape.toFixed(4), escapeFracOfPump: +(escape / pump).toFixed(3),
      kAnchor: +kAnchor.toFixed(3), closes: escape <= 1e-3 };
  });
  const anyCloses = rows.some((r) => r.closes);
  const drainRange = [Math.min(...rows.map((r) => r.drain)), Math.max(...rows.map((r) => r.drain))];
  return {
    railResidual: +railResidual.toFixed(4), rows,
    drainStarvedRobustly: drainRange[1] <= 0.02,    // <= §67 inner-starvation across ALL anchored angles
    drainRangeInner: drainRange.map((x) => +x.toFixed(4)),
    globalDrainCloses: anyCloses,
    verdict: anyCloses
      ? "global_drain_closes_complex_self_consistent"
      : "drain_starved_at_anchored_complex_transport_opens_but_dissipative_drain_short_reframe_blocked_on_the_drain",
    // Piece 2: the anchoring is restoring (k>0) so an anchored angle EXISTS, but the
    // drain is starved across the whole anchored-angle range, so the exact self-
    // consistent angle does not rescue it -- the shortfall is angle-robust.
    anchoringRestoringAllConfigs: rows.every((r) => r.kAnchor > 0),
    ...FAIL_CLOSED,
  };
}

// §74: the co-orbital-cage angular-momentum-sink probe (the one surviving route).
// The §55 octahedral cage is made to CO-ORBIT about the braid axis at rate
// omegaOrbit (members MOVING, not the static §55/§73 declaration). The question:
// does co-orbital motion open a SECULAR (cycle-averaged) tangential force on the
// middle equatorial rail -- the angular-momentum-transfer channel that could
// absorb the ~0.044 residual into the cage's orbit CONSERVATIVELY -- beyond the
// static Corollary-S bound (<=10% of the pump)? Decisive test of whether a
// conservative co-orbital sink sidesteps the dissipative chi'' the No-Go bounds.
// Also reads the self-consistent "molecule rotates" orbit (§55: the -0.641 polar
// pull as centripetal support). Central solver untouched; seed grade; fail-closed.
export function coOrbitalCageSink({
  geo = OCTAHEDRAL_CAGE_V4.geo, aLattice = OCTAHEDRAL_CAGE_V4.aLattice,
  omegaOrbitFracs = [0, 0.25, 0.5, 1.0, 1.5], cTrans = 1.0, Nper = 6, Nt = 12, soft = 0.02,
  pump = 0.2274, brakeFracMax = 0.667,
} = {}) {
  const braid = buildBraid({ u: 0, cTrans, geo });
  const w = braid.omega, period = 2 * Math.PI / w;
  const kap = residuals({ u: 0, cTrans, geo }, { soft }).kappaStar;
  const p0 = braidDipole(geo);
  const cf = 1;
  const residual = pump * (1 - brakeFracMax); // ~0.076 (1/3 pump); transported ~0.58x = ~0.044
  const pos = (s, t) => { const ang = w * t + s.th, ca = Math.cos(s.alpha); return [s.sgn*s.R*ca*Math.cos(ang), s.sgn*s.R*ca*Math.sin(ang), s.sgn*s.R*Math.sin(s.alpha)]; };
  const vel = (s, t) => { const ang = w * t + s.th, v = s.sgn*s.R*Math.cos(s.alpha)*w; return [-v*Math.sin(ang), v*Math.cos(ang), 0]; };
  const rotZ = (v, th) => { const c = Math.cos(th), s = Math.sin(th); return [c*v[0]-s*v[1], s*v[0]+c*v[1], v[2]]; };
  // cage: six octahedral sites at siteRadius, slow-limit orientations along the
  // braid's cycle-mean field direction (reuse the §55 declaration, static ph).
  const R = aLattice * Math.SQRT2;
  const dirs = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
  const cage = dirs.map((dv) => ({ dir: dv, X0: [dv[0]*R, dv[1]*R, dv[2]*R], ph: [dv[0], dv[1], dv[2]] }));
  // middle-rail representative receivers (the two middle sites)
  const railSites = braid.sites.filter((s) => s.name === "M");
  const rows = omegaOrbitFracs.map((frac) => {
    const Om = frac * w;
    // time-average the TANGENTIAL force on the middle rail from the ORBITING cage
    let tanForce = 0, radForce = 0, nSamp = 0;
    // self-consistent orbit witness: cycle-mean inward radial pull on a polar member
    let polarPull = 0, polarN = 0;
    for (let k = 0; k < Nper * Nt; k++) {
      const t = (k / Nt) * period;
      // cage endpoint positions/velocities at time t (orbiting about z)
      const cageEnds = [];
      for (const cg of cage) {
        const Xc = rotZ(cg.X0, Om * t);
        const phc = rotZ(cg.ph, Om * t);
        const vOrb = [-Om * Xc[1], Om * Xc[0], 0]; // Omega z-hat x X
        for (const pm of [+1, -1]) {
          const Xe = [Xc[0]+pm*(p0/2)*phc[0], Xc[1]+pm*(p0/2)*phc[1], Xc[2]+pm*(p0/2)*phc[2]];
          cageEnds.push({ Xe, v: vOrb, pol: pm, dir: cg.dir, Xc });
        }
      }
      // tangential/radial force on each rail site from the cage endpoints (delayed)
      for (const rs of railSites) {
        const Xi = pos(rs, t);
        const th = w * t + rs.th;
        const tHat = [-Math.sin(th), Math.cos(th), 0];
        const rHat = [Math.cos(th), Math.sin(th), 0];
        for (const ce of cageEnds) {
          // causal root: cage endpoint moving at constant vOrb (linear over the short delay)
          let te = t - Math.hypot(Xi[0]-ce.Xe[0], Xi[1]-ce.Xe[1], Xi[2]-ce.Xe[2]);
          for (let it = 0; it < 20; it++) {
            const Xsrc = [ce.Xe[0]+ce.v[0]*(te-t), ce.Xe[1]+ce.v[1]*(te-t), ce.Xe[2]+ce.v[2]*(te-t)];
            te = t - Math.hypot(Xi[0]-Xsrc[0], Xi[1]-Xsrc[1], Xi[2]-Xsrc[2]);
          }
          const Xsrc = [ce.Xe[0]+ce.v[0]*(te-t), ce.Xe[1]+ce.v[1]*(te-t), ce.Xe[2]+ce.v[2]*(te-t)];
          const dx = [Xi[0]-Xsrc[0], Xi[1]-Xsrc[1], Xi[2]-Xsrc[2]];
          const r = Math.hypot(dx[0], dx[1], dx[2]); if (r < 1e-6) continue;
          const rh = [dx[0]/r, dx[1]/r, dx[2]/r];
          const Ds = cf - (ce.v[0]*rh[0] + ce.v[1]*rh[1] + ce.v[2]*rh[2]); // source-normal (moving cage)
          const m = Ds / (Ds * Ds + soft * soft);
          const f = kap * (rs.pol * ce.pol) * m / (r * r);
          tanForce += f * (rh[0]*tHat[0] + rh[1]*tHat[1] + rh[2]*tHat[2]);
          radForce += f * (rh[0]*rHat[0] + rh[1]*rHat[1] + rh[2]*rHat[2]);
        }
      }
      nSamp++;
    }
    const tanAvg = tanForce / nSamp / railSites.length; // per rail site, secular tangential force
    const radAvg = radForce / nSamp / railSites.length;
    return { omegaOrbitFrac: frac, secularTangential: +tanAvg.toFixed(5),
      secularRadial: +radAvg.toFixed(5),
      tanFracOfResidual: +(Math.abs(tanAvg) / residual).toFixed(4),
      tanFracOfPump: +(Math.abs(tanAvg) / pump).toFixed(4) };
  });
  const maxTanFrac = Math.max(...rows.map((r) => r.tanFracOfPump));
  const beatsStaticBound = maxTanFrac > 0.10; // does co-orbital motion beat the static Corollary-S <=10%?
  const reachesResidual = Math.max(...rows.map((r) => r.tanFracOfResidual)) >= 0.58; // 0.044/0.076
  return {
    kappaStar: kap, p0, residual: +residual.toFixed(4), rows,
    maxSecularTangentialFracOfPump: +maxTanFrac.toFixed(4),
    beatsStaticCorollaryS_10pct: beatsStaticBound,
    reachesTransportedResidual: reachesResidual,
    verdict: reachesResidual
      ? "co_orbital_cage_opens_conservative_sink_reaches_residual"
      : (beatsStaticBound
        ? "co_orbital_motion_opens_tangential_channel_but_below_residual"
        : "co_orbital_cage_secular_tangential_stays_within_static_corollary_s_bound_no_conservative_sink"),
    ...FAIL_CLOSED,
  };
}

// §75: door (a) — the NATIVE fail-closed gate. Lifts the §73 drain estimate off
// its LINEAR, prescribed-worldline χ'' basis: the cage member's orientational
// response is integrated as a SATURABLE nonlinear unit-dipole ROTATOR tracking
// the FULL delayed braid field (causal roots, full branch weight) at the anchored-
// oblique complex (§72 baseTilt, where the transport gate is open), rather than a
// prescribed γ/(γ+iω) susceptibility. Measures whether saturation/nonlinearity
// enhances the secular DISSIPATIVE drain by the ~10x the §73/§74 shortfall needs.
// The dipole is a bounded unit vector (|p̂|=1 IS the saturation): dp̂/dt =
// γ_eff [f̂ − (f̂·p̂)p̂], γ_eff = γ·ω·|field|·driveScale. Drain ∝ ⟨γ_eff sin²δ⟩
// (lag δ). Guards: γ→∞ (instantaneous, no lag) must give drain→0 (secular transfer
// is dissipative, not conservative — the §74 lesson). Central solver untouched;
// this is the seed→native grade lift the arc named; the braid worldline is still
// prescribed, so this is native-grade nonlinear DISSIPATIVE response, below a full
// retained-history release. Fail-closed.
export function nativeSaturatedCageDrain({
  geo = SELF_EQUILIBRATED_V5.geo, aLattice = OCTAHEDRAL_CAGE_V4.aLattice,
  baseTilt = 30 * d, cTrans = 1.0, Nt = 24, soft = 0.02,
  gammaFracs = [0.25, 0.5, 1.0, 2.0, 4.0], driveScales = [1, 3, 10],
  linearDrain73 = null, Rsea = 3.4, pump = 0.2274, brakeFracMax = 0.667,
} = {}) {
  const braid = buildBraid({ u: 0, cTrans, geo });
  const w = braid.omega, period = 2 * Math.PI / w;
  const kap = residuals({ u: 0, cTrans, geo }, { soft }).kappaStar;
  const cf = 1;
  const residual = pump * (1 - brakeFracMax);
  const transported = 0.587 * residual; // §72 anchored-oblique transport fraction
  const rotXv = (v, c, s) => [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2]];
  const gbc = Math.cos(baseTilt), gbs = Math.sin(baseTilt);
  const pos = (s, t) => { const a = w * t + s.th, ca = Math.cos(s.alpha); let p = [s.sgn*s.R*ca*Math.cos(a), s.sgn*s.R*ca*Math.sin(a), s.sgn*s.R*Math.sin(s.alpha)]; return baseTilt !== 0 ? rotXv(p, gbc, gbs) : p; };
  const vel = (s, t) => { const a = w * t + s.th, v = s.sgn*s.R*Math.cos(s.alpha)*w; let p = [-v*Math.sin(a), v*Math.cos(a), 0]; return baseTilt !== 0 ? rotXv(p, gbc, gbs) : p; };
  const R = aLattice * Math.SQRT2;
  // one representative INNER-latitude member (the §67/§73 starved channel): an
  // equatorial cage site, which at the tilted braid sees the deepest field.
  const memberX = [R, 0, 0];
  // precompute the delayed field direction f̂(t) and magnitude |field|(t) at the member
  const fHat = [], fMag = [];
  for (let k = 0; k < Nt; k++) {
    const t = (k / Nt) * period;
    const F = [0, 0, 0];
    for (const s of braid.sites) {
      let te = t - Math.hypot(...memberX) - 1;
      for (let it = 0; it < 40; it++) { const p = pos(s, te); te = t - Math.hypot(memberX[0]-p[0], memberX[1]-p[1], memberX[2]-p[2]); }
      const p = pos(s, te), dx = [memberX[0]-p[0], memberX[1]-p[1], memberX[2]-p[2]], r = Math.hypot(dx[0], dx[1], dx[2]);
      const rh = [dx[0]/r, dx[1]/r, dx[2]/r], v = vel(s, te);
      const Ds = cf - (v[0]*rh[0] + v[1]*rh[1] + v[2]*rh[2]);
      const c = s.pol / (Ds * r * r);
      F[0] += c*rh[0]; F[1] += c*rh[1]; F[2] += c*rh[2];
    }
    const n = Math.hypot(F[0], F[1], F[2]) || 1e-300;
    fHat.push([F[0]/n, F[1]/n, F[2]/n]); fMag.push(n);
  }
  // linear-interpolate the field direction between samples (for substepping)
  const fAt = (tt) => { const x = (tt / period) * Nt; const k0 = ((Math.floor(x) % Nt) + Nt) % Nt, k1 = (k0 + 1) % Nt, fr = x - Math.floor(x);
    const a = fHat[k0], b = fHat[k1]; const v = [a[0]+(b[0]-a[0])*fr, a[1]+(b[1]-a[1])*fr, a[2]+(b[2]-a[2])*fr]; const n = Math.hypot(...v) || 1; return [v[0]/n, v[1]/n, v[2]/n]; };
  // Integrate BOTH responses to the SAME delayed field, substepped for stability:
  //  - NONLINEAR: a saturable UNIT dipole (|p̂|=1 is the saturation), dp̂/dt =
  //    γ[f̂−(f̂·p̂)p̂]; drain ∝ γ⟨sin²δ⟩, sinδ=|perp|, bounded ≤1.
  //  - LINEAR (Debye): an UN-normalized tracker dq/dt=γ(f̂−q); drain ∝ γ⟨|f̂−q|²⟩
  //    = the χ″ single-pole γω²/(γ²+ω²), the §67 linear-response basis.
  // multiple = D_nl/D_lin isolates whether saturation/nonlinearity ENHANCES the
  // drain (>1) or caps it (≤1). Both use the identical coupling, so it cancels.
  const runBoth = (gamma) => {
    const Nsub = Math.max(12, Math.ceil(gamma * period / Nt / 0.1)); // adaptive: keep γ·dts < 0.1 (Euler-stable)
    const dts = period / (Nt * Nsub);
    let p = [...fHat[0]], q = [...fHat[0]];
    let sn = 0, sl = 0, cnt = 0;
    for (let cyc = 0; cyc < 8; cyc++) {
      for (let k = 0; k < Nt * Nsub; k++) {
        const tt = (k / (Nt * Nsub)) * period, f = fAt(tt);
        const dfp = f[0]*p[0] + f[1]*p[1] + f[2]*p[2];
        const perp = [f[0]-dfp*p[0], f[1]-dfp*p[1], f[2]-dfp*p[2]];
        p = [p[0]+gamma*perp[0]*dts, p[1]+gamma*perp[1]*dts, p[2]+gamma*perp[2]*dts];
        const pn = Math.hypot(...p); p = [p[0]/pn, p[1]/pn, p[2]/pn];
        const el = [f[0]-q[0], f[1]-q[1], f[2]-q[2]];
        q = [q[0]+gamma*el[0]*dts, q[1]+gamma*el[1]*dts, q[2]+gamma*el[2]*dts];
        if (cyc >= 4) { sn += perp[0]*perp[0]+perp[1]*perp[1]+perp[2]*perp[2]; sl += el[0]*el[0]+el[1]*el[1]+el[2]*el[2]; cnt++; }
      }
    }
    const dNl = gamma * (sn / cnt), dLin = gamma * (sl / cnt);
    return { dNl, dLin, multiple: dLin > 1e-12 ? dNl / dLin : 0 };
  };
  const cells = [];
  for (const gf of gammaFracs) { const r = runBoth(gf * w); cells.push({ gammaFrac: gf, dNl: +r.dNl.toFixed(4), dLin: +r.dLin.toFixed(4), multiple: +r.multiple.toFixed(3) }); }
  const maxMultiple = Math.max(...cells.map((c) => c.multiple));
  // conservative guard: γ→∞ (instantaneous tracking) → no lag → drain→0 (dissipative, not conservative)
  const guard = runBoth(200 * w);
  // anchor to §73's BEST-CASE linear inner drain (untilted §67, the strongest the
  // sea offers anywhere) so the pass/fail is maximally FAIR to the sea: even the
  // best linear drain x the nonlinear multiple must clear the target. (At the
  // anchored complex the tilted drain is smaller, §73 — so this over-credits the sea.)
  const dLin73 = linearDrain73 ?? (() => {
    const est = seaTiltDampingEstimate({ geo, Rsea, Nt: 8, soft, baseTilt: 0 });
    const band = est.results.filter((r) => r.dampingDiagonal);
    const cell = (band.length ? band : est.results).reduce((a, b) => (Math.abs(b.diag[0]) > Math.abs(a.diag[0]) ? b : a));
    return Math.abs(cell.diag[0]);
  })();
  const nativeDrain = dLin73 * maxMultiple;
  const clearsShortfall = nativeDrain >= transported;
  // R_perp track via the reduced complex escapement, wired with the NATIVE drain
  const esc = complexEscapementReduced({ transportDC: 0.587, drainRate: nativeDrain, pump, brakeFracMax });
  return {
    baseTilt: +(baseTilt / d).toFixed(1), kappaStar: kap, residual: +residual.toFixed(4), transportedTarget: +transported.toFixed(4),
    linearDrain73: +dLin73.toFixed(4), maxNonlinearMultiple: +maxMultiple.toFixed(3),
    nativeDrain: +nativeDrain.toFixed(4), nativeOverLinear: +maxMultiple.toFixed(3),
    conservativeGuardDrain: +guard.dNl.toFixed(5), // γ→∞: drain→0 (secular transfer IS dissipative, §74 lesson)
    cells,
    clearsShortfall,
    RperpFlattens: esc.bounded,       // S1/S2 witness: does the size mode bound with the native drain
    RperpTrack: esc.bounded ? "bounded" : `runaway_disperse_t${esc.dispersalTime}`,
    verdict: (clearsShortfall && esc.bounded)
      ? "native_saturated_chi_clears_shortfall_S1S2_closes_in_existing_ontology"
      : "native_saturated_chi_below_shortfall_local_sink_nogo_sealed_at_native_grade",
    ...FAIL_CLOSED,
  };
}

// §77: the (b) feasibility proxy — net self-torque vs MEMORY DEPTH. The braid's
// self-interaction (all pairwise delayed roots) is range-limited to delay
// Δ ≲ 2R/c_f (a bounded source's light cone outruns it), so this sweeps Δ_max
// over that window and reads whether the net cycle-averaged TANGENTIAL self-torque
// on the middle rail turns from the +0.076 near-field anti-damping toward a far-
// emission BRAKE as the deepest (farthest-emission) roots — the outgoing-wave-
// launching part — are added. A sign turn re-opens S1/S2 closure via radiation
// within the existing ontology; persistence hands to the field-momentum-flux build
// (radiation-reaction-outgoing-wake-ledger-spec.md). Uses the same softened causal-
// root branch weight as internalDeformationPencil. Central solver untouched; runner
// only; §66 near-field regression. Fail-closed; seed grade.
export function selfTorqueMemoryDepth({
  geo = SELF_EQUILIBRATED_V5.geo, cTrans = 1.0, Nt = 16, soft = 0.02,
  depthList = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0], pump = 0.2274,
} = {}) {
  const seed = buildBraid({ u: 0, cTrans, geo });
  const w = seed.omega, cf = 1, period = 2 * Math.PI / w;
  const kap = residuals({ u: 0, cTrans, geo }, { soft }).kappaStar;
  const sites = seed.sites.map((s) => ({
    pol: s.pol, name: s.name, R: s.R, alpha: s.alpha, sgn: s.sgn, th: s.th,
    pos: (t) => { const a = w*t + s.th, ca = Math.cos(s.alpha); return [s.sgn*s.R*ca*Math.cos(a), s.sgn*s.R*ca*Math.sin(a), s.sgn*s.R*Math.sin(s.alpha)]; },
    vel: (t) => { const a = w*t + s.th, v = s.sgn*s.R*Math.cos(s.alpha)*w; return [-v*Math.sin(a), v*Math.cos(a), 0]; },
  }));
  const Rmax = Math.max(...sites.map((s) => s.R));
  const midIdx = sites.map((s, i) => (s.name === "M" ? i : -1)).filter((i) => i >= 0);
  // net cycle-averaged tangential force on the middle rail from roots with delay < dmax,
  // split into partner (cross-source) and self (same-source) contributions.
  const measure = (dmax) => {
    let tanP = 0, tanS = 0, n = 0;
    for (let k = 0; k < Nt; k++) {
      const t = (k / Nt) * period;
      for (const i of midIdx) {
        const rec = sites[i], Xi = rec.pos(t), vi = rec.vel(t);
        const vn = Math.hypot(vi[0], vi[1], vi[2]) || 1; // along-velocity (true tangential) direction, sign-correct per site
        const tHat = [vi[0] / vn, vi[1] / vn, vi[2] / vn];
        for (let j = 0; j < sites.length; j++) {
          const src = sites[j], same = (j === i);
          const g = (te) => { const p = src.pos(te); return Math.hypot(Xi[0]-p[0], Xi[1]-p[1], Xi[2]-p[2]) - cf * (t - te); };
          const N = Math.max(400, Math.round(600 * dmax));
          let g0 = g(t - dmax);
          for (let kk = 1; kk <= N; kk++) {
            const te = t - dmax + dmax * (kk / N); if (te >= t - 1e-9) break;
            const g1 = g(te);
            if ((g0 < 0) !== (g1 < 0)) {
              let lo = t - dmax + dmax * ((kk - 1) / N), hi = te; const gl = g(lo);
              for (let b = 0; b < 50; b++) { const mid = (lo + hi) / 2; if ((gl < 0) === (g(mid) < 0)) lo = mid; else hi = mid; }
              const te0 = (lo + hi) / 2, p = src.pos(te0), dx = [Xi[0]-p[0], Xi[1]-p[1], Xi[2]-p[2]], r = Math.hypot(dx[0], dx[1], dx[2]);
              if (r > 1e-6 && (!same || (t - te0) > 1e-6)) {
                const rh = [dx[0]/r, dx[1]/r, dx[2]/r], vs = src.vel(te0);
                const Ds = cf - (vs[0]*rh[0] + vs[1]*rh[1] + vs[2]*rh[2]);
                const Dt = cf - (vi[0]*rh[0] + vi[1]*rh[1] + vi[2]*rh[2]);
                const m = (Dt * Ds) / (Ds * Ds + soft * soft), wgt = (rec.pol * src.pol) * m / (r * r);
                const ftan = kap * wgt * (rh[0]*tHat[0] + rh[1]*tHat[1] + rh[2]*tHat[2]);
                if (same) tanS += ftan; else tanP += ftan;
              }
            }
            g0 = g1;
          }
        }
      }
      n++;
    }
    return { partner: tanP / n / midIdx.length, self: tanS / n / midIdx.length };
  };
  const rows = depthList.map((dmax) => { const r = measure(dmax); const net = r.partner + r.self; return { dmax, partner: +r.partner.toFixed(4), self: +r.self.toFixed(4), net: +net.toFixed(4) }; });
  const deepest = rows[rows.length - 1], shallowest = rows[0];
  const deepIncrement = deepest.net - shallowest.net; // far-emission contribution
  // convergence: does net settle (persistence) or keep turning?
  const converged = rows.length >= 3 && Math.abs(rows[rows.length - 1].net - rows[rows.length - 2].net) < 0.01;
  const turnsToBrake = deepest.net < shallowest.net - 0.02; // net moved toward a brake with depth
  const signChange = deepest.net < 0 && shallowest.net > 0;
  return {
    omega: w, kappaStar: kap, RmaxOverCf: +(Rmax / cf).toFixed(3), maxCausalDelayApprox: +(2 * Rmax / cf).toFixed(3),
    rows, deepIncrement: +deepIncrement.toFixed(4), converged, turnsToBrake, signChange,
    verdict: signChange
      ? "self_torque_turns_to_brake_with_depth_radiation_reopens_S1S2_within_ontology"
      : (turnsToBrake
        ? "self_torque_moves_toward_brake_with_depth_but_no_sign_change"
        : "self_torque_persists_anti_damping_bounded_self_interaction_no_far_field_brake_hands_to_field_flux_build"),
    ...FAIL_CLOSED,
  };
}

// §78: the field-momentum-flux build (radiation-reaction packet measurable 1) —
// the DECISIVE far-field test. Computes the braid's retarded field E(X,t) (the
// master-equation VELOCITY field: acceleration a static test charge feels,
// Σ_s κ q_s (1/D_s) r̂/r²; D_s=c_f−v_s·r̂, source-normal; NO acceleration/1/r
// radiation term exists in the force law) on spheres of increasing radius, and
// integrates the Maxwell-stress angular-momentum flux Φ_∞(r)=⟨∮ r E_φ E_r dA⟩
// cycle-averaged. The r-SCALING is the light-cylinder test: →0 (bound field, the
// field-speed pin is the no-spin-down condition, +0.076 is reactive bookkeeping,
// S1/S2 closes as a self-consistent NON-radiating structure) vs r-independent
// (genuine radiation, spin-down). Secular guard = the cycle-average (DC) is the
// secular flux. Central solver untouched; a far-field post-processor on the
// emitted field; runner only. Declared choice: electric-type (scalar-potential-
// gradient) field stress tensor T_ij=E_iE_j−½δ_ij E². Fail-closed; seed grade.
export function farFieldAngularMomentumFlux({
  geo = SELF_EQUILIBRATED_V5.geo, cTrans = 1.0, radii = [16, 32, 64, 128, 256],
  Nt = 12, Ntheta = 12, Nphi = 24, residual = 0.0758,
} = {}) {
  const seed = buildBraid({ u: 0, cTrans, geo });
  const w = seed.omega, cf = 1, period = 2 * Math.PI / w;
  const kap = residuals({ u: 0, cTrans, geo }, { soft: 0.02 }).kappaStar;
  const pos = (s, t) => { const a = w*t + s.th, ca = Math.cos(s.alpha); return [s.sgn*s.R*ca*Math.cos(a), s.sgn*s.R*ca*Math.sin(a), s.sgn*s.R*Math.sin(s.alpha)]; };
  const vel = (s, t) => { const a = w*t + s.th, v = s.sgn*s.R*Math.cos(s.alpha)*w; return [-v*Math.sin(a), v*Math.cos(a), 0]; };
  // retarded velocity-field E at point X, time t (source-normal branch weight 1/D_s)
  const fieldAt = (X, t) => {
    const E = [0, 0, 0];
    for (const s of seed.sites) {
      let te = t - Math.hypot(X[0], X[1], X[2]) - 1;
      for (let it = 0; it < 60; it++) { const p = pos(s, te); te = t - Math.hypot(X[0]-p[0], X[1]-p[1], X[2]-p[2]); }
      const p = pos(s, te), dx = [X[0]-p[0], X[1]-p[1], X[2]-p[2]], r = Math.hypot(dx[0], dx[1], dx[2]);
      if (r < 1e-9) continue;
      const rh = [dx[0]/r, dx[1]/r, dx[2]/r], v = vel(s, te);
      const Ds = cf - (v[0]*rh[0] + v[1]*rh[1] + v[2]*rh[2]);
      const c = kap * s.pol / (Ds * r * r);
      E[0] += c*rh[0]; E[1] += c*rh[1]; E[2] += c*rh[2];
    }
    return E;
  };
  // sphere quadrature (Gauss-legendre-ish uniform in cosθ, uniform in φ)
  const rows = radii.map((R) => {
    let flux = 0, wsum = 0;
    for (let it = 0; it < Ntheta; it++) {
      const ct = -1 + (2 * (it + 0.5)) / Ntheta, st = Math.sqrt(Math.max(0, 1 - ct*ct));
      const dOmega = (2 / Ntheta) * (2 * Math.PI / Nphi);
      for (let ip = 0; ip < Nphi; ip++) {
        const ph = (2 * Math.PI * (ip + 0.5)) / Nphi;
        const X = [R*st*Math.cos(ph), R*st*Math.sin(ph), R*ct];
        const rHat = [st*Math.cos(ph), st*Math.sin(ph), ct];
        const phiHat = [-Math.sin(ph), Math.cos(ph), 0]; // azimuthal
        // cycle-average E_phi*E_r at this point
        let avg = 0;
        for (let k = 0; k < Nt; k++) {
          const t = (k / Nt) * period, E = fieldAt(X, t);
          const Er = E[0]*rHat[0] + E[1]*rHat[1] + E[2]*rHat[2];
          const Ephi = E[0]*phiHat[0] + E[1]*phiHat[1] + E[2]*phiHat[2];
          avg += Er * Ephi;
        }
        avg /= Nt;
        // z-angular-momentum flux integrand: r * (phi-r stress) * dA, dA=R² dΩ
        flux += R * avg * (R * R * dOmega);
        wsum += R * R * dOmega;
      }
    }
    return { R, flux: +flux.toFixed(6), fluxAbs: Math.abs(flux) };
  });
  // r-scaling: least-squares log-log slope of |flux| vs R over ALL radii
  // (radiation → slope ~0, r-independent flux; bound field → slope ≤ −1, flux→0)
  const far = rows.filter((r) => r.fluxAbs > 1e-16);
  let slope = null;
  if (far.length >= 2) {
    const xs = far.map((r) => Math.log(r.R)), ys = far.map((r) => Math.log(r.fluxAbs));
    const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
    let sxy = 0, sxx = 0; for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; }
    slope = sxy / sxx;
  }
  const outermost = rows[rows.length - 1], innermost = far[0];
  // robust endpoint slope over the far span (avoids the cancellation-prone
  // intermediate-r point noise); radiation → ~0, bound velocity field → ~−2.
  const endpointSlope = far.length >= 2 ? Math.log(outermost.fluxAbs / innermost.fluxAbs) / Math.log(outermost.R / innermost.R) : null;
  const fluxOverResidual = outermost.fluxAbs / residual;
  // BOUND (no radiation) iff BOTH robust signs hold: the magnitude falls steeply
  // (endpoint slope ≤ −1.5) AND the far flux is orders below the residual a
  // radiation sink would carry constantly (≪ 1% of residual).
  const bound = fluxOverResidual < 1e-2 && ((endpointSlope != null && endpointSlope < -1.5) || (slope != null && slope < -1.5));
  return {
    omega: w, kappaStar: kap, residual, rows,
    farScalingSlopeLSQ: slope != null ? +slope.toFixed(2) : null,   // ~0 radiation, ~−2 bound
    endpointSlope: endpointSlope != null ? +endpointSlope.toFixed(2) : null, // robust; ~−2 bound
    outermostFluxAbs: +outermost.fluxAbs.toExponential(2),
    fluxOverResidual: +fluxOverResidual.toExponential(2),          // ≪1: no radiation sink; ~1 would be radiation carrying the residual
    fluxVanishesAtFarField: bound,
    verdict: bound
      ? "far_field_angular_momentum_flux_vanishes_bound_field_light_cylinder_pin_holds_residual_reactive_S1S2_closes"
      : "far_field_flux_persists_genuine_radiation_spin_down_fork",
    ...FAIL_CLOSED,
  };
}

// §79: the bound-field INTERNAL angular-momentum balance (the last step to S1/S2
// closure). §78 dissolved the sink: the +0.076 residual is reactive (a bound field
// has zero net secular self-torque), and §57 shows the linear shape sector is a
// strong basin (eigenvalues −0.25…−3.6, restoring). The ONLY destabilizer is the
// nonlinear rail-pin inversion (§60) when β_M climbs above 1. This integrates the
// size mode in the §57 basin with the reactive residual redistributed via the §72
// transport (ctrRel≈0.59) to a CONSERVATIVE inner/outer reservoir (the §57 basin
// back-pressure), NO SINK — and reads whether the size mode holds bounded (S1/S2
// closes) or the retained residual still drives β_M into the inversion. Reference/
// reduced integrator (sibling of §71/§68a), coefficients from the measured stack;
// central solver untouched. Fail-closed; NOT evidence; authorizes no acceptance.
export function boundInternalBalance({
  kSize = 0.25, kBasin = 1.85, gPin = 1.0, mRad = 2, damp = 0.1,
  residualNearField = 0.0758, dt = 0.005, T = 120, dispersalS = 3,
  s0 = 0.05, sd0 = 0, delta0 = 0.05,
} = {}) {
  // The dichotomy the §78 far-field result decides. Both branches share the §57
  // basin restoring stiffness (kSize>0) and the §60 rail-pin inversion above β_M=1.
  //  - DRIVE branch: the +0.076 is a REAL secular torque on the middle (the §66
  //    NEAR-FIELD reading, the rigid Row-7 truncation). It pushes δ=β_M−1 above 0,
  //    inverts the pin, and the size mode runs away — the Row-7 coherent expansion.
  //  - REACTIVE branch: §78 (bound field, zero NET secular self-torque) — the
  //    residual does no net secular work, so δ relaxes to the rail (δ→0) under the
  //    §57 basin and the size mode holds. This is the branch the MEASURED bound
  //    field (§78) selects.
  const run = (mode) => {
    let y = [s0, sd0, delta0];
    const n = Math.round(T / dt); let sMax = -Infinity, sMin = Infinity, disp = null;
    const deriv = (Y) => {
      const [s, sd, delta] = Y;
      // δ dynamics: DRIVE keeps a secular +residual source; REACTIVE has none (net-zero, §78)
      const ddelta = (mode === "drive" ? residualNearField : 0) - kBasin * delta;
      const Fs = delta > 0 ? (kSize * s + gPin * delta) : (-kSize * s); // §60 inversion above rail / §57 basin below
      return [sd, (Fs - damp * sd) / mRad, ddelta];
    };
    for (let k = 0; k < n; k++) {
      const k1 = deriv(y), k2 = deriv(y.map((v, i) => v + 0.5 * dt * k1[i])), k3 = deriv(y.map((v, i) => v + 0.5 * dt * k2[i])), k4 = deriv(y.map((v, i) => v + dt * k3[i]));
      y = y.map((v, i) => v + (dt / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
      sMax = Math.max(sMax, y[0]); sMin = Math.min(sMin, y[0]);
      if (disp == null && Math.abs(y[0]) > dispersalS) disp = (k + 1) * dt;
      if (!isFinite(y[0]) || Math.abs(y[0]) > 1e6) { disp = disp ?? (k + 1) * dt; break; }
    }
    const bounded = disp == null && Math.abs(sMax) < dispersalS;
    return { bounded, dispersalTime: disp, sMax: +sMax.toFixed(4), finalDelta: +y[2].toFixed(4), finalS: +y[0].toFixed(4) };
  };
  const drive = run("drive"), reactive = run("reactive");
  return {
    kSize, kBasin, residualNearField,
    driveBranch_row7_nearFieldTruncation: drive,   // residual as real secular drive → runaway
    reactiveBranch_s78_boundField: reactive,        // residual reactive (§78) + §57 basin → bounded
    dichotomyDecidedBy: "section_78_far_field_flux_vanishes_selects_reactive_branch",
    s1s2Closes: reactive.bounded && !drive.bounded,
    verdict: (reactive.bounded && !drive.bounded)
      ? "reactive_residual_plus_section57_basin_bounds_the_size_mode_row7_runaway_is_the_nearfield_truncation_artifact_S1S2_closes_as_bound_nonradiating_structure"
      : "dichotomy_not_cleanly_resolved_at_reduced_grade",
    ...FAIL_CLOSED,
  };
}

export function coupledComplexFixedPoint({
  geo = SELF_EQUILIBRATED_V5.geo, driftU = 0.2, Nt = 8, soft = 0.02,
  pump = 0.2274, brakeFracMax = 0.667, Rsea = 3.4, gamma = 1.0, coupling = "all",
  ledgerU = 0, driftAngle = 0, baseTilt = 0,
} = {}) {
  // Leg 1+3 (radial/size + axis): the joint moving fixed point (§68, reused).
  const fp = driftFixedPoint({ u: driftU, geoStart: geo, soft });
  // The four-gate global angular-momentum-flow book. ledgerU/driftAngle/baseTilt
  // select the cross-block configuration: 0 = the axisymmetric rest gate (§71,
  // forbidden); nonzero = the §72 broken-symmetry gate (oblique drift + anchored
  // axis). Default 0 reproduces the §71 verdict exactly.
  const ledger = angularMomentumFlowLedger({ geo, pump, brakeFracMax, Nt, soft, Rsea, gamma, coupling, u: ledgerU, driftAngle, baseTilt });
  // Deliverable 2: the reduced complex escapement, wired with the MEASURED
  // transport (from the ledger) and drain authorities.
  const escapement = complexEscapementReduced({
    pump, brakeFracMax,
    transportDC: ledger.gates.transportOffEquatorDC,
    transportParam: Math.abs(ledger.transportParam) || 0.4769,
    drainRate: ledger.gates.seaDrainOffEquatorInner || 0.014,
  });
  const verdict = ledger.globalDrainCloses && escapement.globalCloses
    ? "global_drain_closes_complex_self_consistent"
    : "global_drain_does_not_close_coherent_expansion_survives";
  return {
    driftU,
    fixedPoint: { radialResidualF: fp.residualF, basin: fp.basin, support: fp.support, closure: fp.closure, ReqOverKappa: fp.ReqOverKappa },
    ledger, escapement,
    verdict,
    bottleneck: ledger.bottleneck,
    escapeFractionOfPump: ledger.escapeFractionOfPump,
    ...FAIL_CLOSED,
  };
}

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
  const argv = process.argv.slice(2);
  const flag = (name) => argv.includes(name);
  const val = (name, dflt) => { const i = argv.indexOf(name); return i >= 0 && i + 1 < argv.length ? argv[i + 1] : dflt; };
  const pretty = flag("--pretty") ? 2 : 0;
  let out;
  if (flag("--broken-symmetry")) {
    out = brokenSymmetryTransportGate({});
  } else if (flag("--drain-shortfall")) {
    out = globalDrainShortfall({});
  } else if (flag("--co-orbital-sink")) {
    out = coOrbitalCageSink({});
  } else if (flag("--native-drain-gate")) {
    out = nativeSaturatedCageDrain({ baseTilt: parseFloat(val("--base-tilt", "30")) * (Math.PI / 180) });
  } else if (flag("--self-torque-memory")) {
    out = selfTorqueMemoryDepth({});
  } else if (flag("--far-field-flux")) {
    out = farFieldAngularMomentumFlux({});
  } else if (flag("--internal-balance")) {
    out = boundInternalBalance({});
  } else if (flag("--coupled-complex")) {
    out = coupledComplexFixedPoint({
      driftU: parseFloat(val("--drift-u", "0.2")),
      ledgerU: parseFloat(val("--ledger-u", "0")),
      driftAngle: parseFloat(val("--drift-angle", "0")) * (Math.PI / 180),
      baseTilt: parseFloat(val("--base-tilt", "0")) * (Math.PI / 180),
      pump: parseFloat(val("--pump", "0.2274")),
      coupling: val("--coupling", "all"),
    });
  } else if (flag("--am-ledger")) {
    out = angularMomentumFlowLedger({
      pump: parseFloat(val("--pump", "0.2274")), coupling: val("--coupling", "all"),
      u: parseFloat(val("--ledger-u", "0")),
      driftAngle: parseFloat(val("--drift-angle", "0")) * (Math.PI / 180),
      baseTilt: parseFloat(val("--base-tilt", "0")) * (Math.PI / 180),
    });
  } else if (flag("--reduced-complex-escapement")) {
    out = complexEscapementReduced({
      pump: parseFloat(val("--pump", "0.2274")),
      transportDC: parseFloat(val("--transport-dc", "0")),
      drainRate: parseFloat(val("--drain-rate", "0.014")),
    });
  } else {
    out = diagnosticReport();
  }
  process.stdout.write(JSON.stringify(out, null, pretty) + "\n");
}
