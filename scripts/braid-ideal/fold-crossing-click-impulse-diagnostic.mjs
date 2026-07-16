#!/usr/bin/env node

// Fold-crossing click-impulse diagnostic (braid-ideal lane).
//
// Purpose: decide the controlled-click question for `self_hit_held_release_solver_row`
// at toy level. The sea-screened self-hit rows witness the naive same-source kernel
// ejecting at the field-speed hinge with regularization-dependent magnitude (recorded
// 12.4 -> 9.8 -> 10.6 c_f final-speed drift). This diagnostic replaces the naive
// chart-dependent ejection with a chart-defined click impulse on the canonical
// fold-set chart and reports its sign and magnitude against the certified tangential
// pump band 2.881*beta .. 2.925*beta.
//
// Two computations run side by side on the same incoming worldline through the hinge:
//   1. Naive: the toy kernel's ABSOLUTE branch weight |D_T / D_s| (clamped by the
//      Jacobian floor, softened, delay-gated). This is the chart-dependent object.
//   2. Chart: the SIGNED branch orientation m = D_T / D_s of the canonical master
//      equation, evaluated with the exact source-normal denominator (no floor, no
//      softening, no self-hit minimum delay). This is the chart-defined object.
//
// The proof-moving result is the SIGN of the chart impulse: on the incoming fold
// chart the receiver is super-field along the connecting ray (D_T < 0) while its own
// past is still sub-field (D_s > 0), so m < 0 and the same-source repulsion is
// ABSORPTIVE (it drains tangential action). The naive absolute value discards this
// sign and reads ejective. The chart code path does not read softening, the Jacobian
// floor, or the self-hit minimum delay at all, which is the executable form of the
// regularization-independence claim.
//
// Claim level: diagnostic only. No retained-branch claim, no accepted-evidence claim,
// no stability claim. Every output fails closed at the central seed-path certificate
// and the central retained-history row.
//
// See reference/priorities/braid-archive/braid-ideal/fold-crossing-click-impulse-packet.md and
// reference/priorities/braid-archive/braid-ideal/sh-0-sea-diagnostic-candidate-model.md
// (Self-Hit Probe Inside the Sea Shell).

import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export const SCHEMA = "fold_crossing_click_impulse_diagnostic.v0";

// Fail-closed blocker chain, shared with the SH-0-sea candidate model and the
// self-hit held-release owner row. This diagnostic authorizes nothing.
export const AUTHORITY_CLASS = "diagnostic_candidate_model_not_accepted_evidence";
export const SEED_PATH_CERTIFICATE_OBJECT =
  "held_release_seed_path_rows_acceptance_certificate.v0";
export const SEED_PATH_CERTIFICATE_FIELD =
  "held_release_seed_path_rows.acceptance_certificate_ref";
export const CENTRAL_RETAINED_HISTORY_ROW_BLOCKER = "central_solver_retained_history_row";

// Canonical kernel constants (identical to the escape-floor / self-hit toy row).
export const FIELD_SPEED = 1;
export const COUPLING = 1;
export const SAME_SOURCE_POLARITY_PRODUCT = 1; // a site and its own past share polarity.

// Named sea-spacing candidate and the three sea-screened self-hit rows.
export const CANDIDATE_A_FCC = 4.25;
export const DEFAULT_ROWS = Object.freeze([
  Object.freeze({ handle: "sh0sea-a4.25-selfhit-vt080-moving-prehistory", surfaceSpeedFraction: 0.8 }),
  Object.freeze({ handle: "sh0sea-a4.25-selfhit-vt095-moving-prehistory", surfaceSpeedFraction: 0.95 }),
  Object.freeze({ handle: "sh0sea-a4.25-selfhit-vt099-moving-prehistory", surfaceSpeedFraction: 0.99 }),
]);

// Certified tangential anti-damping pump band (units of beta) from
// planar-tangential-screen-interval-certificate.mjs: 2.881*beta .. 2.925*beta.
export const PUMP_BAND_LO_COEFF = 2.881;
export const PUMP_BAND_HI_COEFF = 2.925;

