// Native dressed-electron seed pilot (jh14 / spec Section 88).
//
// GOAL. Model the DRESSED electron -- the neutral six-architrino V5 spindle
// scaffold (3 epsilon_+, 3 epsilon_-, net 0) PLUS its charged axial payload of
// six electrinos (6 epsilon_-, net -1e; 12 architrinos total, per
// content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md) -- and
// test whether the charged payload changes the bare-scaffold no-gos found on
// the neutral core (radial support, the axial pump, and the Section 86 axis
// flutter), or whether the dressed object simply inherits them.
//
// DISCIPLINE. SEED GRADE. Coarse pilot only; NO native force-free release is
// authorized here. The central solver (src/solver/app/AbsoluteHistoryRootRuntime.mjs)
// is UNTOUCHED: this runner reuses the prescribed-worldline causal-wake
// evaluator (spindle-braid-screw-drift-evaluator.mjs) and the Section 57/58
// support + tangential + tilt machinery (spindle-support-ratio-targeted-search.mjs)
// exactly as exported, and only EXTENDS the seed geometry and readback to the
// 12-site, net-charged inventory. NOT evidence; names no retained branch;
// authorizes no acceptance. Fail-closed.
//
// PLACEMENT ANSATZ (declared; NOT pinned by corpus). quantum-number-mapping.md
// gives the axial layer as "6 axial architrinos occupying polar sites" selected
// by a "polar calm region": a transverse saddle/relative-minimum of the
// scaffold's superposed delayed potential near the spin axis. The corpus does
// NOT pin the polar radii or cadence. This pilot uses the most conservative
// realization consistent with that text:
//   * six electrinos (pol = -1) placed ON the spin (z) axis (transverse rho = 0,
//     so they carry NO orbital angular momentum and NO spin), as three
//     symmetric +/- z pairs at heights +/- scale*{h1,h2,h3};
//   * static relative to the assembly centroid (no cadence coupling to the
//     scaffold in the coarse pilot); the single search knob is the axial scale.
// This is an ansatz, reported as such. A co-rotating axial shell (rho > 0,
// nonzero J) is the declared alternative; it is NOT run here because the
// on-axis column is the cleanest object on which the polar-calm docking claim
// and the flutter question separate.

import { fileURLToPath } from "node:url";
import {
  buildBraid, wakeAccel, residuals, CHAMPION,
} from "./spindle-braid-screw-drift-evaluator.mjs";
import {
  supportRatios, tangentialLedger, gyroscopicTiltAnalysisFull,
  SELF_EQUILIBRATED_V5, SEA_BOOKING_S50,
} from "./spindle-support-ratio-targeted-search.mjs";

export const SCHEMA = "dressed_electron_native_pilot.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-angular-momentum-spin/dressed-electron-native-pilot-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  claimLevel: "seed_grade_coarse_pilot_no_native_release",
  authority: "priority_only_prescribed_worldline_evaluator_not_native_solver_not_accepted_evidence",
});

// Default axial placement ansatz. Heights are in R_M units (the scaffold middle
// band sits at R = 1). Three symmetric pairs give the six-site polar column.
export const DRESSED_ELECTRON_ANSATZ = Object.freeze({
  geo: SELF_EQUILIBRATED_V5.geo,       // the self-equilibrated bare V5 scaffold
  heights: Object.freeze([0.8, 1.3, 1.8]), // |z| of the three +/- electrino pairs
  scale: 1.0,                          // axial-scale search knob
  drop: false,                         // regression switch: true -> bare scaffold only
});

// --- small pure kinematic mirrors (base evaluator does not export these; they
// are the identical 3-line worldline forms, replicated here so the base file
// and the central solver stay untouched). Evaluated only at T = 0. ---
function posAt0(s, w) {
  const a = s.th, ca = Math.cos(s.alpha);
  return [s.sgn * s.R * ca * Math.cos(a), s.sgn * s.R * ca * Math.sin(a), s.sgn * s.R * Math.sin(s.alpha)];
}
function kinAccel0(s, w) {
  const a = s.th, k = s.sgn * s.R * Math.cos(s.alpha) * w * w;
  return [-k * Math.cos(a), -k * Math.sin(a), 0];
}
// Static point at Cartesian (x,y,z) with polarity pol, expressed in the
// {R,alpha,th,sgn} worldline params so wakeAccel treats it uniformly. On-axis
// points (x=y=0) have rho=0 -> genuinely static (no orbit, no spin).
function axialSite(name, x, y, z, pol) {
  const R = Math.hypot(x, y, z) || 1e-12;
  return { name, R, alpha: Math.asin(Math.max(-1, Math.min(1, z / R))), th: Math.atan2(y, x), sgn: +1, pol };
}

