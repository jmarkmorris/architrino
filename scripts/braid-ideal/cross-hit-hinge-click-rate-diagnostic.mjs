// Cross-hit hinge click-rate diagnostic.
//
// Closure goal answered: does the non-coincident cross-hit hinge click train,
// summed over a rotation, reach the certified anti-damping pump Phi_tan ~ 2.9*beta?
//
// The Fold-Crossing Chart Spec (Section 2.5) reduced sufficiency to a per-rotation
// click count N_click, and left N_click as a "hypothesis only the retained-history
// row can supply." This diagnostic supplies a KINEMATIC bound on N_click that needs
// no force ledger, because the click RATE is a property of the frequency content of
// the configuration, not of the interaction law.
//
// Cross-hit hinge birth condition (spec Section 7): a fold between distinct sites
// i != j is born where the source-normal denominator vanishes,
//     D_s,ij = c_f - v_j . rhat_ij = 0    (alignment scalar A_ij := v_j . rhat_ij = c_f).
// A click occurs each time A_ij(T) crosses c_f. N_click per rotation = number of
// such crossings per rotation, summed over directed pairs.
//
// RESULT 1 (rigid single-frequency shell -> N_click = 0). For any configuration in
// which every site shares ONE angular frequency omega (any number of shells, any
// radii, any phases), the whole configuration is a global rigid rotation. Because a
// rotation preserves inner products, A_ij(t) = v_j(t).rhat_ij(t) is EXACTLY constant
// in time. Hence D_s,ij never crosses zero (generic constant != c_f): N_click = 0.
// The single-frequency cross-hit hinge produces NO click train and cannot absorb the
// pump at all. (The measure-zero exception A_ij == c_f is a static sustained hinge,
// not a recurring click.)
//
// RESULT 2 (recurring clicks require >= 2 distinct frequencies). A cross pair with
// receiver on a shell of frequency omega_out and source on a shell of frequency
// omega_in has A_ij periodic in the beat angle (omega_out - omega_in) t. Over one
// outer rotation the beat advances by 2*pi*|1 - omega_in/omega_out| radians, i.e.
// |1 - omega_in/omega_out| beat periods, each contributing up to 2 crossings of any
// straddled level. So per cross pair N_click <= 2*|1 - omega_in/omega_out| per outer
// rotation, and summed over P cross pairs, N_click <~ 2*P*|1 - omega_in/omega_out|.
//
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.

import { fileURLToPath } from "node:url";

export const SCHEMA = "cross_hit_hinge_click_rate_diagnostic.v0";
export const SPEC_PACKET_REF =
  "reference/priorities/braid-archive/braid-ideal/fold-crossing-chart-spec.md";

export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false,
  acceptedSameLevelBranchClaim: false,
  retainedBranch: null,
  scoreMovement: "no_score_increase",
  acceptedSeedPathCertificate: false,
  authority: "priority_only_diagnostic_not_accepted_evidence",
});

const cf = 1;
const C1 = 2.881; // certified pump lower coefficient Phi_tan >= 2.881*beta

// Planar site kinematics: p_k(t) = R_k [cos(w_k t + phi_k), sin(w_k t + phi_k)].
function pos(site, t) {
  const a = site.w * t + site.phi;
  return [site.R * Math.cos(a), site.R * Math.sin(a)];
}
function vel(site, t) {
  const a = site.w * t + site.phi;
  return [-site.R * site.w * Math.sin(a), site.R * site.w * Math.cos(a)];
}
// Alignment scalar A_ij = v_j . rhat_ij, rhat_ij from source j to receiver i.
function alignment(recv, src, t) {
  const pi = pos(recv, t);
  const pj = pos(src, t);
  const d = [pi[0] - pj[0], pi[1] - pj[1]];
  const L = Math.hypot(d[0], d[1]);
  if (L < 1e-12) return null; // coincidence: excluded from the cross-hit count
  const rhat = [d[0] / L, d[1] / L];
  const vj = vel(src, t);
  return { A: vj[0] * rhat[0] + vj[1] * rhat[1], sep: L };
}

// Count crossings of A_ij(T) through the level c_f over one receiver rotation,
// summed over all directed cross pairs (recv != src). Same-frequency pairs are
// included so the rigid-shell result is exercised directly.
export function clickRate(sites, { samples = 20000, wRot = null } = {}) {
  // rotation period set by the slowest declared frequency (the "rotation" clock),
  // unless overridden.
  const wref = wRot ?? Math.min(...sites.map((s) => Math.abs(s.w)).filter((w) => w > 0));
  const tRot = (2 * Math.PI) / wref;
  const dt = tRot / samples;
  let crossings = 0;
  let maxAbsVariation = 0;
  const perPair = [];
  for (let i = 0; i < sites.length; i++) {
    for (let j = 0; j < sites.length; j++) {
      if (i === j) continue;
      let prev = null;
      let pairCross = 0;
      let minA = Infinity;
      let maxA = -Infinity;
      for (let s = 0; s <= samples; s++) {
        const t = s * dt;
        const al = alignment(sites[i], sites[j], t);
        if (al === null) { prev = null; continue; }
        minA = Math.min(minA, al.A);
        maxA = Math.max(maxA, al.A);
        if (prev !== null) {
          const f0 = prev - cf;
          const f1 = al.A - cf;
          if (f0 === 0 || (f0 < 0) !== (f1 < 0)) pairCross += 1;
        }
        prev = al.A;
      }
      maxAbsVariation = Math.max(maxAbsVariation, maxA - minA);
      crossings += pairCross;
      perPair.push({ recv: i, src: j, pairCross, Arange: [minA, maxA] });
    }
  }
  return { nClickPerRotation: crossings, maxAbsVariation, tRot, wref, perPair };
}