// Regularization sweep grid for the naive (chart-dependent) ejection magnitude. The
// three points reproduce the recorded 12.4 -> 9.8 -> 10.6 c_f final-speed drift.
export const DEFAULT_NAIVE_REGULARIZATION_GRID = Object.freeze([
  Object.freeze({ jacobianFloor: 0.05, selfHitMinDelay: 0.002, label: "floor0.05_mindelay0.002" }),
  Object.freeze({ jacobianFloor: 0.2, selfHitMinDelay: 0.002, label: "floor0.20_mindelay0.002" }),
  Object.freeze({ jacobianFloor: 0.05, selfHitMinDelay: 0.05, label: "floor0.05_mindelay0.050" }),
]);

// Declared chart tolerances.
export const DEFAULT_CHART_WINDOW = 0.07; // reception-time window past the hinge (units of rho / c_f).
export const DEFAULT_CHART_NSTEP = 400;
export const DEFAULT_CONVERGENCE_TOLERANCE = 1e-2; // relative tolerance under nstep refinement.
// Resolved-window lower edge: the fold chart integrates from the first same-source
// root whose chord is resolvable. The innermost neighborhood below this chord is the
// coincidence stratum {r=0} the fold chart inherits (spatial regularization), not a
// fold parameter, so it is excluded from the chart quantity. The sign is independent
// of this cut; only the (coincidence-sensitive) magnitude tail depends on it.
export const DEFAULT_CUT_DISTANCE = 0.01;

const DEFAULT_TOY_DURATION = 0.75;
const DEFAULT_TOY_DT = 0.002;

const TOY_SCRIPT = fileURLToPath(
  new URL("./held-release-causal-wake-toy.mjs", import.meta.url)
);

// ----------------------------------------------------------------------------
// Small vector helpers.
// ----------------------------------------------------------------------------

function subtract3(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}
function dot3(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function norm3(a) {
  return Math.sqrt(dot3(a, a));
}
function scale3(a, s) {
  return [a[0] * s, a[1] * s, a[2] * s];
}
function cleanNumber(value) {
  const number = Number(value);
  return !Number.isFinite(number) || Object.is(number, -0) ? 0 : number;
}
function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex").slice(0, 16);
}

// ----------------------------------------------------------------------------
// Worldline sampling and the same-source causal residual.
//
// A worldline is an array of samples { t, x:[3], v:[3] } in increasing time.
// ----------------------------------------------------------------------------

function sampleWorldline(worldline, time) {
  if (time <= worldline[0].t) {
    return { t: time, x: worldline[0].x.slice(), v: worldline[0].v.slice() };
  }
  const last = worldline[worldline.length - 1];
  if (time >= last.t) {
    return { t: time, x: last.x.slice(), v: last.v.slice() };
  }
  let lo = 0;
  let hi = worldline.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (worldline[mid].t <= time) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  const a = worldline[lo];
  const b = worldline[hi];
  const u = (time - a.t) / (b.t - a.t);
  return {
    t: time,
    x: a.x.map((z, i) => z + u * (b.x[i] - z)),
    v: a.v.map((z, i) => z + u * (b.v[i] - z)),
  };
}

// Same-source causal residual F_T(s) = |X(T) - X(s)| - c_f (T - s), the fold-set
// object of architrino.md core definition specialized to receiver = source.
function causalResidual(worldline, hitTime, emissionTime) {
  const receiver = sampleWorldline(worldline, hitTime);
  const source = sampleWorldline(worldline, emissionTime);
  return norm3(subtract3(receiver.x, source.x)) - FIELD_SPEED * (hitTime - emissionTime);
}

// The grazing same-source root: the largest emission time s < T with F_T(s) = 0.
// This is the root born at the hinge (smallest positive delay), i.e. the fold root.
function grazingSelfHitRoot(worldline, hitTime, scanCount = 4000) {
  let previousTime = hitTime;
  let previousResidual = causalResidual(worldline, hitTime, previousTime);
  for (let k = 1; k <= scanCount; k += 1) {
    const emissionTime = hitTime * (1 - k / scanCount);
    const residual = causalResidual(worldline, hitTime, emissionTime);
    if (previousResidual * residual < 0) {
      let lo = emissionTime;
      let hi = previousTime;
      let fLo = residual;
      for (let it = 0; it < 70; it += 1) {
        const mid = 0.5 * (lo + hi);
        const fMid = causalResidual(worldline, hitTime, mid);
        if (fLo * fMid <= 0) {
          hi = mid;
        } else {
          lo = mid;
          fLo = fMid;
        }
      }
      const root = 0.5 * (lo + hi);
      if (hitTime - root > 1e-5) {
        return root;
      }
    }
    previousTime = emissionTime;
    previousResidual = residual;
  }
  return null;
}

