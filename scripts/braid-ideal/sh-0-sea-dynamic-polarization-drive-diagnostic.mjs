#!/usr/bin/env node

// SH-0-sea dynamic (AC) induced-polarization drive diagnostic (braid-ideal lane).
//
// Purpose: decide the TANGENTIAL absorber question for induced sea orientational
// polarization - the dynamic linear response the static relaxation diagnostic
// (sh-0-sea-induced-polarization-diagnostic.mjs) cannot compute. The static diagnostic
// holds the central braid fixed and relaxes neighbor orientations to an energy
// equilibrium; it decided the RADIAL retention question (result: anti-retentive). This
// diagnostic instead lets the central braid ROTATE on the axis-neutral channel and asks
// whether the phase-lagged neighbor orientational response drains the certified
// tangential pump 2.881*beta .. 2.925*beta.
//
// Key structural facts (derivation, witnessed here):
//   1. The rotating central braid is C3-symmetric about n_hat=(1,1,1)/sqrt3, so the wake
//      it presents at any fixed neighbor is 2*pi/3-periodic in the rotation phase: the
//      orientational drive torque on a neighbor has ONLY threefold harmonics m=3,6,9,...
//      (m=1,2,4,5,... vanish exactly). The axial dipole p=2(1,1,1) is parallel to the
//      rotation axis and does not rotate, so it supplies no AC drive; the lowest drive is
//      the m=3 harmonic of the higher multipole content.
//   2. Unlike the static sea's orientation torque c0 (which is odd about the C3-symmetric
//      phases and does exactly zero cyclic work - see Corollary S), a phase-lagged
//      orientational response does nonzero cyclic work. The cyclic-averaged dissipated
//      power P = (1/2) sum_m (m*omega) chi''(m*omega) sum_k |tau_k^(m)|^2 >= 0 is drained
//      from the central rotation: the dynamic induced polarization is the first sea
//      tangential channel with a sign-definite ABSORPTIVE cyclic effect.
//   3. That power maps to an effective per-site tangential damping coefficient
//      Phi_ind = P / (6 * v_t), whose ratio to chi'' is a computable geometric prefactor.
//      Absorbing the pump requires chi''(3*omega) >= Phi_pump / (Phi_ind/chi''), a
//      computed threshold on the neighbor orientational AC susceptibility.
//
// Claim level: diagnostic only. No retained-branch claim, no accepted-evidence claim, no
// stability claim. chi'' (the neighbor braid orientational AC susceptibility) is an
// internal-braid property this fixed-source diagnostic cannot fix; the diagnostic computes
// the drive and the threshold, and compares the threshold against the cluster orientational
// stiffness the static relaxation exhibits. Every output fails closed at the seed-path
// certificate. free_amplitude_parameter_count stays 0: chi'' is a reported threshold, never
// a fitted amplitude scaling any row.
//
// See reference/priorities/braid-archive/braid-ideal/sh-0-sea-diagnostic-candidate-model.md
// (Dynamic Induced Polarization) and the Corollary S non-absorber decision in
// reference/priorities/braid-archive/braid-ideal/delayed-escape-certificate-lemma-proof-packet.md.

import { fileURLToPath } from "node:url";

import {
  ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
  FCC_BRAID_UNIT_SITES,
  FCC_NEAREST_NEIGHBOR_DIRECTIONS,
  MIN_NON_OVERLAP_A_FCC,
  buildFailClosedAuthorization,
} from "./sh-0-sea-diagnostic-candidate-model.mjs";

export const SCHEMA = "sh_0_sea_dynamic_polarization_drive_diagnostic.v0";
export const CANDIDATE_A_FCC = 4.25;
export const FIELD_SPEED = 1;
// The certified pump lower slope (Corollary S / interval certificate). Reported for the
// threshold comparison only; no cross-chart ledger value is consumed.
export const CERTIFIED_PUMP_C1 = 2.881;
// Rim radius of a unit octahedral site about n_hat: |n_hat x u| = sqrt(1 - 1/3).
const RIM_RADIUS = Math.sqrt(2 / 3);

const NHAT = [1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)];

const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const mul = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const norm = (a) => Math.hypot(...a);

function rotate(v, k, theta) {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  return add(add(mul(v, c), mul(cross(k, v), s)), mul(k, dot(k, v) * (1 - c)));
}