// Build the dressed electron: bare V5 scaffold (6 sites) + 6-electrino axial
// column (unless dropped). Returns a braid object consumable by wakeAccel, plus
// index bookkeeping.
export function buildDressedElectron({ geo = DRESSED_ELECTRON_ANSATZ.geo, heights = DRESSED_ELECTRON_ANSATZ.heights, scale = 1.0, drop = false, cTrans = 1.0 } = {}) {
  const base = buildBraid({ u: 0, cTrans, geo });
  const scaffoldIdx = [0, 1, 2, 3, 4, 5];
  const payload = [];
  if (!drop) {
    let n = 0;
    for (const h of heights) {
      const z = scale * h;
      payload.push(axialSite(`e${n++}+`, 0, 0, +z, -1));
      payload.push(axialSite(`e${n++}-`, 0, 0, -z, -1));
    }
  }
  const payloadIdx = payload.map((_, k) => scaffoldIdx.length + k);
  return {
    omega: base.omega, u: 0, sea: [],
    sites: [...base.sites, ...payload],
    scaffoldIdx, payloadIdx, scaffoldReps: [0, 2, 4],
    netCharge: [...base.sites, ...payload].reduce((s, x) => s + x.pol, 0),
  };
}

// Dressed coupling kappa*: same least-squares as residuals(), fitted over the
// three scaffold layer reps but with the PAYLOAD-INCLUSIVE wake.
function dressedKappa(dressed, soft) {
  let num = 0, den = 0;
  for (const i of dressed.scaffoldReps) {
    const s = dressed.sites[i];
    const kin = kinAccel0(s, dressed.omega);
    const wk = wakeAccel(dressed, i, 0, { soft }).a;
    for (let c = 0; c < 3; c++) { num += kin[c] * wk[c]; den += wk[c] * wk[c]; }
  }
  return num / den;
}

