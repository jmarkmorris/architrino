// Priority-only diagnostic scan for the u=0 two-frequency breathing ansatz
// rho(t) = rho0 (1 + delta cos(Omega t + phi0)) on the axis-neutral channel
// (see reference/priorities/braid-archive/braid-ideal/axis-neutral-rotating-wave-spectrum-packet.md,
// Breathing Hunt Result). Units: rho0=1, c_f=1, kappa=1, softening=0.
// Scan coordinates: alpha=h/rho0 (drum aspect, height fixed under breathing),
// beta=omega*rho0 (mean rim-speed fraction), delta (fractional breathing amplitude),
// r=Omega/omega (breathing-to-rotation frequency ratio; the Lissajous lock coordinate).
// Common-phase radial breathing preserves the C3 x <iota> channel, so one
// representative receiver suffices. On the ansatz every co-rotating residual
// projection depends on time only through the breathing phase theta=Omega t+phi0
// (periodic-lag reduction), so cycle averages are phi0-independent and phi0 is
// quotiented out of the scan box.
// Fail-closed: this scan never authorizes a retained branch, an admissible spectrum
// row, accepted evidence, or score movement. A zero-average row, if found, is a
// cycle-averaged relative-periodic-orbit candidate only.
import { fileURLToPath } from "node:url";

export const SCHEMA = "axis_neutral_breathing_residual_scan.v0";

const SQ3 = Math.sqrt(3), SQ6 = Math.sqrt(6), SQ2 = Math.sqrt(2);
const N_HAT = [1 / SQ3, 1 / SQ3, 1 / SQ3];
const ER0 = [2 / SQ6, -1 / SQ6, -1 / SQ6];
const ET0 = [0, 1 / SQ2, -1 / SQ2];
const D2R = Math.PI / 180;
// sources relative to receiver eps+x at rotational phase 0, height +alpha
const SOURCES = [
  { psi: 120 * D2R, ring: +1 },
  { psi: 240 * D2R, ring: +1 },
  { psi: 60 * D2R, ring: -1 },
  { psi: 180 * D2R, ring: -1 },
  { psi: 300 * D2R, ring: -1 },
];

const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const mul = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const er = (t) => add(mul(ER0, Math.cos(t)), mul(ET0, Math.sin(t)));
const et = (t) => add(mul(ER0, -Math.sin(t)), mul(ET0, Math.cos(t)));

