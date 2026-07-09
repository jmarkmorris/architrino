#!/usr/bin/env node
// Spindle Braid Native Retained-History Confirmation Run.
//
// Scope contract: reference/priorities/braid-ideal/spindle-braid-native-confirmation-handoff.md
// (the named candidate row for `native_retained_history_promotion`, queue item 4).
//
// What this run does (packet Section 2):
//  1. SEED: the six prescribed spindle-braid worldlines (held phase) — exact
//     moving-circular source histories in the production runtime's own model.
//  2. RELEASE at t = 0 onto the native central-solver retained-history path:
//     every causal root, every D_s / D_T / W^rec / signedBranchOrientation is
//     solved and read from the production runtime
//     (AbsoluteHistoryRootRuntime.solveMovingCircularSourceCausalRoots,
//     consumed read-only — no new solver, no parallel stack, no schema change).
//     Post-release retained path history is consumed through the production
//     runtime's own declared approximation policy
//     ("linearized-moving-circular-source-segments"): each retained history
//     step is presented to the production solver as a zero-radius
//     moving-circular source with the retained center velocity, exactly the
//     source shape createMovingCircularSourceLinearizedRootRequests emits.
//     Cheap residual sampling over the retained record is used ONLY to bracket
//     candidate segments; every retained root row is produced by the
//     production solver call on that segment.
//  3. Retains full path history over a declared finite memory window and
//     reports the packet Section 3 same-record acceptance rows.
//
// Fail-closed (packet Section 3): this script flips no acceptance flag.
//   retainedBranchClaim = false, scoreMovement = no_score_increase.
// The accept/reject decision belongs to the operator, in the run thread.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { solveMovingCircularSourceCausalRoots } from "../../src/solver/app/AbsoluteHistoryRootRuntime.mjs";

export const SCHEMA = "spindle_braid_native_retained_history_confirmation_run.v0";
export const HANDOFF_PACKET_REF =
  "reference/priorities/braid-ideal/spindle-braid-native-confirmation-handoff.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false,
  acceptedSameLevelBranchClaim: false,
  retainedBranch: null,
  scoreMovement: "no_score_increase",
  acceptedSeedPathCertificate: false,
  authority:
    "priority_only_native_runtime_confirmation_run_operator_acceptance_pending_same_thread",
});

const TWO_PI = 2 * Math.PI;
const deg = (d) => (d * Math.PI) / 180;

// ---------------------------------------------------------------------------
// Declared run parameters (all regulators named; packet Section 3 discipline).
// ---------------------------------------------------------------------------
export const DECLARED = {
  fieldSpeed: 1, // c_f
  omega: 1, // common rest cadence (beta_M = 1 on the rail)
  // Tabled candidate row (packet Section 1; canonical, NOT the refined variant).
  layers: Object.freeze([
    Object.freeze({ name: "I", R: 0.5, alpha: deg(-12), theta: 0 }),
    Object.freeze({ name: "M", R: 1.0, alpha: 0, theta: deg(120) }),
    Object.freeze({ name: "O", R: 1.65, alpha: deg(84), theta: deg(330) }),
  ]),
  // Regulators (declared, lane canon):
  soft: 0.02, // Jacobian softening in m_reg = D_T D_s / (D_s^2 + soft^2)
  coincidenceStratum: 0.01, // rho_c: declared d0-stratum run regulator.
  // d0 per the 2026-07-08 operator declaration is ~kappa*eps^2/c_f^2 (R_MCB,
  // exact value open); the pin-stability bound is d0 <= rho_c* ~ 0.022
  // (spec Section 12). rho_c = 0.01 sits inside the stable range. Regulator
  // dependence is reported, not hidden (report.regulatorSensitivity).
  // d_min must sit BELOW the stratum: the same-source fold-click brake lives at
  // emission delays of order rho_c right after a rail crossing; excluding
  // delays below rho_c silently skips the click transaction (measured in the
  // first smoke run of this script). Coincidence is regularized by rho_c in
  // the force denominator, so near-coincident roots are safe to book.
  sameSourceMinimumDelay: 1e-4, // d_min << rho_c (coincidence handling declared)
  timeStep: 0.0025, // must resolve the stratum-scale click window at the rail
  bracketStrideCoarse: 4, // released-history bracket sampling stride (far zone)
  bracketFineDelay: 0.12, // delays below this sampled at stride 1 (near zone)
  memoryWindowRotations: 3, // declared finite memory depth
  runRotations: 3,
  twinRotations: 1,
  twinPerturbation: 1e-3, // tangential kick on the middle + site (stability row)
  causalSlack: 0.8, // additive slack on the causal delay bound per pair
  haltMaxRadius: 12,
  haltMaxSpeed: 6,
  tubeRadiusForShapeQuestion: 0.1, // |x - x_rigid| threshold (R_M units), declared
  // Chart-clean same-source click booking (spec Sections 2/3.1/3.3; opt-in via
  // --chart). The pointwise soft-regularized m_reg suppresses the same-source
  // brake by ~soft/D_s near the rail (D_s << soft there), which is exactly the
  // fold-flagged regime where the contract says the integrated weight must
  // replace the pointwise weight. In chart mode the same-source channel books
  // m = D_T/D_s unsoftened (production signedBranchOrientation, treated as a
  // density-of-states integral via substeps), with the declared d0 stratum in
  // the force denominator; cross-pair channels keep the canonical m_reg.
  // Non-circular same-level seed (opt-in via --em/--ei/--eo): per-layer
  // epicyclic release. The layer is seeded at its apsis radius rho*f with
  // angular-momentum-matched tangential speed beta/f, and its HELD prehistory
  // is the matched circle (omega/f^2) — exactly representable as a production
  // moving-circular source, so release carries no position/velocity
  // discontinuity. e=0 reproduces the tabled circular seed exactly. Declared
  // hunt probe: the escapement's natural cycle is sub-rail at apoapsis,
  // rail-crossing clicks near periapsis.
  //
  // Epicyclic-hunt knobs (epicyclic-hunt-handoff.md; both declared):
  //  - apsisStart (--start-i/--start-m/--start-o = apo|peri): which apsis the
  //    layer is released from. f = 1+e (apoapsis, slower matched circle) or
  //    f = 1-e (periapsis, faster matched circle). Both are a.m.-matched
  //    (rho*f * beta/f = rho*beta) and both keep the exact-prehistory
  //    property: with an origin-centered matched-circle prehistory the
  //    release point necessarily has zero radial velocity, i.e. release is
  //    always AT an apsis — the start choice selects which one.
  //  - apsidalPhase (--phi-i/--phi-m/--phi-o, degrees): per-layer azimuthal
  //    offset of the apsis line (argument of apsis). The layer is released at
  //    azimuth theta + phi instead of theta, i.e. the release point / apsis
  //    is placed elsewhere along the closed epicycle relative to the braid
  //    pattern. The tabled azimuth theta itself is untouched; phi is the
  //    declared epicyclic knob. phi=0 regresses exactly.
  epicycle: { I: 0, M: 0, O: 0 },
  apsidalPhase: { I: 0, M: 0, O: 0 }, // radians
  apsisStart: { I: "apo", M: "apo", O: "apo" }, // "apo" | "peri"
  // Sea-confined mode (opt-in via --sea): the SH-0-sea FCC-12 static shell
  // (held-release-causal-wake-toy.mjs sea-screened decoration; spec Section 27
  // precedent) as a ONE-WAY held environment — 12 aligned face-opposite
  // six-site braid units on the FCC nearest-neighbor directions, static in the
  // void frame, acting on the released seed with no back-reaction (declared
  // held histories). Environment sources are zero-radius static
  // moving-circular production sources; only canon-named spacings are used:
  // the SH-0-sea named spacing 4.25 and the minimum non-overlap spacing
  // 2*sqrt(2). No spacing tuning.
  sea: {
    enabled: false,
    spacing: 4.25, // SH-0-sea named spacing (CLI --sea-spacing; 2.8284 = min non-overlap)
    unitOffsets: [
      [1, 0, 0], [0, 1, 0], [0, 0, 1],
      [-1, 0, 0], [0, -1, 0], [0, 0, -1],
    ],
    unitPolarities: [1, 1, 1, -1, -1, -1],
    fccDirections: [
      [1, 1, 0], [1, -1, 0], [-1, 1, 0], [-1, -1, 0],
      [1, 0, 1], [1, 0, -1], [-1, 0, 1], [-1, 0, -1],
      [0, 1, 1], [0, 1, -1], [0, -1, 1], [0, -1, -1],
    ],
  },
  chart: {
    enabled: false,
    foldJacobianThreshold: 0.02, // |D_s| below this = fold-flagged, substep-integrate
    windowMinDelay: 0.002, // same-source window emission-delay floor (the accepted
    // brake-measurement convention, self-hit-brake-central-measurement.mjs)
    subSteps: 32,
    witnessSubSteps: 64, // regularization-independence witness resolution
    maxClickRows: 60, // detailed click rows retained (aggregates always kept)
  },
};

