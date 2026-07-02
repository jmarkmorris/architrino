import crypto from "node:crypto";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

import { buildOblateSpheroidReducedResidualRow } from "./oblate-spheroid-reduced-residual-row.mjs";
import { buildOblateSpheroidFixedFrequencyReturnMarginRow } from "./oblate-spheroid-fixed-frequency-return-margin-row.mjs";

export const SCHEMA = "oblate_spheroid_two_speed_deformation_sweep.v0";
export const FIRST_MISSING_OBJECT = "same_record_retained_root_ledger_for_two_speed_deformation_sweep";
export const FIRST_MISSING_FIELD = "oblate_spheroid_two_speed_deformation_sweep.rows[*].root_ledger_status.retained_root_ledger_ref";

const DEFAULT_U_VALUES = Object.freeze([0, 0.1, 0.2, 0.3, 0.4, 0.5]);
const DEFAULT_V_ORB_VALUES = Object.freeze([0.1, 0.2, 0.3, 0.4, 0.5, 0.6]);
const DEFAULT_GROUP_DIRECTION = Object.freeze([1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)]);
const DEFAULT_BETA_STAR = 0.8;
const DEFAULT_R_PERP = 1;
const DEFAULT_ZETA = 1 / Math.sqrt(3);
const DEFAULT_FIELD_SPEED = 1;
const DEFAULT_COUPLING = 1 / 36;
const DEFAULT_SOFTENING = 0.05;
const DEFAULT_SAMPLE_COUNT = 6;
const DEFAULT_ROOT_SAMPLES = 240;
const DEFAULT_ROOT_PERIODS = 2;
const DEFAULT_RESIDUAL_THRESHOLD = 0.15;
const DEFAULT_RETURN_PROBE_PERIODS = 1;
const DEFAULT_RETURN_PROBE_STEPS_PER_PERIOD = 120;
const DEFAULT_RETURN_PROBE_ROOT_SAMPLES = 80;
const DEFAULT_RETURN_PROBE_HISTORY_PERIODS = 2;
const DEFAULT_RETURN_PROBE_HISTORY_STEPS_PER_PERIOD = 120;
const DEFAULT_RETURN_PROBE_POSITION_TOLERANCE = 0.1;
const DEFAULT_RETURN_PROBE_VELOCITY_TOLERANCE = 0.1;
const DEFAULT_RETURN_PROBE_RADIUS_TOLERANCE = 0.1;
const DEFAULT_RETURN_PROBE_CANDIDATE_LIMIT = 8;
const EPSILON = 1e-12;
const ACTION_DRIFT_PREFILTER_WEIGHT = 0.1;
const BETA_MAX_PREFILTER_WEIGHT = 0.5;
const RESIDUAL_PREFILTER_WEIGHT = 1;
const PAIR_OFFSETS = Object.freeze([0, (2 * Math.PI) / 3, (4 * Math.PI) / 3]);

const AUTHORIZATION_FLAGS = Object.freeze([
  "accepted_same_record_evidence",
  "two_speed_deformation_sweep",
  "retainedBranchClaim",
  "acceptedSameLevelBranchClaim",
  "preferred_configuration_claim",
  "accepted_transition_source",
  "moving_retained_branch_certificate",
  "same_ledger_action_measure_row",
  "bounded_speed_live_ledger",
  "receiver_normal_branch_strength",
]);

export const NEGATIVE_CONTROL_REASONS = Object.freeze({
  fixture: "fixture_not_accepted_two_speed_deformation_sweep_evidence",
  diagnostic: "diagnostic_not_accepted_two_speed_deformation_sweep_evidence",
  priority_prose: "priority_prose_not_accepted_two_speed_deformation_sweep_evidence",
  generated_decoy: "generated_decoy_not_accepted_two_speed_deformation_sweep_evidence",
  proxy_row: "proxy_row_not_accepted_two_speed_deformation_sweep_evidence",
  aggregate_row: "aggregate_row_not_same_record_two_speed_deformation_sweep_evidence",
  display_fit: "display_fit_not_retained_branch_two_speed_deformation_sweep_evidence",
});

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function normalizeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizePositiveNumber(value, fallback) {
  const number = normalizeNumber(value, fallback);
  return number > 0 ? number : fallback;
}

function uniqueSortedNumbers(values, fallback) {
  const source = Array.isArray(values) && values.length > 0 ? values : fallback;
  return [...new Set(source.map((value) => Number(value)).filter((value) => Number.isFinite(value) && value >= 0))]
    .sort((left, right) => left - right);
}

function parseNumberList(value, fallback) {
  if (value == null || value === "") {
    return [...fallback];
  }
  return uniqueSortedNumbers(String(value).split(",").map((entry) => entry.trim()), fallback);
}

function normalizeVector(value, fallback) {
  if (!Array.isArray(value) || value.length !== 3) {
    return [...fallback];
  }
  return value.map((entry, index) => normalizeNumber(entry, fallback[index]));
}

function norm(vector) {
  return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
}

function addVectors(left, right) {
  return left.map((value, index) => value + right[index]);
}

function subtractVectors(left, right) {
  return left.map((value, index) => value - right[index]);
}

function scaleVector(vector, scale) {
  return vector.map((value) => value * scale);
}

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function rms(values) {
  return Math.sqrt(values.reduce((sum, value) => sum + value * value, 0) / Math.max(1, values.length));
}

function finiteOrNull(value) {
  return Number.isFinite(value) ? value : null;
}

function normalizeDirection(value) {
  const vector = normalizeVector(value, DEFAULT_GROUP_DIRECTION);
  const length = norm(vector);
  return length <= EPSILON ? [...DEFAULT_GROUP_DIRECTION] : scaleVector(vector, 1 / length);
}

function max(values) {
  return Math.max(...values);
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function makeChiForMode(u, options) {
  if (options.chiMode === "fixed") {
    return options.fixedChi;
  }
  return Math.max(1e-6, Math.sqrt(Math.max(0, 1 - u * u)));
}

function getPhasePeriod(fixedFrequencyArtifact, closureLevel) {
  return fixedFrequencyArtifact.fixed_frequency_residual_rows.find(
    (row) => row.schema === "oblate_spheroid_phase_closure_period_row.v0" && row.closure_level === closureLevel
  )?.period ?? null;
}

function computeActionProxy(oblateArtifact, period, actionUnit) {
  if (period == null || period <= 0) {
    return {
      action_proxy: null,
      action_units: null,
      nearest_action_integer: null,
      action_drift_to_nearest_h: null,
    };
  }
  const centerSpeedSquares = oblateArtifact.kinematic_rows.map((row) => {
    const speed = norm(row.center_frame_velocity);
    return speed * speed;
  });
  const actionProxy = centerSpeedSquares.reduce((sum, value) => sum + value, 0) * period;
  const units = actionProxy / actionUnit;
  const nearestInteger = Math.max(1, Math.round(units));
  return {
    action_proxy: actionProxy,
    action_units: units,
    nearest_action_integer: nearestInteger,
    action_drift_to_nearest_h: Math.abs(units - nearestInteger),
  };
}

function makeParticleStates(params, time) {
  const states = [];
  const phase = params.omega * time;
  const radialScale = params.RPerp * Math.sqrt(1 - params.zeta * params.zeta);
  const z = params.RParallel * params.zeta;
  const center = scaleVector(params.groupVelocity, time);
  for (let pairIndex = 0; pairIndex < PAIR_OFFSETS.length; pairIndex += 1) {
    const theta = phase + PAIR_OFFSETS[pairIndex];
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);
    const bodyPosition = [radialScale * cosTheta, radialScale * sinTheta, z];
    const bodyVelocity = [-radialScale * params.omega * sinTheta, radialScale * params.omega * cosTheta, 0];
    const bodyAcceleration = [
      -radialScale * params.omega * params.omega * cosTheta,
      -radialScale * params.omega * params.omega * sinTheta,
      0,
    ];
    for (const role of ["P", "E"]) {
      const sign = role === "P" ? 1 : -1;
      const centerFramePosition = scaleVector(bodyPosition, sign);
      const centerFrameVelocity = scaleVector(bodyVelocity, sign);
      const centerFrameAcceleration = scaleVector(bodyAcceleration, sign);
      states.push({
        id: `${role}:${pairIndex}`,
        q: sign,
        pairIndex,
        role,
        centerFramePosition,
        centerFrameVelocity,
        centerFrameAcceleration,
        position: addVectors(center, centerFramePosition),
        velocity: addVectors(params.groupVelocity, centerFrameVelocity),
        acceleration: centerFrameAcceleration,
      });
    }
  }
  return states;
}