function centralSites() {
  return FCC_BRAID_UNIT_SITES.map((site) => ({ p: [...site.position], q: site.q }));
}

function braidDipole() {
  return centralSites().reduce(
    (sum, s) => [sum[0] + s.q * s.p[0], sum[1] + s.q * s.p[1], sum[2] + s.q * s.p[2]],
    [0, 0, 0]
  );
}

// Delayed field at a static neighbor point X from the rotating central braid at phase phi0
// (rim fraction beta). Causal roots solved per source by fixed-point iteration on
// tau = |X - x_src(t - tau)| / c_f. Instantaneous field when delayed=false.
function fieldAt(X, phi0, beta, delayed) {
  const omega = beta / RIM_RADIUS;
  let E = [0, 0, 0];
  for (const s of centralSites()) {
    let src = rotate(s.p, NHAT, phi0);
    if (delayed) {
      let tau = norm(sub(X, src));
      for (let it = 0; it < 80; it += 1) {
        src = rotate(s.p, NHAT, phi0 - omega * tau);
        tau = norm(sub(X, src)) / FIELD_SPEED;
      }
    }
    const d = sub(X, src);
    const r = norm(d);
    E = add(E, mul(d, s.q / (r * r * r)));
  }
  return E;
}

// Torque harmonics of tau(phi) = p_neighbor x E(X, phi) summed over the 12 neighbors:
// returns |sum_k tau_k^(m)|^2 aggregated as sum_k |tau_k^(m)|^2 for m = 0..maxM.
export function torqueHarmonics({ aFcc = CANDIDATE_A_FCC, beta, delayed = true, samples = 1440, maxM = 9 } = {}) {
  const p = braidDipole();
  const perM = Array.from({ length: maxM + 1 }, () => 0);
  for (const dir of FCC_NEAREST_NEIGHBOR_DIRECTIONS) {
    const X = [(dir[0] * aFcc) / 2, (dir[1] * aFcc) / 2, (dir[2] * aFcc) / 2];
    const cos = Array.from({ length: maxM + 1 }, () => [0, 0, 0]);
    const sin = Array.from({ length: maxM + 1 }, () => [0, 0, 0]);
    for (let i = 0; i < samples; i += 1) {
      const phi = (2 * Math.PI * i) / samples;
      const tau = cross(p, fieldAt(X, phi, beta, delayed));
      for (let m = 0; m <= maxM; m += 1) {
        const c = Math.cos(m * phi);
        const s = Math.sin(m * phi);
        for (let j = 0; j < 3; j += 1) {
          cos[m][j] += tau[j] * c;
          sin[m][j] += tau[j] * s;
        }
      }
    }
    for (let m = 0; m <= maxM; m += 1) {
      const scale = m === 0 ? 1 / samples : 2 / samples;
      const a = cos[m].map((x) => x * scale);
      const b = sin[m].map((x) => x * scale);
      perM[m] += norm(a) ** 2 + (m === 0 ? 0 : norm(b) ** 2);
    }
  }
  return perM; // perM[m] = sum_k |tau_k^(m)|^2
}

// Full diagnostic at one beta: drive harmonics, damping prefactor Phi_ind/chi'', and the
// chi'' threshold to beat the certified pump.
export function evaluateBeta({ aFcc = CANDIDATE_A_FCC, beta, delayed = true } = {}) {
  const harmonics = torqueHarmonics({ aFcc, beta, delayed });
  const omega = beta / RIM_RADIUS;
  // dissipated power per unit chi'' from the dominant m=3 drive (m=6,9 negligible but
  // included): P/chi'' = (1/2) sum_{m>=3} (m*omega) * harmonics[m], evaluating chi'' at 3*omega
  // as the representative response frequency (m=6,9 contributions are < 1e-5 of m=3).
  const driveSum3 = harmonics[3];
  const powerPerChi = 0.5 * 3 * omega * harmonics[3]
    + 0.5 * 6 * omega * harmonics[6]
    + 0.5 * 9 * omega * harmonics[9];
  const phiIndPerChi = powerPerChi / (6 * beta); // per-site tangential damping coeff / chi''
  const pump = CERTIFIED_PUMP_C1 * beta;
  const chiThreshold = pump / phiIndPerChi;
  const stiffnessThreshold = 1 / (2 * chiThreshold); // overdamped chi''_max = 1/(2K)
  return {
    beta,
    a_fcc: aFcc,
    delayed,
    threefold_only: {
      statement: "C3 symmetry => only m=0,3,6,9 harmonics nonzero; m=1,2,4,5,7,8 vanish",
      m1_over_m3: harmonics[3] > 0 ? Math.sqrt(harmonics[1] / harmonics[3]) : null,
      m2_over_m3: harmonics[3] > 0 ? Math.sqrt(harmonics[2] / harmonics[3]) : null,
    },
    drive_harmonics_sumSq: {
      m0_static_torque: harmonics[0],
      m3_leading_ac_drive: driveSum3,
      m6: harmonics[6],
      m9: harmonics[9],
    },
    omega,
    phi_ind_per_chi: phiIndPerChi,
    pump_c1_beta: pump,
    chi_second_threshold_to_beat_pump: chiThreshold,
    orientational_stiffness_threshold_K: stiffnessThreshold,
  };
}