// ---------------------------------------------------------------------------
// Site construction (identical geometry to the Section 22 champion evaluator).
// ---------------------------------------------------------------------------
export function buildSites() {
  const sites = [];
  for (const L of DECLARED.layers) {
    const e = DECLARED.epicycle[L.name] ?? 0;
    const phi = DECLARED.apsidalPhase[L.name] ?? 0;
    const start = DECLARED.apsisStart[L.name] ?? "apo";
    // apsis factor: apoapsis f=1+e (slower matched circle), periapsis f=1-e
    // (faster matched circle); both a.m.-matched, both exact-prehistory.
    const f = start === "peri" ? 1 - e : 1 + e;
    for (const sgn of [+1, -1]) {
      const rho = L.R * Math.cos(L.alpha) * f;
      sites.push({
        id: `${L.name}${sgn > 0 ? "+" : "-"}`,
        layer: L.name,
        R: L.R,
        alpha: L.alpha,
        rho,
        z0: sgn * L.R * Math.sin(L.alpha),
        phase: L.theta + phi + (sgn > 0 ? 0 : Math.PI),
        pol: sgn, // polarity product sigma_i sigma_j is all the force law uses
        // held cadence: angular-momentum-matched circle at the chosen apsis
        omegaHeld: DECLARED.omega / (f * f),
        epicycle: e,
        apsisFactor: f,
        apsisStart: start,
        apsidalPhase: phi,
      });
    }
  }
  return sites;
}

export function buildSeaSites() {
  if (!DECLARED.sea.enabled) return [];
  const out = [];
  const s = DECLARED.sea.spacing;
  for (let d = 0; d < DECLARED.sea.fccDirections.length; d += 1) {
    const dir = DECLARED.sea.fccDirections[d];
    const n = Math.hypot(dir[0], dir[1], dir[2]);
    const center = [(dir[0] / n) * s, (dir[1] / n) * s, (dir[2] / n) * s];
    for (let k = 0; k < DECLARED.sea.unitOffsets.length; k += 1) {
      const o = DECLARED.sea.unitOffsets[k];
      out.push({
        id: `sea:${d}:${k}`,
        position: [center[0] + o[0], center[1] + o[1], center[2] + o[2]],
        pol: DECLARED.sea.unitPolarities[k],
      });
    }
  }
  return out;
}

function staticSeaSourceModel(seaSite) {
  return {
    centerAtEpoch: { x: seaSite.position[0], y: seaSite.position[1], z: seaSite.position[2] },
    centerVelocity: { x: 0, y: 0, z: 0 },
    radiusU: { x: 0, y: 0, z: 0 },
    radiusV: { x: 0, y: 0, z: 0 },
    angularVelocity: 0,
    phaseAtEpoch: 0,
    epochTime: 0,
  };
}

// Static held environment source: the causal root sits exactly at
// t_e = t_H - |x_r - s|/c_f; a narrow production window around it suffices.
export function seaWakeContribution({ seaSites, xi, vi, receiverPol, tH }) {
  const soft = DECLARED.soft;
  const rc2 = DECLARED.coincidenceStratum * DECLARED.coincidenceStratum;
  const a = [0, 0, 0];
  let netRadial = 0;
  for (const sea of seaSites) {
    const dist = Math.hypot(
      xi[0] - sea.position[0],
      xi[1] - sea.position[1],
      xi[2] - sea.position[2]
    );
    const tRoot = tH - dist / DECLARED.fieldSpeed;
    const result = solveMovingCircularSourceCausalRoots({
      source: staticSeaSourceModel(sea),
      receiver: {
        startTime: tH,
        positionAtStart: { x: xi[0], y: xi[1], z: xi[2] },
        velocity: { x: vi[0], y: vi[1], z: vi[2] },
      },
      hitTime: tH,
      signalSpeed: DECLARED.fieldSpeed,
      sourceStartTime: tRoot - 0.05,
      sourceEndTime: Math.min(tRoot + 0.05, tH),
      rootTolerance: 1e-12,
      scanSubdivisions: 8,
      maxRoots: 2,
    });
    for (const root of result.roots ?? []) {
      const r = root.distance;
      if (!(r > 0) || !Number.isFinite(r)) continue;
      const dir = [
        (root.receiverPoint.x - root.sourcePoint.x) / r,
        (root.receiverPoint.y - root.sourcePoint.y) / r,
        (root.receiverPoint.z - root.sourcePoint.z) / r,
      ];
      const Ds = root.sourceNormalDenominator;
      const Dt = root.receiverNormalNumerator;
      const mReg = (Dt * Ds) / (Ds * Ds + soft * soft);
      const w = (receiverPol * sea.pol * mReg) / (r * r + rc2);
      a[0] += w * dir[0];
      a[1] += w * dir[1];
      a[2] += w * dir[2];
    }
  }
  const rho = Math.hypot(xi[0], xi[1]);
  if (rho > 1e-12) netRadial = (a[0] * xi[0] + a[1] * xi[1]) / rho;
  return { a, netRadial };
}

export function heldSourceModel(site) {
  return {
    centerAtEpoch: { x: 0, y: 0, z: site.z0 },
    centerVelocity: { x: 0, y: 0, z: 0 },
    radiusU: { x: site.rho, y: 0, z: 0 },
    radiusV: { x: 0, y: site.rho, z: 0 },
    angularVelocity: site.omegaHeld ?? DECLARED.omega,
    angularAcceleration: 0,
    phaseAtEpoch: site.phase,
    epochTime: 0,
  };
}