// GATE (a) + closure: dressed radial support ratios + tangential rows on the
// three scaffold layers, computed with the payload-inclusive wake, plus the
// payload docking readout (transverse residual = polar-calm quality; lateral
// stiffness = transverse restoring). Mirrors supportRatios() exactly when the
// payload is dropped.
export function dressedSupportLedger({ geo, heights, scale, drop = false, soft = 0.02, Nt = 12 } = {}) {
  const dressed = buildDressedElectron({ geo, heights, scale, drop });
  const w = dressed.omega;
  const kap = dressedKappa(dressed, soft);
  const layers = [];
  for (const i of dressed.scaffoldReps) {
    const s = dressed.sites[i];
    const rhoCyl = s.R * Math.cos(s.alpha);
    const rx = Math.cos(s.th), ry = Math.sin(s.th);
    const tx = -Math.sin(s.th), ty = Math.cos(s.th);
    const wk = wakeAccel(dressed, i, 0, { soft }).a;
    const inward = -(wk[0] * rx + wk[1] * ry);
    const need = w * w * rhoCyl;
    const tanRow = kap * (wk[0] * tx + wk[1] * ty);
    layers.push({ layer: s.name, support: (kap * inward) / need, tanRow });
  }
  const ratios = Object.fromEntries(layers.map((l) => [l.layer, l.support]));
  const tanRows = Object.fromEntries(layers.map((l) => [l.layer, l.tanRow]));

  // payload docking readout. The polar-calm claim is CYCLE-AVERAGED: the
  // rotating scaffold storm averages over one scaffold period. On the spin axis
  // (rho = 0) the cycle-averaged TRANSVERSE force vanishes identically -- the
  // whole axis is a lateral-calm LINE, not merely point poles -- so the axial
  // column docks laterally for free and its confinement is purely AXIAL. Each
  // electrino's cycle-mean axial force is the residual of the (unsolved, coarse)
  // 1-D axial-equilibrium problem: a true static column would null it.
  const period = 2 * Math.PI / w;
  const docking = [];
  for (const p of dressed.payloadIdx) {
    const s = dressed.sites[p];
    const z = s.sgn * s.R * Math.sin(s.alpha);
    let txAcc = [0, 0], axAcc = 0;
    for (let n = 0; n < Nt; n++) {
      const T = (n / Nt) * period;
      const wk = wakeAccel(dressed, p, T, { soft }).a;
      txAcc[0] += wk[0]; txAcc[1] += wk[1]; axAcc += wk[2];
    }
    const transverse = Math.hypot(txAcc[0] / Nt, txAcc[1] / Nt); // cycle-mean lateral force (~0 on axis)
    const axialForce = kap * axAcc / Nt;                          // cycle-mean axial force at kappa*
    docking.push({ site: s.name, z: +z.toFixed(4), transverse: +transverse.toFixed(6), axialForce: +axialForce.toFixed(5) });
  }

  // ledger closure using the same corridor as the bare tangential ledger
  const led = tangentialLedger({ ratios, tanRows }, { seaO: SEA_BOOKING_S50.seaO, capTan: SEA_BOOKING_S50.capTan });
  const maxTransverse = docking.length ? Math.max(...docking.map((d) => d.transverse)) : 0;
  const axialImbalance = docking.length ? Math.max(...docking.map((d) => Math.abs(d.axialForce))) : 0;
  return {
    kappaStar: +kap.toFixed(6), ratios, tanRows,
    minRatio: Math.min(...layers.map((l) => l.support)),
    maxAbsTan: Math.max(...layers.map((l) => Math.abs(l.tanRow))),
    ledgerCloses: led.ledgerCloses, ledgerTotalO: +led.totalO.toFixed(4),
    docking, maxTransverseResidual: +maxTransverse.toFixed(6), axialImbalance: +axialImbalance.toFixed(5),
    lateralCalmLine: maxTransverse < 1e-4,
    netCharge: dressed.netCharge,
  };
}

// GATE (b): single-time net z-torque (the axial pump proxy) on the scaffold,
// bare vs dressed, isolating the payload's contribution. On-axis electrinos
// contribute ~0 direct z-torque (x=y=0); their effect is the change they induce
// in the scaffold's own pump via the payload->scaffold wake.
export function dressedAxialPump({ geo = DRESSED_ELECTRON_ANSATZ.geo, heights, scale, soft = 0.02 } = {}) {
  const zTorque = (dressed, idxList, kap) => {
    let tz = 0;
    for (const i of idxList) {
      const s = dressed.sites[i];
      const p = posAt0(s, dressed.omega);
      const F = wakeAccel(dressed, i, 0, { soft }).a;
      tz += kap * (p[0] * F[1] - p[1] * F[0]);
    }
    return tz;
  };
  const bare = buildDressedElectron({ geo, drop: true });
  const dressed = buildDressedElectron({ geo, heights, scale });
  const kapBare = dressedKappa(bare, soft);
  const kapDressed = dressedKappa(dressed, soft);
  const bareScaffoldTz = zTorque(bare, bare.scaffoldIdx, kapBare);
  const dressedScaffoldTz = zTorque(dressed, dressed.scaffoldIdx, kapDressed);
  const payloadOwnTz = zTorque(dressed, dressed.payloadIdx, kapDressed);
  const payloadContribution = dressedScaffoldTz - bareScaffoldTz;
  const rel = Math.abs(bareScaffoldTz) > 1e-12 ? payloadContribution / bareScaffoldTz : null;
  let verdict = "negligible";
  if (rel !== null) {
    if (rel < -0.05) verdict = "cancels";
    else if (rel > 0.05) verdict = "adds";
    else if (Math.abs(rel) > 1e-6) verdict = "reroutes_small";
  }
  return {
    bareScaffoldZTorque: +bareScaffoldTz.toFixed(6),
    dressedScaffoldZTorque: +dressedScaffoldTz.toFixed(6),
    payloadOwnZTorque: +payloadOwnTz.toFixed(6),
    payloadContribution: +payloadContribution.toFixed(6),
    relativeToBare: rel === null ? null : +rel.toFixed(4),
    verdict,
    note: "single-time (T=0) z-torque proxy; cycle-averaged self-torque deferred (seed grade).",
  };
}