export function run({ aFcc = CANDIDATE_A_FCC, betas = [0.1, 0.25, 0.5, 0.75, 0.9], delayed = true } = {}) {
  const rows = betas.map((beta) => evaluateBeta({ aFcc, beta, delayed }));
  // Cluster orientational stiffness the static relaxation exhibits: aligned/antiphase
  // torques ~0.58..1.47 over O(1) radians => K ~ O(0.3-0.5), chi''_max = 1/(2K) ~ 1-1.7.
  const clusterStiffnessEstimate = { K_low: 0.3, K_high: 0.5, chi_max_low: 1.0, chi_max_high: 1.7 };
  const maxThresholdK = Math.max(...rows.map((r) => r.orientational_stiffness_threshold_K));
  // sufficiency requires K below threshold AND resonance tuning gamma ~ K/(3 omega)
  const clusterSufficient = clusterStiffnessEstimate.K_high <= maxThresholdK;
  const shortfallFactor =
    Math.min(...rows.map((r) => r.chi_second_threshold_to_beat_pump)) / clusterStiffnessEstimate.chi_max_high;
  return {
    schema: SCHEMA,
    claim_level: "priority_only_diagnostic_not_retained_branch_evidence",
    candidate_a_fcc: aFcc,
    kernel: { field_speed: FIELD_SPEED, coupling: 1, softening: 0, weights: "orientational_torque_p_cross_E" },
    channel: "octahedral_seed_rotating_about_(1,1,1)_over_static_fcc_shell_ac_drive",
    free_amplitude_parameter_count: 0,
    derivation_summary:
      "dynamic induced polarization is the first sea tangential channel with nonzero cyclic work and sign-definite absorptive damping; drive is the m=3 (threefold) harmonic; Phi_ind = (0.03-0.16) chi''(3 omega); absorbing the pump needs chi'' >= threshold below",
    rows,
    cluster_stiffness_estimate: clusterStiffnessEstimate,
    max_stiffness_threshold_K: maxThresholdK,
    cluster_stiffness_sufficient_for_absorption: clusterSufficient,
    shortfall_factor_chi_threshold_over_cluster_chi_max: shortfallFactor,
    disposition: clusterSufficient
      ? "dynamic_induced_polarization_could_absorb_at_cluster_stiffness"
      : "dynamic_induced_polarization_absorptive_but_insufficient_at_cluster_stiffness",
    open_quantity: "neighbor_braid_orientational_ac_susceptibility_chi_second_at_3_omega",
    resolving_diagnostic:
      "retained-history dynamic-braid orientational susceptibility computation (a soft near-Goldstone orientation mode with K <~ 0.03-0.06 and resonance tuning gamma ~ K/(3 omega) would be required)",
    accepted_evidence_blocker: {
      object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
      field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
    },
    min_non_overlap_a_fcc: MIN_NON_OVERLAP_A_FCC,
    authorization: buildFailClosedAuthorization(),
    retainedBranchClaim: false,
    acceptedSameLevelBranchClaim: false,
    scoreMovement: "no_score_increase",
  };
}

function runCli() {
  const pretty = process.argv.includes("--pretty");
  console.log(JSON.stringify(run(), null, pretty ? 2 : 0));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) runCli();