export function rigidPosition(site, t) {
  const w = site.omegaHeld ?? DECLARED.omega;
  const a = w * t + site.phase;
  return [site.rho * Math.cos(a), site.rho * Math.sin(a), site.z0];
}

export function rigidVelocity(site, t) {
  const w = site.omegaHeld ?? DECLARED.omega;
  const a = w * t + site.phase;
  const v = site.rho * w;
  return [-v * Math.sin(a), v * Math.cos(a), 0];
}

// ---------------------------------------------------------------------------
// Retained path history (held analytic prehistory + released samples).
// ---------------------------------------------------------------------------
class RetainedHistory {
  constructor(site) {
    this.site = site;
    this.ts = [];
    this.xs = [];
    this.vs = [];
    this.maxRadiusSeen = Math.hypot(site.rho, site.z0);
  }
  push(t, x, v) {
    this.ts.push(t);
    this.xs.push(x.slice());
    this.vs.push(v.slice());
    const r = Math.hypot(x[0], x[1], x[2]);
    if (r > this.maxRadiusSeen) this.maxRadiusSeen = r;
  }
  // Position at emission time (held phase exact, released linear-in-segment —
  // the production linearization policy's own interpolation shape).
  positionAt(tE) {
    if (tE <= 0 || this.ts.length === 0) return rigidPosition(this.site, tE);
    const dt = DECLARED.timeStep;
    let k = Math.min(this.ts.length - 1, Math.max(0, Math.floor(tE / dt)));
    while (k > 0 && this.ts[k] > tE) k -= 1;
    while (k < this.ts.length - 1 && this.ts[k + 1] <= tE) k += 1;
    const h = tE - this.ts[k];
    const x = this.xs[k];
    const v = this.vs[k];
    return [x[0] + v[0] * h, x[1] + v[1] * h, x[2] + v[2] * h];
  }
  segment(k) {
    return { t: this.ts[k], x: this.xs[k], v: this.vs[k] };
  }
}

// ---------------------------------------------------------------------------
// Native root solve for one directed relation (receiver i <- source j).
// All roots come from production solver calls; local sampling only brackets.
// ---------------------------------------------------------------------------
function receiverRecord(xi, vi, tH) {
  return {
    startTime: tH,
    positionAtStart: { x: xi[0], y: xi[1], z: xi[2] },
    velocity: { x: vi[0], y: vi[1], z: vi[2] },
  };
}

function collectRoots(result, out, boundary) {
  if (!result || !Array.isArray(result.roots)) return;
  for (const root of result.roots) {
    if (boundary && (root.emissionTime < boundary.lo - 1e-9 || root.emissionTime > boundary.hi + 1e-9)) continue;
    out.push(root);
  }
}

export function solveDirectedRelation({ histories, i, j, tH, xi, vi, sameSource, minimumDelayOverride = null, delayCapOverride = null }) {
  const c = DECLARED.fieldSpeed;
  const hj = histories[j];
  const receiverR = Math.hypot(xi[0], xi[1], xi[2]);
  let delayMax = Math.min(
    (receiverR + hj.maxRadiusSeen + DECLARED.causalSlack) / c,
    DECLARED.memoryWindowRotations * TWO_PI
  );
  if (delayCapOverride != null) {
    delayMax = Math.min(delayMax, delayCapOverride);
  }
  const tLo = tH - delayMax;
  const dMin = minimumDelayOverride ?? DECLARED.sameSourceMinimumDelay;
  const tEnd = sameSource ? tH - dMin : tH;
  const roots = [];
  let heldScan = null;

  // Held-phase window: exact production moving-circular solve.
  const heldEnd = Math.min(0, tEnd);
  if (tLo < heldEnd) {
    const window = heldEnd - tLo;
    const result = solveMovingCircularSourceCausalRoots({
      source: heldSourceModel(hj.site),
      receiver: receiverRecord(xi, vi, tH),
      hitTime: tH,
      signalSpeed: c,
      sourceStartTime: tLo,
      sourceEndTime: heldEnd,
      rootTolerance: 1e-12,
      scanSubdivisions: Math.max(32, Math.min(2048, Math.ceil(window / 0.01))),
      maxRoots: 32,
    });
    collectRoots(result, roots, { lo: tLo, hi: heldEnd });
    heldScan = result.scan ?? null;
  }

  // Released window: bracket over retained samples, refine per segment on the
  // production solver (zero-radius moving-circular segment sources).
  let releasedGap = Infinity;
  const relStart = Math.max(0, tLo);
  if (tEnd > relStart && hj.ts.length > 0) {
    const dt = DECLARED.timeStep;
    const kLo = Math.max(0, Math.floor(relStart / dt) - 1);
    const kHi = Math.min(hj.ts.length - 1, Math.ceil(tEnd / dt));
    const g = (k) => {
      const p = hj.xs[k];
      return (
        Math.hypot(xi[0] - p[0], xi[1] - p[1], xi[2] - p[2]) - c * (tH - hj.ts[k])
      );
    };
    let gPrev = g(kLo);
    let kPrev = kLo;
    releasedGap = Math.abs(gPrev);
    const solveSegment = (k) => {
      const seg = hj.segment(k);
      const segEnd = Math.min(k + 1 < hj.ts.length ? hj.ts[k + 1] : tEnd, tEnd);
      if (segEnd <= seg.t) return;
      const result = solveMovingCircularSourceCausalRoots({
        source: {
          centerAtEpoch: { x: seg.x[0], y: seg.x[1], z: seg.x[2] },
          centerVelocity: { x: seg.v[0], y: seg.v[1], z: seg.v[2] },
          radiusU: { x: 0, y: 0, z: 0 },
          radiusV: { x: 0, y: 0, z: 0 },
          angularVelocity: 0,
          phaseAtEpoch: 0,
          epochTime: seg.t,
        },
        receiver: receiverRecord(xi, vi, tH),
        hitTime: tH,
        signalSpeed: c,
        sourceStartTime: seg.t,
        sourceEndTime: segEnd,
        rootTolerance: 1e-12,
        scanSubdivisions: 8,
        maxRoots: 4,
      });
      collectRoots(result, roots, { lo: seg.t, hi: segEnd });
    };
    // Adaptive bracket stride: coarse in the far zone, fine within
    // bracketFineDelay of the hit (where the stratum-scale same-source click
    // roots live). On a coarse-stride sign change, every sub-segment in the
    // stride is handed to the production solver.
    const fineFromK = Math.max(
      kLo,
      Math.floor((tH - DECLARED.bracketFineDelay) / dt)
    );
    let k = kLo;
    while (k < kHi) {
      const stride = k >= fineFromK ? 1 : DECLARED.bracketStrideCoarse;
      const kNext = Math.min(k + stride, kHi);
      if (hj.ts[kNext] > tEnd + dt * stride) break;
      const gK = g(kNext);
      releasedGap = Math.min(releasedGap, Math.abs(gK));
      if (Math.sign(gPrev) !== Math.sign(gK) || Math.abs(gK) <= 1e-12) {
        for (let kk = k; kk < kNext; kk += 1) solveSegment(kk);
      }
      gPrev = gK;
      kPrev = kNext;
      k = kNext;
    }
    // Final partial segment up to tEnd (covers roots between last sample and tEnd).
    const kLast = Math.min(hj.ts.length - 1, kHi);
    if (hj.ts[kLast] < tEnd) {
      const pEndPos = hj.positionAt(tEnd);
      const gEnd =
        Math.hypot(xi[0] - pEndPos[0], xi[1] - pEndPos[1], xi[2] - pEndPos[2]) -
        c * (tH - tEnd);
      releasedGap = Math.min(releasedGap, Math.abs(gEnd));
      if (Math.sign(gPrev) !== Math.sign(gEnd)) {
        for (let kk = Math.max(kPrev, 0); kk <= kLast; kk += 1) solveSegment(kk);
      }
    }
  }

  // Dedupe (held/released boundary can double-catch) and sort.
  roots.sort((a, b) => a.emissionTime - b.emissionTime);
  const retained = [];
  for (const root of roots) {
    if (
      retained.length > 0 &&
      Math.abs(root.emissionTime - retained[retained.length - 1].emissionTime) <= 1e-7
    ) {
      continue;
    }
    retained.push(root);
  }
  return { roots: retained, heldScan, releasedGap, delayMax };
}