// Fold-chart branch data at a single reception time. Returns the exact (unregularized)
// signed branch orientation m = D_T / D_s and the naive absolute branch weight |m|
// with the toy's Jacobian floor / softening / min-delay, so both tangential
// accelerations can be compared on the same worldline.
function foldChartBranchRow(worldline, hitTime, regularization) {
  const emissionTime = grazingSelfHitRoot(worldline, hitTime);
  if (emissionTime == null) {
    return null;
  }
  const delay = hitTime - emissionTime;
  const receiver = sampleWorldline(worldline, hitTime);
  const source = sampleWorldline(worldline, emissionTime);
  const displacement = subtract3(receiver.x, source.x);
  const distance = norm3(displacement);
  if (distance <= 0) {
    return null;
  }
  const direction = scale3(displacement, 1 / distance);
  // Source-normal denominator and receiver-normal numerator (units of c_f).
  const sourceNormalDenominator = FIELD_SPEED - dot3(source.v, direction);
  const receiverNormalNumerator = FIELD_SPEED - dot3(receiver.v, direction);
  const receiverSpeed = norm3(receiver.v);
  const tangentUnit = receiverSpeed > 0 ? scale3(receiver.v, 1 / receiverSpeed) : direction;

  // Chart path: exact signed branch orientation, no floor / softening / min-delay.
  const signedBranchOrientation = receiverNormalNumerator / sourceNormalDenominator;
  const chartDenominator = distance * distance * distance; // |disp| / |disp|^2 -> disp / |disp|^3
  const chartForce = scale3(
    displacement,
    (COUPLING * SAME_SOURCE_POLARITY_PRODUCT * signedBranchOrientation) / chartDenominator
  );

  // Naive path: absolute branch weight, Jacobian-floor clamp, softened denominator,
  // and self-hit minimum-delay gate. These regularizers touch the naive path only.
  const floor = regularization && regularization.jacobianFloor != null ? regularization.jacobianFloor : 0;
  const softening = regularization && regularization.softening != null ? regularization.softening : 0;
  const minDelay = regularization && regularization.selfHitMinDelay != null ? regularization.selfHitMinDelay : 0;
  const gatedByMinDelay = delay < minDelay;
  const clampedDenominator =
    Math.sign(sourceNormalDenominator || 1) *
    Math.max(Math.abs(sourceNormalDenominator), floor);
  const naiveBranchWeight = Math.abs(receiverNormalNumerator / clampedDenominator);
  const naiveKernelDenominator = Math.pow(distance * distance + softening * softening, 1.5);
  const naiveForce = gatedByMinDelay
    ? [0, 0, 0]
    : scale3(
        displacement,
        (COUPLING * SAME_SOURCE_POLARITY_PRODUCT * naiveBranchWeight) / naiveKernelDenominator
      );

  return {
    hitTime,
    emissionTime,
    delay,
    distance,
    sourceNormalDenominator,
    receiverNormalNumerator,
    signedBranchOrientation,
    naiveBranchWeight,
    tangentUnit,
    directionDotTangent: dot3(direction, tangentUnit),
    chartTangentialAcceleration: dot3(chartForce, tangentUnit),
    naiveTangentialAcceleration: dot3(naiveForce, tangentUnit),
    gatedByMinDelay,
  };
}

// Locate the field-speed hinge: the first reception time where |v| crosses c_f.
function findHingeTime(worldline) {
  for (let k = 1; k < worldline.length; k += 1) {
    const previousSpeed = norm3(worldline[k - 1].v);
    const speed = norm3(worldline[k].v);
    if (previousSpeed < FIELD_SPEED && speed >= FIELD_SPEED) {
      // Linear crossing estimate.
      const u = (FIELD_SPEED - previousSpeed) / (speed - previousSpeed);
      return worldline[k - 1].t + u * (worldline[k].t - worldline[k - 1].t);
    }
  }
  return null;
}

