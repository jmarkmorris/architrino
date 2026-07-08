import { fileURLToPath } from "node:url";

// Differential Cross-Hit Alignment Diagnostic (SH-0-sea, cross-hit absorber sub-target).
//
// Closure goal probed: whether a differential nested-shell / inner-middle-binary
// configuration sustains the cross-hit alignment condition
//     D_s,ij = c_f - v_j . rhat_ij = 0   at finite separation
// often enough per rotation for the non-coincident cross-hit hinge to absorb the
// certified tangential pump and beat the (S)-failure clock. This is the
// load-bearing absorber route left standing after the single-site self-hit was
// shown coincidence-bound (see the fold-crossing-hinge-geometry-diagnostic and
// the d0-scale brainstorming entry).
//
// Model: two coplanar circular bodies (a differential configuration). A fast
// inner SOURCE j (small radius, high angular rate) and a slower RECEIVER i on a
// pumped band. Nested shell braids are exactly this: inner smallest+fastest,
// outer largest+slowest, with integer frequency locks (e.g. 4:2:1) and the
// middle band in the hinge/transfer role (nested-shell-braid.md). A high inner/
// outer frequency ratio n presents ~2(n-1) sightline-alignment events per outer
// rotation, so the click multiplicity the single-shell self-hit could not supply
// is a natural feature of the differential geometry.
//
// Claim discipline (fail-closed): priority-only toy probe, not accepted
// evidence. Names no retained branch, flips no acceptance flag, blocks at
// central_solver_retained_history_row. Propagation at field speed c_f; only
// causal-delay terminology. Signed polarity-unit notation epsilon_{+,.} /
// epsilon_{-,.}; sigma_ij = sign(polarity product).

const SCHEMA = "differential_cross_hit_alignment_diagnostic.v0";

const CANONICAL = {
  fieldSpeed: 1, // c_f
  coupling: 1, // kappa
  certifiedPumpConstantLower: 2.881, // c_1
};

// Certified tangential pump delivered to the receiver band per rotation.
export function pumpPerRotation({ coupling = 1, fieldSpeed = 1, receiverRadius, c1 = CANONICAL.certifiedPumpConstantLower } = {}) {
  return (2 * Math.PI * c1 * coupling) / (fieldSpeed * fieldSpeed * receiverRadius);
}

function receiverState(T, { radius, rate, phase0 = 0 }) {
  const th = rate * T + phase0;
  const speed = rate * radius;
  return {
    pos: { x: radius * Math.cos(th), y: radius * Math.sin(th) },
    vel: { x: -speed * Math.sin(th), y: speed * Math.cos(th) },
    speed,
  };
}

function sourceState(t, { radius, rate, phase0 = 0 }) {
  const th = rate * t + phase0;
  const speed = rate * radius;
  return {
    pos: { x: radius * Math.cos(th), y: radius * Math.sin(th) },
    vel: { x: -speed * Math.sin(th), y: speed * Math.cos(th) },
    speed,
  };
}