// ---------------------------------------------------------------------------
// Wake acceleration from production root rows (declared force law, lane canon:
// a_i = kappa * sum sigma_i sigma_j * m_reg / (r^2 + rho_c^2) * r_hat,
// m_reg = D_T D_s / (D_s^2 + soft^2), all row fields read from the runtime).
// ---------------------------------------------------------------------------
export function wakeAcceleration({ histories, sites, i, tH, xi, vi, ledger = null, splitSelf = false, seaSites = null }) {
  const soft = DECLARED.soft;
  const rc2 = DECLARED.coincidenceStratum * DECLARED.coincidenceStratum;
  const a = [0, 0, 0];
  const aSelf = [0, 0, 0];
  const selfRows = [];
  let selfRootCount = 0;
  for (let j = 0; j < sites.length; j += 1) {
    const sameSource = j === i;
    const { roots, heldScan, releasedGap } = solveDirectedRelation({
      histories,
      i,
      j,
      tH,
      xi,
      vi,
      sameSource,
    });
    const sigma = sites[i].pol * sites[j].pol; // +1 for same-source
    const rows = [];
    for (const root of roots) {
      const r = root.distance;
      if (!(r > 0) || !Number.isFinite(r)) continue;
      const dir = [
        (root.receiverPoint.x - root.sourcePoint.x) / r,
        (root.receiverPoint.y - root.sourcePoint.y) / r,
        (root.receiverPoint.z - root.sourcePoint.z) / r,
      ];
      const Ds = root.sourceNormalDenominator;
      const Dt = root.receiverNormalNumerator;
      const mReg = (Dt * Ds) / (Ds * Ds + soft * soft);
      const w = (sigma * mReg) / (r * r + rc2);
      a[0] += w * dir[0];
      a[1] += w * dir[1];
      a[2] += w * dir[2];
      if (sameSource) {
        selfRootCount += 1;
        aSelf[0] += w * dir[0];
        aSelf[1] += w * dir[1];
        aSelf[2] += w * dir[2];
        if (splitSelf) {
          selfRows.push({ Ds, Dt, distance: r, dir, emissionTime: root.emissionTime });
        }
      }
      if (ledger) {
        rows.push({
          emissionTime: root.emissionTime,
          delay: root.delay,
          distance: r,
          Ds,
          Dt,
          signedBranchOrientation: root.signedBranchOrientation,
          branchWeightWrec: root.branchWeight,
          mRegularized: mReg,
          foldFlagged: Math.abs(Ds) < soft,
        });
      }
    }
    if (ledger) {
      ledger.push({
        receiver: sites[i].id,
        source: sites[j].id,
        relation: sameSource ? "same-source" : "cross-pair",
        activeRootCount: roots.length,
        roots: rows,
        inactiveGap:
          roots.length === 0
            ? {
                heldScanMinAbsResidual: heldScan ? heldScan.minAbsResidual : null,
                releasedMinAbsResidual: Number.isFinite(releasedGap) ? releasedGap : null,
              }
            : null,
      });
    }
  }
  if (seaSites && seaSites.length > 0) {
    const sea = seaWakeContribution({ seaSites, xi, vi, receiverPol: sites[i].pol, tH });
    a[0] += sea.a[0];
    a[1] += sea.a[1];
    a[2] += sea.a[2];
    if (ledger) {
      ledger.push({
        receiver: sites[i].id,
        source: "sea:FCC-12-aggregate",
        relation: "environment-one-way",
        activeRootCount: seaSites.length,
        seaAcceleration: sea.a,
        seaNetRadial: sea.netRadial,
        roots: [],
        inactiveGap: null,
      });
    }
  }
  return { a, aSelf, selfRows, selfRootCount };
}