// Integrate the tangential click impulse over the resolved window [hinge + step,
// hinge + window]. The lower edge is offset by one integration step so the trapezoid
// never samples the coincidence point exactly; the innermost coincidence neighborhood
// is the spatial-regularization stratum the fold chart inherits, not a fold parameter.
export function computeChartClickImpulse(options) {
  const {
    worldline,
    window = DEFAULT_CHART_WINDOW,
    nstep = DEFAULT_CHART_NSTEP,
    regularization = null,
    cutDistance = DEFAULT_CUT_DISTANCE,
  } = options;
  const hingeTime = options.hingeTime != null ? options.hingeTime : findHingeTime(worldline);
  if (hingeTime == null) {
    return { hingeTime: null, definable: false, reason: "no_field_speed_hinge_on_worldline" };
  }
  const start = hingeTime + window / nstep;
  const end = hingeTime + window;
  let chartImpulse = 0;
  let naiveImpulse = 0;
  let previous = null;
  let birthRow = null;
  let sampleCount = 0;
  for (let k = 0; k <= nstep; k += 1) {
    const hitTime = start + (end - start) * (k / nstep);
    const row = foldChartBranchRow(worldline, hitTime, regularization);
    // The chart integral is never gated by the naive regularizers; only rows below the
    // resolved chord (coincidence stratum) are excluded from the chart quantity.
    if (row == null || row.distance < cutDistance) {
      previous = null;
      continue;
    }
    if (birthRow == null) {
      birthRow = row;
    }
    sampleCount += 1;
    if (previous != null) {
      const dt = hitTime - previous.hitTime;
      chartImpulse += 0.5 * (row.chartTangentialAcceleration + previous.chartTangentialAcceleration) * dt;
      naiveImpulse += 0.5 * (row.naiveTangentialAcceleration + previous.naiveTangentialAcceleration) * dt;
    }
    previous = { hitTime, ...row };
  }
  const sign = chartImpulse < 0 ? "absorptive" : chartImpulse > 0 ? "ejective" : "null";
  return {
    hingeTime: cleanNumber(hingeTime),
    definable: sampleCount >= 2,
    sampleCount,
    window,
    nstep,
    chartImpulse: cleanNumber(chartImpulse),
    naiveImpulse: cleanNumber(naiveImpulse),
    sign,
    birth: birthRow
      ? {
          delay: cleanNumber(birthRow.delay),
          distance: cleanNumber(birthRow.distance),
          sourceNormalDenominator: cleanNumber(birthRow.sourceNormalDenominator),
          receiverNormalNumerator: cleanNumber(birthRow.receiverNormalNumerator),
          signedBranchOrientation: cleanNumber(birthRow.signedBranchOrientation),
          directionDotTangent: cleanNumber(birthRow.directionDotTangent),
        }
      : null,
  };
}

// Convergence witness: refine nstep and confirm the chart impulse settles within the
// declared relative tolerance while its sign is fixed.
export function computeConvergenceWitness(options) {
  const nsteps = options.nsteps || [100, 200, 400, 800, 1600];
  const rows = nsteps.map((nstep) => {
    const result = computeChartClickImpulse({ ...options, nstep });
    return { nstep, chartImpulse: result.chartImpulse, sign: result.sign };
  });
  const finest = rows[rows.length - 1].chartImpulse;
  const coarser = rows[rows.length - 2].chartImpulse;
  const relativeDelta = finest !== 0 ? Math.abs((finest - coarser) / finest) : Math.abs(finest - coarser);
  const signs = new Set(rows.map((row) => row.sign));
  return {
    rows,
    converged: relativeDelta <= (options.tolerance ?? DEFAULT_CONVERGENCE_TOLERANCE),
    relativeDelta: cleanNumber(relativeDelta),
    signStable: signs.size === 1,
    convergedSign: rows[rows.length - 1].sign,
  };
}