function causalResidual(receiver, source, params, time, tau) {
  const sourceState = makeParticleStates(params, time - tau).find((state) => state.id === source.id);
  return norm(subtractVectors(receiver.position, sourceState.position)) - tau;
}

function bisectRoot(receiver, source, params, time, lo, hi) {
  let left = lo;
  let right = hi;
  let fLeft = causalResidual(receiver, source, params, time, left);
  for (let index = 0; index < 48; index += 1) {
    const mid = 0.5 * (left + right);
    const fMid = causalResidual(receiver, source, params, time, mid);
    if (Math.abs(fMid) <= 1e-10) {
      return mid;
    }
    if (Math.sign(fLeft) === Math.sign(fMid)) {
      left = mid;
      fLeft = fMid;
    } else {
      right = mid;
    }
  }
  return 0.5 * (left + right);
}

function findCausalRoots(receiver, source, params, time) {
  const roots = [];
  const tauMax = Math.max(4, params.rootPeriods * params.period + 4);
  const step = tauMax / params.rootSamples;
  let previousTau = EPSILON;
  let previousValue = causalResidual(receiver, source, params, time, previousTau);

  for (let sample = 1; sample <= params.rootSamples; sample += 1) {
    const tau = sample * step;
    const value = causalResidual(receiver, source, params, time, tau);
    if (Number.isFinite(previousValue) && Number.isFinite(value)) {
      if (Math.abs(value) <= 1e-8) {
        roots.push(tau);
      } else if (Math.sign(previousValue) !== Math.sign(value)) {
        roots.push(bisectRoot(receiver, source, params, time, previousTau, tau));
      }
    }
    previousTau = tau;
    previousValue = value;
  }

  const deduped = [];
  for (const root of roots.sort((left, right) => left - right)) {
    if (root > 1e-6 && (deduped.length === 0 || Math.abs(root - deduped[deduped.length - 1]) > 1e-5)) {
      deduped.push(root);
    }
  }
  return deduped;
}

function evaluateSampledResidual(params) {
  const sampleRows = [];
  let residualSquaredSum = 0;
  let ansatzSquaredSum = 0;
  let wakeSquaredSum = 0;
  let residualCount = 0;
  let directedPartnerPairs = 0;
  let directedPartnerPairsWithRoots = 0;
  let directedSelfPairs = 0;
  let directedSelfPairsWithRoots = 0;
  let totalRoots = 0;
  let minSourceNormal = Infinity;
  let minReceiverNormal = Infinity;
  let maxBranchWeight = 0;
  let maxFieldSpeed = 0;

  for (let sampleIndex = 0; sampleIndex < params.sampleCount; sampleIndex += 1) {
    const time = params.period * sampleIndex / params.sampleCount;
    const receivers = makeParticleStates(params, time);
    for (const state of receivers) {
      maxFieldSpeed = Math.max(maxFieldSpeed, norm(state.velocity));
    }
    const wakeAccelerations = receivers.map(() => [0, 0, 0]);
    const rootCounts = [];

    for (let receiverIndex = 0; receiverIndex < receivers.length; receiverIndex += 1) {
      const receiver = receivers[receiverIndex];
      for (const source of receivers) {
        const sameSource = receiver.id === source.id;
        if (sameSource) {
          directedSelfPairs += 1;
        } else {
          directedPartnerPairs += 1;
        }
        const roots = findCausalRoots(receiver, source, params, time);
        rootCounts.push(roots.length);
        if (roots.length > 0 && sameSource) {
          directedSelfPairsWithRoots += 1;
        }
        if (roots.length > 0 && !sameSource) {
          directedPartnerPairsWithRoots += 1;
        }

        for (const tau of roots) {
          const sourceState = makeParticleStates(params, time - tau).find((state) => state.id === source.id);
          const displacement = subtractVectors(receiver.position, sourceState.position);
          const distance = norm(displacement);
          if (distance <= EPSILON) {
            continue;
          }
          const direction = scaleVector(displacement, 1 / distance);
          const sourceNormal = DEFAULT_FIELD_SPEED - dot(sourceState.velocity, direction);
          const receiverNormal = DEFAULT_FIELD_SPEED - dot(receiver.velocity, direction);
          const branchWeight = Math.abs(receiverNormal) / Math.max(EPSILON, Math.abs(sourceNormal));
          const denominator = Math.pow(distance * distance + params.softening * params.softening, 1.5);
          const coefficient = params.coupling * receiver.q * source.q * branchWeight / denominator;
          wakeAccelerations[receiverIndex] = addVectors(
            wakeAccelerations[receiverIndex],
            scaleVector(displacement, coefficient)
          );
          minSourceNormal = Math.min(minSourceNormal, sourceNormal);
          minReceiverNormal = Math.min(minReceiverNormal, receiverNormal);
          maxBranchWeight = Math.max(maxBranchWeight, branchWeight);
          totalRoots += 1;
        }
      }
    }

    const residualNorms = receivers.map((receiver, index) => {
      const residual = subtractVectors(wakeAccelerations[index], receiver.acceleration);
      const residualNorm = norm(residual);
      const ansatzNorm = norm(receiver.acceleration);
      const wakeNorm = norm(wakeAccelerations[index]);
      residualSquaredSum += residualNorm * residualNorm;
      ansatzSquaredSum += ansatzNorm * ansatzNorm;
      wakeSquaredSum += wakeNorm * wakeNorm;
      residualCount += 1;
      return residualNorm;
    });

    sampleRows.push({
      sample_index: sampleIndex,
      time,
      max_residual_norm: max(residualNorms),
      mean_residual_norm: mean(residualNorms),
      min_root_count: Math.min(...rootCounts),
      max_root_count: Math.max(...rootCounts),
    });
  }

  const rmsResidual = Math.sqrt(residualSquaredSum / Math.max(1, residualCount));
  const rmsAnsatz = Math.sqrt(ansatzSquaredSum / Math.max(1, residualCount));
  const rmsWake = Math.sqrt(wakeSquaredSum / Math.max(1, residualCount));
  const normalizedResidual = rmsResidual / Math.max(EPSILON, rmsAnsatz + rmsWake);
  const partnerCoverage = directedPartnerPairsWithRoots / Math.max(1, directedPartnerPairs);
  const selfCoverage = directedSelfPairsWithRoots / Math.max(1, directedSelfPairs);
  const rootBudgetMargin = Math.min(
    minSourceNormal === Infinity ? 0 : minSourceNormal,
    minReceiverNormal === Infinity ? 0 : minReceiverNormal,
    DEFAULT_FIELD_SPEED - maxFieldSpeed
  );

  return {
    schema: "oblate_spheroid_sampled_wake_residual_diagnostic.v0",
    sample_count: params.sampleCount,
    root_samples: params.rootSamples,
    root_periods: params.rootPeriods,
    rms_residual: rmsResidual,
    rms_ansatz_acceleration: rmsAnsatz,
    rms_wake_acceleration: rmsWake,
    normalized_residual: normalizedResidual,
    residual_threshold: params.residualThreshold,
    residual_pass: normalizedResidual <= params.residualThreshold,
    total_roots: totalRoots,
    directed_partner_pairs: directedPartnerPairs,
    directed_partner_pairs_with_roots: directedPartnerPairsWithRoots,
    directed_partner_root_coverage: partnerCoverage,
    directed_self_pairs: directedSelfPairs,
    directed_self_pairs_with_roots: directedSelfPairsWithRoots,
    directed_self_root_coverage: selfCoverage,
    min_source_normal: minSourceNormal === Infinity ? null : minSourceNormal,
    min_receiver_normal: minReceiverNormal === Infinity ? null : minReceiverNormal,
    max_branch_weight: maxBranchWeight,
    max_field_speed: maxFieldSpeed,
    root_budget_margin: rootBudgetMargin,
    positive_root_budget_margin: rootBudgetMargin > 0,
    sample_rows: sampleRows,
  };
}