// ---------------------------------------------------------------------------
// Chart-clean same-source booking (spec Sections 2/3.1/3.3): substep-integrate
// the same-source channel over one base step, reading the production row's
// signed branch orientation unsoftened (density-of-states integral) with the
// declared d0 stratum in the force denominator. Returns the booked velocity
// increment plus the chart quantities for the click row.
// ---------------------------------------------------------------------------
export function chartWindowIntegrate({
  histories,
  sites,
  i,
  t0,
  dt,
  x0,
  v0,
  aFrozen, // non-chart acceleration (partner channels), frozen over the step
  kappa,
  subSteps = DECLARED.chart.subSteps,
}) {
  const rc2 = DECLARED.coincidenceStratum * DECLARED.coincidenceStratum;
  const dv = [0, 0, 0];
  let prevIntegrand = null;
  let minChord = Infinity;
  let mu = 0; // unfolding parameter, mu-dot = D_T
  let prevDt = null;
  let rootCountAtEnd = 0;
  const dsSamples = [];
  const h = dt / subSteps;
  for (let k = 0; k <= subSteps; k += 1) {
    const tau = k * h;
    const tK = t0 + tau;
    // receiver provisionally advanced under frozen non-chart acceleration
    // plus the chart increment booked so far
    const xK = [
      x0[0] + (v0[0] + dv[0]) * tau + 0.5 * aFrozen[0] * tau * tau,
      x0[1] + (v0[1] + dv[1]) * tau + 0.5 * aFrozen[1] * tau * tau,
      x0[2] + (v0[2] + dv[2]) * tau + 0.5 * aFrozen[2] * tau * tau,
    ];
    const vK = [
      v0[0] + dv[0] + aFrozen[0] * tau,
      v0[1] + dv[1] + aFrozen[1] * tau,
      v0[2] + dv[2] + aFrozen[2] * tau,
    ];
    const { roots } = solveDirectedRelation({
      histories,
      i,
      j: i,
      tH: tK,
      xi: xK,
      vi: vK,
      sameSource: true,
      minimumDelayOverride: DECLARED.chart.windowMinDelay,
      delayCapOverride: 2.0, // same-source chart scan cap (declared)
    });
    rootCountAtEnd = roots.length;
    const integrand = [0, 0, 0];
    let foldBranch = null; // min-|D_s| root this substep (the fold-near branch)
    for (const root of roots) {
      const r = root.distance;
      if (!(r > 0) || !Number.isFinite(r)) continue;
      const dir = [
        (root.receiverPoint.x - root.sourcePoint.x) / r,
        (root.receiverPoint.y - root.sourcePoint.y) / r,
        (root.receiverPoint.z - root.sourcePoint.z) / r,
      ];
      const Ds = root.sourceNormalDenominator;
      const Dt = root.receiverNormalNumerator;
      if (!Number.isFinite(Ds) || Math.abs(Ds) < 1e-12) continue;
      const m = Dt / Ds; // production signedBranchOrientation, unsoftened
      const w = (kappa * m) / (r * r + rc2); // sigma_self = +1
      integrand[0] += w * dir[0];
      integrand[1] += w * dir[1];
      integrand[2] += w * dir[2];
      minChord = Math.min(minChord, r);
      if (!foldBranch || Math.abs(Ds) < Math.abs(foldBranch.Ds)) foldBranch = { Ds, Dt };
    }
    if (foldBranch) {
      if (prevDt !== null) mu += 0.5 * (foldBranch.Dt + prevDt) * h;
      dsSamples.push({ mu, Ds: foldBranch.Ds, Dt: foldBranch.Dt });
      prevDt = foldBranch.Dt;
    } else {
      prevDt = null;
    }
    if (prevIntegrand) {
      dv[0] += 0.5 * (integrand[0] + prevIntegrand[0]) * h;
      dv[1] += 0.5 * (integrand[1] + prevIntegrand[1]) * h;
      dv[2] += 0.5 * (integrand[2] + prevIntegrand[2]) * h;
    }
    prevIntegrand = integrand;
  }
  // fold-curvature fit D_s^2 = 2 a mu over the sampled window (least squares
  // through the origin; only meaningful when mu grew)
  let foldCurvature = null;
  let num = 0;
  let den = 0;
  for (const s of dsSamples) {
    if (s.mu > 0) {
      num += s.Ds * s.Ds * s.mu;
      den += 2 * s.mu * s.mu;
    }
  }
  if (den > 0) foldCurvature = num / den;
  return {
    dv,
    minChord: Number.isFinite(minChord) ? minChord : null,
    unfoldingWindowMu: mu,
    foldCurvature,
    rootCountAtEnd,
    sampleCount: dsSamples.length,
  };
}

// ---------------------------------------------------------------------------
// Seed-record native evaluation (t = 0-, all held): anchor + native kappa* fit.
// ---------------------------------------------------------------------------
export function seedRecordEvaluation(sites, histories, seaSites = null, frozenKappa = null) {
  const samples = [];
  for (let i = 0; i < sites.length; i += 1) {
    const xi = rigidPosition(sites[i], 0);
    const vi = rigidVelocity(sites[i], 0);
    const w2 = DECLARED.omega * DECLARED.omega;
    const kin = [-w2 * xi[0], -w2 * xi[1], 0]; // circular need at tabled cadence
    // held-circle need: the seed's OWN prehistory circle (omegaHeld^2 * rho) —
    // the self-consistent convention for a non-circular seed (spec Section 36).
    const wH = sites[i].omegaHeld ?? DECLARED.omega;
    const kinHeld = [-wH * wH * xi[0], -wH * wH * xi[1], 0];
    const ledger = [];
    const { a } = wakeAcceleration({ histories, sites, i, tH: 0, xi, vi, ledger, seaSites });
    samples.push({ site: sites[i].id, layer: sites[i].layer, kin, kinHeld, wake: a, ledger });
  }
  const fitKappa = (key) => {
    let num = 0;
    let den = 0;
    for (const s of samples) {
      for (let c = 0; c < 3; c += 1) {
        num += s[key][c] * s.wake[c];
        den += s.wake[c] * s.wake[c];
      }
    }
    return num / den;
  };
  const residuals = (key, kappa) => {
    const perLayer = {};
    let rA = 0;
    let fA = 0;
    for (const s of samples) {
      let res = 0;
      let ref = 0;
      for (let c = 0; c < 3; c += 1) {
        const d = s[key][c] - kappa * s.wake[c];
        res += d * d;
        ref += s[key][c] * s[key][c];
        rA += d * d;
        fA += s[key][c] * s[key][c];
      }
      // antipodal pair shares the value; keep per-site, summarize per layer
      perLayer[s.site] = Math.sqrt(res / ref);
    }
    return { perSiteRelResidual: perLayer, globalRelResidual: Math.sqrt(rA / fA) };
  };
  const kappaStar = fitKappa("kin");
  const circFitted = residuals("kin", kappaStar);
  // Both seed-record conventions per variant (epicyclic-hunt-handoff.md,
  // diagnostics only; the hunt's primary objective is the released dynamics):
  //  A. fitted-kappa*/circular-need (per-variant refit, tabled-cadence need)
  //  B. frozen-kappa*/held-circle-need (declared frozen coupling, the seed's
  //     own prehistory-circle need)
  const conventionPair = {
    fittedCircularNeed: { kappaStar, globalRelResidual: circFitted.globalRelResidual },
    frozenHeldCircleNeed:
      frozenKappa != null
        ? {
            kappa: frozenKappa,
            globalRelResidual: residuals("kinHeld", frozenKappa).globalRelResidual,
          }
        : null,
  };
  return {
    kappaStar,
    perSiteRelResidual: circFitted.perSiteRelResidual,
    globalRelResidual: circFitted.globalRelResidual,
    conventionPair,
    samples,
  };
}

// ---------------------------------------------------------------------------
// Per-layer force projections (tangential pump/brake rows, radial support).
// ---------------------------------------------------------------------------
function layerProjections(sites, states, wakes, kappa) {
  const rows = {};
  for (let i = 0; i < sites.length; i += 1) {
    const { x } = states[i];
    const rho = Math.hypot(x[0], x[1]);
    if (rho < 1e-12) continue;
    const rHat = [x[0] / rho, x[1] / rho, 0];
    const tHat = [-x[1] / rho, x[0] / rho, 0];
    const f = wakes[i].map((c) => kappa * c);
    const row = {
      tangential: f[0] * tHat[0] + f[1] * tHat[1],
      radial: f[0] * rHat[0] + f[1] * rHat[1],
      axial: f[2],
      cylRadius: rho,
    };
    const L = sites[i].layer;
    if (!rows[L]) rows[L] = { tangential: 0, radial: 0, axial: 0, cylRadius: 0, n: 0 };
    // tangential sign is orientation-shared under the antipodal map; average
    rows[L].tangential += row.tangential / 2;
    rows[L].radial += row.radial / 2;
    rows[L].axial += Math.abs(row.axial) / 2;
    rows[L].cylRadius += row.cylRadius / 2;
    rows[L].n += 1;
  }
  for (const L of Object.keys(rows)) {
    const w2 = DECLARED.omega * DECLARED.omega;
    rows[L].supportRatio = -rows[L].radial / (w2 * rows[L].cylRadius);
  }
  return rows;
}