function dist2(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Cross-hit causal roots at receiver time T: emission times s < T with
// |X_i(T) - X_j(s)| = c_f (T - s). Returns all roots in the scan window.
function crossHitRoots(T, receiverCfg, sourceCfg, cf, window, steps) {
  const recv = receiverState(T, receiverCfg);
  const residual = (s) => {
    const src = sourceState(s, sourceCfg);
    return dist2(recv.pos, src.pos) - cf * (T - s);
  };
  const roots = [];
  let prevS = T - window;
  let prevF = residual(prevS);
  for (let i = 1; i <= steps; i += 1) {
    const s = T - window + (window * i) / steps;
    const f = residual(s);
    if (Number.isFinite(prevF) && Number.isFinite(f) && Math.sign(prevF) !== Math.sign(f)) {
      let lo = prevS;
      let hi = s;
      let flo = prevF;
      for (let k = 0; k < 80; k += 1) {
        const mid = 0.5 * (lo + hi);
        const fmid = residual(mid);
        if (Math.sign(fmid) === Math.sign(flo)) {
          lo = mid;
          flo = fmid;
        } else {
          hi = mid;
        }
      }
      const sRoot = 0.5 * (lo + hi);
      const src = sourceState(sRoot, sourceCfg);
      const sep = dist2(recv.pos, src.pos);
      const rhat = { x: (recv.pos.x - src.pos.x) / sep, y: (recv.pos.y - src.pos.y) / sep };
      const Ds = cf - (src.vel.x * rhat.x + src.vel.y * rhat.y);
      const DT = cf - (recv.vel.x * rhat.x + recv.vel.y * rhat.y);
      const tHat = { x: recv.vel.x / recv.speed, y: recv.vel.y / recv.speed };
      roots.push({
        emissionTime: sRoot,
        chord: sep,
        Ds,
        DT,
        signedM: DT / Ds,
        forwardProjection: tHat.x * rhat.x + tHat.y * rhat.y, // t_i . rhat
      });
    }
    prevS = s;
    prevF = f;
  }
  return roots;
}

// One differential configuration: sweep receiver time over one outer rotation,
// count cross-hit alignment folds (D_s sign changes), the finite-chord status,
// the sustained-window fraction, and the integrated signed tangential impulse.
export function differentialCrossHitAlignment(config = {}) {
  const {
    receiverRadius = Math.sqrt(2 / 3), // studied braid radius rho
    receiverSpeed = 0.95, // beta_i (sub-field receiver band)
    sourceRadius = 0.4,
    frequencyRatio = 4, // n = omega_j / omega_i; inner source speed beta_j = n*(beta_i/b)*a
    sigma = -1, // polarity product: -1 attractive (unlike), +1 repulsive (like)
    phase0 = 0.3,
    coupling = 1,
    fieldSpeed = 1,
    softening = 0.01,
    samples = 4000,
  } = config;

  const omegaI = receiverSpeed / receiverRadius; // omega_i = beta_i / b
  const omegaJ = frequencyRatio * omegaI;
  const sourceRate = omegaJ;
  const sourceSpeed = sourceRate * sourceRadius; // beta_j
  const receiverCfg = { radius: receiverRadius, rate: omegaI, phase0: 0 };
  const sourceCfg = { radius: sourceRadius, rate: sourceRate, phase0 };
  const rotationPeriod = (2 * Math.PI) / omegaI;
  const scanWindow = Math.min(rotationPeriod, 6 * (receiverRadius + sourceRadius) / fieldSpeed + 2);

  let minAlignedChord = Infinity;
  let minChordAll = Infinity; // min chord over ALL contributing roots
  let maxChord = 0;
  let alignedSamples = 0; // samples with >=1 near-aligned root (|D_s| small)
  let maxContiguousAligned = 0;
  let curContiguous = 0;
  const alignBand = 0.05 * fieldSpeed;
  let signedImpulse = 0; // integrated tangential drain at softening
  let signedImpulseFine = 0; // same at softening/4 (regulator-independence probe)
  const softFine = softening / 4;
  let prevT = null;
  let prevIntegrand = null;
  let prevIntegrandFine = null;
  let rootBearingSamples = 0;
  // Count alignment folds by contiguous aligned intervals (each passage = one click).
  let clickPassages = 0;
  let wasAligned = false;

  for (let i = 0; i <= samples; i += 1) {
    const T = (rotationPeriod * i) / samples;
    const roots = crossHitRoots(T, receiverCfg, sourceCfg, fieldSpeed, scanWindow, 500);
    // Net tangential force is the sum over ALL active cross-hit causal branches.
    let integrand = 0;
    let integrandFine = 0;
    let aligned = false;
    if (roots.length > 0) {
      rootBearingSamples += 1;
      for (const r of roots) {
        maxChord = Math.max(maxChord, r.chord);
        minChordAll = Math.min(minChordAll, r.chord);
        if (Math.abs(r.Ds) < alignBand) {
          aligned = true;
          minAlignedChord = Math.min(minAlignedChord, r.chord);
        }
        // f_tan ~ sigma * kappa * signedM * (t_i . rhat) / (chord^2 + soft^2).
        const w = sigma * coupling * r.signedM * r.forwardProjection;
        integrand += w / (r.chord * r.chord + softening * softening);
        integrandFine += w / (r.chord * r.chord + softFine * softFine);
      }
    }
    if (aligned) {
      alignedSamples += 1;
      curContiguous += 1;
      maxContiguousAligned = Math.max(maxContiguousAligned, curContiguous);
      if (!wasAligned) clickPassages += 1;
    } else {
      curContiguous = 0;
    }
    wasAligned = aligned;
    if (prevT !== null && prevIntegrand !== null) {
      signedImpulse += 0.5 * (integrand + prevIntegrand) * (T - prevT);
      signedImpulseFine += 0.5 * (integrandFine + prevIntegrandFine) * (T - prevT);
    }
    prevT = T;
    prevIntegrand = integrand;
    prevIntegrandFine = integrandFine;
  }

  const pump = pumpPerRotation({ coupling, fieldSpeed, receiverRadius });
  // Absorptive = drains the tangential pump = negative signed impulse.
  const absorbedFraction = -signedImpulse / pump;
  const absorbedFractionFine = -signedImpulseFine / pump;
  // Chart-clean requires regulator (softening) independence, which holds only
  // while the contributing chords stay finite (non-coincident). A large jump
  // between softening and softening/4 flags a near-coincidence contamination.
  const softeningSpread =
    Math.abs(absorbedFractionFine - absorbedFraction) /
    Math.max(1e-9, Math.abs(absorbedFraction));
  const cleanFiniteChord = Number.isFinite(minChordAll) && minChordAll > 0.1 && softeningSpread < 0.05;
  const clicksPerRotation = clickPassages;
  const finiteChordThroughout = Number.isFinite(minAlignedChord) && minAlignedChord > 0.05;
  const minChord = Number.isFinite(minChordAll) ? minChordAll : null;
  const sustainedWindowFraction = alignedSamples / (rootBearingSamples || 1);

  return {
    config: {
      receiverRadius,
      receiverSpeed,
      sourceRadius,
      sourceSpeed,
      frequencyRatio,
      sigma,
    },
    clicksPerRotation,
    finiteChordThroughout,
    minChord,
    maxChord,
    sustainedWindowFraction,
    maxContiguousAlignedSamples: maxContiguousAligned,
    isSustainedNotJustClicks: maxContiguousAligned > 0.02 * samples,
    pumpPerRotation: pump,
    signedTangentialImpulse: signedImpulse,
    absorbedFractionOfCertifiedPump: absorbedFraction,
    absorbedFractionAtQuarterSoftening: absorbedFractionFine,
    softeningSpread,
    cleanFiniteChord,
    beatsClock: absorbedFraction >= 1,
    cleanBeatsClock: cleanFiniteChord && absorbedFraction >= 1,
  };
}

export function buildDifferentialCrossHitReport(options = {}) {
  // Proximity is the strong lever: sweep the source-band radius toward the
  // receiver band at the absorptive polarity (sigma=+1). Report the clean
  // finite-chord ceiling separately from near-coincidence contamination.
  const sourceRadii = options.sourceRadii ?? [0.4, 0.5, 0.6, 0.7, 0.75, 0.8];
  const base = { frequencyRatio: 8, sigma: 1, samples: 8000, ...(options.base ?? {}) };
  const rows = sourceRadii.map((sourceRadius) =>
    differentialCrossHitAlignment({ ...base, sourceRadius })
  );

  const cleanRows = rows.filter((r) => r.cleanFiniteChord);
  const cleanCeiling = cleanRows.length
    ? Math.max(...cleanRows.map((r) => r.absorbedFractionOfCertifiedPump))
    : 0;
  const anyCleanBeats = rows.some((r) => r.cleanBeatsClock);
  const anyBeatsWithCoincidence = rows.some((r) => r.beatsClock && !r.cleanFiniteChord);
  const anySustained = rows.some((r) => r.isSustainedNotJustClicks);

  return {
    schema: SCHEMA,
    authority: "priority_only_toy_probe_not_accepted_evidence",
    canonical_constants: CANONICAL,
    rows,
    clean_finite_chord_absorbed_ceiling: cleanCeiling,
    any_clean_finite_chord_row_beats_clock: anyCleanBeats,
    beats_clock_only_near_coincidence: anyBeatsWithCoincidence && !anyCleanBeats,
    sustained_alignment_window_exists: anySustained,
    disposition: anyCleanBeats
      ? "differential_cross_hit_clean_finite_chord_absorbs_certified_pump_named_row"
      : anyBeatsWithCoincidence
        ? "differential_cross_hit_beats_pump_only_by_approaching_coincidence_clean_ceiling_below_pump"
        : "differential_cross_hit_clean_finite_chord_absorption_below_pump",
    orientational_order_caveat:
      "aligned/differential band order assumed, not self-selected (shared dynamic-alignment / formation-history burden).",
    reading:
      "single-source clean finite-chord differential cross-hit reaches a fraction of the certified pump set by radial band proximity; crossing the pump in one source requires approaching coincidence (regulator-dependent). A full nested braid carries several inter-band cross-hit source charges whose clean contributions sum - the named next step.",
    retainedBranchClaim: false,
    scoreMovement: "no_score_increase",
    accepted_seed_path_certificate: false,
    central_solver_retained_history_acceptance: false,
    first_missing_object:
      "multi_source_clean_finite_chord_cross_hit_sum_or_sustained_alignment_from_differential_dynamics",
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const pretty = process.argv.includes("--pretty");
  const report = buildDifferentialCrossHitReport();
  process.stdout.write(JSON.stringify(report, null, pretty ? 2 : 0) + "\n");
}