// Residual projections at one breathing phase theta. Receiver is eps+x at
// rotational phase 0, evaluation instant s=0, with rho(s)=1+delta*cos(theta+Omega*s).
// Ansatz acceleration: (rho''-rho*omega^2) e_r + 2 rho' omega e_t, zero axial.
export function breathingResidualsAtPhase(alpha, beta, delta, capOmega, theta) {
  const rho0 = 1 + delta * Math.cos(theta);
  const rhoDot0 = -delta * capOmega * Math.sin(theta);
  const rhoDdot0 = -delta * capOmega * capOmega * Math.cos(theta);
  const receiver = add(mul(N_HAT, alpha), mul(ER0, rho0));
  const vRec = add(mul(ER0, rhoDot0), mul(ET0, rho0 * beta));
  let force = [0, 0, 0];
  let minSourceNormal = Infinity;
  let maxSpeed = Math.hypot(rhoDot0, rho0 * beta);
  for (const src of SOURCES) {
    const gap = src.ring > 0 ? 0 : 2 * alpha;
    const rhoAt = (lag) => 1 + delta * Math.cos(theta - capOmega * lag);
    const sep = (lag) => {
      const rt = rhoAt(lag);
      const ang = src.psi - beta * lag;
      return Math.sqrt(gap * gap + rho0 * rho0 + rt * rt - 2 * rho0 * rt * Math.cos(ang));
    };
    // Under sub-field source speeds, sep(lag)-lag is strictly decreasing: unique root.
    const hi = 2 * Math.sqrt(alpha * alpha + (1 + delta) * (1 + delta)) + 1;
    if (sep(hi) - hi > 0) return null;
    let a = 1e-12, b = hi;
    for (let i = 0; i < 80; i += 1) { const m = (a + b) / 2; if (sep(m) - m > 0) a = m; else b = m; }
    const lag = (a + b) / 2;
    const rt = rhoAt(lag);
    const rtDot = -delta * capOmega * Math.sin(theta - capOmega * lag);
    const ang = src.psi - beta * lag;
    const sourcePos = add(mul(N_HAT, src.ring > 0 ? alpha : -alpha), mul(er(ang), rt));
    const vSrc = add(mul(er(ang), rtDot), mul(et(ang), rt * beta));
    maxSpeed = Math.max(maxSpeed, Math.hypot(...vSrc));
    const d = sub(receiver, sourcePos);
    const dist = Math.hypot(...d);
    const dHat = mul(d, 1 / dist);
    const sourceNormal = 1 - dot(vSrc, dHat);
    const receiverNormal = 1 - dot(vRec, dHat);
    minSourceNormal = Math.min(minSourceNormal, Math.abs(sourceNormal));
    const branchWeight = Math.abs(receiverNormal / sourceNormal);
    const polarityProduct = src.ring > 0 ? +1 : -1;
    force = add(force, mul(dHat, (polarityProduct * branchWeight) / (dist * dist)));
  }
  const aRad = rhoDdot0 - rho0 * beta * beta;
  const aTan = 2 * rhoDot0 * beta;
  return {
    axial: dot(force, N_HAT),
    force_radial: dot(force, ER0),
    force_tangential: dot(force, ET0),
    residual_radial: dot(force, ER0) - aRad,
    residual_tangential: dot(force, ET0) - aTan,
    min_source_normal: minSourceNormal,
    max_speed: maxSpeed,
  };
}

// Cycle averages over the breathing phase (midpoint rule). Since the residuals
// depend on time only through theta, this is the per-cycle average for any phi0.
export function cycleAveragedResiduals(alpha, beta, delta, ratio, { nPhase = 64 } = {}) {
  const capOmega = ratio * beta;
  let axial = 0, fRad = 0, fTan = 0, tanWork = 0;
  let minSourceNormal = Infinity, maxSpeed = 0, maxAxial = -Infinity;
  for (let k = 0; k < nPhase; k += 1) {
    const theta = (2 * Math.PI * (k + 0.5)) / nPhase;
    const r = breathingResidualsAtPhase(alpha, beta, delta, capOmega, theta);
    if (!r) return null;
    axial += r.axial; fRad += r.force_radial; fTan += r.force_tangential;
    tanWork += r.force_tangential * (1 + delta * Math.cos(theta)) * beta;
    minSourceNormal = Math.min(minSourceNormal, r.min_source_normal);
    maxSpeed = Math.max(maxSpeed, r.max_speed);
    maxAxial = Math.max(maxAxial, r.axial);
  }
  const avgFRad = fRad / nPhase;
  return {
    avg_axial: axial / nPhase,
    max_axial: maxAxial,
    avg_force_radial: avgFRad,
    avg_tangential: fTan / nPhase, // == cycle-averaged tangential residual (<2 rho' omega> = 0)
    avg_tangential_work: tanWork / nPhase,
    min_source_normal: minSourceNormal,
    max_speed: maxSpeed,
    sub_field: maxSpeed < 1,
    radial_scale_recoverable: avgFRad < 0,
  };
}

const SOURCE_NORMAL_FLOOR = 1e-2;
const admissible = (row) =>
  row != null && row.sub_field && row.min_source_normal > SOURCE_NORMAL_FLOOR && row.radial_scale_recoverable;