// Coincidence-regulator (cut-distance) sensitivity witness. The self-hit fold on the
// symmetric channel is born at the coincidence stratum r -> 0 (verified against the
// rigid-rotation reconstruction in fold-crossing-chart-spec.md), so the impulse
// MAGNITUDE grows without bound as the resolved chord d_cut -> 0. The SIGN is
// invariant across every cut. This witness reports both: the sign is regulator-
// independent, the magnitude is coincidence-sensitive.
export function computeCutDistanceSensitivity(options) {
  const cuts = options.cuts || [0.04, 0.02, 0.01, 0.005, 0.0025];
  const rows = cuts.map((cutDistance) => {
    const result = computeChartClickImpulse({ ...options, cutDistance });
    return { cutDistance, chartImpulse: result.chartImpulse, sign: result.sign };
  });
  const signs = new Set(rows.map((row) => row.sign));
  const magnitudes = rows.map((row) => Math.abs(row.chartImpulse));
  let monotoneGrowth = true;
  for (let k = 1; k < magnitudes.length; k += 1) {
    if (magnitudes[k] < magnitudes[k - 1] - 1e-9) {
      monotoneGrowth = false;
    }
  }
  return {
    rows,
    signStableAcrossCuts: signs.size === 1,
    stableSign: rows[0].sign,
    magnitudeGrowsAsCutShrinks: monotoneGrowth,
  };
}

// Regularization-independence witness: the chart impulse is computed with several
// (softening, Jacobian floor, self-hit min-delay) triples fed to the chart path.
// Because the chart path ignores them, the chart impulse must be identical while the
// naive impulse drifts.
export function computeRegularizationInvarianceWitness(options) {
  const grid = options.grid || [
    { softening: 0, jacobianFloor: 0.05, selfHitMinDelay: 0.002 },
    { softening: 0.05, jacobianFloor: 0.2, selfHitMinDelay: 0.05 },
    { softening: 0.1, jacobianFloor: 0.5, selfHitMinDelay: 0.1 },
  ];
  const rows = grid.map((regularization) => {
    const result = computeChartClickImpulse({ ...options, regularization });
    return {
      regularization,
      chartImpulse: result.chartImpulse,
      naiveImpulse: result.naiveImpulse,
      sign: result.sign,
    };
  });
  const chartValues = rows.map((row) => row.chartImpulse);
  const chartSpread = Math.max(...chartValues) - Math.min(...chartValues);
  const naiveValues = rows.map((row) => Math.abs(row.naiveImpulse));
  const naiveSpread = Math.max(...naiveValues) - Math.min(...naiveValues);
  return {
    rows,
    chartImpulseInvariant: chartSpread <= 1e-9,
    chartSpread: cleanNumber(chartSpread),
    naiveImpulseDrifts: naiveSpread > 1e-9,
    naiveSpread: cleanNumber(naiveSpread),
  };
}

// ----------------------------------------------------------------------------
// Synthetic canonical fold worldline (hermetic; used by tests and by the default
// build when the toy is not driven). A planar rotating channel of unit radius whose
// tangential speed ramps linearly through the field speed, reproducing the exact
// fold sign structure of the sea-screened self-hit rows: at the hinge the receiver is
// super-field along the connecting ray (D_T < 0) while its own recent past is still
// sub-field (D_s > 0).
// ----------------------------------------------------------------------------

export function buildSyntheticFoldWorldline(options = {}) {
  const {
    radius = 1,
    betaStart = 0.9,
    rampRate = 0.4,
    dt = DEFAULT_TOY_DT,
    duration = DEFAULT_TOY_DURATION,
  } = options;
  const samples = [];
  let angle = 0;
  const count = Math.round(duration / dt);
  for (let k = 0; k <= count; k += 1) {
    const t = k * dt;
    const beta = betaStart + rampRate * t; // tangential speed / c_f
    const omega = beta / radius;
    const x = [radius * Math.cos(angle), radius * Math.sin(angle), 0];
    const v = [-radius * omega * Math.sin(angle), radius * omega * Math.cos(angle), 0];
    samples.push({ t: cleanNumber(t), x, v });
    angle += omega * dt;
  }
  return samples;
}

// ----------------------------------------------------------------------------
// Toy driving (CLI build only). Runs held-release-causal-wake-toy.mjs and reads back
// the receiver worldline and the naive final-speed ejection magnitude.
// ----------------------------------------------------------------------------

function runToy(args, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  execFileSync("node", [TOY_SCRIPT, ...args, "--out", outDir], {
    stdio: ["ignore", "ignore", "inherit"],
    maxBuffer: 1024 * 1024 * 64,
  });
  return JSON.parse(fs.readFileSync(path.join(outDir, "result.json"), "utf8"));
}