// RESULT 1: rigid single-frequency shell (N sites, one omega, one radius).
export function rigidShellClickRate({ N = 6, R = 0.8165, beta = 1.02 } = {}) {
  const w = (beta * cf) / R;
  const sites = Array.from({ length: N }, (_, k) => ({ R, w, phi: (2 * Math.PI * k) / N }));
  const out = clickRate(sites);
  return {
    N, R, beta, omega: w,
    nClickPerRotation: out.nClickPerRotation,
    alignmentIsTimeConstant: out.maxAbsVariation < 1e-9,
    maxAbsVariation: out.maxAbsVariation,
    note: "single-frequency (rigid) => A_ij exactly constant => no click train",
  };
}

// Rigid MULTI-shell but ONE common frequency: still a global rigid rotation.
export function rigidMultiShellClickRate({ beta = 1.02, radii = [0.5, 0.8165, 1.1] } = {}) {
  // one common omega chosen from the outer rim fraction on the largest radius
  const Rmax = Math.max(...radii);
  const w = (beta * cf) / Rmax;
  const sites = [];
  radii.forEach((R, s) => {
    for (let k = 0; k < 3; k++) sites.push({ R, w, phi: (2 * Math.PI * k) / 3 + s * 0.3 });
  });
  const out = clickRate(sites);
  return {
    radii, commonOmega: w,
    nClickPerRotation: out.nClickPerRotation,
    alignmentIsTimeConstant: out.maxAbsVariation < 1e-9,
    maxAbsVariation: out.maxAbsVariation,
    note: "any single common omega (even multi-radius) => rigid => N_click = 0",
  };
}

// RESULT 2: two distinct frequencies (inner shell + outer shell). Count clicks
// per OUTER rotation as a function of the frequency ratio.
export function twoFrequencyClickRate({ beta = 1.05, Rout = 1.0, Rin = 0.45, ratio = 3 } = {}) {
  const wout = (beta * cf) / Rout;
  const win = ratio * wout;
  const sites = [];
  for (let k = 0; k < 3; k++) sites.push({ R: Rout, w: wout, phi: (2 * Math.PI * k) / 3, shell: "out" });
  for (let k = 0; k < 3; k++) sites.push({ R: Rin, w: win, phi: (2 * Math.PI * k) / 3 + 0.2, shell: "in" });
  const out = clickRate(sites, { wRot: wout });
  const beats = Math.abs(1 - win / wout); // beat periods per outer rotation
  return {
    beta, Rout, Rin, ratio, wout, win,
    nClickPerRotation: out.nClickPerRotation,
    beatPeriodsPerRotation: beats,
    note: "N_click grows with |1 - w_in/w_out|; single-frequency limit ratio->1 gives few/zero clicks",
  };
}

// Absorber verdict: combine the kinematic N_click bound with the spec Section 2.4/2.5
// per-click and pump-per-rotation to get the required internal frequency ratio.
export function absorberVerdict({ beta = 0.98, R = 0.8165, kappa = 1, crossPairs = 6 } = {}) {
  // spec Section 2.5: pump-per-rotation in rim fraction is beta-independent
  const pumpPerRotation = (2 * Math.PI * C1 * kappa) / (cf * cf * R); // = 22.17 at ref
  // spec Section 2.4: geometric per-click estimate in rim fraction
  const dBetaClick = kappa / (beta * cf * cf * R);
  const nClickRequired = pumpPerRotation / dBetaClick; // = 2*pi*C1*beta
  // Result 2 bound: N_click <~ 2 * crossPairs * |1 - w_in/w_out|
  const beatsRequired = nClickRequired / (2 * crossPairs);
  const freqRatioRequired = 1 + beatsRequired; // w_in/w_out >= 1 + beatsRequired
  return {
    beta, R, kappa, crossPairs,
    pumpPerRotation,
    dBetaClick,
    nClickRequired,
    beatsRequired,
    internalFrequencyRatioRequired: freqRatioRequired,
    singleFrequencyVerdict: "closed_negative_N_click_is_zero",
    multiFrequencyVerdict:
      "open_contingent_on_internal_frequency_ratio_at_least_" +
      freqRatioRequired.toFixed(2) + "_and_amplitude_straddling_c_f",
    note: "single-frequency braid cannot absorb the pump; multi-frequency route needs a fast inner shell",
  };
}

export function diagnosticReport() {
  const rigid = rigidShellClickRate({});
  const rigidMulti = rigidMultiShellClickRate({});
  const twoFreqLow = twoFrequencyClickRate({ ratio: 1.5 });
  const twoFreqHigh = twoFrequencyClickRate({ ratio: 6 });
  const verdict = absorberVerdict({});
  return {
    schema: SCHEMA,
    specPacketRef: SPEC_PACKET_REF,
    result1_rigidSingleFrequency: rigid,
    result1b_rigidMultiShellOneFrequency: rigidMulti,
    result2_twoFrequencyLowRatio: twoFreqLow,
    result2_twoFrequencyHighRatio: twoFreqHigh,
    absorberVerdict: verdict,
    ...FAIL_CLOSED,
  };
}

function isMain() {
  return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
}
if (isMain()) {
  const pretty = process.argv.includes("--pretty");
  process.stdout.write(JSON.stringify(diagnosticReport(), null, pretty ? 2 : 0) + "\n");
}