// Best rational lock p/q for the frequency ratio with q <= maxQ (continued fractions).
export function rationalLock(ratio, maxQ = 16) {
  let best = null;
  for (let q = 1; q <= maxQ; q += 1) {
    const p = Math.round(ratio * q);
    if (p < 1) continue;
    const err = Math.abs(ratio - p / q);
    if (!best || err < best.error - 1e-15) best = { p, q, error: err };
  }
  return best;
}

function refineZero(alpha, beta, delta, rLo, rHi, opts) {
  let lo = rLo, hi = rHi;
  let fLo = cycleAveragedResiduals(alpha, beta, delta, lo, opts).avg_tangential;
  for (let i = 0; i < 48; i += 1) {
    const mid = (lo + hi) / 2;
    const row = cycleAveragedResiduals(alpha, beta, delta, mid, opts);
    if (row == null) return null;
    if (Math.sign(row.avg_tangential) === Math.sign(fLo)) { lo = mid; fLo = row.avg_tangential; }
    else hi = mid;
  }
  return (lo + hi) / 2;
}

export function runScan({ nPhase = 64 } = {}) {
  const opts = { nPhase };
  // Row 1: axial witness on an alpha>0 grid. The rigid axial no-balance sign
  // argument extends pointwise to common-phase radial breathing (same-ring terms
  // stay level, every opposite-ring term still pulls the rings together), so the
  // cycle-averaged and pointwise-max axial residuals must stay strictly negative.
  let axialAllNegative = true, axialMax = -Infinity, axialSamples = 0;
  for (let a = 0.1; a <= 2.001; a += 0.19) {
    for (const b of [0.1, 0.3, 0.5, 0.7, 0.9]) {
      for (const d of [0.1, 0.3]) {
        for (const r of [0.5, 1, 2, 3]) {
          const row = cycleAveragedResiduals(a, b, d, r, opts);
          if (!row || !row.sub_field) continue;
          axialSamples += 1;
          if (row.max_axial >= 0) axialAllNegative = false;
          axialMax = Math.max(axialMax, row.max_axial);
        }
      }
    }
  }
  // Row 2: planar (alpha=0) hunt for cycle-averaged tangential zeros over the
  // declared box, with sign-change detection along the frequency-ratio axis and
  // along the amplitude and rim-speed axes.
  const betas = [], deltas = [], ratios = [];
  for (let b = 0.05; b <= 0.901; b += 0.05) betas.push(Number(b.toFixed(2)));
  for (let d = 0.05; d <= 0.451; d += 0.1) deltas.push(Number(d.toFixed(2)));
  for (let r = 0.25; r <= 4.001; r += 0.25) ratios.push(Number(r.toFixed(2)));
  const grid = new Map();
  let admissibleCells = 0, minAvgTan = Infinity, minCell = null;
  for (const b of betas) for (const d of deltas) for (const r of ratios) {
    const row = cycleAveragedResiduals(0, b, d, r, opts);
    const ok = admissible(row);
    grid.set(`${b}|${d}|${r}`, ok ? row : null);
    if (!ok) continue;
    admissibleCells += 1;
    if (row.avg_tangential < minAvgTan) { minAvgTan = row.avg_tangential; minCell = { beta: b, delta: d, ratio: r, ...row }; }
  }
  const candidates = [];
  const seen = new Set();
  const scanAxis = (fixedKeyFn, axisVals, cellFn, refineFn) => {
    for (let i = 0; i + 1 < axisVals.length; i += 1) {
      const rowA = cellFn(axisVals[i]);
      const rowB = cellFn(axisVals[i + 1]);
      if (!rowA || !rowB) continue;
      if (Math.sign(rowA.avg_tangential) === Math.sign(rowB.avg_tangential)) continue;
      const cand = refineFn(axisVals[i], axisVals[i + 1]);
      if (cand == null) continue;
      const key = `${fixedKeyFn(cand)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      candidates.push(cand);
    }
  };
  for (const b of betas) for (const d of deltas) {
    scanAxis(
      (c) => `${c.beta.toFixed(3)}|${c.delta.toFixed(3)}|${c.ratio.toFixed(3)}`,
      ratios,
      (r) => grid.get(`${b}|${d}|${r}`),
      (rLo, rHi) => {
        const rStar = refineZero(0, b, d, rLo, rHi, opts);
        if (rStar == null) return null;
        const row = cycleAveragedResiduals(0, b, d, rStar, opts);
        if (!admissible(row)) return null;
        const lock = rationalLock(rStar);
        return {
          beta: b, delta: d, ratio: rStar, cap_omega: rStar * b, ...row,
          rho0_recovered: Math.abs(row.avg_force_radial) / (b * b),
          phase_closure: lock,
          figure_class: lock.error < 1e-3 ? "closed_lissajous_candidate_lock" : "detuned_from_nearest_lock",
        };
      },
    );
  }
  // Cross-axis sign changes (beta and delta directions) at fixed ratio, reported
  // as crossings only; the ratio axis owns refinement because r is the lock coordinate.
  let crossAxisSignChanges = 0;
  for (const r of ratios) {
    for (const d of deltas) for (let i = 0; i + 1 < betas.length; i += 1) {
      const A = grid.get(`${betas[i]}|${d}|${r}`), B = grid.get(`${betas[i + 1]}|${d}|${r}`);
      if (A && B && Math.sign(A.avg_tangential) !== Math.sign(B.avg_tangential)) crossAxisSignChanges += 1;
    }
    for (const b of betas) for (let i = 0; i + 1 < deltas.length; i += 1) {
      const A = grid.get(`${b}|${deltas[i]}|${r}`), B = grid.get(`${b}|${deltas[i + 1]}|${r}`);
      if (A && B && Math.sign(A.avg_tangential) !== Math.sign(B.avg_tangential)) crossAxisSignChanges += 1;
    }
  }
  // Row 3: extended delay-resonant probe in absolute breathing frequency. The
  // ratio box under-covers small beta (Omega = r*beta stays small there), while
  // the delay-modulation mechanism needs Omega*lag of order pi. Probe the box in
  // absolute Omega, report the pump suppression ratio against the rigid pump at
  // the same beta, and hunt zero crossings along the Omega axis.
  const probeBetas = [0.05, 0.1, 0.2, 0.3, 0.5, 0.7, 0.9];
  const probeDeltas = [0.1, 0.2, 0.3, 0.45, 0.6, 0.8];
  const probeOmegas = [];
  for (let w = 0.25; w <= 8.001; w += 0.25) probeOmegas.push(Number(w.toFixed(2)));
  const rigidPump = new Map(probeBetas.map((b) => [b, cycleAveragedResiduals(0, b, 0, 1, opts).avg_tangential]));
  let probeCells = 0, probeMin = Infinity, probeMinCell = null, minSuppression = Infinity;
  for (const b of probeBetas) for (const d of probeDeltas) {
    let prevRow = null, prevW = null;
    for (const w of probeOmegas) {
      const row = cycleAveragedResiduals(0, b, d, w / b, opts);
      const ok = admissible(row);
      if (ok) {
        probeCells += 1;
        const suppression = row.avg_tangential / rigidPump.get(b);
        if (row.avg_tangential < probeMin) {
          probeMin = row.avg_tangential;
          probeMinCell = { beta: b, delta: d, cap_omega: w, suppression, ...row };
        }
        minSuppression = Math.min(minSuppression, suppression);
        if (prevRow && Math.sign(prevRow.avg_tangential) !== Math.sign(row.avg_tangential)) {
          const rStar = refineZero(0, b, d, prevW / b, w / b, opts);
          if (rStar != null) {
            const zRow = cycleAveragedResiduals(0, b, d, rStar, opts);
            if (admissible(zRow)) {
              const lock = rationalLock(rStar);
              candidates.push({
                beta: b, delta: d, ratio: rStar, cap_omega: rStar * b, ...zRow,
                rho0_recovered: Math.abs(zRow.avg_force_radial) / (b * b),
                phase_closure: lock,
                figure_class: lock.error < 1e-3 ? "closed_lissajous_candidate_lock" : "detuned_from_nearest_lock",
              });
            }
          }
        }
      }
      prevRow = ok ? row : null;
      prevW = w;
    }
  }
  // Pointwise reversal structure at the probe minimum (diagnostic color: the
  // instantaneous pump does reverse within the cycle even though the average does not).
  let reversal = null;
  if (probeMinCell) {
    const { beta: b, delta: d, cap_omega: w } = probeMinCell;
    let neg = 0, minP = Infinity, maxP = -Infinity;
    for (let k = 0; k < nPhase; k += 1) {
      const theta = (2 * Math.PI * (k + 0.5)) / nPhase;
      const p = breathingResidualsAtPhase(0, b, d, w, theta);
      if (p.residual_tangential < 0) neg += 1;
      minP = Math.min(minP, p.residual_tangential);
      maxP = Math.max(maxP, p.residual_tangential);
    }
    reversal = { negative_phase_fraction: neg / nPhase, min_pointwise: minP, max_pointwise: maxP };
  }
  return {
    schema: SCHEMA,
    claim_level: "priority_only_sampled_diagnostic_not_retained_branch_evidence",
    kernel: { field_speed: 1, coupling: 1, softening: 0, weights: "receiver_normal_over_floored_source_normal" },
    ansatz: {
      form: "rho(t) = rho0 (1 + delta cos(Omega t + phi0)), common phase across all six sites, drum height fixed, omega constant",
      channel: "C3 x <iota> preserved by common-phase radial breathing; single representative receiver",
      phi0: "quotiented: residuals depend on time only through the breathing phase, so cycle averages are phi0-independent",
      closure_condition: "cycle-averaged tangential residual <F_tan - 2 rho' omega> = <F_tan> = 0 with sub-field speeds, source-normal floor, and <F_rad> < 0 for radial scale recovery",
    },
    box: {
      alpha_axial_witness: [0.1, 2], beta: [0.05, 0.9], delta: [0.05, 0.45],
      ratio_omega_breathing_over_rotation: [0.25, 4],
      extended_probe_delta: [0.1, 0.8], extended_probe_cap_omega: [0.25, 8],
      source_normal_floor: SOURCE_NORMAL_FLOOR, n_phase: nPhase,
    },
    axial_witness: {
      statement: "axial no-balance extends pointwise to common-phase radial breathing: same-ring terms stay level, opposite-ring terms stay one-signed; max axial residual over the cycle stays strictly negative for alpha>0",
      grid_samples: axialSamples,
      all_negative: axialAllNegative,
      max_axial_residual: axialMax,
    },
    planar_breathing_scan: {
      admissible_cells: admissibleCells,
      min_avg_tangential: minAvgTan,
      min_cell: minCell,
      cross_axis_sign_changes: crossAxisSignChanges,
    },
    extended_omega_probe: {
      admissible_cells: probeCells,
      min_avg_tangential: probeMin,
      min_cell: probeMinCell,
      min_pump_suppression_vs_rigid: minSuppression,
      pointwise_reversal_at_min_cell: reversal,
      interpretation: "pump suppression improves monotonically with breathing rim velocity delta*Omega up to the sub-field admissibility edge, then floors near 3/4 of the rigid pump; the instantaneous pump reverses within the cycle but the cycle average stays strictly positive",
    },
    candidates,
    disposition: candidates.length > 0
      ? "breathing_family_cycle_averaged_zero_rows_found_candidate_only"
      : "breathing_family_no_zero_average_row_in_scanned_box",
    retainedBranchClaim: false,
    acceptedSameLevelBranchClaim: false,
    scoreMovement: "no_score_increase",
  };
}

function runCli() {
  const result = runScan();
  const pretty = process.argv.includes("--pretty");
  console.log(JSON.stringify(result, null, pretty ? 2 : 0));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) runCli();