function cleanWorldlineFromToy(surfaceSpeedFraction, outDir, duration = DEFAULT_TOY_DURATION) {
  const result = runToy(
    [
      "--fcc-sea-spacing",
      String(CANDIDATE_A_FCC),
      "--surface-speed-fraction",
      String(surfaceSpeedFraction),
      "--prehistory-mode",
      "moving-prehistory",
      "--duration",
      String(duration),
      "--dt",
      String(DEFAULT_TOY_DT),
      "--sample-every",
      "1",
    ],
    outDir
  );
  const worldline = result.frames.map((frame) => ({
    t: frame.time,
    x: frame.particles[0].position,
    v: frame.particles[0].velocity,
  }));
  return worldline;
}

function naiveEjectionFromToy(surfaceSpeedFraction, regularization, outDir) {
  const result = runToy(
    [
      "--fcc-sea-spacing",
      String(CANDIDATE_A_FCC),
      "--include-self-hits",
      "--surface-speed-fraction",
      String(surfaceSpeedFraction),
      "--prehistory-mode",
      "moving-prehistory",
      "--duration",
      "3",
      "--jacobian-floor",
      String(regularization.jacobianFloor),
      "--self-hit-min-delay",
      String(regularization.selfHitMinDelay),
    ],
    outDir
  );
  return cleanNumber(result.finalMetrics.fieldSpeedRatioMax);
}

// ----------------------------------------------------------------------------
// Authorization and evidence (fail-closed).
// ----------------------------------------------------------------------------

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

export function evaluateFoldCrossingClickImpulseEvidence(candidate) {
  if (candidate?.schema !== SCHEMA) {
    return {
      accepted: false,
      reason: "schema_not_fold_crossing_click_impulse_diagnostic_v0",
      first_missing_field: "fold_crossing_click_impulse_diagnostic.schema",
    };
  }
  return {
    accepted: false,
    reason: "diagnostic_fold_crossing_click_impulse_not_accepted_retained_evidence",
    first_missing_object: SEED_PATH_CERTIFICATE_OBJECT,
    first_missing_field: SEED_PATH_CERTIFICATE_FIELD,
    downstream_producer_boundary: CENTRAL_RETAINED_HISTORY_ROW_BLOCKER,
  };
}

// ----------------------------------------------------------------------------
// Artifact assembly.
// ----------------------------------------------------------------------------

function pumpBand(surfaceSpeedFraction) {
  return {
    beta: surfaceSpeedFraction,
    tangentialPumpLow: cleanNumber(PUMP_BAND_LO_COEFF * surfaceSpeedFraction),
    tangentialPumpHigh: cleanNumber(PUMP_BAND_HI_COEFF * surfaceSpeedFraction),
  };
}

// Diagnostic-only h_act ledger row for one witnessed fold crossing. Reuses the
// existing action-ledger convention (closed-cycle action unit h_act, signed cycle
// increment) without minting a new validator or schema. Every row is fail-closed.
function hActLedgerRow(row, chartResult) {
  const decision =
    chartResult.sign === "absorptive"
      ? "click_absorbs_pumped_tangential_action"
      : chartResult.sign === "ejective"
        ? "click_ejects_pumped_tangential_action"
        : "click_null";
  return {
    row_kind: "h_act_ledger_row",
    diagnostic_only: true,
    run_handle: row.handle,
    surface_speed_fraction: row.surfaceSpeedFraction,
    fold_crossing_id: `fold-crossing:${row.handle}:hinge`,
    hinge_time: chartResult.hingeTime,
    // The click transacts one closed-cycle action unit h_act; sign of the transacted
    // tangential impulse decides the ledger direction of that unit.
    transacted_action_unit: "h_act",
    transacted_cycle_increment: chartResult.sign === "absorptive" ? "-1*h_act" : "+1*h_act",
    tangential_impulse_sign: chartResult.sign,
    tangential_impulse_value: chartResult.chartImpulse,
    absorber_vs_ejector_decision: decision,
    fail_closed: true,
    first_missing_object: SEED_PATH_CERTIFICATE_OBJECT,
    first_missing_field: SEED_PATH_CERTIFICATE_FIELD,
  };
}