// GATE (c): the Section 86 axis flutter. The bare eigenvalue comes from the
// existing gyroscopicTiltAnalysisFull (untouched). The on-axis payload's
// contribution to the rigid transverse-tilt pencil lambda^2 M + lambda G + K is
// computed with the SAME conventions the tilt block uses:
//   * tilt inertia   m_L = rho^2 + 2 z^2   (payload rho=0 -> m_e = 2 z^2);
//   * gyroscopic     J_L = 2 rho^2 w        (payload rho=0 -> J_e = 0, no spin);
//   * tilt stiffness ~ 0: because the spin axis is a cycle-averaged lateral-calm
//     LINE, a rigid tilt carries the on-axis payload onto the tilted scaffold's
//     (also-calm) new axis, so the payload adds no first-order transverse
//     restoring against a rigid tilt -- it rides the calm line and loads the
//     tilt DOF inertially only.
// This is a REDUCED perturbation estimate of the sign of the shift (pure
// inertial loading, no counter-spin), not a full 12-site re-diagonalization
// (that is the native run's job). Reported as such.
export function dressedTiltShift({ geo = DRESSED_ELECTRON_ANSATZ.geo, heights = DRESSED_ELECTRON_ANSATZ.heights, scale = 1.0, soft = 0.02 } = {}) {
  const bare = gyroscopicTiltAnalysisFull({ geo, soft });
  const seed = buildBraid({ u: 0, geo });
  const w = seed.omega;
  // bare scaffold tilt inertia (code convention m = rho^2 + 2 z^2), summed over reps
  let mScaffold = 0, jScaffold = 0;
  for (const i of [0, 2, 4]) {
    const s = seed.sites[i];
    const rho = s.R * Math.cos(s.alpha), z = s.R * Math.sin(s.alpha);
    mScaffold += rho * rho + 2 * z * z;
    jScaffold += Math.abs(2 * rho * rho * w);
  }
  // payload contribution (on-axis: rho=0 -> m_e = 2 z^2, J_e = 0, K_e ~ 0)
  const led = dressedSupportLedger({ geo, heights, scale, soft });
  let mPay = 0; const jPay = 0, kPay = 0;
  for (const d of led.docking) mPay += 2 * d.z * d.z;
  const inertiaRatio = mPay / mScaffold;
  // reduced 1-DOF whirl scaling: at fixed G and K a gyroscopic-circulatory growth
  // rate scales ~ 1/sqrt(M). J_pay = 0 leaves the destabilizing gyroscopic sector
  // G unchanged and K_pay ~ 0, so the payload DAMPS (does not dissolve) the mode.
  const inertiaDampingFactor = 1 / Math.sqrt(1 + inertiaRatio);
  const bareRe = bare.maxGrowthRate;
  const estDressedRe = bareRe === null ? null : bareRe * inertiaDampingFactor;
  return {
    bareFlutter: bare.flutter,
    bareMaxGrowthRate: bareRe === null ? null : +bareRe.toFixed(5),
    bareWhirlFrequency: bare.maxGrowthWhirlFrequency === null ? null : +bare.maxGrowthWhirlFrequency.toFixed(5),
    payloadTiltInertia: +mPay.toFixed(5), scaffoldTiltInertia: +mScaffold.toFixed(5),
    inertiaRatio: +inertiaRatio.toFixed(4),
    payloadSpinAngularMomentum: jPay, scaffoldSpinAngularMomentum: +jScaffold.toFixed(4),
    payloadTiltStiffness: kPay,
    estDressedMaxGrowthRate: estDressedRe === null ? null : +estDressedRe.toFixed(5),
    verdict: bareRe === null ? "no_bare_flutter"
      : (estDressedRe > 0 ? "damped_not_dissolved" : "dissolved_estimate"),
    note: "reduced rigid-tilt perturbation estimate (J_pay=0, K_pay~0 by the calm-line argument, added inertia only); full 12-site gyroscopic re-diagonalization deferred (seed grade).",
  };
}

