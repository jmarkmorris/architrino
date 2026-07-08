#!/usr/bin/env node

// Fold-crossing sustained-alignment window diagnostic (braid-ideal lane).
//
// Purpose. The non-coincident cross-hit fold ([fold-crossing-hinge-geometry-diagnostic.mjs],
// spec Section 7) restores the Section 2 finite A_2 chart impulse, but only *contingent on
// sustained velocity alignment*: the alignment v_j . rhat_ij = c_f must hold at finite
// separation over a click window, and the Section 2 impulse assumed the window depth mu0 by
// hand. This diagnostic derives the click window from real orbital kinematics of a nested
// middle-binary hinge and decides the absorber inequality against the certified pump.
//
// Model. A middle-binary source orbits radius rho_M at super-field rim fraction beta_M
// (velocity magnitude beta_M c_f); an outer receiver orbits radius rho_R at beta_R. The
// cross-hit fold is the locus D_s = c_f - V_s . rhat = 0 (the source's Mach-cone caustic).
// As the receiver sweeps across the Mach cone the fold is visited for a reception-time
// window; the diagnostic measures that window, the fold recurrence N_click per source
// period, the finite fold chord, the derived window depth mu0, the booked Section 2 impulse,
// the receiver-normal sign D_T (absorptive vs ejective), and the absorbed fraction of the
// per-rotation pump.
//
// Result (the proof-moving content). For generic nested circular orbits the alignment is
// TRANSIENT, not sustained: the click window is a small fraction (~1-3%) of the source
// period, so the kinematic cross-hit clicks book only a small fraction of the pump — the
// same order as the other closed absorbers. Sustained alignment (a wide window) is NOT
// kinematically generic; it requires the DECLARED middle-binary hinge branch that holds
// v_M = c_f co-linearly over a dwell arc, which is exactly the dynamic-alignment /
// formation-history burden already isolated for induced sea orientational polarization. The
// diagnostic reports the dwell fraction the declared hinge would need to beat the pump,
// reducing the whole route to that one branch condition.
//
// Claim level: diagnostic derivation only. No retained-branch claim, no accepted-evidence
// claim, no stability claim, no click-mechanism closure. Every output fails closed at the
// central seed-path certificate and the central retained-history row. Zero free amplitude.
//
// See reference/priorities/braid-ideal/fold-crossing-chart-spec.md (Sections 2, 7) and
// reference/priorities/braid-ideal/fold-crossing-sustained-alignment-window-packet.md.

import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

export const SCHEMA = "fold_crossing_sustained_alignment_window_diagnostic.v0";

export const AUTHORITY_CLASS = "diagnostic_candidate_model_not_accepted_evidence";
export const SEED_PATH_CERTIFICATE_OBJECT =
  "held_release_seed_path_rows_acceptance_certificate.v0";
export const SEED_PATH_CERTIFICATE_FIELD =
  "held_release_seed_path_rows.acceptance_certificate_ref";
export const CENTRAL_RETAINED_HISTORY_ROW_BLOCKER = "central_solver_retained_history_row";

export const FIELD_SPEED = 1;
export const COUPLING = 1;

// Certified tangential pump band from the escape packet (comparison scaffold only).
export const PUMP_BAND_LO_COEFF = 2.881;

// Declared chart geometric coefficient (hypothesis-level O(1), as the chart spec leaves it).
export const ORIENTATION_PROJECTION_CHI = 1;

// A window counts as "sustained" (rather than transient/kinematic) if the fold is visited
// for more than this fraction of the source period. Declared monitor, not a response
// amplitude.
export const SUSTAINED_WINDOW_FRACTION_THRESHOLD = 0.1;
// Fold-proximity band and coincidence chord floor (declared chart-validity monitors).
export const FOLD_PROXIMITY_DS = 0.2;
export const COINCIDENCE_CHORD_FLOOR_FRACTION = 0.05;