export function buildFoldCrossingClickImpulseDiagnostic(options = {}) {
  const rows = options.rows || DEFAULT_ROWS;
  const window = options.window ?? DEFAULT_CHART_WINDOW;
  const nstep = options.nstep ?? DEFAULT_CHART_NSTEP;
  const tolerance = options.tolerance ?? DEFAULT_CONVERGENCE_TOLERANCE;
  const driveToy = options.driveToy === true;
  const naiveGrid = options.naiveGrid || (driveToy ? DEFAULT_NAIVE_REGULARIZATION_GRID : null);

  let tmpDir = null;
  if (driveToy) {
    tmpDir = options.tmpDir || fs.mkdtempSync(path.join(os.tmpdir(), "fold-click-"));
  }

  const rowResults = rows.map((row) => {
    const worldline = driveToy
      ? cleanWorldlineFromToy(row.surfaceSpeedFraction, path.join(tmpDir, `clean-${row.handle}`))
      : (options.worldlineFor
          ? options.worldlineFor(row)
          // Synthetic hermetic channel: gentle ramp so the field-speed hinge sits
          // mid-worldline and the first resolved same-source root reaches back into
          // the sub-field past (D_s > 0) from a super-field receiver (D_T < 0),
          // reproducing the sea-screened rows' fold sign structure.
          : buildSyntheticFoldWorldline({
              betaStart: 0.9 + 0.02 * (row.surfaceSpeedFraction - 0.95) / 0.05,
              rampRate: 0.4,
            }));

    const chart = computeChartClickImpulse({ worldline, window, nstep });
    const convergence = computeConvergenceWitness({ worldline, window, tolerance });
    const invariance = computeRegularizationInvarianceWitness({ worldline, window, nstep });
    const cutSensitivity = computeCutDistanceSensitivity({ worldline, window, nstep });

    // Naive chart-dependent ejection magnitude sweep (recorded 12.4 -> 9.8 -> 10.6).
    let naiveEjectionSweep = null;
    if (driveToy && naiveGrid) {
      naiveEjectionSweep = naiveGrid.map((regularization) => ({
        label: regularization.label,
        jacobianFloor: regularization.jacobianFloor,
        selfHitMinDelay: regularization.selfHitMinDelay,
        finalFieldSpeedRatioMax: naiveEjectionFromToy(
          row.surfaceSpeedFraction,
          regularization,
          path.join(tmpDir, `naive-${row.handle}-${regularization.label}`)
        ),
      }));
    }
    let naiveEjectionSpread = null;
    if (naiveEjectionSweep) {
      const values = naiveEjectionSweep.map((entry) => entry.finalFieldSpeedRatioMax);
      naiveEjectionSpread = cleanNumber(Math.max(...values) - Math.min(...values));
    }

    return {
      run_handle: row.handle,
      surface_speed_fraction: row.surfaceSpeedFraction,
      worldline_source: driveToy ? "held-release-causal-wake-toy" : "synthetic-canonical-fold-channel",
      pump_band: pumpBand(row.surfaceSpeedFraction),
      chart_click_impulse: chart,
      convergence,
      regularization_invariance: invariance,
      coincidence_cut_sensitivity: cutSensitivity,
      naive_ejection_sweep: naiveEjectionSweep,
      naive_ejection_spread: naiveEjectionSpread,
      h_act_ledger_row: hActLedgerRow(row, chart),
    };
  });

  if (driveToy && !options.tmpDir && tmpDir) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  // Aggregate decision. The proof-moving quantity is the branch-orientation SIGN, which
  // is regulator-independent; the magnitude is coincidence-sensitive (the fold births at
  // the coincidence stratum, confirming fold-crossing-chart-spec.md), so no regulator-
  // independent magnitude exists. The sign refines the rigid-rotation m=1 reconstruction:
  // on the actual accelerating worldline the receiver crosses field speed ahead of its
  // own past, so D_T < 0 < D_s and m < 0.
  const signs = new Set(rowResults.map((row) => row.chart_click_impulse.sign));
  const signStable = rowResults.every((row) => row.coincidence_cut_sensitivity.signStableAcrossCuts);
  const magnitudeCoincidenceSensitive = rowResults.every(
    (row) => row.coincidence_cut_sensitivity.magnitudeGrowsAsCutShrinks
  );
  const allRegInvariant = rowResults.every((row) => row.regularization_invariance.chartImpulseInvariant);
  let mechanismDecision;
  if (signs.size === 1 && signs.has("absorptive") && signStable) {
    mechanismDecision =
      "absorptive_branch_orientation_sign_regulator_independent_magnitude_coincidence_sensitive_refines_rigid_rotation_m_equals_one";
  } else if (signs.size === 1 && signs.has("ejective") && signStable) {
    mechanismDecision = "ejective_branch_orientation_sign_regulator_independent";
  } else {
    mechanismDecision = "branch_orientation_sign_not_resolved_negative_recorded";
  }
  const allConverged = rowResults.every((row) => row.convergence.converged && row.convergence.signStable);
  const allInvariant = allRegInvariant;

  const artifact = {
    schema: SCHEMA,
    authority_class: AUTHORITY_CLASS,
    claim_level: "diagnostic_only",
    candidate_a_fcc: CANDIDATE_A_FCC,
    kernel: { fieldSpeed: FIELD_SPEED, coupling: COUPLING, sameSourcePolarityProduct: SAME_SOURCE_POLARITY_PRODUCT },
    chart_definition:
      "signed branch orientation m = D_T / D_s on the canonical fold-set chart, exact D_s (no Jacobian floor), no softening, no self-hit minimum delay, measured on the actual accelerating worldline (distinct reception and emission velocities)",
    relation_to_fold_crossing_chart_spec:
      "verifies and refines fold-crossing-chart-spec.md: confirms the fold births at the coincidence stratum so the impulse magnitude is regulator-dependent (no chart-defined magnitude), but corrects the rigid-rotation m=1 branch orientation. The fixed-beta rigid rotation freezes the tangential speed the pump is changing; on the actual accelerating crossing the receiver crosses field speed ahead of its own past, so D_T < 0 < D_s and the branch orientation sign is absorptive, regulator-independently.",
    sign_result: {
      proof_moving_quantity: "branch_orientation_sign",
      sign: signs.size === 1 ? [...signs][0] : "mixed",
      regulator_independent: signStable,
      independent_of: ["softening", "jacobian_floor", "self_hit_minimum_delay", "coincidence_cut_distance"],
    },
    magnitude_result: {
      regulator_independent: false,
      depends_on: ["coincidence_spatial_regulator_cut_distance"],
      note: "fold born at coincidence stratum; magnitude grows as the resolved chord shrinks. Set by the point-transceiver spatial self-regularization, not by the fold parameters.",
    },
    depends_on_kernel_inputs: [
      "coupling",
      "same_source_polarity_product",
      "source_normal_denominator_sign",
      "receiver_normal_numerator_sign",
      "tangential_unit_vector",
    ],
    provably_independent_of: ["softening", "jacobian_floor", "self_hit_minimum_delay"],
    rows: rowResults,
    mechanism_decision: mechanismDecision,
    all_rows_sign_stable: signStable,
    magnitude_coincidence_sensitive: magnitudeCoincidenceSensitive,
    all_rows_converged: allConverged,
    all_rows_regularization_invariant: allInvariant,
    authorization: buildFailClosedAuthorization(),
    evidence: evaluateFoldCrossingClickImpulseEvidence({ schema: SCHEMA }),
  };
  artifact.artifact_hash = stableHash({ ...artifact, artifact_hash: undefined });
  return artifact;
}