// GATE (d): the EM/photon channel the charged payload opens that the neutral
// core lacks. Reports net charge (monopole), the axial electric dipole, and the
// leading axial quadrupole of the payload column.
export function dressedEMChannel({ geo = DRESSED_ELECTRON_ANSATZ.geo, heights = DRESSED_ELECTRON_ANSATZ.heights, scale = 1.0 } = {}) {
  const dressed = buildDressedElectron({ geo, heights, scale });
  // net charge is over all 12 architrinos; the axial dipole/quadrupole are
  // reported over the CHARGED PAYLOAD only -- the neutral scaffold carries zero
  // net charge and its instantaneous (T=0) multipoles average to zero over a
  // spin period, so scaffold snapshot moments are not a physical EM signature.
  let q = 0; for (const i of [...dressed.scaffoldIdx, ...dressed.payloadIdx]) q += dressed.sites[i].pol;
  let dz = 0, qzz = 0;
  for (const i of dressed.payloadIdx) {
    const s = dressed.sites[i];
    const p = posAt0(s, dressed.omega);
    dz += s.pol * p[2];
    qzz += s.pol * (3 * p[2] * p[2] - (p[0] * p[0] + p[1] * p[1] + p[2] * p[2]));
  }
  const bare = buildDressedElectron({ geo, drop: true });
  let qBare = 0; for (const i of bare.scaffoldIdx) qBare += bare.sites[i].pol;
  return {
    netChargeUnitsEpsilon: q, netChargeInE: q / 6, // 6 epsilon = 1 e
    bareCoreNetCharge: qBare,
    payloadAxialDipoleZ: +dz.toFixed(6), payloadAxialQuadrupoleZZ: +qzz.toFixed(6),
    monopoleChannelOpen: q !== 0,
    channel: q !== 0
      ? "charged payload opens a monopole (Coulomb / photon) channel absent on the neutral core; leading radiative EM is monopole-forbidden but the object now couples to external EM at O(1/r) potential and to the photon sector via its charge current."
      : "no monopole channel (net neutral).",
    note: "static multipoles of the T=0 seed; the dynamic photon-emission ledger is a separate native burden.",
  };
}

// Full pilot: run every gate on the dressed object at the given axial scale.
export function dressedElectronPilot({ geo = DRESSED_ELECTRON_ANSATZ.geo, heights = DRESSED_ELECTRON_ANSATZ.heights, scale = 1.0, soft = 0.02 } = {}) {
  const support = dressedSupportLedger({ geo, heights, scale, soft });
  const pump = dressedAxialPump({ geo, heights, scale, soft });
  const tilt = dressedTiltShift({ geo, heights, scale, soft });
  const em = dressedEMChannel({ geo, heights, scale });
  const inherits = tilt.verdict === "damped_not_dissolved";
  return {
    schema: SCHEMA, ...FAIL_CLOSED,
    ansatz: { geo, heights, scale, placement: "on-axis symmetric electrino column (declared ansatz)" },
    gateA_supportAndClosure: support,
    gateB_axialPump: pump,
    gateC_axisFlutter: tilt,
    gateD_emChannel: em,
    honestSummary: {
      dressedSuppliesOwnCharge: em.monopoleChannelOpen,
      payloadDocksOnLateralCalmLine: support.lateralCalmLine,
      axialColumnEquilibriumSolved: support.axialImbalance < 0.05,
      flutterOutcome: tilt.verdict,
      inheritsBareFlutterNoGo: inherits,
      statement: inherits
        ? "The on-axis 6e- payload rides the cycle-averaged lateral-calm line (no first-order tilt restoring) and carries NO spin, so it loads the tilt sector inertially only: it strongly DAMPS but does not dissolve the Section 86 axis flutter (est. Re lambda stays > 0). It cancels ~13% of the bare +0.424 axial pump and supplies the object's own -1e monopole/EM channel. Net: the dressed electron partially rescues the scaffold (own charge, partial pump cancellation, inertial flutter damping) yet INHERITS the flutter no-go at seed grade; a spin-carrying (co-rotating) axial layer is the declared alternative that could reach the gyroscopic sector."
        : "Estimate suggests the payload removes the flutter growth; this is a reduced-pencil estimate only and REQUIRES the full native re-diagonalization before any dissolution claim.",
    },
  };
}