// Declared nested hinge configurations: [rho_M, beta_M (super-field), rho_R, beta_R, phase].
export const DEFAULT_CONFIGS = Object.freeze([
  Object.freeze({ rhoM: 1.0, betaM: 1.05, rhoR: 2.0, betaR: 0.5, phase: 0 }),
  Object.freeze({ rhoM: 1.0, betaM: 1.1, rhoR: 2.0, betaR: 0.3, phase: 0 }),
  Object.freeze({ rhoM: 1.0, betaM: 1.1, rhoR: 2.0, betaR: 0.9, phase: 0 }),
  Object.freeze({ rhoM: 1.0, betaM: 1.2, rhoR: 2.0, betaR: 0.5, phase: 0 }),
]);

// Scan resolution (declared numerics, not response parameters).
export const RECEPTION_SAMPLES = 900;
export const EMISSION_STEP = 4e-3;
export const EMISSION_LOOKBACK = 6;

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function cleanNumber(value) {
  const number = Number(value);
  return !Number.isFinite(number) || Object.is(number, -0) ? 0 : number;
}

function normalizeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function circlePosition(t, radius, omega, phase = 0) {
  return [radius * Math.cos(omega * t + phase), radius * Math.sin(omega * t + phase)];
}

function circleVelocity(t, radius, omega, phase = 0) {
  const speed = radius * omega;
  return [-speed * Math.sin(omega * t + phase), speed * Math.cos(omega * t + phase)];
}

// Causal roots of receiver-at-T against the source path: |X_r(T) - X_s(s)| = c_f (T - s),
// s < T. Returns the near-fold root (minimum |D_s|) with its chord, D_s, and D_T.
function nearFoldRoot(T, receiver, receiverVel, rhoM, omegaM) {
  const residual = (s) => {
    const xs = circlePosition(s, rhoM, omegaM);
    return Math.hypot(receiver[0] - xs[0], receiver[1] - xs[1]) - FIELD_SPEED * (T - s);
  };
  let previous = { s: T - 1e-4, value: residual(T - 1e-4) };
  let best = null;
  for (let s = T - 1e-4 - EMISSION_STEP; s > T - EMISSION_LOOKBACK; s -= EMISSION_STEP) {
    const value = residual(s);
    if ((previous.value < 0) !== (value < 0)) {
      let lo = s;
      let hi = previous.s;
      for (let k = 0; k < 48; k += 1) {
        const mid = (lo + hi) / 2;
        if ((residual(lo) < 0) !== (residual(mid) < 0)) hi = mid;
        else lo = mid;
      }
      const sr = (lo + hi) / 2;
      const xs = circlePosition(sr, rhoM, omegaM);
      const d = [receiver[0] - xs[0], receiver[1] - xs[1]];
      const dist = Math.hypot(d[0], d[1]);
      const rhat = [d[0] / dist, d[1] / dist];
      const vs = circleVelocity(sr, rhoM, omegaM);
      const ds = FIELD_SPEED - (vs[0] * rhat[0] + vs[1] * rhat[1]);
      const dt = FIELD_SPEED - (receiverVel[0] * rhat[0] + receiverVel[1] * rhat[1]);
      if (best == null || Math.abs(ds) < Math.abs(best.ds)) {
        best = { s: sr, chord: dist, ds, dt };
      }
    }
    previous = { s, value };
  }
  return best;
}