function snapshotParticleState(time, particles) {
  return {
    time,
    particles: particles.map((particle) => ({
      id: particle.id,
      q: particle.q,
      position: [...particle.position],
      velocity: [...particle.velocity],
    })),
  };
}

function interpolateHistoryParticle(history, particleIndex, time) {
  if (history.length === 0 || time < history[0].time - EPSILON || time > history[history.length - 1].time + EPSILON) {
    return null;
  }
  if (Math.abs(time - history[0].time) <= EPSILON) {
    return history[0].particles[particleIndex];
  }
  if (Math.abs(time - history[history.length - 1].time) <= EPSILON) {
    return history[history.length - 1].particles[particleIndex];
  }

  let lo = 0;
  let hi = history.length - 1;
  while (hi - lo > 1) {
    const mid = Math.floor((lo + hi) / 2);
    if (history[mid].time <= time) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  const left = history[lo];
  const right = history[hi];
  const span = right.time - left.time;
  if (span <= EPSILON) {
    return left.particles[particleIndex];
  }
  const fraction = Math.max(0, Math.min(1, (time - left.time) / span));
  const leftParticle = left.particles[particleIndex];
  const rightParticle = right.particles[particleIndex];
  return {
    id: leftParticle.id,
    q: leftParticle.q,
    position: leftParticle.position.map((value, index) => value + fraction * (rightParticle.position[index] - value)),
    velocity: leftParticle.velocity.map((value, index) => value + fraction * (rightParticle.velocity[index] - value)),
  };
}

function causalHistoryResidual(receiver, sourceIndex, params, time, tau, history) {
  const sourceState = interpolateHistoryParticle(history, sourceIndex, time - tau);
  if (sourceState == null) {
    return null;
  }
  return norm(subtractVectors(receiver.position, sourceState.position)) - tau;
}

function bisectHistoryRoot(receiver, sourceIndex, params, time, history, lo, hi) {
  let left = lo;
  let right = hi;
  let fLeft = causalHistoryResidual(receiver, sourceIndex, params, time, left, history);
  for (let index = 0; index < 40; index += 1) {
    const mid = 0.5 * (left + right);
    const fMid = causalHistoryResidual(receiver, sourceIndex, params, time, mid, history);
    if (fMid == null || fLeft == null) {
      return null;
    }
    if (Math.abs(fMid) <= 1e-9) {
      return mid;
    }
    if (Math.sign(fLeft) === Math.sign(fMid)) {
      left = mid;
      fLeft = fMid;
    } else {
      right = mid;
    }
  }
  return 0.5 * (left + right);
}

function findHistoryCausalRoots(receiver, sourceIndex, params, time, history, options) {
  const historyDepth = time - history[0].time;
  const tauMax = Math.min(historyDepth, Math.max(4, params.rootPeriods * params.period + 4));
  const tauMin = receiver.index === sourceIndex && options.returnProbeIncludeSelfHits
    ? Math.max(EPSILON, options.returnProbeSelfHitMinDelay)
    : EPSILON;
  if (tauMax <= tauMin) {
    return [];
  }
  const roots = [];
  const step = (tauMax - tauMin) / options.returnProbeRootSamples;
  let previousTau = tauMin;
  let previousValue = causalHistoryResidual(receiver, sourceIndex, params, time, previousTau, history);

  for (let sample = 1; sample <= options.returnProbeRootSamples; sample += 1) {
    const tau = tauMin + sample * step;
    const value = causalHistoryResidual(receiver, sourceIndex, params, time, tau, history);
    if (previousValue != null && value != null && Number.isFinite(previousValue) && Number.isFinite(value)) {
      if (Math.abs(value) <= 1e-8) {
        roots.push(tau);
      } else if (Math.sign(previousValue) !== Math.sign(value)) {
        const root = bisectHistoryRoot(receiver, sourceIndex, params, time, history, previousTau, tau);
        if (root != null) {
          roots.push(root);
        }
      }
    }
    previousTau = tau;
    previousValue = value;
  }

  const deduped = [];
  for (const root of roots.sort((left, right) => left - right)) {
    if (root > tauMin && (deduped.length === 0 || Math.abs(root - deduped[deduped.length - 1]) > 1e-5)) {
      deduped.push(root);
    }
  }
  return deduped;
}

function evaluateDynamicWakeAccelerations(state, history, params, options) {
  const accelerations = state.particles.map(() => [0, 0, 0]);
  const stats = {
    directedPartnerPairs: 0,
    directedPartnerPairsWithRoots: 0,
    directedSelfPairs: 0,
    directedSelfPairsWithRoots: 0,
    totalRoots: 0,
    missingPartnerRoots: 0,
    missingSelfRoots: 0,
    minSourceNormal: Infinity,
    minReceiverNormal: Infinity,
    maxBranchWeight: 0,
  };

  for (let receiverIndex = 0; receiverIndex < state.particles.length; receiverIndex += 1) {
    const receiver = { ...state.particles[receiverIndex], index: receiverIndex };
    for (let sourceIndex = 0; sourceIndex < state.particles.length; sourceIndex += 1) {
      const sameSource = receiverIndex === sourceIndex;
      if (sameSource && !options.returnProbeIncludeSelfHits) {
        continue;
      }
      if (sameSource) {
        stats.directedSelfPairs += 1;
      } else {
        stats.directedPartnerPairs += 1;
      }

      const roots = findHistoryCausalRoots(receiver, sourceIndex, params, state.time, history, options);
      if (roots.length === 0) {
        if (sameSource) {
          stats.missingSelfRoots += 1;
        } else {
          stats.missingPartnerRoots += 1;
        }
      } else if (sameSource) {
        stats.directedSelfPairsWithRoots += 1;
      } else {
        stats.directedPartnerPairsWithRoots += 1;
      }

      for (const tau of roots) {
        const sourceState = interpolateHistoryParticle(history, sourceIndex, state.time - tau);
        if (sourceState == null) {
          continue;
        }
        const displacement = subtractVectors(receiver.position, sourceState.position);
        const distance = norm(displacement);
        if (distance <= EPSILON) {
          continue;
        }
        const direction = scaleVector(displacement, 1 / distance);
        const sourceNormal = DEFAULT_FIELD_SPEED - dot(sourceState.velocity, direction);
        const receiverNormal = DEFAULT_FIELD_SPEED - dot(receiver.velocity, direction);
        const branchWeight = Math.abs(receiverNormal) / Math.max(EPSILON, Math.abs(sourceNormal));
        const denominator = Math.pow(distance * distance + params.softening * params.softening, 1.5);
        const coefficient = params.coupling * receiver.q * sourceState.q * branchWeight / denominator;
        accelerations[receiverIndex] = addVectors(accelerations[receiverIndex], scaleVector(displacement, coefficient));
        stats.minSourceNormal = Math.min(stats.minSourceNormal, sourceNormal);
        stats.minReceiverNormal = Math.min(stats.minReceiverNormal, receiverNormal);
        stats.maxBranchWeight = Math.max(stats.maxBranchWeight, branchWeight);
        stats.totalRoots += 1;
      }
    }
  }

  return { accelerations, stats };
}

function centerFrameMetrics(state, params, initialCenterFrameRows) {
  const center = scaleVector(params.groupVelocity, state.time);
  const radii = [];
  const radialVelocities = [];
  const positionReturnErrors = [];
  const velocityReturnErrors = [];
  const fieldSpeeds = [];

  for (let index = 0; index < state.particles.length; index += 1) {
    const particle = state.particles[index];
    const centerFramePosition = subtractVectors(particle.position, center);
    const centerFrameVelocity = subtractVectors(particle.velocity, params.groupVelocity);
    const radius = norm(centerFramePosition);
    radii.push(radius);
    radialVelocities.push(radius <= EPSILON ? 0 : dot(centerFramePosition, centerFrameVelocity) / radius);
    positionReturnErrors.push(norm(subtractVectors(centerFramePosition, initialCenterFrameRows[index].position)));
    velocityReturnErrors.push(norm(subtractVectors(centerFrameVelocity, initialCenterFrameRows[index].velocity)));
    fieldSpeeds.push(norm(particle.velocity));
  }

  return {
    radius_mean: mean(radii),
    radius_std: rms(radii.map((radius) => radius - mean(radii))),
    radial_velocity_mean: mean(radialVelocities),
    position_return_rms: rms(positionReturnErrors),
    velocity_return_rms: rms(velocityReturnErrors),
    max_field_speed: max(fieldSpeeds),
  };
}

function firstFailedReturnCondition(checks) {
  const entries = [
    ["field_speed_sub_cf", checks.field_speed_sub_cf],
    ["positive_root_budget_margin", checks.positive_root_budget_margin],
    ["partner_root_coverage_complete", checks.partner_root_coverage_complete],
    ["radius_support_within_tolerance", checks.radius_support_within_tolerance],
    ["position_return_within_tolerance", checks.position_return_within_tolerance],
    ["velocity_return_within_tolerance", checks.velocity_return_within_tolerance],
  ];
  return entries.find(([, pass]) => !pass)?.[0] ?? null;
}

function evaluateDynamicReturnProbe(params, options) {
  const duration = params.period * options.returnProbePeriods;
  const stepCount = Math.max(1, Math.round(options.returnProbeStepsPerPeriod * options.returnProbePeriods));
  const dt = duration / stepCount;
  const historyDuration = params.period * options.returnProbeHistoryPeriods + 4;
  const prehistoryStepCount = Math.max(
    2,
    Math.round(options.returnProbeHistoryStepsPerPeriod * options.returnProbeHistoryPeriods)
  );
  const history = [];
  for (let index = 0; index < prehistoryStepCount; index += 1) {
    const time = -historyDuration + index * (historyDuration / prehistoryStepCount);
    history.push(snapshotParticleState(time, makeParticleStates(params, time)));
  }

  const initialParticles = makeParticleStates(params, 0);
  const initialCenterFrameRows = initialParticles.map((particle) => ({
    position: [...particle.centerFramePosition],
    velocity: [...particle.centerFrameVelocity],
  }));
  const initialMetrics = centerFrameMetrics(
    { time: 0, particles: initialParticles.map((particle) => ({ ...particle })) },
    params,
    initialCenterFrameRows
  );
  const state = {
    time: 0,
    particles: initialParticles.map((particle) => ({
      id: particle.id,
      q: particle.q,
      position: [...particle.position],
      velocity: [...particle.velocity],
    })),
  };
  history.push(snapshotParticleState(0, state.particles));

  let maxRadiusMeanDeviation = 0;
  let maxRadiusStd = initialMetrics.radius_std;
  let maxFieldSpeed = initialMetrics.max_field_speed;
  let minSourceNormal = Infinity;
  let minReceiverNormal = Infinity;
  let maxBranchWeight = 0;
  let totalRoots = 0;
  let directedPartnerPairs = 0;
  let directedPartnerPairsWithRoots = 0;
  let directedSelfPairs = 0;
  let directedSelfPairsWithRoots = 0;
  let missingPartnerRoots = 0;
  let missingSelfRoots = 0;

  for (let step = 0; step < stepCount; step += 1) {
    const { accelerations, stats } = evaluateDynamicWakeAccelerations(state, history, params, options);
    minSourceNormal = Math.min(minSourceNormal, stats.minSourceNormal);
    minReceiverNormal = Math.min(minReceiverNormal, stats.minReceiverNormal);
    maxBranchWeight = Math.max(maxBranchWeight, stats.maxBranchWeight);
    totalRoots += stats.totalRoots;
    directedPartnerPairs += stats.directedPartnerPairs;
    directedPartnerPairsWithRoots += stats.directedPartnerPairsWithRoots;
    directedSelfPairs += stats.directedSelfPairs;
    directedSelfPairsWithRoots += stats.directedSelfPairsWithRoots;
    missingPartnerRoots += stats.missingPartnerRoots;
    missingSelfRoots += stats.missingSelfRoots;

    for (let index = 0; index < state.particles.length; index += 1) {
      const particle = state.particles[index];
      particle.velocity = addVectors(particle.velocity, scaleVector(accelerations[index], dt));
      particle.position = addVectors(particle.position, scaleVector(particle.velocity, dt));
    }
    state.time += dt;
    history.push(snapshotParticleState(state.time, state.particles));

    const metrics = centerFrameMetrics(state, params, initialCenterFrameRows);
    maxFieldSpeed = Math.max(maxFieldSpeed, metrics.max_field_speed);
    maxRadiusStd = Math.max(maxRadiusStd, metrics.radius_std);
    maxRadiusMeanDeviation = Math.max(
      maxRadiusMeanDeviation,
      Math.abs(metrics.radius_mean - initialMetrics.radius_mean)
    );
  }

  const finalMetrics = centerFrameMetrics(state, params, initialCenterFrameRows);
  const rootBudgetMargin = Math.min(
    minSourceNormal === Infinity ? 0 : minSourceNormal,
    minReceiverNormal === Infinity ? 0 : minReceiverNormal,
    DEFAULT_FIELD_SPEED - maxFieldSpeed
  );
  const checks = {
    field_speed_sub_cf: maxFieldSpeed < DEFAULT_FIELD_SPEED,
    positive_root_budget_margin: rootBudgetMargin > 0,
    partner_root_coverage_complete: missingPartnerRoots === 0,
    position_return_within_tolerance: finalMetrics.position_return_rms <= options.returnProbePositionTolerance,
    velocity_return_within_tolerance: finalMetrics.velocity_return_rms <= options.returnProbeVelocityTolerance,
    radius_support_within_tolerance: maxRadiusMeanDeviation <= options.returnProbeRadiusTolerance,
  };
  const stableSupportRadiusObserved =
    checks.field_speed_sub_cf && checks.positive_root_budget_margin && checks.radius_support_within_tolerance;
  const boundedReturnObserved =
    stableSupportRadiusObserved &&
    checks.partner_root_coverage_complete &&
    checks.position_return_within_tolerance &&
    checks.velocity_return_within_tolerance;

  return {
    schema: "oblate_spheroid_dynamic_return_probe.v0",
    authority_class: "priority_only_dynamic_probe_not_retained_history_evidence",
    periods: options.returnProbePeriods,
    step_count: stepCount,
    dt,
    root_samples: options.returnProbeRootSamples,
    history_periods: options.returnProbeHistoryPeriods,
    include_self_hits: options.returnProbeIncludeSelfHits,
    initial_metrics: initialMetrics,
    final_metrics: finalMetrics,
    max_radius_mean_deviation: maxRadiusMeanDeviation,
    max_radius_std: maxRadiusStd,
    max_field_speed: maxFieldSpeed,
    root_budget_margin: rootBudgetMargin,
    min_source_normal: finiteOrNull(minSourceNormal),
    min_receiver_normal: finiteOrNull(minReceiverNormal),
    max_branch_weight: maxBranchWeight,
    total_roots: totalRoots,
    directed_partner_root_coverage: directedPartnerPairsWithRoots / Math.max(1, directedPartnerPairs),
    directed_self_root_coverage: directedSelfPairsWithRoots / Math.max(1, directedSelfPairs),
    missing_partner_roots: missingPartnerRoots,
    missing_self_roots: missingSelfRoots,
    tolerances: {
      position_return_rms: options.returnProbePositionTolerance,
      velocity_return_rms: options.returnProbeVelocityTolerance,
      radius_mean_deviation: options.returnProbeRadiusTolerance,
    },
    checks,
    bounded_return_observed: boundedReturnObserved,
    stable_support_radius_observed: stableSupportRadiusObserved,
    first_return_blocker: firstFailedReturnCondition(checks),
  };
}

function buildSweepRow(rowPrefix, options, u, vOrb) {
  const groupVelocity = scaleVector(options.groupDirection, u);
  const chi = makeChiForMode(u, options);
  const orbitalRadius = options.RPerp * Math.sqrt(1 - options.zeta * options.zeta);
  const omega = orbitalRadius <= EPSILON ? 0 : vOrb / orbitalRadius;
  const period = omega === 0 ? null : 2 * Math.PI / Math.abs(omega);
  const oblateArtifact = buildOblateSpheroidReducedResidualRow({
    groupVelocity,
    R_perp: options.RPerp,
    chi,
    zeta: options.zeta,
    v_orb: vOrb,
    fieldSpeed: DEFAULT_FIELD_SPEED,
  });
  const fixedFrequencyArtifact = buildOblateSpheroidFixedFrequencyReturnMarginRow({ oblateArtifact });
  const labeledPeriod = getPhasePeriod(fixedFrequencyArtifact, "labeled_retained_path_history");
  const quotientPeriod = getPhasePeriod(fixedFrequencyArtifact, "quotient_level_assembly_state");
  const fieldSpeeds = oblateArtifact.kinematic_rows.map((row) => norm(row.velocity));
  const centerFrameSpeeds = oblateArtifact.kinematic_rows.map((row) => norm(row.center_frame_velocity));
  const sampledResidual = period == null
    ? null
    : evaluateSampledResidual({
      groupVelocity,
      RPerp: options.RPerp,
      chi,
      RParallel: chi * options.RPerp,
      zeta: options.zeta,
      omega,
      period,
      coupling: options.coupling,
      softening: options.softening,
      sampleCount: options.sampleCount,
      rootSamples: options.rootSamples,
      rootPeriods: options.rootPeriods,
      residualThreshold: options.residualThreshold,
    });
  const betaMax = (sampledResidual?.max_field_speed ?? max(fieldSpeeds)) / DEFAULT_FIELD_SPEED;
  const rootBudgetMargin = sampledResidual?.root_budget_margin ?? DEFAULT_FIELD_SPEED - max(fieldSpeeds);
  const speedBudgetQuadrature = Math.sqrt(u * u + vOrb * vOrb);
  const expectedVOrbAtBetaStar = Math.sqrt(Math.max(0, options.betaStar * options.betaStar - u * u));
  const speedBudgetCurveResidual = Math.abs(vOrb - expectedVOrbAtBetaStar);
  const betaMaxResidual = Math.abs(betaMax - options.betaStar);
  const actionProxy = computeActionProxy(oblateArtifact, labeledPeriod, options.actionUnit);
  const actionDrift = actionProxy.action_drift_to_nearest_h ?? 1;
  const normalizedResidual = sampledResidual?.normalized_residual ?? 1;
  const rootPenalty = rootBudgetMargin > 0 ? 0 : Math.abs(rootBudgetMargin) + 1;
  const returnClosed = sampledResidual?.residual_pass === true && rootBudgetMargin > 0;
  const returnPenalty = returnClosed ? 0 : 1;
  const candidateObjective =
    speedBudgetCurveResidual * speedBudgetCurveResidual +
    BETA_MAX_PREFILTER_WEIGHT * betaMaxResidual * betaMaxResidual +
    RESIDUAL_PREFILTER_WEIGHT * normalizedResidual * normalizedResidual +
    ACTION_DRIFT_PREFILTER_WEIGHT * actionDrift * actionDrift +
    rootPenalty * rootPenalty +
    returnPenalty;

  return {
    row_id: `${rowPrefix}:row:u_${u.toFixed(6)}:v_orb_${vOrb.toFixed(6)}`,
    schema: "oblate_spheroid_two_speed_sweep_row.v0",
    field_speed: DEFAULT_FIELD_SPEED,
    u,
    v_orb: vOrb,
    group_velocity: groupVelocity,
    chi,
    volume_ratio_candidate: chi * Math.pow(options.RPerp / DEFAULT_R_PERP, 3),
    lorentz_clock_ratio_target: Math.sqrt(Math.max(0, 1 - u * u)),
    speed_budget: {
      beta_star: options.betaStar,
      quadrature: speedBudgetQuadrature,
      expected_v_orb_for_constant_budget: expectedVOrbAtBetaStar,
      curve_residual: speedBudgetCurveResidual,
      beta_max: betaMax,
      beta_max_residual: betaMaxResidual,
      root_budget_margin: rootBudgetMargin,
      positive_root_budget_margin: rootBudgetMargin > 0,
    },
    branch_clock_proxy: {
      labeled_period: labeledPeriod,
      quotient_period: quotientPeriod,
      cadence_ratio_to_beta_star: options.betaStar > 0 ? vOrb / options.betaStar : null,
      accepted_branch_clock: false,
    },
    action_proxy: actionProxy,
    kinematic_summary: {
      center_frame_speed_mean: mean(centerFrameSpeeds),
      center_frame_speed_max: max(centerFrameSpeeds),
      field_frame_speed_max: max(fieldSpeeds),
      support_surface_pass: oblateArtifact.support_surface_checks.pass === true,
      support_surface_max_abs_phi: oblateArtifact.support_surface_checks.max_abs_phi,
    },
    residual_status: {
      reduced_residual_norm: sampledResidual?.rms_residual ?? null,
      normalized_residual: sampledResidual?.normalized_residual ?? null,
      residual_threshold: options.residualThreshold,
      residual_pass: sampledResidual?.residual_pass === true,
      residual_status: sampledResidual?.residual_pass === true
        ? "sampled_wake_residual_pass_priority_only"
        : "sampled_wake_residual_not_low_enough_priority_only",
      source_oblate_row_id: oblateArtifact.row_id,
      source_fixed_frequency_row_id: fixedFrequencyArtifact.row_id,
      sampled_wake_residual_diagnostic: sampledResidual,
      first_missing_field: sampledResidual?.residual_pass === true ? FIRST_MISSING_FIELD : null,
    },
    root_ledger_status: fixedFrequencyArtifact.root_ledger_status,
    return_status: {
      bounded_return_observed: returnClosed,
      stable_support_radius_observed: false,
      status: returnClosed
        ? "periodic_ansatz_closed_with_low_sampled_residual_priority_only"
        : "periodic_ansatz_closed_but_residual_or_root_margin_failed",
      first_missing_field: returnClosed ? FIRST_MISSING_FIELD : null,
    },
    candidate_objective: candidateObjective,
    accepted: false,
  };
}

function chooseCandidateRows(rows, uValues) {
  return uValues
    .map((u) => rows.filter((row) => row.u === u && row.speed_budget.positive_root_budget_margin))
    .filter((group) => group.length > 0)
    .map((group) => [...group].sort((left, right) => left.candidate_objective - right.candidate_objective)[0]);
}

function makeDynamicParamsForRow(options, row) {
  const orbitalRadius = options.RPerp * Math.sqrt(1 - options.zeta * options.zeta);
  const omega = orbitalRadius <= EPSILON ? 0 : row.v_orb / orbitalRadius;
  return {
    groupVelocity: row.group_velocity,
    RPerp: options.RPerp,
    chi: row.chi,
    RParallel: row.chi * options.RPerp,
    zeta: options.zeta,
    omega,
    period: omega === 0 ? null : 2 * Math.PI / Math.abs(omega),
    coupling: options.coupling,
    softening: options.softening,
    rootPeriods: options.rootPeriods,
  };
}

function attachDynamicReturnProbes(candidateRows, options) {
  if (!options.returnProbe) {
    return;
  }
  for (const row of candidateRows.slice(0, options.returnProbeCandidateLimit)) {
    const params = makeDynamicParamsForRow(options, row);
    if (params.period == null) {
      row.return_status.dynamic_return_probe = null;
      row.return_status.status = "dynamic_return_probe_skipped_zero_frequency";
      continue;
    }
    const probe = evaluateDynamicReturnProbe(params, options);
    row.return_status.dynamic_return_probe = probe;
    row.return_status.bounded_return_observed = probe.bounded_return_observed;
    row.return_status.stable_support_radius_observed = probe.stable_support_radius_observed;
    row.return_status.status = probe.bounded_return_observed
      ? "priority_dynamic_probe_bounded_return_candidate_requires_retained_solver"
      : "priority_dynamic_probe_no_bounded_return";
    row.return_status.first_missing_field = probe.bounded_return_observed ? FIRST_MISSING_FIELD : null;
  }
}

function makeSummary(rows, candidateRows) {
  const positiveRootRows = rows.filter((row) => row.speed_budget.positive_root_budget_margin);
  const boundedRows = rows.filter((row) => row.return_status.bounded_return_observed);
  const residualRows = rows.filter((row) => row.residual_status.normalized_residual != null);
  const dynamicReturnRows = rows.filter((row) => row.return_status.dynamic_return_probe != null);
  return {
    row_count: rows.length,
    positive_root_budget_row_count: positiveRootRows.length,
    bounded_return_row_count: boundedRows.length,
    residual_evaluated_row_count: residualRows.length,
    min_normalized_residual: residualRows.length > 0
      ? Math.min(...residualRows.map((row) => row.residual_status.normalized_residual))
      : null,
    dynamic_return_probe_row_count: dynamicReturnRows.length,
    min_dynamic_return_position_rms: dynamicReturnRows.length > 0
      ? Math.min(...dynamicReturnRows.map((row) => row.return_status.dynamic_return_probe.final_metrics.position_return_rms))
      : null,
    min_dynamic_return_radius_mean_deviation: dynamicReturnRows.length > 0
      ? Math.min(...dynamicReturnRows.map((row) => row.return_status.dynamic_return_probe.max_radius_mean_deviation))
      : null,
    candidate_prefilter_row_count: candidateRows.length,
    min_candidate_objective: rows.length > 0 ? Math.min(...rows.map((row) => row.candidate_objective)) : null,
    max_beta: rows.length > 0 ? Math.max(...rows.map((row) => row.speed_budget.beta_max)) : null,
    min_root_budget_margin: rows.length > 0 ? Math.min(...rows.map((row) => row.speed_budget.root_budget_margin)) : null,
    preferred_configuration_status:
      boundedRows.length > 0
        ? "bounded_return_rows_present_requires_retained_evidence_review"
        : candidateRows.length > 0
          ? "sampled_residual_prefilter_only_no_accepted_bounded_return"
          : "no_positive_root_budget_candidate_rows",
    first_missing_object: FIRST_MISSING_OBJECT,
    first_missing_field: FIRST_MISSING_FIELD,
  };
}

export function evaluateOblateSpheroidTwoSpeedSweepEvidence(candidate = {}) {
  const evidenceClass = candidate.evidence_class ?? candidate.authority_class ?? candidate.source_class ?? null;
  if (evidenceClass && NEGATIVE_CONTROL_REASONS[evidenceClass]) {
    return {
      accepted: false,
      reason: NEGATIVE_CONTROL_REASONS[evidenceClass],
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (candidate.schema !== SCHEMA) {
    return {
      accepted: false,
      reason: "schema_not_oblate_spheroid_two_speed_deformation_sweep_v0",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  return {
    accepted: false,
    reason: "producer_does_not_authorize_accepted_two_speed_deformation_sweep_evidence",
    first_missing_field: "oblate_spheroid_two_speed_deformation_sweep.acceptance_certificate_ref",
  };
}

export function buildOblateSpheroidTwoSpeedSweep(options = {}) {
  const uValues = uniqueSortedNumbers(options.uValues, DEFAULT_U_VALUES);
  const vOrbValues = uniqueSortedNumbers(options.vOrbValues, DEFAULT_V_ORB_VALUES);
  const normalizedOptions = {
    uValues,
    vOrbValues,
    groupDirection: normalizeDirection(options.groupDirection),
    betaStar: normalizePositiveNumber(options.betaStar, DEFAULT_BETA_STAR),
    actionUnit: normalizePositiveNumber(options.actionUnit, 1),
    RPerp: normalizePositiveNumber(options.R_perp ?? options.RPerp, DEFAULT_R_PERP),
    zeta: Math.max(-0.999999, Math.min(0.999999, normalizeNumber(options.zeta, DEFAULT_ZETA))),
    coupling: normalizeNumber(options.coupling, DEFAULT_COUPLING),
    softening: normalizePositiveNumber(options.softening, DEFAULT_SOFTENING),
    sampleCount: Math.max(1, Math.round(normalizePositiveNumber(options.sampleCount, DEFAULT_SAMPLE_COUNT))),
    rootSamples: Math.max(16, Math.round(normalizePositiveNumber(options.rootSamples, DEFAULT_ROOT_SAMPLES))),
    rootPeriods: Math.max(1, Math.round(normalizePositiveNumber(options.rootPeriods, DEFAULT_ROOT_PERIODS))),
    residualThreshold: normalizePositiveNumber(options.residualThreshold, DEFAULT_RESIDUAL_THRESHOLD),
    returnProbe: options.returnProbe === true,
    returnProbePeriods: normalizePositiveNumber(options.returnProbePeriods, DEFAULT_RETURN_PROBE_PERIODS),
    returnProbeStepsPerPeriod: Math.max(
      1,
      Math.round(normalizePositiveNumber(options.returnProbeStepsPerPeriod, DEFAULT_RETURN_PROBE_STEPS_PER_PERIOD))
    ),
    returnProbeRootSamples: Math.max(
      16,
      Math.round(normalizePositiveNumber(options.returnProbeRootSamples, DEFAULT_RETURN_PROBE_ROOT_SAMPLES))
    ),
    returnProbeHistoryPeriods: normalizePositiveNumber(
      options.returnProbeHistoryPeriods,
      DEFAULT_RETURN_PROBE_HISTORY_PERIODS
    ),
    returnProbeHistoryStepsPerPeriod: Math.max(
      2,
      Math.round(
        normalizePositiveNumber(options.returnProbeHistoryStepsPerPeriod, DEFAULT_RETURN_PROBE_HISTORY_STEPS_PER_PERIOD)
      )
    ),
    returnProbePositionTolerance: normalizePositiveNumber(
      options.returnProbePositionTolerance,
      DEFAULT_RETURN_PROBE_POSITION_TOLERANCE
    ),
    returnProbeVelocityTolerance: normalizePositiveNumber(
      options.returnProbeVelocityTolerance,
      DEFAULT_RETURN_PROBE_VELOCITY_TOLERANCE
    ),
    returnProbeRadiusTolerance: normalizePositiveNumber(
      options.returnProbeRadiusTolerance,
      DEFAULT_RETURN_PROBE_RADIUS_TOLERANCE
    ),
    returnProbeCandidateLimit: Math.max(
      1,
      Math.round(normalizePositiveNumber(options.returnProbeCandidateLimit, DEFAULT_RETURN_PROBE_CANDIDATE_LIMIT))
    ),
    returnProbeIncludeSelfHits: options.returnProbeIncludeSelfHits !== false,
    returnProbeSelfHitMinDelay: normalizePositiveNumber(options.returnProbeSelfHitMinDelay, 1e-6),
    chiMode: options.chiMode === "fixed" ? "fixed" : "lorentz_target",
    fixedChi: Math.max(1e-6, Math.min(1, normalizePositiveNumber(options.chi, 1))),
  };
  const artifactKey = {
    schema: SCHEMA,
    uValues,
    vOrbValues,
    groupDirection: normalizedOptions.groupDirection,
    betaStar: normalizedOptions.betaStar,
    actionUnit: normalizedOptions.actionUnit,
    RPerp: normalizedOptions.RPerp,
    zeta: normalizedOptions.zeta,
    coupling: normalizedOptions.coupling,
    softening: normalizedOptions.softening,
    sampleCount: normalizedOptions.sampleCount,
    rootSamples: normalizedOptions.rootSamples,
    rootPeriods: normalizedOptions.rootPeriods,
    residualThreshold: normalizedOptions.residualThreshold,
    returnProbe: normalizedOptions.returnProbe,
    returnProbePeriods: normalizedOptions.returnProbePeriods,
    returnProbeStepsPerPeriod: normalizedOptions.returnProbeStepsPerPeriod,
    returnProbeRootSamples: normalizedOptions.returnProbeRootSamples,
    returnProbeHistoryPeriods: normalizedOptions.returnProbeHistoryPeriods,
    returnProbeHistoryStepsPerPeriod: normalizedOptions.returnProbeHistoryStepsPerPeriod,
    returnProbePositionTolerance: normalizedOptions.returnProbePositionTolerance,
    returnProbeVelocityTolerance: normalizedOptions.returnProbeVelocityTolerance,
    returnProbeRadiusTolerance: normalizedOptions.returnProbeRadiusTolerance,
    returnProbeCandidateLimit: normalizedOptions.returnProbeCandidateLimit,
    returnProbeIncludeSelfHits: normalizedOptions.returnProbeIncludeSelfHits,
    returnProbeSelfHitMinDelay: normalizedOptions.returnProbeSelfHitMinDelay,
    chiMode: normalizedOptions.chiMode,
    fixedChi: normalizedOptions.fixedChi,
    fieldSpeed: DEFAULT_FIELD_SPEED,
  };
  const artifactHash = stableHash(artifactKey);
  const rowPrefix = `oblate_spheroid_two_speed_deformation_sweep:${artifactHash.slice(0, 16)}`;
  const rows = uValues.flatMap((u) => vOrbValues.map((vOrb) => buildSweepRow(rowPrefix, normalizedOptions, u, vOrb)));
  const candidateRows = chooseCandidateRows(rows, uValues);
  attachDynamicReturnProbes(candidateRows, normalizedOptions);
  return {
    schema: SCHEMA,
    row_id: rowPrefix,
    artifact_hash: artifactHash,
    authority_class: "priority_only_two_speed_prefilter_not_retained_branch_evidence",
    claim_level: "priority_only_validation_prefilter",
    field_speed: DEFAULT_FIELD_SPEED,
    parameters: {
      u_values: uValues,
      v_orb_values: vOrbValues,
      group_direction: normalizedOptions.groupDirection,
      beta_star: normalizedOptions.betaStar,
      action_unit: normalizedOptions.actionUnit,
      R_perp: normalizedOptions.RPerp,
      zeta: normalizedOptions.zeta,
      coupling: normalizedOptions.coupling,
      softening: normalizedOptions.softening,
      sample_count: normalizedOptions.sampleCount,
      root_samples: normalizedOptions.rootSamples,
      root_periods: normalizedOptions.rootPeriods,
      residual_threshold: normalizedOptions.residualThreshold,
      return_probe: normalizedOptions.returnProbe,
      return_probe_periods: normalizedOptions.returnProbePeriods,
      return_probe_steps_per_period: normalizedOptions.returnProbeStepsPerPeriod,
      return_probe_root_samples: normalizedOptions.returnProbeRootSamples,
      return_probe_history_periods: normalizedOptions.returnProbeHistoryPeriods,
      return_probe_history_steps_per_period: normalizedOptions.returnProbeHistoryStepsPerPeriod,
      return_probe_position_tolerance: normalizedOptions.returnProbePositionTolerance,
      return_probe_velocity_tolerance: normalizedOptions.returnProbeVelocityTolerance,
      return_probe_radius_tolerance: normalizedOptions.returnProbeRadiusTolerance,
      return_probe_candidate_limit: normalizedOptions.returnProbeCandidateLimit,
      return_probe_include_self_hits: normalizedOptions.returnProbeIncludeSelfHits,
      return_probe_self_hit_min_delay: normalizedOptions.returnProbeSelfHitMinDelay,
      chi_mode: normalizedOptions.chiMode,
      fixed_chi: normalizedOptions.fixedChi,
    },
    candidate_selection: {
      preferred_configuration_conditions: [
        "reduced residual norm near zero",
        "action drift near zero",
        "bounded return or stable support radius",
        "positive retained root-budget margin",
      ],
      current_status: "sampled_residual_prefilter_missing_retained_root_ledger",
      objective_terms: [
        "constant speed-budget curve residual",
        `exact beta_max residual weighted by ${BETA_MAX_PREFILTER_WEIGHT}`,
        `sampled wake residual weighted by ${RESIDUAL_PREFILTER_WEIGHT}`,
        `nearest h-scale action drift proxy weighted by ${ACTION_DRIFT_PREFILTER_WEIGHT}`,
        "root-budget penalty",
        "return penalty",
      ],
      weights_define_physics: false,
    },
    rows,
    candidate_prefilter_rows: candidateRows,
    summary: makeSummary(rows, candidateRows),
    artifact_status: "fail_closed_missing_retained_root_ledger",
    source_status: "source_acquisition_blocked",
    first_missing_object: FIRST_MISSING_OBJECT,
    first_missing_field: FIRST_MISSING_FIELD,
    evidence_evaluation: {
      accepted: false,
      reason: "retained_root_ledger_missing",
      first_missing_field: FIRST_MISSING_FIELD,
    },
    authorization: makeAuthorization(),
    negative_controls: Object.entries(NEGATIVE_CONTROL_REASONS).map(([evidence_class, reason]) => ({
      evidence_class,
      accepted: false,
      reason,
    })),
  };
}

export function validateOblateSpheroidTwoSpeedSweep(artifact) {
  const errors = [];
  if (artifact?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  const expectedRows = (artifact?.parameters?.u_values?.length ?? 0) * (artifact?.parameters?.v_orb_values?.length ?? 0);
  if (!Array.isArray(artifact?.rows) || artifact.rows.length !== expectedRows) {
    errors.push("rows must cover the full u by v_orb grid");
  }
  if (artifact?.field_speed !== 1) {
    errors.push("field_speed must remain canonical c_f=1");
  }
  if (artifact?.artifact_status !== "fail_closed_missing_retained_root_ledger") {
    errors.push("two-speed sweep must fail closed without retained root ledger");
  }
  if (artifact?.summary?.residual_evaluated_row_count !== artifact?.rows?.length) {
    errors.push("sampled residual must be evaluated for every sweep row");
  }
  for (const flag of AUTHORIZATION_FLAGS) {
    if (artifact?.authorization?.[flag] !== false) {
      errors.push(`${flag} must remain false`);
    }
  }
  if (artifact?.authorization?.scoreMovement !== "no_score_increase") {
    errors.push("scoreMovement must remain no_score_increase");
  }
  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    const result = evaluateOblateSpheroidTwoSpeedSweepEvidence({ evidence_class: evidenceClass });
    if (result.accepted || result.reason !== reason) {
      errors.push(`${evidenceClass} negative control must reject as ${reason}`);
    }
  }
  return errors;
}

function parseCliArgs(argv) {
  const options = {};
  for (const arg of argv) {
    if (arg.startsWith("--u-values=")) {
      options.uValues = parseNumberList(arg.slice("--u-values=".length), DEFAULT_U_VALUES);
    } else if (arg.startsWith("--v-orb-values=")) {
      options.vOrbValues = parseNumberList(arg.slice("--v-orb-values=".length), DEFAULT_V_ORB_VALUES);
    } else if (arg.startsWith("--beta-star=")) {
      options.betaStar = normalizePositiveNumber(arg.slice("--beta-star=".length), DEFAULT_BETA_STAR);
    } else if (arg.startsWith("--action-unit=")) {
      options.actionUnit = normalizePositiveNumber(arg.slice("--action-unit=".length), 1);
    } else if (arg.startsWith("--r-perp=")) {
      options.RPerp = normalizePositiveNumber(arg.slice("--r-perp=".length), DEFAULT_R_PERP);
    } else if (arg.startsWith("--zeta=")) {
      options.zeta = normalizeNumber(arg.slice("--zeta=".length), DEFAULT_ZETA);
    } else if (arg.startsWith("--coupling=")) {
      options.coupling = normalizeNumber(arg.slice("--coupling=".length), DEFAULT_COUPLING);
    } else if (arg.startsWith("--softening=")) {
      options.softening = normalizePositiveNumber(arg.slice("--softening=".length), DEFAULT_SOFTENING);
    } else if (arg.startsWith("--sample-count=")) {
      options.sampleCount = normalizePositiveNumber(arg.slice("--sample-count=".length), DEFAULT_SAMPLE_COUNT);
    } else if (arg.startsWith("--root-samples=")) {
      options.rootSamples = normalizePositiveNumber(arg.slice("--root-samples=".length), DEFAULT_ROOT_SAMPLES);
    } else if (arg.startsWith("--root-periods=")) {
      options.rootPeriods = normalizePositiveNumber(arg.slice("--root-periods=".length), DEFAULT_ROOT_PERIODS);
    } else if (arg.startsWith("--residual-threshold=")) {
      options.residualThreshold = normalizePositiveNumber(
        arg.slice("--residual-threshold=".length),
        DEFAULT_RESIDUAL_THRESHOLD
      );
    } else if (arg === "--return-probe") {
      options.returnProbe = true;
    } else if (arg.startsWith("--return-probe-periods=")) {
      options.returnProbePeriods = normalizePositiveNumber(
        arg.slice("--return-probe-periods=".length),
        DEFAULT_RETURN_PROBE_PERIODS
      );
    } else if (arg.startsWith("--return-probe-steps-per-period=")) {
      options.returnProbeStepsPerPeriod = normalizePositiveNumber(
        arg.slice("--return-probe-steps-per-period=".length),
        DEFAULT_RETURN_PROBE_STEPS_PER_PERIOD
      );
    } else if (arg.startsWith("--return-probe-root-samples=")) {
      options.returnProbeRootSamples = normalizePositiveNumber(
        arg.slice("--return-probe-root-samples=".length),
        DEFAULT_RETURN_PROBE_ROOT_SAMPLES
      );
    } else if (arg.startsWith("--return-probe-history-periods=")) {
      options.returnProbeHistoryPeriods = normalizePositiveNumber(
        arg.slice("--return-probe-history-periods=".length),
        DEFAULT_RETURN_PROBE_HISTORY_PERIODS
      );
    } else if (arg.startsWith("--return-probe-history-steps-per-period=")) {
      options.returnProbeHistoryStepsPerPeriod = normalizePositiveNumber(
        arg.slice("--return-probe-history-steps-per-period=".length),
        DEFAULT_RETURN_PROBE_HISTORY_STEPS_PER_PERIOD
      );
    } else if (arg.startsWith("--return-probe-position-tolerance=")) {
      options.returnProbePositionTolerance = normalizePositiveNumber(
        arg.slice("--return-probe-position-tolerance=".length),
        DEFAULT_RETURN_PROBE_POSITION_TOLERANCE
      );
    } else if (arg.startsWith("--return-probe-velocity-tolerance=")) {
      options.returnProbeVelocityTolerance = normalizePositiveNumber(
        arg.slice("--return-probe-velocity-tolerance=".length),
        DEFAULT_RETURN_PROBE_VELOCITY_TOLERANCE
      );
    } else if (arg.startsWith("--return-probe-radius-tolerance=")) {
      options.returnProbeRadiusTolerance = normalizePositiveNumber(
        arg.slice("--return-probe-radius-tolerance=".length),
        DEFAULT_RETURN_PROBE_RADIUS_TOLERANCE
      );
    } else if (arg.startsWith("--return-probe-candidate-limit=")) {
      options.returnProbeCandidateLimit = normalizePositiveNumber(
        arg.slice("--return-probe-candidate-limit=".length),
        DEFAULT_RETURN_PROBE_CANDIDATE_LIMIT
      );
    } else if (arg === "--no-return-probe-self-hits") {
      options.returnProbeIncludeSelfHits = false;
    } else if (arg.startsWith("--return-probe-self-hit-min-delay=")) {
      options.returnProbeSelfHitMinDelay = normalizePositiveNumber(
        arg.slice("--return-probe-self-hit-min-delay=".length),
        1e-6
      );
    } else if (arg.startsWith("--chi-mode=")) {
      options.chiMode = arg.slice("--chi-mode=".length);
    } else if (arg.startsWith("--chi=")) {
      options.chi = normalizePositiveNumber(arg.slice("--chi=".length), 1);
    } else if (arg.startsWith("--out=")) {
      options.out = arg.slice("--out=".length);
    }
  }
  return options;
}

function runCli() {
  const cliOptions = parseCliArgs(process.argv.slice(2));
  const artifact = buildOblateSpheroidTwoSpeedSweep(cliOptions);
  const errors = validateOblateSpheroidTwoSpeedSweep(artifact);
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
    return;
  }
  const pretty = process.argv.includes("--pretty");
  const output = JSON.stringify(artifact, null, pretty ? 2 : 0);
  if (cliOptions.out) {
    fs.writeFileSync(cliOptions.out, `${output}\n`);
    return;
  }
  console.log(output);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli();
}