// ----------------------------------------------------------------------------
// CLI.
// ----------------------------------------------------------------------------

function parseArgs(args) {
  const stringOption = (name) =>
    args.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3) ?? null;
  const numberOption = (name) => {
    const value = stringOption(name);
    return value == null ? undefined : Number(value);
  };
  return {
    pretty: args.includes("--pretty"),
    driveToy: args.includes("--drive-toy"),
    window: numberOption("window"),
    nstep: numberOption("nstep"),
    tolerance: numberOption("tolerance"),
  };
}

function printUsage() {
  console.log(
    `Usage: node ${fileURLToPath(import.meta.url)} [--pretty] [--drive-toy] [--window=<number>] [--nstep=<int>] [--tolerance=<number>]\n` +
      "  --drive-toy   run held-release-causal-wake-toy.mjs to build worldlines from the real sea-screened rows\n" +
      "                and reproduce the naive regularization-dependent ejection sweep (slow).\n" +
      "  default       hermetic synthetic canonical fold channel (fast)."
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    printUsage();
    process.exit(0);
  }
  const options = parseArgs(process.argv.slice(2));
  const artifact = buildFoldCrossingClickImpulseDiagnostic(options);
  console.log(JSON.stringify(artifact, null, options.pretty ? 2 : 0));
}