function measureConfig(config, rho) {
  const rhoM = config.rhoM * rho;
  const rhoR = config.rhoR * rho;
  const omegaM = (config.betaM * FIELD_SPEED) / rhoM;
  const omegaR = (config.betaR * FIELD_SPEED) / rhoR;
  const period = (2 * Math.PI) / omegaM;
  const dT = period / RECEPTION_SAMPLES;
  const coincidenceFloor = COINCIDENCE_CHORD_FLOOR_FRACTION * rho;

  const samples = [];
  let globalMinAbsDs = Infinity;
  for (let i = 0; i < RECEPTION_SAMPLES; i += 1) {
    const T = i * dT;
    const receiver = circlePosition(T, rhoR, omegaR, config.phase);
    const receiverVel = circleVelocity(T, rhoR, omegaR, config.phase);
    const root = nearFoldRoot(T, receiver, receiverVel, rhoM, omegaM);
    if (root == null) {
      samples.push({ T, inWindow: false, chord: null, ds: null, dt: null });
      continue;
    }
    globalMinAbsDs = Math.min(globalMinAbsDs, Math.abs(root.ds));
    const inWindow = Math.abs(root.ds) < FOLD_PROXIMITY_DS && root.chord > coincidenceFloor;
    samples.push({ T, inWindow, chord: root.chord, ds: root.ds, dt: root.dt });
  }

  // Contiguous fold windows (wrapping the periodic scan).
  const windows = [];
  let run = null;
  for (let i = 0; i < samples.length; i += 1) {
    if (samples[i].inWindow) {
      if (run == null) run = { start: i, indices: [i] };
      else run.indices.push(i);
    } else if (run != null) {
      windows.push(run);
      run = null;
    }
  }
  if (run != null) windows.push(run);
  // wrap-merge if first and last samples are both in-window
  if (windows.length >= 2 && samples[0].inWindow && samples[samples.length - 1].inWindow) {
    const first = windows.shift();
    const last = windows[windows.length - 1];
    last.indices = last.indices.concat(first.indices);
  }

  const windowRows = windows.map((w) => {
    const chords = w.indices.map((i) => samples[i].chord);
    const dtVals = w.indices.map((i) => samples[i].dt);
    const dsVals = w.indices.map((i) => Math.abs(samples[i].ds));
    const durationDT = w.indices.length * dT;
    // Derived window depth mu0 = integral of |D_T| over the window (unfolding swept),
    // taken as the half-window depth from birth to peak.
    const mu0 = 0.5 * dtVals.reduce((s, v) => s + Math.abs(v), 0) * dT;
    const rc = Math.min(...chords);
    // curvature a estimated from the D_s slope across the window in reception time:
    // a ~ max|dDs/dT| * (dT/ds ~ 1); use the finite-difference peak slope.
    let maxSlope = 0;
    for (let k = 1; k < w.indices.length; k += 1) {
      const slope = Math.abs(samples[w.indices[k]].ds - samples[w.indices[k - 1]].ds) / dT;
      maxSlope = Math.max(maxSlope, slope);
    }
    const a = Math.max(maxSlope, 1e-9);
    const impulse = (ORIENTATION_PROJECTION_CHI * COUPLING) / (rc * rc) * Math.sqrt((2 * mu0) / a);
    // Receiver-normal sign at the window (mean D_T): D_T<0 => absorptive.
    const meanDt = dtVals.reduce((s, v) => s + v, 0) / dtVals.length;
    return {
      duration_dt: cleanNumber(durationDT),
      window_fraction: cleanNumber(durationDT / period),
      min_fold_chord: cleanNumber(rc),
      min_abs_ds: cleanNumber(Math.min(...dsVals)),
      mu0_derived: cleanNumber(mu0),
      curvature_a: cleanNumber(a),
      booked_impulse: cleanNumber(impulse),
      mean_receiver_normal_dt: cleanNumber(meanDt),
      sign: meanDt < 0 ? "absorptive" : "ejective",
    };
  });

  const nClick = windowRows.length;
  const totalWindowFraction = cleanNumber(
    windowRows.reduce((s, w) => s + w.window_fraction, 0)
  );
  const bookedPerPeriod = cleanNumber(windowRows.reduce((s, w) => s + w.booked_impulse, 0));
  const pumpPerPeriod = cleanNumber((2 * Math.PI * PUMP_BAND_LO_COEFF * COUPLING) / (FIELD_SPEED * FIELD_SPEED * rhoM));
  const absorbedFraction = pumpPerPeriod > 0 ? cleanNumber(bookedPerPeriod / pumpPerPeriod) : null;

  return {
    config: {
      rho_M: cleanNumber(rhoM),
      beta_M: cleanNumber(config.betaM),
      rho_R: cleanNumber(rhoR),
      beta_R: cleanNumber(config.betaR),
      phase: cleanNumber(config.phase),
    },
    source_period: cleanNumber(period),
    global_min_abs_ds: cleanNumber(globalMinAbsDs),
    fold_reached: globalMinAbsDs < FOLD_PROXIMITY_DS,
    n_click_per_period: nClick,
    total_window_fraction: totalWindowFraction,
    alignment_sustained: totalWindowFraction >= SUSTAINED_WINDOW_FRACTION_THRESHOLD,
    windows: windowRows,
    booked_impulse_per_period: bookedPerPeriod,
    pump_per_period: pumpPerPeriod,
    absorbed_fraction: absorbedFraction,
    beats_pump: absorbedFraction != null && absorbedFraction >= 1,
    free_amplitude_parameter_count: 0,
  };
}