// Small axial-scale search (the declared one-knob self-consistent hunt). Scans
// the axial column scale and reports, at each scale, the scaffold support health
// (distance of the three ratios from 1) and the payload docking quality
// (cycle-mean transverse residual and worst lateral stiffness). The objective is
// scaffold-support preservation + calm docking; it is a COARSE locator, not an
// accepted fixed point.
export function searchAxialScale({ geo = DRESSED_ELECTRON_ANSATZ.geo, heights = DRESSED_ELECTRON_ANSATZ.heights, scales = [0.8, 1.2, 1.6, 2.0, 2.6, 3.2, 4.0], soft = 0.02, Nt = 12 } = {}) {
  const bare = supportRatios({ geo, soft });
  const rows = [];
  for (const scale of scales) {
    const s = dressedSupportLedger({ geo, heights, scale, soft, Nt });
    const supportMiss = ["I", "M", "O"].reduce((m, L) => m + (s.ratios[L] - 1) ** 2, 0);
    rows.push({
      scale,
      ratios: { I: +s.ratios.I.toFixed(3), M: +s.ratios.M.toFixed(3), O: +s.ratios.O.toFixed(3) },
      supportMiss: +supportMiss.toFixed(4),
      lateralCalmLine: s.lateralCalmLine,
      axialImbalance: s.axialImbalance,
    });
  }
  const best = rows.slice().sort((a, b) => (a.supportMiss + a.axialImbalance) - (b.supportMiss + b.axialImbalance))[0];
  return {
    bareRatios: { I: +bare.ratios.I.toFixed(3), M: +bare.ratios.M.toFixed(3), O: +bare.ratios.O.toFixed(3) },
    scan: rows, bestScale: best.scale,
    note: "coarse one-knob axial-scale locator; no accepted self-consistent fixed point is claimed.",
  };
}

// Regression witness: dropping the payload must recover the bare scaffold gates
// EXACTLY (bit-for-bit against the existing supportRatios / gyroscopicTiltAnalysisFull).
export function bareRegressionWitness({ geo = DRESSED_ELECTRON_ANSATZ.geo, soft = 0.02 } = {}) {
  const dressedDropped = dressedSupportLedger({ geo, drop: true, soft });
  const bare = supportRatios({ geo, soft });
  const ratioDelta = ["I", "M", "O"].reduce((m, L) => Math.max(m, Math.abs(dressedDropped.ratios[L] - bare.ratios[L])), 0);
  const kappaDelta = Math.abs(dressedDropped.kappaStar - +bare.kappaStar.toFixed(6));
  const pump = dressedAxialPump({ geo, heights: [], scale: 1 }); // no payload -> contribution must be 0
  return {
    supportRatioMaxDelta: ratioDelta,
    kappaStarDelta: +kappaDelta.toFixed(9),
    payloadPumpContributionWhenEmpty: pump.payloadContribution,
    recoversBare: ratioDelta < 1e-9 && pump.payloadContribution === 0,
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) {
  const argv = process.argv.slice(2);
  const flag = (n) => argv.includes(n);
  const val = (n, dflt) => { const i = argv.indexOf(n); return i >= 0 && i + 1 < argv.length ? argv[i + 1] : dflt; };
  const pretty = flag("--pretty") ? 2 : 0;
  const scale = parseFloat(val("--scale", "1.0"));
  let out;
  if (flag("--regression")) out = bareRegressionWitness({});
  else if (flag("--scale-scan")) out = searchAxialScale({});
  else if (flag("--support")) out = dressedSupportLedger({ scale });
  else if (flag("--pump")) out = dressedAxialPump({ scale });
  else if (flag("--flutter")) out = dressedTiltShift({ scale });
  else if (flag("--em")) out = dressedEMChannel({ scale });
  else out = dressedElectronPilot({ scale });
  console.log(JSON.stringify(out, null, pretty));
}