// ---------------------------------------------------------------------------
// The release integration.
// ---------------------------------------------------------------------------
export function runRelease({
  rotations = DECLARED.runRotations,
  kappa,
  perturb = null,
  recordRotations = [0.25, 0.5, 1, 1.5, 2, 2.5, 3],
  onStep = null,
  maxClickLogEntries = 400,
  resumeState = null,
  budgetMs = Infinity,
} = {}) {
  const sites = buildSites();
  const seaSites = buildSeaSites();
  const dt = DECLARED.timeStep;
  const steps = Math.round((rotations * TWO_PI) / dt);
  let histories;
  let states;
  let diag;
  let records;
  let clickLedger;
  let chartLedger;
  let railCrossings;
  let prevSelfCounts;
  let prevBetaM;
  let halted;
  let startStep;
  let nextRecordIdx;

  if (resumeState) {
    histories = sites.map((s, i) => {
      const h = new RetainedHistory(s);
      h.ts = resumeState.histories[i].ts;
      h.xs = resumeState.histories[i].xs;
      h.vs = resumeState.histories[i].vs;
      h.maxRadiusSeen = resumeState.histories[i].maxRadiusSeen;
      return h;
    });
    states = resumeState.states;
    diag = resumeState.diag;
    records = resumeState.records;
    clickLedger = resumeState.clickLedger;
    chartLedger = resumeState.chartLedger ?? {
      bookedSteps: 0,
      crossingEvents: 0,
      totalBookedTangentialImpulse: 0,
      rows: [],
    };
    railCrossings = resumeState.railCrossings;
    prevSelfCounts = resumeState.prevSelfCounts;
    prevBetaM = resumeState.prevBetaM;
    halted = resumeState.halted;
    startStep = resumeState.step;
    nextRecordIdx = resumeState.nextRecordIdx;
  } else {
    histories = sites.map((s) => new RetainedHistory(s));
    states = sites.map((s) => ({
      x: rigidPosition(s, 0),
      v: rigidVelocity(s, 0),
    }));
    if (perturb) {
      const { siteIndex, tangentialKick } = perturb;
      const st = states[siteIndex];
      const rho = Math.hypot(st.x[0], st.x[1]);
      st.v[0] += (-st.x[1] / rho) * tangentialKick;
      st.v[1] += (st.x[0] / rho) * tangentialKick;
    }
    diag = [];
    records = [];
    clickLedger = { totalTransitions: 0, entries: [] };
    chartLedger = {
      bookedSteps: 0,
      crossingEvents: 0,
      totalBookedTangentialImpulse: 0,
      rows: [],
    };
    railCrossings = [];
    prevSelfCounts = sites.map(() => 0);
    prevBetaM = 1;
    halted = null;
    startStep = 0;
    nextRecordIdx = 0;
  }

  const recordTimes = recordRotations
    .filter((r) => r <= rotations + 1e-9)
    .map((r) => r * TWO_PI);
  const tStart = Date.now();
  let step = startStep;

  for (; step < steps; step += 1) {
    if (Date.now() - tStart > budgetMs) break;
    const t = step * dt;
    // retain the record BEFORE stepping (samples at t)
    for (let i = 0; i < sites.length; i += 1) histories[i].push(t, states[i].x, states[i].v);

    const wantRecord =
      nextRecordIdx < recordTimes.length && t + dt / 2 >= recordTimes[nextRecordIdx];
    const ledgers = wantRecord ? [] : null;

    const wakes = [];
    const selfCounts = [];
    const chartBookings = [];
    for (let i = 0; i < sites.length; i += 1) {
      const ledger = ledgers ? [] : null;
      const { a, aSelf, selfRows, selfRootCount } = wakeAcceleration({
        histories,
        sites,
        i,
        tH: t,
        xi: states[i].x,
        vi: states[i].v,
        ledger,
        splitSelf: DECLARED.chart.enabled,
        seaSites,
      });
      let booking = null;
      if (DECLARED.chart.enabled) {
        // chart-active: fold-flagged same-source row, or the total speed
        // crosses the rail within the provisional step
        const foldFlagged = selfRows.some(
          (row) => Math.abs(row.Ds) < DECLARED.chart.foldJacobianThreshold
        );
        const beta0 = Math.hypot(...states[i].v);
        const vProv = states[i].v.map((vc, c) => vc + kappa * a[c] * dt);
        const beta1 = Math.hypot(...vProv);
        const crossing = (beta0 - 1) * (beta1 - 1) < 0;
        if (foldFlagged || crossing || selfRootCount > 0) {
          const aFrozen = a.map((c, idx) => kappa * (c - aSelf[idx]));
          booking = chartWindowIntegrate({
            histories,
            sites,
            i,
            t0: t,
            dt,
            x0: states[i].x,
            v0: states[i].v,
            aFrozen,
            kappa,
          });
          booking.aFrozen = aFrozen;
          booking.beta0 = beta0;
          booking.crossing = crossing;
          booking.foldFlagged = foldFlagged;
        }
      }
      chartBookings.push(booking);
      // diagnostics see the effective wake (partner + booked self channel)
      if (booking) {
        wakes.push(
          booking.aFrozen.map((c, idx) => c / kappa + booking.dv[idx] / (kappa * dt))
        );
      } else {
        wakes.push(a);
      }
      selfCounts.push(booking ? booking.rootCountAtEnd : selfRootCount);
      if (ledger) ledgers.push(...ledger);
    }

    // chart ledger: booked crossing-window rows (spec Section 3.1 shape)
    for (let i = 0; i < sites.length; i += 1) {
      const booking = chartBookings[i];
      if (!booking) continue;
      chartLedger.bookedSteps += 1;
      const beta = Math.hypot(...states[i].v) || 1;
      const tHat = states[i].v.map((c) => c / beta);
      const tanImpulse =
        booking.dv[0] * tHat[0] + booking.dv[1] * tHat[1] + booking.dv[2] * tHat[2];
      chartLedger.totalBookedTangentialImpulse += tanImpulse;
      if (booking.crossing) {
        chartLedger.crossingEvents += 1;
        if (chartLedger.rows.length < DECLARED.chart.maxClickRows) {
          let witness = null;
          if (chartLedger.rows.length < 8) {
            const rerun = chartWindowIntegrate({
              histories,
              sites,
              i,
              t0: t,
              dt,
              x0: states[i].x,
              v0: states[i].v,
              aFrozen: booking.aFrozen,
              kappa,
              subSteps: DECLARED.chart.witnessSubSteps,
            });
            const base = Math.hypot(...booking.dv);
            witness = {
              subStepsBase: DECLARED.chart.subSteps,
              subStepsWitness: DECLARED.chart.witnessSubSteps,
              relativeSpread:
                base > 0 ? Math.hypot(
                  rerun.dv[0] - booking.dv[0],
                  rerun.dv[1] - booking.dv[1],
                  rerun.dv[2] - booking.dv[2]
                ) / base : 0,
              softeningInKernel: "none_density_of_states_integral",
            };
          }
          chartLedger.rows.push({
            clickId: `chart:${sites[i].id}:${chartLedger.crossingEvents}`,
            site: sites[i].id,
            crossingTime: t,
            betaAtWindowStart: booking.beta0,
            chartImpulse: booking.dv,
            tangentialImpulse: tanImpulse,
            foldChordMin: booking.minChord,
            unfoldingWindowMu: booking.unfoldingWindowMu,
            foldCurvature: booking.foldCurvature,
            orientationProjectionConvention: "single_resolved_branch_chi_1",
            integerRootCountAfter: booking.rootCountAtEnd,
            regularizationIndependenceWitness: witness,
          });
        }
      }
    }

    // click ledger: same-source root-count transitions (integer steps)
    for (let i = 0; i < sites.length; i += 1) {
      if (selfCounts[i] !== prevSelfCounts[i]) {
        clickLedger.totalTransitions += 1;
        if (clickLedger.entries.length < maxClickLogEntries) {
          clickLedger.entries.push({
            time: t,
            site: sites[i].id,
            rootCountBefore: prevSelfCounts[i],
            rootCountAfter: selfCounts[i],
            integerDelta: selfCounts[i] - prevSelfCounts[i],
          });
        }
      }
    }
    prevSelfCounts = selfCounts;

    // rail row
    const betaM =
      (Math.hypot(...states[2].v) + Math.hypot(...states[3].v)) / 2;
    if ((prevBetaM - 1) * (betaM - 1) < 0) {
      railCrossings.push({ time: t, betaBefore: prevBetaM, betaAfter: betaM });
    }
    prevBetaM = betaM;

    // per-step diagnostics
    const layerRows = layerProjections(sites, states, wakes, kappa);
    const shapeDev = sites.map((s, i) => {
      const rp = rigidPosition(s, t);
      return Math.hypot(
        states[i].x[0] - rp[0],
        states[i].x[1] - rp[1],
        states[i].x[2] - rp[2]
      );
    });
    diag.push({
      t,
      betaM,
      betaI: (Math.hypot(...states[0].v) + Math.hypot(...states[1].v)) / 2,
      betaO: (Math.hypot(...states[4].v) + Math.hypot(...states[5].v)) / 2,
      layerRadii: {
        I: (Math.hypot(...states[0].x) + Math.hypot(...states[1].x)) / 2,
        M: (Math.hypot(...states[2].x) + Math.hypot(...states[3].x)) / 2,
        O: (Math.hypot(...states[4].x) + Math.hypot(...states[5].x)) / 2,
      },
      maxShapeDeviation: Math.max(...shapeDev),
      selfRootCounts: selfCounts.slice(),
      layerRows,
      states: null,
    });

    if (wantRecord) {
      records.push({
        recordTime: t,
        rotations: t / TWO_PI,
        rootLedger: ledgers,
        layerRows,
        betaM,
      });
      nextRecordIdx += 1;
    }

    // integrate (semi-implicit Euler; declared dt)
    for (let i = 0; i < sites.length; i += 1) {
      const st = states[i];
      for (let c = 0; c < 3; c += 1) {
        st.v[c] += kappa * wakes[i][c] * dt;
        st.x[c] += st.v[c] * dt;
      }
    }

    // halt conditions (first-blocker discipline)
    for (let i = 0; i < sites.length; i += 1) {
      const st = states[i];
      const r = Math.hypot(...st.x);
      const sp = Math.hypot(...st.v);
      if (!Number.isFinite(r) || !Number.isFinite(sp)) {
        halted = { time: t, reason: "non_finite_state", site: sites[i].id };
        break;
      }
      if (r > DECLARED.haltMaxRadius) {
        halted = { time: t, reason: "shape_loss_radius_runaway", site: sites[i].id, radius: r };
        break;
      }
      if (sp > DECLARED.haltMaxSpeed) {
        halted = { time: t, reason: "speed_runaway", site: sites[i].id, speed: sp };
        break;
      }
    }
    if (halted) break;
    if (onStep && step % 100 === 0) onStep(step, steps, diag[diag.length - 1]);
  }

  const completed = halted != null || step >= steps;
  return {
    sites,
    histories,
    states,
    diag,
    records,
    clickLedger,
    chartLedger,
    railCrossings,
    halted,
    completed,
    state: {
      step,
      steps,
      states,
      histories: histories.map((h) => ({
        ts: h.ts,
        xs: h.xs,
        vs: h.vs,
        maxRadiusSeen: h.maxRadiusSeen,
      })),
      diag,
      records,
      clickLedger,
      chartLedger,
      railCrossings,
      prevSelfCounts,
      prevBetaM,
      halted,
      nextRecordIdx,
    },
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function readCliNumber(name, fallback) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((entry) => entry.startsWith(prefix));
  const v = arg ? Number(arg.slice(prefix.length)) : NaN;
  return Number.isFinite(v) ? v : fallback;
}

function isMain() {
  return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
}

if (isMain()) {
  const outDir = path.join(".tmp", "braid-ideal", "spindle-braid-native-confirmation");
  fs.mkdirSync(outDir, { recursive: true });
  const rotations = readCliNumber("rotations", DECLARED.runRotations);
  const twinRotations = readCliNumber("twin-rotations", DECLARED.twinRotations);
  const budgetMs = readCliNumber("budget-seconds", 33) * 1000;
  const tag = process.argv.find((a) => a.startsWith("--tag="))?.slice(6) ?? "main";
  // Regulator overrides (for the reported regulator-dependence rows only;
  // the declared values above are the run's canonical regulators).
  DECLARED.timeStep = readCliNumber("dt", DECLARED.timeStep);
  DECLARED.coincidenceStratum = readCliNumber("rc", DECLARED.coincidenceStratum);
  DECLARED.sameSourceMinimumDelay = readCliNumber("dmin", DECLARED.sameSourceMinimumDelay);
  DECLARED.soft = readCliNumber("soft", DECLARED.soft);
  DECLARED.chart.enabled = process.argv.includes("--chart");
  DECLARED.sea.enabled = process.argv.includes("--sea");
  DECLARED.sea.spacing = readCliNumber("sea-spacing", DECLARED.sea.spacing);
  DECLARED.epicycle.I = readCliNumber("ei", 0);
  DECLARED.epicycle.M = readCliNumber("em", 0);
  DECLARED.epicycle.O = readCliNumber("eo", 0);
  // Epicyclic-hunt knobs: apsidal phase offsets (degrees) and apsis start.
  DECLARED.apsidalPhase.I = deg(readCliNumber("phi-i", 0));
  DECLARED.apsidalPhase.M = deg(readCliNumber("phi-m", 0));
  DECLARED.apsidalPhase.O = deg(readCliNumber("phi-o", 0));
  const readStart = (name) => {
    const arg = process.argv.find((a) => a.startsWith(`--start-${name}=`));
    const v = arg ? arg.slice(`--start-${name}=`.length) : "apo";
    if (v !== "apo" && v !== "peri") {
      process.stderr.write(`[abort] --start-${name} must be apo|peri, got "${v}"\n`);
      process.exit(1);
    }
    return v;
  };
  DECLARED.apsisStart.I = readStart("i");
  DECLARED.apsisStart.M = readStart("m");
  DECLARED.apsisStart.O = readStart("o");
  const kappaOverride = readCliNumber("kappa", NaN);
  const outName = process.argv.find((a) => a.startsWith("--out="))?.slice(6) ?? "report.json";
  const t0 = Date.now();

  // Seed record: native production-runtime evaluation at t = 0 (all held).
  const sites = buildSites();
  const seedHistories = sites.map((s) => new RetainedHistory(s));
  const seed = seedRecordEvaluation(
    sites,
    seedHistories,
    buildSeaSites(),
    Number.isFinite(kappaOverride) ? kappaOverride : null
  );
  if (Number.isFinite(kappaOverride)) {
    // frozen coupling for cross-variant comparability (declared, no refit)
    seed.kappaStarFitted = seed.kappaStar;
    seed.kappaStar = kappaOverride;
  }
  process.stderr.write(
    `[seed] native kappa*=${seed.kappaStar.toFixed(6)} globalRelResidual=${seed.globalRelResidual.toFixed(6)}\n`
  );
  process.stderr.write(
    `[seed] conventionPair fitted/circular=${seed.conventionPair.fittedCircularNeed.globalRelResidual.toFixed(6)}` +
      (seed.conventionPair.frozenHeldCircleNeed
        ? ` frozen/held-circle=${seed.conventionPair.frozenHeldCircleNeed.globalRelResidual.toFixed(6)}`
        : "") +
      "\n"
  );

  const progress = (step, steps, d) => {
    process.stderr.write(
      `[release:${tag}] step ${step}/${steps} t=${d.t.toFixed(2)} betaM=${d.betaM.toFixed(4)} ` +
        `maxDev=${d.maxShapeDeviation.toFixed(4)} radii I/M/O=` +
        `${d.layerRadii.I.toFixed(3)}/${d.layerRadii.M.toFixed(3)}/${d.layerRadii.O.toFixed(3)}\n`
    );
  };

  // Chunked execution (sandbox calls are wall-clock bounded): main phase, then
  // twin phase, resumable via state files; report assembled when both done.
  const mainStatePath = path.join(outDir, `state-${tag}.json`);
  const twinStatePath = path.join(outDir, `state-${tag}-twin.json`);
  const loadState = (p) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : null);
  const mainPrior = loadState(mainStatePath);
  let main = null;
  if (!mainPrior || mainPrior.step < mainPrior.steps) {
    if (!mainPrior || !mainPrior.halted) {
      main = runRelease({
        rotations,
        kappa: seed.kappaStar,
        onStep: progress,
        resumeState: mainPrior,
        budgetMs,
      });
      fs.writeFileSync(mainStatePath, JSON.stringify(main.state));
      if (!main.completed) {
        process.stderr.write(
          `[chunk] main phase paused at step ${main.state.step}/${main.state.steps}; rerun to resume\n`
        );
        process.exit(0);
      }
    }
  }
  if (!main) {
    // main phase already complete on disk; rehydrate a result-shaped object
    const s = mainPrior;
    main = {
      sites: buildSites(),
      histories: s.histories,
      diag: s.diag,
      records: s.records,
      clickLedger: s.clickLedger,
      chartLedger: s.chartLedger,
      railCrossings: s.railCrossings,
      halted: s.halted,
      completed: true,
      state: s,
    };
  } else {
    main.histories = main.state.histories;
  }

  // Stability row: perturbed twin over the shared window.
  const twinPrior = loadState(twinStatePath);
  let twin = null;
  if (twinRotations > 0 && (!twinPrior || (twinPrior.step < twinPrior.steps && !twinPrior.halted))) {
    twin = runRelease({
      rotations: twinRotations,
      kappa: seed.kappaStar,
      perturb: { siteIndex: 2, tangentialKick: DECLARED.twinPerturbation },
      recordRotations: [],
      resumeState: twinPrior,
      budgetMs: Math.max(1000, budgetMs - (Date.now() - t0)),
    });
    fs.writeFileSync(twinStatePath, JSON.stringify(twin.state));
    if (!twin.completed) {
      process.stderr.write(
        `[chunk] twin phase paused at step ${twin.state.step}/${twin.state.steps}; rerun to resume\n`
      );
      process.exit(0);
    }
    twin = { histories: twin.state.histories, diag: twin.state.diag, halted: twin.state.halted };
  } else if (twinPrior) {
    twin = { histories: twinPrior.histories, diag: twinPrior.diag, halted: twinPrior.halted };
  }

  const twinSep = [];
  if (twin) {
    const nTwin = Math.min(
      twin.histories[0].xs.length,
      main.histories[0].xs.length
    );
    for (let k = 0; k < nTwin; k += 1) {
      let sep = 0;
      for (let i = 0; i < 6; i += 1) {
        const a = main.histories[i];
        const b = twin.histories[i];
        sep = Math.max(
          sep,
          Math.hypot(
            a.xs[k][0] - b.xs[k][0],
            a.xs[k][1] - b.xs[k][1],
            a.xs[k][2] - b.xs[k][2]
          )
        );
      }
      twinSep.push({ t: k * DECLARED.timeStep, separation: sep });
    }
  }

  const thin = (arr, n) => arr.filter((_, k) => k % n === 0);
  const report = {
    schema: SCHEMA,
    handoffPacketRef: HANDOFF_PACKET_REF,
    declared: DECLARED,
    seedRecord: {
      kappaStarNative: seed.kappaStar,
      kappaStarFitted: seed.kappaStarFitted ?? seed.kappaStar,
      globalRelResidualNative: seed.globalRelResidual,
      perSiteRelResidual: seed.perSiteRelResidual,
      conventionPair: seed.conventionPair,
      prescribedEvaluatorAnchor: 0.4721,
      seedRootLedger: seed.samples.map((s) => ({ site: s.site, ledger: s.ledger })),
    },
    release: {
      rotationsRequested: rotations,
      halted: main.halted,
      records: main.records,
      clickLedger: main.clickLedger,
      chartLedger: main.chartLedger ?? null,
      chartMode: DECLARED.chart.enabled,
      railCrossings: main.railCrossings.slice(0, 400),
      railCrossingTotal: main.railCrossings.length,
      diagThinned: thin(main.diag, 10).map((d) => ({
        t: d.t,
        betaI: d.betaI,
        betaM: d.betaM,
        betaO: d.betaO,
        layerRadii: d.layerRadii,
        maxShapeDeviation: d.maxShapeDeviation,
        selfRootCounts: d.selfRootCounts,
        layerRows: d.layerRows,
      })),
    },
    stabilityRow: {
      perturbation: DECLARED.twinPerturbation,
      perturbedSite: "M+",
      separationThinned: thin(twinSep, 10),
    },
    failClosed: FAIL_CLOSED,
    elapsedSeconds: (Date.now() - t0) / 1000,
  };
  fs.writeFileSync(path.join(outDir, outName), JSON.stringify(report, null, 1));
  process.stderr.write(
    `[done] ${report.elapsedSeconds.toFixed(1)}s halted=${JSON.stringify(main.halted)} ` +
      `records=${main.records.length} clicks=${main.clickLedger.totalTransitions}\n`
  );
  process.stdout.write(
    JSON.stringify(
      {
        schema: SCHEMA,
        seed: { kappaStar: seed.kappaStar, globalRelResidual: seed.globalRelResidual },
        halted: main.halted,
        clickCount: main.clickLedger.totalTransitions,
        railCrossingCount: main.railCrossings.length,
        reportPath: path.join(outDir, "report.json"),
        ...FAIL_CLOSED,
      },
      null,
      1
    ) + "\n"
  );
}