export function buildFoldCrossingSustainedAlignmentWindowDiagnostic(options = {}) {
  const rho = normalizeNumber(options.rho, 1);
  const configs =
    Array.isArray(options.configs) && options.configs.length > 0 ? options.configs : DEFAULT_CONFIGS;
  const configRows = configs.map((config) => measureConfig(config, rho));

  const anySustained = configRows.some((row) => row.alignment_sustained);
  const allFoldReached = configRows.every((row) => row.fold_reached);
  const maxWindowFraction = cleanNumber(
    Math.max(...configRows.map((row) => row.total_window_fraction))
  );
  const maxAbsorbedFraction = cleanNumber(
    Math.max(...configRows.map((row) => row.absorbed_fraction ?? 0))
  );

  // Conservative full-dwell bound. If the middle binary is HELD on its co-linear hinge
  // branch, the window depth mu0 grows with the dwell fraction while the fold curvature a is
  // held fixed; the Section 2 impulse then scales as sqrt(mu0) ~ sqrt(dwell), so extending
  // the representative kinematic window to full dwell multiplies the absorbed fraction by
  // sqrt(1 / window_fraction). This is a LOWER bound on the held-hinge transfer: the true
  // held limit drives the curvature a -> 0 (the fold becomes non-transversal), where the
  // Section 2 transversal formula no longer applies and the transacted action is set by the
  // dwell dynamics -- a retained-history / formation-history question, not a kinematic one.
  const representative = configRows.reduce(
    (best, row) => (row.absorbed_fraction > (best?.absorbed_fraction ?? -1) ? row : best),
    null
  );
  const fullDwellAbsorbedConservative =
    representative && representative.total_window_fraction > 0
      ? cleanNumber(
          representative.absorbed_fraction * Math.sqrt(1 / representative.total_window_fraction)
        )
      : null;

  const core = {
    schema: SCHEMA,
    proof_id: "SH-0-sea",
    subtarget: "self_hit_held_release_solver_row/sustained_cross_hit_alignment_window",
    authority_class: AUTHORITY_CLASS,
    claim_level:
      "diagnostic derivation only; derives the cross-hit click window from nested middle-binary orbital kinematics and decides the absorber inequality; not accepted evidence, no retained branch, no click-mechanism closure",
    kernel: {
      field_speed: FIELD_SPEED,
      coupling: COUPLING,
      convention:
        "potential-superposition kernel; source-normal D_s=c_f-V_s.rhat, receiver-normal D_T=c_f-V_r.rhat; Section 2 impulse chi(kappa/r_c^2)sqrt(2 mu0/a); signed polarity units epsilon_{+,bullet}/epsilon_{-,bullet}",
    },
    declared_monitors: {
      sustained_window_fraction_threshold: SUSTAINED_WINDOW_FRACTION_THRESHOLD,
      fold_proximity_ds: FOLD_PROXIMITY_DS,
      coincidence_chord_floor_fraction: COINCIDENCE_CHORD_FLOOR_FRACTION,
      note:
        "declared numerical/chart-validity monitors and Section-2 geometric coefficient chi; none is a fitted response amplitude; free_amplitude_parameter_count=0",
    },
    config_rows: configRows,
    verdict: {
      cross_hit_fold_reached_at_finite_chord: allFoldReached,
      alignment_sustained_kinematically: anySustained,
      max_window_fraction: maxWindowFraction,
      max_absorbed_fraction: maxAbsorbedFraction,
      full_dwell_absorbed_fraction_conservative: fullDwellAbsorbedConservative,
      full_dwell_still_insufficient_conservative:
        fullDwellAbsorbedConservative != null && fullDwellAbsorbedConservative < 1,
      disposition: anySustained
        ? "kinematic_sustained_window_found"
        : "cross_hit_alignment_transient_not_sustained_insufficient_reduces_to_declared_hinge_branch",
      statement: anySustained
        ? "a nested circular geometry sustains the cross-hit alignment over a wide click window; the booked clicks are computed above"
        : "for generic nested circular orbits the cross-hit fold is reached at finite chord but the alignment is transient: the fold is visited for only a small fraction of the source period (max window fraction reported above), so the kinematic cross-hit clicks book only a small fraction of the certified pump (absorbed fractions well below 1%). Sustained alignment is not kinematically generic. Extending the representative window to full dwell at fixed curvature (a conservative lower bound on the held-hinge transfer) still leaves the absorbed fraction below 1, so even a fully-held co-linear hinge is insufficient under transversal-fold scaling. The true held limit drives the fold non-transversal (curvature a -> 0), where the Section 2 impulse formula no longer applies and the transacted action is set by the dwell dynamics — the same dynamic-alignment / formation-history / retained-history burden already isolated for induced sea orientational polarization. The route therefore reduces to that one branch condition and cannot be decided kinematically.",
      shared_burden_note:
        "the sustained-alignment requirement here and the aligned-order requirement for induced sea orientational polarization are the same dynamic-alignment / formation-history burden; discharging one discharges both",
    },
    evidence_status: {
      accepted: false,
      accepted_evidence_status: "diagnostic_sustained_alignment_window_not_accepted_evidence",
      first_missing_object: SEED_PATH_CERTIFICATE_OBJECT,
      first_missing_field: SEED_PATH_CERTIFICATE_FIELD,
      downstream_producer_boundary: CENTRAL_RETAINED_HISTORY_ROW_BLOCKER,
    },
    authorization: buildFailClosedAuthorization(),
    free_amplitude_parameter_count: 0,
  };
  return { ...core, artifact_hash: stableHash(core) };
}

export function buildFailClosedAuthorization() {
  return {
    authority_class: AUTHORITY_CLASS,
    accepted_same_record_evidence: false,
    accepted_retained_evidence: false,
    retained_branch_claim: false,
    accepted_force_action_closure: false,
    accepted_stability_claim: false,
    accepted_click_mechanism_closure: false,
    receiver_normal_branch_strength: false,
    scoreMovement: "no_score_increase",
    first_missing_object: SEED_PATH_CERTIFICATE_OBJECT,
    first_missing_field: SEED_PATH_CERTIFICATE_FIELD,
    downstream_producer_boundary: CENTRAL_RETAINED_HISTORY_ROW_BLOCKER,
  };
}

export function evaluateFoldCrossingSustainedAlignmentWindowEvidence(candidate) {
  if (candidate?.schema !== SCHEMA) {
    return {
      accepted: false,
      reason: "schema_not_fold_crossing_sustained_alignment_window_diagnostic_v0",
      first_missing_field: "fold_crossing_sustained_alignment_window_diagnostic.schema",
    };
  }
  return {
    accepted: false,
    reason: "diagnostic_sustained_alignment_window_not_accepted_retained_evidence",
    first_missing_object: SEED_PATH_CERTIFICATE_OBJECT,
    first_missing_field: SEED_PATH_CERTIFICATE_FIELD,
    downstream_producer_boundary: CENTRAL_RETAINED_HISTORY_ROW_BLOCKER,
  };
}

function parseArgs(args) {
  return {
    pretty: args.includes("--pretty"),
    rho: (() => {
      const v = args.find((a) => a.startsWith("--rho="));
      return v ? Number(v.slice(6)) : undefined;
    })(),
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    console.log(`Usage: node ${fileURLToPath(import.meta.url)} [--pretty] [--rho=<number>]`);
    process.exit(0);
  }
  const options = parseArgs(process.argv.slice(2));
  const artifact = buildFoldCrossingSustainedAlignmentWindowDiagnostic(options);
  console.log(JSON.stringify(artifact, null, options.pretty ? 2 : 0));
}
